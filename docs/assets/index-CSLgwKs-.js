var s0 = Object.defineProperty;
var c0 = (a, i, o) =>
  i in a ? s0(a, i, { enumerable: !0, configurable: !0, writable: !0, value: o }) : (a[i] = o);
var Lo = (a, i, o) => c0(a, typeof i != 'symbol' ? i + '' : i, o);
(function () {
  const i = document.createElement('link').relList;
  if (i && i.supports && i.supports('modulepreload')) return;
  for (const r of document.querySelectorAll('link[rel="modulepreload"]')) s(r);
  new MutationObserver((r) => {
    for (const d of r)
      if (d.type === 'childList')
        for (const m of d.addedNodes) m.tagName === 'LINK' && m.rel === 'modulepreload' && s(m);
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
var qo = { exports: {} },
  xi = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var $h;
function o0() {
  if ($h) return xi;
  $h = 1;
  var a = Symbol.for('react.transitional.element'),
    i = Symbol.for('react.fragment');
  function o(s, r, d) {
    var m = null;
    if ((d !== void 0 && (m = '' + d), r.key !== void 0 && (m = '' + r.key), 'key' in r)) {
      d = {};
      for (var v in r) v !== 'key' && (d[v] = r[v]);
    } else d = r;
    return ((r = d.ref), { $$typeof: a, type: s, key: m, ref: r !== void 0 ? r : null, props: d });
  }
  return ((xi.Fragment = i), (xi.jsx = o), (xi.jsxs = o), xi);
}
var Xh;
function r0() {
  return (Xh || ((Xh = 1), (qo.exports = o0())), qo.exports);
}
var h = r0(),
  Ho = { exports: {} },
  Ei = {},
  Go = { exports: {} },
  Yo = {};
/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Vh;
function f0() {
  return (
    Vh ||
      ((Vh = 1),
      (function (a) {
        function i(U, J) {
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
        function s(U) {
          if (U.length === 0) return null;
          var J = U[0],
            te = U.pop();
          if (te !== J) {
            U[0] = te;
            e: for (var ge = 0, Ee = U.length, C = Ee >>> 1; ge < C; ) {
              var H = 2 * (ge + 1) - 1,
                P = U[H],
                le = H + 1,
                pe = U[le];
              if (0 > r(P, te))
                le < Ee && 0 > r(pe, P)
                  ? ((U[ge] = pe), (U[le] = te), (ge = le))
                  : ((U[ge] = P), (U[H] = te), (ge = H));
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
          b = null,
          A = 3,
          j = !1,
          S = !1,
          O = !1,
          M = !1,
          N = typeof setTimeout == 'function' ? setTimeout : null,
          k = typeof clearTimeout == 'function' ? clearTimeout : null,
          Y = typeof setImmediate < 'u' ? setImmediate : null;
        function V(U) {
          for (var J = o(g); J !== null; ) {
            if (J.callback === null) s(g);
            else if (J.startTime <= U) (s(g), (J.sortIndex = J.expirationTime), i(_, J));
            else break;
            J = o(g);
          }
        }
        function Z(U) {
          if (((O = !1), V(U), !S))
            if (o(_) !== null) ((S = !0), I || ((I = !0), ce()));
            else {
              var J = o(g);
              J !== null && he(Z, J.startTime - U);
            }
        }
        var I = !1,
          Q = -1,
          L = 5,
          K = -1;
        function ae() {
          return M ? !0 : !(a.unstable_now() - K < L);
        }
        function ue() {
          if (((M = !1), I)) {
            var U = a.unstable_now();
            K = U;
            var J = !0;
            try {
              e: {
                ((S = !1), O && ((O = !1), k(Q), (Q = -1)), (j = !0));
                var te = A;
                try {
                  t: {
                    for (V(U), b = o(_); b !== null && !(b.expirationTime > U && ae()); ) {
                      var ge = b.callback;
                      if (typeof ge == 'function') {
                        ((b.callback = null), (A = b.priorityLevel));
                        var Ee = ge(b.expirationTime <= U);
                        if (((U = a.unstable_now()), typeof Ee == 'function')) {
                          ((b.callback = Ee), V(U), (J = !0));
                          break t;
                        }
                        (b === o(_) && s(_), V(U));
                      } else s(_);
                      b = o(_);
                    }
                    if (b !== null) J = !0;
                    else {
                      var C = o(g);
                      (C !== null && he(Z, C.startTime - U), (J = !1));
                    }
                  }
                  break e;
                } finally {
                  ((b = null), (A = te), (j = !1));
                }
                J = void 0;
              }
            } finally {
              J ? ce() : (I = !1);
            }
          }
        }
        var ce;
        if (typeof Y == 'function')
          ce = function () {
            Y(ue);
          };
        else if (typeof MessageChannel < 'u') {
          var W = new MessageChannel(),
            F = W.port2;
          ((W.port1.onmessage = ue),
            (ce = function () {
              F.postMessage(null);
            }));
        } else
          ce = function () {
            N(ue, 0);
          };
        function he(U, J) {
          Q = N(function () {
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
            return A;
          }),
          (a.unstable_next = function (U) {
            switch (A) {
              case 1:
              case 2:
              case 3:
                var J = 3;
                break;
              default:
                J = A;
            }
            var te = A;
            A = J;
            try {
              return U();
            } finally {
              A = te;
            }
          }),
          (a.unstable_requestPaint = function () {
            M = !0;
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
            var te = A;
            A = U;
            try {
              return J();
            } finally {
              A = te;
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
                  i(g, U),
                  o(_) === null && U === o(g) && (O ? (k(Q), (Q = -1)) : (O = !0), he(Z, te - ge)))
                : ((U.sortIndex = Ee), i(_, U), S || j || ((S = !0), I || ((I = !0), ce()))),
              U
            );
          }),
          (a.unstable_shouldYield = ae),
          (a.unstable_wrapCallback = function (U) {
            var J = A;
            return function () {
              var te = A;
              A = J;
              try {
                return U.apply(this, arguments);
              } finally {
                A = te;
              }
            };
          }));
      })(Yo)),
    Yo
  );
}
var Qh;
function d0() {
  return (Qh || ((Qh = 1), (Go.exports = f0())), Go.exports);
}
var $o = { exports: {} },
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
function m0() {
  if (Zh) return ye;
  Zh = 1;
  var a = Symbol.for('react.transitional.element'),
    i = Symbol.for('react.portal'),
    o = Symbol.for('react.fragment'),
    s = Symbol.for('react.strict_mode'),
    r = Symbol.for('react.profiler'),
    d = Symbol.for('react.consumer'),
    m = Symbol.for('react.context'),
    v = Symbol.for('react.forward_ref'),
    _ = Symbol.for('react.suspense'),
    g = Symbol.for('react.memo'),
    y = Symbol.for('react.lazy'),
    b = Symbol.for('react.activity'),
    A = Symbol.iterator;
  function j(C) {
    return C === null || typeof C != 'object'
      ? null
      : ((C = (A && C[A]) || C['@@iterator']), typeof C == 'function' ? C : null);
  }
  var S = {
      isMounted: function () {
        return !1;
      },
      enqueueForceUpdate: function () {},
      enqueueReplaceState: function () {},
      enqueueSetState: function () {},
    },
    O = Object.assign,
    M = {};
  function N(C, H, P) {
    ((this.props = C), (this.context = H), (this.refs = M), (this.updater = P || S));
  }
  ((N.prototype.isReactComponent = {}),
    (N.prototype.setState = function (C, H) {
      if (typeof C != 'object' && typeof C != 'function' && C != null)
        throw Error(
          'takes an object of state variables to update or a function which returns an object of state variables.'
        );
      this.updater.enqueueSetState(this, C, H, 'setState');
    }),
    (N.prototype.forceUpdate = function (C) {
      this.updater.enqueueForceUpdate(this, C, 'forceUpdate');
    }));
  function k() {}
  k.prototype = N.prototype;
  function Y(C, H, P) {
    ((this.props = C), (this.context = H), (this.refs = M), (this.updater = P || S));
  }
  var V = (Y.prototype = new k());
  ((V.constructor = Y), O(V, N.prototype), (V.isPureReactComponent = !0));
  var Z = Array.isArray;
  function I() {}
  var Q = { H: null, A: null, T: null, S: null },
    L = Object.prototype.hasOwnProperty;
  function K(C, H, P) {
    var le = P.ref;
    return { $$typeof: a, type: C, key: H, ref: le !== void 0 ? le : null, props: P };
  }
  function ae(C, H) {
    return K(C.type, H, C.props);
  }
  function ue(C) {
    return typeof C == 'object' && C !== null && C.$$typeof === a;
  }
  function ce(C) {
    var H = { '=': '=0', ':': '=2' };
    return (
      '$' +
      C.replace(/[=:]/g, function (P) {
        return H[P];
      })
    );
  }
  var W = /\/+/g;
  function F(C, H) {
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
            ? C.then(I, I)
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
  function U(C, H, P, le, pe) {
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
            case y:
              return ((Ce = C._init), U(Ce(C._payload), H, P, le, pe));
          }
      }
    if (Ce)
      return (
        (pe = pe(C)),
        (Ce = le === '' ? '.' + F(C, 0) : le),
        Z(pe)
          ? ((P = ''),
            Ce != null && (P = Ce.replace(W, '$&/') + '/'),
            U(pe, H, P, '', function (G) {
              return G;
            }))
          : pe != null &&
            (ue(pe) &&
              (pe = ae(
                pe,
                P +
                  (pe.key == null || (C && C.key === pe.key)
                    ? ''
                    : ('' + pe.key).replace(W, '$&/') + '/') +
                  Ce
              )),
            H.push(pe)),
        1
      );
    Ce = 0;
    var it = le === '' ? '.' : le + ':';
    if (Z(C))
      for (var Xe = 0; Xe < C.length; Xe++)
        ((le = C[Xe]), (be = it + F(le, Xe)), (Ce += U(le, H, P, be, pe)));
    else if (((Xe = j(C)), typeof Xe == 'function'))
      for (C = Xe.call(C), Xe = 0; !(le = C.next()).done; )
        ((le = le.value), (be = it + F(le, Xe++)), (Ce += U(le, H, P, be, pe)));
    else if (be === 'object') {
      if (typeof C.then == 'function') return U(he(C), H, P, le, pe);
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
  function J(C, H, P) {
    if (C == null) return C;
    var le = [],
      pe = 0;
    return (
      U(C, le, '', '', function (be) {
        return H.call(P, be, pe++);
      }),
      le
    );
  }
  function te(C) {
    if (C._status === -1) {
      var H = C._result;
      ((H = H()),
        H.then(
          function (P) {
            (C._status === 0 || C._status === -1) && ((C._status = 1), (C._result = P));
          },
          function (P) {
            (C._status === 0 || C._status === -1) && ((C._status = 2), (C._result = P));
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
      map: J,
      forEach: function (C, H, P) {
        J(
          C,
          function () {
            H.apply(this, arguments);
          },
          P
        );
      },
      count: function (C) {
        var H = 0;
        return (
          J(C, function () {
            H++;
          }),
          H
        );
      },
      toArray: function (C) {
        return (
          J(C, function (H) {
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
    (ye.Component = N),
    (ye.Fragment = o),
    (ye.Profiler = r),
    (ye.PureComponent = Y),
    (ye.StrictMode = s),
    (ye.Suspense = _),
    (ye.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = Q),
    (ye.__COMPILER_RUNTIME = {
      __proto__: null,
      c: function (C) {
        return Q.H.useMemoCache(C);
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
    (ye.cloneElement = function (C, H, P) {
      if (C == null) throw Error('The argument must be a React element, but you passed ' + C + '.');
      var le = O({}, C.props),
        pe = C.key;
      if (H != null)
        for (be in (H.key !== void 0 && (pe = '' + H.key), H))
          !L.call(H, be) ||
            be === 'key' ||
            be === '__self' ||
            be === '__source' ||
            (be === 'ref' && H.ref === void 0) ||
            (le[be] = H[be]);
      var be = arguments.length - 2;
      if (be === 1) le.children = P;
      else if (1 < be) {
        for (var Ce = Array(be), it = 0; it < be; it++) Ce[it] = arguments[it + 2];
        le.children = Ce;
      }
      return K(C.type, pe, le);
    }),
    (ye.createContext = function (C) {
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
        (C.Consumer = { $$typeof: d, _context: C }),
        C
      );
    }),
    (ye.createElement = function (C, H, P) {
      var le,
        pe = {},
        be = null;
      if (H != null)
        for (le in (H.key !== void 0 && (be = '' + H.key), H))
          L.call(H, le) && le !== 'key' && le !== '__self' && le !== '__source' && (pe[le] = H[le]);
      var Ce = arguments.length - 2;
      if (Ce === 1) pe.children = P;
      else if (1 < Ce) {
        for (var it = Array(Ce), Xe = 0; Xe < Ce; Xe++) it[Xe] = arguments[Xe + 2];
        pe.children = it;
      }
      if (C && C.defaultProps)
        for (le in ((Ce = C.defaultProps), Ce)) pe[le] === void 0 && (pe[le] = Ce[le]);
      return K(C, be, pe);
    }),
    (ye.createRef = function () {
      return { current: null };
    }),
    (ye.forwardRef = function (C) {
      return { $$typeof: v, render: C };
    }),
    (ye.isValidElement = ue),
    (ye.lazy = function (C) {
      return { $$typeof: y, _payload: { _status: -1, _result: C }, _init: te };
    }),
    (ye.memo = function (C, H) {
      return { $$typeof: g, type: C, compare: H === void 0 ? null : H };
    }),
    (ye.startTransition = function (C) {
      var H = Q.T,
        P = {};
      Q.T = P;
      try {
        var le = C(),
          pe = Q.S;
        (pe !== null && pe(P, le),
          typeof le == 'object' && le !== null && typeof le.then == 'function' && le.then(I, ge));
      } catch (be) {
        ge(be);
      } finally {
        (H !== null && P.types !== null && (H.types = P.types), (Q.T = H));
      }
    }),
    (ye.unstable_useCacheRefresh = function () {
      return Q.H.useCacheRefresh();
    }),
    (ye.use = function (C) {
      return Q.H.use(C);
    }),
    (ye.useActionState = function (C, H, P) {
      return Q.H.useActionState(C, H, P);
    }),
    (ye.useCallback = function (C, H) {
      return Q.H.useCallback(C, H);
    }),
    (ye.useContext = function (C) {
      return Q.H.useContext(C);
    }),
    (ye.useDebugValue = function () {}),
    (ye.useDeferredValue = function (C, H) {
      return Q.H.useDeferredValue(C, H);
    }),
    (ye.useEffect = function (C, H) {
      return Q.H.useEffect(C, H);
    }),
    (ye.useEffectEvent = function (C) {
      return Q.H.useEffectEvent(C);
    }),
    (ye.useId = function () {
      return Q.H.useId();
    }),
    (ye.useImperativeHandle = function (C, H, P) {
      return Q.H.useImperativeHandle(C, H, P);
    }),
    (ye.useInsertionEffect = function (C, H) {
      return Q.H.useInsertionEffect(C, H);
    }),
    (ye.useLayoutEffect = function (C, H) {
      return Q.H.useLayoutEffect(C, H);
    }),
    (ye.useMemo = function (C, H) {
      return Q.H.useMemo(C, H);
    }),
    (ye.useOptimistic = function (C, H) {
      return Q.H.useOptimistic(C, H);
    }),
    (ye.useReducer = function (C, H, P) {
      return Q.H.useReducer(C, H, P);
    }),
    (ye.useRef = function (C) {
      return Q.H.useRef(C);
    }),
    (ye.useState = function (C) {
      return Q.H.useState(C);
    }),
    (ye.useSyncExternalStore = function (C, H, P) {
      return Q.H.useSyncExternalStore(C, H, P);
    }),
    (ye.useTransition = function () {
      return Q.H.useTransition();
    }),
    (ye.version = '19.2.5'),
    ye
  );
}
var Kh;
function _r() {
  return (Kh || ((Kh = 1), ($o.exports = m0())), $o.exports);
}
var Xo = { exports: {} },
  ht = {};
/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Ih;
function h0() {
  if (Ih) return ht;
  Ih = 1;
  var a = _r();
  function i(_) {
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
  function d(_, g, y) {
    var b = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: r,
      key: b == null ? null : '' + b,
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
    (ht.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = s),
    (ht.createPortal = function (_, g) {
      var y = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
      if (!g || (g.nodeType !== 1 && g.nodeType !== 9 && g.nodeType !== 11)) throw Error(i(299));
      return d(_, g, null, y);
    }),
    (ht.flushSync = function (_) {
      var g = m.T,
        y = s.p;
      try {
        if (((m.T = null), (s.p = 2), _)) return _();
      } finally {
        ((m.T = g), (s.p = y), s.d.f());
      }
    }),
    (ht.preconnect = function (_, g) {
      typeof _ == 'string' &&
        (g
          ? ((g = g.crossOrigin),
            (g = typeof g == 'string' ? (g === 'use-credentials' ? g : '') : void 0))
          : (g = null),
        s.d.C(_, g));
    }),
    (ht.prefetchDNS = function (_) {
      typeof _ == 'string' && s.d.D(_);
    }),
    (ht.preinit = function (_, g) {
      if (typeof _ == 'string' && g && typeof g.as == 'string') {
        var y = g.as,
          b = v(y, g.crossOrigin),
          A = typeof g.integrity == 'string' ? g.integrity : void 0,
          j = typeof g.fetchPriority == 'string' ? g.fetchPriority : void 0;
        y === 'style'
          ? s.d.S(_, typeof g.precedence == 'string' ? g.precedence : void 0, {
              crossOrigin: b,
              integrity: A,
              fetchPriority: j,
            })
          : y === 'script' &&
            s.d.X(_, {
              crossOrigin: b,
              integrity: A,
              fetchPriority: j,
              nonce: typeof g.nonce == 'string' ? g.nonce : void 0,
            });
      }
    }),
    (ht.preinitModule = function (_, g) {
      if (typeof _ == 'string')
        if (typeof g == 'object' && g !== null) {
          if (g.as == null || g.as === 'script') {
            var y = v(g.as, g.crossOrigin);
            s.d.M(_, {
              crossOrigin: y,
              integrity: typeof g.integrity == 'string' ? g.integrity : void 0,
              nonce: typeof g.nonce == 'string' ? g.nonce : void 0,
            });
          }
        } else g == null && s.d.M(_);
    }),
    (ht.preload = function (_, g) {
      if (typeof _ == 'string' && typeof g == 'object' && g !== null && typeof g.as == 'string') {
        var y = g.as,
          b = v(y, g.crossOrigin);
        s.d.L(_, y, {
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
    (ht.preloadModule = function (_, g) {
      if (typeof _ == 'string')
        if (g) {
          var y = v(g.as, g.crossOrigin);
          s.d.m(_, {
            as: typeof g.as == 'string' && g.as !== 'script' ? g.as : void 0,
            crossOrigin: y,
            integrity: typeof g.integrity == 'string' ? g.integrity : void 0,
          });
        } else s.d.m(_);
    }),
    (ht.requestFormReset = function (_) {
      s.d.r(_);
    }),
    (ht.unstable_batchedUpdates = function (_, g) {
      return _(g);
    }),
    (ht.useFormState = function (_, g, y) {
      return m.H.useFormState(_, g, y);
    }),
    (ht.useFormStatus = function () {
      return m.H.useHostTransitionStatus();
    }),
    (ht.version = '19.2.5'),
    ht
  );
}
var Jh;
function p0() {
  if (Jh) return Xo.exports;
  Jh = 1;
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
  return (a(), (Xo.exports = h0()), Xo.exports);
}
/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Wh;
function y0() {
  if (Wh) return Ei;
  Wh = 1;
  var a = d0(),
    i = _r(),
    o = p0();
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
    if (d(e) !== e) throw Error(s(188));
  }
  function g(e) {
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
          if (c === l) return (_(u), e);
          if (c === n) return (_(u), t);
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
  function y(e) {
    var t = e.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return e;
    for (e = e.child; e !== null; ) {
      if (((t = y(e)), t !== null)) return t;
      e = e.sibling;
    }
    return null;
  }
  var b = Object.assign,
    A = Symbol.for('react.element'),
    j = Symbol.for('react.transitional.element'),
    S = Symbol.for('react.portal'),
    O = Symbol.for('react.fragment'),
    M = Symbol.for('react.strict_mode'),
    N = Symbol.for('react.profiler'),
    k = Symbol.for('react.consumer'),
    Y = Symbol.for('react.context'),
    V = Symbol.for('react.forward_ref'),
    Z = Symbol.for('react.suspense'),
    I = Symbol.for('react.suspense_list'),
    Q = Symbol.for('react.memo'),
    L = Symbol.for('react.lazy'),
    K = Symbol.for('react.activity'),
    ae = Symbol.for('react.memo_cache_sentinel'),
    ue = Symbol.iterator;
  function ce(e) {
    return e === null || typeof e != 'object'
      ? null
      : ((e = (ue && e[ue]) || e['@@iterator']), typeof e == 'function' ? e : null);
  }
  var W = Symbol.for('react.client.reference');
  function F(e) {
    if (e == null) return null;
    if (typeof e == 'function') return e.$$typeof === W ? null : e.displayName || e.name || null;
    if (typeof e == 'string') return e;
    switch (e) {
      case O:
        return 'Fragment';
      case N:
        return 'Profiler';
      case M:
        return 'StrictMode';
      case Z:
        return 'Suspense';
      case I:
        return 'SuspenseList';
      case K:
        return 'Activity';
    }
    if (typeof e == 'object')
      switch (e.$$typeof) {
        case S:
          return 'Portal';
        case Y:
          return e.displayName || 'Context';
        case k:
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
    U = i.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
    J = o.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
    te = { pending: !1, data: null, method: null, action: null },
    ge = [],
    Ee = -1;
  function C(e) {
    return { current: e };
  }
  function H(e) {
    0 > Ee || ((e.current = ge[Ee]), (ge[Ee] = null), Ee--);
  }
  function P(e, t) {
    (Ee++, (ge[Ee] = e.current), (e.current = t));
  }
  var le = C(null),
    pe = C(null),
    be = C(null),
    Ce = C(null);
  function it(e, t) {
    switch ((P(be, t), P(pe, e), P(le, null), t.nodeType)) {
      case 9:
      case 11:
        e = (e = t.documentElement) && (e = e.namespaceURI) ? dh(e) : 0;
        break;
      default:
        if (((e = t.tagName), (t = t.namespaceURI))) ((t = dh(t)), (e = mh(t, e)));
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
    (H(le), P(le, e));
  }
  function Xe() {
    (H(le), H(pe), H(be));
  }
  function G(e) {
    e.memoizedState !== null && P(Ce, e);
    var t = le.current,
      l = mh(t, e.type);
    t !== l && (P(pe, e), P(le, l));
  }
  function oe(e) {
    (pe.current === e && (H(le), H(pe)), Ce.current === e && (H(Ce), (_i._currentValue = te)));
  }
  var de, je;
  function Te(e) {
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
  var _t = !1;
  function Ss(e, t) {
    if (!e || _t) return '';
    _t = !0;
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
          z = p.split(`
`);
        for (u = n = 0; n < x.length && !x[n].includes('DetermineComponentFrameRoot'); ) n++;
        for (; u < z.length && !z[u].includes('DetermineComponentFrameRoot'); ) u++;
        if (n === x.length || u === z.length)
          for (n = x.length - 1, u = z.length - 1; 1 <= n && 0 <= u && x[n] !== z[u]; ) u--;
        for (; 1 <= n && 0 <= u; n--, u--)
          if (x[n] !== z[u]) {
            if (n !== 1 || u !== 1)
              do
                if ((n--, u--, 0 > u || x[n] !== z[u])) {
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
      ((_t = !1), (Error.prepareStackTrace = l));
    }
    return (l = e ? e.displayName || e.name : '') ? Te(l) : '';
  }
  function Ly(e, t) {
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
        return Ss(e.type, !1);
      case 11:
        return Ss(e.type.render, !1);
      case 1:
        return Ss(e.type, !0);
      case 31:
        return Te('Activity');
      default:
        return '';
    }
  }
  function Yr(e) {
    try {
      var t = '',
        l = null;
      do ((t += Ly(e, l)), (l = e), (e = e.return));
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
  var xs = Object.prototype.hasOwnProperty,
    Es = a.unstable_scheduleCallback,
    Ts = a.unstable_cancelCallback,
    qy = a.unstable_shouldYield,
    Hy = a.unstable_requestPaint,
    kt = a.unstable_now,
    Gy = a.unstable_getCurrentPriorityLevel,
    $r = a.unstable_ImmediatePriority,
    Xr = a.unstable_UserBlockingPriority,
    Bi = a.unstable_NormalPriority,
    Yy = a.unstable_LowPriority,
    Vr = a.unstable_IdlePriority,
    $y = a.log,
    Xy = a.unstable_setDisableYieldValue,
    Ra = null,
    At = null;
  function Dl(e) {
    if ((typeof $y == 'function' && Xy(e), At && typeof At.setStrictMode == 'function'))
      try {
        At.setStrictMode(Ra, e);
      } catch {}
  }
  var Ct = Math.clz32 ? Math.clz32 : Zy,
    Vy = Math.log,
    Qy = Math.LN2;
  function Zy(e) {
    return ((e >>>= 0), e === 0 ? 32 : (31 - ((Vy(e) / Qy) | 0)) | 0);
  }
  var Ui = 256,
    Li = 262144,
    qi = 4194304;
  function dn(e) {
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
            ? (u = dn(n))
            : ((f &= p), f !== 0 ? (u = dn(f)) : l || ((l = p & ~e), l !== 0 && (u = dn(l)))))
        : ((p = n & ~c),
          p !== 0
            ? (u = dn(p))
            : f !== 0
              ? (u = dn(f))
              : l || ((l = n & ~e), l !== 0 && (u = dn(l)))),
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
  function ja(e, t) {
    return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & t) === 0;
  }
  function Ky(e, t) {
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
    var e = qi;
    return ((qi <<= 1), (qi & 62914560) === 0 && (qi = 4194304), e);
  }
  function Ns(e) {
    for (var t = [], l = 0; 31 > l; l++) t.push(e);
    return t;
  }
  function Oa(e, t) {
    ((e.pendingLanes |= t),
      t !== 268435456 && ((e.suspendedLanes = 0), (e.pingedLanes = 0), (e.warmLanes = 0)));
  }
  function Iy(e, t, l, n, u, c) {
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
      z = e.hiddenUpdates;
    for (l = f & ~l; 0 < l; ) {
      var q = 31 - Ct(l),
        X = 1 << q;
      ((p[q] = 0), (x[q] = -1));
      var D = z[q];
      if (D !== null)
        for (z[q] = null, q = 0; q < D.length; q++) {
          var B = D[q];
          B !== null && (B.lane &= -536870913);
        }
      l &= ~X;
    }
    (n !== 0 && Zr(e, n, 0),
      c !== 0 && u === 0 && e.tag !== 0 && (e.suspendedLanes |= c & ~(f & ~t)));
  }
  function Zr(e, t, l) {
    ((e.pendingLanes |= t), (e.suspendedLanes &= ~t));
    var n = 31 - Ct(t);
    ((e.entangledLanes |= t),
      (e.entanglements[n] = e.entanglements[n] | 1073741824 | (l & 261930)));
  }
  function Kr(e, t) {
    var l = (e.entangledLanes |= t);
    for (e = e.entanglements; l; ) {
      var n = 31 - Ct(l),
        u = 1 << n;
      ((u & t) | (e[n] & t) && (e[n] |= t), (l &= ~u));
    }
  }
  function Ir(e, t) {
    var l = t & -t;
    return ((l = (l & 42) !== 0 ? 1 : ks(l)), (l & (e.suspendedLanes | t)) !== 0 ? 0 : l);
  }
  function ks(e) {
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
  function As(e) {
    return ((e &= -e), 2 < e ? (8 < e ? ((e & 134217727) !== 0 ? 32 : 268435456) : 8) : 2);
  }
  function Jr() {
    var e = J.p;
    return e !== 0 ? e : ((e = window.event), e === void 0 ? 32 : Bh(e.type));
  }
  function Wr(e, t) {
    var l = J.p;
    try {
      return ((J.p = e), t());
    } finally {
      J.p = l;
    }
  }
  var Bl = Math.random().toString(36).slice(2),
    ct = '__reactFiber$' + Bl,
    vt = '__reactProps$' + Bl,
    zn = '__reactContainer$' + Bl,
    Cs = '__reactEvents$' + Bl,
    Jy = '__reactListeners$' + Bl,
    Wy = '__reactHandles$' + Bl,
    Fr = '__reactResources$' + Bl,
    wa = '__reactMarker$' + Bl;
  function Ms(e) {
    (delete e[ct], delete e[vt], delete e[Cs], delete e[Jy], delete e[Wy]);
  }
  function Dn(e) {
    var t = e[ct];
    if (t) return t;
    for (var l = e.parentNode; l; ) {
      if ((t = l[zn] || l[ct])) {
        if (((l = t.alternate), t.child !== null || (l !== null && l.child !== null)))
          for (e = bh(e); e !== null; ) {
            if ((l = e[ct])) return l;
            e = bh(e);
          }
        return t;
      }
      ((e = l), (l = e.parentNode));
    }
    return null;
  }
  function Bn(e) {
    if ((e = e[ct] || e[zn])) {
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
  function Un(e) {
    var t = e[Fr];
    return (t || (t = e[Fr] = { hoistableStyles: new Map(), hoistableScripts: new Map() }), t);
  }
  function ut(e) {
    e[wa] = !0;
  }
  var Pr = new Set(),
    ef = {};
  function mn(e, t) {
    (Ln(e, t), Ln(e + 'Capture', t));
  }
  function Ln(e, t) {
    for (ef[e] = t, e = 0; e < t.length; e++) Pr.add(t[e]);
  }
  var Fy = RegExp(
      '^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$'
    ),
    tf = {},
    lf = {};
  function Py(e) {
    return xs.call(lf, e)
      ? !0
      : xs.call(tf, e)
        ? !1
        : Fy.test(e)
          ? (lf[e] = !0)
          : ((tf[e] = !0), !1);
  }
  function Gi(e, t, l) {
    if (Py(t))
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
  function dl(e, t, l, n) {
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
  function nf(e) {
    var t = e.type;
    return (e = e.nodeName) && e.toLowerCase() === 'input' && (t === 'checkbox' || t === 'radio');
  }
  function eg(e, t, l) {
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
      var t = nf(e) ? 'checked' : 'value';
      e._valueTracker = eg(e, t, '' + e[t]);
    }
  }
  function af(e) {
    if (!e) return !1;
    var t = e._valueTracker;
    if (!t) return !0;
    var l = t.getValue(),
      n = '';
    return (
      e && (n = nf(e) ? (e.checked ? 'true' : 'false') : e.value),
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
  var tg = /[\n"\\]/g;
  function Lt(e) {
    return e.replace(tg, function (t) {
      return '\\' + t.charCodeAt(0).toString(16) + ' ';
    });
  }
  function js(e, t, l, n, u, c, f, p) {
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
  function uf(e, t, l, n, u, c, f, p) {
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
  function sf(e, t, l) {
    if (t != null && ((t = '' + Ut(t)), t !== e.value && (e.value = t), l == null)) {
      e.defaultValue !== t && (e.defaultValue = t);
      return;
    }
    e.defaultValue = l != null ? '' + Ut(l) : '';
  }
  function cf(e, t, l, n) {
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
  var lg = new Set(
    'animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp'.split(
      ' '
    )
  );
  function of(e, t, l) {
    var n = t.indexOf('--') === 0;
    l == null || typeof l == 'boolean' || l === ''
      ? n
        ? e.setProperty(t, '')
        : t === 'float'
          ? (e.cssFloat = '')
          : (e[t] = '')
      : n
        ? e.setProperty(t, l)
        : typeof l != 'number' || l === 0 || lg.has(t)
          ? t === 'float'
            ? (e.cssFloat = l)
            : (e[t] = ('' + l).trim())
          : (e[t] = l + 'px');
  }
  function rf(e, t, l) {
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
      for (var u in t) ((n = t[u]), t.hasOwnProperty(u) && l[u] !== n && of(e, u, n));
    } else for (var c in t) t.hasOwnProperty(c) && of(e, c, t[c]);
  }
  function ws(e) {
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
  var ng = new Map([
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
    ag =
      /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function Xi(e) {
    return ag.test('' + e)
      ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')"
      : e;
  }
  function ml() {}
  var zs = null;
  function Ds(e) {
    return (
      (e = e.target || e.srcElement || window),
      e.correspondingUseElement && (e = e.correspondingUseElement),
      e.nodeType === 3 ? e.parentNode : e
    );
  }
  var Gn = null,
    Yn = null;
  function ff(e) {
    var t = Bn(e);
    if (t && (e = t.stateNode)) {
      var l = e[vt] || null;
      e: switch (((e = t.stateNode), t.type)) {
        case 'input':
          if (
            (js(
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
              l = l.querySelectorAll('input[name="' + Lt('' + t) + '"][type="radio"]'), t = 0;
              t < l.length;
              t++
            ) {
              var n = l[t];
              if (n !== e && n.form === e.form) {
                var u = n[vt] || null;
                if (!u) throw Error(s(90));
                js(
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
            for (t = 0; t < l.length; t++) ((n = l[t]), n.form === e.form && af(n));
          }
          break e;
        case 'textarea':
          sf(e, l.value, l.defaultValue);
          break e;
        case 'select':
          ((t = l.value), t != null && qn(e, !!l.multiple, t, !1));
      }
    }
  }
  var Bs = !1;
  function df(e, t, l) {
    if (Bs) return e(t, l);
    Bs = !0;
    try {
      var n = e(t);
      return n;
    } finally {
      if (
        ((Bs = !1),
        (Gn !== null || Yn !== null) &&
          (ju(), Gn && ((t = Gn), (e = Yn), (Yn = Gn = null), ff(t), e)))
      )
        for (t = 0; t < e.length; t++) ff(e[t]);
    }
  }
  function Da(e, t) {
    var l = e.stateNode;
    if (l === null) return null;
    var n = l[vt] || null;
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
  var hl = !(
      typeof window > 'u' ||
      typeof window.document > 'u' ||
      typeof window.document.createElement > 'u'
    ),
    Us = !1;
  if (hl)
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
    Ls = null,
    Vi = null;
  function mf() {
    if (Vi) return Vi;
    var e,
      t = Ls,
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
  function hf() {
    return !1;
  }
  function bt(e) {
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
          : hf),
        (this.isPropagationStopped = hf),
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
    Ki = bt(hn),
    Ua = b({}, hn, { view: 0, detail: 0 }),
    ig = bt(Ua),
    qs,
    Hs,
    La,
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
      getModifierState: Ys,
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
          : (e !== La &&
              (La && e.type === 'mousemove'
                ? ((qs = e.screenX - La.screenX), (Hs = e.screenY - La.screenY))
                : (Hs = qs = 0),
              (La = e)),
            qs);
      },
      movementY: function (e) {
        return 'movementY' in e ? e.movementY : Hs;
      },
    }),
    pf = bt(Ii),
    ug = b({}, Ii, { dataTransfer: 0 }),
    sg = bt(ug),
    cg = b({}, Ua, { relatedTarget: 0 }),
    Gs = bt(cg),
    og = b({}, hn, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
    rg = bt(og),
    fg = b({}, hn, {
      clipboardData: function (e) {
        return 'clipboardData' in e ? e.clipboardData : window.clipboardData;
      },
    }),
    dg = bt(fg),
    mg = b({}, hn, { data: 0 }),
    yf = bt(mg),
    hg = {
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
    pg = {
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
    yg = { Alt: 'altKey', Control: 'ctrlKey', Meta: 'metaKey', Shift: 'shiftKey' };
  function gg(e) {
    var t = this.nativeEvent;
    return t.getModifierState ? t.getModifierState(e) : (e = yg[e]) ? !!t[e] : !1;
  }
  function Ys() {
    return gg;
  }
  var _g = b({}, Ua, {
      key: function (e) {
        if (e.key) {
          var t = hg[e.key] || e.key;
          if (t !== 'Unidentified') return t;
        }
        return e.type === 'keypress'
          ? ((e = Qi(e)), e === 13 ? 'Enter' : String.fromCharCode(e))
          : e.type === 'keydown' || e.type === 'keyup'
            ? pg[e.keyCode] || 'Unidentified'
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
      getModifierState: Ys,
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
    vg = bt(_g),
    bg = b({}, Ii, {
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
    gf = bt(bg),
    Sg = b({}, Ua, {
      touches: 0,
      targetTouches: 0,
      changedTouches: 0,
      altKey: 0,
      metaKey: 0,
      ctrlKey: 0,
      shiftKey: 0,
      getModifierState: Ys,
    }),
    xg = bt(Sg),
    Eg = b({}, hn, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
    Tg = bt(Eg),
    Ng = b({}, Ii, {
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
    kg = bt(Ng),
    Ag = b({}, hn, { newState: 0, oldState: 0 }),
    Cg = bt(Ag),
    Mg = [9, 13, 27, 32],
    $s = hl && 'CompositionEvent' in window,
    qa = null;
  hl && 'documentMode' in document && (qa = document.documentMode);
  var Rg = hl && 'TextEvent' in window && !qa,
    _f = hl && (!$s || (qa && 8 < qa && 11 >= qa)),
    vf = ' ',
    bf = !1;
  function Sf(e, t) {
    switch (e) {
      case 'keyup':
        return Mg.indexOf(t.keyCode) !== -1;
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
  function xf(e) {
    return ((e = e.detail), typeof e == 'object' && 'data' in e ? e.data : null);
  }
  var $n = !1;
  function jg(e, t) {
    switch (e) {
      case 'compositionend':
        return xf(t);
      case 'keypress':
        return t.which !== 32 ? null : ((bf = !0), vf);
      case 'textInput':
        return ((e = t.data), e === vf && bf ? null : e);
      default:
        return null;
    }
  }
  function Og(e, t) {
    if ($n)
      return e === 'compositionend' || (!$s && Sf(e, t))
        ? ((e = mf()), (Vi = Ls = Ul = null), ($n = !1), e)
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
        return _f && t.locale !== 'ko' ? null : t.data;
      default:
        return null;
    }
  }
  var wg = {
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
    return t === 'input' ? !!wg[e.type] : t === 'textarea';
  }
  function Tf(e, t, l, n) {
    (Gn ? (Yn ? Yn.push(n) : (Yn = [n])) : (Gn = n),
      (t = Lu(t, 'onChange')),
      0 < t.length &&
        ((l = new Ki('onChange', 'change', null, l, n)), e.push({ event: l, listeners: t })));
  }
  var Ha = null,
    Ga = null;
  function zg(e) {
    uh(e, 0);
  }
  function Ji(e) {
    var t = za(e);
    if (af(t)) return e;
  }
  function Nf(e, t) {
    if (e === 'change') return t;
  }
  var kf = !1;
  if (hl) {
    var Xs;
    if (hl) {
      var Vs = 'oninput' in document;
      if (!Vs) {
        var Af = document.createElement('div');
        (Af.setAttribute('oninput', 'return;'), (Vs = typeof Af.oninput == 'function'));
      }
      Xs = Vs;
    } else Xs = !1;
    kf = Xs && (!document.documentMode || 9 < document.documentMode);
  }
  function Cf() {
    Ha && (Ha.detachEvent('onpropertychange', Mf), (Ga = Ha = null));
  }
  function Mf(e) {
    if (e.propertyName === 'value' && Ji(Ga)) {
      var t = [];
      (Tf(t, Ga, e, Ds(e)), df(zg, t));
    }
  }
  function Dg(e, t, l) {
    e === 'focusin'
      ? (Cf(), (Ha = t), (Ga = l), Ha.attachEvent('onpropertychange', Mf))
      : e === 'focusout' && Cf();
  }
  function Bg(e) {
    if (e === 'selectionchange' || e === 'keyup' || e === 'keydown') return Ji(Ga);
  }
  function Ug(e, t) {
    if (e === 'click') return Ji(t);
  }
  function Lg(e, t) {
    if (e === 'input' || e === 'change') return Ji(t);
  }
  function qg(e, t) {
    return (e === t && (e !== 0 || 1 / e === 1 / t)) || (e !== e && t !== t);
  }
  var Mt = typeof Object.is == 'function' ? Object.is : qg;
  function Ya(e, t) {
    if (Mt(e, t)) return !0;
    if (typeof e != 'object' || e === null || typeof t != 'object' || t === null) return !1;
    var l = Object.keys(e),
      n = Object.keys(t);
    if (l.length !== n.length) return !1;
    for (n = 0; n < l.length; n++) {
      var u = l[n];
      if (!xs.call(t, u) || !Mt(e[u], t[u])) return !1;
    }
    return !0;
  }
  function Rf(e) {
    for (; e && e.firstChild; ) e = e.firstChild;
    return e;
  }
  function jf(e, t) {
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
  function wf(e) {
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
  function Qs(e) {
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
  var Hg = hl && 'documentMode' in document && 11 >= document.documentMode,
    Xn = null,
    Zs = null,
    $a = null,
    Ks = !1;
  function zf(e, t, l) {
    var n = l.window === l ? l.document : l.nodeType === 9 ? l : l.ownerDocument;
    Ks ||
      Xn == null ||
      Xn !== $i(n) ||
      ((n = Xn),
      'selectionStart' in n && Qs(n)
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
        (n = Lu(Zs, 'onSelect')),
        0 < n.length &&
          ((t = new Ki('onSelect', 'select', null, t, l)),
          e.push({ event: t, listeners: n }),
          (t.target = Xn))));
  }
  function pn(e, t) {
    var l = {};
    return (
      (l[e.toLowerCase()] = t.toLowerCase()),
      (l['Webkit' + e] = 'webkit' + t),
      (l['Moz' + e] = 'moz' + t),
      l
    );
  }
  var Vn = {
      animationend: pn('Animation', 'AnimationEnd'),
      animationiteration: pn('Animation', 'AnimationIteration'),
      animationstart: pn('Animation', 'AnimationStart'),
      transitionrun: pn('Transition', 'TransitionRun'),
      transitionstart: pn('Transition', 'TransitionStart'),
      transitioncancel: pn('Transition', 'TransitionCancel'),
      transitionend: pn('Transition', 'TransitionEnd'),
    },
    Is = {},
    Df = {};
  hl &&
    ((Df = document.createElement('div').style),
    'AnimationEvent' in window ||
      (delete Vn.animationend.animation,
      delete Vn.animationiteration.animation,
      delete Vn.animationstart.animation),
    'TransitionEvent' in window || delete Vn.transitionend.transition);
  function yn(e) {
    if (Is[e]) return Is[e];
    if (!Vn[e]) return e;
    var t = Vn[e],
      l;
    for (l in t) if (t.hasOwnProperty(l) && l in Df) return (Is[e] = t[l]);
    return e;
  }
  var Bf = yn('animationend'),
    Uf = yn('animationiteration'),
    Lf = yn('animationstart'),
    Gg = yn('transitionrun'),
    Yg = yn('transitionstart'),
    $g = yn('transitioncancel'),
    qf = yn('transitionend'),
    Hf = new Map(),
    Js =
      'abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel'.split(
        ' '
      );
  Js.push('scrollEnd');
  function Jt(e, t) {
    (Hf.set(e, t), mn(t, [e]));
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
    qt = [],
    Qn = 0,
    Ws = 0;
  function Fi() {
    for (var e = Qn, t = (Ws = Qn = 0); t < e; ) {
      var l = qt[t];
      qt[t++] = null;
      var n = qt[t];
      qt[t++] = null;
      var u = qt[t];
      qt[t++] = null;
      var c = qt[t];
      if (((qt[t++] = null), n !== null && u !== null)) {
        var f = n.pending;
        (f === null ? (u.next = u) : ((u.next = f.next), (f.next = u)), (n.pending = u));
      }
      c !== 0 && Gf(l, u, c);
    }
  }
  function Pi(e, t, l, n) {
    ((qt[Qn++] = e),
      (qt[Qn++] = t),
      (qt[Qn++] = l),
      (qt[Qn++] = n),
      (Ws |= n),
      (e.lanes |= n),
      (e = e.alternate),
      e !== null && (e.lanes |= n));
  }
  function Fs(e, t, l, n) {
    return (Pi(e, t, l, n), eu(e));
  }
  function gn(e, t) {
    return (Pi(e, null, null, t), eu(e));
  }
  function Gf(e, t, l) {
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
          ((u = 31 - Ct(l)),
          (e = c.hiddenUpdates),
          (n = e[u]),
          n === null ? (e[u] = [t]) : n.push(t),
          (t.lane = l | 536870912)),
        c)
      : null;
  }
  function eu(e) {
    if (50 < fi) throw ((fi = 0), (so = null), Error(s(185)));
    for (var t = e.return; t !== null; ) ((e = t), (t = e.return));
    return e.tag === 3 ? e.stateNode : null;
  }
  var Zn = {};
  function Xg(e, t, l, n) {
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
    return new Xg(e, t, l, n);
  }
  function Ps(e) {
    return ((e = e.prototype), !(!e || !e.isReactComponent));
  }
  function pl(e, t) {
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
  function Yf(e, t) {
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
    if (((n = e), typeof e == 'function')) Ps(e) && (f = 1);
    else if (typeof e == 'string')
      f = I_(e, l, le.current) ? 26 : e === 'html' || e === 'head' || e === 'body' ? 27 : 5;
    else
      e: switch (e) {
        case K:
          return ((e = Rt(31, l, t, u)), (e.elementType = K), (e.lanes = c), e);
        case O:
          return _n(l.children, u, c, t);
        case M:
          ((f = 8), (u |= 24));
          break;
        case N:
          return ((e = Rt(12, l, t, u | 2)), (e.elementType = N), (e.lanes = c), e);
        case Z:
          return ((e = Rt(13, l, t, u)), (e.elementType = Z), (e.lanes = c), e);
        case I:
          return ((e = Rt(19, l, t, u)), (e.elementType = I), (e.lanes = c), e);
        default:
          if (typeof e == 'object' && e !== null)
            switch (e.$$typeof) {
              case Y:
                f = 10;
                break e;
              case k:
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
          ((f = 29), (l = Error(s(130, e === null ? 'null' : typeof e, ''))), (n = null));
      }
    return ((t = Rt(f, l, t, u)), (t.elementType = e), (t.type = n), (t.lanes = c), t);
  }
  function _n(e, t, l, n) {
    return ((e = Rt(7, e, n, t)), (e.lanes = l), e);
  }
  function ec(e, t, l) {
    return ((e = Rt(6, e, null, t)), (e.lanes = l), e);
  }
  function $f(e) {
    var t = Rt(18, null, null, 0);
    return ((t.stateNode = e), t);
  }
  function tc(e, t, l) {
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
  var Xf = new WeakMap();
  function Ht(e, t) {
    if (typeof e == 'object' && e !== null) {
      var l = Xf.get(e);
      return l !== void 0 ? l : ((t = { value: e, source: t, stack: Yr(t) }), Xf.set(e, t), t);
    }
    return { value: e, source: t, stack: Yr(t) };
  }
  var Kn = [],
    In = 0,
    lu = null,
    Xa = 0,
    Gt = [],
    Yt = 0,
    Ll = null,
    nl = 1,
    al = '';
  function yl(e, t) {
    ((Kn[In++] = Xa), (Kn[In++] = lu), (lu = e), (Xa = t));
  }
  function Vf(e, t, l) {
    ((Gt[Yt++] = nl), (Gt[Yt++] = al), (Gt[Yt++] = Ll), (Ll = e));
    var n = nl;
    e = al;
    var u = 32 - Ct(n) - 1;
    ((n &= ~(1 << u)), (l += 1));
    var c = 32 - Ct(t) + u;
    if (30 < c) {
      var f = u - (u % 5);
      ((c = (n & ((1 << f) - 1)).toString(32)),
        (n >>= f),
        (u -= f),
        (nl = (1 << (32 - Ct(t) + u)) | (l << u) | n),
        (al = c + e));
    } else ((nl = (1 << c) | (l << u) | n), (al = e));
  }
  function lc(e) {
    e.return !== null && (yl(e, 1), Vf(e, 1, 0));
  }
  function nc(e) {
    for (; e === lu; ) ((lu = Kn[--In]), (Kn[In] = null), (Xa = Kn[--In]), (Kn[In] = null));
    for (; e === Ll; )
      ((Ll = Gt[--Yt]),
        (Gt[Yt] = null),
        (al = Gt[--Yt]),
        (Gt[Yt] = null),
        (nl = Gt[--Yt]),
        (Gt[Yt] = null));
  }
  function Qf(e, t) {
    ((Gt[Yt++] = nl), (Gt[Yt++] = al), (Gt[Yt++] = Ll), (nl = t.id), (al = t.overflow), (Ll = e));
  }
  var ot = null,
    Ye = null,
    Ae = !1,
    ql = null,
    $t = !1,
    ac = Error(s(519));
  function Hl(e) {
    var t = Error(
      s(418, 1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? 'text' : 'HTML', '')
    );
    throw (Va(Ht(t, e)), ac);
  }
  function Zf(e) {
    var t = e.stateNode,
      l = e.type,
      n = e.memoizedProps;
    switch (((t[ct] = e), (t[vt] = n), l)) {
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
          uf(t, n.value, n.defaultValue, n.checked, n.defaultChecked, n.type, n.name, !0));
        break;
      case 'select':
        xe('invalid', t);
        break;
      case 'textarea':
        (xe('invalid', t), cf(t, n.value, n.defaultValue, n.children));
    }
    ((l = n.children),
      (typeof l != 'string' && typeof l != 'number' && typeof l != 'bigint') ||
      t.textContent === '' + l ||
      n.suppressHydrationWarning === !0 ||
      rh(t.textContent, l)
        ? (n.popover != null && (xe('beforetoggle', t), xe('toggle', t)),
          n.onScroll != null && xe('scroll', t),
          n.onScrollEnd != null && xe('scrollend', t),
          n.onClick != null && (t.onclick = ml),
          (t = !0))
        : (t = !1),
      t || Hl(e, !0));
  }
  function Kf(e) {
    for (ot = e.return; ot; )
      switch (ot.tag) {
        case 5:
        case 31:
        case 13:
          $t = !1;
          return;
        case 27:
        case 3:
          $t = !0;
          return;
        default:
          ot = ot.return;
      }
  }
  function Jn(e) {
    if (e !== ot) return !1;
    if (!Ae) return (Kf(e), (Ae = !0), !1);
    var t = e.tag,
      l;
    if (
      ((l = t !== 3 && t !== 27) &&
        ((l = t === 5) &&
          ((l = e.type), (l = !(l !== 'form' && l !== 'button') || Eo(e.type, e.memoizedProps))),
        (l = !l)),
      l && Ye && Hl(e),
      Kf(e),
      t === 13)
    ) {
      if (((e = e.memoizedState), (e = e !== null ? e.dehydrated : null), !e)) throw Error(s(317));
      Ye = vh(e);
    } else if (t === 31) {
      if (((e = e.memoizedState), (e = e !== null ? e.dehydrated : null), !e)) throw Error(s(317));
      Ye = vh(e);
    } else
      t === 27
        ? ((t = Ye), en(e.type) ? ((e = Co), (Co = null), (Ye = e)) : (Ye = t))
        : (Ye = ot ? Vt(e.stateNode.nextSibling) : null);
    return !0;
  }
  function vn() {
    ((Ye = ot = null), (Ae = !1));
  }
  function ic() {
    var e = ql;
    return (e !== null && (Tt === null ? (Tt = e) : Tt.push.apply(Tt, e), (ql = null)), e);
  }
  function Va(e) {
    ql === null ? (ql = [e]) : ql.push(e);
  }
  var uc = C(null),
    bn = null,
    gl = null;
  function Gl(e, t, l) {
    (P(uc, t._currentValue), (t._currentValue = l));
  }
  function _l(e) {
    ((e._currentValue = uc.current), H(uc));
  }
  function sc(e, t, l) {
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
  function cc(e, t, l, n) {
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
                sc(c.return, l, e),
                n || (f = null));
              break e;
            }
          c = p.next;
        }
      } else if (u.tag === 18) {
        if (((f = u.return), f === null)) throw Error(s(341));
        ((f.lanes |= l), (c = f.alternate), c !== null && (c.lanes |= l), sc(f, l, e), (f = null));
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
    (e !== null && cc(t, e, l, n), (t.flags |= 262144));
  }
  function nu(e) {
    for (e = e.firstContext; e !== null; ) {
      if (!Mt(e.context._currentValue, e.memoizedValue)) return !0;
      e = e.next;
    }
    return !1;
  }
  function Sn(e) {
    ((bn = e), (gl = null), (e = e.dependencies), e !== null && (e.firstContext = null));
  }
  function rt(e) {
    return If(bn, e);
  }
  function au(e, t) {
    return (bn === null && Sn(e), If(e, t));
  }
  function If(e, t) {
    var l = t._currentValue;
    if (((t = { context: t, memoizedValue: l, next: null }), gl === null)) {
      if (e === null) throw Error(s(308));
      ((gl = t), (e.dependencies = { lanes: 0, firstContext: t }), (e.flags |= 524288));
    } else gl = gl.next = t;
    return l;
  }
  var Vg =
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
    Qg = a.unstable_scheduleCallback,
    Zg = a.unstable_NormalPriority,
    Pe = {
      $$typeof: Y,
      Consumer: null,
      Provider: null,
      _currentValue: null,
      _currentValue2: null,
      _threadCount: 0,
    };
  function oc() {
    return { controller: new Vg(), data: new Map(), refCount: 0 };
  }
  function Qa(e) {
    (e.refCount--,
      e.refCount === 0 &&
        Qg(Zg, function () {
          e.controller.abort();
        }));
  }
  var Za = null,
    rc = 0,
    Fn = 0,
    Pn = null;
  function Kg(e, t) {
    if (Za === null) {
      var l = (Za = []);
      ((rc = 0),
        (Fn = ho()),
        (Pn = {
          status: 'pending',
          value: void 0,
          then: function (n) {
            l.push(n);
          },
        }));
    }
    return (rc++, t.then(Jf, Jf), t);
  }
  function Jf() {
    if (--rc === 0 && Za !== null) {
      Pn !== null && (Pn.status = 'fulfilled');
      var e = Za;
      ((Za = null), (Fn = 0), (Pn = null));
      for (var t = 0; t < e.length; t++) (0, e[t])();
    }
  }
  function Ig(e, t) {
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
  var Wf = U.S;
  U.S = function (e, t) {
    ((zm = kt()),
      typeof t == 'object' && t !== null && typeof t.then == 'function' && Kg(e, t),
      Wf !== null && Wf(e, t));
  };
  var xn = C(null);
  function fc() {
    var e = xn.current;
    return e !== null ? e : Ge.pooledCache;
  }
  function iu(e, t) {
    t === null ? P(xn, xn.current) : P(xn, t.pool);
  }
  function Ff() {
    var e = fc();
    return e === null ? null : { parent: Pe._currentValue, pool: e };
  }
  var ea = Error(s(460)),
    dc = Error(s(474)),
    uu = Error(s(542)),
    su = { then: function () {} };
  function Pf(e) {
    return ((e = e.status), e === 'fulfilled' || e === 'rejected');
  }
  function ed(e, t, l) {
    switch (
      ((l = e[l]), l === void 0 ? e.push(t) : l !== t && (t.then(ml, ml), (t = l)), t.status)
    ) {
      case 'fulfilled':
        return t.value;
      case 'rejected':
        throw ((e = t.reason), ld(e), e);
      default:
        if (typeof t.status == 'string') t.then(ml, ml);
        else {
          if (((e = Ge), e !== null && 100 < e.shellSuspendCounter)) throw Error(s(482));
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
            throw ((e = t.reason), ld(e), e);
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
  function td() {
    if (Tn === null) throw Error(s(459));
    var e = Tn;
    return ((Tn = null), e);
  }
  function ld(e) {
    if (e === ea || e === uu) throw Error(s(483));
  }
  var ta = null,
    Ka = 0;
  function cu(e) {
    var t = Ka;
    return ((Ka += 1), ta === null && (ta = []), ed(ta, e, t));
  }
  function Ia(e, t) {
    ((t = t.props.ref), (e.ref = t !== void 0 ? t : null));
  }
  function ou(e, t) {
    throw t.$$typeof === A
      ? Error(s(525))
      : ((e = Object.prototype.toString.call(t)),
        Error(
          s(
            31,
            e === '[object Object]' ? 'object with keys {' + Object.keys(t).join(', ') + '}' : e
          )
        ));
  }
  function nd(e) {
    function t(R, E) {
      if (e) {
        var w = R.deletions;
        w === null ? ((R.deletions = [E]), (R.flags |= 16)) : w.push(E);
      }
    }
    function l(R, E) {
      if (!e) return null;
      for (; E !== null; ) (t(R, E), (E = E.sibling));
      return null;
    }
    function n(R) {
      for (var E = new Map(); R !== null; )
        (R.key !== null ? E.set(R.key, R) : E.set(R.index, R), (R = R.sibling));
      return E;
    }
    function u(R, E) {
      return ((R = pl(R, E)), (R.index = 0), (R.sibling = null), R);
    }
    function c(R, E, w) {
      return (
        (R.index = w),
        e
          ? ((w = R.alternate),
            w !== null
              ? ((w = w.index), w < E ? ((R.flags |= 67108866), E) : w)
              : ((R.flags |= 67108866), E))
          : ((R.flags |= 1048576), E)
      );
    }
    function f(R) {
      return (e && R.alternate === null && (R.flags |= 67108866), R);
    }
    function p(R, E, w, $) {
      return E === null || E.tag !== 6
        ? ((E = ec(w, R.mode, $)), (E.return = R), E)
        : ((E = u(E, w)), (E.return = R), E);
    }
    function x(R, E, w, $) {
      var se = w.type;
      return se === O
        ? q(R, E, w.props.children, $, w.key)
        : E !== null &&
            (E.elementType === se ||
              (typeof se == 'object' && se !== null && se.$$typeof === L && En(se) === E.type))
          ? ((E = u(E, w.props)), Ia(E, w), (E.return = R), E)
          : ((E = tu(w.type, w.key, w.props, null, R.mode, $)), Ia(E, w), (E.return = R), E);
    }
    function z(R, E, w, $) {
      return E === null ||
        E.tag !== 4 ||
        E.stateNode.containerInfo !== w.containerInfo ||
        E.stateNode.implementation !== w.implementation
        ? ((E = tc(w, R.mode, $)), (E.return = R), E)
        : ((E = u(E, w.children || [])), (E.return = R), E);
    }
    function q(R, E, w, $, se) {
      return E === null || E.tag !== 7
        ? ((E = _n(w, R.mode, $, se)), (E.return = R), E)
        : ((E = u(E, w)), (E.return = R), E);
    }
    function X(R, E, w) {
      if ((typeof E == 'string' && E !== '') || typeof E == 'number' || typeof E == 'bigint')
        return ((E = ec('' + E, R.mode, w)), (E.return = R), E);
      if (typeof E == 'object' && E !== null) {
        switch (E.$$typeof) {
          case j:
            return ((w = tu(E.type, E.key, E.props, null, R.mode, w)), Ia(w, E), (w.return = R), w);
          case S:
            return ((E = tc(E, R.mode, w)), (E.return = R), E);
          case L:
            return ((E = En(E)), X(R, E, w));
        }
        if (he(E) || ce(E)) return ((E = _n(E, R.mode, w, null)), (E.return = R), E);
        if (typeof E.then == 'function') return X(R, cu(E), w);
        if (E.$$typeof === Y) return X(R, au(R, E), w);
        ou(R, E);
      }
      return null;
    }
    function D(R, E, w, $) {
      var se = E !== null ? E.key : null;
      if ((typeof w == 'string' && w !== '') || typeof w == 'number' || typeof w == 'bigint')
        return se !== null ? null : p(R, E, '' + w, $);
      if (typeof w == 'object' && w !== null) {
        switch (w.$$typeof) {
          case j:
            return w.key === se ? x(R, E, w, $) : null;
          case S:
            return w.key === se ? z(R, E, w, $) : null;
          case L:
            return ((w = En(w)), D(R, E, w, $));
        }
        if (he(w) || ce(w)) return se !== null ? null : q(R, E, w, $, null);
        if (typeof w.then == 'function') return D(R, E, cu(w), $);
        if (w.$$typeof === Y) return D(R, E, au(R, w), $);
        ou(R, w);
      }
      return null;
    }
    function B(R, E, w, $, se) {
      if ((typeof $ == 'string' && $ !== '') || typeof $ == 'number' || typeof $ == 'bigint')
        return ((R = R.get(w) || null), p(E, R, '' + $, se));
      if (typeof $ == 'object' && $ !== null) {
        switch ($.$$typeof) {
          case j:
            return ((R = R.get($.key === null ? w : $.key) || null), x(E, R, $, se));
          case S:
            return ((R = R.get($.key === null ? w : $.key) || null), z(E, R, $, se));
          case L:
            return (($ = En($)), B(R, E, w, $, se));
        }
        if (he($) || ce($)) return ((R = R.get(w) || null), q(E, R, $, se, null));
        if (typeof $.then == 'function') return B(R, E, w, cu($), se);
        if ($.$$typeof === Y) return B(R, E, w, au(E, $), se);
        ou(E, $);
      }
      return null;
    }
    function ne(R, E, w, $) {
      for (
        var se = null, Me = null, ie = E, ve = (E = 0), ke = null;
        ie !== null && ve < w.length;
        ve++
      ) {
        ie.index > ve ? ((ke = ie), (ie = null)) : (ke = ie.sibling);
        var Re = D(R, ie, w[ve], $);
        if (Re === null) {
          ie === null && (ie = ke);
          break;
        }
        (e && ie && Re.alternate === null && t(R, ie),
          (E = c(Re, E, ve)),
          Me === null ? (se = Re) : (Me.sibling = Re),
          (Me = Re),
          (ie = ke));
      }
      if (ve === w.length) return (l(R, ie), Ae && yl(R, ve), se);
      if (ie === null) {
        for (; ve < w.length; ve++)
          ((ie = X(R, w[ve], $)),
            ie !== null &&
              ((E = c(ie, E, ve)), Me === null ? (se = ie) : (Me.sibling = ie), (Me = ie)));
        return (Ae && yl(R, ve), se);
      }
      for (ie = n(ie); ve < w.length; ve++)
        ((ke = B(ie, R, ve, w[ve], $)),
          ke !== null &&
            (e && ke.alternate !== null && ie.delete(ke.key === null ? ve : ke.key),
            (E = c(ke, E, ve)),
            Me === null ? (se = ke) : (Me.sibling = ke),
            (Me = ke)));
      return (
        e &&
          ie.forEach(function (un) {
            return t(R, un);
          }),
        Ae && yl(R, ve),
        se
      );
    }
    function re(R, E, w, $) {
      if (w == null) throw Error(s(151));
      for (
        var se = null, Me = null, ie = E, ve = (E = 0), ke = null, Re = w.next();
        ie !== null && !Re.done;
        ve++, Re = w.next()
      ) {
        ie.index > ve ? ((ke = ie), (ie = null)) : (ke = ie.sibling);
        var un = D(R, ie, Re.value, $);
        if (un === null) {
          ie === null && (ie = ke);
          break;
        }
        (e && ie && un.alternate === null && t(R, ie),
          (E = c(un, E, ve)),
          Me === null ? (se = un) : (Me.sibling = un),
          (Me = un),
          (ie = ke));
      }
      if (Re.done) return (l(R, ie), Ae && yl(R, ve), se);
      if (ie === null) {
        for (; !Re.done; ve++, Re = w.next())
          ((Re = X(R, Re.value, $)),
            Re !== null &&
              ((E = c(Re, E, ve)), Me === null ? (se = Re) : (Me.sibling = Re), (Me = Re)));
        return (Ae && yl(R, ve), se);
      }
      for (ie = n(ie); !Re.done; ve++, Re = w.next())
        ((Re = B(ie, R, ve, Re.value, $)),
          Re !== null &&
            (e && Re.alternate !== null && ie.delete(Re.key === null ? ve : Re.key),
            (E = c(Re, E, ve)),
            Me === null ? (se = Re) : (Me.sibling = Re),
            (Me = Re)));
      return (
        e &&
          ie.forEach(function (u0) {
            return t(R, u0);
          }),
        Ae && yl(R, ve),
        se
      );
    }
    function qe(R, E, w, $) {
      if (
        (typeof w == 'object' &&
          w !== null &&
          w.type === O &&
          w.key === null &&
          (w = w.props.children),
        typeof w == 'object' && w !== null)
      ) {
        switch (w.$$typeof) {
          case j:
            e: {
              for (var se = w.key; E !== null; ) {
                if (E.key === se) {
                  if (((se = w.type), se === O)) {
                    if (E.tag === 7) {
                      (l(R, E.sibling), ($ = u(E, w.props.children)), ($.return = R), (R = $));
                      break e;
                    }
                  } else if (
                    E.elementType === se ||
                    (typeof se == 'object' && se !== null && se.$$typeof === L && En(se) === E.type)
                  ) {
                    (l(R, E.sibling), ($ = u(E, w.props)), Ia($, w), ($.return = R), (R = $));
                    break e;
                  }
                  l(R, E);
                  break;
                } else t(R, E);
                E = E.sibling;
              }
              w.type === O
                ? (($ = _n(w.props.children, R.mode, $, w.key)), ($.return = R), (R = $))
                : (($ = tu(w.type, w.key, w.props, null, R.mode, $)),
                  Ia($, w),
                  ($.return = R),
                  (R = $));
            }
            return f(R);
          case S:
            e: {
              for (se = w.key; E !== null; ) {
                if (E.key === se)
                  if (
                    E.tag === 4 &&
                    E.stateNode.containerInfo === w.containerInfo &&
                    E.stateNode.implementation === w.implementation
                  ) {
                    (l(R, E.sibling), ($ = u(E, w.children || [])), ($.return = R), (R = $));
                    break e;
                  } else {
                    l(R, E);
                    break;
                  }
                else t(R, E);
                E = E.sibling;
              }
              (($ = tc(w, R.mode, $)), ($.return = R), (R = $));
            }
            return f(R);
          case L:
            return ((w = En(w)), qe(R, E, w, $));
        }
        if (he(w)) return ne(R, E, w, $);
        if (ce(w)) {
          if (((se = ce(w)), typeof se != 'function')) throw Error(s(150));
          return ((w = se.call(w)), re(R, E, w, $));
        }
        if (typeof w.then == 'function') return qe(R, E, cu(w), $);
        if (w.$$typeof === Y) return qe(R, E, au(R, w), $);
        ou(R, w);
      }
      return (typeof w == 'string' && w !== '') || typeof w == 'number' || typeof w == 'bigint'
        ? ((w = '' + w),
          E !== null && E.tag === 6
            ? (l(R, E.sibling), ($ = u(E, w)), ($.return = R), (R = $))
            : (l(R, E), ($ = ec(w, R.mode, $)), ($.return = R), (R = $)),
          f(R))
        : l(R, E);
    }
    return function (R, E, w, $) {
      try {
        Ka = 0;
        var se = qe(R, E, w, $);
        return ((ta = null), se);
      } catch (ie) {
        if (ie === ea || ie === uu) throw ie;
        var Me = Rt(29, ie, null, R.mode);
        return ((Me.lanes = $), (Me.return = R), Me);
      } finally {
      }
    };
  }
  var Nn = nd(!0),
    ad = nd(!1),
    Yl = !1;
  function mc(e) {
    e.updateQueue = {
      baseState: e.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null,
    };
  }
  function hc(e, t) {
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
  function $l(e) {
    return { lane: e, tag: 0, payload: null, callback: null, next: null };
  }
  function Xl(e, t, l) {
    var n = e.updateQueue;
    if (n === null) return null;
    if (((n = n.shared), (Oe & 2) !== 0)) {
      var u = n.pending;
      return (
        u === null ? (t.next = t) : ((t.next = u.next), (u.next = t)),
        (n.pending = t),
        (t = eu(e)),
        Gf(e, null, l),
        t
      );
    }
    return (Pi(e, n, t, l), eu(e));
  }
  function Ja(e, t, l) {
    if (((t = t.updateQueue), t !== null && ((t = t.shared), (l & 4194048) !== 0))) {
      var n = t.lanes;
      ((n &= e.pendingLanes), (l |= n), (t.lanes = l), Kr(e, l));
    }
  }
  function pc(e, t) {
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
  var yc = !1;
  function Wa() {
    if (yc) {
      var e = Pn;
      if (e !== null) throw e;
    }
  }
  function Fa(e, t, l, n) {
    yc = !1;
    var u = e.updateQueue;
    Yl = !1;
    var c = u.firstBaseUpdate,
      f = u.lastBaseUpdate,
      p = u.shared.pending;
    if (p !== null) {
      u.shared.pending = null;
      var x = p,
        z = x.next;
      ((x.next = null), f === null ? (c = z) : (f.next = z), (f = x));
      var q = e.alternate;
      q !== null &&
        ((q = q.updateQueue),
        (p = q.lastBaseUpdate),
        p !== f && (p === null ? (q.firstBaseUpdate = z) : (p.next = z), (q.lastBaseUpdate = x)));
    }
    if (c !== null) {
      var X = u.baseState;
      ((f = 0), (q = z = x = null), (p = c));
      do {
        var D = p.lane & -536870913,
          B = D !== p.lane;
        if (B ? (Ne & D) === D : (n & D) === D) {
          (D !== 0 && D === Fn && (yc = !0),
            q !== null &&
              (q = q.next =
                { lane: 0, tag: p.tag, payload: p.payload, callback: null, next: null }));
          e: {
            var ne = e,
              re = p;
            D = t;
            var qe = l;
            switch (re.tag) {
              case 1:
                if (((ne = re.payload), typeof ne == 'function')) {
                  X = ne.call(qe, X, D);
                  break e;
                }
                X = ne;
                break e;
              case 3:
                ne.flags = (ne.flags & -65537) | 128;
              case 0:
                if (
                  ((ne = re.payload),
                  (D = typeof ne == 'function' ? ne.call(qe, X, D) : ne),
                  D == null)
                )
                  break e;
                X = b({}, X, D);
                break e;
              case 2:
                Yl = !0;
            }
          }
          ((D = p.callback),
            D !== null &&
              ((e.flags |= 64),
              B && (e.flags |= 8192),
              (B = u.callbacks),
              B === null ? (u.callbacks = [D]) : B.push(D)));
        } else
          ((B = { lane: D, tag: p.tag, payload: p.payload, callback: p.callback, next: null }),
            q === null ? ((z = q = B), (x = X)) : (q = q.next = B),
            (f |= D));
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
        (u.firstBaseUpdate = z),
        (u.lastBaseUpdate = q),
        c === null && (u.shared.lanes = 0),
        (Il |= f),
        (e.lanes = f),
        (e.memoizedState = X));
    }
  }
  function id(e, t) {
    if (typeof e != 'function') throw Error(s(191, e));
    e.call(t);
  }
  function ud(e, t) {
    var l = e.callbacks;
    if (l !== null) for (e.callbacks = null, e = 0; e < l.length; e++) id(l[e], t);
  }
  var la = C(null),
    ru = C(0);
  function sd(e, t) {
    ((e = Al), P(ru, e), P(la, t), (Al = e | t.baseLanes));
  }
  function gc() {
    (P(ru, Al), P(la, la.current));
  }
  function _c() {
    ((Al = ru.current), H(la), H(ru));
  }
  var jt = C(null),
    Xt = null;
  function Vl(e) {
    var t = e.alternate;
    (P(We, We.current & 1),
      P(jt, e),
      Xt === null && (t === null || la.current !== null || t.memoizedState !== null) && (Xt = e));
  }
  function vc(e) {
    (P(We, We.current), P(jt, e), Xt === null && (Xt = e));
  }
  function cd(e) {
    e.tag === 22 ? (P(We, We.current), P(jt, e), Xt === null && (Xt = e)) : Ql();
  }
  function Ql() {
    (P(We, We.current), P(jt, jt.current));
  }
  function Ot(e) {
    (H(jt), Xt === e && (Xt = null), H(We));
  }
  var We = C(0);
  function fu(e) {
    for (var t = e; t !== null; ) {
      if (t.tag === 13) {
        var l = t.memoizedState;
        if (l !== null && ((l = l.dehydrated), l === null || ko(l) || Ao(l))) return t;
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
  var vl = 0,
    _e = null,
    Ue = null,
    et = null,
    du = !1,
    na = !1,
    kn = !1,
    mu = 0,
    Pa = 0,
    aa = null,
    Jg = 0;
  function Ke() {
    throw Error(s(321));
  }
  function bc(e, t) {
    if (t === null) return !1;
    for (var l = 0; l < t.length && l < e.length; l++) if (!Mt(e[l], t[l])) return !1;
    return !0;
  }
  function Sc(e, t, l, n, u, c) {
    return (
      (vl = c),
      (_e = t),
      (t.memoizedState = null),
      (t.updateQueue = null),
      (t.lanes = 0),
      (U.H = e === null || e.memoizedState === null ? Vd : Bc),
      (kn = !1),
      (c = l(n, u)),
      (kn = !1),
      na && (c = rd(t, l, n, u)),
      od(e),
      c
    );
  }
  function od(e) {
    U.H = li;
    var t = Ue !== null && Ue.next !== null;
    if (((vl = 0), (et = Ue = _e = null), (du = !1), (Pa = 0), (aa = null), t)) throw Error(s(300));
    e === null || tt || ((e = e.dependencies), e !== null && nu(e) && (tt = !0));
  }
  function rd(e, t, l, n) {
    _e = e;
    var u = 0;
    do {
      if ((na && (aa = null), (Pa = 0), (na = !1), 25 <= u)) throw Error(s(301));
      if (((u += 1), (et = Ue = null), e.updateQueue != null)) {
        var c = e.updateQueue;
        ((c.lastEffect = null),
          (c.events = null),
          (c.stores = null),
          c.memoCache != null && (c.memoCache.index = 0));
      }
      ((U.H = Qd), (c = t(l, n)));
    } while (na);
    return c;
  }
  function Wg() {
    var e = U.H,
      t = e.useState()[0];
    return (
      (t = typeof t.then == 'function' ? ei(t) : t),
      (e = e.useState()[0]),
      (Ue !== null ? Ue.memoizedState : null) !== e && (_e.flags |= 1024),
      t
    );
  }
  function xc() {
    var e = mu !== 0;
    return ((mu = 0), e);
  }
  function Ec(e, t, l) {
    ((t.updateQueue = e.updateQueue), (t.flags &= -2053), (e.lanes &= ~l));
  }
  function Tc(e) {
    if (du) {
      for (e = e.memoizedState; e !== null; ) {
        var t = e.queue;
        (t !== null && (t.pending = null), (e = e.next));
      }
      du = !1;
    }
    ((vl = 0), (et = Ue = _e = null), (na = !1), (Pa = mu = 0), (aa = null));
  }
  function gt() {
    var e = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
    return (et === null ? (_e.memoizedState = et = e) : (et = et.next = e), et);
  }
  function Fe() {
    if (Ue === null) {
      var e = _e.alternate;
      e = e !== null ? e.memoizedState : null;
    } else e = Ue.next;
    var t = et === null ? _e.memoizedState : et.next;
    if (t !== null) ((et = t), (Ue = e));
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
        et === null ? (_e.memoizedState = et = e) : (et = et.next = e));
    }
    return et;
  }
  function hu() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function ei(e) {
    var t = Pa;
    return (
      (Pa += 1),
      aa === null && (aa = []),
      (e = ed(aa, e, t)),
      (t = _e),
      (et === null ? t.memoizedState : et.next) === null &&
        ((t = t.alternate), (U.H = t === null || t.memoizedState === null ? Vd : Bc)),
      e
    );
  }
  function pu(e) {
    if (e !== null && typeof e == 'object') {
      if (typeof e.then == 'function') return ei(e);
      if (e.$$typeof === Y) return rt(e);
    }
    throw Error(s(438, String(e)));
  }
  function Nc(e) {
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
  function bl(e, t) {
    return typeof t == 'function' ? t(e) : t;
  }
  function yu(e) {
    var t = Fe();
    return kc(t, Ue, e);
  }
  function kc(e, t, l) {
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
        z = t,
        q = !1;
      do {
        var X = z.lane & -536870913;
        if (X !== z.lane ? (Ne & X) === X : (vl & X) === X) {
          var D = z.revertLane;
          if (D === 0)
            (x !== null &&
              (x = x.next =
                {
                  lane: 0,
                  revertLane: 0,
                  gesture: null,
                  action: z.action,
                  hasEagerState: z.hasEagerState,
                  eagerState: z.eagerState,
                  next: null,
                }),
              X === Fn && (q = !0));
          else if ((vl & D) === D) {
            ((z = z.next), D === Fn && (q = !0));
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
              x === null ? ((p = x = X), (f = c)) : (x = x.next = X),
              (_e.lanes |= D),
              (Il |= D));
          ((X = z.action), kn && l(c, X), (c = z.hasEagerState ? z.eagerState : l(c, X)));
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
            x === null ? ((p = x = D), (f = c)) : (x = x.next = D),
            (_e.lanes |= X),
            (Il |= X));
        z = z.next;
      } while (z !== null && z !== t);
      if (
        (x === null ? (f = c) : (x.next = p),
        !Mt(c, e.memoizedState) && ((tt = !0), q && ((l = Pn), l !== null)))
      )
        throw l;
      ((e.memoizedState = c), (e.baseState = f), (e.baseQueue = x), (n.lastRenderedState = c));
    }
    return (u === null && (n.lanes = 0), [e.memoizedState, n.dispatch]);
  }
  function Ac(e) {
    var t = Fe(),
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
      (Mt(c, t.memoizedState) || (tt = !0),
        (t.memoizedState = c),
        t.baseQueue === null && (t.baseState = c),
        (l.lastRenderedState = c));
    }
    return [c, n];
  }
  function fd(e, t, l) {
    var n = _e,
      u = Fe(),
      c = Ae;
    if (c) {
      if (l === void 0) throw Error(s(407));
      l = l();
    } else l = t();
    var f = !Mt((Ue || u).memoizedState, l);
    if (
      (f && ((u.memoizedState = l), (tt = !0)),
      (u = u.queue),
      Rc(hd.bind(null, n, u, e), [e]),
      u.getSnapshot !== t || f || (et !== null && et.memoizedState.tag & 1))
    ) {
      if (
        ((n.flags |= 2048),
        ia(9, { destroy: void 0 }, md.bind(null, n, u, l, t), null),
        Ge === null)
      )
        throw Error(s(349));
      c || (vl & 127) !== 0 || dd(n, t, l);
    }
    return l;
  }
  function dd(e, t, l) {
    ((e.flags |= 16384),
      (e = { getSnapshot: t, value: l }),
      (t = _e.updateQueue),
      t === null
        ? ((t = hu()), (_e.updateQueue = t), (t.stores = [e]))
        : ((l = t.stores), l === null ? (t.stores = [e]) : l.push(e)));
  }
  function md(e, t, l, n) {
    ((t.value = l), (t.getSnapshot = n), pd(t) && yd(e));
  }
  function hd(e, t, l) {
    return l(function () {
      pd(t) && yd(e);
    });
  }
  function pd(e) {
    var t = e.getSnapshot;
    e = e.value;
    try {
      var l = t();
      return !Mt(e, l);
    } catch {
      return !0;
    }
  }
  function yd(e) {
    var t = gn(e, 2);
    t !== null && Nt(t, e, 2);
  }
  function Cc(e) {
    var t = gt();
    if (typeof e == 'function') {
      var l = e;
      if (((e = l()), kn)) {
        Dl(!0);
        try {
          l();
        } finally {
          Dl(!1);
        }
      }
    }
    return (
      (t.memoizedState = t.baseState = e),
      (t.queue = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: bl,
        lastRenderedState: e,
      }),
      t
    );
  }
  function gd(e, t, l, n) {
    return ((e.baseState = l), kc(e, Ue, typeof n == 'function' ? n : bl));
  }
  function Fg(e, t, l, n, u) {
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
      (U.T !== null ? l(!0) : (c.isTransition = !1),
        n(c),
        (l = t.pending),
        l === null
          ? ((c.next = t.pending = c), _d(t, c))
          : ((c.next = l.next), (t.pending = l.next = c)));
    }
  }
  function _d(e, t) {
    var l = t.action,
      n = t.payload,
      u = e.state;
    if (t.isTransition) {
      var c = U.T,
        f = {};
      U.T = f;
      try {
        var p = l(u, n),
          x = U.S;
        (x !== null && x(f, p), vd(e, t, p));
      } catch (z) {
        Mc(e, t, z);
      } finally {
        (c !== null && f.types !== null && (c.types = f.types), (U.T = c));
      }
    } else
      try {
        ((c = l(u, n)), vd(e, t, c));
      } catch (z) {
        Mc(e, t, z);
      }
  }
  function vd(e, t, l) {
    l !== null && typeof l == 'object' && typeof l.then == 'function'
      ? l.then(
          function (n) {
            bd(e, t, n);
          },
          function (n) {
            return Mc(e, t, n);
          }
        )
      : bd(e, t, l);
  }
  function bd(e, t, l) {
    ((t.status = 'fulfilled'),
      (t.value = l),
      Sd(t),
      (e.state = l),
      (t = e.pending),
      t !== null &&
        ((l = t.next), l === t ? (e.pending = null) : ((l = l.next), (t.next = l), _d(e, l))));
  }
  function Mc(e, t, l) {
    var n = e.pending;
    if (((e.pending = null), n !== null)) {
      n = n.next;
      do ((t.status = 'rejected'), (t.reason = l), Sd(t), (t = t.next));
      while (t !== n);
    }
    e.action = null;
  }
  function Sd(e) {
    e = e.listeners;
    for (var t = 0; t < e.length; t++) (0, e[t])();
  }
  function xd(e, t) {
    return t;
  }
  function Ed(e, t) {
    if (Ae) {
      var l = Ge.formState;
      if (l !== null) {
        e: {
          var n = _e;
          if (Ae) {
            if (Ye) {
              t: {
                for (var u = Ye, c = $t; u.nodeType !== 8; ) {
                  if (!c) {
                    u = null;
                    break t;
                  }
                  if (((u = Vt(u.nextSibling)), u === null)) {
                    u = null;
                    break t;
                  }
                }
                ((c = u.data), (u = c === 'F!' || c === 'F' ? u : null));
              }
              if (u) {
                ((Ye = Vt(u.nextSibling)), (n = u.data === 'F!'));
                break e;
              }
            }
            Hl(n);
          }
          n = !1;
        }
        n && (t = l[0]);
      }
    }
    return (
      (l = gt()),
      (l.memoizedState = l.baseState = t),
      (n = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: xd,
        lastRenderedState: t,
      }),
      (l.queue = n),
      (l = Yd.bind(null, _e, n)),
      (n.dispatch = l),
      (n = Cc(!1)),
      (c = Dc.bind(null, _e, !1, n.queue)),
      (n = gt()),
      (u = { state: t, dispatch: null, action: e, pending: null }),
      (n.queue = u),
      (l = Fg.bind(null, _e, u, c, l)),
      (u.dispatch = l),
      (n.memoizedState = e),
      [t, l, !1]
    );
  }
  function Td(e) {
    var t = Fe();
    return Nd(t, Ue, e);
  }
  function Nd(e, t, l) {
    if (
      ((t = kc(e, t, xd)[0]),
      (e = yu(bl)[0]),
      typeof t == 'object' && t !== null && typeof t.then == 'function')
    )
      try {
        var n = ei(t);
      } catch (f) {
        throw f === ea ? uu : f;
      }
    else n = t;
    t = Fe();
    var u = t.queue,
      c = u.dispatch;
    return (
      l !== t.memoizedState &&
        ((_e.flags |= 2048), ia(9, { destroy: void 0 }, Pg.bind(null, u, l), null)),
      [n, c, e]
    );
  }
  function Pg(e, t) {
    e.action = t;
  }
  function kd(e) {
    var t = Fe(),
      l = Ue;
    if (l !== null) return Nd(t, l, e);
    (Fe(), (t = t.memoizedState), (l = Fe()));
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
    return Fe().memoizedState;
  }
  function gu(e, t, l, n) {
    var u = gt();
    ((_e.flags |= e),
      (u.memoizedState = ia(1 | t, { destroy: void 0 }, l, n === void 0 ? null : n)));
  }
  function _u(e, t, l, n) {
    var u = Fe();
    n = n === void 0 ? null : n;
    var c = u.memoizedState.inst;
    Ue !== null && n !== null && bc(n, Ue.memoizedState.deps)
      ? (u.memoizedState = ia(t, c, l, n))
      : ((_e.flags |= e), (u.memoizedState = ia(1 | t, c, l, n)));
  }
  function Cd(e, t) {
    gu(8390656, 8, e, t);
  }
  function Rc(e, t) {
    _u(2048, 8, e, t);
  }
  function e_(e) {
    _e.flags |= 4;
    var t = _e.updateQueue;
    if (t === null) ((t = hu()), (_e.updateQueue = t), (t.events = [e]));
    else {
      var l = t.events;
      l === null ? (t.events = [e]) : l.push(e);
    }
  }
  function Md(e) {
    var t = Fe().memoizedState;
    return (
      e_({ ref: t, nextImpl: e }),
      function () {
        if ((Oe & 2) !== 0) throw Error(s(440));
        return t.impl.apply(void 0, arguments);
      }
    );
  }
  function Rd(e, t) {
    return _u(4, 2, e, t);
  }
  function jd(e, t) {
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
  function wd(e, t, l) {
    ((l = l != null ? l.concat([e]) : null), _u(4, 4, Od.bind(null, t, e), l));
  }
  function jc() {}
  function zd(e, t) {
    var l = Fe();
    t = t === void 0 ? null : t;
    var n = l.memoizedState;
    return t !== null && bc(t, n[1]) ? n[0] : ((l.memoizedState = [e, t]), e);
  }
  function Dd(e, t) {
    var l = Fe();
    t = t === void 0 ? null : t;
    var n = l.memoizedState;
    if (t !== null && bc(t, n[1])) return n[0];
    if (((n = e()), kn)) {
      Dl(!0);
      try {
        e();
      } finally {
        Dl(!1);
      }
    }
    return ((l.memoizedState = [n, t]), n);
  }
  function Oc(e, t, l) {
    return l === void 0 || ((vl & 1073741824) !== 0 && (Ne & 261930) === 0)
      ? (e.memoizedState = t)
      : ((e.memoizedState = l), (e = Bm()), (_e.lanes |= e), (Il |= e), l);
  }
  function Bd(e, t, l, n) {
    return Mt(l, t)
      ? l
      : la.current !== null
        ? ((e = Oc(e, l, n)), Mt(e, t) || (tt = !0), e)
        : (vl & 42) === 0 || ((vl & 1073741824) !== 0 && (Ne & 261930) === 0)
          ? ((tt = !0), (e.memoizedState = l))
          : ((e = Bm()), (_e.lanes |= e), (Il |= e), t);
  }
  function Ud(e, t, l, n, u) {
    var c = J.p;
    J.p = c !== 0 && 8 > c ? c : 8;
    var f = U.T,
      p = {};
    ((U.T = p), Dc(e, !1, t, l));
    try {
      var x = u(),
        z = U.S;
      if (
        (z !== null && z(p, x), x !== null && typeof x == 'object' && typeof x.then == 'function')
      ) {
        var q = Ig(x, n);
        ti(e, t, q, Dt(e));
      } else ti(e, t, n, Dt(e));
    } catch (X) {
      ti(e, t, { then: function () {}, status: 'rejected', reason: X }, Dt());
    } finally {
      ((J.p = c), f !== null && p.types !== null && (f.types = p.types), (U.T = f));
    }
  }
  function t_() {}
  function wc(e, t, l, n) {
    if (e.tag !== 5) throw Error(s(476));
    var u = Ld(e).queue;
    Ud(
      e,
      u,
      t,
      te,
      l === null
        ? t_
        : function () {
            return (qd(e), l(n));
          }
    );
  }
  function Ld(e) {
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
        lastRenderedReducer: bl,
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
          lastRenderedReducer: bl,
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
  function qd(e) {
    var t = Ld(e);
    (t.next === null && (t = e.alternate.memoizedState), ti(e, t.next.queue, {}, Dt()));
  }
  function zc() {
    return rt(_i);
  }
  function Hd() {
    return Fe().memoizedState;
  }
  function Gd() {
    return Fe().memoizedState;
  }
  function l_(e) {
    for (var t = e.return; t !== null; ) {
      switch (t.tag) {
        case 24:
        case 3:
          var l = Dt();
          e = $l(l);
          var n = Xl(t, e, l);
          (n !== null && (Nt(n, t, l), Ja(n, t, l)), (t = { cache: oc() }), (e.payload = t));
          return;
      }
      t = t.return;
    }
  }
  function n_(e, t, l) {
    var n = Dt();
    ((l = {
      lane: n,
      revertLane: 0,
      gesture: null,
      action: l,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    }),
      vu(e) ? $d(t, l) : ((l = Fs(e, t, l, n)), l !== null && (Nt(l, e, n), Xd(l, t, n))));
  }
  function Yd(e, t, l) {
    var n = Dt();
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
    if (vu(e)) $d(t, u);
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
            return (Pi(e, t, u, 0), Ge === null && Fi(), !1);
        } catch {
        } finally {
        }
      if (((l = Fs(e, t, u, n)), l !== null)) return (Nt(l, e, n), Xd(l, t, n), !0);
    }
    return !1;
  }
  function Dc(e, t, l, n) {
    if (
      ((n = {
        lane: 2,
        revertLane: ho(),
        gesture: null,
        action: n,
        hasEagerState: !1,
        eagerState: null,
        next: null,
      }),
      vu(e))
    ) {
      if (t) throw Error(s(479));
    } else ((t = Fs(e, l, n, 2)), t !== null && Nt(t, e, 2));
  }
  function vu(e) {
    var t = e.alternate;
    return e === _e || (t !== null && t === _e);
  }
  function $d(e, t) {
    na = du = !0;
    var l = e.pending;
    (l === null ? (t.next = t) : ((t.next = l.next), (l.next = t)), (e.pending = t));
  }
  function Xd(e, t, l) {
    if ((l & 4194048) !== 0) {
      var n = t.lanes;
      ((n &= e.pendingLanes), (l |= n), (t.lanes = l), Kr(e, l));
    }
  }
  var li = {
    readContext: rt,
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
  li.useEffectEvent = Ke;
  var Vd = {
      readContext: rt,
      use: pu,
      useCallback: function (e, t) {
        return ((gt().memoizedState = [e, t === void 0 ? null : t]), e);
      },
      useContext: rt,
      useEffect: Cd,
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
        var l = gt();
        t = t === void 0 ? null : t;
        var n = e();
        if (kn) {
          Dl(!0);
          try {
            e();
          } finally {
            Dl(!1);
          }
        }
        return ((l.memoizedState = [n, t]), n);
      },
      useReducer: function (e, t, l) {
        var n = gt();
        if (l !== void 0) {
          var u = l(t);
          if (kn) {
            Dl(!0);
            try {
              l(t);
            } finally {
              Dl(!1);
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
          (e = e.dispatch = n_.bind(null, _e, e)),
          [n.memoizedState, e]
        );
      },
      useRef: function (e) {
        var t = gt();
        return ((e = { current: e }), (t.memoizedState = e));
      },
      useState: function (e) {
        e = Cc(e);
        var t = e.queue,
          l = Yd.bind(null, _e, t);
        return ((t.dispatch = l), [e.memoizedState, l]);
      },
      useDebugValue: jc,
      useDeferredValue: function (e, t) {
        var l = gt();
        return Oc(l, e, t);
      },
      useTransition: function () {
        var e = Cc(!1);
        return ((e = Ud.bind(null, _e, e.queue, !0, !1)), (gt().memoizedState = e), [!1, e]);
      },
      useSyncExternalStore: function (e, t, l) {
        var n = _e,
          u = gt();
        if (Ae) {
          if (l === void 0) throw Error(s(407));
          l = l();
        } else {
          if (((l = t()), Ge === null)) throw Error(s(349));
          (Ne & 127) !== 0 || dd(n, t, l);
        }
        u.memoizedState = l;
        var c = { value: l, getSnapshot: t };
        return (
          (u.queue = c),
          Cd(hd.bind(null, n, c, e), [e]),
          (n.flags |= 2048),
          ia(9, { destroy: void 0 }, md.bind(null, n, c, l, t), null),
          l
        );
      },
      useId: function () {
        var e = gt(),
          t = Ge.identifierPrefix;
        if (Ae) {
          var l = al,
            n = nl;
          ((l = (n & ~(1 << (32 - Ct(n) - 1))).toString(32) + l),
            (t = '_' + t + 'R_' + l),
            (l = mu++),
            0 < l && (t += 'H' + l.toString(32)),
            (t += '_'));
        } else ((l = Jg++), (t = '_' + t + 'r_' + l.toString(32) + '_'));
        return (e.memoizedState = t);
      },
      useHostTransitionStatus: zc,
      useFormState: Ed,
      useActionState: Ed,
      useOptimistic: function (e) {
        var t = gt();
        t.memoizedState = t.baseState = e;
        var l = {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: null,
          lastRenderedState: null,
        };
        return ((t.queue = l), (t = Dc.bind(null, _e, !0, l)), (l.dispatch = t), [e, t]);
      },
      useMemoCache: Nc,
      useCacheRefresh: function () {
        return (gt().memoizedState = l_.bind(null, _e));
      },
      useEffectEvent: function (e) {
        var t = gt(),
          l = { impl: e };
        return (
          (t.memoizedState = l),
          function () {
            if ((Oe & 2) !== 0) throw Error(s(440));
            return l.impl.apply(void 0, arguments);
          }
        );
      },
    },
    Bc = {
      readContext: rt,
      use: pu,
      useCallback: zd,
      useContext: rt,
      useEffect: Rc,
      useImperativeHandle: wd,
      useInsertionEffect: Rd,
      useLayoutEffect: jd,
      useMemo: Dd,
      useReducer: yu,
      useRef: Ad,
      useState: function () {
        return yu(bl);
      },
      useDebugValue: jc,
      useDeferredValue: function (e, t) {
        var l = Fe();
        return Bd(l, Ue.memoizedState, e, t);
      },
      useTransition: function () {
        var e = yu(bl)[0],
          t = Fe().memoizedState;
        return [typeof e == 'boolean' ? e : ei(e), t];
      },
      useSyncExternalStore: fd,
      useId: Hd,
      useHostTransitionStatus: zc,
      useFormState: Td,
      useActionState: Td,
      useOptimistic: function (e, t) {
        var l = Fe();
        return gd(l, Ue, e, t);
      },
      useMemoCache: Nc,
      useCacheRefresh: Gd,
    };
  Bc.useEffectEvent = Md;
  var Qd = {
    readContext: rt,
    use: pu,
    useCallback: zd,
    useContext: rt,
    useEffect: Rc,
    useImperativeHandle: wd,
    useInsertionEffect: Rd,
    useLayoutEffect: jd,
    useMemo: Dd,
    useReducer: Ac,
    useRef: Ad,
    useState: function () {
      return Ac(bl);
    },
    useDebugValue: jc,
    useDeferredValue: function (e, t) {
      var l = Fe();
      return Ue === null ? Oc(l, e, t) : Bd(l, Ue.memoizedState, e, t);
    },
    useTransition: function () {
      var e = Ac(bl)[0],
        t = Fe().memoizedState;
      return [typeof e == 'boolean' ? e : ei(e), t];
    },
    useSyncExternalStore: fd,
    useId: Hd,
    useHostTransitionStatus: zc,
    useFormState: kd,
    useActionState: kd,
    useOptimistic: function (e, t) {
      var l = Fe();
      return Ue !== null ? gd(l, Ue, e, t) : ((l.baseState = e), [e, l.queue.dispatch]);
    },
    useMemoCache: Nc,
    useCacheRefresh: Gd,
  };
  Qd.useEffectEvent = Md;
  function Uc(e, t, l, n) {
    ((t = e.memoizedState),
      (l = l(n, t)),
      (l = l == null ? t : b({}, t, l)),
      (e.memoizedState = l),
      e.lanes === 0 && (e.updateQueue.baseState = l));
  }
  var Lc = {
    enqueueSetState: function (e, t, l) {
      e = e._reactInternals;
      var n = Dt(),
        u = $l(n);
      ((u.payload = t),
        l != null && (u.callback = l),
        (t = Xl(e, u, n)),
        t !== null && (Nt(t, e, n), Ja(t, e, n)));
    },
    enqueueReplaceState: function (e, t, l) {
      e = e._reactInternals;
      var n = Dt(),
        u = $l(n);
      ((u.tag = 1),
        (u.payload = t),
        l != null && (u.callback = l),
        (t = Xl(e, u, n)),
        t !== null && (Nt(t, e, n), Ja(t, e, n)));
    },
    enqueueForceUpdate: function (e, t) {
      e = e._reactInternals;
      var l = Dt(),
        n = $l(l);
      ((n.tag = 2),
        t != null && (n.callback = t),
        (t = Xl(e, n, l)),
        t !== null && (Nt(t, e, l), Ja(t, e, l)));
    },
  };
  function Zd(e, t, l, n, u, c, f) {
    return (
      (e = e.stateNode),
      typeof e.shouldComponentUpdate == 'function'
        ? e.shouldComponentUpdate(n, c, f)
        : t.prototype && t.prototype.isPureReactComponent
          ? !Ya(l, n) || !Ya(u, c)
          : !0
    );
  }
  function Kd(e, t, l, n) {
    ((e = t.state),
      typeof t.componentWillReceiveProps == 'function' && t.componentWillReceiveProps(l, n),
      typeof t.UNSAFE_componentWillReceiveProps == 'function' &&
        t.UNSAFE_componentWillReceiveProps(l, n),
      t.state !== e && Lc.enqueueReplaceState(t, t.state, null));
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
  function Id(e) {
    Wi(e);
  }
  function Jd(e) {
    console.error(e);
  }
  function Wd(e) {
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
  function Fd(e, t, l) {
    try {
      var n = e.onCaughtError;
      n(l.value, { componentStack: l.stack, errorBoundary: t.tag === 1 ? t.stateNode : null });
    } catch (u) {
      setTimeout(function () {
        throw u;
      });
    }
  }
  function qc(e, t, l) {
    return (
      (l = $l(l)),
      (l.tag = 3),
      (l.payload = { element: null }),
      (l.callback = function () {
        bu(e, t);
      }),
      l
    );
  }
  function Pd(e) {
    return ((e = $l(e)), (e.tag = 3), e);
  }
  function em(e, t, l, n) {
    var u = l.type.getDerivedStateFromError;
    if (typeof u == 'function') {
      var c = n.value;
      ((e.payload = function () {
        return u(c);
      }),
        (e.callback = function () {
          Fd(t, l, n);
        }));
    }
    var f = l.stateNode;
    f !== null &&
      typeof f.componentDidCatch == 'function' &&
      (e.callback = function () {
        (Fd(t, l, n),
          typeof u != 'function' && (Jl === null ? (Jl = new Set([this])) : Jl.add(this)));
        var p = n.stack;
        this.componentDidCatch(n.value, { componentStack: p !== null ? p : '' });
      });
  }
  function a_(e, t, l, n, u) {
    if (((l.flags |= 32768), n !== null && typeof n == 'object' && typeof n.then == 'function')) {
      if (((t = l.alternate), t !== null && Wn(t, l, u, !0), (l = jt.current), l !== null)) {
        switch (l.tag) {
          case 31:
          case 13:
            return (
              Xt === null ? Ou() : l.alternate === null && Ie === 0 && (Ie = 3),
              (l.flags &= -257),
              (l.flags |= 65536),
              (l.lanes = u),
              n === su
                ? (l.flags |= 16384)
                : ((t = l.updateQueue),
                  t === null ? (l.updateQueue = new Set([n])) : t.add(n),
                  ro(e, n, u)),
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
                  ro(e, n, u)),
              !1
            );
        }
        throw Error(s(435, l.tag));
      }
      return (ro(e, n, u), Ou(), !1);
    }
    if (Ae)
      return (
        (t = jt.current),
        t !== null
          ? ((t.flags & 65536) === 0 && (t.flags |= 256),
            (t.flags |= 65536),
            (t.lanes = u),
            n !== ac && ((e = Error(s(422), { cause: n })), Va(Ht(e, l))))
          : (n !== ac && ((t = Error(s(423), { cause: n })), Va(Ht(t, l))),
            (e = e.current.alternate),
            (e.flags |= 65536),
            (u &= -u),
            (e.lanes |= u),
            (n = Ht(n, l)),
            (u = qc(e.stateNode, n, u)),
            pc(e, u),
            Ie !== 4 && (Ie = 2)),
        !1
      );
    var c = Error(s(520), { cause: n });
    if (((c = Ht(c, l)), ri === null ? (ri = [c]) : ri.push(c), Ie !== 4 && (Ie = 2), t === null))
      return !0;
    ((n = Ht(n, l)), (l = t));
    do {
      switch (l.tag) {
        case 3:
          return (
            (l.flags |= 65536),
            (e = u & -u),
            (l.lanes |= e),
            (e = qc(l.stateNode, n, e)),
            pc(l, e),
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
                  (Jl === null || !Jl.has(c)))))
          )
            return (
              (l.flags |= 65536),
              (u &= -u),
              (l.lanes |= u),
              (u = Pd(u)),
              em(u, e, l, n),
              pc(l, u),
              !1
            );
      }
      l = l.return;
    } while (l !== null);
    return !1;
  }
  var Hc = Error(s(461)),
    tt = !1;
  function ft(e, t, l, n) {
    t.child = e === null ? ad(t, null, l, n) : Nn(t, e.child, l, n);
  }
  function tm(e, t, l, n, u) {
    l = l.render;
    var c = t.ref;
    if ('ref' in n) {
      var f = {};
      for (var p in n) p !== 'ref' && (f[p] = n[p]);
    } else f = n;
    return (
      Sn(t),
      (n = Sc(e, t, l, f, c, u)),
      (p = xc()),
      e !== null && !tt
        ? (Ec(e, t, u), Sl(e, t, u))
        : (Ae && p && lc(t), (t.flags |= 1), ft(e, t, n, u), t.child)
    );
  }
  function lm(e, t, l, n, u) {
    if (e === null) {
      var c = l.type;
      return typeof c == 'function' && !Ps(c) && c.defaultProps === void 0 && l.compare === null
        ? ((t.tag = 15), (t.type = c), nm(e, t, c, n, u))
        : ((e = tu(l.type, null, n, t, t.mode, u)), (e.ref = t.ref), (e.return = t), (t.child = e));
    }
    if (((c = e.child), !Kc(e, u))) {
      var f = c.memoizedProps;
      if (((l = l.compare), (l = l !== null ? l : Ya), l(f, n) && e.ref === t.ref))
        return Sl(e, t, u);
    }
    return ((t.flags |= 1), (e = pl(c, n)), (e.ref = t.ref), (e.return = t), (t.child = e));
  }
  function nm(e, t, l, n, u) {
    if (e !== null) {
      var c = e.memoizedProps;
      if (Ya(c, n) && e.ref === t.ref)
        if (((tt = !1), (t.pendingProps = n = c), Kc(e, u))) (e.flags & 131072) !== 0 && (tt = !0);
        else return ((t.lanes = e.lanes), Sl(e, t, u));
    }
    return Gc(e, t, l, n, u);
  }
  function am(e, t, l, n) {
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
        return im(e, t, c, l, n);
      }
      if ((l & 536870912) !== 0)
        ((t.memoizedState = { baseLanes: 0, cachePool: null }),
          e !== null && iu(t, c !== null ? c.cachePool : null),
          c !== null ? sd(t, c) : gc(),
          cd(t));
      else return ((n = t.lanes = 536870912), im(e, t, c !== null ? c.baseLanes | l : l, l, n));
    } else
      c !== null
        ? (iu(t, c.cachePool), sd(t, c), Ql(), (t.memoizedState = null))
        : (e !== null && iu(t, null), gc(), Ql());
    return (ft(e, t, u, l), t.child);
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
  function im(e, t, l, n, u) {
    var c = fc();
    return (
      (c = c === null ? null : { parent: Pe._currentValue, pool: c }),
      (t.memoizedState = { baseLanes: l, cachePool: c }),
      e !== null && iu(t, null),
      gc(),
      cd(t),
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
  function um(e, t, l) {
    return (
      Nn(t, e.child, null, l),
      (e = Su(t, t.pendingProps)),
      (e.flags |= 2),
      Ot(t),
      (t.memoizedState = null),
      e
    );
  }
  function i_(e, t, l) {
    var n = t.pendingProps,
      u = (t.flags & 128) !== 0;
    if (((t.flags &= -129), e === null)) {
      if (Ae) {
        if (n.mode === 'hidden') return ((e = Su(t, n)), (t.lanes = 536870912), ni(null, e));
        if (
          (vc(t),
          (e = Ye)
            ? ((e = _h(e, $t)),
              (e = e !== null && e.data === '&' ? e : null),
              e !== null &&
                ((t.memoizedState = {
                  dehydrated: e,
                  treeContext: Ll !== null ? { id: nl, overflow: al } : null,
                  retryLane: 536870912,
                  hydrationErrors: null,
                }),
                (l = $f(e)),
                (l.return = t),
                (t.child = l),
                (ot = t),
                (Ye = null)))
            : (e = null),
          e === null)
        )
          throw Hl(t);
        return ((t.lanes = 536870912), null);
      }
      return Su(t, n);
    }
    var c = e.memoizedState;
    if (c !== null) {
      var f = c.dehydrated;
      if ((vc(t), u))
        if (t.flags & 256) ((t.flags &= -257), (t = um(e, t, l)));
        else if (t.memoizedState !== null) ((t.child = e.child), (t.flags |= 128), (t = null));
        else throw Error(s(558));
      else if ((tt || Wn(e, t, l, !1), (u = (l & e.childLanes) !== 0), tt || u)) {
        if (((n = Ge), n !== null && ((f = Ir(n, l)), f !== 0 && f !== c.retryLane)))
          throw ((c.retryLane = f), gn(e, f), Nt(n, e, f), Hc);
        (Ou(), (t = um(e, t, l)));
      } else
        ((e = c.treeContext),
          (Ye = Vt(f.nextSibling)),
          (ot = t),
          (Ae = !0),
          (ql = null),
          ($t = !1),
          e !== null && Qf(t, e),
          (t = Su(t, n)),
          (t.flags |= 4096));
      return t;
    }
    return (
      (e = pl(e.child, { mode: n.mode, children: n.children })),
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
  function Gc(e, t, l, n, u) {
    return (
      Sn(t),
      (l = Sc(e, t, l, n, void 0, u)),
      (n = xc()),
      e !== null && !tt
        ? (Ec(e, t, u), Sl(e, t, u))
        : (Ae && n && lc(t), (t.flags |= 1), ft(e, t, l, u), t.child)
    );
  }
  function sm(e, t, l, n, u, c) {
    return (
      Sn(t),
      (t.updateQueue = null),
      (l = rd(t, n, l, u)),
      od(e),
      (n = xc()),
      e !== null && !tt
        ? (Ec(e, t, c), Sl(e, t, c))
        : (Ae && n && lc(t), (t.flags |= 1), ft(e, t, l, c), t.child)
    );
  }
  function cm(e, t, l, n, u) {
    if ((Sn(t), t.stateNode === null)) {
      var c = Zn,
        f = l.contextType;
      (typeof f == 'object' && f !== null && (c = rt(f)),
        (c = new l(n, c)),
        (t.memoizedState = c.state !== null && c.state !== void 0 ? c.state : null),
        (c.updater = Lc),
        (t.stateNode = c),
        (c._reactInternals = t),
        (c = t.stateNode),
        (c.props = n),
        (c.state = t.memoizedState),
        (c.refs = {}),
        mc(t),
        (f = l.contextType),
        (c.context = typeof f == 'object' && f !== null ? rt(f) : Zn),
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
          f !== c.state && Lc.enqueueReplaceState(c, c.state, null),
          Fa(t, n, c, u),
          Wa(),
          (c.state = t.memoizedState)),
        typeof c.componentDidMount == 'function' && (t.flags |= 4194308),
        (n = !0));
    } else if (e === null) {
      c = t.stateNode;
      var p = t.memoizedProps,
        x = An(l, p);
      c.props = x;
      var z = c.context,
        q = l.contextType;
      ((f = Zn), typeof q == 'object' && q !== null && (f = rt(q)));
      var X = l.getDerivedStateFromProps;
      ((q = typeof X == 'function' || typeof c.getSnapshotBeforeUpdate == 'function'),
        (p = t.pendingProps !== p),
        q ||
          (typeof c.UNSAFE_componentWillReceiveProps != 'function' &&
            typeof c.componentWillReceiveProps != 'function') ||
          ((p || z !== f) && Kd(t, c, n, f)),
        (Yl = !1));
      var D = t.memoizedState;
      ((c.state = D),
        Fa(t, n, c, u),
        Wa(),
        (z = t.memoizedState),
        p || D !== z || Yl
          ? (typeof X == 'function' && (Uc(t, l, X, n), (z = t.memoizedState)),
            (x = Yl || Zd(t, l, x, n, D, z, f))
              ? (q ||
                  (typeof c.UNSAFE_componentWillMount != 'function' &&
                    typeof c.componentWillMount != 'function') ||
                  (typeof c.componentWillMount == 'function' && c.componentWillMount(),
                  typeof c.UNSAFE_componentWillMount == 'function' &&
                    c.UNSAFE_componentWillMount()),
                typeof c.componentDidMount == 'function' && (t.flags |= 4194308))
              : (typeof c.componentDidMount == 'function' && (t.flags |= 4194308),
                (t.memoizedProps = n),
                (t.memoizedState = z)),
            (c.props = n),
            (c.state = z),
            (c.context = f),
            (n = x))
          : (typeof c.componentDidMount == 'function' && (t.flags |= 4194308), (n = !1)));
    } else {
      ((c = t.stateNode),
        hc(e, t),
        (f = t.memoizedProps),
        (q = An(l, f)),
        (c.props = q),
        (X = t.pendingProps),
        (D = c.context),
        (z = l.contextType),
        (x = Zn),
        typeof z == 'object' && z !== null && (x = rt(z)),
        (p = l.getDerivedStateFromProps),
        (z = typeof p == 'function' || typeof c.getSnapshotBeforeUpdate == 'function') ||
          (typeof c.UNSAFE_componentWillReceiveProps != 'function' &&
            typeof c.componentWillReceiveProps != 'function') ||
          ((f !== X || D !== x) && Kd(t, c, n, x)),
        (Yl = !1),
        (D = t.memoizedState),
        (c.state = D),
        Fa(t, n, c, u),
        Wa());
      var B = t.memoizedState;
      f !== X || D !== B || Yl || (e !== null && e.dependencies !== null && nu(e.dependencies))
        ? (typeof p == 'function' && (Uc(t, l, p, n), (B = t.memoizedState)),
          (q =
            Yl ||
            Zd(t, l, q, n, D, B, x) ||
            (e !== null && e.dependencies !== null && nu(e.dependencies)))
            ? (z ||
                (typeof c.UNSAFE_componentWillUpdate != 'function' &&
                  typeof c.componentWillUpdate != 'function') ||
                (typeof c.componentWillUpdate == 'function' && c.componentWillUpdate(n, B, x),
                typeof c.UNSAFE_componentWillUpdate == 'function' &&
                  c.UNSAFE_componentWillUpdate(n, B, x)),
              typeof c.componentDidUpdate == 'function' && (t.flags |= 4),
              typeof c.getSnapshotBeforeUpdate == 'function' && (t.flags |= 1024))
            : (typeof c.componentDidUpdate != 'function' ||
                (f === e.memoizedProps && D === e.memoizedState) ||
                (t.flags |= 4),
              typeof c.getSnapshotBeforeUpdate != 'function' ||
                (f === e.memoizedProps && D === e.memoizedState) ||
                (t.flags |= 1024),
              (t.memoizedProps = n),
              (t.memoizedState = B)),
          (c.props = n),
          (c.state = B),
          (c.context = x),
          (n = q))
        : (typeof c.componentDidUpdate != 'function' ||
            (f === e.memoizedProps && D === e.memoizedState) ||
            (t.flags |= 4),
          typeof c.getSnapshotBeforeUpdate != 'function' ||
            (f === e.memoizedProps && D === e.memoizedState) ||
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
            : ft(e, t, l, u),
          (t.memoizedState = c.state),
          (e = t.child))
        : (e = Sl(e, t, u)),
      e
    );
  }
  function om(e, t, l, n) {
    return (vn(), (t.flags |= 256), ft(e, t, l, n), t.child);
  }
  var Yc = { dehydrated: null, treeContext: null, retryLane: 0, hydrationErrors: null };
  function $c(e) {
    return { baseLanes: e, cachePool: Ff() };
  }
  function Xc(e, t, l) {
    return ((e = e !== null ? e.childLanes & ~l : 0), t && (e |= zt), e);
  }
  function rm(e, t, l) {
    var n = t.pendingProps,
      u = !1,
      c = (t.flags & 128) !== 0,
      f;
    if (
      ((f = c) || (f = e !== null && e.memoizedState === null ? !1 : (We.current & 2) !== 0),
      f && ((u = !0), (t.flags &= -129)),
      (f = (t.flags & 32) !== 0),
      (t.flags &= -33),
      e === null)
    ) {
      if (Ae) {
        if (
          (u ? Vl(t) : Ql(),
          (e = Ye)
            ? ((e = _h(e, $t)),
              (e = e !== null && e.data !== '&' ? e : null),
              e !== null &&
                ((t.memoizedState = {
                  dehydrated: e,
                  treeContext: Ll !== null ? { id: nl, overflow: al } : null,
                  retryLane: 536870912,
                  hydrationErrors: null,
                }),
                (l = $f(e)),
                (l.return = t),
                (t.child = l),
                (ot = t),
                (Ye = null)))
            : (e = null),
          e === null)
        )
          throw Hl(t);
        return (Ao(e) ? (t.lanes = 32) : (t.lanes = 536870912), null);
      }
      var p = n.children;
      return (
        (n = n.fallback),
        u
          ? (Ql(),
            (u = t.mode),
            (p = Eu({ mode: 'hidden', children: p }, u)),
            (n = _n(n, u, l, null)),
            (p.return = t),
            (n.return = t),
            (p.sibling = n),
            (t.child = p),
            (n = t.child),
            (n.memoizedState = $c(l)),
            (n.childLanes = Xc(e, f, l)),
            (t.memoizedState = Yc),
            ni(null, n))
          : (Vl(t), Vc(t, p))
      );
    }
    var x = e.memoizedState;
    if (x !== null && ((p = x.dehydrated), p !== null)) {
      if (c)
        t.flags & 256
          ? (Vl(t), (t.flags &= -257), (t = Qc(e, t, l)))
          : t.memoizedState !== null
            ? (Ql(), (t.child = e.child), (t.flags |= 128), (t = null))
            : (Ql(),
              (p = n.fallback),
              (u = t.mode),
              (n = Eu({ mode: 'visible', children: n.children }, u)),
              (p = _n(p, u, l, null)),
              (p.flags |= 2),
              (n.return = t),
              (p.return = t),
              (n.sibling = p),
              (t.child = n),
              Nn(t, e.child, null, l),
              (n = t.child),
              (n.memoizedState = $c(l)),
              (n.childLanes = Xc(e, f, l)),
              (t.memoizedState = Yc),
              (t = ni(null, n)));
      else if ((Vl(t), Ao(p))) {
        if (((f = p.nextSibling && p.nextSibling.dataset), f)) var z = f.dgst;
        ((f = z),
          (n = Error(s(419))),
          (n.stack = ''),
          (n.digest = f),
          Va({ value: n, source: null, stack: null }),
          (t = Qc(e, t, l)));
      } else if ((tt || Wn(e, t, l, !1), (f = (l & e.childLanes) !== 0), tt || f)) {
        if (((f = Ge), f !== null && ((n = Ir(f, l)), n !== 0 && n !== x.retryLane)))
          throw ((x.retryLane = n), gn(e, n), Nt(f, e, n), Hc);
        (ko(p) || Ou(), (t = Qc(e, t, l)));
      } else
        ko(p)
          ? ((t.flags |= 192), (t.child = e.child), (t = null))
          : ((e = x.treeContext),
            (Ye = Vt(p.nextSibling)),
            (ot = t),
            (Ae = !0),
            (ql = null),
            ($t = !1),
            e !== null && Qf(t, e),
            (t = Vc(t, n.children)),
            (t.flags |= 4096));
      return t;
    }
    return u
      ? (Ql(),
        (p = n.fallback),
        (u = t.mode),
        (x = e.child),
        (z = x.sibling),
        (n = pl(x, { mode: 'hidden', children: n.children })),
        (n.subtreeFlags = x.subtreeFlags & 65011712),
        z !== null ? (p = pl(z, p)) : ((p = _n(p, u, l, null)), (p.flags |= 2)),
        (p.return = t),
        (n.return = t),
        (n.sibling = p),
        (t.child = n),
        ni(null, n),
        (n = t.child),
        (p = e.child.memoizedState),
        p === null
          ? (p = $c(l))
          : ((u = p.cachePool),
            u !== null
              ? ((x = Pe._currentValue), (u = u.parent !== x ? { parent: x, pool: x } : u))
              : (u = Ff()),
            (p = { baseLanes: p.baseLanes | l, cachePool: u })),
        (n.memoizedState = p),
        (n.childLanes = Xc(e, f, l)),
        (t.memoizedState = Yc),
        ni(e.child, n))
      : (Vl(t),
        (l = e.child),
        (e = l.sibling),
        (l = pl(l, { mode: 'visible', children: n.children })),
        (l.return = t),
        (l.sibling = null),
        e !== null &&
          ((f = t.deletions), f === null ? ((t.deletions = [e]), (t.flags |= 16)) : f.push(e)),
        (t.child = l),
        (t.memoizedState = null),
        l);
  }
  function Vc(e, t) {
    return ((t = Eu({ mode: 'visible', children: t }, e.mode)), (t.return = e), (e.child = t));
  }
  function Eu(e, t) {
    return ((e = Rt(22, e, null, t)), (e.lanes = 0), e);
  }
  function Qc(e, t, l) {
    return (
      Nn(t, e.child, null, l),
      (e = Vc(t, t.pendingProps.children)),
      (e.flags |= 2),
      (t.memoizedState = null),
      e
    );
  }
  function fm(e, t, l) {
    e.lanes |= t;
    var n = e.alternate;
    (n !== null && (n.lanes |= t), sc(e.return, t, l));
  }
  function Zc(e, t, l, n, u, c) {
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
  function dm(e, t, l) {
    var n = t.pendingProps,
      u = n.revealOrder,
      c = n.tail;
    n = n.children;
    var f = We.current,
      p = (f & 2) !== 0;
    if (
      (p ? ((f = (f & 1) | 2), (t.flags |= 128)) : (f &= 1),
      P(We, f),
      ft(e, t, n, l),
      (n = Ae ? Xa : 0),
      !p && e !== null && (e.flags & 128) !== 0)
    )
      e: for (e = t.child; e !== null; ) {
        if (e.tag === 13) e.memoizedState !== null && fm(e, l, t);
        else if (e.tag === 19) fm(e, l, t);
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
          Zc(t, !1, u, l, c, n));
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
        Zc(t, !0, l, null, c, n);
        break;
      case 'together':
        Zc(t, !1, null, null, void 0, n);
        break;
      default:
        t.memoizedState = null;
    }
    return t.child;
  }
  function Sl(e, t, l) {
    if (
      (e !== null && (t.dependencies = e.dependencies), (Il |= t.lanes), (l & t.childLanes) === 0)
    )
      if (e !== null) {
        if ((Wn(e, t, l, !1), (l & t.childLanes) === 0)) return null;
      } else return null;
    if (e !== null && t.child !== e.child) throw Error(s(153));
    if (t.child !== null) {
      for (e = t.child, l = pl(e, e.pendingProps), t.child = l, l.return = t; e.sibling !== null; )
        ((e = e.sibling), (l = l.sibling = pl(e, e.pendingProps)), (l.return = t));
      l.sibling = null;
    }
    return t.child;
  }
  function Kc(e, t) {
    return (e.lanes & t) !== 0 ? !0 : ((e = e.dependencies), !!(e !== null && nu(e)));
  }
  function u_(e, t, l) {
    switch (t.tag) {
      case 3:
        (it(t, t.stateNode.containerInfo), Gl(t, Pe, e.memoizedState.cache), vn());
        break;
      case 27:
      case 5:
        G(t);
        break;
      case 4:
        it(t, t.stateNode.containerInfo);
        break;
      case 10:
        Gl(t, t.type, t.memoizedProps.value);
        break;
      case 31:
        if (t.memoizedState !== null) return ((t.flags |= 128), vc(t), null);
        break;
      case 13:
        var n = t.memoizedState;
        if (n !== null)
          return n.dehydrated !== null
            ? (Vl(t), (t.flags |= 128), null)
            : (l & t.child.childLanes) !== 0
              ? rm(e, t, l)
              : (Vl(t), (e = Sl(e, t, l)), e !== null ? e.sibling : null);
        Vl(t);
        break;
      case 19:
        var u = (e.flags & 128) !== 0;
        if (
          ((n = (l & t.childLanes) !== 0),
          n || (Wn(e, t, l, !1), (n = (l & t.childLanes) !== 0)),
          u)
        ) {
          if (n) return dm(e, t, l);
          t.flags |= 128;
        }
        if (
          ((u = t.memoizedState),
          u !== null && ((u.rendering = null), (u.tail = null), (u.lastEffect = null)),
          P(We, We.current),
          n)
        )
          break;
        return null;
      case 22:
        return ((t.lanes = 0), am(e, t, l, t.pendingProps));
      case 24:
        Gl(t, Pe, e.memoizedState.cache);
    }
    return Sl(e, t, l);
  }
  function mm(e, t, l) {
    if (e !== null)
      if (e.memoizedProps !== t.pendingProps) tt = !0;
      else {
        if (!Kc(e, l) && (t.flags & 128) === 0) return ((tt = !1), u_(e, t, l));
        tt = (e.flags & 131072) !== 0;
      }
    else ((tt = !1), Ae && (t.flags & 1048576) !== 0 && Vf(t, Xa, t.index));
    switch (((t.lanes = 0), t.tag)) {
      case 16:
        e: {
          var n = t.pendingProps;
          if (((e = En(t.elementType)), (t.type = e), typeof e == 'function'))
            Ps(e)
              ? ((n = An(e, n)), (t.tag = 1), (t = cm(null, t, e, n, l)))
              : ((t.tag = 0), (t = Gc(null, t, e, n, l)));
          else {
            if (e != null) {
              var u = e.$$typeof;
              if (u === V) {
                ((t.tag = 11), (t = tm(null, t, e, n, l)));
                break e;
              } else if (u === Q) {
                ((t.tag = 14), (t = lm(null, t, e, n, l)));
                break e;
              }
            }
            throw ((t = F(e) || e), Error(s(306, t, '')));
          }
        }
        return t;
      case 0:
        return Gc(e, t, t.type, t.pendingProps, l);
      case 1:
        return ((n = t.type), (u = An(n, t.pendingProps)), cm(e, t, n, u, l));
      case 3:
        e: {
          if ((it(t, t.stateNode.containerInfo), e === null)) throw Error(s(387));
          n = t.pendingProps;
          var c = t.memoizedState;
          ((u = c.element), hc(e, t), Fa(t, n, null, l));
          var f = t.memoizedState;
          if (
            ((n = f.cache),
            Gl(t, Pe, n),
            n !== c.cache && cc(t, [Pe], l, !0),
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
              t = om(e, t, n, l);
              break e;
            } else if (n !== u) {
              ((u = Ht(Error(s(424)), t)), Va(u), (t = om(e, t, n, l)));
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
                Ye = Vt(e.firstChild),
                  ot = t,
                  Ae = !0,
                  ql = null,
                  $t = !0,
                  l = ad(t, null, n, l),
                  t.child = l;
                l;
              )
                ((l.flags = (l.flags & -3) | 4096), (l = l.sibling));
            }
          else {
            if ((vn(), n === u)) {
              t = Sl(e, t, l);
              break e;
            }
            ft(e, t, n, l);
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
              : Ae ||
                ((l = t.type),
                (e = t.pendingProps),
                (n = qu(be.current).createElement(l)),
                (n[ct] = t),
                (n[vt] = e),
                dt(n, l, e),
                ut(n),
                (t.stateNode = n))
            : (t.memoizedState = Th(t.type, e.memoizedProps, t.pendingProps, e.memoizedState)),
          null
        );
      case 27:
        return (
          G(t),
          e === null &&
            Ae &&
            ((n = t.stateNode = Sh(t.type, t.pendingProps, be.current)),
            (ot = t),
            ($t = !0),
            (u = Ye),
            en(t.type) ? ((Co = u), (Ye = Vt(n.firstChild))) : (Ye = u)),
          ft(e, t, t.pendingProps.children, l),
          xu(e, t),
          e === null && (t.flags |= 4194304),
          t.child
        );
      case 5:
        return (
          e === null &&
            Ae &&
            ((u = n = Ye) &&
              ((n = B_(n, t.type, t.pendingProps, $t)),
              n !== null
                ? ((t.stateNode = n), (ot = t), (Ye = Vt(n.firstChild)), ($t = !1), (u = !0))
                : (u = !1)),
            u || Hl(t)),
          G(t),
          (u = t.type),
          (c = t.pendingProps),
          (f = e !== null ? e.memoizedProps : null),
          (n = c.children),
          Eo(u, c) ? (n = null) : f !== null && Eo(u, f) && (t.flags |= 32),
          t.memoizedState !== null && ((u = Sc(e, t, Wg, null, null, l)), (_i._currentValue = u)),
          xu(e, t),
          ft(e, t, n, l),
          t.child
        );
      case 6:
        return (
          e === null &&
            Ae &&
            ((e = l = Ye) &&
              ((l = U_(l, t.pendingProps, $t)),
              l !== null ? ((t.stateNode = l), (ot = t), (Ye = null), (e = !0)) : (e = !1)),
            e || Hl(t)),
          null
        );
      case 13:
        return rm(e, t, l);
      case 4:
        return (
          it(t, t.stateNode.containerInfo),
          (n = t.pendingProps),
          e === null ? (t.child = Nn(t, null, n, l)) : ft(e, t, n, l),
          t.child
        );
      case 11:
        return tm(e, t, t.type, t.pendingProps, l);
      case 7:
        return (ft(e, t, t.pendingProps, l), t.child);
      case 8:
        return (ft(e, t, t.pendingProps.children, l), t.child);
      case 12:
        return (ft(e, t, t.pendingProps.children, l), t.child);
      case 10:
        return ((n = t.pendingProps), Gl(t, t.type, n.value), ft(e, t, n.children, l), t.child);
      case 9:
        return (
          (u = t.type._context),
          (n = t.pendingProps.children),
          Sn(t),
          (u = rt(u)),
          (n = n(u)),
          (t.flags |= 1),
          ft(e, t, n, l),
          t.child
        );
      case 14:
        return lm(e, t, t.type, t.pendingProps, l);
      case 15:
        return nm(e, t, t.type, t.pendingProps, l);
      case 19:
        return dm(e, t, l);
      case 31:
        return i_(e, t, l);
      case 22:
        return am(e, t, l, t.pendingProps);
      case 24:
        return (
          Sn(t),
          (n = rt(Pe)),
          e === null
            ? ((u = fc()),
              u === null &&
                ((u = Ge),
                (c = oc()),
                (u.pooledCache = c),
                c.refCount++,
                c !== null && (u.pooledCacheLanes |= l),
                (u = c)),
              (t.memoizedState = { parent: n, cache: u }),
              mc(t),
              Gl(t, Pe, u))
            : ((e.lanes & l) !== 0 && (hc(e, t), Fa(t, null, null, l), Wa()),
              (u = e.memoizedState),
              (c = t.memoizedState),
              u.parent !== n
                ? ((u = { parent: n, cache: n }),
                  (t.memoizedState = u),
                  t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = u),
                  Gl(t, Pe, n))
                : ((n = c.cache), Gl(t, Pe, n), n !== u.cache && cc(t, [Pe], l, !0))),
          ft(e, t, t.pendingProps.children, l),
          t.child
        );
      case 29:
        throw t.pendingProps;
    }
    throw Error(s(156, t.tag));
  }
  function xl(e) {
    e.flags |= 4;
  }
  function Ic(e, t, l, n, u) {
    if (((t = (e.mode & 32) !== 0) && (t = !1), t)) {
      if (((e.flags |= 16777216), (u & 335544128) === u))
        if (e.stateNode.complete) e.flags |= 8192;
        else if (Hm()) e.flags |= 8192;
        else throw ((Tn = su), dc);
    } else e.flags &= -16777217;
  }
  function hm(e, t) {
    if (t.type !== 'stylesheet' || (t.state.loading & 4) !== 0) e.flags &= -16777217;
    else if (((e.flags |= 16777216), !Mh(t)))
      if (Hm()) e.flags |= 8192;
      else throw ((Tn = su), dc);
  }
  function Tu(e, t) {
    (t !== null && (e.flags |= 4),
      e.flags & 16384 && ((t = e.tag !== 22 ? Qr() : 536870912), (e.lanes |= t), (oa |= t)));
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
  function $e(e) {
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
  function s_(e, t, l) {
    var n = t.pendingProps;
    switch ((nc(t), t.tag)) {
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return ($e(t), null);
      case 1:
        return ($e(t), null);
      case 3:
        return (
          (l = t.stateNode),
          (n = null),
          e !== null && (n = e.memoizedState.cache),
          t.memoizedState.cache !== n && (t.flags |= 2048),
          _l(Pe),
          Xe(),
          l.pendingContext && ((l.context = l.pendingContext), (l.pendingContext = null)),
          (e === null || e.child === null) &&
            (Jn(t)
              ? xl(t)
              : e === null ||
                (e.memoizedState.isDehydrated && (t.flags & 256) === 0) ||
                ((t.flags |= 1024), ic())),
          $e(t),
          null
        );
      case 26:
        var u = t.type,
          c = t.memoizedState;
        return (
          e === null
            ? (xl(t), c !== null ? ($e(t), hm(t, c)) : ($e(t), Ic(t, u, null, n, l)))
            : c
              ? c !== e.memoizedState
                ? (xl(t), $e(t), hm(t, c))
                : ($e(t), (t.flags &= -16777217))
              : ((e = e.memoizedProps), e !== n && xl(t), $e(t), Ic(t, u, e, n, l)),
          null
        );
      case 27:
        if ((oe(t), (l = be.current), (u = t.type), e !== null && t.stateNode != null))
          e.memoizedProps !== n && xl(t);
        else {
          if (!n) {
            if (t.stateNode === null) throw Error(s(166));
            return ($e(t), null);
          }
          ((e = le.current), Jn(t) ? Zf(t) : ((e = Sh(u, n, l)), (t.stateNode = e), xl(t)));
        }
        return ($e(t), null);
      case 5:
        if ((oe(t), (u = t.type), e !== null && t.stateNode != null))
          e.memoizedProps !== n && xl(t);
        else {
          if (!n) {
            if (t.stateNode === null) throw Error(s(166));
            return ($e(t), null);
          }
          if (((c = le.current), Jn(t))) Zf(t);
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
            ((c[ct] = t), (c[vt] = n));
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
            e: switch ((dt(c, u, n), u)) {
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
            n && xl(t);
          }
        }
        return ($e(t), Ic(t, t.type, e === null ? null : e.memoizedProps, t.pendingProps, l), null);
      case 6:
        if (e && t.stateNode != null) e.memoizedProps !== n && xl(t);
        else {
          if (typeof n != 'string' && t.stateNode === null) throw Error(s(166));
          if (((e = be.current), Jn(t))) {
            if (((e = t.stateNode), (l = t.memoizedProps), (n = null), (u = ot), u !== null))
              switch (u.tag) {
                case 27:
                case 5:
                  n = u.memoizedProps;
              }
            ((e[ct] = t),
              (e = !!(
                e.nodeValue === l ||
                (n !== null && n.suppressHydrationWarning === !0) ||
                rh(e.nodeValue, l)
              )),
              e || Hl(t, !0));
          } else ((e = qu(e).createTextNode(n)), (e[ct] = t), (t.stateNode = e));
        }
        return ($e(t), null);
      case 31:
        if (((l = t.memoizedState), e === null || e.memoizedState !== null)) {
          if (((n = Jn(t)), l !== null)) {
            if (e === null) {
              if (!n) throw Error(s(318));
              if (((e = t.memoizedState), (e = e !== null ? e.dehydrated : null), !e))
                throw Error(s(557));
              e[ct] = t;
            } else (vn(), (t.flags & 128) === 0 && (t.memoizedState = null), (t.flags |= 4));
            ($e(t), (e = !1));
          } else
            ((l = ic()),
              e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = l),
              (e = !0));
          if (!e) return t.flags & 256 ? (Ot(t), t) : (Ot(t), null);
          if ((t.flags & 128) !== 0) throw Error(s(558));
        }
        return ($e(t), null);
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
              u[ct] = t;
            } else (vn(), (t.flags & 128) === 0 && (t.memoizedState = null), (t.flags |= 4));
            ($e(t), (u = !1));
          } else
            ((u = ic()),
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
              $e(t),
              null)
        );
      case 4:
        return (Xe(), e === null && _o(t.stateNode.containerInfo), $e(t), null);
      case 10:
        return (_l(t.type), $e(t), null);
      case 19:
        if ((H(We), (n = t.memoizedState), n === null)) return ($e(t), null);
        if (((u = (t.flags & 128) !== 0), (c = n.rendering), c === null))
          if (u) ai(n, !1);
          else {
            if (Ie !== 0 || (e !== null && (e.flags & 128) !== 0))
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
                    (Yf(l, e), (l = l.sibling));
                  return (P(We, (We.current & 1) | 2), Ae && yl(t, n.treeForkCount), t.child);
                }
                e = e.sibling;
              }
            n.tail !== null &&
              kt() > Mu &&
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
                return ($e(t), null);
            } else
              2 * kt() - n.renderingStartTime > Mu &&
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
            (n.renderingStartTime = kt()),
            (e.sibling = null),
            (l = We.current),
            P(We, u ? (l & 1) | 2 : l & 1),
            Ae && yl(t, n.treeForkCount),
            e)
          : ($e(t), null);
      case 22:
      case 23:
        return (
          Ot(t),
          _c(),
          (n = t.memoizedState !== null),
          e !== null
            ? (e.memoizedState !== null) !== n && (t.flags |= 8192)
            : n && (t.flags |= 8192),
          n
            ? (l & 536870912) !== 0 &&
              (t.flags & 128) === 0 &&
              ($e(t), t.subtreeFlags & 6 && (t.flags |= 8192))
            : $e(t),
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
          e !== null && H(xn),
          null
        );
      case 24:
        return (
          (l = null),
          e !== null && (l = e.memoizedState.cache),
          t.memoizedState.cache !== l && (t.flags |= 2048),
          _l(Pe),
          $e(t),
          null
        );
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(s(156, t.tag));
  }
  function c_(e, t) {
    switch ((nc(t), t.tag)) {
      case 1:
        return ((e = t.flags), e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null);
      case 3:
        return (
          _l(Pe),
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
          if ((Ot(t), t.alternate === null)) throw Error(s(340));
          vn();
        }
        return ((e = t.flags), e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null);
      case 13:
        if ((Ot(t), (e = t.memoizedState), e !== null && e.dehydrated !== null)) {
          if (t.alternate === null) throw Error(s(340));
          vn();
        }
        return ((e = t.flags), e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null);
      case 19:
        return (H(We), null);
      case 4:
        return (Xe(), null);
      case 10:
        return (_l(t.type), null);
      case 22:
      case 23:
        return (
          Ot(t),
          _c(),
          e !== null && H(xn),
          (e = t.flags),
          e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
        );
      case 24:
        return (_l(Pe), null);
      case 25:
        return null;
      default:
        return null;
    }
  }
  function pm(e, t) {
    switch ((nc(t), t.tag)) {
      case 3:
        (_l(Pe), Xe());
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
        t.memoizedState !== null && Ot(t);
        break;
      case 13:
        Ot(t);
        break;
      case 19:
        H(We);
        break;
      case 10:
        _l(t.type);
        break;
      case 22:
      case 23:
        (Ot(t), _c(), e !== null && H(xn));
        break;
      case 24:
        _l(Pe);
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
      De(t, t.return, p);
    }
  }
  function Zl(e, t, l) {
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
                z = p;
              try {
                z();
              } catch (q) {
                De(u, x, q);
              }
            }
          }
          n = n.next;
        } while (n !== c);
      }
    } catch (q) {
      De(t, t.return, q);
    }
  }
  function ym(e) {
    var t = e.updateQueue;
    if (t !== null) {
      var l = e.stateNode;
      try {
        ud(t, l);
      } catch (n) {
        De(e, e.return, n);
      }
    }
  }
  function gm(e, t, l) {
    ((l.props = An(e.type, e.memoizedProps)), (l.state = e.memoizedState));
    try {
      l.componentWillUnmount();
    } catch (n) {
      De(e, t, n);
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
      De(e, t, u);
    }
  }
  function il(e, t) {
    var l = e.ref,
      n = e.refCleanup;
    if (l !== null)
      if (typeof n == 'function')
        try {
          n();
        } catch (u) {
          De(e, t, u);
        } finally {
          ((e.refCleanup = null), (e = e.alternate), e != null && (e.refCleanup = null));
        }
      else if (typeof l == 'function')
        try {
          l(null);
        } catch (u) {
          De(e, t, u);
        }
      else l.current = null;
  }
  function _m(e) {
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
      De(e, e.return, u);
    }
  }
  function Jc(e, t, l) {
    try {
      var n = e.stateNode;
      (R_(n, e.type, l, t), (n[vt] = t));
    } catch (u) {
      De(e, e.return, u);
    }
  }
  function vm(e) {
    return (
      e.tag === 5 || e.tag === 3 || e.tag === 26 || (e.tag === 27 && en(e.type)) || e.tag === 4
    );
  }
  function Wc(e) {
    e: for (;;) {
      for (; e.sibling === null; ) {
        if (e.return === null || vm(e.return)) return null;
        e = e.return;
      }
      for (
        e.sibling.return = e.return, e = e.sibling;
        e.tag !== 5 && e.tag !== 6 && e.tag !== 18;
      ) {
        if ((e.tag === 27 && en(e.type)) || e.flags & 2 || e.child === null || e.tag === 4)
          continue e;
        ((e.child.return = e), (e = e.child));
      }
      if (!(e.flags & 2)) return e.stateNode;
    }
  }
  function Fc(e, t, l) {
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
            l != null || t.onclick !== null || (t.onclick = ml)));
    else if (
      n !== 4 &&
      (n === 27 && en(e.type) && ((l = e.stateNode), (t = null)), (e = e.child), e !== null)
    )
      for (Fc(e, t, l), e = e.sibling; e !== null; ) (Fc(e, t, l), (e = e.sibling));
  }
  function Nu(e, t, l) {
    var n = e.tag;
    if (n === 5 || n === 6) ((e = e.stateNode), t ? l.insertBefore(e, t) : l.appendChild(e));
    else if (n !== 4 && (n === 27 && en(e.type) && (l = e.stateNode), (e = e.child), e !== null))
      for (Nu(e, t, l), e = e.sibling; e !== null; ) (Nu(e, t, l), (e = e.sibling));
  }
  function bm(e) {
    var t = e.stateNode,
      l = e.memoizedProps;
    try {
      for (var n = e.type, u = t.attributes; u.length; ) t.removeAttributeNode(u[0]);
      (dt(t, n, l), (t[ct] = e), (t[vt] = l));
    } catch (c) {
      De(e, e.return, c);
    }
  }
  var El = !1,
    lt = !1,
    Pc = !1,
    Sm = typeof WeakSet == 'function' ? WeakSet : Set,
    st = null;
  function o_(e, t) {
    if (((e = e.containerInfo), (So = Qu), (e = wf(e)), Qs(e))) {
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
              z = 0,
              q = 0,
              X = e,
              D = null;
            t: for (;;) {
              for (
                var B;
                X !== l || (u !== 0 && X.nodeType !== 3) || (p = f + u),
                  X !== c || (n !== 0 && X.nodeType !== 3) || (x = f + n),
                  X.nodeType === 3 && (f += X.nodeValue.length),
                  (B = X.firstChild) !== null;
              )
                ((D = X), (X = B));
              for (;;) {
                if (X === e) break t;
                if (
                  (D === l && ++z === u && (p = f),
                  D === c && ++q === n && (x = f),
                  (B = X.nextSibling) !== null)
                )
                  break;
                ((X = D), (D = X.parentNode));
              }
              X = B;
            }
            l = p === -1 || x === -1 ? null : { start: p, end: x };
          } else l = null;
        }
      l = l || { start: 0, end: 0 };
    } else l = null;
    for (xo = { focusedElem: e, selectionRange: l }, Qu = !1, st = t; st !== null; )
      if (((t = st), (e = t.child), (t.subtreeFlags & 1028) !== 0 && e !== null))
        ((e.return = t), (st = e));
      else
        for (; st !== null; ) {
          switch (((t = st), (c = t.alternate), (e = t.flags), t.tag)) {
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
                  De(l, l.return, re);
                }
              }
              break;
            case 3:
              if ((e & 1024) !== 0) {
                if (((e = t.stateNode.containerInfo), (l = e.nodeType), l === 9)) No(e);
                else if (l === 1)
                  switch (e.nodeName) {
                    case 'HEAD':
                    case 'HTML':
                    case 'BODY':
                      No(e);
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
            ((e.return = t.return), (st = e));
            break;
          }
          st = t.return;
        }
  }
  function xm(e, t, l) {
    var n = l.flags;
    switch (l.tag) {
      case 0:
      case 11:
      case 15:
        (Nl(e, l), n & 4 && ii(5, l));
        break;
      case 1:
        if ((Nl(e, l), n & 4))
          if (((e = l.stateNode), t === null))
            try {
              e.componentDidMount();
            } catch (f) {
              De(l, l.return, f);
            }
          else {
            var u = An(l.type, t.memoizedProps);
            t = t.memoizedState;
            try {
              e.componentDidUpdate(u, t, e.__reactInternalSnapshotBeforeUpdate);
            } catch (f) {
              De(l, l.return, f);
            }
          }
        (n & 64 && ym(l), n & 512 && ui(l, l.return));
        break;
      case 3:
        if ((Nl(e, l), n & 64 && ((e = l.updateQueue), e !== null))) {
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
            ud(e, t);
          } catch (f) {
            De(l, l.return, f);
          }
        }
        break;
      case 27:
        t === null && n & 4 && bm(l);
      case 26:
      case 5:
        (Nl(e, l), t === null && n & 4 && _m(l), n & 512 && ui(l, l.return));
        break;
      case 12:
        Nl(e, l);
        break;
      case 31:
        (Nl(e, l), n & 4 && Nm(e, l));
        break;
      case 13:
        (Nl(e, l),
          n & 4 && km(e, l),
          n & 64 &&
            ((e = l.memoizedState),
            e !== null && ((e = e.dehydrated), e !== null && ((l = __.bind(null, l)), L_(e, l)))));
        break;
      case 22:
        if (((n = l.memoizedState !== null || El), !n)) {
          ((t = (t !== null && t.memoizedState !== null) || lt), (u = El));
          var c = lt;
          ((El = n),
            (lt = t) && !c ? kl(e, l, (l.subtreeFlags & 8772) !== 0) : Nl(e, l),
            (El = u),
            (lt = c));
        }
        break;
      case 30:
        break;
      default:
        Nl(e, l);
    }
  }
  function Em(e) {
    var t = e.alternate;
    (t !== null && ((e.alternate = null), Em(t)),
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
  var Ve = null,
    St = !1;
  function Tl(e, t, l) {
    for (l = l.child; l !== null; ) (Tm(e, t, l), (l = l.sibling));
  }
  function Tm(e, t, l) {
    if (At && typeof At.onCommitFiberUnmount == 'function')
      try {
        At.onCommitFiberUnmount(Ra, l);
      } catch {}
    switch (l.tag) {
      case 26:
        (lt || il(l, t),
          Tl(e, t, l),
          l.memoizedState
            ? l.memoizedState.count--
            : l.stateNode && ((l = l.stateNode), l.parentNode.removeChild(l)));
        break;
      case 27:
        lt || il(l, t);
        var n = Ve,
          u = St;
        (en(l.type) && ((Ve = l.stateNode), (St = !1)),
          Tl(e, t, l),
          pi(l.stateNode),
          (Ve = n),
          (St = u));
        break;
      case 5:
        lt || il(l, t);
      case 6:
        if (((n = Ve), (u = St), (Ve = null), Tl(e, t, l), (Ve = n), (St = u), Ve !== null))
          if (St)
            try {
              (Ve.nodeType === 9
                ? Ve.body
                : Ve.nodeName === 'HTML'
                  ? Ve.ownerDocument.body
                  : Ve
              ).removeChild(l.stateNode);
            } catch (c) {
              De(l, t, c);
            }
          else
            try {
              Ve.removeChild(l.stateNode);
            } catch (c) {
              De(l, t, c);
            }
        break;
      case 18:
        Ve !== null &&
          (St
            ? ((e = Ve),
              yh(
                e.nodeType === 9 ? e.body : e.nodeName === 'HTML' ? e.ownerDocument.body : e,
                l.stateNode
              ),
              ga(e))
            : yh(Ve, l.stateNode));
        break;
      case 4:
        ((n = Ve),
          (u = St),
          (Ve = l.stateNode.containerInfo),
          (St = !0),
          Tl(e, t, l),
          (Ve = n),
          (St = u));
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        (Zl(2, l, t), lt || Zl(4, l, t), Tl(e, t, l));
        break;
      case 1:
        (lt ||
          (il(l, t), (n = l.stateNode), typeof n.componentWillUnmount == 'function' && gm(l, t, n)),
          Tl(e, t, l));
        break;
      case 21:
        Tl(e, t, l);
        break;
      case 22:
        ((lt = (n = lt) || l.memoizedState !== null), Tl(e, t, l), (lt = n));
        break;
      default:
        Tl(e, t, l);
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
        De(t, t.return, l);
      }
    }
  }
  function km(e, t) {
    if (
      t.memoizedState === null &&
      ((e = t.alternate),
      e !== null && ((e = e.memoizedState), e !== null && ((e = e.dehydrated), e !== null)))
    )
      try {
        ga(e);
      } catch (l) {
        De(t, t.return, l);
      }
  }
  function r_(e) {
    switch (e.tag) {
      case 31:
      case 13:
      case 19:
        var t = e.stateNode;
        return (t === null && (t = e.stateNode = new Sm()), t);
      case 22:
        return (
          (e = e.stateNode),
          (t = e._retryCache),
          t === null && (t = e._retryCache = new Sm()),
          t
        );
      default:
        throw Error(s(435, e.tag));
    }
  }
  function ku(e, t) {
    var l = r_(e);
    t.forEach(function (n) {
      if (!l.has(n)) {
        l.add(n);
        var u = v_.bind(null, e, n);
        n.then(u, u);
      }
    });
  }
  function xt(e, t) {
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
              if (en(p.type)) {
                ((Ve = p.stateNode), (St = !1));
                break e;
              }
              break;
            case 5:
              ((Ve = p.stateNode), (St = !1));
              break e;
            case 3:
            case 4:
              ((Ve = p.stateNode.containerInfo), (St = !0));
              break e;
          }
          p = p.return;
        }
        if (Ve === null) throw Error(s(160));
        (Tm(c, f, u),
          (Ve = null),
          (St = !1),
          (c = u.alternate),
          c !== null && (c.return = null),
          (u.return = null));
      }
    if (t.subtreeFlags & 13886) for (t = t.child; t !== null; ) (Am(t, e), (t = t.sibling));
  }
  var Wt = null;
  function Am(e, t) {
    var l = e.alternate,
      n = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        (xt(t, e), Et(e), n & 4 && (Zl(3, e, e.return), ii(3, e), Zl(5, e, e.return)));
        break;
      case 1:
        (xt(t, e),
          Et(e),
          n & 512 && (lt || l === null || il(l, l.return)),
          n & 64 &&
            El &&
            ((e = e.updateQueue),
            e !== null &&
              ((n = e.callbacks),
              n !== null &&
                ((l = e.shared.hiddenCallbacks),
                (e.shared.hiddenCallbacks = l === null ? n : l.concat(n))))));
        break;
      case 26:
        var u = Wt;
        if ((xt(t, e), Et(e), n & 512 && (lt || l === null || il(l, l.return)), n & 4)) {
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
                          c[wa] ||
                          c[ct] ||
                          c.namespaceURI === 'http://www.w3.org/2000/svg' ||
                          c.hasAttribute('itemprop')) &&
                          ((c = u.createElement(n)),
                          u.head.insertBefore(c, u.querySelector('head > title'))),
                        dt(c, n, l),
                        (c[ct] = e),
                        ut(c),
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
                      ((c = u.createElement(n)), dt(c, n, l), u.head.appendChild(c));
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
                      ((c = u.createElement(n)), dt(c, n, l), u.head.appendChild(c));
                      break;
                    default:
                      throw Error(s(468, n));
                  }
                  ((c[ct] = e), ut(c), (n = c));
                }
                e.stateNode = n;
              } else Ch(u, e.type, e.stateNode);
            else e.stateNode = kh(u, n, e.memoizedProps);
          else
            c !== n
              ? (c === null
                  ? l.stateNode !== null && ((l = l.stateNode), l.parentNode.removeChild(l))
                  : c.count--,
                n === null ? Ch(u, e.type, e.stateNode) : kh(u, n, e.memoizedProps))
              : n === null && e.stateNode !== null && Jc(e, e.memoizedProps, l.memoizedProps);
        }
        break;
      case 27:
        (xt(t, e),
          Et(e),
          n & 512 && (lt || l === null || il(l, l.return)),
          l !== null && n & 4 && Jc(e, e.memoizedProps, l.memoizedProps));
        break;
      case 5:
        if ((xt(t, e), Et(e), n & 512 && (lt || l === null || il(l, l.return)), e.flags & 32)) {
          u = e.stateNode;
          try {
            Hn(u, '');
          } catch (ne) {
            De(e, e.return, ne);
          }
        }
        (n & 4 &&
          e.stateNode != null &&
          ((u = e.memoizedProps), Jc(e, u, l !== null ? l.memoizedProps : u)),
          n & 1024 && (Pc = !0));
        break;
      case 6:
        if ((xt(t, e), Et(e), n & 4)) {
          if (e.stateNode === null) throw Error(s(162));
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
          ((Yu = null),
          (u = Wt),
          (Wt = Hu(t.containerInfo)),
          xt(t, e),
          (Wt = u),
          Et(e),
          n & 4 && l !== null && l.memoizedState.isDehydrated)
        )
          try {
            ga(t.containerInfo);
          } catch (ne) {
            De(e, e.return, ne);
          }
        Pc && ((Pc = !1), Cm(e));
        break;
      case 4:
        ((n = Wt), (Wt = Hu(e.stateNode.containerInfo)), xt(t, e), Et(e), (Wt = n));
        break;
      case 12:
        (xt(t, e), Et(e));
        break;
      case 31:
        (xt(t, e),
          Et(e),
          n & 4 && ((n = e.updateQueue), n !== null && ((e.updateQueue = null), ku(e, n))));
        break;
      case 13:
        (xt(t, e),
          Et(e),
          e.child.flags & 8192 &&
            (e.memoizedState !== null) != (l !== null && l.memoizedState !== null) &&
            (Cu = kt()),
          n & 4 && ((n = e.updateQueue), n !== null && ((e.updateQueue = null), ku(e, n))));
        break;
      case 22:
        u = e.memoizedState !== null;
        var x = l !== null && l.memoizedState !== null,
          z = El,
          q = lt;
        if (((El = z || u), (lt = q || x), xt(t, e), (lt = q), (El = z), Et(e), n & 8192))
          e: for (
            t = e.stateNode,
              t._visibility = u ? t._visibility & -2 : t._visibility | 1,
              u && (l === null || x || El || lt || Cn(e)),
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
                      D = X != null && X.hasOwnProperty('display') ? X.display : null;
                    p.style.display = D == null || typeof D == 'boolean' ? '' : ('' + D).trim();
                  }
                } catch (ne) {
                  De(x, x.return, ne);
                }
              }
            } else if (t.tag === 6) {
              if (l === null) {
                x = t;
                try {
                  x.stateNode.nodeValue = u ? '' : x.memoizedProps;
                } catch (ne) {
                  De(x, x.return, ne);
                }
              }
            } else if (t.tag === 18) {
              if (l === null) {
                x = t;
                try {
                  var B = x.stateNode;
                  u ? gh(B, !0) : gh(x.stateNode, !1);
                } catch (ne) {
                  De(x, x.return, ne);
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
        (xt(t, e),
          Et(e),
          n & 4 && ((n = e.updateQueue), n !== null && ((e.updateQueue = null), ku(e, n))));
        break;
      case 30:
        break;
      case 21:
        break;
      default:
        (xt(t, e), Et(e));
    }
  }
  function Et(e) {
    var t = e.flags;
    if (t & 2) {
      try {
        for (var l, n = e.return; n !== null; ) {
          if (vm(n)) {
            l = n;
            break;
          }
          n = n.return;
        }
        if (l == null) throw Error(s(160));
        switch (l.tag) {
          case 27:
            var u = l.stateNode,
              c = Wc(e);
            Nu(e, c, u);
            break;
          case 5:
            var f = l.stateNode;
            l.flags & 32 && (Hn(f, ''), (l.flags &= -33));
            var p = Wc(e);
            Nu(e, p, f);
            break;
          case 3:
          case 4:
            var x = l.stateNode.containerInfo,
              z = Wc(e);
            Fc(e, z, x);
            break;
          default:
            throw Error(s(161));
        }
      } catch (q) {
        De(e, e.return, q);
      }
      e.flags &= -3;
    }
    t & 4096 && (e.flags &= -4097);
  }
  function Cm(e) {
    if (e.subtreeFlags & 1024)
      for (e = e.child; e !== null; ) {
        var t = e;
        (Cm(t), t.tag === 5 && t.flags & 1024 && t.stateNode.reset(), (e = e.sibling));
      }
  }
  function Nl(e, t) {
    if (t.subtreeFlags & 8772)
      for (t = t.child; t !== null; ) (xm(e, t.alternate, t), (t = t.sibling));
  }
  function Cn(e) {
    for (e = e.child; e !== null; ) {
      var t = e;
      switch (t.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          (Zl(4, t, t.return), Cn(t));
          break;
        case 1:
          il(t, t.return);
          var l = t.stateNode;
          (typeof l.componentWillUnmount == 'function' && gm(t, t.return, l), Cn(t));
          break;
        case 27:
          pi(t.stateNode);
        case 26:
        case 5:
          (il(t, t.return), Cn(t));
          break;
        case 22:
          t.memoizedState === null && Cn(t);
          break;
        case 30:
          Cn(t);
          break;
        default:
          Cn(t);
      }
      e = e.sibling;
    }
  }
  function kl(e, t, l) {
    for (l = l && (t.subtreeFlags & 8772) !== 0, t = t.child; t !== null; ) {
      var n = t.alternate,
        u = e,
        c = t,
        f = c.flags;
      switch (c.tag) {
        case 0:
        case 11:
        case 15:
          (kl(u, c, l), ii(4, c));
          break;
        case 1:
          if ((kl(u, c, l), (n = c), (u = n.stateNode), typeof u.componentDidMount == 'function'))
            try {
              u.componentDidMount();
            } catch (z) {
              De(n, n.return, z);
            }
          if (((n = c), (u = n.updateQueue), u !== null)) {
            var p = n.stateNode;
            try {
              var x = u.shared.hiddenCallbacks;
              if (x !== null)
                for (u.shared.hiddenCallbacks = null, u = 0; u < x.length; u++) id(x[u], p);
            } catch (z) {
              De(n, n.return, z);
            }
          }
          (l && f & 64 && ym(c), ui(c, c.return));
          break;
        case 27:
          bm(c);
        case 26:
        case 5:
          (kl(u, c, l), l && n === null && f & 4 && _m(c), ui(c, c.return));
          break;
        case 12:
          kl(u, c, l);
          break;
        case 31:
          (kl(u, c, l), l && f & 4 && Nm(u, c));
          break;
        case 13:
          (kl(u, c, l), l && f & 4 && km(u, c));
          break;
        case 22:
          (c.memoizedState === null && kl(u, c, l), ui(c, c.return));
          break;
        case 30:
          break;
        default:
          kl(u, c, l);
      }
      t = t.sibling;
    }
  }
  function eo(e, t) {
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
  function to(e, t) {
    ((e = null),
      t.alternate !== null && (e = t.alternate.memoizedState.cache),
      (t = t.memoizedState.cache),
      t !== e && (t.refCount++, e != null && Qa(e)));
  }
  function Ft(e, t, l, n) {
    if (t.subtreeFlags & 10256) for (t = t.child; t !== null; ) (Mm(e, t, l, n), (t = t.sibling));
  }
  function Mm(e, t, l, n) {
    var u = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        (Ft(e, t, l, n), u & 2048 && ii(9, t));
        break;
      case 1:
        Ft(e, t, l, n);
        break;
      case 3:
        (Ft(e, t, l, n),
          u & 2048 &&
            ((e = null),
            t.alternate !== null && (e = t.alternate.memoizedState.cache),
            (t = t.memoizedState.cache),
            t !== e && (t.refCount++, e != null && Qa(e))));
        break;
      case 12:
        if (u & 2048) {
          (Ft(e, t, l, n), (e = t.stateNode));
          try {
            var c = t.memoizedProps,
              f = c.id,
              p = c.onPostCommit;
            typeof p == 'function' &&
              p(f, t.alternate === null ? 'mount' : 'update', e.passiveEffectDuration, -0);
          } catch (x) {
            De(t, t.return, x);
          }
        } else Ft(e, t, l, n);
        break;
      case 31:
        Ft(e, t, l, n);
        break;
      case 13:
        Ft(e, t, l, n);
        break;
      case 23:
        break;
      case 22:
        ((c = t.stateNode),
          (f = t.alternate),
          t.memoizedState !== null
            ? c._visibility & 2
              ? Ft(e, t, l, n)
              : si(e, t)
            : c._visibility & 2
              ? Ft(e, t, l, n)
              : ((c._visibility |= 2), ua(e, t, l, n, (t.subtreeFlags & 10256) !== 0 || !1)),
          u & 2048 && eo(f, t));
        break;
      case 24:
        (Ft(e, t, l, n), u & 2048 && to(t.alternate, t));
        break;
      default:
        Ft(e, t, l, n);
    }
  }
  function ua(e, t, l, n, u) {
    for (u = u && ((t.subtreeFlags & 10256) !== 0 || !1), t = t.child; t !== null; ) {
      var c = e,
        f = t,
        p = l,
        x = n,
        z = f.flags;
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
            u && z & 2048 && eo(f.alternate, f));
          break;
        case 24:
          (ua(c, f, p, x, u), u && z & 2048 && to(f.alternate, f));
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
            (si(l, n), u & 2048 && eo(n.alternate, n));
            break;
          case 24:
            (si(l, n), u & 2048 && to(n.alternate, n));
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
          e.flags & ci && e.memoizedState !== null && J_(l, Wt, e.memoizedState, e.memoizedProps));
        break;
      case 5:
        sa(e, t, l);
        break;
      case 3:
      case 4:
        var n = Wt;
        ((Wt = Hu(e.stateNode.containerInfo)), sa(e, t, l), (Wt = n));
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
  function jm(e) {
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
          ((st = n), wm(n, e));
        }
      jm(e);
    }
    if (e.subtreeFlags & 10256) for (e = e.child; e !== null; ) (Om(e), (e = e.sibling));
  }
  function Om(e) {
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        (oi(e), e.flags & 2048 && Zl(9, e, e.return));
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
          ((st = n), wm(n, e));
        }
      jm(e);
    }
    for (e = e.child; e !== null; ) {
      switch (((t = e), t.tag)) {
        case 0:
        case 11:
        case 15:
          (Zl(8, t, t.return), Au(t));
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
  function wm(e, t) {
    for (; st !== null; ) {
      var l = st;
      switch (l.tag) {
        case 0:
        case 11:
        case 15:
          Zl(8, l, t);
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
      if (((n = l.child), n !== null)) ((n.return = l), (st = n));
      else
        e: for (l = e; st !== null; ) {
          n = st;
          var u = n.sibling,
            c = n.return;
          if ((Em(n), n === l)) {
            st = null;
            break e;
          }
          if (u !== null) {
            ((u.return = c), (st = u));
            break e;
          }
          st = c;
        }
    }
  }
  var f_ = {
      getCacheForType: function (e) {
        var t = rt(Pe),
          l = t.data.get(e);
        return (l === void 0 && ((l = e()), t.data.set(e, l)), l);
      },
      cacheSignal: function () {
        return rt(Pe).controller.signal;
      },
    },
    d_ = typeof WeakMap == 'function' ? WeakMap : Map,
    Oe = 0,
    Ge = null,
    Se = null,
    Ne = 0,
    ze = 0,
    wt = null,
    Kl = !1,
    ca = !1,
    lo = !1,
    Al = 0,
    Ie = 0,
    Il = 0,
    Mn = 0,
    no = 0,
    zt = 0,
    oa = 0,
    ri = null,
    Tt = null,
    ao = !1,
    Cu = 0,
    zm = 0,
    Mu = 1 / 0,
    Ru = null,
    Jl = null,
    at = 0,
    Wl = null,
    ra = null,
    Cl = 0,
    io = 0,
    uo = null,
    Dm = null,
    fi = 0,
    so = null;
  function Dt() {
    return (Oe & 2) !== 0 && Ne !== 0 ? Ne & -Ne : U.T !== null ? ho() : Jr();
  }
  function Bm() {
    if (zt === 0)
      if ((Ne & 536870912) === 0 || Ae) {
        var e = Li;
        ((Li <<= 1), (Li & 3932160) === 0 && (Li = 262144), (zt = e));
      } else zt = 536870912;
    return ((e = jt.current), e !== null && (e.flags |= 32), zt);
  }
  function Nt(e, t, l) {
    (((e === Ge && (ze === 2 || ze === 9)) || e.cancelPendingCommit !== null) &&
      (fa(e, 0), Fl(e, Ne, zt, !1)),
      Oa(e, l),
      ((Oe & 2) === 0 || e !== Ge) &&
        (e === Ge && ((Oe & 2) === 0 && (Mn |= l), Ie === 4 && Fl(e, Ne, zt, !1)), ul(e)));
  }
  function Um(e, t, l) {
    if ((Oe & 6) !== 0) throw Error(s(327));
    var n = (!l && (t & 127) === 0 && (t & e.expiredLanes) === 0) || ja(e, t),
      u = n ? p_(e, t) : oo(e, t, !0),
      c = n;
    do {
      if (u === 0) {
        ca && !n && Fl(e, t, 0, !1);
        break;
      } else {
        if (((l = e.current.alternate), c && !m_(l))) {
          ((u = oo(e, t, !1)), (c = !1));
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
              if ((x && (fa(p, f).flags |= 256), (f = oo(p, f, !1)), f !== 2)) {
                if (lo && !x) {
                  ((p.errorRecoveryDisabledLanes |= c), (Mn |= c), (u = 4));
                  break e;
                }
                ((c = Tt), (Tt = u), c !== null && (Tt === null ? (Tt = c) : Tt.push.apply(Tt, c)));
              }
              u = f;
            }
            if (((c = !1), u !== 2)) continue;
          }
        }
        if (u === 1) {
          (fa(e, 0), Fl(e, t, 0, !0));
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
              Fl(n, t, zt, !Kl);
              break e;
            case 2:
              Tt = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(s(329));
          }
          if ((t & 62914560) === t && ((u = Cu + 300 - kt()), 10 < u)) {
            if ((Fl(n, t, zt, !Kl), Hi(n, 0, !0) !== 0)) break e;
            ((Cl = t),
              (n.timeoutHandle = hh(
                Lm.bind(null, n, l, Tt, Ru, ao, t, zt, Mn, oa, Kl, c, 'Throttled', -0, 0),
                u
              )));
            break e;
          }
          Lm(n, l, Tt, Ru, ao, t, zt, Mn, oa, Kl, c, null, -0, 0);
        }
      }
      break;
    } while (!0);
    ul(e);
  }
  function Lm(e, t, l, n, u, c, f, p, x, z, q, X, D, B) {
    if (((e.timeoutHandle = -1), (X = t.subtreeFlags), X & 8192 || (X & 16785408) === 16785408)) {
      ((X = {
        stylesheets: null,
        count: 0,
        imgCount: 0,
        imgBytes: 0,
        suspenseyImages: [],
        waitingForImages: !0,
        waitingForViewTransition: !1,
        unsuspend: ml,
      }),
        Rm(t, c, X));
      var ne = (c & 62914560) === c ? Cu - kt() : (c & 4194048) === c ? zm - kt() : 0;
      if (((ne = W_(X, ne)), ne !== null)) {
        ((Cl = c),
          (e.cancelPendingCommit = ne(Qm.bind(null, e, t, c, l, n, u, f, p, x, q, X, null, D, B))),
          Fl(e, c, f, !z));
        return;
      }
    }
    Qm(e, t, c, l, n, u, f, p, x);
  }
  function m_(e) {
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
  function Fl(e, t, l, n) {
    ((t &= ~no),
      (t &= ~Mn),
      (e.suspendedLanes |= t),
      (e.pingedLanes &= ~t),
      n && (e.warmLanes |= t),
      (n = e.expirationTimes));
    for (var u = t; 0 < u; ) {
      var c = 31 - Ct(u),
        f = 1 << c;
      ((n[c] = -1), (u &= ~f));
    }
    l !== 0 && Zr(e, l, t);
  }
  function ju() {
    return (Oe & 6) === 0 ? (di(0), !1) : !0;
  }
  function co() {
    if (Se !== null) {
      if (ze === 0) var e = Se.return;
      else ((e = Se), (gl = bn = null), Tc(e), (ta = null), (Ka = 0), (e = Se));
      for (; e !== null; ) (pm(e.alternate, e), (e = e.return));
      Se = null;
    }
  }
  function fa(e, t) {
    var l = e.timeoutHandle;
    (l !== -1 && ((e.timeoutHandle = -1), w_(l)),
      (l = e.cancelPendingCommit),
      l !== null && ((e.cancelPendingCommit = null), l()),
      (Cl = 0),
      co(),
      (Ge = e),
      (Se = l = pl(e.current, null)),
      (Ne = t),
      (ze = 0),
      (wt = null),
      (Kl = !1),
      (ca = ja(e, t)),
      (lo = !1),
      (oa = zt = no = Mn = Il = Ie = 0),
      (Tt = ri = null),
      (ao = !1),
      (t & 8) !== 0 && (t |= t & 32));
    var n = e.entangledLanes;
    if (n !== 0)
      for (e = e.entanglements, n &= t; 0 < n; ) {
        var u = 31 - Ct(n),
          c = 1 << u;
        ((t |= e[u]), (n &= ~c));
      }
    return ((Al = t), Fi(), l);
  }
  function qm(e, t) {
    ((_e = null),
      (U.H = li),
      t === ea || t === uu
        ? ((t = td()), (ze = 3))
        : t === dc
          ? ((t = td()), (ze = 4))
          : (ze =
              t === Hc
                ? 8
                : t !== null && typeof t == 'object' && typeof t.then == 'function'
                  ? 6
                  : 1),
      (wt = t),
      Se === null && ((Ie = 1), bu(e, Ht(t, e.current))));
  }
  function Hm() {
    var e = jt.current;
    return e === null
      ? !0
      : (Ne & 4194048) === Ne
        ? Xt === null
        : (Ne & 62914560) === Ne || (Ne & 536870912) !== 0
          ? e === Xt
          : !1;
  }
  function Gm() {
    var e = U.H;
    return ((U.H = li), e === null ? li : e);
  }
  function Ym() {
    var e = U.A;
    return ((U.A = f_), e);
  }
  function Ou() {
    ((Ie = 4),
      Kl || ((Ne & 4194048) !== Ne && jt.current !== null) || (ca = !0),
      ((Il & 134217727) === 0 && (Mn & 134217727) === 0) || Ge === null || Fl(Ge, Ne, zt, !1));
  }
  function oo(e, t, l) {
    var n = Oe;
    Oe |= 2;
    var u = Gm(),
      c = Ym();
    ((Ge !== e || Ne !== t) && ((Ru = null), fa(e, t)), (t = !1));
    var f = Ie;
    e: do
      try {
        if (ze !== 0 && Se !== null) {
          var p = Se,
            x = wt;
          switch (ze) {
            case 8:
              (co(), (f = 6));
              break e;
            case 3:
            case 2:
            case 9:
            case 6:
              jt.current === null && (t = !0);
              var z = ze;
              if (((ze = 0), (wt = null), da(e, p, x, z), l && ca)) {
                f = 0;
                break e;
              }
              break;
            default:
              ((z = ze), (ze = 0), (wt = null), da(e, p, x, z));
          }
        }
        (h_(), (f = Ie));
        break;
      } catch (q) {
        qm(e, q);
      }
    while (!0);
    return (
      t && e.shellSuspendCounter++,
      (gl = bn = null),
      (Oe = n),
      (U.H = u),
      (U.A = c),
      Se === null && ((Ge = null), (Ne = 0), Fi()),
      f
    );
  }
  function h_() {
    for (; Se !== null; ) $m(Se);
  }
  function p_(e, t) {
    var l = Oe;
    Oe |= 2;
    var n = Gm(),
      u = Ym();
    Ge !== e || Ne !== t ? ((Ru = null), (Mu = kt() + 500), fa(e, t)) : (ca = ja(e, t));
    e: do
      try {
        if (ze !== 0 && Se !== null) {
          t = Se;
          var c = wt;
          t: switch (ze) {
            case 1:
              ((ze = 0), (wt = null), da(e, t, c, 1));
              break;
            case 2:
            case 9:
              if (Pf(c)) {
                ((ze = 0), (wt = null), Xm(t));
                break;
              }
              ((t = function () {
                ((ze !== 2 && ze !== 9) || Ge !== e || (ze = 7), ul(e));
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
              Pf(c) ? ((ze = 0), (wt = null), Xm(t)) : ((ze = 0), (wt = null), da(e, t, c, 7));
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
                    ((ze = 0), (wt = null));
                    var x = p.sibling;
                    if (x !== null) Se = x;
                    else {
                      var z = p.return;
                      z !== null ? ((Se = z), wu(z)) : (Se = null);
                    }
                    break t;
                  }
              }
              ((ze = 0), (wt = null), da(e, t, c, 5));
              break;
            case 6:
              ((ze = 0), (wt = null), da(e, t, c, 6));
              break;
            case 8:
              (co(), (Ie = 6));
              break e;
            default:
              throw Error(s(462));
          }
        }
        y_();
        break;
      } catch (q) {
        qm(e, q);
      }
    while (!0);
    return (
      (gl = bn = null),
      (U.H = n),
      (U.A = u),
      (Oe = l),
      Se !== null ? 0 : ((Ge = null), (Ne = 0), Fi(), Ie)
    );
  }
  function y_() {
    for (; Se !== null && !qy(); ) $m(Se);
  }
  function $m(e) {
    var t = mm(e.alternate, e, Al);
    ((e.memoizedProps = e.pendingProps), t === null ? wu(e) : (Se = t));
  }
  function Xm(e) {
    var t = e,
      l = t.alternate;
    switch (t.tag) {
      case 15:
      case 0:
        t = sm(l, t, t.pendingProps, t.type, void 0, Ne);
        break;
      case 11:
        t = sm(l, t, t.pendingProps, t.type.render, t.ref, Ne);
        break;
      case 5:
        Tc(t);
      default:
        (pm(l, t), (t = Se = Yf(t, Al)), (t = mm(l, t, Al)));
    }
    ((e.memoizedProps = e.pendingProps), t === null ? wu(e) : (Se = t));
  }
  function da(e, t, l, n) {
    ((gl = bn = null), Tc(t), (ta = null), (Ka = 0));
    var u = t.return;
    try {
      if (a_(e, u, t, l, Ne)) {
        ((Ie = 1), bu(e, Ht(l, e.current)), (Se = null));
        return;
      }
    } catch (c) {
      if (u !== null) throw ((Se = u), c);
      ((Ie = 1), bu(e, Ht(l, e.current)), (Se = null));
      return;
    }
    t.flags & 32768
      ? (Ae || n === 1
          ? (e = !0)
          : ca || (Ne & 536870912) !== 0
            ? (e = !1)
            : ((Kl = e = !0),
              (n === 2 || n === 9 || n === 3 || n === 6) &&
                ((n = jt.current), n !== null && n.tag === 13 && (n.flags |= 16384))),
        Vm(t, e))
      : wu(t);
  }
  function wu(e) {
    var t = e;
    do {
      if ((t.flags & 32768) !== 0) {
        Vm(t, Kl);
        return;
      }
      e = t.return;
      var l = s_(t.alternate, t, Al);
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
  function Vm(e, t) {
    do {
      var l = c_(e.alternate, e);
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
  function Qm(e, t, l, n, u, c, f, p, x) {
    e.cancelPendingCommit = null;
    do zu();
    while (at !== 0);
    if ((Oe & 6) !== 0) throw Error(s(327));
    if (t !== null) {
      if (t === e.current) throw Error(s(177));
      if (
        ((c = t.lanes | t.childLanes),
        (c |= Ws),
        Iy(e, l, c, f, p, x),
        e === Ge && ((Se = Ge = null), (Ne = 0)),
        (ra = t),
        (Wl = e),
        (Cl = l),
        (io = c),
        (uo = u),
        (Dm = n),
        (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0
          ? ((e.callbackNode = null),
            (e.callbackPriority = 0),
            b_(Bi, function () {
              return (Wm(), null);
            }))
          : ((e.callbackNode = null), (e.callbackPriority = 0)),
        (n = (t.flags & 13878) !== 0),
        (t.subtreeFlags & 13878) !== 0 || n)
      ) {
        ((n = U.T), (U.T = null), (u = J.p), (J.p = 2), (f = Oe), (Oe |= 4));
        try {
          o_(e, t, l);
        } finally {
          ((Oe = f), (J.p = u), (U.T = n));
        }
      }
      ((at = 1), Zm(), Km(), Im());
    }
  }
  function Zm() {
    if (at === 1) {
      at = 0;
      var e = Wl,
        t = ra,
        l = (t.flags & 13878) !== 0;
      if ((t.subtreeFlags & 13878) !== 0 || l) {
        ((l = U.T), (U.T = null));
        var n = J.p;
        J.p = 2;
        var u = Oe;
        Oe |= 4;
        try {
          Am(t, e);
          var c = xo,
            f = wf(e.containerInfo),
            p = c.focusedElem,
            x = c.selectionRange;
          if (f !== p && p && p.ownerDocument && Of(p.ownerDocument.documentElement, p)) {
            if (x !== null && Qs(p)) {
              var z = x.start,
                q = x.end;
              if ((q === void 0 && (q = z), 'selectionStart' in p))
                ((p.selectionStart = z), (p.selectionEnd = Math.min(q, p.value.length)));
              else {
                var X = p.ownerDocument || document,
                  D = (X && X.defaultView) || window;
                if (D.getSelection) {
                  var B = D.getSelection(),
                    ne = p.textContent.length,
                    re = Math.min(x.start, ne),
                    qe = x.end === void 0 ? re : Math.min(x.end, ne);
                  !B.extend && re > qe && ((f = qe), (qe = re), (re = f));
                  var R = jf(p, re),
                    E = jf(p, qe);
                  if (
                    R &&
                    E &&
                    (B.rangeCount !== 1 ||
                      B.anchorNode !== R.node ||
                      B.anchorOffset !== R.offset ||
                      B.focusNode !== E.node ||
                      B.focusOffset !== E.offset)
                  ) {
                    var w = X.createRange();
                    (w.setStart(R.node, R.offset),
                      B.removeAllRanges(),
                      re > qe
                        ? (B.addRange(w), B.extend(E.node, E.offset))
                        : (w.setEnd(E.node, E.offset), B.addRange(w)));
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
          ((Qu = !!So), (xo = So = null));
        } finally {
          ((Oe = u), (J.p = n), (U.T = l));
        }
      }
      ((e.current = t), (at = 2));
    }
  }
  function Km() {
    if (at === 2) {
      at = 0;
      var e = Wl,
        t = ra,
        l = (t.flags & 8772) !== 0;
      if ((t.subtreeFlags & 8772) !== 0 || l) {
        ((l = U.T), (U.T = null));
        var n = J.p;
        J.p = 2;
        var u = Oe;
        Oe |= 4;
        try {
          xm(e, t.alternate, t);
        } finally {
          ((Oe = u), (J.p = n), (U.T = l));
        }
      }
      at = 3;
    }
  }
  function Im() {
    if (at === 4 || at === 3) {
      ((at = 0), Hy());
      var e = Wl,
        t = ra,
        l = Cl,
        n = Dm;
      (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0
        ? (at = 5)
        : ((at = 0), (ra = Wl = null), Jm(e, e.pendingLanes));
      var u = e.pendingLanes;
      if (
        (u === 0 && (Jl = null),
        As(l),
        (t = t.stateNode),
        At && typeof At.onCommitFiberRoot == 'function')
      )
        try {
          At.onCommitFiberRoot(Ra, t, void 0, (t.current.flags & 128) === 128);
        } catch {}
      if (n !== null) {
        ((t = U.T), (u = J.p), (J.p = 2), (U.T = null));
        try {
          for (var c = e.onRecoverableError, f = 0; f < n.length; f++) {
            var p = n[f];
            c(p.value, { componentStack: p.stack });
          }
        } finally {
          ((U.T = t), (J.p = u));
        }
      }
      ((Cl & 3) !== 0 && zu(),
        ul(e),
        (u = e.pendingLanes),
        (l & 261930) !== 0 && (u & 42) !== 0 ? (e === so ? fi++ : ((fi = 0), (so = e))) : (fi = 0),
        di(0));
    }
  }
  function Jm(e, t) {
    (e.pooledCacheLanes &= t) === 0 &&
      ((t = e.pooledCache), t != null && ((e.pooledCache = null), Qa(t)));
  }
  function zu() {
    return (Zm(), Km(), Im(), Wm());
  }
  function Wm() {
    if (at !== 5) return !1;
    var e = Wl,
      t = io;
    io = 0;
    var l = As(Cl),
      n = U.T,
      u = J.p;
    try {
      ((J.p = 32 > l ? 32 : l), (U.T = null), (l = uo), (uo = null));
      var c = Wl,
        f = Cl;
      if (((at = 0), (ra = Wl = null), (Cl = 0), (Oe & 6) !== 0)) throw Error(s(331));
      var p = Oe;
      if (
        ((Oe |= 4),
        Om(c.current),
        Mm(c, c.current, f, l),
        (Oe = p),
        di(0, !1),
        At && typeof At.onPostCommitFiberRoot == 'function')
      )
        try {
          At.onPostCommitFiberRoot(Ra, c);
        } catch {}
      return !0;
    } finally {
      ((J.p = u), (U.T = n), Jm(e, t));
    }
  }
  function Fm(e, t, l) {
    ((t = Ht(l, t)),
      (t = qc(e.stateNode, t, 2)),
      (e = Xl(e, t, 2)),
      e !== null && (Oa(e, 2), ul(e)));
  }
  function De(e, t, l) {
    if (e.tag === 3) Fm(e, e, l);
    else
      for (; t !== null; ) {
        if (t.tag === 3) {
          Fm(t, e, l);
          break;
        } else if (t.tag === 1) {
          var n = t.stateNode;
          if (
            typeof t.type.getDerivedStateFromError == 'function' ||
            (typeof n.componentDidCatch == 'function' && (Jl === null || !Jl.has(n)))
          ) {
            ((e = Ht(l, e)),
              (l = Pd(2)),
              (n = Xl(t, l, 2)),
              n !== null && (em(l, n, t, e), Oa(n, 2), ul(n)));
            break;
          }
        }
        t = t.return;
      }
  }
  function ro(e, t, l) {
    var n = e.pingCache;
    if (n === null) {
      n = e.pingCache = new d_();
      var u = new Set();
      n.set(t, u);
    } else ((u = n.get(t)), u === void 0 && ((u = new Set()), n.set(t, u)));
    u.has(l) || ((lo = !0), u.add(l), (e = g_.bind(null, e, t, l)), t.then(e, e));
  }
  function g_(e, t, l) {
    var n = e.pingCache;
    (n !== null && n.delete(t),
      (e.pingedLanes |= e.suspendedLanes & l),
      (e.warmLanes &= ~l),
      Ge === e &&
        (Ne & l) === l &&
        (Ie === 4 || (Ie === 3 && (Ne & 62914560) === Ne && 300 > kt() - Cu)
          ? (Oe & 2) === 0 && fa(e, 0)
          : (no |= l),
        oa === Ne && (oa = 0)),
      ul(e));
  }
  function Pm(e, t) {
    (t === 0 && (t = Qr()), (e = gn(e, t)), e !== null && (Oa(e, t), ul(e)));
  }
  function __(e) {
    var t = e.memoizedState,
      l = 0;
    (t !== null && (l = t.retryLane), Pm(e, l));
  }
  function v_(e, t) {
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
    (n !== null && n.delete(t), Pm(e, l));
  }
  function b_(e, t) {
    return Es(e, t);
  }
  var Du = null,
    ma = null,
    fo = !1,
    Bu = !1,
    mo = !1,
    Pl = 0;
  function ul(e) {
    (e !== ma && e.next === null && (ma === null ? (Du = ma = e) : (ma = ma.next = e)),
      (Bu = !0),
      fo || ((fo = !0), x_()));
  }
  function di(e, t) {
    if (!mo && Bu) {
      mo = !0;
      do
        for (var l = !1, n = Du; n !== null; ) {
          if (e !== 0) {
            var u = n.pendingLanes;
            if (u === 0) var c = 0;
            else {
              var f = n.suspendedLanes,
                p = n.pingedLanes;
              ((c = (1 << (31 - Ct(42 | e) + 1)) - 1),
                (c &= u & ~(f & ~p)),
                (c = c & 201326741 ? (c & 201326741) | 1 : c ? c | 2 : 0));
            }
            c !== 0 && ((l = !0), nh(n, c));
          } else
            ((c = Ne),
              (c = Hi(
                n,
                n === Ge ? c : 0,
                n.cancelPendingCommit !== null || n.timeoutHandle !== -1
              )),
              (c & 3) === 0 || ja(n, c) || ((l = !0), nh(n, c)));
          n = n.next;
        }
      while (l);
      mo = !1;
    }
  }
  function S_() {
    eh();
  }
  function eh() {
    Bu = fo = !1;
    var e = 0;
    Pl !== 0 && O_() && (e = Pl);
    for (var t = kt(), l = null, n = Du; n !== null; ) {
      var u = n.next,
        c = th(n, t);
      (c === 0
        ? ((n.next = null), l === null ? (Du = u) : (l.next = u), u === null && (ma = l))
        : ((l = n), (e !== 0 || (c & 3) !== 0) && (Bu = !0)),
        (n = u));
    }
    ((at !== 0 && at !== 5) || di(e), Pl !== 0 && (Pl = 0));
  }
  function th(e, t) {
    for (
      var l = e.suspendedLanes,
        n = e.pingedLanes,
        u = e.expirationTimes,
        c = e.pendingLanes & -62914561;
      0 < c;
    ) {
      var f = 31 - Ct(c),
        p = 1 << f,
        x = u[f];
      (x === -1
        ? ((p & l) === 0 || (p & n) !== 0) && (u[f] = Ky(p, t))
        : x <= t && (e.expiredLanes |= p),
        (c &= ~p));
    }
    if (
      ((t = Ge),
      (l = Ne),
      (l = Hi(e, e === t ? l : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== -1)),
      (n = e.callbackNode),
      l === 0 || (e === t && (ze === 2 || ze === 9)) || e.cancelPendingCommit !== null)
    )
      return (n !== null && n !== null && Ts(n), (e.callbackNode = null), (e.callbackPriority = 0));
    if ((l & 3) === 0 || ja(e, l)) {
      if (((t = l & -l), t === e.callbackPriority)) return t;
      switch ((n !== null && Ts(n), As(l))) {
        case 2:
        case 8:
          l = Xr;
          break;
        case 32:
          l = Bi;
          break;
        case 268435456:
          l = Vr;
          break;
        default:
          l = Bi;
      }
      return (
        (n = lh.bind(null, e)),
        (l = Es(l, n)),
        (e.callbackPriority = t),
        (e.callbackNode = l),
        t
      );
    }
    return (
      n !== null && n !== null && Ts(n),
      (e.callbackPriority = 2),
      (e.callbackNode = null),
      2
    );
  }
  function lh(e, t) {
    if (at !== 0 && at !== 5) return ((e.callbackNode = null), (e.callbackPriority = 0), null);
    var l = e.callbackNode;
    if (zu() && e.callbackNode !== l) return null;
    var n = Ne;
    return (
      (n = Hi(e, e === Ge ? n : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== -1)),
      n === 0
        ? null
        : (Um(e, n, t),
          th(e, kt()),
          e.callbackNode != null && e.callbackNode === l ? lh.bind(null, e) : null)
    );
  }
  function nh(e, t) {
    if (zu()) return null;
    Um(e, t, !0);
  }
  function x_() {
    z_(function () {
      (Oe & 6) !== 0 ? Es($r, S_) : eh();
    });
  }
  function ho() {
    if (Pl === 0) {
      var e = Fn;
      (e === 0 && ((e = Ui), (Ui <<= 1), (Ui & 261888) === 0 && (Ui = 256)), (Pl = e));
    }
    return Pl;
  }
  function ah(e) {
    return e == null || typeof e == 'symbol' || typeof e == 'boolean'
      ? null
      : typeof e == 'function'
        ? e
        : Xi('' + e);
  }
  function ih(e, t) {
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
  function E_(e, t, l, n, u) {
    if (t === 'submit' && l && l.stateNode === u) {
      var c = ah((u[vt] || null).action),
        f = n.submitter;
      f &&
        ((t = (t = f[vt] || null) ? ah(t.formAction) : f.getAttribute('formAction')),
        t !== null && ((c = t), (f = null)));
      var p = new Ki('action', 'action', null, n, u);
      e.push({
        event: p,
        listeners: [
          {
            instance: null,
            listener: function () {
              if (n.defaultPrevented) {
                if (Pl !== 0) {
                  var x = f ? ih(u, f) : new FormData(u);
                  wc(l, { pending: !0, data: x, method: u.method, action: c }, null, x);
                }
              } else
                typeof c == 'function' &&
                  (p.preventDefault(),
                  (x = f ? ih(u, f) : new FormData(u)),
                  wc(l, { pending: !0, data: x, method: u.method, action: c }, c, x));
            },
            currentTarget: u,
          },
        ],
      });
    }
  }
  for (var po = 0; po < Js.length; po++) {
    var yo = Js[po],
      T_ = yo.toLowerCase(),
      N_ = yo[0].toUpperCase() + yo.slice(1);
    Jt(T_, 'on' + N_);
  }
  (Jt(Bf, 'onAnimationEnd'),
    Jt(Uf, 'onAnimationIteration'),
    Jt(Lf, 'onAnimationStart'),
    Jt('dblclick', 'onDoubleClick'),
    Jt('focusin', 'onFocus'),
    Jt('focusout', 'onBlur'),
    Jt(Gg, 'onTransitionRun'),
    Jt(Yg, 'onTransitionStart'),
    Jt($g, 'onTransitionCancel'),
    Jt(qf, 'onTransitionEnd'),
    Ln('onMouseEnter', ['mouseout', 'mouseover']),
    Ln('onMouseLeave', ['mouseout', 'mouseover']),
    Ln('onPointerEnter', ['pointerout', 'pointerover']),
    Ln('onPointerLeave', ['pointerout', 'pointerover']),
    mn('onChange', 'change click focusin focusout input keydown keyup selectionchange'.split(' ')),
    mn(
      'onSelect',
      'focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange'.split(
        ' '
      )
    ),
    mn('onBeforeInput', ['compositionend', 'keypress', 'textInput', 'paste']),
    mn('onCompositionEnd', 'compositionend focusout keydown keypress keyup mousedown'.split(' ')),
    mn(
      'onCompositionStart',
      'compositionstart focusout keydown keypress keyup mousedown'.split(' ')
    ),
    mn(
      'onCompositionUpdate',
      'compositionupdate focusout keydown keypress keyup mousedown'.split(' ')
    ));
  var mi =
      'abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting'.split(
        ' '
      ),
    k_ = new Set(
      'beforetoggle cancel close invalid load scroll scrollend toggle'.split(' ').concat(mi)
    );
  function uh(e, t) {
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
              z = p.currentTarget;
            if (((p = p.listener), x !== c && u.isPropagationStopped())) break e;
            ((c = p), (u.currentTarget = z));
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
              (z = p.currentTarget),
              (p = p.listener),
              x !== c && u.isPropagationStopped())
            )
              break e;
            ((c = p), (u.currentTarget = z));
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
    var l = t[Cs];
    l === void 0 && (l = t[Cs] = new Set());
    var n = e + '__bubble';
    l.has(n) || (sh(t, e, 2, !1), l.add(n));
  }
  function go(e, t, l) {
    var n = 0;
    (t && (n |= 4), sh(l, e, n, t));
  }
  var Uu = '_reactListening' + Math.random().toString(36).slice(2);
  function _o(e) {
    if (!e[Uu]) {
      ((e[Uu] = !0),
        Pr.forEach(function (l) {
          l !== 'selectionchange' && (k_.has(l) || go(l, !1, e), go(l, !0, e));
        }));
      var t = e.nodeType === 9 ? e : e.ownerDocument;
      t === null || t[Uu] || ((t[Uu] = !0), go('selectionchange', !1, t));
    }
  }
  function sh(e, t, l, n) {
    switch (Bh(t)) {
      case 2:
        var u = e0;
        break;
      case 8:
        u = t0;
        break;
      default:
        u = wo;
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
  function vo(e, t, l, n, u) {
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
            if (((f = Dn(p)), f === null)) return;
            if (((x = f.tag), x === 5 || x === 6 || x === 26 || x === 27)) {
              n = c = f;
              continue e;
            }
            p = p.parentNode;
          }
        }
        n = n.return;
      }
    df(function () {
      var z = c,
        q = Ds(l),
        X = [];
      e: {
        var D = Hf.get(e);
        if (D !== void 0) {
          var B = Ki,
            ne = e;
          switch (e) {
            case 'keypress':
              if (Qi(l) === 0) break e;
            case 'keydown':
            case 'keyup':
              B = vg;
              break;
            case 'focusin':
              ((ne = 'focus'), (B = Gs));
              break;
            case 'focusout':
              ((ne = 'blur'), (B = Gs));
              break;
            case 'beforeblur':
            case 'afterblur':
              B = Gs;
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
              B = pf;
              break;
            case 'drag':
            case 'dragend':
            case 'dragenter':
            case 'dragexit':
            case 'dragleave':
            case 'dragover':
            case 'dragstart':
            case 'drop':
              B = sg;
              break;
            case 'touchcancel':
            case 'touchend':
            case 'touchmove':
            case 'touchstart':
              B = xg;
              break;
            case Bf:
            case Uf:
            case Lf:
              B = rg;
              break;
            case qf:
              B = Tg;
              break;
            case 'scroll':
            case 'scrollend':
              B = ig;
              break;
            case 'wheel':
              B = kg;
              break;
            case 'copy':
            case 'cut':
            case 'paste':
              B = dg;
              break;
            case 'gotpointercapture':
            case 'lostpointercapture':
            case 'pointercancel':
            case 'pointerdown':
            case 'pointermove':
            case 'pointerout':
            case 'pointerover':
            case 'pointerup':
              B = gf;
              break;
            case 'toggle':
            case 'beforetoggle':
              B = Cg;
          }
          var re = (t & 4) !== 0,
            qe = !re && (e === 'scroll' || e === 'scrollend'),
            R = re ? (D !== null ? D + 'Capture' : null) : D;
          re = [];
          for (var E = z, w; E !== null; ) {
            var $ = E;
            if (
              ((w = $.stateNode),
              ($ = $.tag),
              ($ !== 5 && $ !== 26 && $ !== 27) ||
                w === null ||
                R === null ||
                (($ = Da(E, R)), $ != null && re.push(hi(E, $, w))),
              qe)
            )
              break;
            E = E.return;
          }
          0 < re.length && ((D = new B(D, ne, null, l, q)), X.push({ event: D, listeners: re }));
        }
      }
      if ((t & 7) === 0) {
        e: {
          if (
            ((D = e === 'mouseover' || e === 'pointerover'),
            (B = e === 'mouseout' || e === 'pointerout'),
            D && l !== zs && (ne = l.relatedTarget || l.fromElement) && (Dn(ne) || ne[zn]))
          )
            break e;
          if (
            (B || D) &&
            ((D =
              q.window === q
                ? q
                : (D = q.ownerDocument)
                  ? D.defaultView || D.parentWindow
                  : window),
            B
              ? ((ne = l.relatedTarget || l.toElement),
                (B = z),
                (ne = ne ? Dn(ne) : null),
                ne !== null &&
                  ((qe = d(ne)), (re = ne.tag), ne !== qe || (re !== 5 && re !== 27 && re !== 6)) &&
                  (ne = null))
              : ((B = null), (ne = z)),
            B !== ne)
          ) {
            if (
              ((re = pf),
              ($ = 'onMouseLeave'),
              (R = 'onMouseEnter'),
              (E = 'mouse'),
              (e === 'pointerout' || e === 'pointerover') &&
                ((re = gf), ($ = 'onPointerLeave'), (R = 'onPointerEnter'), (E = 'pointer')),
              (qe = B == null ? D : za(B)),
              (w = ne == null ? D : za(ne)),
              (D = new re($, E + 'leave', B, l, q)),
              (D.target = qe),
              (D.relatedTarget = w),
              ($ = null),
              Dn(q) === z &&
                ((re = new re(R, E + 'enter', ne, l, q)),
                (re.target = w),
                (re.relatedTarget = qe),
                ($ = re)),
              (qe = $),
              B && ne)
            )
              t: {
                for (re = A_, R = B, E = ne, w = 0, $ = R; $; $ = re($)) w++;
                $ = 0;
                for (var se = E; se; se = re(se)) $++;
                for (; 0 < w - $; ) ((R = re(R)), w--);
                for (; 0 < $ - w; ) ((E = re(E)), $--);
                for (; w--; ) {
                  if (R === E || (E !== null && R === E.alternate)) {
                    re = R;
                    break t;
                  }
                  ((R = re(R)), (E = re(E)));
                }
                re = null;
              }
            else re = null;
            (B !== null && ch(X, D, B, re, !1),
              ne !== null && qe !== null && ch(X, qe, ne, re, !0));
          }
        }
        e: {
          if (
            ((D = z ? za(z) : window),
            (B = D.nodeName && D.nodeName.toLowerCase()),
            B === 'select' || (B === 'input' && D.type === 'file'))
          )
            var Me = Nf;
          else if (Ef(D))
            if (kf) Me = Lg;
            else {
              Me = Bg;
              var ie = Dg;
            }
          else
            ((B = D.nodeName),
              !B || B.toLowerCase() !== 'input' || (D.type !== 'checkbox' && D.type !== 'radio')
                ? z && ws(z.elementType) && (Me = Nf)
                : (Me = Ug));
          if (Me && (Me = Me(e, z))) {
            Tf(X, Me, l, q);
            break e;
          }
          (ie && ie(e, D, z),
            e === 'focusout' &&
              z &&
              D.type === 'number' &&
              z.memoizedProps.value != null &&
              Os(D, 'number', D.value));
        }
        switch (((ie = z ? za(z) : window), e)) {
          case 'focusin':
            (Ef(ie) || ie.contentEditable === 'true') && ((Xn = ie), (Zs = z), ($a = null));
            break;
          case 'focusout':
            $a = Zs = Xn = null;
            break;
          case 'mousedown':
            Ks = !0;
            break;
          case 'contextmenu':
          case 'mouseup':
          case 'dragend':
            ((Ks = !1), zf(X, l, q));
            break;
          case 'selectionchange':
            if (Hg) break;
          case 'keydown':
          case 'keyup':
            zf(X, l, q);
        }
        var ve;
        if ($s)
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
            ? Sf(e, l) && (ke = 'onCompositionEnd')
            : e === 'keydown' && l.keyCode === 229 && (ke = 'onCompositionStart');
        (ke &&
          (_f &&
            l.locale !== 'ko' &&
            ($n || ke !== 'onCompositionStart'
              ? ke === 'onCompositionEnd' && $n && (ve = mf())
              : ((Ul = q), (Ls = 'value' in Ul ? Ul.value : Ul.textContent), ($n = !0))),
          (ie = Lu(z, ke)),
          0 < ie.length &&
            ((ke = new yf(ke, e, null, l, q)),
            X.push({ event: ke, listeners: ie }),
            ve ? (ke.data = ve) : ((ve = xf(l)), ve !== null && (ke.data = ve)))),
          (ve = Rg ? jg(e, l) : Og(e, l)) &&
            ((ke = Lu(z, 'onBeforeInput')),
            0 < ke.length &&
              ((ie = new yf('onBeforeInput', 'beforeinput', null, l, q)),
              X.push({ event: ie, listeners: ke }),
              (ie.data = ve))),
          E_(X, e, z, l, q));
      }
      uh(X, t);
    });
  }
  function hi(e, t, l) {
    return { instance: e, listener: t, currentTarget: l };
  }
  function Lu(e, t) {
    for (var l = t + 'Capture', n = []; e !== null; ) {
      var u = e,
        c = u.stateNode;
      if (
        ((u = u.tag),
        (u !== 5 && u !== 26 && u !== 27) ||
          c === null ||
          ((u = Da(e, l)),
          u != null && n.unshift(hi(e, u, c)),
          (u = Da(e, t)),
          u != null && n.push(hi(e, u, c))),
        e.tag === 3)
      )
        return n;
      e = e.return;
    }
    return [];
  }
  function A_(e) {
    if (e === null) return null;
    do e = e.return;
    while (e && e.tag !== 5 && e.tag !== 27);
    return e || null;
  }
  function ch(e, t, l, n, u) {
    for (var c = t._reactName, f = []; l !== null && l !== n; ) {
      var p = l,
        x = p.alternate,
        z = p.stateNode;
      if (((p = p.tag), x !== null && x === n)) break;
      ((p !== 5 && p !== 26 && p !== 27) ||
        z === null ||
        ((x = z),
        u
          ? ((z = Da(l, c)), z != null && f.unshift(hi(l, z, x)))
          : u || ((z = Da(l, c)), z != null && f.push(hi(l, z, x)))),
        (l = l.return));
    }
    f.length !== 0 && e.push({ event: t, listeners: f });
  }
  var C_ = /\r\n?/g,
    M_ = /\u0000|\uFFFD/g;
  function oh(e) {
    return (typeof e == 'string' ? e : '' + e)
      .replace(
        C_,
        `
`
      )
      .replace(M_, '');
  }
  function rh(e, t) {
    return ((t = oh(t)), oh(e) === t);
  }
  function Le(e, t, l, n, u, c) {
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
        rf(e, n, c);
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
              ? (t !== 'input' && Le(e, t, 'name', u.name, u, null),
                Le(e, t, 'formEncType', u.formEncType, u, null),
                Le(e, t, 'formMethod', u.formMethod, u, null),
                Le(e, t, 'formTarget', u.formTarget, u, null))
              : (Le(e, t, 'encType', u.encType, u, null),
                Le(e, t, 'method', u.method, u, null),
                Le(e, t, 'target', u.target, u, null)));
        if (n == null || typeof n == 'symbol' || typeof n == 'boolean') {
          e.removeAttribute(l);
          break;
        }
        ((n = Xi('' + n)), e.setAttribute(l, n));
        break;
      case 'onClick':
        n != null && (e.onclick = ml);
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
        dl(e, 'http://www.w3.org/1999/xlink', 'xlink:actuate', n);
        break;
      case 'xlinkArcrole':
        dl(e, 'http://www.w3.org/1999/xlink', 'xlink:arcrole', n);
        break;
      case 'xlinkRole':
        dl(e, 'http://www.w3.org/1999/xlink', 'xlink:role', n);
        break;
      case 'xlinkShow':
        dl(e, 'http://www.w3.org/1999/xlink', 'xlink:show', n);
        break;
      case 'xlinkTitle':
        dl(e, 'http://www.w3.org/1999/xlink', 'xlink:title', n);
        break;
      case 'xlinkType':
        dl(e, 'http://www.w3.org/1999/xlink', 'xlink:type', n);
        break;
      case 'xmlBase':
        dl(e, 'http://www.w3.org/XML/1998/namespace', 'xml:base', n);
        break;
      case 'xmlLang':
        dl(e, 'http://www.w3.org/XML/1998/namespace', 'xml:lang', n);
        break;
      case 'xmlSpace':
        dl(e, 'http://www.w3.org/XML/1998/namespace', 'xml:space', n);
        break;
      case 'is':
        Gi(e, 'is', n);
        break;
      case 'innerText':
      case 'textContent':
        break;
      default:
        (!(2 < l.length) || (l[0] !== 'o' && l[0] !== 'O') || (l[1] !== 'n' && l[1] !== 'N')) &&
          ((l = ng.get(l) || l), Gi(e, l, n));
    }
  }
  function bo(e, t, l, n, u, c) {
    switch (l) {
      case 'style':
        rf(e, n, c);
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
        n != null && (e.onclick = ml);
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
        if (!ef.hasOwnProperty(l))
          e: {
            if (
              l[0] === 'o' &&
              l[1] === 'n' &&
              ((u = l.endsWith('Capture')),
              (t = l.slice(2, u ? l.length - 7 : void 0)),
              (c = e[vt] || null),
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
  function dt(e, t, l) {
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
                  Le(e, t, c, f, l, null);
              }
          }
        (u && Le(e, t, 'srcSet', l.srcSet, l, null), n && Le(e, t, 'src', l.src, l, null));
        return;
      case 'input':
        xe('invalid', e);
        var p = (c = f = u = null),
          x = null,
          z = null;
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
                  z = q;
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
                  Le(e, t, n, q, l, null);
              }
          }
        uf(e, c, p, x, z, f, u, !1);
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
                Le(e, t, u, p, l, null);
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
                Le(e, t, f, p, l, null);
            }
        cf(e, n, u, c);
        return;
      case 'option':
        for (x in l)
          if (l.hasOwnProperty(x) && ((n = l[x]), n != null))
            switch (x) {
              case 'selected':
                e.selected = n && typeof n != 'function' && typeof n != 'symbol';
                break;
              default:
                Le(e, t, x, n, l, null);
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
        for (z in l)
          if (l.hasOwnProperty(z) && ((n = l[z]), n != null))
            switch (z) {
              case 'children':
              case 'dangerouslySetInnerHTML':
                throw Error(s(137, t));
              default:
                Le(e, t, z, n, l, null);
            }
        return;
      default:
        if (ws(t)) {
          for (q in l)
            l.hasOwnProperty(q) && ((n = l[q]), n !== void 0 && bo(e, t, q, n, l, void 0));
          return;
        }
    }
    for (p in l) l.hasOwnProperty(p) && ((n = l[p]), n != null && Le(e, t, p, n, l, null));
  }
  function R_(e, t, l, n) {
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
          z = null,
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
                n.hasOwnProperty(B) || Le(e, t, B, null, n, X);
            }
        }
        for (var D in n) {
          var B = n[D];
          if (((X = l[D]), n.hasOwnProperty(D) && (B != null || X != null)))
            switch (D) {
              case 'type':
                c = B;
                break;
              case 'name':
                u = B;
                break;
              case 'checked':
                z = B;
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
                B !== X && Le(e, t, D, B, n, X);
            }
        }
        js(e, f, p, x, z, q, c, u);
        return;
      case 'select':
        B = f = p = D = null;
        for (c in l)
          if (((x = l[c]), l.hasOwnProperty(c) && x != null))
            switch (c) {
              case 'value':
                break;
              case 'multiple':
                B = x;
              default:
                n.hasOwnProperty(c) || Le(e, t, c, null, n, x);
            }
        for (u in n)
          if (((c = n[u]), (x = l[u]), n.hasOwnProperty(u) && (c != null || x != null)))
            switch (u) {
              case 'value':
                D = c;
                break;
              case 'defaultValue':
                p = c;
                break;
              case 'multiple':
                f = c;
              default:
                c !== x && Le(e, t, u, c, n, x);
            }
        ((t = p),
          (l = f),
          (n = B),
          D != null
            ? qn(e, !!l, D, !1)
            : !!n != !!l && (t != null ? qn(e, !!l, t, !0) : qn(e, !!l, l ? [] : '', !1)));
        return;
      case 'textarea':
        B = D = null;
        for (p in l)
          if (((u = l[p]), l.hasOwnProperty(p) && u != null && !n.hasOwnProperty(p)))
            switch (p) {
              case 'value':
                break;
              case 'children':
                break;
              default:
                Le(e, t, p, null, n, u);
            }
        for (f in n)
          if (((u = n[f]), (c = l[f]), n.hasOwnProperty(f) && (u != null || c != null)))
            switch (f) {
              case 'value':
                D = u;
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
                u !== c && Le(e, t, f, u, n, c);
            }
        sf(e, D, B);
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
        for (x in n)
          if (((D = n[x]), (B = l[x]), n.hasOwnProperty(x) && D !== B && (D != null || B != null)))
            switch (x) {
              case 'selected':
                e.selected = D && typeof D != 'function' && typeof D != 'symbol';
                break;
              default:
                Le(e, t, x, D, n, B);
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
                if (D != null) throw Error(s(137, t));
                break;
              default:
                Le(e, t, z, D, n, B);
            }
        return;
      default:
        if (ws(t)) {
          for (var qe in l)
            ((D = l[qe]),
              l.hasOwnProperty(qe) &&
                D !== void 0 &&
                !n.hasOwnProperty(qe) &&
                bo(e, t, qe, void 0, n, D));
          for (q in n)
            ((D = n[q]),
              (B = l[q]),
              !n.hasOwnProperty(q) ||
                D === B ||
                (D === void 0 && B === void 0) ||
                bo(e, t, q, D, n, B));
          return;
        }
    }
    for (var R in l)
      ((D = l[R]),
        l.hasOwnProperty(R) && D != null && !n.hasOwnProperty(R) && Le(e, t, R, null, n, D));
    for (X in n)
      ((D = n[X]),
        (B = l[X]),
        !n.hasOwnProperty(X) || D === B || (D == null && B == null) || Le(e, t, X, D, n, B));
  }
  function fh(e) {
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
  function j_() {
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
        if (c && p && fh(f)) {
          for (f = 0, p = u.responseEnd, n += 1; n < l.length; n++) {
            var x = l[n],
              z = x.startTime;
            if (z > p) break;
            var q = x.transferSize,
              X = x.initiatorType;
            q && fh(X) && ((x = x.responseEnd), (f += q * (x < p ? 1 : (p - z) / (x - z))));
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
  var So = null,
    xo = null;
  function qu(e) {
    return e.nodeType === 9 ? e : e.ownerDocument;
  }
  function dh(e) {
    switch (e) {
      case 'http://www.w3.org/2000/svg':
        return 1;
      case 'http://www.w3.org/1998/Math/MathML':
        return 2;
      default:
        return 0;
    }
  }
  function mh(e, t) {
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
  function Eo(e, t) {
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
  var To = null;
  function O_() {
    var e = window.event;
    return e && e.type === 'popstate' ? (e === To ? !1 : ((To = e), !0)) : ((To = null), !1);
  }
  var hh = typeof setTimeout == 'function' ? setTimeout : void 0,
    w_ = typeof clearTimeout == 'function' ? clearTimeout : void 0,
    ph = typeof Promise == 'function' ? Promise : void 0,
    z_ =
      typeof queueMicrotask == 'function'
        ? queueMicrotask
        : typeof ph < 'u'
          ? function (e) {
              return ph.resolve(null).then(e).catch(D_);
            }
          : hh;
  function D_(e) {
    setTimeout(function () {
      throw e;
    });
  }
  function en(e) {
    return e === 'head';
  }
  function yh(e, t) {
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
            (c[wa] ||
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
  function gh(e, t) {
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
  function No(e) {
    var t = e.firstChild;
    for (t && t.nodeType === 10 && (t = t.nextSibling); t; ) {
      var l = t;
      switch (((t = t.nextSibling), l.nodeName)) {
        case 'HTML':
        case 'HEAD':
        case 'BODY':
          (No(l), Ms(l));
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
  function B_(e, t, l, n) {
    for (; e.nodeType === 1; ) {
      var u = l;
      if (e.nodeName.toLowerCase() !== t.toLowerCase()) {
        if (!n && (e.nodeName !== 'INPUT' || e.type !== 'hidden')) break;
      } else if (n) {
        if (!e[wa])
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
      if (((e = Vt(e.nextSibling)), e === null)) break;
    }
    return null;
  }
  function U_(e, t, l) {
    if (t === '') return null;
    for (; e.nodeType !== 3; )
      if (
        ((e.nodeType !== 1 || e.nodeName !== 'INPUT' || e.type !== 'hidden') && !l) ||
        ((e = Vt(e.nextSibling)), e === null)
      )
        return null;
    return e;
  }
  function _h(e, t) {
    for (; e.nodeType !== 8; )
      if (
        ((e.nodeType !== 1 || e.nodeName !== 'INPUT' || e.type !== 'hidden') && !t) ||
        ((e = Vt(e.nextSibling)), e === null)
      )
        return null;
    return e;
  }
  function ko(e) {
    return e.data === '$?' || e.data === '$~';
  }
  function Ao(e) {
    return e.data === '$!' || (e.data === '$?' && e.ownerDocument.readyState !== 'loading');
  }
  function L_(e, t) {
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
  function Vt(e) {
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
  var Co = null;
  function vh(e) {
    e = e.nextSibling;
    for (var t = 0; e; ) {
      if (e.nodeType === 8) {
        var l = e.data;
        if (l === '/$' || l === '/&') {
          if (t === 0) return Vt(e.nextSibling);
          t--;
        } else (l !== '$' && l !== '$!' && l !== '$?' && l !== '$~' && l !== '&') || t++;
      }
      e = e.nextSibling;
    }
    return null;
  }
  function bh(e) {
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
  function Sh(e, t, l) {
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
  var Qt = new Map(),
    xh = new Set();
  function Hu(e) {
    return typeof e.getRootNode == 'function'
      ? e.getRootNode()
      : e.nodeType === 9
        ? e
        : e.ownerDocument;
  }
  var Ml = J.d;
  J.d = { f: q_, r: H_, D: G_, C: Y_, L: $_, m: X_, X: Q_, S: V_, M: Z_ };
  function q_() {
    var e = Ml.f(),
      t = ju();
    return e || t;
  }
  function H_(e) {
    var t = Bn(e);
    t !== null && t.tag === 5 && t.type === 'form' ? qd(t) : Ml.r(e);
  }
  var ha = typeof document > 'u' ? null : document;
  function Eh(e, t, l) {
    var n = ha;
    if (n && typeof t == 'string' && t) {
      var u = Lt(t);
      ((u = 'link[rel="' + e + '"][href="' + u + '"]'),
        typeof l == 'string' && (u += '[crossorigin="' + l + '"]'),
        xh.has(u) ||
          (xh.add(u),
          (e = { rel: e, crossOrigin: l, href: t }),
          n.querySelector(u) === null &&
            ((t = n.createElement('link')), dt(t, 'link', e), ut(t), n.head.appendChild(t))));
    }
  }
  function G_(e) {
    (Ml.D(e), Eh('dns-prefetch', e, null));
  }
  function Y_(e, t) {
    (Ml.C(e, t), Eh('preconnect', e, t));
  }
  function $_(e, t, l) {
    Ml.L(e, t, l);
    var n = ha;
    if (n && e && t) {
      var u = 'link[rel="preload"][as="' + Lt(t) + '"]';
      t === 'image' && l && l.imageSrcSet
        ? ((u += '[imagesrcset="' + Lt(l.imageSrcSet) + '"]'),
          typeof l.imageSizes == 'string' && (u += '[imagesizes="' + Lt(l.imageSizes) + '"]'))
        : (u += '[href="' + Lt(e) + '"]');
      var c = u;
      switch (t) {
        case 'style':
          c = pa(e);
          break;
        case 'script':
          c = ya(e);
      }
      Qt.has(c) ||
        ((e = b(
          { rel: 'preload', href: t === 'image' && l && l.imageSrcSet ? void 0 : e, as: t },
          l
        )),
        Qt.set(c, e),
        n.querySelector(u) !== null ||
          (t === 'style' && n.querySelector(yi(c))) ||
          (t === 'script' && n.querySelector(gi(c))) ||
          ((t = n.createElement('link')), dt(t, 'link', e), ut(t), n.head.appendChild(t)));
    }
  }
  function X_(e, t) {
    Ml.m(e, t);
    var l = ha;
    if (l && e) {
      var n = t && typeof t.as == 'string' ? t.as : 'script',
        u = 'link[rel="modulepreload"][as="' + Lt(n) + '"][href="' + Lt(e) + '"]',
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
        !Qt.has(c) &&
        ((e = b({ rel: 'modulepreload', href: e }, t)), Qt.set(c, e), l.querySelector(u) === null)
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
        ((n = l.createElement('link')), dt(n, 'link', e), ut(n), l.head.appendChild(n));
      }
    }
  }
  function V_(e, t, l) {
    Ml.S(e, t, l);
    var n = ha;
    if (n && e) {
      var u = Un(n).hoistableStyles,
        c = pa(e);
      t = t || 'default';
      var f = u.get(c);
      if (!f) {
        var p = { loading: 0, preload: null };
        if ((f = n.querySelector(yi(c)))) p.loading = 5;
        else {
          ((e = b({ rel: 'stylesheet', href: e, 'data-precedence': t }, l)),
            (l = Qt.get(c)) && Mo(e, l));
          var x = (f = n.createElement('link'));
          (ut(x),
            dt(x, 'link', e),
            (x._p = new Promise(function (z, q) {
              ((x.onload = z), (x.onerror = q));
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
  function Q_(e, t) {
    Ml.X(e, t);
    var l = ha;
    if (l && e) {
      var n = Un(l).hoistableScripts,
        u = ya(e),
        c = n.get(u);
      c ||
        ((c = l.querySelector(gi(u))),
        c ||
          ((e = b({ src: e, async: !0 }, t)),
          (t = Qt.get(u)) && Ro(e, t),
          (c = l.createElement('script')),
          ut(c),
          dt(c, 'link', e),
          l.head.appendChild(c)),
        (c = { type: 'script', instance: c, count: 1, state: null }),
        n.set(u, c));
    }
  }
  function Z_(e, t) {
    Ml.M(e, t);
    var l = ha;
    if (l && e) {
      var n = Un(l).hoistableScripts,
        u = ya(e),
        c = n.get(u);
      c ||
        ((c = l.querySelector(gi(u))),
        c ||
          ((e = b({ src: e, async: !0, type: 'module' }, t)),
          (t = Qt.get(u)) && Ro(e, t),
          (c = l.createElement('script')),
          ut(c),
          dt(c, 'link', e),
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
            (l = Un(u).hoistableStyles),
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
          var c = Un(u).hoistableStyles,
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
              Qt.has(e) ||
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
                Qt.set(e, l),
                c || K_(u, e, l, f.state))),
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
              (l = Un(u).hoistableScripts),
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
    return 'href="' + Lt(e) + '"';
  }
  function yi(e) {
    return 'link[rel="stylesheet"][' + e + ']';
  }
  function Nh(e) {
    return b({}, e, { 'data-precedence': e.precedence, precedence: null });
  }
  function K_(e, t, l, n) {
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
        dt(t, 'link', l),
        ut(t),
        e.head.appendChild(t));
  }
  function ya(e) {
    return '[src="' + Lt(e) + '"]';
  }
  function gi(e) {
    return 'script[async]' + e;
  }
  function kh(e, t, l) {
    if ((t.count++, t.instance === null))
      switch (t.type) {
        case 'style':
          var n = e.querySelector('style[data-href~="' + Lt(l.href) + '"]');
          if (n) return ((t.instance = n), ut(n), n);
          var u = b({}, l, {
            'data-href': l.href,
            'data-precedence': l.precedence,
            href: null,
            precedence: null,
          });
          return (
            (n = (e.ownerDocument || e).createElement('style')),
            ut(n),
            dt(n, 'style', u),
            Gu(n, l.precedence, e),
            (t.instance = n)
          );
        case 'stylesheet':
          u = pa(l.href);
          var c = e.querySelector(yi(u));
          if (c) return ((t.state.loading |= 4), (t.instance = c), ut(c), c);
          ((n = Nh(l)),
            (u = Qt.get(u)) && Mo(n, u),
            (c = (e.ownerDocument || e).createElement('link')),
            ut(c));
          var f = c;
          return (
            (f._p = new Promise(function (p, x) {
              ((f.onload = p), (f.onerror = x));
            })),
            dt(c, 'link', n),
            (t.state.loading |= 4),
            Gu(c, l.precedence, e),
            (t.instance = c)
          );
        case 'script':
          return (
            (c = ya(l.src)),
            (u = e.querySelector(gi(c)))
              ? ((t.instance = u), ut(u), u)
              : ((n = l),
                (u = Qt.get(c)) && ((n = b({}, l)), Ro(n, u)),
                (e = e.ownerDocument || e),
                (u = e.createElement('script')),
                ut(u),
                dt(u, 'link', n),
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
        !(c[wa] || c[ct] || (e === 'link' && c.getAttribute('rel') === 'stylesheet')) &&
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
  function Ch(e, t, l) {
    ((e = e.ownerDocument || e),
      e.head.insertBefore(l, t === 'title' ? e.querySelector('head > title') : null));
  }
  function I_(e, t, l) {
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
  function J_(e, t, l, n) {
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
            ut(c));
          return;
        }
        ((c = t.ownerDocument || t),
          (n = Nh(n)),
          (u = Qt.get(u)) && Mo(n, u),
          (c = c.createElement('link')),
          ut(c));
        var f = c;
        ((f._p = new Promise(function (p, x) {
          ((f.onload = p), (f.onerror = x));
        })),
          dt(c, 'link', n),
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
  var jo = 0;
  function W_(e, t) {
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
            0 < e.imgBytes && jo === 0 && (jo = 62500 * j_());
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
              (e.imgBytes > jo ? 50 : 800) + t
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
        (e.count++, (Xu = new Map()), t.forEach(F_, e), (Xu = null), $u.call(e)));
  }
  function F_(e, t) {
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
    $$typeof: Y,
    Provider: null,
    Consumer: null,
    _currentValue: te,
    _currentValue2: te,
    _threadCount: 0,
  };
  function P_(e, t, l, n, u, c, f, p, x) {
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
      (this.expirationTimes = Ns(-1)),
      (this.entangledLanes =
        this.shellSuspendCounter =
        this.errorRecoveryDisabledLanes =
        this.expiredLanes =
        this.warmLanes =
        this.pingedLanes =
        this.suspendedLanes =
        this.pendingLanes =
          0),
      (this.entanglements = Ns(0)),
      (this.hiddenUpdates = Ns(null)),
      (this.identifierPrefix = n),
      (this.onUncaughtError = u),
      (this.onCaughtError = c),
      (this.onRecoverableError = f),
      (this.pooledCache = null),
      (this.pooledCacheLanes = 0),
      (this.formState = x),
      (this.incompleteTransitions = new Map()));
  }
  function Rh(e, t, l, n, u, c, f, p, x, z, q, X) {
    return (
      (e = new P_(e, t, l, f, x, z, q, X, p)),
      (t = 1),
      c === !0 && (t |= 24),
      (c = Rt(3, null, null, t)),
      (e.current = c),
      (c.stateNode = e),
      (t = oc()),
      t.refCount++,
      (e.pooledCache = t),
      t.refCount++,
      (c.memoizedState = { element: n, isDehydrated: l, cache: t }),
      mc(c),
      e
    );
  }
  function jh(e) {
    return e ? ((e = Zn), e) : Zn;
  }
  function Oh(e, t, l, n, u, c) {
    ((u = jh(u)),
      n.context === null ? (n.context = u) : (n.pendingContext = u),
      (n = $l(t)),
      (n.payload = { element: l }),
      (c = c === void 0 ? null : c),
      c !== null && (n.callback = c),
      (l = Xl(e, n, t)),
      l !== null && (Nt(l, e, t), Ja(l, e, t)));
  }
  function wh(e, t) {
    if (((e = e.memoizedState), e !== null && e.dehydrated !== null)) {
      var l = e.retryLane;
      e.retryLane = l !== 0 && l < t ? l : t;
    }
  }
  function Oo(e, t) {
    (wh(e, t), (e = e.alternate) && wh(e, t));
  }
  function zh(e) {
    if (e.tag === 13 || e.tag === 31) {
      var t = gn(e, 67108864);
      (t !== null && Nt(t, e, 67108864), Oo(e, 67108864));
    }
  }
  function Dh(e) {
    if (e.tag === 13 || e.tag === 31) {
      var t = Dt();
      t = ks(t);
      var l = gn(e, t);
      (l !== null && Nt(l, e, t), Oo(e, t));
    }
  }
  var Qu = !0;
  function e0(e, t, l, n) {
    var u = U.T;
    U.T = null;
    var c = J.p;
    try {
      ((J.p = 2), wo(e, t, l, n));
    } finally {
      ((J.p = c), (U.T = u));
    }
  }
  function t0(e, t, l, n) {
    var u = U.T;
    U.T = null;
    var c = J.p;
    try {
      ((J.p = 8), wo(e, t, l, n));
    } finally {
      ((J.p = c), (U.T = u));
    }
  }
  function wo(e, t, l, n) {
    if (Qu) {
      var u = zo(n);
      if (u === null) (vo(e, t, n, Zu, l), Uh(e, n));
      else if (n0(u, e, t, l, n)) n.stopPropagation();
      else if ((Uh(e, n), t & 4 && -1 < l0.indexOf(e))) {
        for (; u !== null; ) {
          var c = Bn(u);
          if (c !== null)
            switch (c.tag) {
              case 3:
                if (((c = c.stateNode), c.current.memoizedState.isDehydrated)) {
                  var f = dn(c.pendingLanes);
                  if (f !== 0) {
                    var p = c;
                    for (p.pendingLanes |= 2, p.entangledLanes |= 2; f; ) {
                      var x = 1 << (31 - Ct(f));
                      ((p.entanglements[1] |= x), (f &= ~x));
                    }
                    (ul(c), (Oe & 6) === 0 && ((Mu = kt() + 500), di(0)));
                  }
                }
                break;
              case 31:
              case 13:
                ((p = gn(c, 2)), p !== null && Nt(p, c, 2), ju(), Oo(c, 2));
            }
          if (((c = zo(n)), c === null && vo(e, t, n, Zu, l), c === u)) break;
          u = c;
        }
        u !== null && n.stopPropagation();
      } else vo(e, t, n, null, l);
    }
  }
  function zo(e) {
    return ((e = Ds(e)), Do(e));
  }
  var Zu = null;
  function Do(e) {
    if (((Zu = null), (e = Dn(e)), e !== null)) {
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
    return ((Zu = e), null);
  }
  function Bh(e) {
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
        switch (Gy()) {
          case $r:
            return 2;
          case Xr:
            return 8;
          case Bi:
          case Yy:
            return 32;
          case Vr:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var Bo = !1,
    tn = null,
    ln = null,
    nn = null,
    vi = new Map(),
    bi = new Map(),
    an = [],
    l0 =
      'mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset'.split(
        ' '
      );
  function Uh(e, t) {
    switch (e) {
      case 'focusin':
      case 'focusout':
        tn = null;
        break;
      case 'dragenter':
      case 'dragleave':
        ln = null;
        break;
      case 'mouseover':
      case 'mouseout':
        nn = null;
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
  function n0(e, t, l, n, u) {
    switch (t) {
      case 'focusin':
        return ((tn = Si(tn, e, t, l, n, u)), !0);
      case 'dragenter':
        return ((ln = Si(ln, e, t, l, n, u)), !0);
      case 'mouseover':
        return ((nn = Si(nn, e, t, l, n, u)), !0);
      case 'pointerover':
        var c = u.pointerId;
        return (vi.set(c, Si(vi.get(c) || null, e, t, l, n, u)), !0);
      case 'gotpointercapture':
        return ((c = u.pointerId), bi.set(c, Si(bi.get(c) || null, e, t, l, n, u)), !0);
    }
    return !1;
  }
  function Lh(e) {
    var t = Dn(e.target);
    if (t !== null) {
      var l = d(t);
      if (l !== null) {
        if (((t = l.tag), t === 13)) {
          if (((t = m(l)), t !== null)) {
            ((e.blockedOn = t),
              Wr(e.priority, function () {
                Dh(l);
              }));
            return;
          }
        } else if (t === 31) {
          if (((t = v(l)), t !== null)) {
            ((e.blockedOn = t),
              Wr(e.priority, function () {
                Dh(l);
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
  function qh(e, t, l) {
    Ku(e) && l.delete(t);
  }
  function a0() {
    ((Bo = !1),
      tn !== null && Ku(tn) && (tn = null),
      ln !== null && Ku(ln) && (ln = null),
      nn !== null && Ku(nn) && (nn = null),
      vi.forEach(qh),
      bi.forEach(qh));
  }
  function Iu(e, t) {
    e.blockedOn === t &&
      ((e.blockedOn = null),
      Bo || ((Bo = !0), a.unstable_scheduleCallback(a.unstable_NormalPriority, a0)));
  }
  var Ju = null;
  function Hh(e) {
    Ju !== e &&
      ((Ju = e),
      a.unstable_scheduleCallback(a.unstable_NormalPriority, function () {
        Ju === e && (Ju = null);
        for (var t = 0; t < e.length; t += 3) {
          var l = e[t],
            n = e[t + 1],
            u = e[t + 2];
          if (typeof n != 'function') {
            if (Do(n || l) === null) continue;
            break;
          }
          var c = Bn(l);
          c !== null &&
            (e.splice(t, 3),
            (t -= 3),
            wc(c, { pending: !0, data: u, method: l.method, action: n }, n, u));
        }
      }));
  }
  function ga(e) {
    function t(x) {
      return Iu(x, e);
    }
    (tn !== null && Iu(tn, e),
      ln !== null && Iu(ln, e),
      nn !== null && Iu(nn, e),
      vi.forEach(t),
      bi.forEach(t));
    for (var l = 0; l < an.length; l++) {
      var n = an[l];
      n.blockedOn === e && (n.blockedOn = null);
    }
    for (; 0 < an.length && ((l = an[0]), l.blockedOn === null); )
      (Lh(l), l.blockedOn === null && an.shift());
    if (((l = (e.ownerDocument || e).$$reactFormReplay), l != null))
      for (n = 0; n < l.length; n += 3) {
        var u = l[n],
          c = l[n + 1],
          f = u[vt] || null;
        if (typeof c == 'function') f || Hh(l);
        else if (f) {
          var p = null;
          if (c && c.hasAttribute('formAction')) {
            if (((u = c), (f = c[vt] || null))) p = f.formAction;
            else if (Do(u) !== null) continue;
          } else p = f.action;
          (typeof p == 'function' ? (l[n + 1] = p) : (l.splice(n, 3), (n -= 3)), Hh(l));
        }
      }
  }
  function Gh() {
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
        n = Dt();
      Oh(l, n, e, t, null, null);
    }),
    (Wu.prototype.unmount = Uo.prototype.unmount =
      function () {
        var e = this._internalRoot;
        if (e !== null) {
          this._internalRoot = null;
          var t = e.containerInfo;
          (Oh(e.current, 2, null, e, null, null), ju(), (t[zn] = null));
        }
      }));
  function Wu(e) {
    this._internalRoot = e;
  }
  Wu.prototype.unstable_scheduleHydration = function (e) {
    if (e) {
      var t = Jr();
      e = { blockedOn: null, target: e, priority: t };
      for (var l = 0; l < an.length && t !== 0 && t < an[l].priority; l++);
      (an.splice(l, 0, e), l === 0 && Lh(e));
    }
  };
  var Yh = i.version;
  if (Yh !== '19.2.5') throw Error(s(527, Yh, '19.2.5'));
  J.findDOMNode = function (e) {
    var t = e._reactInternals;
    if (t === void 0)
      throw typeof e.render == 'function'
        ? Error(s(188))
        : ((e = Object.keys(e).join(',')), Error(s(268, e)));
    return ((e = g(t)), (e = e !== null ? y(e) : null), (e = e === null ? null : e.stateNode), e);
  };
  var i0 = {
    bundleType: 0,
    version: '19.2.5',
    rendererPackageName: 'react-dom',
    currentDispatcherRef: U,
    reconcilerVersion: '19.2.5',
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < 'u') {
    var Fu = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Fu.isDisabled && Fu.supportsFiber)
      try {
        ((Ra = Fu.inject(i0)), (At = Fu));
      } catch {}
  }
  return (
    (Ei.createRoot = function (e, t) {
      if (!r(e)) throw Error(s(299));
      var l = !1,
        n = '',
        u = Id,
        c = Jd,
        f = Wd;
      return (
        t != null &&
          (t.unstable_strictMode === !0 && (l = !0),
          t.identifierPrefix !== void 0 && (n = t.identifierPrefix),
          t.onUncaughtError !== void 0 && (u = t.onUncaughtError),
          t.onCaughtError !== void 0 && (c = t.onCaughtError),
          t.onRecoverableError !== void 0 && (f = t.onRecoverableError)),
        (t = Rh(e, 1, !1, null, null, l, n, null, u, c, f, Gh)),
        (e[zn] = t.current),
        _o(e),
        new Uo(t)
      );
    }),
    (Ei.hydrateRoot = function (e, t, l) {
      if (!r(e)) throw Error(s(299));
      var n = !1,
        u = '',
        c = Id,
        f = Jd,
        p = Wd,
        x = null;
      return (
        l != null &&
          (l.unstable_strictMode === !0 && (n = !0),
          l.identifierPrefix !== void 0 && (u = l.identifierPrefix),
          l.onUncaughtError !== void 0 && (c = l.onUncaughtError),
          l.onCaughtError !== void 0 && (f = l.onCaughtError),
          l.onRecoverableError !== void 0 && (p = l.onRecoverableError),
          l.formState !== void 0 && (x = l.formState)),
        (t = Rh(e, 1, !0, t, l ?? null, n, u, x, c, f, p, Gh)),
        (t.context = jh(null)),
        (l = t.current),
        (n = Dt()),
        (n = ks(n)),
        (u = $l(n)),
        (u.callback = null),
        Xl(l, u, n),
        (l = n),
        (t.current.lanes = l),
        Oa(t, l),
        ul(t),
        (e[zn] = t.current),
        _o(e),
        new Wu(t)
      );
    }),
    (Ei.version = '19.2.5'),
    Ei
  );
}
var Fh;
function g0() {
  if (Fh) return Ho.exports;
  Fh = 1;
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
  return (a(), (Ho.exports = y0()), Ho.exports);
}
var _0 = g0(),
  T = _r();
/**
 * react-router v7.14.2
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */ var Ph = 'popstate';
function ep(a) {
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
function v0(a = {}) {
  function i(s, r) {
    var g;
    let d = (g = r.state) == null ? void 0 : g.masked,
      { pathname: m, search: v, hash: _ } = d || s.location;
    return ir(
      '',
      { pathname: m, search: v, hash: _ },
      (r.state && r.state.usr) || null,
      (r.state && r.state.key) || 'default',
      d
        ? { pathname: s.location.pathname, search: s.location.search, hash: s.location.hash }
        : void 0
    );
  }
  function o(s, r) {
    return typeof r == 'string' ? r : Ri(r);
  }
  return S0(i, o, null, a);
}
function Qe(a, i) {
  if (a === !1 || a === null || typeof a > 'u') throw new Error(i);
}
function tl(a, i) {
  if (!a) {
    typeof console < 'u' && console.warn(i);
    try {
      throw new Error(i);
    } catch {}
  }
}
function b0() {
  return Math.random().toString(36).substring(2, 10);
}
function tp(a, i) {
  return {
    usr: a.state,
    key: a.key,
    idx: i,
    masked: a.unstable_mask ? { pathname: a.pathname, search: a.search, hash: a.hash } : void 0,
  };
}
function ir(a, i, o = null, s, r) {
  return {
    pathname: typeof a == 'string' ? a : a.pathname,
    search: '',
    hash: '',
    ...(typeof i == 'string' ? Na(i) : i),
    state: o,
    key: (i && i.key) || s || b0(),
    unstable_mask: r,
  };
}
function Ri({ pathname: a = '/', search: i = '', hash: o = '' }) {
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
function S0(a, i, o, s = {}) {
  let { window: r = document.defaultView, v5Compat: d = !1 } = s,
    m = r.history,
    v = 'POP',
    _ = null,
    g = y();
  g == null && ((g = 0), m.replaceState({ ...m.state, idx: g }, ''));
  function y() {
    return (m.state || { idx: null }).idx;
  }
  function b() {
    v = 'POP';
    let M = y(),
      N = M == null ? null : M - g;
    ((g = M), _ && _({ action: v, location: O.location, delta: N }));
  }
  function A(M, N) {
    v = 'PUSH';
    let k = ep(M) ? M : ir(O.location, M, N);
    g = y() + 1;
    let Y = tp(k, g),
      V = O.createHref(k.unstable_mask || k);
    try {
      m.pushState(Y, '', V);
    } catch (Z) {
      if (Z instanceof DOMException && Z.name === 'DataCloneError') throw Z;
      r.location.assign(V);
    }
    d && _ && _({ action: v, location: O.location, delta: 1 });
  }
  function j(M, N) {
    v = 'REPLACE';
    let k = ep(M) ? M : ir(O.location, M, N);
    g = y();
    let Y = tp(k, g),
      V = O.createHref(k.unstable_mask || k);
    (m.replaceState(Y, '', V), d && _ && _({ action: v, location: O.location, delta: 0 }));
  }
  function S(M) {
    return x0(M);
  }
  let O = {
    get action() {
      return v;
    },
    get location() {
      return a(r, m);
    },
    listen(M) {
      if (_) throw new Error('A history only accepts one active listener');
      return (
        r.addEventListener(Ph, b),
        (_ = M),
        () => {
          (r.removeEventListener(Ph, b), (_ = null));
        }
      );
    },
    createHref(M) {
      return i(r, M);
    },
    createURL: S,
    encodeLocation(M) {
      let N = S(M);
      return { pathname: N.pathname, search: N.search, hash: N.hash };
    },
    push: A,
    replace: j,
    go(M) {
      return m.go(M);
    },
  };
  return O;
}
function x0(a, i = !1) {
  let o = 'http://localhost';
  (typeof window < 'u' &&
    (o = window.location.origin !== 'null' ? window.location.origin : window.location.href),
    Qe(o, 'No window.location.(origin|href) available to create URL'));
  let s = typeof a == 'string' ? a : Ri(a);
  return ((s = s.replace(/ $/, '%20')), !i && s.startsWith('//') && (s = o + s), new URL(s, o));
}
function Ap(a, i, o = '/') {
  return E0(a, i, o, !1);
}
function E0(a, i, o, s) {
  let r = typeof i == 'string' ? Na(i) : i,
    d = zl(r.pathname || '/', o);
  if (d == null) return null;
  let m = Cp(a);
  T0(m);
  let v = null;
  for (let _ = 0; v == null && _ < m.length; ++_) {
    let g = D0(d);
    v = w0(m[_], g, s);
  }
  return v;
}
function Cp(a, i = [], o = [], s = '', r = !1) {
  let d = (m, v, _ = r, g) => {
    let y = {
      relativePath: g === void 0 ? m.path || '' : g,
      caseSensitive: m.caseSensitive === !0,
      childrenIndex: v,
      route: m,
    };
    if (y.relativePath.startsWith('/')) {
      if (!y.relativePath.startsWith(s) && _) return;
      (Qe(
        y.relativePath.startsWith(s),
        `Absolute route path "${y.relativePath}" nested under path "${s}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`
      ),
        (y.relativePath = y.relativePath.slice(s.length)));
    }
    let b = el([s, y.relativePath]),
      A = o.concat(y);
    (m.children &&
      m.children.length > 0 &&
      (Qe(
        m.index !== !0,
        `Index routes must not have child routes. Please remove all child routes from route path "${b}".`
      ),
      Cp(m.children, i, A, b, _)),
      !(m.path == null && !m.index) && i.push({ path: b, score: j0(b, m.index), routesMeta: A }));
  };
  return (
    a.forEach((m, v) => {
      var _;
      if (m.path === '' || !((_ = m.path) != null && _.includes('?'))) d(m, v);
      else for (let g of Mp(m.path)) d(m, v, !0, g);
    }),
    i
  );
}
function Mp(a) {
  let i = a.split('/');
  if (i.length === 0) return [];
  let [o, ...s] = i,
    r = o.endsWith('?'),
    d = o.replace(/\?$/, '');
  if (s.length === 0) return r ? [d, ''] : [d];
  let m = Mp(s.join('/')),
    v = [];
  return (
    v.push(...m.map((_) => (_ === '' ? d : [d, _].join('/')))),
    r && v.push(...m),
    v.map((_) => (a.startsWith('/') && _ === '' ? '/' : _))
  );
}
function T0(a) {
  a.sort((i, o) =>
    i.score !== o.score
      ? o.score - i.score
      : O0(
          i.routesMeta.map((s) => s.childrenIndex),
          o.routesMeta.map((s) => s.childrenIndex)
        )
  );
}
var N0 = /^:[\w-]+$/,
  k0 = 3,
  A0 = 2,
  C0 = 1,
  M0 = 10,
  R0 = -2,
  lp = (a) => a === '*';
function j0(a, i) {
  let o = a.split('/'),
    s = o.length;
  return (
    o.some(lp) && (s += R0),
    i && (s += A0),
    o.filter((r) => !lp(r)).reduce((r, d) => r + (N0.test(d) ? k0 : d === '' ? C0 : M0), s)
  );
}
function O0(a, i) {
  return a.length === i.length && a.slice(0, -1).every((s, r) => s === i[r])
    ? a[a.length - 1] - i[i.length - 1]
    : 0;
}
function w0(a, i, o = !1) {
  let { routesMeta: s } = a,
    r = {},
    d = '/',
    m = [];
  for (let v = 0; v < s.length; ++v) {
    let _ = s[v],
      g = v === s.length - 1,
      y = d === '/' ? i : i.slice(d.length) || '/',
      b = us({ path: _.relativePath, caseSensitive: _.caseSensitive, end: g }, y),
      A = _.route;
    if (
      (!b &&
        g &&
        o &&
        !s[s.length - 1].route.index &&
        (b = us({ path: _.relativePath, caseSensitive: _.caseSensitive, end: !1 }, y)),
      !b)
    )
      return null;
    (Object.assign(r, b.params),
      m.push({
        params: r,
        pathname: el([d, b.pathname]),
        pathnameBase: q0(el([d, b.pathnameBase])),
        route: A,
      }),
      b.pathnameBase !== '/' && (d = el([d, b.pathnameBase])));
  }
  return m;
}
function us(a, i) {
  typeof a == 'string' && (a = { path: a, caseSensitive: !1, end: !0 });
  let [o, s] = z0(a.path, a.caseSensitive, a.end),
    r = i.match(o);
  if (!r) return null;
  let d = r[0],
    m = d.replace(/(.)\/+$/, '$1'),
    v = r.slice(1);
  return {
    params: s.reduce((g, { paramName: y, isOptional: b }, A) => {
      if (y === '*') {
        let S = v[A] || '';
        m = d.slice(0, d.length - S.length).replace(/(.)\/+$/, '$1');
      }
      const j = v[A];
      return (b && !j ? (g[y] = void 0) : (g[y] = (j || '').replace(/%2F/g, '/')), g);
    }, {}),
    pathname: d,
    pathnameBase: m,
    pattern: a,
  };
}
function z0(a, i = !1, o = !0) {
  tl(
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
        .replace(/\/:([\w-]+)(\?)?/g, (m, v, _, g, y) => {
          if ((s.push({ paramName: v, isOptional: _ != null }), _)) {
            let b = y.charAt(g + m.length);
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
function D0(a) {
  try {
    return a
      .split('/')
      .map((i) => decodeURIComponent(i).replace(/\//g, '%2F'))
      .join('/');
  } catch (i) {
    return (
      tl(
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
var B0 = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;
function U0(a, i = '/') {
  let { pathname: o, search: s = '', hash: r = '' } = typeof a == 'string' ? Na(a) : a,
    d;
  return (
    o ? ((o = Rp(o)), o.startsWith('/') ? (d = np(o.substring(1), '/')) : (d = np(o, i))) : (d = i),
    { pathname: d, search: H0(s), hash: G0(r) }
  );
}
function np(a, i) {
  let o = ss(i).split('/');
  return (
    a.split('/').forEach((r) => {
      r === '..' ? o.length > 1 && o.pop() : r !== '.' && o.push(r);
    }),
    o.length > 1 ? o.join('/') : '/'
  );
}
function Vo(a, i, o, s) {
  return `Cannot include a '${a}' character in a manually specified \`to.${i}\` field [${JSON.stringify(s)}].  Please separate it out to the \`to.${o}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`;
}
function L0(a) {
  return a.filter((i, o) => o === 0 || (i.route.path && i.route.path.length > 0));
}
function vr(a) {
  let i = L0(a);
  return i.map((o, s) => (s === i.length - 1 ? o.pathname : o.pathnameBase));
}
function ms(a, i, o, s = !1) {
  let r;
  typeof a == 'string'
    ? (r = Na(a))
    : ((r = { ...a }),
      Qe(!r.pathname || !r.pathname.includes('?'), Vo('?', 'pathname', 'search', r)),
      Qe(!r.pathname || !r.pathname.includes('#'), Vo('#', 'pathname', 'hash', r)),
      Qe(!r.search || !r.search.includes('#'), Vo('#', 'search', 'hash', r)));
  let d = a === '' || r.pathname === '',
    m = d ? '/' : r.pathname,
    v;
  if (m == null) v = o;
  else {
    let b = i.length - 1;
    if (!s && m.startsWith('..')) {
      let A = m.split('/');
      for (; A[0] === '..'; ) (A.shift(), (b -= 1));
      r.pathname = A.join('/');
    }
    v = b >= 0 ? i[b] : '/';
  }
  let _ = U0(r, v),
    g = m && m !== '/' && m.endsWith('/'),
    y = (d || m === '.') && o.endsWith('/');
  return (!_.pathname.endsWith('/') && (g || y) && (_.pathname += '/'), _);
}
var Rp = (a) => a.replace(/\/\/+/g, '/'),
  el = (a) => Rp(a.join('/')),
  ss = (a) => a.replace(/\/+$/, ''),
  q0 = (a) => ss(a).replace(/^\/*/, '/'),
  H0 = (a) => (!a || a === '?' ? '' : a.startsWith('?') ? a : '?' + a),
  G0 = (a) => (!a || a === '#' ? '' : a.startsWith('#') ? a : '#' + a),
  Y0 = class {
    constructor(a, i, o, s = !1) {
      ((this.status = a),
        (this.statusText = i || ''),
        (this.internal = s),
        o instanceof Error ? ((this.data = o.toString()), (this.error = o)) : (this.data = o));
    }
  };
function $0(a) {
  return (
    a != null &&
    typeof a.status == 'number' &&
    typeof a.statusText == 'string' &&
    typeof a.internal == 'boolean' &&
    'data' in a
  );
}
function X0(a) {
  let i = a.map((o) => o.route.path).filter(Boolean);
  return el(i) || '/';
}
var jp =
  typeof window < 'u' && typeof window.document < 'u' && typeof window.document.createElement < 'u';
function Op(a, i) {
  let o = a;
  if (typeof o != 'string' || !B0.test(o)) return { absoluteURL: void 0, isExternal: !1, to: o };
  let s = o,
    r = !1;
  if (jp)
    try {
      let d = new URL(window.location.href),
        m = o.startsWith('//') ? new URL(d.protocol + o) : new URL(o),
        v = zl(m.pathname, i);
      m.origin === d.origin && v != null ? (o = v + m.search + m.hash) : (r = !0);
    } catch {
      tl(
        !1,
        `<Link to="${o}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`
      );
    }
  return { absoluteURL: s, isExternal: r, to: o };
}
Object.getOwnPropertyNames(Object.prototype).sort().join('\0');
var wp = ['POST', 'PUT', 'PATCH', 'DELETE'];
new Set(wp);
var V0 = ['GET', ...wp];
new Set(V0);
var ka = T.createContext(null);
ka.displayName = 'DataRouter';
var hs = T.createContext(null);
hs.displayName = 'DataRouterState';
var zp = T.createContext(!1);
function Q0() {
  return T.useContext(zp);
}
var Dp = T.createContext({ isTransitioning: !1 });
Dp.displayName = 'ViewTransition';
var Z0 = T.createContext(new Map());
Z0.displayName = 'Fetchers';
var K0 = T.createContext(null);
K0.displayName = 'Await';
var Bt = T.createContext(null);
Bt.displayName = 'Navigation';
var wi = T.createContext(null);
wi.displayName = 'Location';
var ll = T.createContext({ outlet: null, matches: [], isDataRoute: !1 });
ll.displayName = 'Route';
var br = T.createContext(null);
br.displayName = 'RouteError';
var Bp = 'REACT_ROUTER_ERROR',
  I0 = 'REDIRECT',
  J0 = 'ROUTE_ERROR_RESPONSE';
function W0(a) {
  if (a.startsWith(`${Bp}:${I0}:{`))
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
function F0(a) {
  if (a.startsWith(`${Bp}:${J0}:{`))
    try {
      let i = JSON.parse(a.slice(40));
      if (
        typeof i == 'object' &&
        i &&
        typeof i.status == 'number' &&
        typeof i.statusText == 'string'
      )
        return new Y0(i.status, i.statusText, i.data);
    } catch {}
}
function P0(a, { relative: i } = {}) {
  Qe(Aa(), 'useHref() may be used only in the context of a <Router> component.');
  let { basename: o, navigator: s } = T.useContext(Bt),
    { hash: r, pathname: d, search: m } = zi(a, { relative: i }),
    v = d;
  return (
    o !== '/' && (v = d === '/' ? o : el([o, d])),
    s.createHref({ pathname: v, search: m, hash: r })
  );
}
function Aa() {
  return T.useContext(wi) != null;
}
function rl() {
  return (
    Qe(Aa(), 'useLocation() may be used only in the context of a <Router> component.'),
    T.useContext(wi).location
  );
}
var Up =
  'You should call navigate() in a React.useEffect(), not when your component is first rendered.';
function Lp(a) {
  T.useContext(Bt).static || T.useLayoutEffect(a);
}
function fl() {
  let { isDataRoute: a } = T.useContext(ll);
  return a ? mv() : ev();
}
function ev() {
  Qe(Aa(), 'useNavigate() may be used only in the context of a <Router> component.');
  let a = T.useContext(ka),
    { basename: i, navigator: o } = T.useContext(Bt),
    { matches: s } = T.useContext(ll),
    { pathname: r } = rl(),
    d = JSON.stringify(vr(s)),
    m = T.useRef(!1);
  return (
    Lp(() => {
      m.current = !0;
    }),
    T.useCallback(
      (_, g = {}) => {
        if ((tl(m.current, Up), !m.current)) return;
        if (typeof _ == 'number') {
          o.go(_);
          return;
        }
        let y = ms(_, JSON.parse(d), r, g.relative === 'path');
        (a == null && i !== '/' && (y.pathname = y.pathname === '/' ? i : el([i, y.pathname])),
          (g.replace ? o.replace : o.push)(y, g.state, g));
      },
      [i, o, d, r, a]
    )
  );
}
T.createContext(null);
function tv() {
  let { matches: a } = T.useContext(ll),
    i = a[a.length - 1];
  return (i == null ? void 0 : i.params) ?? {};
}
function zi(a, { relative: i } = {}) {
  let { matches: o } = T.useContext(ll),
    { pathname: s } = rl(),
    r = JSON.stringify(vr(o));
  return T.useMemo(() => ms(a, JSON.parse(r), s, i === 'path'), [a, r, s, i]);
}
function lv(a, i) {
  return qp(a, i);
}
function qp(a, i, o) {
  var M;
  Qe(Aa(), 'useRoutes() may be used only in the context of a <Router> component.');
  let { navigator: s } = T.useContext(Bt),
    { matches: r } = T.useContext(ll),
    d = r[r.length - 1],
    m = d ? d.params : {},
    v = d ? d.pathname : '/',
    _ = d ? d.pathnameBase : '/',
    g = d && d.route;
  {
    let N = (g && g.path) || '';
    Gp(
      v,
      !g || N.endsWith('*') || N.endsWith('*?'),
      `You rendered descendant <Routes> (or called \`useRoutes()\`) at "${v}" (under <Route path="${N}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${N}"> to <Route path="${N === '/' ? '*' : `${N}/*`}">.`
    );
  }
  let y = rl(),
    b;
  if (i) {
    let N = typeof i == 'string' ? Na(i) : i;
    (Qe(
      _ === '/' || ((M = N.pathname) == null ? void 0 : M.startsWith(_)),
      `When overriding the location using \`<Routes location>\` or \`useRoutes(routes, location)\`, the location pathname must begin with the portion of the URL pathname that was matched by all parent routes. The current pathname base is "${_}" but pathname "${N.pathname}" was given in the \`location\` prop.`
    ),
      (b = N));
  } else b = y;
  let A = b.pathname || '/',
    j = A;
  if (_ !== '/') {
    let N = _.replace(/^\//, '').split('/');
    j = '/' + A.replace(/^\//, '').split('/').slice(N.length).join('/');
  }
  let S = Ap(a, { pathname: j });
  (tl(g || S != null, `No routes matched location "${b.pathname}${b.search}${b.hash}" `),
    tl(
      S == null ||
        S[S.length - 1].route.element !== void 0 ||
        S[S.length - 1].route.Component !== void 0 ||
        S[S.length - 1].route.lazy !== void 0,
      `Matched leaf route at location "${b.pathname}${b.search}${b.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`
    ));
  let O = sv(
    S &&
      S.map((N) =>
        Object.assign({}, N, {
          params: Object.assign({}, m, N.params),
          pathname: el([
            _,
            s.encodeLocation
              ? s.encodeLocation(
                  N.pathname.replace(/%/g, '%25').replace(/\?/g, '%3F').replace(/#/g, '%23')
                ).pathname
              : N.pathname,
          ]),
          pathnameBase:
            N.pathnameBase === '/'
              ? _
              : el([
                  _,
                  s.encodeLocation
                    ? s.encodeLocation(
                        N.pathnameBase
                          .replace(/%/g, '%25')
                          .replace(/\?/g, '%3F')
                          .replace(/#/g, '%23')
                      ).pathname
                    : N.pathnameBase,
                ]),
        })
      ),
    r,
    o
  );
  return i && O
    ? T.createElement(
        wi.Provider,
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
        O
      )
    : O;
}
function nv() {
  let a = dv(),
    i = $0(a) ? `${a.status} ${a.statusText}` : a instanceof Error ? a.message : JSON.stringify(a),
    o = a instanceof Error ? a.stack : null,
    s = 'rgba(200,200,200, 0.5)',
    r = { padding: '0.5rem', backgroundColor: s },
    d = { padding: '2px 4px', backgroundColor: s },
    m = null;
  return (
    console.error('Error handled by React Router default ErrorBoundary:', a),
    (m = T.createElement(
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
      m
    )
  );
}
var av = T.createElement(nv, null),
  Hp = class extends T.Component {
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
        const o = F0(a.digest);
        o && (a = o);
      }
      let i =
        a !== void 0
          ? T.createElement(
              ll.Provider,
              { value: this.props.routeContext },
              T.createElement(br.Provider, { value: a, children: this.props.component })
            )
          : this.props.children;
      return this.context ? T.createElement(iv, { error: a }, i) : i;
    }
  };
Hp.contextType = zp;
var Qo = new WeakMap();
function iv({ children: a, error: i }) {
  let { basename: o } = T.useContext(Bt);
  if (typeof i == 'object' && i && 'digest' in i && typeof i.digest == 'string') {
    let s = W0(i.digest);
    if (s) {
      let r = Qo.get(i);
      if (r) throw r;
      let d = Op(s.location, o);
      if (jp && !Qo.get(i))
        if (d.isExternal || s.reloadDocument) window.location.href = d.absoluteURL || d.to;
        else {
          const m = Promise.resolve().then(() =>
            window.__reactRouterDataRouter.navigate(d.to, { replace: s.replace })
          );
          throw (Qo.set(i, m), m);
        }
      return T.createElement('meta', {
        httpEquiv: 'refresh',
        content: `0;url=${d.absoluteURL || d.to}`,
      });
    }
  }
  return a;
}
function uv({ routeContext: a, match: i, children: o }) {
  let s = T.useContext(ka);
  return (
    s &&
      s.static &&
      s.staticContext &&
      (i.route.errorElement || i.route.ErrorBoundary) &&
      (s.staticContext._deepestRenderedBoundaryId = i.route.id),
    T.createElement(ll.Provider, { value: a }, o)
  );
}
function sv(a, i = [], o) {
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
    let y = r.findIndex((b) => b.route.id && (d == null ? void 0 : d[b.route.id]) !== void 0);
    (Qe(
      y >= 0,
      `Could not find a matching route for errors on route IDs: ${Object.keys(d).join(',')}`
    ),
      (r = r.slice(0, Math.min(r.length, y + 1))));
  }
  let m = !1,
    v = -1;
  if (o && s) {
    m = s.renderFallback;
    for (let y = 0; y < r.length; y++) {
      let b = r[y];
      if (((b.route.HydrateFallback || b.route.hydrateFallbackElement) && (v = y), b.route.id)) {
        let { loaderData: A, errors: j } = s,
          S = b.route.loader && !A.hasOwnProperty(b.route.id) && (!j || j[b.route.id] === void 0);
        if (b.route.lazy || S) {
          (o.isStatic && (m = !0), v >= 0 ? (r = r.slice(0, v + 1)) : (r = [r[0]]));
          break;
        }
      }
    }
  }
  let _ = o == null ? void 0 : o.onError,
    g =
      s && _
        ? (y, b) => {
            var A, j;
            _(y, {
              location: s.location,
              params:
                ((j = (A = s.matches) == null ? void 0 : A[0]) == null ? void 0 : j.params) ?? {},
              unstable_pattern: X0(s.matches),
              errorInfo: b,
            });
          }
        : void 0;
  return r.reduceRight((y, b, A) => {
    let j,
      S = !1,
      O = null,
      M = null;
    s &&
      ((j = d && b.route.id ? d[b.route.id] : void 0),
      (O = b.route.errorElement || av),
      m &&
        (v < 0 && A === 0
          ? (Gp(
              'route-fallback',
              !1,
              'No `HydrateFallback` element provided to render during initial hydration'
            ),
            (S = !0),
            (M = null))
          : v === A && ((S = !0), (M = b.route.hydrateFallbackElement || null))));
    let N = i.concat(r.slice(0, A + 1)),
      k = () => {
        let Y;
        return (
          j
            ? (Y = O)
            : S
              ? (Y = M)
              : b.route.Component
                ? (Y = T.createElement(b.route.Component, null))
                : b.route.element
                  ? (Y = b.route.element)
                  : (Y = y),
          T.createElement(uv, {
            match: b,
            routeContext: { outlet: y, matches: N, isDataRoute: s != null },
            children: Y,
          })
        );
      };
    return s && (b.route.ErrorBoundary || b.route.errorElement || A === 0)
      ? T.createElement(Hp, {
          location: s.location,
          revalidation: s.revalidation,
          component: O,
          error: j,
          children: k(),
          routeContext: { outlet: null, matches: N, isDataRoute: !0 },
          onError: g,
        })
      : k();
  }, null);
}
function Sr(a) {
  return `${a} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function cv(a) {
  let i = T.useContext(ka);
  return (Qe(i, Sr(a)), i);
}
function ov(a) {
  let i = T.useContext(hs);
  return (Qe(i, Sr(a)), i);
}
function rv(a) {
  let i = T.useContext(ll);
  return (Qe(i, Sr(a)), i);
}
function xr(a) {
  let i = rv(a),
    o = i.matches[i.matches.length - 1];
  return (Qe(o.route.id, `${a} can only be used on routes that contain a unique "id"`), o.route.id);
}
function fv() {
  return xr('useRouteId');
}
function dv() {
  var s;
  let a = T.useContext(br),
    i = ov('useRouteError'),
    o = xr('useRouteError');
  return a !== void 0 ? a : (s = i.errors) == null ? void 0 : s[o];
}
function mv() {
  let { router: a } = cv('useNavigate'),
    i = xr('useNavigate'),
    o = T.useRef(!1);
  return (
    Lp(() => {
      o.current = !0;
    }),
    T.useCallback(
      async (r, d = {}) => {
        (tl(o.current, Up),
          o.current &&
            (typeof r == 'number'
              ? await a.navigate(r)
              : await a.navigate(r, { fromRouteId: i, ...d })));
      },
      [a, i]
    )
  );
}
var ap = {};
function Gp(a, i, o) {
  !i && !ap[a] && ((ap[a] = !0), tl(!1, o));
}
T.memo(hv);
function hv({ routes: a, future: i, state: o, isStatic: s, onError: r }) {
  return qp(a, void 0, { state: o, isStatic: s, onError: r });
}
function ol({ to: a, replace: i, state: o, relative: s }) {
  Qe(Aa(), '<Navigate> may be used only in the context of a <Router> component.');
  let { static: r } = T.useContext(Bt);
  tl(
    !r,
    '<Navigate> must not be used on the initial render in a <StaticRouter>. This is a no-op, but you should modify your code so the <Navigate> is only ever rendered in response to some user interaction or state change.'
  );
  let { matches: d } = T.useContext(ll),
    { pathname: m } = rl(),
    v = fl(),
    _ = ms(a, vr(d), m, s === 'path'),
    g = JSON.stringify(_);
  return (
    T.useEffect(() => {
      v(JSON.parse(g), { replace: i, state: o, relative: s });
    }, [v, g, s, i, o]),
    null
  );
}
function Pt(a) {
  Qe(
    !1,
    'A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>.'
  );
}
function pv({
  basename: a = '/',
  children: i = null,
  location: o,
  navigationType: s = 'POP',
  navigator: r,
  static: d = !1,
  unstable_useTransitions: m,
}) {
  Qe(
    !Aa(),
    'You cannot render a <Router> inside another <Router>. You should never have more than one in your app.'
  );
  let v = a.replace(/^\/*/, '/'),
    _ = T.useMemo(
      () => ({ basename: v, navigator: r, static: d, unstable_useTransitions: m, future: {} }),
      [v, r, d, m]
    );
  typeof o == 'string' && (o = Na(o));
  let {
      pathname: g = '/',
      search: y = '',
      hash: b = '',
      state: A = null,
      key: j = 'default',
      unstable_mask: S,
    } = o,
    O = T.useMemo(() => {
      let M = zl(g, v);
      return M == null
        ? null
        : {
            location: { pathname: M, search: y, hash: b, state: A, key: j, unstable_mask: S },
            navigationType: s,
          };
    }, [v, g, y, b, A, j, s, S]);
  return (
    tl(
      O != null,
      `<Router basename="${v}"> is not able to match the URL "${g}${y}${b}" because it does not start with the basename, so the <Router> won't render anything.`
    ),
    O == null
      ? null
      : T.createElement(
          Bt.Provider,
          { value: _ },
          T.createElement(wi.Provider, { children: i, value: O })
        )
  );
}
function yv({ children: a, location: i }) {
  return lv(ur(a), i);
}
function ur(a, i = []) {
  let o = [];
  return (
    T.Children.forEach(a, (s, r) => {
      if (!T.isValidElement(s)) return;
      let d = [...i, r];
      if (s.type === T.Fragment) {
        o.push.apply(o, ur(s.props.children, d));
        return;
      }
      (Qe(
        s.type === Pt,
        `[${typeof s.type == 'string' ? s.type : s.type.name}] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>`
      ),
        Qe(!s.props.index || !s.props.children, 'An index route cannot have child routes.'));
      let m = {
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
      (s.props.children && (m.children = ur(s.props.children, d)), o.push(m));
    }),
    o
  );
}
var ns = 'get',
  as = 'application/x-www-form-urlencoded';
function ps(a) {
  return typeof HTMLElement < 'u' && a instanceof HTMLElement;
}
function gv(a) {
  return ps(a) && a.tagName.toLowerCase() === 'button';
}
function _v(a) {
  return ps(a) && a.tagName.toLowerCase() === 'form';
}
function vv(a) {
  return ps(a) && a.tagName.toLowerCase() === 'input';
}
function bv(a) {
  return !!(a.metaKey || a.altKey || a.ctrlKey || a.shiftKey);
}
function Sv(a, i) {
  return a.button === 0 && (!i || i === '_self') && !bv(a);
}
var Pu = null;
function xv() {
  if (Pu === null)
    try {
      (new FormData(document.createElement('form'), 0), (Pu = !1));
    } catch {
      Pu = !0;
    }
  return Pu;
}
var Ev = new Set(['application/x-www-form-urlencoded', 'multipart/form-data', 'text/plain']);
function Zo(a) {
  return a != null && !Ev.has(a)
    ? (tl(
        !1,
        `"${a}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${as}"`
      ),
      null)
    : a;
}
function Tv(a, i) {
  let o, s, r, d, m;
  if (_v(a)) {
    let v = a.getAttribute('action');
    ((s = v ? zl(v, i) : null),
      (o = a.getAttribute('method') || ns),
      (r = Zo(a.getAttribute('enctype')) || as),
      (d = new FormData(a)));
  } else if (gv(a) || (vv(a) && (a.type === 'submit' || a.type === 'image'))) {
    let v = a.form;
    if (v == null)
      throw new Error('Cannot submit a <button> or <input type="submit"> without a <form>');
    let _ = a.getAttribute('formaction') || v.getAttribute('action');
    if (
      ((s = _ ? zl(_, i) : null),
      (o = a.getAttribute('formmethod') || v.getAttribute('method') || ns),
      (r = Zo(a.getAttribute('formenctype')) || Zo(v.getAttribute('enctype')) || as),
      (d = new FormData(v, a)),
      !xv())
    ) {
      let { name: g, type: y, value: b } = a;
      if (y === 'image') {
        let A = g ? `${g}.` : '';
        (d.append(`${A}x`, '0'), d.append(`${A}y`, '0'));
      } else g && d.append(g, b);
    }
  } else {
    if (ps(a))
      throw new Error(
        'Cannot submit element that is not <form>, <button>, or <input type="submit|image">'
      );
    ((o = ns), (s = null), (r = as), (m = a));
  }
  return (
    d && r === 'text/plain' && ((m = d), (d = void 0)),
    { action: s, method: o.toLowerCase(), encType: r, formData: d, body: m }
  );
}
Object.getOwnPropertyNames(Object.prototype).sort().join('\0');
function Er(a, i) {
  if (a === !1 || a === null || typeof a > 'u') throw new Error(i);
}
function Yp(a, i, o, s) {
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
          ? (r.pathname = `${ss(i)}/_root.${s}`)
          : (r.pathname = `${ss(r.pathname)}.${s}`),
    r
  );
}
async function Nv(a, i) {
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
function kv(a) {
  return a == null
    ? !1
    : a.href == null
      ? a.rel === 'preload' && typeof a.imageSrcSet == 'string' && typeof a.imageSizes == 'string'
      : typeof a.rel == 'string' && typeof a.href == 'string';
}
async function Av(a, i, o) {
  let s = await Promise.all(
    a.map(async (r) => {
      let d = i.routes[r.route.id];
      if (d) {
        let m = await Nv(d, o);
        return m.links ? m.links() : [];
      }
      return [];
    })
  );
  return jv(
    s
      .flat(1)
      .filter(kv)
      .filter((r) => r.rel === 'stylesheet' || r.rel === 'preload')
      .map((r) =>
        r.rel === 'stylesheet' ? { ...r, rel: 'prefetch', as: 'style' } : { ...r, rel: 'prefetch' }
      )
  );
}
function ip(a, i, o, s, r, d) {
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
    ? i.filter((_, g) => m(_, g) || v(_, g))
    : d === 'data'
      ? i.filter((_, g) => {
          var b;
          let y = s.routes[_.route.id];
          if (!y || !y.hasLoader) return !1;
          if (m(_, g) || v(_, g)) return !0;
          if (_.route.shouldRevalidate) {
            let A = _.route.shouldRevalidate({
              currentUrl: new URL(r.pathname + r.search + r.hash, window.origin),
              currentParams: ((b = o[0]) == null ? void 0 : b.params) || {},
              nextUrl: new URL(a, window.origin),
              nextParams: _.params,
              defaultShouldRevalidate: !0,
            });
            if (typeof A == 'boolean') return A;
          }
          return !0;
        })
      : [];
}
function Cv(a, i, { includeHydrateFallback: o } = {}) {
  return Mv(
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
function Mv(a) {
  return [...new Set(a)];
}
function Rv(a) {
  let i = {},
    o = Object.keys(a).sort();
  for (let s of o) i[s] = a[s];
  return i;
}
function jv(a, i) {
  let o = new Set();
  return (
    new Set(i),
    a.reduce((s, r) => {
      let d = JSON.stringify(Rv(r));
      return (o.has(d) || (o.add(d), s.push({ key: d, link: r })), s);
    }, [])
  );
}
function Tr() {
  let a = T.useContext(ka);
  return (Er(a, 'You must render this element inside a <DataRouterContext.Provider> element'), a);
}
function Ov() {
  let a = T.useContext(hs);
  return (
    Er(a, 'You must render this element inside a <DataRouterStateContext.Provider> element'),
    a
  );
}
var Nr = T.createContext(void 0);
Nr.displayName = 'FrameworkContext';
function kr() {
  let a = T.useContext(Nr);
  return (Er(a, 'You must render this element inside a <HydratedRouter> element'), a);
}
function wv(a, i) {
  let o = T.useContext(Nr),
    [s, r] = T.useState(!1),
    [d, m] = T.useState(!1),
    { onFocus: v, onBlur: _, onMouseEnter: g, onMouseLeave: y, onTouchStart: b } = i,
    A = T.useRef(null);
  (T.useEffect(() => {
    if ((a === 'render' && m(!0), a === 'viewport')) {
      let O = (N) => {
          N.forEach((k) => {
            m(k.isIntersecting);
          });
        },
        M = new IntersectionObserver(O, { threshold: 0.5 });
      return (
        A.current && M.observe(A.current),
        () => {
          M.disconnect();
        }
      );
    }
  }, [a]),
    T.useEffect(() => {
      if (s) {
        let O = setTimeout(() => {
          m(!0);
        }, 100);
        return () => {
          clearTimeout(O);
        };
      }
    }, [s]));
  let j = () => {
      r(!0);
    },
    S = () => {
      (r(!1), m(!1));
    };
  return o
    ? a !== 'intent'
      ? [d, A, {}]
      : [
          d,
          A,
          {
            onFocus: Ti(v, j),
            onBlur: Ti(_, S),
            onMouseEnter: Ti(g, j),
            onMouseLeave: Ti(y, S),
            onTouchStart: Ti(b, j),
          },
        ]
    : [!1, A, {}];
}
function Ti(a, i) {
  return (o) => {
    (a && a(o), o.defaultPrevented || i(o));
  };
}
function zv({ page: a, ...i }) {
  let o = Q0(),
    { router: s } = Tr(),
    r = T.useMemo(() => Ap(s.routes, a, s.basename), [s.routes, a, s.basename]);
  return r
    ? o
      ? T.createElement(Bv, { page: a, matches: r, ...i })
      : T.createElement(Uv, { page: a, matches: r, ...i })
    : null;
}
function Dv(a) {
  let { manifest: i, routeModules: o } = kr(),
    [s, r] = T.useState([]);
  return (
    T.useEffect(() => {
      let d = !1;
      return (
        Av(a, i, o).then((m) => {
          d || r(m);
        }),
        () => {
          d = !0;
        }
      );
    }, [a, i, o]),
    s
  );
}
function Bv({ page: a, matches: i, ...o }) {
  let s = rl(),
    { future: r } = kr(),
    { basename: d } = Tr(),
    m = T.useMemo(() => {
      if (a === s.pathname + s.search + s.hash) return [];
      let v = Yp(a, d, r.unstable_trailingSlashAwareDataRequests, 'rsc'),
        _ = !1,
        g = [];
      for (let y of i)
        typeof y.route.shouldRevalidate == 'function' ? (_ = !0) : g.push(y.route.id);
      return (
        _ && g.length > 0 && v.searchParams.set('_routes', g.join(',')),
        [v.pathname + v.search]
      );
    }, [d, r.unstable_trailingSlashAwareDataRequests, a, s, i]);
  return T.createElement(
    T.Fragment,
    null,
    m.map((v) => T.createElement('link', { key: v, rel: 'prefetch', as: 'fetch', href: v, ...o }))
  );
}
function Uv({ page: a, matches: i, ...o }) {
  let s = rl(),
    { future: r, manifest: d, routeModules: m } = kr(),
    { basename: v } = Tr(),
    { loaderData: _, matches: g } = Ov(),
    y = T.useMemo(() => ip(a, i, g, d, s, 'data'), [a, i, g, d, s]),
    b = T.useMemo(() => ip(a, i, g, d, s, 'assets'), [a, i, g, d, s]),
    A = T.useMemo(() => {
      if (a === s.pathname + s.search + s.hash) return [];
      let O = new Set(),
        M = !1;
      if (
        (i.forEach((k) => {
          var V;
          let Y = d.routes[k.route.id];
          !Y ||
            !Y.hasLoader ||
            ((!y.some((Z) => Z.route.id === k.route.id) &&
              k.route.id in _ &&
              (V = m[k.route.id]) != null &&
              V.shouldRevalidate) ||
            Y.hasClientLoader
              ? (M = !0)
              : O.add(k.route.id));
        }),
        O.size === 0)
      )
        return [];
      let N = Yp(a, v, r.unstable_trailingSlashAwareDataRequests, 'data');
      return (
        M &&
          O.size > 0 &&
          N.searchParams.set(
            '_routes',
            i
              .filter((k) => O.has(k.route.id))
              .map((k) => k.route.id)
              .join(',')
          ),
        [N.pathname + N.search]
      );
    }, [v, r.unstable_trailingSlashAwareDataRequests, _, s, d, y, i, a, m]),
    j = T.useMemo(() => Cv(b, d), [b, d]),
    S = Dv(b);
  return T.createElement(
    T.Fragment,
    null,
    A.map((O) => T.createElement('link', { key: O, rel: 'prefetch', as: 'fetch', href: O, ...o })),
    j.map((O) => T.createElement('link', { key: O, rel: 'modulepreload', href: O, ...o })),
    S.map(({ key: O, link: M }) =>
      T.createElement('link', {
        key: O,
        nonce: o.nonce,
        ...M,
        crossOrigin: M.crossOrigin ?? o.crossOrigin,
      })
    )
  );
}
function Lv(...a) {
  return (i) => {
    a.forEach((o) => {
      typeof o == 'function' ? o(i) : o != null && (o.current = i);
    });
  };
}
var qv =
  typeof window < 'u' && typeof window.document < 'u' && typeof window.document.createElement < 'u';
try {
  qv && (window.__reactRouterVersion = '7.14.2');
} catch {}
function Hv({ basename: a, children: i, unstable_useTransitions: o, window: s }) {
  let r = T.useRef();
  r.current == null && (r.current = v0({ window: s, v5Compat: !0 }));
  let d = r.current,
    [m, v] = T.useState({ action: d.action, location: d.location }),
    _ = T.useCallback(
      (g) => {
        o === !1 ? v(g) : T.startTransition(() => v(g));
      },
      [o]
    );
  return (
    T.useLayoutEffect(() => d.listen(_), [d, _]),
    T.createElement(pv, {
      basename: a,
      children: i,
      location: m.location,
      navigationType: m.action,
      navigator: d,
      unstable_useTransitions: o,
    })
  );
}
var $p = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,
  Xp = T.forwardRef(function (
    {
      onClick: i,
      discover: o = 'render',
      prefetch: s = 'none',
      relative: r,
      reloadDocument: d,
      replace: m,
      unstable_mask: v,
      state: _,
      target: g,
      to: y,
      preventScrollReset: b,
      viewTransition: A,
      unstable_defaultShouldRevalidate: j,
      ...S
    },
    O
  ) {
    let { basename: M, navigator: N, unstable_useTransitions: k } = T.useContext(Bt),
      Y = typeof y == 'string' && $p.test(y),
      V = Op(y, M);
    y = V.to;
    let Z = P0(y, { relative: r }),
      I = rl(),
      Q = null;
    if (v) {
      let he = ms(v, [], I.unstable_mask ? I.unstable_mask.pathname : '/', !0);
      (M !== '/' && (he.pathname = he.pathname === '/' ? M : el([M, he.pathname])),
        (Q = N.createHref(he)));
    }
    let [L, K, ae] = wv(s, S),
      ue = Xv(y, {
        replace: m,
        unstable_mask: v,
        state: _,
        target: g,
        preventScrollReset: b,
        relative: r,
        viewTransition: A,
        unstable_defaultShouldRevalidate: j,
        unstable_useTransitions: k,
      });
    function ce(he) {
      (i && i(he), he.defaultPrevented || ue(he));
    }
    let W = !(V.isExternal || d),
      F = T.createElement('a', {
        ...S,
        ...ae,
        href: (W ? Q : void 0) || V.absoluteURL || Z,
        onClick: W ? ce : i,
        ref: Lv(O, K),
        target: g,
        'data-discover': !Y && o === 'render' ? 'true' : void 0,
      });
    return L && !Y ? T.createElement(T.Fragment, null, F, T.createElement(zv, { page: Z })) : F;
  });
Xp.displayName = 'Link';
var Gv = T.forwardRef(function (
  {
    'aria-current': i = 'page',
    caseSensitive: o = !1,
    className: s = '',
    end: r = !1,
    style: d,
    to: m,
    viewTransition: v,
    children: _,
    ...g
  },
  y
) {
  let b = zi(m, { relative: g.relative }),
    A = rl(),
    j = T.useContext(hs),
    { navigator: S, basename: O } = T.useContext(Bt),
    M = j != null && Iv(b) && v === !0,
    N = S.encodeLocation ? S.encodeLocation(b).pathname : b.pathname,
    k = A.pathname,
    Y = j && j.navigation && j.navigation.location ? j.navigation.location.pathname : null;
  (o || ((k = k.toLowerCase()), (Y = Y ? Y.toLowerCase() : null), (N = N.toLowerCase())),
    Y && O && (Y = zl(Y, O) || Y));
  const V = N !== '/' && N.endsWith('/') ? N.length - 1 : N.length;
  let Z = k === N || (!r && k.startsWith(N) && k.charAt(V) === '/'),
    I = Y != null && (Y === N || (!r && Y.startsWith(N) && Y.charAt(N.length) === '/')),
    Q = { isActive: Z, isPending: I, isTransitioning: M },
    L = Z ? i : void 0,
    K;
  typeof s == 'function'
    ? (K = s(Q))
    : (K = [s, Z ? 'active' : null, I ? 'pending' : null, M ? 'transitioning' : null]
        .filter(Boolean)
        .join(' '));
  let ae = typeof d == 'function' ? d(Q) : d;
  return T.createElement(
    Xp,
    { ...g, 'aria-current': L, className: K, ref: y, style: ae, to: m, viewTransition: v },
    typeof _ == 'function' ? _(Q) : _
  );
});
Gv.displayName = 'NavLink';
var Yv = T.forwardRef(
  (
    {
      discover: a = 'render',
      fetcherKey: i,
      navigate: o,
      reloadDocument: s,
      replace: r,
      state: d,
      method: m = ns,
      action: v,
      onSubmit: _,
      relative: g,
      preventScrollReset: y,
      viewTransition: b,
      unstable_defaultShouldRevalidate: A,
      ...j
    },
    S
  ) => {
    let { unstable_useTransitions: O } = T.useContext(Bt),
      M = Zv(),
      N = Kv(v, { relative: g }),
      k = m.toLowerCase() === 'get' ? 'get' : 'post',
      Y = typeof v == 'string' && $p.test(v),
      V = (Z) => {
        if ((_ && _(Z), Z.defaultPrevented)) return;
        Z.preventDefault();
        let I = Z.nativeEvent.submitter,
          Q = (I == null ? void 0 : I.getAttribute('formmethod')) || m,
          L = () =>
            M(I || Z.currentTarget, {
              fetcherKey: i,
              method: Q,
              navigate: o,
              replace: r,
              state: d,
              relative: g,
              preventScrollReset: y,
              viewTransition: b,
              unstable_defaultShouldRevalidate: A,
            });
        O && o !== !1 ? T.startTransition(() => L()) : L();
      };
    return T.createElement('form', {
      ref: S,
      method: k,
      action: N,
      onSubmit: s ? _ : V,
      ...j,
      'data-discover': !Y && a === 'render' ? 'true' : void 0,
    });
  }
);
Yv.displayName = 'Form';
function $v(a) {
  return `${a} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function Vp(a) {
  let i = T.useContext(ka);
  return (Qe(i, $v(a)), i);
}
function Xv(
  a,
  {
    target: i,
    replace: o,
    unstable_mask: s,
    state: r,
    preventScrollReset: d,
    relative: m,
    viewTransition: v,
    unstable_defaultShouldRevalidate: _,
    unstable_useTransitions: g,
  } = {}
) {
  let y = fl(),
    b = rl(),
    A = zi(a, { relative: m });
  return T.useCallback(
    (j) => {
      if (Sv(j, i)) {
        j.preventDefault();
        let S = o !== void 0 ? o : Ri(b) === Ri(A),
          O = () =>
            y(a, {
              replace: S,
              unstable_mask: s,
              state: r,
              preventScrollReset: d,
              relative: m,
              viewTransition: v,
              unstable_defaultShouldRevalidate: _,
            });
        g ? T.startTransition(() => O()) : O();
      }
    },
    [b, y, A, o, s, r, i, a, d, m, v, _, g]
  );
}
var Vv = 0,
  Qv = () => `__${String(++Vv)}__`;
function Zv() {
  let { router: a } = Vp('useSubmit'),
    { basename: i } = T.useContext(Bt),
    o = fv(),
    s = a.fetch,
    r = a.navigate;
  return T.useCallback(
    async (d, m = {}) => {
      let { action: v, method: _, encType: g, formData: y, body: b } = Tv(d, i);
      if (m.navigate === !1) {
        let A = m.fetcherKey || Qv();
        await s(A, o, m.action || v, {
          unstable_defaultShouldRevalidate: m.unstable_defaultShouldRevalidate,
          preventScrollReset: m.preventScrollReset,
          formData: y,
          body: b,
          formMethod: m.method || _,
          formEncType: m.encType || g,
          flushSync: m.flushSync,
        });
      } else
        await r(m.action || v, {
          unstable_defaultShouldRevalidate: m.unstable_defaultShouldRevalidate,
          preventScrollReset: m.preventScrollReset,
          formData: y,
          body: b,
          formMethod: m.method || _,
          formEncType: m.encType || g,
          replace: m.replace,
          state: m.state,
          fromRouteId: o,
          flushSync: m.flushSync,
          viewTransition: m.viewTransition,
        });
    },
    [s, r, i, o]
  );
}
function Kv(a, { relative: i } = {}) {
  let { basename: o } = T.useContext(Bt),
    s = T.useContext(ll);
  Qe(s, 'useFormAction must be used inside a RouteContext');
  let [r] = s.matches.slice(-1),
    d = { ...zi(a || '.', { relative: i }) },
    m = rl();
  if (a == null) {
    d.search = m.search;
    let v = new URLSearchParams(d.search),
      _ = v.getAll('index');
    if (_.some((y) => y === '')) {
      (v.delete('index'), _.filter((b) => b).forEach((b) => v.append('index', b)));
      let y = v.toString();
      d.search = y ? `?${y}` : '';
    }
  }
  return (
    (!a || a === '.') &&
      r.route.index &&
      (d.search = d.search ? d.search.replace(/^\?/, '?index&') : '?index'),
    o !== '/' && (d.pathname = d.pathname === '/' ? o : el([o, d.pathname])),
    Ri(d)
  );
}
function Iv(a, { relative: i } = {}) {
  let o = T.useContext(Dp);
  Qe(
    o != null,
    "`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?"
  );
  let { basename: s } = Vp('useViewTransitionState'),
    r = zi(a, { relative: i });
  if (!o.isTransitioning) return !1;
  let d = zl(o.currentLocation.pathname, s) || o.currentLocation.pathname,
    m = zl(o.nextLocation.pathname, s) || o.nextLocation.pathname;
  return us(r.pathname, m) != null || us(r.pathname, d) != null;
}
const Jv = '_layout_mn6ug_1',
  Wv = '_enemies_mn6ug_12',
  Fv = '_enemy_mn6ug_20',
  Pv = '_targeted_mn6ug_35',
  e1 = '_enemyName_mn6ug_39',
  t1 = '_down_mn6ug_44',
  l1 = '_log_mn6ug_48',
  n1 = '_logLine_mn6ug_60',
  a1 = '_party_mn6ug_64',
  i1 = '_rowTag_mn6ug_71',
  u1 = '_cardRow_mn6ug_77',
  s1 = '_card_mn6ug_77',
  c1 = '_cardActive_mn6ug_99',
  o1 = '_cardDecided_mn6ug_104',
  r1 = '_cardName_mn6ug_108',
  f1 = '_uni_mn6ug_116',
  d1 = '_summons_mn6ug_120',
  m1 = '_summon_mn6ug_120',
  h1 = '_summonName_mn6ug_138',
  p1 = '_summonHp_mn6ug_147',
  y1 = '_cardNums_mn6ug_153',
  g1 = '_cardCmd_mn6ug_159',
  _1 = '_empty_mn6ug_165',
  v1 = '_command_mn6ug_170',
  b1 = '_skillList_mn6ug_176',
  S1 = '_skillBtn_mn6ug_182',
  x1 = '_skillTop_mn6ug_194',
  E1 = '_skillName_mn6ug_201',
  T1 = '_skillDesc_mn6ug_206',
  N1 = '_target_mn6ug_35',
  k1 = '_unionBanner_mn6ug_217',
  A1 = '_unionCancel_mn6ug_231',
  C1 = '_unionHint_mn6ug_240',
  M1 = '_unionBtn_mn6ug_246',
  R1 = '_cmdHead_mn6ug_252',
  j1 = '_menu_mn6ug_257',
  O1 = '_menuBtn_mn6ug_263',
  w1 = '_tp_mn6ug_280',
  z1 = '_menuBack_mn6ug_286',
  D1 = '_execRow_mn6ug_296',
  B1 = '_redo_mn6ug_301',
  U1 = '_primary_mn6ug_311',
  L1 = '_result_mn6ug_326',
  q1 = '_resultTitle_mn6ug_337',
  H1 = '_resultBody_mn6ug_342',
  ee = {
    layout: Jv,
    enemies: Wv,
    enemy: Fv,
    targeted: Pv,
    enemyName: e1,
    down: t1,
    log: l1,
    logLine: n1,
    party: a1,
    rowTag: i1,
    cardRow: u1,
    card: s1,
    cardActive: c1,
    cardDecided: o1,
    cardName: r1,
    uni: f1,
    summons: d1,
    summon: m1,
    summonName: h1,
    summonHp: p1,
    cardNums: y1,
    cardCmd: g1,
    empty: _1,
    command: v1,
    skillList: b1,
    skillBtn: S1,
    skillTop: x1,
    skillName: E1,
    skillDesc: T1,
    target: N1,
    unionBanner: k1,
    unionCancel: A1,
    unionHint: C1,
    unionBtn: M1,
    cmdHead: R1,
    menu: j1,
    menuBtn: O1,
    tp: w1,
    menuBack: z1,
    execRow: D1,
    redo: B1,
    primary: U1,
    result: L1,
    resultTitle: q1,
    resultBody: H1,
  },
  G1 = '_row_1t6j7_1',
  Y1 = '_label_1t6j7_8',
  $1 = '_track_1t6j7_16',
  X1 = '_fill_1t6j7_24',
  V1 = '_value_1t6j7_30',
  Ni = { row: G1, label: Y1, track: $1, fill: X1, value: V1 },
  es = ({ value: a, max: i, color: o = '#4caf50', label: s, showValue: r = !0 }) => {
    const d = i > 0 ? Math.max(0, Math.min(100, (a / i) * 100)) : 0;
    return h.jsxs('div', {
      className: Ni.row,
      children: [
        s ? h.jsx('span', { className: Ni.label, children: s }) : null,
        h.jsx('div', {
          className: Ni.track,
          children: h.jsx('div', {
            className: Ni.fill,
            style: { width: `${d}%`, backgroundColor: o },
          }),
        }),
        r
          ? h.jsxs('span', {
              className: Ni.value,
              children: [Math.max(0, Math.round(a)), '/', Math.round(i)],
            })
          : null,
      ],
    });
  },
  rn = {
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
  nt = {
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
function Q1(a) {
  return a.category === 'food' ? 0 : a.category === 'material' ? 8 : Math.floor(a.buyPrice / 2);
}
function Z1(a) {
  var i;
  return ((i = nt[a]) == null ? void 0 : i.category) === 'food';
}
const It = {
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
  K1 = 500,
  sr = 30,
  ys = 3,
  gs = 2,
  I1 = ys + gs,
  Ai = { TITLE_DEPTH: 20, REBIRTH_MIN_LEVEL: 30 },
  Qp = 5,
  J1 = 5,
  cl = {
    MAX_LEVEL: 5,
    STAT_PER_LEVEL: 2,
    INGOT_INC: { copper: 1, silver: 3, gold: 5 },
    FRAGMENTS_PER_INGOT: 10,
    RECYCLE_FRAGMENTS: 3,
  },
  Ci = (a) => a > 0 && a % Be.BOSS_INTERVAL === 0,
  up = (a) => Math.round(Be.EXP_CURVE_BASE * Math.pow(a, Be.EXP_CURVE_POW)),
  Ko = (a) => a < Be.LEVEL_CAP,
  Cr = (a, i) => 1 + Be.ENEMY_SCALE_K * (a - i),
  wn = {
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
  mt = {
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
  W1 = ['hp', 'tp', 'str', 'vit', 'agi', 'int', 'mnd', 'luc'],
  F1 = ['slash', 'pierce', 'bash'],
  cs = (a, i, o) => Math.max(i, Math.min(o, a));
function Zp(a, i) {
  const o = {};
  for (const s of W1) o[s] = Math.round(a[s] * i);
  return o;
}
function P1(a, i) {
  return Zp(a.baseStats, Cr(i, a.refDepth));
}
function _a(a, i) {
  const o = new Map();
  for (const r of a) {
    if (r.stat !== i) continue;
    const d = cs(r.modifier, 0.5, 1.5),
      m = o.get(r.stackGroup);
    (m === void 0 || Math.abs(d - 1) > Math.abs(m - 1)) && o.set(r.stackGroup, d);
  }
  let s = 1;
  for (const r of o.values()) s *= r;
  return cs(s, 0.25, 2);
}
function sp(a, i, o) {
  const s = (a.str * 2 + (i.atk ?? 0)) * _a(o, 'patk'),
    r = (a.vit * 2 + (i.def ?? 0)) * _a(o, 'pdef'),
    d = (a.int * 2 + (i.mat ?? 0)) * _a(o, 'matk'),
    m = (a.mnd * 2 + (i.mdf ?? 0)) * _a(o, 'mdef');
  return {
    patk: s,
    pdef: r,
    matk: d,
    mdef: m,
    hit: a.agi,
    acc: a.agi * _a(o, 'acc'),
    eva: a.agi * _a(o, 'eva'),
    crit: a.luc,
  };
}
const eb = (a) => a.ailments.some((i) => i.type === 'blind'),
  tb = (a) => a.ailments.some((i) => i.type === 'legBind');
function Kp(a, i, o, s) {
  const r = o.statBase === 'str',
    d = sp(a.stats, a.equip, a.buffs),
    m = sp(i.stats, i.equip, i.buffs),
    v = r ? d.patk : d.matk,
    _ = r ? m.pdef : m.mdef;
  let g = !0;
  if (r) {
    const Q = eb(a) ? Be.BLIND_ACC_PENALTY : 0,
      L = tb(i) ? 0 : m.eva,
      K = cs(Be.BASE_HIT + (d.acc - L) * Be.HIT_AGI_K - Q, Be.HIT_MIN, 1);
    g = s.next() < K;
  }
  if (!g) return { damage: 0, hit: !1, critical: !1 };
  const b = (v * o.power * Be.DAMAGE_DEF_K) / (Be.DAMAGE_DEF_K + Math.max(0, _)),
    A = r && F1.includes(o.element),
    j = A && a.row === 'back' ? Be.BACK_ROW_MELEE_MULT : 1,
    S = A && i.row === 'back' ? Be.BACK_ROW_MELEE_MULT : 1,
    O = j * S,
    [M, N] = Be.DMG_VARIANCE,
    k = M + s.next() * (N - M);
  let Y = b * o.elementMultiplier * O * k;
  const V = cs(
      Be.CRIT_BASE + (a.stats.luc - i.stats.luc) * Be.CRIT_LUC_K,
      Be.CRIT_MIN,
      Be.CRIT_MAX
    ),
    Z = s.next() < V;
  return (
    Z && (Y *= Be.CRIT_MULT),
    { damage: o.elementMultiplier === 0 ? 0 : Math.max(1, Math.floor(Y)), hit: !0, critical: Z }
  );
}
function lb(a, i) {
  const o = mt[a];
  if (!o || i <= 0) return {};
  const s = i * cl.STAT_PER_LEVEL;
  return o.slot === 'weapon' ? { atk: s, mat: s } : o.slot === 'armor' ? { def: s, mdf: s } : {};
}
const Ip = ['weapon', 'armor', 'accessory'];
function nb(a, i, o) {
  const s = a.guild.equipment.map((d) => (d.id === i ? o(d) : d)),
    r = a.guild.members.map((d) => {
      let m = !1;
      const v = { ...d.equipment };
      for (const _ of Ip) {
        const g = v[_];
        g && g.id === i && ((v[_] = o(g)), (m = !0));
      }
      return m ? { ...d, equipment: v } : d;
    });
  return { ...a, guild: { ...a.guild, equipment: s, members: r } };
}
function ab(a, i, o) {
  let s = a.guild.equipment.find((m) => m.id === i);
  if (!s)
    for (const m of a.guild.members)
      for (const v of Ip) {
        const _ = m.equipment[v];
        (_ == null ? void 0 : _.id) === i && (s = _);
      }
  if (!s) return { ok: !1, save: a, reason: 'notFound' };
  if (s.forgeLevel >= cl.MAX_LEVEL) return { ok: !1, save: a, reason: 'maxLevel' };
  if ((a.forgeInventory.ingots[o] ?? 0) <= 0) return { ok: !1, save: a, reason: 'noIngot' };
  const r = Math.min(cl.MAX_LEVEL, s.forgeLevel + cl.INGOT_INC[o]);
  let d = {
    ...a,
    forgeInventory: {
      ...a.forgeInventory,
      ingots: { ...a.forgeInventory.ingots, [o]: a.forgeInventory.ingots[o] - 1 },
    },
  };
  return ((d = nb(d, i, (m) => ({ ...m, forgeLevel: r }))), { ok: !0, save: d });
}
function ib(a, i) {
  if (!a.guild.equipment.find((m) => m.id === i)) return { ok: !1, save: a, reason: 'notFound' };
  const s = a.guild.equipment.filter((m) => m.id !== i),
    r = { ...a.forgeInventory.fragments };
  r.common = (r.common ?? 0) + cl.RECYCLE_FRAGMENTS;
  let d = a.forgeInventory.ingots.copper;
  for (; r.common >= cl.FRAGMENTS_PER_INGOT; ) ((r.common -= cl.FRAGMENTS_PER_INGOT), (d += 1));
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
function os(a) {
  var o;
  const i = ((o = mt[a.masterId]) == null ? void 0 : o.name) ?? a.masterId;
  return a.forgeLevel > 0 ? `${i} +${a.forgeLevel}` : i;
}
const yt = {
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
function Jp(a, i) {
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
  const s = a.guild.storage.findIndex((m) => m.itemId === i);
  if (s < 0 || a.guild.storage[s].qty < o) return a;
  const r = [...a.guild.storage],
    d = r[s].qty - o;
  return (
    d <= 0 ? r.splice(s, 1) : (r[s] = { ...r[s], qty: d }),
    { ...a, guild: { ...a.guild, storage: r } }
  );
}
const Wp = 60,
  _s = (a) => a.guild.foodStorage ?? [];
function Fp(a) {
  return _s(a).reduce((i, o) => i + o.qty, 0);
}
function jr(a, i) {
  var o;
  return ((o = _s(a).find((s) => s.itemId === i)) == null ? void 0 : o.qty) ?? 0;
}
function Pp(a, i, o = 1) {
  if (o <= 0) return a;
  const s = Wp - Fp(a),
    r = Math.min(o, Math.max(0, s));
  if (r <= 0) return a;
  const d = [..._s(a)],
    m = d.findIndex((v) => v.itemId === i);
  return (
    m >= 0 ? (d[m] = { ...d[m], qty: d[m].qty + r }) : d.push({ itemId: i, qty: r }),
    { ...a, guild: { ...a.guild, foodStorage: d } }
  );
}
function ey(a, i, o = 1) {
  if (o <= 0) return a;
  const s = [..._s(a)],
    r = s.findIndex((m) => m.itemId === i);
  if (r < 0 || s[r].qty < o) return a;
  const d = s[r].qty - o;
  return (
    d <= 0 ? s.splice(r, 1) : (s[r] = { ...s[r], qty: d }),
    { ...a, guild: { ...a.guild, foodStorage: s } }
  );
}
function ty(a, i, o) {
  return {
    ...a,
    guild: { ...a.guild, members: a.guild.members.map((s) => (s.id === i ? o(s) : s)) },
  };
}
function ub() {
  return `eq_${Date.now().toString(36)}_${Math.floor(Math.random() * 16777215).toString(36)}`;
}
function sb(a, i, o = 0) {
  if (!mt[i]) return a;
  const s = { id: ub(), masterId: i, forgeLevel: o };
  return { ...a, guild: { ...a.guild, equipment: [...a.guild.equipment, s] } };
}
function Or(a, i) {
  const o = mt[i];
  if (!o) return !1;
  const s = yt[a.classId];
  return s
    ? o.slot === 'weapon'
      ? !!o.weaponType && s.equipableWeaponTypes.includes(o.weaponType)
      : o.slot === 'armor'
        ? !!o.armorType && s.equipableArmorTypes.includes(o.armorType)
        : !0
    : !1;
}
function cb(a, i, o) {
  const s = a.guild.equipment.find((g) => g.id === o),
    r = a.guild.members.find((g) => g.id === i);
  if (!s || !r || !Or(r, s.masterId)) return a;
  const d = mt[s.masterId];
  let m = a.guild.equipment.filter((g) => g.id !== o);
  const v = r.equipment[d.slot];
  v && (m = [...m, v]);
  const _ = { ...a, guild: { ...a.guild, equipment: m } };
  return ty(_, i, (g) => ({ ...g, equipment: { ...g.equipment, [d.slot]: s } }));
}
function wr(a, i, o) {
  const s = a.guild.members.find((m) => m.id === i);
  if (!s) return a;
  const r = s.equipment[o];
  if (!r) return a;
  const d = { ...a, guild: { ...a.guild, equipment: [...a.guild.equipment, r] } };
  return ty(d, i, (m) => ({ ...m, equipment: { ...m.equipment, [o]: null } }));
}
const sn = (a) => ({ hp: 0, tp: 0, str: 0, vit: 0, agi: 0, int: 0, mnd: 0, luc: 0, ...a }),
  Ea = {
    title_berserker: {
      id: 'title_berserker',
      name: '狂戦士',
      parentClassId: 'class_warrior',
      skillTree: { skills: [] },
      growthModifier: sn({ str: 1 }),
    },
    title_sentinel: {
      id: 'title_sentinel',
      name: '哨戒兵',
      parentClassId: 'class_warrior',
      skillTree: { skills: [] },
      growthModifier: sn({ vit: 1 }),
    },
    title_bulwark: {
      id: 'title_bulwark',
      name: '城壁',
      parentClassId: 'class_guardian',
      skillTree: { skills: [] },
      growthModifier: sn({ vit: 1, hp: 2 }),
    },
    title_vanguard: {
      id: 'title_vanguard',
      name: '先鋒',
      parentClassId: 'class_guardian',
      skillTree: { skills: [] },
      growthModifier: sn({ str: 1 }),
    },
    title_pyromancer: {
      id: 'title_pyromancer',
      name: '紅蓮術士',
      parentClassId: 'class_mage',
      skillTree: { skills: [] },
      growthModifier: sn({ int: 1 }),
    },
    title_sage: {
      id: 'title_sage',
      name: '賢者',
      parentClassId: 'class_mage',
      skillTree: { skills: [] },
      growthModifier: sn({ tp: 2, mnd: 1 }),
    },
    title_sniper: {
      id: 'title_sniper',
      name: '狙撃手',
      parentClassId: 'class_ranger',
      skillTree: { skills: [] },
      growthModifier: sn({ agi: 1, luc: 1 }),
    },
    title_tracker: {
      id: 'title_tracker',
      name: '追跡者',
      parentClassId: 'class_ranger',
      skillTree: { skills: [] },
      growthModifier: sn({ agi: 1 }),
    },
  },
  ob = ['hp', 'tp', 'str', 'vit', 'agi', 'int', 'mnd', 'luc'];
function Di(a) {
  var v, _;
  const i = It[a.raceId];
  if (!i) throw new Error(`computeBaseStats: 未定義の種族 "${a.raceId}"`);
  const s = Math.max(1, Math.min(a.level, Be.LEVEL_CAP)) - 1,
    r = a.titleId ? ((v = Ea[a.titleId]) == null ? void 0 : v.growthModifier) : void 0,
    d = ((_ = a.rebirthBonus) == null ? void 0 : _.allStats) ?? 0,
    m = {};
  for (const g of ob) {
    const y = i.statGrowth[g] + ((r == null ? void 0 : r[g]) ?? 0);
    m[g] = i.baseStatsAtLv1[g] + y * s + d;
  }
  return m;
}
const rb = 3,
  wl = (a, i, o) => Math.max(i, Math.min(o, a)),
  fb = {
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
function db(a) {
  const i = { atk: 0, mat: 0, def: 0, mdf: 0 };
  for (const o of Object.values(a.equipment)) {
    if (!o) continue;
    const s = mt[o.masterId];
    if (!s) continue;
    const r = lb(o.masterId, o.forgeLevel);
    ((i.atk += (s.bonuses.atk ?? 0) + (r.atk ?? 0)),
      (i.mat += (s.bonuses.mat ?? 0) + (r.mat ?? 0)),
      (i.def += (s.bonuses.def ?? 0) + (r.def ?? 0)),
      (i.mdf += (s.bonuses.mdf ?? 0) + (r.mdf ?? 0)));
  }
  return i;
}
function mb(a, i) {
  var m;
  const o = a.guild.members.find((v) => v.id === i);
  if (!o) return null;
  const s = (m = a.diveState) == null ? void 0 : m.party.find((v) => v.charId === i),
    r = Di(o),
    d = a.guild.party.front.includes(i);
  return {
    id: i,
    name: o.name,
    side: 'ally',
    row: d ? 'front' : 'back',
    stats: r,
    equip: db(o),
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
function hb(a, i, o) {
  const s = wn[a],
    r = P1(s, o);
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
function ly(a, i, o, s, r) {
  const d = Ca[a],
    m = Zp(d.baseStats, Cr(i, d.refDepth)),
    v = r ?? m.hp;
  return {
    id: s,
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
function cp(a, i, o = 'none') {
  var _, g;
  const s = ((_ = a.diveState) == null ? void 0 : _.depth) ?? 1,
    d = [...a.guild.party.front, ...a.guild.party.back]
      .filter((y) => y !== null)
      .map((y) => mb(a, y))
      .filter((y) => y !== null),
    m = i.map((y, b) => hb(y, b, s)),
    v = (((g = a.diveState) == null ? void 0 : g.persistentSummons) ?? [])
      .map((y, b) => ly(y.summonKind, s, y.ownerId, `summon_persist_${b}`, y.hp))
      .filter((y) => !y.isDown);
  return {
    turn: 1,
    depth: s,
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
const pt = (a, i) => (i === 'ally' ? a.allies : a.enemies).filter((o) => !o.isDown),
  zr = (a) => a.summons.filter((i) => !i.isDown);
function Ol(a, i) {
  return (
    a.allies.find((o) => o.id === i) ??
    a.enemies.find((o) => o.id === i) ??
    a.summons.find((o) => o.id === i)
  );
}
const ny = (a) => {
    var i;
    return (
      !!a.isSummon && !!a.summonKind && ((i = Ca[a.summonKind]) == null ? void 0 : i.buffImmune)
    );
  },
  ay = (a, i) => {
    var o;
    return ((o = a.resist) == null ? void 0 : o[i]) ?? 1;
  };
function Dr(a, i, o) {
  ((a.hp = wl(a.hp - i, 0, a.maxHp)),
    a.hp === 0 &&
      !a.isDown &&
      ((a.isDown = !0),
      (a.unionGauge = Math.floor(a.unionGauge / 2)),
      o.push({ text: `${a.name} は倒れた！` })));
}
function rs(a, i) {
  a.isDown || (a.unionGauge = wl(a.unionGauge + i, 0, 100));
}
function cr(a, i) {
  ny(a) ||
    ((a.buffs = a.buffs.filter((o) => !(o.stat === i.stat && o.stackGroup === i.stackGroup))),
    a.buffs.push(i));
}
function pb(a, i) {
  if (ny(a)) return;
  const o = a.ailments.find((s) => s.type === i.type);
  if (o) {
    o.remainingTurns = Math.max(o.remainingTurns, i.remainingTurns);
    return;
  }
  a.ailments.push(i);
}
function yb(a, i, o) {
  return wl(a * (1 + (i.stats.luc - o.stats.luc) * Be.AILMENT_LUC_K), 0, Be.AILMENT_MAX);
}
function iy(a, i, o, s) {
  const r = i.side === 'ally' ? 'enemy' : 'ally';
  switch (o) {
    case 'self':
      return [i];
    case 'allyAll':
      return i.side === 'ally' ? [...pt(a, 'ally'), ...zr(a)] : pt(a, 'enemy');
    case 'allyOne': {
      const d = Ol(a, s);
      return d && d.side === i.side ? [d] : [i];
    }
    case 'enemyAll':
      return pt(a, r);
    case 'enemyRow':
    case 'enemyOne':
    default: {
      const d = Ol(a, s);
      return d && d.side === r && !d.isDown ? [d] : pt(a, r).slice(0, 1);
    }
  }
}
function gb(a, i, o, s) {
  return iy(a, i, o.target, s);
}
function uy(a, i, o, s, r, d, m) {
  switch (o.kind) {
    case 'damage': {
      const v = o.hits ?? 1;
      for (const _ of d)
        if (!_.isDown)
          for (let g = 0; g < v; g++) {
            const y = Kp(
              i,
              _,
              { statBase: o.statBase, power: o.power(r), element: s, elementMultiplier: ay(_, s) },
              m
            );
            y.hit
              ? (Dr(_, y.damage, a.log),
                rs(_, 5),
                a.log.push({
                  text: `${i.name} の攻撃！ ${_.name} に ${y.damage} ダメージ${y.critical ? '（会心）' : ''}`,
                }))
              : a.log.push({ text: `${i.name} の攻撃は外れた` });
          }
      break;
    }
    case 'heal': {
      const v = o.amount(r);
      for (const _ of d) _.isDown || (_.hp = wl(_.hp + v, 0, _.maxHp));
      a.log.push({ text: `${i.name} は回復魔法を使った（+${v}）` });
      break;
    }
    case 'buff': {
      for (const v of d)
        cr(v, {
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
        const _ = yb(o.chance(r), i, v);
        m.next() < _ &&
          (pb(v, { type: o.ailment, remainingTurns: o.turns, magnitude: o.magnitude }),
          a.log.push({ text: `${v.name} は${fb[o.ailment]}になった` }));
      }
      break;
    }
    case 'summon': {
      if (i.side !== 'ally') break;
      if (zr(a).length >= rb) {
        a.log.push({ text: 'これ以上は召喚できない' });
        break;
      }
      const v = `summon_${a.turn}_${a.summons.length}`,
        _ = ly(o.summonKind, a.depth, i.id, v);
      (a.summons.push(_), a.log.push({ text: `${i.name} は ${_.name} を召喚した！` }));
      break;
    }
  }
}
function Io(a, i, o, s) {
  var m;
  if (o.isDown) return;
  const r = i.enemyId
      ? (wn[i.enemyId].attackElement ?? 'bash')
      : i.isSummon && i.summonKind
        ? (((m = Ca[i.summonKind]) == null ? void 0 : m.attackElement) ?? 'bash')
        : 'bash',
    d = Kp(i, o, { statBase: 'str', power: 1, element: r, elementMultiplier: ay(o, r) }, s);
  d.hit
    ? (Dr(o, d.damage, a.log),
      rs(i, 5),
      rs(o, 5),
      a.log.push({
        text: `${i.name} の攻撃！ ${o.name} に ${d.damage} ダメージ${d.critical ? '（会心）' : ''}`,
      }))
    : a.log.push({ text: `${i.name} の攻撃は外れた` });
}
const op = (a) => (a.length === 0 ? 0 : a.reduce((i, o) => i + o.stats.agi, 0) / a.length),
  _b = (a) => a.ailments.some((i) => i.type === 'paralysis'),
  Br = (a, i) => a.ailments.some((o) => o.type === i),
  Jo = (a) => Br(a, 'armBind'),
  vb = (a) => Br(a, 'headBind'),
  bb = (a) => Br(a, 'legBind');
function rp(a) {
  return a.effects.some((i) => i.kind === 'damage' && i.statBase === 'str');
}
function Sb(a, i, o) {
  const s = Sa[i.unionSkillId];
  if (!s) return;
  const r = Ol(a, i.actorId);
  if (!r || r.isDown || r.side !== 'ally') return;
  if (r.unionGauge < 100) {
    a.log.push({ text: `${r.name} はユニオンゲージが足りない` });
    return;
  }
  const d = new Set(i.participantIds);
  d.add(r.id);
  const m = [...d].map((y) => Ol(a, y)).filter((y) => !!y && !y.isDown && y.side === 'ally');
  if (m.length < s.requiredParticipants) {
    a.log.push({ text: `${r.name} の${s.name}は参加人数が足りない` });
    return;
  }
  const v = [r, ...m.filter((y) => y.id !== r.id)].slice(0, s.requiredParticipants);
  for (const y of v) y.unionGauge = wl(y.unionGauge - s.gaugeCostPerParticipant, 0, 100);
  a.log.push({ text: `ユニオン！ ${r.name} の${s.name}！` });
  const _ = 1,
    g = iy(a, r, s.target, i.targetId);
  for (const y of s.effects) uy(a, r, y, s.element, _, g, o);
}
function Wo(a, i, o) {
  var b, A, j;
  if (a.outcome !== 'ongoing') return a;
  const s = structuredClone({ ...a, log: [] }),
    r = new Map(i.filter((S) => S.kind !== 'union').map((S) => [S.actorId, S])),
    d = s.turn === 1 && s.firstStrike !== 'none',
    m = d && s.firstStrike === 'preemptive',
    v = d && s.firstStrike === 'ambush';
  if (
    (m && s.log.push({ text: '先制攻撃！ 味方が先手を取った' }),
    v && s.log.push({ text: '不意打ち！ 敵に先手を取られた' }),
    !v)
  )
    for (const S of i) S.kind === 'union' && Sb(s, S, o);
  const _ = i.find((S) => S.kind === 'flee');
  if (!v && _ && s.outcome === 'ongoing') {
    const S = Ol(s, _.actorId);
    if (S && bb(S)) s.log.push({ text: `${S.name} は脚を封じられて逃げられない` });
    else {
      const O = wl(0.5 + (op(pt(s, 'ally')) - op(pt(s, 'enemy'))) * 0.02, 0.1, 0.95);
      if (o.next() < O)
        return (s.log.push({ text: 'うまく逃げ切れた！' }), (s.outcome = 'fled'), s);
      s.log.push({ text: '逃げられなかった！' });
    }
  }
  if (!v)
    for (const S of i) {
      if (S.kind !== 'guard') continue;
      const O = Ol(s, S.actorId);
      !O ||
        O.isDown ||
        (cr(O, { stat: 'pdef', modifier: 1.5, remainingTurns: 1, stackGroup: 'guard' }),
        cr(O, { stat: 'mdef', modifier: 1.5, remainingTurns: 1, stackGroup: 'guard' }));
    }
  const g = new Map();
  if (!m)
    for (const S of pt(s, 'enemy')) {
      const O = [...zr(s), ...pt(s, 'ally')];
      O.length > 0 && g.set(S.id, o.pick(O).id);
    }
  const y = [...s.allies, ...s.enemies, ...s.summons]
    .filter((S) => !S.isDown)
    .filter((S) => !(m && S.side === 'enemy') && !(v && S.side === 'ally'))
    .map((S) => ({ c: S, agi: S.stats.agi, tie: o.next() }))
    .sort((S, O) => O.agi - S.agi || O.tie - S.tie)
    .map((S) => S.c);
  for (const S of y)
    if (!S.isDown) {
      if (s.outcome !== 'ongoing') break;
      if (_b(S) && o.next() < Be.PARALYSIS_SKIP) {
        s.log.push({ text: `${S.name} は麻痺で動けない` });
        continue;
      }
      if (S.isSummon) {
        const O = S.summonKind ? Ca[S.summonKind] : void 0;
        if (O != null && O.actsOnTurn) {
          const M = pt(s, 'enemy');
          M.length > 0 && Io(s, S, o.pick(M), o);
        }
        if (pt(s, 'enemy').length === 0) break;
        continue;
      }
      if (S.side === 'enemy') {
        if (Jo(S)) {
          s.log.push({ text: `${S.name} は腕を封じられて攻撃できない` });
          continue;
        }
        const O = g.get(S.id),
          M = O ? Ol(s, O) : void 0,
          N = M && !M.isDown ? M : pt(s, 'ally')[0];
        N && Io(s, S, N, o);
      } else {
        const O = r.get(S.id);
        if (!O || O.kind === 'guard' || O.kind === 'flee') continue;
        if (O.kind === 'attack') {
          if (Jo(S)) {
            s.log.push({ text: `${S.name} は腕を封じられて攻撃できない` });
            continue;
          }
          const M = Ol(s, O.targetId),
            N = M && !M.isDown ? M : pt(s, 'enemy')[0];
          N && Io(s, S, N, o);
        } else if (O.kind === 'skill') {
          const M = rn[O.skillId];
          if (!M) continue;
          if (rp(M) && Jo(S)) {
            s.log.push({ text: `${S.name} は腕を封じられてスキルを使えない` });
            continue;
          }
          if (!rp(M) && vb(S)) {
            s.log.push({ text: `${S.name} は頭を封じられてスキルを使えない` });
            continue;
          }
          const N = 1,
            k = M.tpCost(N);
          if (S.tp < k) {
            s.log.push({ text: `${S.name} は TP が足りない` });
            continue;
          }
          ((S.tp -= k), rs(S, 10));
          const Y = gb(s, S, M, O.targetId);
          for (const V of M.effects) uy(s, S, V, M.element, N, Y, o);
        } else if (O.kind === 'item') {
          const M = nt[O.itemId];
          if (!M || !((b = M.useContext) != null && b.includes('battle'))) continue;
          const N = Ol(s, O.targetId) ?? S;
          for (const k of M.effects ?? [])
            k.kind === 'heal'
              ? (N.hp = wl(N.hp + k.amount(1), 0, N.maxHp))
              : k.kind === 'restoreTp' && (N.tp = wl(N.tp + k.amount(1), 0, N.maxTp));
          (s.consumedItems.push(O.itemId), s.log.push({ text: `${S.name} は ${M.name} を使った` }));
        }
      }
      if (pt(s, 'enemy').length === 0 || pt(s, 'ally').length === 0) break;
    }
  for (const S of [...s.allies, ...s.enemies, ...s.summons]) {
    if (S.isDown) continue;
    const O = S.ailments.find((M) => M.type === 'poison');
    if (O) {
      const M = O.magnitude ?? Math.max(1, Math.floor(S.maxHp * Be.POISON_HP_RATIO));
      (Dr(S, M, s.log), s.log.push({ text: `${S.name} は毒で ${M} のダメージ` }));
    }
  }
  for (const S of [...s.allies, ...s.enemies, ...s.summons])
    (!S.isDown &&
      S.maxTp > 0 &&
      (S.tp = Math.min(S.maxTp, S.tp + Math.ceil(S.maxTp * Be.TP_REGEN_RATIO))),
      (S.buffs = S.buffs
        .map((O) => ({ ...O, remainingTurns: O.remainingTurns - 1 }))
        .filter((O) => O.remainingTurns > 0)),
      (S.ailments = S.ailments
        .map((O) => ({ ...O, remainingTurns: O.remainingTurns - 1 }))
        .filter((O) => O.remainingTurns > 0)));
  for (const S of s.enemies)
    if (
      !(
        !S.isDown ||
        !S.enemyId ||
        (((A = a.enemies.find((M) => M.id === S.id)) == null ? void 0 : A.isDown) ?? !1)
      )
    )
      for (const M of wn[S.enemyId].drops ?? [])
        o.next() < M.rate &&
          (s.drops.push({ enemyId: S.enemyId, itemId: M.itemId }),
          s.log.push({
            text: `${S.name} は ${((j = nt[M.itemId]) == null ? void 0 : j.name) ?? M.itemId} を落とした`,
          }));
  return (
    (s.summons = s.summons.filter((S) => !S.isDown)),
    (s.turn += 1),
    pt(s, 'enemy').length === 0
      ? (s.outcome = 'win')
      : pt(s, 'ally').length === 0 && (s.outcome = 'lose'),
    s
  );
}
function sy(a) {
  let i = 0,
    o = 0;
  for (const s of a.enemies) {
    if (!s.enemyId) continue;
    const r = wn[s.enemyId],
      d = Cr(a.depth, r.refDepth);
    ((i += Math.round(r.exp * d)), (o += Math.round(r.gold * d)));
  }
  return { exp: i, gold: o };
}
function xb(a, i) {
  let o = a.level,
    s = a.exp + (Ko(o) ? i : 0),
    r = a.skillPoints.total;
  for (; Ko(o) && s >= up(o); ) ((s -= up(o)), (o += 1), (r += Be.SP_PER_LEVEL));
  return {
    ...a,
    level: o,
    exp: Ko(a.level) ? s : a.exp,
    skillPoints: { ...a.skillPoints, total: r },
  };
}
function fp(a, i) {
  if (!a.diveState) return a;
  const o = i.outcome === 'win',
    s = i.outcome === 'win' || i.outcome === 'fled',
    r = new Map(i.allies.map((A) => [A.id, A])),
    d = a.diveState.party.map((A) => {
      const j = r.get(A.charId);
      if (!j) return A;
      let S = j.unionGauge;
      return (
        s && !j.isDown && (S = wl(S + Be.UNION_GAIN_ON_WIN, 0, 100)),
        { ...A, hp: j.hp, tp: j.tp, unionGauge: S, ailments: j.ailments }
      );
    });
  let m = a.guild.members,
    v = a.guild.gold;
  const _ = { ...a.bestiary.monsters };
  for (const A of i.enemies) {
    if (!A.enemyId) continue;
    const j = _[A.enemyId] ?? { seen: !1, defeated: !1, dropsFound: [] };
    _[A.enemyId] = { ...j, seen: !0, defeated: j.defeated || A.isDown };
  }
  if (o)
    for (const A of i.drops) {
      const j = _[A.enemyId];
      j &&
        !j.dropsFound.includes(A.itemId) &&
        (_[A.enemyId] = { ...j, dropsFound: [...j.dropsFound, A.itemId] });
    }
  const g = { ...a.bestiary, monsters: _ };
  if (o) {
    const { exp: A, gold: j } = sy(i);
    v += j;
    const S = new Set(d.map((M) => M.charId)),
      O = S.size > 0 ? Math.floor(A / S.size) : 0;
    m = m.map((M) => (S.has(M.id) ? xb(M, O) : M));
  }
  const y = i.summons
    .filter((A) => {
      var j;
      return (
        !A.isDown &&
        A.summonKind &&
        ((j = Ca[A.summonKind]) == null ? void 0 : j.persistsAfterBattle)
      );
    })
    .map((A) => ({ summonKind: A.summonKind, ownerId: A.ownerId ?? '', hp: A.hp }));
  let b = {
    ...a,
    guild: { ...a.guild, members: m, gold: v, bestiary: g },
    bestiary: g,
    diveState: { ...a.diveState, party: d, persistentSummons: y },
  };
  for (const A of i.consumedItems) b = Rr(b, A, 1);
  if (o) for (const A of i.drops) b = Mr(b, A.itemId, 1);
  return b;
}
const Eb = 8,
  or = 16,
  Mi = 5;
function Ur(a) {
  return a.range(Eb, or);
}
function Tb(a, i) {
  const o = a - 1;
  return o <= 0
    ? { stepsUntilEncounter: Ur(i), triggered: !0 }
    : { stepsUntilEncounter: o, triggered: !1 };
}
function Nb(a) {
  const i = Math.max(0, or - a),
    o = Math.round((i / or) * Mi);
  return Math.min(Mi, Math.max(0, o));
}
const Kt = { N: { dx: 0, dy: -1 }, E: { dx: 1, dy: 0 }, S: { dx: 0, dy: 1 }, W: { dx: -1, dy: 0 } },
  Ta = ['N', 'E', 'S', 'W'];
function cy(a) {
  return Ta[(Ta.indexOf(a) + 1) % 4];
}
function oy(a) {
  return Ta[(Ta.indexOf(a) + 3) % 4];
}
function kb(a) {
  return Ta[(Ta.indexOf(a) + 2) % 4];
}
const Ab = (a, i, o) => a >= 0 && i >= 0 && a < o.width && i < o.height;
function xa(a, i, o, s) {
  if (a.cells[o][i].walls[s]) return !1;
  const r = i + Kt[s].dx,
    d = o + Kt[s].dy;
  return Ab(r, d, a) ? a.cells[d][r].passable : !1;
}
function Cb(a, i, o) {
  return xa(a, i.x, i.y, o) ? { x: i.x + Kt[o].dx, y: i.y + Kt[o].dy } : null;
}
function Lr(a, i, o) {
  return ['N', 'E', 'S', 'W'].filter((s) => !a.cells[o][i].walls[s]);
}
const dp = ['N', 'E', 'S', 'W'],
  Fo = (a, i) => Math.abs(a.x - i.x) + Math.abs(a.y - i.y);
function Mb(a, i, o, s, r) {
  const d = i.map((y) => ({ ...y, cell: { ...y.cell } })),
    m = new Map(a.foeSpawns.map((y) => [y.id, y])),
    v = new Set(d.filter((y) => !y.defeated).map((y) => `${y.cell.x},${y.cell.y}`));
  let _ = null;
  const g = [...d].sort((y, b) => y.spawnId.localeCompare(b.spawnId, void 0, { numeric: !0 }));
  for (const y of g) {
    if (_) break;
    if (y.defeated) continue;
    const b = m.get(y.spawnId);
    if (!b) continue;
    !y.alerted && Fo(y.cell, o) <= b.sightRange && (y.alerted = !0);
    const A = (j) => {
      if (!xa(a, y.cell.x, y.cell.y, j)) return 'blocked';
      const S = y.cell.x + Kt[j].dx,
        O = y.cell.y + Kt[j].dy;
      if (S === o.x && O === o.y) {
        const M = j === s;
        return (
          (_ = { spawnId: y.spawnId, enemyId: b.enemyId, firstStrike: M ? 'ambush' : 'none' }),
          'contact'
        );
      }
      return v.has(`${S},${O}`)
        ? 'blocked'
        : (v.delete(`${y.cell.x},${y.cell.y}`),
          (y.cell = { x: S, y: O }),
          v.add(`${S},${O}`),
          'moved');
    };
    if (y.alerted)
      for (let j = 0; j < b.moveSpeed; j++) {
        let S = null,
          O = Fo(y.cell, o),
          M = !1;
        for (const k of dp) {
          const Y = y.cell.x + Kt[k].dx,
            V = y.cell.y + Kt[k].dy;
          if (Y === o.x && V === o.y && xa(a, y.cell.x, y.cell.y, k)) {
            ((S = k), (M = !0));
            break;
          }
          if (!xa(a, y.cell.x, y.cell.y, k) || v.has(`${Y},${V}`)) continue;
          const Z = Fo({ x: Y, y: V }, o);
          Z < O && ((O = Z), (S = k));
        }
        if (!S) break;
        const N = A(S);
        if (N === 'contact' || N === 'blocked' || M) break;
      }
    else {
      const j = b.patrol;
      if (j.kind === 'wander') {
        const S = dp.filter(
          (O) =>
            xa(a, y.cell.x, y.cell.y, O) && !v.has(`${y.cell.x + Kt[O].dx},${y.cell.y + Kt[O].dy}`)
        );
        S.length > 0 && A(r.pick(S));
      } else j.kind === 'charge' && A(j.dir);
    }
  }
  return { foes: d, contact: _ };
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
  Rb = Object.keys(Rn);
function jb(a) {
  return Object.values(wn)
    .filter((i) => i.tierBand === a && !i.id.startsWith('enemy_boss'))
    .map((i) => i.id);
}
const jl = { N: { dx: 0, dy: -1 }, E: { dx: 1, dy: 0 }, S: { dx: 0, dy: 1 }, W: { dx: -1, dy: 0 } },
  Ob = { N: 'S', E: 'W', S: 'N', W: 'E' };
function wb(a) {
  return Math.min(25, 15 + Math.floor(a / 5));
}
function zb() {
  return { walls: { N: !0, E: !0, S: !0, W: !0 }, floorType: 'normal', passable: !0 };
}
const rr = (a, i, o, s) => a >= 0 && i >= 0 && a < o && i < s;
function mp(a, i, o, s) {
  const { dx: r, dy: d } = jl[s];
  ((a[o][i].walls[s] = !1), (a[o + d][i + r].walls[Ob[s]] = !1));
}
function Db(a, i, o) {
  const s = a.length,
    r = a[0].length,
    d = Array.from({ length: s }, () => Array(r).fill(-1)),
    m = [{ x: i, y: o }];
  d[o][i] = 0;
  for (let v = 0; v < m.length; v++) {
    const { x: _, y: g } = m[v];
    for (const y of ['N', 'E', 'S', 'W']) {
      if (a[g][_].walls[y]) continue;
      const b = _ + jl[y].dx,
        A = g + jl[y].dy;
      !rr(b, A, r, s) || d[A][b] !== -1 || ((d[A][b] = d[g][_] + 1), m.push({ x: b, y: A }));
    }
  }
  return d;
}
function Bb(a, i) {
  const o = wb(a),
    s = o,
    r = o,
    d = Array.from({ length: r }, () => Array.from({ length: s }, () => zb())),
    m = Array.from({ length: r }, () => Array(s).fill(!1)),
    v = i.int(s),
    _ = i.int(r),
    g = [{ x: v, y: _ }];
  for (m[_][v] = !0; g.length > 0; ) {
    const I = g[g.length - 1],
      Q = [];
    for (const ue of ['N', 'E', 'S', 'W']) {
      const ce = I.x + jl[ue].dx,
        W = I.y + jl[ue].dy;
      rr(ce, W, s, r) && !m[W][ce] && Q.push(ue);
    }
    if (Q.length === 0) {
      g.pop();
      continue;
    }
    const L = i.pick(Q);
    mp(d, I.x, I.y, L);
    const K = I.x + jl[L].dx,
      ae = I.y + jl[L].dy;
    ((m[ae][K] = !0), g.push({ x: K, y: ae }));
  }
  const y = Math.floor((s * r) / 25);
  for (let I = 0; I < y; I++) {
    const Q = i.int(s),
      L = i.int(r),
      K = i.pick(['N', 'E', 'S', 'W']),
      ae = Q + jl[K].dx,
      ue = L + jl[K].dy;
    rr(ae, ue, s, r) && d[L][Q].walls[K] && mp(d, Q, L, K);
  }
  const b = i.int(s),
    A = i.int(r),
    j = Db(d, b, A);
  let S = b,
    O = A,
    M = -1;
  for (let I = 0; I < r; I++)
    for (let Q = 0; Q < s; Q++) j[I][Q] > M && ((M = j[I][Q]), (S = Q), (O = I));
  ((d[A][b].event = { kind: 'stairsDown' }), (d[O][S].event = { kind: 'stairsUp' }));
  const N = Math.floor((a - 1) / 10),
    k = [];
  if (!Ci(a)) {
    const I = jb(N),
      Q = 1 + Math.floor(a / 8);
    for (let L = 0; L < Q && I.length > 0; L++) {
      let K = i.int(s),
        ae = i.int(r);
      for (let ue = 0; ue < 20; ue++) {
        ((K = i.int(s)), (ae = i.int(r)));
        const ce = d[ae][K].event,
          W = Math.abs(K - b) + Math.abs(ae - A) >= 3;
        if (!ce && W) break;
      }
      k.push({
        id: `foe_${L}`,
        enemyId: i.pick(I),
        startCell: { x: K, y: ae },
        patrol: { kind: 'wander' },
        moveSpeed: 1,
        sightRange: 3,
        respawn: !1,
      });
    }
  }
  const Y = [],
    V = () => {
      for (let I = 0; I < 25; I++) {
        const Q = i.int(s),
          L = i.int(r),
          K = Math.abs(Q - b) + Math.abs(L - A) >= 2;
        if (!d[L][Q].event && K) return { x: Q, y: L };
      }
      return null;
    },
    Z = 2 + Math.floor(a / 10);
  for (let I = 0; I < Z; I++) {
    const Q = V();
    if (!Q) break;
    const L = i.pick(Rb),
      K = `gather_${I}`;
    ((d[Q.y][Q.x].event = { kind: 'gather', gatherId: K }), Y.push({ id: K, cell: Q, type: L }));
  }
  if (!Ci(a)) {
    const I = V();
    I && (d[I.y][I.x].event = { kind: 'cookingSpot', spotId: 'cook_0' });
  }
  return {
    depth: a,
    width: s,
    height: r,
    cells: d,
    encounterTable: `band_${N}`,
    foeSpawns: k,
    gatheringPoints: Y,
    bgmId: Ci(a) ? 'bgm_boss' : 'bgm_dungeon',
  };
}
function ry(a, i) {
  var o;
  for (let s = 0; s < a.height; s++)
    for (let r = 0; r < a.width; r++)
      if (((o = a.cells[s][r].event) == null ? void 0 : o.kind) === i) return { x: r, y: s };
  return null;
}
const Ub = 4294967296;
function Lb(a, i) {
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
class qr {
  constructor(i, o) {
    Lo(this, 'baseSeed');
    Lo(this, '_state');
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
      ((i ^ (i >>> 14)) >>> 0) / Ub
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
    const o = Lb(this.baseSeed, i);
    return new qr(o, o);
  }
}
function On(a) {
  return new qr(a, a);
}
function qb() {
  return Math.floor(Math.random() * 4294967296) >>> 0;
}
const fs = (a, i) => `${a},${i}`;
function Hb(a, i) {
  return On(a).fork(`floor:${i}`);
}
function fy(a, i) {
  const o = a.towerState.floors[i];
  if (o) return { save: a, floor: o };
  const s = Bb(i, Hb(a.masterSeed, i)),
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
function Gb(a) {
  const i = [...a.guild.party.front, ...a.guild.party.back].filter((s) => s !== null),
    o = [];
  for (const s of i) {
    const r = a.guild.members.find((m) => m.id === s);
    if (!r) continue;
    const d = Di(r);
    o.push({ charId: s, hp: d.hp, tp: d.tp, unionGauge: 0, ailments: [] });
  }
  return o;
}
function ds(a, i, o, s) {
  const r = a.towerState.floors[i].generated,
    d = new Set(a.exploredCells[i] ?? []);
  d.add(fs(o, s));
  for (const m of Lr(r, o, s)) {
    const v = o + (m === 'E' ? 1 : m === 'W' ? -1 : 0),
      _ = s + (m === 'S' ? 1 : m === 'N' ? -1 : 0);
    d.add(fs(v, _));
  }
  return { ...a, exploredCells: { ...a.exploredCells, [i]: [...d] } };
}
function dy(a, i, o) {
  var _, g;
  const s = fy(a, i);
  let r = s.save;
  const d = s.floor.generated,
    m = ry(d, 'stairsDown') ?? { x: 0, y: 0 },
    v = Lr(d, m.x, m.y)[0] ?? 'N';
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
        dir: v,
        party: ((_ = r.diveState) == null ? void 0 : _.party) ?? Gb(r),
        persistentSummons: ((g = r.diveState) == null ? void 0 : g.persistentSummons) ?? [],
        encounter: { stepsUntilEncounter: Ur(o) },
        pendingFoeBattle: null,
      },
    }),
    ds(r, i, m.x, m.y)
  );
}
function Yb(a, i = 1) {
  const o = On(a.masterSeed).fork(`dive:${a.towerState.record.totalDives}`),
    s = {
      ...a,
      diveState: null,
      towerState: {
        ...a.towerState,
        record: { ...a.towerState.record, totalDives: a.towerState.record.totalDives + 1 },
      },
    };
  return dy(s, i, o);
}
function my(a, i) {
  return a.diveState ? { ...a, diveState: { ...a.diveState, dir: i } } : a;
}
function hy(a, i, o) {
  const s = a.towerState.floors[i];
  return {
    ...a,
    towerState: {
      ...a.towerState,
      floors: { ...a.towerState.floors, [i]: { ...s, foeRuntime: o } },
    },
  };
}
function $b(a, i, o) {
  const s = a.diveState;
  if (!s) return { save: a, moved: !1, triggered: !1 };
  const r = a.towerState.floors[s.depth],
    d = r.generated,
    m = Cb(d, s.pos, i);
  if (!m) return { save: my(a, i), moved: !1, triggered: !1 };
  const v = r.foeRuntime.find((b) => !b.defeated && b.cell.x === m.x && b.cell.y === m.y);
  if (v) {
    const b = d.foeSpawns.find((S) => S.id === v.spawnId),
      A = b ? { spawnId: v.spawnId, enemyId: b.enemyId, firstStrike: 'preemptive' } : null;
    let j = { ...a, diveState: { ...s, pos: m, dir: i, pendingFoeBattle: A } };
    return ((j = ds(j, s.depth, m.x, m.y)), { save: j, moved: !0, triggered: A !== null });
  }
  const _ = Tb(s.encounter.stepsUntilEncounter, o);
  let g = {
    ...a,
    diveState: {
      ...s,
      pos: m,
      dir: i,
      encounter: { stepsUntilEncounter: _.stepsUntilEncounter },
      pendingFoeBattle: null,
    },
  };
  g = ds(g, s.depth, m.x, m.y);
  const y = Mb(d, r.foeRuntime, m, i, o);
  return (
    (g = hy(g, s.depth, y.foes)),
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
function Xb(a, i) {
  const o = a.diveState;
  if (!o) return a;
  const s = o.pendingFoeBattle;
  let r = { ...a, diveState: { ...o, pendingFoeBattle: null } };
  if (s && i) {
    const m = r.towerState.floors[o.depth].foeRuntime.map((v) =>
      v.spawnId === s.spawnId ? { ...v, defeated: !0 } : v
    );
    r = hy(r, o.depth, m);
  }
  return r;
}
function hp(a) {
  const i = a.diveState;
  if (!i) return null;
  const o = a.towerState.floors[i.depth].generated.cells[i.pos.y][i.pos.x].event;
  return (o == null ? void 0 : o.kind) === 'stairsUp' ||
    (o == null ? void 0 : o.kind) === 'stairsDown'
    ? o.kind
    : null;
}
function Vb(a) {
  if (!a.diveState) return a;
  const i = a.diveState.depth + 1,
    o = On(a.masterSeed).fork(`enc:${i}:${a.towerState.record.totalDives}`);
  return dy(a, i, o);
}
function Qb(a) {
  if (!a.diveState) return a;
  const i = a.diveState.depth;
  if (i <= 1) return ji(a);
  const o = i - 1,
    s = fy(a, o),
    r = ry(s.floor.generated, 'stairsUp') ?? { x: 0, y: 0 },
    d = On(a.masterSeed).fork(`enc:${o}:${a.towerState.record.totalDives}`);
  let m = s.save;
  const v = s.floor.generated,
    _ = Lr(v, r.x, r.y)[0] ?? 'N';
  return (
    (m = {
      ...m,
      diveState: {
        ...m.diveState,
        depth: o,
        pos: { x: r.x, y: r.y },
        dir: _,
        encounter: { stepsUntilEncounter: Ur(d) },
        pendingFoeBattle: null,
      },
    }),
    ds(m, o, r.x, r.y)
  );
}
function ji(a) {
  return { ...a, diveState: null };
}
const Zb = { 10: 'enemy_boss_gatekeeper' };
function Kb(a) {
  const i = Math.floor((a - 1) / 10);
  return Object.values(wn)
    .filter((o) => o.tierBand === i && !o.id.startsWith('enemy_boss'))
    .map((o) => o.id);
}
function Ib(a, i) {
  if (Ci(a)) {
    const r = Zb[a];
    if (r) return [r];
  }
  const o = Kb(a);
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
function Jb() {
  return Object.values(Ma)
    .filter((a) => a.unlockedByDefault)
    .map((a) => a.id);
}
const is = 2,
  Wb = { autoMap: 'on', bgmVolume: 0.6, seVolume: 0.6 };
function pp() {
  return { monsters: {}, items: {} };
}
function Fb() {
  return { deepestReached: 0, highestBossDefeated: 0, totalDives: 0, bossDefeatLog: [] };
}
const Pb = () => ({ weapon: null, armor: null, accessory: null });
function eS() {
  return `char_${Date.now().toString(36)}_${Math.floor(Math.random() * 16777215).toString(36)}`;
}
function py(a) {
  var v;
  const { raceId: i, classId: o, name: s, id: r } = a;
  if (!It[i]) throw new Error(`createCharacter: 未定義の種族 "${i}"`);
  if (!yt[o]) throw new Error(`createCharacter: 未定義の職業 "${o}"`);
  const d = (v = yt[o].skillTree.skills[0]) == null ? void 0 : v.skillId,
    m = d ? { [d]: 1 } : {};
  return {
    id: r ?? eS(),
    name: s,
    raceId: i,
    classId: o,
    titleId: null,
    level: 1,
    exp: 0,
    skillPoints: { total: 0, spent: 0 },
    learnedSkills: m,
    equipment: Pb(),
  };
}
function tS() {
  return { front: Array(ys).fill(null), back: Array(gs).fill(null) };
}
function lS(a, i) {
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
function nS(a, i) {
  return a.guild.members.length >= sr
    ? a
    : {
        ...a,
        guild: { ...a.guild, members: [...a.guild.members, i], party: lS(a.guild.party, i.id) },
      };
}
function aS(a) {
  return {
    schemaVersion: is,
    savedAt: 0,
    masterSeed: qb(),
    settings: { ...Wb },
    guild: {
      name: a,
      gold: K1,
      members: [],
      party: tS(),
      storage: [],
      equipment: [],
      foodStorage: [],
      bestiary: pp(),
    },
    towerState: { floors: {}, bossGates: {}, warp: { unlockedCheckpoints: [] }, record: Fb() },
    diveState: null,
    bestiary: pp(),
    playerMaps: {},
    exploredCells: {},
    forgeInventory: { fragments: {}, ingots: { copper: 0, silver: 0, gold: 0 } },
    shopStock: { unlockedTier: 0, unlockedItemIds: [] },
    unlockedRecipeIds: Jb(),
    flags: {},
  };
}
const fr = (a, i) => i.some((o) => a instanceof o);
let yp, gp;
function iS() {
  return yp || (yp = [IDBDatabase, IDBObjectStore, IDBIndex, IDBCursor, IDBTransaction]);
}
function uS() {
  return (
    gp ||
    (gp = [
      IDBCursor.prototype.advance,
      IDBCursor.prototype.continue,
      IDBCursor.prototype.continuePrimaryKey,
    ])
  );
}
const dr = new WeakMap(),
  Po = new WeakMap(),
  vs = new WeakMap();
function sS(a) {
  const i = new Promise((o, s) => {
    const r = () => {
        (a.removeEventListener('success', d), a.removeEventListener('error', m));
      },
      d = () => {
        (o(jn(a.result)), r());
      },
      m = () => {
        (s(a.error), r());
      };
    (a.addEventListener('success', d), a.addEventListener('error', m));
  });
  return (vs.set(i, a), i);
}
function cS(a) {
  if (dr.has(a)) return;
  const i = new Promise((o, s) => {
    const r = () => {
        (a.removeEventListener('complete', d),
          a.removeEventListener('error', m),
          a.removeEventListener('abort', m));
      },
      d = () => {
        (o(), r());
      },
      m = () => {
        (s(a.error || new DOMException('AbortError', 'AbortError')), r());
      };
    (a.addEventListener('complete', d),
      a.addEventListener('error', m),
      a.addEventListener('abort', m));
  });
  dr.set(a, i);
}
let mr = {
  get(a, i, o) {
    if (a instanceof IDBTransaction) {
      if (i === 'done') return dr.get(a);
      if (i === 'store')
        return o.objectStoreNames[1] ? void 0 : o.objectStore(o.objectStoreNames[0]);
    }
    return jn(a[i]);
  },
  set(a, i, o) {
    return ((a[i] = o), !0);
  },
  has(a, i) {
    return a instanceof IDBTransaction && (i === 'done' || i === 'store') ? !0 : i in a;
  },
};
function yy(a) {
  mr = a(mr);
}
function oS(a) {
  return uS().includes(a)
    ? function (...i) {
        return (a.apply(hr(this), i), jn(this.request));
      }
    : function (...i) {
        return jn(a.apply(hr(this), i));
      };
}
function rS(a) {
  return typeof a == 'function'
    ? oS(a)
    : (a instanceof IDBTransaction && cS(a), fr(a, iS()) ? new Proxy(a, mr) : a);
}
function jn(a) {
  if (a instanceof IDBRequest) return sS(a);
  if (Po.has(a)) return Po.get(a);
  const i = rS(a);
  return (i !== a && (Po.set(a, i), vs.set(i, a)), i);
}
const hr = (a) => vs.get(a);
function fS(a, i, { blocked: o, upgrade: s, blocking: r, terminated: d } = {}) {
  const m = indexedDB.open(a, i),
    v = jn(m);
  return (
    s &&
      m.addEventListener('upgradeneeded', (_) => {
        s(jn(m.result), _.oldVersion, _.newVersion, jn(m.transaction), _);
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
const dS = ['get', 'getKey', 'getAll', 'getAllKeys', 'count'],
  mS = ['put', 'add', 'delete', 'clear'],
  er = new Map();
function _p(a, i) {
  if (!(a instanceof IDBDatabase && !(i in a) && typeof i == 'string')) return;
  if (er.get(i)) return er.get(i);
  const o = i.replace(/FromIndex$/, ''),
    s = i !== o,
    r = mS.includes(o);
  if (!(o in (s ? IDBIndex : IDBObjectStore).prototype) || !(r || dS.includes(o))) return;
  const d = async function (m, ...v) {
    const _ = this.transaction(m, r ? 'readwrite' : 'readonly');
    let g = _.store;
    return (s && (g = g.index(v.shift())), (await Promise.all([g[o](...v), r && _.done]))[0]);
  };
  return (er.set(i, d), d);
}
yy((a) => ({
  ...a,
  get: (i, o, s) => _p(i, o) || a.get(i, o, s),
  has: (i, o) => !!_p(i, o) || a.has(i, o),
}));
const hS = ['continue', 'continuePrimaryKey', 'advance'],
  vp = {},
  pr = new WeakMap(),
  gy = new WeakMap(),
  pS = {
    get(a, i) {
      if (!hS.includes(i)) return a[i];
      let o = vp[i];
      return (
        o ||
          (o = vp[i] =
            function (...s) {
              pr.set(this, gy.get(this)[i](...s));
            }),
        o
      );
    },
  };
async function* yS(...a) {
  let i = this;
  if ((i instanceof IDBCursor || (i = await i.openCursor(...a)), !i)) return;
  i = i;
  const o = new Proxy(i, pS);
  for (gy.set(o, i), vs.set(o, hr(i)); i; )
    (yield o, (i = await (pr.get(o) || i.continue())), pr.delete(o));
}
function bp(a, i) {
  return (
    (i === Symbol.asyncIterator && fr(a, [IDBIndex, IDBObjectStore, IDBCursor])) ||
    (i === 'iterate' && fr(a, [IDBIndex, IDBObjectStore]))
  );
}
yy((a) => ({
  ...a,
  get(i, o, s) {
    return bp(i, o) ? yS : a.get(i, o, s);
  },
  has(i, o) {
    return bp(i, o) || a.has(i, o);
  },
}));
const gS = { 1: (a) => _S(a) },
  tr = (a) => typeof a == 'object' && a !== null && !Array.isArray(a);
function _S(a) {
  const i = { ...a, schemaVersion: 2 };
  let o = 0;
  const s = (d) => ({ id: `eq_mig_${Date.now().toString(36)}_${o++}`, masterId: d, forgeLevel: 0 }),
    r = tr(i.guild) ? { ...i.guild } : {};
  return (
    Array.isArray(r.equipment) || (r.equipment = []),
    Array.isArray(r.foodStorage) || (r.foodStorage = []),
    Array.isArray(r.members) &&
      (r.members = r.members.map((d) => {
        if (!tr(d)) return d;
        const m = tr(d.equipment) ? { ...d.equipment } : {};
        for (const v of ['weapon', 'armor', 'accessory']) {
          const _ = m[v];
          m[v] = typeof _ == 'string' ? s(_) : (_ ?? null);
        }
        return { ...d, equipment: m };
      })),
    (i.guild = r),
    Array.isArray(i.unlockedRecipeIds) || (i.unlockedRecipeIds = []),
    i
  );
}
function vS(a) {
  return structuredClone(a);
}
function ba(a) {
  return typeof a == 'object' && a !== null && !Array.isArray(a);
}
function bS(a) {
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
function _y(a) {
  if (!ba(a) || typeof a.schemaVersion != 'number')
    return { ok: !1, reason: 'セーブデータの構造が不正です' };
  let i = a.schemaVersion;
  if (i > is) return { ok: !1, reason: `未知のバージョン (${i} > ${is}) のセーブデータです` };
  let o = { ...a };
  for (; i < is; ) {
    const s = gS[i];
    if (!s) return { ok: !1, reason: `バージョン ${i} の migration が未定義です` };
    ((o = s(o)), (i = typeof o.schemaVersion == 'number' ? o.schemaVersion : i + 1));
  }
  return bS(o)
    ? { ok: !0, data: o }
    : { ok: !1, reason: 'migration 後のデータが SaveData の形をしていません' };
}
function SS(a) {
  return {
    guildName: a.guild.name,
    deepestReached: a.towerState.record.deepestReached,
    memberCount: a.guild.members.length,
    savedAt: a.savedAt,
  };
}
function Sp() {
  return {
    guildName: '(破損データ)',
    deepestReached: 0,
    memberCount: 0,
    savedAt: 0,
    corrupted: !0,
  };
}
const xS = 'sekaiju-like-game',
  ES = 1,
  Oi = 'saves',
  Hr = 'main';
let lr = null;
function Gr() {
  return (
    lr ||
      (lr = fS(xS, ES, {
        upgrade(a) {
          a.objectStoreNames.contains(Oi) || a.createObjectStore(Oi);
        },
      })),
    lr
  );
}
async function nr(a) {
  const i = { ...a, savedAt: Date.now() };
  return (await (await Gr()).put(Oi, vS(i), Hr), i);
}
async function TS() {
  const i = await (await Gr()).get(Oi, Hr);
  return i === void 0 ? { ok: !1, reason: 'empty' } : _y(i);
}
async function NS() {
  const i = await (await Gr()).get(Oi, Hr);
  if (i === void 0) return null;
  const o = _y(i);
  if (!o.ok) return Sp();
  try {
    return SS(o.data);
  } catch {
    return Sp();
  }
}
const vy = { save: null, saving: !1 };
function kS(a, i) {
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
      return { ...vy };
  }
}
const by = T.createContext(null);
function AS(a) {
  const i = T.useRef(a);
  return ((i.current = a), i);
}
function CS({ children: a }) {
  const [i, o] = T.useReducer(kS, vy),
    s = AS(i),
    r = T.useCallback(async (b) => {
      const A = aS(b),
        j = await nr(A);
      o({ type: 'load', save: j });
    }, []),
    d = T.useCallback(async () => {
      const b = await TS();
      return b.ok ? (o({ type: 'load', save: b.data }), { ok: !0 }) : { ok: !1, reason: b.reason };
    }, []),
    m = T.useCallback((b) => {
      o({ type: 'updateSave', updater: b });
    }, []),
    v = T.useCallback(
      async (b) => {
        const A = s.current.save;
        if (!A) return;
        const j = b(A);
        (o({ type: 'setSave', save: j }), o({ type: 'saving', saving: !0 }));
        try {
          const S = await nr(j);
          o({ type: 'setSave', save: S });
        } finally {
          o({ type: 'saving', saving: !1 });
        }
      },
      [s]
    ),
    _ = T.useCallback(async () => {
      const { save: b } = s.current;
      if (b) {
        o({ type: 'saving', saving: !0 });
        try {
          const A = await nr(b);
          o({ type: 'setSave', save: A });
        } finally {
          o({ type: 'saving', saving: !1 });
        }
      }
    }, [s]),
    g = T.useCallback(() => {
      o({ type: 'clear' });
    }, []),
    y = T.useMemo(
      () => ({
        ...i,
        startNewGame: r,
        continueGame: d,
        applySave: m,
        applyAndPersist: v,
        persist: _,
        exitToTitle: g,
      }),
      [i, r, d, m, v, _, g]
    );
  return h.jsx(by.Provider, { value: y, children: a });
}
function fn() {
  const a = T.useContext(by);
  if (!a) throw new Error('useGameState は GameStateProvider の内側で使ってください');
  return a;
}
const MS = () => {
    var it, Xe;
    const a = fl(),
      { save: i, applyAndPersist: o } = fn(),
      s = T.useRef(null),
      [r, d] = T.useState(null),
      [m, v] = T.useState({}),
      [_, g] = T.useState(null),
      [y, b] = T.useState(!1),
      [A, j] = T.useState(!1),
      [S, O] = T.useState(null),
      [M, N] = T.useState(!1),
      [k, Y] = T.useState(null),
      [V, Z] = T.useState(null);
    T.useEffect(() => {
      if (r || !(i != null && i.diveState)) return;
      const G = i.diveState.depth,
        oe = (i.masterSeed ^ (G * 2654435761) ^ (i.towerState.record.totalDives * 40503)) >>> 0;
      s.current = On(oe);
      const de = i.diveState.pendingFoeBattle;
      d(de ? cp(i, [de.enemyId], de.firstStrike) : cp(i, Ib(G, s.current)));
    }, [i, r]);
    const I = T.useRef(!1);
    T.useEffect(() => {
      !r ||
        !s.current ||
        I.current ||
        (r.turn === 1 &&
          r.firstStrike === 'ambush' &&
          r.outcome === 'ongoing' &&
          ((I.current = !0), d(Wo(r, [], s.current))));
    }, [r]);
    const Q = T.useMemo(() => (r == null ? void 0 : r.enemies.filter((G) => !G.isDown)) ?? [], [r]),
      L = T.useMemo(() => (r == null ? void 0 : r.allies.filter((G) => !G.isDown)) ?? [], [r]);
    (T.useEffect(() => {
      Q.length > 0 && !Q.some((G) => G.id === S) && O(Q[0].id);
    }, [Q, S]),
      T.useEffect(() => {
        if ((r == null ? void 0 : r.outcome) !== 'ongoing' || (_ && L.some((oe) => oe.id === _)))
          return;
        const G = L.find((oe) => !m[oe.id]) ?? null;
        g(G ? G.id : null);
      }, [r, L, _, m]));
    const K = L.length > 0 && L.every((G) => m[G.id] !== void 0),
      ae = T.useCallback(
        (G, oe) => {
          const de = { ...m, [G]: oe };
          (v(de), b(!1), j(!1));
          const je = L.find((Te) => Te.id !== G && !de[Te.id]);
          g(je ? je.id : null);
        },
        [m, L]
      ),
      ue = T.useCallback(
        async (G) => {
          N(!0);
          const oe = G.outcome === 'win';
          G.outcome === 'lose'
            ? (await o((de) => ji(fp(de, G))), a('/town'))
            : (await o((de) => Xb(fp(de, G), oe)), a('/dungeon'));
        },
        [o, a]
      ),
      ce = T.useCallback(() => {
        var G;
        (v({}), b(!1), j(!1), Y(null), Z(null), g(((G = L[0]) == null ? void 0 : G.id) ?? null));
      }, [L]),
      W = T.useCallback(() => {
        var je;
        if (!r || !s.current || r.outcome !== 'ongoing') return;
        const G = S ?? ((je = Q[0]) == null ? void 0 : je.id) ?? '',
          oe = L.map((Te) => {
            const _t = m[Te.id] ?? { kind: 'attack' };
            return _t.kind === 'guard'
              ? { kind: 'guard', actorId: Te.id }
              : _t.kind === 'skill'
                ? { kind: 'skill', actorId: Te.id, skillId: _t.skillId, targetId: G }
                : _t.kind === 'item'
                  ? { kind: 'item', actorId: Te.id, itemId: _t.itemId, targetId: Te.id }
                  : { kind: 'attack', actorId: Te.id, targetId: G };
          });
        if (k) {
          const Te = Sa[k.unionSkillId],
            _t =
              (Te == null ? void 0 : Te.target) === 'enemyOne' ||
              (Te == null ? void 0 : Te.target) === 'enemyRow' ||
              (Te == null ? void 0 : Te.target) === 'enemyAll';
          oe.unshift({ kind: 'union', ...k, targetId: _t ? G : k.targetId });
        }
        const de = Wo(r, oe, s.current);
        (d(de), v({}), b(!1), j(!1), Y(null), Z(null), g(null));
      }, [r, m, S, L, Q, k]),
      F = T.useCallback(() => {
        if (!r || !s.current || r.outcome !== 'ongoing') return;
        const G = L[0];
        G && (d(Wo(r, [{ kind: 'flee', actorId: G.id }], s.current)), v({}), g(null));
      }, [r, L]);
    if (!i || !i.diveState) return h.jsx(ol, { to: '/town', replace: !0 });
    if (!r) return h.jsx('div', { className: ee.layout, children: '戦闘準備中...' });
    const he = (G) => {
        const oe = i.guild.members.find((de) => de.id === G.id);
        return oe
          ? Object.keys(oe.learnedSkills).filter((de) => de in rn && G.tp >= rn[de].tpCost(1))
          : [];
      },
      U = () => {
        const G = (de) =>
            Object.values(m).filter((je) => je.kind === 'item' && je.itemId === de).length,
          oe = (de) => r.consumedItems.filter((je) => je === de).length;
        return i.guild.storage
          .filter((de) => {
            var je, Te;
            return (Te = (je = nt[de.itemId]) == null ? void 0 : je.useContext) == null
              ? void 0
              : Te.includes('battle');
          })
          .map((de) => ({
            id: de.itemId,
            remaining: Jp(i, de.itemId) - oe(de.itemId) - G(de.itemId),
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
                ? (((de = nt[oe.itemId]) == null ? void 0 : de.name) ?? 'どうぐ')
                : (((je = rn[oe.skillId]) == null ? void 0 : je.name) ?? 'スキル')
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
        const oe = i.guild.members.find((Te) => Te.id === G.id);
        if (!oe) return null;
        const de =
          (je = It[oe.raceId]) == null
            ? void 0
            : je.raceSkillTree.skills.find((Te) => Te.skillId in Sa);
        return !de || !(de.skillId in oe.learnedSkills) ? null : (Sa[de.skillId] ?? null);
      },
      Ee = (G, oe, de) => {
        var _t;
        const Te =
          oe.target === 'enemyOne' || oe.target === 'enemyRow' || oe.target === 'enemyAll'
            ? (S ?? ((_t = Q[0]) == null ? void 0 : _t.id) ?? '')
            : G;
        (Y({ actorId: G, unionSkillId: oe.id, participantIds: de, targetId: Te }), Z(null));
      },
      C = (G, oe) => {
        oe.requiredParticipants <= 1 ? Ee(G.id, oe, [G.id]) : Z({ actorId: G.id, def: oe });
      },
      H = _ ? L.find((G) => G.id === _) : void 0,
      P = ((it = r.enemies.find((G) => G.id === S)) == null ? void 0 : it.name) ?? '-',
      le = sy(r),
      pe = (G) =>
        h.jsxs(
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
              (g(G.id), b(!1), j(!1));
            },
            children: [
              h.jsxs('div', {
                className: ee.cardName,
                children: [
                  G.name,
                  G.unionGauge >= 100 ? h.jsx('span', { className: ee.uni, children: '★' }) : null,
                  te(G),
                ],
              }),
              h.jsx(es, { value: G.hp, max: G.maxHp, color: '#4caf50', showValue: !1 }),
              h.jsx(es, { value: G.tp, max: G.maxTp, color: '#2196f3', showValue: !1 }),
              h.jsxs('div', {
                className: ee.cardNums,
                children: ['HP ', Math.max(0, G.hp), ' · TP ', G.tp],
              }),
              m[G.id] ? h.jsxs('div', { className: ee.cardCmd, children: ['▶ ', J(G)] }) : null,
            ],
          },
          G.id
        ),
      be = r.allies.filter((G) => G.row === 'front'),
      Ce = r.allies.filter((G) => G.row === 'back');
    return h.jsxs('div', {
      className: ee.layout,
      children: [
        h.jsx('div', {
          className: ee.enemies,
          children: r.enemies.map((G) =>
            h.jsxs(
              'button',
              {
                type: 'button',
                className: `${ee.enemy} ${G.isDown ? ee.down : ''} ${S === G.id ? ee.targeted : ''}`,
                disabled: G.isDown,
                onClick: () => O(G.id),
                children: [
                  h.jsxs('span', { className: ee.enemyName, children: [G.name, te(G)] }),
                  h.jsx(es, { value: G.hp, max: G.maxHp, color: '#e57373', showValue: !1 }),
                ],
              },
              G.id
            )
          ),
        }),
        r.summons.length > 0
          ? h.jsx('div', {
              className: ee.summons,
              children: r.summons.map((G) =>
                h.jsxs(
                  'div',
                  {
                    className: `${ee.summon} ${G.isDown ? ee.down : ''}`,
                    children: [
                      h.jsxs('span', { className: ee.summonName, children: ['🐾 ', G.name] }),
                      h.jsx(es, { value: G.hp, max: G.maxHp, color: '#8d6e63', showValue: !1 }),
                      h.jsxs('span', {
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
        h.jsxs('div', {
          className: ee.party,
          children: [
            h.jsx('div', { className: ee.rowTag, children: '前衛' }),
            h.jsx('div', { className: ee.cardRow, children: be.map(pe) }),
            h.jsx('div', { className: ee.rowTag, children: '後衛（近接ダメージ -30%）' }),
            h.jsx('div', {
              className: ee.cardRow,
              children:
                Ce.length > 0
                  ? Ce.map(pe)
                  : h.jsx('div', { className: ee.empty, children: '（なし）' }),
            }),
          ],
        }),
        r.outcome !== 'ongoing'
          ? h.jsxs('div', {
              className: ee.result,
              children: [
                h.jsx('div', {
                  className: ee.resultTitle,
                  children:
                    r.outcome === 'win' ? '勝利！' : r.outcome === 'fled' ? '逃走した' : '全滅...',
                }),
                r.outcome === 'win'
                  ? h.jsxs('div', {
                      className: ee.resultBody,
                      children: ['経験値 ', le.exp, ' ／ ', le.gold, ' G を獲得'],
                    })
                  : r.outcome === 'lose'
                    ? h.jsx('div', { className: ee.resultBody, children: '拠点へ帰還する' })
                    : null,
                h.jsx('button', {
                  type: 'button',
                  className: ee.primary,
                  disabled: M,
                  onClick: () => void ue(r),
                  children: 'つづける',
                }),
              ],
            })
          : h.jsxs('div', {
              className: ee.command,
              children: [
                h.jsxs('div', {
                  className: ee.target,
                  children: ['対象: ', P, '（敵をタップで変更）'],
                }),
                k
                  ? h.jsxs('div', {
                      className: ee.unionBanner,
                      children: [
                        '⚡ ユニオン予約: ',
                        (Xe = Sa[k.unionSkillId]) == null ? void 0 : Xe.name,
                        h.jsx('button', {
                          type: 'button',
                          className: ee.unionCancel,
                          onClick: () => Y(null),
                          children: '取消',
                        }),
                      ],
                    })
                  : null,
                H
                  ? h.jsxs(h.Fragment, {
                      children: [
                        h.jsxs('div', { className: ee.cmdHead, children: [H.name, ' のコマンド'] }),
                        y
                          ? h.jsxs('div', {
                              className: ee.skillList,
                              children: [
                                he(H).map((G) => {
                                  var oe;
                                  return h.jsxs(
                                    'button',
                                    {
                                      type: 'button',
                                      className: ee.skillBtn,
                                      onClick: () => ae(H.id, { kind: 'skill', skillId: G }),
                                      children: [
                                        h.jsxs('span', {
                                          className: ee.skillTop,
                                          children: [
                                            h.jsx('span', {
                                              className: ee.skillName,
                                              children: rn[G].name,
                                            }),
                                            h.jsxs('span', {
                                              className: ee.tp,
                                              children: ['TP ', rn[G].tpCost(1)],
                                            }),
                                          ],
                                        }),
                                        h.jsx('span', {
                                          className: ee.skillDesc,
                                          children:
                                            ((oe = Ar[G]) == null ? void 0 : oe.description) ?? '',
                                        }),
                                      ],
                                    },
                                    G
                                  );
                                }),
                                he(H).length === 0
                                  ? h.jsx('div', {
                                      className: ee.empty,
                                      children: '使えるスキルがない',
                                    })
                                  : null,
                                h.jsx('button', {
                                  type: 'button',
                                  className: ee.menuBack,
                                  onClick: () => b(!1),
                                  children: 'もどる',
                                }),
                              ],
                            })
                          : A
                            ? h.jsxs('div', {
                                className: ee.skillList,
                                children: [
                                  U().map(({ id: G, remaining: oe }) =>
                                    h.jsxs(
                                      'button',
                                      {
                                        type: 'button',
                                        className: ee.skillBtn,
                                        onClick: () => ae(H.id, { kind: 'item', itemId: G }),
                                        children: [
                                          h.jsx('span', {
                                            className: ee.skillTop,
                                            children: h.jsxs('span', {
                                              className: ee.skillName,
                                              children: [nt[G].name, ' ×', oe],
                                            }),
                                          }),
                                          h.jsx('span', {
                                            className: ee.skillDesc,
                                            children: nt[G].description,
                                          }),
                                        ],
                                      },
                                      G
                                    )
                                  ),
                                  U().length === 0
                                    ? h.jsx('div', {
                                        className: ee.empty,
                                        children: '使える道具がない',
                                      })
                                    : null,
                                  h.jsx('button', {
                                    type: 'button',
                                    className: ee.menuBack,
                                    onClick: () => j(!1),
                                    children: 'もどる',
                                  }),
                                ],
                              })
                            : V
                              ? h.jsxs('div', {
                                  className: ee.skillList,
                                  children: [
                                    h.jsxs('div', {
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
                                      h.jsx(
                                        'button',
                                        {
                                          type: 'button',
                                          className: ee.skillBtn,
                                          onClick: () => Ee(V.actorId, V.def, [V.actorId, G.id]),
                                          children: h.jsxs('span', {
                                            className: ee.skillTop,
                                            children: [
                                              h.jsx('span', {
                                                className: ee.skillName,
                                                children: G.name,
                                              }),
                                              h.jsxs('span', {
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
                                      ? h.jsx('div', {
                                          className: ee.empty,
                                          children: '協力できる味方がいない',
                                        })
                                      : null,
                                    h.jsx('button', {
                                      type: 'button',
                                      className: ee.menuBack,
                                      onClick: () => Z(null),
                                      children: 'もどる',
                                    }),
                                  ],
                                })
                              : h.jsxs('div', {
                                  className: ee.menu,
                                  children: [
                                    h.jsx('button', {
                                      type: 'button',
                                      className: ee.menuBtn,
                                      onClick: () => ae(H.id, { kind: 'attack' }),
                                      children: '攻撃',
                                    }),
                                    h.jsx('button', {
                                      type: 'button',
                                      className: ee.menuBtn,
                                      onClick: () => ae(H.id, { kind: 'guard' }),
                                      children: '防御',
                                    }),
                                    h.jsx('button', {
                                      type: 'button',
                                      className: ee.menuBtn,
                                      disabled: he(H).length === 0,
                                      onClick: () => b(!0),
                                      children: 'スキル',
                                    }),
                                    h.jsx('button', {
                                      type: 'button',
                                      className: ee.menuBtn,
                                      disabled: U().length === 0,
                                      onClick: () => j(!0),
                                      children: 'どうぐ',
                                    }),
                                    (() => {
                                      const G = ge(H);
                                      return !G || H.unionGauge < 100 || k
                                        ? null
                                        : h.jsx('button', {
                                            type: 'button',
                                            className: `${ee.menuBtn} ${ee.unionBtn}`,
                                            onClick: () => C(H, G),
                                            children: '⚡ユニオン',
                                          });
                                    })(),
                                    h.jsx('button', {
                                      type: 'button',
                                      className: ee.menuBtn,
                                      onClick: F,
                                      children: '逃走',
                                    }),
                                  ],
                                }),
                      ],
                    })
                  : h.jsxs('div', {
                      className: ee.execRow,
                      children: [
                        h.jsx('button', {
                          type: 'button',
                          className: ee.redo,
                          onClick: ce,
                          children: 'やり直す',
                        }),
                        h.jsx('button', {
                          type: 'button',
                          className: ee.primary,
                          disabled: !K,
                          onClick: W,
                          children: '実行',
                        }),
                      ],
                    }),
              ],
            }),
        h.jsx('div', {
          className: ee.log,
          children:
            r.log.length === 0
              ? h.jsxs('div', {
                  className: ee.logLine,
                  children: ['てきが あらわれた！（', r.turn, ' ターン目）'],
                })
              : r.log.map((G, oe) => h.jsx('div', { className: ee.logLine, children: G.text }, oe)),
        }),
      ],
    });
  },
  RS = '_layout_1pzx1_1',
  jS = '_head_1pzx1_13',
  OS = '_depth_1pzx1_22',
  wS = '_fpvWrap_1pzx1_39',
  zS = '_mapWrap_1pzx1_45',
  DS = '_palette_1pzx1_52',
  BS = '_tool_1pzx1_62',
  US = '_toolActive_1pzx1_73',
  LS = '_paletteHint_1pzx1_79',
  qS = '_stairs_1pzx1_88',
  HS = '_action_1pzx1_102',
  GS = '_notice_1pzx1_119',
  YS = '_controls_1pzx1_127',
  $S = '_row_1pzx1_137',
  XS = '_forward_1pzx1_143',
  VS = '_turn_1pzx1_158',
  QS = '_back_1pzx1_172',
  ZS = '_itemOverlay_1pzx1_183',
  KS = '_itemPanel_1pzx1_193',
  IS = '_itemTitle_1pzx1_206',
  JS = '_itemEmpty_1pzx1_211',
  WS = '_itemRow_1pzx1_217',
  FS = '_itemName_1pzx1_225',
  PS = '_itemDesc_1pzx1_233',
  e2 = '_itemTargets_1pzx1_239',
  t2 = '_itemTarget_1pzx1_239',
  l2 = '_itemHp_1pzx1_259',
  n2 = '_itemUse_1pzx1_265',
  a2 = '_itemClose_1pzx1_282',
  me = {
    layout: RS,
    head: jS,
    depth: OS,
    return: '_return_1pzx1_28',
    fpvWrap: wS,
    mapWrap: zS,
    palette: DS,
    tool: BS,
    toolActive: US,
    paletteHint: LS,
    stairs: qS,
    action: HS,
    notice: GS,
    controls: YS,
    row: $S,
    forward: XS,
    turn: VS,
    back: QS,
    itemOverlay: ZS,
    itemPanel: KS,
    itemTitle: IS,
    itemEmpty: JS,
    itemRow: WS,
    itemName: FS,
    itemDesc: PS,
    itemTargets: e2,
    itemTarget: t2,
    itemHp: l2,
    itemUse: n2,
    itemClose: a2,
  },
  i2 = '_canvas_1keax_1',
  u2 = { canvas: i2 },
  Sy = [
    { id: 'icon_chest', symbol: '📦', label: '宝箱' },
    { id: 'icon_foe', symbol: '👹', label: '強敵(FOE)' },
    { id: 'icon_warning', symbol: '⚠️', label: '注意' },
    { id: 'icon_door', symbol: '🚪', label: '扉/近道' },
    { id: 'icon_gather', symbol: '⛏️', label: '採集' },
    { id: 'icon_event', symbol: '❗', label: 'イベント' },
    { id: 'icon_note', symbol: '📝', label: 'メモ' },
    { id: 'icon_star', symbol: '⭐', label: '任意' },
  ],
  s2 = new Map(Sy.map((a) => [a.id, a]));
function c2(a) {
  var i;
  return ((i = s2.get(a)) == null ? void 0 : i.symbol) ?? '•';
}
const Zt = {
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
  o2 = ({
    floor: a,
    explored: i,
    pos: o,
    dir: s,
    icons: r = [],
    foes: d = [],
    depletedGathers: m = [],
    maxCell: v = 26,
    onCellClick: _,
  }) => {
    const g = T.useRef(null),
      y = Math.max(10, Math.min(v, Math.floor(360 / a.width))),
      b = a.width * y,
      A = a.height * y;
    T.useEffect(() => {
      const S = g.current;
      if (!S) return;
      const O = new Set(i),
        M = new Set(m),
        N = window.devicePixelRatio || 1;
      ((S.width = b * N), (S.height = A * N));
      const k = S.getContext('2d');
      if (!k) return;
      (k.scale(N, N), k.clearRect(0, 0, b, A));
      for (let K = 0; K < a.height; K++)
        for (let ae = 0; ae < a.width; ae++) {
          const ue = O.has(`${ae},${K}`);
          ((k.fillStyle = ue ? Zt.floor : Zt.fog),
            k.fillRect(ae * y, K * y, y, y),
            ue &&
              ((k.strokeStyle = Zt.grid),
              (k.lineWidth = 1),
              k.strokeRect(ae * y + 0.5, K * y + 0.5, y - 1, y - 1)));
        }
      ((k.strokeStyle = Zt.wall), (k.lineWidth = 2), (k.lineCap = 'round'));
      const Y = (K, ae, ue, ce) => {
        (k.beginPath(), k.moveTo(K, ae), k.lineTo(ue, ce), k.stroke());
      };
      for (let K = 0; K < a.height; K++)
        for (let ae = 0; ae < a.width; ae++) {
          if (!O.has(`${ae},${K}`)) continue;
          const ue = a.cells[K][ae],
            ce = ae * y,
            W = K * y;
          (ue.walls.N && Y(ce, W, ce + y, W),
            ue.walls.S && Y(ce, W + y, ce + y, W + y),
            ue.walls.W && Y(ce, W, ce, W + y),
            ue.walls.E && Y(ce + y, W, ce + y, W + y));
          const F = ue.event;
          if (
            (F == null ? void 0 : F.kind) === 'stairsUp' ||
            (F == null ? void 0 : F.kind) === 'stairsDown'
          )
            ((k.fillStyle = F.kind === 'stairsUp' ? Zt.stairsUp : Zt.stairsDown),
              k.beginPath(),
              k.arc(ce + y / 2, W + y / 2, y * 0.28, 0, Math.PI * 2),
              k.fill(),
              (k.fillStyle = '#ffffff'),
              (k.font = `bold ${Math.floor(y * 0.5)}px sans-serif`),
              (k.textAlign = 'center'),
              (k.textBaseline = 'middle'),
              k.fillText(F.kind === 'stairsUp' ? '▲' : '▼', ce + y / 2, W + y / 2 + 1));
          else if ((F == null ? void 0 : F.kind) === 'gather') {
            const he = M.has(`${ae},${K}`);
            ((k.fillStyle = he ? Zt.gatherDone : Zt.gather),
              k.beginPath(),
              k.arc(ce + y / 2, W + y / 2, y * 0.24, 0, Math.PI * 2),
              k.fill());
          } else
            (F == null ? void 0 : F.kind) === 'cookingSpot' &&
              ((k.fillStyle = Zt.cooking),
              k.fillRect(ce + y * 0.28, W + y * 0.28, y * 0.44, y * 0.44));
        }
      ((k.font = `${Math.floor(y * 0.66)}px sans-serif`),
        (k.textAlign = 'center'),
        (k.textBaseline = 'middle'));
      for (const K of r)
        O.has(`${K.x},${K.y}`) && k.fillText(c2(K.iconId), K.x * y + y / 2, K.y * y + y / 2 + 1);
      for (const K of d) {
        if (!O.has(`${K.x},${K.y}`)) continue;
        const ae = K.x * y + y / 2,
          ue = K.y * y + y / 2;
        ((k.fillStyle = K.alerted ? Zt.foeAlert : Zt.foe),
          k.beginPath(),
          k.arc(ae, ue, y * 0.3, 0, Math.PI * 2),
          k.fill(),
          (k.fillStyle = '#ffffff'),
          (k.font = `bold ${Math.floor(y * 0.5)}px sans-serif`),
          (k.textAlign = 'center'),
          (k.textBaseline = 'middle'),
          k.fillText('!', ae, ue + 1));
      }
      const V = o.x * y + y / 2,
        Z = o.y * y + y / 2,
        I = y * 0.34,
        L = { N: -Math.PI / 2, E: 0, S: Math.PI / 2, W: Math.PI }[s];
      ((k.fillStyle = Zt.player),
        k.beginPath(),
        k.moveTo(V + Math.cos(L) * I, Z + Math.sin(L) * I),
        k.lineTo(V + Math.cos(L + 2.5) * I, Z + Math.sin(L + 2.5) * I),
        k.lineTo(V + Math.cos(L - 2.5) * I, Z + Math.sin(L - 2.5) * I),
        k.closePath(),
        k.fill());
    }, [a, i, o, s, r, d, m, y, b, A]);
    const j = (S) => {
      if (!_) return;
      const O = S.currentTarget.getBoundingClientRect(),
        M = Math.floor(((S.clientX - O.left) / O.width) * a.width),
        N = Math.floor(((S.clientY - O.top) / O.height) * a.height);
      M >= 0 && N >= 0 && M < a.width && N < a.height && _(M, N);
    };
    return h.jsx('canvas', {
      ref: g,
      className: u2.canvas,
      style: { width: b, height: A },
      onClick: j,
    });
  },
  r2 = '_gauge_1o2hx_1',
  f2 = '_icon_1o2hx_11',
  d2 = '_segments_1o2hx_16',
  m2 = '_seg_1o2hx_16',
  h2 = '_filled_1o2hx_28',
  p2 = '_danger_1o2hx_32',
  va = { gauge: r2, icon: f2, segments: d2, seg: m2, filled: h2, danger: p2 },
  y2 = ({ level: a }) => {
    const i = a >= Mi;
    return h.jsxs('div', {
      className: va.gauge,
      role: 'img',
      'aria-label': `エンカウントゲージ ${a}/${Mi}`,
      children: [
        h.jsx('span', { className: va.icon, children: i ? '⚠' : '👣' }),
        h.jsx('div', {
          className: va.segments,
          children: Array.from({ length: Mi }, (o, s) =>
            h.jsx(
              'span',
              { className: [va.seg, s < a ? va.filled : '', i ? va.danger : ''].join(' ') },
              s
            )
          ),
        }),
      ],
    });
  },
  g2 = '_view_tw2v9_1',
  _2 = { view: g2 },
  xp = { N: { dx: 0, dy: -1 }, E: { dx: 1, dy: 0 }, S: { dx: 0, dy: 1 }, W: { dx: -1, dy: 0 } };
function v2(a, i, o, s = 4) {
  const r = oy(o),
    d = cy(o),
    m = [];
  let { x: v, y: _ } = i;
  for (let g = 0; g < s; g++) {
    const y = xa(a, v, _, o);
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
    ((v += xp[o].dx), (_ += xp[o].dy));
  }
  return m;
}
const Rl = {
    sky: '#26301c',
    ceiling: '#3a4a2c',
    floor: '#5d6b46',
    wall: '#8b9a6b',
    frontWall: '#7a8a5c',
    outline: '#2c3720',
  },
  b2 = 0.56,
  S2 = ({
    floor: a,
    pos: i,
    dir: o,
    foes: s = [],
    maxDepth: r = 4,
    width: d = 358,
    height: m = 200,
  }) => {
    const v = T.useRef(null);
    return (
      T.useEffect(() => {
        const _ = v.current;
        if (!_) return;
        const g = window.devicePixelRatio || 1;
        ((_.width = d * g), (_.height = m * g));
        const y = _.getContext('2d');
        if (!y) return;
        y.scale(g, g);
        const b = d,
          A = m,
          j = b / 2,
          S = A / 2,
          O = v2(a, i, o, r),
          M = (Y) => {
            const V = Math.pow(b2, Y);
            return {
              l: j - (b / 2) * V,
              r: j + (b / 2) * V,
              t: S - (A / 2) * V,
              b: S + (A / 2) * V,
            };
          },
          N = (Y, V, Z = !1) => {
            (y.beginPath(), y.moveTo(Y[0][0], Y[0][1]));
            for (let I = 1; I < Y.length; I++) y.lineTo(Y[I][0], Y[I][1]);
            (y.closePath(),
              (y.fillStyle = V),
              y.fill(),
              Z && ((y.strokeStyle = Rl.outline), (y.lineWidth = 1), y.stroke()));
          },
          k = (Y) => `rgba(0,0,0,${Math.min(0.5, Y * 0.13)})`;
        ((y.fillStyle = Rl.sky), y.fillRect(0, 0, b, A));
        for (let Y = O.length - 1; Y >= 0; Y--) {
          const V = M(Y),
            Z = M(Y + 1),
            I = O[Y];
          (N(
            [
              [V.l, V.t],
              [V.r, V.t],
              [Z.r, Z.t],
              [Z.l, Z.t],
            ],
            Rl.ceiling
          ),
            N(
              [
                [V.l, V.b],
                [V.r, V.b],
                [Z.r, Z.b],
                [Z.l, Z.b],
              ],
              Rl.floor
            ),
            N(
              [
                [V.l, V.t],
                [Z.l, Z.t],
                [Z.l, Z.b],
                [V.l, V.b],
              ],
              I.leftOpen ? Rl.sky : Rl.wall,
              !0
            ),
            N(
              [
                [V.r, V.t],
                [Z.r, Z.t],
                [Z.r, Z.b],
                [V.r, V.b],
              ],
              I.rightOpen ? Rl.sky : Rl.wall,
              !0
            ),
            I.frontOpen ||
              N(
                [
                  [Z.l, Z.t],
                  [Z.r, Z.t],
                  [Z.r, Z.b],
                  [Z.l, Z.b],
                ],
                Rl.frontWall,
                !0
              ),
            (y.fillStyle = k(Y)),
            y.fillRect(Z.l, Z.t, Z.r - Z.l, Z.b - Z.t));
          const Q = I.event;
          if (
            (Q == null ? void 0 : Q.kind) === 'stairsUp' ||
            (Q == null ? void 0 : Q.kind) === 'stairsDown'
          ) {
            const L = j,
              K = (V.b + Z.b) / 2 - (V.b - Z.b) * 0.15,
              ae = Math.max(12, (V.b - V.t) * 0.18);
            ((y.fillStyle = Q.kind === 'stairsUp' ? '#e8923a' : '#7aa2d6'),
              y.beginPath(),
              y.arc(L, K, ae, 0, Math.PI * 2),
              y.fill(),
              (y.fillStyle = '#fff'),
              (y.font = `bold ${Math.floor(ae * 1.2)}px sans-serif`),
              (y.textAlign = 'center'),
              (y.textBaseline = 'middle'),
              y.fillText(Q.kind === 'stairsUp' ? '▲' : '▼', L, K + 1));
          }
          if (Y > 0 && s.some((L) => L.x === I.x && L.y === I.y)) {
            const L = s.some((ce) => ce.x === I.x && ce.y === I.y && ce.alerted),
              K = j,
              ae = (V.b + Z.b) / 2 - (V.b - Z.b) * 0.1,
              ue = Math.max(14, (V.b - V.t) * 0.22);
            ((y.fillStyle = L ? '#d32f2f' : '#b0533a'),
              y.beginPath(),
              y.arc(K, ae, ue, 0, Math.PI * 2),
              y.fill(),
              (y.fillStyle = '#fff'),
              (y.font = `bold ${Math.floor(ue * 1.3)}px sans-serif`),
              (y.textAlign = 'center'),
              (y.textBaseline = 'middle'),
              y.fillText('!', K, ae + 1));
          }
        }
      }, [a, i, o, s, r, d, m]),
      h.jsx('canvas', { ref: v, className: _2.view, style: { width: d, height: m } })
    );
  };
function x2(a) {
  var s, r, d;
  const i = a.diveState;
  if (!i) return !1;
  const o =
    (r = (s = a.towerState.floors[i.depth]) == null ? void 0 : s.generated.cells[i.pos.y]) == null
      ? void 0
      : r[i.pos.x];
  return ((d = o == null ? void 0 : o.event) == null ? void 0 : d.kind) === 'cookingSpot';
}
function E2(a) {
  const i = new Set(a.unlockedRecipeIds ?? []);
  return Object.values(Ma).filter((o) => i.has(o.id));
}
function xy(a, i) {
  const o = Ma[i];
  return !o || !(a.unlockedRecipeIds ?? []).includes(i)
    ? !1
    : o.ingredients.every((s) => jr(a, s.itemId) >= s.qty);
}
function T2(a, i) {
  if (!xy(a, i)) return { ok: !1, save: a };
  const o = Ma[i];
  let s = a;
  for (const r of o.ingredients) s = ey(s, r.itemId, r.qty);
  return ((s = Pp(s, o.result.itemId, o.result.count)), { ok: !0, save: s });
}
function Ey(a, i) {
  const o = new Set([...a.guild.party.front, ...a.guild.party.back].filter((s) => s !== null));
  return a.guild.members.some((s) => o.has(s.id) && (s.learnedSkills[i] ?? 0) > 0);
}
function Ty(a) {
  var d, m, v;
  const i = a.diveState;
  if (!i) return null;
  const o = (d = a.towerState.floors[i.depth]) == null ? void 0 : d.generated,
    s = (m = o == null ? void 0 : o.cells[i.pos.y]) == null ? void 0 : m[i.pos.x];
  if (!o || ((v = s == null ? void 0 : s.event) == null ? void 0 : v.kind) !== 'gather')
    return null;
  const r = s.event.gatherId;
  return o.gatheringPoints.find((_) => _.id === r) ?? null;
}
function yr(a, i) {
  var r;
  const o = a.diveState;
  return o
    ? (((r = a.towerState.floors[o.depth]) == null ? void 0 : r.depletedGathers) ?? []).includes(
        fs(i.cell.x, i.cell.y)
      )
    : !0;
}
function Ep(a, i) {
  return Ey(a, Rn[i.type].requiredSkillId);
}
function N2(a, i) {
  const o = a.reduce((r, d) => r + d.weight, 0);
  let s = i.next() * o;
  for (const r of a) if (((s -= r.weight), s < 0)) return r.itemId;
  return a[a.length - 1].itemId;
}
function k2(a, i) {
  const o = a.diveState;
  if (!o) return { ok: !1, save: a, reason: 'noDive' };
  const s = Ty(a);
  if (!s) return { ok: !1, save: a, reason: 'noPoint' };
  if (yr(a, s)) return { ok: !1, save: a, reason: 'depleted' };
  const r = Rn[s.type];
  if (!Ey(a, r.requiredSkillId)) return { ok: !1, save: a, reason: 'noSkill' };
  if (r.food && Fp(a) >= Wp) return { ok: !1, save: a, reason: 'foodFull' };
  const d = N2(r.drops, i);
  let m = r.food ? Pp(a, d, 1) : Mr(a, d, 1);
  const v = fs(s.cell.x, s.cell.y),
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
function A2(a, i, o) {
  var O;
  const s = nt[i];
  if (!s) return { save: a, ok: !1, message: 'そのアイテムは無い' };
  if (!((O = s.useContext) != null && O.includes('field')))
    return { save: a, ok: !1, message: 'ここでは使えない' };
  const r = Z1(i);
  if ((r ? jr(a, i) : Jp(a, i)) <= 0) return { save: a, ok: !1, message: '所持していない' };
  const m = (M) => (r ? ey(M, i, 1) : Rr(M, i, 1));
  if (i === 'item_return_thread')
    return a.diveState
      ? { save: ji(m(a)), ok: !0, message: '拠点へ帰還した' }
      : { save: a, ok: !1, message: '探索中のみ使える' };
  if (!a.diveState) return { save: a, ok: !1, message: '探索中のみ使える' };
  const v = a.diveState.party.find((M) => M.charId === o),
    _ = a.guild.members.find((M) => M.id === o);
  if (!v || !_) return { save: a, ok: !1, message: '対象がいない' };
  const g = Di(_);
  let y = v.hp,
    b = v.tp,
    A = !1;
  for (const M of s.effects ?? [])
    M.kind === 'heal'
      ? ((y = Math.min(g.hp, y + M.amount(1))), (A = !0))
      : M.kind === 'restoreTp' && ((b = Math.min(g.tp, b + M.amount(1))), (A = !0));
  if (!A) return { save: a, ok: !1, message: 'いま使う効果がない' };
  const j = a.diveState.party.map((M) => (M.charId === o ? { ...M, hp: y, tp: b } : M));
  return {
    save: m({ ...a, diveState: { ...a.diveState, party: j } }),
    ok: !0,
    message: `${_.name} に ${s.name} を使った`,
  };
}
function C2(a) {
  return { depth: a, floorPaint: [], wallDraw: [], icons: [], notes: [], autopilotRoutes: [] };
}
function M2(a, i) {
  return a.playerMaps[i] ?? C2(i);
}
function Ny(a, i, o) {
  return { ...a, playerMaps: { ...a.playerMaps, [i]: o } };
}
function R2(a, i, o, s, r) {
  const d = M2(a, i),
    m = d.icons.find((g) => g.x === o && g.y === s),
    v = d.icons.filter((g) => !(g.x === o && g.y === s)),
    _ = (m == null ? void 0 : m.iconId) === r ? v : [...v, { x: o, y: s, iconId: r }];
  return Ny(a, i, { ...d, icons: _ });
}
function j2(a, i, o, s) {
  const r = a.playerMaps[i];
  return r ? Ny(a, i, { ...r, icons: r.icons.filter((d) => !(d.x === o && d.y === s)) }) : a;
}
const O2 = () => {
    var ce;
    const a = fl(),
      { save: i, applySave: o, applyAndPersist: s } = fn(),
      r = T.useRef(null),
      [d, m] = T.useState(null),
      [v, _] = T.useState(!1),
      [g, y] = T.useState(!1),
      [b, A] = T.useState(null),
      j = (i == null ? void 0 : i.diveState) ?? null,
      S = T.useMemo(() => {
        var W;
        return i && j ? ((W = i.towerState.floors[j.depth]) == null ? void 0 : W.generated) : null;
      }, [i, j]),
      O = T.useMemo(() => {
        var W;
        return i && j
          ? (((W = i.towerState.floors[j.depth]) == null ? void 0 : W.foeRuntime) ?? [])
              .filter((F) => !F.defeated)
              .map((F) => ({ x: F.cell.x, y: F.cell.y, alerted: F.alerted }))
          : [];
      }, [i, j]),
      M = T.useMemo(() => (i ? Ty(i) : null), [i]),
      N = T.useMemo(() => (i ? x2(i) : !1), [i]),
      k = T.useMemo(() => {
        var W;
        return i && j
          ? (((W = i.towerState.floors[j.depth]) == null ? void 0 : W.depletedGathers) ?? [])
          : [];
      }, [i, j]),
      Y = T.useCallback(() => {
        var F;
        if (!i) return;
        r.current || (r.current = On((i.masterSeed ^ 2654435769) >>> 0));
        const W = k2(i, r.current);
        if (!W.ok) {
          A(
            W.reason === 'noSkill'
              ? '対応する採集スキルを持つ仲間がいない'
              : W.reason === 'foodFull'
                ? '食料がいっぱいで採れない'
                : '採集できない'
          );
          return;
        }
        (s(() => W.save),
          A(
            `${W.itemId ? (((F = nt[W.itemId]) == null ? void 0 : F.name) ?? '素材') : '素材'} を手に入れた`
          ));
      }, [i, s]),
      V = T.useCallback(
        (W) => {
          var he;
          if (!i) return;
          const F = T2(i, W);
          F.ok &&
            (s(() => F.save), A(`${((he = Ma[W]) == null ? void 0 : he.name) ?? '料理'} を作った`));
        },
        [i, s]
      ),
      Z = T.useCallback(
        (W) => {
          if (!i) return;
          (A(null), r.current || (r.current = On((i.masterSeed ^ 2654435769) >>> 0)));
          const F = $b(i, W, r.current);
          (s(() => F.save), F.triggered && a('/battle'));
        },
        [i, s, a]
      ),
      I = T.useCallback(
        (W) => {
          o((F) => my(F, W));
        },
        [o]
      ),
      Q = T.useCallback(async () => {
        if (!i) return;
        const W = hp(i);
        W === 'stairsUp'
          ? await s((F) => Vb(F))
          : W === 'stairsDown' &&
            (i.diveState.depth <= 1 ? (await s((F) => ji(F)), a('/town')) : await s((F) => Qb(F)));
      }, [i, s, a]),
      L = T.useCallback(async () => {
        (await s((W) => ji(W)), a('/town'));
      }, [s, a]),
      K = T.useCallback(
        (W, F) => {
          if (!i) return;
          const he = A2(i, W, F);
          he.ok && (s(() => he.save), he.save.diveState || (_(!1), a('/town')));
        },
        [i, s, a]
      ),
      ae = T.useCallback(
        (W, F) => {
          if (!j) return;
          const he = j.depth;
          if (d !== null) {
            if (!((i == null ? void 0 : i.exploredCells[he]) ?? []).includes(`${W},${F}`)) return;
            s(d === 'erase' ? (Ee) => j2(Ee, he, W, F) : (Ee) => R2(Ee, he, W, F, d));
            return;
          }
          const U = W - j.pos.x,
            J = F - j.pos.y,
            te = ['N', 'E', 'S', 'W'].find((ge) => Kt[ge].dx === U && Kt[ge].dy === J);
          te && Z(te);
        },
        [j, Z, d, i, s]
      );
    if (!i) return h.jsx(ol, { to: '/title', replace: !0 });
    if (!j || !S) return h.jsx(ol, { to: '/town', replace: !0 });
    const ue = hp(i);
    return h.jsxs('div', {
      className: me.layout,
      children: [
        h.jsxs('header', {
          className: me.head,
          children: [
            h.jsxs('div', { className: me.depth, children: [j.depth, 'F'] }),
            h.jsx(y2, { level: Nb(j.encounter.stepsUntilEncounter) }),
            h.jsx('button', {
              type: 'button',
              className: me.return,
              onClick: () => _(!0),
              children: '道具',
            }),
            h.jsx('button', {
              type: 'button',
              className: me.return,
              onClick: () => void L(),
              children: '帰還',
            }),
          ],
        }),
        h.jsx('div', {
          className: me.fpvWrap,
          children: h.jsx(S2, { floor: S, pos: j.pos, dir: j.dir, foes: O }),
        }),
        h.jsx('div', {
          className: me.mapWrap,
          children: h.jsx(o2, {
            floor: S,
            explored: i.exploredCells[j.depth] ?? [],
            pos: j.pos,
            dir: j.dir,
            icons: ((ce = i.playerMaps[j.depth]) == null ? void 0 : ce.icons) ?? [],
            foes: O,
            depletedGathers: k,
            onCellClick: ae,
          }),
        }),
        h.jsxs('div', {
          className: me.palette,
          children: [
            h.jsx('button', {
              type: 'button',
              className: `${me.tool} ${d === null ? me.toolActive : ''}`,
              onClick: () => m(null),
              'aria-label': '移動モード',
              children: '🚶',
            }),
            Sy.map((W) =>
              h.jsx(
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
            h.jsx('button', {
              type: 'button',
              className: `${me.tool} ${d === 'erase' ? me.toolActive : ''}`,
              onClick: () => m('erase'),
              'aria-label': '消しゴム',
              children: '🧽',
            }),
          ],
        }),
        h.jsx('p', {
          className: me.paletteHint,
          children:
            d === null
              ? '隣接マスをタップで移動。アイコンを選ぶとマップに書き込めます。'
              : d === 'erase'
                ? 'マップ上のマスをタップでアイコンを消去。'
                : 'マップ上の探索済みマスをタップでアイコンを配置（再タップで消去）。',
        }),
        ue &&
          h.jsx('button', {
            type: 'button',
            className: me.stairs,
            onClick: () => void Q(),
            children:
              ue === 'stairsUp'
                ? '▲ 次の階へ進む'
                : j.depth <= 1
                  ? '▼ 拠点へ戻る'
                  : '▼ 前の階へ戻る',
          }),
        M &&
          h.jsx('button', {
            type: 'button',
            className: me.action,
            disabled: yr(i, M) || !Ep(i, M),
            onClick: Y,
            children: yr(i, M)
              ? `🌿 ${Rn[M.type].name}（採集済み）`
              : Ep(i, M)
                ? `🌿 ${Rn[M.type].name}する`
                : `🌿 ${Rn[M.type].name}（スキル要）`,
          }),
        N &&
          h.jsx('button', {
            type: 'button',
            className: me.action,
            onClick: () => y(!0),
            children: '🍳 調理する',
          }),
        b && h.jsx('p', { className: me.notice, children: b }),
        h.jsxs('div', {
          className: me.controls,
          children: [
            h.jsxs('div', {
              className: me.row,
              children: [
                h.jsx('button', {
                  type: 'button',
                  className: me.turn,
                  onClick: () => I(oy(j.dir)),
                  'aria-label': '左を向く',
                  children: '↰',
                }),
                h.jsx('button', {
                  type: 'button',
                  className: me.forward,
                  onClick: () => Z(j.dir),
                  children: '前進',
                }),
                h.jsx('button', {
                  type: 'button',
                  className: me.turn,
                  onClick: () => I(cy(j.dir)),
                  'aria-label': '右を向く',
                  children: '↱',
                }),
              ],
            }),
            h.jsx('button', {
              type: 'button',
              className: me.back,
              onClick: () => I(kb(j.dir)),
              'aria-label': '振り向く',
              children: '↻ 振り向く',
            }),
          ],
        }),
        v
          ? h.jsx('div', {
              className: me.itemOverlay,
              onClick: () => _(!1),
              children: h.jsxs('div', {
                className: me.itemPanel,
                onClick: (W) => W.stopPropagation(),
                children: [
                  h.jsx('div', { className: me.itemTitle, children: 'どうぐ・食料' }),
                  (() => {
                    const W = [...i.guild.storage, ...(i.guild.foodStorage ?? [])].filter((F) => {
                      var he, U;
                      return (
                        ((U = (he = nt[F.itemId]) == null ? void 0 : he.useContext) == null
                          ? void 0
                          : U.includes('field')) && F.qty > 0
                      );
                    });
                    return W.length === 0
                      ? h.jsx('p', {
                          className: me.itemEmpty,
                          children: '使える道具がありません。',
                        })
                      : W.map((F) => {
                          const he = nt[F.itemId],
                            U = F.itemId === 'item_return_thread';
                          return h.jsxs(
                            'div',
                            {
                              className: me.itemRow,
                              children: [
                                h.jsxs('div', {
                                  className: me.itemName,
                                  children: [
                                    he.name,
                                    ' ×',
                                    F.qty,
                                    h.jsx('span', {
                                      className: me.itemDesc,
                                      children: he.description,
                                    }),
                                  ],
                                }),
                                U
                                  ? h.jsx('button', {
                                      type: 'button',
                                      className: me.itemUse,
                                      onClick: () => K(F.itemId),
                                      children: '使う',
                                    })
                                  : h.jsx('div', {
                                      className: me.itemTargets,
                                      children: j.party.map((J) => {
                                        const te = i.guild.members.find((Ee) => Ee.id === J.charId);
                                        if (!te) return null;
                                        const ge = Di(te);
                                        return h.jsxs(
                                          'button',
                                          {
                                            type: 'button',
                                            className: me.itemTarget,
                                            onClick: () => K(F.itemId, J.charId),
                                            children: [
                                              te.name,
                                              h.jsxs('span', {
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
                  h.jsx('button', {
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
          ? h.jsx('div', {
              className: me.itemOverlay,
              onClick: () => y(!1),
              children: h.jsxs('div', {
                className: me.itemPanel,
                onClick: (W) => W.stopPropagation(),
                children: [
                  h.jsx('div', { className: me.itemTitle, children: '調理' }),
                  (() => {
                    const W = E2(i);
                    return W.length === 0
                      ? h.jsx('p', {
                          className: me.itemEmpty,
                          children: '作れるレシピがありません。',
                        })
                      : W.map((F) => {
                          var J;
                          const he = xy(i, F.id),
                            U = F.ingredients
                              .map((te) => {
                                var ge;
                                return `${((ge = nt[te.itemId]) == null ? void 0 : ge.name) ?? te.itemId}×${te.qty}`;
                              })
                              .join(' ＋ ');
                          return h.jsxs(
                            'div',
                            {
                              className: me.itemRow,
                              children: [
                                h.jsxs('div', {
                                  className: me.itemName,
                                  children: [
                                    F.name,
                                    h.jsxs('span', {
                                      className: me.itemDesc,
                                      children: [
                                        U,
                                        ' → ',
                                        ((J = nt[F.result.itemId]) == null ? void 0 : J.name) ??
                                          F.result.itemId,
                                        '（所持',
                                        F.ingredients
                                          .map((te) => {
                                            var ge;
                                            return `${((ge = nt[te.itemId]) == null ? void 0 : ge.name) ?? ''}${jr(i, te.itemId)}`;
                                          })
                                          .join('・'),
                                        '）',
                                      ],
                                    }),
                                  ],
                                }),
                                h.jsx('button', {
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
                  h.jsx('button', {
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
  w2 = '_layout_34t9v_1',
  z2 = '_head_34t9v_11',
  D2 = '_title_34t9v_18',
  B2 = '_stock_34t9v_24',
  U2 = '_tabs_34t9v_29',
  L2 = '_tab_34t9v_29',
  q2 = '_tabActive_34t9v_46',
  H2 = '_hint_34t9v_51',
  G2 = '_list_34t9v_57',
  Y2 = '_row_34t9v_65',
  $2 = '_info_34t9v_76',
  X2 = '_name_34t9v_82',
  V2 = '_note_34t9v_87',
  Q2 = '_actions_34t9v_92',
  Z2 = '_ingot_34t9v_97',
  K2 = '_recycle_34t9v_114',
  I2 = '_maxed_34t9v_126',
  J2 = '_empty_34t9v_132',
  W2 = '_foot_34t9v_137',
  F2 = '_back_34t9v_141',
  Je = {
    layout: w2,
    head: z2,
    title: D2,
    stock: B2,
    tabs: U2,
    tab: L2,
    tabActive: q2,
    hint: H2,
    list: G2,
    row: Y2,
    info: $2,
    name: X2,
    note: V2,
    actions: Q2,
    ingot: Z2,
    recycle: K2,
    maxed: I2,
    empty: J2,
    foot: W2,
    back: F2,
  },
  P2 = () => {
    const a = fl(),
      { save: i, applyAndPersist: o } = fn(),
      [s, r] = T.useState('forge');
    if (!i) return h.jsx(ol, { to: '/title', replace: !0 });
    const { copper: d, silver: m, gold: v } = i.forgeInventory.ingots,
      _ = i.forgeInventory.fragments.common ?? 0,
      g = i.guild.equipment,
      y = (b, A, j, S) =>
        h.jsxs('button', {
          type: 'button',
          className: Je.ingot,
          disabled: S <= 0,
          onClick: () => void o((O) => ab(O, b, A).save),
          children: [j, '+', cl.INGOT_INC[A], '（', S, '）'],
        });
    return h.jsxs('div', {
      className: Je.layout,
      children: [
        h.jsxs('header', {
          className: Je.head,
          children: [
            h.jsx('h1', { className: Je.title, children: '鍛冶屋' }),
            h.jsxs('span', {
              className: Je.stock,
              children: ['銅', d, '・銀', m, '・金', v, '／断片', _],
            }),
          ],
        }),
        h.jsxs('div', {
          className: Je.tabs,
          children: [
            h.jsx('button', {
              type: 'button',
              className: `${Je.tab} ${s === 'forge' ? Je.tabActive : ''}`,
              onClick: () => r('forge'),
              children: '強化',
            }),
            h.jsx('button', {
              type: 'button',
              className: `${Je.tab} ${s === 'recycle' ? Je.tabActive : ''}`,
              onClick: () => r('recycle'),
              children: 'リサイクル',
            }),
          ],
        }),
        h.jsx('p', {
          className: Je.hint,
          children:
            s === 'forge'
              ? 'インゴットで装備を強化（最大 +5）。銅+1・銀+3・金+5。'
              : '不要な装備を断片に変換。断片10個で銅インゴット1個になる。',
        }),
        h.jsx('div', {
          className: Je.list,
          children:
            g.length === 0
              ? h.jsx('p', { className: Je.empty, children: '所有している装備がありません。' })
              : g.map((b) => {
                  const A = mt[b.masterId],
                    j = b.forgeLevel >= cl.MAX_LEVEL;
                  return h.jsxs(
                    'div',
                    {
                      className: Je.row,
                      children: [
                        h.jsxs('div', {
                          className: Je.info,
                          children: [
                            h.jsx('span', { className: Je.name, children: os(b) }),
                            h.jsx('span', {
                              className: Je.note,
                              children: A == null ? void 0 : A.slot,
                            }),
                          ],
                        }),
                        s === 'forge'
                          ? h.jsx('div', {
                              className: Je.actions,
                              children: j
                                ? h.jsx('span', { className: Je.maxed, children: '最大強化' })
                                : h.jsxs(h.Fragment, {
                                    children: [
                                      y(b.id, 'copper', '銅', d),
                                      y(b.id, 'silver', '銀', m),
                                      y(b.id, 'gold', '金', v),
                                    ],
                                  }),
                            })
                          : h.jsxs('button', {
                              type: 'button',
                              className: Je.recycle,
                              onClick: () => void o((S) => ib(S, b.id).save),
                              children: ['分解（断片+', cl.RECYCLE_FRAGMENTS, '）'],
                            }),
                      ],
                    },
                    b.id
                  );
                }),
        }),
        h.jsx('footer', {
          className: Je.foot,
          children: h.jsx('button', {
            type: 'button',
            className: Je.back,
            onClick: () => a('/town'),
            children: '拠点へ戻る',
          }),
        }),
      ],
    });
  },
  ex = '_layout_16au8_2',
  tx = '_head_16au8_13',
  lx = '_title_16au8_20',
  nx = '_count_16au8_26',
  ax = '_create_16au8_31',
  ix = '_sectionTitle_16au8_42',
  ux = '_field_16au8_48',
  sx = '_primary_16au8_64',
  cx = '_list_16au8_79',
  ox = '_empty_16au8_83',
  rx = '_members_16au8_88',
  fx = '_member_16au8_88',
  dx = '_memberMain_16au8_107',
  mx = '_memberName_16au8_119',
  hx = '_pos_16au8_127',
  px = '_memberSub_16au8_144',
  yx = '_posBtns_16au8_149',
  gx = '_posBtn_16au8_149',
  _x = '_posBtnActive_16au8_164',
  vx = '_foot_16au8_170',
  bx = '_sub_16au8_174',
  we = {
    layout: ex,
    head: tx,
    title: lx,
    count: nx,
    create: ax,
    sectionTitle: ix,
    field: ux,
    primary: sx,
    list: cx,
    empty: ox,
    members: rx,
    member: fx,
    memberMain: dx,
    memberName: mx,
    pos: hx,
    pos_前衛: '_pos_前衛_16au8_136',
    pos_後衛: '_pos_後衛_16au8_140',
    memberSub: px,
    posBtns: yx,
    posBtn: gx,
    posBtnActive: _x,
    foot: vx,
    sub: bx,
  };
function Sx(a) {
  return [...a.guild.party.front, ...a.guild.party.back].filter((i) => i !== null).length;
}
const ky = (a) => (a === 'front' ? ys : gs);
function xx(a, i, o, s) {
  if (o < 0 || o >= ky(i) || (s !== null && !a.guild.members.some((m) => m.id === s))) return a;
  const r = a.guild.party.front.map((m) => (m === s ? null : m)),
    d = a.guild.party.back.map((m) => (m === s ? null : m));
  for (; r.length < ys; ) r.push(null);
  for (; d.length < gs; ) d.push(null);
  return (
    i === 'front' ? (r[o] = s) : (d[o] = s),
    { ...a, guild: { ...a.guild, party: { front: r, back: d } } }
  );
}
function Ay(a, i) {
  const o = a.guild.party.front.map((r) => (r === i ? null : r)),
    s = a.guild.party.back.map((r) => (r === i ? null : r));
  return { ...a, guild: { ...a.guild, party: { front: o, back: s } } };
}
function Tp(a, i, o) {
  if (
    !a.guild.members.some((v) => v.id === i) ||
    (o === 'front' ? a.guild.party.front : a.guild.party.back).includes(i)
  )
    return a;
  const r = Ay(a, i),
    d = o === 'front' ? r.guild.party.front : r.guild.party.back;
  let m = d.indexOf(null);
  if (m < 0)
    if (d.length < ky(o)) m = d.length;
    else return a;
  return xx(r, o, m, i);
}
function Ex(a, i) {
  return a.guild.party.front.includes(i)
    ? '前衛'
    : a.guild.party.back.includes(i)
      ? '後衛'
      : '控え';
}
const Tx = () => {
    const a = fl(),
      { save: i, applyAndPersist: o } = fn(),
      s = Object.keys(It),
      r = Object.keys(yt),
      [d, m] = T.useState(''),
      [v, _] = T.useState(s[0]),
      [g, y] = T.useState(r[0]),
      [b, A] = T.useState(!1),
      j = T.useCallback(async () => {
        const M = d.trim() || '名もなき冒険者',
          N = py({ raceId: v, classId: g, name: M });
        (A(!0), await o((k) => nS(k, N)), m(''), A(!1));
      }, [d, v, g, o]);
    if (!i) return h.jsx(ol, { to: '/title', replace: !0 });
    const { members: S } = i.guild,
      O = S.length >= sr;
    return h.jsxs('div', {
      className: we.layout,
      children: [
        h.jsxs('header', {
          className: we.head,
          children: [
            h.jsx('h1', { className: we.title, children: 'ギルド管理' }),
            h.jsxs('span', { className: we.count, children: ['団員 ', S.length, ' / ', sr] }),
          ],
        }),
        h.jsxs('section', {
          className: we.create,
          children: [
            h.jsx('h2', { className: we.sectionTitle, children: '冒険者を作成' }),
            h.jsxs('label', {
              className: we.field,
              children: [
                h.jsx('span', { children: '名前' }),
                h.jsx('input', {
                  type: 'text',
                  value: d,
                  maxLength: 16,
                  placeholder: '名もなき冒険者',
                  onChange: (M) => m(M.target.value),
                }),
              ],
            }),
            h.jsxs('label', {
              className: we.field,
              children: [
                h.jsx('span', { children: '種族' }),
                h.jsx('select', {
                  value: v,
                  onChange: (M) => _(M.target.value),
                  children: s.map((M) => h.jsx('option', { value: M, children: It[M].name }, M)),
                }),
              ],
            }),
            h.jsxs('label', {
              className: we.field,
              children: [
                h.jsx('span', { children: '職業' }),
                h.jsx('select', {
                  value: g,
                  onChange: (M) => y(M.target.value),
                  children: r.map((M) => h.jsx('option', { value: M, children: yt[M].name }, M)),
                }),
              ],
            }),
            h.jsx('button', {
              type: 'button',
              className: we.primary,
              disabled: b || O,
              onClick: () => void j(),
              children: O ? '団員が上限です' : '作成する',
            }),
          ],
        }),
        h.jsxs('section', {
          className: we.list,
          children: [
            h.jsxs('h2', {
              className: we.sectionTitle,
              children: [
                '団員一覧',
                ' ',
                h.jsxs('span', {
                  className: we.count,
                  children: ['（出撃 ', Sx(i), ' / ', I1, '）'],
                }),
              ],
            }),
            S.length === 0
              ? h.jsx('p', { className: we.empty, children: 'まだ冒険者がいません。' })
              : h.jsx('ul', {
                  className: we.members,
                  children: S.map((M) => {
                    var k, Y;
                    const N = Ex(i, M.id);
                    return h.jsxs(
                      'li',
                      {
                        className: we.member,
                        children: [
                          h.jsxs('button', {
                            type: 'button',
                            className: we.memberMain,
                            onClick: () => a(`/guild/char/${M.id}`),
                            children: [
                              h.jsxs('span', {
                                className: we.memberName,
                                children: [
                                  M.name,
                                  h.jsx('span', {
                                    className: `${we.pos} ${we[`pos_${N}`] ?? ''}`,
                                    children: N,
                                  }),
                                ],
                              }),
                              h.jsxs('span', {
                                className: we.memberSub,
                                children: [
                                  (k = It[M.raceId]) == null ? void 0 : k.name,
                                  ' / ',
                                  (Y = yt[M.classId]) == null ? void 0 : Y.name,
                                  ' / Lv',
                                  M.level,
                                  ' ›',
                                ],
                              }),
                            ],
                          }),
                          h.jsxs('div', {
                            className: we.posBtns,
                            children: [
                              h.jsx('button', {
                                type: 'button',
                                className: `${we.posBtn} ${N === '前衛' ? we.posBtnActive : ''}`,
                                onClick: () => void o((V) => Tp(V, M.id, 'front')),
                                children: '前',
                              }),
                              h.jsx('button', {
                                type: 'button',
                                className: `${we.posBtn} ${N === '後衛' ? we.posBtnActive : ''}`,
                                onClick: () => void o((V) => Tp(V, M.id, 'back')),
                                children: '後',
                              }),
                              h.jsx('button', {
                                type: 'button',
                                className: `${we.posBtn} ${N === '控え' ? we.posBtnActive : ''}`,
                                onClick: () => void o((V) => Ay(V, M.id)),
                                children: '控',
                              }),
                            ],
                          }),
                        ],
                      },
                      M.id
                    );
                  }),
                }),
          ],
        }),
        h.jsx('footer', {
          className: we.foot,
          children: h.jsx('button', {
            type: 'button',
            className: we.sub,
            onClick: () => a('/town'),
            children: '拠点へ戻る',
          }),
        }),
      ],
    });
  },
  Nx = '_layout_tw23z_1',
  kx = '_head_tw23z_12',
  Ax = '_title_tw23z_16',
  Cx = '_sub_tw23z_22',
  Mx = '_card_tw23z_27',
  Rx = '_h2_tw23z_35',
  jx = '_sp_tw23z_44',
  Ox = '_stats_tw23z_50',
  wx = '_equipSlot_tw23z_74',
  zx = '_equipHead_tw23z_82',
  Dx = '_slotLabel_tw23z_88',
  Bx = '_equipName_tw23z_95',
  Ux = '_smallBtn_tw23z_100',
  Lx = '_equipPick_tw23z_110',
  qx = '_pickBtn_tw23z_118',
  Hx = '_skills_tw23z_128',
  Gx = '_skill_tw23z_128',
  Yx = '_skillInfo_tw23z_143',
  $x = '_skillName_tw23z_150',
  Xx = '_skillLv_tw23z_158',
  Vx = '_skillDesc_tw23z_164',
  Qx = '_learnBtn_tw23z_169',
  Zx = '_jobRow_tw23z_185',
  Kx = '_select_tw23z_192',
  Ix = '_input_tw23z_193',
  Jx = '_actBtn_tw23z_203',
  Wx = '_warn_tw23z_220',
  Fx = '_titleHave_tw23z_227',
  Px = '_titleOpts_tw23z_233',
  eE = '_titleBtn_tw23z_240',
  tE = '_rbForm_tw23z_252',
  lE = '_danger_tw23z_258',
  nE = '_foot_tw23z_270',
  aE = '_back_tw23z_274',
  fe = {
    layout: Nx,
    head: kx,
    title: Ax,
    sub: Cx,
    card: Mx,
    h2: Rx,
    sp: jx,
    stats: Ox,
    equipSlot: wx,
    equipHead: zx,
    slotLabel: Dx,
    equipName: Bx,
    smallBtn: Ux,
    equipPick: Lx,
    pickBtn: qx,
    skills: Hx,
    skill: Gx,
    skillInfo: Yx,
    skillName: $x,
    skillLv: Xx,
    skillDesc: Vx,
    learnBtn: Qx,
    jobRow: Zx,
    select: Kx,
    input: Ix,
    actBtn: Jx,
    warn: Wx,
    titleHave: Fx,
    titleOpts: Px,
    titleBtn: eE,
    rbForm: tE,
    danger: lE,
    foot: nE,
    back: aE,
  },
  Cy = ['weapon', 'armor', 'accessory'];
function My(a, i, o) {
  return { ...a, guild: { ...a.guild, members: a.guild.members.map((s) => (s.id === i ? o : s)) } };
}
function iE(a) {
  var i, o;
  return (o = (i = yt[a]) == null ? void 0 : i.skillTree.skills[0]) == null ? void 0 : o.skillId;
}
function uE(a) {
  var i;
  return new Set(
    (((i = It[a]) == null ? void 0 : i.raceSkillTree.skills) ?? []).map((o) => o.skillId)
  );
}
const sE = (a) => Object.values(a).reduce((i, o) => i + o, 0);
function cE(a, i) {
  if (!yt[i]) return a;
  const o = uE(a.raceId);
  let s = {};
  for (const [_, g] of Object.entries(a.learnedSkills)) o.has(_) && (s[_] = g);
  const r = iE(i);
  r && !s[r] && (s[r] = 1);
  const d = Math.max(1, a.level - Qp),
    m = Be.SP_PER_LEVEL * Math.max(0, d - 1);
  let v = sE(s) - (r && s[r] ? 1 : 0);
  return (
    v > m && ((s = r ? { [r]: 1 } : {}), (v = 0)),
    {
      ...a,
      classId: i,
      titleId: null,
      level: d,
      exp: 0,
      learnedSkills: s,
      skillPoints: { total: m, spent: v },
    }
  );
}
function oE(a, i, o) {
  const s = a.guild.members.find((m) => m.id === i);
  if (!s) return a;
  let r = My(a, i, cE(s, o));
  const d = r.guild.members.find((m) => m.id === i);
  for (const m of Cy) {
    const v = d.equipment[m];
    v && !Or(d, v.masterId) && (r = wr(r, i, m));
  }
  return r;
}
const rE = [
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
function fE(a) {
  const i = rE.find((o) => a >= o.min && a <= o.max);
  return i ? { allStats: i.allStats, bonusSp: i.bonusSp } : null;
}
function Ry(a) {
  return a.level >= Ai.REBIRTH_MIN_LEVEL;
}
function dE(a, i) {
  const o = fE(a.level);
  if (!o) return a;
  const s = Math.min(30, Math.floor(a.level / 2)),
    r = py({ ...i, id: a.id }),
    d = Be.SP_PER_LEVEL * Math.max(0, s - 1) + o.bonusSp;
  return {
    ...r,
    level: Math.max(1, s),
    exp: 0,
    rebirthBonus: o,
    skillPoints: { total: d, spent: r.skillPoints.spent },
  };
}
function mE(a, i, o) {
  const s = a.guild.members.find((m) => m.id === i);
  if (!s || !Ry(s)) return a;
  let r = a;
  for (const m of Cy) s.equipment[m] && (r = wr(r, i, m));
  const d = r.guild.members.find((m) => m.id === i);
  return My(r, i, dE(d, o));
}
function jy(a, i, o) {
  var r;
  return o < Ai.TITLE_DEPTH || a.titleId
    ? !1
    : (((r = yt[a.classId]) == null ? void 0 : r.titleOptions) ?? []).includes(i);
}
function hE(a, i, o) {
  return jy(a, i, o)
    ? { ...a, titleId: i, skillPoints: { ...a.skillPoints, total: a.skillPoints.total + J1 } }
    : a;
}
function Oy(a) {
  var o, s;
  const i = [
    ...(((o = yt[a.classId]) == null ? void 0 : o.skillTree.skills) ?? []),
    ...(((s = It[a.raceId]) == null ? void 0 : s.raceSkillTree.skills) ?? []),
  ];
  return (a.titleId && Ea[a.titleId] && i.push(...Ea[a.titleId].skillTree.skills), i);
}
function bs(a, i) {
  return a.learnedSkills[i] ?? 0;
}
function wy(a) {
  return a.skillPoints.total - a.skillPoints.spent;
}
function pE(a, i) {
  return (i.requires ?? []).every((o) => bs(a, o.skillId) >= o.level);
}
function zy(a, i) {
  const o = Oy(a).find((s) => s.skillId === i);
  return !o || bs(a, i) >= o.maxLevel || wy(a) <= 0 ? !1 : pE(a, o);
}
function yE(a, i) {
  return zy(a, i)
    ? {
        ...a,
        learnedSkills: { ...a.learnedSkills, [i]: bs(a, i) + 1 },
        skillPoints: { ...a.skillPoints, spent: a.skillPoints.spent + 1 },
      }
    : a;
}
const Np = Object.keys(It),
  ts = Object.keys(yt),
  gE = ['weapon', 'armor', 'accessory'],
  _E = { weapon: '武器', armor: '防具', accessory: '装飾' },
  vE = [
    { key: 'hp', label: 'HP' },
    { key: 'tp', label: 'TP' },
    { key: 'str', label: 'STR' },
    { key: 'vit', label: 'VIT' },
    { key: 'agi', label: 'AGI' },
    { key: 'int', label: 'INT' },
    { key: 'mnd', label: 'MND' },
    { key: 'luc', label: 'LUC' },
  ],
  bE = () => {
    var V, Z, I, Q;
    const a = fl(),
      { id: i } = tv(),
      { save: o, applyAndPersist: s } = fn(),
      [r, d] = T.useState(ts[0]),
      [m, v] = T.useState(''),
      [_, g] = T.useState(Np[0]),
      [y, b] = T.useState(ts[0]),
      [A, j] = T.useState(!1);
    if (!o) return h.jsx(ol, { to: '/title', replace: !0 });
    const S = o.guild.members.find((L) => L.id === i);
    if (!S || !i) return h.jsx(ol, { to: '/guild', replace: !0 });
    const O = Di(S),
      M = wy(S),
      N = o.towerState.record.deepestReached,
      k = (L) =>
        s((K) => ({
          ...K,
          guild: { ...K.guild, members: K.guild.members.map((ae) => (ae.id === i ? L(ae) : ae)) },
        }));
    return h.jsxs('div', {
      className: fe.layout,
      children: [
        h.jsxs('header', {
          className: fe.head,
          children: [
            h.jsx('h1', { className: fe.title, children: S.name }),
            h.jsxs('span', {
              className: fe.sub,
              children: [
                (V = It[S.raceId]) == null ? void 0 : V.name,
                ' / ',
                (Z = yt[S.classId]) == null ? void 0 : Z.name,
                ' / Lv',
                S.level,
              ],
            }),
          ],
        }),
        h.jsxs('section', {
          className: fe.card,
          children: [
            h.jsx('h2', { className: fe.h2, children: 'ステータス' }),
            h.jsx('dl', {
              className: fe.stats,
              children: vE.map((L) =>
                h.jsxs(
                  'div',
                  {
                    children: [
                      h.jsx('dt', { children: L.label }),
                      h.jsx('dd', { children: O[L.key] }),
                    ],
                  },
                  L.key
                )
              ),
            }),
          ],
        }),
        h.jsxs('section', {
          className: fe.card,
          children: [
            h.jsx('h2', { className: fe.h2, children: '装備' }),
            gE.map((L) => {
              const K = S.equipment[L],
                ae = o.guild.equipment.filter((ue) => {
                  var ce;
                  return (
                    ((ce = mt[ue.masterId]) == null ? void 0 : ce.slot) === L && Or(S, ue.masterId)
                  );
                });
              return h.jsxs(
                'div',
                {
                  className: fe.equipSlot,
                  children: [
                    h.jsxs('div', {
                      className: fe.equipHead,
                      children: [
                        h.jsx('span', { className: fe.slotLabel, children: _E[L] }),
                        h.jsx('span', {
                          className: fe.equipName,
                          children: K ? os(K) : '（なし）',
                        }),
                        K
                          ? h.jsx('button', {
                              type: 'button',
                              className: fe.smallBtn,
                              onClick: () => void Y(L),
                              children: '外す',
                            })
                          : null,
                      ],
                    }),
                    ae.length > 0
                      ? h.jsx('div', {
                          className: fe.equipPick,
                          children: ae.map((ue) =>
                            h.jsxs(
                              'button',
                              {
                                type: 'button',
                                className: fe.pickBtn,
                                onClick: () => void s((ce) => cb(ce, i, ue.id)),
                                children: [os(ue), ' 装備'],
                              },
                              ue.id
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
        h.jsxs('section', {
          className: fe.card,
          children: [
            h.jsxs('h2', {
              className: fe.h2,
              children: ['スキル ', h.jsxs('span', { className: fe.sp, children: ['SP ', M] })],
            }),
            h.jsx('ul', {
              className: fe.skills,
              children: Oy(S).map((L) => {
                const K = bs(S, L.skillId),
                  ae = zy(S, L.skillId),
                  ue = Ar[L.skillId];
                return h.jsxs(
                  'li',
                  {
                    className: fe.skill,
                    children: [
                      h.jsxs('div', {
                        className: fe.skillInfo,
                        children: [
                          h.jsxs('span', {
                            className: fe.skillName,
                            children: [
                              (ue == null ? void 0 : ue.name) ?? L.skillId,
                              h.jsxs('span', {
                                className: fe.skillLv,
                                children: ['Lv ', K, '/', L.maxLevel],
                              }),
                            ],
                          }),
                          h.jsx('span', {
                            className: fe.skillDesc,
                            children: (ue == null ? void 0 : ue.description) ?? '',
                          }),
                        ],
                      }),
                      h.jsx('button', {
                        type: 'button',
                        className: fe.learnBtn,
                        disabled: !ae,
                        onClick: () => void k((ce) => yE(ce, L.skillId)),
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
        h.jsxs('section', {
          className: fe.card,
          children: [
            h.jsx('h2', { className: fe.h2, children: '転職' }),
            h.jsxs('div', {
              className: fe.jobRow,
              children: [
                h.jsx('select', {
                  className: fe.select,
                  value: r,
                  onChange: (L) => d(L.target.value),
                  children: ts.map((L) => h.jsx('option', { value: L, children: yt[L].name }, L)),
                }),
                h.jsx('button', {
                  type: 'button',
                  className: fe.actBtn,
                  disabled: r === S.classId,
                  onClick: () => void s((L) => oE(L, i, r)),
                  children: '転職する',
                }),
              ],
            }),
            h.jsxs('p', {
              className: fe.warn,
              children: [
                '※ レベルが ',
                Qp,
                ' ',
                '下がり、職業/称号スキルは振り直しになります（種族スキルは保持）。',
              ],
            }),
            h.jsx('h2', { className: fe.h2, children: '称号' }),
            S.titleId
              ? h.jsxs('p', {
                  className: fe.titleHave,
                  children: ['習得済み: ', (I = Ea[S.titleId]) == null ? void 0 : I.name],
                })
              : N < Ai.TITLE_DEPTH
                ? h.jsxs('p', {
                    className: fe.warn,
                    children: ['第 ', Ai.TITLE_DEPTH, ' 階到達で習得できます（現在 ', N, 'F）。'],
                  })
                : h.jsx('div', {
                    className: fe.titleOpts,
                    children: (((Q = yt[S.classId]) == null ? void 0 : Q.titleOptions) ?? []).map(
                      (L) => {
                        var K;
                        return h.jsxs(
                          'button',
                          {
                            type: 'button',
                            className: fe.titleBtn,
                            disabled: !jy(S, L, N),
                            onClick: () => void k((ae) => hE(ae, L, N)),
                            children: [(K = Ea[L]) == null ? void 0 : K.name, '（SP+5）'],
                          },
                          L
                        );
                      }
                    ),
                  }),
            h.jsx('h2', { className: fe.h2, children: '転生' }),
            Ry(S)
              ? A
                ? h.jsxs('div', {
                    className: fe.rbForm,
                    children: [
                      h.jsxs('p', {
                        className: fe.warn,
                        children: [
                          '※ 作り直して強い新人になります（開始Lv ',
                          Math.min(30, Math.floor(S.level / 2)),
                          '・ボーナス付き）。',
                        ],
                      }),
                      h.jsx('input', {
                        className: fe.input,
                        type: 'text',
                        maxLength: 16,
                        placeholder: S.name,
                        value: m,
                        onChange: (L) => v(L.target.value),
                      }),
                      h.jsxs('div', {
                        className: fe.jobRow,
                        children: [
                          h.jsx('select', {
                            className: fe.select,
                            value: _,
                            onChange: (L) => g(L.target.value),
                            children: Np.map((L) =>
                              h.jsx('option', { value: L, children: It[L].name }, L)
                            ),
                          }),
                          h.jsx('select', {
                            className: fe.select,
                            value: y,
                            onChange: (L) => b(L.target.value),
                            children: ts.map((L) =>
                              h.jsx('option', { value: L, children: yt[L].name }, L)
                            ),
                          }),
                        ],
                      }),
                      h.jsxs('div', {
                        className: fe.jobRow,
                        children: [
                          h.jsx('button', {
                            type: 'button',
                            className: fe.danger,
                            onClick: () => {
                              (s((L) =>
                                mE(L, i, { raceId: _, classId: y, name: m.trim() || S.name })
                              ),
                                j(!1));
                            },
                            children: '転生を実行',
                          }),
                          h.jsx('button', {
                            type: 'button',
                            className: fe.actBtn,
                            onClick: () => j(!1),
                            children: 'やめる',
                          }),
                        ],
                      }),
                    ],
                  })
                : h.jsx('button', {
                    type: 'button',
                    className: fe.actBtn,
                    onClick: () => j(!0),
                    children: '転生する…',
                  })
              : h.jsxs('p', {
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
        h.jsx('footer', {
          className: fe.foot,
          children: h.jsx('button', {
            type: 'button',
            className: fe.back,
            onClick: () => a('/guild'),
            children: 'もどる',
          }),
        }),
      ],
    });
    function Y(L) {
      return s((K) => wr(K, i, L));
    }
  },
  SE = () => h.jsx('div', { children: h.jsx('h1', { children: 'Not Found' }) }),
  xE = '_layout_1u0ua_1',
  EE = '_head_1u0ua_11',
  TE = '_title_1u0ua_18',
  NE = '_gold_1u0ua_24',
  kE = '_tabs_1u0ua_29',
  AE = '_tab_1u0ua_29',
  CE = '_tabActive_1u0ua_46',
  ME = '_list_1u0ua_51',
  RE = '_row_1u0ua_59',
  jE = '_info_1u0ua_70',
  OE = '_name_1u0ua_76',
  wE = '_note_1u0ua_81',
  zE = '_action_1u0ua_86',
  DE = '_empty_1u0ua_103',
  BE = '_foot_1u0ua_108',
  UE = '_back_1u0ua_112',
  He = {
    layout: xE,
    head: EE,
    title: TE,
    gold: NE,
    tabs: kE,
    tab: AE,
    tabActive: CE,
    list: ME,
    row: RE,
    info: jE,
    name: OE,
    note: wE,
    action: zE,
    empty: DE,
    foot: BE,
    back: UE,
  };
function LE(a) {
  return Math.max(0, Math.floor(a.towerState.record.deepestReached / 10));
}
const Dy = {
    item_slime_jelly: ['equip_slime_shield'],
    item_rat_tail: ['equip_rat_dagger'],
    item_bat_wing: ['equip_bat_cloak'],
    item_golem_core: ['equip_golem_blade'],
  },
  qE = (a) => {
    const i = mt[a].bonuses,
      o = [];
    return (
      i.atk && o.push(`ATK+${i.atk}`),
      i.mat && o.push(`MAT+${i.mat}`),
      i.def && o.push(`DEF+${i.def}`),
      i.mdf && o.push(`MDF+${i.mdf}`),
      o.join(' ')
    );
  };
function HE(a) {
  const i = LE(a),
    o = new Set(a.shopStock.unlockedItemIds),
    s = Object.values(nt)
      .filter((d) => d.buyPrice > 0)
      .map((d) => ({ id: d.id, name: d.name, price: d.buyPrice, kind: 'item' }));
  return [
    ...Object.values(mt)
      .filter((d) => d.tier <= i || o.has(d.id))
      .map((d) => ({ id: d.id, name: d.name, price: d.buyPrice, kind: 'equip', note: qE(d.id) })),
    ...s,
  ];
}
function GE(a) {
  return Dy[a] ?? [];
}
function YE(a) {
  var i, o;
  return (
    ((i = nt[a]) == null ? void 0 : i.buyPrice) ??
    ((o = mt[a]) == null ? void 0 : o.buyPrice) ??
    null
  );
}
function gr(a) {
  return nt[a] ? Q1(nt[a]) : mt[a] ? Math.floor(mt[a].buyPrice / 2) : 0;
}
function $E(a, i) {
  const o = YE(i);
  if (o === null || o <= 0 || a.guild.gold < o) return a;
  const s = mt[i] ? sb(a, i) : Mr(a, i, 1);
  return { ...s, guild: { ...s.guild, gold: s.guild.gold - o } };
}
function By(a) {
  var o;
  return (
    Math.floor((((o = mt[a.masterId]) == null ? void 0 : o.buyPrice) ?? 0) / 2) + a.forgeLevel * 10
  );
}
function XE(a, i) {
  const o = a.guild.equipment.find((d) => d.id === i);
  if (!o) return a;
  const s = By(o),
    r = a.guild.equipment.filter((d) => d.id !== i);
  return { ...a, guild: { ...a.guild, equipment: r, gold: a.guild.gold + s } };
}
function VE(a, i, o = 1) {
  var _;
  if ((((_ = a.guild.storage.find((g) => g.itemId === i)) == null ? void 0 : _.qty) ?? 0) < o)
    return a;
  const r = gr(i) * o,
    d = Rr(a, i, o),
    m = GE(i).filter((g) => !d.shopStock.unlockedItemIds.includes(g)),
    v = [...d.shopStock.unlockedItemIds, ...m];
  return {
    ...d,
    guild: { ...d.guild, gold: d.guild.gold + r },
    shopStock: { ...d.shopStock, unlockedItemIds: v },
  };
}
const QE = () => {
    const a = fl(),
      { save: i, applyAndPersist: o } = fn(),
      [s, r] = T.useState('buy');
    if (!i) return h.jsx(ol, { to: '/title', replace: !0 });
    const d = i.guild.gold,
      m = HE(i),
      v = i.guild.storage.filter((b) => gr(b.itemId) > 0),
      _ = i.guild.equipment,
      g = v.length === 0 && _.length === 0,
      y = (b) => {
        var A, j;
        return (
          ((A = nt[b]) == null ? void 0 : A.name) ?? ((j = mt[b]) == null ? void 0 : j.name) ?? b
        );
      };
    return h.jsxs('div', {
      className: He.layout,
      children: [
        h.jsxs('header', {
          className: He.head,
          children: [
            h.jsx('h1', { className: He.title, children: 'ショップ' }),
            h.jsxs('span', { className: He.gold, children: [d, ' G'] }),
          ],
        }),
        h.jsxs('div', {
          className: He.tabs,
          children: [
            h.jsx('button', {
              type: 'button',
              className: `${He.tab} ${s === 'buy' ? He.tabActive : ''}`,
              onClick: () => r('buy'),
              children: '買う',
            }),
            h.jsx('button', {
              type: 'button',
              className: `${He.tab} ${s === 'sell' ? He.tabActive : ''}`,
              onClick: () => r('sell'),
              children: '売る',
            }),
          ],
        }),
        h.jsx('div', {
          className: He.list,
          children:
            s === 'buy'
              ? m.map((b) =>
                  h.jsxs(
                    'div',
                    {
                      className: He.row,
                      children: [
                        h.jsxs('div', {
                          className: He.info,
                          children: [
                            h.jsx('span', { className: He.name, children: b.name }),
                            b.note ? h.jsx('span', { className: He.note, children: b.note }) : null,
                          ],
                        }),
                        h.jsxs('button', {
                          type: 'button',
                          className: He.action,
                          disabled: d < b.price,
                          onClick: () => void o((A) => $E(A, b.id)),
                          children: [b.price, ' G'],
                        }),
                      ],
                    },
                    b.id
                  )
                )
              : g
                ? h.jsx('p', { className: He.empty, children: '売れる物がありません。' })
                : h.jsxs(h.Fragment, {
                    children: [
                      _.map((b) =>
                        h.jsxs(
                          'div',
                          {
                            className: He.row,
                            children: [
                              h.jsxs('div', {
                                className: He.info,
                                children: [
                                  h.jsx('span', { className: He.name, children: os(b) }),
                                  h.jsx('span', { className: He.note, children: '装備' }),
                                ],
                              }),
                              h.jsxs('button', {
                                type: 'button',
                                className: He.action,
                                onClick: () => void o((A) => XE(A, b.id)),
                                children: ['売却 ', By(b), ' G'],
                              }),
                            ],
                          },
                          b.id
                        )
                      ),
                      v.map((b) =>
                        h.jsxs(
                          'div',
                          {
                            className: He.row,
                            children: [
                              h.jsxs('div', {
                                className: He.info,
                                children: [
                                  h.jsx('span', { className: He.name, children: y(b.itemId) }),
                                  h.jsxs('span', {
                                    className: He.note,
                                    children: ['所持 ', b.qty],
                                  }),
                                ],
                              }),
                              h.jsxs('button', {
                                type: 'button',
                                className: He.action,
                                onClick: () => void o((A) => VE(A, b.itemId, 1)),
                                children: ['売却 ', gr(b.itemId), ' G'],
                              }),
                            ],
                          },
                          b.itemId
                        )
                      ),
                    ],
                  }),
        }),
        h.jsx('footer', {
          className: He.foot,
          children: h.jsx('button', {
            type: 'button',
            className: He.back,
            onClick: () => a('/town'),
            children: '拠点へ戻る',
          }),
        }),
      ],
    });
  },
  ZE = '_layout_1xkiw_1',
  KE = '_head_1xkiw_12',
  IE = '_title_1xkiw_17',
  JE = '_subtitle_1xkiw_24',
  WE = '_body_1xkiw_30',
  FE = '_menu_1xkiw_34',
  PE = '_loading_1xkiw_40',
  eT = '_warn_1xkiw_45',
  tT = '_danger_1xkiw_52',
  lT = '_dialog_1xkiw_67',
  nT = '_dialogTitle_1xkiw_77',
  aT = '_field_1xkiw_82',
  iT = '_note_1xkiw_96',
  uT = '_dialogActions_1xkiw_102',
  sT = '_primary_1xkiw_107',
  cT = '_sub_1xkiw_24',
  oT = '_foot_1xkiw_132',
  Ze = {
    layout: ZE,
    head: KE,
    title: IE,
    subtitle: JE,
    body: WE,
    menu: FE,
    loading: PE,
    warn: eT,
    danger: tT,
    dialog: lT,
    dialogTitle: nT,
    field: aT,
    note: iT,
    dialogActions: uT,
    primary: sT,
    sub: cT,
    foot: oT,
  },
  rT = '_card_3vsn6_1',
  fT = '_corrupted_3vsn6_14',
  dT = '_corruptedText_3vsn6_19',
  mT = '_corruptedNote_3vsn6_25',
  hT = '_guildName_3vsn6_31',
  pT = '_meta_3vsn6_36',
  cn = {
    card: rT,
    corrupted: fT,
    corruptedText: dT,
    corruptedNote: mT,
    guildName: hT,
    meta: pT,
    continue: '_continue_3vsn6_56',
  },
  yT = (a) => {
    if (!a) return '-';
    const i = new Date(a),
      o = (s) => String(s).padStart(2, '0');
    return `${i.getFullYear()}/${o(i.getMonth() + 1)}/${o(i.getDate())} ${o(i.getHours())}:${o(i.getMinutes())}`;
  },
  gT = ({ meta: a, onContinue: i }) =>
    a.corrupted
      ? h.jsxs('div', {
          className: `${cn.card} ${cn.corrupted}`,
          children: [
            h.jsx('div', { className: cn.corruptedText, children: 'セーブデータが破損しています' }),
            h.jsx('p', {
              className: cn.corruptedNote,
              children: '「最初から」で新しく始められます。',
            }),
          ],
        })
      : h.jsxs('div', {
          className: cn.card,
          children: [
            h.jsx('div', { className: cn.guildName, children: a.guildName }),
            h.jsxs('dl', {
              className: cn.meta,
              children: [
                h.jsxs('div', {
                  children: [
                    h.jsx('dt', { children: '最高到達階' }),
                    h.jsx('dd', {
                      children: a.deepestReached > 0 ? `${a.deepestReached}F` : '未踏破',
                    }),
                  ],
                }),
                h.jsxs('div', {
                  children: [
                    h.jsx('dt', { children: '団員' }),
                    h.jsxs('dd', { children: [a.memberCount, '人'] }),
                  ],
                }),
                h.jsxs('div', {
                  children: [
                    h.jsx('dt', { children: '最終セーブ' }),
                    h.jsx('dd', { children: yT(a.savedAt) }),
                  ],
                }),
              ],
            }),
            h.jsx('button', {
              type: 'button',
              className: cn.continue,
              onClick: i,
              children: 'つづきから',
            }),
          ],
        }),
  _T = () => {
    const a = fl(),
      { startNewGame: i, continueGame: o } = fn(),
      [s, r] = T.useState(null),
      [d, m] = T.useState(!0),
      [v, _] = T.useState('menu'),
      [g, y] = T.useState(''),
      [b, A] = T.useState(!1);
    T.useEffect(() => {
      (async () => (r(await NS()), m(!1)))();
    }, []);
    const j = s !== null && !s.corrupted,
      S = T.useCallback(async () => {
        A(!0);
        const N = await o();
        (A(!1), N.ok && a('/town'));
      }, [o, a]),
      O = T.useCallback(() => {
        (y(''), _(j ? 'confirm' : 'guildName'));
      }, [j]),
      M = T.useCallback(async () => {
        const N = g.trim() || 'ななしのギルド';
        (A(!0), await i(N), A(!1), a('/town'));
      }, [g, i, a]);
    return h.jsxs('div', {
      className: Ze.layout,
      children: [
        h.jsxs('header', {
          className: Ze.head,
          children: [
            h.jsx('h1', { className: Ze.title, children: '世界樹ライク' }),
            h.jsx('p', { className: Ze.subtitle, children: '無限タワー探索 RPG' }),
          ],
        }),
        h.jsx('main', {
          className: Ze.body,
          children: d
            ? h.jsx('p', { className: Ze.loading, children: '読み込み中...' })
            : v === 'guildName'
              ? h.jsxs('div', {
                  className: Ze.dialog,
                  children: [
                    h.jsx('h2', { className: Ze.dialogTitle, children: '新しいギルド' }),
                    h.jsxs('label', {
                      className: Ze.field,
                      children: [
                        h.jsx('span', { children: 'ギルド名' }),
                        h.jsx('input', {
                          type: 'text',
                          value: g,
                          maxLength: 16,
                          placeholder: 'ななしのギルド',
                          onChange: (N) => y(N.target.value),
                          autoFocus: !0,
                        }),
                      ],
                    }),
                    h.jsx('p', {
                      className: Ze.note,
                      children:
                        '冒険者はまだいません。開始後、ギルドメニューで仲間を作成してください。',
                    }),
                    h.jsxs('div', {
                      className: Ze.dialogActions,
                      children: [
                        h.jsx('button', {
                          type: 'button',
                          className: Ze.primary,
                          disabled: b,
                          onClick: M,
                          children: 'はじめる',
                        }),
                        h.jsx('button', {
                          type: 'button',
                          className: Ze.sub,
                          disabled: b,
                          onClick: () => _('menu'),
                          children: 'もどる',
                        }),
                      ],
                    }),
                  ],
                })
              : v === 'confirm'
                ? h.jsxs('div', {
                    className: Ze.dialog,
                    children: [
                      h.jsx('h2', { className: Ze.dialogTitle, children: '最初から始めますか？' }),
                      h.jsxs('p', {
                        className: Ze.warn,
                        children: [
                          '現在のセーブデータ「',
                          s == null ? void 0 : s.guildName,
                          '」は上書きされ、元に戻せません。',
                        ],
                      }),
                      h.jsxs('div', {
                        className: Ze.dialogActions,
                        children: [
                          h.jsx('button', {
                            type: 'button',
                            className: Ze.danger,
                            disabled: b,
                            onClick: () => _('guildName'),
                            children: 'データを消して始める',
                          }),
                          h.jsx('button', {
                            type: 'button',
                            className: Ze.sub,
                            disabled: b,
                            onClick: () => _('menu'),
                            children: 'もどる',
                          }),
                        ],
                      }),
                    ],
                  })
                : h.jsxs('div', {
                    className: Ze.menu,
                    children: [
                      s !== null && h.jsx(gT, { meta: s, onContinue: () => void S() }),
                      h.jsx('button', {
                        type: 'button',
                        className: j ? Ze.sub : Ze.primary,
                        onClick: O,
                        children: '最初から',
                      }),
                    ],
                  }),
        }),
        h.jsxs('footer', { className: Ze.foot, children: ['v', '0.1.19'] }),
      ],
    });
  },
  vT = '_layout_1wdo2_1',
  bT = '_head_1wdo2_12',
  ST = '_guildName_1wdo2_16',
  xT = '_stats_1wdo2_21',
  ET = '_hint_1wdo2_40',
  TT = '_menu_1wdo2_50',
  NT = '_foot_1wdo2_57',
  kT = '_exit_1wdo2_61',
  on = { layout: vT, head: bT, guildName: ST, stats: xT, hint: ET, menu: TT, foot: NT, exit: kT },
  AT = '_button_1tp4a_1',
  CT = '_primary_1tp4a_26',
  MT = '_label_1tp4a_32',
  RT = '_description_1tp4a_37',
  ls = { button: AT, primary: CT, label: MT, description: RT },
  ki = ({ label: a, description: i, variant: o = 'default', disabled: s = !1, onClick: r }) =>
    h.jsxs('button', {
      type: 'button',
      className: `${ls.button} ${o === 'primary' ? ls.primary : ''}`,
      disabled: s,
      onClick: r,
      children: [
        h.jsx('span', { className: ls.label, children: a }),
        i ? h.jsx('span', { className: ls.description, children: i }) : null,
      ],
    }),
  jT = () => {
    const a = fl(),
      { save: i, exitToTitle: o, applyAndPersist: s } = fn();
    if (!i) return h.jsx(ol, { to: '/title', replace: !0 });
    const { guild: r, towerState: d, diveState: m } = i,
      v = r.members.length > 0,
      _ = () => {
        (o(), a('/title'));
      },
      g = async () => {
        (m || (await s((y) => Yb(y, 1))), a('/dungeon'));
      };
    return h.jsxs('div', {
      className: on.layout,
      children: [
        h.jsxs('header', {
          className: on.head,
          children: [
            h.jsx('div', { className: on.guildName, children: r.name }),
            h.jsxs('dl', {
              className: on.stats,
              children: [
                h.jsxs('div', {
                  children: [
                    h.jsx('dt', { children: '所持金' }),
                    h.jsxs('dd', { children: [r.gold, ' G'] }),
                  ],
                }),
                h.jsxs('div', {
                  children: [
                    h.jsx('dt', { children: '最高到達' }),
                    h.jsx('dd', {
                      children: d.record.deepestReached > 0 ? `${d.record.deepestReached}F` : '-',
                    }),
                  ],
                }),
                h.jsxs('div', {
                  children: [
                    h.jsx('dt', { children: '団員' }),
                    h.jsxs('dd', { children: [r.members.length, '人'] }),
                  ],
                }),
              ],
            }),
          ],
        }),
        !v &&
          h.jsx('p', {
            className: on.hint,
            children:
              'まずは「ギルド管理」で冒険者を作成してください。団員がいないとダイブできません。',
          }),
        h.jsxs('main', {
          className: on.menu,
          children: [
            h.jsx(ki, {
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
            h.jsx(ki, {
              label: 'ギルド管理',
              description: '編成・キャラ作成',
              onClick: () => a('/guild'),
            }),
            h.jsx(ki, {
              label: 'ショップ',
              description: '装備・アイテム売買',
              onClick: () => a('/shop'),
            }),
            h.jsx(ki, {
              label: '鍛冶屋',
              description: '装備の強化・リサイクル',
              onClick: () => a('/forge'),
            }),
            h.jsx(ki, {
              label: '図鑑 / 記録',
              description: '到達記録・図鑑（Phase 4-5）',
              disabled: !0,
            }),
          ],
        }),
        h.jsx('footer', {
          className: on.foot,
          children: h.jsx('button', {
            type: 'button',
            className: on.exit,
            onClick: _,
            children: 'タイトルへ戻る',
          }),
        }),
      ],
    });
  };
function OT() {
  return h.jsxs(yv, {
    children: [
      h.jsx(Pt, { path: '/', element: h.jsx(ol, { to: '/title', replace: !0 }) }),
      h.jsx(Pt, { path: '/title', element: h.jsx(_T, {}) }),
      h.jsx(Pt, { path: '/town', element: h.jsx(jT, {}) }),
      h.jsx(Pt, { path: '/guild', element: h.jsx(Tx, {}) }),
      h.jsx(Pt, { path: '/guild/char/:id', element: h.jsx(bE, {}) }),
      h.jsx(Pt, { path: '/shop', element: h.jsx(QE, {}) }),
      h.jsx(Pt, { path: '/forge', element: h.jsx(P2, {}) }),
      h.jsx(Pt, { path: '/dungeon', element: h.jsx(O2, {}) }),
      h.jsx(Pt, { path: '/battle', element: h.jsx(MS, {}) }),
      h.jsx(Pt, { path: '*', element: h.jsx(SE, {}) }),
    ],
  });
}
const wT = {
    races: It,
    classes: yt,
    titles: Ea,
    skills: Ar,
    unionSkills: Sa,
    summons: Ca,
    gatherTypes: Rn,
    recipes: Ma,
    enemies: wn,
    items: nt,
    equipment: mt,
  },
  zT = /^[a-z]+_[a-z0-9_]+$/;
function sl(a, i, o) {
  for (const s of i)
    zT.test(s) || o.push(`[${a}] ID 命名規約違反: "${s}"（期待: <domain>_<name>）`);
}
function ar(a, i, o, s) {
  const r = new Set(i.skills.map((d) => d.skillId));
  for (const d of i.skills) {
    o.has(d.skillId) || s.push(`[${a}] 未定義スキルを参照: "${d.skillId}"`);
    for (const m of d.requires ?? [])
      r.has(m.skillId) ||
        s.push(`[${a}] スキル "${d.skillId}" の前提 "${m.skillId}" が同ツリーに存在しない`);
  }
}
function DT() {
  var M;
  const a = [],
    {
      races: i,
      classes: o,
      titles: s,
      skills: r,
      unionSkills: d,
      summons: m,
      gatherTypes: v,
      recipes: _,
      enemies: g,
      items: y,
      equipment: b,
    } = wT;
  (sl('races', Object.keys(i), a),
    sl('classes', Object.keys(o), a),
    sl('titles', Object.keys(s), a),
    sl('skills', Object.keys(r), a),
    sl('enemies', Object.keys(g), a),
    sl('items', Object.keys(y), a),
    sl('equipment', Object.keys(b), a));
  const A = (N, k) => {
    for (const [Y, V] of Object.entries(k))
      Y !== V.id && a.push(`[${N}] キー "${Y}" と id "${V.id}" が不一致`);
  };
  (A('races', i),
    A('classes', o),
    A('titles', s),
    A('skills', r),
    A('enemies', g),
    A('items', y),
    A('equipment', b));
  const j = new Set(Object.keys(r)),
    S = new Set(Object.keys(o)),
    O = new Set(Object.keys(s));
  for (const N of Object.values(i)) {
    (S.has(N.defaultClassId) ||
      a.push(`[races] "${N.id}" の defaultClassId "${N.defaultClassId}" が未定義`),
      ar(`races/${N.id}`, N.raceSkillTree, j, a));
    for (const k of N.raceSkillTree.skills) {
      const Y = d[k.skillId];
      Y &&
        Y.raceId !== N.id &&
        a.push(`[races/${N.id}] ユニオンスキル "${k.skillId}" の raceId "${Y.raceId}" が不一致`);
    }
  }
  for (const N of Object.values(d)) {
    const k = (M = i[N.raceId]) == null ? void 0 : M.raceSkillTree;
    (!k || !k.skills.some((Y) => Y.skillId === N.id)) &&
      a.push(`[unionSkills] "${N.id}" が種族 "${N.raceId}" のスキルツリーに無い`);
  }
  sl('unionSkills', Object.keys(d), a);
  for (const [N, k] of Object.entries(d))
    (N !== k.id && a.push(`[unionSkills] キー "${N}" と id "${k.id}" が不一致`),
      k.id in r || a.push(`[unionSkills] "${k.id}" が skills に未定義`),
      k.requiredParticipants < 1 &&
        a.push(`[unionSkills] "${k.id}" の requiredParticipants が 1 未満`),
      (k.gaugeCostPerParticipant < 0 || k.gaugeCostPerParticipant > 100) &&
        a.push(`[unionSkills] "${k.id}" の gaugeCostPerParticipant が 0..100 外`),
      k.id in rn &&
        a.push(
          `[unionSkills] "${k.id}" が BATTLE_SKILLS にも存在（通常スキルとして撃ててしまう）`
        ));
  sl('summons', Object.keys(m), a);
  for (const [N, k] of Object.entries(m))
    N !== k.id && a.push(`[summons] キー "${N}" と id "${k.id}" が不一致`);
  for (const N of Object.values(rn))
    for (const k of N.effects)
      k.kind === 'summon' &&
        !(k.summonKind in m) &&
        a.push(`[battleSkills] "${N.id}" の召喚 "${k.summonKind}" が未定義`);
  for (const [N, k] of Object.entries(v)) {
    (N !== k.type && a.push(`[gatherTypes] キー "${N}" と type "${k.type}" が不一致`),
      j.has(k.requiredSkillId) ||
        a.push(`[gatherTypes] "${k.type}" の requiredSkillId "${k.requiredSkillId}" が未定義`));
    for (const Y of k.drops) {
      if (!(Y.itemId in y))
        a.push(`[gatherTypes] "${k.type}" のドロップ "${Y.itemId}" が未定義アイテム`);
      else {
        const V = y[Y.itemId].category === 'food';
        (k.food &&
          !V &&
          a.push(`[gatherTypes] 食材系統 "${k.type}" のドロップ "${Y.itemId}" が food でない`),
          !k.food &&
            V &&
            a.push(`[gatherTypes] 素材系統 "${k.type}" のドロップ "${Y.itemId}" が food`));
      }
      Y.weight <= 0 && a.push(`[gatherTypes] "${k.type}" のドロップ重みが正でない`);
    }
  }
  sl('recipes', Object.keys(_), a);
  for (const [N, k] of Object.entries(_)) {
    N !== k.id && a.push(`[recipes] キー "${N}" と id "${k.id}" が不一致`);
    for (const Y of k.ingredients)
      Y.itemId in y
        ? y[Y.itemId].category !== 'food' &&
          a.push(`[recipes] "${k.id}" の材料 "${Y.itemId}" が food カテゴリでない`)
        : a.push(`[recipes] "${k.id}" の材料 "${Y.itemId}" が未定義`);
    k.result.itemId in y
      ? y[k.result.itemId].category !== 'food' &&
        a.push(`[recipes] "${k.id}" の結果 "${k.result.itemId}" が food カテゴリでない`)
      : a.push(`[recipes] "${k.id}" の結果 "${k.result.itemId}" が未定義`);
  }
  for (const N of Object.values(o)) {
    ar(`classes/${N.id}`, N.skillTree, j, a);
    for (const k of N.titleOptions) {
      if (!O.has(k)) {
        a.push(`[classes] "${N.id}" の称号 "${k}" が未定義`);
        continue;
      }
      s[k].parentClassId !== N.id &&
        a.push(`[classes] 称号 "${k}" の parentClassId が "${N.id}" と不一致`);
    }
  }
  for (const N of Object.values(s))
    (S.has(N.parentClassId) ||
      a.push(`[titles] "${N.id}" の parentClassId "${N.parentClassId}" が未定義`),
      ar(`titles/${N.id}`, N.skillTree, j, a));
  for (const N of Object.values(b))
    (N.slot === 'weapon' &&
      !N.weaponType &&
      a.push(`[equipment] "${N.id}" は weapon だが weaponType が未設定`),
      N.slot === 'armor' &&
        !N.armorType &&
        a.push(`[equipment] "${N.id}" は armor だが armorType が未設定`),
      (N.buyPrice < 0 || N.tier < 0) && a.push(`[equipment] "${N.id}" の buyPrice/tier が負`));
  for (const N of Object.values(y))
    (N.buyPrice < 0 && a.push(`[items] "${N.id}" の buyPrice が負`),
      N.category === 'consumable' &&
        !N.useContext &&
        !N.effects &&
        a.push(`[items] 消費アイテム "${N.id}" に useContext も effects も無い（使用不能）`));
  for (const N of Object.values(g))
    for (const k of N.drops ?? [])
      (k.itemId in y || a.push(`[enemies] "${N.id}" のドロップ "${k.itemId}" が未定義アイテム`),
        (k.rate < 0 || k.rate > 1) &&
          a.push(`[enemies] "${N.id}" のドロップ "${k.itemId}" の rate が 0..1 外`));
  for (const [N, k] of Object.entries(Dy)) {
    N in y || a.push(`[SELL_UNLOCKS] キー素材 "${N}" が未定義`);
    for (const Y of k) Y in b || a.push(`[SELL_UNLOCKS] 解放先装備 "${Y}" が未定義`);
  }
  return { ok: a.length === 0, errors: a };
}
const kp = DT();
kp.ok || console.error('マスターデータ検証エラー:', kp.errors);
const Uy = document.getElementById('root');
if (!Uy) throw new Error('Failed to find #root element');
_0.createRoot(Uy).render(
  h.jsx(Hv, { basename: '/sekaiju-like-game', children: h.jsx(CS, { children: h.jsx(OT, {}) }) })
);
