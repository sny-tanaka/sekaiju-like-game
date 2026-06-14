var Ng = Object.defineProperty;
var Ag = (a, c, o) =>
  c in a ? Ng(a, c, { enumerable: !0, configurable: !0, writable: !0, value: o }) : (a[c] = o);
var No = (a, c, o) => Ag(a, typeof c != 'symbol' ? c + '' : c, o);
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
var Ao = { exports: {} },
  su = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Eh;
function Cg() {
  if (Eh) return su;
  Eh = 1;
  var a = Symbol.for('react.transitional.element'),
    c = Symbol.for('react.fragment');
  function o(s, r, d) {
    var p = null;
    if ((d !== void 0 && (p = '' + d), r.key !== void 0 && (p = '' + r.key), 'key' in r)) {
      d = {};
      for (var g in r) g !== 'key' && (d[g] = r[g]);
    } else d = r;
    return ((r = d.ref), { $$typeof: a, type: s, key: p, ref: r !== void 0 ? r : null, props: d });
  }
  return ((su.Fragment = c), (su.jsx = o), (su.jsxs = o), su);
}
var Th;
function Mg() {
  return (Th || ((Th = 1), (Ao.exports = Cg())), Ao.exports);
}
var v = Mg(),
  Co = { exports: {} },
  ou = {},
  Mo = { exports: {} },
  Ro = {};
/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Nh;
function Rg() {
  return (
    Nh ||
      ((Nh = 1),
      (function (a) {
        function c(U, R) {
          var K = U.length;
          U.push(R);
          t: for (; 0 < K; ) {
            var ot = (K - 1) >>> 1,
              _t = U[ot];
            if (0 < r(_t, R)) ((U[ot] = R), (U[K] = _t), (K = ot));
            else break t;
          }
        }
        function o(U) {
          return U.length === 0 ? null : U[0];
        }
        function s(U) {
          if (U.length === 0) return null;
          var R = U[0],
            K = U.pop();
          if (K !== R) {
            U[0] = K;
            t: for (var ot = 0, _t = U.length, S = _t >>> 1; ot < S; ) {
              var q = 2 * (ot + 1) - 1,
                W = U[q],
                F = q + 1,
                ct = U[F];
              if (0 > r(W, K))
                F < _t && 0 > r(ct, W)
                  ? ((U[ot] = ct), (U[F] = K), (ot = F))
                  : ((U[ot] = W), (U[q] = K), (ot = q));
              else if (F < _t && 0 > r(ct, K)) ((U[ot] = ct), (U[F] = K), (ot = F));
              else break t;
            }
          }
          return R;
        }
        function r(U, R) {
          var K = U.sortIndex - R.sortIndex;
          return K !== 0 ? K : U.id - R.id;
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
          var p = Date,
            g = p.now();
          a.unstable_now = function () {
            return p.now() - g;
          };
        }
        var h = [],
          m = [],
          E = 1,
          b = null,
          N = 3,
          X = !1,
          D = !1,
          w = !1,
          L = !1,
          k = typeof setTimeout == 'function' ? setTimeout : null,
          Q = typeof clearTimeout == 'function' ? clearTimeout : null,
          O = typeof setImmediate < 'u' ? setImmediate : null;
        function Y(U) {
          for (var R = o(m); R !== null; ) {
            if (R.callback === null) s(m);
            else if (R.startTime <= U) (s(m), (R.sortIndex = R.expirationTime), c(h, R));
            else break;
            R = o(m);
          }
        }
        function $(U) {
          if (((w = !1), Y(U), !D))
            if (o(h) !== null) ((D = !0), J || ((J = !0), Et()));
            else {
              var R = o(m);
              R !== null && Ut($, R.startTime - U);
            }
        }
        var J = !1,
          Z = -1,
          V = 5,
          tt = -1;
        function at() {
          return L ? !0 : !(a.unstable_now() - tt < V);
        }
        function vt() {
          if (((L = !1), J)) {
            var U = a.unstable_now();
            tt = U;
            var R = !0;
            try {
              t: {
                ((D = !1), w && ((w = !1), Q(Z), (Z = -1)), (X = !0));
                var K = N;
                try {
                  e: {
                    for (Y(U), b = o(h); b !== null && !(b.expirationTime > U && at()); ) {
                      var ot = b.callback;
                      if (typeof ot == 'function') {
                        ((b.callback = null), (N = b.priorityLevel));
                        var _t = ot(b.expirationTime <= U);
                        if (((U = a.unstable_now()), typeof _t == 'function')) {
                          ((b.callback = _t), Y(U), (R = !0));
                          break e;
                        }
                        (b === o(h) && s(h), Y(U));
                      } else s(h);
                      b = o(h);
                    }
                    if (b !== null) R = !0;
                    else {
                      var S = o(m);
                      (S !== null && Ut($, S.startTime - U), (R = !1));
                    }
                  }
                  break t;
                } finally {
                  ((b = null), (N = K), (X = !1));
                }
                R = void 0;
              }
            } finally {
              R ? Et() : (J = !1);
            }
          }
        }
        var Et;
        if (typeof O == 'function')
          Et = function () {
            O(vt);
          };
        else if (typeof MessageChannel < 'u') {
          var Wt = new MessageChannel(),
            se = Wt.port2;
          ((Wt.port1.onmessage = vt),
            (Et = function () {
              se.postMessage(null);
            }));
        } else
          Et = function () {
            k(vt, 0);
          };
        function Ut(U, R) {
          Z = k(function () {
            U(a.unstable_now());
          }, R);
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
              : (V = 0 < U ? Math.floor(1e3 / U) : 5);
          }),
          (a.unstable_getCurrentPriorityLevel = function () {
            return N;
          }),
          (a.unstable_next = function (U) {
            switch (N) {
              case 1:
              case 2:
              case 3:
                var R = 3;
                break;
              default:
                R = N;
            }
            var K = N;
            N = R;
            try {
              return U();
            } finally {
              N = K;
            }
          }),
          (a.unstable_requestPaint = function () {
            L = !0;
          }),
          (a.unstable_runWithPriority = function (U, R) {
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
            var K = N;
            N = U;
            try {
              return R();
            } finally {
              N = K;
            }
          }),
          (a.unstable_scheduleCallback = function (U, R, K) {
            var ot = a.unstable_now();
            switch (
              (typeof K == 'object' && K !== null
                ? ((K = K.delay), (K = typeof K == 'number' && 0 < K ? ot + K : ot))
                : (K = ot),
              U)
            ) {
              case 1:
                var _t = -1;
                break;
              case 2:
                _t = 250;
                break;
              case 5:
                _t = 1073741823;
                break;
              case 4:
                _t = 1e4;
                break;
              default:
                _t = 5e3;
            }
            return (
              (_t = K + _t),
              (U = {
                id: E++,
                callback: R,
                priorityLevel: U,
                startTime: K,
                expirationTime: _t,
                sortIndex: -1,
              }),
              K > ot
                ? ((U.sortIndex = K),
                  c(m, U),
                  o(h) === null && U === o(m) && (w ? (Q(Z), (Z = -1)) : (w = !0), Ut($, K - ot)))
                : ((U.sortIndex = _t), c(h, U), D || X || ((D = !0), J || ((J = !0), Et()))),
              U
            );
          }),
          (a.unstable_shouldYield = at),
          (a.unstable_wrapCallback = function (U) {
            var R = N;
            return function () {
              var K = N;
              N = R;
              try {
                return U.apply(this, arguments);
              } finally {
                N = K;
              }
            };
          }));
      })(Ro)),
    Ro
  );
}
var Ah;
function zg() {
  return (Ah || ((Ah = 1), (Mo.exports = Rg())), Mo.exports);
}
var zo = { exports: {} },
  it = {};
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Ch;
function jg() {
  if (Ch) return it;
  Ch = 1;
  var a = Symbol.for('react.transitional.element'),
    c = Symbol.for('react.portal'),
    o = Symbol.for('react.fragment'),
    s = Symbol.for('react.strict_mode'),
    r = Symbol.for('react.profiler'),
    d = Symbol.for('react.consumer'),
    p = Symbol.for('react.context'),
    g = Symbol.for('react.forward_ref'),
    h = Symbol.for('react.suspense'),
    m = Symbol.for('react.memo'),
    E = Symbol.for('react.lazy'),
    b = Symbol.for('react.activity'),
    N = Symbol.iterator;
  function X(S) {
    return S === null || typeof S != 'object'
      ? null
      : ((S = (N && S[N]) || S['@@iterator']), typeof S == 'function' ? S : null);
  }
  var D = {
      isMounted: function () {
        return !1;
      },
      enqueueForceUpdate: function () {},
      enqueueReplaceState: function () {},
      enqueueSetState: function () {},
    },
    w = Object.assign,
    L = {};
  function k(S, q, W) {
    ((this.props = S), (this.context = q), (this.refs = L), (this.updater = W || D));
  }
  ((k.prototype.isReactComponent = {}),
    (k.prototype.setState = function (S, q) {
      if (typeof S != 'object' && typeof S != 'function' && S != null)
        throw Error(
          'takes an object of state variables to update or a function which returns an object of state variables.'
        );
      this.updater.enqueueSetState(this, S, q, 'setState');
    }),
    (k.prototype.forceUpdate = function (S) {
      this.updater.enqueueForceUpdate(this, S, 'forceUpdate');
    }));
  function Q() {}
  Q.prototype = k.prototype;
  function O(S, q, W) {
    ((this.props = S), (this.context = q), (this.refs = L), (this.updater = W || D));
  }
  var Y = (O.prototype = new Q());
  ((Y.constructor = O), w(Y, k.prototype), (Y.isPureReactComponent = !0));
  var $ = Array.isArray;
  function J() {}
  var Z = { H: null, A: null, T: null, S: null },
    V = Object.prototype.hasOwnProperty;
  function tt(S, q, W) {
    var F = W.ref;
    return { $$typeof: a, type: S, key: q, ref: F !== void 0 ? F : null, props: W };
  }
  function at(S, q) {
    return tt(S.type, q, S.props);
  }
  function vt(S) {
    return typeof S == 'object' && S !== null && S.$$typeof === a;
  }
  function Et(S) {
    var q = { '=': '=0', ':': '=2' };
    return (
      '$' +
      S.replace(/[=:]/g, function (W) {
        return q[W];
      })
    );
  }
  var Wt = /\/+/g;
  function se(S, q) {
    return typeof S == 'object' && S !== null && S.key != null ? Et('' + S.key) : q.toString(36);
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
  function U(S, q, W, F, ct) {
    var ft = typeof S;
    (ft === 'undefined' || ft === 'boolean') && (S = null);
    var Tt = !1;
    if (S === null) Tt = !0;
    else
      switch (ft) {
        case 'bigint':
        case 'string':
        case 'number':
          Tt = !0;
          break;
        case 'object':
          switch (S.$$typeof) {
            case a:
            case c:
              Tt = !0;
              break;
            case E:
              return ((Tt = S._init), U(Tt(S._payload), q, W, F, ct));
          }
      }
    if (Tt)
      return (
        (ct = ct(S)),
        (Tt = F === '' ? '.' + se(S, 0) : F),
        $(ct)
          ? ((W = ''),
            Tt != null && (W = Tt.replace(Wt, '$&/') + '/'),
            U(ct, q, W, '', function (ya) {
              return ya;
            }))
          : ct != null &&
            (vt(ct) &&
              (ct = at(
                ct,
                W +
                  (ct.key == null || (S && S.key === ct.key)
                    ? ''
                    : ('' + ct.key).replace(Wt, '$&/') + '/') +
                  Tt
              )),
            q.push(ct)),
        1
      );
    Tt = 0;
    var ie = F === '' ? '.' : F + ':';
    if ($(S))
      for (var Yt = 0; Yt < S.length; Yt++)
        ((F = S[Yt]), (ft = ie + se(F, Yt)), (Tt += U(F, q, W, ft, ct)));
    else if (((Yt = X(S)), typeof Yt == 'function'))
      for (S = Yt.call(S), Yt = 0; !(F = S.next()).done; )
        ((F = F.value), (ft = ie + se(F, Yt++)), (Tt += U(F, q, W, ft, ct)));
    else if (ft === 'object') {
      if (typeof S.then == 'function') return U(Ut(S), q, W, F, ct);
      throw (
        (q = String(S)),
        Error(
          'Objects are not valid as a React child (found: ' +
            (q === '[object Object]' ? 'object with keys {' + Object.keys(S).join(', ') + '}' : q) +
            '). If you meant to render a collection of children, use an array instead.'
        )
      );
    }
    return Tt;
  }
  function R(S, q, W) {
    if (S == null) return S;
    var F = [],
      ct = 0;
    return (
      U(S, F, '', '', function (ft) {
        return q.call(W, ft, ct++);
      }),
      F
    );
  }
  function K(S) {
    if (S._status === -1) {
      var q = S._result;
      ((q = q()),
        q.then(
          function (W) {
            (S._status === 0 || S._status === -1) && ((S._status = 1), (S._result = W));
          },
          function (W) {
            (S._status === 0 || S._status === -1) && ((S._status = 2), (S._result = W));
          }
        ),
        S._status === -1 && ((S._status = 0), (S._result = q)));
    }
    if (S._status === 1) return S._result.default;
    throw S._result;
  }
  var ot =
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
    _t = {
      map: R,
      forEach: function (S, q, W) {
        R(
          S,
          function () {
            q.apply(this, arguments);
          },
          W
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
        if (!vt(S))
          throw Error('React.Children.only expected to receive a single React element child.');
        return S;
      },
    };
  return (
    (it.Activity = b),
    (it.Children = _t),
    (it.Component = k),
    (it.Fragment = o),
    (it.Profiler = r),
    (it.PureComponent = O),
    (it.StrictMode = s),
    (it.Suspense = h),
    (it.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = Z),
    (it.__COMPILER_RUNTIME = {
      __proto__: null,
      c: function (S) {
        return Z.H.useMemoCache(S);
      },
    }),
    (it.cache = function (S) {
      return function () {
        return S.apply(null, arguments);
      };
    }),
    (it.cacheSignal = function () {
      return null;
    }),
    (it.cloneElement = function (S, q, W) {
      if (S == null) throw Error('The argument must be a React element, but you passed ' + S + '.');
      var F = w({}, S.props),
        ct = S.key;
      if (q != null)
        for (ft in (q.key !== void 0 && (ct = '' + q.key), q))
          !V.call(q, ft) ||
            ft === 'key' ||
            ft === '__self' ||
            ft === '__source' ||
            (ft === 'ref' && q.ref === void 0) ||
            (F[ft] = q[ft]);
      var ft = arguments.length - 2;
      if (ft === 1) F.children = W;
      else if (1 < ft) {
        for (var Tt = Array(ft), ie = 0; ie < ft; ie++) Tt[ie] = arguments[ie + 2];
        F.children = Tt;
      }
      return tt(S.type, ct, F);
    }),
    (it.createContext = function (S) {
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
    (it.createElement = function (S, q, W) {
      var F,
        ct = {},
        ft = null;
      if (q != null)
        for (F in (q.key !== void 0 && (ft = '' + q.key), q))
          V.call(q, F) && F !== 'key' && F !== '__self' && F !== '__source' && (ct[F] = q[F]);
      var Tt = arguments.length - 2;
      if (Tt === 1) ct.children = W;
      else if (1 < Tt) {
        for (var ie = Array(Tt), Yt = 0; Yt < Tt; Yt++) ie[Yt] = arguments[Yt + 2];
        ct.children = ie;
      }
      if (S && S.defaultProps)
        for (F in ((Tt = S.defaultProps), Tt)) ct[F] === void 0 && (ct[F] = Tt[F]);
      return tt(S, ft, ct);
    }),
    (it.createRef = function () {
      return { current: null };
    }),
    (it.forwardRef = function (S) {
      return { $$typeof: g, render: S };
    }),
    (it.isValidElement = vt),
    (it.lazy = function (S) {
      return { $$typeof: E, _payload: { _status: -1, _result: S }, _init: K };
    }),
    (it.memo = function (S, q) {
      return { $$typeof: m, type: S, compare: q === void 0 ? null : q };
    }),
    (it.startTransition = function (S) {
      var q = Z.T,
        W = {};
      Z.T = W;
      try {
        var F = S(),
          ct = Z.S;
        (ct !== null && ct(W, F),
          typeof F == 'object' && F !== null && typeof F.then == 'function' && F.then(J, ot));
      } catch (ft) {
        ot(ft);
      } finally {
        (q !== null && W.types !== null && (q.types = W.types), (Z.T = q));
      }
    }),
    (it.unstable_useCacheRefresh = function () {
      return Z.H.useCacheRefresh();
    }),
    (it.use = function (S) {
      return Z.H.use(S);
    }),
    (it.useActionState = function (S, q, W) {
      return Z.H.useActionState(S, q, W);
    }),
    (it.useCallback = function (S, q) {
      return Z.H.useCallback(S, q);
    }),
    (it.useContext = function (S) {
      return Z.H.useContext(S);
    }),
    (it.useDebugValue = function () {}),
    (it.useDeferredValue = function (S, q) {
      return Z.H.useDeferredValue(S, q);
    }),
    (it.useEffect = function (S, q) {
      return Z.H.useEffect(S, q);
    }),
    (it.useEffectEvent = function (S) {
      return Z.H.useEffectEvent(S);
    }),
    (it.useId = function () {
      return Z.H.useId();
    }),
    (it.useImperativeHandle = function (S, q, W) {
      return Z.H.useImperativeHandle(S, q, W);
    }),
    (it.useInsertionEffect = function (S, q) {
      return Z.H.useInsertionEffect(S, q);
    }),
    (it.useLayoutEffect = function (S, q) {
      return Z.H.useLayoutEffect(S, q);
    }),
    (it.useMemo = function (S, q) {
      return Z.H.useMemo(S, q);
    }),
    (it.useOptimistic = function (S, q) {
      return Z.H.useOptimistic(S, q);
    }),
    (it.useReducer = function (S, q, W) {
      return Z.H.useReducer(S, q, W);
    }),
    (it.useRef = function (S) {
      return Z.H.useRef(S);
    }),
    (it.useState = function (S) {
      return Z.H.useState(S);
    }),
    (it.useSyncExternalStore = function (S, q, W) {
      return Z.H.useSyncExternalStore(S, q, W);
    }),
    (it.useTransition = function () {
      return Z.H.useTransition();
    }),
    (it.version = '19.2.5'),
    it
  );
}
var Mh;
function tr() {
  return (Mh || ((Mh = 1), (zo.exports = jg())), zo.exports);
}
var jo = { exports: {} },
  ae = {};
/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Rh;
function Og() {
  if (Rh) return ae;
  Rh = 1;
  var a = tr();
  function c(h) {
    var m = 'https://react.dev/errors/' + h;
    if (1 < arguments.length) {
      m += '?args[]=' + encodeURIComponent(arguments[1]);
      for (var E = 2; E < arguments.length; E++) m += '&args[]=' + encodeURIComponent(arguments[E]);
    }
    return (
      'Minified React error #' +
      h +
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
  function d(h, m, E) {
    var b = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: r,
      key: b == null ? null : '' + b,
      children: h,
      containerInfo: m,
      implementation: E,
    };
  }
  var p = a.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function g(h, m) {
    if (h === 'font') return '';
    if (typeof m == 'string') return m === 'use-credentials' ? m : '';
  }
  return (
    (ae.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = s),
    (ae.createPortal = function (h, m) {
      var E = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
      if (!m || (m.nodeType !== 1 && m.nodeType !== 9 && m.nodeType !== 11)) throw Error(c(299));
      return d(h, m, null, E);
    }),
    (ae.flushSync = function (h) {
      var m = p.T,
        E = s.p;
      try {
        if (((p.T = null), (s.p = 2), h)) return h();
      } finally {
        ((p.T = m), (s.p = E), s.d.f());
      }
    }),
    (ae.preconnect = function (h, m) {
      typeof h == 'string' &&
        (m
          ? ((m = m.crossOrigin),
            (m = typeof m == 'string' ? (m === 'use-credentials' ? m : '') : void 0))
          : (m = null),
        s.d.C(h, m));
    }),
    (ae.prefetchDNS = function (h) {
      typeof h == 'string' && s.d.D(h);
    }),
    (ae.preinit = function (h, m) {
      if (typeof h == 'string' && m && typeof m.as == 'string') {
        var E = m.as,
          b = g(E, m.crossOrigin),
          N = typeof m.integrity == 'string' ? m.integrity : void 0,
          X = typeof m.fetchPriority == 'string' ? m.fetchPriority : void 0;
        E === 'style'
          ? s.d.S(h, typeof m.precedence == 'string' ? m.precedence : void 0, {
              crossOrigin: b,
              integrity: N,
              fetchPriority: X,
            })
          : E === 'script' &&
            s.d.X(h, {
              crossOrigin: b,
              integrity: N,
              fetchPriority: X,
              nonce: typeof m.nonce == 'string' ? m.nonce : void 0,
            });
      }
    }),
    (ae.preinitModule = function (h, m) {
      if (typeof h == 'string')
        if (typeof m == 'object' && m !== null) {
          if (m.as == null || m.as === 'script') {
            var E = g(m.as, m.crossOrigin);
            s.d.M(h, {
              crossOrigin: E,
              integrity: typeof m.integrity == 'string' ? m.integrity : void 0,
              nonce: typeof m.nonce == 'string' ? m.nonce : void 0,
            });
          }
        } else m == null && s.d.M(h);
    }),
    (ae.preload = function (h, m) {
      if (typeof h == 'string' && typeof m == 'object' && m !== null && typeof m.as == 'string') {
        var E = m.as,
          b = g(E, m.crossOrigin);
        s.d.L(h, E, {
          crossOrigin: b,
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
    (ae.preloadModule = function (h, m) {
      if (typeof h == 'string')
        if (m) {
          var E = g(m.as, m.crossOrigin);
          s.d.m(h, {
            as: typeof m.as == 'string' && m.as !== 'script' ? m.as : void 0,
            crossOrigin: E,
            integrity: typeof m.integrity == 'string' ? m.integrity : void 0,
          });
        } else s.d.m(h);
    }),
    (ae.requestFormReset = function (h) {
      s.d.r(h);
    }),
    (ae.unstable_batchedUpdates = function (h, m) {
      return h(m);
    }),
    (ae.useFormState = function (h, m, E) {
      return p.H.useFormState(h, m, E);
    }),
    (ae.useFormStatus = function () {
      return p.H.useHostTransitionStatus();
    }),
    (ae.version = '19.2.5'),
    ae
  );
}
var zh;
function Dg() {
  if (zh) return jo.exports;
  zh = 1;
  function a() {
    if (
      !(
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > 'u' ||
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != 'function'
      )
    )
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(a);
      } catch (c) {
        console.error(c);
      }
  }
  return (a(), (jo.exports = Og()), jo.exports);
}
/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var jh;
function kg() {
  if (jh) return ou;
  jh = 1;
  var a = zg(),
    c = tr(),
    o = Dg();
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
  function g(t) {
    if (t.tag === 31) {
      var e = t.memoizedState;
      if ((e === null && ((t = t.alternate), t !== null && (e = t.memoizedState)), e !== null))
        return e.dehydrated;
    }
    return null;
  }
  function h(t) {
    if (d(t) !== t) throw Error(s(188));
  }
  function m(t) {
    var e = t.alternate;
    if (!e) {
      if (((e = d(t)), e === null)) throw Error(s(188));
      return e !== t ? null : t;
    }
    for (var l = t, n = e; ; ) {
      var u = l.return;
      if (u === null) break;
      var i = u.alternate;
      if (i === null) {
        if (((n = u.return), n !== null)) {
          l = n;
          continue;
        }
        break;
      }
      if (u.child === i.child) {
        for (i = u.child; i; ) {
          if (i === l) return (h(u), t);
          if (i === n) return (h(u), e);
          i = i.sibling;
        }
        throw Error(s(188));
      }
      if (l.return !== n.return) ((l = u), (n = i));
      else {
        for (var f = !1, y = u.child; y; ) {
          if (y === l) {
            ((f = !0), (l = u), (n = i));
            break;
          }
          if (y === n) {
            ((f = !0), (n = u), (l = i));
            break;
          }
          y = y.sibling;
        }
        if (!f) {
          for (y = i.child; y; ) {
            if (y === l) {
              ((f = !0), (l = i), (n = u));
              break;
            }
            if (y === n) {
              ((f = !0), (n = i), (l = u));
              break;
            }
            y = y.sibling;
          }
          if (!f) throw Error(s(189));
        }
      }
      if (l.alternate !== n) throw Error(s(190));
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
  var b = Object.assign,
    N = Symbol.for('react.element'),
    X = Symbol.for('react.transitional.element'),
    D = Symbol.for('react.portal'),
    w = Symbol.for('react.fragment'),
    L = Symbol.for('react.strict_mode'),
    k = Symbol.for('react.profiler'),
    Q = Symbol.for('react.consumer'),
    O = Symbol.for('react.context'),
    Y = Symbol.for('react.forward_ref'),
    $ = Symbol.for('react.suspense'),
    J = Symbol.for('react.suspense_list'),
    Z = Symbol.for('react.memo'),
    V = Symbol.for('react.lazy'),
    tt = Symbol.for('react.activity'),
    at = Symbol.for('react.memo_cache_sentinel'),
    vt = Symbol.iterator;
  function Et(t) {
    return t === null || typeof t != 'object'
      ? null
      : ((t = (vt && t[vt]) || t['@@iterator']), typeof t == 'function' ? t : null);
  }
  var Wt = Symbol.for('react.client.reference');
  function se(t) {
    if (t == null) return null;
    if (typeof t == 'function') return t.$$typeof === Wt ? null : t.displayName || t.name || null;
    if (typeof t == 'string') return t;
    switch (t) {
      case w:
        return 'Fragment';
      case k:
        return 'Profiler';
      case L:
        return 'StrictMode';
      case $:
        return 'Suspense';
      case J:
        return 'SuspenseList';
      case tt:
        return 'Activity';
    }
    if (typeof t == 'object')
      switch (t.$$typeof) {
        case D:
          return 'Portal';
        case O:
          return t.displayName || 'Context';
        case Q:
          return (t._context.displayName || 'Context') + '.Consumer';
        case Y:
          var e = t.render;
          return (
            (t = t.displayName),
            t ||
              ((t = e.displayName || e.name || ''),
              (t = t !== '' ? 'ForwardRef(' + t + ')' : 'ForwardRef')),
            t
          );
        case Z:
          return ((e = t.displayName || null), e !== null ? e : se(t.type) || 'Memo');
        case V:
          ((e = t._payload), (t = t._init));
          try {
            return se(t(e));
          } catch {}
      }
    return null;
  }
  var Ut = Array.isArray,
    U = c.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
    R = o.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
    K = { pending: !1, data: null, method: null, action: null },
    ot = [],
    _t = -1;
  function S(t) {
    return { current: t };
  }
  function q(t) {
    0 > _t || ((t.current = ot[_t]), (ot[_t] = null), _t--);
  }
  function W(t, e) {
    (_t++, (ot[_t] = t.current), (t.current = e));
  }
  var F = S(null),
    ct = S(null),
    ft = S(null),
    Tt = S(null);
  function ie(t, e) {
    switch ((W(ft, e), W(ct, t), W(F, null), e.nodeType)) {
      case 9:
      case 11:
        t = (t = e.documentElement) && (t = t.namespaceURI) ? Zm(t) : 0;
        break;
      default:
        if (((t = e.tagName), (e = e.namespaceURI))) ((e = Zm(e)), (t = Km(e, t)));
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
    (q(F), W(F, t));
  }
  function Yt() {
    (q(F), q(ct), q(ft));
  }
  function ya(t) {
    t.memoizedState !== null && W(Tt, t);
    var e = F.current,
      l = Km(e, t.type);
    e !== l && (W(ct, t), W(F, l));
  }
  function Tu(t) {
    (ct.current === t && (q(F), q(ct)), Tt.current === t && (q(Tt), (au._currentValue = K)));
  }
  var ic, Sr;
  function Wl(t) {
    if (ic === void 0)
      try {
        throw Error();
      } catch (l) {
        var e = l.stack.trim().match(/\n( *(at )?)/);
        ((ic = (e && e[1]) || ''),
          (Sr =
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
      ic +
      t +
      Sr
    );
  }
  var cc = !1;
  function sc(t, e) {
    if (!t || cc) return '';
    cc = !0;
    var l = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var n = {
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
                } catch (j) {
                  var z = j;
                }
                Reflect.construct(t, [], G);
              } else {
                try {
                  G.call();
                } catch (j) {
                  z = j;
                }
                t.call(G.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (j) {
                z = j;
              }
              (G = t()) && typeof G.catch == 'function' && G.catch(function () {});
            }
          } catch (j) {
            if (j && z && typeof j.stack == 'string') return [j.stack, z.stack];
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
      var i = n.DetermineComponentFrameRoot(),
        f = i[0],
        y = i[1];
      if (f && y) {
        var _ = f.split(`
`),
          M = y.split(`
`);
        for (u = n = 0; n < _.length && !_[n].includes('DetermineComponentFrameRoot'); ) n++;
        for (; u < M.length && !M[u].includes('DetermineComponentFrameRoot'); ) u++;
        if (n === _.length || u === M.length)
          for (n = _.length - 1, u = M.length - 1; 1 <= n && 0 <= u && _[n] !== M[u]; ) u--;
        for (; 1 <= n && 0 <= u; n--, u--)
          if (_[n] !== M[u]) {
            if (n !== 1 || u !== 1)
              do
                if ((n--, u--, 0 > u || _[n] !== M[u])) {
                  var B =
                    `
` + _[n].replace(' at new ', ' at ');
                  return (
                    t.displayName &&
                      B.includes('<anonymous>') &&
                      (B = B.replace('<anonymous>', t.displayName)),
                    B
                  );
                }
              while (1 <= n && 0 <= u);
            break;
          }
      }
    } finally {
      ((cc = !1), (Error.prepareStackTrace = l));
    }
    return (l = t ? t.displayName || t.name : '') ? Wl(l) : '';
  }
  function lp(t, e) {
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
        return sc(t.type, !1);
      case 11:
        return sc(t.type.render, !1);
      case 1:
        return sc(t.type, !0);
      case 31:
        return Wl('Activity');
      default:
        return '';
    }
  }
  function xr(t) {
    try {
      var e = '',
        l = null;
      do ((e += lp(t, l)), (l = t), (t = t.return));
      while (t);
      return e;
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
  var oc = Object.prototype.hasOwnProperty,
    rc = a.unstable_scheduleCallback,
    fc = a.unstable_cancelCallback,
    np = a.unstable_shouldYield,
    ap = a.unstable_requestPaint,
    pe = a.unstable_now,
    up = a.unstable_getCurrentPriorityLevel,
    Er = a.unstable_ImmediatePriority,
    Tr = a.unstable_UserBlockingPriority,
    Nu = a.unstable_NormalPriority,
    ip = a.unstable_LowPriority,
    Nr = a.unstable_IdlePriority,
    cp = a.log,
    sp = a.unstable_setDisableYieldValue,
    pa = null,
    ge = null;
  function xl(t) {
    if ((typeof cp == 'function' && sp(t), ge && typeof ge.setStrictMode == 'function'))
      try {
        ge.setStrictMode(pa, t);
      } catch {}
  }
  var ve = Math.clz32 ? Math.clz32 : fp,
    op = Math.log,
    rp = Math.LN2;
  function fp(t) {
    return ((t >>>= 0), t === 0 ? 32 : (31 - ((op(t) / rp) | 0)) | 0);
  }
  var Au = 256,
    Cu = 262144,
    Mu = 4194304;
  function Il(t) {
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
  function Ru(t, e, l) {
    var n = t.pendingLanes;
    if (n === 0) return 0;
    var u = 0,
      i = t.suspendedLanes,
      f = t.pingedLanes;
    t = t.warmLanes;
    var y = n & 134217727;
    return (
      y !== 0
        ? ((n = y & ~i),
          n !== 0
            ? (u = Il(n))
            : ((f &= y), f !== 0 ? (u = Il(f)) : l || ((l = y & ~t), l !== 0 && (u = Il(l)))))
        : ((y = n & ~i),
          y !== 0
            ? (u = Il(y))
            : f !== 0
              ? (u = Il(f))
              : l || ((l = n & ~t), l !== 0 && (u = Il(l)))),
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
  function ga(t, e) {
    return (t.pendingLanes & ~(t.suspendedLanes & ~t.pingedLanes) & e) === 0;
  }
  function dp(t, e) {
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
  function Ar() {
    var t = Mu;
    return ((Mu <<= 1), (Mu & 62914560) === 0 && (Mu = 4194304), t);
  }
  function dc(t) {
    for (var e = [], l = 0; 31 > l; l++) e.push(t);
    return e;
  }
  function va(t, e) {
    ((t.pendingLanes |= e),
      e !== 268435456 && ((t.suspendedLanes = 0), (t.pingedLanes = 0), (t.warmLanes = 0)));
  }
  function mp(t, e, l, n, u, i) {
    var f = t.pendingLanes;
    ((t.pendingLanes = l),
      (t.suspendedLanes = 0),
      (t.pingedLanes = 0),
      (t.warmLanes = 0),
      (t.expiredLanes &= l),
      (t.entangledLanes &= l),
      (t.errorRecoveryDisabledLanes &= l),
      (t.shellSuspendCounter = 0));
    var y = t.entanglements,
      _ = t.expirationTimes,
      M = t.hiddenUpdates;
    for (l = f & ~l; 0 < l; ) {
      var B = 31 - ve(l),
        G = 1 << B;
      ((y[B] = 0), (_[B] = -1));
      var z = M[B];
      if (z !== null)
        for (M[B] = null, B = 0; B < z.length; B++) {
          var j = z[B];
          j !== null && (j.lane &= -536870913);
        }
      l &= ~G;
    }
    (n !== 0 && Cr(t, n, 0),
      i !== 0 && u === 0 && t.tag !== 0 && (t.suspendedLanes |= i & ~(f & ~e)));
  }
  function Cr(t, e, l) {
    ((t.pendingLanes |= e), (t.suspendedLanes &= ~e));
    var n = 31 - ve(e);
    ((t.entangledLanes |= e),
      (t.entanglements[n] = t.entanglements[n] | 1073741824 | (l & 261930)));
  }
  function Mr(t, e) {
    var l = (t.entangledLanes |= e);
    for (t = t.entanglements; l; ) {
      var n = 31 - ve(l),
        u = 1 << n;
      ((u & e) | (t[n] & e) && (t[n] |= e), (l &= ~u));
    }
  }
  function Rr(t, e) {
    var l = e & -e;
    return ((l = (l & 42) !== 0 ? 1 : mc(l)), (l & (t.suspendedLanes | e)) !== 0 ? 0 : l);
  }
  function mc(t) {
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
  function hc(t) {
    return ((t &= -t), 2 < t ? (8 < t ? ((t & 134217727) !== 0 ? 32 : 268435456) : 8) : 2);
  }
  function zr() {
    var t = R.p;
    return t !== 0 ? t : ((t = window.event), t === void 0 ? 32 : ph(t.type));
  }
  function jr(t, e) {
    var l = R.p;
    try {
      return ((R.p = t), e());
    } finally {
      R.p = l;
    }
  }
  var El = Math.random().toString(36).slice(2),
    Pt = '__reactFiber$' + El,
    oe = '__reactProps$' + El,
    bn = '__reactContainer$' + El,
    yc = '__reactEvents$' + El,
    hp = '__reactListeners$' + El,
    yp = '__reactHandles$' + El,
    Or = '__reactResources$' + El,
    _a = '__reactMarker$' + El;
  function pc(t) {
    (delete t[Pt], delete t[oe], delete t[yc], delete t[hp], delete t[yp]);
  }
  function Sn(t) {
    var e = t[Pt];
    if (e) return e;
    for (var l = t.parentNode; l; ) {
      if ((e = l[bn] || l[Pt])) {
        if (((l = e.alternate), e.child !== null || (l !== null && l.child !== null)))
          for (t = th(t); t !== null; ) {
            if ((l = t[Pt])) return l;
            t = th(t);
          }
        return e;
      }
      ((t = l), (l = t.parentNode));
    }
    return null;
  }
  function xn(t) {
    if ((t = t[Pt] || t[bn])) {
      var e = t.tag;
      if (e === 5 || e === 6 || e === 13 || e === 31 || e === 26 || e === 27 || e === 3) return t;
    }
    return null;
  }
  function ba(t) {
    var e = t.tag;
    if (e === 5 || e === 26 || e === 27 || e === 6) return t.stateNode;
    throw Error(s(33));
  }
  function En(t) {
    var e = t[Or];
    return (e || (e = t[Or] = { hoistableStyles: new Map(), hoistableScripts: new Map() }), e);
  }
  function It(t) {
    t[_a] = !0;
  }
  var Dr = new Set(),
    kr = {};
  function Fl(t, e) {
    (Tn(t, e), Tn(t + 'Capture', e));
  }
  function Tn(t, e) {
    for (kr[t] = e, t = 0; t < e.length; t++) Dr.add(e[t]);
  }
  var pp = RegExp(
      '^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$'
    ),
    wr = {},
    Br = {};
  function gp(t) {
    return oc.call(Br, t)
      ? !0
      : oc.call(wr, t)
        ? !1
        : pp.test(t)
          ? (Br[t] = !0)
          : ((wr[t] = !0), !1);
  }
  function zu(t, e, l) {
    if (gp(e))
      if (l === null) t.removeAttribute(e);
      else {
        switch (typeof l) {
          case 'undefined':
          case 'function':
          case 'symbol':
            t.removeAttribute(e);
            return;
          case 'boolean':
            var n = e.toLowerCase().slice(0, 5);
            if (n !== 'data-' && n !== 'aria-') {
              t.removeAttribute(e);
              return;
            }
        }
        t.setAttribute(e, '' + l);
      }
  }
  function ju(t, e, l) {
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
  function Fe(t, e, l, n) {
    if (n === null) t.removeAttribute(l);
    else {
      switch (typeof n) {
        case 'undefined':
        case 'function':
        case 'symbol':
        case 'boolean':
          t.removeAttribute(l);
          return;
      }
      t.setAttributeNS(e, l, '' + n);
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
  function Ur(t) {
    var e = t.type;
    return (t = t.nodeName) && t.toLowerCase() === 'input' && (e === 'checkbox' || e === 'radio');
  }
  function vp(t, e, l) {
    var n = Object.getOwnPropertyDescriptor(t.constructor.prototype, e);
    if (
      !t.hasOwnProperty(e) &&
      typeof n < 'u' &&
      typeof n.get == 'function' &&
      typeof n.set == 'function'
    ) {
      var u = n.get,
        i = n.set;
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
        Object.defineProperty(t, e, { enumerable: n.enumerable }),
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
  function gc(t) {
    if (!t._valueTracker) {
      var e = Ur(t) ? 'checked' : 'value';
      t._valueTracker = vp(t, e, '' + t[e]);
    }
  }
  function Lr(t) {
    if (!t) return !1;
    var e = t._valueTracker;
    if (!e) return !0;
    var l = e.getValue(),
      n = '';
    return (
      t && (n = Ur(t) ? (t.checked ? 'true' : 'false') : t.value),
      (t = n),
      t !== l ? (e.setValue(t), !0) : !1
    );
  }
  function Ou(t) {
    if (((t = t || (typeof document < 'u' ? document : void 0)), typeof t > 'u')) return null;
    try {
      return t.activeElement || t.body;
    } catch {
      return t.body;
    }
  }
  var _p = /[\n"\\]/g;
  function Re(t) {
    return t.replace(_p, function (e) {
      return '\\' + e.charCodeAt(0).toString(16) + ' ';
    });
  }
  function vc(t, e, l, n, u, i, f, y) {
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
        ? _c(t, f, Me(e))
        : l != null
          ? _c(t, f, Me(l))
          : n != null && t.removeAttribute('value'),
      u == null && i != null && (t.defaultChecked = !!i),
      u != null && (t.checked = u && typeof u != 'function' && typeof u != 'symbol'),
      y != null && typeof y != 'function' && typeof y != 'symbol' && typeof y != 'boolean'
        ? (t.name = '' + Me(y))
        : t.removeAttribute('name'));
  }
  function Hr(t, e, l, n, u, i, f, y) {
    if (
      (i != null &&
        typeof i != 'function' &&
        typeof i != 'symbol' &&
        typeof i != 'boolean' &&
        (t.type = i),
      e != null || l != null)
    ) {
      if (!((i !== 'submit' && i !== 'reset') || e != null)) {
        gc(t);
        return;
      }
      ((l = l != null ? '' + Me(l) : ''),
        (e = e != null ? '' + Me(e) : l),
        y || e === t.value || (t.value = e),
        (t.defaultValue = e));
    }
    ((n = n ?? u),
      (n = typeof n != 'function' && typeof n != 'symbol' && !!n),
      (t.checked = y ? t.checked : !!n),
      (t.defaultChecked = !!n),
      f != null &&
        typeof f != 'function' &&
        typeof f != 'symbol' &&
        typeof f != 'boolean' &&
        (t.name = f),
      gc(t));
  }
  function _c(t, e, l) {
    (e === 'number' && Ou(t.ownerDocument) === t) ||
      t.defaultValue === '' + l ||
      (t.defaultValue = '' + l);
  }
  function Nn(t, e, l, n) {
    if (((t = t.options), e)) {
      e = {};
      for (var u = 0; u < l.length; u++) e['$' + l[u]] = !0;
      for (l = 0; l < t.length; l++)
        ((u = e.hasOwnProperty('$' + t[l].value)),
          t[l].selected !== u && (t[l].selected = u),
          u && n && (t[l].defaultSelected = !0));
    } else {
      for (l = '' + Me(l), e = null, u = 0; u < t.length; u++) {
        if (t[u].value === l) {
          ((t[u].selected = !0), n && (t[u].defaultSelected = !0));
          return;
        }
        e !== null || t[u].disabled || (e = t[u]);
      }
      e !== null && (e.selected = !0);
    }
  }
  function qr(t, e, l) {
    if (e != null && ((e = '' + Me(e)), e !== t.value && (t.value = e), l == null)) {
      t.defaultValue !== e && (t.defaultValue = e);
      return;
    }
    t.defaultValue = l != null ? '' + Me(l) : '';
  }
  function Gr(t, e, l, n) {
    if (e == null) {
      if (n != null) {
        if (l != null) throw Error(s(92));
        if (Ut(n)) {
          if (1 < n.length) throw Error(s(93));
          n = n[0];
        }
        l = n;
      }
      (l == null && (l = ''), (e = l));
    }
    ((l = Me(e)),
      (t.defaultValue = l),
      (n = t.textContent),
      n === l && n !== '' && n !== null && (t.value = n),
      gc(t));
  }
  function An(t, e) {
    if (e) {
      var l = t.firstChild;
      if (l && l === t.lastChild && l.nodeType === 3) {
        l.nodeValue = e;
        return;
      }
    }
    t.textContent = e;
  }
  var bp = new Set(
    'animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp'.split(
      ' '
    )
  );
  function Yr(t, e, l) {
    var n = e.indexOf('--') === 0;
    l == null || typeof l == 'boolean' || l === ''
      ? n
        ? t.setProperty(e, '')
        : e === 'float'
          ? (t.cssFloat = '')
          : (t[e] = '')
      : n
        ? t.setProperty(e, l)
        : typeof l != 'number' || l === 0 || bp.has(e)
          ? e === 'float'
            ? (t.cssFloat = l)
            : (t[e] = ('' + l).trim())
          : (t[e] = l + 'px');
  }
  function Xr(t, e, l) {
    if (e != null && typeof e != 'object') throw Error(s(62));
    if (((t = t.style), l != null)) {
      for (var n in l)
        !l.hasOwnProperty(n) ||
          (e != null && e.hasOwnProperty(n)) ||
          (n.indexOf('--') === 0
            ? t.setProperty(n, '')
            : n === 'float'
              ? (t.cssFloat = '')
              : (t[n] = ''));
      for (var u in e) ((n = e[u]), e.hasOwnProperty(u) && l[u] !== n && Yr(t, u, n));
    } else for (var i in e) e.hasOwnProperty(i) && Yr(t, i, e[i]);
  }
  function bc(t) {
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
  var Sp = new Map([
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
    xp =
      /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function Du(t) {
    return xp.test('' + t)
      ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')"
      : t;
  }
  function Pe() {}
  var Sc = null;
  function xc(t) {
    return (
      (t = t.target || t.srcElement || window),
      t.correspondingUseElement && (t = t.correspondingUseElement),
      t.nodeType === 3 ? t.parentNode : t
    );
  }
  var Cn = null,
    Mn = null;
  function Vr(t) {
    var e = xn(t);
    if (e && (t = e.stateNode)) {
      var l = t[oe] || null;
      t: switch (((t = e.stateNode), e.type)) {
        case 'input':
          if (
            (vc(
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
              l = l.querySelectorAll('input[name="' + Re('' + e) + '"][type="radio"]'), e = 0;
              e < l.length;
              e++
            ) {
              var n = l[e];
              if (n !== t && n.form === t.form) {
                var u = n[oe] || null;
                if (!u) throw Error(s(90));
                vc(
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
            for (e = 0; e < l.length; e++) ((n = l[e]), n.form === t.form && Lr(n));
          }
          break t;
        case 'textarea':
          qr(t, l.value, l.defaultValue);
          break t;
        case 'select':
          ((e = l.value), e != null && Nn(t, !!l.multiple, e, !1));
      }
    }
  }
  var Ec = !1;
  function Qr(t, e, l) {
    if (Ec) return t(e, l);
    Ec = !0;
    try {
      var n = t(e);
      return n;
    } finally {
      if (
        ((Ec = !1),
        (Cn !== null || Mn !== null) &&
          (bi(), Cn && ((e = Cn), (t = Mn), (Mn = Cn = null), Vr(e), t)))
      )
        for (e = 0; e < t.length; e++) Vr(t[e]);
    }
  }
  function Sa(t, e) {
    var l = t.stateNode;
    if (l === null) return null;
    var n = l[oe] || null;
    if (n === null) return null;
    l = n[e];
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
        ((n = !n.disabled) ||
          ((t = t.type),
          (n = !(t === 'button' || t === 'input' || t === 'select' || t === 'textarea'))),
          (t = !n));
        break t;
      default:
        t = !1;
    }
    if (t) return null;
    if (l && typeof l != 'function') throw Error(s(231, e, typeof l));
    return l;
  }
  var tl = !(
      typeof window > 'u' ||
      typeof window.document > 'u' ||
      typeof window.document.createElement > 'u'
    ),
    Tc = !1;
  if (tl)
    try {
      var xa = {};
      (Object.defineProperty(xa, 'passive', {
        get: function () {
          Tc = !0;
        },
      }),
        window.addEventListener('test', xa, xa),
        window.removeEventListener('test', xa, xa));
    } catch {
      Tc = !1;
    }
  var Tl = null,
    Nc = null,
    ku = null;
  function Zr() {
    if (ku) return ku;
    var t,
      e = Nc,
      l = e.length,
      n,
      u = 'value' in Tl ? Tl.value : Tl.textContent,
      i = u.length;
    for (t = 0; t < l && e[t] === u[t]; t++);
    var f = l - t;
    for (n = 1; n <= f && e[l - n] === u[i - n]; n++);
    return (ku = u.slice(t, 1 < n ? 1 - n : void 0));
  }
  function wu(t) {
    var e = t.keyCode;
    return (
      'charCode' in t ? ((t = t.charCode), t === 0 && e === 13 && (t = 13)) : (t = e),
      t === 10 && (t = 13),
      32 <= t || t === 13 ? t : 0
    );
  }
  function Bu() {
    return !0;
  }
  function Kr() {
    return !1;
  }
  function re(t) {
    function e(l, n, u, i, f) {
      ((this._reactName = l),
        (this._targetInst = u),
        (this.type = n),
        (this.nativeEvent = i),
        (this.target = f),
        (this.currentTarget = null));
      for (var y in t) t.hasOwnProperty(y) && ((l = t[y]), (this[y] = l ? l(i) : i[y]));
      return (
        (this.isDefaultPrevented = (
          i.defaultPrevented != null ? i.defaultPrevented : i.returnValue === !1
        )
          ? Bu
          : Kr),
        (this.isPropagationStopped = Kr),
        this
      );
    }
    return (
      b(e.prototype, {
        preventDefault: function () {
          this.defaultPrevented = !0;
          var l = this.nativeEvent;
          l &&
            (l.preventDefault
              ? l.preventDefault()
              : typeof l.returnValue != 'unknown' && (l.returnValue = !1),
            (this.isDefaultPrevented = Bu));
        },
        stopPropagation: function () {
          var l = this.nativeEvent;
          l &&
            (l.stopPropagation
              ? l.stopPropagation()
              : typeof l.cancelBubble != 'unknown' && (l.cancelBubble = !0),
            (this.isPropagationStopped = Bu));
        },
        persist: function () {},
        isPersistent: Bu,
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
    Uu = re(Pl),
    Ea = b({}, Pl, { view: 0, detail: 0 }),
    Ep = re(Ea),
    Ac,
    Cc,
    Ta,
    Lu = b({}, Ea, {
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
      getModifierState: Rc,
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
          : (t !== Ta &&
              (Ta && t.type === 'mousemove'
                ? ((Ac = t.screenX - Ta.screenX), (Cc = t.screenY - Ta.screenY))
                : (Cc = Ac = 0),
              (Ta = t)),
            Ac);
      },
      movementY: function (t) {
        return 'movementY' in t ? t.movementY : Cc;
      },
    }),
    $r = re(Lu),
    Tp = b({}, Lu, { dataTransfer: 0 }),
    Np = re(Tp),
    Ap = b({}, Ea, { relatedTarget: 0 }),
    Mc = re(Ap),
    Cp = b({}, Pl, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
    Mp = re(Cp),
    Rp = b({}, Pl, {
      clipboardData: function (t) {
        return 'clipboardData' in t ? t.clipboardData : window.clipboardData;
      },
    }),
    zp = re(Rp),
    jp = b({}, Pl, { data: 0 }),
    Jr = re(jp),
    Op = {
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
    Dp = {
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
    kp = { Alt: 'altKey', Control: 'ctrlKey', Meta: 'metaKey', Shift: 'shiftKey' };
  function wp(t) {
    var e = this.nativeEvent;
    return e.getModifierState ? e.getModifierState(t) : (t = kp[t]) ? !!e[t] : !1;
  }
  function Rc() {
    return wp;
  }
  var Bp = b({}, Ea, {
      key: function (t) {
        if (t.key) {
          var e = Op[t.key] || t.key;
          if (e !== 'Unidentified') return e;
        }
        return t.type === 'keypress'
          ? ((t = wu(t)), t === 13 ? 'Enter' : String.fromCharCode(t))
          : t.type === 'keydown' || t.type === 'keyup'
            ? Dp[t.keyCode] || 'Unidentified'
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
      getModifierState: Rc,
      charCode: function (t) {
        return t.type === 'keypress' ? wu(t) : 0;
      },
      keyCode: function (t) {
        return t.type === 'keydown' || t.type === 'keyup' ? t.keyCode : 0;
      },
      which: function (t) {
        return t.type === 'keypress'
          ? wu(t)
          : t.type === 'keydown' || t.type === 'keyup'
            ? t.keyCode
            : 0;
      },
    }),
    Up = re(Bp),
    Lp = b({}, Lu, {
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
    Wr = re(Lp),
    Hp = b({}, Ea, {
      touches: 0,
      targetTouches: 0,
      changedTouches: 0,
      altKey: 0,
      metaKey: 0,
      ctrlKey: 0,
      shiftKey: 0,
      getModifierState: Rc,
    }),
    qp = re(Hp),
    Gp = b({}, Pl, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
    Yp = re(Gp),
    Xp = b({}, Lu, {
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
    Vp = re(Xp),
    Qp = b({}, Pl, { newState: 0, oldState: 0 }),
    Zp = re(Qp),
    Kp = [9, 13, 27, 32],
    zc = tl && 'CompositionEvent' in window,
    Na = null;
  tl && 'documentMode' in document && (Na = document.documentMode);
  var $p = tl && 'TextEvent' in window && !Na,
    Ir = tl && (!zc || (Na && 8 < Na && 11 >= Na)),
    Fr = ' ',
    Pr = !1;
  function tf(t, e) {
    switch (t) {
      case 'keyup':
        return Kp.indexOf(e.keyCode) !== -1;
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
  function ef(t) {
    return ((t = t.detail), typeof t == 'object' && 'data' in t ? t.data : null);
  }
  var Rn = !1;
  function Jp(t, e) {
    switch (t) {
      case 'compositionend':
        return ef(e);
      case 'keypress':
        return e.which !== 32 ? null : ((Pr = !0), Fr);
      case 'textInput':
        return ((t = e.data), t === Fr && Pr ? null : t);
      default:
        return null;
    }
  }
  function Wp(t, e) {
    if (Rn)
      return t === 'compositionend' || (!zc && tf(t, e))
        ? ((t = Zr()), (ku = Nc = Tl = null), (Rn = !1), t)
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
        return Ir && e.locale !== 'ko' ? null : e.data;
      default:
        return null;
    }
  }
  var Ip = {
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
  function lf(t) {
    var e = t && t.nodeName && t.nodeName.toLowerCase();
    return e === 'input' ? !!Ip[t.type] : e === 'textarea';
  }
  function nf(t, e, l, n) {
    (Cn ? (Mn ? Mn.push(n) : (Mn = [n])) : (Cn = n),
      (e = Ci(e, 'onChange')),
      0 < e.length &&
        ((l = new Uu('onChange', 'change', null, l, n)), t.push({ event: l, listeners: e })));
  }
  var Aa = null,
    Ca = null;
  function Fp(t) {
    qm(t, 0);
  }
  function Hu(t) {
    var e = ba(t);
    if (Lr(e)) return t;
  }
  function af(t, e) {
    if (t === 'change') return e;
  }
  var uf = !1;
  if (tl) {
    var jc;
    if (tl) {
      var Oc = 'oninput' in document;
      if (!Oc) {
        var cf = document.createElement('div');
        (cf.setAttribute('oninput', 'return;'), (Oc = typeof cf.oninput == 'function'));
      }
      jc = Oc;
    } else jc = !1;
    uf = jc && (!document.documentMode || 9 < document.documentMode);
  }
  function sf() {
    Aa && (Aa.detachEvent('onpropertychange', of), (Ca = Aa = null));
  }
  function of(t) {
    if (t.propertyName === 'value' && Hu(Ca)) {
      var e = [];
      (nf(e, Ca, t, xc(t)), Qr(Fp, e));
    }
  }
  function Pp(t, e, l) {
    t === 'focusin'
      ? (sf(), (Aa = e), (Ca = l), Aa.attachEvent('onpropertychange', of))
      : t === 'focusout' && sf();
  }
  function t0(t) {
    if (t === 'selectionchange' || t === 'keyup' || t === 'keydown') return Hu(Ca);
  }
  function e0(t, e) {
    if (t === 'click') return Hu(e);
  }
  function l0(t, e) {
    if (t === 'input' || t === 'change') return Hu(e);
  }
  function n0(t, e) {
    return (t === e && (t !== 0 || 1 / t === 1 / e)) || (t !== t && e !== e);
  }
  var _e = typeof Object.is == 'function' ? Object.is : n0;
  function Ma(t, e) {
    if (_e(t, e)) return !0;
    if (typeof t != 'object' || t === null || typeof e != 'object' || e === null) return !1;
    var l = Object.keys(t),
      n = Object.keys(e);
    if (l.length !== n.length) return !1;
    for (n = 0; n < l.length; n++) {
      var u = l[n];
      if (!oc.call(e, u) || !_e(t[u], e[u])) return !1;
    }
    return !0;
  }
  function rf(t) {
    for (; t && t.firstChild; ) t = t.firstChild;
    return t;
  }
  function ff(t, e) {
    var l = rf(t);
    t = 0;
    for (var n; l; ) {
      if (l.nodeType === 3) {
        if (((n = t + l.textContent.length), t <= e && n >= e)) return { node: l, offset: e - t };
        t = n;
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
      l = rf(l);
    }
  }
  function df(t, e) {
    return t && e
      ? t === e
        ? !0
        : t && t.nodeType === 3
          ? !1
          : e && e.nodeType === 3
            ? df(t, e.parentNode)
            : 'contains' in t
              ? t.contains(e)
              : t.compareDocumentPosition
                ? !!(t.compareDocumentPosition(e) & 16)
                : !1
      : !1;
  }
  function mf(t) {
    t =
      t != null && t.ownerDocument != null && t.ownerDocument.defaultView != null
        ? t.ownerDocument.defaultView
        : window;
    for (var e = Ou(t.document); e instanceof t.HTMLIFrameElement; ) {
      try {
        var l = typeof e.contentWindow.location.href == 'string';
      } catch {
        l = !1;
      }
      if (l) t = e.contentWindow;
      else break;
      e = Ou(t.document);
    }
    return e;
  }
  function Dc(t) {
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
  var a0 = tl && 'documentMode' in document && 11 >= document.documentMode,
    zn = null,
    kc = null,
    Ra = null,
    wc = !1;
  function hf(t, e, l) {
    var n = l.window === l ? l.document : l.nodeType === 9 ? l : l.ownerDocument;
    wc ||
      zn == null ||
      zn !== Ou(n) ||
      ((n = zn),
      'selectionStart' in n && Dc(n)
        ? (n = { start: n.selectionStart, end: n.selectionEnd })
        : ((n = ((n.ownerDocument && n.ownerDocument.defaultView) || window).getSelection()),
          (n = {
            anchorNode: n.anchorNode,
            anchorOffset: n.anchorOffset,
            focusNode: n.focusNode,
            focusOffset: n.focusOffset,
          })),
      (Ra && Ma(Ra, n)) ||
        ((Ra = n),
        (n = Ci(kc, 'onSelect')),
        0 < n.length &&
          ((e = new Uu('onSelect', 'select', null, e, l)),
          t.push({ event: e, listeners: n }),
          (e.target = zn))));
  }
  function tn(t, e) {
    var l = {};
    return (
      (l[t.toLowerCase()] = e.toLowerCase()),
      (l['Webkit' + t] = 'webkit' + e),
      (l['Moz' + t] = 'moz' + e),
      l
    );
  }
  var jn = {
      animationend: tn('Animation', 'AnimationEnd'),
      animationiteration: tn('Animation', 'AnimationIteration'),
      animationstart: tn('Animation', 'AnimationStart'),
      transitionrun: tn('Transition', 'TransitionRun'),
      transitionstart: tn('Transition', 'TransitionStart'),
      transitioncancel: tn('Transition', 'TransitionCancel'),
      transitionend: tn('Transition', 'TransitionEnd'),
    },
    Bc = {},
    yf = {};
  tl &&
    ((yf = document.createElement('div').style),
    'AnimationEvent' in window ||
      (delete jn.animationend.animation,
      delete jn.animationiteration.animation,
      delete jn.animationstart.animation),
    'TransitionEvent' in window || delete jn.transitionend.transition);
  function en(t) {
    if (Bc[t]) return Bc[t];
    if (!jn[t]) return t;
    var e = jn[t],
      l;
    for (l in e) if (e.hasOwnProperty(l) && l in yf) return (Bc[t] = e[l]);
    return t;
  }
  var pf = en('animationend'),
    gf = en('animationiteration'),
    vf = en('animationstart'),
    u0 = en('transitionrun'),
    i0 = en('transitionstart'),
    c0 = en('transitioncancel'),
    _f = en('transitionend'),
    bf = new Map(),
    Uc =
      'abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel'.split(
        ' '
      );
  Uc.push('scrollEnd');
  function He(t, e) {
    (bf.set(t, e), Fl(e, [t]));
  }
  var qu =
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
    ze = [],
    On = 0,
    Lc = 0;
  function Gu() {
    for (var t = On, e = (Lc = On = 0); e < t; ) {
      var l = ze[e];
      ze[e++] = null;
      var n = ze[e];
      ze[e++] = null;
      var u = ze[e];
      ze[e++] = null;
      var i = ze[e];
      if (((ze[e++] = null), n !== null && u !== null)) {
        var f = n.pending;
        (f === null ? (u.next = u) : ((u.next = f.next), (f.next = u)), (n.pending = u));
      }
      i !== 0 && Sf(l, u, i);
    }
  }
  function Yu(t, e, l, n) {
    ((ze[On++] = t),
      (ze[On++] = e),
      (ze[On++] = l),
      (ze[On++] = n),
      (Lc |= n),
      (t.lanes |= n),
      (t = t.alternate),
      t !== null && (t.lanes |= n));
  }
  function Hc(t, e, l, n) {
    return (Yu(t, e, l, n), Xu(t));
  }
  function ln(t, e) {
    return (Yu(t, null, null, e), Xu(t));
  }
  function Sf(t, e, l) {
    t.lanes |= l;
    var n = t.alternate;
    n !== null && (n.lanes |= l);
    for (var u = !1, i = t.return; i !== null; )
      ((i.childLanes |= l),
        (n = i.alternate),
        n !== null && (n.childLanes |= l),
        i.tag === 22 && ((t = i.stateNode), t === null || t._visibility & 1 || (u = !0)),
        (t = i),
        (i = i.return));
    return t.tag === 3
      ? ((i = t.stateNode),
        u &&
          e !== null &&
          ((u = 31 - ve(l)),
          (t = i.hiddenUpdates),
          (n = t[u]),
          n === null ? (t[u] = [e]) : n.push(e),
          (e.lane = l | 536870912)),
        i)
      : null;
  }
  function Xu(t) {
    if (50 < Ia) throw ((Ia = 0), ($s = null), Error(s(185)));
    for (var e = t.return; e !== null; ) ((t = e), (e = t.return));
    return t.tag === 3 ? t.stateNode : null;
  }
  var Dn = {};
  function s0(t, e, l, n) {
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
      (this.mode = n),
      (this.subtreeFlags = this.flags = 0),
      (this.deletions = null),
      (this.childLanes = this.lanes = 0),
      (this.alternate = null));
  }
  function be(t, e, l, n) {
    return new s0(t, e, l, n);
  }
  function qc(t) {
    return ((t = t.prototype), !(!t || !t.isReactComponent));
  }
  function el(t, e) {
    var l = t.alternate;
    return (
      l === null
        ? ((l = be(t.tag, e, t.key, t.mode)),
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
  function xf(t, e) {
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
  function Vu(t, e, l, n, u, i) {
    var f = 0;
    if (((n = t), typeof t == 'function')) qc(t) && (f = 1);
    else if (typeof t == 'string')
      f = mg(t, l, F.current) ? 26 : t === 'html' || t === 'head' || t === 'body' ? 27 : 5;
    else
      t: switch (t) {
        case tt:
          return ((t = be(31, l, e, u)), (t.elementType = tt), (t.lanes = i), t);
        case w:
          return nn(l.children, u, i, e);
        case L:
          ((f = 8), (u |= 24));
          break;
        case k:
          return ((t = be(12, l, e, u | 2)), (t.elementType = k), (t.lanes = i), t);
        case $:
          return ((t = be(13, l, e, u)), (t.elementType = $), (t.lanes = i), t);
        case J:
          return ((t = be(19, l, e, u)), (t.elementType = J), (t.lanes = i), t);
        default:
          if (typeof t == 'object' && t !== null)
            switch (t.$$typeof) {
              case O:
                f = 10;
                break t;
              case Q:
                f = 9;
                break t;
              case Y:
                f = 11;
                break t;
              case Z:
                f = 14;
                break t;
              case V:
                ((f = 16), (n = null));
                break t;
            }
          ((f = 29), (l = Error(s(130, t === null ? 'null' : typeof t, ''))), (n = null));
      }
    return ((e = be(f, l, e, u)), (e.elementType = t), (e.type = n), (e.lanes = i), e);
  }
  function nn(t, e, l, n) {
    return ((t = be(7, t, n, e)), (t.lanes = l), t);
  }
  function Gc(t, e, l) {
    return ((t = be(6, t, null, e)), (t.lanes = l), t);
  }
  function Ef(t) {
    var e = be(18, null, null, 0);
    return ((e.stateNode = t), e);
  }
  function Yc(t, e, l) {
    return (
      (e = be(4, t.children !== null ? t.children : [], t.key, e)),
      (e.lanes = l),
      (e.stateNode = {
        containerInfo: t.containerInfo,
        pendingChildren: null,
        implementation: t.implementation,
      }),
      e
    );
  }
  var Tf = new WeakMap();
  function je(t, e) {
    if (typeof t == 'object' && t !== null) {
      var l = Tf.get(t);
      return l !== void 0 ? l : ((e = { value: t, source: e, stack: xr(e) }), Tf.set(t, e), e);
    }
    return { value: t, source: e, stack: xr(e) };
  }
  var kn = [],
    wn = 0,
    Qu = null,
    za = 0,
    Oe = [],
    De = 0,
    Nl = null,
    Ze = 1,
    Ke = '';
  function ll(t, e) {
    ((kn[wn++] = za), (kn[wn++] = Qu), (Qu = t), (za = e));
  }
  function Nf(t, e, l) {
    ((Oe[De++] = Ze), (Oe[De++] = Ke), (Oe[De++] = Nl), (Nl = t));
    var n = Ze;
    t = Ke;
    var u = 32 - ve(n) - 1;
    ((n &= ~(1 << u)), (l += 1));
    var i = 32 - ve(e) + u;
    if (30 < i) {
      var f = u - (u % 5);
      ((i = (n & ((1 << f) - 1)).toString(32)),
        (n >>= f),
        (u -= f),
        (Ze = (1 << (32 - ve(e) + u)) | (l << u) | n),
        (Ke = i + t));
    } else ((Ze = (1 << i) | (l << u) | n), (Ke = t));
  }
  function Xc(t) {
    t.return !== null && (ll(t, 1), Nf(t, 1, 0));
  }
  function Vc(t) {
    for (; t === Qu; ) ((Qu = kn[--wn]), (kn[wn] = null), (za = kn[--wn]), (kn[wn] = null));
    for (; t === Nl; )
      ((Nl = Oe[--De]),
        (Oe[De] = null),
        (Ke = Oe[--De]),
        (Oe[De] = null),
        (Ze = Oe[--De]),
        (Oe[De] = null));
  }
  function Af(t, e) {
    ((Oe[De++] = Ze), (Oe[De++] = Ke), (Oe[De++] = Nl), (Ze = e.id), (Ke = e.overflow), (Nl = t));
  }
  var te = null,
    Dt = null,
    pt = !1,
    Al = null,
    ke = !1,
    Qc = Error(s(519));
  function Cl(t) {
    var e = Error(
      s(418, 1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? 'text' : 'HTML', '')
    );
    throw (ja(je(e, t)), Qc);
  }
  function Cf(t) {
    var e = t.stateNode,
      l = t.type,
      n = t.memoizedProps;
    switch (((e[Pt] = t), (e[oe] = n), l)) {
      case 'dialog':
        (mt('cancel', e), mt('close', e));
        break;
      case 'iframe':
      case 'object':
      case 'embed':
        mt('load', e);
        break;
      case 'video':
      case 'audio':
        for (l = 0; l < Pa.length; l++) mt(Pa[l], e);
        break;
      case 'source':
        mt('error', e);
        break;
      case 'img':
      case 'image':
      case 'link':
        (mt('error', e), mt('load', e));
        break;
      case 'details':
        mt('toggle', e);
        break;
      case 'input':
        (mt('invalid', e),
          Hr(e, n.value, n.defaultValue, n.checked, n.defaultChecked, n.type, n.name, !0));
        break;
      case 'select':
        mt('invalid', e);
        break;
      case 'textarea':
        (mt('invalid', e), Gr(e, n.value, n.defaultValue, n.children));
    }
    ((l = n.children),
      (typeof l != 'string' && typeof l != 'number' && typeof l != 'bigint') ||
      e.textContent === '' + l ||
      n.suppressHydrationWarning === !0 ||
      Vm(e.textContent, l)
        ? (n.popover != null && (mt('beforetoggle', e), mt('toggle', e)),
          n.onScroll != null && mt('scroll', e),
          n.onScrollEnd != null && mt('scrollend', e),
          n.onClick != null && (e.onclick = Pe),
          (e = !0))
        : (e = !1),
      e || Cl(t, !0));
  }
  function Mf(t) {
    for (te = t.return; te; )
      switch (te.tag) {
        case 5:
        case 31:
        case 13:
          ke = !1;
          return;
        case 27:
        case 3:
          ke = !0;
          return;
        default:
          te = te.return;
      }
  }
  function Bn(t) {
    if (t !== te) return !1;
    if (!pt) return (Mf(t), (pt = !0), !1);
    var e = t.tag,
      l;
    if (
      ((l = e !== 3 && e !== 27) &&
        ((l = e === 5) &&
          ((l = t.type), (l = !(l !== 'form' && l !== 'button') || oo(t.type, t.memoizedProps))),
        (l = !l)),
      l && Dt && Cl(t),
      Mf(t),
      e === 13)
    ) {
      if (((t = t.memoizedState), (t = t !== null ? t.dehydrated : null), !t)) throw Error(s(317));
      Dt = Pm(t);
    } else if (e === 31) {
      if (((t = t.memoizedState), (t = t !== null ? t.dehydrated : null), !t)) throw Error(s(317));
      Dt = Pm(t);
    } else
      e === 27
        ? ((e = Dt), Gl(t.type) ? ((t = yo), (yo = null), (Dt = t)) : (Dt = e))
        : (Dt = te ? Be(t.stateNode.nextSibling) : null);
    return !0;
  }
  function an() {
    ((Dt = te = null), (pt = !1));
  }
  function Zc() {
    var t = Al;
    return (t !== null && (he === null ? (he = t) : he.push.apply(he, t), (Al = null)), t);
  }
  function ja(t) {
    Al === null ? (Al = [t]) : Al.push(t);
  }
  var Kc = S(null),
    un = null,
    nl = null;
  function Ml(t, e, l) {
    (W(Kc, e._currentValue), (e._currentValue = l));
  }
  function al(t) {
    ((t._currentValue = Kc.current), q(Kc));
  }
  function $c(t, e, l) {
    for (; t !== null; ) {
      var n = t.alternate;
      if (
        ((t.childLanes & e) !== e
          ? ((t.childLanes |= e), n !== null && (n.childLanes |= e))
          : n !== null && (n.childLanes & e) !== e && (n.childLanes |= e),
        t === l)
      )
        break;
      t = t.return;
    }
  }
  function Jc(t, e, l, n) {
    var u = t.child;
    for (u !== null && (u.return = t); u !== null; ) {
      var i = u.dependencies;
      if (i !== null) {
        var f = u.child;
        i = i.firstContext;
        t: for (; i !== null; ) {
          var y = i;
          i = u;
          for (var _ = 0; _ < e.length; _++)
            if (y.context === e[_]) {
              ((i.lanes |= l),
                (y = i.alternate),
                y !== null && (y.lanes |= l),
                $c(i.return, l, t),
                n || (f = null));
              break t;
            }
          i = y.next;
        }
      } else if (u.tag === 18) {
        if (((f = u.return), f === null)) throw Error(s(341));
        ((f.lanes |= l), (i = f.alternate), i !== null && (i.lanes |= l), $c(f, l, t), (f = null));
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
  function Un(t, e, l, n) {
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
          var y = u.type;
          _e(u.pendingProps.value, f.value) || (t !== null ? t.push(y) : (t = [y]));
        }
      } else if (u === Tt.current) {
        if (((f = u.alternate), f === null)) throw Error(s(387));
        f.memoizedState.memoizedState !== u.memoizedState.memoizedState &&
          (t !== null ? t.push(au) : (t = [au]));
      }
      u = u.return;
    }
    (t !== null && Jc(e, t, l, n), (e.flags |= 262144));
  }
  function Zu(t) {
    for (t = t.firstContext; t !== null; ) {
      if (!_e(t.context._currentValue, t.memoizedValue)) return !0;
      t = t.next;
    }
    return !1;
  }
  function cn(t) {
    ((un = t), (nl = null), (t = t.dependencies), t !== null && (t.firstContext = null));
  }
  function ee(t) {
    return Rf(un, t);
  }
  function Ku(t, e) {
    return (un === null && cn(t), Rf(t, e));
  }
  function Rf(t, e) {
    var l = e._currentValue;
    if (((e = { context: e, memoizedValue: l, next: null }), nl === null)) {
      if (t === null) throw Error(s(308));
      ((nl = e), (t.dependencies = { lanes: 0, firstContext: e }), (t.flags |= 524288));
    } else nl = nl.next = e;
    return l;
  }
  var o0 =
      typeof AbortController < 'u'
        ? AbortController
        : function () {
            var t = [],
              e = (this.signal = {
                aborted: !1,
                addEventListener: function (l, n) {
                  t.push(n);
                },
              });
            this.abort = function () {
              ((e.aborted = !0),
                t.forEach(function (l) {
                  return l();
                }));
            };
          },
    r0 = a.unstable_scheduleCallback,
    f0 = a.unstable_NormalPriority,
    Qt = {
      $$typeof: O,
      Consumer: null,
      Provider: null,
      _currentValue: null,
      _currentValue2: null,
      _threadCount: 0,
    };
  function Wc() {
    return { controller: new o0(), data: new Map(), refCount: 0 };
  }
  function Oa(t) {
    (t.refCount--,
      t.refCount === 0 &&
        r0(f0, function () {
          t.controller.abort();
        }));
  }
  var Da = null,
    Ic = 0,
    Ln = 0,
    Hn = null;
  function d0(t, e) {
    if (Da === null) {
      var l = (Da = []);
      ((Ic = 0),
        (Ln = to()),
        (Hn = {
          status: 'pending',
          value: void 0,
          then: function (n) {
            l.push(n);
          },
        }));
    }
    return (Ic++, e.then(zf, zf), e);
  }
  function zf() {
    if (--Ic === 0 && Da !== null) {
      Hn !== null && (Hn.status = 'fulfilled');
      var t = Da;
      ((Da = null), (Ln = 0), (Hn = null));
      for (var e = 0; e < t.length; e++) (0, t[e])();
    }
  }
  function m0(t, e) {
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
      t.then(
        function () {
          ((n.status = 'fulfilled'), (n.value = e));
          for (var u = 0; u < l.length; u++) (0, l[u])(e);
        },
        function (u) {
          for (n.status = 'rejected', n.reason = u, u = 0; u < l.length; u++) (0, l[u])(void 0);
        }
      ),
      n
    );
  }
  var jf = U.S;
  U.S = function (t, e) {
    ((hm = pe()),
      typeof e == 'object' && e !== null && typeof e.then == 'function' && d0(t, e),
      jf !== null && jf(t, e));
  };
  var sn = S(null);
  function Fc() {
    var t = sn.current;
    return t !== null ? t : Ot.pooledCache;
  }
  function $u(t, e) {
    e === null ? W(sn, sn.current) : W(sn, e.pool);
  }
  function Of() {
    var t = Fc();
    return t === null ? null : { parent: Qt._currentValue, pool: t };
  }
  var qn = Error(s(460)),
    Pc = Error(s(474)),
    Ju = Error(s(542)),
    Wu = { then: function () {} };
  function Df(t) {
    return ((t = t.status), t === 'fulfilled' || t === 'rejected');
  }
  function kf(t, e, l) {
    switch (
      ((l = t[l]), l === void 0 ? t.push(e) : l !== e && (e.then(Pe, Pe), (e = l)), e.status)
    ) {
      case 'fulfilled':
        return e.value;
      case 'rejected':
        throw ((t = e.reason), Bf(t), t);
      default:
        if (typeof e.status == 'string') e.then(Pe, Pe);
        else {
          if (((t = Ot), t !== null && 100 < t.shellSuspendCounter)) throw Error(s(482));
          ((t = e),
            (t.status = 'pending'),
            t.then(
              function (n) {
                if (e.status === 'pending') {
                  var u = e;
                  ((u.status = 'fulfilled'), (u.value = n));
                }
              },
              function (n) {
                if (e.status === 'pending') {
                  var u = e;
                  ((u.status = 'rejected'), (u.reason = n));
                }
              }
            ));
        }
        switch (e.status) {
          case 'fulfilled':
            return e.value;
          case 'rejected':
            throw ((t = e.reason), Bf(t), t);
        }
        throw ((rn = e), qn);
    }
  }
  function on(t) {
    try {
      var e = t._init;
      return e(t._payload);
    } catch (l) {
      throw l !== null && typeof l == 'object' && typeof l.then == 'function' ? ((rn = l), qn) : l;
    }
  }
  var rn = null;
  function wf() {
    if (rn === null) throw Error(s(459));
    var t = rn;
    return ((rn = null), t);
  }
  function Bf(t) {
    if (t === qn || t === Ju) throw Error(s(483));
  }
  var Gn = null,
    ka = 0;
  function Iu(t) {
    var e = ka;
    return ((ka += 1), Gn === null && (Gn = []), kf(Gn, t, e));
  }
  function wa(t, e) {
    ((e = e.props.ref), (t.ref = e !== void 0 ? e : null));
  }
  function Fu(t, e) {
    throw e.$$typeof === N
      ? Error(s(525))
      : ((t = Object.prototype.toString.call(e)),
        Error(
          s(
            31,
            t === '[object Object]' ? 'object with keys {' + Object.keys(e).join(', ') + '}' : t
          )
        ));
  }
  function Uf(t) {
    function e(A, x) {
      if (t) {
        var C = A.deletions;
        C === null ? ((A.deletions = [x]), (A.flags |= 16)) : C.push(x);
      }
    }
    function l(A, x) {
      if (!t) return null;
      for (; x !== null; ) (e(A, x), (x = x.sibling));
      return null;
    }
    function n(A) {
      for (var x = new Map(); A !== null; )
        (A.key !== null ? x.set(A.key, A) : x.set(A.index, A), (A = A.sibling));
      return x;
    }
    function u(A, x) {
      return ((A = el(A, x)), (A.index = 0), (A.sibling = null), A);
    }
    function i(A, x, C) {
      return (
        (A.index = C),
        t
          ? ((C = A.alternate),
            C !== null
              ? ((C = C.index), C < x ? ((A.flags |= 67108866), x) : C)
              : ((A.flags |= 67108866), x))
          : ((A.flags |= 1048576), x)
      );
    }
    function f(A) {
      return (t && A.alternate === null && (A.flags |= 67108866), A);
    }
    function y(A, x, C, H) {
      return x === null || x.tag !== 6
        ? ((x = Gc(C, A.mode, H)), (x.return = A), x)
        : ((x = u(x, C)), (x.return = A), x);
    }
    function _(A, x, C, H) {
      var et = C.type;
      return et === w
        ? B(A, x, C.props.children, H, C.key)
        : x !== null &&
            (x.elementType === et ||
              (typeof et == 'object' && et !== null && et.$$typeof === V && on(et) === x.type))
          ? ((x = u(x, C.props)), wa(x, C), (x.return = A), x)
          : ((x = Vu(C.type, C.key, C.props, null, A.mode, H)), wa(x, C), (x.return = A), x);
    }
    function M(A, x, C, H) {
      return x === null ||
        x.tag !== 4 ||
        x.stateNode.containerInfo !== C.containerInfo ||
        x.stateNode.implementation !== C.implementation
        ? ((x = Yc(C, A.mode, H)), (x.return = A), x)
        : ((x = u(x, C.children || [])), (x.return = A), x);
    }
    function B(A, x, C, H, et) {
      return x === null || x.tag !== 7
        ? ((x = nn(C, A.mode, H, et)), (x.return = A), x)
        : ((x = u(x, C)), (x.return = A), x);
    }
    function G(A, x, C) {
      if ((typeof x == 'string' && x !== '') || typeof x == 'number' || typeof x == 'bigint')
        return ((x = Gc('' + x, A.mode, C)), (x.return = A), x);
      if (typeof x == 'object' && x !== null) {
        switch (x.$$typeof) {
          case X:
            return ((C = Vu(x.type, x.key, x.props, null, A.mode, C)), wa(C, x), (C.return = A), C);
          case D:
            return ((x = Yc(x, A.mode, C)), (x.return = A), x);
          case V:
            return ((x = on(x)), G(A, x, C));
        }
        if (Ut(x) || Et(x)) return ((x = nn(x, A.mode, C, null)), (x.return = A), x);
        if (typeof x.then == 'function') return G(A, Iu(x), C);
        if (x.$$typeof === O) return G(A, Ku(A, x), C);
        Fu(A, x);
      }
      return null;
    }
    function z(A, x, C, H) {
      var et = x !== null ? x.key : null;
      if ((typeof C == 'string' && C !== '') || typeof C == 'number' || typeof C == 'bigint')
        return et !== null ? null : y(A, x, '' + C, H);
      if (typeof C == 'object' && C !== null) {
        switch (C.$$typeof) {
          case X:
            return C.key === et ? _(A, x, C, H) : null;
          case D:
            return C.key === et ? M(A, x, C, H) : null;
          case V:
            return ((C = on(C)), z(A, x, C, H));
        }
        if (Ut(C) || Et(C)) return et !== null ? null : B(A, x, C, H, null);
        if (typeof C.then == 'function') return z(A, x, Iu(C), H);
        if (C.$$typeof === O) return z(A, x, Ku(A, C), H);
        Fu(A, C);
      }
      return null;
    }
    function j(A, x, C, H, et) {
      if ((typeof H == 'string' && H !== '') || typeof H == 'number' || typeof H == 'bigint')
        return ((A = A.get(C) || null), y(x, A, '' + H, et));
      if (typeof H == 'object' && H !== null) {
        switch (H.$$typeof) {
          case X:
            return ((A = A.get(H.key === null ? C : H.key) || null), _(x, A, H, et));
          case D:
            return ((A = A.get(H.key === null ? C : H.key) || null), M(x, A, H, et));
          case V:
            return ((H = on(H)), j(A, x, C, H, et));
        }
        if (Ut(H) || Et(H)) return ((A = A.get(C) || null), B(x, A, H, et, null));
        if (typeof H.then == 'function') return j(A, x, C, Iu(H), et);
        if (H.$$typeof === O) return j(A, x, C, Ku(x, H), et);
        Fu(x, H);
      }
      return null;
    }
    function I(A, x, C, H) {
      for (
        var et = null, bt = null, P = x, rt = (x = 0), yt = null;
        P !== null && rt < C.length;
        rt++
      ) {
        P.index > rt ? ((yt = P), (P = null)) : (yt = P.sibling);
        var St = z(A, P, C[rt], H);
        if (St === null) {
          P === null && (P = yt);
          break;
        }
        (t && P && St.alternate === null && e(A, P),
          (x = i(St, x, rt)),
          bt === null ? (et = St) : (bt.sibling = St),
          (bt = St),
          (P = yt));
      }
      if (rt === C.length) return (l(A, P), pt && ll(A, rt), et);
      if (P === null) {
        for (; rt < C.length; rt++)
          ((P = G(A, C[rt], H)),
            P !== null && ((x = i(P, x, rt)), bt === null ? (et = P) : (bt.sibling = P), (bt = P)));
        return (pt && ll(A, rt), et);
      }
      for (P = n(P); rt < C.length; rt++)
        ((yt = j(P, A, rt, C[rt], H)),
          yt !== null &&
            (t && yt.alternate !== null && P.delete(yt.key === null ? rt : yt.key),
            (x = i(yt, x, rt)),
            bt === null ? (et = yt) : (bt.sibling = yt),
            (bt = yt)));
      return (
        t &&
          P.forEach(function (Zl) {
            return e(A, Zl);
          }),
        pt && ll(A, rt),
        et
      );
    }
    function lt(A, x, C, H) {
      if (C == null) throw Error(s(151));
      for (
        var et = null, bt = null, P = x, rt = (x = 0), yt = null, St = C.next();
        P !== null && !St.done;
        rt++, St = C.next()
      ) {
        P.index > rt ? ((yt = P), (P = null)) : (yt = P.sibling);
        var Zl = z(A, P, St.value, H);
        if (Zl === null) {
          P === null && (P = yt);
          break;
        }
        (t && P && Zl.alternate === null && e(A, P),
          (x = i(Zl, x, rt)),
          bt === null ? (et = Zl) : (bt.sibling = Zl),
          (bt = Zl),
          (P = yt));
      }
      if (St.done) return (l(A, P), pt && ll(A, rt), et);
      if (P === null) {
        for (; !St.done; rt++, St = C.next())
          ((St = G(A, St.value, H)),
            St !== null &&
              ((x = i(St, x, rt)), bt === null ? (et = St) : (bt.sibling = St), (bt = St)));
        return (pt && ll(A, rt), et);
      }
      for (P = n(P); !St.done; rt++, St = C.next())
        ((St = j(P, A, rt, St.value, H)),
          St !== null &&
            (t && St.alternate !== null && P.delete(St.key === null ? rt : St.key),
            (x = i(St, x, rt)),
            bt === null ? (et = St) : (bt.sibling = St),
            (bt = St)));
      return (
        t &&
          P.forEach(function (Tg) {
            return e(A, Tg);
          }),
        pt && ll(A, rt),
        et
      );
    }
    function jt(A, x, C, H) {
      if (
        (typeof C == 'object' &&
          C !== null &&
          C.type === w &&
          C.key === null &&
          (C = C.props.children),
        typeof C == 'object' && C !== null)
      ) {
        switch (C.$$typeof) {
          case X:
            t: {
              for (var et = C.key; x !== null; ) {
                if (x.key === et) {
                  if (((et = C.type), et === w)) {
                    if (x.tag === 7) {
                      (l(A, x.sibling), (H = u(x, C.props.children)), (H.return = A), (A = H));
                      break t;
                    }
                  } else if (
                    x.elementType === et ||
                    (typeof et == 'object' && et !== null && et.$$typeof === V && on(et) === x.type)
                  ) {
                    (l(A, x.sibling), (H = u(x, C.props)), wa(H, C), (H.return = A), (A = H));
                    break t;
                  }
                  l(A, x);
                  break;
                } else e(A, x);
                x = x.sibling;
              }
              C.type === w
                ? ((H = nn(C.props.children, A.mode, H, C.key)), (H.return = A), (A = H))
                : ((H = Vu(C.type, C.key, C.props, null, A.mode, H)),
                  wa(H, C),
                  (H.return = A),
                  (A = H));
            }
            return f(A);
          case D:
            t: {
              for (et = C.key; x !== null; ) {
                if (x.key === et)
                  if (
                    x.tag === 4 &&
                    x.stateNode.containerInfo === C.containerInfo &&
                    x.stateNode.implementation === C.implementation
                  ) {
                    (l(A, x.sibling), (H = u(x, C.children || [])), (H.return = A), (A = H));
                    break t;
                  } else {
                    l(A, x);
                    break;
                  }
                else e(A, x);
                x = x.sibling;
              }
              ((H = Yc(C, A.mode, H)), (H.return = A), (A = H));
            }
            return f(A);
          case V:
            return ((C = on(C)), jt(A, x, C, H));
        }
        if (Ut(C)) return I(A, x, C, H);
        if (Et(C)) {
          if (((et = Et(C)), typeof et != 'function')) throw Error(s(150));
          return ((C = et.call(C)), lt(A, x, C, H));
        }
        if (typeof C.then == 'function') return jt(A, x, Iu(C), H);
        if (C.$$typeof === O) return jt(A, x, Ku(A, C), H);
        Fu(A, C);
      }
      return (typeof C == 'string' && C !== '') || typeof C == 'number' || typeof C == 'bigint'
        ? ((C = '' + C),
          x !== null && x.tag === 6
            ? (l(A, x.sibling), (H = u(x, C)), (H.return = A), (A = H))
            : (l(A, x), (H = Gc(C, A.mode, H)), (H.return = A), (A = H)),
          f(A))
        : l(A, x);
    }
    return function (A, x, C, H) {
      try {
        ka = 0;
        var et = jt(A, x, C, H);
        return ((Gn = null), et);
      } catch (P) {
        if (P === qn || P === Ju) throw P;
        var bt = be(29, P, null, A.mode);
        return ((bt.lanes = H), (bt.return = A), bt);
      } finally {
      }
    };
  }
  var fn = Uf(!0),
    Lf = Uf(!1),
    Rl = !1;
  function ts(t) {
    t.updateQueue = {
      baseState: t.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null,
    };
  }
  function es(t, e) {
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
  function zl(t) {
    return { lane: t, tag: 0, payload: null, callback: null, next: null };
  }
  function jl(t, e, l) {
    var n = t.updateQueue;
    if (n === null) return null;
    if (((n = n.shared), (xt & 2) !== 0)) {
      var u = n.pending;
      return (
        u === null ? (e.next = e) : ((e.next = u.next), (u.next = e)),
        (n.pending = e),
        (e = Xu(t)),
        Sf(t, null, l),
        e
      );
    }
    return (Yu(t, n, e, l), Xu(t));
  }
  function Ba(t, e, l) {
    if (((e = e.updateQueue), e !== null && ((e = e.shared), (l & 4194048) !== 0))) {
      var n = e.lanes;
      ((n &= t.pendingLanes), (l |= n), (e.lanes = l), Mr(t, l));
    }
  }
  function ls(t, e) {
    var l = t.updateQueue,
      n = t.alternate;
    if (n !== null && ((n = n.updateQueue), l === n)) {
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
        baseState: n.baseState,
        firstBaseUpdate: u,
        lastBaseUpdate: i,
        shared: n.shared,
        callbacks: n.callbacks,
      }),
        (t.updateQueue = l));
      return;
    }
    ((t = l.lastBaseUpdate),
      t === null ? (l.firstBaseUpdate = e) : (t.next = e),
      (l.lastBaseUpdate = e));
  }
  var ns = !1;
  function Ua() {
    if (ns) {
      var t = Hn;
      if (t !== null) throw t;
    }
  }
  function La(t, e, l, n) {
    ns = !1;
    var u = t.updateQueue;
    Rl = !1;
    var i = u.firstBaseUpdate,
      f = u.lastBaseUpdate,
      y = u.shared.pending;
    if (y !== null) {
      u.shared.pending = null;
      var _ = y,
        M = _.next;
      ((_.next = null), f === null ? (i = M) : (f.next = M), (f = _));
      var B = t.alternate;
      B !== null &&
        ((B = B.updateQueue),
        (y = B.lastBaseUpdate),
        y !== f && (y === null ? (B.firstBaseUpdate = M) : (y.next = M), (B.lastBaseUpdate = _)));
    }
    if (i !== null) {
      var G = u.baseState;
      ((f = 0), (B = M = _ = null), (y = i));
      do {
        var z = y.lane & -536870913,
          j = z !== y.lane;
        if (j ? (ht & z) === z : (n & z) === z) {
          (z !== 0 && z === Ln && (ns = !0),
            B !== null &&
              (B = B.next =
                { lane: 0, tag: y.tag, payload: y.payload, callback: null, next: null }));
          t: {
            var I = t,
              lt = y;
            z = e;
            var jt = l;
            switch (lt.tag) {
              case 1:
                if (((I = lt.payload), typeof I == 'function')) {
                  G = I.call(jt, G, z);
                  break t;
                }
                G = I;
                break t;
              case 3:
                I.flags = (I.flags & -65537) | 128;
              case 0:
                if (
                  ((I = lt.payload), (z = typeof I == 'function' ? I.call(jt, G, z) : I), z == null)
                )
                  break t;
                G = b({}, G, z);
                break t;
              case 2:
                Rl = !0;
            }
          }
          ((z = y.callback),
            z !== null &&
              ((t.flags |= 64),
              j && (t.flags |= 8192),
              (j = u.callbacks),
              j === null ? (u.callbacks = [z]) : j.push(z)));
        } else
          ((j = { lane: z, tag: y.tag, payload: y.payload, callback: y.callback, next: null }),
            B === null ? ((M = B = j), (_ = G)) : (B = B.next = j),
            (f |= z));
        if (((y = y.next), y === null)) {
          if (((y = u.shared.pending), y === null)) break;
          ((j = y),
            (y = j.next),
            (j.next = null),
            (u.lastBaseUpdate = j),
            (u.shared.pending = null));
        }
      } while (!0);
      (B === null && (_ = G),
        (u.baseState = _),
        (u.firstBaseUpdate = M),
        (u.lastBaseUpdate = B),
        i === null && (u.shared.lanes = 0),
        (Bl |= f),
        (t.lanes = f),
        (t.memoizedState = G));
    }
  }
  function Hf(t, e) {
    if (typeof t != 'function') throw Error(s(191, t));
    t.call(e);
  }
  function qf(t, e) {
    var l = t.callbacks;
    if (l !== null) for (t.callbacks = null, t = 0; t < l.length; t++) Hf(l[t], e);
  }
  var Yn = S(null),
    Pu = S(0);
  function Gf(t, e) {
    ((t = ml), W(Pu, t), W(Yn, e), (ml = t | e.baseLanes));
  }
  function as() {
    (W(Pu, ml), W(Yn, Yn.current));
  }
  function us() {
    ((ml = Pu.current), q(Yn), q(Pu));
  }
  var Se = S(null),
    we = null;
  function Ol(t) {
    var e = t.alternate;
    (W(Xt, Xt.current & 1),
      W(Se, t),
      we === null && (e === null || Yn.current !== null || e.memoizedState !== null) && (we = t));
  }
  function is(t) {
    (W(Xt, Xt.current), W(Se, t), we === null && (we = t));
  }
  function Yf(t) {
    t.tag === 22 ? (W(Xt, Xt.current), W(Se, t), we === null && (we = t)) : Dl();
  }
  function Dl() {
    (W(Xt, Xt.current), W(Se, Se.current));
  }
  function xe(t) {
    (q(Se), we === t && (we = null), q(Xt));
  }
  var Xt = S(0);
  function ti(t) {
    for (var e = t; e !== null; ) {
      if (e.tag === 13) {
        var l = e.memoizedState;
        if (l !== null && ((l = l.dehydrated), l === null || mo(l) || ho(l))) return e;
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
  var ul = 0,
    st = null,
    Rt = null,
    Zt = null,
    ei = !1,
    Xn = !1,
    dn = !1,
    li = 0,
    Ha = 0,
    Vn = null,
    h0 = 0;
  function qt() {
    throw Error(s(321));
  }
  function cs(t, e) {
    if (e === null) return !1;
    for (var l = 0; l < e.length && l < t.length; l++) if (!_e(t[l], e[l])) return !1;
    return !0;
  }
  function ss(t, e, l, n, u, i) {
    return (
      (ul = i),
      (st = e),
      (e.memoizedState = null),
      (e.updateQueue = null),
      (e.lanes = 0),
      (U.H = t === null || t.memoizedState === null ? Nd : Es),
      (dn = !1),
      (i = l(n, u)),
      (dn = !1),
      Xn && (i = Vf(e, l, n, u)),
      Xf(t),
      i
    );
  }
  function Xf(t) {
    U.H = Ya;
    var e = Rt !== null && Rt.next !== null;
    if (((ul = 0), (Zt = Rt = st = null), (ei = !1), (Ha = 0), (Vn = null), e)) throw Error(s(300));
    t === null || Kt || ((t = t.dependencies), t !== null && Zu(t) && (Kt = !0));
  }
  function Vf(t, e, l, n) {
    st = t;
    var u = 0;
    do {
      if ((Xn && (Vn = null), (Ha = 0), (Xn = !1), 25 <= u)) throw Error(s(301));
      if (((u += 1), (Zt = Rt = null), t.updateQueue != null)) {
        var i = t.updateQueue;
        ((i.lastEffect = null),
          (i.events = null),
          (i.stores = null),
          i.memoCache != null && (i.memoCache.index = 0));
      }
      ((U.H = Ad), (i = e(l, n)));
    } while (Xn);
    return i;
  }
  function y0() {
    var t = U.H,
      e = t.useState()[0];
    return (
      (e = typeof e.then == 'function' ? qa(e) : e),
      (t = t.useState()[0]),
      (Rt !== null ? Rt.memoizedState : null) !== t && (st.flags |= 1024),
      e
    );
  }
  function os() {
    var t = li !== 0;
    return ((li = 0), t);
  }
  function rs(t, e, l) {
    ((e.updateQueue = t.updateQueue), (e.flags &= -2053), (t.lanes &= ~l));
  }
  function fs(t) {
    if (ei) {
      for (t = t.memoizedState; t !== null; ) {
        var e = t.queue;
        (e !== null && (e.pending = null), (t = t.next));
      }
      ei = !1;
    }
    ((ul = 0), (Zt = Rt = st = null), (Xn = !1), (Ha = li = 0), (Vn = null));
  }
  function ce() {
    var t = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
    return (Zt === null ? (st.memoizedState = Zt = t) : (Zt = Zt.next = t), Zt);
  }
  function Vt() {
    if (Rt === null) {
      var t = st.alternate;
      t = t !== null ? t.memoizedState : null;
    } else t = Rt.next;
    var e = Zt === null ? st.memoizedState : Zt.next;
    if (e !== null) ((Zt = e), (Rt = t));
    else {
      if (t === null) throw st.alternate === null ? Error(s(467)) : Error(s(310));
      ((Rt = t),
        (t = {
          memoizedState: Rt.memoizedState,
          baseState: Rt.baseState,
          baseQueue: Rt.baseQueue,
          queue: Rt.queue,
          next: null,
        }),
        Zt === null ? (st.memoizedState = Zt = t) : (Zt = Zt.next = t));
    }
    return Zt;
  }
  function ni() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function qa(t) {
    var e = Ha;
    return (
      (Ha += 1),
      Vn === null && (Vn = []),
      (t = kf(Vn, t, e)),
      (e = st),
      (Zt === null ? e.memoizedState : Zt.next) === null &&
        ((e = e.alternate), (U.H = e === null || e.memoizedState === null ? Nd : Es)),
      t
    );
  }
  function ai(t) {
    if (t !== null && typeof t == 'object') {
      if (typeof t.then == 'function') return qa(t);
      if (t.$$typeof === O) return ee(t);
    }
    throw Error(s(438, String(t)));
  }
  function ds(t) {
    var e = null,
      l = st.updateQueue;
    if ((l !== null && (e = l.memoCache), e == null)) {
      var n = st.alternate;
      n !== null &&
        ((n = n.updateQueue),
        n !== null &&
          ((n = n.memoCache),
          n != null &&
            (e = {
              data: n.data.map(function (u) {
                return u.slice();
              }),
              index: 0,
            })));
    }
    if (
      (e == null && (e = { data: [], index: 0 }),
      l === null && ((l = ni()), (st.updateQueue = l)),
      (l.memoCache = e),
      (l = e.data[e.index]),
      l === void 0)
    )
      for (l = e.data[e.index] = Array(t), n = 0; n < t; n++) l[n] = at;
    return (e.index++, l);
  }
  function il(t, e) {
    return typeof e == 'function' ? e(t) : e;
  }
  function ui(t) {
    var e = Vt();
    return ms(e, Rt, t);
  }
  function ms(t, e, l) {
    var n = t.queue;
    if (n === null) throw Error(s(311));
    n.lastRenderedReducer = l;
    var u = t.baseQueue,
      i = n.pending;
    if (i !== null) {
      if (u !== null) {
        var f = u.next;
        ((u.next = i.next), (i.next = f));
      }
      ((e.baseQueue = u = i), (n.pending = null));
    }
    if (((i = t.baseState), u === null)) t.memoizedState = i;
    else {
      e = u.next;
      var y = (f = null),
        _ = null,
        M = e,
        B = !1;
      do {
        var G = M.lane & -536870913;
        if (G !== M.lane ? (ht & G) === G : (ul & G) === G) {
          var z = M.revertLane;
          if (z === 0)
            (_ !== null &&
              (_ = _.next =
                {
                  lane: 0,
                  revertLane: 0,
                  gesture: null,
                  action: M.action,
                  hasEagerState: M.hasEagerState,
                  eagerState: M.eagerState,
                  next: null,
                }),
              G === Ln && (B = !0));
          else if ((ul & z) === z) {
            ((M = M.next), z === Ln && (B = !0));
            continue;
          } else
            ((G = {
              lane: 0,
              revertLane: M.revertLane,
              gesture: null,
              action: M.action,
              hasEagerState: M.hasEagerState,
              eagerState: M.eagerState,
              next: null,
            }),
              _ === null ? ((y = _ = G), (f = i)) : (_ = _.next = G),
              (st.lanes |= z),
              (Bl |= z));
          ((G = M.action), dn && l(i, G), (i = M.hasEagerState ? M.eagerState : l(i, G)));
        } else
          ((z = {
            lane: G,
            revertLane: M.revertLane,
            gesture: M.gesture,
            action: M.action,
            hasEagerState: M.hasEagerState,
            eagerState: M.eagerState,
            next: null,
          }),
            _ === null ? ((y = _ = z), (f = i)) : (_ = _.next = z),
            (st.lanes |= G),
            (Bl |= G));
        M = M.next;
      } while (M !== null && M !== e);
      if (
        (_ === null ? (f = i) : (_.next = y),
        !_e(i, t.memoizedState) && ((Kt = !0), B && ((l = Hn), l !== null)))
      )
        throw l;
      ((t.memoizedState = i), (t.baseState = f), (t.baseQueue = _), (n.lastRenderedState = i));
    }
    return (u === null && (n.lanes = 0), [t.memoizedState, n.dispatch]);
  }
  function hs(t) {
    var e = Vt(),
      l = e.queue;
    if (l === null) throw Error(s(311));
    l.lastRenderedReducer = t;
    var n = l.dispatch,
      u = l.pending,
      i = e.memoizedState;
    if (u !== null) {
      l.pending = null;
      var f = (u = u.next);
      do ((i = t(i, f.action)), (f = f.next));
      while (f !== u);
      (_e(i, e.memoizedState) || (Kt = !0),
        (e.memoizedState = i),
        e.baseQueue === null && (e.baseState = i),
        (l.lastRenderedState = i));
    }
    return [i, n];
  }
  function Qf(t, e, l) {
    var n = st,
      u = Vt(),
      i = pt;
    if (i) {
      if (l === void 0) throw Error(s(407));
      l = l();
    } else l = e();
    var f = !_e((Rt || u).memoizedState, l);
    if (
      (f && ((u.memoizedState = l), (Kt = !0)),
      (u = u.queue),
      gs($f.bind(null, n, u, t), [t]),
      u.getSnapshot !== e || f || (Zt !== null && Zt.memoizedState.tag & 1))
    ) {
      if (
        ((n.flags |= 2048),
        Qn(9, { destroy: void 0 }, Kf.bind(null, n, u, l, e), null),
        Ot === null)
      )
        throw Error(s(349));
      i || (ul & 127) !== 0 || Zf(n, e, l);
    }
    return l;
  }
  function Zf(t, e, l) {
    ((t.flags |= 16384),
      (t = { getSnapshot: e, value: l }),
      (e = st.updateQueue),
      e === null
        ? ((e = ni()), (st.updateQueue = e), (e.stores = [t]))
        : ((l = e.stores), l === null ? (e.stores = [t]) : l.push(t)));
  }
  function Kf(t, e, l, n) {
    ((e.value = l), (e.getSnapshot = n), Jf(e) && Wf(t));
  }
  function $f(t, e, l) {
    return l(function () {
      Jf(e) && Wf(t);
    });
  }
  function Jf(t) {
    var e = t.getSnapshot;
    t = t.value;
    try {
      var l = e();
      return !_e(t, l);
    } catch {
      return !0;
    }
  }
  function Wf(t) {
    var e = ln(t, 2);
    e !== null && ye(e, t, 2);
  }
  function ys(t) {
    var e = ce();
    if (typeof t == 'function') {
      var l = t;
      if (((t = l()), dn)) {
        xl(!0);
        try {
          l();
        } finally {
          xl(!1);
        }
      }
    }
    return (
      (e.memoizedState = e.baseState = t),
      (e.queue = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: il,
        lastRenderedState: t,
      }),
      e
    );
  }
  function If(t, e, l, n) {
    return ((t.baseState = l), ms(t, Rt, typeof n == 'function' ? n : il));
  }
  function p0(t, e, l, n, u) {
    if (si(t)) throw Error(s(485));
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
        n(i),
        (l = e.pending),
        l === null
          ? ((i.next = e.pending = i), Ff(e, i))
          : ((i.next = l.next), (e.pending = l.next = i)));
    }
  }
  function Ff(t, e) {
    var l = e.action,
      n = e.payload,
      u = t.state;
    if (e.isTransition) {
      var i = U.T,
        f = {};
      U.T = f;
      try {
        var y = l(u, n),
          _ = U.S;
        (_ !== null && _(f, y), Pf(t, e, y));
      } catch (M) {
        ps(t, e, M);
      } finally {
        (i !== null && f.types !== null && (i.types = f.types), (U.T = i));
      }
    } else
      try {
        ((i = l(u, n)), Pf(t, e, i));
      } catch (M) {
        ps(t, e, M);
      }
  }
  function Pf(t, e, l) {
    l !== null && typeof l == 'object' && typeof l.then == 'function'
      ? l.then(
          function (n) {
            td(t, e, n);
          },
          function (n) {
            return ps(t, e, n);
          }
        )
      : td(t, e, l);
  }
  function td(t, e, l) {
    ((e.status = 'fulfilled'),
      (e.value = l),
      ed(e),
      (t.state = l),
      (e = t.pending),
      e !== null &&
        ((l = e.next), l === e ? (t.pending = null) : ((l = l.next), (e.next = l), Ff(t, l))));
  }
  function ps(t, e, l) {
    var n = t.pending;
    if (((t.pending = null), n !== null)) {
      n = n.next;
      do ((e.status = 'rejected'), (e.reason = l), ed(e), (e = e.next));
      while (e !== n);
    }
    t.action = null;
  }
  function ed(t) {
    t = t.listeners;
    for (var e = 0; e < t.length; e++) (0, t[e])();
  }
  function ld(t, e) {
    return e;
  }
  function nd(t, e) {
    if (pt) {
      var l = Ot.formState;
      if (l !== null) {
        t: {
          var n = st;
          if (pt) {
            if (Dt) {
              e: {
                for (var u = Dt, i = ke; u.nodeType !== 8; ) {
                  if (!i) {
                    u = null;
                    break e;
                  }
                  if (((u = Be(u.nextSibling)), u === null)) {
                    u = null;
                    break e;
                  }
                }
                ((i = u.data), (u = i === 'F!' || i === 'F' ? u : null));
              }
              if (u) {
                ((Dt = Be(u.nextSibling)), (n = u.data === 'F!'));
                break t;
              }
            }
            Cl(n);
          }
          n = !1;
        }
        n && (e = l[0]);
      }
    }
    return (
      (l = ce()),
      (l.memoizedState = l.baseState = e),
      (n = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: ld,
        lastRenderedState: e,
      }),
      (l.queue = n),
      (l = xd.bind(null, st, n)),
      (n.dispatch = l),
      (n = ys(!1)),
      (i = xs.bind(null, st, !1, n.queue)),
      (n = ce()),
      (u = { state: e, dispatch: null, action: t, pending: null }),
      (n.queue = u),
      (l = p0.bind(null, st, u, i, l)),
      (u.dispatch = l),
      (n.memoizedState = t),
      [e, l, !1]
    );
  }
  function ad(t) {
    var e = Vt();
    return ud(e, Rt, t);
  }
  function ud(t, e, l) {
    if (
      ((e = ms(t, e, ld)[0]),
      (t = ui(il)[0]),
      typeof e == 'object' && e !== null && typeof e.then == 'function')
    )
      try {
        var n = qa(e);
      } catch (f) {
        throw f === qn ? Ju : f;
      }
    else n = e;
    e = Vt();
    var u = e.queue,
      i = u.dispatch;
    return (
      l !== e.memoizedState &&
        ((st.flags |= 2048), Qn(9, { destroy: void 0 }, g0.bind(null, u, l), null)),
      [n, i, t]
    );
  }
  function g0(t, e) {
    t.action = e;
  }
  function id(t) {
    var e = Vt(),
      l = Rt;
    if (l !== null) return ud(e, l, t);
    (Vt(), (e = e.memoizedState), (l = Vt()));
    var n = l.queue.dispatch;
    return ((l.memoizedState = t), [e, n, !1]);
  }
  function Qn(t, e, l, n) {
    return (
      (t = { tag: t, create: l, deps: n, inst: e, next: null }),
      (e = st.updateQueue),
      e === null && ((e = ni()), (st.updateQueue = e)),
      (l = e.lastEffect),
      l === null
        ? (e.lastEffect = t.next = t)
        : ((n = l.next), (l.next = t), (t.next = n), (e.lastEffect = t)),
      t
    );
  }
  function cd() {
    return Vt().memoizedState;
  }
  function ii(t, e, l, n) {
    var u = ce();
    ((st.flags |= t),
      (u.memoizedState = Qn(1 | e, { destroy: void 0 }, l, n === void 0 ? null : n)));
  }
  function ci(t, e, l, n) {
    var u = Vt();
    n = n === void 0 ? null : n;
    var i = u.memoizedState.inst;
    Rt !== null && n !== null && cs(n, Rt.memoizedState.deps)
      ? (u.memoizedState = Qn(e, i, l, n))
      : ((st.flags |= t), (u.memoizedState = Qn(1 | e, i, l, n)));
  }
  function sd(t, e) {
    ii(8390656, 8, t, e);
  }
  function gs(t, e) {
    ci(2048, 8, t, e);
  }
  function v0(t) {
    st.flags |= 4;
    var e = st.updateQueue;
    if (e === null) ((e = ni()), (st.updateQueue = e), (e.events = [t]));
    else {
      var l = e.events;
      l === null ? (e.events = [t]) : l.push(t);
    }
  }
  function od(t) {
    var e = Vt().memoizedState;
    return (
      v0({ ref: e, nextImpl: t }),
      function () {
        if ((xt & 2) !== 0) throw Error(s(440));
        return e.impl.apply(void 0, arguments);
      }
    );
  }
  function rd(t, e) {
    return ci(4, 2, t, e);
  }
  function fd(t, e) {
    return ci(4, 4, t, e);
  }
  function dd(t, e) {
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
  function md(t, e, l) {
    ((l = l != null ? l.concat([t]) : null), ci(4, 4, dd.bind(null, e, t), l));
  }
  function vs() {}
  function hd(t, e) {
    var l = Vt();
    e = e === void 0 ? null : e;
    var n = l.memoizedState;
    return e !== null && cs(e, n[1]) ? n[0] : ((l.memoizedState = [t, e]), t);
  }
  function yd(t, e) {
    var l = Vt();
    e = e === void 0 ? null : e;
    var n = l.memoizedState;
    if (e !== null && cs(e, n[1])) return n[0];
    if (((n = t()), dn)) {
      xl(!0);
      try {
        t();
      } finally {
        xl(!1);
      }
    }
    return ((l.memoizedState = [n, e]), n);
  }
  function _s(t, e, l) {
    return l === void 0 || ((ul & 1073741824) !== 0 && (ht & 261930) === 0)
      ? (t.memoizedState = e)
      : ((t.memoizedState = l), (t = pm()), (st.lanes |= t), (Bl |= t), l);
  }
  function pd(t, e, l, n) {
    return _e(l, e)
      ? l
      : Yn.current !== null
        ? ((t = _s(t, l, n)), _e(t, e) || (Kt = !0), t)
        : (ul & 42) === 0 || ((ul & 1073741824) !== 0 && (ht & 261930) === 0)
          ? ((Kt = !0), (t.memoizedState = l))
          : ((t = pm()), (st.lanes |= t), (Bl |= t), e);
  }
  function gd(t, e, l, n, u) {
    var i = R.p;
    R.p = i !== 0 && 8 > i ? i : 8;
    var f = U.T,
      y = {};
    ((U.T = y), xs(t, !1, e, l));
    try {
      var _ = u(),
        M = U.S;
      if (
        (M !== null && M(y, _), _ !== null && typeof _ == 'object' && typeof _.then == 'function')
      ) {
        var B = m0(_, n);
        Ga(t, e, B, Ne(t));
      } else Ga(t, e, n, Ne(t));
    } catch (G) {
      Ga(t, e, { then: function () {}, status: 'rejected', reason: G }, Ne());
    } finally {
      ((R.p = i), f !== null && y.types !== null && (f.types = y.types), (U.T = f));
    }
  }
  function _0() {}
  function bs(t, e, l, n) {
    if (t.tag !== 5) throw Error(s(476));
    var u = vd(t).queue;
    gd(
      t,
      u,
      e,
      K,
      l === null
        ? _0
        : function () {
            return (_d(t), l(n));
          }
    );
  }
  function vd(t) {
    var e = t.memoizedState;
    if (e !== null) return e;
    e = {
      memoizedState: K,
      baseState: K,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: il,
        lastRenderedState: K,
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
          lastRenderedReducer: il,
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
  function _d(t) {
    var e = vd(t);
    (e.next === null && (e = t.alternate.memoizedState), Ga(t, e.next.queue, {}, Ne()));
  }
  function Ss() {
    return ee(au);
  }
  function bd() {
    return Vt().memoizedState;
  }
  function Sd() {
    return Vt().memoizedState;
  }
  function b0(t) {
    for (var e = t.return; e !== null; ) {
      switch (e.tag) {
        case 24:
        case 3:
          var l = Ne();
          t = zl(l);
          var n = jl(e, t, l);
          (n !== null && (ye(n, e, l), Ba(n, e, l)), (e = { cache: Wc() }), (t.payload = e));
          return;
      }
      e = e.return;
    }
  }
  function S0(t, e, l) {
    var n = Ne();
    ((l = {
      lane: n,
      revertLane: 0,
      gesture: null,
      action: l,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    }),
      si(t) ? Ed(e, l) : ((l = Hc(t, e, l, n)), l !== null && (ye(l, t, n), Td(l, e, n))));
  }
  function xd(t, e, l) {
    var n = Ne();
    Ga(t, e, l, n);
  }
  function Ga(t, e, l, n) {
    var u = {
      lane: n,
      revertLane: 0,
      gesture: null,
      action: l,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    };
    if (si(t)) Ed(e, u);
    else {
      var i = t.alternate;
      if (
        t.lanes === 0 &&
        (i === null || i.lanes === 0) &&
        ((i = e.lastRenderedReducer), i !== null)
      )
        try {
          var f = e.lastRenderedState,
            y = i(f, l);
          if (((u.hasEagerState = !0), (u.eagerState = y), _e(y, f)))
            return (Yu(t, e, u, 0), Ot === null && Gu(), !1);
        } catch {
        } finally {
        }
      if (((l = Hc(t, e, u, n)), l !== null)) return (ye(l, t, n), Td(l, e, n), !0);
    }
    return !1;
  }
  function xs(t, e, l, n) {
    if (
      ((n = {
        lane: 2,
        revertLane: to(),
        gesture: null,
        action: n,
        hasEagerState: !1,
        eagerState: null,
        next: null,
      }),
      si(t))
    ) {
      if (e) throw Error(s(479));
    } else ((e = Hc(t, l, n, 2)), e !== null && ye(e, t, 2));
  }
  function si(t) {
    var e = t.alternate;
    return t === st || (e !== null && e === st);
  }
  function Ed(t, e) {
    Xn = ei = !0;
    var l = t.pending;
    (l === null ? (e.next = e) : ((e.next = l.next), (l.next = e)), (t.pending = e));
  }
  function Td(t, e, l) {
    if ((l & 4194048) !== 0) {
      var n = e.lanes;
      ((n &= t.pendingLanes), (l |= n), (e.lanes = l), Mr(t, l));
    }
  }
  var Ya = {
    readContext: ee,
    use: ai,
    useCallback: qt,
    useContext: qt,
    useEffect: qt,
    useImperativeHandle: qt,
    useLayoutEffect: qt,
    useInsertionEffect: qt,
    useMemo: qt,
    useReducer: qt,
    useRef: qt,
    useState: qt,
    useDebugValue: qt,
    useDeferredValue: qt,
    useTransition: qt,
    useSyncExternalStore: qt,
    useId: qt,
    useHostTransitionStatus: qt,
    useFormState: qt,
    useActionState: qt,
    useOptimistic: qt,
    useMemoCache: qt,
    useCacheRefresh: qt,
  };
  Ya.useEffectEvent = qt;
  var Nd = {
      readContext: ee,
      use: ai,
      useCallback: function (t, e) {
        return ((ce().memoizedState = [t, e === void 0 ? null : e]), t);
      },
      useContext: ee,
      useEffect: sd,
      useImperativeHandle: function (t, e, l) {
        ((l = l != null ? l.concat([t]) : null), ii(4194308, 4, dd.bind(null, e, t), l));
      },
      useLayoutEffect: function (t, e) {
        return ii(4194308, 4, t, e);
      },
      useInsertionEffect: function (t, e) {
        ii(4, 2, t, e);
      },
      useMemo: function (t, e) {
        var l = ce();
        e = e === void 0 ? null : e;
        var n = t();
        if (dn) {
          xl(!0);
          try {
            t();
          } finally {
            xl(!1);
          }
        }
        return ((l.memoizedState = [n, e]), n);
      },
      useReducer: function (t, e, l) {
        var n = ce();
        if (l !== void 0) {
          var u = l(e);
          if (dn) {
            xl(!0);
            try {
              l(e);
            } finally {
              xl(!1);
            }
          }
        } else u = e;
        return (
          (n.memoizedState = n.baseState = u),
          (t = {
            pending: null,
            lanes: 0,
            dispatch: null,
            lastRenderedReducer: t,
            lastRenderedState: u,
          }),
          (n.queue = t),
          (t = t.dispatch = S0.bind(null, st, t)),
          [n.memoizedState, t]
        );
      },
      useRef: function (t) {
        var e = ce();
        return ((t = { current: t }), (e.memoizedState = t));
      },
      useState: function (t) {
        t = ys(t);
        var e = t.queue,
          l = xd.bind(null, st, e);
        return ((e.dispatch = l), [t.memoizedState, l]);
      },
      useDebugValue: vs,
      useDeferredValue: function (t, e) {
        var l = ce();
        return _s(l, t, e);
      },
      useTransition: function () {
        var t = ys(!1);
        return ((t = gd.bind(null, st, t.queue, !0, !1)), (ce().memoizedState = t), [!1, t]);
      },
      useSyncExternalStore: function (t, e, l) {
        var n = st,
          u = ce();
        if (pt) {
          if (l === void 0) throw Error(s(407));
          l = l();
        } else {
          if (((l = e()), Ot === null)) throw Error(s(349));
          (ht & 127) !== 0 || Zf(n, e, l);
        }
        u.memoizedState = l;
        var i = { value: l, getSnapshot: e };
        return (
          (u.queue = i),
          sd($f.bind(null, n, i, t), [t]),
          (n.flags |= 2048),
          Qn(9, { destroy: void 0 }, Kf.bind(null, n, i, l, e), null),
          l
        );
      },
      useId: function () {
        var t = ce(),
          e = Ot.identifierPrefix;
        if (pt) {
          var l = Ke,
            n = Ze;
          ((l = (n & ~(1 << (32 - ve(n) - 1))).toString(32) + l),
            (e = '_' + e + 'R_' + l),
            (l = li++),
            0 < l && (e += 'H' + l.toString(32)),
            (e += '_'));
        } else ((l = h0++), (e = '_' + e + 'r_' + l.toString(32) + '_'));
        return (t.memoizedState = e);
      },
      useHostTransitionStatus: Ss,
      useFormState: nd,
      useActionState: nd,
      useOptimistic: function (t) {
        var e = ce();
        e.memoizedState = e.baseState = t;
        var l = {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: null,
          lastRenderedState: null,
        };
        return ((e.queue = l), (e = xs.bind(null, st, !0, l)), (l.dispatch = e), [t, e]);
      },
      useMemoCache: ds,
      useCacheRefresh: function () {
        return (ce().memoizedState = b0.bind(null, st));
      },
      useEffectEvent: function (t) {
        var e = ce(),
          l = { impl: t };
        return (
          (e.memoizedState = l),
          function () {
            if ((xt & 2) !== 0) throw Error(s(440));
            return l.impl.apply(void 0, arguments);
          }
        );
      },
    },
    Es = {
      readContext: ee,
      use: ai,
      useCallback: hd,
      useContext: ee,
      useEffect: gs,
      useImperativeHandle: md,
      useInsertionEffect: rd,
      useLayoutEffect: fd,
      useMemo: yd,
      useReducer: ui,
      useRef: cd,
      useState: function () {
        return ui(il);
      },
      useDebugValue: vs,
      useDeferredValue: function (t, e) {
        var l = Vt();
        return pd(l, Rt.memoizedState, t, e);
      },
      useTransition: function () {
        var t = ui(il)[0],
          e = Vt().memoizedState;
        return [typeof t == 'boolean' ? t : qa(t), e];
      },
      useSyncExternalStore: Qf,
      useId: bd,
      useHostTransitionStatus: Ss,
      useFormState: ad,
      useActionState: ad,
      useOptimistic: function (t, e) {
        var l = Vt();
        return If(l, Rt, t, e);
      },
      useMemoCache: ds,
      useCacheRefresh: Sd,
    };
  Es.useEffectEvent = od;
  var Ad = {
    readContext: ee,
    use: ai,
    useCallback: hd,
    useContext: ee,
    useEffect: gs,
    useImperativeHandle: md,
    useInsertionEffect: rd,
    useLayoutEffect: fd,
    useMemo: yd,
    useReducer: hs,
    useRef: cd,
    useState: function () {
      return hs(il);
    },
    useDebugValue: vs,
    useDeferredValue: function (t, e) {
      var l = Vt();
      return Rt === null ? _s(l, t, e) : pd(l, Rt.memoizedState, t, e);
    },
    useTransition: function () {
      var t = hs(il)[0],
        e = Vt().memoizedState;
      return [typeof t == 'boolean' ? t : qa(t), e];
    },
    useSyncExternalStore: Qf,
    useId: bd,
    useHostTransitionStatus: Ss,
    useFormState: id,
    useActionState: id,
    useOptimistic: function (t, e) {
      var l = Vt();
      return Rt !== null ? If(l, Rt, t, e) : ((l.baseState = t), [t, l.queue.dispatch]);
    },
    useMemoCache: ds,
    useCacheRefresh: Sd,
  };
  Ad.useEffectEvent = od;
  function Ts(t, e, l, n) {
    ((e = t.memoizedState),
      (l = l(n, e)),
      (l = l == null ? e : b({}, e, l)),
      (t.memoizedState = l),
      t.lanes === 0 && (t.updateQueue.baseState = l));
  }
  var Ns = {
    enqueueSetState: function (t, e, l) {
      t = t._reactInternals;
      var n = Ne(),
        u = zl(n);
      ((u.payload = e),
        l != null && (u.callback = l),
        (e = jl(t, u, n)),
        e !== null && (ye(e, t, n), Ba(e, t, n)));
    },
    enqueueReplaceState: function (t, e, l) {
      t = t._reactInternals;
      var n = Ne(),
        u = zl(n);
      ((u.tag = 1),
        (u.payload = e),
        l != null && (u.callback = l),
        (e = jl(t, u, n)),
        e !== null && (ye(e, t, n), Ba(e, t, n)));
    },
    enqueueForceUpdate: function (t, e) {
      t = t._reactInternals;
      var l = Ne(),
        n = zl(l);
      ((n.tag = 2),
        e != null && (n.callback = e),
        (e = jl(t, n, l)),
        e !== null && (ye(e, t, l), Ba(e, t, l)));
    },
  };
  function Cd(t, e, l, n, u, i, f) {
    return (
      (t = t.stateNode),
      typeof t.shouldComponentUpdate == 'function'
        ? t.shouldComponentUpdate(n, i, f)
        : e.prototype && e.prototype.isPureReactComponent
          ? !Ma(l, n) || !Ma(u, i)
          : !0
    );
  }
  function Md(t, e, l, n) {
    ((t = e.state),
      typeof e.componentWillReceiveProps == 'function' && e.componentWillReceiveProps(l, n),
      typeof e.UNSAFE_componentWillReceiveProps == 'function' &&
        e.UNSAFE_componentWillReceiveProps(l, n),
      e.state !== t && Ns.enqueueReplaceState(e, e.state, null));
  }
  function mn(t, e) {
    var l = e;
    if ('ref' in e) {
      l = {};
      for (var n in e) n !== 'ref' && (l[n] = e[n]);
    }
    if ((t = t.defaultProps)) {
      l === e && (l = b({}, l));
      for (var u in t) l[u] === void 0 && (l[u] = t[u]);
    }
    return l;
  }
  function Rd(t) {
    qu(t);
  }
  function zd(t) {
    console.error(t);
  }
  function jd(t) {
    qu(t);
  }
  function oi(t, e) {
    try {
      var l = t.onUncaughtError;
      l(e.value, { componentStack: e.stack });
    } catch (n) {
      setTimeout(function () {
        throw n;
      });
    }
  }
  function Od(t, e, l) {
    try {
      var n = t.onCaughtError;
      n(l.value, { componentStack: l.stack, errorBoundary: e.tag === 1 ? e.stateNode : null });
    } catch (u) {
      setTimeout(function () {
        throw u;
      });
    }
  }
  function As(t, e, l) {
    return (
      (l = zl(l)),
      (l.tag = 3),
      (l.payload = { element: null }),
      (l.callback = function () {
        oi(t, e);
      }),
      l
    );
  }
  function Dd(t) {
    return ((t = zl(t)), (t.tag = 3), t);
  }
  function kd(t, e, l, n) {
    var u = l.type.getDerivedStateFromError;
    if (typeof u == 'function') {
      var i = n.value;
      ((t.payload = function () {
        return u(i);
      }),
        (t.callback = function () {
          Od(e, l, n);
        }));
    }
    var f = l.stateNode;
    f !== null &&
      typeof f.componentDidCatch == 'function' &&
      (t.callback = function () {
        (Od(e, l, n),
          typeof u != 'function' && (Ul === null ? (Ul = new Set([this])) : Ul.add(this)));
        var y = n.stack;
        this.componentDidCatch(n.value, { componentStack: y !== null ? y : '' });
      });
  }
  function x0(t, e, l, n, u) {
    if (((l.flags |= 32768), n !== null && typeof n == 'object' && typeof n.then == 'function')) {
      if (((e = l.alternate), e !== null && Un(e, l, u, !0), (l = Se.current), l !== null)) {
        switch (l.tag) {
          case 31:
          case 13:
            return (
              we === null ? Si() : l.alternate === null && Gt === 0 && (Gt = 3),
              (l.flags &= -257),
              (l.flags |= 65536),
              (l.lanes = u),
              n === Wu
                ? (l.flags |= 16384)
                : ((e = l.updateQueue),
                  e === null ? (l.updateQueue = new Set([n])) : e.add(n),
                  Is(t, n, u)),
              !1
            );
          case 22:
            return (
              (l.flags |= 65536),
              n === Wu
                ? (l.flags |= 16384)
                : ((e = l.updateQueue),
                  e === null
                    ? ((e = { transitions: null, markerInstances: null, retryQueue: new Set([n]) }),
                      (l.updateQueue = e))
                    : ((l = e.retryQueue), l === null ? (e.retryQueue = new Set([n])) : l.add(n)),
                  Is(t, n, u)),
              !1
            );
        }
        throw Error(s(435, l.tag));
      }
      return (Is(t, n, u), Si(), !1);
    }
    if (pt)
      return (
        (e = Se.current),
        e !== null
          ? ((e.flags & 65536) === 0 && (e.flags |= 256),
            (e.flags |= 65536),
            (e.lanes = u),
            n !== Qc && ((t = Error(s(422), { cause: n })), ja(je(t, l))))
          : (n !== Qc && ((e = Error(s(423), { cause: n })), ja(je(e, l))),
            (t = t.current.alternate),
            (t.flags |= 65536),
            (u &= -u),
            (t.lanes |= u),
            (n = je(n, l)),
            (u = As(t.stateNode, n, u)),
            ls(t, u),
            Gt !== 4 && (Gt = 2)),
        !1
      );
    var i = Error(s(520), { cause: n });
    if (((i = je(i, l)), Wa === null ? (Wa = [i]) : Wa.push(i), Gt !== 4 && (Gt = 2), e === null))
      return !0;
    ((n = je(n, l)), (l = e));
    do {
      switch (l.tag) {
        case 3:
          return (
            (l.flags |= 65536),
            (t = u & -u),
            (l.lanes |= t),
            (t = As(l.stateNode, n, t)),
            ls(l, t),
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
              (u = Dd(u)),
              kd(u, t, l, n),
              ls(l, u),
              !1
            );
      }
      l = l.return;
    } while (l !== null);
    return !1;
  }
  var Cs = Error(s(461)),
    Kt = !1;
  function le(t, e, l, n) {
    e.child = t === null ? Lf(e, null, l, n) : fn(e, t.child, l, n);
  }
  function wd(t, e, l, n, u) {
    l = l.render;
    var i = e.ref;
    if ('ref' in n) {
      var f = {};
      for (var y in n) y !== 'ref' && (f[y] = n[y]);
    } else f = n;
    return (
      cn(e),
      (n = ss(t, e, l, f, i, u)),
      (y = os()),
      t !== null && !Kt
        ? (rs(t, e, u), cl(t, e, u))
        : (pt && y && Xc(e), (e.flags |= 1), le(t, e, n, u), e.child)
    );
  }
  function Bd(t, e, l, n, u) {
    if (t === null) {
      var i = l.type;
      return typeof i == 'function' && !qc(i) && i.defaultProps === void 0 && l.compare === null
        ? ((e.tag = 15), (e.type = i), Ud(t, e, i, n, u))
        : ((t = Vu(l.type, null, n, e, e.mode, u)), (t.ref = e.ref), (t.return = e), (e.child = t));
    }
    if (((i = t.child), !ws(t, u))) {
      var f = i.memoizedProps;
      if (((l = l.compare), (l = l !== null ? l : Ma), l(f, n) && t.ref === e.ref))
        return cl(t, e, u);
    }
    return ((e.flags |= 1), (t = el(i, n)), (t.ref = e.ref), (t.return = e), (e.child = t));
  }
  function Ud(t, e, l, n, u) {
    if (t !== null) {
      var i = t.memoizedProps;
      if (Ma(i, n) && t.ref === e.ref)
        if (((Kt = !1), (e.pendingProps = n = i), ws(t, u))) (t.flags & 131072) !== 0 && (Kt = !0);
        else return ((e.lanes = t.lanes), cl(t, e, u));
    }
    return Ms(t, e, l, n, u);
  }
  function Ld(t, e, l, n) {
    var u = n.children,
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
      n.mode === 'hidden')
    ) {
      if ((e.flags & 128) !== 0) {
        if (((i = i !== null ? i.baseLanes | l : l), t !== null)) {
          for (n = e.child = t.child, u = 0; n !== null; )
            ((u = u | n.lanes | n.childLanes), (n = n.sibling));
          n = u & ~i;
        } else ((n = 0), (e.child = null));
        return Hd(t, e, i, l, n);
      }
      if ((l & 536870912) !== 0)
        ((e.memoizedState = { baseLanes: 0, cachePool: null }),
          t !== null && $u(e, i !== null ? i.cachePool : null),
          i !== null ? Gf(e, i) : as(),
          Yf(e));
      else return ((n = e.lanes = 536870912), Hd(t, e, i !== null ? i.baseLanes | l : l, l, n));
    } else
      i !== null
        ? ($u(e, i.cachePool), Gf(e, i), Dl(), (e.memoizedState = null))
        : (t !== null && $u(e, null), as(), Dl());
    return (le(t, e, u, l), e.child);
  }
  function Xa(t, e) {
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
  function Hd(t, e, l, n, u) {
    var i = Fc();
    return (
      (i = i === null ? null : { parent: Qt._currentValue, pool: i }),
      (e.memoizedState = { baseLanes: l, cachePool: i }),
      t !== null && $u(e, null),
      as(),
      Yf(e),
      t !== null && Un(t, e, n, !0),
      (e.childLanes = u),
      null
    );
  }
  function ri(t, e) {
    return (
      (e = di({ mode: e.mode, children: e.children }, t.mode)),
      (e.ref = t.ref),
      (t.child = e),
      (e.return = t),
      e
    );
  }
  function qd(t, e, l) {
    return (
      fn(e, t.child, null, l),
      (t = ri(e, e.pendingProps)),
      (t.flags |= 2),
      xe(e),
      (e.memoizedState = null),
      t
    );
  }
  function E0(t, e, l) {
    var n = e.pendingProps,
      u = (e.flags & 128) !== 0;
    if (((e.flags &= -129), t === null)) {
      if (pt) {
        if (n.mode === 'hidden') return ((t = ri(e, n)), (e.lanes = 536870912), Xa(null, t));
        if (
          (is(e),
          (t = Dt)
            ? ((t = Fm(t, ke)),
              (t = t !== null && t.data === '&' ? t : null),
              t !== null &&
                ((e.memoizedState = {
                  dehydrated: t,
                  treeContext: Nl !== null ? { id: Ze, overflow: Ke } : null,
                  retryLane: 536870912,
                  hydrationErrors: null,
                }),
                (l = Ef(t)),
                (l.return = e),
                (e.child = l),
                (te = e),
                (Dt = null)))
            : (t = null),
          t === null)
        )
          throw Cl(e);
        return ((e.lanes = 536870912), null);
      }
      return ri(e, n);
    }
    var i = t.memoizedState;
    if (i !== null) {
      var f = i.dehydrated;
      if ((is(e), u))
        if (e.flags & 256) ((e.flags &= -257), (e = qd(t, e, l)));
        else if (e.memoizedState !== null) ((e.child = t.child), (e.flags |= 128), (e = null));
        else throw Error(s(558));
      else if ((Kt || Un(t, e, l, !1), (u = (l & t.childLanes) !== 0), Kt || u)) {
        if (((n = Ot), n !== null && ((f = Rr(n, l)), f !== 0 && f !== i.retryLane)))
          throw ((i.retryLane = f), ln(t, f), ye(n, t, f), Cs);
        (Si(), (e = qd(t, e, l)));
      } else
        ((t = i.treeContext),
          (Dt = Be(f.nextSibling)),
          (te = e),
          (pt = !0),
          (Al = null),
          (ke = !1),
          t !== null && Af(e, t),
          (e = ri(e, n)),
          (e.flags |= 4096));
      return e;
    }
    return (
      (t = el(t.child, { mode: n.mode, children: n.children })),
      (t.ref = e.ref),
      (e.child = t),
      (t.return = e),
      t
    );
  }
  function fi(t, e) {
    var l = e.ref;
    if (l === null) t !== null && t.ref !== null && (e.flags |= 4194816);
    else {
      if (typeof l != 'function' && typeof l != 'object') throw Error(s(284));
      (t === null || t.ref !== l) && (e.flags |= 4194816);
    }
  }
  function Ms(t, e, l, n, u) {
    return (
      cn(e),
      (l = ss(t, e, l, n, void 0, u)),
      (n = os()),
      t !== null && !Kt
        ? (rs(t, e, u), cl(t, e, u))
        : (pt && n && Xc(e), (e.flags |= 1), le(t, e, l, u), e.child)
    );
  }
  function Gd(t, e, l, n, u, i) {
    return (
      cn(e),
      (e.updateQueue = null),
      (l = Vf(e, n, l, u)),
      Xf(t),
      (n = os()),
      t !== null && !Kt
        ? (rs(t, e, i), cl(t, e, i))
        : (pt && n && Xc(e), (e.flags |= 1), le(t, e, l, i), e.child)
    );
  }
  function Yd(t, e, l, n, u) {
    if ((cn(e), e.stateNode === null)) {
      var i = Dn,
        f = l.contextType;
      (typeof f == 'object' && f !== null && (i = ee(f)),
        (i = new l(n, i)),
        (e.memoizedState = i.state !== null && i.state !== void 0 ? i.state : null),
        (i.updater = Ns),
        (e.stateNode = i),
        (i._reactInternals = e),
        (i = e.stateNode),
        (i.props = n),
        (i.state = e.memoizedState),
        (i.refs = {}),
        ts(e),
        (f = l.contextType),
        (i.context = typeof f == 'object' && f !== null ? ee(f) : Dn),
        (i.state = e.memoizedState),
        (f = l.getDerivedStateFromProps),
        typeof f == 'function' && (Ts(e, l, f, n), (i.state = e.memoizedState)),
        typeof l.getDerivedStateFromProps == 'function' ||
          typeof i.getSnapshotBeforeUpdate == 'function' ||
          (typeof i.UNSAFE_componentWillMount != 'function' &&
            typeof i.componentWillMount != 'function') ||
          ((f = i.state),
          typeof i.componentWillMount == 'function' && i.componentWillMount(),
          typeof i.UNSAFE_componentWillMount == 'function' && i.UNSAFE_componentWillMount(),
          f !== i.state && Ns.enqueueReplaceState(i, i.state, null),
          La(e, n, i, u),
          Ua(),
          (i.state = e.memoizedState)),
        typeof i.componentDidMount == 'function' && (e.flags |= 4194308),
        (n = !0));
    } else if (t === null) {
      i = e.stateNode;
      var y = e.memoizedProps,
        _ = mn(l, y);
      i.props = _;
      var M = i.context,
        B = l.contextType;
      ((f = Dn), typeof B == 'object' && B !== null && (f = ee(B)));
      var G = l.getDerivedStateFromProps;
      ((B = typeof G == 'function' || typeof i.getSnapshotBeforeUpdate == 'function'),
        (y = e.pendingProps !== y),
        B ||
          (typeof i.UNSAFE_componentWillReceiveProps != 'function' &&
            typeof i.componentWillReceiveProps != 'function') ||
          ((y || M !== f) && Md(e, i, n, f)),
        (Rl = !1));
      var z = e.memoizedState;
      ((i.state = z),
        La(e, n, i, u),
        Ua(),
        (M = e.memoizedState),
        y || z !== M || Rl
          ? (typeof G == 'function' && (Ts(e, l, G, n), (M = e.memoizedState)),
            (_ = Rl || Cd(e, l, _, n, z, M, f))
              ? (B ||
                  (typeof i.UNSAFE_componentWillMount != 'function' &&
                    typeof i.componentWillMount != 'function') ||
                  (typeof i.componentWillMount == 'function' && i.componentWillMount(),
                  typeof i.UNSAFE_componentWillMount == 'function' &&
                    i.UNSAFE_componentWillMount()),
                typeof i.componentDidMount == 'function' && (e.flags |= 4194308))
              : (typeof i.componentDidMount == 'function' && (e.flags |= 4194308),
                (e.memoizedProps = n),
                (e.memoizedState = M)),
            (i.props = n),
            (i.state = M),
            (i.context = f),
            (n = _))
          : (typeof i.componentDidMount == 'function' && (e.flags |= 4194308), (n = !1)));
    } else {
      ((i = e.stateNode),
        es(t, e),
        (f = e.memoizedProps),
        (B = mn(l, f)),
        (i.props = B),
        (G = e.pendingProps),
        (z = i.context),
        (M = l.contextType),
        (_ = Dn),
        typeof M == 'object' && M !== null && (_ = ee(M)),
        (y = l.getDerivedStateFromProps),
        (M = typeof y == 'function' || typeof i.getSnapshotBeforeUpdate == 'function') ||
          (typeof i.UNSAFE_componentWillReceiveProps != 'function' &&
            typeof i.componentWillReceiveProps != 'function') ||
          ((f !== G || z !== _) && Md(e, i, n, _)),
        (Rl = !1),
        (z = e.memoizedState),
        (i.state = z),
        La(e, n, i, u),
        Ua());
      var j = e.memoizedState;
      f !== G || z !== j || Rl || (t !== null && t.dependencies !== null && Zu(t.dependencies))
        ? (typeof y == 'function' && (Ts(e, l, y, n), (j = e.memoizedState)),
          (B =
            Rl ||
            Cd(e, l, B, n, z, j, _) ||
            (t !== null && t.dependencies !== null && Zu(t.dependencies)))
            ? (M ||
                (typeof i.UNSAFE_componentWillUpdate != 'function' &&
                  typeof i.componentWillUpdate != 'function') ||
                (typeof i.componentWillUpdate == 'function' && i.componentWillUpdate(n, j, _),
                typeof i.UNSAFE_componentWillUpdate == 'function' &&
                  i.UNSAFE_componentWillUpdate(n, j, _)),
              typeof i.componentDidUpdate == 'function' && (e.flags |= 4),
              typeof i.getSnapshotBeforeUpdate == 'function' && (e.flags |= 1024))
            : (typeof i.componentDidUpdate != 'function' ||
                (f === t.memoizedProps && z === t.memoizedState) ||
                (e.flags |= 4),
              typeof i.getSnapshotBeforeUpdate != 'function' ||
                (f === t.memoizedProps && z === t.memoizedState) ||
                (e.flags |= 1024),
              (e.memoizedProps = n),
              (e.memoizedState = j)),
          (i.props = n),
          (i.state = j),
          (i.context = _),
          (n = B))
        : (typeof i.componentDidUpdate != 'function' ||
            (f === t.memoizedProps && z === t.memoizedState) ||
            (e.flags |= 4),
          typeof i.getSnapshotBeforeUpdate != 'function' ||
            (f === t.memoizedProps && z === t.memoizedState) ||
            (e.flags |= 1024),
          (n = !1));
    }
    return (
      (i = n),
      fi(t, e),
      (n = (e.flags & 128) !== 0),
      i || n
        ? ((i = e.stateNode),
          (l = n && typeof l.getDerivedStateFromError != 'function' ? null : i.render()),
          (e.flags |= 1),
          t !== null && n
            ? ((e.child = fn(e, t.child, null, u)), (e.child = fn(e, null, l, u)))
            : le(t, e, l, u),
          (e.memoizedState = i.state),
          (t = e.child))
        : (t = cl(t, e, u)),
      t
    );
  }
  function Xd(t, e, l, n) {
    return (an(), (e.flags |= 256), le(t, e, l, n), e.child);
  }
  var Rs = { dehydrated: null, treeContext: null, retryLane: 0, hydrationErrors: null };
  function zs(t) {
    return { baseLanes: t, cachePool: Of() };
  }
  function js(t, e, l) {
    return ((t = t !== null ? t.childLanes & ~l : 0), e && (t |= Te), t);
  }
  function Vd(t, e, l) {
    var n = e.pendingProps,
      u = !1,
      i = (e.flags & 128) !== 0,
      f;
    if (
      ((f = i) || (f = t !== null && t.memoizedState === null ? !1 : (Xt.current & 2) !== 0),
      f && ((u = !0), (e.flags &= -129)),
      (f = (e.flags & 32) !== 0),
      (e.flags &= -33),
      t === null)
    ) {
      if (pt) {
        if (
          (u ? Ol(e) : Dl(),
          (t = Dt)
            ? ((t = Fm(t, ke)),
              (t = t !== null && t.data !== '&' ? t : null),
              t !== null &&
                ((e.memoizedState = {
                  dehydrated: t,
                  treeContext: Nl !== null ? { id: Ze, overflow: Ke } : null,
                  retryLane: 536870912,
                  hydrationErrors: null,
                }),
                (l = Ef(t)),
                (l.return = e),
                (e.child = l),
                (te = e),
                (Dt = null)))
            : (t = null),
          t === null)
        )
          throw Cl(e);
        return (ho(t) ? (e.lanes = 32) : (e.lanes = 536870912), null);
      }
      var y = n.children;
      return (
        (n = n.fallback),
        u
          ? (Dl(),
            (u = e.mode),
            (y = di({ mode: 'hidden', children: y }, u)),
            (n = nn(n, u, l, null)),
            (y.return = e),
            (n.return = e),
            (y.sibling = n),
            (e.child = y),
            (n = e.child),
            (n.memoizedState = zs(l)),
            (n.childLanes = js(t, f, l)),
            (e.memoizedState = Rs),
            Xa(null, n))
          : (Ol(e), Os(e, y))
      );
    }
    var _ = t.memoizedState;
    if (_ !== null && ((y = _.dehydrated), y !== null)) {
      if (i)
        e.flags & 256
          ? (Ol(e), (e.flags &= -257), (e = Ds(t, e, l)))
          : e.memoizedState !== null
            ? (Dl(), (e.child = t.child), (e.flags |= 128), (e = null))
            : (Dl(),
              (y = n.fallback),
              (u = e.mode),
              (n = di({ mode: 'visible', children: n.children }, u)),
              (y = nn(y, u, l, null)),
              (y.flags |= 2),
              (n.return = e),
              (y.return = e),
              (n.sibling = y),
              (e.child = n),
              fn(e, t.child, null, l),
              (n = e.child),
              (n.memoizedState = zs(l)),
              (n.childLanes = js(t, f, l)),
              (e.memoizedState = Rs),
              (e = Xa(null, n)));
      else if ((Ol(e), ho(y))) {
        if (((f = y.nextSibling && y.nextSibling.dataset), f)) var M = f.dgst;
        ((f = M),
          (n = Error(s(419))),
          (n.stack = ''),
          (n.digest = f),
          ja({ value: n, source: null, stack: null }),
          (e = Ds(t, e, l)));
      } else if ((Kt || Un(t, e, l, !1), (f = (l & t.childLanes) !== 0), Kt || f)) {
        if (((f = Ot), f !== null && ((n = Rr(f, l)), n !== 0 && n !== _.retryLane)))
          throw ((_.retryLane = n), ln(t, n), ye(f, t, n), Cs);
        (mo(y) || Si(), (e = Ds(t, e, l)));
      } else
        mo(y)
          ? ((e.flags |= 192), (e.child = t.child), (e = null))
          : ((t = _.treeContext),
            (Dt = Be(y.nextSibling)),
            (te = e),
            (pt = !0),
            (Al = null),
            (ke = !1),
            t !== null && Af(e, t),
            (e = Os(e, n.children)),
            (e.flags |= 4096));
      return e;
    }
    return u
      ? (Dl(),
        (y = n.fallback),
        (u = e.mode),
        (_ = t.child),
        (M = _.sibling),
        (n = el(_, { mode: 'hidden', children: n.children })),
        (n.subtreeFlags = _.subtreeFlags & 65011712),
        M !== null ? (y = el(M, y)) : ((y = nn(y, u, l, null)), (y.flags |= 2)),
        (y.return = e),
        (n.return = e),
        (n.sibling = y),
        (e.child = n),
        Xa(null, n),
        (n = e.child),
        (y = t.child.memoizedState),
        y === null
          ? (y = zs(l))
          : ((u = y.cachePool),
            u !== null
              ? ((_ = Qt._currentValue), (u = u.parent !== _ ? { parent: _, pool: _ } : u))
              : (u = Of()),
            (y = { baseLanes: y.baseLanes | l, cachePool: u })),
        (n.memoizedState = y),
        (n.childLanes = js(t, f, l)),
        (e.memoizedState = Rs),
        Xa(t.child, n))
      : (Ol(e),
        (l = t.child),
        (t = l.sibling),
        (l = el(l, { mode: 'visible', children: n.children })),
        (l.return = e),
        (l.sibling = null),
        t !== null &&
          ((f = e.deletions), f === null ? ((e.deletions = [t]), (e.flags |= 16)) : f.push(t)),
        (e.child = l),
        (e.memoizedState = null),
        l);
  }
  function Os(t, e) {
    return ((e = di({ mode: 'visible', children: e }, t.mode)), (e.return = t), (t.child = e));
  }
  function di(t, e) {
    return ((t = be(22, t, null, e)), (t.lanes = 0), t);
  }
  function Ds(t, e, l) {
    return (
      fn(e, t.child, null, l),
      (t = Os(e, e.pendingProps.children)),
      (t.flags |= 2),
      (e.memoizedState = null),
      t
    );
  }
  function Qd(t, e, l) {
    t.lanes |= e;
    var n = t.alternate;
    (n !== null && (n.lanes |= e), $c(t.return, e, l));
  }
  function ks(t, e, l, n, u, i) {
    var f = t.memoizedState;
    f === null
      ? (t.memoizedState = {
          isBackwards: e,
          rendering: null,
          renderingStartTime: 0,
          last: n,
          tail: l,
          tailMode: u,
          treeForkCount: i,
        })
      : ((f.isBackwards = e),
        (f.rendering = null),
        (f.renderingStartTime = 0),
        (f.last = n),
        (f.tail = l),
        (f.tailMode = u),
        (f.treeForkCount = i));
  }
  function Zd(t, e, l) {
    var n = e.pendingProps,
      u = n.revealOrder,
      i = n.tail;
    n = n.children;
    var f = Xt.current,
      y = (f & 2) !== 0;
    if (
      (y ? ((f = (f & 1) | 2), (e.flags |= 128)) : (f &= 1),
      W(Xt, f),
      le(t, e, n, l),
      (n = pt ? za : 0),
      !y && t !== null && (t.flags & 128) !== 0)
    )
      t: for (t = e.child; t !== null; ) {
        if (t.tag === 13) t.memoizedState !== null && Qd(t, l, e);
        else if (t.tag === 19) Qd(t, l, e);
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
          ((t = l.alternate), t !== null && ti(t) === null && (u = l), (l = l.sibling));
        ((l = u),
          l === null ? ((u = e.child), (e.child = null)) : ((u = l.sibling), (l.sibling = null)),
          ks(e, !1, u, l, i, n));
        break;
      case 'backwards':
      case 'unstable_legacy-backwards':
        for (l = null, u = e.child, e.child = null; u !== null; ) {
          if (((t = u.alternate), t !== null && ti(t) === null)) {
            e.child = u;
            break;
          }
          ((t = u.sibling), (u.sibling = l), (l = u), (u = t));
        }
        ks(e, !0, l, null, i, n);
        break;
      case 'together':
        ks(e, !1, null, null, void 0, n);
        break;
      default:
        e.memoizedState = null;
    }
    return e.child;
  }
  function cl(t, e, l) {
    if (
      (t !== null && (e.dependencies = t.dependencies), (Bl |= e.lanes), (l & e.childLanes) === 0)
    )
      if (t !== null) {
        if ((Un(t, e, l, !1), (l & e.childLanes) === 0)) return null;
      } else return null;
    if (t !== null && e.child !== t.child) throw Error(s(153));
    if (e.child !== null) {
      for (t = e.child, l = el(t, t.pendingProps), e.child = l, l.return = e; t.sibling !== null; )
        ((t = t.sibling), (l = l.sibling = el(t, t.pendingProps)), (l.return = e));
      l.sibling = null;
    }
    return e.child;
  }
  function ws(t, e) {
    return (t.lanes & e) !== 0 ? !0 : ((t = t.dependencies), !!(t !== null && Zu(t)));
  }
  function T0(t, e, l) {
    switch (e.tag) {
      case 3:
        (ie(e, e.stateNode.containerInfo), Ml(e, Qt, t.memoizedState.cache), an());
        break;
      case 27:
      case 5:
        ya(e);
        break;
      case 4:
        ie(e, e.stateNode.containerInfo);
        break;
      case 10:
        Ml(e, e.type, e.memoizedProps.value);
        break;
      case 31:
        if (e.memoizedState !== null) return ((e.flags |= 128), is(e), null);
        break;
      case 13:
        var n = e.memoizedState;
        if (n !== null)
          return n.dehydrated !== null
            ? (Ol(e), (e.flags |= 128), null)
            : (l & e.child.childLanes) !== 0
              ? Vd(t, e, l)
              : (Ol(e), (t = cl(t, e, l)), t !== null ? t.sibling : null);
        Ol(e);
        break;
      case 19:
        var u = (t.flags & 128) !== 0;
        if (
          ((n = (l & e.childLanes) !== 0),
          n || (Un(t, e, l, !1), (n = (l & e.childLanes) !== 0)),
          u)
        ) {
          if (n) return Zd(t, e, l);
          e.flags |= 128;
        }
        if (
          ((u = e.memoizedState),
          u !== null && ((u.rendering = null), (u.tail = null), (u.lastEffect = null)),
          W(Xt, Xt.current),
          n)
        )
          break;
        return null;
      case 22:
        return ((e.lanes = 0), Ld(t, e, l, e.pendingProps));
      case 24:
        Ml(e, Qt, t.memoizedState.cache);
    }
    return cl(t, e, l);
  }
  function Kd(t, e, l) {
    if (t !== null)
      if (t.memoizedProps !== e.pendingProps) Kt = !0;
      else {
        if (!ws(t, l) && (e.flags & 128) === 0) return ((Kt = !1), T0(t, e, l));
        Kt = (t.flags & 131072) !== 0;
      }
    else ((Kt = !1), pt && (e.flags & 1048576) !== 0 && Nf(e, za, e.index));
    switch (((e.lanes = 0), e.tag)) {
      case 16:
        t: {
          var n = e.pendingProps;
          if (((t = on(e.elementType)), (e.type = t), typeof t == 'function'))
            qc(t)
              ? ((n = mn(t, n)), (e.tag = 1), (e = Yd(null, e, t, n, l)))
              : ((e.tag = 0), (e = Ms(null, e, t, n, l)));
          else {
            if (t != null) {
              var u = t.$$typeof;
              if (u === Y) {
                ((e.tag = 11), (e = wd(null, e, t, n, l)));
                break t;
              } else if (u === Z) {
                ((e.tag = 14), (e = Bd(null, e, t, n, l)));
                break t;
              }
            }
            throw ((e = se(t) || t), Error(s(306, e, '')));
          }
        }
        return e;
      case 0:
        return Ms(t, e, e.type, e.pendingProps, l);
      case 1:
        return ((n = e.type), (u = mn(n, e.pendingProps)), Yd(t, e, n, u, l));
      case 3:
        t: {
          if ((ie(e, e.stateNode.containerInfo), t === null)) throw Error(s(387));
          n = e.pendingProps;
          var i = e.memoizedState;
          ((u = i.element), es(t, e), La(e, n, null, l));
          var f = e.memoizedState;
          if (
            ((n = f.cache),
            Ml(e, Qt, n),
            n !== i.cache && Jc(e, [Qt], l, !0),
            Ua(),
            (n = f.element),
            i.isDehydrated)
          )
            if (
              ((i = { element: n, isDehydrated: !1, cache: f.cache }),
              (e.updateQueue.baseState = i),
              (e.memoizedState = i),
              e.flags & 256)
            ) {
              e = Xd(t, e, n, l);
              break t;
            } else if (n !== u) {
              ((u = je(Error(s(424)), e)), ja(u), (e = Xd(t, e, n, l)));
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
                Dt = Be(t.firstChild),
                  te = e,
                  pt = !0,
                  Al = null,
                  ke = !0,
                  l = Lf(e, null, n, l),
                  e.child = l;
                l;
              )
                ((l.flags = (l.flags & -3) | 4096), (l = l.sibling));
            }
          else {
            if ((an(), n === u)) {
              e = cl(t, e, l);
              break t;
            }
            le(t, e, n, l);
          }
          e = e.child;
        }
        return e;
      case 26:
        return (
          fi(t, e),
          t === null
            ? (l = ah(e.type, null, e.pendingProps, null))
              ? (e.memoizedState = l)
              : pt ||
                ((l = e.type),
                (t = e.pendingProps),
                (n = Mi(ft.current).createElement(l)),
                (n[Pt] = e),
                (n[oe] = t),
                ne(n, l, t),
                It(n),
                (e.stateNode = n))
            : (e.memoizedState = ah(e.type, t.memoizedProps, e.pendingProps, t.memoizedState)),
          null
        );
      case 27:
        return (
          ya(e),
          t === null &&
            pt &&
            ((n = e.stateNode = eh(e.type, e.pendingProps, ft.current)),
            (te = e),
            (ke = !0),
            (u = Dt),
            Gl(e.type) ? ((yo = u), (Dt = Be(n.firstChild))) : (Dt = u)),
          le(t, e, e.pendingProps.children, l),
          fi(t, e),
          t === null && (e.flags |= 4194304),
          e.child
        );
      case 5:
        return (
          t === null &&
            pt &&
            ((u = n = Dt) &&
              ((n = tg(n, e.type, e.pendingProps, ke)),
              n !== null
                ? ((e.stateNode = n), (te = e), (Dt = Be(n.firstChild)), (ke = !1), (u = !0))
                : (u = !1)),
            u || Cl(e)),
          ya(e),
          (u = e.type),
          (i = e.pendingProps),
          (f = t !== null ? t.memoizedProps : null),
          (n = i.children),
          oo(u, i) ? (n = null) : f !== null && oo(u, f) && (e.flags |= 32),
          e.memoizedState !== null && ((u = ss(t, e, y0, null, null, l)), (au._currentValue = u)),
          fi(t, e),
          le(t, e, n, l),
          e.child
        );
      case 6:
        return (
          t === null &&
            pt &&
            ((t = l = Dt) &&
              ((l = eg(l, e.pendingProps, ke)),
              l !== null ? ((e.stateNode = l), (te = e), (Dt = null), (t = !0)) : (t = !1)),
            t || Cl(e)),
          null
        );
      case 13:
        return Vd(t, e, l);
      case 4:
        return (
          ie(e, e.stateNode.containerInfo),
          (n = e.pendingProps),
          t === null ? (e.child = fn(e, null, n, l)) : le(t, e, n, l),
          e.child
        );
      case 11:
        return wd(t, e, e.type, e.pendingProps, l);
      case 7:
        return (le(t, e, e.pendingProps, l), e.child);
      case 8:
        return (le(t, e, e.pendingProps.children, l), e.child);
      case 12:
        return (le(t, e, e.pendingProps.children, l), e.child);
      case 10:
        return ((n = e.pendingProps), Ml(e, e.type, n.value), le(t, e, n.children, l), e.child);
      case 9:
        return (
          (u = e.type._context),
          (n = e.pendingProps.children),
          cn(e),
          (u = ee(u)),
          (n = n(u)),
          (e.flags |= 1),
          le(t, e, n, l),
          e.child
        );
      case 14:
        return Bd(t, e, e.type, e.pendingProps, l);
      case 15:
        return Ud(t, e, e.type, e.pendingProps, l);
      case 19:
        return Zd(t, e, l);
      case 31:
        return E0(t, e, l);
      case 22:
        return Ld(t, e, l, e.pendingProps);
      case 24:
        return (
          cn(e),
          (n = ee(Qt)),
          t === null
            ? ((u = Fc()),
              u === null &&
                ((u = Ot),
                (i = Wc()),
                (u.pooledCache = i),
                i.refCount++,
                i !== null && (u.pooledCacheLanes |= l),
                (u = i)),
              (e.memoizedState = { parent: n, cache: u }),
              ts(e),
              Ml(e, Qt, u))
            : ((t.lanes & l) !== 0 && (es(t, e), La(e, null, null, l), Ua()),
              (u = t.memoizedState),
              (i = e.memoizedState),
              u.parent !== n
                ? ((u = { parent: n, cache: n }),
                  (e.memoizedState = u),
                  e.lanes === 0 && (e.memoizedState = e.updateQueue.baseState = u),
                  Ml(e, Qt, n))
                : ((n = i.cache), Ml(e, Qt, n), n !== u.cache && Jc(e, [Qt], l, !0))),
          le(t, e, e.pendingProps.children, l),
          e.child
        );
      case 29:
        throw e.pendingProps;
    }
    throw Error(s(156, e.tag));
  }
  function sl(t) {
    t.flags |= 4;
  }
  function Bs(t, e, l, n, u) {
    if (((e = (t.mode & 32) !== 0) && (e = !1), e)) {
      if (((t.flags |= 16777216), (u & 335544128) === u))
        if (t.stateNode.complete) t.flags |= 8192;
        else if (bm()) t.flags |= 8192;
        else throw ((rn = Wu), Pc);
    } else t.flags &= -16777217;
  }
  function $d(t, e) {
    if (e.type !== 'stylesheet' || (e.state.loading & 4) !== 0) t.flags &= -16777217;
    else if (((t.flags |= 16777216), !oh(e)))
      if (bm()) t.flags |= 8192;
      else throw ((rn = Wu), Pc);
  }
  function mi(t, e) {
    (e !== null && (t.flags |= 4),
      t.flags & 16384 && ((e = t.tag !== 22 ? Ar() : 536870912), (t.lanes |= e), (Jn |= e)));
  }
  function Va(t, e) {
    if (!pt)
      switch (t.tailMode) {
        case 'hidden':
          e = t.tail;
          for (var l = null; e !== null; ) (e.alternate !== null && (l = e), (e = e.sibling));
          l === null ? (t.tail = null) : (l.sibling = null);
          break;
        case 'collapsed':
          l = t.tail;
          for (var n = null; l !== null; ) (l.alternate !== null && (n = l), (l = l.sibling));
          n === null
            ? e || t.tail === null
              ? (t.tail = null)
              : (t.tail.sibling = null)
            : (n.sibling = null);
      }
  }
  function kt(t) {
    var e = t.alternate !== null && t.alternate.child === t.child,
      l = 0,
      n = 0;
    if (e)
      for (var u = t.child; u !== null; )
        ((l |= u.lanes | u.childLanes),
          (n |= u.subtreeFlags & 65011712),
          (n |= u.flags & 65011712),
          (u.return = t),
          (u = u.sibling));
    else
      for (u = t.child; u !== null; )
        ((l |= u.lanes | u.childLanes),
          (n |= u.subtreeFlags),
          (n |= u.flags),
          (u.return = t),
          (u = u.sibling));
    return ((t.subtreeFlags |= n), (t.childLanes = l), e);
  }
  function N0(t, e, l) {
    var n = e.pendingProps;
    switch ((Vc(e), e.tag)) {
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return (kt(e), null);
      case 1:
        return (kt(e), null);
      case 3:
        return (
          (l = e.stateNode),
          (n = null),
          t !== null && (n = t.memoizedState.cache),
          e.memoizedState.cache !== n && (e.flags |= 2048),
          al(Qt),
          Yt(),
          l.pendingContext && ((l.context = l.pendingContext), (l.pendingContext = null)),
          (t === null || t.child === null) &&
            (Bn(e)
              ? sl(e)
              : t === null ||
                (t.memoizedState.isDehydrated && (e.flags & 256) === 0) ||
                ((e.flags |= 1024), Zc())),
          kt(e),
          null
        );
      case 26:
        var u = e.type,
          i = e.memoizedState;
        return (
          t === null
            ? (sl(e), i !== null ? (kt(e), $d(e, i)) : (kt(e), Bs(e, u, null, n, l)))
            : i
              ? i !== t.memoizedState
                ? (sl(e), kt(e), $d(e, i))
                : (kt(e), (e.flags &= -16777217))
              : ((t = t.memoizedProps), t !== n && sl(e), kt(e), Bs(e, u, t, n, l)),
          null
        );
      case 27:
        if ((Tu(e), (l = ft.current), (u = e.type), t !== null && e.stateNode != null))
          t.memoizedProps !== n && sl(e);
        else {
          if (!n) {
            if (e.stateNode === null) throw Error(s(166));
            return (kt(e), null);
          }
          ((t = F.current), Bn(e) ? Cf(e) : ((t = eh(u, n, l)), (e.stateNode = t), sl(e)));
        }
        return (kt(e), null);
      case 5:
        if ((Tu(e), (u = e.type), t !== null && e.stateNode != null))
          t.memoizedProps !== n && sl(e);
        else {
          if (!n) {
            if (e.stateNode === null) throw Error(s(166));
            return (kt(e), null);
          }
          if (((i = F.current), Bn(e))) Cf(e);
          else {
            var f = Mi(ft.current);
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
                      typeof n.is == 'string'
                        ? f.createElement('select', { is: n.is })
                        : f.createElement('select')),
                      n.multiple ? (i.multiple = !0) : n.size && (i.size = n.size));
                    break;
                  default:
                    i =
                      typeof n.is == 'string'
                        ? f.createElement(u, { is: n.is })
                        : f.createElement(u);
                }
            }
            ((i[Pt] = e), (i[oe] = n));
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
            t: switch ((ne(i, u, n), u)) {
              case 'button':
              case 'input':
              case 'select':
              case 'textarea':
                n = !!n.autoFocus;
                break t;
              case 'img':
                n = !0;
                break t;
              default:
                n = !1;
            }
            n && sl(e);
          }
        }
        return (kt(e), Bs(e, e.type, t === null ? null : t.memoizedProps, e.pendingProps, l), null);
      case 6:
        if (t && e.stateNode != null) t.memoizedProps !== n && sl(e);
        else {
          if (typeof n != 'string' && e.stateNode === null) throw Error(s(166));
          if (((t = ft.current), Bn(e))) {
            if (((t = e.stateNode), (l = e.memoizedProps), (n = null), (u = te), u !== null))
              switch (u.tag) {
                case 27:
                case 5:
                  n = u.memoizedProps;
              }
            ((t[Pt] = e),
              (t = !!(
                t.nodeValue === l ||
                (n !== null && n.suppressHydrationWarning === !0) ||
                Vm(t.nodeValue, l)
              )),
              t || Cl(e, !0));
          } else ((t = Mi(t).createTextNode(n)), (t[Pt] = e), (e.stateNode = t));
        }
        return (kt(e), null);
      case 31:
        if (((l = e.memoizedState), t === null || t.memoizedState !== null)) {
          if (((n = Bn(e)), l !== null)) {
            if (t === null) {
              if (!n) throw Error(s(318));
              if (((t = e.memoizedState), (t = t !== null ? t.dehydrated : null), !t))
                throw Error(s(557));
              t[Pt] = e;
            } else (an(), (e.flags & 128) === 0 && (e.memoizedState = null), (e.flags |= 4));
            (kt(e), (t = !1));
          } else
            ((l = Zc()),
              t !== null && t.memoizedState !== null && (t.memoizedState.hydrationErrors = l),
              (t = !0));
          if (!t) return e.flags & 256 ? (xe(e), e) : (xe(e), null);
          if ((e.flags & 128) !== 0) throw Error(s(558));
        }
        return (kt(e), null);
      case 13:
        if (
          ((n = e.memoizedState),
          t === null || (t.memoizedState !== null && t.memoizedState.dehydrated !== null))
        ) {
          if (((u = Bn(e)), n !== null && n.dehydrated !== null)) {
            if (t === null) {
              if (!u) throw Error(s(318));
              if (((u = e.memoizedState), (u = u !== null ? u.dehydrated : null), !u))
                throw Error(s(317));
              u[Pt] = e;
            } else (an(), (e.flags & 128) === 0 && (e.memoizedState = null), (e.flags |= 4));
            (kt(e), (u = !1));
          } else
            ((u = Zc()),
              t !== null && t.memoizedState !== null && (t.memoizedState.hydrationErrors = u),
              (u = !0));
          if (!u) return e.flags & 256 ? (xe(e), e) : (xe(e), null);
        }
        return (
          xe(e),
          (e.flags & 128) !== 0
            ? ((e.lanes = l), e)
            : ((l = n !== null),
              (t = t !== null && t.memoizedState !== null),
              l &&
                ((n = e.child),
                (u = null),
                n.alternate !== null &&
                  n.alternate.memoizedState !== null &&
                  n.alternate.memoizedState.cachePool !== null &&
                  (u = n.alternate.memoizedState.cachePool.pool),
                (i = null),
                n.memoizedState !== null &&
                  n.memoizedState.cachePool !== null &&
                  (i = n.memoizedState.cachePool.pool),
                i !== u && (n.flags |= 2048)),
              l !== t && l && (e.child.flags |= 8192),
              mi(e, e.updateQueue),
              kt(e),
              null)
        );
      case 4:
        return (Yt(), t === null && ao(e.stateNode.containerInfo), kt(e), null);
      case 10:
        return (al(e.type), kt(e), null);
      case 19:
        if ((q(Xt), (n = e.memoizedState), n === null)) return (kt(e), null);
        if (((u = (e.flags & 128) !== 0), (i = n.rendering), i === null))
          if (u) Va(n, !1);
          else {
            if (Gt !== 0 || (t !== null && (t.flags & 128) !== 0))
              for (t = e.child; t !== null; ) {
                if (((i = ti(t)), i !== null)) {
                  for (
                    e.flags |= 128,
                      Va(n, !1),
                      t = i.updateQueue,
                      e.updateQueue = t,
                      mi(e, t),
                      e.subtreeFlags = 0,
                      t = l,
                      l = e.child;
                    l !== null;
                  )
                    (xf(l, t), (l = l.sibling));
                  return (W(Xt, (Xt.current & 1) | 2), pt && ll(e, n.treeForkCount), e.child);
                }
                t = t.sibling;
              }
            n.tail !== null &&
              pe() > vi &&
              ((e.flags |= 128), (u = !0), Va(n, !1), (e.lanes = 4194304));
          }
        else {
          if (!u)
            if (((t = ti(i)), t !== null)) {
              if (
                ((e.flags |= 128),
                (u = !0),
                (t = t.updateQueue),
                (e.updateQueue = t),
                mi(e, t),
                Va(n, !0),
                n.tail === null && n.tailMode === 'hidden' && !i.alternate && !pt)
              )
                return (kt(e), null);
            } else
              2 * pe() - n.renderingStartTime > vi &&
                l !== 536870912 &&
                ((e.flags |= 128), (u = !0), Va(n, !1), (e.lanes = 4194304));
          n.isBackwards
            ? ((i.sibling = e.child), (e.child = i))
            : ((t = n.last), t !== null ? (t.sibling = i) : (e.child = i), (n.last = i));
        }
        return n.tail !== null
          ? ((t = n.tail),
            (n.rendering = t),
            (n.tail = t.sibling),
            (n.renderingStartTime = pe()),
            (t.sibling = null),
            (l = Xt.current),
            W(Xt, u ? (l & 1) | 2 : l & 1),
            pt && ll(e, n.treeForkCount),
            t)
          : (kt(e), null);
      case 22:
      case 23:
        return (
          xe(e),
          us(),
          (n = e.memoizedState !== null),
          t !== null
            ? (t.memoizedState !== null) !== n && (e.flags |= 8192)
            : n && (e.flags |= 8192),
          n
            ? (l & 536870912) !== 0 &&
              (e.flags & 128) === 0 &&
              (kt(e), e.subtreeFlags & 6 && (e.flags |= 8192))
            : kt(e),
          (l = e.updateQueue),
          l !== null && mi(e, l.retryQueue),
          (l = null),
          t !== null &&
            t.memoizedState !== null &&
            t.memoizedState.cachePool !== null &&
            (l = t.memoizedState.cachePool.pool),
          (n = null),
          e.memoizedState !== null &&
            e.memoizedState.cachePool !== null &&
            (n = e.memoizedState.cachePool.pool),
          n !== l && (e.flags |= 2048),
          t !== null && q(sn),
          null
        );
      case 24:
        return (
          (l = null),
          t !== null && (l = t.memoizedState.cache),
          e.memoizedState.cache !== l && (e.flags |= 2048),
          al(Qt),
          kt(e),
          null
        );
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(s(156, e.tag));
  }
  function A0(t, e) {
    switch ((Vc(e), e.tag)) {
      case 1:
        return ((t = e.flags), t & 65536 ? ((e.flags = (t & -65537) | 128), e) : null);
      case 3:
        return (
          al(Qt),
          Yt(),
          (t = e.flags),
          (t & 65536) !== 0 && (t & 128) === 0 ? ((e.flags = (t & -65537) | 128), e) : null
        );
      case 26:
      case 27:
      case 5:
        return (Tu(e), null);
      case 31:
        if (e.memoizedState !== null) {
          if ((xe(e), e.alternate === null)) throw Error(s(340));
          an();
        }
        return ((t = e.flags), t & 65536 ? ((e.flags = (t & -65537) | 128), e) : null);
      case 13:
        if ((xe(e), (t = e.memoizedState), t !== null && t.dehydrated !== null)) {
          if (e.alternate === null) throw Error(s(340));
          an();
        }
        return ((t = e.flags), t & 65536 ? ((e.flags = (t & -65537) | 128), e) : null);
      case 19:
        return (q(Xt), null);
      case 4:
        return (Yt(), null);
      case 10:
        return (al(e.type), null);
      case 22:
      case 23:
        return (
          xe(e),
          us(),
          t !== null && q(sn),
          (t = e.flags),
          t & 65536 ? ((e.flags = (t & -65537) | 128), e) : null
        );
      case 24:
        return (al(Qt), null);
      case 25:
        return null;
      default:
        return null;
    }
  }
  function Jd(t, e) {
    switch ((Vc(e), e.tag)) {
      case 3:
        (al(Qt), Yt());
        break;
      case 26:
      case 27:
      case 5:
        Tu(e);
        break;
      case 4:
        Yt();
        break;
      case 31:
        e.memoizedState !== null && xe(e);
        break;
      case 13:
        xe(e);
        break;
      case 19:
        q(Xt);
        break;
      case 10:
        al(e.type);
        break;
      case 22:
      case 23:
        (xe(e), us(), t !== null && q(sn));
        break;
      case 24:
        al(Qt);
    }
  }
  function Qa(t, e) {
    try {
      var l = e.updateQueue,
        n = l !== null ? l.lastEffect : null;
      if (n !== null) {
        var u = n.next;
        l = u;
        do {
          if ((l.tag & t) === t) {
            n = void 0;
            var i = l.create,
              f = l.inst;
            ((n = i()), (f.destroy = n));
          }
          l = l.next;
        } while (l !== u);
      }
    } catch (y) {
      Ct(e, e.return, y);
    }
  }
  function kl(t, e, l) {
    try {
      var n = e.updateQueue,
        u = n !== null ? n.lastEffect : null;
      if (u !== null) {
        var i = u.next;
        n = i;
        do {
          if ((n.tag & t) === t) {
            var f = n.inst,
              y = f.destroy;
            if (y !== void 0) {
              ((f.destroy = void 0), (u = e));
              var _ = l,
                M = y;
              try {
                M();
              } catch (B) {
                Ct(u, _, B);
              }
            }
          }
          n = n.next;
        } while (n !== i);
      }
    } catch (B) {
      Ct(e, e.return, B);
    }
  }
  function Wd(t) {
    var e = t.updateQueue;
    if (e !== null) {
      var l = t.stateNode;
      try {
        qf(e, l);
      } catch (n) {
        Ct(t, t.return, n);
      }
    }
  }
  function Id(t, e, l) {
    ((l.props = mn(t.type, t.memoizedProps)), (l.state = t.memoizedState));
    try {
      l.componentWillUnmount();
    } catch (n) {
      Ct(t, e, n);
    }
  }
  function Za(t, e) {
    try {
      var l = t.ref;
      if (l !== null) {
        switch (t.tag) {
          case 26:
          case 27:
          case 5:
            var n = t.stateNode;
            break;
          case 30:
            n = t.stateNode;
            break;
          default:
            n = t.stateNode;
        }
        typeof l == 'function' ? (t.refCleanup = l(n)) : (l.current = n);
      }
    } catch (u) {
      Ct(t, e, u);
    }
  }
  function $e(t, e) {
    var l = t.ref,
      n = t.refCleanup;
    if (l !== null)
      if (typeof n == 'function')
        try {
          n();
        } catch (u) {
          Ct(t, e, u);
        } finally {
          ((t.refCleanup = null), (t = t.alternate), t != null && (t.refCleanup = null));
        }
      else if (typeof l == 'function')
        try {
          l(null);
        } catch (u) {
          Ct(t, e, u);
        }
      else l.current = null;
  }
  function Fd(t) {
    var e = t.type,
      l = t.memoizedProps,
      n = t.stateNode;
    try {
      t: switch (e) {
        case 'button':
        case 'input':
        case 'select':
        case 'textarea':
          l.autoFocus && n.focus();
          break t;
        case 'img':
          l.src ? (n.src = l.src) : l.srcSet && (n.srcset = l.srcSet);
      }
    } catch (u) {
      Ct(t, t.return, u);
    }
  }
  function Us(t, e, l) {
    try {
      var n = t.stateNode;
      ($0(n, t.type, l, e), (n[oe] = e));
    } catch (u) {
      Ct(t, t.return, u);
    }
  }
  function Pd(t) {
    return (
      t.tag === 5 || t.tag === 3 || t.tag === 26 || (t.tag === 27 && Gl(t.type)) || t.tag === 4
    );
  }
  function Ls(t) {
    t: for (;;) {
      for (; t.sibling === null; ) {
        if (t.return === null || Pd(t.return)) return null;
        t = t.return;
      }
      for (
        t.sibling.return = t.return, t = t.sibling;
        t.tag !== 5 && t.tag !== 6 && t.tag !== 18;
      ) {
        if ((t.tag === 27 && Gl(t.type)) || t.flags & 2 || t.child === null || t.tag === 4)
          continue t;
        ((t.child.return = t), (t = t.child));
      }
      if (!(t.flags & 2)) return t.stateNode;
    }
  }
  function Hs(t, e, l) {
    var n = t.tag;
    if (n === 5 || n === 6)
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
            l != null || e.onclick !== null || (e.onclick = Pe)));
    else if (
      n !== 4 &&
      (n === 27 && Gl(t.type) && ((l = t.stateNode), (e = null)), (t = t.child), t !== null)
    )
      for (Hs(t, e, l), t = t.sibling; t !== null; ) (Hs(t, e, l), (t = t.sibling));
  }
  function hi(t, e, l) {
    var n = t.tag;
    if (n === 5 || n === 6) ((t = t.stateNode), e ? l.insertBefore(t, e) : l.appendChild(t));
    else if (n !== 4 && (n === 27 && Gl(t.type) && (l = t.stateNode), (t = t.child), t !== null))
      for (hi(t, e, l), t = t.sibling; t !== null; ) (hi(t, e, l), (t = t.sibling));
  }
  function tm(t) {
    var e = t.stateNode,
      l = t.memoizedProps;
    try {
      for (var n = t.type, u = e.attributes; u.length; ) e.removeAttributeNode(u[0]);
      (ne(e, n, l), (e[Pt] = t), (e[oe] = l));
    } catch (i) {
      Ct(t, t.return, i);
    }
  }
  var ol = !1,
    $t = !1,
    qs = !1,
    em = typeof WeakSet == 'function' ? WeakSet : Set,
    Ft = null;
  function C0(t, e) {
    if (((t = t.containerInfo), (co = wi), (t = mf(t)), Dc(t))) {
      if ('selectionStart' in t) var l = { start: t.selectionStart, end: t.selectionEnd };
      else
        t: {
          l = ((l = t.ownerDocument) && l.defaultView) || window;
          var n = l.getSelection && l.getSelection();
          if (n && n.rangeCount !== 0) {
            l = n.anchorNode;
            var u = n.anchorOffset,
              i = n.focusNode;
            n = n.focusOffset;
            try {
              (l.nodeType, i.nodeType);
            } catch {
              l = null;
              break t;
            }
            var f = 0,
              y = -1,
              _ = -1,
              M = 0,
              B = 0,
              G = t,
              z = null;
            e: for (;;) {
              for (
                var j;
                G !== l || (u !== 0 && G.nodeType !== 3) || (y = f + u),
                  G !== i || (n !== 0 && G.nodeType !== 3) || (_ = f + n),
                  G.nodeType === 3 && (f += G.nodeValue.length),
                  (j = G.firstChild) !== null;
              )
                ((z = G), (G = j));
              for (;;) {
                if (G === t) break e;
                if (
                  (z === l && ++M === u && (y = f),
                  z === i && ++B === n && (_ = f),
                  (j = G.nextSibling) !== null)
                )
                  break;
                ((G = z), (z = G.parentNode));
              }
              G = j;
            }
            l = y === -1 || _ === -1 ? null : { start: y, end: _ };
          } else l = null;
        }
      l = l || { start: 0, end: 0 };
    } else l = null;
    for (so = { focusedElem: t, selectionRange: l }, wi = !1, Ft = e; Ft !== null; )
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
                  (n = l.stateNode));
                try {
                  var I = mn(l.type, u);
                  ((t = n.getSnapshotBeforeUpdate(I, i)),
                    (n.__reactInternalSnapshotBeforeUpdate = t));
                } catch (lt) {
                  Ct(l, l.return, lt);
                }
              }
              break;
            case 3:
              if ((t & 1024) !== 0) {
                if (((t = e.stateNode.containerInfo), (l = t.nodeType), l === 9)) fo(t);
                else if (l === 1)
                  switch (t.nodeName) {
                    case 'HEAD':
                    case 'HTML':
                    case 'BODY':
                      fo(t);
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
  function lm(t, e, l) {
    var n = l.flags;
    switch (l.tag) {
      case 0:
      case 11:
      case 15:
        (fl(t, l), n & 4 && Qa(5, l));
        break;
      case 1:
        if ((fl(t, l), n & 4))
          if (((t = l.stateNode), e === null))
            try {
              t.componentDidMount();
            } catch (f) {
              Ct(l, l.return, f);
            }
          else {
            var u = mn(l.type, e.memoizedProps);
            e = e.memoizedState;
            try {
              t.componentDidUpdate(u, e, t.__reactInternalSnapshotBeforeUpdate);
            } catch (f) {
              Ct(l, l.return, f);
            }
          }
        (n & 64 && Wd(l), n & 512 && Za(l, l.return));
        break;
      case 3:
        if ((fl(t, l), n & 64 && ((t = l.updateQueue), t !== null))) {
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
            qf(t, e);
          } catch (f) {
            Ct(l, l.return, f);
          }
        }
        break;
      case 27:
        e === null && n & 4 && tm(l);
      case 26:
      case 5:
        (fl(t, l), e === null && n & 4 && Fd(l), n & 512 && Za(l, l.return));
        break;
      case 12:
        fl(t, l);
        break;
      case 31:
        (fl(t, l), n & 4 && um(t, l));
        break;
      case 13:
        (fl(t, l),
          n & 4 && im(t, l),
          n & 64 &&
            ((t = l.memoizedState),
            t !== null && ((t = t.dehydrated), t !== null && ((l = B0.bind(null, l)), lg(t, l)))));
        break;
      case 22:
        if (((n = l.memoizedState !== null || ol), !n)) {
          ((e = (e !== null && e.memoizedState !== null) || $t), (u = ol));
          var i = $t;
          ((ol = n),
            ($t = e) && !i ? dl(t, l, (l.subtreeFlags & 8772) !== 0) : fl(t, l),
            (ol = u),
            ($t = i));
        }
        break;
      case 30:
        break;
      default:
        fl(t, l);
    }
  }
  function nm(t) {
    var e = t.alternate;
    (e !== null && ((t.alternate = null), nm(e)),
      (t.child = null),
      (t.deletions = null),
      (t.sibling = null),
      t.tag === 5 && ((e = t.stateNode), e !== null && pc(e)),
      (t.stateNode = null),
      (t.return = null),
      (t.dependencies = null),
      (t.memoizedProps = null),
      (t.memoizedState = null),
      (t.pendingProps = null),
      (t.stateNode = null),
      (t.updateQueue = null));
  }
  var wt = null,
    fe = !1;
  function rl(t, e, l) {
    for (l = l.child; l !== null; ) (am(t, e, l), (l = l.sibling));
  }
  function am(t, e, l) {
    if (ge && typeof ge.onCommitFiberUnmount == 'function')
      try {
        ge.onCommitFiberUnmount(pa, l);
      } catch {}
    switch (l.tag) {
      case 26:
        ($t || $e(l, e),
          rl(t, e, l),
          l.memoizedState
            ? l.memoizedState.count--
            : l.stateNode && ((l = l.stateNode), l.parentNode.removeChild(l)));
        break;
      case 27:
        $t || $e(l, e);
        var n = wt,
          u = fe;
        (Gl(l.type) && ((wt = l.stateNode), (fe = !1)),
          rl(t, e, l),
          eu(l.stateNode),
          (wt = n),
          (fe = u));
        break;
      case 5:
        $t || $e(l, e);
      case 6:
        if (((n = wt), (u = fe), (wt = null), rl(t, e, l), (wt = n), (fe = u), wt !== null))
          if (fe)
            try {
              (wt.nodeType === 9
                ? wt.body
                : wt.nodeName === 'HTML'
                  ? wt.ownerDocument.body
                  : wt
              ).removeChild(l.stateNode);
            } catch (i) {
              Ct(l, e, i);
            }
          else
            try {
              wt.removeChild(l.stateNode);
            } catch (i) {
              Ct(l, e, i);
            }
        break;
      case 18:
        wt !== null &&
          (fe
            ? ((t = wt),
              Wm(
                t.nodeType === 9 ? t.body : t.nodeName === 'HTML' ? t.ownerDocument.body : t,
                l.stateNode
              ),
              na(t))
            : Wm(wt, l.stateNode));
        break;
      case 4:
        ((n = wt),
          (u = fe),
          (wt = l.stateNode.containerInfo),
          (fe = !0),
          rl(t, e, l),
          (wt = n),
          (fe = u));
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        (kl(2, l, e), $t || kl(4, l, e), rl(t, e, l));
        break;
      case 1:
        ($t ||
          ($e(l, e), (n = l.stateNode), typeof n.componentWillUnmount == 'function' && Id(l, e, n)),
          rl(t, e, l));
        break;
      case 21:
        rl(t, e, l);
        break;
      case 22:
        (($t = (n = $t) || l.memoizedState !== null), rl(t, e, l), ($t = n));
        break;
      default:
        rl(t, e, l);
    }
  }
  function um(t, e) {
    if (
      e.memoizedState === null &&
      ((t = e.alternate), t !== null && ((t = t.memoizedState), t !== null))
    ) {
      t = t.dehydrated;
      try {
        na(t);
      } catch (l) {
        Ct(e, e.return, l);
      }
    }
  }
  function im(t, e) {
    if (
      e.memoizedState === null &&
      ((t = e.alternate),
      t !== null && ((t = t.memoizedState), t !== null && ((t = t.dehydrated), t !== null)))
    )
      try {
        na(t);
      } catch (l) {
        Ct(e, e.return, l);
      }
  }
  function M0(t) {
    switch (t.tag) {
      case 31:
      case 13:
      case 19:
        var e = t.stateNode;
        return (e === null && (e = t.stateNode = new em()), e);
      case 22:
        return (
          (t = t.stateNode),
          (e = t._retryCache),
          e === null && (e = t._retryCache = new em()),
          e
        );
      default:
        throw Error(s(435, t.tag));
    }
  }
  function yi(t, e) {
    var l = M0(t);
    e.forEach(function (n) {
      if (!l.has(n)) {
        l.add(n);
        var u = U0.bind(null, t, n);
        n.then(u, u);
      }
    });
  }
  function de(t, e) {
    var l = e.deletions;
    if (l !== null)
      for (var n = 0; n < l.length; n++) {
        var u = l[n],
          i = t,
          f = e,
          y = f;
        t: for (; y !== null; ) {
          switch (y.tag) {
            case 27:
              if (Gl(y.type)) {
                ((wt = y.stateNode), (fe = !1));
                break t;
              }
              break;
            case 5:
              ((wt = y.stateNode), (fe = !1));
              break t;
            case 3:
            case 4:
              ((wt = y.stateNode.containerInfo), (fe = !0));
              break t;
          }
          y = y.return;
        }
        if (wt === null) throw Error(s(160));
        (am(i, f, u),
          (wt = null),
          (fe = !1),
          (i = u.alternate),
          i !== null && (i.return = null),
          (u.return = null));
      }
    if (e.subtreeFlags & 13886) for (e = e.child; e !== null; ) (cm(e, t), (e = e.sibling));
  }
  var qe = null;
  function cm(t, e) {
    var l = t.alternate,
      n = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        (de(e, t), me(t), n & 4 && (kl(3, t, t.return), Qa(3, t), kl(5, t, t.return)));
        break;
      case 1:
        (de(e, t),
          me(t),
          n & 512 && ($t || l === null || $e(l, l.return)),
          n & 64 &&
            ol &&
            ((t = t.updateQueue),
            t !== null &&
              ((n = t.callbacks),
              n !== null &&
                ((l = t.shared.hiddenCallbacks),
                (t.shared.hiddenCallbacks = l === null ? n : l.concat(n))))));
        break;
      case 26:
        var u = qe;
        if ((de(e, t), me(t), n & 512 && ($t || l === null || $e(l, l.return)), n & 4)) {
          var i = l !== null ? l.memoizedState : null;
          if (((n = t.memoizedState), l === null))
            if (n === null)
              if (t.stateNode === null) {
                t: {
                  ((n = t.type), (l = t.memoizedProps), (u = u.ownerDocument || u));
                  e: switch (n) {
                    case 'title':
                      ((i = u.getElementsByTagName('title')[0]),
                        (!i ||
                          i[_a] ||
                          i[Pt] ||
                          i.namespaceURI === 'http://www.w3.org/2000/svg' ||
                          i.hasAttribute('itemprop')) &&
                          ((i = u.createElement(n)),
                          u.head.insertBefore(i, u.querySelector('head > title'))),
                        ne(i, n, l),
                        (i[Pt] = t),
                        It(i),
                        (n = i));
                      break t;
                    case 'link':
                      var f = ch('link', 'href', u).get(n + (l.href || ''));
                      if (f) {
                        for (var y = 0; y < f.length; y++)
                          if (
                            ((i = f[y]),
                            i.getAttribute('href') ===
                              (l.href == null || l.href === '' ? null : l.href) &&
                              i.getAttribute('rel') === (l.rel == null ? null : l.rel) &&
                              i.getAttribute('title') === (l.title == null ? null : l.title) &&
                              i.getAttribute('crossorigin') ===
                                (l.crossOrigin == null ? null : l.crossOrigin))
                          ) {
                            f.splice(y, 1);
                            break e;
                          }
                      }
                      ((i = u.createElement(n)), ne(i, n, l), u.head.appendChild(i));
                      break;
                    case 'meta':
                      if ((f = ch('meta', 'content', u).get(n + (l.content || '')))) {
                        for (y = 0; y < f.length; y++)
                          if (
                            ((i = f[y]),
                            i.getAttribute('content') ===
                              (l.content == null ? null : '' + l.content) &&
                              i.getAttribute('name') === (l.name == null ? null : l.name) &&
                              i.getAttribute('property') ===
                                (l.property == null ? null : l.property) &&
                              i.getAttribute('http-equiv') ===
                                (l.httpEquiv == null ? null : l.httpEquiv) &&
                              i.getAttribute('charset') === (l.charSet == null ? null : l.charSet))
                          ) {
                            f.splice(y, 1);
                            break e;
                          }
                      }
                      ((i = u.createElement(n)), ne(i, n, l), u.head.appendChild(i));
                      break;
                    default:
                      throw Error(s(468, n));
                  }
                  ((i[Pt] = t), It(i), (n = i));
                }
                t.stateNode = n;
              } else sh(u, t.type, t.stateNode);
            else t.stateNode = ih(u, n, t.memoizedProps);
          else
            i !== n
              ? (i === null
                  ? l.stateNode !== null && ((l = l.stateNode), l.parentNode.removeChild(l))
                  : i.count--,
                n === null ? sh(u, t.type, t.stateNode) : ih(u, n, t.memoizedProps))
              : n === null && t.stateNode !== null && Us(t, t.memoizedProps, l.memoizedProps);
        }
        break;
      case 27:
        (de(e, t),
          me(t),
          n & 512 && ($t || l === null || $e(l, l.return)),
          l !== null && n & 4 && Us(t, t.memoizedProps, l.memoizedProps));
        break;
      case 5:
        if ((de(e, t), me(t), n & 512 && ($t || l === null || $e(l, l.return)), t.flags & 32)) {
          u = t.stateNode;
          try {
            An(u, '');
          } catch (I) {
            Ct(t, t.return, I);
          }
        }
        (n & 4 &&
          t.stateNode != null &&
          ((u = t.memoizedProps), Us(t, u, l !== null ? l.memoizedProps : u)),
          n & 1024 && (qs = !0));
        break;
      case 6:
        if ((de(e, t), me(t), n & 4)) {
          if (t.stateNode === null) throw Error(s(162));
          ((n = t.memoizedProps), (l = t.stateNode));
          try {
            l.nodeValue = n;
          } catch (I) {
            Ct(t, t.return, I);
          }
        }
        break;
      case 3:
        if (
          ((ji = null),
          (u = qe),
          (qe = Ri(e.containerInfo)),
          de(e, t),
          (qe = u),
          me(t),
          n & 4 && l !== null && l.memoizedState.isDehydrated)
        )
          try {
            na(e.containerInfo);
          } catch (I) {
            Ct(t, t.return, I);
          }
        qs && ((qs = !1), sm(t));
        break;
      case 4:
        ((n = qe), (qe = Ri(t.stateNode.containerInfo)), de(e, t), me(t), (qe = n));
        break;
      case 12:
        (de(e, t), me(t));
        break;
      case 31:
        (de(e, t),
          me(t),
          n & 4 && ((n = t.updateQueue), n !== null && ((t.updateQueue = null), yi(t, n))));
        break;
      case 13:
        (de(e, t),
          me(t),
          t.child.flags & 8192 &&
            (t.memoizedState !== null) != (l !== null && l.memoizedState !== null) &&
            (gi = pe()),
          n & 4 && ((n = t.updateQueue), n !== null && ((t.updateQueue = null), yi(t, n))));
        break;
      case 22:
        u = t.memoizedState !== null;
        var _ = l !== null && l.memoizedState !== null,
          M = ol,
          B = $t;
        if (((ol = M || u), ($t = B || _), de(e, t), ($t = B), (ol = M), me(t), n & 8192))
          t: for (
            e = t.stateNode,
              e._visibility = u ? e._visibility & -2 : e._visibility | 1,
              u && (l === null || _ || ol || $t || hn(t)),
              l = null,
              e = t;
            ;
          ) {
            if (e.tag === 5 || e.tag === 26) {
              if (l === null) {
                _ = l = e;
                try {
                  if (((i = _.stateNode), u))
                    ((f = i.style),
                      typeof f.setProperty == 'function'
                        ? f.setProperty('display', 'none', 'important')
                        : (f.display = 'none'));
                  else {
                    y = _.stateNode;
                    var G = _.memoizedProps.style,
                      z = G != null && G.hasOwnProperty('display') ? G.display : null;
                    y.style.display = z == null || typeof z == 'boolean' ? '' : ('' + z).trim();
                  }
                } catch (I) {
                  Ct(_, _.return, I);
                }
              }
            } else if (e.tag === 6) {
              if (l === null) {
                _ = e;
                try {
                  _.stateNode.nodeValue = u ? '' : _.memoizedProps;
                } catch (I) {
                  Ct(_, _.return, I);
                }
              }
            } else if (e.tag === 18) {
              if (l === null) {
                _ = e;
                try {
                  var j = _.stateNode;
                  u ? Im(j, !0) : Im(_.stateNode, !1);
                } catch (I) {
                  Ct(_, _.return, I);
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
        n & 4 &&
          ((n = t.updateQueue),
          n !== null && ((l = n.retryQueue), l !== null && ((n.retryQueue = null), yi(t, l))));
        break;
      case 19:
        (de(e, t),
          me(t),
          n & 4 && ((n = t.updateQueue), n !== null && ((t.updateQueue = null), yi(t, n))));
        break;
      case 30:
        break;
      case 21:
        break;
      default:
        (de(e, t), me(t));
    }
  }
  function me(t) {
    var e = t.flags;
    if (e & 2) {
      try {
        for (var l, n = t.return; n !== null; ) {
          if (Pd(n)) {
            l = n;
            break;
          }
          n = n.return;
        }
        if (l == null) throw Error(s(160));
        switch (l.tag) {
          case 27:
            var u = l.stateNode,
              i = Ls(t);
            hi(t, i, u);
            break;
          case 5:
            var f = l.stateNode;
            l.flags & 32 && (An(f, ''), (l.flags &= -33));
            var y = Ls(t);
            hi(t, y, f);
            break;
          case 3:
          case 4:
            var _ = l.stateNode.containerInfo,
              M = Ls(t);
            Hs(t, M, _);
            break;
          default:
            throw Error(s(161));
        }
      } catch (B) {
        Ct(t, t.return, B);
      }
      t.flags &= -3;
    }
    e & 4096 && (t.flags &= -4097);
  }
  function sm(t) {
    if (t.subtreeFlags & 1024)
      for (t = t.child; t !== null; ) {
        var e = t;
        (sm(e), e.tag === 5 && e.flags & 1024 && e.stateNode.reset(), (t = t.sibling));
      }
  }
  function fl(t, e) {
    if (e.subtreeFlags & 8772)
      for (e = e.child; e !== null; ) (lm(t, e.alternate, e), (e = e.sibling));
  }
  function hn(t) {
    for (t = t.child; t !== null; ) {
      var e = t;
      switch (e.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          (kl(4, e, e.return), hn(e));
          break;
        case 1:
          $e(e, e.return);
          var l = e.stateNode;
          (typeof l.componentWillUnmount == 'function' && Id(e, e.return, l), hn(e));
          break;
        case 27:
          eu(e.stateNode);
        case 26:
        case 5:
          ($e(e, e.return), hn(e));
          break;
        case 22:
          e.memoizedState === null && hn(e);
          break;
        case 30:
          hn(e);
          break;
        default:
          hn(e);
      }
      t = t.sibling;
    }
  }
  function dl(t, e, l) {
    for (l = l && (e.subtreeFlags & 8772) !== 0, e = e.child; e !== null; ) {
      var n = e.alternate,
        u = t,
        i = e,
        f = i.flags;
      switch (i.tag) {
        case 0:
        case 11:
        case 15:
          (dl(u, i, l), Qa(4, i));
          break;
        case 1:
          if ((dl(u, i, l), (n = i), (u = n.stateNode), typeof u.componentDidMount == 'function'))
            try {
              u.componentDidMount();
            } catch (M) {
              Ct(n, n.return, M);
            }
          if (((n = i), (u = n.updateQueue), u !== null)) {
            var y = n.stateNode;
            try {
              var _ = u.shared.hiddenCallbacks;
              if (_ !== null)
                for (u.shared.hiddenCallbacks = null, u = 0; u < _.length; u++) Hf(_[u], y);
            } catch (M) {
              Ct(n, n.return, M);
            }
          }
          (l && f & 64 && Wd(i), Za(i, i.return));
          break;
        case 27:
          tm(i);
        case 26:
        case 5:
          (dl(u, i, l), l && n === null && f & 4 && Fd(i), Za(i, i.return));
          break;
        case 12:
          dl(u, i, l);
          break;
        case 31:
          (dl(u, i, l), l && f & 4 && um(u, i));
          break;
        case 13:
          (dl(u, i, l), l && f & 4 && im(u, i));
          break;
        case 22:
          (i.memoizedState === null && dl(u, i, l), Za(i, i.return));
          break;
        case 30:
          break;
        default:
          dl(u, i, l);
      }
      e = e.sibling;
    }
  }
  function Gs(t, e) {
    var l = null;
    (t !== null &&
      t.memoizedState !== null &&
      t.memoizedState.cachePool !== null &&
      (l = t.memoizedState.cachePool.pool),
      (t = null),
      e.memoizedState !== null &&
        e.memoizedState.cachePool !== null &&
        (t = e.memoizedState.cachePool.pool),
      t !== l && (t != null && t.refCount++, l != null && Oa(l)));
  }
  function Ys(t, e) {
    ((t = null),
      e.alternate !== null && (t = e.alternate.memoizedState.cache),
      (e = e.memoizedState.cache),
      e !== t && (e.refCount++, t != null && Oa(t)));
  }
  function Ge(t, e, l, n) {
    if (e.subtreeFlags & 10256) for (e = e.child; e !== null; ) (om(t, e, l, n), (e = e.sibling));
  }
  function om(t, e, l, n) {
    var u = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        (Ge(t, e, l, n), u & 2048 && Qa(9, e));
        break;
      case 1:
        Ge(t, e, l, n);
        break;
      case 3:
        (Ge(t, e, l, n),
          u & 2048 &&
            ((t = null),
            e.alternate !== null && (t = e.alternate.memoizedState.cache),
            (e = e.memoizedState.cache),
            e !== t && (e.refCount++, t != null && Oa(t))));
        break;
      case 12:
        if (u & 2048) {
          (Ge(t, e, l, n), (t = e.stateNode));
          try {
            var i = e.memoizedProps,
              f = i.id,
              y = i.onPostCommit;
            typeof y == 'function' &&
              y(f, e.alternate === null ? 'mount' : 'update', t.passiveEffectDuration, -0);
          } catch (_) {
            Ct(e, e.return, _);
          }
        } else Ge(t, e, l, n);
        break;
      case 31:
        Ge(t, e, l, n);
        break;
      case 13:
        Ge(t, e, l, n);
        break;
      case 23:
        break;
      case 22:
        ((i = e.stateNode),
          (f = e.alternate),
          e.memoizedState !== null
            ? i._visibility & 2
              ? Ge(t, e, l, n)
              : Ka(t, e)
            : i._visibility & 2
              ? Ge(t, e, l, n)
              : ((i._visibility |= 2), Zn(t, e, l, n, (e.subtreeFlags & 10256) !== 0 || !1)),
          u & 2048 && Gs(f, e));
        break;
      case 24:
        (Ge(t, e, l, n), u & 2048 && Ys(e.alternate, e));
        break;
      default:
        Ge(t, e, l, n);
    }
  }
  function Zn(t, e, l, n, u) {
    for (u = u && ((e.subtreeFlags & 10256) !== 0 || !1), e = e.child; e !== null; ) {
      var i = t,
        f = e,
        y = l,
        _ = n,
        M = f.flags;
      switch (f.tag) {
        case 0:
        case 11:
        case 15:
          (Zn(i, f, y, _, u), Qa(8, f));
          break;
        case 23:
          break;
        case 22:
          var B = f.stateNode;
          (f.memoizedState !== null
            ? B._visibility & 2
              ? Zn(i, f, y, _, u)
              : Ka(i, f)
            : ((B._visibility |= 2), Zn(i, f, y, _, u)),
            u && M & 2048 && Gs(f.alternate, f));
          break;
        case 24:
          (Zn(i, f, y, _, u), u && M & 2048 && Ys(f.alternate, f));
          break;
        default:
          Zn(i, f, y, _, u);
      }
      e = e.sibling;
    }
  }
  function Ka(t, e) {
    if (e.subtreeFlags & 10256)
      for (e = e.child; e !== null; ) {
        var l = t,
          n = e,
          u = n.flags;
        switch (n.tag) {
          case 22:
            (Ka(l, n), u & 2048 && Gs(n.alternate, n));
            break;
          case 24:
            (Ka(l, n), u & 2048 && Ys(n.alternate, n));
            break;
          default:
            Ka(l, n);
        }
        e = e.sibling;
      }
  }
  var $a = 8192;
  function Kn(t, e, l) {
    if (t.subtreeFlags & $a) for (t = t.child; t !== null; ) (rm(t, e, l), (t = t.sibling));
  }
  function rm(t, e, l) {
    switch (t.tag) {
      case 26:
        (Kn(t, e, l),
          t.flags & $a && t.memoizedState !== null && hg(l, qe, t.memoizedState, t.memoizedProps));
        break;
      case 5:
        Kn(t, e, l);
        break;
      case 3:
      case 4:
        var n = qe;
        ((qe = Ri(t.stateNode.containerInfo)), Kn(t, e, l), (qe = n));
        break;
      case 22:
        t.memoizedState === null &&
          ((n = t.alternate),
          n !== null && n.memoizedState !== null
            ? ((n = $a), ($a = 16777216), Kn(t, e, l), ($a = n))
            : Kn(t, e, l));
        break;
      default:
        Kn(t, e, l);
    }
  }
  function fm(t) {
    var e = t.alternate;
    if (e !== null && ((t = e.child), t !== null)) {
      e.child = null;
      do ((e = t.sibling), (t.sibling = null), (t = e));
      while (t !== null);
    }
  }
  function Ja(t) {
    var e = t.deletions;
    if ((t.flags & 16) !== 0) {
      if (e !== null)
        for (var l = 0; l < e.length; l++) {
          var n = e[l];
          ((Ft = n), mm(n, t));
        }
      fm(t);
    }
    if (t.subtreeFlags & 10256) for (t = t.child; t !== null; ) (dm(t), (t = t.sibling));
  }
  function dm(t) {
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        (Ja(t), t.flags & 2048 && kl(9, t, t.return));
        break;
      case 3:
        Ja(t);
        break;
      case 12:
        Ja(t);
        break;
      case 22:
        var e = t.stateNode;
        t.memoizedState !== null && e._visibility & 2 && (t.return === null || t.return.tag !== 13)
          ? ((e._visibility &= -3), pi(t))
          : Ja(t);
        break;
      default:
        Ja(t);
    }
  }
  function pi(t) {
    var e = t.deletions;
    if ((t.flags & 16) !== 0) {
      if (e !== null)
        for (var l = 0; l < e.length; l++) {
          var n = e[l];
          ((Ft = n), mm(n, t));
        }
      fm(t);
    }
    for (t = t.child; t !== null; ) {
      switch (((e = t), e.tag)) {
        case 0:
        case 11:
        case 15:
          (kl(8, e, e.return), pi(e));
          break;
        case 22:
          ((l = e.stateNode), l._visibility & 2 && ((l._visibility &= -3), pi(e)));
          break;
        default:
          pi(e);
      }
      t = t.sibling;
    }
  }
  function mm(t, e) {
    for (; Ft !== null; ) {
      var l = Ft;
      switch (l.tag) {
        case 0:
        case 11:
        case 15:
          kl(8, l, e);
          break;
        case 23:
        case 22:
          if (l.memoizedState !== null && l.memoizedState.cachePool !== null) {
            var n = l.memoizedState.cachePool.pool;
            n != null && n.refCount++;
          }
          break;
        case 24:
          Oa(l.memoizedState.cache);
      }
      if (((n = l.child), n !== null)) ((n.return = l), (Ft = n));
      else
        t: for (l = t; Ft !== null; ) {
          n = Ft;
          var u = n.sibling,
            i = n.return;
          if ((nm(n), n === l)) {
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
  var R0 = {
      getCacheForType: function (t) {
        var e = ee(Qt),
          l = e.data.get(t);
        return (l === void 0 && ((l = t()), e.data.set(t, l)), l);
      },
      cacheSignal: function () {
        return ee(Qt).controller.signal;
      },
    },
    z0 = typeof WeakMap == 'function' ? WeakMap : Map,
    xt = 0,
    Ot = null,
    dt = null,
    ht = 0,
    At = 0,
    Ee = null,
    wl = !1,
    $n = !1,
    Xs = !1,
    ml = 0,
    Gt = 0,
    Bl = 0,
    yn = 0,
    Vs = 0,
    Te = 0,
    Jn = 0,
    Wa = null,
    he = null,
    Qs = !1,
    gi = 0,
    hm = 0,
    vi = 1 / 0,
    _i = null,
    Ul = null,
    Jt = 0,
    Ll = null,
    Wn = null,
    hl = 0,
    Zs = 0,
    Ks = null,
    ym = null,
    Ia = 0,
    $s = null;
  function Ne() {
    return (xt & 2) !== 0 && ht !== 0 ? ht & -ht : U.T !== null ? to() : zr();
  }
  function pm() {
    if (Te === 0)
      if ((ht & 536870912) === 0 || pt) {
        var t = Cu;
        ((Cu <<= 1), (Cu & 3932160) === 0 && (Cu = 262144), (Te = t));
      } else Te = 536870912;
    return ((t = Se.current), t !== null && (t.flags |= 32), Te);
  }
  function ye(t, e, l) {
    (((t === Ot && (At === 2 || At === 9)) || t.cancelPendingCommit !== null) &&
      (In(t, 0), Hl(t, ht, Te, !1)),
      va(t, l),
      ((xt & 2) === 0 || t !== Ot) &&
        (t === Ot && ((xt & 2) === 0 && (yn |= l), Gt === 4 && Hl(t, ht, Te, !1)), Je(t)));
  }
  function gm(t, e, l) {
    if ((xt & 6) !== 0) throw Error(s(327));
    var n = (!l && (e & 127) === 0 && (e & t.expiredLanes) === 0) || ga(t, e),
      u = n ? D0(t, e) : Ws(t, e, !0),
      i = n;
    do {
      if (u === 0) {
        $n && !n && Hl(t, e, 0, !1);
        break;
      } else {
        if (((l = t.current.alternate), i && !j0(l))) {
          ((u = Ws(t, e, !1)), (i = !1));
          continue;
        }
        if (u === 2) {
          if (((i = e), t.errorRecoveryDisabledLanes & i)) var f = 0;
          else
            ((f = t.pendingLanes & -536870913), (f = f !== 0 ? f : f & 536870912 ? 536870912 : 0));
          if (f !== 0) {
            e = f;
            t: {
              var y = t;
              u = Wa;
              var _ = y.current.memoizedState.isDehydrated;
              if ((_ && (In(y, f).flags |= 256), (f = Ws(y, f, !1)), f !== 2)) {
                if (Xs && !_) {
                  ((y.errorRecoveryDisabledLanes |= i), (yn |= i), (u = 4));
                  break t;
                }
                ((i = he), (he = u), i !== null && (he === null ? (he = i) : he.push.apply(he, i)));
              }
              u = f;
            }
            if (((i = !1), u !== 2)) continue;
          }
        }
        if (u === 1) {
          (In(t, 0), Hl(t, e, 0, !0));
          break;
        }
        t: {
          switch (((n = t), (i = u), i)) {
            case 0:
            case 1:
              throw Error(s(345));
            case 4:
              if ((e & 4194048) !== e) break;
            case 6:
              Hl(n, e, Te, !wl);
              break t;
            case 2:
              he = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(s(329));
          }
          if ((e & 62914560) === e && ((u = gi + 300 - pe()), 10 < u)) {
            if ((Hl(n, e, Te, !wl), Ru(n, 0, !0) !== 0)) break t;
            ((hl = e),
              (n.timeoutHandle = $m(
                vm.bind(null, n, l, he, _i, Qs, e, Te, yn, Jn, wl, i, 'Throttled', -0, 0),
                u
              )));
            break t;
          }
          vm(n, l, he, _i, Qs, e, Te, yn, Jn, wl, i, null, -0, 0);
        }
      }
      break;
    } while (!0);
    Je(t);
  }
  function vm(t, e, l, n, u, i, f, y, _, M, B, G, z, j) {
    if (((t.timeoutHandle = -1), (G = e.subtreeFlags), G & 8192 || (G & 16785408) === 16785408)) {
      ((G = {
        stylesheets: null,
        count: 0,
        imgCount: 0,
        imgBytes: 0,
        suspenseyImages: [],
        waitingForImages: !0,
        waitingForViewTransition: !1,
        unsuspend: Pe,
      }),
        rm(e, i, G));
      var I = (i & 62914560) === i ? gi - pe() : (i & 4194048) === i ? hm - pe() : 0;
      if (((I = yg(G, I)), I !== null)) {
        ((hl = i),
          (t.cancelPendingCommit = I(Am.bind(null, t, e, i, l, n, u, f, y, _, B, G, null, z, j))),
          Hl(t, i, f, !M));
        return;
      }
    }
    Am(t, e, i, l, n, u, f, y, _);
  }
  function j0(t) {
    for (var e = t; ; ) {
      var l = e.tag;
      if (
        (l === 0 || l === 11 || l === 15) &&
        e.flags & 16384 &&
        ((l = e.updateQueue), l !== null && ((l = l.stores), l !== null))
      )
        for (var n = 0; n < l.length; n++) {
          var u = l[n],
            i = u.getSnapshot;
          u = u.value;
          try {
            if (!_e(i(), u)) return !1;
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
  function Hl(t, e, l, n) {
    ((e &= ~Vs),
      (e &= ~yn),
      (t.suspendedLanes |= e),
      (t.pingedLanes &= ~e),
      n && (t.warmLanes |= e),
      (n = t.expirationTimes));
    for (var u = e; 0 < u; ) {
      var i = 31 - ve(u),
        f = 1 << i;
      ((n[i] = -1), (u &= ~f));
    }
    l !== 0 && Cr(t, l, e);
  }
  function bi() {
    return (xt & 6) === 0 ? (Fa(0), !1) : !0;
  }
  function Js() {
    if (dt !== null) {
      if (At === 0) var t = dt.return;
      else ((t = dt), (nl = un = null), fs(t), (Gn = null), (ka = 0), (t = dt));
      for (; t !== null; ) (Jd(t.alternate, t), (t = t.return));
      dt = null;
    }
  }
  function In(t, e) {
    var l = t.timeoutHandle;
    (l !== -1 && ((t.timeoutHandle = -1), I0(l)),
      (l = t.cancelPendingCommit),
      l !== null && ((t.cancelPendingCommit = null), l()),
      (hl = 0),
      Js(),
      (Ot = t),
      (dt = l = el(t.current, null)),
      (ht = e),
      (At = 0),
      (Ee = null),
      (wl = !1),
      ($n = ga(t, e)),
      (Xs = !1),
      (Jn = Te = Vs = yn = Bl = Gt = 0),
      (he = Wa = null),
      (Qs = !1),
      (e & 8) !== 0 && (e |= e & 32));
    var n = t.entangledLanes;
    if (n !== 0)
      for (t = t.entanglements, n &= e; 0 < n; ) {
        var u = 31 - ve(n),
          i = 1 << u;
        ((e |= t[u]), (n &= ~i));
      }
    return ((ml = e), Gu(), l);
  }
  function _m(t, e) {
    ((st = null),
      (U.H = Ya),
      e === qn || e === Ju
        ? ((e = wf()), (At = 3))
        : e === Pc
          ? ((e = wf()), (At = 4))
          : (At =
              e === Cs
                ? 8
                : e !== null && typeof e == 'object' && typeof e.then == 'function'
                  ? 6
                  : 1),
      (Ee = e),
      dt === null && ((Gt = 1), oi(t, je(e, t.current))));
  }
  function bm() {
    var t = Se.current;
    return t === null
      ? !0
      : (ht & 4194048) === ht
        ? we === null
        : (ht & 62914560) === ht || (ht & 536870912) !== 0
          ? t === we
          : !1;
  }
  function Sm() {
    var t = U.H;
    return ((U.H = Ya), t === null ? Ya : t);
  }
  function xm() {
    var t = U.A;
    return ((U.A = R0), t);
  }
  function Si() {
    ((Gt = 4),
      wl || ((ht & 4194048) !== ht && Se.current !== null) || ($n = !0),
      ((Bl & 134217727) === 0 && (yn & 134217727) === 0) || Ot === null || Hl(Ot, ht, Te, !1));
  }
  function Ws(t, e, l) {
    var n = xt;
    xt |= 2;
    var u = Sm(),
      i = xm();
    ((Ot !== t || ht !== e) && ((_i = null), In(t, e)), (e = !1));
    var f = Gt;
    t: do
      try {
        if (At !== 0 && dt !== null) {
          var y = dt,
            _ = Ee;
          switch (At) {
            case 8:
              (Js(), (f = 6));
              break t;
            case 3:
            case 2:
            case 9:
            case 6:
              Se.current === null && (e = !0);
              var M = At;
              if (((At = 0), (Ee = null), Fn(t, y, _, M), l && $n)) {
                f = 0;
                break t;
              }
              break;
            default:
              ((M = At), (At = 0), (Ee = null), Fn(t, y, _, M));
          }
        }
        (O0(), (f = Gt));
        break;
      } catch (B) {
        _m(t, B);
      }
    while (!0);
    return (
      e && t.shellSuspendCounter++,
      (nl = un = null),
      (xt = n),
      (U.H = u),
      (U.A = i),
      dt === null && ((Ot = null), (ht = 0), Gu()),
      f
    );
  }
  function O0() {
    for (; dt !== null; ) Em(dt);
  }
  function D0(t, e) {
    var l = xt;
    xt |= 2;
    var n = Sm(),
      u = xm();
    Ot !== t || ht !== e ? ((_i = null), (vi = pe() + 500), In(t, e)) : ($n = ga(t, e));
    t: do
      try {
        if (At !== 0 && dt !== null) {
          e = dt;
          var i = Ee;
          e: switch (At) {
            case 1:
              ((At = 0), (Ee = null), Fn(t, e, i, 1));
              break;
            case 2:
            case 9:
              if (Df(i)) {
                ((At = 0), (Ee = null), Tm(e));
                break;
              }
              ((e = function () {
                ((At !== 2 && At !== 9) || Ot !== t || (At = 7), Je(t));
              }),
                i.then(e, e));
              break t;
            case 3:
              At = 7;
              break t;
            case 4:
              At = 5;
              break t;
            case 7:
              Df(i) ? ((At = 0), (Ee = null), Tm(e)) : ((At = 0), (Ee = null), Fn(t, e, i, 7));
              break;
            case 5:
              var f = null;
              switch (dt.tag) {
                case 26:
                  f = dt.memoizedState;
                case 5:
                case 27:
                  var y = dt;
                  if (f ? oh(f) : y.stateNode.complete) {
                    ((At = 0), (Ee = null));
                    var _ = y.sibling;
                    if (_ !== null) dt = _;
                    else {
                      var M = y.return;
                      M !== null ? ((dt = M), xi(M)) : (dt = null);
                    }
                    break e;
                  }
              }
              ((At = 0), (Ee = null), Fn(t, e, i, 5));
              break;
            case 6:
              ((At = 0), (Ee = null), Fn(t, e, i, 6));
              break;
            case 8:
              (Js(), (Gt = 6));
              break t;
            default:
              throw Error(s(462));
          }
        }
        k0();
        break;
      } catch (B) {
        _m(t, B);
      }
    while (!0);
    return (
      (nl = un = null),
      (U.H = n),
      (U.A = u),
      (xt = l),
      dt !== null ? 0 : ((Ot = null), (ht = 0), Gu(), Gt)
    );
  }
  function k0() {
    for (; dt !== null && !np(); ) Em(dt);
  }
  function Em(t) {
    var e = Kd(t.alternate, t, ml);
    ((t.memoizedProps = t.pendingProps), e === null ? xi(t) : (dt = e));
  }
  function Tm(t) {
    var e = t,
      l = e.alternate;
    switch (e.tag) {
      case 15:
      case 0:
        e = Gd(l, e, e.pendingProps, e.type, void 0, ht);
        break;
      case 11:
        e = Gd(l, e, e.pendingProps, e.type.render, e.ref, ht);
        break;
      case 5:
        fs(e);
      default:
        (Jd(l, e), (e = dt = xf(e, ml)), (e = Kd(l, e, ml)));
    }
    ((t.memoizedProps = t.pendingProps), e === null ? xi(t) : (dt = e));
  }
  function Fn(t, e, l, n) {
    ((nl = un = null), fs(e), (Gn = null), (ka = 0));
    var u = e.return;
    try {
      if (x0(t, u, e, l, ht)) {
        ((Gt = 1), oi(t, je(l, t.current)), (dt = null));
        return;
      }
    } catch (i) {
      if (u !== null) throw ((dt = u), i);
      ((Gt = 1), oi(t, je(l, t.current)), (dt = null));
      return;
    }
    e.flags & 32768
      ? (pt || n === 1
          ? (t = !0)
          : $n || (ht & 536870912) !== 0
            ? (t = !1)
            : ((wl = t = !0),
              (n === 2 || n === 9 || n === 3 || n === 6) &&
                ((n = Se.current), n !== null && n.tag === 13 && (n.flags |= 16384))),
        Nm(e, t))
      : xi(e);
  }
  function xi(t) {
    var e = t;
    do {
      if ((e.flags & 32768) !== 0) {
        Nm(e, wl);
        return;
      }
      t = e.return;
      var l = N0(e.alternate, e, ml);
      if (l !== null) {
        dt = l;
        return;
      }
      if (((e = e.sibling), e !== null)) {
        dt = e;
        return;
      }
      dt = e = t;
    } while (e !== null);
    Gt === 0 && (Gt = 5);
  }
  function Nm(t, e) {
    do {
      var l = A0(t.alternate, t);
      if (l !== null) {
        ((l.flags &= 32767), (dt = l));
        return;
      }
      if (
        ((l = t.return),
        l !== null && ((l.flags |= 32768), (l.subtreeFlags = 0), (l.deletions = null)),
        !e && ((t = t.sibling), t !== null))
      ) {
        dt = t;
        return;
      }
      dt = t = l;
    } while (t !== null);
    ((Gt = 6), (dt = null));
  }
  function Am(t, e, l, n, u, i, f, y, _) {
    t.cancelPendingCommit = null;
    do Ei();
    while (Jt !== 0);
    if ((xt & 6) !== 0) throw Error(s(327));
    if (e !== null) {
      if (e === t.current) throw Error(s(177));
      if (
        ((i = e.lanes | e.childLanes),
        (i |= Lc),
        mp(t, l, i, f, y, _),
        t === Ot && ((dt = Ot = null), (ht = 0)),
        (Wn = e),
        (Ll = t),
        (hl = l),
        (Zs = i),
        (Ks = u),
        (ym = n),
        (e.subtreeFlags & 10256) !== 0 || (e.flags & 10256) !== 0
          ? ((t.callbackNode = null),
            (t.callbackPriority = 0),
            L0(Nu, function () {
              return (jm(), null);
            }))
          : ((t.callbackNode = null), (t.callbackPriority = 0)),
        (n = (e.flags & 13878) !== 0),
        (e.subtreeFlags & 13878) !== 0 || n)
      ) {
        ((n = U.T), (U.T = null), (u = R.p), (R.p = 2), (f = xt), (xt |= 4));
        try {
          C0(t, e, l);
        } finally {
          ((xt = f), (R.p = u), (U.T = n));
        }
      }
      ((Jt = 1), Cm(), Mm(), Rm());
    }
  }
  function Cm() {
    if (Jt === 1) {
      Jt = 0;
      var t = Ll,
        e = Wn,
        l = (e.flags & 13878) !== 0;
      if ((e.subtreeFlags & 13878) !== 0 || l) {
        ((l = U.T), (U.T = null));
        var n = R.p;
        R.p = 2;
        var u = xt;
        xt |= 4;
        try {
          cm(e, t);
          var i = so,
            f = mf(t.containerInfo),
            y = i.focusedElem,
            _ = i.selectionRange;
          if (f !== y && y && y.ownerDocument && df(y.ownerDocument.documentElement, y)) {
            if (_ !== null && Dc(y)) {
              var M = _.start,
                B = _.end;
              if ((B === void 0 && (B = M), 'selectionStart' in y))
                ((y.selectionStart = M), (y.selectionEnd = Math.min(B, y.value.length)));
              else {
                var G = y.ownerDocument || document,
                  z = (G && G.defaultView) || window;
                if (z.getSelection) {
                  var j = z.getSelection(),
                    I = y.textContent.length,
                    lt = Math.min(_.start, I),
                    jt = _.end === void 0 ? lt : Math.min(_.end, I);
                  !j.extend && lt > jt && ((f = jt), (jt = lt), (lt = f));
                  var A = ff(y, lt),
                    x = ff(y, jt);
                  if (
                    A &&
                    x &&
                    (j.rangeCount !== 1 ||
                      j.anchorNode !== A.node ||
                      j.anchorOffset !== A.offset ||
                      j.focusNode !== x.node ||
                      j.focusOffset !== x.offset)
                  ) {
                    var C = G.createRange();
                    (C.setStart(A.node, A.offset),
                      j.removeAllRanges(),
                      lt > jt
                        ? (j.addRange(C), j.extend(x.node, x.offset))
                        : (C.setEnd(x.node, x.offset), j.addRange(C)));
                  }
                }
              }
            }
            for (G = [], j = y; (j = j.parentNode); )
              j.nodeType === 1 && G.push({ element: j, left: j.scrollLeft, top: j.scrollTop });
            for (typeof y.focus == 'function' && y.focus(), y = 0; y < G.length; y++) {
              var H = G[y];
              ((H.element.scrollLeft = H.left), (H.element.scrollTop = H.top));
            }
          }
          ((wi = !!co), (so = co = null));
        } finally {
          ((xt = u), (R.p = n), (U.T = l));
        }
      }
      ((t.current = e), (Jt = 2));
    }
  }
  function Mm() {
    if (Jt === 2) {
      Jt = 0;
      var t = Ll,
        e = Wn,
        l = (e.flags & 8772) !== 0;
      if ((e.subtreeFlags & 8772) !== 0 || l) {
        ((l = U.T), (U.T = null));
        var n = R.p;
        R.p = 2;
        var u = xt;
        xt |= 4;
        try {
          lm(t, e.alternate, e);
        } finally {
          ((xt = u), (R.p = n), (U.T = l));
        }
      }
      Jt = 3;
    }
  }
  function Rm() {
    if (Jt === 4 || Jt === 3) {
      ((Jt = 0), ap());
      var t = Ll,
        e = Wn,
        l = hl,
        n = ym;
      (e.subtreeFlags & 10256) !== 0 || (e.flags & 10256) !== 0
        ? (Jt = 5)
        : ((Jt = 0), (Wn = Ll = null), zm(t, t.pendingLanes));
      var u = t.pendingLanes;
      if (
        (u === 0 && (Ul = null),
        hc(l),
        (e = e.stateNode),
        ge && typeof ge.onCommitFiberRoot == 'function')
      )
        try {
          ge.onCommitFiberRoot(pa, e, void 0, (e.current.flags & 128) === 128);
        } catch {}
      if (n !== null) {
        ((e = U.T), (u = R.p), (R.p = 2), (U.T = null));
        try {
          for (var i = t.onRecoverableError, f = 0; f < n.length; f++) {
            var y = n[f];
            i(y.value, { componentStack: y.stack });
          }
        } finally {
          ((U.T = e), (R.p = u));
        }
      }
      ((hl & 3) !== 0 && Ei(),
        Je(t),
        (u = t.pendingLanes),
        (l & 261930) !== 0 && (u & 42) !== 0 ? (t === $s ? Ia++ : ((Ia = 0), ($s = t))) : (Ia = 0),
        Fa(0));
    }
  }
  function zm(t, e) {
    (t.pooledCacheLanes &= e) === 0 &&
      ((e = t.pooledCache), e != null && ((t.pooledCache = null), Oa(e)));
  }
  function Ei() {
    return (Cm(), Mm(), Rm(), jm());
  }
  function jm() {
    if (Jt !== 5) return !1;
    var t = Ll,
      e = Zs;
    Zs = 0;
    var l = hc(hl),
      n = U.T,
      u = R.p;
    try {
      ((R.p = 32 > l ? 32 : l), (U.T = null), (l = Ks), (Ks = null));
      var i = Ll,
        f = hl;
      if (((Jt = 0), (Wn = Ll = null), (hl = 0), (xt & 6) !== 0)) throw Error(s(331));
      var y = xt;
      if (
        ((xt |= 4),
        dm(i.current),
        om(i, i.current, f, l),
        (xt = y),
        Fa(0, !1),
        ge && typeof ge.onPostCommitFiberRoot == 'function')
      )
        try {
          ge.onPostCommitFiberRoot(pa, i);
        } catch {}
      return !0;
    } finally {
      ((R.p = u), (U.T = n), zm(t, e));
    }
  }
  function Om(t, e, l) {
    ((e = je(l, e)),
      (e = As(t.stateNode, e, 2)),
      (t = jl(t, e, 2)),
      t !== null && (va(t, 2), Je(t)));
  }
  function Ct(t, e, l) {
    if (t.tag === 3) Om(t, t, l);
    else
      for (; e !== null; ) {
        if (e.tag === 3) {
          Om(e, t, l);
          break;
        } else if (e.tag === 1) {
          var n = e.stateNode;
          if (
            typeof e.type.getDerivedStateFromError == 'function' ||
            (typeof n.componentDidCatch == 'function' && (Ul === null || !Ul.has(n)))
          ) {
            ((t = je(l, t)),
              (l = Dd(2)),
              (n = jl(e, l, 2)),
              n !== null && (kd(l, n, e, t), va(n, 2), Je(n)));
            break;
          }
        }
        e = e.return;
      }
  }
  function Is(t, e, l) {
    var n = t.pingCache;
    if (n === null) {
      n = t.pingCache = new z0();
      var u = new Set();
      n.set(e, u);
    } else ((u = n.get(e)), u === void 0 && ((u = new Set()), n.set(e, u)));
    u.has(l) || ((Xs = !0), u.add(l), (t = w0.bind(null, t, e, l)), e.then(t, t));
  }
  function w0(t, e, l) {
    var n = t.pingCache;
    (n !== null && n.delete(e),
      (t.pingedLanes |= t.suspendedLanes & l),
      (t.warmLanes &= ~l),
      Ot === t &&
        (ht & l) === l &&
        (Gt === 4 || (Gt === 3 && (ht & 62914560) === ht && 300 > pe() - gi)
          ? (xt & 2) === 0 && In(t, 0)
          : (Vs |= l),
        Jn === ht && (Jn = 0)),
      Je(t));
  }
  function Dm(t, e) {
    (e === 0 && (e = Ar()), (t = ln(t, e)), t !== null && (va(t, e), Je(t)));
  }
  function B0(t) {
    var e = t.memoizedState,
      l = 0;
    (e !== null && (l = e.retryLane), Dm(t, l));
  }
  function U0(t, e) {
    var l = 0;
    switch (t.tag) {
      case 31:
      case 13:
        var n = t.stateNode,
          u = t.memoizedState;
        u !== null && (l = u.retryLane);
        break;
      case 19:
        n = t.stateNode;
        break;
      case 22:
        n = t.stateNode._retryCache;
        break;
      default:
        throw Error(s(314));
    }
    (n !== null && n.delete(e), Dm(t, l));
  }
  function L0(t, e) {
    return rc(t, e);
  }
  var Ti = null,
    Pn = null,
    Fs = !1,
    Ni = !1,
    Ps = !1,
    ql = 0;
  function Je(t) {
    (t !== Pn && t.next === null && (Pn === null ? (Ti = Pn = t) : (Pn = Pn.next = t)),
      (Ni = !0),
      Fs || ((Fs = !0), q0()));
  }
  function Fa(t, e) {
    if (!Ps && Ni) {
      Ps = !0;
      do
        for (var l = !1, n = Ti; n !== null; ) {
          if (t !== 0) {
            var u = n.pendingLanes;
            if (u === 0) var i = 0;
            else {
              var f = n.suspendedLanes,
                y = n.pingedLanes;
              ((i = (1 << (31 - ve(42 | t) + 1)) - 1),
                (i &= u & ~(f & ~y)),
                (i = i & 201326741 ? (i & 201326741) | 1 : i ? i | 2 : 0));
            }
            i !== 0 && ((l = !0), Um(n, i));
          } else
            ((i = ht),
              (i = Ru(
                n,
                n === Ot ? i : 0,
                n.cancelPendingCommit !== null || n.timeoutHandle !== -1
              )),
              (i & 3) === 0 || ga(n, i) || ((l = !0), Um(n, i)));
          n = n.next;
        }
      while (l);
      Ps = !1;
    }
  }
  function H0() {
    km();
  }
  function km() {
    Ni = Fs = !1;
    var t = 0;
    ql !== 0 && W0() && (t = ql);
    for (var e = pe(), l = null, n = Ti; n !== null; ) {
      var u = n.next,
        i = wm(n, e);
      (i === 0
        ? ((n.next = null), l === null ? (Ti = u) : (l.next = u), u === null && (Pn = l))
        : ((l = n), (t !== 0 || (i & 3) !== 0) && (Ni = !0)),
        (n = u));
    }
    ((Jt !== 0 && Jt !== 5) || Fa(t), ql !== 0 && (ql = 0));
  }
  function wm(t, e) {
    for (
      var l = t.suspendedLanes,
        n = t.pingedLanes,
        u = t.expirationTimes,
        i = t.pendingLanes & -62914561;
      0 < i;
    ) {
      var f = 31 - ve(i),
        y = 1 << f,
        _ = u[f];
      (_ === -1
        ? ((y & l) === 0 || (y & n) !== 0) && (u[f] = dp(y, e))
        : _ <= e && (t.expiredLanes |= y),
        (i &= ~y));
    }
    if (
      ((e = Ot),
      (l = ht),
      (l = Ru(t, t === e ? l : 0, t.cancelPendingCommit !== null || t.timeoutHandle !== -1)),
      (n = t.callbackNode),
      l === 0 || (t === e && (At === 2 || At === 9)) || t.cancelPendingCommit !== null)
    )
      return (n !== null && n !== null && fc(n), (t.callbackNode = null), (t.callbackPriority = 0));
    if ((l & 3) === 0 || ga(t, l)) {
      if (((e = l & -l), e === t.callbackPriority)) return e;
      switch ((n !== null && fc(n), hc(l))) {
        case 2:
        case 8:
          l = Tr;
          break;
        case 32:
          l = Nu;
          break;
        case 268435456:
          l = Nr;
          break;
        default:
          l = Nu;
      }
      return (
        (n = Bm.bind(null, t)),
        (l = rc(l, n)),
        (t.callbackPriority = e),
        (t.callbackNode = l),
        e
      );
    }
    return (
      n !== null && n !== null && fc(n),
      (t.callbackPriority = 2),
      (t.callbackNode = null),
      2
    );
  }
  function Bm(t, e) {
    if (Jt !== 0 && Jt !== 5) return ((t.callbackNode = null), (t.callbackPriority = 0), null);
    var l = t.callbackNode;
    if (Ei() && t.callbackNode !== l) return null;
    var n = ht;
    return (
      (n = Ru(t, t === Ot ? n : 0, t.cancelPendingCommit !== null || t.timeoutHandle !== -1)),
      n === 0
        ? null
        : (gm(t, n, e),
          wm(t, pe()),
          t.callbackNode != null && t.callbackNode === l ? Bm.bind(null, t) : null)
    );
  }
  function Um(t, e) {
    if (Ei()) return null;
    gm(t, e, !0);
  }
  function q0() {
    F0(function () {
      (xt & 6) !== 0 ? rc(Er, H0) : km();
    });
  }
  function to() {
    if (ql === 0) {
      var t = Ln;
      (t === 0 && ((t = Au), (Au <<= 1), (Au & 261888) === 0 && (Au = 256)), (ql = t));
    }
    return ql;
  }
  function Lm(t) {
    return t == null || typeof t == 'symbol' || typeof t == 'boolean'
      ? null
      : typeof t == 'function'
        ? t
        : Du('' + t);
  }
  function Hm(t, e) {
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
  function G0(t, e, l, n, u) {
    if (e === 'submit' && l && l.stateNode === u) {
      var i = Lm((u[oe] || null).action),
        f = n.submitter;
      f &&
        ((e = (e = f[oe] || null) ? Lm(e.formAction) : f.getAttribute('formAction')),
        e !== null && ((i = e), (f = null)));
      var y = new Uu('action', 'action', null, n, u);
      t.push({
        event: y,
        listeners: [
          {
            instance: null,
            listener: function () {
              if (n.defaultPrevented) {
                if (ql !== 0) {
                  var _ = f ? Hm(u, f) : new FormData(u);
                  bs(l, { pending: !0, data: _, method: u.method, action: i }, null, _);
                }
              } else
                typeof i == 'function' &&
                  (y.preventDefault(),
                  (_ = f ? Hm(u, f) : new FormData(u)),
                  bs(l, { pending: !0, data: _, method: u.method, action: i }, i, _));
            },
            currentTarget: u,
          },
        ],
      });
    }
  }
  for (var eo = 0; eo < Uc.length; eo++) {
    var lo = Uc[eo],
      Y0 = lo.toLowerCase(),
      X0 = lo[0].toUpperCase() + lo.slice(1);
    He(Y0, 'on' + X0);
  }
  (He(pf, 'onAnimationEnd'),
    He(gf, 'onAnimationIteration'),
    He(vf, 'onAnimationStart'),
    He('dblclick', 'onDoubleClick'),
    He('focusin', 'onFocus'),
    He('focusout', 'onBlur'),
    He(u0, 'onTransitionRun'),
    He(i0, 'onTransitionStart'),
    He(c0, 'onTransitionCancel'),
    He(_f, 'onTransitionEnd'),
    Tn('onMouseEnter', ['mouseout', 'mouseover']),
    Tn('onMouseLeave', ['mouseout', 'mouseover']),
    Tn('onPointerEnter', ['pointerout', 'pointerover']),
    Tn('onPointerLeave', ['pointerout', 'pointerover']),
    Fl('onChange', 'change click focusin focusout input keydown keyup selectionchange'.split(' ')),
    Fl(
      'onSelect',
      'focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange'.split(
        ' '
      )
    ),
    Fl('onBeforeInput', ['compositionend', 'keypress', 'textInput', 'paste']),
    Fl('onCompositionEnd', 'compositionend focusout keydown keypress keyup mousedown'.split(' ')),
    Fl(
      'onCompositionStart',
      'compositionstart focusout keydown keypress keyup mousedown'.split(' ')
    ),
    Fl(
      'onCompositionUpdate',
      'compositionupdate focusout keydown keypress keyup mousedown'.split(' ')
    ));
  var Pa =
      'abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting'.split(
        ' '
      ),
    V0 = new Set(
      'beforetoggle cancel close invalid load scroll scrollend toggle'.split(' ').concat(Pa)
    );
  function qm(t, e) {
    e = (e & 4) !== 0;
    for (var l = 0; l < t.length; l++) {
      var n = t[l],
        u = n.event;
      n = n.listeners;
      t: {
        var i = void 0;
        if (e)
          for (var f = n.length - 1; 0 <= f; f--) {
            var y = n[f],
              _ = y.instance,
              M = y.currentTarget;
            if (((y = y.listener), _ !== i && u.isPropagationStopped())) break t;
            ((i = y), (u.currentTarget = M));
            try {
              i(u);
            } catch (B) {
              qu(B);
            }
            ((u.currentTarget = null), (i = _));
          }
        else
          for (f = 0; f < n.length; f++) {
            if (
              ((y = n[f]),
              (_ = y.instance),
              (M = y.currentTarget),
              (y = y.listener),
              _ !== i && u.isPropagationStopped())
            )
              break t;
            ((i = y), (u.currentTarget = M));
            try {
              i(u);
            } catch (B) {
              qu(B);
            }
            ((u.currentTarget = null), (i = _));
          }
      }
    }
  }
  function mt(t, e) {
    var l = e[yc];
    l === void 0 && (l = e[yc] = new Set());
    var n = t + '__bubble';
    l.has(n) || (Gm(e, t, 2, !1), l.add(n));
  }
  function no(t, e, l) {
    var n = 0;
    (e && (n |= 4), Gm(l, t, n, e));
  }
  var Ai = '_reactListening' + Math.random().toString(36).slice(2);
  function ao(t) {
    if (!t[Ai]) {
      ((t[Ai] = !0),
        Dr.forEach(function (l) {
          l !== 'selectionchange' && (V0.has(l) || no(l, !1, t), no(l, !0, t));
        }));
      var e = t.nodeType === 9 ? t : t.ownerDocument;
      e === null || e[Ai] || ((e[Ai] = !0), no('selectionchange', !1, e));
    }
  }
  function Gm(t, e, l, n) {
    switch (ph(e)) {
      case 2:
        var u = vg;
        break;
      case 8:
        u = _g;
        break;
      default:
        u = bo;
    }
    ((l = u.bind(null, e, l, t)),
      (u = void 0),
      !Tc || (e !== 'touchstart' && e !== 'touchmove' && e !== 'wheel') || (u = !0),
      n
        ? u !== void 0
          ? t.addEventListener(e, l, { capture: !0, passive: u })
          : t.addEventListener(e, l, !0)
        : u !== void 0
          ? t.addEventListener(e, l, { passive: u })
          : t.addEventListener(e, l, !1));
  }
  function uo(t, e, l, n, u) {
    var i = n;
    if ((e & 1) === 0 && (e & 2) === 0 && n !== null)
      t: for (;;) {
        if (n === null) return;
        var f = n.tag;
        if (f === 3 || f === 4) {
          var y = n.stateNode.containerInfo;
          if (y === u) break;
          if (f === 4)
            for (f = n.return; f !== null; ) {
              var _ = f.tag;
              if ((_ === 3 || _ === 4) && f.stateNode.containerInfo === u) return;
              f = f.return;
            }
          for (; y !== null; ) {
            if (((f = Sn(y)), f === null)) return;
            if (((_ = f.tag), _ === 5 || _ === 6 || _ === 26 || _ === 27)) {
              n = i = f;
              continue t;
            }
            y = y.parentNode;
          }
        }
        n = n.return;
      }
    Qr(function () {
      var M = i,
        B = xc(l),
        G = [];
      t: {
        var z = bf.get(t);
        if (z !== void 0) {
          var j = Uu,
            I = t;
          switch (t) {
            case 'keypress':
              if (wu(l) === 0) break t;
            case 'keydown':
            case 'keyup':
              j = Up;
              break;
            case 'focusin':
              ((I = 'focus'), (j = Mc));
              break;
            case 'focusout':
              ((I = 'blur'), (j = Mc));
              break;
            case 'beforeblur':
            case 'afterblur':
              j = Mc;
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
              j = $r;
              break;
            case 'drag':
            case 'dragend':
            case 'dragenter':
            case 'dragexit':
            case 'dragleave':
            case 'dragover':
            case 'dragstart':
            case 'drop':
              j = Np;
              break;
            case 'touchcancel':
            case 'touchend':
            case 'touchmove':
            case 'touchstart':
              j = qp;
              break;
            case pf:
            case gf:
            case vf:
              j = Mp;
              break;
            case _f:
              j = Yp;
              break;
            case 'scroll':
            case 'scrollend':
              j = Ep;
              break;
            case 'wheel':
              j = Vp;
              break;
            case 'copy':
            case 'cut':
            case 'paste':
              j = zp;
              break;
            case 'gotpointercapture':
            case 'lostpointercapture':
            case 'pointercancel':
            case 'pointerdown':
            case 'pointermove':
            case 'pointerout':
            case 'pointerover':
            case 'pointerup':
              j = Wr;
              break;
            case 'toggle':
            case 'beforetoggle':
              j = Zp;
          }
          var lt = (e & 4) !== 0,
            jt = !lt && (t === 'scroll' || t === 'scrollend'),
            A = lt ? (z !== null ? z + 'Capture' : null) : z;
          lt = [];
          for (var x = M, C; x !== null; ) {
            var H = x;
            if (
              ((C = H.stateNode),
              (H = H.tag),
              (H !== 5 && H !== 26 && H !== 27) ||
                C === null ||
                A === null ||
                ((H = Sa(x, A)), H != null && lt.push(tu(x, H, C))),
              jt)
            )
              break;
            x = x.return;
          }
          0 < lt.length && ((z = new j(z, I, null, l, B)), G.push({ event: z, listeners: lt }));
        }
      }
      if ((e & 7) === 0) {
        t: {
          if (
            ((z = t === 'mouseover' || t === 'pointerover'),
            (j = t === 'mouseout' || t === 'pointerout'),
            z && l !== Sc && (I = l.relatedTarget || l.fromElement) && (Sn(I) || I[bn]))
          )
            break t;
          if (
            (j || z) &&
            ((z =
              B.window === B
                ? B
                : (z = B.ownerDocument)
                  ? z.defaultView || z.parentWindow
                  : window),
            j
              ? ((I = l.relatedTarget || l.toElement),
                (j = M),
                (I = I ? Sn(I) : null),
                I !== null &&
                  ((jt = d(I)), (lt = I.tag), I !== jt || (lt !== 5 && lt !== 27 && lt !== 6)) &&
                  (I = null))
              : ((j = null), (I = M)),
            j !== I)
          ) {
            if (
              ((lt = $r),
              (H = 'onMouseLeave'),
              (A = 'onMouseEnter'),
              (x = 'mouse'),
              (t === 'pointerout' || t === 'pointerover') &&
                ((lt = Wr), (H = 'onPointerLeave'), (A = 'onPointerEnter'), (x = 'pointer')),
              (jt = j == null ? z : ba(j)),
              (C = I == null ? z : ba(I)),
              (z = new lt(H, x + 'leave', j, l, B)),
              (z.target = jt),
              (z.relatedTarget = C),
              (H = null),
              Sn(B) === M &&
                ((lt = new lt(A, x + 'enter', I, l, B)),
                (lt.target = C),
                (lt.relatedTarget = jt),
                (H = lt)),
              (jt = H),
              j && I)
            )
              e: {
                for (lt = Q0, A = j, x = I, C = 0, H = A; H; H = lt(H)) C++;
                H = 0;
                for (var et = x; et; et = lt(et)) H++;
                for (; 0 < C - H; ) ((A = lt(A)), C--);
                for (; 0 < H - C; ) ((x = lt(x)), H--);
                for (; C--; ) {
                  if (A === x || (x !== null && A === x.alternate)) {
                    lt = A;
                    break e;
                  }
                  ((A = lt(A)), (x = lt(x)));
                }
                lt = null;
              }
            else lt = null;
            (j !== null && Ym(G, z, j, lt, !1), I !== null && jt !== null && Ym(G, jt, I, lt, !0));
          }
        }
        t: {
          if (
            ((z = M ? ba(M) : window),
            (j = z.nodeName && z.nodeName.toLowerCase()),
            j === 'select' || (j === 'input' && z.type === 'file'))
          )
            var bt = af;
          else if (lf(z))
            if (uf) bt = l0;
            else {
              bt = t0;
              var P = Pp;
            }
          else
            ((j = z.nodeName),
              !j || j.toLowerCase() !== 'input' || (z.type !== 'checkbox' && z.type !== 'radio')
                ? M && bc(M.elementType) && (bt = af)
                : (bt = e0));
          if (bt && (bt = bt(t, M))) {
            nf(G, bt, l, B);
            break t;
          }
          (P && P(t, z, M),
            t === 'focusout' &&
              M &&
              z.type === 'number' &&
              M.memoizedProps.value != null &&
              _c(z, 'number', z.value));
        }
        switch (((P = M ? ba(M) : window), t)) {
          case 'focusin':
            (lf(P) || P.contentEditable === 'true') && ((zn = P), (kc = M), (Ra = null));
            break;
          case 'focusout':
            Ra = kc = zn = null;
            break;
          case 'mousedown':
            wc = !0;
            break;
          case 'contextmenu':
          case 'mouseup':
          case 'dragend':
            ((wc = !1), hf(G, l, B));
            break;
          case 'selectionchange':
            if (a0) break;
          case 'keydown':
          case 'keyup':
            hf(G, l, B);
        }
        var rt;
        if (zc)
          t: {
            switch (t) {
              case 'compositionstart':
                var yt = 'onCompositionStart';
                break t;
              case 'compositionend':
                yt = 'onCompositionEnd';
                break t;
              case 'compositionupdate':
                yt = 'onCompositionUpdate';
                break t;
            }
            yt = void 0;
          }
        else
          Rn
            ? tf(t, l) && (yt = 'onCompositionEnd')
            : t === 'keydown' && l.keyCode === 229 && (yt = 'onCompositionStart');
        (yt &&
          (Ir &&
            l.locale !== 'ko' &&
            (Rn || yt !== 'onCompositionStart'
              ? yt === 'onCompositionEnd' && Rn && (rt = Zr())
              : ((Tl = B), (Nc = 'value' in Tl ? Tl.value : Tl.textContent), (Rn = !0))),
          (P = Ci(M, yt)),
          0 < P.length &&
            ((yt = new Jr(yt, t, null, l, B)),
            G.push({ event: yt, listeners: P }),
            rt ? (yt.data = rt) : ((rt = ef(l)), rt !== null && (yt.data = rt)))),
          (rt = $p ? Jp(t, l) : Wp(t, l)) &&
            ((yt = Ci(M, 'onBeforeInput')),
            0 < yt.length &&
              ((P = new Jr('onBeforeInput', 'beforeinput', null, l, B)),
              G.push({ event: P, listeners: yt }),
              (P.data = rt))),
          G0(G, t, M, l, B));
      }
      qm(G, e);
    });
  }
  function tu(t, e, l) {
    return { instance: t, listener: e, currentTarget: l };
  }
  function Ci(t, e) {
    for (var l = e + 'Capture', n = []; t !== null; ) {
      var u = t,
        i = u.stateNode;
      if (
        ((u = u.tag),
        (u !== 5 && u !== 26 && u !== 27) ||
          i === null ||
          ((u = Sa(t, l)),
          u != null && n.unshift(tu(t, u, i)),
          (u = Sa(t, e)),
          u != null && n.push(tu(t, u, i))),
        t.tag === 3)
      )
        return n;
      t = t.return;
    }
    return [];
  }
  function Q0(t) {
    if (t === null) return null;
    do t = t.return;
    while (t && t.tag !== 5 && t.tag !== 27);
    return t || null;
  }
  function Ym(t, e, l, n, u) {
    for (var i = e._reactName, f = []; l !== null && l !== n; ) {
      var y = l,
        _ = y.alternate,
        M = y.stateNode;
      if (((y = y.tag), _ !== null && _ === n)) break;
      ((y !== 5 && y !== 26 && y !== 27) ||
        M === null ||
        ((_ = M),
        u
          ? ((M = Sa(l, i)), M != null && f.unshift(tu(l, M, _)))
          : u || ((M = Sa(l, i)), M != null && f.push(tu(l, M, _)))),
        (l = l.return));
    }
    f.length !== 0 && t.push({ event: e, listeners: f });
  }
  var Z0 = /\r\n?/g,
    K0 = /\u0000|\uFFFD/g;
  function Xm(t) {
    return (typeof t == 'string' ? t : '' + t)
      .replace(
        Z0,
        `
`
      )
      .replace(K0, '');
  }
  function Vm(t, e) {
    return ((e = Xm(e)), Xm(t) === e);
  }
  function zt(t, e, l, n, u, i) {
    switch (l) {
      case 'children':
        typeof n == 'string'
          ? e === 'body' || (e === 'textarea' && n === '') || An(t, n)
          : (typeof n == 'number' || typeof n == 'bigint') && e !== 'body' && An(t, '' + n);
        break;
      case 'className':
        ju(t, 'class', n);
        break;
      case 'tabIndex':
        ju(t, 'tabindex', n);
        break;
      case 'dir':
      case 'role':
      case 'viewBox':
      case 'width':
      case 'height':
        ju(t, l, n);
        break;
      case 'style':
        Xr(t, n, i);
        break;
      case 'data':
        if (e !== 'object') {
          ju(t, 'data', n);
          break;
        }
      case 'src':
      case 'href':
        if (n === '' && (e !== 'a' || l !== 'href')) {
          t.removeAttribute(l);
          break;
        }
        if (n == null || typeof n == 'function' || typeof n == 'symbol' || typeof n == 'boolean') {
          t.removeAttribute(l);
          break;
        }
        ((n = Du('' + n)), t.setAttribute(l, n));
        break;
      case 'action':
      case 'formAction':
        if (typeof n == 'function') {
          t.setAttribute(
            l,
            "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')"
          );
          break;
        } else
          typeof i == 'function' &&
            (l === 'formAction'
              ? (e !== 'input' && zt(t, e, 'name', u.name, u, null),
                zt(t, e, 'formEncType', u.formEncType, u, null),
                zt(t, e, 'formMethod', u.formMethod, u, null),
                zt(t, e, 'formTarget', u.formTarget, u, null))
              : (zt(t, e, 'encType', u.encType, u, null),
                zt(t, e, 'method', u.method, u, null),
                zt(t, e, 'target', u.target, u, null)));
        if (n == null || typeof n == 'symbol' || typeof n == 'boolean') {
          t.removeAttribute(l);
          break;
        }
        ((n = Du('' + n)), t.setAttribute(l, n));
        break;
      case 'onClick':
        n != null && (t.onclick = Pe);
        break;
      case 'onScroll':
        n != null && mt('scroll', t);
        break;
      case 'onScrollEnd':
        n != null && mt('scrollend', t);
        break;
      case 'dangerouslySetInnerHTML':
        if (n != null) {
          if (typeof n != 'object' || !('__html' in n)) throw Error(s(61));
          if (((l = n.__html), l != null)) {
            if (u.children != null) throw Error(s(60));
            t.innerHTML = l;
          }
        }
        break;
      case 'multiple':
        t.multiple = n && typeof n != 'function' && typeof n != 'symbol';
        break;
      case 'muted':
        t.muted = n && typeof n != 'function' && typeof n != 'symbol';
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
          t.removeAttribute('xlink:href');
          break;
        }
        ((l = Du('' + n)), t.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', l));
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
          ? t.setAttribute(l, '' + n)
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
        n && typeof n != 'function' && typeof n != 'symbol'
          ? t.setAttribute(l, '')
          : t.removeAttribute(l);
        break;
      case 'capture':
      case 'download':
        n === !0
          ? t.setAttribute(l, '')
          : n !== !1 && n != null && typeof n != 'function' && typeof n != 'symbol'
            ? t.setAttribute(l, n)
            : t.removeAttribute(l);
        break;
      case 'cols':
      case 'rows':
      case 'size':
      case 'span':
        n != null && typeof n != 'function' && typeof n != 'symbol' && !isNaN(n) && 1 <= n
          ? t.setAttribute(l, n)
          : t.removeAttribute(l);
        break;
      case 'rowSpan':
      case 'start':
        n == null || typeof n == 'function' || typeof n == 'symbol' || isNaN(n)
          ? t.removeAttribute(l)
          : t.setAttribute(l, n);
        break;
      case 'popover':
        (mt('beforetoggle', t), mt('toggle', t), zu(t, 'popover', n));
        break;
      case 'xlinkActuate':
        Fe(t, 'http://www.w3.org/1999/xlink', 'xlink:actuate', n);
        break;
      case 'xlinkArcrole':
        Fe(t, 'http://www.w3.org/1999/xlink', 'xlink:arcrole', n);
        break;
      case 'xlinkRole':
        Fe(t, 'http://www.w3.org/1999/xlink', 'xlink:role', n);
        break;
      case 'xlinkShow':
        Fe(t, 'http://www.w3.org/1999/xlink', 'xlink:show', n);
        break;
      case 'xlinkTitle':
        Fe(t, 'http://www.w3.org/1999/xlink', 'xlink:title', n);
        break;
      case 'xlinkType':
        Fe(t, 'http://www.w3.org/1999/xlink', 'xlink:type', n);
        break;
      case 'xmlBase':
        Fe(t, 'http://www.w3.org/XML/1998/namespace', 'xml:base', n);
        break;
      case 'xmlLang':
        Fe(t, 'http://www.w3.org/XML/1998/namespace', 'xml:lang', n);
        break;
      case 'xmlSpace':
        Fe(t, 'http://www.w3.org/XML/1998/namespace', 'xml:space', n);
        break;
      case 'is':
        zu(t, 'is', n);
        break;
      case 'innerText':
      case 'textContent':
        break;
      default:
        (!(2 < l.length) || (l[0] !== 'o' && l[0] !== 'O') || (l[1] !== 'n' && l[1] !== 'N')) &&
          ((l = Sp.get(l) || l), zu(t, l, n));
    }
  }
  function io(t, e, l, n, u, i) {
    switch (l) {
      case 'style':
        Xr(t, n, i);
        break;
      case 'dangerouslySetInnerHTML':
        if (n != null) {
          if (typeof n != 'object' || !('__html' in n)) throw Error(s(61));
          if (((l = n.__html), l != null)) {
            if (u.children != null) throw Error(s(60));
            t.innerHTML = l;
          }
        }
        break;
      case 'children':
        typeof n == 'string'
          ? An(t, n)
          : (typeof n == 'number' || typeof n == 'bigint') && An(t, '' + n);
        break;
      case 'onScroll':
        n != null && mt('scroll', t);
        break;
      case 'onScrollEnd':
        n != null && mt('scrollend', t);
        break;
      case 'onClick':
        n != null && (t.onclick = Pe);
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
        if (!kr.hasOwnProperty(l))
          t: {
            if (
              l[0] === 'o' &&
              l[1] === 'n' &&
              ((u = l.endsWith('Capture')),
              (e = l.slice(2, u ? l.length - 7 : void 0)),
              (i = t[oe] || null),
              (i = i != null ? i[l] : null),
              typeof i == 'function' && t.removeEventListener(e, i, u),
              typeof n == 'function')
            ) {
              (typeof i != 'function' &&
                i !== null &&
                (l in t ? (t[l] = null) : t.hasAttribute(l) && t.removeAttribute(l)),
                t.addEventListener(e, n, u));
              break t;
            }
            l in t ? (t[l] = n) : n === !0 ? t.setAttribute(l, '') : zu(t, l, n);
          }
    }
  }
  function ne(t, e, l) {
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
        (mt('error', t), mt('load', t));
        var n = !1,
          u = !1,
          i;
        for (i in l)
          if (l.hasOwnProperty(i)) {
            var f = l[i];
            if (f != null)
              switch (i) {
                case 'src':
                  n = !0;
                  break;
                case 'srcSet':
                  u = !0;
                  break;
                case 'children':
                case 'dangerouslySetInnerHTML':
                  throw Error(s(137, e));
                default:
                  zt(t, e, i, f, l, null);
              }
          }
        (u && zt(t, e, 'srcSet', l.srcSet, l, null), n && zt(t, e, 'src', l.src, l, null));
        return;
      case 'input':
        mt('invalid', t);
        var y = (i = f = u = null),
          _ = null,
          M = null;
        for (n in l)
          if (l.hasOwnProperty(n)) {
            var B = l[n];
            if (B != null)
              switch (n) {
                case 'name':
                  u = B;
                  break;
                case 'type':
                  f = B;
                  break;
                case 'checked':
                  _ = B;
                  break;
                case 'defaultChecked':
                  M = B;
                  break;
                case 'value':
                  i = B;
                  break;
                case 'defaultValue':
                  y = B;
                  break;
                case 'children':
                case 'dangerouslySetInnerHTML':
                  if (B != null) throw Error(s(137, e));
                  break;
                default:
                  zt(t, e, n, B, l, null);
              }
          }
        Hr(t, i, y, _, M, f, u, !1);
        return;
      case 'select':
        (mt('invalid', t), (n = f = i = null));
        for (u in l)
          if (l.hasOwnProperty(u) && ((y = l[u]), y != null))
            switch (u) {
              case 'value':
                i = y;
                break;
              case 'defaultValue':
                f = y;
                break;
              case 'multiple':
                n = y;
              default:
                zt(t, e, u, y, l, null);
            }
        ((e = i),
          (l = f),
          (t.multiple = !!n),
          e != null ? Nn(t, !!n, e, !1) : l != null && Nn(t, !!n, l, !0));
        return;
      case 'textarea':
        (mt('invalid', t), (i = u = n = null));
        for (f in l)
          if (l.hasOwnProperty(f) && ((y = l[f]), y != null))
            switch (f) {
              case 'value':
                n = y;
                break;
              case 'defaultValue':
                u = y;
                break;
              case 'children':
                i = y;
                break;
              case 'dangerouslySetInnerHTML':
                if (y != null) throw Error(s(91));
                break;
              default:
                zt(t, e, f, y, l, null);
            }
        Gr(t, n, u, i);
        return;
      case 'option':
        for (_ in l)
          if (l.hasOwnProperty(_) && ((n = l[_]), n != null))
            switch (_) {
              case 'selected':
                t.selected = n && typeof n != 'function' && typeof n != 'symbol';
                break;
              default:
                zt(t, e, _, n, l, null);
            }
        return;
      case 'dialog':
        (mt('beforetoggle', t), mt('toggle', t), mt('cancel', t), mt('close', t));
        break;
      case 'iframe':
      case 'object':
        mt('load', t);
        break;
      case 'video':
      case 'audio':
        for (n = 0; n < Pa.length; n++) mt(Pa[n], t);
        break;
      case 'image':
        (mt('error', t), mt('load', t));
        break;
      case 'details':
        mt('toggle', t);
        break;
      case 'embed':
      case 'source':
      case 'link':
        (mt('error', t), mt('load', t));
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
        for (M in l)
          if (l.hasOwnProperty(M) && ((n = l[M]), n != null))
            switch (M) {
              case 'children':
              case 'dangerouslySetInnerHTML':
                throw Error(s(137, e));
              default:
                zt(t, e, M, n, l, null);
            }
        return;
      default:
        if (bc(e)) {
          for (B in l)
            l.hasOwnProperty(B) && ((n = l[B]), n !== void 0 && io(t, e, B, n, l, void 0));
          return;
        }
    }
    for (y in l) l.hasOwnProperty(y) && ((n = l[y]), n != null && zt(t, e, y, n, l, null));
  }
  function $0(t, e, l, n) {
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
          y = null,
          _ = null,
          M = null,
          B = null;
        for (j in l) {
          var G = l[j];
          if (l.hasOwnProperty(j) && G != null)
            switch (j) {
              case 'checked':
                break;
              case 'value':
                break;
              case 'defaultValue':
                _ = G;
              default:
                n.hasOwnProperty(j) || zt(t, e, j, null, n, G);
            }
        }
        for (var z in n) {
          var j = n[z];
          if (((G = l[z]), n.hasOwnProperty(z) && (j != null || G != null)))
            switch (z) {
              case 'type':
                i = j;
                break;
              case 'name':
                u = j;
                break;
              case 'checked':
                M = j;
                break;
              case 'defaultChecked':
                B = j;
                break;
              case 'value':
                f = j;
                break;
              case 'defaultValue':
                y = j;
                break;
              case 'children':
              case 'dangerouslySetInnerHTML':
                if (j != null) throw Error(s(137, e));
                break;
              default:
                j !== G && zt(t, e, z, j, n, G);
            }
        }
        vc(t, f, y, _, M, B, i, u);
        return;
      case 'select':
        j = f = y = z = null;
        for (i in l)
          if (((_ = l[i]), l.hasOwnProperty(i) && _ != null))
            switch (i) {
              case 'value':
                break;
              case 'multiple':
                j = _;
              default:
                n.hasOwnProperty(i) || zt(t, e, i, null, n, _);
            }
        for (u in n)
          if (((i = n[u]), (_ = l[u]), n.hasOwnProperty(u) && (i != null || _ != null)))
            switch (u) {
              case 'value':
                z = i;
                break;
              case 'defaultValue':
                y = i;
                break;
              case 'multiple':
                f = i;
              default:
                i !== _ && zt(t, e, u, i, n, _);
            }
        ((e = y),
          (l = f),
          (n = j),
          z != null
            ? Nn(t, !!l, z, !1)
            : !!n != !!l && (e != null ? Nn(t, !!l, e, !0) : Nn(t, !!l, l ? [] : '', !1)));
        return;
      case 'textarea':
        j = z = null;
        for (y in l)
          if (((u = l[y]), l.hasOwnProperty(y) && u != null && !n.hasOwnProperty(y)))
            switch (y) {
              case 'value':
                break;
              case 'children':
                break;
              default:
                zt(t, e, y, null, n, u);
            }
        for (f in n)
          if (((u = n[f]), (i = l[f]), n.hasOwnProperty(f) && (u != null || i != null)))
            switch (f) {
              case 'value':
                z = u;
                break;
              case 'defaultValue':
                j = u;
                break;
              case 'children':
                break;
              case 'dangerouslySetInnerHTML':
                if (u != null) throw Error(s(91));
                break;
              default:
                u !== i && zt(t, e, f, u, n, i);
            }
        qr(t, z, j);
        return;
      case 'option':
        for (var I in l)
          if (((z = l[I]), l.hasOwnProperty(I) && z != null && !n.hasOwnProperty(I)))
            switch (I) {
              case 'selected':
                t.selected = !1;
                break;
              default:
                zt(t, e, I, null, n, z);
            }
        for (_ in n)
          if (((z = n[_]), (j = l[_]), n.hasOwnProperty(_) && z !== j && (z != null || j != null)))
            switch (_) {
              case 'selected':
                t.selected = z && typeof z != 'function' && typeof z != 'symbol';
                break;
              default:
                zt(t, e, _, z, n, j);
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
        for (var lt in l)
          ((z = l[lt]),
            l.hasOwnProperty(lt) && z != null && !n.hasOwnProperty(lt) && zt(t, e, lt, null, n, z));
        for (M in n)
          if (((z = n[M]), (j = l[M]), n.hasOwnProperty(M) && z !== j && (z != null || j != null)))
            switch (M) {
              case 'children':
              case 'dangerouslySetInnerHTML':
                if (z != null) throw Error(s(137, e));
                break;
              default:
                zt(t, e, M, z, n, j);
            }
        return;
      default:
        if (bc(e)) {
          for (var jt in l)
            ((z = l[jt]),
              l.hasOwnProperty(jt) &&
                z !== void 0 &&
                !n.hasOwnProperty(jt) &&
                io(t, e, jt, void 0, n, z));
          for (B in n)
            ((z = n[B]),
              (j = l[B]),
              !n.hasOwnProperty(B) ||
                z === j ||
                (z === void 0 && j === void 0) ||
                io(t, e, B, z, n, j));
          return;
        }
    }
    for (var A in l)
      ((z = l[A]),
        l.hasOwnProperty(A) && z != null && !n.hasOwnProperty(A) && zt(t, e, A, null, n, z));
    for (G in n)
      ((z = n[G]),
        (j = l[G]),
        !n.hasOwnProperty(G) || z === j || (z == null && j == null) || zt(t, e, G, z, n, j));
  }
  function Qm(t) {
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
  function J0() {
    if (typeof performance.getEntriesByType == 'function') {
      for (
        var t = 0, e = 0, l = performance.getEntriesByType('resource'), n = 0;
        n < l.length;
        n++
      ) {
        var u = l[n],
          i = u.transferSize,
          f = u.initiatorType,
          y = u.duration;
        if (i && y && Qm(f)) {
          for (f = 0, y = u.responseEnd, n += 1; n < l.length; n++) {
            var _ = l[n],
              M = _.startTime;
            if (M > y) break;
            var B = _.transferSize,
              G = _.initiatorType;
            B && Qm(G) && ((_ = _.responseEnd), (f += B * (_ < y ? 1 : (y - M) / (_ - M))));
          }
          if ((--n, (e += (8 * (i + f)) / (u.duration / 1e3)), t++, 10 < t)) break;
        }
      }
      if (0 < t) return e / t / 1e6;
    }
    return navigator.connection && ((t = navigator.connection.downlink), typeof t == 'number')
      ? t
      : 5;
  }
  var co = null,
    so = null;
  function Mi(t) {
    return t.nodeType === 9 ? t : t.ownerDocument;
  }
  function Zm(t) {
    switch (t) {
      case 'http://www.w3.org/2000/svg':
        return 1;
      case 'http://www.w3.org/1998/Math/MathML':
        return 2;
      default:
        return 0;
    }
  }
  function Km(t, e) {
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
  function oo(t, e) {
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
  var ro = null;
  function W0() {
    var t = window.event;
    return t && t.type === 'popstate' ? (t === ro ? !1 : ((ro = t), !0)) : ((ro = null), !1);
  }
  var $m = typeof setTimeout == 'function' ? setTimeout : void 0,
    I0 = typeof clearTimeout == 'function' ? clearTimeout : void 0,
    Jm = typeof Promise == 'function' ? Promise : void 0,
    F0 =
      typeof queueMicrotask == 'function'
        ? queueMicrotask
        : typeof Jm < 'u'
          ? function (t) {
              return Jm.resolve(null).then(t).catch(P0);
            }
          : $m;
  function P0(t) {
    setTimeout(function () {
      throw t;
    });
  }
  function Gl(t) {
    return t === 'head';
  }
  function Wm(t, e) {
    var l = e,
      n = 0;
    do {
      var u = l.nextSibling;
      if ((t.removeChild(l), u && u.nodeType === 8))
        if (((l = u.data), l === '/$' || l === '/&')) {
          if (n === 0) {
            (t.removeChild(u), na(e));
            return;
          }
          n--;
        } else if (l === '$' || l === '$?' || l === '$~' || l === '$!' || l === '&') n++;
        else if (l === 'html') eu(t.ownerDocument.documentElement);
        else if (l === 'head') {
          ((l = t.ownerDocument.head), eu(l));
          for (var i = l.firstChild; i; ) {
            var f = i.nextSibling,
              y = i.nodeName;
            (i[_a] ||
              y === 'SCRIPT' ||
              y === 'STYLE' ||
              (y === 'LINK' && i.rel.toLowerCase() === 'stylesheet') ||
              l.removeChild(i),
              (i = f));
          }
        } else l === 'body' && eu(t.ownerDocument.body);
      l = u;
    } while (l);
    na(e);
  }
  function Im(t, e) {
    var l = t;
    t = 0;
    do {
      var n = l.nextSibling;
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
        n && n.nodeType === 8)
      )
        if (((l = n.data), l === '/$')) {
          if (t === 0) break;
          t--;
        } else (l !== '$' && l !== '$?' && l !== '$~' && l !== '$!') || t++;
      l = n;
    } while (l);
  }
  function fo(t) {
    var e = t.firstChild;
    for (e && e.nodeType === 10 && (e = e.nextSibling); e; ) {
      var l = e;
      switch (((e = e.nextSibling), l.nodeName)) {
        case 'HTML':
        case 'HEAD':
        case 'BODY':
          (fo(l), pc(l));
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
  function tg(t, e, l, n) {
    for (; t.nodeType === 1; ) {
      var u = l;
      if (t.nodeName.toLowerCase() !== e.toLowerCase()) {
        if (!n && (t.nodeName !== 'INPUT' || t.type !== 'hidden')) break;
      } else if (n) {
        if (!t[_a])
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
      if (((t = Be(t.nextSibling)), t === null)) break;
    }
    return null;
  }
  function eg(t, e, l) {
    if (e === '') return null;
    for (; t.nodeType !== 3; )
      if (
        ((t.nodeType !== 1 || t.nodeName !== 'INPUT' || t.type !== 'hidden') && !l) ||
        ((t = Be(t.nextSibling)), t === null)
      )
        return null;
    return t;
  }
  function Fm(t, e) {
    for (; t.nodeType !== 8; )
      if (
        ((t.nodeType !== 1 || t.nodeName !== 'INPUT' || t.type !== 'hidden') && !e) ||
        ((t = Be(t.nextSibling)), t === null)
      )
        return null;
    return t;
  }
  function mo(t) {
    return t.data === '$?' || t.data === '$~';
  }
  function ho(t) {
    return t.data === '$!' || (t.data === '$?' && t.ownerDocument.readyState !== 'loading');
  }
  function lg(t, e) {
    var l = t.ownerDocument;
    if (t.data === '$~') t._reactRetry = e;
    else if (t.data !== '$?' || l.readyState !== 'loading') e();
    else {
      var n = function () {
        (e(), l.removeEventListener('DOMContentLoaded', n));
      };
      (l.addEventListener('DOMContentLoaded', n), (t._reactRetry = n));
    }
  }
  function Be(t) {
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
  var yo = null;
  function Pm(t) {
    t = t.nextSibling;
    for (var e = 0; t; ) {
      if (t.nodeType === 8) {
        var l = t.data;
        if (l === '/$' || l === '/&') {
          if (e === 0) return Be(t.nextSibling);
          e--;
        } else (l !== '$' && l !== '$!' && l !== '$?' && l !== '$~' && l !== '&') || e++;
      }
      t = t.nextSibling;
    }
    return null;
  }
  function th(t) {
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
  function eh(t, e, l) {
    switch (((e = Mi(l)), t)) {
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
  function eu(t) {
    for (var e = t.attributes; e.length; ) t.removeAttributeNode(e[0]);
    pc(t);
  }
  var Ue = new Map(),
    lh = new Set();
  function Ri(t) {
    return typeof t.getRootNode == 'function'
      ? t.getRootNode()
      : t.nodeType === 9
        ? t
        : t.ownerDocument;
  }
  var yl = R.d;
  R.d = { f: ng, r: ag, D: ug, C: ig, L: cg, m: sg, X: rg, S: og, M: fg };
  function ng() {
    var t = yl.f(),
      e = bi();
    return t || e;
  }
  function ag(t) {
    var e = xn(t);
    e !== null && e.tag === 5 && e.type === 'form' ? _d(e) : yl.r(t);
  }
  var ta = typeof document > 'u' ? null : document;
  function nh(t, e, l) {
    var n = ta;
    if (n && typeof e == 'string' && e) {
      var u = Re(e);
      ((u = 'link[rel="' + t + '"][href="' + u + '"]'),
        typeof l == 'string' && (u += '[crossorigin="' + l + '"]'),
        lh.has(u) ||
          (lh.add(u),
          (t = { rel: t, crossOrigin: l, href: e }),
          n.querySelector(u) === null &&
            ((e = n.createElement('link')), ne(e, 'link', t), It(e), n.head.appendChild(e))));
    }
  }
  function ug(t) {
    (yl.D(t), nh('dns-prefetch', t, null));
  }
  function ig(t, e) {
    (yl.C(t, e), nh('preconnect', t, e));
  }
  function cg(t, e, l) {
    yl.L(t, e, l);
    var n = ta;
    if (n && t && e) {
      var u = 'link[rel="preload"][as="' + Re(e) + '"]';
      e === 'image' && l && l.imageSrcSet
        ? ((u += '[imagesrcset="' + Re(l.imageSrcSet) + '"]'),
          typeof l.imageSizes == 'string' && (u += '[imagesizes="' + Re(l.imageSizes) + '"]'))
        : (u += '[href="' + Re(t) + '"]');
      var i = u;
      switch (e) {
        case 'style':
          i = ea(t);
          break;
        case 'script':
          i = la(t);
      }
      Ue.has(i) ||
        ((t = b(
          { rel: 'preload', href: e === 'image' && l && l.imageSrcSet ? void 0 : t, as: e },
          l
        )),
        Ue.set(i, t),
        n.querySelector(u) !== null ||
          (e === 'style' && n.querySelector(lu(i))) ||
          (e === 'script' && n.querySelector(nu(i))) ||
          ((e = n.createElement('link')), ne(e, 'link', t), It(e), n.head.appendChild(e)));
    }
  }
  function sg(t, e) {
    yl.m(t, e);
    var l = ta;
    if (l && t) {
      var n = e && typeof e.as == 'string' ? e.as : 'script',
        u = 'link[rel="modulepreload"][as="' + Re(n) + '"][href="' + Re(t) + '"]',
        i = u;
      switch (n) {
        case 'audioworklet':
        case 'paintworklet':
        case 'serviceworker':
        case 'sharedworker':
        case 'worker':
        case 'script':
          i = la(t);
      }
      if (
        !Ue.has(i) &&
        ((t = b({ rel: 'modulepreload', href: t }, e)), Ue.set(i, t), l.querySelector(u) === null)
      ) {
        switch (n) {
          case 'audioworklet':
          case 'paintworklet':
          case 'serviceworker':
          case 'sharedworker':
          case 'worker':
          case 'script':
            if (l.querySelector(nu(i))) return;
        }
        ((n = l.createElement('link')), ne(n, 'link', t), It(n), l.head.appendChild(n));
      }
    }
  }
  function og(t, e, l) {
    yl.S(t, e, l);
    var n = ta;
    if (n && t) {
      var u = En(n).hoistableStyles,
        i = ea(t);
      e = e || 'default';
      var f = u.get(i);
      if (!f) {
        var y = { loading: 0, preload: null };
        if ((f = n.querySelector(lu(i)))) y.loading = 5;
        else {
          ((t = b({ rel: 'stylesheet', href: t, 'data-precedence': e }, l)),
            (l = Ue.get(i)) && po(t, l));
          var _ = (f = n.createElement('link'));
          (It(_),
            ne(_, 'link', t),
            (_._p = new Promise(function (M, B) {
              ((_.onload = M), (_.onerror = B));
            })),
            _.addEventListener('load', function () {
              y.loading |= 1;
            }),
            _.addEventListener('error', function () {
              y.loading |= 2;
            }),
            (y.loading |= 4),
            zi(f, e, n));
        }
        ((f = { type: 'stylesheet', instance: f, count: 1, state: y }), u.set(i, f));
      }
    }
  }
  function rg(t, e) {
    yl.X(t, e);
    var l = ta;
    if (l && t) {
      var n = En(l).hoistableScripts,
        u = la(t),
        i = n.get(u);
      i ||
        ((i = l.querySelector(nu(u))),
        i ||
          ((t = b({ src: t, async: !0 }, e)),
          (e = Ue.get(u)) && go(t, e),
          (i = l.createElement('script')),
          It(i),
          ne(i, 'link', t),
          l.head.appendChild(i)),
        (i = { type: 'script', instance: i, count: 1, state: null }),
        n.set(u, i));
    }
  }
  function fg(t, e) {
    yl.M(t, e);
    var l = ta;
    if (l && t) {
      var n = En(l).hoistableScripts,
        u = la(t),
        i = n.get(u);
      i ||
        ((i = l.querySelector(nu(u))),
        i ||
          ((t = b({ src: t, async: !0, type: 'module' }, e)),
          (e = Ue.get(u)) && go(t, e),
          (i = l.createElement('script')),
          It(i),
          ne(i, 'link', t),
          l.head.appendChild(i)),
        (i = { type: 'script', instance: i, count: 1, state: null }),
        n.set(u, i));
    }
  }
  function ah(t, e, l, n) {
    var u = (u = ft.current) ? Ri(u) : null;
    if (!u) throw Error(s(446));
    switch (t) {
      case 'meta':
      case 'title':
        return null;
      case 'style':
        return typeof l.precedence == 'string' && typeof l.href == 'string'
          ? ((e = ea(l.href)),
            (l = En(u).hoistableStyles),
            (n = l.get(e)),
            n || ((n = { type: 'style', instance: null, count: 0, state: null }), l.set(e, n)),
            n)
          : { type: 'void', instance: null, count: 0, state: null };
      case 'link':
        if (
          l.rel === 'stylesheet' &&
          typeof l.href == 'string' &&
          typeof l.precedence == 'string'
        ) {
          t = ea(l.href);
          var i = En(u).hoistableStyles,
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
              (i = u.querySelector(lu(t))) && !i._p && ((f.instance = i), (f.state.loading = 5)),
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
                i || dg(u, t, l, f.state))),
            e && n === null)
          )
            throw Error(s(528, ''));
          return f;
        }
        if (e && n !== null) throw Error(s(529, ''));
        return null;
      case 'script':
        return (
          (e = l.async),
          (l = l.src),
          typeof l == 'string' && e && typeof e != 'function' && typeof e != 'symbol'
            ? ((e = la(l)),
              (l = En(u).hoistableScripts),
              (n = l.get(e)),
              n || ((n = { type: 'script', instance: null, count: 0, state: null }), l.set(e, n)),
              n)
            : { type: 'void', instance: null, count: 0, state: null }
        );
      default:
        throw Error(s(444, t));
    }
  }
  function ea(t) {
    return 'href="' + Re(t) + '"';
  }
  function lu(t) {
    return 'link[rel="stylesheet"][' + t + ']';
  }
  function uh(t) {
    return b({}, t, { 'data-precedence': t.precedence, precedence: null });
  }
  function dg(t, e, l, n) {
    t.querySelector('link[rel="preload"][as="style"][' + e + ']')
      ? (n.loading = 1)
      : ((e = t.createElement('link')),
        (n.preload = e),
        e.addEventListener('load', function () {
          return (n.loading |= 1);
        }),
        e.addEventListener('error', function () {
          return (n.loading |= 2);
        }),
        ne(e, 'link', l),
        It(e),
        t.head.appendChild(e));
  }
  function la(t) {
    return '[src="' + Re(t) + '"]';
  }
  function nu(t) {
    return 'script[async]' + t;
  }
  function ih(t, e, l) {
    if ((e.count++, e.instance === null))
      switch (e.type) {
        case 'style':
          var n = t.querySelector('style[data-href~="' + Re(l.href) + '"]');
          if (n) return ((e.instance = n), It(n), n);
          var u = b({}, l, {
            'data-href': l.href,
            'data-precedence': l.precedence,
            href: null,
            precedence: null,
          });
          return (
            (n = (t.ownerDocument || t).createElement('style')),
            It(n),
            ne(n, 'style', u),
            zi(n, l.precedence, t),
            (e.instance = n)
          );
        case 'stylesheet':
          u = ea(l.href);
          var i = t.querySelector(lu(u));
          if (i) return ((e.state.loading |= 4), (e.instance = i), It(i), i);
          ((n = uh(l)),
            (u = Ue.get(u)) && po(n, u),
            (i = (t.ownerDocument || t).createElement('link')),
            It(i));
          var f = i;
          return (
            (f._p = new Promise(function (y, _) {
              ((f.onload = y), (f.onerror = _));
            })),
            ne(i, 'link', n),
            (e.state.loading |= 4),
            zi(i, l.precedence, t),
            (e.instance = i)
          );
        case 'script':
          return (
            (i = la(l.src)),
            (u = t.querySelector(nu(i)))
              ? ((e.instance = u), It(u), u)
              : ((n = l),
                (u = Ue.get(i)) && ((n = b({}, l)), go(n, u)),
                (t = t.ownerDocument || t),
                (u = t.createElement('script')),
                It(u),
                ne(u, 'link', n),
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
        ((n = e.instance), (e.state.loading |= 4), zi(n, l.precedence, t));
    return e.instance;
  }
  function zi(t, e, l) {
    for (
      var n = l.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),
        u = n.length ? n[n.length - 1] : null,
        i = u,
        f = 0;
      f < n.length;
      f++
    ) {
      var y = n[f];
      if (y.dataset.precedence === e) i = y;
      else if (i !== u) break;
    }
    i
      ? i.parentNode.insertBefore(t, i.nextSibling)
      : ((e = l.nodeType === 9 ? l.head : l), e.insertBefore(t, e.firstChild));
  }
  function po(t, e) {
    (t.crossOrigin == null && (t.crossOrigin = e.crossOrigin),
      t.referrerPolicy == null && (t.referrerPolicy = e.referrerPolicy),
      t.title == null && (t.title = e.title));
  }
  function go(t, e) {
    (t.crossOrigin == null && (t.crossOrigin = e.crossOrigin),
      t.referrerPolicy == null && (t.referrerPolicy = e.referrerPolicy),
      t.integrity == null && (t.integrity = e.integrity));
  }
  var ji = null;
  function ch(t, e, l) {
    if (ji === null) {
      var n = new Map(),
        u = (ji = new Map());
      u.set(l, n);
    } else ((u = ji), (n = u.get(l)), n || ((n = new Map()), u.set(l, n)));
    if (n.has(t)) return n;
    for (n.set(t, null), l = l.getElementsByTagName(t), u = 0; u < l.length; u++) {
      var i = l[u];
      if (
        !(i[_a] || i[Pt] || (t === 'link' && i.getAttribute('rel') === 'stylesheet')) &&
        i.namespaceURI !== 'http://www.w3.org/2000/svg'
      ) {
        var f = i.getAttribute(e) || '';
        f = t + f;
        var y = n.get(f);
        y ? y.push(i) : n.set(f, [i]);
      }
    }
    return n;
  }
  function sh(t, e, l) {
    ((t = t.ownerDocument || t),
      t.head.insertBefore(l, e === 'title' ? t.querySelector('head > title') : null));
  }
  function mg(t, e, l) {
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
  function oh(t) {
    return !(t.type === 'stylesheet' && (t.state.loading & 3) === 0);
  }
  function hg(t, e, l, n) {
    if (
      l.type === 'stylesheet' &&
      (typeof n.media != 'string' || matchMedia(n.media).matches !== !1) &&
      (l.state.loading & 4) === 0
    ) {
      if (l.instance === null) {
        var u = ea(n.href),
          i = e.querySelector(lu(u));
        if (i) {
          ((e = i._p),
            e !== null &&
              typeof e == 'object' &&
              typeof e.then == 'function' &&
              (t.count++, (t = Oi.bind(t)), e.then(t, t)),
            (l.state.loading |= 4),
            (l.instance = i),
            It(i));
          return;
        }
        ((i = e.ownerDocument || e),
          (n = uh(n)),
          (u = Ue.get(u)) && po(n, u),
          (i = i.createElement('link')),
          It(i));
        var f = i;
        ((f._p = new Promise(function (y, _) {
          ((f.onload = y), (f.onerror = _));
        })),
          ne(i, 'link', n),
          (l.instance = i));
      }
      (t.stylesheets === null && (t.stylesheets = new Map()),
        t.stylesheets.set(l, e),
        (e = l.state.preload) &&
          (l.state.loading & 3) === 0 &&
          (t.count++,
          (l = Oi.bind(t)),
          e.addEventListener('load', l),
          e.addEventListener('error', l)));
    }
  }
  var vo = 0;
  function yg(t, e) {
    return (
      t.stylesheets && t.count === 0 && ki(t, t.stylesheets),
      0 < t.count || 0 < t.imgCount
        ? function (l) {
            var n = setTimeout(function () {
              if ((t.stylesheets && ki(t, t.stylesheets), t.unsuspend)) {
                var i = t.unsuspend;
                ((t.unsuspend = null), i());
              }
            }, 6e4 + e);
            0 < t.imgBytes && vo === 0 && (vo = 62500 * J0());
            var u = setTimeout(
              function () {
                if (
                  ((t.waitingForImages = !1),
                  t.count === 0 && (t.stylesheets && ki(t, t.stylesheets), t.unsuspend))
                ) {
                  var i = t.unsuspend;
                  ((t.unsuspend = null), i());
                }
              },
              (t.imgBytes > vo ? 50 : 800) + e
            );
            return (
              (t.unsuspend = l),
              function () {
                ((t.unsuspend = null), clearTimeout(n), clearTimeout(u));
              }
            );
          }
        : null
    );
  }
  function Oi() {
    if ((this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages))) {
      if (this.stylesheets) ki(this, this.stylesheets);
      else if (this.unsuspend) {
        var t = this.unsuspend;
        ((this.unsuspend = null), t());
      }
    }
  }
  var Di = null;
  function ki(t, e) {
    ((t.stylesheets = null),
      t.unsuspend !== null &&
        (t.count++, (Di = new Map()), e.forEach(pg, t), (Di = null), Oi.call(t)));
  }
  function pg(t, e) {
    if (!(e.state.loading & 4)) {
      var l = Di.get(t);
      if (l) var n = l.get(null);
      else {
        ((l = new Map()), Di.set(t, l));
        for (
          var u = t.querySelectorAll('link[data-precedence],style[data-precedence]'), i = 0;
          i < u.length;
          i++
        ) {
          var f = u[i];
          (f.nodeName === 'LINK' || f.getAttribute('media') !== 'not all') &&
            (l.set(f.dataset.precedence, f), (n = f));
        }
        n && l.set(null, n);
      }
      ((u = e.instance),
        (f = u.getAttribute('data-precedence')),
        (i = l.get(f) || n),
        i === n && l.set(null, u),
        l.set(f, u),
        this.count++,
        (n = Oi.bind(this)),
        u.addEventListener('load', n),
        u.addEventListener('error', n),
        i
          ? i.parentNode.insertBefore(u, i.nextSibling)
          : ((t = t.nodeType === 9 ? t.head : t), t.insertBefore(u, t.firstChild)),
        (e.state.loading |= 4));
    }
  }
  var au = {
    $$typeof: O,
    Provider: null,
    Consumer: null,
    _currentValue: K,
    _currentValue2: K,
    _threadCount: 0,
  };
  function gg(t, e, l, n, u, i, f, y, _) {
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
      (this.expirationTimes = dc(-1)),
      (this.entangledLanes =
        this.shellSuspendCounter =
        this.errorRecoveryDisabledLanes =
        this.expiredLanes =
        this.warmLanes =
        this.pingedLanes =
        this.suspendedLanes =
        this.pendingLanes =
          0),
      (this.entanglements = dc(0)),
      (this.hiddenUpdates = dc(null)),
      (this.identifierPrefix = n),
      (this.onUncaughtError = u),
      (this.onCaughtError = i),
      (this.onRecoverableError = f),
      (this.pooledCache = null),
      (this.pooledCacheLanes = 0),
      (this.formState = _),
      (this.incompleteTransitions = new Map()));
  }
  function rh(t, e, l, n, u, i, f, y, _, M, B, G) {
    return (
      (t = new gg(t, e, l, f, _, M, B, G, y)),
      (e = 1),
      i === !0 && (e |= 24),
      (i = be(3, null, null, e)),
      (t.current = i),
      (i.stateNode = t),
      (e = Wc()),
      e.refCount++,
      (t.pooledCache = e),
      e.refCount++,
      (i.memoizedState = { element: n, isDehydrated: l, cache: e }),
      ts(i),
      t
    );
  }
  function fh(t) {
    return t ? ((t = Dn), t) : Dn;
  }
  function dh(t, e, l, n, u, i) {
    ((u = fh(u)),
      n.context === null ? (n.context = u) : (n.pendingContext = u),
      (n = zl(e)),
      (n.payload = { element: l }),
      (i = i === void 0 ? null : i),
      i !== null && (n.callback = i),
      (l = jl(t, n, e)),
      l !== null && (ye(l, t, e), Ba(l, t, e)));
  }
  function mh(t, e) {
    if (((t = t.memoizedState), t !== null && t.dehydrated !== null)) {
      var l = t.retryLane;
      t.retryLane = l !== 0 && l < e ? l : e;
    }
  }
  function _o(t, e) {
    (mh(t, e), (t = t.alternate) && mh(t, e));
  }
  function hh(t) {
    if (t.tag === 13 || t.tag === 31) {
      var e = ln(t, 67108864);
      (e !== null && ye(e, t, 67108864), _o(t, 67108864));
    }
  }
  function yh(t) {
    if (t.tag === 13 || t.tag === 31) {
      var e = Ne();
      e = mc(e);
      var l = ln(t, e);
      (l !== null && ye(l, t, e), _o(t, e));
    }
  }
  var wi = !0;
  function vg(t, e, l, n) {
    var u = U.T;
    U.T = null;
    var i = R.p;
    try {
      ((R.p = 2), bo(t, e, l, n));
    } finally {
      ((R.p = i), (U.T = u));
    }
  }
  function _g(t, e, l, n) {
    var u = U.T;
    U.T = null;
    var i = R.p;
    try {
      ((R.p = 8), bo(t, e, l, n));
    } finally {
      ((R.p = i), (U.T = u));
    }
  }
  function bo(t, e, l, n) {
    if (wi) {
      var u = So(n);
      if (u === null) (uo(t, e, n, Bi, l), gh(t, n));
      else if (Sg(u, t, e, l, n)) n.stopPropagation();
      else if ((gh(t, n), e & 4 && -1 < bg.indexOf(t))) {
        for (; u !== null; ) {
          var i = xn(u);
          if (i !== null)
            switch (i.tag) {
              case 3:
                if (((i = i.stateNode), i.current.memoizedState.isDehydrated)) {
                  var f = Il(i.pendingLanes);
                  if (f !== 0) {
                    var y = i;
                    for (y.pendingLanes |= 2, y.entangledLanes |= 2; f; ) {
                      var _ = 1 << (31 - ve(f));
                      ((y.entanglements[1] |= _), (f &= ~_));
                    }
                    (Je(i), (xt & 6) === 0 && ((vi = pe() + 500), Fa(0)));
                  }
                }
                break;
              case 31:
              case 13:
                ((y = ln(i, 2)), y !== null && ye(y, i, 2), bi(), _o(i, 2));
            }
          if (((i = So(n)), i === null && uo(t, e, n, Bi, l), i === u)) break;
          u = i;
        }
        u !== null && n.stopPropagation();
      } else uo(t, e, n, null, l);
    }
  }
  function So(t) {
    return ((t = xc(t)), xo(t));
  }
  var Bi = null;
  function xo(t) {
    if (((Bi = null), (t = Sn(t)), t !== null)) {
      var e = d(t);
      if (e === null) t = null;
      else {
        var l = e.tag;
        if (l === 13) {
          if (((t = p(e)), t !== null)) return t;
          t = null;
        } else if (l === 31) {
          if (((t = g(e)), t !== null)) return t;
          t = null;
        } else if (l === 3) {
          if (e.stateNode.current.memoizedState.isDehydrated)
            return e.tag === 3 ? e.stateNode.containerInfo : null;
          t = null;
        } else e !== t && (t = null);
      }
    }
    return ((Bi = t), null);
  }
  function ph(t) {
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
        switch (up()) {
          case Er:
            return 2;
          case Tr:
            return 8;
          case Nu:
          case ip:
            return 32;
          case Nr:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var Eo = !1,
    Yl = null,
    Xl = null,
    Vl = null,
    uu = new Map(),
    iu = new Map(),
    Ql = [],
    bg =
      'mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset'.split(
        ' '
      );
  function gh(t, e) {
    switch (t) {
      case 'focusin':
      case 'focusout':
        Yl = null;
        break;
      case 'dragenter':
      case 'dragleave':
        Xl = null;
        break;
      case 'mouseover':
      case 'mouseout':
        Vl = null;
        break;
      case 'pointerover':
      case 'pointerout':
        uu.delete(e.pointerId);
        break;
      case 'gotpointercapture':
      case 'lostpointercapture':
        iu.delete(e.pointerId);
    }
  }
  function cu(t, e, l, n, u, i) {
    return t === null || t.nativeEvent !== i
      ? ((t = {
          blockedOn: e,
          domEventName: l,
          eventSystemFlags: n,
          nativeEvent: i,
          targetContainers: [u],
        }),
        e !== null && ((e = xn(e)), e !== null && hh(e)),
        t)
      : ((t.eventSystemFlags |= n),
        (e = t.targetContainers),
        u !== null && e.indexOf(u) === -1 && e.push(u),
        t);
  }
  function Sg(t, e, l, n, u) {
    switch (e) {
      case 'focusin':
        return ((Yl = cu(Yl, t, e, l, n, u)), !0);
      case 'dragenter':
        return ((Xl = cu(Xl, t, e, l, n, u)), !0);
      case 'mouseover':
        return ((Vl = cu(Vl, t, e, l, n, u)), !0);
      case 'pointerover':
        var i = u.pointerId;
        return (uu.set(i, cu(uu.get(i) || null, t, e, l, n, u)), !0);
      case 'gotpointercapture':
        return ((i = u.pointerId), iu.set(i, cu(iu.get(i) || null, t, e, l, n, u)), !0);
    }
    return !1;
  }
  function vh(t) {
    var e = Sn(t.target);
    if (e !== null) {
      var l = d(e);
      if (l !== null) {
        if (((e = l.tag), e === 13)) {
          if (((e = p(l)), e !== null)) {
            ((t.blockedOn = e),
              jr(t.priority, function () {
                yh(l);
              }));
            return;
          }
        } else if (e === 31) {
          if (((e = g(l)), e !== null)) {
            ((t.blockedOn = e),
              jr(t.priority, function () {
                yh(l);
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
  function Ui(t) {
    if (t.blockedOn !== null) return !1;
    for (var e = t.targetContainers; 0 < e.length; ) {
      var l = So(t.nativeEvent);
      if (l === null) {
        l = t.nativeEvent;
        var n = new l.constructor(l.type, l);
        ((Sc = n), l.target.dispatchEvent(n), (Sc = null));
      } else return ((e = xn(l)), e !== null && hh(e), (t.blockedOn = l), !1);
      e.shift();
    }
    return !0;
  }
  function _h(t, e, l) {
    Ui(t) && l.delete(e);
  }
  function xg() {
    ((Eo = !1),
      Yl !== null && Ui(Yl) && (Yl = null),
      Xl !== null && Ui(Xl) && (Xl = null),
      Vl !== null && Ui(Vl) && (Vl = null),
      uu.forEach(_h),
      iu.forEach(_h));
  }
  function Li(t, e) {
    t.blockedOn === e &&
      ((t.blockedOn = null),
      Eo || ((Eo = !0), a.unstable_scheduleCallback(a.unstable_NormalPriority, xg)));
  }
  var Hi = null;
  function bh(t) {
    Hi !== t &&
      ((Hi = t),
      a.unstable_scheduleCallback(a.unstable_NormalPriority, function () {
        Hi === t && (Hi = null);
        for (var e = 0; e < t.length; e += 3) {
          var l = t[e],
            n = t[e + 1],
            u = t[e + 2];
          if (typeof n != 'function') {
            if (xo(n || l) === null) continue;
            break;
          }
          var i = xn(l);
          i !== null &&
            (t.splice(e, 3),
            (e -= 3),
            bs(i, { pending: !0, data: u, method: l.method, action: n }, n, u));
        }
      }));
  }
  function na(t) {
    function e(_) {
      return Li(_, t);
    }
    (Yl !== null && Li(Yl, t),
      Xl !== null && Li(Xl, t),
      Vl !== null && Li(Vl, t),
      uu.forEach(e),
      iu.forEach(e));
    for (var l = 0; l < Ql.length; l++) {
      var n = Ql[l];
      n.blockedOn === t && (n.blockedOn = null);
    }
    for (; 0 < Ql.length && ((l = Ql[0]), l.blockedOn === null); )
      (vh(l), l.blockedOn === null && Ql.shift());
    if (((l = (t.ownerDocument || t).$$reactFormReplay), l != null))
      for (n = 0; n < l.length; n += 3) {
        var u = l[n],
          i = l[n + 1],
          f = u[oe] || null;
        if (typeof i == 'function') f || bh(l);
        else if (f) {
          var y = null;
          if (i && i.hasAttribute('formAction')) {
            if (((u = i), (f = i[oe] || null))) y = f.formAction;
            else if (xo(u) !== null) continue;
          } else y = f.action;
          (typeof y == 'function' ? (l[n + 1] = y) : (l.splice(n, 3), (n -= 3)), bh(l));
        }
      }
  }
  function Sh() {
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
      (u !== null && (u(), (u = null)), n || setTimeout(l, 20));
    }
    function l() {
      if (!n && !navigation.transition) {
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
      var n = !1,
        u = null;
      return (
        navigation.addEventListener('navigate', t),
        navigation.addEventListener('navigatesuccess', e),
        navigation.addEventListener('navigateerror', e),
        setTimeout(l, 100),
        function () {
          ((n = !0),
            navigation.removeEventListener('navigate', t),
            navigation.removeEventListener('navigatesuccess', e),
            navigation.removeEventListener('navigateerror', e),
            u !== null && (u(), (u = null)));
        }
      );
    }
  }
  function To(t) {
    this._internalRoot = t;
  }
  ((qi.prototype.render = To.prototype.render =
    function (t) {
      var e = this._internalRoot;
      if (e === null) throw Error(s(409));
      var l = e.current,
        n = Ne();
      dh(l, n, t, e, null, null);
    }),
    (qi.prototype.unmount = To.prototype.unmount =
      function () {
        var t = this._internalRoot;
        if (t !== null) {
          this._internalRoot = null;
          var e = t.containerInfo;
          (dh(t.current, 2, null, t, null, null), bi(), (e[bn] = null));
        }
      }));
  function qi(t) {
    this._internalRoot = t;
  }
  qi.prototype.unstable_scheduleHydration = function (t) {
    if (t) {
      var e = zr();
      t = { blockedOn: null, target: t, priority: e };
      for (var l = 0; l < Ql.length && e !== 0 && e < Ql[l].priority; l++);
      (Ql.splice(l, 0, t), l === 0 && vh(t));
    }
  };
  var xh = c.version;
  if (xh !== '19.2.5') throw Error(s(527, xh, '19.2.5'));
  R.findDOMNode = function (t) {
    var e = t._reactInternals;
    if (e === void 0)
      throw typeof t.render == 'function'
        ? Error(s(188))
        : ((t = Object.keys(t).join(',')), Error(s(268, t)));
    return ((t = m(e)), (t = t !== null ? E(t) : null), (t = t === null ? null : t.stateNode), t);
  };
  var Eg = {
    bundleType: 0,
    version: '19.2.5',
    rendererPackageName: 'react-dom',
    currentDispatcherRef: U,
    reconcilerVersion: '19.2.5',
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < 'u') {
    var Gi = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Gi.isDisabled && Gi.supportsFiber)
      try {
        ((pa = Gi.inject(Eg)), (ge = Gi));
      } catch {}
  }
  return (
    (ou.createRoot = function (t, e) {
      if (!r(t)) throw Error(s(299));
      var l = !1,
        n = '',
        u = Rd,
        i = zd,
        f = jd;
      return (
        e != null &&
          (e.unstable_strictMode === !0 && (l = !0),
          e.identifierPrefix !== void 0 && (n = e.identifierPrefix),
          e.onUncaughtError !== void 0 && (u = e.onUncaughtError),
          e.onCaughtError !== void 0 && (i = e.onCaughtError),
          e.onRecoverableError !== void 0 && (f = e.onRecoverableError)),
        (e = rh(t, 1, !1, null, null, l, n, null, u, i, f, Sh)),
        (t[bn] = e.current),
        ao(t),
        new To(e)
      );
    }),
    (ou.hydrateRoot = function (t, e, l) {
      if (!r(t)) throw Error(s(299));
      var n = !1,
        u = '',
        i = Rd,
        f = zd,
        y = jd,
        _ = null;
      return (
        l != null &&
          (l.unstable_strictMode === !0 && (n = !0),
          l.identifierPrefix !== void 0 && (u = l.identifierPrefix),
          l.onUncaughtError !== void 0 && (i = l.onUncaughtError),
          l.onCaughtError !== void 0 && (f = l.onCaughtError),
          l.onRecoverableError !== void 0 && (y = l.onRecoverableError),
          l.formState !== void 0 && (_ = l.formState)),
        (e = rh(t, 1, !0, e, l ?? null, n, u, _, i, f, y, Sh)),
        (e.context = fh(null)),
        (l = e.current),
        (n = Ne()),
        (n = mc(n)),
        (u = zl(n)),
        (u.callback = null),
        jl(l, u, n),
        (l = n),
        (e.current.lanes = l),
        va(e, l),
        Je(e),
        (t[bn] = e.current),
        ao(t),
        new qi(e)
      );
    }),
    (ou.version = '19.2.5'),
    ou
  );
}
var Oh;
function wg() {
  if (Oh) return Co.exports;
  Oh = 1;
  function a() {
    if (
      !(
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > 'u' ||
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != 'function'
      )
    )
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(a);
      } catch (c) {
        console.error(c);
      }
  }
  return (a(), (Co.exports = kg()), Co.exports);
}
var Bg = wg(),
  T = tr();
/**
 * react-router v7.14.2
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */ var Dh = 'popstate';
function kh(a) {
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
function Ug(a = {}) {
  function c(s, r) {
    var m;
    let d = (m = r.state) == null ? void 0 : m.masked,
      { pathname: p, search: g, hash: h } = d || s.location;
    return Yo(
      '',
      { pathname: p, search: g, hash: h },
      (r.state && r.state.usr) || null,
      (r.state && r.state.key) || 'default',
      d
        ? { pathname: s.location.pathname, search: s.location.search, hash: s.location.hash }
        : void 0
    );
  }
  function o(s, r) {
    return typeof r == 'string' ? r : gu(r);
  }
  return Hg(c, o, null, a);
}
function Bt(a, c) {
  if (a === !1 || a === null || typeof a > 'u') throw new Error(c);
}
function Ve(a, c) {
  if (!a) {
    typeof console < 'u' && console.warn(c);
    try {
      throw new Error(c);
    } catch {}
  }
}
function Lg() {
  return Math.random().toString(36).substring(2, 10);
}
function wh(a, c) {
  return {
    usr: a.state,
    key: a.key,
    idx: c,
    masked: a.unstable_mask ? { pathname: a.pathname, search: a.search, hash: a.hash } : void 0,
  };
}
function Yo(a, c, o = null, s, r) {
  return {
    pathname: typeof a == 'string' ? a : a.pathname,
    search: '',
    hash: '',
    ...(typeof c == 'string' ? ra(c) : c),
    state: o,
    key: (c && c.key) || s || Lg(),
    unstable_mask: r,
  };
}
function gu({ pathname: a = '/', search: c = '', hash: o = '' }) {
  return (
    c && c !== '?' && (a += c.charAt(0) === '?' ? c : '?' + c),
    o && o !== '#' && (a += o.charAt(0) === '#' ? o : '#' + o),
    a
  );
}
function ra(a) {
  let c = {};
  if (a) {
    let o = a.indexOf('#');
    o >= 0 && ((c.hash = a.substring(o)), (a = a.substring(0, o)));
    let s = a.indexOf('?');
    (s >= 0 && ((c.search = a.substring(s)), (a = a.substring(0, s))), a && (c.pathname = a));
  }
  return c;
}
function Hg(a, c, o, s = {}) {
  let { window: r = document.defaultView, v5Compat: d = !1 } = s,
    p = r.history,
    g = 'POP',
    h = null,
    m = E();
  m == null && ((m = 0), p.replaceState({ ...p.state, idx: m }, ''));
  function E() {
    return (p.state || { idx: null }).idx;
  }
  function b() {
    g = 'POP';
    let L = E(),
      k = L == null ? null : L - m;
    ((m = L), h && h({ action: g, location: w.location, delta: k }));
  }
  function N(L, k) {
    g = 'PUSH';
    let Q = kh(L) ? L : Yo(w.location, L, k);
    m = E() + 1;
    let O = wh(Q, m),
      Y = w.createHref(Q.unstable_mask || Q);
    try {
      p.pushState(O, '', Y);
    } catch ($) {
      if ($ instanceof DOMException && $.name === 'DataCloneError') throw $;
      r.location.assign(Y);
    }
    d && h && h({ action: g, location: w.location, delta: 1 });
  }
  function X(L, k) {
    g = 'REPLACE';
    let Q = kh(L) ? L : Yo(w.location, L, k);
    m = E();
    let O = wh(Q, m),
      Y = w.createHref(Q.unstable_mask || Q);
    (p.replaceState(O, '', Y), d && h && h({ action: g, location: w.location, delta: 0 }));
  }
  function D(L) {
    return qg(L);
  }
  let w = {
    get action() {
      return g;
    },
    get location() {
      return a(r, p);
    },
    listen(L) {
      if (h) throw new Error('A history only accepts one active listener');
      return (
        r.addEventListener(Dh, b),
        (h = L),
        () => {
          (r.removeEventListener(Dh, b), (h = null));
        }
      );
    },
    createHref(L) {
      return c(r, L);
    },
    createURL: D,
    encodeLocation(L) {
      let k = D(L);
      return { pathname: k.pathname, search: k.search, hash: k.hash };
    },
    push: N,
    replace: X,
    go(L) {
      return p.go(L);
    },
  };
  return w;
}
function qg(a, c = !1) {
  let o = 'http://localhost';
  (typeof window < 'u' &&
    (o = window.location.origin !== 'null' ? window.location.origin : window.location.href),
    Bt(o, 'No window.location.(origin|href) available to create URL'));
  let s = typeof a == 'string' ? a : gu(a);
  return ((s = s.replace(/ $/, '%20')), !c && s.startsWith('//') && (s = o + s), new URL(s, o));
}
function iy(a, c, o = '/') {
  return Gg(a, c, o, !1);
}
function Gg(a, c, o, s) {
  let r = typeof c == 'string' ? ra(c) : c,
    d = vl(r.pathname || '/', o);
  if (d == null) return null;
  let p = cy(a);
  Yg(p);
  let g = null;
  for (let h = 0; g == null && h < p.length; ++h) {
    let m = Pg(d);
    g = Ig(p[h], m, s);
  }
  return g;
}
function cy(a, c = [], o = [], s = '', r = !1) {
  let d = (p, g, h = r, m) => {
    let E = {
      relativePath: m === void 0 ? p.path || '' : m,
      caseSensitive: p.caseSensitive === !0,
      childrenIndex: g,
      route: p,
    };
    if (E.relativePath.startsWith('/')) {
      if (!E.relativePath.startsWith(s) && h) return;
      (Bt(
        E.relativePath.startsWith(s),
        `Absolute route path "${E.relativePath}" nested under path "${s}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`
      ),
        (E.relativePath = E.relativePath.slice(s.length)));
    }
    let b = Ye([s, E.relativePath]),
      N = o.concat(E);
    (p.children &&
      p.children.length > 0 &&
      (Bt(
        p.index !== !0,
        `Index routes must not have child routes. Please remove all child routes from route path "${b}".`
      ),
      cy(p.children, c, N, b, h)),
      !(p.path == null && !p.index) && c.push({ path: b, score: Jg(b, p.index), routesMeta: N }));
  };
  return (
    a.forEach((p, g) => {
      var h;
      if (p.path === '' || !((h = p.path) != null && h.includes('?'))) d(p, g);
      else for (let m of sy(p.path)) d(p, g, !0, m);
    }),
    c
  );
}
function sy(a) {
  let c = a.split('/');
  if (c.length === 0) return [];
  let [o, ...s] = c,
    r = o.endsWith('?'),
    d = o.replace(/\?$/, '');
  if (s.length === 0) return r ? [d, ''] : [d];
  let p = sy(s.join('/')),
    g = [];
  return (
    g.push(...p.map((h) => (h === '' ? d : [d, h].join('/')))),
    r && g.push(...p),
    g.map((h) => (a.startsWith('/') && h === '' ? '/' : h))
  );
}
function Yg(a) {
  a.sort((c, o) =>
    c.score !== o.score
      ? o.score - c.score
      : Wg(
          c.routesMeta.map((s) => s.childrenIndex),
          o.routesMeta.map((s) => s.childrenIndex)
        )
  );
}
var Xg = /^:[\w-]+$/,
  Vg = 3,
  Qg = 2,
  Zg = 1,
  Kg = 10,
  $g = -2,
  Bh = (a) => a === '*';
function Jg(a, c) {
  let o = a.split('/'),
    s = o.length;
  return (
    o.some(Bh) && (s += $g),
    c && (s += Qg),
    o.filter((r) => !Bh(r)).reduce((r, d) => r + (Xg.test(d) ? Vg : d === '' ? Zg : Kg), s)
  );
}
function Wg(a, c) {
  return a.length === c.length && a.slice(0, -1).every((s, r) => s === c[r])
    ? a[a.length - 1] - c[c.length - 1]
    : 0;
}
function Ig(a, c, o = !1) {
  let { routesMeta: s } = a,
    r = {},
    d = '/',
    p = [];
  for (let g = 0; g < s.length; ++g) {
    let h = s[g],
      m = g === s.length - 1,
      E = d === '/' ? c : c.slice(d.length) || '/',
      b = $i({ path: h.relativePath, caseSensitive: h.caseSensitive, end: m }, E),
      N = h.route;
    if (
      (!b &&
        m &&
        o &&
        !s[s.length - 1].route.index &&
        (b = $i({ path: h.relativePath, caseSensitive: h.caseSensitive, end: !1 }, E)),
      !b)
    )
      return null;
    (Object.assign(r, b.params),
      p.push({
        params: r,
        pathname: Ye([d, b.pathname]),
        pathnameBase: nv(Ye([d, b.pathnameBase])),
        route: N,
      }),
      b.pathnameBase !== '/' && (d = Ye([d, b.pathnameBase])));
  }
  return p;
}
function $i(a, c) {
  typeof a == 'string' && (a = { path: a, caseSensitive: !1, end: !0 });
  let [o, s] = Fg(a.path, a.caseSensitive, a.end),
    r = c.match(o);
  if (!r) return null;
  let d = r[0],
    p = d.replace(/(.)\/+$/, '$1'),
    g = r.slice(1);
  return {
    params: s.reduce((m, { paramName: E, isOptional: b }, N) => {
      if (E === '*') {
        let D = g[N] || '';
        p = d.slice(0, d.length - D.length).replace(/(.)\/+$/, '$1');
      }
      const X = g[N];
      return (b && !X ? (m[E] = void 0) : (m[E] = (X || '').replace(/%2F/g, '/')), m);
    }, {}),
    pathname: d,
    pathnameBase: p,
    pattern: a,
  };
}
function Fg(a, c = !1, o = !0) {
  Ve(
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
        .replace(/\/:([\w-]+)(\?)?/g, (p, g, h, m, E) => {
          if ((s.push({ paramName: g, isOptional: h != null }), h)) {
            let b = E.charAt(m + p.length);
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
    [new RegExp(r, c ? void 0 : 'i'), s]
  );
}
function Pg(a) {
  try {
    return a
      .split('/')
      .map((c) => decodeURIComponent(c).replace(/\//g, '%2F'))
      .join('/');
  } catch (c) {
    return (
      Ve(
        !1,
        `The URL path "${a}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${c}).`
      ),
      a
    );
  }
}
function vl(a, c) {
  if (c === '/') return a;
  if (!a.toLowerCase().startsWith(c.toLowerCase())) return null;
  let o = c.endsWith('/') ? c.length - 1 : c.length,
    s = a.charAt(o);
  return s && s !== '/' ? null : a.slice(o) || '/';
}
var tv = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;
function ev(a, c = '/') {
  let { pathname: o, search: s = '', hash: r = '' } = typeof a == 'string' ? ra(a) : a,
    d;
  return (
    o ? ((o = oy(o)), o.startsWith('/') ? (d = Uh(o.substring(1), '/')) : (d = Uh(o, c))) : (d = c),
    { pathname: d, search: av(s), hash: uv(r) }
  );
}
function Uh(a, c) {
  let o = Ji(c).split('/');
  return (
    a.split('/').forEach((r) => {
      r === '..' ? o.length > 1 && o.pop() : r !== '.' && o.push(r);
    }),
    o.length > 1 ? o.join('/') : '/'
  );
}
function Oo(a, c, o, s) {
  return `Cannot include a '${a}' character in a manually specified \`to.${c}\` field [${JSON.stringify(s)}].  Please separate it out to the \`to.${o}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`;
}
function lv(a) {
  return a.filter((c, o) => o === 0 || (c.route.path && c.route.path.length > 0));
}
function er(a) {
  let c = lv(a);
  return c.map((o, s) => (s === c.length - 1 ? o.pathname : o.pathnameBase));
}
function Pi(a, c, o, s = !1) {
  let r;
  typeof a == 'string'
    ? (r = ra(a))
    : ((r = { ...a }),
      Bt(!r.pathname || !r.pathname.includes('?'), Oo('?', 'pathname', 'search', r)),
      Bt(!r.pathname || !r.pathname.includes('#'), Oo('#', 'pathname', 'hash', r)),
      Bt(!r.search || !r.search.includes('#'), Oo('#', 'search', 'hash', r)));
  let d = a === '' || r.pathname === '',
    p = d ? '/' : r.pathname,
    g;
  if (p == null) g = o;
  else {
    let b = c.length - 1;
    if (!s && p.startsWith('..')) {
      let N = p.split('/');
      for (; N[0] === '..'; ) (N.shift(), (b -= 1));
      r.pathname = N.join('/');
    }
    g = b >= 0 ? c[b] : '/';
  }
  let h = ev(r, g),
    m = p && p !== '/' && p.endsWith('/'),
    E = (d || p === '.') && o.endsWith('/');
  return (!h.pathname.endsWith('/') && (m || E) && (h.pathname += '/'), h);
}
var oy = (a) => a.replace(/\/\/+/g, '/'),
  Ye = (a) => oy(a.join('/')),
  Ji = (a) => a.replace(/\/+$/, ''),
  nv = (a) => Ji(a).replace(/^\/*/, '/'),
  av = (a) => (!a || a === '?' ? '' : a.startsWith('?') ? a : '?' + a),
  uv = (a) => (!a || a === '#' ? '' : a.startsWith('#') ? a : '#' + a),
  iv = class {
    constructor(a, c, o, s = !1) {
      ((this.status = a),
        (this.statusText = c || ''),
        (this.internal = s),
        o instanceof Error ? ((this.data = o.toString()), (this.error = o)) : (this.data = o));
    }
  };
function cv(a) {
  return (
    a != null &&
    typeof a.status == 'number' &&
    typeof a.statusText == 'string' &&
    typeof a.internal == 'boolean' &&
    'data' in a
  );
}
function sv(a) {
  let c = a.map((o) => o.route.path).filter(Boolean);
  return Ye(c) || '/';
}
var ry =
  typeof window < 'u' && typeof window.document < 'u' && typeof window.document.createElement < 'u';
function fy(a, c) {
  let o = a;
  if (typeof o != 'string' || !tv.test(o)) return { absoluteURL: void 0, isExternal: !1, to: o };
  let s = o,
    r = !1;
  if (ry)
    try {
      let d = new URL(window.location.href),
        p = o.startsWith('//') ? new URL(d.protocol + o) : new URL(o),
        g = vl(p.pathname, c);
      p.origin === d.origin && g != null ? (o = g + p.search + p.hash) : (r = !0);
    } catch {
      Ve(
        !1,
        `<Link to="${o}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`
      );
    }
  return { absoluteURL: s, isExternal: r, to: o };
}
Object.getOwnPropertyNames(Object.prototype).sort().join('\0');
var dy = ['POST', 'PUT', 'PATCH', 'DELETE'];
new Set(dy);
var ov = ['GET', ...dy];
new Set(ov);
var fa = T.createContext(null);
fa.displayName = 'DataRouter';
var tc = T.createContext(null);
tc.displayName = 'DataRouterState';
var my = T.createContext(!1);
function rv() {
  return T.useContext(my);
}
var hy = T.createContext({ isTransitioning: !1 });
hy.displayName = 'ViewTransition';
var fv = T.createContext(new Map());
fv.displayName = 'Fetchers';
var dv = T.createContext(null);
dv.displayName = 'Await';
var Ce = T.createContext(null);
Ce.displayName = 'Navigation';
var bu = T.createContext(null);
bu.displayName = 'Location';
var Qe = T.createContext({ outlet: null, matches: [], isDataRoute: !1 });
Qe.displayName = 'Route';
var lr = T.createContext(null);
lr.displayName = 'RouteError';
var yy = 'REACT_ROUTER_ERROR',
  mv = 'REDIRECT',
  hv = 'ROUTE_ERROR_RESPONSE';
function yv(a) {
  if (a.startsWith(`${yy}:${mv}:{`))
    try {
      let c = JSON.parse(a.slice(28));
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
function pv(a) {
  if (a.startsWith(`${yy}:${hv}:{`))
    try {
      let c = JSON.parse(a.slice(40));
      if (
        typeof c == 'object' &&
        c &&
        typeof c.status == 'number' &&
        typeof c.statusText == 'string'
      )
        return new iv(c.status, c.statusText, c.data);
    } catch {}
}
function gv(a, { relative: c } = {}) {
  Bt(da(), 'useHref() may be used only in the context of a <Router> component.');
  let { basename: o, navigator: s } = T.useContext(Ce),
    { hash: r, pathname: d, search: p } = Su(a, { relative: c }),
    g = d;
  return (
    o !== '/' && (g = d === '/' ? o : Ye([o, d])),
    s.createHref({ pathname: g, search: p, hash: r })
  );
}
function da() {
  return T.useContext(bu) != null;
}
function Ie() {
  return (
    Bt(da(), 'useLocation() may be used only in the context of a <Router> component.'),
    T.useContext(bu).location
  );
}
var py =
  'You should call navigate() in a React.useEffect(), not when your component is first rendered.';
function gy(a) {
  T.useContext(Ce).static || T.useLayoutEffect(a);
}
function Sl() {
  let { isDataRoute: a } = T.useContext(Qe);
  return a ? jv() : vv();
}
function vv() {
  Bt(da(), 'useNavigate() may be used only in the context of a <Router> component.');
  let a = T.useContext(fa),
    { basename: c, navigator: o } = T.useContext(Ce),
    { matches: s } = T.useContext(Qe),
    { pathname: r } = Ie(),
    d = JSON.stringify(er(s)),
    p = T.useRef(!1);
  return (
    gy(() => {
      p.current = !0;
    }),
    T.useCallback(
      (h, m = {}) => {
        if ((Ve(p.current, py), !p.current)) return;
        if (typeof h == 'number') {
          o.go(h);
          return;
        }
        let E = Pi(h, JSON.parse(d), r, m.relative === 'path');
        (a == null && c !== '/' && (E.pathname = E.pathname === '/' ? c : Ye([c, E.pathname])),
          (m.replace ? o.replace : o.push)(E, m.state, m));
      },
      [c, o, d, r, a]
    )
  );
}
T.createContext(null);
function _v() {
  let { matches: a } = T.useContext(Qe),
    c = a[a.length - 1];
  return (c == null ? void 0 : c.params) ?? {};
}
function Su(a, { relative: c } = {}) {
  let { matches: o } = T.useContext(Qe),
    { pathname: s } = Ie(),
    r = JSON.stringify(er(o));
  return T.useMemo(() => Pi(a, JSON.parse(r), s, c === 'path'), [a, r, s, c]);
}
function bv(a, c) {
  return vy(a, c);
}
function vy(a, c, o) {
  var L;
  Bt(da(), 'useRoutes() may be used only in the context of a <Router> component.');
  let { navigator: s } = T.useContext(Ce),
    { matches: r } = T.useContext(Qe),
    d = r[r.length - 1],
    p = d ? d.params : {},
    g = d ? d.pathname : '/',
    h = d ? d.pathnameBase : '/',
    m = d && d.route;
  {
    let k = (m && m.path) || '';
    by(
      g,
      !m || k.endsWith('*') || k.endsWith('*?'),
      `You rendered descendant <Routes> (or called \`useRoutes()\`) at "${g}" (under <Route path="${k}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${k}"> to <Route path="${k === '/' ? '*' : `${k}/*`}">.`
    );
  }
  let E = Ie(),
    b;
  if (c) {
    let k = typeof c == 'string' ? ra(c) : c;
    (Bt(
      h === '/' || ((L = k.pathname) == null ? void 0 : L.startsWith(h)),
      `When overriding the location using \`<Routes location>\` or \`useRoutes(routes, location)\`, the location pathname must begin with the portion of the URL pathname that was matched by all parent routes. The current pathname base is "${h}" but pathname "${k.pathname}" was given in the \`location\` prop.`
    ),
      (b = k));
  } else b = E;
  let N = b.pathname || '/',
    X = N;
  if (h !== '/') {
    let k = h.replace(/^\//, '').split('/');
    X = '/' + N.replace(/^\//, '').split('/').slice(k.length).join('/');
  }
  let D = iy(a, { pathname: X });
  (Ve(m || D != null, `No routes matched location "${b.pathname}${b.search}${b.hash}" `),
    Ve(
      D == null ||
        D[D.length - 1].route.element !== void 0 ||
        D[D.length - 1].route.Component !== void 0 ||
        D[D.length - 1].route.lazy !== void 0,
      `Matched leaf route at location "${b.pathname}${b.search}${b.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`
    ));
  let w = Nv(
    D &&
      D.map((k) =>
        Object.assign({}, k, {
          params: Object.assign({}, p, k.params),
          pathname: Ye([
            h,
            s.encodeLocation
              ? s.encodeLocation(
                  k.pathname.replace(/%/g, '%25').replace(/\?/g, '%3F').replace(/#/g, '%23')
                ).pathname
              : k.pathname,
          ]),
          pathnameBase:
            k.pathnameBase === '/'
              ? h
              : Ye([
                  h,
                  s.encodeLocation
                    ? s.encodeLocation(
                        k.pathnameBase
                          .replace(/%/g, '%25')
                          .replace(/\?/g, '%3F')
                          .replace(/#/g, '%23')
                      ).pathname
                    : k.pathnameBase,
                ]),
        })
      ),
    r,
    o
  );
  return c && w
    ? T.createElement(
        bu.Provider,
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
function Sv() {
  let a = zv(),
    c = cv(a) ? `${a.status} ${a.statusText}` : a instanceof Error ? a.message : JSON.stringify(a),
    o = a instanceof Error ? a.stack : null,
    s = 'rgba(200,200,200, 0.5)',
    r = { padding: '0.5rem', backgroundColor: s },
    d = { padding: '2px 4px', backgroundColor: s },
    p = null;
  return (
    console.error('Error handled by React Router default ErrorBoundary:', a),
    (p = T.createElement(
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
      T.createElement('h3', { style: { fontStyle: 'italic' } }, c),
      o ? T.createElement('pre', { style: r }, o) : null,
      p
    )
  );
}
var xv = T.createElement(Sv, null),
  _y = class extends T.Component {
    constructor(a) {
      (super(a),
        (this.state = { location: a.location, revalidation: a.revalidation, error: a.error }));
    }
    static getDerivedStateFromError(a) {
      return { error: a };
    }
    static getDerivedStateFromProps(a, c) {
      return c.location !== a.location || (c.revalidation !== 'idle' && a.revalidation === 'idle')
        ? { error: a.error, location: a.location, revalidation: a.revalidation }
        : {
            error: a.error !== void 0 ? a.error : c.error,
            location: c.location,
            revalidation: a.revalidation || c.revalidation,
          };
    }
    componentDidCatch(a, c) {
      this.props.onError
        ? this.props.onError(a, c)
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
        const o = pv(a.digest);
        o && (a = o);
      }
      let c =
        a !== void 0
          ? T.createElement(
              Qe.Provider,
              { value: this.props.routeContext },
              T.createElement(lr.Provider, { value: a, children: this.props.component })
            )
          : this.props.children;
      return this.context ? T.createElement(Ev, { error: a }, c) : c;
    }
  };
_y.contextType = my;
var Do = new WeakMap();
function Ev({ children: a, error: c }) {
  let { basename: o } = T.useContext(Ce);
  if (typeof c == 'object' && c && 'digest' in c && typeof c.digest == 'string') {
    let s = yv(c.digest);
    if (s) {
      let r = Do.get(c);
      if (r) throw r;
      let d = fy(s.location, o);
      if (ry && !Do.get(c))
        if (d.isExternal || s.reloadDocument) window.location.href = d.absoluteURL || d.to;
        else {
          const p = Promise.resolve().then(() =>
            window.__reactRouterDataRouter.navigate(d.to, { replace: s.replace })
          );
          throw (Do.set(c, p), p);
        }
      return T.createElement('meta', {
        httpEquiv: 'refresh',
        content: `0;url=${d.absoluteURL || d.to}`,
      });
    }
  }
  return a;
}
function Tv({ routeContext: a, match: c, children: o }) {
  let s = T.useContext(fa);
  return (
    s &&
      s.static &&
      s.staticContext &&
      (c.route.errorElement || c.route.ErrorBoundary) &&
      (s.staticContext._deepestRenderedBoundaryId = c.route.id),
    T.createElement(Qe.Provider, { value: a }, o)
  );
}
function Nv(a, c = [], o) {
  let s = o == null ? void 0 : o.state;
  if (a == null) {
    if (!s) return null;
    if (s.errors) a = s.matches;
    else if (c.length === 0 && !s.initialized && s.matches.length > 0) a = s.matches;
    else return null;
  }
  let r = a,
    d = s == null ? void 0 : s.errors;
  if (d != null) {
    let E = r.findIndex((b) => b.route.id && (d == null ? void 0 : d[b.route.id]) !== void 0);
    (Bt(
      E >= 0,
      `Could not find a matching route for errors on route IDs: ${Object.keys(d).join(',')}`
    ),
      (r = r.slice(0, Math.min(r.length, E + 1))));
  }
  let p = !1,
    g = -1;
  if (o && s) {
    p = s.renderFallback;
    for (let E = 0; E < r.length; E++) {
      let b = r[E];
      if (((b.route.HydrateFallback || b.route.hydrateFallbackElement) && (g = E), b.route.id)) {
        let { loaderData: N, errors: X } = s,
          D = b.route.loader && !N.hasOwnProperty(b.route.id) && (!X || X[b.route.id] === void 0);
        if (b.route.lazy || D) {
          (o.isStatic && (p = !0), g >= 0 ? (r = r.slice(0, g + 1)) : (r = [r[0]]));
          break;
        }
      }
    }
  }
  let h = o == null ? void 0 : o.onError,
    m =
      s && h
        ? (E, b) => {
            var N, X;
            h(E, {
              location: s.location,
              params:
                ((X = (N = s.matches) == null ? void 0 : N[0]) == null ? void 0 : X.params) ?? {},
              unstable_pattern: sv(s.matches),
              errorInfo: b,
            });
          }
        : void 0;
  return r.reduceRight((E, b, N) => {
    let X,
      D = !1,
      w = null,
      L = null;
    s &&
      ((X = d && b.route.id ? d[b.route.id] : void 0),
      (w = b.route.errorElement || xv),
      p &&
        (g < 0 && N === 0
          ? (by(
              'route-fallback',
              !1,
              'No `HydrateFallback` element provided to render during initial hydration'
            ),
            (D = !0),
            (L = null))
          : g === N && ((D = !0), (L = b.route.hydrateFallbackElement || null))));
    let k = c.concat(r.slice(0, N + 1)),
      Q = () => {
        let O;
        return (
          X
            ? (O = w)
            : D
              ? (O = L)
              : b.route.Component
                ? (O = T.createElement(b.route.Component, null))
                : b.route.element
                  ? (O = b.route.element)
                  : (O = E),
          T.createElement(Tv, {
            match: b,
            routeContext: { outlet: E, matches: k, isDataRoute: s != null },
            children: O,
          })
        );
      };
    return s && (b.route.ErrorBoundary || b.route.errorElement || N === 0)
      ? T.createElement(_y, {
          location: s.location,
          revalidation: s.revalidation,
          component: w,
          error: X,
          children: Q(),
          routeContext: { outlet: null, matches: k, isDataRoute: !0 },
          onError: m,
        })
      : Q();
  }, null);
}
function nr(a) {
  return `${a} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function Av(a) {
  let c = T.useContext(fa);
  return (Bt(c, nr(a)), c);
}
function Cv(a) {
  let c = T.useContext(tc);
  return (Bt(c, nr(a)), c);
}
function Mv(a) {
  let c = T.useContext(Qe);
  return (Bt(c, nr(a)), c);
}
function ar(a) {
  let c = Mv(a),
    o = c.matches[c.matches.length - 1];
  return (Bt(o.route.id, `${a} can only be used on routes that contain a unique "id"`), o.route.id);
}
function Rv() {
  return ar('useRouteId');
}
function zv() {
  var s;
  let a = T.useContext(lr),
    c = Cv('useRouteError'),
    o = ar('useRouteError');
  return a !== void 0 ? a : (s = c.errors) == null ? void 0 : s[o];
}
function jv() {
  let { router: a } = Av('useNavigate'),
    c = ar('useNavigate'),
    o = T.useRef(!1);
  return (
    gy(() => {
      o.current = !0;
    }),
    T.useCallback(
      async (r, d = {}) => {
        (Ve(o.current, py),
          o.current &&
            (typeof r == 'number'
              ? await a.navigate(r)
              : await a.navigate(r, { fromRouteId: c, ...d })));
      },
      [a, c]
    )
  );
}
var Lh = {};
function by(a, c, o) {
  !c && !Lh[a] && ((Lh[a] = !0), Ve(!1, o));
}
T.memo(Ov);
function Ov({ routes: a, future: c, state: o, isStatic: s, onError: r }) {
  return vy(a, void 0, { state: o, isStatic: s, onError: r });
}
function _l({ to: a, replace: c, state: o, relative: s }) {
  Bt(da(), '<Navigate> may be used only in the context of a <Router> component.');
  let { static: r } = T.useContext(Ce);
  Ve(
    !r,
    '<Navigate> must not be used on the initial render in a <StaticRouter>. This is a no-op, but you should modify your code so the <Navigate> is only ever rendered in response to some user interaction or state change.'
  );
  let { matches: d } = T.useContext(Qe),
    { pathname: p } = Ie(),
    g = Sl(),
    h = Pi(a, er(d), p, s === 'path'),
    m = JSON.stringify(h);
  return (
    T.useEffect(() => {
      g(JSON.parse(m), { replace: c, state: o, relative: s });
    }, [g, m, s, c, o]),
    null
  );
}
function We(a) {
  Bt(
    !1,
    'A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>.'
  );
}
function Dv({
  basename: a = '/',
  children: c = null,
  location: o,
  navigationType: s = 'POP',
  navigator: r,
  static: d = !1,
  unstable_useTransitions: p,
}) {
  Bt(
    !da(),
    'You cannot render a <Router> inside another <Router>. You should never have more than one in your app.'
  );
  let g = a.replace(/^\/*/, '/'),
    h = T.useMemo(
      () => ({ basename: g, navigator: r, static: d, unstable_useTransitions: p, future: {} }),
      [g, r, d, p]
    );
  typeof o == 'string' && (o = ra(o));
  let {
      pathname: m = '/',
      search: E = '',
      hash: b = '',
      state: N = null,
      key: X = 'default',
      unstable_mask: D,
    } = o,
    w = T.useMemo(() => {
      let L = vl(m, g);
      return L == null
        ? null
        : {
            location: { pathname: L, search: E, hash: b, state: N, key: X, unstable_mask: D },
            navigationType: s,
          };
    }, [g, m, E, b, N, X, s, D]);
  return (
    Ve(
      w != null,
      `<Router basename="${g}"> is not able to match the URL "${m}${E}${b}" because it does not start with the basename, so the <Router> won't render anything.`
    ),
    w == null
      ? null
      : T.createElement(
          Ce.Provider,
          { value: h },
          T.createElement(bu.Provider, { children: c, value: w })
        )
  );
}
function kv({ children: a, location: c }) {
  return bv(Xo(a), c);
}
function Xo(a, c = []) {
  let o = [];
  return (
    T.Children.forEach(a, (s, r) => {
      if (!T.isValidElement(s)) return;
      let d = [...c, r];
      if (s.type === T.Fragment) {
        o.push.apply(o, Xo(s.props.children, d));
        return;
      }
      (Bt(
        s.type === We,
        `[${typeof s.type == 'string' ? s.type : s.type.name}] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>`
      ),
        Bt(!s.props.index || !s.props.children, 'An index route cannot have child routes.'));
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
      (s.props.children && (p.children = Xo(s.props.children, d)), o.push(p));
    }),
    o
  );
}
var Qi = 'get',
  Zi = 'application/x-www-form-urlencoded';
function ec(a) {
  return typeof HTMLElement < 'u' && a instanceof HTMLElement;
}
function wv(a) {
  return ec(a) && a.tagName.toLowerCase() === 'button';
}
function Bv(a) {
  return ec(a) && a.tagName.toLowerCase() === 'form';
}
function Uv(a) {
  return ec(a) && a.tagName.toLowerCase() === 'input';
}
function Lv(a) {
  return !!(a.metaKey || a.altKey || a.ctrlKey || a.shiftKey);
}
function Hv(a, c) {
  return a.button === 0 && (!c || c === '_self') && !Lv(a);
}
var Yi = null;
function qv() {
  if (Yi === null)
    try {
      (new FormData(document.createElement('form'), 0), (Yi = !1));
    } catch {
      Yi = !0;
    }
  return Yi;
}
var Gv = new Set(['application/x-www-form-urlencoded', 'multipart/form-data', 'text/plain']);
function ko(a) {
  return a != null && !Gv.has(a)
    ? (Ve(
        !1,
        `"${a}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${Zi}"`
      ),
      null)
    : a;
}
function Yv(a, c) {
  let o, s, r, d, p;
  if (Bv(a)) {
    let g = a.getAttribute('action');
    ((s = g ? vl(g, c) : null),
      (o = a.getAttribute('method') || Qi),
      (r = ko(a.getAttribute('enctype')) || Zi),
      (d = new FormData(a)));
  } else if (wv(a) || (Uv(a) && (a.type === 'submit' || a.type === 'image'))) {
    let g = a.form;
    if (g == null)
      throw new Error('Cannot submit a <button> or <input type="submit"> without a <form>');
    let h = a.getAttribute('formaction') || g.getAttribute('action');
    if (
      ((s = h ? vl(h, c) : null),
      (o = a.getAttribute('formmethod') || g.getAttribute('method') || Qi),
      (r = ko(a.getAttribute('formenctype')) || ko(g.getAttribute('enctype')) || Zi),
      (d = new FormData(g, a)),
      !qv())
    ) {
      let { name: m, type: E, value: b } = a;
      if (E === 'image') {
        let N = m ? `${m}.` : '';
        (d.append(`${N}x`, '0'), d.append(`${N}y`, '0'));
      } else m && d.append(m, b);
    }
  } else {
    if (ec(a))
      throw new Error(
        'Cannot submit element that is not <form>, <button>, or <input type="submit|image">'
      );
    ((o = Qi), (s = null), (r = Zi), (p = a));
  }
  return (
    d && r === 'text/plain' && ((p = d), (d = void 0)),
    { action: s, method: o.toLowerCase(), encType: r, formData: d, body: p }
  );
}
Object.getOwnPropertyNames(Object.prototype).sort().join('\0');
function ur(a, c) {
  if (a === !1 || a === null || typeof a > 'u') throw new Error(c);
}
function Sy(a, c, o, s) {
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
        : c && vl(r.pathname, c) === '/'
          ? (r.pathname = `${Ji(c)}/_root.${s}`)
          : (r.pathname = `${Ji(r.pathname)}.${s}`),
    r
  );
}
async function Xv(a, c) {
  if (a.id in c) return c[a.id];
  try {
    let o = await import(a.module);
    return ((c[a.id] = o), o);
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
function Vv(a) {
  return a == null
    ? !1
    : a.href == null
      ? a.rel === 'preload' && typeof a.imageSrcSet == 'string' && typeof a.imageSizes == 'string'
      : typeof a.rel == 'string' && typeof a.href == 'string';
}
async function Qv(a, c, o) {
  let s = await Promise.all(
    a.map(async (r) => {
      let d = c.routes[r.route.id];
      if (d) {
        let p = await Xv(d, o);
        return p.links ? p.links() : [];
      }
      return [];
    })
  );
  return Jv(
    s
      .flat(1)
      .filter(Vv)
      .filter((r) => r.rel === 'stylesheet' || r.rel === 'preload')
      .map((r) =>
        r.rel === 'stylesheet' ? { ...r, rel: 'prefetch', as: 'style' } : { ...r, rel: 'prefetch' }
      )
  );
}
function Hh(a, c, o, s, r, d) {
  let p = (h, m) => (o[m] ? h.route.id !== o[m].route.id : !0),
    g = (h, m) => {
      var E;
      return (
        o[m].pathname !== h.pathname ||
        (((E = o[m].route.path) == null ? void 0 : E.endsWith('*')) &&
          o[m].params['*'] !== h.params['*'])
      );
    };
  return d === 'assets'
    ? c.filter((h, m) => p(h, m) || g(h, m))
    : d === 'data'
      ? c.filter((h, m) => {
          var b;
          let E = s.routes[h.route.id];
          if (!E || !E.hasLoader) return !1;
          if (p(h, m) || g(h, m)) return !0;
          if (h.route.shouldRevalidate) {
            let N = h.route.shouldRevalidate({
              currentUrl: new URL(r.pathname + r.search + r.hash, window.origin),
              currentParams: ((b = o[0]) == null ? void 0 : b.params) || {},
              nextUrl: new URL(a, window.origin),
              nextParams: h.params,
              defaultShouldRevalidate: !0,
            });
            if (typeof N == 'boolean') return N;
          }
          return !0;
        })
      : [];
}
function Zv(a, c, { includeHydrateFallback: o } = {}) {
  return Kv(
    a
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
function Kv(a) {
  return [...new Set(a)];
}
function $v(a) {
  let c = {},
    o = Object.keys(a).sort();
  for (let s of o) c[s] = a[s];
  return c;
}
function Jv(a, c) {
  let o = new Set();
  return (
    new Set(c),
    a.reduce((s, r) => {
      let d = JSON.stringify($v(r));
      return (o.has(d) || (o.add(d), s.push({ key: d, link: r })), s);
    }, [])
  );
}
function ir() {
  let a = T.useContext(fa);
  return (ur(a, 'You must render this element inside a <DataRouterContext.Provider> element'), a);
}
function Wv() {
  let a = T.useContext(tc);
  return (
    ur(a, 'You must render this element inside a <DataRouterStateContext.Provider> element'),
    a
  );
}
var cr = T.createContext(void 0);
cr.displayName = 'FrameworkContext';
function sr() {
  let a = T.useContext(cr);
  return (ur(a, 'You must render this element inside a <HydratedRouter> element'), a);
}
function Iv(a, c) {
  let o = T.useContext(cr),
    [s, r] = T.useState(!1),
    [d, p] = T.useState(!1),
    { onFocus: g, onBlur: h, onMouseEnter: m, onMouseLeave: E, onTouchStart: b } = c,
    N = T.useRef(null);
  (T.useEffect(() => {
    if ((a === 'render' && p(!0), a === 'viewport')) {
      let w = (k) => {
          k.forEach((Q) => {
            p(Q.isIntersecting);
          });
        },
        L = new IntersectionObserver(w, { threshold: 0.5 });
      return (
        N.current && L.observe(N.current),
        () => {
          L.disconnect();
        }
      );
    }
  }, [a]),
    T.useEffect(() => {
      if (s) {
        let w = setTimeout(() => {
          p(!0);
        }, 100);
        return () => {
          clearTimeout(w);
        };
      }
    }, [s]));
  let X = () => {
      r(!0);
    },
    D = () => {
      (r(!1), p(!1));
    };
  return o
    ? a !== 'intent'
      ? [d, N, {}]
      : [
          d,
          N,
          {
            onFocus: ru(g, X),
            onBlur: ru(h, D),
            onMouseEnter: ru(m, X),
            onMouseLeave: ru(E, D),
            onTouchStart: ru(b, X),
          },
        ]
    : [!1, N, {}];
}
function ru(a, c) {
  return (o) => {
    (a && a(o), o.defaultPrevented || c(o));
  };
}
function Fv({ page: a, ...c }) {
  let o = rv(),
    { router: s } = ir(),
    r = T.useMemo(() => iy(s.routes, a, s.basename), [s.routes, a, s.basename]);
  return r
    ? o
      ? T.createElement(t1, { page: a, matches: r, ...c })
      : T.createElement(e1, { page: a, matches: r, ...c })
    : null;
}
function Pv(a) {
  let { manifest: c, routeModules: o } = sr(),
    [s, r] = T.useState([]);
  return (
    T.useEffect(() => {
      let d = !1;
      return (
        Qv(a, c, o).then((p) => {
          d || r(p);
        }),
        () => {
          d = !0;
        }
      );
    }, [a, c, o]),
    s
  );
}
function t1({ page: a, matches: c, ...o }) {
  let s = Ie(),
    { future: r } = sr(),
    { basename: d } = ir(),
    p = T.useMemo(() => {
      if (a === s.pathname + s.search + s.hash) return [];
      let g = Sy(a, d, r.unstable_trailingSlashAwareDataRequests, 'rsc'),
        h = !1,
        m = [];
      for (let E of c)
        typeof E.route.shouldRevalidate == 'function' ? (h = !0) : m.push(E.route.id);
      return (
        h && m.length > 0 && g.searchParams.set('_routes', m.join(',')),
        [g.pathname + g.search]
      );
    }, [d, r.unstable_trailingSlashAwareDataRequests, a, s, c]);
  return T.createElement(
    T.Fragment,
    null,
    p.map((g) => T.createElement('link', { key: g, rel: 'prefetch', as: 'fetch', href: g, ...o }))
  );
}
function e1({ page: a, matches: c, ...o }) {
  let s = Ie(),
    { future: r, manifest: d, routeModules: p } = sr(),
    { basename: g } = ir(),
    { loaderData: h, matches: m } = Wv(),
    E = T.useMemo(() => Hh(a, c, m, d, s, 'data'), [a, c, m, d, s]),
    b = T.useMemo(() => Hh(a, c, m, d, s, 'assets'), [a, c, m, d, s]),
    N = T.useMemo(() => {
      if (a === s.pathname + s.search + s.hash) return [];
      let w = new Set(),
        L = !1;
      if (
        (c.forEach((Q) => {
          var Y;
          let O = d.routes[Q.route.id];
          !O ||
            !O.hasLoader ||
            ((!E.some(($) => $.route.id === Q.route.id) &&
              Q.route.id in h &&
              (Y = p[Q.route.id]) != null &&
              Y.shouldRevalidate) ||
            O.hasClientLoader
              ? (L = !0)
              : w.add(Q.route.id));
        }),
        w.size === 0)
      )
        return [];
      let k = Sy(a, g, r.unstable_trailingSlashAwareDataRequests, 'data');
      return (
        L &&
          w.size > 0 &&
          k.searchParams.set(
            '_routes',
            c
              .filter((Q) => w.has(Q.route.id))
              .map((Q) => Q.route.id)
              .join(',')
          ),
        [k.pathname + k.search]
      );
    }, [g, r.unstable_trailingSlashAwareDataRequests, h, s, d, E, c, a, p]),
    X = T.useMemo(() => Zv(b, d), [b, d]),
    D = Pv(b);
  return T.createElement(
    T.Fragment,
    null,
    N.map((w) => T.createElement('link', { key: w, rel: 'prefetch', as: 'fetch', href: w, ...o })),
    X.map((w) => T.createElement('link', { key: w, rel: 'modulepreload', href: w, ...o })),
    D.map(({ key: w, link: L }) =>
      T.createElement('link', {
        key: w,
        nonce: o.nonce,
        ...L,
        crossOrigin: L.crossOrigin ?? o.crossOrigin,
      })
    )
  );
}
function l1(...a) {
  return (c) => {
    a.forEach((o) => {
      typeof o == 'function' ? o(c) : o != null && (o.current = c);
    });
  };
}
var n1 =
  typeof window < 'u' && typeof window.document < 'u' && typeof window.document.createElement < 'u';
try {
  n1 && (window.__reactRouterVersion = '7.14.2');
} catch {}
function a1({ basename: a, children: c, unstable_useTransitions: o, window: s }) {
  let r = T.useRef();
  r.current == null && (r.current = Ug({ window: s, v5Compat: !0 }));
  let d = r.current,
    [p, g] = T.useState({ action: d.action, location: d.location }),
    h = T.useCallback(
      (m) => {
        o === !1 ? g(m) : T.startTransition(() => g(m));
      },
      [o]
    );
  return (
    T.useLayoutEffect(() => d.listen(h), [d, h]),
    T.createElement(Dv, {
      basename: a,
      children: c,
      location: p.location,
      navigationType: p.action,
      navigator: d,
      unstable_useTransitions: o,
    })
  );
}
var xy = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,
  Ey = T.forwardRef(function (
    {
      onClick: c,
      discover: o = 'render',
      prefetch: s = 'none',
      relative: r,
      reloadDocument: d,
      replace: p,
      unstable_mask: g,
      state: h,
      target: m,
      to: E,
      preventScrollReset: b,
      viewTransition: N,
      unstable_defaultShouldRevalidate: X,
      ...D
    },
    w
  ) {
    let { basename: L, navigator: k, unstable_useTransitions: Q } = T.useContext(Ce),
      O = typeof E == 'string' && xy.test(E),
      Y = fy(E, L);
    E = Y.to;
    let $ = gv(E, { relative: r }),
      J = Ie(),
      Z = null;
    if (g) {
      let Ut = Pi(g, [], J.unstable_mask ? J.unstable_mask.pathname : '/', !0);
      (L !== '/' && (Ut.pathname = Ut.pathname === '/' ? L : Ye([L, Ut.pathname])),
        (Z = k.createHref(Ut)));
    }
    let [V, tt, at] = Iv(s, D),
      vt = s1(E, {
        replace: p,
        unstable_mask: g,
        state: h,
        target: m,
        preventScrollReset: b,
        relative: r,
        viewTransition: N,
        unstable_defaultShouldRevalidate: X,
        unstable_useTransitions: Q,
      });
    function Et(Ut) {
      (c && c(Ut), Ut.defaultPrevented || vt(Ut));
    }
    let Wt = !(Y.isExternal || d),
      se = T.createElement('a', {
        ...D,
        ...at,
        href: (Wt ? Z : void 0) || Y.absoluteURL || $,
        onClick: Wt ? Et : c,
        ref: l1(w, tt),
        target: m,
        'data-discover': !O && o === 'render' ? 'true' : void 0,
      });
    return V && !O ? T.createElement(T.Fragment, null, se, T.createElement(Fv, { page: $ })) : se;
  });
Ey.displayName = 'Link';
var u1 = T.forwardRef(function (
  {
    'aria-current': c = 'page',
    caseSensitive: o = !1,
    className: s = '',
    end: r = !1,
    style: d,
    to: p,
    viewTransition: g,
    children: h,
    ...m
  },
  E
) {
  let b = Su(p, { relative: m.relative }),
    N = Ie(),
    X = T.useContext(tc),
    { navigator: D, basename: w } = T.useContext(Ce),
    L = X != null && m1(b) && g === !0,
    k = D.encodeLocation ? D.encodeLocation(b).pathname : b.pathname,
    Q = N.pathname,
    O = X && X.navigation && X.navigation.location ? X.navigation.location.pathname : null;
  (o || ((Q = Q.toLowerCase()), (O = O ? O.toLowerCase() : null), (k = k.toLowerCase())),
    O && w && (O = vl(O, w) || O));
  const Y = k !== '/' && k.endsWith('/') ? k.length - 1 : k.length;
  let $ = Q === k || (!r && Q.startsWith(k) && Q.charAt(Y) === '/'),
    J = O != null && (O === k || (!r && O.startsWith(k) && O.charAt(k.length) === '/')),
    Z = { isActive: $, isPending: J, isTransitioning: L },
    V = $ ? c : void 0,
    tt;
  typeof s == 'function'
    ? (tt = s(Z))
    : (tt = [s, $ ? 'active' : null, J ? 'pending' : null, L ? 'transitioning' : null]
        .filter(Boolean)
        .join(' '));
  let at = typeof d == 'function' ? d(Z) : d;
  return T.createElement(
    Ey,
    { ...m, 'aria-current': V, className: tt, ref: E, style: at, to: p, viewTransition: g },
    typeof h == 'function' ? h(Z) : h
  );
});
u1.displayName = 'NavLink';
var i1 = T.forwardRef(
  (
    {
      discover: a = 'render',
      fetcherKey: c,
      navigate: o,
      reloadDocument: s,
      replace: r,
      state: d,
      method: p = Qi,
      action: g,
      onSubmit: h,
      relative: m,
      preventScrollReset: E,
      viewTransition: b,
      unstable_defaultShouldRevalidate: N,
      ...X
    },
    D
  ) => {
    let { unstable_useTransitions: w } = T.useContext(Ce),
      L = f1(),
      k = d1(g, { relative: m }),
      Q = p.toLowerCase() === 'get' ? 'get' : 'post',
      O = typeof g == 'string' && xy.test(g),
      Y = ($) => {
        if ((h && h($), $.defaultPrevented)) return;
        $.preventDefault();
        let J = $.nativeEvent.submitter,
          Z = (J == null ? void 0 : J.getAttribute('formmethod')) || p,
          V = () =>
            L(J || $.currentTarget, {
              fetcherKey: c,
              method: Z,
              navigate: o,
              replace: r,
              state: d,
              relative: m,
              preventScrollReset: E,
              viewTransition: b,
              unstable_defaultShouldRevalidate: N,
            });
        w && o !== !1 ? T.startTransition(() => V()) : V();
      };
    return T.createElement('form', {
      ref: D,
      method: Q,
      action: k,
      onSubmit: s ? h : Y,
      ...X,
      'data-discover': !O && a === 'render' ? 'true' : void 0,
    });
  }
);
i1.displayName = 'Form';
function c1(a) {
  return `${a} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function Ty(a) {
  let c = T.useContext(fa);
  return (Bt(c, c1(a)), c);
}
function s1(
  a,
  {
    target: c,
    replace: o,
    unstable_mask: s,
    state: r,
    preventScrollReset: d,
    relative: p,
    viewTransition: g,
    unstable_defaultShouldRevalidate: h,
    unstable_useTransitions: m,
  } = {}
) {
  let E = Sl(),
    b = Ie(),
    N = Su(a, { relative: p });
  return T.useCallback(
    (X) => {
      if (Hv(X, c)) {
        X.preventDefault();
        let D = o !== void 0 ? o : gu(b) === gu(N),
          w = () =>
            E(a, {
              replace: D,
              unstable_mask: s,
              state: r,
              preventScrollReset: d,
              relative: p,
              viewTransition: g,
              unstable_defaultShouldRevalidate: h,
            });
        m ? T.startTransition(() => w()) : w();
      }
    },
    [b, E, N, o, s, r, c, a, d, p, g, h, m]
  );
}
var o1 = 0,
  r1 = () => `__${String(++o1)}__`;
function f1() {
  let { router: a } = Ty('useSubmit'),
    { basename: c } = T.useContext(Ce),
    o = Rv(),
    s = a.fetch,
    r = a.navigate;
  return T.useCallback(
    async (d, p = {}) => {
      let { action: g, method: h, encType: m, formData: E, body: b } = Yv(d, c);
      if (p.navigate === !1) {
        let N = p.fetcherKey || r1();
        await s(N, o, p.action || g, {
          unstable_defaultShouldRevalidate: p.unstable_defaultShouldRevalidate,
          preventScrollReset: p.preventScrollReset,
          formData: E,
          body: b,
          formMethod: p.method || h,
          formEncType: p.encType || m,
          flushSync: p.flushSync,
        });
      } else
        await r(p.action || g, {
          unstable_defaultShouldRevalidate: p.unstable_defaultShouldRevalidate,
          preventScrollReset: p.preventScrollReset,
          formData: E,
          body: b,
          formMethod: p.method || h,
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
function d1(a, { relative: c } = {}) {
  let { basename: o } = T.useContext(Ce),
    s = T.useContext(Qe);
  Bt(s, 'useFormAction must be used inside a RouteContext');
  let [r] = s.matches.slice(-1),
    d = { ...Su(a || '.', { relative: c }) },
    p = Ie();
  if (a == null) {
    d.search = p.search;
    let g = new URLSearchParams(d.search),
      h = g.getAll('index');
    if (h.some((E) => E === '')) {
      (g.delete('index'), h.filter((b) => b).forEach((b) => g.append('index', b)));
      let E = g.toString();
      d.search = E ? `?${E}` : '';
    }
  }
  return (
    (!a || a === '.') &&
      r.route.index &&
      (d.search = d.search ? d.search.replace(/^\?/, '?index&') : '?index'),
    o !== '/' && (d.pathname = d.pathname === '/' ? o : Ye([o, d.pathname])),
    gu(d)
  );
}
function m1(a, { relative: c } = {}) {
  let o = T.useContext(hy);
  Bt(
    o != null,
    "`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?"
  );
  let { basename: s } = Ty('useViewTransitionState'),
    r = Su(a, { relative: c });
  if (!o.isTransitioning) return !1;
  let d = vl(o.currentLocation.pathname, s) || o.currentLocation.pathname,
    p = vl(o.nextLocation.pathname, s) || o.nextLocation.pathname;
  return $i(r.pathname, p) != null || $i(r.pathname, d) != null;
}
const h1 = '_layout_apkdr_1',
  y1 = '_enemies_apkdr_12',
  p1 = '_enemy_apkdr_20',
  g1 = '_targeted_apkdr_35',
  v1 = '_enemyName_apkdr_39',
  _1 = '_down_apkdr_44',
  b1 = '_log_apkdr_48',
  S1 = '_logLine_apkdr_60',
  x1 = '_party_apkdr_64',
  E1 = '_rowTag_apkdr_71',
  T1 = '_cardRow_apkdr_77',
  N1 = '_card_apkdr_77',
  A1 = '_cardActive_apkdr_99',
  C1 = '_cardDecided_apkdr_104',
  M1 = '_cardName_apkdr_108',
  R1 = '_uni_apkdr_116',
  z1 = '_cardNums_apkdr_120',
  j1 = '_cardCmd_apkdr_126',
  O1 = '_empty_apkdr_132',
  D1 = '_command_apkdr_137',
  k1 = '_skillList_apkdr_143',
  w1 = '_skillBtn_apkdr_149',
  B1 = '_skillTop_apkdr_161',
  U1 = '_skillName_apkdr_168',
  L1 = '_skillDesc_apkdr_173',
  H1 = '_target_apkdr_35',
  q1 = '_cmdHead_apkdr_184',
  G1 = '_menu_apkdr_189',
  Y1 = '_menuBtn_apkdr_195',
  X1 = '_tp_apkdr_212',
  V1 = '_menuBack_apkdr_218',
  Q1 = '_execRow_apkdr_228',
  Z1 = '_redo_apkdr_233',
  K1 = '_primary_apkdr_243',
  $1 = '_result_apkdr_258',
  J1 = '_resultTitle_apkdr_269',
  W1 = '_resultBody_apkdr_274',
  ut = {
    layout: h1,
    enemies: y1,
    enemy: p1,
    targeted: g1,
    enemyName: v1,
    down: _1,
    log: b1,
    logLine: S1,
    party: x1,
    rowTag: E1,
    cardRow: T1,
    card: N1,
    cardActive: A1,
    cardDecided: C1,
    cardName: M1,
    uni: R1,
    cardNums: z1,
    cardCmd: j1,
    empty: O1,
    command: D1,
    skillList: k1,
    skillBtn: w1,
    skillTop: B1,
    skillName: U1,
    skillDesc: L1,
    target: H1,
    cmdHead: q1,
    menu: G1,
    menuBtn: Y1,
    tp: X1,
    menuBack: V1,
    execRow: Q1,
    redo: Z1,
    primary: K1,
    result: $1,
    resultTitle: J1,
    resultBody: W1,
  },
  I1 = '_row_1t6j7_1',
  F1 = '_label_1t6j7_8',
  P1 = '_track_1t6j7_16',
  t_ = '_fill_1t6j7_24',
  e_ = '_value_1t6j7_30',
  fu = { row: I1, label: F1, track: P1, fill: t_, value: e_ },
  wo = ({ value: a, max: c, color: o = '#4caf50', label: s, showValue: r = !0 }) => {
    const d = c > 0 ? Math.max(0, Math.min(100, (a / c) * 100)) : 0;
    return v.jsxs('div', {
      className: fu.row,
      children: [
        s ? v.jsx('span', { className: fu.label, children: s }) : null,
        v.jsx('div', {
          className: fu.track,
          children: v.jsx('div', {
            className: fu.fill,
            style: { width: `${d}%`, backgroundColor: o },
          }),
        }),
        r
          ? v.jsxs('span', {
              className: fu.value,
              children: [Math.max(0, Math.round(a)), '/', Math.round(c)],
            })
          : null,
      ],
    });
  },
  ia = {
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
    skill_union_rally: {
      id: 'skill_union_rally',
      name: 'ラリー',
      tree: 'race',
      tpCost: () => 0,
      element: 'almighty',
      target: 'allyAll',
      effects: [{ kind: 'heal', amount: (a) => 10 + 5 * a }],
    },
  },
  or = {
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
  Mt = {
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
  l_ = 500,
  Vo = 30,
  lc = 3,
  nc = 2,
  n_ = lc + nc,
  hu = { TITLE_DEPTH: 20, REBIRTH_MIN_LEVEL: 30 },
  Ny = 5,
  a_ = 5,
  rr = (a) => a > 0 && a % Mt.BOSS_INTERVAL === 0,
  qh = (a) => Math.round(Mt.EXP_CURVE_BASE * Math.pow(a, Mt.EXP_CURVE_POW)),
  Bo = (a) => a < Mt.LEVEL_CAP,
  Ay = (a, c) => 1 + Mt.ENEMY_SCALE_K * (a - c),
  xu = {
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
  Ae = {
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
  u_ = ['hp', 'tp', 'str', 'vit', 'agi', 'int', 'mnd', 'luc'],
  i_ = ['slash', 'pierce', 'bash'],
  Wi = (a, c, o) => Math.max(c, Math.min(o, a));
function c_(a, c) {
  const o = {};
  for (const s of u_) o[s] = Math.round(a[s] * c);
  return o;
}
function s_(a, c) {
  return c_(a.baseStats, Ay(c, a.refDepth));
}
function aa(a, c) {
  const o = new Map();
  for (const r of a) {
    if (r.stat !== c) continue;
    const d = Wi(r.modifier, 0.5, 1.5),
      p = o.get(r.stackGroup);
    (p === void 0 || Math.abs(d - 1) > Math.abs(p - 1)) && o.set(r.stackGroup, d);
  }
  let s = 1;
  for (const r of o.values()) s *= r;
  return Wi(s, 0.25, 2);
}
function Gh(a, c, o) {
  const s = (a.str * 2 + (c.atk ?? 0)) * aa(o, 'patk'),
    r = (a.vit * 2 + (c.def ?? 0)) * aa(o, 'pdef'),
    d = (a.int * 2 + (c.mat ?? 0)) * aa(o, 'matk'),
    p = (a.mnd * 2 + (c.mdf ?? 0)) * aa(o, 'mdef');
  return {
    patk: s,
    pdef: r,
    matk: d,
    mdef: p,
    hit: a.agi,
    acc: a.agi * aa(o, 'acc'),
    eva: a.agi * aa(o, 'eva'),
    crit: a.luc,
  };
}
const o_ = (a) => a.ailments.some((c) => c.type === 'blind');
function Cy(a, c, o, s) {
  const r = o.statBase === 'str',
    d = Gh(a.stats, a.equip, a.buffs),
    p = Gh(c.stats, c.equip, c.buffs),
    g = r ? d.patk : d.matk,
    h = r ? p.pdef : p.mdef;
  let m = !0;
  if (r) {
    const Z = o_(a) ? Mt.BLIND_ACC_PENALTY : 0,
      V = Wi(Mt.BASE_HIT + (d.acc - p.eva) * Mt.HIT_AGI_K - Z, Mt.HIT_MIN, 1);
    m = s.next() < V;
  }
  if (!m) return { damage: 0, hit: !1, critical: !1 };
  const b = (g * o.power * Mt.DAMAGE_DEF_K) / (Mt.DAMAGE_DEF_K + Math.max(0, h)),
    N = r && i_.includes(o.element),
    X = N && a.row === 'back' ? Mt.BACK_ROW_MELEE_MULT : 1,
    D = N && c.row === 'back' ? Mt.BACK_ROW_MELEE_MULT : 1,
    w = X * D,
    [L, k] = Mt.DMG_VARIANCE,
    Q = L + s.next() * (k - L);
  let O = b * o.elementMultiplier * w * Q;
  const Y = Wi(
      Mt.CRIT_BASE + (a.stats.luc - c.stats.luc) * Mt.CRIT_LUC_K,
      Mt.CRIT_MIN,
      Mt.CRIT_MAX
    ),
    $ = s.next() < Y;
  return (
    $ && (O *= Mt.CRIT_MULT),
    { damage: o.elementMultiplier === 0 ? 0 : Math.max(1, Math.floor(O)), hit: !0, critical: $ }
  );
}
const Xe = {
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
  Kl = (a) => ({ hp: 0, tp: 0, str: 0, vit: 0, agi: 0, int: 0, mnd: 0, luc: 0, ...a }),
  ca = {
    title_berserker: {
      id: 'title_berserker',
      name: '狂戦士',
      parentClassId: 'class_warrior',
      skillTree: { skills: [] },
      growthModifier: Kl({ str: 1 }),
    },
    title_sentinel: {
      id: 'title_sentinel',
      name: '哨戒兵',
      parentClassId: 'class_warrior',
      skillTree: { skills: [] },
      growthModifier: Kl({ vit: 1 }),
    },
    title_bulwark: {
      id: 'title_bulwark',
      name: '城壁',
      parentClassId: 'class_guardian',
      skillTree: { skills: [] },
      growthModifier: Kl({ vit: 1, hp: 2 }),
    },
    title_vanguard: {
      id: 'title_vanguard',
      name: '先鋒',
      parentClassId: 'class_guardian',
      skillTree: { skills: [] },
      growthModifier: Kl({ str: 1 }),
    },
    title_pyromancer: {
      id: 'title_pyromancer',
      name: '紅蓮術士',
      parentClassId: 'class_mage',
      skillTree: { skills: [] },
      growthModifier: Kl({ int: 1 }),
    },
    title_sage: {
      id: 'title_sage',
      name: '賢者',
      parentClassId: 'class_mage',
      skillTree: { skills: [] },
      growthModifier: Kl({ tp: 2, mnd: 1 }),
    },
    title_sniper: {
      id: 'title_sniper',
      name: '狙撃手',
      parentClassId: 'class_ranger',
      skillTree: { skills: [] },
      growthModifier: Kl({ agi: 1, luc: 1 }),
    },
    title_tracker: {
      id: 'title_tracker',
      name: '追跡者',
      parentClassId: 'class_ranger',
      skillTree: { skills: [] },
      growthModifier: Kl({ agi: 1 }),
    },
  },
  r_ = ['hp', 'tp', 'str', 'vit', 'agi', 'int', 'mnd', 'luc'];
function Eu(a) {
  var g, h;
  const c = Xe[a.raceId];
  if (!c) throw new Error(`computeBaseStats: 未定義の種族 "${a.raceId}"`);
  const s = Math.max(1, Math.min(a.level, Mt.LEVEL_CAP)) - 1,
    r = a.titleId ? ((g = ca[a.titleId]) == null ? void 0 : g.growthModifier) : void 0,
    d = ((h = a.rebirthBonus) == null ? void 0 : h.allStats) ?? 0,
    p = {};
  for (const m of r_) {
    const E = c.statGrowth[m] + ((r == null ? void 0 : r[m]) ?? 0);
    p[m] = c.baseStatsAtLv1[m] + E * s + d;
  }
  return p;
}
const ma = (a, c, o) => Math.max(c, Math.min(o, a));
function f_(a) {
  const c = { atk: 0, mat: 0, def: 0, mdf: 0 };
  for (const o of Object.values(a.equipment)) {
    if (!o) continue;
    const s = Ae[o];
    s &&
      ((c.atk += s.bonuses.atk ?? 0),
      (c.mat += s.bonuses.mat ?? 0),
      (c.def += s.bonuses.def ?? 0),
      (c.mdf += s.bonuses.mdf ?? 0));
  }
  return c;
}
function d_(a, c) {
  var p;
  const o = a.guild.members.find((g) => g.id === c);
  if (!o) return null;
  const s = (p = a.diveState) == null ? void 0 : p.party.find((g) => g.charId === c),
    r = Eu(o),
    d = a.guild.party.front.includes(c);
  return {
    id: c,
    name: o.name,
    side: 'ally',
    row: d ? 'front' : 'back',
    stats: r,
    equip: f_(o),
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
function m_(a, c, o) {
  const s = xu[a],
    r = s_(s, o);
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
    enemyId: a,
    resist: s.resist,
  };
}
function h_(a, c) {
  var p;
  const o = ((p = a.diveState) == null ? void 0 : p.depth) ?? 1,
    r = [...a.guild.party.front, ...a.guild.party.back]
      .filter((g) => g !== null)
      .map((g) => d_(a, g))
      .filter((g) => g !== null),
    d = c.map((g, h) => m_(g, h, o));
  return { turn: 1, depth: o, allies: r, enemies: d, log: [], outcome: 'ongoing' };
}
const Le = (a, c) => (c === 'ally' ? a.allies : a.enemies).filter((o) => !o.isDown);
function yu(a, c) {
  return a.allies.find((o) => o.id === c) ?? a.enemies.find((o) => o.id === c);
}
const My = (a, c) => {
  var o;
  return ((o = a.resist) == null ? void 0 : o[c]) ?? 1;
};
function fr(a, c, o) {
  ((a.hp = ma(a.hp - c, 0, a.maxHp)),
    a.hp === 0 &&
      !a.isDown &&
      ((a.isDown = !0),
      (a.unionGauge = Math.floor(a.unionGauge / 2)),
      o.push({ text: `${a.name} は倒れた！` })));
}
function Ii(a, c) {
  a.isDown || (a.unionGauge = ma(a.unionGauge + c, 0, 100));
}
function Qo(a, c) {
  ((a.buffs = a.buffs.filter((o) => !(o.stat === c.stat && o.stackGroup === c.stackGroup))),
    a.buffs.push(c));
}
function y_(a, c) {
  const o = a.ailments.find((s) => s.type === c.type);
  if (o) {
    o.remainingTurns = Math.max(o.remainingTurns, c.remainingTurns);
    return;
  }
  a.ailments.push(c);
}
function p_(a, c, o) {
  return ma(a * (1 + (c.stats.luc - o.stats.luc) * Mt.AILMENT_LUC_K), 0, Mt.AILMENT_MAX);
}
function g_(a, c, o, s) {
  switch (o.target) {
    case 'self':
      return [c];
    case 'allyAll':
      return Le(a, c.side);
    case 'allyOne': {
      const r = yu(a, s);
      return r ? [r] : [];
    }
    case 'enemyAll':
      return Le(a, c.side === 'ally' ? 'enemy' : 'ally');
    case 'enemyRow':
    case 'enemyOne':
    default: {
      const r = yu(a, s);
      return r ? [r] : [];
    }
  }
}
function v_(a, c, o, s, r, d, p) {
  switch (o.kind) {
    case 'damage': {
      const g = o.hits ?? 1;
      for (const h of d)
        if (!h.isDown)
          for (let m = 0; m < g; m++) {
            const E = Cy(
              c,
              h,
              { statBase: o.statBase, power: o.power(r), element: s, elementMultiplier: My(h, s) },
              p
            );
            E.hit
              ? (fr(h, E.damage, a.log),
                Ii(h, 5),
                a.log.push({
                  text: `${c.name} の攻撃！ ${h.name} に ${E.damage} ダメージ${E.critical ? '（会心）' : ''}`,
                }))
              : a.log.push({ text: `${c.name} の攻撃は外れた` });
          }
      break;
    }
    case 'heal': {
      const g = o.amount(r);
      for (const h of d) h.isDown || (h.hp = ma(h.hp + g, 0, h.maxHp));
      a.log.push({ text: `${c.name} は回復魔法を使った（+${g}）` });
      break;
    }
    case 'buff': {
      for (const g of d)
        Qo(g, {
          stat: o.stat,
          modifier: o.modifier(r),
          remainingTurns: o.turns,
          stackGroup: o.stackGroup,
        });
      a.log.push({ text: `${c.name} は態勢を整えた` });
      break;
    }
    case 'ailment': {
      for (const g of d) {
        if (g.isDown) continue;
        const h = p_(o.chance(r), c, g);
        p.next() < h &&
          (y_(g, { type: o.ailment, remainingTurns: o.turns, magnitude: o.magnitude }),
          a.log.push({ text: `${g.name} は${o.ailment}になった` }));
      }
      break;
    }
  }
}
function Yh(a, c, o, s) {
  if (o.isDown) return;
  const r = c.enemyId ? (xu[c.enemyId].attackElement ?? 'bash') : 'bash',
    d = Cy(c, o, { statBase: 'str', power: 1, element: r, elementMultiplier: My(o, r) }, s);
  d.hit
    ? (fr(o, d.damage, a.log),
      Ii(c, 5),
      Ii(o, 5),
      a.log.push({
        text: `${c.name} の攻撃！ ${o.name} に ${d.damage} ダメージ${d.critical ? '（会心）' : ''}`,
      }))
    : a.log.push({ text: `${c.name} の攻撃は外れた` });
}
const Xh = (a) => (a.length === 0 ? 0 : a.reduce((c, o) => c + o.stats.agi, 0) / a.length),
  __ = (a) => a.ailments.some((c) => c.type === 'paralysis');
function Vh(a, c, o) {
  if (a.outcome !== 'ongoing') return a;
  const s = structuredClone({ ...a, log: [] }),
    r = new Map(c.map((g) => [g.actorId, g]));
  if (c.some((g) => g.kind === 'flee')) {
    const g = ma(0.5 + (Xh(Le(s, 'ally')) - Xh(Le(s, 'enemy'))) * 0.02, 0.1, 0.95);
    if (o.next() < g) return (s.log.push({ text: 'うまく逃げ切れた！' }), (s.outcome = 'fled'), s);
    s.log.push({ text: '逃げられなかった！' });
  }
  for (const g of c) {
    if (g.kind !== 'guard') continue;
    const h = yu(s, g.actorId);
    !h ||
      h.isDown ||
      (Qo(h, { stat: 'pdef', modifier: 1.5, remainingTurns: 1, stackGroup: 'guard' }),
      Qo(h, { stat: 'mdef', modifier: 1.5, remainingTurns: 1, stackGroup: 'guard' }));
  }
  const d = new Map();
  for (const g of Le(s, 'enemy')) {
    const h = Le(s, 'ally');
    h.length > 0 && d.set(g.id, o.pick(h).id);
  }
  const p = [...s.allies, ...s.enemies]
    .filter((g) => !g.isDown)
    .map((g) => ({ c: g, agi: g.stats.agi, tie: o.next() }))
    .sort((g, h) => h.agi - g.agi || h.tie - g.tie)
    .map((g) => g.c);
  for (const g of p)
    if (!g.isDown) {
      if (s.outcome !== 'ongoing') break;
      if (__(g) && o.next() < Mt.PARALYSIS_SKIP) {
        s.log.push({ text: `${g.name} は麻痺で動けない` });
        continue;
      }
      if (g.side === 'enemy') {
        const h = d.get(g.id),
          m = h ? yu(s, h) : void 0,
          E = m && !m.isDown ? m : Le(s, 'ally')[0];
        E && Yh(s, g, E, o);
      } else {
        const h = r.get(g.id);
        if (!h || h.kind === 'guard' || h.kind === 'flee') continue;
        if (h.kind === 'attack') {
          const m = yu(s, h.targetId),
            E = m && !m.isDown ? m : Le(s, 'enemy')[0];
          E && Yh(s, g, E, o);
        } else if (h.kind === 'skill') {
          const m = ia[h.skillId];
          if (!m) continue;
          const E = 1,
            b = m.tpCost(E);
          if (g.tp < b) {
            s.log.push({ text: `${g.name} は TP が足りない` });
            continue;
          }
          ((g.tp -= b), Ii(g, 10));
          const N = g_(s, g, m, h.targetId);
          for (const X of m.effects) v_(s, g, X, m.element, E, N, o);
        }
      }
      if (Le(s, 'enemy').length === 0 || Le(s, 'ally').length === 0) break;
    }
  for (const g of [...s.allies, ...s.enemies]) {
    if (g.isDown) continue;
    const h = g.ailments.find((m) => m.type === 'poison');
    if (h) {
      const m = h.magnitude ?? Math.max(1, Math.floor(g.maxHp * Mt.POISON_HP_RATIO));
      (fr(g, m, s.log), s.log.push({ text: `${g.name} は毒で ${m} のダメージ` }));
    }
  }
  for (const g of [...s.allies, ...s.enemies])
    (!g.isDown &&
      g.maxTp > 0 &&
      (g.tp = Math.min(g.maxTp, g.tp + Math.ceil(g.maxTp * Mt.TP_REGEN_RATIO))),
      (g.buffs = g.buffs
        .map((h) => ({ ...h, remainingTurns: h.remainingTurns - 1 }))
        .filter((h) => h.remainingTurns > 0)),
      (g.ailments = g.ailments
        .map((h) => ({ ...h, remainingTurns: h.remainingTurns - 1 }))
        .filter((h) => h.remainingTurns > 0)));
  return (
    (s.turn += 1),
    Le(s, 'enemy').length === 0
      ? (s.outcome = 'win')
      : Le(s, 'ally').length === 0 && (s.outcome = 'lose'),
    s
  );
}
function Ry(a) {
  let c = 0,
    o = 0;
  for (const s of a.enemies) {
    if (!s.enemyId) continue;
    const r = xu[s.enemyId],
      d = Ay(a.depth, r.refDepth);
    ((c += Math.round(r.exp * d)), (o += Math.round(r.gold * d)));
  }
  return { exp: c, gold: o };
}
function b_(a, c) {
  let o = a.level,
    s = a.exp + (Bo(o) ? c : 0),
    r = a.skillPoints.total;
  for (; Bo(o) && s >= qh(o); ) ((s -= qh(o)), (o += 1), (r += Mt.SP_PER_LEVEL));
  return {
    ...a,
    level: o,
    exp: Bo(a.level) ? s : a.exp,
    skillPoints: { ...a.skillPoints, total: r },
  };
}
function Qh(a, c) {
  if (!a.diveState) return a;
  const o = c.outcome === 'win',
    s = c.outcome === 'win' || c.outcome === 'fled',
    r = new Map(c.allies.map((E) => [E.id, E])),
    d = a.diveState.party.map((E) => {
      const b = r.get(E.charId);
      if (!b) return E;
      let N = b.unionGauge;
      return (
        s && !b.isDown && (N = ma(N + Mt.UNION_GAIN_ON_WIN, 0, 100)),
        { ...E, hp: b.hp, tp: b.tp, unionGauge: N, ailments: b.ailments }
      );
    });
  let p = a.guild.members,
    g = a.guild.gold;
  const h = { ...a.bestiary.monsters };
  for (const E of c.enemies) {
    if (!E.enemyId) continue;
    const b = h[E.enemyId] ?? { seen: !1, defeated: !1, dropsFound: [] };
    h[E.enemyId] = { ...b, seen: !0, defeated: b.defeated || E.isDown };
  }
  const m = { ...a.bestiary, monsters: h };
  if (o) {
    const { exp: E, gold: b } = Ry(c);
    g += b;
    const N = new Set(d.map((D) => D.charId)),
      X = N.size > 0 ? Math.floor(E / N.size) : 0;
    p = p.map((D) => (N.has(D.id) ? b_(D, X) : D));
  }
  return {
    ...a,
    guild: { ...a.guild, members: p, gold: g, bestiary: m },
    bestiary: m,
    diveState: { ...a.diveState, party: d },
  };
}
const S_ = 8,
  Zo = 16,
  pu = 5;
function dr(a) {
  return a.range(S_, Zo);
}
function x_(a, c) {
  const o = a - 1;
  return o <= 0
    ? { stepsUntilEncounter: dr(c), triggered: !0 }
    : { stepsUntilEncounter: o, triggered: !1 };
}
function E_(a) {
  const c = Math.max(0, Zo - a),
    o = Math.round((c / Zo) * pu);
  return Math.min(pu, Math.max(0, o));
}
const gl = { N: { dx: 0, dy: -1 }, E: { dx: 1, dy: 0 }, S: { dx: 0, dy: 1 }, W: { dx: -1, dy: 0 } },
  T_ = { N: 'S', E: 'W', S: 'N', W: 'E' };
function N_(a) {
  return Math.min(25, 15 + Math.floor(a / 5));
}
function A_() {
  return { walls: { N: !0, E: !0, S: !0, W: !0 }, floorType: 'normal', passable: !0 };
}
const Ko = (a, c, o, s) => a >= 0 && c >= 0 && a < o && c < s;
function Zh(a, c, o, s) {
  const { dx: r, dy: d } = gl[s];
  ((a[o][c].walls[s] = !1), (a[o + d][c + r].walls[T_[s]] = !1));
}
function C_(a, c, o) {
  const s = a.length,
    r = a[0].length,
    d = Array.from({ length: s }, () => Array(r).fill(-1)),
    p = [{ x: c, y: o }];
  d[o][c] = 0;
  for (let g = 0; g < p.length; g++) {
    const { x: h, y: m } = p[g];
    for (const E of ['N', 'E', 'S', 'W']) {
      if (a[m][h].walls[E]) continue;
      const b = h + gl[E].dx,
        N = m + gl[E].dy;
      !Ko(b, N, r, s) || d[N][b] !== -1 || ((d[N][b] = d[m][h] + 1), p.push({ x: b, y: N }));
    }
  }
  return d;
}
function M_(a, c) {
  const o = N_(a),
    s = o,
    r = o,
    d = Array.from({ length: r }, () => Array.from({ length: s }, () => A_())),
    p = Array.from({ length: r }, () => Array(s).fill(!1)),
    g = c.int(s),
    h = c.int(r),
    m = [{ x: g, y: h }];
  for (p[h][g] = !0; m.length > 0; ) {
    const k = m[m.length - 1],
      Q = [];
    for (const J of ['N', 'E', 'S', 'W']) {
      const Z = k.x + gl[J].dx,
        V = k.y + gl[J].dy;
      Ko(Z, V, s, r) && !p[V][Z] && Q.push(J);
    }
    if (Q.length === 0) {
      m.pop();
      continue;
    }
    const O = c.pick(Q);
    Zh(d, k.x, k.y, O);
    const Y = k.x + gl[O].dx,
      $ = k.y + gl[O].dy;
    ((p[$][Y] = !0), m.push({ x: Y, y: $ }));
  }
  const E = Math.floor((s * r) / 25);
  for (let k = 0; k < E; k++) {
    const Q = c.int(s),
      O = c.int(r),
      Y = c.pick(['N', 'E', 'S', 'W']),
      $ = Q + gl[Y].dx,
      J = O + gl[Y].dy;
    Ko($, J, s, r) && d[O][Q].walls[Y] && Zh(d, Q, O, Y);
  }
  const b = c.int(s),
    N = c.int(r),
    X = C_(d, b, N);
  let D = b,
    w = N,
    L = -1;
  for (let k = 0; k < r; k++)
    for (let Q = 0; Q < s; Q++) X[k][Q] > L && ((L = X[k][Q]), (D = Q), (w = k));
  return (
    (d[N][b].event = { kind: 'stairsDown' }),
    (d[w][D].event = { kind: 'stairsUp' }),
    {
      depth: a,
      width: s,
      height: r,
      cells: d,
      encounterTable: `band_${Math.floor((a - 1) / 10)}`,
      foeSpawns: [],
      bgmId: rr(a) ? 'bgm_boss' : 'bgm_dungeon',
    }
  );
}
function zy(a, c) {
  var o;
  for (let s = 0; s < a.height; s++)
    for (let r = 0; r < a.width; r++)
      if (((o = a.cells[s][r].event) == null ? void 0 : o.kind) === c) return { x: r, y: s };
  return null;
}
const sa = { N: { dx: 0, dy: -1 }, E: { dx: 1, dy: 0 }, S: { dx: 0, dy: 1 }, W: { dx: -1, dy: 0 } },
  oa = ['N', 'E', 'S', 'W'];
function jy(a) {
  return oa[(oa.indexOf(a) + 1) % 4];
}
function Oy(a) {
  return oa[(oa.indexOf(a) + 3) % 4];
}
function R_(a) {
  return oa[(oa.indexOf(a) + 2) % 4];
}
const z_ = (a, c, o) => a >= 0 && c >= 0 && a < o.width && c < o.height;
function Dy(a, c, o, s) {
  if (a.cells[o][c].walls[s]) return !1;
  const r = c + sa[s].dx,
    d = o + sa[s].dy;
  return z_(r, d, a) ? a.cells[d][r].passable : !1;
}
function j_(a, c, o) {
  return Dy(a, c.x, c.y, o) ? { x: c.x + sa[o].dx, y: c.y + sa[o].dy } : null;
}
function mr(a, c, o) {
  return ['N', 'E', 'S', 'W'].filter((s) => !a.cells[o][c].walls[s]);
}
const O_ = 4294967296;
function D_(a, c) {
  let o = 3735928559 ^ a,
    s = 1103547991 ^ a;
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
class hr {
  constructor(c, o) {
    No(this, 'baseSeed');
    No(this, '_state');
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
      ((c ^ (c >>> 14)) >>> 0) / O_
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
    const o = D_(this.baseSeed, c);
    return new hr(o, o);
  }
}
function ha(a) {
  return new hr(a, a);
}
function k_() {
  return Math.floor(Math.random() * 4294967296) >>> 0;
}
const Kh = (a, c) => `${a},${c}`;
function w_(a, c) {
  return ha(a).fork(`floor:${c}`);
}
function ky(a, c) {
  const o = a.towerState.floors[c];
  if (o) return { save: a, floor: o };
  const s = M_(c, w_(a.masterSeed, c)),
    r = {
      depth: c,
      seed: a.masterSeed,
      generated: s,
      isBossFloor: rr(c),
      encounterTier: Math.floor((c - 1) / 10),
      foeRuntime: [],
      openedChests: [],
      depletedGathers: [],
      consumedEvents: [],
    };
  return {
    save: { ...a, towerState: { ...a.towerState, floors: { ...a.towerState.floors, [c]: r } } },
    floor: r,
  };
}
function B_(a) {
  const c = [...a.guild.party.front, ...a.guild.party.back].filter((s) => s !== null),
    o = [];
  for (const s of c) {
    const r = a.guild.members.find((p) => p.id === s);
    if (!r) continue;
    const d = Eu(r);
    o.push({ charId: s, hp: d.hp, tp: d.tp, unionGauge: 0, ailments: [] });
  }
  return o;
}
function yr(a, c, o, s) {
  const r = a.towerState.floors[c].generated,
    d = new Set(a.exploredCells[c] ?? []);
  d.add(Kh(o, s));
  for (const p of mr(r, o, s)) {
    const g = o + (p === 'E' ? 1 : p === 'W' ? -1 : 0),
      h = s + (p === 'S' ? 1 : p === 'N' ? -1 : 0);
    d.add(Kh(g, h));
  }
  return { ...a, exploredCells: { ...a.exploredCells, [c]: [...d] } };
}
function wy(a, c, o) {
  var h, m;
  const s = ky(a, c);
  let r = s.save;
  const d = s.floor.generated,
    p = zy(d, 'stairsDown') ?? { x: 0, y: 0 },
    g = mr(d, p.x, p.y)[0] ?? 'N';
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
        dir: g,
        party: ((h = r.diveState) == null ? void 0 : h.party) ?? B_(r),
        persistentSummons: ((m = r.diveState) == null ? void 0 : m.persistentSummons) ?? [],
        encounter: { stepsUntilEncounter: dr(o) },
      },
    }),
    yr(r, c, p.x, p.y)
  );
}
function U_(a, c = 1) {
  const o = ha(a.masterSeed).fork(`dive:${a.towerState.record.totalDives}`),
    s = {
      ...a,
      diveState: null,
      towerState: {
        ...a.towerState,
        record: { ...a.towerState.record, totalDives: a.towerState.record.totalDives + 1 },
      },
    };
  return wy(s, c, o);
}
function By(a, c) {
  return a.diveState ? { ...a, diveState: { ...a.diveState, dir: c } } : a;
}
function L_(a, c, o) {
  const s = a.diveState;
  if (!s) return { save: a, moved: !1, triggered: !1 };
  const r = a.towerState.floors[s.depth].generated,
    d = j_(r, s.pos, c);
  if (!d) return { save: By(a, c), moved: !1, triggered: !1 };
  const p = x_(s.encounter.stepsUntilEncounter, o);
  let g = {
    ...a,
    diveState: { ...s, pos: d, dir: c, encounter: { stepsUntilEncounter: p.stepsUntilEncounter } },
  };
  return ((g = yr(g, s.depth, d.x, d.y)), { save: g, moved: !0, triggered: p.triggered });
}
function $h(a) {
  const c = a.diveState;
  if (!c) return null;
  const o = a.towerState.floors[c.depth].generated.cells[c.pos.y][c.pos.x].event;
  return (o == null ? void 0 : o.kind) === 'stairsUp' ||
    (o == null ? void 0 : o.kind) === 'stairsDown'
    ? o.kind
    : null;
}
function H_(a) {
  if (!a.diveState) return a;
  const c = a.diveState.depth + 1,
    o = ha(a.masterSeed).fork(`enc:${c}:${a.towerState.record.totalDives}`);
  return wy(a, c, o);
}
function q_(a) {
  if (!a.diveState) return a;
  const c = a.diveState.depth;
  if (c <= 1) return vu(a);
  const o = c - 1,
    s = ky(a, o),
    r = zy(s.floor.generated, 'stairsUp') ?? { x: 0, y: 0 },
    d = ha(a.masterSeed).fork(`enc:${o}:${a.towerState.record.totalDives}`);
  let p = s.save;
  const g = s.floor.generated,
    h = mr(g, r.x, r.y)[0] ?? 'N';
  return (
    (p = {
      ...p,
      diveState: {
        ...p.diveState,
        depth: o,
        pos: { x: r.x, y: r.y },
        dir: h,
        encounter: { stepsUntilEncounter: dr(d) },
      },
    }),
    yr(p, o, r.x, r.y)
  );
}
function vu(a) {
  return { ...a, diveState: null };
}
const G_ = { 10: 'enemy_boss_gatekeeper' };
function Y_(a) {
  const c = Math.floor((a - 1) / 10);
  return Object.values(xu)
    .filter((o) => o.tierBand === c && !o.id.startsWith('enemy_boss'))
    .map((o) => o.id);
}
function X_(a, c) {
  if (rr(a)) {
    const r = G_[a];
    if (r) return [r];
  }
  const o = Y_(a);
  if (o.length === 0) return [];
  const s = c.range(1, 3);
  return Array.from({ length: s }, () => c.pick(o));
}
const ue = {
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
  Ki = 1,
  V_ = { autoMap: 'on', bgmVolume: 0.6, seVolume: 0.6 };
function Jh() {
  return { monsters: {}, items: {} };
}
function Q_() {
  return { deepestReached: 0, highestBossDefeated: 0, totalDives: 0, bossDefeatLog: [] };
}
const Z_ = () => ({ weapon: null, armor: null, accessory: null });
function K_() {
  return `char_${Date.now().toString(36)}_${Math.floor(Math.random() * 16777215).toString(36)}`;
}
function Uy(a) {
  var g;
  const { raceId: c, classId: o, name: s, id: r } = a;
  if (!Xe[c]) throw new Error(`createCharacter: 未定義の種族 "${c}"`);
  if (!ue[o]) throw new Error(`createCharacter: 未定義の職業 "${o}"`);
  const d = (g = ue[o].skillTree.skills[0]) == null ? void 0 : g.skillId,
    p = d ? { [d]: 1 } : {};
  return {
    id: r ?? K_(),
    name: s,
    raceId: c,
    classId: o,
    titleId: null,
    level: 1,
    exp: 0,
    skillPoints: { total: 0, spent: 0 },
    learnedSkills: p,
    equipment: Z_(),
  };
}
function $_() {
  return { front: Array(lc).fill(null), back: Array(nc).fill(null) };
}
function J_(a, c) {
  const o = a.front.indexOf(null);
  if (o !== -1) {
    const r = [...a.front];
    return ((r[o] = c), { ...a, front: r });
  }
  const s = a.back.indexOf(null);
  if (s !== -1) {
    const r = [...a.back];
    return ((r[s] = c), { ...a, back: r });
  }
  return a;
}
function W_(a, c) {
  return a.guild.members.length >= Vo
    ? a
    : {
        ...a,
        guild: { ...a.guild, members: [...a.guild.members, c], party: J_(a.guild.party, c.id) },
      };
}
function I_(a) {
  return {
    schemaVersion: Ki,
    savedAt: 0,
    masterSeed: k_(),
    settings: { ...V_ },
    guild: { name: a, gold: l_, members: [], party: $_(), storage: [], bestiary: Jh() },
    towerState: { floors: {}, bossGates: {}, warp: { unlockedCheckpoints: [] }, record: Q_() },
    diveState: null,
    bestiary: Jh(),
    playerMaps: {},
    exploredCells: {},
    forgeInventory: { fragments: {}, ingots: { copper: 0, silver: 0, gold: 0 } },
    shopStock: { unlockedTier: 0, unlockedItemIds: [] },
    flags: {},
  };
}
const $o = (a, c) => c.some((o) => a instanceof o);
let Wh, Ih;
function F_() {
  return Wh || (Wh = [IDBDatabase, IDBObjectStore, IDBIndex, IDBCursor, IDBTransaction]);
}
function P_() {
  return (
    Ih ||
    (Ih = [
      IDBCursor.prototype.advance,
      IDBCursor.prototype.continue,
      IDBCursor.prototype.continuePrimaryKey,
    ])
  );
}
const Jo = new WeakMap(),
  Uo = new WeakMap(),
  ac = new WeakMap();
function tb(a) {
  const c = new Promise((o, s) => {
    const r = () => {
        (a.removeEventListener('success', d), a.removeEventListener('error', p));
      },
      d = () => {
        (o(vn(a.result)), r());
      },
      p = () => {
        (s(a.error), r());
      };
    (a.addEventListener('success', d), a.addEventListener('error', p));
  });
  return (ac.set(c, a), c);
}
function eb(a) {
  if (Jo.has(a)) return;
  const c = new Promise((o, s) => {
    const r = () => {
        (a.removeEventListener('complete', d),
          a.removeEventListener('error', p),
          a.removeEventListener('abort', p));
      },
      d = () => {
        (o(), r());
      },
      p = () => {
        (s(a.error || new DOMException('AbortError', 'AbortError')), r());
      };
    (a.addEventListener('complete', d),
      a.addEventListener('error', p),
      a.addEventListener('abort', p));
  });
  Jo.set(a, c);
}
let Wo = {
  get(a, c, o) {
    if (a instanceof IDBTransaction) {
      if (c === 'done') return Jo.get(a);
      if (c === 'store')
        return o.objectStoreNames[1] ? void 0 : o.objectStore(o.objectStoreNames[0]);
    }
    return vn(a[c]);
  },
  set(a, c, o) {
    return ((a[c] = o), !0);
  },
  has(a, c) {
    return a instanceof IDBTransaction && (c === 'done' || c === 'store') ? !0 : c in a;
  },
};
function Ly(a) {
  Wo = a(Wo);
}
function lb(a) {
  return P_().includes(a)
    ? function (...c) {
        return (a.apply(Io(this), c), vn(this.request));
      }
    : function (...c) {
        return vn(a.apply(Io(this), c));
      };
}
function nb(a) {
  return typeof a == 'function'
    ? lb(a)
    : (a instanceof IDBTransaction && eb(a), $o(a, F_()) ? new Proxy(a, Wo) : a);
}
function vn(a) {
  if (a instanceof IDBRequest) return tb(a);
  if (Uo.has(a)) return Uo.get(a);
  const c = nb(a);
  return (c !== a && (Uo.set(a, c), ac.set(c, a)), c);
}
const Io = (a) => ac.get(a);
function ab(a, c, { blocked: o, upgrade: s, blocking: r, terminated: d } = {}) {
  const p = indexedDB.open(a, c),
    g = vn(p);
  return (
    s &&
      p.addEventListener('upgradeneeded', (h) => {
        s(vn(p.result), h.oldVersion, h.newVersion, vn(p.transaction), h);
      }),
    o && p.addEventListener('blocked', (h) => o(h.oldVersion, h.newVersion, h)),
    g
      .then((h) => {
        (d && h.addEventListener('close', () => d()),
          r && h.addEventListener('versionchange', (m) => r(m.oldVersion, m.newVersion, m)));
      })
      .catch(() => {}),
    g
  );
}
const ub = ['get', 'getKey', 'getAll', 'getAllKeys', 'count'],
  ib = ['put', 'add', 'delete', 'clear'],
  Lo = new Map();
function Fh(a, c) {
  if (!(a instanceof IDBDatabase && !(c in a) && typeof c == 'string')) return;
  if (Lo.get(c)) return Lo.get(c);
  const o = c.replace(/FromIndex$/, ''),
    s = c !== o,
    r = ib.includes(o);
  if (!(o in (s ? IDBIndex : IDBObjectStore).prototype) || !(r || ub.includes(o))) return;
  const d = async function (p, ...g) {
    const h = this.transaction(p, r ? 'readwrite' : 'readonly');
    let m = h.store;
    return (s && (m = m.index(g.shift())), (await Promise.all([m[o](...g), r && h.done]))[0]);
  };
  return (Lo.set(c, d), d);
}
Ly((a) => ({
  ...a,
  get: (c, o, s) => Fh(c, o) || a.get(c, o, s),
  has: (c, o) => !!Fh(c, o) || a.has(c, o),
}));
const cb = ['continue', 'continuePrimaryKey', 'advance'],
  Ph = {},
  Fo = new WeakMap(),
  Hy = new WeakMap(),
  sb = {
    get(a, c) {
      if (!cb.includes(c)) return a[c];
      let o = Ph[c];
      return (
        o ||
          (o = Ph[c] =
            function (...s) {
              Fo.set(this, Hy.get(this)[c](...s));
            }),
        o
      );
    },
  };
async function* ob(...a) {
  let c = this;
  if ((c instanceof IDBCursor || (c = await c.openCursor(...a)), !c)) return;
  c = c;
  const o = new Proxy(c, sb);
  for (Hy.set(o, c), ac.set(o, Io(c)); c; )
    (yield o, (c = await (Fo.get(o) || c.continue())), Fo.delete(o));
}
function ty(a, c) {
  return (
    (c === Symbol.asyncIterator && $o(a, [IDBIndex, IDBObjectStore, IDBCursor])) ||
    (c === 'iterate' && $o(a, [IDBIndex, IDBObjectStore]))
  );
}
Ly((a) => ({
  ...a,
  get(c, o, s) {
    return ty(c, o) ? ob : a.get(c, o, s);
  },
  has(c, o) {
    return ty(c, o) || a.has(c, o);
  },
}));
const rb = {};
function fb(a) {
  return structuredClone(a);
}
function mu(a) {
  return typeof a == 'object' && a !== null && !Array.isArray(a);
}
function db(a) {
  if (
    !mu(a) ||
    typeof a.schemaVersion != 'number' ||
    typeof a.masterSeed != 'number' ||
    !mu(a.guild)
  )
    return !1;
  const c = a.guild;
  return !(
    typeof c.name != 'string' ||
    !Array.isArray(c.members) ||
    !mu(a.towerState) ||
    !mu(a.towerState.record) ||
    typeof a.towerState.record.deepestReached != 'number'
  );
}
function qy(a) {
  if (!mu(a) || typeof a.schemaVersion != 'number')
    return { ok: !1, reason: 'セーブデータの構造が不正です' };
  let c = a.schemaVersion;
  if (c > Ki) return { ok: !1, reason: `未知のバージョン (${c} > ${Ki}) のセーブデータです` };
  let o = { ...a };
  for (; c < Ki; ) {
    const s = rb[c];
    if (!s) return { ok: !1, reason: `バージョン ${c} の migration が未定義です` };
    ((o = s(o)), (c = typeof o.schemaVersion == 'number' ? o.schemaVersion : c + 1));
  }
  return db(o)
    ? { ok: !0, data: o }
    : { ok: !1, reason: 'migration 後のデータが SaveData の形をしていません' };
}
function mb(a) {
  return {
    guildName: a.guild.name,
    deepestReached: a.towerState.record.deepestReached,
    memberCount: a.guild.members.length,
    savedAt: a.savedAt,
  };
}
function ey() {
  return {
    guildName: '(破損データ)',
    deepestReached: 0,
    memberCount: 0,
    savedAt: 0,
    corrupted: !0,
  };
}
const hb = 'sekaiju-like-game',
  yb = 1,
  _u = 'saves',
  pr = 'main';
let Ho = null;
function gr() {
  return (
    Ho ||
      (Ho = ab(hb, yb, {
        upgrade(a) {
          a.objectStoreNames.contains(_u) || a.createObjectStore(_u);
        },
      })),
    Ho
  );
}
async function qo(a) {
  const c = { ...a, savedAt: Date.now() };
  return (await (await gr()).put(_u, fb(c), pr), c);
}
async function pb() {
  const c = await (await gr()).get(_u, pr);
  return c === void 0 ? { ok: !1, reason: 'empty' } : qy(c);
}
async function gb() {
  const c = await (await gr()).get(_u, pr);
  if (c === void 0) return null;
  const o = qy(c);
  if (!o.ok) return ey();
  try {
    return mb(o.data);
  } catch {
    return ey();
  }
}
const Gy = { save: null, saving: !1 };
function vb(a, c) {
  switch (c.type) {
    case 'load':
      return { ...a, save: c.save };
    case 'updateSave':
      return a.save ? { ...a, save: c.updater(a.save) } : a;
    case 'setSave':
      return { ...a, save: c.save };
    case 'saving':
      return { ...a, saving: c.saving };
    case 'clear':
      return { ...Gy };
  }
}
const Yy = T.createContext(null);
function _b(a) {
  const c = T.useRef(a);
  return ((c.current = a), c);
}
function bb({ children: a }) {
  const [c, o] = T.useReducer(vb, Gy),
    s = _b(c),
    r = T.useCallback(async (b) => {
      const N = I_(b),
        X = await qo(N);
      o({ type: 'load', save: X });
    }, []),
    d = T.useCallback(async () => {
      const b = await pb();
      return b.ok ? (o({ type: 'load', save: b.data }), { ok: !0 }) : { ok: !1, reason: b.reason };
    }, []),
    p = T.useCallback((b) => {
      o({ type: 'updateSave', updater: b });
    }, []),
    g = T.useCallback(
      async (b) => {
        const N = s.current.save;
        if (!N) return;
        const X = b(N);
        (o({ type: 'setSave', save: X }), o({ type: 'saving', saving: !0 }));
        try {
          const D = await qo(X);
          o({ type: 'setSave', save: D });
        } finally {
          o({ type: 'saving', saving: !1 });
        }
      },
      [s]
    ),
    h = T.useCallback(async () => {
      const { save: b } = s.current;
      if (b) {
        o({ type: 'saving', saving: !0 });
        try {
          const N = await qo(b);
          o({ type: 'setSave', save: N });
        } finally {
          o({ type: 'saving', saving: !1 });
        }
      }
    }, [s]),
    m = T.useCallback(() => {
      o({ type: 'clear' });
    }, []),
    E = T.useMemo(
      () => ({
        ...c,
        startNewGame: r,
        continueGame: d,
        applySave: p,
        applyAndPersist: g,
        persist: h,
        exitToTitle: m,
      }),
      [c, r, d, p, g, h, m]
    );
  return v.jsx(Yy.Provider, { value: E, children: a });
}
function _n() {
  const a = T.useContext(Yy);
  if (!a) throw new Error('useGameState は GameStateProvider の内側で使ってください');
  return a;
}
const Sb = () => {
    var U;
    const a = Sl(),
      { save: c, applyAndPersist: o } = _n(),
      s = T.useRef(null),
      [r, d] = T.useState(null),
      [p, g] = T.useState({}),
      [h, m] = T.useState(null),
      [E, b] = T.useState(!1),
      [N, X] = T.useState(null),
      [D, w] = T.useState(!1);
    T.useEffect(() => {
      if (r || !(c != null && c.diveState)) return;
      const R = c.diveState.depth,
        K = (c.masterSeed ^ (R * 2654435761) ^ (c.towerState.record.totalDives * 40503)) >>> 0;
      ((s.current = ha(K)), d(h_(c, X_(R, s.current))));
    }, [c, r]);
    const L = T.useMemo(() => (r == null ? void 0 : r.enemies.filter((R) => !R.isDown)) ?? [], [r]),
      k = T.useMemo(() => (r == null ? void 0 : r.allies.filter((R) => !R.isDown)) ?? [], [r]);
    (T.useEffect(() => {
      L.length > 0 && !L.some((R) => R.id === N) && X(L[0].id);
    }, [L, N]),
      T.useEffect(() => {
        if ((r == null ? void 0 : r.outcome) !== 'ongoing' || (h && k.some((K) => K.id === h)))
          return;
        const R = k.find((K) => !p[K.id]) ?? null;
        m(R ? R.id : null);
      }, [r, k, h, p]));
    const Q = k.length > 0 && k.every((R) => p[R.id] !== void 0),
      O = T.useCallback(
        (R, K) => {
          const ot = { ...p, [R]: K };
          (g(ot), b(!1));
          const _t = k.find((S) => S.id !== R && !ot[S.id]);
          m(_t ? _t.id : null);
        },
        [p, k]
      ),
      Y = T.useCallback(
        async (R) => {
          (w(!0),
            R.outcome === 'lose'
              ? (await o((K) => vu(Qh(K, R))), a('/town'))
              : (await o((K) => Qh(K, R)), a('/dungeon')));
        },
        [o, a]
      ),
      $ = T.useCallback(() => {
        var R;
        (g({}), b(!1), m(((R = k[0]) == null ? void 0 : R.id) ?? null));
      }, [k]),
      J = T.useCallback(() => {
        var _t;
        if (!r || !s.current || r.outcome !== 'ongoing') return;
        const R = N ?? ((_t = L[0]) == null ? void 0 : _t.id) ?? '',
          K = k.map((S) => {
            const q = p[S.id] ?? { kind: 'attack' };
            return q.kind === 'guard'
              ? { kind: 'guard', actorId: S.id }
              : q.kind === 'skill'
                ? { kind: 'skill', actorId: S.id, skillId: q.skillId, targetId: R }
                : { kind: 'attack', actorId: S.id, targetId: R };
          }),
          ot = Vh(r, K, s.current);
        (d(ot), g({}), b(!1), m(null));
      }, [r, p, N, k, L]),
      Z = T.useCallback(() => {
        if (!r || !s.current || r.outcome !== 'ongoing') return;
        const R = k[0];
        R && (d(Vh(r, [{ kind: 'flee', actorId: R.id }], s.current)), g({}), m(null));
      }, [r, k]);
    if (!c || !c.diveState) return v.jsx(_l, { to: '/town', replace: !0 });
    if (!r) return v.jsx('div', { className: ut.layout, children: '戦闘準備中...' });
    const V = (R) => {
        const K = c.guild.members.find((ot) => ot.id === R.id);
        return K
          ? Object.keys(K.learnedSkills).filter((ot) => ot in ia && R.tp >= ia[ot].tpCost(1))
          : [];
      },
      tt = (R) => {
        var ot;
        const K = p[R.id];
        return K
          ? K.kind === 'attack'
            ? '攻撃'
            : K.kind === 'guard'
              ? '防御'
              : (((ot = ia[K.skillId]) == null ? void 0 : ot.name) ?? 'スキル')
          : '';
      },
      at = h ? k.find((R) => R.id === h) : void 0,
      vt = ((U = r.enemies.find((R) => R.id === N)) == null ? void 0 : U.name) ?? '-',
      Et = Ry(r),
      Wt = (R) =>
        v.jsxs(
          'button',
          {
            type: 'button',
            className: [
              ut.card,
              R.isDown ? ut.down : '',
              h === R.id ? ut.cardActive : '',
              p[R.id] ? ut.cardDecided : '',
            ].join(' '),
            disabled: R.isDown || r.outcome !== 'ongoing',
            onClick: () => {
              (m(R.id), b(!1));
            },
            children: [
              v.jsxs('div', {
                className: ut.cardName,
                children: [
                  R.name,
                  R.unionGauge >= 100 ? v.jsx('span', { className: ut.uni, children: '★' }) : null,
                ],
              }),
              v.jsx(wo, { value: R.hp, max: R.maxHp, color: '#4caf50', showValue: !1 }),
              v.jsx(wo, { value: R.tp, max: R.maxTp, color: '#2196f3', showValue: !1 }),
              v.jsxs('div', {
                className: ut.cardNums,
                children: ['HP ', Math.max(0, R.hp), ' · TP ', R.tp],
              }),
              p[R.id] ? v.jsxs('div', { className: ut.cardCmd, children: ['▶ ', tt(R)] }) : null,
            ],
          },
          R.id
        ),
      se = r.allies.filter((R) => R.row === 'front'),
      Ut = r.allies.filter((R) => R.row === 'back');
    return v.jsxs('div', {
      className: ut.layout,
      children: [
        v.jsx('div', {
          className: ut.enemies,
          children: r.enemies.map((R) =>
            v.jsxs(
              'button',
              {
                type: 'button',
                className: `${ut.enemy} ${R.isDown ? ut.down : ''} ${N === R.id ? ut.targeted : ''}`,
                disabled: R.isDown,
                onClick: () => X(R.id),
                children: [
                  v.jsxs('span', {
                    className: ut.enemyName,
                    children: [R.name, R.ailments.length > 0 ? ' 🌀' : ''],
                  }),
                  v.jsx(wo, { value: R.hp, max: R.maxHp, color: '#e57373', showValue: !1 }),
                ],
              },
              R.id
            )
          ),
        }),
        v.jsxs('div', {
          className: ut.party,
          children: [
            v.jsx('div', { className: ut.rowTag, children: '前衛' }),
            v.jsx('div', { className: ut.cardRow, children: se.map(Wt) }),
            v.jsx('div', { className: ut.rowTag, children: '後衛（近接ダメージ -30%）' }),
            v.jsx('div', {
              className: ut.cardRow,
              children:
                Ut.length > 0
                  ? Ut.map(Wt)
                  : v.jsx('div', { className: ut.empty, children: '（なし）' }),
            }),
          ],
        }),
        r.outcome !== 'ongoing'
          ? v.jsxs('div', {
              className: ut.result,
              children: [
                v.jsx('div', {
                  className: ut.resultTitle,
                  children:
                    r.outcome === 'win' ? '勝利！' : r.outcome === 'fled' ? '逃走した' : '全滅...',
                }),
                r.outcome === 'win'
                  ? v.jsxs('div', {
                      className: ut.resultBody,
                      children: ['経験値 ', Et.exp, ' ／ ', Et.gold, ' G を獲得'],
                    })
                  : r.outcome === 'lose'
                    ? v.jsx('div', { className: ut.resultBody, children: '拠点へ帰還する' })
                    : null,
                v.jsx('button', {
                  type: 'button',
                  className: ut.primary,
                  disabled: D,
                  onClick: () => void Y(r),
                  children: 'つづける',
                }),
              ],
            })
          : v.jsxs('div', {
              className: ut.command,
              children: [
                v.jsxs('div', {
                  className: ut.target,
                  children: ['対象: ', vt, '（敵をタップで変更）'],
                }),
                at
                  ? v.jsxs(v.Fragment, {
                      children: [
                        v.jsxs('div', {
                          className: ut.cmdHead,
                          children: [at.name, ' のコマンド'],
                        }),
                        E
                          ? v.jsxs('div', {
                              className: ut.skillList,
                              children: [
                                V(at).map((R) => {
                                  var K;
                                  return v.jsxs(
                                    'button',
                                    {
                                      type: 'button',
                                      className: ut.skillBtn,
                                      onClick: () => O(at.id, { kind: 'skill', skillId: R }),
                                      children: [
                                        v.jsxs('span', {
                                          className: ut.skillTop,
                                          children: [
                                            v.jsx('span', {
                                              className: ut.skillName,
                                              children: ia[R].name,
                                            }),
                                            v.jsxs('span', {
                                              className: ut.tp,
                                              children: ['TP ', ia[R].tpCost(1)],
                                            }),
                                          ],
                                        }),
                                        v.jsx('span', {
                                          className: ut.skillDesc,
                                          children:
                                            ((K = or[R]) == null ? void 0 : K.description) ?? '',
                                        }),
                                      ],
                                    },
                                    R
                                  );
                                }),
                                V(at).length === 0
                                  ? v.jsx('div', {
                                      className: ut.empty,
                                      children: '使えるスキルがない',
                                    })
                                  : null,
                                v.jsx('button', {
                                  type: 'button',
                                  className: ut.menuBack,
                                  onClick: () => b(!1),
                                  children: 'もどる',
                                }),
                              ],
                            })
                          : v.jsxs('div', {
                              className: ut.menu,
                              children: [
                                v.jsx('button', {
                                  type: 'button',
                                  className: ut.menuBtn,
                                  onClick: () => O(at.id, { kind: 'attack' }),
                                  children: '攻撃',
                                }),
                                v.jsx('button', {
                                  type: 'button',
                                  className: ut.menuBtn,
                                  onClick: () => O(at.id, { kind: 'guard' }),
                                  children: '防御',
                                }),
                                v.jsx('button', {
                                  type: 'button',
                                  className: ut.menuBtn,
                                  disabled: V(at).length === 0,
                                  onClick: () => b(!0),
                                  children: 'スキル',
                                }),
                                v.jsx('button', {
                                  type: 'button',
                                  className: ut.menuBtn,
                                  onClick: Z,
                                  children: '逃走',
                                }),
                              ],
                            }),
                      ],
                    })
                  : v.jsxs('div', {
                      className: ut.execRow,
                      children: [
                        v.jsx('button', {
                          type: 'button',
                          className: ut.redo,
                          onClick: $,
                          children: 'やり直す',
                        }),
                        v.jsx('button', {
                          type: 'button',
                          className: ut.primary,
                          disabled: !Q,
                          onClick: J,
                          children: '実行',
                        }),
                      ],
                    }),
              ],
            }),
        v.jsx('div', {
          className: ut.log,
          children:
            r.log.length === 0
              ? v.jsxs('div', {
                  className: ut.logLine,
                  children: ['てきが あらわれた！（', r.turn, ' ターン目）'],
                })
              : r.log.map((R, K) => v.jsx('div', { className: ut.logLine, children: R.text }, K)),
        }),
      ],
    });
  },
  xb = '_layout_1b11o_1',
  Eb = '_head_1b11o_13',
  Tb = '_depth_1b11o_22',
  Nb = '_fpvWrap_1b11o_39',
  Ab = '_mapWrap_1b11o_45',
  Cb = '_palette_1b11o_52',
  Mb = '_tool_1b11o_62',
  Rb = '_toolActive_1b11o_73',
  zb = '_paletteHint_1b11o_79',
  jb = '_stairs_1b11o_88',
  Ob = '_controls_1b11o_102',
  Db = '_row_1b11o_112',
  kb = '_forward_1b11o_118',
  wb = '_turn_1b11o_133',
  Bb = '_back_1b11o_147',
  Ub = '_itemOverlay_1b11o_158',
  Lb = '_itemPanel_1b11o_168',
  Hb = '_itemTitle_1b11o_181',
  qb = '_itemEmpty_1b11o_186',
  Gb = '_itemRow_1b11o_192',
  Yb = '_itemName_1b11o_200',
  Xb = '_itemDesc_1b11o_208',
  Vb = '_itemTargets_1b11o_214',
  Qb = '_itemTarget_1b11o_214',
  Zb = '_itemHp_1b11o_234',
  Kb = '_itemUse_1b11o_240',
  $b = '_itemClose_1b11o_253',
  gt = {
    layout: xb,
    head: Eb,
    depth: Tb,
    return: '_return_1b11o_28',
    fpvWrap: Nb,
    mapWrap: Ab,
    palette: Cb,
    tool: Mb,
    toolActive: Rb,
    paletteHint: zb,
    stairs: jb,
    controls: Ob,
    row: Db,
    forward: kb,
    turn: wb,
    back: Bb,
    itemOverlay: Ub,
    itemPanel: Lb,
    itemTitle: Hb,
    itemEmpty: qb,
    itemRow: Gb,
    itemName: Yb,
    itemDesc: Xb,
    itemTargets: Vb,
    itemTarget: Qb,
    itemHp: Zb,
    itemUse: Kb,
    itemClose: $b,
  },
  Jb = '_canvas_1keax_1',
  Wb = { canvas: Jb },
  Xy = [
    { id: 'icon_chest', symbol: '📦', label: '宝箱' },
    { id: 'icon_foe', symbol: '👹', label: '強敵(FOE)' },
    { id: 'icon_warning', symbol: '⚠️', label: '注意' },
    { id: 'icon_door', symbol: '🚪', label: '扉/近道' },
    { id: 'icon_gather', symbol: '⛏️', label: '採集' },
    { id: 'icon_event', symbol: '❗', label: 'イベント' },
    { id: 'icon_note', symbol: '📝', label: 'メモ' },
    { id: 'icon_star', symbol: '⭐', label: '任意' },
  ],
  Ib = new Map(Xy.map((a) => [a.id, a]));
function Fb(a) {
  var c;
  return ((c = Ib.get(a)) == null ? void 0 : c.symbol) ?? '•';
}
const pn = {
    fog: '#cdd9b8',
    floor: '#fbfdf7',
    wall: '#4a5a3a',
    grid: '#e3ebd6',
    player: '#2196f3',
    stairsUp: '#e8923a',
    stairsDown: '#7aa2d6',
  },
  Pb = ({
    floor: a,
    explored: c,
    pos: o,
    dir: s,
    icons: r = [],
    maxCell: d = 26,
    onCellClick: p,
  }) => {
    const g = T.useRef(null),
      h = Math.max(10, Math.min(d, Math.floor(360 / a.width))),
      m = a.width * h,
      E = a.height * h;
    T.useEffect(() => {
      const N = g.current;
      if (!N) return;
      const X = new Set(c),
        D = window.devicePixelRatio || 1;
      ((N.width = m * D), (N.height = E * D));
      const w = N.getContext('2d');
      if (!w) return;
      (w.scale(D, D), w.clearRect(0, 0, m, E));
      for (let J = 0; J < a.height; J++)
        for (let Z = 0; Z < a.width; Z++) {
          const V = X.has(`${Z},${J}`);
          ((w.fillStyle = V ? pn.floor : pn.fog),
            w.fillRect(Z * h, J * h, h, h),
            V &&
              ((w.strokeStyle = pn.grid),
              (w.lineWidth = 1),
              w.strokeRect(Z * h + 0.5, J * h + 0.5, h - 1, h - 1)));
        }
      ((w.strokeStyle = pn.wall), (w.lineWidth = 2), (w.lineCap = 'round'));
      const L = (J, Z, V, tt) => {
        (w.beginPath(), w.moveTo(J, Z), w.lineTo(V, tt), w.stroke());
      };
      for (let J = 0; J < a.height; J++)
        for (let Z = 0; Z < a.width; Z++) {
          if (!X.has(`${Z},${J}`)) continue;
          const V = a.cells[J][Z],
            tt = Z * h,
            at = J * h;
          (V.walls.N && L(tt, at, tt + h, at),
            V.walls.S && L(tt, at + h, tt + h, at + h),
            V.walls.W && L(tt, at, tt, at + h),
            V.walls.E && L(tt + h, at, tt + h, at + h));
          const vt = V.event;
          ((vt == null ? void 0 : vt.kind) === 'stairsUp' ||
            (vt == null ? void 0 : vt.kind) === 'stairsDown') &&
            ((w.fillStyle = vt.kind === 'stairsUp' ? pn.stairsUp : pn.stairsDown),
            w.beginPath(),
            w.arc(tt + h / 2, at + h / 2, h * 0.28, 0, Math.PI * 2),
            w.fill(),
            (w.fillStyle = '#ffffff'),
            (w.font = `bold ${Math.floor(h * 0.5)}px sans-serif`),
            (w.textAlign = 'center'),
            (w.textBaseline = 'middle'),
            w.fillText(vt.kind === 'stairsUp' ? '▲' : '▼', tt + h / 2, at + h / 2 + 1));
        }
      ((w.font = `${Math.floor(h * 0.66)}px sans-serif`),
        (w.textAlign = 'center'),
        (w.textBaseline = 'middle'));
      for (const J of r)
        X.has(`${J.x},${J.y}`) && w.fillText(Fb(J.iconId), J.x * h + h / 2, J.y * h + h / 2 + 1);
      const k = o.x * h + h / 2,
        Q = o.y * h + h / 2,
        O = h * 0.34,
        $ = { N: -Math.PI / 2, E: 0, S: Math.PI / 2, W: Math.PI }[s];
      ((w.fillStyle = pn.player),
        w.beginPath(),
        w.moveTo(k + Math.cos($) * O, Q + Math.sin($) * O),
        w.lineTo(k + Math.cos($ + 2.5) * O, Q + Math.sin($ + 2.5) * O),
        w.lineTo(k + Math.cos($ - 2.5) * O, Q + Math.sin($ - 2.5) * O),
        w.closePath(),
        w.fill());
    }, [a, c, o, s, r, h, m, E]);
    const b = (N) => {
      if (!p) return;
      const X = N.currentTarget.getBoundingClientRect(),
        D = Math.floor(((N.clientX - X.left) / X.width) * a.width),
        w = Math.floor(((N.clientY - X.top) / X.height) * a.height);
      D >= 0 && w >= 0 && D < a.width && w < a.height && p(D, w);
    };
    return v.jsx('canvas', {
      ref: g,
      className: Wb.canvas,
      style: { width: m, height: E },
      onClick: b,
    });
  },
  tS = '_gauge_1o2hx_1',
  eS = '_icon_1o2hx_11',
  lS = '_segments_1o2hx_16',
  nS = '_seg_1o2hx_16',
  aS = '_filled_1o2hx_28',
  uS = '_danger_1o2hx_32',
  ua = { gauge: tS, icon: eS, segments: lS, seg: nS, filled: aS, danger: uS },
  iS = ({ level: a }) => {
    const c = a >= pu;
    return v.jsxs('div', {
      className: ua.gauge,
      role: 'img',
      'aria-label': `エンカウントゲージ ${a}/${pu}`,
      children: [
        v.jsx('span', { className: ua.icon, children: c ? '⚠' : '👣' }),
        v.jsx('div', {
          className: ua.segments,
          children: Array.from({ length: pu }, (o, s) =>
            v.jsx(
              'span',
              { className: [ua.seg, s < a ? ua.filled : '', c ? ua.danger : ''].join(' ') },
              s
            )
          ),
        }),
      ],
    });
  },
  cS = '_view_tw2v9_1',
  sS = { view: cS },
  ly = { N: { dx: 0, dy: -1 }, E: { dx: 1, dy: 0 }, S: { dx: 0, dy: 1 }, W: { dx: -1, dy: 0 } };
function oS(a, c, o, s = 4) {
  const r = Oy(o),
    d = jy(o),
    p = [];
  let { x: g, y: h } = c;
  for (let m = 0; m < s; m++) {
    const E = Dy(a, g, h, o);
    if (
      (p.push({
        x: g,
        y: h,
        leftOpen: !a.cells[h][g].walls[r],
        rightOpen: !a.cells[h][g].walls[d],
        frontOpen: E,
        event: a.cells[h][g].event,
      }),
      !E)
    )
      break;
    ((g += ly[o].dx), (h += ly[o].dy));
  }
  return p;
}
const pl = {
    sky: '#26301c',
    ceiling: '#3a4a2c',
    floor: '#5d6b46',
    wall: '#8b9a6b',
    frontWall: '#7a8a5c',
    outline: '#2c3720',
  },
  rS = 0.56,
  fS = ({ floor: a, pos: c, dir: o, maxDepth: s = 4, width: r = 358, height: d = 200 }) => {
    const p = T.useRef(null);
    return (
      T.useEffect(() => {
        const g = p.current;
        if (!g) return;
        const h = window.devicePixelRatio || 1;
        ((g.width = r * h), (g.height = d * h));
        const m = g.getContext('2d');
        if (!m) return;
        m.scale(h, h);
        const E = r,
          b = d,
          N = E / 2,
          X = b / 2,
          D = oS(a, c, o, s),
          w = (Q) => {
            const O = Math.pow(rS, Q);
            return {
              l: N - (E / 2) * O,
              r: N + (E / 2) * O,
              t: X - (b / 2) * O,
              b: X + (b / 2) * O,
            };
          },
          L = (Q, O, Y = !1) => {
            (m.beginPath(), m.moveTo(Q[0][0], Q[0][1]));
            for (let $ = 1; $ < Q.length; $++) m.lineTo(Q[$][0], Q[$][1]);
            (m.closePath(),
              (m.fillStyle = O),
              m.fill(),
              Y && ((m.strokeStyle = pl.outline), (m.lineWidth = 1), m.stroke()));
          },
          k = (Q) => `rgba(0,0,0,${Math.min(0.5, Q * 0.13)})`;
        ((m.fillStyle = pl.sky), m.fillRect(0, 0, E, b));
        for (let Q = D.length - 1; Q >= 0; Q--) {
          const O = w(Q),
            Y = w(Q + 1),
            $ = D[Q];
          (L(
            [
              [O.l, O.t],
              [O.r, O.t],
              [Y.r, Y.t],
              [Y.l, Y.t],
            ],
            pl.ceiling
          ),
            L(
              [
                [O.l, O.b],
                [O.r, O.b],
                [Y.r, Y.b],
                [Y.l, Y.b],
              ],
              pl.floor
            ),
            L(
              [
                [O.l, O.t],
                [Y.l, Y.t],
                [Y.l, Y.b],
                [O.l, O.b],
              ],
              $.leftOpen ? pl.sky : pl.wall,
              !0
            ),
            L(
              [
                [O.r, O.t],
                [Y.r, Y.t],
                [Y.r, Y.b],
                [O.r, O.b],
              ],
              $.rightOpen ? pl.sky : pl.wall,
              !0
            ),
            $.frontOpen ||
              L(
                [
                  [Y.l, Y.t],
                  [Y.r, Y.t],
                  [Y.r, Y.b],
                  [Y.l, Y.b],
                ],
                pl.frontWall,
                !0
              ),
            (m.fillStyle = k(Q)),
            m.fillRect(Y.l, Y.t, Y.r - Y.l, Y.b - Y.t));
          const J = $.event;
          if (
            (J == null ? void 0 : J.kind) === 'stairsUp' ||
            (J == null ? void 0 : J.kind) === 'stairsDown'
          ) {
            const Z = N,
              V = (O.b + Y.b) / 2 - (O.b - Y.b) * 0.15,
              tt = Math.max(12, (O.b - O.t) * 0.18);
            ((m.fillStyle = J.kind === 'stairsUp' ? '#e8923a' : '#7aa2d6'),
              m.beginPath(),
              m.arc(Z, V, tt, 0, Math.PI * 2),
              m.fill(),
              (m.fillStyle = '#fff'),
              (m.font = `bold ${Math.floor(tt * 1.2)}px sans-serif`),
              (m.textAlign = 'center'),
              (m.textBaseline = 'middle'),
              m.fillText(J.kind === 'stairsUp' ? '▲' : '▼', Z, V + 1));
          }
        }
      }, [a, c, o, s, r, d]),
      v.jsx('canvas', { ref: p, className: sS.view, style: { width: r, height: d } })
    );
  },
  bl = {
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
function dS(a) {
  return a.category === 'material' ? 8 : Math.floor(a.buyPrice / 2);
}
function mS(a, c) {
  var o;
  return ((o = a.guild.storage.find((s) => s.itemId === c)) == null ? void 0 : o.qty) ?? 0;
}
function vr(a, c, o = 1) {
  if (o <= 0) return a;
  const s = [...a.guild.storage],
    r = s.findIndex((d) => d.itemId === c);
  return (
    r >= 0 ? (s[r] = { ...s[r], qty: s[r].qty + o }) : s.push({ itemId: c, qty: o }),
    { ...a, guild: { ...a.guild, storage: s } }
  );
}
function Fi(a, c, o = 1) {
  if (o <= 0) return a;
  const s = a.guild.storage.findIndex((p) => p.itemId === c);
  if (s < 0 || a.guild.storage[s].qty < o) return a;
  const r = [...a.guild.storage],
    d = r[s].qty - o;
  return (
    d <= 0 ? r.splice(s, 1) : (r[s] = { ...r[s], qty: d }),
    { ...a, guild: { ...a.guild, storage: r } }
  );
}
function Vy(a, c, o) {
  return {
    ...a,
    guild: { ...a.guild, members: a.guild.members.map((s) => (s.id === c ? o(s) : s)) },
  };
}
function _r(a, c) {
  const o = Ae[c];
  if (!o) return !1;
  const s = ue[a.classId];
  return s
    ? o.slot === 'weapon'
      ? !!o.weaponType && s.equipableWeaponTypes.includes(o.weaponType)
      : o.slot === 'armor'
        ? !!o.armorType && s.equipableArmorTypes.includes(o.armorType)
        : !0
    : !1;
}
function hS(a, c, o) {
  const s = Ae[o],
    r = a.guild.members.find((g) => g.id === c);
  if (!s || !r || !_r(r, o) || mS(a, o) <= 0) return a;
  let d = Fi(a, o, 1);
  const p = r.equipment[s.slot];
  return (
    p && (d = vr(d, p, 1)),
    Vy(d, c, (g) => ({ ...g, equipment: { ...g.equipment, [s.slot]: o } }))
  );
}
function br(a, c, o) {
  const s = a.guild.members.find((p) => p.id === c);
  if (!s) return a;
  const r = s.equipment[o];
  if (!r) return a;
  const d = vr(a, r, 1);
  return Vy(d, c, (p) => ({ ...p, equipment: { ...p.equipment, [o]: null } }));
}
function yS(a, c, o) {
  var N, X;
  const s = bl[c];
  if (!s) return { save: a, ok: !1, message: 'そのアイテムは無い' };
  if (!((N = s.useContext) != null && N.includes('field')))
    return { save: a, ok: !1, message: 'ここでは使えない' };
  if ((((X = a.guild.storage.find((D) => D.itemId === c)) == null ? void 0 : X.qty) ?? 0) <= 0)
    return { save: a, ok: !1, message: '所持していない' };
  if (c === 'item_return_thread')
    return a.diveState
      ? { save: vu(Fi(a, c, 1)), ok: !0, message: '拠点へ帰還した' }
      : { save: a, ok: !1, message: '探索中のみ使える' };
  if (!a.diveState) return { save: a, ok: !1, message: '探索中のみ使える' };
  const r = a.diveState.party.find((D) => D.charId === o),
    d = a.guild.members.find((D) => D.id === o);
  if (!r || !d) return { save: a, ok: !1, message: '対象がいない' };
  const p = Eu(d);
  let g = r.hp,
    h = r.tp,
    m = !1;
  for (const D of s.effects ?? [])
    D.kind === 'heal'
      ? ((g = Math.min(p.hp, g + D.amount(1))), (m = !0))
      : D.kind === 'restoreTp' && ((h = Math.min(p.tp, h + D.amount(1))), (m = !0));
  if (!m) return { save: a, ok: !1, message: 'いま使う効果がない' };
  const E = a.diveState.party.map((D) => (D.charId === o ? { ...D, hp: g, tp: h } : D));
  return {
    save: Fi({ ...a, diveState: { ...a.diveState, party: E } }, c, 1),
    ok: !0,
    message: `${d.name} に ${s.name} を使った`,
  };
}
function pS(a) {
  return { depth: a, floorPaint: [], wallDraw: [], icons: [], notes: [], autopilotRoutes: [] };
}
function gS(a, c) {
  return a.playerMaps[c] ?? pS(c);
}
function Qy(a, c, o) {
  return { ...a, playerMaps: { ...a.playerMaps, [c]: o } };
}
function vS(a, c, o, s, r) {
  const d = gS(a, c),
    p = d.icons.find((m) => m.x === o && m.y === s),
    g = d.icons.filter((m) => !(m.x === o && m.y === s)),
    h = (p == null ? void 0 : p.iconId) === r ? g : [...g, { x: o, y: s, iconId: r }];
  return Qy(a, c, { ...d, icons: h });
}
function _S(a, c, o, s) {
  const r = a.playerMaps[c];
  return r ? Qy(a, c, { ...r, icons: r.icons.filter((d) => !(d.x === o && d.y === s)) }) : a;
}
const bS = () => {
    var Q;
    const a = Sl(),
      { save: c, applySave: o, applyAndPersist: s } = _n(),
      r = T.useRef(null),
      [d, p] = T.useState(null),
      [g, h] = T.useState(!1),
      m = (c == null ? void 0 : c.diveState) ?? null,
      E = T.useMemo(() => {
        var O;
        return c && m ? ((O = c.towerState.floors[m.depth]) == null ? void 0 : O.generated) : null;
      }, [c, m]),
      b = T.useCallback(
        (O) => {
          if (!c) return;
          r.current || (r.current = ha((c.masterSeed ^ 2654435769) >>> 0));
          const Y = L_(c, O, r.current);
          (s(() => Y.save), Y.triggered && a('/battle'));
        },
        [c, s, a]
      ),
      N = T.useCallback(
        (O) => {
          o((Y) => By(Y, O));
        },
        [o]
      ),
      X = T.useCallback(async () => {
        if (!c) return;
        const O = $h(c);
        O === 'stairsUp'
          ? await s((Y) => H_(Y))
          : O === 'stairsDown' &&
            (c.diveState.depth <= 1 ? (await s((Y) => vu(Y)), a('/town')) : await s((Y) => q_(Y)));
      }, [c, s, a]),
      D = T.useCallback(async () => {
        (await s((O) => vu(O)), a('/town'));
      }, [s, a]),
      w = T.useCallback(
        (O, Y) => {
          if (!c) return;
          const $ = yS(c, O, Y);
          $.ok && (s(() => $.save), $.save.diveState || (h(!1), a('/town')));
        },
        [c, s, a]
      ),
      L = T.useCallback(
        (O, Y) => {
          if (!m) return;
          const $ = m.depth;
          if (d !== null) {
            if (!((c == null ? void 0 : c.exploredCells[$]) ?? []).includes(`${O},${Y}`)) return;
            s(d === 'erase' ? (at) => _S(at, $, O, Y) : (at) => vS(at, $, O, Y, d));
            return;
          }
          const J = O - m.pos.x,
            Z = Y - m.pos.y,
            V = ['N', 'E', 'S', 'W'].find((tt) => sa[tt].dx === J && sa[tt].dy === Z);
          V && b(V);
        },
        [m, b, d, c, s]
      );
    if (!c) return v.jsx(_l, { to: '/title', replace: !0 });
    if (!m || !E) return v.jsx(_l, { to: '/town', replace: !0 });
    const k = $h(c);
    return v.jsxs('div', {
      className: gt.layout,
      children: [
        v.jsxs('header', {
          className: gt.head,
          children: [
            v.jsxs('div', { className: gt.depth, children: [m.depth, 'F'] }),
            v.jsx(iS, { level: E_(m.encounter.stepsUntilEncounter) }),
            v.jsx('button', {
              type: 'button',
              className: gt.return,
              onClick: () => h(!0),
              children: '道具',
            }),
            v.jsx('button', {
              type: 'button',
              className: gt.return,
              onClick: () => void D(),
              children: '帰還',
            }),
          ],
        }),
        v.jsx('div', {
          className: gt.fpvWrap,
          children: v.jsx(fS, { floor: E, pos: m.pos, dir: m.dir }),
        }),
        v.jsx('div', {
          className: gt.mapWrap,
          children: v.jsx(Pb, {
            floor: E,
            explored: c.exploredCells[m.depth] ?? [],
            pos: m.pos,
            dir: m.dir,
            icons: ((Q = c.playerMaps[m.depth]) == null ? void 0 : Q.icons) ?? [],
            onCellClick: L,
          }),
        }),
        v.jsxs('div', {
          className: gt.palette,
          children: [
            v.jsx('button', {
              type: 'button',
              className: `${gt.tool} ${d === null ? gt.toolActive : ''}`,
              onClick: () => p(null),
              'aria-label': '移動モード',
              children: '🚶',
            }),
            Xy.map((O) =>
              v.jsx(
                'button',
                {
                  type: 'button',
                  className: `${gt.tool} ${d === O.id ? gt.toolActive : ''}`,
                  onClick: () => p(O.id),
                  'aria-label': O.label,
                  children: O.symbol,
                },
                O.id
              )
            ),
            v.jsx('button', {
              type: 'button',
              className: `${gt.tool} ${d === 'erase' ? gt.toolActive : ''}`,
              onClick: () => p('erase'),
              'aria-label': '消しゴム',
              children: '🧽',
            }),
          ],
        }),
        v.jsx('p', {
          className: gt.paletteHint,
          children:
            d === null
              ? '隣接マスをタップで移動。アイコンを選ぶとマップに書き込めます。'
              : d === 'erase'
                ? 'マップ上のマスをタップでアイコンを消去。'
                : 'マップ上の探索済みマスをタップでアイコンを配置（再タップで消去）。',
        }),
        k &&
          v.jsx('button', {
            type: 'button',
            className: gt.stairs,
            onClick: () => void X(),
            children:
              k === 'stairsUp'
                ? '▲ 次の階へ進む'
                : m.depth <= 1
                  ? '▼ 拠点へ戻る'
                  : '▼ 前の階へ戻る',
          }),
        v.jsxs('div', {
          className: gt.controls,
          children: [
            v.jsxs('div', {
              className: gt.row,
              children: [
                v.jsx('button', {
                  type: 'button',
                  className: gt.turn,
                  onClick: () => N(Oy(m.dir)),
                  'aria-label': '左を向く',
                  children: '↰',
                }),
                v.jsx('button', {
                  type: 'button',
                  className: gt.forward,
                  onClick: () => b(m.dir),
                  children: '前進',
                }),
                v.jsx('button', {
                  type: 'button',
                  className: gt.turn,
                  onClick: () => N(jy(m.dir)),
                  'aria-label': '右を向く',
                  children: '↱',
                }),
              ],
            }),
            v.jsx('button', {
              type: 'button',
              className: gt.back,
              onClick: () => N(R_(m.dir)),
              'aria-label': '振り向く',
              children: '↻ 振り向く',
            }),
          ],
        }),
        g
          ? v.jsx('div', {
              className: gt.itemOverlay,
              onClick: () => h(!1),
              children: v.jsxs('div', {
                className: gt.itemPanel,
                onClick: (O) => O.stopPropagation(),
                children: [
                  v.jsx('div', { className: gt.itemTitle, children: 'どうぐ' }),
                  (() => {
                    const O = c.guild.storage.filter((Y) => {
                      var $, J;
                      return (
                        ((J = ($ = bl[Y.itemId]) == null ? void 0 : $.useContext) == null
                          ? void 0
                          : J.includes('field')) && Y.qty > 0
                      );
                    });
                    return O.length === 0
                      ? v.jsx('p', {
                          className: gt.itemEmpty,
                          children: '使える道具がありません。',
                        })
                      : O.map((Y) => {
                          const $ = bl[Y.itemId],
                            J = Y.itemId === 'item_return_thread';
                          return v.jsxs(
                            'div',
                            {
                              className: gt.itemRow,
                              children: [
                                v.jsxs('div', {
                                  className: gt.itemName,
                                  children: [
                                    $.name,
                                    ' ×',
                                    Y.qty,
                                    v.jsx('span', {
                                      className: gt.itemDesc,
                                      children: $.description,
                                    }),
                                  ],
                                }),
                                J
                                  ? v.jsx('button', {
                                      type: 'button',
                                      className: gt.itemUse,
                                      onClick: () => w(Y.itemId),
                                      children: '使う',
                                    })
                                  : v.jsx('div', {
                                      className: gt.itemTargets,
                                      children: m.party.map((Z) => {
                                        const V = c.guild.members.find((at) => at.id === Z.charId);
                                        if (!V) return null;
                                        const tt = Eu(V);
                                        return v.jsxs(
                                          'button',
                                          {
                                            type: 'button',
                                            className: gt.itemTarget,
                                            onClick: () => w(Y.itemId, Z.charId),
                                            children: [
                                              V.name,
                                              v.jsxs('span', {
                                                className: gt.itemHp,
                                                children: [
                                                  'HP ',
                                                  Z.hp,
                                                  '/',
                                                  tt.hp,
                                                  '・TP ',
                                                  Z.tp,
                                                  '/',
                                                  tt.tp,
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
                            Y.itemId
                          );
                        });
                  })(),
                  v.jsx('button', {
                    type: 'button',
                    className: gt.itemClose,
                    onClick: () => h(!1),
                    children: 'とじる',
                  }),
                ],
              }),
            })
          : null,
      ],
    });
  },
  SS = '_layout_16au8_2',
  xS = '_head_16au8_13',
  ES = '_title_16au8_20',
  TS = '_count_16au8_26',
  NS = '_create_16au8_31',
  AS = '_sectionTitle_16au8_42',
  CS = '_field_16au8_48',
  MS = '_primary_16au8_64',
  RS = '_list_16au8_79',
  zS = '_empty_16au8_83',
  jS = '_members_16au8_88',
  OS = '_member_16au8_88',
  DS = '_memberMain_16au8_107',
  kS = '_memberName_16au8_119',
  wS = '_pos_16au8_127',
  BS = '_memberSub_16au8_144',
  US = '_posBtns_16au8_149',
  LS = '_posBtn_16au8_149',
  HS = '_posBtnActive_16au8_164',
  qS = '_foot_16au8_170',
  GS = '_sub_16au8_174',
  Nt = {
    layout: SS,
    head: xS,
    title: ES,
    count: TS,
    create: NS,
    sectionTitle: AS,
    field: CS,
    primary: MS,
    list: RS,
    empty: zS,
    members: jS,
    member: OS,
    memberMain: DS,
    memberName: kS,
    pos: wS,
    pos_前衛: '_pos_前衛_16au8_136',
    pos_後衛: '_pos_後衛_16au8_140',
    memberSub: BS,
    posBtns: US,
    posBtn: LS,
    posBtnActive: HS,
    foot: qS,
    sub: GS,
  };
function YS(a) {
  return [...a.guild.party.front, ...a.guild.party.back].filter((c) => c !== null).length;
}
const Zy = (a) => (a === 'front' ? lc : nc);
function XS(a, c, o, s) {
  if (o < 0 || o >= Zy(c) || (s !== null && !a.guild.members.some((p) => p.id === s))) return a;
  const r = a.guild.party.front.map((p) => (p === s ? null : p)),
    d = a.guild.party.back.map((p) => (p === s ? null : p));
  for (; r.length < lc; ) r.push(null);
  for (; d.length < nc; ) d.push(null);
  return (
    c === 'front' ? (r[o] = s) : (d[o] = s),
    { ...a, guild: { ...a.guild, party: { front: r, back: d } } }
  );
}
function Ky(a, c) {
  const o = a.guild.party.front.map((r) => (r === c ? null : r)),
    s = a.guild.party.back.map((r) => (r === c ? null : r));
  return { ...a, guild: { ...a.guild, party: { front: o, back: s } } };
}
function ny(a, c, o) {
  if (
    !a.guild.members.some((g) => g.id === c) ||
    (o === 'front' ? a.guild.party.front : a.guild.party.back).includes(c)
  )
    return a;
  const r = Ky(a, c),
    d = o === 'front' ? r.guild.party.front : r.guild.party.back;
  let p = d.indexOf(null);
  if (p < 0)
    if (d.length < Zy(o)) p = d.length;
    else return a;
  return XS(r, o, p, c);
}
function VS(a, c) {
  return a.guild.party.front.includes(c)
    ? '前衛'
    : a.guild.party.back.includes(c)
      ? '後衛'
      : '控え';
}
const QS = () => {
    const a = Sl(),
      { save: c, applyAndPersist: o } = _n(),
      s = Object.keys(Xe),
      r = Object.keys(ue),
      [d, p] = T.useState(''),
      [g, h] = T.useState(s[0]),
      [m, E] = T.useState(r[0]),
      [b, N] = T.useState(!1),
      X = T.useCallback(async () => {
        const L = d.trim() || '名もなき冒険者',
          k = Uy({ raceId: g, classId: m, name: L });
        (N(!0), await o((Q) => W_(Q, k)), p(''), N(!1));
      }, [d, g, m, o]);
    if (!c) return v.jsx(_l, { to: '/title', replace: !0 });
    const { members: D } = c.guild,
      w = D.length >= Vo;
    return v.jsxs('div', {
      className: Nt.layout,
      children: [
        v.jsxs('header', {
          className: Nt.head,
          children: [
            v.jsx('h1', { className: Nt.title, children: 'ギルド管理' }),
            v.jsxs('span', { className: Nt.count, children: ['団員 ', D.length, ' / ', Vo] }),
          ],
        }),
        v.jsxs('section', {
          className: Nt.create,
          children: [
            v.jsx('h2', { className: Nt.sectionTitle, children: '冒険者を作成' }),
            v.jsxs('label', {
              className: Nt.field,
              children: [
                v.jsx('span', { children: '名前' }),
                v.jsx('input', {
                  type: 'text',
                  value: d,
                  maxLength: 16,
                  placeholder: '名もなき冒険者',
                  onChange: (L) => p(L.target.value),
                }),
              ],
            }),
            v.jsxs('label', {
              className: Nt.field,
              children: [
                v.jsx('span', { children: '種族' }),
                v.jsx('select', {
                  value: g,
                  onChange: (L) => h(L.target.value),
                  children: s.map((L) => v.jsx('option', { value: L, children: Xe[L].name }, L)),
                }),
              ],
            }),
            v.jsxs('label', {
              className: Nt.field,
              children: [
                v.jsx('span', { children: '職業' }),
                v.jsx('select', {
                  value: m,
                  onChange: (L) => E(L.target.value),
                  children: r.map((L) => v.jsx('option', { value: L, children: ue[L].name }, L)),
                }),
              ],
            }),
            v.jsx('button', {
              type: 'button',
              className: Nt.primary,
              disabled: b || w,
              onClick: () => void X(),
              children: w ? '団員が上限です' : '作成する',
            }),
          ],
        }),
        v.jsxs('section', {
          className: Nt.list,
          children: [
            v.jsxs('h2', {
              className: Nt.sectionTitle,
              children: [
                '団員一覧',
                ' ',
                v.jsxs('span', {
                  className: Nt.count,
                  children: ['（出撃 ', YS(c), ' / ', n_, '）'],
                }),
              ],
            }),
            D.length === 0
              ? v.jsx('p', { className: Nt.empty, children: 'まだ冒険者がいません。' })
              : v.jsx('ul', {
                  className: Nt.members,
                  children: D.map((L) => {
                    var Q, O;
                    const k = VS(c, L.id);
                    return v.jsxs(
                      'li',
                      {
                        className: Nt.member,
                        children: [
                          v.jsxs('button', {
                            type: 'button',
                            className: Nt.memberMain,
                            onClick: () => a(`/guild/char/${L.id}`),
                            children: [
                              v.jsxs('span', {
                                className: Nt.memberName,
                                children: [
                                  L.name,
                                  v.jsx('span', {
                                    className: `${Nt.pos} ${Nt[`pos_${k}`] ?? ''}`,
                                    children: k,
                                  }),
                                ],
                              }),
                              v.jsxs('span', {
                                className: Nt.memberSub,
                                children: [
                                  (Q = Xe[L.raceId]) == null ? void 0 : Q.name,
                                  ' / ',
                                  (O = ue[L.classId]) == null ? void 0 : O.name,
                                  ' / Lv',
                                  L.level,
                                  ' ›',
                                ],
                              }),
                            ],
                          }),
                          v.jsxs('div', {
                            className: Nt.posBtns,
                            children: [
                              v.jsx('button', {
                                type: 'button',
                                className: `${Nt.posBtn} ${k === '前衛' ? Nt.posBtnActive : ''}`,
                                onClick: () => void o((Y) => ny(Y, L.id, 'front')),
                                children: '前',
                              }),
                              v.jsx('button', {
                                type: 'button',
                                className: `${Nt.posBtn} ${k === '後衛' ? Nt.posBtnActive : ''}`,
                                onClick: () => void o((Y) => ny(Y, L.id, 'back')),
                                children: '後',
                              }),
                              v.jsx('button', {
                                type: 'button',
                                className: `${Nt.posBtn} ${k === '控え' ? Nt.posBtnActive : ''}`,
                                onClick: () => void o((Y) => Ky(Y, L.id)),
                                children: '控',
                              }),
                            ],
                          }),
                        ],
                      },
                      L.id
                    );
                  }),
                }),
          ],
        }),
        v.jsx('footer', {
          className: Nt.foot,
          children: v.jsx('button', {
            type: 'button',
            className: Nt.sub,
            onClick: () => a('/town'),
            children: '拠点へ戻る',
          }),
        }),
      ],
    });
  },
  ZS = '_layout_tw23z_1',
  KS = '_head_tw23z_12',
  $S = '_title_tw23z_16',
  JS = '_sub_tw23z_22',
  WS = '_card_tw23z_27',
  IS = '_h2_tw23z_35',
  FS = '_sp_tw23z_44',
  PS = '_stats_tw23z_50',
  t2 = '_equipSlot_tw23z_74',
  e2 = '_equipHead_tw23z_82',
  l2 = '_slotLabel_tw23z_88',
  n2 = '_equipName_tw23z_95',
  a2 = '_smallBtn_tw23z_100',
  u2 = '_equipPick_tw23z_110',
  i2 = '_pickBtn_tw23z_118',
  c2 = '_skills_tw23z_128',
  s2 = '_skill_tw23z_128',
  o2 = '_skillInfo_tw23z_143',
  r2 = '_skillName_tw23z_150',
  f2 = '_skillLv_tw23z_158',
  d2 = '_skillDesc_tw23z_164',
  m2 = '_learnBtn_tw23z_169',
  h2 = '_jobRow_tw23z_185',
  y2 = '_select_tw23z_192',
  p2 = '_input_tw23z_193',
  g2 = '_actBtn_tw23z_203',
  v2 = '_warn_tw23z_220',
  _2 = '_titleHave_tw23z_227',
  b2 = '_titleOpts_tw23z_233',
  S2 = '_titleBtn_tw23z_240',
  x2 = '_rbForm_tw23z_252',
  E2 = '_danger_tw23z_258',
  T2 = '_foot_tw23z_270',
  N2 = '_back_tw23z_274',
  nt = {
    layout: ZS,
    head: KS,
    title: $S,
    sub: JS,
    card: WS,
    h2: IS,
    sp: FS,
    stats: PS,
    equipSlot: t2,
    equipHead: e2,
    slotLabel: l2,
    equipName: n2,
    smallBtn: a2,
    equipPick: u2,
    pickBtn: i2,
    skills: c2,
    skill: s2,
    skillInfo: o2,
    skillName: r2,
    skillLv: f2,
    skillDesc: d2,
    learnBtn: m2,
    jobRow: h2,
    select: y2,
    input: p2,
    actBtn: g2,
    warn: v2,
    titleHave: _2,
    titleOpts: b2,
    titleBtn: S2,
    rbForm: x2,
    danger: E2,
    foot: T2,
    back: N2,
  },
  $y = ['weapon', 'armor', 'accessory'];
function Jy(a, c, o) {
  return { ...a, guild: { ...a.guild, members: a.guild.members.map((s) => (s.id === c ? o : s)) } };
}
function A2(a) {
  var c, o;
  return (o = (c = ue[a]) == null ? void 0 : c.skillTree.skills[0]) == null ? void 0 : o.skillId;
}
function C2(a) {
  var c;
  return new Set(
    (((c = Xe[a]) == null ? void 0 : c.unionSkillTree.skills) ?? []).map((o) => o.skillId)
  );
}
const M2 = (a) => Object.values(a).reduce((c, o) => c + o, 0);
function R2(a, c) {
  if (!ue[c]) return a;
  const o = C2(a.raceId);
  let s = {};
  for (const [h, m] of Object.entries(a.learnedSkills)) o.has(h) && (s[h] = m);
  const r = A2(c);
  r && !s[r] && (s[r] = 1);
  const d = Math.max(1, a.level - Ny),
    p = Mt.SP_PER_LEVEL * Math.max(0, d - 1);
  let g = M2(s) - (r && s[r] ? 1 : 0);
  return (
    g > p && ((s = r ? { [r]: 1 } : {}), (g = 0)),
    {
      ...a,
      classId: c,
      titleId: null,
      level: d,
      exp: 0,
      learnedSkills: s,
      skillPoints: { total: p, spent: g },
    }
  );
}
function z2(a, c, o) {
  const s = a.guild.members.find((p) => p.id === c);
  if (!s) return a;
  let r = Jy(a, c, R2(s, o));
  const d = r.guild.members.find((p) => p.id === c);
  for (const p of $y) {
    const g = d.equipment[p];
    g && !_r(d, g) && (r = br(r, c, p));
  }
  return r;
}
const j2 = [
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
function O2(a) {
  const c = j2.find((o) => a >= o.min && a <= o.max);
  return c ? { allStats: c.allStats, bonusSp: c.bonusSp } : null;
}
function Wy(a) {
  return a.level >= hu.REBIRTH_MIN_LEVEL;
}
function D2(a, c) {
  const o = O2(a.level);
  if (!o) return a;
  const s = Math.min(30, Math.floor(a.level / 2)),
    r = Uy({ ...c, id: a.id }),
    d = Mt.SP_PER_LEVEL * Math.max(0, s - 1) + o.bonusSp;
  return {
    ...r,
    level: Math.max(1, s),
    exp: 0,
    rebirthBonus: o,
    skillPoints: { total: d, spent: r.skillPoints.spent },
  };
}
function k2(a, c, o) {
  const s = a.guild.members.find((p) => p.id === c);
  if (!s || !Wy(s)) return a;
  let r = a;
  for (const p of $y) s.equipment[p] && (r = br(r, c, p));
  const d = r.guild.members.find((p) => p.id === c);
  return Jy(r, c, D2(d, o));
}
function Iy(a, c, o) {
  var r;
  return o < hu.TITLE_DEPTH || a.titleId
    ? !1
    : (((r = ue[a.classId]) == null ? void 0 : r.titleOptions) ?? []).includes(c);
}
function w2(a, c, o) {
  return Iy(a, c, o)
    ? { ...a, titleId: c, skillPoints: { ...a.skillPoints, total: a.skillPoints.total + a_ } }
    : a;
}
function Fy(a) {
  var o, s;
  const c = [
    ...(((o = ue[a.classId]) == null ? void 0 : o.skillTree.skills) ?? []),
    ...(((s = Xe[a.raceId]) == null ? void 0 : s.unionSkillTree.skills) ?? []),
  ];
  return (a.titleId && ca[a.titleId] && c.push(...ca[a.titleId].skillTree.skills), c);
}
function uc(a, c) {
  return a.learnedSkills[c] ?? 0;
}
function Py(a) {
  return a.skillPoints.total - a.skillPoints.spent;
}
function B2(a, c) {
  return (c.requires ?? []).every((o) => uc(a, o.skillId) >= o.level);
}
function tp(a, c) {
  const o = Fy(a).find((s) => s.skillId === c);
  return !o || uc(a, c) >= o.maxLevel || Py(a) <= 0 ? !1 : B2(a, o);
}
function U2(a, c) {
  return tp(a, c)
    ? {
        ...a,
        learnedSkills: { ...a.learnedSkills, [c]: uc(a, c) + 1 },
        skillPoints: { ...a.skillPoints, spent: a.skillPoints.spent + 1 },
      }
    : a;
}
const ay = Object.keys(Xe),
  Xi = Object.keys(ue),
  L2 = ['weapon', 'armor', 'accessory'],
  H2 = { weapon: '武器', armor: '防具', accessory: '装飾' },
  q2 = [
    { key: 'hp', label: 'HP' },
    { key: 'tp', label: 'TP' },
    { key: 'str', label: 'STR' },
    { key: 'vit', label: 'VIT' },
    { key: 'agi', label: 'AGI' },
    { key: 'int', label: 'INT' },
    { key: 'mnd', label: 'MND' },
    { key: 'luc', label: 'LUC' },
  ],
  G2 = () => {
    var Y, $, J, Z;
    const a = Sl(),
      { id: c } = _v(),
      { save: o, applyAndPersist: s } = _n(),
      [r, d] = T.useState(Xi[0]),
      [p, g] = T.useState(''),
      [h, m] = T.useState(ay[0]),
      [E, b] = T.useState(Xi[0]),
      [N, X] = T.useState(!1);
    if (!o) return v.jsx(_l, { to: '/title', replace: !0 });
    const D = o.guild.members.find((V) => V.id === c);
    if (!D || !c) return v.jsx(_l, { to: '/guild', replace: !0 });
    const w = Eu(D),
      L = Py(D),
      k = o.towerState.record.deepestReached,
      Q = (V) =>
        s((tt) => ({
          ...tt,
          guild: { ...tt.guild, members: tt.guild.members.map((at) => (at.id === c ? V(at) : at)) },
        }));
    return v.jsxs('div', {
      className: nt.layout,
      children: [
        v.jsxs('header', {
          className: nt.head,
          children: [
            v.jsx('h1', { className: nt.title, children: D.name }),
            v.jsxs('span', {
              className: nt.sub,
              children: [
                (Y = Xe[D.raceId]) == null ? void 0 : Y.name,
                ' / ',
                ($ = ue[D.classId]) == null ? void 0 : $.name,
                ' / Lv',
                D.level,
              ],
            }),
          ],
        }),
        v.jsxs('section', {
          className: nt.card,
          children: [
            v.jsx('h2', { className: nt.h2, children: 'ステータス' }),
            v.jsx('dl', {
              className: nt.stats,
              children: q2.map((V) =>
                v.jsxs(
                  'div',
                  {
                    children: [
                      v.jsx('dt', { children: V.label }),
                      v.jsx('dd', { children: w[V.key] }),
                    ],
                  },
                  V.key
                )
              ),
            }),
          ],
        }),
        v.jsxs('section', {
          className: nt.card,
          children: [
            v.jsx('h2', { className: nt.h2, children: '装備' }),
            L2.map((V) => {
              const tt = D.equipment[V],
                at = tt ? Ae[tt] : null,
                vt = o.guild.storage.filter((Et) => {
                  var Wt;
                  return (
                    ((Wt = Ae[Et.itemId]) == null ? void 0 : Wt.slot) === V && _r(D, Et.itemId)
                  );
                });
              return v.jsxs(
                'div',
                {
                  className: nt.equipSlot,
                  children: [
                    v.jsxs('div', {
                      className: nt.equipHead,
                      children: [
                        v.jsx('span', { className: nt.slotLabel, children: H2[V] }),
                        v.jsx('span', {
                          className: nt.equipName,
                          children: at ? at.name : '（なし）',
                        }),
                        at
                          ? v.jsx('button', {
                              type: 'button',
                              className: nt.smallBtn,
                              onClick: () => void O(V),
                              children: '外す',
                            })
                          : null,
                      ],
                    }),
                    vt.length > 0
                      ? v.jsx('div', {
                          className: nt.equipPick,
                          children: vt.map((Et) =>
                            v.jsxs(
                              'button',
                              {
                                type: 'button',
                                className: nt.pickBtn,
                                onClick: () => void s((Wt) => hS(Wt, c, Et.itemId)),
                                children: [
                                  Ae[Et.itemId].name,
                                  ' 装備',
                                  Et.qty > 1 ? `(${Et.qty})` : '',
                                ],
                              },
                              Et.itemId
                            )
                          ),
                        })
                      : null,
                  ],
                },
                V
              );
            }),
          ],
        }),
        v.jsxs('section', {
          className: nt.card,
          children: [
            v.jsxs('h2', {
              className: nt.h2,
              children: ['スキル ', v.jsxs('span', { className: nt.sp, children: ['SP ', L] })],
            }),
            v.jsx('ul', {
              className: nt.skills,
              children: Fy(D).map((V) => {
                const tt = uc(D, V.skillId),
                  at = tp(D, V.skillId),
                  vt = or[V.skillId];
                return v.jsxs(
                  'li',
                  {
                    className: nt.skill,
                    children: [
                      v.jsxs('div', {
                        className: nt.skillInfo,
                        children: [
                          v.jsxs('span', {
                            className: nt.skillName,
                            children: [
                              (vt == null ? void 0 : vt.name) ?? V.skillId,
                              v.jsxs('span', {
                                className: nt.skillLv,
                                children: ['Lv ', tt, '/', V.maxLevel],
                              }),
                            ],
                          }),
                          v.jsx('span', {
                            className: nt.skillDesc,
                            children: (vt == null ? void 0 : vt.description) ?? '',
                          }),
                        ],
                      }),
                      v.jsx('button', {
                        type: 'button',
                        className: nt.learnBtn,
                        disabled: !at,
                        onClick: () => void Q((Et) => U2(Et, V.skillId)),
                        children: '＋',
                      }),
                    ],
                  },
                  V.skillId
                );
              }),
            }),
          ],
        }),
        v.jsxs('section', {
          className: nt.card,
          children: [
            v.jsx('h2', { className: nt.h2, children: '転職' }),
            v.jsxs('div', {
              className: nt.jobRow,
              children: [
                v.jsx('select', {
                  className: nt.select,
                  value: r,
                  onChange: (V) => d(V.target.value),
                  children: Xi.map((V) => v.jsx('option', { value: V, children: ue[V].name }, V)),
                }),
                v.jsx('button', {
                  type: 'button',
                  className: nt.actBtn,
                  disabled: r === D.classId,
                  onClick: () => void s((V) => z2(V, c, r)),
                  children: '転職する',
                }),
              ],
            }),
            v.jsxs('p', {
              className: nt.warn,
              children: [
                '※ レベルが ',
                Ny,
                ' ',
                '下がり、職業/称号スキルは振り直しになります（種族スキルは保持）。',
              ],
            }),
            v.jsx('h2', { className: nt.h2, children: '称号' }),
            D.titleId
              ? v.jsxs('p', {
                  className: nt.titleHave,
                  children: ['習得済み: ', (J = ca[D.titleId]) == null ? void 0 : J.name],
                })
              : k < hu.TITLE_DEPTH
                ? v.jsxs('p', {
                    className: nt.warn,
                    children: ['第 ', hu.TITLE_DEPTH, ' 階到達で習得できます（現在 ', k, 'F）。'],
                  })
                : v.jsx('div', {
                    className: nt.titleOpts,
                    children: (((Z = ue[D.classId]) == null ? void 0 : Z.titleOptions) ?? []).map(
                      (V) => {
                        var tt;
                        return v.jsxs(
                          'button',
                          {
                            type: 'button',
                            className: nt.titleBtn,
                            disabled: !Iy(D, V, k),
                            onClick: () => void Q((at) => w2(at, V, k)),
                            children: [(tt = ca[V]) == null ? void 0 : tt.name, '（SP+5）'],
                          },
                          V
                        );
                      }
                    ),
                  }),
            v.jsx('h2', { className: nt.h2, children: '転生' }),
            Wy(D)
              ? N
                ? v.jsxs('div', {
                    className: nt.rbForm,
                    children: [
                      v.jsxs('p', {
                        className: nt.warn,
                        children: [
                          '※ 作り直して強い新人になります（開始Lv ',
                          Math.min(30, Math.floor(D.level / 2)),
                          '・ボーナス付き）。',
                        ],
                      }),
                      v.jsx('input', {
                        className: nt.input,
                        type: 'text',
                        maxLength: 16,
                        placeholder: D.name,
                        value: p,
                        onChange: (V) => g(V.target.value),
                      }),
                      v.jsxs('div', {
                        className: nt.jobRow,
                        children: [
                          v.jsx('select', {
                            className: nt.select,
                            value: h,
                            onChange: (V) => m(V.target.value),
                            children: ay.map((V) =>
                              v.jsx('option', { value: V, children: Xe[V].name }, V)
                            ),
                          }),
                          v.jsx('select', {
                            className: nt.select,
                            value: E,
                            onChange: (V) => b(V.target.value),
                            children: Xi.map((V) =>
                              v.jsx('option', { value: V, children: ue[V].name }, V)
                            ),
                          }),
                        ],
                      }),
                      v.jsxs('div', {
                        className: nt.jobRow,
                        children: [
                          v.jsx('button', {
                            type: 'button',
                            className: nt.danger,
                            onClick: () => {
                              (s((V) =>
                                k2(V, c, { raceId: h, classId: E, name: p.trim() || D.name })
                              ),
                                X(!1));
                            },
                            children: '転生を実行',
                          }),
                          v.jsx('button', {
                            type: 'button',
                            className: nt.actBtn,
                            onClick: () => X(!1),
                            children: 'やめる',
                          }),
                        ],
                      }),
                    ],
                  })
                : v.jsx('button', {
                    type: 'button',
                    className: nt.actBtn,
                    onClick: () => X(!0),
                    children: '転生する…',
                  })
              : v.jsxs('p', {
                  className: nt.warn,
                  children: [
                    'Lv',
                    hu.REBIRTH_MIN_LEVEL,
                    ' 以上で転生できます（現在 Lv',
                    D.level,
                    '）。',
                  ],
                }),
          ],
        }),
        v.jsx('footer', {
          className: nt.foot,
          children: v.jsx('button', {
            type: 'button',
            className: nt.back,
            onClick: () => a('/guild'),
            children: 'もどる',
          }),
        }),
      ],
    });
    function O(V) {
      return s((tt) => br(tt, c, V));
    }
  },
  Y2 = () => v.jsx('div', { children: v.jsx('h1', { children: 'Not Found' }) }),
  X2 = '_layout_1u0ua_1',
  V2 = '_head_1u0ua_11',
  Q2 = '_title_1u0ua_18',
  Z2 = '_gold_1u0ua_24',
  K2 = '_tabs_1u0ua_29',
  $2 = '_tab_1u0ua_29',
  J2 = '_tabActive_1u0ua_46',
  W2 = '_list_1u0ua_51',
  I2 = '_row_1u0ua_59',
  F2 = '_info_1u0ua_70',
  P2 = '_name_1u0ua_76',
  tx = '_note_1u0ua_81',
  ex = '_action_1u0ua_86',
  lx = '_empty_1u0ua_103',
  nx = '_foot_1u0ua_108',
  ax = '_back_1u0ua_112',
  Lt = {
    layout: X2,
    head: V2,
    title: Q2,
    gold: Z2,
    tabs: K2,
    tab: $2,
    tabActive: J2,
    list: W2,
    row: I2,
    info: F2,
    name: P2,
    note: tx,
    action: ex,
    empty: lx,
    foot: nx,
    back: ax,
  };
function ux(a) {
  return Math.max(0, Math.floor(a.towerState.record.deepestReached / 10));
}
const ix = (a) => {
  const c = Ae[a].bonuses,
    o = [];
  return (
    c.atk && o.push(`ATK+${c.atk}`),
    c.mat && o.push(`MAT+${c.mat}`),
    c.def && o.push(`DEF+${c.def}`),
    c.mdf && o.push(`MDF+${c.mdf}`),
    o.join(' ')
  );
};
function cx(a) {
  const c = ux(a),
    o = Object.values(bl)
      .filter((r) => r.buyPrice > 0)
      .map((r) => ({ id: r.id, name: r.name, price: r.buyPrice, kind: 'item' }));
  return [
    ...Object.values(Ae)
      .filter((r) => r.tier <= c)
      .map((r) => ({ id: r.id, name: r.name, price: r.buyPrice, kind: 'equip', note: ix(r.id) })),
    ...o,
  ];
}
function sx(a) {
  var c, o;
  return (
    ((c = bl[a]) == null ? void 0 : c.buyPrice) ??
    ((o = Ae[a]) == null ? void 0 : o.buyPrice) ??
    null
  );
}
function Po(a) {
  return bl[a] ? dS(bl[a]) : Ae[a] ? Math.floor(Ae[a].buyPrice / 2) : 0;
}
function ox(a, c) {
  const o = sx(c);
  if (o === null || o <= 0 || a.guild.gold < o) return a;
  const s = vr(a, c, 1);
  return { ...s, guild: { ...s.guild, gold: s.guild.gold - o } };
}
function rx(a, c, o = 1) {
  var p;
  if ((((p = a.guild.storage.find((g) => g.itemId === c)) == null ? void 0 : p.qty) ?? 0) < o)
    return a;
  const r = Po(c) * o,
    d = Fi(a, c, o);
  return { ...d, guild: { ...d.guild, gold: d.guild.gold + r } };
}
const fx = () => {
    const a = Sl(),
      { save: c, applyAndPersist: o } = _n(),
      [s, r] = T.useState('buy');
    if (!c) return v.jsx(_l, { to: '/title', replace: !0 });
    const d = c.guild.gold,
      p = cx(c),
      g = c.guild.storage.filter((m) => Po(m.itemId) > 0),
      h = (m) => {
        var E, b;
        return (
          ((E = bl[m]) == null ? void 0 : E.name) ?? ((b = Ae[m]) == null ? void 0 : b.name) ?? m
        );
      };
    return v.jsxs('div', {
      className: Lt.layout,
      children: [
        v.jsxs('header', {
          className: Lt.head,
          children: [
            v.jsx('h1', { className: Lt.title, children: 'ショップ' }),
            v.jsxs('span', { className: Lt.gold, children: [d, ' G'] }),
          ],
        }),
        v.jsxs('div', {
          className: Lt.tabs,
          children: [
            v.jsx('button', {
              type: 'button',
              className: `${Lt.tab} ${s === 'buy' ? Lt.tabActive : ''}`,
              onClick: () => r('buy'),
              children: '買う',
            }),
            v.jsx('button', {
              type: 'button',
              className: `${Lt.tab} ${s === 'sell' ? Lt.tabActive : ''}`,
              onClick: () => r('sell'),
              children: '売る',
            }),
          ],
        }),
        v.jsx('div', {
          className: Lt.list,
          children:
            s === 'buy'
              ? p.map((m) =>
                  v.jsxs(
                    'div',
                    {
                      className: Lt.row,
                      children: [
                        v.jsxs('div', {
                          className: Lt.info,
                          children: [
                            v.jsx('span', { className: Lt.name, children: m.name }),
                            m.note ? v.jsx('span', { className: Lt.note, children: m.note }) : null,
                          ],
                        }),
                        v.jsxs('button', {
                          type: 'button',
                          className: Lt.action,
                          disabled: d < m.price,
                          onClick: () => void o((E) => ox(E, m.id)),
                          children: [m.price, ' G'],
                        }),
                      ],
                    },
                    m.id
                  )
                )
              : g.length === 0
                ? v.jsx('p', { className: Lt.empty, children: '売れる物がありません。' })
                : g.map((m) =>
                    v.jsxs(
                      'div',
                      {
                        className: Lt.row,
                        children: [
                          v.jsxs('div', {
                            className: Lt.info,
                            children: [
                              v.jsx('span', { className: Lt.name, children: h(m.itemId) }),
                              v.jsxs('span', { className: Lt.note, children: ['所持 ', m.qty] }),
                            ],
                          }),
                          v.jsxs('button', {
                            type: 'button',
                            className: Lt.action,
                            onClick: () => void o((E) => rx(E, m.itemId, 1)),
                            children: ['売却 ', Po(m.itemId), ' G'],
                          }),
                        ],
                      },
                      m.itemId
                    )
                  ),
        }),
        v.jsx('footer', {
          className: Lt.foot,
          children: v.jsx('button', {
            type: 'button',
            className: Lt.back,
            onClick: () => a('/town'),
            children: '拠点へ戻る',
          }),
        }),
      ],
    });
  },
  dx = '_layout_1xkiw_1',
  mx = '_head_1xkiw_12',
  hx = '_title_1xkiw_17',
  yx = '_subtitle_1xkiw_24',
  px = '_body_1xkiw_30',
  gx = '_menu_1xkiw_34',
  vx = '_loading_1xkiw_40',
  _x = '_warn_1xkiw_45',
  bx = '_danger_1xkiw_52',
  Sx = '_dialog_1xkiw_67',
  xx = '_dialogTitle_1xkiw_77',
  Ex = '_field_1xkiw_82',
  Tx = '_note_1xkiw_96',
  Nx = '_dialogActions_1xkiw_102',
  Ax = '_primary_1xkiw_107',
  Cx = '_sub_1xkiw_24',
  Mx = '_foot_1xkiw_132',
  Ht = {
    layout: dx,
    head: mx,
    title: hx,
    subtitle: yx,
    body: px,
    menu: gx,
    loading: vx,
    warn: _x,
    danger: bx,
    dialog: Sx,
    dialogTitle: xx,
    field: Ex,
    note: Tx,
    dialogActions: Nx,
    primary: Ax,
    sub: Cx,
    foot: Mx,
  },
  Rx = '_card_3vsn6_1',
  zx = '_corrupted_3vsn6_14',
  jx = '_corruptedText_3vsn6_19',
  Ox = '_corruptedNote_3vsn6_25',
  Dx = '_guildName_3vsn6_31',
  kx = '_meta_3vsn6_36',
  $l = {
    card: Rx,
    corrupted: zx,
    corruptedText: jx,
    corruptedNote: Ox,
    guildName: Dx,
    meta: kx,
    continue: '_continue_3vsn6_56',
  },
  wx = (a) => {
    if (!a) return '-';
    const c = new Date(a),
      o = (s) => String(s).padStart(2, '0');
    return `${c.getFullYear()}/${o(c.getMonth() + 1)}/${o(c.getDate())} ${o(c.getHours())}:${o(c.getMinutes())}`;
  },
  Bx = ({ meta: a, onContinue: c }) =>
    a.corrupted
      ? v.jsxs('div', {
          className: `${$l.card} ${$l.corrupted}`,
          children: [
            v.jsx('div', { className: $l.corruptedText, children: 'セーブデータが破損しています' }),
            v.jsx('p', {
              className: $l.corruptedNote,
              children: '「最初から」で新しく始められます。',
            }),
          ],
        })
      : v.jsxs('div', {
          className: $l.card,
          children: [
            v.jsx('div', { className: $l.guildName, children: a.guildName }),
            v.jsxs('dl', {
              className: $l.meta,
              children: [
                v.jsxs('div', {
                  children: [
                    v.jsx('dt', { children: '最高到達階' }),
                    v.jsx('dd', {
                      children: a.deepestReached > 0 ? `${a.deepestReached}F` : '未踏破',
                    }),
                  ],
                }),
                v.jsxs('div', {
                  children: [
                    v.jsx('dt', { children: '団員' }),
                    v.jsxs('dd', { children: [a.memberCount, '人'] }),
                  ],
                }),
                v.jsxs('div', {
                  children: [
                    v.jsx('dt', { children: '最終セーブ' }),
                    v.jsx('dd', { children: wx(a.savedAt) }),
                  ],
                }),
              ],
            }),
            v.jsx('button', {
              type: 'button',
              className: $l.continue,
              onClick: c,
              children: 'つづきから',
            }),
          ],
        }),
  Ux = () => {
    const a = Sl(),
      { startNewGame: c, continueGame: o } = _n(),
      [s, r] = T.useState(null),
      [d, p] = T.useState(!0),
      [g, h] = T.useState('menu'),
      [m, E] = T.useState(''),
      [b, N] = T.useState(!1);
    T.useEffect(() => {
      (async () => (r(await gb()), p(!1)))();
    }, []);
    const X = s !== null && !s.corrupted,
      D = T.useCallback(async () => {
        N(!0);
        const k = await o();
        (N(!1), k.ok && a('/town'));
      }, [o, a]),
      w = T.useCallback(() => {
        (E(''), h(X ? 'confirm' : 'guildName'));
      }, [X]),
      L = T.useCallback(async () => {
        const k = m.trim() || 'ななしのギルド';
        (N(!0), await c(k), N(!1), a('/town'));
      }, [m, c, a]);
    return v.jsxs('div', {
      className: Ht.layout,
      children: [
        v.jsxs('header', {
          className: Ht.head,
          children: [
            v.jsx('h1', { className: Ht.title, children: '世界樹ライク' }),
            v.jsx('p', { className: Ht.subtitle, children: '無限タワー探索 RPG' }),
          ],
        }),
        v.jsx('main', {
          className: Ht.body,
          children: d
            ? v.jsx('p', { className: Ht.loading, children: '読み込み中...' })
            : g === 'guildName'
              ? v.jsxs('div', {
                  className: Ht.dialog,
                  children: [
                    v.jsx('h2', { className: Ht.dialogTitle, children: '新しいギルド' }),
                    v.jsxs('label', {
                      className: Ht.field,
                      children: [
                        v.jsx('span', { children: 'ギルド名' }),
                        v.jsx('input', {
                          type: 'text',
                          value: m,
                          maxLength: 16,
                          placeholder: 'ななしのギルド',
                          onChange: (k) => E(k.target.value),
                          autoFocus: !0,
                        }),
                      ],
                    }),
                    v.jsx('p', {
                      className: Ht.note,
                      children:
                        '冒険者はまだいません。開始後、ギルドメニューで仲間を作成してください。',
                    }),
                    v.jsxs('div', {
                      className: Ht.dialogActions,
                      children: [
                        v.jsx('button', {
                          type: 'button',
                          className: Ht.primary,
                          disabled: b,
                          onClick: L,
                          children: 'はじめる',
                        }),
                        v.jsx('button', {
                          type: 'button',
                          className: Ht.sub,
                          disabled: b,
                          onClick: () => h('menu'),
                          children: 'もどる',
                        }),
                      ],
                    }),
                  ],
                })
              : g === 'confirm'
                ? v.jsxs('div', {
                    className: Ht.dialog,
                    children: [
                      v.jsx('h2', { className: Ht.dialogTitle, children: '最初から始めますか？' }),
                      v.jsxs('p', {
                        className: Ht.warn,
                        children: [
                          '現在のセーブデータ「',
                          s == null ? void 0 : s.guildName,
                          '」は上書きされ、元に戻せません。',
                        ],
                      }),
                      v.jsxs('div', {
                        className: Ht.dialogActions,
                        children: [
                          v.jsx('button', {
                            type: 'button',
                            className: Ht.danger,
                            disabled: b,
                            onClick: () => h('guildName'),
                            children: 'データを消して始める',
                          }),
                          v.jsx('button', {
                            type: 'button',
                            className: Ht.sub,
                            disabled: b,
                            onClick: () => h('menu'),
                            children: 'もどる',
                          }),
                        ],
                      }),
                    ],
                  })
                : v.jsxs('div', {
                    className: Ht.menu,
                    children: [
                      s !== null && v.jsx(Bx, { meta: s, onContinue: () => void D() }),
                      v.jsx('button', {
                        type: 'button',
                        className: X ? Ht.sub : Ht.primary,
                        onClick: w,
                        children: '最初から',
                      }),
                    ],
                  }),
        }),
        v.jsxs('footer', { className: Ht.foot, children: ['v', '0.1.9'] }),
      ],
    });
  },
  Lx = '_layout_1wdo2_1',
  Hx = '_head_1wdo2_12',
  qx = '_guildName_1wdo2_16',
  Gx = '_stats_1wdo2_21',
  Yx = '_hint_1wdo2_40',
  Xx = '_menu_1wdo2_50',
  Vx = '_foot_1wdo2_57',
  Qx = '_exit_1wdo2_61',
  Jl = { layout: Lx, head: Hx, guildName: qx, stats: Gx, hint: Yx, menu: Xx, foot: Vx, exit: Qx },
  Zx = '_button_1tp4a_1',
  Kx = '_primary_1tp4a_26',
  $x = '_label_1tp4a_32',
  Jx = '_description_1tp4a_37',
  Vi = { button: Zx, primary: Kx, label: $x, description: Jx },
  du = ({ label: a, description: c, variant: o = 'default', disabled: s = !1, onClick: r }) =>
    v.jsxs('button', {
      type: 'button',
      className: `${Vi.button} ${o === 'primary' ? Vi.primary : ''}`,
      disabled: s,
      onClick: r,
      children: [
        v.jsx('span', { className: Vi.label, children: a }),
        c ? v.jsx('span', { className: Vi.description, children: c }) : null,
      ],
    }),
  Wx = () => {
    const a = Sl(),
      { save: c, exitToTitle: o, applyAndPersist: s } = _n();
    if (!c) return v.jsx(_l, { to: '/title', replace: !0 });
    const { guild: r, towerState: d, diveState: p } = c,
      g = r.members.length > 0,
      h = () => {
        (o(), a('/title'));
      },
      m = async () => {
        (p || (await s((E) => U_(E, 1))), a('/dungeon'));
      };
    return v.jsxs('div', {
      className: Jl.layout,
      children: [
        v.jsxs('header', {
          className: Jl.head,
          children: [
            v.jsx('div', { className: Jl.guildName, children: r.name }),
            v.jsxs('dl', {
              className: Jl.stats,
              children: [
                v.jsxs('div', {
                  children: [
                    v.jsx('dt', { children: '所持金' }),
                    v.jsxs('dd', { children: [r.gold, ' G'] }),
                  ],
                }),
                v.jsxs('div', {
                  children: [
                    v.jsx('dt', { children: '最高到達' }),
                    v.jsx('dd', {
                      children: d.record.deepestReached > 0 ? `${d.record.deepestReached}F` : '-',
                    }),
                  ],
                }),
                v.jsxs('div', {
                  children: [
                    v.jsx('dt', { children: '団員' }),
                    v.jsxs('dd', { children: [r.members.length, '人'] }),
                  ],
                }),
              ],
            }),
          ],
        }),
        !g &&
          v.jsx('p', {
            className: Jl.hint,
            children:
              'まずは「ギルド管理」で冒険者を作成してください。団員がいないとダイブできません。',
          }),
        v.jsxs('main', {
          className: Jl.menu,
          children: [
            v.jsx(du, {
              label: p ? '潜行を再開' : 'ダイブ開始',
              description: g
                ? p
                  ? `${p.depth}F から再開`
                  : '第1階からタワーへ潜る'
                : '団員が必要です',
              variant: 'primary',
              disabled: !g,
              onClick: () => void m(),
            }),
            v.jsx(du, {
              label: 'ギルド管理',
              description: '編成・キャラ作成',
              onClick: () => a('/guild'),
            }),
            v.jsx(du, {
              label: 'ショップ',
              description: '装備・アイテム売買',
              onClick: () => a('/shop'),
            }),
            v.jsx(du, { label: '鍛冶屋', description: '武器強化（Phase 4）', disabled: !0 }),
            v.jsx(du, {
              label: '図鑑 / 記録',
              description: '到達記録・図鑑（Phase 4-5）',
              disabled: !0,
            }),
          ],
        }),
        v.jsx('footer', {
          className: Jl.foot,
          children: v.jsx('button', {
            type: 'button',
            className: Jl.exit,
            onClick: h,
            children: 'タイトルへ戻る',
          }),
        }),
      ],
    });
  };
function Ix() {
  return v.jsxs(kv, {
    children: [
      v.jsx(We, { path: '/', element: v.jsx(_l, { to: '/title', replace: !0 }) }),
      v.jsx(We, { path: '/title', element: v.jsx(Ux, {}) }),
      v.jsx(We, { path: '/town', element: v.jsx(Wx, {}) }),
      v.jsx(We, { path: '/guild', element: v.jsx(QS, {}) }),
      v.jsx(We, { path: '/guild/char/:id', element: v.jsx(G2, {}) }),
      v.jsx(We, { path: '/shop', element: v.jsx(fx, {}) }),
      v.jsx(We, { path: '/dungeon', element: v.jsx(bS, {}) }),
      v.jsx(We, { path: '/battle', element: v.jsx(Sb, {}) }),
      v.jsx(We, { path: '*', element: v.jsx(Y2, {}) }),
    ],
  });
}
const Fx = {
    races: Xe,
    classes: ue,
    titles: ca,
    skills: or,
    enemies: xu,
    items: bl,
    equipment: Ae,
  },
  Px = /^[a-z]+_[a-z0-9_]+$/;
function gn(a, c, o) {
  for (const s of c)
    Px.test(s) || o.push(`[${a}] ID 命名規約違反: "${s}"（期待: <domain>_<name>）`);
}
function Go(a, c, o, s) {
  const r = new Set(c.skills.map((d) => d.skillId));
  for (const d of c.skills) {
    o.has(d.skillId) || s.push(`[${a}] 未定義スキルを参照: "${d.skillId}"`);
    for (const p of d.requires ?? [])
      r.has(p.skillId) ||
        s.push(`[${a}] スキル "${d.skillId}" の前提 "${p.skillId}" が同ツリーに存在しない`);
  }
}
function tE() {
  const a = [],
    { races: c, classes: o, titles: s, skills: r, enemies: d, items: p, equipment: g } = Fx;
  (gn('races', Object.keys(c), a),
    gn('classes', Object.keys(o), a),
    gn('titles', Object.keys(s), a),
    gn('skills', Object.keys(r), a),
    gn('enemies', Object.keys(d), a),
    gn('items', Object.keys(p), a),
    gn('equipment', Object.keys(g), a));
  const h = (N, X) => {
    for (const [D, w] of Object.entries(X))
      D !== w.id && a.push(`[${N}] キー "${D}" と id "${w.id}" が不一致`);
  };
  (h('races', c),
    h('classes', o),
    h('titles', s),
    h('skills', r),
    h('enemies', d),
    h('items', p),
    h('equipment', g));
  const m = new Set(Object.keys(r)),
    E = new Set(Object.keys(o)),
    b = new Set(Object.keys(s));
  for (const N of Object.values(c))
    (E.has(N.defaultClassId) ||
      a.push(`[races] "${N.id}" の defaultClassId "${N.defaultClassId}" が未定義`),
      Go(`races/${N.id}`, N.unionSkillTree, m, a));
  for (const N of Object.values(o)) {
    Go(`classes/${N.id}`, N.skillTree, m, a);
    for (const X of N.titleOptions) {
      if (!b.has(X)) {
        a.push(`[classes] "${N.id}" の称号 "${X}" が未定義`);
        continue;
      }
      s[X].parentClassId !== N.id &&
        a.push(`[classes] 称号 "${X}" の parentClassId が "${N.id}" と不一致`);
    }
  }
  for (const N of Object.values(s))
    (E.has(N.parentClassId) ||
      a.push(`[titles] "${N.id}" の parentClassId "${N.parentClassId}" が未定義`),
      Go(`titles/${N.id}`, N.skillTree, m, a));
  for (const N of Object.values(g))
    (N.slot === 'weapon' &&
      !N.weaponType &&
      a.push(`[equipment] "${N.id}" は weapon だが weaponType が未設定`),
      N.slot === 'armor' &&
        !N.armorType &&
        a.push(`[equipment] "${N.id}" は armor だが armorType が未設定`),
      (N.buyPrice < 0 || N.tier < 0) && a.push(`[equipment] "${N.id}" の buyPrice/tier が負`));
  for (const N of Object.values(p))
    (N.buyPrice < 0 && a.push(`[items] "${N.id}" の buyPrice が負`),
      N.category === 'consumable' &&
        !N.useContext &&
        !N.effects &&
        a.push(`[items] 消費アイテム "${N.id}" に useContext も effects も無い（使用不能）`));
  return { ok: a.length === 0, errors: a };
}
const uy = tE();
uy.ok || console.error('マスターデータ検証エラー:', uy.errors);
const ep = document.getElementById('root');
if (!ep) throw new Error('Failed to find #root element');
Bg.createRoot(ep).render(
  v.jsx(a1, { basename: '/sekaiju-like-game', children: v.jsx(bb, { children: v.jsx(Ix, {}) }) })
);
