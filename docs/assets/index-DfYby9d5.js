var yv = Object.defineProperty;
var pv = (n, c, o) =>
  c in n ? yv(n, c, { enumerable: !0, configurable: !0, writable: !0, value: o }) : (n[c] = o);
var Eo = (n, c, o) => pv(n, typeof c != 'symbol' ? c + '' : c, o);
(function () {
  const c = document.createElement('link').relList;
  if (c && c.supports && c.supports('modulepreload')) return;
  for (const r of document.querySelectorAll('link[rel="modulepreload"]')) s(r);
  new MutationObserver((r) => {
    for (const d of r)
      if (d.type === 'childList')
        for (const p of d.addedNodes) p.tagName === 'LINK' && p.rel === 'modulepreload' && s(p);
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
var To = { exports: {} },
  cu = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var _h;
function vv() {
  if (_h) return cu;
  _h = 1;
  var n = Symbol.for('react.transitional.element'),
    c = Symbol.for('react.fragment');
  function o(s, r, d) {
    var p = null;
    if ((d !== void 0 && (p = '' + d), r.key !== void 0 && (p = '' + r.key), 'key' in r)) {
      d = {};
      for (var v in r) v !== 'key' && (d[v] = r[v]);
    } else d = r;
    return ((r = d.ref), { $$typeof: n, type: s, key: p, ref: r !== void 0 ? r : null, props: d });
  }
  return ((cu.Fragment = c), (cu.jsx = o), (cu.jsxs = o), cu);
}
var bh;
function gv() {
  return (bh || ((bh = 1), (To.exports = vv())), To.exports);
}
var g = gv(),
  No = { exports: {} },
  su = {},
  Ao = { exports: {} },
  Mo = {};
/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Sh;
function _v() {
  return (
    Sh ||
      ((Sh = 1),
      (function (n) {
        function c(U, R) {
          var Z = U.length;
          U.push(R);
          t: for (; 0 < Z; ) {
            var ct = (Z - 1) >>> 1,
              vt = U[ct];
            if (0 < r(vt, R)) ((U[ct] = R), (U[Z] = vt), (Z = ct));
            else break t;
          }
        }
        function o(U) {
          return U.length === 0 ? null : U[0];
        }
        function s(U) {
          if (U.length === 0) return null;
          var R = U[0],
            Z = U.pop();
          if (Z !== R) {
            U[0] = Z;
            t: for (var ct = 0, vt = U.length, S = vt >>> 1; ct < S; ) {
              var q = 2 * (ct + 1) - 1,
                K = U[q],
                F = q + 1,
                nt = U[F];
              if (0 > r(K, Z))
                F < vt && 0 > r(nt, K)
                  ? ((U[ct] = nt), (U[F] = Z), (ct = F))
                  : ((U[ct] = K), (U[q] = Z), (ct = q));
              else if (F < vt && 0 > r(nt, Z)) ((U[ct] = nt), (U[F] = Z), (ct = F));
              else break t;
            }
          }
          return R;
        }
        function r(U, R) {
          var Z = U.sortIndex - R.sortIndex;
          return Z !== 0 ? Z : U.id - R.id;
        }
        if (
          ((n.unstable_now = void 0),
          typeof performance == 'object' && typeof performance.now == 'function')
        ) {
          var d = performance;
          n.unstable_now = function () {
            return d.now();
          };
        } else {
          var p = Date,
            v = p.now();
          n.unstable_now = function () {
            return p.now() - v;
          };
        }
        var y = [],
          m = [],
          E = 1,
          _ = null,
          T = 3,
          Y = !1,
          H = !1,
          z = !1,
          B = !1,
          w = typeof setTimeout == 'function' ? setTimeout : null,
          Q = typeof clearTimeout == 'function' ? clearTimeout : null,
          j = typeof setImmediate < 'u' ? setImmediate : null;
        function X(U) {
          for (var R = o(m); R !== null; ) {
            if (R.callback === null) s(m);
            else if (R.startTime <= U) (s(m), (R.sortIndex = R.expirationTime), c(y, R));
            else break;
            R = o(m);
          }
        }
        function $(U) {
          if (((z = !1), X(U), !H))
            if (o(y) !== null) ((H = !0), J || ((J = !0), $t()));
            else {
              var R = o(m);
              R !== null && Ut($, R.startTime - U);
            }
        }
        var J = !1,
          V = -1,
          tt = 5,
          it = -1;
        function dt() {
          return B ? !0 : !(n.unstable_now() - it < tt);
        }
        function wt() {
          if (((B = !1), J)) {
            var U = n.unstable_now();
            it = U;
            var R = !0;
            try {
              t: {
                ((H = !1), z && ((z = !1), Q(V), (V = -1)), (Y = !0));
                var Z = T;
                try {
                  e: {
                    for (X(U), _ = o(y); _ !== null && !(_.expirationTime > U && dt()); ) {
                      var ct = _.callback;
                      if (typeof ct == 'function') {
                        ((_.callback = null), (T = _.priorityLevel));
                        var vt = ct(_.expirationTime <= U);
                        if (((U = n.unstable_now()), typeof vt == 'function')) {
                          ((_.callback = vt), X(U), (R = !0));
                          break e;
                        }
                        (_ === o(y) && s(y), X(U));
                      } else s(y);
                      _ = o(y);
                    }
                    if (_ !== null) R = !0;
                    else {
                      var S = o(m);
                      (S !== null && Ut($, S.startTime - U), (R = !1));
                    }
                  }
                  break t;
                } finally {
                  ((_ = null), (T = Z), (Y = !1));
                }
                R = void 0;
              }
            } finally {
              R ? $t() : (J = !1);
            }
          }
        }
        var $t;
        if (typeof j == 'function')
          $t = function () {
            j(wt);
          };
        else if (typeof MessageChannel < 'u') {
          var he = new MessageChannel(),
            ie = he.port2;
          ((he.port1.onmessage = wt),
            ($t = function () {
              ie.postMessage(null);
            }));
        } else
          $t = function () {
            w(wt, 0);
          };
        function Ut(U, R) {
          V = w(function () {
            U(n.unstable_now());
          }, R);
        }
        ((n.unstable_IdlePriority = 5),
          (n.unstable_ImmediatePriority = 1),
          (n.unstable_LowPriority = 4),
          (n.unstable_NormalPriority = 3),
          (n.unstable_Profiling = null),
          (n.unstable_UserBlockingPriority = 2),
          (n.unstable_cancelCallback = function (U) {
            U.callback = null;
          }),
          (n.unstable_forceFrameRate = function (U) {
            0 > U || 125 < U
              ? console.error(
                  'forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported'
                )
              : (tt = 0 < U ? Math.floor(1e3 / U) : 5);
          }),
          (n.unstable_getCurrentPriorityLevel = function () {
            return T;
          }),
          (n.unstable_next = function (U) {
            switch (T) {
              case 1:
              case 2:
              case 3:
                var R = 3;
                break;
              default:
                R = T;
            }
            var Z = T;
            T = R;
            try {
              return U();
            } finally {
              T = Z;
            }
          }),
          (n.unstable_requestPaint = function () {
            B = !0;
          }),
          (n.unstable_runWithPriority = function (U, R) {
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
            var Z = T;
            T = U;
            try {
              return R();
            } finally {
              T = Z;
            }
          }),
          (n.unstable_scheduleCallback = function (U, R, Z) {
            var ct = n.unstable_now();
            switch (
              (typeof Z == 'object' && Z !== null
                ? ((Z = Z.delay), (Z = typeof Z == 'number' && 0 < Z ? ct + Z : ct))
                : (Z = ct),
              U)
            ) {
              case 1:
                var vt = -1;
                break;
              case 2:
                vt = 250;
                break;
              case 5:
                vt = 1073741823;
                break;
              case 4:
                vt = 1e4;
                break;
              default:
                vt = 5e3;
            }
            return (
              (vt = Z + vt),
              (U = {
                id: E++,
                callback: R,
                priorityLevel: U,
                startTime: Z,
                expirationTime: vt,
                sortIndex: -1,
              }),
              Z > ct
                ? ((U.sortIndex = Z),
                  c(m, U),
                  o(y) === null && U === o(m) && (z ? (Q(V), (V = -1)) : (z = !0), Ut($, Z - ct)))
                : ((U.sortIndex = vt), c(y, U), H || Y || ((H = !0), J || ((J = !0), $t()))),
              U
            );
          }),
          (n.unstable_shouldYield = dt),
          (n.unstable_wrapCallback = function (U) {
            var R = T;
            return function () {
              var Z = T;
              T = R;
              try {
                return U.apply(this, arguments);
              } finally {
                T = Z;
              }
            };
          }));
      })(Mo)),
    Mo
  );
}
var xh;
function bv() {
  return (xh || ((xh = 1), (Ao.exports = _v())), Ao.exports);
}
var Co = { exports: {} },
  at = {};
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Eh;
function Sv() {
  if (Eh) return at;
  Eh = 1;
  var n = Symbol.for('react.transitional.element'),
    c = Symbol.for('react.portal'),
    o = Symbol.for('react.fragment'),
    s = Symbol.for('react.strict_mode'),
    r = Symbol.for('react.profiler'),
    d = Symbol.for('react.consumer'),
    p = Symbol.for('react.context'),
    v = Symbol.for('react.forward_ref'),
    y = Symbol.for('react.suspense'),
    m = Symbol.for('react.memo'),
    E = Symbol.for('react.lazy'),
    _ = Symbol.for('react.activity'),
    T = Symbol.iterator;
  function Y(S) {
    return S === null || typeof S != 'object'
      ? null
      : ((S = (T && S[T]) || S['@@iterator']), typeof S == 'function' ? S : null);
  }
  var H = {
      isMounted: function () {
        return !1;
      },
      enqueueForceUpdate: function () {},
      enqueueReplaceState: function () {},
      enqueueSetState: function () {},
    },
    z = Object.assign,
    B = {};
  function w(S, q, K) {
    ((this.props = S), (this.context = q), (this.refs = B), (this.updater = K || H));
  }
  ((w.prototype.isReactComponent = {}),
    (w.prototype.setState = function (S, q) {
      if (typeof S != 'object' && typeof S != 'function' && S != null)
        throw Error(
          'takes an object of state variables to update or a function which returns an object of state variables.'
        );
      this.updater.enqueueSetState(this, S, q, 'setState');
    }),
    (w.prototype.forceUpdate = function (S) {
      this.updater.enqueueForceUpdate(this, S, 'forceUpdate');
    }));
  function Q() {}
  Q.prototype = w.prototype;
  function j(S, q, K) {
    ((this.props = S), (this.context = q), (this.refs = B), (this.updater = K || H));
  }
  var X = (j.prototype = new Q());
  ((X.constructor = j), z(X, w.prototype), (X.isPureReactComponent = !0));
  var $ = Array.isArray;
  function J() {}
  var V = { H: null, A: null, T: null, S: null },
    tt = Object.prototype.hasOwnProperty;
  function it(S, q, K) {
    var F = K.ref;
    return { $$typeof: n, type: S, key: q, ref: F !== void 0 ? F : null, props: K };
  }
  function dt(S, q) {
    return it(S.type, q, S.props);
  }
  function wt(S) {
    return typeof S == 'object' && S !== null && S.$$typeof === n;
  }
  function $t(S) {
    var q = { '=': '=0', ':': '=2' };
    return (
      '$' +
      S.replace(/[=:]/g, function (K) {
        return q[K];
      })
    );
  }
  var he = /\/+/g;
  function ie(S, q) {
    return typeof S == 'object' && S !== null && S.key != null ? $t('' + S.key) : q.toString(36);
  }
  function Ut(S) {
    switch (S.status) {
      case 'fulfilled':
        return S.value;
      case 'rejected':
        throw S.reason;
      default:
        switch (
          (typeof S.status == 'string'
            ? S.then(J, J)
            : ((S.status = 'pending'),
              S.then(
                function (q) {
                  S.status === 'pending' && ((S.status = 'fulfilled'), (S.value = q));
                },
                function (q) {
                  S.status === 'pending' && ((S.status = 'rejected'), (S.reason = q));
                }
              )),
          S.status)
        ) {
          case 'fulfilled':
            return S.value;
          case 'rejected':
            throw S.reason;
        }
    }
    throw S;
  }
  function U(S, q, K, F, nt) {
    var ot = typeof S;
    (ot === 'undefined' || ot === 'boolean') && (S = null);
    var St = !1;
    if (S === null) St = !0;
    else
      switch (ot) {
        case 'bigint':
        case 'string':
        case 'number':
          St = !0;
          break;
        case 'object':
          switch (S.$$typeof) {
            case n:
            case c:
              St = !0;
              break;
            case E:
              return ((St = S._init), U(St(S._payload), q, K, F, nt));
          }
      }
    if (St)
      return (
        (nt = nt(S)),
        (St = F === '' ? '.' + ie(S, 0) : F),
        $(nt)
          ? ((K = ''),
            St != null && (K = St.replace(he, '$&/') + '/'),
            U(nt, q, K, '', function (hn) {
              return hn;
            }))
          : nt != null &&
            (wt(nt) &&
              (nt = dt(
                nt,
                K +
                  (nt.key == null || (S && S.key === nt.key)
                    ? ''
                    : ('' + nt.key).replace(he, '$&/') + '/') +
                  St
              )),
            q.push(nt)),
        1
      );
    St = 0;
    var ne = F === '' ? '.' : F + ':';
    if ($(S))
      for (var Gt = 0; Gt < S.length; Gt++)
        ((F = S[Gt]), (ot = ne + ie(F, Gt)), (St += U(F, q, K, ot, nt)));
    else if (((Gt = Y(S)), typeof Gt == 'function'))
      for (S = Gt.call(S), Gt = 0; !(F = S.next()).done; )
        ((F = F.value), (ot = ne + ie(F, Gt++)), (St += U(F, q, K, ot, nt)));
    else if (ot === 'object') {
      if (typeof S.then == 'function') return U(Ut(S), q, K, F, nt);
      throw (
        (q = String(S)),
        Error(
          'Objects are not valid as a React child (found: ' +
            (q === '[object Object]' ? 'object with keys {' + Object.keys(S).join(', ') + '}' : q) +
            '). If you meant to render a collection of children, use an array instead.'
        )
      );
    }
    return St;
  }
  function R(S, q, K) {
    if (S == null) return S;
    var F = [],
      nt = 0;
    return (
      U(S, F, '', '', function (ot) {
        return q.call(K, ot, nt++);
      }),
      F
    );
  }
  function Z(S) {
    if (S._status === -1) {
      var q = S._result;
      ((q = q()),
        q.then(
          function (K) {
            (S._status === 0 || S._status === -1) && ((S._status = 1), (S._result = K));
          },
          function (K) {
            (S._status === 0 || S._status === -1) && ((S._status = 2), (S._result = K));
          }
        ),
        S._status === -1 && ((S._status = 0), (S._result = q)));
    }
    if (S._status === 1) return S._result.default;
    throw S._result;
  }
  var ct =
      typeof reportError == 'function'
        ? reportError
        : function (S) {
            if (typeof window == 'object' && typeof window.ErrorEvent == 'function') {
              var q = new window.ErrorEvent('error', {
                bubbles: !0,
                cancelable: !0,
                message:
                  typeof S == 'object' && S !== null && typeof S.message == 'string'
                    ? String(S.message)
                    : String(S),
                error: S,
              });
              if (!window.dispatchEvent(q)) return;
            } else if (typeof process == 'object' && typeof process.emit == 'function') {
              process.emit('uncaughtException', S);
              return;
            }
            console.error(S);
          },
    vt = {
      map: R,
      forEach: function (S, q, K) {
        R(
          S,
          function () {
            q.apply(this, arguments);
          },
          K
        );
      },
      count: function (S) {
        var q = 0;
        return (
          R(S, function () {
            q++;
          }),
          q
        );
      },
      toArray: function (S) {
        return (
          R(S, function (q) {
            return q;
          }) || []
        );
      },
      only: function (S) {
        if (!wt(S))
          throw Error('React.Children.only expected to receive a single React element child.');
        return S;
      },
    };
  return (
    (at.Activity = _),
    (at.Children = vt),
    (at.Component = w),
    (at.Fragment = o),
    (at.Profiler = r),
    (at.PureComponent = j),
    (at.StrictMode = s),
    (at.Suspense = y),
    (at.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = V),
    (at.__COMPILER_RUNTIME = {
      __proto__: null,
      c: function (S) {
        return V.H.useMemoCache(S);
      },
    }),
    (at.cache = function (S) {
      return function () {
        return S.apply(null, arguments);
      };
    }),
    (at.cacheSignal = function () {
      return null;
    }),
    (at.cloneElement = function (S, q, K) {
      if (S == null) throw Error('The argument must be a React element, but you passed ' + S + '.');
      var F = z({}, S.props),
        nt = S.key;
      if (q != null)
        for (ot in (q.key !== void 0 && (nt = '' + q.key), q))
          !tt.call(q, ot) ||
            ot === 'key' ||
            ot === '__self' ||
            ot === '__source' ||
            (ot === 'ref' && q.ref === void 0) ||
            (F[ot] = q[ot]);
      var ot = arguments.length - 2;
      if (ot === 1) F.children = K;
      else if (1 < ot) {
        for (var St = Array(ot), ne = 0; ne < ot; ne++) St[ne] = arguments[ne + 2];
        F.children = St;
      }
      return it(S.type, nt, F);
    }),
    (at.createContext = function (S) {
      return (
        (S = {
          $$typeof: p,
          _currentValue: S,
          _currentValue2: S,
          _threadCount: 0,
          Provider: null,
          Consumer: null,
        }),
        (S.Provider = S),
        (S.Consumer = { $$typeof: d, _context: S }),
        S
      );
    }),
    (at.createElement = function (S, q, K) {
      var F,
        nt = {},
        ot = null;
      if (q != null)
        for (F in (q.key !== void 0 && (ot = '' + q.key), q))
          tt.call(q, F) && F !== 'key' && F !== '__self' && F !== '__source' && (nt[F] = q[F]);
      var St = arguments.length - 2;
      if (St === 1) nt.children = K;
      else if (1 < St) {
        for (var ne = Array(St), Gt = 0; Gt < St; Gt++) ne[Gt] = arguments[Gt + 2];
        nt.children = ne;
      }
      if (S && S.defaultProps)
        for (F in ((St = S.defaultProps), St)) nt[F] === void 0 && (nt[F] = St[F]);
      return it(S, ot, nt);
    }),
    (at.createRef = function () {
      return { current: null };
    }),
    (at.forwardRef = function (S) {
      return { $$typeof: v, render: S };
    }),
    (at.isValidElement = wt),
    (at.lazy = function (S) {
      return { $$typeof: E, _payload: { _status: -1, _result: S }, _init: Z };
    }),
    (at.memo = function (S, q) {
      return { $$typeof: m, type: S, compare: q === void 0 ? null : q };
    }),
    (at.startTransition = function (S) {
      var q = V.T,
        K = {};
      V.T = K;
      try {
        var F = S(),
          nt = V.S;
        (nt !== null && nt(K, F),
          typeof F == 'object' && F !== null && typeof F.then == 'function' && F.then(J, ct));
      } catch (ot) {
        ct(ot);
      } finally {
        (q !== null && K.types !== null && (q.types = K.types), (V.T = q));
      }
    }),
    (at.unstable_useCacheRefresh = function () {
      return V.H.useCacheRefresh();
    }),
    (at.use = function (S) {
      return V.H.use(S);
    }),
    (at.useActionState = function (S, q, K) {
      return V.H.useActionState(S, q, K);
    }),
    (at.useCallback = function (S, q) {
      return V.H.useCallback(S, q);
    }),
    (at.useContext = function (S) {
      return V.H.useContext(S);
    }),
    (at.useDebugValue = function () {}),
    (at.useDeferredValue = function (S, q) {
      return V.H.useDeferredValue(S, q);
    }),
    (at.useEffect = function (S, q) {
      return V.H.useEffect(S, q);
    }),
    (at.useEffectEvent = function (S) {
      return V.H.useEffectEvent(S);
    }),
    (at.useId = function () {
      return V.H.useId();
    }),
    (at.useImperativeHandle = function (S, q, K) {
      return V.H.useImperativeHandle(S, q, K);
    }),
    (at.useInsertionEffect = function (S, q) {
      return V.H.useInsertionEffect(S, q);
    }),
    (at.useLayoutEffect = function (S, q) {
      return V.H.useLayoutEffect(S, q);
    }),
    (at.useMemo = function (S, q) {
      return V.H.useMemo(S, q);
    }),
    (at.useOptimistic = function (S, q) {
      return V.H.useOptimistic(S, q);
    }),
    (at.useReducer = function (S, q, K) {
      return V.H.useReducer(S, q, K);
    }),
    (at.useRef = function (S) {
      return V.H.useRef(S);
    }),
    (at.useState = function (S) {
      return V.H.useState(S);
    }),
    (at.useSyncExternalStore = function (S, q, K) {
      return V.H.useSyncExternalStore(S, q, K);
    }),
    (at.useTransition = function () {
      return V.H.useTransition();
    }),
    (at.version = '19.2.5'),
    at
  );
}
var Th;
function Io() {
  return (Th || ((Th = 1), (Co.exports = Sv())), Co.exports);
}
var Ro = { exports: {} },
  ae = {};
/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Nh;
function xv() {
  if (Nh) return ae;
  Nh = 1;
  var n = Io();
  function c(y) {
    var m = 'https://react.dev/errors/' + y;
    if (1 < arguments.length) {
      m += '?args[]=' + encodeURIComponent(arguments[1]);
      for (var E = 2; E < arguments.length; E++) m += '&args[]=' + encodeURIComponent(arguments[E]);
    }
    return (
      'Minified React error #' +
      y +
      '; visit ' +
      m +
      ' for the full message or use the non-minified dev environment for full errors and additional helpful warnings.'
    );
  }
  function o() {}
  var s = {
      d: {
        f: o,
        r: function () {
          throw Error(c(522));
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
  function d(y, m, E) {
    var _ = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: r,
      key: _ == null ? null : '' + _,
      children: y,
      containerInfo: m,
      implementation: E,
    };
  }
  var p = n.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function v(y, m) {
    if (y === 'font') return '';
    if (typeof m == 'string') return m === 'use-credentials' ? m : '';
  }
  return (
    (ae.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = s),
    (ae.createPortal = function (y, m) {
      var E = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
      if (!m || (m.nodeType !== 1 && m.nodeType !== 9 && m.nodeType !== 11)) throw Error(c(299));
      return d(y, m, null, E);
    }),
    (ae.flushSync = function (y) {
      var m = p.T,
        E = s.p;
      try {
        if (((p.T = null), (s.p = 2), y)) return y();
      } finally {
        ((p.T = m), (s.p = E), s.d.f());
      }
    }),
    (ae.preconnect = function (y, m) {
      typeof y == 'string' &&
        (m
          ? ((m = m.crossOrigin),
            (m = typeof m == 'string' ? (m === 'use-credentials' ? m : '') : void 0))
          : (m = null),
        s.d.C(y, m));
    }),
    (ae.prefetchDNS = function (y) {
      typeof y == 'string' && s.d.D(y);
    }),
    (ae.preinit = function (y, m) {
      if (typeof y == 'string' && m && typeof m.as == 'string') {
        var E = m.as,
          _ = v(E, m.crossOrigin),
          T = typeof m.integrity == 'string' ? m.integrity : void 0,
          Y = typeof m.fetchPriority == 'string' ? m.fetchPriority : void 0;
        E === 'style'
          ? s.d.S(y, typeof m.precedence == 'string' ? m.precedence : void 0, {
              crossOrigin: _,
              integrity: T,
              fetchPriority: Y,
            })
          : E === 'script' &&
            s.d.X(y, {
              crossOrigin: _,
              integrity: T,
              fetchPriority: Y,
              nonce: typeof m.nonce == 'string' ? m.nonce : void 0,
            });
      }
    }),
    (ae.preinitModule = function (y, m) {
      if (typeof y == 'string')
        if (typeof m == 'object' && m !== null) {
          if (m.as == null || m.as === 'script') {
            var E = v(m.as, m.crossOrigin);
            s.d.M(y, {
              crossOrigin: E,
              integrity: typeof m.integrity == 'string' ? m.integrity : void 0,
              nonce: typeof m.nonce == 'string' ? m.nonce : void 0,
            });
          }
        } else m == null && s.d.M(y);
    }),
    (ae.preload = function (y, m) {
      if (typeof y == 'string' && typeof m == 'object' && m !== null && typeof m.as == 'string') {
        var E = m.as,
          _ = v(E, m.crossOrigin);
        s.d.L(y, E, {
          crossOrigin: _,
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
    (ae.preloadModule = function (y, m) {
      if (typeof y == 'string')
        if (m) {
          var E = v(m.as, m.crossOrigin);
          s.d.m(y, {
            as: typeof m.as == 'string' && m.as !== 'script' ? m.as : void 0,
            crossOrigin: E,
            integrity: typeof m.integrity == 'string' ? m.integrity : void 0,
          });
        } else s.d.m(y);
    }),
    (ae.requestFormReset = function (y) {
      s.d.r(y);
    }),
    (ae.unstable_batchedUpdates = function (y, m) {
      return y(m);
    }),
    (ae.useFormState = function (y, m, E) {
      return p.H.useFormState(y, m, E);
    }),
    (ae.useFormStatus = function () {
      return p.H.useHostTransitionStatus();
    }),
    (ae.version = '19.2.5'),
    ae
  );
}
var Ah;
function Ev() {
  if (Ah) return Ro.exports;
  Ah = 1;
  function n() {
    if (
      !(
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > 'u' ||
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != 'function'
      )
    )
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n);
      } catch (c) {
        console.error(c);
      }
  }
  return (n(), (Ro.exports = xv()), Ro.exports);
}
/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Mh;
function Tv() {
  if (Mh) return su;
  Mh = 1;
  var n = bv(),
    c = Io(),
    o = Ev();
  function s(t) {
    var e = 'https://react.dev/errors/' + t;
    if (1 < arguments.length) {
      e += '?args[]=' + encodeURIComponent(arguments[1]);
      for (var l = 2; l < arguments.length; l++) e += '&args[]=' + encodeURIComponent(arguments[l]);
    }
    return (
      'Minified React error #' +
      t +
      '; visit ' +
      e +
      ' for the full message or use the non-minified dev environment for full errors and additional helpful warnings.'
    );
  }
  function r(t) {
    return !(!t || (t.nodeType !== 1 && t.nodeType !== 9 && t.nodeType !== 11));
  }
  function d(t) {
    var e = t,
      l = t;
    if (t.alternate) for (; e.return; ) e = e.return;
    else {
      t = e;
      do ((e = t), (e.flags & 4098) !== 0 && (l = e.return), (t = e.return));
      while (t);
    }
    return e.tag === 3 ? l : null;
  }
  function p(t) {
    if (t.tag === 13) {
      var e = t.memoizedState;
      if ((e === null && ((t = t.alternate), t !== null && (e = t.memoizedState)), e !== null))
        return e.dehydrated;
    }
    return null;
  }
  function v(t) {
    if (t.tag === 31) {
      var e = t.memoizedState;
      if ((e === null && ((t = t.alternate), t !== null && (e = t.memoizedState)), e !== null))
        return e.dehydrated;
    }
    return null;
  }
  function y(t) {
    if (d(t) !== t) throw Error(s(188));
  }
  function m(t) {
    var e = t.alternate;
    if (!e) {
      if (((e = d(t)), e === null)) throw Error(s(188));
      return e !== t ? null : t;
    }
    for (var l = t, a = e; ; ) {
      var u = l.return;
      if (u === null) break;
      var i = u.alternate;
      if (i === null) {
        if (((a = u.return), a !== null)) {
          l = a;
          continue;
        }
        break;
      }
      if (u.child === i.child) {
        for (i = u.child; i; ) {
          if (i === l) return (y(u), t);
          if (i === a) return (y(u), e);
          i = i.sibling;
        }
        throw Error(s(188));
      }
      if (l.return !== a.return) ((l = u), (a = i));
      else {
        for (var f = !1, h = u.child; h; ) {
          if (h === l) {
            ((f = !0), (l = u), (a = i));
            break;
          }
          if (h === a) {
            ((f = !0), (a = u), (l = i));
            break;
          }
          h = h.sibling;
        }
        if (!f) {
          for (h = i.child; h; ) {
            if (h === l) {
              ((f = !0), (l = i), (a = u));
              break;
            }
            if (h === a) {
              ((f = !0), (a = i), (l = u));
              break;
            }
            h = h.sibling;
          }
          if (!f) throw Error(s(189));
        }
      }
      if (l.alternate !== a) throw Error(s(190));
    }
    if (l.tag !== 3) throw Error(s(188));
    return l.stateNode.current === l ? t : e;
  }
  function E(t) {
    var e = t.tag;
    if (e === 5 || e === 26 || e === 27 || e === 6) return t;
    for (t = t.child; t !== null; ) {
      if (((e = E(t)), e !== null)) return e;
      t = t.sibling;
    }
    return null;
  }
  var _ = Object.assign,
    T = Symbol.for('react.element'),
    Y = Symbol.for('react.transitional.element'),
    H = Symbol.for('react.portal'),
    z = Symbol.for('react.fragment'),
    B = Symbol.for('react.strict_mode'),
    w = Symbol.for('react.profiler'),
    Q = Symbol.for('react.consumer'),
    j = Symbol.for('react.context'),
    X = Symbol.for('react.forward_ref'),
    $ = Symbol.for('react.suspense'),
    J = Symbol.for('react.suspense_list'),
    V = Symbol.for('react.memo'),
    tt = Symbol.for('react.lazy'),
    it = Symbol.for('react.activity'),
    dt = Symbol.for('react.memo_cache_sentinel'),
    wt = Symbol.iterator;
  function $t(t) {
    return t === null || typeof t != 'object'
      ? null
      : ((t = (wt && t[wt]) || t['@@iterator']), typeof t == 'function' ? t : null);
  }
  var he = Symbol.for('react.client.reference');
  function ie(t) {
    if (t == null) return null;
    if (typeof t == 'function') return t.$$typeof === he ? null : t.displayName || t.name || null;
    if (typeof t == 'string') return t;
    switch (t) {
      case z:
        return 'Fragment';
      case w:
        return 'Profiler';
      case B:
        return 'StrictMode';
      case $:
        return 'Suspense';
      case J:
        return 'SuspenseList';
      case it:
        return 'Activity';
    }
    if (typeof t == 'object')
      switch (t.$$typeof) {
        case H:
          return 'Portal';
        case j:
          return t.displayName || 'Context';
        case Q:
          return (t._context.displayName || 'Context') + '.Consumer';
        case X:
          var e = t.render;
          return (
            (t = t.displayName),
            t ||
              ((t = e.displayName || e.name || ''),
              (t = t !== '' ? 'ForwardRef(' + t + ')' : 'ForwardRef')),
            t
          );
        case V:
          return ((e = t.displayName || null), e !== null ? e : ie(t.type) || 'Memo');
        case tt:
          ((e = t._payload), (t = t._init));
          try {
            return ie(t(e));
          } catch {}
      }
    return null;
  }
  var Ut = Array.isArray,
    U = c.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
    R = o.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
    Z = { pending: !1, data: null, method: null, action: null },
    ct = [],
    vt = -1;
  function S(t) {
    return { current: t };
  }
  function q(t) {
    0 > vt || ((t.current = ct[vt]), (ct[vt] = null), vt--);
  }
  function K(t, e) {
    (vt++, (ct[vt] = t.current), (t.current = e));
  }
  var F = S(null),
    nt = S(null),
    ot = S(null),
    St = S(null);
  function ne(t, e) {
    switch ((K(ot, e), K(nt, t), K(F, null), e.nodeType)) {
      case 9:
      case 11:
        t = (t = e.documentElement) && (t = t.namespaceURI) ? Ym(t) : 0;
        break;
      default:
        if (((t = e.tagName), (e = e.namespaceURI))) ((e = Ym(e)), (t = Xm(e, t)));
        else
          switch (t) {
            case 'svg':
              t = 1;
              break;
            case 'math':
              t = 2;
              break;
            default:
              t = 0;
          }
    }
    (q(F), K(F, t));
  }
  function Gt() {
    (q(F), q(nt), q(ot));
  }
  function hn(t) {
    t.memoizedState !== null && K(St, t);
    var e = F.current,
      l = Xm(e, t.type);
    e !== l && (K(nt, t), K(F, l));
  }
  function xu(t) {
    (nt.current === t && (q(F), q(nt)), St.current === t && (q(St), (au._currentValue = Z)));
  }
  var nc, vr;
  function Wl(t) {
    if (nc === void 0)
      try {
        throw Error();
      } catch (l) {
        var e = l.stack.trim().match(/\n( *(at )?)/);
        ((nc = (e && e[1]) || ''),
          (vr =
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
      nc +
      t +
      vr
    );
  }
  var uc = !1;
  function ic(t, e) {
    if (!t || uc) return '';
    uc = !0;
    var l = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var a = {
        DetermineComponentFrameRoot: function () {
          try {
            if (e) {
              var G = function () {
                throw Error();
              };
              if (
                (Object.defineProperty(G.prototype, 'props', {
                  set: function () {
                    throw Error();
                  },
                }),
                typeof Reflect == 'object' && Reflect.construct)
              ) {
                try {
                  Reflect.construct(G, []);
                } catch (O) {
                  var D = O;
                }
                Reflect.construct(t, [], G);
              } else {
                try {
                  G.call();
                } catch (O) {
                  D = O;
                }
                t.call(G.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (O) {
                D = O;
              }
              (G = t()) && typeof G.catch == 'function' && G.catch(function () {});
            }
          } catch (O) {
            if (O && D && typeof O.stack == 'string') return [O.stack, D.stack];
          }
          return [null, null];
        },
      };
      a.DetermineComponentFrameRoot.displayName = 'DetermineComponentFrameRoot';
      var u = Object.getOwnPropertyDescriptor(a.DetermineComponentFrameRoot, 'name');
      u &&
        u.configurable &&
        Object.defineProperty(a.DetermineComponentFrameRoot, 'name', {
          value: 'DetermineComponentFrameRoot',
        });
      var i = a.DetermineComponentFrameRoot(),
        f = i[0],
        h = i[1];
      if (f && h) {
        var b = f.split(`
`),
          C = h.split(`
`);
        for (u = a = 0; a < b.length && !b[a].includes('DetermineComponentFrameRoot'); ) a++;
        for (; u < C.length && !C[u].includes('DetermineComponentFrameRoot'); ) u++;
        if (a === b.length || u === C.length)
          for (a = b.length - 1, u = C.length - 1; 1 <= a && 0 <= u && b[a] !== C[u]; ) u--;
        for (; 1 <= a && 0 <= u; a--, u--)
          if (b[a] !== C[u]) {
            if (a !== 1 || u !== 1)
              do
                if ((a--, u--, 0 > u || b[a] !== C[u])) {
                  var k =
                    `
` + b[a].replace(' at new ', ' at ');
                  return (
                    t.displayName &&
                      k.includes('<anonymous>') &&
                      (k = k.replace('<anonymous>', t.displayName)),
                    k
                  );
                }
              while (1 <= a && 0 <= u);
            break;
          }
      }
    } finally {
      ((uc = !1), (Error.prepareStackTrace = l));
    }
    return (l = t ? t.displayName || t.name : '') ? Wl(l) : '';
  }
  function Zy(t, e) {
    switch (t.tag) {
      case 26:
      case 27:
      case 5:
        return Wl(t.type);
      case 16:
        return Wl('Lazy');
      case 13:
        return t.child !== e && e !== null ? Wl('Suspense Fallback') : Wl('Suspense');
      case 19:
        return Wl('SuspenseList');
      case 0:
      case 15:
        return ic(t.type, !1);
      case 11:
        return ic(t.type.render, !1);
      case 1:
        return ic(t.type, !0);
      case 31:
        return Wl('Activity');
      default:
        return '';
    }
  }
  function gr(t) {
    try {
      var e = '',
        l = null;
      do ((e += Zy(t, l)), (l = t), (t = t.return));
      while (t);
      return e;
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
  var cc = Object.prototype.hasOwnProperty,
    sc = n.unstable_scheduleCallback,
    oc = n.unstable_cancelCallback,
    Ky = n.unstable_shouldYield,
    $y = n.unstable_requestPaint,
    ye = n.unstable_now,
    Jy = n.unstable_getCurrentPriorityLevel,
    _r = n.unstable_ImmediatePriority,
    br = n.unstable_UserBlockingPriority,
    Eu = n.unstable_NormalPriority,
    Wy = n.unstable_LowPriority,
    Sr = n.unstable_IdlePriority,
    Fy = n.log,
    Iy = n.unstable_setDisableYieldValue,
    yn = null,
    pe = null;
  function Sl(t) {
    if ((typeof Fy == 'function' && Iy(t), pe && typeof pe.setStrictMode == 'function'))
      try {
        pe.setStrictMode(yn, t);
      } catch {}
  }
  var ve = Math.clz32 ? Math.clz32 : ep,
    Py = Math.log,
    tp = Math.LN2;
  function ep(t) {
    return ((t >>>= 0), t === 0 ? 32 : (31 - ((Py(t) / tp) | 0)) | 0);
  }
  var Tu = 256,
    Nu = 262144,
    Au = 4194304;
  function Fl(t) {
    var e = t & 42;
    if (e !== 0) return e;
    switch (t & -t) {
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
        return t & 261888;
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return t & 3932160;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return t & 62914560;
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
        return t;
    }
  }
  function Mu(t, e, l) {
    var a = t.pendingLanes;
    if (a === 0) return 0;
    var u = 0,
      i = t.suspendedLanes,
      f = t.pingedLanes;
    t = t.warmLanes;
    var h = a & 134217727;
    return (
      h !== 0
        ? ((a = h & ~i),
          a !== 0
            ? (u = Fl(a))
            : ((f &= h), f !== 0 ? (u = Fl(f)) : l || ((l = h & ~t), l !== 0 && (u = Fl(l)))))
        : ((h = a & ~i),
          h !== 0
            ? (u = Fl(h))
            : f !== 0
              ? (u = Fl(f))
              : l || ((l = a & ~t), l !== 0 && (u = Fl(l)))),
      u === 0
        ? 0
        : e !== 0 &&
            e !== u &&
            (e & i) === 0 &&
            ((i = u & -u), (l = e & -e), i >= l || (i === 32 && (l & 4194048) !== 0))
          ? e
          : u
    );
  }
  function pn(t, e) {
    return (t.pendingLanes & ~(t.suspendedLanes & ~t.pingedLanes) & e) === 0;
  }
  function lp(t, e) {
    switch (t) {
      case 1:
      case 2:
      case 4:
      case 8:
      case 64:
        return e + 250;
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
        return e + 5e3;
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
  function xr() {
    var t = Au;
    return ((Au <<= 1), (Au & 62914560) === 0 && (Au = 4194304), t);
  }
  function rc(t) {
    for (var e = [], l = 0; 31 > l; l++) e.push(t);
    return e;
  }
  function vn(t, e) {
    ((t.pendingLanes |= e),
      e !== 268435456 && ((t.suspendedLanes = 0), (t.pingedLanes = 0), (t.warmLanes = 0)));
  }
  function ap(t, e, l, a, u, i) {
    var f = t.pendingLanes;
    ((t.pendingLanes = l),
      (t.suspendedLanes = 0),
      (t.pingedLanes = 0),
      (t.warmLanes = 0),
      (t.expiredLanes &= l),
      (t.entangledLanes &= l),
      (t.errorRecoveryDisabledLanes &= l),
      (t.shellSuspendCounter = 0));
    var h = t.entanglements,
      b = t.expirationTimes,
      C = t.hiddenUpdates;
    for (l = f & ~l; 0 < l; ) {
      var k = 31 - ve(l),
        G = 1 << k;
      ((h[k] = 0), (b[k] = -1));
      var D = C[k];
      if (D !== null)
        for (C[k] = null, k = 0; k < D.length; k++) {
          var O = D[k];
          O !== null && (O.lane &= -536870913);
        }
      l &= ~G;
    }
    (a !== 0 && Er(t, a, 0),
      i !== 0 && u === 0 && t.tag !== 0 && (t.suspendedLanes |= i & ~(f & ~e)));
  }
  function Er(t, e, l) {
    ((t.pendingLanes |= e), (t.suspendedLanes &= ~e));
    var a = 31 - ve(e);
    ((t.entangledLanes |= e),
      (t.entanglements[a] = t.entanglements[a] | 1073741824 | (l & 261930)));
  }
  function Tr(t, e) {
    var l = (t.entangledLanes |= e);
    for (t = t.entanglements; l; ) {
      var a = 31 - ve(l),
        u = 1 << a;
      ((u & e) | (t[a] & e) && (t[a] |= e), (l &= ~u));
    }
  }
  function Nr(t, e) {
    var l = e & -e;
    return ((l = (l & 42) !== 0 ? 1 : fc(l)), (l & (t.suspendedLanes | e)) !== 0 ? 0 : l);
  }
  function fc(t) {
    switch (t) {
      case 2:
        t = 1;
        break;
      case 8:
        t = 4;
        break;
      case 32:
        t = 16;
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
        t = 128;
        break;
      case 268435456:
        t = 134217728;
        break;
      default:
        t = 0;
    }
    return t;
  }
  function dc(t) {
    return ((t &= -t), 2 < t ? (8 < t ? ((t & 134217727) !== 0 ? 32 : 268435456) : 8) : 2);
  }
  function Ar() {
    var t = R.p;
    return t !== 0 ? t : ((t = window.event), t === void 0 ? 32 : dh(t.type));
  }
  function Mr(t, e) {
    var l = R.p;
    try {
      return ((R.p = t), e());
    } finally {
      R.p = l;
    }
  }
  var xl = Math.random().toString(36).slice(2),
    It = '__reactFiber$' + xl,
    ce = '__reactProps$' + xl,
    _a = '__reactContainer$' + xl,
    mc = '__reactEvents$' + xl,
    np = '__reactListeners$' + xl,
    up = '__reactHandles$' + xl,
    Cr = '__reactResources$' + xl,
    gn = '__reactMarker$' + xl;
  function hc(t) {
    (delete t[It], delete t[ce], delete t[mc], delete t[np], delete t[up]);
  }
  function ba(t) {
    var e = t[It];
    if (e) return e;
    for (var l = t.parentNode; l; ) {
      if ((e = l[_a] || l[It])) {
        if (((l = e.alternate), e.child !== null || (l !== null && l.child !== null)))
          for (t = Wm(t); t !== null; ) {
            if ((l = t[It])) return l;
            t = Wm(t);
          }
        return e;
      }
      ((t = l), (l = t.parentNode));
    }
    return null;
  }
  function Sa(t) {
    if ((t = t[It] || t[_a])) {
      var e = t.tag;
      if (e === 5 || e === 6 || e === 13 || e === 31 || e === 26 || e === 27 || e === 3) return t;
    }
    return null;
  }
  function _n(t) {
    var e = t.tag;
    if (e === 5 || e === 26 || e === 27 || e === 6) return t.stateNode;
    throw Error(s(33));
  }
  function xa(t) {
    var e = t[Cr];
    return (e || (e = t[Cr] = { hoistableStyles: new Map(), hoistableScripts: new Map() }), e);
  }
  function Wt(t) {
    t[gn] = !0;
  }
  var Rr = new Set(),
    Dr = {};
  function Il(t, e) {
    (Ea(t, e), Ea(t + 'Capture', e));
  }
  function Ea(t, e) {
    for (Dr[t] = e, t = 0; t < e.length; t++) Rr.add(e[t]);
  }
  var ip = RegExp(
      '^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$'
    ),
    Or = {},
    zr = {};
  function cp(t) {
    return cc.call(zr, t)
      ? !0
      : cc.call(Or, t)
        ? !1
        : ip.test(t)
          ? (zr[t] = !0)
          : ((Or[t] = !0), !1);
  }
  function Cu(t, e, l) {
    if (cp(e))
      if (l === null) t.removeAttribute(e);
      else {
        switch (typeof l) {
          case 'undefined':
          case 'function':
          case 'symbol':
            t.removeAttribute(e);
            return;
          case 'boolean':
            var a = e.toLowerCase().slice(0, 5);
            if (a !== 'data-' && a !== 'aria-') {
              t.removeAttribute(e);
              return;
            }
        }
        t.setAttribute(e, '' + l);
      }
  }
  function Ru(t, e, l) {
    if (l === null) t.removeAttribute(e);
    else {
      switch (typeof l) {
        case 'undefined':
        case 'function':
        case 'symbol':
        case 'boolean':
          t.removeAttribute(e);
          return;
      }
      t.setAttribute(e, '' + l);
    }
  }
  function We(t, e, l, a) {
    if (a === null) t.removeAttribute(l);
    else {
      switch (typeof a) {
        case 'undefined':
        case 'function':
        case 'symbol':
        case 'boolean':
          t.removeAttribute(l);
          return;
      }
      t.setAttributeNS(e, l, '' + a);
    }
  }
  function Me(t) {
    switch (typeof t) {
      case 'bigint':
      case 'boolean':
      case 'number':
      case 'string':
      case 'undefined':
        return t;
      case 'object':
        return t;
      default:
        return '';
    }
  }
  function jr(t) {
    var e = t.type;
    return (t = t.nodeName) && t.toLowerCase() === 'input' && (e === 'checkbox' || e === 'radio');
  }
  function sp(t, e, l) {
    var a = Object.getOwnPropertyDescriptor(t.constructor.prototype, e);
    if (
      !t.hasOwnProperty(e) &&
      typeof a < 'u' &&
      typeof a.get == 'function' &&
      typeof a.set == 'function'
    ) {
      var u = a.get,
        i = a.set;
      return (
        Object.defineProperty(t, e, {
          configurable: !0,
          get: function () {
            return u.call(this);
          },
          set: function (f) {
            ((l = '' + f), i.call(this, f));
          },
        }),
        Object.defineProperty(t, e, { enumerable: a.enumerable }),
        {
          getValue: function () {
            return l;
          },
          setValue: function (f) {
            l = '' + f;
          },
          stopTracking: function () {
            ((t._valueTracker = null), delete t[e]);
          },
        }
      );
    }
  }
  function yc(t) {
    if (!t._valueTracker) {
      var e = jr(t) ? 'checked' : 'value';
      t._valueTracker = sp(t, e, '' + t[e]);
    }
  }
  function kr(t) {
    if (!t) return !1;
    var e = t._valueTracker;
    if (!e) return !0;
    var l = e.getValue(),
      a = '';
    return (
      t && (a = jr(t) ? (t.checked ? 'true' : 'false') : t.value),
      (t = a),
      t !== l ? (e.setValue(t), !0) : !1
    );
  }
  function Du(t) {
    if (((t = t || (typeof document < 'u' ? document : void 0)), typeof t > 'u')) return null;
    try {
      return t.activeElement || t.body;
    } catch {
      return t.body;
    }
  }
  var op = /[\n"\\]/g;
  function Ce(t) {
    return t.replace(op, function (e) {
      return '\\' + e.charCodeAt(0).toString(16) + ' ';
    });
  }
  function pc(t, e, l, a, u, i, f, h) {
    ((t.name = ''),
      f != null && typeof f != 'function' && typeof f != 'symbol' && typeof f != 'boolean'
        ? (t.type = f)
        : t.removeAttribute('type'),
      e != null
        ? f === 'number'
          ? ((e === 0 && t.value === '') || t.value != e) && (t.value = '' + Me(e))
          : t.value !== '' + Me(e) && (t.value = '' + Me(e))
        : (f !== 'submit' && f !== 'reset') || t.removeAttribute('value'),
      e != null
        ? vc(t, f, Me(e))
        : l != null
          ? vc(t, f, Me(l))
          : a != null && t.removeAttribute('value'),
      u == null && i != null && (t.defaultChecked = !!i),
      u != null && (t.checked = u && typeof u != 'function' && typeof u != 'symbol'),
      h != null && typeof h != 'function' && typeof h != 'symbol' && typeof h != 'boolean'
        ? (t.name = '' + Me(h))
        : t.removeAttribute('name'));
  }
  function wr(t, e, l, a, u, i, f, h) {
    if (
      (i != null &&
        typeof i != 'function' &&
        typeof i != 'symbol' &&
        typeof i != 'boolean' &&
        (t.type = i),
      e != null || l != null)
    ) {
      if (!((i !== 'submit' && i !== 'reset') || e != null)) {
        yc(t);
        return;
      }
      ((l = l != null ? '' + Me(l) : ''),
        (e = e != null ? '' + Me(e) : l),
        h || e === t.value || (t.value = e),
        (t.defaultValue = e));
    }
    ((a = a ?? u),
      (a = typeof a != 'function' && typeof a != 'symbol' && !!a),
      (t.checked = h ? t.checked : !!a),
      (t.defaultChecked = !!a),
      f != null &&
        typeof f != 'function' &&
        typeof f != 'symbol' &&
        typeof f != 'boolean' &&
        (t.name = f),
      yc(t));
  }
  function vc(t, e, l) {
    (e === 'number' && Du(t.ownerDocument) === t) ||
      t.defaultValue === '' + l ||
      (t.defaultValue = '' + l);
  }
  function Ta(t, e, l, a) {
    if (((t = t.options), e)) {
      e = {};
      for (var u = 0; u < l.length; u++) e['$' + l[u]] = !0;
      for (l = 0; l < t.length; l++)
        ((u = e.hasOwnProperty('$' + t[l].value)),
          t[l].selected !== u && (t[l].selected = u),
          u && a && (t[l].defaultSelected = !0));
    } else {
      for (l = '' + Me(l), e = null, u = 0; u < t.length; u++) {
        if (t[u].value === l) {
          ((t[u].selected = !0), a && (t[u].defaultSelected = !0));
          return;
        }
        e !== null || t[u].disabled || (e = t[u]);
      }
      e !== null && (e.selected = !0);
    }
  }
  function Ur(t, e, l) {
    if (e != null && ((e = '' + Me(e)), e !== t.value && (t.value = e), l == null)) {
      t.defaultValue !== e && (t.defaultValue = e);
      return;
    }
    t.defaultValue = l != null ? '' + Me(l) : '';
  }
  function Br(t, e, l, a) {
    if (e == null) {
      if (a != null) {
        if (l != null) throw Error(s(92));
        if (Ut(a)) {
          if (1 < a.length) throw Error(s(93));
          a = a[0];
        }
        l = a;
      }
      (l == null && (l = ''), (e = l));
    }
    ((l = Me(e)),
      (t.defaultValue = l),
      (a = t.textContent),
      a === l && a !== '' && a !== null && (t.value = a),
      yc(t));
  }
  function Na(t, e) {
    if (e) {
      var l = t.firstChild;
      if (l && l === t.lastChild && l.nodeType === 3) {
        l.nodeValue = e;
        return;
      }
    }
    t.textContent = e;
  }
  var rp = new Set(
    'animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp'.split(
      ' '
    )
  );
  function Hr(t, e, l) {
    var a = e.indexOf('--') === 0;
    l == null || typeof l == 'boolean' || l === ''
      ? a
        ? t.setProperty(e, '')
        : e === 'float'
          ? (t.cssFloat = '')
          : (t[e] = '')
      : a
        ? t.setProperty(e, l)
        : typeof l != 'number' || l === 0 || rp.has(e)
          ? e === 'float'
            ? (t.cssFloat = l)
            : (t[e] = ('' + l).trim())
          : (t[e] = l + 'px');
  }
  function Lr(t, e, l) {
    if (e != null && typeof e != 'object') throw Error(s(62));
    if (((t = t.style), l != null)) {
      for (var a in l)
        !l.hasOwnProperty(a) ||
          (e != null && e.hasOwnProperty(a)) ||
          (a.indexOf('--') === 0
            ? t.setProperty(a, '')
            : a === 'float'
              ? (t.cssFloat = '')
              : (t[a] = ''));
      for (var u in e) ((a = e[u]), e.hasOwnProperty(u) && l[u] !== a && Hr(t, u, a));
    } else for (var i in e) e.hasOwnProperty(i) && Hr(t, i, e[i]);
  }
  function gc(t) {
    if (t.indexOf('-') === -1) return !1;
    switch (t) {
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
  var fp = new Map([
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
    dp =
      /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function Ou(t) {
    return dp.test('' + t)
      ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')"
      : t;
  }
  function Fe() {}
  var _c = null;
  function bc(t) {
    return (
      (t = t.target || t.srcElement || window),
      t.correspondingUseElement && (t = t.correspondingUseElement),
      t.nodeType === 3 ? t.parentNode : t
    );
  }
  var Aa = null,
    Ma = null;
  function qr(t) {
    var e = Sa(t);
    if (e && (t = e.stateNode)) {
      var l = t[ce] || null;
      t: switch (((t = e.stateNode), e.type)) {
        case 'input':
          if (
            (pc(
              t,
              l.value,
              l.defaultValue,
              l.defaultValue,
              l.checked,
              l.defaultChecked,
              l.type,
              l.name
            ),
            (e = l.name),
            l.type === 'radio' && e != null)
          ) {
            for (l = t; l.parentNode; ) l = l.parentNode;
            for (
              l = l.querySelectorAll('input[name="' + Ce('' + e) + '"][type="radio"]'), e = 0;
              e < l.length;
              e++
            ) {
              var a = l[e];
              if (a !== t && a.form === t.form) {
                var u = a[ce] || null;
                if (!u) throw Error(s(90));
                pc(
                  a,
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
            for (e = 0; e < l.length; e++) ((a = l[e]), a.form === t.form && kr(a));
          }
          break t;
        case 'textarea':
          Ur(t, l.value, l.defaultValue);
          break t;
        case 'select':
          ((e = l.value), e != null && Ta(t, !!l.multiple, e, !1));
      }
    }
  }
  var Sc = !1;
  function Gr(t, e, l) {
    if (Sc) return t(e, l);
    Sc = !0;
    try {
      var a = t(e);
      return a;
    } finally {
      if (
        ((Sc = !1),
        (Aa !== null || Ma !== null) &&
          (gi(), Aa && ((e = Aa), (t = Ma), (Ma = Aa = null), qr(e), t)))
      )
        for (e = 0; e < t.length; e++) qr(t[e]);
    }
  }
  function bn(t, e) {
    var l = t.stateNode;
    if (l === null) return null;
    var a = l[ce] || null;
    if (a === null) return null;
    l = a[e];
    t: switch (e) {
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
          ((t = t.type),
          (a = !(t === 'button' || t === 'input' || t === 'select' || t === 'textarea'))),
          (t = !a));
        break t;
      default:
        t = !1;
    }
    if (t) return null;
    if (l && typeof l != 'function') throw Error(s(231, e, typeof l));
    return l;
  }
  var Ie = !(
      typeof window > 'u' ||
      typeof window.document > 'u' ||
      typeof window.document.createElement > 'u'
    ),
    xc = !1;
  if (Ie)
    try {
      var Sn = {};
      (Object.defineProperty(Sn, 'passive', {
        get: function () {
          xc = !0;
        },
      }),
        window.addEventListener('test', Sn, Sn),
        window.removeEventListener('test', Sn, Sn));
    } catch {
      xc = !1;
    }
  var El = null,
    Ec = null,
    zu = null;
  function Yr() {
    if (zu) return zu;
    var t,
      e = Ec,
      l = e.length,
      a,
      u = 'value' in El ? El.value : El.textContent,
      i = u.length;
    for (t = 0; t < l && e[t] === u[t]; t++);
    var f = l - t;
    for (a = 1; a <= f && e[l - a] === u[i - a]; a++);
    return (zu = u.slice(t, 1 < a ? 1 - a : void 0));
  }
  function ju(t) {
    var e = t.keyCode;
    return (
      'charCode' in t ? ((t = t.charCode), t === 0 && e === 13 && (t = 13)) : (t = e),
      t === 10 && (t = 13),
      32 <= t || t === 13 ? t : 0
    );
  }
  function ku() {
    return !0;
  }
  function Xr() {
    return !1;
  }
  function se(t) {
    function e(l, a, u, i, f) {
      ((this._reactName = l),
        (this._targetInst = u),
        (this.type = a),
        (this.nativeEvent = i),
        (this.target = f),
        (this.currentTarget = null));
      for (var h in t) t.hasOwnProperty(h) && ((l = t[h]), (this[h] = l ? l(i) : i[h]));
      return (
        (this.isDefaultPrevented = (
          i.defaultPrevented != null ? i.defaultPrevented : i.returnValue === !1
        )
          ? ku
          : Xr),
        (this.isPropagationStopped = Xr),
        this
      );
    }
    return (
      _(e.prototype, {
        preventDefault: function () {
          this.defaultPrevented = !0;
          var l = this.nativeEvent;
          l &&
            (l.preventDefault
              ? l.preventDefault()
              : typeof l.returnValue != 'unknown' && (l.returnValue = !1),
            (this.isDefaultPrevented = ku));
        },
        stopPropagation: function () {
          var l = this.nativeEvent;
          l &&
            (l.stopPropagation
              ? l.stopPropagation()
              : typeof l.cancelBubble != 'unknown' && (l.cancelBubble = !0),
            (this.isPropagationStopped = ku));
        },
        persist: function () {},
        isPersistent: ku,
      }),
      e
    );
  }
  var Pl = {
      eventPhase: 0,
      bubbles: 0,
      cancelable: 0,
      timeStamp: function (t) {
        return t.timeStamp || Date.now();
      },
      defaultPrevented: 0,
      isTrusted: 0,
    },
    wu = se(Pl),
    xn = _({}, Pl, { view: 0, detail: 0 }),
    mp = se(xn),
    Tc,
    Nc,
    En,
    Uu = _({}, xn, {
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
      getModifierState: Mc,
      button: 0,
      buttons: 0,
      relatedTarget: function (t) {
        return t.relatedTarget === void 0
          ? t.fromElement === t.srcElement
            ? t.toElement
            : t.fromElement
          : t.relatedTarget;
      },
      movementX: function (t) {
        return 'movementX' in t
          ? t.movementX
          : (t !== En &&
              (En && t.type === 'mousemove'
                ? ((Tc = t.screenX - En.screenX), (Nc = t.screenY - En.screenY))
                : (Nc = Tc = 0),
              (En = t)),
            Tc);
      },
      movementY: function (t) {
        return 'movementY' in t ? t.movementY : Nc;
      },
    }),
    Qr = se(Uu),
    hp = _({}, Uu, { dataTransfer: 0 }),
    yp = se(hp),
    pp = _({}, xn, { relatedTarget: 0 }),
    Ac = se(pp),
    vp = _({}, Pl, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
    gp = se(vp),
    _p = _({}, Pl, {
      clipboardData: function (t) {
        return 'clipboardData' in t ? t.clipboardData : window.clipboardData;
      },
    }),
    bp = se(_p),
    Sp = _({}, Pl, { data: 0 }),
    Vr = se(Sp),
    xp = {
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
    Ep = {
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
    Tp = { Alt: 'altKey', Control: 'ctrlKey', Meta: 'metaKey', Shift: 'shiftKey' };
  function Np(t) {
    var e = this.nativeEvent;
    return e.getModifierState ? e.getModifierState(t) : (t = Tp[t]) ? !!e[t] : !1;
  }
  function Mc() {
    return Np;
  }
  var Ap = _({}, xn, {
      key: function (t) {
        if (t.key) {
          var e = xp[t.key] || t.key;
          if (e !== 'Unidentified') return e;
        }
        return t.type === 'keypress'
          ? ((t = ju(t)), t === 13 ? 'Enter' : String.fromCharCode(t))
          : t.type === 'keydown' || t.type === 'keyup'
            ? Ep[t.keyCode] || 'Unidentified'
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
      getModifierState: Mc,
      charCode: function (t) {
        return t.type === 'keypress' ? ju(t) : 0;
      },
      keyCode: function (t) {
        return t.type === 'keydown' || t.type === 'keyup' ? t.keyCode : 0;
      },
      which: function (t) {
        return t.type === 'keypress'
          ? ju(t)
          : t.type === 'keydown' || t.type === 'keyup'
            ? t.keyCode
            : 0;
      },
    }),
    Mp = se(Ap),
    Cp = _({}, Uu, {
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
    Zr = se(Cp),
    Rp = _({}, xn, {
      touches: 0,
      targetTouches: 0,
      changedTouches: 0,
      altKey: 0,
      metaKey: 0,
      ctrlKey: 0,
      shiftKey: 0,
      getModifierState: Mc,
    }),
    Dp = se(Rp),
    Op = _({}, Pl, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
    zp = se(Op),
    jp = _({}, Uu, {
      deltaX: function (t) {
        return 'deltaX' in t ? t.deltaX : 'wheelDeltaX' in t ? -t.wheelDeltaX : 0;
      },
      deltaY: function (t) {
        return 'deltaY' in t
          ? t.deltaY
          : 'wheelDeltaY' in t
            ? -t.wheelDeltaY
            : 'wheelDelta' in t
              ? -t.wheelDelta
              : 0;
      },
      deltaZ: 0,
      deltaMode: 0,
    }),
    kp = se(jp),
    wp = _({}, Pl, { newState: 0, oldState: 0 }),
    Up = se(wp),
    Bp = [9, 13, 27, 32],
    Cc = Ie && 'CompositionEvent' in window,
    Tn = null;
  Ie && 'documentMode' in document && (Tn = document.documentMode);
  var Hp = Ie && 'TextEvent' in window && !Tn,
    Kr = Ie && (!Cc || (Tn && 8 < Tn && 11 >= Tn)),
    $r = ' ',
    Jr = !1;
  function Wr(t, e) {
    switch (t) {
      case 'keyup':
        return Bp.indexOf(e.keyCode) !== -1;
      case 'keydown':
        return e.keyCode !== 229;
      case 'keypress':
      case 'mousedown':
      case 'focusout':
        return !0;
      default:
        return !1;
    }
  }
  function Fr(t) {
    return ((t = t.detail), typeof t == 'object' && 'data' in t ? t.data : null);
  }
  var Ca = !1;
  function Lp(t, e) {
    switch (t) {
      case 'compositionend':
        return Fr(e);
      case 'keypress':
        return e.which !== 32 ? null : ((Jr = !0), $r);
      case 'textInput':
        return ((t = e.data), t === $r && Jr ? null : t);
      default:
        return null;
    }
  }
  function qp(t, e) {
    if (Ca)
      return t === 'compositionend' || (!Cc && Wr(t, e))
        ? ((t = Yr()), (zu = Ec = El = null), (Ca = !1), t)
        : null;
    switch (t) {
      case 'paste':
        return null;
      case 'keypress':
        if (!(e.ctrlKey || e.altKey || e.metaKey) || (e.ctrlKey && e.altKey)) {
          if (e.char && 1 < e.char.length) return e.char;
          if (e.which) return String.fromCharCode(e.which);
        }
        return null;
      case 'compositionend':
        return Kr && e.locale !== 'ko' ? null : e.data;
      default:
        return null;
    }
  }
  var Gp = {
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
  function Ir(t) {
    var e = t && t.nodeName && t.nodeName.toLowerCase();
    return e === 'input' ? !!Gp[t.type] : e === 'textarea';
  }
  function Pr(t, e, l, a) {
    (Aa ? (Ma ? Ma.push(a) : (Ma = [a])) : (Aa = a),
      (e = Ni(e, 'onChange')),
      0 < e.length &&
        ((l = new wu('onChange', 'change', null, l, a)), t.push({ event: l, listeners: e })));
  }
  var Nn = null,
    An = null;
  function Yp(t) {
    Um(t, 0);
  }
  function Bu(t) {
    var e = _n(t);
    if (kr(e)) return t;
  }
  function tf(t, e) {
    if (t === 'change') return e;
  }
  var ef = !1;
  if (Ie) {
    var Rc;
    if (Ie) {
      var Dc = 'oninput' in document;
      if (!Dc) {
        var lf = document.createElement('div');
        (lf.setAttribute('oninput', 'return;'), (Dc = typeof lf.oninput == 'function'));
      }
      Rc = Dc;
    } else Rc = !1;
    ef = Rc && (!document.documentMode || 9 < document.documentMode);
  }
  function af() {
    Nn && (Nn.detachEvent('onpropertychange', nf), (An = Nn = null));
  }
  function nf(t) {
    if (t.propertyName === 'value' && Bu(An)) {
      var e = [];
      (Pr(e, An, t, bc(t)), Gr(Yp, e));
    }
  }
  function Xp(t, e, l) {
    t === 'focusin'
      ? (af(), (Nn = e), (An = l), Nn.attachEvent('onpropertychange', nf))
      : t === 'focusout' && af();
  }
  function Qp(t) {
    if (t === 'selectionchange' || t === 'keyup' || t === 'keydown') return Bu(An);
  }
  function Vp(t, e) {
    if (t === 'click') return Bu(e);
  }
  function Zp(t, e) {
    if (t === 'input' || t === 'change') return Bu(e);
  }
  function Kp(t, e) {
    return (t === e && (t !== 0 || 1 / t === 1 / e)) || (t !== t && e !== e);
  }
  var ge = typeof Object.is == 'function' ? Object.is : Kp;
  function Mn(t, e) {
    if (ge(t, e)) return !0;
    if (typeof t != 'object' || t === null || typeof e != 'object' || e === null) return !1;
    var l = Object.keys(t),
      a = Object.keys(e);
    if (l.length !== a.length) return !1;
    for (a = 0; a < l.length; a++) {
      var u = l[a];
      if (!cc.call(e, u) || !ge(t[u], e[u])) return !1;
    }
    return !0;
  }
  function uf(t) {
    for (; t && t.firstChild; ) t = t.firstChild;
    return t;
  }
  function cf(t, e) {
    var l = uf(t);
    t = 0;
    for (var a; l; ) {
      if (l.nodeType === 3) {
        if (((a = t + l.textContent.length), t <= e && a >= e)) return { node: l, offset: e - t };
        t = a;
      }
      t: {
        for (; l; ) {
          if (l.nextSibling) {
            l = l.nextSibling;
            break t;
          }
          l = l.parentNode;
        }
        l = void 0;
      }
      l = uf(l);
    }
  }
  function sf(t, e) {
    return t && e
      ? t === e
        ? !0
        : t && t.nodeType === 3
          ? !1
          : e && e.nodeType === 3
            ? sf(t, e.parentNode)
            : 'contains' in t
              ? t.contains(e)
              : t.compareDocumentPosition
                ? !!(t.compareDocumentPosition(e) & 16)
                : !1
      : !1;
  }
  function of(t) {
    t =
      t != null && t.ownerDocument != null && t.ownerDocument.defaultView != null
        ? t.ownerDocument.defaultView
        : window;
    for (var e = Du(t.document); e instanceof t.HTMLIFrameElement; ) {
      try {
        var l = typeof e.contentWindow.location.href == 'string';
      } catch {
        l = !1;
      }
      if (l) t = e.contentWindow;
      else break;
      e = Du(t.document);
    }
    return e;
  }
  function Oc(t) {
    var e = t && t.nodeName && t.nodeName.toLowerCase();
    return (
      e &&
      ((e === 'input' &&
        (t.type === 'text' ||
          t.type === 'search' ||
          t.type === 'tel' ||
          t.type === 'url' ||
          t.type === 'password')) ||
        e === 'textarea' ||
        t.contentEditable === 'true')
    );
  }
  var $p = Ie && 'documentMode' in document && 11 >= document.documentMode,
    Ra = null,
    zc = null,
    Cn = null,
    jc = !1;
  function rf(t, e, l) {
    var a = l.window === l ? l.document : l.nodeType === 9 ? l : l.ownerDocument;
    jc ||
      Ra == null ||
      Ra !== Du(a) ||
      ((a = Ra),
      'selectionStart' in a && Oc(a)
        ? (a = { start: a.selectionStart, end: a.selectionEnd })
        : ((a = ((a.ownerDocument && a.ownerDocument.defaultView) || window).getSelection()),
          (a = {
            anchorNode: a.anchorNode,
            anchorOffset: a.anchorOffset,
            focusNode: a.focusNode,
            focusOffset: a.focusOffset,
          })),
      (Cn && Mn(Cn, a)) ||
        ((Cn = a),
        (a = Ni(zc, 'onSelect')),
        0 < a.length &&
          ((e = new wu('onSelect', 'select', null, e, l)),
          t.push({ event: e, listeners: a }),
          (e.target = Ra))));
  }
  function ta(t, e) {
    var l = {};
    return (
      (l[t.toLowerCase()] = e.toLowerCase()),
      (l['Webkit' + t] = 'webkit' + e),
      (l['Moz' + t] = 'moz' + e),
      l
    );
  }
  var Da = {
      animationend: ta('Animation', 'AnimationEnd'),
      animationiteration: ta('Animation', 'AnimationIteration'),
      animationstart: ta('Animation', 'AnimationStart'),
      transitionrun: ta('Transition', 'TransitionRun'),
      transitionstart: ta('Transition', 'TransitionStart'),
      transitioncancel: ta('Transition', 'TransitionCancel'),
      transitionend: ta('Transition', 'TransitionEnd'),
    },
    kc = {},
    ff = {};
  Ie &&
    ((ff = document.createElement('div').style),
    'AnimationEvent' in window ||
      (delete Da.animationend.animation,
      delete Da.animationiteration.animation,
      delete Da.animationstart.animation),
    'TransitionEvent' in window || delete Da.transitionend.transition);
  function ea(t) {
    if (kc[t]) return kc[t];
    if (!Da[t]) return t;
    var e = Da[t],
      l;
    for (l in e) if (e.hasOwnProperty(l) && l in ff) return (kc[t] = e[l]);
    return t;
  }
  var df = ea('animationend'),
    mf = ea('animationiteration'),
    hf = ea('animationstart'),
    Jp = ea('transitionrun'),
    Wp = ea('transitionstart'),
    Fp = ea('transitioncancel'),
    yf = ea('transitionend'),
    pf = new Map(),
    wc =
      'abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel'.split(
        ' '
      );
  wc.push('scrollEnd');
  function He(t, e) {
    (pf.set(t, e), Il(e, [t]));
  }
  var Hu =
      typeof reportError == 'function'
        ? reportError
        : function (t) {
            if (typeof window == 'object' && typeof window.ErrorEvent == 'function') {
              var e = new window.ErrorEvent('error', {
                bubbles: !0,
                cancelable: !0,
                message:
                  typeof t == 'object' && t !== null && typeof t.message == 'string'
                    ? String(t.message)
                    : String(t),
                error: t,
              });
              if (!window.dispatchEvent(e)) return;
            } else if (typeof process == 'object' && typeof process.emit == 'function') {
              process.emit('uncaughtException', t);
              return;
            }
            console.error(t);
          },
    Re = [],
    Oa = 0,
    Uc = 0;
  function Lu() {
    for (var t = Oa, e = (Uc = Oa = 0); e < t; ) {
      var l = Re[e];
      Re[e++] = null;
      var a = Re[e];
      Re[e++] = null;
      var u = Re[e];
      Re[e++] = null;
      var i = Re[e];
      if (((Re[e++] = null), a !== null && u !== null)) {
        var f = a.pending;
        (f === null ? (u.next = u) : ((u.next = f.next), (f.next = u)), (a.pending = u));
      }
      i !== 0 && vf(l, u, i);
    }
  }
  function qu(t, e, l, a) {
    ((Re[Oa++] = t),
      (Re[Oa++] = e),
      (Re[Oa++] = l),
      (Re[Oa++] = a),
      (Uc |= a),
      (t.lanes |= a),
      (t = t.alternate),
      t !== null && (t.lanes |= a));
  }
  function Bc(t, e, l, a) {
    return (qu(t, e, l, a), Gu(t));
  }
  function la(t, e) {
    return (qu(t, null, null, e), Gu(t));
  }
  function vf(t, e, l) {
    t.lanes |= l;
    var a = t.alternate;
    a !== null && (a.lanes |= l);
    for (var u = !1, i = t.return; i !== null; )
      ((i.childLanes |= l),
        (a = i.alternate),
        a !== null && (a.childLanes |= l),
        i.tag === 22 && ((t = i.stateNode), t === null || t._visibility & 1 || (u = !0)),
        (t = i),
        (i = i.return));
    return t.tag === 3
      ? ((i = t.stateNode),
        u &&
          e !== null &&
          ((u = 31 - ve(l)),
          (t = i.hiddenUpdates),
          (a = t[u]),
          a === null ? (t[u] = [e]) : a.push(e),
          (e.lane = l | 536870912)),
        i)
      : null;
  }
  function Gu(t) {
    if (50 < Wn) throw ((Wn = 0), (Zs = null), Error(s(185)));
    for (var e = t.return; e !== null; ) ((t = e), (e = t.return));
    return t.tag === 3 ? t.stateNode : null;
  }
  var za = {};
  function Ip(t, e, l, a) {
    ((this.tag = t),
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
      (this.pendingProps = e),
      (this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null),
      (this.mode = a),
      (this.subtreeFlags = this.flags = 0),
      (this.deletions = null),
      (this.childLanes = this.lanes = 0),
      (this.alternate = null));
  }
  function _e(t, e, l, a) {
    return new Ip(t, e, l, a);
  }
  function Hc(t) {
    return ((t = t.prototype), !(!t || !t.isReactComponent));
  }
  function Pe(t, e) {
    var l = t.alternate;
    return (
      l === null
        ? ((l = _e(t.tag, e, t.key, t.mode)),
          (l.elementType = t.elementType),
          (l.type = t.type),
          (l.stateNode = t.stateNode),
          (l.alternate = t),
          (t.alternate = l))
        : ((l.pendingProps = e),
          (l.type = t.type),
          (l.flags = 0),
          (l.subtreeFlags = 0),
          (l.deletions = null)),
      (l.flags = t.flags & 65011712),
      (l.childLanes = t.childLanes),
      (l.lanes = t.lanes),
      (l.child = t.child),
      (l.memoizedProps = t.memoizedProps),
      (l.memoizedState = t.memoizedState),
      (l.updateQueue = t.updateQueue),
      (e = t.dependencies),
      (l.dependencies = e === null ? null : { lanes: e.lanes, firstContext: e.firstContext }),
      (l.sibling = t.sibling),
      (l.index = t.index),
      (l.ref = t.ref),
      (l.refCleanup = t.refCleanup),
      l
    );
  }
  function gf(t, e) {
    t.flags &= 65011714;
    var l = t.alternate;
    return (
      l === null
        ? ((t.childLanes = 0),
          (t.lanes = e),
          (t.child = null),
          (t.subtreeFlags = 0),
          (t.memoizedProps = null),
          (t.memoizedState = null),
          (t.updateQueue = null),
          (t.dependencies = null),
          (t.stateNode = null))
        : ((t.childLanes = l.childLanes),
          (t.lanes = l.lanes),
          (t.child = l.child),
          (t.subtreeFlags = 0),
          (t.deletions = null),
          (t.memoizedProps = l.memoizedProps),
          (t.memoizedState = l.memoizedState),
          (t.updateQueue = l.updateQueue),
          (t.type = l.type),
          (e = l.dependencies),
          (t.dependencies = e === null ? null : { lanes: e.lanes, firstContext: e.firstContext })),
      t
    );
  }
  function Yu(t, e, l, a, u, i) {
    var f = 0;
    if (((a = t), typeof t == 'function')) Hc(t) && (f = 1);
    else if (typeof t == 'string')
      f = av(t, l, F.current) ? 26 : t === 'html' || t === 'head' || t === 'body' ? 27 : 5;
    else
      t: switch (t) {
        case it:
          return ((t = _e(31, l, e, u)), (t.elementType = it), (t.lanes = i), t);
        case z:
          return aa(l.children, u, i, e);
        case B:
          ((f = 8), (u |= 24));
          break;
        case w:
          return ((t = _e(12, l, e, u | 2)), (t.elementType = w), (t.lanes = i), t);
        case $:
          return ((t = _e(13, l, e, u)), (t.elementType = $), (t.lanes = i), t);
        case J:
          return ((t = _e(19, l, e, u)), (t.elementType = J), (t.lanes = i), t);
        default:
          if (typeof t == 'object' && t !== null)
            switch (t.$$typeof) {
              case j:
                f = 10;
                break t;
              case Q:
                f = 9;
                break t;
              case X:
                f = 11;
                break t;
              case V:
                f = 14;
                break t;
              case tt:
                ((f = 16), (a = null));
                break t;
            }
          ((f = 29), (l = Error(s(130, t === null ? 'null' : typeof t, ''))), (a = null));
      }
    return ((e = _e(f, l, e, u)), (e.elementType = t), (e.type = a), (e.lanes = i), e);
  }
  function aa(t, e, l, a) {
    return ((t = _e(7, t, a, e)), (t.lanes = l), t);
  }
  function Lc(t, e, l) {
    return ((t = _e(6, t, null, e)), (t.lanes = l), t);
  }
  function _f(t) {
    var e = _e(18, null, null, 0);
    return ((e.stateNode = t), e);
  }
  function qc(t, e, l) {
    return (
      (e = _e(4, t.children !== null ? t.children : [], t.key, e)),
      (e.lanes = l),
      (e.stateNode = {
        containerInfo: t.containerInfo,
        pendingChildren: null,
        implementation: t.implementation,
      }),
      e
    );
  }
  var bf = new WeakMap();
  function De(t, e) {
    if (typeof t == 'object' && t !== null) {
      var l = bf.get(t);
      return l !== void 0 ? l : ((e = { value: t, source: e, stack: gr(e) }), bf.set(t, e), e);
    }
    return { value: t, source: e, stack: gr(e) };
  }
  var ja = [],
    ka = 0,
    Xu = null,
    Rn = 0,
    Oe = [],
    ze = 0,
    Tl = null,
    Qe = 1,
    Ve = '';
  function tl(t, e) {
    ((ja[ka++] = Rn), (ja[ka++] = Xu), (Xu = t), (Rn = e));
  }
  function Sf(t, e, l) {
    ((Oe[ze++] = Qe), (Oe[ze++] = Ve), (Oe[ze++] = Tl), (Tl = t));
    var a = Qe;
    t = Ve;
    var u = 32 - ve(a) - 1;
    ((a &= ~(1 << u)), (l += 1));
    var i = 32 - ve(e) + u;
    if (30 < i) {
      var f = u - (u % 5);
      ((i = (a & ((1 << f) - 1)).toString(32)),
        (a >>= f),
        (u -= f),
        (Qe = (1 << (32 - ve(e) + u)) | (l << u) | a),
        (Ve = i + t));
    } else ((Qe = (1 << i) | (l << u) | a), (Ve = t));
  }
  function Gc(t) {
    t.return !== null && (tl(t, 1), Sf(t, 1, 0));
  }
  function Yc(t) {
    for (; t === Xu; ) ((Xu = ja[--ka]), (ja[ka] = null), (Rn = ja[--ka]), (ja[ka] = null));
    for (; t === Tl; )
      ((Tl = Oe[--ze]),
        (Oe[ze] = null),
        (Ve = Oe[--ze]),
        (Oe[ze] = null),
        (Qe = Oe[--ze]),
        (Oe[ze] = null));
  }
  function xf(t, e) {
    ((Oe[ze++] = Qe), (Oe[ze++] = Ve), (Oe[ze++] = Tl), (Qe = e.id), (Ve = e.overflow), (Tl = t));
  }
  var Pt = null,
    Ot = null,
    yt = !1,
    Nl = null,
    je = !1,
    Xc = Error(s(519));
  function Al(t) {
    var e = Error(
      s(418, 1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? 'text' : 'HTML', '')
    );
    throw (Dn(De(e, t)), Xc);
  }
  function Ef(t) {
    var e = t.stateNode,
      l = t.type,
      a = t.memoizedProps;
    switch (((e[It] = t), (e[ce] = a), l)) {
      case 'dialog':
        (ft('cancel', e), ft('close', e));
        break;
      case 'iframe':
      case 'object':
      case 'embed':
        ft('load', e);
        break;
      case 'video':
      case 'audio':
        for (l = 0; l < In.length; l++) ft(In[l], e);
        break;
      case 'source':
        ft('error', e);
        break;
      case 'img':
      case 'image':
      case 'link':
        (ft('error', e), ft('load', e));
        break;
      case 'details':
        ft('toggle', e);
        break;
      case 'input':
        (ft('invalid', e),
          wr(e, a.value, a.defaultValue, a.checked, a.defaultChecked, a.type, a.name, !0));
        break;
      case 'select':
        ft('invalid', e);
        break;
      case 'textarea':
        (ft('invalid', e), Br(e, a.value, a.defaultValue, a.children));
    }
    ((l = a.children),
      (typeof l != 'string' && typeof l != 'number' && typeof l != 'bigint') ||
      e.textContent === '' + l ||
      a.suppressHydrationWarning === !0 ||
      qm(e.textContent, l)
        ? (a.popover != null && (ft('beforetoggle', e), ft('toggle', e)),
          a.onScroll != null && ft('scroll', e),
          a.onScrollEnd != null && ft('scrollend', e),
          a.onClick != null && (e.onclick = Fe),
          (e = !0))
        : (e = !1),
      e || Al(t, !0));
  }
  function Tf(t) {
    for (Pt = t.return; Pt; )
      switch (Pt.tag) {
        case 5:
        case 31:
        case 13:
          je = !1;
          return;
        case 27:
        case 3:
          je = !0;
          return;
        default:
          Pt = Pt.return;
      }
  }
  function wa(t) {
    if (t !== Pt) return !1;
    if (!yt) return (Tf(t), (yt = !0), !1);
    var e = t.tag,
      l;
    if (
      ((l = e !== 3 && e !== 27) &&
        ((l = e === 5) &&
          ((l = t.type), (l = !(l !== 'form' && l !== 'button') || co(t.type, t.memoizedProps))),
        (l = !l)),
      l && Ot && Al(t),
      Tf(t),
      e === 13)
    ) {
      if (((t = t.memoizedState), (t = t !== null ? t.dehydrated : null), !t)) throw Error(s(317));
      Ot = Jm(t);
    } else if (e === 31) {
      if (((t = t.memoizedState), (t = t !== null ? t.dehydrated : null), !t)) throw Error(s(317));
      Ot = Jm(t);
    } else
      e === 27
        ? ((e = Ot), ql(t.type) ? ((t = mo), (mo = null), (Ot = t)) : (Ot = e))
        : (Ot = Pt ? we(t.stateNode.nextSibling) : null);
    return !0;
  }
  function na() {
    ((Ot = Pt = null), (yt = !1));
  }
  function Qc() {
    var t = Nl;
    return (t !== null && (de === null ? (de = t) : de.push.apply(de, t), (Nl = null)), t);
  }
  function Dn(t) {
    Nl === null ? (Nl = [t]) : Nl.push(t);
  }
  var Vc = S(null),
    ua = null,
    el = null;
  function Ml(t, e, l) {
    (K(Vc, e._currentValue), (e._currentValue = l));
  }
  function ll(t) {
    ((t._currentValue = Vc.current), q(Vc));
  }
  function Zc(t, e, l) {
    for (; t !== null; ) {
      var a = t.alternate;
      if (
        ((t.childLanes & e) !== e
          ? ((t.childLanes |= e), a !== null && (a.childLanes |= e))
          : a !== null && (a.childLanes & e) !== e && (a.childLanes |= e),
        t === l)
      )
        break;
      t = t.return;
    }
  }
  function Kc(t, e, l, a) {
    var u = t.child;
    for (u !== null && (u.return = t); u !== null; ) {
      var i = u.dependencies;
      if (i !== null) {
        var f = u.child;
        i = i.firstContext;
        t: for (; i !== null; ) {
          var h = i;
          i = u;
          for (var b = 0; b < e.length; b++)
            if (h.context === e[b]) {
              ((i.lanes |= l),
                (h = i.alternate),
                h !== null && (h.lanes |= l),
                Zc(i.return, l, t),
                a || (f = null));
              break t;
            }
          i = h.next;
        }
      } else if (u.tag === 18) {
        if (((f = u.return), f === null)) throw Error(s(341));
        ((f.lanes |= l), (i = f.alternate), i !== null && (i.lanes |= l), Zc(f, l, t), (f = null));
      } else f = u.child;
      if (f !== null) f.return = u;
      else
        for (f = u; f !== null; ) {
          if (f === t) {
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
  function Ua(t, e, l, a) {
    t = null;
    for (var u = e, i = !1; u !== null; ) {
      if (!i) {
        if ((u.flags & 524288) !== 0) i = !0;
        else if ((u.flags & 262144) !== 0) break;
      }
      if (u.tag === 10) {
        var f = u.alternate;
        if (f === null) throw Error(s(387));
        if (((f = f.memoizedProps), f !== null)) {
          var h = u.type;
          ge(u.pendingProps.value, f.value) || (t !== null ? t.push(h) : (t = [h]));
        }
      } else if (u === St.current) {
        if (((f = u.alternate), f === null)) throw Error(s(387));
        f.memoizedState.memoizedState !== u.memoizedState.memoizedState &&
          (t !== null ? t.push(au) : (t = [au]));
      }
      u = u.return;
    }
    (t !== null && Kc(e, t, l, a), (e.flags |= 262144));
  }
  function Qu(t) {
    for (t = t.firstContext; t !== null; ) {
      if (!ge(t.context._currentValue, t.memoizedValue)) return !0;
      t = t.next;
    }
    return !1;
  }
  function ia(t) {
    ((ua = t), (el = null), (t = t.dependencies), t !== null && (t.firstContext = null));
  }
  function te(t) {
    return Nf(ua, t);
  }
  function Vu(t, e) {
    return (ua === null && ia(t), Nf(t, e));
  }
  function Nf(t, e) {
    var l = e._currentValue;
    if (((e = { context: e, memoizedValue: l, next: null }), el === null)) {
      if (t === null) throw Error(s(308));
      ((el = e), (t.dependencies = { lanes: 0, firstContext: e }), (t.flags |= 524288));
    } else el = el.next = e;
    return l;
  }
  var Pp =
      typeof AbortController < 'u'
        ? AbortController
        : function () {
            var t = [],
              e = (this.signal = {
                aborted: !1,
                addEventListener: function (l, a) {
                  t.push(a);
                },
              });
            this.abort = function () {
              ((e.aborted = !0),
                t.forEach(function (l) {
                  return l();
                }));
            };
          },
    t0 = n.unstable_scheduleCallback,
    e0 = n.unstable_NormalPriority,
    Qt = {
      $$typeof: j,
      Consumer: null,
      Provider: null,
      _currentValue: null,
      _currentValue2: null,
      _threadCount: 0,
    };
  function $c() {
    return { controller: new Pp(), data: new Map(), refCount: 0 };
  }
  function On(t) {
    (t.refCount--,
      t.refCount === 0 &&
        t0(e0, function () {
          t.controller.abort();
        }));
  }
  var zn = null,
    Jc = 0,
    Ba = 0,
    Ha = null;
  function l0(t, e) {
    if (zn === null) {
      var l = (zn = []);
      ((Jc = 0),
        (Ba = Is()),
        (Ha = {
          status: 'pending',
          value: void 0,
          then: function (a) {
            l.push(a);
          },
        }));
    }
    return (Jc++, e.then(Af, Af), e);
  }
  function Af() {
    if (--Jc === 0 && zn !== null) {
      Ha !== null && (Ha.status = 'fulfilled');
      var t = zn;
      ((zn = null), (Ba = 0), (Ha = null));
      for (var e = 0; e < t.length; e++) (0, t[e])();
    }
  }
  function a0(t, e) {
    var l = [],
      a = {
        status: 'pending',
        value: null,
        reason: null,
        then: function (u) {
          l.push(u);
        },
      };
    return (
      t.then(
        function () {
          ((a.status = 'fulfilled'), (a.value = e));
          for (var u = 0; u < l.length; u++) (0, l[u])(e);
        },
        function (u) {
          for (a.status = 'rejected', a.reason = u, u = 0; u < l.length; u++) (0, l[u])(void 0);
        }
      ),
      a
    );
  }
  var Mf = U.S;
  U.S = function (t, e) {
    ((rm = ye()),
      typeof e == 'object' && e !== null && typeof e.then == 'function' && l0(t, e),
      Mf !== null && Mf(t, e));
  };
  var ca = S(null);
  function Wc() {
    var t = ca.current;
    return t !== null ? t : Rt.pooledCache;
  }
  function Zu(t, e) {
    e === null ? K(ca, ca.current) : K(ca, e.pool);
  }
  function Cf() {
    var t = Wc();
    return t === null ? null : { parent: Qt._currentValue, pool: t };
  }
  var La = Error(s(460)),
    Fc = Error(s(474)),
    Ku = Error(s(542)),
    $u = { then: function () {} };
  function Rf(t) {
    return ((t = t.status), t === 'fulfilled' || t === 'rejected');
  }
  function Df(t, e, l) {
    switch (
      ((l = t[l]), l === void 0 ? t.push(e) : l !== e && (e.then(Fe, Fe), (e = l)), e.status)
    ) {
      case 'fulfilled':
        return e.value;
      case 'rejected':
        throw ((t = e.reason), zf(t), t);
      default:
        if (typeof e.status == 'string') e.then(Fe, Fe);
        else {
          if (((t = Rt), t !== null && 100 < t.shellSuspendCounter)) throw Error(s(482));
          ((t = e),
            (t.status = 'pending'),
            t.then(
              function (a) {
                if (e.status === 'pending') {
                  var u = e;
                  ((u.status = 'fulfilled'), (u.value = a));
                }
              },
              function (a) {
                if (e.status === 'pending') {
                  var u = e;
                  ((u.status = 'rejected'), (u.reason = a));
                }
              }
            ));
        }
        switch (e.status) {
          case 'fulfilled':
            return e.value;
          case 'rejected':
            throw ((t = e.reason), zf(t), t);
        }
        throw ((oa = e), La);
    }
  }
  function sa(t) {
    try {
      var e = t._init;
      return e(t._payload);
    } catch (l) {
      throw l !== null && typeof l == 'object' && typeof l.then == 'function' ? ((oa = l), La) : l;
    }
  }
  var oa = null;
  function Of() {
    if (oa === null) throw Error(s(459));
    var t = oa;
    return ((oa = null), t);
  }
  function zf(t) {
    if (t === La || t === Ku) throw Error(s(483));
  }
  var qa = null,
    jn = 0;
  function Ju(t) {
    var e = jn;
    return ((jn += 1), qa === null && (qa = []), Df(qa, t, e));
  }
  function kn(t, e) {
    ((e = e.props.ref), (t.ref = e !== void 0 ? e : null));
  }
  function Wu(t, e) {
    throw e.$$typeof === T
      ? Error(s(525))
      : ((t = Object.prototype.toString.call(e)),
        Error(
          s(
            31,
            t === '[object Object]' ? 'object with keys {' + Object.keys(e).join(', ') + '}' : t
          )
        ));
  }
  function jf(t) {
    function e(A, x) {
      if (t) {
        var M = A.deletions;
        M === null ? ((A.deletions = [x]), (A.flags |= 16)) : M.push(x);
      }
    }
    function l(A, x) {
      if (!t) return null;
      for (; x !== null; ) (e(A, x), (x = x.sibling));
      return null;
    }
    function a(A) {
      for (var x = new Map(); A !== null; )
        (A.key !== null ? x.set(A.key, A) : x.set(A.index, A), (A = A.sibling));
      return x;
    }
    function u(A, x) {
      return ((A = Pe(A, x)), (A.index = 0), (A.sibling = null), A);
    }
    function i(A, x, M) {
      return (
        (A.index = M),
        t
          ? ((M = A.alternate),
            M !== null
              ? ((M = M.index), M < x ? ((A.flags |= 67108866), x) : M)
              : ((A.flags |= 67108866), x))
          : ((A.flags |= 1048576), x)
      );
    }
    function f(A) {
      return (t && A.alternate === null && (A.flags |= 67108866), A);
    }
    function h(A, x, M, L) {
      return x === null || x.tag !== 6
        ? ((x = Lc(M, A.mode, L)), (x.return = A), x)
        : ((x = u(x, M)), (x.return = A), x);
    }
    function b(A, x, M, L) {
      var P = M.type;
      return P === z
        ? k(A, x, M.props.children, L, M.key)
        : x !== null &&
            (x.elementType === P ||
              (typeof P == 'object' && P !== null && P.$$typeof === tt && sa(P) === x.type))
          ? ((x = u(x, M.props)), kn(x, M), (x.return = A), x)
          : ((x = Yu(M.type, M.key, M.props, null, A.mode, L)), kn(x, M), (x.return = A), x);
    }
    function C(A, x, M, L) {
      return x === null ||
        x.tag !== 4 ||
        x.stateNode.containerInfo !== M.containerInfo ||
        x.stateNode.implementation !== M.implementation
        ? ((x = qc(M, A.mode, L)), (x.return = A), x)
        : ((x = u(x, M.children || [])), (x.return = A), x);
    }
    function k(A, x, M, L, P) {
      return x === null || x.tag !== 7
        ? ((x = aa(M, A.mode, L, P)), (x.return = A), x)
        : ((x = u(x, M)), (x.return = A), x);
    }
    function G(A, x, M) {
      if ((typeof x == 'string' && x !== '') || typeof x == 'number' || typeof x == 'bigint')
        return ((x = Lc('' + x, A.mode, M)), (x.return = A), x);
      if (typeof x == 'object' && x !== null) {
        switch (x.$$typeof) {
          case Y:
            return ((M = Yu(x.type, x.key, x.props, null, A.mode, M)), kn(M, x), (M.return = A), M);
          case H:
            return ((x = qc(x, A.mode, M)), (x.return = A), x);
          case tt:
            return ((x = sa(x)), G(A, x, M));
        }
        if (Ut(x) || $t(x)) return ((x = aa(x, A.mode, M, null)), (x.return = A), x);
        if (typeof x.then == 'function') return G(A, Ju(x), M);
        if (x.$$typeof === j) return G(A, Vu(A, x), M);
        Wu(A, x);
      }
      return null;
    }
    function D(A, x, M, L) {
      var P = x !== null ? x.key : null;
      if ((typeof M == 'string' && M !== '') || typeof M == 'number' || typeof M == 'bigint')
        return P !== null ? null : h(A, x, '' + M, L);
      if (typeof M == 'object' && M !== null) {
        switch (M.$$typeof) {
          case Y:
            return M.key === P ? b(A, x, M, L) : null;
          case H:
            return M.key === P ? C(A, x, M, L) : null;
          case tt:
            return ((M = sa(M)), D(A, x, M, L));
        }
        if (Ut(M) || $t(M)) return P !== null ? null : k(A, x, M, L, null);
        if (typeof M.then == 'function') return D(A, x, Ju(M), L);
        if (M.$$typeof === j) return D(A, x, Vu(A, M), L);
        Wu(A, M);
      }
      return null;
    }
    function O(A, x, M, L, P) {
      if ((typeof L == 'string' && L !== '') || typeof L == 'number' || typeof L == 'bigint')
        return ((A = A.get(M) || null), h(x, A, '' + L, P));
      if (typeof L == 'object' && L !== null) {
        switch (L.$$typeof) {
          case Y:
            return ((A = A.get(L.key === null ? M : L.key) || null), b(x, A, L, P));
          case H:
            return ((A = A.get(L.key === null ? M : L.key) || null), C(x, A, L, P));
          case tt:
            return ((L = sa(L)), O(A, x, M, L, P));
        }
        if (Ut(L) || $t(L)) return ((A = A.get(M) || null), k(x, A, L, P, null));
        if (typeof L.then == 'function') return O(A, x, M, Ju(L), P);
        if (L.$$typeof === j) return O(A, x, M, Vu(x, L), P);
        Wu(x, L);
      }
      return null;
    }
    function W(A, x, M, L) {
      for (
        var P = null, gt = null, I = x, st = (x = 0), ht = null;
        I !== null && st < M.length;
        st++
      ) {
        I.index > st ? ((ht = I), (I = null)) : (ht = I.sibling);
        var _t = D(A, I, M[st], L);
        if (_t === null) {
          I === null && (I = ht);
          break;
        }
        (t && I && _t.alternate === null && e(A, I),
          (x = i(_t, x, st)),
          gt === null ? (P = _t) : (gt.sibling = _t),
          (gt = _t),
          (I = ht));
      }
      if (st === M.length) return (l(A, I), yt && tl(A, st), P);
      if (I === null) {
        for (; st < M.length; st++)
          ((I = G(A, M[st], L)),
            I !== null && ((x = i(I, x, st)), gt === null ? (P = I) : (gt.sibling = I), (gt = I)));
        return (yt && tl(A, st), P);
      }
      for (I = a(I); st < M.length; st++)
        ((ht = O(I, A, st, M[st], L)),
          ht !== null &&
            (t && ht.alternate !== null && I.delete(ht.key === null ? st : ht.key),
            (x = i(ht, x, st)),
            gt === null ? (P = ht) : (gt.sibling = ht),
            (gt = ht)));
      return (
        t &&
          I.forEach(function (Vl) {
            return e(A, Vl);
          }),
        yt && tl(A, st),
        P
      );
    }
    function et(A, x, M, L) {
      if (M == null) throw Error(s(151));
      for (
        var P = null, gt = null, I = x, st = (x = 0), ht = null, _t = M.next();
        I !== null && !_t.done;
        st++, _t = M.next()
      ) {
        I.index > st ? ((ht = I), (I = null)) : (ht = I.sibling);
        var Vl = D(A, I, _t.value, L);
        if (Vl === null) {
          I === null && (I = ht);
          break;
        }
        (t && I && Vl.alternate === null && e(A, I),
          (x = i(Vl, x, st)),
          gt === null ? (P = Vl) : (gt.sibling = Vl),
          (gt = Vl),
          (I = ht));
      }
      if (_t.done) return (l(A, I), yt && tl(A, st), P);
      if (I === null) {
        for (; !_t.done; st++, _t = M.next())
          ((_t = G(A, _t.value, L)),
            _t !== null &&
              ((x = i(_t, x, st)), gt === null ? (P = _t) : (gt.sibling = _t), (gt = _t)));
        return (yt && tl(A, st), P);
      }
      for (I = a(I); !_t.done; st++, _t = M.next())
        ((_t = O(I, A, st, _t.value, L)),
          _t !== null &&
            (t && _t.alternate !== null && I.delete(_t.key === null ? st : _t.key),
            (x = i(_t, x, st)),
            gt === null ? (P = _t) : (gt.sibling = _t),
            (gt = _t)));
      return (
        t &&
          I.forEach(function (hv) {
            return e(A, hv);
          }),
        yt && tl(A, st),
        P
      );
    }
    function Mt(A, x, M, L) {
      if (
        (typeof M == 'object' &&
          M !== null &&
          M.type === z &&
          M.key === null &&
          (M = M.props.children),
        typeof M == 'object' && M !== null)
      ) {
        switch (M.$$typeof) {
          case Y:
            t: {
              for (var P = M.key; x !== null; ) {
                if (x.key === P) {
                  if (((P = M.type), P === z)) {
                    if (x.tag === 7) {
                      (l(A, x.sibling), (L = u(x, M.props.children)), (L.return = A), (A = L));
                      break t;
                    }
                  } else if (
                    x.elementType === P ||
                    (typeof P == 'object' && P !== null && P.$$typeof === tt && sa(P) === x.type)
                  ) {
                    (l(A, x.sibling), (L = u(x, M.props)), kn(L, M), (L.return = A), (A = L));
                    break t;
                  }
                  l(A, x);
                  break;
                } else e(A, x);
                x = x.sibling;
              }
              M.type === z
                ? ((L = aa(M.props.children, A.mode, L, M.key)), (L.return = A), (A = L))
                : ((L = Yu(M.type, M.key, M.props, null, A.mode, L)),
                  kn(L, M),
                  (L.return = A),
                  (A = L));
            }
            return f(A);
          case H:
            t: {
              for (P = M.key; x !== null; ) {
                if (x.key === P)
                  if (
                    x.tag === 4 &&
                    x.stateNode.containerInfo === M.containerInfo &&
                    x.stateNode.implementation === M.implementation
                  ) {
                    (l(A, x.sibling), (L = u(x, M.children || [])), (L.return = A), (A = L));
                    break t;
                  } else {
                    l(A, x);
                    break;
                  }
                else e(A, x);
                x = x.sibling;
              }
              ((L = qc(M, A.mode, L)), (L.return = A), (A = L));
            }
            return f(A);
          case tt:
            return ((M = sa(M)), Mt(A, x, M, L));
        }
        if (Ut(M)) return W(A, x, M, L);
        if ($t(M)) {
          if (((P = $t(M)), typeof P != 'function')) throw Error(s(150));
          return ((M = P.call(M)), et(A, x, M, L));
        }
        if (typeof M.then == 'function') return Mt(A, x, Ju(M), L);
        if (M.$$typeof === j) return Mt(A, x, Vu(A, M), L);
        Wu(A, M);
      }
      return (typeof M == 'string' && M !== '') || typeof M == 'number' || typeof M == 'bigint'
        ? ((M = '' + M),
          x !== null && x.tag === 6
            ? (l(A, x.sibling), (L = u(x, M)), (L.return = A), (A = L))
            : (l(A, x), (L = Lc(M, A.mode, L)), (L.return = A), (A = L)),
          f(A))
        : l(A, x);
    }
    return function (A, x, M, L) {
      try {
        jn = 0;
        var P = Mt(A, x, M, L);
        return ((qa = null), P);
      } catch (I) {
        if (I === La || I === Ku) throw I;
        var gt = _e(29, I, null, A.mode);
        return ((gt.lanes = L), (gt.return = A), gt);
      } finally {
      }
    };
  }
  var ra = jf(!0),
    kf = jf(!1),
    Cl = !1;
  function Ic(t) {
    t.updateQueue = {
      baseState: t.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null,
    };
  }
  function Pc(t, e) {
    ((t = t.updateQueue),
      e.updateQueue === t &&
        (e.updateQueue = {
          baseState: t.baseState,
          firstBaseUpdate: t.firstBaseUpdate,
          lastBaseUpdate: t.lastBaseUpdate,
          shared: t.shared,
          callbacks: null,
        }));
  }
  function Rl(t) {
    return { lane: t, tag: 0, payload: null, callback: null, next: null };
  }
  function Dl(t, e, l) {
    var a = t.updateQueue;
    if (a === null) return null;
    if (((a = a.shared), (bt & 2) !== 0)) {
      var u = a.pending;
      return (
        u === null ? (e.next = e) : ((e.next = u.next), (u.next = e)),
        (a.pending = e),
        (e = Gu(t)),
        vf(t, null, l),
        e
      );
    }
    return (qu(t, a, e, l), Gu(t));
  }
  function wn(t, e, l) {
    if (((e = e.updateQueue), e !== null && ((e = e.shared), (l & 4194048) !== 0))) {
      var a = e.lanes;
      ((a &= t.pendingLanes), (l |= a), (e.lanes = l), Tr(t, l));
    }
  }
  function ts(t, e) {
    var l = t.updateQueue,
      a = t.alternate;
    if (a !== null && ((a = a.updateQueue), l === a)) {
      var u = null,
        i = null;
      if (((l = l.firstBaseUpdate), l !== null)) {
        do {
          var f = { lane: l.lane, tag: l.tag, payload: l.payload, callback: null, next: null };
          (i === null ? (u = i = f) : (i = i.next = f), (l = l.next));
        } while (l !== null);
        i === null ? (u = i = e) : (i = i.next = e);
      } else u = i = e;
      ((l = {
        baseState: a.baseState,
        firstBaseUpdate: u,
        lastBaseUpdate: i,
        shared: a.shared,
        callbacks: a.callbacks,
      }),
        (t.updateQueue = l));
      return;
    }
    ((t = l.lastBaseUpdate),
      t === null ? (l.firstBaseUpdate = e) : (t.next = e),
      (l.lastBaseUpdate = e));
  }
  var es = !1;
  function Un() {
    if (es) {
      var t = Ha;
      if (t !== null) throw t;
    }
  }
  function Bn(t, e, l, a) {
    es = !1;
    var u = t.updateQueue;
    Cl = !1;
    var i = u.firstBaseUpdate,
      f = u.lastBaseUpdate,
      h = u.shared.pending;
    if (h !== null) {
      u.shared.pending = null;
      var b = h,
        C = b.next;
      ((b.next = null), f === null ? (i = C) : (f.next = C), (f = b));
      var k = t.alternate;
      k !== null &&
        ((k = k.updateQueue),
        (h = k.lastBaseUpdate),
        h !== f && (h === null ? (k.firstBaseUpdate = C) : (h.next = C), (k.lastBaseUpdate = b)));
    }
    if (i !== null) {
      var G = u.baseState;
      ((f = 0), (k = C = b = null), (h = i));
      do {
        var D = h.lane & -536870913,
          O = D !== h.lane;
        if (O ? (mt & D) === D : (a & D) === D) {
          (D !== 0 && D === Ba && (es = !0),
            k !== null &&
              (k = k.next =
                { lane: 0, tag: h.tag, payload: h.payload, callback: null, next: null }));
          t: {
            var W = t,
              et = h;
            D = e;
            var Mt = l;
            switch (et.tag) {
              case 1:
                if (((W = et.payload), typeof W == 'function')) {
                  G = W.call(Mt, G, D);
                  break t;
                }
                G = W;
                break t;
              case 3:
                W.flags = (W.flags & -65537) | 128;
              case 0:
                if (
                  ((W = et.payload), (D = typeof W == 'function' ? W.call(Mt, G, D) : W), D == null)
                )
                  break t;
                G = _({}, G, D);
                break t;
              case 2:
                Cl = !0;
            }
          }
          ((D = h.callback),
            D !== null &&
              ((t.flags |= 64),
              O && (t.flags |= 8192),
              (O = u.callbacks),
              O === null ? (u.callbacks = [D]) : O.push(D)));
        } else
          ((O = { lane: D, tag: h.tag, payload: h.payload, callback: h.callback, next: null }),
            k === null ? ((C = k = O), (b = G)) : (k = k.next = O),
            (f |= D));
        if (((h = h.next), h === null)) {
          if (((h = u.shared.pending), h === null)) break;
          ((O = h),
            (h = O.next),
            (O.next = null),
            (u.lastBaseUpdate = O),
            (u.shared.pending = null));
        }
      } while (!0);
      (k === null && (b = G),
        (u.baseState = b),
        (u.firstBaseUpdate = C),
        (u.lastBaseUpdate = k),
        i === null && (u.shared.lanes = 0),
        (wl |= f),
        (t.lanes = f),
        (t.memoizedState = G));
    }
  }
  function wf(t, e) {
    if (typeof t != 'function') throw Error(s(191, t));
    t.call(e);
  }
  function Uf(t, e) {
    var l = t.callbacks;
    if (l !== null) for (t.callbacks = null, t = 0; t < l.length; t++) wf(l[t], e);
  }
  var Ga = S(null),
    Fu = S(0);
  function Bf(t, e) {
    ((t = fl), K(Fu, t), K(Ga, e), (fl = t | e.baseLanes));
  }
  function ls() {
    (K(Fu, fl), K(Ga, Ga.current));
  }
  function as() {
    ((fl = Fu.current), q(Ga), q(Fu));
  }
  var be = S(null),
    ke = null;
  function Ol(t) {
    var e = t.alternate;
    (K(Yt, Yt.current & 1),
      K(be, t),
      ke === null && (e === null || Ga.current !== null || e.memoizedState !== null) && (ke = t));
  }
  function ns(t) {
    (K(Yt, Yt.current), K(be, t), ke === null && (ke = t));
  }
  function Hf(t) {
    t.tag === 22 ? (K(Yt, Yt.current), K(be, t), ke === null && (ke = t)) : zl();
  }
  function zl() {
    (K(Yt, Yt.current), K(be, be.current));
  }
  function Se(t) {
    (q(be), ke === t && (ke = null), q(Yt));
  }
  var Yt = S(0);
  function Iu(t) {
    for (var e = t; e !== null; ) {
      if (e.tag === 13) {
        var l = e.memoizedState;
        if (l !== null && ((l = l.dehydrated), l === null || ro(l) || fo(l))) return e;
      } else if (
        e.tag === 19 &&
        (e.memoizedProps.revealOrder === 'forwards' ||
          e.memoizedProps.revealOrder === 'backwards' ||
          e.memoizedProps.revealOrder === 'unstable_legacy-backwards' ||
          e.memoizedProps.revealOrder === 'together')
      ) {
        if ((e.flags & 128) !== 0) return e;
      } else if (e.child !== null) {
        ((e.child.return = e), (e = e.child));
        continue;
      }
      if (e === t) break;
      for (; e.sibling === null; ) {
        if (e.return === null || e.return === t) return null;
        e = e.return;
      }
      ((e.sibling.return = e.return), (e = e.sibling));
    }
    return null;
  }
  var al = 0,
    ut = null,
    Nt = null,
    Vt = null,
    Pu = !1,
    Ya = !1,
    fa = !1,
    ti = 0,
    Hn = 0,
    Xa = null,
    n0 = 0;
  function Lt() {
    throw Error(s(321));
  }
  function us(t, e) {
    if (e === null) return !1;
    for (var l = 0; l < e.length && l < t.length; l++) if (!ge(t[l], e[l])) return !1;
    return !0;
  }
  function is(t, e, l, a, u, i) {
    return (
      (al = i),
      (ut = e),
      (e.memoizedState = null),
      (e.updateQueue = null),
      (e.lanes = 0),
      (U.H = t === null || t.memoizedState === null ? Sd : Ss),
      (fa = !1),
      (i = l(a, u)),
      (fa = !1),
      Ya && (i = qf(e, l, a, u)),
      Lf(t),
      i
    );
  }
  function Lf(t) {
    U.H = Gn;
    var e = Nt !== null && Nt.next !== null;
    if (((al = 0), (Vt = Nt = ut = null), (Pu = !1), (Hn = 0), (Xa = null), e)) throw Error(s(300));
    t === null || Zt || ((t = t.dependencies), t !== null && Qu(t) && (Zt = !0));
  }
  function qf(t, e, l, a) {
    ut = t;
    var u = 0;
    do {
      if ((Ya && (Xa = null), (Hn = 0), (Ya = !1), 25 <= u)) throw Error(s(301));
      if (((u += 1), (Vt = Nt = null), t.updateQueue != null)) {
        var i = t.updateQueue;
        ((i.lastEffect = null),
          (i.events = null),
          (i.stores = null),
          i.memoCache != null && (i.memoCache.index = 0));
      }
      ((U.H = xd), (i = e(l, a)));
    } while (Ya);
    return i;
  }
  function u0() {
    var t = U.H,
      e = t.useState()[0];
    return (
      (e = typeof e.then == 'function' ? Ln(e) : e),
      (t = t.useState()[0]),
      (Nt !== null ? Nt.memoizedState : null) !== t && (ut.flags |= 1024),
      e
    );
  }
  function cs() {
    var t = ti !== 0;
    return ((ti = 0), t);
  }
  function ss(t, e, l) {
    ((e.updateQueue = t.updateQueue), (e.flags &= -2053), (t.lanes &= ~l));
  }
  function os(t) {
    if (Pu) {
      for (t = t.memoizedState; t !== null; ) {
        var e = t.queue;
        (e !== null && (e.pending = null), (t = t.next));
      }
      Pu = !1;
    }
    ((al = 0), (Vt = Nt = ut = null), (Ya = !1), (Hn = ti = 0), (Xa = null));
  }
  function ue() {
    var t = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
    return (Vt === null ? (ut.memoizedState = Vt = t) : (Vt = Vt.next = t), Vt);
  }
  function Xt() {
    if (Nt === null) {
      var t = ut.alternate;
      t = t !== null ? t.memoizedState : null;
    } else t = Nt.next;
    var e = Vt === null ? ut.memoizedState : Vt.next;
    if (e !== null) ((Vt = e), (Nt = t));
    else {
      if (t === null) throw ut.alternate === null ? Error(s(467)) : Error(s(310));
      ((Nt = t),
        (t = {
          memoizedState: Nt.memoizedState,
          baseState: Nt.baseState,
          baseQueue: Nt.baseQueue,
          queue: Nt.queue,
          next: null,
        }),
        Vt === null ? (ut.memoizedState = Vt = t) : (Vt = Vt.next = t));
    }
    return Vt;
  }
  function ei() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function Ln(t) {
    var e = Hn;
    return (
      (Hn += 1),
      Xa === null && (Xa = []),
      (t = Df(Xa, t, e)),
      (e = ut),
      (Vt === null ? e.memoizedState : Vt.next) === null &&
        ((e = e.alternate), (U.H = e === null || e.memoizedState === null ? Sd : Ss)),
      t
    );
  }
  function li(t) {
    if (t !== null && typeof t == 'object') {
      if (typeof t.then == 'function') return Ln(t);
      if (t.$$typeof === j) return te(t);
    }
    throw Error(s(438, String(t)));
  }
  function rs(t) {
    var e = null,
      l = ut.updateQueue;
    if ((l !== null && (e = l.memoCache), e == null)) {
      var a = ut.alternate;
      a !== null &&
        ((a = a.updateQueue),
        a !== null &&
          ((a = a.memoCache),
          a != null &&
            (e = {
              data: a.data.map(function (u) {
                return u.slice();
              }),
              index: 0,
            })));
    }
    if (
      (e == null && (e = { data: [], index: 0 }),
      l === null && ((l = ei()), (ut.updateQueue = l)),
      (l.memoCache = e),
      (l = e.data[e.index]),
      l === void 0)
    )
      for (l = e.data[e.index] = Array(t), a = 0; a < t; a++) l[a] = dt;
    return (e.index++, l);
  }
  function nl(t, e) {
    return typeof e == 'function' ? e(t) : e;
  }
  function ai(t) {
    var e = Xt();
    return fs(e, Nt, t);
  }
  function fs(t, e, l) {
    var a = t.queue;
    if (a === null) throw Error(s(311));
    a.lastRenderedReducer = l;
    var u = t.baseQueue,
      i = a.pending;
    if (i !== null) {
      if (u !== null) {
        var f = u.next;
        ((u.next = i.next), (i.next = f));
      }
      ((e.baseQueue = u = i), (a.pending = null));
    }
    if (((i = t.baseState), u === null)) t.memoizedState = i;
    else {
      e = u.next;
      var h = (f = null),
        b = null,
        C = e,
        k = !1;
      do {
        var G = C.lane & -536870913;
        if (G !== C.lane ? (mt & G) === G : (al & G) === G) {
          var D = C.revertLane;
          if (D === 0)
            (b !== null &&
              (b = b.next =
                {
                  lane: 0,
                  revertLane: 0,
                  gesture: null,
                  action: C.action,
                  hasEagerState: C.hasEagerState,
                  eagerState: C.eagerState,
                  next: null,
                }),
              G === Ba && (k = !0));
          else if ((al & D) === D) {
            ((C = C.next), D === Ba && (k = !0));
            continue;
          } else
            ((G = {
              lane: 0,
              revertLane: C.revertLane,
              gesture: null,
              action: C.action,
              hasEagerState: C.hasEagerState,
              eagerState: C.eagerState,
              next: null,
            }),
              b === null ? ((h = b = G), (f = i)) : (b = b.next = G),
              (ut.lanes |= D),
              (wl |= D));
          ((G = C.action), fa && l(i, G), (i = C.hasEagerState ? C.eagerState : l(i, G)));
        } else
          ((D = {
            lane: G,
            revertLane: C.revertLane,
            gesture: C.gesture,
            action: C.action,
            hasEagerState: C.hasEagerState,
            eagerState: C.eagerState,
            next: null,
          }),
            b === null ? ((h = b = D), (f = i)) : (b = b.next = D),
            (ut.lanes |= G),
            (wl |= G));
        C = C.next;
      } while (C !== null && C !== e);
      if (
        (b === null ? (f = i) : (b.next = h),
        !ge(i, t.memoizedState) && ((Zt = !0), k && ((l = Ha), l !== null)))
      )
        throw l;
      ((t.memoizedState = i), (t.baseState = f), (t.baseQueue = b), (a.lastRenderedState = i));
    }
    return (u === null && (a.lanes = 0), [t.memoizedState, a.dispatch]);
  }
  function ds(t) {
    var e = Xt(),
      l = e.queue;
    if (l === null) throw Error(s(311));
    l.lastRenderedReducer = t;
    var a = l.dispatch,
      u = l.pending,
      i = e.memoizedState;
    if (u !== null) {
      l.pending = null;
      var f = (u = u.next);
      do ((i = t(i, f.action)), (f = f.next));
      while (f !== u);
      (ge(i, e.memoizedState) || (Zt = !0),
        (e.memoizedState = i),
        e.baseQueue === null && (e.baseState = i),
        (l.lastRenderedState = i));
    }
    return [i, a];
  }
  function Gf(t, e, l) {
    var a = ut,
      u = Xt(),
      i = yt;
    if (i) {
      if (l === void 0) throw Error(s(407));
      l = l();
    } else l = e();
    var f = !ge((Nt || u).memoizedState, l);
    if (
      (f && ((u.memoizedState = l), (Zt = !0)),
      (u = u.queue),
      ys(Qf.bind(null, a, u, t), [t]),
      u.getSnapshot !== e || f || (Vt !== null && Vt.memoizedState.tag & 1))
    ) {
      if (
        ((a.flags |= 2048),
        Qa(9, { destroy: void 0 }, Xf.bind(null, a, u, l, e), null),
        Rt === null)
      )
        throw Error(s(349));
      i || (al & 127) !== 0 || Yf(a, e, l);
    }
    return l;
  }
  function Yf(t, e, l) {
    ((t.flags |= 16384),
      (t = { getSnapshot: e, value: l }),
      (e = ut.updateQueue),
      e === null
        ? ((e = ei()), (ut.updateQueue = e), (e.stores = [t]))
        : ((l = e.stores), l === null ? (e.stores = [t]) : l.push(t)));
  }
  function Xf(t, e, l, a) {
    ((e.value = l), (e.getSnapshot = a), Vf(e) && Zf(t));
  }
  function Qf(t, e, l) {
    return l(function () {
      Vf(e) && Zf(t);
    });
  }
  function Vf(t) {
    var e = t.getSnapshot;
    t = t.value;
    try {
      var l = e();
      return !ge(t, l);
    } catch {
      return !0;
    }
  }
  function Zf(t) {
    var e = la(t, 2);
    e !== null && me(e, t, 2);
  }
  function ms(t) {
    var e = ue();
    if (typeof t == 'function') {
      var l = t;
      if (((t = l()), fa)) {
        Sl(!0);
        try {
          l();
        } finally {
          Sl(!1);
        }
      }
    }
    return (
      (e.memoizedState = e.baseState = t),
      (e.queue = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: nl,
        lastRenderedState: t,
      }),
      e
    );
  }
  function Kf(t, e, l, a) {
    return ((t.baseState = l), fs(t, Nt, typeof a == 'function' ? a : nl));
  }
  function i0(t, e, l, a, u) {
    if (ii(t)) throw Error(s(485));
    if (((t = e.action), t !== null)) {
      var i = {
        payload: u,
        action: t,
        next: null,
        isTransition: !0,
        status: 'pending',
        value: null,
        reason: null,
        listeners: [],
        then: function (f) {
          i.listeners.push(f);
        },
      };
      (U.T !== null ? l(!0) : (i.isTransition = !1),
        a(i),
        (l = e.pending),
        l === null
          ? ((i.next = e.pending = i), $f(e, i))
          : ((i.next = l.next), (e.pending = l.next = i)));
    }
  }
  function $f(t, e) {
    var l = e.action,
      a = e.payload,
      u = t.state;
    if (e.isTransition) {
      var i = U.T,
        f = {};
      U.T = f;
      try {
        var h = l(u, a),
          b = U.S;
        (b !== null && b(f, h), Jf(t, e, h));
      } catch (C) {
        hs(t, e, C);
      } finally {
        (i !== null && f.types !== null && (i.types = f.types), (U.T = i));
      }
    } else
      try {
        ((i = l(u, a)), Jf(t, e, i));
      } catch (C) {
        hs(t, e, C);
      }
  }
  function Jf(t, e, l) {
    l !== null && typeof l == 'object' && typeof l.then == 'function'
      ? l.then(
          function (a) {
            Wf(t, e, a);
          },
          function (a) {
            return hs(t, e, a);
          }
        )
      : Wf(t, e, l);
  }
  function Wf(t, e, l) {
    ((e.status = 'fulfilled'),
      (e.value = l),
      Ff(e),
      (t.state = l),
      (e = t.pending),
      e !== null &&
        ((l = e.next), l === e ? (t.pending = null) : ((l = l.next), (e.next = l), $f(t, l))));
  }
  function hs(t, e, l) {
    var a = t.pending;
    if (((t.pending = null), a !== null)) {
      a = a.next;
      do ((e.status = 'rejected'), (e.reason = l), Ff(e), (e = e.next));
      while (e !== a);
    }
    t.action = null;
  }
  function Ff(t) {
    t = t.listeners;
    for (var e = 0; e < t.length; e++) (0, t[e])();
  }
  function If(t, e) {
    return e;
  }
  function Pf(t, e) {
    if (yt) {
      var l = Rt.formState;
      if (l !== null) {
        t: {
          var a = ut;
          if (yt) {
            if (Ot) {
              e: {
                for (var u = Ot, i = je; u.nodeType !== 8; ) {
                  if (!i) {
                    u = null;
                    break e;
                  }
                  if (((u = we(u.nextSibling)), u === null)) {
                    u = null;
                    break e;
                  }
                }
                ((i = u.data), (u = i === 'F!' || i === 'F' ? u : null));
              }
              if (u) {
                ((Ot = we(u.nextSibling)), (a = u.data === 'F!'));
                break t;
              }
            }
            Al(a);
          }
          a = !1;
        }
        a && (e = l[0]);
      }
    }
    return (
      (l = ue()),
      (l.memoizedState = l.baseState = e),
      (a = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: If,
        lastRenderedState: e,
      }),
      (l.queue = a),
      (l = gd.bind(null, ut, a)),
      (a.dispatch = l),
      (a = ms(!1)),
      (i = bs.bind(null, ut, !1, a.queue)),
      (a = ue()),
      (u = { state: e, dispatch: null, action: t, pending: null }),
      (a.queue = u),
      (l = i0.bind(null, ut, u, i, l)),
      (u.dispatch = l),
      (a.memoizedState = t),
      [e, l, !1]
    );
  }
  function td(t) {
    var e = Xt();
    return ed(e, Nt, t);
  }
  function ed(t, e, l) {
    if (
      ((e = fs(t, e, If)[0]),
      (t = ai(nl)[0]),
      typeof e == 'object' && e !== null && typeof e.then == 'function')
    )
      try {
        var a = Ln(e);
      } catch (f) {
        throw f === La ? Ku : f;
      }
    else a = e;
    e = Xt();
    var u = e.queue,
      i = u.dispatch;
    return (
      l !== e.memoizedState &&
        ((ut.flags |= 2048), Qa(9, { destroy: void 0 }, c0.bind(null, u, l), null)),
      [a, i, t]
    );
  }
  function c0(t, e) {
    t.action = e;
  }
  function ld(t) {
    var e = Xt(),
      l = Nt;
    if (l !== null) return ed(e, l, t);
    (Xt(), (e = e.memoizedState), (l = Xt()));
    var a = l.queue.dispatch;
    return ((l.memoizedState = t), [e, a, !1]);
  }
  function Qa(t, e, l, a) {
    return (
      (t = { tag: t, create: l, deps: a, inst: e, next: null }),
      (e = ut.updateQueue),
      e === null && ((e = ei()), (ut.updateQueue = e)),
      (l = e.lastEffect),
      l === null
        ? (e.lastEffect = t.next = t)
        : ((a = l.next), (l.next = t), (t.next = a), (e.lastEffect = t)),
      t
    );
  }
  function ad() {
    return Xt().memoizedState;
  }
  function ni(t, e, l, a) {
    var u = ue();
    ((ut.flags |= t),
      (u.memoizedState = Qa(1 | e, { destroy: void 0 }, l, a === void 0 ? null : a)));
  }
  function ui(t, e, l, a) {
    var u = Xt();
    a = a === void 0 ? null : a;
    var i = u.memoizedState.inst;
    Nt !== null && a !== null && us(a, Nt.memoizedState.deps)
      ? (u.memoizedState = Qa(e, i, l, a))
      : ((ut.flags |= t), (u.memoizedState = Qa(1 | e, i, l, a)));
  }
  function nd(t, e) {
    ni(8390656, 8, t, e);
  }
  function ys(t, e) {
    ui(2048, 8, t, e);
  }
  function s0(t) {
    ut.flags |= 4;
    var e = ut.updateQueue;
    if (e === null) ((e = ei()), (ut.updateQueue = e), (e.events = [t]));
    else {
      var l = e.events;
      l === null ? (e.events = [t]) : l.push(t);
    }
  }
  function ud(t) {
    var e = Xt().memoizedState;
    return (
      s0({ ref: e, nextImpl: t }),
      function () {
        if ((bt & 2) !== 0) throw Error(s(440));
        return e.impl.apply(void 0, arguments);
      }
    );
  }
  function id(t, e) {
    return ui(4, 2, t, e);
  }
  function cd(t, e) {
    return ui(4, 4, t, e);
  }
  function sd(t, e) {
    if (typeof e == 'function') {
      t = t();
      var l = e(t);
      return function () {
        typeof l == 'function' ? l() : e(null);
      };
    }
    if (e != null)
      return (
        (t = t()),
        (e.current = t),
        function () {
          e.current = null;
        }
      );
  }
  function od(t, e, l) {
    ((l = l != null ? l.concat([t]) : null), ui(4, 4, sd.bind(null, e, t), l));
  }
  function ps() {}
  function rd(t, e) {
    var l = Xt();
    e = e === void 0 ? null : e;
    var a = l.memoizedState;
    return e !== null && us(e, a[1]) ? a[0] : ((l.memoizedState = [t, e]), t);
  }
  function fd(t, e) {
    var l = Xt();
    e = e === void 0 ? null : e;
    var a = l.memoizedState;
    if (e !== null && us(e, a[1])) return a[0];
    if (((a = t()), fa)) {
      Sl(!0);
      try {
        t();
      } finally {
        Sl(!1);
      }
    }
    return ((l.memoizedState = [a, e]), a);
  }
  function vs(t, e, l) {
    return l === void 0 || ((al & 1073741824) !== 0 && (mt & 261930) === 0)
      ? (t.memoizedState = e)
      : ((t.memoizedState = l), (t = dm()), (ut.lanes |= t), (wl |= t), l);
  }
  function dd(t, e, l, a) {
    return ge(l, e)
      ? l
      : Ga.current !== null
        ? ((t = vs(t, l, a)), ge(t, e) || (Zt = !0), t)
        : (al & 42) === 0 || ((al & 1073741824) !== 0 && (mt & 261930) === 0)
          ? ((Zt = !0), (t.memoizedState = l))
          : ((t = dm()), (ut.lanes |= t), (wl |= t), e);
  }
  function md(t, e, l, a, u) {
    var i = R.p;
    R.p = i !== 0 && 8 > i ? i : 8;
    var f = U.T,
      h = {};
    ((U.T = h), bs(t, !1, e, l));
    try {
      var b = u(),
        C = U.S;
      if (
        (C !== null && C(h, b), b !== null && typeof b == 'object' && typeof b.then == 'function')
      ) {
        var k = a0(b, a);
        qn(t, e, k, Te(t));
      } else qn(t, e, a, Te(t));
    } catch (G) {
      qn(t, e, { then: function () {}, status: 'rejected', reason: G }, Te());
    } finally {
      ((R.p = i), f !== null && h.types !== null && (f.types = h.types), (U.T = f));
    }
  }
  function o0() {}
  function gs(t, e, l, a) {
    if (t.tag !== 5) throw Error(s(476));
    var u = hd(t).queue;
    md(
      t,
      u,
      e,
      Z,
      l === null
        ? o0
        : function () {
            return (yd(t), l(a));
          }
    );
  }
  function hd(t) {
    var e = t.memoizedState;
    if (e !== null) return e;
    e = {
      memoizedState: Z,
      baseState: Z,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: nl,
        lastRenderedState: Z,
      },
      next: null,
    };
    var l = {};
    return (
      (e.next = {
        memoizedState: l,
        baseState: l,
        baseQueue: null,
        queue: {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: nl,
          lastRenderedState: l,
        },
        next: null,
      }),
      (t.memoizedState = e),
      (t = t.alternate),
      t !== null && (t.memoizedState = e),
      e
    );
  }
  function yd(t) {
    var e = hd(t);
    (e.next === null && (e = t.alternate.memoizedState), qn(t, e.next.queue, {}, Te()));
  }
  function _s() {
    return te(au);
  }
  function pd() {
    return Xt().memoizedState;
  }
  function vd() {
    return Xt().memoizedState;
  }
  function r0(t) {
    for (var e = t.return; e !== null; ) {
      switch (e.tag) {
        case 24:
        case 3:
          var l = Te();
          t = Rl(l);
          var a = Dl(e, t, l);
          (a !== null && (me(a, e, l), wn(a, e, l)), (e = { cache: $c() }), (t.payload = e));
          return;
      }
      e = e.return;
    }
  }
  function f0(t, e, l) {
    var a = Te();
    ((l = {
      lane: a,
      revertLane: 0,
      gesture: null,
      action: l,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    }),
      ii(t) ? _d(e, l) : ((l = Bc(t, e, l, a)), l !== null && (me(l, t, a), bd(l, e, a))));
  }
  function gd(t, e, l) {
    var a = Te();
    qn(t, e, l, a);
  }
  function qn(t, e, l, a) {
    var u = {
      lane: a,
      revertLane: 0,
      gesture: null,
      action: l,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    };
    if (ii(t)) _d(e, u);
    else {
      var i = t.alternate;
      if (
        t.lanes === 0 &&
        (i === null || i.lanes === 0) &&
        ((i = e.lastRenderedReducer), i !== null)
      )
        try {
          var f = e.lastRenderedState,
            h = i(f, l);
          if (((u.hasEagerState = !0), (u.eagerState = h), ge(h, f)))
            return (qu(t, e, u, 0), Rt === null && Lu(), !1);
        } catch {
        } finally {
        }
      if (((l = Bc(t, e, u, a)), l !== null)) return (me(l, t, a), bd(l, e, a), !0);
    }
    return !1;
  }
  function bs(t, e, l, a) {
    if (
      ((a = {
        lane: 2,
        revertLane: Is(),
        gesture: null,
        action: a,
        hasEagerState: !1,
        eagerState: null,
        next: null,
      }),
      ii(t))
    ) {
      if (e) throw Error(s(479));
    } else ((e = Bc(t, l, a, 2)), e !== null && me(e, t, 2));
  }
  function ii(t) {
    var e = t.alternate;
    return t === ut || (e !== null && e === ut);
  }
  function _d(t, e) {
    Ya = Pu = !0;
    var l = t.pending;
    (l === null ? (e.next = e) : ((e.next = l.next), (l.next = e)), (t.pending = e));
  }
  function bd(t, e, l) {
    if ((l & 4194048) !== 0) {
      var a = e.lanes;
      ((a &= t.pendingLanes), (l |= a), (e.lanes = l), Tr(t, l));
    }
  }
  var Gn = {
    readContext: te,
    use: li,
    useCallback: Lt,
    useContext: Lt,
    useEffect: Lt,
    useImperativeHandle: Lt,
    useLayoutEffect: Lt,
    useInsertionEffect: Lt,
    useMemo: Lt,
    useReducer: Lt,
    useRef: Lt,
    useState: Lt,
    useDebugValue: Lt,
    useDeferredValue: Lt,
    useTransition: Lt,
    useSyncExternalStore: Lt,
    useId: Lt,
    useHostTransitionStatus: Lt,
    useFormState: Lt,
    useActionState: Lt,
    useOptimistic: Lt,
    useMemoCache: Lt,
    useCacheRefresh: Lt,
  };
  Gn.useEffectEvent = Lt;
  var Sd = {
      readContext: te,
      use: li,
      useCallback: function (t, e) {
        return ((ue().memoizedState = [t, e === void 0 ? null : e]), t);
      },
      useContext: te,
      useEffect: nd,
      useImperativeHandle: function (t, e, l) {
        ((l = l != null ? l.concat([t]) : null), ni(4194308, 4, sd.bind(null, e, t), l));
      },
      useLayoutEffect: function (t, e) {
        return ni(4194308, 4, t, e);
      },
      useInsertionEffect: function (t, e) {
        ni(4, 2, t, e);
      },
      useMemo: function (t, e) {
        var l = ue();
        e = e === void 0 ? null : e;
        var a = t();
        if (fa) {
          Sl(!0);
          try {
            t();
          } finally {
            Sl(!1);
          }
        }
        return ((l.memoizedState = [a, e]), a);
      },
      useReducer: function (t, e, l) {
        var a = ue();
        if (l !== void 0) {
          var u = l(e);
          if (fa) {
            Sl(!0);
            try {
              l(e);
            } finally {
              Sl(!1);
            }
          }
        } else u = e;
        return (
          (a.memoizedState = a.baseState = u),
          (t = {
            pending: null,
            lanes: 0,
            dispatch: null,
            lastRenderedReducer: t,
            lastRenderedState: u,
          }),
          (a.queue = t),
          (t = t.dispatch = f0.bind(null, ut, t)),
          [a.memoizedState, t]
        );
      },
      useRef: function (t) {
        var e = ue();
        return ((t = { current: t }), (e.memoizedState = t));
      },
      useState: function (t) {
        t = ms(t);
        var e = t.queue,
          l = gd.bind(null, ut, e);
        return ((e.dispatch = l), [t.memoizedState, l]);
      },
      useDebugValue: ps,
      useDeferredValue: function (t, e) {
        var l = ue();
        return vs(l, t, e);
      },
      useTransition: function () {
        var t = ms(!1);
        return ((t = md.bind(null, ut, t.queue, !0, !1)), (ue().memoizedState = t), [!1, t]);
      },
      useSyncExternalStore: function (t, e, l) {
        var a = ut,
          u = ue();
        if (yt) {
          if (l === void 0) throw Error(s(407));
          l = l();
        } else {
          if (((l = e()), Rt === null)) throw Error(s(349));
          (mt & 127) !== 0 || Yf(a, e, l);
        }
        u.memoizedState = l;
        var i = { value: l, getSnapshot: e };
        return (
          (u.queue = i),
          nd(Qf.bind(null, a, i, t), [t]),
          (a.flags |= 2048),
          Qa(9, { destroy: void 0 }, Xf.bind(null, a, i, l, e), null),
          l
        );
      },
      useId: function () {
        var t = ue(),
          e = Rt.identifierPrefix;
        if (yt) {
          var l = Ve,
            a = Qe;
          ((l = (a & ~(1 << (32 - ve(a) - 1))).toString(32) + l),
            (e = '_' + e + 'R_' + l),
            (l = ti++),
            0 < l && (e += 'H' + l.toString(32)),
            (e += '_'));
        } else ((l = n0++), (e = '_' + e + 'r_' + l.toString(32) + '_'));
        return (t.memoizedState = e);
      },
      useHostTransitionStatus: _s,
      useFormState: Pf,
      useActionState: Pf,
      useOptimistic: function (t) {
        var e = ue();
        e.memoizedState = e.baseState = t;
        var l = {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: null,
          lastRenderedState: null,
        };
        return ((e.queue = l), (e = bs.bind(null, ut, !0, l)), (l.dispatch = e), [t, e]);
      },
      useMemoCache: rs,
      useCacheRefresh: function () {
        return (ue().memoizedState = r0.bind(null, ut));
      },
      useEffectEvent: function (t) {
        var e = ue(),
          l = { impl: t };
        return (
          (e.memoizedState = l),
          function () {
            if ((bt & 2) !== 0) throw Error(s(440));
            return l.impl.apply(void 0, arguments);
          }
        );
      },
    },
    Ss = {
      readContext: te,
      use: li,
      useCallback: rd,
      useContext: te,
      useEffect: ys,
      useImperativeHandle: od,
      useInsertionEffect: id,
      useLayoutEffect: cd,
      useMemo: fd,
      useReducer: ai,
      useRef: ad,
      useState: function () {
        return ai(nl);
      },
      useDebugValue: ps,
      useDeferredValue: function (t, e) {
        var l = Xt();
        return dd(l, Nt.memoizedState, t, e);
      },
      useTransition: function () {
        var t = ai(nl)[0],
          e = Xt().memoizedState;
        return [typeof t == 'boolean' ? t : Ln(t), e];
      },
      useSyncExternalStore: Gf,
      useId: pd,
      useHostTransitionStatus: _s,
      useFormState: td,
      useActionState: td,
      useOptimistic: function (t, e) {
        var l = Xt();
        return Kf(l, Nt, t, e);
      },
      useMemoCache: rs,
      useCacheRefresh: vd,
    };
  Ss.useEffectEvent = ud;
  var xd = {
    readContext: te,
    use: li,
    useCallback: rd,
    useContext: te,
    useEffect: ys,
    useImperativeHandle: od,
    useInsertionEffect: id,
    useLayoutEffect: cd,
    useMemo: fd,
    useReducer: ds,
    useRef: ad,
    useState: function () {
      return ds(nl);
    },
    useDebugValue: ps,
    useDeferredValue: function (t, e) {
      var l = Xt();
      return Nt === null ? vs(l, t, e) : dd(l, Nt.memoizedState, t, e);
    },
    useTransition: function () {
      var t = ds(nl)[0],
        e = Xt().memoizedState;
      return [typeof t == 'boolean' ? t : Ln(t), e];
    },
    useSyncExternalStore: Gf,
    useId: pd,
    useHostTransitionStatus: _s,
    useFormState: ld,
    useActionState: ld,
    useOptimistic: function (t, e) {
      var l = Xt();
      return Nt !== null ? Kf(l, Nt, t, e) : ((l.baseState = t), [t, l.queue.dispatch]);
    },
    useMemoCache: rs,
    useCacheRefresh: vd,
  };
  xd.useEffectEvent = ud;
  function xs(t, e, l, a) {
    ((e = t.memoizedState),
      (l = l(a, e)),
      (l = l == null ? e : _({}, e, l)),
      (t.memoizedState = l),
      t.lanes === 0 && (t.updateQueue.baseState = l));
  }
  var Es = {
    enqueueSetState: function (t, e, l) {
      t = t._reactInternals;
      var a = Te(),
        u = Rl(a);
      ((u.payload = e),
        l != null && (u.callback = l),
        (e = Dl(t, u, a)),
        e !== null && (me(e, t, a), wn(e, t, a)));
    },
    enqueueReplaceState: function (t, e, l) {
      t = t._reactInternals;
      var a = Te(),
        u = Rl(a);
      ((u.tag = 1),
        (u.payload = e),
        l != null && (u.callback = l),
        (e = Dl(t, u, a)),
        e !== null && (me(e, t, a), wn(e, t, a)));
    },
    enqueueForceUpdate: function (t, e) {
      t = t._reactInternals;
      var l = Te(),
        a = Rl(l);
      ((a.tag = 2),
        e != null && (a.callback = e),
        (e = Dl(t, a, l)),
        e !== null && (me(e, t, l), wn(e, t, l)));
    },
  };
  function Ed(t, e, l, a, u, i, f) {
    return (
      (t = t.stateNode),
      typeof t.shouldComponentUpdate == 'function'
        ? t.shouldComponentUpdate(a, i, f)
        : e.prototype && e.prototype.isPureReactComponent
          ? !Mn(l, a) || !Mn(u, i)
          : !0
    );
  }
  function Td(t, e, l, a) {
    ((t = e.state),
      typeof e.componentWillReceiveProps == 'function' && e.componentWillReceiveProps(l, a),
      typeof e.UNSAFE_componentWillReceiveProps == 'function' &&
        e.UNSAFE_componentWillReceiveProps(l, a),
      e.state !== t && Es.enqueueReplaceState(e, e.state, null));
  }
  function da(t, e) {
    var l = e;
    if ('ref' in e) {
      l = {};
      for (var a in e) a !== 'ref' && (l[a] = e[a]);
    }
    if ((t = t.defaultProps)) {
      l === e && (l = _({}, l));
      for (var u in t) l[u] === void 0 && (l[u] = t[u]);
    }
    return l;
  }
  function Nd(t) {
    Hu(t);
  }
  function Ad(t) {
    console.error(t);
  }
  function Md(t) {
    Hu(t);
  }
  function ci(t, e) {
    try {
      var l = t.onUncaughtError;
      l(e.value, { componentStack: e.stack });
    } catch (a) {
      setTimeout(function () {
        throw a;
      });
    }
  }
  function Cd(t, e, l) {
    try {
      var a = t.onCaughtError;
      a(l.value, { componentStack: l.stack, errorBoundary: e.tag === 1 ? e.stateNode : null });
    } catch (u) {
      setTimeout(function () {
        throw u;
      });
    }
  }
  function Ts(t, e, l) {
    return (
      (l = Rl(l)),
      (l.tag = 3),
      (l.payload = { element: null }),
      (l.callback = function () {
        ci(t, e);
      }),
      l
    );
  }
  function Rd(t) {
    return ((t = Rl(t)), (t.tag = 3), t);
  }
  function Dd(t, e, l, a) {
    var u = l.type.getDerivedStateFromError;
    if (typeof u == 'function') {
      var i = a.value;
      ((t.payload = function () {
        return u(i);
      }),
        (t.callback = function () {
          Cd(e, l, a);
        }));
    }
    var f = l.stateNode;
    f !== null &&
      typeof f.componentDidCatch == 'function' &&
      (t.callback = function () {
        (Cd(e, l, a),
          typeof u != 'function' && (Ul === null ? (Ul = new Set([this])) : Ul.add(this)));
        var h = a.stack;
        this.componentDidCatch(a.value, { componentStack: h !== null ? h : '' });
      });
  }
  function d0(t, e, l, a, u) {
    if (((l.flags |= 32768), a !== null && typeof a == 'object' && typeof a.then == 'function')) {
      if (((e = l.alternate), e !== null && Ua(e, l, u, !0), (l = be.current), l !== null)) {
        switch (l.tag) {
          case 31:
          case 13:
            return (
              ke === null ? _i() : l.alternate === null && qt === 0 && (qt = 3),
              (l.flags &= -257),
              (l.flags |= 65536),
              (l.lanes = u),
              a === $u
                ? (l.flags |= 16384)
                : ((e = l.updateQueue),
                  e === null ? (l.updateQueue = new Set([a])) : e.add(a),
                  Js(t, a, u)),
              !1
            );
          case 22:
            return (
              (l.flags |= 65536),
              a === $u
                ? (l.flags |= 16384)
                : ((e = l.updateQueue),
                  e === null
                    ? ((e = { transitions: null, markerInstances: null, retryQueue: new Set([a]) }),
                      (l.updateQueue = e))
                    : ((l = e.retryQueue), l === null ? (e.retryQueue = new Set([a])) : l.add(a)),
                  Js(t, a, u)),
              !1
            );
        }
        throw Error(s(435, l.tag));
      }
      return (Js(t, a, u), _i(), !1);
    }
    if (yt)
      return (
        (e = be.current),
        e !== null
          ? ((e.flags & 65536) === 0 && (e.flags |= 256),
            (e.flags |= 65536),
            (e.lanes = u),
            a !== Xc && ((t = Error(s(422), { cause: a })), Dn(De(t, l))))
          : (a !== Xc && ((e = Error(s(423), { cause: a })), Dn(De(e, l))),
            (t = t.current.alternate),
            (t.flags |= 65536),
            (u &= -u),
            (t.lanes |= u),
            (a = De(a, l)),
            (u = Ts(t.stateNode, a, u)),
            ts(t, u),
            qt !== 4 && (qt = 2)),
        !1
      );
    var i = Error(s(520), { cause: a });
    if (((i = De(i, l)), Jn === null ? (Jn = [i]) : Jn.push(i), qt !== 4 && (qt = 2), e === null))
      return !0;
    ((a = De(a, l)), (l = e));
    do {
      switch (l.tag) {
        case 3:
          return (
            (l.flags |= 65536),
            (t = u & -u),
            (l.lanes |= t),
            (t = Ts(l.stateNode, a, t)),
            ts(l, t),
            !1
          );
        case 1:
          if (
            ((e = l.type),
            (i = l.stateNode),
            (l.flags & 128) === 0 &&
              (typeof e.getDerivedStateFromError == 'function' ||
                (i !== null &&
                  typeof i.componentDidCatch == 'function' &&
                  (Ul === null || !Ul.has(i)))))
          )
            return (
              (l.flags |= 65536),
              (u &= -u),
              (l.lanes |= u),
              (u = Rd(u)),
              Dd(u, t, l, a),
              ts(l, u),
              !1
            );
      }
      l = l.return;
    } while (l !== null);
    return !1;
  }
  var Ns = Error(s(461)),
    Zt = !1;
  function ee(t, e, l, a) {
    e.child = t === null ? kf(e, null, l, a) : ra(e, t.child, l, a);
  }
  function Od(t, e, l, a, u) {
    l = l.render;
    var i = e.ref;
    if ('ref' in a) {
      var f = {};
      for (var h in a) h !== 'ref' && (f[h] = a[h]);
    } else f = a;
    return (
      ia(e),
      (a = is(t, e, l, f, i, u)),
      (h = cs()),
      t !== null && !Zt
        ? (ss(t, e, u), ul(t, e, u))
        : (yt && h && Gc(e), (e.flags |= 1), ee(t, e, a, u), e.child)
    );
  }
  function zd(t, e, l, a, u) {
    if (t === null) {
      var i = l.type;
      return typeof i == 'function' && !Hc(i) && i.defaultProps === void 0 && l.compare === null
        ? ((e.tag = 15), (e.type = i), jd(t, e, i, a, u))
        : ((t = Yu(l.type, null, a, e, e.mode, u)), (t.ref = e.ref), (t.return = e), (e.child = t));
    }
    if (((i = t.child), !js(t, u))) {
      var f = i.memoizedProps;
      if (((l = l.compare), (l = l !== null ? l : Mn), l(f, a) && t.ref === e.ref))
        return ul(t, e, u);
    }
    return ((e.flags |= 1), (t = Pe(i, a)), (t.ref = e.ref), (t.return = e), (e.child = t));
  }
  function jd(t, e, l, a, u) {
    if (t !== null) {
      var i = t.memoizedProps;
      if (Mn(i, a) && t.ref === e.ref)
        if (((Zt = !1), (e.pendingProps = a = i), js(t, u))) (t.flags & 131072) !== 0 && (Zt = !0);
        else return ((e.lanes = t.lanes), ul(t, e, u));
    }
    return As(t, e, l, a, u);
  }
  function kd(t, e, l, a) {
    var u = a.children,
      i = t !== null ? t.memoizedState : null;
    if (
      (t === null &&
        e.stateNode === null &&
        (e.stateNode = {
          _visibility: 1,
          _pendingMarkers: null,
          _retryCache: null,
          _transitions: null,
        }),
      a.mode === 'hidden')
    ) {
      if ((e.flags & 128) !== 0) {
        if (((i = i !== null ? i.baseLanes | l : l), t !== null)) {
          for (a = e.child = t.child, u = 0; a !== null; )
            ((u = u | a.lanes | a.childLanes), (a = a.sibling));
          a = u & ~i;
        } else ((a = 0), (e.child = null));
        return wd(t, e, i, l, a);
      }
      if ((l & 536870912) !== 0)
        ((e.memoizedState = { baseLanes: 0, cachePool: null }),
          t !== null && Zu(e, i !== null ? i.cachePool : null),
          i !== null ? Bf(e, i) : ls(),
          Hf(e));
      else return ((a = e.lanes = 536870912), wd(t, e, i !== null ? i.baseLanes | l : l, l, a));
    } else
      i !== null
        ? (Zu(e, i.cachePool), Bf(e, i), zl(), (e.memoizedState = null))
        : (t !== null && Zu(e, null), ls(), zl());
    return (ee(t, e, u, l), e.child);
  }
  function Yn(t, e) {
    return (
      (t !== null && t.tag === 22) ||
        e.stateNode !== null ||
        (e.stateNode = {
          _visibility: 1,
          _pendingMarkers: null,
          _retryCache: null,
          _transitions: null,
        }),
      e.sibling
    );
  }
  function wd(t, e, l, a, u) {
    var i = Wc();
    return (
      (i = i === null ? null : { parent: Qt._currentValue, pool: i }),
      (e.memoizedState = { baseLanes: l, cachePool: i }),
      t !== null && Zu(e, null),
      ls(),
      Hf(e),
      t !== null && Ua(t, e, a, !0),
      (e.childLanes = u),
      null
    );
  }
  function si(t, e) {
    return (
      (e = ri({ mode: e.mode, children: e.children }, t.mode)),
      (e.ref = t.ref),
      (t.child = e),
      (e.return = t),
      e
    );
  }
  function Ud(t, e, l) {
    return (
      ra(e, t.child, null, l),
      (t = si(e, e.pendingProps)),
      (t.flags |= 2),
      Se(e),
      (e.memoizedState = null),
      t
    );
  }
  function m0(t, e, l) {
    var a = e.pendingProps,
      u = (e.flags & 128) !== 0;
    if (((e.flags &= -129), t === null)) {
      if (yt) {
        if (a.mode === 'hidden') return ((t = si(e, a)), (e.lanes = 536870912), Yn(null, t));
        if (
          (ns(e),
          (t = Ot)
            ? ((t = $m(t, je)),
              (t = t !== null && t.data === '&' ? t : null),
              t !== null &&
                ((e.memoizedState = {
                  dehydrated: t,
                  treeContext: Tl !== null ? { id: Qe, overflow: Ve } : null,
                  retryLane: 536870912,
                  hydrationErrors: null,
                }),
                (l = _f(t)),
                (l.return = e),
                (e.child = l),
                (Pt = e),
                (Ot = null)))
            : (t = null),
          t === null)
        )
          throw Al(e);
        return ((e.lanes = 536870912), null);
      }
      return si(e, a);
    }
    var i = t.memoizedState;
    if (i !== null) {
      var f = i.dehydrated;
      if ((ns(e), u))
        if (e.flags & 256) ((e.flags &= -257), (e = Ud(t, e, l)));
        else if (e.memoizedState !== null) ((e.child = t.child), (e.flags |= 128), (e = null));
        else throw Error(s(558));
      else if ((Zt || Ua(t, e, l, !1), (u = (l & t.childLanes) !== 0), Zt || u)) {
        if (((a = Rt), a !== null && ((f = Nr(a, l)), f !== 0 && f !== i.retryLane)))
          throw ((i.retryLane = f), la(t, f), me(a, t, f), Ns);
        (_i(), (e = Ud(t, e, l)));
      } else
        ((t = i.treeContext),
          (Ot = we(f.nextSibling)),
          (Pt = e),
          (yt = !0),
          (Nl = null),
          (je = !1),
          t !== null && xf(e, t),
          (e = si(e, a)),
          (e.flags |= 4096));
      return e;
    }
    return (
      (t = Pe(t.child, { mode: a.mode, children: a.children })),
      (t.ref = e.ref),
      (e.child = t),
      (t.return = e),
      t
    );
  }
  function oi(t, e) {
    var l = e.ref;
    if (l === null) t !== null && t.ref !== null && (e.flags |= 4194816);
    else {
      if (typeof l != 'function' && typeof l != 'object') throw Error(s(284));
      (t === null || t.ref !== l) && (e.flags |= 4194816);
    }
  }
  function As(t, e, l, a, u) {
    return (
      ia(e),
      (l = is(t, e, l, a, void 0, u)),
      (a = cs()),
      t !== null && !Zt
        ? (ss(t, e, u), ul(t, e, u))
        : (yt && a && Gc(e), (e.flags |= 1), ee(t, e, l, u), e.child)
    );
  }
  function Bd(t, e, l, a, u, i) {
    return (
      ia(e),
      (e.updateQueue = null),
      (l = qf(e, a, l, u)),
      Lf(t),
      (a = cs()),
      t !== null && !Zt
        ? (ss(t, e, i), ul(t, e, i))
        : (yt && a && Gc(e), (e.flags |= 1), ee(t, e, l, i), e.child)
    );
  }
  function Hd(t, e, l, a, u) {
    if ((ia(e), e.stateNode === null)) {
      var i = za,
        f = l.contextType;
      (typeof f == 'object' && f !== null && (i = te(f)),
        (i = new l(a, i)),
        (e.memoizedState = i.state !== null && i.state !== void 0 ? i.state : null),
        (i.updater = Es),
        (e.stateNode = i),
        (i._reactInternals = e),
        (i = e.stateNode),
        (i.props = a),
        (i.state = e.memoizedState),
        (i.refs = {}),
        Ic(e),
        (f = l.contextType),
        (i.context = typeof f == 'object' && f !== null ? te(f) : za),
        (i.state = e.memoizedState),
        (f = l.getDerivedStateFromProps),
        typeof f == 'function' && (xs(e, l, f, a), (i.state = e.memoizedState)),
        typeof l.getDerivedStateFromProps == 'function' ||
          typeof i.getSnapshotBeforeUpdate == 'function' ||
          (typeof i.UNSAFE_componentWillMount != 'function' &&
            typeof i.componentWillMount != 'function') ||
          ((f = i.state),
          typeof i.componentWillMount == 'function' && i.componentWillMount(),
          typeof i.UNSAFE_componentWillMount == 'function' && i.UNSAFE_componentWillMount(),
          f !== i.state && Es.enqueueReplaceState(i, i.state, null),
          Bn(e, a, i, u),
          Un(),
          (i.state = e.memoizedState)),
        typeof i.componentDidMount == 'function' && (e.flags |= 4194308),
        (a = !0));
    } else if (t === null) {
      i = e.stateNode;
      var h = e.memoizedProps,
        b = da(l, h);
      i.props = b;
      var C = i.context,
        k = l.contextType;
      ((f = za), typeof k == 'object' && k !== null && (f = te(k)));
      var G = l.getDerivedStateFromProps;
      ((k = typeof G == 'function' || typeof i.getSnapshotBeforeUpdate == 'function'),
        (h = e.pendingProps !== h),
        k ||
          (typeof i.UNSAFE_componentWillReceiveProps != 'function' &&
            typeof i.componentWillReceiveProps != 'function') ||
          ((h || C !== f) && Td(e, i, a, f)),
        (Cl = !1));
      var D = e.memoizedState;
      ((i.state = D),
        Bn(e, a, i, u),
        Un(),
        (C = e.memoizedState),
        h || D !== C || Cl
          ? (typeof G == 'function' && (xs(e, l, G, a), (C = e.memoizedState)),
            (b = Cl || Ed(e, l, b, a, D, C, f))
              ? (k ||
                  (typeof i.UNSAFE_componentWillMount != 'function' &&
                    typeof i.componentWillMount != 'function') ||
                  (typeof i.componentWillMount == 'function' && i.componentWillMount(),
                  typeof i.UNSAFE_componentWillMount == 'function' &&
                    i.UNSAFE_componentWillMount()),
                typeof i.componentDidMount == 'function' && (e.flags |= 4194308))
              : (typeof i.componentDidMount == 'function' && (e.flags |= 4194308),
                (e.memoizedProps = a),
                (e.memoizedState = C)),
            (i.props = a),
            (i.state = C),
            (i.context = f),
            (a = b))
          : (typeof i.componentDidMount == 'function' && (e.flags |= 4194308), (a = !1)));
    } else {
      ((i = e.stateNode),
        Pc(t, e),
        (f = e.memoizedProps),
        (k = da(l, f)),
        (i.props = k),
        (G = e.pendingProps),
        (D = i.context),
        (C = l.contextType),
        (b = za),
        typeof C == 'object' && C !== null && (b = te(C)),
        (h = l.getDerivedStateFromProps),
        (C = typeof h == 'function' || typeof i.getSnapshotBeforeUpdate == 'function') ||
          (typeof i.UNSAFE_componentWillReceiveProps != 'function' &&
            typeof i.componentWillReceiveProps != 'function') ||
          ((f !== G || D !== b) && Td(e, i, a, b)),
        (Cl = !1),
        (D = e.memoizedState),
        (i.state = D),
        Bn(e, a, i, u),
        Un());
      var O = e.memoizedState;
      f !== G || D !== O || Cl || (t !== null && t.dependencies !== null && Qu(t.dependencies))
        ? (typeof h == 'function' && (xs(e, l, h, a), (O = e.memoizedState)),
          (k =
            Cl ||
            Ed(e, l, k, a, D, O, b) ||
            (t !== null && t.dependencies !== null && Qu(t.dependencies)))
            ? (C ||
                (typeof i.UNSAFE_componentWillUpdate != 'function' &&
                  typeof i.componentWillUpdate != 'function') ||
                (typeof i.componentWillUpdate == 'function' && i.componentWillUpdate(a, O, b),
                typeof i.UNSAFE_componentWillUpdate == 'function' &&
                  i.UNSAFE_componentWillUpdate(a, O, b)),
              typeof i.componentDidUpdate == 'function' && (e.flags |= 4),
              typeof i.getSnapshotBeforeUpdate == 'function' && (e.flags |= 1024))
            : (typeof i.componentDidUpdate != 'function' ||
                (f === t.memoizedProps && D === t.memoizedState) ||
                (e.flags |= 4),
              typeof i.getSnapshotBeforeUpdate != 'function' ||
                (f === t.memoizedProps && D === t.memoizedState) ||
                (e.flags |= 1024),
              (e.memoizedProps = a),
              (e.memoizedState = O)),
          (i.props = a),
          (i.state = O),
          (i.context = b),
          (a = k))
        : (typeof i.componentDidUpdate != 'function' ||
            (f === t.memoizedProps && D === t.memoizedState) ||
            (e.flags |= 4),
          typeof i.getSnapshotBeforeUpdate != 'function' ||
            (f === t.memoizedProps && D === t.memoizedState) ||
            (e.flags |= 1024),
          (a = !1));
    }
    return (
      (i = a),
      oi(t, e),
      (a = (e.flags & 128) !== 0),
      i || a
        ? ((i = e.stateNode),
          (l = a && typeof l.getDerivedStateFromError != 'function' ? null : i.render()),
          (e.flags |= 1),
          t !== null && a
            ? ((e.child = ra(e, t.child, null, u)), (e.child = ra(e, null, l, u)))
            : ee(t, e, l, u),
          (e.memoizedState = i.state),
          (t = e.child))
        : (t = ul(t, e, u)),
      t
    );
  }
  function Ld(t, e, l, a) {
    return (na(), (e.flags |= 256), ee(t, e, l, a), e.child);
  }
  var Ms = { dehydrated: null, treeContext: null, retryLane: 0, hydrationErrors: null };
  function Cs(t) {
    return { baseLanes: t, cachePool: Cf() };
  }
  function Rs(t, e, l) {
    return ((t = t !== null ? t.childLanes & ~l : 0), e && (t |= Ee), t);
  }
  function qd(t, e, l) {
    var a = e.pendingProps,
      u = !1,
      i = (e.flags & 128) !== 0,
      f;
    if (
      ((f = i) || (f = t !== null && t.memoizedState === null ? !1 : (Yt.current & 2) !== 0),
      f && ((u = !0), (e.flags &= -129)),
      (f = (e.flags & 32) !== 0),
      (e.flags &= -33),
      t === null)
    ) {
      if (yt) {
        if (
          (u ? Ol(e) : zl(),
          (t = Ot)
            ? ((t = $m(t, je)),
              (t = t !== null && t.data !== '&' ? t : null),
              t !== null &&
                ((e.memoizedState = {
                  dehydrated: t,
                  treeContext: Tl !== null ? { id: Qe, overflow: Ve } : null,
                  retryLane: 536870912,
                  hydrationErrors: null,
                }),
                (l = _f(t)),
                (l.return = e),
                (e.child = l),
                (Pt = e),
                (Ot = null)))
            : (t = null),
          t === null)
        )
          throw Al(e);
        return (fo(t) ? (e.lanes = 32) : (e.lanes = 536870912), null);
      }
      var h = a.children;
      return (
        (a = a.fallback),
        u
          ? (zl(),
            (u = e.mode),
            (h = ri({ mode: 'hidden', children: h }, u)),
            (a = aa(a, u, l, null)),
            (h.return = e),
            (a.return = e),
            (h.sibling = a),
            (e.child = h),
            (a = e.child),
            (a.memoizedState = Cs(l)),
            (a.childLanes = Rs(t, f, l)),
            (e.memoizedState = Ms),
            Yn(null, a))
          : (Ol(e), Ds(e, h))
      );
    }
    var b = t.memoizedState;
    if (b !== null && ((h = b.dehydrated), h !== null)) {
      if (i)
        e.flags & 256
          ? (Ol(e), (e.flags &= -257), (e = Os(t, e, l)))
          : e.memoizedState !== null
            ? (zl(), (e.child = t.child), (e.flags |= 128), (e = null))
            : (zl(),
              (h = a.fallback),
              (u = e.mode),
              (a = ri({ mode: 'visible', children: a.children }, u)),
              (h = aa(h, u, l, null)),
              (h.flags |= 2),
              (a.return = e),
              (h.return = e),
              (a.sibling = h),
              (e.child = a),
              ra(e, t.child, null, l),
              (a = e.child),
              (a.memoizedState = Cs(l)),
              (a.childLanes = Rs(t, f, l)),
              (e.memoizedState = Ms),
              (e = Yn(null, a)));
      else if ((Ol(e), fo(h))) {
        if (((f = h.nextSibling && h.nextSibling.dataset), f)) var C = f.dgst;
        ((f = C),
          (a = Error(s(419))),
          (a.stack = ''),
          (a.digest = f),
          Dn({ value: a, source: null, stack: null }),
          (e = Os(t, e, l)));
      } else if ((Zt || Ua(t, e, l, !1), (f = (l & t.childLanes) !== 0), Zt || f)) {
        if (((f = Rt), f !== null && ((a = Nr(f, l)), a !== 0 && a !== b.retryLane)))
          throw ((b.retryLane = a), la(t, a), me(f, t, a), Ns);
        (ro(h) || _i(), (e = Os(t, e, l)));
      } else
        ro(h)
          ? ((e.flags |= 192), (e.child = t.child), (e = null))
          : ((t = b.treeContext),
            (Ot = we(h.nextSibling)),
            (Pt = e),
            (yt = !0),
            (Nl = null),
            (je = !1),
            t !== null && xf(e, t),
            (e = Ds(e, a.children)),
            (e.flags |= 4096));
      return e;
    }
    return u
      ? (zl(),
        (h = a.fallback),
        (u = e.mode),
        (b = t.child),
        (C = b.sibling),
        (a = Pe(b, { mode: 'hidden', children: a.children })),
        (a.subtreeFlags = b.subtreeFlags & 65011712),
        C !== null ? (h = Pe(C, h)) : ((h = aa(h, u, l, null)), (h.flags |= 2)),
        (h.return = e),
        (a.return = e),
        (a.sibling = h),
        (e.child = a),
        Yn(null, a),
        (a = e.child),
        (h = t.child.memoizedState),
        h === null
          ? (h = Cs(l))
          : ((u = h.cachePool),
            u !== null
              ? ((b = Qt._currentValue), (u = u.parent !== b ? { parent: b, pool: b } : u))
              : (u = Cf()),
            (h = { baseLanes: h.baseLanes | l, cachePool: u })),
        (a.memoizedState = h),
        (a.childLanes = Rs(t, f, l)),
        (e.memoizedState = Ms),
        Yn(t.child, a))
      : (Ol(e),
        (l = t.child),
        (t = l.sibling),
        (l = Pe(l, { mode: 'visible', children: a.children })),
        (l.return = e),
        (l.sibling = null),
        t !== null &&
          ((f = e.deletions), f === null ? ((e.deletions = [t]), (e.flags |= 16)) : f.push(t)),
        (e.child = l),
        (e.memoizedState = null),
        l);
  }
  function Ds(t, e) {
    return ((e = ri({ mode: 'visible', children: e }, t.mode)), (e.return = t), (t.child = e));
  }
  function ri(t, e) {
    return ((t = _e(22, t, null, e)), (t.lanes = 0), t);
  }
  function Os(t, e, l) {
    return (
      ra(e, t.child, null, l),
      (t = Ds(e, e.pendingProps.children)),
      (t.flags |= 2),
      (e.memoizedState = null),
      t
    );
  }
  function Gd(t, e, l) {
    t.lanes |= e;
    var a = t.alternate;
    (a !== null && (a.lanes |= e), Zc(t.return, e, l));
  }
  function zs(t, e, l, a, u, i) {
    var f = t.memoizedState;
    f === null
      ? (t.memoizedState = {
          isBackwards: e,
          rendering: null,
          renderingStartTime: 0,
          last: a,
          tail: l,
          tailMode: u,
          treeForkCount: i,
        })
      : ((f.isBackwards = e),
        (f.rendering = null),
        (f.renderingStartTime = 0),
        (f.last = a),
        (f.tail = l),
        (f.tailMode = u),
        (f.treeForkCount = i));
  }
  function Yd(t, e, l) {
    var a = e.pendingProps,
      u = a.revealOrder,
      i = a.tail;
    a = a.children;
    var f = Yt.current,
      h = (f & 2) !== 0;
    if (
      (h ? ((f = (f & 1) | 2), (e.flags |= 128)) : (f &= 1),
      K(Yt, f),
      ee(t, e, a, l),
      (a = yt ? Rn : 0),
      !h && t !== null && (t.flags & 128) !== 0)
    )
      t: for (t = e.child; t !== null; ) {
        if (t.tag === 13) t.memoizedState !== null && Gd(t, l, e);
        else if (t.tag === 19) Gd(t, l, e);
        else if (t.child !== null) {
          ((t.child.return = t), (t = t.child));
          continue;
        }
        if (t === e) break t;
        for (; t.sibling === null; ) {
          if (t.return === null || t.return === e) break t;
          t = t.return;
        }
        ((t.sibling.return = t.return), (t = t.sibling));
      }
    switch (u) {
      case 'forwards':
        for (l = e.child, u = null; l !== null; )
          ((t = l.alternate), t !== null && Iu(t) === null && (u = l), (l = l.sibling));
        ((l = u),
          l === null ? ((u = e.child), (e.child = null)) : ((u = l.sibling), (l.sibling = null)),
          zs(e, !1, u, l, i, a));
        break;
      case 'backwards':
      case 'unstable_legacy-backwards':
        for (l = null, u = e.child, e.child = null; u !== null; ) {
          if (((t = u.alternate), t !== null && Iu(t) === null)) {
            e.child = u;
            break;
          }
          ((t = u.sibling), (u.sibling = l), (l = u), (u = t));
        }
        zs(e, !0, l, null, i, a);
        break;
      case 'together':
        zs(e, !1, null, null, void 0, a);
        break;
      default:
        e.memoizedState = null;
    }
    return e.child;
  }
  function ul(t, e, l) {
    if (
      (t !== null && (e.dependencies = t.dependencies), (wl |= e.lanes), (l & e.childLanes) === 0)
    )
      if (t !== null) {
        if ((Ua(t, e, l, !1), (l & e.childLanes) === 0)) return null;
      } else return null;
    if (t !== null && e.child !== t.child) throw Error(s(153));
    if (e.child !== null) {
      for (t = e.child, l = Pe(t, t.pendingProps), e.child = l, l.return = e; t.sibling !== null; )
        ((t = t.sibling), (l = l.sibling = Pe(t, t.pendingProps)), (l.return = e));
      l.sibling = null;
    }
    return e.child;
  }
  function js(t, e) {
    return (t.lanes & e) !== 0 ? !0 : ((t = t.dependencies), !!(t !== null && Qu(t)));
  }
  function h0(t, e, l) {
    switch (e.tag) {
      case 3:
        (ne(e, e.stateNode.containerInfo), Ml(e, Qt, t.memoizedState.cache), na());
        break;
      case 27:
      case 5:
        hn(e);
        break;
      case 4:
        ne(e, e.stateNode.containerInfo);
        break;
      case 10:
        Ml(e, e.type, e.memoizedProps.value);
        break;
      case 31:
        if (e.memoizedState !== null) return ((e.flags |= 128), ns(e), null);
        break;
      case 13:
        var a = e.memoizedState;
        if (a !== null)
          return a.dehydrated !== null
            ? (Ol(e), (e.flags |= 128), null)
            : (l & e.child.childLanes) !== 0
              ? qd(t, e, l)
              : (Ol(e), (t = ul(t, e, l)), t !== null ? t.sibling : null);
        Ol(e);
        break;
      case 19:
        var u = (t.flags & 128) !== 0;
        if (
          ((a = (l & e.childLanes) !== 0),
          a || (Ua(t, e, l, !1), (a = (l & e.childLanes) !== 0)),
          u)
        ) {
          if (a) return Yd(t, e, l);
          e.flags |= 128;
        }
        if (
          ((u = e.memoizedState),
          u !== null && ((u.rendering = null), (u.tail = null), (u.lastEffect = null)),
          K(Yt, Yt.current),
          a)
        )
          break;
        return null;
      case 22:
        return ((e.lanes = 0), kd(t, e, l, e.pendingProps));
      case 24:
        Ml(e, Qt, t.memoizedState.cache);
    }
    return ul(t, e, l);
  }
  function Xd(t, e, l) {
    if (t !== null)
      if (t.memoizedProps !== e.pendingProps) Zt = !0;
      else {
        if (!js(t, l) && (e.flags & 128) === 0) return ((Zt = !1), h0(t, e, l));
        Zt = (t.flags & 131072) !== 0;
      }
    else ((Zt = !1), yt && (e.flags & 1048576) !== 0 && Sf(e, Rn, e.index));
    switch (((e.lanes = 0), e.tag)) {
      case 16:
        t: {
          var a = e.pendingProps;
          if (((t = sa(e.elementType)), (e.type = t), typeof t == 'function'))
            Hc(t)
              ? ((a = da(t, a)), (e.tag = 1), (e = Hd(null, e, t, a, l)))
              : ((e.tag = 0), (e = As(null, e, t, a, l)));
          else {
            if (t != null) {
              var u = t.$$typeof;
              if (u === X) {
                ((e.tag = 11), (e = Od(null, e, t, a, l)));
                break t;
              } else if (u === V) {
                ((e.tag = 14), (e = zd(null, e, t, a, l)));
                break t;
              }
            }
            throw ((e = ie(t) || t), Error(s(306, e, '')));
          }
        }
        return e;
      case 0:
        return As(t, e, e.type, e.pendingProps, l);
      case 1:
        return ((a = e.type), (u = da(a, e.pendingProps)), Hd(t, e, a, u, l));
      case 3:
        t: {
          if ((ne(e, e.stateNode.containerInfo), t === null)) throw Error(s(387));
          a = e.pendingProps;
          var i = e.memoizedState;
          ((u = i.element), Pc(t, e), Bn(e, a, null, l));
          var f = e.memoizedState;
          if (
            ((a = f.cache),
            Ml(e, Qt, a),
            a !== i.cache && Kc(e, [Qt], l, !0),
            Un(),
            (a = f.element),
            i.isDehydrated)
          )
            if (
              ((i = { element: a, isDehydrated: !1, cache: f.cache }),
              (e.updateQueue.baseState = i),
              (e.memoizedState = i),
              e.flags & 256)
            ) {
              e = Ld(t, e, a, l);
              break t;
            } else if (a !== u) {
              ((u = De(Error(s(424)), e)), Dn(u), (e = Ld(t, e, a, l)));
              break t;
            } else {
              switch (((t = e.stateNode.containerInfo), t.nodeType)) {
                case 9:
                  t = t.body;
                  break;
                default:
                  t = t.nodeName === 'HTML' ? t.ownerDocument.body : t;
              }
              for (
                Ot = we(t.firstChild),
                  Pt = e,
                  yt = !0,
                  Nl = null,
                  je = !0,
                  l = kf(e, null, a, l),
                  e.child = l;
                l;
              )
                ((l.flags = (l.flags & -3) | 4096), (l = l.sibling));
            }
          else {
            if ((na(), a === u)) {
              e = ul(t, e, l);
              break t;
            }
            ee(t, e, a, l);
          }
          e = e.child;
        }
        return e;
      case 26:
        return (
          oi(t, e),
          t === null
            ? (l = th(e.type, null, e.pendingProps, null))
              ? (e.memoizedState = l)
              : yt ||
                ((l = e.type),
                (t = e.pendingProps),
                (a = Ai(ot.current).createElement(l)),
                (a[It] = e),
                (a[ce] = t),
                le(a, l, t),
                Wt(a),
                (e.stateNode = a))
            : (e.memoizedState = th(e.type, t.memoizedProps, e.pendingProps, t.memoizedState)),
          null
        );
      case 27:
        return (
          hn(e),
          t === null &&
            yt &&
            ((a = e.stateNode = Fm(e.type, e.pendingProps, ot.current)),
            (Pt = e),
            (je = !0),
            (u = Ot),
            ql(e.type) ? ((mo = u), (Ot = we(a.firstChild))) : (Ot = u)),
          ee(t, e, e.pendingProps.children, l),
          oi(t, e),
          t === null && (e.flags |= 4194304),
          e.child
        );
      case 5:
        return (
          t === null &&
            yt &&
            ((u = a = Ot) &&
              ((a = Q0(a, e.type, e.pendingProps, je)),
              a !== null
                ? ((e.stateNode = a), (Pt = e), (Ot = we(a.firstChild)), (je = !1), (u = !0))
                : (u = !1)),
            u || Al(e)),
          hn(e),
          (u = e.type),
          (i = e.pendingProps),
          (f = t !== null ? t.memoizedProps : null),
          (a = i.children),
          co(u, i) ? (a = null) : f !== null && co(u, f) && (e.flags |= 32),
          e.memoizedState !== null && ((u = is(t, e, u0, null, null, l)), (au._currentValue = u)),
          oi(t, e),
          ee(t, e, a, l),
          e.child
        );
      case 6:
        return (
          t === null &&
            yt &&
            ((t = l = Ot) &&
              ((l = V0(l, e.pendingProps, je)),
              l !== null ? ((e.stateNode = l), (Pt = e), (Ot = null), (t = !0)) : (t = !1)),
            t || Al(e)),
          null
        );
      case 13:
        return qd(t, e, l);
      case 4:
        return (
          ne(e, e.stateNode.containerInfo),
          (a = e.pendingProps),
          t === null ? (e.child = ra(e, null, a, l)) : ee(t, e, a, l),
          e.child
        );
      case 11:
        return Od(t, e, e.type, e.pendingProps, l);
      case 7:
        return (ee(t, e, e.pendingProps, l), e.child);
      case 8:
        return (ee(t, e, e.pendingProps.children, l), e.child);
      case 12:
        return (ee(t, e, e.pendingProps.children, l), e.child);
      case 10:
        return ((a = e.pendingProps), Ml(e, e.type, a.value), ee(t, e, a.children, l), e.child);
      case 9:
        return (
          (u = e.type._context),
          (a = e.pendingProps.children),
          ia(e),
          (u = te(u)),
          (a = a(u)),
          (e.flags |= 1),
          ee(t, e, a, l),
          e.child
        );
      case 14:
        return zd(t, e, e.type, e.pendingProps, l);
      case 15:
        return jd(t, e, e.type, e.pendingProps, l);
      case 19:
        return Yd(t, e, l);
      case 31:
        return m0(t, e, l);
      case 22:
        return kd(t, e, l, e.pendingProps);
      case 24:
        return (
          ia(e),
          (a = te(Qt)),
          t === null
            ? ((u = Wc()),
              u === null &&
                ((u = Rt),
                (i = $c()),
                (u.pooledCache = i),
                i.refCount++,
                i !== null && (u.pooledCacheLanes |= l),
                (u = i)),
              (e.memoizedState = { parent: a, cache: u }),
              Ic(e),
              Ml(e, Qt, u))
            : ((t.lanes & l) !== 0 && (Pc(t, e), Bn(e, null, null, l), Un()),
              (u = t.memoizedState),
              (i = e.memoizedState),
              u.parent !== a
                ? ((u = { parent: a, cache: a }),
                  (e.memoizedState = u),
                  e.lanes === 0 && (e.memoizedState = e.updateQueue.baseState = u),
                  Ml(e, Qt, a))
                : ((a = i.cache), Ml(e, Qt, a), a !== u.cache && Kc(e, [Qt], l, !0))),
          ee(t, e, e.pendingProps.children, l),
          e.child
        );
      case 29:
        throw e.pendingProps;
    }
    throw Error(s(156, e.tag));
  }
  function il(t) {
    t.flags |= 4;
  }
  function ks(t, e, l, a, u) {
    if (((e = (t.mode & 32) !== 0) && (e = !1), e)) {
      if (((t.flags |= 16777216), (u & 335544128) === u))
        if (t.stateNode.complete) t.flags |= 8192;
        else if (pm()) t.flags |= 8192;
        else throw ((oa = $u), Fc);
    } else t.flags &= -16777217;
  }
  function Qd(t, e) {
    if (e.type !== 'stylesheet' || (e.state.loading & 4) !== 0) t.flags &= -16777217;
    else if (((t.flags |= 16777216), !uh(e)))
      if (pm()) t.flags |= 8192;
      else throw ((oa = $u), Fc);
  }
  function fi(t, e) {
    (e !== null && (t.flags |= 4),
      t.flags & 16384 && ((e = t.tag !== 22 ? xr() : 536870912), (t.lanes |= e), ($a |= e)));
  }
  function Xn(t, e) {
    if (!yt)
      switch (t.tailMode) {
        case 'hidden':
          e = t.tail;
          for (var l = null; e !== null; ) (e.alternate !== null && (l = e), (e = e.sibling));
          l === null ? (t.tail = null) : (l.sibling = null);
          break;
        case 'collapsed':
          l = t.tail;
          for (var a = null; l !== null; ) (l.alternate !== null && (a = l), (l = l.sibling));
          a === null
            ? e || t.tail === null
              ? (t.tail = null)
              : (t.tail.sibling = null)
            : (a.sibling = null);
      }
  }
  function zt(t) {
    var e = t.alternate !== null && t.alternate.child === t.child,
      l = 0,
      a = 0;
    if (e)
      for (var u = t.child; u !== null; )
        ((l |= u.lanes | u.childLanes),
          (a |= u.subtreeFlags & 65011712),
          (a |= u.flags & 65011712),
          (u.return = t),
          (u = u.sibling));
    else
      for (u = t.child; u !== null; )
        ((l |= u.lanes | u.childLanes),
          (a |= u.subtreeFlags),
          (a |= u.flags),
          (u.return = t),
          (u = u.sibling));
    return ((t.subtreeFlags |= a), (t.childLanes = l), e);
  }
  function y0(t, e, l) {
    var a = e.pendingProps;
    switch ((Yc(e), e.tag)) {
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return (zt(e), null);
      case 1:
        return (zt(e), null);
      case 3:
        return (
          (l = e.stateNode),
          (a = null),
          t !== null && (a = t.memoizedState.cache),
          e.memoizedState.cache !== a && (e.flags |= 2048),
          ll(Qt),
          Gt(),
          l.pendingContext && ((l.context = l.pendingContext), (l.pendingContext = null)),
          (t === null || t.child === null) &&
            (wa(e)
              ? il(e)
              : t === null ||
                (t.memoizedState.isDehydrated && (e.flags & 256) === 0) ||
                ((e.flags |= 1024), Qc())),
          zt(e),
          null
        );
      case 26:
        var u = e.type,
          i = e.memoizedState;
        return (
          t === null
            ? (il(e), i !== null ? (zt(e), Qd(e, i)) : (zt(e), ks(e, u, null, a, l)))
            : i
              ? i !== t.memoizedState
                ? (il(e), zt(e), Qd(e, i))
                : (zt(e), (e.flags &= -16777217))
              : ((t = t.memoizedProps), t !== a && il(e), zt(e), ks(e, u, t, a, l)),
          null
        );
      case 27:
        if ((xu(e), (l = ot.current), (u = e.type), t !== null && e.stateNode != null))
          t.memoizedProps !== a && il(e);
        else {
          if (!a) {
            if (e.stateNode === null) throw Error(s(166));
            return (zt(e), null);
          }
          ((t = F.current), wa(e) ? Ef(e) : ((t = Fm(u, a, l)), (e.stateNode = t), il(e)));
        }
        return (zt(e), null);
      case 5:
        if ((xu(e), (u = e.type), t !== null && e.stateNode != null))
          t.memoizedProps !== a && il(e);
        else {
          if (!a) {
            if (e.stateNode === null) throw Error(s(166));
            return (zt(e), null);
          }
          if (((i = F.current), wa(e))) Ef(e);
          else {
            var f = Ai(ot.current);
            switch (i) {
              case 1:
                i = f.createElementNS('http://www.w3.org/2000/svg', u);
                break;
              case 2:
                i = f.createElementNS('http://www.w3.org/1998/Math/MathML', u);
                break;
              default:
                switch (u) {
                  case 'svg':
                    i = f.createElementNS('http://www.w3.org/2000/svg', u);
                    break;
                  case 'math':
                    i = f.createElementNS('http://www.w3.org/1998/Math/MathML', u);
                    break;
                  case 'script':
                    ((i = f.createElement('div')),
                      (i.innerHTML = '<script><\/script>'),
                      (i = i.removeChild(i.firstChild)));
                    break;
                  case 'select':
                    ((i =
                      typeof a.is == 'string'
                        ? f.createElement('select', { is: a.is })
                        : f.createElement('select')),
                      a.multiple ? (i.multiple = !0) : a.size && (i.size = a.size));
                    break;
                  default:
                    i =
                      typeof a.is == 'string'
                        ? f.createElement(u, { is: a.is })
                        : f.createElement(u);
                }
            }
            ((i[It] = e), (i[ce] = a));
            t: for (f = e.child; f !== null; ) {
              if (f.tag === 5 || f.tag === 6) i.appendChild(f.stateNode);
              else if (f.tag !== 4 && f.tag !== 27 && f.child !== null) {
                ((f.child.return = f), (f = f.child));
                continue;
              }
              if (f === e) break t;
              for (; f.sibling === null; ) {
                if (f.return === null || f.return === e) break t;
                f = f.return;
              }
              ((f.sibling.return = f.return), (f = f.sibling));
            }
            e.stateNode = i;
            t: switch ((le(i, u, a), u)) {
              case 'button':
              case 'input':
              case 'select':
              case 'textarea':
                a = !!a.autoFocus;
                break t;
              case 'img':
                a = !0;
                break t;
              default:
                a = !1;
            }
            a && il(e);
          }
        }
        return (zt(e), ks(e, e.type, t === null ? null : t.memoizedProps, e.pendingProps, l), null);
      case 6:
        if (t && e.stateNode != null) t.memoizedProps !== a && il(e);
        else {
          if (typeof a != 'string' && e.stateNode === null) throw Error(s(166));
          if (((t = ot.current), wa(e))) {
            if (((t = e.stateNode), (l = e.memoizedProps), (a = null), (u = Pt), u !== null))
              switch (u.tag) {
                case 27:
                case 5:
                  a = u.memoizedProps;
              }
            ((t[It] = e),
              (t = !!(
                t.nodeValue === l ||
                (a !== null && a.suppressHydrationWarning === !0) ||
                qm(t.nodeValue, l)
              )),
              t || Al(e, !0));
          } else ((t = Ai(t).createTextNode(a)), (t[It] = e), (e.stateNode = t));
        }
        return (zt(e), null);
      case 31:
        if (((l = e.memoizedState), t === null || t.memoizedState !== null)) {
          if (((a = wa(e)), l !== null)) {
            if (t === null) {
              if (!a) throw Error(s(318));
              if (((t = e.memoizedState), (t = t !== null ? t.dehydrated : null), !t))
                throw Error(s(557));
              t[It] = e;
            } else (na(), (e.flags & 128) === 0 && (e.memoizedState = null), (e.flags |= 4));
            (zt(e), (t = !1));
          } else
            ((l = Qc()),
              t !== null && t.memoizedState !== null && (t.memoizedState.hydrationErrors = l),
              (t = !0));
          if (!t) return e.flags & 256 ? (Se(e), e) : (Se(e), null);
          if ((e.flags & 128) !== 0) throw Error(s(558));
        }
        return (zt(e), null);
      case 13:
        if (
          ((a = e.memoizedState),
          t === null || (t.memoizedState !== null && t.memoizedState.dehydrated !== null))
        ) {
          if (((u = wa(e)), a !== null && a.dehydrated !== null)) {
            if (t === null) {
              if (!u) throw Error(s(318));
              if (((u = e.memoizedState), (u = u !== null ? u.dehydrated : null), !u))
                throw Error(s(317));
              u[It] = e;
            } else (na(), (e.flags & 128) === 0 && (e.memoizedState = null), (e.flags |= 4));
            (zt(e), (u = !1));
          } else
            ((u = Qc()),
              t !== null && t.memoizedState !== null && (t.memoizedState.hydrationErrors = u),
              (u = !0));
          if (!u) return e.flags & 256 ? (Se(e), e) : (Se(e), null);
        }
        return (
          Se(e),
          (e.flags & 128) !== 0
            ? ((e.lanes = l), e)
            : ((l = a !== null),
              (t = t !== null && t.memoizedState !== null),
              l &&
                ((a = e.child),
                (u = null),
                a.alternate !== null &&
                  a.alternate.memoizedState !== null &&
                  a.alternate.memoizedState.cachePool !== null &&
                  (u = a.alternate.memoizedState.cachePool.pool),
                (i = null),
                a.memoizedState !== null &&
                  a.memoizedState.cachePool !== null &&
                  (i = a.memoizedState.cachePool.pool),
                i !== u && (a.flags |= 2048)),
              l !== t && l && (e.child.flags |= 8192),
              fi(e, e.updateQueue),
              zt(e),
              null)
        );
      case 4:
        return (Gt(), t === null && lo(e.stateNode.containerInfo), zt(e), null);
      case 10:
        return (ll(e.type), zt(e), null);
      case 19:
        if ((q(Yt), (a = e.memoizedState), a === null)) return (zt(e), null);
        if (((u = (e.flags & 128) !== 0), (i = a.rendering), i === null))
          if (u) Xn(a, !1);
          else {
            if (qt !== 0 || (t !== null && (t.flags & 128) !== 0))
              for (t = e.child; t !== null; ) {
                if (((i = Iu(t)), i !== null)) {
                  for (
                    e.flags |= 128,
                      Xn(a, !1),
                      t = i.updateQueue,
                      e.updateQueue = t,
                      fi(e, t),
                      e.subtreeFlags = 0,
                      t = l,
                      l = e.child;
                    l !== null;
                  )
                    (gf(l, t), (l = l.sibling));
                  return (K(Yt, (Yt.current & 1) | 2), yt && tl(e, a.treeForkCount), e.child);
                }
                t = t.sibling;
              }
            a.tail !== null &&
              ye() > pi &&
              ((e.flags |= 128), (u = !0), Xn(a, !1), (e.lanes = 4194304));
          }
        else {
          if (!u)
            if (((t = Iu(i)), t !== null)) {
              if (
                ((e.flags |= 128),
                (u = !0),
                (t = t.updateQueue),
                (e.updateQueue = t),
                fi(e, t),
                Xn(a, !0),
                a.tail === null && a.tailMode === 'hidden' && !i.alternate && !yt)
              )
                return (zt(e), null);
            } else
              2 * ye() - a.renderingStartTime > pi &&
                l !== 536870912 &&
                ((e.flags |= 128), (u = !0), Xn(a, !1), (e.lanes = 4194304));
          a.isBackwards
            ? ((i.sibling = e.child), (e.child = i))
            : ((t = a.last), t !== null ? (t.sibling = i) : (e.child = i), (a.last = i));
        }
        return a.tail !== null
          ? ((t = a.tail),
            (a.rendering = t),
            (a.tail = t.sibling),
            (a.renderingStartTime = ye()),
            (t.sibling = null),
            (l = Yt.current),
            K(Yt, u ? (l & 1) | 2 : l & 1),
            yt && tl(e, a.treeForkCount),
            t)
          : (zt(e), null);
      case 22:
      case 23:
        return (
          Se(e),
          as(),
          (a = e.memoizedState !== null),
          t !== null
            ? (t.memoizedState !== null) !== a && (e.flags |= 8192)
            : a && (e.flags |= 8192),
          a
            ? (l & 536870912) !== 0 &&
              (e.flags & 128) === 0 &&
              (zt(e), e.subtreeFlags & 6 && (e.flags |= 8192))
            : zt(e),
          (l = e.updateQueue),
          l !== null && fi(e, l.retryQueue),
          (l = null),
          t !== null &&
            t.memoizedState !== null &&
            t.memoizedState.cachePool !== null &&
            (l = t.memoizedState.cachePool.pool),
          (a = null),
          e.memoizedState !== null &&
            e.memoizedState.cachePool !== null &&
            (a = e.memoizedState.cachePool.pool),
          a !== l && (e.flags |= 2048),
          t !== null && q(ca),
          null
        );
      case 24:
        return (
          (l = null),
          t !== null && (l = t.memoizedState.cache),
          e.memoizedState.cache !== l && (e.flags |= 2048),
          ll(Qt),
          zt(e),
          null
        );
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(s(156, e.tag));
  }
  function p0(t, e) {
    switch ((Yc(e), e.tag)) {
      case 1:
        return ((t = e.flags), t & 65536 ? ((e.flags = (t & -65537) | 128), e) : null);
      case 3:
        return (
          ll(Qt),
          Gt(),
          (t = e.flags),
          (t & 65536) !== 0 && (t & 128) === 0 ? ((e.flags = (t & -65537) | 128), e) : null
        );
      case 26:
      case 27:
      case 5:
        return (xu(e), null);
      case 31:
        if (e.memoizedState !== null) {
          if ((Se(e), e.alternate === null)) throw Error(s(340));
          na();
        }
        return ((t = e.flags), t & 65536 ? ((e.flags = (t & -65537) | 128), e) : null);
      case 13:
        if ((Se(e), (t = e.memoizedState), t !== null && t.dehydrated !== null)) {
          if (e.alternate === null) throw Error(s(340));
          na();
        }
        return ((t = e.flags), t & 65536 ? ((e.flags = (t & -65537) | 128), e) : null);
      case 19:
        return (q(Yt), null);
      case 4:
        return (Gt(), null);
      case 10:
        return (ll(e.type), null);
      case 22:
      case 23:
        return (
          Se(e),
          as(),
          t !== null && q(ca),
          (t = e.flags),
          t & 65536 ? ((e.flags = (t & -65537) | 128), e) : null
        );
      case 24:
        return (ll(Qt), null);
      case 25:
        return null;
      default:
        return null;
    }
  }
  function Vd(t, e) {
    switch ((Yc(e), e.tag)) {
      case 3:
        (ll(Qt), Gt());
        break;
      case 26:
      case 27:
      case 5:
        xu(e);
        break;
      case 4:
        Gt();
        break;
      case 31:
        e.memoizedState !== null && Se(e);
        break;
      case 13:
        Se(e);
        break;
      case 19:
        q(Yt);
        break;
      case 10:
        ll(e.type);
        break;
      case 22:
      case 23:
        (Se(e), as(), t !== null && q(ca));
        break;
      case 24:
        ll(Qt);
    }
  }
  function Qn(t, e) {
    try {
      var l = e.updateQueue,
        a = l !== null ? l.lastEffect : null;
      if (a !== null) {
        var u = a.next;
        l = u;
        do {
          if ((l.tag & t) === t) {
            a = void 0;
            var i = l.create,
              f = l.inst;
            ((a = i()), (f.destroy = a));
          }
          l = l.next;
        } while (l !== u);
      }
    } catch (h) {
      Tt(e, e.return, h);
    }
  }
  function jl(t, e, l) {
    try {
      var a = e.updateQueue,
        u = a !== null ? a.lastEffect : null;
      if (u !== null) {
        var i = u.next;
        a = i;
        do {
          if ((a.tag & t) === t) {
            var f = a.inst,
              h = f.destroy;
            if (h !== void 0) {
              ((f.destroy = void 0), (u = e));
              var b = l,
                C = h;
              try {
                C();
              } catch (k) {
                Tt(u, b, k);
              }
            }
          }
          a = a.next;
        } while (a !== i);
      }
    } catch (k) {
      Tt(e, e.return, k);
    }
  }
  function Zd(t) {
    var e = t.updateQueue;
    if (e !== null) {
      var l = t.stateNode;
      try {
        Uf(e, l);
      } catch (a) {
        Tt(t, t.return, a);
      }
    }
  }
  function Kd(t, e, l) {
    ((l.props = da(t.type, t.memoizedProps)), (l.state = t.memoizedState));
    try {
      l.componentWillUnmount();
    } catch (a) {
      Tt(t, e, a);
    }
  }
  function Vn(t, e) {
    try {
      var l = t.ref;
      if (l !== null) {
        switch (t.tag) {
          case 26:
          case 27:
          case 5:
            var a = t.stateNode;
            break;
          case 30:
            a = t.stateNode;
            break;
          default:
            a = t.stateNode;
        }
        typeof l == 'function' ? (t.refCleanup = l(a)) : (l.current = a);
      }
    } catch (u) {
      Tt(t, e, u);
    }
  }
  function Ze(t, e) {
    var l = t.ref,
      a = t.refCleanup;
    if (l !== null)
      if (typeof a == 'function')
        try {
          a();
        } catch (u) {
          Tt(t, e, u);
        } finally {
          ((t.refCleanup = null), (t = t.alternate), t != null && (t.refCleanup = null));
        }
      else if (typeof l == 'function')
        try {
          l(null);
        } catch (u) {
          Tt(t, e, u);
        }
      else l.current = null;
  }
  function $d(t) {
    var e = t.type,
      l = t.memoizedProps,
      a = t.stateNode;
    try {
      t: switch (e) {
        case 'button':
        case 'input':
        case 'select':
        case 'textarea':
          l.autoFocus && a.focus();
          break t;
        case 'img':
          l.src ? (a.src = l.src) : l.srcSet && (a.srcset = l.srcSet);
      }
    } catch (u) {
      Tt(t, t.return, u);
    }
  }
  function ws(t, e, l) {
    try {
      var a = t.stateNode;
      (H0(a, t.type, l, e), (a[ce] = e));
    } catch (u) {
      Tt(t, t.return, u);
    }
  }
  function Jd(t) {
    return (
      t.tag === 5 || t.tag === 3 || t.tag === 26 || (t.tag === 27 && ql(t.type)) || t.tag === 4
    );
  }
  function Us(t) {
    t: for (;;) {
      for (; t.sibling === null; ) {
        if (t.return === null || Jd(t.return)) return null;
        t = t.return;
      }
      for (
        t.sibling.return = t.return, t = t.sibling;
        t.tag !== 5 && t.tag !== 6 && t.tag !== 18;
      ) {
        if ((t.tag === 27 && ql(t.type)) || t.flags & 2 || t.child === null || t.tag === 4)
          continue t;
        ((t.child.return = t), (t = t.child));
      }
      if (!(t.flags & 2)) return t.stateNode;
    }
  }
  function Bs(t, e, l) {
    var a = t.tag;
    if (a === 5 || a === 6)
      ((t = t.stateNode),
        e
          ? (l.nodeType === 9
              ? l.body
              : l.nodeName === 'HTML'
                ? l.ownerDocument.body
                : l
            ).insertBefore(t, e)
          : ((e = l.nodeType === 9 ? l.body : l.nodeName === 'HTML' ? l.ownerDocument.body : l),
            e.appendChild(t),
            (l = l._reactRootContainer),
            l != null || e.onclick !== null || (e.onclick = Fe)));
    else if (
      a !== 4 &&
      (a === 27 && ql(t.type) && ((l = t.stateNode), (e = null)), (t = t.child), t !== null)
    )
      for (Bs(t, e, l), t = t.sibling; t !== null; ) (Bs(t, e, l), (t = t.sibling));
  }
  function di(t, e, l) {
    var a = t.tag;
    if (a === 5 || a === 6) ((t = t.stateNode), e ? l.insertBefore(t, e) : l.appendChild(t));
    else if (a !== 4 && (a === 27 && ql(t.type) && (l = t.stateNode), (t = t.child), t !== null))
      for (di(t, e, l), t = t.sibling; t !== null; ) (di(t, e, l), (t = t.sibling));
  }
  function Wd(t) {
    var e = t.stateNode,
      l = t.memoizedProps;
    try {
      for (var a = t.type, u = e.attributes; u.length; ) e.removeAttributeNode(u[0]);
      (le(e, a, l), (e[It] = t), (e[ce] = l));
    } catch (i) {
      Tt(t, t.return, i);
    }
  }
  var cl = !1,
    Kt = !1,
    Hs = !1,
    Fd = typeof WeakSet == 'function' ? WeakSet : Set,
    Ft = null;
  function v0(t, e) {
    if (((t = t.containerInfo), (uo = ji), (t = of(t)), Oc(t))) {
      if ('selectionStart' in t) var l = { start: t.selectionStart, end: t.selectionEnd };
      else
        t: {
          l = ((l = t.ownerDocument) && l.defaultView) || window;
          var a = l.getSelection && l.getSelection();
          if (a && a.rangeCount !== 0) {
            l = a.anchorNode;
            var u = a.anchorOffset,
              i = a.focusNode;
            a = a.focusOffset;
            try {
              (l.nodeType, i.nodeType);
            } catch {
              l = null;
              break t;
            }
            var f = 0,
              h = -1,
              b = -1,
              C = 0,
              k = 0,
              G = t,
              D = null;
            e: for (;;) {
              for (
                var O;
                G !== l || (u !== 0 && G.nodeType !== 3) || (h = f + u),
                  G !== i || (a !== 0 && G.nodeType !== 3) || (b = f + a),
                  G.nodeType === 3 && (f += G.nodeValue.length),
                  (O = G.firstChild) !== null;
              )
                ((D = G), (G = O));
              for (;;) {
                if (G === t) break e;
                if (
                  (D === l && ++C === u && (h = f),
                  D === i && ++k === a && (b = f),
                  (O = G.nextSibling) !== null)
                )
                  break;
                ((G = D), (D = G.parentNode));
              }
              G = O;
            }
            l = h === -1 || b === -1 ? null : { start: h, end: b };
          } else l = null;
        }
      l = l || { start: 0, end: 0 };
    } else l = null;
    for (io = { focusedElem: t, selectionRange: l }, ji = !1, Ft = e; Ft !== null; )
      if (((e = Ft), (t = e.child), (e.subtreeFlags & 1028) !== 0 && t !== null))
        ((t.return = e), (Ft = t));
      else
        for (; Ft !== null; ) {
          switch (((e = Ft), (i = e.alternate), (t = e.flags), e.tag)) {
            case 0:
              if (
                (t & 4) !== 0 &&
                ((t = e.updateQueue), (t = t !== null ? t.events : null), t !== null)
              )
                for (l = 0; l < t.length; l++) ((u = t[l]), (u.ref.impl = u.nextImpl));
              break;
            case 11:
            case 15:
              break;
            case 1:
              if ((t & 1024) !== 0 && i !== null) {
                ((t = void 0),
                  (l = e),
                  (u = i.memoizedProps),
                  (i = i.memoizedState),
                  (a = l.stateNode));
                try {
                  var W = da(l.type, u);
                  ((t = a.getSnapshotBeforeUpdate(W, i)),
                    (a.__reactInternalSnapshotBeforeUpdate = t));
                } catch (et) {
                  Tt(l, l.return, et);
                }
              }
              break;
            case 3:
              if ((t & 1024) !== 0) {
                if (((t = e.stateNode.containerInfo), (l = t.nodeType), l === 9)) oo(t);
                else if (l === 1)
                  switch (t.nodeName) {
                    case 'HEAD':
                    case 'HTML':
                    case 'BODY':
                      oo(t);
                      break;
                    default:
                      t.textContent = '';
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
              if ((t & 1024) !== 0) throw Error(s(163));
          }
          if (((t = e.sibling), t !== null)) {
            ((t.return = e.return), (Ft = t));
            break;
          }
          Ft = e.return;
        }
  }
  function Id(t, e, l) {
    var a = l.flags;
    switch (l.tag) {
      case 0:
      case 11:
      case 15:
        (ol(t, l), a & 4 && Qn(5, l));
        break;
      case 1:
        if ((ol(t, l), a & 4))
          if (((t = l.stateNode), e === null))
            try {
              t.componentDidMount();
            } catch (f) {
              Tt(l, l.return, f);
            }
          else {
            var u = da(l.type, e.memoizedProps);
            e = e.memoizedState;
            try {
              t.componentDidUpdate(u, e, t.__reactInternalSnapshotBeforeUpdate);
            } catch (f) {
              Tt(l, l.return, f);
            }
          }
        (a & 64 && Zd(l), a & 512 && Vn(l, l.return));
        break;
      case 3:
        if ((ol(t, l), a & 64 && ((t = l.updateQueue), t !== null))) {
          if (((e = null), l.child !== null))
            switch (l.child.tag) {
              case 27:
              case 5:
                e = l.child.stateNode;
                break;
              case 1:
                e = l.child.stateNode;
            }
          try {
            Uf(t, e);
          } catch (f) {
            Tt(l, l.return, f);
          }
        }
        break;
      case 27:
        e === null && a & 4 && Wd(l);
      case 26:
      case 5:
        (ol(t, l), e === null && a & 4 && $d(l), a & 512 && Vn(l, l.return));
        break;
      case 12:
        ol(t, l);
        break;
      case 31:
        (ol(t, l), a & 4 && em(t, l));
        break;
      case 13:
        (ol(t, l),
          a & 4 && lm(t, l),
          a & 64 &&
            ((t = l.memoizedState),
            t !== null && ((t = t.dehydrated), t !== null && ((l = A0.bind(null, l)), Z0(t, l)))));
        break;
      case 22:
        if (((a = l.memoizedState !== null || cl), !a)) {
          ((e = (e !== null && e.memoizedState !== null) || Kt), (u = cl));
          var i = Kt;
          ((cl = a),
            (Kt = e) && !i ? rl(t, l, (l.subtreeFlags & 8772) !== 0) : ol(t, l),
            (cl = u),
            (Kt = i));
        }
        break;
      case 30:
        break;
      default:
        ol(t, l);
    }
  }
  function Pd(t) {
    var e = t.alternate;
    (e !== null && ((t.alternate = null), Pd(e)),
      (t.child = null),
      (t.deletions = null),
      (t.sibling = null),
      t.tag === 5 && ((e = t.stateNode), e !== null && hc(e)),
      (t.stateNode = null),
      (t.return = null),
      (t.dependencies = null),
      (t.memoizedProps = null),
      (t.memoizedState = null),
      (t.pendingProps = null),
      (t.stateNode = null),
      (t.updateQueue = null));
  }
  var jt = null,
    oe = !1;
  function sl(t, e, l) {
    for (l = l.child; l !== null; ) (tm(t, e, l), (l = l.sibling));
  }
  function tm(t, e, l) {
    if (pe && typeof pe.onCommitFiberUnmount == 'function')
      try {
        pe.onCommitFiberUnmount(yn, l);
      } catch {}
    switch (l.tag) {
      case 26:
        (Kt || Ze(l, e),
          sl(t, e, l),
          l.memoizedState
            ? l.memoizedState.count--
            : l.stateNode && ((l = l.stateNode), l.parentNode.removeChild(l)));
        break;
      case 27:
        Kt || Ze(l, e);
        var a = jt,
          u = oe;
        (ql(l.type) && ((jt = l.stateNode), (oe = !1)),
          sl(t, e, l),
          tu(l.stateNode),
          (jt = a),
          (oe = u));
        break;
      case 5:
        Kt || Ze(l, e);
      case 6:
        if (((a = jt), (u = oe), (jt = null), sl(t, e, l), (jt = a), (oe = u), jt !== null))
          if (oe)
            try {
              (jt.nodeType === 9
                ? jt.body
                : jt.nodeName === 'HTML'
                  ? jt.ownerDocument.body
                  : jt
              ).removeChild(l.stateNode);
            } catch (i) {
              Tt(l, e, i);
            }
          else
            try {
              jt.removeChild(l.stateNode);
            } catch (i) {
              Tt(l, e, i);
            }
        break;
      case 18:
        jt !== null &&
          (oe
            ? ((t = jt),
              Zm(
                t.nodeType === 9 ? t.body : t.nodeName === 'HTML' ? t.ownerDocument.body : t,
                l.stateNode
              ),
              ln(t))
            : Zm(jt, l.stateNode));
        break;
      case 4:
        ((a = jt),
          (u = oe),
          (jt = l.stateNode.containerInfo),
          (oe = !0),
          sl(t, e, l),
          (jt = a),
          (oe = u));
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        (jl(2, l, e), Kt || jl(4, l, e), sl(t, e, l));
        break;
      case 1:
        (Kt ||
          (Ze(l, e), (a = l.stateNode), typeof a.componentWillUnmount == 'function' && Kd(l, e, a)),
          sl(t, e, l));
        break;
      case 21:
        sl(t, e, l);
        break;
      case 22:
        ((Kt = (a = Kt) || l.memoizedState !== null), sl(t, e, l), (Kt = a));
        break;
      default:
        sl(t, e, l);
    }
  }
  function em(t, e) {
    if (
      e.memoizedState === null &&
      ((t = e.alternate), t !== null && ((t = t.memoizedState), t !== null))
    ) {
      t = t.dehydrated;
      try {
        ln(t);
      } catch (l) {
        Tt(e, e.return, l);
      }
    }
  }
  function lm(t, e) {
    if (
      e.memoizedState === null &&
      ((t = e.alternate),
      t !== null && ((t = t.memoizedState), t !== null && ((t = t.dehydrated), t !== null)))
    )
      try {
        ln(t);
      } catch (l) {
        Tt(e, e.return, l);
      }
  }
  function g0(t) {
    switch (t.tag) {
      case 31:
      case 13:
      case 19:
        var e = t.stateNode;
        return (e === null && (e = t.stateNode = new Fd()), e);
      case 22:
        return (
          (t = t.stateNode),
          (e = t._retryCache),
          e === null && (e = t._retryCache = new Fd()),
          e
        );
      default:
        throw Error(s(435, t.tag));
    }
  }
  function mi(t, e) {
    var l = g0(t);
    e.forEach(function (a) {
      if (!l.has(a)) {
        l.add(a);
        var u = M0.bind(null, t, a);
        a.then(u, u);
      }
    });
  }
  function re(t, e) {
    var l = e.deletions;
    if (l !== null)
      for (var a = 0; a < l.length; a++) {
        var u = l[a],
          i = t,
          f = e,
          h = f;
        t: for (; h !== null; ) {
          switch (h.tag) {
            case 27:
              if (ql(h.type)) {
                ((jt = h.stateNode), (oe = !1));
                break t;
              }
              break;
            case 5:
              ((jt = h.stateNode), (oe = !1));
              break t;
            case 3:
            case 4:
              ((jt = h.stateNode.containerInfo), (oe = !0));
              break t;
          }
          h = h.return;
        }
        if (jt === null) throw Error(s(160));
        (tm(i, f, u),
          (jt = null),
          (oe = !1),
          (i = u.alternate),
          i !== null && (i.return = null),
          (u.return = null));
      }
    if (e.subtreeFlags & 13886) for (e = e.child; e !== null; ) (am(e, t), (e = e.sibling));
  }
  var Le = null;
  function am(t, e) {
    var l = t.alternate,
      a = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        (re(e, t), fe(t), a & 4 && (jl(3, t, t.return), Qn(3, t), jl(5, t, t.return)));
        break;
      case 1:
        (re(e, t),
          fe(t),
          a & 512 && (Kt || l === null || Ze(l, l.return)),
          a & 64 &&
            cl &&
            ((t = t.updateQueue),
            t !== null &&
              ((a = t.callbacks),
              a !== null &&
                ((l = t.shared.hiddenCallbacks),
                (t.shared.hiddenCallbacks = l === null ? a : l.concat(a))))));
        break;
      case 26:
        var u = Le;
        if ((re(e, t), fe(t), a & 512 && (Kt || l === null || Ze(l, l.return)), a & 4)) {
          var i = l !== null ? l.memoizedState : null;
          if (((a = t.memoizedState), l === null))
            if (a === null)
              if (t.stateNode === null) {
                t: {
                  ((a = t.type), (l = t.memoizedProps), (u = u.ownerDocument || u));
                  e: switch (a) {
                    case 'title':
                      ((i = u.getElementsByTagName('title')[0]),
                        (!i ||
                          i[gn] ||
                          i[It] ||
                          i.namespaceURI === 'http://www.w3.org/2000/svg' ||
                          i.hasAttribute('itemprop')) &&
                          ((i = u.createElement(a)),
                          u.head.insertBefore(i, u.querySelector('head > title'))),
                        le(i, a, l),
                        (i[It] = t),
                        Wt(i),
                        (a = i));
                      break t;
                    case 'link':
                      var f = ah('link', 'href', u).get(a + (l.href || ''));
                      if (f) {
                        for (var h = 0; h < f.length; h++)
                          if (
                            ((i = f[h]),
                            i.getAttribute('href') ===
                              (l.href == null || l.href === '' ? null : l.href) &&
                              i.getAttribute('rel') === (l.rel == null ? null : l.rel) &&
                              i.getAttribute('title') === (l.title == null ? null : l.title) &&
                              i.getAttribute('crossorigin') ===
                                (l.crossOrigin == null ? null : l.crossOrigin))
                          ) {
                            f.splice(h, 1);
                            break e;
                          }
                      }
                      ((i = u.createElement(a)), le(i, a, l), u.head.appendChild(i));
                      break;
                    case 'meta':
                      if ((f = ah('meta', 'content', u).get(a + (l.content || '')))) {
                        for (h = 0; h < f.length; h++)
                          if (
                            ((i = f[h]),
                            i.getAttribute('content') ===
                              (l.content == null ? null : '' + l.content) &&
                              i.getAttribute('name') === (l.name == null ? null : l.name) &&
                              i.getAttribute('property') ===
                                (l.property == null ? null : l.property) &&
                              i.getAttribute('http-equiv') ===
                                (l.httpEquiv == null ? null : l.httpEquiv) &&
                              i.getAttribute('charset') === (l.charSet == null ? null : l.charSet))
                          ) {
                            f.splice(h, 1);
                            break e;
                          }
                      }
                      ((i = u.createElement(a)), le(i, a, l), u.head.appendChild(i));
                      break;
                    default:
                      throw Error(s(468, a));
                  }
                  ((i[It] = t), Wt(i), (a = i));
                }
                t.stateNode = a;
              } else nh(u, t.type, t.stateNode);
            else t.stateNode = lh(u, a, t.memoizedProps);
          else
            i !== a
              ? (i === null
                  ? l.stateNode !== null && ((l = l.stateNode), l.parentNode.removeChild(l))
                  : i.count--,
                a === null ? nh(u, t.type, t.stateNode) : lh(u, a, t.memoizedProps))
              : a === null && t.stateNode !== null && ws(t, t.memoizedProps, l.memoizedProps);
        }
        break;
      case 27:
        (re(e, t),
          fe(t),
          a & 512 && (Kt || l === null || Ze(l, l.return)),
          l !== null && a & 4 && ws(t, t.memoizedProps, l.memoizedProps));
        break;
      case 5:
        if ((re(e, t), fe(t), a & 512 && (Kt || l === null || Ze(l, l.return)), t.flags & 32)) {
          u = t.stateNode;
          try {
            Na(u, '');
          } catch (W) {
            Tt(t, t.return, W);
          }
        }
        (a & 4 &&
          t.stateNode != null &&
          ((u = t.memoizedProps), ws(t, u, l !== null ? l.memoizedProps : u)),
          a & 1024 && (Hs = !0));
        break;
      case 6:
        if ((re(e, t), fe(t), a & 4)) {
          if (t.stateNode === null) throw Error(s(162));
          ((a = t.memoizedProps), (l = t.stateNode));
          try {
            l.nodeValue = a;
          } catch (W) {
            Tt(t, t.return, W);
          }
        }
        break;
      case 3:
        if (
          ((Ri = null),
          (u = Le),
          (Le = Mi(e.containerInfo)),
          re(e, t),
          (Le = u),
          fe(t),
          a & 4 && l !== null && l.memoizedState.isDehydrated)
        )
          try {
            ln(e.containerInfo);
          } catch (W) {
            Tt(t, t.return, W);
          }
        Hs && ((Hs = !1), nm(t));
        break;
      case 4:
        ((a = Le), (Le = Mi(t.stateNode.containerInfo)), re(e, t), fe(t), (Le = a));
        break;
      case 12:
        (re(e, t), fe(t));
        break;
      case 31:
        (re(e, t),
          fe(t),
          a & 4 && ((a = t.updateQueue), a !== null && ((t.updateQueue = null), mi(t, a))));
        break;
      case 13:
        (re(e, t),
          fe(t),
          t.child.flags & 8192 &&
            (t.memoizedState !== null) != (l !== null && l.memoizedState !== null) &&
            (yi = ye()),
          a & 4 && ((a = t.updateQueue), a !== null && ((t.updateQueue = null), mi(t, a))));
        break;
      case 22:
        u = t.memoizedState !== null;
        var b = l !== null && l.memoizedState !== null,
          C = cl,
          k = Kt;
        if (((cl = C || u), (Kt = k || b), re(e, t), (Kt = k), (cl = C), fe(t), a & 8192))
          t: for (
            e = t.stateNode,
              e._visibility = u ? e._visibility & -2 : e._visibility | 1,
              u && (l === null || b || cl || Kt || ma(t)),
              l = null,
              e = t;
            ;
          ) {
            if (e.tag === 5 || e.tag === 26) {
              if (l === null) {
                b = l = e;
                try {
                  if (((i = b.stateNode), u))
                    ((f = i.style),
                      typeof f.setProperty == 'function'
                        ? f.setProperty('display', 'none', 'important')
                        : (f.display = 'none'));
                  else {
                    h = b.stateNode;
                    var G = b.memoizedProps.style,
                      D = G != null && G.hasOwnProperty('display') ? G.display : null;
                    h.style.display = D == null || typeof D == 'boolean' ? '' : ('' + D).trim();
                  }
                } catch (W) {
                  Tt(b, b.return, W);
                }
              }
            } else if (e.tag === 6) {
              if (l === null) {
                b = e;
                try {
                  b.stateNode.nodeValue = u ? '' : b.memoizedProps;
                } catch (W) {
                  Tt(b, b.return, W);
                }
              }
            } else if (e.tag === 18) {
              if (l === null) {
                b = e;
                try {
                  var O = b.stateNode;
                  u ? Km(O, !0) : Km(b.stateNode, !1);
                } catch (W) {
                  Tt(b, b.return, W);
                }
              }
            } else if (
              ((e.tag !== 22 && e.tag !== 23) || e.memoizedState === null || e === t) &&
              e.child !== null
            ) {
              ((e.child.return = e), (e = e.child));
              continue;
            }
            if (e === t) break t;
            for (; e.sibling === null; ) {
              if (e.return === null || e.return === t) break t;
              (l === e && (l = null), (e = e.return));
            }
            (l === e && (l = null), (e.sibling.return = e.return), (e = e.sibling));
          }
        a & 4 &&
          ((a = t.updateQueue),
          a !== null && ((l = a.retryQueue), l !== null && ((a.retryQueue = null), mi(t, l))));
        break;
      case 19:
        (re(e, t),
          fe(t),
          a & 4 && ((a = t.updateQueue), a !== null && ((t.updateQueue = null), mi(t, a))));
        break;
      case 30:
        break;
      case 21:
        break;
      default:
        (re(e, t), fe(t));
    }
  }
  function fe(t) {
    var e = t.flags;
    if (e & 2) {
      try {
        for (var l, a = t.return; a !== null; ) {
          if (Jd(a)) {
            l = a;
            break;
          }
          a = a.return;
        }
        if (l == null) throw Error(s(160));
        switch (l.tag) {
          case 27:
            var u = l.stateNode,
              i = Us(t);
            di(t, i, u);
            break;
          case 5:
            var f = l.stateNode;
            l.flags & 32 && (Na(f, ''), (l.flags &= -33));
            var h = Us(t);
            di(t, h, f);
            break;
          case 3:
          case 4:
            var b = l.stateNode.containerInfo,
              C = Us(t);
            Bs(t, C, b);
            break;
          default:
            throw Error(s(161));
        }
      } catch (k) {
        Tt(t, t.return, k);
      }
      t.flags &= -3;
    }
    e & 4096 && (t.flags &= -4097);
  }
  function nm(t) {
    if (t.subtreeFlags & 1024)
      for (t = t.child; t !== null; ) {
        var e = t;
        (nm(e), e.tag === 5 && e.flags & 1024 && e.stateNode.reset(), (t = t.sibling));
      }
  }
  function ol(t, e) {
    if (e.subtreeFlags & 8772)
      for (e = e.child; e !== null; ) (Id(t, e.alternate, e), (e = e.sibling));
  }
  function ma(t) {
    for (t = t.child; t !== null; ) {
      var e = t;
      switch (e.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          (jl(4, e, e.return), ma(e));
          break;
        case 1:
          Ze(e, e.return);
          var l = e.stateNode;
          (typeof l.componentWillUnmount == 'function' && Kd(e, e.return, l), ma(e));
          break;
        case 27:
          tu(e.stateNode);
        case 26:
        case 5:
          (Ze(e, e.return), ma(e));
          break;
        case 22:
          e.memoizedState === null && ma(e);
          break;
        case 30:
          ma(e);
          break;
        default:
          ma(e);
      }
      t = t.sibling;
    }
  }
  function rl(t, e, l) {
    for (l = l && (e.subtreeFlags & 8772) !== 0, e = e.child; e !== null; ) {
      var a = e.alternate,
        u = t,
        i = e,
        f = i.flags;
      switch (i.tag) {
        case 0:
        case 11:
        case 15:
          (rl(u, i, l), Qn(4, i));
          break;
        case 1:
          if ((rl(u, i, l), (a = i), (u = a.stateNode), typeof u.componentDidMount == 'function'))
            try {
              u.componentDidMount();
            } catch (C) {
              Tt(a, a.return, C);
            }
          if (((a = i), (u = a.updateQueue), u !== null)) {
            var h = a.stateNode;
            try {
              var b = u.shared.hiddenCallbacks;
              if (b !== null)
                for (u.shared.hiddenCallbacks = null, u = 0; u < b.length; u++) wf(b[u], h);
            } catch (C) {
              Tt(a, a.return, C);
            }
          }
          (l && f & 64 && Zd(i), Vn(i, i.return));
          break;
        case 27:
          Wd(i);
        case 26:
        case 5:
          (rl(u, i, l), l && a === null && f & 4 && $d(i), Vn(i, i.return));
          break;
        case 12:
          rl(u, i, l);
          break;
        case 31:
          (rl(u, i, l), l && f & 4 && em(u, i));
          break;
        case 13:
          (rl(u, i, l), l && f & 4 && lm(u, i));
          break;
        case 22:
          (i.memoizedState === null && rl(u, i, l), Vn(i, i.return));
          break;
        case 30:
          break;
        default:
          rl(u, i, l);
      }
      e = e.sibling;
    }
  }
  function Ls(t, e) {
    var l = null;
    (t !== null &&
      t.memoizedState !== null &&
      t.memoizedState.cachePool !== null &&
      (l = t.memoizedState.cachePool.pool),
      (t = null),
      e.memoizedState !== null &&
        e.memoizedState.cachePool !== null &&
        (t = e.memoizedState.cachePool.pool),
      t !== l && (t != null && t.refCount++, l != null && On(l)));
  }
  function qs(t, e) {
    ((t = null),
      e.alternate !== null && (t = e.alternate.memoizedState.cache),
      (e = e.memoizedState.cache),
      e !== t && (e.refCount++, t != null && On(t)));
  }
  function qe(t, e, l, a) {
    if (e.subtreeFlags & 10256) for (e = e.child; e !== null; ) (um(t, e, l, a), (e = e.sibling));
  }
  function um(t, e, l, a) {
    var u = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        (qe(t, e, l, a), u & 2048 && Qn(9, e));
        break;
      case 1:
        qe(t, e, l, a);
        break;
      case 3:
        (qe(t, e, l, a),
          u & 2048 &&
            ((t = null),
            e.alternate !== null && (t = e.alternate.memoizedState.cache),
            (e = e.memoizedState.cache),
            e !== t && (e.refCount++, t != null && On(t))));
        break;
      case 12:
        if (u & 2048) {
          (qe(t, e, l, a), (t = e.stateNode));
          try {
            var i = e.memoizedProps,
              f = i.id,
              h = i.onPostCommit;
            typeof h == 'function' &&
              h(f, e.alternate === null ? 'mount' : 'update', t.passiveEffectDuration, -0);
          } catch (b) {
            Tt(e, e.return, b);
          }
        } else qe(t, e, l, a);
        break;
      case 31:
        qe(t, e, l, a);
        break;
      case 13:
        qe(t, e, l, a);
        break;
      case 23:
        break;
      case 22:
        ((i = e.stateNode),
          (f = e.alternate),
          e.memoizedState !== null
            ? i._visibility & 2
              ? qe(t, e, l, a)
              : Zn(t, e)
            : i._visibility & 2
              ? qe(t, e, l, a)
              : ((i._visibility |= 2), Va(t, e, l, a, (e.subtreeFlags & 10256) !== 0 || !1)),
          u & 2048 && Ls(f, e));
        break;
      case 24:
        (qe(t, e, l, a), u & 2048 && qs(e.alternate, e));
        break;
      default:
        qe(t, e, l, a);
    }
  }
  function Va(t, e, l, a, u) {
    for (u = u && ((e.subtreeFlags & 10256) !== 0 || !1), e = e.child; e !== null; ) {
      var i = t,
        f = e,
        h = l,
        b = a,
        C = f.flags;
      switch (f.tag) {
        case 0:
        case 11:
        case 15:
          (Va(i, f, h, b, u), Qn(8, f));
          break;
        case 23:
          break;
        case 22:
          var k = f.stateNode;
          (f.memoizedState !== null
            ? k._visibility & 2
              ? Va(i, f, h, b, u)
              : Zn(i, f)
            : ((k._visibility |= 2), Va(i, f, h, b, u)),
            u && C & 2048 && Ls(f.alternate, f));
          break;
        case 24:
          (Va(i, f, h, b, u), u && C & 2048 && qs(f.alternate, f));
          break;
        default:
          Va(i, f, h, b, u);
      }
      e = e.sibling;
    }
  }
  function Zn(t, e) {
    if (e.subtreeFlags & 10256)
      for (e = e.child; e !== null; ) {
        var l = t,
          a = e,
          u = a.flags;
        switch (a.tag) {
          case 22:
            (Zn(l, a), u & 2048 && Ls(a.alternate, a));
            break;
          case 24:
            (Zn(l, a), u & 2048 && qs(a.alternate, a));
            break;
          default:
            Zn(l, a);
        }
        e = e.sibling;
      }
  }
  var Kn = 8192;
  function Za(t, e, l) {
    if (t.subtreeFlags & Kn) for (t = t.child; t !== null; ) (im(t, e, l), (t = t.sibling));
  }
  function im(t, e, l) {
    switch (t.tag) {
      case 26:
        (Za(t, e, l),
          t.flags & Kn && t.memoizedState !== null && nv(l, Le, t.memoizedState, t.memoizedProps));
        break;
      case 5:
        Za(t, e, l);
        break;
      case 3:
      case 4:
        var a = Le;
        ((Le = Mi(t.stateNode.containerInfo)), Za(t, e, l), (Le = a));
        break;
      case 22:
        t.memoizedState === null &&
          ((a = t.alternate),
          a !== null && a.memoizedState !== null
            ? ((a = Kn), (Kn = 16777216), Za(t, e, l), (Kn = a))
            : Za(t, e, l));
        break;
      default:
        Za(t, e, l);
    }
  }
  function cm(t) {
    var e = t.alternate;
    if (e !== null && ((t = e.child), t !== null)) {
      e.child = null;
      do ((e = t.sibling), (t.sibling = null), (t = e));
      while (t !== null);
    }
  }
  function $n(t) {
    var e = t.deletions;
    if ((t.flags & 16) !== 0) {
      if (e !== null)
        for (var l = 0; l < e.length; l++) {
          var a = e[l];
          ((Ft = a), om(a, t));
        }
      cm(t);
    }
    if (t.subtreeFlags & 10256) for (t = t.child; t !== null; ) (sm(t), (t = t.sibling));
  }
  function sm(t) {
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        ($n(t), t.flags & 2048 && jl(9, t, t.return));
        break;
      case 3:
        $n(t);
        break;
      case 12:
        $n(t);
        break;
      case 22:
        var e = t.stateNode;
        t.memoizedState !== null && e._visibility & 2 && (t.return === null || t.return.tag !== 13)
          ? ((e._visibility &= -3), hi(t))
          : $n(t);
        break;
      default:
        $n(t);
    }
  }
  function hi(t) {
    var e = t.deletions;
    if ((t.flags & 16) !== 0) {
      if (e !== null)
        for (var l = 0; l < e.length; l++) {
          var a = e[l];
          ((Ft = a), om(a, t));
        }
      cm(t);
    }
    for (t = t.child; t !== null; ) {
      switch (((e = t), e.tag)) {
        case 0:
        case 11:
        case 15:
          (jl(8, e, e.return), hi(e));
          break;
        case 22:
          ((l = e.stateNode), l._visibility & 2 && ((l._visibility &= -3), hi(e)));
          break;
        default:
          hi(e);
      }
      t = t.sibling;
    }
  }
  function om(t, e) {
    for (; Ft !== null; ) {
      var l = Ft;
      switch (l.tag) {
        case 0:
        case 11:
        case 15:
          jl(8, l, e);
          break;
        case 23:
        case 22:
          if (l.memoizedState !== null && l.memoizedState.cachePool !== null) {
            var a = l.memoizedState.cachePool.pool;
            a != null && a.refCount++;
          }
          break;
        case 24:
          On(l.memoizedState.cache);
      }
      if (((a = l.child), a !== null)) ((a.return = l), (Ft = a));
      else
        t: for (l = t; Ft !== null; ) {
          a = Ft;
          var u = a.sibling,
            i = a.return;
          if ((Pd(a), a === l)) {
            Ft = null;
            break t;
          }
          if (u !== null) {
            ((u.return = i), (Ft = u));
            break t;
          }
          Ft = i;
        }
    }
  }
  var _0 = {
      getCacheForType: function (t) {
        var e = te(Qt),
          l = e.data.get(t);
        return (l === void 0 && ((l = t()), e.data.set(t, l)), l);
      },
      cacheSignal: function () {
        return te(Qt).controller.signal;
      },
    },
    b0 = typeof WeakMap == 'function' ? WeakMap : Map,
    bt = 0,
    Rt = null,
    rt = null,
    mt = 0,
    Et = 0,
    xe = null,
    kl = !1,
    Ka = !1,
    Gs = !1,
    fl = 0,
    qt = 0,
    wl = 0,
    ha = 0,
    Ys = 0,
    Ee = 0,
    $a = 0,
    Jn = null,
    de = null,
    Xs = !1,
    yi = 0,
    rm = 0,
    pi = 1 / 0,
    vi = null,
    Ul = null,
    Jt = 0,
    Bl = null,
    Ja = null,
    dl = 0,
    Qs = 0,
    Vs = null,
    fm = null,
    Wn = 0,
    Zs = null;
  function Te() {
    return (bt & 2) !== 0 && mt !== 0 ? mt & -mt : U.T !== null ? Is() : Ar();
  }
  function dm() {
    if (Ee === 0)
      if ((mt & 536870912) === 0 || yt) {
        var t = Nu;
        ((Nu <<= 1), (Nu & 3932160) === 0 && (Nu = 262144), (Ee = t));
      } else Ee = 536870912;
    return ((t = be.current), t !== null && (t.flags |= 32), Ee);
  }
  function me(t, e, l) {
    (((t === Rt && (Et === 2 || Et === 9)) || t.cancelPendingCommit !== null) &&
      (Wa(t, 0), Hl(t, mt, Ee, !1)),
      vn(t, l),
      ((bt & 2) === 0 || t !== Rt) &&
        (t === Rt && ((bt & 2) === 0 && (ha |= l), qt === 4 && Hl(t, mt, Ee, !1)), Ke(t)));
  }
  function mm(t, e, l) {
    if ((bt & 6) !== 0) throw Error(s(327));
    var a = (!l && (e & 127) === 0 && (e & t.expiredLanes) === 0) || pn(t, e),
      u = a ? E0(t, e) : $s(t, e, !0),
      i = a;
    do {
      if (u === 0) {
        Ka && !a && Hl(t, e, 0, !1);
        break;
      } else {
        if (((l = t.current.alternate), i && !S0(l))) {
          ((u = $s(t, e, !1)), (i = !1));
          continue;
        }
        if (u === 2) {
          if (((i = e), t.errorRecoveryDisabledLanes & i)) var f = 0;
          else
            ((f = t.pendingLanes & -536870913), (f = f !== 0 ? f : f & 536870912 ? 536870912 : 0));
          if (f !== 0) {
            e = f;
            t: {
              var h = t;
              u = Jn;
              var b = h.current.memoizedState.isDehydrated;
              if ((b && (Wa(h, f).flags |= 256), (f = $s(h, f, !1)), f !== 2)) {
                if (Gs && !b) {
                  ((h.errorRecoveryDisabledLanes |= i), (ha |= i), (u = 4));
                  break t;
                }
                ((i = de), (de = u), i !== null && (de === null ? (de = i) : de.push.apply(de, i)));
              }
              u = f;
            }
            if (((i = !1), u !== 2)) continue;
          }
        }
        if (u === 1) {
          (Wa(t, 0), Hl(t, e, 0, !0));
          break;
        }
        t: {
          switch (((a = t), (i = u), i)) {
            case 0:
            case 1:
              throw Error(s(345));
            case 4:
              if ((e & 4194048) !== e) break;
            case 6:
              Hl(a, e, Ee, !kl);
              break t;
            case 2:
              de = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(s(329));
          }
          if ((e & 62914560) === e && ((u = yi + 300 - ye()), 10 < u)) {
            if ((Hl(a, e, Ee, !kl), Mu(a, 0, !0) !== 0)) break t;
            ((dl = e),
              (a.timeoutHandle = Qm(
                hm.bind(null, a, l, de, vi, Xs, e, Ee, ha, $a, kl, i, 'Throttled', -0, 0),
                u
              )));
            break t;
          }
          hm(a, l, de, vi, Xs, e, Ee, ha, $a, kl, i, null, -0, 0);
        }
      }
      break;
    } while (!0);
    Ke(t);
  }
  function hm(t, e, l, a, u, i, f, h, b, C, k, G, D, O) {
    if (((t.timeoutHandle = -1), (G = e.subtreeFlags), G & 8192 || (G & 16785408) === 16785408)) {
      ((G = {
        stylesheets: null,
        count: 0,
        imgCount: 0,
        imgBytes: 0,
        suspenseyImages: [],
        waitingForImages: !0,
        waitingForViewTransition: !1,
        unsuspend: Fe,
      }),
        im(e, i, G));
      var W = (i & 62914560) === i ? yi - ye() : (i & 4194048) === i ? rm - ye() : 0;
      if (((W = uv(G, W)), W !== null)) {
        ((dl = i),
          (t.cancelPendingCommit = W(xm.bind(null, t, e, i, l, a, u, f, h, b, k, G, null, D, O))),
          Hl(t, i, f, !C));
        return;
      }
    }
    xm(t, e, i, l, a, u, f, h, b);
  }
  function S0(t) {
    for (var e = t; ; ) {
      var l = e.tag;
      if (
        (l === 0 || l === 11 || l === 15) &&
        e.flags & 16384 &&
        ((l = e.updateQueue), l !== null && ((l = l.stores), l !== null))
      )
        for (var a = 0; a < l.length; a++) {
          var u = l[a],
            i = u.getSnapshot;
          u = u.value;
          try {
            if (!ge(i(), u)) return !1;
          } catch {
            return !1;
          }
        }
      if (((l = e.child), e.subtreeFlags & 16384 && l !== null)) ((l.return = e), (e = l));
      else {
        if (e === t) break;
        for (; e.sibling === null; ) {
          if (e.return === null || e.return === t) return !0;
          e = e.return;
        }
        ((e.sibling.return = e.return), (e = e.sibling));
      }
    }
    return !0;
  }
  function Hl(t, e, l, a) {
    ((e &= ~Ys),
      (e &= ~ha),
      (t.suspendedLanes |= e),
      (t.pingedLanes &= ~e),
      a && (t.warmLanes |= e),
      (a = t.expirationTimes));
    for (var u = e; 0 < u; ) {
      var i = 31 - ve(u),
        f = 1 << i;
      ((a[i] = -1), (u &= ~f));
    }
    l !== 0 && Er(t, l, e);
  }
  function gi() {
    return (bt & 6) === 0 ? (Fn(0), !1) : !0;
  }
  function Ks() {
    if (rt !== null) {
      if (Et === 0) var t = rt.return;
      else ((t = rt), (el = ua = null), os(t), (qa = null), (jn = 0), (t = rt));
      for (; t !== null; ) (Vd(t.alternate, t), (t = t.return));
      rt = null;
    }
  }
  function Wa(t, e) {
    var l = t.timeoutHandle;
    (l !== -1 && ((t.timeoutHandle = -1), G0(l)),
      (l = t.cancelPendingCommit),
      l !== null && ((t.cancelPendingCommit = null), l()),
      (dl = 0),
      Ks(),
      (Rt = t),
      (rt = l = Pe(t.current, null)),
      (mt = e),
      (Et = 0),
      (xe = null),
      (kl = !1),
      (Ka = pn(t, e)),
      (Gs = !1),
      ($a = Ee = Ys = ha = wl = qt = 0),
      (de = Jn = null),
      (Xs = !1),
      (e & 8) !== 0 && (e |= e & 32));
    var a = t.entangledLanes;
    if (a !== 0)
      for (t = t.entanglements, a &= e; 0 < a; ) {
        var u = 31 - ve(a),
          i = 1 << u;
        ((e |= t[u]), (a &= ~i));
      }
    return ((fl = e), Lu(), l);
  }
  function ym(t, e) {
    ((ut = null),
      (U.H = Gn),
      e === La || e === Ku
        ? ((e = Of()), (Et = 3))
        : e === Fc
          ? ((e = Of()), (Et = 4))
          : (Et =
              e === Ns
                ? 8
                : e !== null && typeof e == 'object' && typeof e.then == 'function'
                  ? 6
                  : 1),
      (xe = e),
      rt === null && ((qt = 1), ci(t, De(e, t.current))));
  }
  function pm() {
    var t = be.current;
    return t === null
      ? !0
      : (mt & 4194048) === mt
        ? ke === null
        : (mt & 62914560) === mt || (mt & 536870912) !== 0
          ? t === ke
          : !1;
  }
  function vm() {
    var t = U.H;
    return ((U.H = Gn), t === null ? Gn : t);
  }
  function gm() {
    var t = U.A;
    return ((U.A = _0), t);
  }
  function _i() {
    ((qt = 4),
      kl || ((mt & 4194048) !== mt && be.current !== null) || (Ka = !0),
      ((wl & 134217727) === 0 && (ha & 134217727) === 0) || Rt === null || Hl(Rt, mt, Ee, !1));
  }
  function $s(t, e, l) {
    var a = bt;
    bt |= 2;
    var u = vm(),
      i = gm();
    ((Rt !== t || mt !== e) && ((vi = null), Wa(t, e)), (e = !1));
    var f = qt;
    t: do
      try {
        if (Et !== 0 && rt !== null) {
          var h = rt,
            b = xe;
          switch (Et) {
            case 8:
              (Ks(), (f = 6));
              break t;
            case 3:
            case 2:
            case 9:
            case 6:
              be.current === null && (e = !0);
              var C = Et;
              if (((Et = 0), (xe = null), Fa(t, h, b, C), l && Ka)) {
                f = 0;
                break t;
              }
              break;
            default:
              ((C = Et), (Et = 0), (xe = null), Fa(t, h, b, C));
          }
        }
        (x0(), (f = qt));
        break;
      } catch (k) {
        ym(t, k);
      }
    while (!0);
    return (
      e && t.shellSuspendCounter++,
      (el = ua = null),
      (bt = a),
      (U.H = u),
      (U.A = i),
      rt === null && ((Rt = null), (mt = 0), Lu()),
      f
    );
  }
  function x0() {
    for (; rt !== null; ) _m(rt);
  }
  function E0(t, e) {
    var l = bt;
    bt |= 2;
    var a = vm(),
      u = gm();
    Rt !== t || mt !== e ? ((vi = null), (pi = ye() + 500), Wa(t, e)) : (Ka = pn(t, e));
    t: do
      try {
        if (Et !== 0 && rt !== null) {
          e = rt;
          var i = xe;
          e: switch (Et) {
            case 1:
              ((Et = 0), (xe = null), Fa(t, e, i, 1));
              break;
            case 2:
            case 9:
              if (Rf(i)) {
                ((Et = 0), (xe = null), bm(e));
                break;
              }
              ((e = function () {
                ((Et !== 2 && Et !== 9) || Rt !== t || (Et = 7), Ke(t));
              }),
                i.then(e, e));
              break t;
            case 3:
              Et = 7;
              break t;
            case 4:
              Et = 5;
              break t;
            case 7:
              Rf(i) ? ((Et = 0), (xe = null), bm(e)) : ((Et = 0), (xe = null), Fa(t, e, i, 7));
              break;
            case 5:
              var f = null;
              switch (rt.tag) {
                case 26:
                  f = rt.memoizedState;
                case 5:
                case 27:
                  var h = rt;
                  if (f ? uh(f) : h.stateNode.complete) {
                    ((Et = 0), (xe = null));
                    var b = h.sibling;
                    if (b !== null) rt = b;
                    else {
                      var C = h.return;
                      C !== null ? ((rt = C), bi(C)) : (rt = null);
                    }
                    break e;
                  }
              }
              ((Et = 0), (xe = null), Fa(t, e, i, 5));
              break;
            case 6:
              ((Et = 0), (xe = null), Fa(t, e, i, 6));
              break;
            case 8:
              (Ks(), (qt = 6));
              break t;
            default:
              throw Error(s(462));
          }
        }
        T0();
        break;
      } catch (k) {
        ym(t, k);
      }
    while (!0);
    return (
      (el = ua = null),
      (U.H = a),
      (U.A = u),
      (bt = l),
      rt !== null ? 0 : ((Rt = null), (mt = 0), Lu(), qt)
    );
  }
  function T0() {
    for (; rt !== null && !Ky(); ) _m(rt);
  }
  function _m(t) {
    var e = Xd(t.alternate, t, fl);
    ((t.memoizedProps = t.pendingProps), e === null ? bi(t) : (rt = e));
  }
  function bm(t) {
    var e = t,
      l = e.alternate;
    switch (e.tag) {
      case 15:
      case 0:
        e = Bd(l, e, e.pendingProps, e.type, void 0, mt);
        break;
      case 11:
        e = Bd(l, e, e.pendingProps, e.type.render, e.ref, mt);
        break;
      case 5:
        os(e);
      default:
        (Vd(l, e), (e = rt = gf(e, fl)), (e = Xd(l, e, fl)));
    }
    ((t.memoizedProps = t.pendingProps), e === null ? bi(t) : (rt = e));
  }
  function Fa(t, e, l, a) {
    ((el = ua = null), os(e), (qa = null), (jn = 0));
    var u = e.return;
    try {
      if (d0(t, u, e, l, mt)) {
        ((qt = 1), ci(t, De(l, t.current)), (rt = null));
        return;
      }
    } catch (i) {
      if (u !== null) throw ((rt = u), i);
      ((qt = 1), ci(t, De(l, t.current)), (rt = null));
      return;
    }
    e.flags & 32768
      ? (yt || a === 1
          ? (t = !0)
          : Ka || (mt & 536870912) !== 0
            ? (t = !1)
            : ((kl = t = !0),
              (a === 2 || a === 9 || a === 3 || a === 6) &&
                ((a = be.current), a !== null && a.tag === 13 && (a.flags |= 16384))),
        Sm(e, t))
      : bi(e);
  }
  function bi(t) {
    var e = t;
    do {
      if ((e.flags & 32768) !== 0) {
        Sm(e, kl);
        return;
      }
      t = e.return;
      var l = y0(e.alternate, e, fl);
      if (l !== null) {
        rt = l;
        return;
      }
      if (((e = e.sibling), e !== null)) {
        rt = e;
        return;
      }
      rt = e = t;
    } while (e !== null);
    qt === 0 && (qt = 5);
  }
  function Sm(t, e) {
    do {
      var l = p0(t.alternate, t);
      if (l !== null) {
        ((l.flags &= 32767), (rt = l));
        return;
      }
      if (
        ((l = t.return),
        l !== null && ((l.flags |= 32768), (l.subtreeFlags = 0), (l.deletions = null)),
        !e && ((t = t.sibling), t !== null))
      ) {
        rt = t;
        return;
      }
      rt = t = l;
    } while (t !== null);
    ((qt = 6), (rt = null));
  }
  function xm(t, e, l, a, u, i, f, h, b) {
    t.cancelPendingCommit = null;
    do Si();
    while (Jt !== 0);
    if ((bt & 6) !== 0) throw Error(s(327));
    if (e !== null) {
      if (e === t.current) throw Error(s(177));
      if (
        ((i = e.lanes | e.childLanes),
        (i |= Uc),
        ap(t, l, i, f, h, b),
        t === Rt && ((rt = Rt = null), (mt = 0)),
        (Ja = e),
        (Bl = t),
        (dl = l),
        (Qs = i),
        (Vs = u),
        (fm = a),
        (e.subtreeFlags & 10256) !== 0 || (e.flags & 10256) !== 0
          ? ((t.callbackNode = null),
            (t.callbackPriority = 0),
            C0(Eu, function () {
              return (Mm(), null);
            }))
          : ((t.callbackNode = null), (t.callbackPriority = 0)),
        (a = (e.flags & 13878) !== 0),
        (e.subtreeFlags & 13878) !== 0 || a)
      ) {
        ((a = U.T), (U.T = null), (u = R.p), (R.p = 2), (f = bt), (bt |= 4));
        try {
          v0(t, e, l);
        } finally {
          ((bt = f), (R.p = u), (U.T = a));
        }
      }
      ((Jt = 1), Em(), Tm(), Nm());
    }
  }
  function Em() {
    if (Jt === 1) {
      Jt = 0;
      var t = Bl,
        e = Ja,
        l = (e.flags & 13878) !== 0;
      if ((e.subtreeFlags & 13878) !== 0 || l) {
        ((l = U.T), (U.T = null));
        var a = R.p;
        R.p = 2;
        var u = bt;
        bt |= 4;
        try {
          am(e, t);
          var i = io,
            f = of(t.containerInfo),
            h = i.focusedElem,
            b = i.selectionRange;
          if (f !== h && h && h.ownerDocument && sf(h.ownerDocument.documentElement, h)) {
            if (b !== null && Oc(h)) {
              var C = b.start,
                k = b.end;
              if ((k === void 0 && (k = C), 'selectionStart' in h))
                ((h.selectionStart = C), (h.selectionEnd = Math.min(k, h.value.length)));
              else {
                var G = h.ownerDocument || document,
                  D = (G && G.defaultView) || window;
                if (D.getSelection) {
                  var O = D.getSelection(),
                    W = h.textContent.length,
                    et = Math.min(b.start, W),
                    Mt = b.end === void 0 ? et : Math.min(b.end, W);
                  !O.extend && et > Mt && ((f = Mt), (Mt = et), (et = f));
                  var A = cf(h, et),
                    x = cf(h, Mt);
                  if (
                    A &&
                    x &&
                    (O.rangeCount !== 1 ||
                      O.anchorNode !== A.node ||
                      O.anchorOffset !== A.offset ||
                      O.focusNode !== x.node ||
                      O.focusOffset !== x.offset)
                  ) {
                    var M = G.createRange();
                    (M.setStart(A.node, A.offset),
                      O.removeAllRanges(),
                      et > Mt
                        ? (O.addRange(M), O.extend(x.node, x.offset))
                        : (M.setEnd(x.node, x.offset), O.addRange(M)));
                  }
                }
              }
            }
            for (G = [], O = h; (O = O.parentNode); )
              O.nodeType === 1 && G.push({ element: O, left: O.scrollLeft, top: O.scrollTop });
            for (typeof h.focus == 'function' && h.focus(), h = 0; h < G.length; h++) {
              var L = G[h];
              ((L.element.scrollLeft = L.left), (L.element.scrollTop = L.top));
            }
          }
          ((ji = !!uo), (io = uo = null));
        } finally {
          ((bt = u), (R.p = a), (U.T = l));
        }
      }
      ((t.current = e), (Jt = 2));
    }
  }
  function Tm() {
    if (Jt === 2) {
      Jt = 0;
      var t = Bl,
        e = Ja,
        l = (e.flags & 8772) !== 0;
      if ((e.subtreeFlags & 8772) !== 0 || l) {
        ((l = U.T), (U.T = null));
        var a = R.p;
        R.p = 2;
        var u = bt;
        bt |= 4;
        try {
          Id(t, e.alternate, e);
        } finally {
          ((bt = u), (R.p = a), (U.T = l));
        }
      }
      Jt = 3;
    }
  }
  function Nm() {
    if (Jt === 4 || Jt === 3) {
      ((Jt = 0), $y());
      var t = Bl,
        e = Ja,
        l = dl,
        a = fm;
      (e.subtreeFlags & 10256) !== 0 || (e.flags & 10256) !== 0
        ? (Jt = 5)
        : ((Jt = 0), (Ja = Bl = null), Am(t, t.pendingLanes));
      var u = t.pendingLanes;
      if (
        (u === 0 && (Ul = null),
        dc(l),
        (e = e.stateNode),
        pe && typeof pe.onCommitFiberRoot == 'function')
      )
        try {
          pe.onCommitFiberRoot(yn, e, void 0, (e.current.flags & 128) === 128);
        } catch {}
      if (a !== null) {
        ((e = U.T), (u = R.p), (R.p = 2), (U.T = null));
        try {
          for (var i = t.onRecoverableError, f = 0; f < a.length; f++) {
            var h = a[f];
            i(h.value, { componentStack: h.stack });
          }
        } finally {
          ((U.T = e), (R.p = u));
        }
      }
      ((dl & 3) !== 0 && Si(),
        Ke(t),
        (u = t.pendingLanes),
        (l & 261930) !== 0 && (u & 42) !== 0 ? (t === Zs ? Wn++ : ((Wn = 0), (Zs = t))) : (Wn = 0),
        Fn(0));
    }
  }
  function Am(t, e) {
    (t.pooledCacheLanes &= e) === 0 &&
      ((e = t.pooledCache), e != null && ((t.pooledCache = null), On(e)));
  }
  function Si() {
    return (Em(), Tm(), Nm(), Mm());
  }
  function Mm() {
    if (Jt !== 5) return !1;
    var t = Bl,
      e = Qs;
    Qs = 0;
    var l = dc(dl),
      a = U.T,
      u = R.p;
    try {
      ((R.p = 32 > l ? 32 : l), (U.T = null), (l = Vs), (Vs = null));
      var i = Bl,
        f = dl;
      if (((Jt = 0), (Ja = Bl = null), (dl = 0), (bt & 6) !== 0)) throw Error(s(331));
      var h = bt;
      if (
        ((bt |= 4),
        sm(i.current),
        um(i, i.current, f, l),
        (bt = h),
        Fn(0, !1),
        pe && typeof pe.onPostCommitFiberRoot == 'function')
      )
        try {
          pe.onPostCommitFiberRoot(yn, i);
        } catch {}
      return !0;
    } finally {
      ((R.p = u), (U.T = a), Am(t, e));
    }
  }
  function Cm(t, e, l) {
    ((e = De(l, e)),
      (e = Ts(t.stateNode, e, 2)),
      (t = Dl(t, e, 2)),
      t !== null && (vn(t, 2), Ke(t)));
  }
  function Tt(t, e, l) {
    if (t.tag === 3) Cm(t, t, l);
    else
      for (; e !== null; ) {
        if (e.tag === 3) {
          Cm(e, t, l);
          break;
        } else if (e.tag === 1) {
          var a = e.stateNode;
          if (
            typeof e.type.getDerivedStateFromError == 'function' ||
            (typeof a.componentDidCatch == 'function' && (Ul === null || !Ul.has(a)))
          ) {
            ((t = De(l, t)),
              (l = Rd(2)),
              (a = Dl(e, l, 2)),
              a !== null && (Dd(l, a, e, t), vn(a, 2), Ke(a)));
            break;
          }
        }
        e = e.return;
      }
  }
  function Js(t, e, l) {
    var a = t.pingCache;
    if (a === null) {
      a = t.pingCache = new b0();
      var u = new Set();
      a.set(e, u);
    } else ((u = a.get(e)), u === void 0 && ((u = new Set()), a.set(e, u)));
    u.has(l) || ((Gs = !0), u.add(l), (t = N0.bind(null, t, e, l)), e.then(t, t));
  }
  function N0(t, e, l) {
    var a = t.pingCache;
    (a !== null && a.delete(e),
      (t.pingedLanes |= t.suspendedLanes & l),
      (t.warmLanes &= ~l),
      Rt === t &&
        (mt & l) === l &&
        (qt === 4 || (qt === 3 && (mt & 62914560) === mt && 300 > ye() - yi)
          ? (bt & 2) === 0 && Wa(t, 0)
          : (Ys |= l),
        $a === mt && ($a = 0)),
      Ke(t));
  }
  function Rm(t, e) {
    (e === 0 && (e = xr()), (t = la(t, e)), t !== null && (vn(t, e), Ke(t)));
  }
  function A0(t) {
    var e = t.memoizedState,
      l = 0;
    (e !== null && (l = e.retryLane), Rm(t, l));
  }
  function M0(t, e) {
    var l = 0;
    switch (t.tag) {
      case 31:
      case 13:
        var a = t.stateNode,
          u = t.memoizedState;
        u !== null && (l = u.retryLane);
        break;
      case 19:
        a = t.stateNode;
        break;
      case 22:
        a = t.stateNode._retryCache;
        break;
      default:
        throw Error(s(314));
    }
    (a !== null && a.delete(e), Rm(t, l));
  }
  function C0(t, e) {
    return sc(t, e);
  }
  var xi = null,
    Ia = null,
    Ws = !1,
    Ei = !1,
    Fs = !1,
    Ll = 0;
  function Ke(t) {
    (t !== Ia && t.next === null && (Ia === null ? (xi = Ia = t) : (Ia = Ia.next = t)),
      (Ei = !0),
      Ws || ((Ws = !0), D0()));
  }
  function Fn(t, e) {
    if (!Fs && Ei) {
      Fs = !0;
      do
        for (var l = !1, a = xi; a !== null; ) {
          if (t !== 0) {
            var u = a.pendingLanes;
            if (u === 0) var i = 0;
            else {
              var f = a.suspendedLanes,
                h = a.pingedLanes;
              ((i = (1 << (31 - ve(42 | t) + 1)) - 1),
                (i &= u & ~(f & ~h)),
                (i = i & 201326741 ? (i & 201326741) | 1 : i ? i | 2 : 0));
            }
            i !== 0 && ((l = !0), jm(a, i));
          } else
            ((i = mt),
              (i = Mu(
                a,
                a === Rt ? i : 0,
                a.cancelPendingCommit !== null || a.timeoutHandle !== -1
              )),
              (i & 3) === 0 || pn(a, i) || ((l = !0), jm(a, i)));
          a = a.next;
        }
      while (l);
      Fs = !1;
    }
  }
  function R0() {
    Dm();
  }
  function Dm() {
    Ei = Ws = !1;
    var t = 0;
    Ll !== 0 && q0() && (t = Ll);
    for (var e = ye(), l = null, a = xi; a !== null; ) {
      var u = a.next,
        i = Om(a, e);
      (i === 0
        ? ((a.next = null), l === null ? (xi = u) : (l.next = u), u === null && (Ia = l))
        : ((l = a), (t !== 0 || (i & 3) !== 0) && (Ei = !0)),
        (a = u));
    }
    ((Jt !== 0 && Jt !== 5) || Fn(t), Ll !== 0 && (Ll = 0));
  }
  function Om(t, e) {
    for (
      var l = t.suspendedLanes,
        a = t.pingedLanes,
        u = t.expirationTimes,
        i = t.pendingLanes & -62914561;
      0 < i;
    ) {
      var f = 31 - ve(i),
        h = 1 << f,
        b = u[f];
      (b === -1
        ? ((h & l) === 0 || (h & a) !== 0) && (u[f] = lp(h, e))
        : b <= e && (t.expiredLanes |= h),
        (i &= ~h));
    }
    if (
      ((e = Rt),
      (l = mt),
      (l = Mu(t, t === e ? l : 0, t.cancelPendingCommit !== null || t.timeoutHandle !== -1)),
      (a = t.callbackNode),
      l === 0 || (t === e && (Et === 2 || Et === 9)) || t.cancelPendingCommit !== null)
    )
      return (a !== null && a !== null && oc(a), (t.callbackNode = null), (t.callbackPriority = 0));
    if ((l & 3) === 0 || pn(t, l)) {
      if (((e = l & -l), e === t.callbackPriority)) return e;
      switch ((a !== null && oc(a), dc(l))) {
        case 2:
        case 8:
          l = br;
          break;
        case 32:
          l = Eu;
          break;
        case 268435456:
          l = Sr;
          break;
        default:
          l = Eu;
      }
      return (
        (a = zm.bind(null, t)),
        (l = sc(l, a)),
        (t.callbackPriority = e),
        (t.callbackNode = l),
        e
      );
    }
    return (
      a !== null && a !== null && oc(a),
      (t.callbackPriority = 2),
      (t.callbackNode = null),
      2
    );
  }
  function zm(t, e) {
    if (Jt !== 0 && Jt !== 5) return ((t.callbackNode = null), (t.callbackPriority = 0), null);
    var l = t.callbackNode;
    if (Si() && t.callbackNode !== l) return null;
    var a = mt;
    return (
      (a = Mu(t, t === Rt ? a : 0, t.cancelPendingCommit !== null || t.timeoutHandle !== -1)),
      a === 0
        ? null
        : (mm(t, a, e),
          Om(t, ye()),
          t.callbackNode != null && t.callbackNode === l ? zm.bind(null, t) : null)
    );
  }
  function jm(t, e) {
    if (Si()) return null;
    mm(t, e, !0);
  }
  function D0() {
    Y0(function () {
      (bt & 6) !== 0 ? sc(_r, R0) : Dm();
    });
  }
  function Is() {
    if (Ll === 0) {
      var t = Ba;
      (t === 0 && ((t = Tu), (Tu <<= 1), (Tu & 261888) === 0 && (Tu = 256)), (Ll = t));
    }
    return Ll;
  }
  function km(t) {
    return t == null || typeof t == 'symbol' || typeof t == 'boolean'
      ? null
      : typeof t == 'function'
        ? t
        : Ou('' + t);
  }
  function wm(t, e) {
    var l = e.ownerDocument.createElement('input');
    return (
      (l.name = e.name),
      (l.value = e.value),
      t.id && l.setAttribute('form', t.id),
      e.parentNode.insertBefore(l, e),
      (t = new FormData(t)),
      l.parentNode.removeChild(l),
      t
    );
  }
  function O0(t, e, l, a, u) {
    if (e === 'submit' && l && l.stateNode === u) {
      var i = km((u[ce] || null).action),
        f = a.submitter;
      f &&
        ((e = (e = f[ce] || null) ? km(e.formAction) : f.getAttribute('formAction')),
        e !== null && ((i = e), (f = null)));
      var h = new wu('action', 'action', null, a, u);
      t.push({
        event: h,
        listeners: [
          {
            instance: null,
            listener: function () {
              if (a.defaultPrevented) {
                if (Ll !== 0) {
                  var b = f ? wm(u, f) : new FormData(u);
                  gs(l, { pending: !0, data: b, method: u.method, action: i }, null, b);
                }
              } else
                typeof i == 'function' &&
                  (h.preventDefault(),
                  (b = f ? wm(u, f) : new FormData(u)),
                  gs(l, { pending: !0, data: b, method: u.method, action: i }, i, b));
            },
            currentTarget: u,
          },
        ],
      });
    }
  }
  for (var Ps = 0; Ps < wc.length; Ps++) {
    var to = wc[Ps],
      z0 = to.toLowerCase(),
      j0 = to[0].toUpperCase() + to.slice(1);
    He(z0, 'on' + j0);
  }
  (He(df, 'onAnimationEnd'),
    He(mf, 'onAnimationIteration'),
    He(hf, 'onAnimationStart'),
    He('dblclick', 'onDoubleClick'),
    He('focusin', 'onFocus'),
    He('focusout', 'onBlur'),
    He(Jp, 'onTransitionRun'),
    He(Wp, 'onTransitionStart'),
    He(Fp, 'onTransitionCancel'),
    He(yf, 'onTransitionEnd'),
    Ea('onMouseEnter', ['mouseout', 'mouseover']),
    Ea('onMouseLeave', ['mouseout', 'mouseover']),
    Ea('onPointerEnter', ['pointerout', 'pointerover']),
    Ea('onPointerLeave', ['pointerout', 'pointerover']),
    Il('onChange', 'change click focusin focusout input keydown keyup selectionchange'.split(' ')),
    Il(
      'onSelect',
      'focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange'.split(
        ' '
      )
    ),
    Il('onBeforeInput', ['compositionend', 'keypress', 'textInput', 'paste']),
    Il('onCompositionEnd', 'compositionend focusout keydown keypress keyup mousedown'.split(' ')),
    Il(
      'onCompositionStart',
      'compositionstart focusout keydown keypress keyup mousedown'.split(' ')
    ),
    Il(
      'onCompositionUpdate',
      'compositionupdate focusout keydown keypress keyup mousedown'.split(' ')
    ));
  var In =
      'abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting'.split(
        ' '
      ),
    k0 = new Set(
      'beforetoggle cancel close invalid load scroll scrollend toggle'.split(' ').concat(In)
    );
  function Um(t, e) {
    e = (e & 4) !== 0;
    for (var l = 0; l < t.length; l++) {
      var a = t[l],
        u = a.event;
      a = a.listeners;
      t: {
        var i = void 0;
        if (e)
          for (var f = a.length - 1; 0 <= f; f--) {
            var h = a[f],
              b = h.instance,
              C = h.currentTarget;
            if (((h = h.listener), b !== i && u.isPropagationStopped())) break t;
            ((i = h), (u.currentTarget = C));
            try {
              i(u);
            } catch (k) {
              Hu(k);
            }
            ((u.currentTarget = null), (i = b));
          }
        else
          for (f = 0; f < a.length; f++) {
            if (
              ((h = a[f]),
              (b = h.instance),
              (C = h.currentTarget),
              (h = h.listener),
              b !== i && u.isPropagationStopped())
            )
              break t;
            ((i = h), (u.currentTarget = C));
            try {
              i(u);
            } catch (k) {
              Hu(k);
            }
            ((u.currentTarget = null), (i = b));
          }
      }
    }
  }
  function ft(t, e) {
    var l = e[mc];
    l === void 0 && (l = e[mc] = new Set());
    var a = t + '__bubble';
    l.has(a) || (Bm(e, t, 2, !1), l.add(a));
  }
  function eo(t, e, l) {
    var a = 0;
    (e && (a |= 4), Bm(l, t, a, e));
  }
  var Ti = '_reactListening' + Math.random().toString(36).slice(2);
  function lo(t) {
    if (!t[Ti]) {
      ((t[Ti] = !0),
        Rr.forEach(function (l) {
          l !== 'selectionchange' && (k0.has(l) || eo(l, !1, t), eo(l, !0, t));
        }));
      var e = t.nodeType === 9 ? t : t.ownerDocument;
      e === null || e[Ti] || ((e[Ti] = !0), eo('selectionchange', !1, e));
    }
  }
  function Bm(t, e, l, a) {
    switch (dh(e)) {
      case 2:
        var u = sv;
        break;
      case 8:
        u = ov;
        break;
      default:
        u = go;
    }
    ((l = u.bind(null, e, l, t)),
      (u = void 0),
      !xc || (e !== 'touchstart' && e !== 'touchmove' && e !== 'wheel') || (u = !0),
      a
        ? u !== void 0
          ? t.addEventListener(e, l, { capture: !0, passive: u })
          : t.addEventListener(e, l, !0)
        : u !== void 0
          ? t.addEventListener(e, l, { passive: u })
          : t.addEventListener(e, l, !1));
  }
  function ao(t, e, l, a, u) {
    var i = a;
    if ((e & 1) === 0 && (e & 2) === 0 && a !== null)
      t: for (;;) {
        if (a === null) return;
        var f = a.tag;
        if (f === 3 || f === 4) {
          var h = a.stateNode.containerInfo;
          if (h === u) break;
          if (f === 4)
            for (f = a.return; f !== null; ) {
              var b = f.tag;
              if ((b === 3 || b === 4) && f.stateNode.containerInfo === u) return;
              f = f.return;
            }
          for (; h !== null; ) {
            if (((f = ba(h)), f === null)) return;
            if (((b = f.tag), b === 5 || b === 6 || b === 26 || b === 27)) {
              a = i = f;
              continue t;
            }
            h = h.parentNode;
          }
        }
        a = a.return;
      }
    Gr(function () {
      var C = i,
        k = bc(l),
        G = [];
      t: {
        var D = pf.get(t);
        if (D !== void 0) {
          var O = wu,
            W = t;
          switch (t) {
            case 'keypress':
              if (ju(l) === 0) break t;
            case 'keydown':
            case 'keyup':
              O = Mp;
              break;
            case 'focusin':
              ((W = 'focus'), (O = Ac));
              break;
            case 'focusout':
              ((W = 'blur'), (O = Ac));
              break;
            case 'beforeblur':
            case 'afterblur':
              O = Ac;
              break;
            case 'click':
              if (l.button === 2) break t;
            case 'auxclick':
            case 'dblclick':
            case 'mousedown':
            case 'mousemove':
            case 'mouseup':
            case 'mouseout':
            case 'mouseover':
            case 'contextmenu':
              O = Qr;
              break;
            case 'drag':
            case 'dragend':
            case 'dragenter':
            case 'dragexit':
            case 'dragleave':
            case 'dragover':
            case 'dragstart':
            case 'drop':
              O = yp;
              break;
            case 'touchcancel':
            case 'touchend':
            case 'touchmove':
            case 'touchstart':
              O = Dp;
              break;
            case df:
            case mf:
            case hf:
              O = gp;
              break;
            case yf:
              O = zp;
              break;
            case 'scroll':
            case 'scrollend':
              O = mp;
              break;
            case 'wheel':
              O = kp;
              break;
            case 'copy':
            case 'cut':
            case 'paste':
              O = bp;
              break;
            case 'gotpointercapture':
            case 'lostpointercapture':
            case 'pointercancel':
            case 'pointerdown':
            case 'pointermove':
            case 'pointerout':
            case 'pointerover':
            case 'pointerup':
              O = Zr;
              break;
            case 'toggle':
            case 'beforetoggle':
              O = Up;
          }
          var et = (e & 4) !== 0,
            Mt = !et && (t === 'scroll' || t === 'scrollend'),
            A = et ? (D !== null ? D + 'Capture' : null) : D;
          et = [];
          for (var x = C, M; x !== null; ) {
            var L = x;
            if (
              ((M = L.stateNode),
              (L = L.tag),
              (L !== 5 && L !== 26 && L !== 27) ||
                M === null ||
                A === null ||
                ((L = bn(x, A)), L != null && et.push(Pn(x, L, M))),
              Mt)
            )
              break;
            x = x.return;
          }
          0 < et.length && ((D = new O(D, W, null, l, k)), G.push({ event: D, listeners: et }));
        }
      }
      if ((e & 7) === 0) {
        t: {
          if (
            ((D = t === 'mouseover' || t === 'pointerover'),
            (O = t === 'mouseout' || t === 'pointerout'),
            D && l !== _c && (W = l.relatedTarget || l.fromElement) && (ba(W) || W[_a]))
          )
            break t;
          if (
            (O || D) &&
            ((D =
              k.window === k
                ? k
                : (D = k.ownerDocument)
                  ? D.defaultView || D.parentWindow
                  : window),
            O
              ? ((W = l.relatedTarget || l.toElement),
                (O = C),
                (W = W ? ba(W) : null),
                W !== null &&
                  ((Mt = d(W)), (et = W.tag), W !== Mt || (et !== 5 && et !== 27 && et !== 6)) &&
                  (W = null))
              : ((O = null), (W = C)),
            O !== W)
          ) {
            if (
              ((et = Qr),
              (L = 'onMouseLeave'),
              (A = 'onMouseEnter'),
              (x = 'mouse'),
              (t === 'pointerout' || t === 'pointerover') &&
                ((et = Zr), (L = 'onPointerLeave'), (A = 'onPointerEnter'), (x = 'pointer')),
              (Mt = O == null ? D : _n(O)),
              (M = W == null ? D : _n(W)),
              (D = new et(L, x + 'leave', O, l, k)),
              (D.target = Mt),
              (D.relatedTarget = M),
              (L = null),
              ba(k) === C &&
                ((et = new et(A, x + 'enter', W, l, k)),
                (et.target = M),
                (et.relatedTarget = Mt),
                (L = et)),
              (Mt = L),
              O && W)
            )
              e: {
                for (et = w0, A = O, x = W, M = 0, L = A; L; L = et(L)) M++;
                L = 0;
                for (var P = x; P; P = et(P)) L++;
                for (; 0 < M - L; ) ((A = et(A)), M--);
                for (; 0 < L - M; ) ((x = et(x)), L--);
                for (; M--; ) {
                  if (A === x || (x !== null && A === x.alternate)) {
                    et = A;
                    break e;
                  }
                  ((A = et(A)), (x = et(x)));
                }
                et = null;
              }
            else et = null;
            (O !== null && Hm(G, D, O, et, !1), W !== null && Mt !== null && Hm(G, Mt, W, et, !0));
          }
        }
        t: {
          if (
            ((D = C ? _n(C) : window),
            (O = D.nodeName && D.nodeName.toLowerCase()),
            O === 'select' || (O === 'input' && D.type === 'file'))
          )
            var gt = tf;
          else if (Ir(D))
            if (ef) gt = Zp;
            else {
              gt = Qp;
              var I = Xp;
            }
          else
            ((O = D.nodeName),
              !O || O.toLowerCase() !== 'input' || (D.type !== 'checkbox' && D.type !== 'radio')
                ? C && gc(C.elementType) && (gt = tf)
                : (gt = Vp));
          if (gt && (gt = gt(t, C))) {
            Pr(G, gt, l, k);
            break t;
          }
          (I && I(t, D, C),
            t === 'focusout' &&
              C &&
              D.type === 'number' &&
              C.memoizedProps.value != null &&
              vc(D, 'number', D.value));
        }
        switch (((I = C ? _n(C) : window), t)) {
          case 'focusin':
            (Ir(I) || I.contentEditable === 'true') && ((Ra = I), (zc = C), (Cn = null));
            break;
          case 'focusout':
            Cn = zc = Ra = null;
            break;
          case 'mousedown':
            jc = !0;
            break;
          case 'contextmenu':
          case 'mouseup':
          case 'dragend':
            ((jc = !1), rf(G, l, k));
            break;
          case 'selectionchange':
            if ($p) break;
          case 'keydown':
          case 'keyup':
            rf(G, l, k);
        }
        var st;
        if (Cc)
          t: {
            switch (t) {
              case 'compositionstart':
                var ht = 'onCompositionStart';
                break t;
              case 'compositionend':
                ht = 'onCompositionEnd';
                break t;
              case 'compositionupdate':
                ht = 'onCompositionUpdate';
                break t;
            }
            ht = void 0;
          }
        else
          Ca
            ? Wr(t, l) && (ht = 'onCompositionEnd')
            : t === 'keydown' && l.keyCode === 229 && (ht = 'onCompositionStart');
        (ht &&
          (Kr &&
            l.locale !== 'ko' &&
            (Ca || ht !== 'onCompositionStart'
              ? ht === 'onCompositionEnd' && Ca && (st = Yr())
              : ((El = k), (Ec = 'value' in El ? El.value : El.textContent), (Ca = !0))),
          (I = Ni(C, ht)),
          0 < I.length &&
            ((ht = new Vr(ht, t, null, l, k)),
            G.push({ event: ht, listeners: I }),
            st ? (ht.data = st) : ((st = Fr(l)), st !== null && (ht.data = st)))),
          (st = Hp ? Lp(t, l) : qp(t, l)) &&
            ((ht = Ni(C, 'onBeforeInput')),
            0 < ht.length &&
              ((I = new Vr('onBeforeInput', 'beforeinput', null, l, k)),
              G.push({ event: I, listeners: ht }),
              (I.data = st))),
          O0(G, t, C, l, k));
      }
      Um(G, e);
    });
  }
  function Pn(t, e, l) {
    return { instance: t, listener: e, currentTarget: l };
  }
  function Ni(t, e) {
    for (var l = e + 'Capture', a = []; t !== null; ) {
      var u = t,
        i = u.stateNode;
      if (
        ((u = u.tag),
        (u !== 5 && u !== 26 && u !== 27) ||
          i === null ||
          ((u = bn(t, l)),
          u != null && a.unshift(Pn(t, u, i)),
          (u = bn(t, e)),
          u != null && a.push(Pn(t, u, i))),
        t.tag === 3)
      )
        return a;
      t = t.return;
    }
    return [];
  }
  function w0(t) {
    if (t === null) return null;
    do t = t.return;
    while (t && t.tag !== 5 && t.tag !== 27);
    return t || null;
  }
  function Hm(t, e, l, a, u) {
    for (var i = e._reactName, f = []; l !== null && l !== a; ) {
      var h = l,
        b = h.alternate,
        C = h.stateNode;
      if (((h = h.tag), b !== null && b === a)) break;
      ((h !== 5 && h !== 26 && h !== 27) ||
        C === null ||
        ((b = C),
        u
          ? ((C = bn(l, i)), C != null && f.unshift(Pn(l, C, b)))
          : u || ((C = bn(l, i)), C != null && f.push(Pn(l, C, b)))),
        (l = l.return));
    }
    f.length !== 0 && t.push({ event: e, listeners: f });
  }
  var U0 = /\r\n?/g,
    B0 = /\u0000|\uFFFD/g;
  function Lm(t) {
    return (typeof t == 'string' ? t : '' + t)
      .replace(
        U0,
        `
`
      )
      .replace(B0, '');
  }
  function qm(t, e) {
    return ((e = Lm(e)), Lm(t) === e);
  }
  function At(t, e, l, a, u, i) {
    switch (l) {
      case 'children':
        typeof a == 'string'
          ? e === 'body' || (e === 'textarea' && a === '') || Na(t, a)
          : (typeof a == 'number' || typeof a == 'bigint') && e !== 'body' && Na(t, '' + a);
        break;
      case 'className':
        Ru(t, 'class', a);
        break;
      case 'tabIndex':
        Ru(t, 'tabindex', a);
        break;
      case 'dir':
      case 'role':
      case 'viewBox':
      case 'width':
      case 'height':
        Ru(t, l, a);
        break;
      case 'style':
        Lr(t, a, i);
        break;
      case 'data':
        if (e !== 'object') {
          Ru(t, 'data', a);
          break;
        }
      case 'src':
      case 'href':
        if (a === '' && (e !== 'a' || l !== 'href')) {
          t.removeAttribute(l);
          break;
        }
        if (a == null || typeof a == 'function' || typeof a == 'symbol' || typeof a == 'boolean') {
          t.removeAttribute(l);
          break;
        }
        ((a = Ou('' + a)), t.setAttribute(l, a));
        break;
      case 'action':
      case 'formAction':
        if (typeof a == 'function') {
          t.setAttribute(
            l,
            "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')"
          );
          break;
        } else
          typeof i == 'function' &&
            (l === 'formAction'
              ? (e !== 'input' && At(t, e, 'name', u.name, u, null),
                At(t, e, 'formEncType', u.formEncType, u, null),
                At(t, e, 'formMethod', u.formMethod, u, null),
                At(t, e, 'formTarget', u.formTarget, u, null))
              : (At(t, e, 'encType', u.encType, u, null),
                At(t, e, 'method', u.method, u, null),
                At(t, e, 'target', u.target, u, null)));
        if (a == null || typeof a == 'symbol' || typeof a == 'boolean') {
          t.removeAttribute(l);
          break;
        }
        ((a = Ou('' + a)), t.setAttribute(l, a));
        break;
      case 'onClick':
        a != null && (t.onclick = Fe);
        break;
      case 'onScroll':
        a != null && ft('scroll', t);
        break;
      case 'onScrollEnd':
        a != null && ft('scrollend', t);
        break;
      case 'dangerouslySetInnerHTML':
        if (a != null) {
          if (typeof a != 'object' || !('__html' in a)) throw Error(s(61));
          if (((l = a.__html), l != null)) {
            if (u.children != null) throw Error(s(60));
            t.innerHTML = l;
          }
        }
        break;
      case 'multiple':
        t.multiple = a && typeof a != 'function' && typeof a != 'symbol';
        break;
      case 'muted':
        t.muted = a && typeof a != 'function' && typeof a != 'symbol';
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
          t.removeAttribute('xlink:href');
          break;
        }
        ((l = Ou('' + a)), t.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', l));
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
          ? t.setAttribute(l, '' + a)
          : t.removeAttribute(l);
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
          ? t.setAttribute(l, '')
          : t.removeAttribute(l);
        break;
      case 'capture':
      case 'download':
        a === !0
          ? t.setAttribute(l, '')
          : a !== !1 && a != null && typeof a != 'function' && typeof a != 'symbol'
            ? t.setAttribute(l, a)
            : t.removeAttribute(l);
        break;
      case 'cols':
      case 'rows':
      case 'size':
      case 'span':
        a != null && typeof a != 'function' && typeof a != 'symbol' && !isNaN(a) && 1 <= a
          ? t.setAttribute(l, a)
          : t.removeAttribute(l);
        break;
      case 'rowSpan':
      case 'start':
        a == null || typeof a == 'function' || typeof a == 'symbol' || isNaN(a)
          ? t.removeAttribute(l)
          : t.setAttribute(l, a);
        break;
      case 'popover':
        (ft('beforetoggle', t), ft('toggle', t), Cu(t, 'popover', a));
        break;
      case 'xlinkActuate':
        We(t, 'http://www.w3.org/1999/xlink', 'xlink:actuate', a);
        break;
      case 'xlinkArcrole':
        We(t, 'http://www.w3.org/1999/xlink', 'xlink:arcrole', a);
        break;
      case 'xlinkRole':
        We(t, 'http://www.w3.org/1999/xlink', 'xlink:role', a);
        break;
      case 'xlinkShow':
        We(t, 'http://www.w3.org/1999/xlink', 'xlink:show', a);
        break;
      case 'xlinkTitle':
        We(t, 'http://www.w3.org/1999/xlink', 'xlink:title', a);
        break;
      case 'xlinkType':
        We(t, 'http://www.w3.org/1999/xlink', 'xlink:type', a);
        break;
      case 'xmlBase':
        We(t, 'http://www.w3.org/XML/1998/namespace', 'xml:base', a);
        break;
      case 'xmlLang':
        We(t, 'http://www.w3.org/XML/1998/namespace', 'xml:lang', a);
        break;
      case 'xmlSpace':
        We(t, 'http://www.w3.org/XML/1998/namespace', 'xml:space', a);
        break;
      case 'is':
        Cu(t, 'is', a);
        break;
      case 'innerText':
      case 'textContent':
        break;
      default:
        (!(2 < l.length) || (l[0] !== 'o' && l[0] !== 'O') || (l[1] !== 'n' && l[1] !== 'N')) &&
          ((l = fp.get(l) || l), Cu(t, l, a));
    }
  }
  function no(t, e, l, a, u, i) {
    switch (l) {
      case 'style':
        Lr(t, a, i);
        break;
      case 'dangerouslySetInnerHTML':
        if (a != null) {
          if (typeof a != 'object' || !('__html' in a)) throw Error(s(61));
          if (((l = a.__html), l != null)) {
            if (u.children != null) throw Error(s(60));
            t.innerHTML = l;
          }
        }
        break;
      case 'children':
        typeof a == 'string'
          ? Na(t, a)
          : (typeof a == 'number' || typeof a == 'bigint') && Na(t, '' + a);
        break;
      case 'onScroll':
        a != null && ft('scroll', t);
        break;
      case 'onScrollEnd':
        a != null && ft('scrollend', t);
        break;
      case 'onClick':
        a != null && (t.onclick = Fe);
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
        if (!Dr.hasOwnProperty(l))
          t: {
            if (
              l[0] === 'o' &&
              l[1] === 'n' &&
              ((u = l.endsWith('Capture')),
              (e = l.slice(2, u ? l.length - 7 : void 0)),
              (i = t[ce] || null),
              (i = i != null ? i[l] : null),
              typeof i == 'function' && t.removeEventListener(e, i, u),
              typeof a == 'function')
            ) {
              (typeof i != 'function' &&
                i !== null &&
                (l in t ? (t[l] = null) : t.hasAttribute(l) && t.removeAttribute(l)),
                t.addEventListener(e, a, u));
              break t;
            }
            l in t ? (t[l] = a) : a === !0 ? t.setAttribute(l, '') : Cu(t, l, a);
          }
    }
  }
  function le(t, e, l) {
    switch (e) {
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
        (ft('error', t), ft('load', t));
        var a = !1,
          u = !1,
          i;
        for (i in l)
          if (l.hasOwnProperty(i)) {
            var f = l[i];
            if (f != null)
              switch (i) {
                case 'src':
                  a = !0;
                  break;
                case 'srcSet':
                  u = !0;
                  break;
                case 'children':
                case 'dangerouslySetInnerHTML':
                  throw Error(s(137, e));
                default:
                  At(t, e, i, f, l, null);
              }
          }
        (u && At(t, e, 'srcSet', l.srcSet, l, null), a && At(t, e, 'src', l.src, l, null));
        return;
      case 'input':
        ft('invalid', t);
        var h = (i = f = u = null),
          b = null,
          C = null;
        for (a in l)
          if (l.hasOwnProperty(a)) {
            var k = l[a];
            if (k != null)
              switch (a) {
                case 'name':
                  u = k;
                  break;
                case 'type':
                  f = k;
                  break;
                case 'checked':
                  b = k;
                  break;
                case 'defaultChecked':
                  C = k;
                  break;
                case 'value':
                  i = k;
                  break;
                case 'defaultValue':
                  h = k;
                  break;
                case 'children':
                case 'dangerouslySetInnerHTML':
                  if (k != null) throw Error(s(137, e));
                  break;
                default:
                  At(t, e, a, k, l, null);
              }
          }
        wr(t, i, h, b, C, f, u, !1);
        return;
      case 'select':
        (ft('invalid', t), (a = f = i = null));
        for (u in l)
          if (l.hasOwnProperty(u) && ((h = l[u]), h != null))
            switch (u) {
              case 'value':
                i = h;
                break;
              case 'defaultValue':
                f = h;
                break;
              case 'multiple':
                a = h;
              default:
                At(t, e, u, h, l, null);
            }
        ((e = i),
          (l = f),
          (t.multiple = !!a),
          e != null ? Ta(t, !!a, e, !1) : l != null && Ta(t, !!a, l, !0));
        return;
      case 'textarea':
        (ft('invalid', t), (i = u = a = null));
        for (f in l)
          if (l.hasOwnProperty(f) && ((h = l[f]), h != null))
            switch (f) {
              case 'value':
                a = h;
                break;
              case 'defaultValue':
                u = h;
                break;
              case 'children':
                i = h;
                break;
              case 'dangerouslySetInnerHTML':
                if (h != null) throw Error(s(91));
                break;
              default:
                At(t, e, f, h, l, null);
            }
        Br(t, a, u, i);
        return;
      case 'option':
        for (b in l)
          if (l.hasOwnProperty(b) && ((a = l[b]), a != null))
            switch (b) {
              case 'selected':
                t.selected = a && typeof a != 'function' && typeof a != 'symbol';
                break;
              default:
                At(t, e, b, a, l, null);
            }
        return;
      case 'dialog':
        (ft('beforetoggle', t), ft('toggle', t), ft('cancel', t), ft('close', t));
        break;
      case 'iframe':
      case 'object':
        ft('load', t);
        break;
      case 'video':
      case 'audio':
        for (a = 0; a < In.length; a++) ft(In[a], t);
        break;
      case 'image':
        (ft('error', t), ft('load', t));
        break;
      case 'details':
        ft('toggle', t);
        break;
      case 'embed':
      case 'source':
      case 'link':
        (ft('error', t), ft('load', t));
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
        for (C in l)
          if (l.hasOwnProperty(C) && ((a = l[C]), a != null))
            switch (C) {
              case 'children':
              case 'dangerouslySetInnerHTML':
                throw Error(s(137, e));
              default:
                At(t, e, C, a, l, null);
            }
        return;
      default:
        if (gc(e)) {
          for (k in l)
            l.hasOwnProperty(k) && ((a = l[k]), a !== void 0 && no(t, e, k, a, l, void 0));
          return;
        }
    }
    for (h in l) l.hasOwnProperty(h) && ((a = l[h]), a != null && At(t, e, h, a, l, null));
  }
  function H0(t, e, l, a) {
    switch (e) {
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
          i = null,
          f = null,
          h = null,
          b = null,
          C = null,
          k = null;
        for (O in l) {
          var G = l[O];
          if (l.hasOwnProperty(O) && G != null)
            switch (O) {
              case 'checked':
                break;
              case 'value':
                break;
              case 'defaultValue':
                b = G;
              default:
                a.hasOwnProperty(O) || At(t, e, O, null, a, G);
            }
        }
        for (var D in a) {
          var O = a[D];
          if (((G = l[D]), a.hasOwnProperty(D) && (O != null || G != null)))
            switch (D) {
              case 'type':
                i = O;
                break;
              case 'name':
                u = O;
                break;
              case 'checked':
                C = O;
                break;
              case 'defaultChecked':
                k = O;
                break;
              case 'value':
                f = O;
                break;
              case 'defaultValue':
                h = O;
                break;
              case 'children':
              case 'dangerouslySetInnerHTML':
                if (O != null) throw Error(s(137, e));
                break;
              default:
                O !== G && At(t, e, D, O, a, G);
            }
        }
        pc(t, f, h, b, C, k, i, u);
        return;
      case 'select':
        O = f = h = D = null;
        for (i in l)
          if (((b = l[i]), l.hasOwnProperty(i) && b != null))
            switch (i) {
              case 'value':
                break;
              case 'multiple':
                O = b;
              default:
                a.hasOwnProperty(i) || At(t, e, i, null, a, b);
            }
        for (u in a)
          if (((i = a[u]), (b = l[u]), a.hasOwnProperty(u) && (i != null || b != null)))
            switch (u) {
              case 'value':
                D = i;
                break;
              case 'defaultValue':
                h = i;
                break;
              case 'multiple':
                f = i;
              default:
                i !== b && At(t, e, u, i, a, b);
            }
        ((e = h),
          (l = f),
          (a = O),
          D != null
            ? Ta(t, !!l, D, !1)
            : !!a != !!l && (e != null ? Ta(t, !!l, e, !0) : Ta(t, !!l, l ? [] : '', !1)));
        return;
      case 'textarea':
        O = D = null;
        for (h in l)
          if (((u = l[h]), l.hasOwnProperty(h) && u != null && !a.hasOwnProperty(h)))
            switch (h) {
              case 'value':
                break;
              case 'children':
                break;
              default:
                At(t, e, h, null, a, u);
            }
        for (f in a)
          if (((u = a[f]), (i = l[f]), a.hasOwnProperty(f) && (u != null || i != null)))
            switch (f) {
              case 'value':
                D = u;
                break;
              case 'defaultValue':
                O = u;
                break;
              case 'children':
                break;
              case 'dangerouslySetInnerHTML':
                if (u != null) throw Error(s(91));
                break;
              default:
                u !== i && At(t, e, f, u, a, i);
            }
        Ur(t, D, O);
        return;
      case 'option':
        for (var W in l)
          if (((D = l[W]), l.hasOwnProperty(W) && D != null && !a.hasOwnProperty(W)))
            switch (W) {
              case 'selected':
                t.selected = !1;
                break;
              default:
                At(t, e, W, null, a, D);
            }
        for (b in a)
          if (((D = a[b]), (O = l[b]), a.hasOwnProperty(b) && D !== O && (D != null || O != null)))
            switch (b) {
              case 'selected':
                t.selected = D && typeof D != 'function' && typeof D != 'symbol';
                break;
              default:
                At(t, e, b, D, a, O);
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
        for (var et in l)
          ((D = l[et]),
            l.hasOwnProperty(et) && D != null && !a.hasOwnProperty(et) && At(t, e, et, null, a, D));
        for (C in a)
          if (((D = a[C]), (O = l[C]), a.hasOwnProperty(C) && D !== O && (D != null || O != null)))
            switch (C) {
              case 'children':
              case 'dangerouslySetInnerHTML':
                if (D != null) throw Error(s(137, e));
                break;
              default:
                At(t, e, C, D, a, O);
            }
        return;
      default:
        if (gc(e)) {
          for (var Mt in l)
            ((D = l[Mt]),
              l.hasOwnProperty(Mt) &&
                D !== void 0 &&
                !a.hasOwnProperty(Mt) &&
                no(t, e, Mt, void 0, a, D));
          for (k in a)
            ((D = a[k]),
              (O = l[k]),
              !a.hasOwnProperty(k) ||
                D === O ||
                (D === void 0 && O === void 0) ||
                no(t, e, k, D, a, O));
          return;
        }
    }
    for (var A in l)
      ((D = l[A]),
        l.hasOwnProperty(A) && D != null && !a.hasOwnProperty(A) && At(t, e, A, null, a, D));
    for (G in a)
      ((D = a[G]),
        (O = l[G]),
        !a.hasOwnProperty(G) || D === O || (D == null && O == null) || At(t, e, G, D, a, O));
  }
  function Gm(t) {
    switch (t) {
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
  function L0() {
    if (typeof performance.getEntriesByType == 'function') {
      for (
        var t = 0, e = 0, l = performance.getEntriesByType('resource'), a = 0;
        a < l.length;
        a++
      ) {
        var u = l[a],
          i = u.transferSize,
          f = u.initiatorType,
          h = u.duration;
        if (i && h && Gm(f)) {
          for (f = 0, h = u.responseEnd, a += 1; a < l.length; a++) {
            var b = l[a],
              C = b.startTime;
            if (C > h) break;
            var k = b.transferSize,
              G = b.initiatorType;
            k && Gm(G) && ((b = b.responseEnd), (f += k * (b < h ? 1 : (h - C) / (b - C))));
          }
          if ((--a, (e += (8 * (i + f)) / (u.duration / 1e3)), t++, 10 < t)) break;
        }
      }
      if (0 < t) return e / t / 1e6;
    }
    return navigator.connection && ((t = navigator.connection.downlink), typeof t == 'number')
      ? t
      : 5;
  }
  var uo = null,
    io = null;
  function Ai(t) {
    return t.nodeType === 9 ? t : t.ownerDocument;
  }
  function Ym(t) {
    switch (t) {
      case 'http://www.w3.org/2000/svg':
        return 1;
      case 'http://www.w3.org/1998/Math/MathML':
        return 2;
      default:
        return 0;
    }
  }
  function Xm(t, e) {
    if (t === 0)
      switch (e) {
        case 'svg':
          return 1;
        case 'math':
          return 2;
        default:
          return 0;
      }
    return t === 1 && e === 'foreignObject' ? 0 : t;
  }
  function co(t, e) {
    return (
      t === 'textarea' ||
      t === 'noscript' ||
      typeof e.children == 'string' ||
      typeof e.children == 'number' ||
      typeof e.children == 'bigint' ||
      (typeof e.dangerouslySetInnerHTML == 'object' &&
        e.dangerouslySetInnerHTML !== null &&
        e.dangerouslySetInnerHTML.__html != null)
    );
  }
  var so = null;
  function q0() {
    var t = window.event;
    return t && t.type === 'popstate' ? (t === so ? !1 : ((so = t), !0)) : ((so = null), !1);
  }
  var Qm = typeof setTimeout == 'function' ? setTimeout : void 0,
    G0 = typeof clearTimeout == 'function' ? clearTimeout : void 0,
    Vm = typeof Promise == 'function' ? Promise : void 0,
    Y0 =
      typeof queueMicrotask == 'function'
        ? queueMicrotask
        : typeof Vm < 'u'
          ? function (t) {
              return Vm.resolve(null).then(t).catch(X0);
            }
          : Qm;
  function X0(t) {
    setTimeout(function () {
      throw t;
    });
  }
  function ql(t) {
    return t === 'head';
  }
  function Zm(t, e) {
    var l = e,
      a = 0;
    do {
      var u = l.nextSibling;
      if ((t.removeChild(l), u && u.nodeType === 8))
        if (((l = u.data), l === '/$' || l === '/&')) {
          if (a === 0) {
            (t.removeChild(u), ln(e));
            return;
          }
          a--;
        } else if (l === '$' || l === '$?' || l === '$~' || l === '$!' || l === '&') a++;
        else if (l === 'html') tu(t.ownerDocument.documentElement);
        else if (l === 'head') {
          ((l = t.ownerDocument.head), tu(l));
          for (var i = l.firstChild; i; ) {
            var f = i.nextSibling,
              h = i.nodeName;
            (i[gn] ||
              h === 'SCRIPT' ||
              h === 'STYLE' ||
              (h === 'LINK' && i.rel.toLowerCase() === 'stylesheet') ||
              l.removeChild(i),
              (i = f));
          }
        } else l === 'body' && tu(t.ownerDocument.body);
      l = u;
    } while (l);
    ln(e);
  }
  function Km(t, e) {
    var l = t;
    t = 0;
    do {
      var a = l.nextSibling;
      if (
        (l.nodeType === 1
          ? e
            ? ((l._stashedDisplay = l.style.display), (l.style.display = 'none'))
            : ((l.style.display = l._stashedDisplay || ''),
              l.getAttribute('style') === '' && l.removeAttribute('style'))
          : l.nodeType === 3 &&
            (e
              ? ((l._stashedText = l.nodeValue), (l.nodeValue = ''))
              : (l.nodeValue = l._stashedText || '')),
        a && a.nodeType === 8)
      )
        if (((l = a.data), l === '/$')) {
          if (t === 0) break;
          t--;
        } else (l !== '$' && l !== '$?' && l !== '$~' && l !== '$!') || t++;
      l = a;
    } while (l);
  }
  function oo(t) {
    var e = t.firstChild;
    for (e && e.nodeType === 10 && (e = e.nextSibling); e; ) {
      var l = e;
      switch (((e = e.nextSibling), l.nodeName)) {
        case 'HTML':
        case 'HEAD':
        case 'BODY':
          (oo(l), hc(l));
          continue;
        case 'SCRIPT':
        case 'STYLE':
          continue;
        case 'LINK':
          if (l.rel.toLowerCase() === 'stylesheet') continue;
      }
      t.removeChild(l);
    }
  }
  function Q0(t, e, l, a) {
    for (; t.nodeType === 1; ) {
      var u = l;
      if (t.nodeName.toLowerCase() !== e.toLowerCase()) {
        if (!a && (t.nodeName !== 'INPUT' || t.type !== 'hidden')) break;
      } else if (a) {
        if (!t[gn])
          switch (e) {
            case 'meta':
              if (!t.hasAttribute('itemprop')) break;
              return t;
            case 'link':
              if (
                ((i = t.getAttribute('rel')),
                i === 'stylesheet' && t.hasAttribute('data-precedence'))
              )
                break;
              if (
                i !== u.rel ||
                t.getAttribute('href') !== (u.href == null || u.href === '' ? null : u.href) ||
                t.getAttribute('crossorigin') !== (u.crossOrigin == null ? null : u.crossOrigin) ||
                t.getAttribute('title') !== (u.title == null ? null : u.title)
              )
                break;
              return t;
            case 'style':
              if (t.hasAttribute('data-precedence')) break;
              return t;
            case 'script':
              if (
                ((i = t.getAttribute('src')),
                (i !== (u.src == null ? null : u.src) ||
                  t.getAttribute('type') !== (u.type == null ? null : u.type) ||
                  t.getAttribute('crossorigin') !==
                    (u.crossOrigin == null ? null : u.crossOrigin)) &&
                  i &&
                  t.hasAttribute('async') &&
                  !t.hasAttribute('itemprop'))
              )
                break;
              return t;
            default:
              return t;
          }
      } else if (e === 'input' && t.type === 'hidden') {
        var i = u.name == null ? null : '' + u.name;
        if (u.type === 'hidden' && t.getAttribute('name') === i) return t;
      } else return t;
      if (((t = we(t.nextSibling)), t === null)) break;
    }
    return null;
  }
  function V0(t, e, l) {
    if (e === '') return null;
    for (; t.nodeType !== 3; )
      if (
        ((t.nodeType !== 1 || t.nodeName !== 'INPUT' || t.type !== 'hidden') && !l) ||
        ((t = we(t.nextSibling)), t === null)
      )
        return null;
    return t;
  }
  function $m(t, e) {
    for (; t.nodeType !== 8; )
      if (
        ((t.nodeType !== 1 || t.nodeName !== 'INPUT' || t.type !== 'hidden') && !e) ||
        ((t = we(t.nextSibling)), t === null)
      )
        return null;
    return t;
  }
  function ro(t) {
    return t.data === '$?' || t.data === '$~';
  }
  function fo(t) {
    return t.data === '$!' || (t.data === '$?' && t.ownerDocument.readyState !== 'loading');
  }
  function Z0(t, e) {
    var l = t.ownerDocument;
    if (t.data === '$~') t._reactRetry = e;
    else if (t.data !== '$?' || l.readyState !== 'loading') e();
    else {
      var a = function () {
        (e(), l.removeEventListener('DOMContentLoaded', a));
      };
      (l.addEventListener('DOMContentLoaded', a), (t._reactRetry = a));
    }
  }
  function we(t) {
    for (; t != null; t = t.nextSibling) {
      var e = t.nodeType;
      if (e === 1 || e === 3) break;
      if (e === 8) {
        if (
          ((e = t.data),
          e === '$' ||
            e === '$!' ||
            e === '$?' ||
            e === '$~' ||
            e === '&' ||
            e === 'F!' ||
            e === 'F')
        )
          break;
        if (e === '/$' || e === '/&') return null;
      }
    }
    return t;
  }
  var mo = null;
  function Jm(t) {
    t = t.nextSibling;
    for (var e = 0; t; ) {
      if (t.nodeType === 8) {
        var l = t.data;
        if (l === '/$' || l === '/&') {
          if (e === 0) return we(t.nextSibling);
          e--;
        } else (l !== '$' && l !== '$!' && l !== '$?' && l !== '$~' && l !== '&') || e++;
      }
      t = t.nextSibling;
    }
    return null;
  }
  function Wm(t) {
    t = t.previousSibling;
    for (var e = 0; t; ) {
      if (t.nodeType === 8) {
        var l = t.data;
        if (l === '$' || l === '$!' || l === '$?' || l === '$~' || l === '&') {
          if (e === 0) return t;
          e--;
        } else (l !== '/$' && l !== '/&') || e++;
      }
      t = t.previousSibling;
    }
    return null;
  }
  function Fm(t, e, l) {
    switch (((e = Ai(l)), t)) {
      case 'html':
        if (((t = e.documentElement), !t)) throw Error(s(452));
        return t;
      case 'head':
        if (((t = e.head), !t)) throw Error(s(453));
        return t;
      case 'body':
        if (((t = e.body), !t)) throw Error(s(454));
        return t;
      default:
        throw Error(s(451));
    }
  }
  function tu(t) {
    for (var e = t.attributes; e.length; ) t.removeAttributeNode(e[0]);
    hc(t);
  }
  var Ue = new Map(),
    Im = new Set();
  function Mi(t) {
    return typeof t.getRootNode == 'function'
      ? t.getRootNode()
      : t.nodeType === 9
        ? t
        : t.ownerDocument;
  }
  var ml = R.d;
  R.d = { f: K0, r: $0, D: J0, C: W0, L: F0, m: I0, X: tv, S: P0, M: ev };
  function K0() {
    var t = ml.f(),
      e = gi();
    return t || e;
  }
  function $0(t) {
    var e = Sa(t);
    e !== null && e.tag === 5 && e.type === 'form' ? yd(e) : ml.r(t);
  }
  var Pa = typeof document > 'u' ? null : document;
  function Pm(t, e, l) {
    var a = Pa;
    if (a && typeof e == 'string' && e) {
      var u = Ce(e);
      ((u = 'link[rel="' + t + '"][href="' + u + '"]'),
        typeof l == 'string' && (u += '[crossorigin="' + l + '"]'),
        Im.has(u) ||
          (Im.add(u),
          (t = { rel: t, crossOrigin: l, href: e }),
          a.querySelector(u) === null &&
            ((e = a.createElement('link')), le(e, 'link', t), Wt(e), a.head.appendChild(e))));
    }
  }
  function J0(t) {
    (ml.D(t), Pm('dns-prefetch', t, null));
  }
  function W0(t, e) {
    (ml.C(t, e), Pm('preconnect', t, e));
  }
  function F0(t, e, l) {
    ml.L(t, e, l);
    var a = Pa;
    if (a && t && e) {
      var u = 'link[rel="preload"][as="' + Ce(e) + '"]';
      e === 'image' && l && l.imageSrcSet
        ? ((u += '[imagesrcset="' + Ce(l.imageSrcSet) + '"]'),
          typeof l.imageSizes == 'string' && (u += '[imagesizes="' + Ce(l.imageSizes) + '"]'))
        : (u += '[href="' + Ce(t) + '"]');
      var i = u;
      switch (e) {
        case 'style':
          i = tn(t);
          break;
        case 'script':
          i = en(t);
      }
      Ue.has(i) ||
        ((t = _(
          { rel: 'preload', href: e === 'image' && l && l.imageSrcSet ? void 0 : t, as: e },
          l
        )),
        Ue.set(i, t),
        a.querySelector(u) !== null ||
          (e === 'style' && a.querySelector(eu(i))) ||
          (e === 'script' && a.querySelector(lu(i))) ||
          ((e = a.createElement('link')), le(e, 'link', t), Wt(e), a.head.appendChild(e)));
    }
  }
  function I0(t, e) {
    ml.m(t, e);
    var l = Pa;
    if (l && t) {
      var a = e && typeof e.as == 'string' ? e.as : 'script',
        u = 'link[rel="modulepreload"][as="' + Ce(a) + '"][href="' + Ce(t) + '"]',
        i = u;
      switch (a) {
        case 'audioworklet':
        case 'paintworklet':
        case 'serviceworker':
        case 'sharedworker':
        case 'worker':
        case 'script':
          i = en(t);
      }
      if (
        !Ue.has(i) &&
        ((t = _({ rel: 'modulepreload', href: t }, e)), Ue.set(i, t), l.querySelector(u) === null)
      ) {
        switch (a) {
          case 'audioworklet':
          case 'paintworklet':
          case 'serviceworker':
          case 'sharedworker':
          case 'worker':
          case 'script':
            if (l.querySelector(lu(i))) return;
        }
        ((a = l.createElement('link')), le(a, 'link', t), Wt(a), l.head.appendChild(a));
      }
    }
  }
  function P0(t, e, l) {
    ml.S(t, e, l);
    var a = Pa;
    if (a && t) {
      var u = xa(a).hoistableStyles,
        i = tn(t);
      e = e || 'default';
      var f = u.get(i);
      if (!f) {
        var h = { loading: 0, preload: null };
        if ((f = a.querySelector(eu(i)))) h.loading = 5;
        else {
          ((t = _({ rel: 'stylesheet', href: t, 'data-precedence': e }, l)),
            (l = Ue.get(i)) && ho(t, l));
          var b = (f = a.createElement('link'));
          (Wt(b),
            le(b, 'link', t),
            (b._p = new Promise(function (C, k) {
              ((b.onload = C), (b.onerror = k));
            })),
            b.addEventListener('load', function () {
              h.loading |= 1;
            }),
            b.addEventListener('error', function () {
              h.loading |= 2;
            }),
            (h.loading |= 4),
            Ci(f, e, a));
        }
        ((f = { type: 'stylesheet', instance: f, count: 1, state: h }), u.set(i, f));
      }
    }
  }
  function tv(t, e) {
    ml.X(t, e);
    var l = Pa;
    if (l && t) {
      var a = xa(l).hoistableScripts,
        u = en(t),
        i = a.get(u);
      i ||
        ((i = l.querySelector(lu(u))),
        i ||
          ((t = _({ src: t, async: !0 }, e)),
          (e = Ue.get(u)) && yo(t, e),
          (i = l.createElement('script')),
          Wt(i),
          le(i, 'link', t),
          l.head.appendChild(i)),
        (i = { type: 'script', instance: i, count: 1, state: null }),
        a.set(u, i));
    }
  }
  function ev(t, e) {
    ml.M(t, e);
    var l = Pa;
    if (l && t) {
      var a = xa(l).hoistableScripts,
        u = en(t),
        i = a.get(u);
      i ||
        ((i = l.querySelector(lu(u))),
        i ||
          ((t = _({ src: t, async: !0, type: 'module' }, e)),
          (e = Ue.get(u)) && yo(t, e),
          (i = l.createElement('script')),
          Wt(i),
          le(i, 'link', t),
          l.head.appendChild(i)),
        (i = { type: 'script', instance: i, count: 1, state: null }),
        a.set(u, i));
    }
  }
  function th(t, e, l, a) {
    var u = (u = ot.current) ? Mi(u) : null;
    if (!u) throw Error(s(446));
    switch (t) {
      case 'meta':
      case 'title':
        return null;
      case 'style':
        return typeof l.precedence == 'string' && typeof l.href == 'string'
          ? ((e = tn(l.href)),
            (l = xa(u).hoistableStyles),
            (a = l.get(e)),
            a || ((a = { type: 'style', instance: null, count: 0, state: null }), l.set(e, a)),
            a)
          : { type: 'void', instance: null, count: 0, state: null };
      case 'link':
        if (
          l.rel === 'stylesheet' &&
          typeof l.href == 'string' &&
          typeof l.precedence == 'string'
        ) {
          t = tn(l.href);
          var i = xa(u).hoistableStyles,
            f = i.get(t);
          if (
            (f ||
              ((u = u.ownerDocument || u),
              (f = {
                type: 'stylesheet',
                instance: null,
                count: 0,
                state: { loading: 0, preload: null },
              }),
              i.set(t, f),
              (i = u.querySelector(eu(t))) && !i._p && ((f.instance = i), (f.state.loading = 5)),
              Ue.has(t) ||
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
                Ue.set(t, l),
                i || lv(u, t, l, f.state))),
            e && a === null)
          )
            throw Error(s(528, ''));
          return f;
        }
        if (e && a !== null) throw Error(s(529, ''));
        return null;
      case 'script':
        return (
          (e = l.async),
          (l = l.src),
          typeof l == 'string' && e && typeof e != 'function' && typeof e != 'symbol'
            ? ((e = en(l)),
              (l = xa(u).hoistableScripts),
              (a = l.get(e)),
              a || ((a = { type: 'script', instance: null, count: 0, state: null }), l.set(e, a)),
              a)
            : { type: 'void', instance: null, count: 0, state: null }
        );
      default:
        throw Error(s(444, t));
    }
  }
  function tn(t) {
    return 'href="' + Ce(t) + '"';
  }
  function eu(t) {
    return 'link[rel="stylesheet"][' + t + ']';
  }
  function eh(t) {
    return _({}, t, { 'data-precedence': t.precedence, precedence: null });
  }
  function lv(t, e, l, a) {
    t.querySelector('link[rel="preload"][as="style"][' + e + ']')
      ? (a.loading = 1)
      : ((e = t.createElement('link')),
        (a.preload = e),
        e.addEventListener('load', function () {
          return (a.loading |= 1);
        }),
        e.addEventListener('error', function () {
          return (a.loading |= 2);
        }),
        le(e, 'link', l),
        Wt(e),
        t.head.appendChild(e));
  }
  function en(t) {
    return '[src="' + Ce(t) + '"]';
  }
  function lu(t) {
    return 'script[async]' + t;
  }
  function lh(t, e, l) {
    if ((e.count++, e.instance === null))
      switch (e.type) {
        case 'style':
          var a = t.querySelector('style[data-href~="' + Ce(l.href) + '"]');
          if (a) return ((e.instance = a), Wt(a), a);
          var u = _({}, l, {
            'data-href': l.href,
            'data-precedence': l.precedence,
            href: null,
            precedence: null,
          });
          return (
            (a = (t.ownerDocument || t).createElement('style')),
            Wt(a),
            le(a, 'style', u),
            Ci(a, l.precedence, t),
            (e.instance = a)
          );
        case 'stylesheet':
          u = tn(l.href);
          var i = t.querySelector(eu(u));
          if (i) return ((e.state.loading |= 4), (e.instance = i), Wt(i), i);
          ((a = eh(l)),
            (u = Ue.get(u)) && ho(a, u),
            (i = (t.ownerDocument || t).createElement('link')),
            Wt(i));
          var f = i;
          return (
            (f._p = new Promise(function (h, b) {
              ((f.onload = h), (f.onerror = b));
            })),
            le(i, 'link', a),
            (e.state.loading |= 4),
            Ci(i, l.precedence, t),
            (e.instance = i)
          );
        case 'script':
          return (
            (i = en(l.src)),
            (u = t.querySelector(lu(i)))
              ? ((e.instance = u), Wt(u), u)
              : ((a = l),
                (u = Ue.get(i)) && ((a = _({}, l)), yo(a, u)),
                (t = t.ownerDocument || t),
                (u = t.createElement('script')),
                Wt(u),
                le(u, 'link', a),
                t.head.appendChild(u),
                (e.instance = u))
          );
        case 'void':
          return null;
        default:
          throw Error(s(443, e.type));
      }
    else
      e.type === 'stylesheet' &&
        (e.state.loading & 4) === 0 &&
        ((a = e.instance), (e.state.loading |= 4), Ci(a, l.precedence, t));
    return e.instance;
  }
  function Ci(t, e, l) {
    for (
      var a = l.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),
        u = a.length ? a[a.length - 1] : null,
        i = u,
        f = 0;
      f < a.length;
      f++
    ) {
      var h = a[f];
      if (h.dataset.precedence === e) i = h;
      else if (i !== u) break;
    }
    i
      ? i.parentNode.insertBefore(t, i.nextSibling)
      : ((e = l.nodeType === 9 ? l.head : l), e.insertBefore(t, e.firstChild));
  }
  function ho(t, e) {
    (t.crossOrigin == null && (t.crossOrigin = e.crossOrigin),
      t.referrerPolicy == null && (t.referrerPolicy = e.referrerPolicy),
      t.title == null && (t.title = e.title));
  }
  function yo(t, e) {
    (t.crossOrigin == null && (t.crossOrigin = e.crossOrigin),
      t.referrerPolicy == null && (t.referrerPolicy = e.referrerPolicy),
      t.integrity == null && (t.integrity = e.integrity));
  }
  var Ri = null;
  function ah(t, e, l) {
    if (Ri === null) {
      var a = new Map(),
        u = (Ri = new Map());
      u.set(l, a);
    } else ((u = Ri), (a = u.get(l)), a || ((a = new Map()), u.set(l, a)));
    if (a.has(t)) return a;
    for (a.set(t, null), l = l.getElementsByTagName(t), u = 0; u < l.length; u++) {
      var i = l[u];
      if (
        !(i[gn] || i[It] || (t === 'link' && i.getAttribute('rel') === 'stylesheet')) &&
        i.namespaceURI !== 'http://www.w3.org/2000/svg'
      ) {
        var f = i.getAttribute(e) || '';
        f = t + f;
        var h = a.get(f);
        h ? h.push(i) : a.set(f, [i]);
      }
    }
    return a;
  }
  function nh(t, e, l) {
    ((t = t.ownerDocument || t),
      t.head.insertBefore(l, e === 'title' ? t.querySelector('head > title') : null));
  }
  function av(t, e, l) {
    if (l === 1 || e.itemProp != null) return !1;
    switch (t) {
      case 'meta':
      case 'title':
        return !0;
      case 'style':
        if (typeof e.precedence != 'string' || typeof e.href != 'string' || e.href === '') break;
        return !0;
      case 'link':
        if (
          typeof e.rel != 'string' ||
          typeof e.href != 'string' ||
          e.href === '' ||
          e.onLoad ||
          e.onError
        )
          break;
        switch (e.rel) {
          case 'stylesheet':
            return ((t = e.disabled), typeof e.precedence == 'string' && t == null);
          default:
            return !0;
        }
      case 'script':
        if (
          e.async &&
          typeof e.async != 'function' &&
          typeof e.async != 'symbol' &&
          !e.onLoad &&
          !e.onError &&
          e.src &&
          typeof e.src == 'string'
        )
          return !0;
    }
    return !1;
  }
  function uh(t) {
    return !(t.type === 'stylesheet' && (t.state.loading & 3) === 0);
  }
  function nv(t, e, l, a) {
    if (
      l.type === 'stylesheet' &&
      (typeof a.media != 'string' || matchMedia(a.media).matches !== !1) &&
      (l.state.loading & 4) === 0
    ) {
      if (l.instance === null) {
        var u = tn(a.href),
          i = e.querySelector(eu(u));
        if (i) {
          ((e = i._p),
            e !== null &&
              typeof e == 'object' &&
              typeof e.then == 'function' &&
              (t.count++, (t = Di.bind(t)), e.then(t, t)),
            (l.state.loading |= 4),
            (l.instance = i),
            Wt(i));
          return;
        }
        ((i = e.ownerDocument || e),
          (a = eh(a)),
          (u = Ue.get(u)) && ho(a, u),
          (i = i.createElement('link')),
          Wt(i));
        var f = i;
        ((f._p = new Promise(function (h, b) {
          ((f.onload = h), (f.onerror = b));
        })),
          le(i, 'link', a),
          (l.instance = i));
      }
      (t.stylesheets === null && (t.stylesheets = new Map()),
        t.stylesheets.set(l, e),
        (e = l.state.preload) &&
          (l.state.loading & 3) === 0 &&
          (t.count++,
          (l = Di.bind(t)),
          e.addEventListener('load', l),
          e.addEventListener('error', l)));
    }
  }
  var po = 0;
  function uv(t, e) {
    return (
      t.stylesheets && t.count === 0 && zi(t, t.stylesheets),
      0 < t.count || 0 < t.imgCount
        ? function (l) {
            var a = setTimeout(function () {
              if ((t.stylesheets && zi(t, t.stylesheets), t.unsuspend)) {
                var i = t.unsuspend;
                ((t.unsuspend = null), i());
              }
            }, 6e4 + e);
            0 < t.imgBytes && po === 0 && (po = 62500 * L0());
            var u = setTimeout(
              function () {
                if (
                  ((t.waitingForImages = !1),
                  t.count === 0 && (t.stylesheets && zi(t, t.stylesheets), t.unsuspend))
                ) {
                  var i = t.unsuspend;
                  ((t.unsuspend = null), i());
                }
              },
              (t.imgBytes > po ? 50 : 800) + e
            );
            return (
              (t.unsuspend = l),
              function () {
                ((t.unsuspend = null), clearTimeout(a), clearTimeout(u));
              }
            );
          }
        : null
    );
  }
  function Di() {
    if ((this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages))) {
      if (this.stylesheets) zi(this, this.stylesheets);
      else if (this.unsuspend) {
        var t = this.unsuspend;
        ((this.unsuspend = null), t());
      }
    }
  }
  var Oi = null;
  function zi(t, e) {
    ((t.stylesheets = null),
      t.unsuspend !== null &&
        (t.count++, (Oi = new Map()), e.forEach(iv, t), (Oi = null), Di.call(t)));
  }
  function iv(t, e) {
    if (!(e.state.loading & 4)) {
      var l = Oi.get(t);
      if (l) var a = l.get(null);
      else {
        ((l = new Map()), Oi.set(t, l));
        for (
          var u = t.querySelectorAll('link[data-precedence],style[data-precedence]'), i = 0;
          i < u.length;
          i++
        ) {
          var f = u[i];
          (f.nodeName === 'LINK' || f.getAttribute('media') !== 'not all') &&
            (l.set(f.dataset.precedence, f), (a = f));
        }
        a && l.set(null, a);
      }
      ((u = e.instance),
        (f = u.getAttribute('data-precedence')),
        (i = l.get(f) || a),
        i === a && l.set(null, u),
        l.set(f, u),
        this.count++,
        (a = Di.bind(this)),
        u.addEventListener('load', a),
        u.addEventListener('error', a),
        i
          ? i.parentNode.insertBefore(u, i.nextSibling)
          : ((t = t.nodeType === 9 ? t.head : t), t.insertBefore(u, t.firstChild)),
        (e.state.loading |= 4));
    }
  }
  var au = {
    $$typeof: j,
    Provider: null,
    Consumer: null,
    _currentValue: Z,
    _currentValue2: Z,
    _threadCount: 0,
  };
  function cv(t, e, l, a, u, i, f, h, b) {
    ((this.tag = 1),
      (this.containerInfo = t),
      (this.pingCache = this.current = this.pendingChildren = null),
      (this.timeoutHandle = -1),
      (this.callbackNode =
        this.next =
        this.pendingContext =
        this.context =
        this.cancelPendingCommit =
          null),
      (this.callbackPriority = 0),
      (this.expirationTimes = rc(-1)),
      (this.entangledLanes =
        this.shellSuspendCounter =
        this.errorRecoveryDisabledLanes =
        this.expiredLanes =
        this.warmLanes =
        this.pingedLanes =
        this.suspendedLanes =
        this.pendingLanes =
          0),
      (this.entanglements = rc(0)),
      (this.hiddenUpdates = rc(null)),
      (this.identifierPrefix = a),
      (this.onUncaughtError = u),
      (this.onCaughtError = i),
      (this.onRecoverableError = f),
      (this.pooledCache = null),
      (this.pooledCacheLanes = 0),
      (this.formState = b),
      (this.incompleteTransitions = new Map()));
  }
  function ih(t, e, l, a, u, i, f, h, b, C, k, G) {
    return (
      (t = new cv(t, e, l, f, b, C, k, G, h)),
      (e = 1),
      i === !0 && (e |= 24),
      (i = _e(3, null, null, e)),
      (t.current = i),
      (i.stateNode = t),
      (e = $c()),
      e.refCount++,
      (t.pooledCache = e),
      e.refCount++,
      (i.memoizedState = { element: a, isDehydrated: l, cache: e }),
      Ic(i),
      t
    );
  }
  function ch(t) {
    return t ? ((t = za), t) : za;
  }
  function sh(t, e, l, a, u, i) {
    ((u = ch(u)),
      a.context === null ? (a.context = u) : (a.pendingContext = u),
      (a = Rl(e)),
      (a.payload = { element: l }),
      (i = i === void 0 ? null : i),
      i !== null && (a.callback = i),
      (l = Dl(t, a, e)),
      l !== null && (me(l, t, e), wn(l, t, e)));
  }
  function oh(t, e) {
    if (((t = t.memoizedState), t !== null && t.dehydrated !== null)) {
      var l = t.retryLane;
      t.retryLane = l !== 0 && l < e ? l : e;
    }
  }
  function vo(t, e) {
    (oh(t, e), (t = t.alternate) && oh(t, e));
  }
  function rh(t) {
    if (t.tag === 13 || t.tag === 31) {
      var e = la(t, 67108864);
      (e !== null && me(e, t, 67108864), vo(t, 67108864));
    }
  }
  function fh(t) {
    if (t.tag === 13 || t.tag === 31) {
      var e = Te();
      e = fc(e);
      var l = la(t, e);
      (l !== null && me(l, t, e), vo(t, e));
    }
  }
  var ji = !0;
  function sv(t, e, l, a) {
    var u = U.T;
    U.T = null;
    var i = R.p;
    try {
      ((R.p = 2), go(t, e, l, a));
    } finally {
      ((R.p = i), (U.T = u));
    }
  }
  function ov(t, e, l, a) {
    var u = U.T;
    U.T = null;
    var i = R.p;
    try {
      ((R.p = 8), go(t, e, l, a));
    } finally {
      ((R.p = i), (U.T = u));
    }
  }
  function go(t, e, l, a) {
    if (ji) {
      var u = _o(a);
      if (u === null) (ao(t, e, a, ki, l), mh(t, a));
      else if (fv(u, t, e, l, a)) a.stopPropagation();
      else if ((mh(t, a), e & 4 && -1 < rv.indexOf(t))) {
        for (; u !== null; ) {
          var i = Sa(u);
          if (i !== null)
            switch (i.tag) {
              case 3:
                if (((i = i.stateNode), i.current.memoizedState.isDehydrated)) {
                  var f = Fl(i.pendingLanes);
                  if (f !== 0) {
                    var h = i;
                    for (h.pendingLanes |= 2, h.entangledLanes |= 2; f; ) {
                      var b = 1 << (31 - ve(f));
                      ((h.entanglements[1] |= b), (f &= ~b));
                    }
                    (Ke(i), (bt & 6) === 0 && ((pi = ye() + 500), Fn(0)));
                  }
                }
                break;
              case 31:
              case 13:
                ((h = la(i, 2)), h !== null && me(h, i, 2), gi(), vo(i, 2));
            }
          if (((i = _o(a)), i === null && ao(t, e, a, ki, l), i === u)) break;
          u = i;
        }
        u !== null && a.stopPropagation();
      } else ao(t, e, a, null, l);
    }
  }
  function _o(t) {
    return ((t = bc(t)), bo(t));
  }
  var ki = null;
  function bo(t) {
    if (((ki = null), (t = ba(t)), t !== null)) {
      var e = d(t);
      if (e === null) t = null;
      else {
        var l = e.tag;
        if (l === 13) {
          if (((t = p(e)), t !== null)) return t;
          t = null;
        } else if (l === 31) {
          if (((t = v(e)), t !== null)) return t;
          t = null;
        } else if (l === 3) {
          if (e.stateNode.current.memoizedState.isDehydrated)
            return e.tag === 3 ? e.stateNode.containerInfo : null;
          t = null;
        } else e !== t && (t = null);
      }
    }
    return ((ki = t), null);
  }
  function dh(t) {
    switch (t) {
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
        switch (Jy()) {
          case _r:
            return 2;
          case br:
            return 8;
          case Eu:
          case Wy:
            return 32;
          case Sr:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var So = !1,
    Gl = null,
    Yl = null,
    Xl = null,
    nu = new Map(),
    uu = new Map(),
    Ql = [],
    rv =
      'mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset'.split(
        ' '
      );
  function mh(t, e) {
    switch (t) {
      case 'focusin':
      case 'focusout':
        Gl = null;
        break;
      case 'dragenter':
      case 'dragleave':
        Yl = null;
        break;
      case 'mouseover':
      case 'mouseout':
        Xl = null;
        break;
      case 'pointerover':
      case 'pointerout':
        nu.delete(e.pointerId);
        break;
      case 'gotpointercapture':
      case 'lostpointercapture':
        uu.delete(e.pointerId);
    }
  }
  function iu(t, e, l, a, u, i) {
    return t === null || t.nativeEvent !== i
      ? ((t = {
          blockedOn: e,
          domEventName: l,
          eventSystemFlags: a,
          nativeEvent: i,
          targetContainers: [u],
        }),
        e !== null && ((e = Sa(e)), e !== null && rh(e)),
        t)
      : ((t.eventSystemFlags |= a),
        (e = t.targetContainers),
        u !== null && e.indexOf(u) === -1 && e.push(u),
        t);
  }
  function fv(t, e, l, a, u) {
    switch (e) {
      case 'focusin':
        return ((Gl = iu(Gl, t, e, l, a, u)), !0);
      case 'dragenter':
        return ((Yl = iu(Yl, t, e, l, a, u)), !0);
      case 'mouseover':
        return ((Xl = iu(Xl, t, e, l, a, u)), !0);
      case 'pointerover':
        var i = u.pointerId;
        return (nu.set(i, iu(nu.get(i) || null, t, e, l, a, u)), !0);
      case 'gotpointercapture':
        return ((i = u.pointerId), uu.set(i, iu(uu.get(i) || null, t, e, l, a, u)), !0);
    }
    return !1;
  }
  function hh(t) {
    var e = ba(t.target);
    if (e !== null) {
      var l = d(e);
      if (l !== null) {
        if (((e = l.tag), e === 13)) {
          if (((e = p(l)), e !== null)) {
            ((t.blockedOn = e),
              Mr(t.priority, function () {
                fh(l);
              }));
            return;
          }
        } else if (e === 31) {
          if (((e = v(l)), e !== null)) {
            ((t.blockedOn = e),
              Mr(t.priority, function () {
                fh(l);
              }));
            return;
          }
        } else if (e === 3 && l.stateNode.current.memoizedState.isDehydrated) {
          t.blockedOn = l.tag === 3 ? l.stateNode.containerInfo : null;
          return;
        }
      }
    }
    t.blockedOn = null;
  }
  function wi(t) {
    if (t.blockedOn !== null) return !1;
    for (var e = t.targetContainers; 0 < e.length; ) {
      var l = _o(t.nativeEvent);
      if (l === null) {
        l = t.nativeEvent;
        var a = new l.constructor(l.type, l);
        ((_c = a), l.target.dispatchEvent(a), (_c = null));
      } else return ((e = Sa(l)), e !== null && rh(e), (t.blockedOn = l), !1);
      e.shift();
    }
    return !0;
  }
  function yh(t, e, l) {
    wi(t) && l.delete(e);
  }
  function dv() {
    ((So = !1),
      Gl !== null && wi(Gl) && (Gl = null),
      Yl !== null && wi(Yl) && (Yl = null),
      Xl !== null && wi(Xl) && (Xl = null),
      nu.forEach(yh),
      uu.forEach(yh));
  }
  function Ui(t, e) {
    t.blockedOn === e &&
      ((t.blockedOn = null),
      So || ((So = !0), n.unstable_scheduleCallback(n.unstable_NormalPriority, dv)));
  }
  var Bi = null;
  function ph(t) {
    Bi !== t &&
      ((Bi = t),
      n.unstable_scheduleCallback(n.unstable_NormalPriority, function () {
        Bi === t && (Bi = null);
        for (var e = 0; e < t.length; e += 3) {
          var l = t[e],
            a = t[e + 1],
            u = t[e + 2];
          if (typeof a != 'function') {
            if (bo(a || l) === null) continue;
            break;
          }
          var i = Sa(l);
          i !== null &&
            (t.splice(e, 3),
            (e -= 3),
            gs(i, { pending: !0, data: u, method: l.method, action: a }, a, u));
        }
      }));
  }
  function ln(t) {
    function e(b) {
      return Ui(b, t);
    }
    (Gl !== null && Ui(Gl, t),
      Yl !== null && Ui(Yl, t),
      Xl !== null && Ui(Xl, t),
      nu.forEach(e),
      uu.forEach(e));
    for (var l = 0; l < Ql.length; l++) {
      var a = Ql[l];
      a.blockedOn === t && (a.blockedOn = null);
    }
    for (; 0 < Ql.length && ((l = Ql[0]), l.blockedOn === null); )
      (hh(l), l.blockedOn === null && Ql.shift());
    if (((l = (t.ownerDocument || t).$$reactFormReplay), l != null))
      for (a = 0; a < l.length; a += 3) {
        var u = l[a],
          i = l[a + 1],
          f = u[ce] || null;
        if (typeof i == 'function') f || ph(l);
        else if (f) {
          var h = null;
          if (i && i.hasAttribute('formAction')) {
            if (((u = i), (f = i[ce] || null))) h = f.formAction;
            else if (bo(u) !== null) continue;
          } else h = f.action;
          (typeof h == 'function' ? (l[a + 1] = h) : (l.splice(a, 3), (a -= 3)), ph(l));
        }
      }
  }
  function vh() {
    function t(i) {
      i.canIntercept &&
        i.info === 'react-transition' &&
        i.intercept({
          handler: function () {
            return new Promise(function (f) {
              return (u = f);
            });
          },
          focusReset: 'manual',
          scroll: 'manual',
        });
    }
    function e() {
      (u !== null && (u(), (u = null)), a || setTimeout(l, 20));
    }
    function l() {
      if (!a && !navigation.transition) {
        var i = navigation.currentEntry;
        i &&
          i.url != null &&
          navigation.navigate(i.url, {
            state: i.getState(),
            info: 'react-transition',
            history: 'replace',
          });
      }
    }
    if (typeof navigation == 'object') {
      var a = !1,
        u = null;
      return (
        navigation.addEventListener('navigate', t),
        navigation.addEventListener('navigatesuccess', e),
        navigation.addEventListener('navigateerror', e),
        setTimeout(l, 100),
        function () {
          ((a = !0),
            navigation.removeEventListener('navigate', t),
            navigation.removeEventListener('navigatesuccess', e),
            navigation.removeEventListener('navigateerror', e),
            u !== null && (u(), (u = null)));
        }
      );
    }
  }
  function xo(t) {
    this._internalRoot = t;
  }
  ((Hi.prototype.render = xo.prototype.render =
    function (t) {
      var e = this._internalRoot;
      if (e === null) throw Error(s(409));
      var l = e.current,
        a = Te();
      sh(l, a, t, e, null, null);
    }),
    (Hi.prototype.unmount = xo.prototype.unmount =
      function () {
        var t = this._internalRoot;
        if (t !== null) {
          this._internalRoot = null;
          var e = t.containerInfo;
          (sh(t.current, 2, null, t, null, null), gi(), (e[_a] = null));
        }
      }));
  function Hi(t) {
    this._internalRoot = t;
  }
  Hi.prototype.unstable_scheduleHydration = function (t) {
    if (t) {
      var e = Ar();
      t = { blockedOn: null, target: t, priority: e };
      for (var l = 0; l < Ql.length && e !== 0 && e < Ql[l].priority; l++);
      (Ql.splice(l, 0, t), l === 0 && hh(t));
    }
  };
  var gh = c.version;
  if (gh !== '19.2.5') throw Error(s(527, gh, '19.2.5'));
  R.findDOMNode = function (t) {
    var e = t._reactInternals;
    if (e === void 0)
      throw typeof t.render == 'function'
        ? Error(s(188))
        : ((t = Object.keys(t).join(',')), Error(s(268, t)));
    return ((t = m(e)), (t = t !== null ? E(t) : null), (t = t === null ? null : t.stateNode), t);
  };
  var mv = {
    bundleType: 0,
    version: '19.2.5',
    rendererPackageName: 'react-dom',
    currentDispatcherRef: U,
    reconcilerVersion: '19.2.5',
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < 'u') {
    var Li = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Li.isDisabled && Li.supportsFiber)
      try {
        ((yn = Li.inject(mv)), (pe = Li));
      } catch {}
  }
  return (
    (su.createRoot = function (t, e) {
      if (!r(t)) throw Error(s(299));
      var l = !1,
        a = '',
        u = Nd,
        i = Ad,
        f = Md;
      return (
        e != null &&
          (e.unstable_strictMode === !0 && (l = !0),
          e.identifierPrefix !== void 0 && (a = e.identifierPrefix),
          e.onUncaughtError !== void 0 && (u = e.onUncaughtError),
          e.onCaughtError !== void 0 && (i = e.onCaughtError),
          e.onRecoverableError !== void 0 && (f = e.onRecoverableError)),
        (e = ih(t, 1, !1, null, null, l, a, null, u, i, f, vh)),
        (t[_a] = e.current),
        lo(t),
        new xo(e)
      );
    }),
    (su.hydrateRoot = function (t, e, l) {
      if (!r(t)) throw Error(s(299));
      var a = !1,
        u = '',
        i = Nd,
        f = Ad,
        h = Md,
        b = null;
      return (
        l != null &&
          (l.unstable_strictMode === !0 && (a = !0),
          l.identifierPrefix !== void 0 && (u = l.identifierPrefix),
          l.onUncaughtError !== void 0 && (i = l.onUncaughtError),
          l.onCaughtError !== void 0 && (f = l.onCaughtError),
          l.onRecoverableError !== void 0 && (h = l.onRecoverableError),
          l.formState !== void 0 && (b = l.formState)),
        (e = ih(t, 1, !0, e, l ?? null, a, u, b, i, f, h, vh)),
        (e.context = ch(null)),
        (l = e.current),
        (a = Te()),
        (a = fc(a)),
        (u = Rl(a)),
        (u.callback = null),
        Dl(l, u, a),
        (l = a),
        (e.current.lanes = l),
        vn(e, l),
        Ke(e),
        (t[_a] = e.current),
        lo(t),
        new Hi(e)
      );
    }),
    (su.version = '19.2.5'),
    su
  );
}
var Ch;
function Nv() {
  if (Ch) return No.exports;
  Ch = 1;
  function n() {
    if (
      !(
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > 'u' ||
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != 'function'
      )
    )
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n);
      } catch (c) {
        console.error(c);
      }
  }
  return (n(), (No.exports = Tv()), No.exports);
}
var Av = Nv(),
  N = Io();
/**
 * react-router v7.14.2
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */ var Rh = 'popstate';
function Dh(n) {
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
function Mv(n = {}) {
  function c(s, r) {
    var m;
    let d = (m = r.state) == null ? void 0 : m.masked,
      { pathname: p, search: v, hash: y } = d || s.location;
    return qo(
      '',
      { pathname: p, search: v, hash: y },
      (r.state && r.state.usr) || null,
      (r.state && r.state.key) || 'default',
      d
        ? { pathname: s.location.pathname, search: s.location.search, hash: s.location.hash }
        : void 0
    );
  }
  function o(s, r) {
    return typeof r == 'string' ? r : yu(r);
  }
  return Rv(c, o, null, n);
}
function kt(n, c) {
  if (n === !1 || n === null || typeof n > 'u') throw new Error(c);
}
function Ye(n, c) {
  if (!n) {
    typeof console < 'u' && console.warn(c);
    try {
      throw new Error(c);
    } catch {}
  }
}
function Cv() {
  return Math.random().toString(36).substring(2, 10);
}
function Oh(n, c) {
  return {
    usr: n.state,
    key: n.key,
    idx: c,
    masked: n.unstable_mask ? { pathname: n.pathname, search: n.search, hash: n.hash } : void 0,
  };
}
function qo(n, c, o = null, s, r) {
  return {
    pathname: typeof n == 'string' ? n : n.pathname,
    search: '',
    hash: '',
    ...(typeof c == 'string' ? on(c) : c),
    state: o,
    key: (c && c.key) || s || Cv(),
    unstable_mask: r,
  };
}
function yu({ pathname: n = '/', search: c = '', hash: o = '' }) {
  return (
    c && c !== '?' && (n += c.charAt(0) === '?' ? c : '?' + c),
    o && o !== '#' && (n += o.charAt(0) === '#' ? o : '#' + o),
    n
  );
}
function on(n) {
  let c = {};
  if (n) {
    let o = n.indexOf('#');
    o >= 0 && ((c.hash = n.substring(o)), (n = n.substring(0, o)));
    let s = n.indexOf('?');
    (s >= 0 && ((c.search = n.substring(s)), (n = n.substring(0, s))), n && (c.pathname = n));
  }
  return c;
}
function Rv(n, c, o, s = {}) {
  let { window: r = document.defaultView, v5Compat: d = !1 } = s,
    p = r.history,
    v = 'POP',
    y = null,
    m = E();
  m == null && ((m = 0), p.replaceState({ ...p.state, idx: m }, ''));
  function E() {
    return (p.state || { idx: null }).idx;
  }
  function _() {
    v = 'POP';
    let B = E(),
      w = B == null ? null : B - m;
    ((m = B), y && y({ action: v, location: z.location, delta: w }));
  }
  function T(B, w) {
    v = 'PUSH';
    let Q = Dh(B) ? B : qo(z.location, B, w);
    m = E() + 1;
    let j = Oh(Q, m),
      X = z.createHref(Q.unstable_mask || Q);
    try {
      p.pushState(j, '', X);
    } catch ($) {
      if ($ instanceof DOMException && $.name === 'DataCloneError') throw $;
      r.location.assign(X);
    }
    d && y && y({ action: v, location: z.location, delta: 1 });
  }
  function Y(B, w) {
    v = 'REPLACE';
    let Q = Dh(B) ? B : qo(z.location, B, w);
    m = E();
    let j = Oh(Q, m),
      X = z.createHref(Q.unstable_mask || Q);
    (p.replaceState(j, '', X), d && y && y({ action: v, location: z.location, delta: 0 }));
  }
  function H(B) {
    return Dv(B);
  }
  let z = {
    get action() {
      return v;
    },
    get location() {
      return n(r, p);
    },
    listen(B) {
      if (y) throw new Error('A history only accepts one active listener');
      return (
        r.addEventListener(Rh, _),
        (y = B),
        () => {
          (r.removeEventListener(Rh, _), (y = null));
        }
      );
    },
    createHref(B) {
      return c(r, B);
    },
    createURL: H,
    encodeLocation(B) {
      let w = H(B);
      return { pathname: w.pathname, search: w.search, hash: w.hash };
    },
    push: T,
    replace: Y,
    go(B) {
      return p.go(B);
    },
  };
  return z;
}
function Dv(n, c = !1) {
  let o = 'http://localhost';
  (typeof window < 'u' &&
    (o = window.location.origin !== 'null' ? window.location.origin : window.location.href),
    kt(o, 'No window.location.(origin|href) available to create URL'));
  let s = typeof n == 'string' ? n : yu(n);
  return ((s = s.replace(/ $/, '%20')), !c && s.startsWith('//') && (s = o + s), new URL(s, o));
}
function ey(n, c, o = '/') {
  return Ov(n, c, o, !1);
}
function Ov(n, c, o, s) {
  let r = typeof c == 'string' ? on(c) : c,
    d = vl(r.pathname || '/', o);
  if (d == null) return null;
  let p = ly(n);
  zv(p);
  let v = null;
  for (let y = 0; v == null && y < p.length; ++y) {
    let m = Xv(d);
    v = Gv(p[y], m, s);
  }
  return v;
}
function ly(n, c = [], o = [], s = '', r = !1) {
  let d = (p, v, y = r, m) => {
    let E = {
      relativePath: m === void 0 ? p.path || '' : m,
      caseSensitive: p.caseSensitive === !0,
      childrenIndex: v,
      route: p,
    };
    if (E.relativePath.startsWith('/')) {
      if (!E.relativePath.startsWith(s) && y) return;
      (kt(
        E.relativePath.startsWith(s),
        `Absolute route path "${E.relativePath}" nested under path "${s}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`
      ),
        (E.relativePath = E.relativePath.slice(s.length)));
    }
    let _ = Ge([s, E.relativePath]),
      T = o.concat(E);
    (p.children &&
      p.children.length > 0 &&
      (kt(
        p.index !== !0,
        `Index routes must not have child routes. Please remove all child routes from route path "${_}".`
      ),
      ly(p.children, c, T, _, y)),
      !(p.path == null && !p.index) && c.push({ path: _, score: Lv(_, p.index), routesMeta: T }));
  };
  return (
    n.forEach((p, v) => {
      var y;
      if (p.path === '' || !((y = p.path) != null && y.includes('?'))) d(p, v);
      else for (let m of ay(p.path)) d(p, v, !0, m);
    }),
    c
  );
}
function ay(n) {
  let c = n.split('/');
  if (c.length === 0) return [];
  let [o, ...s] = c,
    r = o.endsWith('?'),
    d = o.replace(/\?$/, '');
  if (s.length === 0) return r ? [d, ''] : [d];
  let p = ay(s.join('/')),
    v = [];
  return (
    v.push(...p.map((y) => (y === '' ? d : [d, y].join('/')))),
    r && v.push(...p),
    v.map((y) => (n.startsWith('/') && y === '' ? '/' : y))
  );
}
function zv(n) {
  n.sort((c, o) =>
    c.score !== o.score
      ? o.score - c.score
      : qv(
          c.routesMeta.map((s) => s.childrenIndex),
          o.routesMeta.map((s) => s.childrenIndex)
        )
  );
}
var jv = /^:[\w-]+$/,
  kv = 3,
  wv = 2,
  Uv = 1,
  Bv = 10,
  Hv = -2,
  zh = (n) => n === '*';
function Lv(n, c) {
  let o = n.split('/'),
    s = o.length;
  return (
    o.some(zh) && (s += Hv),
    c && (s += wv),
    o.filter((r) => !zh(r)).reduce((r, d) => r + (jv.test(d) ? kv : d === '' ? Uv : Bv), s)
  );
}
function qv(n, c) {
  return n.length === c.length && n.slice(0, -1).every((s, r) => s === c[r])
    ? n[n.length - 1] - c[c.length - 1]
    : 0;
}
function Gv(n, c, o = !1) {
  let { routesMeta: s } = n,
    r = {},
    d = '/',
    p = [];
  for (let v = 0; v < s.length; ++v) {
    let y = s[v],
      m = v === s.length - 1,
      E = d === '/' ? c : c.slice(d.length) || '/',
      _ = Vi({ path: y.relativePath, caseSensitive: y.caseSensitive, end: m }, E),
      T = y.route;
    if (
      (!_ &&
        m &&
        o &&
        !s[s.length - 1].route.index &&
        (_ = Vi({ path: y.relativePath, caseSensitive: y.caseSensitive, end: !1 }, E)),
      !_)
    )
      return null;
    (Object.assign(r, _.params),
      p.push({
        params: r,
        pathname: Ge([d, _.pathname]),
        pathnameBase: Kv(Ge([d, _.pathnameBase])),
        route: T,
      }),
      _.pathnameBase !== '/' && (d = Ge([d, _.pathnameBase])));
  }
  return p;
}
function Vi(n, c) {
  typeof n == 'string' && (n = { path: n, caseSensitive: !1, end: !0 });
  let [o, s] = Yv(n.path, n.caseSensitive, n.end),
    r = c.match(o);
  if (!r) return null;
  let d = r[0],
    p = d.replace(/(.)\/+$/, '$1'),
    v = r.slice(1);
  return {
    params: s.reduce((m, { paramName: E, isOptional: _ }, T) => {
      if (E === '*') {
        let H = v[T] || '';
        p = d.slice(0, d.length - H.length).replace(/(.)\/+$/, '$1');
      }
      const Y = v[T];
      return (_ && !Y ? (m[E] = void 0) : (m[E] = (Y || '').replace(/%2F/g, '/')), m);
    }, {}),
    pathname: d,
    pathnameBase: p,
    pattern: n,
  };
}
function Yv(n, c = !1, o = !0) {
  Ye(
    n === '*' || !n.endsWith('*') || n.endsWith('/*'),
    `Route path "${n}" will be treated as if it were "${n.replace(/\*$/, '/*')}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${n.replace(/\*$/, '/*')}".`
  );
  let s = [],
    r =
      '^' +
      n
        .replace(/\/*\*?$/, '')
        .replace(/^\/*/, '/')
        .replace(/[\\.*+^${}|()[\]]/g, '\\$&')
        .replace(/\/:([\w-]+)(\?)?/g, (p, v, y, m, E) => {
          if ((s.push({ paramName: v, isOptional: y != null }), y)) {
            let _ = E.charAt(m + p.length);
            return _ && _ !== '/' ? '/([^\\/]*)' : '(?:/([^\\/]*))?';
          }
          return '/([^\\/]+)';
        })
        .replace(/\/([\w-]+)\?(\/|$)/g, '(/$1)?$2');
  return (
    n.endsWith('*')
      ? (s.push({ paramName: '*' }), (r += n === '*' || n === '/*' ? '(.*)$' : '(?:\\/(.+)|\\/*)$'))
      : o
        ? (r += '\\/*$')
        : n !== '' && n !== '/' && (r += '(?:(?=\\/|$))'),
    [new RegExp(r, c ? void 0 : 'i'), s]
  );
}
function Xv(n) {
  try {
    return n
      .split('/')
      .map((c) => decodeURIComponent(c).replace(/\//g, '%2F'))
      .join('/');
  } catch (c) {
    return (
      Ye(
        !1,
        `The URL path "${n}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${c}).`
      ),
      n
    );
  }
}
function vl(n, c) {
  if (c === '/') return n;
  if (!n.toLowerCase().startsWith(c.toLowerCase())) return null;
  let o = c.endsWith('/') ? c.length - 1 : c.length,
    s = n.charAt(o);
  return s && s !== '/' ? null : n.slice(o) || '/';
}
var Qv = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;
function Vv(n, c = '/') {
  let { pathname: o, search: s = '', hash: r = '' } = typeof n == 'string' ? on(n) : n,
    d;
  return (
    o ? ((o = ny(o)), o.startsWith('/') ? (d = jh(o.substring(1), '/')) : (d = jh(o, c))) : (d = c),
    { pathname: d, search: $v(s), hash: Jv(r) }
  );
}
function jh(n, c) {
  let o = Zi(c).split('/');
  return (
    n.split('/').forEach((r) => {
      r === '..' ? o.length > 1 && o.pop() : r !== '.' && o.push(r);
    }),
    o.length > 1 ? o.join('/') : '/'
  );
}
function Do(n, c, o, s) {
  return `Cannot include a '${n}' character in a manually specified \`to.${c}\` field [${JSON.stringify(s)}].  Please separate it out to the \`to.${o}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`;
}
function Zv(n) {
  return n.filter((c, o) => o === 0 || (c.route.path && c.route.path.length > 0));
}
function Po(n) {
  let c = Zv(n);
  return c.map((o, s) => (s === c.length - 1 ? o.pathname : o.pathnameBase));
}
function Fi(n, c, o, s = !1) {
  let r;
  typeof n == 'string'
    ? (r = on(n))
    : ((r = { ...n }),
      kt(!r.pathname || !r.pathname.includes('?'), Do('?', 'pathname', 'search', r)),
      kt(!r.pathname || !r.pathname.includes('#'), Do('#', 'pathname', 'hash', r)),
      kt(!r.search || !r.search.includes('#'), Do('#', 'search', 'hash', r)));
  let d = n === '' || r.pathname === '',
    p = d ? '/' : r.pathname,
    v;
  if (p == null) v = o;
  else {
    let _ = c.length - 1;
    if (!s && p.startsWith('..')) {
      let T = p.split('/');
      for (; T[0] === '..'; ) (T.shift(), (_ -= 1));
      r.pathname = T.join('/');
    }
    v = _ >= 0 ? c[_] : '/';
  }
  let y = Vv(r, v),
    m = p && p !== '/' && p.endsWith('/'),
    E = (d || p === '.') && o.endsWith('/');
  return (!y.pathname.endsWith('/') && (m || E) && (y.pathname += '/'), y);
}
var ny = (n) => n.replace(/\/\/+/g, '/'),
  Ge = (n) => ny(n.join('/')),
  Zi = (n) => n.replace(/\/+$/, ''),
  Kv = (n) => Zi(n).replace(/^\/*/, '/'),
  $v = (n) => (!n || n === '?' ? '' : n.startsWith('?') ? n : '?' + n),
  Jv = (n) => (!n || n === '#' ? '' : n.startsWith('#') ? n : '#' + n),
  Wv = class {
    constructor(n, c, o, s = !1) {
      ((this.status = n),
        (this.statusText = c || ''),
        (this.internal = s),
        o instanceof Error ? ((this.data = o.toString()), (this.error = o)) : (this.data = o));
    }
  };
function Fv(n) {
  return (
    n != null &&
    typeof n.status == 'number' &&
    typeof n.statusText == 'string' &&
    typeof n.internal == 'boolean' &&
    'data' in n
  );
}
function Iv(n) {
  let c = n.map((o) => o.route.path).filter(Boolean);
  return Ge(c) || '/';
}
var uy =
  typeof window < 'u' && typeof window.document < 'u' && typeof window.document.createElement < 'u';
function iy(n, c) {
  let o = n;
  if (typeof o != 'string' || !Qv.test(o)) return { absoluteURL: void 0, isExternal: !1, to: o };
  let s = o,
    r = !1;
  if (uy)
    try {
      let d = new URL(window.location.href),
        p = o.startsWith('//') ? new URL(d.protocol + o) : new URL(o),
        v = vl(p.pathname, c);
      p.origin === d.origin && v != null ? (o = v + p.search + p.hash) : (r = !0);
    } catch {
      Ye(
        !1,
        `<Link to="${o}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`
      );
    }
  return { absoluteURL: s, isExternal: r, to: o };
}
Object.getOwnPropertyNames(Object.prototype).sort().join('\0');
var cy = ['POST', 'PUT', 'PATCH', 'DELETE'];
new Set(cy);
var Pv = ['GET', ...cy];
new Set(Pv);
var rn = N.createContext(null);
rn.displayName = 'DataRouter';
var Ii = N.createContext(null);
Ii.displayName = 'DataRouterState';
var sy = N.createContext(!1);
function tg() {
  return N.useContext(sy);
}
var oy = N.createContext({ isTransitioning: !1 });
oy.displayName = 'ViewTransition';
var eg = N.createContext(new Map());
eg.displayName = 'Fetchers';
var lg = N.createContext(null);
lg.displayName = 'Await';
var Ae = N.createContext(null);
Ae.displayName = 'Navigation';
var gu = N.createContext(null);
gu.displayName = 'Location';
var Xe = N.createContext({ outlet: null, matches: [], isDataRoute: !1 });
Xe.displayName = 'Route';
var tr = N.createContext(null);
tr.displayName = 'RouteError';
var ry = 'REACT_ROUTER_ERROR',
  ag = 'REDIRECT',
  ng = 'ROUTE_ERROR_RESPONSE';
function ug(n) {
  if (n.startsWith(`${ry}:${ag}:{`))
    try {
      let c = JSON.parse(n.slice(28));
      if (
        typeof c == 'object' &&
        c &&
        typeof c.status == 'number' &&
        typeof c.statusText == 'string' &&
        typeof c.location == 'string' &&
        typeof c.reloadDocument == 'boolean' &&
        typeof c.replace == 'boolean'
      )
        return c;
    } catch {}
}
function ig(n) {
  if (n.startsWith(`${ry}:${ng}:{`))
    try {
      let c = JSON.parse(n.slice(40));
      if (
        typeof c == 'object' &&
        c &&
        typeof c.status == 'number' &&
        typeof c.statusText == 'string'
      )
        return new Wv(c.status, c.statusText, c.data);
    } catch {}
}
function cg(n, { relative: c } = {}) {
  kt(fn(), 'useHref() may be used only in the context of a <Router> component.');
  let { basename: o, navigator: s } = N.useContext(Ae),
    { hash: r, pathname: d, search: p } = _u(n, { relative: c }),
    v = d;
  return (
    o !== '/' && (v = d === '/' ? o : Ge([o, d])),
    s.createHref({ pathname: v, search: p, hash: r })
  );
}
function fn() {
  return N.useContext(gu) != null;
}
function Je() {
  return (
    kt(fn(), 'useLocation() may be used only in the context of a <Router> component.'),
    N.useContext(gu).location
  );
}
var fy =
  'You should call navigate() in a React.useEffect(), not when your component is first rendered.';
function dy(n) {
  N.useContext(Ae).static || N.useLayoutEffect(n);
}
function bl() {
  let { isDataRoute: n } = N.useContext(Xe);
  return n ? Sg() : sg();
}
function sg() {
  kt(fn(), 'useNavigate() may be used only in the context of a <Router> component.');
  let n = N.useContext(rn),
    { basename: c, navigator: o } = N.useContext(Ae),
    { matches: s } = N.useContext(Xe),
    { pathname: r } = Je(),
    d = JSON.stringify(Po(s)),
    p = N.useRef(!1);
  return (
    dy(() => {
      p.current = !0;
    }),
    N.useCallback(
      (y, m = {}) => {
        if ((Ye(p.current, fy), !p.current)) return;
        if (typeof y == 'number') {
          o.go(y);
          return;
        }
        let E = Fi(y, JSON.parse(d), r, m.relative === 'path');
        (n == null && c !== '/' && (E.pathname = E.pathname === '/' ? c : Ge([c, E.pathname])),
          (m.replace ? o.replace : o.push)(E, m.state, m));
      },
      [c, o, d, r, n]
    )
  );
}
N.createContext(null);
function og() {
  let { matches: n } = N.useContext(Xe),
    c = n[n.length - 1];
  return (c == null ? void 0 : c.params) ?? {};
}
function _u(n, { relative: c } = {}) {
  let { matches: o } = N.useContext(Xe),
    { pathname: s } = Je(),
    r = JSON.stringify(Po(o));
  return N.useMemo(() => Fi(n, JSON.parse(r), s, c === 'path'), [n, r, s, c]);
}
function rg(n, c) {
  return my(n, c);
}
function my(n, c, o) {
  var B;
  kt(fn(), 'useRoutes() may be used only in the context of a <Router> component.');
  let { navigator: s } = N.useContext(Ae),
    { matches: r } = N.useContext(Xe),
    d = r[r.length - 1],
    p = d ? d.params : {},
    v = d ? d.pathname : '/',
    y = d ? d.pathnameBase : '/',
    m = d && d.route;
  {
    let w = (m && m.path) || '';
    yy(
      v,
      !m || w.endsWith('*') || w.endsWith('*?'),
      `You rendered descendant <Routes> (or called \`useRoutes()\`) at "${v}" (under <Route path="${w}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${w}"> to <Route path="${w === '/' ? '*' : `${w}/*`}">.`
    );
  }
  let E = Je(),
    _;
  if (c) {
    let w = typeof c == 'string' ? on(c) : c;
    (kt(
      y === '/' || ((B = w.pathname) == null ? void 0 : B.startsWith(y)),
      `When overriding the location using \`<Routes location>\` or \`useRoutes(routes, location)\`, the location pathname must begin with the portion of the URL pathname that was matched by all parent routes. The current pathname base is "${y}" but pathname "${w.pathname}" was given in the \`location\` prop.`
    ),
      (_ = w));
  } else _ = E;
  let T = _.pathname || '/',
    Y = T;
  if (y !== '/') {
    let w = y.replace(/^\//, '').split('/');
    Y = '/' + T.replace(/^\//, '').split('/').slice(w.length).join('/');
  }
  let H = ey(n, { pathname: Y });
  (Ye(m || H != null, `No routes matched location "${_.pathname}${_.search}${_.hash}" `),
    Ye(
      H == null ||
        H[H.length - 1].route.element !== void 0 ||
        H[H.length - 1].route.Component !== void 0 ||
        H[H.length - 1].route.lazy !== void 0,
      `Matched leaf route at location "${_.pathname}${_.search}${_.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`
    ));
  let z = yg(
    H &&
      H.map((w) =>
        Object.assign({}, w, {
          params: Object.assign({}, p, w.params),
          pathname: Ge([
            y,
            s.encodeLocation
              ? s.encodeLocation(
                  w.pathname.replace(/%/g, '%25').replace(/\?/g, '%3F').replace(/#/g, '%23')
                ).pathname
              : w.pathname,
          ]),
          pathnameBase:
            w.pathnameBase === '/'
              ? y
              : Ge([
                  y,
                  s.encodeLocation
                    ? s.encodeLocation(
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
    o
  );
  return c && z
    ? N.createElement(
        gu.Provider,
        {
          value: {
            location: {
              pathname: '/',
              search: '',
              hash: '',
              state: null,
              key: 'default',
              unstable_mask: void 0,
              ..._,
            },
            navigationType: 'POP',
          },
        },
        z
      )
    : z;
}
function fg() {
  let n = bg(),
    c = Fv(n) ? `${n.status} ${n.statusText}` : n instanceof Error ? n.message : JSON.stringify(n),
    o = n instanceof Error ? n.stack : null,
    s = 'rgba(200,200,200, 0.5)',
    r = { padding: '0.5rem', backgroundColor: s },
    d = { padding: '2px 4px', backgroundColor: s },
    p = null;
  return (
    console.error('Error handled by React Router default ErrorBoundary:', n),
    (p = N.createElement(
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
      N.createElement('h3', { style: { fontStyle: 'italic' } }, c),
      o ? N.createElement('pre', { style: r }, o) : null,
      p
    )
  );
}
var dg = N.createElement(fg, null),
  hy = class extends N.Component {
    constructor(n) {
      (super(n),
        (this.state = { location: n.location, revalidation: n.revalidation, error: n.error }));
    }
    static getDerivedStateFromError(n) {
      return { error: n };
    }
    static getDerivedStateFromProps(n, c) {
      return c.location !== n.location || (c.revalidation !== 'idle' && n.revalidation === 'idle')
        ? { error: n.error, location: n.location, revalidation: n.revalidation }
        : {
            error: n.error !== void 0 ? n.error : c.error,
            location: c.location,
            revalidation: n.revalidation || c.revalidation,
          };
    }
    componentDidCatch(n, c) {
      this.props.onError
        ? this.props.onError(n, c)
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
        const o = ig(n.digest);
        o && (n = o);
      }
      let c =
        n !== void 0
          ? N.createElement(
              Xe.Provider,
              { value: this.props.routeContext },
              N.createElement(tr.Provider, { value: n, children: this.props.component })
            )
          : this.props.children;
      return this.context ? N.createElement(mg, { error: n }, c) : c;
    }
  };
hy.contextType = sy;
var Oo = new WeakMap();
function mg({ children: n, error: c }) {
  let { basename: o } = N.useContext(Ae);
  if (typeof c == 'object' && c && 'digest' in c && typeof c.digest == 'string') {
    let s = ug(c.digest);
    if (s) {
      let r = Oo.get(c);
      if (r) throw r;
      let d = iy(s.location, o);
      if (uy && !Oo.get(c))
        if (d.isExternal || s.reloadDocument) window.location.href = d.absoluteURL || d.to;
        else {
          const p = Promise.resolve().then(() =>
            window.__reactRouterDataRouter.navigate(d.to, { replace: s.replace })
          );
          throw (Oo.set(c, p), p);
        }
      return N.createElement('meta', {
        httpEquiv: 'refresh',
        content: `0;url=${d.absoluteURL || d.to}`,
      });
    }
  }
  return n;
}
function hg({ routeContext: n, match: c, children: o }) {
  let s = N.useContext(rn);
  return (
    s &&
      s.static &&
      s.staticContext &&
      (c.route.errorElement || c.route.ErrorBoundary) &&
      (s.staticContext._deepestRenderedBoundaryId = c.route.id),
    N.createElement(Xe.Provider, { value: n }, o)
  );
}
function yg(n, c = [], o) {
  let s = o == null ? void 0 : o.state;
  if (n == null) {
    if (!s) return null;
    if (s.errors) n = s.matches;
    else if (c.length === 0 && !s.initialized && s.matches.length > 0) n = s.matches;
    else return null;
  }
  let r = n,
    d = s == null ? void 0 : s.errors;
  if (d != null) {
    let E = r.findIndex((_) => _.route.id && (d == null ? void 0 : d[_.route.id]) !== void 0);
    (kt(
      E >= 0,
      `Could not find a matching route for errors on route IDs: ${Object.keys(d).join(',')}`
    ),
      (r = r.slice(0, Math.min(r.length, E + 1))));
  }
  let p = !1,
    v = -1;
  if (o && s) {
    p = s.renderFallback;
    for (let E = 0; E < r.length; E++) {
      let _ = r[E];
      if (((_.route.HydrateFallback || _.route.hydrateFallbackElement) && (v = E), _.route.id)) {
        let { loaderData: T, errors: Y } = s,
          H = _.route.loader && !T.hasOwnProperty(_.route.id) && (!Y || Y[_.route.id] === void 0);
        if (_.route.lazy || H) {
          (o.isStatic && (p = !0), v >= 0 ? (r = r.slice(0, v + 1)) : (r = [r[0]]));
          break;
        }
      }
    }
  }
  let y = o == null ? void 0 : o.onError,
    m =
      s && y
        ? (E, _) => {
            var T, Y;
            y(E, {
              location: s.location,
              params:
                ((Y = (T = s.matches) == null ? void 0 : T[0]) == null ? void 0 : Y.params) ?? {},
              unstable_pattern: Iv(s.matches),
              errorInfo: _,
            });
          }
        : void 0;
  return r.reduceRight((E, _, T) => {
    let Y,
      H = !1,
      z = null,
      B = null;
    s &&
      ((Y = d && _.route.id ? d[_.route.id] : void 0),
      (z = _.route.errorElement || dg),
      p &&
        (v < 0 && T === 0
          ? (yy(
              'route-fallback',
              !1,
              'No `HydrateFallback` element provided to render during initial hydration'
            ),
            (H = !0),
            (B = null))
          : v === T && ((H = !0), (B = _.route.hydrateFallbackElement || null))));
    let w = c.concat(r.slice(0, T + 1)),
      Q = () => {
        let j;
        return (
          Y
            ? (j = z)
            : H
              ? (j = B)
              : _.route.Component
                ? (j = N.createElement(_.route.Component, null))
                : _.route.element
                  ? (j = _.route.element)
                  : (j = E),
          N.createElement(hg, {
            match: _,
            routeContext: { outlet: E, matches: w, isDataRoute: s != null },
            children: j,
          })
        );
      };
    return s && (_.route.ErrorBoundary || _.route.errorElement || T === 0)
      ? N.createElement(hy, {
          location: s.location,
          revalidation: s.revalidation,
          component: z,
          error: Y,
          children: Q(),
          routeContext: { outlet: null, matches: w, isDataRoute: !0 },
          onError: m,
        })
      : Q();
  }, null);
}
function er(n) {
  return `${n} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function pg(n) {
  let c = N.useContext(rn);
  return (kt(c, er(n)), c);
}
function vg(n) {
  let c = N.useContext(Ii);
  return (kt(c, er(n)), c);
}
function gg(n) {
  let c = N.useContext(Xe);
  return (kt(c, er(n)), c);
}
function lr(n) {
  let c = gg(n),
    o = c.matches[c.matches.length - 1];
  return (kt(o.route.id, `${n} can only be used on routes that contain a unique "id"`), o.route.id);
}
function _g() {
  return lr('useRouteId');
}
function bg() {
  var s;
  let n = N.useContext(tr),
    c = vg('useRouteError'),
    o = lr('useRouteError');
  return n !== void 0 ? n : (s = c.errors) == null ? void 0 : s[o];
}
function Sg() {
  let { router: n } = pg('useNavigate'),
    c = lr('useNavigate'),
    o = N.useRef(!1);
  return (
    dy(() => {
      o.current = !0;
    }),
    N.useCallback(
      async (r, d = {}) => {
        (Ye(o.current, fy),
          o.current &&
            (typeof r == 'number'
              ? await n.navigate(r)
              : await n.navigate(r, { fromRouteId: c, ...d })));
      },
      [n, c]
    )
  );
}
var kh = {};
function yy(n, c, o) {
  !c && !kh[n] && ((kh[n] = !0), Ye(!1, o));
}
N.memo(xg);
function xg({ routes: n, future: c, state: o, isStatic: s, onError: r }) {
  return my(n, void 0, { state: o, isStatic: s, onError: r });
}
function gl({ to: n, replace: c, state: o, relative: s }) {
  kt(fn(), '<Navigate> may be used only in the context of a <Router> component.');
  let { static: r } = N.useContext(Ae);
  Ye(
    !r,
    '<Navigate> must not be used on the initial render in a <StaticRouter>. This is a no-op, but you should modify your code so the <Navigate> is only ever rendered in response to some user interaction or state change.'
  );
  let { matches: d } = N.useContext(Xe),
    { pathname: p } = Je(),
    v = bl(),
    y = Fi(n, Po(d), p, s === 'path'),
    m = JSON.stringify(y);
  return (
    N.useEffect(() => {
      v(JSON.parse(m), { replace: c, state: o, relative: s });
    }, [v, m, s, c, o]),
    null
  );
}
function $e(n) {
  kt(
    !1,
    'A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>.'
  );
}
function Eg({
  basename: n = '/',
  children: c = null,
  location: o,
  navigationType: s = 'POP',
  navigator: r,
  static: d = !1,
  unstable_useTransitions: p,
}) {
  kt(
    !fn(),
    'You cannot render a <Router> inside another <Router>. You should never have more than one in your app.'
  );
  let v = n.replace(/^\/*/, '/'),
    y = N.useMemo(
      () => ({ basename: v, navigator: r, static: d, unstable_useTransitions: p, future: {} }),
      [v, r, d, p]
    );
  typeof o == 'string' && (o = on(o));
  let {
      pathname: m = '/',
      search: E = '',
      hash: _ = '',
      state: T = null,
      key: Y = 'default',
      unstable_mask: H,
    } = o,
    z = N.useMemo(() => {
      let B = vl(m, v);
      return B == null
        ? null
        : {
            location: { pathname: B, search: E, hash: _, state: T, key: Y, unstable_mask: H },
            navigationType: s,
          };
    }, [v, m, E, _, T, Y, s, H]);
  return (
    Ye(
      z != null,
      `<Router basename="${v}"> is not able to match the URL "${m}${E}${_}" because it does not start with the basename, so the <Router> won't render anything.`
    ),
    z == null
      ? null
      : N.createElement(
          Ae.Provider,
          { value: y },
          N.createElement(gu.Provider, { children: c, value: z })
        )
  );
}
function Tg({ children: n, location: c }) {
  return rg(Go(n), c);
}
function Go(n, c = []) {
  let o = [];
  return (
    N.Children.forEach(n, (s, r) => {
      if (!N.isValidElement(s)) return;
      let d = [...c, r];
      if (s.type === N.Fragment) {
        o.push.apply(o, Go(s.props.children, d));
        return;
      }
      (kt(
        s.type === $e,
        `[${typeof s.type == 'string' ? s.type : s.type.name}] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>`
      ),
        kt(!s.props.index || !s.props.children, 'An index route cannot have child routes.'));
      let p = {
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
      (s.props.children && (p.children = Go(s.props.children, d)), o.push(p));
    }),
    o
  );
}
var Yi = 'get',
  Xi = 'application/x-www-form-urlencoded';
function Pi(n) {
  return typeof HTMLElement < 'u' && n instanceof HTMLElement;
}
function Ng(n) {
  return Pi(n) && n.tagName.toLowerCase() === 'button';
}
function Ag(n) {
  return Pi(n) && n.tagName.toLowerCase() === 'form';
}
function Mg(n) {
  return Pi(n) && n.tagName.toLowerCase() === 'input';
}
function Cg(n) {
  return !!(n.metaKey || n.altKey || n.ctrlKey || n.shiftKey);
}
function Rg(n, c) {
  return n.button === 0 && (!c || c === '_self') && !Cg(n);
}
var qi = null;
function Dg() {
  if (qi === null)
    try {
      (new FormData(document.createElement('form'), 0), (qi = !1));
    } catch {
      qi = !0;
    }
  return qi;
}
var Og = new Set(['application/x-www-form-urlencoded', 'multipart/form-data', 'text/plain']);
function zo(n) {
  return n != null && !Og.has(n)
    ? (Ye(
        !1,
        `"${n}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${Xi}"`
      ),
      null)
    : n;
}
function zg(n, c) {
  let o, s, r, d, p;
  if (Ag(n)) {
    let v = n.getAttribute('action');
    ((s = v ? vl(v, c) : null),
      (o = n.getAttribute('method') || Yi),
      (r = zo(n.getAttribute('enctype')) || Xi),
      (d = new FormData(n)));
  } else if (Ng(n) || (Mg(n) && (n.type === 'submit' || n.type === 'image'))) {
    let v = n.form;
    if (v == null)
      throw new Error('Cannot submit a <button> or <input type="submit"> without a <form>');
    let y = n.getAttribute('formaction') || v.getAttribute('action');
    if (
      ((s = y ? vl(y, c) : null),
      (o = n.getAttribute('formmethod') || v.getAttribute('method') || Yi),
      (r = zo(n.getAttribute('formenctype')) || zo(v.getAttribute('enctype')) || Xi),
      (d = new FormData(v, n)),
      !Dg())
    ) {
      let { name: m, type: E, value: _ } = n;
      if (E === 'image') {
        let T = m ? `${m}.` : '';
        (d.append(`${T}x`, '0'), d.append(`${T}y`, '0'));
      } else m && d.append(m, _);
    }
  } else {
    if (Pi(n))
      throw new Error(
        'Cannot submit element that is not <form>, <button>, or <input type="submit|image">'
      );
    ((o = Yi), (s = null), (r = Xi), (p = n));
  }
  return (
    d && r === 'text/plain' && ((p = d), (d = void 0)),
    { action: s, method: o.toLowerCase(), encType: r, formData: d, body: p }
  );
}
Object.getOwnPropertyNames(Object.prototype).sort().join('\0');
function ar(n, c) {
  if (n === !1 || n === null || typeof n > 'u') throw new Error(c);
}
function py(n, c, o, s) {
  let r =
    typeof n == 'string'
      ? new URL(n, typeof window > 'u' ? 'server://singlefetch/' : window.location.origin)
      : n;
  return (
    o
      ? r.pathname.endsWith('/')
        ? (r.pathname = `${r.pathname}_.${s}`)
        : (r.pathname = `${r.pathname}.${s}`)
      : r.pathname === '/'
        ? (r.pathname = `_root.${s}`)
        : c && vl(r.pathname, c) === '/'
          ? (r.pathname = `${Zi(c)}/_root.${s}`)
          : (r.pathname = `${Zi(r.pathname)}.${s}`),
    r
  );
}
async function jg(n, c) {
  if (n.id in c) return c[n.id];
  try {
    let o = await import(n.module);
    return ((c[n.id] = o), o);
  } catch (o) {
    return (
      console.error(`Error loading route module \`${n.module}\`, reloading page...`),
      console.error(o),
      window.__reactRouterContext && window.__reactRouterContext.isSpaMode,
      window.location.reload(),
      new Promise(() => {})
    );
  }
}
function kg(n) {
  return n == null
    ? !1
    : n.href == null
      ? n.rel === 'preload' && typeof n.imageSrcSet == 'string' && typeof n.imageSizes == 'string'
      : typeof n.rel == 'string' && typeof n.href == 'string';
}
async function wg(n, c, o) {
  let s = await Promise.all(
    n.map(async (r) => {
      let d = c.routes[r.route.id];
      if (d) {
        let p = await jg(d, o);
        return p.links ? p.links() : [];
      }
      return [];
    })
  );
  return Lg(
    s
      .flat(1)
      .filter(kg)
      .filter((r) => r.rel === 'stylesheet' || r.rel === 'preload')
      .map((r) =>
        r.rel === 'stylesheet' ? { ...r, rel: 'prefetch', as: 'style' } : { ...r, rel: 'prefetch' }
      )
  );
}
function wh(n, c, o, s, r, d) {
  let p = (y, m) => (o[m] ? y.route.id !== o[m].route.id : !0),
    v = (y, m) => {
      var E;
      return (
        o[m].pathname !== y.pathname ||
        (((E = o[m].route.path) == null ? void 0 : E.endsWith('*')) &&
          o[m].params['*'] !== y.params['*'])
      );
    };
  return d === 'assets'
    ? c.filter((y, m) => p(y, m) || v(y, m))
    : d === 'data'
      ? c.filter((y, m) => {
          var _;
          let E = s.routes[y.route.id];
          if (!E || !E.hasLoader) return !1;
          if (p(y, m) || v(y, m)) return !0;
          if (y.route.shouldRevalidate) {
            let T = y.route.shouldRevalidate({
              currentUrl: new URL(r.pathname + r.search + r.hash, window.origin),
              currentParams: ((_ = o[0]) == null ? void 0 : _.params) || {},
              nextUrl: new URL(n, window.origin),
              nextParams: y.params,
              defaultShouldRevalidate: !0,
            });
            if (typeof T == 'boolean') return T;
          }
          return !0;
        })
      : [];
}
function Ug(n, c, { includeHydrateFallback: o } = {}) {
  return Bg(
    n
      .map((s) => {
        let r = c.routes[s.route.id];
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
function Bg(n) {
  return [...new Set(n)];
}
function Hg(n) {
  let c = {},
    o = Object.keys(n).sort();
  for (let s of o) c[s] = n[s];
  return c;
}
function Lg(n, c) {
  let o = new Set();
  return (
    new Set(c),
    n.reduce((s, r) => {
      let d = JSON.stringify(Hg(r));
      return (o.has(d) || (o.add(d), s.push({ key: d, link: r })), s);
    }, [])
  );
}
function nr() {
  let n = N.useContext(rn);
  return (ar(n, 'You must render this element inside a <DataRouterContext.Provider> element'), n);
}
function qg() {
  let n = N.useContext(Ii);
  return (
    ar(n, 'You must render this element inside a <DataRouterStateContext.Provider> element'),
    n
  );
}
var ur = N.createContext(void 0);
ur.displayName = 'FrameworkContext';
function ir() {
  let n = N.useContext(ur);
  return (ar(n, 'You must render this element inside a <HydratedRouter> element'), n);
}
function Gg(n, c) {
  let o = N.useContext(ur),
    [s, r] = N.useState(!1),
    [d, p] = N.useState(!1),
    { onFocus: v, onBlur: y, onMouseEnter: m, onMouseLeave: E, onTouchStart: _ } = c,
    T = N.useRef(null);
  (N.useEffect(() => {
    if ((n === 'render' && p(!0), n === 'viewport')) {
      let z = (w) => {
          w.forEach((Q) => {
            p(Q.isIntersecting);
          });
        },
        B = new IntersectionObserver(z, { threshold: 0.5 });
      return (
        T.current && B.observe(T.current),
        () => {
          B.disconnect();
        }
      );
    }
  }, [n]),
    N.useEffect(() => {
      if (s) {
        let z = setTimeout(() => {
          p(!0);
        }, 100);
        return () => {
          clearTimeout(z);
        };
      }
    }, [s]));
  let Y = () => {
      r(!0);
    },
    H = () => {
      (r(!1), p(!1));
    };
  return o
    ? n !== 'intent'
      ? [d, T, {}]
      : [
          d,
          T,
          {
            onFocus: ou(v, Y),
            onBlur: ou(y, H),
            onMouseEnter: ou(m, Y),
            onMouseLeave: ou(E, H),
            onTouchStart: ou(_, Y),
          },
        ]
    : [!1, T, {}];
}
function ou(n, c) {
  return (o) => {
    (n && n(o), o.defaultPrevented || c(o));
  };
}
function Yg({ page: n, ...c }) {
  let o = tg(),
    { router: s } = nr(),
    r = N.useMemo(() => ey(s.routes, n, s.basename), [s.routes, n, s.basename]);
  return r
    ? o
      ? N.createElement(Qg, { page: n, matches: r, ...c })
      : N.createElement(Vg, { page: n, matches: r, ...c })
    : null;
}
function Xg(n) {
  let { manifest: c, routeModules: o } = ir(),
    [s, r] = N.useState([]);
  return (
    N.useEffect(() => {
      let d = !1;
      return (
        wg(n, c, o).then((p) => {
          d || r(p);
        }),
        () => {
          d = !0;
        }
      );
    }, [n, c, o]),
    s
  );
}
function Qg({ page: n, matches: c, ...o }) {
  let s = Je(),
    { future: r } = ir(),
    { basename: d } = nr(),
    p = N.useMemo(() => {
      if (n === s.pathname + s.search + s.hash) return [];
      let v = py(n, d, r.unstable_trailingSlashAwareDataRequests, 'rsc'),
        y = !1,
        m = [];
      for (let E of c)
        typeof E.route.shouldRevalidate == 'function' ? (y = !0) : m.push(E.route.id);
      return (
        y && m.length > 0 && v.searchParams.set('_routes', m.join(',')),
        [v.pathname + v.search]
      );
    }, [d, r.unstable_trailingSlashAwareDataRequests, n, s, c]);
  return N.createElement(
    N.Fragment,
    null,
    p.map((v) => N.createElement('link', { key: v, rel: 'prefetch', as: 'fetch', href: v, ...o }))
  );
}
function Vg({ page: n, matches: c, ...o }) {
  let s = Je(),
    { future: r, manifest: d, routeModules: p } = ir(),
    { basename: v } = nr(),
    { loaderData: y, matches: m } = qg(),
    E = N.useMemo(() => wh(n, c, m, d, s, 'data'), [n, c, m, d, s]),
    _ = N.useMemo(() => wh(n, c, m, d, s, 'assets'), [n, c, m, d, s]),
    T = N.useMemo(() => {
      if (n === s.pathname + s.search + s.hash) return [];
      let z = new Set(),
        B = !1;
      if (
        (c.forEach((Q) => {
          var X;
          let j = d.routes[Q.route.id];
          !j ||
            !j.hasLoader ||
            ((!E.some(($) => $.route.id === Q.route.id) &&
              Q.route.id in y &&
              (X = p[Q.route.id]) != null &&
              X.shouldRevalidate) ||
            j.hasClientLoader
              ? (B = !0)
              : z.add(Q.route.id));
        }),
        z.size === 0)
      )
        return [];
      let w = py(n, v, r.unstable_trailingSlashAwareDataRequests, 'data');
      return (
        B &&
          z.size > 0 &&
          w.searchParams.set(
            '_routes',
            c
              .filter((Q) => z.has(Q.route.id))
              .map((Q) => Q.route.id)
              .join(',')
          ),
        [w.pathname + w.search]
      );
    }, [v, r.unstable_trailingSlashAwareDataRequests, y, s, d, E, c, n, p]),
    Y = N.useMemo(() => Ug(_, d), [_, d]),
    H = Xg(_);
  return N.createElement(
    N.Fragment,
    null,
    T.map((z) => N.createElement('link', { key: z, rel: 'prefetch', as: 'fetch', href: z, ...o })),
    Y.map((z) => N.createElement('link', { key: z, rel: 'modulepreload', href: z, ...o })),
    H.map(({ key: z, link: B }) =>
      N.createElement('link', {
        key: z,
        nonce: o.nonce,
        ...B,
        crossOrigin: B.crossOrigin ?? o.crossOrigin,
      })
    )
  );
}
function Zg(...n) {
  return (c) => {
    n.forEach((o) => {
      typeof o == 'function' ? o(c) : o != null && (o.current = c);
    });
  };
}
var Kg =
  typeof window < 'u' && typeof window.document < 'u' && typeof window.document.createElement < 'u';
try {
  Kg && (window.__reactRouterVersion = '7.14.2');
} catch {}
function $g({ basename: n, children: c, unstable_useTransitions: o, window: s }) {
  let r = N.useRef();
  r.current == null && (r.current = Mv({ window: s, v5Compat: !0 }));
  let d = r.current,
    [p, v] = N.useState({ action: d.action, location: d.location }),
    y = N.useCallback(
      (m) => {
        o === !1 ? v(m) : N.startTransition(() => v(m));
      },
      [o]
    );
  return (
    N.useLayoutEffect(() => d.listen(y), [d, y]),
    N.createElement(Eg, {
      basename: n,
      children: c,
      location: p.location,
      navigationType: p.action,
      navigator: d,
      unstable_useTransitions: o,
    })
  );
}
var vy = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,
  gy = N.forwardRef(function (
    {
      onClick: c,
      discover: o = 'render',
      prefetch: s = 'none',
      relative: r,
      reloadDocument: d,
      replace: p,
      unstable_mask: v,
      state: y,
      target: m,
      to: E,
      preventScrollReset: _,
      viewTransition: T,
      unstable_defaultShouldRevalidate: Y,
      ...H
    },
    z
  ) {
    let { basename: B, navigator: w, unstable_useTransitions: Q } = N.useContext(Ae),
      j = typeof E == 'string' && vy.test(E),
      X = iy(E, B);
    E = X.to;
    let $ = cg(E, { relative: r }),
      J = Je(),
      V = null;
    if (v) {
      let Ut = Fi(v, [], J.unstable_mask ? J.unstable_mask.pathname : '/', !0);
      (B !== '/' && (Ut.pathname = Ut.pathname === '/' ? B : Ge([B, Ut.pathname])),
        (V = w.createHref(Ut)));
    }
    let [tt, it, dt] = Gg(s, H),
      wt = Ig(E, {
        replace: p,
        unstable_mask: v,
        state: y,
        target: m,
        preventScrollReset: _,
        relative: r,
        viewTransition: T,
        unstable_defaultShouldRevalidate: Y,
        unstable_useTransitions: Q,
      });
    function $t(Ut) {
      (c && c(Ut), Ut.defaultPrevented || wt(Ut));
    }
    let he = !(X.isExternal || d),
      ie = N.createElement('a', {
        ...H,
        ...dt,
        href: (he ? V : void 0) || X.absoluteURL || $,
        onClick: he ? $t : c,
        ref: Zg(z, it),
        target: m,
        'data-discover': !j && o === 'render' ? 'true' : void 0,
      });
    return tt && !j ? N.createElement(N.Fragment, null, ie, N.createElement(Yg, { page: $ })) : ie;
  });
gy.displayName = 'Link';
var Jg = N.forwardRef(function (
  {
    'aria-current': c = 'page',
    caseSensitive: o = !1,
    className: s = '',
    end: r = !1,
    style: d,
    to: p,
    viewTransition: v,
    children: y,
    ...m
  },
  E
) {
  let _ = _u(p, { relative: m.relative }),
    T = Je(),
    Y = N.useContext(Ii),
    { navigator: H, basename: z } = N.useContext(Ae),
    B = Y != null && a1(_) && v === !0,
    w = H.encodeLocation ? H.encodeLocation(_).pathname : _.pathname,
    Q = T.pathname,
    j = Y && Y.navigation && Y.navigation.location ? Y.navigation.location.pathname : null;
  (o || ((Q = Q.toLowerCase()), (j = j ? j.toLowerCase() : null), (w = w.toLowerCase())),
    j && z && (j = vl(j, z) || j));
  const X = w !== '/' && w.endsWith('/') ? w.length - 1 : w.length;
  let $ = Q === w || (!r && Q.startsWith(w) && Q.charAt(X) === '/'),
    J = j != null && (j === w || (!r && j.startsWith(w) && j.charAt(w.length) === '/')),
    V = { isActive: $, isPending: J, isTransitioning: B },
    tt = $ ? c : void 0,
    it;
  typeof s == 'function'
    ? (it = s(V))
    : (it = [s, $ ? 'active' : null, J ? 'pending' : null, B ? 'transitioning' : null]
        .filter(Boolean)
        .join(' '));
  let dt = typeof d == 'function' ? d(V) : d;
  return N.createElement(
    gy,
    { ...m, 'aria-current': tt, className: it, ref: E, style: dt, to: p, viewTransition: v },
    typeof y == 'function' ? y(V) : y
  );
});
Jg.displayName = 'NavLink';
var Wg = N.forwardRef(
  (
    {
      discover: n = 'render',
      fetcherKey: c,
      navigate: o,
      reloadDocument: s,
      replace: r,
      state: d,
      method: p = Yi,
      action: v,
      onSubmit: y,
      relative: m,
      preventScrollReset: E,
      viewTransition: _,
      unstable_defaultShouldRevalidate: T,
      ...Y
    },
    H
  ) => {
    let { unstable_useTransitions: z } = N.useContext(Ae),
      B = e1(),
      w = l1(v, { relative: m }),
      Q = p.toLowerCase() === 'get' ? 'get' : 'post',
      j = typeof v == 'string' && vy.test(v),
      X = ($) => {
        if ((y && y($), $.defaultPrevented)) return;
        $.preventDefault();
        let J = $.nativeEvent.submitter,
          V = (J == null ? void 0 : J.getAttribute('formmethod')) || p,
          tt = () =>
            B(J || $.currentTarget, {
              fetcherKey: c,
              method: V,
              navigate: o,
              replace: r,
              state: d,
              relative: m,
              preventScrollReset: E,
              viewTransition: _,
              unstable_defaultShouldRevalidate: T,
            });
        z && o !== !1 ? N.startTransition(() => tt()) : tt();
      };
    return N.createElement('form', {
      ref: H,
      method: Q,
      action: w,
      onSubmit: s ? y : X,
      ...Y,
      'data-discover': !j && n === 'render' ? 'true' : void 0,
    });
  }
);
Wg.displayName = 'Form';
function Fg(n) {
  return `${n} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function _y(n) {
  let c = N.useContext(rn);
  return (kt(c, Fg(n)), c);
}
function Ig(
  n,
  {
    target: c,
    replace: o,
    unstable_mask: s,
    state: r,
    preventScrollReset: d,
    relative: p,
    viewTransition: v,
    unstable_defaultShouldRevalidate: y,
    unstable_useTransitions: m,
  } = {}
) {
  let E = bl(),
    _ = Je(),
    T = _u(n, { relative: p });
  return N.useCallback(
    (Y) => {
      if (Rg(Y, c)) {
        Y.preventDefault();
        let H = o !== void 0 ? o : yu(_) === yu(T),
          z = () =>
            E(n, {
              replace: H,
              unstable_mask: s,
              state: r,
              preventScrollReset: d,
              relative: p,
              viewTransition: v,
              unstable_defaultShouldRevalidate: y,
            });
        m ? N.startTransition(() => z()) : z();
      }
    },
    [_, E, T, o, s, r, c, n, d, p, v, y, m]
  );
}
var Pg = 0,
  t1 = () => `__${String(++Pg)}__`;
function e1() {
  let { router: n } = _y('useSubmit'),
    { basename: c } = N.useContext(Ae),
    o = _g(),
    s = n.fetch,
    r = n.navigate;
  return N.useCallback(
    async (d, p = {}) => {
      let { action: v, method: y, encType: m, formData: E, body: _ } = zg(d, c);
      if (p.navigate === !1) {
        let T = p.fetcherKey || t1();
        await s(T, o, p.action || v, {
          unstable_defaultShouldRevalidate: p.unstable_defaultShouldRevalidate,
          preventScrollReset: p.preventScrollReset,
          formData: E,
          body: _,
          formMethod: p.method || y,
          formEncType: p.encType || m,
          flushSync: p.flushSync,
        });
      } else
        await r(p.action || v, {
          unstable_defaultShouldRevalidate: p.unstable_defaultShouldRevalidate,
          preventScrollReset: p.preventScrollReset,
          formData: E,
          body: _,
          formMethod: p.method || y,
          formEncType: p.encType || m,
          replace: p.replace,
          state: p.state,
          fromRouteId: o,
          flushSync: p.flushSync,
          viewTransition: p.viewTransition,
        });
    },
    [s, r, c, o]
  );
}
function l1(n, { relative: c } = {}) {
  let { basename: o } = N.useContext(Ae),
    s = N.useContext(Xe);
  kt(s, 'useFormAction must be used inside a RouteContext');
  let [r] = s.matches.slice(-1),
    d = { ..._u(n || '.', { relative: c }) },
    p = Je();
  if (n == null) {
    d.search = p.search;
    let v = new URLSearchParams(d.search),
      y = v.getAll('index');
    if (y.some((E) => E === '')) {
      (v.delete('index'), y.filter((_) => _).forEach((_) => v.append('index', _)));
      let E = v.toString();
      d.search = E ? `?${E}` : '';
    }
  }
  return (
    (!n || n === '.') &&
      r.route.index &&
      (d.search = d.search ? d.search.replace(/^\?/, '?index&') : '?index'),
    o !== '/' && (d.pathname = d.pathname === '/' ? o : Ge([o, d.pathname])),
    yu(d)
  );
}
function a1(n, { relative: c } = {}) {
  let o = N.useContext(oy);
  kt(
    o != null,
    "`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?"
  );
  let { basename: s } = _y('useViewTransitionState'),
    r = _u(n, { relative: c });
  if (!o.isTransitioning) return !1;
  let d = vl(o.currentLocation.pathname, s) || o.currentLocation.pathname,
    p = vl(o.nextLocation.pathname, s) || o.nextLocation.pathname;
  return Vi(r.pathname, p) != null || Vi(r.pathname, d) != null;
}
const n1 = '_layout_apkdr_1',
  u1 = '_enemies_apkdr_12',
  i1 = '_enemy_apkdr_20',
  c1 = '_targeted_apkdr_35',
  s1 = '_enemyName_apkdr_39',
  o1 = '_down_apkdr_44',
  r1 = '_log_apkdr_48',
  f1 = '_logLine_apkdr_60',
  d1 = '_party_apkdr_64',
  m1 = '_rowTag_apkdr_71',
  h1 = '_cardRow_apkdr_77',
  y1 = '_card_apkdr_77',
  p1 = '_cardActive_apkdr_99',
  v1 = '_cardDecided_apkdr_104',
  g1 = '_cardName_apkdr_108',
  _1 = '_uni_apkdr_116',
  b1 = '_cardNums_apkdr_120',
  S1 = '_cardCmd_apkdr_126',
  x1 = '_empty_apkdr_132',
  E1 = '_command_apkdr_137',
  T1 = '_skillList_apkdr_143',
  N1 = '_skillBtn_apkdr_149',
  A1 = '_skillTop_apkdr_161',
  M1 = '_skillName_apkdr_168',
  C1 = '_skillDesc_apkdr_173',
  R1 = '_target_apkdr_35',
  D1 = '_cmdHead_apkdr_184',
  O1 = '_menu_apkdr_189',
  z1 = '_menuBtn_apkdr_195',
  j1 = '_tp_apkdr_212',
  k1 = '_menuBack_apkdr_218',
  w1 = '_execRow_apkdr_228',
  U1 = '_redo_apkdr_233',
  B1 = '_primary_apkdr_243',
  H1 = '_result_apkdr_258',
  L1 = '_resultTitle_apkdr_269',
  q1 = '_resultBody_apkdr_274',
  lt = {
    layout: n1,
    enemies: u1,
    enemy: i1,
    targeted: c1,
    enemyName: s1,
    down: o1,
    log: r1,
    logLine: f1,
    party: d1,
    rowTag: m1,
    cardRow: h1,
    card: y1,
    cardActive: p1,
    cardDecided: v1,
    cardName: g1,
    uni: _1,
    cardNums: b1,
    cardCmd: S1,
    empty: x1,
    command: E1,
    skillList: T1,
    skillBtn: N1,
    skillTop: A1,
    skillName: M1,
    skillDesc: C1,
    target: R1,
    cmdHead: D1,
    menu: O1,
    menuBtn: z1,
    tp: j1,
    menuBack: k1,
    execRow: w1,
    redo: U1,
    primary: B1,
    result: H1,
    resultTitle: L1,
    resultBody: q1,
  },
  G1 = '_row_1t6j7_1',
  Y1 = '_label_1t6j7_8',
  X1 = '_track_1t6j7_16',
  Q1 = '_fill_1t6j7_24',
  V1 = '_value_1t6j7_30',
  ru = { row: G1, label: Y1, track: X1, fill: Q1, value: V1 },
  jo = ({ value: n, max: c, color: o = '#4caf50', label: s, showValue: r = !0 }) => {
    const d = c > 0 ? Math.max(0, Math.min(100, (n / c) * 100)) : 0;
    return g.jsxs('div', {
      className: ru.row,
      children: [
        s ? g.jsx('span', { className: ru.label, children: s }) : null,
        g.jsx('div', {
          className: ru.track,
          children: g.jsx('div', {
            className: ru.fill,
            style: { width: `${d}%`, backgroundColor: o },
          }),
        }),
        r
          ? g.jsxs('span', {
              className: ru.value,
              children: [Math.max(0, Math.round(n)), '/', Math.round(c)],
            })
          : null,
      ],
    });
  },
  un = {
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
    skill_union_rally: {
      id: 'skill_union_rally',
      name: 'ラリー',
      tree: 'race',
      tpCost: () => 0,
      element: 'almighty',
      target: 'allyAll',
      effects: [{ kind: 'heal', amount: (n) => 10 + 5 * n }],
    },
  },
  cr = {
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
    skill_union_rally: {
      id: 'skill_union_rally',
      name: 'ラリー',
      description: '味方全体を鼓舞するユニオンスキル。',
    },
  },
  Dt = {
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
  Z1 = 500,
  Yo = 30,
  tc = 3,
  ec = 2,
  K1 = tc + ec,
  sr = (n) => n > 0 && n % Dt.BOSS_INTERVAL === 0,
  Uh = (n) => Math.round(Dt.EXP_CURVE_BASE * Math.pow(n, Dt.EXP_CURVE_POW)),
  ko = (n) => n < Dt.LEVEL_CAP,
  by = (n, c) => 1 + Dt.ENEMY_SCALE_K * (n - c),
  bu = {
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
    },
  },
  Ne = {
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
  },
  $1 = ['hp', 'tp', 'str', 'vit', 'agi', 'int', 'mnd', 'luc'],
  J1 = ['slash', 'pierce', 'bash'],
  Ki = (n, c, o) => Math.max(c, Math.min(o, n));
function W1(n, c) {
  const o = {};
  for (const s of $1) o[s] = Math.round(n[s] * c);
  return o;
}
function F1(n, c) {
  return W1(n.baseStats, by(c, n.refDepth));
}
function an(n, c) {
  const o = new Map();
  for (const r of n) {
    if (r.stat !== c) continue;
    const d = Ki(r.modifier, 0.5, 1.5),
      p = o.get(r.stackGroup);
    (p === void 0 || Math.abs(d - 1) > Math.abs(p - 1)) && o.set(r.stackGroup, d);
  }
  let s = 1;
  for (const r of o.values()) s *= r;
  return Ki(s, 0.25, 2);
}
function Bh(n, c, o) {
  const s = (n.str * 2 + (c.atk ?? 0)) * an(o, 'patk'),
    r = (n.vit * 2 + (c.def ?? 0)) * an(o, 'pdef'),
    d = (n.int * 2 + (c.mat ?? 0)) * an(o, 'matk'),
    p = (n.mnd * 2 + (c.mdf ?? 0)) * an(o, 'mdef');
  return {
    patk: s,
    pdef: r,
    matk: d,
    mdef: p,
    hit: n.agi,
    acc: n.agi * an(o, 'acc'),
    eva: n.agi * an(o, 'eva'),
    crit: n.luc,
  };
}
const I1 = (n) => n.ailments.some((c) => c.type === 'blind');
function Sy(n, c, o, s) {
  const r = o.statBase === 'str',
    d = Bh(n.stats, n.equip, n.buffs),
    p = Bh(c.stats, c.equip, c.buffs),
    v = r ? d.patk : d.matk,
    y = r ? p.pdef : p.mdef;
  let m = !0;
  if (r) {
    const V = I1(n) ? Dt.BLIND_ACC_PENALTY : 0,
      tt = Ki(Dt.BASE_HIT + (d.acc - p.eva) * Dt.HIT_AGI_K - V, Dt.HIT_MIN, 1);
    m = s.next() < tt;
  }
  if (!m) return { damage: 0, hit: !1, critical: !1 };
  const _ = (v * o.power * Dt.DAMAGE_DEF_K) / (Dt.DAMAGE_DEF_K + Math.max(0, y)),
    T = r && J1.includes(o.element),
    Y = T && n.row === 'back' ? Dt.BACK_ROW_MELEE_MULT : 1,
    H = T && c.row === 'back' ? Dt.BACK_ROW_MELEE_MULT : 1,
    z = Y * H,
    [B, w] = Dt.DMG_VARIANCE,
    Q = B + s.next() * (w - B);
  let j = _ * o.elementMultiplier * z * Q;
  const X = Ki(
      Dt.CRIT_BASE + (n.stats.luc - c.stats.luc) * Dt.CRIT_LUC_K,
      Dt.CRIT_MIN,
      Dt.CRIT_MAX
    ),
    $ = s.next() < X;
  return (
    $ && (j *= Dt.CRIT_MULT),
    { damage: o.elementMultiplier === 0 ? 0 : Math.max(1, Math.floor(j)), hit: !0, critical: $ }
  );
}
const Jl = {
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
      unionSkillTree: { skills: [{ skillId: 'skill_union_rally', maxLevel: 3 }] },
      defaultClassId: 'class_guardian',
    },
    race_pix: {
      id: 'race_pix',
      name: 'ピクス',
      baseStatsAtLv1: { hp: 28, tp: 32, str: 4, vit: 5, agi: 9, int: 12, mnd: 11, luc: 7 },
      statGrowth: { hp: 5, tp: 7, str: 1, vit: 1, agi: 2, int: 3, mnd: 3, luc: 2 },
      unionSkillTree: { skills: [{ skillId: 'skill_union_rally', maxLevel: 3 }] },
      defaultClassId: 'class_mage',
    },
    race_therian: {
      id: 'race_therian',
      name: 'テリアン',
      baseStatsAtLv1: { hp: 38, tp: 18, str: 9, vit: 7, agi: 11, int: 6, mnd: 6, luc: 9 },
      statGrowth: { hp: 7, tp: 3, str: 2, vit: 2, agi: 3, int: 1, mnd: 1, luc: 3 },
      unionSkillTree: { skills: [{ skillId: 'skill_union_rally', maxLevel: 3 }] },
      defaultClassId: 'class_ranger',
    },
  },
  Zl = (n) => ({ hp: 0, tp: 0, str: 0, vit: 0, agi: 0, int: 0, mnd: 0, luc: 0, ...n }),
  $i = {
    title_berserker: {
      id: 'title_berserker',
      name: '狂戦士',
      parentClassId: 'class_warrior',
      skillTree: { skills: [] },
      growthModifier: Zl({ str: 1 }),
    },
    title_sentinel: {
      id: 'title_sentinel',
      name: '哨戒兵',
      parentClassId: 'class_warrior',
      skillTree: { skills: [] },
      growthModifier: Zl({ vit: 1 }),
    },
    title_bulwark: {
      id: 'title_bulwark',
      name: '城壁',
      parentClassId: 'class_guardian',
      skillTree: { skills: [] },
      growthModifier: Zl({ vit: 1, hp: 2 }),
    },
    title_vanguard: {
      id: 'title_vanguard',
      name: '先鋒',
      parentClassId: 'class_guardian',
      skillTree: { skills: [] },
      growthModifier: Zl({ str: 1 }),
    },
    title_pyromancer: {
      id: 'title_pyromancer',
      name: '紅蓮術士',
      parentClassId: 'class_mage',
      skillTree: { skills: [] },
      growthModifier: Zl({ int: 1 }),
    },
    title_sage: {
      id: 'title_sage',
      name: '賢者',
      parentClassId: 'class_mage',
      skillTree: { skills: [] },
      growthModifier: Zl({ tp: 2, mnd: 1 }),
    },
    title_sniper: {
      id: 'title_sniper',
      name: '狙撃手',
      parentClassId: 'class_ranger',
      skillTree: { skills: [] },
      growthModifier: Zl({ agi: 1, luc: 1 }),
    },
    title_tracker: {
      id: 'title_tracker',
      name: '追跡者',
      parentClassId: 'class_ranger',
      skillTree: { skills: [] },
      growthModifier: Zl({ agi: 1 }),
    },
  },
  P1 = ['hp', 'tp', 'str', 'vit', 'agi', 'int', 'mnd', 'luc'];
function Su(n) {
  var v, y;
  const c = Jl[n.raceId];
  if (!c) throw new Error(`computeBaseStats: 未定義の種族 "${n.raceId}"`);
  const s = Math.max(1, Math.min(n.level, Dt.LEVEL_CAP)) - 1,
    r = n.titleId ? ((v = $i[n.titleId]) == null ? void 0 : v.growthModifier) : void 0,
    d = ((y = n.rebirthBonus) == null ? void 0 : y.allStats) ?? 0,
    p = {};
  for (const m of P1) {
    const E = c.statGrowth[m] + ((r == null ? void 0 : r[m]) ?? 0);
    p[m] = c.baseStatsAtLv1[m] + E * s + d;
  }
  return p;
}
const dn = (n, c, o) => Math.max(c, Math.min(o, n));
function t_(n) {
  const c = { atk: 0, mat: 0, def: 0, mdf: 0 };
  for (const o of Object.values(n.equipment)) {
    if (!o) continue;
    const s = Ne[o];
    s &&
      ((c.atk += s.bonuses.atk ?? 0),
      (c.mat += s.bonuses.mat ?? 0),
      (c.def += s.bonuses.def ?? 0),
      (c.mdf += s.bonuses.mdf ?? 0));
  }
  return c;
}
function e_(n, c) {
  var p;
  const o = n.guild.members.find((v) => v.id === c);
  if (!o) return null;
  const s = (p = n.diveState) == null ? void 0 : p.party.find((v) => v.charId === c),
    r = Su(o),
    d = n.guild.party.front.includes(c);
  return {
    id: c,
    name: o.name,
    side: 'ally',
    row: d ? 'front' : 'back',
    stats: r,
    equip: t_(o),
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
function l_(n, c, o) {
  const s = bu[n],
    r = F1(s, o);
  return {
    id: `enemy_${c}`,
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
    enemyId: n,
    resist: s.resist,
  };
}
function a_(n, c) {
  var p;
  const o = ((p = n.diveState) == null ? void 0 : p.depth) ?? 1,
    r = [...n.guild.party.front, ...n.guild.party.back]
      .filter((v) => v !== null)
      .map((v) => e_(n, v))
      .filter((v) => v !== null),
    d = c.map((v, y) => l_(v, y, o));
  return { turn: 1, depth: o, allies: r, enemies: d, log: [], outcome: 'ongoing' };
}
const Be = (n, c) => (c === 'ally' ? n.allies : n.enemies).filter((o) => !o.isDown);
function mu(n, c) {
  return n.allies.find((o) => o.id === c) ?? n.enemies.find((o) => o.id === c);
}
const xy = (n, c) => {
  var o;
  return ((o = n.resist) == null ? void 0 : o[c]) ?? 1;
};
function or(n, c, o) {
  ((n.hp = dn(n.hp - c, 0, n.maxHp)),
    n.hp === 0 &&
      !n.isDown &&
      ((n.isDown = !0),
      (n.unionGauge = Math.floor(n.unionGauge / 2)),
      o.push({ text: `${n.name} は倒れた！` })));
}
function Ji(n, c) {
  n.isDown || (n.unionGauge = dn(n.unionGauge + c, 0, 100));
}
function Xo(n, c) {
  ((n.buffs = n.buffs.filter((o) => !(o.stat === c.stat && o.stackGroup === c.stackGroup))),
    n.buffs.push(c));
}
function n_(n, c) {
  const o = n.ailments.find((s) => s.type === c.type);
  if (o) {
    o.remainingTurns = Math.max(o.remainingTurns, c.remainingTurns);
    return;
  }
  n.ailments.push(c);
}
function u_(n, c, o) {
  return dn(n * (1 + (c.stats.luc - o.stats.luc) * Dt.AILMENT_LUC_K), 0, Dt.AILMENT_MAX);
}
function i_(n, c, o, s) {
  switch (o.target) {
    case 'self':
      return [c];
    case 'allyAll':
      return Be(n, c.side);
    case 'allyOne': {
      const r = mu(n, s);
      return r ? [r] : [];
    }
    case 'enemyAll':
      return Be(n, c.side === 'ally' ? 'enemy' : 'ally');
    case 'enemyRow':
    case 'enemyOne':
    default: {
      const r = mu(n, s);
      return r ? [r] : [];
    }
  }
}
function c_(n, c, o, s, r, d, p) {
  switch (o.kind) {
    case 'damage': {
      const v = o.hits ?? 1;
      for (const y of d)
        if (!y.isDown)
          for (let m = 0; m < v; m++) {
            const E = Sy(
              c,
              y,
              { statBase: o.statBase, power: o.power(r), element: s, elementMultiplier: xy(y, s) },
              p
            );
            E.hit
              ? (or(y, E.damage, n.log),
                Ji(y, 5),
                n.log.push({
                  text: `${c.name} の攻撃！ ${y.name} に ${E.damage} ダメージ${E.critical ? '（会心）' : ''}`,
                }))
              : n.log.push({ text: `${c.name} の攻撃は外れた` });
          }
      break;
    }
    case 'heal': {
      const v = o.amount(r);
      for (const y of d) y.isDown || (y.hp = dn(y.hp + v, 0, y.maxHp));
      n.log.push({ text: `${c.name} は回復魔法を使った（+${v}）` });
      break;
    }
    case 'buff': {
      for (const v of d)
        Xo(v, {
          stat: o.stat,
          modifier: o.modifier(r),
          remainingTurns: o.turns,
          stackGroup: o.stackGroup,
        });
      n.log.push({ text: `${c.name} は態勢を整えた` });
      break;
    }
    case 'ailment': {
      for (const v of d) {
        if (v.isDown) continue;
        const y = u_(o.chance(r), c, v);
        p.next() < y &&
          (n_(v, { type: o.ailment, remainingTurns: o.turns, magnitude: o.magnitude }),
          n.log.push({ text: `${v.name} は${o.ailment}になった` }));
      }
      break;
    }
  }
}
function Hh(n, c, o, s) {
  if (o.isDown) return;
  const r = c.enemyId ? (bu[c.enemyId].attackElement ?? 'bash') : 'bash',
    d = Sy(c, o, { statBase: 'str', power: 1, element: r, elementMultiplier: xy(o, r) }, s);
  d.hit
    ? (or(o, d.damage, n.log),
      Ji(c, 5),
      Ji(o, 5),
      n.log.push({
        text: `${c.name} の攻撃！ ${o.name} に ${d.damage} ダメージ${d.critical ? '（会心）' : ''}`,
      }))
    : n.log.push({ text: `${c.name} の攻撃は外れた` });
}
const Lh = (n) => (n.length === 0 ? 0 : n.reduce((c, o) => c + o.stats.agi, 0) / n.length),
  s_ = (n) => n.ailments.some((c) => c.type === 'paralysis');
function qh(n, c, o) {
  if (n.outcome !== 'ongoing') return n;
  const s = structuredClone({ ...n, log: [] }),
    r = new Map(c.map((v) => [v.actorId, v]));
  if (c.some((v) => v.kind === 'flee')) {
    const v = dn(0.5 + (Lh(Be(s, 'ally')) - Lh(Be(s, 'enemy'))) * 0.02, 0.1, 0.95);
    if (o.next() < v) return (s.log.push({ text: 'うまく逃げ切れた！' }), (s.outcome = 'fled'), s);
    s.log.push({ text: '逃げられなかった！' });
  }
  for (const v of c) {
    if (v.kind !== 'guard') continue;
    const y = mu(s, v.actorId);
    !y ||
      y.isDown ||
      (Xo(y, { stat: 'pdef', modifier: 1.5, remainingTurns: 1, stackGroup: 'guard' }),
      Xo(y, { stat: 'mdef', modifier: 1.5, remainingTurns: 1, stackGroup: 'guard' }));
  }
  const d = new Map();
  for (const v of Be(s, 'enemy')) {
    const y = Be(s, 'ally');
    y.length > 0 && d.set(v.id, o.pick(y).id);
  }
  const p = [...s.allies, ...s.enemies]
    .filter((v) => !v.isDown)
    .map((v) => ({ c: v, agi: v.stats.agi, tie: o.next() }))
    .sort((v, y) => y.agi - v.agi || y.tie - v.tie)
    .map((v) => v.c);
  for (const v of p)
    if (!v.isDown) {
      if (s.outcome !== 'ongoing') break;
      if (s_(v) && o.next() < Dt.PARALYSIS_SKIP) {
        s.log.push({ text: `${v.name} は麻痺で動けない` });
        continue;
      }
      if (v.side === 'enemy') {
        const y = d.get(v.id),
          m = y ? mu(s, y) : void 0,
          E = m && !m.isDown ? m : Be(s, 'ally')[0];
        E && Hh(s, v, E, o);
      } else {
        const y = r.get(v.id);
        if (!y || y.kind === 'guard' || y.kind === 'flee') continue;
        if (y.kind === 'attack') {
          const m = mu(s, y.targetId),
            E = m && !m.isDown ? m : Be(s, 'enemy')[0];
          E && Hh(s, v, E, o);
        } else if (y.kind === 'skill') {
          const m = un[y.skillId];
          if (!m) continue;
          const E = 1,
            _ = m.tpCost(E);
          if (v.tp < _) {
            s.log.push({ text: `${v.name} は TP が足りない` });
            continue;
          }
          ((v.tp -= _), Ji(v, 10));
          const T = i_(s, v, m, y.targetId);
          for (const Y of m.effects) c_(s, v, Y, m.element, E, T, o);
        }
      }
      if (Be(s, 'enemy').length === 0 || Be(s, 'ally').length === 0) break;
    }
  for (const v of [...s.allies, ...s.enemies]) {
    if (v.isDown) continue;
    const y = v.ailments.find((m) => m.type === 'poison');
    if (y) {
      const m = y.magnitude ?? Math.max(1, Math.floor(v.maxHp * Dt.POISON_HP_RATIO));
      (or(v, m, s.log), s.log.push({ text: `${v.name} は毒で ${m} のダメージ` }));
    }
  }
  for (const v of [...s.allies, ...s.enemies])
    (!v.isDown &&
      v.maxTp > 0 &&
      (v.tp = Math.min(v.maxTp, v.tp + Math.ceil(v.maxTp * Dt.TP_REGEN_RATIO))),
      (v.buffs = v.buffs
        .map((y) => ({ ...y, remainingTurns: y.remainingTurns - 1 }))
        .filter((y) => y.remainingTurns > 0)),
      (v.ailments = v.ailments
        .map((y) => ({ ...y, remainingTurns: y.remainingTurns - 1 }))
        .filter((y) => y.remainingTurns > 0)));
  return (
    (s.turn += 1),
    Be(s, 'enemy').length === 0
      ? (s.outcome = 'win')
      : Be(s, 'ally').length === 0 && (s.outcome = 'lose'),
    s
  );
}
function Ey(n) {
  let c = 0,
    o = 0;
  for (const s of n.enemies) {
    if (!s.enemyId) continue;
    const r = bu[s.enemyId],
      d = by(n.depth, r.refDepth);
    ((c += Math.round(r.exp * d)), (o += Math.round(r.gold * d)));
  }
  return { exp: c, gold: o };
}
function o_(n, c) {
  let o = n.level,
    s = n.exp + (ko(o) ? c : 0),
    r = n.skillPoints.total;
  for (; ko(o) && s >= Uh(o); ) ((s -= Uh(o)), (o += 1), (r += Dt.SP_PER_LEVEL));
  return {
    ...n,
    level: o,
    exp: ko(n.level) ? s : n.exp,
    skillPoints: { ...n.skillPoints, total: r },
  };
}
function Gh(n, c) {
  if (!n.diveState) return n;
  const o = c.outcome === 'win',
    s = c.outcome === 'win' || c.outcome === 'fled',
    r = new Map(c.allies.map((E) => [E.id, E])),
    d = n.diveState.party.map((E) => {
      const _ = r.get(E.charId);
      if (!_) return E;
      let T = _.unionGauge;
      return (
        s && !_.isDown && (T = dn(T + Dt.UNION_GAIN_ON_WIN, 0, 100)),
        { ...E, hp: _.hp, tp: _.tp, unionGauge: T, ailments: _.ailments }
      );
    });
  let p = n.guild.members,
    v = n.guild.gold;
  const y = { ...n.bestiary.monsters };
  for (const E of c.enemies) {
    if (!E.enemyId) continue;
    const _ = y[E.enemyId] ?? { seen: !1, defeated: !1, dropsFound: [] };
    y[E.enemyId] = { ..._, seen: !0, defeated: _.defeated || E.isDown };
  }
  const m = { ...n.bestiary, monsters: y };
  if (o) {
    const { exp: E, gold: _ } = Ey(c);
    v += _;
    const T = new Set(d.map((H) => H.charId)),
      Y = T.size > 0 ? Math.floor(E / T.size) : 0;
    p = p.map((H) => (T.has(H.id) ? o_(H, Y) : H));
  }
  return {
    ...n,
    guild: { ...n.guild, members: p, gold: v, bestiary: m },
    bestiary: m,
    diveState: { ...n.diveState, party: d },
  };
}
const r_ = 8,
  Qo = 16,
  hu = 5;
function rr(n) {
  return n.range(r_, Qo);
}
function f_(n, c) {
  const o = n - 1;
  return o <= 0
    ? { stepsUntilEncounter: rr(c), triggered: !0 }
    : { stepsUntilEncounter: o, triggered: !1 };
}
function d_(n) {
  const c = Math.max(0, Qo - n),
    o = Math.round((c / Qo) * hu);
  return Math.min(hu, Math.max(0, o));
}
const yl = { N: { dx: 0, dy: -1 }, E: { dx: 1, dy: 0 }, S: { dx: 0, dy: 1 }, W: { dx: -1, dy: 0 } },
  m_ = { N: 'S', E: 'W', S: 'N', W: 'E' };
function h_(n) {
  return Math.min(25, 15 + Math.floor(n / 5));
}
function y_() {
  return { walls: { N: !0, E: !0, S: !0, W: !0 }, floorType: 'normal', passable: !0 };
}
const Vo = (n, c, o, s) => n >= 0 && c >= 0 && n < o && c < s;
function Yh(n, c, o, s) {
  const { dx: r, dy: d } = yl[s];
  ((n[o][c].walls[s] = !1), (n[o + d][c + r].walls[m_[s]] = !1));
}
function p_(n, c, o) {
  const s = n.length,
    r = n[0].length,
    d = Array.from({ length: s }, () => Array(r).fill(-1)),
    p = [{ x: c, y: o }];
  d[o][c] = 0;
  for (let v = 0; v < p.length; v++) {
    const { x: y, y: m } = p[v];
    for (const E of ['N', 'E', 'S', 'W']) {
      if (n[m][y].walls[E]) continue;
      const _ = y + yl[E].dx,
        T = m + yl[E].dy;
      !Vo(_, T, r, s) || d[T][_] !== -1 || ((d[T][_] = d[m][y] + 1), p.push({ x: _, y: T }));
    }
  }
  return d;
}
function v_(n, c) {
  const o = h_(n),
    s = o,
    r = o,
    d = Array.from({ length: r }, () => Array.from({ length: s }, () => y_())),
    p = Array.from({ length: r }, () => Array(s).fill(!1)),
    v = c.int(s),
    y = c.int(r),
    m = [{ x: v, y }];
  for (p[y][v] = !0; m.length > 0; ) {
    const w = m[m.length - 1],
      Q = [];
    for (const J of ['N', 'E', 'S', 'W']) {
      const V = w.x + yl[J].dx,
        tt = w.y + yl[J].dy;
      Vo(V, tt, s, r) && !p[tt][V] && Q.push(J);
    }
    if (Q.length === 0) {
      m.pop();
      continue;
    }
    const j = c.pick(Q);
    Yh(d, w.x, w.y, j);
    const X = w.x + yl[j].dx,
      $ = w.y + yl[j].dy;
    ((p[$][X] = !0), m.push({ x: X, y: $ }));
  }
  const E = Math.floor((s * r) / 25);
  for (let w = 0; w < E; w++) {
    const Q = c.int(s),
      j = c.int(r),
      X = c.pick(['N', 'E', 'S', 'W']),
      $ = Q + yl[X].dx,
      J = j + yl[X].dy;
    Vo($, J, s, r) && d[j][Q].walls[X] && Yh(d, Q, j, X);
  }
  const _ = c.int(s),
    T = c.int(r),
    Y = p_(d, _, T);
  let H = _,
    z = T,
    B = -1;
  for (let w = 0; w < r; w++)
    for (let Q = 0; Q < s; Q++) Y[w][Q] > B && ((B = Y[w][Q]), (H = Q), (z = w));
  return (
    (d[T][_].event = { kind: 'stairsDown' }),
    (d[z][H].event = { kind: 'stairsUp' }),
    {
      depth: n,
      width: s,
      height: r,
      cells: d,
      encounterTable: `band_${Math.floor((n - 1) / 10)}`,
      foeSpawns: [],
      bgmId: sr(n) ? 'bgm_boss' : 'bgm_dungeon',
    }
  );
}
function Ty(n, c) {
  var o;
  for (let s = 0; s < n.height; s++)
    for (let r = 0; r < n.width; r++)
      if (((o = n.cells[s][r].event) == null ? void 0 : o.kind) === c) return { x: r, y: s };
  return null;
}
const cn = { N: { dx: 0, dy: -1 }, E: { dx: 1, dy: 0 }, S: { dx: 0, dy: 1 }, W: { dx: -1, dy: 0 } },
  sn = ['N', 'E', 'S', 'W'];
function Ny(n) {
  return sn[(sn.indexOf(n) + 1) % 4];
}
function Ay(n) {
  return sn[(sn.indexOf(n) + 3) % 4];
}
function g_(n) {
  return sn[(sn.indexOf(n) + 2) % 4];
}
const __ = (n, c, o) => n >= 0 && c >= 0 && n < o.width && c < o.height;
function My(n, c, o, s) {
  if (n.cells[o][c].walls[s]) return !1;
  const r = c + cn[s].dx,
    d = o + cn[s].dy;
  return __(r, d, n) ? n.cells[d][r].passable : !1;
}
function b_(n, c, o) {
  return My(n, c.x, c.y, o) ? { x: c.x + cn[o].dx, y: c.y + cn[o].dy } : null;
}
function fr(n, c, o) {
  return ['N', 'E', 'S', 'W'].filter((s) => !n.cells[o][c].walls[s]);
}
const S_ = 4294967296;
function x_(n, c) {
  let o = 3735928559 ^ n,
    s = 1103547991 ^ n;
  for (let r = 0; r < c.length; r++) {
    const d = c.charCodeAt(r);
    ((o = Math.imul(o ^ d, 2654435761)), (s = Math.imul(s ^ d, 1597334677)));
  }
  return (
    (o = Math.imul(o ^ (o >>> 16), 2246822507) ^ Math.imul(s ^ (s >>> 13), 3266489909)),
    (s = Math.imul(s ^ (s >>> 16), 2246822507) ^ Math.imul(o ^ (o >>> 13), 3266489909)),
    (s >>> 0) ^ (o >>> 0)
  );
}
class dr {
  constructor(c, o) {
    Eo(this, 'baseSeed');
    Eo(this, '_state');
    ((this._state = c >>> 0), (this.baseSeed = (o ?? c) >>> 0));
  }
  get state() {
    return this._state;
  }
  next() {
    this._state = (this._state + 1831565813) >>> 0;
    let c = this._state;
    return (
      (c = Math.imul(c ^ (c >>> 15), c | 1)),
      (c ^= c + Math.imul(c ^ (c >>> 7), c | 61)),
      ((c ^ (c >>> 14)) >>> 0) / S_
    );
  }
  int(c) {
    return c <= 0 ? 0 : Math.floor(this.next() * c);
  }
  range(c, o) {
    o < c && ([c, o] = [o, c]);
    const s = o - c + 1;
    return c + this.int(s);
  }
  pick(c) {
    if (c.length === 0) throw new Error('Rng.pick: 空配列は選択できません');
    return c[this.int(c.length)];
  }
  fork(c) {
    const o = x_(this.baseSeed, c);
    return new dr(o, o);
  }
}
function mn(n) {
  return new dr(n, n);
}
function E_() {
  return Math.floor(Math.random() * 4294967296) >>> 0;
}
const Xh = (n, c) => `${n},${c}`;
function T_(n, c) {
  return mn(n).fork(`floor:${c}`);
}
function Cy(n, c) {
  const o = n.towerState.floors[c];
  if (o) return { save: n, floor: o };
  const s = v_(c, T_(n.masterSeed, c)),
    r = {
      depth: c,
      seed: n.masterSeed,
      generated: s,
      isBossFloor: sr(c),
      encounterTier: Math.floor((c - 1) / 10),
      foeRuntime: [],
      openedChests: [],
      depletedGathers: [],
      consumedEvents: [],
    };
  return {
    save: { ...n, towerState: { ...n.towerState, floors: { ...n.towerState.floors, [c]: r } } },
    floor: r,
  };
}
function N_(n) {
  const c = [...n.guild.party.front, ...n.guild.party.back].filter((s) => s !== null),
    o = [];
  for (const s of c) {
    const r = n.guild.members.find((p) => p.id === s);
    if (!r) continue;
    const d = Su(r);
    o.push({ charId: s, hp: d.hp, tp: d.tp, unionGauge: 0, ailments: [] });
  }
  return o;
}
function mr(n, c, o, s) {
  const r = n.towerState.floors[c].generated,
    d = new Set(n.exploredCells[c] ?? []);
  d.add(Xh(o, s));
  for (const p of fr(r, o, s)) {
    const v = o + (p === 'E' ? 1 : p === 'W' ? -1 : 0),
      y = s + (p === 'S' ? 1 : p === 'N' ? -1 : 0);
    d.add(Xh(v, y));
  }
  return { ...n, exploredCells: { ...n.exploredCells, [c]: [...d] } };
}
function Ry(n, c, o) {
  var y, m;
  const s = Cy(n, c);
  let r = s.save;
  const d = s.floor.generated,
    p = Ty(d, 'stairsDown') ?? { x: 0, y: 0 },
    v = fr(d, p.x, p.y)[0] ?? 'N';
  return (
    c > r.towerState.record.deepestReached &&
      (r = {
        ...r,
        towerState: { ...r.towerState, record: { ...r.towerState.record, deepestReached: c } },
      }),
    (r = {
      ...r,
      diveState: {
        depth: c,
        pos: { x: p.x, y: p.y },
        dir: v,
        party: ((y = r.diveState) == null ? void 0 : y.party) ?? N_(r),
        persistentSummons: ((m = r.diveState) == null ? void 0 : m.persistentSummons) ?? [],
        encounter: { stepsUntilEncounter: rr(o) },
      },
    }),
    mr(r, c, p.x, p.y)
  );
}
function A_(n, c = 1) {
  const o = mn(n.masterSeed).fork(`dive:${n.towerState.record.totalDives}`),
    s = {
      ...n,
      diveState: null,
      towerState: {
        ...n.towerState,
        record: { ...n.towerState.record, totalDives: n.towerState.record.totalDives + 1 },
      },
    };
  return Ry(s, c, o);
}
function Dy(n, c) {
  return n.diveState ? { ...n, diveState: { ...n.diveState, dir: c } } : n;
}
function M_(n, c, o) {
  const s = n.diveState;
  if (!s) return { save: n, moved: !1, triggered: !1 };
  const r = n.towerState.floors[s.depth].generated,
    d = b_(r, s.pos, c);
  if (!d) return { save: Dy(n, c), moved: !1, triggered: !1 };
  const p = f_(s.encounter.stepsUntilEncounter, o);
  let v = {
    ...n,
    diveState: { ...s, pos: d, dir: c, encounter: { stepsUntilEncounter: p.stepsUntilEncounter } },
  };
  return ((v = mr(v, s.depth, d.x, d.y)), { save: v, moved: !0, triggered: p.triggered });
}
function Qh(n) {
  const c = n.diveState;
  if (!c) return null;
  const o = n.towerState.floors[c.depth].generated.cells[c.pos.y][c.pos.x].event;
  return (o == null ? void 0 : o.kind) === 'stairsUp' ||
    (o == null ? void 0 : o.kind) === 'stairsDown'
    ? o.kind
    : null;
}
function C_(n) {
  if (!n.diveState) return n;
  const c = n.diveState.depth + 1,
    o = mn(n.masterSeed).fork(`enc:${c}:${n.towerState.record.totalDives}`);
  return Ry(n, c, o);
}
function R_(n) {
  if (!n.diveState) return n;
  const c = n.diveState.depth;
  if (c <= 1) return pu(n);
  const o = c - 1,
    s = Cy(n, o),
    r = Ty(s.floor.generated, 'stairsUp') ?? { x: 0, y: 0 },
    d = mn(n.masterSeed).fork(`enc:${o}:${n.towerState.record.totalDives}`);
  let p = s.save;
  const v = s.floor.generated,
    y = fr(v, r.x, r.y)[0] ?? 'N';
  return (
    (p = {
      ...p,
      diveState: {
        ...p.diveState,
        depth: o,
        pos: { x: r.x, y: r.y },
        dir: y,
        encounter: { stepsUntilEncounter: rr(d) },
      },
    }),
    mr(p, o, r.x, r.y)
  );
}
function pu(n) {
  return { ...n, diveState: null };
}
const D_ = { 10: 'enemy_boss_gatekeeper' };
function O_(n) {
  const c = Math.floor((n - 1) / 10);
  return Object.values(bu)
    .filter((o) => o.tierBand === c && !o.id.startsWith('enemy_boss'))
    .map((o) => o.id);
}
function z_(n, c) {
  if (sr(n)) {
    const r = D_[n];
    if (r) return [r];
  }
  const o = O_(n);
  if (o.length === 0) return [];
  const s = c.range(1, 3);
  return Array.from({ length: s }, () => c.pick(o));
}
const pl = {
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
        ],
      },
      equipableWeaponTypes: ['bow', 'fist'],
      equipableArmorTypes: ['light', 'clothes'],
      titleOptions: ['title_sniper', 'title_tracker'],
    },
  },
  Qi = 1,
  j_ = { autoMap: 'on', bgmVolume: 0.6, seVolume: 0.6 };
function Vh() {
  return { monsters: {}, items: {} };
}
function k_() {
  return { deepestReached: 0, highestBossDefeated: 0, totalDives: 0, bossDefeatLog: [] };
}
const w_ = () => ({ weapon: null, armor: null, accessory: null });
function U_() {
  return `char_${Date.now().toString(36)}_${Math.floor(Math.random() * 16777215).toString(36)}`;
}
function B_(n) {
  var v;
  const { raceId: c, classId: o, name: s, id: r } = n;
  if (!Jl[c]) throw new Error(`createCharacter: 未定義の種族 "${c}"`);
  if (!pl[o]) throw new Error(`createCharacter: 未定義の職業 "${o}"`);
  const d = (v = pl[o].skillTree.skills[0]) == null ? void 0 : v.skillId,
    p = d ? { [d]: 1 } : {};
  return {
    id: r ?? U_(),
    name: s,
    raceId: c,
    classId: o,
    titleId: null,
    level: 1,
    exp: 0,
    skillPoints: { total: 0, spent: 0 },
    learnedSkills: p,
    equipment: w_(),
  };
}
function H_() {
  return { front: Array(tc).fill(null), back: Array(ec).fill(null) };
}
function L_(n, c) {
  const o = n.front.indexOf(null);
  if (o !== -1) {
    const r = [...n.front];
    return ((r[o] = c), { ...n, front: r });
  }
  const s = n.back.indexOf(null);
  if (s !== -1) {
    const r = [...n.back];
    return ((r[s] = c), { ...n, back: r });
  }
  return n;
}
function q_(n, c) {
  return n.guild.members.length >= Yo
    ? n
    : {
        ...n,
        guild: { ...n.guild, members: [...n.guild.members, c], party: L_(n.guild.party, c.id) },
      };
}
function G_(n) {
  return {
    schemaVersion: Qi,
    savedAt: 0,
    masterSeed: E_(),
    settings: { ...j_ },
    guild: { name: n, gold: Z1, members: [], party: H_(), storage: [], bestiary: Vh() },
    towerState: { floors: {}, bossGates: {}, warp: { unlockedCheckpoints: [] }, record: k_() },
    diveState: null,
    bestiary: Vh(),
    playerMaps: {},
    exploredCells: {},
    forgeInventory: { fragments: {}, ingots: { copper: 0, silver: 0, gold: 0 } },
    shopStock: { unlockedTier: 0, unlockedItemIds: [] },
    flags: {},
  };
}
const Zo = (n, c) => c.some((o) => n instanceof o);
let Zh, Kh;
function Y_() {
  return Zh || (Zh = [IDBDatabase, IDBObjectStore, IDBIndex, IDBCursor, IDBTransaction]);
}
function X_() {
  return (
    Kh ||
    (Kh = [
      IDBCursor.prototype.advance,
      IDBCursor.prototype.continue,
      IDBCursor.prototype.continuePrimaryKey,
    ])
  );
}
const Ko = new WeakMap(),
  wo = new WeakMap(),
  lc = new WeakMap();
function Q_(n) {
  const c = new Promise((o, s) => {
    const r = () => {
        (n.removeEventListener('success', d), n.removeEventListener('error', p));
      },
      d = () => {
        (o(va(n.result)), r());
      },
      p = () => {
        (s(n.error), r());
      };
    (n.addEventListener('success', d), n.addEventListener('error', p));
  });
  return (lc.set(c, n), c);
}
function V_(n) {
  if (Ko.has(n)) return;
  const c = new Promise((o, s) => {
    const r = () => {
        (n.removeEventListener('complete', d),
          n.removeEventListener('error', p),
          n.removeEventListener('abort', p));
      },
      d = () => {
        (o(), r());
      },
      p = () => {
        (s(n.error || new DOMException('AbortError', 'AbortError')), r());
      };
    (n.addEventListener('complete', d),
      n.addEventListener('error', p),
      n.addEventListener('abort', p));
  });
  Ko.set(n, c);
}
let $o = {
  get(n, c, o) {
    if (n instanceof IDBTransaction) {
      if (c === 'done') return Ko.get(n);
      if (c === 'store')
        return o.objectStoreNames[1] ? void 0 : o.objectStore(o.objectStoreNames[0]);
    }
    return va(n[c]);
  },
  set(n, c, o) {
    return ((n[c] = o), !0);
  },
  has(n, c) {
    return n instanceof IDBTransaction && (c === 'done' || c === 'store') ? !0 : c in n;
  },
};
function Oy(n) {
  $o = n($o);
}
function Z_(n) {
  return X_().includes(n)
    ? function (...c) {
        return (n.apply(Jo(this), c), va(this.request));
      }
    : function (...c) {
        return va(n.apply(Jo(this), c));
      };
}
function K_(n) {
  return typeof n == 'function'
    ? Z_(n)
    : (n instanceof IDBTransaction && V_(n), Zo(n, Y_()) ? new Proxy(n, $o) : n);
}
function va(n) {
  if (n instanceof IDBRequest) return Q_(n);
  if (wo.has(n)) return wo.get(n);
  const c = K_(n);
  return (c !== n && (wo.set(n, c), lc.set(c, n)), c);
}
const Jo = (n) => lc.get(n);
function $_(n, c, { blocked: o, upgrade: s, blocking: r, terminated: d } = {}) {
  const p = indexedDB.open(n, c),
    v = va(p);
  return (
    s &&
      p.addEventListener('upgradeneeded', (y) => {
        s(va(p.result), y.oldVersion, y.newVersion, va(p.transaction), y);
      }),
    o && p.addEventListener('blocked', (y) => o(y.oldVersion, y.newVersion, y)),
    v
      .then((y) => {
        (d && y.addEventListener('close', () => d()),
          r && y.addEventListener('versionchange', (m) => r(m.oldVersion, m.newVersion, m)));
      })
      .catch(() => {}),
    v
  );
}
const J_ = ['get', 'getKey', 'getAll', 'getAllKeys', 'count'],
  W_ = ['put', 'add', 'delete', 'clear'],
  Uo = new Map();
function $h(n, c) {
  if (!(n instanceof IDBDatabase && !(c in n) && typeof c == 'string')) return;
  if (Uo.get(c)) return Uo.get(c);
  const o = c.replace(/FromIndex$/, ''),
    s = c !== o,
    r = W_.includes(o);
  if (!(o in (s ? IDBIndex : IDBObjectStore).prototype) || !(r || J_.includes(o))) return;
  const d = async function (p, ...v) {
    const y = this.transaction(p, r ? 'readwrite' : 'readonly');
    let m = y.store;
    return (s && (m = m.index(v.shift())), (await Promise.all([m[o](...v), r && y.done]))[0]);
  };
  return (Uo.set(c, d), d);
}
Oy((n) => ({
  ...n,
  get: (c, o, s) => $h(c, o) || n.get(c, o, s),
  has: (c, o) => !!$h(c, o) || n.has(c, o),
}));
const F_ = ['continue', 'continuePrimaryKey', 'advance'],
  Jh = {},
  Wo = new WeakMap(),
  zy = new WeakMap(),
  I_ = {
    get(n, c) {
      if (!F_.includes(c)) return n[c];
      let o = Jh[c];
      return (
        o ||
          (o = Jh[c] =
            function (...s) {
              Wo.set(this, zy.get(this)[c](...s));
            }),
        o
      );
    },
  };
async function* P_(...n) {
  let c = this;
  if ((c instanceof IDBCursor || (c = await c.openCursor(...n)), !c)) return;
  c = c;
  const o = new Proxy(c, I_);
  for (zy.set(o, c), lc.set(o, Jo(c)); c; )
    (yield o, (c = await (Wo.get(o) || c.continue())), Wo.delete(o));
}
function Wh(n, c) {
  return (
    (c === Symbol.asyncIterator && Zo(n, [IDBIndex, IDBObjectStore, IDBCursor])) ||
    (c === 'iterate' && Zo(n, [IDBIndex, IDBObjectStore]))
  );
}
Oy((n) => ({
  ...n,
  get(c, o, s) {
    return Wh(c, o) ? P_ : n.get(c, o, s);
  },
  has(c, o) {
    return Wh(c, o) || n.has(c, o);
  },
}));
const tb = {};
function eb(n) {
  return structuredClone(n);
}
function du(n) {
  return typeof n == 'object' && n !== null && !Array.isArray(n);
}
function lb(n) {
  if (
    !du(n) ||
    typeof n.schemaVersion != 'number' ||
    typeof n.masterSeed != 'number' ||
    !du(n.guild)
  )
    return !1;
  const c = n.guild;
  return !(
    typeof c.name != 'string' ||
    !Array.isArray(c.members) ||
    !du(n.towerState) ||
    !du(n.towerState.record) ||
    typeof n.towerState.record.deepestReached != 'number'
  );
}
function jy(n) {
  if (!du(n) || typeof n.schemaVersion != 'number')
    return { ok: !1, reason: 'セーブデータの構造が不正です' };
  let c = n.schemaVersion;
  if (c > Qi) return { ok: !1, reason: `未知のバージョン (${c} > ${Qi}) のセーブデータです` };
  let o = { ...n };
  for (; c < Qi; ) {
    const s = tb[c];
    if (!s) return { ok: !1, reason: `バージョン ${c} の migration が未定義です` };
    ((o = s(o)), (c = typeof o.schemaVersion == 'number' ? o.schemaVersion : c + 1));
  }
  return lb(o)
    ? { ok: !0, data: o }
    : { ok: !1, reason: 'migration 後のデータが SaveData の形をしていません' };
}
function ab(n) {
  return {
    guildName: n.guild.name,
    deepestReached: n.towerState.record.deepestReached,
    memberCount: n.guild.members.length,
    savedAt: n.savedAt,
  };
}
function Fh() {
  return {
    guildName: '(破損データ)',
    deepestReached: 0,
    memberCount: 0,
    savedAt: 0,
    corrupted: !0,
  };
}
const nb = 'sekaiju-like-game',
  ub = 1,
  vu = 'saves',
  hr = 'main';
let Bo = null;
function yr() {
  return (
    Bo ||
      (Bo = $_(nb, ub, {
        upgrade(n) {
          n.objectStoreNames.contains(vu) || n.createObjectStore(vu);
        },
      })),
    Bo
  );
}
async function Ho(n) {
  const c = { ...n, savedAt: Date.now() };
  return (await (await yr()).put(vu, eb(c), hr), c);
}
async function ib() {
  const c = await (await yr()).get(vu, hr);
  return c === void 0 ? { ok: !1, reason: 'empty' } : jy(c);
}
async function cb() {
  const c = await (await yr()).get(vu, hr);
  if (c === void 0) return null;
  const o = jy(c);
  if (!o.ok) return Fh();
  try {
    return ab(o.data);
  } catch {
    return Fh();
  }
}
const ky = { save: null, saving: !1 };
function sb(n, c) {
  switch (c.type) {
    case 'load':
      return { ...n, save: c.save };
    case 'updateSave':
      return n.save ? { ...n, save: c.updater(n.save) } : n;
    case 'setSave':
      return { ...n, save: c.save };
    case 'saving':
      return { ...n, saving: c.saving };
    case 'clear':
      return { ...ky };
  }
}
const wy = N.createContext(null);
function ob(n) {
  const c = N.useRef(n);
  return ((c.current = n), c);
}
function rb({ children: n }) {
  const [c, o] = N.useReducer(sb, ky),
    s = ob(c),
    r = N.useCallback(async (_) => {
      const T = G_(_),
        Y = await Ho(T);
      o({ type: 'load', save: Y });
    }, []),
    d = N.useCallback(async () => {
      const _ = await ib();
      return _.ok ? (o({ type: 'load', save: _.data }), { ok: !0 }) : { ok: !1, reason: _.reason };
    }, []),
    p = N.useCallback((_) => {
      o({ type: 'updateSave', updater: _ });
    }, []),
    v = N.useCallback(
      async (_) => {
        const T = s.current.save;
        if (!T) return;
        const Y = _(T);
        (o({ type: 'setSave', save: Y }), o({ type: 'saving', saving: !0 }));
        try {
          const H = await Ho(Y);
          o({ type: 'setSave', save: H });
        } finally {
          o({ type: 'saving', saving: !1 });
        }
      },
      [s]
    ),
    y = N.useCallback(async () => {
      const { save: _ } = s.current;
      if (_) {
        o({ type: 'saving', saving: !0 });
        try {
          const T = await Ho(_);
          o({ type: 'setSave', save: T });
        } finally {
          o({ type: 'saving', saving: !1 });
        }
      }
    }, [s]),
    m = N.useCallback(() => {
      o({ type: 'clear' });
    }, []),
    E = N.useMemo(
      () => ({
        ...c,
        startNewGame: r,
        continueGame: d,
        applySave: p,
        applyAndPersist: v,
        persist: y,
        exitToTitle: m,
      }),
      [c, r, d, p, v, y, m]
    );
  return g.jsx(wy.Provider, { value: E, children: n });
}
function ga() {
  const n = N.useContext(wy);
  if (!n) throw new Error('useGameState は GameStateProvider の内側で使ってください');
  return n;
}
const fb = () => {
    var U;
    const n = bl(),
      { save: c, applyAndPersist: o } = ga(),
      s = N.useRef(null),
      [r, d] = N.useState(null),
      [p, v] = N.useState({}),
      [y, m] = N.useState(null),
      [E, _] = N.useState(!1),
      [T, Y] = N.useState(null),
      [H, z] = N.useState(!1);
    N.useEffect(() => {
      if (r || !(c != null && c.diveState)) return;
      const R = c.diveState.depth,
        Z = (c.masterSeed ^ (R * 2654435761) ^ (c.towerState.record.totalDives * 40503)) >>> 0;
      ((s.current = mn(Z)), d(a_(c, z_(R, s.current))));
    }, [c, r]);
    const B = N.useMemo(() => (r == null ? void 0 : r.enemies.filter((R) => !R.isDown)) ?? [], [r]),
      w = N.useMemo(() => (r == null ? void 0 : r.allies.filter((R) => !R.isDown)) ?? [], [r]);
    (N.useEffect(() => {
      B.length > 0 && !B.some((R) => R.id === T) && Y(B[0].id);
    }, [B, T]),
      N.useEffect(() => {
        if ((r == null ? void 0 : r.outcome) !== 'ongoing' || (y && w.some((Z) => Z.id === y)))
          return;
        const R = w.find((Z) => !p[Z.id]) ?? null;
        m(R ? R.id : null);
      }, [r, w, y, p]));
    const Q = w.length > 0 && w.every((R) => p[R.id] !== void 0),
      j = N.useCallback(
        (R, Z) => {
          const ct = { ...p, [R]: Z };
          (v(ct), _(!1));
          const vt = w.find((S) => S.id !== R && !ct[S.id]);
          m(vt ? vt.id : null);
        },
        [p, w]
      ),
      X = N.useCallback(
        async (R) => {
          (z(!0),
            R.outcome === 'lose'
              ? (await o((Z) => pu(Gh(Z, R))), n('/town'))
              : (await o((Z) => Gh(Z, R)), n('/dungeon')));
        },
        [o, n]
      ),
      $ = N.useCallback(() => {
        var R;
        (v({}), _(!1), m(((R = w[0]) == null ? void 0 : R.id) ?? null));
      }, [w]),
      J = N.useCallback(() => {
        var vt;
        if (!r || !s.current || r.outcome !== 'ongoing') return;
        const R = T ?? ((vt = B[0]) == null ? void 0 : vt.id) ?? '',
          Z = w.map((S) => {
            const q = p[S.id] ?? { kind: 'attack' };
            return q.kind === 'guard'
              ? { kind: 'guard', actorId: S.id }
              : q.kind === 'skill'
                ? { kind: 'skill', actorId: S.id, skillId: q.skillId, targetId: R }
                : { kind: 'attack', actorId: S.id, targetId: R };
          }),
          ct = qh(r, Z, s.current);
        (d(ct), v({}), _(!1), m(null));
      }, [r, p, T, w, B]),
      V = N.useCallback(() => {
        if (!r || !s.current || r.outcome !== 'ongoing') return;
        const R = w[0];
        R && (d(qh(r, [{ kind: 'flee', actorId: R.id }], s.current)), v({}), m(null));
      }, [r, w]);
    if (!c || !c.diveState) return g.jsx(gl, { to: '/town', replace: !0 });
    if (!r) return g.jsx('div', { className: lt.layout, children: '戦闘準備中...' });
    const tt = (R) => {
        const Z = c.guild.members.find((ct) => ct.id === R.id);
        return Z
          ? Object.keys(Z.learnedSkills).filter((ct) => ct in un && R.tp >= un[ct].tpCost(1))
          : [];
      },
      it = (R) => {
        var ct;
        const Z = p[R.id];
        return Z
          ? Z.kind === 'attack'
            ? '攻撃'
            : Z.kind === 'guard'
              ? '防御'
              : (((ct = un[Z.skillId]) == null ? void 0 : ct.name) ?? 'スキル')
          : '';
      },
      dt = y ? w.find((R) => R.id === y) : void 0,
      wt = ((U = r.enemies.find((R) => R.id === T)) == null ? void 0 : U.name) ?? '-',
      $t = Ey(r),
      he = (R) =>
        g.jsxs(
          'button',
          {
            type: 'button',
            className: [
              lt.card,
              R.isDown ? lt.down : '',
              y === R.id ? lt.cardActive : '',
              p[R.id] ? lt.cardDecided : '',
            ].join(' '),
            disabled: R.isDown || r.outcome !== 'ongoing',
            onClick: () => {
              (m(R.id), _(!1));
            },
            children: [
              g.jsxs('div', {
                className: lt.cardName,
                children: [
                  R.name,
                  R.unionGauge >= 100 ? g.jsx('span', { className: lt.uni, children: '★' }) : null,
                ],
              }),
              g.jsx(jo, { value: R.hp, max: R.maxHp, color: '#4caf50', showValue: !1 }),
              g.jsx(jo, { value: R.tp, max: R.maxTp, color: '#2196f3', showValue: !1 }),
              g.jsxs('div', {
                className: lt.cardNums,
                children: ['HP ', Math.max(0, R.hp), ' · TP ', R.tp],
              }),
              p[R.id] ? g.jsxs('div', { className: lt.cardCmd, children: ['▶ ', it(R)] }) : null,
            ],
          },
          R.id
        ),
      ie = r.allies.filter((R) => R.row === 'front'),
      Ut = r.allies.filter((R) => R.row === 'back');
    return g.jsxs('div', {
      className: lt.layout,
      children: [
        g.jsx('div', {
          className: lt.enemies,
          children: r.enemies.map((R) =>
            g.jsxs(
              'button',
              {
                type: 'button',
                className: `${lt.enemy} ${R.isDown ? lt.down : ''} ${T === R.id ? lt.targeted : ''}`,
                disabled: R.isDown,
                onClick: () => Y(R.id),
                children: [
                  g.jsxs('span', {
                    className: lt.enemyName,
                    children: [R.name, R.ailments.length > 0 ? ' 🌀' : ''],
                  }),
                  g.jsx(jo, { value: R.hp, max: R.maxHp, color: '#e57373', showValue: !1 }),
                ],
              },
              R.id
            )
          ),
        }),
        g.jsxs('div', {
          className: lt.party,
          children: [
            g.jsx('div', { className: lt.rowTag, children: '前衛' }),
            g.jsx('div', { className: lt.cardRow, children: ie.map(he) }),
            g.jsx('div', { className: lt.rowTag, children: '後衛（近接ダメージ -30%）' }),
            g.jsx('div', {
              className: lt.cardRow,
              children:
                Ut.length > 0
                  ? Ut.map(he)
                  : g.jsx('div', { className: lt.empty, children: '（なし）' }),
            }),
          ],
        }),
        r.outcome !== 'ongoing'
          ? g.jsxs('div', {
              className: lt.result,
              children: [
                g.jsx('div', {
                  className: lt.resultTitle,
                  children:
                    r.outcome === 'win' ? '勝利！' : r.outcome === 'fled' ? '逃走した' : '全滅...',
                }),
                r.outcome === 'win'
                  ? g.jsxs('div', {
                      className: lt.resultBody,
                      children: ['経験値 ', $t.exp, ' ／ ', $t.gold, ' G を獲得'],
                    })
                  : r.outcome === 'lose'
                    ? g.jsx('div', { className: lt.resultBody, children: '拠点へ帰還する' })
                    : null,
                g.jsx('button', {
                  type: 'button',
                  className: lt.primary,
                  disabled: H,
                  onClick: () => void X(r),
                  children: 'つづける',
                }),
              ],
            })
          : g.jsxs('div', {
              className: lt.command,
              children: [
                g.jsxs('div', {
                  className: lt.target,
                  children: ['対象: ', wt, '（敵をタップで変更）'],
                }),
                dt
                  ? g.jsxs(g.Fragment, {
                      children: [
                        g.jsxs('div', {
                          className: lt.cmdHead,
                          children: [dt.name, ' のコマンド'],
                        }),
                        E
                          ? g.jsxs('div', {
                              className: lt.skillList,
                              children: [
                                tt(dt).map((R) => {
                                  var Z;
                                  return g.jsxs(
                                    'button',
                                    {
                                      type: 'button',
                                      className: lt.skillBtn,
                                      onClick: () => j(dt.id, { kind: 'skill', skillId: R }),
                                      children: [
                                        g.jsxs('span', {
                                          className: lt.skillTop,
                                          children: [
                                            g.jsx('span', {
                                              className: lt.skillName,
                                              children: un[R].name,
                                            }),
                                            g.jsxs('span', {
                                              className: lt.tp,
                                              children: ['TP ', un[R].tpCost(1)],
                                            }),
                                          ],
                                        }),
                                        g.jsx('span', {
                                          className: lt.skillDesc,
                                          children:
                                            ((Z = cr[R]) == null ? void 0 : Z.description) ?? '',
                                        }),
                                      ],
                                    },
                                    R
                                  );
                                }),
                                tt(dt).length === 0
                                  ? g.jsx('div', {
                                      className: lt.empty,
                                      children: '使えるスキルがない',
                                    })
                                  : null,
                                g.jsx('button', {
                                  type: 'button',
                                  className: lt.menuBack,
                                  onClick: () => _(!1),
                                  children: 'もどる',
                                }),
                              ],
                            })
                          : g.jsxs('div', {
                              className: lt.menu,
                              children: [
                                g.jsx('button', {
                                  type: 'button',
                                  className: lt.menuBtn,
                                  onClick: () => j(dt.id, { kind: 'attack' }),
                                  children: '攻撃',
                                }),
                                g.jsx('button', {
                                  type: 'button',
                                  className: lt.menuBtn,
                                  onClick: () => j(dt.id, { kind: 'guard' }),
                                  children: '防御',
                                }),
                                g.jsx('button', {
                                  type: 'button',
                                  className: lt.menuBtn,
                                  disabled: tt(dt).length === 0,
                                  onClick: () => _(!0),
                                  children: 'スキル',
                                }),
                                g.jsx('button', {
                                  type: 'button',
                                  className: lt.menuBtn,
                                  onClick: V,
                                  children: '逃走',
                                }),
                              ],
                            }),
                      ],
                    })
                  : g.jsxs('div', {
                      className: lt.execRow,
                      children: [
                        g.jsx('button', {
                          type: 'button',
                          className: lt.redo,
                          onClick: $,
                          children: 'やり直す',
                        }),
                        g.jsx('button', {
                          type: 'button',
                          className: lt.primary,
                          disabled: !Q,
                          onClick: J,
                          children: '実行',
                        }),
                      ],
                    }),
              ],
            }),
        g.jsx('div', {
          className: lt.log,
          children:
            r.log.length === 0
              ? g.jsxs('div', {
                  className: lt.logLine,
                  children: ['てきが あらわれた！（', r.turn, ' ターン目）'],
                })
              : r.log.map((R, Z) => g.jsx('div', { className: lt.logLine, children: R.text }, Z)),
        }),
      ],
    });
  },
  db = '_layout_1b11o_1',
  mb = '_head_1b11o_13',
  hb = '_depth_1b11o_22',
  yb = '_fpvWrap_1b11o_39',
  pb = '_mapWrap_1b11o_45',
  vb = '_palette_1b11o_52',
  gb = '_tool_1b11o_62',
  _b = '_toolActive_1b11o_73',
  bb = '_paletteHint_1b11o_79',
  Sb = '_stairs_1b11o_88',
  xb = '_controls_1b11o_102',
  Eb = '_row_1b11o_112',
  Tb = '_forward_1b11o_118',
  Nb = '_turn_1b11o_133',
  Ab = '_back_1b11o_147',
  Mb = '_itemOverlay_1b11o_158',
  Cb = '_itemPanel_1b11o_168',
  Rb = '_itemTitle_1b11o_181',
  Db = '_itemEmpty_1b11o_186',
  Ob = '_itemRow_1b11o_192',
  zb = '_itemName_1b11o_200',
  jb = '_itemDesc_1b11o_208',
  kb = '_itemTargets_1b11o_214',
  wb = '_itemTarget_1b11o_214',
  Ub = '_itemHp_1b11o_234',
  Bb = '_itemUse_1b11o_240',
  Hb = '_itemClose_1b11o_253',
  pt = {
    layout: db,
    head: mb,
    depth: hb,
    return: '_return_1b11o_28',
    fpvWrap: yb,
    mapWrap: pb,
    palette: vb,
    tool: gb,
    toolActive: _b,
    paletteHint: bb,
    stairs: Sb,
    controls: xb,
    row: Eb,
    forward: Tb,
    turn: Nb,
    back: Ab,
    itemOverlay: Mb,
    itemPanel: Cb,
    itemTitle: Rb,
    itemEmpty: Db,
    itemRow: Ob,
    itemName: zb,
    itemDesc: jb,
    itemTargets: kb,
    itemTarget: wb,
    itemHp: Ub,
    itemUse: Bb,
    itemClose: Hb,
  },
  Lb = '_canvas_1keax_1',
  qb = { canvas: Lb },
  Uy = [
    { id: 'icon_chest', symbol: '📦', label: '宝箱' },
    { id: 'icon_foe', symbol: '👹', label: '強敵(FOE)' },
    { id: 'icon_warning', symbol: '⚠️', label: '注意' },
    { id: 'icon_door', symbol: '🚪', label: '扉/近道' },
    { id: 'icon_gather', symbol: '⛏️', label: '採集' },
    { id: 'icon_event', symbol: '❗', label: 'イベント' },
    { id: 'icon_note', symbol: '📝', label: 'メモ' },
    { id: 'icon_star', symbol: '⭐', label: '任意' },
  ],
  Gb = new Map(Uy.map((n) => [n.id, n]));
function Yb(n) {
  var c;
  return ((c = Gb.get(n)) == null ? void 0 : c.symbol) ?? '•';
}
const ya = {
    fog: '#cdd9b8',
    floor: '#fbfdf7',
    wall: '#4a5a3a',
    grid: '#e3ebd6',
    player: '#2196f3',
    stairsUp: '#e8923a',
    stairsDown: '#7aa2d6',
  },
  Xb = ({
    floor: n,
    explored: c,
    pos: o,
    dir: s,
    icons: r = [],
    maxCell: d = 26,
    onCellClick: p,
  }) => {
    const v = N.useRef(null),
      y = Math.max(10, Math.min(d, Math.floor(360 / n.width))),
      m = n.width * y,
      E = n.height * y;
    N.useEffect(() => {
      const T = v.current;
      if (!T) return;
      const Y = new Set(c),
        H = window.devicePixelRatio || 1;
      ((T.width = m * H), (T.height = E * H));
      const z = T.getContext('2d');
      if (!z) return;
      (z.scale(H, H), z.clearRect(0, 0, m, E));
      for (let J = 0; J < n.height; J++)
        for (let V = 0; V < n.width; V++) {
          const tt = Y.has(`${V},${J}`);
          ((z.fillStyle = tt ? ya.floor : ya.fog),
            z.fillRect(V * y, J * y, y, y),
            tt &&
              ((z.strokeStyle = ya.grid),
              (z.lineWidth = 1),
              z.strokeRect(V * y + 0.5, J * y + 0.5, y - 1, y - 1)));
        }
      ((z.strokeStyle = ya.wall), (z.lineWidth = 2), (z.lineCap = 'round'));
      const B = (J, V, tt, it) => {
        (z.beginPath(), z.moveTo(J, V), z.lineTo(tt, it), z.stroke());
      };
      for (let J = 0; J < n.height; J++)
        for (let V = 0; V < n.width; V++) {
          if (!Y.has(`${V},${J}`)) continue;
          const tt = n.cells[J][V],
            it = V * y,
            dt = J * y;
          (tt.walls.N && B(it, dt, it + y, dt),
            tt.walls.S && B(it, dt + y, it + y, dt + y),
            tt.walls.W && B(it, dt, it, dt + y),
            tt.walls.E && B(it + y, dt, it + y, dt + y));
          const wt = tt.event;
          ((wt == null ? void 0 : wt.kind) === 'stairsUp' ||
            (wt == null ? void 0 : wt.kind) === 'stairsDown') &&
            ((z.fillStyle = wt.kind === 'stairsUp' ? ya.stairsUp : ya.stairsDown),
            z.beginPath(),
            z.arc(it + y / 2, dt + y / 2, y * 0.28, 0, Math.PI * 2),
            z.fill(),
            (z.fillStyle = '#ffffff'),
            (z.font = `bold ${Math.floor(y * 0.5)}px sans-serif`),
            (z.textAlign = 'center'),
            (z.textBaseline = 'middle'),
            z.fillText(wt.kind === 'stairsUp' ? '▲' : '▼', it + y / 2, dt + y / 2 + 1));
        }
      ((z.font = `${Math.floor(y * 0.66)}px sans-serif`),
        (z.textAlign = 'center'),
        (z.textBaseline = 'middle'));
      for (const J of r)
        Y.has(`${J.x},${J.y}`) && z.fillText(Yb(J.iconId), J.x * y + y / 2, J.y * y + y / 2 + 1);
      const w = o.x * y + y / 2,
        Q = o.y * y + y / 2,
        j = y * 0.34,
        $ = { N: -Math.PI / 2, E: 0, S: Math.PI / 2, W: Math.PI }[s];
      ((z.fillStyle = ya.player),
        z.beginPath(),
        z.moveTo(w + Math.cos($) * j, Q + Math.sin($) * j),
        z.lineTo(w + Math.cos($ + 2.5) * j, Q + Math.sin($ + 2.5) * j),
        z.lineTo(w + Math.cos($ - 2.5) * j, Q + Math.sin($ - 2.5) * j),
        z.closePath(),
        z.fill());
    }, [n, c, o, s, r, y, m, E]);
    const _ = (T) => {
      if (!p) return;
      const Y = T.currentTarget.getBoundingClientRect(),
        H = Math.floor(((T.clientX - Y.left) / Y.width) * n.width),
        z = Math.floor(((T.clientY - Y.top) / Y.height) * n.height);
      H >= 0 && z >= 0 && H < n.width && z < n.height && p(H, z);
    };
    return g.jsx('canvas', {
      ref: v,
      className: qb.canvas,
      style: { width: m, height: E },
      onClick: _,
    });
  },
  Qb = '_gauge_1o2hx_1',
  Vb = '_icon_1o2hx_11',
  Zb = '_segments_1o2hx_16',
  Kb = '_seg_1o2hx_16',
  $b = '_filled_1o2hx_28',
  Jb = '_danger_1o2hx_32',
  nn = { gauge: Qb, icon: Vb, segments: Zb, seg: Kb, filled: $b, danger: Jb },
  Wb = ({ level: n }) => {
    const c = n >= hu;
    return g.jsxs('div', {
      className: nn.gauge,
      role: 'img',
      'aria-label': `エンカウントゲージ ${n}/${hu}`,
      children: [
        g.jsx('span', { className: nn.icon, children: c ? '⚠' : '👣' }),
        g.jsx('div', {
          className: nn.segments,
          children: Array.from({ length: hu }, (o, s) =>
            g.jsx(
              'span',
              { className: [nn.seg, s < n ? nn.filled : '', c ? nn.danger : ''].join(' ') },
              s
            )
          ),
        }),
      ],
    });
  },
  Fb = '_view_tw2v9_1',
  Ib = { view: Fb },
  Ih = { N: { dx: 0, dy: -1 }, E: { dx: 1, dy: 0 }, S: { dx: 0, dy: 1 }, W: { dx: -1, dy: 0 } };
function Pb(n, c, o, s = 4) {
  const r = Ay(o),
    d = Ny(o),
    p = [];
  let { x: v, y } = c;
  for (let m = 0; m < s; m++) {
    const E = My(n, v, y, o);
    if (
      (p.push({
        x: v,
        y,
        leftOpen: !n.cells[y][v].walls[r],
        rightOpen: !n.cells[y][v].walls[d],
        frontOpen: E,
        event: n.cells[y][v].event,
      }),
      !E)
    )
      break;
    ((v += Ih[o].dx), (y += Ih[o].dy));
  }
  return p;
}
const hl = {
    sky: '#26301c',
    ceiling: '#3a4a2c',
    floor: '#5d6b46',
    wall: '#8b9a6b',
    frontWall: '#7a8a5c',
    outline: '#2c3720',
  },
  tS = 0.56,
  eS = ({ floor: n, pos: c, dir: o, maxDepth: s = 4, width: r = 358, height: d = 200 }) => {
    const p = N.useRef(null);
    return (
      N.useEffect(() => {
        const v = p.current;
        if (!v) return;
        const y = window.devicePixelRatio || 1;
        ((v.width = r * y), (v.height = d * y));
        const m = v.getContext('2d');
        if (!m) return;
        m.scale(y, y);
        const E = r,
          _ = d,
          T = E / 2,
          Y = _ / 2,
          H = Pb(n, c, o, s),
          z = (Q) => {
            const j = Math.pow(tS, Q);
            return {
              l: T - (E / 2) * j,
              r: T + (E / 2) * j,
              t: Y - (_ / 2) * j,
              b: Y + (_ / 2) * j,
            };
          },
          B = (Q, j, X = !1) => {
            (m.beginPath(), m.moveTo(Q[0][0], Q[0][1]));
            for (let $ = 1; $ < Q.length; $++) m.lineTo(Q[$][0], Q[$][1]);
            (m.closePath(),
              (m.fillStyle = j),
              m.fill(),
              X && ((m.strokeStyle = hl.outline), (m.lineWidth = 1), m.stroke()));
          },
          w = (Q) => `rgba(0,0,0,${Math.min(0.5, Q * 0.13)})`;
        ((m.fillStyle = hl.sky), m.fillRect(0, 0, E, _));
        for (let Q = H.length - 1; Q >= 0; Q--) {
          const j = z(Q),
            X = z(Q + 1),
            $ = H[Q];
          (B(
            [
              [j.l, j.t],
              [j.r, j.t],
              [X.r, X.t],
              [X.l, X.t],
            ],
            hl.ceiling
          ),
            B(
              [
                [j.l, j.b],
                [j.r, j.b],
                [X.r, X.b],
                [X.l, X.b],
              ],
              hl.floor
            ),
            B(
              [
                [j.l, j.t],
                [X.l, X.t],
                [X.l, X.b],
                [j.l, j.b],
              ],
              $.leftOpen ? hl.sky : hl.wall,
              !0
            ),
            B(
              [
                [j.r, j.t],
                [X.r, X.t],
                [X.r, X.b],
                [j.r, j.b],
              ],
              $.rightOpen ? hl.sky : hl.wall,
              !0
            ),
            $.frontOpen ||
              B(
                [
                  [X.l, X.t],
                  [X.r, X.t],
                  [X.r, X.b],
                  [X.l, X.b],
                ],
                hl.frontWall,
                !0
              ),
            (m.fillStyle = w(Q)),
            m.fillRect(X.l, X.t, X.r - X.l, X.b - X.t));
          const J = $.event;
          if (
            (J == null ? void 0 : J.kind) === 'stairsUp' ||
            (J == null ? void 0 : J.kind) === 'stairsDown'
          ) {
            const V = T,
              tt = (j.b + X.b) / 2 - (j.b - X.b) * 0.15,
              it = Math.max(12, (j.b - j.t) * 0.18);
            ((m.fillStyle = J.kind === 'stairsUp' ? '#e8923a' : '#7aa2d6'),
              m.beginPath(),
              m.arc(V, tt, it, 0, Math.PI * 2),
              m.fill(),
              (m.fillStyle = '#fff'),
              (m.font = `bold ${Math.floor(it * 1.2)}px sans-serif`),
              (m.textAlign = 'center'),
              (m.textBaseline = 'middle'),
              m.fillText(J.kind === 'stairsUp' ? '▲' : '▼', V, tt + 1));
          }
        }
      }, [n, c, o, s, r, d]),
      g.jsx('canvas', { ref: p, className: Ib.view, style: { width: r, height: d } })
    );
  },
  _l = {
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
      description: 'スライムの素材。売却できる。',
      category: 'material',
      buyPrice: 0,
    },
  };
function lS(n) {
  return n.category === 'material' ? 8 : Math.floor(n.buyPrice / 2);
}
function aS(n, c) {
  var o;
  return ((o = n.guild.storage.find((s) => s.itemId === c)) == null ? void 0 : o.qty) ?? 0;
}
function pr(n, c, o = 1) {
  if (o <= 0) return n;
  const s = [...n.guild.storage],
    r = s.findIndex((d) => d.itemId === c);
  return (
    r >= 0 ? (s[r] = { ...s[r], qty: s[r].qty + o }) : s.push({ itemId: c, qty: o }),
    { ...n, guild: { ...n.guild, storage: s } }
  );
}
function Wi(n, c, o = 1) {
  if (o <= 0) return n;
  const s = n.guild.storage.findIndex((p) => p.itemId === c);
  if (s < 0 || n.guild.storage[s].qty < o) return n;
  const r = [...n.guild.storage],
    d = r[s].qty - o;
  return (
    d <= 0 ? r.splice(s, 1) : (r[s] = { ...r[s], qty: d }),
    { ...n, guild: { ...n.guild, storage: r } }
  );
}
function By(n, c, o) {
  return {
    ...n,
    guild: { ...n.guild, members: n.guild.members.map((s) => (s.id === c ? o(s) : s)) },
  };
}
function Hy(n, c) {
  const o = Ne[c];
  if (!o) return !1;
  const s = pl[n.classId];
  return s
    ? o.slot === 'weapon'
      ? !!o.weaponType && s.equipableWeaponTypes.includes(o.weaponType)
      : o.slot === 'armor'
        ? !!o.armorType && s.equipableArmorTypes.includes(o.armorType)
        : !0
    : !1;
}
function nS(n, c, o) {
  const s = Ne[o],
    r = n.guild.members.find((v) => v.id === c);
  if (!s || !r || !Hy(r, o) || aS(n, o) <= 0) return n;
  let d = Wi(n, o, 1);
  const p = r.equipment[s.slot];
  return (
    p && (d = pr(d, p, 1)),
    By(d, c, (v) => ({ ...v, equipment: { ...v.equipment, [s.slot]: o } }))
  );
}
function uS(n, c, o) {
  const s = n.guild.members.find((p) => p.id === c);
  if (!s) return n;
  const r = s.equipment[o];
  if (!r) return n;
  const d = pr(n, r, 1);
  return By(d, c, (p) => ({ ...p, equipment: { ...p.equipment, [o]: null } }));
}
function iS(n, c, o) {
  var T, Y;
  const s = _l[c];
  if (!s) return { save: n, ok: !1, message: 'そのアイテムは無い' };
  if (!((T = s.useContext) != null && T.includes('field')))
    return { save: n, ok: !1, message: 'ここでは使えない' };
  if ((((Y = n.guild.storage.find((H) => H.itemId === c)) == null ? void 0 : Y.qty) ?? 0) <= 0)
    return { save: n, ok: !1, message: '所持していない' };
  if (c === 'item_return_thread')
    return n.diveState
      ? { save: pu(Wi(n, c, 1)), ok: !0, message: '拠点へ帰還した' }
      : { save: n, ok: !1, message: '探索中のみ使える' };
  if (!n.diveState) return { save: n, ok: !1, message: '探索中のみ使える' };
  const r = n.diveState.party.find((H) => H.charId === o),
    d = n.guild.members.find((H) => H.id === o);
  if (!r || !d) return { save: n, ok: !1, message: '対象がいない' };
  const p = Su(d);
  let v = r.hp,
    y = r.tp,
    m = !1;
  for (const H of s.effects ?? [])
    H.kind === 'heal'
      ? ((v = Math.min(p.hp, v + H.amount(1))), (m = !0))
      : H.kind === 'restoreTp' && ((y = Math.min(p.tp, y + H.amount(1))), (m = !0));
  if (!m) return { save: n, ok: !1, message: 'いま使う効果がない' };
  const E = n.diveState.party.map((H) => (H.charId === o ? { ...H, hp: v, tp: y } : H));
  return {
    save: Wi({ ...n, diveState: { ...n.diveState, party: E } }, c, 1),
    ok: !0,
    message: `${d.name} に ${s.name} を使った`,
  };
}
function cS(n) {
  return { depth: n, floorPaint: [], wallDraw: [], icons: [], notes: [], autopilotRoutes: [] };
}
function sS(n, c) {
  return n.playerMaps[c] ?? cS(c);
}
function Ly(n, c, o) {
  return { ...n, playerMaps: { ...n.playerMaps, [c]: o } };
}
function oS(n, c, o, s, r) {
  const d = sS(n, c),
    p = d.icons.find((m) => m.x === o && m.y === s),
    v = d.icons.filter((m) => !(m.x === o && m.y === s)),
    y = (p == null ? void 0 : p.iconId) === r ? v : [...v, { x: o, y: s, iconId: r }];
  return Ly(n, c, { ...d, icons: y });
}
function rS(n, c, o, s) {
  const r = n.playerMaps[c];
  return r ? Ly(n, c, { ...r, icons: r.icons.filter((d) => !(d.x === o && d.y === s)) }) : n;
}
const fS = () => {
    var Q;
    const n = bl(),
      { save: c, applySave: o, applyAndPersist: s } = ga(),
      r = N.useRef(null),
      [d, p] = N.useState(null),
      [v, y] = N.useState(!1),
      m = (c == null ? void 0 : c.diveState) ?? null,
      E = N.useMemo(() => {
        var j;
        return c && m ? ((j = c.towerState.floors[m.depth]) == null ? void 0 : j.generated) : null;
      }, [c, m]),
      _ = N.useCallback(
        (j) => {
          if (!c) return;
          r.current || (r.current = mn((c.masterSeed ^ 2654435769) >>> 0));
          const X = M_(c, j, r.current);
          (s(() => X.save), X.triggered && n('/battle'));
        },
        [c, s, n]
      ),
      T = N.useCallback(
        (j) => {
          o((X) => Dy(X, j));
        },
        [o]
      ),
      Y = N.useCallback(async () => {
        if (!c) return;
        const j = Qh(c);
        j === 'stairsUp'
          ? await s((X) => C_(X))
          : j === 'stairsDown' &&
            (c.diveState.depth <= 1 ? (await s((X) => pu(X)), n('/town')) : await s((X) => R_(X)));
      }, [c, s, n]),
      H = N.useCallback(async () => {
        (await s((j) => pu(j)), n('/town'));
      }, [s, n]),
      z = N.useCallback(
        (j, X) => {
          if (!c) return;
          const $ = iS(c, j, X);
          $.ok && (s(() => $.save), $.save.diveState || (y(!1), n('/town')));
        },
        [c, s, n]
      ),
      B = N.useCallback(
        (j, X) => {
          if (!m) return;
          const $ = m.depth;
          if (d !== null) {
            if (!((c == null ? void 0 : c.exploredCells[$]) ?? []).includes(`${j},${X}`)) return;
            s(d === 'erase' ? (dt) => rS(dt, $, j, X) : (dt) => oS(dt, $, j, X, d));
            return;
          }
          const J = j - m.pos.x,
            V = X - m.pos.y,
            tt = ['N', 'E', 'S', 'W'].find((it) => cn[it].dx === J && cn[it].dy === V);
          tt && _(tt);
        },
        [m, _, d, c, s]
      );
    if (!c) return g.jsx(gl, { to: '/title', replace: !0 });
    if (!m || !E) return g.jsx(gl, { to: '/town', replace: !0 });
    const w = Qh(c);
    return g.jsxs('div', {
      className: pt.layout,
      children: [
        g.jsxs('header', {
          className: pt.head,
          children: [
            g.jsxs('div', { className: pt.depth, children: [m.depth, 'F'] }),
            g.jsx(Wb, { level: d_(m.encounter.stepsUntilEncounter) }),
            g.jsx('button', {
              type: 'button',
              className: pt.return,
              onClick: () => y(!0),
              children: '道具',
            }),
            g.jsx('button', {
              type: 'button',
              className: pt.return,
              onClick: () => void H(),
              children: '帰還',
            }),
          ],
        }),
        g.jsx('div', {
          className: pt.fpvWrap,
          children: g.jsx(eS, { floor: E, pos: m.pos, dir: m.dir }),
        }),
        g.jsx('div', {
          className: pt.mapWrap,
          children: g.jsx(Xb, {
            floor: E,
            explored: c.exploredCells[m.depth] ?? [],
            pos: m.pos,
            dir: m.dir,
            icons: ((Q = c.playerMaps[m.depth]) == null ? void 0 : Q.icons) ?? [],
            onCellClick: B,
          }),
        }),
        g.jsxs('div', {
          className: pt.palette,
          children: [
            g.jsx('button', {
              type: 'button',
              className: `${pt.tool} ${d === null ? pt.toolActive : ''}`,
              onClick: () => p(null),
              'aria-label': '移動モード',
              children: '🚶',
            }),
            Uy.map((j) =>
              g.jsx(
                'button',
                {
                  type: 'button',
                  className: `${pt.tool} ${d === j.id ? pt.toolActive : ''}`,
                  onClick: () => p(j.id),
                  'aria-label': j.label,
                  children: j.symbol,
                },
                j.id
              )
            ),
            g.jsx('button', {
              type: 'button',
              className: `${pt.tool} ${d === 'erase' ? pt.toolActive : ''}`,
              onClick: () => p('erase'),
              'aria-label': '消しゴム',
              children: '🧽',
            }),
          ],
        }),
        g.jsx('p', {
          className: pt.paletteHint,
          children:
            d === null
              ? '隣接マスをタップで移動。アイコンを選ぶとマップに書き込めます。'
              : d === 'erase'
                ? 'マップ上のマスをタップでアイコンを消去。'
                : 'マップ上の探索済みマスをタップでアイコンを配置（再タップで消去）。',
        }),
        w &&
          g.jsx('button', {
            type: 'button',
            className: pt.stairs,
            onClick: () => void Y(),
            children:
              w === 'stairsUp'
                ? '▲ 次の階へ進む'
                : m.depth <= 1
                  ? '▼ 拠点へ戻る'
                  : '▼ 前の階へ戻る',
          }),
        g.jsxs('div', {
          className: pt.controls,
          children: [
            g.jsxs('div', {
              className: pt.row,
              children: [
                g.jsx('button', {
                  type: 'button',
                  className: pt.turn,
                  onClick: () => T(Ay(m.dir)),
                  'aria-label': '左を向く',
                  children: '↰',
                }),
                g.jsx('button', {
                  type: 'button',
                  className: pt.forward,
                  onClick: () => _(m.dir),
                  children: '前進',
                }),
                g.jsx('button', {
                  type: 'button',
                  className: pt.turn,
                  onClick: () => T(Ny(m.dir)),
                  'aria-label': '右を向く',
                  children: '↱',
                }),
              ],
            }),
            g.jsx('button', {
              type: 'button',
              className: pt.back,
              onClick: () => T(g_(m.dir)),
              'aria-label': '振り向く',
              children: '↻ 振り向く',
            }),
          ],
        }),
        v
          ? g.jsx('div', {
              className: pt.itemOverlay,
              onClick: () => y(!1),
              children: g.jsxs('div', {
                className: pt.itemPanel,
                onClick: (j) => j.stopPropagation(),
                children: [
                  g.jsx('div', { className: pt.itemTitle, children: 'どうぐ' }),
                  (() => {
                    const j = c.guild.storage.filter((X) => {
                      var $, J;
                      return (
                        ((J = ($ = _l[X.itemId]) == null ? void 0 : $.useContext) == null
                          ? void 0
                          : J.includes('field')) && X.qty > 0
                      );
                    });
                    return j.length === 0
                      ? g.jsx('p', {
                          className: pt.itemEmpty,
                          children: '使える道具がありません。',
                        })
                      : j.map((X) => {
                          const $ = _l[X.itemId],
                            J = X.itemId === 'item_return_thread';
                          return g.jsxs(
                            'div',
                            {
                              className: pt.itemRow,
                              children: [
                                g.jsxs('div', {
                                  className: pt.itemName,
                                  children: [
                                    $.name,
                                    ' ×',
                                    X.qty,
                                    g.jsx('span', {
                                      className: pt.itemDesc,
                                      children: $.description,
                                    }),
                                  ],
                                }),
                                J
                                  ? g.jsx('button', {
                                      type: 'button',
                                      className: pt.itemUse,
                                      onClick: () => z(X.itemId),
                                      children: '使う',
                                    })
                                  : g.jsx('div', {
                                      className: pt.itemTargets,
                                      children: m.party.map((V) => {
                                        const tt = c.guild.members.find((dt) => dt.id === V.charId);
                                        if (!tt) return null;
                                        const it = Su(tt);
                                        return g.jsxs(
                                          'button',
                                          {
                                            type: 'button',
                                            className: pt.itemTarget,
                                            onClick: () => z(X.itemId, V.charId),
                                            children: [
                                              tt.name,
                                              g.jsxs('span', {
                                                className: pt.itemHp,
                                                children: [
                                                  'HP ',
                                                  V.hp,
                                                  '/',
                                                  it.hp,
                                                  '・TP ',
                                                  V.tp,
                                                  '/',
                                                  it.tp,
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
                            X.itemId
                          );
                        });
                  })(),
                  g.jsx('button', {
                    type: 'button',
                    className: pt.itemClose,
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
  dS = '_layout_16au8_2',
  mS = '_head_16au8_13',
  hS = '_title_16au8_20',
  yS = '_count_16au8_26',
  pS = '_create_16au8_31',
  vS = '_sectionTitle_16au8_42',
  gS = '_field_16au8_48',
  _S = '_primary_16au8_64',
  bS = '_list_16au8_79',
  SS = '_empty_16au8_83',
  xS = '_members_16au8_88',
  ES = '_member_16au8_88',
  TS = '_memberMain_16au8_107',
  NS = '_memberName_16au8_119',
  AS = '_pos_16au8_127',
  MS = '_memberSub_16au8_144',
  CS = '_posBtns_16au8_149',
  RS = '_posBtn_16au8_149',
  DS = '_posBtnActive_16au8_164',
  OS = '_foot_16au8_170',
  zS = '_sub_16au8_174',
  xt = {
    layout: dS,
    head: mS,
    title: hS,
    count: yS,
    create: pS,
    sectionTitle: vS,
    field: gS,
    primary: _S,
    list: bS,
    empty: SS,
    members: xS,
    member: ES,
    memberMain: TS,
    memberName: NS,
    pos: AS,
    pos_前衛: '_pos_前衛_16au8_136',
    pos_後衛: '_pos_後衛_16au8_140',
    memberSub: MS,
    posBtns: CS,
    posBtn: RS,
    posBtnActive: DS,
    foot: OS,
    sub: zS,
  };
function jS(n) {
  return [...n.guild.party.front, ...n.guild.party.back].filter((c) => c !== null).length;
}
const qy = (n) => (n === 'front' ? tc : ec);
function kS(n, c, o, s) {
  if (o < 0 || o >= qy(c) || (s !== null && !n.guild.members.some((p) => p.id === s))) return n;
  const r = n.guild.party.front.map((p) => (p === s ? null : p)),
    d = n.guild.party.back.map((p) => (p === s ? null : p));
  for (; r.length < tc; ) r.push(null);
  for (; d.length < ec; ) d.push(null);
  return (
    c === 'front' ? (r[o] = s) : (d[o] = s),
    { ...n, guild: { ...n.guild, party: { front: r, back: d } } }
  );
}
function Gy(n, c) {
  const o = n.guild.party.front.map((r) => (r === c ? null : r)),
    s = n.guild.party.back.map((r) => (r === c ? null : r));
  return { ...n, guild: { ...n.guild, party: { front: o, back: s } } };
}
function Ph(n, c, o) {
  if (
    !n.guild.members.some((v) => v.id === c) ||
    (o === 'front' ? n.guild.party.front : n.guild.party.back).includes(c)
  )
    return n;
  const r = Gy(n, c),
    d = o === 'front' ? r.guild.party.front : r.guild.party.back;
  let p = d.indexOf(null);
  if (p < 0)
    if (d.length < qy(o)) p = d.length;
    else return n;
  return kS(r, o, p, c);
}
function wS(n, c) {
  return n.guild.party.front.includes(c)
    ? '前衛'
    : n.guild.party.back.includes(c)
      ? '後衛'
      : '控え';
}
const US = () => {
    const n = bl(),
      { save: c, applyAndPersist: o } = ga(),
      s = Object.keys(Jl),
      r = Object.keys(pl),
      [d, p] = N.useState(''),
      [v, y] = N.useState(s[0]),
      [m, E] = N.useState(r[0]),
      [_, T] = N.useState(!1),
      Y = N.useCallback(async () => {
        const B = d.trim() || '名もなき冒険者',
          w = B_({ raceId: v, classId: m, name: B });
        (T(!0), await o((Q) => q_(Q, w)), p(''), T(!1));
      }, [d, v, m, o]);
    if (!c) return g.jsx(gl, { to: '/title', replace: !0 });
    const { members: H } = c.guild,
      z = H.length >= Yo;
    return g.jsxs('div', {
      className: xt.layout,
      children: [
        g.jsxs('header', {
          className: xt.head,
          children: [
            g.jsx('h1', { className: xt.title, children: 'ギルド管理' }),
            g.jsxs('span', { className: xt.count, children: ['団員 ', H.length, ' / ', Yo] }),
          ],
        }),
        g.jsxs('section', {
          className: xt.create,
          children: [
            g.jsx('h2', { className: xt.sectionTitle, children: '冒険者を作成' }),
            g.jsxs('label', {
              className: xt.field,
              children: [
                g.jsx('span', { children: '名前' }),
                g.jsx('input', {
                  type: 'text',
                  value: d,
                  maxLength: 16,
                  placeholder: '名もなき冒険者',
                  onChange: (B) => p(B.target.value),
                }),
              ],
            }),
            g.jsxs('label', {
              className: xt.field,
              children: [
                g.jsx('span', { children: '種族' }),
                g.jsx('select', {
                  value: v,
                  onChange: (B) => y(B.target.value),
                  children: s.map((B) => g.jsx('option', { value: B, children: Jl[B].name }, B)),
                }),
              ],
            }),
            g.jsxs('label', {
              className: xt.field,
              children: [
                g.jsx('span', { children: '職業' }),
                g.jsx('select', {
                  value: m,
                  onChange: (B) => E(B.target.value),
                  children: r.map((B) => g.jsx('option', { value: B, children: pl[B].name }, B)),
                }),
              ],
            }),
            g.jsx('button', {
              type: 'button',
              className: xt.primary,
              disabled: _ || z,
              onClick: () => void Y(),
              children: z ? '団員が上限です' : '作成する',
            }),
          ],
        }),
        g.jsxs('section', {
          className: xt.list,
          children: [
            g.jsxs('h2', {
              className: xt.sectionTitle,
              children: [
                '団員一覧',
                ' ',
                g.jsxs('span', {
                  className: xt.count,
                  children: ['（出撃 ', jS(c), ' / ', K1, '）'],
                }),
              ],
            }),
            H.length === 0
              ? g.jsx('p', { className: xt.empty, children: 'まだ冒険者がいません。' })
              : g.jsx('ul', {
                  className: xt.members,
                  children: H.map((B) => {
                    var Q, j;
                    const w = wS(c, B.id);
                    return g.jsxs(
                      'li',
                      {
                        className: xt.member,
                        children: [
                          g.jsxs('button', {
                            type: 'button',
                            className: xt.memberMain,
                            onClick: () => n(`/guild/char/${B.id}`),
                            children: [
                              g.jsxs('span', {
                                className: xt.memberName,
                                children: [
                                  B.name,
                                  g.jsx('span', {
                                    className: `${xt.pos} ${xt[`pos_${w}`] ?? ''}`,
                                    children: w,
                                  }),
                                ],
                              }),
                              g.jsxs('span', {
                                className: xt.memberSub,
                                children: [
                                  (Q = Jl[B.raceId]) == null ? void 0 : Q.name,
                                  ' / ',
                                  (j = pl[B.classId]) == null ? void 0 : j.name,
                                  ' / Lv',
                                  B.level,
                                  ' ›',
                                ],
                              }),
                            ],
                          }),
                          g.jsxs('div', {
                            className: xt.posBtns,
                            children: [
                              g.jsx('button', {
                                type: 'button',
                                className: `${xt.posBtn} ${w === '前衛' ? xt.posBtnActive : ''}`,
                                onClick: () => void o((X) => Ph(X, B.id, 'front')),
                                children: '前',
                              }),
                              g.jsx('button', {
                                type: 'button',
                                className: `${xt.posBtn} ${w === '後衛' ? xt.posBtnActive : ''}`,
                                onClick: () => void o((X) => Ph(X, B.id, 'back')),
                                children: '後',
                              }),
                              g.jsx('button', {
                                type: 'button',
                                className: `${xt.posBtn} ${w === '控え' ? xt.posBtnActive : ''}`,
                                onClick: () => void o((X) => Gy(X, B.id)),
                                children: '控',
                              }),
                            ],
                          }),
                        ],
                      },
                      B.id
                    );
                  }),
                }),
          ],
        }),
        g.jsx('footer', {
          className: xt.foot,
          children: g.jsx('button', {
            type: 'button',
            className: xt.sub,
            onClick: () => n('/town'),
            children: '拠点へ戻る',
          }),
        }),
      ],
    });
  },
  BS = '_layout_1eawv_1',
  HS = '_head_1eawv_12',
  LS = '_title_1eawv_16',
  qS = '_sub_1eawv_22',
  GS = '_card_1eawv_27',
  YS = '_h2_1eawv_35',
  XS = '_sp_1eawv_44',
  QS = '_stats_1eawv_50',
  VS = '_equipSlot_1eawv_74',
  ZS = '_equipHead_1eawv_82',
  KS = '_slotLabel_1eawv_88',
  $S = '_equipName_1eawv_95',
  JS = '_smallBtn_1eawv_100',
  WS = '_equipPick_1eawv_110',
  FS = '_pickBtn_1eawv_118',
  IS = '_skills_1eawv_128',
  PS = '_skill_1eawv_128',
  t2 = '_skillInfo_1eawv_143',
  e2 = '_skillName_1eawv_150',
  l2 = '_skillLv_1eawv_158',
  a2 = '_skillDesc_1eawv_164',
  n2 = '_learnBtn_1eawv_169',
  u2 = '_foot_1eawv_185',
  i2 = '_back_1eawv_189',
  Ct = {
    layout: BS,
    head: HS,
    title: LS,
    sub: qS,
    card: GS,
    h2: YS,
    sp: XS,
    stats: QS,
    equipSlot: VS,
    equipHead: ZS,
    slotLabel: KS,
    equipName: $S,
    smallBtn: JS,
    equipPick: WS,
    pickBtn: FS,
    skills: IS,
    skill: PS,
    skillInfo: t2,
    skillName: e2,
    skillLv: l2,
    skillDesc: a2,
    learnBtn: n2,
    foot: u2,
    back: i2,
  };
function Yy(n) {
  var o, s;
  const c = [
    ...(((o = pl[n.classId]) == null ? void 0 : o.skillTree.skills) ?? []),
    ...(((s = Jl[n.raceId]) == null ? void 0 : s.unionSkillTree.skills) ?? []),
  ];
  return (n.titleId && $i[n.titleId] && c.push(...$i[n.titleId].skillTree.skills), c);
}
function ac(n, c) {
  return n.learnedSkills[c] ?? 0;
}
function Xy(n) {
  return n.skillPoints.total - n.skillPoints.spent;
}
function c2(n, c) {
  return (c.requires ?? []).every((o) => ac(n, o.skillId) >= o.level);
}
function Qy(n, c) {
  const o = Yy(n).find((s) => s.skillId === c);
  return !o || ac(n, c) >= o.maxLevel || Xy(n) <= 0 ? !1 : c2(n, o);
}
function s2(n, c) {
  return Qy(n, c)
    ? {
        ...n,
        learnedSkills: { ...n.learnedSkills, [c]: ac(n, c) + 1 },
        skillPoints: { ...n.skillPoints, spent: n.skillPoints.spent + 1 },
      }
    : n;
}
const o2 = ['weapon', 'armor', 'accessory'],
  r2 = { weapon: '武器', armor: '防具', accessory: '装飾' },
  f2 = [
    { key: 'hp', label: 'HP' },
    { key: 'tp', label: 'TP' },
    { key: 'str', label: 'STR' },
    { key: 'vit', label: 'VIT' },
    { key: 'agi', label: 'AGI' },
    { key: 'int', label: 'INT' },
    { key: 'mnd', label: 'MND' },
    { key: 'luc', label: 'LUC' },
  ],
  d2 = () => {
    var m, E;
    const n = bl(),
      { id: c } = og(),
      { save: o, applyAndPersist: s } = ga();
    if (!o) return g.jsx(gl, { to: '/title', replace: !0 });
    const r = o.guild.members.find((_) => _.id === c);
    if (!r || !c) return g.jsx(gl, { to: '/guild', replace: !0 });
    const d = Su(r),
      p = Xy(r),
      v = (_) =>
        s((T) => ({
          ...T,
          guild: { ...T.guild, members: T.guild.members.map((Y) => (Y.id === c ? _(Y) : Y)) },
        }));
    return g.jsxs('div', {
      className: Ct.layout,
      children: [
        g.jsxs('header', {
          className: Ct.head,
          children: [
            g.jsx('h1', { className: Ct.title, children: r.name }),
            g.jsxs('span', {
              className: Ct.sub,
              children: [
                (m = Jl[r.raceId]) == null ? void 0 : m.name,
                ' / ',
                (E = pl[r.classId]) == null ? void 0 : E.name,
                ' / Lv',
                r.level,
              ],
            }),
          ],
        }),
        g.jsxs('section', {
          className: Ct.card,
          children: [
            g.jsx('h2', { className: Ct.h2, children: 'ステータス' }),
            g.jsx('dl', {
              className: Ct.stats,
              children: f2.map((_) =>
                g.jsxs(
                  'div',
                  {
                    children: [
                      g.jsx('dt', { children: _.label }),
                      g.jsx('dd', { children: d[_.key] }),
                    ],
                  },
                  _.key
                )
              ),
            }),
          ],
        }),
        g.jsxs('section', {
          className: Ct.card,
          children: [
            g.jsx('h2', { className: Ct.h2, children: '装備' }),
            o2.map((_) => {
              const T = r.equipment[_],
                Y = T ? Ne[T] : null,
                H = o.guild.storage.filter((z) => {
                  var B;
                  return ((B = Ne[z.itemId]) == null ? void 0 : B.slot) === _ && Hy(r, z.itemId);
                });
              return g.jsxs(
                'div',
                {
                  className: Ct.equipSlot,
                  children: [
                    g.jsxs('div', {
                      className: Ct.equipHead,
                      children: [
                        g.jsx('span', { className: Ct.slotLabel, children: r2[_] }),
                        g.jsx('span', {
                          className: Ct.equipName,
                          children: Y ? Y.name : '（なし）',
                        }),
                        Y
                          ? g.jsx('button', {
                              type: 'button',
                              className: Ct.smallBtn,
                              onClick: () => void y(_),
                              children: '外す',
                            })
                          : null,
                      ],
                    }),
                    H.length > 0
                      ? g.jsx('div', {
                          className: Ct.equipPick,
                          children: H.map((z) =>
                            g.jsxs(
                              'button',
                              {
                                type: 'button',
                                className: Ct.pickBtn,
                                onClick: () => void s((B) => nS(B, c, z.itemId)),
                                children: [
                                  Ne[z.itemId].name,
                                  ' 装備',
                                  z.qty > 1 ? `(${z.qty})` : '',
                                ],
                              },
                              z.itemId
                            )
                          ),
                        })
                      : null,
                  ],
                },
                _
              );
            }),
          ],
        }),
        g.jsxs('section', {
          className: Ct.card,
          children: [
            g.jsxs('h2', {
              className: Ct.h2,
              children: ['スキル ', g.jsxs('span', { className: Ct.sp, children: ['SP ', p] })],
            }),
            g.jsx('ul', {
              className: Ct.skills,
              children: Yy(r).map((_) => {
                const T = ac(r, _.skillId),
                  Y = Qy(r, _.skillId),
                  H = cr[_.skillId];
                return g.jsxs(
                  'li',
                  {
                    className: Ct.skill,
                    children: [
                      g.jsxs('div', {
                        className: Ct.skillInfo,
                        children: [
                          g.jsxs('span', {
                            className: Ct.skillName,
                            children: [
                              (H == null ? void 0 : H.name) ?? _.skillId,
                              g.jsxs('span', {
                                className: Ct.skillLv,
                                children: ['Lv ', T, '/', _.maxLevel],
                              }),
                            ],
                          }),
                          g.jsx('span', {
                            className: Ct.skillDesc,
                            children: (H == null ? void 0 : H.description) ?? '',
                          }),
                        ],
                      }),
                      g.jsx('button', {
                        type: 'button',
                        className: Ct.learnBtn,
                        disabled: !Y,
                        onClick: () => void v((z) => s2(z, _.skillId)),
                        children: '＋',
                      }),
                    ],
                  },
                  _.skillId
                );
              }),
            }),
          ],
        }),
        g.jsx('footer', {
          className: Ct.foot,
          children: g.jsx('button', {
            type: 'button',
            className: Ct.back,
            onClick: () => n('/guild'),
            children: 'もどる',
          }),
        }),
      ],
    });
    function y(_) {
      return s((T) => uS(T, c, _));
    }
  },
  m2 = () => g.jsx('div', { children: g.jsx('h1', { children: 'Not Found' }) }),
  h2 = '_layout_1u0ua_1',
  y2 = '_head_1u0ua_11',
  p2 = '_title_1u0ua_18',
  v2 = '_gold_1u0ua_24',
  g2 = '_tabs_1u0ua_29',
  _2 = '_tab_1u0ua_29',
  b2 = '_tabActive_1u0ua_46',
  S2 = '_list_1u0ua_51',
  x2 = '_row_1u0ua_59',
  E2 = '_info_1u0ua_70',
  T2 = '_name_1u0ua_76',
  N2 = '_note_1u0ua_81',
  A2 = '_action_1u0ua_86',
  M2 = '_empty_1u0ua_103',
  C2 = '_foot_1u0ua_108',
  R2 = '_back_1u0ua_112',
  Bt = {
    layout: h2,
    head: y2,
    title: p2,
    gold: v2,
    tabs: g2,
    tab: _2,
    tabActive: b2,
    list: S2,
    row: x2,
    info: E2,
    name: T2,
    note: N2,
    action: A2,
    empty: M2,
    foot: C2,
    back: R2,
  };
function D2(n) {
  return Math.max(0, Math.floor(n.towerState.record.deepestReached / 10));
}
const O2 = (n) => {
  const c = Ne[n].bonuses,
    o = [];
  return (
    c.atk && o.push(`ATK+${c.atk}`),
    c.mat && o.push(`MAT+${c.mat}`),
    c.def && o.push(`DEF+${c.def}`),
    c.mdf && o.push(`MDF+${c.mdf}`),
    o.join(' ')
  );
};
function z2(n) {
  const c = D2(n),
    o = Object.values(_l)
      .filter((r) => r.buyPrice > 0)
      .map((r) => ({ id: r.id, name: r.name, price: r.buyPrice, kind: 'item' }));
  return [
    ...Object.values(Ne)
      .filter((r) => r.tier <= c)
      .map((r) => ({ id: r.id, name: r.name, price: r.buyPrice, kind: 'equip', note: O2(r.id) })),
    ...o,
  ];
}
function j2(n) {
  var c, o;
  return (
    ((c = _l[n]) == null ? void 0 : c.buyPrice) ??
    ((o = Ne[n]) == null ? void 0 : o.buyPrice) ??
    null
  );
}
function Fo(n) {
  return _l[n] ? lS(_l[n]) : Ne[n] ? Math.floor(Ne[n].buyPrice / 2) : 0;
}
function k2(n, c) {
  const o = j2(c);
  if (o === null || o <= 0 || n.guild.gold < o) return n;
  const s = pr(n, c, 1);
  return { ...s, guild: { ...s.guild, gold: s.guild.gold - o } };
}
function w2(n, c, o = 1) {
  var p;
  if ((((p = n.guild.storage.find((v) => v.itemId === c)) == null ? void 0 : p.qty) ?? 0) < o)
    return n;
  const r = Fo(c) * o,
    d = Wi(n, c, o);
  return { ...d, guild: { ...d.guild, gold: d.guild.gold + r } };
}
const U2 = () => {
    const n = bl(),
      { save: c, applyAndPersist: o } = ga(),
      [s, r] = N.useState('buy');
    if (!c) return g.jsx(gl, { to: '/title', replace: !0 });
    const d = c.guild.gold,
      p = z2(c),
      v = c.guild.storage.filter((m) => Fo(m.itemId) > 0),
      y = (m) => {
        var E, _;
        return (
          ((E = _l[m]) == null ? void 0 : E.name) ?? ((_ = Ne[m]) == null ? void 0 : _.name) ?? m
        );
      };
    return g.jsxs('div', {
      className: Bt.layout,
      children: [
        g.jsxs('header', {
          className: Bt.head,
          children: [
            g.jsx('h1', { className: Bt.title, children: 'ショップ' }),
            g.jsxs('span', { className: Bt.gold, children: [d, ' G'] }),
          ],
        }),
        g.jsxs('div', {
          className: Bt.tabs,
          children: [
            g.jsx('button', {
              type: 'button',
              className: `${Bt.tab} ${s === 'buy' ? Bt.tabActive : ''}`,
              onClick: () => r('buy'),
              children: '買う',
            }),
            g.jsx('button', {
              type: 'button',
              className: `${Bt.tab} ${s === 'sell' ? Bt.tabActive : ''}`,
              onClick: () => r('sell'),
              children: '売る',
            }),
          ],
        }),
        g.jsx('div', {
          className: Bt.list,
          children:
            s === 'buy'
              ? p.map((m) =>
                  g.jsxs(
                    'div',
                    {
                      className: Bt.row,
                      children: [
                        g.jsxs('div', {
                          className: Bt.info,
                          children: [
                            g.jsx('span', { className: Bt.name, children: m.name }),
                            m.note ? g.jsx('span', { className: Bt.note, children: m.note }) : null,
                          ],
                        }),
                        g.jsxs('button', {
                          type: 'button',
                          className: Bt.action,
                          disabled: d < m.price,
                          onClick: () => void o((E) => k2(E, m.id)),
                          children: [m.price, ' G'],
                        }),
                      ],
                    },
                    m.id
                  )
                )
              : v.length === 0
                ? g.jsx('p', { className: Bt.empty, children: '売れる物がありません。' })
                : v.map((m) =>
                    g.jsxs(
                      'div',
                      {
                        className: Bt.row,
                        children: [
                          g.jsxs('div', {
                            className: Bt.info,
                            children: [
                              g.jsx('span', { className: Bt.name, children: y(m.itemId) }),
                              g.jsxs('span', { className: Bt.note, children: ['所持 ', m.qty] }),
                            ],
                          }),
                          g.jsxs('button', {
                            type: 'button',
                            className: Bt.action,
                            onClick: () => void o((E) => w2(E, m.itemId, 1)),
                            children: ['売却 ', Fo(m.itemId), ' G'],
                          }),
                        ],
                      },
                      m.itemId
                    )
                  ),
        }),
        g.jsx('footer', {
          className: Bt.foot,
          children: g.jsx('button', {
            type: 'button',
            className: Bt.back,
            onClick: () => n('/town'),
            children: '拠点へ戻る',
          }),
        }),
      ],
    });
  },
  B2 = '_layout_1xkiw_1',
  H2 = '_head_1xkiw_12',
  L2 = '_title_1xkiw_17',
  q2 = '_subtitle_1xkiw_24',
  G2 = '_body_1xkiw_30',
  Y2 = '_menu_1xkiw_34',
  X2 = '_loading_1xkiw_40',
  Q2 = '_warn_1xkiw_45',
  V2 = '_danger_1xkiw_52',
  Z2 = '_dialog_1xkiw_67',
  K2 = '_dialogTitle_1xkiw_77',
  $2 = '_field_1xkiw_82',
  J2 = '_note_1xkiw_96',
  W2 = '_dialogActions_1xkiw_102',
  F2 = '_primary_1xkiw_107',
  I2 = '_sub_1xkiw_24',
  P2 = '_foot_1xkiw_132',
  Ht = {
    layout: B2,
    head: H2,
    title: L2,
    subtitle: q2,
    body: G2,
    menu: Y2,
    loading: X2,
    warn: Q2,
    danger: V2,
    dialog: Z2,
    dialogTitle: K2,
    field: $2,
    note: J2,
    dialogActions: W2,
    primary: F2,
    sub: I2,
    foot: P2,
  },
  tx = '_card_3vsn6_1',
  ex = '_corrupted_3vsn6_14',
  lx = '_corruptedText_3vsn6_19',
  ax = '_corruptedNote_3vsn6_25',
  nx = '_guildName_3vsn6_31',
  ux = '_meta_3vsn6_36',
  Kl = {
    card: tx,
    corrupted: ex,
    corruptedText: lx,
    corruptedNote: ax,
    guildName: nx,
    meta: ux,
    continue: '_continue_3vsn6_56',
  },
  ix = (n) => {
    if (!n) return '-';
    const c = new Date(n),
      o = (s) => String(s).padStart(2, '0');
    return `${c.getFullYear()}/${o(c.getMonth() + 1)}/${o(c.getDate())} ${o(c.getHours())}:${o(c.getMinutes())}`;
  },
  cx = ({ meta: n, onContinue: c }) =>
    n.corrupted
      ? g.jsxs('div', {
          className: `${Kl.card} ${Kl.corrupted}`,
          children: [
            g.jsx('div', { className: Kl.corruptedText, children: 'セーブデータが破損しています' }),
            g.jsx('p', {
              className: Kl.corruptedNote,
              children: '「最初から」で新しく始められます。',
            }),
          ],
        })
      : g.jsxs('div', {
          className: Kl.card,
          children: [
            g.jsx('div', { className: Kl.guildName, children: n.guildName }),
            g.jsxs('dl', {
              className: Kl.meta,
              children: [
                g.jsxs('div', {
                  children: [
                    g.jsx('dt', { children: '最高到達階' }),
                    g.jsx('dd', {
                      children: n.deepestReached > 0 ? `${n.deepestReached}F` : '未踏破',
                    }),
                  ],
                }),
                g.jsxs('div', {
                  children: [
                    g.jsx('dt', { children: '団員' }),
                    g.jsxs('dd', { children: [n.memberCount, '人'] }),
                  ],
                }),
                g.jsxs('div', {
                  children: [
                    g.jsx('dt', { children: '最終セーブ' }),
                    g.jsx('dd', { children: ix(n.savedAt) }),
                  ],
                }),
              ],
            }),
            g.jsx('button', {
              type: 'button',
              className: Kl.continue,
              onClick: c,
              children: 'つづきから',
            }),
          ],
        }),
  sx = () => {
    const n = bl(),
      { startNewGame: c, continueGame: o } = ga(),
      [s, r] = N.useState(null),
      [d, p] = N.useState(!0),
      [v, y] = N.useState('menu'),
      [m, E] = N.useState(''),
      [_, T] = N.useState(!1);
    N.useEffect(() => {
      (async () => (r(await cb()), p(!1)))();
    }, []);
    const Y = s !== null && !s.corrupted,
      H = N.useCallback(async () => {
        T(!0);
        const w = await o();
        (T(!1), w.ok && n('/town'));
      }, [o, n]),
      z = N.useCallback(() => {
        (E(''), y(Y ? 'confirm' : 'guildName'));
      }, [Y]),
      B = N.useCallback(async () => {
        const w = m.trim() || 'ななしのギルド';
        (T(!0), await c(w), T(!1), n('/town'));
      }, [m, c, n]);
    return g.jsxs('div', {
      className: Ht.layout,
      children: [
        g.jsxs('header', {
          className: Ht.head,
          children: [
            g.jsx('h1', { className: Ht.title, children: '世界樹ライク' }),
            g.jsx('p', { className: Ht.subtitle, children: '無限タワー探索 RPG' }),
          ],
        }),
        g.jsx('main', {
          className: Ht.body,
          children: d
            ? g.jsx('p', { className: Ht.loading, children: '読み込み中...' })
            : v === 'guildName'
              ? g.jsxs('div', {
                  className: Ht.dialog,
                  children: [
                    g.jsx('h2', { className: Ht.dialogTitle, children: '新しいギルド' }),
                    g.jsxs('label', {
                      className: Ht.field,
                      children: [
                        g.jsx('span', { children: 'ギルド名' }),
                        g.jsx('input', {
                          type: 'text',
                          value: m,
                          maxLength: 16,
                          placeholder: 'ななしのギルド',
                          onChange: (w) => E(w.target.value),
                          autoFocus: !0,
                        }),
                      ],
                    }),
                    g.jsx('p', {
                      className: Ht.note,
                      children:
                        '冒険者はまだいません。開始後、ギルドメニューで仲間を作成してください。',
                    }),
                    g.jsxs('div', {
                      className: Ht.dialogActions,
                      children: [
                        g.jsx('button', {
                          type: 'button',
                          className: Ht.primary,
                          disabled: _,
                          onClick: B,
                          children: 'はじめる',
                        }),
                        g.jsx('button', {
                          type: 'button',
                          className: Ht.sub,
                          disabled: _,
                          onClick: () => y('menu'),
                          children: 'もどる',
                        }),
                      ],
                    }),
                  ],
                })
              : v === 'confirm'
                ? g.jsxs('div', {
                    className: Ht.dialog,
                    children: [
                      g.jsx('h2', { className: Ht.dialogTitle, children: '最初から始めますか？' }),
                      g.jsxs('p', {
                        className: Ht.warn,
                        children: [
                          '現在のセーブデータ「',
                          s == null ? void 0 : s.guildName,
                          '」は上書きされ、元に戻せません。',
                        ],
                      }),
                      g.jsxs('div', {
                        className: Ht.dialogActions,
                        children: [
                          g.jsx('button', {
                            type: 'button',
                            className: Ht.danger,
                            disabled: _,
                            onClick: () => y('guildName'),
                            children: 'データを消して始める',
                          }),
                          g.jsx('button', {
                            type: 'button',
                            className: Ht.sub,
                            disabled: _,
                            onClick: () => y('menu'),
                            children: 'もどる',
                          }),
                        ],
                      }),
                    ],
                  })
                : g.jsxs('div', {
                    className: Ht.menu,
                    children: [
                      s !== null && g.jsx(cx, { meta: s, onContinue: () => void H() }),
                      g.jsx('button', {
                        type: 'button',
                        className: Y ? Ht.sub : Ht.primary,
                        onClick: z,
                        children: '最初から',
                      }),
                    ],
                  }),
        }),
        g.jsxs('footer', { className: Ht.foot, children: ['v', '0.1.8'] }),
      ],
    });
  },
  ox = '_layout_1wdo2_1',
  rx = '_head_1wdo2_12',
  fx = '_guildName_1wdo2_16',
  dx = '_stats_1wdo2_21',
  mx = '_hint_1wdo2_40',
  hx = '_menu_1wdo2_50',
  yx = '_foot_1wdo2_57',
  px = '_exit_1wdo2_61',
  $l = { layout: ox, head: rx, guildName: fx, stats: dx, hint: mx, menu: hx, foot: yx, exit: px },
  vx = '_button_1tp4a_1',
  gx = '_primary_1tp4a_26',
  _x = '_label_1tp4a_32',
  bx = '_description_1tp4a_37',
  Gi = { button: vx, primary: gx, label: _x, description: bx },
  fu = ({ label: n, description: c, variant: o = 'default', disabled: s = !1, onClick: r }) =>
    g.jsxs('button', {
      type: 'button',
      className: `${Gi.button} ${o === 'primary' ? Gi.primary : ''}`,
      disabled: s,
      onClick: r,
      children: [
        g.jsx('span', { className: Gi.label, children: n }),
        c ? g.jsx('span', { className: Gi.description, children: c }) : null,
      ],
    }),
  Sx = () => {
    const n = bl(),
      { save: c, exitToTitle: o, applyAndPersist: s } = ga();
    if (!c) return g.jsx(gl, { to: '/title', replace: !0 });
    const { guild: r, towerState: d, diveState: p } = c,
      v = r.members.length > 0,
      y = () => {
        (o(), n('/title'));
      },
      m = async () => {
        (p || (await s((E) => A_(E, 1))), n('/dungeon'));
      };
    return g.jsxs('div', {
      className: $l.layout,
      children: [
        g.jsxs('header', {
          className: $l.head,
          children: [
            g.jsx('div', { className: $l.guildName, children: r.name }),
            g.jsxs('dl', {
              className: $l.stats,
              children: [
                g.jsxs('div', {
                  children: [
                    g.jsx('dt', { children: '所持金' }),
                    g.jsxs('dd', { children: [r.gold, ' G'] }),
                  ],
                }),
                g.jsxs('div', {
                  children: [
                    g.jsx('dt', { children: '最高到達' }),
                    g.jsx('dd', {
                      children: d.record.deepestReached > 0 ? `${d.record.deepestReached}F` : '-',
                    }),
                  ],
                }),
                g.jsxs('div', {
                  children: [
                    g.jsx('dt', { children: '団員' }),
                    g.jsxs('dd', { children: [r.members.length, '人'] }),
                  ],
                }),
              ],
            }),
          ],
        }),
        !v &&
          g.jsx('p', {
            className: $l.hint,
            children:
              'まずは「ギルド管理」で冒険者を作成してください。団員がいないとダイブできません。',
          }),
        g.jsxs('main', {
          className: $l.menu,
          children: [
            g.jsx(fu, {
              label: p ? '潜行を再開' : 'ダイブ開始',
              description: v
                ? p
                  ? `${p.depth}F から再開`
                  : '第1階からタワーへ潜る'
                : '団員が必要です',
              variant: 'primary',
              disabled: !v,
              onClick: () => void m(),
            }),
            g.jsx(fu, {
              label: 'ギルド管理',
              description: '編成・キャラ作成',
              onClick: () => n('/guild'),
            }),
            g.jsx(fu, {
              label: 'ショップ',
              description: '装備・アイテム売買',
              onClick: () => n('/shop'),
            }),
            g.jsx(fu, { label: '鍛冶屋', description: '武器強化（Phase 4）', disabled: !0 }),
            g.jsx(fu, {
              label: '図鑑 / 記録',
              description: '到達記録・図鑑（Phase 4-5）',
              disabled: !0,
            }),
          ],
        }),
        g.jsx('footer', {
          className: $l.foot,
          children: g.jsx('button', {
            type: 'button',
            className: $l.exit,
            onClick: y,
            children: 'タイトルへ戻る',
          }),
        }),
      ],
    });
  };
function xx() {
  return g.jsxs(Tg, {
    children: [
      g.jsx($e, { path: '/', element: g.jsx(gl, { to: '/title', replace: !0 }) }),
      g.jsx($e, { path: '/title', element: g.jsx(sx, {}) }),
      g.jsx($e, { path: '/town', element: g.jsx(Sx, {}) }),
      g.jsx($e, { path: '/guild', element: g.jsx(US, {}) }),
      g.jsx($e, { path: '/guild/char/:id', element: g.jsx(d2, {}) }),
      g.jsx($e, { path: '/shop', element: g.jsx(U2, {}) }),
      g.jsx($e, { path: '/dungeon', element: g.jsx(fS, {}) }),
      g.jsx($e, { path: '/battle', element: g.jsx(fb, {}) }),
      g.jsx($e, { path: '*', element: g.jsx(m2, {}) }),
    ],
  });
}
const Ex = {
    races: Jl,
    classes: pl,
    titles: $i,
    skills: cr,
    enemies: bu,
    items: _l,
    equipment: Ne,
  },
  Tx = /^[a-z]+_[a-z0-9_]+$/;
function pa(n, c, o) {
  for (const s of c)
    Tx.test(s) || o.push(`[${n}] ID 命名規約違反: "${s}"（期待: <domain>_<name>）`);
}
function Lo(n, c, o, s) {
  const r = new Set(c.skills.map((d) => d.skillId));
  for (const d of c.skills) {
    o.has(d.skillId) || s.push(`[${n}] 未定義スキルを参照: "${d.skillId}"`);
    for (const p of d.requires ?? [])
      r.has(p.skillId) ||
        s.push(`[${n}] スキル "${d.skillId}" の前提 "${p.skillId}" が同ツリーに存在しない`);
  }
}
function Nx() {
  const n = [],
    { races: c, classes: o, titles: s, skills: r, enemies: d, items: p, equipment: v } = Ex;
  (pa('races', Object.keys(c), n),
    pa('classes', Object.keys(o), n),
    pa('titles', Object.keys(s), n),
    pa('skills', Object.keys(r), n),
    pa('enemies', Object.keys(d), n),
    pa('items', Object.keys(p), n),
    pa('equipment', Object.keys(v), n));
  const y = (T, Y) => {
    for (const [H, z] of Object.entries(Y))
      H !== z.id && n.push(`[${T}] キー "${H}" と id "${z.id}" が不一致`);
  };
  (y('races', c),
    y('classes', o),
    y('titles', s),
    y('skills', r),
    y('enemies', d),
    y('items', p),
    y('equipment', v));
  const m = new Set(Object.keys(r)),
    E = new Set(Object.keys(o)),
    _ = new Set(Object.keys(s));
  for (const T of Object.values(c))
    (E.has(T.defaultClassId) ||
      n.push(`[races] "${T.id}" の defaultClassId "${T.defaultClassId}" が未定義`),
      Lo(`races/${T.id}`, T.unionSkillTree, m, n));
  for (const T of Object.values(o)) {
    Lo(`classes/${T.id}`, T.skillTree, m, n);
    for (const Y of T.titleOptions) {
      if (!_.has(Y)) {
        n.push(`[classes] "${T.id}" の称号 "${Y}" が未定義`);
        continue;
      }
      s[Y].parentClassId !== T.id &&
        n.push(`[classes] 称号 "${Y}" の parentClassId が "${T.id}" と不一致`);
    }
  }
  for (const T of Object.values(s))
    (E.has(T.parentClassId) ||
      n.push(`[titles] "${T.id}" の parentClassId "${T.parentClassId}" が未定義`),
      Lo(`titles/${T.id}`, T.skillTree, m, n));
  for (const T of Object.values(v))
    (T.slot === 'weapon' &&
      !T.weaponType &&
      n.push(`[equipment] "${T.id}" は weapon だが weaponType が未設定`),
      T.slot === 'armor' &&
        !T.armorType &&
        n.push(`[equipment] "${T.id}" は armor だが armorType が未設定`),
      (T.buyPrice < 0 || T.tier < 0) && n.push(`[equipment] "${T.id}" の buyPrice/tier が負`));
  for (const T of Object.values(p))
    (T.buyPrice < 0 && n.push(`[items] "${T.id}" の buyPrice が負`),
      T.category === 'consumable' &&
        !T.useContext &&
        !T.effects &&
        n.push(`[items] 消費アイテム "${T.id}" に useContext も effects も無い（使用不能）`));
  return { ok: n.length === 0, errors: n };
}
const ty = Nx();
ty.ok || console.error('マスターデータ検証エラー:', ty.errors);
const Vy = document.getElementById('root');
if (!Vy) throw new Error('Failed to find #root element');
Av.createRoot(Vy).render(
  g.jsx($g, { basename: '/sekaiju-like-game', children: g.jsx(rb, { children: g.jsx(xx, {}) }) })
);
