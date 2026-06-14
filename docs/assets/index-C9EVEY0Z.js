var U0 = Object.defineProperty;
var q0 = (a, u, o) =>
  u in a ? U0(a, u, { enumerable: !0, configurable: !0, writable: !0, value: o }) : (a[u] = o);
var jo = (a, u, o) => q0(a, typeof u != 'symbol' ? u + '' : u, o);
(function () {
  const u = document.createElement('link').relList;
  if (u && u.supports && u.supports('modulepreload')) return;
  for (const r of document.querySelectorAll('link[rel="modulepreload"]')) c(r);
  new MutationObserver((r) => {
    for (const d of r)
      if (d.type === 'childList')
        for (const h of d.addedNodes) h.tagName === 'LINK' && h.rel === 'modulepreload' && c(h);
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
var Oo = { exports: {} },
  pi = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Rh;
function L0() {
  if (Rh) return pi;
  Rh = 1;
  var a = Symbol.for('react.transitional.element'),
    u = Symbol.for('react.fragment');
  function o(c, r, d) {
    var h = null;
    if ((d !== void 0 && (h = '' + d), r.key !== void 0 && (h = '' + r.key), 'key' in r)) {
      d = {};
      for (var _ in r) _ !== 'key' && (d[_] = r[_]);
    } else d = r;
    return ((r = d.ref), { $$typeof: a, type: c, key: h, ref: r !== void 0 ? r : null, props: d });
  }
  return ((pi.Fragment = u), (pi.jsx = o), (pi.jsxs = o), pi);
}
var kh;
function H0() {
  return (kh || ((kh = 1), (Oo.exports = L0())), Oo.exports);
}
var y = H0(),
  zo = { exports: {} },
  yi = {},
  Do = { exports: {} },
  wo = {};
/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var jh;
function G0() {
  return (
    jh ||
      ((jh = 1),
      (function (a) {
        function u(L, J) {
          var ie = L.length;
          L.push(J);
          e: for (; 0 < ie; ) {
            var Me = (ie - 1) >>> 1,
              Re = L[Me];
            if (0 < r(Re, J)) ((L[Me] = J), (L[ie] = Re), (ie = Me));
            else break e;
          }
        }
        function o(L) {
          return L.length === 0 ? null : L[0];
        }
        function c(L) {
          if (L.length === 0) return null;
          var J = L[0],
            ie = L.pop();
          if (ie !== J) {
            L[0] = ie;
            e: for (var Me = 0, Re = L.length, N = Re >>> 1; Me < N; ) {
              var G = 2 * (Me + 1) - 1,
                I = L[G],
                P = G + 1,
                oe = L[P];
              if (0 > r(I, ie))
                P < Re && 0 > r(oe, I)
                  ? ((L[Me] = oe), (L[P] = ie), (Me = P))
                  : ((L[Me] = I), (L[G] = ie), (Me = G));
              else if (P < Re && 0 > r(oe, ie)) ((L[Me] = oe), (L[P] = ie), (Me = P));
              else break e;
            }
          }
          return J;
        }
        function r(L, J) {
          var ie = L.sortIndex - J.sortIndex;
          return ie !== 0 ? ie : L.id - J.id;
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
            _ = h.now();
          a.unstable_now = function () {
            return h.now() - _;
          };
        }
        var g = [],
          m = [],
          v = 1,
          S = null,
          O = 3,
          C = !1,
          b = !1,
          R = !1,
          T = !1,
          q = typeof setTimeout == 'function' ? setTimeout : null,
          $ = typeof clearTimeout == 'function' ? clearTimeout : null,
          Q = typeof setImmediate < 'u' ? setImmediate : null;
        function D(L) {
          for (var J = o(m); J !== null; ) {
            if (J.callback === null) c(m);
            else if (J.startTime <= L) (c(m), (J.sortIndex = J.expirationTime), u(g, J));
            else break;
            J = o(m);
          }
        }
        function U(L) {
          if (((R = !1), D(L), !b))
            if (o(g) !== null) ((b = !0), K || ((K = !0), de()));
            else {
              var J = o(m);
              J !== null && He(U, J.startTime - L);
            }
        }
        var K = !1,
          Z = -1,
          B = 5,
          F = -1;
        function le() {
          return T ? !0 : !(a.unstable_now() - F < B);
        }
        function re() {
          if (((T = !1), K)) {
            var L = a.unstable_now();
            F = L;
            var J = !0;
            try {
              e: {
                ((b = !1), R && ((R = !1), $(Z), (Z = -1)), (C = !0));
                var ie = O;
                try {
                  t: {
                    for (D(L), S = o(g); S !== null && !(S.expirationTime > L && le()); ) {
                      var Me = S.callback;
                      if (typeof Me == 'function') {
                        ((S.callback = null), (O = S.priorityLevel));
                        var Re = Me(S.expirationTime <= L);
                        if (((L = a.unstable_now()), typeof Re == 'function')) {
                          ((S.callback = Re), D(L), (J = !0));
                          break t;
                        }
                        (S === o(g) && c(g), D(L));
                      } else c(g);
                      S = o(g);
                    }
                    if (S !== null) J = !0;
                    else {
                      var N = o(m);
                      (N !== null && He(U, N.startTime - L), (J = !1));
                    }
                  }
                  break e;
                } finally {
                  ((S = null), (O = ie), (C = !1));
                }
                J = void 0;
              }
            } finally {
              J ? de() : (K = !1);
            }
          }
        }
        var de;
        if (typeof Q == 'function')
          de = function () {
            Q(re);
          };
        else if (typeof MessageChannel < 'u') {
          var at = new MessageChannel(),
            ht = at.port2;
          ((at.port1.onmessage = re),
            (de = function () {
              ht.postMessage(null);
            }));
        } else
          de = function () {
            q(re, 0);
          };
        function He(L, J) {
          Z = q(function () {
            L(a.unstable_now());
          }, J);
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
              : (B = 0 < L ? Math.floor(1e3 / L) : 5);
          }),
          (a.unstable_getCurrentPriorityLevel = function () {
            return O;
          }),
          (a.unstable_next = function (L) {
            switch (O) {
              case 1:
              case 2:
              case 3:
                var J = 3;
                break;
              default:
                J = O;
            }
            var ie = O;
            O = J;
            try {
              return L();
            } finally {
              O = ie;
            }
          }),
          (a.unstable_requestPaint = function () {
            T = !0;
          }),
          (a.unstable_runWithPriority = function (L, J) {
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
            var ie = O;
            O = L;
            try {
              return J();
            } finally {
              O = ie;
            }
          }),
          (a.unstable_scheduleCallback = function (L, J, ie) {
            var Me = a.unstable_now();
            switch (
              (typeof ie == 'object' && ie !== null
                ? ((ie = ie.delay), (ie = typeof ie == 'number' && 0 < ie ? Me + ie : Me))
                : (ie = Me),
              L)
            ) {
              case 1:
                var Re = -1;
                break;
              case 2:
                Re = 250;
                break;
              case 5:
                Re = 1073741823;
                break;
              case 4:
                Re = 1e4;
                break;
              default:
                Re = 5e3;
            }
            return (
              (Re = ie + Re),
              (L = {
                id: v++,
                callback: J,
                priorityLevel: L,
                startTime: ie,
                expirationTime: Re,
                sortIndex: -1,
              }),
              ie > Me
                ? ((L.sortIndex = ie),
                  u(m, L),
                  o(g) === null && L === o(m) && (R ? ($(Z), (Z = -1)) : (R = !0), He(U, ie - Me)))
                : ((L.sortIndex = Re), u(g, L), b || C || ((b = !0), K || ((K = !0), de()))),
              L
            );
          }),
          (a.unstable_shouldYield = le),
          (a.unstable_wrapCallback = function (L) {
            var J = O;
            return function () {
              var ie = O;
              O = J;
              try {
                return L.apply(this, arguments);
              } finally {
                O = ie;
              }
            };
          }));
      })(wo)),
    wo
  );
}
var Oh;
function Y0() {
  return (Oh || ((Oh = 1), (Do.exports = G0())), Do.exports);
}
var Bo = { exports: {} },
  fe = {};
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var zh;
function X0() {
  if (zh) return fe;
  zh = 1;
  var a = Symbol.for('react.transitional.element'),
    u = Symbol.for('react.portal'),
    o = Symbol.for('react.fragment'),
    c = Symbol.for('react.strict_mode'),
    r = Symbol.for('react.profiler'),
    d = Symbol.for('react.consumer'),
    h = Symbol.for('react.context'),
    _ = Symbol.for('react.forward_ref'),
    g = Symbol.for('react.suspense'),
    m = Symbol.for('react.memo'),
    v = Symbol.for('react.lazy'),
    S = Symbol.for('react.activity'),
    O = Symbol.iterator;
  function C(N) {
    return N === null || typeof N != 'object'
      ? null
      : ((N = (O && N[O]) || N['@@iterator']), typeof N == 'function' ? N : null);
  }
  var b = {
      isMounted: function () {
        return !1;
      },
      enqueueForceUpdate: function () {},
      enqueueReplaceState: function () {},
      enqueueSetState: function () {},
    },
    R = Object.assign,
    T = {};
  function q(N, G, I) {
    ((this.props = N), (this.context = G), (this.refs = T), (this.updater = I || b));
  }
  ((q.prototype.isReactComponent = {}),
    (q.prototype.setState = function (N, G) {
      if (typeof N != 'object' && typeof N != 'function' && N != null)
        throw Error(
          'takes an object of state variables to update or a function which returns an object of state variables.'
        );
      this.updater.enqueueSetState(this, N, G, 'setState');
    }),
    (q.prototype.forceUpdate = function (N) {
      this.updater.enqueueForceUpdate(this, N, 'forceUpdate');
    }));
  function $() {}
  $.prototype = q.prototype;
  function Q(N, G, I) {
    ((this.props = N), (this.context = G), (this.refs = T), (this.updater = I || b));
  }
  var D = (Q.prototype = new $());
  ((D.constructor = Q), R(D, q.prototype), (D.isPureReactComponent = !0));
  var U = Array.isArray;
  function K() {}
  var Z = { H: null, A: null, T: null, S: null },
    B = Object.prototype.hasOwnProperty;
  function F(N, G, I) {
    var P = I.ref;
    return { $$typeof: a, type: N, key: G, ref: P !== void 0 ? P : null, props: I };
  }
  function le(N, G) {
    return F(N.type, G, N.props);
  }
  function re(N) {
    return typeof N == 'object' && N !== null && N.$$typeof === a;
  }
  function de(N) {
    var G = { '=': '=0', ':': '=2' };
    return (
      '$' +
      N.replace(/[=:]/g, function (I) {
        return G[I];
      })
    );
  }
  var at = /\/+/g;
  function ht(N, G) {
    return typeof N == 'object' && N !== null && N.key != null ? de('' + N.key) : G.toString(36);
  }
  function He(N) {
    switch (N.status) {
      case 'fulfilled':
        return N.value;
      case 'rejected':
        throw N.reason;
      default:
        switch (
          (typeof N.status == 'string'
            ? N.then(K, K)
            : ((N.status = 'pending'),
              N.then(
                function (G) {
                  N.status === 'pending' && ((N.status = 'fulfilled'), (N.value = G));
                },
                function (G) {
                  N.status === 'pending' && ((N.status = 'rejected'), (N.reason = G));
                }
              )),
          N.status)
        ) {
          case 'fulfilled':
            return N.value;
          case 'rejected':
            throw N.reason;
        }
    }
    throw N;
  }
  function L(N, G, I, P, oe) {
    var pe = typeof N;
    (pe === 'undefined' || pe === 'boolean') && (N = null);
    var Ee = !1;
    if (N === null) Ee = !0;
    else
      switch (pe) {
        case 'bigint':
        case 'string':
        case 'number':
          Ee = !0;
          break;
        case 'object':
          switch (N.$$typeof) {
            case a:
            case u:
              Ee = !0;
              break;
            case v:
              return ((Ee = N._init), L(Ee(N._payload), G, I, P, oe));
          }
      }
    if (Ee)
      return (
        (oe = oe(N)),
        (Ee = P === '' ? '.' + ht(N, 0) : P),
        U(oe)
          ? ((I = ''),
            Ee != null && (I = Ee.replace(at, '$&/') + '/'),
            L(oe, G, I, '', function (X) {
              return X;
            }))
          : oe != null &&
            (re(oe) &&
              (oe = le(
                oe,
                I +
                  (oe.key == null || (N && N.key === oe.key)
                    ? ''
                    : ('' + oe.key).replace(at, '$&/') + '/') +
                  Ee
              )),
            G.push(oe)),
        1
      );
    Ee = 0;
    var tt = P === '' ? '.' : P + ':';
    if (U(N))
      for (var Ge = 0; Ge < N.length; Ge++)
        ((P = N[Ge]), (pe = tt + ht(P, Ge)), (Ee += L(P, G, I, pe, oe)));
    else if (((Ge = C(N)), typeof Ge == 'function'))
      for (N = Ge.call(N), Ge = 0; !(P = N.next()).done; )
        ((P = P.value), (pe = tt + ht(P, Ge++)), (Ee += L(P, G, I, pe, oe)));
    else if (pe === 'object') {
      if (typeof N.then == 'function') return L(He(N), G, I, P, oe);
      throw (
        (G = String(N)),
        Error(
          'Objects are not valid as a React child (found: ' +
            (G === '[object Object]' ? 'object with keys {' + Object.keys(N).join(', ') + '}' : G) +
            '). If you meant to render a collection of children, use an array instead.'
        )
      );
    }
    return Ee;
  }
  function J(N, G, I) {
    if (N == null) return N;
    var P = [],
      oe = 0;
    return (
      L(N, P, '', '', function (pe) {
        return G.call(I, pe, oe++);
      }),
      P
    );
  }
  function ie(N) {
    if (N._status === -1) {
      var G = N._result;
      ((G = G()),
        G.then(
          function (I) {
            (N._status === 0 || N._status === -1) && ((N._status = 1), (N._result = I));
          },
          function (I) {
            (N._status === 0 || N._status === -1) && ((N._status = 2), (N._result = I));
          }
        ),
        N._status === -1 && ((N._status = 0), (N._result = G)));
    }
    if (N._status === 1) return N._result.default;
    throw N._result;
  }
  var Me =
      typeof reportError == 'function'
        ? reportError
        : function (N) {
            if (typeof window == 'object' && typeof window.ErrorEvent == 'function') {
              var G = new window.ErrorEvent('error', {
                bubbles: !0,
                cancelable: !0,
                message:
                  typeof N == 'object' && N !== null && typeof N.message == 'string'
                    ? String(N.message)
                    : String(N),
                error: N,
              });
              if (!window.dispatchEvent(G)) return;
            } else if (typeof process == 'object' && typeof process.emit == 'function') {
              process.emit('uncaughtException', N);
              return;
            }
            console.error(N);
          },
    Re = {
      map: J,
      forEach: function (N, G, I) {
        J(
          N,
          function () {
            G.apply(this, arguments);
          },
          I
        );
      },
      count: function (N) {
        var G = 0;
        return (
          J(N, function () {
            G++;
          }),
          G
        );
      },
      toArray: function (N) {
        return (
          J(N, function (G) {
            return G;
          }) || []
        );
      },
      only: function (N) {
        if (!re(N))
          throw Error('React.Children.only expected to receive a single React element child.');
        return N;
      },
    };
  return (
    (fe.Activity = S),
    (fe.Children = Re),
    (fe.Component = q),
    (fe.Fragment = o),
    (fe.Profiler = r),
    (fe.PureComponent = Q),
    (fe.StrictMode = c),
    (fe.Suspense = g),
    (fe.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = Z),
    (fe.__COMPILER_RUNTIME = {
      __proto__: null,
      c: function (N) {
        return Z.H.useMemoCache(N);
      },
    }),
    (fe.cache = function (N) {
      return function () {
        return N.apply(null, arguments);
      };
    }),
    (fe.cacheSignal = function () {
      return null;
    }),
    (fe.cloneElement = function (N, G, I) {
      if (N == null) throw Error('The argument must be a React element, but you passed ' + N + '.');
      var P = R({}, N.props),
        oe = N.key;
      if (G != null)
        for (pe in (G.key !== void 0 && (oe = '' + G.key), G))
          !B.call(G, pe) ||
            pe === 'key' ||
            pe === '__self' ||
            pe === '__source' ||
            (pe === 'ref' && G.ref === void 0) ||
            (P[pe] = G[pe]);
      var pe = arguments.length - 2;
      if (pe === 1) P.children = I;
      else if (1 < pe) {
        for (var Ee = Array(pe), tt = 0; tt < pe; tt++) Ee[tt] = arguments[tt + 2];
        P.children = Ee;
      }
      return F(N.type, oe, P);
    }),
    (fe.createContext = function (N) {
      return (
        (N = {
          $$typeof: h,
          _currentValue: N,
          _currentValue2: N,
          _threadCount: 0,
          Provider: null,
          Consumer: null,
        }),
        (N.Provider = N),
        (N.Consumer = { $$typeof: d, _context: N }),
        N
      );
    }),
    (fe.createElement = function (N, G, I) {
      var P,
        oe = {},
        pe = null;
      if (G != null)
        for (P in (G.key !== void 0 && (pe = '' + G.key), G))
          B.call(G, P) && P !== 'key' && P !== '__self' && P !== '__source' && (oe[P] = G[P]);
      var Ee = arguments.length - 2;
      if (Ee === 1) oe.children = I;
      else if (1 < Ee) {
        for (var tt = Array(Ee), Ge = 0; Ge < Ee; Ge++) tt[Ge] = arguments[Ge + 2];
        oe.children = tt;
      }
      if (N && N.defaultProps)
        for (P in ((Ee = N.defaultProps), Ee)) oe[P] === void 0 && (oe[P] = Ee[P]);
      return F(N, pe, oe);
    }),
    (fe.createRef = function () {
      return { current: null };
    }),
    (fe.forwardRef = function (N) {
      return { $$typeof: _, render: N };
    }),
    (fe.isValidElement = re),
    (fe.lazy = function (N) {
      return { $$typeof: v, _payload: { _status: -1, _result: N }, _init: ie };
    }),
    (fe.memo = function (N, G) {
      return { $$typeof: m, type: N, compare: G === void 0 ? null : G };
    }),
    (fe.startTransition = function (N) {
      var G = Z.T,
        I = {};
      Z.T = I;
      try {
        var P = N(),
          oe = Z.S;
        (oe !== null && oe(I, P),
          typeof P == 'object' && P !== null && typeof P.then == 'function' && P.then(K, Me));
      } catch (pe) {
        Me(pe);
      } finally {
        (G !== null && I.types !== null && (G.types = I.types), (Z.T = G));
      }
    }),
    (fe.unstable_useCacheRefresh = function () {
      return Z.H.useCacheRefresh();
    }),
    (fe.use = function (N) {
      return Z.H.use(N);
    }),
    (fe.useActionState = function (N, G, I) {
      return Z.H.useActionState(N, G, I);
    }),
    (fe.useCallback = function (N, G) {
      return Z.H.useCallback(N, G);
    }),
    (fe.useContext = function (N) {
      return Z.H.useContext(N);
    }),
    (fe.useDebugValue = function () {}),
    (fe.useDeferredValue = function (N, G) {
      return Z.H.useDeferredValue(N, G);
    }),
    (fe.useEffect = function (N, G) {
      return Z.H.useEffect(N, G);
    }),
    (fe.useEffectEvent = function (N) {
      return Z.H.useEffectEvent(N);
    }),
    (fe.useId = function () {
      return Z.H.useId();
    }),
    (fe.useImperativeHandle = function (N, G, I) {
      return Z.H.useImperativeHandle(N, G, I);
    }),
    (fe.useInsertionEffect = function (N, G) {
      return Z.H.useInsertionEffect(N, G);
    }),
    (fe.useLayoutEffect = function (N, G) {
      return Z.H.useLayoutEffect(N, G);
    }),
    (fe.useMemo = function (N, G) {
      return Z.H.useMemo(N, G);
    }),
    (fe.useOptimistic = function (N, G) {
      return Z.H.useOptimistic(N, G);
    }),
    (fe.useReducer = function (N, G, I) {
      return Z.H.useReducer(N, G, I);
    }),
    (fe.useRef = function (N) {
      return Z.H.useRef(N);
    }),
    (fe.useState = function (N) {
      return Z.H.useState(N);
    }),
    (fe.useSyncExternalStore = function (N, G, I) {
      return Z.H.useSyncExternalStore(N, G, I);
    }),
    (fe.useTransition = function () {
      return Z.H.useTransition();
    }),
    (fe.version = '19.2.5'),
    fe
  );
}
var Dh;
function or() {
  return (Dh || ((Dh = 1), (Bo.exports = X0())), Bo.exports);
}
var Uo = { exports: {} },
  rt = {};
/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var wh;
function V0() {
  if (wh) return rt;
  wh = 1;
  var a = or();
  function u(g) {
    var m = 'https://react.dev/errors/' + g;
    if (1 < arguments.length) {
      m += '?args[]=' + encodeURIComponent(arguments[1]);
      for (var v = 2; v < arguments.length; v++) m += '&args[]=' + encodeURIComponent(arguments[v]);
    }
    return (
      'Minified React error #' +
      g +
      '; visit ' +
      m +
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
  function d(g, m, v) {
    var S = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: r,
      key: S == null ? null : '' + S,
      children: g,
      containerInfo: m,
      implementation: v,
    };
  }
  var h = a.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function _(g, m) {
    if (g === 'font') return '';
    if (typeof m == 'string') return m === 'use-credentials' ? m : '';
  }
  return (
    (rt.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = c),
    (rt.createPortal = function (g, m) {
      var v = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
      if (!m || (m.nodeType !== 1 && m.nodeType !== 9 && m.nodeType !== 11)) throw Error(u(299));
      return d(g, m, null, v);
    }),
    (rt.flushSync = function (g) {
      var m = h.T,
        v = c.p;
      try {
        if (((h.T = null), (c.p = 2), g)) return g();
      } finally {
        ((h.T = m), (c.p = v), c.d.f());
      }
    }),
    (rt.preconnect = function (g, m) {
      typeof g == 'string' &&
        (m
          ? ((m = m.crossOrigin),
            (m = typeof m == 'string' ? (m === 'use-credentials' ? m : '') : void 0))
          : (m = null),
        c.d.C(g, m));
    }),
    (rt.prefetchDNS = function (g) {
      typeof g == 'string' && c.d.D(g);
    }),
    (rt.preinit = function (g, m) {
      if (typeof g == 'string' && m && typeof m.as == 'string') {
        var v = m.as,
          S = _(v, m.crossOrigin),
          O = typeof m.integrity == 'string' ? m.integrity : void 0,
          C = typeof m.fetchPriority == 'string' ? m.fetchPriority : void 0;
        v === 'style'
          ? c.d.S(g, typeof m.precedence == 'string' ? m.precedence : void 0, {
              crossOrigin: S,
              integrity: O,
              fetchPriority: C,
            })
          : v === 'script' &&
            c.d.X(g, {
              crossOrigin: S,
              integrity: O,
              fetchPriority: C,
              nonce: typeof m.nonce == 'string' ? m.nonce : void 0,
            });
      }
    }),
    (rt.preinitModule = function (g, m) {
      if (typeof g == 'string')
        if (typeof m == 'object' && m !== null) {
          if (m.as == null || m.as === 'script') {
            var v = _(m.as, m.crossOrigin);
            c.d.M(g, {
              crossOrigin: v,
              integrity: typeof m.integrity == 'string' ? m.integrity : void 0,
              nonce: typeof m.nonce == 'string' ? m.nonce : void 0,
            });
          }
        } else m == null && c.d.M(g);
    }),
    (rt.preload = function (g, m) {
      if (typeof g == 'string' && typeof m == 'object' && m !== null && typeof m.as == 'string') {
        var v = m.as,
          S = _(v, m.crossOrigin);
        c.d.L(g, v, {
          crossOrigin: S,
          integrity: typeof m.integrity == 'string' ? m.integrity : void 0,
          nonce: typeof m.nonce == 'string' ? m.nonce : void 0,
          type: typeof m.type == 'string' ? m.type : void 0,
          fetchPriority: typeof m.fetchPriority == 'string' ? m.fetchPriority : void 0,
          referrerPolicy: typeof m.referrerPolicy == 'string' ? m.referrerPolicy : void 0,
          imageSrcSet: typeof m.imageSrcSet == 'string' ? m.imageSrcSet : void 0,
          imageSizes: typeof m.imageSizes == 'string' ? m.imageSizes : void 0,
          media: typeof m.media == 'string' ? m.media : void 0,
        });
      }
    }),
    (rt.preloadModule = function (g, m) {
      if (typeof g == 'string')
        if (m) {
          var v = _(m.as, m.crossOrigin);
          c.d.m(g, {
            as: typeof m.as == 'string' && m.as !== 'script' ? m.as : void 0,
            crossOrigin: v,
            integrity: typeof m.integrity == 'string' ? m.integrity : void 0,
          });
        } else c.d.m(g);
    }),
    (rt.requestFormReset = function (g) {
      c.d.r(g);
    }),
    (rt.unstable_batchedUpdates = function (g, m) {
      return g(m);
    }),
    (rt.useFormState = function (g, m, v) {
      return h.H.useFormState(g, m, v);
    }),
    (rt.useFormStatus = function () {
      return h.H.useHostTransitionStatus();
    }),
    (rt.version = '19.2.5'),
    rt
  );
}
var Bh;
function Q0() {
  if (Bh) return Uo.exports;
  Bh = 1;
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
  return (a(), (Uo.exports = V0()), Uo.exports);
}
/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Uh;
function Z0() {
  if (Uh) return yi;
  Uh = 1;
  var a = Y0(),
    u = or(),
    o = Q0();
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
  function h(e) {
    if (e.tag === 13) {
      var t = e.memoizedState;
      if ((t === null && ((e = e.alternate), e !== null && (t = e.memoizedState)), t !== null))
        return t.dehydrated;
    }
    return null;
  }
  function _(e) {
    if (e.tag === 31) {
      var t = e.memoizedState;
      if ((t === null && ((e = e.alternate), e !== null && (t = e.memoizedState)), t !== null))
        return t.dehydrated;
    }
    return null;
  }
  function g(e) {
    if (d(e) !== e) throw Error(c(188));
  }
  function m(e) {
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
          if (s === l) return (g(i), e);
          if (s === n) return (g(i), t);
          s = s.sibling;
        }
        throw Error(c(188));
      }
      if (l.return !== n.return) ((l = i), (n = s));
      else {
        for (var f = !1, p = i.child; p; ) {
          if (p === l) {
            ((f = !0), (l = i), (n = s));
            break;
          }
          if (p === n) {
            ((f = !0), (n = i), (l = s));
            break;
          }
          p = p.sibling;
        }
        if (!f) {
          for (p = s.child; p; ) {
            if (p === l) {
              ((f = !0), (l = s), (n = i));
              break;
            }
            if (p === n) {
              ((f = !0), (n = s), (l = i));
              break;
            }
            p = p.sibling;
          }
          if (!f) throw Error(c(189));
        }
      }
      if (l.alternate !== n) throw Error(c(190));
    }
    if (l.tag !== 3) throw Error(c(188));
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
  var S = Object.assign,
    O = Symbol.for('react.element'),
    C = Symbol.for('react.transitional.element'),
    b = Symbol.for('react.portal'),
    R = Symbol.for('react.fragment'),
    T = Symbol.for('react.strict_mode'),
    q = Symbol.for('react.profiler'),
    $ = Symbol.for('react.consumer'),
    Q = Symbol.for('react.context'),
    D = Symbol.for('react.forward_ref'),
    U = Symbol.for('react.suspense'),
    K = Symbol.for('react.suspense_list'),
    Z = Symbol.for('react.memo'),
    B = Symbol.for('react.lazy'),
    F = Symbol.for('react.activity'),
    le = Symbol.for('react.memo_cache_sentinel'),
    re = Symbol.iterator;
  function de(e) {
    return e === null || typeof e != 'object'
      ? null
      : ((e = (re && e[re]) || e['@@iterator']), typeof e == 'function' ? e : null);
  }
  var at = Symbol.for('react.client.reference');
  function ht(e) {
    if (e == null) return null;
    if (typeof e == 'function') return e.$$typeof === at ? null : e.displayName || e.name || null;
    if (typeof e == 'string') return e;
    switch (e) {
      case R:
        return 'Fragment';
      case q:
        return 'Profiler';
      case T:
        return 'StrictMode';
      case U:
        return 'Suspense';
      case K:
        return 'SuspenseList';
      case F:
        return 'Activity';
    }
    if (typeof e == 'object')
      switch (e.$$typeof) {
        case b:
          return 'Portal';
        case Q:
          return e.displayName || 'Context';
        case $:
          return (e._context.displayName || 'Context') + '.Consumer';
        case D:
          var t = e.render;
          return (
            (e = e.displayName),
            e ||
              ((e = t.displayName || t.name || ''),
              (e = e !== '' ? 'ForwardRef(' + e + ')' : 'ForwardRef')),
            e
          );
        case Z:
          return ((t = e.displayName || null), t !== null ? t : ht(e.type) || 'Memo');
        case B:
          ((t = e._payload), (e = e._init));
          try {
            return ht(e(t));
          } catch {}
      }
    return null;
  }
  var He = Array.isArray,
    L = u.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
    J = o.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
    ie = { pending: !1, data: null, method: null, action: null },
    Me = [],
    Re = -1;
  function N(e) {
    return { current: e };
  }
  function G(e) {
    0 > Re || ((e.current = Me[Re]), (Me[Re] = null), Re--);
  }
  function I(e, t) {
    (Re++, (Me[Re] = e.current), (e.current = t));
  }
  var P = N(null),
    oe = N(null),
    pe = N(null),
    Ee = N(null);
  function tt(e, t) {
    switch ((I(pe, t), I(oe, e), I(P, null), t.nodeType)) {
      case 9:
      case 11:
        e = (e = t.documentElement) && (e = e.namespaceURI) ? Fm(e) : 0;
        break;
      default:
        if (((e = t.tagName), (t = t.namespaceURI))) ((t = Fm(t)), (e = Pm(t, e)));
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
    (G(P), I(P, e));
  }
  function Ge() {
    (G(P), G(oe), G(pe));
  }
  function X(e) {
    e.memoizedState !== null && I(Ee, e);
    var t = P.current,
      l = Pm(t, e.type);
    t !== l && (I(oe, e), I(P, l));
  }
  function ae(e) {
    (oe.current === e && (G(P), G(oe)), Ee.current === e && (G(Ee), (fi._currentValue = ie)));
  }
  var ce, Ae;
  function Se(e) {
    if (ce === void 0)
      try {
        throw Error();
      } catch (l) {
        var t = l.stack.trim().match(/\n( *(at )?)/);
        ((ce = (t && t[1]) || ''),
          (Ae =
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
      ce +
      e +
      Ae
    );
  }
  var pt = !1;
  function hs(e, t) {
    if (!e || pt) return '';
    pt = !0;
    var l = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var n = {
        DetermineComponentFrameRoot: function () {
          try {
            if (t) {
              var V = function () {
                throw Error();
              };
              if (
                (Object.defineProperty(V.prototype, 'props', {
                  set: function () {
                    throw Error();
                  },
                }),
                typeof Reflect == 'object' && Reflect.construct)
              ) {
                try {
                  Reflect.construct(V, []);
                } catch (w) {
                  var z = w;
                }
                Reflect.construct(e, [], V);
              } else {
                try {
                  V.call();
                } catch (w) {
                  z = w;
                }
                e.call(V.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (w) {
                z = w;
              }
              (V = e()) && typeof V.catch == 'function' && V.catch(function () {});
            }
          } catch (w) {
            if (w && z && typeof w.stack == 'string') return [w.stack, z.stack];
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
        p = s[1];
      if (f && p) {
        var x = f.split(`
`),
          j = p.split(`
`);
        for (i = n = 0; n < x.length && !x[n].includes('DetermineComponentFrameRoot'); ) n++;
        for (; i < j.length && !j[i].includes('DetermineComponentFrameRoot'); ) i++;
        if (n === x.length || i === j.length)
          for (n = x.length - 1, i = j.length - 1; 1 <= n && 0 <= i && x[n] !== j[i]; ) i--;
        for (; 1 <= n && 0 <= i; n--, i--)
          if (x[n] !== j[i]) {
            if (n !== 1 || i !== 1)
              do
                if ((n--, i--, 0 > i || x[n] !== j[i])) {
                  var H =
                    `
` + x[n].replace(' at new ', ' at ');
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
      ((pt = !1), (Error.prepareStackTrace = l));
    }
    return (l = e ? e.displayName || e.name : '') ? Se(l) : '';
  }
  function hy(e, t) {
    switch (e.tag) {
      case 26:
      case 27:
      case 5:
        return Se(e.type);
      case 16:
        return Se('Lazy');
      case 13:
        return e.child !== t && t !== null ? Se('Suspense Fallback') : Se('Suspense');
      case 19:
        return Se('SuspenseList');
      case 0:
      case 15:
        return hs(e.type, !1);
      case 11:
        return hs(e.type.render, !1);
      case 1:
        return hs(e.type, !0);
      case 31:
        return Se('Activity');
      default:
        return '';
    }
  }
  function Mr(e) {
    try {
      var t = '',
        l = null;
      do ((t += hy(e, l)), (l = e), (e = e.return));
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
  var ps = Object.prototype.hasOwnProperty,
    ys = a.unstable_scheduleCallback,
    gs = a.unstable_cancelCallback,
    py = a.unstable_shouldYield,
    yy = a.unstable_requestPaint,
    Et = a.unstable_now,
    gy = a.unstable_getCurrentPriorityLevel,
    Rr = a.unstable_ImmediatePriority,
    kr = a.unstable_UserBlockingPriority,
    ji = a.unstable_NormalPriority,
    vy = a.unstable_LowPriority,
    jr = a.unstable_IdlePriority,
    _y = a.log,
    by = a.unstable_setDisableYieldValue,
    Ea = null,
    Tt = null;
  function Ol(e) {
    if ((typeof _y == 'function' && by(e), Tt && typeof Tt.setStrictMode == 'function'))
      try {
        Tt.setStrictMode(Ea, e);
      } catch {}
  }
  var Nt = Math.clz32 ? Math.clz32 : Ey,
    Sy = Math.log,
    xy = Math.LN2;
  function Ey(e) {
    return ((e >>>= 0), e === 0 ? 32 : (31 - ((Sy(e) / xy) | 0)) | 0);
  }
  var Oi = 256,
    zi = 262144,
    Di = 4194304;
  function cn(e) {
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
  function wi(e, t, l) {
    var n = e.pendingLanes;
    if (n === 0) return 0;
    var i = 0,
      s = e.suspendedLanes,
      f = e.pingedLanes;
    e = e.warmLanes;
    var p = n & 134217727;
    return (
      p !== 0
        ? ((n = p & ~s),
          n !== 0
            ? (i = cn(n))
            : ((f &= p), f !== 0 ? (i = cn(f)) : l || ((l = p & ~e), l !== 0 && (i = cn(l)))))
        : ((p = n & ~s),
          p !== 0
            ? (i = cn(p))
            : f !== 0
              ? (i = cn(f))
              : l || ((l = n & ~e), l !== 0 && (i = cn(l)))),
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
  function Ta(e, t) {
    return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & t) === 0;
  }
  function Ty(e, t) {
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
  function Or() {
    var e = Di;
    return ((Di <<= 1), (Di & 62914560) === 0 && (Di = 4194304), e);
  }
  function vs(e) {
    for (var t = [], l = 0; 31 > l; l++) t.push(e);
    return t;
  }
  function Na(e, t) {
    ((e.pendingLanes |= t),
      t !== 268435456 && ((e.suspendedLanes = 0), (e.pingedLanes = 0), (e.warmLanes = 0)));
  }
  function Ny(e, t, l, n, i, s) {
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
      j = e.hiddenUpdates;
    for (l = f & ~l; 0 < l; ) {
      var H = 31 - Nt(l),
        V = 1 << H;
      ((p[H] = 0), (x[H] = -1));
      var z = j[H];
      if (z !== null)
        for (j[H] = null, H = 0; H < z.length; H++) {
          var w = z[H];
          w !== null && (w.lane &= -536870913);
        }
      l &= ~V;
    }
    (n !== 0 && zr(e, n, 0),
      s !== 0 && i === 0 && e.tag !== 0 && (e.suspendedLanes |= s & ~(f & ~t)));
  }
  function zr(e, t, l) {
    ((e.pendingLanes |= t), (e.suspendedLanes &= ~t));
    var n = 31 - Nt(t);
    ((e.entangledLanes |= t),
      (e.entanglements[n] = e.entanglements[n] | 1073741824 | (l & 261930)));
  }
  function Dr(e, t) {
    var l = (e.entangledLanes |= t);
    for (e = e.entanglements; l; ) {
      var n = 31 - Nt(l),
        i = 1 << n;
      ((i & t) | (e[n] & t) && (e[n] |= t), (l &= ~i));
    }
  }
  function wr(e, t) {
    var l = t & -t;
    return ((l = (l & 42) !== 0 ? 1 : _s(l)), (l & (e.suspendedLanes | t)) !== 0 ? 0 : l);
  }
  function _s(e) {
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
  function bs(e) {
    return ((e &= -e), 2 < e ? (8 < e ? ((e & 134217727) !== 0 ? 32 : 268435456) : 8) : 2);
  }
  function Br() {
    var e = J.p;
    return e !== 0 ? e : ((e = window.event), e === void 0 ? 32 : xh(e.type));
  }
  function Ur(e, t) {
    var l = J.p;
    try {
      return ((J.p = e), t());
    } finally {
      J.p = l;
    }
  }
  var zl = Math.random().toString(36).slice(2),
    it = '__reactFiber$' + zl,
    yt = '__reactProps$' + zl,
    kn = '__reactContainer$' + zl,
    Ss = '__reactEvents$' + zl,
    Ay = '__reactListeners$' + zl,
    Cy = '__reactHandles$' + zl,
    qr = '__reactResources$' + zl,
    Aa = '__reactMarker$' + zl;
  function xs(e) {
    (delete e[it], delete e[yt], delete e[Ss], delete e[Ay], delete e[Cy]);
  }
  function jn(e) {
    var t = e[it];
    if (t) return t;
    for (var l = e.parentNode; l; ) {
      if ((t = l[kn] || l[it])) {
        if (((l = t.alternate), t.child !== null || (l !== null && l.child !== null)))
          for (e = uh(e); e !== null; ) {
            if ((l = e[it])) return l;
            e = uh(e);
          }
        return t;
      }
      ((e = l), (l = e.parentNode));
    }
    return null;
  }
  function On(e) {
    if ((e = e[it] || e[kn])) {
      var t = e.tag;
      if (t === 5 || t === 6 || t === 13 || t === 31 || t === 26 || t === 27 || t === 3) return e;
    }
    return null;
  }
  function Ca(e) {
    var t = e.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return e.stateNode;
    throw Error(c(33));
  }
  function zn(e) {
    var t = e[qr];
    return (t || (t = e[qr] = { hoistableStyles: new Map(), hoistableScripts: new Map() }), t);
  }
  function lt(e) {
    e[Aa] = !0;
  }
  var Lr = new Set(),
    Hr = {};
  function on(e, t) {
    (Dn(e, t), Dn(e + 'Capture', t));
  }
  function Dn(e, t) {
    for (Hr[e] = t, e = 0; e < t.length; e++) Lr.add(t[e]);
  }
  var My = RegExp(
      '^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$'
    ),
    Gr = {},
    Yr = {};
  function Ry(e) {
    return ps.call(Yr, e)
      ? !0
      : ps.call(Gr, e)
        ? !1
        : My.test(e)
          ? (Yr[e] = !0)
          : ((Gr[e] = !0), !1);
  }
  function Bi(e, t, l) {
    if (Ry(t))
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
  function Ui(e, t, l) {
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
  function ul(e, t, l, n) {
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
  function Xr(e) {
    var t = e.type;
    return (e = e.nodeName) && e.toLowerCase() === 'input' && (t === 'checkbox' || t === 'radio');
  }
  function ky(e, t, l) {
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
  function Es(e) {
    if (!e._valueTracker) {
      var t = Xr(e) ? 'checked' : 'value';
      e._valueTracker = ky(e, t, '' + e[t]);
    }
  }
  function Vr(e) {
    if (!e) return !1;
    var t = e._valueTracker;
    if (!t) return !0;
    var l = t.getValue(),
      n = '';
    return (
      e && (n = Xr(e) ? (e.checked ? 'true' : 'false') : e.value),
      (e = n),
      e !== l ? (t.setValue(e), !0) : !1
    );
  }
  function qi(e) {
    if (((e = e || (typeof document < 'u' ? document : void 0)), typeof e > 'u')) return null;
    try {
      return e.activeElement || e.body;
    } catch {
      return e.body;
    }
  }
  var jy = /[\n"\\]/g;
  function Ut(e) {
    return e.replace(jy, function (t) {
      return '\\' + t.charCodeAt(0).toString(16) + ' ';
    });
  }
  function Ts(e, t, l, n, i, s, f, p) {
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
        ? Ns(e, f, Bt(t))
        : l != null
          ? Ns(e, f, Bt(l))
          : n != null && e.removeAttribute('value'),
      i == null && s != null && (e.defaultChecked = !!s),
      i != null && (e.checked = i && typeof i != 'function' && typeof i != 'symbol'),
      p != null && typeof p != 'function' && typeof p != 'symbol' && typeof p != 'boolean'
        ? (e.name = '' + Bt(p))
        : e.removeAttribute('name'));
  }
  function Qr(e, t, l, n, i, s, f, p) {
    if (
      (s != null &&
        typeof s != 'function' &&
        typeof s != 'symbol' &&
        typeof s != 'boolean' &&
        (e.type = s),
      t != null || l != null)
    ) {
      if (!((s !== 'submit' && s !== 'reset') || t != null)) {
        Es(e);
        return;
      }
      ((l = l != null ? '' + Bt(l) : ''),
        (t = t != null ? '' + Bt(t) : l),
        p || t === e.value || (e.value = t),
        (e.defaultValue = t));
    }
    ((n = n ?? i),
      (n = typeof n != 'function' && typeof n != 'symbol' && !!n),
      (e.checked = p ? e.checked : !!n),
      (e.defaultChecked = !!n),
      f != null &&
        typeof f != 'function' &&
        typeof f != 'symbol' &&
        typeof f != 'boolean' &&
        (e.name = f),
      Es(e));
  }
  function Ns(e, t, l) {
    (t === 'number' && qi(e.ownerDocument) === e) ||
      e.defaultValue === '' + l ||
      (e.defaultValue = '' + l);
  }
  function wn(e, t, l, n) {
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
  function Zr(e, t, l) {
    if (t != null && ((t = '' + Bt(t)), t !== e.value && (e.value = t), l == null)) {
      e.defaultValue !== t && (e.defaultValue = t);
      return;
    }
    e.defaultValue = l != null ? '' + Bt(l) : '';
  }
  function $r(e, t, l, n) {
    if (t == null) {
      if (n != null) {
        if (l != null) throw Error(c(92));
        if (He(n)) {
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
      Es(e));
  }
  function Bn(e, t) {
    if (t) {
      var l = e.firstChild;
      if (l && l === e.lastChild && l.nodeType === 3) {
        l.nodeValue = t;
        return;
      }
    }
    e.textContent = t;
  }
  var Oy = new Set(
    'animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp'.split(
      ' '
    )
  );
  function Kr(e, t, l) {
    var n = t.indexOf('--') === 0;
    l == null || typeof l == 'boolean' || l === ''
      ? n
        ? e.setProperty(t, '')
        : t === 'float'
          ? (e.cssFloat = '')
          : (e[t] = '')
      : n
        ? e.setProperty(t, l)
        : typeof l != 'number' || l === 0 || Oy.has(t)
          ? t === 'float'
            ? (e.cssFloat = l)
            : (e[t] = ('' + l).trim())
          : (e[t] = l + 'px');
  }
  function Jr(e, t, l) {
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
      for (var i in t) ((n = t[i]), t.hasOwnProperty(i) && l[i] !== n && Kr(e, i, n));
    } else for (var s in t) t.hasOwnProperty(s) && Kr(e, s, t[s]);
  }
  function As(e) {
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
  var zy = new Map([
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
    Dy =
      /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function Li(e) {
    return Dy.test('' + e)
      ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')"
      : e;
  }
  function sl() {}
  var Cs = null;
  function Ms(e) {
    return (
      (e = e.target || e.srcElement || window),
      e.correspondingUseElement && (e = e.correspondingUseElement),
      e.nodeType === 3 ? e.parentNode : e
    );
  }
  var Un = null,
    qn = null;
  function Ir(e) {
    var t = On(e);
    if (t && (e = t.stateNode)) {
      var l = e[yt] || null;
      e: switch (((e = t.stateNode), t.type)) {
        case 'input':
          if (
            (Ts(
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
                var i = n[yt] || null;
                if (!i) throw Error(c(90));
                Ts(
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
            for (t = 0; t < l.length; t++) ((n = l[t]), n.form === e.form && Vr(n));
          }
          break e;
        case 'textarea':
          Zr(e, l.value, l.defaultValue);
          break e;
        case 'select':
          ((t = l.value), t != null && wn(e, !!l.multiple, t, !1));
      }
    }
  }
  var Rs = !1;
  function Wr(e, t, l) {
    if (Rs) return e(t, l);
    Rs = !0;
    try {
      var n = e(t);
      return n;
    } finally {
      if (
        ((Rs = !1),
        (Un !== null || qn !== null) &&
          (Au(), Un && ((t = Un), (e = qn), (qn = Un = null), Ir(t), e)))
      )
        for (t = 0; t < e.length; t++) Ir(e[t]);
    }
  }
  function Ma(e, t) {
    var l = e.stateNode;
    if (l === null) return null;
    var n = l[yt] || null;
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
  var cl = !(
      typeof window > 'u' ||
      typeof window.document > 'u' ||
      typeof window.document.createElement > 'u'
    ),
    ks = !1;
  if (cl)
    try {
      var Ra = {};
      (Object.defineProperty(Ra, 'passive', {
        get: function () {
          ks = !0;
        },
      }),
        window.addEventListener('test', Ra, Ra),
        window.removeEventListener('test', Ra, Ra));
    } catch {
      ks = !1;
    }
  var Dl = null,
    js = null,
    Hi = null;
  function Fr() {
    if (Hi) return Hi;
    var e,
      t = js,
      l = t.length,
      n,
      i = 'value' in Dl ? Dl.value : Dl.textContent,
      s = i.length;
    for (e = 0; e < l && t[e] === i[e]; e++);
    var f = l - e;
    for (n = 1; n <= f && t[l - n] === i[s - n]; n++);
    return (Hi = i.slice(e, 1 < n ? 1 - n : void 0));
  }
  function Gi(e) {
    var t = e.keyCode;
    return (
      'charCode' in e ? ((e = e.charCode), e === 0 && t === 13 && (e = 13)) : (e = t),
      e === 10 && (e = 13),
      32 <= e || e === 13 ? e : 0
    );
  }
  function Yi() {
    return !0;
  }
  function Pr() {
    return !1;
  }
  function gt(e) {
    function t(l, n, i, s, f) {
      ((this._reactName = l),
        (this._targetInst = i),
        (this.type = n),
        (this.nativeEvent = s),
        (this.target = f),
        (this.currentTarget = null));
      for (var p in e) e.hasOwnProperty(p) && ((l = e[p]), (this[p] = l ? l(s) : s[p]));
      return (
        (this.isDefaultPrevented = (
          s.defaultPrevented != null ? s.defaultPrevented : s.returnValue === !1
        )
          ? Yi
          : Pr),
        (this.isPropagationStopped = Pr),
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
            (this.isDefaultPrevented = Yi));
        },
        stopPropagation: function () {
          var l = this.nativeEvent;
          l &&
            (l.stopPropagation
              ? l.stopPropagation()
              : typeof l.cancelBubble != 'unknown' && (l.cancelBubble = !0),
            (this.isPropagationStopped = Yi));
        },
        persist: function () {},
        isPersistent: Yi,
      }),
      t
    );
  }
  var rn = {
      eventPhase: 0,
      bubbles: 0,
      cancelable: 0,
      timeStamp: function (e) {
        return e.timeStamp || Date.now();
      },
      defaultPrevented: 0,
      isTrusted: 0,
    },
    Xi = gt(rn),
    ka = S({}, rn, { view: 0, detail: 0 }),
    wy = gt(ka),
    Os,
    zs,
    ja,
    Vi = S({}, ka, {
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
      getModifierState: ws,
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
          : (e !== ja &&
              (ja && e.type === 'mousemove'
                ? ((Os = e.screenX - ja.screenX), (zs = e.screenY - ja.screenY))
                : (zs = Os = 0),
              (ja = e)),
            Os);
      },
      movementY: function (e) {
        return 'movementY' in e ? e.movementY : zs;
      },
    }),
    ef = gt(Vi),
    By = S({}, Vi, { dataTransfer: 0 }),
    Uy = gt(By),
    qy = S({}, ka, { relatedTarget: 0 }),
    Ds = gt(qy),
    Ly = S({}, rn, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
    Hy = gt(Ly),
    Gy = S({}, rn, {
      clipboardData: function (e) {
        return 'clipboardData' in e ? e.clipboardData : window.clipboardData;
      },
    }),
    Yy = gt(Gy),
    Xy = S({}, rn, { data: 0 }),
    tf = gt(Xy),
    Vy = {
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
    Qy = {
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
    Zy = { Alt: 'altKey', Control: 'ctrlKey', Meta: 'metaKey', Shift: 'shiftKey' };
  function $y(e) {
    var t = this.nativeEvent;
    return t.getModifierState ? t.getModifierState(e) : (e = Zy[e]) ? !!t[e] : !1;
  }
  function ws() {
    return $y;
  }
  var Ky = S({}, ka, {
      key: function (e) {
        if (e.key) {
          var t = Vy[e.key] || e.key;
          if (t !== 'Unidentified') return t;
        }
        return e.type === 'keypress'
          ? ((e = Gi(e)), e === 13 ? 'Enter' : String.fromCharCode(e))
          : e.type === 'keydown' || e.type === 'keyup'
            ? Qy[e.keyCode] || 'Unidentified'
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
      getModifierState: ws,
      charCode: function (e) {
        return e.type === 'keypress' ? Gi(e) : 0;
      },
      keyCode: function (e) {
        return e.type === 'keydown' || e.type === 'keyup' ? e.keyCode : 0;
      },
      which: function (e) {
        return e.type === 'keypress'
          ? Gi(e)
          : e.type === 'keydown' || e.type === 'keyup'
            ? e.keyCode
            : 0;
      },
    }),
    Jy = gt(Ky),
    Iy = S({}, Vi, {
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
    lf = gt(Iy),
    Wy = S({}, ka, {
      touches: 0,
      targetTouches: 0,
      changedTouches: 0,
      altKey: 0,
      metaKey: 0,
      ctrlKey: 0,
      shiftKey: 0,
      getModifierState: ws,
    }),
    Fy = gt(Wy),
    Py = S({}, rn, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
    eg = gt(Py),
    tg = S({}, Vi, {
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
    lg = gt(tg),
    ng = S({}, rn, { newState: 0, oldState: 0 }),
    ag = gt(ng),
    ig = [9, 13, 27, 32],
    Bs = cl && 'CompositionEvent' in window,
    Oa = null;
  cl && 'documentMode' in document && (Oa = document.documentMode);
  var ug = cl && 'TextEvent' in window && !Oa,
    nf = cl && (!Bs || (Oa && 8 < Oa && 11 >= Oa)),
    af = ' ',
    uf = !1;
  function sf(e, t) {
    switch (e) {
      case 'keyup':
        return ig.indexOf(t.keyCode) !== -1;
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
  function cf(e) {
    return ((e = e.detail), typeof e == 'object' && 'data' in e ? e.data : null);
  }
  var Ln = !1;
  function sg(e, t) {
    switch (e) {
      case 'compositionend':
        return cf(t);
      case 'keypress':
        return t.which !== 32 ? null : ((uf = !0), af);
      case 'textInput':
        return ((e = t.data), e === af && uf ? null : e);
      default:
        return null;
    }
  }
  function cg(e, t) {
    if (Ln)
      return e === 'compositionend' || (!Bs && sf(e, t))
        ? ((e = Fr()), (Hi = js = Dl = null), (Ln = !1), e)
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
        return nf && t.locale !== 'ko' ? null : t.data;
      default:
        return null;
    }
  }
  var og = {
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
  function of(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t === 'input' ? !!og[e.type] : t === 'textarea';
  }
  function rf(e, t, l, n) {
    (Un ? (qn ? qn.push(n) : (qn = [n])) : (Un = n),
      (t = zu(t, 'onChange')),
      0 < t.length &&
        ((l = new Xi('onChange', 'change', null, l, n)), e.push({ event: l, listeners: t })));
  }
  var za = null,
    Da = null;
  function rg(e) {
    Zm(e, 0);
  }
  function Qi(e) {
    var t = Ca(e);
    if (Vr(t)) return e;
  }
  function ff(e, t) {
    if (e === 'change') return t;
  }
  var df = !1;
  if (cl) {
    var Us;
    if (cl) {
      var qs = 'oninput' in document;
      if (!qs) {
        var mf = document.createElement('div');
        (mf.setAttribute('oninput', 'return;'), (qs = typeof mf.oninput == 'function'));
      }
      Us = qs;
    } else Us = !1;
    df = Us && (!document.documentMode || 9 < document.documentMode);
  }
  function hf() {
    za && (za.detachEvent('onpropertychange', pf), (Da = za = null));
  }
  function pf(e) {
    if (e.propertyName === 'value' && Qi(Da)) {
      var t = [];
      (rf(t, Da, e, Ms(e)), Wr(rg, t));
    }
  }
  function fg(e, t, l) {
    e === 'focusin'
      ? (hf(), (za = t), (Da = l), za.attachEvent('onpropertychange', pf))
      : e === 'focusout' && hf();
  }
  function dg(e) {
    if (e === 'selectionchange' || e === 'keyup' || e === 'keydown') return Qi(Da);
  }
  function mg(e, t) {
    if (e === 'click') return Qi(t);
  }
  function hg(e, t) {
    if (e === 'input' || e === 'change') return Qi(t);
  }
  function pg(e, t) {
    return (e === t && (e !== 0 || 1 / e === 1 / t)) || (e !== e && t !== t);
  }
  var At = typeof Object.is == 'function' ? Object.is : pg;
  function wa(e, t) {
    if (At(e, t)) return !0;
    if (typeof e != 'object' || e === null || typeof t != 'object' || t === null) return !1;
    var l = Object.keys(e),
      n = Object.keys(t);
    if (l.length !== n.length) return !1;
    for (n = 0; n < l.length; n++) {
      var i = l[n];
      if (!ps.call(t, i) || !At(e[i], t[i])) return !1;
    }
    return !0;
  }
  function yf(e) {
    for (; e && e.firstChild; ) e = e.firstChild;
    return e;
  }
  function gf(e, t) {
    var l = yf(e);
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
      l = yf(l);
    }
  }
  function vf(e, t) {
    return e && t
      ? e === t
        ? !0
        : e && e.nodeType === 3
          ? !1
          : t && t.nodeType === 3
            ? vf(e, t.parentNode)
            : 'contains' in e
              ? e.contains(t)
              : e.compareDocumentPosition
                ? !!(e.compareDocumentPosition(t) & 16)
                : !1
      : !1;
  }
  function _f(e) {
    e =
      e != null && e.ownerDocument != null && e.ownerDocument.defaultView != null
        ? e.ownerDocument.defaultView
        : window;
    for (var t = qi(e.document); t instanceof e.HTMLIFrameElement; ) {
      try {
        var l = typeof t.contentWindow.location.href == 'string';
      } catch {
        l = !1;
      }
      if (l) e = t.contentWindow;
      else break;
      t = qi(e.document);
    }
    return t;
  }
  function Ls(e) {
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
  var yg = cl && 'documentMode' in document && 11 >= document.documentMode,
    Hn = null,
    Hs = null,
    Ba = null,
    Gs = !1;
  function bf(e, t, l) {
    var n = l.window === l ? l.document : l.nodeType === 9 ? l : l.ownerDocument;
    Gs ||
      Hn == null ||
      Hn !== qi(n) ||
      ((n = Hn),
      'selectionStart' in n && Ls(n)
        ? (n = { start: n.selectionStart, end: n.selectionEnd })
        : ((n = ((n.ownerDocument && n.ownerDocument.defaultView) || window).getSelection()),
          (n = {
            anchorNode: n.anchorNode,
            anchorOffset: n.anchorOffset,
            focusNode: n.focusNode,
            focusOffset: n.focusOffset,
          })),
      (Ba && wa(Ba, n)) ||
        ((Ba = n),
        (n = zu(Hs, 'onSelect')),
        0 < n.length &&
          ((t = new Xi('onSelect', 'select', null, t, l)),
          e.push({ event: t, listeners: n }),
          (t.target = Hn))));
  }
  function fn(e, t) {
    var l = {};
    return (
      (l[e.toLowerCase()] = t.toLowerCase()),
      (l['Webkit' + e] = 'webkit' + t),
      (l['Moz' + e] = 'moz' + t),
      l
    );
  }
  var Gn = {
      animationend: fn('Animation', 'AnimationEnd'),
      animationiteration: fn('Animation', 'AnimationIteration'),
      animationstart: fn('Animation', 'AnimationStart'),
      transitionrun: fn('Transition', 'TransitionRun'),
      transitionstart: fn('Transition', 'TransitionStart'),
      transitioncancel: fn('Transition', 'TransitionCancel'),
      transitionend: fn('Transition', 'TransitionEnd'),
    },
    Ys = {},
    Sf = {};
  cl &&
    ((Sf = document.createElement('div').style),
    'AnimationEvent' in window ||
      (delete Gn.animationend.animation,
      delete Gn.animationiteration.animation,
      delete Gn.animationstart.animation),
    'TransitionEvent' in window || delete Gn.transitionend.transition);
  function dn(e) {
    if (Ys[e]) return Ys[e];
    if (!Gn[e]) return e;
    var t = Gn[e],
      l;
    for (l in t) if (t.hasOwnProperty(l) && l in Sf) return (Ys[e] = t[l]);
    return e;
  }
  var xf = dn('animationend'),
    Ef = dn('animationiteration'),
    Tf = dn('animationstart'),
    gg = dn('transitionrun'),
    vg = dn('transitionstart'),
    _g = dn('transitioncancel'),
    Nf = dn('transitionend'),
    Af = new Map(),
    Xs =
      'abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel'.split(
        ' '
      );
  Xs.push('scrollEnd');
  function Kt(e, t) {
    (Af.set(e, t), on(t, [e]));
  }
  var Zi =
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
    Yn = 0,
    Vs = 0;
  function $i() {
    for (var e = Yn, t = (Vs = Yn = 0); t < e; ) {
      var l = qt[t];
      qt[t++] = null;
      var n = qt[t];
      qt[t++] = null;
      var i = qt[t];
      qt[t++] = null;
      var s = qt[t];
      if (((qt[t++] = null), n !== null && i !== null)) {
        var f = n.pending;
        (f === null ? (i.next = i) : ((i.next = f.next), (f.next = i)), (n.pending = i));
      }
      s !== 0 && Cf(l, i, s);
    }
  }
  function Ki(e, t, l, n) {
    ((qt[Yn++] = e),
      (qt[Yn++] = t),
      (qt[Yn++] = l),
      (qt[Yn++] = n),
      (Vs |= n),
      (e.lanes |= n),
      (e = e.alternate),
      e !== null && (e.lanes |= n));
  }
  function Qs(e, t, l, n) {
    return (Ki(e, t, l, n), Ji(e));
  }
  function mn(e, t) {
    return (Ki(e, null, null, t), Ji(e));
  }
  function Cf(e, t, l) {
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
          ((i = 31 - Nt(l)),
          (e = s.hiddenUpdates),
          (n = e[i]),
          n === null ? (e[i] = [t]) : n.push(t),
          (t.lane = l | 536870912)),
        s)
      : null;
  }
  function Ji(e) {
    if (50 < ai) throw ((ai = 0), (eo = null), Error(c(185)));
    for (var t = e.return; t !== null; ) ((e = t), (t = e.return));
    return e.tag === 3 ? e.stateNode : null;
  }
  var Xn = {};
  function bg(e, t, l, n) {
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
    return new bg(e, t, l, n);
  }
  function Zs(e) {
    return ((e = e.prototype), !(!e || !e.isReactComponent));
  }
  function ol(e, t) {
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
  function Mf(e, t) {
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
  function Ii(e, t, l, n, i, s) {
    var f = 0;
    if (((n = e), typeof e == 'function')) Zs(e) && (f = 1);
    else if (typeof e == 'string')
      f = N0(e, l, P.current) ? 26 : e === 'html' || e === 'head' || e === 'body' ? 27 : 5;
    else
      e: switch (e) {
        case F:
          return ((e = Ct(31, l, t, i)), (e.elementType = F), (e.lanes = s), e);
        case R:
          return hn(l.children, i, s, t);
        case T:
          ((f = 8), (i |= 24));
          break;
        case q:
          return ((e = Ct(12, l, t, i | 2)), (e.elementType = q), (e.lanes = s), e);
        case U:
          return ((e = Ct(13, l, t, i)), (e.elementType = U), (e.lanes = s), e);
        case K:
          return ((e = Ct(19, l, t, i)), (e.elementType = K), (e.lanes = s), e);
        default:
          if (typeof e == 'object' && e !== null)
            switch (e.$$typeof) {
              case Q:
                f = 10;
                break e;
              case $:
                f = 9;
                break e;
              case D:
                f = 11;
                break e;
              case Z:
                f = 14;
                break e;
              case B:
                ((f = 16), (n = null));
                break e;
            }
          ((f = 29), (l = Error(c(130, e === null ? 'null' : typeof e, ''))), (n = null));
      }
    return ((t = Ct(f, l, t, i)), (t.elementType = e), (t.type = n), (t.lanes = s), t);
  }
  function hn(e, t, l, n) {
    return ((e = Ct(7, e, n, t)), (e.lanes = l), e);
  }
  function $s(e, t, l) {
    return ((e = Ct(6, e, null, t)), (e.lanes = l), e);
  }
  function Rf(e) {
    var t = Ct(18, null, null, 0);
    return ((t.stateNode = e), t);
  }
  function Ks(e, t, l) {
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
  var kf = new WeakMap();
  function Lt(e, t) {
    if (typeof e == 'object' && e !== null) {
      var l = kf.get(e);
      return l !== void 0 ? l : ((t = { value: e, source: t, stack: Mr(t) }), kf.set(e, t), t);
    }
    return { value: e, source: t, stack: Mr(t) };
  }
  var Vn = [],
    Qn = 0,
    Wi = null,
    Ua = 0,
    Ht = [],
    Gt = 0,
    wl = null,
    el = 1,
    tl = '';
  function rl(e, t) {
    ((Vn[Qn++] = Ua), (Vn[Qn++] = Wi), (Wi = e), (Ua = t));
  }
  function jf(e, t, l) {
    ((Ht[Gt++] = el), (Ht[Gt++] = tl), (Ht[Gt++] = wl), (wl = e));
    var n = el;
    e = tl;
    var i = 32 - Nt(n) - 1;
    ((n &= ~(1 << i)), (l += 1));
    var s = 32 - Nt(t) + i;
    if (30 < s) {
      var f = i - (i % 5);
      ((s = (n & ((1 << f) - 1)).toString(32)),
        (n >>= f),
        (i -= f),
        (el = (1 << (32 - Nt(t) + i)) | (l << i) | n),
        (tl = s + e));
    } else ((el = (1 << s) | (l << i) | n), (tl = e));
  }
  function Js(e) {
    e.return !== null && (rl(e, 1), jf(e, 1, 0));
  }
  function Is(e) {
    for (; e === Wi; ) ((Wi = Vn[--Qn]), (Vn[Qn] = null), (Ua = Vn[--Qn]), (Vn[Qn] = null));
    for (; e === wl; )
      ((wl = Ht[--Gt]),
        (Ht[Gt] = null),
        (tl = Ht[--Gt]),
        (Ht[Gt] = null),
        (el = Ht[--Gt]),
        (Ht[Gt] = null));
  }
  function Of(e, t) {
    ((Ht[Gt++] = el), (Ht[Gt++] = tl), (Ht[Gt++] = wl), (el = t.id), (tl = t.overflow), (wl = e));
  }
  var ut = null,
    qe = null,
    be = !1,
    Bl = null,
    Yt = !1,
    Ws = Error(c(519));
  function Ul(e) {
    var t = Error(
      c(418, 1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? 'text' : 'HTML', '')
    );
    throw (qa(Lt(t, e)), Ws);
  }
  function zf(e) {
    var t = e.stateNode,
      l = e.type,
      n = e.memoizedProps;
    switch (((t[it] = e), (t[yt] = n), l)) {
      case 'dialog':
        (ge('cancel', t), ge('close', t));
        break;
      case 'iframe':
      case 'object':
      case 'embed':
        ge('load', t);
        break;
      case 'video':
      case 'audio':
        for (l = 0; l < ui.length; l++) ge(ui[l], t);
        break;
      case 'source':
        ge('error', t);
        break;
      case 'img':
      case 'image':
      case 'link':
        (ge('error', t), ge('load', t));
        break;
      case 'details':
        ge('toggle', t);
        break;
      case 'input':
        (ge('invalid', t),
          Qr(t, n.value, n.defaultValue, n.checked, n.defaultChecked, n.type, n.name, !0));
        break;
      case 'select':
        ge('invalid', t);
        break;
      case 'textarea':
        (ge('invalid', t), $r(t, n.value, n.defaultValue, n.children));
    }
    ((l = n.children),
      (typeof l != 'string' && typeof l != 'number' && typeof l != 'bigint') ||
      t.textContent === '' + l ||
      n.suppressHydrationWarning === !0 ||
      Im(t.textContent, l)
        ? (n.popover != null && (ge('beforetoggle', t), ge('toggle', t)),
          n.onScroll != null && ge('scroll', t),
          n.onScrollEnd != null && ge('scrollend', t),
          n.onClick != null && (t.onclick = sl),
          (t = !0))
        : (t = !1),
      t || Ul(e, !0));
  }
  function Df(e) {
    for (ut = e.return; ut; )
      switch (ut.tag) {
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
          ut = ut.return;
      }
  }
  function Zn(e) {
    if (e !== ut) return !1;
    if (!be) return (Df(e), (be = !0), !1);
    var t = e.tag,
      l;
    if (
      ((l = t !== 3 && t !== 27) &&
        ((l = t === 5) &&
          ((l = e.type), (l = !(l !== 'form' && l !== 'button') || yo(e.type, e.memoizedProps))),
        (l = !l)),
      l && qe && Ul(e),
      Df(e),
      t === 13)
    ) {
      if (((e = e.memoizedState), (e = e !== null ? e.dehydrated : null), !e)) throw Error(c(317));
      qe = ih(e);
    } else if (t === 31) {
      if (((e = e.memoizedState), (e = e !== null ? e.dehydrated : null), !e)) throw Error(c(317));
      qe = ih(e);
    } else
      t === 27
        ? ((t = qe), Wl(e.type) ? ((e = So), (So = null), (qe = e)) : (qe = t))
        : (qe = ut ? Vt(e.stateNode.nextSibling) : null);
    return !0;
  }
  function pn() {
    ((qe = ut = null), (be = !1));
  }
  function Fs() {
    var e = Bl;
    return (e !== null && (St === null ? (St = e) : St.push.apply(St, e), (Bl = null)), e);
  }
  function qa(e) {
    Bl === null ? (Bl = [e]) : Bl.push(e);
  }
  var Ps = N(null),
    yn = null,
    fl = null;
  function ql(e, t, l) {
    (I(Ps, t._currentValue), (t._currentValue = l));
  }
  function dl(e) {
    ((e._currentValue = Ps.current), G(Ps));
  }
  function ec(e, t, l) {
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
  function tc(e, t, l, n) {
    var i = e.child;
    for (i !== null && (i.return = e); i !== null; ) {
      var s = i.dependencies;
      if (s !== null) {
        var f = i.child;
        s = s.firstContext;
        e: for (; s !== null; ) {
          var p = s;
          s = i;
          for (var x = 0; x < t.length; x++)
            if (p.context === t[x]) {
              ((s.lanes |= l),
                (p = s.alternate),
                p !== null && (p.lanes |= l),
                ec(s.return, l, e),
                n || (f = null));
              break e;
            }
          s = p.next;
        }
      } else if (i.tag === 18) {
        if (((f = i.return), f === null)) throw Error(c(341));
        ((f.lanes |= l), (s = f.alternate), s !== null && (s.lanes |= l), ec(f, l, e), (f = null));
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
  function $n(e, t, l, n) {
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
          var p = i.type;
          At(i.pendingProps.value, f.value) || (e !== null ? e.push(p) : (e = [p]));
        }
      } else if (i === Ee.current) {
        if (((f = i.alternate), f === null)) throw Error(c(387));
        f.memoizedState.memoizedState !== i.memoizedState.memoizedState &&
          (e !== null ? e.push(fi) : (e = [fi]));
      }
      i = i.return;
    }
    (e !== null && tc(t, e, l, n), (t.flags |= 262144));
  }
  function Fi(e) {
    for (e = e.firstContext; e !== null; ) {
      if (!At(e.context._currentValue, e.memoizedValue)) return !0;
      e = e.next;
    }
    return !1;
  }
  function gn(e) {
    ((yn = e), (fl = null), (e = e.dependencies), e !== null && (e.firstContext = null));
  }
  function st(e) {
    return wf(yn, e);
  }
  function Pi(e, t) {
    return (yn === null && gn(e), wf(e, t));
  }
  function wf(e, t) {
    var l = t._currentValue;
    if (((t = { context: t, memoizedValue: l, next: null }), fl === null)) {
      if (e === null) throw Error(c(308));
      ((fl = t), (e.dependencies = { lanes: 0, firstContext: t }), (e.flags |= 524288));
    } else fl = fl.next = t;
    return l;
  }
  var Sg =
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
    xg = a.unstable_scheduleCallback,
    Eg = a.unstable_NormalPriority,
    Ie = {
      $$typeof: Q,
      Consumer: null,
      Provider: null,
      _currentValue: null,
      _currentValue2: null,
      _threadCount: 0,
    };
  function lc() {
    return { controller: new Sg(), data: new Map(), refCount: 0 };
  }
  function La(e) {
    (e.refCount--,
      e.refCount === 0 &&
        xg(Eg, function () {
          e.controller.abort();
        }));
  }
  var Ha = null,
    nc = 0,
    Kn = 0,
    Jn = null;
  function Tg(e, t) {
    if (Ha === null) {
      var l = (Ha = []);
      ((nc = 0),
        (Kn = uo()),
        (Jn = {
          status: 'pending',
          value: void 0,
          then: function (n) {
            l.push(n);
          },
        }));
    }
    return (nc++, t.then(Bf, Bf), t);
  }
  function Bf() {
    if (--nc === 0 && Ha !== null) {
      Jn !== null && (Jn.status = 'fulfilled');
      var e = Ha;
      ((Ha = null), (Kn = 0), (Jn = null));
      for (var t = 0; t < e.length; t++) (0, e[t])();
    }
  }
  function Ng(e, t) {
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
  var Uf = L.S;
  L.S = function (e, t) {
    ((bm = Et()),
      typeof t == 'object' && t !== null && typeof t.then == 'function' && Tg(e, t),
      Uf !== null && Uf(e, t));
  };
  var vn = N(null);
  function ac() {
    var e = vn.current;
    return e !== null ? e : Ue.pooledCache;
  }
  function eu(e, t) {
    t === null ? I(vn, vn.current) : I(vn, t.pool);
  }
  function qf() {
    var e = ac();
    return e === null ? null : { parent: Ie._currentValue, pool: e };
  }
  var In = Error(c(460)),
    ic = Error(c(474)),
    tu = Error(c(542)),
    lu = { then: function () {} };
  function Lf(e) {
    return ((e = e.status), e === 'fulfilled' || e === 'rejected');
  }
  function Hf(e, t, l) {
    switch (
      ((l = e[l]), l === void 0 ? e.push(t) : l !== t && (t.then(sl, sl), (t = l)), t.status)
    ) {
      case 'fulfilled':
        return t.value;
      case 'rejected':
        throw ((e = t.reason), Yf(e), e);
      default:
        if (typeof t.status == 'string') t.then(sl, sl);
        else {
          if (((e = Ue), e !== null && 100 < e.shellSuspendCounter)) throw Error(c(482));
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
            throw ((e = t.reason), Yf(e), e);
        }
        throw ((bn = t), In);
    }
  }
  function _n(e) {
    try {
      var t = e._init;
      return t(e._payload);
    } catch (l) {
      throw l !== null && typeof l == 'object' && typeof l.then == 'function' ? ((bn = l), In) : l;
    }
  }
  var bn = null;
  function Gf() {
    if (bn === null) throw Error(c(459));
    var e = bn;
    return ((bn = null), e);
  }
  function Yf(e) {
    if (e === In || e === tu) throw Error(c(483));
  }
  var Wn = null,
    Ga = 0;
  function nu(e) {
    var t = Ga;
    return ((Ga += 1), Wn === null && (Wn = []), Hf(Wn, e, t));
  }
  function Ya(e, t) {
    ((t = t.props.ref), (e.ref = t !== void 0 ? t : null));
  }
  function au(e, t) {
    throw t.$$typeof === O
      ? Error(c(525))
      : ((e = Object.prototype.toString.call(t)),
        Error(
          c(
            31,
            e === '[object Object]' ? 'object with keys {' + Object.keys(t).join(', ') + '}' : e
          )
        ));
  }
  function Xf(e) {
    function t(M, E) {
      if (e) {
        var k = M.deletions;
        k === null ? ((M.deletions = [E]), (M.flags |= 16)) : k.push(E);
      }
    }
    function l(M, E) {
      if (!e) return null;
      for (; E !== null; ) (t(M, E), (E = E.sibling));
      return null;
    }
    function n(M) {
      for (var E = new Map(); M !== null; )
        (M.key !== null ? E.set(M.key, M) : E.set(M.index, M), (M = M.sibling));
      return E;
    }
    function i(M, E) {
      return ((M = ol(M, E)), (M.index = 0), (M.sibling = null), M);
    }
    function s(M, E, k) {
      return (
        (M.index = k),
        e
          ? ((k = M.alternate),
            k !== null
              ? ((k = k.index), k < E ? ((M.flags |= 67108866), E) : k)
              : ((M.flags |= 67108866), E))
          : ((M.flags |= 1048576), E)
      );
    }
    function f(M) {
      return (e && M.alternate === null && (M.flags |= 67108866), M);
    }
    function p(M, E, k, Y) {
      return E === null || E.tag !== 6
        ? ((E = $s(k, M.mode, Y)), (E.return = M), E)
        : ((E = i(E, k)), (E.return = M), E);
    }
    function x(M, E, k, Y) {
      var ne = k.type;
      return ne === R
        ? H(M, E, k.props.children, Y, k.key)
        : E !== null &&
            (E.elementType === ne ||
              (typeof ne == 'object' && ne !== null && ne.$$typeof === B && _n(ne) === E.type))
          ? ((E = i(E, k.props)), Ya(E, k), (E.return = M), E)
          : ((E = Ii(k.type, k.key, k.props, null, M.mode, Y)), Ya(E, k), (E.return = M), E);
    }
    function j(M, E, k, Y) {
      return E === null ||
        E.tag !== 4 ||
        E.stateNode.containerInfo !== k.containerInfo ||
        E.stateNode.implementation !== k.implementation
        ? ((E = Ks(k, M.mode, Y)), (E.return = M), E)
        : ((E = i(E, k.children || [])), (E.return = M), E);
    }
    function H(M, E, k, Y, ne) {
      return E === null || E.tag !== 7
        ? ((E = hn(k, M.mode, Y, ne)), (E.return = M), E)
        : ((E = i(E, k)), (E.return = M), E);
    }
    function V(M, E, k) {
      if ((typeof E == 'string' && E !== '') || typeof E == 'number' || typeof E == 'bigint')
        return ((E = $s('' + E, M.mode, k)), (E.return = M), E);
      if (typeof E == 'object' && E !== null) {
        switch (E.$$typeof) {
          case C:
            return ((k = Ii(E.type, E.key, E.props, null, M.mode, k)), Ya(k, E), (k.return = M), k);
          case b:
            return ((E = Ks(E, M.mode, k)), (E.return = M), E);
          case B:
            return ((E = _n(E)), V(M, E, k));
        }
        if (He(E) || de(E)) return ((E = hn(E, M.mode, k, null)), (E.return = M), E);
        if (typeof E.then == 'function') return V(M, nu(E), k);
        if (E.$$typeof === Q) return V(M, Pi(M, E), k);
        au(M, E);
      }
      return null;
    }
    function z(M, E, k, Y) {
      var ne = E !== null ? E.key : null;
      if ((typeof k == 'string' && k !== '') || typeof k == 'number' || typeof k == 'bigint')
        return ne !== null ? null : p(M, E, '' + k, Y);
      if (typeof k == 'object' && k !== null) {
        switch (k.$$typeof) {
          case C:
            return k.key === ne ? x(M, E, k, Y) : null;
          case b:
            return k.key === ne ? j(M, E, k, Y) : null;
          case B:
            return ((k = _n(k)), z(M, E, k, Y));
        }
        if (He(k) || de(k)) return ne !== null ? null : H(M, E, k, Y, null);
        if (typeof k.then == 'function') return z(M, E, nu(k), Y);
        if (k.$$typeof === Q) return z(M, E, Pi(M, k), Y);
        au(M, k);
      }
      return null;
    }
    function w(M, E, k, Y, ne) {
      if ((typeof Y == 'string' && Y !== '') || typeof Y == 'number' || typeof Y == 'bigint')
        return ((M = M.get(k) || null), p(E, M, '' + Y, ne));
      if (typeof Y == 'object' && Y !== null) {
        switch (Y.$$typeof) {
          case C:
            return ((M = M.get(Y.key === null ? k : Y.key) || null), x(E, M, Y, ne));
          case b:
            return ((M = M.get(Y.key === null ? k : Y.key) || null), j(E, M, Y, ne));
          case B:
            return ((Y = _n(Y)), w(M, E, k, Y, ne));
        }
        if (He(Y) || de(Y)) return ((M = M.get(k) || null), H(E, M, Y, ne, null));
        if (typeof Y.then == 'function') return w(M, E, k, nu(Y), ne);
        if (Y.$$typeof === Q) return w(M, E, k, Pi(E, Y), ne);
        au(E, Y);
      }
      return null;
    }
    function ee(M, E, k, Y) {
      for (
        var ne = null, Te = null, te = E, he = (E = 0), _e = null;
        te !== null && he < k.length;
        he++
      ) {
        te.index > he ? ((_e = te), (te = null)) : (_e = te.sibling);
        var Ne = z(M, te, k[he], Y);
        if (Ne === null) {
          te === null && (te = _e);
          break;
        }
        (e && te && Ne.alternate === null && t(M, te),
          (E = s(Ne, E, he)),
          Te === null ? (ne = Ne) : (Te.sibling = Ne),
          (Te = Ne),
          (te = _e));
      }
      if (he === k.length) return (l(M, te), be && rl(M, he), ne);
      if (te === null) {
        for (; he < k.length; he++)
          ((te = V(M, k[he], Y)),
            te !== null &&
              ((E = s(te, E, he)), Te === null ? (ne = te) : (Te.sibling = te), (Te = te)));
        return (be && rl(M, he), ne);
      }
      for (te = n(te); he < k.length; he++)
        ((_e = w(te, M, he, k[he], Y)),
          _e !== null &&
            (e && _e.alternate !== null && te.delete(_e.key === null ? he : _e.key),
            (E = s(_e, E, he)),
            Te === null ? (ne = _e) : (Te.sibling = _e),
            (Te = _e)));
      return (
        e &&
          te.forEach(function (ln) {
            return t(M, ln);
          }),
        be && rl(M, he),
        ne
      );
    }
    function ue(M, E, k, Y) {
      if (k == null) throw Error(c(151));
      for (
        var ne = null, Te = null, te = E, he = (E = 0), _e = null, Ne = k.next();
        te !== null && !Ne.done;
        he++, Ne = k.next()
      ) {
        te.index > he ? ((_e = te), (te = null)) : (_e = te.sibling);
        var ln = z(M, te, Ne.value, Y);
        if (ln === null) {
          te === null && (te = _e);
          break;
        }
        (e && te && ln.alternate === null && t(M, te),
          (E = s(ln, E, he)),
          Te === null ? (ne = ln) : (Te.sibling = ln),
          (Te = ln),
          (te = _e));
      }
      if (Ne.done) return (l(M, te), be && rl(M, he), ne);
      if (te === null) {
        for (; !Ne.done; he++, Ne = k.next())
          ((Ne = V(M, Ne.value, Y)),
            Ne !== null &&
              ((E = s(Ne, E, he)), Te === null ? (ne = Ne) : (Te.sibling = Ne), (Te = Ne)));
        return (be && rl(M, he), ne);
      }
      for (te = n(te); !Ne.done; he++, Ne = k.next())
        ((Ne = w(te, M, he, Ne.value, Y)),
          Ne !== null &&
            (e && Ne.alternate !== null && te.delete(Ne.key === null ? he : Ne.key),
            (E = s(Ne, E, he)),
            Te === null ? (ne = Ne) : (Te.sibling = Ne),
            (Te = Ne)));
      return (
        e &&
          te.forEach(function (B0) {
            return t(M, B0);
          }),
        be && rl(M, he),
        ne
      );
    }
    function Be(M, E, k, Y) {
      if (
        (typeof k == 'object' &&
          k !== null &&
          k.type === R &&
          k.key === null &&
          (k = k.props.children),
        typeof k == 'object' && k !== null)
      ) {
        switch (k.$$typeof) {
          case C:
            e: {
              for (var ne = k.key; E !== null; ) {
                if (E.key === ne) {
                  if (((ne = k.type), ne === R)) {
                    if (E.tag === 7) {
                      (l(M, E.sibling), (Y = i(E, k.props.children)), (Y.return = M), (M = Y));
                      break e;
                    }
                  } else if (
                    E.elementType === ne ||
                    (typeof ne == 'object' && ne !== null && ne.$$typeof === B && _n(ne) === E.type)
                  ) {
                    (l(M, E.sibling), (Y = i(E, k.props)), Ya(Y, k), (Y.return = M), (M = Y));
                    break e;
                  }
                  l(M, E);
                  break;
                } else t(M, E);
                E = E.sibling;
              }
              k.type === R
                ? ((Y = hn(k.props.children, M.mode, Y, k.key)), (Y.return = M), (M = Y))
                : ((Y = Ii(k.type, k.key, k.props, null, M.mode, Y)),
                  Ya(Y, k),
                  (Y.return = M),
                  (M = Y));
            }
            return f(M);
          case b:
            e: {
              for (ne = k.key; E !== null; ) {
                if (E.key === ne)
                  if (
                    E.tag === 4 &&
                    E.stateNode.containerInfo === k.containerInfo &&
                    E.stateNode.implementation === k.implementation
                  ) {
                    (l(M, E.sibling), (Y = i(E, k.children || [])), (Y.return = M), (M = Y));
                    break e;
                  } else {
                    l(M, E);
                    break;
                  }
                else t(M, E);
                E = E.sibling;
              }
              ((Y = Ks(k, M.mode, Y)), (Y.return = M), (M = Y));
            }
            return f(M);
          case B:
            return ((k = _n(k)), Be(M, E, k, Y));
        }
        if (He(k)) return ee(M, E, k, Y);
        if (de(k)) {
          if (((ne = de(k)), typeof ne != 'function')) throw Error(c(150));
          return ((k = ne.call(k)), ue(M, E, k, Y));
        }
        if (typeof k.then == 'function') return Be(M, E, nu(k), Y);
        if (k.$$typeof === Q) return Be(M, E, Pi(M, k), Y);
        au(M, k);
      }
      return (typeof k == 'string' && k !== '') || typeof k == 'number' || typeof k == 'bigint'
        ? ((k = '' + k),
          E !== null && E.tag === 6
            ? (l(M, E.sibling), (Y = i(E, k)), (Y.return = M), (M = Y))
            : (l(M, E), (Y = $s(k, M.mode, Y)), (Y.return = M), (M = Y)),
          f(M))
        : l(M, E);
    }
    return function (M, E, k, Y) {
      try {
        Ga = 0;
        var ne = Be(M, E, k, Y);
        return ((Wn = null), ne);
      } catch (te) {
        if (te === In || te === tu) throw te;
        var Te = Ct(29, te, null, M.mode);
        return ((Te.lanes = Y), (Te.return = M), Te);
      } finally {
      }
    };
  }
  var Sn = Xf(!0),
    Vf = Xf(!1),
    Ll = !1;
  function uc(e) {
    e.updateQueue = {
      baseState: e.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null,
    };
  }
  function sc(e, t) {
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
  function Hl(e) {
    return { lane: e, tag: 0, payload: null, callback: null, next: null };
  }
  function Gl(e, t, l) {
    var n = e.updateQueue;
    if (n === null) return null;
    if (((n = n.shared), (Ce & 2) !== 0)) {
      var i = n.pending;
      return (
        i === null ? (t.next = t) : ((t.next = i.next), (i.next = t)),
        (n.pending = t),
        (t = Ji(e)),
        Cf(e, null, l),
        t
      );
    }
    return (Ki(e, n, t, l), Ji(e));
  }
  function Xa(e, t, l) {
    if (((t = t.updateQueue), t !== null && ((t = t.shared), (l & 4194048) !== 0))) {
      var n = t.lanes;
      ((n &= e.pendingLanes), (l |= n), (t.lanes = l), Dr(e, l));
    }
  }
  function cc(e, t) {
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
  var oc = !1;
  function Va() {
    if (oc) {
      var e = Jn;
      if (e !== null) throw e;
    }
  }
  function Qa(e, t, l, n) {
    oc = !1;
    var i = e.updateQueue;
    Ll = !1;
    var s = i.firstBaseUpdate,
      f = i.lastBaseUpdate,
      p = i.shared.pending;
    if (p !== null) {
      i.shared.pending = null;
      var x = p,
        j = x.next;
      ((x.next = null), f === null ? (s = j) : (f.next = j), (f = x));
      var H = e.alternate;
      H !== null &&
        ((H = H.updateQueue),
        (p = H.lastBaseUpdate),
        p !== f && (p === null ? (H.firstBaseUpdate = j) : (p.next = j), (H.lastBaseUpdate = x)));
    }
    if (s !== null) {
      var V = i.baseState;
      ((f = 0), (H = j = x = null), (p = s));
      do {
        var z = p.lane & -536870913,
          w = z !== p.lane;
        if (w ? (ve & z) === z : (n & z) === z) {
          (z !== 0 && z === Kn && (oc = !0),
            H !== null &&
              (H = H.next =
                { lane: 0, tag: p.tag, payload: p.payload, callback: null, next: null }));
          e: {
            var ee = e,
              ue = p;
            z = t;
            var Be = l;
            switch (ue.tag) {
              case 1:
                if (((ee = ue.payload), typeof ee == 'function')) {
                  V = ee.call(Be, V, z);
                  break e;
                }
                V = ee;
                break e;
              case 3:
                ee.flags = (ee.flags & -65537) | 128;
              case 0:
                if (
                  ((ee = ue.payload),
                  (z = typeof ee == 'function' ? ee.call(Be, V, z) : ee),
                  z == null)
                )
                  break e;
                V = S({}, V, z);
                break e;
              case 2:
                Ll = !0;
            }
          }
          ((z = p.callback),
            z !== null &&
              ((e.flags |= 64),
              w && (e.flags |= 8192),
              (w = i.callbacks),
              w === null ? (i.callbacks = [z]) : w.push(z)));
        } else
          ((w = { lane: z, tag: p.tag, payload: p.payload, callback: p.callback, next: null }),
            H === null ? ((j = H = w), (x = V)) : (H = H.next = w),
            (f |= z));
        if (((p = p.next), p === null)) {
          if (((p = i.shared.pending), p === null)) break;
          ((w = p),
            (p = w.next),
            (w.next = null),
            (i.lastBaseUpdate = w),
            (i.shared.pending = null));
        }
      } while (!0);
      (H === null && (x = V),
        (i.baseState = x),
        (i.firstBaseUpdate = j),
        (i.lastBaseUpdate = H),
        s === null && (i.shared.lanes = 0),
        (Zl |= f),
        (e.lanes = f),
        (e.memoizedState = V));
    }
  }
  function Qf(e, t) {
    if (typeof e != 'function') throw Error(c(191, e));
    e.call(t);
  }
  function Zf(e, t) {
    var l = e.callbacks;
    if (l !== null) for (e.callbacks = null, e = 0; e < l.length; e++) Qf(l[e], t);
  }
  var Fn = N(null),
    iu = N(0);
  function $f(e, t) {
    ((e = Sl), I(iu, e), I(Fn, t), (Sl = e | t.baseLanes));
  }
  function rc() {
    (I(iu, Sl), I(Fn, Fn.current));
  }
  function fc() {
    ((Sl = iu.current), G(Fn), G(iu));
  }
  var Mt = N(null),
    Xt = null;
  function Yl(e) {
    var t = e.alternate;
    (I(Ke, Ke.current & 1),
      I(Mt, e),
      Xt === null && (t === null || Fn.current !== null || t.memoizedState !== null) && (Xt = e));
  }
  function dc(e) {
    (I(Ke, Ke.current), I(Mt, e), Xt === null && (Xt = e));
  }
  function Kf(e) {
    e.tag === 22 ? (I(Ke, Ke.current), I(Mt, e), Xt === null && (Xt = e)) : Xl();
  }
  function Xl() {
    (I(Ke, Ke.current), I(Mt, Mt.current));
  }
  function Rt(e) {
    (G(Mt), Xt === e && (Xt = null), G(Ke));
  }
  var Ke = N(0);
  function uu(e) {
    for (var t = e; t !== null; ) {
      if (t.tag === 13) {
        var l = t.memoizedState;
        if (l !== null && ((l = l.dehydrated), l === null || _o(l) || bo(l))) return t;
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
  var ml = 0,
    me = null,
    De = null,
    We = null,
    su = !1,
    Pn = !1,
    xn = !1,
    cu = 0,
    Za = 0,
    ea = null,
    Ag = 0;
  function Ze() {
    throw Error(c(321));
  }
  function mc(e, t) {
    if (t === null) return !1;
    for (var l = 0; l < t.length && l < e.length; l++) if (!At(e[l], t[l])) return !1;
    return !0;
  }
  function hc(e, t, l, n, i, s) {
    return (
      (ml = s),
      (me = t),
      (t.memoizedState = null),
      (t.updateQueue = null),
      (t.lanes = 0),
      (L.H = e === null || e.memoizedState === null ? jd : Rc),
      (xn = !1),
      (s = l(n, i)),
      (xn = !1),
      Pn && (s = If(t, l, n, i)),
      Jf(e),
      s
    );
  }
  function Jf(e) {
    L.H = Ja;
    var t = De !== null && De.next !== null;
    if (((ml = 0), (We = De = me = null), (su = !1), (Za = 0), (ea = null), t)) throw Error(c(300));
    e === null || Fe || ((e = e.dependencies), e !== null && Fi(e) && (Fe = !0));
  }
  function If(e, t, l, n) {
    me = e;
    var i = 0;
    do {
      if ((Pn && (ea = null), (Za = 0), (Pn = !1), 25 <= i)) throw Error(c(301));
      if (((i += 1), (We = De = null), e.updateQueue != null)) {
        var s = e.updateQueue;
        ((s.lastEffect = null),
          (s.events = null),
          (s.stores = null),
          s.memoCache != null && (s.memoCache.index = 0));
      }
      ((L.H = Od), (s = t(l, n)));
    } while (Pn);
    return s;
  }
  function Cg() {
    var e = L.H,
      t = e.useState()[0];
    return (
      (t = typeof t.then == 'function' ? $a(t) : t),
      (e = e.useState()[0]),
      (De !== null ? De.memoizedState : null) !== e && (me.flags |= 1024),
      t
    );
  }
  function pc() {
    var e = cu !== 0;
    return ((cu = 0), e);
  }
  function yc(e, t, l) {
    ((t.updateQueue = e.updateQueue), (t.flags &= -2053), (e.lanes &= ~l));
  }
  function gc(e) {
    if (su) {
      for (e = e.memoizedState; e !== null; ) {
        var t = e.queue;
        (t !== null && (t.pending = null), (e = e.next));
      }
      su = !1;
    }
    ((ml = 0), (We = De = me = null), (Pn = !1), (Za = cu = 0), (ea = null));
  }
  function dt() {
    var e = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
    return (We === null ? (me.memoizedState = We = e) : (We = We.next = e), We);
  }
  function Je() {
    if (De === null) {
      var e = me.alternate;
      e = e !== null ? e.memoizedState : null;
    } else e = De.next;
    var t = We === null ? me.memoizedState : We.next;
    if (t !== null) ((We = t), (De = e));
    else {
      if (e === null) throw me.alternate === null ? Error(c(467)) : Error(c(310));
      ((De = e),
        (e = {
          memoizedState: De.memoizedState,
          baseState: De.baseState,
          baseQueue: De.baseQueue,
          queue: De.queue,
          next: null,
        }),
        We === null ? (me.memoizedState = We = e) : (We = We.next = e));
    }
    return We;
  }
  function ou() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function $a(e) {
    var t = Za;
    return (
      (Za += 1),
      ea === null && (ea = []),
      (e = Hf(ea, e, t)),
      (t = me),
      (We === null ? t.memoizedState : We.next) === null &&
        ((t = t.alternate), (L.H = t === null || t.memoizedState === null ? jd : Rc)),
      e
    );
  }
  function ru(e) {
    if (e !== null && typeof e == 'object') {
      if (typeof e.then == 'function') return $a(e);
      if (e.$$typeof === Q) return st(e);
    }
    throw Error(c(438, String(e)));
  }
  function vc(e) {
    var t = null,
      l = me.updateQueue;
    if ((l !== null && (t = l.memoCache), t == null)) {
      var n = me.alternate;
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
      l === null && ((l = ou()), (me.updateQueue = l)),
      (l.memoCache = t),
      (l = t.data[t.index]),
      l === void 0)
    )
      for (l = t.data[t.index] = Array(e), n = 0; n < e; n++) l[n] = le;
    return (t.index++, l);
  }
  function hl(e, t) {
    return typeof t == 'function' ? t(e) : t;
  }
  function fu(e) {
    var t = Je();
    return _c(t, De, e);
  }
  function _c(e, t, l) {
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
      var p = (f = null),
        x = null,
        j = t,
        H = !1;
      do {
        var V = j.lane & -536870913;
        if (V !== j.lane ? (ve & V) === V : (ml & V) === V) {
          var z = j.revertLane;
          if (z === 0)
            (x !== null &&
              (x = x.next =
                {
                  lane: 0,
                  revertLane: 0,
                  gesture: null,
                  action: j.action,
                  hasEagerState: j.hasEagerState,
                  eagerState: j.eagerState,
                  next: null,
                }),
              V === Kn && (H = !0));
          else if ((ml & z) === z) {
            ((j = j.next), z === Kn && (H = !0));
            continue;
          } else
            ((V = {
              lane: 0,
              revertLane: j.revertLane,
              gesture: null,
              action: j.action,
              hasEagerState: j.hasEagerState,
              eagerState: j.eagerState,
              next: null,
            }),
              x === null ? ((p = x = V), (f = s)) : (x = x.next = V),
              (me.lanes |= z),
              (Zl |= z));
          ((V = j.action), xn && l(s, V), (s = j.hasEagerState ? j.eagerState : l(s, V)));
        } else
          ((z = {
            lane: V,
            revertLane: j.revertLane,
            gesture: j.gesture,
            action: j.action,
            hasEagerState: j.hasEagerState,
            eagerState: j.eagerState,
            next: null,
          }),
            x === null ? ((p = x = z), (f = s)) : (x = x.next = z),
            (me.lanes |= V),
            (Zl |= V));
        j = j.next;
      } while (j !== null && j !== t);
      if (
        (x === null ? (f = s) : (x.next = p),
        !At(s, e.memoizedState) && ((Fe = !0), H && ((l = Jn), l !== null)))
      )
        throw l;
      ((e.memoizedState = s), (e.baseState = f), (e.baseQueue = x), (n.lastRenderedState = s));
    }
    return (i === null && (n.lanes = 0), [e.memoizedState, n.dispatch]);
  }
  function bc(e) {
    var t = Je(),
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
      (At(s, t.memoizedState) || (Fe = !0),
        (t.memoizedState = s),
        t.baseQueue === null && (t.baseState = s),
        (l.lastRenderedState = s));
    }
    return [s, n];
  }
  function Wf(e, t, l) {
    var n = me,
      i = Je(),
      s = be;
    if (s) {
      if (l === void 0) throw Error(c(407));
      l = l();
    } else l = t();
    var f = !At((De || i).memoizedState, l);
    if (
      (f && ((i.memoizedState = l), (Fe = !0)),
      (i = i.queue),
      Ec(ed.bind(null, n, i, e), [e]),
      i.getSnapshot !== t || f || (We !== null && We.memoizedState.tag & 1))
    ) {
      if (
        ((n.flags |= 2048),
        ta(9, { destroy: void 0 }, Pf.bind(null, n, i, l, t), null),
        Ue === null)
      )
        throw Error(c(349));
      s || (ml & 127) !== 0 || Ff(n, t, l);
    }
    return l;
  }
  function Ff(e, t, l) {
    ((e.flags |= 16384),
      (e = { getSnapshot: t, value: l }),
      (t = me.updateQueue),
      t === null
        ? ((t = ou()), (me.updateQueue = t), (t.stores = [e]))
        : ((l = t.stores), l === null ? (t.stores = [e]) : l.push(e)));
  }
  function Pf(e, t, l, n) {
    ((t.value = l), (t.getSnapshot = n), td(t) && ld(e));
  }
  function ed(e, t, l) {
    return l(function () {
      td(t) && ld(e);
    });
  }
  function td(e) {
    var t = e.getSnapshot;
    e = e.value;
    try {
      var l = t();
      return !At(e, l);
    } catch {
      return !0;
    }
  }
  function ld(e) {
    var t = mn(e, 2);
    t !== null && xt(t, e, 2);
  }
  function Sc(e) {
    var t = dt();
    if (typeof e == 'function') {
      var l = e;
      if (((e = l()), xn)) {
        Ol(!0);
        try {
          l();
        } finally {
          Ol(!1);
        }
      }
    }
    return (
      (t.memoizedState = t.baseState = e),
      (t.queue = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: hl,
        lastRenderedState: e,
      }),
      t
    );
  }
  function nd(e, t, l, n) {
    return ((e.baseState = l), _c(e, De, typeof n == 'function' ? n : hl));
  }
  function Mg(e, t, l, n, i) {
    if (hu(e)) throw Error(c(485));
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
      (L.T !== null ? l(!0) : (s.isTransition = !1),
        n(s),
        (l = t.pending),
        l === null
          ? ((s.next = t.pending = s), ad(t, s))
          : ((s.next = l.next), (t.pending = l.next = s)));
    }
  }
  function ad(e, t) {
    var l = t.action,
      n = t.payload,
      i = e.state;
    if (t.isTransition) {
      var s = L.T,
        f = {};
      L.T = f;
      try {
        var p = l(i, n),
          x = L.S;
        (x !== null && x(f, p), id(e, t, p));
      } catch (j) {
        xc(e, t, j);
      } finally {
        (s !== null && f.types !== null && (s.types = f.types), (L.T = s));
      }
    } else
      try {
        ((s = l(i, n)), id(e, t, s));
      } catch (j) {
        xc(e, t, j);
      }
  }
  function id(e, t, l) {
    l !== null && typeof l == 'object' && typeof l.then == 'function'
      ? l.then(
          function (n) {
            ud(e, t, n);
          },
          function (n) {
            return xc(e, t, n);
          }
        )
      : ud(e, t, l);
  }
  function ud(e, t, l) {
    ((t.status = 'fulfilled'),
      (t.value = l),
      sd(t),
      (e.state = l),
      (t = e.pending),
      t !== null &&
        ((l = t.next), l === t ? (e.pending = null) : ((l = l.next), (t.next = l), ad(e, l))));
  }
  function xc(e, t, l) {
    var n = e.pending;
    if (((e.pending = null), n !== null)) {
      n = n.next;
      do ((t.status = 'rejected'), (t.reason = l), sd(t), (t = t.next));
      while (t !== n);
    }
    e.action = null;
  }
  function sd(e) {
    e = e.listeners;
    for (var t = 0; t < e.length; t++) (0, e[t])();
  }
  function cd(e, t) {
    return t;
  }
  function od(e, t) {
    if (be) {
      var l = Ue.formState;
      if (l !== null) {
        e: {
          var n = me;
          if (be) {
            if (qe) {
              t: {
                for (var i = qe, s = Yt; i.nodeType !== 8; ) {
                  if (!s) {
                    i = null;
                    break t;
                  }
                  if (((i = Vt(i.nextSibling)), i === null)) {
                    i = null;
                    break t;
                  }
                }
                ((s = i.data), (i = s === 'F!' || s === 'F' ? i : null));
              }
              if (i) {
                ((qe = Vt(i.nextSibling)), (n = i.data === 'F!'));
                break e;
              }
            }
            Ul(n);
          }
          n = !1;
        }
        n && (t = l[0]);
      }
    }
    return (
      (l = dt()),
      (l.memoizedState = l.baseState = t),
      (n = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: cd,
        lastRenderedState: t,
      }),
      (l.queue = n),
      (l = Md.bind(null, me, n)),
      (n.dispatch = l),
      (n = Sc(!1)),
      (s = Mc.bind(null, me, !1, n.queue)),
      (n = dt()),
      (i = { state: t, dispatch: null, action: e, pending: null }),
      (n.queue = i),
      (l = Mg.bind(null, me, i, s, l)),
      (i.dispatch = l),
      (n.memoizedState = e),
      [t, l, !1]
    );
  }
  function rd(e) {
    var t = Je();
    return fd(t, De, e);
  }
  function fd(e, t, l) {
    if (
      ((t = _c(e, t, cd)[0]),
      (e = fu(hl)[0]),
      typeof t == 'object' && t !== null && typeof t.then == 'function')
    )
      try {
        var n = $a(t);
      } catch (f) {
        throw f === In ? tu : f;
      }
    else n = t;
    t = Je();
    var i = t.queue,
      s = i.dispatch;
    return (
      l !== t.memoizedState &&
        ((me.flags |= 2048), ta(9, { destroy: void 0 }, Rg.bind(null, i, l), null)),
      [n, s, e]
    );
  }
  function Rg(e, t) {
    e.action = t;
  }
  function dd(e) {
    var t = Je(),
      l = De;
    if (l !== null) return fd(t, l, e);
    (Je(), (t = t.memoizedState), (l = Je()));
    var n = l.queue.dispatch;
    return ((l.memoizedState = e), [t, n, !1]);
  }
  function ta(e, t, l, n) {
    return (
      (e = { tag: e, create: l, deps: n, inst: t, next: null }),
      (t = me.updateQueue),
      t === null && ((t = ou()), (me.updateQueue = t)),
      (l = t.lastEffect),
      l === null
        ? (t.lastEffect = e.next = e)
        : ((n = l.next), (l.next = e), (e.next = n), (t.lastEffect = e)),
      e
    );
  }
  function md() {
    return Je().memoizedState;
  }
  function du(e, t, l, n) {
    var i = dt();
    ((me.flags |= e),
      (i.memoizedState = ta(1 | t, { destroy: void 0 }, l, n === void 0 ? null : n)));
  }
  function mu(e, t, l, n) {
    var i = Je();
    n = n === void 0 ? null : n;
    var s = i.memoizedState.inst;
    De !== null && n !== null && mc(n, De.memoizedState.deps)
      ? (i.memoizedState = ta(t, s, l, n))
      : ((me.flags |= e), (i.memoizedState = ta(1 | t, s, l, n)));
  }
  function hd(e, t) {
    du(8390656, 8, e, t);
  }
  function Ec(e, t) {
    mu(2048, 8, e, t);
  }
  function kg(e) {
    me.flags |= 4;
    var t = me.updateQueue;
    if (t === null) ((t = ou()), (me.updateQueue = t), (t.events = [e]));
    else {
      var l = t.events;
      l === null ? (t.events = [e]) : l.push(e);
    }
  }
  function pd(e) {
    var t = Je().memoizedState;
    return (
      kg({ ref: t, nextImpl: e }),
      function () {
        if ((Ce & 2) !== 0) throw Error(c(440));
        return t.impl.apply(void 0, arguments);
      }
    );
  }
  function yd(e, t) {
    return mu(4, 2, e, t);
  }
  function gd(e, t) {
    return mu(4, 4, e, t);
  }
  function vd(e, t) {
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
  function _d(e, t, l) {
    ((l = l != null ? l.concat([e]) : null), mu(4, 4, vd.bind(null, t, e), l));
  }
  function Tc() {}
  function bd(e, t) {
    var l = Je();
    t = t === void 0 ? null : t;
    var n = l.memoizedState;
    return t !== null && mc(t, n[1]) ? n[0] : ((l.memoizedState = [e, t]), e);
  }
  function Sd(e, t) {
    var l = Je();
    t = t === void 0 ? null : t;
    var n = l.memoizedState;
    if (t !== null && mc(t, n[1])) return n[0];
    if (((n = e()), xn)) {
      Ol(!0);
      try {
        e();
      } finally {
        Ol(!1);
      }
    }
    return ((l.memoizedState = [n, t]), n);
  }
  function Nc(e, t, l) {
    return l === void 0 || ((ml & 1073741824) !== 0 && (ve & 261930) === 0)
      ? (e.memoizedState = t)
      : ((e.memoizedState = l), (e = xm()), (me.lanes |= e), (Zl |= e), l);
  }
  function xd(e, t, l, n) {
    return At(l, t)
      ? l
      : Fn.current !== null
        ? ((e = Nc(e, l, n)), At(e, t) || (Fe = !0), e)
        : (ml & 42) === 0 || ((ml & 1073741824) !== 0 && (ve & 261930) === 0)
          ? ((Fe = !0), (e.memoizedState = l))
          : ((e = xm()), (me.lanes |= e), (Zl |= e), t);
  }
  function Ed(e, t, l, n, i) {
    var s = J.p;
    J.p = s !== 0 && 8 > s ? s : 8;
    var f = L.T,
      p = {};
    ((L.T = p), Mc(e, !1, t, l));
    try {
      var x = i(),
        j = L.S;
      if (
        (j !== null && j(p, x), x !== null && typeof x == 'object' && typeof x.then == 'function')
      ) {
        var H = Ng(x, n);
        Ka(e, t, H, Ot(e));
      } else Ka(e, t, n, Ot(e));
    } catch (V) {
      Ka(e, t, { then: function () {}, status: 'rejected', reason: V }, Ot());
    } finally {
      ((J.p = s), f !== null && p.types !== null && (f.types = p.types), (L.T = f));
    }
  }
  function jg() {}
  function Ac(e, t, l, n) {
    if (e.tag !== 5) throw Error(c(476));
    var i = Td(e).queue;
    Ed(
      e,
      i,
      t,
      ie,
      l === null
        ? jg
        : function () {
            return (Nd(e), l(n));
          }
    );
  }
  function Td(e) {
    var t = e.memoizedState;
    if (t !== null) return t;
    t = {
      memoizedState: ie,
      baseState: ie,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: hl,
        lastRenderedState: ie,
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
          lastRenderedReducer: hl,
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
  function Nd(e) {
    var t = Td(e);
    (t.next === null && (t = e.alternate.memoizedState), Ka(e, t.next.queue, {}, Ot()));
  }
  function Cc() {
    return st(fi);
  }
  function Ad() {
    return Je().memoizedState;
  }
  function Cd() {
    return Je().memoizedState;
  }
  function Og(e) {
    for (var t = e.return; t !== null; ) {
      switch (t.tag) {
        case 24:
        case 3:
          var l = Ot();
          e = Hl(l);
          var n = Gl(t, e, l);
          (n !== null && (xt(n, t, l), Xa(n, t, l)), (t = { cache: lc() }), (e.payload = t));
          return;
      }
      t = t.return;
    }
  }
  function zg(e, t, l) {
    var n = Ot();
    ((l = {
      lane: n,
      revertLane: 0,
      gesture: null,
      action: l,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    }),
      hu(e) ? Rd(t, l) : ((l = Qs(e, t, l, n)), l !== null && (xt(l, e, n), kd(l, t, n))));
  }
  function Md(e, t, l) {
    var n = Ot();
    Ka(e, t, l, n);
  }
  function Ka(e, t, l, n) {
    var i = {
      lane: n,
      revertLane: 0,
      gesture: null,
      action: l,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    };
    if (hu(e)) Rd(t, i);
    else {
      var s = e.alternate;
      if (
        e.lanes === 0 &&
        (s === null || s.lanes === 0) &&
        ((s = t.lastRenderedReducer), s !== null)
      )
        try {
          var f = t.lastRenderedState,
            p = s(f, l);
          if (((i.hasEagerState = !0), (i.eagerState = p), At(p, f)))
            return (Ki(e, t, i, 0), Ue === null && $i(), !1);
        } catch {
        } finally {
        }
      if (((l = Qs(e, t, i, n)), l !== null)) return (xt(l, e, n), kd(l, t, n), !0);
    }
    return !1;
  }
  function Mc(e, t, l, n) {
    if (
      ((n = {
        lane: 2,
        revertLane: uo(),
        gesture: null,
        action: n,
        hasEagerState: !1,
        eagerState: null,
        next: null,
      }),
      hu(e))
    ) {
      if (t) throw Error(c(479));
    } else ((t = Qs(e, l, n, 2)), t !== null && xt(t, e, 2));
  }
  function hu(e) {
    var t = e.alternate;
    return e === me || (t !== null && t === me);
  }
  function Rd(e, t) {
    Pn = su = !0;
    var l = e.pending;
    (l === null ? (t.next = t) : ((t.next = l.next), (l.next = t)), (e.pending = t));
  }
  function kd(e, t, l) {
    if ((l & 4194048) !== 0) {
      var n = t.lanes;
      ((n &= e.pendingLanes), (l |= n), (t.lanes = l), Dr(e, l));
    }
  }
  var Ja = {
    readContext: st,
    use: ru,
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
  Ja.useEffectEvent = Ze;
  var jd = {
      readContext: st,
      use: ru,
      useCallback: function (e, t) {
        return ((dt().memoizedState = [e, t === void 0 ? null : t]), e);
      },
      useContext: st,
      useEffect: hd,
      useImperativeHandle: function (e, t, l) {
        ((l = l != null ? l.concat([e]) : null), du(4194308, 4, vd.bind(null, t, e), l));
      },
      useLayoutEffect: function (e, t) {
        return du(4194308, 4, e, t);
      },
      useInsertionEffect: function (e, t) {
        du(4, 2, e, t);
      },
      useMemo: function (e, t) {
        var l = dt();
        t = t === void 0 ? null : t;
        var n = e();
        if (xn) {
          Ol(!0);
          try {
            e();
          } finally {
            Ol(!1);
          }
        }
        return ((l.memoizedState = [n, t]), n);
      },
      useReducer: function (e, t, l) {
        var n = dt();
        if (l !== void 0) {
          var i = l(t);
          if (xn) {
            Ol(!0);
            try {
              l(t);
            } finally {
              Ol(!1);
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
          (e = e.dispatch = zg.bind(null, me, e)),
          [n.memoizedState, e]
        );
      },
      useRef: function (e) {
        var t = dt();
        return ((e = { current: e }), (t.memoizedState = e));
      },
      useState: function (e) {
        e = Sc(e);
        var t = e.queue,
          l = Md.bind(null, me, t);
        return ((t.dispatch = l), [e.memoizedState, l]);
      },
      useDebugValue: Tc,
      useDeferredValue: function (e, t) {
        var l = dt();
        return Nc(l, e, t);
      },
      useTransition: function () {
        var e = Sc(!1);
        return ((e = Ed.bind(null, me, e.queue, !0, !1)), (dt().memoizedState = e), [!1, e]);
      },
      useSyncExternalStore: function (e, t, l) {
        var n = me,
          i = dt();
        if (be) {
          if (l === void 0) throw Error(c(407));
          l = l();
        } else {
          if (((l = t()), Ue === null)) throw Error(c(349));
          (ve & 127) !== 0 || Ff(n, t, l);
        }
        i.memoizedState = l;
        var s = { value: l, getSnapshot: t };
        return (
          (i.queue = s),
          hd(ed.bind(null, n, s, e), [e]),
          (n.flags |= 2048),
          ta(9, { destroy: void 0 }, Pf.bind(null, n, s, l, t), null),
          l
        );
      },
      useId: function () {
        var e = dt(),
          t = Ue.identifierPrefix;
        if (be) {
          var l = tl,
            n = el;
          ((l = (n & ~(1 << (32 - Nt(n) - 1))).toString(32) + l),
            (t = '_' + t + 'R_' + l),
            (l = cu++),
            0 < l && (t += 'H' + l.toString(32)),
            (t += '_'));
        } else ((l = Ag++), (t = '_' + t + 'r_' + l.toString(32) + '_'));
        return (e.memoizedState = t);
      },
      useHostTransitionStatus: Cc,
      useFormState: od,
      useActionState: od,
      useOptimistic: function (e) {
        var t = dt();
        t.memoizedState = t.baseState = e;
        var l = {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: null,
          lastRenderedState: null,
        };
        return ((t.queue = l), (t = Mc.bind(null, me, !0, l)), (l.dispatch = t), [e, t]);
      },
      useMemoCache: vc,
      useCacheRefresh: function () {
        return (dt().memoizedState = Og.bind(null, me));
      },
      useEffectEvent: function (e) {
        var t = dt(),
          l = { impl: e };
        return (
          (t.memoizedState = l),
          function () {
            if ((Ce & 2) !== 0) throw Error(c(440));
            return l.impl.apply(void 0, arguments);
          }
        );
      },
    },
    Rc = {
      readContext: st,
      use: ru,
      useCallback: bd,
      useContext: st,
      useEffect: Ec,
      useImperativeHandle: _d,
      useInsertionEffect: yd,
      useLayoutEffect: gd,
      useMemo: Sd,
      useReducer: fu,
      useRef: md,
      useState: function () {
        return fu(hl);
      },
      useDebugValue: Tc,
      useDeferredValue: function (e, t) {
        var l = Je();
        return xd(l, De.memoizedState, e, t);
      },
      useTransition: function () {
        var e = fu(hl)[0],
          t = Je().memoizedState;
        return [typeof e == 'boolean' ? e : $a(e), t];
      },
      useSyncExternalStore: Wf,
      useId: Ad,
      useHostTransitionStatus: Cc,
      useFormState: rd,
      useActionState: rd,
      useOptimistic: function (e, t) {
        var l = Je();
        return nd(l, De, e, t);
      },
      useMemoCache: vc,
      useCacheRefresh: Cd,
    };
  Rc.useEffectEvent = pd;
  var Od = {
    readContext: st,
    use: ru,
    useCallback: bd,
    useContext: st,
    useEffect: Ec,
    useImperativeHandle: _d,
    useInsertionEffect: yd,
    useLayoutEffect: gd,
    useMemo: Sd,
    useReducer: bc,
    useRef: md,
    useState: function () {
      return bc(hl);
    },
    useDebugValue: Tc,
    useDeferredValue: function (e, t) {
      var l = Je();
      return De === null ? Nc(l, e, t) : xd(l, De.memoizedState, e, t);
    },
    useTransition: function () {
      var e = bc(hl)[0],
        t = Je().memoizedState;
      return [typeof e == 'boolean' ? e : $a(e), t];
    },
    useSyncExternalStore: Wf,
    useId: Ad,
    useHostTransitionStatus: Cc,
    useFormState: dd,
    useActionState: dd,
    useOptimistic: function (e, t) {
      var l = Je();
      return De !== null ? nd(l, De, e, t) : ((l.baseState = e), [e, l.queue.dispatch]);
    },
    useMemoCache: vc,
    useCacheRefresh: Cd,
  };
  Od.useEffectEvent = pd;
  function kc(e, t, l, n) {
    ((t = e.memoizedState),
      (l = l(n, t)),
      (l = l == null ? t : S({}, t, l)),
      (e.memoizedState = l),
      e.lanes === 0 && (e.updateQueue.baseState = l));
  }
  var jc = {
    enqueueSetState: function (e, t, l) {
      e = e._reactInternals;
      var n = Ot(),
        i = Hl(n);
      ((i.payload = t),
        l != null && (i.callback = l),
        (t = Gl(e, i, n)),
        t !== null && (xt(t, e, n), Xa(t, e, n)));
    },
    enqueueReplaceState: function (e, t, l) {
      e = e._reactInternals;
      var n = Ot(),
        i = Hl(n);
      ((i.tag = 1),
        (i.payload = t),
        l != null && (i.callback = l),
        (t = Gl(e, i, n)),
        t !== null && (xt(t, e, n), Xa(t, e, n)));
    },
    enqueueForceUpdate: function (e, t) {
      e = e._reactInternals;
      var l = Ot(),
        n = Hl(l);
      ((n.tag = 2),
        t != null && (n.callback = t),
        (t = Gl(e, n, l)),
        t !== null && (xt(t, e, l), Xa(t, e, l)));
    },
  };
  function zd(e, t, l, n, i, s, f) {
    return (
      (e = e.stateNode),
      typeof e.shouldComponentUpdate == 'function'
        ? e.shouldComponentUpdate(n, s, f)
        : t.prototype && t.prototype.isPureReactComponent
          ? !wa(l, n) || !wa(i, s)
          : !0
    );
  }
  function Dd(e, t, l, n) {
    ((e = t.state),
      typeof t.componentWillReceiveProps == 'function' && t.componentWillReceiveProps(l, n),
      typeof t.UNSAFE_componentWillReceiveProps == 'function' &&
        t.UNSAFE_componentWillReceiveProps(l, n),
      t.state !== e && jc.enqueueReplaceState(t, t.state, null));
  }
  function En(e, t) {
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
  function wd(e) {
    Zi(e);
  }
  function Bd(e) {
    console.error(e);
  }
  function Ud(e) {
    Zi(e);
  }
  function pu(e, t) {
    try {
      var l = e.onUncaughtError;
      l(t.value, { componentStack: t.stack });
    } catch (n) {
      setTimeout(function () {
        throw n;
      });
    }
  }
  function qd(e, t, l) {
    try {
      var n = e.onCaughtError;
      n(l.value, { componentStack: l.stack, errorBoundary: t.tag === 1 ? t.stateNode : null });
    } catch (i) {
      setTimeout(function () {
        throw i;
      });
    }
  }
  function Oc(e, t, l) {
    return (
      (l = Hl(l)),
      (l.tag = 3),
      (l.payload = { element: null }),
      (l.callback = function () {
        pu(e, t);
      }),
      l
    );
  }
  function Ld(e) {
    return ((e = Hl(e)), (e.tag = 3), e);
  }
  function Hd(e, t, l, n) {
    var i = l.type.getDerivedStateFromError;
    if (typeof i == 'function') {
      var s = n.value;
      ((e.payload = function () {
        return i(s);
      }),
        (e.callback = function () {
          qd(t, l, n);
        }));
    }
    var f = l.stateNode;
    f !== null &&
      typeof f.componentDidCatch == 'function' &&
      (e.callback = function () {
        (qd(t, l, n),
          typeof i != 'function' && ($l === null ? ($l = new Set([this])) : $l.add(this)));
        var p = n.stack;
        this.componentDidCatch(n.value, { componentStack: p !== null ? p : '' });
      });
  }
  function Dg(e, t, l, n, i) {
    if (((l.flags |= 32768), n !== null && typeof n == 'object' && typeof n.then == 'function')) {
      if (((t = l.alternate), t !== null && $n(t, l, i, !0), (l = Mt.current), l !== null)) {
        switch (l.tag) {
          case 31:
          case 13:
            return (
              Xt === null ? Cu() : l.alternate === null && $e === 0 && ($e = 3),
              (l.flags &= -257),
              (l.flags |= 65536),
              (l.lanes = i),
              n === lu
                ? (l.flags |= 16384)
                : ((t = l.updateQueue),
                  t === null ? (l.updateQueue = new Set([n])) : t.add(n),
                  no(e, n, i)),
              !1
            );
          case 22:
            return (
              (l.flags |= 65536),
              n === lu
                ? (l.flags |= 16384)
                : ((t = l.updateQueue),
                  t === null
                    ? ((t = { transitions: null, markerInstances: null, retryQueue: new Set([n]) }),
                      (l.updateQueue = t))
                    : ((l = t.retryQueue), l === null ? (t.retryQueue = new Set([n])) : l.add(n)),
                  no(e, n, i)),
              !1
            );
        }
        throw Error(c(435, l.tag));
      }
      return (no(e, n, i), Cu(), !1);
    }
    if (be)
      return (
        (t = Mt.current),
        t !== null
          ? ((t.flags & 65536) === 0 && (t.flags |= 256),
            (t.flags |= 65536),
            (t.lanes = i),
            n !== Ws && ((e = Error(c(422), { cause: n })), qa(Lt(e, l))))
          : (n !== Ws && ((t = Error(c(423), { cause: n })), qa(Lt(t, l))),
            (e = e.current.alternate),
            (e.flags |= 65536),
            (i &= -i),
            (e.lanes |= i),
            (n = Lt(n, l)),
            (i = Oc(e.stateNode, n, i)),
            cc(e, i),
            $e !== 4 && ($e = 2)),
        !1
      );
    var s = Error(c(520), { cause: n });
    if (((s = Lt(s, l)), ni === null ? (ni = [s]) : ni.push(s), $e !== 4 && ($e = 2), t === null))
      return !0;
    ((n = Lt(n, l)), (l = t));
    do {
      switch (l.tag) {
        case 3:
          return (
            (l.flags |= 65536),
            (e = i & -i),
            (l.lanes |= e),
            (e = Oc(l.stateNode, n, e)),
            cc(l, e),
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
                  ($l === null || !$l.has(s)))))
          )
            return (
              (l.flags |= 65536),
              (i &= -i),
              (l.lanes |= i),
              (i = Ld(i)),
              Hd(i, e, l, n),
              cc(l, i),
              !1
            );
      }
      l = l.return;
    } while (l !== null);
    return !1;
  }
  var zc = Error(c(461)),
    Fe = !1;
  function ct(e, t, l, n) {
    t.child = e === null ? Vf(t, null, l, n) : Sn(t, e.child, l, n);
  }
  function Gd(e, t, l, n, i) {
    l = l.render;
    var s = t.ref;
    if ('ref' in n) {
      var f = {};
      for (var p in n) p !== 'ref' && (f[p] = n[p]);
    } else f = n;
    return (
      gn(t),
      (n = hc(e, t, l, f, s, i)),
      (p = pc()),
      e !== null && !Fe
        ? (yc(e, t, i), pl(e, t, i))
        : (be && p && Js(t), (t.flags |= 1), ct(e, t, n, i), t.child)
    );
  }
  function Yd(e, t, l, n, i) {
    if (e === null) {
      var s = l.type;
      return typeof s == 'function' && !Zs(s) && s.defaultProps === void 0 && l.compare === null
        ? ((t.tag = 15), (t.type = s), Xd(e, t, s, n, i))
        : ((e = Ii(l.type, null, n, t, t.mode, i)), (e.ref = t.ref), (e.return = t), (t.child = e));
    }
    if (((s = e.child), !Gc(e, i))) {
      var f = s.memoizedProps;
      if (((l = l.compare), (l = l !== null ? l : wa), l(f, n) && e.ref === t.ref))
        return pl(e, t, i);
    }
    return ((t.flags |= 1), (e = ol(s, n)), (e.ref = t.ref), (e.return = t), (t.child = e));
  }
  function Xd(e, t, l, n, i) {
    if (e !== null) {
      var s = e.memoizedProps;
      if (wa(s, n) && e.ref === t.ref)
        if (((Fe = !1), (t.pendingProps = n = s), Gc(e, i))) (e.flags & 131072) !== 0 && (Fe = !0);
        else return ((t.lanes = e.lanes), pl(e, t, i));
    }
    return Dc(e, t, l, n, i);
  }
  function Vd(e, t, l, n) {
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
        return Qd(e, t, s, l, n);
      }
      if ((l & 536870912) !== 0)
        ((t.memoizedState = { baseLanes: 0, cachePool: null }),
          e !== null && eu(t, s !== null ? s.cachePool : null),
          s !== null ? $f(t, s) : rc(),
          Kf(t));
      else return ((n = t.lanes = 536870912), Qd(e, t, s !== null ? s.baseLanes | l : l, l, n));
    } else
      s !== null
        ? (eu(t, s.cachePool), $f(t, s), Xl(), (t.memoizedState = null))
        : (e !== null && eu(t, null), rc(), Xl());
    return (ct(e, t, i, l), t.child);
  }
  function Ia(e, t) {
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
  function Qd(e, t, l, n, i) {
    var s = ac();
    return (
      (s = s === null ? null : { parent: Ie._currentValue, pool: s }),
      (t.memoizedState = { baseLanes: l, cachePool: s }),
      e !== null && eu(t, null),
      rc(),
      Kf(t),
      e !== null && $n(e, t, n, !0),
      (t.childLanes = i),
      null
    );
  }
  function yu(e, t) {
    return (
      (t = vu({ mode: t.mode, children: t.children }, e.mode)),
      (t.ref = e.ref),
      (e.child = t),
      (t.return = e),
      t
    );
  }
  function Zd(e, t, l) {
    return (
      Sn(t, e.child, null, l),
      (e = yu(t, t.pendingProps)),
      (e.flags |= 2),
      Rt(t),
      (t.memoizedState = null),
      e
    );
  }
  function wg(e, t, l) {
    var n = t.pendingProps,
      i = (t.flags & 128) !== 0;
    if (((t.flags &= -129), e === null)) {
      if (be) {
        if (n.mode === 'hidden') return ((e = yu(t, n)), (t.lanes = 536870912), Ia(null, e));
        if (
          (dc(t),
          (e = qe)
            ? ((e = ah(e, Yt)),
              (e = e !== null && e.data === '&' ? e : null),
              e !== null &&
                ((t.memoizedState = {
                  dehydrated: e,
                  treeContext: wl !== null ? { id: el, overflow: tl } : null,
                  retryLane: 536870912,
                  hydrationErrors: null,
                }),
                (l = Rf(e)),
                (l.return = t),
                (t.child = l),
                (ut = t),
                (qe = null)))
            : (e = null),
          e === null)
        )
          throw Ul(t);
        return ((t.lanes = 536870912), null);
      }
      return yu(t, n);
    }
    var s = e.memoizedState;
    if (s !== null) {
      var f = s.dehydrated;
      if ((dc(t), i))
        if (t.flags & 256) ((t.flags &= -257), (t = Zd(e, t, l)));
        else if (t.memoizedState !== null) ((t.child = e.child), (t.flags |= 128), (t = null));
        else throw Error(c(558));
      else if ((Fe || $n(e, t, l, !1), (i = (l & e.childLanes) !== 0), Fe || i)) {
        if (((n = Ue), n !== null && ((f = wr(n, l)), f !== 0 && f !== s.retryLane)))
          throw ((s.retryLane = f), mn(e, f), xt(n, e, f), zc);
        (Cu(), (t = Zd(e, t, l)));
      } else
        ((e = s.treeContext),
          (qe = Vt(f.nextSibling)),
          (ut = t),
          (be = !0),
          (Bl = null),
          (Yt = !1),
          e !== null && Of(t, e),
          (t = yu(t, n)),
          (t.flags |= 4096));
      return t;
    }
    return (
      (e = ol(e.child, { mode: n.mode, children: n.children })),
      (e.ref = t.ref),
      (t.child = e),
      (e.return = t),
      e
    );
  }
  function gu(e, t) {
    var l = t.ref;
    if (l === null) e !== null && e.ref !== null && (t.flags |= 4194816);
    else {
      if (typeof l != 'function' && typeof l != 'object') throw Error(c(284));
      (e === null || e.ref !== l) && (t.flags |= 4194816);
    }
  }
  function Dc(e, t, l, n, i) {
    return (
      gn(t),
      (l = hc(e, t, l, n, void 0, i)),
      (n = pc()),
      e !== null && !Fe
        ? (yc(e, t, i), pl(e, t, i))
        : (be && n && Js(t), (t.flags |= 1), ct(e, t, l, i), t.child)
    );
  }
  function $d(e, t, l, n, i, s) {
    return (
      gn(t),
      (t.updateQueue = null),
      (l = If(t, n, l, i)),
      Jf(e),
      (n = pc()),
      e !== null && !Fe
        ? (yc(e, t, s), pl(e, t, s))
        : (be && n && Js(t), (t.flags |= 1), ct(e, t, l, s), t.child)
    );
  }
  function Kd(e, t, l, n, i) {
    if ((gn(t), t.stateNode === null)) {
      var s = Xn,
        f = l.contextType;
      (typeof f == 'object' && f !== null && (s = st(f)),
        (s = new l(n, s)),
        (t.memoizedState = s.state !== null && s.state !== void 0 ? s.state : null),
        (s.updater = jc),
        (t.stateNode = s),
        (s._reactInternals = t),
        (s = t.stateNode),
        (s.props = n),
        (s.state = t.memoizedState),
        (s.refs = {}),
        uc(t),
        (f = l.contextType),
        (s.context = typeof f == 'object' && f !== null ? st(f) : Xn),
        (s.state = t.memoizedState),
        (f = l.getDerivedStateFromProps),
        typeof f == 'function' && (kc(t, l, f, n), (s.state = t.memoizedState)),
        typeof l.getDerivedStateFromProps == 'function' ||
          typeof s.getSnapshotBeforeUpdate == 'function' ||
          (typeof s.UNSAFE_componentWillMount != 'function' &&
            typeof s.componentWillMount != 'function') ||
          ((f = s.state),
          typeof s.componentWillMount == 'function' && s.componentWillMount(),
          typeof s.UNSAFE_componentWillMount == 'function' && s.UNSAFE_componentWillMount(),
          f !== s.state && jc.enqueueReplaceState(s, s.state, null),
          Qa(t, n, s, i),
          Va(),
          (s.state = t.memoizedState)),
        typeof s.componentDidMount == 'function' && (t.flags |= 4194308),
        (n = !0));
    } else if (e === null) {
      s = t.stateNode;
      var p = t.memoizedProps,
        x = En(l, p);
      s.props = x;
      var j = s.context,
        H = l.contextType;
      ((f = Xn), typeof H == 'object' && H !== null && (f = st(H)));
      var V = l.getDerivedStateFromProps;
      ((H = typeof V == 'function' || typeof s.getSnapshotBeforeUpdate == 'function'),
        (p = t.pendingProps !== p),
        H ||
          (typeof s.UNSAFE_componentWillReceiveProps != 'function' &&
            typeof s.componentWillReceiveProps != 'function') ||
          ((p || j !== f) && Dd(t, s, n, f)),
        (Ll = !1));
      var z = t.memoizedState;
      ((s.state = z),
        Qa(t, n, s, i),
        Va(),
        (j = t.memoizedState),
        p || z !== j || Ll
          ? (typeof V == 'function' && (kc(t, l, V, n), (j = t.memoizedState)),
            (x = Ll || zd(t, l, x, n, z, j, f))
              ? (H ||
                  (typeof s.UNSAFE_componentWillMount != 'function' &&
                    typeof s.componentWillMount != 'function') ||
                  (typeof s.componentWillMount == 'function' && s.componentWillMount(),
                  typeof s.UNSAFE_componentWillMount == 'function' &&
                    s.UNSAFE_componentWillMount()),
                typeof s.componentDidMount == 'function' && (t.flags |= 4194308))
              : (typeof s.componentDidMount == 'function' && (t.flags |= 4194308),
                (t.memoizedProps = n),
                (t.memoizedState = j)),
            (s.props = n),
            (s.state = j),
            (s.context = f),
            (n = x))
          : (typeof s.componentDidMount == 'function' && (t.flags |= 4194308), (n = !1)));
    } else {
      ((s = t.stateNode),
        sc(e, t),
        (f = t.memoizedProps),
        (H = En(l, f)),
        (s.props = H),
        (V = t.pendingProps),
        (z = s.context),
        (j = l.contextType),
        (x = Xn),
        typeof j == 'object' && j !== null && (x = st(j)),
        (p = l.getDerivedStateFromProps),
        (j = typeof p == 'function' || typeof s.getSnapshotBeforeUpdate == 'function') ||
          (typeof s.UNSAFE_componentWillReceiveProps != 'function' &&
            typeof s.componentWillReceiveProps != 'function') ||
          ((f !== V || z !== x) && Dd(t, s, n, x)),
        (Ll = !1),
        (z = t.memoizedState),
        (s.state = z),
        Qa(t, n, s, i),
        Va());
      var w = t.memoizedState;
      f !== V || z !== w || Ll || (e !== null && e.dependencies !== null && Fi(e.dependencies))
        ? (typeof p == 'function' && (kc(t, l, p, n), (w = t.memoizedState)),
          (H =
            Ll ||
            zd(t, l, H, n, z, w, x) ||
            (e !== null && e.dependencies !== null && Fi(e.dependencies)))
            ? (j ||
                (typeof s.UNSAFE_componentWillUpdate != 'function' &&
                  typeof s.componentWillUpdate != 'function') ||
                (typeof s.componentWillUpdate == 'function' && s.componentWillUpdate(n, w, x),
                typeof s.UNSAFE_componentWillUpdate == 'function' &&
                  s.UNSAFE_componentWillUpdate(n, w, x)),
              typeof s.componentDidUpdate == 'function' && (t.flags |= 4),
              typeof s.getSnapshotBeforeUpdate == 'function' && (t.flags |= 1024))
            : (typeof s.componentDidUpdate != 'function' ||
                (f === e.memoizedProps && z === e.memoizedState) ||
                (t.flags |= 4),
              typeof s.getSnapshotBeforeUpdate != 'function' ||
                (f === e.memoizedProps && z === e.memoizedState) ||
                (t.flags |= 1024),
              (t.memoizedProps = n),
              (t.memoizedState = w)),
          (s.props = n),
          (s.state = w),
          (s.context = x),
          (n = H))
        : (typeof s.componentDidUpdate != 'function' ||
            (f === e.memoizedProps && z === e.memoizedState) ||
            (t.flags |= 4),
          typeof s.getSnapshotBeforeUpdate != 'function' ||
            (f === e.memoizedProps && z === e.memoizedState) ||
            (t.flags |= 1024),
          (n = !1));
    }
    return (
      (s = n),
      gu(e, t),
      (n = (t.flags & 128) !== 0),
      s || n
        ? ((s = t.stateNode),
          (l = n && typeof l.getDerivedStateFromError != 'function' ? null : s.render()),
          (t.flags |= 1),
          e !== null && n
            ? ((t.child = Sn(t, e.child, null, i)), (t.child = Sn(t, null, l, i)))
            : ct(e, t, l, i),
          (t.memoizedState = s.state),
          (e = t.child))
        : (e = pl(e, t, i)),
      e
    );
  }
  function Jd(e, t, l, n) {
    return (pn(), (t.flags |= 256), ct(e, t, l, n), t.child);
  }
  var wc = { dehydrated: null, treeContext: null, retryLane: 0, hydrationErrors: null };
  function Bc(e) {
    return { baseLanes: e, cachePool: qf() };
  }
  function Uc(e, t, l) {
    return ((e = e !== null ? e.childLanes & ~l : 0), t && (e |= jt), e);
  }
  function Id(e, t, l) {
    var n = t.pendingProps,
      i = !1,
      s = (t.flags & 128) !== 0,
      f;
    if (
      ((f = s) || (f = e !== null && e.memoizedState === null ? !1 : (Ke.current & 2) !== 0),
      f && ((i = !0), (t.flags &= -129)),
      (f = (t.flags & 32) !== 0),
      (t.flags &= -33),
      e === null)
    ) {
      if (be) {
        if (
          (i ? Yl(t) : Xl(),
          (e = qe)
            ? ((e = ah(e, Yt)),
              (e = e !== null && e.data !== '&' ? e : null),
              e !== null &&
                ((t.memoizedState = {
                  dehydrated: e,
                  treeContext: wl !== null ? { id: el, overflow: tl } : null,
                  retryLane: 536870912,
                  hydrationErrors: null,
                }),
                (l = Rf(e)),
                (l.return = t),
                (t.child = l),
                (ut = t),
                (qe = null)))
            : (e = null),
          e === null)
        )
          throw Ul(t);
        return (bo(e) ? (t.lanes = 32) : (t.lanes = 536870912), null);
      }
      var p = n.children;
      return (
        (n = n.fallback),
        i
          ? (Xl(),
            (i = t.mode),
            (p = vu({ mode: 'hidden', children: p }, i)),
            (n = hn(n, i, l, null)),
            (p.return = t),
            (n.return = t),
            (p.sibling = n),
            (t.child = p),
            (n = t.child),
            (n.memoizedState = Bc(l)),
            (n.childLanes = Uc(e, f, l)),
            (t.memoizedState = wc),
            Ia(null, n))
          : (Yl(t), qc(t, p))
      );
    }
    var x = e.memoizedState;
    if (x !== null && ((p = x.dehydrated), p !== null)) {
      if (s)
        t.flags & 256
          ? (Yl(t), (t.flags &= -257), (t = Lc(e, t, l)))
          : t.memoizedState !== null
            ? (Xl(), (t.child = e.child), (t.flags |= 128), (t = null))
            : (Xl(),
              (p = n.fallback),
              (i = t.mode),
              (n = vu({ mode: 'visible', children: n.children }, i)),
              (p = hn(p, i, l, null)),
              (p.flags |= 2),
              (n.return = t),
              (p.return = t),
              (n.sibling = p),
              (t.child = n),
              Sn(t, e.child, null, l),
              (n = t.child),
              (n.memoizedState = Bc(l)),
              (n.childLanes = Uc(e, f, l)),
              (t.memoizedState = wc),
              (t = Ia(null, n)));
      else if ((Yl(t), bo(p))) {
        if (((f = p.nextSibling && p.nextSibling.dataset), f)) var j = f.dgst;
        ((f = j),
          (n = Error(c(419))),
          (n.stack = ''),
          (n.digest = f),
          qa({ value: n, source: null, stack: null }),
          (t = Lc(e, t, l)));
      } else if ((Fe || $n(e, t, l, !1), (f = (l & e.childLanes) !== 0), Fe || f)) {
        if (((f = Ue), f !== null && ((n = wr(f, l)), n !== 0 && n !== x.retryLane)))
          throw ((x.retryLane = n), mn(e, n), xt(f, e, n), zc);
        (_o(p) || Cu(), (t = Lc(e, t, l)));
      } else
        _o(p)
          ? ((t.flags |= 192), (t.child = e.child), (t = null))
          : ((e = x.treeContext),
            (qe = Vt(p.nextSibling)),
            (ut = t),
            (be = !0),
            (Bl = null),
            (Yt = !1),
            e !== null && Of(t, e),
            (t = qc(t, n.children)),
            (t.flags |= 4096));
      return t;
    }
    return i
      ? (Xl(),
        (p = n.fallback),
        (i = t.mode),
        (x = e.child),
        (j = x.sibling),
        (n = ol(x, { mode: 'hidden', children: n.children })),
        (n.subtreeFlags = x.subtreeFlags & 65011712),
        j !== null ? (p = ol(j, p)) : ((p = hn(p, i, l, null)), (p.flags |= 2)),
        (p.return = t),
        (n.return = t),
        (n.sibling = p),
        (t.child = n),
        Ia(null, n),
        (n = t.child),
        (p = e.child.memoizedState),
        p === null
          ? (p = Bc(l))
          : ((i = p.cachePool),
            i !== null
              ? ((x = Ie._currentValue), (i = i.parent !== x ? { parent: x, pool: x } : i))
              : (i = qf()),
            (p = { baseLanes: p.baseLanes | l, cachePool: i })),
        (n.memoizedState = p),
        (n.childLanes = Uc(e, f, l)),
        (t.memoizedState = wc),
        Ia(e.child, n))
      : (Yl(t),
        (l = e.child),
        (e = l.sibling),
        (l = ol(l, { mode: 'visible', children: n.children })),
        (l.return = t),
        (l.sibling = null),
        e !== null &&
          ((f = t.deletions), f === null ? ((t.deletions = [e]), (t.flags |= 16)) : f.push(e)),
        (t.child = l),
        (t.memoizedState = null),
        l);
  }
  function qc(e, t) {
    return ((t = vu({ mode: 'visible', children: t }, e.mode)), (t.return = e), (e.child = t));
  }
  function vu(e, t) {
    return ((e = Ct(22, e, null, t)), (e.lanes = 0), e);
  }
  function Lc(e, t, l) {
    return (
      Sn(t, e.child, null, l),
      (e = qc(t, t.pendingProps.children)),
      (e.flags |= 2),
      (t.memoizedState = null),
      e
    );
  }
  function Wd(e, t, l) {
    e.lanes |= t;
    var n = e.alternate;
    (n !== null && (n.lanes |= t), ec(e.return, t, l));
  }
  function Hc(e, t, l, n, i, s) {
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
  function Fd(e, t, l) {
    var n = t.pendingProps,
      i = n.revealOrder,
      s = n.tail;
    n = n.children;
    var f = Ke.current,
      p = (f & 2) !== 0;
    if (
      (p ? ((f = (f & 1) | 2), (t.flags |= 128)) : (f &= 1),
      I(Ke, f),
      ct(e, t, n, l),
      (n = be ? Ua : 0),
      !p && e !== null && (e.flags & 128) !== 0)
    )
      e: for (e = t.child; e !== null; ) {
        if (e.tag === 13) e.memoizedState !== null && Wd(e, l, t);
        else if (e.tag === 19) Wd(e, l, t);
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
          ((e = l.alternate), e !== null && uu(e) === null && (i = l), (l = l.sibling));
        ((l = i),
          l === null ? ((i = t.child), (t.child = null)) : ((i = l.sibling), (l.sibling = null)),
          Hc(t, !1, i, l, s, n));
        break;
      case 'backwards':
      case 'unstable_legacy-backwards':
        for (l = null, i = t.child, t.child = null; i !== null; ) {
          if (((e = i.alternate), e !== null && uu(e) === null)) {
            t.child = i;
            break;
          }
          ((e = i.sibling), (i.sibling = l), (l = i), (i = e));
        }
        Hc(t, !0, l, null, s, n);
        break;
      case 'together':
        Hc(t, !1, null, null, void 0, n);
        break;
      default:
        t.memoizedState = null;
    }
    return t.child;
  }
  function pl(e, t, l) {
    if (
      (e !== null && (t.dependencies = e.dependencies), (Zl |= t.lanes), (l & t.childLanes) === 0)
    )
      if (e !== null) {
        if (($n(e, t, l, !1), (l & t.childLanes) === 0)) return null;
      } else return null;
    if (e !== null && t.child !== e.child) throw Error(c(153));
    if (t.child !== null) {
      for (e = t.child, l = ol(e, e.pendingProps), t.child = l, l.return = t; e.sibling !== null; )
        ((e = e.sibling), (l = l.sibling = ol(e, e.pendingProps)), (l.return = t));
      l.sibling = null;
    }
    return t.child;
  }
  function Gc(e, t) {
    return (e.lanes & t) !== 0 ? !0 : ((e = e.dependencies), !!(e !== null && Fi(e)));
  }
  function Bg(e, t, l) {
    switch (t.tag) {
      case 3:
        (tt(t, t.stateNode.containerInfo), ql(t, Ie, e.memoizedState.cache), pn());
        break;
      case 27:
      case 5:
        X(t);
        break;
      case 4:
        tt(t, t.stateNode.containerInfo);
        break;
      case 10:
        ql(t, t.type, t.memoizedProps.value);
        break;
      case 31:
        if (t.memoizedState !== null) return ((t.flags |= 128), dc(t), null);
        break;
      case 13:
        var n = t.memoizedState;
        if (n !== null)
          return n.dehydrated !== null
            ? (Yl(t), (t.flags |= 128), null)
            : (l & t.child.childLanes) !== 0
              ? Id(e, t, l)
              : (Yl(t), (e = pl(e, t, l)), e !== null ? e.sibling : null);
        Yl(t);
        break;
      case 19:
        var i = (e.flags & 128) !== 0;
        if (
          ((n = (l & t.childLanes) !== 0),
          n || ($n(e, t, l, !1), (n = (l & t.childLanes) !== 0)),
          i)
        ) {
          if (n) return Fd(e, t, l);
          t.flags |= 128;
        }
        if (
          ((i = t.memoizedState),
          i !== null && ((i.rendering = null), (i.tail = null), (i.lastEffect = null)),
          I(Ke, Ke.current),
          n)
        )
          break;
        return null;
      case 22:
        return ((t.lanes = 0), Vd(e, t, l, t.pendingProps));
      case 24:
        ql(t, Ie, e.memoizedState.cache);
    }
    return pl(e, t, l);
  }
  function Pd(e, t, l) {
    if (e !== null)
      if (e.memoizedProps !== t.pendingProps) Fe = !0;
      else {
        if (!Gc(e, l) && (t.flags & 128) === 0) return ((Fe = !1), Bg(e, t, l));
        Fe = (e.flags & 131072) !== 0;
      }
    else ((Fe = !1), be && (t.flags & 1048576) !== 0 && jf(t, Ua, t.index));
    switch (((t.lanes = 0), t.tag)) {
      case 16:
        e: {
          var n = t.pendingProps;
          if (((e = _n(t.elementType)), (t.type = e), typeof e == 'function'))
            Zs(e)
              ? ((n = En(e, n)), (t.tag = 1), (t = Kd(null, t, e, n, l)))
              : ((t.tag = 0), (t = Dc(null, t, e, n, l)));
          else {
            if (e != null) {
              var i = e.$$typeof;
              if (i === D) {
                ((t.tag = 11), (t = Gd(null, t, e, n, l)));
                break e;
              } else if (i === Z) {
                ((t.tag = 14), (t = Yd(null, t, e, n, l)));
                break e;
              }
            }
            throw ((t = ht(e) || e), Error(c(306, t, '')));
          }
        }
        return t;
      case 0:
        return Dc(e, t, t.type, t.pendingProps, l);
      case 1:
        return ((n = t.type), (i = En(n, t.pendingProps)), Kd(e, t, n, i, l));
      case 3:
        e: {
          if ((tt(t, t.stateNode.containerInfo), e === null)) throw Error(c(387));
          n = t.pendingProps;
          var s = t.memoizedState;
          ((i = s.element), sc(e, t), Qa(t, n, null, l));
          var f = t.memoizedState;
          if (
            ((n = f.cache),
            ql(t, Ie, n),
            n !== s.cache && tc(t, [Ie], l, !0),
            Va(),
            (n = f.element),
            s.isDehydrated)
          )
            if (
              ((s = { element: n, isDehydrated: !1, cache: f.cache }),
              (t.updateQueue.baseState = s),
              (t.memoizedState = s),
              t.flags & 256)
            ) {
              t = Jd(e, t, n, l);
              break e;
            } else if (n !== i) {
              ((i = Lt(Error(c(424)), t)), qa(i), (t = Jd(e, t, n, l)));
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
                qe = Vt(e.firstChild),
                  ut = t,
                  be = !0,
                  Bl = null,
                  Yt = !0,
                  l = Vf(t, null, n, l),
                  t.child = l;
                l;
              )
                ((l.flags = (l.flags & -3) | 4096), (l = l.sibling));
            }
          else {
            if ((pn(), n === i)) {
              t = pl(e, t, l);
              break e;
            }
            ct(e, t, n, l);
          }
          t = t.child;
        }
        return t;
      case 26:
        return (
          gu(e, t),
          e === null
            ? (l = rh(t.type, null, t.pendingProps, null))
              ? (t.memoizedState = l)
              : be ||
                ((l = t.type),
                (e = t.pendingProps),
                (n = Du(pe.current).createElement(l)),
                (n[it] = t),
                (n[yt] = e),
                ot(n, l, e),
                lt(n),
                (t.stateNode = n))
            : (t.memoizedState = rh(t.type, e.memoizedProps, t.pendingProps, e.memoizedState)),
          null
        );
      case 27:
        return (
          X(t),
          e === null &&
            be &&
            ((n = t.stateNode = sh(t.type, t.pendingProps, pe.current)),
            (ut = t),
            (Yt = !0),
            (i = qe),
            Wl(t.type) ? ((So = i), (qe = Vt(n.firstChild))) : (qe = i)),
          ct(e, t, t.pendingProps.children, l),
          gu(e, t),
          e === null && (t.flags |= 4194304),
          t.child
        );
      case 5:
        return (
          e === null &&
            be &&
            ((i = n = qe) &&
              ((n = d0(n, t.type, t.pendingProps, Yt)),
              n !== null
                ? ((t.stateNode = n), (ut = t), (qe = Vt(n.firstChild)), (Yt = !1), (i = !0))
                : (i = !1)),
            i || Ul(t)),
          X(t),
          (i = t.type),
          (s = t.pendingProps),
          (f = e !== null ? e.memoizedProps : null),
          (n = s.children),
          yo(i, s) ? (n = null) : f !== null && yo(i, f) && (t.flags |= 32),
          t.memoizedState !== null && ((i = hc(e, t, Cg, null, null, l)), (fi._currentValue = i)),
          gu(e, t),
          ct(e, t, n, l),
          t.child
        );
      case 6:
        return (
          e === null &&
            be &&
            ((e = l = qe) &&
              ((l = m0(l, t.pendingProps, Yt)),
              l !== null ? ((t.stateNode = l), (ut = t), (qe = null), (e = !0)) : (e = !1)),
            e || Ul(t)),
          null
        );
      case 13:
        return Id(e, t, l);
      case 4:
        return (
          tt(t, t.stateNode.containerInfo),
          (n = t.pendingProps),
          e === null ? (t.child = Sn(t, null, n, l)) : ct(e, t, n, l),
          t.child
        );
      case 11:
        return Gd(e, t, t.type, t.pendingProps, l);
      case 7:
        return (ct(e, t, t.pendingProps, l), t.child);
      case 8:
        return (ct(e, t, t.pendingProps.children, l), t.child);
      case 12:
        return (ct(e, t, t.pendingProps.children, l), t.child);
      case 10:
        return ((n = t.pendingProps), ql(t, t.type, n.value), ct(e, t, n.children, l), t.child);
      case 9:
        return (
          (i = t.type._context),
          (n = t.pendingProps.children),
          gn(t),
          (i = st(i)),
          (n = n(i)),
          (t.flags |= 1),
          ct(e, t, n, l),
          t.child
        );
      case 14:
        return Yd(e, t, t.type, t.pendingProps, l);
      case 15:
        return Xd(e, t, t.type, t.pendingProps, l);
      case 19:
        return Fd(e, t, l);
      case 31:
        return wg(e, t, l);
      case 22:
        return Vd(e, t, l, t.pendingProps);
      case 24:
        return (
          gn(t),
          (n = st(Ie)),
          e === null
            ? ((i = ac()),
              i === null &&
                ((i = Ue),
                (s = lc()),
                (i.pooledCache = s),
                s.refCount++,
                s !== null && (i.pooledCacheLanes |= l),
                (i = s)),
              (t.memoizedState = { parent: n, cache: i }),
              uc(t),
              ql(t, Ie, i))
            : ((e.lanes & l) !== 0 && (sc(e, t), Qa(t, null, null, l), Va()),
              (i = e.memoizedState),
              (s = t.memoizedState),
              i.parent !== n
                ? ((i = { parent: n, cache: n }),
                  (t.memoizedState = i),
                  t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = i),
                  ql(t, Ie, n))
                : ((n = s.cache), ql(t, Ie, n), n !== i.cache && tc(t, [Ie], l, !0))),
          ct(e, t, t.pendingProps.children, l),
          t.child
        );
      case 29:
        throw t.pendingProps;
    }
    throw Error(c(156, t.tag));
  }
  function yl(e) {
    e.flags |= 4;
  }
  function Yc(e, t, l, n, i) {
    if (((t = (e.mode & 32) !== 0) && (t = !1), t)) {
      if (((e.flags |= 16777216), (i & 335544128) === i))
        if (e.stateNode.complete) e.flags |= 8192;
        else if (Am()) e.flags |= 8192;
        else throw ((bn = lu), ic);
    } else e.flags &= -16777217;
  }
  function em(e, t) {
    if (t.type !== 'stylesheet' || (t.state.loading & 4) !== 0) e.flags &= -16777217;
    else if (((e.flags |= 16777216), !ph(t)))
      if (Am()) e.flags |= 8192;
      else throw ((bn = lu), ic);
  }
  function _u(e, t) {
    (t !== null && (e.flags |= 4),
      e.flags & 16384 && ((t = e.tag !== 22 ? Or() : 536870912), (e.lanes |= t), (ia |= t)));
  }
  function Wa(e, t) {
    if (!be)
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
  function Le(e) {
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
  function Ug(e, t, l) {
    var n = t.pendingProps;
    switch ((Is(t), t.tag)) {
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return (Le(t), null);
      case 1:
        return (Le(t), null);
      case 3:
        return (
          (l = t.stateNode),
          (n = null),
          e !== null && (n = e.memoizedState.cache),
          t.memoizedState.cache !== n && (t.flags |= 2048),
          dl(Ie),
          Ge(),
          l.pendingContext && ((l.context = l.pendingContext), (l.pendingContext = null)),
          (e === null || e.child === null) &&
            (Zn(t)
              ? yl(t)
              : e === null ||
                (e.memoizedState.isDehydrated && (t.flags & 256) === 0) ||
                ((t.flags |= 1024), Fs())),
          Le(t),
          null
        );
      case 26:
        var i = t.type,
          s = t.memoizedState;
        return (
          e === null
            ? (yl(t), s !== null ? (Le(t), em(t, s)) : (Le(t), Yc(t, i, null, n, l)))
            : s
              ? s !== e.memoizedState
                ? (yl(t), Le(t), em(t, s))
                : (Le(t), (t.flags &= -16777217))
              : ((e = e.memoizedProps), e !== n && yl(t), Le(t), Yc(t, i, e, n, l)),
          null
        );
      case 27:
        if ((ae(t), (l = pe.current), (i = t.type), e !== null && t.stateNode != null))
          e.memoizedProps !== n && yl(t);
        else {
          if (!n) {
            if (t.stateNode === null) throw Error(c(166));
            return (Le(t), null);
          }
          ((e = P.current), Zn(t) ? zf(t) : ((e = sh(i, n, l)), (t.stateNode = e), yl(t)));
        }
        return (Le(t), null);
      case 5:
        if ((ae(t), (i = t.type), e !== null && t.stateNode != null))
          e.memoizedProps !== n && yl(t);
        else {
          if (!n) {
            if (t.stateNode === null) throw Error(c(166));
            return (Le(t), null);
          }
          if (((s = P.current), Zn(t))) zf(t);
          else {
            var f = Du(pe.current);
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
            ((s[it] = t), (s[yt] = n));
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
            e: switch ((ot(s, i, n), i)) {
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
            n && yl(t);
          }
        }
        return (Le(t), Yc(t, t.type, e === null ? null : e.memoizedProps, t.pendingProps, l), null);
      case 6:
        if (e && t.stateNode != null) e.memoizedProps !== n && yl(t);
        else {
          if (typeof n != 'string' && t.stateNode === null) throw Error(c(166));
          if (((e = pe.current), Zn(t))) {
            if (((e = t.stateNode), (l = t.memoizedProps), (n = null), (i = ut), i !== null))
              switch (i.tag) {
                case 27:
                case 5:
                  n = i.memoizedProps;
              }
            ((e[it] = t),
              (e = !!(
                e.nodeValue === l ||
                (n !== null && n.suppressHydrationWarning === !0) ||
                Im(e.nodeValue, l)
              )),
              e || Ul(t, !0));
          } else ((e = Du(e).createTextNode(n)), (e[it] = t), (t.stateNode = e));
        }
        return (Le(t), null);
      case 31:
        if (((l = t.memoizedState), e === null || e.memoizedState !== null)) {
          if (((n = Zn(t)), l !== null)) {
            if (e === null) {
              if (!n) throw Error(c(318));
              if (((e = t.memoizedState), (e = e !== null ? e.dehydrated : null), !e))
                throw Error(c(557));
              e[it] = t;
            } else (pn(), (t.flags & 128) === 0 && (t.memoizedState = null), (t.flags |= 4));
            (Le(t), (e = !1));
          } else
            ((l = Fs()),
              e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = l),
              (e = !0));
          if (!e) return t.flags & 256 ? (Rt(t), t) : (Rt(t), null);
          if ((t.flags & 128) !== 0) throw Error(c(558));
        }
        return (Le(t), null);
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
              i[it] = t;
            } else (pn(), (t.flags & 128) === 0 && (t.memoizedState = null), (t.flags |= 4));
            (Le(t), (i = !1));
          } else
            ((i = Fs()),
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
              _u(t, t.updateQueue),
              Le(t),
              null)
        );
      case 4:
        return (Ge(), e === null && ro(t.stateNode.containerInfo), Le(t), null);
      case 10:
        return (dl(t.type), Le(t), null);
      case 19:
        if ((G(Ke), (n = t.memoizedState), n === null)) return (Le(t), null);
        if (((i = (t.flags & 128) !== 0), (s = n.rendering), s === null))
          if (i) Wa(n, !1);
          else {
            if ($e !== 0 || (e !== null && (e.flags & 128) !== 0))
              for (e = t.child; e !== null; ) {
                if (((s = uu(e)), s !== null)) {
                  for (
                    t.flags |= 128,
                      Wa(n, !1),
                      e = s.updateQueue,
                      t.updateQueue = e,
                      _u(t, e),
                      t.subtreeFlags = 0,
                      e = l,
                      l = t.child;
                    l !== null;
                  )
                    (Mf(l, e), (l = l.sibling));
                  return (I(Ke, (Ke.current & 1) | 2), be && rl(t, n.treeForkCount), t.child);
                }
                e = e.sibling;
              }
            n.tail !== null &&
              Et() > Tu &&
              ((t.flags |= 128), (i = !0), Wa(n, !1), (t.lanes = 4194304));
          }
        else {
          if (!i)
            if (((e = uu(s)), e !== null)) {
              if (
                ((t.flags |= 128),
                (i = !0),
                (e = e.updateQueue),
                (t.updateQueue = e),
                _u(t, e),
                Wa(n, !0),
                n.tail === null && n.tailMode === 'hidden' && !s.alternate && !be)
              )
                return (Le(t), null);
            } else
              2 * Et() - n.renderingStartTime > Tu &&
                l !== 536870912 &&
                ((t.flags |= 128), (i = !0), Wa(n, !1), (t.lanes = 4194304));
          n.isBackwards
            ? ((s.sibling = t.child), (t.child = s))
            : ((e = n.last), e !== null ? (e.sibling = s) : (t.child = s), (n.last = s));
        }
        return n.tail !== null
          ? ((e = n.tail),
            (n.rendering = e),
            (n.tail = e.sibling),
            (n.renderingStartTime = Et()),
            (e.sibling = null),
            (l = Ke.current),
            I(Ke, i ? (l & 1) | 2 : l & 1),
            be && rl(t, n.treeForkCount),
            e)
          : (Le(t), null);
      case 22:
      case 23:
        return (
          Rt(t),
          fc(),
          (n = t.memoizedState !== null),
          e !== null
            ? (e.memoizedState !== null) !== n && (t.flags |= 8192)
            : n && (t.flags |= 8192),
          n
            ? (l & 536870912) !== 0 &&
              (t.flags & 128) === 0 &&
              (Le(t), t.subtreeFlags & 6 && (t.flags |= 8192))
            : Le(t),
          (l = t.updateQueue),
          l !== null && _u(t, l.retryQueue),
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
          e !== null && G(vn),
          null
        );
      case 24:
        return (
          (l = null),
          e !== null && (l = e.memoizedState.cache),
          t.memoizedState.cache !== l && (t.flags |= 2048),
          dl(Ie),
          Le(t),
          null
        );
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(c(156, t.tag));
  }
  function qg(e, t) {
    switch ((Is(t), t.tag)) {
      case 1:
        return ((e = t.flags), e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null);
      case 3:
        return (
          dl(Ie),
          Ge(),
          (e = t.flags),
          (e & 65536) !== 0 && (e & 128) === 0 ? ((t.flags = (e & -65537) | 128), t) : null
        );
      case 26:
      case 27:
      case 5:
        return (ae(t), null);
      case 31:
        if (t.memoizedState !== null) {
          if ((Rt(t), t.alternate === null)) throw Error(c(340));
          pn();
        }
        return ((e = t.flags), e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null);
      case 13:
        if ((Rt(t), (e = t.memoizedState), e !== null && e.dehydrated !== null)) {
          if (t.alternate === null) throw Error(c(340));
          pn();
        }
        return ((e = t.flags), e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null);
      case 19:
        return (G(Ke), null);
      case 4:
        return (Ge(), null);
      case 10:
        return (dl(t.type), null);
      case 22:
      case 23:
        return (
          Rt(t),
          fc(),
          e !== null && G(vn),
          (e = t.flags),
          e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
        );
      case 24:
        return (dl(Ie), null);
      case 25:
        return null;
      default:
        return null;
    }
  }
  function tm(e, t) {
    switch ((Is(t), t.tag)) {
      case 3:
        (dl(Ie), Ge());
        break;
      case 26:
      case 27:
      case 5:
        ae(t);
        break;
      case 4:
        Ge();
        break;
      case 31:
        t.memoizedState !== null && Rt(t);
        break;
      case 13:
        Rt(t);
        break;
      case 19:
        G(Ke);
        break;
      case 10:
        dl(t.type);
        break;
      case 22:
      case 23:
        (Rt(t), fc(), e !== null && G(vn));
        break;
      case 24:
        dl(Ie);
    }
  }
  function Fa(e, t) {
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
    } catch (p) {
      Oe(t, t.return, p);
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
              p = f.destroy;
            if (p !== void 0) {
              ((f.destroy = void 0), (i = t));
              var x = l,
                j = p;
              try {
                j();
              } catch (H) {
                Oe(i, x, H);
              }
            }
          }
          n = n.next;
        } while (n !== s);
      }
    } catch (H) {
      Oe(t, t.return, H);
    }
  }
  function lm(e) {
    var t = e.updateQueue;
    if (t !== null) {
      var l = e.stateNode;
      try {
        Zf(t, l);
      } catch (n) {
        Oe(e, e.return, n);
      }
    }
  }
  function nm(e, t, l) {
    ((l.props = En(e.type, e.memoizedProps)), (l.state = e.memoizedState));
    try {
      l.componentWillUnmount();
    } catch (n) {
      Oe(e, t, n);
    }
  }
  function Pa(e, t) {
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
      Oe(e, t, i);
    }
  }
  function ll(e, t) {
    var l = e.ref,
      n = e.refCleanup;
    if (l !== null)
      if (typeof n == 'function')
        try {
          n();
        } catch (i) {
          Oe(e, t, i);
        } finally {
          ((e.refCleanup = null), (e = e.alternate), e != null && (e.refCleanup = null));
        }
      else if (typeof l == 'function')
        try {
          l(null);
        } catch (i) {
          Oe(e, t, i);
        }
      else l.current = null;
  }
  function am(e) {
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
      Oe(e, e.return, i);
    }
  }
  function Xc(e, t, l) {
    try {
      var n = e.stateNode;
      (u0(n, e.type, l, t), (n[yt] = t));
    } catch (i) {
      Oe(e, e.return, i);
    }
  }
  function im(e) {
    return (
      e.tag === 5 || e.tag === 3 || e.tag === 26 || (e.tag === 27 && Wl(e.type)) || e.tag === 4
    );
  }
  function Vc(e) {
    e: for (;;) {
      for (; e.sibling === null; ) {
        if (e.return === null || im(e.return)) return null;
        e = e.return;
      }
      for (
        e.sibling.return = e.return, e = e.sibling;
        e.tag !== 5 && e.tag !== 6 && e.tag !== 18;
      ) {
        if ((e.tag === 27 && Wl(e.type)) || e.flags & 2 || e.child === null || e.tag === 4)
          continue e;
        ((e.child.return = e), (e = e.child));
      }
      if (!(e.flags & 2)) return e.stateNode;
    }
  }
  function Qc(e, t, l) {
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
            l != null || t.onclick !== null || (t.onclick = sl)));
    else if (
      n !== 4 &&
      (n === 27 && Wl(e.type) && ((l = e.stateNode), (t = null)), (e = e.child), e !== null)
    )
      for (Qc(e, t, l), e = e.sibling; e !== null; ) (Qc(e, t, l), (e = e.sibling));
  }
  function bu(e, t, l) {
    var n = e.tag;
    if (n === 5 || n === 6) ((e = e.stateNode), t ? l.insertBefore(e, t) : l.appendChild(e));
    else if (n !== 4 && (n === 27 && Wl(e.type) && (l = e.stateNode), (e = e.child), e !== null))
      for (bu(e, t, l), e = e.sibling; e !== null; ) (bu(e, t, l), (e = e.sibling));
  }
  function um(e) {
    var t = e.stateNode,
      l = e.memoizedProps;
    try {
      for (var n = e.type, i = t.attributes; i.length; ) t.removeAttributeNode(i[0]);
      (ot(t, n, l), (t[it] = e), (t[yt] = l));
    } catch (s) {
      Oe(e, e.return, s);
    }
  }
  var gl = !1,
    Pe = !1,
    Zc = !1,
    sm = typeof WeakSet == 'function' ? WeakSet : Set,
    nt = null;
  function Lg(e, t) {
    if (((e = e.containerInfo), (ho = Gu), (e = _f(e)), Ls(e))) {
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
              p = -1,
              x = -1,
              j = 0,
              H = 0,
              V = e,
              z = null;
            t: for (;;) {
              for (
                var w;
                V !== l || (i !== 0 && V.nodeType !== 3) || (p = f + i),
                  V !== s || (n !== 0 && V.nodeType !== 3) || (x = f + n),
                  V.nodeType === 3 && (f += V.nodeValue.length),
                  (w = V.firstChild) !== null;
              )
                ((z = V), (V = w));
              for (;;) {
                if (V === e) break t;
                if (
                  (z === l && ++j === i && (p = f),
                  z === s && ++H === n && (x = f),
                  (w = V.nextSibling) !== null)
                )
                  break;
                ((V = z), (z = V.parentNode));
              }
              V = w;
            }
            l = p === -1 || x === -1 ? null : { start: p, end: x };
          } else l = null;
        }
      l = l || { start: 0, end: 0 };
    } else l = null;
    for (po = { focusedElem: e, selectionRange: l }, Gu = !1, nt = t; nt !== null; )
      if (((t = nt), (e = t.child), (t.subtreeFlags & 1028) !== 0 && e !== null))
        ((e.return = t), (nt = e));
      else
        for (; nt !== null; ) {
          switch (((t = nt), (s = t.alternate), (e = t.flags), t.tag)) {
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
                  var ee = En(l.type, i);
                  ((e = n.getSnapshotBeforeUpdate(ee, s)),
                    (n.__reactInternalSnapshotBeforeUpdate = e));
                } catch (ue) {
                  Oe(l, l.return, ue);
                }
              }
              break;
            case 3:
              if ((e & 1024) !== 0) {
                if (((e = t.stateNode.containerInfo), (l = e.nodeType), l === 9)) vo(e);
                else if (l === 1)
                  switch (e.nodeName) {
                    case 'HEAD':
                    case 'HTML':
                    case 'BODY':
                      vo(e);
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
            ((e.return = t.return), (nt = e));
            break;
          }
          nt = t.return;
        }
  }
  function cm(e, t, l) {
    var n = l.flags;
    switch (l.tag) {
      case 0:
      case 11:
      case 15:
        (_l(e, l), n & 4 && Fa(5, l));
        break;
      case 1:
        if ((_l(e, l), n & 4))
          if (((e = l.stateNode), t === null))
            try {
              e.componentDidMount();
            } catch (f) {
              Oe(l, l.return, f);
            }
          else {
            var i = En(l.type, t.memoizedProps);
            t = t.memoizedState;
            try {
              e.componentDidUpdate(i, t, e.__reactInternalSnapshotBeforeUpdate);
            } catch (f) {
              Oe(l, l.return, f);
            }
          }
        (n & 64 && lm(l), n & 512 && Pa(l, l.return));
        break;
      case 3:
        if ((_l(e, l), n & 64 && ((e = l.updateQueue), e !== null))) {
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
            Zf(e, t);
          } catch (f) {
            Oe(l, l.return, f);
          }
        }
        break;
      case 27:
        t === null && n & 4 && um(l);
      case 26:
      case 5:
        (_l(e, l), t === null && n & 4 && am(l), n & 512 && Pa(l, l.return));
        break;
      case 12:
        _l(e, l);
        break;
      case 31:
        (_l(e, l), n & 4 && fm(e, l));
        break;
      case 13:
        (_l(e, l),
          n & 4 && dm(e, l),
          n & 64 &&
            ((e = l.memoizedState),
            e !== null && ((e = e.dehydrated), e !== null && ((l = Kg.bind(null, l)), h0(e, l)))));
        break;
      case 22:
        if (((n = l.memoizedState !== null || gl), !n)) {
          ((t = (t !== null && t.memoizedState !== null) || Pe), (i = gl));
          var s = Pe;
          ((gl = n),
            (Pe = t) && !s ? bl(e, l, (l.subtreeFlags & 8772) !== 0) : _l(e, l),
            (gl = i),
            (Pe = s));
        }
        break;
      case 30:
        break;
      default:
        _l(e, l);
    }
  }
  function om(e) {
    var t = e.alternate;
    (t !== null && ((e.alternate = null), om(t)),
      (e.child = null),
      (e.deletions = null),
      (e.sibling = null),
      e.tag === 5 && ((t = e.stateNode), t !== null && xs(t)),
      (e.stateNode = null),
      (e.return = null),
      (e.dependencies = null),
      (e.memoizedProps = null),
      (e.memoizedState = null),
      (e.pendingProps = null),
      (e.stateNode = null),
      (e.updateQueue = null));
  }
  var Ye = null,
    vt = !1;
  function vl(e, t, l) {
    for (l = l.child; l !== null; ) (rm(e, t, l), (l = l.sibling));
  }
  function rm(e, t, l) {
    if (Tt && typeof Tt.onCommitFiberUnmount == 'function')
      try {
        Tt.onCommitFiberUnmount(Ea, l);
      } catch {}
    switch (l.tag) {
      case 26:
        (Pe || ll(l, t),
          vl(e, t, l),
          l.memoizedState
            ? l.memoizedState.count--
            : l.stateNode && ((l = l.stateNode), l.parentNode.removeChild(l)));
        break;
      case 27:
        Pe || ll(l, t);
        var n = Ye,
          i = vt;
        (Wl(l.type) && ((Ye = l.stateNode), (vt = !1)),
          vl(e, t, l),
          ci(l.stateNode),
          (Ye = n),
          (vt = i));
        break;
      case 5:
        Pe || ll(l, t);
      case 6:
        if (((n = Ye), (i = vt), (Ye = null), vl(e, t, l), (Ye = n), (vt = i), Ye !== null))
          if (vt)
            try {
              (Ye.nodeType === 9
                ? Ye.body
                : Ye.nodeName === 'HTML'
                  ? Ye.ownerDocument.body
                  : Ye
              ).removeChild(l.stateNode);
            } catch (s) {
              Oe(l, t, s);
            }
          else
            try {
              Ye.removeChild(l.stateNode);
            } catch (s) {
              Oe(l, t, s);
            }
        break;
      case 18:
        Ye !== null &&
          (vt
            ? ((e = Ye),
              lh(
                e.nodeType === 9 ? e.body : e.nodeName === 'HTML' ? e.ownerDocument.body : e,
                l.stateNode
              ),
              ma(e))
            : lh(Ye, l.stateNode));
        break;
      case 4:
        ((n = Ye),
          (i = vt),
          (Ye = l.stateNode.containerInfo),
          (vt = !0),
          vl(e, t, l),
          (Ye = n),
          (vt = i));
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        (Vl(2, l, t), Pe || Vl(4, l, t), vl(e, t, l));
        break;
      case 1:
        (Pe ||
          (ll(l, t), (n = l.stateNode), typeof n.componentWillUnmount == 'function' && nm(l, t, n)),
          vl(e, t, l));
        break;
      case 21:
        vl(e, t, l);
        break;
      case 22:
        ((Pe = (n = Pe) || l.memoizedState !== null), vl(e, t, l), (Pe = n));
        break;
      default:
        vl(e, t, l);
    }
  }
  function fm(e, t) {
    if (
      t.memoizedState === null &&
      ((e = t.alternate), e !== null && ((e = e.memoizedState), e !== null))
    ) {
      e = e.dehydrated;
      try {
        ma(e);
      } catch (l) {
        Oe(t, t.return, l);
      }
    }
  }
  function dm(e, t) {
    if (
      t.memoizedState === null &&
      ((e = t.alternate),
      e !== null && ((e = e.memoizedState), e !== null && ((e = e.dehydrated), e !== null)))
    )
      try {
        ma(e);
      } catch (l) {
        Oe(t, t.return, l);
      }
  }
  function Hg(e) {
    switch (e.tag) {
      case 31:
      case 13:
      case 19:
        var t = e.stateNode;
        return (t === null && (t = e.stateNode = new sm()), t);
      case 22:
        return (
          (e = e.stateNode),
          (t = e._retryCache),
          t === null && (t = e._retryCache = new sm()),
          t
        );
      default:
        throw Error(c(435, e.tag));
    }
  }
  function Su(e, t) {
    var l = Hg(e);
    t.forEach(function (n) {
      if (!l.has(n)) {
        l.add(n);
        var i = Jg.bind(null, e, n);
        n.then(i, i);
      }
    });
  }
  function _t(e, t) {
    var l = t.deletions;
    if (l !== null)
      for (var n = 0; n < l.length; n++) {
        var i = l[n],
          s = e,
          f = t,
          p = f;
        e: for (; p !== null; ) {
          switch (p.tag) {
            case 27:
              if (Wl(p.type)) {
                ((Ye = p.stateNode), (vt = !1));
                break e;
              }
              break;
            case 5:
              ((Ye = p.stateNode), (vt = !1));
              break e;
            case 3:
            case 4:
              ((Ye = p.stateNode.containerInfo), (vt = !0));
              break e;
          }
          p = p.return;
        }
        if (Ye === null) throw Error(c(160));
        (rm(s, f, i),
          (Ye = null),
          (vt = !1),
          (s = i.alternate),
          s !== null && (s.return = null),
          (i.return = null));
      }
    if (t.subtreeFlags & 13886) for (t = t.child; t !== null; ) (mm(t, e), (t = t.sibling));
  }
  var Jt = null;
  function mm(e, t) {
    var l = e.alternate,
      n = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        (_t(t, e), bt(e), n & 4 && (Vl(3, e, e.return), Fa(3, e), Vl(5, e, e.return)));
        break;
      case 1:
        (_t(t, e),
          bt(e),
          n & 512 && (Pe || l === null || ll(l, l.return)),
          n & 64 &&
            gl &&
            ((e = e.updateQueue),
            e !== null &&
              ((n = e.callbacks),
              n !== null &&
                ((l = e.shared.hiddenCallbacks),
                (e.shared.hiddenCallbacks = l === null ? n : l.concat(n))))));
        break;
      case 26:
        var i = Jt;
        if ((_t(t, e), bt(e), n & 512 && (Pe || l === null || ll(l, l.return)), n & 4)) {
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
                          s[Aa] ||
                          s[it] ||
                          s.namespaceURI === 'http://www.w3.org/2000/svg' ||
                          s.hasAttribute('itemprop')) &&
                          ((s = i.createElement(n)),
                          i.head.insertBefore(s, i.querySelector('head > title'))),
                        ot(s, n, l),
                        (s[it] = e),
                        lt(s),
                        (n = s));
                      break e;
                    case 'link':
                      var f = mh('link', 'href', i).get(n + (l.href || ''));
                      if (f) {
                        for (var p = 0; p < f.length; p++)
                          if (
                            ((s = f[p]),
                            s.getAttribute('href') ===
                              (l.href == null || l.href === '' ? null : l.href) &&
                              s.getAttribute('rel') === (l.rel == null ? null : l.rel) &&
                              s.getAttribute('title') === (l.title == null ? null : l.title) &&
                              s.getAttribute('crossorigin') ===
                                (l.crossOrigin == null ? null : l.crossOrigin))
                          ) {
                            f.splice(p, 1);
                            break t;
                          }
                      }
                      ((s = i.createElement(n)), ot(s, n, l), i.head.appendChild(s));
                      break;
                    case 'meta':
                      if ((f = mh('meta', 'content', i).get(n + (l.content || '')))) {
                        for (p = 0; p < f.length; p++)
                          if (
                            ((s = f[p]),
                            s.getAttribute('content') ===
                              (l.content == null ? null : '' + l.content) &&
                              s.getAttribute('name') === (l.name == null ? null : l.name) &&
                              s.getAttribute('property') ===
                                (l.property == null ? null : l.property) &&
                              s.getAttribute('http-equiv') ===
                                (l.httpEquiv == null ? null : l.httpEquiv) &&
                              s.getAttribute('charset') === (l.charSet == null ? null : l.charSet))
                          ) {
                            f.splice(p, 1);
                            break t;
                          }
                      }
                      ((s = i.createElement(n)), ot(s, n, l), i.head.appendChild(s));
                      break;
                    default:
                      throw Error(c(468, n));
                  }
                  ((s[it] = e), lt(s), (n = s));
                }
                e.stateNode = n;
              } else hh(i, e.type, e.stateNode);
            else e.stateNode = dh(i, n, e.memoizedProps);
          else
            s !== n
              ? (s === null
                  ? l.stateNode !== null && ((l = l.stateNode), l.parentNode.removeChild(l))
                  : s.count--,
                n === null ? hh(i, e.type, e.stateNode) : dh(i, n, e.memoizedProps))
              : n === null && e.stateNode !== null && Xc(e, e.memoizedProps, l.memoizedProps);
        }
        break;
      case 27:
        (_t(t, e),
          bt(e),
          n & 512 && (Pe || l === null || ll(l, l.return)),
          l !== null && n & 4 && Xc(e, e.memoizedProps, l.memoizedProps));
        break;
      case 5:
        if ((_t(t, e), bt(e), n & 512 && (Pe || l === null || ll(l, l.return)), e.flags & 32)) {
          i = e.stateNode;
          try {
            Bn(i, '');
          } catch (ee) {
            Oe(e, e.return, ee);
          }
        }
        (n & 4 &&
          e.stateNode != null &&
          ((i = e.memoizedProps), Xc(e, i, l !== null ? l.memoizedProps : i)),
          n & 1024 && (Zc = !0));
        break;
      case 6:
        if ((_t(t, e), bt(e), n & 4)) {
          if (e.stateNode === null) throw Error(c(162));
          ((n = e.memoizedProps), (l = e.stateNode));
          try {
            l.nodeValue = n;
          } catch (ee) {
            Oe(e, e.return, ee);
          }
        }
        break;
      case 3:
        if (
          ((Uu = null),
          (i = Jt),
          (Jt = wu(t.containerInfo)),
          _t(t, e),
          (Jt = i),
          bt(e),
          n & 4 && l !== null && l.memoizedState.isDehydrated)
        )
          try {
            ma(t.containerInfo);
          } catch (ee) {
            Oe(e, e.return, ee);
          }
        Zc && ((Zc = !1), hm(e));
        break;
      case 4:
        ((n = Jt), (Jt = wu(e.stateNode.containerInfo)), _t(t, e), bt(e), (Jt = n));
        break;
      case 12:
        (_t(t, e), bt(e));
        break;
      case 31:
        (_t(t, e),
          bt(e),
          n & 4 && ((n = e.updateQueue), n !== null && ((e.updateQueue = null), Su(e, n))));
        break;
      case 13:
        (_t(t, e),
          bt(e),
          e.child.flags & 8192 &&
            (e.memoizedState !== null) != (l !== null && l.memoizedState !== null) &&
            (Eu = Et()),
          n & 4 && ((n = e.updateQueue), n !== null && ((e.updateQueue = null), Su(e, n))));
        break;
      case 22:
        i = e.memoizedState !== null;
        var x = l !== null && l.memoizedState !== null,
          j = gl,
          H = Pe;
        if (((gl = j || i), (Pe = H || x), _t(t, e), (Pe = H), (gl = j), bt(e), n & 8192))
          e: for (
            t = e.stateNode,
              t._visibility = i ? t._visibility & -2 : t._visibility | 1,
              i && (l === null || x || gl || Pe || Tn(e)),
              l = null,
              t = e;
            ;
          ) {
            if (t.tag === 5 || t.tag === 26) {
              if (l === null) {
                x = l = t;
                try {
                  if (((s = x.stateNode), i))
                    ((f = s.style),
                      typeof f.setProperty == 'function'
                        ? f.setProperty('display', 'none', 'important')
                        : (f.display = 'none'));
                  else {
                    p = x.stateNode;
                    var V = x.memoizedProps.style,
                      z = V != null && V.hasOwnProperty('display') ? V.display : null;
                    p.style.display = z == null || typeof z == 'boolean' ? '' : ('' + z).trim();
                  }
                } catch (ee) {
                  Oe(x, x.return, ee);
                }
              }
            } else if (t.tag === 6) {
              if (l === null) {
                x = t;
                try {
                  x.stateNode.nodeValue = i ? '' : x.memoizedProps;
                } catch (ee) {
                  Oe(x, x.return, ee);
                }
              }
            } else if (t.tag === 18) {
              if (l === null) {
                x = t;
                try {
                  var w = x.stateNode;
                  i ? nh(w, !0) : nh(x.stateNode, !1);
                } catch (ee) {
                  Oe(x, x.return, ee);
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
          n !== null && ((l = n.retryQueue), l !== null && ((n.retryQueue = null), Su(e, l))));
        break;
      case 19:
        (_t(t, e),
          bt(e),
          n & 4 && ((n = e.updateQueue), n !== null && ((e.updateQueue = null), Su(e, n))));
        break;
      case 30:
        break;
      case 21:
        break;
      default:
        (_t(t, e), bt(e));
    }
  }
  function bt(e) {
    var t = e.flags;
    if (t & 2) {
      try {
        for (var l, n = e.return; n !== null; ) {
          if (im(n)) {
            l = n;
            break;
          }
          n = n.return;
        }
        if (l == null) throw Error(c(160));
        switch (l.tag) {
          case 27:
            var i = l.stateNode,
              s = Vc(e);
            bu(e, s, i);
            break;
          case 5:
            var f = l.stateNode;
            l.flags & 32 && (Bn(f, ''), (l.flags &= -33));
            var p = Vc(e);
            bu(e, p, f);
            break;
          case 3:
          case 4:
            var x = l.stateNode.containerInfo,
              j = Vc(e);
            Qc(e, j, x);
            break;
          default:
            throw Error(c(161));
        }
      } catch (H) {
        Oe(e, e.return, H);
      }
      e.flags &= -3;
    }
    t & 4096 && (e.flags &= -4097);
  }
  function hm(e) {
    if (e.subtreeFlags & 1024)
      for (e = e.child; e !== null; ) {
        var t = e;
        (hm(t), t.tag === 5 && t.flags & 1024 && t.stateNode.reset(), (e = e.sibling));
      }
  }
  function _l(e, t) {
    if (t.subtreeFlags & 8772)
      for (t = t.child; t !== null; ) (cm(e, t.alternate, t), (t = t.sibling));
  }
  function Tn(e) {
    for (e = e.child; e !== null; ) {
      var t = e;
      switch (t.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          (Vl(4, t, t.return), Tn(t));
          break;
        case 1:
          ll(t, t.return);
          var l = t.stateNode;
          (typeof l.componentWillUnmount == 'function' && nm(t, t.return, l), Tn(t));
          break;
        case 27:
          ci(t.stateNode);
        case 26:
        case 5:
          (ll(t, t.return), Tn(t));
          break;
        case 22:
          t.memoizedState === null && Tn(t);
          break;
        case 30:
          Tn(t);
          break;
        default:
          Tn(t);
      }
      e = e.sibling;
    }
  }
  function bl(e, t, l) {
    for (l = l && (t.subtreeFlags & 8772) !== 0, t = t.child; t !== null; ) {
      var n = t.alternate,
        i = e,
        s = t,
        f = s.flags;
      switch (s.tag) {
        case 0:
        case 11:
        case 15:
          (bl(i, s, l), Fa(4, s));
          break;
        case 1:
          if ((bl(i, s, l), (n = s), (i = n.stateNode), typeof i.componentDidMount == 'function'))
            try {
              i.componentDidMount();
            } catch (j) {
              Oe(n, n.return, j);
            }
          if (((n = s), (i = n.updateQueue), i !== null)) {
            var p = n.stateNode;
            try {
              var x = i.shared.hiddenCallbacks;
              if (x !== null)
                for (i.shared.hiddenCallbacks = null, i = 0; i < x.length; i++) Qf(x[i], p);
            } catch (j) {
              Oe(n, n.return, j);
            }
          }
          (l && f & 64 && lm(s), Pa(s, s.return));
          break;
        case 27:
          um(s);
        case 26:
        case 5:
          (bl(i, s, l), l && n === null && f & 4 && am(s), Pa(s, s.return));
          break;
        case 12:
          bl(i, s, l);
          break;
        case 31:
          (bl(i, s, l), l && f & 4 && fm(i, s));
          break;
        case 13:
          (bl(i, s, l), l && f & 4 && dm(i, s));
          break;
        case 22:
          (s.memoizedState === null && bl(i, s, l), Pa(s, s.return));
          break;
        case 30:
          break;
        default:
          bl(i, s, l);
      }
      t = t.sibling;
    }
  }
  function $c(e, t) {
    var l = null;
    (e !== null &&
      e.memoizedState !== null &&
      e.memoizedState.cachePool !== null &&
      (l = e.memoizedState.cachePool.pool),
      (e = null),
      t.memoizedState !== null &&
        t.memoizedState.cachePool !== null &&
        (e = t.memoizedState.cachePool.pool),
      e !== l && (e != null && e.refCount++, l != null && La(l)));
  }
  function Kc(e, t) {
    ((e = null),
      t.alternate !== null && (e = t.alternate.memoizedState.cache),
      (t = t.memoizedState.cache),
      t !== e && (t.refCount++, e != null && La(e)));
  }
  function It(e, t, l, n) {
    if (t.subtreeFlags & 10256) for (t = t.child; t !== null; ) (pm(e, t, l, n), (t = t.sibling));
  }
  function pm(e, t, l, n) {
    var i = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        (It(e, t, l, n), i & 2048 && Fa(9, t));
        break;
      case 1:
        It(e, t, l, n);
        break;
      case 3:
        (It(e, t, l, n),
          i & 2048 &&
            ((e = null),
            t.alternate !== null && (e = t.alternate.memoizedState.cache),
            (t = t.memoizedState.cache),
            t !== e && (t.refCount++, e != null && La(e))));
        break;
      case 12:
        if (i & 2048) {
          (It(e, t, l, n), (e = t.stateNode));
          try {
            var s = t.memoizedProps,
              f = s.id,
              p = s.onPostCommit;
            typeof p == 'function' &&
              p(f, t.alternate === null ? 'mount' : 'update', e.passiveEffectDuration, -0);
          } catch (x) {
            Oe(t, t.return, x);
          }
        } else It(e, t, l, n);
        break;
      case 31:
        It(e, t, l, n);
        break;
      case 13:
        It(e, t, l, n);
        break;
      case 23:
        break;
      case 22:
        ((s = t.stateNode),
          (f = t.alternate),
          t.memoizedState !== null
            ? s._visibility & 2
              ? It(e, t, l, n)
              : ei(e, t)
            : s._visibility & 2
              ? It(e, t, l, n)
              : ((s._visibility |= 2), la(e, t, l, n, (t.subtreeFlags & 10256) !== 0 || !1)),
          i & 2048 && $c(f, t));
        break;
      case 24:
        (It(e, t, l, n), i & 2048 && Kc(t.alternate, t));
        break;
      default:
        It(e, t, l, n);
    }
  }
  function la(e, t, l, n, i) {
    for (i = i && ((t.subtreeFlags & 10256) !== 0 || !1), t = t.child; t !== null; ) {
      var s = e,
        f = t,
        p = l,
        x = n,
        j = f.flags;
      switch (f.tag) {
        case 0:
        case 11:
        case 15:
          (la(s, f, p, x, i), Fa(8, f));
          break;
        case 23:
          break;
        case 22:
          var H = f.stateNode;
          (f.memoizedState !== null
            ? H._visibility & 2
              ? la(s, f, p, x, i)
              : ei(s, f)
            : ((H._visibility |= 2), la(s, f, p, x, i)),
            i && j & 2048 && $c(f.alternate, f));
          break;
        case 24:
          (la(s, f, p, x, i), i && j & 2048 && Kc(f.alternate, f));
          break;
        default:
          la(s, f, p, x, i);
      }
      t = t.sibling;
    }
  }
  function ei(e, t) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; ) {
        var l = e,
          n = t,
          i = n.flags;
        switch (n.tag) {
          case 22:
            (ei(l, n), i & 2048 && $c(n.alternate, n));
            break;
          case 24:
            (ei(l, n), i & 2048 && Kc(n.alternate, n));
            break;
          default:
            ei(l, n);
        }
        t = t.sibling;
      }
  }
  var ti = 8192;
  function na(e, t, l) {
    if (e.subtreeFlags & ti) for (e = e.child; e !== null; ) (ym(e, t, l), (e = e.sibling));
  }
  function ym(e, t, l) {
    switch (e.tag) {
      case 26:
        (na(e, t, l),
          e.flags & ti && e.memoizedState !== null && A0(l, Jt, e.memoizedState, e.memoizedProps));
        break;
      case 5:
        na(e, t, l);
        break;
      case 3:
      case 4:
        var n = Jt;
        ((Jt = wu(e.stateNode.containerInfo)), na(e, t, l), (Jt = n));
        break;
      case 22:
        e.memoizedState === null &&
          ((n = e.alternate),
          n !== null && n.memoizedState !== null
            ? ((n = ti), (ti = 16777216), na(e, t, l), (ti = n))
            : na(e, t, l));
        break;
      default:
        na(e, t, l);
    }
  }
  function gm(e) {
    var t = e.alternate;
    if (t !== null && ((e = t.child), e !== null)) {
      t.child = null;
      do ((t = e.sibling), (e.sibling = null), (e = t));
      while (e !== null);
    }
  }
  function li(e) {
    var t = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (t !== null)
        for (var l = 0; l < t.length; l++) {
          var n = t[l];
          ((nt = n), _m(n, e));
        }
      gm(e);
    }
    if (e.subtreeFlags & 10256) for (e = e.child; e !== null; ) (vm(e), (e = e.sibling));
  }
  function vm(e) {
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        (li(e), e.flags & 2048 && Vl(9, e, e.return));
        break;
      case 3:
        li(e);
        break;
      case 12:
        li(e);
        break;
      case 22:
        var t = e.stateNode;
        e.memoizedState !== null && t._visibility & 2 && (e.return === null || e.return.tag !== 13)
          ? ((t._visibility &= -3), xu(e))
          : li(e);
        break;
      default:
        li(e);
    }
  }
  function xu(e) {
    var t = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (t !== null)
        for (var l = 0; l < t.length; l++) {
          var n = t[l];
          ((nt = n), _m(n, e));
        }
      gm(e);
    }
    for (e = e.child; e !== null; ) {
      switch (((t = e), t.tag)) {
        case 0:
        case 11:
        case 15:
          (Vl(8, t, t.return), xu(t));
          break;
        case 22:
          ((l = t.stateNode), l._visibility & 2 && ((l._visibility &= -3), xu(t)));
          break;
        default:
          xu(t);
      }
      e = e.sibling;
    }
  }
  function _m(e, t) {
    for (; nt !== null; ) {
      var l = nt;
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
          La(l.memoizedState.cache);
      }
      if (((n = l.child), n !== null)) ((n.return = l), (nt = n));
      else
        e: for (l = e; nt !== null; ) {
          n = nt;
          var i = n.sibling,
            s = n.return;
          if ((om(n), n === l)) {
            nt = null;
            break e;
          }
          if (i !== null) {
            ((i.return = s), (nt = i));
            break e;
          }
          nt = s;
        }
    }
  }
  var Gg = {
      getCacheForType: function (e) {
        var t = st(Ie),
          l = t.data.get(e);
        return (l === void 0 && ((l = e()), t.data.set(e, l)), l);
      },
      cacheSignal: function () {
        return st(Ie).controller.signal;
      },
    },
    Yg = typeof WeakMap == 'function' ? WeakMap : Map,
    Ce = 0,
    Ue = null,
    ye = null,
    ve = 0,
    je = 0,
    kt = null,
    Ql = !1,
    aa = !1,
    Jc = !1,
    Sl = 0,
    $e = 0,
    Zl = 0,
    Nn = 0,
    Ic = 0,
    jt = 0,
    ia = 0,
    ni = null,
    St = null,
    Wc = !1,
    Eu = 0,
    bm = 0,
    Tu = 1 / 0,
    Nu = null,
    $l = null,
    et = 0,
    Kl = null,
    ua = null,
    xl = 0,
    Fc = 0,
    Pc = null,
    Sm = null,
    ai = 0,
    eo = null;
  function Ot() {
    return (Ce & 2) !== 0 && ve !== 0 ? ve & -ve : L.T !== null ? uo() : Br();
  }
  function xm() {
    if (jt === 0)
      if ((ve & 536870912) === 0 || be) {
        var e = zi;
        ((zi <<= 1), (zi & 3932160) === 0 && (zi = 262144), (jt = e));
      } else jt = 536870912;
    return ((e = Mt.current), e !== null && (e.flags |= 32), jt);
  }
  function xt(e, t, l) {
    (((e === Ue && (je === 2 || je === 9)) || e.cancelPendingCommit !== null) &&
      (sa(e, 0), Jl(e, ve, jt, !1)),
      Na(e, l),
      ((Ce & 2) === 0 || e !== Ue) &&
        (e === Ue && ((Ce & 2) === 0 && (Nn |= l), $e === 4 && Jl(e, ve, jt, !1)), nl(e)));
  }
  function Em(e, t, l) {
    if ((Ce & 6) !== 0) throw Error(c(327));
    var n = (!l && (t & 127) === 0 && (t & e.expiredLanes) === 0) || Ta(e, t),
      i = n ? Qg(e, t) : lo(e, t, !0),
      s = n;
    do {
      if (i === 0) {
        aa && !n && Jl(e, t, 0, !1);
        break;
      } else {
        if (((l = e.current.alternate), s && !Xg(l))) {
          ((i = lo(e, t, !1)), (s = !1));
          continue;
        }
        if (i === 2) {
          if (((s = t), e.errorRecoveryDisabledLanes & s)) var f = 0;
          else
            ((f = e.pendingLanes & -536870913), (f = f !== 0 ? f : f & 536870912 ? 536870912 : 0));
          if (f !== 0) {
            t = f;
            e: {
              var p = e;
              i = ni;
              var x = p.current.memoizedState.isDehydrated;
              if ((x && (sa(p, f).flags |= 256), (f = lo(p, f, !1)), f !== 2)) {
                if (Jc && !x) {
                  ((p.errorRecoveryDisabledLanes |= s), (Nn |= s), (i = 4));
                  break e;
                }
                ((s = St), (St = i), s !== null && (St === null ? (St = s) : St.push.apply(St, s)));
              }
              i = f;
            }
            if (((s = !1), i !== 2)) continue;
          }
        }
        if (i === 1) {
          (sa(e, 0), Jl(e, t, 0, !0));
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
              Jl(n, t, jt, !Ql);
              break e;
            case 2:
              St = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(c(329));
          }
          if ((t & 62914560) === t && ((i = Eu + 300 - Et()), 10 < i)) {
            if ((Jl(n, t, jt, !Ql), wi(n, 0, !0) !== 0)) break e;
            ((xl = t),
              (n.timeoutHandle = eh(
                Tm.bind(null, n, l, St, Nu, Wc, t, jt, Nn, ia, Ql, s, 'Throttled', -0, 0),
                i
              )));
            break e;
          }
          Tm(n, l, St, Nu, Wc, t, jt, Nn, ia, Ql, s, null, -0, 0);
        }
      }
      break;
    } while (!0);
    nl(e);
  }
  function Tm(e, t, l, n, i, s, f, p, x, j, H, V, z, w) {
    if (((e.timeoutHandle = -1), (V = t.subtreeFlags), V & 8192 || (V & 16785408) === 16785408)) {
      ((V = {
        stylesheets: null,
        count: 0,
        imgCount: 0,
        imgBytes: 0,
        suspenseyImages: [],
        waitingForImages: !0,
        waitingForViewTransition: !1,
        unsuspend: sl,
      }),
        ym(t, s, V));
      var ee = (s & 62914560) === s ? Eu - Et() : (s & 4194048) === s ? bm - Et() : 0;
      if (((ee = C0(V, ee)), ee !== null)) {
        ((xl = s),
          (e.cancelPendingCommit = ee(Om.bind(null, e, t, s, l, n, i, f, p, x, H, V, null, z, w))),
          Jl(e, s, f, !j));
        return;
      }
    }
    Om(e, t, s, l, n, i, f, p, x);
  }
  function Xg(e) {
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
    ((t &= ~Ic),
      (t &= ~Nn),
      (e.suspendedLanes |= t),
      (e.pingedLanes &= ~t),
      n && (e.warmLanes |= t),
      (n = e.expirationTimes));
    for (var i = t; 0 < i; ) {
      var s = 31 - Nt(i),
        f = 1 << s;
      ((n[s] = -1), (i &= ~f));
    }
    l !== 0 && zr(e, l, t);
  }
  function Au() {
    return (Ce & 6) === 0 ? (ii(0), !1) : !0;
  }
  function to() {
    if (ye !== null) {
      if (je === 0) var e = ye.return;
      else ((e = ye), (fl = yn = null), gc(e), (Wn = null), (Ga = 0), (e = ye));
      for (; e !== null; ) (tm(e.alternate, e), (e = e.return));
      ye = null;
    }
  }
  function sa(e, t) {
    var l = e.timeoutHandle;
    (l !== -1 && ((e.timeoutHandle = -1), o0(l)),
      (l = e.cancelPendingCommit),
      l !== null && ((e.cancelPendingCommit = null), l()),
      (xl = 0),
      to(),
      (Ue = e),
      (ye = l = ol(e.current, null)),
      (ve = t),
      (je = 0),
      (kt = null),
      (Ql = !1),
      (aa = Ta(e, t)),
      (Jc = !1),
      (ia = jt = Ic = Nn = Zl = $e = 0),
      (St = ni = null),
      (Wc = !1),
      (t & 8) !== 0 && (t |= t & 32));
    var n = e.entangledLanes;
    if (n !== 0)
      for (e = e.entanglements, n &= t; 0 < n; ) {
        var i = 31 - Nt(n),
          s = 1 << i;
        ((t |= e[i]), (n &= ~s));
      }
    return ((Sl = t), $i(), l);
  }
  function Nm(e, t) {
    ((me = null),
      (L.H = Ja),
      t === In || t === tu
        ? ((t = Gf()), (je = 3))
        : t === ic
          ? ((t = Gf()), (je = 4))
          : (je =
              t === zc
                ? 8
                : t !== null && typeof t == 'object' && typeof t.then == 'function'
                  ? 6
                  : 1),
      (kt = t),
      ye === null && (($e = 1), pu(e, Lt(t, e.current))));
  }
  function Am() {
    var e = Mt.current;
    return e === null
      ? !0
      : (ve & 4194048) === ve
        ? Xt === null
        : (ve & 62914560) === ve || (ve & 536870912) !== 0
          ? e === Xt
          : !1;
  }
  function Cm() {
    var e = L.H;
    return ((L.H = Ja), e === null ? Ja : e);
  }
  function Mm() {
    var e = L.A;
    return ((L.A = Gg), e);
  }
  function Cu() {
    (($e = 4),
      Ql || ((ve & 4194048) !== ve && Mt.current !== null) || (aa = !0),
      ((Zl & 134217727) === 0 && (Nn & 134217727) === 0) || Ue === null || Jl(Ue, ve, jt, !1));
  }
  function lo(e, t, l) {
    var n = Ce;
    Ce |= 2;
    var i = Cm(),
      s = Mm();
    ((Ue !== e || ve !== t) && ((Nu = null), sa(e, t)), (t = !1));
    var f = $e;
    e: do
      try {
        if (je !== 0 && ye !== null) {
          var p = ye,
            x = kt;
          switch (je) {
            case 8:
              (to(), (f = 6));
              break e;
            case 3:
            case 2:
            case 9:
            case 6:
              Mt.current === null && (t = !0);
              var j = je;
              if (((je = 0), (kt = null), ca(e, p, x, j), l && aa)) {
                f = 0;
                break e;
              }
              break;
            default:
              ((j = je), (je = 0), (kt = null), ca(e, p, x, j));
          }
        }
        (Vg(), (f = $e));
        break;
      } catch (H) {
        Nm(e, H);
      }
    while (!0);
    return (
      t && e.shellSuspendCounter++,
      (fl = yn = null),
      (Ce = n),
      (L.H = i),
      (L.A = s),
      ye === null && ((Ue = null), (ve = 0), $i()),
      f
    );
  }
  function Vg() {
    for (; ye !== null; ) Rm(ye);
  }
  function Qg(e, t) {
    var l = Ce;
    Ce |= 2;
    var n = Cm(),
      i = Mm();
    Ue !== e || ve !== t ? ((Nu = null), (Tu = Et() + 500), sa(e, t)) : (aa = Ta(e, t));
    e: do
      try {
        if (je !== 0 && ye !== null) {
          t = ye;
          var s = kt;
          t: switch (je) {
            case 1:
              ((je = 0), (kt = null), ca(e, t, s, 1));
              break;
            case 2:
            case 9:
              if (Lf(s)) {
                ((je = 0), (kt = null), km(t));
                break;
              }
              ((t = function () {
                ((je !== 2 && je !== 9) || Ue !== e || (je = 7), nl(e));
              }),
                s.then(t, t));
              break e;
            case 3:
              je = 7;
              break e;
            case 4:
              je = 5;
              break e;
            case 7:
              Lf(s) ? ((je = 0), (kt = null), km(t)) : ((je = 0), (kt = null), ca(e, t, s, 7));
              break;
            case 5:
              var f = null;
              switch (ye.tag) {
                case 26:
                  f = ye.memoizedState;
                case 5:
                case 27:
                  var p = ye;
                  if (f ? ph(f) : p.stateNode.complete) {
                    ((je = 0), (kt = null));
                    var x = p.sibling;
                    if (x !== null) ye = x;
                    else {
                      var j = p.return;
                      j !== null ? ((ye = j), Mu(j)) : (ye = null);
                    }
                    break t;
                  }
              }
              ((je = 0), (kt = null), ca(e, t, s, 5));
              break;
            case 6:
              ((je = 0), (kt = null), ca(e, t, s, 6));
              break;
            case 8:
              (to(), ($e = 6));
              break e;
            default:
              throw Error(c(462));
          }
        }
        Zg();
        break;
      } catch (H) {
        Nm(e, H);
      }
    while (!0);
    return (
      (fl = yn = null),
      (L.H = n),
      (L.A = i),
      (Ce = l),
      ye !== null ? 0 : ((Ue = null), (ve = 0), $i(), $e)
    );
  }
  function Zg() {
    for (; ye !== null && !py(); ) Rm(ye);
  }
  function Rm(e) {
    var t = Pd(e.alternate, e, Sl);
    ((e.memoizedProps = e.pendingProps), t === null ? Mu(e) : (ye = t));
  }
  function km(e) {
    var t = e,
      l = t.alternate;
    switch (t.tag) {
      case 15:
      case 0:
        t = $d(l, t, t.pendingProps, t.type, void 0, ve);
        break;
      case 11:
        t = $d(l, t, t.pendingProps, t.type.render, t.ref, ve);
        break;
      case 5:
        gc(t);
      default:
        (tm(l, t), (t = ye = Mf(t, Sl)), (t = Pd(l, t, Sl)));
    }
    ((e.memoizedProps = e.pendingProps), t === null ? Mu(e) : (ye = t));
  }
  function ca(e, t, l, n) {
    ((fl = yn = null), gc(t), (Wn = null), (Ga = 0));
    var i = t.return;
    try {
      if (Dg(e, i, t, l, ve)) {
        (($e = 1), pu(e, Lt(l, e.current)), (ye = null));
        return;
      }
    } catch (s) {
      if (i !== null) throw ((ye = i), s);
      (($e = 1), pu(e, Lt(l, e.current)), (ye = null));
      return;
    }
    t.flags & 32768
      ? (be || n === 1
          ? (e = !0)
          : aa || (ve & 536870912) !== 0
            ? (e = !1)
            : ((Ql = e = !0),
              (n === 2 || n === 9 || n === 3 || n === 6) &&
                ((n = Mt.current), n !== null && n.tag === 13 && (n.flags |= 16384))),
        jm(t, e))
      : Mu(t);
  }
  function Mu(e) {
    var t = e;
    do {
      if ((t.flags & 32768) !== 0) {
        jm(t, Ql);
        return;
      }
      e = t.return;
      var l = Ug(t.alternate, t, Sl);
      if (l !== null) {
        ye = l;
        return;
      }
      if (((t = t.sibling), t !== null)) {
        ye = t;
        return;
      }
      ye = t = e;
    } while (t !== null);
    $e === 0 && ($e = 5);
  }
  function jm(e, t) {
    do {
      var l = qg(e.alternate, e);
      if (l !== null) {
        ((l.flags &= 32767), (ye = l));
        return;
      }
      if (
        ((l = e.return),
        l !== null && ((l.flags |= 32768), (l.subtreeFlags = 0), (l.deletions = null)),
        !t && ((e = e.sibling), e !== null))
      ) {
        ye = e;
        return;
      }
      ye = e = l;
    } while (e !== null);
    (($e = 6), (ye = null));
  }
  function Om(e, t, l, n, i, s, f, p, x) {
    e.cancelPendingCommit = null;
    do Ru();
    while (et !== 0);
    if ((Ce & 6) !== 0) throw Error(c(327));
    if (t !== null) {
      if (t === e.current) throw Error(c(177));
      if (
        ((s = t.lanes | t.childLanes),
        (s |= Vs),
        Ny(e, l, s, f, p, x),
        e === Ue && ((ye = Ue = null), (ve = 0)),
        (ua = t),
        (Kl = e),
        (xl = l),
        (Fc = s),
        (Pc = i),
        (Sm = n),
        (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0
          ? ((e.callbackNode = null),
            (e.callbackPriority = 0),
            Ig(ji, function () {
              return (Um(), null);
            }))
          : ((e.callbackNode = null), (e.callbackPriority = 0)),
        (n = (t.flags & 13878) !== 0),
        (t.subtreeFlags & 13878) !== 0 || n)
      ) {
        ((n = L.T), (L.T = null), (i = J.p), (J.p = 2), (f = Ce), (Ce |= 4));
        try {
          Lg(e, t, l);
        } finally {
          ((Ce = f), (J.p = i), (L.T = n));
        }
      }
      ((et = 1), zm(), Dm(), wm());
    }
  }
  function zm() {
    if (et === 1) {
      et = 0;
      var e = Kl,
        t = ua,
        l = (t.flags & 13878) !== 0;
      if ((t.subtreeFlags & 13878) !== 0 || l) {
        ((l = L.T), (L.T = null));
        var n = J.p;
        J.p = 2;
        var i = Ce;
        Ce |= 4;
        try {
          mm(t, e);
          var s = po,
            f = _f(e.containerInfo),
            p = s.focusedElem,
            x = s.selectionRange;
          if (f !== p && p && p.ownerDocument && vf(p.ownerDocument.documentElement, p)) {
            if (x !== null && Ls(p)) {
              var j = x.start,
                H = x.end;
              if ((H === void 0 && (H = j), 'selectionStart' in p))
                ((p.selectionStart = j), (p.selectionEnd = Math.min(H, p.value.length)));
              else {
                var V = p.ownerDocument || document,
                  z = (V && V.defaultView) || window;
                if (z.getSelection) {
                  var w = z.getSelection(),
                    ee = p.textContent.length,
                    ue = Math.min(x.start, ee),
                    Be = x.end === void 0 ? ue : Math.min(x.end, ee);
                  !w.extend && ue > Be && ((f = Be), (Be = ue), (ue = f));
                  var M = gf(p, ue),
                    E = gf(p, Be);
                  if (
                    M &&
                    E &&
                    (w.rangeCount !== 1 ||
                      w.anchorNode !== M.node ||
                      w.anchorOffset !== M.offset ||
                      w.focusNode !== E.node ||
                      w.focusOffset !== E.offset)
                  ) {
                    var k = V.createRange();
                    (k.setStart(M.node, M.offset),
                      w.removeAllRanges(),
                      ue > Be
                        ? (w.addRange(k), w.extend(E.node, E.offset))
                        : (k.setEnd(E.node, E.offset), w.addRange(k)));
                  }
                }
              }
            }
            for (V = [], w = p; (w = w.parentNode); )
              w.nodeType === 1 && V.push({ element: w, left: w.scrollLeft, top: w.scrollTop });
            for (typeof p.focus == 'function' && p.focus(), p = 0; p < V.length; p++) {
              var Y = V[p];
              ((Y.element.scrollLeft = Y.left), (Y.element.scrollTop = Y.top));
            }
          }
          ((Gu = !!ho), (po = ho = null));
        } finally {
          ((Ce = i), (J.p = n), (L.T = l));
        }
      }
      ((e.current = t), (et = 2));
    }
  }
  function Dm() {
    if (et === 2) {
      et = 0;
      var e = Kl,
        t = ua,
        l = (t.flags & 8772) !== 0;
      if ((t.subtreeFlags & 8772) !== 0 || l) {
        ((l = L.T), (L.T = null));
        var n = J.p;
        J.p = 2;
        var i = Ce;
        Ce |= 4;
        try {
          cm(e, t.alternate, t);
        } finally {
          ((Ce = i), (J.p = n), (L.T = l));
        }
      }
      et = 3;
    }
  }
  function wm() {
    if (et === 4 || et === 3) {
      ((et = 0), yy());
      var e = Kl,
        t = ua,
        l = xl,
        n = Sm;
      (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0
        ? (et = 5)
        : ((et = 0), (ua = Kl = null), Bm(e, e.pendingLanes));
      var i = e.pendingLanes;
      if (
        (i === 0 && ($l = null),
        bs(l),
        (t = t.stateNode),
        Tt && typeof Tt.onCommitFiberRoot == 'function')
      )
        try {
          Tt.onCommitFiberRoot(Ea, t, void 0, (t.current.flags & 128) === 128);
        } catch {}
      if (n !== null) {
        ((t = L.T), (i = J.p), (J.p = 2), (L.T = null));
        try {
          for (var s = e.onRecoverableError, f = 0; f < n.length; f++) {
            var p = n[f];
            s(p.value, { componentStack: p.stack });
          }
        } finally {
          ((L.T = t), (J.p = i));
        }
      }
      ((xl & 3) !== 0 && Ru(),
        nl(e),
        (i = e.pendingLanes),
        (l & 261930) !== 0 && (i & 42) !== 0 ? (e === eo ? ai++ : ((ai = 0), (eo = e))) : (ai = 0),
        ii(0));
    }
  }
  function Bm(e, t) {
    (e.pooledCacheLanes &= t) === 0 &&
      ((t = e.pooledCache), t != null && ((e.pooledCache = null), La(t)));
  }
  function Ru() {
    return (zm(), Dm(), wm(), Um());
  }
  function Um() {
    if (et !== 5) return !1;
    var e = Kl,
      t = Fc;
    Fc = 0;
    var l = bs(xl),
      n = L.T,
      i = J.p;
    try {
      ((J.p = 32 > l ? 32 : l), (L.T = null), (l = Pc), (Pc = null));
      var s = Kl,
        f = xl;
      if (((et = 0), (ua = Kl = null), (xl = 0), (Ce & 6) !== 0)) throw Error(c(331));
      var p = Ce;
      if (
        ((Ce |= 4),
        vm(s.current),
        pm(s, s.current, f, l),
        (Ce = p),
        ii(0, !1),
        Tt && typeof Tt.onPostCommitFiberRoot == 'function')
      )
        try {
          Tt.onPostCommitFiberRoot(Ea, s);
        } catch {}
      return !0;
    } finally {
      ((J.p = i), (L.T = n), Bm(e, t));
    }
  }
  function qm(e, t, l) {
    ((t = Lt(l, t)),
      (t = Oc(e.stateNode, t, 2)),
      (e = Gl(e, t, 2)),
      e !== null && (Na(e, 2), nl(e)));
  }
  function Oe(e, t, l) {
    if (e.tag === 3) qm(e, e, l);
    else
      for (; t !== null; ) {
        if (t.tag === 3) {
          qm(t, e, l);
          break;
        } else if (t.tag === 1) {
          var n = t.stateNode;
          if (
            typeof t.type.getDerivedStateFromError == 'function' ||
            (typeof n.componentDidCatch == 'function' && ($l === null || !$l.has(n)))
          ) {
            ((e = Lt(l, e)),
              (l = Ld(2)),
              (n = Gl(t, l, 2)),
              n !== null && (Hd(l, n, t, e), Na(n, 2), nl(n)));
            break;
          }
        }
        t = t.return;
      }
  }
  function no(e, t, l) {
    var n = e.pingCache;
    if (n === null) {
      n = e.pingCache = new Yg();
      var i = new Set();
      n.set(t, i);
    } else ((i = n.get(t)), i === void 0 && ((i = new Set()), n.set(t, i)));
    i.has(l) || ((Jc = !0), i.add(l), (e = $g.bind(null, e, t, l)), t.then(e, e));
  }
  function $g(e, t, l) {
    var n = e.pingCache;
    (n !== null && n.delete(t),
      (e.pingedLanes |= e.suspendedLanes & l),
      (e.warmLanes &= ~l),
      Ue === e &&
        (ve & l) === l &&
        ($e === 4 || ($e === 3 && (ve & 62914560) === ve && 300 > Et() - Eu)
          ? (Ce & 2) === 0 && sa(e, 0)
          : (Ic |= l),
        ia === ve && (ia = 0)),
      nl(e));
  }
  function Lm(e, t) {
    (t === 0 && (t = Or()), (e = mn(e, t)), e !== null && (Na(e, t), nl(e)));
  }
  function Kg(e) {
    var t = e.memoizedState,
      l = 0;
    (t !== null && (l = t.retryLane), Lm(e, l));
  }
  function Jg(e, t) {
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
    (n !== null && n.delete(t), Lm(e, l));
  }
  function Ig(e, t) {
    return ys(e, t);
  }
  var ku = null,
    oa = null,
    ao = !1,
    ju = !1,
    io = !1,
    Il = 0;
  function nl(e) {
    (e !== oa && e.next === null && (oa === null ? (ku = oa = e) : (oa = oa.next = e)),
      (ju = !0),
      ao || ((ao = !0), Fg()));
  }
  function ii(e, t) {
    if (!io && ju) {
      io = !0;
      do
        for (var l = !1, n = ku; n !== null; ) {
          if (e !== 0) {
            var i = n.pendingLanes;
            if (i === 0) var s = 0;
            else {
              var f = n.suspendedLanes,
                p = n.pingedLanes;
              ((s = (1 << (31 - Nt(42 | e) + 1)) - 1),
                (s &= i & ~(f & ~p)),
                (s = s & 201326741 ? (s & 201326741) | 1 : s ? s | 2 : 0));
            }
            s !== 0 && ((l = !0), Xm(n, s));
          } else
            ((s = ve),
              (s = wi(
                n,
                n === Ue ? s : 0,
                n.cancelPendingCommit !== null || n.timeoutHandle !== -1
              )),
              (s & 3) === 0 || Ta(n, s) || ((l = !0), Xm(n, s)));
          n = n.next;
        }
      while (l);
      io = !1;
    }
  }
  function Wg() {
    Hm();
  }
  function Hm() {
    ju = ao = !1;
    var e = 0;
    Il !== 0 && c0() && (e = Il);
    for (var t = Et(), l = null, n = ku; n !== null; ) {
      var i = n.next,
        s = Gm(n, t);
      (s === 0
        ? ((n.next = null), l === null ? (ku = i) : (l.next = i), i === null && (oa = l))
        : ((l = n), (e !== 0 || (s & 3) !== 0) && (ju = !0)),
        (n = i));
    }
    ((et !== 0 && et !== 5) || ii(e), Il !== 0 && (Il = 0));
  }
  function Gm(e, t) {
    for (
      var l = e.suspendedLanes,
        n = e.pingedLanes,
        i = e.expirationTimes,
        s = e.pendingLanes & -62914561;
      0 < s;
    ) {
      var f = 31 - Nt(s),
        p = 1 << f,
        x = i[f];
      (x === -1
        ? ((p & l) === 0 || (p & n) !== 0) && (i[f] = Ty(p, t))
        : x <= t && (e.expiredLanes |= p),
        (s &= ~p));
    }
    if (
      ((t = Ue),
      (l = ve),
      (l = wi(e, e === t ? l : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== -1)),
      (n = e.callbackNode),
      l === 0 || (e === t && (je === 2 || je === 9)) || e.cancelPendingCommit !== null)
    )
      return (n !== null && n !== null && gs(n), (e.callbackNode = null), (e.callbackPriority = 0));
    if ((l & 3) === 0 || Ta(e, l)) {
      if (((t = l & -l), t === e.callbackPriority)) return t;
      switch ((n !== null && gs(n), bs(l))) {
        case 2:
        case 8:
          l = kr;
          break;
        case 32:
          l = ji;
          break;
        case 268435456:
          l = jr;
          break;
        default:
          l = ji;
      }
      return (
        (n = Ym.bind(null, e)),
        (l = ys(l, n)),
        (e.callbackPriority = t),
        (e.callbackNode = l),
        t
      );
    }
    return (
      n !== null && n !== null && gs(n),
      (e.callbackPriority = 2),
      (e.callbackNode = null),
      2
    );
  }
  function Ym(e, t) {
    if (et !== 0 && et !== 5) return ((e.callbackNode = null), (e.callbackPriority = 0), null);
    var l = e.callbackNode;
    if (Ru() && e.callbackNode !== l) return null;
    var n = ve;
    return (
      (n = wi(e, e === Ue ? n : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== -1)),
      n === 0
        ? null
        : (Em(e, n, t),
          Gm(e, Et()),
          e.callbackNode != null && e.callbackNode === l ? Ym.bind(null, e) : null)
    );
  }
  function Xm(e, t) {
    if (Ru()) return null;
    Em(e, t, !0);
  }
  function Fg() {
    r0(function () {
      (Ce & 6) !== 0 ? ys(Rr, Wg) : Hm();
    });
  }
  function uo() {
    if (Il === 0) {
      var e = Kn;
      (e === 0 && ((e = Oi), (Oi <<= 1), (Oi & 261888) === 0 && (Oi = 256)), (Il = e));
    }
    return Il;
  }
  function Vm(e) {
    return e == null || typeof e == 'symbol' || typeof e == 'boolean'
      ? null
      : typeof e == 'function'
        ? e
        : Li('' + e);
  }
  function Qm(e, t) {
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
  function Pg(e, t, l, n, i) {
    if (t === 'submit' && l && l.stateNode === i) {
      var s = Vm((i[yt] || null).action),
        f = n.submitter;
      f &&
        ((t = (t = f[yt] || null) ? Vm(t.formAction) : f.getAttribute('formAction')),
        t !== null && ((s = t), (f = null)));
      var p = new Xi('action', 'action', null, n, i);
      e.push({
        event: p,
        listeners: [
          {
            instance: null,
            listener: function () {
              if (n.defaultPrevented) {
                if (Il !== 0) {
                  var x = f ? Qm(i, f) : new FormData(i);
                  Ac(l, { pending: !0, data: x, method: i.method, action: s }, null, x);
                }
              } else
                typeof s == 'function' &&
                  (p.preventDefault(),
                  (x = f ? Qm(i, f) : new FormData(i)),
                  Ac(l, { pending: !0, data: x, method: i.method, action: s }, s, x));
            },
            currentTarget: i,
          },
        ],
      });
    }
  }
  for (var so = 0; so < Xs.length; so++) {
    var co = Xs[so],
      e0 = co.toLowerCase(),
      t0 = co[0].toUpperCase() + co.slice(1);
    Kt(e0, 'on' + t0);
  }
  (Kt(xf, 'onAnimationEnd'),
    Kt(Ef, 'onAnimationIteration'),
    Kt(Tf, 'onAnimationStart'),
    Kt('dblclick', 'onDoubleClick'),
    Kt('focusin', 'onFocus'),
    Kt('focusout', 'onBlur'),
    Kt(gg, 'onTransitionRun'),
    Kt(vg, 'onTransitionStart'),
    Kt(_g, 'onTransitionCancel'),
    Kt(Nf, 'onTransitionEnd'),
    Dn('onMouseEnter', ['mouseout', 'mouseover']),
    Dn('onMouseLeave', ['mouseout', 'mouseover']),
    Dn('onPointerEnter', ['pointerout', 'pointerover']),
    Dn('onPointerLeave', ['pointerout', 'pointerover']),
    on('onChange', 'change click focusin focusout input keydown keyup selectionchange'.split(' ')),
    on(
      'onSelect',
      'focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange'.split(
        ' '
      )
    ),
    on('onBeforeInput', ['compositionend', 'keypress', 'textInput', 'paste']),
    on('onCompositionEnd', 'compositionend focusout keydown keypress keyup mousedown'.split(' ')),
    on(
      'onCompositionStart',
      'compositionstart focusout keydown keypress keyup mousedown'.split(' ')
    ),
    on(
      'onCompositionUpdate',
      'compositionupdate focusout keydown keypress keyup mousedown'.split(' ')
    ));
  var ui =
      'abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting'.split(
        ' '
      ),
    l0 = new Set(
      'beforetoggle cancel close invalid load scroll scrollend toggle'.split(' ').concat(ui)
    );
  function Zm(e, t) {
    t = (t & 4) !== 0;
    for (var l = 0; l < e.length; l++) {
      var n = e[l],
        i = n.event;
      n = n.listeners;
      e: {
        var s = void 0;
        if (t)
          for (var f = n.length - 1; 0 <= f; f--) {
            var p = n[f],
              x = p.instance,
              j = p.currentTarget;
            if (((p = p.listener), x !== s && i.isPropagationStopped())) break e;
            ((s = p), (i.currentTarget = j));
            try {
              s(i);
            } catch (H) {
              Zi(H);
            }
            ((i.currentTarget = null), (s = x));
          }
        else
          for (f = 0; f < n.length; f++) {
            if (
              ((p = n[f]),
              (x = p.instance),
              (j = p.currentTarget),
              (p = p.listener),
              x !== s && i.isPropagationStopped())
            )
              break e;
            ((s = p), (i.currentTarget = j));
            try {
              s(i);
            } catch (H) {
              Zi(H);
            }
            ((i.currentTarget = null), (s = x));
          }
      }
    }
  }
  function ge(e, t) {
    var l = t[Ss];
    l === void 0 && (l = t[Ss] = new Set());
    var n = e + '__bubble';
    l.has(n) || ($m(t, e, 2, !1), l.add(n));
  }
  function oo(e, t, l) {
    var n = 0;
    (t && (n |= 4), $m(l, e, n, t));
  }
  var Ou = '_reactListening' + Math.random().toString(36).slice(2);
  function ro(e) {
    if (!e[Ou]) {
      ((e[Ou] = !0),
        Lr.forEach(function (l) {
          l !== 'selectionchange' && (l0.has(l) || oo(l, !1, e), oo(l, !0, e));
        }));
      var t = e.nodeType === 9 ? e : e.ownerDocument;
      t === null || t[Ou] || ((t[Ou] = !0), oo('selectionchange', !1, t));
    }
  }
  function $m(e, t, l, n) {
    switch (xh(t)) {
      case 2:
        var i = k0;
        break;
      case 8:
        i = j0;
        break;
      default:
        i = Ao;
    }
    ((l = i.bind(null, t, l, e)),
      (i = void 0),
      !ks || (t !== 'touchstart' && t !== 'touchmove' && t !== 'wheel') || (i = !0),
      n
        ? i !== void 0
          ? e.addEventListener(t, l, { capture: !0, passive: i })
          : e.addEventListener(t, l, !0)
        : i !== void 0
          ? e.addEventListener(t, l, { passive: i })
          : e.addEventListener(t, l, !1));
  }
  function fo(e, t, l, n, i) {
    var s = n;
    if ((t & 1) === 0 && (t & 2) === 0 && n !== null)
      e: for (;;) {
        if (n === null) return;
        var f = n.tag;
        if (f === 3 || f === 4) {
          var p = n.stateNode.containerInfo;
          if (p === i) break;
          if (f === 4)
            for (f = n.return; f !== null; ) {
              var x = f.tag;
              if ((x === 3 || x === 4) && f.stateNode.containerInfo === i) return;
              f = f.return;
            }
          for (; p !== null; ) {
            if (((f = jn(p)), f === null)) return;
            if (((x = f.tag), x === 5 || x === 6 || x === 26 || x === 27)) {
              n = s = f;
              continue e;
            }
            p = p.parentNode;
          }
        }
        n = n.return;
      }
    Wr(function () {
      var j = s,
        H = Ms(l),
        V = [];
      e: {
        var z = Af.get(e);
        if (z !== void 0) {
          var w = Xi,
            ee = e;
          switch (e) {
            case 'keypress':
              if (Gi(l) === 0) break e;
            case 'keydown':
            case 'keyup':
              w = Jy;
              break;
            case 'focusin':
              ((ee = 'focus'), (w = Ds));
              break;
            case 'focusout':
              ((ee = 'blur'), (w = Ds));
              break;
            case 'beforeblur':
            case 'afterblur':
              w = Ds;
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
              w = ef;
              break;
            case 'drag':
            case 'dragend':
            case 'dragenter':
            case 'dragexit':
            case 'dragleave':
            case 'dragover':
            case 'dragstart':
            case 'drop':
              w = Uy;
              break;
            case 'touchcancel':
            case 'touchend':
            case 'touchmove':
            case 'touchstart':
              w = Fy;
              break;
            case xf:
            case Ef:
            case Tf:
              w = Hy;
              break;
            case Nf:
              w = eg;
              break;
            case 'scroll':
            case 'scrollend':
              w = wy;
              break;
            case 'wheel':
              w = lg;
              break;
            case 'copy':
            case 'cut':
            case 'paste':
              w = Yy;
              break;
            case 'gotpointercapture':
            case 'lostpointercapture':
            case 'pointercancel':
            case 'pointerdown':
            case 'pointermove':
            case 'pointerout':
            case 'pointerover':
            case 'pointerup':
              w = lf;
              break;
            case 'toggle':
            case 'beforetoggle':
              w = ag;
          }
          var ue = (t & 4) !== 0,
            Be = !ue && (e === 'scroll' || e === 'scrollend'),
            M = ue ? (z !== null ? z + 'Capture' : null) : z;
          ue = [];
          for (var E = j, k; E !== null; ) {
            var Y = E;
            if (
              ((k = Y.stateNode),
              (Y = Y.tag),
              (Y !== 5 && Y !== 26 && Y !== 27) ||
                k === null ||
                M === null ||
                ((Y = Ma(E, M)), Y != null && ue.push(si(E, Y, k))),
              Be)
            )
              break;
            E = E.return;
          }
          0 < ue.length && ((z = new w(z, ee, null, l, H)), V.push({ event: z, listeners: ue }));
        }
      }
      if ((t & 7) === 0) {
        e: {
          if (
            ((z = e === 'mouseover' || e === 'pointerover'),
            (w = e === 'mouseout' || e === 'pointerout'),
            z && l !== Cs && (ee = l.relatedTarget || l.fromElement) && (jn(ee) || ee[kn]))
          )
            break e;
          if (
            (w || z) &&
            ((z =
              H.window === H
                ? H
                : (z = H.ownerDocument)
                  ? z.defaultView || z.parentWindow
                  : window),
            w
              ? ((ee = l.relatedTarget || l.toElement),
                (w = j),
                (ee = ee ? jn(ee) : null),
                ee !== null &&
                  ((Be = d(ee)), (ue = ee.tag), ee !== Be || (ue !== 5 && ue !== 27 && ue !== 6)) &&
                  (ee = null))
              : ((w = null), (ee = j)),
            w !== ee)
          ) {
            if (
              ((ue = ef),
              (Y = 'onMouseLeave'),
              (M = 'onMouseEnter'),
              (E = 'mouse'),
              (e === 'pointerout' || e === 'pointerover') &&
                ((ue = lf), (Y = 'onPointerLeave'), (M = 'onPointerEnter'), (E = 'pointer')),
              (Be = w == null ? z : Ca(w)),
              (k = ee == null ? z : Ca(ee)),
              (z = new ue(Y, E + 'leave', w, l, H)),
              (z.target = Be),
              (z.relatedTarget = k),
              (Y = null),
              jn(H) === j &&
                ((ue = new ue(M, E + 'enter', ee, l, H)),
                (ue.target = k),
                (ue.relatedTarget = Be),
                (Y = ue)),
              (Be = Y),
              w && ee)
            )
              t: {
                for (ue = n0, M = w, E = ee, k = 0, Y = M; Y; Y = ue(Y)) k++;
                Y = 0;
                for (var ne = E; ne; ne = ue(ne)) Y++;
                for (; 0 < k - Y; ) ((M = ue(M)), k--);
                for (; 0 < Y - k; ) ((E = ue(E)), Y--);
                for (; k--; ) {
                  if (M === E || (E !== null && M === E.alternate)) {
                    ue = M;
                    break t;
                  }
                  ((M = ue(M)), (E = ue(E)));
                }
                ue = null;
              }
            else ue = null;
            (w !== null && Km(V, z, w, ue, !1),
              ee !== null && Be !== null && Km(V, Be, ee, ue, !0));
          }
        }
        e: {
          if (
            ((z = j ? Ca(j) : window),
            (w = z.nodeName && z.nodeName.toLowerCase()),
            w === 'select' || (w === 'input' && z.type === 'file'))
          )
            var Te = ff;
          else if (of(z))
            if (df) Te = hg;
            else {
              Te = dg;
              var te = fg;
            }
          else
            ((w = z.nodeName),
              !w || w.toLowerCase() !== 'input' || (z.type !== 'checkbox' && z.type !== 'radio')
                ? j && As(j.elementType) && (Te = ff)
                : (Te = mg));
          if (Te && (Te = Te(e, j))) {
            rf(V, Te, l, H);
            break e;
          }
          (te && te(e, z, j),
            e === 'focusout' &&
              j &&
              z.type === 'number' &&
              j.memoizedProps.value != null &&
              Ns(z, 'number', z.value));
        }
        switch (((te = j ? Ca(j) : window), e)) {
          case 'focusin':
            (of(te) || te.contentEditable === 'true') && ((Hn = te), (Hs = j), (Ba = null));
            break;
          case 'focusout':
            Ba = Hs = Hn = null;
            break;
          case 'mousedown':
            Gs = !0;
            break;
          case 'contextmenu':
          case 'mouseup':
          case 'dragend':
            ((Gs = !1), bf(V, l, H));
            break;
          case 'selectionchange':
            if (yg) break;
          case 'keydown':
          case 'keyup':
            bf(V, l, H);
        }
        var he;
        if (Bs)
          e: {
            switch (e) {
              case 'compositionstart':
                var _e = 'onCompositionStart';
                break e;
              case 'compositionend':
                _e = 'onCompositionEnd';
                break e;
              case 'compositionupdate':
                _e = 'onCompositionUpdate';
                break e;
            }
            _e = void 0;
          }
        else
          Ln
            ? sf(e, l) && (_e = 'onCompositionEnd')
            : e === 'keydown' && l.keyCode === 229 && (_e = 'onCompositionStart');
        (_e &&
          (nf &&
            l.locale !== 'ko' &&
            (Ln || _e !== 'onCompositionStart'
              ? _e === 'onCompositionEnd' && Ln && (he = Fr())
              : ((Dl = H), (js = 'value' in Dl ? Dl.value : Dl.textContent), (Ln = !0))),
          (te = zu(j, _e)),
          0 < te.length &&
            ((_e = new tf(_e, e, null, l, H)),
            V.push({ event: _e, listeners: te }),
            he ? (_e.data = he) : ((he = cf(l)), he !== null && (_e.data = he)))),
          (he = ug ? sg(e, l) : cg(e, l)) &&
            ((_e = zu(j, 'onBeforeInput')),
            0 < _e.length &&
              ((te = new tf('onBeforeInput', 'beforeinput', null, l, H)),
              V.push({ event: te, listeners: _e }),
              (te.data = he))),
          Pg(V, e, j, l, H));
      }
      Zm(V, t);
    });
  }
  function si(e, t, l) {
    return { instance: e, listener: t, currentTarget: l };
  }
  function zu(e, t) {
    for (var l = t + 'Capture', n = []; e !== null; ) {
      var i = e,
        s = i.stateNode;
      if (
        ((i = i.tag),
        (i !== 5 && i !== 26 && i !== 27) ||
          s === null ||
          ((i = Ma(e, l)),
          i != null && n.unshift(si(e, i, s)),
          (i = Ma(e, t)),
          i != null && n.push(si(e, i, s))),
        e.tag === 3)
      )
        return n;
      e = e.return;
    }
    return [];
  }
  function n0(e) {
    if (e === null) return null;
    do e = e.return;
    while (e && e.tag !== 5 && e.tag !== 27);
    return e || null;
  }
  function Km(e, t, l, n, i) {
    for (var s = t._reactName, f = []; l !== null && l !== n; ) {
      var p = l,
        x = p.alternate,
        j = p.stateNode;
      if (((p = p.tag), x !== null && x === n)) break;
      ((p !== 5 && p !== 26 && p !== 27) ||
        j === null ||
        ((x = j),
        i
          ? ((j = Ma(l, s)), j != null && f.unshift(si(l, j, x)))
          : i || ((j = Ma(l, s)), j != null && f.push(si(l, j, x)))),
        (l = l.return));
    }
    f.length !== 0 && e.push({ event: t, listeners: f });
  }
  var a0 = /\r\n?/g,
    i0 = /\u0000|\uFFFD/g;
  function Jm(e) {
    return (typeof e == 'string' ? e : '' + e)
      .replace(
        a0,
        `
`
      )
      .replace(i0, '');
  }
  function Im(e, t) {
    return ((t = Jm(t)), Jm(e) === t);
  }
  function we(e, t, l, n, i, s) {
    switch (l) {
      case 'children':
        typeof n == 'string'
          ? t === 'body' || (t === 'textarea' && n === '') || Bn(e, n)
          : (typeof n == 'number' || typeof n == 'bigint') && t !== 'body' && Bn(e, '' + n);
        break;
      case 'className':
        Ui(e, 'class', n);
        break;
      case 'tabIndex':
        Ui(e, 'tabindex', n);
        break;
      case 'dir':
      case 'role':
      case 'viewBox':
      case 'width':
      case 'height':
        Ui(e, l, n);
        break;
      case 'style':
        Jr(e, n, s);
        break;
      case 'data':
        if (t !== 'object') {
          Ui(e, 'data', n);
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
        ((n = Li('' + n)), e.setAttribute(l, n));
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
              ? (t !== 'input' && we(e, t, 'name', i.name, i, null),
                we(e, t, 'formEncType', i.formEncType, i, null),
                we(e, t, 'formMethod', i.formMethod, i, null),
                we(e, t, 'formTarget', i.formTarget, i, null))
              : (we(e, t, 'encType', i.encType, i, null),
                we(e, t, 'method', i.method, i, null),
                we(e, t, 'target', i.target, i, null)));
        if (n == null || typeof n == 'symbol' || typeof n == 'boolean') {
          e.removeAttribute(l);
          break;
        }
        ((n = Li('' + n)), e.setAttribute(l, n));
        break;
      case 'onClick':
        n != null && (e.onclick = sl);
        break;
      case 'onScroll':
        n != null && ge('scroll', e);
        break;
      case 'onScrollEnd':
        n != null && ge('scrollend', e);
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
        ((l = Li('' + n)), e.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', l));
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
        (ge('beforetoggle', e), ge('toggle', e), Bi(e, 'popover', n));
        break;
      case 'xlinkActuate':
        ul(e, 'http://www.w3.org/1999/xlink', 'xlink:actuate', n);
        break;
      case 'xlinkArcrole':
        ul(e, 'http://www.w3.org/1999/xlink', 'xlink:arcrole', n);
        break;
      case 'xlinkRole':
        ul(e, 'http://www.w3.org/1999/xlink', 'xlink:role', n);
        break;
      case 'xlinkShow':
        ul(e, 'http://www.w3.org/1999/xlink', 'xlink:show', n);
        break;
      case 'xlinkTitle':
        ul(e, 'http://www.w3.org/1999/xlink', 'xlink:title', n);
        break;
      case 'xlinkType':
        ul(e, 'http://www.w3.org/1999/xlink', 'xlink:type', n);
        break;
      case 'xmlBase':
        ul(e, 'http://www.w3.org/XML/1998/namespace', 'xml:base', n);
        break;
      case 'xmlLang':
        ul(e, 'http://www.w3.org/XML/1998/namespace', 'xml:lang', n);
        break;
      case 'xmlSpace':
        ul(e, 'http://www.w3.org/XML/1998/namespace', 'xml:space', n);
        break;
      case 'is':
        Bi(e, 'is', n);
        break;
      case 'innerText':
      case 'textContent':
        break;
      default:
        (!(2 < l.length) || (l[0] !== 'o' && l[0] !== 'O') || (l[1] !== 'n' && l[1] !== 'N')) &&
          ((l = zy.get(l) || l), Bi(e, l, n));
    }
  }
  function mo(e, t, l, n, i, s) {
    switch (l) {
      case 'style':
        Jr(e, n, s);
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
          ? Bn(e, n)
          : (typeof n == 'number' || typeof n == 'bigint') && Bn(e, '' + n);
        break;
      case 'onScroll':
        n != null && ge('scroll', e);
        break;
      case 'onScrollEnd':
        n != null && ge('scrollend', e);
        break;
      case 'onClick':
        n != null && (e.onclick = sl);
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
        if (!Hr.hasOwnProperty(l))
          e: {
            if (
              l[0] === 'o' &&
              l[1] === 'n' &&
              ((i = l.endsWith('Capture')),
              (t = l.slice(2, i ? l.length - 7 : void 0)),
              (s = e[yt] || null),
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
            l in e ? (e[l] = n) : n === !0 ? e.setAttribute(l, '') : Bi(e, l, n);
          }
    }
  }
  function ot(e, t, l) {
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
        (ge('error', e), ge('load', e));
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
                  we(e, t, s, f, l, null);
              }
          }
        (i && we(e, t, 'srcSet', l.srcSet, l, null), n && we(e, t, 'src', l.src, l, null));
        return;
      case 'input':
        ge('invalid', e);
        var p = (s = f = i = null),
          x = null,
          j = null;
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
                  x = H;
                  break;
                case 'defaultChecked':
                  j = H;
                  break;
                case 'value':
                  s = H;
                  break;
                case 'defaultValue':
                  p = H;
                  break;
                case 'children':
                case 'dangerouslySetInnerHTML':
                  if (H != null) throw Error(c(137, t));
                  break;
                default:
                  we(e, t, n, H, l, null);
              }
          }
        Qr(e, s, p, x, j, f, i, !1);
        return;
      case 'select':
        (ge('invalid', e), (n = f = s = null));
        for (i in l)
          if (l.hasOwnProperty(i) && ((p = l[i]), p != null))
            switch (i) {
              case 'value':
                s = p;
                break;
              case 'defaultValue':
                f = p;
                break;
              case 'multiple':
                n = p;
              default:
                we(e, t, i, p, l, null);
            }
        ((t = s),
          (l = f),
          (e.multiple = !!n),
          t != null ? wn(e, !!n, t, !1) : l != null && wn(e, !!n, l, !0));
        return;
      case 'textarea':
        (ge('invalid', e), (s = i = n = null));
        for (f in l)
          if (l.hasOwnProperty(f) && ((p = l[f]), p != null))
            switch (f) {
              case 'value':
                n = p;
                break;
              case 'defaultValue':
                i = p;
                break;
              case 'children':
                s = p;
                break;
              case 'dangerouslySetInnerHTML':
                if (p != null) throw Error(c(91));
                break;
              default:
                we(e, t, f, p, l, null);
            }
        $r(e, n, i, s);
        return;
      case 'option':
        for (x in l)
          if (l.hasOwnProperty(x) && ((n = l[x]), n != null))
            switch (x) {
              case 'selected':
                e.selected = n && typeof n != 'function' && typeof n != 'symbol';
                break;
              default:
                we(e, t, x, n, l, null);
            }
        return;
      case 'dialog':
        (ge('beforetoggle', e), ge('toggle', e), ge('cancel', e), ge('close', e));
        break;
      case 'iframe':
      case 'object':
        ge('load', e);
        break;
      case 'video':
      case 'audio':
        for (n = 0; n < ui.length; n++) ge(ui[n], e);
        break;
      case 'image':
        (ge('error', e), ge('load', e));
        break;
      case 'details':
        ge('toggle', e);
        break;
      case 'embed':
      case 'source':
      case 'link':
        (ge('error', e), ge('load', e));
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
        for (j in l)
          if (l.hasOwnProperty(j) && ((n = l[j]), n != null))
            switch (j) {
              case 'children':
              case 'dangerouslySetInnerHTML':
                throw Error(c(137, t));
              default:
                we(e, t, j, n, l, null);
            }
        return;
      default:
        if (As(t)) {
          for (H in l)
            l.hasOwnProperty(H) && ((n = l[H]), n !== void 0 && mo(e, t, H, n, l, void 0));
          return;
        }
    }
    for (p in l) l.hasOwnProperty(p) && ((n = l[p]), n != null && we(e, t, p, n, l, null));
  }
  function u0(e, t, l, n) {
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
          p = null,
          x = null,
          j = null,
          H = null;
        for (w in l) {
          var V = l[w];
          if (l.hasOwnProperty(w) && V != null)
            switch (w) {
              case 'checked':
                break;
              case 'value':
                break;
              case 'defaultValue':
                x = V;
              default:
                n.hasOwnProperty(w) || we(e, t, w, null, n, V);
            }
        }
        for (var z in n) {
          var w = n[z];
          if (((V = l[z]), n.hasOwnProperty(z) && (w != null || V != null)))
            switch (z) {
              case 'type':
                s = w;
                break;
              case 'name':
                i = w;
                break;
              case 'checked':
                j = w;
                break;
              case 'defaultChecked':
                H = w;
                break;
              case 'value':
                f = w;
                break;
              case 'defaultValue':
                p = w;
                break;
              case 'children':
              case 'dangerouslySetInnerHTML':
                if (w != null) throw Error(c(137, t));
                break;
              default:
                w !== V && we(e, t, z, w, n, V);
            }
        }
        Ts(e, f, p, x, j, H, s, i);
        return;
      case 'select':
        w = f = p = z = null;
        for (s in l)
          if (((x = l[s]), l.hasOwnProperty(s) && x != null))
            switch (s) {
              case 'value':
                break;
              case 'multiple':
                w = x;
              default:
                n.hasOwnProperty(s) || we(e, t, s, null, n, x);
            }
        for (i in n)
          if (((s = n[i]), (x = l[i]), n.hasOwnProperty(i) && (s != null || x != null)))
            switch (i) {
              case 'value':
                z = s;
                break;
              case 'defaultValue':
                p = s;
                break;
              case 'multiple':
                f = s;
              default:
                s !== x && we(e, t, i, s, n, x);
            }
        ((t = p),
          (l = f),
          (n = w),
          z != null
            ? wn(e, !!l, z, !1)
            : !!n != !!l && (t != null ? wn(e, !!l, t, !0) : wn(e, !!l, l ? [] : '', !1)));
        return;
      case 'textarea':
        w = z = null;
        for (p in l)
          if (((i = l[p]), l.hasOwnProperty(p) && i != null && !n.hasOwnProperty(p)))
            switch (p) {
              case 'value':
                break;
              case 'children':
                break;
              default:
                we(e, t, p, null, n, i);
            }
        for (f in n)
          if (((i = n[f]), (s = l[f]), n.hasOwnProperty(f) && (i != null || s != null)))
            switch (f) {
              case 'value':
                z = i;
                break;
              case 'defaultValue':
                w = i;
                break;
              case 'children':
                break;
              case 'dangerouslySetInnerHTML':
                if (i != null) throw Error(c(91));
                break;
              default:
                i !== s && we(e, t, f, i, n, s);
            }
        Zr(e, z, w);
        return;
      case 'option':
        for (var ee in l)
          if (((z = l[ee]), l.hasOwnProperty(ee) && z != null && !n.hasOwnProperty(ee)))
            switch (ee) {
              case 'selected':
                e.selected = !1;
                break;
              default:
                we(e, t, ee, null, n, z);
            }
        for (x in n)
          if (((z = n[x]), (w = l[x]), n.hasOwnProperty(x) && z !== w && (z != null || w != null)))
            switch (x) {
              case 'selected':
                e.selected = z && typeof z != 'function' && typeof z != 'symbol';
                break;
              default:
                we(e, t, x, z, n, w);
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
        for (var ue in l)
          ((z = l[ue]),
            l.hasOwnProperty(ue) && z != null && !n.hasOwnProperty(ue) && we(e, t, ue, null, n, z));
        for (j in n)
          if (((z = n[j]), (w = l[j]), n.hasOwnProperty(j) && z !== w && (z != null || w != null)))
            switch (j) {
              case 'children':
              case 'dangerouslySetInnerHTML':
                if (z != null) throw Error(c(137, t));
                break;
              default:
                we(e, t, j, z, n, w);
            }
        return;
      default:
        if (As(t)) {
          for (var Be in l)
            ((z = l[Be]),
              l.hasOwnProperty(Be) &&
                z !== void 0 &&
                !n.hasOwnProperty(Be) &&
                mo(e, t, Be, void 0, n, z));
          for (H in n)
            ((z = n[H]),
              (w = l[H]),
              !n.hasOwnProperty(H) ||
                z === w ||
                (z === void 0 && w === void 0) ||
                mo(e, t, H, z, n, w));
          return;
        }
    }
    for (var M in l)
      ((z = l[M]),
        l.hasOwnProperty(M) && z != null && !n.hasOwnProperty(M) && we(e, t, M, null, n, z));
    for (V in n)
      ((z = n[V]),
        (w = l[V]),
        !n.hasOwnProperty(V) || z === w || (z == null && w == null) || we(e, t, V, z, n, w));
  }
  function Wm(e) {
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
  function s0() {
    if (typeof performance.getEntriesByType == 'function') {
      for (
        var e = 0, t = 0, l = performance.getEntriesByType('resource'), n = 0;
        n < l.length;
        n++
      ) {
        var i = l[n],
          s = i.transferSize,
          f = i.initiatorType,
          p = i.duration;
        if (s && p && Wm(f)) {
          for (f = 0, p = i.responseEnd, n += 1; n < l.length; n++) {
            var x = l[n],
              j = x.startTime;
            if (j > p) break;
            var H = x.transferSize,
              V = x.initiatorType;
            H && Wm(V) && ((x = x.responseEnd), (f += H * (x < p ? 1 : (p - j) / (x - j))));
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
  var ho = null,
    po = null;
  function Du(e) {
    return e.nodeType === 9 ? e : e.ownerDocument;
  }
  function Fm(e) {
    switch (e) {
      case 'http://www.w3.org/2000/svg':
        return 1;
      case 'http://www.w3.org/1998/Math/MathML':
        return 2;
      default:
        return 0;
    }
  }
  function Pm(e, t) {
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
  function yo(e, t) {
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
  var go = null;
  function c0() {
    var e = window.event;
    return e && e.type === 'popstate' ? (e === go ? !1 : ((go = e), !0)) : ((go = null), !1);
  }
  var eh = typeof setTimeout == 'function' ? setTimeout : void 0,
    o0 = typeof clearTimeout == 'function' ? clearTimeout : void 0,
    th = typeof Promise == 'function' ? Promise : void 0,
    r0 =
      typeof queueMicrotask == 'function'
        ? queueMicrotask
        : typeof th < 'u'
          ? function (e) {
              return th.resolve(null).then(e).catch(f0);
            }
          : eh;
  function f0(e) {
    setTimeout(function () {
      throw e;
    });
  }
  function Wl(e) {
    return e === 'head';
  }
  function lh(e, t) {
    var l = t,
      n = 0;
    do {
      var i = l.nextSibling;
      if ((e.removeChild(l), i && i.nodeType === 8))
        if (((l = i.data), l === '/$' || l === '/&')) {
          if (n === 0) {
            (e.removeChild(i), ma(t));
            return;
          }
          n--;
        } else if (l === '$' || l === '$?' || l === '$~' || l === '$!' || l === '&') n++;
        else if (l === 'html') ci(e.ownerDocument.documentElement);
        else if (l === 'head') {
          ((l = e.ownerDocument.head), ci(l));
          for (var s = l.firstChild; s; ) {
            var f = s.nextSibling,
              p = s.nodeName;
            (s[Aa] ||
              p === 'SCRIPT' ||
              p === 'STYLE' ||
              (p === 'LINK' && s.rel.toLowerCase() === 'stylesheet') ||
              l.removeChild(s),
              (s = f));
          }
        } else l === 'body' && ci(e.ownerDocument.body);
      l = i;
    } while (l);
    ma(t);
  }
  function nh(e, t) {
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
  function vo(e) {
    var t = e.firstChild;
    for (t && t.nodeType === 10 && (t = t.nextSibling); t; ) {
      var l = t;
      switch (((t = t.nextSibling), l.nodeName)) {
        case 'HTML':
        case 'HEAD':
        case 'BODY':
          (vo(l), xs(l));
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
  function d0(e, t, l, n) {
    for (; e.nodeType === 1; ) {
      var i = l;
      if (e.nodeName.toLowerCase() !== t.toLowerCase()) {
        if (!n && (e.nodeName !== 'INPUT' || e.type !== 'hidden')) break;
      } else if (n) {
        if (!e[Aa])
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
      if (((e = Vt(e.nextSibling)), e === null)) break;
    }
    return null;
  }
  function m0(e, t, l) {
    if (t === '') return null;
    for (; e.nodeType !== 3; )
      if (
        ((e.nodeType !== 1 || e.nodeName !== 'INPUT' || e.type !== 'hidden') && !l) ||
        ((e = Vt(e.nextSibling)), e === null)
      )
        return null;
    return e;
  }
  function ah(e, t) {
    for (; e.nodeType !== 8; )
      if (
        ((e.nodeType !== 1 || e.nodeName !== 'INPUT' || e.type !== 'hidden') && !t) ||
        ((e = Vt(e.nextSibling)), e === null)
      )
        return null;
    return e;
  }
  function _o(e) {
    return e.data === '$?' || e.data === '$~';
  }
  function bo(e) {
    return e.data === '$!' || (e.data === '$?' && e.ownerDocument.readyState !== 'loading');
  }
  function h0(e, t) {
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
  var So = null;
  function ih(e) {
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
  function uh(e) {
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
  function sh(e, t, l) {
    switch (((t = Du(l)), e)) {
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
  function ci(e) {
    for (var t = e.attributes; t.length; ) e.removeAttributeNode(t[0]);
    xs(e);
  }
  var Qt = new Map(),
    ch = new Set();
  function wu(e) {
    return typeof e.getRootNode == 'function'
      ? e.getRootNode()
      : e.nodeType === 9
        ? e
        : e.ownerDocument;
  }
  var El = J.d;
  J.d = { f: p0, r: y0, D: g0, C: v0, L: _0, m: b0, X: x0, S: S0, M: E0 };
  function p0() {
    var e = El.f(),
      t = Au();
    return e || t;
  }
  function y0(e) {
    var t = On(e);
    t !== null && t.tag === 5 && t.type === 'form' ? Nd(t) : El.r(e);
  }
  var ra = typeof document > 'u' ? null : document;
  function oh(e, t, l) {
    var n = ra;
    if (n && typeof t == 'string' && t) {
      var i = Ut(t);
      ((i = 'link[rel="' + e + '"][href="' + i + '"]'),
        typeof l == 'string' && (i += '[crossorigin="' + l + '"]'),
        ch.has(i) ||
          (ch.add(i),
          (e = { rel: e, crossOrigin: l, href: t }),
          n.querySelector(i) === null &&
            ((t = n.createElement('link')), ot(t, 'link', e), lt(t), n.head.appendChild(t))));
    }
  }
  function g0(e) {
    (El.D(e), oh('dns-prefetch', e, null));
  }
  function v0(e, t) {
    (El.C(e, t), oh('preconnect', e, t));
  }
  function _0(e, t, l) {
    El.L(e, t, l);
    var n = ra;
    if (n && e && t) {
      var i = 'link[rel="preload"][as="' + Ut(t) + '"]';
      t === 'image' && l && l.imageSrcSet
        ? ((i += '[imagesrcset="' + Ut(l.imageSrcSet) + '"]'),
          typeof l.imageSizes == 'string' && (i += '[imagesizes="' + Ut(l.imageSizes) + '"]'))
        : (i += '[href="' + Ut(e) + '"]');
      var s = i;
      switch (t) {
        case 'style':
          s = fa(e);
          break;
        case 'script':
          s = da(e);
      }
      Qt.has(s) ||
        ((e = S(
          { rel: 'preload', href: t === 'image' && l && l.imageSrcSet ? void 0 : e, as: t },
          l
        )),
        Qt.set(s, e),
        n.querySelector(i) !== null ||
          (t === 'style' && n.querySelector(oi(s))) ||
          (t === 'script' && n.querySelector(ri(s))) ||
          ((t = n.createElement('link')), ot(t, 'link', e), lt(t), n.head.appendChild(t)));
    }
  }
  function b0(e, t) {
    El.m(e, t);
    var l = ra;
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
          s = da(e);
      }
      if (
        !Qt.has(s) &&
        ((e = S({ rel: 'modulepreload', href: e }, t)), Qt.set(s, e), l.querySelector(i) === null)
      ) {
        switch (n) {
          case 'audioworklet':
          case 'paintworklet':
          case 'serviceworker':
          case 'sharedworker':
          case 'worker':
          case 'script':
            if (l.querySelector(ri(s))) return;
        }
        ((n = l.createElement('link')), ot(n, 'link', e), lt(n), l.head.appendChild(n));
      }
    }
  }
  function S0(e, t, l) {
    El.S(e, t, l);
    var n = ra;
    if (n && e) {
      var i = zn(n).hoistableStyles,
        s = fa(e);
      t = t || 'default';
      var f = i.get(s);
      if (!f) {
        var p = { loading: 0, preload: null };
        if ((f = n.querySelector(oi(s)))) p.loading = 5;
        else {
          ((e = S({ rel: 'stylesheet', href: e, 'data-precedence': t }, l)),
            (l = Qt.get(s)) && xo(e, l));
          var x = (f = n.createElement('link'));
          (lt(x),
            ot(x, 'link', e),
            (x._p = new Promise(function (j, H) {
              ((x.onload = j), (x.onerror = H));
            })),
            x.addEventListener('load', function () {
              p.loading |= 1;
            }),
            x.addEventListener('error', function () {
              p.loading |= 2;
            }),
            (p.loading |= 4),
            Bu(f, t, n));
        }
        ((f = { type: 'stylesheet', instance: f, count: 1, state: p }), i.set(s, f));
      }
    }
  }
  function x0(e, t) {
    El.X(e, t);
    var l = ra;
    if (l && e) {
      var n = zn(l).hoistableScripts,
        i = da(e),
        s = n.get(i);
      s ||
        ((s = l.querySelector(ri(i))),
        s ||
          ((e = S({ src: e, async: !0 }, t)),
          (t = Qt.get(i)) && Eo(e, t),
          (s = l.createElement('script')),
          lt(s),
          ot(s, 'link', e),
          l.head.appendChild(s)),
        (s = { type: 'script', instance: s, count: 1, state: null }),
        n.set(i, s));
    }
  }
  function E0(e, t) {
    El.M(e, t);
    var l = ra;
    if (l && e) {
      var n = zn(l).hoistableScripts,
        i = da(e),
        s = n.get(i);
      s ||
        ((s = l.querySelector(ri(i))),
        s ||
          ((e = S({ src: e, async: !0, type: 'module' }, t)),
          (t = Qt.get(i)) && Eo(e, t),
          (s = l.createElement('script')),
          lt(s),
          ot(s, 'link', e),
          l.head.appendChild(s)),
        (s = { type: 'script', instance: s, count: 1, state: null }),
        n.set(i, s));
    }
  }
  function rh(e, t, l, n) {
    var i = (i = pe.current) ? wu(i) : null;
    if (!i) throw Error(c(446));
    switch (e) {
      case 'meta':
      case 'title':
        return null;
      case 'style':
        return typeof l.precedence == 'string' && typeof l.href == 'string'
          ? ((t = fa(l.href)),
            (l = zn(i).hoistableStyles),
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
          e = fa(l.href);
          var s = zn(i).hoistableStyles,
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
              (s = i.querySelector(oi(e))) && !s._p && ((f.instance = s), (f.state.loading = 5)),
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
                s || T0(i, e, l, f.state))),
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
            ? ((t = da(l)),
              (l = zn(i).hoistableScripts),
              (n = l.get(t)),
              n || ((n = { type: 'script', instance: null, count: 0, state: null }), l.set(t, n)),
              n)
            : { type: 'void', instance: null, count: 0, state: null }
        );
      default:
        throw Error(c(444, e));
    }
  }
  function fa(e) {
    return 'href="' + Ut(e) + '"';
  }
  function oi(e) {
    return 'link[rel="stylesheet"][' + e + ']';
  }
  function fh(e) {
    return S({}, e, { 'data-precedence': e.precedence, precedence: null });
  }
  function T0(e, t, l, n) {
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
        ot(t, 'link', l),
        lt(t),
        e.head.appendChild(t));
  }
  function da(e) {
    return '[src="' + Ut(e) + '"]';
  }
  function ri(e) {
    return 'script[async]' + e;
  }
  function dh(e, t, l) {
    if ((t.count++, t.instance === null))
      switch (t.type) {
        case 'style':
          var n = e.querySelector('style[data-href~="' + Ut(l.href) + '"]');
          if (n) return ((t.instance = n), lt(n), n);
          var i = S({}, l, {
            'data-href': l.href,
            'data-precedence': l.precedence,
            href: null,
            precedence: null,
          });
          return (
            (n = (e.ownerDocument || e).createElement('style')),
            lt(n),
            ot(n, 'style', i),
            Bu(n, l.precedence, e),
            (t.instance = n)
          );
        case 'stylesheet':
          i = fa(l.href);
          var s = e.querySelector(oi(i));
          if (s) return ((t.state.loading |= 4), (t.instance = s), lt(s), s);
          ((n = fh(l)),
            (i = Qt.get(i)) && xo(n, i),
            (s = (e.ownerDocument || e).createElement('link')),
            lt(s));
          var f = s;
          return (
            (f._p = new Promise(function (p, x) {
              ((f.onload = p), (f.onerror = x));
            })),
            ot(s, 'link', n),
            (t.state.loading |= 4),
            Bu(s, l.precedence, e),
            (t.instance = s)
          );
        case 'script':
          return (
            (s = da(l.src)),
            (i = e.querySelector(ri(s)))
              ? ((t.instance = i), lt(i), i)
              : ((n = l),
                (i = Qt.get(s)) && ((n = S({}, l)), Eo(n, i)),
                (e = e.ownerDocument || e),
                (i = e.createElement('script')),
                lt(i),
                ot(i, 'link', n),
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
        ((n = t.instance), (t.state.loading |= 4), Bu(n, l.precedence, e));
    return t.instance;
  }
  function Bu(e, t, l) {
    for (
      var n = l.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),
        i = n.length ? n[n.length - 1] : null,
        s = i,
        f = 0;
      f < n.length;
      f++
    ) {
      var p = n[f];
      if (p.dataset.precedence === t) s = p;
      else if (s !== i) break;
    }
    s
      ? s.parentNode.insertBefore(e, s.nextSibling)
      : ((t = l.nodeType === 9 ? l.head : l), t.insertBefore(e, t.firstChild));
  }
  function xo(e, t) {
    (e.crossOrigin == null && (e.crossOrigin = t.crossOrigin),
      e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy),
      e.title == null && (e.title = t.title));
  }
  function Eo(e, t) {
    (e.crossOrigin == null && (e.crossOrigin = t.crossOrigin),
      e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy),
      e.integrity == null && (e.integrity = t.integrity));
  }
  var Uu = null;
  function mh(e, t, l) {
    if (Uu === null) {
      var n = new Map(),
        i = (Uu = new Map());
      i.set(l, n);
    } else ((i = Uu), (n = i.get(l)), n || ((n = new Map()), i.set(l, n)));
    if (n.has(e)) return n;
    for (n.set(e, null), l = l.getElementsByTagName(e), i = 0; i < l.length; i++) {
      var s = l[i];
      if (
        !(s[Aa] || s[it] || (e === 'link' && s.getAttribute('rel') === 'stylesheet')) &&
        s.namespaceURI !== 'http://www.w3.org/2000/svg'
      ) {
        var f = s.getAttribute(t) || '';
        f = e + f;
        var p = n.get(f);
        p ? p.push(s) : n.set(f, [s]);
      }
    }
    return n;
  }
  function hh(e, t, l) {
    ((e = e.ownerDocument || e),
      e.head.insertBefore(l, t === 'title' ? e.querySelector('head > title') : null));
  }
  function N0(e, t, l) {
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
  function ph(e) {
    return !(e.type === 'stylesheet' && (e.state.loading & 3) === 0);
  }
  function A0(e, t, l, n) {
    if (
      l.type === 'stylesheet' &&
      (typeof n.media != 'string' || matchMedia(n.media).matches !== !1) &&
      (l.state.loading & 4) === 0
    ) {
      if (l.instance === null) {
        var i = fa(n.href),
          s = t.querySelector(oi(i));
        if (s) {
          ((t = s._p),
            t !== null &&
              typeof t == 'object' &&
              typeof t.then == 'function' &&
              (e.count++, (e = qu.bind(e)), t.then(e, e)),
            (l.state.loading |= 4),
            (l.instance = s),
            lt(s));
          return;
        }
        ((s = t.ownerDocument || t),
          (n = fh(n)),
          (i = Qt.get(i)) && xo(n, i),
          (s = s.createElement('link')),
          lt(s));
        var f = s;
        ((f._p = new Promise(function (p, x) {
          ((f.onload = p), (f.onerror = x));
        })),
          ot(s, 'link', n),
          (l.instance = s));
      }
      (e.stylesheets === null && (e.stylesheets = new Map()),
        e.stylesheets.set(l, t),
        (t = l.state.preload) &&
          (l.state.loading & 3) === 0 &&
          (e.count++,
          (l = qu.bind(e)),
          t.addEventListener('load', l),
          t.addEventListener('error', l)));
    }
  }
  var To = 0;
  function C0(e, t) {
    return (
      e.stylesheets && e.count === 0 && Hu(e, e.stylesheets),
      0 < e.count || 0 < e.imgCount
        ? function (l) {
            var n = setTimeout(function () {
              if ((e.stylesheets && Hu(e, e.stylesheets), e.unsuspend)) {
                var s = e.unsuspend;
                ((e.unsuspend = null), s());
              }
            }, 6e4 + t);
            0 < e.imgBytes && To === 0 && (To = 62500 * s0());
            var i = setTimeout(
              function () {
                if (
                  ((e.waitingForImages = !1),
                  e.count === 0 && (e.stylesheets && Hu(e, e.stylesheets), e.unsuspend))
                ) {
                  var s = e.unsuspend;
                  ((e.unsuspend = null), s());
                }
              },
              (e.imgBytes > To ? 50 : 800) + t
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
  function qu() {
    if ((this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages))) {
      if (this.stylesheets) Hu(this, this.stylesheets);
      else if (this.unsuspend) {
        var e = this.unsuspend;
        ((this.unsuspend = null), e());
      }
    }
  }
  var Lu = null;
  function Hu(e, t) {
    ((e.stylesheets = null),
      e.unsuspend !== null &&
        (e.count++, (Lu = new Map()), t.forEach(M0, e), (Lu = null), qu.call(e)));
  }
  function M0(e, t) {
    if (!(t.state.loading & 4)) {
      var l = Lu.get(e);
      if (l) var n = l.get(null);
      else {
        ((l = new Map()), Lu.set(e, l));
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
        (n = qu.bind(this)),
        i.addEventListener('load', n),
        i.addEventListener('error', n),
        s
          ? s.parentNode.insertBefore(i, s.nextSibling)
          : ((e = e.nodeType === 9 ? e.head : e), e.insertBefore(i, e.firstChild)),
        (t.state.loading |= 4));
    }
  }
  var fi = {
    $$typeof: Q,
    Provider: null,
    Consumer: null,
    _currentValue: ie,
    _currentValue2: ie,
    _threadCount: 0,
  };
  function R0(e, t, l, n, i, s, f, p, x) {
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
      (this.expirationTimes = vs(-1)),
      (this.entangledLanes =
        this.shellSuspendCounter =
        this.errorRecoveryDisabledLanes =
        this.expiredLanes =
        this.warmLanes =
        this.pingedLanes =
        this.suspendedLanes =
        this.pendingLanes =
          0),
      (this.entanglements = vs(0)),
      (this.hiddenUpdates = vs(null)),
      (this.identifierPrefix = n),
      (this.onUncaughtError = i),
      (this.onCaughtError = s),
      (this.onRecoverableError = f),
      (this.pooledCache = null),
      (this.pooledCacheLanes = 0),
      (this.formState = x),
      (this.incompleteTransitions = new Map()));
  }
  function yh(e, t, l, n, i, s, f, p, x, j, H, V) {
    return (
      (e = new R0(e, t, l, f, x, j, H, V, p)),
      (t = 1),
      s === !0 && (t |= 24),
      (s = Ct(3, null, null, t)),
      (e.current = s),
      (s.stateNode = e),
      (t = lc()),
      t.refCount++,
      (e.pooledCache = t),
      t.refCount++,
      (s.memoizedState = { element: n, isDehydrated: l, cache: t }),
      uc(s),
      e
    );
  }
  function gh(e) {
    return e ? ((e = Xn), e) : Xn;
  }
  function vh(e, t, l, n, i, s) {
    ((i = gh(i)),
      n.context === null ? (n.context = i) : (n.pendingContext = i),
      (n = Hl(t)),
      (n.payload = { element: l }),
      (s = s === void 0 ? null : s),
      s !== null && (n.callback = s),
      (l = Gl(e, n, t)),
      l !== null && (xt(l, e, t), Xa(l, e, t)));
  }
  function _h(e, t) {
    if (((e = e.memoizedState), e !== null && e.dehydrated !== null)) {
      var l = e.retryLane;
      e.retryLane = l !== 0 && l < t ? l : t;
    }
  }
  function No(e, t) {
    (_h(e, t), (e = e.alternate) && _h(e, t));
  }
  function bh(e) {
    if (e.tag === 13 || e.tag === 31) {
      var t = mn(e, 67108864);
      (t !== null && xt(t, e, 67108864), No(e, 67108864));
    }
  }
  function Sh(e) {
    if (e.tag === 13 || e.tag === 31) {
      var t = Ot();
      t = _s(t);
      var l = mn(e, t);
      (l !== null && xt(l, e, t), No(e, t));
    }
  }
  var Gu = !0;
  function k0(e, t, l, n) {
    var i = L.T;
    L.T = null;
    var s = J.p;
    try {
      ((J.p = 2), Ao(e, t, l, n));
    } finally {
      ((J.p = s), (L.T = i));
    }
  }
  function j0(e, t, l, n) {
    var i = L.T;
    L.T = null;
    var s = J.p;
    try {
      ((J.p = 8), Ao(e, t, l, n));
    } finally {
      ((J.p = s), (L.T = i));
    }
  }
  function Ao(e, t, l, n) {
    if (Gu) {
      var i = Co(n);
      if (i === null) (fo(e, t, n, Yu, l), Eh(e, n));
      else if (z0(i, e, t, l, n)) n.stopPropagation();
      else if ((Eh(e, n), t & 4 && -1 < O0.indexOf(e))) {
        for (; i !== null; ) {
          var s = On(i);
          if (s !== null)
            switch (s.tag) {
              case 3:
                if (((s = s.stateNode), s.current.memoizedState.isDehydrated)) {
                  var f = cn(s.pendingLanes);
                  if (f !== 0) {
                    var p = s;
                    for (p.pendingLanes |= 2, p.entangledLanes |= 2; f; ) {
                      var x = 1 << (31 - Nt(f));
                      ((p.entanglements[1] |= x), (f &= ~x));
                    }
                    (nl(s), (Ce & 6) === 0 && ((Tu = Et() + 500), ii(0)));
                  }
                }
                break;
              case 31:
              case 13:
                ((p = mn(s, 2)), p !== null && xt(p, s, 2), Au(), No(s, 2));
            }
          if (((s = Co(n)), s === null && fo(e, t, n, Yu, l), s === i)) break;
          i = s;
        }
        i !== null && n.stopPropagation();
      } else fo(e, t, n, null, l);
    }
  }
  function Co(e) {
    return ((e = Ms(e)), Mo(e));
  }
  var Yu = null;
  function Mo(e) {
    if (((Yu = null), (e = jn(e)), e !== null)) {
      var t = d(e);
      if (t === null) e = null;
      else {
        var l = t.tag;
        if (l === 13) {
          if (((e = h(t)), e !== null)) return e;
          e = null;
        } else if (l === 31) {
          if (((e = _(t)), e !== null)) return e;
          e = null;
        } else if (l === 3) {
          if (t.stateNode.current.memoizedState.isDehydrated)
            return t.tag === 3 ? t.stateNode.containerInfo : null;
          e = null;
        } else t !== e && (e = null);
      }
    }
    return ((Yu = e), null);
  }
  function xh(e) {
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
        switch (gy()) {
          case Rr:
            return 2;
          case kr:
            return 8;
          case ji:
          case vy:
            return 32;
          case jr:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var Ro = !1,
    Fl = null,
    Pl = null,
    en = null,
    di = new Map(),
    mi = new Map(),
    tn = [],
    O0 =
      'mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset'.split(
        ' '
      );
  function Eh(e, t) {
    switch (e) {
      case 'focusin':
      case 'focusout':
        Fl = null;
        break;
      case 'dragenter':
      case 'dragleave':
        Pl = null;
        break;
      case 'mouseover':
      case 'mouseout':
        en = null;
        break;
      case 'pointerover':
      case 'pointerout':
        di.delete(t.pointerId);
        break;
      case 'gotpointercapture':
      case 'lostpointercapture':
        mi.delete(t.pointerId);
    }
  }
  function hi(e, t, l, n, i, s) {
    return e === null || e.nativeEvent !== s
      ? ((e = {
          blockedOn: t,
          domEventName: l,
          eventSystemFlags: n,
          nativeEvent: s,
          targetContainers: [i],
        }),
        t !== null && ((t = On(t)), t !== null && bh(t)),
        e)
      : ((e.eventSystemFlags |= n),
        (t = e.targetContainers),
        i !== null && t.indexOf(i) === -1 && t.push(i),
        e);
  }
  function z0(e, t, l, n, i) {
    switch (t) {
      case 'focusin':
        return ((Fl = hi(Fl, e, t, l, n, i)), !0);
      case 'dragenter':
        return ((Pl = hi(Pl, e, t, l, n, i)), !0);
      case 'mouseover':
        return ((en = hi(en, e, t, l, n, i)), !0);
      case 'pointerover':
        var s = i.pointerId;
        return (di.set(s, hi(di.get(s) || null, e, t, l, n, i)), !0);
      case 'gotpointercapture':
        return ((s = i.pointerId), mi.set(s, hi(mi.get(s) || null, e, t, l, n, i)), !0);
    }
    return !1;
  }
  function Th(e) {
    var t = jn(e.target);
    if (t !== null) {
      var l = d(t);
      if (l !== null) {
        if (((t = l.tag), t === 13)) {
          if (((t = h(l)), t !== null)) {
            ((e.blockedOn = t),
              Ur(e.priority, function () {
                Sh(l);
              }));
            return;
          }
        } else if (t === 31) {
          if (((t = _(l)), t !== null)) {
            ((e.blockedOn = t),
              Ur(e.priority, function () {
                Sh(l);
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
  function Xu(e) {
    if (e.blockedOn !== null) return !1;
    for (var t = e.targetContainers; 0 < t.length; ) {
      var l = Co(e.nativeEvent);
      if (l === null) {
        l = e.nativeEvent;
        var n = new l.constructor(l.type, l);
        ((Cs = n), l.target.dispatchEvent(n), (Cs = null));
      } else return ((t = On(l)), t !== null && bh(t), (e.blockedOn = l), !1);
      t.shift();
    }
    return !0;
  }
  function Nh(e, t, l) {
    Xu(e) && l.delete(t);
  }
  function D0() {
    ((Ro = !1),
      Fl !== null && Xu(Fl) && (Fl = null),
      Pl !== null && Xu(Pl) && (Pl = null),
      en !== null && Xu(en) && (en = null),
      di.forEach(Nh),
      mi.forEach(Nh));
  }
  function Vu(e, t) {
    e.blockedOn === t &&
      ((e.blockedOn = null),
      Ro || ((Ro = !0), a.unstable_scheduleCallback(a.unstable_NormalPriority, D0)));
  }
  var Qu = null;
  function Ah(e) {
    Qu !== e &&
      ((Qu = e),
      a.unstable_scheduleCallback(a.unstable_NormalPriority, function () {
        Qu === e && (Qu = null);
        for (var t = 0; t < e.length; t += 3) {
          var l = e[t],
            n = e[t + 1],
            i = e[t + 2];
          if (typeof n != 'function') {
            if (Mo(n || l) === null) continue;
            break;
          }
          var s = On(l);
          s !== null &&
            (e.splice(t, 3),
            (t -= 3),
            Ac(s, { pending: !0, data: i, method: l.method, action: n }, n, i));
        }
      }));
  }
  function ma(e) {
    function t(x) {
      return Vu(x, e);
    }
    (Fl !== null && Vu(Fl, e),
      Pl !== null && Vu(Pl, e),
      en !== null && Vu(en, e),
      di.forEach(t),
      mi.forEach(t));
    for (var l = 0; l < tn.length; l++) {
      var n = tn[l];
      n.blockedOn === e && (n.blockedOn = null);
    }
    for (; 0 < tn.length && ((l = tn[0]), l.blockedOn === null); )
      (Th(l), l.blockedOn === null && tn.shift());
    if (((l = (e.ownerDocument || e).$$reactFormReplay), l != null))
      for (n = 0; n < l.length; n += 3) {
        var i = l[n],
          s = l[n + 1],
          f = i[yt] || null;
        if (typeof s == 'function') f || Ah(l);
        else if (f) {
          var p = null;
          if (s && s.hasAttribute('formAction')) {
            if (((i = s), (f = s[yt] || null))) p = f.formAction;
            else if (Mo(i) !== null) continue;
          } else p = f.action;
          (typeof p == 'function' ? (l[n + 1] = p) : (l.splice(n, 3), (n -= 3)), Ah(l));
        }
      }
  }
  function Ch() {
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
  function ko(e) {
    this._internalRoot = e;
  }
  ((Zu.prototype.render = ko.prototype.render =
    function (e) {
      var t = this._internalRoot;
      if (t === null) throw Error(c(409));
      var l = t.current,
        n = Ot();
      vh(l, n, e, t, null, null);
    }),
    (Zu.prototype.unmount = ko.prototype.unmount =
      function () {
        var e = this._internalRoot;
        if (e !== null) {
          this._internalRoot = null;
          var t = e.containerInfo;
          (vh(e.current, 2, null, e, null, null), Au(), (t[kn] = null));
        }
      }));
  function Zu(e) {
    this._internalRoot = e;
  }
  Zu.prototype.unstable_scheduleHydration = function (e) {
    if (e) {
      var t = Br();
      e = { blockedOn: null, target: e, priority: t };
      for (var l = 0; l < tn.length && t !== 0 && t < tn[l].priority; l++);
      (tn.splice(l, 0, e), l === 0 && Th(e));
    }
  };
  var Mh = u.version;
  if (Mh !== '19.2.5') throw Error(c(527, Mh, '19.2.5'));
  J.findDOMNode = function (e) {
    var t = e._reactInternals;
    if (t === void 0)
      throw typeof e.render == 'function'
        ? Error(c(188))
        : ((e = Object.keys(e).join(',')), Error(c(268, e)));
    return ((e = m(t)), (e = e !== null ? v(e) : null), (e = e === null ? null : e.stateNode), e);
  };
  var w0 = {
    bundleType: 0,
    version: '19.2.5',
    rendererPackageName: 'react-dom',
    currentDispatcherRef: L,
    reconcilerVersion: '19.2.5',
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < 'u') {
    var $u = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!$u.isDisabled && $u.supportsFiber)
      try {
        ((Ea = $u.inject(w0)), (Tt = $u));
      } catch {}
  }
  return (
    (yi.createRoot = function (e, t) {
      if (!r(e)) throw Error(c(299));
      var l = !1,
        n = '',
        i = wd,
        s = Bd,
        f = Ud;
      return (
        t != null &&
          (t.unstable_strictMode === !0 && (l = !0),
          t.identifierPrefix !== void 0 && (n = t.identifierPrefix),
          t.onUncaughtError !== void 0 && (i = t.onUncaughtError),
          t.onCaughtError !== void 0 && (s = t.onCaughtError),
          t.onRecoverableError !== void 0 && (f = t.onRecoverableError)),
        (t = yh(e, 1, !1, null, null, l, n, null, i, s, f, Ch)),
        (e[kn] = t.current),
        ro(e),
        new ko(t)
      );
    }),
    (yi.hydrateRoot = function (e, t, l) {
      if (!r(e)) throw Error(c(299));
      var n = !1,
        i = '',
        s = wd,
        f = Bd,
        p = Ud,
        x = null;
      return (
        l != null &&
          (l.unstable_strictMode === !0 && (n = !0),
          l.identifierPrefix !== void 0 && (i = l.identifierPrefix),
          l.onUncaughtError !== void 0 && (s = l.onUncaughtError),
          l.onCaughtError !== void 0 && (f = l.onCaughtError),
          l.onRecoverableError !== void 0 && (p = l.onRecoverableError),
          l.formState !== void 0 && (x = l.formState)),
        (t = yh(e, 1, !0, t, l ?? null, n, i, x, s, f, p, Ch)),
        (t.context = gh(null)),
        (l = t.current),
        (n = Ot()),
        (n = _s(n)),
        (i = Hl(n)),
        (i.callback = null),
        Gl(l, i, n),
        (l = n),
        (t.current.lanes = l),
        Na(t, l),
        nl(t),
        (e[kn] = t.current),
        ro(e),
        new Zu(t)
      );
    }),
    (yi.version = '19.2.5'),
    yi
  );
}
var qh;
function $0() {
  if (qh) return zo.exports;
  qh = 1;
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
  return (a(), (zo.exports = Z0()), zo.exports);
}
var K0 = $0(),
  A = or();
/**
 * react-router v7.14.2
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */ var Lh = 'popstate';
function Hh(a) {
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
function J0(a = {}) {
  function u(c, r) {
    var m;
    let d = (m = r.state) == null ? void 0 : m.masked,
      { pathname: h, search: _, hash: g } = d || c.location;
    return Wo(
      '',
      { pathname: h, search: _, hash: g },
      (r.state && r.state.usr) || null,
      (r.state && r.state.key) || 'default',
      d
        ? { pathname: c.location.pathname, search: c.location.search, hash: c.location.hash }
        : void 0
    );
  }
  function o(c, r) {
    return typeof r == 'string' ? r : Ti(r);
  }
  return W0(u, o, null, a);
}
function Xe(a, u) {
  if (a === !1 || a === null || typeof a > 'u') throw new Error(u);
}
function Ft(a, u) {
  if (!a) {
    typeof console < 'u' && console.warn(u);
    try {
      throw new Error(u);
    } catch {}
  }
}
function I0() {
  return Math.random().toString(36).substring(2, 10);
}
function Gh(a, u) {
  return {
    usr: a.state,
    key: a.key,
    idx: u,
    masked: a.unstable_mask ? { pathname: a.pathname, search: a.search, hash: a.hash } : void 0,
  };
}
function Wo(a, u, o = null, c, r) {
  return {
    pathname: typeof a == 'string' ? a : a.pathname,
    search: '',
    hash: '',
    ...(typeof u == 'string' ? _a(u) : u),
    state: o,
    key: (u && u.key) || c || I0(),
    unstable_mask: r,
  };
}
function Ti({ pathname: a = '/', search: u = '', hash: o = '' }) {
  return (
    u && u !== '?' && (a += u.charAt(0) === '?' ? u : '?' + u),
    o && o !== '#' && (a += o.charAt(0) === '#' ? o : '#' + o),
    a
  );
}
function _a(a) {
  let u = {};
  if (a) {
    let o = a.indexOf('#');
    o >= 0 && ((u.hash = a.substring(o)), (a = a.substring(0, o)));
    let c = a.indexOf('?');
    (c >= 0 && ((u.search = a.substring(c)), (a = a.substring(0, c))), a && (u.pathname = a));
  }
  return u;
}
function W0(a, u, o, c = {}) {
  let { window: r = document.defaultView, v5Compat: d = !1 } = c,
    h = r.history,
    _ = 'POP',
    g = null,
    m = v();
  m == null && ((m = 0), h.replaceState({ ...h.state, idx: m }, ''));
  function v() {
    return (h.state || { idx: null }).idx;
  }
  function S() {
    _ = 'POP';
    let T = v(),
      q = T == null ? null : T - m;
    ((m = T), g && g({ action: _, location: R.location, delta: q }));
  }
  function O(T, q) {
    _ = 'PUSH';
    let $ = Hh(T) ? T : Wo(R.location, T, q);
    m = v() + 1;
    let Q = Gh($, m),
      D = R.createHref($.unstable_mask || $);
    try {
      h.pushState(Q, '', D);
    } catch (U) {
      if (U instanceof DOMException && U.name === 'DataCloneError') throw U;
      r.location.assign(D);
    }
    d && g && g({ action: _, location: R.location, delta: 1 });
  }
  function C(T, q) {
    _ = 'REPLACE';
    let $ = Hh(T) ? T : Wo(R.location, T, q);
    m = v();
    let Q = Gh($, m),
      D = R.createHref($.unstable_mask || $);
    (h.replaceState(Q, '', D), d && g && g({ action: _, location: R.location, delta: 0 }));
  }
  function b(T) {
    return F0(T);
  }
  let R = {
    get action() {
      return _;
    },
    get location() {
      return a(r, h);
    },
    listen(T) {
      if (g) throw new Error('A history only accepts one active listener');
      return (
        r.addEventListener(Lh, S),
        (g = T),
        () => {
          (r.removeEventListener(Lh, S), (g = null));
        }
      );
    },
    createHref(T) {
      return u(r, T);
    },
    createURL: b,
    encodeLocation(T) {
      let q = b(T);
      return { pathname: q.pathname, search: q.search, hash: q.hash };
    },
    push: O,
    replace: C,
    go(T) {
      return h.go(T);
    },
  };
  return R;
}
function F0(a, u = !1) {
  let o = 'http://localhost';
  (typeof window < 'u' &&
    (o = window.location.origin !== 'null' ? window.location.origin : window.location.href),
    Xe(o, 'No window.location.(origin|href) available to create URL'));
  let c = typeof a == 'string' ? a : Ti(a);
  return ((c = c.replace(/ $/, '%20')), !u && c.startsWith('//') && (c = o + c), new URL(c, o));
}
function hp(a, u, o = '/') {
  return P0(a, u, o, !1);
}
function P0(a, u, o, c) {
  let r = typeof u == 'string' ? _a(u) : u,
    d = Rl(r.pathname || '/', o);
  if (d == null) return null;
  let h = pp(a);
  ev(h);
  let _ = null;
  for (let g = 0; _ == null && g < h.length; ++g) {
    let m = fv(d);
    _ = ov(h[g], m, c);
  }
  return _;
}
function pp(a, u = [], o = [], c = '', r = !1) {
  let d = (h, _, g = r, m) => {
    let v = {
      relativePath: m === void 0 ? h.path || '' : m,
      caseSensitive: h.caseSensitive === !0,
      childrenIndex: _,
      route: h,
    };
    if (v.relativePath.startsWith('/')) {
      if (!v.relativePath.startsWith(c) && g) return;
      (Xe(
        v.relativePath.startsWith(c),
        `Absolute route path "${v.relativePath}" nested under path "${c}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`
      ),
        (v.relativePath = v.relativePath.slice(c.length)));
    }
    let S = Wt([c, v.relativePath]),
      O = o.concat(v);
    (h.children &&
      h.children.length > 0 &&
      (Xe(
        h.index !== !0,
        `Index routes must not have child routes. Please remove all child routes from route path "${S}".`
      ),
      pp(h.children, u, O, S, g)),
      !(h.path == null && !h.index) && u.push({ path: S, score: sv(S, h.index), routesMeta: O }));
  };
  return (
    a.forEach((h, _) => {
      var g;
      if (h.path === '' || !((g = h.path) != null && g.includes('?'))) d(h, _);
      else for (let m of yp(h.path)) d(h, _, !0, m);
    }),
    u
  );
}
function yp(a) {
  let u = a.split('/');
  if (u.length === 0) return [];
  let [o, ...c] = u,
    r = o.endsWith('?'),
    d = o.replace(/\?$/, '');
  if (c.length === 0) return r ? [d, ''] : [d];
  let h = yp(c.join('/')),
    _ = [];
  return (
    _.push(...h.map((g) => (g === '' ? d : [d, g].join('/')))),
    r && _.push(...h),
    _.map((g) => (a.startsWith('/') && g === '' ? '/' : g))
  );
}
function ev(a) {
  a.sort((u, o) =>
    u.score !== o.score
      ? o.score - u.score
      : cv(
          u.routesMeta.map((c) => c.childrenIndex),
          o.routesMeta.map((c) => c.childrenIndex)
        )
  );
}
var tv = /^:[\w-]+$/,
  lv = 3,
  nv = 2,
  av = 1,
  iv = 10,
  uv = -2,
  Yh = (a) => a === '*';
function sv(a, u) {
  let o = a.split('/'),
    c = o.length;
  return (
    o.some(Yh) && (c += uv),
    u && (c += nv),
    o.filter((r) => !Yh(r)).reduce((r, d) => r + (tv.test(d) ? lv : d === '' ? av : iv), c)
  );
}
function cv(a, u) {
  return a.length === u.length && a.slice(0, -1).every((c, r) => c === u[r])
    ? a[a.length - 1] - u[u.length - 1]
    : 0;
}
function ov(a, u, o = !1) {
  let { routesMeta: c } = a,
    r = {},
    d = '/',
    h = [];
  for (let _ = 0; _ < c.length; ++_) {
    let g = c[_],
      m = _ === c.length - 1,
      v = d === '/' ? u : u.slice(d.length) || '/',
      S = es({ path: g.relativePath, caseSensitive: g.caseSensitive, end: m }, v),
      O = g.route;
    if (
      (!S &&
        m &&
        o &&
        !c[c.length - 1].route.index &&
        (S = es({ path: g.relativePath, caseSensitive: g.caseSensitive, end: !1 }, v)),
      !S)
    )
      return null;
    (Object.assign(r, S.params),
      h.push({
        params: r,
        pathname: Wt([d, S.pathname]),
        pathnameBase: pv(Wt([d, S.pathnameBase])),
        route: O,
      }),
      S.pathnameBase !== '/' && (d = Wt([d, S.pathnameBase])));
  }
  return h;
}
function es(a, u) {
  typeof a == 'string' && (a = { path: a, caseSensitive: !1, end: !0 });
  let [o, c] = rv(a.path, a.caseSensitive, a.end),
    r = u.match(o);
  if (!r) return null;
  let d = r[0],
    h = d.replace(/(.)\/+$/, '$1'),
    _ = r.slice(1);
  return {
    params: c.reduce((m, { paramName: v, isOptional: S }, O) => {
      if (v === '*') {
        let b = _[O] || '';
        h = d.slice(0, d.length - b.length).replace(/(.)\/+$/, '$1');
      }
      const C = _[O];
      return (S && !C ? (m[v] = void 0) : (m[v] = (C || '').replace(/%2F/g, '/')), m);
    }, {}),
    pathname: d,
    pathnameBase: h,
    pattern: a,
  };
}
function rv(a, u = !1, o = !0) {
  Ft(
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
        .replace(/\/:([\w-]+)(\?)?/g, (h, _, g, m, v) => {
          if ((c.push({ paramName: _, isOptional: g != null }), g)) {
            let S = v.charAt(m + h.length);
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
function fv(a) {
  try {
    return a
      .split('/')
      .map((u) => decodeURIComponent(u).replace(/\//g, '%2F'))
      .join('/');
  } catch (u) {
    return (
      Ft(
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
var dv = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;
function mv(a, u = '/') {
  let { pathname: o, search: c = '', hash: r = '' } = typeof a == 'string' ? _a(a) : a,
    d;
  return (
    o ? ((o = gp(o)), o.startsWith('/') ? (d = Xh(o.substring(1), '/')) : (d = Xh(o, u))) : (d = u),
    { pathname: d, search: yv(c), hash: gv(r) }
  );
}
function Xh(a, u) {
  let o = ts(u).split('/');
  return (
    a.split('/').forEach((r) => {
      r === '..' ? o.length > 1 && o.pop() : r !== '.' && o.push(r);
    }),
    o.length > 1 ? o.join('/') : '/'
  );
}
function qo(a, u, o, c) {
  return `Cannot include a '${a}' character in a manually specified \`to.${u}\` field [${JSON.stringify(c)}].  Please separate it out to the \`to.${o}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`;
}
function hv(a) {
  return a.filter((u, o) => o === 0 || (u.route.path && u.route.path.length > 0));
}
function rr(a) {
  let u = hv(a);
  return u.map((o, c) => (c === u.length - 1 ? o.pathname : o.pathnameBase));
}
function us(a, u, o, c = !1) {
  let r;
  typeof a == 'string'
    ? (r = _a(a))
    : ((r = { ...a }),
      Xe(!r.pathname || !r.pathname.includes('?'), qo('?', 'pathname', 'search', r)),
      Xe(!r.pathname || !r.pathname.includes('#'), qo('#', 'pathname', 'hash', r)),
      Xe(!r.search || !r.search.includes('#'), qo('#', 'search', 'hash', r)));
  let d = a === '' || r.pathname === '',
    h = d ? '/' : r.pathname,
    _;
  if (h == null) _ = o;
  else {
    let S = u.length - 1;
    if (!c && h.startsWith('..')) {
      let O = h.split('/');
      for (; O[0] === '..'; ) (O.shift(), (S -= 1));
      r.pathname = O.join('/');
    }
    _ = S >= 0 ? u[S] : '/';
  }
  let g = mv(r, _),
    m = h && h !== '/' && h.endsWith('/'),
    v = (d || h === '.') && o.endsWith('/');
  return (!g.pathname.endsWith('/') && (m || v) && (g.pathname += '/'), g);
}
var gp = (a) => a.replace(/\/\/+/g, '/'),
  Wt = (a) => gp(a.join('/')),
  ts = (a) => a.replace(/\/+$/, ''),
  pv = (a) => ts(a).replace(/^\/*/, '/'),
  yv = (a) => (!a || a === '?' ? '' : a.startsWith('?') ? a : '?' + a),
  gv = (a) => (!a || a === '#' ? '' : a.startsWith('#') ? a : '#' + a),
  vv = class {
    constructor(a, u, o, c = !1) {
      ((this.status = a),
        (this.statusText = u || ''),
        (this.internal = c),
        o instanceof Error ? ((this.data = o.toString()), (this.error = o)) : (this.data = o));
    }
  };
function _v(a) {
  return (
    a != null &&
    typeof a.status == 'number' &&
    typeof a.statusText == 'string' &&
    typeof a.internal == 'boolean' &&
    'data' in a
  );
}
function bv(a) {
  let u = a.map((o) => o.route.path).filter(Boolean);
  return Wt(u) || '/';
}
var vp =
  typeof window < 'u' && typeof window.document < 'u' && typeof window.document.createElement < 'u';
function _p(a, u) {
  let o = a;
  if (typeof o != 'string' || !dv.test(o)) return { absoluteURL: void 0, isExternal: !1, to: o };
  let c = o,
    r = !1;
  if (vp)
    try {
      let d = new URL(window.location.href),
        h = o.startsWith('//') ? new URL(d.protocol + o) : new URL(o),
        _ = Rl(h.pathname, u);
      h.origin === d.origin && _ != null ? (o = _ + h.search + h.hash) : (r = !0);
    } catch {
      Ft(
        !1,
        `<Link to="${o}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`
      );
    }
  return { absoluteURL: c, isExternal: r, to: o };
}
Object.getOwnPropertyNames(Object.prototype).sort().join('\0');
var bp = ['POST', 'PUT', 'PATCH', 'DELETE'];
new Set(bp);
var Sv = ['GET', ...bp];
new Set(Sv);
var ba = A.createContext(null);
ba.displayName = 'DataRouter';
var ss = A.createContext(null);
ss.displayName = 'DataRouterState';
var Sp = A.createContext(!1);
function xv() {
  return A.useContext(Sp);
}
var xp = A.createContext({ isTransitioning: !1 });
xp.displayName = 'ViewTransition';
var Ev = A.createContext(new Map());
Ev.displayName = 'Fetchers';
var Tv = A.createContext(null);
Tv.displayName = 'Await';
var wt = A.createContext(null);
wt.displayName = 'Navigation';
var Mi = A.createContext(null);
Mi.displayName = 'Location';
var Pt = A.createContext({ outlet: null, matches: [], isDataRoute: !1 });
Pt.displayName = 'Route';
var fr = A.createContext(null);
fr.displayName = 'RouteError';
var Ep = 'REACT_ROUTER_ERROR',
  Nv = 'REDIRECT',
  Av = 'ROUTE_ERROR_RESPONSE';
function Cv(a) {
  if (a.startsWith(`${Ep}:${Nv}:{`))
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
function Mv(a) {
  if (a.startsWith(`${Ep}:${Av}:{`))
    try {
      let u = JSON.parse(a.slice(40));
      if (
        typeof u == 'object' &&
        u &&
        typeof u.status == 'number' &&
        typeof u.statusText == 'string'
      )
        return new vv(u.status, u.statusText, u.data);
    } catch {}
}
function Rv(a, { relative: u } = {}) {
  Xe(Sa(), 'useHref() may be used only in the context of a <Router> component.');
  let { basename: o, navigator: c } = A.useContext(wt),
    { hash: r, pathname: d, search: h } = Ri(a, { relative: u }),
    _ = d;
  return (
    o !== '/' && (_ = d === '/' ? o : Wt([o, d])),
    c.createHref({ pathname: _, search: h, hash: r })
  );
}
function Sa() {
  return A.useContext(Mi) != null;
}
function il() {
  return (
    Xe(Sa(), 'useLocation() may be used only in the context of a <Router> component.'),
    A.useContext(Mi).location
  );
}
var Tp =
  'You should call navigate() in a React.useEffect(), not when your component is first rendered.';
function Np(a) {
  A.useContext(wt).static || A.useLayoutEffect(a);
}
function jl() {
  let { isDataRoute: a } = A.useContext(Pt);
  return a ? Xv() : kv();
}
function kv() {
  Xe(Sa(), 'useNavigate() may be used only in the context of a <Router> component.');
  let a = A.useContext(ba),
    { basename: u, navigator: o } = A.useContext(wt),
    { matches: c } = A.useContext(Pt),
    { pathname: r } = il(),
    d = JSON.stringify(rr(c)),
    h = A.useRef(!1);
  return (
    Np(() => {
      h.current = !0;
    }),
    A.useCallback(
      (g, m = {}) => {
        if ((Ft(h.current, Tp), !h.current)) return;
        if (typeof g == 'number') {
          o.go(g);
          return;
        }
        let v = us(g, JSON.parse(d), r, m.relative === 'path');
        (a == null && u !== '/' && (v.pathname = v.pathname === '/' ? u : Wt([u, v.pathname])),
          (m.replace ? o.replace : o.push)(v, m.state, m));
      },
      [u, o, d, r, a]
    )
  );
}
A.createContext(null);
function jv() {
  let { matches: a } = A.useContext(Pt),
    u = a[a.length - 1];
  return (u == null ? void 0 : u.params) ?? {};
}
function Ri(a, { relative: u } = {}) {
  let { matches: o } = A.useContext(Pt),
    { pathname: c } = il(),
    r = JSON.stringify(rr(o));
  return A.useMemo(() => us(a, JSON.parse(r), c, u === 'path'), [a, r, c, u]);
}
function Ov(a, u) {
  return Ap(a, u);
}
function Ap(a, u, o) {
  var T;
  Xe(Sa(), 'useRoutes() may be used only in the context of a <Router> component.');
  let { navigator: c } = A.useContext(wt),
    { matches: r } = A.useContext(Pt),
    d = r[r.length - 1],
    h = d ? d.params : {},
    _ = d ? d.pathname : '/',
    g = d ? d.pathnameBase : '/',
    m = d && d.route;
  {
    let q = (m && m.path) || '';
    Mp(
      _,
      !m || q.endsWith('*') || q.endsWith('*?'),
      `You rendered descendant <Routes> (or called \`useRoutes()\`) at "${_}" (under <Route path="${q}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${q}"> to <Route path="${q === '/' ? '*' : `${q}/*`}">.`
    );
  }
  let v = il(),
    S;
  if (u) {
    let q = typeof u == 'string' ? _a(u) : u;
    (Xe(
      g === '/' || ((T = q.pathname) == null ? void 0 : T.startsWith(g)),
      `When overriding the location using \`<Routes location>\` or \`useRoutes(routes, location)\`, the location pathname must begin with the portion of the URL pathname that was matched by all parent routes. The current pathname base is "${g}" but pathname "${q.pathname}" was given in the \`location\` prop.`
    ),
      (S = q));
  } else S = v;
  let O = S.pathname || '/',
    C = O;
  if (g !== '/') {
    let q = g.replace(/^\//, '').split('/');
    C = '/' + O.replace(/^\//, '').split('/').slice(q.length).join('/');
  }
  let b = hp(a, { pathname: C });
  (Ft(m || b != null, `No routes matched location "${S.pathname}${S.search}${S.hash}" `),
    Ft(
      b == null ||
        b[b.length - 1].route.element !== void 0 ||
        b[b.length - 1].route.Component !== void 0 ||
        b[b.length - 1].route.lazy !== void 0,
      `Matched leaf route at location "${S.pathname}${S.search}${S.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`
    ));
  let R = Uv(
    b &&
      b.map((q) =>
        Object.assign({}, q, {
          params: Object.assign({}, h, q.params),
          pathname: Wt([
            g,
            c.encodeLocation
              ? c.encodeLocation(
                  q.pathname.replace(/%/g, '%25').replace(/\?/g, '%3F').replace(/#/g, '%23')
                ).pathname
              : q.pathname,
          ]),
          pathnameBase:
            q.pathnameBase === '/'
              ? g
              : Wt([
                  g,
                  c.encodeLocation
                    ? c.encodeLocation(
                        q.pathnameBase
                          .replace(/%/g, '%25')
                          .replace(/\?/g, '%3F')
                          .replace(/#/g, '%23')
                      ).pathname
                    : q.pathnameBase,
                ]),
        })
      ),
    r,
    o
  );
  return u && R
    ? A.createElement(
        Mi.Provider,
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
        R
      )
    : R;
}
function zv() {
  let a = Yv(),
    u = _v(a) ? `${a.status} ${a.statusText}` : a instanceof Error ? a.message : JSON.stringify(a),
    o = a instanceof Error ? a.stack : null,
    c = 'rgba(200,200,200, 0.5)',
    r = { padding: '0.5rem', backgroundColor: c },
    d = { padding: '2px 4px', backgroundColor: c },
    h = null;
  return (
    console.error('Error handled by React Router default ErrorBoundary:', a),
    (h = A.createElement(
      A.Fragment,
      null,
      A.createElement('p', null, '💿 Hey developer 👋'),
      A.createElement(
        'p',
        null,
        'You can provide a way better UX than this when your app throws errors by providing your own ',
        A.createElement('code', { style: d }, 'ErrorBoundary'),
        ' or',
        ' ',
        A.createElement('code', { style: d }, 'errorElement'),
        ' prop on your route.'
      )
    )),
    A.createElement(
      A.Fragment,
      null,
      A.createElement('h2', null, 'Unexpected Application Error!'),
      A.createElement('h3', { style: { fontStyle: 'italic' } }, u),
      o ? A.createElement('pre', { style: r }, o) : null,
      h
    )
  );
}
var Dv = A.createElement(zv, null),
  Cp = class extends A.Component {
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
        const o = Mv(a.digest);
        o && (a = o);
      }
      let u =
        a !== void 0
          ? A.createElement(
              Pt.Provider,
              { value: this.props.routeContext },
              A.createElement(fr.Provider, { value: a, children: this.props.component })
            )
          : this.props.children;
      return this.context ? A.createElement(wv, { error: a }, u) : u;
    }
  };
Cp.contextType = Sp;
var Lo = new WeakMap();
function wv({ children: a, error: u }) {
  let { basename: o } = A.useContext(wt);
  if (typeof u == 'object' && u && 'digest' in u && typeof u.digest == 'string') {
    let c = Cv(u.digest);
    if (c) {
      let r = Lo.get(u);
      if (r) throw r;
      let d = _p(c.location, o);
      if (vp && !Lo.get(u))
        if (d.isExternal || c.reloadDocument) window.location.href = d.absoluteURL || d.to;
        else {
          const h = Promise.resolve().then(() =>
            window.__reactRouterDataRouter.navigate(d.to, { replace: c.replace })
          );
          throw (Lo.set(u, h), h);
        }
      return A.createElement('meta', {
        httpEquiv: 'refresh',
        content: `0;url=${d.absoluteURL || d.to}`,
      });
    }
  }
  return a;
}
function Bv({ routeContext: a, match: u, children: o }) {
  let c = A.useContext(ba);
  return (
    c &&
      c.static &&
      c.staticContext &&
      (u.route.errorElement || u.route.ErrorBoundary) &&
      (c.staticContext._deepestRenderedBoundaryId = u.route.id),
    A.createElement(Pt.Provider, { value: a }, o)
  );
}
function Uv(a, u = [], o) {
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
    let v = r.findIndex((S) => S.route.id && (d == null ? void 0 : d[S.route.id]) !== void 0);
    (Xe(
      v >= 0,
      `Could not find a matching route for errors on route IDs: ${Object.keys(d).join(',')}`
    ),
      (r = r.slice(0, Math.min(r.length, v + 1))));
  }
  let h = !1,
    _ = -1;
  if (o && c) {
    h = c.renderFallback;
    for (let v = 0; v < r.length; v++) {
      let S = r[v];
      if (((S.route.HydrateFallback || S.route.hydrateFallbackElement) && (_ = v), S.route.id)) {
        let { loaderData: O, errors: C } = c,
          b = S.route.loader && !O.hasOwnProperty(S.route.id) && (!C || C[S.route.id] === void 0);
        if (S.route.lazy || b) {
          (o.isStatic && (h = !0), _ >= 0 ? (r = r.slice(0, _ + 1)) : (r = [r[0]]));
          break;
        }
      }
    }
  }
  let g = o == null ? void 0 : o.onError,
    m =
      c && g
        ? (v, S) => {
            var O, C;
            g(v, {
              location: c.location,
              params:
                ((C = (O = c.matches) == null ? void 0 : O[0]) == null ? void 0 : C.params) ?? {},
              unstable_pattern: bv(c.matches),
              errorInfo: S,
            });
          }
        : void 0;
  return r.reduceRight((v, S, O) => {
    let C,
      b = !1,
      R = null,
      T = null;
    c &&
      ((C = d && S.route.id ? d[S.route.id] : void 0),
      (R = S.route.errorElement || Dv),
      h &&
        (_ < 0 && O === 0
          ? (Mp(
              'route-fallback',
              !1,
              'No `HydrateFallback` element provided to render during initial hydration'
            ),
            (b = !0),
            (T = null))
          : _ === O && ((b = !0), (T = S.route.hydrateFallbackElement || null))));
    let q = u.concat(r.slice(0, O + 1)),
      $ = () => {
        let Q;
        return (
          C
            ? (Q = R)
            : b
              ? (Q = T)
              : S.route.Component
                ? (Q = A.createElement(S.route.Component, null))
                : S.route.element
                  ? (Q = S.route.element)
                  : (Q = v),
          A.createElement(Bv, {
            match: S,
            routeContext: { outlet: v, matches: q, isDataRoute: c != null },
            children: Q,
          })
        );
      };
    return c && (S.route.ErrorBoundary || S.route.errorElement || O === 0)
      ? A.createElement(Cp, {
          location: c.location,
          revalidation: c.revalidation,
          component: R,
          error: C,
          children: $(),
          routeContext: { outlet: null, matches: q, isDataRoute: !0 },
          onError: m,
        })
      : $();
  }, null);
}
function dr(a) {
  return `${a} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function qv(a) {
  let u = A.useContext(ba);
  return (Xe(u, dr(a)), u);
}
function Lv(a) {
  let u = A.useContext(ss);
  return (Xe(u, dr(a)), u);
}
function Hv(a) {
  let u = A.useContext(Pt);
  return (Xe(u, dr(a)), u);
}
function mr(a) {
  let u = Hv(a),
    o = u.matches[u.matches.length - 1];
  return (Xe(o.route.id, `${a} can only be used on routes that contain a unique "id"`), o.route.id);
}
function Gv() {
  return mr('useRouteId');
}
function Yv() {
  var c;
  let a = A.useContext(fr),
    u = Lv('useRouteError'),
    o = mr('useRouteError');
  return a !== void 0 ? a : (c = u.errors) == null ? void 0 : c[o];
}
function Xv() {
  let { router: a } = qv('useNavigate'),
    u = mr('useNavigate'),
    o = A.useRef(!1);
  return (
    Np(() => {
      o.current = !0;
    }),
    A.useCallback(
      async (r, d = {}) => {
        (Ft(o.current, Tp),
          o.current &&
            (typeof r == 'number'
              ? await a.navigate(r)
              : await a.navigate(r, { fromRouteId: u, ...d })));
      },
      [a, u]
    )
  );
}
var Vh = {};
function Mp(a, u, o) {
  !u && !Vh[a] && ((Vh[a] = !0), Ft(!1, o));
}
A.memo(Vv);
function Vv({ routes: a, future: u, state: o, isStatic: c, onError: r }) {
  return Ap(a, void 0, { state: o, isStatic: c, onError: r });
}
function kl({ to: a, replace: u, state: o, relative: c }) {
  Xe(Sa(), '<Navigate> may be used only in the context of a <Router> component.');
  let { static: r } = A.useContext(wt);
  Ft(
    !r,
    '<Navigate> must not be used on the initial render in a <StaticRouter>. This is a no-op, but you should modify your code so the <Navigate> is only ever rendered in response to some user interaction or state change.'
  );
  let { matches: d } = A.useContext(Pt),
    { pathname: h } = il(),
    _ = jl(),
    g = us(a, rr(d), h, c === 'path'),
    m = JSON.stringify(g);
  return (
    A.useEffect(() => {
      _(JSON.parse(m), { replace: u, state: o, relative: c });
    }, [_, m, c, u, o]),
    null
  );
}
function al(a) {
  Xe(
    !1,
    'A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>.'
  );
}
function Qv({
  basename: a = '/',
  children: u = null,
  location: o,
  navigationType: c = 'POP',
  navigator: r,
  static: d = !1,
  unstable_useTransitions: h,
}) {
  Xe(
    !Sa(),
    'You cannot render a <Router> inside another <Router>. You should never have more than one in your app.'
  );
  let _ = a.replace(/^\/*/, '/'),
    g = A.useMemo(
      () => ({ basename: _, navigator: r, static: d, unstable_useTransitions: h, future: {} }),
      [_, r, d, h]
    );
  typeof o == 'string' && (o = _a(o));
  let {
      pathname: m = '/',
      search: v = '',
      hash: S = '',
      state: O = null,
      key: C = 'default',
      unstable_mask: b,
    } = o,
    R = A.useMemo(() => {
      let T = Rl(m, _);
      return T == null
        ? null
        : {
            location: { pathname: T, search: v, hash: S, state: O, key: C, unstable_mask: b },
            navigationType: c,
          };
    }, [_, m, v, S, O, C, c, b]);
  return (
    Ft(
      R != null,
      `<Router basename="${_}"> is not able to match the URL "${m}${v}${S}" because it does not start with the basename, so the <Router> won't render anything.`
    ),
    R == null
      ? null
      : A.createElement(
          wt.Provider,
          { value: g },
          A.createElement(Mi.Provider, { children: u, value: R })
        )
  );
}
function Zv({ children: a, location: u }) {
  return Ov(Fo(a), u);
}
function Fo(a, u = []) {
  let o = [];
  return (
    A.Children.forEach(a, (c, r) => {
      if (!A.isValidElement(c)) return;
      let d = [...u, r];
      if (c.type === A.Fragment) {
        o.push.apply(o, Fo(c.props.children, d));
        return;
      }
      (Xe(
        c.type === al,
        `[${typeof c.type == 'string' ? c.type : c.type.name}] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>`
      ),
        Xe(!c.props.index || !c.props.children, 'An index route cannot have child routes.'));
      let h = {
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
      (c.props.children && (h.children = Fo(c.props.children, d)), o.push(h));
    }),
    o
  );
}
var Wu = 'get',
  Fu = 'application/x-www-form-urlencoded';
function cs(a) {
  return typeof HTMLElement < 'u' && a instanceof HTMLElement;
}
function $v(a) {
  return cs(a) && a.tagName.toLowerCase() === 'button';
}
function Kv(a) {
  return cs(a) && a.tagName.toLowerCase() === 'form';
}
function Jv(a) {
  return cs(a) && a.tagName.toLowerCase() === 'input';
}
function Iv(a) {
  return !!(a.metaKey || a.altKey || a.ctrlKey || a.shiftKey);
}
function Wv(a, u) {
  return a.button === 0 && (!u || u === '_self') && !Iv(a);
}
var Ku = null;
function Fv() {
  if (Ku === null)
    try {
      (new FormData(document.createElement('form'), 0), (Ku = !1));
    } catch {
      Ku = !0;
    }
  return Ku;
}
var Pv = new Set(['application/x-www-form-urlencoded', 'multipart/form-data', 'text/plain']);
function Ho(a) {
  return a != null && !Pv.has(a)
    ? (Ft(
        !1,
        `"${a}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${Fu}"`
      ),
      null)
    : a;
}
function e_(a, u) {
  let o, c, r, d, h;
  if (Kv(a)) {
    let _ = a.getAttribute('action');
    ((c = _ ? Rl(_, u) : null),
      (o = a.getAttribute('method') || Wu),
      (r = Ho(a.getAttribute('enctype')) || Fu),
      (d = new FormData(a)));
  } else if ($v(a) || (Jv(a) && (a.type === 'submit' || a.type === 'image'))) {
    let _ = a.form;
    if (_ == null)
      throw new Error('Cannot submit a <button> or <input type="submit"> without a <form>');
    let g = a.getAttribute('formaction') || _.getAttribute('action');
    if (
      ((c = g ? Rl(g, u) : null),
      (o = a.getAttribute('formmethod') || _.getAttribute('method') || Wu),
      (r = Ho(a.getAttribute('formenctype')) || Ho(_.getAttribute('enctype')) || Fu),
      (d = new FormData(_, a)),
      !Fv())
    ) {
      let { name: m, type: v, value: S } = a;
      if (v === 'image') {
        let O = m ? `${m}.` : '';
        (d.append(`${O}x`, '0'), d.append(`${O}y`, '0'));
      } else m && d.append(m, S);
    }
  } else {
    if (cs(a))
      throw new Error(
        'Cannot submit element that is not <form>, <button>, or <input type="submit|image">'
      );
    ((o = Wu), (c = null), (r = Fu), (h = a));
  }
  return (
    d && r === 'text/plain' && ((h = d), (d = void 0)),
    { action: c, method: o.toLowerCase(), encType: r, formData: d, body: h }
  );
}
Object.getOwnPropertyNames(Object.prototype).sort().join('\0');
function hr(a, u) {
  if (a === !1 || a === null || typeof a > 'u') throw new Error(u);
}
function Rp(a, u, o, c) {
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
          ? (r.pathname = `${ts(u)}/_root.${c}`)
          : (r.pathname = `${ts(r.pathname)}.${c}`),
    r
  );
}
async function t_(a, u) {
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
function l_(a) {
  return a == null
    ? !1
    : a.href == null
      ? a.rel === 'preload' && typeof a.imageSrcSet == 'string' && typeof a.imageSizes == 'string'
      : typeof a.rel == 'string' && typeof a.href == 'string';
}
async function n_(a, u, o) {
  let c = await Promise.all(
    a.map(async (r) => {
      let d = u.routes[r.route.id];
      if (d) {
        let h = await t_(d, o);
        return h.links ? h.links() : [];
      }
      return [];
    })
  );
  return s_(
    c
      .flat(1)
      .filter(l_)
      .filter((r) => r.rel === 'stylesheet' || r.rel === 'preload')
      .map((r) =>
        r.rel === 'stylesheet' ? { ...r, rel: 'prefetch', as: 'style' } : { ...r, rel: 'prefetch' }
      )
  );
}
function Qh(a, u, o, c, r, d) {
  let h = (g, m) => (o[m] ? g.route.id !== o[m].route.id : !0),
    _ = (g, m) => {
      var v;
      return (
        o[m].pathname !== g.pathname ||
        (((v = o[m].route.path) == null ? void 0 : v.endsWith('*')) &&
          o[m].params['*'] !== g.params['*'])
      );
    };
  return d === 'assets'
    ? u.filter((g, m) => h(g, m) || _(g, m))
    : d === 'data'
      ? u.filter((g, m) => {
          var S;
          let v = c.routes[g.route.id];
          if (!v || !v.hasLoader) return !1;
          if (h(g, m) || _(g, m)) return !0;
          if (g.route.shouldRevalidate) {
            let O = g.route.shouldRevalidate({
              currentUrl: new URL(r.pathname + r.search + r.hash, window.origin),
              currentParams: ((S = o[0]) == null ? void 0 : S.params) || {},
              nextUrl: new URL(a, window.origin),
              nextParams: g.params,
              defaultShouldRevalidate: !0,
            });
            if (typeof O == 'boolean') return O;
          }
          return !0;
        })
      : [];
}
function a_(a, u, { includeHydrateFallback: o } = {}) {
  return i_(
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
function i_(a) {
  return [...new Set(a)];
}
function u_(a) {
  let u = {},
    o = Object.keys(a).sort();
  for (let c of o) u[c] = a[c];
  return u;
}
function s_(a, u) {
  let o = new Set();
  return (
    new Set(u),
    a.reduce((c, r) => {
      let d = JSON.stringify(u_(r));
      return (o.has(d) || (o.add(d), c.push({ key: d, link: r })), c);
    }, [])
  );
}
function pr() {
  let a = A.useContext(ba);
  return (hr(a, 'You must render this element inside a <DataRouterContext.Provider> element'), a);
}
function c_() {
  let a = A.useContext(ss);
  return (
    hr(a, 'You must render this element inside a <DataRouterStateContext.Provider> element'),
    a
  );
}
var yr = A.createContext(void 0);
yr.displayName = 'FrameworkContext';
function gr() {
  let a = A.useContext(yr);
  return (hr(a, 'You must render this element inside a <HydratedRouter> element'), a);
}
function o_(a, u) {
  let o = A.useContext(yr),
    [c, r] = A.useState(!1),
    [d, h] = A.useState(!1),
    { onFocus: _, onBlur: g, onMouseEnter: m, onMouseLeave: v, onTouchStart: S } = u,
    O = A.useRef(null);
  (A.useEffect(() => {
    if ((a === 'render' && h(!0), a === 'viewport')) {
      let R = (q) => {
          q.forEach(($) => {
            h($.isIntersecting);
          });
        },
        T = new IntersectionObserver(R, { threshold: 0.5 });
      return (
        O.current && T.observe(O.current),
        () => {
          T.disconnect();
        }
      );
    }
  }, [a]),
    A.useEffect(() => {
      if (c) {
        let R = setTimeout(() => {
          h(!0);
        }, 100);
        return () => {
          clearTimeout(R);
        };
      }
    }, [c]));
  let C = () => {
      r(!0);
    },
    b = () => {
      (r(!1), h(!1));
    };
  return o
    ? a !== 'intent'
      ? [d, O, {}]
      : [
          d,
          O,
          {
            onFocus: gi(_, C),
            onBlur: gi(g, b),
            onMouseEnter: gi(m, C),
            onMouseLeave: gi(v, b),
            onTouchStart: gi(S, C),
          },
        ]
    : [!1, O, {}];
}
function gi(a, u) {
  return (o) => {
    (a && a(o), o.defaultPrevented || u(o));
  };
}
function r_({ page: a, ...u }) {
  let o = xv(),
    { router: c } = pr(),
    r = A.useMemo(() => hp(c.routes, a, c.basename), [c.routes, a, c.basename]);
  return r
    ? o
      ? A.createElement(d_, { page: a, matches: r, ...u })
      : A.createElement(m_, { page: a, matches: r, ...u })
    : null;
}
function f_(a) {
  let { manifest: u, routeModules: o } = gr(),
    [c, r] = A.useState([]);
  return (
    A.useEffect(() => {
      let d = !1;
      return (
        n_(a, u, o).then((h) => {
          d || r(h);
        }),
        () => {
          d = !0;
        }
      );
    }, [a, u, o]),
    c
  );
}
function d_({ page: a, matches: u, ...o }) {
  let c = il(),
    { future: r } = gr(),
    { basename: d } = pr(),
    h = A.useMemo(() => {
      if (a === c.pathname + c.search + c.hash) return [];
      let _ = Rp(a, d, r.unstable_trailingSlashAwareDataRequests, 'rsc'),
        g = !1,
        m = [];
      for (let v of u)
        typeof v.route.shouldRevalidate == 'function' ? (g = !0) : m.push(v.route.id);
      return (
        g && m.length > 0 && _.searchParams.set('_routes', m.join(',')),
        [_.pathname + _.search]
      );
    }, [d, r.unstable_trailingSlashAwareDataRequests, a, c, u]);
  return A.createElement(
    A.Fragment,
    null,
    h.map((_) => A.createElement('link', { key: _, rel: 'prefetch', as: 'fetch', href: _, ...o }))
  );
}
function m_({ page: a, matches: u, ...o }) {
  let c = il(),
    { future: r, manifest: d, routeModules: h } = gr(),
    { basename: _ } = pr(),
    { loaderData: g, matches: m } = c_(),
    v = A.useMemo(() => Qh(a, u, m, d, c, 'data'), [a, u, m, d, c]),
    S = A.useMemo(() => Qh(a, u, m, d, c, 'assets'), [a, u, m, d, c]),
    O = A.useMemo(() => {
      if (a === c.pathname + c.search + c.hash) return [];
      let R = new Set(),
        T = !1;
      if (
        (u.forEach(($) => {
          var D;
          let Q = d.routes[$.route.id];
          !Q ||
            !Q.hasLoader ||
            ((!v.some((U) => U.route.id === $.route.id) &&
              $.route.id in g &&
              (D = h[$.route.id]) != null &&
              D.shouldRevalidate) ||
            Q.hasClientLoader
              ? (T = !0)
              : R.add($.route.id));
        }),
        R.size === 0)
      )
        return [];
      let q = Rp(a, _, r.unstable_trailingSlashAwareDataRequests, 'data');
      return (
        T &&
          R.size > 0 &&
          q.searchParams.set(
            '_routes',
            u
              .filter(($) => R.has($.route.id))
              .map(($) => $.route.id)
              .join(',')
          ),
        [q.pathname + q.search]
      );
    }, [_, r.unstable_trailingSlashAwareDataRequests, g, c, d, v, u, a, h]),
    C = A.useMemo(() => a_(S, d), [S, d]),
    b = f_(S);
  return A.createElement(
    A.Fragment,
    null,
    O.map((R) => A.createElement('link', { key: R, rel: 'prefetch', as: 'fetch', href: R, ...o })),
    C.map((R) => A.createElement('link', { key: R, rel: 'modulepreload', href: R, ...o })),
    b.map(({ key: R, link: T }) =>
      A.createElement('link', {
        key: R,
        nonce: o.nonce,
        ...T,
        crossOrigin: T.crossOrigin ?? o.crossOrigin,
      })
    )
  );
}
function h_(...a) {
  return (u) => {
    a.forEach((o) => {
      typeof o == 'function' ? o(u) : o != null && (o.current = u);
    });
  };
}
var p_ =
  typeof window < 'u' && typeof window.document < 'u' && typeof window.document.createElement < 'u';
try {
  p_ && (window.__reactRouterVersion = '7.14.2');
} catch {}
function y_({ basename: a, children: u, unstable_useTransitions: o, window: c }) {
  let r = A.useRef();
  r.current == null && (r.current = J0({ window: c, v5Compat: !0 }));
  let d = r.current,
    [h, _] = A.useState({ action: d.action, location: d.location }),
    g = A.useCallback(
      (m) => {
        o === !1 ? _(m) : A.startTransition(() => _(m));
      },
      [o]
    );
  return (
    A.useLayoutEffect(() => d.listen(g), [d, g]),
    A.createElement(Qv, {
      basename: a,
      children: u,
      location: h.location,
      navigationType: h.action,
      navigator: d,
      unstable_useTransitions: o,
    })
  );
}
var kp = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,
  jp = A.forwardRef(function (
    {
      onClick: u,
      discover: o = 'render',
      prefetch: c = 'none',
      relative: r,
      reloadDocument: d,
      replace: h,
      unstable_mask: _,
      state: g,
      target: m,
      to: v,
      preventScrollReset: S,
      viewTransition: O,
      unstable_defaultShouldRevalidate: C,
      ...b
    },
    R
  ) {
    let { basename: T, navigator: q, unstable_useTransitions: $ } = A.useContext(wt),
      Q = typeof v == 'string' && kp.test(v),
      D = _p(v, T);
    v = D.to;
    let U = Rv(v, { relative: r }),
      K = il(),
      Z = null;
    if (_) {
      let He = us(_, [], K.unstable_mask ? K.unstable_mask.pathname : '/', !0);
      (T !== '/' && (He.pathname = He.pathname === '/' ? T : Wt([T, He.pathname])),
        (Z = q.createHref(He)));
    }
    let [B, F, le] = o_(c, b),
      re = b_(v, {
        replace: h,
        unstable_mask: _,
        state: g,
        target: m,
        preventScrollReset: S,
        relative: r,
        viewTransition: O,
        unstable_defaultShouldRevalidate: C,
        unstable_useTransitions: $,
      });
    function de(He) {
      (u && u(He), He.defaultPrevented || re(He));
    }
    let at = !(D.isExternal || d),
      ht = A.createElement('a', {
        ...b,
        ...le,
        href: (at ? Z : void 0) || D.absoluteURL || U,
        onClick: at ? de : u,
        ref: h_(R, F),
        target: m,
        'data-discover': !Q && o === 'render' ? 'true' : void 0,
      });
    return B && !Q ? A.createElement(A.Fragment, null, ht, A.createElement(r_, { page: U })) : ht;
  });
jp.displayName = 'Link';
var g_ = A.forwardRef(function (
  {
    'aria-current': u = 'page',
    caseSensitive: o = !1,
    className: c = '',
    end: r = !1,
    style: d,
    to: h,
    viewTransition: _,
    children: g,
    ...m
  },
  v
) {
  let S = Ri(h, { relative: m.relative }),
    O = il(),
    C = A.useContext(ss),
    { navigator: b, basename: R } = A.useContext(wt),
    T = C != null && N_(S) && _ === !0,
    q = b.encodeLocation ? b.encodeLocation(S).pathname : S.pathname,
    $ = O.pathname,
    Q = C && C.navigation && C.navigation.location ? C.navigation.location.pathname : null;
  (o || (($ = $.toLowerCase()), (Q = Q ? Q.toLowerCase() : null), (q = q.toLowerCase())),
    Q && R && (Q = Rl(Q, R) || Q));
  const D = q !== '/' && q.endsWith('/') ? q.length - 1 : q.length;
  let U = $ === q || (!r && $.startsWith(q) && $.charAt(D) === '/'),
    K = Q != null && (Q === q || (!r && Q.startsWith(q) && Q.charAt(q.length) === '/')),
    Z = { isActive: U, isPending: K, isTransitioning: T },
    B = U ? u : void 0,
    F;
  typeof c == 'function'
    ? (F = c(Z))
    : (F = [c, U ? 'active' : null, K ? 'pending' : null, T ? 'transitioning' : null]
        .filter(Boolean)
        .join(' '));
  let le = typeof d == 'function' ? d(Z) : d;
  return A.createElement(
    jp,
    { ...m, 'aria-current': B, className: F, ref: v, style: le, to: h, viewTransition: _ },
    typeof g == 'function' ? g(Z) : g
  );
});
g_.displayName = 'NavLink';
var v_ = A.forwardRef(
  (
    {
      discover: a = 'render',
      fetcherKey: u,
      navigate: o,
      reloadDocument: c,
      replace: r,
      state: d,
      method: h = Wu,
      action: _,
      onSubmit: g,
      relative: m,
      preventScrollReset: v,
      viewTransition: S,
      unstable_defaultShouldRevalidate: O,
      ...C
    },
    b
  ) => {
    let { unstable_useTransitions: R } = A.useContext(wt),
      T = E_(),
      q = T_(_, { relative: m }),
      $ = h.toLowerCase() === 'get' ? 'get' : 'post',
      Q = typeof _ == 'string' && kp.test(_),
      D = (U) => {
        if ((g && g(U), U.defaultPrevented)) return;
        U.preventDefault();
        let K = U.nativeEvent.submitter,
          Z = (K == null ? void 0 : K.getAttribute('formmethod')) || h,
          B = () =>
            T(K || U.currentTarget, {
              fetcherKey: u,
              method: Z,
              navigate: o,
              replace: r,
              state: d,
              relative: m,
              preventScrollReset: v,
              viewTransition: S,
              unstable_defaultShouldRevalidate: O,
            });
        R && o !== !1 ? A.startTransition(() => B()) : B();
      };
    return A.createElement('form', {
      ref: b,
      method: $,
      action: q,
      onSubmit: c ? g : D,
      ...C,
      'data-discover': !Q && a === 'render' ? 'true' : void 0,
    });
  }
);
v_.displayName = 'Form';
function __(a) {
  return `${a} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function Op(a) {
  let u = A.useContext(ba);
  return (Xe(u, __(a)), u);
}
function b_(
  a,
  {
    target: u,
    replace: o,
    unstable_mask: c,
    state: r,
    preventScrollReset: d,
    relative: h,
    viewTransition: _,
    unstable_defaultShouldRevalidate: g,
    unstable_useTransitions: m,
  } = {}
) {
  let v = jl(),
    S = il(),
    O = Ri(a, { relative: h });
  return A.useCallback(
    (C) => {
      if (Wv(C, u)) {
        C.preventDefault();
        let b = o !== void 0 ? o : Ti(S) === Ti(O),
          R = () =>
            v(a, {
              replace: b,
              unstable_mask: c,
              state: r,
              preventScrollReset: d,
              relative: h,
              viewTransition: _,
              unstable_defaultShouldRevalidate: g,
            });
        m ? A.startTransition(() => R()) : R();
      }
    },
    [S, v, O, o, c, r, u, a, d, h, _, g, m]
  );
}
var S_ = 0,
  x_ = () => `__${String(++S_)}__`;
function E_() {
  let { router: a } = Op('useSubmit'),
    { basename: u } = A.useContext(wt),
    o = Gv(),
    c = a.fetch,
    r = a.navigate;
  return A.useCallback(
    async (d, h = {}) => {
      let { action: _, method: g, encType: m, formData: v, body: S } = e_(d, u);
      if (h.navigate === !1) {
        let O = h.fetcherKey || x_();
        await c(O, o, h.action || _, {
          unstable_defaultShouldRevalidate: h.unstable_defaultShouldRevalidate,
          preventScrollReset: h.preventScrollReset,
          formData: v,
          body: S,
          formMethod: h.method || g,
          formEncType: h.encType || m,
          flushSync: h.flushSync,
        });
      } else
        await r(h.action || _, {
          unstable_defaultShouldRevalidate: h.unstable_defaultShouldRevalidate,
          preventScrollReset: h.preventScrollReset,
          formData: v,
          body: S,
          formMethod: h.method || g,
          formEncType: h.encType || m,
          replace: h.replace,
          state: h.state,
          fromRouteId: o,
          flushSync: h.flushSync,
          viewTransition: h.viewTransition,
        });
    },
    [c, r, u, o]
  );
}
function T_(a, { relative: u } = {}) {
  let { basename: o } = A.useContext(wt),
    c = A.useContext(Pt);
  Xe(c, 'useFormAction must be used inside a RouteContext');
  let [r] = c.matches.slice(-1),
    d = { ...Ri(a || '.', { relative: u }) },
    h = il();
  if (a == null) {
    d.search = h.search;
    let _ = new URLSearchParams(d.search),
      g = _.getAll('index');
    if (g.some((v) => v === '')) {
      (_.delete('index'), g.filter((S) => S).forEach((S) => _.append('index', S)));
      let v = _.toString();
      d.search = v ? `?${v}` : '';
    }
  }
  return (
    (!a || a === '.') &&
      r.route.index &&
      (d.search = d.search ? d.search.replace(/^\?/, '?index&') : '?index'),
    o !== '/' && (d.pathname = d.pathname === '/' ? o : Wt([o, d.pathname])),
    Ti(d)
  );
}
function N_(a, { relative: u } = {}) {
  let o = A.useContext(xp);
  Xe(
    o != null,
    "`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?"
  );
  let { basename: c } = Op('useViewTransitionState'),
    r = Ri(a, { relative: u });
  if (!o.isTransitioning) return !1;
  let d = Rl(o.currentLocation.pathname, c) || o.currentLocation.pathname,
    h = Rl(o.nextLocation.pathname, c) || o.nextLocation.pathname;
  return es(r.pathname, h) != null || es(r.pathname, d) != null;
}
const A_ = '_layout_6axqy_1',
  C_ = '_enemies_6axqy_12',
  M_ = '_enemy_6axqy_20',
  R_ = '_targeted_6axqy_35',
  k_ = '_enemyName_6axqy_39',
  j_ = '_down_6axqy_44',
  O_ = '_log_6axqy_48',
  z_ = '_logLine_6axqy_60',
  D_ = '_party_6axqy_64',
  w_ = '_rowTag_6axqy_71',
  B_ = '_cardRow_6axqy_77',
  U_ = '_card_6axqy_77',
  q_ = '_cardActive_6axqy_99',
  L_ = '_cardDecided_6axqy_104',
  H_ = '_cardName_6axqy_108',
  G_ = '_uni_6axqy_116',
  Y_ = '_cardNums_6axqy_120',
  X_ = '_cardCmd_6axqy_126',
  V_ = '_empty_6axqy_132',
  Q_ = '_command_6axqy_137',
  Z_ = '_skillList_6axqy_143',
  $_ = '_skillBtn_6axqy_149',
  K_ = '_skillTop_6axqy_161',
  J_ = '_skillName_6axqy_168',
  I_ = '_skillDesc_6axqy_173',
  W_ = '_target_6axqy_35',
  F_ = '_unionBanner_6axqy_184',
  P_ = '_unionCancel_6axqy_198',
  e1 = '_unionHint_6axqy_207',
  t1 = '_unionBtn_6axqy_213',
  l1 = '_cmdHead_6axqy_219',
  n1 = '_menu_6axqy_224',
  a1 = '_menuBtn_6axqy_230',
  i1 = '_tp_6axqy_247',
  u1 = '_menuBack_6axqy_253',
  s1 = '_execRow_6axqy_263',
  c1 = '_redo_6axqy_268',
  o1 = '_primary_6axqy_278',
  r1 = '_result_6axqy_293',
  f1 = '_resultTitle_6axqy_304',
  d1 = '_resultBody_6axqy_309',
  W = {
    layout: A_,
    enemies: C_,
    enemy: M_,
    targeted: R_,
    enemyName: k_,
    down: j_,
    log: O_,
    logLine: z_,
    party: D_,
    rowTag: w_,
    cardRow: B_,
    card: U_,
    cardActive: q_,
    cardDecided: L_,
    cardName: H_,
    uni: G_,
    cardNums: Y_,
    cardCmd: X_,
    empty: V_,
    command: Q_,
    skillList: Z_,
    skillBtn: $_,
    skillTop: K_,
    skillName: J_,
    skillDesc: I_,
    target: W_,
    unionBanner: F_,
    unionCancel: P_,
    unionHint: e1,
    unionBtn: t1,
    cmdHead: l1,
    menu: n1,
    menuBtn: a1,
    tp: i1,
    menuBack: u1,
    execRow: s1,
    redo: c1,
    primary: o1,
    result: r1,
    resultTitle: f1,
    resultBody: d1,
  },
  m1 = '_row_1t6j7_1',
  h1 = '_label_1t6j7_8',
  p1 = '_track_1t6j7_16',
  y1 = '_fill_1t6j7_24',
  g1 = '_value_1t6j7_30',
  vi = { row: m1, label: h1, track: p1, fill: y1, value: g1 },
  Go = ({ value: a, max: u, color: o = '#4caf50', label: c, showValue: r = !0 }) => {
    const d = u > 0 ? Math.max(0, Math.min(100, (a / u) * 100)) : 0;
    return y.jsxs('div', {
      className: vi.row,
      children: [
        c ? y.jsx('span', { className: vi.label, children: c }) : null,
        y.jsx('div', {
          className: vi.track,
          children: y.jsx('div', {
            className: vi.fill,
            style: { width: `${d}%`, backgroundColor: o },
          }),
        }),
        r
          ? y.jsxs('span', {
              className: vi.value,
              children: [Math.max(0, Math.round(a)), '/', Math.round(u)],
            })
          : null,
      ],
    });
  },
  An = {
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
  },
  mt = {
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
  };
function v1(a) {
  return a.category === 'material' ? 8 : Math.floor(a.buyPrice / 2);
}
const $t = {
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
  vr = {
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
  ze = {
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
  _1 = 500,
  Po = 30,
  os = 3,
  rs = 2,
  b1 = os + rs,
  xi = { TITLE_DEPTH: 20, REBIRTH_MIN_LEVEL: 30 },
  zp = 5,
  S1 = 5,
  ls = (a) => a > 0 && a % ze.BOSS_INTERVAL === 0,
  Zh = (a) => Math.round(ze.EXP_CURVE_BASE * Math.pow(a, ze.EXP_CURVE_POW)),
  Yo = (a) => a < ze.LEVEL_CAP,
  Dp = (a, u) => 1 + ze.ENEMY_SCALE_K * (a - u),
  Mn = {
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
  Dt = {
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
  x1 = ['hp', 'tp', 'str', 'vit', 'agi', 'int', 'mnd', 'luc'],
  E1 = ['slash', 'pierce', 'bash'],
  ns = (a, u, o) => Math.max(u, Math.min(o, a));
function T1(a, u) {
  const o = {};
  for (const c of x1) o[c] = Math.round(a[c] * u);
  return o;
}
function N1(a, u) {
  return T1(a.baseStats, Dp(u, a.refDepth));
}
function ha(a, u) {
  const o = new Map();
  for (const r of a) {
    if (r.stat !== u) continue;
    const d = ns(r.modifier, 0.5, 1.5),
      h = o.get(r.stackGroup);
    (h === void 0 || Math.abs(d - 1) > Math.abs(h - 1)) && o.set(r.stackGroup, d);
  }
  let c = 1;
  for (const r of o.values()) c *= r;
  return ns(c, 0.25, 2);
}
function $h(a, u, o) {
  const c = (a.str * 2 + (u.atk ?? 0)) * ha(o, 'patk'),
    r = (a.vit * 2 + (u.def ?? 0)) * ha(o, 'pdef'),
    d = (a.int * 2 + (u.mat ?? 0)) * ha(o, 'matk'),
    h = (a.mnd * 2 + (u.mdf ?? 0)) * ha(o, 'mdef');
  return {
    patk: c,
    pdef: r,
    matk: d,
    mdef: h,
    hit: a.agi,
    acc: a.agi * ha(o, 'acc'),
    eva: a.agi * ha(o, 'eva'),
    crit: a.luc,
  };
}
const A1 = (a) => a.ailments.some((u) => u.type === 'blind'),
  C1 = (a) => a.ailments.some((u) => u.type === 'legBind');
function wp(a, u, o, c) {
  const r = o.statBase === 'str',
    d = $h(a.stats, a.equip, a.buffs),
    h = $h(u.stats, u.equip, u.buffs),
    _ = r ? d.patk : d.matk,
    g = r ? h.pdef : h.mdef;
  let m = !0;
  if (r) {
    const Z = A1(a) ? ze.BLIND_ACC_PENALTY : 0,
      B = C1(u) ? 0 : h.eva,
      F = ns(ze.BASE_HIT + (d.acc - B) * ze.HIT_AGI_K - Z, ze.HIT_MIN, 1);
    m = c.next() < F;
  }
  if (!m) return { damage: 0, hit: !1, critical: !1 };
  const S = (_ * o.power * ze.DAMAGE_DEF_K) / (ze.DAMAGE_DEF_K + Math.max(0, g)),
    O = r && E1.includes(o.element),
    C = O && a.row === 'back' ? ze.BACK_ROW_MELEE_MULT : 1,
    b = O && u.row === 'back' ? ze.BACK_ROW_MELEE_MULT : 1,
    R = C * b,
    [T, q] = ze.DMG_VARIANCE,
    $ = T + c.next() * (q - T);
  let Q = S * o.elementMultiplier * R * $;
  const D = ns(
      ze.CRIT_BASE + (a.stats.luc - u.stats.luc) * ze.CRIT_LUC_K,
      ze.CRIT_MIN,
      ze.CRIT_MAX
    ),
    U = c.next() < D;
  return (
    U && (Q *= ze.CRIT_MULT),
    { damage: o.elementMultiplier === 0 ? 0 : Math.max(1, Math.floor(Q)), hit: !0, critical: U }
  );
}
const ft = {
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
        { skillId: 'skill_leg_snipe', maxLevel: 3 },
        { skillId: 'skill_arm_snipe', maxLevel: 3 },
        {
          skillId: 'skill_head_snipe',
          maxLevel: 3,
          requires: [{ skillId: 'skill_aimed_shot', level: 1 }],
        },
      ],
    },
    equipableWeaponTypes: ['bow', 'fist'],
    equipableArmorTypes: ['light', 'clothes'],
    titleOptions: ['title_sniper', 'title_tracker'],
  },
};
function Bp(a, u) {
  var o;
  return ((o = a.guild.storage.find((c) => c.itemId === u)) == null ? void 0 : o.qty) ?? 0;
}
function fs(a, u, o = 1) {
  if (o <= 0) return a;
  const c = [...a.guild.storage],
    r = c.findIndex((d) => d.itemId === u);
  return (
    r >= 0 ? (c[r] = { ...c[r], qty: c[r].qty + o }) : c.push({ itemId: u, qty: o }),
    { ...a, guild: { ...a.guild, storage: c } }
  );
}
function Ni(a, u, o = 1) {
  if (o <= 0) return a;
  const c = a.guild.storage.findIndex((h) => h.itemId === u);
  if (c < 0 || a.guild.storage[c].qty < o) return a;
  const r = [...a.guild.storage],
    d = r[c].qty - o;
  return (
    d <= 0 ? r.splice(c, 1) : (r[c] = { ...r[c], qty: d }),
    { ...a, guild: { ...a.guild, storage: r } }
  );
}
function Up(a, u, o) {
  return {
    ...a,
    guild: { ...a.guild, members: a.guild.members.map((c) => (c.id === u ? o(c) : c)) },
  };
}
function _r(a, u) {
  const o = Dt[u];
  if (!o) return !1;
  const c = ft[a.classId];
  return c
    ? o.slot === 'weapon'
      ? !!o.weaponType && c.equipableWeaponTypes.includes(o.weaponType)
      : o.slot === 'armor'
        ? !!o.armorType && c.equipableArmorTypes.includes(o.armorType)
        : !0
    : !1;
}
function M1(a, u, o) {
  const c = Dt[o],
    r = a.guild.members.find((_) => _.id === u);
  if (!c || !r || !_r(r, o) || Bp(a, o) <= 0) return a;
  let d = Ni(a, o, 1);
  const h = r.equipment[c.slot];
  return (
    h && (d = fs(d, h, 1)),
    Up(d, u, (_) => ({ ..._, equipment: { ..._.equipment, [c.slot]: o } }))
  );
}
function br(a, u, o) {
  const c = a.guild.members.find((h) => h.id === u);
  if (!c) return a;
  const r = c.equipment[o];
  if (!r) return a;
  const d = fs(a, r, 1);
  return Up(d, u, (h) => ({ ...h, equipment: { ...h.equipment, [o]: null } }));
}
const nn = (a) => ({ hp: 0, tp: 0, str: 0, vit: 0, agi: 0, int: 0, mnd: 0, luc: 0, ...a }),
  ga = {
    title_berserker: {
      id: 'title_berserker',
      name: '狂戦士',
      parentClassId: 'class_warrior',
      skillTree: { skills: [] },
      growthModifier: nn({ str: 1 }),
    },
    title_sentinel: {
      id: 'title_sentinel',
      name: '哨戒兵',
      parentClassId: 'class_warrior',
      skillTree: { skills: [] },
      growthModifier: nn({ vit: 1 }),
    },
    title_bulwark: {
      id: 'title_bulwark',
      name: '城壁',
      parentClassId: 'class_guardian',
      skillTree: { skills: [] },
      growthModifier: nn({ vit: 1, hp: 2 }),
    },
    title_vanguard: {
      id: 'title_vanguard',
      name: '先鋒',
      parentClassId: 'class_guardian',
      skillTree: { skills: [] },
      growthModifier: nn({ str: 1 }),
    },
    title_pyromancer: {
      id: 'title_pyromancer',
      name: '紅蓮術士',
      parentClassId: 'class_mage',
      skillTree: { skills: [] },
      growthModifier: nn({ int: 1 }),
    },
    title_sage: {
      id: 'title_sage',
      name: '賢者',
      parentClassId: 'class_mage',
      skillTree: { skills: [] },
      growthModifier: nn({ tp: 2, mnd: 1 }),
    },
    title_sniper: {
      id: 'title_sniper',
      name: '狙撃手',
      parentClassId: 'class_ranger',
      skillTree: { skills: [] },
      growthModifier: nn({ agi: 1, luc: 1 }),
    },
    title_tracker: {
      id: 'title_tracker',
      name: '追跡者',
      parentClassId: 'class_ranger',
      skillTree: { skills: [] },
      growthModifier: nn({ agi: 1 }),
    },
  },
  R1 = ['hp', 'tp', 'str', 'vit', 'agi', 'int', 'mnd', 'luc'];
function ki(a) {
  var _, g;
  const u = $t[a.raceId];
  if (!u) throw new Error(`computeBaseStats: 未定義の種族 "${a.raceId}"`);
  const c = Math.max(1, Math.min(a.level, ze.LEVEL_CAP)) - 1,
    r = a.titleId ? ((_ = ga[a.titleId]) == null ? void 0 : _.growthModifier) : void 0,
    d = ((g = a.rebirthBonus) == null ? void 0 : g.allStats) ?? 0,
    h = {};
  for (const m of R1) {
    const v = u.statGrowth[m] + ((r == null ? void 0 : r[m]) ?? 0);
    h[m] = u.baseStatsAtLv1[m] + v * c + d;
  }
  return h;
}
const Ml = (a, u, o) => Math.max(u, Math.min(o, a)),
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
function j1(a) {
  const u = { atk: 0, mat: 0, def: 0, mdf: 0 };
  for (const o of Object.values(a.equipment)) {
    if (!o) continue;
    const c = Dt[o];
    c &&
      ((u.atk += c.bonuses.atk ?? 0),
      (u.mat += c.bonuses.mat ?? 0),
      (u.def += c.bonuses.def ?? 0),
      (u.mdf += c.bonuses.mdf ?? 0));
  }
  return u;
}
function O1(a, u) {
  var h;
  const o = a.guild.members.find((_) => _.id === u);
  if (!o) return null;
  const c = (h = a.diveState) == null ? void 0 : h.party.find((_) => _.charId === u),
    r = ki(o),
    d = a.guild.party.front.includes(u);
  return {
    id: u,
    name: o.name,
    side: 'ally',
    row: d ? 'front' : 'back',
    stats: r,
    equip: j1(o),
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
function z1(a, u, o) {
  const c = Mn[a],
    r = N1(c, o);
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
function Kh(a, u, o = 'none') {
  var _;
  const c = ((_ = a.diveState) == null ? void 0 : _.depth) ?? 1,
    d = [...a.guild.party.front, ...a.guild.party.back]
      .filter((g) => g !== null)
      .map((g) => O1(a, g))
      .filter((g) => g !== null),
    h = u.map((g, m) => z1(g, m, c));
  return {
    turn: 1,
    depth: c,
    allies: d,
    enemies: h,
    log: [],
    outcome: 'ongoing',
    firstStrike: o,
    drops: [],
    consumedItems: [],
  };
}
const zt = (a, u) => (u === 'ally' ? a.allies : a.enemies).filter((o) => !o.isDown);
function Cl(a, u) {
  return a.allies.find((o) => o.id === u) ?? a.enemies.find((o) => o.id === u);
}
const qp = (a, u) => {
  var o;
  return ((o = a.resist) == null ? void 0 : o[u]) ?? 1;
};
function Sr(a, u, o) {
  ((a.hp = Ml(a.hp - u, 0, a.maxHp)),
    a.hp === 0 &&
      !a.isDown &&
      ((a.isDown = !0),
      (a.unionGauge = Math.floor(a.unionGauge / 2)),
      o.push({ text: `${a.name} は倒れた！` })));
}
function as(a, u) {
  a.isDown || (a.unionGauge = Ml(a.unionGauge + u, 0, 100));
}
function er(a, u) {
  ((a.buffs = a.buffs.filter((o) => !(o.stat === u.stat && o.stackGroup === u.stackGroup))),
    a.buffs.push(u));
}
function D1(a, u) {
  const o = a.ailments.find((c) => c.type === u.type);
  if (o) {
    o.remainingTurns = Math.max(o.remainingTurns, u.remainingTurns);
    return;
  }
  a.ailments.push(u);
}
function w1(a, u, o) {
  return Ml(a * (1 + (u.stats.luc - o.stats.luc) * ze.AILMENT_LUC_K), 0, ze.AILMENT_MAX);
}
function Lp(a, u, o, c) {
  const r = u.side === 'ally' ? 'enemy' : 'ally';
  switch (o) {
    case 'self':
      return [u];
    case 'allyAll':
      return zt(a, u.side);
    case 'allyOne': {
      const d = Cl(a, c);
      return d && d.side === u.side ? [d] : [u];
    }
    case 'enemyAll':
      return zt(a, r);
    case 'enemyRow':
    case 'enemyOne':
    default: {
      const d = Cl(a, c);
      return d && d.side === r && !d.isDown ? [d] : zt(a, r).slice(0, 1);
    }
  }
}
function B1(a, u, o, c) {
  return Lp(a, u, o.target, c);
}
function Hp(a, u, o, c, r, d, h) {
  switch (o.kind) {
    case 'damage': {
      const _ = o.hits ?? 1;
      for (const g of d)
        if (!g.isDown)
          for (let m = 0; m < _; m++) {
            const v = wp(
              u,
              g,
              { statBase: o.statBase, power: o.power(r), element: c, elementMultiplier: qp(g, c) },
              h
            );
            v.hit
              ? (Sr(g, v.damage, a.log),
                as(g, 5),
                a.log.push({
                  text: `${u.name} の攻撃！ ${g.name} に ${v.damage} ダメージ${v.critical ? '（会心）' : ''}`,
                }))
              : a.log.push({ text: `${u.name} の攻撃は外れた` });
          }
      break;
    }
    case 'heal': {
      const _ = o.amount(r);
      for (const g of d) g.isDown || (g.hp = Ml(g.hp + _, 0, g.maxHp));
      a.log.push({ text: `${u.name} は回復魔法を使った（+${_}）` });
      break;
    }
    case 'buff': {
      for (const _ of d)
        er(_, {
          stat: o.stat,
          modifier: o.modifier(r),
          remainingTurns: o.turns,
          stackGroup: o.stackGroup,
        });
      a.log.push({ text: `${u.name} は態勢を整えた` });
      break;
    }
    case 'ailment': {
      for (const _ of d) {
        if (_.isDown) continue;
        const g = w1(o.chance(r), u, _);
        h.next() < g &&
          (D1(_, { type: o.ailment, remainingTurns: o.turns, magnitude: o.magnitude }),
          a.log.push({ text: `${_.name} は${k1[o.ailment]}になった` }));
      }
      break;
    }
  }
}
function Jh(a, u, o, c) {
  if (o.isDown) return;
  const r = u.enemyId ? (Mn[u.enemyId].attackElement ?? 'bash') : 'bash',
    d = wp(u, o, { statBase: 'str', power: 1, element: r, elementMultiplier: qp(o, r) }, c);
  d.hit
    ? (Sr(o, d.damage, a.log),
      as(u, 5),
      as(o, 5),
      a.log.push({
        text: `${u.name} の攻撃！ ${o.name} に ${d.damage} ダメージ${d.critical ? '（会心）' : ''}`,
      }))
    : a.log.push({ text: `${u.name} の攻撃は外れた` });
}
const Ih = (a) => (a.length === 0 ? 0 : a.reduce((u, o) => u + o.stats.agi, 0) / a.length),
  U1 = (a) => a.ailments.some((u) => u.type === 'paralysis'),
  xr = (a, u) => a.ailments.some((o) => o.type === u),
  Xo = (a) => xr(a, 'armBind'),
  q1 = (a) => xr(a, 'headBind'),
  L1 = (a) => xr(a, 'legBind');
function Wh(a) {
  return a.effects.some((u) => u.kind === 'damage' && u.statBase === 'str');
}
function H1(a, u, o) {
  const c = Si[u.unionSkillId];
  if (!c) return;
  const r = Cl(a, u.actorId);
  if (!r || r.isDown || r.side !== 'ally') return;
  if (r.unionGauge < 100) {
    a.log.push({ text: `${r.name} はユニオンゲージが足りない` });
    return;
  }
  const d = new Set(u.participantIds);
  d.add(r.id);
  const h = [...d].map((v) => Cl(a, v)).filter((v) => !!v && !v.isDown && v.side === 'ally');
  if (h.length < c.requiredParticipants) {
    a.log.push({ text: `${r.name} の${c.name}は参加人数が足りない` });
    return;
  }
  const _ = [r, ...h.filter((v) => v.id !== r.id)].slice(0, c.requiredParticipants);
  for (const v of _) v.unionGauge = Ml(v.unionGauge - c.gaugeCostPerParticipant, 0, 100);
  a.log.push({ text: `ユニオン！ ${r.name} の${c.name}！` });
  const g = 1,
    m = Lp(a, r, c.target, u.targetId);
  for (const v of c.effects) Hp(a, r, v, c.element, g, m, o);
}
function Vo(a, u, o) {
  var S, O, C;
  if (a.outcome !== 'ongoing') return a;
  const c = structuredClone({ ...a, log: [] }),
    r = new Map(u.filter((b) => b.kind !== 'union').map((b) => [b.actorId, b])),
    d = c.turn === 1 && c.firstStrike !== 'none',
    h = d && c.firstStrike === 'preemptive',
    _ = d && c.firstStrike === 'ambush';
  if (
    (h && c.log.push({ text: '先制攻撃！ 味方が先手を取った' }),
    _ && c.log.push({ text: '不意打ち！ 敵に先手を取られた' }),
    !_)
  )
    for (const b of u) b.kind === 'union' && H1(c, b, o);
  const g = u.find((b) => b.kind === 'flee');
  if (!_ && g && c.outcome === 'ongoing') {
    const b = Cl(c, g.actorId);
    if (b && L1(b)) c.log.push({ text: `${b.name} は脚を封じられて逃げられない` });
    else {
      const R = Ml(0.5 + (Ih(zt(c, 'ally')) - Ih(zt(c, 'enemy'))) * 0.02, 0.1, 0.95);
      if (o.next() < R)
        return (c.log.push({ text: 'うまく逃げ切れた！' }), (c.outcome = 'fled'), c);
      c.log.push({ text: '逃げられなかった！' });
    }
  }
  if (!_)
    for (const b of u) {
      if (b.kind !== 'guard') continue;
      const R = Cl(c, b.actorId);
      !R ||
        R.isDown ||
        (er(R, { stat: 'pdef', modifier: 1.5, remainingTurns: 1, stackGroup: 'guard' }),
        er(R, { stat: 'mdef', modifier: 1.5, remainingTurns: 1, stackGroup: 'guard' }));
    }
  const m = new Map();
  if (!h)
    for (const b of zt(c, 'enemy')) {
      const R = zt(c, 'ally');
      R.length > 0 && m.set(b.id, o.pick(R).id);
    }
  const v = [...c.allies, ...c.enemies]
    .filter((b) => !b.isDown)
    .filter((b) => !(h && b.side === 'enemy') && !(_ && b.side === 'ally'))
    .map((b) => ({ c: b, agi: b.stats.agi, tie: o.next() }))
    .sort((b, R) => R.agi - b.agi || R.tie - b.tie)
    .map((b) => b.c);
  for (const b of v)
    if (!b.isDown) {
      if (c.outcome !== 'ongoing') break;
      if (U1(b) && o.next() < ze.PARALYSIS_SKIP) {
        c.log.push({ text: `${b.name} は麻痺で動けない` });
        continue;
      }
      if (b.side === 'enemy') {
        if (Xo(b)) {
          c.log.push({ text: `${b.name} は腕を封じられて攻撃できない` });
          continue;
        }
        const R = m.get(b.id),
          T = R ? Cl(c, R) : void 0,
          q = T && !T.isDown ? T : zt(c, 'ally')[0];
        q && Jh(c, b, q, o);
      } else {
        const R = r.get(b.id);
        if (!R || R.kind === 'guard' || R.kind === 'flee') continue;
        if (R.kind === 'attack') {
          if (Xo(b)) {
            c.log.push({ text: `${b.name} は腕を封じられて攻撃できない` });
            continue;
          }
          const T = Cl(c, R.targetId),
            q = T && !T.isDown ? T : zt(c, 'enemy')[0];
          q && Jh(c, b, q, o);
        } else if (R.kind === 'skill') {
          const T = An[R.skillId];
          if (!T) continue;
          if (Wh(T) && Xo(b)) {
            c.log.push({ text: `${b.name} は腕を封じられてスキルを使えない` });
            continue;
          }
          if (!Wh(T) && q1(b)) {
            c.log.push({ text: `${b.name} は頭を封じられてスキルを使えない` });
            continue;
          }
          const q = 1,
            $ = T.tpCost(q);
          if (b.tp < $) {
            c.log.push({ text: `${b.name} は TP が足りない` });
            continue;
          }
          ((b.tp -= $), as(b, 10));
          const Q = B1(c, b, T, R.targetId);
          for (const D of T.effects) Hp(c, b, D, T.element, q, Q, o);
        } else if (R.kind === 'item') {
          const T = mt[R.itemId];
          if (!T || !((S = T.useContext) != null && S.includes('battle'))) continue;
          const q = Cl(c, R.targetId) ?? b;
          for (const $ of T.effects ?? [])
            $.kind === 'heal'
              ? (q.hp = Ml(q.hp + $.amount(1), 0, q.maxHp))
              : $.kind === 'restoreTp' && (q.tp = Ml(q.tp + $.amount(1), 0, q.maxTp));
          (c.consumedItems.push(R.itemId), c.log.push({ text: `${b.name} は ${T.name} を使った` }));
        }
      }
      if (zt(c, 'enemy').length === 0 || zt(c, 'ally').length === 0) break;
    }
  for (const b of [...c.allies, ...c.enemies]) {
    if (b.isDown) continue;
    const R = b.ailments.find((T) => T.type === 'poison');
    if (R) {
      const T = R.magnitude ?? Math.max(1, Math.floor(b.maxHp * ze.POISON_HP_RATIO));
      (Sr(b, T, c.log), c.log.push({ text: `${b.name} は毒で ${T} のダメージ` }));
    }
  }
  for (const b of [...c.allies, ...c.enemies])
    (!b.isDown &&
      b.maxTp > 0 &&
      (b.tp = Math.min(b.maxTp, b.tp + Math.ceil(b.maxTp * ze.TP_REGEN_RATIO))),
      (b.buffs = b.buffs
        .map((R) => ({ ...R, remainingTurns: R.remainingTurns - 1 }))
        .filter((R) => R.remainingTurns > 0)),
      (b.ailments = b.ailments
        .map((R) => ({ ...R, remainingTurns: R.remainingTurns - 1 }))
        .filter((R) => R.remainingTurns > 0)));
  for (const b of c.enemies)
    if (
      !(
        !b.isDown ||
        !b.enemyId ||
        (((O = a.enemies.find((T) => T.id === b.id)) == null ? void 0 : O.isDown) ?? !1)
      )
    )
      for (const T of Mn[b.enemyId].drops ?? [])
        o.next() < T.rate &&
          (c.drops.push({ enemyId: b.enemyId, itemId: T.itemId }),
          c.log.push({
            text: `${b.name} は ${((C = mt[T.itemId]) == null ? void 0 : C.name) ?? T.itemId} を落とした`,
          }));
  return (
    (c.turn += 1),
    zt(c, 'enemy').length === 0
      ? (c.outcome = 'win')
      : zt(c, 'ally').length === 0 && (c.outcome = 'lose'),
    c
  );
}
function Gp(a) {
  let u = 0,
    o = 0;
  for (const c of a.enemies) {
    if (!c.enemyId) continue;
    const r = Mn[c.enemyId],
      d = Dp(a.depth, r.refDepth);
    ((u += Math.round(r.exp * d)), (o += Math.round(r.gold * d)));
  }
  return { exp: u, gold: o };
}
function G1(a, u) {
  let o = a.level,
    c = a.exp + (Yo(o) ? u : 0),
    r = a.skillPoints.total;
  for (; Yo(o) && c >= Zh(o); ) ((c -= Zh(o)), (o += 1), (r += ze.SP_PER_LEVEL));
  return {
    ...a,
    level: o,
    exp: Yo(a.level) ? c : a.exp,
    skillPoints: { ...a.skillPoints, total: r },
  };
}
function Fh(a, u) {
  if (!a.diveState) return a;
  const o = u.outcome === 'win',
    c = u.outcome === 'win' || u.outcome === 'fled',
    r = new Map(u.allies.map((S) => [S.id, S])),
    d = a.diveState.party.map((S) => {
      const O = r.get(S.charId);
      if (!O) return S;
      let C = O.unionGauge;
      return (
        c && !O.isDown && (C = Ml(C + ze.UNION_GAIN_ON_WIN, 0, 100)),
        { ...S, hp: O.hp, tp: O.tp, unionGauge: C, ailments: O.ailments }
      );
    });
  let h = a.guild.members,
    _ = a.guild.gold;
  const g = { ...a.bestiary.monsters };
  for (const S of u.enemies) {
    if (!S.enemyId) continue;
    const O = g[S.enemyId] ?? { seen: !1, defeated: !1, dropsFound: [] };
    g[S.enemyId] = { ...O, seen: !0, defeated: O.defeated || S.isDown };
  }
  if (o)
    for (const S of u.drops) {
      const O = g[S.enemyId];
      O &&
        !O.dropsFound.includes(S.itemId) &&
        (g[S.enemyId] = { ...O, dropsFound: [...O.dropsFound, S.itemId] });
    }
  const m = { ...a.bestiary, monsters: g };
  if (o) {
    const { exp: S, gold: O } = Gp(u);
    _ += O;
    const C = new Set(d.map((R) => R.charId)),
      b = C.size > 0 ? Math.floor(S / C.size) : 0;
    h = h.map((R) => (C.has(R.id) ? G1(R, b) : R));
  }
  let v = {
    ...a,
    guild: { ...a.guild, members: h, gold: _, bestiary: m },
    bestiary: m,
    diveState: { ...a.diveState, party: d },
  };
  for (const S of u.consumedItems) v = Ni(v, S, 1);
  if (o) for (const S of u.drops) v = fs(v, S.itemId, 1);
  return v;
}
const Y1 = 8,
  tr = 16,
  Ei = 5;
function Er(a) {
  return a.range(Y1, tr);
}
function X1(a, u) {
  const o = a - 1;
  return o <= 0
    ? { stepsUntilEncounter: Er(u), triggered: !0 }
    : { stepsUntilEncounter: o, triggered: !1 };
}
function V1(a) {
  const u = Math.max(0, tr - a),
    o = Math.round((u / tr) * Ei);
  return Math.min(Ei, Math.max(0, o));
}
const Zt = { N: { dx: 0, dy: -1 }, E: { dx: 1, dy: 0 }, S: { dx: 0, dy: 1 }, W: { dx: -1, dy: 0 } },
  va = ['N', 'E', 'S', 'W'];
function Yp(a) {
  return va[(va.indexOf(a) + 1) % 4];
}
function Xp(a) {
  return va[(va.indexOf(a) + 3) % 4];
}
function Q1(a) {
  return va[(va.indexOf(a) + 2) % 4];
}
const Z1 = (a, u, o) => a >= 0 && u >= 0 && a < o.width && u < o.height;
function ya(a, u, o, c) {
  if (a.cells[o][u].walls[c]) return !1;
  const r = u + Zt[c].dx,
    d = o + Zt[c].dy;
  return Z1(r, d, a) ? a.cells[d][r].passable : !1;
}
function $1(a, u, o) {
  return ya(a, u.x, u.y, o) ? { x: u.x + Zt[o].dx, y: u.y + Zt[o].dy } : null;
}
function Tr(a, u, o) {
  return ['N', 'E', 'S', 'W'].filter((c) => !a.cells[o][u].walls[c]);
}
const Ph = ['N', 'E', 'S', 'W'],
  Qo = (a, u) => Math.abs(a.x - u.x) + Math.abs(a.y - u.y);
function K1(a, u, o, c, r) {
  const d = u.map((v) => ({ ...v, cell: { ...v.cell } })),
    h = new Map(a.foeSpawns.map((v) => [v.id, v])),
    _ = new Set(d.filter((v) => !v.defeated).map((v) => `${v.cell.x},${v.cell.y}`));
  let g = null;
  const m = [...d].sort((v, S) => v.spawnId.localeCompare(S.spawnId, void 0, { numeric: !0 }));
  for (const v of m) {
    if (g) break;
    if (v.defeated) continue;
    const S = h.get(v.spawnId);
    if (!S) continue;
    !v.alerted && Qo(v.cell, o) <= S.sightRange && (v.alerted = !0);
    const O = (C) => {
      if (!ya(a, v.cell.x, v.cell.y, C)) return 'blocked';
      const b = v.cell.x + Zt[C].dx,
        R = v.cell.y + Zt[C].dy;
      if (b === o.x && R === o.y) {
        const T = C === c;
        return (
          (g = { spawnId: v.spawnId, enemyId: S.enemyId, firstStrike: T ? 'ambush' : 'none' }),
          'contact'
        );
      }
      return _.has(`${b},${R}`)
        ? 'blocked'
        : (_.delete(`${v.cell.x},${v.cell.y}`),
          (v.cell = { x: b, y: R }),
          _.add(`${b},${R}`),
          'moved');
    };
    if (v.alerted)
      for (let C = 0; C < S.moveSpeed; C++) {
        let b = null,
          R = Qo(v.cell, o),
          T = !1;
        for (const $ of Ph) {
          const Q = v.cell.x + Zt[$].dx,
            D = v.cell.y + Zt[$].dy;
          if (Q === o.x && D === o.y && ya(a, v.cell.x, v.cell.y, $)) {
            ((b = $), (T = !0));
            break;
          }
          if (!ya(a, v.cell.x, v.cell.y, $) || _.has(`${Q},${D}`)) continue;
          const U = Qo({ x: Q, y: D }, o);
          U < R && ((R = U), (b = $));
        }
        if (!b) break;
        const q = O(b);
        if (q === 'contact' || q === 'blocked' || T) break;
      }
    else {
      const C = S.patrol;
      if (C.kind === 'wander') {
        const b = Ph.filter(
          (R) =>
            ya(a, v.cell.x, v.cell.y, R) && !_.has(`${v.cell.x + Zt[R].dx},${v.cell.y + Zt[R].dy}`)
        );
        b.length > 0 && O(r.pick(b));
      } else C.kind === 'charge' && O(C.dir);
    }
  }
  return { foes: d, contact: g };
}
function J1(a) {
  return Object.values(Mn)
    .filter((u) => u.tierBand === a && !u.id.startsWith('enemy_boss'))
    .map((u) => u.id);
}
const Al = { N: { dx: 0, dy: -1 }, E: { dx: 1, dy: 0 }, S: { dx: 0, dy: 1 }, W: { dx: -1, dy: 0 } },
  I1 = { N: 'S', E: 'W', S: 'N', W: 'E' };
function W1(a) {
  return Math.min(25, 15 + Math.floor(a / 5));
}
function F1() {
  return { walls: { N: !0, E: !0, S: !0, W: !0 }, floorType: 'normal', passable: !0 };
}
const lr = (a, u, o, c) => a >= 0 && u >= 0 && a < o && u < c;
function ep(a, u, o, c) {
  const { dx: r, dy: d } = Al[c];
  ((a[o][u].walls[c] = !1), (a[o + d][u + r].walls[I1[c]] = !1));
}
function P1(a, u, o) {
  const c = a.length,
    r = a[0].length,
    d = Array.from({ length: c }, () => Array(r).fill(-1)),
    h = [{ x: u, y: o }];
  d[o][u] = 0;
  for (let _ = 0; _ < h.length; _++) {
    const { x: g, y: m } = h[_];
    for (const v of ['N', 'E', 'S', 'W']) {
      if (a[m][g].walls[v]) continue;
      const S = g + Al[v].dx,
        O = m + Al[v].dy;
      !lr(S, O, r, c) || d[O][S] !== -1 || ((d[O][S] = d[m][g] + 1), h.push({ x: S, y: O }));
    }
  }
  return d;
}
function eb(a, u) {
  const o = W1(a),
    c = o,
    r = o,
    d = Array.from({ length: r }, () => Array.from({ length: c }, () => F1())),
    h = Array.from({ length: r }, () => Array(c).fill(!1)),
    _ = u.int(c),
    g = u.int(r),
    m = [{ x: _, y: g }];
  for (h[g][_] = !0; m.length > 0; ) {
    const Q = m[m.length - 1],
      D = [];
    for (const B of ['N', 'E', 'S', 'W']) {
      const F = Q.x + Al[B].dx,
        le = Q.y + Al[B].dy;
      lr(F, le, c, r) && !h[le][F] && D.push(B);
    }
    if (D.length === 0) {
      m.pop();
      continue;
    }
    const U = u.pick(D);
    ep(d, Q.x, Q.y, U);
    const K = Q.x + Al[U].dx,
      Z = Q.y + Al[U].dy;
    ((h[Z][K] = !0), m.push({ x: K, y: Z }));
  }
  const v = Math.floor((c * r) / 25);
  for (let Q = 0; Q < v; Q++) {
    const D = u.int(c),
      U = u.int(r),
      K = u.pick(['N', 'E', 'S', 'W']),
      Z = D + Al[K].dx,
      B = U + Al[K].dy;
    lr(Z, B, c, r) && d[U][D].walls[K] && ep(d, D, U, K);
  }
  const S = u.int(c),
    O = u.int(r),
    C = P1(d, S, O);
  let b = S,
    R = O,
    T = -1;
  for (let Q = 0; Q < r; Q++)
    for (let D = 0; D < c; D++) C[Q][D] > T && ((T = C[Q][D]), (b = D), (R = Q));
  ((d[O][S].event = { kind: 'stairsDown' }), (d[R][b].event = { kind: 'stairsUp' }));
  const q = Math.floor((a - 1) / 10),
    $ = [];
  if (!ls(a)) {
    const Q = J1(q),
      D = 1 + Math.floor(a / 8);
    for (let U = 0; U < D && Q.length > 0; U++) {
      let K = u.int(c),
        Z = u.int(r);
      for (let B = 0; B < 20; B++) {
        ((K = u.int(c)), (Z = u.int(r)));
        const F = d[Z][K].event,
          le = Math.abs(K - S) + Math.abs(Z - O) >= 3;
        if (!F && le) break;
      }
      $.push({
        id: `foe_${U}`,
        enemyId: u.pick(Q),
        startCell: { x: K, y: Z },
        patrol: { kind: 'wander' },
        moveSpeed: 1,
        sightRange: 3,
        respawn: !1,
      });
    }
  }
  return {
    depth: a,
    width: c,
    height: r,
    cells: d,
    encounterTable: `band_${q}`,
    foeSpawns: $,
    bgmId: ls(a) ? 'bgm_boss' : 'bgm_dungeon',
  };
}
function Vp(a, u) {
  var o;
  for (let c = 0; c < a.height; c++)
    for (let r = 0; r < a.width; r++)
      if (((o = a.cells[c][r].event) == null ? void 0 : o.kind) === u) return { x: r, y: c };
  return null;
}
const tb = 4294967296;
function lb(a, u) {
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
class Nr {
  constructor(u, o) {
    jo(this, 'baseSeed');
    jo(this, '_state');
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
      ((u ^ (u >>> 14)) >>> 0) / tb
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
    const o = lb(this.baseSeed, u);
    return new Nr(o, o);
  }
}
function xa(a) {
  return new Nr(a, a);
}
function nb() {
  return Math.floor(Math.random() * 4294967296) >>> 0;
}
const tp = (a, u) => `${a},${u}`;
function ab(a, u) {
  return xa(a).fork(`floor:${u}`);
}
function Qp(a, u) {
  const o = a.towerState.floors[u];
  if (o) return { save: a, floor: o };
  const c = eb(u, ab(a.masterSeed, u)),
    r = c.foeSpawns.map((_) => ({
      spawnId: _.id,
      cell: { ..._.startCell },
      defeated: !1,
      alerted: !1,
    })),
    d = {
      depth: u,
      seed: a.masterSeed,
      generated: c,
      isBossFloor: ls(u),
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
function ib(a) {
  const u = [...a.guild.party.front, ...a.guild.party.back].filter((c) => c !== null),
    o = [];
  for (const c of u) {
    const r = a.guild.members.find((h) => h.id === c);
    if (!r) continue;
    const d = ki(r);
    o.push({ charId: c, hp: d.hp, tp: d.tp, unionGauge: 0, ailments: [] });
  }
  return o;
}
function is(a, u, o, c) {
  const r = a.towerState.floors[u].generated,
    d = new Set(a.exploredCells[u] ?? []);
  d.add(tp(o, c));
  for (const h of Tr(r, o, c)) {
    const _ = o + (h === 'E' ? 1 : h === 'W' ? -1 : 0),
      g = c + (h === 'S' ? 1 : h === 'N' ? -1 : 0);
    d.add(tp(_, g));
  }
  return { ...a, exploredCells: { ...a.exploredCells, [u]: [...d] } };
}
function Zp(a, u, o) {
  var g, m;
  const c = Qp(a, u);
  let r = c.save;
  const d = c.floor.generated,
    h = Vp(d, 'stairsDown') ?? { x: 0, y: 0 },
    _ = Tr(d, h.x, h.y)[0] ?? 'N';
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
        pos: { x: h.x, y: h.y },
        dir: _,
        party: ((g = r.diveState) == null ? void 0 : g.party) ?? ib(r),
        persistentSummons: ((m = r.diveState) == null ? void 0 : m.persistentSummons) ?? [],
        encounter: { stepsUntilEncounter: Er(o) },
        pendingFoeBattle: null,
      },
    }),
    is(r, u, h.x, h.y)
  );
}
function ub(a, u = 1) {
  const o = xa(a.masterSeed).fork(`dive:${a.towerState.record.totalDives}`),
    c = {
      ...a,
      diveState: null,
      towerState: {
        ...a.towerState,
        record: { ...a.towerState.record, totalDives: a.towerState.record.totalDives + 1 },
      },
    };
  return Zp(c, u, o);
}
function $p(a, u) {
  return a.diveState ? { ...a, diveState: { ...a.diveState, dir: u } } : a;
}
function Kp(a, u, o) {
  const c = a.towerState.floors[u];
  return {
    ...a,
    towerState: {
      ...a.towerState,
      floors: { ...a.towerState.floors, [u]: { ...c, foeRuntime: o } },
    },
  };
}
function sb(a, u, o) {
  const c = a.diveState;
  if (!c) return { save: a, moved: !1, triggered: !1 };
  const r = a.towerState.floors[c.depth],
    d = r.generated,
    h = $1(d, c.pos, u);
  if (!h) return { save: $p(a, u), moved: !1, triggered: !1 };
  const _ = r.foeRuntime.find((S) => !S.defeated && S.cell.x === h.x && S.cell.y === h.y);
  if (_) {
    const S = d.foeSpawns.find((b) => b.id === _.spawnId),
      O = S ? { spawnId: _.spawnId, enemyId: S.enemyId, firstStrike: 'preemptive' } : null;
    let C = { ...a, diveState: { ...c, pos: h, dir: u, pendingFoeBattle: O } };
    return ((C = is(C, c.depth, h.x, h.y)), { save: C, moved: !0, triggered: O !== null });
  }
  const g = X1(c.encounter.stepsUntilEncounter, o);
  let m = {
    ...a,
    diveState: {
      ...c,
      pos: h,
      dir: u,
      encounter: { stepsUntilEncounter: g.stepsUntilEncounter },
      pendingFoeBattle: null,
    },
  };
  m = is(m, c.depth, h.x, h.y);
  const v = K1(d, r.foeRuntime, h, u, o);
  return (
    (m = Kp(m, c.depth, v.foes)),
    v.contact
      ? ((m = {
          ...m,
          diveState: {
            ...m.diveState,
            pendingFoeBattle: {
              spawnId: v.contact.spawnId,
              enemyId: v.contact.enemyId,
              firstStrike: v.contact.firstStrike,
            },
          },
        }),
        { save: m, moved: !0, triggered: !0 })
      : { save: m, moved: !0, triggered: g.triggered }
  );
}
function cb(a, u) {
  const o = a.diveState;
  if (!o) return a;
  const c = o.pendingFoeBattle;
  let r = { ...a, diveState: { ...o, pendingFoeBattle: null } };
  if (c && u) {
    const h = r.towerState.floors[o.depth].foeRuntime.map((_) =>
      _.spawnId === c.spawnId ? { ..._, defeated: !0 } : _
    );
    r = Kp(r, o.depth, h);
  }
  return r;
}
function lp(a) {
  const u = a.diveState;
  if (!u) return null;
  const o = a.towerState.floors[u.depth].generated.cells[u.pos.y][u.pos.x].event;
  return (o == null ? void 0 : o.kind) === 'stairsUp' ||
    (o == null ? void 0 : o.kind) === 'stairsDown'
    ? o.kind
    : null;
}
function ob(a) {
  if (!a.diveState) return a;
  const u = a.diveState.depth + 1,
    o = xa(a.masterSeed).fork(`enc:${u}:${a.towerState.record.totalDives}`);
  return Zp(a, u, o);
}
function rb(a) {
  if (!a.diveState) return a;
  const u = a.diveState.depth;
  if (u <= 1) return Ai(a);
  const o = u - 1,
    c = Qp(a, o),
    r = Vp(c.floor.generated, 'stairsUp') ?? { x: 0, y: 0 },
    d = xa(a.masterSeed).fork(`enc:${o}:${a.towerState.record.totalDives}`);
  let h = c.save;
  const _ = c.floor.generated,
    g = Tr(_, r.x, r.y)[0] ?? 'N';
  return (
    (h = {
      ...h,
      diveState: {
        ...h.diveState,
        depth: o,
        pos: { x: r.x, y: r.y },
        dir: g,
        encounter: { stepsUntilEncounter: Er(d) },
        pendingFoeBattle: null,
      },
    }),
    is(h, o, r.x, r.y)
  );
}
function Ai(a) {
  return { ...a, diveState: null };
}
const fb = { 10: 'enemy_boss_gatekeeper' };
function db(a) {
  const u = Math.floor((a - 1) / 10);
  return Object.values(Mn)
    .filter((o) => o.tierBand === u && !o.id.startsWith('enemy_boss'))
    .map((o) => o.id);
}
function mb(a, u) {
  if (ls(a)) {
    const r = fb[a];
    if (r) return [r];
  }
  const o = db(a);
  if (o.length === 0) return [];
  const c = u.range(1, 3);
  return Array.from({ length: c }, () => u.pick(o));
}
const Pu = 1,
  hb = { autoMap: 'on', bgmVolume: 0.6, seVolume: 0.6 };
function np() {
  return { monsters: {}, items: {} };
}
function pb() {
  return { deepestReached: 0, highestBossDefeated: 0, totalDives: 0, bossDefeatLog: [] };
}
const yb = () => ({ weapon: null, armor: null, accessory: null });
function gb() {
  return `char_${Date.now().toString(36)}_${Math.floor(Math.random() * 16777215).toString(36)}`;
}
function Jp(a) {
  var _;
  const { raceId: u, classId: o, name: c, id: r } = a;
  if (!$t[u]) throw new Error(`createCharacter: 未定義の種族 "${u}"`);
  if (!ft[o]) throw new Error(`createCharacter: 未定義の職業 "${o}"`);
  const d = (_ = ft[o].skillTree.skills[0]) == null ? void 0 : _.skillId,
    h = d ? { [d]: 1 } : {};
  return {
    id: r ?? gb(),
    name: c,
    raceId: u,
    classId: o,
    titleId: null,
    level: 1,
    exp: 0,
    skillPoints: { total: 0, spent: 0 },
    learnedSkills: h,
    equipment: yb(),
  };
}
function vb() {
  return { front: Array(os).fill(null), back: Array(rs).fill(null) };
}
function _b(a, u) {
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
function bb(a, u) {
  return a.guild.members.length >= Po
    ? a
    : {
        ...a,
        guild: { ...a.guild, members: [...a.guild.members, u], party: _b(a.guild.party, u.id) },
      };
}
function Sb(a) {
  return {
    schemaVersion: Pu,
    savedAt: 0,
    masterSeed: nb(),
    settings: { ...hb },
    guild: { name: a, gold: _1, members: [], party: vb(), storage: [], bestiary: np() },
    towerState: { floors: {}, bossGates: {}, warp: { unlockedCheckpoints: [] }, record: pb() },
    diveState: null,
    bestiary: np(),
    playerMaps: {},
    exploredCells: {},
    forgeInventory: { fragments: {}, ingots: { copper: 0, silver: 0, gold: 0 } },
    shopStock: { unlockedTier: 0, unlockedItemIds: [] },
    flags: {},
  };
}
const nr = (a, u) => u.some((o) => a instanceof o);
let ap, ip;
function xb() {
  return ap || (ap = [IDBDatabase, IDBObjectStore, IDBIndex, IDBCursor, IDBTransaction]);
}
function Eb() {
  return (
    ip ||
    (ip = [
      IDBCursor.prototype.advance,
      IDBCursor.prototype.continue,
      IDBCursor.prototype.continuePrimaryKey,
    ])
  );
}
const ar = new WeakMap(),
  Zo = new WeakMap(),
  ds = new WeakMap();
function Tb(a) {
  const u = new Promise((o, c) => {
    const r = () => {
        (a.removeEventListener('success', d), a.removeEventListener('error', h));
      },
      d = () => {
        (o(Cn(a.result)), r());
      },
      h = () => {
        (c(a.error), r());
      };
    (a.addEventListener('success', d), a.addEventListener('error', h));
  });
  return (ds.set(u, a), u);
}
function Nb(a) {
  if (ar.has(a)) return;
  const u = new Promise((o, c) => {
    const r = () => {
        (a.removeEventListener('complete', d),
          a.removeEventListener('error', h),
          a.removeEventListener('abort', h));
      },
      d = () => {
        (o(), r());
      },
      h = () => {
        (c(a.error || new DOMException('AbortError', 'AbortError')), r());
      };
    (a.addEventListener('complete', d),
      a.addEventListener('error', h),
      a.addEventListener('abort', h));
  });
  ar.set(a, u);
}
let ir = {
  get(a, u, o) {
    if (a instanceof IDBTransaction) {
      if (u === 'done') return ar.get(a);
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
function Ip(a) {
  ir = a(ir);
}
function Ab(a) {
  return Eb().includes(a)
    ? function (...u) {
        return (a.apply(ur(this), u), Cn(this.request));
      }
    : function (...u) {
        return Cn(a.apply(ur(this), u));
      };
}
function Cb(a) {
  return typeof a == 'function'
    ? Ab(a)
    : (a instanceof IDBTransaction && Nb(a), nr(a, xb()) ? new Proxy(a, ir) : a);
}
function Cn(a) {
  if (a instanceof IDBRequest) return Tb(a);
  if (Zo.has(a)) return Zo.get(a);
  const u = Cb(a);
  return (u !== a && (Zo.set(a, u), ds.set(u, a)), u);
}
const ur = (a) => ds.get(a);
function Mb(a, u, { blocked: o, upgrade: c, blocking: r, terminated: d } = {}) {
  const h = indexedDB.open(a, u),
    _ = Cn(h);
  return (
    c &&
      h.addEventListener('upgradeneeded', (g) => {
        c(Cn(h.result), g.oldVersion, g.newVersion, Cn(h.transaction), g);
      }),
    o && h.addEventListener('blocked', (g) => o(g.oldVersion, g.newVersion, g)),
    _.then((g) => {
      (d && g.addEventListener('close', () => d()),
        r && g.addEventListener('versionchange', (m) => r(m.oldVersion, m.newVersion, m)));
    }).catch(() => {}),
    _
  );
}
const Rb = ['get', 'getKey', 'getAll', 'getAllKeys', 'count'],
  kb = ['put', 'add', 'delete', 'clear'],
  $o = new Map();
function up(a, u) {
  if (!(a instanceof IDBDatabase && !(u in a) && typeof u == 'string')) return;
  if ($o.get(u)) return $o.get(u);
  const o = u.replace(/FromIndex$/, ''),
    c = u !== o,
    r = kb.includes(o);
  if (!(o in (c ? IDBIndex : IDBObjectStore).prototype) || !(r || Rb.includes(o))) return;
  const d = async function (h, ..._) {
    const g = this.transaction(h, r ? 'readwrite' : 'readonly');
    let m = g.store;
    return (c && (m = m.index(_.shift())), (await Promise.all([m[o](..._), r && g.done]))[0]);
  };
  return ($o.set(u, d), d);
}
Ip((a) => ({
  ...a,
  get: (u, o, c) => up(u, o) || a.get(u, o, c),
  has: (u, o) => !!up(u, o) || a.has(u, o),
}));
const jb = ['continue', 'continuePrimaryKey', 'advance'],
  sp = {},
  sr = new WeakMap(),
  Wp = new WeakMap(),
  Ob = {
    get(a, u) {
      if (!jb.includes(u)) return a[u];
      let o = sp[u];
      return (
        o ||
          (o = sp[u] =
            function (...c) {
              sr.set(this, Wp.get(this)[u](...c));
            }),
        o
      );
    },
  };
async function* zb(...a) {
  let u = this;
  if ((u instanceof IDBCursor || (u = await u.openCursor(...a)), !u)) return;
  u = u;
  const o = new Proxy(u, Ob);
  for (Wp.set(o, u), ds.set(o, ur(u)); u; )
    (yield o, (u = await (sr.get(o) || u.continue())), sr.delete(o));
}
function cp(a, u) {
  return (
    (u === Symbol.asyncIterator && nr(a, [IDBIndex, IDBObjectStore, IDBCursor])) ||
    (u === 'iterate' && nr(a, [IDBIndex, IDBObjectStore]))
  );
}
Ip((a) => ({
  ...a,
  get(u, o, c) {
    return cp(u, o) ? zb : a.get(u, o, c);
  },
  has(u, o) {
    return cp(u, o) || a.has(u, o);
  },
}));
const Db = {};
function wb(a) {
  return structuredClone(a);
}
function bi(a) {
  return typeof a == 'object' && a !== null && !Array.isArray(a);
}
function Bb(a) {
  if (
    !bi(a) ||
    typeof a.schemaVersion != 'number' ||
    typeof a.masterSeed != 'number' ||
    !bi(a.guild)
  )
    return !1;
  const u = a.guild;
  return !(
    typeof u.name != 'string' ||
    !Array.isArray(u.members) ||
    !bi(a.towerState) ||
    !bi(a.towerState.record) ||
    typeof a.towerState.record.deepestReached != 'number'
  );
}
function Fp(a) {
  if (!bi(a) || typeof a.schemaVersion != 'number')
    return { ok: !1, reason: 'セーブデータの構造が不正です' };
  let u = a.schemaVersion;
  if (u > Pu) return { ok: !1, reason: `未知のバージョン (${u} > ${Pu}) のセーブデータです` };
  let o = { ...a };
  for (; u < Pu; ) {
    const c = Db[u];
    if (!c) return { ok: !1, reason: `バージョン ${u} の migration が未定義です` };
    ((o = c(o)), (u = typeof o.schemaVersion == 'number' ? o.schemaVersion : u + 1));
  }
  return Bb(o)
    ? { ok: !0, data: o }
    : { ok: !1, reason: 'migration 後のデータが SaveData の形をしていません' };
}
function Ub(a) {
  return {
    guildName: a.guild.name,
    deepestReached: a.towerState.record.deepestReached,
    memberCount: a.guild.members.length,
    savedAt: a.savedAt,
  };
}
function op() {
  return {
    guildName: '(破損データ)',
    deepestReached: 0,
    memberCount: 0,
    savedAt: 0,
    corrupted: !0,
  };
}
const qb = 'sekaiju-like-game',
  Lb = 1,
  Ci = 'saves',
  Ar = 'main';
let Ko = null;
function Cr() {
  return (
    Ko ||
      (Ko = Mb(qb, Lb, {
        upgrade(a) {
          a.objectStoreNames.contains(Ci) || a.createObjectStore(Ci);
        },
      })),
    Ko
  );
}
async function Jo(a) {
  const u = { ...a, savedAt: Date.now() };
  return (await (await Cr()).put(Ci, wb(u), Ar), u);
}
async function Hb() {
  const u = await (await Cr()).get(Ci, Ar);
  return u === void 0 ? { ok: !1, reason: 'empty' } : Fp(u);
}
async function Gb() {
  const u = await (await Cr()).get(Ci, Ar);
  if (u === void 0) return null;
  const o = Fp(u);
  if (!o.ok) return op();
  try {
    return Ub(o.data);
  } catch {
    return op();
  }
}
const Pp = { save: null, saving: !1 };
function Yb(a, u) {
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
      return { ...Pp };
  }
}
const ey = A.createContext(null);
function Xb(a) {
  const u = A.useRef(a);
  return ((u.current = a), u);
}
function Vb({ children: a }) {
  const [u, o] = A.useReducer(Yb, Pp),
    c = Xb(u),
    r = A.useCallback(async (S) => {
      const O = Sb(S),
        C = await Jo(O);
      o({ type: 'load', save: C });
    }, []),
    d = A.useCallback(async () => {
      const S = await Hb();
      return S.ok ? (o({ type: 'load', save: S.data }), { ok: !0 }) : { ok: !1, reason: S.reason };
    }, []),
    h = A.useCallback((S) => {
      o({ type: 'updateSave', updater: S });
    }, []),
    _ = A.useCallback(
      async (S) => {
        const O = c.current.save;
        if (!O) return;
        const C = S(O);
        (o({ type: 'setSave', save: C }), o({ type: 'saving', saving: !0 }));
        try {
          const b = await Jo(C);
          o({ type: 'setSave', save: b });
        } finally {
          o({ type: 'saving', saving: !1 });
        }
      },
      [c]
    ),
    g = A.useCallback(async () => {
      const { save: S } = c.current;
      if (S) {
        o({ type: 'saving', saving: !0 });
        try {
          const O = await Jo(S);
          o({ type: 'setSave', save: O });
        } finally {
          o({ type: 'saving', saving: !1 });
        }
      }
    }, [c]),
    m = A.useCallback(() => {
      o({ type: 'clear' });
    }, []),
    v = A.useMemo(
      () => ({
        ...u,
        startNewGame: r,
        continueGame: d,
        applySave: h,
        applyAndPersist: _,
        persist: g,
        exitToTitle: m,
      }),
      [u, r, d, h, _, g, m]
    );
  return y.jsx(ey.Provider, { value: v, children: a });
}
function Rn() {
  const a = A.useContext(ey);
  if (!a) throw new Error('useGameState は GameStateProvider の内側で使ってください');
  return a;
}
const Qb = () => {
    var tt, Ge;
    const a = jl(),
      { save: u, applyAndPersist: o } = Rn(),
      c = A.useRef(null),
      [r, d] = A.useState(null),
      [h, _] = A.useState({}),
      [g, m] = A.useState(null),
      [v, S] = A.useState(!1),
      [O, C] = A.useState(!1),
      [b, R] = A.useState(null),
      [T, q] = A.useState(!1),
      [$, Q] = A.useState(null),
      [D, U] = A.useState(null);
    A.useEffect(() => {
      if (r || !(u != null && u.diveState)) return;
      const X = u.diveState.depth,
        ae = (u.masterSeed ^ (X * 2654435761) ^ (u.towerState.record.totalDives * 40503)) >>> 0;
      c.current = xa(ae);
      const ce = u.diveState.pendingFoeBattle;
      d(ce ? Kh(u, [ce.enemyId], ce.firstStrike) : Kh(u, mb(X, c.current)));
    }, [u, r]);
    const K = A.useRef(!1);
    A.useEffect(() => {
      !r ||
        !c.current ||
        K.current ||
        (r.turn === 1 &&
          r.firstStrike === 'ambush' &&
          r.outcome === 'ongoing' &&
          ((K.current = !0), d(Vo(r, [], c.current))));
    }, [r]);
    const Z = A.useMemo(() => (r == null ? void 0 : r.enemies.filter((X) => !X.isDown)) ?? [], [r]),
      B = A.useMemo(() => (r == null ? void 0 : r.allies.filter((X) => !X.isDown)) ?? [], [r]);
    (A.useEffect(() => {
      Z.length > 0 && !Z.some((X) => X.id === b) && R(Z[0].id);
    }, [Z, b]),
      A.useEffect(() => {
        if ((r == null ? void 0 : r.outcome) !== 'ongoing' || (g && B.some((ae) => ae.id === g)))
          return;
        const X = B.find((ae) => !h[ae.id]) ?? null;
        m(X ? X.id : null);
      }, [r, B, g, h]));
    const F = B.length > 0 && B.every((X) => h[X.id] !== void 0),
      le = A.useCallback(
        (X, ae) => {
          const ce = { ...h, [X]: ae };
          (_(ce), S(!1), C(!1));
          const Ae = B.find((Se) => Se.id !== X && !ce[Se.id]);
          m(Ae ? Ae.id : null);
        },
        [h, B]
      ),
      re = A.useCallback(
        async (X) => {
          q(!0);
          const ae = X.outcome === 'win';
          X.outcome === 'lose'
            ? (await o((ce) => Ai(Fh(ce, X))), a('/town'))
            : (await o((ce) => cb(Fh(ce, X), ae)), a('/dungeon'));
        },
        [o, a]
      ),
      de = A.useCallback(() => {
        var X;
        (_({}), S(!1), C(!1), Q(null), U(null), m(((X = B[0]) == null ? void 0 : X.id) ?? null));
      }, [B]),
      at = A.useCallback(() => {
        var Ae;
        if (!r || !c.current || r.outcome !== 'ongoing') return;
        const X = b ?? ((Ae = Z[0]) == null ? void 0 : Ae.id) ?? '',
          ae = B.map((Se) => {
            const pt = h[Se.id] ?? { kind: 'attack' };
            return pt.kind === 'guard'
              ? { kind: 'guard', actorId: Se.id }
              : pt.kind === 'skill'
                ? { kind: 'skill', actorId: Se.id, skillId: pt.skillId, targetId: X }
                : pt.kind === 'item'
                  ? { kind: 'item', actorId: Se.id, itemId: pt.itemId, targetId: Se.id }
                  : { kind: 'attack', actorId: Se.id, targetId: X };
          });
        if ($) {
          const Se = Si[$.unionSkillId],
            pt =
              (Se == null ? void 0 : Se.target) === 'enemyOne' ||
              (Se == null ? void 0 : Se.target) === 'enemyRow' ||
              (Se == null ? void 0 : Se.target) === 'enemyAll';
          ae.unshift({ kind: 'union', ...$, targetId: pt ? X : $.targetId });
        }
        const ce = Vo(r, ae, c.current);
        (d(ce), _({}), S(!1), C(!1), Q(null), U(null), m(null));
      }, [r, h, b, B, Z, $]),
      ht = A.useCallback(() => {
        if (!r || !c.current || r.outcome !== 'ongoing') return;
        const X = B[0];
        X && (d(Vo(r, [{ kind: 'flee', actorId: X.id }], c.current)), _({}), m(null));
      }, [r, B]);
    if (!u || !u.diveState) return y.jsx(kl, { to: '/town', replace: !0 });
    if (!r) return y.jsx('div', { className: W.layout, children: '戦闘準備中...' });
    const He = (X) => {
        const ae = u.guild.members.find((ce) => ce.id === X.id);
        return ae
          ? Object.keys(ae.learnedSkills).filter((ce) => ce in An && X.tp >= An[ce].tpCost(1))
          : [];
      },
      L = () => {
        const X = (ce) =>
            Object.values(h).filter((Ae) => Ae.kind === 'item' && Ae.itemId === ce).length,
          ae = (ce) => r.consumedItems.filter((Ae) => Ae === ce).length;
        return u.guild.storage
          .filter((ce) => {
            var Ae, Se;
            return (Se = (Ae = mt[ce.itemId]) == null ? void 0 : Ae.useContext) == null
              ? void 0
              : Se.includes('battle');
          })
          .map((ce) => ({
            id: ce.itemId,
            remaining: Bp(u, ce.itemId) - ae(ce.itemId) - X(ce.itemId),
          }))
          .filter((ce) => ce.remaining > 0);
      },
      J = (X) => {
        var ce, Ae;
        const ae = h[X.id];
        return ae
          ? ae.kind === 'attack'
            ? '攻撃'
            : ae.kind === 'guard'
              ? '防御'
              : ae.kind === 'item'
                ? (((ce = mt[ae.itemId]) == null ? void 0 : ce.name) ?? 'どうぐ')
                : (((Ae = An[ae.skillId]) == null ? void 0 : Ae.name) ?? 'スキル')
          : '';
      },
      ie = (X) => {
        const ae = (Ae) => Ae === 'headBind' || Ae === 'armBind' || Ae === 'legBind';
        let ce = '';
        return (
          X.ailments.some((Ae) => ae(Ae.type)) && (ce += ' 🔒'),
          X.ailments.some((Ae) => !ae(Ae.type)) && (ce += ' 🌀'),
          ce
        );
      },
      Me = (X) => {
        var Ae;
        const ae = u.guild.members.find((Se) => Se.id === X.id);
        if (!ae) return null;
        const ce = (Ae = $t[ae.raceId]) == null ? void 0 : Ae.unionSkillTree.skills[0];
        return !ce || !(ce.skillId in ae.learnedSkills) ? null : (Si[ce.skillId] ?? null);
      },
      Re = (X, ae, ce) => {
        var pt;
        const Se =
          ae.target === 'enemyOne' || ae.target === 'enemyRow' || ae.target === 'enemyAll'
            ? (b ?? ((pt = Z[0]) == null ? void 0 : pt.id) ?? '')
            : X;
        (Q({ actorId: X, unionSkillId: ae.id, participantIds: ce, targetId: Se }), U(null));
      },
      N = (X, ae) => {
        ae.requiredParticipants <= 1 ? Re(X.id, ae, [X.id]) : U({ actorId: X.id, def: ae });
      },
      G = g ? B.find((X) => X.id === g) : void 0,
      I = ((tt = r.enemies.find((X) => X.id === b)) == null ? void 0 : tt.name) ?? '-',
      P = Gp(r),
      oe = (X) =>
        y.jsxs(
          'button',
          {
            type: 'button',
            className: [
              W.card,
              X.isDown ? W.down : '',
              g === X.id ? W.cardActive : '',
              h[X.id] ? W.cardDecided : '',
            ].join(' '),
            disabled: X.isDown || r.outcome !== 'ongoing',
            onClick: () => {
              (m(X.id), S(!1), C(!1));
            },
            children: [
              y.jsxs('div', {
                className: W.cardName,
                children: [
                  X.name,
                  X.unionGauge >= 100 ? y.jsx('span', { className: W.uni, children: '★' }) : null,
                  ie(X),
                ],
              }),
              y.jsx(Go, { value: X.hp, max: X.maxHp, color: '#4caf50', showValue: !1 }),
              y.jsx(Go, { value: X.tp, max: X.maxTp, color: '#2196f3', showValue: !1 }),
              y.jsxs('div', {
                className: W.cardNums,
                children: ['HP ', Math.max(0, X.hp), ' · TP ', X.tp],
              }),
              h[X.id] ? y.jsxs('div', { className: W.cardCmd, children: ['▶ ', J(X)] }) : null,
            ],
          },
          X.id
        ),
      pe = r.allies.filter((X) => X.row === 'front'),
      Ee = r.allies.filter((X) => X.row === 'back');
    return y.jsxs('div', {
      className: W.layout,
      children: [
        y.jsx('div', {
          className: W.enemies,
          children: r.enemies.map((X) =>
            y.jsxs(
              'button',
              {
                type: 'button',
                className: `${W.enemy} ${X.isDown ? W.down : ''} ${b === X.id ? W.targeted : ''}`,
                disabled: X.isDown,
                onClick: () => R(X.id),
                children: [
                  y.jsxs('span', { className: W.enemyName, children: [X.name, ie(X)] }),
                  y.jsx(Go, { value: X.hp, max: X.maxHp, color: '#e57373', showValue: !1 }),
                ],
              },
              X.id
            )
          ),
        }),
        y.jsxs('div', {
          className: W.party,
          children: [
            y.jsx('div', { className: W.rowTag, children: '前衛' }),
            y.jsx('div', { className: W.cardRow, children: pe.map(oe) }),
            y.jsx('div', { className: W.rowTag, children: '後衛（近接ダメージ -30%）' }),
            y.jsx('div', {
              className: W.cardRow,
              children:
                Ee.length > 0
                  ? Ee.map(oe)
                  : y.jsx('div', { className: W.empty, children: '（なし）' }),
            }),
          ],
        }),
        r.outcome !== 'ongoing'
          ? y.jsxs('div', {
              className: W.result,
              children: [
                y.jsx('div', {
                  className: W.resultTitle,
                  children:
                    r.outcome === 'win' ? '勝利！' : r.outcome === 'fled' ? '逃走した' : '全滅...',
                }),
                r.outcome === 'win'
                  ? y.jsxs('div', {
                      className: W.resultBody,
                      children: ['経験値 ', P.exp, ' ／ ', P.gold, ' G を獲得'],
                    })
                  : r.outcome === 'lose'
                    ? y.jsx('div', { className: W.resultBody, children: '拠点へ帰還する' })
                    : null,
                y.jsx('button', {
                  type: 'button',
                  className: W.primary,
                  disabled: T,
                  onClick: () => void re(r),
                  children: 'つづける',
                }),
              ],
            })
          : y.jsxs('div', {
              className: W.command,
              children: [
                y.jsxs('div', {
                  className: W.target,
                  children: ['対象: ', I, '（敵をタップで変更）'],
                }),
                $
                  ? y.jsxs('div', {
                      className: W.unionBanner,
                      children: [
                        '⚡ ユニオン予約: ',
                        (Ge = Si[$.unionSkillId]) == null ? void 0 : Ge.name,
                        y.jsx('button', {
                          type: 'button',
                          className: W.unionCancel,
                          onClick: () => Q(null),
                          children: '取消',
                        }),
                      ],
                    })
                  : null,
                G
                  ? y.jsxs(y.Fragment, {
                      children: [
                        y.jsxs('div', { className: W.cmdHead, children: [G.name, ' のコマンド'] }),
                        v
                          ? y.jsxs('div', {
                              className: W.skillList,
                              children: [
                                He(G).map((X) => {
                                  var ae;
                                  return y.jsxs(
                                    'button',
                                    {
                                      type: 'button',
                                      className: W.skillBtn,
                                      onClick: () => le(G.id, { kind: 'skill', skillId: X }),
                                      children: [
                                        y.jsxs('span', {
                                          className: W.skillTop,
                                          children: [
                                            y.jsx('span', {
                                              className: W.skillName,
                                              children: An[X].name,
                                            }),
                                            y.jsxs('span', {
                                              className: W.tp,
                                              children: ['TP ', An[X].tpCost(1)],
                                            }),
                                          ],
                                        }),
                                        y.jsx('span', {
                                          className: W.skillDesc,
                                          children:
                                            ((ae = vr[X]) == null ? void 0 : ae.description) ?? '',
                                        }),
                                      ],
                                    },
                                    X
                                  );
                                }),
                                He(G).length === 0
                                  ? y.jsx('div', {
                                      className: W.empty,
                                      children: '使えるスキルがない',
                                    })
                                  : null,
                                y.jsx('button', {
                                  type: 'button',
                                  className: W.menuBack,
                                  onClick: () => S(!1),
                                  children: 'もどる',
                                }),
                              ],
                            })
                          : O
                            ? y.jsxs('div', {
                                className: W.skillList,
                                children: [
                                  L().map(({ id: X, remaining: ae }) =>
                                    y.jsxs(
                                      'button',
                                      {
                                        type: 'button',
                                        className: W.skillBtn,
                                        onClick: () => le(G.id, { kind: 'item', itemId: X }),
                                        children: [
                                          y.jsx('span', {
                                            className: W.skillTop,
                                            children: y.jsxs('span', {
                                              className: W.skillName,
                                              children: [mt[X].name, ' ×', ae],
                                            }),
                                          }),
                                          y.jsx('span', {
                                            className: W.skillDesc,
                                            children: mt[X].description,
                                          }),
                                        ],
                                      },
                                      X
                                    )
                                  ),
                                  L().length === 0
                                    ? y.jsx('div', {
                                        className: W.empty,
                                        children: '使える道具がない',
                                      })
                                    : null,
                                  y.jsx('button', {
                                    type: 'button',
                                    className: W.menuBack,
                                    onClick: () => C(!1),
                                    children: 'もどる',
                                  }),
                                ],
                              })
                            : D
                              ? y.jsxs('div', {
                                  className: W.skillList,
                                  children: [
                                    y.jsxs('div', {
                                      className: W.unionHint,
                                      children: [
                                        D.def.name,
                                        '：協力者を選択（あと',
                                        D.def.requiredParticipants - 1,
                                        '人。各自ゲージ',
                                        D.def.gaugeCostPerParticipant,
                                        '消費）',
                                      ],
                                    }),
                                    B.filter((X) => X.id !== D.actorId).map((X) =>
                                      y.jsx(
                                        'button',
                                        {
                                          type: 'button',
                                          className: W.skillBtn,
                                          onClick: () => Re(D.actorId, D.def, [D.actorId, X.id]),
                                          children: y.jsxs('span', {
                                            className: W.skillTop,
                                            children: [
                                              y.jsx('span', {
                                                className: W.skillName,
                                                children: X.name,
                                              }),
                                              y.jsxs('span', {
                                                className: W.tp,
                                                children: ['ゲージ ', X.unionGauge],
                                              }),
                                            ],
                                          }),
                                        },
                                        X.id
                                      )
                                    ),
                                    B.filter((X) => X.id !== D.actorId).length === 0
                                      ? y.jsx('div', {
                                          className: W.empty,
                                          children: '協力できる味方がいない',
                                        })
                                      : null,
                                    y.jsx('button', {
                                      type: 'button',
                                      className: W.menuBack,
                                      onClick: () => U(null),
                                      children: 'もどる',
                                    }),
                                  ],
                                })
                              : y.jsxs('div', {
                                  className: W.menu,
                                  children: [
                                    y.jsx('button', {
                                      type: 'button',
                                      className: W.menuBtn,
                                      onClick: () => le(G.id, { kind: 'attack' }),
                                      children: '攻撃',
                                    }),
                                    y.jsx('button', {
                                      type: 'button',
                                      className: W.menuBtn,
                                      onClick: () => le(G.id, { kind: 'guard' }),
                                      children: '防御',
                                    }),
                                    y.jsx('button', {
                                      type: 'button',
                                      className: W.menuBtn,
                                      disabled: He(G).length === 0,
                                      onClick: () => S(!0),
                                      children: 'スキル',
                                    }),
                                    y.jsx('button', {
                                      type: 'button',
                                      className: W.menuBtn,
                                      disabled: L().length === 0,
                                      onClick: () => C(!0),
                                      children: 'どうぐ',
                                    }),
                                    (() => {
                                      const X = Me(G);
                                      return !X || G.unionGauge < 100 || $
                                        ? null
                                        : y.jsx('button', {
                                            type: 'button',
                                            className: `${W.menuBtn} ${W.unionBtn}`,
                                            onClick: () => N(G, X),
                                            children: '⚡ユニオン',
                                          });
                                    })(),
                                    y.jsx('button', {
                                      type: 'button',
                                      className: W.menuBtn,
                                      onClick: ht,
                                      children: '逃走',
                                    }),
                                  ],
                                }),
                      ],
                    })
                  : y.jsxs('div', {
                      className: W.execRow,
                      children: [
                        y.jsx('button', {
                          type: 'button',
                          className: W.redo,
                          onClick: de,
                          children: 'やり直す',
                        }),
                        y.jsx('button', {
                          type: 'button',
                          className: W.primary,
                          disabled: !F,
                          onClick: at,
                          children: '実行',
                        }),
                      ],
                    }),
              ],
            }),
        y.jsx('div', {
          className: W.log,
          children:
            r.log.length === 0
              ? y.jsxs('div', {
                  className: W.logLine,
                  children: ['てきが あらわれた！（', r.turn, ' ターン目）'],
                })
              : r.log.map((X, ae) => y.jsx('div', { className: W.logLine, children: X.text }, ae)),
        }),
      ],
    });
  },
  Zb = '_layout_1b11o_1',
  $b = '_head_1b11o_13',
  Kb = '_depth_1b11o_22',
  Jb = '_fpvWrap_1b11o_39',
  Ib = '_mapWrap_1b11o_45',
  Wb = '_palette_1b11o_52',
  Fb = '_tool_1b11o_62',
  Pb = '_toolActive_1b11o_73',
  eS = '_paletteHint_1b11o_79',
  tS = '_stairs_1b11o_88',
  lS = '_controls_1b11o_102',
  nS = '_row_1b11o_112',
  aS = '_forward_1b11o_118',
  iS = '_turn_1b11o_133',
  uS = '_back_1b11o_147',
  sS = '_itemOverlay_1b11o_158',
  cS = '_itemPanel_1b11o_168',
  oS = '_itemTitle_1b11o_181',
  rS = '_itemEmpty_1b11o_186',
  fS = '_itemRow_1b11o_192',
  dS = '_itemName_1b11o_200',
  mS = '_itemDesc_1b11o_208',
  hS = '_itemTargets_1b11o_214',
  pS = '_itemTarget_1b11o_214',
  yS = '_itemHp_1b11o_234',
  gS = '_itemUse_1b11o_240',
  vS = '_itemClose_1b11o_253',
  xe = {
    layout: Zb,
    head: $b,
    depth: Kb,
    return: '_return_1b11o_28',
    fpvWrap: Jb,
    mapWrap: Ib,
    palette: Wb,
    tool: Fb,
    toolActive: Pb,
    paletteHint: eS,
    stairs: tS,
    controls: lS,
    row: nS,
    forward: aS,
    turn: iS,
    back: uS,
    itemOverlay: sS,
    itemPanel: cS,
    itemTitle: oS,
    itemEmpty: rS,
    itemRow: fS,
    itemName: dS,
    itemDesc: mS,
    itemTargets: hS,
    itemTarget: pS,
    itemHp: yS,
    itemUse: gS,
    itemClose: vS,
  },
  _S = '_canvas_1keax_1',
  bS = { canvas: _S },
  ty = [
    { id: 'icon_chest', symbol: '📦', label: '宝箱' },
    { id: 'icon_foe', symbol: '👹', label: '強敵(FOE)' },
    { id: 'icon_warning', symbol: '⚠️', label: '注意' },
    { id: 'icon_door', symbol: '🚪', label: '扉/近道' },
    { id: 'icon_gather', symbol: '⛏️', label: '採集' },
    { id: 'icon_event', symbol: '❗', label: 'イベント' },
    { id: 'icon_note', symbol: '📝', label: 'メモ' },
    { id: 'icon_star', symbol: '⭐', label: '任意' },
  ],
  SS = new Map(ty.map((a) => [a.id, a]));
function xS(a) {
  var u;
  return ((u = SS.get(a)) == null ? void 0 : u.symbol) ?? '•';
}
const Tl = {
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
  ES = ({
    floor: a,
    explored: u,
    pos: o,
    dir: c,
    icons: r = [],
    foes: d = [],
    maxCell: h = 26,
    onCellClick: _,
  }) => {
    const g = A.useRef(null),
      m = Math.max(10, Math.min(h, Math.floor(360 / a.width))),
      v = a.width * m,
      S = a.height * m;
    A.useEffect(() => {
      const C = g.current;
      if (!C) return;
      const b = new Set(u),
        R = window.devicePixelRatio || 1;
      ((C.width = v * R), (C.height = S * R));
      const T = C.getContext('2d');
      if (!T) return;
      (T.scale(R, R), T.clearRect(0, 0, v, S));
      for (let Z = 0; Z < a.height; Z++)
        for (let B = 0; B < a.width; B++) {
          const F = b.has(`${B},${Z}`);
          ((T.fillStyle = F ? Tl.floor : Tl.fog),
            T.fillRect(B * m, Z * m, m, m),
            F &&
              ((T.strokeStyle = Tl.grid),
              (T.lineWidth = 1),
              T.strokeRect(B * m + 0.5, Z * m + 0.5, m - 1, m - 1)));
        }
      ((T.strokeStyle = Tl.wall), (T.lineWidth = 2), (T.lineCap = 'round'));
      const q = (Z, B, F, le) => {
        (T.beginPath(), T.moveTo(Z, B), T.lineTo(F, le), T.stroke());
      };
      for (let Z = 0; Z < a.height; Z++)
        for (let B = 0; B < a.width; B++) {
          if (!b.has(`${B},${Z}`)) continue;
          const F = a.cells[Z][B],
            le = B * m,
            re = Z * m;
          (F.walls.N && q(le, re, le + m, re),
            F.walls.S && q(le, re + m, le + m, re + m),
            F.walls.W && q(le, re, le, re + m),
            F.walls.E && q(le + m, re, le + m, re + m));
          const de = F.event;
          ((de == null ? void 0 : de.kind) === 'stairsUp' ||
            (de == null ? void 0 : de.kind) === 'stairsDown') &&
            ((T.fillStyle = de.kind === 'stairsUp' ? Tl.stairsUp : Tl.stairsDown),
            T.beginPath(),
            T.arc(le + m / 2, re + m / 2, m * 0.28, 0, Math.PI * 2),
            T.fill(),
            (T.fillStyle = '#ffffff'),
            (T.font = `bold ${Math.floor(m * 0.5)}px sans-serif`),
            (T.textAlign = 'center'),
            (T.textBaseline = 'middle'),
            T.fillText(de.kind === 'stairsUp' ? '▲' : '▼', le + m / 2, re + m / 2 + 1));
        }
      ((T.font = `${Math.floor(m * 0.66)}px sans-serif`),
        (T.textAlign = 'center'),
        (T.textBaseline = 'middle'));
      for (const Z of r)
        b.has(`${Z.x},${Z.y}`) && T.fillText(xS(Z.iconId), Z.x * m + m / 2, Z.y * m + m / 2 + 1);
      for (const Z of d) {
        if (!b.has(`${Z.x},${Z.y}`)) continue;
        const B = Z.x * m + m / 2,
          F = Z.y * m + m / 2;
        ((T.fillStyle = Z.alerted ? Tl.foeAlert : Tl.foe),
          T.beginPath(),
          T.arc(B, F, m * 0.3, 0, Math.PI * 2),
          T.fill(),
          (T.fillStyle = '#ffffff'),
          (T.font = `bold ${Math.floor(m * 0.5)}px sans-serif`),
          (T.textAlign = 'center'),
          (T.textBaseline = 'middle'),
          T.fillText('!', B, F + 1));
      }
      const $ = o.x * m + m / 2,
        Q = o.y * m + m / 2,
        D = m * 0.34,
        K = { N: -Math.PI / 2, E: 0, S: Math.PI / 2, W: Math.PI }[c];
      ((T.fillStyle = Tl.player),
        T.beginPath(),
        T.moveTo($ + Math.cos(K) * D, Q + Math.sin(K) * D),
        T.lineTo($ + Math.cos(K + 2.5) * D, Q + Math.sin(K + 2.5) * D),
        T.lineTo($ + Math.cos(K - 2.5) * D, Q + Math.sin(K - 2.5) * D),
        T.closePath(),
        T.fill());
    }, [a, u, o, c, r, d, m, v, S]);
    const O = (C) => {
      if (!_) return;
      const b = C.currentTarget.getBoundingClientRect(),
        R = Math.floor(((C.clientX - b.left) / b.width) * a.width),
        T = Math.floor(((C.clientY - b.top) / b.height) * a.height);
      R >= 0 && T >= 0 && R < a.width && T < a.height && _(R, T);
    };
    return y.jsx('canvas', {
      ref: g,
      className: bS.canvas,
      style: { width: v, height: S },
      onClick: O,
    });
  },
  TS = '_gauge_1o2hx_1',
  NS = '_icon_1o2hx_11',
  AS = '_segments_1o2hx_16',
  CS = '_seg_1o2hx_16',
  MS = '_filled_1o2hx_28',
  RS = '_danger_1o2hx_32',
  pa = { gauge: TS, icon: NS, segments: AS, seg: CS, filled: MS, danger: RS },
  kS = ({ level: a }) => {
    const u = a >= Ei;
    return y.jsxs('div', {
      className: pa.gauge,
      role: 'img',
      'aria-label': `エンカウントゲージ ${a}/${Ei}`,
      children: [
        y.jsx('span', { className: pa.icon, children: u ? '⚠' : '👣' }),
        y.jsx('div', {
          className: pa.segments,
          children: Array.from({ length: Ei }, (o, c) =>
            y.jsx(
              'span',
              { className: [pa.seg, c < a ? pa.filled : '', u ? pa.danger : ''].join(' ') },
              c
            )
          ),
        }),
      ],
    });
  },
  jS = '_view_tw2v9_1',
  OS = { view: jS },
  rp = { N: { dx: 0, dy: -1 }, E: { dx: 1, dy: 0 }, S: { dx: 0, dy: 1 }, W: { dx: -1, dy: 0 } };
function zS(a, u, o, c = 4) {
  const r = Xp(o),
    d = Yp(o),
    h = [];
  let { x: _, y: g } = u;
  for (let m = 0; m < c; m++) {
    const v = ya(a, _, g, o);
    if (
      (h.push({
        x: _,
        y: g,
        leftOpen: !a.cells[g][_].walls[r],
        rightOpen: !a.cells[g][_].walls[d],
        frontOpen: v,
        event: a.cells[g][_].event,
      }),
      !v)
    )
      break;
    ((_ += rp[o].dx), (g += rp[o].dy));
  }
  return h;
}
const Nl = {
    sky: '#26301c',
    ceiling: '#3a4a2c',
    floor: '#5d6b46',
    wall: '#8b9a6b',
    frontWall: '#7a8a5c',
    outline: '#2c3720',
  },
  DS = 0.56,
  wS = ({
    floor: a,
    pos: u,
    dir: o,
    foes: c = [],
    maxDepth: r = 4,
    width: d = 358,
    height: h = 200,
  }) => {
    const _ = A.useRef(null);
    return (
      A.useEffect(() => {
        const g = _.current;
        if (!g) return;
        const m = window.devicePixelRatio || 1;
        ((g.width = d * m), (g.height = h * m));
        const v = g.getContext('2d');
        if (!v) return;
        v.scale(m, m);
        const S = d,
          O = h,
          C = S / 2,
          b = O / 2,
          R = zS(a, u, o, r),
          T = (Q) => {
            const D = Math.pow(DS, Q);
            return {
              l: C - (S / 2) * D,
              r: C + (S / 2) * D,
              t: b - (O / 2) * D,
              b: b + (O / 2) * D,
            };
          },
          q = (Q, D, U = !1) => {
            (v.beginPath(), v.moveTo(Q[0][0], Q[0][1]));
            for (let K = 1; K < Q.length; K++) v.lineTo(Q[K][0], Q[K][1]);
            (v.closePath(),
              (v.fillStyle = D),
              v.fill(),
              U && ((v.strokeStyle = Nl.outline), (v.lineWidth = 1), v.stroke()));
          },
          $ = (Q) => `rgba(0,0,0,${Math.min(0.5, Q * 0.13)})`;
        ((v.fillStyle = Nl.sky), v.fillRect(0, 0, S, O));
        for (let Q = R.length - 1; Q >= 0; Q--) {
          const D = T(Q),
            U = T(Q + 1),
            K = R[Q];
          (q(
            [
              [D.l, D.t],
              [D.r, D.t],
              [U.r, U.t],
              [U.l, U.t],
            ],
            Nl.ceiling
          ),
            q(
              [
                [D.l, D.b],
                [D.r, D.b],
                [U.r, U.b],
                [U.l, U.b],
              ],
              Nl.floor
            ),
            q(
              [
                [D.l, D.t],
                [U.l, U.t],
                [U.l, U.b],
                [D.l, D.b],
              ],
              K.leftOpen ? Nl.sky : Nl.wall,
              !0
            ),
            q(
              [
                [D.r, D.t],
                [U.r, U.t],
                [U.r, U.b],
                [D.r, D.b],
              ],
              K.rightOpen ? Nl.sky : Nl.wall,
              !0
            ),
            K.frontOpen ||
              q(
                [
                  [U.l, U.t],
                  [U.r, U.t],
                  [U.r, U.b],
                  [U.l, U.b],
                ],
                Nl.frontWall,
                !0
              ),
            (v.fillStyle = $(Q)),
            v.fillRect(U.l, U.t, U.r - U.l, U.b - U.t));
          const Z = K.event;
          if (
            (Z == null ? void 0 : Z.kind) === 'stairsUp' ||
            (Z == null ? void 0 : Z.kind) === 'stairsDown'
          ) {
            const B = C,
              F = (D.b + U.b) / 2 - (D.b - U.b) * 0.15,
              le = Math.max(12, (D.b - D.t) * 0.18);
            ((v.fillStyle = Z.kind === 'stairsUp' ? '#e8923a' : '#7aa2d6'),
              v.beginPath(),
              v.arc(B, F, le, 0, Math.PI * 2),
              v.fill(),
              (v.fillStyle = '#fff'),
              (v.font = `bold ${Math.floor(le * 1.2)}px sans-serif`),
              (v.textAlign = 'center'),
              (v.textBaseline = 'middle'),
              v.fillText(Z.kind === 'stairsUp' ? '▲' : '▼', B, F + 1));
          }
          if (Q > 0 && c.some((B) => B.x === K.x && B.y === K.y)) {
            const B = c.some((de) => de.x === K.x && de.y === K.y && de.alerted),
              F = C,
              le = (D.b + U.b) / 2 - (D.b - U.b) * 0.1,
              re = Math.max(14, (D.b - D.t) * 0.22);
            ((v.fillStyle = B ? '#d32f2f' : '#b0533a'),
              v.beginPath(),
              v.arc(F, le, re, 0, Math.PI * 2),
              v.fill(),
              (v.fillStyle = '#fff'),
              (v.font = `bold ${Math.floor(re * 1.3)}px sans-serif`),
              (v.textAlign = 'center'),
              (v.textBaseline = 'middle'),
              v.fillText('!', F, le + 1));
          }
        }
      }, [a, u, o, c, r, d, h]),
      y.jsx('canvas', { ref: _, className: OS.view, style: { width: d, height: h } })
    );
  };
function BS(a, u, o) {
  var O, C;
  const c = mt[u];
  if (!c) return { save: a, ok: !1, message: 'そのアイテムは無い' };
  if (!((O = c.useContext) != null && O.includes('field')))
    return { save: a, ok: !1, message: 'ここでは使えない' };
  if ((((C = a.guild.storage.find((b) => b.itemId === u)) == null ? void 0 : C.qty) ?? 0) <= 0)
    return { save: a, ok: !1, message: '所持していない' };
  if (u === 'item_return_thread')
    return a.diveState
      ? { save: Ai(Ni(a, u, 1)), ok: !0, message: '拠点へ帰還した' }
      : { save: a, ok: !1, message: '探索中のみ使える' };
  if (!a.diveState) return { save: a, ok: !1, message: '探索中のみ使える' };
  const r = a.diveState.party.find((b) => b.charId === o),
    d = a.guild.members.find((b) => b.id === o);
  if (!r || !d) return { save: a, ok: !1, message: '対象がいない' };
  const h = ki(d);
  let _ = r.hp,
    g = r.tp,
    m = !1;
  for (const b of c.effects ?? [])
    b.kind === 'heal'
      ? ((_ = Math.min(h.hp, _ + b.amount(1))), (m = !0))
      : b.kind === 'restoreTp' && ((g = Math.min(h.tp, g + b.amount(1))), (m = !0));
  if (!m) return { save: a, ok: !1, message: 'いま使う効果がない' };
  const v = a.diveState.party.map((b) => (b.charId === o ? { ...b, hp: _, tp: g } : b));
  return {
    save: Ni({ ...a, diveState: { ...a.diveState, party: v } }, u, 1),
    ok: !0,
    message: `${d.name} に ${c.name} を使った`,
  };
}
function US(a) {
  return { depth: a, floorPaint: [], wallDraw: [], icons: [], notes: [], autopilotRoutes: [] };
}
function qS(a, u) {
  return a.playerMaps[u] ?? US(u);
}
function ly(a, u, o) {
  return { ...a, playerMaps: { ...a.playerMaps, [u]: o } };
}
function LS(a, u, o, c, r) {
  const d = qS(a, u),
    h = d.icons.find((m) => m.x === o && m.y === c),
    _ = d.icons.filter((m) => !(m.x === o && m.y === c)),
    g = (h == null ? void 0 : h.iconId) === r ? _ : [..._, { x: o, y: c, iconId: r }];
  return ly(a, u, { ...d, icons: g });
}
function HS(a, u, o, c) {
  const r = a.playerMaps[u];
  return r ? ly(a, u, { ...r, icons: r.icons.filter((d) => !(d.x === o && d.y === c)) }) : a;
}
const GS = () => {
    var Q;
    const a = jl(),
      { save: u, applySave: o, applyAndPersist: c } = Rn(),
      r = A.useRef(null),
      [d, h] = A.useState(null),
      [_, g] = A.useState(!1),
      m = (u == null ? void 0 : u.diveState) ?? null,
      v = A.useMemo(() => {
        var D;
        return u && m ? ((D = u.towerState.floors[m.depth]) == null ? void 0 : D.generated) : null;
      }, [u, m]),
      S = A.useMemo(() => {
        var D;
        return u && m
          ? (((D = u.towerState.floors[m.depth]) == null ? void 0 : D.foeRuntime) ?? [])
              .filter((U) => !U.defeated)
              .map((U) => ({ x: U.cell.x, y: U.cell.y, alerted: U.alerted }))
          : [];
      }, [u, m]),
      O = A.useCallback(
        (D) => {
          if (!u) return;
          r.current || (r.current = xa((u.masterSeed ^ 2654435769) >>> 0));
          const U = sb(u, D, r.current);
          (c(() => U.save), U.triggered && a('/battle'));
        },
        [u, c, a]
      ),
      C = A.useCallback(
        (D) => {
          o((U) => $p(U, D));
        },
        [o]
      ),
      b = A.useCallback(async () => {
        if (!u) return;
        const D = lp(u);
        D === 'stairsUp'
          ? await c((U) => ob(U))
          : D === 'stairsDown' &&
            (u.diveState.depth <= 1 ? (await c((U) => Ai(U)), a('/town')) : await c((U) => rb(U)));
      }, [u, c, a]),
      R = A.useCallback(async () => {
        (await c((D) => Ai(D)), a('/town'));
      }, [c, a]),
      T = A.useCallback(
        (D, U) => {
          if (!u) return;
          const K = BS(u, D, U);
          K.ok && (c(() => K.save), K.save.diveState || (g(!1), a('/town')));
        },
        [u, c, a]
      ),
      q = A.useCallback(
        (D, U) => {
          if (!m) return;
          const K = m.depth;
          if (d !== null) {
            if (!((u == null ? void 0 : u.exploredCells[K]) ?? []).includes(`${D},${U}`)) return;
            c(d === 'erase' ? (re) => HS(re, K, D, U) : (re) => LS(re, K, D, U, d));
            return;
          }
          const Z = D - m.pos.x,
            B = U - m.pos.y,
            F = ['N', 'E', 'S', 'W'].find((le) => Zt[le].dx === Z && Zt[le].dy === B);
          F && O(F);
        },
        [m, O, d, u, c]
      );
    if (!u) return y.jsx(kl, { to: '/title', replace: !0 });
    if (!m || !v) return y.jsx(kl, { to: '/town', replace: !0 });
    const $ = lp(u);
    return y.jsxs('div', {
      className: xe.layout,
      children: [
        y.jsxs('header', {
          className: xe.head,
          children: [
            y.jsxs('div', { className: xe.depth, children: [m.depth, 'F'] }),
            y.jsx(kS, { level: V1(m.encounter.stepsUntilEncounter) }),
            y.jsx('button', {
              type: 'button',
              className: xe.return,
              onClick: () => g(!0),
              children: '道具',
            }),
            y.jsx('button', {
              type: 'button',
              className: xe.return,
              onClick: () => void R(),
              children: '帰還',
            }),
          ],
        }),
        y.jsx('div', {
          className: xe.fpvWrap,
          children: y.jsx(wS, { floor: v, pos: m.pos, dir: m.dir, foes: S }),
        }),
        y.jsx('div', {
          className: xe.mapWrap,
          children: y.jsx(ES, {
            floor: v,
            explored: u.exploredCells[m.depth] ?? [],
            pos: m.pos,
            dir: m.dir,
            icons: ((Q = u.playerMaps[m.depth]) == null ? void 0 : Q.icons) ?? [],
            foes: S,
            onCellClick: q,
          }),
        }),
        y.jsxs('div', {
          className: xe.palette,
          children: [
            y.jsx('button', {
              type: 'button',
              className: `${xe.tool} ${d === null ? xe.toolActive : ''}`,
              onClick: () => h(null),
              'aria-label': '移動モード',
              children: '🚶',
            }),
            ty.map((D) =>
              y.jsx(
                'button',
                {
                  type: 'button',
                  className: `${xe.tool} ${d === D.id ? xe.toolActive : ''}`,
                  onClick: () => h(D.id),
                  'aria-label': D.label,
                  children: D.symbol,
                },
                D.id
              )
            ),
            y.jsx('button', {
              type: 'button',
              className: `${xe.tool} ${d === 'erase' ? xe.toolActive : ''}`,
              onClick: () => h('erase'),
              'aria-label': '消しゴム',
              children: '🧽',
            }),
          ],
        }),
        y.jsx('p', {
          className: xe.paletteHint,
          children:
            d === null
              ? '隣接マスをタップで移動。アイコンを選ぶとマップに書き込めます。'
              : d === 'erase'
                ? 'マップ上のマスをタップでアイコンを消去。'
                : 'マップ上の探索済みマスをタップでアイコンを配置（再タップで消去）。',
        }),
        $ &&
          y.jsx('button', {
            type: 'button',
            className: xe.stairs,
            onClick: () => void b(),
            children:
              $ === 'stairsUp'
                ? '▲ 次の階へ進む'
                : m.depth <= 1
                  ? '▼ 拠点へ戻る'
                  : '▼ 前の階へ戻る',
          }),
        y.jsxs('div', {
          className: xe.controls,
          children: [
            y.jsxs('div', {
              className: xe.row,
              children: [
                y.jsx('button', {
                  type: 'button',
                  className: xe.turn,
                  onClick: () => C(Xp(m.dir)),
                  'aria-label': '左を向く',
                  children: '↰',
                }),
                y.jsx('button', {
                  type: 'button',
                  className: xe.forward,
                  onClick: () => O(m.dir),
                  children: '前進',
                }),
                y.jsx('button', {
                  type: 'button',
                  className: xe.turn,
                  onClick: () => C(Yp(m.dir)),
                  'aria-label': '右を向く',
                  children: '↱',
                }),
              ],
            }),
            y.jsx('button', {
              type: 'button',
              className: xe.back,
              onClick: () => C(Q1(m.dir)),
              'aria-label': '振り向く',
              children: '↻ 振り向く',
            }),
          ],
        }),
        _
          ? y.jsx('div', {
              className: xe.itemOverlay,
              onClick: () => g(!1),
              children: y.jsxs('div', {
                className: xe.itemPanel,
                onClick: (D) => D.stopPropagation(),
                children: [
                  y.jsx('div', { className: xe.itemTitle, children: 'どうぐ' }),
                  (() => {
                    const D = u.guild.storage.filter((U) => {
                      var K, Z;
                      return (
                        ((Z = (K = mt[U.itemId]) == null ? void 0 : K.useContext) == null
                          ? void 0
                          : Z.includes('field')) && U.qty > 0
                      );
                    });
                    return D.length === 0
                      ? y.jsx('p', {
                          className: xe.itemEmpty,
                          children: '使える道具がありません。',
                        })
                      : D.map((U) => {
                          const K = mt[U.itemId],
                            Z = U.itemId === 'item_return_thread';
                          return y.jsxs(
                            'div',
                            {
                              className: xe.itemRow,
                              children: [
                                y.jsxs('div', {
                                  className: xe.itemName,
                                  children: [
                                    K.name,
                                    ' ×',
                                    U.qty,
                                    y.jsx('span', {
                                      className: xe.itemDesc,
                                      children: K.description,
                                    }),
                                  ],
                                }),
                                Z
                                  ? y.jsx('button', {
                                      type: 'button',
                                      className: xe.itemUse,
                                      onClick: () => T(U.itemId),
                                      children: '使う',
                                    })
                                  : y.jsx('div', {
                                      className: xe.itemTargets,
                                      children: m.party.map((B) => {
                                        const F = u.guild.members.find((re) => re.id === B.charId);
                                        if (!F) return null;
                                        const le = ki(F);
                                        return y.jsxs(
                                          'button',
                                          {
                                            type: 'button',
                                            className: xe.itemTarget,
                                            onClick: () => T(U.itemId, B.charId),
                                            children: [
                                              F.name,
                                              y.jsxs('span', {
                                                className: xe.itemHp,
                                                children: [
                                                  'HP ',
                                                  B.hp,
                                                  '/',
                                                  le.hp,
                                                  '・TP ',
                                                  B.tp,
                                                  '/',
                                                  le.tp,
                                                ],
                                              }),
                                            ],
                                          },
                                          B.charId
                                        );
                                      }),
                                    }),
                              ],
                            },
                            U.itemId
                          );
                        });
                  })(),
                  y.jsx('button', {
                    type: 'button',
                    className: xe.itemClose,
                    onClick: () => g(!1),
                    children: 'とじる',
                  }),
                ],
              }),
            })
          : null,
      ],
    });
  },
  YS = '_layout_16au8_2',
  XS = '_head_16au8_13',
  VS = '_title_16au8_20',
  QS = '_count_16au8_26',
  ZS = '_create_16au8_31',
  $S = '_sectionTitle_16au8_42',
  KS = '_field_16au8_48',
  JS = '_primary_16au8_64',
  IS = '_list_16au8_79',
  WS = '_empty_16au8_83',
  FS = '_members_16au8_88',
  PS = '_member_16au8_88',
  e2 = '_memberMain_16au8_107',
  t2 = '_memberName_16au8_119',
  l2 = '_pos_16au8_127',
  n2 = '_memberSub_16au8_144',
  a2 = '_posBtns_16au8_149',
  i2 = '_posBtn_16au8_149',
  u2 = '_posBtnActive_16au8_164',
  s2 = '_foot_16au8_170',
  c2 = '_sub_16au8_174',
  ke = {
    layout: YS,
    head: XS,
    title: VS,
    count: QS,
    create: ZS,
    sectionTitle: $S,
    field: KS,
    primary: JS,
    list: IS,
    empty: WS,
    members: FS,
    member: PS,
    memberMain: e2,
    memberName: t2,
    pos: l2,
    pos_前衛: '_pos_前衛_16au8_136',
    pos_後衛: '_pos_後衛_16au8_140',
    memberSub: n2,
    posBtns: a2,
    posBtn: i2,
    posBtnActive: u2,
    foot: s2,
    sub: c2,
  };
function o2(a) {
  return [...a.guild.party.front, ...a.guild.party.back].filter((u) => u !== null).length;
}
const ny = (a) => (a === 'front' ? os : rs);
function r2(a, u, o, c) {
  if (o < 0 || o >= ny(u) || (c !== null && !a.guild.members.some((h) => h.id === c))) return a;
  const r = a.guild.party.front.map((h) => (h === c ? null : h)),
    d = a.guild.party.back.map((h) => (h === c ? null : h));
  for (; r.length < os; ) r.push(null);
  for (; d.length < rs; ) d.push(null);
  return (
    u === 'front' ? (r[o] = c) : (d[o] = c),
    { ...a, guild: { ...a.guild, party: { front: r, back: d } } }
  );
}
function ay(a, u) {
  const o = a.guild.party.front.map((r) => (r === u ? null : r)),
    c = a.guild.party.back.map((r) => (r === u ? null : r));
  return { ...a, guild: { ...a.guild, party: { front: o, back: c } } };
}
function fp(a, u, o) {
  if (
    !a.guild.members.some((_) => _.id === u) ||
    (o === 'front' ? a.guild.party.front : a.guild.party.back).includes(u)
  )
    return a;
  const r = ay(a, u),
    d = o === 'front' ? r.guild.party.front : r.guild.party.back;
  let h = d.indexOf(null);
  if (h < 0)
    if (d.length < ny(o)) h = d.length;
    else return a;
  return r2(r, o, h, u);
}
function f2(a, u) {
  return a.guild.party.front.includes(u)
    ? '前衛'
    : a.guild.party.back.includes(u)
      ? '後衛'
      : '控え';
}
const d2 = () => {
    const a = jl(),
      { save: u, applyAndPersist: o } = Rn(),
      c = Object.keys($t),
      r = Object.keys(ft),
      [d, h] = A.useState(''),
      [_, g] = A.useState(c[0]),
      [m, v] = A.useState(r[0]),
      [S, O] = A.useState(!1),
      C = A.useCallback(async () => {
        const T = d.trim() || '名もなき冒険者',
          q = Jp({ raceId: _, classId: m, name: T });
        (O(!0), await o(($) => bb($, q)), h(''), O(!1));
      }, [d, _, m, o]);
    if (!u) return y.jsx(kl, { to: '/title', replace: !0 });
    const { members: b } = u.guild,
      R = b.length >= Po;
    return y.jsxs('div', {
      className: ke.layout,
      children: [
        y.jsxs('header', {
          className: ke.head,
          children: [
            y.jsx('h1', { className: ke.title, children: 'ギルド管理' }),
            y.jsxs('span', { className: ke.count, children: ['団員 ', b.length, ' / ', Po] }),
          ],
        }),
        y.jsxs('section', {
          className: ke.create,
          children: [
            y.jsx('h2', { className: ke.sectionTitle, children: '冒険者を作成' }),
            y.jsxs('label', {
              className: ke.field,
              children: [
                y.jsx('span', { children: '名前' }),
                y.jsx('input', {
                  type: 'text',
                  value: d,
                  maxLength: 16,
                  placeholder: '名もなき冒険者',
                  onChange: (T) => h(T.target.value),
                }),
              ],
            }),
            y.jsxs('label', {
              className: ke.field,
              children: [
                y.jsx('span', { children: '種族' }),
                y.jsx('select', {
                  value: _,
                  onChange: (T) => g(T.target.value),
                  children: c.map((T) => y.jsx('option', { value: T, children: $t[T].name }, T)),
                }),
              ],
            }),
            y.jsxs('label', {
              className: ke.field,
              children: [
                y.jsx('span', { children: '職業' }),
                y.jsx('select', {
                  value: m,
                  onChange: (T) => v(T.target.value),
                  children: r.map((T) => y.jsx('option', { value: T, children: ft[T].name }, T)),
                }),
              ],
            }),
            y.jsx('button', {
              type: 'button',
              className: ke.primary,
              disabled: S || R,
              onClick: () => void C(),
              children: R ? '団員が上限です' : '作成する',
            }),
          ],
        }),
        y.jsxs('section', {
          className: ke.list,
          children: [
            y.jsxs('h2', {
              className: ke.sectionTitle,
              children: [
                '団員一覧',
                ' ',
                y.jsxs('span', {
                  className: ke.count,
                  children: ['（出撃 ', o2(u), ' / ', b1, '）'],
                }),
              ],
            }),
            b.length === 0
              ? y.jsx('p', { className: ke.empty, children: 'まだ冒険者がいません。' })
              : y.jsx('ul', {
                  className: ke.members,
                  children: b.map((T) => {
                    var $, Q;
                    const q = f2(u, T.id);
                    return y.jsxs(
                      'li',
                      {
                        className: ke.member,
                        children: [
                          y.jsxs('button', {
                            type: 'button',
                            className: ke.memberMain,
                            onClick: () => a(`/guild/char/${T.id}`),
                            children: [
                              y.jsxs('span', {
                                className: ke.memberName,
                                children: [
                                  T.name,
                                  y.jsx('span', {
                                    className: `${ke.pos} ${ke[`pos_${q}`] ?? ''}`,
                                    children: q,
                                  }),
                                ],
                              }),
                              y.jsxs('span', {
                                className: ke.memberSub,
                                children: [
                                  ($ = $t[T.raceId]) == null ? void 0 : $.name,
                                  ' / ',
                                  (Q = ft[T.classId]) == null ? void 0 : Q.name,
                                  ' / Lv',
                                  T.level,
                                  ' ›',
                                ],
                              }),
                            ],
                          }),
                          y.jsxs('div', {
                            className: ke.posBtns,
                            children: [
                              y.jsx('button', {
                                type: 'button',
                                className: `${ke.posBtn} ${q === '前衛' ? ke.posBtnActive : ''}`,
                                onClick: () => void o((D) => fp(D, T.id, 'front')),
                                children: '前',
                              }),
                              y.jsx('button', {
                                type: 'button',
                                className: `${ke.posBtn} ${q === '後衛' ? ke.posBtnActive : ''}`,
                                onClick: () => void o((D) => fp(D, T.id, 'back')),
                                children: '後',
                              }),
                              y.jsx('button', {
                                type: 'button',
                                className: `${ke.posBtn} ${q === '控え' ? ke.posBtnActive : ''}`,
                                onClick: () => void o((D) => ay(D, T.id)),
                                children: '控',
                              }),
                            ],
                          }),
                        ],
                      },
                      T.id
                    );
                  }),
                }),
          ],
        }),
        y.jsx('footer', {
          className: ke.foot,
          children: y.jsx('button', {
            type: 'button',
            className: ke.sub,
            onClick: () => a('/town'),
            children: '拠点へ戻る',
          }),
        }),
      ],
    });
  },
  m2 = '_layout_tw23z_1',
  h2 = '_head_tw23z_12',
  p2 = '_title_tw23z_16',
  y2 = '_sub_tw23z_22',
  g2 = '_card_tw23z_27',
  v2 = '_h2_tw23z_35',
  _2 = '_sp_tw23z_44',
  b2 = '_stats_tw23z_50',
  S2 = '_equipSlot_tw23z_74',
  x2 = '_equipHead_tw23z_82',
  E2 = '_slotLabel_tw23z_88',
  T2 = '_equipName_tw23z_95',
  N2 = '_smallBtn_tw23z_100',
  A2 = '_equipPick_tw23z_110',
  C2 = '_pickBtn_tw23z_118',
  M2 = '_skills_tw23z_128',
  R2 = '_skill_tw23z_128',
  k2 = '_skillInfo_tw23z_143',
  j2 = '_skillName_tw23z_150',
  O2 = '_skillLv_tw23z_158',
  z2 = '_skillDesc_tw23z_164',
  D2 = '_learnBtn_tw23z_169',
  w2 = '_jobRow_tw23z_185',
  B2 = '_select_tw23z_192',
  U2 = '_input_tw23z_193',
  q2 = '_actBtn_tw23z_203',
  L2 = '_warn_tw23z_220',
  H2 = '_titleHave_tw23z_227',
  G2 = '_titleOpts_tw23z_233',
  Y2 = '_titleBtn_tw23z_240',
  X2 = '_rbForm_tw23z_252',
  V2 = '_danger_tw23z_258',
  Q2 = '_foot_tw23z_270',
  Z2 = '_back_tw23z_274',
  se = {
    layout: m2,
    head: h2,
    title: p2,
    sub: y2,
    card: g2,
    h2: v2,
    sp: _2,
    stats: b2,
    equipSlot: S2,
    equipHead: x2,
    slotLabel: E2,
    equipName: T2,
    smallBtn: N2,
    equipPick: A2,
    pickBtn: C2,
    skills: M2,
    skill: R2,
    skillInfo: k2,
    skillName: j2,
    skillLv: O2,
    skillDesc: z2,
    learnBtn: D2,
    jobRow: w2,
    select: B2,
    input: U2,
    actBtn: q2,
    warn: L2,
    titleHave: H2,
    titleOpts: G2,
    titleBtn: Y2,
    rbForm: X2,
    danger: V2,
    foot: Q2,
    back: Z2,
  },
  iy = ['weapon', 'armor', 'accessory'];
function uy(a, u, o) {
  return { ...a, guild: { ...a.guild, members: a.guild.members.map((c) => (c.id === u ? o : c)) } };
}
function $2(a) {
  var u, o;
  return (o = (u = ft[a]) == null ? void 0 : u.skillTree.skills[0]) == null ? void 0 : o.skillId;
}
function K2(a) {
  var u;
  return new Set(
    (((u = $t[a]) == null ? void 0 : u.unionSkillTree.skills) ?? []).map((o) => o.skillId)
  );
}
const J2 = (a) => Object.values(a).reduce((u, o) => u + o, 0);
function I2(a, u) {
  if (!ft[u]) return a;
  const o = K2(a.raceId);
  let c = {};
  for (const [g, m] of Object.entries(a.learnedSkills)) o.has(g) && (c[g] = m);
  const r = $2(u);
  r && !c[r] && (c[r] = 1);
  const d = Math.max(1, a.level - zp),
    h = ze.SP_PER_LEVEL * Math.max(0, d - 1);
  let _ = J2(c) - (r && c[r] ? 1 : 0);
  return (
    _ > h && ((c = r ? { [r]: 1 } : {}), (_ = 0)),
    {
      ...a,
      classId: u,
      titleId: null,
      level: d,
      exp: 0,
      learnedSkills: c,
      skillPoints: { total: h, spent: _ },
    }
  );
}
function W2(a, u, o) {
  const c = a.guild.members.find((h) => h.id === u);
  if (!c) return a;
  let r = uy(a, u, I2(c, o));
  const d = r.guild.members.find((h) => h.id === u);
  for (const h of iy) {
    const _ = d.equipment[h];
    _ && !_r(d, _) && (r = br(r, u, h));
  }
  return r;
}
const F2 = [
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
function P2(a) {
  const u = F2.find((o) => a >= o.min && a <= o.max);
  return u ? { allStats: u.allStats, bonusSp: u.bonusSp } : null;
}
function sy(a) {
  return a.level >= xi.REBIRTH_MIN_LEVEL;
}
function ex(a, u) {
  const o = P2(a.level);
  if (!o) return a;
  const c = Math.min(30, Math.floor(a.level / 2)),
    r = Jp({ ...u, id: a.id }),
    d = ze.SP_PER_LEVEL * Math.max(0, c - 1) + o.bonusSp;
  return {
    ...r,
    level: Math.max(1, c),
    exp: 0,
    rebirthBonus: o,
    skillPoints: { total: d, spent: r.skillPoints.spent },
  };
}
function tx(a, u, o) {
  const c = a.guild.members.find((h) => h.id === u);
  if (!c || !sy(c)) return a;
  let r = a;
  for (const h of iy) c.equipment[h] && (r = br(r, u, h));
  const d = r.guild.members.find((h) => h.id === u);
  return uy(r, u, ex(d, o));
}
function cy(a, u, o) {
  var r;
  return o < xi.TITLE_DEPTH || a.titleId
    ? !1
    : (((r = ft[a.classId]) == null ? void 0 : r.titleOptions) ?? []).includes(u);
}
function lx(a, u, o) {
  return cy(a, u, o)
    ? { ...a, titleId: u, skillPoints: { ...a.skillPoints, total: a.skillPoints.total + S1 } }
    : a;
}
function oy(a) {
  var o, c;
  const u = [
    ...(((o = ft[a.classId]) == null ? void 0 : o.skillTree.skills) ?? []),
    ...(((c = $t[a.raceId]) == null ? void 0 : c.unionSkillTree.skills) ?? []),
  ];
  return (a.titleId && ga[a.titleId] && u.push(...ga[a.titleId].skillTree.skills), u);
}
function ms(a, u) {
  return a.learnedSkills[u] ?? 0;
}
function ry(a) {
  return a.skillPoints.total - a.skillPoints.spent;
}
function nx(a, u) {
  return (u.requires ?? []).every((o) => ms(a, o.skillId) >= o.level);
}
function fy(a, u) {
  const o = oy(a).find((c) => c.skillId === u);
  return !o || ms(a, u) >= o.maxLevel || ry(a) <= 0 ? !1 : nx(a, o);
}
function ax(a, u) {
  return fy(a, u)
    ? {
        ...a,
        learnedSkills: { ...a.learnedSkills, [u]: ms(a, u) + 1 },
        skillPoints: { ...a.skillPoints, spent: a.skillPoints.spent + 1 },
      }
    : a;
}
const dp = Object.keys($t),
  Ju = Object.keys(ft),
  ix = ['weapon', 'armor', 'accessory'],
  ux = { weapon: '武器', armor: '防具', accessory: '装飾' },
  sx = [
    { key: 'hp', label: 'HP' },
    { key: 'tp', label: 'TP' },
    { key: 'str', label: 'STR' },
    { key: 'vit', label: 'VIT' },
    { key: 'agi', label: 'AGI' },
    { key: 'int', label: 'INT' },
    { key: 'mnd', label: 'MND' },
    { key: 'luc', label: 'LUC' },
  ],
  cx = () => {
    var D, U, K, Z;
    const a = jl(),
      { id: u } = jv(),
      { save: o, applyAndPersist: c } = Rn(),
      [r, d] = A.useState(Ju[0]),
      [h, _] = A.useState(''),
      [g, m] = A.useState(dp[0]),
      [v, S] = A.useState(Ju[0]),
      [O, C] = A.useState(!1);
    if (!o) return y.jsx(kl, { to: '/title', replace: !0 });
    const b = o.guild.members.find((B) => B.id === u);
    if (!b || !u) return y.jsx(kl, { to: '/guild', replace: !0 });
    const R = ki(b),
      T = ry(b),
      q = o.towerState.record.deepestReached,
      $ = (B) =>
        c((F) => ({
          ...F,
          guild: { ...F.guild, members: F.guild.members.map((le) => (le.id === u ? B(le) : le)) },
        }));
    return y.jsxs('div', {
      className: se.layout,
      children: [
        y.jsxs('header', {
          className: se.head,
          children: [
            y.jsx('h1', { className: se.title, children: b.name }),
            y.jsxs('span', {
              className: se.sub,
              children: [
                (D = $t[b.raceId]) == null ? void 0 : D.name,
                ' / ',
                (U = ft[b.classId]) == null ? void 0 : U.name,
                ' / Lv',
                b.level,
              ],
            }),
          ],
        }),
        y.jsxs('section', {
          className: se.card,
          children: [
            y.jsx('h2', { className: se.h2, children: 'ステータス' }),
            y.jsx('dl', {
              className: se.stats,
              children: sx.map((B) =>
                y.jsxs(
                  'div',
                  {
                    children: [
                      y.jsx('dt', { children: B.label }),
                      y.jsx('dd', { children: R[B.key] }),
                    ],
                  },
                  B.key
                )
              ),
            }),
          ],
        }),
        y.jsxs('section', {
          className: se.card,
          children: [
            y.jsx('h2', { className: se.h2, children: '装備' }),
            ix.map((B) => {
              const F = b.equipment[B],
                le = F ? Dt[F] : null,
                re = o.guild.storage.filter((de) => {
                  var at;
                  return (
                    ((at = Dt[de.itemId]) == null ? void 0 : at.slot) === B && _r(b, de.itemId)
                  );
                });
              return y.jsxs(
                'div',
                {
                  className: se.equipSlot,
                  children: [
                    y.jsxs('div', {
                      className: se.equipHead,
                      children: [
                        y.jsx('span', { className: se.slotLabel, children: ux[B] }),
                        y.jsx('span', {
                          className: se.equipName,
                          children: le ? le.name : '（なし）',
                        }),
                        le
                          ? y.jsx('button', {
                              type: 'button',
                              className: se.smallBtn,
                              onClick: () => void Q(B),
                              children: '外す',
                            })
                          : null,
                      ],
                    }),
                    re.length > 0
                      ? y.jsx('div', {
                          className: se.equipPick,
                          children: re.map((de) =>
                            y.jsxs(
                              'button',
                              {
                                type: 'button',
                                className: se.pickBtn,
                                onClick: () => void c((at) => M1(at, u, de.itemId)),
                                children: [
                                  Dt[de.itemId].name,
                                  ' 装備',
                                  de.qty > 1 ? `(${de.qty})` : '',
                                ],
                              },
                              de.itemId
                            )
                          ),
                        })
                      : null,
                  ],
                },
                B
              );
            }),
          ],
        }),
        y.jsxs('section', {
          className: se.card,
          children: [
            y.jsxs('h2', {
              className: se.h2,
              children: ['スキル ', y.jsxs('span', { className: se.sp, children: ['SP ', T] })],
            }),
            y.jsx('ul', {
              className: se.skills,
              children: oy(b).map((B) => {
                const F = ms(b, B.skillId),
                  le = fy(b, B.skillId),
                  re = vr[B.skillId];
                return y.jsxs(
                  'li',
                  {
                    className: se.skill,
                    children: [
                      y.jsxs('div', {
                        className: se.skillInfo,
                        children: [
                          y.jsxs('span', {
                            className: se.skillName,
                            children: [
                              (re == null ? void 0 : re.name) ?? B.skillId,
                              y.jsxs('span', {
                                className: se.skillLv,
                                children: ['Lv ', F, '/', B.maxLevel],
                              }),
                            ],
                          }),
                          y.jsx('span', {
                            className: se.skillDesc,
                            children: (re == null ? void 0 : re.description) ?? '',
                          }),
                        ],
                      }),
                      y.jsx('button', {
                        type: 'button',
                        className: se.learnBtn,
                        disabled: !le,
                        onClick: () => void $((de) => ax(de, B.skillId)),
                        children: '＋',
                      }),
                    ],
                  },
                  B.skillId
                );
              }),
            }),
          ],
        }),
        y.jsxs('section', {
          className: se.card,
          children: [
            y.jsx('h2', { className: se.h2, children: '転職' }),
            y.jsxs('div', {
              className: se.jobRow,
              children: [
                y.jsx('select', {
                  className: se.select,
                  value: r,
                  onChange: (B) => d(B.target.value),
                  children: Ju.map((B) => y.jsx('option', { value: B, children: ft[B].name }, B)),
                }),
                y.jsx('button', {
                  type: 'button',
                  className: se.actBtn,
                  disabled: r === b.classId,
                  onClick: () => void c((B) => W2(B, u, r)),
                  children: '転職する',
                }),
              ],
            }),
            y.jsxs('p', {
              className: se.warn,
              children: [
                '※ レベルが ',
                zp,
                ' ',
                '下がり、職業/称号スキルは振り直しになります（種族スキルは保持）。',
              ],
            }),
            y.jsx('h2', { className: se.h2, children: '称号' }),
            b.titleId
              ? y.jsxs('p', {
                  className: se.titleHave,
                  children: ['習得済み: ', (K = ga[b.titleId]) == null ? void 0 : K.name],
                })
              : q < xi.TITLE_DEPTH
                ? y.jsxs('p', {
                    className: se.warn,
                    children: ['第 ', xi.TITLE_DEPTH, ' 階到達で習得できます（現在 ', q, 'F）。'],
                  })
                : y.jsx('div', {
                    className: se.titleOpts,
                    children: (((Z = ft[b.classId]) == null ? void 0 : Z.titleOptions) ?? []).map(
                      (B) => {
                        var F;
                        return y.jsxs(
                          'button',
                          {
                            type: 'button',
                            className: se.titleBtn,
                            disabled: !cy(b, B, q),
                            onClick: () => void $((le) => lx(le, B, q)),
                            children: [(F = ga[B]) == null ? void 0 : F.name, '（SP+5）'],
                          },
                          B
                        );
                      }
                    ),
                  }),
            y.jsx('h2', { className: se.h2, children: '転生' }),
            sy(b)
              ? O
                ? y.jsxs('div', {
                    className: se.rbForm,
                    children: [
                      y.jsxs('p', {
                        className: se.warn,
                        children: [
                          '※ 作り直して強い新人になります（開始Lv ',
                          Math.min(30, Math.floor(b.level / 2)),
                          '・ボーナス付き）。',
                        ],
                      }),
                      y.jsx('input', {
                        className: se.input,
                        type: 'text',
                        maxLength: 16,
                        placeholder: b.name,
                        value: h,
                        onChange: (B) => _(B.target.value),
                      }),
                      y.jsxs('div', {
                        className: se.jobRow,
                        children: [
                          y.jsx('select', {
                            className: se.select,
                            value: g,
                            onChange: (B) => m(B.target.value),
                            children: dp.map((B) =>
                              y.jsx('option', { value: B, children: $t[B].name }, B)
                            ),
                          }),
                          y.jsx('select', {
                            className: se.select,
                            value: v,
                            onChange: (B) => S(B.target.value),
                            children: Ju.map((B) =>
                              y.jsx('option', { value: B, children: ft[B].name }, B)
                            ),
                          }),
                        ],
                      }),
                      y.jsxs('div', {
                        className: se.jobRow,
                        children: [
                          y.jsx('button', {
                            type: 'button',
                            className: se.danger,
                            onClick: () => {
                              (c((B) =>
                                tx(B, u, { raceId: g, classId: v, name: h.trim() || b.name })
                              ),
                                C(!1));
                            },
                            children: '転生を実行',
                          }),
                          y.jsx('button', {
                            type: 'button',
                            className: se.actBtn,
                            onClick: () => C(!1),
                            children: 'やめる',
                          }),
                        ],
                      }),
                    ],
                  })
                : y.jsx('button', {
                    type: 'button',
                    className: se.actBtn,
                    onClick: () => C(!0),
                    children: '転生する…',
                  })
              : y.jsxs('p', {
                  className: se.warn,
                  children: [
                    'Lv',
                    xi.REBIRTH_MIN_LEVEL,
                    ' 以上で転生できます（現在 Lv',
                    b.level,
                    '）。',
                  ],
                }),
          ],
        }),
        y.jsx('footer', {
          className: se.foot,
          children: y.jsx('button', {
            type: 'button',
            className: se.back,
            onClick: () => a('/guild'),
            children: 'もどる',
          }),
        }),
      ],
    });
    function Q(B) {
      return c((F) => br(F, u, B));
    }
  },
  ox = () => y.jsx('div', { children: y.jsx('h1', { children: 'Not Found' }) }),
  rx = '_layout_1u0ua_1',
  fx = '_head_1u0ua_11',
  dx = '_title_1u0ua_18',
  mx = '_gold_1u0ua_24',
  hx = '_tabs_1u0ua_29',
  px = '_tab_1u0ua_29',
  yx = '_tabActive_1u0ua_46',
  gx = '_list_1u0ua_51',
  vx = '_row_1u0ua_59',
  _x = '_info_1u0ua_70',
  bx = '_name_1u0ua_76',
  Sx = '_note_1u0ua_81',
  xx = '_action_1u0ua_86',
  Ex = '_empty_1u0ua_103',
  Tx = '_foot_1u0ua_108',
  Nx = '_back_1u0ua_112',
  Ve = {
    layout: rx,
    head: fx,
    title: dx,
    gold: mx,
    tabs: hx,
    tab: px,
    tabActive: yx,
    list: gx,
    row: vx,
    info: _x,
    name: bx,
    note: Sx,
    action: xx,
    empty: Ex,
    foot: Tx,
    back: Nx,
  };
function Ax(a) {
  return Math.max(0, Math.floor(a.towerState.record.deepestReached / 10));
}
const dy = {
    item_slime_jelly: ['equip_slime_shield'],
    item_rat_tail: ['equip_rat_dagger'],
    item_bat_wing: ['equip_bat_cloak'],
    item_golem_core: ['equip_golem_blade'],
  },
  Cx = (a) => {
    const u = Dt[a].bonuses,
      o = [];
    return (
      u.atk && o.push(`ATK+${u.atk}`),
      u.mat && o.push(`MAT+${u.mat}`),
      u.def && o.push(`DEF+${u.def}`),
      u.mdf && o.push(`MDF+${u.mdf}`),
      o.join(' ')
    );
  };
function Mx(a) {
  const u = Ax(a),
    o = new Set(a.shopStock.unlockedItemIds),
    c = Object.values(mt)
      .filter((d) => d.buyPrice > 0)
      .map((d) => ({ id: d.id, name: d.name, price: d.buyPrice, kind: 'item' }));
  return [
    ...Object.values(Dt)
      .filter((d) => d.tier <= u || o.has(d.id))
      .map((d) => ({ id: d.id, name: d.name, price: d.buyPrice, kind: 'equip', note: Cx(d.id) })),
    ...c,
  ];
}
function Rx(a) {
  return dy[a] ?? [];
}
function kx(a) {
  var u, o;
  return (
    ((u = mt[a]) == null ? void 0 : u.buyPrice) ??
    ((o = Dt[a]) == null ? void 0 : o.buyPrice) ??
    null
  );
}
function cr(a) {
  return mt[a] ? v1(mt[a]) : Dt[a] ? Math.floor(Dt[a].buyPrice / 2) : 0;
}
function jx(a, u) {
  const o = kx(u);
  if (o === null || o <= 0 || a.guild.gold < o) return a;
  const c = fs(a, u, 1);
  return { ...c, guild: { ...c.guild, gold: c.guild.gold - o } };
}
function Ox(a, u, o = 1) {
  var g;
  if ((((g = a.guild.storage.find((m) => m.itemId === u)) == null ? void 0 : g.qty) ?? 0) < o)
    return a;
  const r = cr(u) * o,
    d = Ni(a, u, o),
    h = Rx(u).filter((m) => !d.shopStock.unlockedItemIds.includes(m)),
    _ = [...d.shopStock.unlockedItemIds, ...h];
  return {
    ...d,
    guild: { ...d.guild, gold: d.guild.gold + r },
    shopStock: { ...d.shopStock, unlockedItemIds: _ },
  };
}
const zx = () => {
    const a = jl(),
      { save: u, applyAndPersist: o } = Rn(),
      [c, r] = A.useState('buy');
    if (!u) return y.jsx(kl, { to: '/title', replace: !0 });
    const d = u.guild.gold,
      h = Mx(u),
      _ = u.guild.storage.filter((m) => cr(m.itemId) > 0),
      g = (m) => {
        var v, S;
        return (
          ((v = mt[m]) == null ? void 0 : v.name) ?? ((S = Dt[m]) == null ? void 0 : S.name) ?? m
        );
      };
    return y.jsxs('div', {
      className: Ve.layout,
      children: [
        y.jsxs('header', {
          className: Ve.head,
          children: [
            y.jsx('h1', { className: Ve.title, children: 'ショップ' }),
            y.jsxs('span', { className: Ve.gold, children: [d, ' G'] }),
          ],
        }),
        y.jsxs('div', {
          className: Ve.tabs,
          children: [
            y.jsx('button', {
              type: 'button',
              className: `${Ve.tab} ${c === 'buy' ? Ve.tabActive : ''}`,
              onClick: () => r('buy'),
              children: '買う',
            }),
            y.jsx('button', {
              type: 'button',
              className: `${Ve.tab} ${c === 'sell' ? Ve.tabActive : ''}`,
              onClick: () => r('sell'),
              children: '売る',
            }),
          ],
        }),
        y.jsx('div', {
          className: Ve.list,
          children:
            c === 'buy'
              ? h.map((m) =>
                  y.jsxs(
                    'div',
                    {
                      className: Ve.row,
                      children: [
                        y.jsxs('div', {
                          className: Ve.info,
                          children: [
                            y.jsx('span', { className: Ve.name, children: m.name }),
                            m.note ? y.jsx('span', { className: Ve.note, children: m.note }) : null,
                          ],
                        }),
                        y.jsxs('button', {
                          type: 'button',
                          className: Ve.action,
                          disabled: d < m.price,
                          onClick: () => void o((v) => jx(v, m.id)),
                          children: [m.price, ' G'],
                        }),
                      ],
                    },
                    m.id
                  )
                )
              : _.length === 0
                ? y.jsx('p', { className: Ve.empty, children: '売れる物がありません。' })
                : _.map((m) =>
                    y.jsxs(
                      'div',
                      {
                        className: Ve.row,
                        children: [
                          y.jsxs('div', {
                            className: Ve.info,
                            children: [
                              y.jsx('span', { className: Ve.name, children: g(m.itemId) }),
                              y.jsxs('span', { className: Ve.note, children: ['所持 ', m.qty] }),
                            ],
                          }),
                          y.jsxs('button', {
                            type: 'button',
                            className: Ve.action,
                            onClick: () => void o((v) => Ox(v, m.itemId, 1)),
                            children: ['売却 ', cr(m.itemId), ' G'],
                          }),
                        ],
                      },
                      m.itemId
                    )
                  ),
        }),
        y.jsx('footer', {
          className: Ve.foot,
          children: y.jsx('button', {
            type: 'button',
            className: Ve.back,
            onClick: () => a('/town'),
            children: '拠点へ戻る',
          }),
        }),
      ],
    });
  },
  Dx = '_layout_1xkiw_1',
  wx = '_head_1xkiw_12',
  Bx = '_title_1xkiw_17',
  Ux = '_subtitle_1xkiw_24',
  qx = '_body_1xkiw_30',
  Lx = '_menu_1xkiw_34',
  Hx = '_loading_1xkiw_40',
  Gx = '_warn_1xkiw_45',
  Yx = '_danger_1xkiw_52',
  Xx = '_dialog_1xkiw_67',
  Vx = '_dialogTitle_1xkiw_77',
  Qx = '_field_1xkiw_82',
  Zx = '_note_1xkiw_96',
  $x = '_dialogActions_1xkiw_102',
  Kx = '_primary_1xkiw_107',
  Jx = '_sub_1xkiw_24',
  Ix = '_foot_1xkiw_132',
  Qe = {
    layout: Dx,
    head: wx,
    title: Bx,
    subtitle: Ux,
    body: qx,
    menu: Lx,
    loading: Hx,
    warn: Gx,
    danger: Yx,
    dialog: Xx,
    dialogTitle: Vx,
    field: Qx,
    note: Zx,
    dialogActions: $x,
    primary: Kx,
    sub: Jx,
    foot: Ix,
  },
  Wx = '_card_3vsn6_1',
  Fx = '_corrupted_3vsn6_14',
  Px = '_corruptedText_3vsn6_19',
  eE = '_corruptedNote_3vsn6_25',
  tE = '_guildName_3vsn6_31',
  lE = '_meta_3vsn6_36',
  an = {
    card: Wx,
    corrupted: Fx,
    corruptedText: Px,
    corruptedNote: eE,
    guildName: tE,
    meta: lE,
    continue: '_continue_3vsn6_56',
  },
  nE = (a) => {
    if (!a) return '-';
    const u = new Date(a),
      o = (c) => String(c).padStart(2, '0');
    return `${u.getFullYear()}/${o(u.getMonth() + 1)}/${o(u.getDate())} ${o(u.getHours())}:${o(u.getMinutes())}`;
  },
  aE = ({ meta: a, onContinue: u }) =>
    a.corrupted
      ? y.jsxs('div', {
          className: `${an.card} ${an.corrupted}`,
          children: [
            y.jsx('div', { className: an.corruptedText, children: 'セーブデータが破損しています' }),
            y.jsx('p', {
              className: an.corruptedNote,
              children: '「最初から」で新しく始められます。',
            }),
          ],
        })
      : y.jsxs('div', {
          className: an.card,
          children: [
            y.jsx('div', { className: an.guildName, children: a.guildName }),
            y.jsxs('dl', {
              className: an.meta,
              children: [
                y.jsxs('div', {
                  children: [
                    y.jsx('dt', { children: '最高到達階' }),
                    y.jsx('dd', {
                      children: a.deepestReached > 0 ? `${a.deepestReached}F` : '未踏破',
                    }),
                  ],
                }),
                y.jsxs('div', {
                  children: [
                    y.jsx('dt', { children: '団員' }),
                    y.jsxs('dd', { children: [a.memberCount, '人'] }),
                  ],
                }),
                y.jsxs('div', {
                  children: [
                    y.jsx('dt', { children: '最終セーブ' }),
                    y.jsx('dd', { children: nE(a.savedAt) }),
                  ],
                }),
              ],
            }),
            y.jsx('button', {
              type: 'button',
              className: an.continue,
              onClick: u,
              children: 'つづきから',
            }),
          ],
        }),
  iE = () => {
    const a = jl(),
      { startNewGame: u, continueGame: o } = Rn(),
      [c, r] = A.useState(null),
      [d, h] = A.useState(!0),
      [_, g] = A.useState('menu'),
      [m, v] = A.useState(''),
      [S, O] = A.useState(!1);
    A.useEffect(() => {
      (async () => (r(await Gb()), h(!1)))();
    }, []);
    const C = c !== null && !c.corrupted,
      b = A.useCallback(async () => {
        O(!0);
        const q = await o();
        (O(!1), q.ok && a('/town'));
      }, [o, a]),
      R = A.useCallback(() => {
        (v(''), g(C ? 'confirm' : 'guildName'));
      }, [C]),
      T = A.useCallback(async () => {
        const q = m.trim() || 'ななしのギルド';
        (O(!0), await u(q), O(!1), a('/town'));
      }, [m, u, a]);
    return y.jsxs('div', {
      className: Qe.layout,
      children: [
        y.jsxs('header', {
          className: Qe.head,
          children: [
            y.jsx('h1', { className: Qe.title, children: '世界樹ライク' }),
            y.jsx('p', { className: Qe.subtitle, children: '無限タワー探索 RPG' }),
          ],
        }),
        y.jsx('main', {
          className: Qe.body,
          children: d
            ? y.jsx('p', { className: Qe.loading, children: '読み込み中...' })
            : _ === 'guildName'
              ? y.jsxs('div', {
                  className: Qe.dialog,
                  children: [
                    y.jsx('h2', { className: Qe.dialogTitle, children: '新しいギルド' }),
                    y.jsxs('label', {
                      className: Qe.field,
                      children: [
                        y.jsx('span', { children: 'ギルド名' }),
                        y.jsx('input', {
                          type: 'text',
                          value: m,
                          maxLength: 16,
                          placeholder: 'ななしのギルド',
                          onChange: (q) => v(q.target.value),
                          autoFocus: !0,
                        }),
                      ],
                    }),
                    y.jsx('p', {
                      className: Qe.note,
                      children:
                        '冒険者はまだいません。開始後、ギルドメニューで仲間を作成してください。',
                    }),
                    y.jsxs('div', {
                      className: Qe.dialogActions,
                      children: [
                        y.jsx('button', {
                          type: 'button',
                          className: Qe.primary,
                          disabled: S,
                          onClick: T,
                          children: 'はじめる',
                        }),
                        y.jsx('button', {
                          type: 'button',
                          className: Qe.sub,
                          disabled: S,
                          onClick: () => g('menu'),
                          children: 'もどる',
                        }),
                      ],
                    }),
                  ],
                })
              : _ === 'confirm'
                ? y.jsxs('div', {
                    className: Qe.dialog,
                    children: [
                      y.jsx('h2', { className: Qe.dialogTitle, children: '最初から始めますか？' }),
                      y.jsxs('p', {
                        className: Qe.warn,
                        children: [
                          '現在のセーブデータ「',
                          c == null ? void 0 : c.guildName,
                          '」は上書きされ、元に戻せません。',
                        ],
                      }),
                      y.jsxs('div', {
                        className: Qe.dialogActions,
                        children: [
                          y.jsx('button', {
                            type: 'button',
                            className: Qe.danger,
                            disabled: S,
                            onClick: () => g('guildName'),
                            children: 'データを消して始める',
                          }),
                          y.jsx('button', {
                            type: 'button',
                            className: Qe.sub,
                            disabled: S,
                            onClick: () => g('menu'),
                            children: 'もどる',
                          }),
                        ],
                      }),
                    ],
                  })
                : y.jsxs('div', {
                    className: Qe.menu,
                    children: [
                      c !== null && y.jsx(aE, { meta: c, onContinue: () => void b() }),
                      y.jsx('button', {
                        type: 'button',
                        className: C ? Qe.sub : Qe.primary,
                        onClick: R,
                        children: '最初から',
                      }),
                    ],
                  }),
        }),
        y.jsxs('footer', { className: Qe.foot, children: ['v', '0.1.13'] }),
      ],
    });
  },
  uE = '_layout_1wdo2_1',
  sE = '_head_1wdo2_12',
  cE = '_guildName_1wdo2_16',
  oE = '_stats_1wdo2_21',
  rE = '_hint_1wdo2_40',
  fE = '_menu_1wdo2_50',
  dE = '_foot_1wdo2_57',
  mE = '_exit_1wdo2_61',
  un = { layout: uE, head: sE, guildName: cE, stats: oE, hint: rE, menu: fE, foot: dE, exit: mE },
  hE = '_button_1tp4a_1',
  pE = '_primary_1tp4a_26',
  yE = '_label_1tp4a_32',
  gE = '_description_1tp4a_37',
  Iu = { button: hE, primary: pE, label: yE, description: gE },
  _i = ({ label: a, description: u, variant: o = 'default', disabled: c = !1, onClick: r }) =>
    y.jsxs('button', {
      type: 'button',
      className: `${Iu.button} ${o === 'primary' ? Iu.primary : ''}`,
      disabled: c,
      onClick: r,
      children: [
        y.jsx('span', { className: Iu.label, children: a }),
        u ? y.jsx('span', { className: Iu.description, children: u }) : null,
      ],
    }),
  vE = () => {
    const a = jl(),
      { save: u, exitToTitle: o, applyAndPersist: c } = Rn();
    if (!u) return y.jsx(kl, { to: '/title', replace: !0 });
    const { guild: r, towerState: d, diveState: h } = u,
      _ = r.members.length > 0,
      g = () => {
        (o(), a('/title'));
      },
      m = async () => {
        (h || (await c((v) => ub(v, 1))), a('/dungeon'));
      };
    return y.jsxs('div', {
      className: un.layout,
      children: [
        y.jsxs('header', {
          className: un.head,
          children: [
            y.jsx('div', { className: un.guildName, children: r.name }),
            y.jsxs('dl', {
              className: un.stats,
              children: [
                y.jsxs('div', {
                  children: [
                    y.jsx('dt', { children: '所持金' }),
                    y.jsxs('dd', { children: [r.gold, ' G'] }),
                  ],
                }),
                y.jsxs('div', {
                  children: [
                    y.jsx('dt', { children: '最高到達' }),
                    y.jsx('dd', {
                      children: d.record.deepestReached > 0 ? `${d.record.deepestReached}F` : '-',
                    }),
                  ],
                }),
                y.jsxs('div', {
                  children: [
                    y.jsx('dt', { children: '団員' }),
                    y.jsxs('dd', { children: [r.members.length, '人'] }),
                  ],
                }),
              ],
            }),
          ],
        }),
        !_ &&
          y.jsx('p', {
            className: un.hint,
            children:
              'まずは「ギルド管理」で冒険者を作成してください。団員がいないとダイブできません。',
          }),
        y.jsxs('main', {
          className: un.menu,
          children: [
            y.jsx(_i, {
              label: h ? '潜行を再開' : 'ダイブ開始',
              description: _
                ? h
                  ? `${h.depth}F から再開`
                  : '第1階からタワーへ潜る'
                : '団員が必要です',
              variant: 'primary',
              disabled: !_,
              onClick: () => void m(),
            }),
            y.jsx(_i, {
              label: 'ギルド管理',
              description: '編成・キャラ作成',
              onClick: () => a('/guild'),
            }),
            y.jsx(_i, {
              label: 'ショップ',
              description: '装備・アイテム売買',
              onClick: () => a('/shop'),
            }),
            y.jsx(_i, { label: '鍛冶屋', description: '武器強化（Phase 4）', disabled: !0 }),
            y.jsx(_i, {
              label: '図鑑 / 記録',
              description: '到達記録・図鑑（Phase 4-5）',
              disabled: !0,
            }),
          ],
        }),
        y.jsx('footer', {
          className: un.foot,
          children: y.jsx('button', {
            type: 'button',
            className: un.exit,
            onClick: g,
            children: 'タイトルへ戻る',
          }),
        }),
      ],
    });
  };
function _E() {
  return y.jsxs(Zv, {
    children: [
      y.jsx(al, { path: '/', element: y.jsx(kl, { to: '/title', replace: !0 }) }),
      y.jsx(al, { path: '/title', element: y.jsx(iE, {}) }),
      y.jsx(al, { path: '/town', element: y.jsx(vE, {}) }),
      y.jsx(al, { path: '/guild', element: y.jsx(d2, {}) }),
      y.jsx(al, { path: '/guild/char/:id', element: y.jsx(cx, {}) }),
      y.jsx(al, { path: '/shop', element: y.jsx(zx, {}) }),
      y.jsx(al, { path: '/dungeon', element: y.jsx(GS, {}) }),
      y.jsx(al, { path: '/battle', element: y.jsx(Qb, {}) }),
      y.jsx(al, { path: '*', element: y.jsx(ox, {}) }),
    ],
  });
}
const bE = {
    races: $t,
    classes: ft,
    titles: ga,
    skills: vr,
    unionSkills: Si,
    enemies: Mn,
    items: mt,
    equipment: Dt,
  },
  SE = /^[a-z]+_[a-z0-9_]+$/;
function sn(a, u, o) {
  for (const c of u)
    SE.test(c) || o.push(`[${a}] ID 命名規約違反: "${c}"（期待: <domain>_<name>）`);
}
function Io(a, u, o, c) {
  const r = new Set(u.skills.map((d) => d.skillId));
  for (const d of u.skills) {
    o.has(d.skillId) || c.push(`[${a}] 未定義スキルを参照: "${d.skillId}"`);
    for (const h of d.requires ?? [])
      r.has(h.skillId) ||
        c.push(`[${a}] スキル "${d.skillId}" の前提 "${h.skillId}" が同ツリーに存在しない`);
  }
}
function xE() {
  const a = [],
    {
      races: u,
      classes: o,
      titles: c,
      skills: r,
      unionSkills: d,
      enemies: h,
      items: _,
      equipment: g,
    } = bE;
  (sn('races', Object.keys(u), a),
    sn('classes', Object.keys(o), a),
    sn('titles', Object.keys(c), a),
    sn('skills', Object.keys(r), a),
    sn('enemies', Object.keys(h), a),
    sn('items', Object.keys(_), a),
    sn('equipment', Object.keys(g), a));
  const m = (C, b) => {
    for (const [R, T] of Object.entries(b))
      R !== T.id && a.push(`[${C}] キー "${R}" と id "${T.id}" が不一致`);
  };
  (m('races', u),
    m('classes', o),
    m('titles', c),
    m('skills', r),
    m('enemies', h),
    m('items', _),
    m('equipment', g));
  const v = new Set(Object.keys(r)),
    S = new Set(Object.keys(o)),
    O = new Set(Object.keys(c));
  for (const C of Object.values(u)) {
    (S.has(C.defaultClassId) ||
      a.push(`[races] "${C.id}" の defaultClassId "${C.defaultClassId}" が未定義`),
      Io(`races/${C.id}`, C.unionSkillTree, v, a));
    for (const b of C.unionSkillTree.skills) {
      const R = d[b.skillId];
      R
        ? R.raceId !== C.id &&
          a.push(`[races/${C.id}] ユニオンスキル "${b.skillId}" の raceId "${R.raceId}" が不一致`)
        : a.push(`[races/${C.id}] ユニオンスキル "${b.skillId}" の効果定義が UNION_SKILLS に無い`);
    }
  }
  sn('unionSkills', Object.keys(d), a);
  for (const [C, b] of Object.entries(d))
    (C !== b.id && a.push(`[unionSkills] キー "${C}" と id "${b.id}" が不一致`),
      b.id in r || a.push(`[unionSkills] "${b.id}" が skills に未定義`),
      b.requiredParticipants < 1 &&
        a.push(`[unionSkills] "${b.id}" の requiredParticipants が 1 未満`),
      (b.gaugeCostPerParticipant < 0 || b.gaugeCostPerParticipant > 100) &&
        a.push(`[unionSkills] "${b.id}" の gaugeCostPerParticipant が 0..100 外`),
      b.id in An &&
        a.push(
          `[unionSkills] "${b.id}" が BATTLE_SKILLS にも存在（通常スキルとして撃ててしまう）`
        ));
  for (const C of Object.values(o)) {
    Io(`classes/${C.id}`, C.skillTree, v, a);
    for (const b of C.titleOptions) {
      if (!O.has(b)) {
        a.push(`[classes] "${C.id}" の称号 "${b}" が未定義`);
        continue;
      }
      c[b].parentClassId !== C.id &&
        a.push(`[classes] 称号 "${b}" の parentClassId が "${C.id}" と不一致`);
    }
  }
  for (const C of Object.values(c))
    (S.has(C.parentClassId) ||
      a.push(`[titles] "${C.id}" の parentClassId "${C.parentClassId}" が未定義`),
      Io(`titles/${C.id}`, C.skillTree, v, a));
  for (const C of Object.values(g))
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
  for (const C of Object.values(h))
    for (const b of C.drops ?? [])
      (b.itemId in _ || a.push(`[enemies] "${C.id}" のドロップ "${b.itemId}" が未定義アイテム`),
        (b.rate < 0 || b.rate > 1) &&
          a.push(`[enemies] "${C.id}" のドロップ "${b.itemId}" の rate が 0..1 外`));
  for (const [C, b] of Object.entries(dy)) {
    C in _ || a.push(`[SELL_UNLOCKS] キー素材 "${C}" が未定義`);
    for (const R of b) R in g || a.push(`[SELL_UNLOCKS] 解放先装備 "${R}" が未定義`);
  }
  return { ok: a.length === 0, errors: a };
}
const mp = xE();
mp.ok || console.error('マスターデータ検証エラー:', mp.errors);
const my = document.getElementById('root');
if (!my) throw new Error('Failed to find #root element');
K0.createRoot(my).render(
  y.jsx(y_, { basename: '/sekaiju-like-game', children: y.jsx(Vb, { children: y.jsx(_E, {}) }) })
);
