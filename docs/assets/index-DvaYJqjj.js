var Y0 = Object.defineProperty;
var X0 = (a, u, o) =>
  u in a ? Y0(a, u, { enumerable: !0, configurable: !0, writable: !0, value: o }) : (a[u] = o);
var Do = (a, u, o) => X0(a, typeof u != 'symbol' ? u + '' : u, o);
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
var zo = { exports: {} },
  yi = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Dh;
function V0() {
  if (Dh) return yi;
  Dh = 1;
  var a = Symbol.for('react.transitional.element'),
    u = Symbol.for('react.fragment');
  function o(c, r, d) {
    var h = null;
    if ((d !== void 0 && (h = '' + d), r.key !== void 0 && (h = '' + r.key), 'key' in r)) {
      d = {};
      for (var b in r) b !== 'key' && (d[b] = r[b]);
    } else d = r;
    return ((r = d.ref), { $$typeof: a, type: c, key: h, ref: r !== void 0 ? r : null, props: d });
  }
  return ((yi.Fragment = u), (yi.jsx = o), (yi.jsxs = o), yi);
}
var zh;
function Q0() {
  return (zh || ((zh = 1), (zo.exports = V0())), zo.exports);
}
var y = Q0(),
  wo = { exports: {} },
  gi = {},
  Bo = { exports: {} },
  Uo = {};
/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var wh;
function $0() {
  return (
    wh ||
      ((wh = 1),
      (function (a) {
        function u(H, J) {
          var ie = H.length;
          H.push(J);
          e: for (; 0 < ie; ) {
            var Me = (ie - 1) >>> 1,
              ke = H[Me];
            if (0 < r(ke, J)) ((H[Me] = J), (H[ie] = ke), (ie = Me));
            else break e;
          }
        }
        function o(H) {
          return H.length === 0 ? null : H[0];
        }
        function c(H) {
          if (H.length === 0) return null;
          var J = H[0],
            ie = H.pop();
          if (ie !== J) {
            H[0] = ie;
            e: for (var Me = 0, ke = H.length, N = ke >>> 1; Me < N; ) {
              var G = 2 * (Me + 1) - 1,
                I = H[G],
                P = G + 1,
                oe = H[P];
              if (0 > r(I, ie))
                P < ke && 0 > r(oe, I)
                  ? ((H[Me] = oe), (H[P] = ie), (Me = P))
                  : ((H[Me] = I), (H[G] = ie), (Me = G));
              else if (P < ke && 0 > r(oe, ie)) ((H[Me] = oe), (H[P] = ie), (Me = P));
              else break e;
            }
          }
          return J;
        }
        function r(H, J) {
          var ie = H.sortIndex - J.sortIndex;
          return ie !== 0 ? ie : H.id - J.id;
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
            b = h.now();
          a.unstable_now = function () {
            return h.now() - b;
          };
        }
        var v = [],
          m = [],
          _ = 1,
          S = null,
          k = 3,
          z = !1,
          g = !1,
          C = !1,
          E = !1,
          U = typeof setTimeout == 'function' ? setTimeout : null,
          K = typeof clearTimeout == 'function' ? clearTimeout : null,
          Q = typeof setImmediate < 'u' ? setImmediate : null;
        function D(H) {
          for (var J = o(m); J !== null; ) {
            if (J.callback === null) c(m);
            else if (J.startTime <= H) (c(m), (J.sortIndex = J.expirationTime), u(v, J));
            else break;
            J = o(m);
          }
        }
        function L(H) {
          if (((C = !1), D(H), !g))
            if (o(v) !== null) ((g = !0), Z || ((Z = !0), de()));
            else {
              var J = o(m);
              J !== null && qe(L, J.startTime - H);
            }
        }
        var Z = !1,
          $ = -1,
          B = 5,
          F = -1;
        function le() {
          return E ? !0 : !(a.unstable_now() - F < B);
        }
        function re() {
          if (((E = !1), Z)) {
            var H = a.unstable_now();
            F = H;
            var J = !0;
            try {
              e: {
                ((g = !1), C && ((C = !1), K($), ($ = -1)), (z = !0));
                var ie = k;
                try {
                  t: {
                    for (D(H), S = o(v); S !== null && !(S.expirationTime > H && le()); ) {
                      var Me = S.callback;
                      if (typeof Me == 'function') {
                        ((S.callback = null), (k = S.priorityLevel));
                        var ke = Me(S.expirationTime <= H);
                        if (((H = a.unstable_now()), typeof ke == 'function')) {
                          ((S.callback = ke), D(H), (J = !0));
                          break t;
                        }
                        (S === o(v) && c(v), D(H));
                      } else c(v);
                      S = o(v);
                    }
                    if (S !== null) J = !0;
                    else {
                      var N = o(m);
                      (N !== null && qe(L, N.startTime - H), (J = !1));
                    }
                  }
                  break e;
                } finally {
                  ((S = null), (k = ie), (z = !1));
                }
                J = void 0;
              }
            } finally {
              J ? de() : (Z = !1);
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
            pt = at.port2;
          ((at.port1.onmessage = re),
            (de = function () {
              pt.postMessage(null);
            }));
        } else
          de = function () {
            U(re, 0);
          };
        function qe(H, J) {
          $ = U(function () {
            H(a.unstable_now());
          }, J);
        }
        ((a.unstable_IdlePriority = 5),
          (a.unstable_ImmediatePriority = 1),
          (a.unstable_LowPriority = 4),
          (a.unstable_NormalPriority = 3),
          (a.unstable_Profiling = null),
          (a.unstable_UserBlockingPriority = 2),
          (a.unstable_cancelCallback = function (H) {
            H.callback = null;
          }),
          (a.unstable_forceFrameRate = function (H) {
            0 > H || 125 < H
              ? console.error(
                  'forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported'
                )
              : (B = 0 < H ? Math.floor(1e3 / H) : 5);
          }),
          (a.unstable_getCurrentPriorityLevel = function () {
            return k;
          }),
          (a.unstable_next = function (H) {
            switch (k) {
              case 1:
              case 2:
              case 3:
                var J = 3;
                break;
              default:
                J = k;
            }
            var ie = k;
            k = J;
            try {
              return H();
            } finally {
              k = ie;
            }
          }),
          (a.unstable_requestPaint = function () {
            E = !0;
          }),
          (a.unstable_runWithPriority = function (H, J) {
            switch (H) {
              case 1:
              case 2:
              case 3:
              case 4:
              case 5:
                break;
              default:
                H = 3;
            }
            var ie = k;
            k = H;
            try {
              return J();
            } finally {
              k = ie;
            }
          }),
          (a.unstable_scheduleCallback = function (H, J, ie) {
            var Me = a.unstable_now();
            switch (
              (typeof ie == 'object' && ie !== null
                ? ((ie = ie.delay), (ie = typeof ie == 'number' && 0 < ie ? Me + ie : Me))
                : (ie = Me),
              H)
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
              (ke = ie + ke),
              (H = {
                id: _++,
                callback: J,
                priorityLevel: H,
                startTime: ie,
                expirationTime: ke,
                sortIndex: -1,
              }),
              ie > Me
                ? ((H.sortIndex = ie),
                  u(m, H),
                  o(v) === null && H === o(m) && (C ? (K($), ($ = -1)) : (C = !0), qe(L, ie - Me)))
                : ((H.sortIndex = ke), u(v, H), g || z || ((g = !0), Z || ((Z = !0), de()))),
              H
            );
          }),
          (a.unstable_shouldYield = le),
          (a.unstable_wrapCallback = function (H) {
            var J = k;
            return function () {
              var ie = k;
              k = J;
              try {
                return H.apply(this, arguments);
              } finally {
                k = ie;
              }
            };
          }));
      })(Uo)),
    Uo
  );
}
var Bh;
function K0() {
  return (Bh || ((Bh = 1), (Bo.exports = $0())), Bo.exports);
}
var Lo = { exports: {} },
  fe = {};
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Uh;
function Z0() {
  if (Uh) return fe;
  Uh = 1;
  var a = Symbol.for('react.transitional.element'),
    u = Symbol.for('react.portal'),
    o = Symbol.for('react.fragment'),
    c = Symbol.for('react.strict_mode'),
    r = Symbol.for('react.profiler'),
    d = Symbol.for('react.consumer'),
    h = Symbol.for('react.context'),
    b = Symbol.for('react.forward_ref'),
    v = Symbol.for('react.suspense'),
    m = Symbol.for('react.memo'),
    _ = Symbol.for('react.lazy'),
    S = Symbol.for('react.activity'),
    k = Symbol.iterator;
  function z(N) {
    return N === null || typeof N != 'object'
      ? null
      : ((N = (k && N[k]) || N['@@iterator']), typeof N == 'function' ? N : null);
  }
  var g = {
      isMounted: function () {
        return !1;
      },
      enqueueForceUpdate: function () {},
      enqueueReplaceState: function () {},
      enqueueSetState: function () {},
    },
    C = Object.assign,
    E = {};
  function U(N, G, I) {
    ((this.props = N), (this.context = G), (this.refs = E), (this.updater = I || g));
  }
  ((U.prototype.isReactComponent = {}),
    (U.prototype.setState = function (N, G) {
      if (typeof N != 'object' && typeof N != 'function' && N != null)
        throw Error(
          'takes an object of state variables to update or a function which returns an object of state variables.'
        );
      this.updater.enqueueSetState(this, N, G, 'setState');
    }),
    (U.prototype.forceUpdate = function (N) {
      this.updater.enqueueForceUpdate(this, N, 'forceUpdate');
    }));
  function K() {}
  K.prototype = U.prototype;
  function Q(N, G, I) {
    ((this.props = N), (this.context = G), (this.refs = E), (this.updater = I || g));
  }
  var D = (Q.prototype = new K());
  ((D.constructor = Q), C(D, U.prototype), (D.isPureReactComponent = !0));
  var L = Array.isArray;
  function Z() {}
  var $ = { H: null, A: null, T: null, S: null },
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
  function pt(N, G) {
    return typeof N == 'object' && N !== null && N.key != null ? de('' + N.key) : G.toString(36);
  }
  function qe(N) {
    switch (N.status) {
      case 'fulfilled':
        return N.value;
      case 'rejected':
        throw N.reason;
      default:
        switch (
          (typeof N.status == 'string'
            ? N.then(Z, Z)
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
  function H(N, G, I, P, oe) {
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
            case _:
              return ((Ee = N._init), H(Ee(N._payload), G, I, P, oe));
          }
      }
    if (Ee)
      return (
        (oe = oe(N)),
        (Ee = P === '' ? '.' + pt(N, 0) : P),
        L(oe)
          ? ((I = ''),
            Ee != null && (I = Ee.replace(at, '$&/') + '/'),
            H(oe, G, I, '', function (Y) {
              return Y;
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
    if (L(N))
      for (var Ge = 0; Ge < N.length; Ge++)
        ((P = N[Ge]), (pe = tt + pt(P, Ge)), (Ee += H(P, G, I, pe, oe)));
    else if (((Ge = z(N)), typeof Ge == 'function'))
      for (N = Ge.call(N), Ge = 0; !(P = N.next()).done; )
        ((P = P.value), (pe = tt + pt(P, Ge++)), (Ee += H(P, G, I, pe, oe)));
    else if (pe === 'object') {
      if (typeof N.then == 'function') return H(qe(N), G, I, P, oe);
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
      H(N, P, '', '', function (pe) {
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
    ke = {
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
    (fe.Children = ke),
    (fe.Component = U),
    (fe.Fragment = o),
    (fe.Profiler = r),
    (fe.PureComponent = Q),
    (fe.StrictMode = c),
    (fe.Suspense = v),
    (fe.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = $),
    (fe.__COMPILER_RUNTIME = {
      __proto__: null,
      c: function (N) {
        return $.H.useMemoCache(N);
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
      var P = C({}, N.props),
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
      return { $$typeof: b, render: N };
    }),
    (fe.isValidElement = re),
    (fe.lazy = function (N) {
      return { $$typeof: _, _payload: { _status: -1, _result: N }, _init: ie };
    }),
    (fe.memo = function (N, G) {
      return { $$typeof: m, type: N, compare: G === void 0 ? null : G };
    }),
    (fe.startTransition = function (N) {
      var G = $.T,
        I = {};
      $.T = I;
      try {
        var P = N(),
          oe = $.S;
        (oe !== null && oe(I, P),
          typeof P == 'object' && P !== null && typeof P.then == 'function' && P.then(Z, Me));
      } catch (pe) {
        Me(pe);
      } finally {
        (G !== null && I.types !== null && (G.types = I.types), ($.T = G));
      }
    }),
    (fe.unstable_useCacheRefresh = function () {
      return $.H.useCacheRefresh();
    }),
    (fe.use = function (N) {
      return $.H.use(N);
    }),
    (fe.useActionState = function (N, G, I) {
      return $.H.useActionState(N, G, I);
    }),
    (fe.useCallback = function (N, G) {
      return $.H.useCallback(N, G);
    }),
    (fe.useContext = function (N) {
      return $.H.useContext(N);
    }),
    (fe.useDebugValue = function () {}),
    (fe.useDeferredValue = function (N, G) {
      return $.H.useDeferredValue(N, G);
    }),
    (fe.useEffect = function (N, G) {
      return $.H.useEffect(N, G);
    }),
    (fe.useEffectEvent = function (N) {
      return $.H.useEffectEvent(N);
    }),
    (fe.useId = function () {
      return $.H.useId();
    }),
    (fe.useImperativeHandle = function (N, G, I) {
      return $.H.useImperativeHandle(N, G, I);
    }),
    (fe.useInsertionEffect = function (N, G) {
      return $.H.useInsertionEffect(N, G);
    }),
    (fe.useLayoutEffect = function (N, G) {
      return $.H.useLayoutEffect(N, G);
    }),
    (fe.useMemo = function (N, G) {
      return $.H.useMemo(N, G);
    }),
    (fe.useOptimistic = function (N, G) {
      return $.H.useOptimistic(N, G);
    }),
    (fe.useReducer = function (N, G, I) {
      return $.H.useReducer(N, G, I);
    }),
    (fe.useRef = function (N) {
      return $.H.useRef(N);
    }),
    (fe.useState = function (N) {
      return $.H.useState(N);
    }),
    (fe.useSyncExternalStore = function (N, G, I) {
      return $.H.useSyncExternalStore(N, G, I);
    }),
    (fe.useTransition = function () {
      return $.H.useTransition();
    }),
    (fe.version = '19.2.5'),
    fe
  );
}
var Lh;
function fr() {
  return (Lh || ((Lh = 1), (Lo.exports = Z0())), Lo.exports);
}
var Ho = { exports: {} },
  rt = {};
/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Hh;
function J0() {
  if (Hh) return rt;
  Hh = 1;
  var a = fr();
  function u(v) {
    var m = 'https://react.dev/errors/' + v;
    if (1 < arguments.length) {
      m += '?args[]=' + encodeURIComponent(arguments[1]);
      for (var _ = 2; _ < arguments.length; _++) m += '&args[]=' + encodeURIComponent(arguments[_]);
    }
    return (
      'Minified React error #' +
      v +
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
  function d(v, m, _) {
    var S = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: r,
      key: S == null ? null : '' + S,
      children: v,
      containerInfo: m,
      implementation: _,
    };
  }
  var h = a.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function b(v, m) {
    if (v === 'font') return '';
    if (typeof m == 'string') return m === 'use-credentials' ? m : '';
  }
  return (
    (rt.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = c),
    (rt.createPortal = function (v, m) {
      var _ = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
      if (!m || (m.nodeType !== 1 && m.nodeType !== 9 && m.nodeType !== 11)) throw Error(u(299));
      return d(v, m, null, _);
    }),
    (rt.flushSync = function (v) {
      var m = h.T,
        _ = c.p;
      try {
        if (((h.T = null), (c.p = 2), v)) return v();
      } finally {
        ((h.T = m), (c.p = _), c.d.f());
      }
    }),
    (rt.preconnect = function (v, m) {
      typeof v == 'string' &&
        (m
          ? ((m = m.crossOrigin),
            (m = typeof m == 'string' ? (m === 'use-credentials' ? m : '') : void 0))
          : (m = null),
        c.d.C(v, m));
    }),
    (rt.prefetchDNS = function (v) {
      typeof v == 'string' && c.d.D(v);
    }),
    (rt.preinit = function (v, m) {
      if (typeof v == 'string' && m && typeof m.as == 'string') {
        var _ = m.as,
          S = b(_, m.crossOrigin),
          k = typeof m.integrity == 'string' ? m.integrity : void 0,
          z = typeof m.fetchPriority == 'string' ? m.fetchPriority : void 0;
        _ === 'style'
          ? c.d.S(v, typeof m.precedence == 'string' ? m.precedence : void 0, {
              crossOrigin: S,
              integrity: k,
              fetchPriority: z,
            })
          : _ === 'script' &&
            c.d.X(v, {
              crossOrigin: S,
              integrity: k,
              fetchPriority: z,
              nonce: typeof m.nonce == 'string' ? m.nonce : void 0,
            });
      }
    }),
    (rt.preinitModule = function (v, m) {
      if (typeof v == 'string')
        if (typeof m == 'object' && m !== null) {
          if (m.as == null || m.as === 'script') {
            var _ = b(m.as, m.crossOrigin);
            c.d.M(v, {
              crossOrigin: _,
              integrity: typeof m.integrity == 'string' ? m.integrity : void 0,
              nonce: typeof m.nonce == 'string' ? m.nonce : void 0,
            });
          }
        } else m == null && c.d.M(v);
    }),
    (rt.preload = function (v, m) {
      if (typeof v == 'string' && typeof m == 'object' && m !== null && typeof m.as == 'string') {
        var _ = m.as,
          S = b(_, m.crossOrigin);
        c.d.L(v, _, {
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
    (rt.preloadModule = function (v, m) {
      if (typeof v == 'string')
        if (m) {
          var _ = b(m.as, m.crossOrigin);
          c.d.m(v, {
            as: typeof m.as == 'string' && m.as !== 'script' ? m.as : void 0,
            crossOrigin: _,
            integrity: typeof m.integrity == 'string' ? m.integrity : void 0,
          });
        } else c.d.m(v);
    }),
    (rt.requestFormReset = function (v) {
      c.d.r(v);
    }),
    (rt.unstable_batchedUpdates = function (v, m) {
      return v(m);
    }),
    (rt.useFormState = function (v, m, _) {
      return h.H.useFormState(v, m, _);
    }),
    (rt.useFormStatus = function () {
      return h.H.useHostTransitionStatus();
    }),
    (rt.version = '19.2.5'),
    rt
  );
}
var qh;
function I0() {
  if (qh) return Ho.exports;
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
  return (a(), (Ho.exports = J0()), Ho.exports);
}
/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Gh;
function W0() {
  if (Gh) return gi;
  Gh = 1;
  var a = K0(),
    u = fr(),
    o = I0();
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
  function b(e) {
    if (e.tag === 31) {
      var t = e.memoizedState;
      if ((t === null && ((e = e.alternate), e !== null && (t = e.memoizedState)), t !== null))
        return t.dehydrated;
    }
    return null;
  }
  function v(e) {
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
          if (s === l) return (v(i), e);
          if (s === n) return (v(i), t);
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
  function _(e) {
    var t = e.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return e;
    for (e = e.child; e !== null; ) {
      if (((t = _(e)), t !== null)) return t;
      e = e.sibling;
    }
    return null;
  }
  var S = Object.assign,
    k = Symbol.for('react.element'),
    z = Symbol.for('react.transitional.element'),
    g = Symbol.for('react.portal'),
    C = Symbol.for('react.fragment'),
    E = Symbol.for('react.strict_mode'),
    U = Symbol.for('react.profiler'),
    K = Symbol.for('react.consumer'),
    Q = Symbol.for('react.context'),
    D = Symbol.for('react.forward_ref'),
    L = Symbol.for('react.suspense'),
    Z = Symbol.for('react.suspense_list'),
    $ = Symbol.for('react.memo'),
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
  function pt(e) {
    if (e == null) return null;
    if (typeof e == 'function') return e.$$typeof === at ? null : e.displayName || e.name || null;
    if (typeof e == 'string') return e;
    switch (e) {
      case C:
        return 'Fragment';
      case U:
        return 'Profiler';
      case E:
        return 'StrictMode';
      case L:
        return 'Suspense';
      case Z:
        return 'SuspenseList';
      case F:
        return 'Activity';
    }
    if (typeof e == 'object')
      switch (e.$$typeof) {
        case g:
          return 'Portal';
        case Q:
          return e.displayName || 'Context';
        case K:
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
        case $:
          return ((t = e.displayName || null), t !== null ? t : pt(e.type) || 'Memo');
        case B:
          ((t = e._payload), (e = e._init));
          try {
            return pt(e(t));
          } catch {}
      }
    return null;
  }
  var qe = Array.isArray,
    H = u.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
    J = o.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
    ie = { pending: !1, data: null, method: null, action: null },
    Me = [],
    ke = -1;
  function N(e) {
    return { current: e };
  }
  function G(e) {
    0 > ke || ((e.current = Me[ke]), (Me[ke] = null), ke--);
  }
  function I(e, t) {
    (ke++, (Me[ke] = e.current), (e.current = t));
  }
  var P = N(null),
    oe = N(null),
    pe = N(null),
    Ee = N(null);
  function tt(e, t) {
    switch ((I(pe, t), I(oe, e), I(P, null), t.nodeType)) {
      case 9:
      case 11:
        e = (e = t.documentElement) && (e = e.namespaceURI) ? lh(e) : 0;
        break;
      default:
        if (((e = t.tagName), (t = t.namespaceURI))) ((t = lh(t)), (e = nh(t, e)));
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
  function Y(e) {
    e.memoizedState !== null && I(Ee, e);
    var t = P.current,
      l = nh(t, e.type);
    t !== l && (I(oe, e), I(P, l));
  }
  function ae(e) {
    (oe.current === e && (G(P), G(oe)), Ee.current === e && (G(Ee), (di._currentValue = ie)));
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
  var yt = !1;
  function ys(e, t) {
    if (!e || yt) return '';
    yt = !0;
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
                  var O = w;
                }
                Reflect.construct(e, [], V);
              } else {
                try {
                  V.call();
                } catch (w) {
                  O = w;
                }
                e.call(V.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (w) {
                O = w;
              }
              (V = e()) && typeof V.catch == 'function' && V.catch(function () {});
            }
          } catch (w) {
            if (w && O && typeof w.stack == 'string') return [w.stack, O.stack];
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
              while (1 <= n && 0 <= i);
            break;
          }
      }
    } finally {
      ((yt = !1), (Error.prepareStackTrace = l));
    }
    return (l = e ? e.displayName || e.name : '') ? Se(l) : '';
  }
  function _y(e, t) {
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
        return ys(e.type, !1);
      case 11:
        return ys(e.type.render, !1);
      case 1:
        return ys(e.type, !0);
      case 31:
        return Se('Activity');
      default:
        return '';
    }
  }
  function Or(e) {
    try {
      var t = '',
        l = null;
      do ((t += _y(e, l)), (l = e), (e = e.return));
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
  var gs = Object.prototype.hasOwnProperty,
    vs = a.unstable_scheduleCallback,
    _s = a.unstable_cancelCallback,
    by = a.unstable_shouldYield,
    Sy = a.unstable_requestPaint,
    Tt = a.unstable_now,
    xy = a.unstable_getCurrentPriorityLevel,
    Dr = a.unstable_ImmediatePriority,
    zr = a.unstable_UserBlockingPriority,
    Oi = a.unstable_NormalPriority,
    Ey = a.unstable_LowPriority,
    wr = a.unstable_IdlePriority,
    Ty = a.log,
    Ny = a.unstable_setDisableYieldValue,
    Ta = null,
    Nt = null;
  function Dl(e) {
    if ((typeof Ty == 'function' && Ny(e), Nt && typeof Nt.setStrictMode == 'function'))
      try {
        Nt.setStrictMode(Ta, e);
      } catch {}
  }
  var At = Math.clz32 ? Math.clz32 : My,
    Ay = Math.log,
    Cy = Math.LN2;
  function My(e) {
    return ((e >>>= 0), e === 0 ? 32 : (31 - ((Ay(e) / Cy) | 0)) | 0);
  }
  var Di = 256,
    zi = 262144,
    wi = 4194304;
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
  function Bi(e, t, l) {
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
            ? (i = on(n))
            : ((f &= p), f !== 0 ? (i = on(f)) : l || ((l = p & ~e), l !== 0 && (i = on(l)))))
        : ((p = n & ~s),
          p !== 0
            ? (i = on(p))
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
  function Na(e, t) {
    return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & t) === 0;
  }
  function ky(e, t) {
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
  function Br() {
    var e = wi;
    return ((wi <<= 1), (wi & 62914560) === 0 && (wi = 4194304), e);
  }
  function bs(e) {
    for (var t = [], l = 0; 31 > l; l++) t.push(e);
    return t;
  }
  function Aa(e, t) {
    ((e.pendingLanes |= t),
      t !== 268435456 && ((e.suspendedLanes = 0), (e.pingedLanes = 0), (e.warmLanes = 0)));
  }
  function Ry(e, t, l, n, i, s) {
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
      var q = 31 - At(l),
        V = 1 << q;
      ((p[q] = 0), (x[q] = -1));
      var O = j[q];
      if (O !== null)
        for (j[q] = null, q = 0; q < O.length; q++) {
          var w = O[q];
          w !== null && (w.lane &= -536870913);
        }
      l &= ~V;
    }
    (n !== 0 && Ur(e, n, 0),
      s !== 0 && i === 0 && e.tag !== 0 && (e.suspendedLanes |= s & ~(f & ~t)));
  }
  function Ur(e, t, l) {
    ((e.pendingLanes |= t), (e.suspendedLanes &= ~t));
    var n = 31 - At(t);
    ((e.entangledLanes |= t),
      (e.entanglements[n] = e.entanglements[n] | 1073741824 | (l & 261930)));
  }
  function Lr(e, t) {
    var l = (e.entangledLanes |= t);
    for (e = e.entanglements; l; ) {
      var n = 31 - At(l),
        i = 1 << n;
      ((i & t) | (e[n] & t) && (e[n] |= t), (l &= ~i));
    }
  }
  function Hr(e, t) {
    var l = t & -t;
    return ((l = (l & 42) !== 0 ? 1 : Ss(l)), (l & (e.suspendedLanes | t)) !== 0 ? 0 : l);
  }
  function Ss(e) {
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
  function xs(e) {
    return ((e &= -e), 2 < e ? (8 < e ? ((e & 134217727) !== 0 ? 32 : 268435456) : 8) : 2);
  }
  function qr() {
    var e = J.p;
    return e !== 0 ? e : ((e = window.event), e === void 0 ? 32 : Ah(e.type));
  }
  function Gr(e, t) {
    var l = J.p;
    try {
      return ((J.p = e), t());
    } finally {
      J.p = l;
    }
  }
  var zl = Math.random().toString(36).slice(2),
    it = '__reactFiber$' + zl,
    gt = '__reactProps$' + zl,
    Rn = '__reactContainer$' + zl,
    Es = '__reactEvents$' + zl,
    jy = '__reactListeners$' + zl,
    Oy = '__reactHandles$' + zl,
    Yr = '__reactResources$' + zl,
    Ca = '__reactMarker$' + zl;
  function Ts(e) {
    (delete e[it], delete e[gt], delete e[Es], delete e[jy], delete e[Oy]);
  }
  function jn(e) {
    var t = e[it];
    if (t) return t;
    for (var l = e.parentNode; l; ) {
      if ((t = l[Rn] || l[it])) {
        if (((l = t.alternate), t.child !== null || (l !== null && l.child !== null)))
          for (e = rh(e); e !== null; ) {
            if ((l = e[it])) return l;
            e = rh(e);
          }
        return t;
      }
      ((e = l), (l = e.parentNode));
    }
    return null;
  }
  function On(e) {
    if ((e = e[it] || e[Rn])) {
      var t = e.tag;
      if (t === 5 || t === 6 || t === 13 || t === 31 || t === 26 || t === 27 || t === 3) return e;
    }
    return null;
  }
  function Ma(e) {
    var t = e.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return e.stateNode;
    throw Error(c(33));
  }
  function Dn(e) {
    var t = e[Yr];
    return (t || (t = e[Yr] = { hoistableStyles: new Map(), hoistableScripts: new Map() }), t);
  }
  function lt(e) {
    e[Ca] = !0;
  }
  var Xr = new Set(),
    Vr = {};
  function rn(e, t) {
    (zn(e, t), zn(e + 'Capture', t));
  }
  function zn(e, t) {
    for (Vr[e] = t, e = 0; e < t.length; e++) Xr.add(t[e]);
  }
  var Dy = RegExp(
      '^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$'
    ),
    Qr = {},
    $r = {};
  function zy(e) {
    return gs.call($r, e)
      ? !0
      : gs.call(Qr, e)
        ? !1
        : Dy.test(e)
          ? ($r[e] = !0)
          : ((Qr[e] = !0), !1);
  }
  function Ui(e, t, l) {
    if (zy(t))
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
  function Li(e, t, l) {
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
  function Kr(e) {
    var t = e.type;
    return (e = e.nodeName) && e.toLowerCase() === 'input' && (t === 'checkbox' || t === 'radio');
  }
  function wy(e, t, l) {
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
  function Ns(e) {
    if (!e._valueTracker) {
      var t = Kr(e) ? 'checked' : 'value';
      e._valueTracker = wy(e, t, '' + e[t]);
    }
  }
  function Zr(e) {
    if (!e) return !1;
    var t = e._valueTracker;
    if (!t) return !0;
    var l = t.getValue(),
      n = '';
    return (
      e && (n = Kr(e) ? (e.checked ? 'true' : 'false') : e.value),
      (e = n),
      e !== l ? (t.setValue(e), !0) : !1
    );
  }
  function Hi(e) {
    if (((e = e || (typeof document < 'u' ? document : void 0)), typeof e > 'u')) return null;
    try {
      return e.activeElement || e.body;
    } catch {
      return e.body;
    }
  }
  var By = /[\n"\\]/g;
  function Ut(e) {
    return e.replace(By, function (t) {
      return '\\' + t.charCodeAt(0).toString(16) + ' ';
    });
  }
  function As(e, t, l, n, i, s, f, p) {
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
        ? Cs(e, f, Bt(t))
        : l != null
          ? Cs(e, f, Bt(l))
          : n != null && e.removeAttribute('value'),
      i == null && s != null && (e.defaultChecked = !!s),
      i != null && (e.checked = i && typeof i != 'function' && typeof i != 'symbol'),
      p != null && typeof p != 'function' && typeof p != 'symbol' && typeof p != 'boolean'
        ? (e.name = '' + Bt(p))
        : e.removeAttribute('name'));
  }
  function Jr(e, t, l, n, i, s, f, p) {
    if (
      (s != null &&
        typeof s != 'function' &&
        typeof s != 'symbol' &&
        typeof s != 'boolean' &&
        (e.type = s),
      t != null || l != null)
    ) {
      if (!((s !== 'submit' && s !== 'reset') || t != null)) {
        Ns(e);
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
      Ns(e));
  }
  function Cs(e, t, l) {
    (t === 'number' && Hi(e.ownerDocument) === e) ||
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
  function Ir(e, t, l) {
    if (t != null && ((t = '' + Bt(t)), t !== e.value && (e.value = t), l == null)) {
      e.defaultValue !== t && (e.defaultValue = t);
      return;
    }
    e.defaultValue = l != null ? '' + Bt(l) : '';
  }
  function Wr(e, t, l, n) {
    if (t == null) {
      if (n != null) {
        if (l != null) throw Error(c(92));
        if (qe(n)) {
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
      Ns(e));
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
  var Uy = new Set(
    'animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp'.split(
      ' '
    )
  );
  function Fr(e, t, l) {
    var n = t.indexOf('--') === 0;
    l == null || typeof l == 'boolean' || l === ''
      ? n
        ? e.setProperty(t, '')
        : t === 'float'
          ? (e.cssFloat = '')
          : (e[t] = '')
      : n
        ? e.setProperty(t, l)
        : typeof l != 'number' || l === 0 || Uy.has(t)
          ? t === 'float'
            ? (e.cssFloat = l)
            : (e[t] = ('' + l).trim())
          : (e[t] = l + 'px');
  }
  function Pr(e, t, l) {
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
      for (var i in t) ((n = t[i]), t.hasOwnProperty(i) && l[i] !== n && Fr(e, i, n));
    } else for (var s in t) t.hasOwnProperty(s) && Fr(e, s, t[s]);
  }
  function Ms(e) {
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
  var Ly = new Map([
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
    Hy =
      /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function qi(e) {
    return Hy.test('' + e)
      ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')"
      : e;
  }
  function sl() {}
  var ks = null;
  function Rs(e) {
    return (
      (e = e.target || e.srcElement || window),
      e.correspondingUseElement && (e = e.correspondingUseElement),
      e.nodeType === 3 ? e.parentNode : e
    );
  }
  var Un = null,
    Ln = null;
  function ef(e) {
    var t = On(e);
    if (t && (e = t.stateNode)) {
      var l = e[gt] || null;
      e: switch (((e = t.stateNode), t.type)) {
        case 'input':
          if (
            (As(
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
                As(
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
            for (t = 0; t < l.length; t++) ((n = l[t]), n.form === e.form && Zr(n));
          }
          break e;
        case 'textarea':
          Ir(e, l.value, l.defaultValue);
          break e;
        case 'select':
          ((t = l.value), t != null && wn(e, !!l.multiple, t, !1));
      }
    }
  }
  var js = !1;
  function tf(e, t, l) {
    if (js) return e(t, l);
    js = !0;
    try {
      var n = e(t);
      return n;
    } finally {
      if (
        ((js = !1),
        (Un !== null || Ln !== null) &&
          (Cu(), Un && ((t = Un), (e = Ln), (Ln = Un = null), ef(t), e)))
      )
        for (t = 0; t < e.length; t++) ef(e[t]);
    }
  }
  function ka(e, t) {
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
  var cl = !(
      typeof window > 'u' ||
      typeof window.document > 'u' ||
      typeof window.document.createElement > 'u'
    ),
    Os = !1;
  if (cl)
    try {
      var Ra = {};
      (Object.defineProperty(Ra, 'passive', {
        get: function () {
          Os = !0;
        },
      }),
        window.addEventListener('test', Ra, Ra),
        window.removeEventListener('test', Ra, Ra));
    } catch {
      Os = !1;
    }
  var wl = null,
    Ds = null,
    Gi = null;
  function lf() {
    if (Gi) return Gi;
    var e,
      t = Ds,
      l = t.length,
      n,
      i = 'value' in wl ? wl.value : wl.textContent,
      s = i.length;
    for (e = 0; e < l && t[e] === i[e]; e++);
    var f = l - e;
    for (n = 1; n <= f && t[l - n] === i[s - n]; n++);
    return (Gi = i.slice(e, 1 < n ? 1 - n : void 0));
  }
  function Yi(e) {
    var t = e.keyCode;
    return (
      'charCode' in e ? ((e = e.charCode), e === 0 && t === 13 && (e = 13)) : (e = t),
      e === 10 && (e = 13),
      32 <= e || e === 13 ? e : 0
    );
  }
  function Xi() {
    return !0;
  }
  function nf() {
    return !1;
  }
  function vt(e) {
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
          ? Xi
          : nf),
        (this.isPropagationStopped = nf),
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
            (this.isDefaultPrevented = Xi));
        },
        stopPropagation: function () {
          var l = this.nativeEvent;
          l &&
            (l.stopPropagation
              ? l.stopPropagation()
              : typeof l.cancelBubble != 'unknown' && (l.cancelBubble = !0),
            (this.isPropagationStopped = Xi));
        },
        persist: function () {},
        isPersistent: Xi,
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
    Vi = vt(fn),
    ja = S({}, fn, { view: 0, detail: 0 }),
    qy = vt(ja),
    zs,
    ws,
    Oa,
    Qi = S({}, ja, {
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
      getModifierState: Us,
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
          : (e !== Oa &&
              (Oa && e.type === 'mousemove'
                ? ((zs = e.screenX - Oa.screenX), (ws = e.screenY - Oa.screenY))
                : (ws = zs = 0),
              (Oa = e)),
            zs);
      },
      movementY: function (e) {
        return 'movementY' in e ? e.movementY : ws;
      },
    }),
    af = vt(Qi),
    Gy = S({}, Qi, { dataTransfer: 0 }),
    Yy = vt(Gy),
    Xy = S({}, ja, { relatedTarget: 0 }),
    Bs = vt(Xy),
    Vy = S({}, fn, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
    Qy = vt(Vy),
    $y = S({}, fn, {
      clipboardData: function (e) {
        return 'clipboardData' in e ? e.clipboardData : window.clipboardData;
      },
    }),
    Ky = vt($y),
    Zy = S({}, fn, { data: 0 }),
    uf = vt(Zy),
    Jy = {
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
    Iy = {
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
    Wy = { Alt: 'altKey', Control: 'ctrlKey', Meta: 'metaKey', Shift: 'shiftKey' };
  function Fy(e) {
    var t = this.nativeEvent;
    return t.getModifierState ? t.getModifierState(e) : (e = Wy[e]) ? !!t[e] : !1;
  }
  function Us() {
    return Fy;
  }
  var Py = S({}, ja, {
      key: function (e) {
        if (e.key) {
          var t = Jy[e.key] || e.key;
          if (t !== 'Unidentified') return t;
        }
        return e.type === 'keypress'
          ? ((e = Yi(e)), e === 13 ? 'Enter' : String.fromCharCode(e))
          : e.type === 'keydown' || e.type === 'keyup'
            ? Iy[e.keyCode] || 'Unidentified'
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
      getModifierState: Us,
      charCode: function (e) {
        return e.type === 'keypress' ? Yi(e) : 0;
      },
      keyCode: function (e) {
        return e.type === 'keydown' || e.type === 'keyup' ? e.keyCode : 0;
      },
      which: function (e) {
        return e.type === 'keypress'
          ? Yi(e)
          : e.type === 'keydown' || e.type === 'keyup'
            ? e.keyCode
            : 0;
      },
    }),
    eg = vt(Py),
    tg = S({}, Qi, {
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
    sf = vt(tg),
    lg = S({}, ja, {
      touches: 0,
      targetTouches: 0,
      changedTouches: 0,
      altKey: 0,
      metaKey: 0,
      ctrlKey: 0,
      shiftKey: 0,
      getModifierState: Us,
    }),
    ng = vt(lg),
    ag = S({}, fn, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
    ig = vt(ag),
    ug = S({}, Qi, {
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
    sg = vt(ug),
    cg = S({}, fn, { newState: 0, oldState: 0 }),
    og = vt(cg),
    rg = [9, 13, 27, 32],
    Ls = cl && 'CompositionEvent' in window,
    Da = null;
  cl && 'documentMode' in document && (Da = document.documentMode);
  var fg = cl && 'TextEvent' in window && !Da,
    cf = cl && (!Ls || (Da && 8 < Da && 11 >= Da)),
    of = ' ',
    rf = !1;
  function ff(e, t) {
    switch (e) {
      case 'keyup':
        return rg.indexOf(t.keyCode) !== -1;
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
  function df(e) {
    return ((e = e.detail), typeof e == 'object' && 'data' in e ? e.data : null);
  }
  var Hn = !1;
  function dg(e, t) {
    switch (e) {
      case 'compositionend':
        return df(t);
      case 'keypress':
        return t.which !== 32 ? null : ((rf = !0), of);
      case 'textInput':
        return ((e = t.data), e === of && rf ? null : e);
      default:
        return null;
    }
  }
  function mg(e, t) {
    if (Hn)
      return e === 'compositionend' || (!Ls && ff(e, t))
        ? ((e = lf()), (Gi = Ds = wl = null), (Hn = !1), e)
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
        return cf && t.locale !== 'ko' ? null : t.data;
      default:
        return null;
    }
  }
  var hg = {
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
  function mf(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t === 'input' ? !!hg[e.type] : t === 'textarea';
  }
  function hf(e, t, l, n) {
    (Un ? (Ln ? Ln.push(n) : (Ln = [n])) : (Un = n),
      (t = zu(t, 'onChange')),
      0 < t.length &&
        ((l = new Vi('onChange', 'change', null, l, n)), e.push({ event: l, listeners: t })));
  }
  var za = null,
    wa = null;
  function pg(e) {
    Im(e, 0);
  }
  function $i(e) {
    var t = Ma(e);
    if (Zr(t)) return e;
  }
  function pf(e, t) {
    if (e === 'change') return t;
  }
  var yf = !1;
  if (cl) {
    var Hs;
    if (cl) {
      var qs = 'oninput' in document;
      if (!qs) {
        var gf = document.createElement('div');
        (gf.setAttribute('oninput', 'return;'), (qs = typeof gf.oninput == 'function'));
      }
      Hs = qs;
    } else Hs = !1;
    yf = Hs && (!document.documentMode || 9 < document.documentMode);
  }
  function vf() {
    za && (za.detachEvent('onpropertychange', _f), (wa = za = null));
  }
  function _f(e) {
    if (e.propertyName === 'value' && $i(wa)) {
      var t = [];
      (hf(t, wa, e, Rs(e)), tf(pg, t));
    }
  }
  function yg(e, t, l) {
    e === 'focusin'
      ? (vf(), (za = t), (wa = l), za.attachEvent('onpropertychange', _f))
      : e === 'focusout' && vf();
  }
  function gg(e) {
    if (e === 'selectionchange' || e === 'keyup' || e === 'keydown') return $i(wa);
  }
  function vg(e, t) {
    if (e === 'click') return $i(t);
  }
  function _g(e, t) {
    if (e === 'input' || e === 'change') return $i(t);
  }
  function bg(e, t) {
    return (e === t && (e !== 0 || 1 / e === 1 / t)) || (e !== e && t !== t);
  }
  var Ct = typeof Object.is == 'function' ? Object.is : bg;
  function Ba(e, t) {
    if (Ct(e, t)) return !0;
    if (typeof e != 'object' || e === null || typeof t != 'object' || t === null) return !1;
    var l = Object.keys(e),
      n = Object.keys(t);
    if (l.length !== n.length) return !1;
    for (n = 0; n < l.length; n++) {
      var i = l[n];
      if (!gs.call(t, i) || !Ct(e[i], t[i])) return !1;
    }
    return !0;
  }
  function bf(e) {
    for (; e && e.firstChild; ) e = e.firstChild;
    return e;
  }
  function Sf(e, t) {
    var l = bf(e);
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
      l = bf(l);
    }
  }
  function xf(e, t) {
    return e && t
      ? e === t
        ? !0
        : e && e.nodeType === 3
          ? !1
          : t && t.nodeType === 3
            ? xf(e, t.parentNode)
            : 'contains' in e
              ? e.contains(t)
              : e.compareDocumentPosition
                ? !!(e.compareDocumentPosition(t) & 16)
                : !1
      : !1;
  }
  function Ef(e) {
    e =
      e != null && e.ownerDocument != null && e.ownerDocument.defaultView != null
        ? e.ownerDocument.defaultView
        : window;
    for (var t = Hi(e.document); t instanceof e.HTMLIFrameElement; ) {
      try {
        var l = typeof t.contentWindow.location.href == 'string';
      } catch {
        l = !1;
      }
      if (l) e = t.contentWindow;
      else break;
      t = Hi(e.document);
    }
    return t;
  }
  function Gs(e) {
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
  var Sg = cl && 'documentMode' in document && 11 >= document.documentMode,
    qn = null,
    Ys = null,
    Ua = null,
    Xs = !1;
  function Tf(e, t, l) {
    var n = l.window === l ? l.document : l.nodeType === 9 ? l : l.ownerDocument;
    Xs ||
      qn == null ||
      qn !== Hi(n) ||
      ((n = qn),
      'selectionStart' in n && Gs(n)
        ? (n = { start: n.selectionStart, end: n.selectionEnd })
        : ((n = ((n.ownerDocument && n.ownerDocument.defaultView) || window).getSelection()),
          (n = {
            anchorNode: n.anchorNode,
            anchorOffset: n.anchorOffset,
            focusNode: n.focusNode,
            focusOffset: n.focusOffset,
          })),
      (Ua && Ba(Ua, n)) ||
        ((Ua = n),
        (n = zu(Ys, 'onSelect')),
        0 < n.length &&
          ((t = new Vi('onSelect', 'select', null, t, l)),
          e.push({ event: t, listeners: n }),
          (t.target = qn))));
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
  var Gn = {
      animationend: dn('Animation', 'AnimationEnd'),
      animationiteration: dn('Animation', 'AnimationIteration'),
      animationstart: dn('Animation', 'AnimationStart'),
      transitionrun: dn('Transition', 'TransitionRun'),
      transitionstart: dn('Transition', 'TransitionStart'),
      transitioncancel: dn('Transition', 'TransitionCancel'),
      transitionend: dn('Transition', 'TransitionEnd'),
    },
    Vs = {},
    Nf = {};
  cl &&
    ((Nf = document.createElement('div').style),
    'AnimationEvent' in window ||
      (delete Gn.animationend.animation,
      delete Gn.animationiteration.animation,
      delete Gn.animationstart.animation),
    'TransitionEvent' in window || delete Gn.transitionend.transition);
  function mn(e) {
    if (Vs[e]) return Vs[e];
    if (!Gn[e]) return e;
    var t = Gn[e],
      l;
    for (l in t) if (t.hasOwnProperty(l) && l in Nf) return (Vs[e] = t[l]);
    return e;
  }
  var Af = mn('animationend'),
    Cf = mn('animationiteration'),
    Mf = mn('animationstart'),
    xg = mn('transitionrun'),
    Eg = mn('transitionstart'),
    Tg = mn('transitioncancel'),
    kf = mn('transitionend'),
    Rf = new Map(),
    Qs =
      'abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel'.split(
        ' '
      );
  Qs.push('scrollEnd');
  function Zt(e, t) {
    (Rf.set(e, t), rn(t, [e]));
  }
  var Ki =
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
    Yn = 0,
    $s = 0;
  function Zi() {
    for (var e = Yn, t = ($s = Yn = 0); t < e; ) {
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
      s !== 0 && jf(l, i, s);
    }
  }
  function Ji(e, t, l, n) {
    ((Lt[Yn++] = e),
      (Lt[Yn++] = t),
      (Lt[Yn++] = l),
      (Lt[Yn++] = n),
      ($s |= n),
      (e.lanes |= n),
      (e = e.alternate),
      e !== null && (e.lanes |= n));
  }
  function Ks(e, t, l, n) {
    return (Ji(e, t, l, n), Ii(e));
  }
  function hn(e, t) {
    return (Ji(e, null, null, t), Ii(e));
  }
  function jf(e, t, l) {
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
          ((i = 31 - At(l)),
          (e = s.hiddenUpdates),
          (n = e[i]),
          n === null ? (e[i] = [t]) : n.push(t),
          (t.lane = l | 536870912)),
        s)
      : null;
  }
  function Ii(e) {
    if (50 < ii) throw ((ii = 0), (lo = null), Error(c(185)));
    for (var t = e.return; t !== null; ) ((e = t), (t = e.return));
    return e.tag === 3 ? e.stateNode : null;
  }
  var Xn = {};
  function Ng(e, t, l, n) {
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
  function Mt(e, t, l, n) {
    return new Ng(e, t, l, n);
  }
  function Zs(e) {
    return ((e = e.prototype), !(!e || !e.isReactComponent));
  }
  function ol(e, t) {
    var l = e.alternate;
    return (
      l === null
        ? ((l = Mt(e.tag, t, e.key, e.mode)),
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
  function Of(e, t) {
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
  function Wi(e, t, l, n, i, s) {
    var f = 0;
    if (((n = e), typeof e == 'function')) Zs(e) && (f = 1);
    else if (typeof e == 'string')
      f = R0(e, l, P.current) ? 26 : e === 'html' || e === 'head' || e === 'body' ? 27 : 5;
    else
      e: switch (e) {
        case F:
          return ((e = Mt(31, l, t, i)), (e.elementType = F), (e.lanes = s), e);
        case C:
          return pn(l.children, i, s, t);
        case E:
          ((f = 8), (i |= 24));
          break;
        case U:
          return ((e = Mt(12, l, t, i | 2)), (e.elementType = U), (e.lanes = s), e);
        case L:
          return ((e = Mt(13, l, t, i)), (e.elementType = L), (e.lanes = s), e);
        case Z:
          return ((e = Mt(19, l, t, i)), (e.elementType = Z), (e.lanes = s), e);
        default:
          if (typeof e == 'object' && e !== null)
            switch (e.$$typeof) {
              case Q:
                f = 10;
                break e;
              case K:
                f = 9;
                break e;
              case D:
                f = 11;
                break e;
              case $:
                f = 14;
                break e;
              case B:
                ((f = 16), (n = null));
                break e;
            }
          ((f = 29), (l = Error(c(130, e === null ? 'null' : typeof e, ''))), (n = null));
      }
    return ((t = Mt(f, l, t, i)), (t.elementType = e), (t.type = n), (t.lanes = s), t);
  }
  function pn(e, t, l, n) {
    return ((e = Mt(7, e, n, t)), (e.lanes = l), e);
  }
  function Js(e, t, l) {
    return ((e = Mt(6, e, null, t)), (e.lanes = l), e);
  }
  function Df(e) {
    var t = Mt(18, null, null, 0);
    return ((t.stateNode = e), t);
  }
  function Is(e, t, l) {
    return (
      (t = Mt(4, e.children !== null ? e.children : [], e.key, t)),
      (t.lanes = l),
      (t.stateNode = {
        containerInfo: e.containerInfo,
        pendingChildren: null,
        implementation: e.implementation,
      }),
      t
    );
  }
  var zf = new WeakMap();
  function Ht(e, t) {
    if (typeof e == 'object' && e !== null) {
      var l = zf.get(e);
      return l !== void 0 ? l : ((t = { value: e, source: t, stack: Or(t) }), zf.set(e, t), t);
    }
    return { value: e, source: t, stack: Or(t) };
  }
  var Vn = [],
    Qn = 0,
    Fi = null,
    La = 0,
    qt = [],
    Gt = 0,
    Bl = null,
    el = 1,
    tl = '';
  function rl(e, t) {
    ((Vn[Qn++] = La), (Vn[Qn++] = Fi), (Fi = e), (La = t));
  }
  function wf(e, t, l) {
    ((qt[Gt++] = el), (qt[Gt++] = tl), (qt[Gt++] = Bl), (Bl = e));
    var n = el;
    e = tl;
    var i = 32 - At(n) - 1;
    ((n &= ~(1 << i)), (l += 1));
    var s = 32 - At(t) + i;
    if (30 < s) {
      var f = i - (i % 5);
      ((s = (n & ((1 << f) - 1)).toString(32)),
        (n >>= f),
        (i -= f),
        (el = (1 << (32 - At(t) + i)) | (l << i) | n),
        (tl = s + e));
    } else ((el = (1 << s) | (l << i) | n), (tl = e));
  }
  function Ws(e) {
    e.return !== null && (rl(e, 1), wf(e, 1, 0));
  }
  function Fs(e) {
    for (; e === Fi; ) ((Fi = Vn[--Qn]), (Vn[Qn] = null), (La = Vn[--Qn]), (Vn[Qn] = null));
    for (; e === Bl; )
      ((Bl = qt[--Gt]),
        (qt[Gt] = null),
        (tl = qt[--Gt]),
        (qt[Gt] = null),
        (el = qt[--Gt]),
        (qt[Gt] = null));
  }
  function Bf(e, t) {
    ((qt[Gt++] = el), (qt[Gt++] = tl), (qt[Gt++] = Bl), (el = t.id), (tl = t.overflow), (Bl = e));
  }
  var ut = null,
    Le = null,
    be = !1,
    Ul = null,
    Yt = !1,
    Ps = Error(c(519));
  function Ll(e) {
    var t = Error(
      c(418, 1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? 'text' : 'HTML', '')
    );
    throw (Ha(Ht(t, e)), Ps);
  }
  function Uf(e) {
    var t = e.stateNode,
      l = e.type,
      n = e.memoizedProps;
    switch (((t[it] = e), (t[gt] = n), l)) {
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
        for (l = 0; l < si.length; l++) ge(si[l], t);
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
          Jr(t, n.value, n.defaultValue, n.checked, n.defaultChecked, n.type, n.name, !0));
        break;
      case 'select':
        ge('invalid', t);
        break;
      case 'textarea':
        (ge('invalid', t), Wr(t, n.value, n.defaultValue, n.children));
    }
    ((l = n.children),
      (typeof l != 'string' && typeof l != 'number' && typeof l != 'bigint') ||
      t.textContent === '' + l ||
      n.suppressHydrationWarning === !0 ||
      eh(t.textContent, l)
        ? (n.popover != null && (ge('beforetoggle', t), ge('toggle', t)),
          n.onScroll != null && ge('scroll', t),
          n.onScrollEnd != null && ge('scrollend', t),
          n.onClick != null && (t.onclick = sl),
          (t = !0))
        : (t = !1),
      t || Ll(e, !0));
  }
  function Lf(e) {
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
  function $n(e) {
    if (e !== ut) return !1;
    if (!be) return (Lf(e), (be = !0), !1);
    var t = e.tag,
      l;
    if (
      ((l = t !== 3 && t !== 27) &&
        ((l = t === 5) &&
          ((l = e.type), (l = !(l !== 'form' && l !== 'button') || vo(e.type, e.memoizedProps))),
        (l = !l)),
      l && Le && Ll(e),
      Lf(e),
      t === 13)
    ) {
      if (((e = e.memoizedState), (e = e !== null ? e.dehydrated : null), !e)) throw Error(c(317));
      Le = oh(e);
    } else if (t === 31) {
      if (((e = e.memoizedState), (e = e !== null ? e.dehydrated : null), !e)) throw Error(c(317));
      Le = oh(e);
    } else
      t === 27
        ? ((t = Le), Fl(e.type) ? ((e = Eo), (Eo = null), (Le = e)) : (Le = t))
        : (Le = ut ? Vt(e.stateNode.nextSibling) : null);
    return !0;
  }
  function yn() {
    ((Le = ut = null), (be = !1));
  }
  function ec() {
    var e = Ul;
    return (e !== null && (xt === null ? (xt = e) : xt.push.apply(xt, e), (Ul = null)), e);
  }
  function Ha(e) {
    Ul === null ? (Ul = [e]) : Ul.push(e);
  }
  var tc = N(null),
    gn = null,
    fl = null;
  function Hl(e, t, l) {
    (I(tc, t._currentValue), (t._currentValue = l));
  }
  function dl(e) {
    ((e._currentValue = tc.current), G(tc));
  }
  function lc(e, t, l) {
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
  function nc(e, t, l, n) {
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
                lc(s.return, l, e),
                n || (f = null));
              break e;
            }
          s = p.next;
        }
      } else if (i.tag === 18) {
        if (((f = i.return), f === null)) throw Error(c(341));
        ((f.lanes |= l), (s = f.alternate), s !== null && (s.lanes |= l), lc(f, l, e), (f = null));
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
  function Kn(e, t, l, n) {
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
          Ct(i.pendingProps.value, f.value) || (e !== null ? e.push(p) : (e = [p]));
        }
      } else if (i === Ee.current) {
        if (((f = i.alternate), f === null)) throw Error(c(387));
        f.memoizedState.memoizedState !== i.memoizedState.memoizedState &&
          (e !== null ? e.push(di) : (e = [di]));
      }
      i = i.return;
    }
    (e !== null && nc(t, e, l, n), (t.flags |= 262144));
  }
  function Pi(e) {
    for (e = e.firstContext; e !== null; ) {
      if (!Ct(e.context._currentValue, e.memoizedValue)) return !0;
      e = e.next;
    }
    return !1;
  }
  function vn(e) {
    ((gn = e), (fl = null), (e = e.dependencies), e !== null && (e.firstContext = null));
  }
  function st(e) {
    return Hf(gn, e);
  }
  function eu(e, t) {
    return (gn === null && vn(e), Hf(e, t));
  }
  function Hf(e, t) {
    var l = t._currentValue;
    if (((t = { context: t, memoizedValue: l, next: null }), fl === null)) {
      if (e === null) throw Error(c(308));
      ((fl = t), (e.dependencies = { lanes: 0, firstContext: t }), (e.flags |= 524288));
    } else fl = fl.next = t;
    return l;
  }
  var Ag =
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
    Cg = a.unstable_scheduleCallback,
    Mg = a.unstable_NormalPriority,
    Ie = {
      $$typeof: Q,
      Consumer: null,
      Provider: null,
      _currentValue: null,
      _currentValue2: null,
      _threadCount: 0,
    };
  function ac() {
    return { controller: new Ag(), data: new Map(), refCount: 0 };
  }
  function qa(e) {
    (e.refCount--,
      e.refCount === 0 &&
        Cg(Mg, function () {
          e.controller.abort();
        }));
  }
  var Ga = null,
    ic = 0,
    Zn = 0,
    Jn = null;
  function kg(e, t) {
    if (Ga === null) {
      var l = (Ga = []);
      ((ic = 0),
        (Zn = co()),
        (Jn = {
          status: 'pending',
          value: void 0,
          then: function (n) {
            l.push(n);
          },
        }));
    }
    return (ic++, t.then(qf, qf), t);
  }
  function qf() {
    if (--ic === 0 && Ga !== null) {
      Jn !== null && (Jn.status = 'fulfilled');
      var e = Ga;
      ((Ga = null), (Zn = 0), (Jn = null));
      for (var t = 0; t < e.length; t++) (0, e[t])();
    }
  }
  function Rg(e, t) {
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
  var Gf = H.S;
  H.S = function (e, t) {
    ((Tm = Tt()),
      typeof t == 'object' && t !== null && typeof t.then == 'function' && kg(e, t),
      Gf !== null && Gf(e, t));
  };
  var _n = N(null);
  function uc() {
    var e = _n.current;
    return e !== null ? e : Ue.pooledCache;
  }
  function tu(e, t) {
    t === null ? I(_n, _n.current) : I(_n, t.pool);
  }
  function Yf() {
    var e = uc();
    return e === null ? null : { parent: Ie._currentValue, pool: e };
  }
  var In = Error(c(460)),
    sc = Error(c(474)),
    lu = Error(c(542)),
    nu = { then: function () {} };
  function Xf(e) {
    return ((e = e.status), e === 'fulfilled' || e === 'rejected');
  }
  function Vf(e, t, l) {
    switch (
      ((l = e[l]), l === void 0 ? e.push(t) : l !== t && (t.then(sl, sl), (t = l)), t.status)
    ) {
      case 'fulfilled':
        return t.value;
      case 'rejected':
        throw ((e = t.reason), $f(e), e);
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
            throw ((e = t.reason), $f(e), e);
        }
        throw ((Sn = t), In);
    }
  }
  function bn(e) {
    try {
      var t = e._init;
      return t(e._payload);
    } catch (l) {
      throw l !== null && typeof l == 'object' && typeof l.then == 'function' ? ((Sn = l), In) : l;
    }
  }
  var Sn = null;
  function Qf() {
    if (Sn === null) throw Error(c(459));
    var e = Sn;
    return ((Sn = null), e);
  }
  function $f(e) {
    if (e === In || e === lu) throw Error(c(483));
  }
  var Wn = null,
    Ya = 0;
  function au(e) {
    var t = Ya;
    return ((Ya += 1), Wn === null && (Wn = []), Vf(Wn, e, t));
  }
  function Xa(e, t) {
    ((t = t.props.ref), (e.ref = t !== void 0 ? t : null));
  }
  function iu(e, t) {
    throw t.$$typeof === k
      ? Error(c(525))
      : ((e = Object.prototype.toString.call(t)),
        Error(
          c(
            31,
            e === '[object Object]' ? 'object with keys {' + Object.keys(t).join(', ') + '}' : e
          )
        ));
  }
  function Kf(e) {
    function t(M, T) {
      if (e) {
        var R = M.deletions;
        R === null ? ((M.deletions = [T]), (M.flags |= 16)) : R.push(T);
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
      return ((M = ol(M, T)), (M.index = 0), (M.sibling = null), M);
    }
    function s(M, T, R) {
      return (
        (M.index = R),
        e
          ? ((R = M.alternate),
            R !== null
              ? ((R = R.index), R < T ? ((M.flags |= 67108866), T) : R)
              : ((M.flags |= 67108866), T))
          : ((M.flags |= 1048576), T)
      );
    }
    function f(M) {
      return (e && M.alternate === null && (M.flags |= 67108866), M);
    }
    function p(M, T, R, X) {
      return T === null || T.tag !== 6
        ? ((T = Js(R, M.mode, X)), (T.return = M), T)
        : ((T = i(T, R)), (T.return = M), T);
    }
    function x(M, T, R, X) {
      var ne = R.type;
      return ne === C
        ? q(M, T, R.props.children, X, R.key)
        : T !== null &&
            (T.elementType === ne ||
              (typeof ne == 'object' && ne !== null && ne.$$typeof === B && bn(ne) === T.type))
          ? ((T = i(T, R.props)), Xa(T, R), (T.return = M), T)
          : ((T = Wi(R.type, R.key, R.props, null, M.mode, X)), Xa(T, R), (T.return = M), T);
    }
    function j(M, T, R, X) {
      return T === null ||
        T.tag !== 4 ||
        T.stateNode.containerInfo !== R.containerInfo ||
        T.stateNode.implementation !== R.implementation
        ? ((T = Is(R, M.mode, X)), (T.return = M), T)
        : ((T = i(T, R.children || [])), (T.return = M), T);
    }
    function q(M, T, R, X, ne) {
      return T === null || T.tag !== 7
        ? ((T = pn(R, M.mode, X, ne)), (T.return = M), T)
        : ((T = i(T, R)), (T.return = M), T);
    }
    function V(M, T, R) {
      if ((typeof T == 'string' && T !== '') || typeof T == 'number' || typeof T == 'bigint')
        return ((T = Js('' + T, M.mode, R)), (T.return = M), T);
      if (typeof T == 'object' && T !== null) {
        switch (T.$$typeof) {
          case z:
            return ((R = Wi(T.type, T.key, T.props, null, M.mode, R)), Xa(R, T), (R.return = M), R);
          case g:
            return ((T = Is(T, M.mode, R)), (T.return = M), T);
          case B:
            return ((T = bn(T)), V(M, T, R));
        }
        if (qe(T) || de(T)) return ((T = pn(T, M.mode, R, null)), (T.return = M), T);
        if (typeof T.then == 'function') return V(M, au(T), R);
        if (T.$$typeof === Q) return V(M, eu(M, T), R);
        iu(M, T);
      }
      return null;
    }
    function O(M, T, R, X) {
      var ne = T !== null ? T.key : null;
      if ((typeof R == 'string' && R !== '') || typeof R == 'number' || typeof R == 'bigint')
        return ne !== null ? null : p(M, T, '' + R, X);
      if (typeof R == 'object' && R !== null) {
        switch (R.$$typeof) {
          case z:
            return R.key === ne ? x(M, T, R, X) : null;
          case g:
            return R.key === ne ? j(M, T, R, X) : null;
          case B:
            return ((R = bn(R)), O(M, T, R, X));
        }
        if (qe(R) || de(R)) return ne !== null ? null : q(M, T, R, X, null);
        if (typeof R.then == 'function') return O(M, T, au(R), X);
        if (R.$$typeof === Q) return O(M, T, eu(M, R), X);
        iu(M, R);
      }
      return null;
    }
    function w(M, T, R, X, ne) {
      if ((typeof X == 'string' && X !== '') || typeof X == 'number' || typeof X == 'bigint')
        return ((M = M.get(R) || null), p(T, M, '' + X, ne));
      if (typeof X == 'object' && X !== null) {
        switch (X.$$typeof) {
          case z:
            return ((M = M.get(X.key === null ? R : X.key) || null), x(T, M, X, ne));
          case g:
            return ((M = M.get(X.key === null ? R : X.key) || null), j(T, M, X, ne));
          case B:
            return ((X = bn(X)), w(M, T, R, X, ne));
        }
        if (qe(X) || de(X)) return ((M = M.get(R) || null), q(T, M, X, ne, null));
        if (typeof X.then == 'function') return w(M, T, R, au(X), ne);
        if (X.$$typeof === Q) return w(M, T, R, eu(T, X), ne);
        iu(T, X);
      }
      return null;
    }
    function ee(M, T, R, X) {
      for (
        var ne = null, Te = null, te = T, he = (T = 0), _e = null;
        te !== null && he < R.length;
        he++
      ) {
        te.index > he ? ((_e = te), (te = null)) : (_e = te.sibling);
        var Ne = O(M, te, R[he], X);
        if (Ne === null) {
          te === null && (te = _e);
          break;
        }
        (e && te && Ne.alternate === null && t(M, te),
          (T = s(Ne, T, he)),
          Te === null ? (ne = Ne) : (Te.sibling = Ne),
          (Te = Ne),
          (te = _e));
      }
      if (he === R.length) return (l(M, te), be && rl(M, he), ne);
      if (te === null) {
        for (; he < R.length; he++)
          ((te = V(M, R[he], X)),
            te !== null &&
              ((T = s(te, T, he)), Te === null ? (ne = te) : (Te.sibling = te), (Te = te)));
        return (be && rl(M, he), ne);
      }
      for (te = n(te); he < R.length; he++)
        ((_e = w(te, M, he, R[he], X)),
          _e !== null &&
            (e && _e.alternate !== null && te.delete(_e.key === null ? he : _e.key),
            (T = s(_e, T, he)),
            Te === null ? (ne = _e) : (Te.sibling = _e),
            (Te = _e)));
      return (
        e &&
          te.forEach(function (nn) {
            return t(M, nn);
          }),
        be && rl(M, he),
        ne
      );
    }
    function ue(M, T, R, X) {
      if (R == null) throw Error(c(151));
      for (
        var ne = null, Te = null, te = T, he = (T = 0), _e = null, Ne = R.next();
        te !== null && !Ne.done;
        he++, Ne = R.next()
      ) {
        te.index > he ? ((_e = te), (te = null)) : (_e = te.sibling);
        var nn = O(M, te, Ne.value, X);
        if (nn === null) {
          te === null && (te = _e);
          break;
        }
        (e && te && nn.alternate === null && t(M, te),
          (T = s(nn, T, he)),
          Te === null ? (ne = nn) : (Te.sibling = nn),
          (Te = nn),
          (te = _e));
      }
      if (Ne.done) return (l(M, te), be && rl(M, he), ne);
      if (te === null) {
        for (; !Ne.done; he++, Ne = R.next())
          ((Ne = V(M, Ne.value, X)),
            Ne !== null &&
              ((T = s(Ne, T, he)), Te === null ? (ne = Ne) : (Te.sibling = Ne), (Te = Ne)));
        return (be && rl(M, he), ne);
      }
      for (te = n(te); !Ne.done; he++, Ne = R.next())
        ((Ne = w(te, M, he, Ne.value, X)),
          Ne !== null &&
            (e && Ne.alternate !== null && te.delete(Ne.key === null ? he : Ne.key),
            (T = s(Ne, T, he)),
            Te === null ? (ne = Ne) : (Te.sibling = Ne),
            (Te = Ne)));
      return (
        e &&
          te.forEach(function (G0) {
            return t(M, G0);
          }),
        be && rl(M, he),
        ne
      );
    }
    function Be(M, T, R, X) {
      if (
        (typeof R == 'object' &&
          R !== null &&
          R.type === C &&
          R.key === null &&
          (R = R.props.children),
        typeof R == 'object' && R !== null)
      ) {
        switch (R.$$typeof) {
          case z:
            e: {
              for (var ne = R.key; T !== null; ) {
                if (T.key === ne) {
                  if (((ne = R.type), ne === C)) {
                    if (T.tag === 7) {
                      (l(M, T.sibling), (X = i(T, R.props.children)), (X.return = M), (M = X));
                      break e;
                    }
                  } else if (
                    T.elementType === ne ||
                    (typeof ne == 'object' && ne !== null && ne.$$typeof === B && bn(ne) === T.type)
                  ) {
                    (l(M, T.sibling), (X = i(T, R.props)), Xa(X, R), (X.return = M), (M = X));
                    break e;
                  }
                  l(M, T);
                  break;
                } else t(M, T);
                T = T.sibling;
              }
              R.type === C
                ? ((X = pn(R.props.children, M.mode, X, R.key)), (X.return = M), (M = X))
                : ((X = Wi(R.type, R.key, R.props, null, M.mode, X)),
                  Xa(X, R),
                  (X.return = M),
                  (M = X));
            }
            return f(M);
          case g:
            e: {
              for (ne = R.key; T !== null; ) {
                if (T.key === ne)
                  if (
                    T.tag === 4 &&
                    T.stateNode.containerInfo === R.containerInfo &&
                    T.stateNode.implementation === R.implementation
                  ) {
                    (l(M, T.sibling), (X = i(T, R.children || [])), (X.return = M), (M = X));
                    break e;
                  } else {
                    l(M, T);
                    break;
                  }
                else t(M, T);
                T = T.sibling;
              }
              ((X = Is(R, M.mode, X)), (X.return = M), (M = X));
            }
            return f(M);
          case B:
            return ((R = bn(R)), Be(M, T, R, X));
        }
        if (qe(R)) return ee(M, T, R, X);
        if (de(R)) {
          if (((ne = de(R)), typeof ne != 'function')) throw Error(c(150));
          return ((R = ne.call(R)), ue(M, T, R, X));
        }
        if (typeof R.then == 'function') return Be(M, T, au(R), X);
        if (R.$$typeof === Q) return Be(M, T, eu(M, R), X);
        iu(M, R);
      }
      return (typeof R == 'string' && R !== '') || typeof R == 'number' || typeof R == 'bigint'
        ? ((R = '' + R),
          T !== null && T.tag === 6
            ? (l(M, T.sibling), (X = i(T, R)), (X.return = M), (M = X))
            : (l(M, T), (X = Js(R, M.mode, X)), (X.return = M), (M = X)),
          f(M))
        : l(M, T);
    }
    return function (M, T, R, X) {
      try {
        Ya = 0;
        var ne = Be(M, T, R, X);
        return ((Wn = null), ne);
      } catch (te) {
        if (te === In || te === lu) throw te;
        var Te = Mt(29, te, null, M.mode);
        return ((Te.lanes = X), (Te.return = M), Te);
      } finally {
      }
    };
  }
  var xn = Kf(!0),
    Zf = Kf(!1),
    ql = !1;
  function cc(e) {
    e.updateQueue = {
      baseState: e.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null,
    };
  }
  function oc(e, t) {
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
    if (((n = n.shared), (Ce & 2) !== 0)) {
      var i = n.pending;
      return (
        i === null ? (t.next = t) : ((t.next = i.next), (i.next = t)),
        (n.pending = t),
        (t = Ii(e)),
        jf(e, null, l),
        t
      );
    }
    return (Ji(e, n, t, l), Ii(e));
  }
  function Va(e, t, l) {
    if (((t = t.updateQueue), t !== null && ((t = t.shared), (l & 4194048) !== 0))) {
      var n = t.lanes;
      ((n &= e.pendingLanes), (l |= n), (t.lanes = l), Lr(e, l));
    }
  }
  function rc(e, t) {
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
  var fc = !1;
  function Qa() {
    if (fc) {
      var e = Jn;
      if (e !== null) throw e;
    }
  }
  function $a(e, t, l, n) {
    fc = !1;
    var i = e.updateQueue;
    ql = !1;
    var s = i.firstBaseUpdate,
      f = i.lastBaseUpdate,
      p = i.shared.pending;
    if (p !== null) {
      i.shared.pending = null;
      var x = p,
        j = x.next;
      ((x.next = null), f === null ? (s = j) : (f.next = j), (f = x));
      var q = e.alternate;
      q !== null &&
        ((q = q.updateQueue),
        (p = q.lastBaseUpdate),
        p !== f && (p === null ? (q.firstBaseUpdate = j) : (p.next = j), (q.lastBaseUpdate = x)));
    }
    if (s !== null) {
      var V = i.baseState;
      ((f = 0), (q = j = x = null), (p = s));
      do {
        var O = p.lane & -536870913,
          w = O !== p.lane;
        if (w ? (ve & O) === O : (n & O) === O) {
          (O !== 0 && O === Zn && (fc = !0),
            q !== null &&
              (q = q.next =
                { lane: 0, tag: p.tag, payload: p.payload, callback: null, next: null }));
          e: {
            var ee = e,
              ue = p;
            O = t;
            var Be = l;
            switch (ue.tag) {
              case 1:
                if (((ee = ue.payload), typeof ee == 'function')) {
                  V = ee.call(Be, V, O);
                  break e;
                }
                V = ee;
                break e;
              case 3:
                ee.flags = (ee.flags & -65537) | 128;
              case 0:
                if (
                  ((ee = ue.payload),
                  (O = typeof ee == 'function' ? ee.call(Be, V, O) : ee),
                  O == null)
                )
                  break e;
                V = S({}, V, O);
                break e;
              case 2:
                ql = !0;
            }
          }
          ((O = p.callback),
            O !== null &&
              ((e.flags |= 64),
              w && (e.flags |= 8192),
              (w = i.callbacks),
              w === null ? (i.callbacks = [O]) : w.push(O)));
        } else
          ((w = { lane: O, tag: p.tag, payload: p.payload, callback: p.callback, next: null }),
            q === null ? ((j = q = w), (x = V)) : (q = q.next = w),
            (f |= O));
        if (((p = p.next), p === null)) {
          if (((p = i.shared.pending), p === null)) break;
          ((w = p),
            (p = w.next),
            (w.next = null),
            (i.lastBaseUpdate = w),
            (i.shared.pending = null));
        }
      } while (!0);
      (q === null && (x = V),
        (i.baseState = x),
        (i.firstBaseUpdate = j),
        (i.lastBaseUpdate = q),
        s === null && (i.shared.lanes = 0),
        (Kl |= f),
        (e.lanes = f),
        (e.memoizedState = V));
    }
  }
  function Jf(e, t) {
    if (typeof e != 'function') throw Error(c(191, e));
    e.call(t);
  }
  function If(e, t) {
    var l = e.callbacks;
    if (l !== null) for (e.callbacks = null, e = 0; e < l.length; e++) Jf(l[e], t);
  }
  var Fn = N(null),
    uu = N(0);
  function Wf(e, t) {
    ((e = Sl), I(uu, e), I(Fn, t), (Sl = e | t.baseLanes));
  }
  function dc() {
    (I(uu, Sl), I(Fn, Fn.current));
  }
  function mc() {
    ((Sl = uu.current), G(Fn), G(uu));
  }
  var kt = N(null),
    Xt = null;
  function Xl(e) {
    var t = e.alternate;
    (I(Ze, Ze.current & 1),
      I(kt, e),
      Xt === null && (t === null || Fn.current !== null || t.memoizedState !== null) && (Xt = e));
  }
  function hc(e) {
    (I(Ze, Ze.current), I(kt, e), Xt === null && (Xt = e));
  }
  function Ff(e) {
    e.tag === 22 ? (I(Ze, Ze.current), I(kt, e), Xt === null && (Xt = e)) : Vl();
  }
  function Vl() {
    (I(Ze, Ze.current), I(kt, kt.current));
  }
  function Rt(e) {
    (G(kt), Xt === e && (Xt = null), G(Ze));
  }
  var Ze = N(0);
  function su(e) {
    for (var t = e; t !== null; ) {
      if (t.tag === 13) {
        var l = t.memoizedState;
        if (l !== null && ((l = l.dehydrated), l === null || So(l) || xo(l))) return t;
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
    ze = null,
    We = null,
    cu = !1,
    Pn = !1,
    En = !1,
    ou = 0,
    Ka = 0,
    ea = null,
    jg = 0;
  function $e() {
    throw Error(c(321));
  }
  function pc(e, t) {
    if (t === null) return !1;
    for (var l = 0; l < t.length && l < e.length; l++) if (!Ct(e[l], t[l])) return !1;
    return !0;
  }
  function yc(e, t, l, n, i, s) {
    return (
      (ml = s),
      (me = t),
      (t.memoizedState = null),
      (t.updateQueue = null),
      (t.lanes = 0),
      (H.H = e === null || e.memoizedState === null ? wd : jc),
      (En = !1),
      (s = l(n, i)),
      (En = !1),
      Pn && (s = ed(t, l, n, i)),
      Pf(e),
      s
    );
  }
  function Pf(e) {
    H.H = Ia;
    var t = ze !== null && ze.next !== null;
    if (((ml = 0), (We = ze = me = null), (cu = !1), (Ka = 0), (ea = null), t)) throw Error(c(300));
    e === null || Fe || ((e = e.dependencies), e !== null && Pi(e) && (Fe = !0));
  }
  function ed(e, t, l, n) {
    me = e;
    var i = 0;
    do {
      if ((Pn && (ea = null), (Ka = 0), (Pn = !1), 25 <= i)) throw Error(c(301));
      if (((i += 1), (We = ze = null), e.updateQueue != null)) {
        var s = e.updateQueue;
        ((s.lastEffect = null),
          (s.events = null),
          (s.stores = null),
          s.memoCache != null && (s.memoCache.index = 0));
      }
      ((H.H = Bd), (s = t(l, n)));
    } while (Pn);
    return s;
  }
  function Og() {
    var e = H.H,
      t = e.useState()[0];
    return (
      (t = typeof t.then == 'function' ? Za(t) : t),
      (e = e.useState()[0]),
      (ze !== null ? ze.memoizedState : null) !== e && (me.flags |= 1024),
      t
    );
  }
  function gc() {
    var e = ou !== 0;
    return ((ou = 0), e);
  }
  function vc(e, t, l) {
    ((t.updateQueue = e.updateQueue), (t.flags &= -2053), (e.lanes &= ~l));
  }
  function _c(e) {
    if (cu) {
      for (e = e.memoizedState; e !== null; ) {
        var t = e.queue;
        (t !== null && (t.pending = null), (e = e.next));
      }
      cu = !1;
    }
    ((ml = 0), (We = ze = me = null), (Pn = !1), (Ka = ou = 0), (ea = null));
  }
  function mt() {
    var e = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
    return (We === null ? (me.memoizedState = We = e) : (We = We.next = e), We);
  }
  function Je() {
    if (ze === null) {
      var e = me.alternate;
      e = e !== null ? e.memoizedState : null;
    } else e = ze.next;
    var t = We === null ? me.memoizedState : We.next;
    if (t !== null) ((We = t), (ze = e));
    else {
      if (e === null) throw me.alternate === null ? Error(c(467)) : Error(c(310));
      ((ze = e),
        (e = {
          memoizedState: ze.memoizedState,
          baseState: ze.baseState,
          baseQueue: ze.baseQueue,
          queue: ze.queue,
          next: null,
        }),
        We === null ? (me.memoizedState = We = e) : (We = We.next = e));
    }
    return We;
  }
  function ru() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function Za(e) {
    var t = Ka;
    return (
      (Ka += 1),
      ea === null && (ea = []),
      (e = Vf(ea, e, t)),
      (t = me),
      (We === null ? t.memoizedState : We.next) === null &&
        ((t = t.alternate), (H.H = t === null || t.memoizedState === null ? wd : jc)),
      e
    );
  }
  function fu(e) {
    if (e !== null && typeof e == 'object') {
      if (typeof e.then == 'function') return Za(e);
      if (e.$$typeof === Q) return st(e);
    }
    throw Error(c(438, String(e)));
  }
  function bc(e) {
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
      l === null && ((l = ru()), (me.updateQueue = l)),
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
  function du(e) {
    var t = Je();
    return Sc(t, ze, e);
  }
  function Sc(e, t, l) {
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
        q = !1;
      do {
        var V = j.lane & -536870913;
        if (V !== j.lane ? (ve & V) === V : (ml & V) === V) {
          var O = j.revertLane;
          if (O === 0)
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
              V === Zn && (q = !0));
          else if ((ml & O) === O) {
            ((j = j.next), O === Zn && (q = !0));
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
              (me.lanes |= O),
              (Kl |= O));
          ((V = j.action), En && l(s, V), (s = j.hasEagerState ? j.eagerState : l(s, V)));
        } else
          ((O = {
            lane: V,
            revertLane: j.revertLane,
            gesture: j.gesture,
            action: j.action,
            hasEagerState: j.hasEagerState,
            eagerState: j.eagerState,
            next: null,
          }),
            x === null ? ((p = x = O), (f = s)) : (x = x.next = O),
            (me.lanes |= V),
            (Kl |= V));
        j = j.next;
      } while (j !== null && j !== t);
      if (
        (x === null ? (f = s) : (x.next = p),
        !Ct(s, e.memoizedState) && ((Fe = !0), q && ((l = Jn), l !== null)))
      )
        throw l;
      ((e.memoizedState = s), (e.baseState = f), (e.baseQueue = x), (n.lastRenderedState = s));
    }
    return (i === null && (n.lanes = 0), [e.memoizedState, n.dispatch]);
  }
  function xc(e) {
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
      (Ct(s, t.memoizedState) || (Fe = !0),
        (t.memoizedState = s),
        t.baseQueue === null && (t.baseState = s),
        (l.lastRenderedState = s));
    }
    return [s, n];
  }
  function td(e, t, l) {
    var n = me,
      i = Je(),
      s = be;
    if (s) {
      if (l === void 0) throw Error(c(407));
      l = l();
    } else l = t();
    var f = !Ct((ze || i).memoizedState, l);
    if (
      (f && ((i.memoizedState = l), (Fe = !0)),
      (i = i.queue),
      Nc(ad.bind(null, n, i, e), [e]),
      i.getSnapshot !== t || f || (We !== null && We.memoizedState.tag & 1))
    ) {
      if (
        ((n.flags |= 2048),
        ta(9, { destroy: void 0 }, nd.bind(null, n, i, l, t), null),
        Ue === null)
      )
        throw Error(c(349));
      s || (ml & 127) !== 0 || ld(n, t, l);
    }
    return l;
  }
  function ld(e, t, l) {
    ((e.flags |= 16384),
      (e = { getSnapshot: t, value: l }),
      (t = me.updateQueue),
      t === null
        ? ((t = ru()), (me.updateQueue = t), (t.stores = [e]))
        : ((l = t.stores), l === null ? (t.stores = [e]) : l.push(e)));
  }
  function nd(e, t, l, n) {
    ((t.value = l), (t.getSnapshot = n), id(t) && ud(e));
  }
  function ad(e, t, l) {
    return l(function () {
      id(t) && ud(e);
    });
  }
  function id(e) {
    var t = e.getSnapshot;
    e = e.value;
    try {
      var l = t();
      return !Ct(e, l);
    } catch {
      return !0;
    }
  }
  function ud(e) {
    var t = hn(e, 2);
    t !== null && Et(t, e, 2);
  }
  function Ec(e) {
    var t = mt();
    if (typeof e == 'function') {
      var l = e;
      if (((e = l()), En)) {
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
        lastRenderedReducer: hl,
        lastRenderedState: e,
      }),
      t
    );
  }
  function sd(e, t, l, n) {
    return ((e.baseState = l), Sc(e, ze, typeof n == 'function' ? n : hl));
  }
  function Dg(e, t, l, n, i) {
    if (pu(e)) throw Error(c(485));
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
      (H.T !== null ? l(!0) : (s.isTransition = !1),
        n(s),
        (l = t.pending),
        l === null
          ? ((s.next = t.pending = s), cd(t, s))
          : ((s.next = l.next), (t.pending = l.next = s)));
    }
  }
  function cd(e, t) {
    var l = t.action,
      n = t.payload,
      i = e.state;
    if (t.isTransition) {
      var s = H.T,
        f = {};
      H.T = f;
      try {
        var p = l(i, n),
          x = H.S;
        (x !== null && x(f, p), od(e, t, p));
      } catch (j) {
        Tc(e, t, j);
      } finally {
        (s !== null && f.types !== null && (s.types = f.types), (H.T = s));
      }
    } else
      try {
        ((s = l(i, n)), od(e, t, s));
      } catch (j) {
        Tc(e, t, j);
      }
  }
  function od(e, t, l) {
    l !== null && typeof l == 'object' && typeof l.then == 'function'
      ? l.then(
          function (n) {
            rd(e, t, n);
          },
          function (n) {
            return Tc(e, t, n);
          }
        )
      : rd(e, t, l);
  }
  function rd(e, t, l) {
    ((t.status = 'fulfilled'),
      (t.value = l),
      fd(t),
      (e.state = l),
      (t = e.pending),
      t !== null &&
        ((l = t.next), l === t ? (e.pending = null) : ((l = l.next), (t.next = l), cd(e, l))));
  }
  function Tc(e, t, l) {
    var n = e.pending;
    if (((e.pending = null), n !== null)) {
      n = n.next;
      do ((t.status = 'rejected'), (t.reason = l), fd(t), (t = t.next));
      while (t !== n);
    }
    e.action = null;
  }
  function fd(e) {
    e = e.listeners;
    for (var t = 0; t < e.length; t++) (0, e[t])();
  }
  function dd(e, t) {
    return t;
  }
  function md(e, t) {
    if (be) {
      var l = Ue.formState;
      if (l !== null) {
        e: {
          var n = me;
          if (be) {
            if (Le) {
              t: {
                for (var i = Le, s = Yt; i.nodeType !== 8; ) {
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
                ((Le = Vt(i.nextSibling)), (n = i.data === 'F!'));
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
      (l = mt()),
      (l.memoizedState = l.baseState = t),
      (n = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: dd,
        lastRenderedState: t,
      }),
      (l.queue = n),
      (l = Od.bind(null, me, n)),
      (n.dispatch = l),
      (n = Ec(!1)),
      (s = Rc.bind(null, me, !1, n.queue)),
      (n = mt()),
      (i = { state: t, dispatch: null, action: e, pending: null }),
      (n.queue = i),
      (l = Dg.bind(null, me, i, s, l)),
      (i.dispatch = l),
      (n.memoizedState = e),
      [t, l, !1]
    );
  }
  function hd(e) {
    var t = Je();
    return pd(t, ze, e);
  }
  function pd(e, t, l) {
    if (
      ((t = Sc(e, t, dd)[0]),
      (e = du(hl)[0]),
      typeof t == 'object' && t !== null && typeof t.then == 'function')
    )
      try {
        var n = Za(t);
      } catch (f) {
        throw f === In ? lu : f;
      }
    else n = t;
    t = Je();
    var i = t.queue,
      s = i.dispatch;
    return (
      l !== t.memoizedState &&
        ((me.flags |= 2048), ta(9, { destroy: void 0 }, zg.bind(null, i, l), null)),
      [n, s, e]
    );
  }
  function zg(e, t) {
    e.action = t;
  }
  function yd(e) {
    var t = Je(),
      l = ze;
    if (l !== null) return pd(t, l, e);
    (Je(), (t = t.memoizedState), (l = Je()));
    var n = l.queue.dispatch;
    return ((l.memoizedState = e), [t, n, !1]);
  }
  function ta(e, t, l, n) {
    return (
      (e = { tag: e, create: l, deps: n, inst: t, next: null }),
      (t = me.updateQueue),
      t === null && ((t = ru()), (me.updateQueue = t)),
      (l = t.lastEffect),
      l === null
        ? (t.lastEffect = e.next = e)
        : ((n = l.next), (l.next = e), (e.next = n), (t.lastEffect = e)),
      e
    );
  }
  function gd() {
    return Je().memoizedState;
  }
  function mu(e, t, l, n) {
    var i = mt();
    ((me.flags |= e),
      (i.memoizedState = ta(1 | t, { destroy: void 0 }, l, n === void 0 ? null : n)));
  }
  function hu(e, t, l, n) {
    var i = Je();
    n = n === void 0 ? null : n;
    var s = i.memoizedState.inst;
    ze !== null && n !== null && pc(n, ze.memoizedState.deps)
      ? (i.memoizedState = ta(t, s, l, n))
      : ((me.flags |= e), (i.memoizedState = ta(1 | t, s, l, n)));
  }
  function vd(e, t) {
    mu(8390656, 8, e, t);
  }
  function Nc(e, t) {
    hu(2048, 8, e, t);
  }
  function wg(e) {
    me.flags |= 4;
    var t = me.updateQueue;
    if (t === null) ((t = ru()), (me.updateQueue = t), (t.events = [e]));
    else {
      var l = t.events;
      l === null ? (t.events = [e]) : l.push(e);
    }
  }
  function _d(e) {
    var t = Je().memoizedState;
    return (
      wg({ ref: t, nextImpl: e }),
      function () {
        if ((Ce & 2) !== 0) throw Error(c(440));
        return t.impl.apply(void 0, arguments);
      }
    );
  }
  function bd(e, t) {
    return hu(4, 2, e, t);
  }
  function Sd(e, t) {
    return hu(4, 4, e, t);
  }
  function xd(e, t) {
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
  function Ed(e, t, l) {
    ((l = l != null ? l.concat([e]) : null), hu(4, 4, xd.bind(null, t, e), l));
  }
  function Ac() {}
  function Td(e, t) {
    var l = Je();
    t = t === void 0 ? null : t;
    var n = l.memoizedState;
    return t !== null && pc(t, n[1]) ? n[0] : ((l.memoizedState = [e, t]), e);
  }
  function Nd(e, t) {
    var l = Je();
    t = t === void 0 ? null : t;
    var n = l.memoizedState;
    if (t !== null && pc(t, n[1])) return n[0];
    if (((n = e()), En)) {
      Dl(!0);
      try {
        e();
      } finally {
        Dl(!1);
      }
    }
    return ((l.memoizedState = [n, t]), n);
  }
  function Cc(e, t, l) {
    return l === void 0 || ((ml & 1073741824) !== 0 && (ve & 261930) === 0)
      ? (e.memoizedState = t)
      : ((e.memoizedState = l), (e = Am()), (me.lanes |= e), (Kl |= e), l);
  }
  function Ad(e, t, l, n) {
    return Ct(l, t)
      ? l
      : Fn.current !== null
        ? ((e = Cc(e, l, n)), Ct(e, t) || (Fe = !0), e)
        : (ml & 42) === 0 || ((ml & 1073741824) !== 0 && (ve & 261930) === 0)
          ? ((Fe = !0), (e.memoizedState = l))
          : ((e = Am()), (me.lanes |= e), (Kl |= e), t);
  }
  function Cd(e, t, l, n, i) {
    var s = J.p;
    J.p = s !== 0 && 8 > s ? s : 8;
    var f = H.T,
      p = {};
    ((H.T = p), Rc(e, !1, t, l));
    try {
      var x = i(),
        j = H.S;
      if (
        (j !== null && j(p, x), x !== null && typeof x == 'object' && typeof x.then == 'function')
      ) {
        var q = Rg(x, n);
        Ja(e, t, q, Dt(e));
      } else Ja(e, t, n, Dt(e));
    } catch (V) {
      Ja(e, t, { then: function () {}, status: 'rejected', reason: V }, Dt());
    } finally {
      ((J.p = s), f !== null && p.types !== null && (f.types = p.types), (H.T = f));
    }
  }
  function Bg() {}
  function Mc(e, t, l, n) {
    if (e.tag !== 5) throw Error(c(476));
    var i = Md(e).queue;
    Cd(
      e,
      i,
      t,
      ie,
      l === null
        ? Bg
        : function () {
            return (kd(e), l(n));
          }
    );
  }
  function Md(e) {
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
  function kd(e) {
    var t = Md(e);
    (t.next === null && (t = e.alternate.memoizedState), Ja(e, t.next.queue, {}, Dt()));
  }
  function kc() {
    return st(di);
  }
  function Rd() {
    return Je().memoizedState;
  }
  function jd() {
    return Je().memoizedState;
  }
  function Ug(e) {
    for (var t = e.return; t !== null; ) {
      switch (t.tag) {
        case 24:
        case 3:
          var l = Dt();
          e = Gl(l);
          var n = Yl(t, e, l);
          (n !== null && (Et(n, t, l), Va(n, t, l)), (t = { cache: ac() }), (e.payload = t));
          return;
      }
      t = t.return;
    }
  }
  function Lg(e, t, l) {
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
      pu(e) ? Dd(t, l) : ((l = Ks(e, t, l, n)), l !== null && (Et(l, e, n), zd(l, t, n))));
  }
  function Od(e, t, l) {
    var n = Dt();
    Ja(e, t, l, n);
  }
  function Ja(e, t, l, n) {
    var i = {
      lane: n,
      revertLane: 0,
      gesture: null,
      action: l,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    };
    if (pu(e)) Dd(t, i);
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
          if (((i.hasEagerState = !0), (i.eagerState = p), Ct(p, f)))
            return (Ji(e, t, i, 0), Ue === null && Zi(), !1);
        } catch {
        } finally {
        }
      if (((l = Ks(e, t, i, n)), l !== null)) return (Et(l, e, n), zd(l, t, n), !0);
    }
    return !1;
  }
  function Rc(e, t, l, n) {
    if (
      ((n = {
        lane: 2,
        revertLane: co(),
        gesture: null,
        action: n,
        hasEagerState: !1,
        eagerState: null,
        next: null,
      }),
      pu(e))
    ) {
      if (t) throw Error(c(479));
    } else ((t = Ks(e, l, n, 2)), t !== null && Et(t, e, 2));
  }
  function pu(e) {
    var t = e.alternate;
    return e === me || (t !== null && t === me);
  }
  function Dd(e, t) {
    Pn = cu = !0;
    var l = e.pending;
    (l === null ? (t.next = t) : ((t.next = l.next), (l.next = t)), (e.pending = t));
  }
  function zd(e, t, l) {
    if ((l & 4194048) !== 0) {
      var n = t.lanes;
      ((n &= e.pendingLanes), (l |= n), (t.lanes = l), Lr(e, l));
    }
  }
  var Ia = {
    readContext: st,
    use: fu,
    useCallback: $e,
    useContext: $e,
    useEffect: $e,
    useImperativeHandle: $e,
    useLayoutEffect: $e,
    useInsertionEffect: $e,
    useMemo: $e,
    useReducer: $e,
    useRef: $e,
    useState: $e,
    useDebugValue: $e,
    useDeferredValue: $e,
    useTransition: $e,
    useSyncExternalStore: $e,
    useId: $e,
    useHostTransitionStatus: $e,
    useFormState: $e,
    useActionState: $e,
    useOptimistic: $e,
    useMemoCache: $e,
    useCacheRefresh: $e,
  };
  Ia.useEffectEvent = $e;
  var wd = {
      readContext: st,
      use: fu,
      useCallback: function (e, t) {
        return ((mt().memoizedState = [e, t === void 0 ? null : t]), e);
      },
      useContext: st,
      useEffect: vd,
      useImperativeHandle: function (e, t, l) {
        ((l = l != null ? l.concat([e]) : null), mu(4194308, 4, xd.bind(null, t, e), l));
      },
      useLayoutEffect: function (e, t) {
        return mu(4194308, 4, e, t);
      },
      useInsertionEffect: function (e, t) {
        mu(4, 2, e, t);
      },
      useMemo: function (e, t) {
        var l = mt();
        t = t === void 0 ? null : t;
        var n = e();
        if (En) {
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
        var n = mt();
        if (l !== void 0) {
          var i = l(t);
          if (En) {
            Dl(!0);
            try {
              l(t);
            } finally {
              Dl(!1);
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
          (e = e.dispatch = Lg.bind(null, me, e)),
          [n.memoizedState, e]
        );
      },
      useRef: function (e) {
        var t = mt();
        return ((e = { current: e }), (t.memoizedState = e));
      },
      useState: function (e) {
        e = Ec(e);
        var t = e.queue,
          l = Od.bind(null, me, t);
        return ((t.dispatch = l), [e.memoizedState, l]);
      },
      useDebugValue: Ac,
      useDeferredValue: function (e, t) {
        var l = mt();
        return Cc(l, e, t);
      },
      useTransition: function () {
        var e = Ec(!1);
        return ((e = Cd.bind(null, me, e.queue, !0, !1)), (mt().memoizedState = e), [!1, e]);
      },
      useSyncExternalStore: function (e, t, l) {
        var n = me,
          i = mt();
        if (be) {
          if (l === void 0) throw Error(c(407));
          l = l();
        } else {
          if (((l = t()), Ue === null)) throw Error(c(349));
          (ve & 127) !== 0 || ld(n, t, l);
        }
        i.memoizedState = l;
        var s = { value: l, getSnapshot: t };
        return (
          (i.queue = s),
          vd(ad.bind(null, n, s, e), [e]),
          (n.flags |= 2048),
          ta(9, { destroy: void 0 }, nd.bind(null, n, s, l, t), null),
          l
        );
      },
      useId: function () {
        var e = mt(),
          t = Ue.identifierPrefix;
        if (be) {
          var l = tl,
            n = el;
          ((l = (n & ~(1 << (32 - At(n) - 1))).toString(32) + l),
            (t = '_' + t + 'R_' + l),
            (l = ou++),
            0 < l && (t += 'H' + l.toString(32)),
            (t += '_'));
        } else ((l = jg++), (t = '_' + t + 'r_' + l.toString(32) + '_'));
        return (e.memoizedState = t);
      },
      useHostTransitionStatus: kc,
      useFormState: md,
      useActionState: md,
      useOptimistic: function (e) {
        var t = mt();
        t.memoizedState = t.baseState = e;
        var l = {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: null,
          lastRenderedState: null,
        };
        return ((t.queue = l), (t = Rc.bind(null, me, !0, l)), (l.dispatch = t), [e, t]);
      },
      useMemoCache: bc,
      useCacheRefresh: function () {
        return (mt().memoizedState = Ug.bind(null, me));
      },
      useEffectEvent: function (e) {
        var t = mt(),
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
    jc = {
      readContext: st,
      use: fu,
      useCallback: Td,
      useContext: st,
      useEffect: Nc,
      useImperativeHandle: Ed,
      useInsertionEffect: bd,
      useLayoutEffect: Sd,
      useMemo: Nd,
      useReducer: du,
      useRef: gd,
      useState: function () {
        return du(hl);
      },
      useDebugValue: Ac,
      useDeferredValue: function (e, t) {
        var l = Je();
        return Ad(l, ze.memoizedState, e, t);
      },
      useTransition: function () {
        var e = du(hl)[0],
          t = Je().memoizedState;
        return [typeof e == 'boolean' ? e : Za(e), t];
      },
      useSyncExternalStore: td,
      useId: Rd,
      useHostTransitionStatus: kc,
      useFormState: hd,
      useActionState: hd,
      useOptimistic: function (e, t) {
        var l = Je();
        return sd(l, ze, e, t);
      },
      useMemoCache: bc,
      useCacheRefresh: jd,
    };
  jc.useEffectEvent = _d;
  var Bd = {
    readContext: st,
    use: fu,
    useCallback: Td,
    useContext: st,
    useEffect: Nc,
    useImperativeHandle: Ed,
    useInsertionEffect: bd,
    useLayoutEffect: Sd,
    useMemo: Nd,
    useReducer: xc,
    useRef: gd,
    useState: function () {
      return xc(hl);
    },
    useDebugValue: Ac,
    useDeferredValue: function (e, t) {
      var l = Je();
      return ze === null ? Cc(l, e, t) : Ad(l, ze.memoizedState, e, t);
    },
    useTransition: function () {
      var e = xc(hl)[0],
        t = Je().memoizedState;
      return [typeof e == 'boolean' ? e : Za(e), t];
    },
    useSyncExternalStore: td,
    useId: Rd,
    useHostTransitionStatus: kc,
    useFormState: yd,
    useActionState: yd,
    useOptimistic: function (e, t) {
      var l = Je();
      return ze !== null ? sd(l, ze, e, t) : ((l.baseState = e), [e, l.queue.dispatch]);
    },
    useMemoCache: bc,
    useCacheRefresh: jd,
  };
  Bd.useEffectEvent = _d;
  function Oc(e, t, l, n) {
    ((t = e.memoizedState),
      (l = l(n, t)),
      (l = l == null ? t : S({}, t, l)),
      (e.memoizedState = l),
      e.lanes === 0 && (e.updateQueue.baseState = l));
  }
  var Dc = {
    enqueueSetState: function (e, t, l) {
      e = e._reactInternals;
      var n = Dt(),
        i = Gl(n);
      ((i.payload = t),
        l != null && (i.callback = l),
        (t = Yl(e, i, n)),
        t !== null && (Et(t, e, n), Va(t, e, n)));
    },
    enqueueReplaceState: function (e, t, l) {
      e = e._reactInternals;
      var n = Dt(),
        i = Gl(n);
      ((i.tag = 1),
        (i.payload = t),
        l != null && (i.callback = l),
        (t = Yl(e, i, n)),
        t !== null && (Et(t, e, n), Va(t, e, n)));
    },
    enqueueForceUpdate: function (e, t) {
      e = e._reactInternals;
      var l = Dt(),
        n = Gl(l);
      ((n.tag = 2),
        t != null && (n.callback = t),
        (t = Yl(e, n, l)),
        t !== null && (Et(t, e, l), Va(t, e, l)));
    },
  };
  function Ud(e, t, l, n, i, s, f) {
    return (
      (e = e.stateNode),
      typeof e.shouldComponentUpdate == 'function'
        ? e.shouldComponentUpdate(n, s, f)
        : t.prototype && t.prototype.isPureReactComponent
          ? !Ba(l, n) || !Ba(i, s)
          : !0
    );
  }
  function Ld(e, t, l, n) {
    ((e = t.state),
      typeof t.componentWillReceiveProps == 'function' && t.componentWillReceiveProps(l, n),
      typeof t.UNSAFE_componentWillReceiveProps == 'function' &&
        t.UNSAFE_componentWillReceiveProps(l, n),
      t.state !== e && Dc.enqueueReplaceState(t, t.state, null));
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
  function Hd(e) {
    Ki(e);
  }
  function qd(e) {
    console.error(e);
  }
  function Gd(e) {
    Ki(e);
  }
  function yu(e, t) {
    try {
      var l = e.onUncaughtError;
      l(t.value, { componentStack: t.stack });
    } catch (n) {
      setTimeout(function () {
        throw n;
      });
    }
  }
  function Yd(e, t, l) {
    try {
      var n = e.onCaughtError;
      n(l.value, { componentStack: l.stack, errorBoundary: t.tag === 1 ? t.stateNode : null });
    } catch (i) {
      setTimeout(function () {
        throw i;
      });
    }
  }
  function zc(e, t, l) {
    return (
      (l = Gl(l)),
      (l.tag = 3),
      (l.payload = { element: null }),
      (l.callback = function () {
        yu(e, t);
      }),
      l
    );
  }
  function Xd(e) {
    return ((e = Gl(e)), (e.tag = 3), e);
  }
  function Vd(e, t, l, n) {
    var i = l.type.getDerivedStateFromError;
    if (typeof i == 'function') {
      var s = n.value;
      ((e.payload = function () {
        return i(s);
      }),
        (e.callback = function () {
          Yd(t, l, n);
        }));
    }
    var f = l.stateNode;
    f !== null &&
      typeof f.componentDidCatch == 'function' &&
      (e.callback = function () {
        (Yd(t, l, n),
          typeof i != 'function' && (Zl === null ? (Zl = new Set([this])) : Zl.add(this)));
        var p = n.stack;
        this.componentDidCatch(n.value, { componentStack: p !== null ? p : '' });
      });
  }
  function Hg(e, t, l, n, i) {
    if (((l.flags |= 32768), n !== null && typeof n == 'object' && typeof n.then == 'function')) {
      if (((t = l.alternate), t !== null && Kn(t, l, i, !0), (l = kt.current), l !== null)) {
        switch (l.tag) {
          case 31:
          case 13:
            return (
              Xt === null ? Mu() : l.alternate === null && Ke === 0 && (Ke = 3),
              (l.flags &= -257),
              (l.flags |= 65536),
              (l.lanes = i),
              n === nu
                ? (l.flags |= 16384)
                : ((t = l.updateQueue),
                  t === null ? (l.updateQueue = new Set([n])) : t.add(n),
                  io(e, n, i)),
              !1
            );
          case 22:
            return (
              (l.flags |= 65536),
              n === nu
                ? (l.flags |= 16384)
                : ((t = l.updateQueue),
                  t === null
                    ? ((t = { transitions: null, markerInstances: null, retryQueue: new Set([n]) }),
                      (l.updateQueue = t))
                    : ((l = t.retryQueue), l === null ? (t.retryQueue = new Set([n])) : l.add(n)),
                  io(e, n, i)),
              !1
            );
        }
        throw Error(c(435, l.tag));
      }
      return (io(e, n, i), Mu(), !1);
    }
    if (be)
      return (
        (t = kt.current),
        t !== null
          ? ((t.flags & 65536) === 0 && (t.flags |= 256),
            (t.flags |= 65536),
            (t.lanes = i),
            n !== Ps && ((e = Error(c(422), { cause: n })), Ha(Ht(e, l))))
          : (n !== Ps && ((t = Error(c(423), { cause: n })), Ha(Ht(t, l))),
            (e = e.current.alternate),
            (e.flags |= 65536),
            (i &= -i),
            (e.lanes |= i),
            (n = Ht(n, l)),
            (i = zc(e.stateNode, n, i)),
            rc(e, i),
            Ke !== 4 && (Ke = 2)),
        !1
      );
    var s = Error(c(520), { cause: n });
    if (((s = Ht(s, l)), ai === null ? (ai = [s]) : ai.push(s), Ke !== 4 && (Ke = 2), t === null))
      return !0;
    ((n = Ht(n, l)), (l = t));
    do {
      switch (l.tag) {
        case 3:
          return (
            (l.flags |= 65536),
            (e = i & -i),
            (l.lanes |= e),
            (e = zc(l.stateNode, n, e)),
            rc(l, e),
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
              (i = Xd(i)),
              Vd(i, e, l, n),
              rc(l, i),
              !1
            );
      }
      l = l.return;
    } while (l !== null);
    return !1;
  }
  var wc = Error(c(461)),
    Fe = !1;
  function ct(e, t, l, n) {
    t.child = e === null ? Zf(t, null, l, n) : xn(t, e.child, l, n);
  }
  function Qd(e, t, l, n, i) {
    l = l.render;
    var s = t.ref;
    if ('ref' in n) {
      var f = {};
      for (var p in n) p !== 'ref' && (f[p] = n[p]);
    } else f = n;
    return (
      vn(t),
      (n = yc(e, t, l, f, s, i)),
      (p = gc()),
      e !== null && !Fe
        ? (vc(e, t, i), pl(e, t, i))
        : (be && p && Ws(t), (t.flags |= 1), ct(e, t, n, i), t.child)
    );
  }
  function $d(e, t, l, n, i) {
    if (e === null) {
      var s = l.type;
      return typeof s == 'function' && !Zs(s) && s.defaultProps === void 0 && l.compare === null
        ? ((t.tag = 15), (t.type = s), Kd(e, t, s, n, i))
        : ((e = Wi(l.type, null, n, t, t.mode, i)), (e.ref = t.ref), (e.return = t), (t.child = e));
    }
    if (((s = e.child), !Xc(e, i))) {
      var f = s.memoizedProps;
      if (((l = l.compare), (l = l !== null ? l : Ba), l(f, n) && e.ref === t.ref))
        return pl(e, t, i);
    }
    return ((t.flags |= 1), (e = ol(s, n)), (e.ref = t.ref), (e.return = t), (t.child = e));
  }
  function Kd(e, t, l, n, i) {
    if (e !== null) {
      var s = e.memoizedProps;
      if (Ba(s, n) && e.ref === t.ref)
        if (((Fe = !1), (t.pendingProps = n = s), Xc(e, i))) (e.flags & 131072) !== 0 && (Fe = !0);
        else return ((t.lanes = e.lanes), pl(e, t, i));
    }
    return Bc(e, t, l, n, i);
  }
  function Zd(e, t, l, n) {
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
        return Jd(e, t, s, l, n);
      }
      if ((l & 536870912) !== 0)
        ((t.memoizedState = { baseLanes: 0, cachePool: null }),
          e !== null && tu(t, s !== null ? s.cachePool : null),
          s !== null ? Wf(t, s) : dc(),
          Ff(t));
      else return ((n = t.lanes = 536870912), Jd(e, t, s !== null ? s.baseLanes | l : l, l, n));
    } else
      s !== null
        ? (tu(t, s.cachePool), Wf(t, s), Vl(), (t.memoizedState = null))
        : (e !== null && tu(t, null), dc(), Vl());
    return (ct(e, t, i, l), t.child);
  }
  function Wa(e, t) {
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
  function Jd(e, t, l, n, i) {
    var s = uc();
    return (
      (s = s === null ? null : { parent: Ie._currentValue, pool: s }),
      (t.memoizedState = { baseLanes: l, cachePool: s }),
      e !== null && tu(t, null),
      dc(),
      Ff(t),
      e !== null && Kn(e, t, n, !0),
      (t.childLanes = i),
      null
    );
  }
  function gu(e, t) {
    return (
      (t = _u({ mode: t.mode, children: t.children }, e.mode)),
      (t.ref = e.ref),
      (e.child = t),
      (t.return = e),
      t
    );
  }
  function Id(e, t, l) {
    return (
      xn(t, e.child, null, l),
      (e = gu(t, t.pendingProps)),
      (e.flags |= 2),
      Rt(t),
      (t.memoizedState = null),
      e
    );
  }
  function qg(e, t, l) {
    var n = t.pendingProps,
      i = (t.flags & 128) !== 0;
    if (((t.flags &= -129), e === null)) {
      if (be) {
        if (n.mode === 'hidden') return ((e = gu(t, n)), (t.lanes = 536870912), Wa(null, e));
        if (
          (hc(t),
          (e = Le)
            ? ((e = ch(e, Yt)),
              (e = e !== null && e.data === '&' ? e : null),
              e !== null &&
                ((t.memoizedState = {
                  dehydrated: e,
                  treeContext: Bl !== null ? { id: el, overflow: tl } : null,
                  retryLane: 536870912,
                  hydrationErrors: null,
                }),
                (l = Df(e)),
                (l.return = t),
                (t.child = l),
                (ut = t),
                (Le = null)))
            : (e = null),
          e === null)
        )
          throw Ll(t);
        return ((t.lanes = 536870912), null);
      }
      return gu(t, n);
    }
    var s = e.memoizedState;
    if (s !== null) {
      var f = s.dehydrated;
      if ((hc(t), i))
        if (t.flags & 256) ((t.flags &= -257), (t = Id(e, t, l)));
        else if (t.memoizedState !== null) ((t.child = e.child), (t.flags |= 128), (t = null));
        else throw Error(c(558));
      else if ((Fe || Kn(e, t, l, !1), (i = (l & e.childLanes) !== 0), Fe || i)) {
        if (((n = Ue), n !== null && ((f = Hr(n, l)), f !== 0 && f !== s.retryLane)))
          throw ((s.retryLane = f), hn(e, f), Et(n, e, f), wc);
        (Mu(), (t = Id(e, t, l)));
      } else
        ((e = s.treeContext),
          (Le = Vt(f.nextSibling)),
          (ut = t),
          (be = !0),
          (Ul = null),
          (Yt = !1),
          e !== null && Bf(t, e),
          (t = gu(t, n)),
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
  function vu(e, t) {
    var l = t.ref;
    if (l === null) e !== null && e.ref !== null && (t.flags |= 4194816);
    else {
      if (typeof l != 'function' && typeof l != 'object') throw Error(c(284));
      (e === null || e.ref !== l) && (t.flags |= 4194816);
    }
  }
  function Bc(e, t, l, n, i) {
    return (
      vn(t),
      (l = yc(e, t, l, n, void 0, i)),
      (n = gc()),
      e !== null && !Fe
        ? (vc(e, t, i), pl(e, t, i))
        : (be && n && Ws(t), (t.flags |= 1), ct(e, t, l, i), t.child)
    );
  }
  function Wd(e, t, l, n, i, s) {
    return (
      vn(t),
      (t.updateQueue = null),
      (l = ed(t, n, l, i)),
      Pf(e),
      (n = gc()),
      e !== null && !Fe
        ? (vc(e, t, s), pl(e, t, s))
        : (be && n && Ws(t), (t.flags |= 1), ct(e, t, l, s), t.child)
    );
  }
  function Fd(e, t, l, n, i) {
    if ((vn(t), t.stateNode === null)) {
      var s = Xn,
        f = l.contextType;
      (typeof f == 'object' && f !== null && (s = st(f)),
        (s = new l(n, s)),
        (t.memoizedState = s.state !== null && s.state !== void 0 ? s.state : null),
        (s.updater = Dc),
        (t.stateNode = s),
        (s._reactInternals = t),
        (s = t.stateNode),
        (s.props = n),
        (s.state = t.memoizedState),
        (s.refs = {}),
        cc(t),
        (f = l.contextType),
        (s.context = typeof f == 'object' && f !== null ? st(f) : Xn),
        (s.state = t.memoizedState),
        (f = l.getDerivedStateFromProps),
        typeof f == 'function' && (Oc(t, l, f, n), (s.state = t.memoizedState)),
        typeof l.getDerivedStateFromProps == 'function' ||
          typeof s.getSnapshotBeforeUpdate == 'function' ||
          (typeof s.UNSAFE_componentWillMount != 'function' &&
            typeof s.componentWillMount != 'function') ||
          ((f = s.state),
          typeof s.componentWillMount == 'function' && s.componentWillMount(),
          typeof s.UNSAFE_componentWillMount == 'function' && s.UNSAFE_componentWillMount(),
          f !== s.state && Dc.enqueueReplaceState(s, s.state, null),
          $a(t, n, s, i),
          Qa(),
          (s.state = t.memoizedState)),
        typeof s.componentDidMount == 'function' && (t.flags |= 4194308),
        (n = !0));
    } else if (e === null) {
      s = t.stateNode;
      var p = t.memoizedProps,
        x = Tn(l, p);
      s.props = x;
      var j = s.context,
        q = l.contextType;
      ((f = Xn), typeof q == 'object' && q !== null && (f = st(q)));
      var V = l.getDerivedStateFromProps;
      ((q = typeof V == 'function' || typeof s.getSnapshotBeforeUpdate == 'function'),
        (p = t.pendingProps !== p),
        q ||
          (typeof s.UNSAFE_componentWillReceiveProps != 'function' &&
            typeof s.componentWillReceiveProps != 'function') ||
          ((p || j !== f) && Ld(t, s, n, f)),
        (ql = !1));
      var O = t.memoizedState;
      ((s.state = O),
        $a(t, n, s, i),
        Qa(),
        (j = t.memoizedState),
        p || O !== j || ql
          ? (typeof V == 'function' && (Oc(t, l, V, n), (j = t.memoizedState)),
            (x = ql || Ud(t, l, x, n, O, j, f))
              ? (q ||
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
        oc(e, t),
        (f = t.memoizedProps),
        (q = Tn(l, f)),
        (s.props = q),
        (V = t.pendingProps),
        (O = s.context),
        (j = l.contextType),
        (x = Xn),
        typeof j == 'object' && j !== null && (x = st(j)),
        (p = l.getDerivedStateFromProps),
        (j = typeof p == 'function' || typeof s.getSnapshotBeforeUpdate == 'function') ||
          (typeof s.UNSAFE_componentWillReceiveProps != 'function' &&
            typeof s.componentWillReceiveProps != 'function') ||
          ((f !== V || O !== x) && Ld(t, s, n, x)),
        (ql = !1),
        (O = t.memoizedState),
        (s.state = O),
        $a(t, n, s, i),
        Qa());
      var w = t.memoizedState;
      f !== V || O !== w || ql || (e !== null && e.dependencies !== null && Pi(e.dependencies))
        ? (typeof p == 'function' && (Oc(t, l, p, n), (w = t.memoizedState)),
          (q =
            ql ||
            Ud(t, l, q, n, O, w, x) ||
            (e !== null && e.dependencies !== null && Pi(e.dependencies)))
            ? (j ||
                (typeof s.UNSAFE_componentWillUpdate != 'function' &&
                  typeof s.componentWillUpdate != 'function') ||
                (typeof s.componentWillUpdate == 'function' && s.componentWillUpdate(n, w, x),
                typeof s.UNSAFE_componentWillUpdate == 'function' &&
                  s.UNSAFE_componentWillUpdate(n, w, x)),
              typeof s.componentDidUpdate == 'function' && (t.flags |= 4),
              typeof s.getSnapshotBeforeUpdate == 'function' && (t.flags |= 1024))
            : (typeof s.componentDidUpdate != 'function' ||
                (f === e.memoizedProps && O === e.memoizedState) ||
                (t.flags |= 4),
              typeof s.getSnapshotBeforeUpdate != 'function' ||
                (f === e.memoizedProps && O === e.memoizedState) ||
                (t.flags |= 1024),
              (t.memoizedProps = n),
              (t.memoizedState = w)),
          (s.props = n),
          (s.state = w),
          (s.context = x),
          (n = q))
        : (typeof s.componentDidUpdate != 'function' ||
            (f === e.memoizedProps && O === e.memoizedState) ||
            (t.flags |= 4),
          typeof s.getSnapshotBeforeUpdate != 'function' ||
            (f === e.memoizedProps && O === e.memoizedState) ||
            (t.flags |= 1024),
          (n = !1));
    }
    return (
      (s = n),
      vu(e, t),
      (n = (t.flags & 128) !== 0),
      s || n
        ? ((s = t.stateNode),
          (l = n && typeof l.getDerivedStateFromError != 'function' ? null : s.render()),
          (t.flags |= 1),
          e !== null && n
            ? ((t.child = xn(t, e.child, null, i)), (t.child = xn(t, null, l, i)))
            : ct(e, t, l, i),
          (t.memoizedState = s.state),
          (e = t.child))
        : (e = pl(e, t, i)),
      e
    );
  }
  function Pd(e, t, l, n) {
    return (yn(), (t.flags |= 256), ct(e, t, l, n), t.child);
  }
  var Uc = { dehydrated: null, treeContext: null, retryLane: 0, hydrationErrors: null };
  function Lc(e) {
    return { baseLanes: e, cachePool: Yf() };
  }
  function Hc(e, t, l) {
    return ((e = e !== null ? e.childLanes & ~l : 0), t && (e |= Ot), e);
  }
  function em(e, t, l) {
    var n = t.pendingProps,
      i = !1,
      s = (t.flags & 128) !== 0,
      f;
    if (
      ((f = s) || (f = e !== null && e.memoizedState === null ? !1 : (Ze.current & 2) !== 0),
      f && ((i = !0), (t.flags &= -129)),
      (f = (t.flags & 32) !== 0),
      (t.flags &= -33),
      e === null)
    ) {
      if (be) {
        if (
          (i ? Xl(t) : Vl(),
          (e = Le)
            ? ((e = ch(e, Yt)),
              (e = e !== null && e.data !== '&' ? e : null),
              e !== null &&
                ((t.memoizedState = {
                  dehydrated: e,
                  treeContext: Bl !== null ? { id: el, overflow: tl } : null,
                  retryLane: 536870912,
                  hydrationErrors: null,
                }),
                (l = Df(e)),
                (l.return = t),
                (t.child = l),
                (ut = t),
                (Le = null)))
            : (e = null),
          e === null)
        )
          throw Ll(t);
        return (xo(e) ? (t.lanes = 32) : (t.lanes = 536870912), null);
      }
      var p = n.children;
      return (
        (n = n.fallback),
        i
          ? (Vl(),
            (i = t.mode),
            (p = _u({ mode: 'hidden', children: p }, i)),
            (n = pn(n, i, l, null)),
            (p.return = t),
            (n.return = t),
            (p.sibling = n),
            (t.child = p),
            (n = t.child),
            (n.memoizedState = Lc(l)),
            (n.childLanes = Hc(e, f, l)),
            (t.memoizedState = Uc),
            Wa(null, n))
          : (Xl(t), qc(t, p))
      );
    }
    var x = e.memoizedState;
    if (x !== null && ((p = x.dehydrated), p !== null)) {
      if (s)
        t.flags & 256
          ? (Xl(t), (t.flags &= -257), (t = Gc(e, t, l)))
          : t.memoizedState !== null
            ? (Vl(), (t.child = e.child), (t.flags |= 128), (t = null))
            : (Vl(),
              (p = n.fallback),
              (i = t.mode),
              (n = _u({ mode: 'visible', children: n.children }, i)),
              (p = pn(p, i, l, null)),
              (p.flags |= 2),
              (n.return = t),
              (p.return = t),
              (n.sibling = p),
              (t.child = n),
              xn(t, e.child, null, l),
              (n = t.child),
              (n.memoizedState = Lc(l)),
              (n.childLanes = Hc(e, f, l)),
              (t.memoizedState = Uc),
              (t = Wa(null, n)));
      else if ((Xl(t), xo(p))) {
        if (((f = p.nextSibling && p.nextSibling.dataset), f)) var j = f.dgst;
        ((f = j),
          (n = Error(c(419))),
          (n.stack = ''),
          (n.digest = f),
          Ha({ value: n, source: null, stack: null }),
          (t = Gc(e, t, l)));
      } else if ((Fe || Kn(e, t, l, !1), (f = (l & e.childLanes) !== 0), Fe || f)) {
        if (((f = Ue), f !== null && ((n = Hr(f, l)), n !== 0 && n !== x.retryLane)))
          throw ((x.retryLane = n), hn(e, n), Et(f, e, n), wc);
        (So(p) || Mu(), (t = Gc(e, t, l)));
      } else
        So(p)
          ? ((t.flags |= 192), (t.child = e.child), (t = null))
          : ((e = x.treeContext),
            (Le = Vt(p.nextSibling)),
            (ut = t),
            (be = !0),
            (Ul = null),
            (Yt = !1),
            e !== null && Bf(t, e),
            (t = qc(t, n.children)),
            (t.flags |= 4096));
      return t;
    }
    return i
      ? (Vl(),
        (p = n.fallback),
        (i = t.mode),
        (x = e.child),
        (j = x.sibling),
        (n = ol(x, { mode: 'hidden', children: n.children })),
        (n.subtreeFlags = x.subtreeFlags & 65011712),
        j !== null ? (p = ol(j, p)) : ((p = pn(p, i, l, null)), (p.flags |= 2)),
        (p.return = t),
        (n.return = t),
        (n.sibling = p),
        (t.child = n),
        Wa(null, n),
        (n = t.child),
        (p = e.child.memoizedState),
        p === null
          ? (p = Lc(l))
          : ((i = p.cachePool),
            i !== null
              ? ((x = Ie._currentValue), (i = i.parent !== x ? { parent: x, pool: x } : i))
              : (i = Yf()),
            (p = { baseLanes: p.baseLanes | l, cachePool: i })),
        (n.memoizedState = p),
        (n.childLanes = Hc(e, f, l)),
        (t.memoizedState = Uc),
        Wa(e.child, n))
      : (Xl(t),
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
    return ((t = _u({ mode: 'visible', children: t }, e.mode)), (t.return = e), (e.child = t));
  }
  function _u(e, t) {
    return ((e = Mt(22, e, null, t)), (e.lanes = 0), e);
  }
  function Gc(e, t, l) {
    return (
      xn(t, e.child, null, l),
      (e = qc(t, t.pendingProps.children)),
      (e.flags |= 2),
      (t.memoizedState = null),
      e
    );
  }
  function tm(e, t, l) {
    e.lanes |= t;
    var n = e.alternate;
    (n !== null && (n.lanes |= t), lc(e.return, t, l));
  }
  function Yc(e, t, l, n, i, s) {
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
  function lm(e, t, l) {
    var n = t.pendingProps,
      i = n.revealOrder,
      s = n.tail;
    n = n.children;
    var f = Ze.current,
      p = (f & 2) !== 0;
    if (
      (p ? ((f = (f & 1) | 2), (t.flags |= 128)) : (f &= 1),
      I(Ze, f),
      ct(e, t, n, l),
      (n = be ? La : 0),
      !p && e !== null && (e.flags & 128) !== 0)
    )
      e: for (e = t.child; e !== null; ) {
        if (e.tag === 13) e.memoizedState !== null && tm(e, l, t);
        else if (e.tag === 19) tm(e, l, t);
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
          ((e = l.alternate), e !== null && su(e) === null && (i = l), (l = l.sibling));
        ((l = i),
          l === null ? ((i = t.child), (t.child = null)) : ((i = l.sibling), (l.sibling = null)),
          Yc(t, !1, i, l, s, n));
        break;
      case 'backwards':
      case 'unstable_legacy-backwards':
        for (l = null, i = t.child, t.child = null; i !== null; ) {
          if (((e = i.alternate), e !== null && su(e) === null)) {
            t.child = i;
            break;
          }
          ((e = i.sibling), (i.sibling = l), (l = i), (i = e));
        }
        Yc(t, !0, l, null, s, n);
        break;
      case 'together':
        Yc(t, !1, null, null, void 0, n);
        break;
      default:
        t.memoizedState = null;
    }
    return t.child;
  }
  function pl(e, t, l) {
    if (
      (e !== null && (t.dependencies = e.dependencies), (Kl |= t.lanes), (l & t.childLanes) === 0)
    )
      if (e !== null) {
        if ((Kn(e, t, l, !1), (l & t.childLanes) === 0)) return null;
      } else return null;
    if (e !== null && t.child !== e.child) throw Error(c(153));
    if (t.child !== null) {
      for (e = t.child, l = ol(e, e.pendingProps), t.child = l, l.return = t; e.sibling !== null; )
        ((e = e.sibling), (l = l.sibling = ol(e, e.pendingProps)), (l.return = t));
      l.sibling = null;
    }
    return t.child;
  }
  function Xc(e, t) {
    return (e.lanes & t) !== 0 ? !0 : ((e = e.dependencies), !!(e !== null && Pi(e)));
  }
  function Gg(e, t, l) {
    switch (t.tag) {
      case 3:
        (tt(t, t.stateNode.containerInfo), Hl(t, Ie, e.memoizedState.cache), yn());
        break;
      case 27:
      case 5:
        Y(t);
        break;
      case 4:
        tt(t, t.stateNode.containerInfo);
        break;
      case 10:
        Hl(t, t.type, t.memoizedProps.value);
        break;
      case 31:
        if (t.memoizedState !== null) return ((t.flags |= 128), hc(t), null);
        break;
      case 13:
        var n = t.memoizedState;
        if (n !== null)
          return n.dehydrated !== null
            ? (Xl(t), (t.flags |= 128), null)
            : (l & t.child.childLanes) !== 0
              ? em(e, t, l)
              : (Xl(t), (e = pl(e, t, l)), e !== null ? e.sibling : null);
        Xl(t);
        break;
      case 19:
        var i = (e.flags & 128) !== 0;
        if (
          ((n = (l & t.childLanes) !== 0),
          n || (Kn(e, t, l, !1), (n = (l & t.childLanes) !== 0)),
          i)
        ) {
          if (n) return lm(e, t, l);
          t.flags |= 128;
        }
        if (
          ((i = t.memoizedState),
          i !== null && ((i.rendering = null), (i.tail = null), (i.lastEffect = null)),
          I(Ze, Ze.current),
          n)
        )
          break;
        return null;
      case 22:
        return ((t.lanes = 0), Zd(e, t, l, t.pendingProps));
      case 24:
        Hl(t, Ie, e.memoizedState.cache);
    }
    return pl(e, t, l);
  }
  function nm(e, t, l) {
    if (e !== null)
      if (e.memoizedProps !== t.pendingProps) Fe = !0;
      else {
        if (!Xc(e, l) && (t.flags & 128) === 0) return ((Fe = !1), Gg(e, t, l));
        Fe = (e.flags & 131072) !== 0;
      }
    else ((Fe = !1), be && (t.flags & 1048576) !== 0 && wf(t, La, t.index));
    switch (((t.lanes = 0), t.tag)) {
      case 16:
        e: {
          var n = t.pendingProps;
          if (((e = bn(t.elementType)), (t.type = e), typeof e == 'function'))
            Zs(e)
              ? ((n = Tn(e, n)), (t.tag = 1), (t = Fd(null, t, e, n, l)))
              : ((t.tag = 0), (t = Bc(null, t, e, n, l)));
          else {
            if (e != null) {
              var i = e.$$typeof;
              if (i === D) {
                ((t.tag = 11), (t = Qd(null, t, e, n, l)));
                break e;
              } else if (i === $) {
                ((t.tag = 14), (t = $d(null, t, e, n, l)));
                break e;
              }
            }
            throw ((t = pt(e) || e), Error(c(306, t, '')));
          }
        }
        return t;
      case 0:
        return Bc(e, t, t.type, t.pendingProps, l);
      case 1:
        return ((n = t.type), (i = Tn(n, t.pendingProps)), Fd(e, t, n, i, l));
      case 3:
        e: {
          if ((tt(t, t.stateNode.containerInfo), e === null)) throw Error(c(387));
          n = t.pendingProps;
          var s = t.memoizedState;
          ((i = s.element), oc(e, t), $a(t, n, null, l));
          var f = t.memoizedState;
          if (
            ((n = f.cache),
            Hl(t, Ie, n),
            n !== s.cache && nc(t, [Ie], l, !0),
            Qa(),
            (n = f.element),
            s.isDehydrated)
          )
            if (
              ((s = { element: n, isDehydrated: !1, cache: f.cache }),
              (t.updateQueue.baseState = s),
              (t.memoizedState = s),
              t.flags & 256)
            ) {
              t = Pd(e, t, n, l);
              break e;
            } else if (n !== i) {
              ((i = Ht(Error(c(424)), t)), Ha(i), (t = Pd(e, t, n, l)));
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
                Le = Vt(e.firstChild),
                  ut = t,
                  be = !0,
                  Ul = null,
                  Yt = !0,
                  l = Zf(t, null, n, l),
                  t.child = l;
                l;
              )
                ((l.flags = (l.flags & -3) | 4096), (l = l.sibling));
            }
          else {
            if ((yn(), n === i)) {
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
          vu(e, t),
          e === null
            ? (l = hh(t.type, null, t.pendingProps, null))
              ? (t.memoizedState = l)
              : be ||
                ((l = t.type),
                (e = t.pendingProps),
                (n = wu(pe.current).createElement(l)),
                (n[it] = t),
                (n[gt] = e),
                ot(n, l, e),
                lt(n),
                (t.stateNode = n))
            : (t.memoizedState = hh(t.type, e.memoizedProps, t.pendingProps, e.memoizedState)),
          null
        );
      case 27:
        return (
          Y(t),
          e === null &&
            be &&
            ((n = t.stateNode = fh(t.type, t.pendingProps, pe.current)),
            (ut = t),
            (Yt = !0),
            (i = Le),
            Fl(t.type) ? ((Eo = i), (Le = Vt(n.firstChild))) : (Le = i)),
          ct(e, t, t.pendingProps.children, l),
          vu(e, t),
          e === null && (t.flags |= 4194304),
          t.child
        );
      case 5:
        return (
          e === null &&
            be &&
            ((i = n = Le) &&
              ((n = g0(n, t.type, t.pendingProps, Yt)),
              n !== null
                ? ((t.stateNode = n), (ut = t), (Le = Vt(n.firstChild)), (Yt = !1), (i = !0))
                : (i = !1)),
            i || Ll(t)),
          Y(t),
          (i = t.type),
          (s = t.pendingProps),
          (f = e !== null ? e.memoizedProps : null),
          (n = s.children),
          vo(i, s) ? (n = null) : f !== null && vo(i, f) && (t.flags |= 32),
          t.memoizedState !== null && ((i = yc(e, t, Og, null, null, l)), (di._currentValue = i)),
          vu(e, t),
          ct(e, t, n, l),
          t.child
        );
      case 6:
        return (
          e === null &&
            be &&
            ((e = l = Le) &&
              ((l = v0(l, t.pendingProps, Yt)),
              l !== null ? ((t.stateNode = l), (ut = t), (Le = null), (e = !0)) : (e = !1)),
            e || Ll(t)),
          null
        );
      case 13:
        return em(e, t, l);
      case 4:
        return (
          tt(t, t.stateNode.containerInfo),
          (n = t.pendingProps),
          e === null ? (t.child = xn(t, null, n, l)) : ct(e, t, n, l),
          t.child
        );
      case 11:
        return Qd(e, t, t.type, t.pendingProps, l);
      case 7:
        return (ct(e, t, t.pendingProps, l), t.child);
      case 8:
        return (ct(e, t, t.pendingProps.children, l), t.child);
      case 12:
        return (ct(e, t, t.pendingProps.children, l), t.child);
      case 10:
        return ((n = t.pendingProps), Hl(t, t.type, n.value), ct(e, t, n.children, l), t.child);
      case 9:
        return (
          (i = t.type._context),
          (n = t.pendingProps.children),
          vn(t),
          (i = st(i)),
          (n = n(i)),
          (t.flags |= 1),
          ct(e, t, n, l),
          t.child
        );
      case 14:
        return $d(e, t, t.type, t.pendingProps, l);
      case 15:
        return Kd(e, t, t.type, t.pendingProps, l);
      case 19:
        return lm(e, t, l);
      case 31:
        return qg(e, t, l);
      case 22:
        return Zd(e, t, l, t.pendingProps);
      case 24:
        return (
          vn(t),
          (n = st(Ie)),
          e === null
            ? ((i = uc()),
              i === null &&
                ((i = Ue),
                (s = ac()),
                (i.pooledCache = s),
                s.refCount++,
                s !== null && (i.pooledCacheLanes |= l),
                (i = s)),
              (t.memoizedState = { parent: n, cache: i }),
              cc(t),
              Hl(t, Ie, i))
            : ((e.lanes & l) !== 0 && (oc(e, t), $a(t, null, null, l), Qa()),
              (i = e.memoizedState),
              (s = t.memoizedState),
              i.parent !== n
                ? ((i = { parent: n, cache: n }),
                  (t.memoizedState = i),
                  t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = i),
                  Hl(t, Ie, n))
                : ((n = s.cache), Hl(t, Ie, n), n !== i.cache && nc(t, [Ie], l, !0))),
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
  function Vc(e, t, l, n, i) {
    if (((t = (e.mode & 32) !== 0) && (t = !1), t)) {
      if (((e.flags |= 16777216), (i & 335544128) === i))
        if (e.stateNode.complete) e.flags |= 8192;
        else if (Rm()) e.flags |= 8192;
        else throw ((Sn = nu), sc);
    } else e.flags &= -16777217;
  }
  function am(e, t) {
    if (t.type !== 'stylesheet' || (t.state.loading & 4) !== 0) e.flags &= -16777217;
    else if (((e.flags |= 16777216), !_h(t)))
      if (Rm()) e.flags |= 8192;
      else throw ((Sn = nu), sc);
  }
  function bu(e, t) {
    (t !== null && (e.flags |= 4),
      e.flags & 16384 && ((t = e.tag !== 22 ? Br() : 536870912), (e.lanes |= t), (ia |= t)));
  }
  function Fa(e, t) {
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
  function He(e) {
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
  function Yg(e, t, l) {
    var n = t.pendingProps;
    switch ((Fs(t), t.tag)) {
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return (He(t), null);
      case 1:
        return (He(t), null);
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
            ($n(t)
              ? yl(t)
              : e === null ||
                (e.memoizedState.isDehydrated && (t.flags & 256) === 0) ||
                ((t.flags |= 1024), ec())),
          He(t),
          null
        );
      case 26:
        var i = t.type,
          s = t.memoizedState;
        return (
          e === null
            ? (yl(t), s !== null ? (He(t), am(t, s)) : (He(t), Vc(t, i, null, n, l)))
            : s
              ? s !== e.memoizedState
                ? (yl(t), He(t), am(t, s))
                : (He(t), (t.flags &= -16777217))
              : ((e = e.memoizedProps), e !== n && yl(t), He(t), Vc(t, i, e, n, l)),
          null
        );
      case 27:
        if ((ae(t), (l = pe.current), (i = t.type), e !== null && t.stateNode != null))
          e.memoizedProps !== n && yl(t);
        else {
          if (!n) {
            if (t.stateNode === null) throw Error(c(166));
            return (He(t), null);
          }
          ((e = P.current), $n(t) ? Uf(t) : ((e = fh(i, n, l)), (t.stateNode = e), yl(t)));
        }
        return (He(t), null);
      case 5:
        if ((ae(t), (i = t.type), e !== null && t.stateNode != null))
          e.memoizedProps !== n && yl(t);
        else {
          if (!n) {
            if (t.stateNode === null) throw Error(c(166));
            return (He(t), null);
          }
          if (((s = P.current), $n(t))) Uf(t);
          else {
            var f = wu(pe.current);
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
            ((s[it] = t), (s[gt] = n));
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
        return (He(t), Vc(t, t.type, e === null ? null : e.memoizedProps, t.pendingProps, l), null);
      case 6:
        if (e && t.stateNode != null) e.memoizedProps !== n && yl(t);
        else {
          if (typeof n != 'string' && t.stateNode === null) throw Error(c(166));
          if (((e = pe.current), $n(t))) {
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
                eh(e.nodeValue, l)
              )),
              e || Ll(t, !0));
          } else ((e = wu(e).createTextNode(n)), (e[it] = t), (t.stateNode = e));
        }
        return (He(t), null);
      case 31:
        if (((l = t.memoizedState), e === null || e.memoizedState !== null)) {
          if (((n = $n(t)), l !== null)) {
            if (e === null) {
              if (!n) throw Error(c(318));
              if (((e = t.memoizedState), (e = e !== null ? e.dehydrated : null), !e))
                throw Error(c(557));
              e[it] = t;
            } else (yn(), (t.flags & 128) === 0 && (t.memoizedState = null), (t.flags |= 4));
            (He(t), (e = !1));
          } else
            ((l = ec()),
              e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = l),
              (e = !0));
          if (!e) return t.flags & 256 ? (Rt(t), t) : (Rt(t), null);
          if ((t.flags & 128) !== 0) throw Error(c(558));
        }
        return (He(t), null);
      case 13:
        if (
          ((n = t.memoizedState),
          e === null || (e.memoizedState !== null && e.memoizedState.dehydrated !== null))
        ) {
          if (((i = $n(t)), n !== null && n.dehydrated !== null)) {
            if (e === null) {
              if (!i) throw Error(c(318));
              if (((i = t.memoizedState), (i = i !== null ? i.dehydrated : null), !i))
                throw Error(c(317));
              i[it] = t;
            } else (yn(), (t.flags & 128) === 0 && (t.memoizedState = null), (t.flags |= 4));
            (He(t), (i = !1));
          } else
            ((i = ec()),
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
              bu(t, t.updateQueue),
              He(t),
              null)
        );
      case 4:
        return (Ge(), e === null && mo(t.stateNode.containerInfo), He(t), null);
      case 10:
        return (dl(t.type), He(t), null);
      case 19:
        if ((G(Ze), (n = t.memoizedState), n === null)) return (He(t), null);
        if (((i = (t.flags & 128) !== 0), (s = n.rendering), s === null))
          if (i) Fa(n, !1);
          else {
            if (Ke !== 0 || (e !== null && (e.flags & 128) !== 0))
              for (e = t.child; e !== null; ) {
                if (((s = su(e)), s !== null)) {
                  for (
                    t.flags |= 128,
                      Fa(n, !1),
                      e = s.updateQueue,
                      t.updateQueue = e,
                      bu(t, e),
                      t.subtreeFlags = 0,
                      e = l,
                      l = t.child;
                    l !== null;
                  )
                    (Of(l, e), (l = l.sibling));
                  return (I(Ze, (Ze.current & 1) | 2), be && rl(t, n.treeForkCount), t.child);
                }
                e = e.sibling;
              }
            n.tail !== null &&
              Tt() > Nu &&
              ((t.flags |= 128), (i = !0), Fa(n, !1), (t.lanes = 4194304));
          }
        else {
          if (!i)
            if (((e = su(s)), e !== null)) {
              if (
                ((t.flags |= 128),
                (i = !0),
                (e = e.updateQueue),
                (t.updateQueue = e),
                bu(t, e),
                Fa(n, !0),
                n.tail === null && n.tailMode === 'hidden' && !s.alternate && !be)
              )
                return (He(t), null);
            } else
              2 * Tt() - n.renderingStartTime > Nu &&
                l !== 536870912 &&
                ((t.flags |= 128), (i = !0), Fa(n, !1), (t.lanes = 4194304));
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
            (l = Ze.current),
            I(Ze, i ? (l & 1) | 2 : l & 1),
            be && rl(t, n.treeForkCount),
            e)
          : (He(t), null);
      case 22:
      case 23:
        return (
          Rt(t),
          mc(),
          (n = t.memoizedState !== null),
          e !== null
            ? (e.memoizedState !== null) !== n && (t.flags |= 8192)
            : n && (t.flags |= 8192),
          n
            ? (l & 536870912) !== 0 &&
              (t.flags & 128) === 0 &&
              (He(t), t.subtreeFlags & 6 && (t.flags |= 8192))
            : He(t),
          (l = t.updateQueue),
          l !== null && bu(t, l.retryQueue),
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
          e !== null && G(_n),
          null
        );
      case 24:
        return (
          (l = null),
          e !== null && (l = e.memoizedState.cache),
          t.memoizedState.cache !== l && (t.flags |= 2048),
          dl(Ie),
          He(t),
          null
        );
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(c(156, t.tag));
  }
  function Xg(e, t) {
    switch ((Fs(t), t.tag)) {
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
        return (G(Ze), null);
      case 4:
        return (Ge(), null);
      case 10:
        return (dl(t.type), null);
      case 22:
      case 23:
        return (
          Rt(t),
          mc(),
          e !== null && G(_n),
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
  function im(e, t) {
    switch ((Fs(t), t.tag)) {
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
        G(Ze);
        break;
      case 10:
        dl(t.type);
        break;
      case 22:
      case 23:
        (Rt(t), mc(), e !== null && G(_n));
        break;
      case 24:
        dl(Ie);
    }
  }
  function Pa(e, t) {
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
  function Ql(e, t, l) {
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
              } catch (q) {
                Oe(i, x, q);
              }
            }
          }
          n = n.next;
        } while (n !== s);
      }
    } catch (q) {
      Oe(t, t.return, q);
    }
  }
  function um(e) {
    var t = e.updateQueue;
    if (t !== null) {
      var l = e.stateNode;
      try {
        If(t, l);
      } catch (n) {
        Oe(e, e.return, n);
      }
    }
  }
  function sm(e, t, l) {
    ((l.props = Tn(e.type, e.memoizedProps)), (l.state = e.memoizedState));
    try {
      l.componentWillUnmount();
    } catch (n) {
      Oe(e, t, n);
    }
  }
  function ei(e, t) {
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
  function cm(e) {
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
  function Qc(e, t, l) {
    try {
      var n = e.stateNode;
      (f0(n, e.type, l, t), (n[gt] = t));
    } catch (i) {
      Oe(e, e.return, i);
    }
  }
  function om(e) {
    return (
      e.tag === 5 || e.tag === 3 || e.tag === 26 || (e.tag === 27 && Fl(e.type)) || e.tag === 4
    );
  }
  function $c(e) {
    e: for (;;) {
      for (; e.sibling === null; ) {
        if (e.return === null || om(e.return)) return null;
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
  function Kc(e, t, l) {
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
      (n === 27 && Fl(e.type) && ((l = e.stateNode), (t = null)), (e = e.child), e !== null)
    )
      for (Kc(e, t, l), e = e.sibling; e !== null; ) (Kc(e, t, l), (e = e.sibling));
  }
  function Su(e, t, l) {
    var n = e.tag;
    if (n === 5 || n === 6) ((e = e.stateNode), t ? l.insertBefore(e, t) : l.appendChild(e));
    else if (n !== 4 && (n === 27 && Fl(e.type) && (l = e.stateNode), (e = e.child), e !== null))
      for (Su(e, t, l), e = e.sibling; e !== null; ) (Su(e, t, l), (e = e.sibling));
  }
  function rm(e) {
    var t = e.stateNode,
      l = e.memoizedProps;
    try {
      for (var n = e.type, i = t.attributes; i.length; ) t.removeAttributeNode(i[0]);
      (ot(t, n, l), (t[it] = e), (t[gt] = l));
    } catch (s) {
      Oe(e, e.return, s);
    }
  }
  var gl = !1,
    Pe = !1,
    Zc = !1,
    fm = typeof WeakSet == 'function' ? WeakSet : Set,
    nt = null;
  function Vg(e, t) {
    if (((e = e.containerInfo), (yo = Yu), (e = Ef(e)), Gs(e))) {
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
              q = 0,
              V = e,
              O = null;
            t: for (;;) {
              for (
                var w;
                V !== l || (i !== 0 && V.nodeType !== 3) || (p = f + i),
                  V !== s || (n !== 0 && V.nodeType !== 3) || (x = f + n),
                  V.nodeType === 3 && (f += V.nodeValue.length),
                  (w = V.firstChild) !== null;
              )
                ((O = V), (V = w));
              for (;;) {
                if (V === e) break t;
                if (
                  (O === l && ++j === i && (p = f),
                  O === s && ++q === n && (x = f),
                  (w = V.nextSibling) !== null)
                )
                  break;
                ((V = O), (O = V.parentNode));
              }
              V = w;
            }
            l = p === -1 || x === -1 ? null : { start: p, end: x };
          } else l = null;
        }
      l = l || { start: 0, end: 0 };
    } else l = null;
    for (go = { focusedElem: e, selectionRange: l }, Yu = !1, nt = t; nt !== null; )
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
                  var ee = Tn(l.type, i);
                  ((e = n.getSnapshotBeforeUpdate(ee, s)),
                    (n.__reactInternalSnapshotBeforeUpdate = e));
                } catch (ue) {
                  Oe(l, l.return, ue);
                }
              }
              break;
            case 3:
              if ((e & 1024) !== 0) {
                if (((e = t.stateNode.containerInfo), (l = e.nodeType), l === 9)) bo(e);
                else if (l === 1)
                  switch (e.nodeName) {
                    case 'HEAD':
                    case 'HTML':
                    case 'BODY':
                      bo(e);
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
  function dm(e, t, l) {
    var n = l.flags;
    switch (l.tag) {
      case 0:
      case 11:
      case 15:
        (_l(e, l), n & 4 && Pa(5, l));
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
            var i = Tn(l.type, t.memoizedProps);
            t = t.memoizedState;
            try {
              e.componentDidUpdate(i, t, e.__reactInternalSnapshotBeforeUpdate);
            } catch (f) {
              Oe(l, l.return, f);
            }
          }
        (n & 64 && um(l), n & 512 && ei(l, l.return));
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
            If(e, t);
          } catch (f) {
            Oe(l, l.return, f);
          }
        }
        break;
      case 27:
        t === null && n & 4 && rm(l);
      case 26:
      case 5:
        (_l(e, l), t === null && n & 4 && cm(l), n & 512 && ei(l, l.return));
        break;
      case 12:
        _l(e, l);
        break;
      case 31:
        (_l(e, l), n & 4 && pm(e, l));
        break;
      case 13:
        (_l(e, l),
          n & 4 && ym(e, l),
          n & 64 &&
            ((e = l.memoizedState),
            e !== null && ((e = e.dehydrated), e !== null && ((l = Pg.bind(null, l)), _0(e, l)))));
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
  function mm(e) {
    var t = e.alternate;
    (t !== null && ((e.alternate = null), mm(t)),
      (e.child = null),
      (e.deletions = null),
      (e.sibling = null),
      e.tag === 5 && ((t = e.stateNode), t !== null && Ts(t)),
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
    _t = !1;
  function vl(e, t, l) {
    for (l = l.child; l !== null; ) (hm(e, t, l), (l = l.sibling));
  }
  function hm(e, t, l) {
    if (Nt && typeof Nt.onCommitFiberUnmount == 'function')
      try {
        Nt.onCommitFiberUnmount(Ta, l);
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
          i = _t;
        (Fl(l.type) && ((Ye = l.stateNode), (_t = !1)),
          vl(e, t, l),
          oi(l.stateNode),
          (Ye = n),
          (_t = i));
        break;
      case 5:
        Pe || ll(l, t);
      case 6:
        if (((n = Ye), (i = _t), (Ye = null), vl(e, t, l), (Ye = n), (_t = i), Ye !== null))
          if (_t)
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
          (_t
            ? ((e = Ye),
              uh(
                e.nodeType === 9 ? e.body : e.nodeName === 'HTML' ? e.ownerDocument.body : e,
                l.stateNode
              ),
              ma(e))
            : uh(Ye, l.stateNode));
        break;
      case 4:
        ((n = Ye),
          (i = _t),
          (Ye = l.stateNode.containerInfo),
          (_t = !0),
          vl(e, t, l),
          (Ye = n),
          (_t = i));
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        (Ql(2, l, t), Pe || Ql(4, l, t), vl(e, t, l));
        break;
      case 1:
        (Pe ||
          (ll(l, t), (n = l.stateNode), typeof n.componentWillUnmount == 'function' && sm(l, t, n)),
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
  function pm(e, t) {
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
  function ym(e, t) {
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
  function Qg(e) {
    switch (e.tag) {
      case 31:
      case 13:
      case 19:
        var t = e.stateNode;
        return (t === null && (t = e.stateNode = new fm()), t);
      case 22:
        return (
          (e = e.stateNode),
          (t = e._retryCache),
          t === null && (t = e._retryCache = new fm()),
          t
        );
      default:
        throw Error(c(435, e.tag));
    }
  }
  function xu(e, t) {
    var l = Qg(e);
    t.forEach(function (n) {
      if (!l.has(n)) {
        l.add(n);
        var i = e0.bind(null, e, n);
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
          p = f;
        e: for (; p !== null; ) {
          switch (p.tag) {
            case 27:
              if (Fl(p.type)) {
                ((Ye = p.stateNode), (_t = !1));
                break e;
              }
              break;
            case 5:
              ((Ye = p.stateNode), (_t = !1));
              break e;
            case 3:
            case 4:
              ((Ye = p.stateNode.containerInfo), (_t = !0));
              break e;
          }
          p = p.return;
        }
        if (Ye === null) throw Error(c(160));
        (hm(s, f, i),
          (Ye = null),
          (_t = !1),
          (s = i.alternate),
          s !== null && (s.return = null),
          (i.return = null));
      }
    if (t.subtreeFlags & 13886) for (t = t.child; t !== null; ) (gm(t, e), (t = t.sibling));
  }
  var Jt = null;
  function gm(e, t) {
    var l = e.alternate,
      n = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        (bt(t, e), St(e), n & 4 && (Ql(3, e, e.return), Pa(3, e), Ql(5, e, e.return)));
        break;
      case 1:
        (bt(t, e),
          St(e),
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
        if ((bt(t, e), St(e), n & 512 && (Pe || l === null || ll(l, l.return)), n & 4)) {
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
                          s[Ca] ||
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
                      var f = gh('link', 'href', i).get(n + (l.href || ''));
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
                      if ((f = gh('meta', 'content', i).get(n + (l.content || '')))) {
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
              } else vh(i, e.type, e.stateNode);
            else e.stateNode = yh(i, n, e.memoizedProps);
          else
            s !== n
              ? (s === null
                  ? l.stateNode !== null && ((l = l.stateNode), l.parentNode.removeChild(l))
                  : s.count--,
                n === null ? vh(i, e.type, e.stateNode) : yh(i, n, e.memoizedProps))
              : n === null && e.stateNode !== null && Qc(e, e.memoizedProps, l.memoizedProps);
        }
        break;
      case 27:
        (bt(t, e),
          St(e),
          n & 512 && (Pe || l === null || ll(l, l.return)),
          l !== null && n & 4 && Qc(e, e.memoizedProps, l.memoizedProps));
        break;
      case 5:
        if ((bt(t, e), St(e), n & 512 && (Pe || l === null || ll(l, l.return)), e.flags & 32)) {
          i = e.stateNode;
          try {
            Bn(i, '');
          } catch (ee) {
            Oe(e, e.return, ee);
          }
        }
        (n & 4 &&
          e.stateNode != null &&
          ((i = e.memoizedProps), Qc(e, i, l !== null ? l.memoizedProps : i)),
          n & 1024 && (Zc = !0));
        break;
      case 6:
        if ((bt(t, e), St(e), n & 4)) {
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
          ((Lu = null),
          (i = Jt),
          (Jt = Bu(t.containerInfo)),
          bt(t, e),
          (Jt = i),
          St(e),
          n & 4 && l !== null && l.memoizedState.isDehydrated)
        )
          try {
            ma(t.containerInfo);
          } catch (ee) {
            Oe(e, e.return, ee);
          }
        Zc && ((Zc = !1), vm(e));
        break;
      case 4:
        ((n = Jt), (Jt = Bu(e.stateNode.containerInfo)), bt(t, e), St(e), (Jt = n));
        break;
      case 12:
        (bt(t, e), St(e));
        break;
      case 31:
        (bt(t, e),
          St(e),
          n & 4 && ((n = e.updateQueue), n !== null && ((e.updateQueue = null), xu(e, n))));
        break;
      case 13:
        (bt(t, e),
          St(e),
          e.child.flags & 8192 &&
            (e.memoizedState !== null) != (l !== null && l.memoizedState !== null) &&
            (Tu = Tt()),
          n & 4 && ((n = e.updateQueue), n !== null && ((e.updateQueue = null), xu(e, n))));
        break;
      case 22:
        i = e.memoizedState !== null;
        var x = l !== null && l.memoizedState !== null,
          j = gl,
          q = Pe;
        if (((gl = j || i), (Pe = q || x), bt(t, e), (Pe = q), (gl = j), St(e), n & 8192))
          e: for (
            t = e.stateNode,
              t._visibility = i ? t._visibility & -2 : t._visibility | 1,
              i && (l === null || x || gl || Pe || Nn(e)),
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
                      O = V != null && V.hasOwnProperty('display') ? V.display : null;
                    p.style.display = O == null || typeof O == 'boolean' ? '' : ('' + O).trim();
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
                  i ? sh(w, !0) : sh(x.stateNode, !1);
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
          n !== null && ((l = n.retryQueue), l !== null && ((n.retryQueue = null), xu(e, l))));
        break;
      case 19:
        (bt(t, e),
          St(e),
          n & 4 && ((n = e.updateQueue), n !== null && ((e.updateQueue = null), xu(e, n))));
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
          if (om(n)) {
            l = n;
            break;
          }
          n = n.return;
        }
        if (l == null) throw Error(c(160));
        switch (l.tag) {
          case 27:
            var i = l.stateNode,
              s = $c(e);
            Su(e, s, i);
            break;
          case 5:
            var f = l.stateNode;
            l.flags & 32 && (Bn(f, ''), (l.flags &= -33));
            var p = $c(e);
            Su(e, p, f);
            break;
          case 3:
          case 4:
            var x = l.stateNode.containerInfo,
              j = $c(e);
            Kc(e, j, x);
            break;
          default:
            throw Error(c(161));
        }
      } catch (q) {
        Oe(e, e.return, q);
      }
      e.flags &= -3;
    }
    t & 4096 && (e.flags &= -4097);
  }
  function vm(e) {
    if (e.subtreeFlags & 1024)
      for (e = e.child; e !== null; ) {
        var t = e;
        (vm(t), t.tag === 5 && t.flags & 1024 && t.stateNode.reset(), (e = e.sibling));
      }
  }
  function _l(e, t) {
    if (t.subtreeFlags & 8772)
      for (t = t.child; t !== null; ) (dm(e, t.alternate, t), (t = t.sibling));
  }
  function Nn(e) {
    for (e = e.child; e !== null; ) {
      var t = e;
      switch (t.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          (Ql(4, t, t.return), Nn(t));
          break;
        case 1:
          ll(t, t.return);
          var l = t.stateNode;
          (typeof l.componentWillUnmount == 'function' && sm(t, t.return, l), Nn(t));
          break;
        case 27:
          oi(t.stateNode);
        case 26:
        case 5:
          (ll(t, t.return), Nn(t));
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
          (bl(i, s, l), Pa(4, s));
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
                for (i.shared.hiddenCallbacks = null, i = 0; i < x.length; i++) Jf(x[i], p);
            } catch (j) {
              Oe(n, n.return, j);
            }
          }
          (l && f & 64 && um(s), ei(s, s.return));
          break;
        case 27:
          rm(s);
        case 26:
        case 5:
          (bl(i, s, l), l && n === null && f & 4 && cm(s), ei(s, s.return));
          break;
        case 12:
          bl(i, s, l);
          break;
        case 31:
          (bl(i, s, l), l && f & 4 && pm(i, s));
          break;
        case 13:
          (bl(i, s, l), l && f & 4 && ym(i, s));
          break;
        case 22:
          (s.memoizedState === null && bl(i, s, l), ei(s, s.return));
          break;
        case 30:
          break;
        default:
          bl(i, s, l);
      }
      t = t.sibling;
    }
  }
  function Jc(e, t) {
    var l = null;
    (e !== null &&
      e.memoizedState !== null &&
      e.memoizedState.cachePool !== null &&
      (l = e.memoizedState.cachePool.pool),
      (e = null),
      t.memoizedState !== null &&
        t.memoizedState.cachePool !== null &&
        (e = t.memoizedState.cachePool.pool),
      e !== l && (e != null && e.refCount++, l != null && qa(l)));
  }
  function Ic(e, t) {
    ((e = null),
      t.alternate !== null && (e = t.alternate.memoizedState.cache),
      (t = t.memoizedState.cache),
      t !== e && (t.refCount++, e != null && qa(e)));
  }
  function It(e, t, l, n) {
    if (t.subtreeFlags & 10256) for (t = t.child; t !== null; ) (_m(e, t, l, n), (t = t.sibling));
  }
  function _m(e, t, l, n) {
    var i = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        (It(e, t, l, n), i & 2048 && Pa(9, t));
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
            t !== e && (t.refCount++, e != null && qa(e))));
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
              : ti(e, t)
            : s._visibility & 2
              ? It(e, t, l, n)
              : ((s._visibility |= 2), la(e, t, l, n, (t.subtreeFlags & 10256) !== 0 || !1)),
          i & 2048 && Jc(f, t));
        break;
      case 24:
        (It(e, t, l, n), i & 2048 && Ic(t.alternate, t));
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
          (la(s, f, p, x, i), Pa(8, f));
          break;
        case 23:
          break;
        case 22:
          var q = f.stateNode;
          (f.memoizedState !== null
            ? q._visibility & 2
              ? la(s, f, p, x, i)
              : ti(s, f)
            : ((q._visibility |= 2), la(s, f, p, x, i)),
            i && j & 2048 && Jc(f.alternate, f));
          break;
        case 24:
          (la(s, f, p, x, i), i && j & 2048 && Ic(f.alternate, f));
          break;
        default:
          la(s, f, p, x, i);
      }
      t = t.sibling;
    }
  }
  function ti(e, t) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; ) {
        var l = e,
          n = t,
          i = n.flags;
        switch (n.tag) {
          case 22:
            (ti(l, n), i & 2048 && Jc(n.alternate, n));
            break;
          case 24:
            (ti(l, n), i & 2048 && Ic(n.alternate, n));
            break;
          default:
            ti(l, n);
        }
        t = t.sibling;
      }
  }
  var li = 8192;
  function na(e, t, l) {
    if (e.subtreeFlags & li) for (e = e.child; e !== null; ) (bm(e, t, l), (e = e.sibling));
  }
  function bm(e, t, l) {
    switch (e.tag) {
      case 26:
        (na(e, t, l),
          e.flags & li && e.memoizedState !== null && j0(l, Jt, e.memoizedState, e.memoizedProps));
        break;
      case 5:
        na(e, t, l);
        break;
      case 3:
      case 4:
        var n = Jt;
        ((Jt = Bu(e.stateNode.containerInfo)), na(e, t, l), (Jt = n));
        break;
      case 22:
        e.memoizedState === null &&
          ((n = e.alternate),
          n !== null && n.memoizedState !== null
            ? ((n = li), (li = 16777216), na(e, t, l), (li = n))
            : na(e, t, l));
        break;
      default:
        na(e, t, l);
    }
  }
  function Sm(e) {
    var t = e.alternate;
    if (t !== null && ((e = t.child), e !== null)) {
      t.child = null;
      do ((t = e.sibling), (e.sibling = null), (e = t));
      while (e !== null);
    }
  }
  function ni(e) {
    var t = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (t !== null)
        for (var l = 0; l < t.length; l++) {
          var n = t[l];
          ((nt = n), Em(n, e));
        }
      Sm(e);
    }
    if (e.subtreeFlags & 10256) for (e = e.child; e !== null; ) (xm(e), (e = e.sibling));
  }
  function xm(e) {
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        (ni(e), e.flags & 2048 && Ql(9, e, e.return));
        break;
      case 3:
        ni(e);
        break;
      case 12:
        ni(e);
        break;
      case 22:
        var t = e.stateNode;
        e.memoizedState !== null && t._visibility & 2 && (e.return === null || e.return.tag !== 13)
          ? ((t._visibility &= -3), Eu(e))
          : ni(e);
        break;
      default:
        ni(e);
    }
  }
  function Eu(e) {
    var t = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (t !== null)
        for (var l = 0; l < t.length; l++) {
          var n = t[l];
          ((nt = n), Em(n, e));
        }
      Sm(e);
    }
    for (e = e.child; e !== null; ) {
      switch (((t = e), t.tag)) {
        case 0:
        case 11:
        case 15:
          (Ql(8, t, t.return), Eu(t));
          break;
        case 22:
          ((l = t.stateNode), l._visibility & 2 && ((l._visibility &= -3), Eu(t)));
          break;
        default:
          Eu(t);
      }
      e = e.sibling;
    }
  }
  function Em(e, t) {
    for (; nt !== null; ) {
      var l = nt;
      switch (l.tag) {
        case 0:
        case 11:
        case 15:
          Ql(8, l, t);
          break;
        case 23:
        case 22:
          if (l.memoizedState !== null && l.memoizedState.cachePool !== null) {
            var n = l.memoizedState.cachePool.pool;
            n != null && n.refCount++;
          }
          break;
        case 24:
          qa(l.memoizedState.cache);
      }
      if (((n = l.child), n !== null)) ((n.return = l), (nt = n));
      else
        e: for (l = e; nt !== null; ) {
          n = nt;
          var i = n.sibling,
            s = n.return;
          if ((mm(n), n === l)) {
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
  var $g = {
      getCacheForType: function (e) {
        var t = st(Ie),
          l = t.data.get(e);
        return (l === void 0 && ((l = e()), t.data.set(e, l)), l);
      },
      cacheSignal: function () {
        return st(Ie).controller.signal;
      },
    },
    Kg = typeof WeakMap == 'function' ? WeakMap : Map,
    Ce = 0,
    Ue = null,
    ye = null,
    ve = 0,
    je = 0,
    jt = null,
    $l = !1,
    aa = !1,
    Wc = !1,
    Sl = 0,
    Ke = 0,
    Kl = 0,
    An = 0,
    Fc = 0,
    Ot = 0,
    ia = 0,
    ai = null,
    xt = null,
    Pc = !1,
    Tu = 0,
    Tm = 0,
    Nu = 1 / 0,
    Au = null,
    Zl = null,
    et = 0,
    Jl = null,
    ua = null,
    xl = 0,
    eo = 0,
    to = null,
    Nm = null,
    ii = 0,
    lo = null;
  function Dt() {
    return (Ce & 2) !== 0 && ve !== 0 ? ve & -ve : H.T !== null ? co() : qr();
  }
  function Am() {
    if (Ot === 0)
      if ((ve & 536870912) === 0 || be) {
        var e = zi;
        ((zi <<= 1), (zi & 3932160) === 0 && (zi = 262144), (Ot = e));
      } else Ot = 536870912;
    return ((e = kt.current), e !== null && (e.flags |= 32), Ot);
  }
  function Et(e, t, l) {
    (((e === Ue && (je === 2 || je === 9)) || e.cancelPendingCommit !== null) &&
      (sa(e, 0), Il(e, ve, Ot, !1)),
      Aa(e, l),
      ((Ce & 2) === 0 || e !== Ue) &&
        (e === Ue && ((Ce & 2) === 0 && (An |= l), Ke === 4 && Il(e, ve, Ot, !1)), nl(e)));
  }
  function Cm(e, t, l) {
    if ((Ce & 6) !== 0) throw Error(c(327));
    var n = (!l && (t & 127) === 0 && (t & e.expiredLanes) === 0) || Na(e, t),
      i = n ? Ig(e, t) : ao(e, t, !0),
      s = n;
    do {
      if (i === 0) {
        aa && !n && Il(e, t, 0, !1);
        break;
      } else {
        if (((l = e.current.alternate), s && !Zg(l))) {
          ((i = ao(e, t, !1)), (s = !1));
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
              i = ai;
              var x = p.current.memoizedState.isDehydrated;
              if ((x && (sa(p, f).flags |= 256), (f = ao(p, f, !1)), f !== 2)) {
                if (Wc && !x) {
                  ((p.errorRecoveryDisabledLanes |= s), (An |= s), (i = 4));
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
          (sa(e, 0), Il(e, t, 0, !0));
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
              Il(n, t, Ot, !$l);
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
          if ((t & 62914560) === t && ((i = Tu + 300 - Tt()), 10 < i)) {
            if ((Il(n, t, Ot, !$l), Bi(n, 0, !0) !== 0)) break e;
            ((xl = t),
              (n.timeoutHandle = ah(
                Mm.bind(null, n, l, xt, Au, Pc, t, Ot, An, ia, $l, s, 'Throttled', -0, 0),
                i
              )));
            break e;
          }
          Mm(n, l, xt, Au, Pc, t, Ot, An, ia, $l, s, null, -0, 0);
        }
      }
      break;
    } while (!0);
    nl(e);
  }
  function Mm(e, t, l, n, i, s, f, p, x, j, q, V, O, w) {
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
        bm(t, s, V));
      var ee = (s & 62914560) === s ? Tu - Tt() : (s & 4194048) === s ? Tm - Tt() : 0;
      if (((ee = O0(V, ee)), ee !== null)) {
        ((xl = s),
          (e.cancelPendingCommit = ee(Bm.bind(null, e, t, s, l, n, i, f, p, x, q, V, null, O, w))),
          Il(e, s, f, !j));
        return;
      }
    }
    Bm(e, t, s, l, n, i, f, p, x);
  }
  function Zg(e) {
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
            if (!Ct(s(), i)) return !1;
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
  function Il(e, t, l, n) {
    ((t &= ~Fc),
      (t &= ~An),
      (e.suspendedLanes |= t),
      (e.pingedLanes &= ~t),
      n && (e.warmLanes |= t),
      (n = e.expirationTimes));
    for (var i = t; 0 < i; ) {
      var s = 31 - At(i),
        f = 1 << s;
      ((n[s] = -1), (i &= ~f));
    }
    l !== 0 && Ur(e, l, t);
  }
  function Cu() {
    return (Ce & 6) === 0 ? (ui(0), !1) : !0;
  }
  function no() {
    if (ye !== null) {
      if (je === 0) var e = ye.return;
      else ((e = ye), (fl = gn = null), _c(e), (Wn = null), (Ya = 0), (e = ye));
      for (; e !== null; ) (im(e.alternate, e), (e = e.return));
      ye = null;
    }
  }
  function sa(e, t) {
    var l = e.timeoutHandle;
    (l !== -1 && ((e.timeoutHandle = -1), h0(l)),
      (l = e.cancelPendingCommit),
      l !== null && ((e.cancelPendingCommit = null), l()),
      (xl = 0),
      no(),
      (Ue = e),
      (ye = l = ol(e.current, null)),
      (ve = t),
      (je = 0),
      (jt = null),
      ($l = !1),
      (aa = Na(e, t)),
      (Wc = !1),
      (ia = Ot = Fc = An = Kl = Ke = 0),
      (xt = ai = null),
      (Pc = !1),
      (t & 8) !== 0 && (t |= t & 32));
    var n = e.entangledLanes;
    if (n !== 0)
      for (e = e.entanglements, n &= t; 0 < n; ) {
        var i = 31 - At(n),
          s = 1 << i;
        ((t |= e[i]), (n &= ~s));
      }
    return ((Sl = t), Zi(), l);
  }
  function km(e, t) {
    ((me = null),
      (H.H = Ia),
      t === In || t === lu
        ? ((t = Qf()), (je = 3))
        : t === sc
          ? ((t = Qf()), (je = 4))
          : (je =
              t === wc
                ? 8
                : t !== null && typeof t == 'object' && typeof t.then == 'function'
                  ? 6
                  : 1),
      (jt = t),
      ye === null && ((Ke = 1), yu(e, Ht(t, e.current))));
  }
  function Rm() {
    var e = kt.current;
    return e === null
      ? !0
      : (ve & 4194048) === ve
        ? Xt === null
        : (ve & 62914560) === ve || (ve & 536870912) !== 0
          ? e === Xt
          : !1;
  }
  function jm() {
    var e = H.H;
    return ((H.H = Ia), e === null ? Ia : e);
  }
  function Om() {
    var e = H.A;
    return ((H.A = $g), e);
  }
  function Mu() {
    ((Ke = 4),
      $l || ((ve & 4194048) !== ve && kt.current !== null) || (aa = !0),
      ((Kl & 134217727) === 0 && (An & 134217727) === 0) || Ue === null || Il(Ue, ve, Ot, !1));
  }
  function ao(e, t, l) {
    var n = Ce;
    Ce |= 2;
    var i = jm(),
      s = Om();
    ((Ue !== e || ve !== t) && ((Au = null), sa(e, t)), (t = !1));
    var f = Ke;
    e: do
      try {
        if (je !== 0 && ye !== null) {
          var p = ye,
            x = jt;
          switch (je) {
            case 8:
              (no(), (f = 6));
              break e;
            case 3:
            case 2:
            case 9:
            case 6:
              kt.current === null && (t = !0);
              var j = je;
              if (((je = 0), (jt = null), ca(e, p, x, j), l && aa)) {
                f = 0;
                break e;
              }
              break;
            default:
              ((j = je), (je = 0), (jt = null), ca(e, p, x, j));
          }
        }
        (Jg(), (f = Ke));
        break;
      } catch (q) {
        km(e, q);
      }
    while (!0);
    return (
      t && e.shellSuspendCounter++,
      (fl = gn = null),
      (Ce = n),
      (H.H = i),
      (H.A = s),
      ye === null && ((Ue = null), (ve = 0), Zi()),
      f
    );
  }
  function Jg() {
    for (; ye !== null; ) Dm(ye);
  }
  function Ig(e, t) {
    var l = Ce;
    Ce |= 2;
    var n = jm(),
      i = Om();
    Ue !== e || ve !== t ? ((Au = null), (Nu = Tt() + 500), sa(e, t)) : (aa = Na(e, t));
    e: do
      try {
        if (je !== 0 && ye !== null) {
          t = ye;
          var s = jt;
          t: switch (je) {
            case 1:
              ((je = 0), (jt = null), ca(e, t, s, 1));
              break;
            case 2:
            case 9:
              if (Xf(s)) {
                ((je = 0), (jt = null), zm(t));
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
              Xf(s) ? ((je = 0), (jt = null), zm(t)) : ((je = 0), (jt = null), ca(e, t, s, 7));
              break;
            case 5:
              var f = null;
              switch (ye.tag) {
                case 26:
                  f = ye.memoizedState;
                case 5:
                case 27:
                  var p = ye;
                  if (f ? _h(f) : p.stateNode.complete) {
                    ((je = 0), (jt = null));
                    var x = p.sibling;
                    if (x !== null) ye = x;
                    else {
                      var j = p.return;
                      j !== null ? ((ye = j), ku(j)) : (ye = null);
                    }
                    break t;
                  }
              }
              ((je = 0), (jt = null), ca(e, t, s, 5));
              break;
            case 6:
              ((je = 0), (jt = null), ca(e, t, s, 6));
              break;
            case 8:
              (no(), (Ke = 6));
              break e;
            default:
              throw Error(c(462));
          }
        }
        Wg();
        break;
      } catch (q) {
        km(e, q);
      }
    while (!0);
    return (
      (fl = gn = null),
      (H.H = n),
      (H.A = i),
      (Ce = l),
      ye !== null ? 0 : ((Ue = null), (ve = 0), Zi(), Ke)
    );
  }
  function Wg() {
    for (; ye !== null && !by(); ) Dm(ye);
  }
  function Dm(e) {
    var t = nm(e.alternate, e, Sl);
    ((e.memoizedProps = e.pendingProps), t === null ? ku(e) : (ye = t));
  }
  function zm(e) {
    var t = e,
      l = t.alternate;
    switch (t.tag) {
      case 15:
      case 0:
        t = Wd(l, t, t.pendingProps, t.type, void 0, ve);
        break;
      case 11:
        t = Wd(l, t, t.pendingProps, t.type.render, t.ref, ve);
        break;
      case 5:
        _c(t);
      default:
        (im(l, t), (t = ye = Of(t, Sl)), (t = nm(l, t, Sl)));
    }
    ((e.memoizedProps = e.pendingProps), t === null ? ku(e) : (ye = t));
  }
  function ca(e, t, l, n) {
    ((fl = gn = null), _c(t), (Wn = null), (Ya = 0));
    var i = t.return;
    try {
      if (Hg(e, i, t, l, ve)) {
        ((Ke = 1), yu(e, Ht(l, e.current)), (ye = null));
        return;
      }
    } catch (s) {
      if (i !== null) throw ((ye = i), s);
      ((Ke = 1), yu(e, Ht(l, e.current)), (ye = null));
      return;
    }
    t.flags & 32768
      ? (be || n === 1
          ? (e = !0)
          : aa || (ve & 536870912) !== 0
            ? (e = !1)
            : (($l = e = !0),
              (n === 2 || n === 9 || n === 3 || n === 6) &&
                ((n = kt.current), n !== null && n.tag === 13 && (n.flags |= 16384))),
        wm(t, e))
      : ku(t);
  }
  function ku(e) {
    var t = e;
    do {
      if ((t.flags & 32768) !== 0) {
        wm(t, $l);
        return;
      }
      e = t.return;
      var l = Yg(t.alternate, t, Sl);
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
    Ke === 0 && (Ke = 5);
  }
  function wm(e, t) {
    do {
      var l = Xg(e.alternate, e);
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
    ((Ke = 6), (ye = null));
  }
  function Bm(e, t, l, n, i, s, f, p, x) {
    e.cancelPendingCommit = null;
    do Ru();
    while (et !== 0);
    if ((Ce & 6) !== 0) throw Error(c(327));
    if (t !== null) {
      if (t === e.current) throw Error(c(177));
      if (
        ((s = t.lanes | t.childLanes),
        (s |= $s),
        Ry(e, l, s, f, p, x),
        e === Ue && ((ye = Ue = null), (ve = 0)),
        (ua = t),
        (Jl = e),
        (xl = l),
        (eo = s),
        (to = i),
        (Nm = n),
        (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0
          ? ((e.callbackNode = null),
            (e.callbackPriority = 0),
            t0(Oi, function () {
              return (Gm(), null);
            }))
          : ((e.callbackNode = null), (e.callbackPriority = 0)),
        (n = (t.flags & 13878) !== 0),
        (t.subtreeFlags & 13878) !== 0 || n)
      ) {
        ((n = H.T), (H.T = null), (i = J.p), (J.p = 2), (f = Ce), (Ce |= 4));
        try {
          Vg(e, t, l);
        } finally {
          ((Ce = f), (J.p = i), (H.T = n));
        }
      }
      ((et = 1), Um(), Lm(), Hm());
    }
  }
  function Um() {
    if (et === 1) {
      et = 0;
      var e = Jl,
        t = ua,
        l = (t.flags & 13878) !== 0;
      if ((t.subtreeFlags & 13878) !== 0 || l) {
        ((l = H.T), (H.T = null));
        var n = J.p;
        J.p = 2;
        var i = Ce;
        Ce |= 4;
        try {
          gm(t, e);
          var s = go,
            f = Ef(e.containerInfo),
            p = s.focusedElem,
            x = s.selectionRange;
          if (f !== p && p && p.ownerDocument && xf(p.ownerDocument.documentElement, p)) {
            if (x !== null && Gs(p)) {
              var j = x.start,
                q = x.end;
              if ((q === void 0 && (q = j), 'selectionStart' in p))
                ((p.selectionStart = j), (p.selectionEnd = Math.min(q, p.value.length)));
              else {
                var V = p.ownerDocument || document,
                  O = (V && V.defaultView) || window;
                if (O.getSelection) {
                  var w = O.getSelection(),
                    ee = p.textContent.length,
                    ue = Math.min(x.start, ee),
                    Be = x.end === void 0 ? ue : Math.min(x.end, ee);
                  !w.extend && ue > Be && ((f = Be), (Be = ue), (ue = f));
                  var M = Sf(p, ue),
                    T = Sf(p, Be);
                  if (
                    M &&
                    T &&
                    (w.rangeCount !== 1 ||
                      w.anchorNode !== M.node ||
                      w.anchorOffset !== M.offset ||
                      w.focusNode !== T.node ||
                      w.focusOffset !== T.offset)
                  ) {
                    var R = V.createRange();
                    (R.setStart(M.node, M.offset),
                      w.removeAllRanges(),
                      ue > Be
                        ? (w.addRange(R), w.extend(T.node, T.offset))
                        : (R.setEnd(T.node, T.offset), w.addRange(R)));
                  }
                }
              }
            }
            for (V = [], w = p; (w = w.parentNode); )
              w.nodeType === 1 && V.push({ element: w, left: w.scrollLeft, top: w.scrollTop });
            for (typeof p.focus == 'function' && p.focus(), p = 0; p < V.length; p++) {
              var X = V[p];
              ((X.element.scrollLeft = X.left), (X.element.scrollTop = X.top));
            }
          }
          ((Yu = !!yo), (go = yo = null));
        } finally {
          ((Ce = i), (J.p = n), (H.T = l));
        }
      }
      ((e.current = t), (et = 2));
    }
  }
  function Lm() {
    if (et === 2) {
      et = 0;
      var e = Jl,
        t = ua,
        l = (t.flags & 8772) !== 0;
      if ((t.subtreeFlags & 8772) !== 0 || l) {
        ((l = H.T), (H.T = null));
        var n = J.p;
        J.p = 2;
        var i = Ce;
        Ce |= 4;
        try {
          dm(e, t.alternate, t);
        } finally {
          ((Ce = i), (J.p = n), (H.T = l));
        }
      }
      et = 3;
    }
  }
  function Hm() {
    if (et === 4 || et === 3) {
      ((et = 0), Sy());
      var e = Jl,
        t = ua,
        l = xl,
        n = Nm;
      (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0
        ? (et = 5)
        : ((et = 0), (ua = Jl = null), qm(e, e.pendingLanes));
      var i = e.pendingLanes;
      if (
        (i === 0 && (Zl = null),
        xs(l),
        (t = t.stateNode),
        Nt && typeof Nt.onCommitFiberRoot == 'function')
      )
        try {
          Nt.onCommitFiberRoot(Ta, t, void 0, (t.current.flags & 128) === 128);
        } catch {}
      if (n !== null) {
        ((t = H.T), (i = J.p), (J.p = 2), (H.T = null));
        try {
          for (var s = e.onRecoverableError, f = 0; f < n.length; f++) {
            var p = n[f];
            s(p.value, { componentStack: p.stack });
          }
        } finally {
          ((H.T = t), (J.p = i));
        }
      }
      ((xl & 3) !== 0 && Ru(),
        nl(e),
        (i = e.pendingLanes),
        (l & 261930) !== 0 && (i & 42) !== 0 ? (e === lo ? ii++ : ((ii = 0), (lo = e))) : (ii = 0),
        ui(0));
    }
  }
  function qm(e, t) {
    (e.pooledCacheLanes &= t) === 0 &&
      ((t = e.pooledCache), t != null && ((e.pooledCache = null), qa(t)));
  }
  function Ru() {
    return (Um(), Lm(), Hm(), Gm());
  }
  function Gm() {
    if (et !== 5) return !1;
    var e = Jl,
      t = eo;
    eo = 0;
    var l = xs(xl),
      n = H.T,
      i = J.p;
    try {
      ((J.p = 32 > l ? 32 : l), (H.T = null), (l = to), (to = null));
      var s = Jl,
        f = xl;
      if (((et = 0), (ua = Jl = null), (xl = 0), (Ce & 6) !== 0)) throw Error(c(331));
      var p = Ce;
      if (
        ((Ce |= 4),
        xm(s.current),
        _m(s, s.current, f, l),
        (Ce = p),
        ui(0, !1),
        Nt && typeof Nt.onPostCommitFiberRoot == 'function')
      )
        try {
          Nt.onPostCommitFiberRoot(Ta, s);
        } catch {}
      return !0;
    } finally {
      ((J.p = i), (H.T = n), qm(e, t));
    }
  }
  function Ym(e, t, l) {
    ((t = Ht(l, t)),
      (t = zc(e.stateNode, t, 2)),
      (e = Yl(e, t, 2)),
      e !== null && (Aa(e, 2), nl(e)));
  }
  function Oe(e, t, l) {
    if (e.tag === 3) Ym(e, e, l);
    else
      for (; t !== null; ) {
        if (t.tag === 3) {
          Ym(t, e, l);
          break;
        } else if (t.tag === 1) {
          var n = t.stateNode;
          if (
            typeof t.type.getDerivedStateFromError == 'function' ||
            (typeof n.componentDidCatch == 'function' && (Zl === null || !Zl.has(n)))
          ) {
            ((e = Ht(l, e)),
              (l = Xd(2)),
              (n = Yl(t, l, 2)),
              n !== null && (Vd(l, n, t, e), Aa(n, 2), nl(n)));
            break;
          }
        }
        t = t.return;
      }
  }
  function io(e, t, l) {
    var n = e.pingCache;
    if (n === null) {
      n = e.pingCache = new Kg();
      var i = new Set();
      n.set(t, i);
    } else ((i = n.get(t)), i === void 0 && ((i = new Set()), n.set(t, i)));
    i.has(l) || ((Wc = !0), i.add(l), (e = Fg.bind(null, e, t, l)), t.then(e, e));
  }
  function Fg(e, t, l) {
    var n = e.pingCache;
    (n !== null && n.delete(t),
      (e.pingedLanes |= e.suspendedLanes & l),
      (e.warmLanes &= ~l),
      Ue === e &&
        (ve & l) === l &&
        (Ke === 4 || (Ke === 3 && (ve & 62914560) === ve && 300 > Tt() - Tu)
          ? (Ce & 2) === 0 && sa(e, 0)
          : (Fc |= l),
        ia === ve && (ia = 0)),
      nl(e));
  }
  function Xm(e, t) {
    (t === 0 && (t = Br()), (e = hn(e, t)), e !== null && (Aa(e, t), nl(e)));
  }
  function Pg(e) {
    var t = e.memoizedState,
      l = 0;
    (t !== null && (l = t.retryLane), Xm(e, l));
  }
  function e0(e, t) {
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
    (n !== null && n.delete(t), Xm(e, l));
  }
  function t0(e, t) {
    return vs(e, t);
  }
  var ju = null,
    oa = null,
    uo = !1,
    Ou = !1,
    so = !1,
    Wl = 0;
  function nl(e) {
    (e !== oa && e.next === null && (oa === null ? (ju = oa = e) : (oa = oa.next = e)),
      (Ou = !0),
      uo || ((uo = !0), n0()));
  }
  function ui(e, t) {
    if (!so && Ou) {
      so = !0;
      do
        for (var l = !1, n = ju; n !== null; ) {
          if (e !== 0) {
            var i = n.pendingLanes;
            if (i === 0) var s = 0;
            else {
              var f = n.suspendedLanes,
                p = n.pingedLanes;
              ((s = (1 << (31 - At(42 | e) + 1)) - 1),
                (s &= i & ~(f & ~p)),
                (s = s & 201326741 ? (s & 201326741) | 1 : s ? s | 2 : 0));
            }
            s !== 0 && ((l = !0), Km(n, s));
          } else
            ((s = ve),
              (s = Bi(
                n,
                n === Ue ? s : 0,
                n.cancelPendingCommit !== null || n.timeoutHandle !== -1
              )),
              (s & 3) === 0 || Na(n, s) || ((l = !0), Km(n, s)));
          n = n.next;
        }
      while (l);
      so = !1;
    }
  }
  function l0() {
    Vm();
  }
  function Vm() {
    Ou = uo = !1;
    var e = 0;
    Wl !== 0 && m0() && (e = Wl);
    for (var t = Tt(), l = null, n = ju; n !== null; ) {
      var i = n.next,
        s = Qm(n, t);
      (s === 0
        ? ((n.next = null), l === null ? (ju = i) : (l.next = i), i === null && (oa = l))
        : ((l = n), (e !== 0 || (s & 3) !== 0) && (Ou = !0)),
        (n = i));
    }
    ((et !== 0 && et !== 5) || ui(e), Wl !== 0 && (Wl = 0));
  }
  function Qm(e, t) {
    for (
      var l = e.suspendedLanes,
        n = e.pingedLanes,
        i = e.expirationTimes,
        s = e.pendingLanes & -62914561;
      0 < s;
    ) {
      var f = 31 - At(s),
        p = 1 << f,
        x = i[f];
      (x === -1
        ? ((p & l) === 0 || (p & n) !== 0) && (i[f] = ky(p, t))
        : x <= t && (e.expiredLanes |= p),
        (s &= ~p));
    }
    if (
      ((t = Ue),
      (l = ve),
      (l = Bi(e, e === t ? l : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== -1)),
      (n = e.callbackNode),
      l === 0 || (e === t && (je === 2 || je === 9)) || e.cancelPendingCommit !== null)
    )
      return (n !== null && n !== null && _s(n), (e.callbackNode = null), (e.callbackPriority = 0));
    if ((l & 3) === 0 || Na(e, l)) {
      if (((t = l & -l), t === e.callbackPriority)) return t;
      switch ((n !== null && _s(n), xs(l))) {
        case 2:
        case 8:
          l = zr;
          break;
        case 32:
          l = Oi;
          break;
        case 268435456:
          l = wr;
          break;
        default:
          l = Oi;
      }
      return (
        (n = $m.bind(null, e)),
        (l = vs(l, n)),
        (e.callbackPriority = t),
        (e.callbackNode = l),
        t
      );
    }
    return (
      n !== null && n !== null && _s(n),
      (e.callbackPriority = 2),
      (e.callbackNode = null),
      2
    );
  }
  function $m(e, t) {
    if (et !== 0 && et !== 5) return ((e.callbackNode = null), (e.callbackPriority = 0), null);
    var l = e.callbackNode;
    if (Ru() && e.callbackNode !== l) return null;
    var n = ve;
    return (
      (n = Bi(e, e === Ue ? n : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== -1)),
      n === 0
        ? null
        : (Cm(e, n, t),
          Qm(e, Tt()),
          e.callbackNode != null && e.callbackNode === l ? $m.bind(null, e) : null)
    );
  }
  function Km(e, t) {
    if (Ru()) return null;
    Cm(e, t, !0);
  }
  function n0() {
    p0(function () {
      (Ce & 6) !== 0 ? vs(Dr, l0) : Vm();
    });
  }
  function co() {
    if (Wl === 0) {
      var e = Zn;
      (e === 0 && ((e = Di), (Di <<= 1), (Di & 261888) === 0 && (Di = 256)), (Wl = e));
    }
    return Wl;
  }
  function Zm(e) {
    return e == null || typeof e == 'symbol' || typeof e == 'boolean'
      ? null
      : typeof e == 'function'
        ? e
        : qi('' + e);
  }
  function Jm(e, t) {
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
  function a0(e, t, l, n, i) {
    if (t === 'submit' && l && l.stateNode === i) {
      var s = Zm((i[gt] || null).action),
        f = n.submitter;
      f &&
        ((t = (t = f[gt] || null) ? Zm(t.formAction) : f.getAttribute('formAction')),
        t !== null && ((s = t), (f = null)));
      var p = new Vi('action', 'action', null, n, i);
      e.push({
        event: p,
        listeners: [
          {
            instance: null,
            listener: function () {
              if (n.defaultPrevented) {
                if (Wl !== 0) {
                  var x = f ? Jm(i, f) : new FormData(i);
                  Mc(l, { pending: !0, data: x, method: i.method, action: s }, null, x);
                }
              } else
                typeof s == 'function' &&
                  (p.preventDefault(),
                  (x = f ? Jm(i, f) : new FormData(i)),
                  Mc(l, { pending: !0, data: x, method: i.method, action: s }, s, x));
            },
            currentTarget: i,
          },
        ],
      });
    }
  }
  for (var oo = 0; oo < Qs.length; oo++) {
    var ro = Qs[oo],
      i0 = ro.toLowerCase(),
      u0 = ro[0].toUpperCase() + ro.slice(1);
    Zt(i0, 'on' + u0);
  }
  (Zt(Af, 'onAnimationEnd'),
    Zt(Cf, 'onAnimationIteration'),
    Zt(Mf, 'onAnimationStart'),
    Zt('dblclick', 'onDoubleClick'),
    Zt('focusin', 'onFocus'),
    Zt('focusout', 'onBlur'),
    Zt(xg, 'onTransitionRun'),
    Zt(Eg, 'onTransitionStart'),
    Zt(Tg, 'onTransitionCancel'),
    Zt(kf, 'onTransitionEnd'),
    zn('onMouseEnter', ['mouseout', 'mouseover']),
    zn('onMouseLeave', ['mouseout', 'mouseover']),
    zn('onPointerEnter', ['pointerout', 'pointerover']),
    zn('onPointerLeave', ['pointerout', 'pointerover']),
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
  var si =
      'abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting'.split(
        ' '
      ),
    s0 = new Set(
      'beforetoggle cancel close invalid load scroll scrollend toggle'.split(' ').concat(si)
    );
  function Im(e, t) {
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
            } catch (q) {
              Ki(q);
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
            } catch (q) {
              Ki(q);
            }
            ((i.currentTarget = null), (s = x));
          }
      }
    }
  }
  function ge(e, t) {
    var l = t[Es];
    l === void 0 && (l = t[Es] = new Set());
    var n = e + '__bubble';
    l.has(n) || (Wm(t, e, 2, !1), l.add(n));
  }
  function fo(e, t, l) {
    var n = 0;
    (t && (n |= 4), Wm(l, e, n, t));
  }
  var Du = '_reactListening' + Math.random().toString(36).slice(2);
  function mo(e) {
    if (!e[Du]) {
      ((e[Du] = !0),
        Xr.forEach(function (l) {
          l !== 'selectionchange' && (s0.has(l) || fo(l, !1, e), fo(l, !0, e));
        }));
      var t = e.nodeType === 9 ? e : e.ownerDocument;
      t === null || t[Du] || ((t[Du] = !0), fo('selectionchange', !1, t));
    }
  }
  function Wm(e, t, l, n) {
    switch (Ah(t)) {
      case 2:
        var i = w0;
        break;
      case 8:
        i = B0;
        break;
      default:
        i = Mo;
    }
    ((l = i.bind(null, t, l, e)),
      (i = void 0),
      !Os || (t !== 'touchstart' && t !== 'touchmove' && t !== 'wheel') || (i = !0),
      n
        ? i !== void 0
          ? e.addEventListener(t, l, { capture: !0, passive: i })
          : e.addEventListener(t, l, !0)
        : i !== void 0
          ? e.addEventListener(t, l, { passive: i })
          : e.addEventListener(t, l, !1));
  }
  function ho(e, t, l, n, i) {
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
    tf(function () {
      var j = s,
        q = Rs(l),
        V = [];
      e: {
        var O = Rf.get(e);
        if (O !== void 0) {
          var w = Vi,
            ee = e;
          switch (e) {
            case 'keypress':
              if (Yi(l) === 0) break e;
            case 'keydown':
            case 'keyup':
              w = eg;
              break;
            case 'focusin':
              ((ee = 'focus'), (w = Bs));
              break;
            case 'focusout':
              ((ee = 'blur'), (w = Bs));
              break;
            case 'beforeblur':
            case 'afterblur':
              w = Bs;
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
              w = af;
              break;
            case 'drag':
            case 'dragend':
            case 'dragenter':
            case 'dragexit':
            case 'dragleave':
            case 'dragover':
            case 'dragstart':
            case 'drop':
              w = Yy;
              break;
            case 'touchcancel':
            case 'touchend':
            case 'touchmove':
            case 'touchstart':
              w = ng;
              break;
            case Af:
            case Cf:
            case Mf:
              w = Qy;
              break;
            case kf:
              w = ig;
              break;
            case 'scroll':
            case 'scrollend':
              w = qy;
              break;
            case 'wheel':
              w = sg;
              break;
            case 'copy':
            case 'cut':
            case 'paste':
              w = Ky;
              break;
            case 'gotpointercapture':
            case 'lostpointercapture':
            case 'pointercancel':
            case 'pointerdown':
            case 'pointermove':
            case 'pointerout':
            case 'pointerover':
            case 'pointerup':
              w = sf;
              break;
            case 'toggle':
            case 'beforetoggle':
              w = og;
          }
          var ue = (t & 4) !== 0,
            Be = !ue && (e === 'scroll' || e === 'scrollend'),
            M = ue ? (O !== null ? O + 'Capture' : null) : O;
          ue = [];
          for (var T = j, R; T !== null; ) {
            var X = T;
            if (
              ((R = X.stateNode),
              (X = X.tag),
              (X !== 5 && X !== 26 && X !== 27) ||
                R === null ||
                M === null ||
                ((X = ka(T, M)), X != null && ue.push(ci(T, X, R))),
              Be)
            )
              break;
            T = T.return;
          }
          0 < ue.length && ((O = new w(O, ee, null, l, q)), V.push({ event: O, listeners: ue }));
        }
      }
      if ((t & 7) === 0) {
        e: {
          if (
            ((O = e === 'mouseover' || e === 'pointerover'),
            (w = e === 'mouseout' || e === 'pointerout'),
            O && l !== ks && (ee = l.relatedTarget || l.fromElement) && (jn(ee) || ee[Rn]))
          )
            break e;
          if (
            (w || O) &&
            ((O =
              q.window === q
                ? q
                : (O = q.ownerDocument)
                  ? O.defaultView || O.parentWindow
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
              ((ue = af),
              (X = 'onMouseLeave'),
              (M = 'onMouseEnter'),
              (T = 'mouse'),
              (e === 'pointerout' || e === 'pointerover') &&
                ((ue = sf), (X = 'onPointerLeave'), (M = 'onPointerEnter'), (T = 'pointer')),
              (Be = w == null ? O : Ma(w)),
              (R = ee == null ? O : Ma(ee)),
              (O = new ue(X, T + 'leave', w, l, q)),
              (O.target = Be),
              (O.relatedTarget = R),
              (X = null),
              jn(q) === j &&
                ((ue = new ue(M, T + 'enter', ee, l, q)),
                (ue.target = R),
                (ue.relatedTarget = Be),
                (X = ue)),
              (Be = X),
              w && ee)
            )
              t: {
                for (ue = c0, M = w, T = ee, R = 0, X = M; X; X = ue(X)) R++;
                X = 0;
                for (var ne = T; ne; ne = ue(ne)) X++;
                for (; 0 < R - X; ) ((M = ue(M)), R--);
                for (; 0 < X - R; ) ((T = ue(T)), X--);
                for (; R--; ) {
                  if (M === T || (T !== null && M === T.alternate)) {
                    ue = M;
                    break t;
                  }
                  ((M = ue(M)), (T = ue(T)));
                }
                ue = null;
              }
            else ue = null;
            (w !== null && Fm(V, O, w, ue, !1),
              ee !== null && Be !== null && Fm(V, Be, ee, ue, !0));
          }
        }
        e: {
          if (
            ((O = j ? Ma(j) : window),
            (w = O.nodeName && O.nodeName.toLowerCase()),
            w === 'select' || (w === 'input' && O.type === 'file'))
          )
            var Te = pf;
          else if (mf(O))
            if (yf) Te = _g;
            else {
              Te = gg;
              var te = yg;
            }
          else
            ((w = O.nodeName),
              !w || w.toLowerCase() !== 'input' || (O.type !== 'checkbox' && O.type !== 'radio')
                ? j && Ms(j.elementType) && (Te = pf)
                : (Te = vg));
          if (Te && (Te = Te(e, j))) {
            hf(V, Te, l, q);
            break e;
          }
          (te && te(e, O, j),
            e === 'focusout' &&
              j &&
              O.type === 'number' &&
              j.memoizedProps.value != null &&
              Cs(O, 'number', O.value));
        }
        switch (((te = j ? Ma(j) : window), e)) {
          case 'focusin':
            (mf(te) || te.contentEditable === 'true') && ((qn = te), (Ys = j), (Ua = null));
            break;
          case 'focusout':
            Ua = Ys = qn = null;
            break;
          case 'mousedown':
            Xs = !0;
            break;
          case 'contextmenu':
          case 'mouseup':
          case 'dragend':
            ((Xs = !1), Tf(V, l, q));
            break;
          case 'selectionchange':
            if (Sg) break;
          case 'keydown':
          case 'keyup':
            Tf(V, l, q);
        }
        var he;
        if (Ls)
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
          Hn
            ? ff(e, l) && (_e = 'onCompositionEnd')
            : e === 'keydown' && l.keyCode === 229 && (_e = 'onCompositionStart');
        (_e &&
          (cf &&
            l.locale !== 'ko' &&
            (Hn || _e !== 'onCompositionStart'
              ? _e === 'onCompositionEnd' && Hn && (he = lf())
              : ((wl = q), (Ds = 'value' in wl ? wl.value : wl.textContent), (Hn = !0))),
          (te = zu(j, _e)),
          0 < te.length &&
            ((_e = new uf(_e, e, null, l, q)),
            V.push({ event: _e, listeners: te }),
            he ? (_e.data = he) : ((he = df(l)), he !== null && (_e.data = he)))),
          (he = fg ? dg(e, l) : mg(e, l)) &&
            ((_e = zu(j, 'onBeforeInput')),
            0 < _e.length &&
              ((te = new uf('onBeforeInput', 'beforeinput', null, l, q)),
              V.push({ event: te, listeners: _e }),
              (te.data = he))),
          a0(V, e, j, l, q));
      }
      Im(V, t);
    });
  }
  function ci(e, t, l) {
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
          ((i = ka(e, l)),
          i != null && n.unshift(ci(e, i, s)),
          (i = ka(e, t)),
          i != null && n.push(ci(e, i, s))),
        e.tag === 3)
      )
        return n;
      e = e.return;
    }
    return [];
  }
  function c0(e) {
    if (e === null) return null;
    do e = e.return;
    while (e && e.tag !== 5 && e.tag !== 27);
    return e || null;
  }
  function Fm(e, t, l, n, i) {
    for (var s = t._reactName, f = []; l !== null && l !== n; ) {
      var p = l,
        x = p.alternate,
        j = p.stateNode;
      if (((p = p.tag), x !== null && x === n)) break;
      ((p !== 5 && p !== 26 && p !== 27) ||
        j === null ||
        ((x = j),
        i
          ? ((j = ka(l, s)), j != null && f.unshift(ci(l, j, x)))
          : i || ((j = ka(l, s)), j != null && f.push(ci(l, j, x)))),
        (l = l.return));
    }
    f.length !== 0 && e.push({ event: t, listeners: f });
  }
  var o0 = /\r\n?/g,
    r0 = /\u0000|\uFFFD/g;
  function Pm(e) {
    return (typeof e == 'string' ? e : '' + e)
      .replace(
        o0,
        `
`
      )
      .replace(r0, '');
  }
  function eh(e, t) {
    return ((t = Pm(t)), Pm(e) === t);
  }
  function we(e, t, l, n, i, s) {
    switch (l) {
      case 'children':
        typeof n == 'string'
          ? t === 'body' || (t === 'textarea' && n === '') || Bn(e, n)
          : (typeof n == 'number' || typeof n == 'bigint') && t !== 'body' && Bn(e, '' + n);
        break;
      case 'className':
        Li(e, 'class', n);
        break;
      case 'tabIndex':
        Li(e, 'tabindex', n);
        break;
      case 'dir':
      case 'role':
      case 'viewBox':
      case 'width':
      case 'height':
        Li(e, l, n);
        break;
      case 'style':
        Pr(e, n, s);
        break;
      case 'data':
        if (t !== 'object') {
          Li(e, 'data', n);
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
        ((n = qi('' + n)), e.setAttribute(l, n));
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
        ((n = qi('' + n)), e.setAttribute(l, n));
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
        ((l = qi('' + n)), e.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', l));
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
        (ge('beforetoggle', e), ge('toggle', e), Ui(e, 'popover', n));
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
        Ui(e, 'is', n);
        break;
      case 'innerText':
      case 'textContent':
        break;
      default:
        (!(2 < l.length) || (l[0] !== 'o' && l[0] !== 'O') || (l[1] !== 'n' && l[1] !== 'N')) &&
          ((l = Ly.get(l) || l), Ui(e, l, n));
    }
  }
  function po(e, t, l, n, i, s) {
    switch (l) {
      case 'style':
        Pr(e, n, s);
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
        if (!Vr.hasOwnProperty(l))
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
            l in e ? (e[l] = n) : n === !0 ? e.setAttribute(l, '') : Ui(e, l, n);
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
            var q = l[n];
            if (q != null)
              switch (n) {
                case 'name':
                  i = q;
                  break;
                case 'type':
                  f = q;
                  break;
                case 'checked':
                  x = q;
                  break;
                case 'defaultChecked':
                  j = q;
                  break;
                case 'value':
                  s = q;
                  break;
                case 'defaultValue':
                  p = q;
                  break;
                case 'children':
                case 'dangerouslySetInnerHTML':
                  if (q != null) throw Error(c(137, t));
                  break;
                default:
                  we(e, t, n, q, l, null);
              }
          }
        Jr(e, s, p, x, j, f, i, !1);
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
        Wr(e, n, i, s);
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
        for (n = 0; n < si.length; n++) ge(si[n], e);
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
        if (Ms(t)) {
          for (q in l)
            l.hasOwnProperty(q) && ((n = l[q]), n !== void 0 && po(e, t, q, n, l, void 0));
          return;
        }
    }
    for (p in l) l.hasOwnProperty(p) && ((n = l[p]), n != null && we(e, t, p, n, l, null));
  }
  function f0(e, t, l, n) {
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
          q = null;
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
        for (var O in n) {
          var w = n[O];
          if (((V = l[O]), n.hasOwnProperty(O) && (w != null || V != null)))
            switch (O) {
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
                q = w;
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
                w !== V && we(e, t, O, w, n, V);
            }
        }
        As(e, f, p, x, j, q, s, i);
        return;
      case 'select':
        w = f = p = O = null;
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
                O = s;
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
          O != null
            ? wn(e, !!l, O, !1)
            : !!n != !!l && (t != null ? wn(e, !!l, t, !0) : wn(e, !!l, l ? [] : '', !1)));
        return;
      case 'textarea':
        w = O = null;
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
                O = i;
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
        Ir(e, O, w);
        return;
      case 'option':
        for (var ee in l)
          if (((O = l[ee]), l.hasOwnProperty(ee) && O != null && !n.hasOwnProperty(ee)))
            switch (ee) {
              case 'selected':
                e.selected = !1;
                break;
              default:
                we(e, t, ee, null, n, O);
            }
        for (x in n)
          if (((O = n[x]), (w = l[x]), n.hasOwnProperty(x) && O !== w && (O != null || w != null)))
            switch (x) {
              case 'selected':
                e.selected = O && typeof O != 'function' && typeof O != 'symbol';
                break;
              default:
                we(e, t, x, O, n, w);
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
          ((O = l[ue]),
            l.hasOwnProperty(ue) && O != null && !n.hasOwnProperty(ue) && we(e, t, ue, null, n, O));
        for (j in n)
          if (((O = n[j]), (w = l[j]), n.hasOwnProperty(j) && O !== w && (O != null || w != null)))
            switch (j) {
              case 'children':
              case 'dangerouslySetInnerHTML':
                if (O != null) throw Error(c(137, t));
                break;
              default:
                we(e, t, j, O, n, w);
            }
        return;
      default:
        if (Ms(t)) {
          for (var Be in l)
            ((O = l[Be]),
              l.hasOwnProperty(Be) &&
                O !== void 0 &&
                !n.hasOwnProperty(Be) &&
                po(e, t, Be, void 0, n, O));
          for (q in n)
            ((O = n[q]),
              (w = l[q]),
              !n.hasOwnProperty(q) ||
                O === w ||
                (O === void 0 && w === void 0) ||
                po(e, t, q, O, n, w));
          return;
        }
    }
    for (var M in l)
      ((O = l[M]),
        l.hasOwnProperty(M) && O != null && !n.hasOwnProperty(M) && we(e, t, M, null, n, O));
    for (V in n)
      ((O = n[V]),
        (w = l[V]),
        !n.hasOwnProperty(V) || O === w || (O == null && w == null) || we(e, t, V, O, n, w));
  }
  function th(e) {
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
  function d0() {
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
        if (s && p && th(f)) {
          for (f = 0, p = i.responseEnd, n += 1; n < l.length; n++) {
            var x = l[n],
              j = x.startTime;
            if (j > p) break;
            var q = x.transferSize,
              V = x.initiatorType;
            q && th(V) && ((x = x.responseEnd), (f += q * (x < p ? 1 : (p - j) / (x - j))));
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
  var yo = null,
    go = null;
  function wu(e) {
    return e.nodeType === 9 ? e : e.ownerDocument;
  }
  function lh(e) {
    switch (e) {
      case 'http://www.w3.org/2000/svg':
        return 1;
      case 'http://www.w3.org/1998/Math/MathML':
        return 2;
      default:
        return 0;
    }
  }
  function nh(e, t) {
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
  function vo(e, t) {
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
  var _o = null;
  function m0() {
    var e = window.event;
    return e && e.type === 'popstate' ? (e === _o ? !1 : ((_o = e), !0)) : ((_o = null), !1);
  }
  var ah = typeof setTimeout == 'function' ? setTimeout : void 0,
    h0 = typeof clearTimeout == 'function' ? clearTimeout : void 0,
    ih = typeof Promise == 'function' ? Promise : void 0,
    p0 =
      typeof queueMicrotask == 'function'
        ? queueMicrotask
        : typeof ih < 'u'
          ? function (e) {
              return ih.resolve(null).then(e).catch(y0);
            }
          : ah;
  function y0(e) {
    setTimeout(function () {
      throw e;
    });
  }
  function Fl(e) {
    return e === 'head';
  }
  function uh(e, t) {
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
        else if (l === 'html') oi(e.ownerDocument.documentElement);
        else if (l === 'head') {
          ((l = e.ownerDocument.head), oi(l));
          for (var s = l.firstChild; s; ) {
            var f = s.nextSibling,
              p = s.nodeName;
            (s[Ca] ||
              p === 'SCRIPT' ||
              p === 'STYLE' ||
              (p === 'LINK' && s.rel.toLowerCase() === 'stylesheet') ||
              l.removeChild(s),
              (s = f));
          }
        } else l === 'body' && oi(e.ownerDocument.body);
      l = i;
    } while (l);
    ma(t);
  }
  function sh(e, t) {
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
  function bo(e) {
    var t = e.firstChild;
    for (t && t.nodeType === 10 && (t = t.nextSibling); t; ) {
      var l = t;
      switch (((t = t.nextSibling), l.nodeName)) {
        case 'HTML':
        case 'HEAD':
        case 'BODY':
          (bo(l), Ts(l));
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
  function g0(e, t, l, n) {
    for (; e.nodeType === 1; ) {
      var i = l;
      if (e.nodeName.toLowerCase() !== t.toLowerCase()) {
        if (!n && (e.nodeName !== 'INPUT' || e.type !== 'hidden')) break;
      } else if (n) {
        if (!e[Ca])
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
  function v0(e, t, l) {
    if (t === '') return null;
    for (; e.nodeType !== 3; )
      if (
        ((e.nodeType !== 1 || e.nodeName !== 'INPUT' || e.type !== 'hidden') && !l) ||
        ((e = Vt(e.nextSibling)), e === null)
      )
        return null;
    return e;
  }
  function ch(e, t) {
    for (; e.nodeType !== 8; )
      if (
        ((e.nodeType !== 1 || e.nodeName !== 'INPUT' || e.type !== 'hidden') && !t) ||
        ((e = Vt(e.nextSibling)), e === null)
      )
        return null;
    return e;
  }
  function So(e) {
    return e.data === '$?' || e.data === '$~';
  }
  function xo(e) {
    return e.data === '$!' || (e.data === '$?' && e.ownerDocument.readyState !== 'loading');
  }
  function _0(e, t) {
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
  var Eo = null;
  function oh(e) {
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
  function rh(e) {
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
  function fh(e, t, l) {
    switch (((t = wu(l)), e)) {
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
  function oi(e) {
    for (var t = e.attributes; t.length; ) e.removeAttributeNode(t[0]);
    Ts(e);
  }
  var Qt = new Map(),
    dh = new Set();
  function Bu(e) {
    return typeof e.getRootNode == 'function'
      ? e.getRootNode()
      : e.nodeType === 9
        ? e
        : e.ownerDocument;
  }
  var El = J.d;
  J.d = { f: b0, r: S0, D: x0, C: E0, L: T0, m: N0, X: C0, S: A0, M: M0 };
  function b0() {
    var e = El.f(),
      t = Cu();
    return e || t;
  }
  function S0(e) {
    var t = On(e);
    t !== null && t.tag === 5 && t.type === 'form' ? kd(t) : El.r(e);
  }
  var ra = typeof document > 'u' ? null : document;
  function mh(e, t, l) {
    var n = ra;
    if (n && typeof t == 'string' && t) {
      var i = Ut(t);
      ((i = 'link[rel="' + e + '"][href="' + i + '"]'),
        typeof l == 'string' && (i += '[crossorigin="' + l + '"]'),
        dh.has(i) ||
          (dh.add(i),
          (e = { rel: e, crossOrigin: l, href: t }),
          n.querySelector(i) === null &&
            ((t = n.createElement('link')), ot(t, 'link', e), lt(t), n.head.appendChild(t))));
    }
  }
  function x0(e) {
    (El.D(e), mh('dns-prefetch', e, null));
  }
  function E0(e, t) {
    (El.C(e, t), mh('preconnect', e, t));
  }
  function T0(e, t, l) {
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
          (t === 'style' && n.querySelector(ri(s))) ||
          (t === 'script' && n.querySelector(fi(s))) ||
          ((t = n.createElement('link')), ot(t, 'link', e), lt(t), n.head.appendChild(t)));
    }
  }
  function N0(e, t) {
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
            if (l.querySelector(fi(s))) return;
        }
        ((n = l.createElement('link')), ot(n, 'link', e), lt(n), l.head.appendChild(n));
      }
    }
  }
  function A0(e, t, l) {
    El.S(e, t, l);
    var n = ra;
    if (n && e) {
      var i = Dn(n).hoistableStyles,
        s = fa(e);
      t = t || 'default';
      var f = i.get(s);
      if (!f) {
        var p = { loading: 0, preload: null };
        if ((f = n.querySelector(ri(s)))) p.loading = 5;
        else {
          ((e = S({ rel: 'stylesheet', href: e, 'data-precedence': t }, l)),
            (l = Qt.get(s)) && To(e, l));
          var x = (f = n.createElement('link'));
          (lt(x),
            ot(x, 'link', e),
            (x._p = new Promise(function (j, q) {
              ((x.onload = j), (x.onerror = q));
            })),
            x.addEventListener('load', function () {
              p.loading |= 1;
            }),
            x.addEventListener('error', function () {
              p.loading |= 2;
            }),
            (p.loading |= 4),
            Uu(f, t, n));
        }
        ((f = { type: 'stylesheet', instance: f, count: 1, state: p }), i.set(s, f));
      }
    }
  }
  function C0(e, t) {
    El.X(e, t);
    var l = ra;
    if (l && e) {
      var n = Dn(l).hoistableScripts,
        i = da(e),
        s = n.get(i);
      s ||
        ((s = l.querySelector(fi(i))),
        s ||
          ((e = S({ src: e, async: !0 }, t)),
          (t = Qt.get(i)) && No(e, t),
          (s = l.createElement('script')),
          lt(s),
          ot(s, 'link', e),
          l.head.appendChild(s)),
        (s = { type: 'script', instance: s, count: 1, state: null }),
        n.set(i, s));
    }
  }
  function M0(e, t) {
    El.M(e, t);
    var l = ra;
    if (l && e) {
      var n = Dn(l).hoistableScripts,
        i = da(e),
        s = n.get(i);
      s ||
        ((s = l.querySelector(fi(i))),
        s ||
          ((e = S({ src: e, async: !0, type: 'module' }, t)),
          (t = Qt.get(i)) && No(e, t),
          (s = l.createElement('script')),
          lt(s),
          ot(s, 'link', e),
          l.head.appendChild(s)),
        (s = { type: 'script', instance: s, count: 1, state: null }),
        n.set(i, s));
    }
  }
  function hh(e, t, l, n) {
    var i = (i = pe.current) ? Bu(i) : null;
    if (!i) throw Error(c(446));
    switch (e) {
      case 'meta':
      case 'title':
        return null;
      case 'style':
        return typeof l.precedence == 'string' && typeof l.href == 'string'
          ? ((t = fa(l.href)),
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
          e = fa(l.href);
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
              (s = i.querySelector(ri(e))) && !s._p && ((f.instance = s), (f.state.loading = 5)),
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
                s || k0(i, e, l, f.state))),
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
  function fa(e) {
    return 'href="' + Ut(e) + '"';
  }
  function ri(e) {
    return 'link[rel="stylesheet"][' + e + ']';
  }
  function ph(e) {
    return S({}, e, { 'data-precedence': e.precedence, precedence: null });
  }
  function k0(e, t, l, n) {
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
  function fi(e) {
    return 'script[async]' + e;
  }
  function yh(e, t, l) {
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
            Uu(n, l.precedence, e),
            (t.instance = n)
          );
        case 'stylesheet':
          i = fa(l.href);
          var s = e.querySelector(ri(i));
          if (s) return ((t.state.loading |= 4), (t.instance = s), lt(s), s);
          ((n = ph(l)),
            (i = Qt.get(i)) && To(n, i),
            (s = (e.ownerDocument || e).createElement('link')),
            lt(s));
          var f = s;
          return (
            (f._p = new Promise(function (p, x) {
              ((f.onload = p), (f.onerror = x));
            })),
            ot(s, 'link', n),
            (t.state.loading |= 4),
            Uu(s, l.precedence, e),
            (t.instance = s)
          );
        case 'script':
          return (
            (s = da(l.src)),
            (i = e.querySelector(fi(s)))
              ? ((t.instance = i), lt(i), i)
              : ((n = l),
                (i = Qt.get(s)) && ((n = S({}, l)), No(n, i)),
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
        ((n = t.instance), (t.state.loading |= 4), Uu(n, l.precedence, e));
    return t.instance;
  }
  function Uu(e, t, l) {
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
  function To(e, t) {
    (e.crossOrigin == null && (e.crossOrigin = t.crossOrigin),
      e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy),
      e.title == null && (e.title = t.title));
  }
  function No(e, t) {
    (e.crossOrigin == null && (e.crossOrigin = t.crossOrigin),
      e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy),
      e.integrity == null && (e.integrity = t.integrity));
  }
  var Lu = null;
  function gh(e, t, l) {
    if (Lu === null) {
      var n = new Map(),
        i = (Lu = new Map());
      i.set(l, n);
    } else ((i = Lu), (n = i.get(l)), n || ((n = new Map()), i.set(l, n)));
    if (n.has(e)) return n;
    for (n.set(e, null), l = l.getElementsByTagName(e), i = 0; i < l.length; i++) {
      var s = l[i];
      if (
        !(s[Ca] || s[it] || (e === 'link' && s.getAttribute('rel') === 'stylesheet')) &&
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
  function vh(e, t, l) {
    ((e = e.ownerDocument || e),
      e.head.insertBefore(l, t === 'title' ? e.querySelector('head > title') : null));
  }
  function R0(e, t, l) {
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
  function _h(e) {
    return !(e.type === 'stylesheet' && (e.state.loading & 3) === 0);
  }
  function j0(e, t, l, n) {
    if (
      l.type === 'stylesheet' &&
      (typeof n.media != 'string' || matchMedia(n.media).matches !== !1) &&
      (l.state.loading & 4) === 0
    ) {
      if (l.instance === null) {
        var i = fa(n.href),
          s = t.querySelector(ri(i));
        if (s) {
          ((t = s._p),
            t !== null &&
              typeof t == 'object' &&
              typeof t.then == 'function' &&
              (e.count++, (e = Hu.bind(e)), t.then(e, e)),
            (l.state.loading |= 4),
            (l.instance = s),
            lt(s));
          return;
        }
        ((s = t.ownerDocument || t),
          (n = ph(n)),
          (i = Qt.get(i)) && To(n, i),
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
          (l = Hu.bind(e)),
          t.addEventListener('load', l),
          t.addEventListener('error', l)));
    }
  }
  var Ao = 0;
  function O0(e, t) {
    return (
      e.stylesheets && e.count === 0 && Gu(e, e.stylesheets),
      0 < e.count || 0 < e.imgCount
        ? function (l) {
            var n = setTimeout(function () {
              if ((e.stylesheets && Gu(e, e.stylesheets), e.unsuspend)) {
                var s = e.unsuspend;
                ((e.unsuspend = null), s());
              }
            }, 6e4 + t);
            0 < e.imgBytes && Ao === 0 && (Ao = 62500 * d0());
            var i = setTimeout(
              function () {
                if (
                  ((e.waitingForImages = !1),
                  e.count === 0 && (e.stylesheets && Gu(e, e.stylesheets), e.unsuspend))
                ) {
                  var s = e.unsuspend;
                  ((e.unsuspend = null), s());
                }
              },
              (e.imgBytes > Ao ? 50 : 800) + t
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
  function Hu() {
    if ((this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages))) {
      if (this.stylesheets) Gu(this, this.stylesheets);
      else if (this.unsuspend) {
        var e = this.unsuspend;
        ((this.unsuspend = null), e());
      }
    }
  }
  var qu = null;
  function Gu(e, t) {
    ((e.stylesheets = null),
      e.unsuspend !== null &&
        (e.count++, (qu = new Map()), t.forEach(D0, e), (qu = null), Hu.call(e)));
  }
  function D0(e, t) {
    if (!(t.state.loading & 4)) {
      var l = qu.get(e);
      if (l) var n = l.get(null);
      else {
        ((l = new Map()), qu.set(e, l));
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
        (n = Hu.bind(this)),
        i.addEventListener('load', n),
        i.addEventListener('error', n),
        s
          ? s.parentNode.insertBefore(i, s.nextSibling)
          : ((e = e.nodeType === 9 ? e.head : e), e.insertBefore(i, e.firstChild)),
        (t.state.loading |= 4));
    }
  }
  var di = {
    $$typeof: Q,
    Provider: null,
    Consumer: null,
    _currentValue: ie,
    _currentValue2: ie,
    _threadCount: 0,
  };
  function z0(e, t, l, n, i, s, f, p, x) {
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
      (this.expirationTimes = bs(-1)),
      (this.entangledLanes =
        this.shellSuspendCounter =
        this.errorRecoveryDisabledLanes =
        this.expiredLanes =
        this.warmLanes =
        this.pingedLanes =
        this.suspendedLanes =
        this.pendingLanes =
          0),
      (this.entanglements = bs(0)),
      (this.hiddenUpdates = bs(null)),
      (this.identifierPrefix = n),
      (this.onUncaughtError = i),
      (this.onCaughtError = s),
      (this.onRecoverableError = f),
      (this.pooledCache = null),
      (this.pooledCacheLanes = 0),
      (this.formState = x),
      (this.incompleteTransitions = new Map()));
  }
  function bh(e, t, l, n, i, s, f, p, x, j, q, V) {
    return (
      (e = new z0(e, t, l, f, x, j, q, V, p)),
      (t = 1),
      s === !0 && (t |= 24),
      (s = Mt(3, null, null, t)),
      (e.current = s),
      (s.stateNode = e),
      (t = ac()),
      t.refCount++,
      (e.pooledCache = t),
      t.refCount++,
      (s.memoizedState = { element: n, isDehydrated: l, cache: t }),
      cc(s),
      e
    );
  }
  function Sh(e) {
    return e ? ((e = Xn), e) : Xn;
  }
  function xh(e, t, l, n, i, s) {
    ((i = Sh(i)),
      n.context === null ? (n.context = i) : (n.pendingContext = i),
      (n = Gl(t)),
      (n.payload = { element: l }),
      (s = s === void 0 ? null : s),
      s !== null && (n.callback = s),
      (l = Yl(e, n, t)),
      l !== null && (Et(l, e, t), Va(l, e, t)));
  }
  function Eh(e, t) {
    if (((e = e.memoizedState), e !== null && e.dehydrated !== null)) {
      var l = e.retryLane;
      e.retryLane = l !== 0 && l < t ? l : t;
    }
  }
  function Co(e, t) {
    (Eh(e, t), (e = e.alternate) && Eh(e, t));
  }
  function Th(e) {
    if (e.tag === 13 || e.tag === 31) {
      var t = hn(e, 67108864);
      (t !== null && Et(t, e, 67108864), Co(e, 67108864));
    }
  }
  function Nh(e) {
    if (e.tag === 13 || e.tag === 31) {
      var t = Dt();
      t = Ss(t);
      var l = hn(e, t);
      (l !== null && Et(l, e, t), Co(e, t));
    }
  }
  var Yu = !0;
  function w0(e, t, l, n) {
    var i = H.T;
    H.T = null;
    var s = J.p;
    try {
      ((J.p = 2), Mo(e, t, l, n));
    } finally {
      ((J.p = s), (H.T = i));
    }
  }
  function B0(e, t, l, n) {
    var i = H.T;
    H.T = null;
    var s = J.p;
    try {
      ((J.p = 8), Mo(e, t, l, n));
    } finally {
      ((J.p = s), (H.T = i));
    }
  }
  function Mo(e, t, l, n) {
    if (Yu) {
      var i = ko(n);
      if (i === null) (ho(e, t, n, Xu, l), Ch(e, n));
      else if (L0(i, e, t, l, n)) n.stopPropagation();
      else if ((Ch(e, n), t & 4 && -1 < U0.indexOf(e))) {
        for (; i !== null; ) {
          var s = On(i);
          if (s !== null)
            switch (s.tag) {
              case 3:
                if (((s = s.stateNode), s.current.memoizedState.isDehydrated)) {
                  var f = on(s.pendingLanes);
                  if (f !== 0) {
                    var p = s;
                    for (p.pendingLanes |= 2, p.entangledLanes |= 2; f; ) {
                      var x = 1 << (31 - At(f));
                      ((p.entanglements[1] |= x), (f &= ~x));
                    }
                    (nl(s), (Ce & 6) === 0 && ((Nu = Tt() + 500), ui(0)));
                  }
                }
                break;
              case 31:
              case 13:
                ((p = hn(s, 2)), p !== null && Et(p, s, 2), Cu(), Co(s, 2));
            }
          if (((s = ko(n)), s === null && ho(e, t, n, Xu, l), s === i)) break;
          i = s;
        }
        i !== null && n.stopPropagation();
      } else ho(e, t, n, null, l);
    }
  }
  function ko(e) {
    return ((e = Rs(e)), Ro(e));
  }
  var Xu = null;
  function Ro(e) {
    if (((Xu = null), (e = jn(e)), e !== null)) {
      var t = d(e);
      if (t === null) e = null;
      else {
        var l = t.tag;
        if (l === 13) {
          if (((e = h(t)), e !== null)) return e;
          e = null;
        } else if (l === 31) {
          if (((e = b(t)), e !== null)) return e;
          e = null;
        } else if (l === 3) {
          if (t.stateNode.current.memoizedState.isDehydrated)
            return t.tag === 3 ? t.stateNode.containerInfo : null;
          e = null;
        } else t !== e && (e = null);
      }
    }
    return ((Xu = e), null);
  }
  function Ah(e) {
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
        switch (xy()) {
          case Dr:
            return 2;
          case zr:
            return 8;
          case Oi:
          case Ey:
            return 32;
          case wr:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var jo = !1,
    Pl = null,
    en = null,
    tn = null,
    mi = new Map(),
    hi = new Map(),
    ln = [],
    U0 =
      'mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset'.split(
        ' '
      );
  function Ch(e, t) {
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
        mi.delete(t.pointerId);
        break;
      case 'gotpointercapture':
      case 'lostpointercapture':
        hi.delete(t.pointerId);
    }
  }
  function pi(e, t, l, n, i, s) {
    return e === null || e.nativeEvent !== s
      ? ((e = {
          blockedOn: t,
          domEventName: l,
          eventSystemFlags: n,
          nativeEvent: s,
          targetContainers: [i],
        }),
        t !== null && ((t = On(t)), t !== null && Th(t)),
        e)
      : ((e.eventSystemFlags |= n),
        (t = e.targetContainers),
        i !== null && t.indexOf(i) === -1 && t.push(i),
        e);
  }
  function L0(e, t, l, n, i) {
    switch (t) {
      case 'focusin':
        return ((Pl = pi(Pl, e, t, l, n, i)), !0);
      case 'dragenter':
        return ((en = pi(en, e, t, l, n, i)), !0);
      case 'mouseover':
        return ((tn = pi(tn, e, t, l, n, i)), !0);
      case 'pointerover':
        var s = i.pointerId;
        return (mi.set(s, pi(mi.get(s) || null, e, t, l, n, i)), !0);
      case 'gotpointercapture':
        return ((s = i.pointerId), hi.set(s, pi(hi.get(s) || null, e, t, l, n, i)), !0);
    }
    return !1;
  }
  function Mh(e) {
    var t = jn(e.target);
    if (t !== null) {
      var l = d(t);
      if (l !== null) {
        if (((t = l.tag), t === 13)) {
          if (((t = h(l)), t !== null)) {
            ((e.blockedOn = t),
              Gr(e.priority, function () {
                Nh(l);
              }));
            return;
          }
        } else if (t === 31) {
          if (((t = b(l)), t !== null)) {
            ((e.blockedOn = t),
              Gr(e.priority, function () {
                Nh(l);
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
  function Vu(e) {
    if (e.blockedOn !== null) return !1;
    for (var t = e.targetContainers; 0 < t.length; ) {
      var l = ko(e.nativeEvent);
      if (l === null) {
        l = e.nativeEvent;
        var n = new l.constructor(l.type, l);
        ((ks = n), l.target.dispatchEvent(n), (ks = null));
      } else return ((t = On(l)), t !== null && Th(t), (e.blockedOn = l), !1);
      t.shift();
    }
    return !0;
  }
  function kh(e, t, l) {
    Vu(e) && l.delete(t);
  }
  function H0() {
    ((jo = !1),
      Pl !== null && Vu(Pl) && (Pl = null),
      en !== null && Vu(en) && (en = null),
      tn !== null && Vu(tn) && (tn = null),
      mi.forEach(kh),
      hi.forEach(kh));
  }
  function Qu(e, t) {
    e.blockedOn === t &&
      ((e.blockedOn = null),
      jo || ((jo = !0), a.unstable_scheduleCallback(a.unstable_NormalPriority, H0)));
  }
  var $u = null;
  function Rh(e) {
    $u !== e &&
      (($u = e),
      a.unstable_scheduleCallback(a.unstable_NormalPriority, function () {
        $u === e && ($u = null);
        for (var t = 0; t < e.length; t += 3) {
          var l = e[t],
            n = e[t + 1],
            i = e[t + 2];
          if (typeof n != 'function') {
            if (Ro(n || l) === null) continue;
            break;
          }
          var s = On(l);
          s !== null &&
            (e.splice(t, 3),
            (t -= 3),
            Mc(s, { pending: !0, data: i, method: l.method, action: n }, n, i));
        }
      }));
  }
  function ma(e) {
    function t(x) {
      return Qu(x, e);
    }
    (Pl !== null && Qu(Pl, e),
      en !== null && Qu(en, e),
      tn !== null && Qu(tn, e),
      mi.forEach(t),
      hi.forEach(t));
    for (var l = 0; l < ln.length; l++) {
      var n = ln[l];
      n.blockedOn === e && (n.blockedOn = null);
    }
    for (; 0 < ln.length && ((l = ln[0]), l.blockedOn === null); )
      (Mh(l), l.blockedOn === null && ln.shift());
    if (((l = (e.ownerDocument || e).$$reactFormReplay), l != null))
      for (n = 0; n < l.length; n += 3) {
        var i = l[n],
          s = l[n + 1],
          f = i[gt] || null;
        if (typeof s == 'function') f || Rh(l);
        else if (f) {
          var p = null;
          if (s && s.hasAttribute('formAction')) {
            if (((i = s), (f = s[gt] || null))) p = f.formAction;
            else if (Ro(i) !== null) continue;
          } else p = f.action;
          (typeof p == 'function' ? (l[n + 1] = p) : (l.splice(n, 3), (n -= 3)), Rh(l));
        }
      }
  }
  function jh() {
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
  function Oo(e) {
    this._internalRoot = e;
  }
  ((Ku.prototype.render = Oo.prototype.render =
    function (e) {
      var t = this._internalRoot;
      if (t === null) throw Error(c(409));
      var l = t.current,
        n = Dt();
      xh(l, n, e, t, null, null);
    }),
    (Ku.prototype.unmount = Oo.prototype.unmount =
      function () {
        var e = this._internalRoot;
        if (e !== null) {
          this._internalRoot = null;
          var t = e.containerInfo;
          (xh(e.current, 2, null, e, null, null), Cu(), (t[Rn] = null));
        }
      }));
  function Ku(e) {
    this._internalRoot = e;
  }
  Ku.prototype.unstable_scheduleHydration = function (e) {
    if (e) {
      var t = qr();
      e = { blockedOn: null, target: e, priority: t };
      for (var l = 0; l < ln.length && t !== 0 && t < ln[l].priority; l++);
      (ln.splice(l, 0, e), l === 0 && Mh(e));
    }
  };
  var Oh = u.version;
  if (Oh !== '19.2.5') throw Error(c(527, Oh, '19.2.5'));
  J.findDOMNode = function (e) {
    var t = e._reactInternals;
    if (t === void 0)
      throw typeof e.render == 'function'
        ? Error(c(188))
        : ((e = Object.keys(e).join(',')), Error(c(268, e)));
    return ((e = m(t)), (e = e !== null ? _(e) : null), (e = e === null ? null : e.stateNode), e);
  };
  var q0 = {
    bundleType: 0,
    version: '19.2.5',
    rendererPackageName: 'react-dom',
    currentDispatcherRef: H,
    reconcilerVersion: '19.2.5',
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < 'u') {
    var Zu = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Zu.isDisabled && Zu.supportsFiber)
      try {
        ((Ta = Zu.inject(q0)), (Nt = Zu));
      } catch {}
  }
  return (
    (gi.createRoot = function (e, t) {
      if (!r(e)) throw Error(c(299));
      var l = !1,
        n = '',
        i = Hd,
        s = qd,
        f = Gd;
      return (
        t != null &&
          (t.unstable_strictMode === !0 && (l = !0),
          t.identifierPrefix !== void 0 && (n = t.identifierPrefix),
          t.onUncaughtError !== void 0 && (i = t.onUncaughtError),
          t.onCaughtError !== void 0 && (s = t.onCaughtError),
          t.onRecoverableError !== void 0 && (f = t.onRecoverableError)),
        (t = bh(e, 1, !1, null, null, l, n, null, i, s, f, jh)),
        (e[Rn] = t.current),
        mo(e),
        new Oo(t)
      );
    }),
    (gi.hydrateRoot = function (e, t, l) {
      if (!r(e)) throw Error(c(299));
      var n = !1,
        i = '',
        s = Hd,
        f = qd,
        p = Gd,
        x = null;
      return (
        l != null &&
          (l.unstable_strictMode === !0 && (n = !0),
          l.identifierPrefix !== void 0 && (i = l.identifierPrefix),
          l.onUncaughtError !== void 0 && (s = l.onUncaughtError),
          l.onCaughtError !== void 0 && (f = l.onCaughtError),
          l.onRecoverableError !== void 0 && (p = l.onRecoverableError),
          l.formState !== void 0 && (x = l.formState)),
        (t = bh(e, 1, !0, t, l ?? null, n, i, x, s, f, p, jh)),
        (t.context = Sh(null)),
        (l = t.current),
        (n = Dt()),
        (n = Ss(n)),
        (i = Gl(n)),
        (i.callback = null),
        Yl(l, i, n),
        (l = n),
        (t.current.lanes = l),
        Aa(t, l),
        nl(t),
        (e[Rn] = t.current),
        mo(e),
        new Ku(t)
      );
    }),
    (gi.version = '19.2.5'),
    gi
  );
}
var Yh;
function F0() {
  if (Yh) return wo.exports;
  Yh = 1;
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
  return (a(), (wo.exports = W0()), wo.exports);
}
var P0 = F0(),
  A = fr();
/**
 * react-router v7.14.2
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */ var Xh = 'popstate';
function Vh(a) {
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
function ev(a = {}) {
  function u(c, r) {
    var m;
    let d = (m = r.state) == null ? void 0 : m.masked,
      { pathname: h, search: b, hash: v } = d || c.location;
    return Po(
      '',
      { pathname: h, search: b, hash: v },
      (r.state && r.state.usr) || null,
      (r.state && r.state.key) || 'default',
      d
        ? { pathname: c.location.pathname, search: c.location.search, hash: c.location.hash }
        : void 0
    );
  }
  function o(c, r) {
    return typeof r == 'string' ? r : Ni(r);
  }
  return lv(u, o, null, a);
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
function tv() {
  return Math.random().toString(36).substring(2, 10);
}
function Qh(a, u) {
  return {
    usr: a.state,
    key: a.key,
    idx: u,
    masked: a.unstable_mask ? { pathname: a.pathname, search: a.search, hash: a.hash } : void 0,
  };
}
function Po(a, u, o = null, c, r) {
  return {
    pathname: typeof a == 'string' ? a : a.pathname,
    search: '',
    hash: '',
    ...(typeof u == 'string' ? _a(u) : u),
    state: o,
    key: (u && u.key) || c || tv(),
    unstable_mask: r,
  };
}
function Ni({ pathname: a = '/', search: u = '', hash: o = '' }) {
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
function lv(a, u, o, c = {}) {
  let { window: r = document.defaultView, v5Compat: d = !1 } = c,
    h = r.history,
    b = 'POP',
    v = null,
    m = _();
  m == null && ((m = 0), h.replaceState({ ...h.state, idx: m }, ''));
  function _() {
    return (h.state || { idx: null }).idx;
  }
  function S() {
    b = 'POP';
    let E = _(),
      U = E == null ? null : E - m;
    ((m = E), v && v({ action: b, location: C.location, delta: U }));
  }
  function k(E, U) {
    b = 'PUSH';
    let K = Vh(E) ? E : Po(C.location, E, U);
    m = _() + 1;
    let Q = Qh(K, m),
      D = C.createHref(K.unstable_mask || K);
    try {
      h.pushState(Q, '', D);
    } catch (L) {
      if (L instanceof DOMException && L.name === 'DataCloneError') throw L;
      r.location.assign(D);
    }
    d && v && v({ action: b, location: C.location, delta: 1 });
  }
  function z(E, U) {
    b = 'REPLACE';
    let K = Vh(E) ? E : Po(C.location, E, U);
    m = _();
    let Q = Qh(K, m),
      D = C.createHref(K.unstable_mask || K);
    (h.replaceState(Q, '', D), d && v && v({ action: b, location: C.location, delta: 0 }));
  }
  function g(E) {
    return nv(E);
  }
  let C = {
    get action() {
      return b;
    },
    get location() {
      return a(r, h);
    },
    listen(E) {
      if (v) throw new Error('A history only accepts one active listener');
      return (
        r.addEventListener(Xh, S),
        (v = E),
        () => {
          (r.removeEventListener(Xh, S), (v = null));
        }
      );
    },
    createHref(E) {
      return u(r, E);
    },
    createURL: g,
    encodeLocation(E) {
      let U = g(E);
      return { pathname: U.pathname, search: U.search, hash: U.hash };
    },
    push: k,
    replace: z,
    go(E) {
      return h.go(E);
    },
  };
  return C;
}
function nv(a, u = !1) {
  let o = 'http://localhost';
  (typeof window < 'u' &&
    (o = window.location.origin !== 'null' ? window.location.origin : window.location.href),
    Xe(o, 'No window.location.(origin|href) available to create URL'));
  let c = typeof a == 'string' ? a : Ni(a);
  return ((c = c.replace(/ $/, '%20')), !u && c.startsWith('//') && (c = o + c), new URL(c, o));
}
function gp(a, u, o = '/') {
  return av(a, u, o, !1);
}
function av(a, u, o, c) {
  let r = typeof u == 'string' ? _a(u) : u,
    d = Rl(r.pathname || '/', o);
  if (d == null) return null;
  let h = vp(a);
  iv(h);
  let b = null;
  for (let v = 0; b == null && v < h.length; ++v) {
    let m = yv(d);
    b = hv(h[v], m, c);
  }
  return b;
}
function vp(a, u = [], o = [], c = '', r = !1) {
  let d = (h, b, v = r, m) => {
    let _ = {
      relativePath: m === void 0 ? h.path || '' : m,
      caseSensitive: h.caseSensitive === !0,
      childrenIndex: b,
      route: h,
    };
    if (_.relativePath.startsWith('/')) {
      if (!_.relativePath.startsWith(c) && v) return;
      (Xe(
        _.relativePath.startsWith(c),
        `Absolute route path "${_.relativePath}" nested under path "${c}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`
      ),
        (_.relativePath = _.relativePath.slice(c.length)));
    }
    let S = Wt([c, _.relativePath]),
      k = o.concat(_);
    (h.children &&
      h.children.length > 0 &&
      (Xe(
        h.index !== !0,
        `Index routes must not have child routes. Please remove all child routes from route path "${S}".`
      ),
      vp(h.children, u, k, S, v)),
      !(h.path == null && !h.index) && u.push({ path: S, score: dv(S, h.index), routesMeta: k }));
  };
  return (
    a.forEach((h, b) => {
      var v;
      if (h.path === '' || !((v = h.path) != null && v.includes('?'))) d(h, b);
      else for (let m of _p(h.path)) d(h, b, !0, m);
    }),
    u
  );
}
function _p(a) {
  let u = a.split('/');
  if (u.length === 0) return [];
  let [o, ...c] = u,
    r = o.endsWith('?'),
    d = o.replace(/\?$/, '');
  if (c.length === 0) return r ? [d, ''] : [d];
  let h = _p(c.join('/')),
    b = [];
  return (
    b.push(...h.map((v) => (v === '' ? d : [d, v].join('/')))),
    r && b.push(...h),
    b.map((v) => (a.startsWith('/') && v === '' ? '/' : v))
  );
}
function iv(a) {
  a.sort((u, o) =>
    u.score !== o.score
      ? o.score - u.score
      : mv(
          u.routesMeta.map((c) => c.childrenIndex),
          o.routesMeta.map((c) => c.childrenIndex)
        )
  );
}
var uv = /^:[\w-]+$/,
  sv = 3,
  cv = 2,
  ov = 1,
  rv = 10,
  fv = -2,
  $h = (a) => a === '*';
function dv(a, u) {
  let o = a.split('/'),
    c = o.length;
  return (
    o.some($h) && (c += fv),
    u && (c += cv),
    o.filter((r) => !$h(r)).reduce((r, d) => r + (uv.test(d) ? sv : d === '' ? ov : rv), c)
  );
}
function mv(a, u) {
  return a.length === u.length && a.slice(0, -1).every((c, r) => c === u[r])
    ? a[a.length - 1] - u[u.length - 1]
    : 0;
}
function hv(a, u, o = !1) {
  let { routesMeta: c } = a,
    r = {},
    d = '/',
    h = [];
  for (let b = 0; b < c.length; ++b) {
    let v = c[b],
      m = b === c.length - 1,
      _ = d === '/' ? u : u.slice(d.length) || '/',
      S = ls({ path: v.relativePath, caseSensitive: v.caseSensitive, end: m }, _),
      k = v.route;
    if (
      (!S &&
        m &&
        o &&
        !c[c.length - 1].route.index &&
        (S = ls({ path: v.relativePath, caseSensitive: v.caseSensitive, end: !1 }, _)),
      !S)
    )
      return null;
    (Object.assign(r, S.params),
      h.push({
        params: r,
        pathname: Wt([d, S.pathname]),
        pathnameBase: bv(Wt([d, S.pathnameBase])),
        route: k,
      }),
      S.pathnameBase !== '/' && (d = Wt([d, S.pathnameBase])));
  }
  return h;
}
function ls(a, u) {
  typeof a == 'string' && (a = { path: a, caseSensitive: !1, end: !0 });
  let [o, c] = pv(a.path, a.caseSensitive, a.end),
    r = u.match(o);
  if (!r) return null;
  let d = r[0],
    h = d.replace(/(.)\/+$/, '$1'),
    b = r.slice(1);
  return {
    params: c.reduce((m, { paramName: _, isOptional: S }, k) => {
      if (_ === '*') {
        let g = b[k] || '';
        h = d.slice(0, d.length - g.length).replace(/(.)\/+$/, '$1');
      }
      const z = b[k];
      return (S && !z ? (m[_] = void 0) : (m[_] = (z || '').replace(/%2F/g, '/')), m);
    }, {}),
    pathname: d,
    pathnameBase: h,
    pattern: a,
  };
}
function pv(a, u = !1, o = !0) {
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
        .replace(/\/:([\w-]+)(\?)?/g, (h, b, v, m, _) => {
          if ((c.push({ paramName: b, isOptional: v != null }), v)) {
            let S = _.charAt(m + h.length);
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
function yv(a) {
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
var gv = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;
function vv(a, u = '/') {
  let { pathname: o, search: c = '', hash: r = '' } = typeof a == 'string' ? _a(a) : a,
    d;
  return (
    o ? ((o = bp(o)), o.startsWith('/') ? (d = Kh(o.substring(1), '/')) : (d = Kh(o, u))) : (d = u),
    { pathname: d, search: Sv(c), hash: xv(r) }
  );
}
function Kh(a, u) {
  let o = ns(u).split('/');
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
function _v(a) {
  return a.filter((u, o) => o === 0 || (u.route.path && u.route.path.length > 0));
}
function dr(a) {
  let u = _v(a);
  return u.map((o, c) => (c === u.length - 1 ? o.pathname : o.pathnameBase));
}
function cs(a, u, o, c = !1) {
  let r;
  typeof a == 'string'
    ? (r = _a(a))
    : ((r = { ...a }),
      Xe(!r.pathname || !r.pathname.includes('?'), qo('?', 'pathname', 'search', r)),
      Xe(!r.pathname || !r.pathname.includes('#'), qo('#', 'pathname', 'hash', r)),
      Xe(!r.search || !r.search.includes('#'), qo('#', 'search', 'hash', r)));
  let d = a === '' || r.pathname === '',
    h = d ? '/' : r.pathname,
    b;
  if (h == null) b = o;
  else {
    let S = u.length - 1;
    if (!c && h.startsWith('..')) {
      let k = h.split('/');
      for (; k[0] === '..'; ) (k.shift(), (S -= 1));
      r.pathname = k.join('/');
    }
    b = S >= 0 ? u[S] : '/';
  }
  let v = vv(r, b),
    m = h && h !== '/' && h.endsWith('/'),
    _ = (d || h === '.') && o.endsWith('/');
  return (!v.pathname.endsWith('/') && (m || _) && (v.pathname += '/'), v);
}
var bp = (a) => a.replace(/\/\/+/g, '/'),
  Wt = (a) => bp(a.join('/')),
  ns = (a) => a.replace(/\/+$/, ''),
  bv = (a) => ns(a).replace(/^\/*/, '/'),
  Sv = (a) => (!a || a === '?' ? '' : a.startsWith('?') ? a : '?' + a),
  xv = (a) => (!a || a === '#' ? '' : a.startsWith('#') ? a : '#' + a),
  Ev = class {
    constructor(a, u, o, c = !1) {
      ((this.status = a),
        (this.statusText = u || ''),
        (this.internal = c),
        o instanceof Error ? ((this.data = o.toString()), (this.error = o)) : (this.data = o));
    }
  };
function Tv(a) {
  return (
    a != null &&
    typeof a.status == 'number' &&
    typeof a.statusText == 'string' &&
    typeof a.internal == 'boolean' &&
    'data' in a
  );
}
function Nv(a) {
  let u = a.map((o) => o.route.path).filter(Boolean);
  return Wt(u) || '/';
}
var Sp =
  typeof window < 'u' && typeof window.document < 'u' && typeof window.document.createElement < 'u';
function xp(a, u) {
  let o = a;
  if (typeof o != 'string' || !gv.test(o)) return { absoluteURL: void 0, isExternal: !1, to: o };
  let c = o,
    r = !1;
  if (Sp)
    try {
      let d = new URL(window.location.href),
        h = o.startsWith('//') ? new URL(d.protocol + o) : new URL(o),
        b = Rl(h.pathname, u);
      h.origin === d.origin && b != null ? (o = b + h.search + h.hash) : (r = !0);
    } catch {
      Ft(
        !1,
        `<Link to="${o}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`
      );
    }
  return { absoluteURL: c, isExternal: r, to: o };
}
Object.getOwnPropertyNames(Object.prototype).sort().join('\0');
var Ep = ['POST', 'PUT', 'PATCH', 'DELETE'];
new Set(Ep);
var Av = ['GET', ...Ep];
new Set(Av);
var ba = A.createContext(null);
ba.displayName = 'DataRouter';
var os = A.createContext(null);
os.displayName = 'DataRouterState';
var Tp = A.createContext(!1);
function Cv() {
  return A.useContext(Tp);
}
var Np = A.createContext({ isTransitioning: !1 });
Np.displayName = 'ViewTransition';
var Mv = A.createContext(new Map());
Mv.displayName = 'Fetchers';
var kv = A.createContext(null);
kv.displayName = 'Await';
var wt = A.createContext(null);
wt.displayName = 'Navigation';
var ki = A.createContext(null);
ki.displayName = 'Location';
var Pt = A.createContext({ outlet: null, matches: [], isDataRoute: !1 });
Pt.displayName = 'Route';
var mr = A.createContext(null);
mr.displayName = 'RouteError';
var Ap = 'REACT_ROUTER_ERROR',
  Rv = 'REDIRECT',
  jv = 'ROUTE_ERROR_RESPONSE';
function Ov(a) {
  if (a.startsWith(`${Ap}:${Rv}:{`))
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
function Dv(a) {
  if (a.startsWith(`${Ap}:${jv}:{`))
    try {
      let u = JSON.parse(a.slice(40));
      if (
        typeof u == 'object' &&
        u &&
        typeof u.status == 'number' &&
        typeof u.statusText == 'string'
      )
        return new Ev(u.status, u.statusText, u.data);
    } catch {}
}
function zv(a, { relative: u } = {}) {
  Xe(Sa(), 'useHref() may be used only in the context of a <Router> component.');
  let { basename: o, navigator: c } = A.useContext(wt),
    { hash: r, pathname: d, search: h } = Ri(a, { relative: u }),
    b = d;
  return (
    o !== '/' && (b = d === '/' ? o : Wt([o, d])),
    c.createHref({ pathname: b, search: h, hash: r })
  );
}
function Sa() {
  return A.useContext(ki) != null;
}
function il() {
  return (
    Xe(Sa(), 'useLocation() may be used only in the context of a <Router> component.'),
    A.useContext(ki).location
  );
}
var Cp =
  'You should call navigate() in a React.useEffect(), not when your component is first rendered.';
function Mp(a) {
  A.useContext(wt).static || A.useLayoutEffect(a);
}
function Ol() {
  let { isDataRoute: a } = A.useContext(Pt);
  return a ? Zv() : wv();
}
function wv() {
  Xe(Sa(), 'useNavigate() may be used only in the context of a <Router> component.');
  let a = A.useContext(ba),
    { basename: u, navigator: o } = A.useContext(wt),
    { matches: c } = A.useContext(Pt),
    { pathname: r } = il(),
    d = JSON.stringify(dr(c)),
    h = A.useRef(!1);
  return (
    Mp(() => {
      h.current = !0;
    }),
    A.useCallback(
      (v, m = {}) => {
        if ((Ft(h.current, Cp), !h.current)) return;
        if (typeof v == 'number') {
          o.go(v);
          return;
        }
        let _ = cs(v, JSON.parse(d), r, m.relative === 'path');
        (a == null && u !== '/' && (_.pathname = _.pathname === '/' ? u : Wt([u, _.pathname])),
          (m.replace ? o.replace : o.push)(_, m.state, m));
      },
      [u, o, d, r, a]
    )
  );
}
A.createContext(null);
function Bv() {
  let { matches: a } = A.useContext(Pt),
    u = a[a.length - 1];
  return (u == null ? void 0 : u.params) ?? {};
}
function Ri(a, { relative: u } = {}) {
  let { matches: o } = A.useContext(Pt),
    { pathname: c } = il(),
    r = JSON.stringify(dr(o));
  return A.useMemo(() => cs(a, JSON.parse(r), c, u === 'path'), [a, r, c, u]);
}
function Uv(a, u) {
  return kp(a, u);
}
function kp(a, u, o) {
  var E;
  Xe(Sa(), 'useRoutes() may be used only in the context of a <Router> component.');
  let { navigator: c } = A.useContext(wt),
    { matches: r } = A.useContext(Pt),
    d = r[r.length - 1],
    h = d ? d.params : {},
    b = d ? d.pathname : '/',
    v = d ? d.pathnameBase : '/',
    m = d && d.route;
  {
    let U = (m && m.path) || '';
    jp(
      b,
      !m || U.endsWith('*') || U.endsWith('*?'),
      `You rendered descendant <Routes> (or called \`useRoutes()\`) at "${b}" (under <Route path="${U}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${U}"> to <Route path="${U === '/' ? '*' : `${U}/*`}">.`
    );
  }
  let _ = il(),
    S;
  if (u) {
    let U = typeof u == 'string' ? _a(u) : u;
    (Xe(
      v === '/' || ((E = U.pathname) == null ? void 0 : E.startsWith(v)),
      `When overriding the location using \`<Routes location>\` or \`useRoutes(routes, location)\`, the location pathname must begin with the portion of the URL pathname that was matched by all parent routes. The current pathname base is "${v}" but pathname "${U.pathname}" was given in the \`location\` prop.`
    ),
      (S = U));
  } else S = _;
  let k = S.pathname || '/',
    z = k;
  if (v !== '/') {
    let U = v.replace(/^\//, '').split('/');
    z = '/' + k.replace(/^\//, '').split('/').slice(U.length).join('/');
  }
  let g = gp(a, { pathname: z });
  (Ft(m || g != null, `No routes matched location "${S.pathname}${S.search}${S.hash}" `),
    Ft(
      g == null ||
        g[g.length - 1].route.element !== void 0 ||
        g[g.length - 1].route.Component !== void 0 ||
        g[g.length - 1].route.lazy !== void 0,
      `Matched leaf route at location "${S.pathname}${S.search}${S.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`
    ));
  let C = Yv(
    g &&
      g.map((U) =>
        Object.assign({}, U, {
          params: Object.assign({}, h, U.params),
          pathname: Wt([
            v,
            c.encodeLocation
              ? c.encodeLocation(
                  U.pathname.replace(/%/g, '%25').replace(/\?/g, '%3F').replace(/#/g, '%23')
                ).pathname
              : U.pathname,
          ]),
          pathnameBase:
            U.pathnameBase === '/'
              ? v
              : Wt([
                  v,
                  c.encodeLocation
                    ? c.encodeLocation(
                        U.pathnameBase
                          .replace(/%/g, '%25')
                          .replace(/\?/g, '%3F')
                          .replace(/#/g, '%23')
                      ).pathname
                    : U.pathnameBase,
                ]),
        })
      ),
    r,
    o
  );
  return u && C
    ? A.createElement(
        ki.Provider,
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
        C
      )
    : C;
}
function Lv() {
  let a = Kv(),
    u = Tv(a) ? `${a.status} ${a.statusText}` : a instanceof Error ? a.message : JSON.stringify(a),
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
var Hv = A.createElement(Lv, null),
  Rp = class extends A.Component {
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
        const o = Dv(a.digest);
        o && (a = o);
      }
      let u =
        a !== void 0
          ? A.createElement(
              Pt.Provider,
              { value: this.props.routeContext },
              A.createElement(mr.Provider, { value: a, children: this.props.component })
            )
          : this.props.children;
      return this.context ? A.createElement(qv, { error: a }, u) : u;
    }
  };
Rp.contextType = Tp;
var Go = new WeakMap();
function qv({ children: a, error: u }) {
  let { basename: o } = A.useContext(wt);
  if (typeof u == 'object' && u && 'digest' in u && typeof u.digest == 'string') {
    let c = Ov(u.digest);
    if (c) {
      let r = Go.get(u);
      if (r) throw r;
      let d = xp(c.location, o);
      if (Sp && !Go.get(u))
        if (d.isExternal || c.reloadDocument) window.location.href = d.absoluteURL || d.to;
        else {
          const h = Promise.resolve().then(() =>
            window.__reactRouterDataRouter.navigate(d.to, { replace: c.replace })
          );
          throw (Go.set(u, h), h);
        }
      return A.createElement('meta', {
        httpEquiv: 'refresh',
        content: `0;url=${d.absoluteURL || d.to}`,
      });
    }
  }
  return a;
}
function Gv({ routeContext: a, match: u, children: o }) {
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
function Yv(a, u = [], o) {
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
    let _ = r.findIndex((S) => S.route.id && (d == null ? void 0 : d[S.route.id]) !== void 0);
    (Xe(
      _ >= 0,
      `Could not find a matching route for errors on route IDs: ${Object.keys(d).join(',')}`
    ),
      (r = r.slice(0, Math.min(r.length, _ + 1))));
  }
  let h = !1,
    b = -1;
  if (o && c) {
    h = c.renderFallback;
    for (let _ = 0; _ < r.length; _++) {
      let S = r[_];
      if (((S.route.HydrateFallback || S.route.hydrateFallbackElement) && (b = _), S.route.id)) {
        let { loaderData: k, errors: z } = c,
          g = S.route.loader && !k.hasOwnProperty(S.route.id) && (!z || z[S.route.id] === void 0);
        if (S.route.lazy || g) {
          (o.isStatic && (h = !0), b >= 0 ? (r = r.slice(0, b + 1)) : (r = [r[0]]));
          break;
        }
      }
    }
  }
  let v = o == null ? void 0 : o.onError,
    m =
      c && v
        ? (_, S) => {
            var k, z;
            v(_, {
              location: c.location,
              params:
                ((z = (k = c.matches) == null ? void 0 : k[0]) == null ? void 0 : z.params) ?? {},
              unstable_pattern: Nv(c.matches),
              errorInfo: S,
            });
          }
        : void 0;
  return r.reduceRight((_, S, k) => {
    let z,
      g = !1,
      C = null,
      E = null;
    c &&
      ((z = d && S.route.id ? d[S.route.id] : void 0),
      (C = S.route.errorElement || Hv),
      h &&
        (b < 0 && k === 0
          ? (jp(
              'route-fallback',
              !1,
              'No `HydrateFallback` element provided to render during initial hydration'
            ),
            (g = !0),
            (E = null))
          : b === k && ((g = !0), (E = S.route.hydrateFallbackElement || null))));
    let U = u.concat(r.slice(0, k + 1)),
      K = () => {
        let Q;
        return (
          z
            ? (Q = C)
            : g
              ? (Q = E)
              : S.route.Component
                ? (Q = A.createElement(S.route.Component, null))
                : S.route.element
                  ? (Q = S.route.element)
                  : (Q = _),
          A.createElement(Gv, {
            match: S,
            routeContext: { outlet: _, matches: U, isDataRoute: c != null },
            children: Q,
          })
        );
      };
    return c && (S.route.ErrorBoundary || S.route.errorElement || k === 0)
      ? A.createElement(Rp, {
          location: c.location,
          revalidation: c.revalidation,
          component: C,
          error: z,
          children: K(),
          routeContext: { outlet: null, matches: U, isDataRoute: !0 },
          onError: m,
        })
      : K();
  }, null);
}
function hr(a) {
  return `${a} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function Xv(a) {
  let u = A.useContext(ba);
  return (Xe(u, hr(a)), u);
}
function Vv(a) {
  let u = A.useContext(os);
  return (Xe(u, hr(a)), u);
}
function Qv(a) {
  let u = A.useContext(Pt);
  return (Xe(u, hr(a)), u);
}
function pr(a) {
  let u = Qv(a),
    o = u.matches[u.matches.length - 1];
  return (Xe(o.route.id, `${a} can only be used on routes that contain a unique "id"`), o.route.id);
}
function $v() {
  return pr('useRouteId');
}
function Kv() {
  var c;
  let a = A.useContext(mr),
    u = Vv('useRouteError'),
    o = pr('useRouteError');
  return a !== void 0 ? a : (c = u.errors) == null ? void 0 : c[o];
}
function Zv() {
  let { router: a } = Xv('useNavigate'),
    u = pr('useNavigate'),
    o = A.useRef(!1);
  return (
    Mp(() => {
      o.current = !0;
    }),
    A.useCallback(
      async (r, d = {}) => {
        (Ft(o.current, Cp),
          o.current &&
            (typeof r == 'number'
              ? await a.navigate(r)
              : await a.navigate(r, { fromRouteId: u, ...d })));
      },
      [a, u]
    )
  );
}
var Zh = {};
function jp(a, u, o) {
  !u && !Zh[a] && ((Zh[a] = !0), Ft(!1, o));
}
A.memo(Jv);
function Jv({ routes: a, future: u, state: o, isStatic: c, onError: r }) {
  return kp(a, void 0, { state: o, isStatic: c, onError: r });
}
function jl({ to: a, replace: u, state: o, relative: c }) {
  Xe(Sa(), '<Navigate> may be used only in the context of a <Router> component.');
  let { static: r } = A.useContext(wt);
  Ft(
    !r,
    '<Navigate> must not be used on the initial render in a <StaticRouter>. This is a no-op, but you should modify your code so the <Navigate> is only ever rendered in response to some user interaction or state change.'
  );
  let { matches: d } = A.useContext(Pt),
    { pathname: h } = il(),
    b = Ol(),
    v = cs(a, dr(d), h, c === 'path'),
    m = JSON.stringify(v);
  return (
    A.useEffect(() => {
      b(JSON.parse(m), { replace: u, state: o, relative: c });
    }, [b, m, c, u, o]),
    null
  );
}
function al(a) {
  Xe(
    !1,
    'A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>.'
  );
}
function Iv({
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
  let b = a.replace(/^\/*/, '/'),
    v = A.useMemo(
      () => ({ basename: b, navigator: r, static: d, unstable_useTransitions: h, future: {} }),
      [b, r, d, h]
    );
  typeof o == 'string' && (o = _a(o));
  let {
      pathname: m = '/',
      search: _ = '',
      hash: S = '',
      state: k = null,
      key: z = 'default',
      unstable_mask: g,
    } = o,
    C = A.useMemo(() => {
      let E = Rl(m, b);
      return E == null
        ? null
        : {
            location: { pathname: E, search: _, hash: S, state: k, key: z, unstable_mask: g },
            navigationType: c,
          };
    }, [b, m, _, S, k, z, c, g]);
  return (
    Ft(
      C != null,
      `<Router basename="${b}"> is not able to match the URL "${m}${_}${S}" because it does not start with the basename, so the <Router> won't render anything.`
    ),
    C == null
      ? null
      : A.createElement(
          wt.Provider,
          { value: v },
          A.createElement(ki.Provider, { children: u, value: C })
        )
  );
}
function Wv({ children: a, location: u }) {
  return Uv(er(a), u);
}
function er(a, u = []) {
  let o = [];
  return (
    A.Children.forEach(a, (c, r) => {
      if (!A.isValidElement(c)) return;
      let d = [...u, r];
      if (c.type === A.Fragment) {
        o.push.apply(o, er(c.props.children, d));
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
      (c.props.children && (h.children = er(c.props.children, d)), o.push(h));
    }),
    o
  );
}
var Pu = 'get',
  es = 'application/x-www-form-urlencoded';
function rs(a) {
  return typeof HTMLElement < 'u' && a instanceof HTMLElement;
}
function Fv(a) {
  return rs(a) && a.tagName.toLowerCase() === 'button';
}
function Pv(a) {
  return rs(a) && a.tagName.toLowerCase() === 'form';
}
function e_(a) {
  return rs(a) && a.tagName.toLowerCase() === 'input';
}
function t_(a) {
  return !!(a.metaKey || a.altKey || a.ctrlKey || a.shiftKey);
}
function l_(a, u) {
  return a.button === 0 && (!u || u === '_self') && !t_(a);
}
var Ju = null;
function n_() {
  if (Ju === null)
    try {
      (new FormData(document.createElement('form'), 0), (Ju = !1));
    } catch {
      Ju = !0;
    }
  return Ju;
}
var a_ = new Set(['application/x-www-form-urlencoded', 'multipart/form-data', 'text/plain']);
function Yo(a) {
  return a != null && !a_.has(a)
    ? (Ft(
        !1,
        `"${a}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${es}"`
      ),
      null)
    : a;
}
function i_(a, u) {
  let o, c, r, d, h;
  if (Pv(a)) {
    let b = a.getAttribute('action');
    ((c = b ? Rl(b, u) : null),
      (o = a.getAttribute('method') || Pu),
      (r = Yo(a.getAttribute('enctype')) || es),
      (d = new FormData(a)));
  } else if (Fv(a) || (e_(a) && (a.type === 'submit' || a.type === 'image'))) {
    let b = a.form;
    if (b == null)
      throw new Error('Cannot submit a <button> or <input type="submit"> without a <form>');
    let v = a.getAttribute('formaction') || b.getAttribute('action');
    if (
      ((c = v ? Rl(v, u) : null),
      (o = a.getAttribute('formmethod') || b.getAttribute('method') || Pu),
      (r = Yo(a.getAttribute('formenctype')) || Yo(b.getAttribute('enctype')) || es),
      (d = new FormData(b, a)),
      !n_())
    ) {
      let { name: m, type: _, value: S } = a;
      if (_ === 'image') {
        let k = m ? `${m}.` : '';
        (d.append(`${k}x`, '0'), d.append(`${k}y`, '0'));
      } else m && d.append(m, S);
    }
  } else {
    if (rs(a))
      throw new Error(
        'Cannot submit element that is not <form>, <button>, or <input type="submit|image">'
      );
    ((o = Pu), (c = null), (r = es), (h = a));
  }
  return (
    d && r === 'text/plain' && ((h = d), (d = void 0)),
    { action: c, method: o.toLowerCase(), encType: r, formData: d, body: h }
  );
}
Object.getOwnPropertyNames(Object.prototype).sort().join('\0');
function yr(a, u) {
  if (a === !1 || a === null || typeof a > 'u') throw new Error(u);
}
function Op(a, u, o, c) {
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
          ? (r.pathname = `${ns(u)}/_root.${c}`)
          : (r.pathname = `${ns(r.pathname)}.${c}`),
    r
  );
}
async function u_(a, u) {
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
function s_(a) {
  return a == null
    ? !1
    : a.href == null
      ? a.rel === 'preload' && typeof a.imageSrcSet == 'string' && typeof a.imageSizes == 'string'
      : typeof a.rel == 'string' && typeof a.href == 'string';
}
async function c_(a, u, o) {
  let c = await Promise.all(
    a.map(async (r) => {
      let d = u.routes[r.route.id];
      if (d) {
        let h = await u_(d, o);
        return h.links ? h.links() : [];
      }
      return [];
    })
  );
  return d_(
    c
      .flat(1)
      .filter(s_)
      .filter((r) => r.rel === 'stylesheet' || r.rel === 'preload')
      .map((r) =>
        r.rel === 'stylesheet' ? { ...r, rel: 'prefetch', as: 'style' } : { ...r, rel: 'prefetch' }
      )
  );
}
function Jh(a, u, o, c, r, d) {
  let h = (v, m) => (o[m] ? v.route.id !== o[m].route.id : !0),
    b = (v, m) => {
      var _;
      return (
        o[m].pathname !== v.pathname ||
        (((_ = o[m].route.path) == null ? void 0 : _.endsWith('*')) &&
          o[m].params['*'] !== v.params['*'])
      );
    };
  return d === 'assets'
    ? u.filter((v, m) => h(v, m) || b(v, m))
    : d === 'data'
      ? u.filter((v, m) => {
          var S;
          let _ = c.routes[v.route.id];
          if (!_ || !_.hasLoader) return !1;
          if (h(v, m) || b(v, m)) return !0;
          if (v.route.shouldRevalidate) {
            let k = v.route.shouldRevalidate({
              currentUrl: new URL(r.pathname + r.search + r.hash, window.origin),
              currentParams: ((S = o[0]) == null ? void 0 : S.params) || {},
              nextUrl: new URL(a, window.origin),
              nextParams: v.params,
              defaultShouldRevalidate: !0,
            });
            if (typeof k == 'boolean') return k;
          }
          return !0;
        })
      : [];
}
function o_(a, u, { includeHydrateFallback: o } = {}) {
  return r_(
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
function r_(a) {
  return [...new Set(a)];
}
function f_(a) {
  let u = {},
    o = Object.keys(a).sort();
  for (let c of o) u[c] = a[c];
  return u;
}
function d_(a, u) {
  let o = new Set();
  return (
    new Set(u),
    a.reduce((c, r) => {
      let d = JSON.stringify(f_(r));
      return (o.has(d) || (o.add(d), c.push({ key: d, link: r })), c);
    }, [])
  );
}
function gr() {
  let a = A.useContext(ba);
  return (yr(a, 'You must render this element inside a <DataRouterContext.Provider> element'), a);
}
function m_() {
  let a = A.useContext(os);
  return (
    yr(a, 'You must render this element inside a <DataRouterStateContext.Provider> element'),
    a
  );
}
var vr = A.createContext(void 0);
vr.displayName = 'FrameworkContext';
function _r() {
  let a = A.useContext(vr);
  return (yr(a, 'You must render this element inside a <HydratedRouter> element'), a);
}
function h_(a, u) {
  let o = A.useContext(vr),
    [c, r] = A.useState(!1),
    [d, h] = A.useState(!1),
    { onFocus: b, onBlur: v, onMouseEnter: m, onMouseLeave: _, onTouchStart: S } = u,
    k = A.useRef(null);
  (A.useEffect(() => {
    if ((a === 'render' && h(!0), a === 'viewport')) {
      let C = (U) => {
          U.forEach((K) => {
            h(K.isIntersecting);
          });
        },
        E = new IntersectionObserver(C, { threshold: 0.5 });
      return (
        k.current && E.observe(k.current),
        () => {
          E.disconnect();
        }
      );
    }
  }, [a]),
    A.useEffect(() => {
      if (c) {
        let C = setTimeout(() => {
          h(!0);
        }, 100);
        return () => {
          clearTimeout(C);
        };
      }
    }, [c]));
  let z = () => {
      r(!0);
    },
    g = () => {
      (r(!1), h(!1));
    };
  return o
    ? a !== 'intent'
      ? [d, k, {}]
      : [
          d,
          k,
          {
            onFocus: vi(b, z),
            onBlur: vi(v, g),
            onMouseEnter: vi(m, z),
            onMouseLeave: vi(_, g),
            onTouchStart: vi(S, z),
          },
        ]
    : [!1, k, {}];
}
function vi(a, u) {
  return (o) => {
    (a && a(o), o.defaultPrevented || u(o));
  };
}
function p_({ page: a, ...u }) {
  let o = Cv(),
    { router: c } = gr(),
    r = A.useMemo(() => gp(c.routes, a, c.basename), [c.routes, a, c.basename]);
  return r
    ? o
      ? A.createElement(g_, { page: a, matches: r, ...u })
      : A.createElement(v_, { page: a, matches: r, ...u })
    : null;
}
function y_(a) {
  let { manifest: u, routeModules: o } = _r(),
    [c, r] = A.useState([]);
  return (
    A.useEffect(() => {
      let d = !1;
      return (
        c_(a, u, o).then((h) => {
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
function g_({ page: a, matches: u, ...o }) {
  let c = il(),
    { future: r } = _r(),
    { basename: d } = gr(),
    h = A.useMemo(() => {
      if (a === c.pathname + c.search + c.hash) return [];
      let b = Op(a, d, r.unstable_trailingSlashAwareDataRequests, 'rsc'),
        v = !1,
        m = [];
      for (let _ of u)
        typeof _.route.shouldRevalidate == 'function' ? (v = !0) : m.push(_.route.id);
      return (
        v && m.length > 0 && b.searchParams.set('_routes', m.join(',')),
        [b.pathname + b.search]
      );
    }, [d, r.unstable_trailingSlashAwareDataRequests, a, c, u]);
  return A.createElement(
    A.Fragment,
    null,
    h.map((b) => A.createElement('link', { key: b, rel: 'prefetch', as: 'fetch', href: b, ...o }))
  );
}
function v_({ page: a, matches: u, ...o }) {
  let c = il(),
    { future: r, manifest: d, routeModules: h } = _r(),
    { basename: b } = gr(),
    { loaderData: v, matches: m } = m_(),
    _ = A.useMemo(() => Jh(a, u, m, d, c, 'data'), [a, u, m, d, c]),
    S = A.useMemo(() => Jh(a, u, m, d, c, 'assets'), [a, u, m, d, c]),
    k = A.useMemo(() => {
      if (a === c.pathname + c.search + c.hash) return [];
      let C = new Set(),
        E = !1;
      if (
        (u.forEach((K) => {
          var D;
          let Q = d.routes[K.route.id];
          !Q ||
            !Q.hasLoader ||
            ((!_.some((L) => L.route.id === K.route.id) &&
              K.route.id in v &&
              (D = h[K.route.id]) != null &&
              D.shouldRevalidate) ||
            Q.hasClientLoader
              ? (E = !0)
              : C.add(K.route.id));
        }),
        C.size === 0)
      )
        return [];
      let U = Op(a, b, r.unstable_trailingSlashAwareDataRequests, 'data');
      return (
        E &&
          C.size > 0 &&
          U.searchParams.set(
            '_routes',
            u
              .filter((K) => C.has(K.route.id))
              .map((K) => K.route.id)
              .join(',')
          ),
        [U.pathname + U.search]
      );
    }, [b, r.unstable_trailingSlashAwareDataRequests, v, c, d, _, u, a, h]),
    z = A.useMemo(() => o_(S, d), [S, d]),
    g = y_(S);
  return A.createElement(
    A.Fragment,
    null,
    k.map((C) => A.createElement('link', { key: C, rel: 'prefetch', as: 'fetch', href: C, ...o })),
    z.map((C) => A.createElement('link', { key: C, rel: 'modulepreload', href: C, ...o })),
    g.map(({ key: C, link: E }) =>
      A.createElement('link', {
        key: C,
        nonce: o.nonce,
        ...E,
        crossOrigin: E.crossOrigin ?? o.crossOrigin,
      })
    )
  );
}
function __(...a) {
  return (u) => {
    a.forEach((o) => {
      typeof o == 'function' ? o(u) : o != null && (o.current = u);
    });
  };
}
var b_ =
  typeof window < 'u' && typeof window.document < 'u' && typeof window.document.createElement < 'u';
try {
  b_ && (window.__reactRouterVersion = '7.14.2');
} catch {}
function S_({ basename: a, children: u, unstable_useTransitions: o, window: c }) {
  let r = A.useRef();
  r.current == null && (r.current = ev({ window: c, v5Compat: !0 }));
  let d = r.current,
    [h, b] = A.useState({ action: d.action, location: d.location }),
    v = A.useCallback(
      (m) => {
        o === !1 ? b(m) : A.startTransition(() => b(m));
      },
      [o]
    );
  return (
    A.useLayoutEffect(() => d.listen(v), [d, v]),
    A.createElement(Iv, {
      basename: a,
      children: u,
      location: h.location,
      navigationType: h.action,
      navigator: d,
      unstable_useTransitions: o,
    })
  );
}
var Dp = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,
  zp = A.forwardRef(function (
    {
      onClick: u,
      discover: o = 'render',
      prefetch: c = 'none',
      relative: r,
      reloadDocument: d,
      replace: h,
      unstable_mask: b,
      state: v,
      target: m,
      to: _,
      preventScrollReset: S,
      viewTransition: k,
      unstable_defaultShouldRevalidate: z,
      ...g
    },
    C
  ) {
    let { basename: E, navigator: U, unstable_useTransitions: K } = A.useContext(wt),
      Q = typeof _ == 'string' && Dp.test(_),
      D = xp(_, E);
    _ = D.to;
    let L = zv(_, { relative: r }),
      Z = il(),
      $ = null;
    if (b) {
      let qe = cs(b, [], Z.unstable_mask ? Z.unstable_mask.pathname : '/', !0);
      (E !== '/' && (qe.pathname = qe.pathname === '/' ? E : Wt([E, qe.pathname])),
        ($ = U.createHref(qe)));
    }
    let [B, F, le] = h_(c, g),
      re = N_(_, {
        replace: h,
        unstable_mask: b,
        state: v,
        target: m,
        preventScrollReset: S,
        relative: r,
        viewTransition: k,
        unstable_defaultShouldRevalidate: z,
        unstable_useTransitions: K,
      });
    function de(qe) {
      (u && u(qe), qe.defaultPrevented || re(qe));
    }
    let at = !(D.isExternal || d),
      pt = A.createElement('a', {
        ...g,
        ...le,
        href: (at ? $ : void 0) || D.absoluteURL || L,
        onClick: at ? de : u,
        ref: __(C, F),
        target: m,
        'data-discover': !Q && o === 'render' ? 'true' : void 0,
      });
    return B && !Q ? A.createElement(A.Fragment, null, pt, A.createElement(p_, { page: L })) : pt;
  });
zp.displayName = 'Link';
var x_ = A.forwardRef(function (
  {
    'aria-current': u = 'page',
    caseSensitive: o = !1,
    className: c = '',
    end: r = !1,
    style: d,
    to: h,
    viewTransition: b,
    children: v,
    ...m
  },
  _
) {
  let S = Ri(h, { relative: m.relative }),
    k = il(),
    z = A.useContext(os),
    { navigator: g, basename: C } = A.useContext(wt),
    E = z != null && R_(S) && b === !0,
    U = g.encodeLocation ? g.encodeLocation(S).pathname : S.pathname,
    K = k.pathname,
    Q = z && z.navigation && z.navigation.location ? z.navigation.location.pathname : null;
  (o || ((K = K.toLowerCase()), (Q = Q ? Q.toLowerCase() : null), (U = U.toLowerCase())),
    Q && C && (Q = Rl(Q, C) || Q));
  const D = U !== '/' && U.endsWith('/') ? U.length - 1 : U.length;
  let L = K === U || (!r && K.startsWith(U) && K.charAt(D) === '/'),
    Z = Q != null && (Q === U || (!r && Q.startsWith(U) && Q.charAt(U.length) === '/')),
    $ = { isActive: L, isPending: Z, isTransitioning: E },
    B = L ? u : void 0,
    F;
  typeof c == 'function'
    ? (F = c($))
    : (F = [c, L ? 'active' : null, Z ? 'pending' : null, E ? 'transitioning' : null]
        .filter(Boolean)
        .join(' '));
  let le = typeof d == 'function' ? d($) : d;
  return A.createElement(
    zp,
    { ...m, 'aria-current': B, className: F, ref: _, style: le, to: h, viewTransition: b },
    typeof v == 'function' ? v($) : v
  );
});
x_.displayName = 'NavLink';
var E_ = A.forwardRef(
  (
    {
      discover: a = 'render',
      fetcherKey: u,
      navigate: o,
      reloadDocument: c,
      replace: r,
      state: d,
      method: h = Pu,
      action: b,
      onSubmit: v,
      relative: m,
      preventScrollReset: _,
      viewTransition: S,
      unstable_defaultShouldRevalidate: k,
      ...z
    },
    g
  ) => {
    let { unstable_useTransitions: C } = A.useContext(wt),
      E = M_(),
      U = k_(b, { relative: m }),
      K = h.toLowerCase() === 'get' ? 'get' : 'post',
      Q = typeof b == 'string' && Dp.test(b),
      D = (L) => {
        if ((v && v(L), L.defaultPrevented)) return;
        L.preventDefault();
        let Z = L.nativeEvent.submitter,
          $ = (Z == null ? void 0 : Z.getAttribute('formmethod')) || h,
          B = () =>
            E(Z || L.currentTarget, {
              fetcherKey: u,
              method: $,
              navigate: o,
              replace: r,
              state: d,
              relative: m,
              preventScrollReset: _,
              viewTransition: S,
              unstable_defaultShouldRevalidate: k,
            });
        C && o !== !1 ? A.startTransition(() => B()) : B();
      };
    return A.createElement('form', {
      ref: g,
      method: K,
      action: U,
      onSubmit: c ? v : D,
      ...z,
      'data-discover': !Q && a === 'render' ? 'true' : void 0,
    });
  }
);
E_.displayName = 'Form';
function T_(a) {
  return `${a} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function wp(a) {
  let u = A.useContext(ba);
  return (Xe(u, T_(a)), u);
}
function N_(
  a,
  {
    target: u,
    replace: o,
    unstable_mask: c,
    state: r,
    preventScrollReset: d,
    relative: h,
    viewTransition: b,
    unstable_defaultShouldRevalidate: v,
    unstable_useTransitions: m,
  } = {}
) {
  let _ = Ol(),
    S = il(),
    k = Ri(a, { relative: h });
  return A.useCallback(
    (z) => {
      if (l_(z, u)) {
        z.preventDefault();
        let g = o !== void 0 ? o : Ni(S) === Ni(k),
          C = () =>
            _(a, {
              replace: g,
              unstable_mask: c,
              state: r,
              preventScrollReset: d,
              relative: h,
              viewTransition: b,
              unstable_defaultShouldRevalidate: v,
            });
        m ? A.startTransition(() => C()) : C();
      }
    },
    [S, _, k, o, c, r, u, a, d, h, b, v, m]
  );
}
var A_ = 0,
  C_ = () => `__${String(++A_)}__`;
function M_() {
  let { router: a } = wp('useSubmit'),
    { basename: u } = A.useContext(wt),
    o = $v(),
    c = a.fetch,
    r = a.navigate;
  return A.useCallback(
    async (d, h = {}) => {
      let { action: b, method: v, encType: m, formData: _, body: S } = i_(d, u);
      if (h.navigate === !1) {
        let k = h.fetcherKey || C_();
        await c(k, o, h.action || b, {
          unstable_defaultShouldRevalidate: h.unstable_defaultShouldRevalidate,
          preventScrollReset: h.preventScrollReset,
          formData: _,
          body: S,
          formMethod: h.method || v,
          formEncType: h.encType || m,
          flushSync: h.flushSync,
        });
      } else
        await r(h.action || b, {
          unstable_defaultShouldRevalidate: h.unstable_defaultShouldRevalidate,
          preventScrollReset: h.preventScrollReset,
          formData: _,
          body: S,
          formMethod: h.method || v,
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
function k_(a, { relative: u } = {}) {
  let { basename: o } = A.useContext(wt),
    c = A.useContext(Pt);
  Xe(c, 'useFormAction must be used inside a RouteContext');
  let [r] = c.matches.slice(-1),
    d = { ...Ri(a || '.', { relative: u }) },
    h = il();
  if (a == null) {
    d.search = h.search;
    let b = new URLSearchParams(d.search),
      v = b.getAll('index');
    if (v.some((_) => _ === '')) {
      (b.delete('index'), v.filter((S) => S).forEach((S) => b.append('index', S)));
      let _ = b.toString();
      d.search = _ ? `?${_}` : '';
    }
  }
  return (
    (!a || a === '.') &&
      r.route.index &&
      (d.search = d.search ? d.search.replace(/^\?/, '?index&') : '?index'),
    o !== '/' && (d.pathname = d.pathname === '/' ? o : Wt([o, d.pathname])),
    Ni(d)
  );
}
function R_(a, { relative: u } = {}) {
  let o = A.useContext(Np);
  Xe(
    o != null,
    "`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?"
  );
  let { basename: c } = wp('useViewTransitionState'),
    r = Ri(a, { relative: u });
  if (!o.isTransitioning) return !1;
  let d = Rl(o.currentLocation.pathname, c) || o.currentLocation.pathname,
    h = Rl(o.nextLocation.pathname, c) || o.nextLocation.pathname;
  return ls(r.pathname, h) != null || ls(r.pathname, d) != null;
}
const j_ = '_layout_mn6ug_1',
  O_ = '_enemies_mn6ug_12',
  D_ = '_enemy_mn6ug_20',
  z_ = '_targeted_mn6ug_35',
  w_ = '_enemyName_mn6ug_39',
  B_ = '_down_mn6ug_44',
  U_ = '_log_mn6ug_48',
  L_ = '_logLine_mn6ug_60',
  H_ = '_party_mn6ug_64',
  q_ = '_rowTag_mn6ug_71',
  G_ = '_cardRow_mn6ug_77',
  Y_ = '_card_mn6ug_77',
  X_ = '_cardActive_mn6ug_99',
  V_ = '_cardDecided_mn6ug_104',
  Q_ = '_cardName_mn6ug_108',
  $_ = '_uni_mn6ug_116',
  K_ = '_summons_mn6ug_120',
  Z_ = '_summon_mn6ug_120',
  J_ = '_summonName_mn6ug_138',
  I_ = '_summonHp_mn6ug_147',
  W_ = '_cardNums_mn6ug_153',
  F_ = '_cardCmd_mn6ug_159',
  P_ = '_empty_mn6ug_165',
  e1 = '_command_mn6ug_170',
  t1 = '_skillList_mn6ug_176',
  l1 = '_skillBtn_mn6ug_182',
  n1 = '_skillTop_mn6ug_194',
  a1 = '_skillName_mn6ug_201',
  i1 = '_skillDesc_mn6ug_206',
  u1 = '_target_mn6ug_35',
  s1 = '_unionBanner_mn6ug_217',
  c1 = '_unionCancel_mn6ug_231',
  o1 = '_unionHint_mn6ug_240',
  r1 = '_unionBtn_mn6ug_246',
  f1 = '_cmdHead_mn6ug_252',
  d1 = '_menu_mn6ug_257',
  m1 = '_menuBtn_mn6ug_263',
  h1 = '_tp_mn6ug_280',
  p1 = '_menuBack_mn6ug_286',
  y1 = '_execRow_mn6ug_296',
  g1 = '_redo_mn6ug_301',
  v1 = '_primary_mn6ug_311',
  _1 = '_result_mn6ug_326',
  b1 = '_resultTitle_mn6ug_337',
  S1 = '_resultBody_mn6ug_342',
  W = {
    layout: j_,
    enemies: O_,
    enemy: D_,
    targeted: z_,
    enemyName: w_,
    down: B_,
    log: U_,
    logLine: L_,
    party: H_,
    rowTag: q_,
    cardRow: G_,
    card: Y_,
    cardActive: X_,
    cardDecided: V_,
    cardName: Q_,
    uni: $_,
    summons: K_,
    summon: Z_,
    summonName: J_,
    summonHp: I_,
    cardNums: W_,
    cardCmd: F_,
    empty: P_,
    command: e1,
    skillList: t1,
    skillBtn: l1,
    skillTop: n1,
    skillName: a1,
    skillDesc: i1,
    target: u1,
    unionBanner: s1,
    unionCancel: c1,
    unionHint: o1,
    unionBtn: r1,
    cmdHead: f1,
    menu: d1,
    menuBtn: m1,
    tp: h1,
    menuBack: p1,
    execRow: y1,
    redo: g1,
    primary: v1,
    result: _1,
    resultTitle: b1,
    resultBody: S1,
  },
  x1 = '_row_1t6j7_1',
  E1 = '_label_1t6j7_8',
  T1 = '_track_1t6j7_16',
  N1 = '_fill_1t6j7_24',
  A1 = '_value_1t6j7_30',
  _i = { row: x1, label: E1, track: T1, fill: N1, value: A1 },
  Iu = ({ value: a, max: u, color: o = '#4caf50', label: c, showValue: r = !0 }) => {
    const d = u > 0 ? Math.max(0, Math.min(100, (a / u) * 100)) : 0;
    return y.jsxs('div', {
      className: _i.row,
      children: [
        c ? y.jsx('span', { className: _i.label, children: c }) : null,
        y.jsx('div', {
          className: _i.track,
          children: y.jsx('div', {
            className: _i.fill,
            style: { width: `${d}%`, backgroundColor: o },
          }),
        }),
        r
          ? y.jsxs('span', {
              className: _i.value,
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
  ht = {
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
function C1(a) {
  return a.category === 'material' ? 8 : Math.floor(a.buyPrice / 2);
}
const Kt = {
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
  br = {
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
  xi = {
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
  De = {
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
  M1 = 500,
  tr = 30,
  fs = 3,
  ds = 2,
  k1 = fs + ds,
  Ei = { TITLE_DEPTH: 20, REBIRTH_MIN_LEVEL: 30 },
  Bp = 5,
  R1 = 5,
  as = (a) => a > 0 && a % De.BOSS_INTERVAL === 0,
  Ih = (a) => Math.round(De.EXP_CURVE_BASE * Math.pow(a, De.EXP_CURVE_POW)),
  Xo = (a) => a < De.LEVEL_CAP,
  Sr = (a, u) => 1 + De.ENEMY_SCALE_K * (a - u),
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
  zt = {
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
  xa = {
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
  j1 = ['hp', 'tp', 'str', 'vit', 'agi', 'int', 'mnd', 'luc'],
  O1 = ['slash', 'pierce', 'bash'],
  is = (a, u, o) => Math.max(u, Math.min(o, a));
function Up(a, u) {
  const o = {};
  for (const c of j1) o[c] = Math.round(a[c] * u);
  return o;
}
function D1(a, u) {
  return Up(a.baseStats, Sr(u, a.refDepth));
}
function ha(a, u) {
  const o = new Map();
  for (const r of a) {
    if (r.stat !== u) continue;
    const d = is(r.modifier, 0.5, 1.5),
      h = o.get(r.stackGroup);
    (h === void 0 || Math.abs(d - 1) > Math.abs(h - 1)) && o.set(r.stackGroup, d);
  }
  let c = 1;
  for (const r of o.values()) c *= r;
  return is(c, 0.25, 2);
}
function Wh(a, u, o) {
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
const z1 = (a) => a.ailments.some((u) => u.type === 'blind'),
  w1 = (a) => a.ailments.some((u) => u.type === 'legBind');
function Lp(a, u, o, c) {
  const r = o.statBase === 'str',
    d = Wh(a.stats, a.equip, a.buffs),
    h = Wh(u.stats, u.equip, u.buffs),
    b = r ? d.patk : d.matk,
    v = r ? h.pdef : h.mdef;
  let m = !0;
  if (r) {
    const $ = z1(a) ? De.BLIND_ACC_PENALTY : 0,
      B = w1(u) ? 0 : h.eva,
      F = is(De.BASE_HIT + (d.acc - B) * De.HIT_AGI_K - $, De.HIT_MIN, 1);
    m = c.next() < F;
  }
  if (!m) return { damage: 0, hit: !1, critical: !1 };
  const S = (b * o.power * De.DAMAGE_DEF_K) / (De.DAMAGE_DEF_K + Math.max(0, v)),
    k = r && O1.includes(o.element),
    z = k && a.row === 'back' ? De.BACK_ROW_MELEE_MULT : 1,
    g = k && u.row === 'back' ? De.BACK_ROW_MELEE_MULT : 1,
    C = z * g,
    [E, U] = De.DMG_VARIANCE,
    K = E + c.next() * (U - E);
  let Q = S * o.elementMultiplier * C * K;
  const D = is(
      De.CRIT_BASE + (a.stats.luc - u.stats.luc) * De.CRIT_LUC_K,
      De.CRIT_MIN,
      De.CRIT_MAX
    ),
    L = c.next() < D;
  return (
    L && (Q *= De.CRIT_MULT),
    { damage: o.elementMultiplier === 0 ? 0 : Math.max(1, Math.floor(Q)), hit: !0, critical: L }
  );
}
const dt = {
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
function Hp(a, u) {
  var o;
  return ((o = a.guild.storage.find((c) => c.itemId === u)) == null ? void 0 : o.qty) ?? 0;
}
function ms(a, u, o = 1) {
  if (o <= 0) return a;
  const c = [...a.guild.storage],
    r = c.findIndex((d) => d.itemId === u);
  return (
    r >= 0 ? (c[r] = { ...c[r], qty: c[r].qty + o }) : c.push({ itemId: u, qty: o }),
    { ...a, guild: { ...a.guild, storage: c } }
  );
}
function Ai(a, u, o = 1) {
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
function qp(a, u, o) {
  return {
    ...a,
    guild: { ...a.guild, members: a.guild.members.map((c) => (c.id === u ? o(c) : c)) },
  };
}
function xr(a, u) {
  const o = zt[u];
  if (!o) return !1;
  const c = dt[a.classId];
  return c
    ? o.slot === 'weapon'
      ? !!o.weaponType && c.equipableWeaponTypes.includes(o.weaponType)
      : o.slot === 'armor'
        ? !!o.armorType && c.equipableArmorTypes.includes(o.armorType)
        : !0
    : !1;
}
function B1(a, u, o) {
  const c = zt[o],
    r = a.guild.members.find((b) => b.id === u);
  if (!c || !r || !xr(r, o) || Hp(a, o) <= 0) return a;
  let d = Ai(a, o, 1);
  const h = r.equipment[c.slot];
  return (
    h && (d = ms(d, h, 1)),
    qp(d, u, (b) => ({ ...b, equipment: { ...b.equipment, [c.slot]: o } }))
  );
}
function Er(a, u, o) {
  const c = a.guild.members.find((h) => h.id === u);
  if (!c) return a;
  const r = c.equipment[o];
  if (!r) return a;
  const d = ms(a, r, 1);
  return qp(d, u, (h) => ({ ...h, equipment: { ...h.equipment, [o]: null } }));
}
const an = (a) => ({ hp: 0, tp: 0, str: 0, vit: 0, agi: 0, int: 0, mnd: 0, luc: 0, ...a }),
  ga = {
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
  U1 = ['hp', 'tp', 'str', 'vit', 'agi', 'int', 'mnd', 'luc'];
function ji(a) {
  var b, v;
  const u = Kt[a.raceId];
  if (!u) throw new Error(`computeBaseStats: 未定義の種族 "${a.raceId}"`);
  const c = Math.max(1, Math.min(a.level, De.LEVEL_CAP)) - 1,
    r = a.titleId ? ((b = ga[a.titleId]) == null ? void 0 : b.growthModifier) : void 0,
    d = ((v = a.rebirthBonus) == null ? void 0 : v.allStats) ?? 0,
    h = {};
  for (const m of U1) {
    const _ = u.statGrowth[m] + ((r == null ? void 0 : r[m]) ?? 0);
    h[m] = u.baseStatsAtLv1[m] + _ * c + d;
  }
  return h;
}
const L1 = 3,
  kl = (a, u, o) => Math.max(u, Math.min(o, a)),
  H1 = {
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
function q1(a) {
  const u = { atk: 0, mat: 0, def: 0, mdf: 0 };
  for (const o of Object.values(a.equipment)) {
    if (!o) continue;
    const c = zt[o];
    c &&
      ((u.atk += c.bonuses.atk ?? 0),
      (u.mat += c.bonuses.mat ?? 0),
      (u.def += c.bonuses.def ?? 0),
      (u.mdf += c.bonuses.mdf ?? 0));
  }
  return u;
}
function G1(a, u) {
  var h;
  const o = a.guild.members.find((b) => b.id === u);
  if (!o) return null;
  const c = (h = a.diveState) == null ? void 0 : h.party.find((b) => b.charId === u),
    r = ji(o),
    d = a.guild.party.front.includes(u);
  return {
    id: u,
    name: o.name,
    side: 'ally',
    row: d ? 'front' : 'back',
    stats: r,
    equip: q1(o),
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
function Y1(a, u, o) {
  const c = Mn[a],
    r = D1(c, o);
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
function Gp(a, u, o, c, r) {
  const d = xa[a],
    h = Up(d.baseStats, Sr(u, d.refDepth)),
    b = r ?? h.hp;
  return {
    id: c,
    name: d.name,
    side: 'ally',
    row: 'front',
    stats: h,
    equip: {},
    hp: b,
    maxHp: h.hp,
    tp: 0,
    maxTp: 0,
    buffs: [],
    ailments: [],
    unionGauge: 0,
    isDown: b <= 0,
    isSummon: !0,
    summonKind: a,
    ownerId: o,
  };
}
function Fh(a, u, o = 'none') {
  var v, m;
  const c = ((v = a.diveState) == null ? void 0 : v.depth) ?? 1,
    d = [...a.guild.party.front, ...a.guild.party.back]
      .filter((_) => _ !== null)
      .map((_) => G1(a, _))
      .filter((_) => _ !== null),
    h = u.map((_, S) => Y1(_, S, c)),
    b = (((m = a.diveState) == null ? void 0 : m.persistentSummons) ?? [])
      .map((_, S) => Gp(_.summonKind, c, _.ownerId, `summon_persist_${S}`, _.hp))
      .filter((_) => !_.isDown);
  return {
    turn: 1,
    depth: c,
    allies: d,
    enemies: h,
    summons: b,
    log: [],
    outcome: 'ongoing',
    firstStrike: o,
    drops: [],
    consumedItems: [],
  };
}
const ft = (a, u) => (u === 'ally' ? a.allies : a.enemies).filter((o) => !o.isDown),
  Tr = (a) => a.summons.filter((u) => !u.isDown);
function Ml(a, u) {
  return (
    a.allies.find((o) => o.id === u) ??
    a.enemies.find((o) => o.id === u) ??
    a.summons.find((o) => o.id === u)
  );
}
const Yp = (a) => {
    var u;
    return (
      !!a.isSummon && !!a.summonKind && ((u = xa[a.summonKind]) == null ? void 0 : u.buffImmune)
    );
  },
  Xp = (a, u) => {
    var o;
    return ((o = a.resist) == null ? void 0 : o[u]) ?? 1;
  };
function Nr(a, u, o) {
  ((a.hp = kl(a.hp - u, 0, a.maxHp)),
    a.hp === 0 &&
      !a.isDown &&
      ((a.isDown = !0),
      (a.unionGauge = Math.floor(a.unionGauge / 2)),
      o.push({ text: `${a.name} は倒れた！` })));
}
function us(a, u) {
  a.isDown || (a.unionGauge = kl(a.unionGauge + u, 0, 100));
}
function lr(a, u) {
  Yp(a) ||
    ((a.buffs = a.buffs.filter((o) => !(o.stat === u.stat && o.stackGroup === u.stackGroup))),
    a.buffs.push(u));
}
function X1(a, u) {
  if (Yp(a)) return;
  const o = a.ailments.find((c) => c.type === u.type);
  if (o) {
    o.remainingTurns = Math.max(o.remainingTurns, u.remainingTurns);
    return;
  }
  a.ailments.push(u);
}
function V1(a, u, o) {
  return kl(a * (1 + (u.stats.luc - o.stats.luc) * De.AILMENT_LUC_K), 0, De.AILMENT_MAX);
}
function Vp(a, u, o, c) {
  const r = u.side === 'ally' ? 'enemy' : 'ally';
  switch (o) {
    case 'self':
      return [u];
    case 'allyAll':
      return u.side === 'ally' ? [...ft(a, 'ally'), ...Tr(a)] : ft(a, 'enemy');
    case 'allyOne': {
      const d = Ml(a, c);
      return d && d.side === u.side ? [d] : [u];
    }
    case 'enemyAll':
      return ft(a, r);
    case 'enemyRow':
    case 'enemyOne':
    default: {
      const d = Ml(a, c);
      return d && d.side === r && !d.isDown ? [d] : ft(a, r).slice(0, 1);
    }
  }
}
function Q1(a, u, o, c) {
  return Vp(a, u, o.target, c);
}
function Qp(a, u, o, c, r, d, h) {
  switch (o.kind) {
    case 'damage': {
      const b = o.hits ?? 1;
      for (const v of d)
        if (!v.isDown)
          for (let m = 0; m < b; m++) {
            const _ = Lp(
              u,
              v,
              { statBase: o.statBase, power: o.power(r), element: c, elementMultiplier: Xp(v, c) },
              h
            );
            _.hit
              ? (Nr(v, _.damage, a.log),
                us(v, 5),
                a.log.push({
                  text: `${u.name} の攻撃！ ${v.name} に ${_.damage} ダメージ${_.critical ? '（会心）' : ''}`,
                }))
              : a.log.push({ text: `${u.name} の攻撃は外れた` });
          }
      break;
    }
    case 'heal': {
      const b = o.amount(r);
      for (const v of d) v.isDown || (v.hp = kl(v.hp + b, 0, v.maxHp));
      a.log.push({ text: `${u.name} は回復魔法を使った（+${b}）` });
      break;
    }
    case 'buff': {
      for (const b of d)
        lr(b, {
          stat: o.stat,
          modifier: o.modifier(r),
          remainingTurns: o.turns,
          stackGroup: o.stackGroup,
        });
      a.log.push({ text: `${u.name} は態勢を整えた` });
      break;
    }
    case 'ailment': {
      for (const b of d) {
        if (b.isDown) continue;
        const v = V1(o.chance(r), u, b);
        h.next() < v &&
          (X1(b, { type: o.ailment, remainingTurns: o.turns, magnitude: o.magnitude }),
          a.log.push({ text: `${b.name} は${H1[o.ailment]}になった` }));
      }
      break;
    }
    case 'summon': {
      if (u.side !== 'ally') break;
      if (Tr(a).length >= L1) {
        a.log.push({ text: 'これ以上は召喚できない' });
        break;
      }
      const b = `summon_${a.turn}_${a.summons.length}`,
        v = Gp(o.summonKind, a.depth, u.id, b);
      (a.summons.push(v), a.log.push({ text: `${u.name} は ${v.name} を召喚した！` }));
      break;
    }
  }
}
function Vo(a, u, o, c) {
  var h;
  if (o.isDown) return;
  const r = u.enemyId
      ? (Mn[u.enemyId].attackElement ?? 'bash')
      : u.isSummon && u.summonKind
        ? (((h = xa[u.summonKind]) == null ? void 0 : h.attackElement) ?? 'bash')
        : 'bash',
    d = Lp(u, o, { statBase: 'str', power: 1, element: r, elementMultiplier: Xp(o, r) }, c);
  d.hit
    ? (Nr(o, d.damage, a.log),
      us(u, 5),
      us(o, 5),
      a.log.push({
        text: `${u.name} の攻撃！ ${o.name} に ${d.damage} ダメージ${d.critical ? '（会心）' : ''}`,
      }))
    : a.log.push({ text: `${u.name} の攻撃は外れた` });
}
const Ph = (a) => (a.length === 0 ? 0 : a.reduce((u, o) => u + o.stats.agi, 0) / a.length),
  $1 = (a) => a.ailments.some((u) => u.type === 'paralysis'),
  Ar = (a, u) => a.ailments.some((o) => o.type === u),
  Qo = (a) => Ar(a, 'armBind'),
  K1 = (a) => Ar(a, 'headBind'),
  Z1 = (a) => Ar(a, 'legBind');
function ep(a) {
  return a.effects.some((u) => u.kind === 'damage' && u.statBase === 'str');
}
function J1(a, u, o) {
  const c = xi[u.unionSkillId];
  if (!c) return;
  const r = Ml(a, u.actorId);
  if (!r || r.isDown || r.side !== 'ally') return;
  if (r.unionGauge < 100) {
    a.log.push({ text: `${r.name} はユニオンゲージが足りない` });
    return;
  }
  const d = new Set(u.participantIds);
  d.add(r.id);
  const h = [...d].map((_) => Ml(a, _)).filter((_) => !!_ && !_.isDown && _.side === 'ally');
  if (h.length < c.requiredParticipants) {
    a.log.push({ text: `${r.name} の${c.name}は参加人数が足りない` });
    return;
  }
  const b = [r, ...h.filter((_) => _.id !== r.id)].slice(0, c.requiredParticipants);
  for (const _ of b) _.unionGauge = kl(_.unionGauge - c.gaugeCostPerParticipant, 0, 100);
  a.log.push({ text: `ユニオン！ ${r.name} の${c.name}！` });
  const v = 1,
    m = Vp(a, r, c.target, u.targetId);
  for (const _ of c.effects) Qp(a, r, _, c.element, v, m, o);
}
function $o(a, u, o) {
  var S, k, z;
  if (a.outcome !== 'ongoing') return a;
  const c = structuredClone({ ...a, log: [] }),
    r = new Map(u.filter((g) => g.kind !== 'union').map((g) => [g.actorId, g])),
    d = c.turn === 1 && c.firstStrike !== 'none',
    h = d && c.firstStrike === 'preemptive',
    b = d && c.firstStrike === 'ambush';
  if (
    (h && c.log.push({ text: '先制攻撃！ 味方が先手を取った' }),
    b && c.log.push({ text: '不意打ち！ 敵に先手を取られた' }),
    !b)
  )
    for (const g of u) g.kind === 'union' && J1(c, g, o);
  const v = u.find((g) => g.kind === 'flee');
  if (!b && v && c.outcome === 'ongoing') {
    const g = Ml(c, v.actorId);
    if (g && Z1(g)) c.log.push({ text: `${g.name} は脚を封じられて逃げられない` });
    else {
      const C = kl(0.5 + (Ph(ft(c, 'ally')) - Ph(ft(c, 'enemy'))) * 0.02, 0.1, 0.95);
      if (o.next() < C)
        return (c.log.push({ text: 'うまく逃げ切れた！' }), (c.outcome = 'fled'), c);
      c.log.push({ text: '逃げられなかった！' });
    }
  }
  if (!b)
    for (const g of u) {
      if (g.kind !== 'guard') continue;
      const C = Ml(c, g.actorId);
      !C ||
        C.isDown ||
        (lr(C, { stat: 'pdef', modifier: 1.5, remainingTurns: 1, stackGroup: 'guard' }),
        lr(C, { stat: 'mdef', modifier: 1.5, remainingTurns: 1, stackGroup: 'guard' }));
    }
  const m = new Map();
  if (!h)
    for (const g of ft(c, 'enemy')) {
      const C = [...Tr(c), ...ft(c, 'ally')];
      C.length > 0 && m.set(g.id, o.pick(C).id);
    }
  const _ = [...c.allies, ...c.enemies, ...c.summons]
    .filter((g) => !g.isDown)
    .filter((g) => !(h && g.side === 'enemy') && !(b && g.side === 'ally'))
    .map((g) => ({ c: g, agi: g.stats.agi, tie: o.next() }))
    .sort((g, C) => C.agi - g.agi || C.tie - g.tie)
    .map((g) => g.c);
  for (const g of _)
    if (!g.isDown) {
      if (c.outcome !== 'ongoing') break;
      if ($1(g) && o.next() < De.PARALYSIS_SKIP) {
        c.log.push({ text: `${g.name} は麻痺で動けない` });
        continue;
      }
      if (g.isSummon) {
        const C = g.summonKind ? xa[g.summonKind] : void 0;
        if (C != null && C.actsOnTurn) {
          const E = ft(c, 'enemy');
          E.length > 0 && Vo(c, g, o.pick(E), o);
        }
        if (ft(c, 'enemy').length === 0) break;
        continue;
      }
      if (g.side === 'enemy') {
        if (Qo(g)) {
          c.log.push({ text: `${g.name} は腕を封じられて攻撃できない` });
          continue;
        }
        const C = m.get(g.id),
          E = C ? Ml(c, C) : void 0,
          U = E && !E.isDown ? E : ft(c, 'ally')[0];
        U && Vo(c, g, U, o);
      } else {
        const C = r.get(g.id);
        if (!C || C.kind === 'guard' || C.kind === 'flee') continue;
        if (C.kind === 'attack') {
          if (Qo(g)) {
            c.log.push({ text: `${g.name} は腕を封じられて攻撃できない` });
            continue;
          }
          const E = Ml(c, C.targetId),
            U = E && !E.isDown ? E : ft(c, 'enemy')[0];
          U && Vo(c, g, U, o);
        } else if (C.kind === 'skill') {
          const E = cn[C.skillId];
          if (!E) continue;
          if (ep(E) && Qo(g)) {
            c.log.push({ text: `${g.name} は腕を封じられてスキルを使えない` });
            continue;
          }
          if (!ep(E) && K1(g)) {
            c.log.push({ text: `${g.name} は頭を封じられてスキルを使えない` });
            continue;
          }
          const U = 1,
            K = E.tpCost(U);
          if (g.tp < K) {
            c.log.push({ text: `${g.name} は TP が足りない` });
            continue;
          }
          ((g.tp -= K), us(g, 10));
          const Q = Q1(c, g, E, C.targetId);
          for (const D of E.effects) Qp(c, g, D, E.element, U, Q, o);
        } else if (C.kind === 'item') {
          const E = ht[C.itemId];
          if (!E || !((S = E.useContext) != null && S.includes('battle'))) continue;
          const U = Ml(c, C.targetId) ?? g;
          for (const K of E.effects ?? [])
            K.kind === 'heal'
              ? (U.hp = kl(U.hp + K.amount(1), 0, U.maxHp))
              : K.kind === 'restoreTp' && (U.tp = kl(U.tp + K.amount(1), 0, U.maxTp));
          (c.consumedItems.push(C.itemId), c.log.push({ text: `${g.name} は ${E.name} を使った` }));
        }
      }
      if (ft(c, 'enemy').length === 0 || ft(c, 'ally').length === 0) break;
    }
  for (const g of [...c.allies, ...c.enemies, ...c.summons]) {
    if (g.isDown) continue;
    const C = g.ailments.find((E) => E.type === 'poison');
    if (C) {
      const E = C.magnitude ?? Math.max(1, Math.floor(g.maxHp * De.POISON_HP_RATIO));
      (Nr(g, E, c.log), c.log.push({ text: `${g.name} は毒で ${E} のダメージ` }));
    }
  }
  for (const g of [...c.allies, ...c.enemies, ...c.summons])
    (!g.isDown &&
      g.maxTp > 0 &&
      (g.tp = Math.min(g.maxTp, g.tp + Math.ceil(g.maxTp * De.TP_REGEN_RATIO))),
      (g.buffs = g.buffs
        .map((C) => ({ ...C, remainingTurns: C.remainingTurns - 1 }))
        .filter((C) => C.remainingTurns > 0)),
      (g.ailments = g.ailments
        .map((C) => ({ ...C, remainingTurns: C.remainingTurns - 1 }))
        .filter((C) => C.remainingTurns > 0)));
  for (const g of c.enemies)
    if (
      !(
        !g.isDown ||
        !g.enemyId ||
        (((k = a.enemies.find((E) => E.id === g.id)) == null ? void 0 : k.isDown) ?? !1)
      )
    )
      for (const E of Mn[g.enemyId].drops ?? [])
        o.next() < E.rate &&
          (c.drops.push({ enemyId: g.enemyId, itemId: E.itemId }),
          c.log.push({
            text: `${g.name} は ${((z = ht[E.itemId]) == null ? void 0 : z.name) ?? E.itemId} を落とした`,
          }));
  return (
    (c.summons = c.summons.filter((g) => !g.isDown)),
    (c.turn += 1),
    ft(c, 'enemy').length === 0
      ? (c.outcome = 'win')
      : ft(c, 'ally').length === 0 && (c.outcome = 'lose'),
    c
  );
}
function $p(a) {
  let u = 0,
    o = 0;
  for (const c of a.enemies) {
    if (!c.enemyId) continue;
    const r = Mn[c.enemyId],
      d = Sr(a.depth, r.refDepth);
    ((u += Math.round(r.exp * d)), (o += Math.round(r.gold * d)));
  }
  return { exp: u, gold: o };
}
function I1(a, u) {
  let o = a.level,
    c = a.exp + (Xo(o) ? u : 0),
    r = a.skillPoints.total;
  for (; Xo(o) && c >= Ih(o); ) ((c -= Ih(o)), (o += 1), (r += De.SP_PER_LEVEL));
  return {
    ...a,
    level: o,
    exp: Xo(a.level) ? c : a.exp,
    skillPoints: { ...a.skillPoints, total: r },
  };
}
function tp(a, u) {
  if (!a.diveState) return a;
  const o = u.outcome === 'win',
    c = u.outcome === 'win' || u.outcome === 'fled',
    r = new Map(u.allies.map((k) => [k.id, k])),
    d = a.diveState.party.map((k) => {
      const z = r.get(k.charId);
      if (!z) return k;
      let g = z.unionGauge;
      return (
        c && !z.isDown && (g = kl(g + De.UNION_GAIN_ON_WIN, 0, 100)),
        { ...k, hp: z.hp, tp: z.tp, unionGauge: g, ailments: z.ailments }
      );
    });
  let h = a.guild.members,
    b = a.guild.gold;
  const v = { ...a.bestiary.monsters };
  for (const k of u.enemies) {
    if (!k.enemyId) continue;
    const z = v[k.enemyId] ?? { seen: !1, defeated: !1, dropsFound: [] };
    v[k.enemyId] = { ...z, seen: !0, defeated: z.defeated || k.isDown };
  }
  if (o)
    for (const k of u.drops) {
      const z = v[k.enemyId];
      z &&
        !z.dropsFound.includes(k.itemId) &&
        (v[k.enemyId] = { ...z, dropsFound: [...z.dropsFound, k.itemId] });
    }
  const m = { ...a.bestiary, monsters: v };
  if (o) {
    const { exp: k, gold: z } = $p(u);
    b += z;
    const g = new Set(d.map((E) => E.charId)),
      C = g.size > 0 ? Math.floor(k / g.size) : 0;
    h = h.map((E) => (g.has(E.id) ? I1(E, C) : E));
  }
  const _ = u.summons
    .filter((k) => {
      var z;
      return (
        !k.isDown &&
        k.summonKind &&
        ((z = xa[k.summonKind]) == null ? void 0 : z.persistsAfterBattle)
      );
    })
    .map((k) => ({ summonKind: k.summonKind, ownerId: k.ownerId ?? '', hp: k.hp }));
  let S = {
    ...a,
    guild: { ...a.guild, members: h, gold: b, bestiary: m },
    bestiary: m,
    diveState: { ...a.diveState, party: d, persistentSummons: _ },
  };
  for (const k of u.consumedItems) S = Ai(S, k, 1);
  if (o) for (const k of u.drops) S = ms(S, k.itemId, 1);
  return S;
}
const W1 = 8,
  nr = 16,
  Ti = 5;
function Cr(a) {
  return a.range(W1, nr);
}
function F1(a, u) {
  const o = a - 1;
  return o <= 0
    ? { stepsUntilEncounter: Cr(u), triggered: !0 }
    : { stepsUntilEncounter: o, triggered: !1 };
}
function P1(a) {
  const u = Math.max(0, nr - a),
    o = Math.round((u / nr) * Ti);
  return Math.min(Ti, Math.max(0, o));
}
const $t = { N: { dx: 0, dy: -1 }, E: { dx: 1, dy: 0 }, S: { dx: 0, dy: 1 }, W: { dx: -1, dy: 0 } },
  va = ['N', 'E', 'S', 'W'];
function Kp(a) {
  return va[(va.indexOf(a) + 1) % 4];
}
function Zp(a) {
  return va[(va.indexOf(a) + 3) % 4];
}
function eb(a) {
  return va[(va.indexOf(a) + 2) % 4];
}
const tb = (a, u, o) => a >= 0 && u >= 0 && a < o.width && u < o.height;
function ya(a, u, o, c) {
  if (a.cells[o][u].walls[c]) return !1;
  const r = u + $t[c].dx,
    d = o + $t[c].dy;
  return tb(r, d, a) ? a.cells[d][r].passable : !1;
}
function lb(a, u, o) {
  return ya(a, u.x, u.y, o) ? { x: u.x + $t[o].dx, y: u.y + $t[o].dy } : null;
}
function Mr(a, u, o) {
  return ['N', 'E', 'S', 'W'].filter((c) => !a.cells[o][u].walls[c]);
}
const lp = ['N', 'E', 'S', 'W'],
  Ko = (a, u) => Math.abs(a.x - u.x) + Math.abs(a.y - u.y);
function nb(a, u, o, c, r) {
  const d = u.map((_) => ({ ..._, cell: { ..._.cell } })),
    h = new Map(a.foeSpawns.map((_) => [_.id, _])),
    b = new Set(d.filter((_) => !_.defeated).map((_) => `${_.cell.x},${_.cell.y}`));
  let v = null;
  const m = [...d].sort((_, S) => _.spawnId.localeCompare(S.spawnId, void 0, { numeric: !0 }));
  for (const _ of m) {
    if (v) break;
    if (_.defeated) continue;
    const S = h.get(_.spawnId);
    if (!S) continue;
    !_.alerted && Ko(_.cell, o) <= S.sightRange && (_.alerted = !0);
    const k = (z) => {
      if (!ya(a, _.cell.x, _.cell.y, z)) return 'blocked';
      const g = _.cell.x + $t[z].dx,
        C = _.cell.y + $t[z].dy;
      if (g === o.x && C === o.y) {
        const E = z === c;
        return (
          (v = { spawnId: _.spawnId, enemyId: S.enemyId, firstStrike: E ? 'ambush' : 'none' }),
          'contact'
        );
      }
      return b.has(`${g},${C}`)
        ? 'blocked'
        : (b.delete(`${_.cell.x},${_.cell.y}`),
          (_.cell = { x: g, y: C }),
          b.add(`${g},${C}`),
          'moved');
    };
    if (_.alerted)
      for (let z = 0; z < S.moveSpeed; z++) {
        let g = null,
          C = Ko(_.cell, o),
          E = !1;
        for (const K of lp) {
          const Q = _.cell.x + $t[K].dx,
            D = _.cell.y + $t[K].dy;
          if (Q === o.x && D === o.y && ya(a, _.cell.x, _.cell.y, K)) {
            ((g = K), (E = !0));
            break;
          }
          if (!ya(a, _.cell.x, _.cell.y, K) || b.has(`${Q},${D}`)) continue;
          const L = Ko({ x: Q, y: D }, o);
          L < C && ((C = L), (g = K));
        }
        if (!g) break;
        const U = k(g);
        if (U === 'contact' || U === 'blocked' || E) break;
      }
    else {
      const z = S.patrol;
      if (z.kind === 'wander') {
        const g = lp.filter(
          (C) =>
            ya(a, _.cell.x, _.cell.y, C) && !b.has(`${_.cell.x + $t[C].dx},${_.cell.y + $t[C].dy}`)
        );
        g.length > 0 && k(r.pick(g));
      } else z.kind === 'charge' && k(z.dir);
    }
  }
  return { foes: d, contact: v };
}
function ab(a) {
  return Object.values(Mn)
    .filter((u) => u.tierBand === a && !u.id.startsWith('enemy_boss'))
    .map((u) => u.id);
}
const Cl = { N: { dx: 0, dy: -1 }, E: { dx: 1, dy: 0 }, S: { dx: 0, dy: 1 }, W: { dx: -1, dy: 0 } },
  ib = { N: 'S', E: 'W', S: 'N', W: 'E' };
function ub(a) {
  return Math.min(25, 15 + Math.floor(a / 5));
}
function sb() {
  return { walls: { N: !0, E: !0, S: !0, W: !0 }, floorType: 'normal', passable: !0 };
}
const ar = (a, u, o, c) => a >= 0 && u >= 0 && a < o && u < c;
function np(a, u, o, c) {
  const { dx: r, dy: d } = Cl[c];
  ((a[o][u].walls[c] = !1), (a[o + d][u + r].walls[ib[c]] = !1));
}
function cb(a, u, o) {
  const c = a.length,
    r = a[0].length,
    d = Array.from({ length: c }, () => Array(r).fill(-1)),
    h = [{ x: u, y: o }];
  d[o][u] = 0;
  for (let b = 0; b < h.length; b++) {
    const { x: v, y: m } = h[b];
    for (const _ of ['N', 'E', 'S', 'W']) {
      if (a[m][v].walls[_]) continue;
      const S = v + Cl[_].dx,
        k = m + Cl[_].dy;
      !ar(S, k, r, c) || d[k][S] !== -1 || ((d[k][S] = d[m][v] + 1), h.push({ x: S, y: k }));
    }
  }
  return d;
}
function ob(a, u) {
  const o = ub(a),
    c = o,
    r = o,
    d = Array.from({ length: r }, () => Array.from({ length: c }, () => sb())),
    h = Array.from({ length: r }, () => Array(c).fill(!1)),
    b = u.int(c),
    v = u.int(r),
    m = [{ x: b, y: v }];
  for (h[v][b] = !0; m.length > 0; ) {
    const Q = m[m.length - 1],
      D = [];
    for (const B of ['N', 'E', 'S', 'W']) {
      const F = Q.x + Cl[B].dx,
        le = Q.y + Cl[B].dy;
      ar(F, le, c, r) && !h[le][F] && D.push(B);
    }
    if (D.length === 0) {
      m.pop();
      continue;
    }
    const L = u.pick(D);
    np(d, Q.x, Q.y, L);
    const Z = Q.x + Cl[L].dx,
      $ = Q.y + Cl[L].dy;
    ((h[$][Z] = !0), m.push({ x: Z, y: $ }));
  }
  const _ = Math.floor((c * r) / 25);
  for (let Q = 0; Q < _; Q++) {
    const D = u.int(c),
      L = u.int(r),
      Z = u.pick(['N', 'E', 'S', 'W']),
      $ = D + Cl[Z].dx,
      B = L + Cl[Z].dy;
    ar($, B, c, r) && d[L][D].walls[Z] && np(d, D, L, Z);
  }
  const S = u.int(c),
    k = u.int(r),
    z = cb(d, S, k);
  let g = S,
    C = k,
    E = -1;
  for (let Q = 0; Q < r; Q++)
    for (let D = 0; D < c; D++) z[Q][D] > E && ((E = z[Q][D]), (g = D), (C = Q));
  ((d[k][S].event = { kind: 'stairsDown' }), (d[C][g].event = { kind: 'stairsUp' }));
  const U = Math.floor((a - 1) / 10),
    K = [];
  if (!as(a)) {
    const Q = ab(U),
      D = 1 + Math.floor(a / 8);
    for (let L = 0; L < D && Q.length > 0; L++) {
      let Z = u.int(c),
        $ = u.int(r);
      for (let B = 0; B < 20; B++) {
        ((Z = u.int(c)), ($ = u.int(r)));
        const F = d[$][Z].event,
          le = Math.abs(Z - S) + Math.abs($ - k) >= 3;
        if (!F && le) break;
      }
      K.push({
        id: `foe_${L}`,
        enemyId: u.pick(Q),
        startCell: { x: Z, y: $ },
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
    encounterTable: `band_${U}`,
    foeSpawns: K,
    bgmId: as(a) ? 'bgm_boss' : 'bgm_dungeon',
  };
}
function Jp(a, u) {
  var o;
  for (let c = 0; c < a.height; c++)
    for (let r = 0; r < a.width; r++)
      if (((o = a.cells[c][r].event) == null ? void 0 : o.kind) === u) return { x: r, y: c };
  return null;
}
const rb = 4294967296;
function fb(a, u) {
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
class kr {
  constructor(u, o) {
    Do(this, 'baseSeed');
    Do(this, '_state');
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
      ((u ^ (u >>> 14)) >>> 0) / rb
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
    const o = fb(this.baseSeed, u);
    return new kr(o, o);
  }
}
function Ea(a) {
  return new kr(a, a);
}
function db() {
  return Math.floor(Math.random() * 4294967296) >>> 0;
}
const ap = (a, u) => `${a},${u}`;
function mb(a, u) {
  return Ea(a).fork(`floor:${u}`);
}
function Ip(a, u) {
  const o = a.towerState.floors[u];
  if (o) return { save: a, floor: o };
  const c = ob(u, mb(a.masterSeed, u)),
    r = c.foeSpawns.map((b) => ({
      spawnId: b.id,
      cell: { ...b.startCell },
      defeated: !1,
      alerted: !1,
    })),
    d = {
      depth: u,
      seed: a.masterSeed,
      generated: c,
      isBossFloor: as(u),
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
function hb(a) {
  const u = [...a.guild.party.front, ...a.guild.party.back].filter((c) => c !== null),
    o = [];
  for (const c of u) {
    const r = a.guild.members.find((h) => h.id === c);
    if (!r) continue;
    const d = ji(r);
    o.push({ charId: c, hp: d.hp, tp: d.tp, unionGauge: 0, ailments: [] });
  }
  return o;
}
function ss(a, u, o, c) {
  const r = a.towerState.floors[u].generated,
    d = new Set(a.exploredCells[u] ?? []);
  d.add(ap(o, c));
  for (const h of Mr(r, o, c)) {
    const b = o + (h === 'E' ? 1 : h === 'W' ? -1 : 0),
      v = c + (h === 'S' ? 1 : h === 'N' ? -1 : 0);
    d.add(ap(b, v));
  }
  return { ...a, exploredCells: { ...a.exploredCells, [u]: [...d] } };
}
function Wp(a, u, o) {
  var v, m;
  const c = Ip(a, u);
  let r = c.save;
  const d = c.floor.generated,
    h = Jp(d, 'stairsDown') ?? { x: 0, y: 0 },
    b = Mr(d, h.x, h.y)[0] ?? 'N';
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
        dir: b,
        party: ((v = r.diveState) == null ? void 0 : v.party) ?? hb(r),
        persistentSummons: ((m = r.diveState) == null ? void 0 : m.persistentSummons) ?? [],
        encounter: { stepsUntilEncounter: Cr(o) },
        pendingFoeBattle: null,
      },
    }),
    ss(r, u, h.x, h.y)
  );
}
function pb(a, u = 1) {
  const o = Ea(a.masterSeed).fork(`dive:${a.towerState.record.totalDives}`),
    c = {
      ...a,
      diveState: null,
      towerState: {
        ...a.towerState,
        record: { ...a.towerState.record, totalDives: a.towerState.record.totalDives + 1 },
      },
    };
  return Wp(c, u, o);
}
function Fp(a, u) {
  return a.diveState ? { ...a, diveState: { ...a.diveState, dir: u } } : a;
}
function Pp(a, u, o) {
  const c = a.towerState.floors[u];
  return {
    ...a,
    towerState: {
      ...a.towerState,
      floors: { ...a.towerState.floors, [u]: { ...c, foeRuntime: o } },
    },
  };
}
function yb(a, u, o) {
  const c = a.diveState;
  if (!c) return { save: a, moved: !1, triggered: !1 };
  const r = a.towerState.floors[c.depth],
    d = r.generated,
    h = lb(d, c.pos, u);
  if (!h) return { save: Fp(a, u), moved: !1, triggered: !1 };
  const b = r.foeRuntime.find((S) => !S.defeated && S.cell.x === h.x && S.cell.y === h.y);
  if (b) {
    const S = d.foeSpawns.find((g) => g.id === b.spawnId),
      k = S ? { spawnId: b.spawnId, enemyId: S.enemyId, firstStrike: 'preemptive' } : null;
    let z = { ...a, diveState: { ...c, pos: h, dir: u, pendingFoeBattle: k } };
    return ((z = ss(z, c.depth, h.x, h.y)), { save: z, moved: !0, triggered: k !== null });
  }
  const v = F1(c.encounter.stepsUntilEncounter, o);
  let m = {
    ...a,
    diveState: {
      ...c,
      pos: h,
      dir: u,
      encounter: { stepsUntilEncounter: v.stepsUntilEncounter },
      pendingFoeBattle: null,
    },
  };
  m = ss(m, c.depth, h.x, h.y);
  const _ = nb(d, r.foeRuntime, h, u, o);
  return (
    (m = Pp(m, c.depth, _.foes)),
    _.contact
      ? ((m = {
          ...m,
          diveState: {
            ...m.diveState,
            pendingFoeBattle: {
              spawnId: _.contact.spawnId,
              enemyId: _.contact.enemyId,
              firstStrike: _.contact.firstStrike,
            },
          },
        }),
        { save: m, moved: !0, triggered: !0 })
      : { save: m, moved: !0, triggered: v.triggered }
  );
}
function gb(a, u) {
  const o = a.diveState;
  if (!o) return a;
  const c = o.pendingFoeBattle;
  let r = { ...a, diveState: { ...o, pendingFoeBattle: null } };
  if (c && u) {
    const h = r.towerState.floors[o.depth].foeRuntime.map((b) =>
      b.spawnId === c.spawnId ? { ...b, defeated: !0 } : b
    );
    r = Pp(r, o.depth, h);
  }
  return r;
}
function ip(a) {
  const u = a.diveState;
  if (!u) return null;
  const o = a.towerState.floors[u.depth].generated.cells[u.pos.y][u.pos.x].event;
  return (o == null ? void 0 : o.kind) === 'stairsUp' ||
    (o == null ? void 0 : o.kind) === 'stairsDown'
    ? o.kind
    : null;
}
function vb(a) {
  if (!a.diveState) return a;
  const u = a.diveState.depth + 1,
    o = Ea(a.masterSeed).fork(`enc:${u}:${a.towerState.record.totalDives}`);
  return Wp(a, u, o);
}
function _b(a) {
  if (!a.diveState) return a;
  const u = a.diveState.depth;
  if (u <= 1) return Ci(a);
  const o = u - 1,
    c = Ip(a, o),
    r = Jp(c.floor.generated, 'stairsUp') ?? { x: 0, y: 0 },
    d = Ea(a.masterSeed).fork(`enc:${o}:${a.towerState.record.totalDives}`);
  let h = c.save;
  const b = c.floor.generated,
    v = Mr(b, r.x, r.y)[0] ?? 'N';
  return (
    (h = {
      ...h,
      diveState: {
        ...h.diveState,
        depth: o,
        pos: { x: r.x, y: r.y },
        dir: v,
        encounter: { stepsUntilEncounter: Cr(d) },
        pendingFoeBattle: null,
      },
    }),
    ss(h, o, r.x, r.y)
  );
}
function Ci(a) {
  return { ...a, diveState: null };
}
const bb = { 10: 'enemy_boss_gatekeeper' };
function Sb(a) {
  const u = Math.floor((a - 1) / 10);
  return Object.values(Mn)
    .filter((o) => o.tierBand === u && !o.id.startsWith('enemy_boss'))
    .map((o) => o.id);
}
function xb(a, u) {
  if (as(a)) {
    const r = bb[a];
    if (r) return [r];
  }
  const o = Sb(a);
  if (o.length === 0) return [];
  const c = u.range(1, 3);
  return Array.from({ length: c }, () => u.pick(o));
}
const ts = 1,
  Eb = { autoMap: 'on', bgmVolume: 0.6, seVolume: 0.6 };
function up() {
  return { monsters: {}, items: {} };
}
function Tb() {
  return { deepestReached: 0, highestBossDefeated: 0, totalDives: 0, bossDefeatLog: [] };
}
const Nb = () => ({ weapon: null, armor: null, accessory: null });
function Ab() {
  return `char_${Date.now().toString(36)}_${Math.floor(Math.random() * 16777215).toString(36)}`;
}
function ey(a) {
  var b;
  const { raceId: u, classId: o, name: c, id: r } = a;
  if (!Kt[u]) throw new Error(`createCharacter: 未定義の種族 "${u}"`);
  if (!dt[o]) throw new Error(`createCharacter: 未定義の職業 "${o}"`);
  const d = (b = dt[o].skillTree.skills[0]) == null ? void 0 : b.skillId,
    h = d ? { [d]: 1 } : {};
  return {
    id: r ?? Ab(),
    name: c,
    raceId: u,
    classId: o,
    titleId: null,
    level: 1,
    exp: 0,
    skillPoints: { total: 0, spent: 0 },
    learnedSkills: h,
    equipment: Nb(),
  };
}
function Cb() {
  return { front: Array(fs).fill(null), back: Array(ds).fill(null) };
}
function Mb(a, u) {
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
function kb(a, u) {
  return a.guild.members.length >= tr
    ? a
    : {
        ...a,
        guild: { ...a.guild, members: [...a.guild.members, u], party: Mb(a.guild.party, u.id) },
      };
}
function Rb(a) {
  return {
    schemaVersion: ts,
    savedAt: 0,
    masterSeed: db(),
    settings: { ...Eb },
    guild: { name: a, gold: M1, members: [], party: Cb(), storage: [], bestiary: up() },
    towerState: { floors: {}, bossGates: {}, warp: { unlockedCheckpoints: [] }, record: Tb() },
    diveState: null,
    bestiary: up(),
    playerMaps: {},
    exploredCells: {},
    forgeInventory: { fragments: {}, ingots: { copper: 0, silver: 0, gold: 0 } },
    shopStock: { unlockedTier: 0, unlockedItemIds: [] },
    flags: {},
  };
}
const ir = (a, u) => u.some((o) => a instanceof o);
let sp, cp;
function jb() {
  return sp || (sp = [IDBDatabase, IDBObjectStore, IDBIndex, IDBCursor, IDBTransaction]);
}
function Ob() {
  return (
    cp ||
    (cp = [
      IDBCursor.prototype.advance,
      IDBCursor.prototype.continue,
      IDBCursor.prototype.continuePrimaryKey,
    ])
  );
}
const ur = new WeakMap(),
  Zo = new WeakMap(),
  hs = new WeakMap();
function Db(a) {
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
  return (hs.set(u, a), u);
}
function zb(a) {
  if (ur.has(a)) return;
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
  ur.set(a, u);
}
let sr = {
  get(a, u, o) {
    if (a instanceof IDBTransaction) {
      if (u === 'done') return ur.get(a);
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
function ty(a) {
  sr = a(sr);
}
function wb(a) {
  return Ob().includes(a)
    ? function (...u) {
        return (a.apply(cr(this), u), Cn(this.request));
      }
    : function (...u) {
        return Cn(a.apply(cr(this), u));
      };
}
function Bb(a) {
  return typeof a == 'function'
    ? wb(a)
    : (a instanceof IDBTransaction && zb(a), ir(a, jb()) ? new Proxy(a, sr) : a);
}
function Cn(a) {
  if (a instanceof IDBRequest) return Db(a);
  if (Zo.has(a)) return Zo.get(a);
  const u = Bb(a);
  return (u !== a && (Zo.set(a, u), hs.set(u, a)), u);
}
const cr = (a) => hs.get(a);
function Ub(a, u, { blocked: o, upgrade: c, blocking: r, terminated: d } = {}) {
  const h = indexedDB.open(a, u),
    b = Cn(h);
  return (
    c &&
      h.addEventListener('upgradeneeded', (v) => {
        c(Cn(h.result), v.oldVersion, v.newVersion, Cn(h.transaction), v);
      }),
    o && h.addEventListener('blocked', (v) => o(v.oldVersion, v.newVersion, v)),
    b
      .then((v) => {
        (d && v.addEventListener('close', () => d()),
          r && v.addEventListener('versionchange', (m) => r(m.oldVersion, m.newVersion, m)));
      })
      .catch(() => {}),
    b
  );
}
const Lb = ['get', 'getKey', 'getAll', 'getAllKeys', 'count'],
  Hb = ['put', 'add', 'delete', 'clear'],
  Jo = new Map();
function op(a, u) {
  if (!(a instanceof IDBDatabase && !(u in a) && typeof u == 'string')) return;
  if (Jo.get(u)) return Jo.get(u);
  const o = u.replace(/FromIndex$/, ''),
    c = u !== o,
    r = Hb.includes(o);
  if (!(o in (c ? IDBIndex : IDBObjectStore).prototype) || !(r || Lb.includes(o))) return;
  const d = async function (h, ...b) {
    const v = this.transaction(h, r ? 'readwrite' : 'readonly');
    let m = v.store;
    return (c && (m = m.index(b.shift())), (await Promise.all([m[o](...b), r && v.done]))[0]);
  };
  return (Jo.set(u, d), d);
}
ty((a) => ({
  ...a,
  get: (u, o, c) => op(u, o) || a.get(u, o, c),
  has: (u, o) => !!op(u, o) || a.has(u, o),
}));
const qb = ['continue', 'continuePrimaryKey', 'advance'],
  rp = {},
  or = new WeakMap(),
  ly = new WeakMap(),
  Gb = {
    get(a, u) {
      if (!qb.includes(u)) return a[u];
      let o = rp[u];
      return (
        o ||
          (o = rp[u] =
            function (...c) {
              or.set(this, ly.get(this)[u](...c));
            }),
        o
      );
    },
  };
async function* Yb(...a) {
  let u = this;
  if ((u instanceof IDBCursor || (u = await u.openCursor(...a)), !u)) return;
  u = u;
  const o = new Proxy(u, Gb);
  for (ly.set(o, u), hs.set(o, cr(u)); u; )
    (yield o, (u = await (or.get(o) || u.continue())), or.delete(o));
}
function fp(a, u) {
  return (
    (u === Symbol.asyncIterator && ir(a, [IDBIndex, IDBObjectStore, IDBCursor])) ||
    (u === 'iterate' && ir(a, [IDBIndex, IDBObjectStore]))
  );
}
ty((a) => ({
  ...a,
  get(u, o, c) {
    return fp(u, o) ? Yb : a.get(u, o, c);
  },
  has(u, o) {
    return fp(u, o) || a.has(u, o);
  },
}));
const Xb = {};
function Vb(a) {
  return structuredClone(a);
}
function Si(a) {
  return typeof a == 'object' && a !== null && !Array.isArray(a);
}
function Qb(a) {
  if (
    !Si(a) ||
    typeof a.schemaVersion != 'number' ||
    typeof a.masterSeed != 'number' ||
    !Si(a.guild)
  )
    return !1;
  const u = a.guild;
  return !(
    typeof u.name != 'string' ||
    !Array.isArray(u.members) ||
    !Si(a.towerState) ||
    !Si(a.towerState.record) ||
    typeof a.towerState.record.deepestReached != 'number'
  );
}
function ny(a) {
  if (!Si(a) || typeof a.schemaVersion != 'number')
    return { ok: !1, reason: 'セーブデータの構造が不正です' };
  let u = a.schemaVersion;
  if (u > ts) return { ok: !1, reason: `未知のバージョン (${u} > ${ts}) のセーブデータです` };
  let o = { ...a };
  for (; u < ts; ) {
    const c = Xb[u];
    if (!c) return { ok: !1, reason: `バージョン ${u} の migration が未定義です` };
    ((o = c(o)), (u = typeof o.schemaVersion == 'number' ? o.schemaVersion : u + 1));
  }
  return Qb(o)
    ? { ok: !0, data: o }
    : { ok: !1, reason: 'migration 後のデータが SaveData の形をしていません' };
}
function $b(a) {
  return {
    guildName: a.guild.name,
    deepestReached: a.towerState.record.deepestReached,
    memberCount: a.guild.members.length,
    savedAt: a.savedAt,
  };
}
function dp() {
  return {
    guildName: '(破損データ)',
    deepestReached: 0,
    memberCount: 0,
    savedAt: 0,
    corrupted: !0,
  };
}
const Kb = 'sekaiju-like-game',
  Zb = 1,
  Mi = 'saves',
  Rr = 'main';
let Io = null;
function jr() {
  return (
    Io ||
      (Io = Ub(Kb, Zb, {
        upgrade(a) {
          a.objectStoreNames.contains(Mi) || a.createObjectStore(Mi);
        },
      })),
    Io
  );
}
async function Wo(a) {
  const u = { ...a, savedAt: Date.now() };
  return (await (await jr()).put(Mi, Vb(u), Rr), u);
}
async function Jb() {
  const u = await (await jr()).get(Mi, Rr);
  return u === void 0 ? { ok: !1, reason: 'empty' } : ny(u);
}
async function Ib() {
  const u = await (await jr()).get(Mi, Rr);
  if (u === void 0) return null;
  const o = ny(u);
  if (!o.ok) return dp();
  try {
    return $b(o.data);
  } catch {
    return dp();
  }
}
const ay = { save: null, saving: !1 };
function Wb(a, u) {
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
      return { ...ay };
  }
}
const iy = A.createContext(null);
function Fb(a) {
  const u = A.useRef(a);
  return ((u.current = a), u);
}
function Pb({ children: a }) {
  const [u, o] = A.useReducer(Wb, ay),
    c = Fb(u),
    r = A.useCallback(async (S) => {
      const k = Rb(S),
        z = await Wo(k);
      o({ type: 'load', save: z });
    }, []),
    d = A.useCallback(async () => {
      const S = await Jb();
      return S.ok ? (o({ type: 'load', save: S.data }), { ok: !0 }) : { ok: !1, reason: S.reason };
    }, []),
    h = A.useCallback((S) => {
      o({ type: 'updateSave', updater: S });
    }, []),
    b = A.useCallback(
      async (S) => {
        const k = c.current.save;
        if (!k) return;
        const z = S(k);
        (o({ type: 'setSave', save: z }), o({ type: 'saving', saving: !0 }));
        try {
          const g = await Wo(z);
          o({ type: 'setSave', save: g });
        } finally {
          o({ type: 'saving', saving: !1 });
        }
      },
      [c]
    ),
    v = A.useCallback(async () => {
      const { save: S } = c.current;
      if (S) {
        o({ type: 'saving', saving: !0 });
        try {
          const k = await Wo(S);
          o({ type: 'setSave', save: k });
        } finally {
          o({ type: 'saving', saving: !1 });
        }
      }
    }, [c]),
    m = A.useCallback(() => {
      o({ type: 'clear' });
    }, []),
    _ = A.useMemo(
      () => ({
        ...u,
        startNewGame: r,
        continueGame: d,
        applySave: h,
        applyAndPersist: b,
        persist: v,
        exitToTitle: m,
      }),
      [u, r, d, h, b, v, m]
    );
  return y.jsx(iy.Provider, { value: _, children: a });
}
function kn() {
  const a = A.useContext(iy);
  if (!a) throw new Error('useGameState は GameStateProvider の内側で使ってください');
  return a;
}
const eS = () => {
    var tt, Ge;
    const a = Ol(),
      { save: u, applyAndPersist: o } = kn(),
      c = A.useRef(null),
      [r, d] = A.useState(null),
      [h, b] = A.useState({}),
      [v, m] = A.useState(null),
      [_, S] = A.useState(!1),
      [k, z] = A.useState(!1),
      [g, C] = A.useState(null),
      [E, U] = A.useState(!1),
      [K, Q] = A.useState(null),
      [D, L] = A.useState(null);
    A.useEffect(() => {
      if (r || !(u != null && u.diveState)) return;
      const Y = u.diveState.depth,
        ae = (u.masterSeed ^ (Y * 2654435761) ^ (u.towerState.record.totalDives * 40503)) >>> 0;
      c.current = Ea(ae);
      const ce = u.diveState.pendingFoeBattle;
      d(ce ? Fh(u, [ce.enemyId], ce.firstStrike) : Fh(u, xb(Y, c.current)));
    }, [u, r]);
    const Z = A.useRef(!1);
    A.useEffect(() => {
      !r ||
        !c.current ||
        Z.current ||
        (r.turn === 1 &&
          r.firstStrike === 'ambush' &&
          r.outcome === 'ongoing' &&
          ((Z.current = !0), d($o(r, [], c.current))));
    }, [r]);
    const $ = A.useMemo(() => (r == null ? void 0 : r.enemies.filter((Y) => !Y.isDown)) ?? [], [r]),
      B = A.useMemo(() => (r == null ? void 0 : r.allies.filter((Y) => !Y.isDown)) ?? [], [r]);
    (A.useEffect(() => {
      $.length > 0 && !$.some((Y) => Y.id === g) && C($[0].id);
    }, [$, g]),
      A.useEffect(() => {
        if ((r == null ? void 0 : r.outcome) !== 'ongoing' || (v && B.some((ae) => ae.id === v)))
          return;
        const Y = B.find((ae) => !h[ae.id]) ?? null;
        m(Y ? Y.id : null);
      }, [r, B, v, h]));
    const F = B.length > 0 && B.every((Y) => h[Y.id] !== void 0),
      le = A.useCallback(
        (Y, ae) => {
          const ce = { ...h, [Y]: ae };
          (b(ce), S(!1), z(!1));
          const Ae = B.find((Se) => Se.id !== Y && !ce[Se.id]);
          m(Ae ? Ae.id : null);
        },
        [h, B]
      ),
      re = A.useCallback(
        async (Y) => {
          U(!0);
          const ae = Y.outcome === 'win';
          Y.outcome === 'lose'
            ? (await o((ce) => Ci(tp(ce, Y))), a('/town'))
            : (await o((ce) => gb(tp(ce, Y), ae)), a('/dungeon'));
        },
        [o, a]
      ),
      de = A.useCallback(() => {
        var Y;
        (b({}), S(!1), z(!1), Q(null), L(null), m(((Y = B[0]) == null ? void 0 : Y.id) ?? null));
      }, [B]),
      at = A.useCallback(() => {
        var Ae;
        if (!r || !c.current || r.outcome !== 'ongoing') return;
        const Y = g ?? ((Ae = $[0]) == null ? void 0 : Ae.id) ?? '',
          ae = B.map((Se) => {
            const yt = h[Se.id] ?? { kind: 'attack' };
            return yt.kind === 'guard'
              ? { kind: 'guard', actorId: Se.id }
              : yt.kind === 'skill'
                ? { kind: 'skill', actorId: Se.id, skillId: yt.skillId, targetId: Y }
                : yt.kind === 'item'
                  ? { kind: 'item', actorId: Se.id, itemId: yt.itemId, targetId: Se.id }
                  : { kind: 'attack', actorId: Se.id, targetId: Y };
          });
        if (K) {
          const Se = xi[K.unionSkillId],
            yt =
              (Se == null ? void 0 : Se.target) === 'enemyOne' ||
              (Se == null ? void 0 : Se.target) === 'enemyRow' ||
              (Se == null ? void 0 : Se.target) === 'enemyAll';
          ae.unshift({ kind: 'union', ...K, targetId: yt ? Y : K.targetId });
        }
        const ce = $o(r, ae, c.current);
        (d(ce), b({}), S(!1), z(!1), Q(null), L(null), m(null));
      }, [r, h, g, B, $, K]),
      pt = A.useCallback(() => {
        if (!r || !c.current || r.outcome !== 'ongoing') return;
        const Y = B[0];
        Y && (d($o(r, [{ kind: 'flee', actorId: Y.id }], c.current)), b({}), m(null));
      }, [r, B]);
    if (!u || !u.diveState) return y.jsx(jl, { to: '/town', replace: !0 });
    if (!r) return y.jsx('div', { className: W.layout, children: '戦闘準備中...' });
    const qe = (Y) => {
        const ae = u.guild.members.find((ce) => ce.id === Y.id);
        return ae
          ? Object.keys(ae.learnedSkills).filter((ce) => ce in cn && Y.tp >= cn[ce].tpCost(1))
          : [];
      },
      H = () => {
        const Y = (ce) =>
            Object.values(h).filter((Ae) => Ae.kind === 'item' && Ae.itemId === ce).length,
          ae = (ce) => r.consumedItems.filter((Ae) => Ae === ce).length;
        return u.guild.storage
          .filter((ce) => {
            var Ae, Se;
            return (Se = (Ae = ht[ce.itemId]) == null ? void 0 : Ae.useContext) == null
              ? void 0
              : Se.includes('battle');
          })
          .map((ce) => ({
            id: ce.itemId,
            remaining: Hp(u, ce.itemId) - ae(ce.itemId) - Y(ce.itemId),
          }))
          .filter((ce) => ce.remaining > 0);
      },
      J = (Y) => {
        var ce, Ae;
        const ae = h[Y.id];
        return ae
          ? ae.kind === 'attack'
            ? '攻撃'
            : ae.kind === 'guard'
              ? '防御'
              : ae.kind === 'item'
                ? (((ce = ht[ae.itemId]) == null ? void 0 : ce.name) ?? 'どうぐ')
                : (((Ae = cn[ae.skillId]) == null ? void 0 : Ae.name) ?? 'スキル')
          : '';
      },
      ie = (Y) => {
        const ae = (Ae) => Ae === 'headBind' || Ae === 'armBind' || Ae === 'legBind';
        let ce = '';
        return (
          Y.ailments.some((Ae) => ae(Ae.type)) && (ce += ' 🔒'),
          Y.ailments.some((Ae) => !ae(Ae.type)) && (ce += ' 🌀'),
          ce
        );
      },
      Me = (Y) => {
        var Ae;
        const ae = u.guild.members.find((Se) => Se.id === Y.id);
        if (!ae) return null;
        const ce = (Ae = Kt[ae.raceId]) == null ? void 0 : Ae.unionSkillTree.skills[0];
        return !ce || !(ce.skillId in ae.learnedSkills) ? null : (xi[ce.skillId] ?? null);
      },
      ke = (Y, ae, ce) => {
        var yt;
        const Se =
          ae.target === 'enemyOne' || ae.target === 'enemyRow' || ae.target === 'enemyAll'
            ? (g ?? ((yt = $[0]) == null ? void 0 : yt.id) ?? '')
            : Y;
        (Q({ actorId: Y, unionSkillId: ae.id, participantIds: ce, targetId: Se }), L(null));
      },
      N = (Y, ae) => {
        ae.requiredParticipants <= 1 ? ke(Y.id, ae, [Y.id]) : L({ actorId: Y.id, def: ae });
      },
      G = v ? B.find((Y) => Y.id === v) : void 0,
      I = ((tt = r.enemies.find((Y) => Y.id === g)) == null ? void 0 : tt.name) ?? '-',
      P = $p(r),
      oe = (Y) =>
        y.jsxs(
          'button',
          {
            type: 'button',
            className: [
              W.card,
              Y.isDown ? W.down : '',
              v === Y.id ? W.cardActive : '',
              h[Y.id] ? W.cardDecided : '',
            ].join(' '),
            disabled: Y.isDown || r.outcome !== 'ongoing',
            onClick: () => {
              (m(Y.id), S(!1), z(!1));
            },
            children: [
              y.jsxs('div', {
                className: W.cardName,
                children: [
                  Y.name,
                  Y.unionGauge >= 100 ? y.jsx('span', { className: W.uni, children: '★' }) : null,
                  ie(Y),
                ],
              }),
              y.jsx(Iu, { value: Y.hp, max: Y.maxHp, color: '#4caf50', showValue: !1 }),
              y.jsx(Iu, { value: Y.tp, max: Y.maxTp, color: '#2196f3', showValue: !1 }),
              y.jsxs('div', {
                className: W.cardNums,
                children: ['HP ', Math.max(0, Y.hp), ' · TP ', Y.tp],
              }),
              h[Y.id] ? y.jsxs('div', { className: W.cardCmd, children: ['▶ ', J(Y)] }) : null,
            ],
          },
          Y.id
        ),
      pe = r.allies.filter((Y) => Y.row === 'front'),
      Ee = r.allies.filter((Y) => Y.row === 'back');
    return y.jsxs('div', {
      className: W.layout,
      children: [
        y.jsx('div', {
          className: W.enemies,
          children: r.enemies.map((Y) =>
            y.jsxs(
              'button',
              {
                type: 'button',
                className: `${W.enemy} ${Y.isDown ? W.down : ''} ${g === Y.id ? W.targeted : ''}`,
                disabled: Y.isDown,
                onClick: () => C(Y.id),
                children: [
                  y.jsxs('span', { className: W.enemyName, children: [Y.name, ie(Y)] }),
                  y.jsx(Iu, { value: Y.hp, max: Y.maxHp, color: '#e57373', showValue: !1 }),
                ],
              },
              Y.id
            )
          ),
        }),
        r.summons.length > 0
          ? y.jsx('div', {
              className: W.summons,
              children: r.summons.map((Y) =>
                y.jsxs(
                  'div',
                  {
                    className: `${W.summon} ${Y.isDown ? W.down : ''}`,
                    children: [
                      y.jsxs('span', { className: W.summonName, children: ['🐾 ', Y.name] }),
                      y.jsx(Iu, { value: Y.hp, max: Y.maxHp, color: '#8d6e63', showValue: !1 }),
                      y.jsxs('span', {
                        className: W.summonHp,
                        children: ['HP ', Math.max(0, Y.hp)],
                      }),
                    ],
                  },
                  Y.id
                )
              ),
            })
          : null,
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
                  disabled: E,
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
                K
                  ? y.jsxs('div', {
                      className: W.unionBanner,
                      children: [
                        '⚡ ユニオン予約: ',
                        (Ge = xi[K.unionSkillId]) == null ? void 0 : Ge.name,
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
                        _
                          ? y.jsxs('div', {
                              className: W.skillList,
                              children: [
                                qe(G).map((Y) => {
                                  var ae;
                                  return y.jsxs(
                                    'button',
                                    {
                                      type: 'button',
                                      className: W.skillBtn,
                                      onClick: () => le(G.id, { kind: 'skill', skillId: Y }),
                                      children: [
                                        y.jsxs('span', {
                                          className: W.skillTop,
                                          children: [
                                            y.jsx('span', {
                                              className: W.skillName,
                                              children: cn[Y].name,
                                            }),
                                            y.jsxs('span', {
                                              className: W.tp,
                                              children: ['TP ', cn[Y].tpCost(1)],
                                            }),
                                          ],
                                        }),
                                        y.jsx('span', {
                                          className: W.skillDesc,
                                          children:
                                            ((ae = br[Y]) == null ? void 0 : ae.description) ?? '',
                                        }),
                                      ],
                                    },
                                    Y
                                  );
                                }),
                                qe(G).length === 0
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
                          : k
                            ? y.jsxs('div', {
                                className: W.skillList,
                                children: [
                                  H().map(({ id: Y, remaining: ae }) =>
                                    y.jsxs(
                                      'button',
                                      {
                                        type: 'button',
                                        className: W.skillBtn,
                                        onClick: () => le(G.id, { kind: 'item', itemId: Y }),
                                        children: [
                                          y.jsx('span', {
                                            className: W.skillTop,
                                            children: y.jsxs('span', {
                                              className: W.skillName,
                                              children: [ht[Y].name, ' ×', ae],
                                            }),
                                          }),
                                          y.jsx('span', {
                                            className: W.skillDesc,
                                            children: ht[Y].description,
                                          }),
                                        ],
                                      },
                                      Y
                                    )
                                  ),
                                  H().length === 0
                                    ? y.jsx('div', {
                                        className: W.empty,
                                        children: '使える道具がない',
                                      })
                                    : null,
                                  y.jsx('button', {
                                    type: 'button',
                                    className: W.menuBack,
                                    onClick: () => z(!1),
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
                                    B.filter((Y) => Y.id !== D.actorId).map((Y) =>
                                      y.jsx(
                                        'button',
                                        {
                                          type: 'button',
                                          className: W.skillBtn,
                                          onClick: () => ke(D.actorId, D.def, [D.actorId, Y.id]),
                                          children: y.jsxs('span', {
                                            className: W.skillTop,
                                            children: [
                                              y.jsx('span', {
                                                className: W.skillName,
                                                children: Y.name,
                                              }),
                                              y.jsxs('span', {
                                                className: W.tp,
                                                children: ['ゲージ ', Y.unionGauge],
                                              }),
                                            ],
                                          }),
                                        },
                                        Y.id
                                      )
                                    ),
                                    B.filter((Y) => Y.id !== D.actorId).length === 0
                                      ? y.jsx('div', {
                                          className: W.empty,
                                          children: '協力できる味方がいない',
                                        })
                                      : null,
                                    y.jsx('button', {
                                      type: 'button',
                                      className: W.menuBack,
                                      onClick: () => L(null),
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
                                      disabled: qe(G).length === 0,
                                      onClick: () => S(!0),
                                      children: 'スキル',
                                    }),
                                    y.jsx('button', {
                                      type: 'button',
                                      className: W.menuBtn,
                                      disabled: H().length === 0,
                                      onClick: () => z(!0),
                                      children: 'どうぐ',
                                    }),
                                    (() => {
                                      const Y = Me(G);
                                      return !Y || G.unionGauge < 100 || K
                                        ? null
                                        : y.jsx('button', {
                                            type: 'button',
                                            className: `${W.menuBtn} ${W.unionBtn}`,
                                            onClick: () => N(G, Y),
                                            children: '⚡ユニオン',
                                          });
                                    })(),
                                    y.jsx('button', {
                                      type: 'button',
                                      className: W.menuBtn,
                                      onClick: pt,
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
              : r.log.map((Y, ae) => y.jsx('div', { className: W.logLine, children: Y.text }, ae)),
        }),
      ],
    });
  },
  tS = '_layout_1b11o_1',
  lS = '_head_1b11o_13',
  nS = '_depth_1b11o_22',
  aS = '_fpvWrap_1b11o_39',
  iS = '_mapWrap_1b11o_45',
  uS = '_palette_1b11o_52',
  sS = '_tool_1b11o_62',
  cS = '_toolActive_1b11o_73',
  oS = '_paletteHint_1b11o_79',
  rS = '_stairs_1b11o_88',
  fS = '_controls_1b11o_102',
  dS = '_row_1b11o_112',
  mS = '_forward_1b11o_118',
  hS = '_turn_1b11o_133',
  pS = '_back_1b11o_147',
  yS = '_itemOverlay_1b11o_158',
  gS = '_itemPanel_1b11o_168',
  vS = '_itemTitle_1b11o_181',
  _S = '_itemEmpty_1b11o_186',
  bS = '_itemRow_1b11o_192',
  SS = '_itemName_1b11o_200',
  xS = '_itemDesc_1b11o_208',
  ES = '_itemTargets_1b11o_214',
  TS = '_itemTarget_1b11o_214',
  NS = '_itemHp_1b11o_234',
  AS = '_itemUse_1b11o_240',
  CS = '_itemClose_1b11o_253',
  xe = {
    layout: tS,
    head: lS,
    depth: nS,
    return: '_return_1b11o_28',
    fpvWrap: aS,
    mapWrap: iS,
    palette: uS,
    tool: sS,
    toolActive: cS,
    paletteHint: oS,
    stairs: rS,
    controls: fS,
    row: dS,
    forward: mS,
    turn: hS,
    back: pS,
    itemOverlay: yS,
    itemPanel: gS,
    itemTitle: vS,
    itemEmpty: _S,
    itemRow: bS,
    itemName: SS,
    itemDesc: xS,
    itemTargets: ES,
    itemTarget: TS,
    itemHp: NS,
    itemUse: AS,
    itemClose: CS,
  },
  MS = '_canvas_1keax_1',
  kS = { canvas: MS },
  uy = [
    { id: 'icon_chest', symbol: '📦', label: '宝箱' },
    { id: 'icon_foe', symbol: '👹', label: '強敵(FOE)' },
    { id: 'icon_warning', symbol: '⚠️', label: '注意' },
    { id: 'icon_door', symbol: '🚪', label: '扉/近道' },
    { id: 'icon_gather', symbol: '⛏️', label: '採集' },
    { id: 'icon_event', symbol: '❗', label: 'イベント' },
    { id: 'icon_note', symbol: '📝', label: 'メモ' },
    { id: 'icon_star', symbol: '⭐', label: '任意' },
  ],
  RS = new Map(uy.map((a) => [a.id, a]));
function jS(a) {
  var u;
  return ((u = RS.get(a)) == null ? void 0 : u.symbol) ?? '•';
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
  OS = ({
    floor: a,
    explored: u,
    pos: o,
    dir: c,
    icons: r = [],
    foes: d = [],
    maxCell: h = 26,
    onCellClick: b,
  }) => {
    const v = A.useRef(null),
      m = Math.max(10, Math.min(h, Math.floor(360 / a.width))),
      _ = a.width * m,
      S = a.height * m;
    A.useEffect(() => {
      const z = v.current;
      if (!z) return;
      const g = new Set(u),
        C = window.devicePixelRatio || 1;
      ((z.width = _ * C), (z.height = S * C));
      const E = z.getContext('2d');
      if (!E) return;
      (E.scale(C, C), E.clearRect(0, 0, _, S));
      for (let $ = 0; $ < a.height; $++)
        for (let B = 0; B < a.width; B++) {
          const F = g.has(`${B},${$}`);
          ((E.fillStyle = F ? Tl.floor : Tl.fog),
            E.fillRect(B * m, $ * m, m, m),
            F &&
              ((E.strokeStyle = Tl.grid),
              (E.lineWidth = 1),
              E.strokeRect(B * m + 0.5, $ * m + 0.5, m - 1, m - 1)));
        }
      ((E.strokeStyle = Tl.wall), (E.lineWidth = 2), (E.lineCap = 'round'));
      const U = ($, B, F, le) => {
        (E.beginPath(), E.moveTo($, B), E.lineTo(F, le), E.stroke());
      };
      for (let $ = 0; $ < a.height; $++)
        for (let B = 0; B < a.width; B++) {
          if (!g.has(`${B},${$}`)) continue;
          const F = a.cells[$][B],
            le = B * m,
            re = $ * m;
          (F.walls.N && U(le, re, le + m, re),
            F.walls.S && U(le, re + m, le + m, re + m),
            F.walls.W && U(le, re, le, re + m),
            F.walls.E && U(le + m, re, le + m, re + m));
          const de = F.event;
          ((de == null ? void 0 : de.kind) === 'stairsUp' ||
            (de == null ? void 0 : de.kind) === 'stairsDown') &&
            ((E.fillStyle = de.kind === 'stairsUp' ? Tl.stairsUp : Tl.stairsDown),
            E.beginPath(),
            E.arc(le + m / 2, re + m / 2, m * 0.28, 0, Math.PI * 2),
            E.fill(),
            (E.fillStyle = '#ffffff'),
            (E.font = `bold ${Math.floor(m * 0.5)}px sans-serif`),
            (E.textAlign = 'center'),
            (E.textBaseline = 'middle'),
            E.fillText(de.kind === 'stairsUp' ? '▲' : '▼', le + m / 2, re + m / 2 + 1));
        }
      ((E.font = `${Math.floor(m * 0.66)}px sans-serif`),
        (E.textAlign = 'center'),
        (E.textBaseline = 'middle'));
      for (const $ of r)
        g.has(`${$.x},${$.y}`) && E.fillText(jS($.iconId), $.x * m + m / 2, $.y * m + m / 2 + 1);
      for (const $ of d) {
        if (!g.has(`${$.x},${$.y}`)) continue;
        const B = $.x * m + m / 2,
          F = $.y * m + m / 2;
        ((E.fillStyle = $.alerted ? Tl.foeAlert : Tl.foe),
          E.beginPath(),
          E.arc(B, F, m * 0.3, 0, Math.PI * 2),
          E.fill(),
          (E.fillStyle = '#ffffff'),
          (E.font = `bold ${Math.floor(m * 0.5)}px sans-serif`),
          (E.textAlign = 'center'),
          (E.textBaseline = 'middle'),
          E.fillText('!', B, F + 1));
      }
      const K = o.x * m + m / 2,
        Q = o.y * m + m / 2,
        D = m * 0.34,
        Z = { N: -Math.PI / 2, E: 0, S: Math.PI / 2, W: Math.PI }[c];
      ((E.fillStyle = Tl.player),
        E.beginPath(),
        E.moveTo(K + Math.cos(Z) * D, Q + Math.sin(Z) * D),
        E.lineTo(K + Math.cos(Z + 2.5) * D, Q + Math.sin(Z + 2.5) * D),
        E.lineTo(K + Math.cos(Z - 2.5) * D, Q + Math.sin(Z - 2.5) * D),
        E.closePath(),
        E.fill());
    }, [a, u, o, c, r, d, m, _, S]);
    const k = (z) => {
      if (!b) return;
      const g = z.currentTarget.getBoundingClientRect(),
        C = Math.floor(((z.clientX - g.left) / g.width) * a.width),
        E = Math.floor(((z.clientY - g.top) / g.height) * a.height);
      C >= 0 && E >= 0 && C < a.width && E < a.height && b(C, E);
    };
    return y.jsx('canvas', {
      ref: v,
      className: kS.canvas,
      style: { width: _, height: S },
      onClick: k,
    });
  },
  DS = '_gauge_1o2hx_1',
  zS = '_icon_1o2hx_11',
  wS = '_segments_1o2hx_16',
  BS = '_seg_1o2hx_16',
  US = '_filled_1o2hx_28',
  LS = '_danger_1o2hx_32',
  pa = { gauge: DS, icon: zS, segments: wS, seg: BS, filled: US, danger: LS },
  HS = ({ level: a }) => {
    const u = a >= Ti;
    return y.jsxs('div', {
      className: pa.gauge,
      role: 'img',
      'aria-label': `エンカウントゲージ ${a}/${Ti}`,
      children: [
        y.jsx('span', { className: pa.icon, children: u ? '⚠' : '👣' }),
        y.jsx('div', {
          className: pa.segments,
          children: Array.from({ length: Ti }, (o, c) =>
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
  qS = '_view_tw2v9_1',
  GS = { view: qS },
  mp = { N: { dx: 0, dy: -1 }, E: { dx: 1, dy: 0 }, S: { dx: 0, dy: 1 }, W: { dx: -1, dy: 0 } };
function YS(a, u, o, c = 4) {
  const r = Zp(o),
    d = Kp(o),
    h = [];
  let { x: b, y: v } = u;
  for (let m = 0; m < c; m++) {
    const _ = ya(a, b, v, o);
    if (
      (h.push({
        x: b,
        y: v,
        leftOpen: !a.cells[v][b].walls[r],
        rightOpen: !a.cells[v][b].walls[d],
        frontOpen: _,
        event: a.cells[v][b].event,
      }),
      !_)
    )
      break;
    ((b += mp[o].dx), (v += mp[o].dy));
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
  XS = 0.56,
  VS = ({
    floor: a,
    pos: u,
    dir: o,
    foes: c = [],
    maxDepth: r = 4,
    width: d = 358,
    height: h = 200,
  }) => {
    const b = A.useRef(null);
    return (
      A.useEffect(() => {
        const v = b.current;
        if (!v) return;
        const m = window.devicePixelRatio || 1;
        ((v.width = d * m), (v.height = h * m));
        const _ = v.getContext('2d');
        if (!_) return;
        _.scale(m, m);
        const S = d,
          k = h,
          z = S / 2,
          g = k / 2,
          C = YS(a, u, o, r),
          E = (Q) => {
            const D = Math.pow(XS, Q);
            return {
              l: z - (S / 2) * D,
              r: z + (S / 2) * D,
              t: g - (k / 2) * D,
              b: g + (k / 2) * D,
            };
          },
          U = (Q, D, L = !1) => {
            (_.beginPath(), _.moveTo(Q[0][0], Q[0][1]));
            for (let Z = 1; Z < Q.length; Z++) _.lineTo(Q[Z][0], Q[Z][1]);
            (_.closePath(),
              (_.fillStyle = D),
              _.fill(),
              L && ((_.strokeStyle = Nl.outline), (_.lineWidth = 1), _.stroke()));
          },
          K = (Q) => `rgba(0,0,0,${Math.min(0.5, Q * 0.13)})`;
        ((_.fillStyle = Nl.sky), _.fillRect(0, 0, S, k));
        for (let Q = C.length - 1; Q >= 0; Q--) {
          const D = E(Q),
            L = E(Q + 1),
            Z = C[Q];
          (U(
            [
              [D.l, D.t],
              [D.r, D.t],
              [L.r, L.t],
              [L.l, L.t],
            ],
            Nl.ceiling
          ),
            U(
              [
                [D.l, D.b],
                [D.r, D.b],
                [L.r, L.b],
                [L.l, L.b],
              ],
              Nl.floor
            ),
            U(
              [
                [D.l, D.t],
                [L.l, L.t],
                [L.l, L.b],
                [D.l, D.b],
              ],
              Z.leftOpen ? Nl.sky : Nl.wall,
              !0
            ),
            U(
              [
                [D.r, D.t],
                [L.r, L.t],
                [L.r, L.b],
                [D.r, D.b],
              ],
              Z.rightOpen ? Nl.sky : Nl.wall,
              !0
            ),
            Z.frontOpen ||
              U(
                [
                  [L.l, L.t],
                  [L.r, L.t],
                  [L.r, L.b],
                  [L.l, L.b],
                ],
                Nl.frontWall,
                !0
              ),
            (_.fillStyle = K(Q)),
            _.fillRect(L.l, L.t, L.r - L.l, L.b - L.t));
          const $ = Z.event;
          if (
            ($ == null ? void 0 : $.kind) === 'stairsUp' ||
            ($ == null ? void 0 : $.kind) === 'stairsDown'
          ) {
            const B = z,
              F = (D.b + L.b) / 2 - (D.b - L.b) * 0.15,
              le = Math.max(12, (D.b - D.t) * 0.18);
            ((_.fillStyle = $.kind === 'stairsUp' ? '#e8923a' : '#7aa2d6'),
              _.beginPath(),
              _.arc(B, F, le, 0, Math.PI * 2),
              _.fill(),
              (_.fillStyle = '#fff'),
              (_.font = `bold ${Math.floor(le * 1.2)}px sans-serif`),
              (_.textAlign = 'center'),
              (_.textBaseline = 'middle'),
              _.fillText($.kind === 'stairsUp' ? '▲' : '▼', B, F + 1));
          }
          if (Q > 0 && c.some((B) => B.x === Z.x && B.y === Z.y)) {
            const B = c.some((de) => de.x === Z.x && de.y === Z.y && de.alerted),
              F = z,
              le = (D.b + L.b) / 2 - (D.b - L.b) * 0.1,
              re = Math.max(14, (D.b - D.t) * 0.22);
            ((_.fillStyle = B ? '#d32f2f' : '#b0533a'),
              _.beginPath(),
              _.arc(F, le, re, 0, Math.PI * 2),
              _.fill(),
              (_.fillStyle = '#fff'),
              (_.font = `bold ${Math.floor(re * 1.3)}px sans-serif`),
              (_.textAlign = 'center'),
              (_.textBaseline = 'middle'),
              _.fillText('!', F, le + 1));
          }
        }
      }, [a, u, o, c, r, d, h]),
      y.jsx('canvas', { ref: b, className: GS.view, style: { width: d, height: h } })
    );
  };
function QS(a, u, o) {
  var k, z;
  const c = ht[u];
  if (!c) return { save: a, ok: !1, message: 'そのアイテムは無い' };
  if (!((k = c.useContext) != null && k.includes('field')))
    return { save: a, ok: !1, message: 'ここでは使えない' };
  if ((((z = a.guild.storage.find((g) => g.itemId === u)) == null ? void 0 : z.qty) ?? 0) <= 0)
    return { save: a, ok: !1, message: '所持していない' };
  if (u === 'item_return_thread')
    return a.diveState
      ? { save: Ci(Ai(a, u, 1)), ok: !0, message: '拠点へ帰還した' }
      : { save: a, ok: !1, message: '探索中のみ使える' };
  if (!a.diveState) return { save: a, ok: !1, message: '探索中のみ使える' };
  const r = a.diveState.party.find((g) => g.charId === o),
    d = a.guild.members.find((g) => g.id === o);
  if (!r || !d) return { save: a, ok: !1, message: '対象がいない' };
  const h = ji(d);
  let b = r.hp,
    v = r.tp,
    m = !1;
  for (const g of c.effects ?? [])
    g.kind === 'heal'
      ? ((b = Math.min(h.hp, b + g.amount(1))), (m = !0))
      : g.kind === 'restoreTp' && ((v = Math.min(h.tp, v + g.amount(1))), (m = !0));
  if (!m) return { save: a, ok: !1, message: 'いま使う効果がない' };
  const _ = a.diveState.party.map((g) => (g.charId === o ? { ...g, hp: b, tp: v } : g));
  return {
    save: Ai({ ...a, diveState: { ...a.diveState, party: _ } }, u, 1),
    ok: !0,
    message: `${d.name} に ${c.name} を使った`,
  };
}
function $S(a) {
  return { depth: a, floorPaint: [], wallDraw: [], icons: [], notes: [], autopilotRoutes: [] };
}
function KS(a, u) {
  return a.playerMaps[u] ?? $S(u);
}
function sy(a, u, o) {
  return { ...a, playerMaps: { ...a.playerMaps, [u]: o } };
}
function ZS(a, u, o, c, r) {
  const d = KS(a, u),
    h = d.icons.find((m) => m.x === o && m.y === c),
    b = d.icons.filter((m) => !(m.x === o && m.y === c)),
    v = (h == null ? void 0 : h.iconId) === r ? b : [...b, { x: o, y: c, iconId: r }];
  return sy(a, u, { ...d, icons: v });
}
function JS(a, u, o, c) {
  const r = a.playerMaps[u];
  return r ? sy(a, u, { ...r, icons: r.icons.filter((d) => !(d.x === o && d.y === c)) }) : a;
}
const IS = () => {
    var Q;
    const a = Ol(),
      { save: u, applySave: o, applyAndPersist: c } = kn(),
      r = A.useRef(null),
      [d, h] = A.useState(null),
      [b, v] = A.useState(!1),
      m = (u == null ? void 0 : u.diveState) ?? null,
      _ = A.useMemo(() => {
        var D;
        return u && m ? ((D = u.towerState.floors[m.depth]) == null ? void 0 : D.generated) : null;
      }, [u, m]),
      S = A.useMemo(() => {
        var D;
        return u && m
          ? (((D = u.towerState.floors[m.depth]) == null ? void 0 : D.foeRuntime) ?? [])
              .filter((L) => !L.defeated)
              .map((L) => ({ x: L.cell.x, y: L.cell.y, alerted: L.alerted }))
          : [];
      }, [u, m]),
      k = A.useCallback(
        (D) => {
          if (!u) return;
          r.current || (r.current = Ea((u.masterSeed ^ 2654435769) >>> 0));
          const L = yb(u, D, r.current);
          (c(() => L.save), L.triggered && a('/battle'));
        },
        [u, c, a]
      ),
      z = A.useCallback(
        (D) => {
          o((L) => Fp(L, D));
        },
        [o]
      ),
      g = A.useCallback(async () => {
        if (!u) return;
        const D = ip(u);
        D === 'stairsUp'
          ? await c((L) => vb(L))
          : D === 'stairsDown' &&
            (u.diveState.depth <= 1 ? (await c((L) => Ci(L)), a('/town')) : await c((L) => _b(L)));
      }, [u, c, a]),
      C = A.useCallback(async () => {
        (await c((D) => Ci(D)), a('/town'));
      }, [c, a]),
      E = A.useCallback(
        (D, L) => {
          if (!u) return;
          const Z = QS(u, D, L);
          Z.ok && (c(() => Z.save), Z.save.diveState || (v(!1), a('/town')));
        },
        [u, c, a]
      ),
      U = A.useCallback(
        (D, L) => {
          if (!m) return;
          const Z = m.depth;
          if (d !== null) {
            if (!((u == null ? void 0 : u.exploredCells[Z]) ?? []).includes(`${D},${L}`)) return;
            c(d === 'erase' ? (re) => JS(re, Z, D, L) : (re) => ZS(re, Z, D, L, d));
            return;
          }
          const $ = D - m.pos.x,
            B = L - m.pos.y,
            F = ['N', 'E', 'S', 'W'].find((le) => $t[le].dx === $ && $t[le].dy === B);
          F && k(F);
        },
        [m, k, d, u, c]
      );
    if (!u) return y.jsx(jl, { to: '/title', replace: !0 });
    if (!m || !_) return y.jsx(jl, { to: '/town', replace: !0 });
    const K = ip(u);
    return y.jsxs('div', {
      className: xe.layout,
      children: [
        y.jsxs('header', {
          className: xe.head,
          children: [
            y.jsxs('div', { className: xe.depth, children: [m.depth, 'F'] }),
            y.jsx(HS, { level: P1(m.encounter.stepsUntilEncounter) }),
            y.jsx('button', {
              type: 'button',
              className: xe.return,
              onClick: () => v(!0),
              children: '道具',
            }),
            y.jsx('button', {
              type: 'button',
              className: xe.return,
              onClick: () => void C(),
              children: '帰還',
            }),
          ],
        }),
        y.jsx('div', {
          className: xe.fpvWrap,
          children: y.jsx(VS, { floor: _, pos: m.pos, dir: m.dir, foes: S }),
        }),
        y.jsx('div', {
          className: xe.mapWrap,
          children: y.jsx(OS, {
            floor: _,
            explored: u.exploredCells[m.depth] ?? [],
            pos: m.pos,
            dir: m.dir,
            icons: ((Q = u.playerMaps[m.depth]) == null ? void 0 : Q.icons) ?? [],
            foes: S,
            onCellClick: U,
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
            uy.map((D) =>
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
        K &&
          y.jsx('button', {
            type: 'button',
            className: xe.stairs,
            onClick: () => void g(),
            children:
              K === 'stairsUp'
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
                  onClick: () => z(Zp(m.dir)),
                  'aria-label': '左を向く',
                  children: '↰',
                }),
                y.jsx('button', {
                  type: 'button',
                  className: xe.forward,
                  onClick: () => k(m.dir),
                  children: '前進',
                }),
                y.jsx('button', {
                  type: 'button',
                  className: xe.turn,
                  onClick: () => z(Kp(m.dir)),
                  'aria-label': '右を向く',
                  children: '↱',
                }),
              ],
            }),
            y.jsx('button', {
              type: 'button',
              className: xe.back,
              onClick: () => z(eb(m.dir)),
              'aria-label': '振り向く',
              children: '↻ 振り向く',
            }),
          ],
        }),
        b
          ? y.jsx('div', {
              className: xe.itemOverlay,
              onClick: () => v(!1),
              children: y.jsxs('div', {
                className: xe.itemPanel,
                onClick: (D) => D.stopPropagation(),
                children: [
                  y.jsx('div', { className: xe.itemTitle, children: 'どうぐ' }),
                  (() => {
                    const D = u.guild.storage.filter((L) => {
                      var Z, $;
                      return (
                        (($ = (Z = ht[L.itemId]) == null ? void 0 : Z.useContext) == null
                          ? void 0
                          : $.includes('field')) && L.qty > 0
                      );
                    });
                    return D.length === 0
                      ? y.jsx('p', {
                          className: xe.itemEmpty,
                          children: '使える道具がありません。',
                        })
                      : D.map((L) => {
                          const Z = ht[L.itemId],
                            $ = L.itemId === 'item_return_thread';
                          return y.jsxs(
                            'div',
                            {
                              className: xe.itemRow,
                              children: [
                                y.jsxs('div', {
                                  className: xe.itemName,
                                  children: [
                                    Z.name,
                                    ' ×',
                                    L.qty,
                                    y.jsx('span', {
                                      className: xe.itemDesc,
                                      children: Z.description,
                                    }),
                                  ],
                                }),
                                $
                                  ? y.jsx('button', {
                                      type: 'button',
                                      className: xe.itemUse,
                                      onClick: () => E(L.itemId),
                                      children: '使う',
                                    })
                                  : y.jsx('div', {
                                      className: xe.itemTargets,
                                      children: m.party.map((B) => {
                                        const F = u.guild.members.find((re) => re.id === B.charId);
                                        if (!F) return null;
                                        const le = ji(F);
                                        return y.jsxs(
                                          'button',
                                          {
                                            type: 'button',
                                            className: xe.itemTarget,
                                            onClick: () => E(L.itemId, B.charId),
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
                            L.itemId
                          );
                        });
                  })(),
                  y.jsx('button', {
                    type: 'button',
                    className: xe.itemClose,
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
  WS = '_layout_16au8_2',
  FS = '_head_16au8_13',
  PS = '_title_16au8_20',
  e2 = '_count_16au8_26',
  t2 = '_create_16au8_31',
  l2 = '_sectionTitle_16au8_42',
  n2 = '_field_16au8_48',
  a2 = '_primary_16au8_64',
  i2 = '_list_16au8_79',
  u2 = '_empty_16au8_83',
  s2 = '_members_16au8_88',
  c2 = '_member_16au8_88',
  o2 = '_memberMain_16au8_107',
  r2 = '_memberName_16au8_119',
  f2 = '_pos_16au8_127',
  d2 = '_memberSub_16au8_144',
  m2 = '_posBtns_16au8_149',
  h2 = '_posBtn_16au8_149',
  p2 = '_posBtnActive_16au8_164',
  y2 = '_foot_16au8_170',
  g2 = '_sub_16au8_174',
  Re = {
    layout: WS,
    head: FS,
    title: PS,
    count: e2,
    create: t2,
    sectionTitle: l2,
    field: n2,
    primary: a2,
    list: i2,
    empty: u2,
    members: s2,
    member: c2,
    memberMain: o2,
    memberName: r2,
    pos: f2,
    pos_前衛: '_pos_前衛_16au8_136',
    pos_後衛: '_pos_後衛_16au8_140',
    memberSub: d2,
    posBtns: m2,
    posBtn: h2,
    posBtnActive: p2,
    foot: y2,
    sub: g2,
  };
function v2(a) {
  return [...a.guild.party.front, ...a.guild.party.back].filter((u) => u !== null).length;
}
const cy = (a) => (a === 'front' ? fs : ds);
function _2(a, u, o, c) {
  if (o < 0 || o >= cy(u) || (c !== null && !a.guild.members.some((h) => h.id === c))) return a;
  const r = a.guild.party.front.map((h) => (h === c ? null : h)),
    d = a.guild.party.back.map((h) => (h === c ? null : h));
  for (; r.length < fs; ) r.push(null);
  for (; d.length < ds; ) d.push(null);
  return (
    u === 'front' ? (r[o] = c) : (d[o] = c),
    { ...a, guild: { ...a.guild, party: { front: r, back: d } } }
  );
}
function oy(a, u) {
  const o = a.guild.party.front.map((r) => (r === u ? null : r)),
    c = a.guild.party.back.map((r) => (r === u ? null : r));
  return { ...a, guild: { ...a.guild, party: { front: o, back: c } } };
}
function hp(a, u, o) {
  if (
    !a.guild.members.some((b) => b.id === u) ||
    (o === 'front' ? a.guild.party.front : a.guild.party.back).includes(u)
  )
    return a;
  const r = oy(a, u),
    d = o === 'front' ? r.guild.party.front : r.guild.party.back;
  let h = d.indexOf(null);
  if (h < 0)
    if (d.length < cy(o)) h = d.length;
    else return a;
  return _2(r, o, h, u);
}
function b2(a, u) {
  return a.guild.party.front.includes(u)
    ? '前衛'
    : a.guild.party.back.includes(u)
      ? '後衛'
      : '控え';
}
const S2 = () => {
    const a = Ol(),
      { save: u, applyAndPersist: o } = kn(),
      c = Object.keys(Kt),
      r = Object.keys(dt),
      [d, h] = A.useState(''),
      [b, v] = A.useState(c[0]),
      [m, _] = A.useState(r[0]),
      [S, k] = A.useState(!1),
      z = A.useCallback(async () => {
        const E = d.trim() || '名もなき冒険者',
          U = ey({ raceId: b, classId: m, name: E });
        (k(!0), await o((K) => kb(K, U)), h(''), k(!1));
      }, [d, b, m, o]);
    if (!u) return y.jsx(jl, { to: '/title', replace: !0 });
    const { members: g } = u.guild,
      C = g.length >= tr;
    return y.jsxs('div', {
      className: Re.layout,
      children: [
        y.jsxs('header', {
          className: Re.head,
          children: [
            y.jsx('h1', { className: Re.title, children: 'ギルド管理' }),
            y.jsxs('span', { className: Re.count, children: ['団員 ', g.length, ' / ', tr] }),
          ],
        }),
        y.jsxs('section', {
          className: Re.create,
          children: [
            y.jsx('h2', { className: Re.sectionTitle, children: '冒険者を作成' }),
            y.jsxs('label', {
              className: Re.field,
              children: [
                y.jsx('span', { children: '名前' }),
                y.jsx('input', {
                  type: 'text',
                  value: d,
                  maxLength: 16,
                  placeholder: '名もなき冒険者',
                  onChange: (E) => h(E.target.value),
                }),
              ],
            }),
            y.jsxs('label', {
              className: Re.field,
              children: [
                y.jsx('span', { children: '種族' }),
                y.jsx('select', {
                  value: b,
                  onChange: (E) => v(E.target.value),
                  children: c.map((E) => y.jsx('option', { value: E, children: Kt[E].name }, E)),
                }),
              ],
            }),
            y.jsxs('label', {
              className: Re.field,
              children: [
                y.jsx('span', { children: '職業' }),
                y.jsx('select', {
                  value: m,
                  onChange: (E) => _(E.target.value),
                  children: r.map((E) => y.jsx('option', { value: E, children: dt[E].name }, E)),
                }),
              ],
            }),
            y.jsx('button', {
              type: 'button',
              className: Re.primary,
              disabled: S || C,
              onClick: () => void z(),
              children: C ? '団員が上限です' : '作成する',
            }),
          ],
        }),
        y.jsxs('section', {
          className: Re.list,
          children: [
            y.jsxs('h2', {
              className: Re.sectionTitle,
              children: [
                '団員一覧',
                ' ',
                y.jsxs('span', {
                  className: Re.count,
                  children: ['（出撃 ', v2(u), ' / ', k1, '）'],
                }),
              ],
            }),
            g.length === 0
              ? y.jsx('p', { className: Re.empty, children: 'まだ冒険者がいません。' })
              : y.jsx('ul', {
                  className: Re.members,
                  children: g.map((E) => {
                    var K, Q;
                    const U = b2(u, E.id);
                    return y.jsxs(
                      'li',
                      {
                        className: Re.member,
                        children: [
                          y.jsxs('button', {
                            type: 'button',
                            className: Re.memberMain,
                            onClick: () => a(`/guild/char/${E.id}`),
                            children: [
                              y.jsxs('span', {
                                className: Re.memberName,
                                children: [
                                  E.name,
                                  y.jsx('span', {
                                    className: `${Re.pos} ${Re[`pos_${U}`] ?? ''}`,
                                    children: U,
                                  }),
                                ],
                              }),
                              y.jsxs('span', {
                                className: Re.memberSub,
                                children: [
                                  (K = Kt[E.raceId]) == null ? void 0 : K.name,
                                  ' / ',
                                  (Q = dt[E.classId]) == null ? void 0 : Q.name,
                                  ' / Lv',
                                  E.level,
                                  ' ›',
                                ],
                              }),
                            ],
                          }),
                          y.jsxs('div', {
                            className: Re.posBtns,
                            children: [
                              y.jsx('button', {
                                type: 'button',
                                className: `${Re.posBtn} ${U === '前衛' ? Re.posBtnActive : ''}`,
                                onClick: () => void o((D) => hp(D, E.id, 'front')),
                                children: '前',
                              }),
                              y.jsx('button', {
                                type: 'button',
                                className: `${Re.posBtn} ${U === '後衛' ? Re.posBtnActive : ''}`,
                                onClick: () => void o((D) => hp(D, E.id, 'back')),
                                children: '後',
                              }),
                              y.jsx('button', {
                                type: 'button',
                                className: `${Re.posBtn} ${U === '控え' ? Re.posBtnActive : ''}`,
                                onClick: () => void o((D) => oy(D, E.id)),
                                children: '控',
                              }),
                            ],
                          }),
                        ],
                      },
                      E.id
                    );
                  }),
                }),
          ],
        }),
        y.jsx('footer', {
          className: Re.foot,
          children: y.jsx('button', {
            type: 'button',
            className: Re.sub,
            onClick: () => a('/town'),
            children: '拠点へ戻る',
          }),
        }),
      ],
    });
  },
  x2 = '_layout_tw23z_1',
  E2 = '_head_tw23z_12',
  T2 = '_title_tw23z_16',
  N2 = '_sub_tw23z_22',
  A2 = '_card_tw23z_27',
  C2 = '_h2_tw23z_35',
  M2 = '_sp_tw23z_44',
  k2 = '_stats_tw23z_50',
  R2 = '_equipSlot_tw23z_74',
  j2 = '_equipHead_tw23z_82',
  O2 = '_slotLabel_tw23z_88',
  D2 = '_equipName_tw23z_95',
  z2 = '_smallBtn_tw23z_100',
  w2 = '_equipPick_tw23z_110',
  B2 = '_pickBtn_tw23z_118',
  U2 = '_skills_tw23z_128',
  L2 = '_skill_tw23z_128',
  H2 = '_skillInfo_tw23z_143',
  q2 = '_skillName_tw23z_150',
  G2 = '_skillLv_tw23z_158',
  Y2 = '_skillDesc_tw23z_164',
  X2 = '_learnBtn_tw23z_169',
  V2 = '_jobRow_tw23z_185',
  Q2 = '_select_tw23z_192',
  $2 = '_input_tw23z_193',
  K2 = '_actBtn_tw23z_203',
  Z2 = '_warn_tw23z_220',
  J2 = '_titleHave_tw23z_227',
  I2 = '_titleOpts_tw23z_233',
  W2 = '_titleBtn_tw23z_240',
  F2 = '_rbForm_tw23z_252',
  P2 = '_danger_tw23z_258',
  ex = '_foot_tw23z_270',
  tx = '_back_tw23z_274',
  se = {
    layout: x2,
    head: E2,
    title: T2,
    sub: N2,
    card: A2,
    h2: C2,
    sp: M2,
    stats: k2,
    equipSlot: R2,
    equipHead: j2,
    slotLabel: O2,
    equipName: D2,
    smallBtn: z2,
    equipPick: w2,
    pickBtn: B2,
    skills: U2,
    skill: L2,
    skillInfo: H2,
    skillName: q2,
    skillLv: G2,
    skillDesc: Y2,
    learnBtn: X2,
    jobRow: V2,
    select: Q2,
    input: $2,
    actBtn: K2,
    warn: Z2,
    titleHave: J2,
    titleOpts: I2,
    titleBtn: W2,
    rbForm: F2,
    danger: P2,
    foot: ex,
    back: tx,
  },
  ry = ['weapon', 'armor', 'accessory'];
function fy(a, u, o) {
  return { ...a, guild: { ...a.guild, members: a.guild.members.map((c) => (c.id === u ? o : c)) } };
}
function lx(a) {
  var u, o;
  return (o = (u = dt[a]) == null ? void 0 : u.skillTree.skills[0]) == null ? void 0 : o.skillId;
}
function nx(a) {
  var u;
  return new Set(
    (((u = Kt[a]) == null ? void 0 : u.unionSkillTree.skills) ?? []).map((o) => o.skillId)
  );
}
const ax = (a) => Object.values(a).reduce((u, o) => u + o, 0);
function ix(a, u) {
  if (!dt[u]) return a;
  const o = nx(a.raceId);
  let c = {};
  for (const [v, m] of Object.entries(a.learnedSkills)) o.has(v) && (c[v] = m);
  const r = lx(u);
  r && !c[r] && (c[r] = 1);
  const d = Math.max(1, a.level - Bp),
    h = De.SP_PER_LEVEL * Math.max(0, d - 1);
  let b = ax(c) - (r && c[r] ? 1 : 0);
  return (
    b > h && ((c = r ? { [r]: 1 } : {}), (b = 0)),
    {
      ...a,
      classId: u,
      titleId: null,
      level: d,
      exp: 0,
      learnedSkills: c,
      skillPoints: { total: h, spent: b },
    }
  );
}
function ux(a, u, o) {
  const c = a.guild.members.find((h) => h.id === u);
  if (!c) return a;
  let r = fy(a, u, ix(c, o));
  const d = r.guild.members.find((h) => h.id === u);
  for (const h of ry) {
    const b = d.equipment[h];
    b && !xr(d, b) && (r = Er(r, u, h));
  }
  return r;
}
const sx = [
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
function cx(a) {
  const u = sx.find((o) => a >= o.min && a <= o.max);
  return u ? { allStats: u.allStats, bonusSp: u.bonusSp } : null;
}
function dy(a) {
  return a.level >= Ei.REBIRTH_MIN_LEVEL;
}
function ox(a, u) {
  const o = cx(a.level);
  if (!o) return a;
  const c = Math.min(30, Math.floor(a.level / 2)),
    r = ey({ ...u, id: a.id }),
    d = De.SP_PER_LEVEL * Math.max(0, c - 1) + o.bonusSp;
  return {
    ...r,
    level: Math.max(1, c),
    exp: 0,
    rebirthBonus: o,
    skillPoints: { total: d, spent: r.skillPoints.spent },
  };
}
function rx(a, u, o) {
  const c = a.guild.members.find((h) => h.id === u);
  if (!c || !dy(c)) return a;
  let r = a;
  for (const h of ry) c.equipment[h] && (r = Er(r, u, h));
  const d = r.guild.members.find((h) => h.id === u);
  return fy(r, u, ox(d, o));
}
function my(a, u, o) {
  var r;
  return o < Ei.TITLE_DEPTH || a.titleId
    ? !1
    : (((r = dt[a.classId]) == null ? void 0 : r.titleOptions) ?? []).includes(u);
}
function fx(a, u, o) {
  return my(a, u, o)
    ? { ...a, titleId: u, skillPoints: { ...a.skillPoints, total: a.skillPoints.total + R1 } }
    : a;
}
function hy(a) {
  var o, c;
  const u = [
    ...(((o = dt[a.classId]) == null ? void 0 : o.skillTree.skills) ?? []),
    ...(((c = Kt[a.raceId]) == null ? void 0 : c.unionSkillTree.skills) ?? []),
  ];
  return (a.titleId && ga[a.titleId] && u.push(...ga[a.titleId].skillTree.skills), u);
}
function ps(a, u) {
  return a.learnedSkills[u] ?? 0;
}
function py(a) {
  return a.skillPoints.total - a.skillPoints.spent;
}
function dx(a, u) {
  return (u.requires ?? []).every((o) => ps(a, o.skillId) >= o.level);
}
function yy(a, u) {
  const o = hy(a).find((c) => c.skillId === u);
  return !o || ps(a, u) >= o.maxLevel || py(a) <= 0 ? !1 : dx(a, o);
}
function mx(a, u) {
  return yy(a, u)
    ? {
        ...a,
        learnedSkills: { ...a.learnedSkills, [u]: ps(a, u) + 1 },
        skillPoints: { ...a.skillPoints, spent: a.skillPoints.spent + 1 },
      }
    : a;
}
const pp = Object.keys(Kt),
  Wu = Object.keys(dt),
  hx = ['weapon', 'armor', 'accessory'],
  px = { weapon: '武器', armor: '防具', accessory: '装飾' },
  yx = [
    { key: 'hp', label: 'HP' },
    { key: 'tp', label: 'TP' },
    { key: 'str', label: 'STR' },
    { key: 'vit', label: 'VIT' },
    { key: 'agi', label: 'AGI' },
    { key: 'int', label: 'INT' },
    { key: 'mnd', label: 'MND' },
    { key: 'luc', label: 'LUC' },
  ],
  gx = () => {
    var D, L, Z, $;
    const a = Ol(),
      { id: u } = Bv(),
      { save: o, applyAndPersist: c } = kn(),
      [r, d] = A.useState(Wu[0]),
      [h, b] = A.useState(''),
      [v, m] = A.useState(pp[0]),
      [_, S] = A.useState(Wu[0]),
      [k, z] = A.useState(!1);
    if (!o) return y.jsx(jl, { to: '/title', replace: !0 });
    const g = o.guild.members.find((B) => B.id === u);
    if (!g || !u) return y.jsx(jl, { to: '/guild', replace: !0 });
    const C = ji(g),
      E = py(g),
      U = o.towerState.record.deepestReached,
      K = (B) =>
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
            y.jsx('h1', { className: se.title, children: g.name }),
            y.jsxs('span', {
              className: se.sub,
              children: [
                (D = Kt[g.raceId]) == null ? void 0 : D.name,
                ' / ',
                (L = dt[g.classId]) == null ? void 0 : L.name,
                ' / Lv',
                g.level,
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
              children: yx.map((B) =>
                y.jsxs(
                  'div',
                  {
                    children: [
                      y.jsx('dt', { children: B.label }),
                      y.jsx('dd', { children: C[B.key] }),
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
            hx.map((B) => {
              const F = g.equipment[B],
                le = F ? zt[F] : null,
                re = o.guild.storage.filter((de) => {
                  var at;
                  return (
                    ((at = zt[de.itemId]) == null ? void 0 : at.slot) === B && xr(g, de.itemId)
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
                        y.jsx('span', { className: se.slotLabel, children: px[B] }),
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
                                onClick: () => void c((at) => B1(at, u, de.itemId)),
                                children: [
                                  zt[de.itemId].name,
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
              children: ['スキル ', y.jsxs('span', { className: se.sp, children: ['SP ', E] })],
            }),
            y.jsx('ul', {
              className: se.skills,
              children: hy(g).map((B) => {
                const F = ps(g, B.skillId),
                  le = yy(g, B.skillId),
                  re = br[B.skillId];
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
                        onClick: () => void K((de) => mx(de, B.skillId)),
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
                  children: Wu.map((B) => y.jsx('option', { value: B, children: dt[B].name }, B)),
                }),
                y.jsx('button', {
                  type: 'button',
                  className: se.actBtn,
                  disabled: r === g.classId,
                  onClick: () => void c((B) => ux(B, u, r)),
                  children: '転職する',
                }),
              ],
            }),
            y.jsxs('p', {
              className: se.warn,
              children: [
                '※ レベルが ',
                Bp,
                ' ',
                '下がり、職業/称号スキルは振り直しになります（種族スキルは保持）。',
              ],
            }),
            y.jsx('h2', { className: se.h2, children: '称号' }),
            g.titleId
              ? y.jsxs('p', {
                  className: se.titleHave,
                  children: ['習得済み: ', (Z = ga[g.titleId]) == null ? void 0 : Z.name],
                })
              : U < Ei.TITLE_DEPTH
                ? y.jsxs('p', {
                    className: se.warn,
                    children: ['第 ', Ei.TITLE_DEPTH, ' 階到達で習得できます（現在 ', U, 'F）。'],
                  })
                : y.jsx('div', {
                    className: se.titleOpts,
                    children: ((($ = dt[g.classId]) == null ? void 0 : $.titleOptions) ?? []).map(
                      (B) => {
                        var F;
                        return y.jsxs(
                          'button',
                          {
                            type: 'button',
                            className: se.titleBtn,
                            disabled: !my(g, B, U),
                            onClick: () => void K((le) => fx(le, B, U)),
                            children: [(F = ga[B]) == null ? void 0 : F.name, '（SP+5）'],
                          },
                          B
                        );
                      }
                    ),
                  }),
            y.jsx('h2', { className: se.h2, children: '転生' }),
            dy(g)
              ? k
                ? y.jsxs('div', {
                    className: se.rbForm,
                    children: [
                      y.jsxs('p', {
                        className: se.warn,
                        children: [
                          '※ 作り直して強い新人になります（開始Lv ',
                          Math.min(30, Math.floor(g.level / 2)),
                          '・ボーナス付き）。',
                        ],
                      }),
                      y.jsx('input', {
                        className: se.input,
                        type: 'text',
                        maxLength: 16,
                        placeholder: g.name,
                        value: h,
                        onChange: (B) => b(B.target.value),
                      }),
                      y.jsxs('div', {
                        className: se.jobRow,
                        children: [
                          y.jsx('select', {
                            className: se.select,
                            value: v,
                            onChange: (B) => m(B.target.value),
                            children: pp.map((B) =>
                              y.jsx('option', { value: B, children: Kt[B].name }, B)
                            ),
                          }),
                          y.jsx('select', {
                            className: se.select,
                            value: _,
                            onChange: (B) => S(B.target.value),
                            children: Wu.map((B) =>
                              y.jsx('option', { value: B, children: dt[B].name }, B)
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
                                rx(B, u, { raceId: v, classId: _, name: h.trim() || g.name })
                              ),
                                z(!1));
                            },
                            children: '転生を実行',
                          }),
                          y.jsx('button', {
                            type: 'button',
                            className: se.actBtn,
                            onClick: () => z(!1),
                            children: 'やめる',
                          }),
                        ],
                      }),
                    ],
                  })
                : y.jsx('button', {
                    type: 'button',
                    className: se.actBtn,
                    onClick: () => z(!0),
                    children: '転生する…',
                  })
              : y.jsxs('p', {
                  className: se.warn,
                  children: [
                    'Lv',
                    Ei.REBIRTH_MIN_LEVEL,
                    ' 以上で転生できます（現在 Lv',
                    g.level,
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
      return c((F) => Er(F, u, B));
    }
  },
  vx = () => y.jsx('div', { children: y.jsx('h1', { children: 'Not Found' }) }),
  _x = '_layout_1u0ua_1',
  bx = '_head_1u0ua_11',
  Sx = '_title_1u0ua_18',
  xx = '_gold_1u0ua_24',
  Ex = '_tabs_1u0ua_29',
  Tx = '_tab_1u0ua_29',
  Nx = '_tabActive_1u0ua_46',
  Ax = '_list_1u0ua_51',
  Cx = '_row_1u0ua_59',
  Mx = '_info_1u0ua_70',
  kx = '_name_1u0ua_76',
  Rx = '_note_1u0ua_81',
  jx = '_action_1u0ua_86',
  Ox = '_empty_1u0ua_103',
  Dx = '_foot_1u0ua_108',
  zx = '_back_1u0ua_112',
  Ve = {
    layout: _x,
    head: bx,
    title: Sx,
    gold: xx,
    tabs: Ex,
    tab: Tx,
    tabActive: Nx,
    list: Ax,
    row: Cx,
    info: Mx,
    name: kx,
    note: Rx,
    action: jx,
    empty: Ox,
    foot: Dx,
    back: zx,
  };
function wx(a) {
  return Math.max(0, Math.floor(a.towerState.record.deepestReached / 10));
}
const gy = {
    item_slime_jelly: ['equip_slime_shield'],
    item_rat_tail: ['equip_rat_dagger'],
    item_bat_wing: ['equip_bat_cloak'],
    item_golem_core: ['equip_golem_blade'],
  },
  Bx = (a) => {
    const u = zt[a].bonuses,
      o = [];
    return (
      u.atk && o.push(`ATK+${u.atk}`),
      u.mat && o.push(`MAT+${u.mat}`),
      u.def && o.push(`DEF+${u.def}`),
      u.mdf && o.push(`MDF+${u.mdf}`),
      o.join(' ')
    );
  };
function Ux(a) {
  const u = wx(a),
    o = new Set(a.shopStock.unlockedItemIds),
    c = Object.values(ht)
      .filter((d) => d.buyPrice > 0)
      .map((d) => ({ id: d.id, name: d.name, price: d.buyPrice, kind: 'item' }));
  return [
    ...Object.values(zt)
      .filter((d) => d.tier <= u || o.has(d.id))
      .map((d) => ({ id: d.id, name: d.name, price: d.buyPrice, kind: 'equip', note: Bx(d.id) })),
    ...c,
  ];
}
function Lx(a) {
  return gy[a] ?? [];
}
function Hx(a) {
  var u, o;
  return (
    ((u = ht[a]) == null ? void 0 : u.buyPrice) ??
    ((o = zt[a]) == null ? void 0 : o.buyPrice) ??
    null
  );
}
function rr(a) {
  return ht[a] ? C1(ht[a]) : zt[a] ? Math.floor(zt[a].buyPrice / 2) : 0;
}
function qx(a, u) {
  const o = Hx(u);
  if (o === null || o <= 0 || a.guild.gold < o) return a;
  const c = ms(a, u, 1);
  return { ...c, guild: { ...c.guild, gold: c.guild.gold - o } };
}
function Gx(a, u, o = 1) {
  var v;
  if ((((v = a.guild.storage.find((m) => m.itemId === u)) == null ? void 0 : v.qty) ?? 0) < o)
    return a;
  const r = rr(u) * o,
    d = Ai(a, u, o),
    h = Lx(u).filter((m) => !d.shopStock.unlockedItemIds.includes(m)),
    b = [...d.shopStock.unlockedItemIds, ...h];
  return {
    ...d,
    guild: { ...d.guild, gold: d.guild.gold + r },
    shopStock: { ...d.shopStock, unlockedItemIds: b },
  };
}
const Yx = () => {
    const a = Ol(),
      { save: u, applyAndPersist: o } = kn(),
      [c, r] = A.useState('buy');
    if (!u) return y.jsx(jl, { to: '/title', replace: !0 });
    const d = u.guild.gold,
      h = Ux(u),
      b = u.guild.storage.filter((m) => rr(m.itemId) > 0),
      v = (m) => {
        var _, S;
        return (
          ((_ = ht[m]) == null ? void 0 : _.name) ?? ((S = zt[m]) == null ? void 0 : S.name) ?? m
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
                          onClick: () => void o((_) => qx(_, m.id)),
                          children: [m.price, ' G'],
                        }),
                      ],
                    },
                    m.id
                  )
                )
              : b.length === 0
                ? y.jsx('p', { className: Ve.empty, children: '売れる物がありません。' })
                : b.map((m) =>
                    y.jsxs(
                      'div',
                      {
                        className: Ve.row,
                        children: [
                          y.jsxs('div', {
                            className: Ve.info,
                            children: [
                              y.jsx('span', { className: Ve.name, children: v(m.itemId) }),
                              y.jsxs('span', { className: Ve.note, children: ['所持 ', m.qty] }),
                            ],
                          }),
                          y.jsxs('button', {
                            type: 'button',
                            className: Ve.action,
                            onClick: () => void o((_) => Gx(_, m.itemId, 1)),
                            children: ['売却 ', rr(m.itemId), ' G'],
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
  Xx = '_layout_1xkiw_1',
  Vx = '_head_1xkiw_12',
  Qx = '_title_1xkiw_17',
  $x = '_subtitle_1xkiw_24',
  Kx = '_body_1xkiw_30',
  Zx = '_menu_1xkiw_34',
  Jx = '_loading_1xkiw_40',
  Ix = '_warn_1xkiw_45',
  Wx = '_danger_1xkiw_52',
  Fx = '_dialog_1xkiw_67',
  Px = '_dialogTitle_1xkiw_77',
  eE = '_field_1xkiw_82',
  tE = '_note_1xkiw_96',
  lE = '_dialogActions_1xkiw_102',
  nE = '_primary_1xkiw_107',
  aE = '_sub_1xkiw_24',
  iE = '_foot_1xkiw_132',
  Qe = {
    layout: Xx,
    head: Vx,
    title: Qx,
    subtitle: $x,
    body: Kx,
    menu: Zx,
    loading: Jx,
    warn: Ix,
    danger: Wx,
    dialog: Fx,
    dialogTitle: Px,
    field: eE,
    note: tE,
    dialogActions: lE,
    primary: nE,
    sub: aE,
    foot: iE,
  },
  uE = '_card_3vsn6_1',
  sE = '_corrupted_3vsn6_14',
  cE = '_corruptedText_3vsn6_19',
  oE = '_corruptedNote_3vsn6_25',
  rE = '_guildName_3vsn6_31',
  fE = '_meta_3vsn6_36',
  un = {
    card: uE,
    corrupted: sE,
    corruptedText: cE,
    corruptedNote: oE,
    guildName: rE,
    meta: fE,
    continue: '_continue_3vsn6_56',
  },
  dE = (a) => {
    if (!a) return '-';
    const u = new Date(a),
      o = (c) => String(c).padStart(2, '0');
    return `${u.getFullYear()}/${o(u.getMonth() + 1)}/${o(u.getDate())} ${o(u.getHours())}:${o(u.getMinutes())}`;
  },
  mE = ({ meta: a, onContinue: u }) =>
    a.corrupted
      ? y.jsxs('div', {
          className: `${un.card} ${un.corrupted}`,
          children: [
            y.jsx('div', { className: un.corruptedText, children: 'セーブデータが破損しています' }),
            y.jsx('p', {
              className: un.corruptedNote,
              children: '「最初から」で新しく始められます。',
            }),
          ],
        })
      : y.jsxs('div', {
          className: un.card,
          children: [
            y.jsx('div', { className: un.guildName, children: a.guildName }),
            y.jsxs('dl', {
              className: un.meta,
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
                    y.jsx('dd', { children: dE(a.savedAt) }),
                  ],
                }),
              ],
            }),
            y.jsx('button', {
              type: 'button',
              className: un.continue,
              onClick: u,
              children: 'つづきから',
            }),
          ],
        }),
  hE = () => {
    const a = Ol(),
      { startNewGame: u, continueGame: o } = kn(),
      [c, r] = A.useState(null),
      [d, h] = A.useState(!0),
      [b, v] = A.useState('menu'),
      [m, _] = A.useState(''),
      [S, k] = A.useState(!1);
    A.useEffect(() => {
      (async () => (r(await Ib()), h(!1)))();
    }, []);
    const z = c !== null && !c.corrupted,
      g = A.useCallback(async () => {
        k(!0);
        const U = await o();
        (k(!1), U.ok && a('/town'));
      }, [o, a]),
      C = A.useCallback(() => {
        (_(''), v(z ? 'confirm' : 'guildName'));
      }, [z]),
      E = A.useCallback(async () => {
        const U = m.trim() || 'ななしのギルド';
        (k(!0), await u(U), k(!1), a('/town'));
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
            : b === 'guildName'
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
                          onChange: (U) => _(U.target.value),
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
                          onClick: E,
                          children: 'はじめる',
                        }),
                        y.jsx('button', {
                          type: 'button',
                          className: Qe.sub,
                          disabled: S,
                          onClick: () => v('menu'),
                          children: 'もどる',
                        }),
                      ],
                    }),
                  ],
                })
              : b === 'confirm'
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
                            onClick: () => v('guildName'),
                            children: 'データを消して始める',
                          }),
                          y.jsx('button', {
                            type: 'button',
                            className: Qe.sub,
                            disabled: S,
                            onClick: () => v('menu'),
                            children: 'もどる',
                          }),
                        ],
                      }),
                    ],
                  })
                : y.jsxs('div', {
                    className: Qe.menu,
                    children: [
                      c !== null && y.jsx(mE, { meta: c, onContinue: () => void g() }),
                      y.jsx('button', {
                        type: 'button',
                        className: z ? Qe.sub : Qe.primary,
                        onClick: C,
                        children: '最初から',
                      }),
                    ],
                  }),
        }),
        y.jsxs('footer', { className: Qe.foot, children: ['v', '0.1.15'] }),
      ],
    });
  },
  pE = '_layout_1wdo2_1',
  yE = '_head_1wdo2_12',
  gE = '_guildName_1wdo2_16',
  vE = '_stats_1wdo2_21',
  _E = '_hint_1wdo2_40',
  bE = '_menu_1wdo2_50',
  SE = '_foot_1wdo2_57',
  xE = '_exit_1wdo2_61',
  sn = { layout: pE, head: yE, guildName: gE, stats: vE, hint: _E, menu: bE, foot: SE, exit: xE },
  EE = '_button_1tp4a_1',
  TE = '_primary_1tp4a_26',
  NE = '_label_1tp4a_32',
  AE = '_description_1tp4a_37',
  Fu = { button: EE, primary: TE, label: NE, description: AE },
  bi = ({ label: a, description: u, variant: o = 'default', disabled: c = !1, onClick: r }) =>
    y.jsxs('button', {
      type: 'button',
      className: `${Fu.button} ${o === 'primary' ? Fu.primary : ''}`,
      disabled: c,
      onClick: r,
      children: [
        y.jsx('span', { className: Fu.label, children: a }),
        u ? y.jsx('span', { className: Fu.description, children: u }) : null,
      ],
    }),
  CE = () => {
    const a = Ol(),
      { save: u, exitToTitle: o, applyAndPersist: c } = kn();
    if (!u) return y.jsx(jl, { to: '/title', replace: !0 });
    const { guild: r, towerState: d, diveState: h } = u,
      b = r.members.length > 0,
      v = () => {
        (o(), a('/title'));
      },
      m = async () => {
        (h || (await c((_) => pb(_, 1))), a('/dungeon'));
      };
    return y.jsxs('div', {
      className: sn.layout,
      children: [
        y.jsxs('header', {
          className: sn.head,
          children: [
            y.jsx('div', { className: sn.guildName, children: r.name }),
            y.jsxs('dl', {
              className: sn.stats,
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
        !b &&
          y.jsx('p', {
            className: sn.hint,
            children:
              'まずは「ギルド管理」で冒険者を作成してください。団員がいないとダイブできません。',
          }),
        y.jsxs('main', {
          className: sn.menu,
          children: [
            y.jsx(bi, {
              label: h ? '潜行を再開' : 'ダイブ開始',
              description: b
                ? h
                  ? `${h.depth}F から再開`
                  : '第1階からタワーへ潜る'
                : '団員が必要です',
              variant: 'primary',
              disabled: !b,
              onClick: () => void m(),
            }),
            y.jsx(bi, {
              label: 'ギルド管理',
              description: '編成・キャラ作成',
              onClick: () => a('/guild'),
            }),
            y.jsx(bi, {
              label: 'ショップ',
              description: '装備・アイテム売買',
              onClick: () => a('/shop'),
            }),
            y.jsx(bi, { label: '鍛冶屋', description: '武器強化（Phase 4）', disabled: !0 }),
            y.jsx(bi, {
              label: '図鑑 / 記録',
              description: '到達記録・図鑑（Phase 4-5）',
              disabled: !0,
            }),
          ],
        }),
        y.jsx('footer', {
          className: sn.foot,
          children: y.jsx('button', {
            type: 'button',
            className: sn.exit,
            onClick: v,
            children: 'タイトルへ戻る',
          }),
        }),
      ],
    });
  };
function ME() {
  return y.jsxs(Wv, {
    children: [
      y.jsx(al, { path: '/', element: y.jsx(jl, { to: '/title', replace: !0 }) }),
      y.jsx(al, { path: '/title', element: y.jsx(hE, {}) }),
      y.jsx(al, { path: '/town', element: y.jsx(CE, {}) }),
      y.jsx(al, { path: '/guild', element: y.jsx(S2, {}) }),
      y.jsx(al, { path: '/guild/char/:id', element: y.jsx(gx, {}) }),
      y.jsx(al, { path: '/shop', element: y.jsx(Yx, {}) }),
      y.jsx(al, { path: '/dungeon', element: y.jsx(IS, {}) }),
      y.jsx(al, { path: '/battle', element: y.jsx(eS, {}) }),
      y.jsx(al, { path: '*', element: y.jsx(vx, {}) }),
    ],
  });
}
const kE = {
    races: Kt,
    classes: dt,
    titles: ga,
    skills: br,
    unionSkills: xi,
    summons: xa,
    enemies: Mn,
    items: ht,
    equipment: zt,
  },
  RE = /^[a-z]+_[a-z0-9_]+$/;
function Al(a, u, o) {
  for (const c of u)
    RE.test(c) || o.push(`[${a}] ID 命名規約違反: "${c}"（期待: <domain>_<name>）`);
}
function Fo(a, u, o, c) {
  const r = new Set(u.skills.map((d) => d.skillId));
  for (const d of u.skills) {
    o.has(d.skillId) || c.push(`[${a}] 未定義スキルを参照: "${d.skillId}"`);
    for (const h of d.requires ?? [])
      r.has(h.skillId) ||
        c.push(`[${a}] スキル "${d.skillId}" の前提 "${h.skillId}" が同ツリーに存在しない`);
  }
}
function jE() {
  const a = [],
    {
      races: u,
      classes: o,
      titles: c,
      skills: r,
      unionSkills: d,
      summons: h,
      enemies: b,
      items: v,
      equipment: m,
    } = kE;
  (Al('races', Object.keys(u), a),
    Al('classes', Object.keys(o), a),
    Al('titles', Object.keys(c), a),
    Al('skills', Object.keys(r), a),
    Al('enemies', Object.keys(b), a),
    Al('items', Object.keys(v), a),
    Al('equipment', Object.keys(m), a));
  const _ = (g, C) => {
    for (const [E, U] of Object.entries(C))
      E !== U.id && a.push(`[${g}] キー "${E}" と id "${U.id}" が不一致`);
  };
  (_('races', u),
    _('classes', o),
    _('titles', c),
    _('skills', r),
    _('enemies', b),
    _('items', v),
    _('equipment', m));
  const S = new Set(Object.keys(r)),
    k = new Set(Object.keys(o)),
    z = new Set(Object.keys(c));
  for (const g of Object.values(u)) {
    (k.has(g.defaultClassId) ||
      a.push(`[races] "${g.id}" の defaultClassId "${g.defaultClassId}" が未定義`),
      Fo(`races/${g.id}`, g.unionSkillTree, S, a));
    for (const C of g.unionSkillTree.skills) {
      const E = d[C.skillId];
      E
        ? E.raceId !== g.id &&
          a.push(`[races/${g.id}] ユニオンスキル "${C.skillId}" の raceId "${E.raceId}" が不一致`)
        : a.push(`[races/${g.id}] ユニオンスキル "${C.skillId}" の効果定義が UNION_SKILLS に無い`);
    }
  }
  Al('unionSkills', Object.keys(d), a);
  for (const [g, C] of Object.entries(d))
    (g !== C.id && a.push(`[unionSkills] キー "${g}" と id "${C.id}" が不一致`),
      C.id in r || a.push(`[unionSkills] "${C.id}" が skills に未定義`),
      C.requiredParticipants < 1 &&
        a.push(`[unionSkills] "${C.id}" の requiredParticipants が 1 未満`),
      (C.gaugeCostPerParticipant < 0 || C.gaugeCostPerParticipant > 100) &&
        a.push(`[unionSkills] "${C.id}" の gaugeCostPerParticipant が 0..100 外`),
      C.id in cn &&
        a.push(
          `[unionSkills] "${C.id}" が BATTLE_SKILLS にも存在（通常スキルとして撃ててしまう）`
        ));
  Al('summons', Object.keys(h), a);
  for (const [g, C] of Object.entries(h))
    g !== C.id && a.push(`[summons] キー "${g}" と id "${C.id}" が不一致`);
  for (const g of Object.values(cn))
    for (const C of g.effects)
      C.kind === 'summon' &&
        !(C.summonKind in h) &&
        a.push(`[battleSkills] "${g.id}" の召喚 "${C.summonKind}" が未定義`);
  for (const g of Object.values(o)) {
    Fo(`classes/${g.id}`, g.skillTree, S, a);
    for (const C of g.titleOptions) {
      if (!z.has(C)) {
        a.push(`[classes] "${g.id}" の称号 "${C}" が未定義`);
        continue;
      }
      c[C].parentClassId !== g.id &&
        a.push(`[classes] 称号 "${C}" の parentClassId が "${g.id}" と不一致`);
    }
  }
  for (const g of Object.values(c))
    (k.has(g.parentClassId) ||
      a.push(`[titles] "${g.id}" の parentClassId "${g.parentClassId}" が未定義`),
      Fo(`titles/${g.id}`, g.skillTree, S, a));
  for (const g of Object.values(m))
    (g.slot === 'weapon' &&
      !g.weaponType &&
      a.push(`[equipment] "${g.id}" は weapon だが weaponType が未設定`),
      g.slot === 'armor' &&
        !g.armorType &&
        a.push(`[equipment] "${g.id}" は armor だが armorType が未設定`),
      (g.buyPrice < 0 || g.tier < 0) && a.push(`[equipment] "${g.id}" の buyPrice/tier が負`));
  for (const g of Object.values(v))
    (g.buyPrice < 0 && a.push(`[items] "${g.id}" の buyPrice が負`),
      g.category === 'consumable' &&
        !g.useContext &&
        !g.effects &&
        a.push(`[items] 消費アイテム "${g.id}" に useContext も effects も無い（使用不能）`));
  for (const g of Object.values(b))
    for (const C of g.drops ?? [])
      (C.itemId in v || a.push(`[enemies] "${g.id}" のドロップ "${C.itemId}" が未定義アイテム`),
        (C.rate < 0 || C.rate > 1) &&
          a.push(`[enemies] "${g.id}" のドロップ "${C.itemId}" の rate が 0..1 外`));
  for (const [g, C] of Object.entries(gy)) {
    g in v || a.push(`[SELL_UNLOCKS] キー素材 "${g}" が未定義`);
    for (const E of C) E in m || a.push(`[SELL_UNLOCKS] 解放先装備 "${E}" が未定義`);
  }
  return { ok: a.length === 0, errors: a };
}
const yp = jE();
yp.ok || console.error('マスターデータ検証エラー:', yp.errors);
const vy = document.getElementById('root');
if (!vy) throw new Error('Failed to find #root element');
P0.createRoot(vy).render(
  y.jsx(S_, { basename: '/sekaiju-like-game', children: y.jsx(Pb, { children: y.jsx(ME, {}) }) })
);
