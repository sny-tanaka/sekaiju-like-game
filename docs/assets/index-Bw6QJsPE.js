(function () {
  const s = document.createElement('link').relList;
  if (s && s.supports && s.supports('modulepreload')) return;
  for (const d of document.querySelectorAll('link[rel="modulepreload"]')) f(d);
  new MutationObserver((d) => {
    for (const m of d)
      if (m.type === 'childList')
        for (const g of m.addedNodes) g.tagName === 'LINK' && g.rel === 'modulepreload' && f(g);
  }).observe(document, { childList: !0, subtree: !0 });
  function r(d) {
    const m = {};
    return (
      d.integrity && (m.integrity = d.integrity),
      d.referrerPolicy && (m.referrerPolicy = d.referrerPolicy),
      d.crossOrigin === 'use-credentials'
        ? (m.credentials = 'include')
        : d.crossOrigin === 'anonymous'
          ? (m.credentials = 'omit')
          : (m.credentials = 'same-origin'),
      m
    );
  }
  function f(d) {
    if (d.ep) return;
    d.ep = !0;
    const m = r(d);
    fetch(d.href, m);
  }
})();
var kf = { exports: {} },
  Yn = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Om;
function Jv() {
  if (Om) return Yn;
  Om = 1;
  var i = Symbol.for('react.transitional.element'),
    s = Symbol.for('react.fragment');
  function r(f, d, m) {
    var g = null;
    if ((m !== void 0 && (g = '' + m), d.key !== void 0 && (g = '' + d.key), 'key' in d)) {
      m = {};
      for (var R in d) R !== 'key' && (m[R] = d[R]);
    } else m = d;
    return ((d = m.ref), { $$typeof: i, type: f, key: g, ref: d !== void 0 ? d : null, props: m });
  }
  return ((Yn.Fragment = s), (Yn.jsx = r), (Yn.jsxs = r), Yn);
}
var Mm;
function $v() {
  return (Mm || ((Mm = 1), (kf.exports = Jv())), kf.exports);
}
var M = $v(),
  Jf = { exports: {} },
  Gn = {},
  $f = { exports: {} },
  Wf = {};
/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Cm;
function Wv() {
  return (
    Cm ||
      ((Cm = 1),
      (function (i) {
        function s(D, q) {
          var $ = D.length;
          D.push(q);
          t: for (; 0 < $; ) {
            var vt = ($ - 1) >>> 1,
              bt = D[vt];
            if (0 < d(bt, q)) ((D[vt] = q), (D[$] = bt), ($ = vt));
            else break t;
          }
        }
        function r(D) {
          return D.length === 0 ? null : D[0];
        }
        function f(D) {
          if (D.length === 0) return null;
          var q = D[0],
            $ = D.pop();
          if ($ !== q) {
            D[0] = $;
            t: for (var vt = 0, bt = D.length, S = bt >>> 1; vt < S; ) {
              var H = 2 * (vt + 1) - 1,
                Y = D[H],
                Q = H + 1,
                P = D[Q];
              if (0 > d(Y, $))
                Q < bt && 0 > d(P, Y)
                  ? ((D[vt] = P), (D[Q] = $), (vt = Q))
                  : ((D[vt] = Y), (D[H] = $), (vt = H));
              else if (Q < bt && 0 > d(P, $)) ((D[vt] = P), (D[Q] = $), (vt = Q));
              else break t;
            }
          }
          return q;
        }
        function d(D, q) {
          var $ = D.sortIndex - q.sortIndex;
          return $ !== 0 ? $ : D.id - q.id;
        }
        if (
          ((i.unstable_now = void 0),
          typeof performance == 'object' && typeof performance.now == 'function')
        ) {
          var m = performance;
          i.unstable_now = function () {
            return m.now();
          };
        } else {
          var g = Date,
            R = g.now();
          i.unstable_now = function () {
            return g.now() - R;
          };
        }
        var p = [],
          y = [],
          O = 1,
          T = null,
          U = 3,
          G = !1,
          Z = !1,
          L = !1,
          w = !1,
          B = typeof setTimeout == 'function' ? setTimeout : null,
          W = typeof clearTimeout == 'function' ? clearTimeout : null,
          k = typeof setImmediate < 'u' ? setImmediate : null;
        function yt(D) {
          for (var q = r(y); q !== null; ) {
            if (q.callback === null) f(y);
            else if (q.startTime <= D) (f(y), (q.sortIndex = q.expirationTime), s(p, q));
            else break;
            q = r(y);
          }
        }
        function dt(D) {
          if (((L = !1), yt(D), !Z))
            if (r(p) !== null) ((Z = !0), Et || ((Et = !0), $t()));
            else {
              var q = r(y);
              q !== null && jt(dt, q.startTime - D);
            }
        }
        var Et = !1,
          F = -1,
          Ct = 5,
          Jt = -1;
        function je() {
          return w ? !0 : !(i.unstable_now() - Jt < Ct);
        }
        function pe() {
          if (((w = !1), Et)) {
            var D = i.unstable_now();
            Jt = D;
            var q = !0;
            try {
              t: {
                ((Z = !1), L && ((L = !1), W(F), (F = -1)), (G = !0));
                var $ = U;
                try {
                  e: {
                    for (yt(D), T = r(p); T !== null && !(T.expirationTime > D && je()); ) {
                      var vt = T.callback;
                      if (typeof vt == 'function') {
                        ((T.callback = null), (U = T.priorityLevel));
                        var bt = vt(T.expirationTime <= D);
                        if (((D = i.unstable_now()), typeof bt == 'function')) {
                          ((T.callback = bt), yt(D), (q = !0));
                          break e;
                        }
                        (T === r(p) && f(p), yt(D));
                      } else f(p);
                      T = r(p);
                    }
                    if (T !== null) q = !0;
                    else {
                      var S = r(y);
                      (S !== null && jt(dt, S.startTime - D), (q = !1));
                    }
                  }
                  break t;
                } finally {
                  ((T = null), (U = $), (G = !1));
                }
                q = void 0;
              }
            } finally {
              q ? $t() : (Et = !1);
            }
          }
        }
        var $t;
        if (typeof k == 'function')
          $t = function () {
            k(pe);
          };
        else if (typeof MessageChannel < 'u') {
          var He = new MessageChannel(),
            ge = He.port2;
          ((He.port1.onmessage = pe),
            ($t = function () {
              ge.postMessage(null);
            }));
        } else
          $t = function () {
            B(pe, 0);
          };
        function jt(D, q) {
          F = B(function () {
            D(i.unstable_now());
          }, q);
        }
        ((i.unstable_IdlePriority = 5),
          (i.unstable_ImmediatePriority = 1),
          (i.unstable_LowPriority = 4),
          (i.unstable_NormalPriority = 3),
          (i.unstable_Profiling = null),
          (i.unstable_UserBlockingPriority = 2),
          (i.unstable_cancelCallback = function (D) {
            D.callback = null;
          }),
          (i.unstable_forceFrameRate = function (D) {
            0 > D || 125 < D
              ? console.error(
                  'forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported'
                )
              : (Ct = 0 < D ? Math.floor(1e3 / D) : 5);
          }),
          (i.unstable_getCurrentPriorityLevel = function () {
            return U;
          }),
          (i.unstable_next = function (D) {
            switch (U) {
              case 1:
              case 2:
              case 3:
                var q = 3;
                break;
              default:
                q = U;
            }
            var $ = U;
            U = q;
            try {
              return D();
            } finally {
              U = $;
            }
          }),
          (i.unstable_requestPaint = function () {
            w = !0;
          }),
          (i.unstable_runWithPriority = function (D, q) {
            switch (D) {
              case 1:
              case 2:
              case 3:
              case 4:
              case 5:
                break;
              default:
                D = 3;
            }
            var $ = U;
            U = D;
            try {
              return q();
            } finally {
              U = $;
            }
          }),
          (i.unstable_scheduleCallback = function (D, q, $) {
            var vt = i.unstable_now();
            switch (
              (typeof $ == 'object' && $ !== null
                ? (($ = $.delay), ($ = typeof $ == 'number' && 0 < $ ? vt + $ : vt))
                : ($ = vt),
              D)
            ) {
              case 1:
                var bt = -1;
                break;
              case 2:
                bt = 250;
                break;
              case 5:
                bt = 1073741823;
                break;
              case 4:
                bt = 1e4;
                break;
              default:
                bt = 5e3;
            }
            return (
              (bt = $ + bt),
              (D = {
                id: O++,
                callback: q,
                priorityLevel: D,
                startTime: $,
                expirationTime: bt,
                sortIndex: -1,
              }),
              $ > vt
                ? ((D.sortIndex = $),
                  s(y, D),
                  r(p) === null && D === r(y) && (L ? (W(F), (F = -1)) : (L = !0), jt(dt, $ - vt)))
                : ((D.sortIndex = bt), s(p, D), Z || G || ((Z = !0), Et || ((Et = !0), $t()))),
              D
            );
          }),
          (i.unstable_shouldYield = je),
          (i.unstable_wrapCallback = function (D) {
            var q = U;
            return function () {
              var $ = U;
              U = q;
              try {
                return D.apply(this, arguments);
              } finally {
                U = $;
              }
            };
          }));
      })(Wf)),
    Wf
  );
}
var Dm;
function Fv() {
  return (Dm || ((Dm = 1), ($f.exports = Wv())), $f.exports);
}
var Ff = { exports: {} },
  I = {};
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Nm;
function Iv() {
  if (Nm) return I;
  Nm = 1;
  var i = Symbol.for('react.transitional.element'),
    s = Symbol.for('react.portal'),
    r = Symbol.for('react.fragment'),
    f = Symbol.for('react.strict_mode'),
    d = Symbol.for('react.profiler'),
    m = Symbol.for('react.consumer'),
    g = Symbol.for('react.context'),
    R = Symbol.for('react.forward_ref'),
    p = Symbol.for('react.suspense'),
    y = Symbol.for('react.memo'),
    O = Symbol.for('react.lazy'),
    T = Symbol.for('react.activity'),
    U = Symbol.iterator;
  function G(S) {
    return S === null || typeof S != 'object'
      ? null
      : ((S = (U && S[U]) || S['@@iterator']), typeof S == 'function' ? S : null);
  }
  var Z = {
      isMounted: function () {
        return !1;
      },
      enqueueForceUpdate: function () {},
      enqueueReplaceState: function () {},
      enqueueSetState: function () {},
    },
    L = Object.assign,
    w = {};
  function B(S, H, Y) {
    ((this.props = S), (this.context = H), (this.refs = w), (this.updater = Y || Z));
  }
  ((B.prototype.isReactComponent = {}),
    (B.prototype.setState = function (S, H) {
      if (typeof S != 'object' && typeof S != 'function' && S != null)
        throw Error(
          'takes an object of state variables to update or a function which returns an object of state variables.'
        );
      this.updater.enqueueSetState(this, S, H, 'setState');
    }),
    (B.prototype.forceUpdate = function (S) {
      this.updater.enqueueForceUpdate(this, S, 'forceUpdate');
    }));
  function W() {}
  W.prototype = B.prototype;
  function k(S, H, Y) {
    ((this.props = S), (this.context = H), (this.refs = w), (this.updater = Y || Z));
  }
  var yt = (k.prototype = new W());
  ((yt.constructor = k), L(yt, B.prototype), (yt.isPureReactComponent = !0));
  var dt = Array.isArray;
  function Et() {}
  var F = { H: null, A: null, T: null, S: null },
    Ct = Object.prototype.hasOwnProperty;
  function Jt(S, H, Y) {
    var Q = Y.ref;
    return { $$typeof: i, type: S, key: H, ref: Q !== void 0 ? Q : null, props: Y };
  }
  function je(S, H) {
    return Jt(S.type, H, S.props);
  }
  function pe(S) {
    return typeof S == 'object' && S !== null && S.$$typeof === i;
  }
  function $t(S) {
    var H = { '=': '=0', ':': '=2' };
    return (
      '$' +
      S.replace(/[=:]/g, function (Y) {
        return H[Y];
      })
    );
  }
  var He = /\/+/g;
  function ge(S, H) {
    return typeof S == 'object' && S !== null && S.key != null ? $t('' + S.key) : H.toString(36);
  }
  function jt(S) {
    switch (S.status) {
      case 'fulfilled':
        return S.value;
      case 'rejected':
        throw S.reason;
      default:
        switch (
          (typeof S.status == 'string'
            ? S.then(Et, Et)
            : ((S.status = 'pending'),
              S.then(
                function (H) {
                  S.status === 'pending' && ((S.status = 'fulfilled'), (S.value = H));
                },
                function (H) {
                  S.status === 'pending' && ((S.status = 'rejected'), (S.reason = H));
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
  function D(S, H, Y, Q, P) {
    var lt = typeof S;
    (lt === 'undefined' || lt === 'boolean') && (S = null);
    var ot = !1;
    if (S === null) ot = !0;
    else
      switch (lt) {
        case 'bigint':
        case 'string':
        case 'number':
          ot = !0;
          break;
        case 'object':
          switch (S.$$typeof) {
            case i:
            case s:
              ot = !0;
              break;
            case O:
              return ((ot = S._init), D(ot(S._payload), H, Y, Q, P));
          }
      }
    if (ot)
      return (
        (P = P(S)),
        (ot = Q === '' ? '.' + ge(S, 0) : Q),
        dt(P)
          ? ((Y = ''),
            ot != null && (Y = ot.replace(He, '$&/') + '/'),
            D(P, H, Y, '', function (Va) {
              return Va;
            }))
          : P != null &&
            (pe(P) &&
              (P = je(
                P,
                Y +
                  (P.key == null || (S && S.key === P.key)
                    ? ''
                    : ('' + P.key).replace(He, '$&/') + '/') +
                  ot
              )),
            H.push(P)),
        1
      );
    ot = 0;
    var Ft = Q === '' ? '.' : Q + ':';
    if (dt(S))
      for (var Dt = 0; Dt < S.length; Dt++)
        ((Q = S[Dt]), (lt = Ft + ge(Q, Dt)), (ot += D(Q, H, Y, lt, P)));
    else if (((Dt = G(S)), typeof Dt == 'function'))
      for (S = Dt.call(S), Dt = 0; !(Q = S.next()).done; )
        ((Q = Q.value), (lt = Ft + ge(Q, Dt++)), (ot += D(Q, H, Y, lt, P)));
    else if (lt === 'object') {
      if (typeof S.then == 'function') return D(jt(S), H, Y, Q, P);
      throw (
        (H = String(S)),
        Error(
          'Objects are not valid as a React child (found: ' +
            (H === '[object Object]' ? 'object with keys {' + Object.keys(S).join(', ') + '}' : H) +
            '). If you meant to render a collection of children, use an array instead.'
        )
      );
    }
    return ot;
  }
  function q(S, H, Y) {
    if (S == null) return S;
    var Q = [],
      P = 0;
    return (
      D(S, Q, '', '', function (lt) {
        return H.call(Y, lt, P++);
      }),
      Q
    );
  }
  function $(S) {
    if (S._status === -1) {
      var H = S._result;
      ((H = H()),
        H.then(
          function (Y) {
            (S._status === 0 || S._status === -1) && ((S._status = 1), (S._result = Y));
          },
          function (Y) {
            (S._status === 0 || S._status === -1) && ((S._status = 2), (S._result = Y));
          }
        ),
        S._status === -1 && ((S._status = 0), (S._result = H)));
    }
    if (S._status === 1) return S._result.default;
    throw S._result;
  }
  var vt =
      typeof reportError == 'function'
        ? reportError
        : function (S) {
            if (typeof window == 'object' && typeof window.ErrorEvent == 'function') {
              var H = new window.ErrorEvent('error', {
                bubbles: !0,
                cancelable: !0,
                message:
                  typeof S == 'object' && S !== null && typeof S.message == 'string'
                    ? String(S.message)
                    : String(S),
                error: S,
              });
              if (!window.dispatchEvent(H)) return;
            } else if (typeof process == 'object' && typeof process.emit == 'function') {
              process.emit('uncaughtException', S);
              return;
            }
            console.error(S);
          },
    bt = {
      map: q,
      forEach: function (S, H, Y) {
        q(
          S,
          function () {
            H.apply(this, arguments);
          },
          Y
        );
      },
      count: function (S) {
        var H = 0;
        return (
          q(S, function () {
            H++;
          }),
          H
        );
      },
      toArray: function (S) {
        return (
          q(S, function (H) {
            return H;
          }) || []
        );
      },
      only: function (S) {
        if (!pe(S))
          throw Error('React.Children.only expected to receive a single React element child.');
        return S;
      },
    };
  return (
    (I.Activity = T),
    (I.Children = bt),
    (I.Component = B),
    (I.Fragment = r),
    (I.Profiler = d),
    (I.PureComponent = k),
    (I.StrictMode = f),
    (I.Suspense = p),
    (I.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = F),
    (I.__COMPILER_RUNTIME = {
      __proto__: null,
      c: function (S) {
        return F.H.useMemoCache(S);
      },
    }),
    (I.cache = function (S) {
      return function () {
        return S.apply(null, arguments);
      };
    }),
    (I.cacheSignal = function () {
      return null;
    }),
    (I.cloneElement = function (S, H, Y) {
      if (S == null) throw Error('The argument must be a React element, but you passed ' + S + '.');
      var Q = L({}, S.props),
        P = S.key;
      if (H != null)
        for (lt in (H.key !== void 0 && (P = '' + H.key), H))
          !Ct.call(H, lt) ||
            lt === 'key' ||
            lt === '__self' ||
            lt === '__source' ||
            (lt === 'ref' && H.ref === void 0) ||
            (Q[lt] = H[lt]);
      var lt = arguments.length - 2;
      if (lt === 1) Q.children = Y;
      else if (1 < lt) {
        for (var ot = Array(lt), Ft = 0; Ft < lt; Ft++) ot[Ft] = arguments[Ft + 2];
        Q.children = ot;
      }
      return Jt(S.type, P, Q);
    }),
    (I.createContext = function (S) {
      return (
        (S = {
          $$typeof: g,
          _currentValue: S,
          _currentValue2: S,
          _threadCount: 0,
          Provider: null,
          Consumer: null,
        }),
        (S.Provider = S),
        (S.Consumer = { $$typeof: m, _context: S }),
        S
      );
    }),
    (I.createElement = function (S, H, Y) {
      var Q,
        P = {},
        lt = null;
      if (H != null)
        for (Q in (H.key !== void 0 && (lt = '' + H.key), H))
          Ct.call(H, Q) && Q !== 'key' && Q !== '__self' && Q !== '__source' && (P[Q] = H[Q]);
      var ot = arguments.length - 2;
      if (ot === 1) P.children = Y;
      else if (1 < ot) {
        for (var Ft = Array(ot), Dt = 0; Dt < ot; Dt++) Ft[Dt] = arguments[Dt + 2];
        P.children = Ft;
      }
      if (S && S.defaultProps)
        for (Q in ((ot = S.defaultProps), ot)) P[Q] === void 0 && (P[Q] = ot[Q]);
      return Jt(S, lt, P);
    }),
    (I.createRef = function () {
      return { current: null };
    }),
    (I.forwardRef = function (S) {
      return { $$typeof: R, render: S };
    }),
    (I.isValidElement = pe),
    (I.lazy = function (S) {
      return { $$typeof: O, _payload: { _status: -1, _result: S }, _init: $ };
    }),
    (I.memo = function (S, H) {
      return { $$typeof: y, type: S, compare: H === void 0 ? null : H };
    }),
    (I.startTransition = function (S) {
      var H = F.T,
        Y = {};
      F.T = Y;
      try {
        var Q = S(),
          P = F.S;
        (P !== null && P(Y, Q),
          typeof Q == 'object' && Q !== null && typeof Q.then == 'function' && Q.then(Et, vt));
      } catch (lt) {
        vt(lt);
      } finally {
        (H !== null && Y.types !== null && (H.types = Y.types), (F.T = H));
      }
    }),
    (I.unstable_useCacheRefresh = function () {
      return F.H.useCacheRefresh();
    }),
    (I.use = function (S) {
      return F.H.use(S);
    }),
    (I.useActionState = function (S, H, Y) {
      return F.H.useActionState(S, H, Y);
    }),
    (I.useCallback = function (S, H) {
      return F.H.useCallback(S, H);
    }),
    (I.useContext = function (S) {
      return F.H.useContext(S);
    }),
    (I.useDebugValue = function () {}),
    (I.useDeferredValue = function (S, H) {
      return F.H.useDeferredValue(S, H);
    }),
    (I.useEffect = function (S, H) {
      return F.H.useEffect(S, H);
    }),
    (I.useEffectEvent = function (S) {
      return F.H.useEffectEvent(S);
    }),
    (I.useId = function () {
      return F.H.useId();
    }),
    (I.useImperativeHandle = function (S, H, Y) {
      return F.H.useImperativeHandle(S, H, Y);
    }),
    (I.useInsertionEffect = function (S, H) {
      return F.H.useInsertionEffect(S, H);
    }),
    (I.useLayoutEffect = function (S, H) {
      return F.H.useLayoutEffect(S, H);
    }),
    (I.useMemo = function (S, H) {
      return F.H.useMemo(S, H);
    }),
    (I.useOptimistic = function (S, H) {
      return F.H.useOptimistic(S, H);
    }),
    (I.useReducer = function (S, H, Y) {
      return F.H.useReducer(S, H, Y);
    }),
    (I.useRef = function (S) {
      return F.H.useRef(S);
    }),
    (I.useState = function (S) {
      return F.H.useState(S);
    }),
    (I.useSyncExternalStore = function (S, H, Y) {
      return F.H.useSyncExternalStore(S, H, Y);
    }),
    (I.useTransition = function () {
      return F.H.useTransition();
    }),
    (I.version = '19.2.5'),
    I
  );
}
var Um;
function ys() {
  return (Um || ((Um = 1), (Ff.exports = Iv())), Ff.exports);
}
var If = { exports: {} },
  Wt = {};
/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var jm;
function Pv() {
  if (jm) return Wt;
  jm = 1;
  var i = ys();
  function s(p) {
    var y = 'https://react.dev/errors/' + p;
    if (1 < arguments.length) {
      y += '?args[]=' + encodeURIComponent(arguments[1]);
      for (var O = 2; O < arguments.length; O++) y += '&args[]=' + encodeURIComponent(arguments[O]);
    }
    return (
      'Minified React error #' +
      p +
      '; visit ' +
      y +
      ' for the full message or use the non-minified dev environment for full errors and additional helpful warnings.'
    );
  }
  function r() {}
  var f = {
      d: {
        f: r,
        r: function () {
          throw Error(s(522));
        },
        D: r,
        C: r,
        L: r,
        m: r,
        X: r,
        S: r,
        M: r,
      },
      p: 0,
      findDOMNode: null,
    },
    d = Symbol.for('react.portal');
  function m(p, y, O) {
    var T = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: d,
      key: T == null ? null : '' + T,
      children: p,
      containerInfo: y,
      implementation: O,
    };
  }
  var g = i.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function R(p, y) {
    if (p === 'font') return '';
    if (typeof y == 'string') return y === 'use-credentials' ? y : '';
  }
  return (
    (Wt.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = f),
    (Wt.createPortal = function (p, y) {
      var O = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
      if (!y || (y.nodeType !== 1 && y.nodeType !== 9 && y.nodeType !== 11)) throw Error(s(299));
      return m(p, y, null, O);
    }),
    (Wt.flushSync = function (p) {
      var y = g.T,
        O = f.p;
      try {
        if (((g.T = null), (f.p = 2), p)) return p();
      } finally {
        ((g.T = y), (f.p = O), f.d.f());
      }
    }),
    (Wt.preconnect = function (p, y) {
      typeof p == 'string' &&
        (y
          ? ((y = y.crossOrigin),
            (y = typeof y == 'string' ? (y === 'use-credentials' ? y : '') : void 0))
          : (y = null),
        f.d.C(p, y));
    }),
    (Wt.prefetchDNS = function (p) {
      typeof p == 'string' && f.d.D(p);
    }),
    (Wt.preinit = function (p, y) {
      if (typeof p == 'string' && y && typeof y.as == 'string') {
        var O = y.as,
          T = R(O, y.crossOrigin),
          U = typeof y.integrity == 'string' ? y.integrity : void 0,
          G = typeof y.fetchPriority == 'string' ? y.fetchPriority : void 0;
        O === 'style'
          ? f.d.S(p, typeof y.precedence == 'string' ? y.precedence : void 0, {
              crossOrigin: T,
              integrity: U,
              fetchPriority: G,
            })
          : O === 'script' &&
            f.d.X(p, {
              crossOrigin: T,
              integrity: U,
              fetchPriority: G,
              nonce: typeof y.nonce == 'string' ? y.nonce : void 0,
            });
      }
    }),
    (Wt.preinitModule = function (p, y) {
      if (typeof p == 'string')
        if (typeof y == 'object' && y !== null) {
          if (y.as == null || y.as === 'script') {
            var O = R(y.as, y.crossOrigin);
            f.d.M(p, {
              crossOrigin: O,
              integrity: typeof y.integrity == 'string' ? y.integrity : void 0,
              nonce: typeof y.nonce == 'string' ? y.nonce : void 0,
            });
          }
        } else y == null && f.d.M(p);
    }),
    (Wt.preload = function (p, y) {
      if (typeof p == 'string' && typeof y == 'object' && y !== null && typeof y.as == 'string') {
        var O = y.as,
          T = R(O, y.crossOrigin);
        f.d.L(p, O, {
          crossOrigin: T,
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
    (Wt.preloadModule = function (p, y) {
      if (typeof p == 'string')
        if (y) {
          var O = R(y.as, y.crossOrigin);
          f.d.m(p, {
            as: typeof y.as == 'string' && y.as !== 'script' ? y.as : void 0,
            crossOrigin: O,
            integrity: typeof y.integrity == 'string' ? y.integrity : void 0,
          });
        } else f.d.m(p);
    }),
    (Wt.requestFormReset = function (p) {
      f.d.r(p);
    }),
    (Wt.unstable_batchedUpdates = function (p, y) {
      return p(y);
    }),
    (Wt.useFormState = function (p, y, O) {
      return g.H.useFormState(p, y, O);
    }),
    (Wt.useFormStatus = function () {
      return g.H.useHostTransitionStatus();
    }),
    (Wt.version = '19.2.5'),
    Wt
  );
}
var Hm;
function t0() {
  if (Hm) return If.exports;
  Hm = 1;
  function i() {
    if (
      !(
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > 'u' ||
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != 'function'
      )
    )
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(i);
      } catch (s) {
        console.error(s);
      }
  }
  return (i(), (If.exports = Pv()), If.exports);
}
/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Bm;
function e0() {
  if (Bm) return Gn;
  Bm = 1;
  var i = Fv(),
    s = ys(),
    r = t0();
  function f(t) {
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
  function d(t) {
    return !(!t || (t.nodeType !== 1 && t.nodeType !== 9 && t.nodeType !== 11));
  }
  function m(t) {
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
  function g(t) {
    if (t.tag === 13) {
      var e = t.memoizedState;
      if ((e === null && ((t = t.alternate), t !== null && (e = t.memoizedState)), e !== null))
        return e.dehydrated;
    }
    return null;
  }
  function R(t) {
    if (t.tag === 31) {
      var e = t.memoizedState;
      if ((e === null && ((t = t.alternate), t !== null && (e = t.memoizedState)), e !== null))
        return e.dehydrated;
    }
    return null;
  }
  function p(t) {
    if (m(t) !== t) throw Error(f(188));
  }
  function y(t) {
    var e = t.alternate;
    if (!e) {
      if (((e = m(t)), e === null)) throw Error(f(188));
      return e !== t ? null : t;
    }
    for (var l = t, a = e; ; ) {
      var n = l.return;
      if (n === null) break;
      var u = n.alternate;
      if (u === null) {
        if (((a = n.return), a !== null)) {
          l = a;
          continue;
        }
        break;
      }
      if (n.child === u.child) {
        for (u = n.child; u; ) {
          if (u === l) return (p(n), t);
          if (u === a) return (p(n), e);
          u = u.sibling;
        }
        throw Error(f(188));
      }
      if (l.return !== a.return) ((l = n), (a = u));
      else {
        for (var c = !1, o = n.child; o; ) {
          if (o === l) {
            ((c = !0), (l = n), (a = u));
            break;
          }
          if (o === a) {
            ((c = !0), (a = n), (l = u));
            break;
          }
          o = o.sibling;
        }
        if (!c) {
          for (o = u.child; o; ) {
            if (o === l) {
              ((c = !0), (l = u), (a = n));
              break;
            }
            if (o === a) {
              ((c = !0), (a = u), (l = n));
              break;
            }
            o = o.sibling;
          }
          if (!c) throw Error(f(189));
        }
      }
      if (l.alternate !== a) throw Error(f(190));
    }
    if (l.tag !== 3) throw Error(f(188));
    return l.stateNode.current === l ? t : e;
  }
  function O(t) {
    var e = t.tag;
    if (e === 5 || e === 26 || e === 27 || e === 6) return t;
    for (t = t.child; t !== null; ) {
      if (((e = O(t)), e !== null)) return e;
      t = t.sibling;
    }
    return null;
  }
  var T = Object.assign,
    U = Symbol.for('react.element'),
    G = Symbol.for('react.transitional.element'),
    Z = Symbol.for('react.portal'),
    L = Symbol.for('react.fragment'),
    w = Symbol.for('react.strict_mode'),
    B = Symbol.for('react.profiler'),
    W = Symbol.for('react.consumer'),
    k = Symbol.for('react.context'),
    yt = Symbol.for('react.forward_ref'),
    dt = Symbol.for('react.suspense'),
    Et = Symbol.for('react.suspense_list'),
    F = Symbol.for('react.memo'),
    Ct = Symbol.for('react.lazy'),
    Jt = Symbol.for('react.activity'),
    je = Symbol.for('react.memo_cache_sentinel'),
    pe = Symbol.iterator;
  function $t(t) {
    return t === null || typeof t != 'object'
      ? null
      : ((t = (pe && t[pe]) || t['@@iterator']), typeof t == 'function' ? t : null);
  }
  var He = Symbol.for('react.client.reference');
  function ge(t) {
    if (t == null) return null;
    if (typeof t == 'function') return t.$$typeof === He ? null : t.displayName || t.name || null;
    if (typeof t == 'string') return t;
    switch (t) {
      case L:
        return 'Fragment';
      case B:
        return 'Profiler';
      case w:
        return 'StrictMode';
      case dt:
        return 'Suspense';
      case Et:
        return 'SuspenseList';
      case Jt:
        return 'Activity';
    }
    if (typeof t == 'object')
      switch (t.$$typeof) {
        case Z:
          return 'Portal';
        case k:
          return t.displayName || 'Context';
        case W:
          return (t._context.displayName || 'Context') + '.Consumer';
        case yt:
          var e = t.render;
          return (
            (t = t.displayName),
            t ||
              ((t = e.displayName || e.name || ''),
              (t = t !== '' ? 'ForwardRef(' + t + ')' : 'ForwardRef')),
            t
          );
        case F:
          return ((e = t.displayName || null), e !== null ? e : ge(t.type) || 'Memo');
        case Ct:
          ((e = t._payload), (t = t._init));
          try {
            return ge(t(e));
          } catch {}
      }
    return null;
  }
  var jt = Array.isArray,
    D = s.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
    q = r.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
    $ = { pending: !1, data: null, method: null, action: null },
    vt = [],
    bt = -1;
  function S(t) {
    return { current: t };
  }
  function H(t) {
    0 > bt || ((t.current = vt[bt]), (vt[bt] = null), bt--);
  }
  function Y(t, e) {
    (bt++, (vt[bt] = t.current), (t.current = e));
  }
  var Q = S(null),
    P = S(null),
    lt = S(null),
    ot = S(null);
  function Ft(t, e) {
    switch ((Y(lt, e), Y(P, t), Y(Q, null), e.nodeType)) {
      case 9:
      case 11:
        t = (t = e.documentElement) && (t = t.namespaceURI) ? Fd(t) : 0;
        break;
      default:
        if (((t = e.tagName), (e = e.namespaceURI))) ((e = Fd(e)), (t = Id(e, t)));
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
    (H(Q), Y(Q, t));
  }
  function Dt() {
    (H(Q), H(P), H(lt));
  }
  function Va(t) {
    t.memoizedState !== null && Y(ot, t);
    var e = Q.current,
      l = Id(e, t.type);
    e !== l && (Y(P, t), Y(Q, l));
  }
  function Pn(t) {
    (P.current === t && (H(Q), H(P)), ot.current === t && (H(ot), (Hn._currentValue = $)));
  }
  var Oi, Rs;
  function Bl(t) {
    if (Oi === void 0)
      try {
        throw Error();
      } catch (l) {
        var e = l.stack.trim().match(/\n( *(at )?)/);
        ((Oi = (e && e[1]) || ''),
          (Rs =
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
      Oi +
      t +
      Rs
    );
  }
  var Mi = !1;
  function Ci(t, e) {
    if (!t || Mi) return '';
    Mi = !0;
    var l = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var a = {
        DetermineComponentFrameRoot: function () {
          try {
            if (e) {
              var j = function () {
                throw Error();
              };
              if (
                (Object.defineProperty(j.prototype, 'props', {
                  set: function () {
                    throw Error();
                  },
                }),
                typeof Reflect == 'object' && Reflect.construct)
              ) {
                try {
                  Reflect.construct(j, []);
                } catch (x) {
                  var A = x;
                }
                Reflect.construct(t, [], j);
              } else {
                try {
                  j.call();
                } catch (x) {
                  A = x;
                }
                t.call(j.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (x) {
                A = x;
              }
              (j = t()) && typeof j.catch == 'function' && j.catch(function () {});
            }
          } catch (x) {
            if (x && A && typeof x.stack == 'string') return [x.stack, A.stack];
          }
          return [null, null];
        },
      };
      a.DetermineComponentFrameRoot.displayName = 'DetermineComponentFrameRoot';
      var n = Object.getOwnPropertyDescriptor(a.DetermineComponentFrameRoot, 'name');
      n &&
        n.configurable &&
        Object.defineProperty(a.DetermineComponentFrameRoot, 'name', {
          value: 'DetermineComponentFrameRoot',
        });
      var u = a.DetermineComponentFrameRoot(),
        c = u[0],
        o = u[1];
      if (c && o) {
        var h = c.split(`
`),
          E = o.split(`
`);
        for (n = a = 0; a < h.length && !h[a].includes('DetermineComponentFrameRoot'); ) a++;
        for (; n < E.length && !E[n].includes('DetermineComponentFrameRoot'); ) n++;
        if (a === h.length || n === E.length)
          for (a = h.length - 1, n = E.length - 1; 1 <= a && 0 <= n && h[a] !== E[n]; ) n--;
        for (; 1 <= a && 0 <= n; a--, n--)
          if (h[a] !== E[n]) {
            if (a !== 1 || n !== 1)
              do
                if ((a--, n--, 0 > n || h[a] !== E[n])) {
                  var C =
                    `
` + h[a].replace(' at new ', ' at ');
                  return (
                    t.displayName &&
                      C.includes('<anonymous>') &&
                      (C = C.replace('<anonymous>', t.displayName)),
                    C
                  );
                }
              while (1 <= a && 0 <= n);
            break;
          }
      }
    } finally {
      ((Mi = !1), (Error.prepareStackTrace = l));
    }
    return (l = t ? t.displayName || t.name : '') ? Bl(l) : '';
  }
  function zh(t, e) {
    switch (t.tag) {
      case 26:
      case 27:
      case 5:
        return Bl(t.type);
      case 16:
        return Bl('Lazy');
      case 13:
        return t.child !== e && e !== null ? Bl('Suspense Fallback') : Bl('Suspense');
      case 19:
        return Bl('SuspenseList');
      case 0:
      case 15:
        return Ci(t.type, !1);
      case 11:
        return Ci(t.type.render, !1);
      case 1:
        return Ci(t.type, !0);
      case 31:
        return Bl('Activity');
      default:
        return '';
    }
  }
  function xs(t) {
    try {
      var e = '',
        l = null;
      do ((e += zh(t, l)), (l = t), (t = t.return));
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
  var Di = Object.prototype.hasOwnProperty,
    Ni = i.unstable_scheduleCallback,
    Ui = i.unstable_cancelCallback,
    Rh = i.unstable_shouldYield,
    xh = i.unstable_requestPaint,
    ie = i.unstable_now,
    Oh = i.unstable_getCurrentPriorityLevel,
    Os = i.unstable_ImmediatePriority,
    Ms = i.unstable_UserBlockingPriority,
    tu = i.unstable_NormalPriority,
    Mh = i.unstable_LowPriority,
    Cs = i.unstable_IdlePriority,
    Ch = i.log,
    Dh = i.unstable_setDisableYieldValue,
    Ka = null,
    ce = null;
  function cl(t) {
    if ((typeof Ch == 'function' && Dh(t), ce && typeof ce.setStrictMode == 'function'))
      try {
        ce.setStrictMode(Ka, t);
      } catch {}
  }
  var fe = Math.clz32 ? Math.clz32 : jh,
    Nh = Math.log,
    Uh = Math.LN2;
  function jh(t) {
    return ((t >>>= 0), t === 0 ? 32 : (31 - ((Nh(t) / Uh) | 0)) | 0);
  }
  var eu = 256,
    lu = 262144,
    au = 4194304;
  function ql(t) {
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
  function nu(t, e, l) {
    var a = t.pendingLanes;
    if (a === 0) return 0;
    var n = 0,
      u = t.suspendedLanes,
      c = t.pingedLanes;
    t = t.warmLanes;
    var o = a & 134217727;
    return (
      o !== 0
        ? ((a = o & ~u),
          a !== 0
            ? (n = ql(a))
            : ((c &= o), c !== 0 ? (n = ql(c)) : l || ((l = o & ~t), l !== 0 && (n = ql(l)))))
        : ((o = a & ~u),
          o !== 0
            ? (n = ql(o))
            : c !== 0
              ? (n = ql(c))
              : l || ((l = a & ~t), l !== 0 && (n = ql(l)))),
      n === 0
        ? 0
        : e !== 0 &&
            e !== n &&
            (e & u) === 0 &&
            ((u = n & -n), (l = e & -e), u >= l || (u === 32 && (l & 4194048) !== 0))
          ? e
          : n
    );
  }
  function ka(t, e) {
    return (t.pendingLanes & ~(t.suspendedLanes & ~t.pingedLanes) & e) === 0;
  }
  function Hh(t, e) {
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
  function Ds() {
    var t = au;
    return ((au <<= 1), (au & 62914560) === 0 && (au = 4194304), t);
  }
  function ji(t) {
    for (var e = [], l = 0; 31 > l; l++) e.push(t);
    return e;
  }
  function Ja(t, e) {
    ((t.pendingLanes |= e),
      e !== 268435456 && ((t.suspendedLanes = 0), (t.pingedLanes = 0), (t.warmLanes = 0)));
  }
  function Bh(t, e, l, a, n, u) {
    var c = t.pendingLanes;
    ((t.pendingLanes = l),
      (t.suspendedLanes = 0),
      (t.pingedLanes = 0),
      (t.warmLanes = 0),
      (t.expiredLanes &= l),
      (t.entangledLanes &= l),
      (t.errorRecoveryDisabledLanes &= l),
      (t.shellSuspendCounter = 0));
    var o = t.entanglements,
      h = t.expirationTimes,
      E = t.hiddenUpdates;
    for (l = c & ~l; 0 < l; ) {
      var C = 31 - fe(l),
        j = 1 << C;
      ((o[C] = 0), (h[C] = -1));
      var A = E[C];
      if (A !== null)
        for (E[C] = null, C = 0; C < A.length; C++) {
          var x = A[C];
          x !== null && (x.lane &= -536870913);
        }
      l &= ~j;
    }
    (a !== 0 && Ns(t, a, 0),
      u !== 0 && n === 0 && t.tag !== 0 && (t.suspendedLanes |= u & ~(c & ~e)));
  }
  function Ns(t, e, l) {
    ((t.pendingLanes |= e), (t.suspendedLanes &= ~e));
    var a = 31 - fe(e);
    ((t.entangledLanes |= e),
      (t.entanglements[a] = t.entanglements[a] | 1073741824 | (l & 261930)));
  }
  function Us(t, e) {
    var l = (t.entangledLanes |= e);
    for (t = t.entanglements; l; ) {
      var a = 31 - fe(l),
        n = 1 << a;
      ((n & e) | (t[a] & e) && (t[a] |= e), (l &= ~n));
    }
  }
  function js(t, e) {
    var l = e & -e;
    return ((l = (l & 42) !== 0 ? 1 : Hi(l)), (l & (t.suspendedLanes | e)) !== 0 ? 0 : l);
  }
  function Hi(t) {
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
  function Bi(t) {
    return ((t &= -t), 2 < t ? (8 < t ? ((t & 134217727) !== 0 ? 32 : 268435456) : 8) : 2);
  }
  function Hs() {
    var t = q.p;
    return t !== 0 ? t : ((t = window.event), t === void 0 ? 32 : _m(t.type));
  }
  function Bs(t, e) {
    var l = q.p;
    try {
      return ((q.p = t), e());
    } finally {
      q.p = l;
    }
  }
  var fl = Math.random().toString(36).slice(2),
    Qt = '__reactFiber$' + fl,
    Pt = '__reactProps$' + fl,
    na = '__reactContainer$' + fl,
    qi = '__reactEvents$' + fl,
    qh = '__reactListeners$' + fl,
    Lh = '__reactHandles$' + fl,
    qs = '__reactResources$' + fl,
    $a = '__reactMarker$' + fl;
  function Li(t) {
    (delete t[Qt], delete t[Pt], delete t[qi], delete t[qh], delete t[Lh]);
  }
  function ua(t) {
    var e = t[Qt];
    if (e) return e;
    for (var l = t.parentNode; l; ) {
      if ((e = l[na] || l[Qt])) {
        if (((l = e.alternate), e.child !== null || (l !== null && l.child !== null)))
          for (t = um(t); t !== null; ) {
            if ((l = t[Qt])) return l;
            t = um(t);
          }
        return e;
      }
      ((t = l), (l = t.parentNode));
    }
    return null;
  }
  function ia(t) {
    if ((t = t[Qt] || t[na])) {
      var e = t.tag;
      if (e === 5 || e === 6 || e === 13 || e === 31 || e === 26 || e === 27 || e === 3) return t;
    }
    return null;
  }
  function Wa(t) {
    var e = t.tag;
    if (e === 5 || e === 26 || e === 27 || e === 6) return t.stateNode;
    throw Error(f(33));
  }
  function ca(t) {
    var e = t[qs];
    return (e || (e = t[qs] = { hoistableStyles: new Map(), hoistableScripts: new Map() }), e);
  }
  function wt(t) {
    t[$a] = !0;
  }
  var Ls = new Set(),
    Ys = {};
  function Ll(t, e) {
    (fa(t, e), fa(t + 'Capture', e));
  }
  function fa(t, e) {
    for (Ys[t] = e, t = 0; t < e.length; t++) Ls.add(e[t]);
  }
  var Yh = RegExp(
      '^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$'
    ),
    Gs = {},
    ws = {};
  function Gh(t) {
    return Di.call(ws, t)
      ? !0
      : Di.call(Gs, t)
        ? !1
        : Yh.test(t)
          ? (ws[t] = !0)
          : ((Gs[t] = !0), !1);
  }
  function uu(t, e, l) {
    if (Gh(e))
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
  function iu(t, e, l) {
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
  function Xe(t, e, l, a) {
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
  function Se(t) {
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
  function Xs(t) {
    var e = t.type;
    return (t = t.nodeName) && t.toLowerCase() === 'input' && (e === 'checkbox' || e === 'radio');
  }
  function wh(t, e, l) {
    var a = Object.getOwnPropertyDescriptor(t.constructor.prototype, e);
    if (
      !t.hasOwnProperty(e) &&
      typeof a < 'u' &&
      typeof a.get == 'function' &&
      typeof a.set == 'function'
    ) {
      var n = a.get,
        u = a.set;
      return (
        Object.defineProperty(t, e, {
          configurable: !0,
          get: function () {
            return n.call(this);
          },
          set: function (c) {
            ((l = '' + c), u.call(this, c));
          },
        }),
        Object.defineProperty(t, e, { enumerable: a.enumerable }),
        {
          getValue: function () {
            return l;
          },
          setValue: function (c) {
            l = '' + c;
          },
          stopTracking: function () {
            ((t._valueTracker = null), delete t[e]);
          },
        }
      );
    }
  }
  function Yi(t) {
    if (!t._valueTracker) {
      var e = Xs(t) ? 'checked' : 'value';
      t._valueTracker = wh(t, e, '' + t[e]);
    }
  }
  function Qs(t) {
    if (!t) return !1;
    var e = t._valueTracker;
    if (!e) return !0;
    var l = e.getValue(),
      a = '';
    return (
      t && (a = Xs(t) ? (t.checked ? 'true' : 'false') : t.value),
      (t = a),
      t !== l ? (e.setValue(t), !0) : !1
    );
  }
  function cu(t) {
    if (((t = t || (typeof document < 'u' ? document : void 0)), typeof t > 'u')) return null;
    try {
      return t.activeElement || t.body;
    } catch {
      return t.body;
    }
  }
  var Xh = /[\n"\\]/g;
  function be(t) {
    return t.replace(Xh, function (e) {
      return '\\' + e.charCodeAt(0).toString(16) + ' ';
    });
  }
  function Gi(t, e, l, a, n, u, c, o) {
    ((t.name = ''),
      c != null && typeof c != 'function' && typeof c != 'symbol' && typeof c != 'boolean'
        ? (t.type = c)
        : t.removeAttribute('type'),
      e != null
        ? c === 'number'
          ? ((e === 0 && t.value === '') || t.value != e) && (t.value = '' + Se(e))
          : t.value !== '' + Se(e) && (t.value = '' + Se(e))
        : (c !== 'submit' && c !== 'reset') || t.removeAttribute('value'),
      e != null
        ? wi(t, c, Se(e))
        : l != null
          ? wi(t, c, Se(l))
          : a != null && t.removeAttribute('value'),
      n == null && u != null && (t.defaultChecked = !!u),
      n != null && (t.checked = n && typeof n != 'function' && typeof n != 'symbol'),
      o != null && typeof o != 'function' && typeof o != 'symbol' && typeof o != 'boolean'
        ? (t.name = '' + Se(o))
        : t.removeAttribute('name'));
  }
  function Zs(t, e, l, a, n, u, c, o) {
    if (
      (u != null &&
        typeof u != 'function' &&
        typeof u != 'symbol' &&
        typeof u != 'boolean' &&
        (t.type = u),
      e != null || l != null)
    ) {
      if (!((u !== 'submit' && u !== 'reset') || e != null)) {
        Yi(t);
        return;
      }
      ((l = l != null ? '' + Se(l) : ''),
        (e = e != null ? '' + Se(e) : l),
        o || e === t.value || (t.value = e),
        (t.defaultValue = e));
    }
    ((a = a ?? n),
      (a = typeof a != 'function' && typeof a != 'symbol' && !!a),
      (t.checked = o ? t.checked : !!a),
      (t.defaultChecked = !!a),
      c != null &&
        typeof c != 'function' &&
        typeof c != 'symbol' &&
        typeof c != 'boolean' &&
        (t.name = c),
      Yi(t));
  }
  function wi(t, e, l) {
    (e === 'number' && cu(t.ownerDocument) === t) ||
      t.defaultValue === '' + l ||
      (t.defaultValue = '' + l);
  }
  function sa(t, e, l, a) {
    if (((t = t.options), e)) {
      e = {};
      for (var n = 0; n < l.length; n++) e['$' + l[n]] = !0;
      for (l = 0; l < t.length; l++)
        ((n = e.hasOwnProperty('$' + t[l].value)),
          t[l].selected !== n && (t[l].selected = n),
          n && a && (t[l].defaultSelected = !0));
    } else {
      for (l = '' + Se(l), e = null, n = 0; n < t.length; n++) {
        if (t[n].value === l) {
          ((t[n].selected = !0), a && (t[n].defaultSelected = !0));
          return;
        }
        e !== null || t[n].disabled || (e = t[n]);
      }
      e !== null && (e.selected = !0);
    }
  }
  function Vs(t, e, l) {
    if (e != null && ((e = '' + Se(e)), e !== t.value && (t.value = e), l == null)) {
      t.defaultValue !== e && (t.defaultValue = e);
      return;
    }
    t.defaultValue = l != null ? '' + Se(l) : '';
  }
  function Ks(t, e, l, a) {
    if (e == null) {
      if (a != null) {
        if (l != null) throw Error(f(92));
        if (jt(a)) {
          if (1 < a.length) throw Error(f(93));
          a = a[0];
        }
        l = a;
      }
      (l == null && (l = ''), (e = l));
    }
    ((l = Se(e)),
      (t.defaultValue = l),
      (a = t.textContent),
      a === l && a !== '' && a !== null && (t.value = a),
      Yi(t));
  }
  function ra(t, e) {
    if (e) {
      var l = t.firstChild;
      if (l && l === t.lastChild && l.nodeType === 3) {
        l.nodeValue = e;
        return;
      }
    }
    t.textContent = e;
  }
  var Qh = new Set(
    'animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp'.split(
      ' '
    )
  );
  function ks(t, e, l) {
    var a = e.indexOf('--') === 0;
    l == null || typeof l == 'boolean' || l === ''
      ? a
        ? t.setProperty(e, '')
        : e === 'float'
          ? (t.cssFloat = '')
          : (t[e] = '')
      : a
        ? t.setProperty(e, l)
        : typeof l != 'number' || l === 0 || Qh.has(e)
          ? e === 'float'
            ? (t.cssFloat = l)
            : (t[e] = ('' + l).trim())
          : (t[e] = l + 'px');
  }
  function Js(t, e, l) {
    if (e != null && typeof e != 'object') throw Error(f(62));
    if (((t = t.style), l != null)) {
      for (var a in l)
        !l.hasOwnProperty(a) ||
          (e != null && e.hasOwnProperty(a)) ||
          (a.indexOf('--') === 0
            ? t.setProperty(a, '')
            : a === 'float'
              ? (t.cssFloat = '')
              : (t[a] = ''));
      for (var n in e) ((a = e[n]), e.hasOwnProperty(n) && l[n] !== a && ks(t, n, a));
    } else for (var u in e) e.hasOwnProperty(u) && ks(t, u, e[u]);
  }
  function Xi(t) {
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
  var Zh = new Map([
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
    Vh =
      /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function fu(t) {
    return Vh.test('' + t)
      ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')"
      : t;
  }
  function Qe() {}
  var Qi = null;
  function Zi(t) {
    return (
      (t = t.target || t.srcElement || window),
      t.correspondingUseElement && (t = t.correspondingUseElement),
      t.nodeType === 3 ? t.parentNode : t
    );
  }
  var oa = null,
    da = null;
  function $s(t) {
    var e = ia(t);
    if (e && (t = e.stateNode)) {
      var l = t[Pt] || null;
      t: switch (((t = e.stateNode), e.type)) {
        case 'input':
          if (
            (Gi(
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
              l = l.querySelectorAll('input[name="' + be('' + e) + '"][type="radio"]'), e = 0;
              e < l.length;
              e++
            ) {
              var a = l[e];
              if (a !== t && a.form === t.form) {
                var n = a[Pt] || null;
                if (!n) throw Error(f(90));
                Gi(
                  a,
                  n.value,
                  n.defaultValue,
                  n.defaultValue,
                  n.checked,
                  n.defaultChecked,
                  n.type,
                  n.name
                );
              }
            }
            for (e = 0; e < l.length; e++) ((a = l[e]), a.form === t.form && Qs(a));
          }
          break t;
        case 'textarea':
          Vs(t, l.value, l.defaultValue);
          break t;
        case 'select':
          ((e = l.value), e != null && sa(t, !!l.multiple, e, !1));
      }
    }
  }
  var Vi = !1;
  function Ws(t, e, l) {
    if (Vi) return t(e, l);
    Vi = !0;
    try {
      var a = t(e);
      return a;
    } finally {
      if (
        ((Vi = !1),
        (oa !== null || da !== null) &&
          ($u(), oa && ((e = oa), (t = da), (da = oa = null), $s(e), t)))
      )
        for (e = 0; e < t.length; e++) $s(t[e]);
    }
  }
  function Fa(t, e) {
    var l = t.stateNode;
    if (l === null) return null;
    var a = l[Pt] || null;
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
    if (l && typeof l != 'function') throw Error(f(231, e, typeof l));
    return l;
  }
  var Ze = !(
      typeof window > 'u' ||
      typeof window.document > 'u' ||
      typeof window.document.createElement > 'u'
    ),
    Ki = !1;
  if (Ze)
    try {
      var Ia = {};
      (Object.defineProperty(Ia, 'passive', {
        get: function () {
          Ki = !0;
        },
      }),
        window.addEventListener('test', Ia, Ia),
        window.removeEventListener('test', Ia, Ia));
    } catch {
      Ki = !1;
    }
  var sl = null,
    ki = null,
    su = null;
  function Fs() {
    if (su) return su;
    var t,
      e = ki,
      l = e.length,
      a,
      n = 'value' in sl ? sl.value : sl.textContent,
      u = n.length;
    for (t = 0; t < l && e[t] === n[t]; t++);
    var c = l - t;
    for (a = 1; a <= c && e[l - a] === n[u - a]; a++);
    return (su = n.slice(t, 1 < a ? 1 - a : void 0));
  }
  function ru(t) {
    var e = t.keyCode;
    return (
      'charCode' in t ? ((t = t.charCode), t === 0 && e === 13 && (t = 13)) : (t = e),
      t === 10 && (t = 13),
      32 <= t || t === 13 ? t : 0
    );
  }
  function ou() {
    return !0;
  }
  function Is() {
    return !1;
  }
  function te(t) {
    function e(l, a, n, u, c) {
      ((this._reactName = l),
        (this._targetInst = n),
        (this.type = a),
        (this.nativeEvent = u),
        (this.target = c),
        (this.currentTarget = null));
      for (var o in t) t.hasOwnProperty(o) && ((l = t[o]), (this[o] = l ? l(u) : u[o]));
      return (
        (this.isDefaultPrevented = (
          u.defaultPrevented != null ? u.defaultPrevented : u.returnValue === !1
        )
          ? ou
          : Is),
        (this.isPropagationStopped = Is),
        this
      );
    }
    return (
      T(e.prototype, {
        preventDefault: function () {
          this.defaultPrevented = !0;
          var l = this.nativeEvent;
          l &&
            (l.preventDefault
              ? l.preventDefault()
              : typeof l.returnValue != 'unknown' && (l.returnValue = !1),
            (this.isDefaultPrevented = ou));
        },
        stopPropagation: function () {
          var l = this.nativeEvent;
          l &&
            (l.stopPropagation
              ? l.stopPropagation()
              : typeof l.cancelBubble != 'unknown' && (l.cancelBubble = !0),
            (this.isPropagationStopped = ou));
        },
        persist: function () {},
        isPersistent: ou,
      }),
      e
    );
  }
  var Yl = {
      eventPhase: 0,
      bubbles: 0,
      cancelable: 0,
      timeStamp: function (t) {
        return t.timeStamp || Date.now();
      },
      defaultPrevented: 0,
      isTrusted: 0,
    },
    du = te(Yl),
    Pa = T({}, Yl, { view: 0, detail: 0 }),
    Kh = te(Pa),
    Ji,
    $i,
    tn,
    mu = T({}, Pa, {
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
      getModifierState: Fi,
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
          : (t !== tn &&
              (tn && t.type === 'mousemove'
                ? ((Ji = t.screenX - tn.screenX), ($i = t.screenY - tn.screenY))
                : ($i = Ji = 0),
              (tn = t)),
            Ji);
      },
      movementY: function (t) {
        return 'movementY' in t ? t.movementY : $i;
      },
    }),
    Ps = te(mu),
    kh = T({}, mu, { dataTransfer: 0 }),
    Jh = te(kh),
    $h = T({}, Pa, { relatedTarget: 0 }),
    Wi = te($h),
    Wh = T({}, Yl, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
    Fh = te(Wh),
    Ih = T({}, Yl, {
      clipboardData: function (t) {
        return 'clipboardData' in t ? t.clipboardData : window.clipboardData;
      },
    }),
    Ph = te(Ih),
    ty = T({}, Yl, { data: 0 }),
    tr = te(ty),
    ey = {
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
    ly = {
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
    ay = { Alt: 'altKey', Control: 'ctrlKey', Meta: 'metaKey', Shift: 'shiftKey' };
  function ny(t) {
    var e = this.nativeEvent;
    return e.getModifierState ? e.getModifierState(t) : (t = ay[t]) ? !!e[t] : !1;
  }
  function Fi() {
    return ny;
  }
  var uy = T({}, Pa, {
      key: function (t) {
        if (t.key) {
          var e = ey[t.key] || t.key;
          if (e !== 'Unidentified') return e;
        }
        return t.type === 'keypress'
          ? ((t = ru(t)), t === 13 ? 'Enter' : String.fromCharCode(t))
          : t.type === 'keydown' || t.type === 'keyup'
            ? ly[t.keyCode] || 'Unidentified'
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
      getModifierState: Fi,
      charCode: function (t) {
        return t.type === 'keypress' ? ru(t) : 0;
      },
      keyCode: function (t) {
        return t.type === 'keydown' || t.type === 'keyup' ? t.keyCode : 0;
      },
      which: function (t) {
        return t.type === 'keypress'
          ? ru(t)
          : t.type === 'keydown' || t.type === 'keyup'
            ? t.keyCode
            : 0;
      },
    }),
    iy = te(uy),
    cy = T({}, mu, {
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
    er = te(cy),
    fy = T({}, Pa, {
      touches: 0,
      targetTouches: 0,
      changedTouches: 0,
      altKey: 0,
      metaKey: 0,
      ctrlKey: 0,
      shiftKey: 0,
      getModifierState: Fi,
    }),
    sy = te(fy),
    ry = T({}, Yl, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
    oy = te(ry),
    dy = T({}, mu, {
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
    my = te(dy),
    hy = T({}, Yl, { newState: 0, oldState: 0 }),
    yy = te(hy),
    vy = [9, 13, 27, 32],
    Ii = Ze && 'CompositionEvent' in window,
    en = null;
  Ze && 'documentMode' in document && (en = document.documentMode);
  var py = Ze && 'TextEvent' in window && !en,
    lr = Ze && (!Ii || (en && 8 < en && 11 >= en)),
    ar = ' ',
    nr = !1;
  function ur(t, e) {
    switch (t) {
      case 'keyup':
        return vy.indexOf(e.keyCode) !== -1;
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
  function ir(t) {
    return ((t = t.detail), typeof t == 'object' && 'data' in t ? t.data : null);
  }
  var ma = !1;
  function gy(t, e) {
    switch (t) {
      case 'compositionend':
        return ir(e);
      case 'keypress':
        return e.which !== 32 ? null : ((nr = !0), ar);
      case 'textInput':
        return ((t = e.data), t === ar && nr ? null : t);
      default:
        return null;
    }
  }
  function Sy(t, e) {
    if (ma)
      return t === 'compositionend' || (!Ii && ur(t, e))
        ? ((t = Fs()), (su = ki = sl = null), (ma = !1), t)
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
        return lr && e.locale !== 'ko' ? null : e.data;
      default:
        return null;
    }
  }
  var by = {
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
  function cr(t) {
    var e = t && t.nodeName && t.nodeName.toLowerCase();
    return e === 'input' ? !!by[t.type] : e === 'textarea';
  }
  function fr(t, e, l, a) {
    (oa ? (da ? da.push(a) : (da = [a])) : (oa = a),
      (e = li(e, 'onChange')),
      0 < e.length &&
        ((l = new du('onChange', 'change', null, l, a)), t.push({ event: l, listeners: e })));
  }
  var ln = null,
    an = null;
  function _y(t) {
    Vd(t, 0);
  }
  function hu(t) {
    var e = Wa(t);
    if (Qs(e)) return t;
  }
  function sr(t, e) {
    if (t === 'change') return e;
  }
  var rr = !1;
  if (Ze) {
    var Pi;
    if (Ze) {
      var tc = 'oninput' in document;
      if (!tc) {
        var or = document.createElement('div');
        (or.setAttribute('oninput', 'return;'), (tc = typeof or.oninput == 'function'));
      }
      Pi = tc;
    } else Pi = !1;
    rr = Pi && (!document.documentMode || 9 < document.documentMode);
  }
  function dr() {
    ln && (ln.detachEvent('onpropertychange', mr), (an = ln = null));
  }
  function mr(t) {
    if (t.propertyName === 'value' && hu(an)) {
      var e = [];
      (fr(e, an, t, Zi(t)), Ws(_y, e));
    }
  }
  function Ey(t, e, l) {
    t === 'focusin'
      ? (dr(), (ln = e), (an = l), ln.attachEvent('onpropertychange', mr))
      : t === 'focusout' && dr();
  }
  function Ty(t) {
    if (t === 'selectionchange' || t === 'keyup' || t === 'keydown') return hu(an);
  }
  function Ay(t, e) {
    if (t === 'click') return hu(e);
  }
  function zy(t, e) {
    if (t === 'input' || t === 'change') return hu(e);
  }
  function Ry(t, e) {
    return (t === e && (t !== 0 || 1 / t === 1 / e)) || (t !== t && e !== e);
  }
  var se = typeof Object.is == 'function' ? Object.is : Ry;
  function nn(t, e) {
    if (se(t, e)) return !0;
    if (typeof t != 'object' || t === null || typeof e != 'object' || e === null) return !1;
    var l = Object.keys(t),
      a = Object.keys(e);
    if (l.length !== a.length) return !1;
    for (a = 0; a < l.length; a++) {
      var n = l[a];
      if (!Di.call(e, n) || !se(t[n], e[n])) return !1;
    }
    return !0;
  }
  function hr(t) {
    for (; t && t.firstChild; ) t = t.firstChild;
    return t;
  }
  function yr(t, e) {
    var l = hr(t);
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
      l = hr(l);
    }
  }
  function vr(t, e) {
    return t && e
      ? t === e
        ? !0
        : t && t.nodeType === 3
          ? !1
          : e && e.nodeType === 3
            ? vr(t, e.parentNode)
            : 'contains' in t
              ? t.contains(e)
              : t.compareDocumentPosition
                ? !!(t.compareDocumentPosition(e) & 16)
                : !1
      : !1;
  }
  function pr(t) {
    t =
      t != null && t.ownerDocument != null && t.ownerDocument.defaultView != null
        ? t.ownerDocument.defaultView
        : window;
    for (var e = cu(t.document); e instanceof t.HTMLIFrameElement; ) {
      try {
        var l = typeof e.contentWindow.location.href == 'string';
      } catch {
        l = !1;
      }
      if (l) t = e.contentWindow;
      else break;
      e = cu(t.document);
    }
    return e;
  }
  function ec(t) {
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
  var xy = Ze && 'documentMode' in document && 11 >= document.documentMode,
    ha = null,
    lc = null,
    un = null,
    ac = !1;
  function gr(t, e, l) {
    var a = l.window === l ? l.document : l.nodeType === 9 ? l : l.ownerDocument;
    ac ||
      ha == null ||
      ha !== cu(a) ||
      ((a = ha),
      'selectionStart' in a && ec(a)
        ? (a = { start: a.selectionStart, end: a.selectionEnd })
        : ((a = ((a.ownerDocument && a.ownerDocument.defaultView) || window).getSelection()),
          (a = {
            anchorNode: a.anchorNode,
            anchorOffset: a.anchorOffset,
            focusNode: a.focusNode,
            focusOffset: a.focusOffset,
          })),
      (un && nn(un, a)) ||
        ((un = a),
        (a = li(lc, 'onSelect')),
        0 < a.length &&
          ((e = new du('onSelect', 'select', null, e, l)),
          t.push({ event: e, listeners: a }),
          (e.target = ha))));
  }
  function Gl(t, e) {
    var l = {};
    return (
      (l[t.toLowerCase()] = e.toLowerCase()),
      (l['Webkit' + t] = 'webkit' + e),
      (l['Moz' + t] = 'moz' + e),
      l
    );
  }
  var ya = {
      animationend: Gl('Animation', 'AnimationEnd'),
      animationiteration: Gl('Animation', 'AnimationIteration'),
      animationstart: Gl('Animation', 'AnimationStart'),
      transitionrun: Gl('Transition', 'TransitionRun'),
      transitionstart: Gl('Transition', 'TransitionStart'),
      transitioncancel: Gl('Transition', 'TransitionCancel'),
      transitionend: Gl('Transition', 'TransitionEnd'),
    },
    nc = {},
    Sr = {};
  Ze &&
    ((Sr = document.createElement('div').style),
    'AnimationEvent' in window ||
      (delete ya.animationend.animation,
      delete ya.animationiteration.animation,
      delete ya.animationstart.animation),
    'TransitionEvent' in window || delete ya.transitionend.transition);
  function wl(t) {
    if (nc[t]) return nc[t];
    if (!ya[t]) return t;
    var e = ya[t],
      l;
    for (l in e) if (e.hasOwnProperty(l) && l in Sr) return (nc[t] = e[l]);
    return t;
  }
  var br = wl('animationend'),
    _r = wl('animationiteration'),
    Er = wl('animationstart'),
    Oy = wl('transitionrun'),
    My = wl('transitionstart'),
    Cy = wl('transitioncancel'),
    Tr = wl('transitionend'),
    Ar = new Map(),
    uc =
      'abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel'.split(
        ' '
      );
  uc.push('scrollEnd');
  function Me(t, e) {
    (Ar.set(t, e), Ll(e, [t]));
  }
  var yu =
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
    _e = [],
    va = 0,
    ic = 0;
  function vu() {
    for (var t = va, e = (ic = va = 0); e < t; ) {
      var l = _e[e];
      _e[e++] = null;
      var a = _e[e];
      _e[e++] = null;
      var n = _e[e];
      _e[e++] = null;
      var u = _e[e];
      if (((_e[e++] = null), a !== null && n !== null)) {
        var c = a.pending;
        (c === null ? (n.next = n) : ((n.next = c.next), (c.next = n)), (a.pending = n));
      }
      u !== 0 && zr(l, n, u);
    }
  }
  function pu(t, e, l, a) {
    ((_e[va++] = t),
      (_e[va++] = e),
      (_e[va++] = l),
      (_e[va++] = a),
      (ic |= a),
      (t.lanes |= a),
      (t = t.alternate),
      t !== null && (t.lanes |= a));
  }
  function cc(t, e, l, a) {
    return (pu(t, e, l, a), gu(t));
  }
  function Xl(t, e) {
    return (pu(t, null, null, e), gu(t));
  }
  function zr(t, e, l) {
    t.lanes |= l;
    var a = t.alternate;
    a !== null && (a.lanes |= l);
    for (var n = !1, u = t.return; u !== null; )
      ((u.childLanes |= l),
        (a = u.alternate),
        a !== null && (a.childLanes |= l),
        u.tag === 22 && ((t = u.stateNode), t === null || t._visibility & 1 || (n = !0)),
        (t = u),
        (u = u.return));
    return t.tag === 3
      ? ((u = t.stateNode),
        n &&
          e !== null &&
          ((n = 31 - fe(l)),
          (t = u.hiddenUpdates),
          (a = t[n]),
          a === null ? (t[n] = [e]) : a.push(e),
          (e.lane = l | 536870912)),
        u)
      : null;
  }
  function gu(t) {
    if (50 < On) throw ((On = 0), (pf = null), Error(f(185)));
    for (var e = t.return; e !== null; ) ((t = e), (e = t.return));
    return t.tag === 3 ? t.stateNode : null;
  }
  var pa = {};
  function Dy(t, e, l, a) {
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
  function re(t, e, l, a) {
    return new Dy(t, e, l, a);
  }
  function fc(t) {
    return ((t = t.prototype), !(!t || !t.isReactComponent));
  }
  function Ve(t, e) {
    var l = t.alternate;
    return (
      l === null
        ? ((l = re(t.tag, e, t.key, t.mode)),
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
  function Rr(t, e) {
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
  function Su(t, e, l, a, n, u) {
    var c = 0;
    if (((a = t), typeof t == 'function')) fc(t) && (c = 1);
    else if (typeof t == 'string')
      c = Bv(t, l, Q.current) ? 26 : t === 'html' || t === 'head' || t === 'body' ? 27 : 5;
    else
      t: switch (t) {
        case Jt:
          return ((t = re(31, l, e, n)), (t.elementType = Jt), (t.lanes = u), t);
        case L:
          return Ql(l.children, n, u, e);
        case w:
          ((c = 8), (n |= 24));
          break;
        case B:
          return ((t = re(12, l, e, n | 2)), (t.elementType = B), (t.lanes = u), t);
        case dt:
          return ((t = re(13, l, e, n)), (t.elementType = dt), (t.lanes = u), t);
        case Et:
          return ((t = re(19, l, e, n)), (t.elementType = Et), (t.lanes = u), t);
        default:
          if (typeof t == 'object' && t !== null)
            switch (t.$$typeof) {
              case k:
                c = 10;
                break t;
              case W:
                c = 9;
                break t;
              case yt:
                c = 11;
                break t;
              case F:
                c = 14;
                break t;
              case Ct:
                ((c = 16), (a = null));
                break t;
            }
          ((c = 29), (l = Error(f(130, t === null ? 'null' : typeof t, ''))), (a = null));
      }
    return ((e = re(c, l, e, n)), (e.elementType = t), (e.type = a), (e.lanes = u), e);
  }
  function Ql(t, e, l, a) {
    return ((t = re(7, t, a, e)), (t.lanes = l), t);
  }
  function sc(t, e, l) {
    return ((t = re(6, t, null, e)), (t.lanes = l), t);
  }
  function xr(t) {
    var e = re(18, null, null, 0);
    return ((e.stateNode = t), e);
  }
  function rc(t, e, l) {
    return (
      (e = re(4, t.children !== null ? t.children : [], t.key, e)),
      (e.lanes = l),
      (e.stateNode = {
        containerInfo: t.containerInfo,
        pendingChildren: null,
        implementation: t.implementation,
      }),
      e
    );
  }
  var Or = new WeakMap();
  function Ee(t, e) {
    if (typeof t == 'object' && t !== null) {
      var l = Or.get(t);
      return l !== void 0 ? l : ((e = { value: t, source: e, stack: xs(e) }), Or.set(t, e), e);
    }
    return { value: t, source: e, stack: xs(e) };
  }
  var ga = [],
    Sa = 0,
    bu = null,
    cn = 0,
    Te = [],
    Ae = 0,
    rl = null,
    Be = 1,
    qe = '';
  function Ke(t, e) {
    ((ga[Sa++] = cn), (ga[Sa++] = bu), (bu = t), (cn = e));
  }
  function Mr(t, e, l) {
    ((Te[Ae++] = Be), (Te[Ae++] = qe), (Te[Ae++] = rl), (rl = t));
    var a = Be;
    t = qe;
    var n = 32 - fe(a) - 1;
    ((a &= ~(1 << n)), (l += 1));
    var u = 32 - fe(e) + n;
    if (30 < u) {
      var c = n - (n % 5);
      ((u = (a & ((1 << c) - 1)).toString(32)),
        (a >>= c),
        (n -= c),
        (Be = (1 << (32 - fe(e) + n)) | (l << n) | a),
        (qe = u + t));
    } else ((Be = (1 << u) | (l << n) | a), (qe = t));
  }
  function oc(t) {
    t.return !== null && (Ke(t, 1), Mr(t, 1, 0));
  }
  function dc(t) {
    for (; t === bu; ) ((bu = ga[--Sa]), (ga[Sa] = null), (cn = ga[--Sa]), (ga[Sa] = null));
    for (; t === rl; )
      ((rl = Te[--Ae]),
        (Te[Ae] = null),
        (qe = Te[--Ae]),
        (Te[Ae] = null),
        (Be = Te[--Ae]),
        (Te[Ae] = null));
  }
  function Cr(t, e) {
    ((Te[Ae++] = Be), (Te[Ae++] = qe), (Te[Ae++] = rl), (Be = e.id), (qe = e.overflow), (rl = t));
  }
  var Zt = null,
    Tt = null,
    ct = !1,
    ol = null,
    ze = !1,
    mc = Error(f(519));
  function dl(t) {
    var e = Error(
      f(418, 1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? 'text' : 'HTML', '')
    );
    throw (fn(Ee(e, t)), mc);
  }
  function Dr(t) {
    var e = t.stateNode,
      l = t.type,
      a = t.memoizedProps;
    switch (((e[Qt] = t), (e[Pt] = a), l)) {
      case 'dialog':
        (nt('cancel', e), nt('close', e));
        break;
      case 'iframe':
      case 'object':
      case 'embed':
        nt('load', e);
        break;
      case 'video':
      case 'audio':
        for (l = 0; l < Cn.length; l++) nt(Cn[l], e);
        break;
      case 'source':
        nt('error', e);
        break;
      case 'img':
      case 'image':
      case 'link':
        (nt('error', e), nt('load', e));
        break;
      case 'details':
        nt('toggle', e);
        break;
      case 'input':
        (nt('invalid', e),
          Zs(e, a.value, a.defaultValue, a.checked, a.defaultChecked, a.type, a.name, !0));
        break;
      case 'select':
        nt('invalid', e);
        break;
      case 'textarea':
        (nt('invalid', e), Ks(e, a.value, a.defaultValue, a.children));
    }
    ((l = a.children),
      (typeof l != 'string' && typeof l != 'number' && typeof l != 'bigint') ||
      e.textContent === '' + l ||
      a.suppressHydrationWarning === !0 ||
      $d(e.textContent, l)
        ? (a.popover != null && (nt('beforetoggle', e), nt('toggle', e)),
          a.onScroll != null && nt('scroll', e),
          a.onScrollEnd != null && nt('scrollend', e),
          a.onClick != null && (e.onclick = Qe),
          (e = !0))
        : (e = !1),
      e || dl(t, !0));
  }
  function Nr(t) {
    for (Zt = t.return; Zt; )
      switch (Zt.tag) {
        case 5:
        case 31:
        case 13:
          ze = !1;
          return;
        case 27:
        case 3:
          ze = !0;
          return;
        default:
          Zt = Zt.return;
      }
  }
  function ba(t) {
    if (t !== Zt) return !1;
    if (!ct) return (Nr(t), (ct = !0), !1);
    var e = t.tag,
      l;
    if (
      ((l = e !== 3 && e !== 27) &&
        ((l = e === 5) &&
          ((l = t.type), (l = !(l !== 'form' && l !== 'button') || Nf(t.type, t.memoizedProps))),
        (l = !l)),
      l && Tt && dl(t),
      Nr(t),
      e === 13)
    ) {
      if (((t = t.memoizedState), (t = t !== null ? t.dehydrated : null), !t)) throw Error(f(317));
      Tt = nm(t);
    } else if (e === 31) {
      if (((t = t.memoizedState), (t = t !== null ? t.dehydrated : null), !t)) throw Error(f(317));
      Tt = nm(t);
    } else
      e === 27
        ? ((e = Tt), Rl(t.type) ? ((t = qf), (qf = null), (Tt = t)) : (Tt = e))
        : (Tt = Zt ? xe(t.stateNode.nextSibling) : null);
    return !0;
  }
  function Zl() {
    ((Tt = Zt = null), (ct = !1));
  }
  function hc() {
    var t = ol;
    return (t !== null && (ne === null ? (ne = t) : ne.push.apply(ne, t), (ol = null)), t);
  }
  function fn(t) {
    ol === null ? (ol = [t]) : ol.push(t);
  }
  var yc = S(null),
    Vl = null,
    ke = null;
  function ml(t, e, l) {
    (Y(yc, e._currentValue), (e._currentValue = l));
  }
  function Je(t) {
    ((t._currentValue = yc.current), H(yc));
  }
  function vc(t, e, l) {
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
  function pc(t, e, l, a) {
    var n = t.child;
    for (n !== null && (n.return = t); n !== null; ) {
      var u = n.dependencies;
      if (u !== null) {
        var c = n.child;
        u = u.firstContext;
        t: for (; u !== null; ) {
          var o = u;
          u = n;
          for (var h = 0; h < e.length; h++)
            if (o.context === e[h]) {
              ((u.lanes |= l),
                (o = u.alternate),
                o !== null && (o.lanes |= l),
                vc(u.return, l, t),
                a || (c = null));
              break t;
            }
          u = o.next;
        }
      } else if (n.tag === 18) {
        if (((c = n.return), c === null)) throw Error(f(341));
        ((c.lanes |= l), (u = c.alternate), u !== null && (u.lanes |= l), vc(c, l, t), (c = null));
      } else c = n.child;
      if (c !== null) c.return = n;
      else
        for (c = n; c !== null; ) {
          if (c === t) {
            c = null;
            break;
          }
          if (((n = c.sibling), n !== null)) {
            ((n.return = c.return), (c = n));
            break;
          }
          c = c.return;
        }
      n = c;
    }
  }
  function _a(t, e, l, a) {
    t = null;
    for (var n = e, u = !1; n !== null; ) {
      if (!u) {
        if ((n.flags & 524288) !== 0) u = !0;
        else if ((n.flags & 262144) !== 0) break;
      }
      if (n.tag === 10) {
        var c = n.alternate;
        if (c === null) throw Error(f(387));
        if (((c = c.memoizedProps), c !== null)) {
          var o = n.type;
          se(n.pendingProps.value, c.value) || (t !== null ? t.push(o) : (t = [o]));
        }
      } else if (n === ot.current) {
        if (((c = n.alternate), c === null)) throw Error(f(387));
        c.memoizedState.memoizedState !== n.memoizedState.memoizedState &&
          (t !== null ? t.push(Hn) : (t = [Hn]));
      }
      n = n.return;
    }
    (t !== null && pc(e, t, l, a), (e.flags |= 262144));
  }
  function _u(t) {
    for (t = t.firstContext; t !== null; ) {
      if (!se(t.context._currentValue, t.memoizedValue)) return !0;
      t = t.next;
    }
    return !1;
  }
  function Kl(t) {
    ((Vl = t), (ke = null), (t = t.dependencies), t !== null && (t.firstContext = null));
  }
  function Vt(t) {
    return Ur(Vl, t);
  }
  function Eu(t, e) {
    return (Vl === null && Kl(t), Ur(t, e));
  }
  function Ur(t, e) {
    var l = e._currentValue;
    if (((e = { context: e, memoizedValue: l, next: null }), ke === null)) {
      if (t === null) throw Error(f(308));
      ((ke = e), (t.dependencies = { lanes: 0, firstContext: e }), (t.flags |= 524288));
    } else ke = ke.next = e;
    return l;
  }
  var Ny =
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
    Uy = i.unstable_scheduleCallback,
    jy = i.unstable_NormalPriority,
    Ht = {
      $$typeof: k,
      Consumer: null,
      Provider: null,
      _currentValue: null,
      _currentValue2: null,
      _threadCount: 0,
    };
  function gc() {
    return { controller: new Ny(), data: new Map(), refCount: 0 };
  }
  function sn(t) {
    (t.refCount--,
      t.refCount === 0 &&
        Uy(jy, function () {
          t.controller.abort();
        }));
  }
  var rn = null,
    Sc = 0,
    Ea = 0,
    Ta = null;
  function Hy(t, e) {
    if (rn === null) {
      var l = (rn = []);
      ((Sc = 0),
        (Ea = Tf()),
        (Ta = {
          status: 'pending',
          value: void 0,
          then: function (a) {
            l.push(a);
          },
        }));
    }
    return (Sc++, e.then(jr, jr), e);
  }
  function jr() {
    if (--Sc === 0 && rn !== null) {
      Ta !== null && (Ta.status = 'fulfilled');
      var t = rn;
      ((rn = null), (Ea = 0), (Ta = null));
      for (var e = 0; e < t.length; e++) (0, t[e])();
    }
  }
  function By(t, e) {
    var l = [],
      a = {
        status: 'pending',
        value: null,
        reason: null,
        then: function (n) {
          l.push(n);
        },
      };
    return (
      t.then(
        function () {
          ((a.status = 'fulfilled'), (a.value = e));
          for (var n = 0; n < l.length; n++) (0, l[n])(e);
        },
        function (n) {
          for (a.status = 'rejected', a.reason = n, n = 0; n < l.length; n++) (0, l[n])(void 0);
        }
      ),
      a
    );
  }
  var Hr = D.S;
  D.S = function (t, e) {
    ((Sd = ie()),
      typeof e == 'object' && e !== null && typeof e.then == 'function' && Hy(t, e),
      Hr !== null && Hr(t, e));
  };
  var kl = S(null);
  function bc() {
    var t = kl.current;
    return t !== null ? t : _t.pooledCache;
  }
  function Tu(t, e) {
    e === null ? Y(kl, kl.current) : Y(kl, e.pool);
  }
  function Br() {
    var t = bc();
    return t === null ? null : { parent: Ht._currentValue, pool: t };
  }
  var Aa = Error(f(460)),
    _c = Error(f(474)),
    Au = Error(f(542)),
    zu = { then: function () {} };
  function qr(t) {
    return ((t = t.status), t === 'fulfilled' || t === 'rejected');
  }
  function Lr(t, e, l) {
    switch (
      ((l = t[l]), l === void 0 ? t.push(e) : l !== e && (e.then(Qe, Qe), (e = l)), e.status)
    ) {
      case 'fulfilled':
        return e.value;
      case 'rejected':
        throw ((t = e.reason), Gr(t), t);
      default:
        if (typeof e.status == 'string') e.then(Qe, Qe);
        else {
          if (((t = _t), t !== null && 100 < t.shellSuspendCounter)) throw Error(f(482));
          ((t = e),
            (t.status = 'pending'),
            t.then(
              function (a) {
                if (e.status === 'pending') {
                  var n = e;
                  ((n.status = 'fulfilled'), (n.value = a));
                }
              },
              function (a) {
                if (e.status === 'pending') {
                  var n = e;
                  ((n.status = 'rejected'), (n.reason = a));
                }
              }
            ));
        }
        switch (e.status) {
          case 'fulfilled':
            return e.value;
          case 'rejected':
            throw ((t = e.reason), Gr(t), t);
        }
        throw (($l = e), Aa);
    }
  }
  function Jl(t) {
    try {
      var e = t._init;
      return e(t._payload);
    } catch (l) {
      throw l !== null && typeof l == 'object' && typeof l.then == 'function' ? (($l = l), Aa) : l;
    }
  }
  var $l = null;
  function Yr() {
    if ($l === null) throw Error(f(459));
    var t = $l;
    return (($l = null), t);
  }
  function Gr(t) {
    if (t === Aa || t === Au) throw Error(f(483));
  }
  var za = null,
    on = 0;
  function Ru(t) {
    var e = on;
    return ((on += 1), za === null && (za = []), Lr(za, t, e));
  }
  function dn(t, e) {
    ((e = e.props.ref), (t.ref = e !== void 0 ? e : null));
  }
  function xu(t, e) {
    throw e.$$typeof === U
      ? Error(f(525))
      : ((t = Object.prototype.toString.call(e)),
        Error(
          f(
            31,
            t === '[object Object]' ? 'object with keys {' + Object.keys(e).join(', ') + '}' : t
          )
        ));
  }
  function wr(t) {
    function e(b, v) {
      if (t) {
        var _ = b.deletions;
        _ === null ? ((b.deletions = [v]), (b.flags |= 16)) : _.push(v);
      }
    }
    function l(b, v) {
      if (!t) return null;
      for (; v !== null; ) (e(b, v), (v = v.sibling));
      return null;
    }
    function a(b) {
      for (var v = new Map(); b !== null; )
        (b.key !== null ? v.set(b.key, b) : v.set(b.index, b), (b = b.sibling));
      return v;
    }
    function n(b, v) {
      return ((b = Ve(b, v)), (b.index = 0), (b.sibling = null), b);
    }
    function u(b, v, _) {
      return (
        (b.index = _),
        t
          ? ((_ = b.alternate),
            _ !== null
              ? ((_ = _.index), _ < v ? ((b.flags |= 67108866), v) : _)
              : ((b.flags |= 67108866), v))
          : ((b.flags |= 1048576), v)
      );
    }
    function c(b) {
      return (t && b.alternate === null && (b.flags |= 67108866), b);
    }
    function o(b, v, _, N) {
      return v === null || v.tag !== 6
        ? ((v = sc(_, b.mode, N)), (v.return = b), v)
        : ((v = n(v, _)), (v.return = b), v);
    }
    function h(b, v, _, N) {
      var K = _.type;
      return K === L
        ? C(b, v, _.props.children, N, _.key)
        : v !== null &&
            (v.elementType === K ||
              (typeof K == 'object' && K !== null && K.$$typeof === Ct && Jl(K) === v.type))
          ? ((v = n(v, _.props)), dn(v, _), (v.return = b), v)
          : ((v = Su(_.type, _.key, _.props, null, b.mode, N)), dn(v, _), (v.return = b), v);
    }
    function E(b, v, _, N) {
      return v === null ||
        v.tag !== 4 ||
        v.stateNode.containerInfo !== _.containerInfo ||
        v.stateNode.implementation !== _.implementation
        ? ((v = rc(_, b.mode, N)), (v.return = b), v)
        : ((v = n(v, _.children || [])), (v.return = b), v);
    }
    function C(b, v, _, N, K) {
      return v === null || v.tag !== 7
        ? ((v = Ql(_, b.mode, N, K)), (v.return = b), v)
        : ((v = n(v, _)), (v.return = b), v);
    }
    function j(b, v, _) {
      if ((typeof v == 'string' && v !== '') || typeof v == 'number' || typeof v == 'bigint')
        return ((v = sc('' + v, b.mode, _)), (v.return = b), v);
      if (typeof v == 'object' && v !== null) {
        switch (v.$$typeof) {
          case G:
            return ((_ = Su(v.type, v.key, v.props, null, b.mode, _)), dn(_, v), (_.return = b), _);
          case Z:
            return ((v = rc(v, b.mode, _)), (v.return = b), v);
          case Ct:
            return ((v = Jl(v)), j(b, v, _));
        }
        if (jt(v) || $t(v)) return ((v = Ql(v, b.mode, _, null)), (v.return = b), v);
        if (typeof v.then == 'function') return j(b, Ru(v), _);
        if (v.$$typeof === k) return j(b, Eu(b, v), _);
        xu(b, v);
      }
      return null;
    }
    function A(b, v, _, N) {
      var K = v !== null ? v.key : null;
      if ((typeof _ == 'string' && _ !== '') || typeof _ == 'number' || typeof _ == 'bigint')
        return K !== null ? null : o(b, v, '' + _, N);
      if (typeof _ == 'object' && _ !== null) {
        switch (_.$$typeof) {
          case G:
            return _.key === K ? h(b, v, _, N) : null;
          case Z:
            return _.key === K ? E(b, v, _, N) : null;
          case Ct:
            return ((_ = Jl(_)), A(b, v, _, N));
        }
        if (jt(_) || $t(_)) return K !== null ? null : C(b, v, _, N, null);
        if (typeof _.then == 'function') return A(b, v, Ru(_), N);
        if (_.$$typeof === k) return A(b, v, Eu(b, _), N);
        xu(b, _);
      }
      return null;
    }
    function x(b, v, _, N, K) {
      if ((typeof N == 'string' && N !== '') || typeof N == 'number' || typeof N == 'bigint')
        return ((b = b.get(_) || null), o(v, b, '' + N, K));
      if (typeof N == 'object' && N !== null) {
        switch (N.$$typeof) {
          case G:
            return ((b = b.get(N.key === null ? _ : N.key) || null), h(v, b, N, K));
          case Z:
            return ((b = b.get(N.key === null ? _ : N.key) || null), E(v, b, N, K));
          case Ct:
            return ((N = Jl(N)), x(b, v, _, N, K));
        }
        if (jt(N) || $t(N)) return ((b = b.get(_) || null), C(v, b, N, K, null));
        if (typeof N.then == 'function') return x(b, v, _, Ru(N), K);
        if (N.$$typeof === k) return x(b, v, _, Eu(v, N), K);
        xu(v, N);
      }
      return null;
    }
    function X(b, v, _, N) {
      for (
        var K = null, ft = null, V = v, et = (v = 0), it = null;
        V !== null && et < _.length;
        et++
      ) {
        V.index > et ? ((it = V), (V = null)) : (it = V.sibling);
        var st = A(b, V, _[et], N);
        if (st === null) {
          V === null && (V = it);
          break;
        }
        (t && V && st.alternate === null && e(b, V),
          (v = u(st, v, et)),
          ft === null ? (K = st) : (ft.sibling = st),
          (ft = st),
          (V = it));
      }
      if (et === _.length) return (l(b, V), ct && Ke(b, et), K);
      if (V === null) {
        for (; et < _.length; et++)
          ((V = j(b, _[et], N)),
            V !== null && ((v = u(V, v, et)), ft === null ? (K = V) : (ft.sibling = V), (ft = V)));
        return (ct && Ke(b, et), K);
      }
      for (V = a(V); et < _.length; et++)
        ((it = x(V, b, et, _[et], N)),
          it !== null &&
            (t && it.alternate !== null && V.delete(it.key === null ? et : it.key),
            (v = u(it, v, et)),
            ft === null ? (K = it) : (ft.sibling = it),
            (ft = it)));
      return (
        t &&
          V.forEach(function (Dl) {
            return e(b, Dl);
          }),
        ct && Ke(b, et),
        K
      );
    }
    function J(b, v, _, N) {
      if (_ == null) throw Error(f(151));
      for (
        var K = null, ft = null, V = v, et = (v = 0), it = null, st = _.next();
        V !== null && !st.done;
        et++, st = _.next()
      ) {
        V.index > et ? ((it = V), (V = null)) : (it = V.sibling);
        var Dl = A(b, V, st.value, N);
        if (Dl === null) {
          V === null && (V = it);
          break;
        }
        (t && V && Dl.alternate === null && e(b, V),
          (v = u(Dl, v, et)),
          ft === null ? (K = Dl) : (ft.sibling = Dl),
          (ft = Dl),
          (V = it));
      }
      if (st.done) return (l(b, V), ct && Ke(b, et), K);
      if (V === null) {
        for (; !st.done; et++, st = _.next())
          ((st = j(b, st.value, N)),
            st !== null &&
              ((v = u(st, v, et)), ft === null ? (K = st) : (ft.sibling = st), (ft = st)));
        return (ct && Ke(b, et), K);
      }
      for (V = a(V); !st.done; et++, st = _.next())
        ((st = x(V, b, et, st.value, N)),
          st !== null &&
            (t && st.alternate !== null && V.delete(st.key === null ? et : st.key),
            (v = u(st, v, et)),
            ft === null ? (K = st) : (ft.sibling = st),
            (ft = st)));
      return (
        t &&
          V.forEach(function (kv) {
            return e(b, kv);
          }),
        ct && Ke(b, et),
        K
      );
    }
    function St(b, v, _, N) {
      if (
        (typeof _ == 'object' &&
          _ !== null &&
          _.type === L &&
          _.key === null &&
          (_ = _.props.children),
        typeof _ == 'object' && _ !== null)
      ) {
        switch (_.$$typeof) {
          case G:
            t: {
              for (var K = _.key; v !== null; ) {
                if (v.key === K) {
                  if (((K = _.type), K === L)) {
                    if (v.tag === 7) {
                      (l(b, v.sibling), (N = n(v, _.props.children)), (N.return = b), (b = N));
                      break t;
                    }
                  } else if (
                    v.elementType === K ||
                    (typeof K == 'object' && K !== null && K.$$typeof === Ct && Jl(K) === v.type)
                  ) {
                    (l(b, v.sibling), (N = n(v, _.props)), dn(N, _), (N.return = b), (b = N));
                    break t;
                  }
                  l(b, v);
                  break;
                } else e(b, v);
                v = v.sibling;
              }
              _.type === L
                ? ((N = Ql(_.props.children, b.mode, N, _.key)), (N.return = b), (b = N))
                : ((N = Su(_.type, _.key, _.props, null, b.mode, N)),
                  dn(N, _),
                  (N.return = b),
                  (b = N));
            }
            return c(b);
          case Z:
            t: {
              for (K = _.key; v !== null; ) {
                if (v.key === K)
                  if (
                    v.tag === 4 &&
                    v.stateNode.containerInfo === _.containerInfo &&
                    v.stateNode.implementation === _.implementation
                  ) {
                    (l(b, v.sibling), (N = n(v, _.children || [])), (N.return = b), (b = N));
                    break t;
                  } else {
                    l(b, v);
                    break;
                  }
                else e(b, v);
                v = v.sibling;
              }
              ((N = rc(_, b.mode, N)), (N.return = b), (b = N));
            }
            return c(b);
          case Ct:
            return ((_ = Jl(_)), St(b, v, _, N));
        }
        if (jt(_)) return X(b, v, _, N);
        if ($t(_)) {
          if (((K = $t(_)), typeof K != 'function')) throw Error(f(150));
          return ((_ = K.call(_)), J(b, v, _, N));
        }
        if (typeof _.then == 'function') return St(b, v, Ru(_), N);
        if (_.$$typeof === k) return St(b, v, Eu(b, _), N);
        xu(b, _);
      }
      return (typeof _ == 'string' && _ !== '') || typeof _ == 'number' || typeof _ == 'bigint'
        ? ((_ = '' + _),
          v !== null && v.tag === 6
            ? (l(b, v.sibling), (N = n(v, _)), (N.return = b), (b = N))
            : (l(b, v), (N = sc(_, b.mode, N)), (N.return = b), (b = N)),
          c(b))
        : l(b, v);
    }
    return function (b, v, _, N) {
      try {
        on = 0;
        var K = St(b, v, _, N);
        return ((za = null), K);
      } catch (V) {
        if (V === Aa || V === Au) throw V;
        var ft = re(29, V, null, b.mode);
        return ((ft.lanes = N), (ft.return = b), ft);
      } finally {
      }
    };
  }
  var Wl = wr(!0),
    Xr = wr(!1),
    hl = !1;
  function Ec(t) {
    t.updateQueue = {
      baseState: t.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null,
    };
  }
  function Tc(t, e) {
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
  function yl(t) {
    return { lane: t, tag: 0, payload: null, callback: null, next: null };
  }
  function vl(t, e, l) {
    var a = t.updateQueue;
    if (a === null) return null;
    if (((a = a.shared), (rt & 2) !== 0)) {
      var n = a.pending;
      return (
        n === null ? (e.next = e) : ((e.next = n.next), (n.next = e)),
        (a.pending = e),
        (e = gu(t)),
        zr(t, null, l),
        e
      );
    }
    return (pu(t, a, e, l), gu(t));
  }
  function mn(t, e, l) {
    if (((e = e.updateQueue), e !== null && ((e = e.shared), (l & 4194048) !== 0))) {
      var a = e.lanes;
      ((a &= t.pendingLanes), (l |= a), (e.lanes = l), Us(t, l));
    }
  }
  function Ac(t, e) {
    var l = t.updateQueue,
      a = t.alternate;
    if (a !== null && ((a = a.updateQueue), l === a)) {
      var n = null,
        u = null;
      if (((l = l.firstBaseUpdate), l !== null)) {
        do {
          var c = { lane: l.lane, tag: l.tag, payload: l.payload, callback: null, next: null };
          (u === null ? (n = u = c) : (u = u.next = c), (l = l.next));
        } while (l !== null);
        u === null ? (n = u = e) : (u = u.next = e);
      } else n = u = e;
      ((l = {
        baseState: a.baseState,
        firstBaseUpdate: n,
        lastBaseUpdate: u,
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
  var zc = !1;
  function hn() {
    if (zc) {
      var t = Ta;
      if (t !== null) throw t;
    }
  }
  function yn(t, e, l, a) {
    zc = !1;
    var n = t.updateQueue;
    hl = !1;
    var u = n.firstBaseUpdate,
      c = n.lastBaseUpdate,
      o = n.shared.pending;
    if (o !== null) {
      n.shared.pending = null;
      var h = o,
        E = h.next;
      ((h.next = null), c === null ? (u = E) : (c.next = E), (c = h));
      var C = t.alternate;
      C !== null &&
        ((C = C.updateQueue),
        (o = C.lastBaseUpdate),
        o !== c && (o === null ? (C.firstBaseUpdate = E) : (o.next = E), (C.lastBaseUpdate = h)));
    }
    if (u !== null) {
      var j = n.baseState;
      ((c = 0), (C = E = h = null), (o = u));
      do {
        var A = o.lane & -536870913,
          x = A !== o.lane;
        if (x ? (ut & A) === A : (a & A) === A) {
          (A !== 0 && A === Ea && (zc = !0),
            C !== null &&
              (C = C.next =
                { lane: 0, tag: o.tag, payload: o.payload, callback: null, next: null }));
          t: {
            var X = t,
              J = o;
            A = e;
            var St = l;
            switch (J.tag) {
              case 1:
                if (((X = J.payload), typeof X == 'function')) {
                  j = X.call(St, j, A);
                  break t;
                }
                j = X;
                break t;
              case 3:
                X.flags = (X.flags & -65537) | 128;
              case 0:
                if (
                  ((X = J.payload), (A = typeof X == 'function' ? X.call(St, j, A) : X), A == null)
                )
                  break t;
                j = T({}, j, A);
                break t;
              case 2:
                hl = !0;
            }
          }
          ((A = o.callback),
            A !== null &&
              ((t.flags |= 64),
              x && (t.flags |= 8192),
              (x = n.callbacks),
              x === null ? (n.callbacks = [A]) : x.push(A)));
        } else
          ((x = { lane: A, tag: o.tag, payload: o.payload, callback: o.callback, next: null }),
            C === null ? ((E = C = x), (h = j)) : (C = C.next = x),
            (c |= A));
        if (((o = o.next), o === null)) {
          if (((o = n.shared.pending), o === null)) break;
          ((x = o),
            (o = x.next),
            (x.next = null),
            (n.lastBaseUpdate = x),
            (n.shared.pending = null));
        }
      } while (!0);
      (C === null && (h = j),
        (n.baseState = h),
        (n.firstBaseUpdate = E),
        (n.lastBaseUpdate = C),
        u === null && (n.shared.lanes = 0),
        (_l |= c),
        (t.lanes = c),
        (t.memoizedState = j));
    }
  }
  function Qr(t, e) {
    if (typeof t != 'function') throw Error(f(191, t));
    t.call(e);
  }
  function Zr(t, e) {
    var l = t.callbacks;
    if (l !== null) for (t.callbacks = null, t = 0; t < l.length; t++) Qr(l[t], e);
  }
  var Ra = S(null),
    Ou = S(0);
  function Vr(t, e) {
    ((t = al), Y(Ou, t), Y(Ra, e), (al = t | e.baseLanes));
  }
  function Rc() {
    (Y(Ou, al), Y(Ra, Ra.current));
  }
  function xc() {
    ((al = Ou.current), H(Ra), H(Ou));
  }
  var oe = S(null),
    Re = null;
  function pl(t) {
    var e = t.alternate;
    (Y(Nt, Nt.current & 1),
      Y(oe, t),
      Re === null && (e === null || Ra.current !== null || e.memoizedState !== null) && (Re = t));
  }
  function Oc(t) {
    (Y(Nt, Nt.current), Y(oe, t), Re === null && (Re = t));
  }
  function Kr(t) {
    t.tag === 22 ? (Y(Nt, Nt.current), Y(oe, t), Re === null && (Re = t)) : gl();
  }
  function gl() {
    (Y(Nt, Nt.current), Y(oe, oe.current));
  }
  function de(t) {
    (H(oe), Re === t && (Re = null), H(Nt));
  }
  var Nt = S(0);
  function Mu(t) {
    for (var e = t; e !== null; ) {
      if (e.tag === 13) {
        var l = e.memoizedState;
        if (l !== null && ((l = l.dehydrated), l === null || Hf(l) || Bf(l))) return e;
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
  var $e = 0,
    tt = null,
    pt = null,
    Bt = null,
    Cu = !1,
    xa = !1,
    Fl = !1,
    Du = 0,
    vn = 0,
    Oa = null,
    qy = 0;
  function Ot() {
    throw Error(f(321));
  }
  function Mc(t, e) {
    if (e === null) return !1;
    for (var l = 0; l < e.length && l < t.length; l++) if (!se(t[l], e[l])) return !1;
    return !0;
  }
  function Cc(t, e, l, a, n, u) {
    return (
      ($e = u),
      (tt = e),
      (e.memoizedState = null),
      (e.updateQueue = null),
      (e.lanes = 0),
      (D.H = t === null || t.memoizedState === null ? Co : Vc),
      (Fl = !1),
      (u = l(a, n)),
      (Fl = !1),
      xa && (u = Jr(e, l, a, n)),
      kr(t),
      u
    );
  }
  function kr(t) {
    D.H = Sn;
    var e = pt !== null && pt.next !== null;
    if ((($e = 0), (Bt = pt = tt = null), (Cu = !1), (vn = 0), (Oa = null), e)) throw Error(f(300));
    t === null || qt || ((t = t.dependencies), t !== null && _u(t) && (qt = !0));
  }
  function Jr(t, e, l, a) {
    tt = t;
    var n = 0;
    do {
      if ((xa && (Oa = null), (vn = 0), (xa = !1), 25 <= n)) throw Error(f(301));
      if (((n += 1), (Bt = pt = null), t.updateQueue != null)) {
        var u = t.updateQueue;
        ((u.lastEffect = null),
          (u.events = null),
          (u.stores = null),
          u.memoCache != null && (u.memoCache.index = 0));
      }
      ((D.H = Do), (u = e(l, a)));
    } while (xa);
    return u;
  }
  function Ly() {
    var t = D.H,
      e = t.useState()[0];
    return (
      (e = typeof e.then == 'function' ? pn(e) : e),
      (t = t.useState()[0]),
      (pt !== null ? pt.memoizedState : null) !== t && (tt.flags |= 1024),
      e
    );
  }
  function Dc() {
    var t = Du !== 0;
    return ((Du = 0), t);
  }
  function Nc(t, e, l) {
    ((e.updateQueue = t.updateQueue), (e.flags &= -2053), (t.lanes &= ~l));
  }
  function Uc(t) {
    if (Cu) {
      for (t = t.memoizedState; t !== null; ) {
        var e = t.queue;
        (e !== null && (e.pending = null), (t = t.next));
      }
      Cu = !1;
    }
    (($e = 0), (Bt = pt = tt = null), (xa = !1), (vn = Du = 0), (Oa = null));
  }
  function It() {
    var t = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
    return (Bt === null ? (tt.memoizedState = Bt = t) : (Bt = Bt.next = t), Bt);
  }
  function Ut() {
    if (pt === null) {
      var t = tt.alternate;
      t = t !== null ? t.memoizedState : null;
    } else t = pt.next;
    var e = Bt === null ? tt.memoizedState : Bt.next;
    if (e !== null) ((Bt = e), (pt = t));
    else {
      if (t === null) throw tt.alternate === null ? Error(f(467)) : Error(f(310));
      ((pt = t),
        (t = {
          memoizedState: pt.memoizedState,
          baseState: pt.baseState,
          baseQueue: pt.baseQueue,
          queue: pt.queue,
          next: null,
        }),
        Bt === null ? (tt.memoizedState = Bt = t) : (Bt = Bt.next = t));
    }
    return Bt;
  }
  function Nu() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function pn(t) {
    var e = vn;
    return (
      (vn += 1),
      Oa === null && (Oa = []),
      (t = Lr(Oa, t, e)),
      (e = tt),
      (Bt === null ? e.memoizedState : Bt.next) === null &&
        ((e = e.alternate), (D.H = e === null || e.memoizedState === null ? Co : Vc)),
      t
    );
  }
  function Uu(t) {
    if (t !== null && typeof t == 'object') {
      if (typeof t.then == 'function') return pn(t);
      if (t.$$typeof === k) return Vt(t);
    }
    throw Error(f(438, String(t)));
  }
  function jc(t) {
    var e = null,
      l = tt.updateQueue;
    if ((l !== null && (e = l.memoCache), e == null)) {
      var a = tt.alternate;
      a !== null &&
        ((a = a.updateQueue),
        a !== null &&
          ((a = a.memoCache),
          a != null &&
            (e = {
              data: a.data.map(function (n) {
                return n.slice();
              }),
              index: 0,
            })));
    }
    if (
      (e == null && (e = { data: [], index: 0 }),
      l === null && ((l = Nu()), (tt.updateQueue = l)),
      (l.memoCache = e),
      (l = e.data[e.index]),
      l === void 0)
    )
      for (l = e.data[e.index] = Array(t), a = 0; a < t; a++) l[a] = je;
    return (e.index++, l);
  }
  function We(t, e) {
    return typeof e == 'function' ? e(t) : e;
  }
  function ju(t) {
    var e = Ut();
    return Hc(e, pt, t);
  }
  function Hc(t, e, l) {
    var a = t.queue;
    if (a === null) throw Error(f(311));
    a.lastRenderedReducer = l;
    var n = t.baseQueue,
      u = a.pending;
    if (u !== null) {
      if (n !== null) {
        var c = n.next;
        ((n.next = u.next), (u.next = c));
      }
      ((e.baseQueue = n = u), (a.pending = null));
    }
    if (((u = t.baseState), n === null)) t.memoizedState = u;
    else {
      e = n.next;
      var o = (c = null),
        h = null,
        E = e,
        C = !1;
      do {
        var j = E.lane & -536870913;
        if (j !== E.lane ? (ut & j) === j : ($e & j) === j) {
          var A = E.revertLane;
          if (A === 0)
            (h !== null &&
              (h = h.next =
                {
                  lane: 0,
                  revertLane: 0,
                  gesture: null,
                  action: E.action,
                  hasEagerState: E.hasEagerState,
                  eagerState: E.eagerState,
                  next: null,
                }),
              j === Ea && (C = !0));
          else if (($e & A) === A) {
            ((E = E.next), A === Ea && (C = !0));
            continue;
          } else
            ((j = {
              lane: 0,
              revertLane: E.revertLane,
              gesture: null,
              action: E.action,
              hasEagerState: E.hasEagerState,
              eagerState: E.eagerState,
              next: null,
            }),
              h === null ? ((o = h = j), (c = u)) : (h = h.next = j),
              (tt.lanes |= A),
              (_l |= A));
          ((j = E.action), Fl && l(u, j), (u = E.hasEagerState ? E.eagerState : l(u, j)));
        } else
          ((A = {
            lane: j,
            revertLane: E.revertLane,
            gesture: E.gesture,
            action: E.action,
            hasEagerState: E.hasEagerState,
            eagerState: E.eagerState,
            next: null,
          }),
            h === null ? ((o = h = A), (c = u)) : (h = h.next = A),
            (tt.lanes |= j),
            (_l |= j));
        E = E.next;
      } while (E !== null && E !== e);
      if (
        (h === null ? (c = u) : (h.next = o),
        !se(u, t.memoizedState) && ((qt = !0), C && ((l = Ta), l !== null)))
      )
        throw l;
      ((t.memoizedState = u), (t.baseState = c), (t.baseQueue = h), (a.lastRenderedState = u));
    }
    return (n === null && (a.lanes = 0), [t.memoizedState, a.dispatch]);
  }
  function Bc(t) {
    var e = Ut(),
      l = e.queue;
    if (l === null) throw Error(f(311));
    l.lastRenderedReducer = t;
    var a = l.dispatch,
      n = l.pending,
      u = e.memoizedState;
    if (n !== null) {
      l.pending = null;
      var c = (n = n.next);
      do ((u = t(u, c.action)), (c = c.next));
      while (c !== n);
      (se(u, e.memoizedState) || (qt = !0),
        (e.memoizedState = u),
        e.baseQueue === null && (e.baseState = u),
        (l.lastRenderedState = u));
    }
    return [u, a];
  }
  function $r(t, e, l) {
    var a = tt,
      n = Ut(),
      u = ct;
    if (u) {
      if (l === void 0) throw Error(f(407));
      l = l();
    } else l = e();
    var c = !se((pt || n).memoizedState, l);
    if (
      (c && ((n.memoizedState = l), (qt = !0)),
      (n = n.queue),
      Yc(Ir.bind(null, a, n, t), [t]),
      n.getSnapshot !== e || c || (Bt !== null && Bt.memoizedState.tag & 1))
    ) {
      if (
        ((a.flags |= 2048),
        Ma(9, { destroy: void 0 }, Fr.bind(null, a, n, l, e), null),
        _t === null)
      )
        throw Error(f(349));
      u || ($e & 127) !== 0 || Wr(a, e, l);
    }
    return l;
  }
  function Wr(t, e, l) {
    ((t.flags |= 16384),
      (t = { getSnapshot: e, value: l }),
      (e = tt.updateQueue),
      e === null
        ? ((e = Nu()), (tt.updateQueue = e), (e.stores = [t]))
        : ((l = e.stores), l === null ? (e.stores = [t]) : l.push(t)));
  }
  function Fr(t, e, l, a) {
    ((e.value = l), (e.getSnapshot = a), Pr(e) && to(t));
  }
  function Ir(t, e, l) {
    return l(function () {
      Pr(e) && to(t);
    });
  }
  function Pr(t) {
    var e = t.getSnapshot;
    t = t.value;
    try {
      var l = e();
      return !se(t, l);
    } catch {
      return !0;
    }
  }
  function to(t) {
    var e = Xl(t, 2);
    e !== null && ue(e, t, 2);
  }
  function qc(t) {
    var e = It();
    if (typeof t == 'function') {
      var l = t;
      if (((t = l()), Fl)) {
        cl(!0);
        try {
          l();
        } finally {
          cl(!1);
        }
      }
    }
    return (
      (e.memoizedState = e.baseState = t),
      (e.queue = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: We,
        lastRenderedState: t,
      }),
      e
    );
  }
  function eo(t, e, l, a) {
    return ((t.baseState = l), Hc(t, pt, typeof a == 'function' ? a : We));
  }
  function Yy(t, e, l, a, n) {
    if (qu(t)) throw Error(f(485));
    if (((t = e.action), t !== null)) {
      var u = {
        payload: n,
        action: t,
        next: null,
        isTransition: !0,
        status: 'pending',
        value: null,
        reason: null,
        listeners: [],
        then: function (c) {
          u.listeners.push(c);
        },
      };
      (D.T !== null ? l(!0) : (u.isTransition = !1),
        a(u),
        (l = e.pending),
        l === null
          ? ((u.next = e.pending = u), lo(e, u))
          : ((u.next = l.next), (e.pending = l.next = u)));
    }
  }
  function lo(t, e) {
    var l = e.action,
      a = e.payload,
      n = t.state;
    if (e.isTransition) {
      var u = D.T,
        c = {};
      D.T = c;
      try {
        var o = l(n, a),
          h = D.S;
        (h !== null && h(c, o), ao(t, e, o));
      } catch (E) {
        Lc(t, e, E);
      } finally {
        (u !== null && c.types !== null && (u.types = c.types), (D.T = u));
      }
    } else
      try {
        ((u = l(n, a)), ao(t, e, u));
      } catch (E) {
        Lc(t, e, E);
      }
  }
  function ao(t, e, l) {
    l !== null && typeof l == 'object' && typeof l.then == 'function'
      ? l.then(
          function (a) {
            no(t, e, a);
          },
          function (a) {
            return Lc(t, e, a);
          }
        )
      : no(t, e, l);
  }
  function no(t, e, l) {
    ((e.status = 'fulfilled'),
      (e.value = l),
      uo(e),
      (t.state = l),
      (e = t.pending),
      e !== null &&
        ((l = e.next), l === e ? (t.pending = null) : ((l = l.next), (e.next = l), lo(t, l))));
  }
  function Lc(t, e, l) {
    var a = t.pending;
    if (((t.pending = null), a !== null)) {
      a = a.next;
      do ((e.status = 'rejected'), (e.reason = l), uo(e), (e = e.next));
      while (e !== a);
    }
    t.action = null;
  }
  function uo(t) {
    t = t.listeners;
    for (var e = 0; e < t.length; e++) (0, t[e])();
  }
  function io(t, e) {
    return e;
  }
  function co(t, e) {
    if (ct) {
      var l = _t.formState;
      if (l !== null) {
        t: {
          var a = tt;
          if (ct) {
            if (Tt) {
              e: {
                for (var n = Tt, u = ze; n.nodeType !== 8; ) {
                  if (!u) {
                    n = null;
                    break e;
                  }
                  if (((n = xe(n.nextSibling)), n === null)) {
                    n = null;
                    break e;
                  }
                }
                ((u = n.data), (n = u === 'F!' || u === 'F' ? n : null));
              }
              if (n) {
                ((Tt = xe(n.nextSibling)), (a = n.data === 'F!'));
                break t;
              }
            }
            dl(a);
          }
          a = !1;
        }
        a && (e = l[0]);
      }
    }
    return (
      (l = It()),
      (l.memoizedState = l.baseState = e),
      (a = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: io,
        lastRenderedState: e,
      }),
      (l.queue = a),
      (l = xo.bind(null, tt, a)),
      (a.dispatch = l),
      (a = qc(!1)),
      (u = Zc.bind(null, tt, !1, a.queue)),
      (a = It()),
      (n = { state: e, dispatch: null, action: t, pending: null }),
      (a.queue = n),
      (l = Yy.bind(null, tt, n, u, l)),
      (n.dispatch = l),
      (a.memoizedState = t),
      [e, l, !1]
    );
  }
  function fo(t) {
    var e = Ut();
    return so(e, pt, t);
  }
  function so(t, e, l) {
    if (
      ((e = Hc(t, e, io)[0]),
      (t = ju(We)[0]),
      typeof e == 'object' && e !== null && typeof e.then == 'function')
    )
      try {
        var a = pn(e);
      } catch (c) {
        throw c === Aa ? Au : c;
      }
    else a = e;
    e = Ut();
    var n = e.queue,
      u = n.dispatch;
    return (
      l !== e.memoizedState &&
        ((tt.flags |= 2048), Ma(9, { destroy: void 0 }, Gy.bind(null, n, l), null)),
      [a, u, t]
    );
  }
  function Gy(t, e) {
    t.action = e;
  }
  function ro(t) {
    var e = Ut(),
      l = pt;
    if (l !== null) return so(e, l, t);
    (Ut(), (e = e.memoizedState), (l = Ut()));
    var a = l.queue.dispatch;
    return ((l.memoizedState = t), [e, a, !1]);
  }
  function Ma(t, e, l, a) {
    return (
      (t = { tag: t, create: l, deps: a, inst: e, next: null }),
      (e = tt.updateQueue),
      e === null && ((e = Nu()), (tt.updateQueue = e)),
      (l = e.lastEffect),
      l === null
        ? (e.lastEffect = t.next = t)
        : ((a = l.next), (l.next = t), (t.next = a), (e.lastEffect = t)),
      t
    );
  }
  function oo() {
    return Ut().memoizedState;
  }
  function Hu(t, e, l, a) {
    var n = It();
    ((tt.flags |= t),
      (n.memoizedState = Ma(1 | e, { destroy: void 0 }, l, a === void 0 ? null : a)));
  }
  function Bu(t, e, l, a) {
    var n = Ut();
    a = a === void 0 ? null : a;
    var u = n.memoizedState.inst;
    pt !== null && a !== null && Mc(a, pt.memoizedState.deps)
      ? (n.memoizedState = Ma(e, u, l, a))
      : ((tt.flags |= t), (n.memoizedState = Ma(1 | e, u, l, a)));
  }
  function mo(t, e) {
    Hu(8390656, 8, t, e);
  }
  function Yc(t, e) {
    Bu(2048, 8, t, e);
  }
  function wy(t) {
    tt.flags |= 4;
    var e = tt.updateQueue;
    if (e === null) ((e = Nu()), (tt.updateQueue = e), (e.events = [t]));
    else {
      var l = e.events;
      l === null ? (e.events = [t]) : l.push(t);
    }
  }
  function ho(t) {
    var e = Ut().memoizedState;
    return (
      wy({ ref: e, nextImpl: t }),
      function () {
        if ((rt & 2) !== 0) throw Error(f(440));
        return e.impl.apply(void 0, arguments);
      }
    );
  }
  function yo(t, e) {
    return Bu(4, 2, t, e);
  }
  function vo(t, e) {
    return Bu(4, 4, t, e);
  }
  function po(t, e) {
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
  function go(t, e, l) {
    ((l = l != null ? l.concat([t]) : null), Bu(4, 4, po.bind(null, e, t), l));
  }
  function Gc() {}
  function So(t, e) {
    var l = Ut();
    e = e === void 0 ? null : e;
    var a = l.memoizedState;
    return e !== null && Mc(e, a[1]) ? a[0] : ((l.memoizedState = [t, e]), t);
  }
  function bo(t, e) {
    var l = Ut();
    e = e === void 0 ? null : e;
    var a = l.memoizedState;
    if (e !== null && Mc(e, a[1])) return a[0];
    if (((a = t()), Fl)) {
      cl(!0);
      try {
        t();
      } finally {
        cl(!1);
      }
    }
    return ((l.memoizedState = [a, e]), a);
  }
  function wc(t, e, l) {
    return l === void 0 || (($e & 1073741824) !== 0 && (ut & 261930) === 0)
      ? (t.memoizedState = e)
      : ((t.memoizedState = l), (t = _d()), (tt.lanes |= t), (_l |= t), l);
  }
  function _o(t, e, l, a) {
    return se(l, e)
      ? l
      : Ra.current !== null
        ? ((t = wc(t, l, a)), se(t, e) || (qt = !0), t)
        : ($e & 42) === 0 || (($e & 1073741824) !== 0 && (ut & 261930) === 0)
          ? ((qt = !0), (t.memoizedState = l))
          : ((t = _d()), (tt.lanes |= t), (_l |= t), e);
  }
  function Eo(t, e, l, a, n) {
    var u = q.p;
    q.p = u !== 0 && 8 > u ? u : 8;
    var c = D.T,
      o = {};
    ((D.T = o), Zc(t, !1, e, l));
    try {
      var h = n(),
        E = D.S;
      if (
        (E !== null && E(o, h), h !== null && typeof h == 'object' && typeof h.then == 'function')
      ) {
        var C = By(h, a);
        gn(t, e, C, ye(t));
      } else gn(t, e, a, ye(t));
    } catch (j) {
      gn(t, e, { then: function () {}, status: 'rejected', reason: j }, ye());
    } finally {
      ((q.p = u), c !== null && o.types !== null && (c.types = o.types), (D.T = c));
    }
  }
  function Xy() {}
  function Xc(t, e, l, a) {
    if (t.tag !== 5) throw Error(f(476));
    var n = To(t).queue;
    Eo(
      t,
      n,
      e,
      $,
      l === null
        ? Xy
        : function () {
            return (Ao(t), l(a));
          }
    );
  }
  function To(t) {
    var e = t.memoizedState;
    if (e !== null) return e;
    e = {
      memoizedState: $,
      baseState: $,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: We,
        lastRenderedState: $,
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
          lastRenderedReducer: We,
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
  function Ao(t) {
    var e = To(t);
    (e.next === null && (e = t.alternate.memoizedState), gn(t, e.next.queue, {}, ye()));
  }
  function Qc() {
    return Vt(Hn);
  }
  function zo() {
    return Ut().memoizedState;
  }
  function Ro() {
    return Ut().memoizedState;
  }
  function Qy(t) {
    for (var e = t.return; e !== null; ) {
      switch (e.tag) {
        case 24:
        case 3:
          var l = ye();
          t = yl(l);
          var a = vl(e, t, l);
          (a !== null && (ue(a, e, l), mn(a, e, l)), (e = { cache: gc() }), (t.payload = e));
          return;
      }
      e = e.return;
    }
  }
  function Zy(t, e, l) {
    var a = ye();
    ((l = {
      lane: a,
      revertLane: 0,
      gesture: null,
      action: l,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    }),
      qu(t) ? Oo(e, l) : ((l = cc(t, e, l, a)), l !== null && (ue(l, t, a), Mo(l, e, a))));
  }
  function xo(t, e, l) {
    var a = ye();
    gn(t, e, l, a);
  }
  function gn(t, e, l, a) {
    var n = {
      lane: a,
      revertLane: 0,
      gesture: null,
      action: l,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    };
    if (qu(t)) Oo(e, n);
    else {
      var u = t.alternate;
      if (
        t.lanes === 0 &&
        (u === null || u.lanes === 0) &&
        ((u = e.lastRenderedReducer), u !== null)
      )
        try {
          var c = e.lastRenderedState,
            o = u(c, l);
          if (((n.hasEagerState = !0), (n.eagerState = o), se(o, c)))
            return (pu(t, e, n, 0), _t === null && vu(), !1);
        } catch {
        } finally {
        }
      if (((l = cc(t, e, n, a)), l !== null)) return (ue(l, t, a), Mo(l, e, a), !0);
    }
    return !1;
  }
  function Zc(t, e, l, a) {
    if (
      ((a = {
        lane: 2,
        revertLane: Tf(),
        gesture: null,
        action: a,
        hasEagerState: !1,
        eagerState: null,
        next: null,
      }),
      qu(t))
    ) {
      if (e) throw Error(f(479));
    } else ((e = cc(t, l, a, 2)), e !== null && ue(e, t, 2));
  }
  function qu(t) {
    var e = t.alternate;
    return t === tt || (e !== null && e === tt);
  }
  function Oo(t, e) {
    xa = Cu = !0;
    var l = t.pending;
    (l === null ? (e.next = e) : ((e.next = l.next), (l.next = e)), (t.pending = e));
  }
  function Mo(t, e, l) {
    if ((l & 4194048) !== 0) {
      var a = e.lanes;
      ((a &= t.pendingLanes), (l |= a), (e.lanes = l), Us(t, l));
    }
  }
  var Sn = {
    readContext: Vt,
    use: Uu,
    useCallback: Ot,
    useContext: Ot,
    useEffect: Ot,
    useImperativeHandle: Ot,
    useLayoutEffect: Ot,
    useInsertionEffect: Ot,
    useMemo: Ot,
    useReducer: Ot,
    useRef: Ot,
    useState: Ot,
    useDebugValue: Ot,
    useDeferredValue: Ot,
    useTransition: Ot,
    useSyncExternalStore: Ot,
    useId: Ot,
    useHostTransitionStatus: Ot,
    useFormState: Ot,
    useActionState: Ot,
    useOptimistic: Ot,
    useMemoCache: Ot,
    useCacheRefresh: Ot,
  };
  Sn.useEffectEvent = Ot;
  var Co = {
      readContext: Vt,
      use: Uu,
      useCallback: function (t, e) {
        return ((It().memoizedState = [t, e === void 0 ? null : e]), t);
      },
      useContext: Vt,
      useEffect: mo,
      useImperativeHandle: function (t, e, l) {
        ((l = l != null ? l.concat([t]) : null), Hu(4194308, 4, po.bind(null, e, t), l));
      },
      useLayoutEffect: function (t, e) {
        return Hu(4194308, 4, t, e);
      },
      useInsertionEffect: function (t, e) {
        Hu(4, 2, t, e);
      },
      useMemo: function (t, e) {
        var l = It();
        e = e === void 0 ? null : e;
        var a = t();
        if (Fl) {
          cl(!0);
          try {
            t();
          } finally {
            cl(!1);
          }
        }
        return ((l.memoizedState = [a, e]), a);
      },
      useReducer: function (t, e, l) {
        var a = It();
        if (l !== void 0) {
          var n = l(e);
          if (Fl) {
            cl(!0);
            try {
              l(e);
            } finally {
              cl(!1);
            }
          }
        } else n = e;
        return (
          (a.memoizedState = a.baseState = n),
          (t = {
            pending: null,
            lanes: 0,
            dispatch: null,
            lastRenderedReducer: t,
            lastRenderedState: n,
          }),
          (a.queue = t),
          (t = t.dispatch = Zy.bind(null, tt, t)),
          [a.memoizedState, t]
        );
      },
      useRef: function (t) {
        var e = It();
        return ((t = { current: t }), (e.memoizedState = t));
      },
      useState: function (t) {
        t = qc(t);
        var e = t.queue,
          l = xo.bind(null, tt, e);
        return ((e.dispatch = l), [t.memoizedState, l]);
      },
      useDebugValue: Gc,
      useDeferredValue: function (t, e) {
        var l = It();
        return wc(l, t, e);
      },
      useTransition: function () {
        var t = qc(!1);
        return ((t = Eo.bind(null, tt, t.queue, !0, !1)), (It().memoizedState = t), [!1, t]);
      },
      useSyncExternalStore: function (t, e, l) {
        var a = tt,
          n = It();
        if (ct) {
          if (l === void 0) throw Error(f(407));
          l = l();
        } else {
          if (((l = e()), _t === null)) throw Error(f(349));
          (ut & 127) !== 0 || Wr(a, e, l);
        }
        n.memoizedState = l;
        var u = { value: l, getSnapshot: e };
        return (
          (n.queue = u),
          mo(Ir.bind(null, a, u, t), [t]),
          (a.flags |= 2048),
          Ma(9, { destroy: void 0 }, Fr.bind(null, a, u, l, e), null),
          l
        );
      },
      useId: function () {
        var t = It(),
          e = _t.identifierPrefix;
        if (ct) {
          var l = qe,
            a = Be;
          ((l = (a & ~(1 << (32 - fe(a) - 1))).toString(32) + l),
            (e = '_' + e + 'R_' + l),
            (l = Du++),
            0 < l && (e += 'H' + l.toString(32)),
            (e += '_'));
        } else ((l = qy++), (e = '_' + e + 'r_' + l.toString(32) + '_'));
        return (t.memoizedState = e);
      },
      useHostTransitionStatus: Qc,
      useFormState: co,
      useActionState: co,
      useOptimistic: function (t) {
        var e = It();
        e.memoizedState = e.baseState = t;
        var l = {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: null,
          lastRenderedState: null,
        };
        return ((e.queue = l), (e = Zc.bind(null, tt, !0, l)), (l.dispatch = e), [t, e]);
      },
      useMemoCache: jc,
      useCacheRefresh: function () {
        return (It().memoizedState = Qy.bind(null, tt));
      },
      useEffectEvent: function (t) {
        var e = It(),
          l = { impl: t };
        return (
          (e.memoizedState = l),
          function () {
            if ((rt & 2) !== 0) throw Error(f(440));
            return l.impl.apply(void 0, arguments);
          }
        );
      },
    },
    Vc = {
      readContext: Vt,
      use: Uu,
      useCallback: So,
      useContext: Vt,
      useEffect: Yc,
      useImperativeHandle: go,
      useInsertionEffect: yo,
      useLayoutEffect: vo,
      useMemo: bo,
      useReducer: ju,
      useRef: oo,
      useState: function () {
        return ju(We);
      },
      useDebugValue: Gc,
      useDeferredValue: function (t, e) {
        var l = Ut();
        return _o(l, pt.memoizedState, t, e);
      },
      useTransition: function () {
        var t = ju(We)[0],
          e = Ut().memoizedState;
        return [typeof t == 'boolean' ? t : pn(t), e];
      },
      useSyncExternalStore: $r,
      useId: zo,
      useHostTransitionStatus: Qc,
      useFormState: fo,
      useActionState: fo,
      useOptimistic: function (t, e) {
        var l = Ut();
        return eo(l, pt, t, e);
      },
      useMemoCache: jc,
      useCacheRefresh: Ro,
    };
  Vc.useEffectEvent = ho;
  var Do = {
    readContext: Vt,
    use: Uu,
    useCallback: So,
    useContext: Vt,
    useEffect: Yc,
    useImperativeHandle: go,
    useInsertionEffect: yo,
    useLayoutEffect: vo,
    useMemo: bo,
    useReducer: Bc,
    useRef: oo,
    useState: function () {
      return Bc(We);
    },
    useDebugValue: Gc,
    useDeferredValue: function (t, e) {
      var l = Ut();
      return pt === null ? wc(l, t, e) : _o(l, pt.memoizedState, t, e);
    },
    useTransition: function () {
      var t = Bc(We)[0],
        e = Ut().memoizedState;
      return [typeof t == 'boolean' ? t : pn(t), e];
    },
    useSyncExternalStore: $r,
    useId: zo,
    useHostTransitionStatus: Qc,
    useFormState: ro,
    useActionState: ro,
    useOptimistic: function (t, e) {
      var l = Ut();
      return pt !== null ? eo(l, pt, t, e) : ((l.baseState = t), [t, l.queue.dispatch]);
    },
    useMemoCache: jc,
    useCacheRefresh: Ro,
  };
  Do.useEffectEvent = ho;
  function Kc(t, e, l, a) {
    ((e = t.memoizedState),
      (l = l(a, e)),
      (l = l == null ? e : T({}, e, l)),
      (t.memoizedState = l),
      t.lanes === 0 && (t.updateQueue.baseState = l));
  }
  var kc = {
    enqueueSetState: function (t, e, l) {
      t = t._reactInternals;
      var a = ye(),
        n = yl(a);
      ((n.payload = e),
        l != null && (n.callback = l),
        (e = vl(t, n, a)),
        e !== null && (ue(e, t, a), mn(e, t, a)));
    },
    enqueueReplaceState: function (t, e, l) {
      t = t._reactInternals;
      var a = ye(),
        n = yl(a);
      ((n.tag = 1),
        (n.payload = e),
        l != null && (n.callback = l),
        (e = vl(t, n, a)),
        e !== null && (ue(e, t, a), mn(e, t, a)));
    },
    enqueueForceUpdate: function (t, e) {
      t = t._reactInternals;
      var l = ye(),
        a = yl(l);
      ((a.tag = 2),
        e != null && (a.callback = e),
        (e = vl(t, a, l)),
        e !== null && (ue(e, t, l), mn(e, t, l)));
    },
  };
  function No(t, e, l, a, n, u, c) {
    return (
      (t = t.stateNode),
      typeof t.shouldComponentUpdate == 'function'
        ? t.shouldComponentUpdate(a, u, c)
        : e.prototype && e.prototype.isPureReactComponent
          ? !nn(l, a) || !nn(n, u)
          : !0
    );
  }
  function Uo(t, e, l, a) {
    ((t = e.state),
      typeof e.componentWillReceiveProps == 'function' && e.componentWillReceiveProps(l, a),
      typeof e.UNSAFE_componentWillReceiveProps == 'function' &&
        e.UNSAFE_componentWillReceiveProps(l, a),
      e.state !== t && kc.enqueueReplaceState(e, e.state, null));
  }
  function Il(t, e) {
    var l = e;
    if ('ref' in e) {
      l = {};
      for (var a in e) a !== 'ref' && (l[a] = e[a]);
    }
    if ((t = t.defaultProps)) {
      l === e && (l = T({}, l));
      for (var n in t) l[n] === void 0 && (l[n] = t[n]);
    }
    return l;
  }
  function jo(t) {
    yu(t);
  }
  function Ho(t) {
    console.error(t);
  }
  function Bo(t) {
    yu(t);
  }
  function Lu(t, e) {
    try {
      var l = t.onUncaughtError;
      l(e.value, { componentStack: e.stack });
    } catch (a) {
      setTimeout(function () {
        throw a;
      });
    }
  }
  function qo(t, e, l) {
    try {
      var a = t.onCaughtError;
      a(l.value, { componentStack: l.stack, errorBoundary: e.tag === 1 ? e.stateNode : null });
    } catch (n) {
      setTimeout(function () {
        throw n;
      });
    }
  }
  function Jc(t, e, l) {
    return (
      (l = yl(l)),
      (l.tag = 3),
      (l.payload = { element: null }),
      (l.callback = function () {
        Lu(t, e);
      }),
      l
    );
  }
  function Lo(t) {
    return ((t = yl(t)), (t.tag = 3), t);
  }
  function Yo(t, e, l, a) {
    var n = l.type.getDerivedStateFromError;
    if (typeof n == 'function') {
      var u = a.value;
      ((t.payload = function () {
        return n(u);
      }),
        (t.callback = function () {
          qo(e, l, a);
        }));
    }
    var c = l.stateNode;
    c !== null &&
      typeof c.componentDidCatch == 'function' &&
      (t.callback = function () {
        (qo(e, l, a),
          typeof n != 'function' && (El === null ? (El = new Set([this])) : El.add(this)));
        var o = a.stack;
        this.componentDidCatch(a.value, { componentStack: o !== null ? o : '' });
      });
  }
  function Vy(t, e, l, a, n) {
    if (((l.flags |= 32768), a !== null && typeof a == 'object' && typeof a.then == 'function')) {
      if (((e = l.alternate), e !== null && _a(e, l, n, !0), (l = oe.current), l !== null)) {
        switch (l.tag) {
          case 31:
          case 13:
            return (
              Re === null ? Wu() : l.alternate === null && Mt === 0 && (Mt = 3),
              (l.flags &= -257),
              (l.flags |= 65536),
              (l.lanes = n),
              a === zu
                ? (l.flags |= 16384)
                : ((e = l.updateQueue),
                  e === null ? (l.updateQueue = new Set([a])) : e.add(a),
                  bf(t, a, n)),
              !1
            );
          case 22:
            return (
              (l.flags |= 65536),
              a === zu
                ? (l.flags |= 16384)
                : ((e = l.updateQueue),
                  e === null
                    ? ((e = { transitions: null, markerInstances: null, retryQueue: new Set([a]) }),
                      (l.updateQueue = e))
                    : ((l = e.retryQueue), l === null ? (e.retryQueue = new Set([a])) : l.add(a)),
                  bf(t, a, n)),
              !1
            );
        }
        throw Error(f(435, l.tag));
      }
      return (bf(t, a, n), Wu(), !1);
    }
    if (ct)
      return (
        (e = oe.current),
        e !== null
          ? ((e.flags & 65536) === 0 && (e.flags |= 256),
            (e.flags |= 65536),
            (e.lanes = n),
            a !== mc && ((t = Error(f(422), { cause: a })), fn(Ee(t, l))))
          : (a !== mc && ((e = Error(f(423), { cause: a })), fn(Ee(e, l))),
            (t = t.current.alternate),
            (t.flags |= 65536),
            (n &= -n),
            (t.lanes |= n),
            (a = Ee(a, l)),
            (n = Jc(t.stateNode, a, n)),
            Ac(t, n),
            Mt !== 4 && (Mt = 2)),
        !1
      );
    var u = Error(f(520), { cause: a });
    if (((u = Ee(u, l)), xn === null ? (xn = [u]) : xn.push(u), Mt !== 4 && (Mt = 2), e === null))
      return !0;
    ((a = Ee(a, l)), (l = e));
    do {
      switch (l.tag) {
        case 3:
          return (
            (l.flags |= 65536),
            (t = n & -n),
            (l.lanes |= t),
            (t = Jc(l.stateNode, a, t)),
            Ac(l, t),
            !1
          );
        case 1:
          if (
            ((e = l.type),
            (u = l.stateNode),
            (l.flags & 128) === 0 &&
              (typeof e.getDerivedStateFromError == 'function' ||
                (u !== null &&
                  typeof u.componentDidCatch == 'function' &&
                  (El === null || !El.has(u)))))
          )
            return (
              (l.flags |= 65536),
              (n &= -n),
              (l.lanes |= n),
              (n = Lo(n)),
              Yo(n, t, l, a),
              Ac(l, n),
              !1
            );
      }
      l = l.return;
    } while (l !== null);
    return !1;
  }
  var $c = Error(f(461)),
    qt = !1;
  function Kt(t, e, l, a) {
    e.child = t === null ? Xr(e, null, l, a) : Wl(e, t.child, l, a);
  }
  function Go(t, e, l, a, n) {
    l = l.render;
    var u = e.ref;
    if ('ref' in a) {
      var c = {};
      for (var o in a) o !== 'ref' && (c[o] = a[o]);
    } else c = a;
    return (
      Kl(e),
      (a = Cc(t, e, l, c, u, n)),
      (o = Dc()),
      t !== null && !qt
        ? (Nc(t, e, n), Fe(t, e, n))
        : (ct && o && oc(e), (e.flags |= 1), Kt(t, e, a, n), e.child)
    );
  }
  function wo(t, e, l, a, n) {
    if (t === null) {
      var u = l.type;
      return typeof u == 'function' && !fc(u) && u.defaultProps === void 0 && l.compare === null
        ? ((e.tag = 15), (e.type = u), Xo(t, e, u, a, n))
        : ((t = Su(l.type, null, a, e, e.mode, n)), (t.ref = e.ref), (t.return = e), (e.child = t));
    }
    if (((u = t.child), !af(t, n))) {
      var c = u.memoizedProps;
      if (((l = l.compare), (l = l !== null ? l : nn), l(c, a) && t.ref === e.ref))
        return Fe(t, e, n);
    }
    return ((e.flags |= 1), (t = Ve(u, a)), (t.ref = e.ref), (t.return = e), (e.child = t));
  }
  function Xo(t, e, l, a, n) {
    if (t !== null) {
      var u = t.memoizedProps;
      if (nn(u, a) && t.ref === e.ref)
        if (((qt = !1), (e.pendingProps = a = u), af(t, n))) (t.flags & 131072) !== 0 && (qt = !0);
        else return ((e.lanes = t.lanes), Fe(t, e, n));
    }
    return Wc(t, e, l, a, n);
  }
  function Qo(t, e, l, a) {
    var n = a.children,
      u = t !== null ? t.memoizedState : null;
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
        if (((u = u !== null ? u.baseLanes | l : l), t !== null)) {
          for (a = e.child = t.child, n = 0; a !== null; )
            ((n = n | a.lanes | a.childLanes), (a = a.sibling));
          a = n & ~u;
        } else ((a = 0), (e.child = null));
        return Zo(t, e, u, l, a);
      }
      if ((l & 536870912) !== 0)
        ((e.memoizedState = { baseLanes: 0, cachePool: null }),
          t !== null && Tu(e, u !== null ? u.cachePool : null),
          u !== null ? Vr(e, u) : Rc(),
          Kr(e));
      else return ((a = e.lanes = 536870912), Zo(t, e, u !== null ? u.baseLanes | l : l, l, a));
    } else
      u !== null
        ? (Tu(e, u.cachePool), Vr(e, u), gl(), (e.memoizedState = null))
        : (t !== null && Tu(e, null), Rc(), gl());
    return (Kt(t, e, n, l), e.child);
  }
  function bn(t, e) {
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
  function Zo(t, e, l, a, n) {
    var u = bc();
    return (
      (u = u === null ? null : { parent: Ht._currentValue, pool: u }),
      (e.memoizedState = { baseLanes: l, cachePool: u }),
      t !== null && Tu(e, null),
      Rc(),
      Kr(e),
      t !== null && _a(t, e, a, !0),
      (e.childLanes = n),
      null
    );
  }
  function Yu(t, e) {
    return (
      (e = wu({ mode: e.mode, children: e.children }, t.mode)),
      (e.ref = t.ref),
      (t.child = e),
      (e.return = t),
      e
    );
  }
  function Vo(t, e, l) {
    return (
      Wl(e, t.child, null, l),
      (t = Yu(e, e.pendingProps)),
      (t.flags |= 2),
      de(e),
      (e.memoizedState = null),
      t
    );
  }
  function Ky(t, e, l) {
    var a = e.pendingProps,
      n = (e.flags & 128) !== 0;
    if (((e.flags &= -129), t === null)) {
      if (ct) {
        if (a.mode === 'hidden') return ((t = Yu(e, a)), (e.lanes = 536870912), bn(null, t));
        if (
          (Oc(e),
          (t = Tt)
            ? ((t = am(t, ze)),
              (t = t !== null && t.data === '&' ? t : null),
              t !== null &&
                ((e.memoizedState = {
                  dehydrated: t,
                  treeContext: rl !== null ? { id: Be, overflow: qe } : null,
                  retryLane: 536870912,
                  hydrationErrors: null,
                }),
                (l = xr(t)),
                (l.return = e),
                (e.child = l),
                (Zt = e),
                (Tt = null)))
            : (t = null),
          t === null)
        )
          throw dl(e);
        return ((e.lanes = 536870912), null);
      }
      return Yu(e, a);
    }
    var u = t.memoizedState;
    if (u !== null) {
      var c = u.dehydrated;
      if ((Oc(e), n))
        if (e.flags & 256) ((e.flags &= -257), (e = Vo(t, e, l)));
        else if (e.memoizedState !== null) ((e.child = t.child), (e.flags |= 128), (e = null));
        else throw Error(f(558));
      else if ((qt || _a(t, e, l, !1), (n = (l & t.childLanes) !== 0), qt || n)) {
        if (((a = _t), a !== null && ((c = js(a, l)), c !== 0 && c !== u.retryLane)))
          throw ((u.retryLane = c), Xl(t, c), ue(a, t, c), $c);
        (Wu(), (e = Vo(t, e, l)));
      } else
        ((t = u.treeContext),
          (Tt = xe(c.nextSibling)),
          (Zt = e),
          (ct = !0),
          (ol = null),
          (ze = !1),
          t !== null && Cr(e, t),
          (e = Yu(e, a)),
          (e.flags |= 4096));
      return e;
    }
    return (
      (t = Ve(t.child, { mode: a.mode, children: a.children })),
      (t.ref = e.ref),
      (e.child = t),
      (t.return = e),
      t
    );
  }
  function Gu(t, e) {
    var l = e.ref;
    if (l === null) t !== null && t.ref !== null && (e.flags |= 4194816);
    else {
      if (typeof l != 'function' && typeof l != 'object') throw Error(f(284));
      (t === null || t.ref !== l) && (e.flags |= 4194816);
    }
  }
  function Wc(t, e, l, a, n) {
    return (
      Kl(e),
      (l = Cc(t, e, l, a, void 0, n)),
      (a = Dc()),
      t !== null && !qt
        ? (Nc(t, e, n), Fe(t, e, n))
        : (ct && a && oc(e), (e.flags |= 1), Kt(t, e, l, n), e.child)
    );
  }
  function Ko(t, e, l, a, n, u) {
    return (
      Kl(e),
      (e.updateQueue = null),
      (l = Jr(e, a, l, n)),
      kr(t),
      (a = Dc()),
      t !== null && !qt
        ? (Nc(t, e, u), Fe(t, e, u))
        : (ct && a && oc(e), (e.flags |= 1), Kt(t, e, l, u), e.child)
    );
  }
  function ko(t, e, l, a, n) {
    if ((Kl(e), e.stateNode === null)) {
      var u = pa,
        c = l.contextType;
      (typeof c == 'object' && c !== null && (u = Vt(c)),
        (u = new l(a, u)),
        (e.memoizedState = u.state !== null && u.state !== void 0 ? u.state : null),
        (u.updater = kc),
        (e.stateNode = u),
        (u._reactInternals = e),
        (u = e.stateNode),
        (u.props = a),
        (u.state = e.memoizedState),
        (u.refs = {}),
        Ec(e),
        (c = l.contextType),
        (u.context = typeof c == 'object' && c !== null ? Vt(c) : pa),
        (u.state = e.memoizedState),
        (c = l.getDerivedStateFromProps),
        typeof c == 'function' && (Kc(e, l, c, a), (u.state = e.memoizedState)),
        typeof l.getDerivedStateFromProps == 'function' ||
          typeof u.getSnapshotBeforeUpdate == 'function' ||
          (typeof u.UNSAFE_componentWillMount != 'function' &&
            typeof u.componentWillMount != 'function') ||
          ((c = u.state),
          typeof u.componentWillMount == 'function' && u.componentWillMount(),
          typeof u.UNSAFE_componentWillMount == 'function' && u.UNSAFE_componentWillMount(),
          c !== u.state && kc.enqueueReplaceState(u, u.state, null),
          yn(e, a, u, n),
          hn(),
          (u.state = e.memoizedState)),
        typeof u.componentDidMount == 'function' && (e.flags |= 4194308),
        (a = !0));
    } else if (t === null) {
      u = e.stateNode;
      var o = e.memoizedProps,
        h = Il(l, o);
      u.props = h;
      var E = u.context,
        C = l.contextType;
      ((c = pa), typeof C == 'object' && C !== null && (c = Vt(C)));
      var j = l.getDerivedStateFromProps;
      ((C = typeof j == 'function' || typeof u.getSnapshotBeforeUpdate == 'function'),
        (o = e.pendingProps !== o),
        C ||
          (typeof u.UNSAFE_componentWillReceiveProps != 'function' &&
            typeof u.componentWillReceiveProps != 'function') ||
          ((o || E !== c) && Uo(e, u, a, c)),
        (hl = !1));
      var A = e.memoizedState;
      ((u.state = A),
        yn(e, a, u, n),
        hn(),
        (E = e.memoizedState),
        o || A !== E || hl
          ? (typeof j == 'function' && (Kc(e, l, j, a), (E = e.memoizedState)),
            (h = hl || No(e, l, h, a, A, E, c))
              ? (C ||
                  (typeof u.UNSAFE_componentWillMount != 'function' &&
                    typeof u.componentWillMount != 'function') ||
                  (typeof u.componentWillMount == 'function' && u.componentWillMount(),
                  typeof u.UNSAFE_componentWillMount == 'function' &&
                    u.UNSAFE_componentWillMount()),
                typeof u.componentDidMount == 'function' && (e.flags |= 4194308))
              : (typeof u.componentDidMount == 'function' && (e.flags |= 4194308),
                (e.memoizedProps = a),
                (e.memoizedState = E)),
            (u.props = a),
            (u.state = E),
            (u.context = c),
            (a = h))
          : (typeof u.componentDidMount == 'function' && (e.flags |= 4194308), (a = !1)));
    } else {
      ((u = e.stateNode),
        Tc(t, e),
        (c = e.memoizedProps),
        (C = Il(l, c)),
        (u.props = C),
        (j = e.pendingProps),
        (A = u.context),
        (E = l.contextType),
        (h = pa),
        typeof E == 'object' && E !== null && (h = Vt(E)),
        (o = l.getDerivedStateFromProps),
        (E = typeof o == 'function' || typeof u.getSnapshotBeforeUpdate == 'function') ||
          (typeof u.UNSAFE_componentWillReceiveProps != 'function' &&
            typeof u.componentWillReceiveProps != 'function') ||
          ((c !== j || A !== h) && Uo(e, u, a, h)),
        (hl = !1),
        (A = e.memoizedState),
        (u.state = A),
        yn(e, a, u, n),
        hn());
      var x = e.memoizedState;
      c !== j || A !== x || hl || (t !== null && t.dependencies !== null && _u(t.dependencies))
        ? (typeof o == 'function' && (Kc(e, l, o, a), (x = e.memoizedState)),
          (C =
            hl ||
            No(e, l, C, a, A, x, h) ||
            (t !== null && t.dependencies !== null && _u(t.dependencies)))
            ? (E ||
                (typeof u.UNSAFE_componentWillUpdate != 'function' &&
                  typeof u.componentWillUpdate != 'function') ||
                (typeof u.componentWillUpdate == 'function' && u.componentWillUpdate(a, x, h),
                typeof u.UNSAFE_componentWillUpdate == 'function' &&
                  u.UNSAFE_componentWillUpdate(a, x, h)),
              typeof u.componentDidUpdate == 'function' && (e.flags |= 4),
              typeof u.getSnapshotBeforeUpdate == 'function' && (e.flags |= 1024))
            : (typeof u.componentDidUpdate != 'function' ||
                (c === t.memoizedProps && A === t.memoizedState) ||
                (e.flags |= 4),
              typeof u.getSnapshotBeforeUpdate != 'function' ||
                (c === t.memoizedProps && A === t.memoizedState) ||
                (e.flags |= 1024),
              (e.memoizedProps = a),
              (e.memoizedState = x)),
          (u.props = a),
          (u.state = x),
          (u.context = h),
          (a = C))
        : (typeof u.componentDidUpdate != 'function' ||
            (c === t.memoizedProps && A === t.memoizedState) ||
            (e.flags |= 4),
          typeof u.getSnapshotBeforeUpdate != 'function' ||
            (c === t.memoizedProps && A === t.memoizedState) ||
            (e.flags |= 1024),
          (a = !1));
    }
    return (
      (u = a),
      Gu(t, e),
      (a = (e.flags & 128) !== 0),
      u || a
        ? ((u = e.stateNode),
          (l = a && typeof l.getDerivedStateFromError != 'function' ? null : u.render()),
          (e.flags |= 1),
          t !== null && a
            ? ((e.child = Wl(e, t.child, null, n)), (e.child = Wl(e, null, l, n)))
            : Kt(t, e, l, n),
          (e.memoizedState = u.state),
          (t = e.child))
        : (t = Fe(t, e, n)),
      t
    );
  }
  function Jo(t, e, l, a) {
    return (Zl(), (e.flags |= 256), Kt(t, e, l, a), e.child);
  }
  var Fc = { dehydrated: null, treeContext: null, retryLane: 0, hydrationErrors: null };
  function Ic(t) {
    return { baseLanes: t, cachePool: Br() };
  }
  function Pc(t, e, l) {
    return ((t = t !== null ? t.childLanes & ~l : 0), e && (t |= he), t);
  }
  function $o(t, e, l) {
    var a = e.pendingProps,
      n = !1,
      u = (e.flags & 128) !== 0,
      c;
    if (
      ((c = u) || (c = t !== null && t.memoizedState === null ? !1 : (Nt.current & 2) !== 0),
      c && ((n = !0), (e.flags &= -129)),
      (c = (e.flags & 32) !== 0),
      (e.flags &= -33),
      t === null)
    ) {
      if (ct) {
        if (
          (n ? pl(e) : gl(),
          (t = Tt)
            ? ((t = am(t, ze)),
              (t = t !== null && t.data !== '&' ? t : null),
              t !== null &&
                ((e.memoizedState = {
                  dehydrated: t,
                  treeContext: rl !== null ? { id: Be, overflow: qe } : null,
                  retryLane: 536870912,
                  hydrationErrors: null,
                }),
                (l = xr(t)),
                (l.return = e),
                (e.child = l),
                (Zt = e),
                (Tt = null)))
            : (t = null),
          t === null)
        )
          throw dl(e);
        return (Bf(t) ? (e.lanes = 32) : (e.lanes = 536870912), null);
      }
      var o = a.children;
      return (
        (a = a.fallback),
        n
          ? (gl(),
            (n = e.mode),
            (o = wu({ mode: 'hidden', children: o }, n)),
            (a = Ql(a, n, l, null)),
            (o.return = e),
            (a.return = e),
            (o.sibling = a),
            (e.child = o),
            (a = e.child),
            (a.memoizedState = Ic(l)),
            (a.childLanes = Pc(t, c, l)),
            (e.memoizedState = Fc),
            bn(null, a))
          : (pl(e), tf(e, o))
      );
    }
    var h = t.memoizedState;
    if (h !== null && ((o = h.dehydrated), o !== null)) {
      if (u)
        e.flags & 256
          ? (pl(e), (e.flags &= -257), (e = ef(t, e, l)))
          : e.memoizedState !== null
            ? (gl(), (e.child = t.child), (e.flags |= 128), (e = null))
            : (gl(),
              (o = a.fallback),
              (n = e.mode),
              (a = wu({ mode: 'visible', children: a.children }, n)),
              (o = Ql(o, n, l, null)),
              (o.flags |= 2),
              (a.return = e),
              (o.return = e),
              (a.sibling = o),
              (e.child = a),
              Wl(e, t.child, null, l),
              (a = e.child),
              (a.memoizedState = Ic(l)),
              (a.childLanes = Pc(t, c, l)),
              (e.memoizedState = Fc),
              (e = bn(null, a)));
      else if ((pl(e), Bf(o))) {
        if (((c = o.nextSibling && o.nextSibling.dataset), c)) var E = c.dgst;
        ((c = E),
          (a = Error(f(419))),
          (a.stack = ''),
          (a.digest = c),
          fn({ value: a, source: null, stack: null }),
          (e = ef(t, e, l)));
      } else if ((qt || _a(t, e, l, !1), (c = (l & t.childLanes) !== 0), qt || c)) {
        if (((c = _t), c !== null && ((a = js(c, l)), a !== 0 && a !== h.retryLane)))
          throw ((h.retryLane = a), Xl(t, a), ue(c, t, a), $c);
        (Hf(o) || Wu(), (e = ef(t, e, l)));
      } else
        Hf(o)
          ? ((e.flags |= 192), (e.child = t.child), (e = null))
          : ((t = h.treeContext),
            (Tt = xe(o.nextSibling)),
            (Zt = e),
            (ct = !0),
            (ol = null),
            (ze = !1),
            t !== null && Cr(e, t),
            (e = tf(e, a.children)),
            (e.flags |= 4096));
      return e;
    }
    return n
      ? (gl(),
        (o = a.fallback),
        (n = e.mode),
        (h = t.child),
        (E = h.sibling),
        (a = Ve(h, { mode: 'hidden', children: a.children })),
        (a.subtreeFlags = h.subtreeFlags & 65011712),
        E !== null ? (o = Ve(E, o)) : ((o = Ql(o, n, l, null)), (o.flags |= 2)),
        (o.return = e),
        (a.return = e),
        (a.sibling = o),
        (e.child = a),
        bn(null, a),
        (a = e.child),
        (o = t.child.memoizedState),
        o === null
          ? (o = Ic(l))
          : ((n = o.cachePool),
            n !== null
              ? ((h = Ht._currentValue), (n = n.parent !== h ? { parent: h, pool: h } : n))
              : (n = Br()),
            (o = { baseLanes: o.baseLanes | l, cachePool: n })),
        (a.memoizedState = o),
        (a.childLanes = Pc(t, c, l)),
        (e.memoizedState = Fc),
        bn(t.child, a))
      : (pl(e),
        (l = t.child),
        (t = l.sibling),
        (l = Ve(l, { mode: 'visible', children: a.children })),
        (l.return = e),
        (l.sibling = null),
        t !== null &&
          ((c = e.deletions), c === null ? ((e.deletions = [t]), (e.flags |= 16)) : c.push(t)),
        (e.child = l),
        (e.memoizedState = null),
        l);
  }
  function tf(t, e) {
    return ((e = wu({ mode: 'visible', children: e }, t.mode)), (e.return = t), (t.child = e));
  }
  function wu(t, e) {
    return ((t = re(22, t, null, e)), (t.lanes = 0), t);
  }
  function ef(t, e, l) {
    return (
      Wl(e, t.child, null, l),
      (t = tf(e, e.pendingProps.children)),
      (t.flags |= 2),
      (e.memoizedState = null),
      t
    );
  }
  function Wo(t, e, l) {
    t.lanes |= e;
    var a = t.alternate;
    (a !== null && (a.lanes |= e), vc(t.return, e, l));
  }
  function lf(t, e, l, a, n, u) {
    var c = t.memoizedState;
    c === null
      ? (t.memoizedState = {
          isBackwards: e,
          rendering: null,
          renderingStartTime: 0,
          last: a,
          tail: l,
          tailMode: n,
          treeForkCount: u,
        })
      : ((c.isBackwards = e),
        (c.rendering = null),
        (c.renderingStartTime = 0),
        (c.last = a),
        (c.tail = l),
        (c.tailMode = n),
        (c.treeForkCount = u));
  }
  function Fo(t, e, l) {
    var a = e.pendingProps,
      n = a.revealOrder,
      u = a.tail;
    a = a.children;
    var c = Nt.current,
      o = (c & 2) !== 0;
    if (
      (o ? ((c = (c & 1) | 2), (e.flags |= 128)) : (c &= 1),
      Y(Nt, c),
      Kt(t, e, a, l),
      (a = ct ? cn : 0),
      !o && t !== null && (t.flags & 128) !== 0)
    )
      t: for (t = e.child; t !== null; ) {
        if (t.tag === 13) t.memoizedState !== null && Wo(t, l, e);
        else if (t.tag === 19) Wo(t, l, e);
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
    switch (n) {
      case 'forwards':
        for (l = e.child, n = null; l !== null; )
          ((t = l.alternate), t !== null && Mu(t) === null && (n = l), (l = l.sibling));
        ((l = n),
          l === null ? ((n = e.child), (e.child = null)) : ((n = l.sibling), (l.sibling = null)),
          lf(e, !1, n, l, u, a));
        break;
      case 'backwards':
      case 'unstable_legacy-backwards':
        for (l = null, n = e.child, e.child = null; n !== null; ) {
          if (((t = n.alternate), t !== null && Mu(t) === null)) {
            e.child = n;
            break;
          }
          ((t = n.sibling), (n.sibling = l), (l = n), (n = t));
        }
        lf(e, !0, l, null, u, a);
        break;
      case 'together':
        lf(e, !1, null, null, void 0, a);
        break;
      default:
        e.memoizedState = null;
    }
    return e.child;
  }
  function Fe(t, e, l) {
    if (
      (t !== null && (e.dependencies = t.dependencies), (_l |= e.lanes), (l & e.childLanes) === 0)
    )
      if (t !== null) {
        if ((_a(t, e, l, !1), (l & e.childLanes) === 0)) return null;
      } else return null;
    if (t !== null && e.child !== t.child) throw Error(f(153));
    if (e.child !== null) {
      for (t = e.child, l = Ve(t, t.pendingProps), e.child = l, l.return = e; t.sibling !== null; )
        ((t = t.sibling), (l = l.sibling = Ve(t, t.pendingProps)), (l.return = e));
      l.sibling = null;
    }
    return e.child;
  }
  function af(t, e) {
    return (t.lanes & e) !== 0 ? !0 : ((t = t.dependencies), !!(t !== null && _u(t)));
  }
  function ky(t, e, l) {
    switch (e.tag) {
      case 3:
        (Ft(e, e.stateNode.containerInfo), ml(e, Ht, t.memoizedState.cache), Zl());
        break;
      case 27:
      case 5:
        Va(e);
        break;
      case 4:
        Ft(e, e.stateNode.containerInfo);
        break;
      case 10:
        ml(e, e.type, e.memoizedProps.value);
        break;
      case 31:
        if (e.memoizedState !== null) return ((e.flags |= 128), Oc(e), null);
        break;
      case 13:
        var a = e.memoizedState;
        if (a !== null)
          return a.dehydrated !== null
            ? (pl(e), (e.flags |= 128), null)
            : (l & e.child.childLanes) !== 0
              ? $o(t, e, l)
              : (pl(e), (t = Fe(t, e, l)), t !== null ? t.sibling : null);
        pl(e);
        break;
      case 19:
        var n = (t.flags & 128) !== 0;
        if (
          ((a = (l & e.childLanes) !== 0),
          a || (_a(t, e, l, !1), (a = (l & e.childLanes) !== 0)),
          n)
        ) {
          if (a) return Fo(t, e, l);
          e.flags |= 128;
        }
        if (
          ((n = e.memoizedState),
          n !== null && ((n.rendering = null), (n.tail = null), (n.lastEffect = null)),
          Y(Nt, Nt.current),
          a)
        )
          break;
        return null;
      case 22:
        return ((e.lanes = 0), Qo(t, e, l, e.pendingProps));
      case 24:
        ml(e, Ht, t.memoizedState.cache);
    }
    return Fe(t, e, l);
  }
  function Io(t, e, l) {
    if (t !== null)
      if (t.memoizedProps !== e.pendingProps) qt = !0;
      else {
        if (!af(t, l) && (e.flags & 128) === 0) return ((qt = !1), ky(t, e, l));
        qt = (t.flags & 131072) !== 0;
      }
    else ((qt = !1), ct && (e.flags & 1048576) !== 0 && Mr(e, cn, e.index));
    switch (((e.lanes = 0), e.tag)) {
      case 16:
        t: {
          var a = e.pendingProps;
          if (((t = Jl(e.elementType)), (e.type = t), typeof t == 'function'))
            fc(t)
              ? ((a = Il(t, a)), (e.tag = 1), (e = ko(null, e, t, a, l)))
              : ((e.tag = 0), (e = Wc(null, e, t, a, l)));
          else {
            if (t != null) {
              var n = t.$$typeof;
              if (n === yt) {
                ((e.tag = 11), (e = Go(null, e, t, a, l)));
                break t;
              } else if (n === F) {
                ((e.tag = 14), (e = wo(null, e, t, a, l)));
                break t;
              }
            }
            throw ((e = ge(t) || t), Error(f(306, e, '')));
          }
        }
        return e;
      case 0:
        return Wc(t, e, e.type, e.pendingProps, l);
      case 1:
        return ((a = e.type), (n = Il(a, e.pendingProps)), ko(t, e, a, n, l));
      case 3:
        t: {
          if ((Ft(e, e.stateNode.containerInfo), t === null)) throw Error(f(387));
          a = e.pendingProps;
          var u = e.memoizedState;
          ((n = u.element), Tc(t, e), yn(e, a, null, l));
          var c = e.memoizedState;
          if (
            ((a = c.cache),
            ml(e, Ht, a),
            a !== u.cache && pc(e, [Ht], l, !0),
            hn(),
            (a = c.element),
            u.isDehydrated)
          )
            if (
              ((u = { element: a, isDehydrated: !1, cache: c.cache }),
              (e.updateQueue.baseState = u),
              (e.memoizedState = u),
              e.flags & 256)
            ) {
              e = Jo(t, e, a, l);
              break t;
            } else if (a !== n) {
              ((n = Ee(Error(f(424)), e)), fn(n), (e = Jo(t, e, a, l)));
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
                Tt = xe(t.firstChild),
                  Zt = e,
                  ct = !0,
                  ol = null,
                  ze = !0,
                  l = Xr(e, null, a, l),
                  e.child = l;
                l;
              )
                ((l.flags = (l.flags & -3) | 4096), (l = l.sibling));
            }
          else {
            if ((Zl(), a === n)) {
              e = Fe(t, e, l);
              break t;
            }
            Kt(t, e, a, l);
          }
          e = e.child;
        }
        return e;
      case 26:
        return (
          Gu(t, e),
          t === null
            ? (l = sm(e.type, null, e.pendingProps, null))
              ? (e.memoizedState = l)
              : ct ||
                ((l = e.type),
                (t = e.pendingProps),
                (a = ai(lt.current).createElement(l)),
                (a[Qt] = e),
                (a[Pt] = t),
                kt(a, l, t),
                wt(a),
                (e.stateNode = a))
            : (e.memoizedState = sm(e.type, t.memoizedProps, e.pendingProps, t.memoizedState)),
          null
        );
      case 27:
        return (
          Va(e),
          t === null &&
            ct &&
            ((a = e.stateNode = im(e.type, e.pendingProps, lt.current)),
            (Zt = e),
            (ze = !0),
            (n = Tt),
            Rl(e.type) ? ((qf = n), (Tt = xe(a.firstChild))) : (Tt = n)),
          Kt(t, e, e.pendingProps.children, l),
          Gu(t, e),
          t === null && (e.flags |= 4194304),
          e.child
        );
      case 5:
        return (
          t === null &&
            ct &&
            ((n = a = Tt) &&
              ((a = Tv(a, e.type, e.pendingProps, ze)),
              a !== null
                ? ((e.stateNode = a), (Zt = e), (Tt = xe(a.firstChild)), (ze = !1), (n = !0))
                : (n = !1)),
            n || dl(e)),
          Va(e),
          (n = e.type),
          (u = e.pendingProps),
          (c = t !== null ? t.memoizedProps : null),
          (a = u.children),
          Nf(n, u) ? (a = null) : c !== null && Nf(n, c) && (e.flags |= 32),
          e.memoizedState !== null && ((n = Cc(t, e, Ly, null, null, l)), (Hn._currentValue = n)),
          Gu(t, e),
          Kt(t, e, a, l),
          e.child
        );
      case 6:
        return (
          t === null &&
            ct &&
            ((t = l = Tt) &&
              ((l = Av(l, e.pendingProps, ze)),
              l !== null ? ((e.stateNode = l), (Zt = e), (Tt = null), (t = !0)) : (t = !1)),
            t || dl(e)),
          null
        );
      case 13:
        return $o(t, e, l);
      case 4:
        return (
          Ft(e, e.stateNode.containerInfo),
          (a = e.pendingProps),
          t === null ? (e.child = Wl(e, null, a, l)) : Kt(t, e, a, l),
          e.child
        );
      case 11:
        return Go(t, e, e.type, e.pendingProps, l);
      case 7:
        return (Kt(t, e, e.pendingProps, l), e.child);
      case 8:
        return (Kt(t, e, e.pendingProps.children, l), e.child);
      case 12:
        return (Kt(t, e, e.pendingProps.children, l), e.child);
      case 10:
        return ((a = e.pendingProps), ml(e, e.type, a.value), Kt(t, e, a.children, l), e.child);
      case 9:
        return (
          (n = e.type._context),
          (a = e.pendingProps.children),
          Kl(e),
          (n = Vt(n)),
          (a = a(n)),
          (e.flags |= 1),
          Kt(t, e, a, l),
          e.child
        );
      case 14:
        return wo(t, e, e.type, e.pendingProps, l);
      case 15:
        return Xo(t, e, e.type, e.pendingProps, l);
      case 19:
        return Fo(t, e, l);
      case 31:
        return Ky(t, e, l);
      case 22:
        return Qo(t, e, l, e.pendingProps);
      case 24:
        return (
          Kl(e),
          (a = Vt(Ht)),
          t === null
            ? ((n = bc()),
              n === null &&
                ((n = _t),
                (u = gc()),
                (n.pooledCache = u),
                u.refCount++,
                u !== null && (n.pooledCacheLanes |= l),
                (n = u)),
              (e.memoizedState = { parent: a, cache: n }),
              Ec(e),
              ml(e, Ht, n))
            : ((t.lanes & l) !== 0 && (Tc(t, e), yn(e, null, null, l), hn()),
              (n = t.memoizedState),
              (u = e.memoizedState),
              n.parent !== a
                ? ((n = { parent: a, cache: a }),
                  (e.memoizedState = n),
                  e.lanes === 0 && (e.memoizedState = e.updateQueue.baseState = n),
                  ml(e, Ht, a))
                : ((a = u.cache), ml(e, Ht, a), a !== n.cache && pc(e, [Ht], l, !0))),
          Kt(t, e, e.pendingProps.children, l),
          e.child
        );
      case 29:
        throw e.pendingProps;
    }
    throw Error(f(156, e.tag));
  }
  function Ie(t) {
    t.flags |= 4;
  }
  function nf(t, e, l, a, n) {
    if (((e = (t.mode & 32) !== 0) && (e = !1), e)) {
      if (((t.flags |= 16777216), (n & 335544128) === n))
        if (t.stateNode.complete) t.flags |= 8192;
        else if (zd()) t.flags |= 8192;
        else throw (($l = zu), _c);
    } else t.flags &= -16777217;
  }
  function Po(t, e) {
    if (e.type !== 'stylesheet' || (e.state.loading & 4) !== 0) t.flags &= -16777217;
    else if (((t.flags |= 16777216), !hm(e)))
      if (zd()) t.flags |= 8192;
      else throw (($l = zu), _c);
  }
  function Xu(t, e) {
    (e !== null && (t.flags |= 4),
      t.flags & 16384 && ((e = t.tag !== 22 ? Ds() : 536870912), (t.lanes |= e), (Ua |= e)));
  }
  function _n(t, e) {
    if (!ct)
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
  function At(t) {
    var e = t.alternate !== null && t.alternate.child === t.child,
      l = 0,
      a = 0;
    if (e)
      for (var n = t.child; n !== null; )
        ((l |= n.lanes | n.childLanes),
          (a |= n.subtreeFlags & 65011712),
          (a |= n.flags & 65011712),
          (n.return = t),
          (n = n.sibling));
    else
      for (n = t.child; n !== null; )
        ((l |= n.lanes | n.childLanes),
          (a |= n.subtreeFlags),
          (a |= n.flags),
          (n.return = t),
          (n = n.sibling));
    return ((t.subtreeFlags |= a), (t.childLanes = l), e);
  }
  function Jy(t, e, l) {
    var a = e.pendingProps;
    switch ((dc(e), e.tag)) {
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return (At(e), null);
      case 1:
        return (At(e), null);
      case 3:
        return (
          (l = e.stateNode),
          (a = null),
          t !== null && (a = t.memoizedState.cache),
          e.memoizedState.cache !== a && (e.flags |= 2048),
          Je(Ht),
          Dt(),
          l.pendingContext && ((l.context = l.pendingContext), (l.pendingContext = null)),
          (t === null || t.child === null) &&
            (ba(e)
              ? Ie(e)
              : t === null ||
                (t.memoizedState.isDehydrated && (e.flags & 256) === 0) ||
                ((e.flags |= 1024), hc())),
          At(e),
          null
        );
      case 26:
        var n = e.type,
          u = e.memoizedState;
        return (
          t === null
            ? (Ie(e), u !== null ? (At(e), Po(e, u)) : (At(e), nf(e, n, null, a, l)))
            : u
              ? u !== t.memoizedState
                ? (Ie(e), At(e), Po(e, u))
                : (At(e), (e.flags &= -16777217))
              : ((t = t.memoizedProps), t !== a && Ie(e), At(e), nf(e, n, t, a, l)),
          null
        );
      case 27:
        if ((Pn(e), (l = lt.current), (n = e.type), t !== null && e.stateNode != null))
          t.memoizedProps !== a && Ie(e);
        else {
          if (!a) {
            if (e.stateNode === null) throw Error(f(166));
            return (At(e), null);
          }
          ((t = Q.current), ba(e) ? Dr(e) : ((t = im(n, a, l)), (e.stateNode = t), Ie(e)));
        }
        return (At(e), null);
      case 5:
        if ((Pn(e), (n = e.type), t !== null && e.stateNode != null))
          t.memoizedProps !== a && Ie(e);
        else {
          if (!a) {
            if (e.stateNode === null) throw Error(f(166));
            return (At(e), null);
          }
          if (((u = Q.current), ba(e))) Dr(e);
          else {
            var c = ai(lt.current);
            switch (u) {
              case 1:
                u = c.createElementNS('http://www.w3.org/2000/svg', n);
                break;
              case 2:
                u = c.createElementNS('http://www.w3.org/1998/Math/MathML', n);
                break;
              default:
                switch (n) {
                  case 'svg':
                    u = c.createElementNS('http://www.w3.org/2000/svg', n);
                    break;
                  case 'math':
                    u = c.createElementNS('http://www.w3.org/1998/Math/MathML', n);
                    break;
                  case 'script':
                    ((u = c.createElement('div')),
                      (u.innerHTML = '<script><\/script>'),
                      (u = u.removeChild(u.firstChild)));
                    break;
                  case 'select':
                    ((u =
                      typeof a.is == 'string'
                        ? c.createElement('select', { is: a.is })
                        : c.createElement('select')),
                      a.multiple ? (u.multiple = !0) : a.size && (u.size = a.size));
                    break;
                  default:
                    u =
                      typeof a.is == 'string'
                        ? c.createElement(n, { is: a.is })
                        : c.createElement(n);
                }
            }
            ((u[Qt] = e), (u[Pt] = a));
            t: for (c = e.child; c !== null; ) {
              if (c.tag === 5 || c.tag === 6) u.appendChild(c.stateNode);
              else if (c.tag !== 4 && c.tag !== 27 && c.child !== null) {
                ((c.child.return = c), (c = c.child));
                continue;
              }
              if (c === e) break t;
              for (; c.sibling === null; ) {
                if (c.return === null || c.return === e) break t;
                c = c.return;
              }
              ((c.sibling.return = c.return), (c = c.sibling));
            }
            e.stateNode = u;
            t: switch ((kt(u, n, a), n)) {
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
            a && Ie(e);
          }
        }
        return (At(e), nf(e, e.type, t === null ? null : t.memoizedProps, e.pendingProps, l), null);
      case 6:
        if (t && e.stateNode != null) t.memoizedProps !== a && Ie(e);
        else {
          if (typeof a != 'string' && e.stateNode === null) throw Error(f(166));
          if (((t = lt.current), ba(e))) {
            if (((t = e.stateNode), (l = e.memoizedProps), (a = null), (n = Zt), n !== null))
              switch (n.tag) {
                case 27:
                case 5:
                  a = n.memoizedProps;
              }
            ((t[Qt] = e),
              (t = !!(
                t.nodeValue === l ||
                (a !== null && a.suppressHydrationWarning === !0) ||
                $d(t.nodeValue, l)
              )),
              t || dl(e, !0));
          } else ((t = ai(t).createTextNode(a)), (t[Qt] = e), (e.stateNode = t));
        }
        return (At(e), null);
      case 31:
        if (((l = e.memoizedState), t === null || t.memoizedState !== null)) {
          if (((a = ba(e)), l !== null)) {
            if (t === null) {
              if (!a) throw Error(f(318));
              if (((t = e.memoizedState), (t = t !== null ? t.dehydrated : null), !t))
                throw Error(f(557));
              t[Qt] = e;
            } else (Zl(), (e.flags & 128) === 0 && (e.memoizedState = null), (e.flags |= 4));
            (At(e), (t = !1));
          } else
            ((l = hc()),
              t !== null && t.memoizedState !== null && (t.memoizedState.hydrationErrors = l),
              (t = !0));
          if (!t) return e.flags & 256 ? (de(e), e) : (de(e), null);
          if ((e.flags & 128) !== 0) throw Error(f(558));
        }
        return (At(e), null);
      case 13:
        if (
          ((a = e.memoizedState),
          t === null || (t.memoizedState !== null && t.memoizedState.dehydrated !== null))
        ) {
          if (((n = ba(e)), a !== null && a.dehydrated !== null)) {
            if (t === null) {
              if (!n) throw Error(f(318));
              if (((n = e.memoizedState), (n = n !== null ? n.dehydrated : null), !n))
                throw Error(f(317));
              n[Qt] = e;
            } else (Zl(), (e.flags & 128) === 0 && (e.memoizedState = null), (e.flags |= 4));
            (At(e), (n = !1));
          } else
            ((n = hc()),
              t !== null && t.memoizedState !== null && (t.memoizedState.hydrationErrors = n),
              (n = !0));
          if (!n) return e.flags & 256 ? (de(e), e) : (de(e), null);
        }
        return (
          de(e),
          (e.flags & 128) !== 0
            ? ((e.lanes = l), e)
            : ((l = a !== null),
              (t = t !== null && t.memoizedState !== null),
              l &&
                ((a = e.child),
                (n = null),
                a.alternate !== null &&
                  a.alternate.memoizedState !== null &&
                  a.alternate.memoizedState.cachePool !== null &&
                  (n = a.alternate.memoizedState.cachePool.pool),
                (u = null),
                a.memoizedState !== null &&
                  a.memoizedState.cachePool !== null &&
                  (u = a.memoizedState.cachePool.pool),
                u !== n && (a.flags |= 2048)),
              l !== t && l && (e.child.flags |= 8192),
              Xu(e, e.updateQueue),
              At(e),
              null)
        );
      case 4:
        return (Dt(), t === null && xf(e.stateNode.containerInfo), At(e), null);
      case 10:
        return (Je(e.type), At(e), null);
      case 19:
        if ((H(Nt), (a = e.memoizedState), a === null)) return (At(e), null);
        if (((n = (e.flags & 128) !== 0), (u = a.rendering), u === null))
          if (n) _n(a, !1);
          else {
            if (Mt !== 0 || (t !== null && (t.flags & 128) !== 0))
              for (t = e.child; t !== null; ) {
                if (((u = Mu(t)), u !== null)) {
                  for (
                    e.flags |= 128,
                      _n(a, !1),
                      t = u.updateQueue,
                      e.updateQueue = t,
                      Xu(e, t),
                      e.subtreeFlags = 0,
                      t = l,
                      l = e.child;
                    l !== null;
                  )
                    (Rr(l, t), (l = l.sibling));
                  return (Y(Nt, (Nt.current & 1) | 2), ct && Ke(e, a.treeForkCount), e.child);
                }
                t = t.sibling;
              }
            a.tail !== null &&
              ie() > ku &&
              ((e.flags |= 128), (n = !0), _n(a, !1), (e.lanes = 4194304));
          }
        else {
          if (!n)
            if (((t = Mu(u)), t !== null)) {
              if (
                ((e.flags |= 128),
                (n = !0),
                (t = t.updateQueue),
                (e.updateQueue = t),
                Xu(e, t),
                _n(a, !0),
                a.tail === null && a.tailMode === 'hidden' && !u.alternate && !ct)
              )
                return (At(e), null);
            } else
              2 * ie() - a.renderingStartTime > ku &&
                l !== 536870912 &&
                ((e.flags |= 128), (n = !0), _n(a, !1), (e.lanes = 4194304));
          a.isBackwards
            ? ((u.sibling = e.child), (e.child = u))
            : ((t = a.last), t !== null ? (t.sibling = u) : (e.child = u), (a.last = u));
        }
        return a.tail !== null
          ? ((t = a.tail),
            (a.rendering = t),
            (a.tail = t.sibling),
            (a.renderingStartTime = ie()),
            (t.sibling = null),
            (l = Nt.current),
            Y(Nt, n ? (l & 1) | 2 : l & 1),
            ct && Ke(e, a.treeForkCount),
            t)
          : (At(e), null);
      case 22:
      case 23:
        return (
          de(e),
          xc(),
          (a = e.memoizedState !== null),
          t !== null
            ? (t.memoizedState !== null) !== a && (e.flags |= 8192)
            : a && (e.flags |= 8192),
          a
            ? (l & 536870912) !== 0 &&
              (e.flags & 128) === 0 &&
              (At(e), e.subtreeFlags & 6 && (e.flags |= 8192))
            : At(e),
          (l = e.updateQueue),
          l !== null && Xu(e, l.retryQueue),
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
          t !== null && H(kl),
          null
        );
      case 24:
        return (
          (l = null),
          t !== null && (l = t.memoizedState.cache),
          e.memoizedState.cache !== l && (e.flags |= 2048),
          Je(Ht),
          At(e),
          null
        );
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(f(156, e.tag));
  }
  function $y(t, e) {
    switch ((dc(e), e.tag)) {
      case 1:
        return ((t = e.flags), t & 65536 ? ((e.flags = (t & -65537) | 128), e) : null);
      case 3:
        return (
          Je(Ht),
          Dt(),
          (t = e.flags),
          (t & 65536) !== 0 && (t & 128) === 0 ? ((e.flags = (t & -65537) | 128), e) : null
        );
      case 26:
      case 27:
      case 5:
        return (Pn(e), null);
      case 31:
        if (e.memoizedState !== null) {
          if ((de(e), e.alternate === null)) throw Error(f(340));
          Zl();
        }
        return ((t = e.flags), t & 65536 ? ((e.flags = (t & -65537) | 128), e) : null);
      case 13:
        if ((de(e), (t = e.memoizedState), t !== null && t.dehydrated !== null)) {
          if (e.alternate === null) throw Error(f(340));
          Zl();
        }
        return ((t = e.flags), t & 65536 ? ((e.flags = (t & -65537) | 128), e) : null);
      case 19:
        return (H(Nt), null);
      case 4:
        return (Dt(), null);
      case 10:
        return (Je(e.type), null);
      case 22:
      case 23:
        return (
          de(e),
          xc(),
          t !== null && H(kl),
          (t = e.flags),
          t & 65536 ? ((e.flags = (t & -65537) | 128), e) : null
        );
      case 24:
        return (Je(Ht), null);
      case 25:
        return null;
      default:
        return null;
    }
  }
  function td(t, e) {
    switch ((dc(e), e.tag)) {
      case 3:
        (Je(Ht), Dt());
        break;
      case 26:
      case 27:
      case 5:
        Pn(e);
        break;
      case 4:
        Dt();
        break;
      case 31:
        e.memoizedState !== null && de(e);
        break;
      case 13:
        de(e);
        break;
      case 19:
        H(Nt);
        break;
      case 10:
        Je(e.type);
        break;
      case 22:
      case 23:
        (de(e), xc(), t !== null && H(kl));
        break;
      case 24:
        Je(Ht);
    }
  }
  function En(t, e) {
    try {
      var l = e.updateQueue,
        a = l !== null ? l.lastEffect : null;
      if (a !== null) {
        var n = a.next;
        l = n;
        do {
          if ((l.tag & t) === t) {
            a = void 0;
            var u = l.create,
              c = l.inst;
            ((a = u()), (c.destroy = a));
          }
          l = l.next;
        } while (l !== n);
      }
    } catch (o) {
      ht(e, e.return, o);
    }
  }
  function Sl(t, e, l) {
    try {
      var a = e.updateQueue,
        n = a !== null ? a.lastEffect : null;
      if (n !== null) {
        var u = n.next;
        a = u;
        do {
          if ((a.tag & t) === t) {
            var c = a.inst,
              o = c.destroy;
            if (o !== void 0) {
              ((c.destroy = void 0), (n = e));
              var h = l,
                E = o;
              try {
                E();
              } catch (C) {
                ht(n, h, C);
              }
            }
          }
          a = a.next;
        } while (a !== u);
      }
    } catch (C) {
      ht(e, e.return, C);
    }
  }
  function ed(t) {
    var e = t.updateQueue;
    if (e !== null) {
      var l = t.stateNode;
      try {
        Zr(e, l);
      } catch (a) {
        ht(t, t.return, a);
      }
    }
  }
  function ld(t, e, l) {
    ((l.props = Il(t.type, t.memoizedProps)), (l.state = t.memoizedState));
    try {
      l.componentWillUnmount();
    } catch (a) {
      ht(t, e, a);
    }
  }
  function Tn(t, e) {
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
    } catch (n) {
      ht(t, e, n);
    }
  }
  function Le(t, e) {
    var l = t.ref,
      a = t.refCleanup;
    if (l !== null)
      if (typeof a == 'function')
        try {
          a();
        } catch (n) {
          ht(t, e, n);
        } finally {
          ((t.refCleanup = null), (t = t.alternate), t != null && (t.refCleanup = null));
        }
      else if (typeof l == 'function')
        try {
          l(null);
        } catch (n) {
          ht(t, e, n);
        }
      else l.current = null;
  }
  function ad(t) {
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
    } catch (n) {
      ht(t, t.return, n);
    }
  }
  function uf(t, e, l) {
    try {
      var a = t.stateNode;
      (pv(a, t.type, l, e), (a[Pt] = e));
    } catch (n) {
      ht(t, t.return, n);
    }
  }
  function nd(t) {
    return (
      t.tag === 5 || t.tag === 3 || t.tag === 26 || (t.tag === 27 && Rl(t.type)) || t.tag === 4
    );
  }
  function cf(t) {
    t: for (;;) {
      for (; t.sibling === null; ) {
        if (t.return === null || nd(t.return)) return null;
        t = t.return;
      }
      for (
        t.sibling.return = t.return, t = t.sibling;
        t.tag !== 5 && t.tag !== 6 && t.tag !== 18;
      ) {
        if ((t.tag === 27 && Rl(t.type)) || t.flags & 2 || t.child === null || t.tag === 4)
          continue t;
        ((t.child.return = t), (t = t.child));
      }
      if (!(t.flags & 2)) return t.stateNode;
    }
  }
  function ff(t, e, l) {
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
            l != null || e.onclick !== null || (e.onclick = Qe)));
    else if (
      a !== 4 &&
      (a === 27 && Rl(t.type) && ((l = t.stateNode), (e = null)), (t = t.child), t !== null)
    )
      for (ff(t, e, l), t = t.sibling; t !== null; ) (ff(t, e, l), (t = t.sibling));
  }
  function Qu(t, e, l) {
    var a = t.tag;
    if (a === 5 || a === 6) ((t = t.stateNode), e ? l.insertBefore(t, e) : l.appendChild(t));
    else if (a !== 4 && (a === 27 && Rl(t.type) && (l = t.stateNode), (t = t.child), t !== null))
      for (Qu(t, e, l), t = t.sibling; t !== null; ) (Qu(t, e, l), (t = t.sibling));
  }
  function ud(t) {
    var e = t.stateNode,
      l = t.memoizedProps;
    try {
      for (var a = t.type, n = e.attributes; n.length; ) e.removeAttributeNode(n[0]);
      (kt(e, a, l), (e[Qt] = t), (e[Pt] = l));
    } catch (u) {
      ht(t, t.return, u);
    }
  }
  var Pe = !1,
    Lt = !1,
    sf = !1,
    id = typeof WeakSet == 'function' ? WeakSet : Set,
    Xt = null;
  function Wy(t, e) {
    if (((t = t.containerInfo), (Cf = ri), (t = pr(t)), ec(t))) {
      if ('selectionStart' in t) var l = { start: t.selectionStart, end: t.selectionEnd };
      else
        t: {
          l = ((l = t.ownerDocument) && l.defaultView) || window;
          var a = l.getSelection && l.getSelection();
          if (a && a.rangeCount !== 0) {
            l = a.anchorNode;
            var n = a.anchorOffset,
              u = a.focusNode;
            a = a.focusOffset;
            try {
              (l.nodeType, u.nodeType);
            } catch {
              l = null;
              break t;
            }
            var c = 0,
              o = -1,
              h = -1,
              E = 0,
              C = 0,
              j = t,
              A = null;
            e: for (;;) {
              for (
                var x;
                j !== l || (n !== 0 && j.nodeType !== 3) || (o = c + n),
                  j !== u || (a !== 0 && j.nodeType !== 3) || (h = c + a),
                  j.nodeType === 3 && (c += j.nodeValue.length),
                  (x = j.firstChild) !== null;
              )
                ((A = j), (j = x));
              for (;;) {
                if (j === t) break e;
                if (
                  (A === l && ++E === n && (o = c),
                  A === u && ++C === a && (h = c),
                  (x = j.nextSibling) !== null)
                )
                  break;
                ((j = A), (A = j.parentNode));
              }
              j = x;
            }
            l = o === -1 || h === -1 ? null : { start: o, end: h };
          } else l = null;
        }
      l = l || { start: 0, end: 0 };
    } else l = null;
    for (Df = { focusedElem: t, selectionRange: l }, ri = !1, Xt = e; Xt !== null; )
      if (((e = Xt), (t = e.child), (e.subtreeFlags & 1028) !== 0 && t !== null))
        ((t.return = e), (Xt = t));
      else
        for (; Xt !== null; ) {
          switch (((e = Xt), (u = e.alternate), (t = e.flags), e.tag)) {
            case 0:
              if (
                (t & 4) !== 0 &&
                ((t = e.updateQueue), (t = t !== null ? t.events : null), t !== null)
              )
                for (l = 0; l < t.length; l++) ((n = t[l]), (n.ref.impl = n.nextImpl));
              break;
            case 11:
            case 15:
              break;
            case 1:
              if ((t & 1024) !== 0 && u !== null) {
                ((t = void 0),
                  (l = e),
                  (n = u.memoizedProps),
                  (u = u.memoizedState),
                  (a = l.stateNode));
                try {
                  var X = Il(l.type, n);
                  ((t = a.getSnapshotBeforeUpdate(X, u)),
                    (a.__reactInternalSnapshotBeforeUpdate = t));
                } catch (J) {
                  ht(l, l.return, J);
                }
              }
              break;
            case 3:
              if ((t & 1024) !== 0) {
                if (((t = e.stateNode.containerInfo), (l = t.nodeType), l === 9)) jf(t);
                else if (l === 1)
                  switch (t.nodeName) {
                    case 'HEAD':
                    case 'HTML':
                    case 'BODY':
                      jf(t);
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
              if ((t & 1024) !== 0) throw Error(f(163));
          }
          if (((t = e.sibling), t !== null)) {
            ((t.return = e.return), (Xt = t));
            break;
          }
          Xt = e.return;
        }
  }
  function cd(t, e, l) {
    var a = l.flags;
    switch (l.tag) {
      case 0:
      case 11:
      case 15:
        (el(t, l), a & 4 && En(5, l));
        break;
      case 1:
        if ((el(t, l), a & 4))
          if (((t = l.stateNode), e === null))
            try {
              t.componentDidMount();
            } catch (c) {
              ht(l, l.return, c);
            }
          else {
            var n = Il(l.type, e.memoizedProps);
            e = e.memoizedState;
            try {
              t.componentDidUpdate(n, e, t.__reactInternalSnapshotBeforeUpdate);
            } catch (c) {
              ht(l, l.return, c);
            }
          }
        (a & 64 && ed(l), a & 512 && Tn(l, l.return));
        break;
      case 3:
        if ((el(t, l), a & 64 && ((t = l.updateQueue), t !== null))) {
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
            Zr(t, e);
          } catch (c) {
            ht(l, l.return, c);
          }
        }
        break;
      case 27:
        e === null && a & 4 && ud(l);
      case 26:
      case 5:
        (el(t, l), e === null && a & 4 && ad(l), a & 512 && Tn(l, l.return));
        break;
      case 12:
        el(t, l);
        break;
      case 31:
        (el(t, l), a & 4 && rd(t, l));
        break;
      case 13:
        (el(t, l),
          a & 4 && od(t, l),
          a & 64 &&
            ((t = l.memoizedState),
            t !== null && ((t = t.dehydrated), t !== null && ((l = uv.bind(null, l)), zv(t, l)))));
        break;
      case 22:
        if (((a = l.memoizedState !== null || Pe), !a)) {
          ((e = (e !== null && e.memoizedState !== null) || Lt), (n = Pe));
          var u = Lt;
          ((Pe = a),
            (Lt = e) && !u ? ll(t, l, (l.subtreeFlags & 8772) !== 0) : el(t, l),
            (Pe = n),
            (Lt = u));
        }
        break;
      case 30:
        break;
      default:
        el(t, l);
    }
  }
  function fd(t) {
    var e = t.alternate;
    (e !== null && ((t.alternate = null), fd(e)),
      (t.child = null),
      (t.deletions = null),
      (t.sibling = null),
      t.tag === 5 && ((e = t.stateNode), e !== null && Li(e)),
      (t.stateNode = null),
      (t.return = null),
      (t.dependencies = null),
      (t.memoizedProps = null),
      (t.memoizedState = null),
      (t.pendingProps = null),
      (t.stateNode = null),
      (t.updateQueue = null));
  }
  var zt = null,
    ee = !1;
  function tl(t, e, l) {
    for (l = l.child; l !== null; ) (sd(t, e, l), (l = l.sibling));
  }
  function sd(t, e, l) {
    if (ce && typeof ce.onCommitFiberUnmount == 'function')
      try {
        ce.onCommitFiberUnmount(Ka, l);
      } catch {}
    switch (l.tag) {
      case 26:
        (Lt || Le(l, e),
          tl(t, e, l),
          l.memoizedState
            ? l.memoizedState.count--
            : l.stateNode && ((l = l.stateNode), l.parentNode.removeChild(l)));
        break;
      case 27:
        Lt || Le(l, e);
        var a = zt,
          n = ee;
        (Rl(l.type) && ((zt = l.stateNode), (ee = !1)),
          tl(t, e, l),
          Nn(l.stateNode),
          (zt = a),
          (ee = n));
        break;
      case 5:
        Lt || Le(l, e);
      case 6:
        if (((a = zt), (n = ee), (zt = null), tl(t, e, l), (zt = a), (ee = n), zt !== null))
          if (ee)
            try {
              (zt.nodeType === 9
                ? zt.body
                : zt.nodeName === 'HTML'
                  ? zt.ownerDocument.body
                  : zt
              ).removeChild(l.stateNode);
            } catch (u) {
              ht(l, e, u);
            }
          else
            try {
              zt.removeChild(l.stateNode);
            } catch (u) {
              ht(l, e, u);
            }
        break;
      case 18:
        zt !== null &&
          (ee
            ? ((t = zt),
              em(
                t.nodeType === 9 ? t.body : t.nodeName === 'HTML' ? t.ownerDocument.body : t,
                l.stateNode
              ),
              wa(t))
            : em(zt, l.stateNode));
        break;
      case 4:
        ((a = zt),
          (n = ee),
          (zt = l.stateNode.containerInfo),
          (ee = !0),
          tl(t, e, l),
          (zt = a),
          (ee = n));
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        (Sl(2, l, e), Lt || Sl(4, l, e), tl(t, e, l));
        break;
      case 1:
        (Lt ||
          (Le(l, e), (a = l.stateNode), typeof a.componentWillUnmount == 'function' && ld(l, e, a)),
          tl(t, e, l));
        break;
      case 21:
        tl(t, e, l);
        break;
      case 22:
        ((Lt = (a = Lt) || l.memoizedState !== null), tl(t, e, l), (Lt = a));
        break;
      default:
        tl(t, e, l);
    }
  }
  function rd(t, e) {
    if (
      e.memoizedState === null &&
      ((t = e.alternate), t !== null && ((t = t.memoizedState), t !== null))
    ) {
      t = t.dehydrated;
      try {
        wa(t);
      } catch (l) {
        ht(e, e.return, l);
      }
    }
  }
  function od(t, e) {
    if (
      e.memoizedState === null &&
      ((t = e.alternate),
      t !== null && ((t = t.memoizedState), t !== null && ((t = t.dehydrated), t !== null)))
    )
      try {
        wa(t);
      } catch (l) {
        ht(e, e.return, l);
      }
  }
  function Fy(t) {
    switch (t.tag) {
      case 31:
      case 13:
      case 19:
        var e = t.stateNode;
        return (e === null && (e = t.stateNode = new id()), e);
      case 22:
        return (
          (t = t.stateNode),
          (e = t._retryCache),
          e === null && (e = t._retryCache = new id()),
          e
        );
      default:
        throw Error(f(435, t.tag));
    }
  }
  function Zu(t, e) {
    var l = Fy(t);
    e.forEach(function (a) {
      if (!l.has(a)) {
        l.add(a);
        var n = iv.bind(null, t, a);
        a.then(n, n);
      }
    });
  }
  function le(t, e) {
    var l = e.deletions;
    if (l !== null)
      for (var a = 0; a < l.length; a++) {
        var n = l[a],
          u = t,
          c = e,
          o = c;
        t: for (; o !== null; ) {
          switch (o.tag) {
            case 27:
              if (Rl(o.type)) {
                ((zt = o.stateNode), (ee = !1));
                break t;
              }
              break;
            case 5:
              ((zt = o.stateNode), (ee = !1));
              break t;
            case 3:
            case 4:
              ((zt = o.stateNode.containerInfo), (ee = !0));
              break t;
          }
          o = o.return;
        }
        if (zt === null) throw Error(f(160));
        (sd(u, c, n),
          (zt = null),
          (ee = !1),
          (u = n.alternate),
          u !== null && (u.return = null),
          (n.return = null));
      }
    if (e.subtreeFlags & 13886) for (e = e.child; e !== null; ) (dd(e, t), (e = e.sibling));
  }
  var Ce = null;
  function dd(t, e) {
    var l = t.alternate,
      a = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        (le(e, t), ae(t), a & 4 && (Sl(3, t, t.return), En(3, t), Sl(5, t, t.return)));
        break;
      case 1:
        (le(e, t),
          ae(t),
          a & 512 && (Lt || l === null || Le(l, l.return)),
          a & 64 &&
            Pe &&
            ((t = t.updateQueue),
            t !== null &&
              ((a = t.callbacks),
              a !== null &&
                ((l = t.shared.hiddenCallbacks),
                (t.shared.hiddenCallbacks = l === null ? a : l.concat(a))))));
        break;
      case 26:
        var n = Ce;
        if ((le(e, t), ae(t), a & 512 && (Lt || l === null || Le(l, l.return)), a & 4)) {
          var u = l !== null ? l.memoizedState : null;
          if (((a = t.memoizedState), l === null))
            if (a === null)
              if (t.stateNode === null) {
                t: {
                  ((a = t.type), (l = t.memoizedProps), (n = n.ownerDocument || n));
                  e: switch (a) {
                    case 'title':
                      ((u = n.getElementsByTagName('title')[0]),
                        (!u ||
                          u[$a] ||
                          u[Qt] ||
                          u.namespaceURI === 'http://www.w3.org/2000/svg' ||
                          u.hasAttribute('itemprop')) &&
                          ((u = n.createElement(a)),
                          n.head.insertBefore(u, n.querySelector('head > title'))),
                        kt(u, a, l),
                        (u[Qt] = t),
                        wt(u),
                        (a = u));
                      break t;
                    case 'link':
                      var c = dm('link', 'href', n).get(a + (l.href || ''));
                      if (c) {
                        for (var o = 0; o < c.length; o++)
                          if (
                            ((u = c[o]),
                            u.getAttribute('href') ===
                              (l.href == null || l.href === '' ? null : l.href) &&
                              u.getAttribute('rel') === (l.rel == null ? null : l.rel) &&
                              u.getAttribute('title') === (l.title == null ? null : l.title) &&
                              u.getAttribute('crossorigin') ===
                                (l.crossOrigin == null ? null : l.crossOrigin))
                          ) {
                            c.splice(o, 1);
                            break e;
                          }
                      }
                      ((u = n.createElement(a)), kt(u, a, l), n.head.appendChild(u));
                      break;
                    case 'meta':
                      if ((c = dm('meta', 'content', n).get(a + (l.content || '')))) {
                        for (o = 0; o < c.length; o++)
                          if (
                            ((u = c[o]),
                            u.getAttribute('content') ===
                              (l.content == null ? null : '' + l.content) &&
                              u.getAttribute('name') === (l.name == null ? null : l.name) &&
                              u.getAttribute('property') ===
                                (l.property == null ? null : l.property) &&
                              u.getAttribute('http-equiv') ===
                                (l.httpEquiv == null ? null : l.httpEquiv) &&
                              u.getAttribute('charset') === (l.charSet == null ? null : l.charSet))
                          ) {
                            c.splice(o, 1);
                            break e;
                          }
                      }
                      ((u = n.createElement(a)), kt(u, a, l), n.head.appendChild(u));
                      break;
                    default:
                      throw Error(f(468, a));
                  }
                  ((u[Qt] = t), wt(u), (a = u));
                }
                t.stateNode = a;
              } else mm(n, t.type, t.stateNode);
            else t.stateNode = om(n, a, t.memoizedProps);
          else
            u !== a
              ? (u === null
                  ? l.stateNode !== null && ((l = l.stateNode), l.parentNode.removeChild(l))
                  : u.count--,
                a === null ? mm(n, t.type, t.stateNode) : om(n, a, t.memoizedProps))
              : a === null && t.stateNode !== null && uf(t, t.memoizedProps, l.memoizedProps);
        }
        break;
      case 27:
        (le(e, t),
          ae(t),
          a & 512 && (Lt || l === null || Le(l, l.return)),
          l !== null && a & 4 && uf(t, t.memoizedProps, l.memoizedProps));
        break;
      case 5:
        if ((le(e, t), ae(t), a & 512 && (Lt || l === null || Le(l, l.return)), t.flags & 32)) {
          n = t.stateNode;
          try {
            ra(n, '');
          } catch (X) {
            ht(t, t.return, X);
          }
        }
        (a & 4 &&
          t.stateNode != null &&
          ((n = t.memoizedProps), uf(t, n, l !== null ? l.memoizedProps : n)),
          a & 1024 && (sf = !0));
        break;
      case 6:
        if ((le(e, t), ae(t), a & 4)) {
          if (t.stateNode === null) throw Error(f(162));
          ((a = t.memoizedProps), (l = t.stateNode));
          try {
            l.nodeValue = a;
          } catch (X) {
            ht(t, t.return, X);
          }
        }
        break;
      case 3:
        if (
          ((ii = null),
          (n = Ce),
          (Ce = ni(e.containerInfo)),
          le(e, t),
          (Ce = n),
          ae(t),
          a & 4 && l !== null && l.memoizedState.isDehydrated)
        )
          try {
            wa(e.containerInfo);
          } catch (X) {
            ht(t, t.return, X);
          }
        sf && ((sf = !1), md(t));
        break;
      case 4:
        ((a = Ce), (Ce = ni(t.stateNode.containerInfo)), le(e, t), ae(t), (Ce = a));
        break;
      case 12:
        (le(e, t), ae(t));
        break;
      case 31:
        (le(e, t),
          ae(t),
          a & 4 && ((a = t.updateQueue), a !== null && ((t.updateQueue = null), Zu(t, a))));
        break;
      case 13:
        (le(e, t),
          ae(t),
          t.child.flags & 8192 &&
            (t.memoizedState !== null) != (l !== null && l.memoizedState !== null) &&
            (Ku = ie()),
          a & 4 && ((a = t.updateQueue), a !== null && ((t.updateQueue = null), Zu(t, a))));
        break;
      case 22:
        n = t.memoizedState !== null;
        var h = l !== null && l.memoizedState !== null,
          E = Pe,
          C = Lt;
        if (((Pe = E || n), (Lt = C || h), le(e, t), (Lt = C), (Pe = E), ae(t), a & 8192))
          t: for (
            e = t.stateNode,
              e._visibility = n ? e._visibility & -2 : e._visibility | 1,
              n && (l === null || h || Pe || Lt || Pl(t)),
              l = null,
              e = t;
            ;
          ) {
            if (e.tag === 5 || e.tag === 26) {
              if (l === null) {
                h = l = e;
                try {
                  if (((u = h.stateNode), n))
                    ((c = u.style),
                      typeof c.setProperty == 'function'
                        ? c.setProperty('display', 'none', 'important')
                        : (c.display = 'none'));
                  else {
                    o = h.stateNode;
                    var j = h.memoizedProps.style,
                      A = j != null && j.hasOwnProperty('display') ? j.display : null;
                    o.style.display = A == null || typeof A == 'boolean' ? '' : ('' + A).trim();
                  }
                } catch (X) {
                  ht(h, h.return, X);
                }
              }
            } else if (e.tag === 6) {
              if (l === null) {
                h = e;
                try {
                  h.stateNode.nodeValue = n ? '' : h.memoizedProps;
                } catch (X) {
                  ht(h, h.return, X);
                }
              }
            } else if (e.tag === 18) {
              if (l === null) {
                h = e;
                try {
                  var x = h.stateNode;
                  n ? lm(x, !0) : lm(h.stateNode, !1);
                } catch (X) {
                  ht(h, h.return, X);
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
          a !== null && ((l = a.retryQueue), l !== null && ((a.retryQueue = null), Zu(t, l))));
        break;
      case 19:
        (le(e, t),
          ae(t),
          a & 4 && ((a = t.updateQueue), a !== null && ((t.updateQueue = null), Zu(t, a))));
        break;
      case 30:
        break;
      case 21:
        break;
      default:
        (le(e, t), ae(t));
    }
  }
  function ae(t) {
    var e = t.flags;
    if (e & 2) {
      try {
        for (var l, a = t.return; a !== null; ) {
          if (nd(a)) {
            l = a;
            break;
          }
          a = a.return;
        }
        if (l == null) throw Error(f(160));
        switch (l.tag) {
          case 27:
            var n = l.stateNode,
              u = cf(t);
            Qu(t, u, n);
            break;
          case 5:
            var c = l.stateNode;
            l.flags & 32 && (ra(c, ''), (l.flags &= -33));
            var o = cf(t);
            Qu(t, o, c);
            break;
          case 3:
          case 4:
            var h = l.stateNode.containerInfo,
              E = cf(t);
            ff(t, E, h);
            break;
          default:
            throw Error(f(161));
        }
      } catch (C) {
        ht(t, t.return, C);
      }
      t.flags &= -3;
    }
    e & 4096 && (t.flags &= -4097);
  }
  function md(t) {
    if (t.subtreeFlags & 1024)
      for (t = t.child; t !== null; ) {
        var e = t;
        (md(e), e.tag === 5 && e.flags & 1024 && e.stateNode.reset(), (t = t.sibling));
      }
  }
  function el(t, e) {
    if (e.subtreeFlags & 8772)
      for (e = e.child; e !== null; ) (cd(t, e.alternate, e), (e = e.sibling));
  }
  function Pl(t) {
    for (t = t.child; t !== null; ) {
      var e = t;
      switch (e.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          (Sl(4, e, e.return), Pl(e));
          break;
        case 1:
          Le(e, e.return);
          var l = e.stateNode;
          (typeof l.componentWillUnmount == 'function' && ld(e, e.return, l), Pl(e));
          break;
        case 27:
          Nn(e.stateNode);
        case 26:
        case 5:
          (Le(e, e.return), Pl(e));
          break;
        case 22:
          e.memoizedState === null && Pl(e);
          break;
        case 30:
          Pl(e);
          break;
        default:
          Pl(e);
      }
      t = t.sibling;
    }
  }
  function ll(t, e, l) {
    for (l = l && (e.subtreeFlags & 8772) !== 0, e = e.child; e !== null; ) {
      var a = e.alternate,
        n = t,
        u = e,
        c = u.flags;
      switch (u.tag) {
        case 0:
        case 11:
        case 15:
          (ll(n, u, l), En(4, u));
          break;
        case 1:
          if ((ll(n, u, l), (a = u), (n = a.stateNode), typeof n.componentDidMount == 'function'))
            try {
              n.componentDidMount();
            } catch (E) {
              ht(a, a.return, E);
            }
          if (((a = u), (n = a.updateQueue), n !== null)) {
            var o = a.stateNode;
            try {
              var h = n.shared.hiddenCallbacks;
              if (h !== null)
                for (n.shared.hiddenCallbacks = null, n = 0; n < h.length; n++) Qr(h[n], o);
            } catch (E) {
              ht(a, a.return, E);
            }
          }
          (l && c & 64 && ed(u), Tn(u, u.return));
          break;
        case 27:
          ud(u);
        case 26:
        case 5:
          (ll(n, u, l), l && a === null && c & 4 && ad(u), Tn(u, u.return));
          break;
        case 12:
          ll(n, u, l);
          break;
        case 31:
          (ll(n, u, l), l && c & 4 && rd(n, u));
          break;
        case 13:
          (ll(n, u, l), l && c & 4 && od(n, u));
          break;
        case 22:
          (u.memoizedState === null && ll(n, u, l), Tn(u, u.return));
          break;
        case 30:
          break;
        default:
          ll(n, u, l);
      }
      e = e.sibling;
    }
  }
  function rf(t, e) {
    var l = null;
    (t !== null &&
      t.memoizedState !== null &&
      t.memoizedState.cachePool !== null &&
      (l = t.memoizedState.cachePool.pool),
      (t = null),
      e.memoizedState !== null &&
        e.memoizedState.cachePool !== null &&
        (t = e.memoizedState.cachePool.pool),
      t !== l && (t != null && t.refCount++, l != null && sn(l)));
  }
  function of(t, e) {
    ((t = null),
      e.alternate !== null && (t = e.alternate.memoizedState.cache),
      (e = e.memoizedState.cache),
      e !== t && (e.refCount++, t != null && sn(t)));
  }
  function De(t, e, l, a) {
    if (e.subtreeFlags & 10256) for (e = e.child; e !== null; ) (hd(t, e, l, a), (e = e.sibling));
  }
  function hd(t, e, l, a) {
    var n = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        (De(t, e, l, a), n & 2048 && En(9, e));
        break;
      case 1:
        De(t, e, l, a);
        break;
      case 3:
        (De(t, e, l, a),
          n & 2048 &&
            ((t = null),
            e.alternate !== null && (t = e.alternate.memoizedState.cache),
            (e = e.memoizedState.cache),
            e !== t && (e.refCount++, t != null && sn(t))));
        break;
      case 12:
        if (n & 2048) {
          (De(t, e, l, a), (t = e.stateNode));
          try {
            var u = e.memoizedProps,
              c = u.id,
              o = u.onPostCommit;
            typeof o == 'function' &&
              o(c, e.alternate === null ? 'mount' : 'update', t.passiveEffectDuration, -0);
          } catch (h) {
            ht(e, e.return, h);
          }
        } else De(t, e, l, a);
        break;
      case 31:
        De(t, e, l, a);
        break;
      case 13:
        De(t, e, l, a);
        break;
      case 23:
        break;
      case 22:
        ((u = e.stateNode),
          (c = e.alternate),
          e.memoizedState !== null
            ? u._visibility & 2
              ? De(t, e, l, a)
              : An(t, e)
            : u._visibility & 2
              ? De(t, e, l, a)
              : ((u._visibility |= 2), Ca(t, e, l, a, (e.subtreeFlags & 10256) !== 0 || !1)),
          n & 2048 && rf(c, e));
        break;
      case 24:
        (De(t, e, l, a), n & 2048 && of(e.alternate, e));
        break;
      default:
        De(t, e, l, a);
    }
  }
  function Ca(t, e, l, a, n) {
    for (n = n && ((e.subtreeFlags & 10256) !== 0 || !1), e = e.child; e !== null; ) {
      var u = t,
        c = e,
        o = l,
        h = a,
        E = c.flags;
      switch (c.tag) {
        case 0:
        case 11:
        case 15:
          (Ca(u, c, o, h, n), En(8, c));
          break;
        case 23:
          break;
        case 22:
          var C = c.stateNode;
          (c.memoizedState !== null
            ? C._visibility & 2
              ? Ca(u, c, o, h, n)
              : An(u, c)
            : ((C._visibility |= 2), Ca(u, c, o, h, n)),
            n && E & 2048 && rf(c.alternate, c));
          break;
        case 24:
          (Ca(u, c, o, h, n), n && E & 2048 && of(c.alternate, c));
          break;
        default:
          Ca(u, c, o, h, n);
      }
      e = e.sibling;
    }
  }
  function An(t, e) {
    if (e.subtreeFlags & 10256)
      for (e = e.child; e !== null; ) {
        var l = t,
          a = e,
          n = a.flags;
        switch (a.tag) {
          case 22:
            (An(l, a), n & 2048 && rf(a.alternate, a));
            break;
          case 24:
            (An(l, a), n & 2048 && of(a.alternate, a));
            break;
          default:
            An(l, a);
        }
        e = e.sibling;
      }
  }
  var zn = 8192;
  function Da(t, e, l) {
    if (t.subtreeFlags & zn) for (t = t.child; t !== null; ) (yd(t, e, l), (t = t.sibling));
  }
  function yd(t, e, l) {
    switch (t.tag) {
      case 26:
        (Da(t, e, l),
          t.flags & zn && t.memoizedState !== null && qv(l, Ce, t.memoizedState, t.memoizedProps));
        break;
      case 5:
        Da(t, e, l);
        break;
      case 3:
      case 4:
        var a = Ce;
        ((Ce = ni(t.stateNode.containerInfo)), Da(t, e, l), (Ce = a));
        break;
      case 22:
        t.memoizedState === null &&
          ((a = t.alternate),
          a !== null && a.memoizedState !== null
            ? ((a = zn), (zn = 16777216), Da(t, e, l), (zn = a))
            : Da(t, e, l));
        break;
      default:
        Da(t, e, l);
    }
  }
  function vd(t) {
    var e = t.alternate;
    if (e !== null && ((t = e.child), t !== null)) {
      e.child = null;
      do ((e = t.sibling), (t.sibling = null), (t = e));
      while (t !== null);
    }
  }
  function Rn(t) {
    var e = t.deletions;
    if ((t.flags & 16) !== 0) {
      if (e !== null)
        for (var l = 0; l < e.length; l++) {
          var a = e[l];
          ((Xt = a), gd(a, t));
        }
      vd(t);
    }
    if (t.subtreeFlags & 10256) for (t = t.child; t !== null; ) (pd(t), (t = t.sibling));
  }
  function pd(t) {
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        (Rn(t), t.flags & 2048 && Sl(9, t, t.return));
        break;
      case 3:
        Rn(t);
        break;
      case 12:
        Rn(t);
        break;
      case 22:
        var e = t.stateNode;
        t.memoizedState !== null && e._visibility & 2 && (t.return === null || t.return.tag !== 13)
          ? ((e._visibility &= -3), Vu(t))
          : Rn(t);
        break;
      default:
        Rn(t);
    }
  }
  function Vu(t) {
    var e = t.deletions;
    if ((t.flags & 16) !== 0) {
      if (e !== null)
        for (var l = 0; l < e.length; l++) {
          var a = e[l];
          ((Xt = a), gd(a, t));
        }
      vd(t);
    }
    for (t = t.child; t !== null; ) {
      switch (((e = t), e.tag)) {
        case 0:
        case 11:
        case 15:
          (Sl(8, e, e.return), Vu(e));
          break;
        case 22:
          ((l = e.stateNode), l._visibility & 2 && ((l._visibility &= -3), Vu(e)));
          break;
        default:
          Vu(e);
      }
      t = t.sibling;
    }
  }
  function gd(t, e) {
    for (; Xt !== null; ) {
      var l = Xt;
      switch (l.tag) {
        case 0:
        case 11:
        case 15:
          Sl(8, l, e);
          break;
        case 23:
        case 22:
          if (l.memoizedState !== null && l.memoizedState.cachePool !== null) {
            var a = l.memoizedState.cachePool.pool;
            a != null && a.refCount++;
          }
          break;
        case 24:
          sn(l.memoizedState.cache);
      }
      if (((a = l.child), a !== null)) ((a.return = l), (Xt = a));
      else
        t: for (l = t; Xt !== null; ) {
          a = Xt;
          var n = a.sibling,
            u = a.return;
          if ((fd(a), a === l)) {
            Xt = null;
            break t;
          }
          if (n !== null) {
            ((n.return = u), (Xt = n));
            break t;
          }
          Xt = u;
        }
    }
  }
  var Iy = {
      getCacheForType: function (t) {
        var e = Vt(Ht),
          l = e.data.get(t);
        return (l === void 0 && ((l = t()), e.data.set(t, l)), l);
      },
      cacheSignal: function () {
        return Vt(Ht).controller.signal;
      },
    },
    Py = typeof WeakMap == 'function' ? WeakMap : Map,
    rt = 0,
    _t = null,
    at = null,
    ut = 0,
    mt = 0,
    me = null,
    bl = !1,
    Na = !1,
    df = !1,
    al = 0,
    Mt = 0,
    _l = 0,
    ta = 0,
    mf = 0,
    he = 0,
    Ua = 0,
    xn = null,
    ne = null,
    hf = !1,
    Ku = 0,
    Sd = 0,
    ku = 1 / 0,
    Ju = null,
    El = null,
    Yt = 0,
    Tl = null,
    ja = null,
    nl = 0,
    yf = 0,
    vf = null,
    bd = null,
    On = 0,
    pf = null;
  function ye() {
    return (rt & 2) !== 0 && ut !== 0 ? ut & -ut : D.T !== null ? Tf() : Hs();
  }
  function _d() {
    if (he === 0)
      if ((ut & 536870912) === 0 || ct) {
        var t = lu;
        ((lu <<= 1), (lu & 3932160) === 0 && (lu = 262144), (he = t));
      } else he = 536870912;
    return ((t = oe.current), t !== null && (t.flags |= 32), he);
  }
  function ue(t, e, l) {
    (((t === _t && (mt === 2 || mt === 9)) || t.cancelPendingCommit !== null) &&
      (Ha(t, 0), Al(t, ut, he, !1)),
      Ja(t, l),
      ((rt & 2) === 0 || t !== _t) &&
        (t === _t && ((rt & 2) === 0 && (ta |= l), Mt === 4 && Al(t, ut, he, !1)), Ye(t)));
  }
  function Ed(t, e, l) {
    if ((rt & 6) !== 0) throw Error(f(327));
    var a = (!l && (e & 127) === 0 && (e & t.expiredLanes) === 0) || ka(t, e),
      n = a ? lv(t, e) : Sf(t, e, !0),
      u = a;
    do {
      if (n === 0) {
        Na && !a && Al(t, e, 0, !1);
        break;
      } else {
        if (((l = t.current.alternate), u && !tv(l))) {
          ((n = Sf(t, e, !1)), (u = !1));
          continue;
        }
        if (n === 2) {
          if (((u = e), t.errorRecoveryDisabledLanes & u)) var c = 0;
          else
            ((c = t.pendingLanes & -536870913), (c = c !== 0 ? c : c & 536870912 ? 536870912 : 0));
          if (c !== 0) {
            e = c;
            t: {
              var o = t;
              n = xn;
              var h = o.current.memoizedState.isDehydrated;
              if ((h && (Ha(o, c).flags |= 256), (c = Sf(o, c, !1)), c !== 2)) {
                if (df && !h) {
                  ((o.errorRecoveryDisabledLanes |= u), (ta |= u), (n = 4));
                  break t;
                }
                ((u = ne), (ne = n), u !== null && (ne === null ? (ne = u) : ne.push.apply(ne, u)));
              }
              n = c;
            }
            if (((u = !1), n !== 2)) continue;
          }
        }
        if (n === 1) {
          (Ha(t, 0), Al(t, e, 0, !0));
          break;
        }
        t: {
          switch (((a = t), (u = n), u)) {
            case 0:
            case 1:
              throw Error(f(345));
            case 4:
              if ((e & 4194048) !== e) break;
            case 6:
              Al(a, e, he, !bl);
              break t;
            case 2:
              ne = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(f(329));
          }
          if ((e & 62914560) === e && ((n = Ku + 300 - ie()), 10 < n)) {
            if ((Al(a, e, he, !bl), nu(a, 0, !0) !== 0)) break t;
            ((nl = e),
              (a.timeoutHandle = Pd(
                Td.bind(null, a, l, ne, Ju, hf, e, he, ta, Ua, bl, u, 'Throttled', -0, 0),
                n
              )));
            break t;
          }
          Td(a, l, ne, Ju, hf, e, he, ta, Ua, bl, u, null, -0, 0);
        }
      }
      break;
    } while (!0);
    Ye(t);
  }
  function Td(t, e, l, a, n, u, c, o, h, E, C, j, A, x) {
    if (((t.timeoutHandle = -1), (j = e.subtreeFlags), j & 8192 || (j & 16785408) === 16785408)) {
      ((j = {
        stylesheets: null,
        count: 0,
        imgCount: 0,
        imgBytes: 0,
        suspenseyImages: [],
        waitingForImages: !0,
        waitingForViewTransition: !1,
        unsuspend: Qe,
      }),
        yd(e, u, j));
      var X = (u & 62914560) === u ? Ku - ie() : (u & 4194048) === u ? Sd - ie() : 0;
      if (((X = Lv(j, X)), X !== null)) {
        ((nl = u),
          (t.cancelPendingCommit = X(Dd.bind(null, t, e, u, l, a, n, c, o, h, C, j, null, A, x))),
          Al(t, u, c, !E));
        return;
      }
    }
    Dd(t, e, u, l, a, n, c, o, h);
  }
  function tv(t) {
    for (var e = t; ; ) {
      var l = e.tag;
      if (
        (l === 0 || l === 11 || l === 15) &&
        e.flags & 16384 &&
        ((l = e.updateQueue), l !== null && ((l = l.stores), l !== null))
      )
        for (var a = 0; a < l.length; a++) {
          var n = l[a],
            u = n.getSnapshot;
          n = n.value;
          try {
            if (!se(u(), n)) return !1;
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
  function Al(t, e, l, a) {
    ((e &= ~mf),
      (e &= ~ta),
      (t.suspendedLanes |= e),
      (t.pingedLanes &= ~e),
      a && (t.warmLanes |= e),
      (a = t.expirationTimes));
    for (var n = e; 0 < n; ) {
      var u = 31 - fe(n),
        c = 1 << u;
      ((a[u] = -1), (n &= ~c));
    }
    l !== 0 && Ns(t, l, e);
  }
  function $u() {
    return (rt & 6) === 0 ? (Mn(0), !1) : !0;
  }
  function gf() {
    if (at !== null) {
      if (mt === 0) var t = at.return;
      else ((t = at), (ke = Vl = null), Uc(t), (za = null), (on = 0), (t = at));
      for (; t !== null; ) (td(t.alternate, t), (t = t.return));
      at = null;
    }
  }
  function Ha(t, e) {
    var l = t.timeoutHandle;
    (l !== -1 && ((t.timeoutHandle = -1), bv(l)),
      (l = t.cancelPendingCommit),
      l !== null && ((t.cancelPendingCommit = null), l()),
      (nl = 0),
      gf(),
      (_t = t),
      (at = l = Ve(t.current, null)),
      (ut = e),
      (mt = 0),
      (me = null),
      (bl = !1),
      (Na = ka(t, e)),
      (df = !1),
      (Ua = he = mf = ta = _l = Mt = 0),
      (ne = xn = null),
      (hf = !1),
      (e & 8) !== 0 && (e |= e & 32));
    var a = t.entangledLanes;
    if (a !== 0)
      for (t = t.entanglements, a &= e; 0 < a; ) {
        var n = 31 - fe(a),
          u = 1 << n;
        ((e |= t[n]), (a &= ~u));
      }
    return ((al = e), vu(), l);
  }
  function Ad(t, e) {
    ((tt = null),
      (D.H = Sn),
      e === Aa || e === Au
        ? ((e = Yr()), (mt = 3))
        : e === _c
          ? ((e = Yr()), (mt = 4))
          : (mt =
              e === $c
                ? 8
                : e !== null && typeof e == 'object' && typeof e.then == 'function'
                  ? 6
                  : 1),
      (me = e),
      at === null && ((Mt = 1), Lu(t, Ee(e, t.current))));
  }
  function zd() {
    var t = oe.current;
    return t === null
      ? !0
      : (ut & 4194048) === ut
        ? Re === null
        : (ut & 62914560) === ut || (ut & 536870912) !== 0
          ? t === Re
          : !1;
  }
  function Rd() {
    var t = D.H;
    return ((D.H = Sn), t === null ? Sn : t);
  }
  function xd() {
    var t = D.A;
    return ((D.A = Iy), t);
  }
  function Wu() {
    ((Mt = 4),
      bl || ((ut & 4194048) !== ut && oe.current !== null) || (Na = !0),
      ((_l & 134217727) === 0 && (ta & 134217727) === 0) || _t === null || Al(_t, ut, he, !1));
  }
  function Sf(t, e, l) {
    var a = rt;
    rt |= 2;
    var n = Rd(),
      u = xd();
    ((_t !== t || ut !== e) && ((Ju = null), Ha(t, e)), (e = !1));
    var c = Mt;
    t: do
      try {
        if (mt !== 0 && at !== null) {
          var o = at,
            h = me;
          switch (mt) {
            case 8:
              (gf(), (c = 6));
              break t;
            case 3:
            case 2:
            case 9:
            case 6:
              oe.current === null && (e = !0);
              var E = mt;
              if (((mt = 0), (me = null), Ba(t, o, h, E), l && Na)) {
                c = 0;
                break t;
              }
              break;
            default:
              ((E = mt), (mt = 0), (me = null), Ba(t, o, h, E));
          }
        }
        (ev(), (c = Mt));
        break;
      } catch (C) {
        Ad(t, C);
      }
    while (!0);
    return (
      e && t.shellSuspendCounter++,
      (ke = Vl = null),
      (rt = a),
      (D.H = n),
      (D.A = u),
      at === null && ((_t = null), (ut = 0), vu()),
      c
    );
  }
  function ev() {
    for (; at !== null; ) Od(at);
  }
  function lv(t, e) {
    var l = rt;
    rt |= 2;
    var a = Rd(),
      n = xd();
    _t !== t || ut !== e ? ((Ju = null), (ku = ie() + 500), Ha(t, e)) : (Na = ka(t, e));
    t: do
      try {
        if (mt !== 0 && at !== null) {
          e = at;
          var u = me;
          e: switch (mt) {
            case 1:
              ((mt = 0), (me = null), Ba(t, e, u, 1));
              break;
            case 2:
            case 9:
              if (qr(u)) {
                ((mt = 0), (me = null), Md(e));
                break;
              }
              ((e = function () {
                ((mt !== 2 && mt !== 9) || _t !== t || (mt = 7), Ye(t));
              }),
                u.then(e, e));
              break t;
            case 3:
              mt = 7;
              break t;
            case 4:
              mt = 5;
              break t;
            case 7:
              qr(u) ? ((mt = 0), (me = null), Md(e)) : ((mt = 0), (me = null), Ba(t, e, u, 7));
              break;
            case 5:
              var c = null;
              switch (at.tag) {
                case 26:
                  c = at.memoizedState;
                case 5:
                case 27:
                  var o = at;
                  if (c ? hm(c) : o.stateNode.complete) {
                    ((mt = 0), (me = null));
                    var h = o.sibling;
                    if (h !== null) at = h;
                    else {
                      var E = o.return;
                      E !== null ? ((at = E), Fu(E)) : (at = null);
                    }
                    break e;
                  }
              }
              ((mt = 0), (me = null), Ba(t, e, u, 5));
              break;
            case 6:
              ((mt = 0), (me = null), Ba(t, e, u, 6));
              break;
            case 8:
              (gf(), (Mt = 6));
              break t;
            default:
              throw Error(f(462));
          }
        }
        av();
        break;
      } catch (C) {
        Ad(t, C);
      }
    while (!0);
    return (
      (ke = Vl = null),
      (D.H = a),
      (D.A = n),
      (rt = l),
      at !== null ? 0 : ((_t = null), (ut = 0), vu(), Mt)
    );
  }
  function av() {
    for (; at !== null && !Rh(); ) Od(at);
  }
  function Od(t) {
    var e = Io(t.alternate, t, al);
    ((t.memoizedProps = t.pendingProps), e === null ? Fu(t) : (at = e));
  }
  function Md(t) {
    var e = t,
      l = e.alternate;
    switch (e.tag) {
      case 15:
      case 0:
        e = Ko(l, e, e.pendingProps, e.type, void 0, ut);
        break;
      case 11:
        e = Ko(l, e, e.pendingProps, e.type.render, e.ref, ut);
        break;
      case 5:
        Uc(e);
      default:
        (td(l, e), (e = at = Rr(e, al)), (e = Io(l, e, al)));
    }
    ((t.memoizedProps = t.pendingProps), e === null ? Fu(t) : (at = e));
  }
  function Ba(t, e, l, a) {
    ((ke = Vl = null), Uc(e), (za = null), (on = 0));
    var n = e.return;
    try {
      if (Vy(t, n, e, l, ut)) {
        ((Mt = 1), Lu(t, Ee(l, t.current)), (at = null));
        return;
      }
    } catch (u) {
      if (n !== null) throw ((at = n), u);
      ((Mt = 1), Lu(t, Ee(l, t.current)), (at = null));
      return;
    }
    e.flags & 32768
      ? (ct || a === 1
          ? (t = !0)
          : Na || (ut & 536870912) !== 0
            ? (t = !1)
            : ((bl = t = !0),
              (a === 2 || a === 9 || a === 3 || a === 6) &&
                ((a = oe.current), a !== null && a.tag === 13 && (a.flags |= 16384))),
        Cd(e, t))
      : Fu(e);
  }
  function Fu(t) {
    var e = t;
    do {
      if ((e.flags & 32768) !== 0) {
        Cd(e, bl);
        return;
      }
      t = e.return;
      var l = Jy(e.alternate, e, al);
      if (l !== null) {
        at = l;
        return;
      }
      if (((e = e.sibling), e !== null)) {
        at = e;
        return;
      }
      at = e = t;
    } while (e !== null);
    Mt === 0 && (Mt = 5);
  }
  function Cd(t, e) {
    do {
      var l = $y(t.alternate, t);
      if (l !== null) {
        ((l.flags &= 32767), (at = l));
        return;
      }
      if (
        ((l = t.return),
        l !== null && ((l.flags |= 32768), (l.subtreeFlags = 0), (l.deletions = null)),
        !e && ((t = t.sibling), t !== null))
      ) {
        at = t;
        return;
      }
      at = t = l;
    } while (t !== null);
    ((Mt = 6), (at = null));
  }
  function Dd(t, e, l, a, n, u, c, o, h) {
    t.cancelPendingCommit = null;
    do Iu();
    while (Yt !== 0);
    if ((rt & 6) !== 0) throw Error(f(327));
    if (e !== null) {
      if (e === t.current) throw Error(f(177));
      if (
        ((u = e.lanes | e.childLanes),
        (u |= ic),
        Bh(t, l, u, c, o, h),
        t === _t && ((at = _t = null), (ut = 0)),
        (ja = e),
        (Tl = t),
        (nl = l),
        (yf = u),
        (vf = n),
        (bd = a),
        (e.subtreeFlags & 10256) !== 0 || (e.flags & 10256) !== 0
          ? ((t.callbackNode = null),
            (t.callbackPriority = 0),
            cv(tu, function () {
              return (Bd(), null);
            }))
          : ((t.callbackNode = null), (t.callbackPriority = 0)),
        (a = (e.flags & 13878) !== 0),
        (e.subtreeFlags & 13878) !== 0 || a)
      ) {
        ((a = D.T), (D.T = null), (n = q.p), (q.p = 2), (c = rt), (rt |= 4));
        try {
          Wy(t, e, l);
        } finally {
          ((rt = c), (q.p = n), (D.T = a));
        }
      }
      ((Yt = 1), Nd(), Ud(), jd());
    }
  }
  function Nd() {
    if (Yt === 1) {
      Yt = 0;
      var t = Tl,
        e = ja,
        l = (e.flags & 13878) !== 0;
      if ((e.subtreeFlags & 13878) !== 0 || l) {
        ((l = D.T), (D.T = null));
        var a = q.p;
        q.p = 2;
        var n = rt;
        rt |= 4;
        try {
          dd(e, t);
          var u = Df,
            c = pr(t.containerInfo),
            o = u.focusedElem,
            h = u.selectionRange;
          if (c !== o && o && o.ownerDocument && vr(o.ownerDocument.documentElement, o)) {
            if (h !== null && ec(o)) {
              var E = h.start,
                C = h.end;
              if ((C === void 0 && (C = E), 'selectionStart' in o))
                ((o.selectionStart = E), (o.selectionEnd = Math.min(C, o.value.length)));
              else {
                var j = o.ownerDocument || document,
                  A = (j && j.defaultView) || window;
                if (A.getSelection) {
                  var x = A.getSelection(),
                    X = o.textContent.length,
                    J = Math.min(h.start, X),
                    St = h.end === void 0 ? J : Math.min(h.end, X);
                  !x.extend && J > St && ((c = St), (St = J), (J = c));
                  var b = yr(o, J),
                    v = yr(o, St);
                  if (
                    b &&
                    v &&
                    (x.rangeCount !== 1 ||
                      x.anchorNode !== b.node ||
                      x.anchorOffset !== b.offset ||
                      x.focusNode !== v.node ||
                      x.focusOffset !== v.offset)
                  ) {
                    var _ = j.createRange();
                    (_.setStart(b.node, b.offset),
                      x.removeAllRanges(),
                      J > St
                        ? (x.addRange(_), x.extend(v.node, v.offset))
                        : (_.setEnd(v.node, v.offset), x.addRange(_)));
                  }
                }
              }
            }
            for (j = [], x = o; (x = x.parentNode); )
              x.nodeType === 1 && j.push({ element: x, left: x.scrollLeft, top: x.scrollTop });
            for (typeof o.focus == 'function' && o.focus(), o = 0; o < j.length; o++) {
              var N = j[o];
              ((N.element.scrollLeft = N.left), (N.element.scrollTop = N.top));
            }
          }
          ((ri = !!Cf), (Df = Cf = null));
        } finally {
          ((rt = n), (q.p = a), (D.T = l));
        }
      }
      ((t.current = e), (Yt = 2));
    }
  }
  function Ud() {
    if (Yt === 2) {
      Yt = 0;
      var t = Tl,
        e = ja,
        l = (e.flags & 8772) !== 0;
      if ((e.subtreeFlags & 8772) !== 0 || l) {
        ((l = D.T), (D.T = null));
        var a = q.p;
        q.p = 2;
        var n = rt;
        rt |= 4;
        try {
          cd(t, e.alternate, e);
        } finally {
          ((rt = n), (q.p = a), (D.T = l));
        }
      }
      Yt = 3;
    }
  }
  function jd() {
    if (Yt === 4 || Yt === 3) {
      ((Yt = 0), xh());
      var t = Tl,
        e = ja,
        l = nl,
        a = bd;
      (e.subtreeFlags & 10256) !== 0 || (e.flags & 10256) !== 0
        ? (Yt = 5)
        : ((Yt = 0), (ja = Tl = null), Hd(t, t.pendingLanes));
      var n = t.pendingLanes;
      if (
        (n === 0 && (El = null),
        Bi(l),
        (e = e.stateNode),
        ce && typeof ce.onCommitFiberRoot == 'function')
      )
        try {
          ce.onCommitFiberRoot(Ka, e, void 0, (e.current.flags & 128) === 128);
        } catch {}
      if (a !== null) {
        ((e = D.T), (n = q.p), (q.p = 2), (D.T = null));
        try {
          for (var u = t.onRecoverableError, c = 0; c < a.length; c++) {
            var o = a[c];
            u(o.value, { componentStack: o.stack });
          }
        } finally {
          ((D.T = e), (q.p = n));
        }
      }
      ((nl & 3) !== 0 && Iu(),
        Ye(t),
        (n = t.pendingLanes),
        (l & 261930) !== 0 && (n & 42) !== 0 ? (t === pf ? On++ : ((On = 0), (pf = t))) : (On = 0),
        Mn(0));
    }
  }
  function Hd(t, e) {
    (t.pooledCacheLanes &= e) === 0 &&
      ((e = t.pooledCache), e != null && ((t.pooledCache = null), sn(e)));
  }
  function Iu() {
    return (Nd(), Ud(), jd(), Bd());
  }
  function Bd() {
    if (Yt !== 5) return !1;
    var t = Tl,
      e = yf;
    yf = 0;
    var l = Bi(nl),
      a = D.T,
      n = q.p;
    try {
      ((q.p = 32 > l ? 32 : l), (D.T = null), (l = vf), (vf = null));
      var u = Tl,
        c = nl;
      if (((Yt = 0), (ja = Tl = null), (nl = 0), (rt & 6) !== 0)) throw Error(f(331));
      var o = rt;
      if (
        ((rt |= 4),
        pd(u.current),
        hd(u, u.current, c, l),
        (rt = o),
        Mn(0, !1),
        ce && typeof ce.onPostCommitFiberRoot == 'function')
      )
        try {
          ce.onPostCommitFiberRoot(Ka, u);
        } catch {}
      return !0;
    } finally {
      ((q.p = n), (D.T = a), Hd(t, e));
    }
  }
  function qd(t, e, l) {
    ((e = Ee(l, e)),
      (e = Jc(t.stateNode, e, 2)),
      (t = vl(t, e, 2)),
      t !== null && (Ja(t, 2), Ye(t)));
  }
  function ht(t, e, l) {
    if (t.tag === 3) qd(t, t, l);
    else
      for (; e !== null; ) {
        if (e.tag === 3) {
          qd(e, t, l);
          break;
        } else if (e.tag === 1) {
          var a = e.stateNode;
          if (
            typeof e.type.getDerivedStateFromError == 'function' ||
            (typeof a.componentDidCatch == 'function' && (El === null || !El.has(a)))
          ) {
            ((t = Ee(l, t)),
              (l = Lo(2)),
              (a = vl(e, l, 2)),
              a !== null && (Yo(l, a, e, t), Ja(a, 2), Ye(a)));
            break;
          }
        }
        e = e.return;
      }
  }
  function bf(t, e, l) {
    var a = t.pingCache;
    if (a === null) {
      a = t.pingCache = new Py();
      var n = new Set();
      a.set(e, n);
    } else ((n = a.get(e)), n === void 0 && ((n = new Set()), a.set(e, n)));
    n.has(l) || ((df = !0), n.add(l), (t = nv.bind(null, t, e, l)), e.then(t, t));
  }
  function nv(t, e, l) {
    var a = t.pingCache;
    (a !== null && a.delete(e),
      (t.pingedLanes |= t.suspendedLanes & l),
      (t.warmLanes &= ~l),
      _t === t &&
        (ut & l) === l &&
        (Mt === 4 || (Mt === 3 && (ut & 62914560) === ut && 300 > ie() - Ku)
          ? (rt & 2) === 0 && Ha(t, 0)
          : (mf |= l),
        Ua === ut && (Ua = 0)),
      Ye(t));
  }
  function Ld(t, e) {
    (e === 0 && (e = Ds()), (t = Xl(t, e)), t !== null && (Ja(t, e), Ye(t)));
  }
  function uv(t) {
    var e = t.memoizedState,
      l = 0;
    (e !== null && (l = e.retryLane), Ld(t, l));
  }
  function iv(t, e) {
    var l = 0;
    switch (t.tag) {
      case 31:
      case 13:
        var a = t.stateNode,
          n = t.memoizedState;
        n !== null && (l = n.retryLane);
        break;
      case 19:
        a = t.stateNode;
        break;
      case 22:
        a = t.stateNode._retryCache;
        break;
      default:
        throw Error(f(314));
    }
    (a !== null && a.delete(e), Ld(t, l));
  }
  function cv(t, e) {
    return Ni(t, e);
  }
  var Pu = null,
    qa = null,
    _f = !1,
    ti = !1,
    Ef = !1,
    zl = 0;
  function Ye(t) {
    (t !== qa && t.next === null && (qa === null ? (Pu = qa = t) : (qa = qa.next = t)),
      (ti = !0),
      _f || ((_f = !0), sv()));
  }
  function Mn(t, e) {
    if (!Ef && ti) {
      Ef = !0;
      do
        for (var l = !1, a = Pu; a !== null; ) {
          if (t !== 0) {
            var n = a.pendingLanes;
            if (n === 0) var u = 0;
            else {
              var c = a.suspendedLanes,
                o = a.pingedLanes;
              ((u = (1 << (31 - fe(42 | t) + 1)) - 1),
                (u &= n & ~(c & ~o)),
                (u = u & 201326741 ? (u & 201326741) | 1 : u ? u | 2 : 0));
            }
            u !== 0 && ((l = !0), Xd(a, u));
          } else
            ((u = ut),
              (u = nu(
                a,
                a === _t ? u : 0,
                a.cancelPendingCommit !== null || a.timeoutHandle !== -1
              )),
              (u & 3) === 0 || ka(a, u) || ((l = !0), Xd(a, u)));
          a = a.next;
        }
      while (l);
      Ef = !1;
    }
  }
  function fv() {
    Yd();
  }
  function Yd() {
    ti = _f = !1;
    var t = 0;
    zl !== 0 && Sv() && (t = zl);
    for (var e = ie(), l = null, a = Pu; a !== null; ) {
      var n = a.next,
        u = Gd(a, e);
      (u === 0
        ? ((a.next = null), l === null ? (Pu = n) : (l.next = n), n === null && (qa = l))
        : ((l = a), (t !== 0 || (u & 3) !== 0) && (ti = !0)),
        (a = n));
    }
    ((Yt !== 0 && Yt !== 5) || Mn(t), zl !== 0 && (zl = 0));
  }
  function Gd(t, e) {
    for (
      var l = t.suspendedLanes,
        a = t.pingedLanes,
        n = t.expirationTimes,
        u = t.pendingLanes & -62914561;
      0 < u;
    ) {
      var c = 31 - fe(u),
        o = 1 << c,
        h = n[c];
      (h === -1
        ? ((o & l) === 0 || (o & a) !== 0) && (n[c] = Hh(o, e))
        : h <= e && (t.expiredLanes |= o),
        (u &= ~o));
    }
    if (
      ((e = _t),
      (l = ut),
      (l = nu(t, t === e ? l : 0, t.cancelPendingCommit !== null || t.timeoutHandle !== -1)),
      (a = t.callbackNode),
      l === 0 || (t === e && (mt === 2 || mt === 9)) || t.cancelPendingCommit !== null)
    )
      return (a !== null && a !== null && Ui(a), (t.callbackNode = null), (t.callbackPriority = 0));
    if ((l & 3) === 0 || ka(t, l)) {
      if (((e = l & -l), e === t.callbackPriority)) return e;
      switch ((a !== null && Ui(a), Bi(l))) {
        case 2:
        case 8:
          l = Ms;
          break;
        case 32:
          l = tu;
          break;
        case 268435456:
          l = Cs;
          break;
        default:
          l = tu;
      }
      return (
        (a = wd.bind(null, t)),
        (l = Ni(l, a)),
        (t.callbackPriority = e),
        (t.callbackNode = l),
        e
      );
    }
    return (
      a !== null && a !== null && Ui(a),
      (t.callbackPriority = 2),
      (t.callbackNode = null),
      2
    );
  }
  function wd(t, e) {
    if (Yt !== 0 && Yt !== 5) return ((t.callbackNode = null), (t.callbackPriority = 0), null);
    var l = t.callbackNode;
    if (Iu() && t.callbackNode !== l) return null;
    var a = ut;
    return (
      (a = nu(t, t === _t ? a : 0, t.cancelPendingCommit !== null || t.timeoutHandle !== -1)),
      a === 0
        ? null
        : (Ed(t, a, e),
          Gd(t, ie()),
          t.callbackNode != null && t.callbackNode === l ? wd.bind(null, t) : null)
    );
  }
  function Xd(t, e) {
    if (Iu()) return null;
    Ed(t, e, !0);
  }
  function sv() {
    _v(function () {
      (rt & 6) !== 0 ? Ni(Os, fv) : Yd();
    });
  }
  function Tf() {
    if (zl === 0) {
      var t = Ea;
      (t === 0 && ((t = eu), (eu <<= 1), (eu & 261888) === 0 && (eu = 256)), (zl = t));
    }
    return zl;
  }
  function Qd(t) {
    return t == null || typeof t == 'symbol' || typeof t == 'boolean'
      ? null
      : typeof t == 'function'
        ? t
        : fu('' + t);
  }
  function Zd(t, e) {
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
  function rv(t, e, l, a, n) {
    if (e === 'submit' && l && l.stateNode === n) {
      var u = Qd((n[Pt] || null).action),
        c = a.submitter;
      c &&
        ((e = (e = c[Pt] || null) ? Qd(e.formAction) : c.getAttribute('formAction')),
        e !== null && ((u = e), (c = null)));
      var o = new du('action', 'action', null, a, n);
      t.push({
        event: o,
        listeners: [
          {
            instance: null,
            listener: function () {
              if (a.defaultPrevented) {
                if (zl !== 0) {
                  var h = c ? Zd(n, c) : new FormData(n);
                  Xc(l, { pending: !0, data: h, method: n.method, action: u }, null, h);
                }
              } else
                typeof u == 'function' &&
                  (o.preventDefault(),
                  (h = c ? Zd(n, c) : new FormData(n)),
                  Xc(l, { pending: !0, data: h, method: n.method, action: u }, u, h));
            },
            currentTarget: n,
          },
        ],
      });
    }
  }
  for (var Af = 0; Af < uc.length; Af++) {
    var zf = uc[Af],
      ov = zf.toLowerCase(),
      dv = zf[0].toUpperCase() + zf.slice(1);
    Me(ov, 'on' + dv);
  }
  (Me(br, 'onAnimationEnd'),
    Me(_r, 'onAnimationIteration'),
    Me(Er, 'onAnimationStart'),
    Me('dblclick', 'onDoubleClick'),
    Me('focusin', 'onFocus'),
    Me('focusout', 'onBlur'),
    Me(Oy, 'onTransitionRun'),
    Me(My, 'onTransitionStart'),
    Me(Cy, 'onTransitionCancel'),
    Me(Tr, 'onTransitionEnd'),
    fa('onMouseEnter', ['mouseout', 'mouseover']),
    fa('onMouseLeave', ['mouseout', 'mouseover']),
    fa('onPointerEnter', ['pointerout', 'pointerover']),
    fa('onPointerLeave', ['pointerout', 'pointerover']),
    Ll('onChange', 'change click focusin focusout input keydown keyup selectionchange'.split(' ')),
    Ll(
      'onSelect',
      'focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange'.split(
        ' '
      )
    ),
    Ll('onBeforeInput', ['compositionend', 'keypress', 'textInput', 'paste']),
    Ll('onCompositionEnd', 'compositionend focusout keydown keypress keyup mousedown'.split(' ')),
    Ll(
      'onCompositionStart',
      'compositionstart focusout keydown keypress keyup mousedown'.split(' ')
    ),
    Ll(
      'onCompositionUpdate',
      'compositionupdate focusout keydown keypress keyup mousedown'.split(' ')
    ));
  var Cn =
      'abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting'.split(
        ' '
      ),
    mv = new Set(
      'beforetoggle cancel close invalid load scroll scrollend toggle'.split(' ').concat(Cn)
    );
  function Vd(t, e) {
    e = (e & 4) !== 0;
    for (var l = 0; l < t.length; l++) {
      var a = t[l],
        n = a.event;
      a = a.listeners;
      t: {
        var u = void 0;
        if (e)
          for (var c = a.length - 1; 0 <= c; c--) {
            var o = a[c],
              h = o.instance,
              E = o.currentTarget;
            if (((o = o.listener), h !== u && n.isPropagationStopped())) break t;
            ((u = o), (n.currentTarget = E));
            try {
              u(n);
            } catch (C) {
              yu(C);
            }
            ((n.currentTarget = null), (u = h));
          }
        else
          for (c = 0; c < a.length; c++) {
            if (
              ((o = a[c]),
              (h = o.instance),
              (E = o.currentTarget),
              (o = o.listener),
              h !== u && n.isPropagationStopped())
            )
              break t;
            ((u = o), (n.currentTarget = E));
            try {
              u(n);
            } catch (C) {
              yu(C);
            }
            ((n.currentTarget = null), (u = h));
          }
      }
    }
  }
  function nt(t, e) {
    var l = e[qi];
    l === void 0 && (l = e[qi] = new Set());
    var a = t + '__bubble';
    l.has(a) || (Kd(e, t, 2, !1), l.add(a));
  }
  function Rf(t, e, l) {
    var a = 0;
    (e && (a |= 4), Kd(l, t, a, e));
  }
  var ei = '_reactListening' + Math.random().toString(36).slice(2);
  function xf(t) {
    if (!t[ei]) {
      ((t[ei] = !0),
        Ls.forEach(function (l) {
          l !== 'selectionchange' && (mv.has(l) || Rf(l, !1, t), Rf(l, !0, t));
        }));
      var e = t.nodeType === 9 ? t : t.ownerDocument;
      e === null || e[ei] || ((e[ei] = !0), Rf('selectionchange', !1, e));
    }
  }
  function Kd(t, e, l, a) {
    switch (_m(e)) {
      case 2:
        var n = wv;
        break;
      case 8:
        n = Xv;
        break;
      default:
        n = Xf;
    }
    ((l = n.bind(null, e, l, t)),
      (n = void 0),
      !Ki || (e !== 'touchstart' && e !== 'touchmove' && e !== 'wheel') || (n = !0),
      a
        ? n !== void 0
          ? t.addEventListener(e, l, { capture: !0, passive: n })
          : t.addEventListener(e, l, !0)
        : n !== void 0
          ? t.addEventListener(e, l, { passive: n })
          : t.addEventListener(e, l, !1));
  }
  function Of(t, e, l, a, n) {
    var u = a;
    if ((e & 1) === 0 && (e & 2) === 0 && a !== null)
      t: for (;;) {
        if (a === null) return;
        var c = a.tag;
        if (c === 3 || c === 4) {
          var o = a.stateNode.containerInfo;
          if (o === n) break;
          if (c === 4)
            for (c = a.return; c !== null; ) {
              var h = c.tag;
              if ((h === 3 || h === 4) && c.stateNode.containerInfo === n) return;
              c = c.return;
            }
          for (; o !== null; ) {
            if (((c = ua(o)), c === null)) return;
            if (((h = c.tag), h === 5 || h === 6 || h === 26 || h === 27)) {
              a = u = c;
              continue t;
            }
            o = o.parentNode;
          }
        }
        a = a.return;
      }
    Ws(function () {
      var E = u,
        C = Zi(l),
        j = [];
      t: {
        var A = Ar.get(t);
        if (A !== void 0) {
          var x = du,
            X = t;
          switch (t) {
            case 'keypress':
              if (ru(l) === 0) break t;
            case 'keydown':
            case 'keyup':
              x = iy;
              break;
            case 'focusin':
              ((X = 'focus'), (x = Wi));
              break;
            case 'focusout':
              ((X = 'blur'), (x = Wi));
              break;
            case 'beforeblur':
            case 'afterblur':
              x = Wi;
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
              x = Ps;
              break;
            case 'drag':
            case 'dragend':
            case 'dragenter':
            case 'dragexit':
            case 'dragleave':
            case 'dragover':
            case 'dragstart':
            case 'drop':
              x = Jh;
              break;
            case 'touchcancel':
            case 'touchend':
            case 'touchmove':
            case 'touchstart':
              x = sy;
              break;
            case br:
            case _r:
            case Er:
              x = Fh;
              break;
            case Tr:
              x = oy;
              break;
            case 'scroll':
            case 'scrollend':
              x = Kh;
              break;
            case 'wheel':
              x = my;
              break;
            case 'copy':
            case 'cut':
            case 'paste':
              x = Ph;
              break;
            case 'gotpointercapture':
            case 'lostpointercapture':
            case 'pointercancel':
            case 'pointerdown':
            case 'pointermove':
            case 'pointerout':
            case 'pointerover':
            case 'pointerup':
              x = er;
              break;
            case 'toggle':
            case 'beforetoggle':
              x = yy;
          }
          var J = (e & 4) !== 0,
            St = !J && (t === 'scroll' || t === 'scrollend'),
            b = J ? (A !== null ? A + 'Capture' : null) : A;
          J = [];
          for (var v = E, _; v !== null; ) {
            var N = v;
            if (
              ((_ = N.stateNode),
              (N = N.tag),
              (N !== 5 && N !== 26 && N !== 27) ||
                _ === null ||
                b === null ||
                ((N = Fa(v, b)), N != null && J.push(Dn(v, N, _))),
              St)
            )
              break;
            v = v.return;
          }
          0 < J.length && ((A = new x(A, X, null, l, C)), j.push({ event: A, listeners: J }));
        }
      }
      if ((e & 7) === 0) {
        t: {
          if (
            ((A = t === 'mouseover' || t === 'pointerover'),
            (x = t === 'mouseout' || t === 'pointerout'),
            A && l !== Qi && (X = l.relatedTarget || l.fromElement) && (ua(X) || X[na]))
          )
            break t;
          if (
            (x || A) &&
            ((A =
              C.window === C
                ? C
                : (A = C.ownerDocument)
                  ? A.defaultView || A.parentWindow
                  : window),
            x
              ? ((X = l.relatedTarget || l.toElement),
                (x = E),
                (X = X ? ua(X) : null),
                X !== null &&
                  ((St = m(X)), (J = X.tag), X !== St || (J !== 5 && J !== 27 && J !== 6)) &&
                  (X = null))
              : ((x = null), (X = E)),
            x !== X)
          ) {
            if (
              ((J = Ps),
              (N = 'onMouseLeave'),
              (b = 'onMouseEnter'),
              (v = 'mouse'),
              (t === 'pointerout' || t === 'pointerover') &&
                ((J = er), (N = 'onPointerLeave'), (b = 'onPointerEnter'), (v = 'pointer')),
              (St = x == null ? A : Wa(x)),
              (_ = X == null ? A : Wa(X)),
              (A = new J(N, v + 'leave', x, l, C)),
              (A.target = St),
              (A.relatedTarget = _),
              (N = null),
              ua(C) === E &&
                ((J = new J(b, v + 'enter', X, l, C)),
                (J.target = _),
                (J.relatedTarget = St),
                (N = J)),
              (St = N),
              x && X)
            )
              e: {
                for (J = hv, b = x, v = X, _ = 0, N = b; N; N = J(N)) _++;
                N = 0;
                for (var K = v; K; K = J(K)) N++;
                for (; 0 < _ - N; ) ((b = J(b)), _--);
                for (; 0 < N - _; ) ((v = J(v)), N--);
                for (; _--; ) {
                  if (b === v || (v !== null && b === v.alternate)) {
                    J = b;
                    break e;
                  }
                  ((b = J(b)), (v = J(v)));
                }
                J = null;
              }
            else J = null;
            (x !== null && kd(j, A, x, J, !1), X !== null && St !== null && kd(j, St, X, J, !0));
          }
        }
        t: {
          if (
            ((A = E ? Wa(E) : window),
            (x = A.nodeName && A.nodeName.toLowerCase()),
            x === 'select' || (x === 'input' && A.type === 'file'))
          )
            var ft = sr;
          else if (cr(A))
            if (rr) ft = zy;
            else {
              ft = Ty;
              var V = Ey;
            }
          else
            ((x = A.nodeName),
              !x || x.toLowerCase() !== 'input' || (A.type !== 'checkbox' && A.type !== 'radio')
                ? E && Xi(E.elementType) && (ft = sr)
                : (ft = Ay));
          if (ft && (ft = ft(t, E))) {
            fr(j, ft, l, C);
            break t;
          }
          (V && V(t, A, E),
            t === 'focusout' &&
              E &&
              A.type === 'number' &&
              E.memoizedProps.value != null &&
              wi(A, 'number', A.value));
        }
        switch (((V = E ? Wa(E) : window), t)) {
          case 'focusin':
            (cr(V) || V.contentEditable === 'true') && ((ha = V), (lc = E), (un = null));
            break;
          case 'focusout':
            un = lc = ha = null;
            break;
          case 'mousedown':
            ac = !0;
            break;
          case 'contextmenu':
          case 'mouseup':
          case 'dragend':
            ((ac = !1), gr(j, l, C));
            break;
          case 'selectionchange':
            if (xy) break;
          case 'keydown':
          case 'keyup':
            gr(j, l, C);
        }
        var et;
        if (Ii)
          t: {
            switch (t) {
              case 'compositionstart':
                var it = 'onCompositionStart';
                break t;
              case 'compositionend':
                it = 'onCompositionEnd';
                break t;
              case 'compositionupdate':
                it = 'onCompositionUpdate';
                break t;
            }
            it = void 0;
          }
        else
          ma
            ? ur(t, l) && (it = 'onCompositionEnd')
            : t === 'keydown' && l.keyCode === 229 && (it = 'onCompositionStart');
        (it &&
          (lr &&
            l.locale !== 'ko' &&
            (ma || it !== 'onCompositionStart'
              ? it === 'onCompositionEnd' && ma && (et = Fs())
              : ((sl = C), (ki = 'value' in sl ? sl.value : sl.textContent), (ma = !0))),
          (V = li(E, it)),
          0 < V.length &&
            ((it = new tr(it, t, null, l, C)),
            j.push({ event: it, listeners: V }),
            et ? (it.data = et) : ((et = ir(l)), et !== null && (it.data = et)))),
          (et = py ? gy(t, l) : Sy(t, l)) &&
            ((it = li(E, 'onBeforeInput')),
            0 < it.length &&
              ((V = new tr('onBeforeInput', 'beforeinput', null, l, C)),
              j.push({ event: V, listeners: it }),
              (V.data = et))),
          rv(j, t, E, l, C));
      }
      Vd(j, e);
    });
  }
  function Dn(t, e, l) {
    return { instance: t, listener: e, currentTarget: l };
  }
  function li(t, e) {
    for (var l = e + 'Capture', a = []; t !== null; ) {
      var n = t,
        u = n.stateNode;
      if (
        ((n = n.tag),
        (n !== 5 && n !== 26 && n !== 27) ||
          u === null ||
          ((n = Fa(t, l)),
          n != null && a.unshift(Dn(t, n, u)),
          (n = Fa(t, e)),
          n != null && a.push(Dn(t, n, u))),
        t.tag === 3)
      )
        return a;
      t = t.return;
    }
    return [];
  }
  function hv(t) {
    if (t === null) return null;
    do t = t.return;
    while (t && t.tag !== 5 && t.tag !== 27);
    return t || null;
  }
  function kd(t, e, l, a, n) {
    for (var u = e._reactName, c = []; l !== null && l !== a; ) {
      var o = l,
        h = o.alternate,
        E = o.stateNode;
      if (((o = o.tag), h !== null && h === a)) break;
      ((o !== 5 && o !== 26 && o !== 27) ||
        E === null ||
        ((h = E),
        n
          ? ((E = Fa(l, u)), E != null && c.unshift(Dn(l, E, h)))
          : n || ((E = Fa(l, u)), E != null && c.push(Dn(l, E, h)))),
        (l = l.return));
    }
    c.length !== 0 && t.push({ event: e, listeners: c });
  }
  var yv = /\r\n?/g,
    vv = /\u0000|\uFFFD/g;
  function Jd(t) {
    return (typeof t == 'string' ? t : '' + t)
      .replace(
        yv,
        `
`
      )
      .replace(vv, '');
  }
  function $d(t, e) {
    return ((e = Jd(e)), Jd(t) === e);
  }
  function gt(t, e, l, a, n, u) {
    switch (l) {
      case 'children':
        typeof a == 'string'
          ? e === 'body' || (e === 'textarea' && a === '') || ra(t, a)
          : (typeof a == 'number' || typeof a == 'bigint') && e !== 'body' && ra(t, '' + a);
        break;
      case 'className':
        iu(t, 'class', a);
        break;
      case 'tabIndex':
        iu(t, 'tabindex', a);
        break;
      case 'dir':
      case 'role':
      case 'viewBox':
      case 'width':
      case 'height':
        iu(t, l, a);
        break;
      case 'style':
        Js(t, a, u);
        break;
      case 'data':
        if (e !== 'object') {
          iu(t, 'data', a);
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
        ((a = fu('' + a)), t.setAttribute(l, a));
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
          typeof u == 'function' &&
            (l === 'formAction'
              ? (e !== 'input' && gt(t, e, 'name', n.name, n, null),
                gt(t, e, 'formEncType', n.formEncType, n, null),
                gt(t, e, 'formMethod', n.formMethod, n, null),
                gt(t, e, 'formTarget', n.formTarget, n, null))
              : (gt(t, e, 'encType', n.encType, n, null),
                gt(t, e, 'method', n.method, n, null),
                gt(t, e, 'target', n.target, n, null)));
        if (a == null || typeof a == 'symbol' || typeof a == 'boolean') {
          t.removeAttribute(l);
          break;
        }
        ((a = fu('' + a)), t.setAttribute(l, a));
        break;
      case 'onClick':
        a != null && (t.onclick = Qe);
        break;
      case 'onScroll':
        a != null && nt('scroll', t);
        break;
      case 'onScrollEnd':
        a != null && nt('scrollend', t);
        break;
      case 'dangerouslySetInnerHTML':
        if (a != null) {
          if (typeof a != 'object' || !('__html' in a)) throw Error(f(61));
          if (((l = a.__html), l != null)) {
            if (n.children != null) throw Error(f(60));
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
        ((l = fu('' + a)), t.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', l));
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
        (nt('beforetoggle', t), nt('toggle', t), uu(t, 'popover', a));
        break;
      case 'xlinkActuate':
        Xe(t, 'http://www.w3.org/1999/xlink', 'xlink:actuate', a);
        break;
      case 'xlinkArcrole':
        Xe(t, 'http://www.w3.org/1999/xlink', 'xlink:arcrole', a);
        break;
      case 'xlinkRole':
        Xe(t, 'http://www.w3.org/1999/xlink', 'xlink:role', a);
        break;
      case 'xlinkShow':
        Xe(t, 'http://www.w3.org/1999/xlink', 'xlink:show', a);
        break;
      case 'xlinkTitle':
        Xe(t, 'http://www.w3.org/1999/xlink', 'xlink:title', a);
        break;
      case 'xlinkType':
        Xe(t, 'http://www.w3.org/1999/xlink', 'xlink:type', a);
        break;
      case 'xmlBase':
        Xe(t, 'http://www.w3.org/XML/1998/namespace', 'xml:base', a);
        break;
      case 'xmlLang':
        Xe(t, 'http://www.w3.org/XML/1998/namespace', 'xml:lang', a);
        break;
      case 'xmlSpace':
        Xe(t, 'http://www.w3.org/XML/1998/namespace', 'xml:space', a);
        break;
      case 'is':
        uu(t, 'is', a);
        break;
      case 'innerText':
      case 'textContent':
        break;
      default:
        (!(2 < l.length) || (l[0] !== 'o' && l[0] !== 'O') || (l[1] !== 'n' && l[1] !== 'N')) &&
          ((l = Zh.get(l) || l), uu(t, l, a));
    }
  }
  function Mf(t, e, l, a, n, u) {
    switch (l) {
      case 'style':
        Js(t, a, u);
        break;
      case 'dangerouslySetInnerHTML':
        if (a != null) {
          if (typeof a != 'object' || !('__html' in a)) throw Error(f(61));
          if (((l = a.__html), l != null)) {
            if (n.children != null) throw Error(f(60));
            t.innerHTML = l;
          }
        }
        break;
      case 'children':
        typeof a == 'string'
          ? ra(t, a)
          : (typeof a == 'number' || typeof a == 'bigint') && ra(t, '' + a);
        break;
      case 'onScroll':
        a != null && nt('scroll', t);
        break;
      case 'onScrollEnd':
        a != null && nt('scrollend', t);
        break;
      case 'onClick':
        a != null && (t.onclick = Qe);
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
        if (!Ys.hasOwnProperty(l))
          t: {
            if (
              l[0] === 'o' &&
              l[1] === 'n' &&
              ((n = l.endsWith('Capture')),
              (e = l.slice(2, n ? l.length - 7 : void 0)),
              (u = t[Pt] || null),
              (u = u != null ? u[l] : null),
              typeof u == 'function' && t.removeEventListener(e, u, n),
              typeof a == 'function')
            ) {
              (typeof u != 'function' &&
                u !== null &&
                (l in t ? (t[l] = null) : t.hasAttribute(l) && t.removeAttribute(l)),
                t.addEventListener(e, a, n));
              break t;
            }
            l in t ? (t[l] = a) : a === !0 ? t.setAttribute(l, '') : uu(t, l, a);
          }
    }
  }
  function kt(t, e, l) {
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
        (nt('error', t), nt('load', t));
        var a = !1,
          n = !1,
          u;
        for (u in l)
          if (l.hasOwnProperty(u)) {
            var c = l[u];
            if (c != null)
              switch (u) {
                case 'src':
                  a = !0;
                  break;
                case 'srcSet':
                  n = !0;
                  break;
                case 'children':
                case 'dangerouslySetInnerHTML':
                  throw Error(f(137, e));
                default:
                  gt(t, e, u, c, l, null);
              }
          }
        (n && gt(t, e, 'srcSet', l.srcSet, l, null), a && gt(t, e, 'src', l.src, l, null));
        return;
      case 'input':
        nt('invalid', t);
        var o = (u = c = n = null),
          h = null,
          E = null;
        for (a in l)
          if (l.hasOwnProperty(a)) {
            var C = l[a];
            if (C != null)
              switch (a) {
                case 'name':
                  n = C;
                  break;
                case 'type':
                  c = C;
                  break;
                case 'checked':
                  h = C;
                  break;
                case 'defaultChecked':
                  E = C;
                  break;
                case 'value':
                  u = C;
                  break;
                case 'defaultValue':
                  o = C;
                  break;
                case 'children':
                case 'dangerouslySetInnerHTML':
                  if (C != null) throw Error(f(137, e));
                  break;
                default:
                  gt(t, e, a, C, l, null);
              }
          }
        Zs(t, u, o, h, E, c, n, !1);
        return;
      case 'select':
        (nt('invalid', t), (a = c = u = null));
        for (n in l)
          if (l.hasOwnProperty(n) && ((o = l[n]), o != null))
            switch (n) {
              case 'value':
                u = o;
                break;
              case 'defaultValue':
                c = o;
                break;
              case 'multiple':
                a = o;
              default:
                gt(t, e, n, o, l, null);
            }
        ((e = u),
          (l = c),
          (t.multiple = !!a),
          e != null ? sa(t, !!a, e, !1) : l != null && sa(t, !!a, l, !0));
        return;
      case 'textarea':
        (nt('invalid', t), (u = n = a = null));
        for (c in l)
          if (l.hasOwnProperty(c) && ((o = l[c]), o != null))
            switch (c) {
              case 'value':
                a = o;
                break;
              case 'defaultValue':
                n = o;
                break;
              case 'children':
                u = o;
                break;
              case 'dangerouslySetInnerHTML':
                if (o != null) throw Error(f(91));
                break;
              default:
                gt(t, e, c, o, l, null);
            }
        Ks(t, a, n, u);
        return;
      case 'option':
        for (h in l)
          if (l.hasOwnProperty(h) && ((a = l[h]), a != null))
            switch (h) {
              case 'selected':
                t.selected = a && typeof a != 'function' && typeof a != 'symbol';
                break;
              default:
                gt(t, e, h, a, l, null);
            }
        return;
      case 'dialog':
        (nt('beforetoggle', t), nt('toggle', t), nt('cancel', t), nt('close', t));
        break;
      case 'iframe':
      case 'object':
        nt('load', t);
        break;
      case 'video':
      case 'audio':
        for (a = 0; a < Cn.length; a++) nt(Cn[a], t);
        break;
      case 'image':
        (nt('error', t), nt('load', t));
        break;
      case 'details':
        nt('toggle', t);
        break;
      case 'embed':
      case 'source':
      case 'link':
        (nt('error', t), nt('load', t));
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
        for (E in l)
          if (l.hasOwnProperty(E) && ((a = l[E]), a != null))
            switch (E) {
              case 'children':
              case 'dangerouslySetInnerHTML':
                throw Error(f(137, e));
              default:
                gt(t, e, E, a, l, null);
            }
        return;
      default:
        if (Xi(e)) {
          for (C in l)
            l.hasOwnProperty(C) && ((a = l[C]), a !== void 0 && Mf(t, e, C, a, l, void 0));
          return;
        }
    }
    for (o in l) l.hasOwnProperty(o) && ((a = l[o]), a != null && gt(t, e, o, a, l, null));
  }
  function pv(t, e, l, a) {
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
        var n = null,
          u = null,
          c = null,
          o = null,
          h = null,
          E = null,
          C = null;
        for (x in l) {
          var j = l[x];
          if (l.hasOwnProperty(x) && j != null)
            switch (x) {
              case 'checked':
                break;
              case 'value':
                break;
              case 'defaultValue':
                h = j;
              default:
                a.hasOwnProperty(x) || gt(t, e, x, null, a, j);
            }
        }
        for (var A in a) {
          var x = a[A];
          if (((j = l[A]), a.hasOwnProperty(A) && (x != null || j != null)))
            switch (A) {
              case 'type':
                u = x;
                break;
              case 'name':
                n = x;
                break;
              case 'checked':
                E = x;
                break;
              case 'defaultChecked':
                C = x;
                break;
              case 'value':
                c = x;
                break;
              case 'defaultValue':
                o = x;
                break;
              case 'children':
              case 'dangerouslySetInnerHTML':
                if (x != null) throw Error(f(137, e));
                break;
              default:
                x !== j && gt(t, e, A, x, a, j);
            }
        }
        Gi(t, c, o, h, E, C, u, n);
        return;
      case 'select':
        x = c = o = A = null;
        for (u in l)
          if (((h = l[u]), l.hasOwnProperty(u) && h != null))
            switch (u) {
              case 'value':
                break;
              case 'multiple':
                x = h;
              default:
                a.hasOwnProperty(u) || gt(t, e, u, null, a, h);
            }
        for (n in a)
          if (((u = a[n]), (h = l[n]), a.hasOwnProperty(n) && (u != null || h != null)))
            switch (n) {
              case 'value':
                A = u;
                break;
              case 'defaultValue':
                o = u;
                break;
              case 'multiple':
                c = u;
              default:
                u !== h && gt(t, e, n, u, a, h);
            }
        ((e = o),
          (l = c),
          (a = x),
          A != null
            ? sa(t, !!l, A, !1)
            : !!a != !!l && (e != null ? sa(t, !!l, e, !0) : sa(t, !!l, l ? [] : '', !1)));
        return;
      case 'textarea':
        x = A = null;
        for (o in l)
          if (((n = l[o]), l.hasOwnProperty(o) && n != null && !a.hasOwnProperty(o)))
            switch (o) {
              case 'value':
                break;
              case 'children':
                break;
              default:
                gt(t, e, o, null, a, n);
            }
        for (c in a)
          if (((n = a[c]), (u = l[c]), a.hasOwnProperty(c) && (n != null || u != null)))
            switch (c) {
              case 'value':
                A = n;
                break;
              case 'defaultValue':
                x = n;
                break;
              case 'children':
                break;
              case 'dangerouslySetInnerHTML':
                if (n != null) throw Error(f(91));
                break;
              default:
                n !== u && gt(t, e, c, n, a, u);
            }
        Vs(t, A, x);
        return;
      case 'option':
        for (var X in l)
          if (((A = l[X]), l.hasOwnProperty(X) && A != null && !a.hasOwnProperty(X)))
            switch (X) {
              case 'selected':
                t.selected = !1;
                break;
              default:
                gt(t, e, X, null, a, A);
            }
        for (h in a)
          if (((A = a[h]), (x = l[h]), a.hasOwnProperty(h) && A !== x && (A != null || x != null)))
            switch (h) {
              case 'selected':
                t.selected = A && typeof A != 'function' && typeof A != 'symbol';
                break;
              default:
                gt(t, e, h, A, a, x);
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
        for (var J in l)
          ((A = l[J]),
            l.hasOwnProperty(J) && A != null && !a.hasOwnProperty(J) && gt(t, e, J, null, a, A));
        for (E in a)
          if (((A = a[E]), (x = l[E]), a.hasOwnProperty(E) && A !== x && (A != null || x != null)))
            switch (E) {
              case 'children':
              case 'dangerouslySetInnerHTML':
                if (A != null) throw Error(f(137, e));
                break;
              default:
                gt(t, e, E, A, a, x);
            }
        return;
      default:
        if (Xi(e)) {
          for (var St in l)
            ((A = l[St]),
              l.hasOwnProperty(St) &&
                A !== void 0 &&
                !a.hasOwnProperty(St) &&
                Mf(t, e, St, void 0, a, A));
          for (C in a)
            ((A = a[C]),
              (x = l[C]),
              !a.hasOwnProperty(C) ||
                A === x ||
                (A === void 0 && x === void 0) ||
                Mf(t, e, C, A, a, x));
          return;
        }
    }
    for (var b in l)
      ((A = l[b]),
        l.hasOwnProperty(b) && A != null && !a.hasOwnProperty(b) && gt(t, e, b, null, a, A));
    for (j in a)
      ((A = a[j]),
        (x = l[j]),
        !a.hasOwnProperty(j) || A === x || (A == null && x == null) || gt(t, e, j, A, a, x));
  }
  function Wd(t) {
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
  function gv() {
    if (typeof performance.getEntriesByType == 'function') {
      for (
        var t = 0, e = 0, l = performance.getEntriesByType('resource'), a = 0;
        a < l.length;
        a++
      ) {
        var n = l[a],
          u = n.transferSize,
          c = n.initiatorType,
          o = n.duration;
        if (u && o && Wd(c)) {
          for (c = 0, o = n.responseEnd, a += 1; a < l.length; a++) {
            var h = l[a],
              E = h.startTime;
            if (E > o) break;
            var C = h.transferSize,
              j = h.initiatorType;
            C && Wd(j) && ((h = h.responseEnd), (c += C * (h < o ? 1 : (o - E) / (h - E))));
          }
          if ((--a, (e += (8 * (u + c)) / (n.duration / 1e3)), t++, 10 < t)) break;
        }
      }
      if (0 < t) return e / t / 1e6;
    }
    return navigator.connection && ((t = navigator.connection.downlink), typeof t == 'number')
      ? t
      : 5;
  }
  var Cf = null,
    Df = null;
  function ai(t) {
    return t.nodeType === 9 ? t : t.ownerDocument;
  }
  function Fd(t) {
    switch (t) {
      case 'http://www.w3.org/2000/svg':
        return 1;
      case 'http://www.w3.org/1998/Math/MathML':
        return 2;
      default:
        return 0;
    }
  }
  function Id(t, e) {
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
  function Nf(t, e) {
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
  var Uf = null;
  function Sv() {
    var t = window.event;
    return t && t.type === 'popstate' ? (t === Uf ? !1 : ((Uf = t), !0)) : ((Uf = null), !1);
  }
  var Pd = typeof setTimeout == 'function' ? setTimeout : void 0,
    bv = typeof clearTimeout == 'function' ? clearTimeout : void 0,
    tm = typeof Promise == 'function' ? Promise : void 0,
    _v =
      typeof queueMicrotask == 'function'
        ? queueMicrotask
        : typeof tm < 'u'
          ? function (t) {
              return tm.resolve(null).then(t).catch(Ev);
            }
          : Pd;
  function Ev(t) {
    setTimeout(function () {
      throw t;
    });
  }
  function Rl(t) {
    return t === 'head';
  }
  function em(t, e) {
    var l = e,
      a = 0;
    do {
      var n = l.nextSibling;
      if ((t.removeChild(l), n && n.nodeType === 8))
        if (((l = n.data), l === '/$' || l === '/&')) {
          if (a === 0) {
            (t.removeChild(n), wa(e));
            return;
          }
          a--;
        } else if (l === '$' || l === '$?' || l === '$~' || l === '$!' || l === '&') a++;
        else if (l === 'html') Nn(t.ownerDocument.documentElement);
        else if (l === 'head') {
          ((l = t.ownerDocument.head), Nn(l));
          for (var u = l.firstChild; u; ) {
            var c = u.nextSibling,
              o = u.nodeName;
            (u[$a] ||
              o === 'SCRIPT' ||
              o === 'STYLE' ||
              (o === 'LINK' && u.rel.toLowerCase() === 'stylesheet') ||
              l.removeChild(u),
              (u = c));
          }
        } else l === 'body' && Nn(t.ownerDocument.body);
      l = n;
    } while (l);
    wa(e);
  }
  function lm(t, e) {
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
  function jf(t) {
    var e = t.firstChild;
    for (e && e.nodeType === 10 && (e = e.nextSibling); e; ) {
      var l = e;
      switch (((e = e.nextSibling), l.nodeName)) {
        case 'HTML':
        case 'HEAD':
        case 'BODY':
          (jf(l), Li(l));
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
  function Tv(t, e, l, a) {
    for (; t.nodeType === 1; ) {
      var n = l;
      if (t.nodeName.toLowerCase() !== e.toLowerCase()) {
        if (!a && (t.nodeName !== 'INPUT' || t.type !== 'hidden')) break;
      } else if (a) {
        if (!t[$a])
          switch (e) {
            case 'meta':
              if (!t.hasAttribute('itemprop')) break;
              return t;
            case 'link':
              if (
                ((u = t.getAttribute('rel')),
                u === 'stylesheet' && t.hasAttribute('data-precedence'))
              )
                break;
              if (
                u !== n.rel ||
                t.getAttribute('href') !== (n.href == null || n.href === '' ? null : n.href) ||
                t.getAttribute('crossorigin') !== (n.crossOrigin == null ? null : n.crossOrigin) ||
                t.getAttribute('title') !== (n.title == null ? null : n.title)
              )
                break;
              return t;
            case 'style':
              if (t.hasAttribute('data-precedence')) break;
              return t;
            case 'script':
              if (
                ((u = t.getAttribute('src')),
                (u !== (n.src == null ? null : n.src) ||
                  t.getAttribute('type') !== (n.type == null ? null : n.type) ||
                  t.getAttribute('crossorigin') !==
                    (n.crossOrigin == null ? null : n.crossOrigin)) &&
                  u &&
                  t.hasAttribute('async') &&
                  !t.hasAttribute('itemprop'))
              )
                break;
              return t;
            default:
              return t;
          }
      } else if (e === 'input' && t.type === 'hidden') {
        var u = n.name == null ? null : '' + n.name;
        if (n.type === 'hidden' && t.getAttribute('name') === u) return t;
      } else return t;
      if (((t = xe(t.nextSibling)), t === null)) break;
    }
    return null;
  }
  function Av(t, e, l) {
    if (e === '') return null;
    for (; t.nodeType !== 3; )
      if (
        ((t.nodeType !== 1 || t.nodeName !== 'INPUT' || t.type !== 'hidden') && !l) ||
        ((t = xe(t.nextSibling)), t === null)
      )
        return null;
    return t;
  }
  function am(t, e) {
    for (; t.nodeType !== 8; )
      if (
        ((t.nodeType !== 1 || t.nodeName !== 'INPUT' || t.type !== 'hidden') && !e) ||
        ((t = xe(t.nextSibling)), t === null)
      )
        return null;
    return t;
  }
  function Hf(t) {
    return t.data === '$?' || t.data === '$~';
  }
  function Bf(t) {
    return t.data === '$!' || (t.data === '$?' && t.ownerDocument.readyState !== 'loading');
  }
  function zv(t, e) {
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
  function xe(t) {
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
  var qf = null;
  function nm(t) {
    t = t.nextSibling;
    for (var e = 0; t; ) {
      if (t.nodeType === 8) {
        var l = t.data;
        if (l === '/$' || l === '/&') {
          if (e === 0) return xe(t.nextSibling);
          e--;
        } else (l !== '$' && l !== '$!' && l !== '$?' && l !== '$~' && l !== '&') || e++;
      }
      t = t.nextSibling;
    }
    return null;
  }
  function um(t) {
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
  function im(t, e, l) {
    switch (((e = ai(l)), t)) {
      case 'html':
        if (((t = e.documentElement), !t)) throw Error(f(452));
        return t;
      case 'head':
        if (((t = e.head), !t)) throw Error(f(453));
        return t;
      case 'body':
        if (((t = e.body), !t)) throw Error(f(454));
        return t;
      default:
        throw Error(f(451));
    }
  }
  function Nn(t) {
    for (var e = t.attributes; e.length; ) t.removeAttributeNode(e[0]);
    Li(t);
  }
  var Oe = new Map(),
    cm = new Set();
  function ni(t) {
    return typeof t.getRootNode == 'function'
      ? t.getRootNode()
      : t.nodeType === 9
        ? t
        : t.ownerDocument;
  }
  var ul = q.d;
  q.d = { f: Rv, r: xv, D: Ov, C: Mv, L: Cv, m: Dv, X: Uv, S: Nv, M: jv };
  function Rv() {
    var t = ul.f(),
      e = $u();
    return t || e;
  }
  function xv(t) {
    var e = ia(t);
    e !== null && e.tag === 5 && e.type === 'form' ? Ao(e) : ul.r(t);
  }
  var La = typeof document > 'u' ? null : document;
  function fm(t, e, l) {
    var a = La;
    if (a && typeof e == 'string' && e) {
      var n = be(e);
      ((n = 'link[rel="' + t + '"][href="' + n + '"]'),
        typeof l == 'string' && (n += '[crossorigin="' + l + '"]'),
        cm.has(n) ||
          (cm.add(n),
          (t = { rel: t, crossOrigin: l, href: e }),
          a.querySelector(n) === null &&
            ((e = a.createElement('link')), kt(e, 'link', t), wt(e), a.head.appendChild(e))));
    }
  }
  function Ov(t) {
    (ul.D(t), fm('dns-prefetch', t, null));
  }
  function Mv(t, e) {
    (ul.C(t, e), fm('preconnect', t, e));
  }
  function Cv(t, e, l) {
    ul.L(t, e, l);
    var a = La;
    if (a && t && e) {
      var n = 'link[rel="preload"][as="' + be(e) + '"]';
      e === 'image' && l && l.imageSrcSet
        ? ((n += '[imagesrcset="' + be(l.imageSrcSet) + '"]'),
          typeof l.imageSizes == 'string' && (n += '[imagesizes="' + be(l.imageSizes) + '"]'))
        : (n += '[href="' + be(t) + '"]');
      var u = n;
      switch (e) {
        case 'style':
          u = Ya(t);
          break;
        case 'script':
          u = Ga(t);
      }
      Oe.has(u) ||
        ((t = T(
          { rel: 'preload', href: e === 'image' && l && l.imageSrcSet ? void 0 : t, as: e },
          l
        )),
        Oe.set(u, t),
        a.querySelector(n) !== null ||
          (e === 'style' && a.querySelector(Un(u))) ||
          (e === 'script' && a.querySelector(jn(u))) ||
          ((e = a.createElement('link')), kt(e, 'link', t), wt(e), a.head.appendChild(e)));
    }
  }
  function Dv(t, e) {
    ul.m(t, e);
    var l = La;
    if (l && t) {
      var a = e && typeof e.as == 'string' ? e.as : 'script',
        n = 'link[rel="modulepreload"][as="' + be(a) + '"][href="' + be(t) + '"]',
        u = n;
      switch (a) {
        case 'audioworklet':
        case 'paintworklet':
        case 'serviceworker':
        case 'sharedworker':
        case 'worker':
        case 'script':
          u = Ga(t);
      }
      if (
        !Oe.has(u) &&
        ((t = T({ rel: 'modulepreload', href: t }, e)), Oe.set(u, t), l.querySelector(n) === null)
      ) {
        switch (a) {
          case 'audioworklet':
          case 'paintworklet':
          case 'serviceworker':
          case 'sharedworker':
          case 'worker':
          case 'script':
            if (l.querySelector(jn(u))) return;
        }
        ((a = l.createElement('link')), kt(a, 'link', t), wt(a), l.head.appendChild(a));
      }
    }
  }
  function Nv(t, e, l) {
    ul.S(t, e, l);
    var a = La;
    if (a && t) {
      var n = ca(a).hoistableStyles,
        u = Ya(t);
      e = e || 'default';
      var c = n.get(u);
      if (!c) {
        var o = { loading: 0, preload: null };
        if ((c = a.querySelector(Un(u)))) o.loading = 5;
        else {
          ((t = T({ rel: 'stylesheet', href: t, 'data-precedence': e }, l)),
            (l = Oe.get(u)) && Lf(t, l));
          var h = (c = a.createElement('link'));
          (wt(h),
            kt(h, 'link', t),
            (h._p = new Promise(function (E, C) {
              ((h.onload = E), (h.onerror = C));
            })),
            h.addEventListener('load', function () {
              o.loading |= 1;
            }),
            h.addEventListener('error', function () {
              o.loading |= 2;
            }),
            (o.loading |= 4),
            ui(c, e, a));
        }
        ((c = { type: 'stylesheet', instance: c, count: 1, state: o }), n.set(u, c));
      }
    }
  }
  function Uv(t, e) {
    ul.X(t, e);
    var l = La;
    if (l && t) {
      var a = ca(l).hoistableScripts,
        n = Ga(t),
        u = a.get(n);
      u ||
        ((u = l.querySelector(jn(n))),
        u ||
          ((t = T({ src: t, async: !0 }, e)),
          (e = Oe.get(n)) && Yf(t, e),
          (u = l.createElement('script')),
          wt(u),
          kt(u, 'link', t),
          l.head.appendChild(u)),
        (u = { type: 'script', instance: u, count: 1, state: null }),
        a.set(n, u));
    }
  }
  function jv(t, e) {
    ul.M(t, e);
    var l = La;
    if (l && t) {
      var a = ca(l).hoistableScripts,
        n = Ga(t),
        u = a.get(n);
      u ||
        ((u = l.querySelector(jn(n))),
        u ||
          ((t = T({ src: t, async: !0, type: 'module' }, e)),
          (e = Oe.get(n)) && Yf(t, e),
          (u = l.createElement('script')),
          wt(u),
          kt(u, 'link', t),
          l.head.appendChild(u)),
        (u = { type: 'script', instance: u, count: 1, state: null }),
        a.set(n, u));
    }
  }
  function sm(t, e, l, a) {
    var n = (n = lt.current) ? ni(n) : null;
    if (!n) throw Error(f(446));
    switch (t) {
      case 'meta':
      case 'title':
        return null;
      case 'style':
        return typeof l.precedence == 'string' && typeof l.href == 'string'
          ? ((e = Ya(l.href)),
            (l = ca(n).hoistableStyles),
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
          t = Ya(l.href);
          var u = ca(n).hoistableStyles,
            c = u.get(t);
          if (
            (c ||
              ((n = n.ownerDocument || n),
              (c = {
                type: 'stylesheet',
                instance: null,
                count: 0,
                state: { loading: 0, preload: null },
              }),
              u.set(t, c),
              (u = n.querySelector(Un(t))) && !u._p && ((c.instance = u), (c.state.loading = 5)),
              Oe.has(t) ||
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
                Oe.set(t, l),
                u || Hv(n, t, l, c.state))),
            e && a === null)
          )
            throw Error(f(528, ''));
          return c;
        }
        if (e && a !== null) throw Error(f(529, ''));
        return null;
      case 'script':
        return (
          (e = l.async),
          (l = l.src),
          typeof l == 'string' && e && typeof e != 'function' && typeof e != 'symbol'
            ? ((e = Ga(l)),
              (l = ca(n).hoistableScripts),
              (a = l.get(e)),
              a || ((a = { type: 'script', instance: null, count: 0, state: null }), l.set(e, a)),
              a)
            : { type: 'void', instance: null, count: 0, state: null }
        );
      default:
        throw Error(f(444, t));
    }
  }
  function Ya(t) {
    return 'href="' + be(t) + '"';
  }
  function Un(t) {
    return 'link[rel="stylesheet"][' + t + ']';
  }
  function rm(t) {
    return T({}, t, { 'data-precedence': t.precedence, precedence: null });
  }
  function Hv(t, e, l, a) {
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
        kt(e, 'link', l),
        wt(e),
        t.head.appendChild(e));
  }
  function Ga(t) {
    return '[src="' + be(t) + '"]';
  }
  function jn(t) {
    return 'script[async]' + t;
  }
  function om(t, e, l) {
    if ((e.count++, e.instance === null))
      switch (e.type) {
        case 'style':
          var a = t.querySelector('style[data-href~="' + be(l.href) + '"]');
          if (a) return ((e.instance = a), wt(a), a);
          var n = T({}, l, {
            'data-href': l.href,
            'data-precedence': l.precedence,
            href: null,
            precedence: null,
          });
          return (
            (a = (t.ownerDocument || t).createElement('style')),
            wt(a),
            kt(a, 'style', n),
            ui(a, l.precedence, t),
            (e.instance = a)
          );
        case 'stylesheet':
          n = Ya(l.href);
          var u = t.querySelector(Un(n));
          if (u) return ((e.state.loading |= 4), (e.instance = u), wt(u), u);
          ((a = rm(l)),
            (n = Oe.get(n)) && Lf(a, n),
            (u = (t.ownerDocument || t).createElement('link')),
            wt(u));
          var c = u;
          return (
            (c._p = new Promise(function (o, h) {
              ((c.onload = o), (c.onerror = h));
            })),
            kt(u, 'link', a),
            (e.state.loading |= 4),
            ui(u, l.precedence, t),
            (e.instance = u)
          );
        case 'script':
          return (
            (u = Ga(l.src)),
            (n = t.querySelector(jn(u)))
              ? ((e.instance = n), wt(n), n)
              : ((a = l),
                (n = Oe.get(u)) && ((a = T({}, l)), Yf(a, n)),
                (t = t.ownerDocument || t),
                (n = t.createElement('script')),
                wt(n),
                kt(n, 'link', a),
                t.head.appendChild(n),
                (e.instance = n))
          );
        case 'void':
          return null;
        default:
          throw Error(f(443, e.type));
      }
    else
      e.type === 'stylesheet' &&
        (e.state.loading & 4) === 0 &&
        ((a = e.instance), (e.state.loading |= 4), ui(a, l.precedence, t));
    return e.instance;
  }
  function ui(t, e, l) {
    for (
      var a = l.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),
        n = a.length ? a[a.length - 1] : null,
        u = n,
        c = 0;
      c < a.length;
      c++
    ) {
      var o = a[c];
      if (o.dataset.precedence === e) u = o;
      else if (u !== n) break;
    }
    u
      ? u.parentNode.insertBefore(t, u.nextSibling)
      : ((e = l.nodeType === 9 ? l.head : l), e.insertBefore(t, e.firstChild));
  }
  function Lf(t, e) {
    (t.crossOrigin == null && (t.crossOrigin = e.crossOrigin),
      t.referrerPolicy == null && (t.referrerPolicy = e.referrerPolicy),
      t.title == null && (t.title = e.title));
  }
  function Yf(t, e) {
    (t.crossOrigin == null && (t.crossOrigin = e.crossOrigin),
      t.referrerPolicy == null && (t.referrerPolicy = e.referrerPolicy),
      t.integrity == null && (t.integrity = e.integrity));
  }
  var ii = null;
  function dm(t, e, l) {
    if (ii === null) {
      var a = new Map(),
        n = (ii = new Map());
      n.set(l, a);
    } else ((n = ii), (a = n.get(l)), a || ((a = new Map()), n.set(l, a)));
    if (a.has(t)) return a;
    for (a.set(t, null), l = l.getElementsByTagName(t), n = 0; n < l.length; n++) {
      var u = l[n];
      if (
        !(u[$a] || u[Qt] || (t === 'link' && u.getAttribute('rel') === 'stylesheet')) &&
        u.namespaceURI !== 'http://www.w3.org/2000/svg'
      ) {
        var c = u.getAttribute(e) || '';
        c = t + c;
        var o = a.get(c);
        o ? o.push(u) : a.set(c, [u]);
      }
    }
    return a;
  }
  function mm(t, e, l) {
    ((t = t.ownerDocument || t),
      t.head.insertBefore(l, e === 'title' ? t.querySelector('head > title') : null));
  }
  function Bv(t, e, l) {
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
  function hm(t) {
    return !(t.type === 'stylesheet' && (t.state.loading & 3) === 0);
  }
  function qv(t, e, l, a) {
    if (
      l.type === 'stylesheet' &&
      (typeof a.media != 'string' || matchMedia(a.media).matches !== !1) &&
      (l.state.loading & 4) === 0
    ) {
      if (l.instance === null) {
        var n = Ya(a.href),
          u = e.querySelector(Un(n));
        if (u) {
          ((e = u._p),
            e !== null &&
              typeof e == 'object' &&
              typeof e.then == 'function' &&
              (t.count++, (t = ci.bind(t)), e.then(t, t)),
            (l.state.loading |= 4),
            (l.instance = u),
            wt(u));
          return;
        }
        ((u = e.ownerDocument || e),
          (a = rm(a)),
          (n = Oe.get(n)) && Lf(a, n),
          (u = u.createElement('link')),
          wt(u));
        var c = u;
        ((c._p = new Promise(function (o, h) {
          ((c.onload = o), (c.onerror = h));
        })),
          kt(u, 'link', a),
          (l.instance = u));
      }
      (t.stylesheets === null && (t.stylesheets = new Map()),
        t.stylesheets.set(l, e),
        (e = l.state.preload) &&
          (l.state.loading & 3) === 0 &&
          (t.count++,
          (l = ci.bind(t)),
          e.addEventListener('load', l),
          e.addEventListener('error', l)));
    }
  }
  var Gf = 0;
  function Lv(t, e) {
    return (
      t.stylesheets && t.count === 0 && si(t, t.stylesheets),
      0 < t.count || 0 < t.imgCount
        ? function (l) {
            var a = setTimeout(function () {
              if ((t.stylesheets && si(t, t.stylesheets), t.unsuspend)) {
                var u = t.unsuspend;
                ((t.unsuspend = null), u());
              }
            }, 6e4 + e);
            0 < t.imgBytes && Gf === 0 && (Gf = 62500 * gv());
            var n = setTimeout(
              function () {
                if (
                  ((t.waitingForImages = !1),
                  t.count === 0 && (t.stylesheets && si(t, t.stylesheets), t.unsuspend))
                ) {
                  var u = t.unsuspend;
                  ((t.unsuspend = null), u());
                }
              },
              (t.imgBytes > Gf ? 50 : 800) + e
            );
            return (
              (t.unsuspend = l),
              function () {
                ((t.unsuspend = null), clearTimeout(a), clearTimeout(n));
              }
            );
          }
        : null
    );
  }
  function ci() {
    if ((this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages))) {
      if (this.stylesheets) si(this, this.stylesheets);
      else if (this.unsuspend) {
        var t = this.unsuspend;
        ((this.unsuspend = null), t());
      }
    }
  }
  var fi = null;
  function si(t, e) {
    ((t.stylesheets = null),
      t.unsuspend !== null &&
        (t.count++, (fi = new Map()), e.forEach(Yv, t), (fi = null), ci.call(t)));
  }
  function Yv(t, e) {
    if (!(e.state.loading & 4)) {
      var l = fi.get(t);
      if (l) var a = l.get(null);
      else {
        ((l = new Map()), fi.set(t, l));
        for (
          var n = t.querySelectorAll('link[data-precedence],style[data-precedence]'), u = 0;
          u < n.length;
          u++
        ) {
          var c = n[u];
          (c.nodeName === 'LINK' || c.getAttribute('media') !== 'not all') &&
            (l.set(c.dataset.precedence, c), (a = c));
        }
        a && l.set(null, a);
      }
      ((n = e.instance),
        (c = n.getAttribute('data-precedence')),
        (u = l.get(c) || a),
        u === a && l.set(null, n),
        l.set(c, n),
        this.count++,
        (a = ci.bind(this)),
        n.addEventListener('load', a),
        n.addEventListener('error', a),
        u
          ? u.parentNode.insertBefore(n, u.nextSibling)
          : ((t = t.nodeType === 9 ? t.head : t), t.insertBefore(n, t.firstChild)),
        (e.state.loading |= 4));
    }
  }
  var Hn = {
    $$typeof: k,
    Provider: null,
    Consumer: null,
    _currentValue: $,
    _currentValue2: $,
    _threadCount: 0,
  };
  function Gv(t, e, l, a, n, u, c, o, h) {
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
      (this.expirationTimes = ji(-1)),
      (this.entangledLanes =
        this.shellSuspendCounter =
        this.errorRecoveryDisabledLanes =
        this.expiredLanes =
        this.warmLanes =
        this.pingedLanes =
        this.suspendedLanes =
        this.pendingLanes =
          0),
      (this.entanglements = ji(0)),
      (this.hiddenUpdates = ji(null)),
      (this.identifierPrefix = a),
      (this.onUncaughtError = n),
      (this.onCaughtError = u),
      (this.onRecoverableError = c),
      (this.pooledCache = null),
      (this.pooledCacheLanes = 0),
      (this.formState = h),
      (this.incompleteTransitions = new Map()));
  }
  function ym(t, e, l, a, n, u, c, o, h, E, C, j) {
    return (
      (t = new Gv(t, e, l, c, h, E, C, j, o)),
      (e = 1),
      u === !0 && (e |= 24),
      (u = re(3, null, null, e)),
      (t.current = u),
      (u.stateNode = t),
      (e = gc()),
      e.refCount++,
      (t.pooledCache = e),
      e.refCount++,
      (u.memoizedState = { element: a, isDehydrated: l, cache: e }),
      Ec(u),
      t
    );
  }
  function vm(t) {
    return t ? ((t = pa), t) : pa;
  }
  function pm(t, e, l, a, n, u) {
    ((n = vm(n)),
      a.context === null ? (a.context = n) : (a.pendingContext = n),
      (a = yl(e)),
      (a.payload = { element: l }),
      (u = u === void 0 ? null : u),
      u !== null && (a.callback = u),
      (l = vl(t, a, e)),
      l !== null && (ue(l, t, e), mn(l, t, e)));
  }
  function gm(t, e) {
    if (((t = t.memoizedState), t !== null && t.dehydrated !== null)) {
      var l = t.retryLane;
      t.retryLane = l !== 0 && l < e ? l : e;
    }
  }
  function wf(t, e) {
    (gm(t, e), (t = t.alternate) && gm(t, e));
  }
  function Sm(t) {
    if (t.tag === 13 || t.tag === 31) {
      var e = Xl(t, 67108864);
      (e !== null && ue(e, t, 67108864), wf(t, 67108864));
    }
  }
  function bm(t) {
    if (t.tag === 13 || t.tag === 31) {
      var e = ye();
      e = Hi(e);
      var l = Xl(t, e);
      (l !== null && ue(l, t, e), wf(t, e));
    }
  }
  var ri = !0;
  function wv(t, e, l, a) {
    var n = D.T;
    D.T = null;
    var u = q.p;
    try {
      ((q.p = 2), Xf(t, e, l, a));
    } finally {
      ((q.p = u), (D.T = n));
    }
  }
  function Xv(t, e, l, a) {
    var n = D.T;
    D.T = null;
    var u = q.p;
    try {
      ((q.p = 8), Xf(t, e, l, a));
    } finally {
      ((q.p = u), (D.T = n));
    }
  }
  function Xf(t, e, l, a) {
    if (ri) {
      var n = Qf(a);
      if (n === null) (Of(t, e, a, oi, l), Em(t, a));
      else if (Zv(n, t, e, l, a)) a.stopPropagation();
      else if ((Em(t, a), e & 4 && -1 < Qv.indexOf(t))) {
        for (; n !== null; ) {
          var u = ia(n);
          if (u !== null)
            switch (u.tag) {
              case 3:
                if (((u = u.stateNode), u.current.memoizedState.isDehydrated)) {
                  var c = ql(u.pendingLanes);
                  if (c !== 0) {
                    var o = u;
                    for (o.pendingLanes |= 2, o.entangledLanes |= 2; c; ) {
                      var h = 1 << (31 - fe(c));
                      ((o.entanglements[1] |= h), (c &= ~h));
                    }
                    (Ye(u), (rt & 6) === 0 && ((ku = ie() + 500), Mn(0)));
                  }
                }
                break;
              case 31:
              case 13:
                ((o = Xl(u, 2)), o !== null && ue(o, u, 2), $u(), wf(u, 2));
            }
          if (((u = Qf(a)), u === null && Of(t, e, a, oi, l), u === n)) break;
          n = u;
        }
        n !== null && a.stopPropagation();
      } else Of(t, e, a, null, l);
    }
  }
  function Qf(t) {
    return ((t = Zi(t)), Zf(t));
  }
  var oi = null;
  function Zf(t) {
    if (((oi = null), (t = ua(t)), t !== null)) {
      var e = m(t);
      if (e === null) t = null;
      else {
        var l = e.tag;
        if (l === 13) {
          if (((t = g(e)), t !== null)) return t;
          t = null;
        } else if (l === 31) {
          if (((t = R(e)), t !== null)) return t;
          t = null;
        } else if (l === 3) {
          if (e.stateNode.current.memoizedState.isDehydrated)
            return e.tag === 3 ? e.stateNode.containerInfo : null;
          t = null;
        } else e !== t && (t = null);
      }
    }
    return ((oi = t), null);
  }
  function _m(t) {
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
        switch (Oh()) {
          case Os:
            return 2;
          case Ms:
            return 8;
          case tu:
          case Mh:
            return 32;
          case Cs:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var Vf = !1,
    xl = null,
    Ol = null,
    Ml = null,
    Bn = new Map(),
    qn = new Map(),
    Cl = [],
    Qv =
      'mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset'.split(
        ' '
      );
  function Em(t, e) {
    switch (t) {
      case 'focusin':
      case 'focusout':
        xl = null;
        break;
      case 'dragenter':
      case 'dragleave':
        Ol = null;
        break;
      case 'mouseover':
      case 'mouseout':
        Ml = null;
        break;
      case 'pointerover':
      case 'pointerout':
        Bn.delete(e.pointerId);
        break;
      case 'gotpointercapture':
      case 'lostpointercapture':
        qn.delete(e.pointerId);
    }
  }
  function Ln(t, e, l, a, n, u) {
    return t === null || t.nativeEvent !== u
      ? ((t = {
          blockedOn: e,
          domEventName: l,
          eventSystemFlags: a,
          nativeEvent: u,
          targetContainers: [n],
        }),
        e !== null && ((e = ia(e)), e !== null && Sm(e)),
        t)
      : ((t.eventSystemFlags |= a),
        (e = t.targetContainers),
        n !== null && e.indexOf(n) === -1 && e.push(n),
        t);
  }
  function Zv(t, e, l, a, n) {
    switch (e) {
      case 'focusin':
        return ((xl = Ln(xl, t, e, l, a, n)), !0);
      case 'dragenter':
        return ((Ol = Ln(Ol, t, e, l, a, n)), !0);
      case 'mouseover':
        return ((Ml = Ln(Ml, t, e, l, a, n)), !0);
      case 'pointerover':
        var u = n.pointerId;
        return (Bn.set(u, Ln(Bn.get(u) || null, t, e, l, a, n)), !0);
      case 'gotpointercapture':
        return ((u = n.pointerId), qn.set(u, Ln(qn.get(u) || null, t, e, l, a, n)), !0);
    }
    return !1;
  }
  function Tm(t) {
    var e = ua(t.target);
    if (e !== null) {
      var l = m(e);
      if (l !== null) {
        if (((e = l.tag), e === 13)) {
          if (((e = g(l)), e !== null)) {
            ((t.blockedOn = e),
              Bs(t.priority, function () {
                bm(l);
              }));
            return;
          }
        } else if (e === 31) {
          if (((e = R(l)), e !== null)) {
            ((t.blockedOn = e),
              Bs(t.priority, function () {
                bm(l);
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
  function di(t) {
    if (t.blockedOn !== null) return !1;
    for (var e = t.targetContainers; 0 < e.length; ) {
      var l = Qf(t.nativeEvent);
      if (l === null) {
        l = t.nativeEvent;
        var a = new l.constructor(l.type, l);
        ((Qi = a), l.target.dispatchEvent(a), (Qi = null));
      } else return ((e = ia(l)), e !== null && Sm(e), (t.blockedOn = l), !1);
      e.shift();
    }
    return !0;
  }
  function Am(t, e, l) {
    di(t) && l.delete(e);
  }
  function Vv() {
    ((Vf = !1),
      xl !== null && di(xl) && (xl = null),
      Ol !== null && di(Ol) && (Ol = null),
      Ml !== null && di(Ml) && (Ml = null),
      Bn.forEach(Am),
      qn.forEach(Am));
  }
  function mi(t, e) {
    t.blockedOn === e &&
      ((t.blockedOn = null),
      Vf || ((Vf = !0), i.unstable_scheduleCallback(i.unstable_NormalPriority, Vv)));
  }
  var hi = null;
  function zm(t) {
    hi !== t &&
      ((hi = t),
      i.unstable_scheduleCallback(i.unstable_NormalPriority, function () {
        hi === t && (hi = null);
        for (var e = 0; e < t.length; e += 3) {
          var l = t[e],
            a = t[e + 1],
            n = t[e + 2];
          if (typeof a != 'function') {
            if (Zf(a || l) === null) continue;
            break;
          }
          var u = ia(l);
          u !== null &&
            (t.splice(e, 3),
            (e -= 3),
            Xc(u, { pending: !0, data: n, method: l.method, action: a }, a, n));
        }
      }));
  }
  function wa(t) {
    function e(h) {
      return mi(h, t);
    }
    (xl !== null && mi(xl, t),
      Ol !== null && mi(Ol, t),
      Ml !== null && mi(Ml, t),
      Bn.forEach(e),
      qn.forEach(e));
    for (var l = 0; l < Cl.length; l++) {
      var a = Cl[l];
      a.blockedOn === t && (a.blockedOn = null);
    }
    for (; 0 < Cl.length && ((l = Cl[0]), l.blockedOn === null); )
      (Tm(l), l.blockedOn === null && Cl.shift());
    if (((l = (t.ownerDocument || t).$$reactFormReplay), l != null))
      for (a = 0; a < l.length; a += 3) {
        var n = l[a],
          u = l[a + 1],
          c = n[Pt] || null;
        if (typeof u == 'function') c || zm(l);
        else if (c) {
          var o = null;
          if (u && u.hasAttribute('formAction')) {
            if (((n = u), (c = u[Pt] || null))) o = c.formAction;
            else if (Zf(n) !== null) continue;
          } else o = c.action;
          (typeof o == 'function' ? (l[a + 1] = o) : (l.splice(a, 3), (a -= 3)), zm(l));
        }
      }
  }
  function Rm() {
    function t(u) {
      u.canIntercept &&
        u.info === 'react-transition' &&
        u.intercept({
          handler: function () {
            return new Promise(function (c) {
              return (n = c);
            });
          },
          focusReset: 'manual',
          scroll: 'manual',
        });
    }
    function e() {
      (n !== null && (n(), (n = null)), a || setTimeout(l, 20));
    }
    function l() {
      if (!a && !navigation.transition) {
        var u = navigation.currentEntry;
        u &&
          u.url != null &&
          navigation.navigate(u.url, {
            state: u.getState(),
            info: 'react-transition',
            history: 'replace',
          });
      }
    }
    if (typeof navigation == 'object') {
      var a = !1,
        n = null;
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
            n !== null && (n(), (n = null)));
        }
      );
    }
  }
  function Kf(t) {
    this._internalRoot = t;
  }
  ((yi.prototype.render = Kf.prototype.render =
    function (t) {
      var e = this._internalRoot;
      if (e === null) throw Error(f(409));
      var l = e.current,
        a = ye();
      pm(l, a, t, e, null, null);
    }),
    (yi.prototype.unmount = Kf.prototype.unmount =
      function () {
        var t = this._internalRoot;
        if (t !== null) {
          this._internalRoot = null;
          var e = t.containerInfo;
          (pm(t.current, 2, null, t, null, null), $u(), (e[na] = null));
        }
      }));
  function yi(t) {
    this._internalRoot = t;
  }
  yi.prototype.unstable_scheduleHydration = function (t) {
    if (t) {
      var e = Hs();
      t = { blockedOn: null, target: t, priority: e };
      for (var l = 0; l < Cl.length && e !== 0 && e < Cl[l].priority; l++);
      (Cl.splice(l, 0, t), l === 0 && Tm(t));
    }
  };
  var xm = s.version;
  if (xm !== '19.2.5') throw Error(f(527, xm, '19.2.5'));
  q.findDOMNode = function (t) {
    var e = t._reactInternals;
    if (e === void 0)
      throw typeof t.render == 'function'
        ? Error(f(188))
        : ((t = Object.keys(t).join(',')), Error(f(268, t)));
    return ((t = y(e)), (t = t !== null ? O(t) : null), (t = t === null ? null : t.stateNode), t);
  };
  var Kv = {
    bundleType: 0,
    version: '19.2.5',
    rendererPackageName: 'react-dom',
    currentDispatcherRef: D,
    reconcilerVersion: '19.2.5',
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < 'u') {
    var vi = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!vi.isDisabled && vi.supportsFiber)
      try {
        ((Ka = vi.inject(Kv)), (ce = vi));
      } catch {}
  }
  return (
    (Gn.createRoot = function (t, e) {
      if (!d(t)) throw Error(f(299));
      var l = !1,
        a = '',
        n = jo,
        u = Ho,
        c = Bo;
      return (
        e != null &&
          (e.unstable_strictMode === !0 && (l = !0),
          e.identifierPrefix !== void 0 && (a = e.identifierPrefix),
          e.onUncaughtError !== void 0 && (n = e.onUncaughtError),
          e.onCaughtError !== void 0 && (u = e.onCaughtError),
          e.onRecoverableError !== void 0 && (c = e.onRecoverableError)),
        (e = ym(t, 1, !1, null, null, l, a, null, n, u, c, Rm)),
        (t[na] = e.current),
        xf(t),
        new Kf(e)
      );
    }),
    (Gn.hydrateRoot = function (t, e, l) {
      if (!d(t)) throw Error(f(299));
      var a = !1,
        n = '',
        u = jo,
        c = Ho,
        o = Bo,
        h = null;
      return (
        l != null &&
          (l.unstable_strictMode === !0 && (a = !0),
          l.identifierPrefix !== void 0 && (n = l.identifierPrefix),
          l.onUncaughtError !== void 0 && (u = l.onUncaughtError),
          l.onCaughtError !== void 0 && (c = l.onCaughtError),
          l.onRecoverableError !== void 0 && (o = l.onRecoverableError),
          l.formState !== void 0 && (h = l.formState)),
        (e = ym(t, 1, !0, e, l ?? null, a, n, h, u, c, o, Rm)),
        (e.context = vm(null)),
        (l = e.current),
        (a = ye()),
        (a = Hi(a)),
        (n = yl(a)),
        (n.callback = null),
        vl(l, n, a),
        (l = a),
        (e.current.lanes = l),
        Ja(e, l),
        Ye(e),
        (t[na] = e.current),
        xf(t),
        new yi(e)
      );
    }),
    (Gn.version = '19.2.5'),
    Gn
  );
}
var qm;
function l0() {
  if (qm) return Jf.exports;
  qm = 1;
  function i() {
    if (
      !(
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > 'u' ||
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != 'function'
      )
    )
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(i);
      } catch (s) {
        console.error(s);
      }
  }
  return (i(), (Jf.exports = e0()), Jf.exports);
}
var a0 = l0(),
  z = ys();
/**
 * react-router v7.14.2
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */ var Lm = 'popstate';
function Ym(i) {
  return (
    typeof i == 'object' &&
    i != null &&
    'pathname' in i &&
    'search' in i &&
    'hash' in i &&
    'state' in i &&
    'key' in i
  );
}
function n0(i = {}) {
  function s(f, d) {
    var y;
    let m = (y = d.state) == null ? void 0 : y.masked,
      { pathname: g, search: R, hash: p } = m || f.location;
    return cs(
      '',
      { pathname: g, search: R, hash: p },
      (d.state && d.state.usr) || null,
      (d.state && d.state.key) || 'default',
      m
        ? { pathname: f.location.pathname, search: f.location.search, hash: f.location.hash }
        : void 0
    );
  }
  function r(f, d) {
    return typeof d == 'string' ? d : kn(d);
  }
  return i0(s, r, null, i);
}
function Rt(i, s) {
  if (i === !1 || i === null || typeof i > 'u') throw new Error(s);
}
function Ue(i, s) {
  if (!i) {
    typeof console < 'u' && console.warn(s);
    try {
      throw new Error(s);
    } catch {}
  }
}
function u0() {
  return Math.random().toString(36).substring(2, 10);
}
function Gm(i, s) {
  return {
    usr: i.state,
    key: i.key,
    idx: s,
    masked: i.unstable_mask ? { pathname: i.pathname, search: i.search, hash: i.hash } : void 0,
  };
}
function cs(i, s, r = null, f, d) {
  return {
    pathname: typeof i == 'string' ? i : i.pathname,
    search: '',
    hash: '',
    ...(typeof s == 'string' ? Xa(s) : s),
    state: r,
    key: (s && s.key) || f || u0(),
    unstable_mask: d,
  };
}
function kn({ pathname: i = '/', search: s = '', hash: r = '' }) {
  return (
    s && s !== '?' && (i += s.charAt(0) === '?' ? s : '?' + s),
    r && r !== '#' && (i += r.charAt(0) === '#' ? r : '#' + r),
    i
  );
}
function Xa(i) {
  let s = {};
  if (i) {
    let r = i.indexOf('#');
    r >= 0 && ((s.hash = i.substring(r)), (i = i.substring(0, r)));
    let f = i.indexOf('?');
    (f >= 0 && ((s.search = i.substring(f)), (i = i.substring(0, f))), i && (s.pathname = i));
  }
  return s;
}
function i0(i, s, r, f = {}) {
  let { window: d = document.defaultView, v5Compat: m = !1 } = f,
    g = d.history,
    R = 'POP',
    p = null,
    y = O();
  y == null && ((y = 0), g.replaceState({ ...g.state, idx: y }, ''));
  function O() {
    return (g.state || { idx: null }).idx;
  }
  function T() {
    R = 'POP';
    let w = O(),
      B = w == null ? null : w - y;
    ((y = w), p && p({ action: R, location: L.location, delta: B }));
  }
  function U(w, B) {
    R = 'PUSH';
    let W = Ym(w) ? w : cs(L.location, w, B);
    y = O() + 1;
    let k = Gm(W, y),
      yt = L.createHref(W.unstable_mask || W);
    try {
      g.pushState(k, '', yt);
    } catch (dt) {
      if (dt instanceof DOMException && dt.name === 'DataCloneError') throw dt;
      d.location.assign(yt);
    }
    m && p && p({ action: R, location: L.location, delta: 1 });
  }
  function G(w, B) {
    R = 'REPLACE';
    let W = Ym(w) ? w : cs(L.location, w, B);
    y = O();
    let k = Gm(W, y),
      yt = L.createHref(W.unstable_mask || W);
    (g.replaceState(k, '', yt), m && p && p({ action: R, location: L.location, delta: 0 }));
  }
  function Z(w) {
    return c0(w);
  }
  let L = {
    get action() {
      return R;
    },
    get location() {
      return i(d, g);
    },
    listen(w) {
      if (p) throw new Error('A history only accepts one active listener');
      return (
        d.addEventListener(Lm, T),
        (p = w),
        () => {
          (d.removeEventListener(Lm, T), (p = null));
        }
      );
    },
    createHref(w) {
      return s(d, w);
    },
    createURL: Z,
    encodeLocation(w) {
      let B = Z(w);
      return { pathname: B.pathname, search: B.search, hash: B.hash };
    },
    push: U,
    replace: G,
    go(w) {
      return g.go(w);
    },
  };
  return L;
}
function c0(i, s = !1) {
  let r = 'http://localhost';
  (typeof window < 'u' &&
    (r = window.location.origin !== 'null' ? window.location.origin : window.location.href),
    Rt(r, 'No window.location.(origin|href) available to create URL'));
  let f = typeof i == 'string' ? i : kn(i);
  return ((f = f.replace(/ $/, '%20')), !s && f.startsWith('//') && (f = r + f), new URL(f, r));
}
function th(i, s, r = '/') {
  return f0(i, s, r, !1);
}
function f0(i, s, r, f) {
  let d = typeof s == 'string' ? Xa(s) : s,
    m = il(d.pathname || '/', r);
  if (m == null) return null;
  let g = eh(i);
  s0(g);
  let R = null;
  for (let p = 0; R == null && p < g.length; ++p) {
    let y = b0(m);
    R = g0(g[p], y, f);
  }
  return R;
}
function eh(i, s = [], r = [], f = '', d = !1) {
  let m = (g, R, p = d, y) => {
    let O = {
      relativePath: y === void 0 ? g.path || '' : y,
      caseSensitive: g.caseSensitive === !0,
      childrenIndex: R,
      route: g,
    };
    if (O.relativePath.startsWith('/')) {
      if (!O.relativePath.startsWith(f) && p) return;
      (Rt(
        O.relativePath.startsWith(f),
        `Absolute route path "${O.relativePath}" nested under path "${f}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`
      ),
        (O.relativePath = O.relativePath.slice(f.length)));
    }
    let T = Ne([f, O.relativePath]),
      U = r.concat(O);
    (g.children &&
      g.children.length > 0 &&
      (Rt(
        g.index !== !0,
        `Index routes must not have child routes. Please remove all child routes from route path "${T}".`
      ),
      eh(g.children, s, U, T, p)),
      !(g.path == null && !g.index) && s.push({ path: T, score: v0(T, g.index), routesMeta: U }));
  };
  return (
    i.forEach((g, R) => {
      var p;
      if (g.path === '' || !((p = g.path) != null && p.includes('?'))) m(g, R);
      else for (let y of lh(g.path)) m(g, R, !0, y);
    }),
    s
  );
}
function lh(i) {
  let s = i.split('/');
  if (s.length === 0) return [];
  let [r, ...f] = s,
    d = r.endsWith('?'),
    m = r.replace(/\?$/, '');
  if (f.length === 0) return d ? [m, ''] : [m];
  let g = lh(f.join('/')),
    R = [];
  return (
    R.push(...g.map((p) => (p === '' ? m : [m, p].join('/')))),
    d && R.push(...g),
    R.map((p) => (i.startsWith('/') && p === '' ? '/' : p))
  );
}
function s0(i) {
  i.sort((s, r) =>
    s.score !== r.score
      ? r.score - s.score
      : p0(
          s.routesMeta.map((f) => f.childrenIndex),
          r.routesMeta.map((f) => f.childrenIndex)
        )
  );
}
var r0 = /^:[\w-]+$/,
  o0 = 3,
  d0 = 2,
  m0 = 1,
  h0 = 10,
  y0 = -2,
  wm = (i) => i === '*';
function v0(i, s) {
  let r = i.split('/'),
    f = r.length;
  return (
    r.some(wm) && (f += y0),
    s && (f += d0),
    r.filter((d) => !wm(d)).reduce((d, m) => d + (r0.test(m) ? o0 : m === '' ? m0 : h0), f)
  );
}
function p0(i, s) {
  return i.length === s.length && i.slice(0, -1).every((f, d) => f === s[d])
    ? i[i.length - 1] - s[s.length - 1]
    : 0;
}
function g0(i, s, r = !1) {
  let { routesMeta: f } = i,
    d = {},
    m = '/',
    g = [];
  for (let R = 0; R < f.length; ++R) {
    let p = f[R],
      y = R === f.length - 1,
      O = m === '/' ? s : s.slice(m.length) || '/',
      T = Ei({ path: p.relativePath, caseSensitive: p.caseSensitive, end: y }, O),
      U = p.route;
    if (
      (!T &&
        y &&
        r &&
        !f[f.length - 1].route.index &&
        (T = Ei({ path: p.relativePath, caseSensitive: p.caseSensitive, end: !1 }, O)),
      !T)
    )
      return null;
    (Object.assign(d, T.params),
      g.push({
        params: d,
        pathname: Ne([m, T.pathname]),
        pathnameBase: A0(Ne([m, T.pathnameBase])),
        route: U,
      }),
      T.pathnameBase !== '/' && (m = Ne([m, T.pathnameBase])));
  }
  return g;
}
function Ei(i, s) {
  typeof i == 'string' && (i = { path: i, caseSensitive: !1, end: !0 });
  let [r, f] = S0(i.path, i.caseSensitive, i.end),
    d = s.match(r);
  if (!d) return null;
  let m = d[0],
    g = m.replace(/(.)\/+$/, '$1'),
    R = d.slice(1);
  return {
    params: f.reduce((y, { paramName: O, isOptional: T }, U) => {
      if (O === '*') {
        let Z = R[U] || '';
        g = m.slice(0, m.length - Z.length).replace(/(.)\/+$/, '$1');
      }
      const G = R[U];
      return (T && !G ? (y[O] = void 0) : (y[O] = (G || '').replace(/%2F/g, '/')), y);
    }, {}),
    pathname: m,
    pathnameBase: g,
    pattern: i,
  };
}
function S0(i, s = !1, r = !0) {
  Ue(
    i === '*' || !i.endsWith('*') || i.endsWith('/*'),
    `Route path "${i}" will be treated as if it were "${i.replace(/\*$/, '/*')}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${i.replace(/\*$/, '/*')}".`
  );
  let f = [],
    d =
      '^' +
      i
        .replace(/\/*\*?$/, '')
        .replace(/^\/*/, '/')
        .replace(/[\\.*+^${}|()[\]]/g, '\\$&')
        .replace(/\/:([\w-]+)(\?)?/g, (g, R, p, y, O) => {
          if ((f.push({ paramName: R, isOptional: p != null }), p)) {
            let T = O.charAt(y + g.length);
            return T && T !== '/' ? '/([^\\/]*)' : '(?:/([^\\/]*))?';
          }
          return '/([^\\/]+)';
        })
        .replace(/\/([\w-]+)\?(\/|$)/g, '(/$1)?$2');
  return (
    i.endsWith('*')
      ? (f.push({ paramName: '*' }), (d += i === '*' || i === '/*' ? '(.*)$' : '(?:\\/(.+)|\\/*)$'))
      : r
        ? (d += '\\/*$')
        : i !== '' && i !== '/' && (d += '(?:(?=\\/|$))'),
    [new RegExp(d, s ? void 0 : 'i'), f]
  );
}
function b0(i) {
  try {
    return i
      .split('/')
      .map((s) => decodeURIComponent(s).replace(/\//g, '%2F'))
      .join('/');
  } catch (s) {
    return (
      Ue(
        !1,
        `The URL path "${i}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${s}).`
      ),
      i
    );
  }
}
function il(i, s) {
  if (s === '/') return i;
  if (!i.toLowerCase().startsWith(s.toLowerCase())) return null;
  let r = s.endsWith('/') ? s.length - 1 : s.length,
    f = i.charAt(r);
  return f && f !== '/' ? null : i.slice(r) || '/';
}
var _0 = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;
function E0(i, s = '/') {
  let { pathname: r, search: f = '', hash: d = '' } = typeof i == 'string' ? Xa(i) : i,
    m;
  return (
    r ? ((r = ah(r)), r.startsWith('/') ? (m = Xm(r.substring(1), '/')) : (m = Xm(r, s))) : (m = s),
    { pathname: m, search: z0(f), hash: R0(d) }
  );
}
function Xm(i, s) {
  let r = Ti(s).split('/');
  return (
    i.split('/').forEach((d) => {
      d === '..' ? r.length > 1 && r.pop() : d !== '.' && r.push(d);
    }),
    r.length > 1 ? r.join('/') : '/'
  );
}
function Pf(i, s, r, f) {
  return `Cannot include a '${i}' character in a manually specified \`to.${s}\` field [${JSON.stringify(f)}].  Please separate it out to the \`to.${r}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`;
}
function T0(i) {
  return i.filter((s, r) => r === 0 || (s.route.path && s.route.path.length > 0));
}
function vs(i) {
  let s = T0(i);
  return s.map((r, f) => (f === s.length - 1 ? r.pathname : r.pathnameBase));
}
function Ai(i, s, r, f = !1) {
  let d;
  typeof i == 'string'
    ? (d = Xa(i))
    : ((d = { ...i }),
      Rt(!d.pathname || !d.pathname.includes('?'), Pf('?', 'pathname', 'search', d)),
      Rt(!d.pathname || !d.pathname.includes('#'), Pf('#', 'pathname', 'hash', d)),
      Rt(!d.search || !d.search.includes('#'), Pf('#', 'search', 'hash', d)));
  let m = i === '' || d.pathname === '',
    g = m ? '/' : d.pathname,
    R;
  if (g == null) R = r;
  else {
    let T = s.length - 1;
    if (!f && g.startsWith('..')) {
      let U = g.split('/');
      for (; U[0] === '..'; ) (U.shift(), (T -= 1));
      d.pathname = U.join('/');
    }
    R = T >= 0 ? s[T] : '/';
  }
  let p = E0(d, R),
    y = g && g !== '/' && g.endsWith('/'),
    O = (m || g === '.') && r.endsWith('/');
  return (!p.pathname.endsWith('/') && (y || O) && (p.pathname += '/'), p);
}
var ah = (i) => i.replace(/\/\/+/g, '/'),
  Ne = (i) => ah(i.join('/')),
  Ti = (i) => i.replace(/\/+$/, ''),
  A0 = (i) => Ti(i).replace(/^\/*/, '/'),
  z0 = (i) => (!i || i === '?' ? '' : i.startsWith('?') ? i : '?' + i),
  R0 = (i) => (!i || i === '#' ? '' : i.startsWith('#') ? i : '#' + i),
  x0 = class {
    constructor(i, s, r, f = !1) {
      ((this.status = i),
        (this.statusText = s || ''),
        (this.internal = f),
        r instanceof Error ? ((this.data = r.toString()), (this.error = r)) : (this.data = r));
    }
  };
function O0(i) {
  return (
    i != null &&
    typeof i.status == 'number' &&
    typeof i.statusText == 'string' &&
    typeof i.internal == 'boolean' &&
    'data' in i
  );
}
function M0(i) {
  let s = i.map((r) => r.route.path).filter(Boolean);
  return Ne(s) || '/';
}
var nh =
  typeof window < 'u' && typeof window.document < 'u' && typeof window.document.createElement < 'u';
function uh(i, s) {
  let r = i;
  if (typeof r != 'string' || !_0.test(r)) return { absoluteURL: void 0, isExternal: !1, to: r };
  let f = r,
    d = !1;
  if (nh)
    try {
      let m = new URL(window.location.href),
        g = r.startsWith('//') ? new URL(m.protocol + r) : new URL(r),
        R = il(g.pathname, s);
      g.origin === m.origin && R != null ? (r = R + g.search + g.hash) : (d = !0);
    } catch {
      Ue(
        !1,
        `<Link to="${r}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`
      );
    }
  return { absoluteURL: f, isExternal: d, to: r };
}
Object.getOwnPropertyNames(Object.prototype).sort().join('\0');
var ih = ['POST', 'PUT', 'PATCH', 'DELETE'];
new Set(ih);
var C0 = ['GET', ...ih];
new Set(C0);
var Qa = z.createContext(null);
Qa.displayName = 'DataRouter';
var zi = z.createContext(null);
zi.displayName = 'DataRouterState';
var ch = z.createContext(!1);
function D0() {
  return z.useContext(ch);
}
var fh = z.createContext({ isTransitioning: !1 });
fh.displayName = 'ViewTransition';
var N0 = z.createContext(new Map());
N0.displayName = 'Fetchers';
var U0 = z.createContext(null);
U0.displayName = 'Await';
var ve = z.createContext(null);
ve.displayName = 'Navigation';
var $n = z.createContext(null);
$n.displayName = 'Location';
var Ge = z.createContext({ outlet: null, matches: [], isDataRoute: !1 });
Ge.displayName = 'Route';
var ps = z.createContext(null);
ps.displayName = 'RouteError';
var sh = 'REACT_ROUTER_ERROR',
  j0 = 'REDIRECT',
  H0 = 'ROUTE_ERROR_RESPONSE';
function B0(i) {
  if (i.startsWith(`${sh}:${j0}:{`))
    try {
      let s = JSON.parse(i.slice(28));
      if (
        typeof s == 'object' &&
        s &&
        typeof s.status == 'number' &&
        typeof s.statusText == 'string' &&
        typeof s.location == 'string' &&
        typeof s.reloadDocument == 'boolean' &&
        typeof s.replace == 'boolean'
      )
        return s;
    } catch {}
}
function q0(i) {
  if (i.startsWith(`${sh}:${H0}:{`))
    try {
      let s = JSON.parse(i.slice(40));
      if (
        typeof s == 'object' &&
        s &&
        typeof s.status == 'number' &&
        typeof s.statusText == 'string'
      )
        return new x0(s.status, s.statusText, s.data);
    } catch {}
}
function L0(i, { relative: s } = {}) {
  Rt(Za(), 'useHref() may be used only in the context of a <Router> component.');
  let { basename: r, navigator: f } = z.useContext(ve),
    { hash: d, pathname: m, search: g } = Wn(i, { relative: s }),
    R = m;
  return (
    r !== '/' && (R = m === '/' ? r : Ne([r, m])),
    f.createHref({ pathname: R, search: g, hash: d })
  );
}
function Za() {
  return z.useContext($n) != null;
}
function we() {
  return (
    Rt(Za(), 'useLocation() may be used only in the context of a <Router> component.'),
    z.useContext($n).location
  );
}
var rh =
  'You should call navigate() in a React.useEffect(), not when your component is first rendered.';
function oh(i) {
  z.useContext(ve).static || z.useLayoutEffect(i);
}
function aa() {
  let { isDataRoute: i } = z.useContext(Ge);
  return i ? F0() : Y0();
}
function Y0() {
  Rt(Za(), 'useNavigate() may be used only in the context of a <Router> component.');
  let i = z.useContext(Qa),
    { basename: s, navigator: r } = z.useContext(ve),
    { matches: f } = z.useContext(Ge),
    { pathname: d } = we(),
    m = JSON.stringify(vs(f)),
    g = z.useRef(!1);
  return (
    oh(() => {
      g.current = !0;
    }),
    z.useCallback(
      (p, y = {}) => {
        if ((Ue(g.current, rh), !g.current)) return;
        if (typeof p == 'number') {
          r.go(p);
          return;
        }
        let O = Ai(p, JSON.parse(m), d, y.relative === 'path');
        (i == null && s !== '/' && (O.pathname = O.pathname === '/' ? s : Ne([s, O.pathname])),
          (y.replace ? r.replace : r.push)(O, y.state, y));
      },
      [s, r, m, d, i]
    )
  );
}
z.createContext(null);
function Wn(i, { relative: s } = {}) {
  let { matches: r } = z.useContext(Ge),
    { pathname: f } = we(),
    d = JSON.stringify(vs(r));
  return z.useMemo(() => Ai(i, JSON.parse(d), f, s === 'path'), [i, d, f, s]);
}
function G0(i, s) {
  return dh(i, s);
}
function dh(i, s, r) {
  var w;
  Rt(Za(), 'useRoutes() may be used only in the context of a <Router> component.');
  let { navigator: f } = z.useContext(ve),
    { matches: d } = z.useContext(Ge),
    m = d[d.length - 1],
    g = m ? m.params : {},
    R = m ? m.pathname : '/',
    p = m ? m.pathnameBase : '/',
    y = m && m.route;
  {
    let B = (y && y.path) || '';
    hh(
      R,
      !y || B.endsWith('*') || B.endsWith('*?'),
      `You rendered descendant <Routes> (or called \`useRoutes()\`) at "${R}" (under <Route path="${B}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${B}"> to <Route path="${B === '/' ? '*' : `${B}/*`}">.`
    );
  }
  let O = we(),
    T;
  if (s) {
    let B = typeof s == 'string' ? Xa(s) : s;
    (Rt(
      p === '/' || ((w = B.pathname) == null ? void 0 : w.startsWith(p)),
      `When overriding the location using \`<Routes location>\` or \`useRoutes(routes, location)\`, the location pathname must begin with the portion of the URL pathname that was matched by all parent routes. The current pathname base is "${p}" but pathname "${B.pathname}" was given in the \`location\` prop.`
    ),
      (T = B));
  } else T = O;
  let U = T.pathname || '/',
    G = U;
  if (p !== '/') {
    let B = p.replace(/^\//, '').split('/');
    G = '/' + U.replace(/^\//, '').split('/').slice(B.length).join('/');
  }
  let Z = th(i, { pathname: G });
  (Ue(y || Z != null, `No routes matched location "${T.pathname}${T.search}${T.hash}" `),
    Ue(
      Z == null ||
        Z[Z.length - 1].route.element !== void 0 ||
        Z[Z.length - 1].route.Component !== void 0 ||
        Z[Z.length - 1].route.lazy !== void 0,
      `Matched leaf route at location "${T.pathname}${T.search}${T.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`
    ));
  let L = V0(
    Z &&
      Z.map((B) =>
        Object.assign({}, B, {
          params: Object.assign({}, g, B.params),
          pathname: Ne([
            p,
            f.encodeLocation
              ? f.encodeLocation(
                  B.pathname.replace(/%/g, '%25').replace(/\?/g, '%3F').replace(/#/g, '%23')
                ).pathname
              : B.pathname,
          ]),
          pathnameBase:
            B.pathnameBase === '/'
              ? p
              : Ne([
                  p,
                  f.encodeLocation
                    ? f.encodeLocation(
                        B.pathnameBase
                          .replace(/%/g, '%25')
                          .replace(/\?/g, '%3F')
                          .replace(/#/g, '%23')
                      ).pathname
                    : B.pathnameBase,
                ]),
        })
      ),
    d,
    r
  );
  return s && L
    ? z.createElement(
        $n.Provider,
        {
          value: {
            location: {
              pathname: '/',
              search: '',
              hash: '',
              state: null,
              key: 'default',
              unstable_mask: void 0,
              ...T,
            },
            navigationType: 'POP',
          },
        },
        L
      )
    : L;
}
function w0() {
  let i = W0(),
    s = O0(i) ? `${i.status} ${i.statusText}` : i instanceof Error ? i.message : JSON.stringify(i),
    r = i instanceof Error ? i.stack : null,
    f = 'rgba(200,200,200, 0.5)',
    d = { padding: '0.5rem', backgroundColor: f },
    m = { padding: '2px 4px', backgroundColor: f },
    g = null;
  return (
    console.error('Error handled by React Router default ErrorBoundary:', i),
    (g = z.createElement(
      z.Fragment,
      null,
      z.createElement('p', null, '💿 Hey developer 👋'),
      z.createElement(
        'p',
        null,
        'You can provide a way better UX than this when your app throws errors by providing your own ',
        z.createElement('code', { style: m }, 'ErrorBoundary'),
        ' or',
        ' ',
        z.createElement('code', { style: m }, 'errorElement'),
        ' prop on your route.'
      )
    )),
    z.createElement(
      z.Fragment,
      null,
      z.createElement('h2', null, 'Unexpected Application Error!'),
      z.createElement('h3', { style: { fontStyle: 'italic' } }, s),
      r ? z.createElement('pre', { style: d }, r) : null,
      g
    )
  );
}
var X0 = z.createElement(w0, null),
  mh = class extends z.Component {
    constructor(i) {
      (super(i),
        (this.state = { location: i.location, revalidation: i.revalidation, error: i.error }));
    }
    static getDerivedStateFromError(i) {
      return { error: i };
    }
    static getDerivedStateFromProps(i, s) {
      return s.location !== i.location || (s.revalidation !== 'idle' && i.revalidation === 'idle')
        ? { error: i.error, location: i.location, revalidation: i.revalidation }
        : {
            error: i.error !== void 0 ? i.error : s.error,
            location: s.location,
            revalidation: i.revalidation || s.revalidation,
          };
    }
    componentDidCatch(i, s) {
      this.props.onError
        ? this.props.onError(i, s)
        : console.error('React Router caught the following error during render', i);
    }
    render() {
      let i = this.state.error;
      if (
        this.context &&
        typeof i == 'object' &&
        i &&
        'digest' in i &&
        typeof i.digest == 'string'
      ) {
        const r = q0(i.digest);
        r && (i = r);
      }
      let s =
        i !== void 0
          ? z.createElement(
              Ge.Provider,
              { value: this.props.routeContext },
              z.createElement(ps.Provider, { value: i, children: this.props.component })
            )
          : this.props.children;
      return this.context ? z.createElement(Q0, { error: i }, s) : s;
    }
  };
mh.contextType = ch;
var ts = new WeakMap();
function Q0({ children: i, error: s }) {
  let { basename: r } = z.useContext(ve);
  if (typeof s == 'object' && s && 'digest' in s && typeof s.digest == 'string') {
    let f = B0(s.digest);
    if (f) {
      let d = ts.get(s);
      if (d) throw d;
      let m = uh(f.location, r);
      if (nh && !ts.get(s))
        if (m.isExternal || f.reloadDocument) window.location.href = m.absoluteURL || m.to;
        else {
          const g = Promise.resolve().then(() =>
            window.__reactRouterDataRouter.navigate(m.to, { replace: f.replace })
          );
          throw (ts.set(s, g), g);
        }
      return z.createElement('meta', {
        httpEquiv: 'refresh',
        content: `0;url=${m.absoluteURL || m.to}`,
      });
    }
  }
  return i;
}
function Z0({ routeContext: i, match: s, children: r }) {
  let f = z.useContext(Qa);
  return (
    f &&
      f.static &&
      f.staticContext &&
      (s.route.errorElement || s.route.ErrorBoundary) &&
      (f.staticContext._deepestRenderedBoundaryId = s.route.id),
    z.createElement(Ge.Provider, { value: i }, r)
  );
}
function V0(i, s = [], r) {
  let f = r == null ? void 0 : r.state;
  if (i == null) {
    if (!f) return null;
    if (f.errors) i = f.matches;
    else if (s.length === 0 && !f.initialized && f.matches.length > 0) i = f.matches;
    else return null;
  }
  let d = i,
    m = f == null ? void 0 : f.errors;
  if (m != null) {
    let O = d.findIndex((T) => T.route.id && (m == null ? void 0 : m[T.route.id]) !== void 0);
    (Rt(
      O >= 0,
      `Could not find a matching route for errors on route IDs: ${Object.keys(m).join(',')}`
    ),
      (d = d.slice(0, Math.min(d.length, O + 1))));
  }
  let g = !1,
    R = -1;
  if (r && f) {
    g = f.renderFallback;
    for (let O = 0; O < d.length; O++) {
      let T = d[O];
      if (((T.route.HydrateFallback || T.route.hydrateFallbackElement) && (R = O), T.route.id)) {
        let { loaderData: U, errors: G } = f,
          Z = T.route.loader && !U.hasOwnProperty(T.route.id) && (!G || G[T.route.id] === void 0);
        if (T.route.lazy || Z) {
          (r.isStatic && (g = !0), R >= 0 ? (d = d.slice(0, R + 1)) : (d = [d[0]]));
          break;
        }
      }
    }
  }
  let p = r == null ? void 0 : r.onError,
    y =
      f && p
        ? (O, T) => {
            var U, G;
            p(O, {
              location: f.location,
              params:
                ((G = (U = f.matches) == null ? void 0 : U[0]) == null ? void 0 : G.params) ?? {},
              unstable_pattern: M0(f.matches),
              errorInfo: T,
            });
          }
        : void 0;
  return d.reduceRight((O, T, U) => {
    let G,
      Z = !1,
      L = null,
      w = null;
    f &&
      ((G = m && T.route.id ? m[T.route.id] : void 0),
      (L = T.route.errorElement || X0),
      g &&
        (R < 0 && U === 0
          ? (hh(
              'route-fallback',
              !1,
              'No `HydrateFallback` element provided to render during initial hydration'
            ),
            (Z = !0),
            (w = null))
          : R === U && ((Z = !0), (w = T.route.hydrateFallbackElement || null))));
    let B = s.concat(d.slice(0, U + 1)),
      W = () => {
        let k;
        return (
          G
            ? (k = L)
            : Z
              ? (k = w)
              : T.route.Component
                ? (k = z.createElement(T.route.Component, null))
                : T.route.element
                  ? (k = T.route.element)
                  : (k = O),
          z.createElement(Z0, {
            match: T,
            routeContext: { outlet: O, matches: B, isDataRoute: f != null },
            children: k,
          })
        );
      };
    return f && (T.route.ErrorBoundary || T.route.errorElement || U === 0)
      ? z.createElement(mh, {
          location: f.location,
          revalidation: f.revalidation,
          component: L,
          error: G,
          children: W(),
          routeContext: { outlet: null, matches: B, isDataRoute: !0 },
          onError: y,
        })
      : W();
  }, null);
}
function gs(i) {
  return `${i} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function K0(i) {
  let s = z.useContext(Qa);
  return (Rt(s, gs(i)), s);
}
function k0(i) {
  let s = z.useContext(zi);
  return (Rt(s, gs(i)), s);
}
function J0(i) {
  let s = z.useContext(Ge);
  return (Rt(s, gs(i)), s);
}
function Ss(i) {
  let s = J0(i),
    r = s.matches[s.matches.length - 1];
  return (Rt(r.route.id, `${i} can only be used on routes that contain a unique "id"`), r.route.id);
}
function $0() {
  return Ss('useRouteId');
}
function W0() {
  var f;
  let i = z.useContext(ps),
    s = k0('useRouteError'),
    r = Ss('useRouteError');
  return i !== void 0 ? i : (f = s.errors) == null ? void 0 : f[r];
}
function F0() {
  let { router: i } = K0('useNavigate'),
    s = Ss('useNavigate'),
    r = z.useRef(!1);
  return (
    oh(() => {
      r.current = !0;
    }),
    z.useCallback(
      async (d, m = {}) => {
        (Ue(r.current, rh),
          r.current &&
            (typeof d == 'number'
              ? await i.navigate(d)
              : await i.navigate(d, { fromRouteId: s, ...m })));
      },
      [i, s]
    )
  );
}
var Qm = {};
function hh(i, s, r) {
  !s && !Qm[i] && ((Qm[i] = !0), Ue(!1, r));
}
z.memo(I0);
function I0({ routes: i, future: s, state: r, isStatic: f, onError: d }) {
  return dh(i, void 0, { state: r, isStatic: f, onError: d });
}
function Fn({ to: i, replace: s, state: r, relative: f }) {
  Rt(Za(), '<Navigate> may be used only in the context of a <Router> component.');
  let { static: d } = z.useContext(ve);
  Ue(
    !d,
    '<Navigate> must not be used on the initial render in a <StaticRouter>. This is a no-op, but you should modify your code so the <Navigate> is only ever rendered in response to some user interaction or state change.'
  );
  let { matches: m } = z.useContext(Ge),
    { pathname: g } = we(),
    R = aa(),
    p = Ai(i, vs(m), g, f === 'path'),
    y = JSON.stringify(p);
  return (
    z.useEffect(() => {
      R(JSON.parse(y), { replace: s, state: r, relative: f });
    }, [R, y, f, s, r]),
    null
  );
}
function Hl(i) {
  Rt(
    !1,
    'A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>.'
  );
}
function P0({
  basename: i = '/',
  children: s = null,
  location: r,
  navigationType: f = 'POP',
  navigator: d,
  static: m = !1,
  unstable_useTransitions: g,
}) {
  Rt(
    !Za(),
    'You cannot render a <Router> inside another <Router>. You should never have more than one in your app.'
  );
  let R = i.replace(/^\/*/, '/'),
    p = z.useMemo(
      () => ({ basename: R, navigator: d, static: m, unstable_useTransitions: g, future: {} }),
      [R, d, m, g]
    );
  typeof r == 'string' && (r = Xa(r));
  let {
      pathname: y = '/',
      search: O = '',
      hash: T = '',
      state: U = null,
      key: G = 'default',
      unstable_mask: Z,
    } = r,
    L = z.useMemo(() => {
      let w = il(y, R);
      return w == null
        ? null
        : {
            location: { pathname: w, search: O, hash: T, state: U, key: G, unstable_mask: Z },
            navigationType: f,
          };
    }, [R, y, O, T, U, G, f, Z]);
  return (
    Ue(
      L != null,
      `<Router basename="${R}"> is not able to match the URL "${y}${O}${T}" because it does not start with the basename, so the <Router> won't render anything.`
    ),
    L == null
      ? null
      : z.createElement(
          ve.Provider,
          { value: p },
          z.createElement($n.Provider, { children: s, value: L })
        )
  );
}
function tp({ children: i, location: s }) {
  return G0(fs(i), s);
}
function fs(i, s = []) {
  let r = [];
  return (
    z.Children.forEach(i, (f, d) => {
      if (!z.isValidElement(f)) return;
      let m = [...s, d];
      if (f.type === z.Fragment) {
        r.push.apply(r, fs(f.props.children, m));
        return;
      }
      (Rt(
        f.type === Hl,
        `[${typeof f.type == 'string' ? f.type : f.type.name}] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>`
      ),
        Rt(!f.props.index || !f.props.children, 'An index route cannot have child routes.'));
      let g = {
        id: f.props.id || m.join('-'),
        caseSensitive: f.props.caseSensitive,
        element: f.props.element,
        Component: f.props.Component,
        index: f.props.index,
        path: f.props.path,
        middleware: f.props.middleware,
        loader: f.props.loader,
        action: f.props.action,
        hydrateFallbackElement: f.props.hydrateFallbackElement,
        HydrateFallback: f.props.HydrateFallback,
        errorElement: f.props.errorElement,
        ErrorBoundary: f.props.ErrorBoundary,
        hasErrorBoundary:
          f.props.hasErrorBoundary === !0 ||
          f.props.ErrorBoundary != null ||
          f.props.errorElement != null,
        shouldRevalidate: f.props.shouldRevalidate,
        handle: f.props.handle,
        lazy: f.props.lazy,
      };
      (f.props.children && (g.children = fs(f.props.children, m)), r.push(g));
    }),
    r
  );
}
var Si = 'get',
  bi = 'application/x-www-form-urlencoded';
function Ri(i) {
  return typeof HTMLElement < 'u' && i instanceof HTMLElement;
}
function ep(i) {
  return Ri(i) && i.tagName.toLowerCase() === 'button';
}
function lp(i) {
  return Ri(i) && i.tagName.toLowerCase() === 'form';
}
function ap(i) {
  return Ri(i) && i.tagName.toLowerCase() === 'input';
}
function np(i) {
  return !!(i.metaKey || i.altKey || i.ctrlKey || i.shiftKey);
}
function up(i, s) {
  return i.button === 0 && (!s || s === '_self') && !np(i);
}
var pi = null;
function ip() {
  if (pi === null)
    try {
      (new FormData(document.createElement('form'), 0), (pi = !1));
    } catch {
      pi = !0;
    }
  return pi;
}
var cp = new Set(['application/x-www-form-urlencoded', 'multipart/form-data', 'text/plain']);
function es(i) {
  return i != null && !cp.has(i)
    ? (Ue(
        !1,
        `"${i}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${bi}"`
      ),
      null)
    : i;
}
function fp(i, s) {
  let r, f, d, m, g;
  if (lp(i)) {
    let R = i.getAttribute('action');
    ((f = R ? il(R, s) : null),
      (r = i.getAttribute('method') || Si),
      (d = es(i.getAttribute('enctype')) || bi),
      (m = new FormData(i)));
  } else if (ep(i) || (ap(i) && (i.type === 'submit' || i.type === 'image'))) {
    let R = i.form;
    if (R == null)
      throw new Error('Cannot submit a <button> or <input type="submit"> without a <form>');
    let p = i.getAttribute('formaction') || R.getAttribute('action');
    if (
      ((f = p ? il(p, s) : null),
      (r = i.getAttribute('formmethod') || R.getAttribute('method') || Si),
      (d = es(i.getAttribute('formenctype')) || es(R.getAttribute('enctype')) || bi),
      (m = new FormData(R, i)),
      !ip())
    ) {
      let { name: y, type: O, value: T } = i;
      if (O === 'image') {
        let U = y ? `${y}.` : '';
        (m.append(`${U}x`, '0'), m.append(`${U}y`, '0'));
      } else y && m.append(y, T);
    }
  } else {
    if (Ri(i))
      throw new Error(
        'Cannot submit element that is not <form>, <button>, or <input type="submit|image">'
      );
    ((r = Si), (f = null), (d = bi), (g = i));
  }
  return (
    m && d === 'text/plain' && ((g = m), (m = void 0)),
    { action: f, method: r.toLowerCase(), encType: d, formData: m, body: g }
  );
}
Object.getOwnPropertyNames(Object.prototype).sort().join('\0');
function bs(i, s) {
  if (i === !1 || i === null || typeof i > 'u') throw new Error(s);
}
function yh(i, s, r, f) {
  let d =
    typeof i == 'string'
      ? new URL(i, typeof window > 'u' ? 'server://singlefetch/' : window.location.origin)
      : i;
  return (
    r
      ? d.pathname.endsWith('/')
        ? (d.pathname = `${d.pathname}_.${f}`)
        : (d.pathname = `${d.pathname}.${f}`)
      : d.pathname === '/'
        ? (d.pathname = `_root.${f}`)
        : s && il(d.pathname, s) === '/'
          ? (d.pathname = `${Ti(s)}/_root.${f}`)
          : (d.pathname = `${Ti(d.pathname)}.${f}`),
    d
  );
}
async function sp(i, s) {
  if (i.id in s) return s[i.id];
  try {
    let r = await import(i.module);
    return ((s[i.id] = r), r);
  } catch (r) {
    return (
      console.error(`Error loading route module \`${i.module}\`, reloading page...`),
      console.error(r),
      window.__reactRouterContext && window.__reactRouterContext.isSpaMode,
      window.location.reload(),
      new Promise(() => {})
    );
  }
}
function rp(i) {
  return i == null
    ? !1
    : i.href == null
      ? i.rel === 'preload' && typeof i.imageSrcSet == 'string' && typeof i.imageSizes == 'string'
      : typeof i.rel == 'string' && typeof i.href == 'string';
}
async function op(i, s, r) {
  let f = await Promise.all(
    i.map(async (d) => {
      let m = s.routes[d.route.id];
      if (m) {
        let g = await sp(m, r);
        return g.links ? g.links() : [];
      }
      return [];
    })
  );
  return yp(
    f
      .flat(1)
      .filter(rp)
      .filter((d) => d.rel === 'stylesheet' || d.rel === 'preload')
      .map((d) =>
        d.rel === 'stylesheet' ? { ...d, rel: 'prefetch', as: 'style' } : { ...d, rel: 'prefetch' }
      )
  );
}
function Zm(i, s, r, f, d, m) {
  let g = (p, y) => (r[y] ? p.route.id !== r[y].route.id : !0),
    R = (p, y) => {
      var O;
      return (
        r[y].pathname !== p.pathname ||
        (((O = r[y].route.path) == null ? void 0 : O.endsWith('*')) &&
          r[y].params['*'] !== p.params['*'])
      );
    };
  return m === 'assets'
    ? s.filter((p, y) => g(p, y) || R(p, y))
    : m === 'data'
      ? s.filter((p, y) => {
          var T;
          let O = f.routes[p.route.id];
          if (!O || !O.hasLoader) return !1;
          if (g(p, y) || R(p, y)) return !0;
          if (p.route.shouldRevalidate) {
            let U = p.route.shouldRevalidate({
              currentUrl: new URL(d.pathname + d.search + d.hash, window.origin),
              currentParams: ((T = r[0]) == null ? void 0 : T.params) || {},
              nextUrl: new URL(i, window.origin),
              nextParams: p.params,
              defaultShouldRevalidate: !0,
            });
            if (typeof U == 'boolean') return U;
          }
          return !0;
        })
      : [];
}
function dp(i, s, { includeHydrateFallback: r } = {}) {
  return mp(
    i
      .map((f) => {
        let d = s.routes[f.route.id];
        if (!d) return [];
        let m = [d.module];
        return (
          d.clientActionModule && (m = m.concat(d.clientActionModule)),
          d.clientLoaderModule && (m = m.concat(d.clientLoaderModule)),
          r && d.hydrateFallbackModule && (m = m.concat(d.hydrateFallbackModule)),
          d.imports && (m = m.concat(d.imports)),
          m
        );
      })
      .flat(1)
  );
}
function mp(i) {
  return [...new Set(i)];
}
function hp(i) {
  let s = {},
    r = Object.keys(i).sort();
  for (let f of r) s[f] = i[f];
  return s;
}
function yp(i, s) {
  let r = new Set();
  return (
    new Set(s),
    i.reduce((f, d) => {
      let m = JSON.stringify(hp(d));
      return (r.has(m) || (r.add(m), f.push({ key: m, link: d })), f);
    }, [])
  );
}
function _s() {
  let i = z.useContext(Qa);
  return (bs(i, 'You must render this element inside a <DataRouterContext.Provider> element'), i);
}
function vp() {
  let i = z.useContext(zi);
  return (
    bs(i, 'You must render this element inside a <DataRouterStateContext.Provider> element'),
    i
  );
}
var Es = z.createContext(void 0);
Es.displayName = 'FrameworkContext';
function Ts() {
  let i = z.useContext(Es);
  return (bs(i, 'You must render this element inside a <HydratedRouter> element'), i);
}
function pp(i, s) {
  let r = z.useContext(Es),
    [f, d] = z.useState(!1),
    [m, g] = z.useState(!1),
    { onFocus: R, onBlur: p, onMouseEnter: y, onMouseLeave: O, onTouchStart: T } = s,
    U = z.useRef(null);
  (z.useEffect(() => {
    if ((i === 'render' && g(!0), i === 'viewport')) {
      let L = (B) => {
          B.forEach((W) => {
            g(W.isIntersecting);
          });
        },
        w = new IntersectionObserver(L, { threshold: 0.5 });
      return (
        U.current && w.observe(U.current),
        () => {
          w.disconnect();
        }
      );
    }
  }, [i]),
    z.useEffect(() => {
      if (f) {
        let L = setTimeout(() => {
          g(!0);
        }, 100);
        return () => {
          clearTimeout(L);
        };
      }
    }, [f]));
  let G = () => {
      d(!0);
    },
    Z = () => {
      (d(!1), g(!1));
    };
  return r
    ? i !== 'intent'
      ? [m, U, {}]
      : [
          m,
          U,
          {
            onFocus: wn(R, G),
            onBlur: wn(p, Z),
            onMouseEnter: wn(y, G),
            onMouseLeave: wn(O, Z),
            onTouchStart: wn(T, G),
          },
        ]
    : [!1, U, {}];
}
function wn(i, s) {
  return (r) => {
    (i && i(r), r.defaultPrevented || s(r));
  };
}
function gp({ page: i, ...s }) {
  let r = D0(),
    { router: f } = _s(),
    d = z.useMemo(() => th(f.routes, i, f.basename), [f.routes, i, f.basename]);
  return d
    ? r
      ? z.createElement(bp, { page: i, matches: d, ...s })
      : z.createElement(_p, { page: i, matches: d, ...s })
    : null;
}
function Sp(i) {
  let { manifest: s, routeModules: r } = Ts(),
    [f, d] = z.useState([]);
  return (
    z.useEffect(() => {
      let m = !1;
      return (
        op(i, s, r).then((g) => {
          m || d(g);
        }),
        () => {
          m = !0;
        }
      );
    }, [i, s, r]),
    f
  );
}
function bp({ page: i, matches: s, ...r }) {
  let f = we(),
    { future: d } = Ts(),
    { basename: m } = _s(),
    g = z.useMemo(() => {
      if (i === f.pathname + f.search + f.hash) return [];
      let R = yh(i, m, d.unstable_trailingSlashAwareDataRequests, 'rsc'),
        p = !1,
        y = [];
      for (let O of s)
        typeof O.route.shouldRevalidate == 'function' ? (p = !0) : y.push(O.route.id);
      return (
        p && y.length > 0 && R.searchParams.set('_routes', y.join(',')),
        [R.pathname + R.search]
      );
    }, [m, d.unstable_trailingSlashAwareDataRequests, i, f, s]);
  return z.createElement(
    z.Fragment,
    null,
    g.map((R) => z.createElement('link', { key: R, rel: 'prefetch', as: 'fetch', href: R, ...r }))
  );
}
function _p({ page: i, matches: s, ...r }) {
  let f = we(),
    { future: d, manifest: m, routeModules: g } = Ts(),
    { basename: R } = _s(),
    { loaderData: p, matches: y } = vp(),
    O = z.useMemo(() => Zm(i, s, y, m, f, 'data'), [i, s, y, m, f]),
    T = z.useMemo(() => Zm(i, s, y, m, f, 'assets'), [i, s, y, m, f]),
    U = z.useMemo(() => {
      if (i === f.pathname + f.search + f.hash) return [];
      let L = new Set(),
        w = !1;
      if (
        (s.forEach((W) => {
          var yt;
          let k = m.routes[W.route.id];
          !k ||
            !k.hasLoader ||
            ((!O.some((dt) => dt.route.id === W.route.id) &&
              W.route.id in p &&
              (yt = g[W.route.id]) != null &&
              yt.shouldRevalidate) ||
            k.hasClientLoader
              ? (w = !0)
              : L.add(W.route.id));
        }),
        L.size === 0)
      )
        return [];
      let B = yh(i, R, d.unstable_trailingSlashAwareDataRequests, 'data');
      return (
        w &&
          L.size > 0 &&
          B.searchParams.set(
            '_routes',
            s
              .filter((W) => L.has(W.route.id))
              .map((W) => W.route.id)
              .join(',')
          ),
        [B.pathname + B.search]
      );
    }, [R, d.unstable_trailingSlashAwareDataRequests, p, f, m, O, s, i, g]),
    G = z.useMemo(() => dp(T, m), [T, m]),
    Z = Sp(T);
  return z.createElement(
    z.Fragment,
    null,
    U.map((L) => z.createElement('link', { key: L, rel: 'prefetch', as: 'fetch', href: L, ...r })),
    G.map((L) => z.createElement('link', { key: L, rel: 'modulepreload', href: L, ...r })),
    Z.map(({ key: L, link: w }) =>
      z.createElement('link', {
        key: L,
        nonce: r.nonce,
        ...w,
        crossOrigin: w.crossOrigin ?? r.crossOrigin,
      })
    )
  );
}
function Ep(...i) {
  return (s) => {
    i.forEach((r) => {
      typeof r == 'function' ? r(s) : r != null && (r.current = s);
    });
  };
}
var Tp =
  typeof window < 'u' && typeof window.document < 'u' && typeof window.document.createElement < 'u';
try {
  Tp && (window.__reactRouterVersion = '7.14.2');
} catch {}
function Ap({ basename: i, children: s, unstable_useTransitions: r, window: f }) {
  let d = z.useRef();
  d.current == null && (d.current = n0({ window: f, v5Compat: !0 }));
  let m = d.current,
    [g, R] = z.useState({ action: m.action, location: m.location }),
    p = z.useCallback(
      (y) => {
        r === !1 ? R(y) : z.startTransition(() => R(y));
      },
      [r]
    );
  return (
    z.useLayoutEffect(() => m.listen(p), [m, p]),
    z.createElement(P0, {
      basename: i,
      children: s,
      location: g.location,
      navigationType: g.action,
      navigator: m,
      unstable_useTransitions: r,
    })
  );
}
var vh = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,
  ph = z.forwardRef(function (
    {
      onClick: s,
      discover: r = 'render',
      prefetch: f = 'none',
      relative: d,
      reloadDocument: m,
      replace: g,
      unstable_mask: R,
      state: p,
      target: y,
      to: O,
      preventScrollReset: T,
      viewTransition: U,
      unstable_defaultShouldRevalidate: G,
      ...Z
    },
    L
  ) {
    let { basename: w, navigator: B, unstable_useTransitions: W } = z.useContext(ve),
      k = typeof O == 'string' && vh.test(O),
      yt = uh(O, w);
    O = yt.to;
    let dt = L0(O, { relative: d }),
      Et = we(),
      F = null;
    if (R) {
      let jt = Ai(R, [], Et.unstable_mask ? Et.unstable_mask.pathname : '/', !0);
      (w !== '/' && (jt.pathname = jt.pathname === '/' ? w : Ne([w, jt.pathname])),
        (F = B.createHref(jt)));
    }
    let [Ct, Jt, je] = pp(f, Z),
      pe = Op(O, {
        replace: g,
        unstable_mask: R,
        state: p,
        target: y,
        preventScrollReset: T,
        relative: d,
        viewTransition: U,
        unstable_defaultShouldRevalidate: G,
        unstable_useTransitions: W,
      });
    function $t(jt) {
      (s && s(jt), jt.defaultPrevented || pe(jt));
    }
    let He = !(yt.isExternal || m),
      ge = z.createElement('a', {
        ...Z,
        ...je,
        href: (He ? F : void 0) || yt.absoluteURL || dt,
        onClick: He ? $t : s,
        ref: Ep(L, Jt),
        target: y,
        'data-discover': !k && r === 'render' ? 'true' : void 0,
      });
    return Ct && !k ? z.createElement(z.Fragment, null, ge, z.createElement(gp, { page: dt })) : ge;
  });
ph.displayName = 'Link';
var zp = z.forwardRef(function (
  {
    'aria-current': s = 'page',
    caseSensitive: r = !1,
    className: f = '',
    end: d = !1,
    style: m,
    to: g,
    viewTransition: R,
    children: p,
    ...y
  },
  O
) {
  let T = Wn(g, { relative: y.relative }),
    U = we(),
    G = z.useContext(zi),
    { navigator: Z, basename: L } = z.useContext(ve),
    w = G != null && Up(T) && R === !0,
    B = Z.encodeLocation ? Z.encodeLocation(T).pathname : T.pathname,
    W = U.pathname,
    k = G && G.navigation && G.navigation.location ? G.navigation.location.pathname : null;
  (r || ((W = W.toLowerCase()), (k = k ? k.toLowerCase() : null), (B = B.toLowerCase())),
    k && L && (k = il(k, L) || k));
  const yt = B !== '/' && B.endsWith('/') ? B.length - 1 : B.length;
  let dt = W === B || (!d && W.startsWith(B) && W.charAt(yt) === '/'),
    Et = k != null && (k === B || (!d && k.startsWith(B) && k.charAt(B.length) === '/')),
    F = { isActive: dt, isPending: Et, isTransitioning: w },
    Ct = dt ? s : void 0,
    Jt;
  typeof f == 'function'
    ? (Jt = f(F))
    : (Jt = [f, dt ? 'active' : null, Et ? 'pending' : null, w ? 'transitioning' : null]
        .filter(Boolean)
        .join(' '));
  let je = typeof m == 'function' ? m(F) : m;
  return z.createElement(
    ph,
    { ...y, 'aria-current': Ct, className: Jt, ref: O, style: je, to: g, viewTransition: R },
    typeof p == 'function' ? p(F) : p
  );
});
zp.displayName = 'NavLink';
var Rp = z.forwardRef(
  (
    {
      discover: i = 'render',
      fetcherKey: s,
      navigate: r,
      reloadDocument: f,
      replace: d,
      state: m,
      method: g = Si,
      action: R,
      onSubmit: p,
      relative: y,
      preventScrollReset: O,
      viewTransition: T,
      unstable_defaultShouldRevalidate: U,
      ...G
    },
    Z
  ) => {
    let { unstable_useTransitions: L } = z.useContext(ve),
      w = Dp(),
      B = Np(R, { relative: y }),
      W = g.toLowerCase() === 'get' ? 'get' : 'post',
      k = typeof R == 'string' && vh.test(R),
      yt = (dt) => {
        if ((p && p(dt), dt.defaultPrevented)) return;
        dt.preventDefault();
        let Et = dt.nativeEvent.submitter,
          F = (Et == null ? void 0 : Et.getAttribute('formmethod')) || g,
          Ct = () =>
            w(Et || dt.currentTarget, {
              fetcherKey: s,
              method: F,
              navigate: r,
              replace: d,
              state: m,
              relative: y,
              preventScrollReset: O,
              viewTransition: T,
              unstable_defaultShouldRevalidate: U,
            });
        L && r !== !1 ? z.startTransition(() => Ct()) : Ct();
      };
    return z.createElement('form', {
      ref: Z,
      method: W,
      action: B,
      onSubmit: f ? p : yt,
      ...G,
      'data-discover': !k && i === 'render' ? 'true' : void 0,
    });
  }
);
Rp.displayName = 'Form';
function xp(i) {
  return `${i} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function gh(i) {
  let s = z.useContext(Qa);
  return (Rt(s, xp(i)), s);
}
function Op(
  i,
  {
    target: s,
    replace: r,
    unstable_mask: f,
    state: d,
    preventScrollReset: m,
    relative: g,
    viewTransition: R,
    unstable_defaultShouldRevalidate: p,
    unstable_useTransitions: y,
  } = {}
) {
  let O = aa(),
    T = we(),
    U = Wn(i, { relative: g });
  return z.useCallback(
    (G) => {
      if (up(G, s)) {
        G.preventDefault();
        let Z = r !== void 0 ? r : kn(T) === kn(U),
          L = () =>
            O(i, {
              replace: Z,
              unstable_mask: f,
              state: d,
              preventScrollReset: m,
              relative: g,
              viewTransition: R,
              unstable_defaultShouldRevalidate: p,
            });
        y ? z.startTransition(() => L()) : L();
      }
    },
    [T, O, U, r, f, d, s, i, m, g, R, p, y]
  );
}
var Mp = 0,
  Cp = () => `__${String(++Mp)}__`;
function Dp() {
  let { router: i } = gh('useSubmit'),
    { basename: s } = z.useContext(ve),
    r = $0(),
    f = i.fetch,
    d = i.navigate;
  return z.useCallback(
    async (m, g = {}) => {
      let { action: R, method: p, encType: y, formData: O, body: T } = fp(m, s);
      if (g.navigate === !1) {
        let U = g.fetcherKey || Cp();
        await f(U, r, g.action || R, {
          unstable_defaultShouldRevalidate: g.unstable_defaultShouldRevalidate,
          preventScrollReset: g.preventScrollReset,
          formData: O,
          body: T,
          formMethod: g.method || p,
          formEncType: g.encType || y,
          flushSync: g.flushSync,
        });
      } else
        await d(g.action || R, {
          unstable_defaultShouldRevalidate: g.unstable_defaultShouldRevalidate,
          preventScrollReset: g.preventScrollReset,
          formData: O,
          body: T,
          formMethod: g.method || p,
          formEncType: g.encType || y,
          replace: g.replace,
          state: g.state,
          fromRouteId: r,
          flushSync: g.flushSync,
          viewTransition: g.viewTransition,
        });
    },
    [f, d, s, r]
  );
}
function Np(i, { relative: s } = {}) {
  let { basename: r } = z.useContext(ve),
    f = z.useContext(Ge);
  Rt(f, 'useFormAction must be used inside a RouteContext');
  let [d] = f.matches.slice(-1),
    m = { ...Wn(i || '.', { relative: s }) },
    g = we();
  if (i == null) {
    m.search = g.search;
    let R = new URLSearchParams(m.search),
      p = R.getAll('index');
    if (p.some((O) => O === '')) {
      (R.delete('index'), p.filter((T) => T).forEach((T) => R.append('index', T)));
      let O = R.toString();
      m.search = O ? `?${O}` : '';
    }
  }
  return (
    (!i || i === '.') &&
      d.route.index &&
      (m.search = m.search ? m.search.replace(/^\?/, '?index&') : '?index'),
    r !== '/' && (m.pathname = m.pathname === '/' ? r : Ne([r, m.pathname])),
    kn(m)
  );
}
function Up(i, { relative: s } = {}) {
  let r = z.useContext(fh);
  Rt(
    r != null,
    "`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?"
  );
  let { basename: f } = gh('useViewTransitionState'),
    d = Wn(i, { relative: s });
  if (!r.isTransitioning) return !1;
  let m = il(r.currentLocation.pathname, f) || r.currentLocation.pathname,
    g = il(r.nextLocation.pathname, f) || r.nextLocation.pathname;
  return Ei(d.pathname, g) != null || Ei(d.pathname, m) != null;
}
const jp = '_layout_12hwc_1',
  Hp = '_placeholder_12hwc_11',
  Bp = '_primary_12hwc_30',
  ls = { layout: jp, placeholder: Hp, primary: Bp },
  qp = 500,
  ss = 30,
  Lp = 3,
  Yp = 2,
  Vn = {
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
  Kn = {
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
  };
function Gp() {
  return Math.floor(Math.random() * 4294967296) >>> 0;
}
const _i = 1,
  wp = { autoMap: 'on', bgmVolume: 0.6, seVolume: 0.6 };
function Vm() {
  return { monsters: {}, items: {} };
}
function Xp() {
  return { deepestReached: 0, highestBossDefeated: 0, totalDives: 0, bossDefeatLog: [] };
}
const Qp = () => ({ weapon: null, armor: null, accessory: null });
function Zp() {
  return `char_${Date.now().toString(36)}_${Math.floor(Math.random() * 16777215).toString(36)}`;
}
function Vp(i) {
  const { raceId: s, classId: r, name: f, id: d } = i;
  if (!Kn[s]) throw new Error(`createCharacter: 未定義の種族 "${s}"`);
  if (!Vn[r]) throw new Error(`createCharacter: 未定義の職業 "${r}"`);
  return {
    id: d ?? Zp(),
    name: f,
    raceId: s,
    classId: r,
    titleId: null,
    level: 1,
    exp: 0,
    skillPoints: { total: 0, spent: 0 },
    learnedSkills: {},
    equipment: Qp(),
  };
}
function Kp() {
  return { front: Array(Lp).fill(null), back: Array(Yp).fill(null) };
}
function kp(i, s) {
  const r = i.front.indexOf(null);
  if (r !== -1) {
    const d = [...i.front];
    return ((d[r] = s), { ...i, front: d });
  }
  const f = i.back.indexOf(null);
  if (f !== -1) {
    const d = [...i.back];
    return ((d[f] = s), { ...i, back: d });
  }
  return i;
}
function Jp(i, s) {
  return i.guild.members.length >= ss
    ? i
    : {
        ...i,
        guild: { ...i.guild, members: [...i.guild.members, s], party: kp(i.guild.party, s.id) },
      };
}
function $p(i) {
  return {
    schemaVersion: _i,
    savedAt: 0,
    masterSeed: Gp(),
    settings: { ...wp },
    guild: { name: i, gold: qp, members: [], party: Kp(), storage: [], bestiary: Vm() },
    towerState: { floors: {}, bossGates: {}, warp: { unlockedCheckpoints: [] }, record: Xp() },
    diveState: null,
    bestiary: Vm(),
    playerMaps: {},
    exploredCells: {},
    forgeInventory: { fragments: {}, ingots: { copper: 0, silver: 0, gold: 0 } },
    shopStock: { unlockedTiers: [0] },
    flags: {},
  };
}
const rs = (i, s) => s.some((r) => i instanceof r);
let Km, km;
function Wp() {
  return Km || (Km = [IDBDatabase, IDBObjectStore, IDBIndex, IDBCursor, IDBTransaction]);
}
function Fp() {
  return (
    km ||
    (km = [
      IDBCursor.prototype.advance,
      IDBCursor.prototype.continue,
      IDBCursor.prototype.continuePrimaryKey,
    ])
  );
}
const os = new WeakMap(),
  as = new WeakMap(),
  xi = new WeakMap();
function Ip(i) {
  const s = new Promise((r, f) => {
    const d = () => {
        (i.removeEventListener('success', m), i.removeEventListener('error', g));
      },
      m = () => {
        (r(la(i.result)), d());
      },
      g = () => {
        (f(i.error), d());
      };
    (i.addEventListener('success', m), i.addEventListener('error', g));
  });
  return (xi.set(s, i), s);
}
function Pp(i) {
  if (os.has(i)) return;
  const s = new Promise((r, f) => {
    const d = () => {
        (i.removeEventListener('complete', m),
          i.removeEventListener('error', g),
          i.removeEventListener('abort', g));
      },
      m = () => {
        (r(), d());
      },
      g = () => {
        (f(i.error || new DOMException('AbortError', 'AbortError')), d());
      };
    (i.addEventListener('complete', m),
      i.addEventListener('error', g),
      i.addEventListener('abort', g));
  });
  os.set(i, s);
}
let ds = {
  get(i, s, r) {
    if (i instanceof IDBTransaction) {
      if (s === 'done') return os.get(i);
      if (s === 'store')
        return r.objectStoreNames[1] ? void 0 : r.objectStore(r.objectStoreNames[0]);
    }
    return la(i[s]);
  },
  set(i, s, r) {
    return ((i[s] = r), !0);
  },
  has(i, s) {
    return i instanceof IDBTransaction && (s === 'done' || s === 'store') ? !0 : s in i;
  },
};
function Sh(i) {
  ds = i(ds);
}
function tg(i) {
  return Fp().includes(i)
    ? function (...s) {
        return (i.apply(ms(this), s), la(this.request));
      }
    : function (...s) {
        return la(i.apply(ms(this), s));
      };
}
function eg(i) {
  return typeof i == 'function'
    ? tg(i)
    : (i instanceof IDBTransaction && Pp(i), rs(i, Wp()) ? new Proxy(i, ds) : i);
}
function la(i) {
  if (i instanceof IDBRequest) return Ip(i);
  if (as.has(i)) return as.get(i);
  const s = eg(i);
  return (s !== i && (as.set(i, s), xi.set(s, i)), s);
}
const ms = (i) => xi.get(i);
function lg(i, s, { blocked: r, upgrade: f, blocking: d, terminated: m } = {}) {
  const g = indexedDB.open(i, s),
    R = la(g);
  return (
    f &&
      g.addEventListener('upgradeneeded', (p) => {
        f(la(g.result), p.oldVersion, p.newVersion, la(g.transaction), p);
      }),
    r && g.addEventListener('blocked', (p) => r(p.oldVersion, p.newVersion, p)),
    R.then((p) => {
      (m && p.addEventListener('close', () => m()),
        d && p.addEventListener('versionchange', (y) => d(y.oldVersion, y.newVersion, y)));
    }).catch(() => {}),
    R
  );
}
const ag = ['get', 'getKey', 'getAll', 'getAllKeys', 'count'],
  ng = ['put', 'add', 'delete', 'clear'],
  ns = new Map();
function Jm(i, s) {
  if (!(i instanceof IDBDatabase && !(s in i) && typeof s == 'string')) return;
  if (ns.get(s)) return ns.get(s);
  const r = s.replace(/FromIndex$/, ''),
    f = s !== r,
    d = ng.includes(r);
  if (!(r in (f ? IDBIndex : IDBObjectStore).prototype) || !(d || ag.includes(r))) return;
  const m = async function (g, ...R) {
    const p = this.transaction(g, d ? 'readwrite' : 'readonly');
    let y = p.store;
    return (f && (y = y.index(R.shift())), (await Promise.all([y[r](...R), d && p.done]))[0]);
  };
  return (ns.set(s, m), m);
}
Sh((i) => ({
  ...i,
  get: (s, r, f) => Jm(s, r) || i.get(s, r, f),
  has: (s, r) => !!Jm(s, r) || i.has(s, r),
}));
const ug = ['continue', 'continuePrimaryKey', 'advance'],
  $m = {},
  hs = new WeakMap(),
  bh = new WeakMap(),
  ig = {
    get(i, s) {
      if (!ug.includes(s)) return i[s];
      let r = $m[s];
      return (
        r ||
          (r = $m[s] =
            function (...f) {
              hs.set(this, bh.get(this)[s](...f));
            }),
        r
      );
    },
  };
async function* cg(...i) {
  let s = this;
  if ((s instanceof IDBCursor || (s = await s.openCursor(...i)), !s)) return;
  s = s;
  const r = new Proxy(s, ig);
  for (bh.set(r, s), xi.set(r, ms(s)); s; )
    (yield r, (s = await (hs.get(r) || s.continue())), hs.delete(r));
}
function Wm(i, s) {
  return (
    (s === Symbol.asyncIterator && rs(i, [IDBIndex, IDBObjectStore, IDBCursor])) ||
    (s === 'iterate' && rs(i, [IDBIndex, IDBObjectStore]))
  );
}
Sh((i) => ({
  ...i,
  get(s, r, f) {
    return Wm(s, r) ? cg : i.get(s, r, f);
  },
  has(s, r) {
    return Wm(s, r) || i.has(s, r);
  },
}));
const fg = {};
function sg(i) {
  return structuredClone(i);
}
function Zn(i) {
  return typeof i == 'object' && i !== null && !Array.isArray(i);
}
function rg(i) {
  if (
    !Zn(i) ||
    typeof i.schemaVersion != 'number' ||
    typeof i.masterSeed != 'number' ||
    !Zn(i.guild)
  )
    return !1;
  const s = i.guild;
  return !(
    typeof s.name != 'string' ||
    !Array.isArray(s.members) ||
    !Zn(i.towerState) ||
    !Zn(i.towerState.record) ||
    typeof i.towerState.record.deepestReached != 'number'
  );
}
function _h(i) {
  if (!Zn(i) || typeof i.schemaVersion != 'number')
    return { ok: !1, reason: 'セーブデータの構造が不正です' };
  let s = i.schemaVersion;
  if (s > _i) return { ok: !1, reason: `未知のバージョン (${s} > ${_i}) のセーブデータです` };
  let r = { ...i };
  for (; s < _i; ) {
    const f = fg[s];
    if (!f) return { ok: !1, reason: `バージョン ${s} の migration が未定義です` };
    ((r = f(r)), (s = typeof r.schemaVersion == 'number' ? r.schemaVersion : s + 1));
  }
  return rg(r)
    ? { ok: !0, data: r }
    : { ok: !1, reason: 'migration 後のデータが SaveData の形をしていません' };
}
function og(i) {
  return {
    guildName: i.guild.name,
    deepestReached: i.towerState.record.deepestReached,
    memberCount: i.guild.members.length,
    savedAt: i.savedAt,
  };
}
function Fm() {
  return {
    guildName: '(破損データ)',
    deepestReached: 0,
    memberCount: 0,
    savedAt: 0,
    corrupted: !0,
  };
}
const dg = 'sekaiju-like-game',
  mg = 1,
  Jn = 'saves',
  As = 'main';
let us = null;
function zs() {
  return (
    us ||
      (us = lg(dg, mg, {
        upgrade(i) {
          i.objectStoreNames.contains(Jn) || i.createObjectStore(Jn);
        },
      })),
    us
  );
}
async function Im(i) {
  const s = { ...i, savedAt: Date.now() };
  return (await (await zs()).put(Jn, sg(s), As), s);
}
async function hg() {
  const s = await (await zs()).get(Jn, As);
  return s === void 0 ? { ok: !1, reason: 'empty' } : _h(s);
}
async function yg() {
  const s = await (await zs()).get(Jn, As);
  if (s === void 0) return null;
  const r = _h(s);
  if (!r.ok) return Fm();
  try {
    return og(r.data);
  } catch {
    return Fm();
  }
}
const Eh = { save: null, saving: !1 };
function vg(i, s) {
  switch (s.type) {
    case 'load':
      return { ...i, save: s.save };
    case 'updateSave':
      return i.save ? { ...i, save: s.updater(i.save) } : i;
    case 'setSave':
      return { ...i, save: s.save };
    case 'saving':
      return { ...i, saving: s.saving };
    case 'clear':
      return { ...Eh };
  }
}
const Th = z.createContext(null);
function pg(i) {
  const s = z.useRef(i);
  return ((s.current = i), s);
}
function gg({ children: i }) {
  const [s, r] = z.useReducer(vg, Eh),
    f = pg(s),
    d = z.useCallback(async (O) => {
      const T = $p(O),
        U = await Im(T);
      r({ type: 'load', save: U });
    }, []),
    m = z.useCallback(async () => {
      const O = await hg();
      return O.ok ? (r({ type: 'load', save: O.data }), { ok: !0 }) : { ok: !1, reason: O.reason };
    }, []),
    g = z.useCallback((O) => {
      r({ type: 'updateSave', updater: O });
    }, []),
    R = z.useCallback(async () => {
      const { save: O } = f.current;
      if (O) {
        r({ type: 'saving', saving: !0 });
        try {
          const T = await Im(O);
          r({ type: 'setSave', save: T });
        } finally {
          r({ type: 'saving', saving: !1 });
        }
      }
    }, [f]),
    p = z.useCallback(() => {
      r({ type: 'clear' });
    }, []),
    y = z.useMemo(
      () => ({ ...s, startNewGame: d, continueGame: m, applySave: g, persist: R, exitToTitle: p }),
      [s, d, m, g, R, p]
    );
  return M.jsx(Th.Provider, { value: y, children: i });
}
function In() {
  const i = z.useContext(Th);
  if (!i) throw new Error('useGameState は GameStateProvider の内側で使ってください');
  return i;
}
const Sg = () => {
    const i = aa(),
      { save: s } = In();
    return s
      ? M.jsxs('div', {
          className: ls.layout,
          children: [
            M.jsxs('div', {
              className: ls.placeholder,
              children: [
                M.jsx('h1', { children: '戦闘' }),
                M.jsx('p', { children: 'ターン制バトルは Phase 2 で実装します。' }),
              ],
            }),
            M.jsx('button', {
              type: 'button',
              className: ls.primary,
              onClick: () => i('/dungeon'),
              children: '探索へ戻る',
            }),
          ],
        })
      : M.jsx(Fn, { to: '/title', replace: !0 });
  },
  bg = '_layout_5dc3u_1',
  _g = '_placeholder_5dc3u_11',
  Eg = '_actions_5dc3u_31',
  Tg = '_primary_5dc3u_36',
  Ag = '_sub_5dc3u_48',
  Xn = { layout: bg, placeholder: _g, actions: Eg, primary: Tg, sub: Ag },
  zg = () => {
    const i = aa(),
      { save: s } = In();
    return s
      ? M.jsxs('div', {
          className: Xn.layout,
          children: [
            M.jsxs('div', {
              className: Xn.placeholder,
              children: [
                M.jsx('h1', { children: '探索' }),
                M.jsx('p', {
                  children: '自動生成1階のグリッド探索・手描きマップは Phase 1 で実装します。',
                }),
              ],
            }),
            M.jsxs('div', {
              className: Xn.actions,
              children: [
                M.jsx('button', {
                  type: 'button',
                  className: Xn.sub,
                  onClick: () => i('/battle'),
                  children: '戦闘デモへ（仮）',
                }),
                M.jsx('button', {
                  type: 'button',
                  className: Xn.primary,
                  onClick: () => i('/town'),
                  children: '拠点へ帰還',
                }),
              ],
            }),
          ],
        })
      : M.jsx(Fn, { to: '/title', replace: !0 });
  },
  Rg = '_layout_1k2ki_1',
  xg = '_head_1k2ki_12',
  Og = '_title_1k2ki_19',
  Mg = '_count_1k2ki_25',
  Cg = '_create_1k2ki_30',
  Dg = '_sectionTitle_1k2ki_41',
  Ng = '_field_1k2ki_47',
  Ug = '_primary_1k2ki_63',
  jg = '_list_1k2ki_78',
  Hg = '_empty_1k2ki_82',
  Bg = '_members_1k2ki_87',
  qg = '_member_1k2ki_87',
  Lg = '_memberName_1k2ki_106',
  Yg = '_memberSub_1k2ki_111',
  Gg = '_foot_1k2ki_116',
  wg = '_sub_1k2ki_120',
  Gt = {
    layout: Rg,
    head: xg,
    title: Og,
    count: Mg,
    create: Cg,
    sectionTitle: Dg,
    field: Ng,
    primary: Ug,
    list: jg,
    empty: Hg,
    members: Bg,
    member: qg,
    memberName: Lg,
    memberSub: Yg,
    foot: Gg,
    sub: wg,
  },
  Xg = () => {
    const i = aa(),
      { save: s, applySave: r, persist: f } = In(),
      d = Object.keys(Kn),
      m = Object.keys(Vn),
      [g, R] = z.useState(''),
      [p, y] = z.useState(d[0]),
      [O, T] = z.useState(m[0]),
      [U, G] = z.useState(!1),
      Z = z.useCallback(async () => {
        const B = g.trim() || '名もなき冒険者',
          W = Vp({ raceId: p, classId: O, name: B });
        (r((k) => Jp(k, W)), R(''), G(!0), await f(), G(!1));
      }, [g, p, O, r, f]);
    if (!s) return M.jsx(Fn, { to: '/title', replace: !0 });
    const { members: L } = s.guild,
      w = L.length >= ss;
    return M.jsxs('div', {
      className: Gt.layout,
      children: [
        M.jsxs('header', {
          className: Gt.head,
          children: [
            M.jsx('h1', { className: Gt.title, children: 'ギルド管理' }),
            M.jsxs('span', { className: Gt.count, children: ['団員 ', L.length, ' / ', ss] }),
          ],
        }),
        M.jsxs('section', {
          className: Gt.create,
          children: [
            M.jsx('h2', { className: Gt.sectionTitle, children: '冒険者を作成' }),
            M.jsxs('label', {
              className: Gt.field,
              children: [
                M.jsx('span', { children: '名前' }),
                M.jsx('input', {
                  type: 'text',
                  value: g,
                  maxLength: 16,
                  placeholder: '名もなき冒険者',
                  onChange: (B) => R(B.target.value),
                }),
              ],
            }),
            M.jsxs('label', {
              className: Gt.field,
              children: [
                M.jsx('span', { children: '種族' }),
                M.jsx('select', {
                  value: p,
                  onChange: (B) => y(B.target.value),
                  children: d.map((B) => M.jsx('option', { value: B, children: Kn[B].name }, B)),
                }),
              ],
            }),
            M.jsxs('label', {
              className: Gt.field,
              children: [
                M.jsx('span', { children: '職業' }),
                M.jsx('select', {
                  value: O,
                  onChange: (B) => T(B.target.value),
                  children: m.map((B) => M.jsx('option', { value: B, children: Vn[B].name }, B)),
                }),
              ],
            }),
            M.jsx('button', {
              type: 'button',
              className: Gt.primary,
              disabled: U || w,
              onClick: () => void Z(),
              children: w ? '団員が上限です' : '作成する',
            }),
          ],
        }),
        M.jsxs('section', {
          className: Gt.list,
          children: [
            M.jsx('h2', { className: Gt.sectionTitle, children: '団員一覧' }),
            L.length === 0
              ? M.jsx('p', { className: Gt.empty, children: 'まだ冒険者がいません。' })
              : M.jsx('ul', {
                  className: Gt.members,
                  children: L.map((B) => {
                    var W, k;
                    return M.jsxs(
                      'li',
                      {
                        className: Gt.member,
                        children: [
                          M.jsx('span', { className: Gt.memberName, children: B.name }),
                          M.jsxs('span', {
                            className: Gt.memberSub,
                            children: [
                              (W = Kn[B.raceId]) == null ? void 0 : W.name,
                              ' / ',
                              (k = Vn[B.classId]) == null ? void 0 : k.name,
                              ' / Lv',
                              B.level,
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
        M.jsx('footer', {
          className: Gt.foot,
          children: M.jsx('button', {
            type: 'button',
            className: Gt.sub,
            onClick: () => i('/town'),
            children: '拠点へ戻る',
          }),
        }),
      ],
    });
  },
  Qg = () => M.jsx('div', { children: M.jsx('h1', { children: 'Not Found' }) }),
  Zg = '_layout_1xkiw_1',
  Vg = '_head_1xkiw_12',
  Kg = '_title_1xkiw_17',
  kg = '_subtitle_1xkiw_24',
  Jg = '_body_1xkiw_30',
  $g = '_menu_1xkiw_34',
  Wg = '_loading_1xkiw_40',
  Fg = '_warn_1xkiw_45',
  Ig = '_danger_1xkiw_52',
  Pg = '_dialog_1xkiw_67',
  t1 = '_dialogTitle_1xkiw_77',
  e1 = '_field_1xkiw_82',
  l1 = '_note_1xkiw_96',
  a1 = '_dialogActions_1xkiw_102',
  n1 = '_primary_1xkiw_107',
  u1 = '_sub_1xkiw_24',
  i1 = '_foot_1xkiw_132',
  xt = {
    layout: Zg,
    head: Vg,
    title: Kg,
    subtitle: kg,
    body: Jg,
    menu: $g,
    loading: Wg,
    warn: Fg,
    danger: Ig,
    dialog: Pg,
    dialogTitle: t1,
    field: e1,
    note: l1,
    dialogActions: a1,
    primary: n1,
    sub: u1,
    foot: i1,
  },
  c1 = '_card_3vsn6_1',
  f1 = '_corrupted_3vsn6_14',
  s1 = '_corruptedText_3vsn6_19',
  r1 = '_corruptedNote_3vsn6_25',
  o1 = '_guildName_3vsn6_31',
  d1 = '_meta_3vsn6_36',
  Nl = {
    card: c1,
    corrupted: f1,
    corruptedText: s1,
    corruptedNote: r1,
    guildName: o1,
    meta: d1,
    continue: '_continue_3vsn6_56',
  },
  m1 = (i) => {
    if (!i) return '-';
    const s = new Date(i),
      r = (f) => String(f).padStart(2, '0');
    return `${s.getFullYear()}/${r(s.getMonth() + 1)}/${r(s.getDate())} ${r(s.getHours())}:${r(s.getMinutes())}`;
  },
  h1 = ({ meta: i, onContinue: s }) =>
    i.corrupted
      ? M.jsxs('div', {
          className: `${Nl.card} ${Nl.corrupted}`,
          children: [
            M.jsx('div', { className: Nl.corruptedText, children: 'セーブデータが破損しています' }),
            M.jsx('p', {
              className: Nl.corruptedNote,
              children: '「最初から」で新しく始められます。',
            }),
          ],
        })
      : M.jsxs('div', {
          className: Nl.card,
          children: [
            M.jsx('div', { className: Nl.guildName, children: i.guildName }),
            M.jsxs('dl', {
              className: Nl.meta,
              children: [
                M.jsxs('div', {
                  children: [
                    M.jsx('dt', { children: '最高到達階' }),
                    M.jsx('dd', {
                      children: i.deepestReached > 0 ? `${i.deepestReached}F` : '未踏破',
                    }),
                  ],
                }),
                M.jsxs('div', {
                  children: [
                    M.jsx('dt', { children: '団員' }),
                    M.jsxs('dd', { children: [i.memberCount, '人'] }),
                  ],
                }),
                M.jsxs('div', {
                  children: [
                    M.jsx('dt', { children: '最終セーブ' }),
                    M.jsx('dd', { children: m1(i.savedAt) }),
                  ],
                }),
              ],
            }),
            M.jsx('button', {
              type: 'button',
              className: Nl.continue,
              onClick: s,
              children: 'つづきから',
            }),
          ],
        }),
  y1 = () => {
    const i = aa(),
      { startNewGame: s, continueGame: r } = In(),
      [f, d] = z.useState(null),
      [m, g] = z.useState(!0),
      [R, p] = z.useState('menu'),
      [y, O] = z.useState(''),
      [T, U] = z.useState(!1);
    z.useEffect(() => {
      (async () => (d(await yg()), g(!1)))();
    }, []);
    const G = f !== null && !f.corrupted,
      Z = z.useCallback(async () => {
        U(!0);
        const B = await r();
        (U(!1), B.ok && i('/town'));
      }, [r, i]),
      L = z.useCallback(() => {
        (O(''), p(G ? 'confirm' : 'guildName'));
      }, [G]),
      w = z.useCallback(async () => {
        const B = y.trim() || 'ななしのギルド';
        (U(!0), await s(B), U(!1), i('/town'));
      }, [y, s, i]);
    return M.jsxs('div', {
      className: xt.layout,
      children: [
        M.jsxs('header', {
          className: xt.head,
          children: [
            M.jsx('h1', { className: xt.title, children: '世界樹ライク' }),
            M.jsx('p', { className: xt.subtitle, children: '無限タワー探索 RPG' }),
          ],
        }),
        M.jsx('main', {
          className: xt.body,
          children: m
            ? M.jsx('p', { className: xt.loading, children: '読み込み中...' })
            : R === 'guildName'
              ? M.jsxs('div', {
                  className: xt.dialog,
                  children: [
                    M.jsx('h2', { className: xt.dialogTitle, children: '新しいギルド' }),
                    M.jsxs('label', {
                      className: xt.field,
                      children: [
                        M.jsx('span', { children: 'ギルド名' }),
                        M.jsx('input', {
                          type: 'text',
                          value: y,
                          maxLength: 16,
                          placeholder: 'ななしのギルド',
                          onChange: (B) => O(B.target.value),
                          autoFocus: !0,
                        }),
                      ],
                    }),
                    M.jsx('p', {
                      className: xt.note,
                      children:
                        '冒険者はまだいません。開始後、ギルドメニューで仲間を作成してください。',
                    }),
                    M.jsxs('div', {
                      className: xt.dialogActions,
                      children: [
                        M.jsx('button', {
                          type: 'button',
                          className: xt.primary,
                          disabled: T,
                          onClick: w,
                          children: 'はじめる',
                        }),
                        M.jsx('button', {
                          type: 'button',
                          className: xt.sub,
                          disabled: T,
                          onClick: () => p('menu'),
                          children: 'もどる',
                        }),
                      ],
                    }),
                  ],
                })
              : R === 'confirm'
                ? M.jsxs('div', {
                    className: xt.dialog,
                    children: [
                      M.jsx('h2', { className: xt.dialogTitle, children: '最初から始めますか？' }),
                      M.jsxs('p', {
                        className: xt.warn,
                        children: [
                          '現在のセーブデータ「',
                          f == null ? void 0 : f.guildName,
                          '」は上書きされ、元に戻せません。',
                        ],
                      }),
                      M.jsxs('div', {
                        className: xt.dialogActions,
                        children: [
                          M.jsx('button', {
                            type: 'button',
                            className: xt.danger,
                            disabled: T,
                            onClick: () => p('guildName'),
                            children: 'データを消して始める',
                          }),
                          M.jsx('button', {
                            type: 'button',
                            className: xt.sub,
                            disabled: T,
                            onClick: () => p('menu'),
                            children: 'もどる',
                          }),
                        ],
                      }),
                    ],
                  })
                : M.jsxs('div', {
                    className: xt.menu,
                    children: [
                      f !== null && M.jsx(h1, { meta: f, onContinue: () => void Z() }),
                      M.jsx('button', {
                        type: 'button',
                        className: G ? xt.sub : xt.primary,
                        onClick: L,
                        children: '最初から',
                      }),
                    ],
                  }),
        }),
        M.jsxs('footer', { className: xt.foot, children: ['v', '0.1.6'] }),
      ],
    });
  },
  v1 = '_layout_1wdo2_1',
  p1 = '_head_1wdo2_12',
  g1 = '_guildName_1wdo2_16',
  S1 = '_stats_1wdo2_21',
  b1 = '_hint_1wdo2_40',
  _1 = '_menu_1wdo2_50',
  E1 = '_foot_1wdo2_57',
  T1 = '_exit_1wdo2_61',
  Ul = { layout: v1, head: p1, guildName: g1, stats: S1, hint: b1, menu: _1, foot: E1, exit: T1 },
  A1 = '_button_1tp4a_1',
  z1 = '_primary_1tp4a_26',
  R1 = '_label_1tp4a_32',
  x1 = '_description_1tp4a_37',
  gi = { button: A1, primary: z1, label: R1, description: x1 },
  Qn = ({ label: i, description: s, variant: r = 'default', disabled: f = !1, onClick: d }) =>
    M.jsxs('button', {
      type: 'button',
      className: `${gi.button} ${r === 'primary' ? gi.primary : ''}`,
      disabled: f,
      onClick: d,
      children: [
        M.jsx('span', { className: gi.label, children: i }),
        s ? M.jsx('span', { className: gi.description, children: s }) : null,
      ],
    }),
  O1 = () => {
    const i = aa(),
      { save: s, exitToTitle: r } = In();
    if (!s) return M.jsx(Fn, { to: '/title', replace: !0 });
    const { guild: f, towerState: d, diveState: m } = s,
      g = f.members.length > 0,
      R = () => {
        (r(), i('/title'));
      };
    return M.jsxs('div', {
      className: Ul.layout,
      children: [
        M.jsxs('header', {
          className: Ul.head,
          children: [
            M.jsx('div', { className: Ul.guildName, children: f.name }),
            M.jsxs('dl', {
              className: Ul.stats,
              children: [
                M.jsxs('div', {
                  children: [
                    M.jsx('dt', { children: '所持金' }),
                    M.jsxs('dd', { children: [f.gold, ' G'] }),
                  ],
                }),
                M.jsxs('div', {
                  children: [
                    M.jsx('dt', { children: '最高到達' }),
                    M.jsx('dd', {
                      children: d.record.deepestReached > 0 ? `${d.record.deepestReached}F` : '-',
                    }),
                  ],
                }),
                M.jsxs('div', {
                  children: [
                    M.jsx('dt', { children: '団員' }),
                    M.jsxs('dd', { children: [f.members.length, '人'] }),
                  ],
                }),
              ],
            }),
          ],
        }),
        !g &&
          M.jsx('p', {
            className: Ul.hint,
            children:
              'まずは「ギルド管理」で冒険者を作成してください。団員がいないとダイブできません。',
          }),
        M.jsxs('main', {
          className: Ul.menu,
          children: [
            M.jsx(Qn, {
              label: m ? '潜行を再開' : 'ダイブ開始',
              description: g
                ? m
                  ? `${m.depth}F から再開`
                  : '第1階からタワーへ潜る'
                : '団員が必要です',
              variant: 'primary',
              disabled: !g,
              onClick: () => i('/dungeon'),
            }),
            M.jsx(Qn, {
              label: 'ギルド管理',
              description: '編成・キャラ作成',
              onClick: () => i('/guild'),
            }),
            M.jsx(Qn, {
              label: 'ショップ',
              description: '装備・アイテム売買（Phase 3）',
              disabled: !0,
            }),
            M.jsx(Qn, { label: '鍛冶屋', description: '武器強化（Phase 4）', disabled: !0 }),
            M.jsx(Qn, {
              label: '図鑑 / 記録',
              description: '到達記録・図鑑（Phase 4-5）',
              disabled: !0,
            }),
          ],
        }),
        M.jsx('footer', {
          className: Ul.foot,
          children: M.jsx('button', {
            type: 'button',
            className: Ul.exit,
            onClick: R,
            children: 'タイトルへ戻る',
          }),
        }),
      ],
    });
  };
function M1() {
  return M.jsxs(tp, {
    children: [
      M.jsx(Hl, { path: '/', element: M.jsx(Fn, { to: '/title', replace: !0 }) }),
      M.jsx(Hl, { path: '/title', element: M.jsx(y1, {}) }),
      M.jsx(Hl, { path: '/town', element: M.jsx(O1, {}) }),
      M.jsx(Hl, { path: '/guild', element: M.jsx(Xg, {}) }),
      M.jsx(Hl, { path: '/dungeon', element: M.jsx(zg, {}) }),
      M.jsx(Hl, { path: '/battle', element: M.jsx(Sg, {}) }),
      M.jsx(Hl, { path: '*', element: M.jsx(Qg, {}) }),
    ],
  });
}
const C1 = {
    enemy_slime: {
      id: 'enemy_slime',
      name: 'スライム',
      baseStats: { hp: 18, tp: 0, str: 5, vit: 4, agi: 4, int: 2, mnd: 3, luc: 3 },
      refDepth: 1,
      tierBand: 0,
    },
    enemy_giant_rat: {
      id: 'enemy_giant_rat',
      name: 'おおねずみ',
      baseStats: { hp: 14, tp: 0, str: 6, vit: 3, agi: 7, int: 2, mnd: 2, luc: 4 },
      refDepth: 1,
      tierBand: 0,
    },
    enemy_cave_bat: {
      id: 'enemy_cave_bat',
      name: 'どうくつコウモリ',
      baseStats: { hp: 12, tp: 0, str: 5, vit: 2, agi: 9, int: 3, mnd: 2, luc: 5 },
      refDepth: 1,
      tierBand: 0,
    },
    enemy_boss_gatekeeper: {
      id: 'enemy_boss_gatekeeper',
      name: '門番のゴーレム',
      baseStats: { hp: 220, tp: 0, str: 18, vit: 16, agi: 6, int: 4, mnd: 10, luc: 6 },
      refDepth: 10,
      tierBand: 0,
    },
  },
  D1 = {
    equip_short_sword: {
      id: 'equip_short_sword',
      name: 'ショートソード',
      slot: 'weapon',
      weaponType: 'sword',
      bonuses: { atk: 6 },
    },
    equip_iron_spear: {
      id: 'equip_iron_spear',
      name: '鉄の槍',
      slot: 'weapon',
      weaponType: 'spear',
      bonuses: { atk: 7 },
    },
    equip_oak_staff: {
      id: 'equip_oak_staff',
      name: '樫の杖',
      slot: 'weapon',
      weaponType: 'staff',
      bonuses: { mat: 7 },
    },
    equip_short_bow: {
      id: 'equip_short_bow',
      name: 'ショートボウ',
      slot: 'weapon',
      weaponType: 'bow',
      bonuses: { atk: 5 },
    },
    equip_leather_armor: {
      id: 'equip_leather_armor',
      name: 'レザーアーマー',
      slot: 'armor',
      armorType: 'light',
      bonuses: { def: 5 },
    },
    equip_iron_armor: {
      id: 'equip_iron_armor',
      name: '鉄の鎧',
      slot: 'armor',
      armorType: 'heavy',
      bonuses: { def: 8 },
    },
    equip_cloth_robe: {
      id: 'equip_cloth_robe',
      name: '布のローブ',
      slot: 'armor',
      armorType: 'clothes',
      bonuses: { def: 2, mdf: 4 },
    },
  },
  N1 = {
    item_potion: { id: 'item_potion', name: 'やくそう', description: 'HP を少し回復する。' },
    item_tp_herb: { id: 'item_tp_herb', name: 'まほうのは', description: 'TP を少し回復する。' },
    item_return_thread: {
      id: 'item_return_thread',
      name: '帰還の糸',
      description: '使用すると拠点へ帰還する。',
    },
  },
  U1 = {
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
  jl = (i) => ({ hp: 0, tp: 0, str: 0, vit: 0, agi: 0, int: 0, mnd: 0, luc: 0, ...i }),
  j1 = {
    title_berserker: {
      id: 'title_berserker',
      name: '狂戦士',
      parentClassId: 'class_warrior',
      skillTree: { skills: [] },
      growthModifier: jl({ str: 1 }),
    },
    title_sentinel: {
      id: 'title_sentinel',
      name: '哨戒兵',
      parentClassId: 'class_warrior',
      skillTree: { skills: [] },
      growthModifier: jl({ vit: 1 }),
    },
    title_bulwark: {
      id: 'title_bulwark',
      name: '城壁',
      parentClassId: 'class_guardian',
      skillTree: { skills: [] },
      growthModifier: jl({ vit: 1, hp: 2 }),
    },
    title_vanguard: {
      id: 'title_vanguard',
      name: '先鋒',
      parentClassId: 'class_guardian',
      skillTree: { skills: [] },
      growthModifier: jl({ str: 1 }),
    },
    title_pyromancer: {
      id: 'title_pyromancer',
      name: '紅蓮術士',
      parentClassId: 'class_mage',
      skillTree: { skills: [] },
      growthModifier: jl({ int: 1 }),
    },
    title_sage: {
      id: 'title_sage',
      name: '賢者',
      parentClassId: 'class_mage',
      skillTree: { skills: [] },
      growthModifier: jl({ tp: 2, mnd: 1 }),
    },
    title_sniper: {
      id: 'title_sniper',
      name: '狙撃手',
      parentClassId: 'class_ranger',
      skillTree: { skills: [] },
      growthModifier: jl({ agi: 1, luc: 1 }),
    },
    title_tracker: {
      id: 'title_tracker',
      name: '追跡者',
      parentClassId: 'class_ranger',
      skillTree: { skills: [] },
      growthModifier: jl({ agi: 1 }),
    },
  },
  H1 = { races: Kn, classes: Vn, titles: j1, skills: U1, enemies: C1, items: N1, equipment: D1 },
  B1 = /^[a-z]+_[a-z0-9_]+$/;
function ea(i, s, r) {
  for (const f of s)
    B1.test(f) || r.push(`[${i}] ID 命名規約違反: "${f}"（期待: <domain>_<name>）`);
}
function is(i, s, r, f) {
  const d = new Set(s.skills.map((m) => m.skillId));
  for (const m of s.skills) {
    r.has(m.skillId) || f.push(`[${i}] 未定義スキルを参照: "${m.skillId}"`);
    for (const g of m.requires ?? [])
      d.has(g.skillId) ||
        f.push(`[${i}] スキル "${m.skillId}" の前提 "${g.skillId}" が同ツリーに存在しない`);
  }
}
function q1() {
  const i = [],
    { races: s, classes: r, titles: f, skills: d, enemies: m, items: g, equipment: R } = H1;
  (ea('races', Object.keys(s), i),
    ea('classes', Object.keys(r), i),
    ea('titles', Object.keys(f), i),
    ea('skills', Object.keys(d), i),
    ea('enemies', Object.keys(m), i),
    ea('items', Object.keys(g), i),
    ea('equipment', Object.keys(R), i));
  const p = (U, G) => {
    for (const [Z, L] of Object.entries(G))
      Z !== L.id && i.push(`[${U}] キー "${Z}" と id "${L.id}" が不一致`);
  };
  (p('races', s),
    p('classes', r),
    p('titles', f),
    p('skills', d),
    p('enemies', m),
    p('items', g),
    p('equipment', R));
  const y = new Set(Object.keys(d)),
    O = new Set(Object.keys(r)),
    T = new Set(Object.keys(f));
  for (const U of Object.values(s))
    (O.has(U.defaultClassId) ||
      i.push(`[races] "${U.id}" の defaultClassId "${U.defaultClassId}" が未定義`),
      is(`races/${U.id}`, U.unionSkillTree, y, i));
  for (const U of Object.values(r)) {
    is(`classes/${U.id}`, U.skillTree, y, i);
    for (const G of U.titleOptions) {
      if (!T.has(G)) {
        i.push(`[classes] "${U.id}" の称号 "${G}" が未定義`);
        continue;
      }
      f[G].parentClassId !== U.id &&
        i.push(`[classes] 称号 "${G}" の parentClassId が "${U.id}" と不一致`);
    }
  }
  for (const U of Object.values(f))
    (O.has(U.parentClassId) ||
      i.push(`[titles] "${U.id}" の parentClassId "${U.parentClassId}" が未定義`),
      is(`titles/${U.id}`, U.skillTree, y, i));
  for (const U of Object.values(R))
    (U.slot === 'weapon' &&
      !U.weaponType &&
      i.push(`[equipment] "${U.id}" は weapon だが weaponType が未設定`),
      U.slot === 'armor' &&
        !U.armorType &&
        i.push(`[equipment] "${U.id}" は armor だが armorType が未設定`));
  return { ok: i.length === 0, errors: i };
}
const Pm = q1();
Pm.ok || console.error('マスターデータ検証エラー:', Pm.errors);
const Ah = document.getElementById('root');
if (!Ah) throw new Error('Failed to find #root element');
a0.createRoot(Ah).render(
  M.jsx(Ap, { basename: '/sekaiju-like-game', children: M.jsx(gg, { children: M.jsx(M1, {}) }) })
);
