var Cg = Object.defineProperty;
var Mg = (a, c, o) =>
  c in a ? Cg(a, c, { enumerable: !0, configurable: !0, writable: !0, value: o }) : (a[c] = o);
var Ao = (a, c, o) => Mg(a, typeof c != 'symbol' ? c + '' : c, o);
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
var Co = { exports: {} },
  ru = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Eh;
function Rg() {
  if (Eh) return ru;
  Eh = 1;
  var a = Symbol.for('react.transitional.element'),
    c = Symbol.for('react.fragment');
  function o(s, r, d) {
    var p = null;
    if ((d !== void 0 && (p = '' + d), r.key !== void 0 && (p = '' + r.key), 'key' in r)) {
      d = {};
      for (var _ in r) _ !== 'key' && (d[_] = r[_]);
    } else d = r;
    return ((r = d.ref), { $$typeof: a, type: s, key: p, ref: r !== void 0 ? r : null, props: d });
  }
  return ((ru.Fragment = c), (ru.jsx = o), (ru.jsxs = o), ru);
}
var Th;
function jg() {
  return (Th || ((Th = 1), (Co.exports = Rg())), Co.exports);
}
var g = jg(),
  Mo = { exports: {} },
  fu = {},
  Ro = { exports: {} },
  jo = {};
/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Nh;
function zg() {
  return (
    Nh ||
      ((Nh = 1),
      (function (a) {
        function c(B, J) {
          var nt = B.length;
          B.push(J);
          t: for (; 0 < nt; ) {
            var St = (nt - 1) >>> 1,
              X = B[St];
            if (0 < r(X, J)) ((B[St] = J), (B[nt] = X), (nt = St));
            else break t;
          }
        }
        function o(B) {
          return B.length === 0 ? null : B[0];
        }
        function s(B) {
          if (B.length === 0) return null;
          var J = B[0],
            nt = B.pop();
          if (nt !== J) {
            B[0] = nt;
            t: for (var St = 0, X = B.length, S = X >>> 1; St < S; ) {
              var D = 2 * (St + 1) - 1,
                Z = B[D],
                I = D + 1,
                it = B[I];
              if (0 > r(Z, nt))
                I < X && 0 > r(it, Z)
                  ? ((B[St] = it), (B[I] = nt), (St = I))
                  : ((B[St] = Z), (B[D] = nt), (St = D));
              else if (I < X && 0 > r(it, nt)) ((B[St] = it), (B[I] = nt), (St = I));
              else break t;
            }
          }
          return J;
        }
        function r(B, J) {
          var nt = B.sortIndex - J.sortIndex;
          return nt !== 0 ? nt : B.id - J.id;
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
            _ = p.now();
          a.unstable_now = function () {
            return p.now() - _;
          };
        }
        var y = [],
          m = [],
          b = 1,
          v = null,
          E = 3,
          k = !1,
          j = !1,
          w = !1,
          q = !1,
          H = typeof setTimeout == 'function' ? setTimeout : null,
          Q = typeof clearTimeout == 'function' ? clearTimeout : null,
          z = typeof setImmediate < 'u' ? setImmediate : null;
        function Y(B) {
          for (var J = o(m); J !== null; ) {
            if (J.callback === null) s(m);
            else if (J.startTime <= B) (s(m), (J.sortIndex = J.expirationTime), c(y, J));
            else break;
            J = o(m);
          }
        }
        function $(B) {
          if (((w = !1), Y(B), !j))
            if (o(y) !== null) ((j = !0), W || ((W = !0), Nt()));
            else {
              var J = o(m);
              J !== null && Lt($, J.startTime - B);
            }
        }
        var W = !1,
          K = -1,
          V = 5,
          et = -1;
        function st() {
          return q ? !0 : !(a.unstable_now() - et < V);
        }
        function yt() {
          if (((q = !1), W)) {
            var B = a.unstable_now();
            et = B;
            var J = !0;
            try {
              t: {
                ((j = !1), w && ((w = !1), Q(K), (K = -1)), (k = !0));
                var nt = E;
                try {
                  e: {
                    for (Y(B), v = o(y); v !== null && !(v.expirationTime > B && st()); ) {
                      var St = v.callback;
                      if (typeof St == 'function') {
                        ((v.callback = null), (E = v.priorityLevel));
                        var X = St(v.expirationTime <= B);
                        if (((B = a.unstable_now()), typeof X == 'function')) {
                          ((v.callback = X), Y(B), (J = !0));
                          break e;
                        }
                        (v === o(y) && s(y), Y(B));
                      } else s(y);
                      v = o(y);
                    }
                    if (v !== null) J = !0;
                    else {
                      var S = o(m);
                      (S !== null && Lt($, S.startTime - B), (J = !1));
                    }
                  }
                  break t;
                } finally {
                  ((v = null), (E = nt), (k = !1));
                }
                J = void 0;
              }
            } finally {
              J ? Nt() : (W = !1);
            }
          }
        }
        var Nt;
        if (typeof z == 'function')
          Nt = function () {
            z(yt);
          };
        else if (typeof MessageChannel < 'u') {
          var Dt = new MessageChannel(),
            oe = Dt.port2;
          ((Dt.port1.onmessage = yt),
            (Nt = function () {
              oe.postMessage(null);
            }));
        } else
          Nt = function () {
            H(yt, 0);
          };
        function Lt(B, J) {
          K = H(function () {
            B(a.unstable_now());
          }, J);
        }
        ((a.unstable_IdlePriority = 5),
          (a.unstable_ImmediatePriority = 1),
          (a.unstable_LowPriority = 4),
          (a.unstable_NormalPriority = 3),
          (a.unstable_Profiling = null),
          (a.unstable_UserBlockingPriority = 2),
          (a.unstable_cancelCallback = function (B) {
            B.callback = null;
          }),
          (a.unstable_forceFrameRate = function (B) {
            0 > B || 125 < B
              ? console.error(
                  'forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported'
                )
              : (V = 0 < B ? Math.floor(1e3 / B) : 5);
          }),
          (a.unstable_getCurrentPriorityLevel = function () {
            return E;
          }),
          (a.unstable_next = function (B) {
            switch (E) {
              case 1:
              case 2:
              case 3:
                var J = 3;
                break;
              default:
                J = E;
            }
            var nt = E;
            E = J;
            try {
              return B();
            } finally {
              E = nt;
            }
          }),
          (a.unstable_requestPaint = function () {
            q = !0;
          }),
          (a.unstable_runWithPriority = function (B, J) {
            switch (B) {
              case 1:
              case 2:
              case 3:
              case 4:
              case 5:
                break;
              default:
                B = 3;
            }
            var nt = E;
            E = B;
            try {
              return J();
            } finally {
              E = nt;
            }
          }),
          (a.unstable_scheduleCallback = function (B, J, nt) {
            var St = a.unstable_now();
            switch (
              (typeof nt == 'object' && nt !== null
                ? ((nt = nt.delay), (nt = typeof nt == 'number' && 0 < nt ? St + nt : St))
                : (nt = St),
              B)
            ) {
              case 1:
                var X = -1;
                break;
              case 2:
                X = 250;
                break;
              case 5:
                X = 1073741823;
                break;
              case 4:
                X = 1e4;
                break;
              default:
                X = 5e3;
            }
            return (
              (X = nt + X),
              (B = {
                id: b++,
                callback: J,
                priorityLevel: B,
                startTime: nt,
                expirationTime: X,
                sortIndex: -1,
              }),
              nt > St
                ? ((B.sortIndex = nt),
                  c(m, B),
                  o(y) === null && B === o(m) && (w ? (Q(K), (K = -1)) : (w = !0), Lt($, nt - St)))
                : ((B.sortIndex = X), c(y, B), j || k || ((j = !0), W || ((W = !0), Nt()))),
              B
            );
          }),
          (a.unstable_shouldYield = st),
          (a.unstable_wrapCallback = function (B) {
            var J = E;
            return function () {
              var nt = E;
              E = J;
              try {
                return B.apply(this, arguments);
              } finally {
                E = nt;
              }
            };
          }));
      })(jo)),
    jo
  );
}
var Ah;
function Og() {
  return (Ah || ((Ah = 1), (Ro.exports = zg())), Ro.exports);
}
var zo = { exports: {} },
  ct = {};
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Ch;
function Dg() {
  if (Ch) return ct;
  Ch = 1;
  var a = Symbol.for('react.transitional.element'),
    c = Symbol.for('react.portal'),
    o = Symbol.for('react.fragment'),
    s = Symbol.for('react.strict_mode'),
    r = Symbol.for('react.profiler'),
    d = Symbol.for('react.consumer'),
    p = Symbol.for('react.context'),
    _ = Symbol.for('react.forward_ref'),
    y = Symbol.for('react.suspense'),
    m = Symbol.for('react.memo'),
    b = Symbol.for('react.lazy'),
    v = Symbol.for('react.activity'),
    E = Symbol.iterator;
  function k(S) {
    return S === null || typeof S != 'object'
      ? null
      : ((S = (E && S[E]) || S['@@iterator']), typeof S == 'function' ? S : null);
  }
  var j = {
      isMounted: function () {
        return !1;
      },
      enqueueForceUpdate: function () {},
      enqueueReplaceState: function () {},
      enqueueSetState: function () {},
    },
    w = Object.assign,
    q = {};
  function H(S, D, Z) {
    ((this.props = S), (this.context = D), (this.refs = q), (this.updater = Z || j));
  }
  ((H.prototype.isReactComponent = {}),
    (H.prototype.setState = function (S, D) {
      if (typeof S != 'object' && typeof S != 'function' && S != null)
        throw Error(
          'takes an object of state variables to update or a function which returns an object of state variables.'
        );
      this.updater.enqueueSetState(this, S, D, 'setState');
    }),
    (H.prototype.forceUpdate = function (S) {
      this.updater.enqueueForceUpdate(this, S, 'forceUpdate');
    }));
  function Q() {}
  Q.prototype = H.prototype;
  function z(S, D, Z) {
    ((this.props = S), (this.context = D), (this.refs = q), (this.updater = Z || j));
  }
  var Y = (z.prototype = new Q());
  ((Y.constructor = z), w(Y, H.prototype), (Y.isPureReactComponent = !0));
  var $ = Array.isArray;
  function W() {}
  var K = { H: null, A: null, T: null, S: null },
    V = Object.prototype.hasOwnProperty;
  function et(S, D, Z) {
    var I = Z.ref;
    return { $$typeof: a, type: S, key: D, ref: I !== void 0 ? I : null, props: Z };
  }
  function st(S, D) {
    return et(S.type, D, S.props);
  }
  function yt(S) {
    return typeof S == 'object' && S !== null && S.$$typeof === a;
  }
  function Nt(S) {
    var D = { '=': '=0', ':': '=2' };
    return (
      '$' +
      S.replace(/[=:]/g, function (Z) {
        return D[Z];
      })
    );
  }
  var Dt = /\/+/g;
  function oe(S, D) {
    return typeof S == 'object' && S !== null && S.key != null ? Nt('' + S.key) : D.toString(36);
  }
  function Lt(S) {
    switch (S.status) {
      case 'fulfilled':
        return S.value;
      case 'rejected':
        throw S.reason;
      default:
        switch (
          (typeof S.status == 'string'
            ? S.then(W, W)
            : ((S.status = 'pending'),
              S.then(
                function (D) {
                  S.status === 'pending' && ((S.status = 'fulfilled'), (S.value = D));
                },
                function (D) {
                  S.status === 'pending' && ((S.status = 'rejected'), (S.reason = D));
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
  function B(S, D, Z, I, it) {
    var ft = typeof S;
    (ft === 'undefined' || ft === 'boolean') && (S = null);
    var Et = !1;
    if (S === null) Et = !0;
    else
      switch (ft) {
        case 'bigint':
        case 'string':
        case 'number':
          Et = !0;
          break;
        case 'object':
          switch (S.$$typeof) {
            case a:
            case c:
              Et = !0;
              break;
            case b:
              return ((Et = S._init), B(Et(S._payload), D, Z, I, it));
          }
      }
    if (Et)
      return (
        (it = it(S)),
        (Et = I === '' ? '.' + oe(S, 0) : I),
        $(it)
          ? ((Z = ''),
            Et != null && (Z = Et.replace(Dt, '$&/') + '/'),
            B(it, D, Z, '', function (ga) {
              return ga;
            }))
          : it != null &&
            (yt(it) &&
              (it = st(
                it,
                Z +
                  (it.key == null || (S && S.key === it.key)
                    ? ''
                    : ('' + it.key).replace(Dt, '$&/') + '/') +
                  Et
              )),
            D.push(it)),
        1
      );
    Et = 0;
    var ie = I === '' ? '.' : I + ':';
    if ($(S))
      for (var Xt = 0; Xt < S.length; Xt++)
        ((I = S[Xt]), (ft = ie + oe(I, Xt)), (Et += B(I, D, Z, ft, it)));
    else if (((Xt = k(S)), typeof Xt == 'function'))
      for (S = Xt.call(S), Xt = 0; !(I = S.next()).done; )
        ((I = I.value), (ft = ie + oe(I, Xt++)), (Et += B(I, D, Z, ft, it)));
    else if (ft === 'object') {
      if (typeof S.then == 'function') return B(Lt(S), D, Z, I, it);
      throw (
        (D = String(S)),
        Error(
          'Objects are not valid as a React child (found: ' +
            (D === '[object Object]' ? 'object with keys {' + Object.keys(S).join(', ') + '}' : D) +
            '). If you meant to render a collection of children, use an array instead.'
        )
      );
    }
    return Et;
  }
  function J(S, D, Z) {
    if (S == null) return S;
    var I = [],
      it = 0;
    return (
      B(S, I, '', '', function (ft) {
        return D.call(Z, ft, it++);
      }),
      I
    );
  }
  function nt(S) {
    if (S._status === -1) {
      var D = S._result;
      ((D = D()),
        D.then(
          function (Z) {
            (S._status === 0 || S._status === -1) && ((S._status = 1), (S._result = Z));
          },
          function (Z) {
            (S._status === 0 || S._status === -1) && ((S._status = 2), (S._result = Z));
          }
        ),
        S._status === -1 && ((S._status = 0), (S._result = D)));
    }
    if (S._status === 1) return S._result.default;
    throw S._result;
  }
  var St =
      typeof reportError == 'function'
        ? reportError
        : function (S) {
            if (typeof window == 'object' && typeof window.ErrorEvent == 'function') {
              var D = new window.ErrorEvent('error', {
                bubbles: !0,
                cancelable: !0,
                message:
                  typeof S == 'object' && S !== null && typeof S.message == 'string'
                    ? String(S.message)
                    : String(S),
                error: S,
              });
              if (!window.dispatchEvent(D)) return;
            } else if (typeof process == 'object' && typeof process.emit == 'function') {
              process.emit('uncaughtException', S);
              return;
            }
            console.error(S);
          },
    X = {
      map: J,
      forEach: function (S, D, Z) {
        J(
          S,
          function () {
            D.apply(this, arguments);
          },
          Z
        );
      },
      count: function (S) {
        var D = 0;
        return (
          J(S, function () {
            D++;
          }),
          D
        );
      },
      toArray: function (S) {
        return (
          J(S, function (D) {
            return D;
          }) || []
        );
      },
      only: function (S) {
        if (!yt(S))
          throw Error('React.Children.only expected to receive a single React element child.');
        return S;
      },
    };
  return (
    (ct.Activity = v),
    (ct.Children = X),
    (ct.Component = H),
    (ct.Fragment = o),
    (ct.Profiler = r),
    (ct.PureComponent = z),
    (ct.StrictMode = s),
    (ct.Suspense = y),
    (ct.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = K),
    (ct.__COMPILER_RUNTIME = {
      __proto__: null,
      c: function (S) {
        return K.H.useMemoCache(S);
      },
    }),
    (ct.cache = function (S) {
      return function () {
        return S.apply(null, arguments);
      };
    }),
    (ct.cacheSignal = function () {
      return null;
    }),
    (ct.cloneElement = function (S, D, Z) {
      if (S == null) throw Error('The argument must be a React element, but you passed ' + S + '.');
      var I = w({}, S.props),
        it = S.key;
      if (D != null)
        for (ft in (D.key !== void 0 && (it = '' + D.key), D))
          !V.call(D, ft) ||
            ft === 'key' ||
            ft === '__self' ||
            ft === '__source' ||
            (ft === 'ref' && D.ref === void 0) ||
            (I[ft] = D[ft]);
      var ft = arguments.length - 2;
      if (ft === 1) I.children = Z;
      else if (1 < ft) {
        for (var Et = Array(ft), ie = 0; ie < ft; ie++) Et[ie] = arguments[ie + 2];
        I.children = Et;
      }
      return et(S.type, it, I);
    }),
    (ct.createContext = function (S) {
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
    (ct.createElement = function (S, D, Z) {
      var I,
        it = {},
        ft = null;
      if (D != null)
        for (I in (D.key !== void 0 && (ft = '' + D.key), D))
          V.call(D, I) && I !== 'key' && I !== '__self' && I !== '__source' && (it[I] = D[I]);
      var Et = arguments.length - 2;
      if (Et === 1) it.children = Z;
      else if (1 < Et) {
        for (var ie = Array(Et), Xt = 0; Xt < Et; Xt++) ie[Xt] = arguments[Xt + 2];
        it.children = ie;
      }
      if (S && S.defaultProps)
        for (I in ((Et = S.defaultProps), Et)) it[I] === void 0 && (it[I] = Et[I]);
      return et(S, ft, it);
    }),
    (ct.createRef = function () {
      return { current: null };
    }),
    (ct.forwardRef = function (S) {
      return { $$typeof: _, render: S };
    }),
    (ct.isValidElement = yt),
    (ct.lazy = function (S) {
      return { $$typeof: b, _payload: { _status: -1, _result: S }, _init: nt };
    }),
    (ct.memo = function (S, D) {
      return { $$typeof: m, type: S, compare: D === void 0 ? null : D };
    }),
    (ct.startTransition = function (S) {
      var D = K.T,
        Z = {};
      K.T = Z;
      try {
        var I = S(),
          it = K.S;
        (it !== null && it(Z, I),
          typeof I == 'object' && I !== null && typeof I.then == 'function' && I.then(W, St));
      } catch (ft) {
        St(ft);
      } finally {
        (D !== null && Z.types !== null && (D.types = Z.types), (K.T = D));
      }
    }),
    (ct.unstable_useCacheRefresh = function () {
      return K.H.useCacheRefresh();
    }),
    (ct.use = function (S) {
      return K.H.use(S);
    }),
    (ct.useActionState = function (S, D, Z) {
      return K.H.useActionState(S, D, Z);
    }),
    (ct.useCallback = function (S, D) {
      return K.H.useCallback(S, D);
    }),
    (ct.useContext = function (S) {
      return K.H.useContext(S);
    }),
    (ct.useDebugValue = function () {}),
    (ct.useDeferredValue = function (S, D) {
      return K.H.useDeferredValue(S, D);
    }),
    (ct.useEffect = function (S, D) {
      return K.H.useEffect(S, D);
    }),
    (ct.useEffectEvent = function (S) {
      return K.H.useEffectEvent(S);
    }),
    (ct.useId = function () {
      return K.H.useId();
    }),
    (ct.useImperativeHandle = function (S, D, Z) {
      return K.H.useImperativeHandle(S, D, Z);
    }),
    (ct.useInsertionEffect = function (S, D) {
      return K.H.useInsertionEffect(S, D);
    }),
    (ct.useLayoutEffect = function (S, D) {
      return K.H.useLayoutEffect(S, D);
    }),
    (ct.useMemo = function (S, D) {
      return K.H.useMemo(S, D);
    }),
    (ct.useOptimistic = function (S, D) {
      return K.H.useOptimistic(S, D);
    }),
    (ct.useReducer = function (S, D, Z) {
      return K.H.useReducer(S, D, Z);
    }),
    (ct.useRef = function (S) {
      return K.H.useRef(S);
    }),
    (ct.useState = function (S) {
      return K.H.useState(S);
    }),
    (ct.useSyncExternalStore = function (S, D, Z) {
      return K.H.useSyncExternalStore(S, D, Z);
    }),
    (ct.useTransition = function () {
      return K.H.useTransition();
    }),
    (ct.version = '19.2.5'),
    ct
  );
}
var Mh;
function er() {
  return (Mh || ((Mh = 1), (zo.exports = Dg())), zo.exports);
}
var Oo = { exports: {} },
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
function kg() {
  if (Rh) return ae;
  Rh = 1;
  var a = er();
  function c(y) {
    var m = 'https://react.dev/errors/' + y;
    if (1 < arguments.length) {
      m += '?args[]=' + encodeURIComponent(arguments[1]);
      for (var b = 2; b < arguments.length; b++) m += '&args[]=' + encodeURIComponent(arguments[b]);
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
  function d(y, m, b) {
    var v = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: r,
      key: v == null ? null : '' + v,
      children: y,
      containerInfo: m,
      implementation: b,
    };
  }
  var p = a.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function _(y, m) {
    if (y === 'font') return '';
    if (typeof m == 'string') return m === 'use-credentials' ? m : '';
  }
  return (
    (ae.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = s),
    (ae.createPortal = function (y, m) {
      var b = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
      if (!m || (m.nodeType !== 1 && m.nodeType !== 9 && m.nodeType !== 11)) throw Error(c(299));
      return d(y, m, null, b);
    }),
    (ae.flushSync = function (y) {
      var m = p.T,
        b = s.p;
      try {
        if (((p.T = null), (s.p = 2), y)) return y();
      } finally {
        ((p.T = m), (s.p = b), s.d.f());
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
        var b = m.as,
          v = _(b, m.crossOrigin),
          E = typeof m.integrity == 'string' ? m.integrity : void 0,
          k = typeof m.fetchPriority == 'string' ? m.fetchPriority : void 0;
        b === 'style'
          ? s.d.S(y, typeof m.precedence == 'string' ? m.precedence : void 0, {
              crossOrigin: v,
              integrity: E,
              fetchPriority: k,
            })
          : b === 'script' &&
            s.d.X(y, {
              crossOrigin: v,
              integrity: E,
              fetchPriority: k,
              nonce: typeof m.nonce == 'string' ? m.nonce : void 0,
            });
      }
    }),
    (ae.preinitModule = function (y, m) {
      if (typeof y == 'string')
        if (typeof m == 'object' && m !== null) {
          if (m.as == null || m.as === 'script') {
            var b = _(m.as, m.crossOrigin);
            s.d.M(y, {
              crossOrigin: b,
              integrity: typeof m.integrity == 'string' ? m.integrity : void 0,
              nonce: typeof m.nonce == 'string' ? m.nonce : void 0,
            });
          }
        } else m == null && s.d.M(y);
    }),
    (ae.preload = function (y, m) {
      if (typeof y == 'string' && typeof m == 'object' && m !== null && typeof m.as == 'string') {
        var b = m.as,
          v = _(b, m.crossOrigin);
        s.d.L(y, b, {
          crossOrigin: v,
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
          var b = _(m.as, m.crossOrigin);
          s.d.m(y, {
            as: typeof m.as == 'string' && m.as !== 'script' ? m.as : void 0,
            crossOrigin: b,
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
    (ae.useFormState = function (y, m, b) {
      return p.H.useFormState(y, m, b);
    }),
    (ae.useFormStatus = function () {
      return p.H.useHostTransitionStatus();
    }),
    (ae.version = '19.2.5'),
    ae
  );
}
var jh;
function wg() {
  if (jh) return Oo.exports;
  jh = 1;
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
  return (a(), (Oo.exports = kg()), Oo.exports);
}
/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var zh;
function Ug() {
  if (zh) return fu;
  zh = 1;
  var a = Og(),
    c = er(),
    o = wg();
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
  function _(t) {
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
          if (i === l) return (y(u), t);
          if (i === n) return (y(u), e);
          i = i.sibling;
        }
        throw Error(s(188));
      }
      if (l.return !== n.return) ((l = u), (n = i));
      else {
        for (var f = !1, h = u.child; h; ) {
          if (h === l) {
            ((f = !0), (l = u), (n = i));
            break;
          }
          if (h === n) {
            ((f = !0), (n = u), (l = i));
            break;
          }
          h = h.sibling;
        }
        if (!f) {
          for (h = i.child; h; ) {
            if (h === l) {
              ((f = !0), (l = i), (n = u));
              break;
            }
            if (h === n) {
              ((f = !0), (n = i), (l = u));
              break;
            }
            h = h.sibling;
          }
          if (!f) throw Error(s(189));
        }
      }
      if (l.alternate !== n) throw Error(s(190));
    }
    if (l.tag !== 3) throw Error(s(188));
    return l.stateNode.current === l ? t : e;
  }
  function b(t) {
    var e = t.tag;
    if (e === 5 || e === 26 || e === 27 || e === 6) return t;
    for (t = t.child; t !== null; ) {
      if (((e = b(t)), e !== null)) return e;
      t = t.sibling;
    }
    return null;
  }
  var v = Object.assign,
    E = Symbol.for('react.element'),
    k = Symbol.for('react.transitional.element'),
    j = Symbol.for('react.portal'),
    w = Symbol.for('react.fragment'),
    q = Symbol.for('react.strict_mode'),
    H = Symbol.for('react.profiler'),
    Q = Symbol.for('react.consumer'),
    z = Symbol.for('react.context'),
    Y = Symbol.for('react.forward_ref'),
    $ = Symbol.for('react.suspense'),
    W = Symbol.for('react.suspense_list'),
    K = Symbol.for('react.memo'),
    V = Symbol.for('react.lazy'),
    et = Symbol.for('react.activity'),
    st = Symbol.for('react.memo_cache_sentinel'),
    yt = Symbol.iterator;
  function Nt(t) {
    return t === null || typeof t != 'object'
      ? null
      : ((t = (yt && t[yt]) || t['@@iterator']), typeof t == 'function' ? t : null);
  }
  var Dt = Symbol.for('react.client.reference');
  function oe(t) {
    if (t == null) return null;
    if (typeof t == 'function') return t.$$typeof === Dt ? null : t.displayName || t.name || null;
    if (typeof t == 'string') return t;
    switch (t) {
      case w:
        return 'Fragment';
      case H:
        return 'Profiler';
      case q:
        return 'StrictMode';
      case $:
        return 'Suspense';
      case W:
        return 'SuspenseList';
      case et:
        return 'Activity';
    }
    if (typeof t == 'object')
      switch (t.$$typeof) {
        case j:
          return 'Portal';
        case z:
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
        case K:
          return ((e = t.displayName || null), e !== null ? e : oe(t.type) || 'Memo');
        case V:
          ((e = t._payload), (t = t._init));
          try {
            return oe(t(e));
          } catch {}
      }
    return null;
  }
  var Lt = Array.isArray,
    B = c.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
    J = o.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
    nt = { pending: !1, data: null, method: null, action: null },
    St = [],
    X = -1;
  function S(t) {
    return { current: t };
  }
  function D(t) {
    0 > X || ((t.current = St[X]), (St[X] = null), X--);
  }
  function Z(t, e) {
    (X++, (St[X] = t.current), (t.current = e));
  }
  var I = S(null),
    it = S(null),
    ft = S(null),
    Et = S(null);
  function ie(t, e) {
    switch ((Z(ft, e), Z(it, t), Z(I, null), e.nodeType)) {
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
    (D(I), Z(I, t));
  }
  function Xt() {
    (D(I), D(it), D(ft));
  }
  function ga(t) {
    t.memoizedState !== null && Z(Et, t);
    var e = I.current,
      l = Km(e, t.type);
    e !== l && (Z(it, t), Z(I, l));
  }
  function Nu(t) {
    (it.current === t && (D(I), D(it)), Et.current === t && (D(Et), (iu._currentValue = nt)));
  }
  var cc, Sr;
  function Wl(t) {
    if (cc === void 0)
      try {
        throw Error();
      } catch (l) {
        var e = l.stack.trim().match(/\n( *(at )?)/);
        ((cc = (e && e[1]) || ''),
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
      cc +
      t +
      Sr
    );
  }
  var sc = !1;
  function oc(t, e) {
    if (!t || sc) return '';
    sc = !0;
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
                } catch (O) {
                  var R = O;
                }
                Reflect.construct(t, [], G);
              } else {
                try {
                  G.call();
                } catch (O) {
                  R = O;
                }
                t.call(G.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (O) {
                R = O;
              }
              (G = t()) && typeof G.catch == 'function' && G.catch(function () {});
            }
          } catch (O) {
            if (O && R && typeof O.stack == 'string') return [O.stack, R.stack];
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
        h = i[1];
      if (f && h) {
        var x = f.split(`
`),
          M = h.split(`
`);
        for (u = n = 0; n < x.length && !x[n].includes('DetermineComponentFrameRoot'); ) n++;
        for (; u < M.length && !M[u].includes('DetermineComponentFrameRoot'); ) u++;
        if (n === x.length || u === M.length)
          for (n = x.length - 1, u = M.length - 1; 1 <= n && 0 <= u && x[n] !== M[u]; ) u--;
        for (; 1 <= n && 0 <= u; n--, u--)
          if (x[n] !== M[u]) {
            if (n !== 1 || u !== 1)
              do
                if ((n--, u--, 0 > u || x[n] !== M[u])) {
                  var U =
                    `
` + x[n].replace(' at new ', ' at ');
                  return (
                    t.displayName &&
                      U.includes('<anonymous>') &&
                      (U = U.replace('<anonymous>', t.displayName)),
                    U
                  );
                }
              while (1 <= n && 0 <= u);
            break;
          }
      }
    } finally {
      ((sc = !1), (Error.prepareStackTrace = l));
    }
    return (l = t ? t.displayName || t.name : '') ? Wl(l) : '';
  }
  function ay(t, e) {
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
        return oc(t.type, !1);
      case 11:
        return oc(t.type.render, !1);
      case 1:
        return oc(t.type, !0);
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
      do ((e += ay(t, l)), (l = t), (t = t.return));
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
  var rc = Object.prototype.hasOwnProperty,
    fc = a.unstable_scheduleCallback,
    dc = a.unstable_cancelCallback,
    uy = a.unstable_shouldYield,
    iy = a.unstable_requestPaint,
    ge = a.unstable_now,
    cy = a.unstable_getCurrentPriorityLevel,
    Er = a.unstable_ImmediatePriority,
    Tr = a.unstable_UserBlockingPriority,
    Au = a.unstable_NormalPriority,
    sy = a.unstable_LowPriority,
    Nr = a.unstable_IdlePriority,
    oy = a.log,
    ry = a.unstable_setDisableYieldValue,
    va = null,
    ve = null;
  function xl(t) {
    if ((typeof oy == 'function' && ry(t), ve && typeof ve.setStrictMode == 'function'))
      try {
        ve.setStrictMode(va, t);
      } catch {}
  }
  var _e = Math.clz32 ? Math.clz32 : my,
    fy = Math.log,
    dy = Math.LN2;
  function my(t) {
    return ((t >>>= 0), t === 0 ? 32 : (31 - ((fy(t) / dy) | 0)) | 0);
  }
  var Cu = 256,
    Mu = 262144,
    Ru = 4194304;
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
  function ju(t, e, l) {
    var n = t.pendingLanes;
    if (n === 0) return 0;
    var u = 0,
      i = t.suspendedLanes,
      f = t.pingedLanes;
    t = t.warmLanes;
    var h = n & 134217727;
    return (
      h !== 0
        ? ((n = h & ~i),
          n !== 0
            ? (u = Fl(n))
            : ((f &= h), f !== 0 ? (u = Fl(f)) : l || ((l = h & ~t), l !== 0 && (u = Fl(l)))))
        : ((h = n & ~i),
          h !== 0
            ? (u = Fl(h))
            : f !== 0
              ? (u = Fl(f))
              : l || ((l = n & ~t), l !== 0 && (u = Fl(l)))),
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
  function _a(t, e) {
    return (t.pendingLanes & ~(t.suspendedLanes & ~t.pingedLanes) & e) === 0;
  }
  function hy(t, e) {
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
    var t = Ru;
    return ((Ru <<= 1), (Ru & 62914560) === 0 && (Ru = 4194304), t);
  }
  function mc(t) {
    for (var e = [], l = 0; 31 > l; l++) e.push(t);
    return e;
  }
  function ba(t, e) {
    ((t.pendingLanes |= e),
      e !== 268435456 && ((t.suspendedLanes = 0), (t.pingedLanes = 0), (t.warmLanes = 0)));
  }
  function py(t, e, l, n, u, i) {
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
      x = t.expirationTimes,
      M = t.hiddenUpdates;
    for (l = f & ~l; 0 < l; ) {
      var U = 31 - _e(l),
        G = 1 << U;
      ((h[U] = 0), (x[U] = -1));
      var R = M[U];
      if (R !== null)
        for (M[U] = null, U = 0; U < R.length; U++) {
          var O = R[U];
          O !== null && (O.lane &= -536870913);
        }
      l &= ~G;
    }
    (n !== 0 && Cr(t, n, 0),
      i !== 0 && u === 0 && t.tag !== 0 && (t.suspendedLanes |= i & ~(f & ~e)));
  }
  function Cr(t, e, l) {
    ((t.pendingLanes |= e), (t.suspendedLanes &= ~e));
    var n = 31 - _e(e);
    ((t.entangledLanes |= e),
      (t.entanglements[n] = t.entanglements[n] | 1073741824 | (l & 261930)));
  }
  function Mr(t, e) {
    var l = (t.entangledLanes |= e);
    for (t = t.entanglements; l; ) {
      var n = 31 - _e(l),
        u = 1 << n;
      ((u & e) | (t[n] & e) && (t[n] |= e), (l &= ~u));
    }
  }
  function Rr(t, e) {
    var l = e & -e;
    return ((l = (l & 42) !== 0 ? 1 : hc(l)), (l & (t.suspendedLanes | e)) !== 0 ? 0 : l);
  }
  function hc(t) {
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
  function pc(t) {
    return ((t &= -t), 2 < t ? (8 < t ? ((t & 134217727) !== 0 ? 32 : 268435456) : 8) : 2);
  }
  function jr() {
    var t = J.p;
    return t !== 0 ? t : ((t = window.event), t === void 0 ? 32 : yh(t.type));
  }
  function zr(t, e) {
    var l = J.p;
    try {
      return ((J.p = t), e());
    } finally {
      J.p = l;
    }
  }
  var El = Math.random().toString(36).slice(2),
    Pt = '__reactFiber$' + El,
    re = '__reactProps$' + El,
    Sn = '__reactContainer$' + El,
    yc = '__reactEvents$' + El,
    yy = '__reactListeners$' + El,
    gy = '__reactHandles$' + El,
    Or = '__reactResources$' + El,
    Sa = '__reactMarker$' + El;
  function gc(t) {
    (delete t[Pt], delete t[re], delete t[yc], delete t[yy], delete t[gy]);
  }
  function xn(t) {
    var e = t[Pt];
    if (e) return e;
    for (var l = t.parentNode; l; ) {
      if ((e = l[Sn] || l[Pt])) {
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
  function En(t) {
    if ((t = t[Pt] || t[Sn])) {
      var e = t.tag;
      if (e === 5 || e === 6 || e === 13 || e === 31 || e === 26 || e === 27 || e === 3) return t;
    }
    return null;
  }
  function xa(t) {
    var e = t.tag;
    if (e === 5 || e === 26 || e === 27 || e === 6) return t.stateNode;
    throw Error(s(33));
  }
  function Tn(t) {
    var e = t[Or];
    return (e || (e = t[Or] = { hoistableStyles: new Map(), hoistableScripts: new Map() }), e);
  }
  function Wt(t) {
    t[Sa] = !0;
  }
  var Dr = new Set(),
    kr = {};
  function Pl(t, e) {
    (Nn(t, e), Nn(t + 'Capture', e));
  }
  function Nn(t, e) {
    for (kr[t] = e, t = 0; t < e.length; t++) Dr.add(e[t]);
  }
  var vy = RegExp(
      '^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$'
    ),
    wr = {},
    Ur = {};
  function _y(t) {
    return rc.call(Ur, t)
      ? !0
      : rc.call(wr, t)
        ? !1
        : vy.test(t)
          ? (Ur[t] = !0)
          : ((wr[t] = !0), !1);
  }
  function zu(t, e, l) {
    if (_y(e))
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
  function Ou(t, e, l) {
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
  function Pe(t, e, l, n) {
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
  function Re(t) {
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
  function Br(t) {
    var e = t.type;
    return (t = t.nodeName) && t.toLowerCase() === 'input' && (e === 'checkbox' || e === 'radio');
  }
  function by(t, e, l) {
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
  function vc(t) {
    if (!t._valueTracker) {
      var e = Br(t) ? 'checked' : 'value';
      t._valueTracker = by(t, e, '' + t[e]);
    }
  }
  function Lr(t) {
    if (!t) return !1;
    var e = t._valueTracker;
    if (!e) return !0;
    var l = e.getValue(),
      n = '';
    return (
      t && (n = Br(t) ? (t.checked ? 'true' : 'false') : t.value),
      (t = n),
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
  var Sy = /[\n"\\]/g;
  function je(t) {
    return t.replace(Sy, function (e) {
      return '\\' + e.charCodeAt(0).toString(16) + ' ';
    });
  }
  function _c(t, e, l, n, u, i, f, h) {
    ((t.name = ''),
      f != null && typeof f != 'function' && typeof f != 'symbol' && typeof f != 'boolean'
        ? (t.type = f)
        : t.removeAttribute('type'),
      e != null
        ? f === 'number'
          ? ((e === 0 && t.value === '') || t.value != e) && (t.value = '' + Re(e))
          : t.value !== '' + Re(e) && (t.value = '' + Re(e))
        : (f !== 'submit' && f !== 'reset') || t.removeAttribute('value'),
      e != null
        ? bc(t, f, Re(e))
        : l != null
          ? bc(t, f, Re(l))
          : n != null && t.removeAttribute('value'),
      u == null && i != null && (t.defaultChecked = !!i),
      u != null && (t.checked = u && typeof u != 'function' && typeof u != 'symbol'),
      h != null && typeof h != 'function' && typeof h != 'symbol' && typeof h != 'boolean'
        ? (t.name = '' + Re(h))
        : t.removeAttribute('name'));
  }
  function Hr(t, e, l, n, u, i, f, h) {
    if (
      (i != null &&
        typeof i != 'function' &&
        typeof i != 'symbol' &&
        typeof i != 'boolean' &&
        (t.type = i),
      e != null || l != null)
    ) {
      if (!((i !== 'submit' && i !== 'reset') || e != null)) {
        vc(t);
        return;
      }
      ((l = l != null ? '' + Re(l) : ''),
        (e = e != null ? '' + Re(e) : l),
        h || e === t.value || (t.value = e),
        (t.defaultValue = e));
    }
    ((n = n ?? u),
      (n = typeof n != 'function' && typeof n != 'symbol' && !!n),
      (t.checked = h ? t.checked : !!n),
      (t.defaultChecked = !!n),
      f != null &&
        typeof f != 'function' &&
        typeof f != 'symbol' &&
        typeof f != 'boolean' &&
        (t.name = f),
      vc(t));
  }
  function bc(t, e, l) {
    (e === 'number' && Du(t.ownerDocument) === t) ||
      t.defaultValue === '' + l ||
      (t.defaultValue = '' + l);
  }
  function An(t, e, l, n) {
    if (((t = t.options), e)) {
      e = {};
      for (var u = 0; u < l.length; u++) e['$' + l[u]] = !0;
      for (l = 0; l < t.length; l++)
        ((u = e.hasOwnProperty('$' + t[l].value)),
          t[l].selected !== u && (t[l].selected = u),
          u && n && (t[l].defaultSelected = !0));
    } else {
      for (l = '' + Re(l), e = null, u = 0; u < t.length; u++) {
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
    if (e != null && ((e = '' + Re(e)), e !== t.value && (t.value = e), l == null)) {
      t.defaultValue !== e && (t.defaultValue = e);
      return;
    }
    t.defaultValue = l != null ? '' + Re(l) : '';
  }
  function Gr(t, e, l, n) {
    if (e == null) {
      if (n != null) {
        if (l != null) throw Error(s(92));
        if (Lt(n)) {
          if (1 < n.length) throw Error(s(93));
          n = n[0];
        }
        l = n;
      }
      (l == null && (l = ''), (e = l));
    }
    ((l = Re(e)),
      (t.defaultValue = l),
      (n = t.textContent),
      n === l && n !== '' && n !== null && (t.value = n),
      vc(t));
  }
  function Cn(t, e) {
    if (e) {
      var l = t.firstChild;
      if (l && l === t.lastChild && l.nodeType === 3) {
        l.nodeValue = e;
        return;
      }
    }
    t.textContent = e;
  }
  var xy = new Set(
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
        : typeof l != 'number' || l === 0 || xy.has(e)
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
  function Sc(t) {
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
  var Ey = new Map([
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
    Ty =
      /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function ku(t) {
    return Ty.test('' + t)
      ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')"
      : t;
  }
  function tl() {}
  var xc = null;
  function Ec(t) {
    return (
      (t = t.target || t.srcElement || window),
      t.correspondingUseElement && (t = t.correspondingUseElement),
      t.nodeType === 3 ? t.parentNode : t
    );
  }
  var Mn = null,
    Rn = null;
  function Vr(t) {
    var e = En(t);
    if (e && (t = e.stateNode)) {
      var l = t[re] || null;
      t: switch (((t = e.stateNode), e.type)) {
        case 'input':
          if (
            (_c(
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
              l = l.querySelectorAll('input[name="' + je('' + e) + '"][type="radio"]'), e = 0;
              e < l.length;
              e++
            ) {
              var n = l[e];
              if (n !== t && n.form === t.form) {
                var u = n[re] || null;
                if (!u) throw Error(s(90));
                _c(
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
          ((e = l.value), e != null && An(t, !!l.multiple, e, !1));
      }
    }
  }
  var Tc = !1;
  function Qr(t, e, l) {
    if (Tc) return t(e, l);
    Tc = !0;
    try {
      var n = t(e);
      return n;
    } finally {
      if (
        ((Tc = !1),
        (Mn !== null || Rn !== null) &&
          (Si(), Mn && ((e = Mn), (t = Rn), (Rn = Mn = null), Vr(e), t)))
      )
        for (e = 0; e < t.length; e++) Vr(t[e]);
    }
  }
  function Ea(t, e) {
    var l = t.stateNode;
    if (l === null) return null;
    var n = l[re] || null;
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
  var el = !(
      typeof window > 'u' ||
      typeof window.document > 'u' ||
      typeof window.document.createElement > 'u'
    ),
    Nc = !1;
  if (el)
    try {
      var Ta = {};
      (Object.defineProperty(Ta, 'passive', {
        get: function () {
          Nc = !0;
        },
      }),
        window.addEventListener('test', Ta, Ta),
        window.removeEventListener('test', Ta, Ta));
    } catch {
      Nc = !1;
    }
  var Tl = null,
    Ac = null,
    wu = null;
  function Zr() {
    if (wu) return wu;
    var t,
      e = Ac,
      l = e.length,
      n,
      u = 'value' in Tl ? Tl.value : Tl.textContent,
      i = u.length;
    for (t = 0; t < l && e[t] === u[t]; t++);
    var f = l - t;
    for (n = 1; n <= f && e[l - n] === u[i - n]; n++);
    return (wu = u.slice(t, 1 < n ? 1 - n : void 0));
  }
  function Uu(t) {
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
  function fe(t) {
    function e(l, n, u, i, f) {
      ((this._reactName = l),
        (this._targetInst = u),
        (this.type = n),
        (this.nativeEvent = i),
        (this.target = f),
        (this.currentTarget = null));
      for (var h in t) t.hasOwnProperty(h) && ((l = t[h]), (this[h] = l ? l(i) : i[h]));
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
      v(e.prototype, {
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
  var tn = {
      eventPhase: 0,
      bubbles: 0,
      cancelable: 0,
      timeStamp: function (t) {
        return t.timeStamp || Date.now();
      },
      defaultPrevented: 0,
      isTrusted: 0,
    },
    Lu = fe(tn),
    Na = v({}, tn, { view: 0, detail: 0 }),
    Ny = fe(Na),
    Cc,
    Mc,
    Aa,
    Hu = v({}, Na, {
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
      getModifierState: jc,
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
          : (t !== Aa &&
              (Aa && t.type === 'mousemove'
                ? ((Cc = t.screenX - Aa.screenX), (Mc = t.screenY - Aa.screenY))
                : (Mc = Cc = 0),
              (Aa = t)),
            Cc);
      },
      movementY: function (t) {
        return 'movementY' in t ? t.movementY : Mc;
      },
    }),
    $r = fe(Hu),
    Ay = v({}, Hu, { dataTransfer: 0 }),
    Cy = fe(Ay),
    My = v({}, Na, { relatedTarget: 0 }),
    Rc = fe(My),
    Ry = v({}, tn, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
    jy = fe(Ry),
    zy = v({}, tn, {
      clipboardData: function (t) {
        return 'clipboardData' in t ? t.clipboardData : window.clipboardData;
      },
    }),
    Oy = fe(zy),
    Dy = v({}, tn, { data: 0 }),
    Jr = fe(Dy),
    ky = {
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
    wy = {
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
    Uy = { Alt: 'altKey', Control: 'ctrlKey', Meta: 'metaKey', Shift: 'shiftKey' };
  function By(t) {
    var e = this.nativeEvent;
    return e.getModifierState ? e.getModifierState(t) : (t = Uy[t]) ? !!e[t] : !1;
  }
  function jc() {
    return By;
  }
  var Ly = v({}, Na, {
      key: function (t) {
        if (t.key) {
          var e = ky[t.key] || t.key;
          if (e !== 'Unidentified') return e;
        }
        return t.type === 'keypress'
          ? ((t = Uu(t)), t === 13 ? 'Enter' : String.fromCharCode(t))
          : t.type === 'keydown' || t.type === 'keyup'
            ? wy[t.keyCode] || 'Unidentified'
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
      getModifierState: jc,
      charCode: function (t) {
        return t.type === 'keypress' ? Uu(t) : 0;
      },
      keyCode: function (t) {
        return t.type === 'keydown' || t.type === 'keyup' ? t.keyCode : 0;
      },
      which: function (t) {
        return t.type === 'keypress'
          ? Uu(t)
          : t.type === 'keydown' || t.type === 'keyup'
            ? t.keyCode
            : 0;
      },
    }),
    Hy = fe(Ly),
    qy = v({}, Hu, {
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
    Ir = fe(qy),
    Gy = v({}, Na, {
      touches: 0,
      targetTouches: 0,
      changedTouches: 0,
      altKey: 0,
      metaKey: 0,
      ctrlKey: 0,
      shiftKey: 0,
      getModifierState: jc,
    }),
    Yy = fe(Gy),
    Xy = v({}, tn, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
    Vy = fe(Xy),
    Qy = v({}, Hu, {
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
    Zy = fe(Qy),
    Ky = v({}, tn, { newState: 0, oldState: 0 }),
    $y = fe(Ky),
    Jy = [9, 13, 27, 32],
    zc = el && 'CompositionEvent' in window,
    Ca = null;
  el && 'documentMode' in document && (Ca = document.documentMode);
  var Iy = el && 'TextEvent' in window && !Ca,
    Wr = el && (!zc || (Ca && 8 < Ca && 11 >= Ca)),
    Fr = ' ',
    Pr = !1;
  function tf(t, e) {
    switch (t) {
      case 'keyup':
        return Jy.indexOf(e.keyCode) !== -1;
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
  var jn = !1;
  function Wy(t, e) {
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
  function Fy(t, e) {
    if (jn)
      return t === 'compositionend' || (!zc && tf(t, e))
        ? ((t = Zr()), (wu = Ac = Tl = null), (jn = !1), t)
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
        return Wr && e.locale !== 'ko' ? null : e.data;
      default:
        return null;
    }
  }
  var Py = {
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
    return e === 'input' ? !!Py[t.type] : e === 'textarea';
  }
  function nf(t, e, l, n) {
    (Mn ? (Rn ? Rn.push(n) : (Rn = [n])) : (Mn = n),
      (e = Mi(e, 'onChange')),
      0 < e.length &&
        ((l = new Lu('onChange', 'change', null, l, n)), t.push({ event: l, listeners: e })));
  }
  var Ma = null,
    Ra = null;
  function t0(t) {
    qm(t, 0);
  }
  function qu(t) {
    var e = xa(t);
    if (Lr(e)) return t;
  }
  function af(t, e) {
    if (t === 'change') return e;
  }
  var uf = !1;
  if (el) {
    var Oc;
    if (el) {
      var Dc = 'oninput' in document;
      if (!Dc) {
        var cf = document.createElement('div');
        (cf.setAttribute('oninput', 'return;'), (Dc = typeof cf.oninput == 'function'));
      }
      Oc = Dc;
    } else Oc = !1;
    uf = Oc && (!document.documentMode || 9 < document.documentMode);
  }
  function sf() {
    Ma && (Ma.detachEvent('onpropertychange', of), (Ra = Ma = null));
  }
  function of(t) {
    if (t.propertyName === 'value' && qu(Ra)) {
      var e = [];
      (nf(e, Ra, t, Ec(t)), Qr(t0, e));
    }
  }
  function e0(t, e, l) {
    t === 'focusin'
      ? (sf(), (Ma = e), (Ra = l), Ma.attachEvent('onpropertychange', of))
      : t === 'focusout' && sf();
  }
  function l0(t) {
    if (t === 'selectionchange' || t === 'keyup' || t === 'keydown') return qu(Ra);
  }
  function n0(t, e) {
    if (t === 'click') return qu(e);
  }
  function a0(t, e) {
    if (t === 'input' || t === 'change') return qu(e);
  }
  function u0(t, e) {
    return (t === e && (t !== 0 || 1 / t === 1 / e)) || (t !== t && e !== e);
  }
  var be = typeof Object.is == 'function' ? Object.is : u0;
  function ja(t, e) {
    if (be(t, e)) return !0;
    if (typeof t != 'object' || t === null || typeof e != 'object' || e === null) return !1;
    var l = Object.keys(t),
      n = Object.keys(e);
    if (l.length !== n.length) return !1;
    for (n = 0; n < l.length; n++) {
      var u = l[n];
      if (!rc.call(e, u) || !be(t[u], e[u])) return !1;
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
  function kc(t) {
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
  var i0 = el && 'documentMode' in document && 11 >= document.documentMode,
    zn = null,
    wc = null,
    za = null,
    Uc = !1;
  function hf(t, e, l) {
    var n = l.window === l ? l.document : l.nodeType === 9 ? l : l.ownerDocument;
    Uc ||
      zn == null ||
      zn !== Du(n) ||
      ((n = zn),
      'selectionStart' in n && kc(n)
        ? (n = { start: n.selectionStart, end: n.selectionEnd })
        : ((n = ((n.ownerDocument && n.ownerDocument.defaultView) || window).getSelection()),
          (n = {
            anchorNode: n.anchorNode,
            anchorOffset: n.anchorOffset,
            focusNode: n.focusNode,
            focusOffset: n.focusOffset,
          })),
      (za && ja(za, n)) ||
        ((za = n),
        (n = Mi(wc, 'onSelect')),
        0 < n.length &&
          ((e = new Lu('onSelect', 'select', null, e, l)),
          t.push({ event: e, listeners: n }),
          (e.target = zn))));
  }
  function en(t, e) {
    var l = {};
    return (
      (l[t.toLowerCase()] = e.toLowerCase()),
      (l['Webkit' + t] = 'webkit' + e),
      (l['Moz' + t] = 'moz' + e),
      l
    );
  }
  var On = {
      animationend: en('Animation', 'AnimationEnd'),
      animationiteration: en('Animation', 'AnimationIteration'),
      animationstart: en('Animation', 'AnimationStart'),
      transitionrun: en('Transition', 'TransitionRun'),
      transitionstart: en('Transition', 'TransitionStart'),
      transitioncancel: en('Transition', 'TransitionCancel'),
      transitionend: en('Transition', 'TransitionEnd'),
    },
    Bc = {},
    pf = {};
  el &&
    ((pf = document.createElement('div').style),
    'AnimationEvent' in window ||
      (delete On.animationend.animation,
      delete On.animationiteration.animation,
      delete On.animationstart.animation),
    'TransitionEvent' in window || delete On.transitionend.transition);
  function ln(t) {
    if (Bc[t]) return Bc[t];
    if (!On[t]) return t;
    var e = On[t],
      l;
    for (l in e) if (e.hasOwnProperty(l) && l in pf) return (Bc[t] = e[l]);
    return t;
  }
  var yf = ln('animationend'),
    gf = ln('animationiteration'),
    vf = ln('animationstart'),
    c0 = ln('transitionrun'),
    s0 = ln('transitionstart'),
    o0 = ln('transitioncancel'),
    _f = ln('transitionend'),
    bf = new Map(),
    Lc =
      'abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel'.split(
        ' '
      );
  Lc.push('scrollEnd');
  function qe(t, e) {
    (bf.set(t, e), Pl(e, [t]));
  }
  var Gu =
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
    Dn = 0,
    Hc = 0;
  function Yu() {
    for (var t = Dn, e = (Hc = Dn = 0); e < t; ) {
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
  function Xu(t, e, l, n) {
    ((ze[Dn++] = t),
      (ze[Dn++] = e),
      (ze[Dn++] = l),
      (ze[Dn++] = n),
      (Hc |= n),
      (t.lanes |= n),
      (t = t.alternate),
      t !== null && (t.lanes |= n));
  }
  function qc(t, e, l, n) {
    return (Xu(t, e, l, n), Vu(t));
  }
  function nn(t, e) {
    return (Xu(t, null, null, e), Vu(t));
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
          ((u = 31 - _e(l)),
          (t = i.hiddenUpdates),
          (n = t[u]),
          n === null ? (t[u] = [e]) : n.push(e),
          (e.lane = l | 536870912)),
        i)
      : null;
  }
  function Vu(t) {
    if (50 < Pa) throw ((Pa = 0), (Js = null), Error(s(185)));
    for (var e = t.return; e !== null; ) ((t = e), (e = t.return));
    return t.tag === 3 ? t.stateNode : null;
  }
  var kn = {};
  function r0(t, e, l, n) {
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
  function Se(t, e, l, n) {
    return new r0(t, e, l, n);
  }
  function Gc(t) {
    return ((t = t.prototype), !(!t || !t.isReactComponent));
  }
  function ll(t, e) {
    var l = t.alternate;
    return (
      l === null
        ? ((l = Se(t.tag, e, t.key, t.mode)),
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
  function Qu(t, e, l, n, u, i) {
    var f = 0;
    if (((n = t), typeof t == 'function')) Gc(t) && (f = 1);
    else if (typeof t == 'string')
      f = pg(t, l, I.current) ? 26 : t === 'html' || t === 'head' || t === 'body' ? 27 : 5;
    else
      t: switch (t) {
        case et:
          return ((t = Se(31, l, e, u)), (t.elementType = et), (t.lanes = i), t);
        case w:
          return an(l.children, u, i, e);
        case q:
          ((f = 8), (u |= 24));
          break;
        case H:
          return ((t = Se(12, l, e, u | 2)), (t.elementType = H), (t.lanes = i), t);
        case $:
          return ((t = Se(13, l, e, u)), (t.elementType = $), (t.lanes = i), t);
        case W:
          return ((t = Se(19, l, e, u)), (t.elementType = W), (t.lanes = i), t);
        default:
          if (typeof t == 'object' && t !== null)
            switch (t.$$typeof) {
              case z:
                f = 10;
                break t;
              case Q:
                f = 9;
                break t;
              case Y:
                f = 11;
                break t;
              case K:
                f = 14;
                break t;
              case V:
                ((f = 16), (n = null));
                break t;
            }
          ((f = 29), (l = Error(s(130, t === null ? 'null' : typeof t, ''))), (n = null));
      }
    return ((e = Se(f, l, e, u)), (e.elementType = t), (e.type = n), (e.lanes = i), e);
  }
  function an(t, e, l, n) {
    return ((t = Se(7, t, n, e)), (t.lanes = l), t);
  }
  function Yc(t, e, l) {
    return ((t = Se(6, t, null, e)), (t.lanes = l), t);
  }
  function Ef(t) {
    var e = Se(18, null, null, 0);
    return ((e.stateNode = t), e);
  }
  function Xc(t, e, l) {
    return (
      (e = Se(4, t.children !== null ? t.children : [], t.key, e)),
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
  function Oe(t, e) {
    if (typeof t == 'object' && t !== null) {
      var l = Tf.get(t);
      return l !== void 0 ? l : ((e = { value: t, source: e, stack: xr(e) }), Tf.set(t, e), e);
    }
    return { value: t, source: e, stack: xr(e) };
  }
  var wn = [],
    Un = 0,
    Zu = null,
    Oa = 0,
    De = [],
    ke = 0,
    Nl = null,
    Ke = 1,
    $e = '';
  function nl(t, e) {
    ((wn[Un++] = Oa), (wn[Un++] = Zu), (Zu = t), (Oa = e));
  }
  function Nf(t, e, l) {
    ((De[ke++] = Ke), (De[ke++] = $e), (De[ke++] = Nl), (Nl = t));
    var n = Ke;
    t = $e;
    var u = 32 - _e(n) - 1;
    ((n &= ~(1 << u)), (l += 1));
    var i = 32 - _e(e) + u;
    if (30 < i) {
      var f = u - (u % 5);
      ((i = (n & ((1 << f) - 1)).toString(32)),
        (n >>= f),
        (u -= f),
        (Ke = (1 << (32 - _e(e) + u)) | (l << u) | n),
        ($e = i + t));
    } else ((Ke = (1 << i) | (l << u) | n), ($e = t));
  }
  function Vc(t) {
    t.return !== null && (nl(t, 1), Nf(t, 1, 0));
  }
  function Qc(t) {
    for (; t === Zu; ) ((Zu = wn[--Un]), (wn[Un] = null), (Oa = wn[--Un]), (wn[Un] = null));
    for (; t === Nl; )
      ((Nl = De[--ke]),
        (De[ke] = null),
        ($e = De[--ke]),
        (De[ke] = null),
        (Ke = De[--ke]),
        (De[ke] = null));
  }
  function Af(t, e) {
    ((De[ke++] = Ke), (De[ke++] = $e), (De[ke++] = Nl), (Ke = e.id), ($e = e.overflow), (Nl = t));
  }
  var te = null,
    kt = null,
    gt = !1,
    Al = null,
    we = !1,
    Zc = Error(s(519));
  function Cl(t) {
    var e = Error(
      s(418, 1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? 'text' : 'HTML', '')
    );
    throw (Da(Oe(e, t)), Zc);
  }
  function Cf(t) {
    var e = t.stateNode,
      l = t.type,
      n = t.memoizedProps;
    switch (((e[Pt] = t), (e[re] = n), l)) {
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
        for (l = 0; l < eu.length; l++) mt(eu[l], e);
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
          n.onClick != null && (e.onclick = tl),
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
          we = !1;
          return;
        case 27:
        case 3:
          we = !0;
          return;
        default:
          te = te.return;
      }
  }
  function Bn(t) {
    if (t !== te) return !1;
    if (!gt) return (Mf(t), (gt = !0), !1);
    var e = t.tag,
      l;
    if (
      ((l = e !== 3 && e !== 27) &&
        ((l = e === 5) &&
          ((l = t.type), (l = !(l !== 'form' && l !== 'button') || ro(t.type, t.memoizedProps))),
        (l = !l)),
      l && kt && Cl(t),
      Mf(t),
      e === 13)
    ) {
      if (((t = t.memoizedState), (t = t !== null ? t.dehydrated : null), !t)) throw Error(s(317));
      kt = Pm(t);
    } else if (e === 31) {
      if (((t = t.memoizedState), (t = t !== null ? t.dehydrated : null), !t)) throw Error(s(317));
      kt = Pm(t);
    } else
      e === 27
        ? ((e = kt), Gl(t.type) ? ((t = yo), (yo = null), (kt = t)) : (kt = e))
        : (kt = te ? Be(t.stateNode.nextSibling) : null);
    return !0;
  }
  function un() {
    ((kt = te = null), (gt = !1));
  }
  function Kc() {
    var t = Al;
    return (t !== null && (pe === null ? (pe = t) : pe.push.apply(pe, t), (Al = null)), t);
  }
  function Da(t) {
    Al === null ? (Al = [t]) : Al.push(t);
  }
  var $c = S(null),
    cn = null,
    al = null;
  function Ml(t, e, l) {
    (Z($c, e._currentValue), (e._currentValue = l));
  }
  function ul(t) {
    ((t._currentValue = $c.current), D($c));
  }
  function Jc(t, e, l) {
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
  function Ic(t, e, l, n) {
    var u = t.child;
    for (u !== null && (u.return = t); u !== null; ) {
      var i = u.dependencies;
      if (i !== null) {
        var f = u.child;
        i = i.firstContext;
        t: for (; i !== null; ) {
          var h = i;
          i = u;
          for (var x = 0; x < e.length; x++)
            if (h.context === e[x]) {
              ((i.lanes |= l),
                (h = i.alternate),
                h !== null && (h.lanes |= l),
                Jc(i.return, l, t),
                n || (f = null));
              break t;
            }
          i = h.next;
        }
      } else if (u.tag === 18) {
        if (((f = u.return), f === null)) throw Error(s(341));
        ((f.lanes |= l), (i = f.alternate), i !== null && (i.lanes |= l), Jc(f, l, t), (f = null));
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
  function Ln(t, e, l, n) {
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
          be(u.pendingProps.value, f.value) || (t !== null ? t.push(h) : (t = [h]));
        }
      } else if (u === Et.current) {
        if (((f = u.alternate), f === null)) throw Error(s(387));
        f.memoizedState.memoizedState !== u.memoizedState.memoizedState &&
          (t !== null ? t.push(iu) : (t = [iu]));
      }
      u = u.return;
    }
    (t !== null && Ic(e, t, l, n), (e.flags |= 262144));
  }
  function Ku(t) {
    for (t = t.firstContext; t !== null; ) {
      if (!be(t.context._currentValue, t.memoizedValue)) return !0;
      t = t.next;
    }
    return !1;
  }
  function sn(t) {
    ((cn = t), (al = null), (t = t.dependencies), t !== null && (t.firstContext = null));
  }
  function ee(t) {
    return Rf(cn, t);
  }
  function $u(t, e) {
    return (cn === null && sn(t), Rf(t, e));
  }
  function Rf(t, e) {
    var l = e._currentValue;
    if (((e = { context: e, memoizedValue: l, next: null }), al === null)) {
      if (t === null) throw Error(s(308));
      ((al = e), (t.dependencies = { lanes: 0, firstContext: e }), (t.flags |= 524288));
    } else al = al.next = e;
    return l;
  }
  var f0 =
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
    d0 = a.unstable_scheduleCallback,
    m0 = a.unstable_NormalPriority,
    Zt = {
      $$typeof: z,
      Consumer: null,
      Provider: null,
      _currentValue: null,
      _currentValue2: null,
      _threadCount: 0,
    };
  function Wc() {
    return { controller: new f0(), data: new Map(), refCount: 0 };
  }
  function ka(t) {
    (t.refCount--,
      t.refCount === 0 &&
        d0(m0, function () {
          t.controller.abort();
        }));
  }
  var wa = null,
    Fc = 0,
    Hn = 0,
    qn = null;
  function h0(t, e) {
    if (wa === null) {
      var l = (wa = []);
      ((Fc = 0),
        (Hn = eo()),
        (qn = {
          status: 'pending',
          value: void 0,
          then: function (n) {
            l.push(n);
          },
        }));
    }
    return (Fc++, e.then(jf, jf), e);
  }
  function jf() {
    if (--Fc === 0 && wa !== null) {
      qn !== null && (qn.status = 'fulfilled');
      var t = wa;
      ((wa = null), (Hn = 0), (qn = null));
      for (var e = 0; e < t.length; e++) (0, t[e])();
    }
  }
  function p0(t, e) {
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
  var zf = B.S;
  B.S = function (t, e) {
    ((hm = ge()),
      typeof e == 'object' && e !== null && typeof e.then == 'function' && h0(t, e),
      zf !== null && zf(t, e));
  };
  var on = S(null);
  function Pc() {
    var t = on.current;
    return t !== null ? t : Ot.pooledCache;
  }
  function Ju(t, e) {
    e === null ? Z(on, on.current) : Z(on, e.pool);
  }
  function Of() {
    var t = Pc();
    return t === null ? null : { parent: Zt._currentValue, pool: t };
  }
  var Gn = Error(s(460)),
    ts = Error(s(474)),
    Iu = Error(s(542)),
    Wu = { then: function () {} };
  function Df(t) {
    return ((t = t.status), t === 'fulfilled' || t === 'rejected');
  }
  function kf(t, e, l) {
    switch (
      ((l = t[l]), l === void 0 ? t.push(e) : l !== e && (e.then(tl, tl), (e = l)), e.status)
    ) {
      case 'fulfilled':
        return e.value;
      case 'rejected':
        throw ((t = e.reason), Uf(t), t);
      default:
        if (typeof e.status == 'string') e.then(tl, tl);
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
            throw ((t = e.reason), Uf(t), t);
        }
        throw ((fn = e), Gn);
    }
  }
  function rn(t) {
    try {
      var e = t._init;
      return e(t._payload);
    } catch (l) {
      throw l !== null && typeof l == 'object' && typeof l.then == 'function' ? ((fn = l), Gn) : l;
    }
  }
  var fn = null;
  function wf() {
    if (fn === null) throw Error(s(459));
    var t = fn;
    return ((fn = null), t);
  }
  function Uf(t) {
    if (t === Gn || t === Iu) throw Error(s(483));
  }
  var Yn = null,
    Ua = 0;
  function Fu(t) {
    var e = Ua;
    return ((Ua += 1), Yn === null && (Yn = []), kf(Yn, t, e));
  }
  function Ba(t, e) {
    ((e = e.props.ref), (t.ref = e !== void 0 ? e : null));
  }
  function Pu(t, e) {
    throw e.$$typeof === E
      ? Error(s(525))
      : ((t = Object.prototype.toString.call(e)),
        Error(
          s(
            31,
            t === '[object Object]' ? 'object with keys {' + Object.keys(e).join(', ') + '}' : t
          )
        ));
  }
  function Bf(t) {
    function e(A, T) {
      if (t) {
        var C = A.deletions;
        C === null ? ((A.deletions = [T]), (A.flags |= 16)) : C.push(T);
      }
    }
    function l(A, T) {
      if (!t) return null;
      for (; T !== null; ) (e(A, T), (T = T.sibling));
      return null;
    }
    function n(A) {
      for (var T = new Map(); A !== null; )
        (A.key !== null ? T.set(A.key, A) : T.set(A.index, A), (A = A.sibling));
      return T;
    }
    function u(A, T) {
      return ((A = ll(A, T)), (A.index = 0), (A.sibling = null), A);
    }
    function i(A, T, C) {
      return (
        (A.index = C),
        t
          ? ((C = A.alternate),
            C !== null
              ? ((C = C.index), C < T ? ((A.flags |= 67108866), T) : C)
              : ((A.flags |= 67108866), T))
          : ((A.flags |= 1048576), T)
      );
    }
    function f(A) {
      return (t && A.alternate === null && (A.flags |= 67108866), A);
    }
    function h(A, T, C, L) {
      return T === null || T.tag !== 6
        ? ((T = Yc(C, A.mode, L)), (T.return = A), T)
        : ((T = u(T, C)), (T.return = A), T);
    }
    function x(A, T, C, L) {
      var lt = C.type;
      return lt === w
        ? U(A, T, C.props.children, L, C.key)
        : T !== null &&
            (T.elementType === lt ||
              (typeof lt == 'object' && lt !== null && lt.$$typeof === V && rn(lt) === T.type))
          ? ((T = u(T, C.props)), Ba(T, C), (T.return = A), T)
          : ((T = Qu(C.type, C.key, C.props, null, A.mode, L)), Ba(T, C), (T.return = A), T);
    }
    function M(A, T, C, L) {
      return T === null ||
        T.tag !== 4 ||
        T.stateNode.containerInfo !== C.containerInfo ||
        T.stateNode.implementation !== C.implementation
        ? ((T = Xc(C, A.mode, L)), (T.return = A), T)
        : ((T = u(T, C.children || [])), (T.return = A), T);
    }
    function U(A, T, C, L, lt) {
      return T === null || T.tag !== 7
        ? ((T = an(C, A.mode, L, lt)), (T.return = A), T)
        : ((T = u(T, C)), (T.return = A), T);
    }
    function G(A, T, C) {
      if ((typeof T == 'string' && T !== '') || typeof T == 'number' || typeof T == 'bigint')
        return ((T = Yc('' + T, A.mode, C)), (T.return = A), T);
      if (typeof T == 'object' && T !== null) {
        switch (T.$$typeof) {
          case k:
            return ((C = Qu(T.type, T.key, T.props, null, A.mode, C)), Ba(C, T), (C.return = A), C);
          case j:
            return ((T = Xc(T, A.mode, C)), (T.return = A), T);
          case V:
            return ((T = rn(T)), G(A, T, C));
        }
        if (Lt(T) || Nt(T)) return ((T = an(T, A.mode, C, null)), (T.return = A), T);
        if (typeof T.then == 'function') return G(A, Fu(T), C);
        if (T.$$typeof === z) return G(A, $u(A, T), C);
        Pu(A, T);
      }
      return null;
    }
    function R(A, T, C, L) {
      var lt = T !== null ? T.key : null;
      if ((typeof C == 'string' && C !== '') || typeof C == 'number' || typeof C == 'bigint')
        return lt !== null ? null : h(A, T, '' + C, L);
      if (typeof C == 'object' && C !== null) {
        switch (C.$$typeof) {
          case k:
            return C.key === lt ? x(A, T, C, L) : null;
          case j:
            return C.key === lt ? M(A, T, C, L) : null;
          case V:
            return ((C = rn(C)), R(A, T, C, L));
        }
        if (Lt(C) || Nt(C)) return lt !== null ? null : U(A, T, C, L, null);
        if (typeof C.then == 'function') return R(A, T, Fu(C), L);
        if (C.$$typeof === z) return R(A, T, $u(A, C), L);
        Pu(A, C);
      }
      return null;
    }
    function O(A, T, C, L, lt) {
      if ((typeof L == 'string' && L !== '') || typeof L == 'number' || typeof L == 'bigint')
        return ((A = A.get(C) || null), h(T, A, '' + L, lt));
      if (typeof L == 'object' && L !== null) {
        switch (L.$$typeof) {
          case k:
            return ((A = A.get(L.key === null ? C : L.key) || null), x(T, A, L, lt));
          case j:
            return ((A = A.get(L.key === null ? C : L.key) || null), M(T, A, L, lt));
          case V:
            return ((L = rn(L)), O(A, T, C, L, lt));
        }
        if (Lt(L) || Nt(L)) return ((A = A.get(C) || null), U(T, A, L, lt, null));
        if (typeof L.then == 'function') return O(A, T, C, Fu(L), lt);
        if (L.$$typeof === z) return O(A, T, C, $u(T, L), lt);
        Pu(T, L);
      }
      return null;
    }
    function F(A, T, C, L) {
      for (
        var lt = null, _t = null, P = T, rt = (T = 0), pt = null;
        P !== null && rt < C.length;
        rt++
      ) {
        P.index > rt ? ((pt = P), (P = null)) : (pt = P.sibling);
        var bt = R(A, P, C[rt], L);
        if (bt === null) {
          P === null && (P = pt);
          break;
        }
        (t && P && bt.alternate === null && e(A, P),
          (T = i(bt, T, rt)),
          _t === null ? (lt = bt) : (_t.sibling = bt),
          (_t = bt),
          (P = pt));
      }
      if (rt === C.length) return (l(A, P), gt && nl(A, rt), lt);
      if (P === null) {
        for (; rt < C.length; rt++)
          ((P = G(A, C[rt], L)),
            P !== null && ((T = i(P, T, rt)), _t === null ? (lt = P) : (_t.sibling = P), (_t = P)));
        return (gt && nl(A, rt), lt);
      }
      for (P = n(P); rt < C.length; rt++)
        ((pt = O(P, A, rt, C[rt], L)),
          pt !== null &&
            (t && pt.alternate !== null && P.delete(pt.key === null ? rt : pt.key),
            (T = i(pt, T, rt)),
            _t === null ? (lt = pt) : (_t.sibling = pt),
            (_t = pt)));
      return (
        t &&
          P.forEach(function (Zl) {
            return e(A, Zl);
          }),
        gt && nl(A, rt),
        lt
      );
    }
    function at(A, T, C, L) {
      if (C == null) throw Error(s(151));
      for (
        var lt = null, _t = null, P = T, rt = (T = 0), pt = null, bt = C.next();
        P !== null && !bt.done;
        rt++, bt = C.next()
      ) {
        P.index > rt ? ((pt = P), (P = null)) : (pt = P.sibling);
        var Zl = R(A, P, bt.value, L);
        if (Zl === null) {
          P === null && (P = pt);
          break;
        }
        (t && P && Zl.alternate === null && e(A, P),
          (T = i(Zl, T, rt)),
          _t === null ? (lt = Zl) : (_t.sibling = Zl),
          (_t = Zl),
          (P = pt));
      }
      if (bt.done) return (l(A, P), gt && nl(A, rt), lt);
      if (P === null) {
        for (; !bt.done; rt++, bt = C.next())
          ((bt = G(A, bt.value, L)),
            bt !== null &&
              ((T = i(bt, T, rt)), _t === null ? (lt = bt) : (_t.sibling = bt), (_t = bt)));
        return (gt && nl(A, rt), lt);
      }
      for (P = n(P); !bt.done; rt++, bt = C.next())
        ((bt = O(P, A, rt, bt.value, L)),
          bt !== null &&
            (t && bt.alternate !== null && P.delete(bt.key === null ? rt : bt.key),
            (T = i(bt, T, rt)),
            _t === null ? (lt = bt) : (_t.sibling = bt),
            (_t = bt)));
      return (
        t &&
          P.forEach(function (Ag) {
            return e(A, Ag);
          }),
        gt && nl(A, rt),
        lt
      );
    }
    function zt(A, T, C, L) {
      if (
        (typeof C == 'object' &&
          C !== null &&
          C.type === w &&
          C.key === null &&
          (C = C.props.children),
        typeof C == 'object' && C !== null)
      ) {
        switch (C.$$typeof) {
          case k:
            t: {
              for (var lt = C.key; T !== null; ) {
                if (T.key === lt) {
                  if (((lt = C.type), lt === w)) {
                    if (T.tag === 7) {
                      (l(A, T.sibling), (L = u(T, C.props.children)), (L.return = A), (A = L));
                      break t;
                    }
                  } else if (
                    T.elementType === lt ||
                    (typeof lt == 'object' && lt !== null && lt.$$typeof === V && rn(lt) === T.type)
                  ) {
                    (l(A, T.sibling), (L = u(T, C.props)), Ba(L, C), (L.return = A), (A = L));
                    break t;
                  }
                  l(A, T);
                  break;
                } else e(A, T);
                T = T.sibling;
              }
              C.type === w
                ? ((L = an(C.props.children, A.mode, L, C.key)), (L.return = A), (A = L))
                : ((L = Qu(C.type, C.key, C.props, null, A.mode, L)),
                  Ba(L, C),
                  (L.return = A),
                  (A = L));
            }
            return f(A);
          case j:
            t: {
              for (lt = C.key; T !== null; ) {
                if (T.key === lt)
                  if (
                    T.tag === 4 &&
                    T.stateNode.containerInfo === C.containerInfo &&
                    T.stateNode.implementation === C.implementation
                  ) {
                    (l(A, T.sibling), (L = u(T, C.children || [])), (L.return = A), (A = L));
                    break t;
                  } else {
                    l(A, T);
                    break;
                  }
                else e(A, T);
                T = T.sibling;
              }
              ((L = Xc(C, A.mode, L)), (L.return = A), (A = L));
            }
            return f(A);
          case V:
            return ((C = rn(C)), zt(A, T, C, L));
        }
        if (Lt(C)) return F(A, T, C, L);
        if (Nt(C)) {
          if (((lt = Nt(C)), typeof lt != 'function')) throw Error(s(150));
          return ((C = lt.call(C)), at(A, T, C, L));
        }
        if (typeof C.then == 'function') return zt(A, T, Fu(C), L);
        if (C.$$typeof === z) return zt(A, T, $u(A, C), L);
        Pu(A, C);
      }
      return (typeof C == 'string' && C !== '') || typeof C == 'number' || typeof C == 'bigint'
        ? ((C = '' + C),
          T !== null && T.tag === 6
            ? (l(A, T.sibling), (L = u(T, C)), (L.return = A), (A = L))
            : (l(A, T), (L = Yc(C, A.mode, L)), (L.return = A), (A = L)),
          f(A))
        : l(A, T);
    }
    return function (A, T, C, L) {
      try {
        Ua = 0;
        var lt = zt(A, T, C, L);
        return ((Yn = null), lt);
      } catch (P) {
        if (P === Gn || P === Iu) throw P;
        var _t = Se(29, P, null, A.mode);
        return ((_t.lanes = L), (_t.return = A), _t);
      } finally {
      }
    };
  }
  var dn = Bf(!0),
    Lf = Bf(!1),
    Rl = !1;
  function es(t) {
    t.updateQueue = {
      baseState: t.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null,
    };
  }
  function ls(t, e) {
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
  function jl(t) {
    return { lane: t, tag: 0, payload: null, callback: null, next: null };
  }
  function zl(t, e, l) {
    var n = t.updateQueue;
    if (n === null) return null;
    if (((n = n.shared), (xt & 2) !== 0)) {
      var u = n.pending;
      return (
        u === null ? (e.next = e) : ((e.next = u.next), (u.next = e)),
        (n.pending = e),
        (e = Vu(t)),
        Sf(t, null, l),
        e
      );
    }
    return (Xu(t, n, e, l), Vu(t));
  }
  function La(t, e, l) {
    if (((e = e.updateQueue), e !== null && ((e = e.shared), (l & 4194048) !== 0))) {
      var n = e.lanes;
      ((n &= t.pendingLanes), (l |= n), (e.lanes = l), Mr(t, l));
    }
  }
  function ns(t, e) {
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
  var as = !1;
  function Ha() {
    if (as) {
      var t = qn;
      if (t !== null) throw t;
    }
  }
  function qa(t, e, l, n) {
    as = !1;
    var u = t.updateQueue;
    Rl = !1;
    var i = u.firstBaseUpdate,
      f = u.lastBaseUpdate,
      h = u.shared.pending;
    if (h !== null) {
      u.shared.pending = null;
      var x = h,
        M = x.next;
      ((x.next = null), f === null ? (i = M) : (f.next = M), (f = x));
      var U = t.alternate;
      U !== null &&
        ((U = U.updateQueue),
        (h = U.lastBaseUpdate),
        h !== f && (h === null ? (U.firstBaseUpdate = M) : (h.next = M), (U.lastBaseUpdate = x)));
    }
    if (i !== null) {
      var G = u.baseState;
      ((f = 0), (U = M = x = null), (h = i));
      do {
        var R = h.lane & -536870913,
          O = R !== h.lane;
        if (O ? (ht & R) === R : (n & R) === R) {
          (R !== 0 && R === Hn && (as = !0),
            U !== null &&
              (U = U.next =
                { lane: 0, tag: h.tag, payload: h.payload, callback: null, next: null }));
          t: {
            var F = t,
              at = h;
            R = e;
            var zt = l;
            switch (at.tag) {
              case 1:
                if (((F = at.payload), typeof F == 'function')) {
                  G = F.call(zt, G, R);
                  break t;
                }
                G = F;
                break t;
              case 3:
                F.flags = (F.flags & -65537) | 128;
              case 0:
                if (
                  ((F = at.payload), (R = typeof F == 'function' ? F.call(zt, G, R) : F), R == null)
                )
                  break t;
                G = v({}, G, R);
                break t;
              case 2:
                Rl = !0;
            }
          }
          ((R = h.callback),
            R !== null &&
              ((t.flags |= 64),
              O && (t.flags |= 8192),
              (O = u.callbacks),
              O === null ? (u.callbacks = [R]) : O.push(R)));
        } else
          ((O = { lane: R, tag: h.tag, payload: h.payload, callback: h.callback, next: null }),
            U === null ? ((M = U = O), (x = G)) : (U = U.next = O),
            (f |= R));
        if (((h = h.next), h === null)) {
          if (((h = u.shared.pending), h === null)) break;
          ((O = h),
            (h = O.next),
            (O.next = null),
            (u.lastBaseUpdate = O),
            (u.shared.pending = null));
        }
      } while (!0);
      (U === null && (x = G),
        (u.baseState = x),
        (u.firstBaseUpdate = M),
        (u.lastBaseUpdate = U),
        i === null && (u.shared.lanes = 0),
        (Ul |= f),
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
  var Xn = S(null),
    ti = S(0);
  function Gf(t, e) {
    ((t = hl), Z(ti, t), Z(Xn, e), (hl = t | e.baseLanes));
  }
  function us() {
    (Z(ti, hl), Z(Xn, Xn.current));
  }
  function is() {
    ((hl = ti.current), D(Xn), D(ti));
  }
  var xe = S(null),
    Ue = null;
  function Ol(t) {
    var e = t.alternate;
    (Z(Vt, Vt.current & 1),
      Z(xe, t),
      Ue === null && (e === null || Xn.current !== null || e.memoizedState !== null) && (Ue = t));
  }
  function cs(t) {
    (Z(Vt, Vt.current), Z(xe, t), Ue === null && (Ue = t));
  }
  function Yf(t) {
    t.tag === 22 ? (Z(Vt, Vt.current), Z(xe, t), Ue === null && (Ue = t)) : Dl();
  }
  function Dl() {
    (Z(Vt, Vt.current), Z(xe, xe.current));
  }
  function Ee(t) {
    (D(xe), Ue === t && (Ue = null), D(Vt));
  }
  var Vt = S(0);
  function ei(t) {
    for (var e = t; e !== null; ) {
      if (e.tag === 13) {
        var l = e.memoizedState;
        if (l !== null && ((l = l.dehydrated), l === null || ho(l) || po(l))) return e;
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
  var il = 0,
    ot = null,
    Rt = null,
    Kt = null,
    li = !1,
    Vn = !1,
    mn = !1,
    ni = 0,
    Ga = 0,
    Qn = null,
    y0 = 0;
  function Gt() {
    throw Error(s(321));
  }
  function ss(t, e) {
    if (e === null) return !1;
    for (var l = 0; l < e.length && l < t.length; l++) if (!be(t[l], e[l])) return !1;
    return !0;
  }
  function os(t, e, l, n, u, i) {
    return (
      (il = i),
      (ot = e),
      (e.memoizedState = null),
      (e.updateQueue = null),
      (e.lanes = 0),
      (B.H = t === null || t.memoizedState === null ? Nd : Ts),
      (mn = !1),
      (i = l(n, u)),
      (mn = !1),
      Vn && (i = Vf(e, l, n, u)),
      Xf(t),
      i
    );
  }
  function Xf(t) {
    B.H = Va;
    var e = Rt !== null && Rt.next !== null;
    if (((il = 0), (Kt = Rt = ot = null), (li = !1), (Ga = 0), (Qn = null), e)) throw Error(s(300));
    t === null || $t || ((t = t.dependencies), t !== null && Ku(t) && ($t = !0));
  }
  function Vf(t, e, l, n) {
    ot = t;
    var u = 0;
    do {
      if ((Vn && (Qn = null), (Ga = 0), (Vn = !1), 25 <= u)) throw Error(s(301));
      if (((u += 1), (Kt = Rt = null), t.updateQueue != null)) {
        var i = t.updateQueue;
        ((i.lastEffect = null),
          (i.events = null),
          (i.stores = null),
          i.memoCache != null && (i.memoCache.index = 0));
      }
      ((B.H = Ad), (i = e(l, n)));
    } while (Vn);
    return i;
  }
  function g0() {
    var t = B.H,
      e = t.useState()[0];
    return (
      (e = typeof e.then == 'function' ? Ya(e) : e),
      (t = t.useState()[0]),
      (Rt !== null ? Rt.memoizedState : null) !== t && (ot.flags |= 1024),
      e
    );
  }
  function rs() {
    var t = ni !== 0;
    return ((ni = 0), t);
  }
  function fs(t, e, l) {
    ((e.updateQueue = t.updateQueue), (e.flags &= -2053), (t.lanes &= ~l));
  }
  function ds(t) {
    if (li) {
      for (t = t.memoizedState; t !== null; ) {
        var e = t.queue;
        (e !== null && (e.pending = null), (t = t.next));
      }
      li = !1;
    }
    ((il = 0), (Kt = Rt = ot = null), (Vn = !1), (Ga = ni = 0), (Qn = null));
  }
  function ce() {
    var t = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
    return (Kt === null ? (ot.memoizedState = Kt = t) : (Kt = Kt.next = t), Kt);
  }
  function Qt() {
    if (Rt === null) {
      var t = ot.alternate;
      t = t !== null ? t.memoizedState : null;
    } else t = Rt.next;
    var e = Kt === null ? ot.memoizedState : Kt.next;
    if (e !== null) ((Kt = e), (Rt = t));
    else {
      if (t === null) throw ot.alternate === null ? Error(s(467)) : Error(s(310));
      ((Rt = t),
        (t = {
          memoizedState: Rt.memoizedState,
          baseState: Rt.baseState,
          baseQueue: Rt.baseQueue,
          queue: Rt.queue,
          next: null,
        }),
        Kt === null ? (ot.memoizedState = Kt = t) : (Kt = Kt.next = t));
    }
    return Kt;
  }
  function ai() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function Ya(t) {
    var e = Ga;
    return (
      (Ga += 1),
      Qn === null && (Qn = []),
      (t = kf(Qn, t, e)),
      (e = ot),
      (Kt === null ? e.memoizedState : Kt.next) === null &&
        ((e = e.alternate), (B.H = e === null || e.memoizedState === null ? Nd : Ts)),
      t
    );
  }
  function ui(t) {
    if (t !== null && typeof t == 'object') {
      if (typeof t.then == 'function') return Ya(t);
      if (t.$$typeof === z) return ee(t);
    }
    throw Error(s(438, String(t)));
  }
  function ms(t) {
    var e = null,
      l = ot.updateQueue;
    if ((l !== null && (e = l.memoCache), e == null)) {
      var n = ot.alternate;
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
      l === null && ((l = ai()), (ot.updateQueue = l)),
      (l.memoCache = e),
      (l = e.data[e.index]),
      l === void 0)
    )
      for (l = e.data[e.index] = Array(t), n = 0; n < t; n++) l[n] = st;
    return (e.index++, l);
  }
  function cl(t, e) {
    return typeof e == 'function' ? e(t) : e;
  }
  function ii(t) {
    var e = Qt();
    return hs(e, Rt, t);
  }
  function hs(t, e, l) {
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
      var h = (f = null),
        x = null,
        M = e,
        U = !1;
      do {
        var G = M.lane & -536870913;
        if (G !== M.lane ? (ht & G) === G : (il & G) === G) {
          var R = M.revertLane;
          if (R === 0)
            (x !== null &&
              (x = x.next =
                {
                  lane: 0,
                  revertLane: 0,
                  gesture: null,
                  action: M.action,
                  hasEagerState: M.hasEagerState,
                  eagerState: M.eagerState,
                  next: null,
                }),
              G === Hn && (U = !0));
          else if ((il & R) === R) {
            ((M = M.next), R === Hn && (U = !0));
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
              x === null ? ((h = x = G), (f = i)) : (x = x.next = G),
              (ot.lanes |= R),
              (Ul |= R));
          ((G = M.action), mn && l(i, G), (i = M.hasEagerState ? M.eagerState : l(i, G)));
        } else
          ((R = {
            lane: G,
            revertLane: M.revertLane,
            gesture: M.gesture,
            action: M.action,
            hasEagerState: M.hasEagerState,
            eagerState: M.eagerState,
            next: null,
          }),
            x === null ? ((h = x = R), (f = i)) : (x = x.next = R),
            (ot.lanes |= G),
            (Ul |= G));
        M = M.next;
      } while (M !== null && M !== e);
      if (
        (x === null ? (f = i) : (x.next = h),
        !be(i, t.memoizedState) && (($t = !0), U && ((l = qn), l !== null)))
      )
        throw l;
      ((t.memoizedState = i), (t.baseState = f), (t.baseQueue = x), (n.lastRenderedState = i));
    }
    return (u === null && (n.lanes = 0), [t.memoizedState, n.dispatch]);
  }
  function ps(t) {
    var e = Qt(),
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
      (be(i, e.memoizedState) || ($t = !0),
        (e.memoizedState = i),
        e.baseQueue === null && (e.baseState = i),
        (l.lastRenderedState = i));
    }
    return [i, n];
  }
  function Qf(t, e, l) {
    var n = ot,
      u = Qt(),
      i = gt;
    if (i) {
      if (l === void 0) throw Error(s(407));
      l = l();
    } else l = e();
    var f = !be((Rt || u).memoizedState, l);
    if (
      (f && ((u.memoizedState = l), ($t = !0)),
      (u = u.queue),
      vs($f.bind(null, n, u, t), [t]),
      u.getSnapshot !== e || f || (Kt !== null && Kt.memoizedState.tag & 1))
    ) {
      if (
        ((n.flags |= 2048),
        Zn(9, { destroy: void 0 }, Kf.bind(null, n, u, l, e), null),
        Ot === null)
      )
        throw Error(s(349));
      i || (il & 127) !== 0 || Zf(n, e, l);
    }
    return l;
  }
  function Zf(t, e, l) {
    ((t.flags |= 16384),
      (t = { getSnapshot: e, value: l }),
      (e = ot.updateQueue),
      e === null
        ? ((e = ai()), (ot.updateQueue = e), (e.stores = [t]))
        : ((l = e.stores), l === null ? (e.stores = [t]) : l.push(t)));
  }
  function Kf(t, e, l, n) {
    ((e.value = l), (e.getSnapshot = n), Jf(e) && If(t));
  }
  function $f(t, e, l) {
    return l(function () {
      Jf(e) && If(t);
    });
  }
  function Jf(t) {
    var e = t.getSnapshot;
    t = t.value;
    try {
      var l = e();
      return !be(t, l);
    } catch {
      return !0;
    }
  }
  function If(t) {
    var e = nn(t, 2);
    e !== null && ye(e, t, 2);
  }
  function ys(t) {
    var e = ce();
    if (typeof t == 'function') {
      var l = t;
      if (((t = l()), mn)) {
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
        lastRenderedReducer: cl,
        lastRenderedState: t,
      }),
      e
    );
  }
  function Wf(t, e, l, n) {
    return ((t.baseState = l), hs(t, Rt, typeof n == 'function' ? n : cl));
  }
  function v0(t, e, l, n, u) {
    if (oi(t)) throw Error(s(485));
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
      (B.T !== null ? l(!0) : (i.isTransition = !1),
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
      var i = B.T,
        f = {};
      B.T = f;
      try {
        var h = l(u, n),
          x = B.S;
        (x !== null && x(f, h), Pf(t, e, h));
      } catch (M) {
        gs(t, e, M);
      } finally {
        (i !== null && f.types !== null && (i.types = f.types), (B.T = i));
      }
    } else
      try {
        ((i = l(u, n)), Pf(t, e, i));
      } catch (M) {
        gs(t, e, M);
      }
  }
  function Pf(t, e, l) {
    l !== null && typeof l == 'object' && typeof l.then == 'function'
      ? l.then(
          function (n) {
            td(t, e, n);
          },
          function (n) {
            return gs(t, e, n);
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
  function gs(t, e, l) {
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
    if (gt) {
      var l = Ot.formState;
      if (l !== null) {
        t: {
          var n = ot;
          if (gt) {
            if (kt) {
              e: {
                for (var u = kt, i = we; u.nodeType !== 8; ) {
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
                ((kt = Be(u.nextSibling)), (n = u.data === 'F!'));
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
      (l = xd.bind(null, ot, n)),
      (n.dispatch = l),
      (n = ys(!1)),
      (i = Es.bind(null, ot, !1, n.queue)),
      (n = ce()),
      (u = { state: e, dispatch: null, action: t, pending: null }),
      (n.queue = u),
      (l = v0.bind(null, ot, u, i, l)),
      (u.dispatch = l),
      (n.memoizedState = t),
      [e, l, !1]
    );
  }
  function ad(t) {
    var e = Qt();
    return ud(e, Rt, t);
  }
  function ud(t, e, l) {
    if (
      ((e = hs(t, e, ld)[0]),
      (t = ii(cl)[0]),
      typeof e == 'object' && e !== null && typeof e.then == 'function')
    )
      try {
        var n = Ya(e);
      } catch (f) {
        throw f === Gn ? Iu : f;
      }
    else n = e;
    e = Qt();
    var u = e.queue,
      i = u.dispatch;
    return (
      l !== e.memoizedState &&
        ((ot.flags |= 2048), Zn(9, { destroy: void 0 }, _0.bind(null, u, l), null)),
      [n, i, t]
    );
  }
  function _0(t, e) {
    t.action = e;
  }
  function id(t) {
    var e = Qt(),
      l = Rt;
    if (l !== null) return ud(e, l, t);
    (Qt(), (e = e.memoizedState), (l = Qt()));
    var n = l.queue.dispatch;
    return ((l.memoizedState = t), [e, n, !1]);
  }
  function Zn(t, e, l, n) {
    return (
      (t = { tag: t, create: l, deps: n, inst: e, next: null }),
      (e = ot.updateQueue),
      e === null && ((e = ai()), (ot.updateQueue = e)),
      (l = e.lastEffect),
      l === null
        ? (e.lastEffect = t.next = t)
        : ((n = l.next), (l.next = t), (t.next = n), (e.lastEffect = t)),
      t
    );
  }
  function cd() {
    return Qt().memoizedState;
  }
  function ci(t, e, l, n) {
    var u = ce();
    ((ot.flags |= t),
      (u.memoizedState = Zn(1 | e, { destroy: void 0 }, l, n === void 0 ? null : n)));
  }
  function si(t, e, l, n) {
    var u = Qt();
    n = n === void 0 ? null : n;
    var i = u.memoizedState.inst;
    Rt !== null && n !== null && ss(n, Rt.memoizedState.deps)
      ? (u.memoizedState = Zn(e, i, l, n))
      : ((ot.flags |= t), (u.memoizedState = Zn(1 | e, i, l, n)));
  }
  function sd(t, e) {
    ci(8390656, 8, t, e);
  }
  function vs(t, e) {
    si(2048, 8, t, e);
  }
  function b0(t) {
    ot.flags |= 4;
    var e = ot.updateQueue;
    if (e === null) ((e = ai()), (ot.updateQueue = e), (e.events = [t]));
    else {
      var l = e.events;
      l === null ? (e.events = [t]) : l.push(t);
    }
  }
  function od(t) {
    var e = Qt().memoizedState;
    return (
      b0({ ref: e, nextImpl: t }),
      function () {
        if ((xt & 2) !== 0) throw Error(s(440));
        return e.impl.apply(void 0, arguments);
      }
    );
  }
  function rd(t, e) {
    return si(4, 2, t, e);
  }
  function fd(t, e) {
    return si(4, 4, t, e);
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
    ((l = l != null ? l.concat([t]) : null), si(4, 4, dd.bind(null, e, t), l));
  }
  function _s() {}
  function hd(t, e) {
    var l = Qt();
    e = e === void 0 ? null : e;
    var n = l.memoizedState;
    return e !== null && ss(e, n[1]) ? n[0] : ((l.memoizedState = [t, e]), t);
  }
  function pd(t, e) {
    var l = Qt();
    e = e === void 0 ? null : e;
    var n = l.memoizedState;
    if (e !== null && ss(e, n[1])) return n[0];
    if (((n = t()), mn)) {
      xl(!0);
      try {
        t();
      } finally {
        xl(!1);
      }
    }
    return ((l.memoizedState = [n, e]), n);
  }
  function bs(t, e, l) {
    return l === void 0 || ((il & 1073741824) !== 0 && (ht & 261930) === 0)
      ? (t.memoizedState = e)
      : ((t.memoizedState = l), (t = ym()), (ot.lanes |= t), (Ul |= t), l);
  }
  function yd(t, e, l, n) {
    return be(l, e)
      ? l
      : Xn.current !== null
        ? ((t = bs(t, l, n)), be(t, e) || ($t = !0), t)
        : (il & 42) === 0 || ((il & 1073741824) !== 0 && (ht & 261930) === 0)
          ? (($t = !0), (t.memoizedState = l))
          : ((t = ym()), (ot.lanes |= t), (Ul |= t), e);
  }
  function gd(t, e, l, n, u) {
    var i = J.p;
    J.p = i !== 0 && 8 > i ? i : 8;
    var f = B.T,
      h = {};
    ((B.T = h), Es(t, !1, e, l));
    try {
      var x = u(),
        M = B.S;
      if (
        (M !== null && M(h, x), x !== null && typeof x == 'object' && typeof x.then == 'function')
      ) {
        var U = p0(x, n);
        Xa(t, e, U, Ae(t));
      } else Xa(t, e, n, Ae(t));
    } catch (G) {
      Xa(t, e, { then: function () {}, status: 'rejected', reason: G }, Ae());
    } finally {
      ((J.p = i), f !== null && h.types !== null && (f.types = h.types), (B.T = f));
    }
  }
  function S0() {}
  function Ss(t, e, l, n) {
    if (t.tag !== 5) throw Error(s(476));
    var u = vd(t).queue;
    gd(
      t,
      u,
      e,
      nt,
      l === null
        ? S0
        : function () {
            return (_d(t), l(n));
          }
    );
  }
  function vd(t) {
    var e = t.memoizedState;
    if (e !== null) return e;
    e = {
      memoizedState: nt,
      baseState: nt,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: cl,
        lastRenderedState: nt,
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
          lastRenderedReducer: cl,
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
    (e.next === null && (e = t.alternate.memoizedState), Xa(t, e.next.queue, {}, Ae()));
  }
  function xs() {
    return ee(iu);
  }
  function bd() {
    return Qt().memoizedState;
  }
  function Sd() {
    return Qt().memoizedState;
  }
  function x0(t) {
    for (var e = t.return; e !== null; ) {
      switch (e.tag) {
        case 24:
        case 3:
          var l = Ae();
          t = jl(l);
          var n = zl(e, t, l);
          (n !== null && (ye(n, e, l), La(n, e, l)), (e = { cache: Wc() }), (t.payload = e));
          return;
      }
      e = e.return;
    }
  }
  function E0(t, e, l) {
    var n = Ae();
    ((l = {
      lane: n,
      revertLane: 0,
      gesture: null,
      action: l,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    }),
      oi(t) ? Ed(e, l) : ((l = qc(t, e, l, n)), l !== null && (ye(l, t, n), Td(l, e, n))));
  }
  function xd(t, e, l) {
    var n = Ae();
    Xa(t, e, l, n);
  }
  function Xa(t, e, l, n) {
    var u = {
      lane: n,
      revertLane: 0,
      gesture: null,
      action: l,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    };
    if (oi(t)) Ed(e, u);
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
          if (((u.hasEagerState = !0), (u.eagerState = h), be(h, f)))
            return (Xu(t, e, u, 0), Ot === null && Yu(), !1);
        } catch {
        } finally {
        }
      if (((l = qc(t, e, u, n)), l !== null)) return (ye(l, t, n), Td(l, e, n), !0);
    }
    return !1;
  }
  function Es(t, e, l, n) {
    if (
      ((n = {
        lane: 2,
        revertLane: eo(),
        gesture: null,
        action: n,
        hasEagerState: !1,
        eagerState: null,
        next: null,
      }),
      oi(t))
    ) {
      if (e) throw Error(s(479));
    } else ((e = qc(t, l, n, 2)), e !== null && ye(e, t, 2));
  }
  function oi(t) {
    var e = t.alternate;
    return t === ot || (e !== null && e === ot);
  }
  function Ed(t, e) {
    Vn = li = !0;
    var l = t.pending;
    (l === null ? (e.next = e) : ((e.next = l.next), (l.next = e)), (t.pending = e));
  }
  function Td(t, e, l) {
    if ((l & 4194048) !== 0) {
      var n = e.lanes;
      ((n &= t.pendingLanes), (l |= n), (e.lanes = l), Mr(t, l));
    }
  }
  var Va = {
    readContext: ee,
    use: ui,
    useCallback: Gt,
    useContext: Gt,
    useEffect: Gt,
    useImperativeHandle: Gt,
    useLayoutEffect: Gt,
    useInsertionEffect: Gt,
    useMemo: Gt,
    useReducer: Gt,
    useRef: Gt,
    useState: Gt,
    useDebugValue: Gt,
    useDeferredValue: Gt,
    useTransition: Gt,
    useSyncExternalStore: Gt,
    useId: Gt,
    useHostTransitionStatus: Gt,
    useFormState: Gt,
    useActionState: Gt,
    useOptimistic: Gt,
    useMemoCache: Gt,
    useCacheRefresh: Gt,
  };
  Va.useEffectEvent = Gt;
  var Nd = {
      readContext: ee,
      use: ui,
      useCallback: function (t, e) {
        return ((ce().memoizedState = [t, e === void 0 ? null : e]), t);
      },
      useContext: ee,
      useEffect: sd,
      useImperativeHandle: function (t, e, l) {
        ((l = l != null ? l.concat([t]) : null), ci(4194308, 4, dd.bind(null, e, t), l));
      },
      useLayoutEffect: function (t, e) {
        return ci(4194308, 4, t, e);
      },
      useInsertionEffect: function (t, e) {
        ci(4, 2, t, e);
      },
      useMemo: function (t, e) {
        var l = ce();
        e = e === void 0 ? null : e;
        var n = t();
        if (mn) {
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
          if (mn) {
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
          (t = t.dispatch = E0.bind(null, ot, t)),
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
          l = xd.bind(null, ot, e);
        return ((e.dispatch = l), [t.memoizedState, l]);
      },
      useDebugValue: _s,
      useDeferredValue: function (t, e) {
        var l = ce();
        return bs(l, t, e);
      },
      useTransition: function () {
        var t = ys(!1);
        return ((t = gd.bind(null, ot, t.queue, !0, !1)), (ce().memoizedState = t), [!1, t]);
      },
      useSyncExternalStore: function (t, e, l) {
        var n = ot,
          u = ce();
        if (gt) {
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
          Zn(9, { destroy: void 0 }, Kf.bind(null, n, i, l, e), null),
          l
        );
      },
      useId: function () {
        var t = ce(),
          e = Ot.identifierPrefix;
        if (gt) {
          var l = $e,
            n = Ke;
          ((l = (n & ~(1 << (32 - _e(n) - 1))).toString(32) + l),
            (e = '_' + e + 'R_' + l),
            (l = ni++),
            0 < l && (e += 'H' + l.toString(32)),
            (e += '_'));
        } else ((l = y0++), (e = '_' + e + 'r_' + l.toString(32) + '_'));
        return (t.memoizedState = e);
      },
      useHostTransitionStatus: xs,
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
        return ((e.queue = l), (e = Es.bind(null, ot, !0, l)), (l.dispatch = e), [t, e]);
      },
      useMemoCache: ms,
      useCacheRefresh: function () {
        return (ce().memoizedState = x0.bind(null, ot));
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
    Ts = {
      readContext: ee,
      use: ui,
      useCallback: hd,
      useContext: ee,
      useEffect: vs,
      useImperativeHandle: md,
      useInsertionEffect: rd,
      useLayoutEffect: fd,
      useMemo: pd,
      useReducer: ii,
      useRef: cd,
      useState: function () {
        return ii(cl);
      },
      useDebugValue: _s,
      useDeferredValue: function (t, e) {
        var l = Qt();
        return yd(l, Rt.memoizedState, t, e);
      },
      useTransition: function () {
        var t = ii(cl)[0],
          e = Qt().memoizedState;
        return [typeof t == 'boolean' ? t : Ya(t), e];
      },
      useSyncExternalStore: Qf,
      useId: bd,
      useHostTransitionStatus: xs,
      useFormState: ad,
      useActionState: ad,
      useOptimistic: function (t, e) {
        var l = Qt();
        return Wf(l, Rt, t, e);
      },
      useMemoCache: ms,
      useCacheRefresh: Sd,
    };
  Ts.useEffectEvent = od;
  var Ad = {
    readContext: ee,
    use: ui,
    useCallback: hd,
    useContext: ee,
    useEffect: vs,
    useImperativeHandle: md,
    useInsertionEffect: rd,
    useLayoutEffect: fd,
    useMemo: pd,
    useReducer: ps,
    useRef: cd,
    useState: function () {
      return ps(cl);
    },
    useDebugValue: _s,
    useDeferredValue: function (t, e) {
      var l = Qt();
      return Rt === null ? bs(l, t, e) : yd(l, Rt.memoizedState, t, e);
    },
    useTransition: function () {
      var t = ps(cl)[0],
        e = Qt().memoizedState;
      return [typeof t == 'boolean' ? t : Ya(t), e];
    },
    useSyncExternalStore: Qf,
    useId: bd,
    useHostTransitionStatus: xs,
    useFormState: id,
    useActionState: id,
    useOptimistic: function (t, e) {
      var l = Qt();
      return Rt !== null ? Wf(l, Rt, t, e) : ((l.baseState = t), [t, l.queue.dispatch]);
    },
    useMemoCache: ms,
    useCacheRefresh: Sd,
  };
  Ad.useEffectEvent = od;
  function Ns(t, e, l, n) {
    ((e = t.memoizedState),
      (l = l(n, e)),
      (l = l == null ? e : v({}, e, l)),
      (t.memoizedState = l),
      t.lanes === 0 && (t.updateQueue.baseState = l));
  }
  var As = {
    enqueueSetState: function (t, e, l) {
      t = t._reactInternals;
      var n = Ae(),
        u = jl(n);
      ((u.payload = e),
        l != null && (u.callback = l),
        (e = zl(t, u, n)),
        e !== null && (ye(e, t, n), La(e, t, n)));
    },
    enqueueReplaceState: function (t, e, l) {
      t = t._reactInternals;
      var n = Ae(),
        u = jl(n);
      ((u.tag = 1),
        (u.payload = e),
        l != null && (u.callback = l),
        (e = zl(t, u, n)),
        e !== null && (ye(e, t, n), La(e, t, n)));
    },
    enqueueForceUpdate: function (t, e) {
      t = t._reactInternals;
      var l = Ae(),
        n = jl(l);
      ((n.tag = 2),
        e != null && (n.callback = e),
        (e = zl(t, n, l)),
        e !== null && (ye(e, t, l), La(e, t, l)));
    },
  };
  function Cd(t, e, l, n, u, i, f) {
    return (
      (t = t.stateNode),
      typeof t.shouldComponentUpdate == 'function'
        ? t.shouldComponentUpdate(n, i, f)
        : e.prototype && e.prototype.isPureReactComponent
          ? !ja(l, n) || !ja(u, i)
          : !0
    );
  }
  function Md(t, e, l, n) {
    ((t = e.state),
      typeof e.componentWillReceiveProps == 'function' && e.componentWillReceiveProps(l, n),
      typeof e.UNSAFE_componentWillReceiveProps == 'function' &&
        e.UNSAFE_componentWillReceiveProps(l, n),
      e.state !== t && As.enqueueReplaceState(e, e.state, null));
  }
  function hn(t, e) {
    var l = e;
    if ('ref' in e) {
      l = {};
      for (var n in e) n !== 'ref' && (l[n] = e[n]);
    }
    if ((t = t.defaultProps)) {
      l === e && (l = v({}, l));
      for (var u in t) l[u] === void 0 && (l[u] = t[u]);
    }
    return l;
  }
  function Rd(t) {
    Gu(t);
  }
  function jd(t) {
    console.error(t);
  }
  function zd(t) {
    Gu(t);
  }
  function ri(t, e) {
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
  function Cs(t, e, l) {
    return (
      (l = jl(l)),
      (l.tag = 3),
      (l.payload = { element: null }),
      (l.callback = function () {
        ri(t, e);
      }),
      l
    );
  }
  function Dd(t) {
    return ((t = jl(t)), (t.tag = 3), t);
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
          typeof u != 'function' && (Bl === null ? (Bl = new Set([this])) : Bl.add(this)));
        var h = n.stack;
        this.componentDidCatch(n.value, { componentStack: h !== null ? h : '' });
      });
  }
  function T0(t, e, l, n, u) {
    if (((l.flags |= 32768), n !== null && typeof n == 'object' && typeof n.then == 'function')) {
      if (((e = l.alternate), e !== null && Ln(e, l, u, !0), (l = xe.current), l !== null)) {
        switch (l.tag) {
          case 31:
          case 13:
            return (
              Ue === null ? xi() : l.alternate === null && Yt === 0 && (Yt = 3),
              (l.flags &= -257),
              (l.flags |= 65536),
              (l.lanes = u),
              n === Wu
                ? (l.flags |= 16384)
                : ((e = l.updateQueue),
                  e === null ? (l.updateQueue = new Set([n])) : e.add(n),
                  Fs(t, n, u)),
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
                  Fs(t, n, u)),
              !1
            );
        }
        throw Error(s(435, l.tag));
      }
      return (Fs(t, n, u), xi(), !1);
    }
    if (gt)
      return (
        (e = xe.current),
        e !== null
          ? ((e.flags & 65536) === 0 && (e.flags |= 256),
            (e.flags |= 65536),
            (e.lanes = u),
            n !== Zc && ((t = Error(s(422), { cause: n })), Da(Oe(t, l))))
          : (n !== Zc && ((e = Error(s(423), { cause: n })), Da(Oe(e, l))),
            (t = t.current.alternate),
            (t.flags |= 65536),
            (u &= -u),
            (t.lanes |= u),
            (n = Oe(n, l)),
            (u = Cs(t.stateNode, n, u)),
            ns(t, u),
            Yt !== 4 && (Yt = 2)),
        !1
      );
    var i = Error(s(520), { cause: n });
    if (((i = Oe(i, l)), Fa === null ? (Fa = [i]) : Fa.push(i), Yt !== 4 && (Yt = 2), e === null))
      return !0;
    ((n = Oe(n, l)), (l = e));
    do {
      switch (l.tag) {
        case 3:
          return (
            (l.flags |= 65536),
            (t = u & -u),
            (l.lanes |= t),
            (t = Cs(l.stateNode, n, t)),
            ns(l, t),
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
                  (Bl === null || !Bl.has(i)))))
          )
            return (
              (l.flags |= 65536),
              (u &= -u),
              (l.lanes |= u),
              (u = Dd(u)),
              kd(u, t, l, n),
              ns(l, u),
              !1
            );
      }
      l = l.return;
    } while (l !== null);
    return !1;
  }
  var Ms = Error(s(461)),
    $t = !1;
  function le(t, e, l, n) {
    e.child = t === null ? Lf(e, null, l, n) : dn(e, t.child, l, n);
  }
  function wd(t, e, l, n, u) {
    l = l.render;
    var i = e.ref;
    if ('ref' in n) {
      var f = {};
      for (var h in n) h !== 'ref' && (f[h] = n[h]);
    } else f = n;
    return (
      sn(e),
      (n = os(t, e, l, f, i, u)),
      (h = rs()),
      t !== null && !$t
        ? (fs(t, e, u), sl(t, e, u))
        : (gt && h && Vc(e), (e.flags |= 1), le(t, e, n, u), e.child)
    );
  }
  function Ud(t, e, l, n, u) {
    if (t === null) {
      var i = l.type;
      return typeof i == 'function' && !Gc(i) && i.defaultProps === void 0 && l.compare === null
        ? ((e.tag = 15), (e.type = i), Bd(t, e, i, n, u))
        : ((t = Qu(l.type, null, n, e, e.mode, u)), (t.ref = e.ref), (t.return = e), (e.child = t));
    }
    if (((i = t.child), !Us(t, u))) {
      var f = i.memoizedProps;
      if (((l = l.compare), (l = l !== null ? l : ja), l(f, n) && t.ref === e.ref))
        return sl(t, e, u);
    }
    return ((e.flags |= 1), (t = ll(i, n)), (t.ref = e.ref), (t.return = e), (e.child = t));
  }
  function Bd(t, e, l, n, u) {
    if (t !== null) {
      var i = t.memoizedProps;
      if (ja(i, n) && t.ref === e.ref)
        if ((($t = !1), (e.pendingProps = n = i), Us(t, u))) (t.flags & 131072) !== 0 && ($t = !0);
        else return ((e.lanes = t.lanes), sl(t, e, u));
    }
    return Rs(t, e, l, n, u);
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
          t !== null && Ju(e, i !== null ? i.cachePool : null),
          i !== null ? Gf(e, i) : us(),
          Yf(e));
      else return ((n = e.lanes = 536870912), Hd(t, e, i !== null ? i.baseLanes | l : l, l, n));
    } else
      i !== null
        ? (Ju(e, i.cachePool), Gf(e, i), Dl(), (e.memoizedState = null))
        : (t !== null && Ju(e, null), us(), Dl());
    return (le(t, e, u, l), e.child);
  }
  function Qa(t, e) {
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
    var i = Pc();
    return (
      (i = i === null ? null : { parent: Zt._currentValue, pool: i }),
      (e.memoizedState = { baseLanes: l, cachePool: i }),
      t !== null && Ju(e, null),
      us(),
      Yf(e),
      t !== null && Ln(t, e, n, !0),
      (e.childLanes = u),
      null
    );
  }
  function fi(t, e) {
    return (
      (e = mi({ mode: e.mode, children: e.children }, t.mode)),
      (e.ref = t.ref),
      (t.child = e),
      (e.return = t),
      e
    );
  }
  function qd(t, e, l) {
    return (
      dn(e, t.child, null, l),
      (t = fi(e, e.pendingProps)),
      (t.flags |= 2),
      Ee(e),
      (e.memoizedState = null),
      t
    );
  }
  function N0(t, e, l) {
    var n = e.pendingProps,
      u = (e.flags & 128) !== 0;
    if (((e.flags &= -129), t === null)) {
      if (gt) {
        if (n.mode === 'hidden') return ((t = fi(e, n)), (e.lanes = 536870912), Qa(null, t));
        if (
          (cs(e),
          (t = kt)
            ? ((t = Fm(t, we)),
              (t = t !== null && t.data === '&' ? t : null),
              t !== null &&
                ((e.memoizedState = {
                  dehydrated: t,
                  treeContext: Nl !== null ? { id: Ke, overflow: $e } : null,
                  retryLane: 536870912,
                  hydrationErrors: null,
                }),
                (l = Ef(t)),
                (l.return = e),
                (e.child = l),
                (te = e),
                (kt = null)))
            : (t = null),
          t === null)
        )
          throw Cl(e);
        return ((e.lanes = 536870912), null);
      }
      return fi(e, n);
    }
    var i = t.memoizedState;
    if (i !== null) {
      var f = i.dehydrated;
      if ((cs(e), u))
        if (e.flags & 256) ((e.flags &= -257), (e = qd(t, e, l)));
        else if (e.memoizedState !== null) ((e.child = t.child), (e.flags |= 128), (e = null));
        else throw Error(s(558));
      else if (($t || Ln(t, e, l, !1), (u = (l & t.childLanes) !== 0), $t || u)) {
        if (((n = Ot), n !== null && ((f = Rr(n, l)), f !== 0 && f !== i.retryLane)))
          throw ((i.retryLane = f), nn(t, f), ye(n, t, f), Ms);
        (xi(), (e = qd(t, e, l)));
      } else
        ((t = i.treeContext),
          (kt = Be(f.nextSibling)),
          (te = e),
          (gt = !0),
          (Al = null),
          (we = !1),
          t !== null && Af(e, t),
          (e = fi(e, n)),
          (e.flags |= 4096));
      return e;
    }
    return (
      (t = ll(t.child, { mode: n.mode, children: n.children })),
      (t.ref = e.ref),
      (e.child = t),
      (t.return = e),
      t
    );
  }
  function di(t, e) {
    var l = e.ref;
    if (l === null) t !== null && t.ref !== null && (e.flags |= 4194816);
    else {
      if (typeof l != 'function' && typeof l != 'object') throw Error(s(284));
      (t === null || t.ref !== l) && (e.flags |= 4194816);
    }
  }
  function Rs(t, e, l, n, u) {
    return (
      sn(e),
      (l = os(t, e, l, n, void 0, u)),
      (n = rs()),
      t !== null && !$t
        ? (fs(t, e, u), sl(t, e, u))
        : (gt && n && Vc(e), (e.flags |= 1), le(t, e, l, u), e.child)
    );
  }
  function Gd(t, e, l, n, u, i) {
    return (
      sn(e),
      (e.updateQueue = null),
      (l = Vf(e, n, l, u)),
      Xf(t),
      (n = rs()),
      t !== null && !$t
        ? (fs(t, e, i), sl(t, e, i))
        : (gt && n && Vc(e), (e.flags |= 1), le(t, e, l, i), e.child)
    );
  }
  function Yd(t, e, l, n, u) {
    if ((sn(e), e.stateNode === null)) {
      var i = kn,
        f = l.contextType;
      (typeof f == 'object' && f !== null && (i = ee(f)),
        (i = new l(n, i)),
        (e.memoizedState = i.state !== null && i.state !== void 0 ? i.state : null),
        (i.updater = As),
        (e.stateNode = i),
        (i._reactInternals = e),
        (i = e.stateNode),
        (i.props = n),
        (i.state = e.memoizedState),
        (i.refs = {}),
        es(e),
        (f = l.contextType),
        (i.context = typeof f == 'object' && f !== null ? ee(f) : kn),
        (i.state = e.memoizedState),
        (f = l.getDerivedStateFromProps),
        typeof f == 'function' && (Ns(e, l, f, n), (i.state = e.memoizedState)),
        typeof l.getDerivedStateFromProps == 'function' ||
          typeof i.getSnapshotBeforeUpdate == 'function' ||
          (typeof i.UNSAFE_componentWillMount != 'function' &&
            typeof i.componentWillMount != 'function') ||
          ((f = i.state),
          typeof i.componentWillMount == 'function' && i.componentWillMount(),
          typeof i.UNSAFE_componentWillMount == 'function' && i.UNSAFE_componentWillMount(),
          f !== i.state && As.enqueueReplaceState(i, i.state, null),
          qa(e, n, i, u),
          Ha(),
          (i.state = e.memoizedState)),
        typeof i.componentDidMount == 'function' && (e.flags |= 4194308),
        (n = !0));
    } else if (t === null) {
      i = e.stateNode;
      var h = e.memoizedProps,
        x = hn(l, h);
      i.props = x;
      var M = i.context,
        U = l.contextType;
      ((f = kn), typeof U == 'object' && U !== null && (f = ee(U)));
      var G = l.getDerivedStateFromProps;
      ((U = typeof G == 'function' || typeof i.getSnapshotBeforeUpdate == 'function'),
        (h = e.pendingProps !== h),
        U ||
          (typeof i.UNSAFE_componentWillReceiveProps != 'function' &&
            typeof i.componentWillReceiveProps != 'function') ||
          ((h || M !== f) && Md(e, i, n, f)),
        (Rl = !1));
      var R = e.memoizedState;
      ((i.state = R),
        qa(e, n, i, u),
        Ha(),
        (M = e.memoizedState),
        h || R !== M || Rl
          ? (typeof G == 'function' && (Ns(e, l, G, n), (M = e.memoizedState)),
            (x = Rl || Cd(e, l, x, n, R, M, f))
              ? (U ||
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
            (n = x))
          : (typeof i.componentDidMount == 'function' && (e.flags |= 4194308), (n = !1)));
    } else {
      ((i = e.stateNode),
        ls(t, e),
        (f = e.memoizedProps),
        (U = hn(l, f)),
        (i.props = U),
        (G = e.pendingProps),
        (R = i.context),
        (M = l.contextType),
        (x = kn),
        typeof M == 'object' && M !== null && (x = ee(M)),
        (h = l.getDerivedStateFromProps),
        (M = typeof h == 'function' || typeof i.getSnapshotBeforeUpdate == 'function') ||
          (typeof i.UNSAFE_componentWillReceiveProps != 'function' &&
            typeof i.componentWillReceiveProps != 'function') ||
          ((f !== G || R !== x) && Md(e, i, n, x)),
        (Rl = !1),
        (R = e.memoizedState),
        (i.state = R),
        qa(e, n, i, u),
        Ha());
      var O = e.memoizedState;
      f !== G || R !== O || Rl || (t !== null && t.dependencies !== null && Ku(t.dependencies))
        ? (typeof h == 'function' && (Ns(e, l, h, n), (O = e.memoizedState)),
          (U =
            Rl ||
            Cd(e, l, U, n, R, O, x) ||
            (t !== null && t.dependencies !== null && Ku(t.dependencies)))
            ? (M ||
                (typeof i.UNSAFE_componentWillUpdate != 'function' &&
                  typeof i.componentWillUpdate != 'function') ||
                (typeof i.componentWillUpdate == 'function' && i.componentWillUpdate(n, O, x),
                typeof i.UNSAFE_componentWillUpdate == 'function' &&
                  i.UNSAFE_componentWillUpdate(n, O, x)),
              typeof i.componentDidUpdate == 'function' && (e.flags |= 4),
              typeof i.getSnapshotBeforeUpdate == 'function' && (e.flags |= 1024))
            : (typeof i.componentDidUpdate != 'function' ||
                (f === t.memoizedProps && R === t.memoizedState) ||
                (e.flags |= 4),
              typeof i.getSnapshotBeforeUpdate != 'function' ||
                (f === t.memoizedProps && R === t.memoizedState) ||
                (e.flags |= 1024),
              (e.memoizedProps = n),
              (e.memoizedState = O)),
          (i.props = n),
          (i.state = O),
          (i.context = x),
          (n = U))
        : (typeof i.componentDidUpdate != 'function' ||
            (f === t.memoizedProps && R === t.memoizedState) ||
            (e.flags |= 4),
          typeof i.getSnapshotBeforeUpdate != 'function' ||
            (f === t.memoizedProps && R === t.memoizedState) ||
            (e.flags |= 1024),
          (n = !1));
    }
    return (
      (i = n),
      di(t, e),
      (n = (e.flags & 128) !== 0),
      i || n
        ? ((i = e.stateNode),
          (l = n && typeof l.getDerivedStateFromError != 'function' ? null : i.render()),
          (e.flags |= 1),
          t !== null && n
            ? ((e.child = dn(e, t.child, null, u)), (e.child = dn(e, null, l, u)))
            : le(t, e, l, u),
          (e.memoizedState = i.state),
          (t = e.child))
        : (t = sl(t, e, u)),
      t
    );
  }
  function Xd(t, e, l, n) {
    return (un(), (e.flags |= 256), le(t, e, l, n), e.child);
  }
  var js = { dehydrated: null, treeContext: null, retryLane: 0, hydrationErrors: null };
  function zs(t) {
    return { baseLanes: t, cachePool: Of() };
  }
  function Os(t, e, l) {
    return ((t = t !== null ? t.childLanes & ~l : 0), e && (t |= Ne), t);
  }
  function Vd(t, e, l) {
    var n = e.pendingProps,
      u = !1,
      i = (e.flags & 128) !== 0,
      f;
    if (
      ((f = i) || (f = t !== null && t.memoizedState === null ? !1 : (Vt.current & 2) !== 0),
      f && ((u = !0), (e.flags &= -129)),
      (f = (e.flags & 32) !== 0),
      (e.flags &= -33),
      t === null)
    ) {
      if (gt) {
        if (
          (u ? Ol(e) : Dl(),
          (t = kt)
            ? ((t = Fm(t, we)),
              (t = t !== null && t.data !== '&' ? t : null),
              t !== null &&
                ((e.memoizedState = {
                  dehydrated: t,
                  treeContext: Nl !== null ? { id: Ke, overflow: $e } : null,
                  retryLane: 536870912,
                  hydrationErrors: null,
                }),
                (l = Ef(t)),
                (l.return = e),
                (e.child = l),
                (te = e),
                (kt = null)))
            : (t = null),
          t === null)
        )
          throw Cl(e);
        return (po(t) ? (e.lanes = 32) : (e.lanes = 536870912), null);
      }
      var h = n.children;
      return (
        (n = n.fallback),
        u
          ? (Dl(),
            (u = e.mode),
            (h = mi({ mode: 'hidden', children: h }, u)),
            (n = an(n, u, l, null)),
            (h.return = e),
            (n.return = e),
            (h.sibling = n),
            (e.child = h),
            (n = e.child),
            (n.memoizedState = zs(l)),
            (n.childLanes = Os(t, f, l)),
            (e.memoizedState = js),
            Qa(null, n))
          : (Ol(e), Ds(e, h))
      );
    }
    var x = t.memoizedState;
    if (x !== null && ((h = x.dehydrated), h !== null)) {
      if (i)
        e.flags & 256
          ? (Ol(e), (e.flags &= -257), (e = ks(t, e, l)))
          : e.memoizedState !== null
            ? (Dl(), (e.child = t.child), (e.flags |= 128), (e = null))
            : (Dl(),
              (h = n.fallback),
              (u = e.mode),
              (n = mi({ mode: 'visible', children: n.children }, u)),
              (h = an(h, u, l, null)),
              (h.flags |= 2),
              (n.return = e),
              (h.return = e),
              (n.sibling = h),
              (e.child = n),
              dn(e, t.child, null, l),
              (n = e.child),
              (n.memoizedState = zs(l)),
              (n.childLanes = Os(t, f, l)),
              (e.memoizedState = js),
              (e = Qa(null, n)));
      else if ((Ol(e), po(h))) {
        if (((f = h.nextSibling && h.nextSibling.dataset), f)) var M = f.dgst;
        ((f = M),
          (n = Error(s(419))),
          (n.stack = ''),
          (n.digest = f),
          Da({ value: n, source: null, stack: null }),
          (e = ks(t, e, l)));
      } else if (($t || Ln(t, e, l, !1), (f = (l & t.childLanes) !== 0), $t || f)) {
        if (((f = Ot), f !== null && ((n = Rr(f, l)), n !== 0 && n !== x.retryLane)))
          throw ((x.retryLane = n), nn(t, n), ye(f, t, n), Ms);
        (ho(h) || xi(), (e = ks(t, e, l)));
      } else
        ho(h)
          ? ((e.flags |= 192), (e.child = t.child), (e = null))
          : ((t = x.treeContext),
            (kt = Be(h.nextSibling)),
            (te = e),
            (gt = !0),
            (Al = null),
            (we = !1),
            t !== null && Af(e, t),
            (e = Ds(e, n.children)),
            (e.flags |= 4096));
      return e;
    }
    return u
      ? (Dl(),
        (h = n.fallback),
        (u = e.mode),
        (x = t.child),
        (M = x.sibling),
        (n = ll(x, { mode: 'hidden', children: n.children })),
        (n.subtreeFlags = x.subtreeFlags & 65011712),
        M !== null ? (h = ll(M, h)) : ((h = an(h, u, l, null)), (h.flags |= 2)),
        (h.return = e),
        (n.return = e),
        (n.sibling = h),
        (e.child = n),
        Qa(null, n),
        (n = e.child),
        (h = t.child.memoizedState),
        h === null
          ? (h = zs(l))
          : ((u = h.cachePool),
            u !== null
              ? ((x = Zt._currentValue), (u = u.parent !== x ? { parent: x, pool: x } : u))
              : (u = Of()),
            (h = { baseLanes: h.baseLanes | l, cachePool: u })),
        (n.memoizedState = h),
        (n.childLanes = Os(t, f, l)),
        (e.memoizedState = js),
        Qa(t.child, n))
      : (Ol(e),
        (l = t.child),
        (t = l.sibling),
        (l = ll(l, { mode: 'visible', children: n.children })),
        (l.return = e),
        (l.sibling = null),
        t !== null &&
          ((f = e.deletions), f === null ? ((e.deletions = [t]), (e.flags |= 16)) : f.push(t)),
        (e.child = l),
        (e.memoizedState = null),
        l);
  }
  function Ds(t, e) {
    return ((e = mi({ mode: 'visible', children: e }, t.mode)), (e.return = t), (t.child = e));
  }
  function mi(t, e) {
    return ((t = Se(22, t, null, e)), (t.lanes = 0), t);
  }
  function ks(t, e, l) {
    return (
      dn(e, t.child, null, l),
      (t = Ds(e, e.pendingProps.children)),
      (t.flags |= 2),
      (e.memoizedState = null),
      t
    );
  }
  function Qd(t, e, l) {
    t.lanes |= e;
    var n = t.alternate;
    (n !== null && (n.lanes |= e), Jc(t.return, e, l));
  }
  function ws(t, e, l, n, u, i) {
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
    var f = Vt.current,
      h = (f & 2) !== 0;
    if (
      (h ? ((f = (f & 1) | 2), (e.flags |= 128)) : (f &= 1),
      Z(Vt, f),
      le(t, e, n, l),
      (n = gt ? Oa : 0),
      !h && t !== null && (t.flags & 128) !== 0)
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
          ((t = l.alternate), t !== null && ei(t) === null && (u = l), (l = l.sibling));
        ((l = u),
          l === null ? ((u = e.child), (e.child = null)) : ((u = l.sibling), (l.sibling = null)),
          ws(e, !1, u, l, i, n));
        break;
      case 'backwards':
      case 'unstable_legacy-backwards':
        for (l = null, u = e.child, e.child = null; u !== null; ) {
          if (((t = u.alternate), t !== null && ei(t) === null)) {
            e.child = u;
            break;
          }
          ((t = u.sibling), (u.sibling = l), (l = u), (u = t));
        }
        ws(e, !0, l, null, i, n);
        break;
      case 'together':
        ws(e, !1, null, null, void 0, n);
        break;
      default:
        e.memoizedState = null;
    }
    return e.child;
  }
  function sl(t, e, l) {
    if (
      (t !== null && (e.dependencies = t.dependencies), (Ul |= e.lanes), (l & e.childLanes) === 0)
    )
      if (t !== null) {
        if ((Ln(t, e, l, !1), (l & e.childLanes) === 0)) return null;
      } else return null;
    if (t !== null && e.child !== t.child) throw Error(s(153));
    if (e.child !== null) {
      for (t = e.child, l = ll(t, t.pendingProps), e.child = l, l.return = e; t.sibling !== null; )
        ((t = t.sibling), (l = l.sibling = ll(t, t.pendingProps)), (l.return = e));
      l.sibling = null;
    }
    return e.child;
  }
  function Us(t, e) {
    return (t.lanes & e) !== 0 ? !0 : ((t = t.dependencies), !!(t !== null && Ku(t)));
  }
  function A0(t, e, l) {
    switch (e.tag) {
      case 3:
        (ie(e, e.stateNode.containerInfo), Ml(e, Zt, t.memoizedState.cache), un());
        break;
      case 27:
      case 5:
        ga(e);
        break;
      case 4:
        ie(e, e.stateNode.containerInfo);
        break;
      case 10:
        Ml(e, e.type, e.memoizedProps.value);
        break;
      case 31:
        if (e.memoizedState !== null) return ((e.flags |= 128), cs(e), null);
        break;
      case 13:
        var n = e.memoizedState;
        if (n !== null)
          return n.dehydrated !== null
            ? (Ol(e), (e.flags |= 128), null)
            : (l & e.child.childLanes) !== 0
              ? Vd(t, e, l)
              : (Ol(e), (t = sl(t, e, l)), t !== null ? t.sibling : null);
        Ol(e);
        break;
      case 19:
        var u = (t.flags & 128) !== 0;
        if (
          ((n = (l & e.childLanes) !== 0),
          n || (Ln(t, e, l, !1), (n = (l & e.childLanes) !== 0)),
          u)
        ) {
          if (n) return Zd(t, e, l);
          e.flags |= 128;
        }
        if (
          ((u = e.memoizedState),
          u !== null && ((u.rendering = null), (u.tail = null), (u.lastEffect = null)),
          Z(Vt, Vt.current),
          n)
        )
          break;
        return null;
      case 22:
        return ((e.lanes = 0), Ld(t, e, l, e.pendingProps));
      case 24:
        Ml(e, Zt, t.memoizedState.cache);
    }
    return sl(t, e, l);
  }
  function Kd(t, e, l) {
    if (t !== null)
      if (t.memoizedProps !== e.pendingProps) $t = !0;
      else {
        if (!Us(t, l) && (e.flags & 128) === 0) return (($t = !1), A0(t, e, l));
        $t = (t.flags & 131072) !== 0;
      }
    else (($t = !1), gt && (e.flags & 1048576) !== 0 && Nf(e, Oa, e.index));
    switch (((e.lanes = 0), e.tag)) {
      case 16:
        t: {
          var n = e.pendingProps;
          if (((t = rn(e.elementType)), (e.type = t), typeof t == 'function'))
            Gc(t)
              ? ((n = hn(t, n)), (e.tag = 1), (e = Yd(null, e, t, n, l)))
              : ((e.tag = 0), (e = Rs(null, e, t, n, l)));
          else {
            if (t != null) {
              var u = t.$$typeof;
              if (u === Y) {
                ((e.tag = 11), (e = wd(null, e, t, n, l)));
                break t;
              } else if (u === K) {
                ((e.tag = 14), (e = Ud(null, e, t, n, l)));
                break t;
              }
            }
            throw ((e = oe(t) || t), Error(s(306, e, '')));
          }
        }
        return e;
      case 0:
        return Rs(t, e, e.type, e.pendingProps, l);
      case 1:
        return ((n = e.type), (u = hn(n, e.pendingProps)), Yd(t, e, n, u, l));
      case 3:
        t: {
          if ((ie(e, e.stateNode.containerInfo), t === null)) throw Error(s(387));
          n = e.pendingProps;
          var i = e.memoizedState;
          ((u = i.element), ls(t, e), qa(e, n, null, l));
          var f = e.memoizedState;
          if (
            ((n = f.cache),
            Ml(e, Zt, n),
            n !== i.cache && Ic(e, [Zt], l, !0),
            Ha(),
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
              ((u = Oe(Error(s(424)), e)), Da(u), (e = Xd(t, e, n, l)));
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
                kt = Be(t.firstChild),
                  te = e,
                  gt = !0,
                  Al = null,
                  we = !0,
                  l = Lf(e, null, n, l),
                  e.child = l;
                l;
              )
                ((l.flags = (l.flags & -3) | 4096), (l = l.sibling));
            }
          else {
            if ((un(), n === u)) {
              e = sl(t, e, l);
              break t;
            }
            le(t, e, n, l);
          }
          e = e.child;
        }
        return e;
      case 26:
        return (
          di(t, e),
          t === null
            ? (l = ah(e.type, null, e.pendingProps, null))
              ? (e.memoizedState = l)
              : gt ||
                ((l = e.type),
                (t = e.pendingProps),
                (n = Ri(ft.current).createElement(l)),
                (n[Pt] = e),
                (n[re] = t),
                ne(n, l, t),
                Wt(n),
                (e.stateNode = n))
            : (e.memoizedState = ah(e.type, t.memoizedProps, e.pendingProps, t.memoizedState)),
          null
        );
      case 27:
        return (
          ga(e),
          t === null &&
            gt &&
            ((n = e.stateNode = eh(e.type, e.pendingProps, ft.current)),
            (te = e),
            (we = !0),
            (u = kt),
            Gl(e.type) ? ((yo = u), (kt = Be(n.firstChild))) : (kt = u)),
          le(t, e, e.pendingProps.children, l),
          di(t, e),
          t === null && (e.flags |= 4194304),
          e.child
        );
      case 5:
        return (
          t === null &&
            gt &&
            ((u = n = kt) &&
              ((n = lg(n, e.type, e.pendingProps, we)),
              n !== null
                ? ((e.stateNode = n), (te = e), (kt = Be(n.firstChild)), (we = !1), (u = !0))
                : (u = !1)),
            u || Cl(e)),
          ga(e),
          (u = e.type),
          (i = e.pendingProps),
          (f = t !== null ? t.memoizedProps : null),
          (n = i.children),
          ro(u, i) ? (n = null) : f !== null && ro(u, f) && (e.flags |= 32),
          e.memoizedState !== null && ((u = os(t, e, g0, null, null, l)), (iu._currentValue = u)),
          di(t, e),
          le(t, e, n, l),
          e.child
        );
      case 6:
        return (
          t === null &&
            gt &&
            ((t = l = kt) &&
              ((l = ng(l, e.pendingProps, we)),
              l !== null ? ((e.stateNode = l), (te = e), (kt = null), (t = !0)) : (t = !1)),
            t || Cl(e)),
          null
        );
      case 13:
        return Vd(t, e, l);
      case 4:
        return (
          ie(e, e.stateNode.containerInfo),
          (n = e.pendingProps),
          t === null ? (e.child = dn(e, null, n, l)) : le(t, e, n, l),
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
          sn(e),
          (u = ee(u)),
          (n = n(u)),
          (e.flags |= 1),
          le(t, e, n, l),
          e.child
        );
      case 14:
        return Ud(t, e, e.type, e.pendingProps, l);
      case 15:
        return Bd(t, e, e.type, e.pendingProps, l);
      case 19:
        return Zd(t, e, l);
      case 31:
        return N0(t, e, l);
      case 22:
        return Ld(t, e, l, e.pendingProps);
      case 24:
        return (
          sn(e),
          (n = ee(Zt)),
          t === null
            ? ((u = Pc()),
              u === null &&
                ((u = Ot),
                (i = Wc()),
                (u.pooledCache = i),
                i.refCount++,
                i !== null && (u.pooledCacheLanes |= l),
                (u = i)),
              (e.memoizedState = { parent: n, cache: u }),
              es(e),
              Ml(e, Zt, u))
            : ((t.lanes & l) !== 0 && (ls(t, e), qa(e, null, null, l), Ha()),
              (u = t.memoizedState),
              (i = e.memoizedState),
              u.parent !== n
                ? ((u = { parent: n, cache: n }),
                  (e.memoizedState = u),
                  e.lanes === 0 && (e.memoizedState = e.updateQueue.baseState = u),
                  Ml(e, Zt, n))
                : ((n = i.cache), Ml(e, Zt, n), n !== u.cache && Ic(e, [Zt], l, !0))),
          le(t, e, e.pendingProps.children, l),
          e.child
        );
      case 29:
        throw e.pendingProps;
    }
    throw Error(s(156, e.tag));
  }
  function ol(t) {
    t.flags |= 4;
  }
  function Bs(t, e, l, n, u) {
    if (((e = (t.mode & 32) !== 0) && (e = !1), e)) {
      if (((t.flags |= 16777216), (u & 335544128) === u))
        if (t.stateNode.complete) t.flags |= 8192;
        else if (bm()) t.flags |= 8192;
        else throw ((fn = Wu), ts);
    } else t.flags &= -16777217;
  }
  function $d(t, e) {
    if (e.type !== 'stylesheet' || (e.state.loading & 4) !== 0) t.flags &= -16777217;
    else if (((t.flags |= 16777216), !oh(e)))
      if (bm()) t.flags |= 8192;
      else throw ((fn = Wu), ts);
  }
  function hi(t, e) {
    (e !== null && (t.flags |= 4),
      t.flags & 16384 && ((e = t.tag !== 22 ? Ar() : 536870912), (t.lanes |= e), (In |= e)));
  }
  function Za(t, e) {
    if (!gt)
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
  function wt(t) {
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
  function C0(t, e, l) {
    var n = e.pendingProps;
    switch ((Qc(e), e.tag)) {
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return (wt(e), null);
      case 1:
        return (wt(e), null);
      case 3:
        return (
          (l = e.stateNode),
          (n = null),
          t !== null && (n = t.memoizedState.cache),
          e.memoizedState.cache !== n && (e.flags |= 2048),
          ul(Zt),
          Xt(),
          l.pendingContext && ((l.context = l.pendingContext), (l.pendingContext = null)),
          (t === null || t.child === null) &&
            (Bn(e)
              ? ol(e)
              : t === null ||
                (t.memoizedState.isDehydrated && (e.flags & 256) === 0) ||
                ((e.flags |= 1024), Kc())),
          wt(e),
          null
        );
      case 26:
        var u = e.type,
          i = e.memoizedState;
        return (
          t === null
            ? (ol(e), i !== null ? (wt(e), $d(e, i)) : (wt(e), Bs(e, u, null, n, l)))
            : i
              ? i !== t.memoizedState
                ? (ol(e), wt(e), $d(e, i))
                : (wt(e), (e.flags &= -16777217))
              : ((t = t.memoizedProps), t !== n && ol(e), wt(e), Bs(e, u, t, n, l)),
          null
        );
      case 27:
        if ((Nu(e), (l = ft.current), (u = e.type), t !== null && e.stateNode != null))
          t.memoizedProps !== n && ol(e);
        else {
          if (!n) {
            if (e.stateNode === null) throw Error(s(166));
            return (wt(e), null);
          }
          ((t = I.current), Bn(e) ? Cf(e) : ((t = eh(u, n, l)), (e.stateNode = t), ol(e)));
        }
        return (wt(e), null);
      case 5:
        if ((Nu(e), (u = e.type), t !== null && e.stateNode != null))
          t.memoizedProps !== n && ol(e);
        else {
          if (!n) {
            if (e.stateNode === null) throw Error(s(166));
            return (wt(e), null);
          }
          if (((i = I.current), Bn(e))) Cf(e);
          else {
            var f = Ri(ft.current);
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
            ((i[Pt] = e), (i[re] = n));
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
            n && ol(e);
          }
        }
        return (wt(e), Bs(e, e.type, t === null ? null : t.memoizedProps, e.pendingProps, l), null);
      case 6:
        if (t && e.stateNode != null) t.memoizedProps !== n && ol(e);
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
          } else ((t = Ri(t).createTextNode(n)), (t[Pt] = e), (e.stateNode = t));
        }
        return (wt(e), null);
      case 31:
        if (((l = e.memoizedState), t === null || t.memoizedState !== null)) {
          if (((n = Bn(e)), l !== null)) {
            if (t === null) {
              if (!n) throw Error(s(318));
              if (((t = e.memoizedState), (t = t !== null ? t.dehydrated : null), !t))
                throw Error(s(557));
              t[Pt] = e;
            } else (un(), (e.flags & 128) === 0 && (e.memoizedState = null), (e.flags |= 4));
            (wt(e), (t = !1));
          } else
            ((l = Kc()),
              t !== null && t.memoizedState !== null && (t.memoizedState.hydrationErrors = l),
              (t = !0));
          if (!t) return e.flags & 256 ? (Ee(e), e) : (Ee(e), null);
          if ((e.flags & 128) !== 0) throw Error(s(558));
        }
        return (wt(e), null);
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
            } else (un(), (e.flags & 128) === 0 && (e.memoizedState = null), (e.flags |= 4));
            (wt(e), (u = !1));
          } else
            ((u = Kc()),
              t !== null && t.memoizedState !== null && (t.memoizedState.hydrationErrors = u),
              (u = !0));
          if (!u) return e.flags & 256 ? (Ee(e), e) : (Ee(e), null);
        }
        return (
          Ee(e),
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
              hi(e, e.updateQueue),
              wt(e),
              null)
        );
      case 4:
        return (Xt(), t === null && uo(e.stateNode.containerInfo), wt(e), null);
      case 10:
        return (ul(e.type), wt(e), null);
      case 19:
        if ((D(Vt), (n = e.memoizedState), n === null)) return (wt(e), null);
        if (((u = (e.flags & 128) !== 0), (i = n.rendering), i === null))
          if (u) Za(n, !1);
          else {
            if (Yt !== 0 || (t !== null && (t.flags & 128) !== 0))
              for (t = e.child; t !== null; ) {
                if (((i = ei(t)), i !== null)) {
                  for (
                    e.flags |= 128,
                      Za(n, !1),
                      t = i.updateQueue,
                      e.updateQueue = t,
                      hi(e, t),
                      e.subtreeFlags = 0,
                      t = l,
                      l = e.child;
                    l !== null;
                  )
                    (xf(l, t), (l = l.sibling));
                  return (Z(Vt, (Vt.current & 1) | 2), gt && nl(e, n.treeForkCount), e.child);
                }
                t = t.sibling;
              }
            n.tail !== null &&
              ge() > _i &&
              ((e.flags |= 128), (u = !0), Za(n, !1), (e.lanes = 4194304));
          }
        else {
          if (!u)
            if (((t = ei(i)), t !== null)) {
              if (
                ((e.flags |= 128),
                (u = !0),
                (t = t.updateQueue),
                (e.updateQueue = t),
                hi(e, t),
                Za(n, !0),
                n.tail === null && n.tailMode === 'hidden' && !i.alternate && !gt)
              )
                return (wt(e), null);
            } else
              2 * ge() - n.renderingStartTime > _i &&
                l !== 536870912 &&
                ((e.flags |= 128), (u = !0), Za(n, !1), (e.lanes = 4194304));
          n.isBackwards
            ? ((i.sibling = e.child), (e.child = i))
            : ((t = n.last), t !== null ? (t.sibling = i) : (e.child = i), (n.last = i));
        }
        return n.tail !== null
          ? ((t = n.tail),
            (n.rendering = t),
            (n.tail = t.sibling),
            (n.renderingStartTime = ge()),
            (t.sibling = null),
            (l = Vt.current),
            Z(Vt, u ? (l & 1) | 2 : l & 1),
            gt && nl(e, n.treeForkCount),
            t)
          : (wt(e), null);
      case 22:
      case 23:
        return (
          Ee(e),
          is(),
          (n = e.memoizedState !== null),
          t !== null
            ? (t.memoizedState !== null) !== n && (e.flags |= 8192)
            : n && (e.flags |= 8192),
          n
            ? (l & 536870912) !== 0 &&
              (e.flags & 128) === 0 &&
              (wt(e), e.subtreeFlags & 6 && (e.flags |= 8192))
            : wt(e),
          (l = e.updateQueue),
          l !== null && hi(e, l.retryQueue),
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
          t !== null && D(on),
          null
        );
      case 24:
        return (
          (l = null),
          t !== null && (l = t.memoizedState.cache),
          e.memoizedState.cache !== l && (e.flags |= 2048),
          ul(Zt),
          wt(e),
          null
        );
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(s(156, e.tag));
  }
  function M0(t, e) {
    switch ((Qc(e), e.tag)) {
      case 1:
        return ((t = e.flags), t & 65536 ? ((e.flags = (t & -65537) | 128), e) : null);
      case 3:
        return (
          ul(Zt),
          Xt(),
          (t = e.flags),
          (t & 65536) !== 0 && (t & 128) === 0 ? ((e.flags = (t & -65537) | 128), e) : null
        );
      case 26:
      case 27:
      case 5:
        return (Nu(e), null);
      case 31:
        if (e.memoizedState !== null) {
          if ((Ee(e), e.alternate === null)) throw Error(s(340));
          un();
        }
        return ((t = e.flags), t & 65536 ? ((e.flags = (t & -65537) | 128), e) : null);
      case 13:
        if ((Ee(e), (t = e.memoizedState), t !== null && t.dehydrated !== null)) {
          if (e.alternate === null) throw Error(s(340));
          un();
        }
        return ((t = e.flags), t & 65536 ? ((e.flags = (t & -65537) | 128), e) : null);
      case 19:
        return (D(Vt), null);
      case 4:
        return (Xt(), null);
      case 10:
        return (ul(e.type), null);
      case 22:
      case 23:
        return (
          Ee(e),
          is(),
          t !== null && D(on),
          (t = e.flags),
          t & 65536 ? ((e.flags = (t & -65537) | 128), e) : null
        );
      case 24:
        return (ul(Zt), null);
      case 25:
        return null;
      default:
        return null;
    }
  }
  function Jd(t, e) {
    switch ((Qc(e), e.tag)) {
      case 3:
        (ul(Zt), Xt());
        break;
      case 26:
      case 27:
      case 5:
        Nu(e);
        break;
      case 4:
        Xt();
        break;
      case 31:
        e.memoizedState !== null && Ee(e);
        break;
      case 13:
        Ee(e);
        break;
      case 19:
        D(Vt);
        break;
      case 10:
        ul(e.type);
        break;
      case 22:
      case 23:
        (Ee(e), is(), t !== null && D(on));
        break;
      case 24:
        ul(Zt);
    }
  }
  function Ka(t, e) {
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
    } catch (h) {
      Ct(e, e.return, h);
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
              h = f.destroy;
            if (h !== void 0) {
              ((f.destroy = void 0), (u = e));
              var x = l,
                M = h;
              try {
                M();
              } catch (U) {
                Ct(u, x, U);
              }
            }
          }
          n = n.next;
        } while (n !== i);
      }
    } catch (U) {
      Ct(e, e.return, U);
    }
  }
  function Id(t) {
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
  function Wd(t, e, l) {
    ((l.props = hn(t.type, t.memoizedProps)), (l.state = t.memoizedState));
    try {
      l.componentWillUnmount();
    } catch (n) {
      Ct(t, e, n);
    }
  }
  function $a(t, e) {
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
  function Je(t, e) {
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
  function Ls(t, e, l) {
    try {
      var n = t.stateNode;
      (I0(n, t.type, l, e), (n[re] = e));
    } catch (u) {
      Ct(t, t.return, u);
    }
  }
  function Pd(t) {
    return (
      t.tag === 5 || t.tag === 3 || t.tag === 26 || (t.tag === 27 && Gl(t.type)) || t.tag === 4
    );
  }
  function Hs(t) {
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
  function qs(t, e, l) {
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
            l != null || e.onclick !== null || (e.onclick = tl)));
    else if (
      n !== 4 &&
      (n === 27 && Gl(t.type) && ((l = t.stateNode), (e = null)), (t = t.child), t !== null)
    )
      for (qs(t, e, l), t = t.sibling; t !== null; ) (qs(t, e, l), (t = t.sibling));
  }
  function pi(t, e, l) {
    var n = t.tag;
    if (n === 5 || n === 6) ((t = t.stateNode), e ? l.insertBefore(t, e) : l.appendChild(t));
    else if (n !== 4 && (n === 27 && Gl(t.type) && (l = t.stateNode), (t = t.child), t !== null))
      for (pi(t, e, l), t = t.sibling; t !== null; ) (pi(t, e, l), (t = t.sibling));
  }
  function tm(t) {
    var e = t.stateNode,
      l = t.memoizedProps;
    try {
      for (var n = t.type, u = e.attributes; u.length; ) e.removeAttributeNode(u[0]);
      (ne(e, n, l), (e[Pt] = t), (e[re] = l));
    } catch (i) {
      Ct(t, t.return, i);
    }
  }
  var rl = !1,
    Jt = !1,
    Gs = !1,
    em = typeof WeakSet == 'function' ? WeakSet : Set,
    Ft = null;
  function R0(t, e) {
    if (((t = t.containerInfo), (so = Ui), (t = mf(t)), kc(t))) {
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
              h = -1,
              x = -1,
              M = 0,
              U = 0,
              G = t,
              R = null;
            e: for (;;) {
              for (
                var O;
                G !== l || (u !== 0 && G.nodeType !== 3) || (h = f + u),
                  G !== i || (n !== 0 && G.nodeType !== 3) || (x = f + n),
                  G.nodeType === 3 && (f += G.nodeValue.length),
                  (O = G.firstChild) !== null;
              )
                ((R = G), (G = O));
              for (;;) {
                if (G === t) break e;
                if (
                  (R === l && ++M === u && (h = f),
                  R === i && ++U === n && (x = f),
                  (O = G.nextSibling) !== null)
                )
                  break;
                ((G = R), (R = G.parentNode));
              }
              G = O;
            }
            l = h === -1 || x === -1 ? null : { start: h, end: x };
          } else l = null;
        }
      l = l || { start: 0, end: 0 };
    } else l = null;
    for (oo = { focusedElem: t, selectionRange: l }, Ui = !1, Ft = e; Ft !== null; )
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
                  var F = hn(l.type, u);
                  ((t = n.getSnapshotBeforeUpdate(F, i)),
                    (n.__reactInternalSnapshotBeforeUpdate = t));
                } catch (at) {
                  Ct(l, l.return, at);
                }
              }
              break;
            case 3:
              if ((t & 1024) !== 0) {
                if (((t = e.stateNode.containerInfo), (l = t.nodeType), l === 9)) mo(t);
                else if (l === 1)
                  switch (t.nodeName) {
                    case 'HEAD':
                    case 'HTML':
                    case 'BODY':
                      mo(t);
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
        (dl(t, l), n & 4 && Ka(5, l));
        break;
      case 1:
        if ((dl(t, l), n & 4))
          if (((t = l.stateNode), e === null))
            try {
              t.componentDidMount();
            } catch (f) {
              Ct(l, l.return, f);
            }
          else {
            var u = hn(l.type, e.memoizedProps);
            e = e.memoizedState;
            try {
              t.componentDidUpdate(u, e, t.__reactInternalSnapshotBeforeUpdate);
            } catch (f) {
              Ct(l, l.return, f);
            }
          }
        (n & 64 && Id(l), n & 512 && $a(l, l.return));
        break;
      case 3:
        if ((dl(t, l), n & 64 && ((t = l.updateQueue), t !== null))) {
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
        (dl(t, l), e === null && n & 4 && Fd(l), n & 512 && $a(l, l.return));
        break;
      case 12:
        dl(t, l);
        break;
      case 31:
        (dl(t, l), n & 4 && um(t, l));
        break;
      case 13:
        (dl(t, l),
          n & 4 && im(t, l),
          n & 64 &&
            ((t = l.memoizedState),
            t !== null && ((t = t.dehydrated), t !== null && ((l = L0.bind(null, l)), ag(t, l)))));
        break;
      case 22:
        if (((n = l.memoizedState !== null || rl), !n)) {
          ((e = (e !== null && e.memoizedState !== null) || Jt), (u = rl));
          var i = Jt;
          ((rl = n),
            (Jt = e) && !i ? ml(t, l, (l.subtreeFlags & 8772) !== 0) : dl(t, l),
            (rl = u),
            (Jt = i));
        }
        break;
      case 30:
        break;
      default:
        dl(t, l);
    }
  }
  function nm(t) {
    var e = t.alternate;
    (e !== null && ((t.alternate = null), nm(e)),
      (t.child = null),
      (t.deletions = null),
      (t.sibling = null),
      t.tag === 5 && ((e = t.stateNode), e !== null && gc(e)),
      (t.stateNode = null),
      (t.return = null),
      (t.dependencies = null),
      (t.memoizedProps = null),
      (t.memoizedState = null),
      (t.pendingProps = null),
      (t.stateNode = null),
      (t.updateQueue = null));
  }
  var Ut = null,
    de = !1;
  function fl(t, e, l) {
    for (l = l.child; l !== null; ) (am(t, e, l), (l = l.sibling));
  }
  function am(t, e, l) {
    if (ve && typeof ve.onCommitFiberUnmount == 'function')
      try {
        ve.onCommitFiberUnmount(va, l);
      } catch {}
    switch (l.tag) {
      case 26:
        (Jt || Je(l, e),
          fl(t, e, l),
          l.memoizedState
            ? l.memoizedState.count--
            : l.stateNode && ((l = l.stateNode), l.parentNode.removeChild(l)));
        break;
      case 27:
        Jt || Je(l, e);
        var n = Ut,
          u = de;
        (Gl(l.type) && ((Ut = l.stateNode), (de = !1)),
          fl(t, e, l),
          nu(l.stateNode),
          (Ut = n),
          (de = u));
        break;
      case 5:
        Jt || Je(l, e);
      case 6:
        if (((n = Ut), (u = de), (Ut = null), fl(t, e, l), (Ut = n), (de = u), Ut !== null))
          if (de)
            try {
              (Ut.nodeType === 9
                ? Ut.body
                : Ut.nodeName === 'HTML'
                  ? Ut.ownerDocument.body
                  : Ut
              ).removeChild(l.stateNode);
            } catch (i) {
              Ct(l, e, i);
            }
          else
            try {
              Ut.removeChild(l.stateNode);
            } catch (i) {
              Ct(l, e, i);
            }
        break;
      case 18:
        Ut !== null &&
          (de
            ? ((t = Ut),
              Im(
                t.nodeType === 9 ? t.body : t.nodeName === 'HTML' ? t.ownerDocument.body : t,
                l.stateNode
              ),
              aa(t))
            : Im(Ut, l.stateNode));
        break;
      case 4:
        ((n = Ut),
          (u = de),
          (Ut = l.stateNode.containerInfo),
          (de = !0),
          fl(t, e, l),
          (Ut = n),
          (de = u));
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        (kl(2, l, e), Jt || kl(4, l, e), fl(t, e, l));
        break;
      case 1:
        (Jt ||
          (Je(l, e), (n = l.stateNode), typeof n.componentWillUnmount == 'function' && Wd(l, e, n)),
          fl(t, e, l));
        break;
      case 21:
        fl(t, e, l);
        break;
      case 22:
        ((Jt = (n = Jt) || l.memoizedState !== null), fl(t, e, l), (Jt = n));
        break;
      default:
        fl(t, e, l);
    }
  }
  function um(t, e) {
    if (
      e.memoizedState === null &&
      ((t = e.alternate), t !== null && ((t = t.memoizedState), t !== null))
    ) {
      t = t.dehydrated;
      try {
        aa(t);
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
        aa(t);
      } catch (l) {
        Ct(e, e.return, l);
      }
  }
  function j0(t) {
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
    var l = j0(t);
    e.forEach(function (n) {
      if (!l.has(n)) {
        l.add(n);
        var u = H0.bind(null, t, n);
        n.then(u, u);
      }
    });
  }
  function me(t, e) {
    var l = e.deletions;
    if (l !== null)
      for (var n = 0; n < l.length; n++) {
        var u = l[n],
          i = t,
          f = e,
          h = f;
        t: for (; h !== null; ) {
          switch (h.tag) {
            case 27:
              if (Gl(h.type)) {
                ((Ut = h.stateNode), (de = !1));
                break t;
              }
              break;
            case 5:
              ((Ut = h.stateNode), (de = !1));
              break t;
            case 3:
            case 4:
              ((Ut = h.stateNode.containerInfo), (de = !0));
              break t;
          }
          h = h.return;
        }
        if (Ut === null) throw Error(s(160));
        (am(i, f, u),
          (Ut = null),
          (de = !1),
          (i = u.alternate),
          i !== null && (i.return = null),
          (u.return = null));
      }
    if (e.subtreeFlags & 13886) for (e = e.child; e !== null; ) (cm(e, t), (e = e.sibling));
  }
  var Ge = null;
  function cm(t, e) {
    var l = t.alternate,
      n = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        (me(e, t), he(t), n & 4 && (kl(3, t, t.return), Ka(3, t), kl(5, t, t.return)));
        break;
      case 1:
        (me(e, t),
          he(t),
          n & 512 && (Jt || l === null || Je(l, l.return)),
          n & 64 &&
            rl &&
            ((t = t.updateQueue),
            t !== null &&
              ((n = t.callbacks),
              n !== null &&
                ((l = t.shared.hiddenCallbacks),
                (t.shared.hiddenCallbacks = l === null ? n : l.concat(n))))));
        break;
      case 26:
        var u = Ge;
        if ((me(e, t), he(t), n & 512 && (Jt || l === null || Je(l, l.return)), n & 4)) {
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
                          i[Sa] ||
                          i[Pt] ||
                          i.namespaceURI === 'http://www.w3.org/2000/svg' ||
                          i.hasAttribute('itemprop')) &&
                          ((i = u.createElement(n)),
                          u.head.insertBefore(i, u.querySelector('head > title'))),
                        ne(i, n, l),
                        (i[Pt] = t),
                        Wt(i),
                        (n = i));
                      break t;
                    case 'link':
                      var f = ch('link', 'href', u).get(n + (l.href || ''));
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
                      ((i = u.createElement(n)), ne(i, n, l), u.head.appendChild(i));
                      break;
                    case 'meta':
                      if ((f = ch('meta', 'content', u).get(n + (l.content || '')))) {
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
                      ((i = u.createElement(n)), ne(i, n, l), u.head.appendChild(i));
                      break;
                    default:
                      throw Error(s(468, n));
                  }
                  ((i[Pt] = t), Wt(i), (n = i));
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
              : n === null && t.stateNode !== null && Ls(t, t.memoizedProps, l.memoizedProps);
        }
        break;
      case 27:
        (me(e, t),
          he(t),
          n & 512 && (Jt || l === null || Je(l, l.return)),
          l !== null && n & 4 && Ls(t, t.memoizedProps, l.memoizedProps));
        break;
      case 5:
        if ((me(e, t), he(t), n & 512 && (Jt || l === null || Je(l, l.return)), t.flags & 32)) {
          u = t.stateNode;
          try {
            Cn(u, '');
          } catch (F) {
            Ct(t, t.return, F);
          }
        }
        (n & 4 &&
          t.stateNode != null &&
          ((u = t.memoizedProps), Ls(t, u, l !== null ? l.memoizedProps : u)),
          n & 1024 && (Gs = !0));
        break;
      case 6:
        if ((me(e, t), he(t), n & 4)) {
          if (t.stateNode === null) throw Error(s(162));
          ((n = t.memoizedProps), (l = t.stateNode));
          try {
            l.nodeValue = n;
          } catch (F) {
            Ct(t, t.return, F);
          }
        }
        break;
      case 3:
        if (
          ((Oi = null),
          (u = Ge),
          (Ge = ji(e.containerInfo)),
          me(e, t),
          (Ge = u),
          he(t),
          n & 4 && l !== null && l.memoizedState.isDehydrated)
        )
          try {
            aa(e.containerInfo);
          } catch (F) {
            Ct(t, t.return, F);
          }
        Gs && ((Gs = !1), sm(t));
        break;
      case 4:
        ((n = Ge), (Ge = ji(t.stateNode.containerInfo)), me(e, t), he(t), (Ge = n));
        break;
      case 12:
        (me(e, t), he(t));
        break;
      case 31:
        (me(e, t),
          he(t),
          n & 4 && ((n = t.updateQueue), n !== null && ((t.updateQueue = null), yi(t, n))));
        break;
      case 13:
        (me(e, t),
          he(t),
          t.child.flags & 8192 &&
            (t.memoizedState !== null) != (l !== null && l.memoizedState !== null) &&
            (vi = ge()),
          n & 4 && ((n = t.updateQueue), n !== null && ((t.updateQueue = null), yi(t, n))));
        break;
      case 22:
        u = t.memoizedState !== null;
        var x = l !== null && l.memoizedState !== null,
          M = rl,
          U = Jt;
        if (((rl = M || u), (Jt = U || x), me(e, t), (Jt = U), (rl = M), he(t), n & 8192))
          t: for (
            e = t.stateNode,
              e._visibility = u ? e._visibility & -2 : e._visibility | 1,
              u && (l === null || x || rl || Jt || pn(t)),
              l = null,
              e = t;
            ;
          ) {
            if (e.tag === 5 || e.tag === 26) {
              if (l === null) {
                x = l = e;
                try {
                  if (((i = x.stateNode), u))
                    ((f = i.style),
                      typeof f.setProperty == 'function'
                        ? f.setProperty('display', 'none', 'important')
                        : (f.display = 'none'));
                  else {
                    h = x.stateNode;
                    var G = x.memoizedProps.style,
                      R = G != null && G.hasOwnProperty('display') ? G.display : null;
                    h.style.display = R == null || typeof R == 'boolean' ? '' : ('' + R).trim();
                  }
                } catch (F) {
                  Ct(x, x.return, F);
                }
              }
            } else if (e.tag === 6) {
              if (l === null) {
                x = e;
                try {
                  x.stateNode.nodeValue = u ? '' : x.memoizedProps;
                } catch (F) {
                  Ct(x, x.return, F);
                }
              }
            } else if (e.tag === 18) {
              if (l === null) {
                x = e;
                try {
                  var O = x.stateNode;
                  u ? Wm(O, !0) : Wm(x.stateNode, !1);
                } catch (F) {
                  Ct(x, x.return, F);
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
        (me(e, t),
          he(t),
          n & 4 && ((n = t.updateQueue), n !== null && ((t.updateQueue = null), yi(t, n))));
        break;
      case 30:
        break;
      case 21:
        break;
      default:
        (me(e, t), he(t));
    }
  }
  function he(t) {
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
              i = Hs(t);
            pi(t, i, u);
            break;
          case 5:
            var f = l.stateNode;
            l.flags & 32 && (Cn(f, ''), (l.flags &= -33));
            var h = Hs(t);
            pi(t, h, f);
            break;
          case 3:
          case 4:
            var x = l.stateNode.containerInfo,
              M = Hs(t);
            qs(t, M, x);
            break;
          default:
            throw Error(s(161));
        }
      } catch (U) {
        Ct(t, t.return, U);
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
  function dl(t, e) {
    if (e.subtreeFlags & 8772)
      for (e = e.child; e !== null; ) (lm(t, e.alternate, e), (e = e.sibling));
  }
  function pn(t) {
    for (t = t.child; t !== null; ) {
      var e = t;
      switch (e.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          (kl(4, e, e.return), pn(e));
          break;
        case 1:
          Je(e, e.return);
          var l = e.stateNode;
          (typeof l.componentWillUnmount == 'function' && Wd(e, e.return, l), pn(e));
          break;
        case 27:
          nu(e.stateNode);
        case 26:
        case 5:
          (Je(e, e.return), pn(e));
          break;
        case 22:
          e.memoizedState === null && pn(e);
          break;
        case 30:
          pn(e);
          break;
        default:
          pn(e);
      }
      t = t.sibling;
    }
  }
  function ml(t, e, l) {
    for (l = l && (e.subtreeFlags & 8772) !== 0, e = e.child; e !== null; ) {
      var n = e.alternate,
        u = t,
        i = e,
        f = i.flags;
      switch (i.tag) {
        case 0:
        case 11:
        case 15:
          (ml(u, i, l), Ka(4, i));
          break;
        case 1:
          if ((ml(u, i, l), (n = i), (u = n.stateNode), typeof u.componentDidMount == 'function'))
            try {
              u.componentDidMount();
            } catch (M) {
              Ct(n, n.return, M);
            }
          if (((n = i), (u = n.updateQueue), u !== null)) {
            var h = n.stateNode;
            try {
              var x = u.shared.hiddenCallbacks;
              if (x !== null)
                for (u.shared.hiddenCallbacks = null, u = 0; u < x.length; u++) Hf(x[u], h);
            } catch (M) {
              Ct(n, n.return, M);
            }
          }
          (l && f & 64 && Id(i), $a(i, i.return));
          break;
        case 27:
          tm(i);
        case 26:
        case 5:
          (ml(u, i, l), l && n === null && f & 4 && Fd(i), $a(i, i.return));
          break;
        case 12:
          ml(u, i, l);
          break;
        case 31:
          (ml(u, i, l), l && f & 4 && um(u, i));
          break;
        case 13:
          (ml(u, i, l), l && f & 4 && im(u, i));
          break;
        case 22:
          (i.memoizedState === null && ml(u, i, l), $a(i, i.return));
          break;
        case 30:
          break;
        default:
          ml(u, i, l);
      }
      e = e.sibling;
    }
  }
  function Ys(t, e) {
    var l = null;
    (t !== null &&
      t.memoizedState !== null &&
      t.memoizedState.cachePool !== null &&
      (l = t.memoizedState.cachePool.pool),
      (t = null),
      e.memoizedState !== null &&
        e.memoizedState.cachePool !== null &&
        (t = e.memoizedState.cachePool.pool),
      t !== l && (t != null && t.refCount++, l != null && ka(l)));
  }
  function Xs(t, e) {
    ((t = null),
      e.alternate !== null && (t = e.alternate.memoizedState.cache),
      (e = e.memoizedState.cache),
      e !== t && (e.refCount++, t != null && ka(t)));
  }
  function Ye(t, e, l, n) {
    if (e.subtreeFlags & 10256) for (e = e.child; e !== null; ) (om(t, e, l, n), (e = e.sibling));
  }
  function om(t, e, l, n) {
    var u = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        (Ye(t, e, l, n), u & 2048 && Ka(9, e));
        break;
      case 1:
        Ye(t, e, l, n);
        break;
      case 3:
        (Ye(t, e, l, n),
          u & 2048 &&
            ((t = null),
            e.alternate !== null && (t = e.alternate.memoizedState.cache),
            (e = e.memoizedState.cache),
            e !== t && (e.refCount++, t != null && ka(t))));
        break;
      case 12:
        if (u & 2048) {
          (Ye(t, e, l, n), (t = e.stateNode));
          try {
            var i = e.memoizedProps,
              f = i.id,
              h = i.onPostCommit;
            typeof h == 'function' &&
              h(f, e.alternate === null ? 'mount' : 'update', t.passiveEffectDuration, -0);
          } catch (x) {
            Ct(e, e.return, x);
          }
        } else Ye(t, e, l, n);
        break;
      case 31:
        Ye(t, e, l, n);
        break;
      case 13:
        Ye(t, e, l, n);
        break;
      case 23:
        break;
      case 22:
        ((i = e.stateNode),
          (f = e.alternate),
          e.memoizedState !== null
            ? i._visibility & 2
              ? Ye(t, e, l, n)
              : Ja(t, e)
            : i._visibility & 2
              ? Ye(t, e, l, n)
              : ((i._visibility |= 2), Kn(t, e, l, n, (e.subtreeFlags & 10256) !== 0 || !1)),
          u & 2048 && Ys(f, e));
        break;
      case 24:
        (Ye(t, e, l, n), u & 2048 && Xs(e.alternate, e));
        break;
      default:
        Ye(t, e, l, n);
    }
  }
  function Kn(t, e, l, n, u) {
    for (u = u && ((e.subtreeFlags & 10256) !== 0 || !1), e = e.child; e !== null; ) {
      var i = t,
        f = e,
        h = l,
        x = n,
        M = f.flags;
      switch (f.tag) {
        case 0:
        case 11:
        case 15:
          (Kn(i, f, h, x, u), Ka(8, f));
          break;
        case 23:
          break;
        case 22:
          var U = f.stateNode;
          (f.memoizedState !== null
            ? U._visibility & 2
              ? Kn(i, f, h, x, u)
              : Ja(i, f)
            : ((U._visibility |= 2), Kn(i, f, h, x, u)),
            u && M & 2048 && Ys(f.alternate, f));
          break;
        case 24:
          (Kn(i, f, h, x, u), u && M & 2048 && Xs(f.alternate, f));
          break;
        default:
          Kn(i, f, h, x, u);
      }
      e = e.sibling;
    }
  }
  function Ja(t, e) {
    if (e.subtreeFlags & 10256)
      for (e = e.child; e !== null; ) {
        var l = t,
          n = e,
          u = n.flags;
        switch (n.tag) {
          case 22:
            (Ja(l, n), u & 2048 && Ys(n.alternate, n));
            break;
          case 24:
            (Ja(l, n), u & 2048 && Xs(n.alternate, n));
            break;
          default:
            Ja(l, n);
        }
        e = e.sibling;
      }
  }
  var Ia = 8192;
  function $n(t, e, l) {
    if (t.subtreeFlags & Ia) for (t = t.child; t !== null; ) (rm(t, e, l), (t = t.sibling));
  }
  function rm(t, e, l) {
    switch (t.tag) {
      case 26:
        ($n(t, e, l),
          t.flags & Ia && t.memoizedState !== null && yg(l, Ge, t.memoizedState, t.memoizedProps));
        break;
      case 5:
        $n(t, e, l);
        break;
      case 3:
      case 4:
        var n = Ge;
        ((Ge = ji(t.stateNode.containerInfo)), $n(t, e, l), (Ge = n));
        break;
      case 22:
        t.memoizedState === null &&
          ((n = t.alternate),
          n !== null && n.memoizedState !== null
            ? ((n = Ia), (Ia = 16777216), $n(t, e, l), (Ia = n))
            : $n(t, e, l));
        break;
      default:
        $n(t, e, l);
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
  function Wa(t) {
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
        (Wa(t), t.flags & 2048 && kl(9, t, t.return));
        break;
      case 3:
        Wa(t);
        break;
      case 12:
        Wa(t);
        break;
      case 22:
        var e = t.stateNode;
        t.memoizedState !== null && e._visibility & 2 && (t.return === null || t.return.tag !== 13)
          ? ((e._visibility &= -3), gi(t))
          : Wa(t);
        break;
      default:
        Wa(t);
    }
  }
  function gi(t) {
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
          (kl(8, e, e.return), gi(e));
          break;
        case 22:
          ((l = e.stateNode), l._visibility & 2 && ((l._visibility &= -3), gi(e)));
          break;
        default:
          gi(e);
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
          ka(l.memoizedState.cache);
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
  var z0 = {
      getCacheForType: function (t) {
        var e = ee(Zt),
          l = e.data.get(t);
        return (l === void 0 && ((l = t()), e.data.set(t, l)), l);
      },
      cacheSignal: function () {
        return ee(Zt).controller.signal;
      },
    },
    O0 = typeof WeakMap == 'function' ? WeakMap : Map,
    xt = 0,
    Ot = null,
    dt = null,
    ht = 0,
    At = 0,
    Te = null,
    wl = !1,
    Jn = !1,
    Vs = !1,
    hl = 0,
    Yt = 0,
    Ul = 0,
    yn = 0,
    Qs = 0,
    Ne = 0,
    In = 0,
    Fa = null,
    pe = null,
    Zs = !1,
    vi = 0,
    hm = 0,
    _i = 1 / 0,
    bi = null,
    Bl = null,
    It = 0,
    Ll = null,
    Wn = null,
    pl = 0,
    Ks = 0,
    $s = null,
    pm = null,
    Pa = 0,
    Js = null;
  function Ae() {
    return (xt & 2) !== 0 && ht !== 0 ? ht & -ht : B.T !== null ? eo() : jr();
  }
  function ym() {
    if (Ne === 0)
      if ((ht & 536870912) === 0 || gt) {
        var t = Mu;
        ((Mu <<= 1), (Mu & 3932160) === 0 && (Mu = 262144), (Ne = t));
      } else Ne = 536870912;
    return ((t = xe.current), t !== null && (t.flags |= 32), Ne);
  }
  function ye(t, e, l) {
    (((t === Ot && (At === 2 || At === 9)) || t.cancelPendingCommit !== null) &&
      (Fn(t, 0), Hl(t, ht, Ne, !1)),
      ba(t, l),
      ((xt & 2) === 0 || t !== Ot) &&
        (t === Ot && ((xt & 2) === 0 && (yn |= l), Yt === 4 && Hl(t, ht, Ne, !1)), Ie(t)));
  }
  function gm(t, e, l) {
    if ((xt & 6) !== 0) throw Error(s(327));
    var n = (!l && (e & 127) === 0 && (e & t.expiredLanes) === 0) || _a(t, e),
      u = n ? w0(t, e) : Ws(t, e, !0),
      i = n;
    do {
      if (u === 0) {
        Jn && !n && Hl(t, e, 0, !1);
        break;
      } else {
        if (((l = t.current.alternate), i && !D0(l))) {
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
              var h = t;
              u = Fa;
              var x = h.current.memoizedState.isDehydrated;
              if ((x && (Fn(h, f).flags |= 256), (f = Ws(h, f, !1)), f !== 2)) {
                if (Vs && !x) {
                  ((h.errorRecoveryDisabledLanes |= i), (yn |= i), (u = 4));
                  break t;
                }
                ((i = pe), (pe = u), i !== null && (pe === null ? (pe = i) : pe.push.apply(pe, i)));
              }
              u = f;
            }
            if (((i = !1), u !== 2)) continue;
          }
        }
        if (u === 1) {
          (Fn(t, 0), Hl(t, e, 0, !0));
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
              Hl(n, e, Ne, !wl);
              break t;
            case 2:
              pe = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(s(329));
          }
          if ((e & 62914560) === e && ((u = vi + 300 - ge()), 10 < u)) {
            if ((Hl(n, e, Ne, !wl), ju(n, 0, !0) !== 0)) break t;
            ((pl = e),
              (n.timeoutHandle = $m(
                vm.bind(null, n, l, pe, bi, Zs, e, Ne, yn, In, wl, i, 'Throttled', -0, 0),
                u
              )));
            break t;
          }
          vm(n, l, pe, bi, Zs, e, Ne, yn, In, wl, i, null, -0, 0);
        }
      }
      break;
    } while (!0);
    Ie(t);
  }
  function vm(t, e, l, n, u, i, f, h, x, M, U, G, R, O) {
    if (((t.timeoutHandle = -1), (G = e.subtreeFlags), G & 8192 || (G & 16785408) === 16785408)) {
      ((G = {
        stylesheets: null,
        count: 0,
        imgCount: 0,
        imgBytes: 0,
        suspenseyImages: [],
        waitingForImages: !0,
        waitingForViewTransition: !1,
        unsuspend: tl,
      }),
        rm(e, i, G));
      var F = (i & 62914560) === i ? vi - ge() : (i & 4194048) === i ? hm - ge() : 0;
      if (((F = gg(G, F)), F !== null)) {
        ((pl = i),
          (t.cancelPendingCommit = F(Am.bind(null, t, e, i, l, n, u, f, h, x, U, G, null, R, O))),
          Hl(t, i, f, !M));
        return;
      }
    }
    Am(t, e, i, l, n, u, f, h, x);
  }
  function D0(t) {
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
            if (!be(i(), u)) return !1;
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
    ((e &= ~Qs),
      (e &= ~yn),
      (t.suspendedLanes |= e),
      (t.pingedLanes &= ~e),
      n && (t.warmLanes |= e),
      (n = t.expirationTimes));
    for (var u = e; 0 < u; ) {
      var i = 31 - _e(u),
        f = 1 << i;
      ((n[i] = -1), (u &= ~f));
    }
    l !== 0 && Cr(t, l, e);
  }
  function Si() {
    return (xt & 6) === 0 ? (tu(0), !1) : !0;
  }
  function Is() {
    if (dt !== null) {
      if (At === 0) var t = dt.return;
      else ((t = dt), (al = cn = null), ds(t), (Yn = null), (Ua = 0), (t = dt));
      for (; t !== null; ) (Jd(t.alternate, t), (t = t.return));
      dt = null;
    }
  }
  function Fn(t, e) {
    var l = t.timeoutHandle;
    (l !== -1 && ((t.timeoutHandle = -1), P0(l)),
      (l = t.cancelPendingCommit),
      l !== null && ((t.cancelPendingCommit = null), l()),
      (pl = 0),
      Is(),
      (Ot = t),
      (dt = l = ll(t.current, null)),
      (ht = e),
      (At = 0),
      (Te = null),
      (wl = !1),
      (Jn = _a(t, e)),
      (Vs = !1),
      (In = Ne = Qs = yn = Ul = Yt = 0),
      (pe = Fa = null),
      (Zs = !1),
      (e & 8) !== 0 && (e |= e & 32));
    var n = t.entangledLanes;
    if (n !== 0)
      for (t = t.entanglements, n &= e; 0 < n; ) {
        var u = 31 - _e(n),
          i = 1 << u;
        ((e |= t[u]), (n &= ~i));
      }
    return ((hl = e), Yu(), l);
  }
  function _m(t, e) {
    ((ot = null),
      (B.H = Va),
      e === Gn || e === Iu
        ? ((e = wf()), (At = 3))
        : e === ts
          ? ((e = wf()), (At = 4))
          : (At =
              e === Ms
                ? 8
                : e !== null && typeof e == 'object' && typeof e.then == 'function'
                  ? 6
                  : 1),
      (Te = e),
      dt === null && ((Yt = 1), ri(t, Oe(e, t.current))));
  }
  function bm() {
    var t = xe.current;
    return t === null
      ? !0
      : (ht & 4194048) === ht
        ? Ue === null
        : (ht & 62914560) === ht || (ht & 536870912) !== 0
          ? t === Ue
          : !1;
  }
  function Sm() {
    var t = B.H;
    return ((B.H = Va), t === null ? Va : t);
  }
  function xm() {
    var t = B.A;
    return ((B.A = z0), t);
  }
  function xi() {
    ((Yt = 4),
      wl || ((ht & 4194048) !== ht && xe.current !== null) || (Jn = !0),
      ((Ul & 134217727) === 0 && (yn & 134217727) === 0) || Ot === null || Hl(Ot, ht, Ne, !1));
  }
  function Ws(t, e, l) {
    var n = xt;
    xt |= 2;
    var u = Sm(),
      i = xm();
    ((Ot !== t || ht !== e) && ((bi = null), Fn(t, e)), (e = !1));
    var f = Yt;
    t: do
      try {
        if (At !== 0 && dt !== null) {
          var h = dt,
            x = Te;
          switch (At) {
            case 8:
              (Is(), (f = 6));
              break t;
            case 3:
            case 2:
            case 9:
            case 6:
              xe.current === null && (e = !0);
              var M = At;
              if (((At = 0), (Te = null), Pn(t, h, x, M), l && Jn)) {
                f = 0;
                break t;
              }
              break;
            default:
              ((M = At), (At = 0), (Te = null), Pn(t, h, x, M));
          }
        }
        (k0(), (f = Yt));
        break;
      } catch (U) {
        _m(t, U);
      }
    while (!0);
    return (
      e && t.shellSuspendCounter++,
      (al = cn = null),
      (xt = n),
      (B.H = u),
      (B.A = i),
      dt === null && ((Ot = null), (ht = 0), Yu()),
      f
    );
  }
  function k0() {
    for (; dt !== null; ) Em(dt);
  }
  function w0(t, e) {
    var l = xt;
    xt |= 2;
    var n = Sm(),
      u = xm();
    Ot !== t || ht !== e ? ((bi = null), (_i = ge() + 500), Fn(t, e)) : (Jn = _a(t, e));
    t: do
      try {
        if (At !== 0 && dt !== null) {
          e = dt;
          var i = Te;
          e: switch (At) {
            case 1:
              ((At = 0), (Te = null), Pn(t, e, i, 1));
              break;
            case 2:
            case 9:
              if (Df(i)) {
                ((At = 0), (Te = null), Tm(e));
                break;
              }
              ((e = function () {
                ((At !== 2 && At !== 9) || Ot !== t || (At = 7), Ie(t));
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
              Df(i) ? ((At = 0), (Te = null), Tm(e)) : ((At = 0), (Te = null), Pn(t, e, i, 7));
              break;
            case 5:
              var f = null;
              switch (dt.tag) {
                case 26:
                  f = dt.memoizedState;
                case 5:
                case 27:
                  var h = dt;
                  if (f ? oh(f) : h.stateNode.complete) {
                    ((At = 0), (Te = null));
                    var x = h.sibling;
                    if (x !== null) dt = x;
                    else {
                      var M = h.return;
                      M !== null ? ((dt = M), Ei(M)) : (dt = null);
                    }
                    break e;
                  }
              }
              ((At = 0), (Te = null), Pn(t, e, i, 5));
              break;
            case 6:
              ((At = 0), (Te = null), Pn(t, e, i, 6));
              break;
            case 8:
              (Is(), (Yt = 6));
              break t;
            default:
              throw Error(s(462));
          }
        }
        U0();
        break;
      } catch (U) {
        _m(t, U);
      }
    while (!0);
    return (
      (al = cn = null),
      (B.H = n),
      (B.A = u),
      (xt = l),
      dt !== null ? 0 : ((Ot = null), (ht = 0), Yu(), Yt)
    );
  }
  function U0() {
    for (; dt !== null && !uy(); ) Em(dt);
  }
  function Em(t) {
    var e = Kd(t.alternate, t, hl);
    ((t.memoizedProps = t.pendingProps), e === null ? Ei(t) : (dt = e));
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
        ds(e);
      default:
        (Jd(l, e), (e = dt = xf(e, hl)), (e = Kd(l, e, hl)));
    }
    ((t.memoizedProps = t.pendingProps), e === null ? Ei(t) : (dt = e));
  }
  function Pn(t, e, l, n) {
    ((al = cn = null), ds(e), (Yn = null), (Ua = 0));
    var u = e.return;
    try {
      if (T0(t, u, e, l, ht)) {
        ((Yt = 1), ri(t, Oe(l, t.current)), (dt = null));
        return;
      }
    } catch (i) {
      if (u !== null) throw ((dt = u), i);
      ((Yt = 1), ri(t, Oe(l, t.current)), (dt = null));
      return;
    }
    e.flags & 32768
      ? (gt || n === 1
          ? (t = !0)
          : Jn || (ht & 536870912) !== 0
            ? (t = !1)
            : ((wl = t = !0),
              (n === 2 || n === 9 || n === 3 || n === 6) &&
                ((n = xe.current), n !== null && n.tag === 13 && (n.flags |= 16384))),
        Nm(e, t))
      : Ei(e);
  }
  function Ei(t) {
    var e = t;
    do {
      if ((e.flags & 32768) !== 0) {
        Nm(e, wl);
        return;
      }
      t = e.return;
      var l = C0(e.alternate, e, hl);
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
    Yt === 0 && (Yt = 5);
  }
  function Nm(t, e) {
    do {
      var l = M0(t.alternate, t);
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
    ((Yt = 6), (dt = null));
  }
  function Am(t, e, l, n, u, i, f, h, x) {
    t.cancelPendingCommit = null;
    do Ti();
    while (It !== 0);
    if ((xt & 6) !== 0) throw Error(s(327));
    if (e !== null) {
      if (e === t.current) throw Error(s(177));
      if (
        ((i = e.lanes | e.childLanes),
        (i |= Hc),
        py(t, l, i, f, h, x),
        t === Ot && ((dt = Ot = null), (ht = 0)),
        (Wn = e),
        (Ll = t),
        (pl = l),
        (Ks = i),
        ($s = u),
        (pm = n),
        (e.subtreeFlags & 10256) !== 0 || (e.flags & 10256) !== 0
          ? ((t.callbackNode = null),
            (t.callbackPriority = 0),
            q0(Au, function () {
              return (zm(), null);
            }))
          : ((t.callbackNode = null), (t.callbackPriority = 0)),
        (n = (e.flags & 13878) !== 0),
        (e.subtreeFlags & 13878) !== 0 || n)
      ) {
        ((n = B.T), (B.T = null), (u = J.p), (J.p = 2), (f = xt), (xt |= 4));
        try {
          R0(t, e, l);
        } finally {
          ((xt = f), (J.p = u), (B.T = n));
        }
      }
      ((It = 1), Cm(), Mm(), Rm());
    }
  }
  function Cm() {
    if (It === 1) {
      It = 0;
      var t = Ll,
        e = Wn,
        l = (e.flags & 13878) !== 0;
      if ((e.subtreeFlags & 13878) !== 0 || l) {
        ((l = B.T), (B.T = null));
        var n = J.p;
        J.p = 2;
        var u = xt;
        xt |= 4;
        try {
          cm(e, t);
          var i = oo,
            f = mf(t.containerInfo),
            h = i.focusedElem,
            x = i.selectionRange;
          if (f !== h && h && h.ownerDocument && df(h.ownerDocument.documentElement, h)) {
            if (x !== null && kc(h)) {
              var M = x.start,
                U = x.end;
              if ((U === void 0 && (U = M), 'selectionStart' in h))
                ((h.selectionStart = M), (h.selectionEnd = Math.min(U, h.value.length)));
              else {
                var G = h.ownerDocument || document,
                  R = (G && G.defaultView) || window;
                if (R.getSelection) {
                  var O = R.getSelection(),
                    F = h.textContent.length,
                    at = Math.min(x.start, F),
                    zt = x.end === void 0 ? at : Math.min(x.end, F);
                  !O.extend && at > zt && ((f = zt), (zt = at), (at = f));
                  var A = ff(h, at),
                    T = ff(h, zt);
                  if (
                    A &&
                    T &&
                    (O.rangeCount !== 1 ||
                      O.anchorNode !== A.node ||
                      O.anchorOffset !== A.offset ||
                      O.focusNode !== T.node ||
                      O.focusOffset !== T.offset)
                  ) {
                    var C = G.createRange();
                    (C.setStart(A.node, A.offset),
                      O.removeAllRanges(),
                      at > zt
                        ? (O.addRange(C), O.extend(T.node, T.offset))
                        : (C.setEnd(T.node, T.offset), O.addRange(C)));
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
          ((Ui = !!so), (oo = so = null));
        } finally {
          ((xt = u), (J.p = n), (B.T = l));
        }
      }
      ((t.current = e), (It = 2));
    }
  }
  function Mm() {
    if (It === 2) {
      It = 0;
      var t = Ll,
        e = Wn,
        l = (e.flags & 8772) !== 0;
      if ((e.subtreeFlags & 8772) !== 0 || l) {
        ((l = B.T), (B.T = null));
        var n = J.p;
        J.p = 2;
        var u = xt;
        xt |= 4;
        try {
          lm(t, e.alternate, e);
        } finally {
          ((xt = u), (J.p = n), (B.T = l));
        }
      }
      It = 3;
    }
  }
  function Rm() {
    if (It === 4 || It === 3) {
      ((It = 0), iy());
      var t = Ll,
        e = Wn,
        l = pl,
        n = pm;
      (e.subtreeFlags & 10256) !== 0 || (e.flags & 10256) !== 0
        ? (It = 5)
        : ((It = 0), (Wn = Ll = null), jm(t, t.pendingLanes));
      var u = t.pendingLanes;
      if (
        (u === 0 && (Bl = null),
        pc(l),
        (e = e.stateNode),
        ve && typeof ve.onCommitFiberRoot == 'function')
      )
        try {
          ve.onCommitFiberRoot(va, e, void 0, (e.current.flags & 128) === 128);
        } catch {}
      if (n !== null) {
        ((e = B.T), (u = J.p), (J.p = 2), (B.T = null));
        try {
          for (var i = t.onRecoverableError, f = 0; f < n.length; f++) {
            var h = n[f];
            i(h.value, { componentStack: h.stack });
          }
        } finally {
          ((B.T = e), (J.p = u));
        }
      }
      ((pl & 3) !== 0 && Ti(),
        Ie(t),
        (u = t.pendingLanes),
        (l & 261930) !== 0 && (u & 42) !== 0 ? (t === Js ? Pa++ : ((Pa = 0), (Js = t))) : (Pa = 0),
        tu(0));
    }
  }
  function jm(t, e) {
    (t.pooledCacheLanes &= e) === 0 &&
      ((e = t.pooledCache), e != null && ((t.pooledCache = null), ka(e)));
  }
  function Ti() {
    return (Cm(), Mm(), Rm(), zm());
  }
  function zm() {
    if (It !== 5) return !1;
    var t = Ll,
      e = Ks;
    Ks = 0;
    var l = pc(pl),
      n = B.T,
      u = J.p;
    try {
      ((J.p = 32 > l ? 32 : l), (B.T = null), (l = $s), ($s = null));
      var i = Ll,
        f = pl;
      if (((It = 0), (Wn = Ll = null), (pl = 0), (xt & 6) !== 0)) throw Error(s(331));
      var h = xt;
      if (
        ((xt |= 4),
        dm(i.current),
        om(i, i.current, f, l),
        (xt = h),
        tu(0, !1),
        ve && typeof ve.onPostCommitFiberRoot == 'function')
      )
        try {
          ve.onPostCommitFiberRoot(va, i);
        } catch {}
      return !0;
    } finally {
      ((J.p = u), (B.T = n), jm(t, e));
    }
  }
  function Om(t, e, l) {
    ((e = Oe(l, e)),
      (e = Cs(t.stateNode, e, 2)),
      (t = zl(t, e, 2)),
      t !== null && (ba(t, 2), Ie(t)));
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
            (typeof n.componentDidCatch == 'function' && (Bl === null || !Bl.has(n)))
          ) {
            ((t = Oe(l, t)),
              (l = Dd(2)),
              (n = zl(e, l, 2)),
              n !== null && (kd(l, n, e, t), ba(n, 2), Ie(n)));
            break;
          }
        }
        e = e.return;
      }
  }
  function Fs(t, e, l) {
    var n = t.pingCache;
    if (n === null) {
      n = t.pingCache = new O0();
      var u = new Set();
      n.set(e, u);
    } else ((u = n.get(e)), u === void 0 && ((u = new Set()), n.set(e, u)));
    u.has(l) || ((Vs = !0), u.add(l), (t = B0.bind(null, t, e, l)), e.then(t, t));
  }
  function B0(t, e, l) {
    var n = t.pingCache;
    (n !== null && n.delete(e),
      (t.pingedLanes |= t.suspendedLanes & l),
      (t.warmLanes &= ~l),
      Ot === t &&
        (ht & l) === l &&
        (Yt === 4 || (Yt === 3 && (ht & 62914560) === ht && 300 > ge() - vi)
          ? (xt & 2) === 0 && Fn(t, 0)
          : (Qs |= l),
        In === ht && (In = 0)),
      Ie(t));
  }
  function Dm(t, e) {
    (e === 0 && (e = Ar()), (t = nn(t, e)), t !== null && (ba(t, e), Ie(t)));
  }
  function L0(t) {
    var e = t.memoizedState,
      l = 0;
    (e !== null && (l = e.retryLane), Dm(t, l));
  }
  function H0(t, e) {
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
  function q0(t, e) {
    return fc(t, e);
  }
  var Ni = null,
    ta = null,
    Ps = !1,
    Ai = !1,
    to = !1,
    ql = 0;
  function Ie(t) {
    (t !== ta && t.next === null && (ta === null ? (Ni = ta = t) : (ta = ta.next = t)),
      (Ai = !0),
      Ps || ((Ps = !0), Y0()));
  }
  function tu(t, e) {
    if (!to && Ai) {
      to = !0;
      do
        for (var l = !1, n = Ni; n !== null; ) {
          if (t !== 0) {
            var u = n.pendingLanes;
            if (u === 0) var i = 0;
            else {
              var f = n.suspendedLanes,
                h = n.pingedLanes;
              ((i = (1 << (31 - _e(42 | t) + 1)) - 1),
                (i &= u & ~(f & ~h)),
                (i = i & 201326741 ? (i & 201326741) | 1 : i ? i | 2 : 0));
            }
            i !== 0 && ((l = !0), Bm(n, i));
          } else
            ((i = ht),
              (i = ju(
                n,
                n === Ot ? i : 0,
                n.cancelPendingCommit !== null || n.timeoutHandle !== -1
              )),
              (i & 3) === 0 || _a(n, i) || ((l = !0), Bm(n, i)));
          n = n.next;
        }
      while (l);
      to = !1;
    }
  }
  function G0() {
    km();
  }
  function km() {
    Ai = Ps = !1;
    var t = 0;
    ql !== 0 && F0() && (t = ql);
    for (var e = ge(), l = null, n = Ni; n !== null; ) {
      var u = n.next,
        i = wm(n, e);
      (i === 0
        ? ((n.next = null), l === null ? (Ni = u) : (l.next = u), u === null && (ta = l))
        : ((l = n), (t !== 0 || (i & 3) !== 0) && (Ai = !0)),
        (n = u));
    }
    ((It !== 0 && It !== 5) || tu(t), ql !== 0 && (ql = 0));
  }
  function wm(t, e) {
    for (
      var l = t.suspendedLanes,
        n = t.pingedLanes,
        u = t.expirationTimes,
        i = t.pendingLanes & -62914561;
      0 < i;
    ) {
      var f = 31 - _e(i),
        h = 1 << f,
        x = u[f];
      (x === -1
        ? ((h & l) === 0 || (h & n) !== 0) && (u[f] = hy(h, e))
        : x <= e && (t.expiredLanes |= h),
        (i &= ~h));
    }
    if (
      ((e = Ot),
      (l = ht),
      (l = ju(t, t === e ? l : 0, t.cancelPendingCommit !== null || t.timeoutHandle !== -1)),
      (n = t.callbackNode),
      l === 0 || (t === e && (At === 2 || At === 9)) || t.cancelPendingCommit !== null)
    )
      return (n !== null && n !== null && dc(n), (t.callbackNode = null), (t.callbackPriority = 0));
    if ((l & 3) === 0 || _a(t, l)) {
      if (((e = l & -l), e === t.callbackPriority)) return e;
      switch ((n !== null && dc(n), pc(l))) {
        case 2:
        case 8:
          l = Tr;
          break;
        case 32:
          l = Au;
          break;
        case 268435456:
          l = Nr;
          break;
        default:
          l = Au;
      }
      return (
        (n = Um.bind(null, t)),
        (l = fc(l, n)),
        (t.callbackPriority = e),
        (t.callbackNode = l),
        e
      );
    }
    return (
      n !== null && n !== null && dc(n),
      (t.callbackPriority = 2),
      (t.callbackNode = null),
      2
    );
  }
  function Um(t, e) {
    if (It !== 0 && It !== 5) return ((t.callbackNode = null), (t.callbackPriority = 0), null);
    var l = t.callbackNode;
    if (Ti() && t.callbackNode !== l) return null;
    var n = ht;
    return (
      (n = ju(t, t === Ot ? n : 0, t.cancelPendingCommit !== null || t.timeoutHandle !== -1)),
      n === 0
        ? null
        : (gm(t, n, e),
          wm(t, ge()),
          t.callbackNode != null && t.callbackNode === l ? Um.bind(null, t) : null)
    );
  }
  function Bm(t, e) {
    if (Ti()) return null;
    gm(t, e, !0);
  }
  function Y0() {
    tg(function () {
      (xt & 6) !== 0 ? fc(Er, G0) : km();
    });
  }
  function eo() {
    if (ql === 0) {
      var t = Hn;
      (t === 0 && ((t = Cu), (Cu <<= 1), (Cu & 261888) === 0 && (Cu = 256)), (ql = t));
    }
    return ql;
  }
  function Lm(t) {
    return t == null || typeof t == 'symbol' || typeof t == 'boolean'
      ? null
      : typeof t == 'function'
        ? t
        : ku('' + t);
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
  function X0(t, e, l, n, u) {
    if (e === 'submit' && l && l.stateNode === u) {
      var i = Lm((u[re] || null).action),
        f = n.submitter;
      f &&
        ((e = (e = f[re] || null) ? Lm(e.formAction) : f.getAttribute('formAction')),
        e !== null && ((i = e), (f = null)));
      var h = new Lu('action', 'action', null, n, u);
      t.push({
        event: h,
        listeners: [
          {
            instance: null,
            listener: function () {
              if (n.defaultPrevented) {
                if (ql !== 0) {
                  var x = f ? Hm(u, f) : new FormData(u);
                  Ss(l, { pending: !0, data: x, method: u.method, action: i }, null, x);
                }
              } else
                typeof i == 'function' &&
                  (h.preventDefault(),
                  (x = f ? Hm(u, f) : new FormData(u)),
                  Ss(l, { pending: !0, data: x, method: u.method, action: i }, i, x));
            },
            currentTarget: u,
          },
        ],
      });
    }
  }
  for (var lo = 0; lo < Lc.length; lo++) {
    var no = Lc[lo],
      V0 = no.toLowerCase(),
      Q0 = no[0].toUpperCase() + no.slice(1);
    qe(V0, 'on' + Q0);
  }
  (qe(yf, 'onAnimationEnd'),
    qe(gf, 'onAnimationIteration'),
    qe(vf, 'onAnimationStart'),
    qe('dblclick', 'onDoubleClick'),
    qe('focusin', 'onFocus'),
    qe('focusout', 'onBlur'),
    qe(c0, 'onTransitionRun'),
    qe(s0, 'onTransitionStart'),
    qe(o0, 'onTransitionCancel'),
    qe(_f, 'onTransitionEnd'),
    Nn('onMouseEnter', ['mouseout', 'mouseover']),
    Nn('onMouseLeave', ['mouseout', 'mouseover']),
    Nn('onPointerEnter', ['pointerout', 'pointerover']),
    Nn('onPointerLeave', ['pointerout', 'pointerover']),
    Pl('onChange', 'change click focusin focusout input keydown keyup selectionchange'.split(' ')),
    Pl(
      'onSelect',
      'focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange'.split(
        ' '
      )
    ),
    Pl('onBeforeInput', ['compositionend', 'keypress', 'textInput', 'paste']),
    Pl('onCompositionEnd', 'compositionend focusout keydown keypress keyup mousedown'.split(' ')),
    Pl(
      'onCompositionStart',
      'compositionstart focusout keydown keypress keyup mousedown'.split(' ')
    ),
    Pl(
      'onCompositionUpdate',
      'compositionupdate focusout keydown keypress keyup mousedown'.split(' ')
    ));
  var eu =
      'abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting'.split(
        ' '
      ),
    Z0 = new Set(
      'beforetoggle cancel close invalid load scroll scrollend toggle'.split(' ').concat(eu)
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
            var h = n[f],
              x = h.instance,
              M = h.currentTarget;
            if (((h = h.listener), x !== i && u.isPropagationStopped())) break t;
            ((i = h), (u.currentTarget = M));
            try {
              i(u);
            } catch (U) {
              Gu(U);
            }
            ((u.currentTarget = null), (i = x));
          }
        else
          for (f = 0; f < n.length; f++) {
            if (
              ((h = n[f]),
              (x = h.instance),
              (M = h.currentTarget),
              (h = h.listener),
              x !== i && u.isPropagationStopped())
            )
              break t;
            ((i = h), (u.currentTarget = M));
            try {
              i(u);
            } catch (U) {
              Gu(U);
            }
            ((u.currentTarget = null), (i = x));
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
  function ao(t, e, l) {
    var n = 0;
    (e && (n |= 4), Gm(l, t, n, e));
  }
  var Ci = '_reactListening' + Math.random().toString(36).slice(2);
  function uo(t) {
    if (!t[Ci]) {
      ((t[Ci] = !0),
        Dr.forEach(function (l) {
          l !== 'selectionchange' && (Z0.has(l) || ao(l, !1, t), ao(l, !0, t));
        }));
      var e = t.nodeType === 9 ? t : t.ownerDocument;
      e === null || e[Ci] || ((e[Ci] = !0), ao('selectionchange', !1, e));
    }
  }
  function Gm(t, e, l, n) {
    switch (yh(e)) {
      case 2:
        var u = bg;
        break;
      case 8:
        u = Sg;
        break;
      default:
        u = So;
    }
    ((l = u.bind(null, e, l, t)),
      (u = void 0),
      !Nc || (e !== 'touchstart' && e !== 'touchmove' && e !== 'wheel') || (u = !0),
      n
        ? u !== void 0
          ? t.addEventListener(e, l, { capture: !0, passive: u })
          : t.addEventListener(e, l, !0)
        : u !== void 0
          ? t.addEventListener(e, l, { passive: u })
          : t.addEventListener(e, l, !1));
  }
  function io(t, e, l, n, u) {
    var i = n;
    if ((e & 1) === 0 && (e & 2) === 0 && n !== null)
      t: for (;;) {
        if (n === null) return;
        var f = n.tag;
        if (f === 3 || f === 4) {
          var h = n.stateNode.containerInfo;
          if (h === u) break;
          if (f === 4)
            for (f = n.return; f !== null; ) {
              var x = f.tag;
              if ((x === 3 || x === 4) && f.stateNode.containerInfo === u) return;
              f = f.return;
            }
          for (; h !== null; ) {
            if (((f = xn(h)), f === null)) return;
            if (((x = f.tag), x === 5 || x === 6 || x === 26 || x === 27)) {
              n = i = f;
              continue t;
            }
            h = h.parentNode;
          }
        }
        n = n.return;
      }
    Qr(function () {
      var M = i,
        U = Ec(l),
        G = [];
      t: {
        var R = bf.get(t);
        if (R !== void 0) {
          var O = Lu,
            F = t;
          switch (t) {
            case 'keypress':
              if (Uu(l) === 0) break t;
            case 'keydown':
            case 'keyup':
              O = Hy;
              break;
            case 'focusin':
              ((F = 'focus'), (O = Rc));
              break;
            case 'focusout':
              ((F = 'blur'), (O = Rc));
              break;
            case 'beforeblur':
            case 'afterblur':
              O = Rc;
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
              O = $r;
              break;
            case 'drag':
            case 'dragend':
            case 'dragenter':
            case 'dragexit':
            case 'dragleave':
            case 'dragover':
            case 'dragstart':
            case 'drop':
              O = Cy;
              break;
            case 'touchcancel':
            case 'touchend':
            case 'touchmove':
            case 'touchstart':
              O = Yy;
              break;
            case yf:
            case gf:
            case vf:
              O = jy;
              break;
            case _f:
              O = Vy;
              break;
            case 'scroll':
            case 'scrollend':
              O = Ny;
              break;
            case 'wheel':
              O = Zy;
              break;
            case 'copy':
            case 'cut':
            case 'paste':
              O = Oy;
              break;
            case 'gotpointercapture':
            case 'lostpointercapture':
            case 'pointercancel':
            case 'pointerdown':
            case 'pointermove':
            case 'pointerout':
            case 'pointerover':
            case 'pointerup':
              O = Ir;
              break;
            case 'toggle':
            case 'beforetoggle':
              O = $y;
          }
          var at = (e & 4) !== 0,
            zt = !at && (t === 'scroll' || t === 'scrollend'),
            A = at ? (R !== null ? R + 'Capture' : null) : R;
          at = [];
          for (var T = M, C; T !== null; ) {
            var L = T;
            if (
              ((C = L.stateNode),
              (L = L.tag),
              (L !== 5 && L !== 26 && L !== 27) ||
                C === null ||
                A === null ||
                ((L = Ea(T, A)), L != null && at.push(lu(T, L, C))),
              zt)
            )
              break;
            T = T.return;
          }
          0 < at.length && ((R = new O(R, F, null, l, U)), G.push({ event: R, listeners: at }));
        }
      }
      if ((e & 7) === 0) {
        t: {
          if (
            ((R = t === 'mouseover' || t === 'pointerover'),
            (O = t === 'mouseout' || t === 'pointerout'),
            R && l !== xc && (F = l.relatedTarget || l.fromElement) && (xn(F) || F[Sn]))
          )
            break t;
          if (
            (O || R) &&
            ((R =
              U.window === U
                ? U
                : (R = U.ownerDocument)
                  ? R.defaultView || R.parentWindow
                  : window),
            O
              ? ((F = l.relatedTarget || l.toElement),
                (O = M),
                (F = F ? xn(F) : null),
                F !== null &&
                  ((zt = d(F)), (at = F.tag), F !== zt || (at !== 5 && at !== 27 && at !== 6)) &&
                  (F = null))
              : ((O = null), (F = M)),
            O !== F)
          ) {
            if (
              ((at = $r),
              (L = 'onMouseLeave'),
              (A = 'onMouseEnter'),
              (T = 'mouse'),
              (t === 'pointerout' || t === 'pointerover') &&
                ((at = Ir), (L = 'onPointerLeave'), (A = 'onPointerEnter'), (T = 'pointer')),
              (zt = O == null ? R : xa(O)),
              (C = F == null ? R : xa(F)),
              (R = new at(L, T + 'leave', O, l, U)),
              (R.target = zt),
              (R.relatedTarget = C),
              (L = null),
              xn(U) === M &&
                ((at = new at(A, T + 'enter', F, l, U)),
                (at.target = C),
                (at.relatedTarget = zt),
                (L = at)),
              (zt = L),
              O && F)
            )
              e: {
                for (at = K0, A = O, T = F, C = 0, L = A; L; L = at(L)) C++;
                L = 0;
                for (var lt = T; lt; lt = at(lt)) L++;
                for (; 0 < C - L; ) ((A = at(A)), C--);
                for (; 0 < L - C; ) ((T = at(T)), L--);
                for (; C--; ) {
                  if (A === T || (T !== null && A === T.alternate)) {
                    at = A;
                    break e;
                  }
                  ((A = at(A)), (T = at(T)));
                }
                at = null;
              }
            else at = null;
            (O !== null && Ym(G, R, O, at, !1), F !== null && zt !== null && Ym(G, zt, F, at, !0));
          }
        }
        t: {
          if (
            ((R = M ? xa(M) : window),
            (O = R.nodeName && R.nodeName.toLowerCase()),
            O === 'select' || (O === 'input' && R.type === 'file'))
          )
            var _t = af;
          else if (lf(R))
            if (uf) _t = a0;
            else {
              _t = l0;
              var P = e0;
            }
          else
            ((O = R.nodeName),
              !O || O.toLowerCase() !== 'input' || (R.type !== 'checkbox' && R.type !== 'radio')
                ? M && Sc(M.elementType) && (_t = af)
                : (_t = n0));
          if (_t && (_t = _t(t, M))) {
            nf(G, _t, l, U);
            break t;
          }
          (P && P(t, R, M),
            t === 'focusout' &&
              M &&
              R.type === 'number' &&
              M.memoizedProps.value != null &&
              bc(R, 'number', R.value));
        }
        switch (((P = M ? xa(M) : window), t)) {
          case 'focusin':
            (lf(P) || P.contentEditable === 'true') && ((zn = P), (wc = M), (za = null));
            break;
          case 'focusout':
            za = wc = zn = null;
            break;
          case 'mousedown':
            Uc = !0;
            break;
          case 'contextmenu':
          case 'mouseup':
          case 'dragend':
            ((Uc = !1), hf(G, l, U));
            break;
          case 'selectionchange':
            if (i0) break;
          case 'keydown':
          case 'keyup':
            hf(G, l, U);
        }
        var rt;
        if (zc)
          t: {
            switch (t) {
              case 'compositionstart':
                var pt = 'onCompositionStart';
                break t;
              case 'compositionend':
                pt = 'onCompositionEnd';
                break t;
              case 'compositionupdate':
                pt = 'onCompositionUpdate';
                break t;
            }
            pt = void 0;
          }
        else
          jn
            ? tf(t, l) && (pt = 'onCompositionEnd')
            : t === 'keydown' && l.keyCode === 229 && (pt = 'onCompositionStart');
        (pt &&
          (Wr &&
            l.locale !== 'ko' &&
            (jn || pt !== 'onCompositionStart'
              ? pt === 'onCompositionEnd' && jn && (rt = Zr())
              : ((Tl = U), (Ac = 'value' in Tl ? Tl.value : Tl.textContent), (jn = !0))),
          (P = Mi(M, pt)),
          0 < P.length &&
            ((pt = new Jr(pt, t, null, l, U)),
            G.push({ event: pt, listeners: P }),
            rt ? (pt.data = rt) : ((rt = ef(l)), rt !== null && (pt.data = rt)))),
          (rt = Iy ? Wy(t, l) : Fy(t, l)) &&
            ((pt = Mi(M, 'onBeforeInput')),
            0 < pt.length &&
              ((P = new Jr('onBeforeInput', 'beforeinput', null, l, U)),
              G.push({ event: P, listeners: pt }),
              (P.data = rt))),
          X0(G, t, M, l, U));
      }
      qm(G, e);
    });
  }
  function lu(t, e, l) {
    return { instance: t, listener: e, currentTarget: l };
  }
  function Mi(t, e) {
    for (var l = e + 'Capture', n = []; t !== null; ) {
      var u = t,
        i = u.stateNode;
      if (
        ((u = u.tag),
        (u !== 5 && u !== 26 && u !== 27) ||
          i === null ||
          ((u = Ea(t, l)),
          u != null && n.unshift(lu(t, u, i)),
          (u = Ea(t, e)),
          u != null && n.push(lu(t, u, i))),
        t.tag === 3)
      )
        return n;
      t = t.return;
    }
    return [];
  }
  function K0(t) {
    if (t === null) return null;
    do t = t.return;
    while (t && t.tag !== 5 && t.tag !== 27);
    return t || null;
  }
  function Ym(t, e, l, n, u) {
    for (var i = e._reactName, f = []; l !== null && l !== n; ) {
      var h = l,
        x = h.alternate,
        M = h.stateNode;
      if (((h = h.tag), x !== null && x === n)) break;
      ((h !== 5 && h !== 26 && h !== 27) ||
        M === null ||
        ((x = M),
        u
          ? ((M = Ea(l, i)), M != null && f.unshift(lu(l, M, x)))
          : u || ((M = Ea(l, i)), M != null && f.push(lu(l, M, x)))),
        (l = l.return));
    }
    f.length !== 0 && t.push({ event: e, listeners: f });
  }
  var $0 = /\r\n?/g,
    J0 = /\u0000|\uFFFD/g;
  function Xm(t) {
    return (typeof t == 'string' ? t : '' + t)
      .replace(
        $0,
        `
`
      )
      .replace(J0, '');
  }
  function Vm(t, e) {
    return ((e = Xm(e)), Xm(t) === e);
  }
  function jt(t, e, l, n, u, i) {
    switch (l) {
      case 'children':
        typeof n == 'string'
          ? e === 'body' || (e === 'textarea' && n === '') || Cn(t, n)
          : (typeof n == 'number' || typeof n == 'bigint') && e !== 'body' && Cn(t, '' + n);
        break;
      case 'className':
        Ou(t, 'class', n);
        break;
      case 'tabIndex':
        Ou(t, 'tabindex', n);
        break;
      case 'dir':
      case 'role':
      case 'viewBox':
      case 'width':
      case 'height':
        Ou(t, l, n);
        break;
      case 'style':
        Xr(t, n, i);
        break;
      case 'data':
        if (e !== 'object') {
          Ou(t, 'data', n);
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
        ((n = ku('' + n)), t.setAttribute(l, n));
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
              ? (e !== 'input' && jt(t, e, 'name', u.name, u, null),
                jt(t, e, 'formEncType', u.formEncType, u, null),
                jt(t, e, 'formMethod', u.formMethod, u, null),
                jt(t, e, 'formTarget', u.formTarget, u, null))
              : (jt(t, e, 'encType', u.encType, u, null),
                jt(t, e, 'method', u.method, u, null),
                jt(t, e, 'target', u.target, u, null)));
        if (n == null || typeof n == 'symbol' || typeof n == 'boolean') {
          t.removeAttribute(l);
          break;
        }
        ((n = ku('' + n)), t.setAttribute(l, n));
        break;
      case 'onClick':
        n != null && (t.onclick = tl);
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
        ((l = ku('' + n)), t.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', l));
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
        Pe(t, 'http://www.w3.org/1999/xlink', 'xlink:actuate', n);
        break;
      case 'xlinkArcrole':
        Pe(t, 'http://www.w3.org/1999/xlink', 'xlink:arcrole', n);
        break;
      case 'xlinkRole':
        Pe(t, 'http://www.w3.org/1999/xlink', 'xlink:role', n);
        break;
      case 'xlinkShow':
        Pe(t, 'http://www.w3.org/1999/xlink', 'xlink:show', n);
        break;
      case 'xlinkTitle':
        Pe(t, 'http://www.w3.org/1999/xlink', 'xlink:title', n);
        break;
      case 'xlinkType':
        Pe(t, 'http://www.w3.org/1999/xlink', 'xlink:type', n);
        break;
      case 'xmlBase':
        Pe(t, 'http://www.w3.org/XML/1998/namespace', 'xml:base', n);
        break;
      case 'xmlLang':
        Pe(t, 'http://www.w3.org/XML/1998/namespace', 'xml:lang', n);
        break;
      case 'xmlSpace':
        Pe(t, 'http://www.w3.org/XML/1998/namespace', 'xml:space', n);
        break;
      case 'is':
        zu(t, 'is', n);
        break;
      case 'innerText':
      case 'textContent':
        break;
      default:
        (!(2 < l.length) || (l[0] !== 'o' && l[0] !== 'O') || (l[1] !== 'n' && l[1] !== 'N')) &&
          ((l = Ey.get(l) || l), zu(t, l, n));
    }
  }
  function co(t, e, l, n, u, i) {
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
          ? Cn(t, n)
          : (typeof n == 'number' || typeof n == 'bigint') && Cn(t, '' + n);
        break;
      case 'onScroll':
        n != null && mt('scroll', t);
        break;
      case 'onScrollEnd':
        n != null && mt('scrollend', t);
        break;
      case 'onClick':
        n != null && (t.onclick = tl);
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
              (i = t[re] || null),
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
                  jt(t, e, i, f, l, null);
              }
          }
        (u && jt(t, e, 'srcSet', l.srcSet, l, null), n && jt(t, e, 'src', l.src, l, null));
        return;
      case 'input':
        mt('invalid', t);
        var h = (i = f = u = null),
          x = null,
          M = null;
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
                  x = U;
                  break;
                case 'defaultChecked':
                  M = U;
                  break;
                case 'value':
                  i = U;
                  break;
                case 'defaultValue':
                  h = U;
                  break;
                case 'children':
                case 'dangerouslySetInnerHTML':
                  if (U != null) throw Error(s(137, e));
                  break;
                default:
                  jt(t, e, n, U, l, null);
              }
          }
        Hr(t, i, h, x, M, f, u, !1);
        return;
      case 'select':
        (mt('invalid', t), (n = f = i = null));
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
                n = h;
              default:
                jt(t, e, u, h, l, null);
            }
        ((e = i),
          (l = f),
          (t.multiple = !!n),
          e != null ? An(t, !!n, e, !1) : l != null && An(t, !!n, l, !0));
        return;
      case 'textarea':
        (mt('invalid', t), (i = u = n = null));
        for (f in l)
          if (l.hasOwnProperty(f) && ((h = l[f]), h != null))
            switch (f) {
              case 'value':
                n = h;
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
                jt(t, e, f, h, l, null);
            }
        Gr(t, n, u, i);
        return;
      case 'option':
        for (x in l)
          if (l.hasOwnProperty(x) && ((n = l[x]), n != null))
            switch (x) {
              case 'selected':
                t.selected = n && typeof n != 'function' && typeof n != 'symbol';
                break;
              default:
                jt(t, e, x, n, l, null);
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
        for (n = 0; n < eu.length; n++) mt(eu[n], t);
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
                jt(t, e, M, n, l, null);
            }
        return;
      default:
        if (Sc(e)) {
          for (U in l)
            l.hasOwnProperty(U) && ((n = l[U]), n !== void 0 && co(t, e, U, n, l, void 0));
          return;
        }
    }
    for (h in l) l.hasOwnProperty(h) && ((n = l[h]), n != null && jt(t, e, h, n, l, null));
  }
  function I0(t, e, l, n) {
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
          x = null,
          M = null,
          U = null;
        for (O in l) {
          var G = l[O];
          if (l.hasOwnProperty(O) && G != null)
            switch (O) {
              case 'checked':
                break;
              case 'value':
                break;
              case 'defaultValue':
                x = G;
              default:
                n.hasOwnProperty(O) || jt(t, e, O, null, n, G);
            }
        }
        for (var R in n) {
          var O = n[R];
          if (((G = l[R]), n.hasOwnProperty(R) && (O != null || G != null)))
            switch (R) {
              case 'type':
                i = O;
                break;
              case 'name':
                u = O;
                break;
              case 'checked':
                M = O;
                break;
              case 'defaultChecked':
                U = O;
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
                O !== G && jt(t, e, R, O, n, G);
            }
        }
        _c(t, f, h, x, M, U, i, u);
        return;
      case 'select':
        O = f = h = R = null;
        for (i in l)
          if (((x = l[i]), l.hasOwnProperty(i) && x != null))
            switch (i) {
              case 'value':
                break;
              case 'multiple':
                O = x;
              default:
                n.hasOwnProperty(i) || jt(t, e, i, null, n, x);
            }
        for (u in n)
          if (((i = n[u]), (x = l[u]), n.hasOwnProperty(u) && (i != null || x != null)))
            switch (u) {
              case 'value':
                R = i;
                break;
              case 'defaultValue':
                h = i;
                break;
              case 'multiple':
                f = i;
              default:
                i !== x && jt(t, e, u, i, n, x);
            }
        ((e = h),
          (l = f),
          (n = O),
          R != null
            ? An(t, !!l, R, !1)
            : !!n != !!l && (e != null ? An(t, !!l, e, !0) : An(t, !!l, l ? [] : '', !1)));
        return;
      case 'textarea':
        O = R = null;
        for (h in l)
          if (((u = l[h]), l.hasOwnProperty(h) && u != null && !n.hasOwnProperty(h)))
            switch (h) {
              case 'value':
                break;
              case 'children':
                break;
              default:
                jt(t, e, h, null, n, u);
            }
        for (f in n)
          if (((u = n[f]), (i = l[f]), n.hasOwnProperty(f) && (u != null || i != null)))
            switch (f) {
              case 'value':
                R = u;
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
                u !== i && jt(t, e, f, u, n, i);
            }
        qr(t, R, O);
        return;
      case 'option':
        for (var F in l)
          if (((R = l[F]), l.hasOwnProperty(F) && R != null && !n.hasOwnProperty(F)))
            switch (F) {
              case 'selected':
                t.selected = !1;
                break;
              default:
                jt(t, e, F, null, n, R);
            }
        for (x in n)
          if (((R = n[x]), (O = l[x]), n.hasOwnProperty(x) && R !== O && (R != null || O != null)))
            switch (x) {
              case 'selected':
                t.selected = R && typeof R != 'function' && typeof R != 'symbol';
                break;
              default:
                jt(t, e, x, R, n, O);
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
        for (var at in l)
          ((R = l[at]),
            l.hasOwnProperty(at) && R != null && !n.hasOwnProperty(at) && jt(t, e, at, null, n, R));
        for (M in n)
          if (((R = n[M]), (O = l[M]), n.hasOwnProperty(M) && R !== O && (R != null || O != null)))
            switch (M) {
              case 'children':
              case 'dangerouslySetInnerHTML':
                if (R != null) throw Error(s(137, e));
                break;
              default:
                jt(t, e, M, R, n, O);
            }
        return;
      default:
        if (Sc(e)) {
          for (var zt in l)
            ((R = l[zt]),
              l.hasOwnProperty(zt) &&
                R !== void 0 &&
                !n.hasOwnProperty(zt) &&
                co(t, e, zt, void 0, n, R));
          for (U in n)
            ((R = n[U]),
              (O = l[U]),
              !n.hasOwnProperty(U) ||
                R === O ||
                (R === void 0 && O === void 0) ||
                co(t, e, U, R, n, O));
          return;
        }
    }
    for (var A in l)
      ((R = l[A]),
        l.hasOwnProperty(A) && R != null && !n.hasOwnProperty(A) && jt(t, e, A, null, n, R));
    for (G in n)
      ((R = n[G]),
        (O = l[G]),
        !n.hasOwnProperty(G) || R === O || (R == null && O == null) || jt(t, e, G, R, n, O));
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
  function W0() {
    if (typeof performance.getEntriesByType == 'function') {
      for (
        var t = 0, e = 0, l = performance.getEntriesByType('resource'), n = 0;
        n < l.length;
        n++
      ) {
        var u = l[n],
          i = u.transferSize,
          f = u.initiatorType,
          h = u.duration;
        if (i && h && Qm(f)) {
          for (f = 0, h = u.responseEnd, n += 1; n < l.length; n++) {
            var x = l[n],
              M = x.startTime;
            if (M > h) break;
            var U = x.transferSize,
              G = x.initiatorType;
            U && Qm(G) && ((x = x.responseEnd), (f += U * (x < h ? 1 : (h - M) / (x - M))));
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
  var so = null,
    oo = null;
  function Ri(t) {
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
  function ro(t, e) {
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
  var fo = null;
  function F0() {
    var t = window.event;
    return t && t.type === 'popstate' ? (t === fo ? !1 : ((fo = t), !0)) : ((fo = null), !1);
  }
  var $m = typeof setTimeout == 'function' ? setTimeout : void 0,
    P0 = typeof clearTimeout == 'function' ? clearTimeout : void 0,
    Jm = typeof Promise == 'function' ? Promise : void 0,
    tg =
      typeof queueMicrotask == 'function'
        ? queueMicrotask
        : typeof Jm < 'u'
          ? function (t) {
              return Jm.resolve(null).then(t).catch(eg);
            }
          : $m;
  function eg(t) {
    setTimeout(function () {
      throw t;
    });
  }
  function Gl(t) {
    return t === 'head';
  }
  function Im(t, e) {
    var l = e,
      n = 0;
    do {
      var u = l.nextSibling;
      if ((t.removeChild(l), u && u.nodeType === 8))
        if (((l = u.data), l === '/$' || l === '/&')) {
          if (n === 0) {
            (t.removeChild(u), aa(e));
            return;
          }
          n--;
        } else if (l === '$' || l === '$?' || l === '$~' || l === '$!' || l === '&') n++;
        else if (l === 'html') nu(t.ownerDocument.documentElement);
        else if (l === 'head') {
          ((l = t.ownerDocument.head), nu(l));
          for (var i = l.firstChild; i; ) {
            var f = i.nextSibling,
              h = i.nodeName;
            (i[Sa] ||
              h === 'SCRIPT' ||
              h === 'STYLE' ||
              (h === 'LINK' && i.rel.toLowerCase() === 'stylesheet') ||
              l.removeChild(i),
              (i = f));
          }
        } else l === 'body' && nu(t.ownerDocument.body);
      l = u;
    } while (l);
    aa(e);
  }
  function Wm(t, e) {
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
  function mo(t) {
    var e = t.firstChild;
    for (e && e.nodeType === 10 && (e = e.nextSibling); e; ) {
      var l = e;
      switch (((e = e.nextSibling), l.nodeName)) {
        case 'HTML':
        case 'HEAD':
        case 'BODY':
          (mo(l), gc(l));
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
  function lg(t, e, l, n) {
    for (; t.nodeType === 1; ) {
      var u = l;
      if (t.nodeName.toLowerCase() !== e.toLowerCase()) {
        if (!n && (t.nodeName !== 'INPUT' || t.type !== 'hidden')) break;
      } else if (n) {
        if (!t[Sa])
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
  function ng(t, e, l) {
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
  function ho(t) {
    return t.data === '$?' || t.data === '$~';
  }
  function po(t) {
    return t.data === '$!' || (t.data === '$?' && t.ownerDocument.readyState !== 'loading');
  }
  function ag(t, e) {
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
    switch (((e = Ri(l)), t)) {
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
  function nu(t) {
    for (var e = t.attributes; e.length; ) t.removeAttributeNode(e[0]);
    gc(t);
  }
  var Le = new Map(),
    lh = new Set();
  function ji(t) {
    return typeof t.getRootNode == 'function'
      ? t.getRootNode()
      : t.nodeType === 9
        ? t
        : t.ownerDocument;
  }
  var yl = J.d;
  J.d = { f: ug, r: ig, D: cg, C: sg, L: og, m: rg, X: dg, S: fg, M: mg };
  function ug() {
    var t = yl.f(),
      e = Si();
    return t || e;
  }
  function ig(t) {
    var e = En(t);
    e !== null && e.tag === 5 && e.type === 'form' ? _d(e) : yl.r(t);
  }
  var ea = typeof document > 'u' ? null : document;
  function nh(t, e, l) {
    var n = ea;
    if (n && typeof e == 'string' && e) {
      var u = je(e);
      ((u = 'link[rel="' + t + '"][href="' + u + '"]'),
        typeof l == 'string' && (u += '[crossorigin="' + l + '"]'),
        lh.has(u) ||
          (lh.add(u),
          (t = { rel: t, crossOrigin: l, href: e }),
          n.querySelector(u) === null &&
            ((e = n.createElement('link')), ne(e, 'link', t), Wt(e), n.head.appendChild(e))));
    }
  }
  function cg(t) {
    (yl.D(t), nh('dns-prefetch', t, null));
  }
  function sg(t, e) {
    (yl.C(t, e), nh('preconnect', t, e));
  }
  function og(t, e, l) {
    yl.L(t, e, l);
    var n = ea;
    if (n && t && e) {
      var u = 'link[rel="preload"][as="' + je(e) + '"]';
      e === 'image' && l && l.imageSrcSet
        ? ((u += '[imagesrcset="' + je(l.imageSrcSet) + '"]'),
          typeof l.imageSizes == 'string' && (u += '[imagesizes="' + je(l.imageSizes) + '"]'))
        : (u += '[href="' + je(t) + '"]');
      var i = u;
      switch (e) {
        case 'style':
          i = la(t);
          break;
        case 'script':
          i = na(t);
      }
      Le.has(i) ||
        ((t = v(
          { rel: 'preload', href: e === 'image' && l && l.imageSrcSet ? void 0 : t, as: e },
          l
        )),
        Le.set(i, t),
        n.querySelector(u) !== null ||
          (e === 'style' && n.querySelector(au(i))) ||
          (e === 'script' && n.querySelector(uu(i))) ||
          ((e = n.createElement('link')), ne(e, 'link', t), Wt(e), n.head.appendChild(e)));
    }
  }
  function rg(t, e) {
    yl.m(t, e);
    var l = ea;
    if (l && t) {
      var n = e && typeof e.as == 'string' ? e.as : 'script',
        u = 'link[rel="modulepreload"][as="' + je(n) + '"][href="' + je(t) + '"]',
        i = u;
      switch (n) {
        case 'audioworklet':
        case 'paintworklet':
        case 'serviceworker':
        case 'sharedworker':
        case 'worker':
        case 'script':
          i = na(t);
      }
      if (
        !Le.has(i) &&
        ((t = v({ rel: 'modulepreload', href: t }, e)), Le.set(i, t), l.querySelector(u) === null)
      ) {
        switch (n) {
          case 'audioworklet':
          case 'paintworklet':
          case 'serviceworker':
          case 'sharedworker':
          case 'worker':
          case 'script':
            if (l.querySelector(uu(i))) return;
        }
        ((n = l.createElement('link')), ne(n, 'link', t), Wt(n), l.head.appendChild(n));
      }
    }
  }
  function fg(t, e, l) {
    yl.S(t, e, l);
    var n = ea;
    if (n && t) {
      var u = Tn(n).hoistableStyles,
        i = la(t);
      e = e || 'default';
      var f = u.get(i);
      if (!f) {
        var h = { loading: 0, preload: null };
        if ((f = n.querySelector(au(i)))) h.loading = 5;
        else {
          ((t = v({ rel: 'stylesheet', href: t, 'data-precedence': e }, l)),
            (l = Le.get(i)) && go(t, l));
          var x = (f = n.createElement('link'));
          (Wt(x),
            ne(x, 'link', t),
            (x._p = new Promise(function (M, U) {
              ((x.onload = M), (x.onerror = U));
            })),
            x.addEventListener('load', function () {
              h.loading |= 1;
            }),
            x.addEventListener('error', function () {
              h.loading |= 2;
            }),
            (h.loading |= 4),
            zi(f, e, n));
        }
        ((f = { type: 'stylesheet', instance: f, count: 1, state: h }), u.set(i, f));
      }
    }
  }
  function dg(t, e) {
    yl.X(t, e);
    var l = ea;
    if (l && t) {
      var n = Tn(l).hoistableScripts,
        u = na(t),
        i = n.get(u);
      i ||
        ((i = l.querySelector(uu(u))),
        i ||
          ((t = v({ src: t, async: !0 }, e)),
          (e = Le.get(u)) && vo(t, e),
          (i = l.createElement('script')),
          Wt(i),
          ne(i, 'link', t),
          l.head.appendChild(i)),
        (i = { type: 'script', instance: i, count: 1, state: null }),
        n.set(u, i));
    }
  }
  function mg(t, e) {
    yl.M(t, e);
    var l = ea;
    if (l && t) {
      var n = Tn(l).hoistableScripts,
        u = na(t),
        i = n.get(u);
      i ||
        ((i = l.querySelector(uu(u))),
        i ||
          ((t = v({ src: t, async: !0, type: 'module' }, e)),
          (e = Le.get(u)) && vo(t, e),
          (i = l.createElement('script')),
          Wt(i),
          ne(i, 'link', t),
          l.head.appendChild(i)),
        (i = { type: 'script', instance: i, count: 1, state: null }),
        n.set(u, i));
    }
  }
  function ah(t, e, l, n) {
    var u = (u = ft.current) ? ji(u) : null;
    if (!u) throw Error(s(446));
    switch (t) {
      case 'meta':
      case 'title':
        return null;
      case 'style':
        return typeof l.precedence == 'string' && typeof l.href == 'string'
          ? ((e = la(l.href)),
            (l = Tn(u).hoistableStyles),
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
          t = la(l.href);
          var i = Tn(u).hoistableStyles,
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
              (i = u.querySelector(au(t))) && !i._p && ((f.instance = i), (f.state.loading = 5)),
              Le.has(t) ||
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
                Le.set(t, l),
                i || hg(u, t, l, f.state))),
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
            ? ((e = na(l)),
              (l = Tn(u).hoistableScripts),
              (n = l.get(e)),
              n || ((n = { type: 'script', instance: null, count: 0, state: null }), l.set(e, n)),
              n)
            : { type: 'void', instance: null, count: 0, state: null }
        );
      default:
        throw Error(s(444, t));
    }
  }
  function la(t) {
    return 'href="' + je(t) + '"';
  }
  function au(t) {
    return 'link[rel="stylesheet"][' + t + ']';
  }
  function uh(t) {
    return v({}, t, { 'data-precedence': t.precedence, precedence: null });
  }
  function hg(t, e, l, n) {
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
        Wt(e),
        t.head.appendChild(e));
  }
  function na(t) {
    return '[src="' + je(t) + '"]';
  }
  function uu(t) {
    return 'script[async]' + t;
  }
  function ih(t, e, l) {
    if ((e.count++, e.instance === null))
      switch (e.type) {
        case 'style':
          var n = t.querySelector('style[data-href~="' + je(l.href) + '"]');
          if (n) return ((e.instance = n), Wt(n), n);
          var u = v({}, l, {
            'data-href': l.href,
            'data-precedence': l.precedence,
            href: null,
            precedence: null,
          });
          return (
            (n = (t.ownerDocument || t).createElement('style')),
            Wt(n),
            ne(n, 'style', u),
            zi(n, l.precedence, t),
            (e.instance = n)
          );
        case 'stylesheet':
          u = la(l.href);
          var i = t.querySelector(au(u));
          if (i) return ((e.state.loading |= 4), (e.instance = i), Wt(i), i);
          ((n = uh(l)),
            (u = Le.get(u)) && go(n, u),
            (i = (t.ownerDocument || t).createElement('link')),
            Wt(i));
          var f = i;
          return (
            (f._p = new Promise(function (h, x) {
              ((f.onload = h), (f.onerror = x));
            })),
            ne(i, 'link', n),
            (e.state.loading |= 4),
            zi(i, l.precedence, t),
            (e.instance = i)
          );
        case 'script':
          return (
            (i = na(l.src)),
            (u = t.querySelector(uu(i)))
              ? ((e.instance = u), Wt(u), u)
              : ((n = l),
                (u = Le.get(i)) && ((n = v({}, l)), vo(n, u)),
                (t = t.ownerDocument || t),
                (u = t.createElement('script')),
                Wt(u),
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
      var h = n[f];
      if (h.dataset.precedence === e) i = h;
      else if (i !== u) break;
    }
    i
      ? i.parentNode.insertBefore(t, i.nextSibling)
      : ((e = l.nodeType === 9 ? l.head : l), e.insertBefore(t, e.firstChild));
  }
  function go(t, e) {
    (t.crossOrigin == null && (t.crossOrigin = e.crossOrigin),
      t.referrerPolicy == null && (t.referrerPolicy = e.referrerPolicy),
      t.title == null && (t.title = e.title));
  }
  function vo(t, e) {
    (t.crossOrigin == null && (t.crossOrigin = e.crossOrigin),
      t.referrerPolicy == null && (t.referrerPolicy = e.referrerPolicy),
      t.integrity == null && (t.integrity = e.integrity));
  }
  var Oi = null;
  function ch(t, e, l) {
    if (Oi === null) {
      var n = new Map(),
        u = (Oi = new Map());
      u.set(l, n);
    } else ((u = Oi), (n = u.get(l)), n || ((n = new Map()), u.set(l, n)));
    if (n.has(t)) return n;
    for (n.set(t, null), l = l.getElementsByTagName(t), u = 0; u < l.length; u++) {
      var i = l[u];
      if (
        !(i[Sa] || i[Pt] || (t === 'link' && i.getAttribute('rel') === 'stylesheet')) &&
        i.namespaceURI !== 'http://www.w3.org/2000/svg'
      ) {
        var f = i.getAttribute(e) || '';
        f = t + f;
        var h = n.get(f);
        h ? h.push(i) : n.set(f, [i]);
      }
    }
    return n;
  }
  function sh(t, e, l) {
    ((t = t.ownerDocument || t),
      t.head.insertBefore(l, e === 'title' ? t.querySelector('head > title') : null));
  }
  function pg(t, e, l) {
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
  function yg(t, e, l, n) {
    if (
      l.type === 'stylesheet' &&
      (typeof n.media != 'string' || matchMedia(n.media).matches !== !1) &&
      (l.state.loading & 4) === 0
    ) {
      if (l.instance === null) {
        var u = la(n.href),
          i = e.querySelector(au(u));
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
          (n = uh(n)),
          (u = Le.get(u)) && go(n, u),
          (i = i.createElement('link')),
          Wt(i));
        var f = i;
        ((f._p = new Promise(function (h, x) {
          ((f.onload = h), (f.onerror = x));
        })),
          ne(i, 'link', n),
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
  var _o = 0;
  function gg(t, e) {
    return (
      t.stylesheets && t.count === 0 && wi(t, t.stylesheets),
      0 < t.count || 0 < t.imgCount
        ? function (l) {
            var n = setTimeout(function () {
              if ((t.stylesheets && wi(t, t.stylesheets), t.unsuspend)) {
                var i = t.unsuspend;
                ((t.unsuspend = null), i());
              }
            }, 6e4 + e);
            0 < t.imgBytes && _o === 0 && (_o = 62500 * W0());
            var u = setTimeout(
              function () {
                if (
                  ((t.waitingForImages = !1),
                  t.count === 0 && (t.stylesheets && wi(t, t.stylesheets), t.unsuspend))
                ) {
                  var i = t.unsuspend;
                  ((t.unsuspend = null), i());
                }
              },
              (t.imgBytes > _o ? 50 : 800) + e
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
  function Di() {
    if ((this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages))) {
      if (this.stylesheets) wi(this, this.stylesheets);
      else if (this.unsuspend) {
        var t = this.unsuspend;
        ((this.unsuspend = null), t());
      }
    }
  }
  var ki = null;
  function wi(t, e) {
    ((t.stylesheets = null),
      t.unsuspend !== null &&
        (t.count++, (ki = new Map()), e.forEach(vg, t), (ki = null), Di.call(t)));
  }
  function vg(t, e) {
    if (!(e.state.loading & 4)) {
      var l = ki.get(t);
      if (l) var n = l.get(null);
      else {
        ((l = new Map()), ki.set(t, l));
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
        (n = Di.bind(this)),
        u.addEventListener('load', n),
        u.addEventListener('error', n),
        i
          ? i.parentNode.insertBefore(u, i.nextSibling)
          : ((t = t.nodeType === 9 ? t.head : t), t.insertBefore(u, t.firstChild)),
        (e.state.loading |= 4));
    }
  }
  var iu = {
    $$typeof: z,
    Provider: null,
    Consumer: null,
    _currentValue: nt,
    _currentValue2: nt,
    _threadCount: 0,
  };
  function _g(t, e, l, n, u, i, f, h, x) {
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
      (this.expirationTimes = mc(-1)),
      (this.entangledLanes =
        this.shellSuspendCounter =
        this.errorRecoveryDisabledLanes =
        this.expiredLanes =
        this.warmLanes =
        this.pingedLanes =
        this.suspendedLanes =
        this.pendingLanes =
          0),
      (this.entanglements = mc(0)),
      (this.hiddenUpdates = mc(null)),
      (this.identifierPrefix = n),
      (this.onUncaughtError = u),
      (this.onCaughtError = i),
      (this.onRecoverableError = f),
      (this.pooledCache = null),
      (this.pooledCacheLanes = 0),
      (this.formState = x),
      (this.incompleteTransitions = new Map()));
  }
  function rh(t, e, l, n, u, i, f, h, x, M, U, G) {
    return (
      (t = new _g(t, e, l, f, x, M, U, G, h)),
      (e = 1),
      i === !0 && (e |= 24),
      (i = Se(3, null, null, e)),
      (t.current = i),
      (i.stateNode = t),
      (e = Wc()),
      e.refCount++,
      (t.pooledCache = e),
      e.refCount++,
      (i.memoizedState = { element: n, isDehydrated: l, cache: e }),
      es(i),
      t
    );
  }
  function fh(t) {
    return t ? ((t = kn), t) : kn;
  }
  function dh(t, e, l, n, u, i) {
    ((u = fh(u)),
      n.context === null ? (n.context = u) : (n.pendingContext = u),
      (n = jl(e)),
      (n.payload = { element: l }),
      (i = i === void 0 ? null : i),
      i !== null && (n.callback = i),
      (l = zl(t, n, e)),
      l !== null && (ye(l, t, e), La(l, t, e)));
  }
  function mh(t, e) {
    if (((t = t.memoizedState), t !== null && t.dehydrated !== null)) {
      var l = t.retryLane;
      t.retryLane = l !== 0 && l < e ? l : e;
    }
  }
  function bo(t, e) {
    (mh(t, e), (t = t.alternate) && mh(t, e));
  }
  function hh(t) {
    if (t.tag === 13 || t.tag === 31) {
      var e = nn(t, 67108864);
      (e !== null && ye(e, t, 67108864), bo(t, 67108864));
    }
  }
  function ph(t) {
    if (t.tag === 13 || t.tag === 31) {
      var e = Ae();
      e = hc(e);
      var l = nn(t, e);
      (l !== null && ye(l, t, e), bo(t, e));
    }
  }
  var Ui = !0;
  function bg(t, e, l, n) {
    var u = B.T;
    B.T = null;
    var i = J.p;
    try {
      ((J.p = 2), So(t, e, l, n));
    } finally {
      ((J.p = i), (B.T = u));
    }
  }
  function Sg(t, e, l, n) {
    var u = B.T;
    B.T = null;
    var i = J.p;
    try {
      ((J.p = 8), So(t, e, l, n));
    } finally {
      ((J.p = i), (B.T = u));
    }
  }
  function So(t, e, l, n) {
    if (Ui) {
      var u = xo(n);
      if (u === null) (io(t, e, n, Bi, l), gh(t, n));
      else if (Eg(u, t, e, l, n)) n.stopPropagation();
      else if ((gh(t, n), e & 4 && -1 < xg.indexOf(t))) {
        for (; u !== null; ) {
          var i = En(u);
          if (i !== null)
            switch (i.tag) {
              case 3:
                if (((i = i.stateNode), i.current.memoizedState.isDehydrated)) {
                  var f = Fl(i.pendingLanes);
                  if (f !== 0) {
                    var h = i;
                    for (h.pendingLanes |= 2, h.entangledLanes |= 2; f; ) {
                      var x = 1 << (31 - _e(f));
                      ((h.entanglements[1] |= x), (f &= ~x));
                    }
                    (Ie(i), (xt & 6) === 0 && ((_i = ge() + 500), tu(0)));
                  }
                }
                break;
              case 31:
              case 13:
                ((h = nn(i, 2)), h !== null && ye(h, i, 2), Si(), bo(i, 2));
            }
          if (((i = xo(n)), i === null && io(t, e, n, Bi, l), i === u)) break;
          u = i;
        }
        u !== null && n.stopPropagation();
      } else io(t, e, n, null, l);
    }
  }
  function xo(t) {
    return ((t = Ec(t)), Eo(t));
  }
  var Bi = null;
  function Eo(t) {
    if (((Bi = null), (t = xn(t)), t !== null)) {
      var e = d(t);
      if (e === null) t = null;
      else {
        var l = e.tag;
        if (l === 13) {
          if (((t = p(e)), t !== null)) return t;
          t = null;
        } else if (l === 31) {
          if (((t = _(e)), t !== null)) return t;
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
  function yh(t) {
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
        switch (cy()) {
          case Er:
            return 2;
          case Tr:
            return 8;
          case Au:
          case sy:
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
  var To = !1,
    Yl = null,
    Xl = null,
    Vl = null,
    cu = new Map(),
    su = new Map(),
    Ql = [],
    xg =
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
        cu.delete(e.pointerId);
        break;
      case 'gotpointercapture':
      case 'lostpointercapture':
        su.delete(e.pointerId);
    }
  }
  function ou(t, e, l, n, u, i) {
    return t === null || t.nativeEvent !== i
      ? ((t = {
          blockedOn: e,
          domEventName: l,
          eventSystemFlags: n,
          nativeEvent: i,
          targetContainers: [u],
        }),
        e !== null && ((e = En(e)), e !== null && hh(e)),
        t)
      : ((t.eventSystemFlags |= n),
        (e = t.targetContainers),
        u !== null && e.indexOf(u) === -1 && e.push(u),
        t);
  }
  function Eg(t, e, l, n, u) {
    switch (e) {
      case 'focusin':
        return ((Yl = ou(Yl, t, e, l, n, u)), !0);
      case 'dragenter':
        return ((Xl = ou(Xl, t, e, l, n, u)), !0);
      case 'mouseover':
        return ((Vl = ou(Vl, t, e, l, n, u)), !0);
      case 'pointerover':
        var i = u.pointerId;
        return (cu.set(i, ou(cu.get(i) || null, t, e, l, n, u)), !0);
      case 'gotpointercapture':
        return ((i = u.pointerId), su.set(i, ou(su.get(i) || null, t, e, l, n, u)), !0);
    }
    return !1;
  }
  function vh(t) {
    var e = xn(t.target);
    if (e !== null) {
      var l = d(e);
      if (l !== null) {
        if (((e = l.tag), e === 13)) {
          if (((e = p(l)), e !== null)) {
            ((t.blockedOn = e),
              zr(t.priority, function () {
                ph(l);
              }));
            return;
          }
        } else if (e === 31) {
          if (((e = _(l)), e !== null)) {
            ((t.blockedOn = e),
              zr(t.priority, function () {
                ph(l);
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
  function Li(t) {
    if (t.blockedOn !== null) return !1;
    for (var e = t.targetContainers; 0 < e.length; ) {
      var l = xo(t.nativeEvent);
      if (l === null) {
        l = t.nativeEvent;
        var n = new l.constructor(l.type, l);
        ((xc = n), l.target.dispatchEvent(n), (xc = null));
      } else return ((e = En(l)), e !== null && hh(e), (t.blockedOn = l), !1);
      e.shift();
    }
    return !0;
  }
  function _h(t, e, l) {
    Li(t) && l.delete(e);
  }
  function Tg() {
    ((To = !1),
      Yl !== null && Li(Yl) && (Yl = null),
      Xl !== null && Li(Xl) && (Xl = null),
      Vl !== null && Li(Vl) && (Vl = null),
      cu.forEach(_h),
      su.forEach(_h));
  }
  function Hi(t, e) {
    t.blockedOn === e &&
      ((t.blockedOn = null),
      To || ((To = !0), a.unstable_scheduleCallback(a.unstable_NormalPriority, Tg)));
  }
  var qi = null;
  function bh(t) {
    qi !== t &&
      ((qi = t),
      a.unstable_scheduleCallback(a.unstable_NormalPriority, function () {
        qi === t && (qi = null);
        for (var e = 0; e < t.length; e += 3) {
          var l = t[e],
            n = t[e + 1],
            u = t[e + 2];
          if (typeof n != 'function') {
            if (Eo(n || l) === null) continue;
            break;
          }
          var i = En(l);
          i !== null &&
            (t.splice(e, 3),
            (e -= 3),
            Ss(i, { pending: !0, data: u, method: l.method, action: n }, n, u));
        }
      }));
  }
  function aa(t) {
    function e(x) {
      return Hi(x, t);
    }
    (Yl !== null && Hi(Yl, t),
      Xl !== null && Hi(Xl, t),
      Vl !== null && Hi(Vl, t),
      cu.forEach(e),
      su.forEach(e));
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
          f = u[re] || null;
        if (typeof i == 'function') f || bh(l);
        else if (f) {
          var h = null;
          if (i && i.hasAttribute('formAction')) {
            if (((u = i), (f = i[re] || null))) h = f.formAction;
            else if (Eo(u) !== null) continue;
          } else h = f.action;
          (typeof h == 'function' ? (l[n + 1] = h) : (l.splice(n, 3), (n -= 3)), bh(l));
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
  function No(t) {
    this._internalRoot = t;
  }
  ((Gi.prototype.render = No.prototype.render =
    function (t) {
      var e = this._internalRoot;
      if (e === null) throw Error(s(409));
      var l = e.current,
        n = Ae();
      dh(l, n, t, e, null, null);
    }),
    (Gi.prototype.unmount = No.prototype.unmount =
      function () {
        var t = this._internalRoot;
        if (t !== null) {
          this._internalRoot = null;
          var e = t.containerInfo;
          (dh(t.current, 2, null, t, null, null), Si(), (e[Sn] = null));
        }
      }));
  function Gi(t) {
    this._internalRoot = t;
  }
  Gi.prototype.unstable_scheduleHydration = function (t) {
    if (t) {
      var e = jr();
      t = { blockedOn: null, target: t, priority: e };
      for (var l = 0; l < Ql.length && e !== 0 && e < Ql[l].priority; l++);
      (Ql.splice(l, 0, t), l === 0 && vh(t));
    }
  };
  var xh = c.version;
  if (xh !== '19.2.5') throw Error(s(527, xh, '19.2.5'));
  J.findDOMNode = function (t) {
    var e = t._reactInternals;
    if (e === void 0)
      throw typeof t.render == 'function'
        ? Error(s(188))
        : ((t = Object.keys(t).join(',')), Error(s(268, t)));
    return ((t = m(e)), (t = t !== null ? b(t) : null), (t = t === null ? null : t.stateNode), t);
  };
  var Ng = {
    bundleType: 0,
    version: '19.2.5',
    rendererPackageName: 'react-dom',
    currentDispatcherRef: B,
    reconcilerVersion: '19.2.5',
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < 'u') {
    var Yi = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Yi.isDisabled && Yi.supportsFiber)
      try {
        ((va = Yi.inject(Ng)), (ve = Yi));
      } catch {}
  }
  return (
    (fu.createRoot = function (t, e) {
      if (!r(t)) throw Error(s(299));
      var l = !1,
        n = '',
        u = Rd,
        i = jd,
        f = zd;
      return (
        e != null &&
          (e.unstable_strictMode === !0 && (l = !0),
          e.identifierPrefix !== void 0 && (n = e.identifierPrefix),
          e.onUncaughtError !== void 0 && (u = e.onUncaughtError),
          e.onCaughtError !== void 0 && (i = e.onCaughtError),
          e.onRecoverableError !== void 0 && (f = e.onRecoverableError)),
        (e = rh(t, 1, !1, null, null, l, n, null, u, i, f, Sh)),
        (t[Sn] = e.current),
        uo(t),
        new No(e)
      );
    }),
    (fu.hydrateRoot = function (t, e, l) {
      if (!r(t)) throw Error(s(299));
      var n = !1,
        u = '',
        i = Rd,
        f = jd,
        h = zd,
        x = null;
      return (
        l != null &&
          (l.unstable_strictMode === !0 && (n = !0),
          l.identifierPrefix !== void 0 && (u = l.identifierPrefix),
          l.onUncaughtError !== void 0 && (i = l.onUncaughtError),
          l.onCaughtError !== void 0 && (f = l.onCaughtError),
          l.onRecoverableError !== void 0 && (h = l.onRecoverableError),
          l.formState !== void 0 && (x = l.formState)),
        (e = rh(t, 1, !0, e, l ?? null, n, u, x, i, f, h, Sh)),
        (e.context = fh(null)),
        (l = e.current),
        (n = Ae()),
        (n = hc(n)),
        (u = jl(n)),
        (u.callback = null),
        zl(l, u, n),
        (l = n),
        (e.current.lanes = l),
        ba(e, l),
        Ie(e),
        (t[Sn] = e.current),
        uo(t),
        new Gi(e)
      );
    }),
    (fu.version = '19.2.5'),
    fu
  );
}
var Oh;
function Bg() {
  if (Oh) return Mo.exports;
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
  return (a(), (Mo.exports = Ug()), Mo.exports);
}
var Lg = Bg(),
  N = er();
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
function Hg(a = {}) {
  function c(s, r) {
    var m;
    let d = (m = r.state) == null ? void 0 : m.masked,
      { pathname: p, search: _, hash: y } = d || s.location;
    return Xo(
      '',
      { pathname: p, search: _, hash: y },
      (r.state && r.state.usr) || null,
      (r.state && r.state.key) || 'default',
      d
        ? { pathname: s.location.pathname, search: s.location.search, hash: s.location.hash }
        : void 0
    );
  }
  function o(s, r) {
    return typeof r == 'string' ? r : vu(r);
  }
  return Gg(c, o, null, a);
}
function Bt(a, c) {
  if (a === !1 || a === null || typeof a > 'u') throw new Error(c);
}
function Qe(a, c) {
  if (!a) {
    typeof console < 'u' && console.warn(c);
    try {
      throw new Error(c);
    } catch {}
  }
}
function qg() {
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
function Xo(a, c, o = null, s, r) {
  return {
    pathname: typeof a == 'string' ? a : a.pathname,
    search: '',
    hash: '',
    ...(typeof c == 'string' ? da(c) : c),
    state: o,
    key: (c && c.key) || s || qg(),
    unstable_mask: r,
  };
}
function vu({ pathname: a = '/', search: c = '', hash: o = '' }) {
  return (
    c && c !== '?' && (a += c.charAt(0) === '?' ? c : '?' + c),
    o && o !== '#' && (a += o.charAt(0) === '#' ? o : '#' + o),
    a
  );
}
function da(a) {
  let c = {};
  if (a) {
    let o = a.indexOf('#');
    o >= 0 && ((c.hash = a.substring(o)), (a = a.substring(0, o)));
    let s = a.indexOf('?');
    (s >= 0 && ((c.search = a.substring(s)), (a = a.substring(0, s))), a && (c.pathname = a));
  }
  return c;
}
function Gg(a, c, o, s = {}) {
  let { window: r = document.defaultView, v5Compat: d = !1 } = s,
    p = r.history,
    _ = 'POP',
    y = null,
    m = b();
  m == null && ((m = 0), p.replaceState({ ...p.state, idx: m }, ''));
  function b() {
    return (p.state || { idx: null }).idx;
  }
  function v() {
    _ = 'POP';
    let q = b(),
      H = q == null ? null : q - m;
    ((m = q), y && y({ action: _, location: w.location, delta: H }));
  }
  function E(q, H) {
    _ = 'PUSH';
    let Q = kh(q) ? q : Xo(w.location, q, H);
    m = b() + 1;
    let z = wh(Q, m),
      Y = w.createHref(Q.unstable_mask || Q);
    try {
      p.pushState(z, '', Y);
    } catch ($) {
      if ($ instanceof DOMException && $.name === 'DataCloneError') throw $;
      r.location.assign(Y);
    }
    d && y && y({ action: _, location: w.location, delta: 1 });
  }
  function k(q, H) {
    _ = 'REPLACE';
    let Q = kh(q) ? q : Xo(w.location, q, H);
    m = b();
    let z = wh(Q, m),
      Y = w.createHref(Q.unstable_mask || Q);
    (p.replaceState(z, '', Y), d && y && y({ action: _, location: w.location, delta: 0 }));
  }
  function j(q) {
    return Yg(q);
  }
  let w = {
    get action() {
      return _;
    },
    get location() {
      return a(r, p);
    },
    listen(q) {
      if (y) throw new Error('A history only accepts one active listener');
      return (
        r.addEventListener(Dh, v),
        (y = q),
        () => {
          (r.removeEventListener(Dh, v), (y = null));
        }
      );
    },
    createHref(q) {
      return c(r, q);
    },
    createURL: j,
    encodeLocation(q) {
      let H = j(q);
      return { pathname: H.pathname, search: H.search, hash: H.hash };
    },
    push: E,
    replace: k,
    go(q) {
      return p.go(q);
    },
  };
  return w;
}
function Yg(a, c = !1) {
  let o = 'http://localhost';
  (typeof window < 'u' &&
    (o = window.location.origin !== 'null' ? window.location.origin : window.location.href),
    Bt(o, 'No window.location.(origin|href) available to create URL'));
  let s = typeof a == 'string' ? a : vu(a);
  return ((s = s.replace(/ $/, '%20')), !c && s.startsWith('//') && (s = o + s), new URL(s, o));
}
function ip(a, c, o = '/') {
  return Xg(a, c, o, !1);
}
function Xg(a, c, o, s) {
  let r = typeof c == 'string' ? da(c) : c,
    d = _l(r.pathname || '/', o);
  if (d == null) return null;
  let p = cp(a);
  Vg(p);
  let _ = null;
  for (let y = 0; _ == null && y < p.length; ++y) {
    let m = ev(d);
    _ = Pg(p[y], m, s);
  }
  return _;
}
function cp(a, c = [], o = [], s = '', r = !1) {
  let d = (p, _, y = r, m) => {
    let b = {
      relativePath: m === void 0 ? p.path || '' : m,
      caseSensitive: p.caseSensitive === !0,
      childrenIndex: _,
      route: p,
    };
    if (b.relativePath.startsWith('/')) {
      if (!b.relativePath.startsWith(s) && y) return;
      (Bt(
        b.relativePath.startsWith(s),
        `Absolute route path "${b.relativePath}" nested under path "${s}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`
      ),
        (b.relativePath = b.relativePath.slice(s.length)));
    }
    let v = Xe([s, b.relativePath]),
      E = o.concat(b);
    (p.children &&
      p.children.length > 0 &&
      (Bt(
        p.index !== !0,
        `Index routes must not have child routes. Please remove all child routes from route path "${v}".`
      ),
      cp(p.children, c, E, v, y)),
      !(p.path == null && !p.index) && c.push({ path: v, score: Wg(v, p.index), routesMeta: E }));
  };
  return (
    a.forEach((p, _) => {
      var y;
      if (p.path === '' || !((y = p.path) != null && y.includes('?'))) d(p, _);
      else for (let m of sp(p.path)) d(p, _, !0, m);
    }),
    c
  );
}
function sp(a) {
  let c = a.split('/');
  if (c.length === 0) return [];
  let [o, ...s] = c,
    r = o.endsWith('?'),
    d = o.replace(/\?$/, '');
  if (s.length === 0) return r ? [d, ''] : [d];
  let p = sp(s.join('/')),
    _ = [];
  return (
    _.push(...p.map((y) => (y === '' ? d : [d, y].join('/')))),
    r && _.push(...p),
    _.map((y) => (a.startsWith('/') && y === '' ? '/' : y))
  );
}
function Vg(a) {
  a.sort((c, o) =>
    c.score !== o.score
      ? o.score - c.score
      : Fg(
          c.routesMeta.map((s) => s.childrenIndex),
          o.routesMeta.map((s) => s.childrenIndex)
        )
  );
}
var Qg = /^:[\w-]+$/,
  Zg = 3,
  Kg = 2,
  $g = 1,
  Jg = 10,
  Ig = -2,
  Uh = (a) => a === '*';
function Wg(a, c) {
  let o = a.split('/'),
    s = o.length;
  return (
    o.some(Uh) && (s += Ig),
    c && (s += Kg),
    o.filter((r) => !Uh(r)).reduce((r, d) => r + (Qg.test(d) ? Zg : d === '' ? $g : Jg), s)
  );
}
function Fg(a, c) {
  return a.length === c.length && a.slice(0, -1).every((s, r) => s === c[r])
    ? a[a.length - 1] - c[c.length - 1]
    : 0;
}
function Pg(a, c, o = !1) {
  let { routesMeta: s } = a,
    r = {},
    d = '/',
    p = [];
  for (let _ = 0; _ < s.length; ++_) {
    let y = s[_],
      m = _ === s.length - 1,
      b = d === '/' ? c : c.slice(d.length) || '/',
      v = Ji({ path: y.relativePath, caseSensitive: y.caseSensitive, end: m }, b),
      E = y.route;
    if (
      (!v &&
        m &&
        o &&
        !s[s.length - 1].route.index &&
        (v = Ji({ path: y.relativePath, caseSensitive: y.caseSensitive, end: !1 }, b)),
      !v)
    )
      return null;
    (Object.assign(r, v.params),
      p.push({
        params: r,
        pathname: Xe([d, v.pathname]),
        pathnameBase: uv(Xe([d, v.pathnameBase])),
        route: E,
      }),
      v.pathnameBase !== '/' && (d = Xe([d, v.pathnameBase])));
  }
  return p;
}
function Ji(a, c) {
  typeof a == 'string' && (a = { path: a, caseSensitive: !1, end: !0 });
  let [o, s] = tv(a.path, a.caseSensitive, a.end),
    r = c.match(o);
  if (!r) return null;
  let d = r[0],
    p = d.replace(/(.)\/+$/, '$1'),
    _ = r.slice(1);
  return {
    params: s.reduce((m, { paramName: b, isOptional: v }, E) => {
      if (b === '*') {
        let j = _[E] || '';
        p = d.slice(0, d.length - j.length).replace(/(.)\/+$/, '$1');
      }
      const k = _[E];
      return (v && !k ? (m[b] = void 0) : (m[b] = (k || '').replace(/%2F/g, '/')), m);
    }, {}),
    pathname: d,
    pathnameBase: p,
    pattern: a,
  };
}
function tv(a, c = !1, o = !0) {
  Qe(
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
        .replace(/\/:([\w-]+)(\?)?/g, (p, _, y, m, b) => {
          if ((s.push({ paramName: _, isOptional: y != null }), y)) {
            let v = b.charAt(m + p.length);
            return v && v !== '/' ? '/([^\\/]*)' : '(?:/([^\\/]*))?';
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
function ev(a) {
  try {
    return a
      .split('/')
      .map((c) => decodeURIComponent(c).replace(/\//g, '%2F'))
      .join('/');
  } catch (c) {
    return (
      Qe(
        !1,
        `The URL path "${a}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${c}).`
      ),
      a
    );
  }
}
function _l(a, c) {
  if (c === '/') return a;
  if (!a.toLowerCase().startsWith(c.toLowerCase())) return null;
  let o = c.endsWith('/') ? c.length - 1 : c.length,
    s = a.charAt(o);
  return s && s !== '/' ? null : a.slice(o) || '/';
}
var lv = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;
function nv(a, c = '/') {
  let { pathname: o, search: s = '', hash: r = '' } = typeof a == 'string' ? da(a) : a,
    d;
  return (
    o ? ((o = op(o)), o.startsWith('/') ? (d = Bh(o.substring(1), '/')) : (d = Bh(o, c))) : (d = c),
    { pathname: d, search: iv(s), hash: cv(r) }
  );
}
function Bh(a, c) {
  let o = Ii(c).split('/');
  return (
    a.split('/').forEach((r) => {
      r === '..' ? o.length > 1 && o.pop() : r !== '.' && o.push(r);
    }),
    o.length > 1 ? o.join('/') : '/'
  );
}
function Do(a, c, o, s) {
  return `Cannot include a '${a}' character in a manually specified \`to.${c}\` field [${JSON.stringify(s)}].  Please separate it out to the \`to.${o}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`;
}
function av(a) {
  return a.filter((c, o) => o === 0 || (c.route.path && c.route.path.length > 0));
}
function lr(a) {
  let c = av(a);
  return c.map((o, s) => (s === c.length - 1 ? o.pathname : o.pathnameBase));
}
function Pi(a, c, o, s = !1) {
  let r;
  typeof a == 'string'
    ? (r = da(a))
    : ((r = { ...a }),
      Bt(!r.pathname || !r.pathname.includes('?'), Do('?', 'pathname', 'search', r)),
      Bt(!r.pathname || !r.pathname.includes('#'), Do('#', 'pathname', 'hash', r)),
      Bt(!r.search || !r.search.includes('#'), Do('#', 'search', 'hash', r)));
  let d = a === '' || r.pathname === '',
    p = d ? '/' : r.pathname,
    _;
  if (p == null) _ = o;
  else {
    let v = c.length - 1;
    if (!s && p.startsWith('..')) {
      let E = p.split('/');
      for (; E[0] === '..'; ) (E.shift(), (v -= 1));
      r.pathname = E.join('/');
    }
    _ = v >= 0 ? c[v] : '/';
  }
  let y = nv(r, _),
    m = p && p !== '/' && p.endsWith('/'),
    b = (d || p === '.') && o.endsWith('/');
  return (!y.pathname.endsWith('/') && (m || b) && (y.pathname += '/'), y);
}
var op = (a) => a.replace(/\/\/+/g, '/'),
  Xe = (a) => op(a.join('/')),
  Ii = (a) => a.replace(/\/+$/, ''),
  uv = (a) => Ii(a).replace(/^\/*/, '/'),
  iv = (a) => (!a || a === '?' ? '' : a.startsWith('?') ? a : '?' + a),
  cv = (a) => (!a || a === '#' ? '' : a.startsWith('#') ? a : '#' + a),
  sv = class {
    constructor(a, c, o, s = !1) {
      ((this.status = a),
        (this.statusText = c || ''),
        (this.internal = s),
        o instanceof Error ? ((this.data = o.toString()), (this.error = o)) : (this.data = o));
    }
  };
function ov(a) {
  return (
    a != null &&
    typeof a.status == 'number' &&
    typeof a.statusText == 'string' &&
    typeof a.internal == 'boolean' &&
    'data' in a
  );
}
function rv(a) {
  let c = a.map((o) => o.route.path).filter(Boolean);
  return Xe(c) || '/';
}
var rp =
  typeof window < 'u' && typeof window.document < 'u' && typeof window.document.createElement < 'u';
function fp(a, c) {
  let o = a;
  if (typeof o != 'string' || !lv.test(o)) return { absoluteURL: void 0, isExternal: !1, to: o };
  let s = o,
    r = !1;
  if (rp)
    try {
      let d = new URL(window.location.href),
        p = o.startsWith('//') ? new URL(d.protocol + o) : new URL(o),
        _ = _l(p.pathname, c);
      p.origin === d.origin && _ != null ? (o = _ + p.search + p.hash) : (r = !0);
    } catch {
      Qe(
        !1,
        `<Link to="${o}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`
      );
    }
  return { absoluteURL: s, isExternal: r, to: o };
}
Object.getOwnPropertyNames(Object.prototype).sort().join('\0');
var dp = ['POST', 'PUT', 'PATCH', 'DELETE'];
new Set(dp);
var fv = ['GET', ...dp];
new Set(fv);
var ma = N.createContext(null);
ma.displayName = 'DataRouter';
var tc = N.createContext(null);
tc.displayName = 'DataRouterState';
var mp = N.createContext(!1);
function dv() {
  return N.useContext(mp);
}
var hp = N.createContext({ isTransitioning: !1 });
hp.displayName = 'ViewTransition';
var mv = N.createContext(new Map());
mv.displayName = 'Fetchers';
var hv = N.createContext(null);
hv.displayName = 'Await';
var Me = N.createContext(null);
Me.displayName = 'Navigation';
var xu = N.createContext(null);
xu.displayName = 'Location';
var Ze = N.createContext({ outlet: null, matches: [], isDataRoute: !1 });
Ze.displayName = 'Route';
var nr = N.createContext(null);
nr.displayName = 'RouteError';
var pp = 'REACT_ROUTER_ERROR',
  pv = 'REDIRECT',
  yv = 'ROUTE_ERROR_RESPONSE';
function gv(a) {
  if (a.startsWith(`${pp}:${pv}:{`))
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
function vv(a) {
  if (a.startsWith(`${pp}:${yv}:{`))
    try {
      let c = JSON.parse(a.slice(40));
      if (
        typeof c == 'object' &&
        c &&
        typeof c.status == 'number' &&
        typeof c.statusText == 'string'
      )
        return new sv(c.status, c.statusText, c.data);
    } catch {}
}
function _v(a, { relative: c } = {}) {
  Bt(ha(), 'useHref() may be used only in the context of a <Router> component.');
  let { basename: o, navigator: s } = N.useContext(Me),
    { hash: r, pathname: d, search: p } = Eu(a, { relative: c }),
    _ = d;
  return (
    o !== '/' && (_ = d === '/' ? o : Xe([o, d])),
    s.createHref({ pathname: _, search: p, hash: r })
  );
}
function ha() {
  return N.useContext(xu) != null;
}
function Fe() {
  return (
    Bt(ha(), 'useLocation() may be used only in the context of a <Router> component.'),
    N.useContext(xu).location
  );
}
var yp =
  'You should call navigate() in a React.useEffect(), not when your component is first rendered.';
function gp(a) {
  N.useContext(Me).static || N.useLayoutEffect(a);
}
function Sl() {
  let { isDataRoute: a } = N.useContext(Ze);
  return a ? Dv() : bv();
}
function bv() {
  Bt(ha(), 'useNavigate() may be used only in the context of a <Router> component.');
  let a = N.useContext(ma),
    { basename: c, navigator: o } = N.useContext(Me),
    { matches: s } = N.useContext(Ze),
    { pathname: r } = Fe(),
    d = JSON.stringify(lr(s)),
    p = N.useRef(!1);
  return (
    gp(() => {
      p.current = !0;
    }),
    N.useCallback(
      (y, m = {}) => {
        if ((Qe(p.current, yp), !p.current)) return;
        if (typeof y == 'number') {
          o.go(y);
          return;
        }
        let b = Pi(y, JSON.parse(d), r, m.relative === 'path');
        (a == null && c !== '/' && (b.pathname = b.pathname === '/' ? c : Xe([c, b.pathname])),
          (m.replace ? o.replace : o.push)(b, m.state, m));
      },
      [c, o, d, r, a]
    )
  );
}
N.createContext(null);
function Sv() {
  let { matches: a } = N.useContext(Ze),
    c = a[a.length - 1];
  return (c == null ? void 0 : c.params) ?? {};
}
function Eu(a, { relative: c } = {}) {
  let { matches: o } = N.useContext(Ze),
    { pathname: s } = Fe(),
    r = JSON.stringify(lr(o));
  return N.useMemo(() => Pi(a, JSON.parse(r), s, c === 'path'), [a, r, s, c]);
}
function xv(a, c) {
  return vp(a, c);
}
function vp(a, c, o) {
  var q;
  Bt(ha(), 'useRoutes() may be used only in the context of a <Router> component.');
  let { navigator: s } = N.useContext(Me),
    { matches: r } = N.useContext(Ze),
    d = r[r.length - 1],
    p = d ? d.params : {},
    _ = d ? d.pathname : '/',
    y = d ? d.pathnameBase : '/',
    m = d && d.route;
  {
    let H = (m && m.path) || '';
    bp(
      _,
      !m || H.endsWith('*') || H.endsWith('*?'),
      `You rendered descendant <Routes> (or called \`useRoutes()\`) at "${_}" (under <Route path="${H}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${H}"> to <Route path="${H === '/' ? '*' : `${H}/*`}">.`
    );
  }
  let b = Fe(),
    v;
  if (c) {
    let H = typeof c == 'string' ? da(c) : c;
    (Bt(
      y === '/' || ((q = H.pathname) == null ? void 0 : q.startsWith(y)),
      `When overriding the location using \`<Routes location>\` or \`useRoutes(routes, location)\`, the location pathname must begin with the portion of the URL pathname that was matched by all parent routes. The current pathname base is "${y}" but pathname "${H.pathname}" was given in the \`location\` prop.`
    ),
      (v = H));
  } else v = b;
  let E = v.pathname || '/',
    k = E;
  if (y !== '/') {
    let H = y.replace(/^\//, '').split('/');
    k = '/' + E.replace(/^\//, '').split('/').slice(H.length).join('/');
  }
  let j = ip(a, { pathname: k });
  (Qe(m || j != null, `No routes matched location "${v.pathname}${v.search}${v.hash}" `),
    Qe(
      j == null ||
        j[j.length - 1].route.element !== void 0 ||
        j[j.length - 1].route.Component !== void 0 ||
        j[j.length - 1].route.lazy !== void 0,
      `Matched leaf route at location "${v.pathname}${v.search}${v.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`
    ));
  let w = Cv(
    j &&
      j.map((H) =>
        Object.assign({}, H, {
          params: Object.assign({}, p, H.params),
          pathname: Xe([
            y,
            s.encodeLocation
              ? s.encodeLocation(
                  H.pathname.replace(/%/g, '%25').replace(/\?/g, '%3F').replace(/#/g, '%23')
                ).pathname
              : H.pathname,
          ]),
          pathnameBase:
            H.pathnameBase === '/'
              ? y
              : Xe([
                  y,
                  s.encodeLocation
                    ? s.encodeLocation(
                        H.pathnameBase
                          .replace(/%/g, '%25')
                          .replace(/\?/g, '%3F')
                          .replace(/#/g, '%23')
                      ).pathname
                    : H.pathnameBase,
                ]),
        })
      ),
    r,
    o
  );
  return c && w
    ? N.createElement(
        xu.Provider,
        {
          value: {
            location: {
              pathname: '/',
              search: '',
              hash: '',
              state: null,
              key: 'default',
              unstable_mask: void 0,
              ...v,
            },
            navigationType: 'POP',
          },
        },
        w
      )
    : w;
}
function Ev() {
  let a = Ov(),
    c = ov(a) ? `${a.status} ${a.statusText}` : a instanceof Error ? a.message : JSON.stringify(a),
    o = a instanceof Error ? a.stack : null,
    s = 'rgba(200,200,200, 0.5)',
    r = { padding: '0.5rem', backgroundColor: s },
    d = { padding: '2px 4px', backgroundColor: s },
    p = null;
  return (
    console.error('Error handled by React Router default ErrorBoundary:', a),
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
var Tv = N.createElement(Ev, null),
  _p = class extends N.Component {
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
        const o = vv(a.digest);
        o && (a = o);
      }
      let c =
        a !== void 0
          ? N.createElement(
              Ze.Provider,
              { value: this.props.routeContext },
              N.createElement(nr.Provider, { value: a, children: this.props.component })
            )
          : this.props.children;
      return this.context ? N.createElement(Nv, { error: a }, c) : c;
    }
  };
_p.contextType = mp;
var ko = new WeakMap();
function Nv({ children: a, error: c }) {
  let { basename: o } = N.useContext(Me);
  if (typeof c == 'object' && c && 'digest' in c && typeof c.digest == 'string') {
    let s = gv(c.digest);
    if (s) {
      let r = ko.get(c);
      if (r) throw r;
      let d = fp(s.location, o);
      if (rp && !ko.get(c))
        if (d.isExternal || s.reloadDocument) window.location.href = d.absoluteURL || d.to;
        else {
          const p = Promise.resolve().then(() =>
            window.__reactRouterDataRouter.navigate(d.to, { replace: s.replace })
          );
          throw (ko.set(c, p), p);
        }
      return N.createElement('meta', {
        httpEquiv: 'refresh',
        content: `0;url=${d.absoluteURL || d.to}`,
      });
    }
  }
  return a;
}
function Av({ routeContext: a, match: c, children: o }) {
  let s = N.useContext(ma);
  return (
    s &&
      s.static &&
      s.staticContext &&
      (c.route.errorElement || c.route.ErrorBoundary) &&
      (s.staticContext._deepestRenderedBoundaryId = c.route.id),
    N.createElement(Ze.Provider, { value: a }, o)
  );
}
function Cv(a, c = [], o) {
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
    let b = r.findIndex((v) => v.route.id && (d == null ? void 0 : d[v.route.id]) !== void 0);
    (Bt(
      b >= 0,
      `Could not find a matching route for errors on route IDs: ${Object.keys(d).join(',')}`
    ),
      (r = r.slice(0, Math.min(r.length, b + 1))));
  }
  let p = !1,
    _ = -1;
  if (o && s) {
    p = s.renderFallback;
    for (let b = 0; b < r.length; b++) {
      let v = r[b];
      if (((v.route.HydrateFallback || v.route.hydrateFallbackElement) && (_ = b), v.route.id)) {
        let { loaderData: E, errors: k } = s,
          j = v.route.loader && !E.hasOwnProperty(v.route.id) && (!k || k[v.route.id] === void 0);
        if (v.route.lazy || j) {
          (o.isStatic && (p = !0), _ >= 0 ? (r = r.slice(0, _ + 1)) : (r = [r[0]]));
          break;
        }
      }
    }
  }
  let y = o == null ? void 0 : o.onError,
    m =
      s && y
        ? (b, v) => {
            var E, k;
            y(b, {
              location: s.location,
              params:
                ((k = (E = s.matches) == null ? void 0 : E[0]) == null ? void 0 : k.params) ?? {},
              unstable_pattern: rv(s.matches),
              errorInfo: v,
            });
          }
        : void 0;
  return r.reduceRight((b, v, E) => {
    let k,
      j = !1,
      w = null,
      q = null;
    s &&
      ((k = d && v.route.id ? d[v.route.id] : void 0),
      (w = v.route.errorElement || Tv),
      p &&
        (_ < 0 && E === 0
          ? (bp(
              'route-fallback',
              !1,
              'No `HydrateFallback` element provided to render during initial hydration'
            ),
            (j = !0),
            (q = null))
          : _ === E && ((j = !0), (q = v.route.hydrateFallbackElement || null))));
    let H = c.concat(r.slice(0, E + 1)),
      Q = () => {
        let z;
        return (
          k
            ? (z = w)
            : j
              ? (z = q)
              : v.route.Component
                ? (z = N.createElement(v.route.Component, null))
                : v.route.element
                  ? (z = v.route.element)
                  : (z = b),
          N.createElement(Av, {
            match: v,
            routeContext: { outlet: b, matches: H, isDataRoute: s != null },
            children: z,
          })
        );
      };
    return s && (v.route.ErrorBoundary || v.route.errorElement || E === 0)
      ? N.createElement(_p, {
          location: s.location,
          revalidation: s.revalidation,
          component: w,
          error: k,
          children: Q(),
          routeContext: { outlet: null, matches: H, isDataRoute: !0 },
          onError: m,
        })
      : Q();
  }, null);
}
function ar(a) {
  return `${a} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function Mv(a) {
  let c = N.useContext(ma);
  return (Bt(c, ar(a)), c);
}
function Rv(a) {
  let c = N.useContext(tc);
  return (Bt(c, ar(a)), c);
}
function jv(a) {
  let c = N.useContext(Ze);
  return (Bt(c, ar(a)), c);
}
function ur(a) {
  let c = jv(a),
    o = c.matches[c.matches.length - 1];
  return (Bt(o.route.id, `${a} can only be used on routes that contain a unique "id"`), o.route.id);
}
function zv() {
  return ur('useRouteId');
}
function Ov() {
  var s;
  let a = N.useContext(nr),
    c = Rv('useRouteError'),
    o = ur('useRouteError');
  return a !== void 0 ? a : (s = c.errors) == null ? void 0 : s[o];
}
function Dv() {
  let { router: a } = Mv('useNavigate'),
    c = ur('useNavigate'),
    o = N.useRef(!1);
  return (
    gp(() => {
      o.current = !0;
    }),
    N.useCallback(
      async (r, d = {}) => {
        (Qe(o.current, yp),
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
function bp(a, c, o) {
  !c && !Lh[a] && ((Lh[a] = !0), Qe(!1, o));
}
N.memo(kv);
function kv({ routes: a, future: c, state: o, isStatic: s, onError: r }) {
  return vp(a, void 0, { state: o, isStatic: s, onError: r });
}
function bl({ to: a, replace: c, state: o, relative: s }) {
  Bt(ha(), '<Navigate> may be used only in the context of a <Router> component.');
  let { static: r } = N.useContext(Me);
  Qe(
    !r,
    '<Navigate> must not be used on the initial render in a <StaticRouter>. This is a no-op, but you should modify your code so the <Navigate> is only ever rendered in response to some user interaction or state change.'
  );
  let { matches: d } = N.useContext(Ze),
    { pathname: p } = Fe(),
    _ = Sl(),
    y = Pi(a, lr(d), p, s === 'path'),
    m = JSON.stringify(y);
  return (
    N.useEffect(() => {
      _(JSON.parse(m), { replace: c, state: o, relative: s });
    }, [_, m, s, c, o]),
    null
  );
}
function We(a) {
  Bt(
    !1,
    'A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>.'
  );
}
function wv({
  basename: a = '/',
  children: c = null,
  location: o,
  navigationType: s = 'POP',
  navigator: r,
  static: d = !1,
  unstable_useTransitions: p,
}) {
  Bt(
    !ha(),
    'You cannot render a <Router> inside another <Router>. You should never have more than one in your app.'
  );
  let _ = a.replace(/^\/*/, '/'),
    y = N.useMemo(
      () => ({ basename: _, navigator: r, static: d, unstable_useTransitions: p, future: {} }),
      [_, r, d, p]
    );
  typeof o == 'string' && (o = da(o));
  let {
      pathname: m = '/',
      search: b = '',
      hash: v = '',
      state: E = null,
      key: k = 'default',
      unstable_mask: j,
    } = o,
    w = N.useMemo(() => {
      let q = _l(m, _);
      return q == null
        ? null
        : {
            location: { pathname: q, search: b, hash: v, state: E, key: k, unstable_mask: j },
            navigationType: s,
          };
    }, [_, m, b, v, E, k, s, j]);
  return (
    Qe(
      w != null,
      `<Router basename="${_}"> is not able to match the URL "${m}${b}${v}" because it does not start with the basename, so the <Router> won't render anything.`
    ),
    w == null
      ? null
      : N.createElement(
          Me.Provider,
          { value: y },
          N.createElement(xu.Provider, { children: c, value: w })
        )
  );
}
function Uv({ children: a, location: c }) {
  return xv(Vo(a), c);
}
function Vo(a, c = []) {
  let o = [];
  return (
    N.Children.forEach(a, (s, r) => {
      if (!N.isValidElement(s)) return;
      let d = [...c, r];
      if (s.type === N.Fragment) {
        o.push.apply(o, Vo(s.props.children, d));
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
      (s.props.children && (p.children = Vo(s.props.children, d)), o.push(p));
    }),
    o
  );
}
var Zi = 'get',
  Ki = 'application/x-www-form-urlencoded';
function ec(a) {
  return typeof HTMLElement < 'u' && a instanceof HTMLElement;
}
function Bv(a) {
  return ec(a) && a.tagName.toLowerCase() === 'button';
}
function Lv(a) {
  return ec(a) && a.tagName.toLowerCase() === 'form';
}
function Hv(a) {
  return ec(a) && a.tagName.toLowerCase() === 'input';
}
function qv(a) {
  return !!(a.metaKey || a.altKey || a.ctrlKey || a.shiftKey);
}
function Gv(a, c) {
  return a.button === 0 && (!c || c === '_self') && !qv(a);
}
var Xi = null;
function Yv() {
  if (Xi === null)
    try {
      (new FormData(document.createElement('form'), 0), (Xi = !1));
    } catch {
      Xi = !0;
    }
  return Xi;
}
var Xv = new Set(['application/x-www-form-urlencoded', 'multipart/form-data', 'text/plain']);
function wo(a) {
  return a != null && !Xv.has(a)
    ? (Qe(
        !1,
        `"${a}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${Ki}"`
      ),
      null)
    : a;
}
function Vv(a, c) {
  let o, s, r, d, p;
  if (Lv(a)) {
    let _ = a.getAttribute('action');
    ((s = _ ? _l(_, c) : null),
      (o = a.getAttribute('method') || Zi),
      (r = wo(a.getAttribute('enctype')) || Ki),
      (d = new FormData(a)));
  } else if (Bv(a) || (Hv(a) && (a.type === 'submit' || a.type === 'image'))) {
    let _ = a.form;
    if (_ == null)
      throw new Error('Cannot submit a <button> or <input type="submit"> without a <form>');
    let y = a.getAttribute('formaction') || _.getAttribute('action');
    if (
      ((s = y ? _l(y, c) : null),
      (o = a.getAttribute('formmethod') || _.getAttribute('method') || Zi),
      (r = wo(a.getAttribute('formenctype')) || wo(_.getAttribute('enctype')) || Ki),
      (d = new FormData(_, a)),
      !Yv())
    ) {
      let { name: m, type: b, value: v } = a;
      if (b === 'image') {
        let E = m ? `${m}.` : '';
        (d.append(`${E}x`, '0'), d.append(`${E}y`, '0'));
      } else m && d.append(m, v);
    }
  } else {
    if (ec(a))
      throw new Error(
        'Cannot submit element that is not <form>, <button>, or <input type="submit|image">'
      );
    ((o = Zi), (s = null), (r = Ki), (p = a));
  }
  return (
    d && r === 'text/plain' && ((p = d), (d = void 0)),
    { action: s, method: o.toLowerCase(), encType: r, formData: d, body: p }
  );
}
Object.getOwnPropertyNames(Object.prototype).sort().join('\0');
function ir(a, c) {
  if (a === !1 || a === null || typeof a > 'u') throw new Error(c);
}
function Sp(a, c, o, s) {
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
        : c && _l(r.pathname, c) === '/'
          ? (r.pathname = `${Ii(c)}/_root.${s}`)
          : (r.pathname = `${Ii(r.pathname)}.${s}`),
    r
  );
}
async function Qv(a, c) {
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
function Zv(a) {
  return a == null
    ? !1
    : a.href == null
      ? a.rel === 'preload' && typeof a.imageSrcSet == 'string' && typeof a.imageSizes == 'string'
      : typeof a.rel == 'string' && typeof a.href == 'string';
}
async function Kv(a, c, o) {
  let s = await Promise.all(
    a.map(async (r) => {
      let d = c.routes[r.route.id];
      if (d) {
        let p = await Qv(d, o);
        return p.links ? p.links() : [];
      }
      return [];
    })
  );
  return Wv(
    s
      .flat(1)
      .filter(Zv)
      .filter((r) => r.rel === 'stylesheet' || r.rel === 'preload')
      .map((r) =>
        r.rel === 'stylesheet' ? { ...r, rel: 'prefetch', as: 'style' } : { ...r, rel: 'prefetch' }
      )
  );
}
function Hh(a, c, o, s, r, d) {
  let p = (y, m) => (o[m] ? y.route.id !== o[m].route.id : !0),
    _ = (y, m) => {
      var b;
      return (
        o[m].pathname !== y.pathname ||
        (((b = o[m].route.path) == null ? void 0 : b.endsWith('*')) &&
          o[m].params['*'] !== y.params['*'])
      );
    };
  return d === 'assets'
    ? c.filter((y, m) => p(y, m) || _(y, m))
    : d === 'data'
      ? c.filter((y, m) => {
          var v;
          let b = s.routes[y.route.id];
          if (!b || !b.hasLoader) return !1;
          if (p(y, m) || _(y, m)) return !0;
          if (y.route.shouldRevalidate) {
            let E = y.route.shouldRevalidate({
              currentUrl: new URL(r.pathname + r.search + r.hash, window.origin),
              currentParams: ((v = o[0]) == null ? void 0 : v.params) || {},
              nextUrl: new URL(a, window.origin),
              nextParams: y.params,
              defaultShouldRevalidate: !0,
            });
            if (typeof E == 'boolean') return E;
          }
          return !0;
        })
      : [];
}
function $v(a, c, { includeHydrateFallback: o } = {}) {
  return Jv(
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
function Jv(a) {
  return [...new Set(a)];
}
function Iv(a) {
  let c = {},
    o = Object.keys(a).sort();
  for (let s of o) c[s] = a[s];
  return c;
}
function Wv(a, c) {
  let o = new Set();
  return (
    new Set(c),
    a.reduce((s, r) => {
      let d = JSON.stringify(Iv(r));
      return (o.has(d) || (o.add(d), s.push({ key: d, link: r })), s);
    }, [])
  );
}
function cr() {
  let a = N.useContext(ma);
  return (ir(a, 'You must render this element inside a <DataRouterContext.Provider> element'), a);
}
function Fv() {
  let a = N.useContext(tc);
  return (
    ir(a, 'You must render this element inside a <DataRouterStateContext.Provider> element'),
    a
  );
}
var sr = N.createContext(void 0);
sr.displayName = 'FrameworkContext';
function or() {
  let a = N.useContext(sr);
  return (ir(a, 'You must render this element inside a <HydratedRouter> element'), a);
}
function Pv(a, c) {
  let o = N.useContext(sr),
    [s, r] = N.useState(!1),
    [d, p] = N.useState(!1),
    { onFocus: _, onBlur: y, onMouseEnter: m, onMouseLeave: b, onTouchStart: v } = c,
    E = N.useRef(null);
  (N.useEffect(() => {
    if ((a === 'render' && p(!0), a === 'viewport')) {
      let w = (H) => {
          H.forEach((Q) => {
            p(Q.isIntersecting);
          });
        },
        q = new IntersectionObserver(w, { threshold: 0.5 });
      return (
        E.current && q.observe(E.current),
        () => {
          q.disconnect();
        }
      );
    }
  }, [a]),
    N.useEffect(() => {
      if (s) {
        let w = setTimeout(() => {
          p(!0);
        }, 100);
        return () => {
          clearTimeout(w);
        };
      }
    }, [s]));
  let k = () => {
      r(!0);
    },
    j = () => {
      (r(!1), p(!1));
    };
  return o
    ? a !== 'intent'
      ? [d, E, {}]
      : [
          d,
          E,
          {
            onFocus: du(_, k),
            onBlur: du(y, j),
            onMouseEnter: du(m, k),
            onMouseLeave: du(b, j),
            onTouchStart: du(v, k),
          },
        ]
    : [!1, E, {}];
}
function du(a, c) {
  return (o) => {
    (a && a(o), o.defaultPrevented || c(o));
  };
}
function t1({ page: a, ...c }) {
  let o = dv(),
    { router: s } = cr(),
    r = N.useMemo(() => ip(s.routes, a, s.basename), [s.routes, a, s.basename]);
  return r
    ? o
      ? N.createElement(l1, { page: a, matches: r, ...c })
      : N.createElement(n1, { page: a, matches: r, ...c })
    : null;
}
function e1(a) {
  let { manifest: c, routeModules: o } = or(),
    [s, r] = N.useState([]);
  return (
    N.useEffect(() => {
      let d = !1;
      return (
        Kv(a, c, o).then((p) => {
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
function l1({ page: a, matches: c, ...o }) {
  let s = Fe(),
    { future: r } = or(),
    { basename: d } = cr(),
    p = N.useMemo(() => {
      if (a === s.pathname + s.search + s.hash) return [];
      let _ = Sp(a, d, r.unstable_trailingSlashAwareDataRequests, 'rsc'),
        y = !1,
        m = [];
      for (let b of c)
        typeof b.route.shouldRevalidate == 'function' ? (y = !0) : m.push(b.route.id);
      return (
        y && m.length > 0 && _.searchParams.set('_routes', m.join(',')),
        [_.pathname + _.search]
      );
    }, [d, r.unstable_trailingSlashAwareDataRequests, a, s, c]);
  return N.createElement(
    N.Fragment,
    null,
    p.map((_) => N.createElement('link', { key: _, rel: 'prefetch', as: 'fetch', href: _, ...o }))
  );
}
function n1({ page: a, matches: c, ...o }) {
  let s = Fe(),
    { future: r, manifest: d, routeModules: p } = or(),
    { basename: _ } = cr(),
    { loaderData: y, matches: m } = Fv(),
    b = N.useMemo(() => Hh(a, c, m, d, s, 'data'), [a, c, m, d, s]),
    v = N.useMemo(() => Hh(a, c, m, d, s, 'assets'), [a, c, m, d, s]),
    E = N.useMemo(() => {
      if (a === s.pathname + s.search + s.hash) return [];
      let w = new Set(),
        q = !1;
      if (
        (c.forEach((Q) => {
          var Y;
          let z = d.routes[Q.route.id];
          !z ||
            !z.hasLoader ||
            ((!b.some(($) => $.route.id === Q.route.id) &&
              Q.route.id in y &&
              (Y = p[Q.route.id]) != null &&
              Y.shouldRevalidate) ||
            z.hasClientLoader
              ? (q = !0)
              : w.add(Q.route.id));
        }),
        w.size === 0)
      )
        return [];
      let H = Sp(a, _, r.unstable_trailingSlashAwareDataRequests, 'data');
      return (
        q &&
          w.size > 0 &&
          H.searchParams.set(
            '_routes',
            c
              .filter((Q) => w.has(Q.route.id))
              .map((Q) => Q.route.id)
              .join(',')
          ),
        [H.pathname + H.search]
      );
    }, [_, r.unstable_trailingSlashAwareDataRequests, y, s, d, b, c, a, p]),
    k = N.useMemo(() => $v(v, d), [v, d]),
    j = e1(v);
  return N.createElement(
    N.Fragment,
    null,
    E.map((w) => N.createElement('link', { key: w, rel: 'prefetch', as: 'fetch', href: w, ...o })),
    k.map((w) => N.createElement('link', { key: w, rel: 'modulepreload', href: w, ...o })),
    j.map(({ key: w, link: q }) =>
      N.createElement('link', {
        key: w,
        nonce: o.nonce,
        ...q,
        crossOrigin: q.crossOrigin ?? o.crossOrigin,
      })
    )
  );
}
function a1(...a) {
  return (c) => {
    a.forEach((o) => {
      typeof o == 'function' ? o(c) : o != null && (o.current = c);
    });
  };
}
var u1 =
  typeof window < 'u' && typeof window.document < 'u' && typeof window.document.createElement < 'u';
try {
  u1 && (window.__reactRouterVersion = '7.14.2');
} catch {}
function i1({ basename: a, children: c, unstable_useTransitions: o, window: s }) {
  let r = N.useRef();
  r.current == null && (r.current = Hg({ window: s, v5Compat: !0 }));
  let d = r.current,
    [p, _] = N.useState({ action: d.action, location: d.location }),
    y = N.useCallback(
      (m) => {
        o === !1 ? _(m) : N.startTransition(() => _(m));
      },
      [o]
    );
  return (
    N.useLayoutEffect(() => d.listen(y), [d, y]),
    N.createElement(wv, {
      basename: a,
      children: c,
      location: p.location,
      navigationType: p.action,
      navigator: d,
      unstable_useTransitions: o,
    })
  );
}
var xp = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,
  Ep = N.forwardRef(function (
    {
      onClick: c,
      discover: o = 'render',
      prefetch: s = 'none',
      relative: r,
      reloadDocument: d,
      replace: p,
      unstable_mask: _,
      state: y,
      target: m,
      to: b,
      preventScrollReset: v,
      viewTransition: E,
      unstable_defaultShouldRevalidate: k,
      ...j
    },
    w
  ) {
    let { basename: q, navigator: H, unstable_useTransitions: Q } = N.useContext(Me),
      z = typeof b == 'string' && xp.test(b),
      Y = fp(b, q);
    b = Y.to;
    let $ = _v(b, { relative: r }),
      W = Fe(),
      K = null;
    if (_) {
      let Lt = Pi(_, [], W.unstable_mask ? W.unstable_mask.pathname : '/', !0);
      (q !== '/' && (Lt.pathname = Lt.pathname === '/' ? q : Xe([q, Lt.pathname])),
        (K = H.createHref(Lt)));
    }
    let [V, et, st] = Pv(s, j),
      yt = r1(b, {
        replace: p,
        unstable_mask: _,
        state: y,
        target: m,
        preventScrollReset: v,
        relative: r,
        viewTransition: E,
        unstable_defaultShouldRevalidate: k,
        unstable_useTransitions: Q,
      });
    function Nt(Lt) {
      (c && c(Lt), Lt.defaultPrevented || yt(Lt));
    }
    let Dt = !(Y.isExternal || d),
      oe = N.createElement('a', {
        ...j,
        ...st,
        href: (Dt ? K : void 0) || Y.absoluteURL || $,
        onClick: Dt ? Nt : c,
        ref: a1(w, et),
        target: m,
        'data-discover': !z && o === 'render' ? 'true' : void 0,
      });
    return V && !z ? N.createElement(N.Fragment, null, oe, N.createElement(t1, { page: $ })) : oe;
  });
Ep.displayName = 'Link';
var c1 = N.forwardRef(function (
  {
    'aria-current': c = 'page',
    caseSensitive: o = !1,
    className: s = '',
    end: r = !1,
    style: d,
    to: p,
    viewTransition: _,
    children: y,
    ...m
  },
  b
) {
  let v = Eu(p, { relative: m.relative }),
    E = Fe(),
    k = N.useContext(tc),
    { navigator: j, basename: w } = N.useContext(Me),
    q = k != null && p1(v) && _ === !0,
    H = j.encodeLocation ? j.encodeLocation(v).pathname : v.pathname,
    Q = E.pathname,
    z = k && k.navigation && k.navigation.location ? k.navigation.location.pathname : null;
  (o || ((Q = Q.toLowerCase()), (z = z ? z.toLowerCase() : null), (H = H.toLowerCase())),
    z && w && (z = _l(z, w) || z));
  const Y = H !== '/' && H.endsWith('/') ? H.length - 1 : H.length;
  let $ = Q === H || (!r && Q.startsWith(H) && Q.charAt(Y) === '/'),
    W = z != null && (z === H || (!r && z.startsWith(H) && z.charAt(H.length) === '/')),
    K = { isActive: $, isPending: W, isTransitioning: q },
    V = $ ? c : void 0,
    et;
  typeof s == 'function'
    ? (et = s(K))
    : (et = [s, $ ? 'active' : null, W ? 'pending' : null, q ? 'transitioning' : null]
        .filter(Boolean)
        .join(' '));
  let st = typeof d == 'function' ? d(K) : d;
  return N.createElement(
    Ep,
    { ...m, 'aria-current': V, className: et, ref: b, style: st, to: p, viewTransition: _ },
    typeof y == 'function' ? y(K) : y
  );
});
c1.displayName = 'NavLink';
var s1 = N.forwardRef(
  (
    {
      discover: a = 'render',
      fetcherKey: c,
      navigate: o,
      reloadDocument: s,
      replace: r,
      state: d,
      method: p = Zi,
      action: _,
      onSubmit: y,
      relative: m,
      preventScrollReset: b,
      viewTransition: v,
      unstable_defaultShouldRevalidate: E,
      ...k
    },
    j
  ) => {
    let { unstable_useTransitions: w } = N.useContext(Me),
      q = m1(),
      H = h1(_, { relative: m }),
      Q = p.toLowerCase() === 'get' ? 'get' : 'post',
      z = typeof _ == 'string' && xp.test(_),
      Y = ($) => {
        if ((y && y($), $.defaultPrevented)) return;
        $.preventDefault();
        let W = $.nativeEvent.submitter,
          K = (W == null ? void 0 : W.getAttribute('formmethod')) || p,
          V = () =>
            q(W || $.currentTarget, {
              fetcherKey: c,
              method: K,
              navigate: o,
              replace: r,
              state: d,
              relative: m,
              preventScrollReset: b,
              viewTransition: v,
              unstable_defaultShouldRevalidate: E,
            });
        w && o !== !1 ? N.startTransition(() => V()) : V();
      };
    return N.createElement('form', {
      ref: j,
      method: Q,
      action: H,
      onSubmit: s ? y : Y,
      ...k,
      'data-discover': !z && a === 'render' ? 'true' : void 0,
    });
  }
);
s1.displayName = 'Form';
function o1(a) {
  return `${a} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function Tp(a) {
  let c = N.useContext(ma);
  return (Bt(c, o1(a)), c);
}
function r1(
  a,
  {
    target: c,
    replace: o,
    unstable_mask: s,
    state: r,
    preventScrollReset: d,
    relative: p,
    viewTransition: _,
    unstable_defaultShouldRevalidate: y,
    unstable_useTransitions: m,
  } = {}
) {
  let b = Sl(),
    v = Fe(),
    E = Eu(a, { relative: p });
  return N.useCallback(
    (k) => {
      if (Gv(k, c)) {
        k.preventDefault();
        let j = o !== void 0 ? o : vu(v) === vu(E),
          w = () =>
            b(a, {
              replace: j,
              unstable_mask: s,
              state: r,
              preventScrollReset: d,
              relative: p,
              viewTransition: _,
              unstable_defaultShouldRevalidate: y,
            });
        m ? N.startTransition(() => w()) : w();
      }
    },
    [v, b, E, o, s, r, c, a, d, p, _, y, m]
  );
}
var f1 = 0,
  d1 = () => `__${String(++f1)}__`;
function m1() {
  let { router: a } = Tp('useSubmit'),
    { basename: c } = N.useContext(Me),
    o = zv(),
    s = a.fetch,
    r = a.navigate;
  return N.useCallback(
    async (d, p = {}) => {
      let { action: _, method: y, encType: m, formData: b, body: v } = Vv(d, c);
      if (p.navigate === !1) {
        let E = p.fetcherKey || d1();
        await s(E, o, p.action || _, {
          unstable_defaultShouldRevalidate: p.unstable_defaultShouldRevalidate,
          preventScrollReset: p.preventScrollReset,
          formData: b,
          body: v,
          formMethod: p.method || y,
          formEncType: p.encType || m,
          flushSync: p.flushSync,
        });
      } else
        await r(p.action || _, {
          unstable_defaultShouldRevalidate: p.unstable_defaultShouldRevalidate,
          preventScrollReset: p.preventScrollReset,
          formData: b,
          body: v,
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
function h1(a, { relative: c } = {}) {
  let { basename: o } = N.useContext(Me),
    s = N.useContext(Ze);
  Bt(s, 'useFormAction must be used inside a RouteContext');
  let [r] = s.matches.slice(-1),
    d = { ...Eu(a || '.', { relative: c }) },
    p = Fe();
  if (a == null) {
    d.search = p.search;
    let _ = new URLSearchParams(d.search),
      y = _.getAll('index');
    if (y.some((b) => b === '')) {
      (_.delete('index'), y.filter((v) => v).forEach((v) => _.append('index', v)));
      let b = _.toString();
      d.search = b ? `?${b}` : '';
    }
  }
  return (
    (!a || a === '.') &&
      r.route.index &&
      (d.search = d.search ? d.search.replace(/^\?/, '?index&') : '?index'),
    o !== '/' && (d.pathname = d.pathname === '/' ? o : Xe([o, d.pathname])),
    vu(d)
  );
}
function p1(a, { relative: c } = {}) {
  let o = N.useContext(hp);
  Bt(
    o != null,
    "`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?"
  );
  let { basename: s } = Tp('useViewTransitionState'),
    r = Eu(a, { relative: c });
  if (!o.isTransitioning) return !1;
  let d = _l(o.currentLocation.pathname, s) || o.currentLocation.pathname,
    p = _l(o.nextLocation.pathname, s) || o.nextLocation.pathname;
  return Ji(r.pathname, p) != null || Ji(r.pathname, d) != null;
}
const y1 = '_layout_apkdr_1',
  g1 = '_enemies_apkdr_12',
  v1 = '_enemy_apkdr_20',
  _1 = '_targeted_apkdr_35',
  b1 = '_enemyName_apkdr_39',
  S1 = '_down_apkdr_44',
  x1 = '_log_apkdr_48',
  E1 = '_logLine_apkdr_60',
  T1 = '_party_apkdr_64',
  N1 = '_rowTag_apkdr_71',
  A1 = '_cardRow_apkdr_77',
  C1 = '_card_apkdr_77',
  M1 = '_cardActive_apkdr_99',
  R1 = '_cardDecided_apkdr_104',
  j1 = '_cardName_apkdr_108',
  z1 = '_uni_apkdr_116',
  O1 = '_cardNums_apkdr_120',
  D1 = '_cardCmd_apkdr_126',
  k1 = '_empty_apkdr_132',
  w1 = '_command_apkdr_137',
  U1 = '_skillList_apkdr_143',
  B1 = '_skillBtn_apkdr_149',
  L1 = '_skillTop_apkdr_161',
  H1 = '_skillName_apkdr_168',
  q1 = '_skillDesc_apkdr_173',
  G1 = '_target_apkdr_35',
  Y1 = '_cmdHead_apkdr_184',
  X1 = '_menu_apkdr_189',
  V1 = '_menuBtn_apkdr_195',
  Q1 = '_tp_apkdr_212',
  Z1 = '_menuBack_apkdr_218',
  K1 = '_execRow_apkdr_228',
  $1 = '_redo_apkdr_233',
  J1 = '_primary_apkdr_243',
  I1 = '_result_apkdr_258',
  W1 = '_resultTitle_apkdr_269',
  F1 = '_resultBody_apkdr_274',
  tt = {
    layout: y1,
    enemies: g1,
    enemy: v1,
    targeted: _1,
    enemyName: b1,
    down: S1,
    log: x1,
    logLine: E1,
    party: T1,
    rowTag: N1,
    cardRow: A1,
    card: C1,
    cardActive: M1,
    cardDecided: R1,
    cardName: j1,
    uni: z1,
    cardNums: O1,
    cardCmd: D1,
    empty: k1,
    command: w1,
    skillList: U1,
    skillBtn: B1,
    skillTop: L1,
    skillName: H1,
    skillDesc: q1,
    target: G1,
    cmdHead: Y1,
    menu: X1,
    menuBtn: V1,
    tp: Q1,
    menuBack: Z1,
    execRow: K1,
    redo: $1,
    primary: J1,
    result: I1,
    resultTitle: W1,
    resultBody: F1,
  },
  P1 = '_row_1t6j7_1',
  t_ = '_label_1t6j7_8',
  e_ = '_track_1t6j7_16',
  l_ = '_fill_1t6j7_24',
  n_ = '_value_1t6j7_30',
  mu = { row: P1, label: t_, track: e_, fill: l_, value: n_ },
  Uo = ({ value: a, max: c, color: o = '#4caf50', label: s, showValue: r = !0 }) => {
    const d = c > 0 ? Math.max(0, Math.min(100, (a / c) * 100)) : 0;
    return g.jsxs('div', {
      className: mu.row,
      children: [
        s ? g.jsx('span', { className: mu.label, children: s }) : null,
        g.jsx('div', {
          className: mu.track,
          children: g.jsx('div', {
            className: mu.fill,
            style: { width: `${d}%`, backgroundColor: o },
          }),
        }),
        r
          ? g.jsxs('span', {
              className: mu.value,
              children: [Math.max(0, Math.round(a)), '/', Math.round(c)],
            })
          : null,
      ],
    });
  },
  ca = {
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
  se = {
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
function a_(a) {
  return a.category === 'material' ? 8 : Math.floor(a.buyPrice / 2);
}
const rr = {
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
  u_ = 500,
  Qo = 30,
  lc = 3,
  nc = 2,
  i_ = lc + nc,
  yu = { TITLE_DEPTH: 20, REBIRTH_MIN_LEVEL: 30 },
  Np = 5,
  c_ = 5,
  fr = (a) => a > 0 && a % Mt.BOSS_INTERVAL === 0,
  qh = (a) => Math.round(Mt.EXP_CURVE_BASE * Math.pow(a, Mt.EXP_CURVE_POW)),
  Bo = (a) => a < Mt.LEVEL_CAP,
  Ap = (a, c) => 1 + Mt.ENEMY_SCALE_K * (a - c),
  pa = {
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
  Ce = {
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
  s_ = ['hp', 'tp', 'str', 'vit', 'agi', 'int', 'mnd', 'luc'],
  o_ = ['slash', 'pierce', 'bash'],
  Wi = (a, c, o) => Math.max(c, Math.min(o, a));
function r_(a, c) {
  const o = {};
  for (const s of s_) o[s] = Math.round(a[s] * c);
  return o;
}
function f_(a, c) {
  return r_(a.baseStats, Ap(c, a.refDepth));
}
function ua(a, c) {
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
  const s = (a.str * 2 + (c.atk ?? 0)) * ua(o, 'patk'),
    r = (a.vit * 2 + (c.def ?? 0)) * ua(o, 'pdef'),
    d = (a.int * 2 + (c.mat ?? 0)) * ua(o, 'matk'),
    p = (a.mnd * 2 + (c.mdf ?? 0)) * ua(o, 'mdef');
  return {
    patk: s,
    pdef: r,
    matk: d,
    mdef: p,
    hit: a.agi,
    acc: a.agi * ua(o, 'acc'),
    eva: a.agi * ua(o, 'eva'),
    crit: a.luc,
  };
}
const d_ = (a) => a.ailments.some((c) => c.type === 'blind');
function Cp(a, c, o, s) {
  const r = o.statBase === 'str',
    d = Gh(a.stats, a.equip, a.buffs),
    p = Gh(c.stats, c.equip, c.buffs),
    _ = r ? d.patk : d.matk,
    y = r ? p.pdef : p.mdef;
  let m = !0;
  if (r) {
    const K = d_(a) ? Mt.BLIND_ACC_PENALTY : 0,
      V = Wi(Mt.BASE_HIT + (d.acc - p.eva) * Mt.HIT_AGI_K - K, Mt.HIT_MIN, 1);
    m = s.next() < V;
  }
  if (!m) return { damage: 0, hit: !1, critical: !1 };
  const v = (_ * o.power * Mt.DAMAGE_DEF_K) / (Mt.DAMAGE_DEF_K + Math.max(0, y)),
    E = r && o_.includes(o.element),
    k = E && a.row === 'back' ? Mt.BACK_ROW_MELEE_MULT : 1,
    j = E && c.row === 'back' ? Mt.BACK_ROW_MELEE_MULT : 1,
    w = k * j,
    [q, H] = Mt.DMG_VARIANCE,
    Q = q + s.next() * (H - q);
  let z = v * o.elementMultiplier * w * Q;
  const Y = Wi(
      Mt.CRIT_BASE + (a.stats.luc - c.stats.luc) * Mt.CRIT_LUC_K,
      Mt.CRIT_MIN,
      Mt.CRIT_MAX
    ),
    $ = s.next() < Y;
  return (
    $ && (z *= Mt.CRIT_MULT),
    { damage: o.elementMultiplier === 0 ? 0 : Math.max(1, Math.floor(z)), hit: !0, critical: $ }
  );
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
};
function Mp(a, c) {
  var o;
  return ((o = a.guild.storage.find((s) => s.itemId === c)) == null ? void 0 : o.qty) ?? 0;
}
function ac(a, c, o = 1) {
  if (o <= 0) return a;
  const s = [...a.guild.storage],
    r = s.findIndex((d) => d.itemId === c);
  return (
    r >= 0 ? (s[r] = { ...s[r], qty: s[r].qty + o }) : s.push({ itemId: c, qty: o }),
    { ...a, guild: { ...a.guild, storage: s } }
  );
}
function _u(a, c, o = 1) {
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
function Rp(a, c, o) {
  return {
    ...a,
    guild: { ...a.guild, members: a.guild.members.map((s) => (s.id === c ? o(s) : s)) },
  };
}
function dr(a, c) {
  const o = Ce[c];
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
function m_(a, c, o) {
  const s = Ce[o],
    r = a.guild.members.find((_) => _.id === c);
  if (!s || !r || !dr(r, o) || Mp(a, o) <= 0) return a;
  let d = _u(a, o, 1);
  const p = r.equipment[s.slot];
  return (
    p && (d = ac(d, p, 1)),
    Rp(d, c, (_) => ({ ..._, equipment: { ..._.equipment, [s.slot]: o } }))
  );
}
function mr(a, c, o) {
  const s = a.guild.members.find((p) => p.id === c);
  if (!s) return a;
  const r = s.equipment[o];
  if (!r) return a;
  const d = ac(a, r, 1);
  return Rp(d, c, (p) => ({ ...p, equipment: { ...p.equipment, [o]: null } }));
}
const Ve = {
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
  oa = {
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
  h_ = ['hp', 'tp', 'str', 'vit', 'agi', 'int', 'mnd', 'luc'];
function Tu(a) {
  var _, y;
  const c = Ve[a.raceId];
  if (!c) throw new Error(`computeBaseStats: 未定義の種族 "${a.raceId}"`);
  const s = Math.max(1, Math.min(a.level, Mt.LEVEL_CAP)) - 1,
    r = a.titleId ? ((_ = oa[a.titleId]) == null ? void 0 : _.growthModifier) : void 0,
    d = ((y = a.rebirthBonus) == null ? void 0 : y.allStats) ?? 0,
    p = {};
  for (const m of h_) {
    const b = c.statGrowth[m] + ((r == null ? void 0 : r[m]) ?? 0);
    p[m] = c.baseStatsAtLv1[m] + b * s + d;
  }
  return p;
}
const Il = (a, c, o) => Math.max(c, Math.min(o, a));
function p_(a) {
  const c = { atk: 0, mat: 0, def: 0, mdf: 0 };
  for (const o of Object.values(a.equipment)) {
    if (!o) continue;
    const s = Ce[o];
    s &&
      ((c.atk += s.bonuses.atk ?? 0),
      (c.mat += s.bonuses.mat ?? 0),
      (c.def += s.bonuses.def ?? 0),
      (c.mdf += s.bonuses.mdf ?? 0));
  }
  return c;
}
function y_(a, c) {
  var p;
  const o = a.guild.members.find((_) => _.id === c);
  if (!o) return null;
  const s = (p = a.diveState) == null ? void 0 : p.party.find((_) => _.charId === c),
    r = Tu(o),
    d = a.guild.party.front.includes(c);
  return {
    id: c,
    name: o.name,
    side: 'ally',
    row: d ? 'front' : 'back',
    stats: r,
    equip: p_(o),
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
function g_(a, c, o) {
  const s = pa[a],
    r = f_(s, o);
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
function v_(a, c) {
  var p;
  const o = ((p = a.diveState) == null ? void 0 : p.depth) ?? 1,
    r = [...a.guild.party.front, ...a.guild.party.back]
      .filter((_) => _ !== null)
      .map((_) => y_(a, _))
      .filter((_) => _ !== null),
    d = c.map((_, y) => g_(_, y, o));
  return {
    turn: 1,
    depth: o,
    allies: r,
    enemies: d,
    log: [],
    outcome: 'ongoing',
    drops: [],
    consumedItems: [],
  };
}
const He = (a, c) => (c === 'ally' ? a.allies : a.enemies).filter((o) => !o.isDown);
function sa(a, c) {
  return a.allies.find((o) => o.id === c) ?? a.enemies.find((o) => o.id === c);
}
const jp = (a, c) => {
  var o;
  return ((o = a.resist) == null ? void 0 : o[c]) ?? 1;
};
function hr(a, c, o) {
  ((a.hp = Il(a.hp - c, 0, a.maxHp)),
    a.hp === 0 &&
      !a.isDown &&
      ((a.isDown = !0),
      (a.unionGauge = Math.floor(a.unionGauge / 2)),
      o.push({ text: `${a.name} は倒れた！` })));
}
function Fi(a, c) {
  a.isDown || (a.unionGauge = Il(a.unionGauge + c, 0, 100));
}
function Zo(a, c) {
  ((a.buffs = a.buffs.filter((o) => !(o.stat === c.stat && o.stackGroup === c.stackGroup))),
    a.buffs.push(c));
}
function __(a, c) {
  const o = a.ailments.find((s) => s.type === c.type);
  if (o) {
    o.remainingTurns = Math.max(o.remainingTurns, c.remainingTurns);
    return;
  }
  a.ailments.push(c);
}
function b_(a, c, o) {
  return Il(a * (1 + (c.stats.luc - o.stats.luc) * Mt.AILMENT_LUC_K), 0, Mt.AILMENT_MAX);
}
function S_(a, c, o, s) {
  switch (o.target) {
    case 'self':
      return [c];
    case 'allyAll':
      return He(a, c.side);
    case 'allyOne': {
      const r = sa(a, s);
      return r ? [r] : [];
    }
    case 'enemyAll':
      return He(a, c.side === 'ally' ? 'enemy' : 'ally');
    case 'enemyRow':
    case 'enemyOne':
    default: {
      const r = sa(a, s);
      return r ? [r] : [];
    }
  }
}
function x_(a, c, o, s, r, d, p) {
  switch (o.kind) {
    case 'damage': {
      const _ = o.hits ?? 1;
      for (const y of d)
        if (!y.isDown)
          for (let m = 0; m < _; m++) {
            const b = Cp(
              c,
              y,
              { statBase: o.statBase, power: o.power(r), element: s, elementMultiplier: jp(y, s) },
              p
            );
            b.hit
              ? (hr(y, b.damage, a.log),
                Fi(y, 5),
                a.log.push({
                  text: `${c.name} の攻撃！ ${y.name} に ${b.damage} ダメージ${b.critical ? '（会心）' : ''}`,
                }))
              : a.log.push({ text: `${c.name} の攻撃は外れた` });
          }
      break;
    }
    case 'heal': {
      const _ = o.amount(r);
      for (const y of d) y.isDown || (y.hp = Il(y.hp + _, 0, y.maxHp));
      a.log.push({ text: `${c.name} は回復魔法を使った（+${_}）` });
      break;
    }
    case 'buff': {
      for (const _ of d)
        Zo(_, {
          stat: o.stat,
          modifier: o.modifier(r),
          remainingTurns: o.turns,
          stackGroup: o.stackGroup,
        });
      a.log.push({ text: `${c.name} は態勢を整えた` });
      break;
    }
    case 'ailment': {
      for (const _ of d) {
        if (_.isDown) continue;
        const y = b_(o.chance(r), c, _);
        p.next() < y &&
          (__(_, { type: o.ailment, remainingTurns: o.turns, magnitude: o.magnitude }),
          a.log.push({ text: `${_.name} は${o.ailment}になった` }));
      }
      break;
    }
  }
}
function Yh(a, c, o, s) {
  if (o.isDown) return;
  const r = c.enemyId ? (pa[c.enemyId].attackElement ?? 'bash') : 'bash',
    d = Cp(c, o, { statBase: 'str', power: 1, element: r, elementMultiplier: jp(o, r) }, s);
  d.hit
    ? (hr(o, d.damage, a.log),
      Fi(c, 5),
      Fi(o, 5),
      a.log.push({
        text: `${c.name} の攻撃！ ${o.name} に ${d.damage} ダメージ${d.critical ? '（会心）' : ''}`,
      }))
    : a.log.push({ text: `${c.name} の攻撃は外れた` });
}
const Xh = (a) => (a.length === 0 ? 0 : a.reduce((c, o) => c + o.stats.agi, 0) / a.length),
  E_ = (a) => a.ailments.some((c) => c.type === 'paralysis');
function Vh(a, c, o) {
  var _, y, m;
  if (a.outcome !== 'ongoing') return a;
  const s = structuredClone({ ...a, log: [] }),
    r = new Map(c.map((b) => [b.actorId, b]));
  if (c.some((b) => b.kind === 'flee')) {
    const b = Il(0.5 + (Xh(He(s, 'ally')) - Xh(He(s, 'enemy'))) * 0.02, 0.1, 0.95);
    if (o.next() < b) return (s.log.push({ text: 'うまく逃げ切れた！' }), (s.outcome = 'fled'), s);
    s.log.push({ text: '逃げられなかった！' });
  }
  for (const b of c) {
    if (b.kind !== 'guard') continue;
    const v = sa(s, b.actorId);
    !v ||
      v.isDown ||
      (Zo(v, { stat: 'pdef', modifier: 1.5, remainingTurns: 1, stackGroup: 'guard' }),
      Zo(v, { stat: 'mdef', modifier: 1.5, remainingTurns: 1, stackGroup: 'guard' }));
  }
  const d = new Map();
  for (const b of He(s, 'enemy')) {
    const v = He(s, 'ally');
    v.length > 0 && d.set(b.id, o.pick(v).id);
  }
  const p = [...s.allies, ...s.enemies]
    .filter((b) => !b.isDown)
    .map((b) => ({ c: b, agi: b.stats.agi, tie: o.next() }))
    .sort((b, v) => v.agi - b.agi || v.tie - b.tie)
    .map((b) => b.c);
  for (const b of p)
    if (!b.isDown) {
      if (s.outcome !== 'ongoing') break;
      if (E_(b) && o.next() < Mt.PARALYSIS_SKIP) {
        s.log.push({ text: `${b.name} は麻痺で動けない` });
        continue;
      }
      if (b.side === 'enemy') {
        const v = d.get(b.id),
          E = v ? sa(s, v) : void 0,
          k = E && !E.isDown ? E : He(s, 'ally')[0];
        k && Yh(s, b, k, o);
      } else {
        const v = r.get(b.id);
        if (!v || v.kind === 'guard' || v.kind === 'flee') continue;
        if (v.kind === 'attack') {
          const E = sa(s, v.targetId),
            k = E && !E.isDown ? E : He(s, 'enemy')[0];
          k && Yh(s, b, k, o);
        } else if (v.kind === 'skill') {
          const E = ca[v.skillId];
          if (!E) continue;
          const k = 1,
            j = E.tpCost(k);
          if (b.tp < j) {
            s.log.push({ text: `${b.name} は TP が足りない` });
            continue;
          }
          ((b.tp -= j), Fi(b, 10));
          const w = S_(s, b, E, v.targetId);
          for (const q of E.effects) x_(s, b, q, E.element, k, w, o);
        } else if (v.kind === 'item') {
          const E = se[v.itemId];
          if (!E || !((_ = E.useContext) != null && _.includes('battle'))) continue;
          const k = sa(s, v.targetId) ?? b;
          for (const j of E.effects ?? [])
            j.kind === 'heal'
              ? (k.hp = Il(k.hp + j.amount(1), 0, k.maxHp))
              : j.kind === 'restoreTp' && (k.tp = Il(k.tp + j.amount(1), 0, k.maxTp));
          (s.consumedItems.push(v.itemId), s.log.push({ text: `${b.name} は ${E.name} を使った` }));
        }
      }
      if (He(s, 'enemy').length === 0 || He(s, 'ally').length === 0) break;
    }
  for (const b of [...s.allies, ...s.enemies]) {
    if (b.isDown) continue;
    const v = b.ailments.find((E) => E.type === 'poison');
    if (v) {
      const E = v.magnitude ?? Math.max(1, Math.floor(b.maxHp * Mt.POISON_HP_RATIO));
      (hr(b, E, s.log), s.log.push({ text: `${b.name} は毒で ${E} のダメージ` }));
    }
  }
  for (const b of [...s.allies, ...s.enemies])
    (!b.isDown &&
      b.maxTp > 0 &&
      (b.tp = Math.min(b.maxTp, b.tp + Math.ceil(b.maxTp * Mt.TP_REGEN_RATIO))),
      (b.buffs = b.buffs
        .map((v) => ({ ...v, remainingTurns: v.remainingTurns - 1 }))
        .filter((v) => v.remainingTurns > 0)),
      (b.ailments = b.ailments
        .map((v) => ({ ...v, remainingTurns: v.remainingTurns - 1 }))
        .filter((v) => v.remainingTurns > 0)));
  for (const b of s.enemies)
    if (
      !(
        !b.isDown ||
        !b.enemyId ||
        (((y = a.enemies.find((E) => E.id === b.id)) == null ? void 0 : y.isDown) ?? !1)
      )
    )
      for (const E of pa[b.enemyId].drops ?? [])
        o.next() < E.rate &&
          (s.drops.push({ enemyId: b.enemyId, itemId: E.itemId }),
          s.log.push({
            text: `${b.name} は ${((m = se[E.itemId]) == null ? void 0 : m.name) ?? E.itemId} を落とした`,
          }));
  return (
    (s.turn += 1),
    He(s, 'enemy').length === 0
      ? (s.outcome = 'win')
      : He(s, 'ally').length === 0 && (s.outcome = 'lose'),
    s
  );
}
function zp(a) {
  let c = 0,
    o = 0;
  for (const s of a.enemies) {
    if (!s.enemyId) continue;
    const r = pa[s.enemyId],
      d = Ap(a.depth, r.refDepth);
    ((c += Math.round(r.exp * d)), (o += Math.round(r.gold * d)));
  }
  return { exp: c, gold: o };
}
function T_(a, c) {
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
    r = new Map(c.allies.map((v) => [v.id, v])),
    d = a.diveState.party.map((v) => {
      const E = r.get(v.charId);
      if (!E) return v;
      let k = E.unionGauge;
      return (
        s && !E.isDown && (k = Il(k + Mt.UNION_GAIN_ON_WIN, 0, 100)),
        { ...v, hp: E.hp, tp: E.tp, unionGauge: k, ailments: E.ailments }
      );
    });
  let p = a.guild.members,
    _ = a.guild.gold;
  const y = { ...a.bestiary.monsters };
  for (const v of c.enemies) {
    if (!v.enemyId) continue;
    const E = y[v.enemyId] ?? { seen: !1, defeated: !1, dropsFound: [] };
    y[v.enemyId] = { ...E, seen: !0, defeated: E.defeated || v.isDown };
  }
  if (o)
    for (const v of c.drops) {
      const E = y[v.enemyId];
      E &&
        !E.dropsFound.includes(v.itemId) &&
        (y[v.enemyId] = { ...E, dropsFound: [...E.dropsFound, v.itemId] });
    }
  const m = { ...a.bestiary, monsters: y };
  if (o) {
    const { exp: v, gold: E } = zp(c);
    _ += E;
    const k = new Set(d.map((w) => w.charId)),
      j = k.size > 0 ? Math.floor(v / k.size) : 0;
    p = p.map((w) => (k.has(w.id) ? T_(w, j) : w));
  }
  let b = {
    ...a,
    guild: { ...a.guild, members: p, gold: _, bestiary: m },
    bestiary: m,
    diveState: { ...a.diveState, party: d },
  };
  for (const v of c.consumedItems) b = _u(b, v, 1);
  if (o) for (const v of c.drops) b = ac(b, v.itemId, 1);
  return b;
}
const N_ = 8,
  Ko = 16,
  gu = 5;
function pr(a) {
  return a.range(N_, Ko);
}
function A_(a, c) {
  const o = a - 1;
  return o <= 0
    ? { stepsUntilEncounter: pr(c), triggered: !0 }
    : { stepsUntilEncounter: o, triggered: !1 };
}
function C_(a) {
  const c = Math.max(0, Ko - a),
    o = Math.round((c / Ko) * gu);
  return Math.min(gu, Math.max(0, o));
}
const vl = { N: { dx: 0, dy: -1 }, E: { dx: 1, dy: 0 }, S: { dx: 0, dy: 1 }, W: { dx: -1, dy: 0 } },
  M_ = { N: 'S', E: 'W', S: 'N', W: 'E' };
function R_(a) {
  return Math.min(25, 15 + Math.floor(a / 5));
}
function j_() {
  return { walls: { N: !0, E: !0, S: !0, W: !0 }, floorType: 'normal', passable: !0 };
}
const $o = (a, c, o, s) => a >= 0 && c >= 0 && a < o && c < s;
function Zh(a, c, o, s) {
  const { dx: r, dy: d } = vl[s];
  ((a[o][c].walls[s] = !1), (a[o + d][c + r].walls[M_[s]] = !1));
}
function z_(a, c, o) {
  const s = a.length,
    r = a[0].length,
    d = Array.from({ length: s }, () => Array(r).fill(-1)),
    p = [{ x: c, y: o }];
  d[o][c] = 0;
  for (let _ = 0; _ < p.length; _++) {
    const { x: y, y: m } = p[_];
    for (const b of ['N', 'E', 'S', 'W']) {
      if (a[m][y].walls[b]) continue;
      const v = y + vl[b].dx,
        E = m + vl[b].dy;
      !$o(v, E, r, s) || d[E][v] !== -1 || ((d[E][v] = d[m][y] + 1), p.push({ x: v, y: E }));
    }
  }
  return d;
}
function O_(a, c) {
  const o = R_(a),
    s = o,
    r = o,
    d = Array.from({ length: r }, () => Array.from({ length: s }, () => j_())),
    p = Array.from({ length: r }, () => Array(s).fill(!1)),
    _ = c.int(s),
    y = c.int(r),
    m = [{ x: _, y }];
  for (p[y][_] = !0; m.length > 0; ) {
    const H = m[m.length - 1],
      Q = [];
    for (const W of ['N', 'E', 'S', 'W']) {
      const K = H.x + vl[W].dx,
        V = H.y + vl[W].dy;
      $o(K, V, s, r) && !p[V][K] && Q.push(W);
    }
    if (Q.length === 0) {
      m.pop();
      continue;
    }
    const z = c.pick(Q);
    Zh(d, H.x, H.y, z);
    const Y = H.x + vl[z].dx,
      $ = H.y + vl[z].dy;
    ((p[$][Y] = !0), m.push({ x: Y, y: $ }));
  }
  const b = Math.floor((s * r) / 25);
  for (let H = 0; H < b; H++) {
    const Q = c.int(s),
      z = c.int(r),
      Y = c.pick(['N', 'E', 'S', 'W']),
      $ = Q + vl[Y].dx,
      W = z + vl[Y].dy;
    $o($, W, s, r) && d[z][Q].walls[Y] && Zh(d, Q, z, Y);
  }
  const v = c.int(s),
    E = c.int(r),
    k = z_(d, v, E);
  let j = v,
    w = E,
    q = -1;
  for (let H = 0; H < r; H++)
    for (let Q = 0; Q < s; Q++) k[H][Q] > q && ((q = k[H][Q]), (j = Q), (w = H));
  return (
    (d[E][v].event = { kind: 'stairsDown' }),
    (d[w][j].event = { kind: 'stairsUp' }),
    {
      depth: a,
      width: s,
      height: r,
      cells: d,
      encounterTable: `band_${Math.floor((a - 1) / 10)}`,
      foeSpawns: [],
      bgmId: fr(a) ? 'bgm_boss' : 'bgm_dungeon',
    }
  );
}
function Op(a, c) {
  var o;
  for (let s = 0; s < a.height; s++)
    for (let r = 0; r < a.width; r++)
      if (((o = a.cells[s][r].event) == null ? void 0 : o.kind) === c) return { x: r, y: s };
  return null;
}
const ra = { N: { dx: 0, dy: -1 }, E: { dx: 1, dy: 0 }, S: { dx: 0, dy: 1 }, W: { dx: -1, dy: 0 } },
  fa = ['N', 'E', 'S', 'W'];
function Dp(a) {
  return fa[(fa.indexOf(a) + 1) % 4];
}
function kp(a) {
  return fa[(fa.indexOf(a) + 3) % 4];
}
function D_(a) {
  return fa[(fa.indexOf(a) + 2) % 4];
}
const k_ = (a, c, o) => a >= 0 && c >= 0 && a < o.width && c < o.height;
function wp(a, c, o, s) {
  if (a.cells[o][c].walls[s]) return !1;
  const r = c + ra[s].dx,
    d = o + ra[s].dy;
  return k_(r, d, a) ? a.cells[d][r].passable : !1;
}
function w_(a, c, o) {
  return wp(a, c.x, c.y, o) ? { x: c.x + ra[o].dx, y: c.y + ra[o].dy } : null;
}
function yr(a, c, o) {
  return ['N', 'E', 'S', 'W'].filter((s) => !a.cells[o][c].walls[s]);
}
const U_ = 4294967296;
function B_(a, c) {
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
class gr {
  constructor(c, o) {
    Ao(this, 'baseSeed');
    Ao(this, '_state');
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
      ((c ^ (c >>> 14)) >>> 0) / U_
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
    const o = B_(this.baseSeed, c);
    return new gr(o, o);
  }
}
function ya(a) {
  return new gr(a, a);
}
function L_() {
  return Math.floor(Math.random() * 4294967296) >>> 0;
}
const Kh = (a, c) => `${a},${c}`;
function H_(a, c) {
  return ya(a).fork(`floor:${c}`);
}
function Up(a, c) {
  const o = a.towerState.floors[c];
  if (o) return { save: a, floor: o };
  const s = O_(c, H_(a.masterSeed, c)),
    r = {
      depth: c,
      seed: a.masterSeed,
      generated: s,
      isBossFloor: fr(c),
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
function q_(a) {
  const c = [...a.guild.party.front, ...a.guild.party.back].filter((s) => s !== null),
    o = [];
  for (const s of c) {
    const r = a.guild.members.find((p) => p.id === s);
    if (!r) continue;
    const d = Tu(r);
    o.push({ charId: s, hp: d.hp, tp: d.tp, unionGauge: 0, ailments: [] });
  }
  return o;
}
function vr(a, c, o, s) {
  const r = a.towerState.floors[c].generated,
    d = new Set(a.exploredCells[c] ?? []);
  d.add(Kh(o, s));
  for (const p of yr(r, o, s)) {
    const _ = o + (p === 'E' ? 1 : p === 'W' ? -1 : 0),
      y = s + (p === 'S' ? 1 : p === 'N' ? -1 : 0);
    d.add(Kh(_, y));
  }
  return { ...a, exploredCells: { ...a.exploredCells, [c]: [...d] } };
}
function Bp(a, c, o) {
  var y, m;
  const s = Up(a, c);
  let r = s.save;
  const d = s.floor.generated,
    p = Op(d, 'stairsDown') ?? { x: 0, y: 0 },
    _ = yr(d, p.x, p.y)[0] ?? 'N';
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
        dir: _,
        party: ((y = r.diveState) == null ? void 0 : y.party) ?? q_(r),
        persistentSummons: ((m = r.diveState) == null ? void 0 : m.persistentSummons) ?? [],
        encounter: { stepsUntilEncounter: pr(o) },
      },
    }),
    vr(r, c, p.x, p.y)
  );
}
function G_(a, c = 1) {
  const o = ya(a.masterSeed).fork(`dive:${a.towerState.record.totalDives}`),
    s = {
      ...a,
      diveState: null,
      towerState: {
        ...a.towerState,
        record: { ...a.towerState.record, totalDives: a.towerState.record.totalDives + 1 },
      },
    };
  return Bp(s, c, o);
}
function Lp(a, c) {
  return a.diveState ? { ...a, diveState: { ...a.diveState, dir: c } } : a;
}
function Y_(a, c, o) {
  const s = a.diveState;
  if (!s) return { save: a, moved: !1, triggered: !1 };
  const r = a.towerState.floors[s.depth].generated,
    d = w_(r, s.pos, c);
  if (!d) return { save: Lp(a, c), moved: !1, triggered: !1 };
  const p = A_(s.encounter.stepsUntilEncounter, o);
  let _ = {
    ...a,
    diveState: { ...s, pos: d, dir: c, encounter: { stepsUntilEncounter: p.stepsUntilEncounter } },
  };
  return ((_ = vr(_, s.depth, d.x, d.y)), { save: _, moved: !0, triggered: p.triggered });
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
function X_(a) {
  if (!a.diveState) return a;
  const c = a.diveState.depth + 1,
    o = ya(a.masterSeed).fork(`enc:${c}:${a.towerState.record.totalDives}`);
  return Bp(a, c, o);
}
function V_(a) {
  if (!a.diveState) return a;
  const c = a.diveState.depth;
  if (c <= 1) return bu(a);
  const o = c - 1,
    s = Up(a, o),
    r = Op(s.floor.generated, 'stairsUp') ?? { x: 0, y: 0 },
    d = ya(a.masterSeed).fork(`enc:${o}:${a.towerState.record.totalDives}`);
  let p = s.save;
  const _ = s.floor.generated,
    y = yr(_, r.x, r.y)[0] ?? 'N';
  return (
    (p = {
      ...p,
      diveState: {
        ...p.diveState,
        depth: o,
        pos: { x: r.x, y: r.y },
        dir: y,
        encounter: { stepsUntilEncounter: pr(d) },
      },
    }),
    vr(p, o, r.x, r.y)
  );
}
function bu(a) {
  return { ...a, diveState: null };
}
const Q_ = { 10: 'enemy_boss_gatekeeper' };
function Z_(a) {
  const c = Math.floor((a - 1) / 10);
  return Object.values(pa)
    .filter((o) => o.tierBand === c && !o.id.startsWith('enemy_boss'))
    .map((o) => o.id);
}
function K_(a, c) {
  if (fr(a)) {
    const r = Q_[a];
    if (r) return [r];
  }
  const o = Z_(a);
  if (o.length === 0) return [];
  const s = c.range(1, 3);
  return Array.from({ length: s }, () => c.pick(o));
}
const $i = 1,
  $_ = { autoMap: 'on', bgmVolume: 0.6, seVolume: 0.6 };
function Jh() {
  return { monsters: {}, items: {} };
}
function J_() {
  return { deepestReached: 0, highestBossDefeated: 0, totalDives: 0, bossDefeatLog: [] };
}
const I_ = () => ({ weapon: null, armor: null, accessory: null });
function W_() {
  return `char_${Date.now().toString(36)}_${Math.floor(Math.random() * 16777215).toString(36)}`;
}
function Hp(a) {
  var _;
  const { raceId: c, classId: o, name: s, id: r } = a;
  if (!Ve[c]) throw new Error(`createCharacter: 未定義の種族 "${c}"`);
  if (!ue[o]) throw new Error(`createCharacter: 未定義の職業 "${o}"`);
  const d = (_ = ue[o].skillTree.skills[0]) == null ? void 0 : _.skillId,
    p = d ? { [d]: 1 } : {};
  return {
    id: r ?? W_(),
    name: s,
    raceId: c,
    classId: o,
    titleId: null,
    level: 1,
    exp: 0,
    skillPoints: { total: 0, spent: 0 },
    learnedSkills: p,
    equipment: I_(),
  };
}
function F_() {
  return { front: Array(lc).fill(null), back: Array(nc).fill(null) };
}
function P_(a, c) {
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
function tb(a, c) {
  return a.guild.members.length >= Qo
    ? a
    : {
        ...a,
        guild: { ...a.guild, members: [...a.guild.members, c], party: P_(a.guild.party, c.id) },
      };
}
function eb(a) {
  return {
    schemaVersion: $i,
    savedAt: 0,
    masterSeed: L_(),
    settings: { ...$_ },
    guild: { name: a, gold: u_, members: [], party: F_(), storage: [], bestiary: Jh() },
    towerState: { floors: {}, bossGates: {}, warp: { unlockedCheckpoints: [] }, record: J_() },
    diveState: null,
    bestiary: Jh(),
    playerMaps: {},
    exploredCells: {},
    forgeInventory: { fragments: {}, ingots: { copper: 0, silver: 0, gold: 0 } },
    shopStock: { unlockedTier: 0, unlockedItemIds: [] },
    flags: {},
  };
}
const Jo = (a, c) => c.some((o) => a instanceof o);
let Ih, Wh;
function lb() {
  return Ih || (Ih = [IDBDatabase, IDBObjectStore, IDBIndex, IDBCursor, IDBTransaction]);
}
function nb() {
  return (
    Wh ||
    (Wh = [
      IDBCursor.prototype.advance,
      IDBCursor.prototype.continue,
      IDBCursor.prototype.continuePrimaryKey,
    ])
  );
}
const Io = new WeakMap(),
  Lo = new WeakMap(),
  uc = new WeakMap();
function ab(a) {
  const c = new Promise((o, s) => {
    const r = () => {
        (a.removeEventListener('success', d), a.removeEventListener('error', p));
      },
      d = () => {
        (o(_n(a.result)), r());
      },
      p = () => {
        (s(a.error), r());
      };
    (a.addEventListener('success', d), a.addEventListener('error', p));
  });
  return (uc.set(c, a), c);
}
function ub(a) {
  if (Io.has(a)) return;
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
  Io.set(a, c);
}
let Wo = {
  get(a, c, o) {
    if (a instanceof IDBTransaction) {
      if (c === 'done') return Io.get(a);
      if (c === 'store')
        return o.objectStoreNames[1] ? void 0 : o.objectStore(o.objectStoreNames[0]);
    }
    return _n(a[c]);
  },
  set(a, c, o) {
    return ((a[c] = o), !0);
  },
  has(a, c) {
    return a instanceof IDBTransaction && (c === 'done' || c === 'store') ? !0 : c in a;
  },
};
function qp(a) {
  Wo = a(Wo);
}
function ib(a) {
  return nb().includes(a)
    ? function (...c) {
        return (a.apply(Fo(this), c), _n(this.request));
      }
    : function (...c) {
        return _n(a.apply(Fo(this), c));
      };
}
function cb(a) {
  return typeof a == 'function'
    ? ib(a)
    : (a instanceof IDBTransaction && ub(a), Jo(a, lb()) ? new Proxy(a, Wo) : a);
}
function _n(a) {
  if (a instanceof IDBRequest) return ab(a);
  if (Lo.has(a)) return Lo.get(a);
  const c = cb(a);
  return (c !== a && (Lo.set(a, c), uc.set(c, a)), c);
}
const Fo = (a) => uc.get(a);
function sb(a, c, { blocked: o, upgrade: s, blocking: r, terminated: d } = {}) {
  const p = indexedDB.open(a, c),
    _ = _n(p);
  return (
    s &&
      p.addEventListener('upgradeneeded', (y) => {
        s(_n(p.result), y.oldVersion, y.newVersion, _n(p.transaction), y);
      }),
    o && p.addEventListener('blocked', (y) => o(y.oldVersion, y.newVersion, y)),
    _.then((y) => {
      (d && y.addEventListener('close', () => d()),
        r && y.addEventListener('versionchange', (m) => r(m.oldVersion, m.newVersion, m)));
    }).catch(() => {}),
    _
  );
}
const ob = ['get', 'getKey', 'getAll', 'getAllKeys', 'count'],
  rb = ['put', 'add', 'delete', 'clear'],
  Ho = new Map();
function Fh(a, c) {
  if (!(a instanceof IDBDatabase && !(c in a) && typeof c == 'string')) return;
  if (Ho.get(c)) return Ho.get(c);
  const o = c.replace(/FromIndex$/, ''),
    s = c !== o,
    r = rb.includes(o);
  if (!(o in (s ? IDBIndex : IDBObjectStore).prototype) || !(r || ob.includes(o))) return;
  const d = async function (p, ..._) {
    const y = this.transaction(p, r ? 'readwrite' : 'readonly');
    let m = y.store;
    return (s && (m = m.index(_.shift())), (await Promise.all([m[o](..._), r && y.done]))[0]);
  };
  return (Ho.set(c, d), d);
}
qp((a) => ({
  ...a,
  get: (c, o, s) => Fh(c, o) || a.get(c, o, s),
  has: (c, o) => !!Fh(c, o) || a.has(c, o),
}));
const fb = ['continue', 'continuePrimaryKey', 'advance'],
  Ph = {},
  Po = new WeakMap(),
  Gp = new WeakMap(),
  db = {
    get(a, c) {
      if (!fb.includes(c)) return a[c];
      let o = Ph[c];
      return (
        o ||
          (o = Ph[c] =
            function (...s) {
              Po.set(this, Gp.get(this)[c](...s));
            }),
        o
      );
    },
  };
async function* mb(...a) {
  let c = this;
  if ((c instanceof IDBCursor || (c = await c.openCursor(...a)), !c)) return;
  c = c;
  const o = new Proxy(c, db);
  for (Gp.set(o, c), uc.set(o, Fo(c)); c; )
    (yield o, (c = await (Po.get(o) || c.continue())), Po.delete(o));
}
function tp(a, c) {
  return (
    (c === Symbol.asyncIterator && Jo(a, [IDBIndex, IDBObjectStore, IDBCursor])) ||
    (c === 'iterate' && Jo(a, [IDBIndex, IDBObjectStore]))
  );
}
qp((a) => ({
  ...a,
  get(c, o, s) {
    return tp(c, o) ? mb : a.get(c, o, s);
  },
  has(c, o) {
    return tp(c, o) || a.has(c, o);
  },
}));
const hb = {};
function pb(a) {
  return structuredClone(a);
}
function pu(a) {
  return typeof a == 'object' && a !== null && !Array.isArray(a);
}
function yb(a) {
  if (
    !pu(a) ||
    typeof a.schemaVersion != 'number' ||
    typeof a.masterSeed != 'number' ||
    !pu(a.guild)
  )
    return !1;
  const c = a.guild;
  return !(
    typeof c.name != 'string' ||
    !Array.isArray(c.members) ||
    !pu(a.towerState) ||
    !pu(a.towerState.record) ||
    typeof a.towerState.record.deepestReached != 'number'
  );
}
function Yp(a) {
  if (!pu(a) || typeof a.schemaVersion != 'number')
    return { ok: !1, reason: 'セーブデータの構造が不正です' };
  let c = a.schemaVersion;
  if (c > $i) return { ok: !1, reason: `未知のバージョン (${c} > ${$i}) のセーブデータです` };
  let o = { ...a };
  for (; c < $i; ) {
    const s = hb[c];
    if (!s) return { ok: !1, reason: `バージョン ${c} の migration が未定義です` };
    ((o = s(o)), (c = typeof o.schemaVersion == 'number' ? o.schemaVersion : c + 1));
  }
  return yb(o)
    ? { ok: !0, data: o }
    : { ok: !1, reason: 'migration 後のデータが SaveData の形をしていません' };
}
function gb(a) {
  return {
    guildName: a.guild.name,
    deepestReached: a.towerState.record.deepestReached,
    memberCount: a.guild.members.length,
    savedAt: a.savedAt,
  };
}
function ep() {
  return {
    guildName: '(破損データ)',
    deepestReached: 0,
    memberCount: 0,
    savedAt: 0,
    corrupted: !0,
  };
}
const vb = 'sekaiju-like-game',
  _b = 1,
  Su = 'saves',
  _r = 'main';
let qo = null;
function br() {
  return (
    qo ||
      (qo = sb(vb, _b, {
        upgrade(a) {
          a.objectStoreNames.contains(Su) || a.createObjectStore(Su);
        },
      })),
    qo
  );
}
async function Go(a) {
  const c = { ...a, savedAt: Date.now() };
  return (await (await br()).put(Su, pb(c), _r), c);
}
async function bb() {
  const c = await (await br()).get(Su, _r);
  return c === void 0 ? { ok: !1, reason: 'empty' } : Yp(c);
}
async function Sb() {
  const c = await (await br()).get(Su, _r);
  if (c === void 0) return null;
  const o = Yp(c);
  if (!o.ok) return ep();
  try {
    return gb(o.data);
  } catch {
    return ep();
  }
}
const Xp = { save: null, saving: !1 };
function xb(a, c) {
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
      return { ...Xp };
  }
}
const Vp = N.createContext(null);
function Eb(a) {
  const c = N.useRef(a);
  return ((c.current = a), c);
}
function Tb({ children: a }) {
  const [c, o] = N.useReducer(xb, Xp),
    s = Eb(c),
    r = N.useCallback(async (v) => {
      const E = eb(v),
        k = await Go(E);
      o({ type: 'load', save: k });
    }, []),
    d = N.useCallback(async () => {
      const v = await bb();
      return v.ok ? (o({ type: 'load', save: v.data }), { ok: !0 }) : { ok: !1, reason: v.reason };
    }, []),
    p = N.useCallback((v) => {
      o({ type: 'updateSave', updater: v });
    }, []),
    _ = N.useCallback(
      async (v) => {
        const E = s.current.save;
        if (!E) return;
        const k = v(E);
        (o({ type: 'setSave', save: k }), o({ type: 'saving', saving: !0 }));
        try {
          const j = await Go(k);
          o({ type: 'setSave', save: j });
        } finally {
          o({ type: 'saving', saving: !1 });
        }
      },
      [s]
    ),
    y = N.useCallback(async () => {
      const { save: v } = s.current;
      if (v) {
        o({ type: 'saving', saving: !0 });
        try {
          const E = await Go(v);
          o({ type: 'setSave', save: E });
        } finally {
          o({ type: 'saving', saving: !1 });
        }
      }
    }, [s]),
    m = N.useCallback(() => {
      o({ type: 'clear' });
    }, []),
    b = N.useMemo(
      () => ({
        ...c,
        startNewGame: r,
        continueGame: d,
        applySave: p,
        applyAndPersist: _,
        persist: y,
        exitToTitle: m,
      }),
      [c, r, d, p, _, y, m]
    );
  return g.jsx(Vp.Provider, { value: b, children: a });
}
function bn() {
  const a = N.useContext(Vp);
  if (!a) throw new Error('useGameState は GameStateProvider の内側で使ってください');
  return a;
}
const Nb = () => {
    var St;
    const a = Sl(),
      { save: c, applyAndPersist: o } = bn(),
      s = N.useRef(null),
      [r, d] = N.useState(null),
      [p, _] = N.useState({}),
      [y, m] = N.useState(null),
      [b, v] = N.useState(!1),
      [E, k] = N.useState(!1),
      [j, w] = N.useState(null),
      [q, H] = N.useState(!1);
    N.useEffect(() => {
      if (r || !(c != null && c.diveState)) return;
      const X = c.diveState.depth,
        S = (c.masterSeed ^ (X * 2654435761) ^ (c.towerState.record.totalDives * 40503)) >>> 0;
      ((s.current = ya(S)), d(v_(c, K_(X, s.current))));
    }, [c, r]);
    const Q = N.useMemo(() => (r == null ? void 0 : r.enemies.filter((X) => !X.isDown)) ?? [], [r]),
      z = N.useMemo(() => (r == null ? void 0 : r.allies.filter((X) => !X.isDown)) ?? [], [r]);
    (N.useEffect(() => {
      Q.length > 0 && !Q.some((X) => X.id === j) && w(Q[0].id);
    }, [Q, j]),
      N.useEffect(() => {
        if ((r == null ? void 0 : r.outcome) !== 'ongoing' || (y && z.some((S) => S.id === y)))
          return;
        const X = z.find((S) => !p[S.id]) ?? null;
        m(X ? X.id : null);
      }, [r, z, y, p]));
    const Y = z.length > 0 && z.every((X) => p[X.id] !== void 0),
      $ = N.useCallback(
        (X, S) => {
          const D = { ...p, [X]: S };
          (_(D), v(!1), k(!1));
          const Z = z.find((I) => I.id !== X && !D[I.id]);
          m(Z ? Z.id : null);
        },
        [p, z]
      ),
      W = N.useCallback(
        async (X) => {
          (H(!0),
            X.outcome === 'lose'
              ? (await o((S) => bu(Qh(S, X))), a('/town'))
              : (await o((S) => Qh(S, X)), a('/dungeon')));
        },
        [o, a]
      ),
      K = N.useCallback(() => {
        var X;
        (_({}), v(!1), k(!1), m(((X = z[0]) == null ? void 0 : X.id) ?? null));
      }, [z]),
      V = N.useCallback(() => {
        var Z;
        if (!r || !s.current || r.outcome !== 'ongoing') return;
        const X = j ?? ((Z = Q[0]) == null ? void 0 : Z.id) ?? '',
          S = z.map((I) => {
            const it = p[I.id] ?? { kind: 'attack' };
            return it.kind === 'guard'
              ? { kind: 'guard', actorId: I.id }
              : it.kind === 'skill'
                ? { kind: 'skill', actorId: I.id, skillId: it.skillId, targetId: X }
                : it.kind === 'item'
                  ? { kind: 'item', actorId: I.id, itemId: it.itemId, targetId: I.id }
                  : { kind: 'attack', actorId: I.id, targetId: X };
          }),
          D = Vh(r, S, s.current);
        (d(D), _({}), v(!1), k(!1), m(null));
      }, [r, p, j, z, Q]),
      et = N.useCallback(() => {
        if (!r || !s.current || r.outcome !== 'ongoing') return;
        const X = z[0];
        X && (d(Vh(r, [{ kind: 'flee', actorId: X.id }], s.current)), _({}), m(null));
      }, [r, z]);
    if (!c || !c.diveState) return g.jsx(bl, { to: '/town', replace: !0 });
    if (!r) return g.jsx('div', { className: tt.layout, children: '戦闘準備中...' });
    const st = (X) => {
        const S = c.guild.members.find((D) => D.id === X.id);
        return S
          ? Object.keys(S.learnedSkills).filter((D) => D in ca && X.tp >= ca[D].tpCost(1))
          : [];
      },
      yt = () => {
        const X = (D) => Object.values(p).filter((Z) => Z.kind === 'item' && Z.itemId === D).length,
          S = (D) => r.consumedItems.filter((Z) => Z === D).length;
        return c.guild.storage
          .filter((D) => {
            var Z, I;
            return (I = (Z = se[D.itemId]) == null ? void 0 : Z.useContext) == null
              ? void 0
              : I.includes('battle');
          })
          .map((D) => ({ id: D.itemId, remaining: Mp(c, D.itemId) - S(D.itemId) - X(D.itemId) }))
          .filter((D) => D.remaining > 0);
      },
      Nt = (X) => {
        var D, Z;
        const S = p[X.id];
        return S
          ? S.kind === 'attack'
            ? '攻撃'
            : S.kind === 'guard'
              ? '防御'
              : S.kind === 'item'
                ? (((D = se[S.itemId]) == null ? void 0 : D.name) ?? 'どうぐ')
                : (((Z = ca[S.skillId]) == null ? void 0 : Z.name) ?? 'スキル')
          : '';
      },
      Dt = y ? z.find((X) => X.id === y) : void 0,
      oe = ((St = r.enemies.find((X) => X.id === j)) == null ? void 0 : St.name) ?? '-',
      Lt = zp(r),
      B = (X) =>
        g.jsxs(
          'button',
          {
            type: 'button',
            className: [
              tt.card,
              X.isDown ? tt.down : '',
              y === X.id ? tt.cardActive : '',
              p[X.id] ? tt.cardDecided : '',
            ].join(' '),
            disabled: X.isDown || r.outcome !== 'ongoing',
            onClick: () => {
              (m(X.id), v(!1), k(!1));
            },
            children: [
              g.jsxs('div', {
                className: tt.cardName,
                children: [
                  X.name,
                  X.unionGauge >= 100 ? g.jsx('span', { className: tt.uni, children: '★' }) : null,
                ],
              }),
              g.jsx(Uo, { value: X.hp, max: X.maxHp, color: '#4caf50', showValue: !1 }),
              g.jsx(Uo, { value: X.tp, max: X.maxTp, color: '#2196f3', showValue: !1 }),
              g.jsxs('div', {
                className: tt.cardNums,
                children: ['HP ', Math.max(0, X.hp), ' · TP ', X.tp],
              }),
              p[X.id] ? g.jsxs('div', { className: tt.cardCmd, children: ['▶ ', Nt(X)] }) : null,
            ],
          },
          X.id
        ),
      J = r.allies.filter((X) => X.row === 'front'),
      nt = r.allies.filter((X) => X.row === 'back');
    return g.jsxs('div', {
      className: tt.layout,
      children: [
        g.jsx('div', {
          className: tt.enemies,
          children: r.enemies.map((X) =>
            g.jsxs(
              'button',
              {
                type: 'button',
                className: `${tt.enemy} ${X.isDown ? tt.down : ''} ${j === X.id ? tt.targeted : ''}`,
                disabled: X.isDown,
                onClick: () => w(X.id),
                children: [
                  g.jsxs('span', {
                    className: tt.enemyName,
                    children: [X.name, X.ailments.length > 0 ? ' 🌀' : ''],
                  }),
                  g.jsx(Uo, { value: X.hp, max: X.maxHp, color: '#e57373', showValue: !1 }),
                ],
              },
              X.id
            )
          ),
        }),
        g.jsxs('div', {
          className: tt.party,
          children: [
            g.jsx('div', { className: tt.rowTag, children: '前衛' }),
            g.jsx('div', { className: tt.cardRow, children: J.map(B) }),
            g.jsx('div', { className: tt.rowTag, children: '後衛（近接ダメージ -30%）' }),
            g.jsx('div', {
              className: tt.cardRow,
              children:
                nt.length > 0
                  ? nt.map(B)
                  : g.jsx('div', { className: tt.empty, children: '（なし）' }),
            }),
          ],
        }),
        r.outcome !== 'ongoing'
          ? g.jsxs('div', {
              className: tt.result,
              children: [
                g.jsx('div', {
                  className: tt.resultTitle,
                  children:
                    r.outcome === 'win' ? '勝利！' : r.outcome === 'fled' ? '逃走した' : '全滅...',
                }),
                r.outcome === 'win'
                  ? g.jsxs('div', {
                      className: tt.resultBody,
                      children: ['経験値 ', Lt.exp, ' ／ ', Lt.gold, ' G を獲得'],
                    })
                  : r.outcome === 'lose'
                    ? g.jsx('div', { className: tt.resultBody, children: '拠点へ帰還する' })
                    : null,
                g.jsx('button', {
                  type: 'button',
                  className: tt.primary,
                  disabled: q,
                  onClick: () => void W(r),
                  children: 'つづける',
                }),
              ],
            })
          : g.jsxs('div', {
              className: tt.command,
              children: [
                g.jsxs('div', {
                  className: tt.target,
                  children: ['対象: ', oe, '（敵をタップで変更）'],
                }),
                Dt
                  ? g.jsxs(g.Fragment, {
                      children: [
                        g.jsxs('div', {
                          className: tt.cmdHead,
                          children: [Dt.name, ' のコマンド'],
                        }),
                        b
                          ? g.jsxs('div', {
                              className: tt.skillList,
                              children: [
                                st(Dt).map((X) => {
                                  var S;
                                  return g.jsxs(
                                    'button',
                                    {
                                      type: 'button',
                                      className: tt.skillBtn,
                                      onClick: () => $(Dt.id, { kind: 'skill', skillId: X }),
                                      children: [
                                        g.jsxs('span', {
                                          className: tt.skillTop,
                                          children: [
                                            g.jsx('span', {
                                              className: tt.skillName,
                                              children: ca[X].name,
                                            }),
                                            g.jsxs('span', {
                                              className: tt.tp,
                                              children: ['TP ', ca[X].tpCost(1)],
                                            }),
                                          ],
                                        }),
                                        g.jsx('span', {
                                          className: tt.skillDesc,
                                          children:
                                            ((S = rr[X]) == null ? void 0 : S.description) ?? '',
                                        }),
                                      ],
                                    },
                                    X
                                  );
                                }),
                                st(Dt).length === 0
                                  ? g.jsx('div', {
                                      className: tt.empty,
                                      children: '使えるスキルがない',
                                    })
                                  : null,
                                g.jsx('button', {
                                  type: 'button',
                                  className: tt.menuBack,
                                  onClick: () => v(!1),
                                  children: 'もどる',
                                }),
                              ],
                            })
                          : E
                            ? g.jsxs('div', {
                                className: tt.skillList,
                                children: [
                                  yt().map(({ id: X, remaining: S }) =>
                                    g.jsxs(
                                      'button',
                                      {
                                        type: 'button',
                                        className: tt.skillBtn,
                                        onClick: () => $(Dt.id, { kind: 'item', itemId: X }),
                                        children: [
                                          g.jsx('span', {
                                            className: tt.skillTop,
                                            children: g.jsxs('span', {
                                              className: tt.skillName,
                                              children: [se[X].name, ' ×', S],
                                            }),
                                          }),
                                          g.jsx('span', {
                                            className: tt.skillDesc,
                                            children: se[X].description,
                                          }),
                                        ],
                                      },
                                      X
                                    )
                                  ),
                                  yt().length === 0
                                    ? g.jsx('div', {
                                        className: tt.empty,
                                        children: '使える道具がない',
                                      })
                                    : null,
                                  g.jsx('button', {
                                    type: 'button',
                                    className: tt.menuBack,
                                    onClick: () => k(!1),
                                    children: 'もどる',
                                  }),
                                ],
                              })
                            : g.jsxs('div', {
                                className: tt.menu,
                                children: [
                                  g.jsx('button', {
                                    type: 'button',
                                    className: tt.menuBtn,
                                    onClick: () => $(Dt.id, { kind: 'attack' }),
                                    children: '攻撃',
                                  }),
                                  g.jsx('button', {
                                    type: 'button',
                                    className: tt.menuBtn,
                                    onClick: () => $(Dt.id, { kind: 'guard' }),
                                    children: '防御',
                                  }),
                                  g.jsx('button', {
                                    type: 'button',
                                    className: tt.menuBtn,
                                    disabled: st(Dt).length === 0,
                                    onClick: () => v(!0),
                                    children: 'スキル',
                                  }),
                                  g.jsx('button', {
                                    type: 'button',
                                    className: tt.menuBtn,
                                    disabled: yt().length === 0,
                                    onClick: () => k(!0),
                                    children: 'どうぐ',
                                  }),
                                  g.jsx('button', {
                                    type: 'button',
                                    className: tt.menuBtn,
                                    onClick: et,
                                    children: '逃走',
                                  }),
                                ],
                              }),
                      ],
                    })
                  : g.jsxs('div', {
                      className: tt.execRow,
                      children: [
                        g.jsx('button', {
                          type: 'button',
                          className: tt.redo,
                          onClick: K,
                          children: 'やり直す',
                        }),
                        g.jsx('button', {
                          type: 'button',
                          className: tt.primary,
                          disabled: !Y,
                          onClick: V,
                          children: '実行',
                        }),
                      ],
                    }),
              ],
            }),
        g.jsx('div', {
          className: tt.log,
          children:
            r.log.length === 0
              ? g.jsxs('div', {
                  className: tt.logLine,
                  children: ['てきが あらわれた！（', r.turn, ' ターン目）'],
                })
              : r.log.map((X, S) => g.jsx('div', { className: tt.logLine, children: X.text }, S)),
        }),
      ],
    });
  },
  Ab = '_layout_1b11o_1',
  Cb = '_head_1b11o_13',
  Mb = '_depth_1b11o_22',
  Rb = '_fpvWrap_1b11o_39',
  jb = '_mapWrap_1b11o_45',
  zb = '_palette_1b11o_52',
  Ob = '_tool_1b11o_62',
  Db = '_toolActive_1b11o_73',
  kb = '_paletteHint_1b11o_79',
  wb = '_stairs_1b11o_88',
  Ub = '_controls_1b11o_102',
  Bb = '_row_1b11o_112',
  Lb = '_forward_1b11o_118',
  Hb = '_turn_1b11o_133',
  qb = '_back_1b11o_147',
  Gb = '_itemOverlay_1b11o_158',
  Yb = '_itemPanel_1b11o_168',
  Xb = '_itemTitle_1b11o_181',
  Vb = '_itemEmpty_1b11o_186',
  Qb = '_itemRow_1b11o_192',
  Zb = '_itemName_1b11o_200',
  Kb = '_itemDesc_1b11o_208',
  $b = '_itemTargets_1b11o_214',
  Jb = '_itemTarget_1b11o_214',
  Ib = '_itemHp_1b11o_234',
  Wb = '_itemUse_1b11o_240',
  Fb = '_itemClose_1b11o_253',
  vt = {
    layout: Ab,
    head: Cb,
    depth: Mb,
    return: '_return_1b11o_28',
    fpvWrap: Rb,
    mapWrap: jb,
    palette: zb,
    tool: Ob,
    toolActive: Db,
    paletteHint: kb,
    stairs: wb,
    controls: Ub,
    row: Bb,
    forward: Lb,
    turn: Hb,
    back: qb,
    itemOverlay: Gb,
    itemPanel: Yb,
    itemTitle: Xb,
    itemEmpty: Vb,
    itemRow: Qb,
    itemName: Zb,
    itemDesc: Kb,
    itemTargets: $b,
    itemTarget: Jb,
    itemHp: Ib,
    itemUse: Wb,
    itemClose: Fb,
  },
  Pb = '_canvas_1keax_1',
  tS = { canvas: Pb },
  Qp = [
    { id: 'icon_chest', symbol: '📦', label: '宝箱' },
    { id: 'icon_foe', symbol: '👹', label: '強敵(FOE)' },
    { id: 'icon_warning', symbol: '⚠️', label: '注意' },
    { id: 'icon_door', symbol: '🚪', label: '扉/近道' },
    { id: 'icon_gather', symbol: '⛏️', label: '採集' },
    { id: 'icon_event', symbol: '❗', label: 'イベント' },
    { id: 'icon_note', symbol: '📝', label: 'メモ' },
    { id: 'icon_star', symbol: '⭐', label: '任意' },
  ],
  eS = new Map(Qp.map((a) => [a.id, a]));
function lS(a) {
  var c;
  return ((c = eS.get(a)) == null ? void 0 : c.symbol) ?? '•';
}
const gn = {
    fog: '#cdd9b8',
    floor: '#fbfdf7',
    wall: '#4a5a3a',
    grid: '#e3ebd6',
    player: '#2196f3',
    stairsUp: '#e8923a',
    stairsDown: '#7aa2d6',
  },
  nS = ({
    floor: a,
    explored: c,
    pos: o,
    dir: s,
    icons: r = [],
    maxCell: d = 26,
    onCellClick: p,
  }) => {
    const _ = N.useRef(null),
      y = Math.max(10, Math.min(d, Math.floor(360 / a.width))),
      m = a.width * y,
      b = a.height * y;
    N.useEffect(() => {
      const E = _.current;
      if (!E) return;
      const k = new Set(c),
        j = window.devicePixelRatio || 1;
      ((E.width = m * j), (E.height = b * j));
      const w = E.getContext('2d');
      if (!w) return;
      (w.scale(j, j), w.clearRect(0, 0, m, b));
      for (let W = 0; W < a.height; W++)
        for (let K = 0; K < a.width; K++) {
          const V = k.has(`${K},${W}`);
          ((w.fillStyle = V ? gn.floor : gn.fog),
            w.fillRect(K * y, W * y, y, y),
            V &&
              ((w.strokeStyle = gn.grid),
              (w.lineWidth = 1),
              w.strokeRect(K * y + 0.5, W * y + 0.5, y - 1, y - 1)));
        }
      ((w.strokeStyle = gn.wall), (w.lineWidth = 2), (w.lineCap = 'round'));
      const q = (W, K, V, et) => {
        (w.beginPath(), w.moveTo(W, K), w.lineTo(V, et), w.stroke());
      };
      for (let W = 0; W < a.height; W++)
        for (let K = 0; K < a.width; K++) {
          if (!k.has(`${K},${W}`)) continue;
          const V = a.cells[W][K],
            et = K * y,
            st = W * y;
          (V.walls.N && q(et, st, et + y, st),
            V.walls.S && q(et, st + y, et + y, st + y),
            V.walls.W && q(et, st, et, st + y),
            V.walls.E && q(et + y, st, et + y, st + y));
          const yt = V.event;
          ((yt == null ? void 0 : yt.kind) === 'stairsUp' ||
            (yt == null ? void 0 : yt.kind) === 'stairsDown') &&
            ((w.fillStyle = yt.kind === 'stairsUp' ? gn.stairsUp : gn.stairsDown),
            w.beginPath(),
            w.arc(et + y / 2, st + y / 2, y * 0.28, 0, Math.PI * 2),
            w.fill(),
            (w.fillStyle = '#ffffff'),
            (w.font = `bold ${Math.floor(y * 0.5)}px sans-serif`),
            (w.textAlign = 'center'),
            (w.textBaseline = 'middle'),
            w.fillText(yt.kind === 'stairsUp' ? '▲' : '▼', et + y / 2, st + y / 2 + 1));
        }
      ((w.font = `${Math.floor(y * 0.66)}px sans-serif`),
        (w.textAlign = 'center'),
        (w.textBaseline = 'middle'));
      for (const W of r)
        k.has(`${W.x},${W.y}`) && w.fillText(lS(W.iconId), W.x * y + y / 2, W.y * y + y / 2 + 1);
      const H = o.x * y + y / 2,
        Q = o.y * y + y / 2,
        z = y * 0.34,
        $ = { N: -Math.PI / 2, E: 0, S: Math.PI / 2, W: Math.PI }[s];
      ((w.fillStyle = gn.player),
        w.beginPath(),
        w.moveTo(H + Math.cos($) * z, Q + Math.sin($) * z),
        w.lineTo(H + Math.cos($ + 2.5) * z, Q + Math.sin($ + 2.5) * z),
        w.lineTo(H + Math.cos($ - 2.5) * z, Q + Math.sin($ - 2.5) * z),
        w.closePath(),
        w.fill());
    }, [a, c, o, s, r, y, m, b]);
    const v = (E) => {
      if (!p) return;
      const k = E.currentTarget.getBoundingClientRect(),
        j = Math.floor(((E.clientX - k.left) / k.width) * a.width),
        w = Math.floor(((E.clientY - k.top) / k.height) * a.height);
      j >= 0 && w >= 0 && j < a.width && w < a.height && p(j, w);
    };
    return g.jsx('canvas', {
      ref: _,
      className: tS.canvas,
      style: { width: m, height: b },
      onClick: v,
    });
  },
  aS = '_gauge_1o2hx_1',
  uS = '_icon_1o2hx_11',
  iS = '_segments_1o2hx_16',
  cS = '_seg_1o2hx_16',
  sS = '_filled_1o2hx_28',
  oS = '_danger_1o2hx_32',
  ia = { gauge: aS, icon: uS, segments: iS, seg: cS, filled: sS, danger: oS },
  rS = ({ level: a }) => {
    const c = a >= gu;
    return g.jsxs('div', {
      className: ia.gauge,
      role: 'img',
      'aria-label': `エンカウントゲージ ${a}/${gu}`,
      children: [
        g.jsx('span', { className: ia.icon, children: c ? '⚠' : '👣' }),
        g.jsx('div', {
          className: ia.segments,
          children: Array.from({ length: gu }, (o, s) =>
            g.jsx(
              'span',
              { className: [ia.seg, s < a ? ia.filled : '', c ? ia.danger : ''].join(' ') },
              s
            )
          ),
        }),
      ],
    });
  },
  fS = '_view_tw2v9_1',
  dS = { view: fS },
  lp = { N: { dx: 0, dy: -1 }, E: { dx: 1, dy: 0 }, S: { dx: 0, dy: 1 }, W: { dx: -1, dy: 0 } };
function mS(a, c, o, s = 4) {
  const r = kp(o),
    d = Dp(o),
    p = [];
  let { x: _, y } = c;
  for (let m = 0; m < s; m++) {
    const b = wp(a, _, y, o);
    if (
      (p.push({
        x: _,
        y,
        leftOpen: !a.cells[y][_].walls[r],
        rightOpen: !a.cells[y][_].walls[d],
        frontOpen: b,
        event: a.cells[y][_].event,
      }),
      !b)
    )
      break;
    ((_ += lp[o].dx), (y += lp[o].dy));
  }
  return p;
}
const gl = {
    sky: '#26301c',
    ceiling: '#3a4a2c',
    floor: '#5d6b46',
    wall: '#8b9a6b',
    frontWall: '#7a8a5c',
    outline: '#2c3720',
  },
  hS = 0.56,
  pS = ({ floor: a, pos: c, dir: o, maxDepth: s = 4, width: r = 358, height: d = 200 }) => {
    const p = N.useRef(null);
    return (
      N.useEffect(() => {
        const _ = p.current;
        if (!_) return;
        const y = window.devicePixelRatio || 1;
        ((_.width = r * y), (_.height = d * y));
        const m = _.getContext('2d');
        if (!m) return;
        m.scale(y, y);
        const b = r,
          v = d,
          E = b / 2,
          k = v / 2,
          j = mS(a, c, o, s),
          w = (Q) => {
            const z = Math.pow(hS, Q);
            return {
              l: E - (b / 2) * z,
              r: E + (b / 2) * z,
              t: k - (v / 2) * z,
              b: k + (v / 2) * z,
            };
          },
          q = (Q, z, Y = !1) => {
            (m.beginPath(), m.moveTo(Q[0][0], Q[0][1]));
            for (let $ = 1; $ < Q.length; $++) m.lineTo(Q[$][0], Q[$][1]);
            (m.closePath(),
              (m.fillStyle = z),
              m.fill(),
              Y && ((m.strokeStyle = gl.outline), (m.lineWidth = 1), m.stroke()));
          },
          H = (Q) => `rgba(0,0,0,${Math.min(0.5, Q * 0.13)})`;
        ((m.fillStyle = gl.sky), m.fillRect(0, 0, b, v));
        for (let Q = j.length - 1; Q >= 0; Q--) {
          const z = w(Q),
            Y = w(Q + 1),
            $ = j[Q];
          (q(
            [
              [z.l, z.t],
              [z.r, z.t],
              [Y.r, Y.t],
              [Y.l, Y.t],
            ],
            gl.ceiling
          ),
            q(
              [
                [z.l, z.b],
                [z.r, z.b],
                [Y.r, Y.b],
                [Y.l, Y.b],
              ],
              gl.floor
            ),
            q(
              [
                [z.l, z.t],
                [Y.l, Y.t],
                [Y.l, Y.b],
                [z.l, z.b],
              ],
              $.leftOpen ? gl.sky : gl.wall,
              !0
            ),
            q(
              [
                [z.r, z.t],
                [Y.r, Y.t],
                [Y.r, Y.b],
                [z.r, z.b],
              ],
              $.rightOpen ? gl.sky : gl.wall,
              !0
            ),
            $.frontOpen ||
              q(
                [
                  [Y.l, Y.t],
                  [Y.r, Y.t],
                  [Y.r, Y.b],
                  [Y.l, Y.b],
                ],
                gl.frontWall,
                !0
              ),
            (m.fillStyle = H(Q)),
            m.fillRect(Y.l, Y.t, Y.r - Y.l, Y.b - Y.t));
          const W = $.event;
          if (
            (W == null ? void 0 : W.kind) === 'stairsUp' ||
            (W == null ? void 0 : W.kind) === 'stairsDown'
          ) {
            const K = E,
              V = (z.b + Y.b) / 2 - (z.b - Y.b) * 0.15,
              et = Math.max(12, (z.b - z.t) * 0.18);
            ((m.fillStyle = W.kind === 'stairsUp' ? '#e8923a' : '#7aa2d6'),
              m.beginPath(),
              m.arc(K, V, et, 0, Math.PI * 2),
              m.fill(),
              (m.fillStyle = '#fff'),
              (m.font = `bold ${Math.floor(et * 1.2)}px sans-serif`),
              (m.textAlign = 'center'),
              (m.textBaseline = 'middle'),
              m.fillText(W.kind === 'stairsUp' ? '▲' : '▼', K, V + 1));
          }
        }
      }, [a, c, o, s, r, d]),
      g.jsx('canvas', { ref: p, className: dS.view, style: { width: r, height: d } })
    );
  };
function yS(a, c, o) {
  var E, k;
  const s = se[c];
  if (!s) return { save: a, ok: !1, message: 'そのアイテムは無い' };
  if (!((E = s.useContext) != null && E.includes('field')))
    return { save: a, ok: !1, message: 'ここでは使えない' };
  if ((((k = a.guild.storage.find((j) => j.itemId === c)) == null ? void 0 : k.qty) ?? 0) <= 0)
    return { save: a, ok: !1, message: '所持していない' };
  if (c === 'item_return_thread')
    return a.diveState
      ? { save: bu(_u(a, c, 1)), ok: !0, message: '拠点へ帰還した' }
      : { save: a, ok: !1, message: '探索中のみ使える' };
  if (!a.diveState) return { save: a, ok: !1, message: '探索中のみ使える' };
  const r = a.diveState.party.find((j) => j.charId === o),
    d = a.guild.members.find((j) => j.id === o);
  if (!r || !d) return { save: a, ok: !1, message: '対象がいない' };
  const p = Tu(d);
  let _ = r.hp,
    y = r.tp,
    m = !1;
  for (const j of s.effects ?? [])
    j.kind === 'heal'
      ? ((_ = Math.min(p.hp, _ + j.amount(1))), (m = !0))
      : j.kind === 'restoreTp' && ((y = Math.min(p.tp, y + j.amount(1))), (m = !0));
  if (!m) return { save: a, ok: !1, message: 'いま使う効果がない' };
  const b = a.diveState.party.map((j) => (j.charId === o ? { ...j, hp: _, tp: y } : j));
  return {
    save: _u({ ...a, diveState: { ...a.diveState, party: b } }, c, 1),
    ok: !0,
    message: `${d.name} に ${s.name} を使った`,
  };
}
function gS(a) {
  return { depth: a, floorPaint: [], wallDraw: [], icons: [], notes: [], autopilotRoutes: [] };
}
function vS(a, c) {
  return a.playerMaps[c] ?? gS(c);
}
function Zp(a, c, o) {
  return { ...a, playerMaps: { ...a.playerMaps, [c]: o } };
}
function _S(a, c, o, s, r) {
  const d = vS(a, c),
    p = d.icons.find((m) => m.x === o && m.y === s),
    _ = d.icons.filter((m) => !(m.x === o && m.y === s)),
    y = (p == null ? void 0 : p.iconId) === r ? _ : [..._, { x: o, y: s, iconId: r }];
  return Zp(a, c, { ...d, icons: y });
}
function bS(a, c, o, s) {
  const r = a.playerMaps[c];
  return r ? Zp(a, c, { ...r, icons: r.icons.filter((d) => !(d.x === o && d.y === s)) }) : a;
}
const SS = () => {
    var Q;
    const a = Sl(),
      { save: c, applySave: o, applyAndPersist: s } = bn(),
      r = N.useRef(null),
      [d, p] = N.useState(null),
      [_, y] = N.useState(!1),
      m = (c == null ? void 0 : c.diveState) ?? null,
      b = N.useMemo(() => {
        var z;
        return c && m ? ((z = c.towerState.floors[m.depth]) == null ? void 0 : z.generated) : null;
      }, [c, m]),
      v = N.useCallback(
        (z) => {
          if (!c) return;
          r.current || (r.current = ya((c.masterSeed ^ 2654435769) >>> 0));
          const Y = Y_(c, z, r.current);
          (s(() => Y.save), Y.triggered && a('/battle'));
        },
        [c, s, a]
      ),
      E = N.useCallback(
        (z) => {
          o((Y) => Lp(Y, z));
        },
        [o]
      ),
      k = N.useCallback(async () => {
        if (!c) return;
        const z = $h(c);
        z === 'stairsUp'
          ? await s((Y) => X_(Y))
          : z === 'stairsDown' &&
            (c.diveState.depth <= 1 ? (await s((Y) => bu(Y)), a('/town')) : await s((Y) => V_(Y)));
      }, [c, s, a]),
      j = N.useCallback(async () => {
        (await s((z) => bu(z)), a('/town'));
      }, [s, a]),
      w = N.useCallback(
        (z, Y) => {
          if (!c) return;
          const $ = yS(c, z, Y);
          $.ok && (s(() => $.save), $.save.diveState || (y(!1), a('/town')));
        },
        [c, s, a]
      ),
      q = N.useCallback(
        (z, Y) => {
          if (!m) return;
          const $ = m.depth;
          if (d !== null) {
            if (!((c == null ? void 0 : c.exploredCells[$]) ?? []).includes(`${z},${Y}`)) return;
            s(d === 'erase' ? (st) => bS(st, $, z, Y) : (st) => _S(st, $, z, Y, d));
            return;
          }
          const W = z - m.pos.x,
            K = Y - m.pos.y,
            V = ['N', 'E', 'S', 'W'].find((et) => ra[et].dx === W && ra[et].dy === K);
          V && v(V);
        },
        [m, v, d, c, s]
      );
    if (!c) return g.jsx(bl, { to: '/title', replace: !0 });
    if (!m || !b) return g.jsx(bl, { to: '/town', replace: !0 });
    const H = $h(c);
    return g.jsxs('div', {
      className: vt.layout,
      children: [
        g.jsxs('header', {
          className: vt.head,
          children: [
            g.jsxs('div', { className: vt.depth, children: [m.depth, 'F'] }),
            g.jsx(rS, { level: C_(m.encounter.stepsUntilEncounter) }),
            g.jsx('button', {
              type: 'button',
              className: vt.return,
              onClick: () => y(!0),
              children: '道具',
            }),
            g.jsx('button', {
              type: 'button',
              className: vt.return,
              onClick: () => void j(),
              children: '帰還',
            }),
          ],
        }),
        g.jsx('div', {
          className: vt.fpvWrap,
          children: g.jsx(pS, { floor: b, pos: m.pos, dir: m.dir }),
        }),
        g.jsx('div', {
          className: vt.mapWrap,
          children: g.jsx(nS, {
            floor: b,
            explored: c.exploredCells[m.depth] ?? [],
            pos: m.pos,
            dir: m.dir,
            icons: ((Q = c.playerMaps[m.depth]) == null ? void 0 : Q.icons) ?? [],
            onCellClick: q,
          }),
        }),
        g.jsxs('div', {
          className: vt.palette,
          children: [
            g.jsx('button', {
              type: 'button',
              className: `${vt.tool} ${d === null ? vt.toolActive : ''}`,
              onClick: () => p(null),
              'aria-label': '移動モード',
              children: '🚶',
            }),
            Qp.map((z) =>
              g.jsx(
                'button',
                {
                  type: 'button',
                  className: `${vt.tool} ${d === z.id ? vt.toolActive : ''}`,
                  onClick: () => p(z.id),
                  'aria-label': z.label,
                  children: z.symbol,
                },
                z.id
              )
            ),
            g.jsx('button', {
              type: 'button',
              className: `${vt.tool} ${d === 'erase' ? vt.toolActive : ''}`,
              onClick: () => p('erase'),
              'aria-label': '消しゴム',
              children: '🧽',
            }),
          ],
        }),
        g.jsx('p', {
          className: vt.paletteHint,
          children:
            d === null
              ? '隣接マスをタップで移動。アイコンを選ぶとマップに書き込めます。'
              : d === 'erase'
                ? 'マップ上のマスをタップでアイコンを消去。'
                : 'マップ上の探索済みマスをタップでアイコンを配置（再タップで消去）。',
        }),
        H &&
          g.jsx('button', {
            type: 'button',
            className: vt.stairs,
            onClick: () => void k(),
            children:
              H === 'stairsUp'
                ? '▲ 次の階へ進む'
                : m.depth <= 1
                  ? '▼ 拠点へ戻る'
                  : '▼ 前の階へ戻る',
          }),
        g.jsxs('div', {
          className: vt.controls,
          children: [
            g.jsxs('div', {
              className: vt.row,
              children: [
                g.jsx('button', {
                  type: 'button',
                  className: vt.turn,
                  onClick: () => E(kp(m.dir)),
                  'aria-label': '左を向く',
                  children: '↰',
                }),
                g.jsx('button', {
                  type: 'button',
                  className: vt.forward,
                  onClick: () => v(m.dir),
                  children: '前進',
                }),
                g.jsx('button', {
                  type: 'button',
                  className: vt.turn,
                  onClick: () => E(Dp(m.dir)),
                  'aria-label': '右を向く',
                  children: '↱',
                }),
              ],
            }),
            g.jsx('button', {
              type: 'button',
              className: vt.back,
              onClick: () => E(D_(m.dir)),
              'aria-label': '振り向く',
              children: '↻ 振り向く',
            }),
          ],
        }),
        _
          ? g.jsx('div', {
              className: vt.itemOverlay,
              onClick: () => y(!1),
              children: g.jsxs('div', {
                className: vt.itemPanel,
                onClick: (z) => z.stopPropagation(),
                children: [
                  g.jsx('div', { className: vt.itemTitle, children: 'どうぐ' }),
                  (() => {
                    const z = c.guild.storage.filter((Y) => {
                      var $, W;
                      return (
                        ((W = ($ = se[Y.itemId]) == null ? void 0 : $.useContext) == null
                          ? void 0
                          : W.includes('field')) && Y.qty > 0
                      );
                    });
                    return z.length === 0
                      ? g.jsx('p', {
                          className: vt.itemEmpty,
                          children: '使える道具がありません。',
                        })
                      : z.map((Y) => {
                          const $ = se[Y.itemId],
                            W = Y.itemId === 'item_return_thread';
                          return g.jsxs(
                            'div',
                            {
                              className: vt.itemRow,
                              children: [
                                g.jsxs('div', {
                                  className: vt.itemName,
                                  children: [
                                    $.name,
                                    ' ×',
                                    Y.qty,
                                    g.jsx('span', {
                                      className: vt.itemDesc,
                                      children: $.description,
                                    }),
                                  ],
                                }),
                                W
                                  ? g.jsx('button', {
                                      type: 'button',
                                      className: vt.itemUse,
                                      onClick: () => w(Y.itemId),
                                      children: '使う',
                                    })
                                  : g.jsx('div', {
                                      className: vt.itemTargets,
                                      children: m.party.map((K) => {
                                        const V = c.guild.members.find((st) => st.id === K.charId);
                                        if (!V) return null;
                                        const et = Tu(V);
                                        return g.jsxs(
                                          'button',
                                          {
                                            type: 'button',
                                            className: vt.itemTarget,
                                            onClick: () => w(Y.itemId, K.charId),
                                            children: [
                                              V.name,
                                              g.jsxs('span', {
                                                className: vt.itemHp,
                                                children: [
                                                  'HP ',
                                                  K.hp,
                                                  '/',
                                                  et.hp,
                                                  '・TP ',
                                                  K.tp,
                                                  '/',
                                                  et.tp,
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
                            Y.itemId
                          );
                        });
                  })(),
                  g.jsx('button', {
                    type: 'button',
                    className: vt.itemClose,
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
  xS = '_layout_16au8_2',
  ES = '_head_16au8_13',
  TS = '_title_16au8_20',
  NS = '_count_16au8_26',
  AS = '_create_16au8_31',
  CS = '_sectionTitle_16au8_42',
  MS = '_field_16au8_48',
  RS = '_primary_16au8_64',
  jS = '_list_16au8_79',
  zS = '_empty_16au8_83',
  OS = '_members_16au8_88',
  DS = '_member_16au8_88',
  kS = '_memberMain_16au8_107',
  wS = '_memberName_16au8_119',
  US = '_pos_16au8_127',
  BS = '_memberSub_16au8_144',
  LS = '_posBtns_16au8_149',
  HS = '_posBtn_16au8_149',
  qS = '_posBtnActive_16au8_164',
  GS = '_foot_16au8_170',
  YS = '_sub_16au8_174',
  Tt = {
    layout: xS,
    head: ES,
    title: TS,
    count: NS,
    create: AS,
    sectionTitle: CS,
    field: MS,
    primary: RS,
    list: jS,
    empty: zS,
    members: OS,
    member: DS,
    memberMain: kS,
    memberName: wS,
    pos: US,
    pos_前衛: '_pos_前衛_16au8_136',
    pos_後衛: '_pos_後衛_16au8_140',
    memberSub: BS,
    posBtns: LS,
    posBtn: HS,
    posBtnActive: qS,
    foot: GS,
    sub: YS,
  };
function XS(a) {
  return [...a.guild.party.front, ...a.guild.party.back].filter((c) => c !== null).length;
}
const Kp = (a) => (a === 'front' ? lc : nc);
function VS(a, c, o, s) {
  if (o < 0 || o >= Kp(c) || (s !== null && !a.guild.members.some((p) => p.id === s))) return a;
  const r = a.guild.party.front.map((p) => (p === s ? null : p)),
    d = a.guild.party.back.map((p) => (p === s ? null : p));
  for (; r.length < lc; ) r.push(null);
  for (; d.length < nc; ) d.push(null);
  return (
    c === 'front' ? (r[o] = s) : (d[o] = s),
    { ...a, guild: { ...a.guild, party: { front: r, back: d } } }
  );
}
function $p(a, c) {
  const o = a.guild.party.front.map((r) => (r === c ? null : r)),
    s = a.guild.party.back.map((r) => (r === c ? null : r));
  return { ...a, guild: { ...a.guild, party: { front: o, back: s } } };
}
function np(a, c, o) {
  if (
    !a.guild.members.some((_) => _.id === c) ||
    (o === 'front' ? a.guild.party.front : a.guild.party.back).includes(c)
  )
    return a;
  const r = $p(a, c),
    d = o === 'front' ? r.guild.party.front : r.guild.party.back;
  let p = d.indexOf(null);
  if (p < 0)
    if (d.length < Kp(o)) p = d.length;
    else return a;
  return VS(r, o, p, c);
}
function QS(a, c) {
  return a.guild.party.front.includes(c)
    ? '前衛'
    : a.guild.party.back.includes(c)
      ? '後衛'
      : '控え';
}
const ZS = () => {
    const a = Sl(),
      { save: c, applyAndPersist: o } = bn(),
      s = Object.keys(Ve),
      r = Object.keys(ue),
      [d, p] = N.useState(''),
      [_, y] = N.useState(s[0]),
      [m, b] = N.useState(r[0]),
      [v, E] = N.useState(!1),
      k = N.useCallback(async () => {
        const q = d.trim() || '名もなき冒険者',
          H = Hp({ raceId: _, classId: m, name: q });
        (E(!0), await o((Q) => tb(Q, H)), p(''), E(!1));
      }, [d, _, m, o]);
    if (!c) return g.jsx(bl, { to: '/title', replace: !0 });
    const { members: j } = c.guild,
      w = j.length >= Qo;
    return g.jsxs('div', {
      className: Tt.layout,
      children: [
        g.jsxs('header', {
          className: Tt.head,
          children: [
            g.jsx('h1', { className: Tt.title, children: 'ギルド管理' }),
            g.jsxs('span', { className: Tt.count, children: ['団員 ', j.length, ' / ', Qo] }),
          ],
        }),
        g.jsxs('section', {
          className: Tt.create,
          children: [
            g.jsx('h2', { className: Tt.sectionTitle, children: '冒険者を作成' }),
            g.jsxs('label', {
              className: Tt.field,
              children: [
                g.jsx('span', { children: '名前' }),
                g.jsx('input', {
                  type: 'text',
                  value: d,
                  maxLength: 16,
                  placeholder: '名もなき冒険者',
                  onChange: (q) => p(q.target.value),
                }),
              ],
            }),
            g.jsxs('label', {
              className: Tt.field,
              children: [
                g.jsx('span', { children: '種族' }),
                g.jsx('select', {
                  value: _,
                  onChange: (q) => y(q.target.value),
                  children: s.map((q) => g.jsx('option', { value: q, children: Ve[q].name }, q)),
                }),
              ],
            }),
            g.jsxs('label', {
              className: Tt.field,
              children: [
                g.jsx('span', { children: '職業' }),
                g.jsx('select', {
                  value: m,
                  onChange: (q) => b(q.target.value),
                  children: r.map((q) => g.jsx('option', { value: q, children: ue[q].name }, q)),
                }),
              ],
            }),
            g.jsx('button', {
              type: 'button',
              className: Tt.primary,
              disabled: v || w,
              onClick: () => void k(),
              children: w ? '団員が上限です' : '作成する',
            }),
          ],
        }),
        g.jsxs('section', {
          className: Tt.list,
          children: [
            g.jsxs('h2', {
              className: Tt.sectionTitle,
              children: [
                '団員一覧',
                ' ',
                g.jsxs('span', {
                  className: Tt.count,
                  children: ['（出撃 ', XS(c), ' / ', i_, '）'],
                }),
              ],
            }),
            j.length === 0
              ? g.jsx('p', { className: Tt.empty, children: 'まだ冒険者がいません。' })
              : g.jsx('ul', {
                  className: Tt.members,
                  children: j.map((q) => {
                    var Q, z;
                    const H = QS(c, q.id);
                    return g.jsxs(
                      'li',
                      {
                        className: Tt.member,
                        children: [
                          g.jsxs('button', {
                            type: 'button',
                            className: Tt.memberMain,
                            onClick: () => a(`/guild/char/${q.id}`),
                            children: [
                              g.jsxs('span', {
                                className: Tt.memberName,
                                children: [
                                  q.name,
                                  g.jsx('span', {
                                    className: `${Tt.pos} ${Tt[`pos_${H}`] ?? ''}`,
                                    children: H,
                                  }),
                                ],
                              }),
                              g.jsxs('span', {
                                className: Tt.memberSub,
                                children: [
                                  (Q = Ve[q.raceId]) == null ? void 0 : Q.name,
                                  ' / ',
                                  (z = ue[q.classId]) == null ? void 0 : z.name,
                                  ' / Lv',
                                  q.level,
                                  ' ›',
                                ],
                              }),
                            ],
                          }),
                          g.jsxs('div', {
                            className: Tt.posBtns,
                            children: [
                              g.jsx('button', {
                                type: 'button',
                                className: `${Tt.posBtn} ${H === '前衛' ? Tt.posBtnActive : ''}`,
                                onClick: () => void o((Y) => np(Y, q.id, 'front')),
                                children: '前',
                              }),
                              g.jsx('button', {
                                type: 'button',
                                className: `${Tt.posBtn} ${H === '後衛' ? Tt.posBtnActive : ''}`,
                                onClick: () => void o((Y) => np(Y, q.id, 'back')),
                                children: '後',
                              }),
                              g.jsx('button', {
                                type: 'button',
                                className: `${Tt.posBtn} ${H === '控え' ? Tt.posBtnActive : ''}`,
                                onClick: () => void o((Y) => $p(Y, q.id)),
                                children: '控',
                              }),
                            ],
                          }),
                        ],
                      },
                      q.id
                    );
                  }),
                }),
          ],
        }),
        g.jsx('footer', {
          className: Tt.foot,
          children: g.jsx('button', {
            type: 'button',
            className: Tt.sub,
            onClick: () => a('/town'),
            children: '拠点へ戻る',
          }),
        }),
      ],
    });
  },
  KS = '_layout_tw23z_1',
  $S = '_head_tw23z_12',
  JS = '_title_tw23z_16',
  IS = '_sub_tw23z_22',
  WS = '_card_tw23z_27',
  FS = '_h2_tw23z_35',
  PS = '_sp_tw23z_44',
  t2 = '_stats_tw23z_50',
  e2 = '_equipSlot_tw23z_74',
  l2 = '_equipHead_tw23z_82',
  n2 = '_slotLabel_tw23z_88',
  a2 = '_equipName_tw23z_95',
  u2 = '_smallBtn_tw23z_100',
  i2 = '_equipPick_tw23z_110',
  c2 = '_pickBtn_tw23z_118',
  s2 = '_skills_tw23z_128',
  o2 = '_skill_tw23z_128',
  r2 = '_skillInfo_tw23z_143',
  f2 = '_skillName_tw23z_150',
  d2 = '_skillLv_tw23z_158',
  m2 = '_skillDesc_tw23z_164',
  h2 = '_learnBtn_tw23z_169',
  p2 = '_jobRow_tw23z_185',
  y2 = '_select_tw23z_192',
  g2 = '_input_tw23z_193',
  v2 = '_actBtn_tw23z_203',
  _2 = '_warn_tw23z_220',
  b2 = '_titleHave_tw23z_227',
  S2 = '_titleOpts_tw23z_233',
  x2 = '_titleBtn_tw23z_240',
  E2 = '_rbForm_tw23z_252',
  T2 = '_danger_tw23z_258',
  N2 = '_foot_tw23z_270',
  A2 = '_back_tw23z_274',
  ut = {
    layout: KS,
    head: $S,
    title: JS,
    sub: IS,
    card: WS,
    h2: FS,
    sp: PS,
    stats: t2,
    equipSlot: e2,
    equipHead: l2,
    slotLabel: n2,
    equipName: a2,
    smallBtn: u2,
    equipPick: i2,
    pickBtn: c2,
    skills: s2,
    skill: o2,
    skillInfo: r2,
    skillName: f2,
    skillLv: d2,
    skillDesc: m2,
    learnBtn: h2,
    jobRow: p2,
    select: y2,
    input: g2,
    actBtn: v2,
    warn: _2,
    titleHave: b2,
    titleOpts: S2,
    titleBtn: x2,
    rbForm: E2,
    danger: T2,
    foot: N2,
    back: A2,
  },
  Jp = ['weapon', 'armor', 'accessory'];
function Ip(a, c, o) {
  return { ...a, guild: { ...a.guild, members: a.guild.members.map((s) => (s.id === c ? o : s)) } };
}
function C2(a) {
  var c, o;
  return (o = (c = ue[a]) == null ? void 0 : c.skillTree.skills[0]) == null ? void 0 : o.skillId;
}
function M2(a) {
  var c;
  return new Set(
    (((c = Ve[a]) == null ? void 0 : c.unionSkillTree.skills) ?? []).map((o) => o.skillId)
  );
}
const R2 = (a) => Object.values(a).reduce((c, o) => c + o, 0);
function j2(a, c) {
  if (!ue[c]) return a;
  const o = M2(a.raceId);
  let s = {};
  for (const [y, m] of Object.entries(a.learnedSkills)) o.has(y) && (s[y] = m);
  const r = C2(c);
  r && !s[r] && (s[r] = 1);
  const d = Math.max(1, a.level - Np),
    p = Mt.SP_PER_LEVEL * Math.max(0, d - 1);
  let _ = R2(s) - (r && s[r] ? 1 : 0);
  return (
    _ > p && ((s = r ? { [r]: 1 } : {}), (_ = 0)),
    {
      ...a,
      classId: c,
      titleId: null,
      level: d,
      exp: 0,
      learnedSkills: s,
      skillPoints: { total: p, spent: _ },
    }
  );
}
function z2(a, c, o) {
  const s = a.guild.members.find((p) => p.id === c);
  if (!s) return a;
  let r = Ip(a, c, j2(s, o));
  const d = r.guild.members.find((p) => p.id === c);
  for (const p of Jp) {
    const _ = d.equipment[p];
    _ && !dr(d, _) && (r = mr(r, c, p));
  }
  return r;
}
const O2 = [
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
function D2(a) {
  const c = O2.find((o) => a >= o.min && a <= o.max);
  return c ? { allStats: c.allStats, bonusSp: c.bonusSp } : null;
}
function Wp(a) {
  return a.level >= yu.REBIRTH_MIN_LEVEL;
}
function k2(a, c) {
  const o = D2(a.level);
  if (!o) return a;
  const s = Math.min(30, Math.floor(a.level / 2)),
    r = Hp({ ...c, id: a.id }),
    d = Mt.SP_PER_LEVEL * Math.max(0, s - 1) + o.bonusSp;
  return {
    ...r,
    level: Math.max(1, s),
    exp: 0,
    rebirthBonus: o,
    skillPoints: { total: d, spent: r.skillPoints.spent },
  };
}
function w2(a, c, o) {
  const s = a.guild.members.find((p) => p.id === c);
  if (!s || !Wp(s)) return a;
  let r = a;
  for (const p of Jp) s.equipment[p] && (r = mr(r, c, p));
  const d = r.guild.members.find((p) => p.id === c);
  return Ip(r, c, k2(d, o));
}
function Fp(a, c, o) {
  var r;
  return o < yu.TITLE_DEPTH || a.titleId
    ? !1
    : (((r = ue[a.classId]) == null ? void 0 : r.titleOptions) ?? []).includes(c);
}
function U2(a, c, o) {
  return Fp(a, c, o)
    ? { ...a, titleId: c, skillPoints: { ...a.skillPoints, total: a.skillPoints.total + c_ } }
    : a;
}
function Pp(a) {
  var o, s;
  const c = [
    ...(((o = ue[a.classId]) == null ? void 0 : o.skillTree.skills) ?? []),
    ...(((s = Ve[a.raceId]) == null ? void 0 : s.unionSkillTree.skills) ?? []),
  ];
  return (a.titleId && oa[a.titleId] && c.push(...oa[a.titleId].skillTree.skills), c);
}
function ic(a, c) {
  return a.learnedSkills[c] ?? 0;
}
function ty(a) {
  return a.skillPoints.total - a.skillPoints.spent;
}
function B2(a, c) {
  return (c.requires ?? []).every((o) => ic(a, o.skillId) >= o.level);
}
function ey(a, c) {
  const o = Pp(a).find((s) => s.skillId === c);
  return !o || ic(a, c) >= o.maxLevel || ty(a) <= 0 ? !1 : B2(a, o);
}
function L2(a, c) {
  return ey(a, c)
    ? {
        ...a,
        learnedSkills: { ...a.learnedSkills, [c]: ic(a, c) + 1 },
        skillPoints: { ...a.skillPoints, spent: a.skillPoints.spent + 1 },
      }
    : a;
}
const ap = Object.keys(Ve),
  Vi = Object.keys(ue),
  H2 = ['weapon', 'armor', 'accessory'],
  q2 = { weapon: '武器', armor: '防具', accessory: '装飾' },
  G2 = [
    { key: 'hp', label: 'HP' },
    { key: 'tp', label: 'TP' },
    { key: 'str', label: 'STR' },
    { key: 'vit', label: 'VIT' },
    { key: 'agi', label: 'AGI' },
    { key: 'int', label: 'INT' },
    { key: 'mnd', label: 'MND' },
    { key: 'luc', label: 'LUC' },
  ],
  Y2 = () => {
    var Y, $, W, K;
    const a = Sl(),
      { id: c } = Sv(),
      { save: o, applyAndPersist: s } = bn(),
      [r, d] = N.useState(Vi[0]),
      [p, _] = N.useState(''),
      [y, m] = N.useState(ap[0]),
      [b, v] = N.useState(Vi[0]),
      [E, k] = N.useState(!1);
    if (!o) return g.jsx(bl, { to: '/title', replace: !0 });
    const j = o.guild.members.find((V) => V.id === c);
    if (!j || !c) return g.jsx(bl, { to: '/guild', replace: !0 });
    const w = Tu(j),
      q = ty(j),
      H = o.towerState.record.deepestReached,
      Q = (V) =>
        s((et) => ({
          ...et,
          guild: { ...et.guild, members: et.guild.members.map((st) => (st.id === c ? V(st) : st)) },
        }));
    return g.jsxs('div', {
      className: ut.layout,
      children: [
        g.jsxs('header', {
          className: ut.head,
          children: [
            g.jsx('h1', { className: ut.title, children: j.name }),
            g.jsxs('span', {
              className: ut.sub,
              children: [
                (Y = Ve[j.raceId]) == null ? void 0 : Y.name,
                ' / ',
                ($ = ue[j.classId]) == null ? void 0 : $.name,
                ' / Lv',
                j.level,
              ],
            }),
          ],
        }),
        g.jsxs('section', {
          className: ut.card,
          children: [
            g.jsx('h2', { className: ut.h2, children: 'ステータス' }),
            g.jsx('dl', {
              className: ut.stats,
              children: G2.map((V) =>
                g.jsxs(
                  'div',
                  {
                    children: [
                      g.jsx('dt', { children: V.label }),
                      g.jsx('dd', { children: w[V.key] }),
                    ],
                  },
                  V.key
                )
              ),
            }),
          ],
        }),
        g.jsxs('section', {
          className: ut.card,
          children: [
            g.jsx('h2', { className: ut.h2, children: '装備' }),
            H2.map((V) => {
              const et = j.equipment[V],
                st = et ? Ce[et] : null,
                yt = o.guild.storage.filter((Nt) => {
                  var Dt;
                  return (
                    ((Dt = Ce[Nt.itemId]) == null ? void 0 : Dt.slot) === V && dr(j, Nt.itemId)
                  );
                });
              return g.jsxs(
                'div',
                {
                  className: ut.equipSlot,
                  children: [
                    g.jsxs('div', {
                      className: ut.equipHead,
                      children: [
                        g.jsx('span', { className: ut.slotLabel, children: q2[V] }),
                        g.jsx('span', {
                          className: ut.equipName,
                          children: st ? st.name : '（なし）',
                        }),
                        st
                          ? g.jsx('button', {
                              type: 'button',
                              className: ut.smallBtn,
                              onClick: () => void z(V),
                              children: '外す',
                            })
                          : null,
                      ],
                    }),
                    yt.length > 0
                      ? g.jsx('div', {
                          className: ut.equipPick,
                          children: yt.map((Nt) =>
                            g.jsxs(
                              'button',
                              {
                                type: 'button',
                                className: ut.pickBtn,
                                onClick: () => void s((Dt) => m_(Dt, c, Nt.itemId)),
                                children: [
                                  Ce[Nt.itemId].name,
                                  ' 装備',
                                  Nt.qty > 1 ? `(${Nt.qty})` : '',
                                ],
                              },
                              Nt.itemId
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
        g.jsxs('section', {
          className: ut.card,
          children: [
            g.jsxs('h2', {
              className: ut.h2,
              children: ['スキル ', g.jsxs('span', { className: ut.sp, children: ['SP ', q] })],
            }),
            g.jsx('ul', {
              className: ut.skills,
              children: Pp(j).map((V) => {
                const et = ic(j, V.skillId),
                  st = ey(j, V.skillId),
                  yt = rr[V.skillId];
                return g.jsxs(
                  'li',
                  {
                    className: ut.skill,
                    children: [
                      g.jsxs('div', {
                        className: ut.skillInfo,
                        children: [
                          g.jsxs('span', {
                            className: ut.skillName,
                            children: [
                              (yt == null ? void 0 : yt.name) ?? V.skillId,
                              g.jsxs('span', {
                                className: ut.skillLv,
                                children: ['Lv ', et, '/', V.maxLevel],
                              }),
                            ],
                          }),
                          g.jsx('span', {
                            className: ut.skillDesc,
                            children: (yt == null ? void 0 : yt.description) ?? '',
                          }),
                        ],
                      }),
                      g.jsx('button', {
                        type: 'button',
                        className: ut.learnBtn,
                        disabled: !st,
                        onClick: () => void Q((Nt) => L2(Nt, V.skillId)),
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
        g.jsxs('section', {
          className: ut.card,
          children: [
            g.jsx('h2', { className: ut.h2, children: '転職' }),
            g.jsxs('div', {
              className: ut.jobRow,
              children: [
                g.jsx('select', {
                  className: ut.select,
                  value: r,
                  onChange: (V) => d(V.target.value),
                  children: Vi.map((V) => g.jsx('option', { value: V, children: ue[V].name }, V)),
                }),
                g.jsx('button', {
                  type: 'button',
                  className: ut.actBtn,
                  disabled: r === j.classId,
                  onClick: () => void s((V) => z2(V, c, r)),
                  children: '転職する',
                }),
              ],
            }),
            g.jsxs('p', {
              className: ut.warn,
              children: [
                '※ レベルが ',
                Np,
                ' ',
                '下がり、職業/称号スキルは振り直しになります（種族スキルは保持）。',
              ],
            }),
            g.jsx('h2', { className: ut.h2, children: '称号' }),
            j.titleId
              ? g.jsxs('p', {
                  className: ut.titleHave,
                  children: ['習得済み: ', (W = oa[j.titleId]) == null ? void 0 : W.name],
                })
              : H < yu.TITLE_DEPTH
                ? g.jsxs('p', {
                    className: ut.warn,
                    children: ['第 ', yu.TITLE_DEPTH, ' 階到達で習得できます（現在 ', H, 'F）。'],
                  })
                : g.jsx('div', {
                    className: ut.titleOpts,
                    children: (((K = ue[j.classId]) == null ? void 0 : K.titleOptions) ?? []).map(
                      (V) => {
                        var et;
                        return g.jsxs(
                          'button',
                          {
                            type: 'button',
                            className: ut.titleBtn,
                            disabled: !Fp(j, V, H),
                            onClick: () => void Q((st) => U2(st, V, H)),
                            children: [(et = oa[V]) == null ? void 0 : et.name, '（SP+5）'],
                          },
                          V
                        );
                      }
                    ),
                  }),
            g.jsx('h2', { className: ut.h2, children: '転生' }),
            Wp(j)
              ? E
                ? g.jsxs('div', {
                    className: ut.rbForm,
                    children: [
                      g.jsxs('p', {
                        className: ut.warn,
                        children: [
                          '※ 作り直して強い新人になります（開始Lv ',
                          Math.min(30, Math.floor(j.level / 2)),
                          '・ボーナス付き）。',
                        ],
                      }),
                      g.jsx('input', {
                        className: ut.input,
                        type: 'text',
                        maxLength: 16,
                        placeholder: j.name,
                        value: p,
                        onChange: (V) => _(V.target.value),
                      }),
                      g.jsxs('div', {
                        className: ut.jobRow,
                        children: [
                          g.jsx('select', {
                            className: ut.select,
                            value: y,
                            onChange: (V) => m(V.target.value),
                            children: ap.map((V) =>
                              g.jsx('option', { value: V, children: Ve[V].name }, V)
                            ),
                          }),
                          g.jsx('select', {
                            className: ut.select,
                            value: b,
                            onChange: (V) => v(V.target.value),
                            children: Vi.map((V) =>
                              g.jsx('option', { value: V, children: ue[V].name }, V)
                            ),
                          }),
                        ],
                      }),
                      g.jsxs('div', {
                        className: ut.jobRow,
                        children: [
                          g.jsx('button', {
                            type: 'button',
                            className: ut.danger,
                            onClick: () => {
                              (s((V) =>
                                w2(V, c, { raceId: y, classId: b, name: p.trim() || j.name })
                              ),
                                k(!1));
                            },
                            children: '転生を実行',
                          }),
                          g.jsx('button', {
                            type: 'button',
                            className: ut.actBtn,
                            onClick: () => k(!1),
                            children: 'やめる',
                          }),
                        ],
                      }),
                    ],
                  })
                : g.jsx('button', {
                    type: 'button',
                    className: ut.actBtn,
                    onClick: () => k(!0),
                    children: '転生する…',
                  })
              : g.jsxs('p', {
                  className: ut.warn,
                  children: [
                    'Lv',
                    yu.REBIRTH_MIN_LEVEL,
                    ' 以上で転生できます（現在 Lv',
                    j.level,
                    '）。',
                  ],
                }),
          ],
        }),
        g.jsx('footer', {
          className: ut.foot,
          children: g.jsx('button', {
            type: 'button',
            className: ut.back,
            onClick: () => a('/guild'),
            children: 'もどる',
          }),
        }),
      ],
    });
    function z(V) {
      return s((et) => mr(et, c, V));
    }
  },
  X2 = () => g.jsx('div', { children: g.jsx('h1', { children: 'Not Found' }) }),
  V2 = '_layout_1u0ua_1',
  Q2 = '_head_1u0ua_11',
  Z2 = '_title_1u0ua_18',
  K2 = '_gold_1u0ua_24',
  $2 = '_tabs_1u0ua_29',
  J2 = '_tab_1u0ua_29',
  I2 = '_tabActive_1u0ua_46',
  W2 = '_list_1u0ua_51',
  F2 = '_row_1u0ua_59',
  P2 = '_info_1u0ua_70',
  tx = '_name_1u0ua_76',
  ex = '_note_1u0ua_81',
  lx = '_action_1u0ua_86',
  nx = '_empty_1u0ua_103',
  ax = '_foot_1u0ua_108',
  ux = '_back_1u0ua_112',
  Ht = {
    layout: V2,
    head: Q2,
    title: Z2,
    gold: K2,
    tabs: $2,
    tab: J2,
    tabActive: I2,
    list: W2,
    row: F2,
    info: P2,
    name: tx,
    note: ex,
    action: lx,
    empty: nx,
    foot: ax,
    back: ux,
  };
function ix(a) {
  return Math.max(0, Math.floor(a.towerState.record.deepestReached / 10));
}
const ly = {
    item_slime_jelly: ['equip_slime_shield'],
    item_rat_tail: ['equip_rat_dagger'],
    item_bat_wing: ['equip_bat_cloak'],
    item_golem_core: ['equip_golem_blade'],
  },
  cx = (a) => {
    const c = Ce[a].bonuses,
      o = [];
    return (
      c.atk && o.push(`ATK+${c.atk}`),
      c.mat && o.push(`MAT+${c.mat}`),
      c.def && o.push(`DEF+${c.def}`),
      c.mdf && o.push(`MDF+${c.mdf}`),
      o.join(' ')
    );
  };
function sx(a) {
  const c = ix(a),
    o = new Set(a.shopStock.unlockedItemIds),
    s = Object.values(se)
      .filter((d) => d.buyPrice > 0)
      .map((d) => ({ id: d.id, name: d.name, price: d.buyPrice, kind: 'item' }));
  return [
    ...Object.values(Ce)
      .filter((d) => d.tier <= c || o.has(d.id))
      .map((d) => ({ id: d.id, name: d.name, price: d.buyPrice, kind: 'equip', note: cx(d.id) })),
    ...s,
  ];
}
function ox(a) {
  return ly[a] ?? [];
}
function rx(a) {
  var c, o;
  return (
    ((c = se[a]) == null ? void 0 : c.buyPrice) ??
    ((o = Ce[a]) == null ? void 0 : o.buyPrice) ??
    null
  );
}
function tr(a) {
  return se[a] ? a_(se[a]) : Ce[a] ? Math.floor(Ce[a].buyPrice / 2) : 0;
}
function fx(a, c) {
  const o = rx(c);
  if (o === null || o <= 0 || a.guild.gold < o) return a;
  const s = ac(a, c, 1);
  return { ...s, guild: { ...s.guild, gold: s.guild.gold - o } };
}
function dx(a, c, o = 1) {
  var y;
  if ((((y = a.guild.storage.find((m) => m.itemId === c)) == null ? void 0 : y.qty) ?? 0) < o)
    return a;
  const r = tr(c) * o,
    d = _u(a, c, o),
    p = ox(c).filter((m) => !d.shopStock.unlockedItemIds.includes(m)),
    _ = [...d.shopStock.unlockedItemIds, ...p];
  return {
    ...d,
    guild: { ...d.guild, gold: d.guild.gold + r },
    shopStock: { ...d.shopStock, unlockedItemIds: _ },
  };
}
const mx = () => {
    const a = Sl(),
      { save: c, applyAndPersist: o } = bn(),
      [s, r] = N.useState('buy');
    if (!c) return g.jsx(bl, { to: '/title', replace: !0 });
    const d = c.guild.gold,
      p = sx(c),
      _ = c.guild.storage.filter((m) => tr(m.itemId) > 0),
      y = (m) => {
        var b, v;
        return (
          ((b = se[m]) == null ? void 0 : b.name) ?? ((v = Ce[m]) == null ? void 0 : v.name) ?? m
        );
      };
    return g.jsxs('div', {
      className: Ht.layout,
      children: [
        g.jsxs('header', {
          className: Ht.head,
          children: [
            g.jsx('h1', { className: Ht.title, children: 'ショップ' }),
            g.jsxs('span', { className: Ht.gold, children: [d, ' G'] }),
          ],
        }),
        g.jsxs('div', {
          className: Ht.tabs,
          children: [
            g.jsx('button', {
              type: 'button',
              className: `${Ht.tab} ${s === 'buy' ? Ht.tabActive : ''}`,
              onClick: () => r('buy'),
              children: '買う',
            }),
            g.jsx('button', {
              type: 'button',
              className: `${Ht.tab} ${s === 'sell' ? Ht.tabActive : ''}`,
              onClick: () => r('sell'),
              children: '売る',
            }),
          ],
        }),
        g.jsx('div', {
          className: Ht.list,
          children:
            s === 'buy'
              ? p.map((m) =>
                  g.jsxs(
                    'div',
                    {
                      className: Ht.row,
                      children: [
                        g.jsxs('div', {
                          className: Ht.info,
                          children: [
                            g.jsx('span', { className: Ht.name, children: m.name }),
                            m.note ? g.jsx('span', { className: Ht.note, children: m.note }) : null,
                          ],
                        }),
                        g.jsxs('button', {
                          type: 'button',
                          className: Ht.action,
                          disabled: d < m.price,
                          onClick: () => void o((b) => fx(b, m.id)),
                          children: [m.price, ' G'],
                        }),
                      ],
                    },
                    m.id
                  )
                )
              : _.length === 0
                ? g.jsx('p', { className: Ht.empty, children: '売れる物がありません。' })
                : _.map((m) =>
                    g.jsxs(
                      'div',
                      {
                        className: Ht.row,
                        children: [
                          g.jsxs('div', {
                            className: Ht.info,
                            children: [
                              g.jsx('span', { className: Ht.name, children: y(m.itemId) }),
                              g.jsxs('span', { className: Ht.note, children: ['所持 ', m.qty] }),
                            ],
                          }),
                          g.jsxs('button', {
                            type: 'button',
                            className: Ht.action,
                            onClick: () => void o((b) => dx(b, m.itemId, 1)),
                            children: ['売却 ', tr(m.itemId), ' G'],
                          }),
                        ],
                      },
                      m.itemId
                    )
                  ),
        }),
        g.jsx('footer', {
          className: Ht.foot,
          children: g.jsx('button', {
            type: 'button',
            className: Ht.back,
            onClick: () => a('/town'),
            children: '拠点へ戻る',
          }),
        }),
      ],
    });
  },
  hx = '_layout_1xkiw_1',
  px = '_head_1xkiw_12',
  yx = '_title_1xkiw_17',
  gx = '_subtitle_1xkiw_24',
  vx = '_body_1xkiw_30',
  _x = '_menu_1xkiw_34',
  bx = '_loading_1xkiw_40',
  Sx = '_warn_1xkiw_45',
  xx = '_danger_1xkiw_52',
  Ex = '_dialog_1xkiw_67',
  Tx = '_dialogTitle_1xkiw_77',
  Nx = '_field_1xkiw_82',
  Ax = '_note_1xkiw_96',
  Cx = '_dialogActions_1xkiw_102',
  Mx = '_primary_1xkiw_107',
  Rx = '_sub_1xkiw_24',
  jx = '_foot_1xkiw_132',
  qt = {
    layout: hx,
    head: px,
    title: yx,
    subtitle: gx,
    body: vx,
    menu: _x,
    loading: bx,
    warn: Sx,
    danger: xx,
    dialog: Ex,
    dialogTitle: Tx,
    field: Nx,
    note: Ax,
    dialogActions: Cx,
    primary: Mx,
    sub: Rx,
    foot: jx,
  },
  zx = '_card_3vsn6_1',
  Ox = '_corrupted_3vsn6_14',
  Dx = '_corruptedText_3vsn6_19',
  kx = '_corruptedNote_3vsn6_25',
  wx = '_guildName_3vsn6_31',
  Ux = '_meta_3vsn6_36',
  $l = {
    card: zx,
    corrupted: Ox,
    corruptedText: Dx,
    corruptedNote: kx,
    guildName: wx,
    meta: Ux,
    continue: '_continue_3vsn6_56',
  },
  Bx = (a) => {
    if (!a) return '-';
    const c = new Date(a),
      o = (s) => String(s).padStart(2, '0');
    return `${c.getFullYear()}/${o(c.getMonth() + 1)}/${o(c.getDate())} ${o(c.getHours())}:${o(c.getMinutes())}`;
  },
  Lx = ({ meta: a, onContinue: c }) =>
    a.corrupted
      ? g.jsxs('div', {
          className: `${$l.card} ${$l.corrupted}`,
          children: [
            g.jsx('div', { className: $l.corruptedText, children: 'セーブデータが破損しています' }),
            g.jsx('p', {
              className: $l.corruptedNote,
              children: '「最初から」で新しく始められます。',
            }),
          ],
        })
      : g.jsxs('div', {
          className: $l.card,
          children: [
            g.jsx('div', { className: $l.guildName, children: a.guildName }),
            g.jsxs('dl', {
              className: $l.meta,
              children: [
                g.jsxs('div', {
                  children: [
                    g.jsx('dt', { children: '最高到達階' }),
                    g.jsx('dd', {
                      children: a.deepestReached > 0 ? `${a.deepestReached}F` : '未踏破',
                    }),
                  ],
                }),
                g.jsxs('div', {
                  children: [
                    g.jsx('dt', { children: '団員' }),
                    g.jsxs('dd', { children: [a.memberCount, '人'] }),
                  ],
                }),
                g.jsxs('div', {
                  children: [
                    g.jsx('dt', { children: '最終セーブ' }),
                    g.jsx('dd', { children: Bx(a.savedAt) }),
                  ],
                }),
              ],
            }),
            g.jsx('button', {
              type: 'button',
              className: $l.continue,
              onClick: c,
              children: 'つづきから',
            }),
          ],
        }),
  Hx = () => {
    const a = Sl(),
      { startNewGame: c, continueGame: o } = bn(),
      [s, r] = N.useState(null),
      [d, p] = N.useState(!0),
      [_, y] = N.useState('menu'),
      [m, b] = N.useState(''),
      [v, E] = N.useState(!1);
    N.useEffect(() => {
      (async () => (r(await Sb()), p(!1)))();
    }, []);
    const k = s !== null && !s.corrupted,
      j = N.useCallback(async () => {
        E(!0);
        const H = await o();
        (E(!1), H.ok && a('/town'));
      }, [o, a]),
      w = N.useCallback(() => {
        (b(''), y(k ? 'confirm' : 'guildName'));
      }, [k]),
      q = N.useCallback(async () => {
        const H = m.trim() || 'ななしのギルド';
        (E(!0), await c(H), E(!1), a('/town'));
      }, [m, c, a]);
    return g.jsxs('div', {
      className: qt.layout,
      children: [
        g.jsxs('header', {
          className: qt.head,
          children: [
            g.jsx('h1', { className: qt.title, children: '世界樹ライク' }),
            g.jsx('p', { className: qt.subtitle, children: '無限タワー探索 RPG' }),
          ],
        }),
        g.jsx('main', {
          className: qt.body,
          children: d
            ? g.jsx('p', { className: qt.loading, children: '読み込み中...' })
            : _ === 'guildName'
              ? g.jsxs('div', {
                  className: qt.dialog,
                  children: [
                    g.jsx('h2', { className: qt.dialogTitle, children: '新しいギルド' }),
                    g.jsxs('label', {
                      className: qt.field,
                      children: [
                        g.jsx('span', { children: 'ギルド名' }),
                        g.jsx('input', {
                          type: 'text',
                          value: m,
                          maxLength: 16,
                          placeholder: 'ななしのギルド',
                          onChange: (H) => b(H.target.value),
                          autoFocus: !0,
                        }),
                      ],
                    }),
                    g.jsx('p', {
                      className: qt.note,
                      children:
                        '冒険者はまだいません。開始後、ギルドメニューで仲間を作成してください。',
                    }),
                    g.jsxs('div', {
                      className: qt.dialogActions,
                      children: [
                        g.jsx('button', {
                          type: 'button',
                          className: qt.primary,
                          disabled: v,
                          onClick: q,
                          children: 'はじめる',
                        }),
                        g.jsx('button', {
                          type: 'button',
                          className: qt.sub,
                          disabled: v,
                          onClick: () => y('menu'),
                          children: 'もどる',
                        }),
                      ],
                    }),
                  ],
                })
              : _ === 'confirm'
                ? g.jsxs('div', {
                    className: qt.dialog,
                    children: [
                      g.jsx('h2', { className: qt.dialogTitle, children: '最初から始めますか？' }),
                      g.jsxs('p', {
                        className: qt.warn,
                        children: [
                          '現在のセーブデータ「',
                          s == null ? void 0 : s.guildName,
                          '」は上書きされ、元に戻せません。',
                        ],
                      }),
                      g.jsxs('div', {
                        className: qt.dialogActions,
                        children: [
                          g.jsx('button', {
                            type: 'button',
                            className: qt.danger,
                            disabled: v,
                            onClick: () => y('guildName'),
                            children: 'データを消して始める',
                          }),
                          g.jsx('button', {
                            type: 'button',
                            className: qt.sub,
                            disabled: v,
                            onClick: () => y('menu'),
                            children: 'もどる',
                          }),
                        ],
                      }),
                    ],
                  })
                : g.jsxs('div', {
                    className: qt.menu,
                    children: [
                      s !== null && g.jsx(Lx, { meta: s, onContinue: () => void j() }),
                      g.jsx('button', {
                        type: 'button',
                        className: k ? qt.sub : qt.primary,
                        onClick: w,
                        children: '最初から',
                      }),
                    ],
                  }),
        }),
        g.jsxs('footer', { className: qt.foot, children: ['v', '0.1.10'] }),
      ],
    });
  },
  qx = '_layout_1wdo2_1',
  Gx = '_head_1wdo2_12',
  Yx = '_guildName_1wdo2_16',
  Xx = '_stats_1wdo2_21',
  Vx = '_hint_1wdo2_40',
  Qx = '_menu_1wdo2_50',
  Zx = '_foot_1wdo2_57',
  Kx = '_exit_1wdo2_61',
  Jl = { layout: qx, head: Gx, guildName: Yx, stats: Xx, hint: Vx, menu: Qx, foot: Zx, exit: Kx },
  $x = '_button_1tp4a_1',
  Jx = '_primary_1tp4a_26',
  Ix = '_label_1tp4a_32',
  Wx = '_description_1tp4a_37',
  Qi = { button: $x, primary: Jx, label: Ix, description: Wx },
  hu = ({ label: a, description: c, variant: o = 'default', disabled: s = !1, onClick: r }) =>
    g.jsxs('button', {
      type: 'button',
      className: `${Qi.button} ${o === 'primary' ? Qi.primary : ''}`,
      disabled: s,
      onClick: r,
      children: [
        g.jsx('span', { className: Qi.label, children: a }),
        c ? g.jsx('span', { className: Qi.description, children: c }) : null,
      ],
    }),
  Fx = () => {
    const a = Sl(),
      { save: c, exitToTitle: o, applyAndPersist: s } = bn();
    if (!c) return g.jsx(bl, { to: '/title', replace: !0 });
    const { guild: r, towerState: d, diveState: p } = c,
      _ = r.members.length > 0,
      y = () => {
        (o(), a('/title'));
      },
      m = async () => {
        (p || (await s((b) => G_(b, 1))), a('/dungeon'));
      };
    return g.jsxs('div', {
      className: Jl.layout,
      children: [
        g.jsxs('header', {
          className: Jl.head,
          children: [
            g.jsx('div', { className: Jl.guildName, children: r.name }),
            g.jsxs('dl', {
              className: Jl.stats,
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
        !_ &&
          g.jsx('p', {
            className: Jl.hint,
            children:
              'まずは「ギルド管理」で冒険者を作成してください。団員がいないとダイブできません。',
          }),
        g.jsxs('main', {
          className: Jl.menu,
          children: [
            g.jsx(hu, {
              label: p ? '潜行を再開' : 'ダイブ開始',
              description: _
                ? p
                  ? `${p.depth}F から再開`
                  : '第1階からタワーへ潜る'
                : '団員が必要です',
              variant: 'primary',
              disabled: !_,
              onClick: () => void m(),
            }),
            g.jsx(hu, {
              label: 'ギルド管理',
              description: '編成・キャラ作成',
              onClick: () => a('/guild'),
            }),
            g.jsx(hu, {
              label: 'ショップ',
              description: '装備・アイテム売買',
              onClick: () => a('/shop'),
            }),
            g.jsx(hu, { label: '鍛冶屋', description: '武器強化（Phase 4）', disabled: !0 }),
            g.jsx(hu, {
              label: '図鑑 / 記録',
              description: '到達記録・図鑑（Phase 4-5）',
              disabled: !0,
            }),
          ],
        }),
        g.jsx('footer', {
          className: Jl.foot,
          children: g.jsx('button', {
            type: 'button',
            className: Jl.exit,
            onClick: y,
            children: 'タイトルへ戻る',
          }),
        }),
      ],
    });
  };
function Px() {
  return g.jsxs(Uv, {
    children: [
      g.jsx(We, { path: '/', element: g.jsx(bl, { to: '/title', replace: !0 }) }),
      g.jsx(We, { path: '/title', element: g.jsx(Hx, {}) }),
      g.jsx(We, { path: '/town', element: g.jsx(Fx, {}) }),
      g.jsx(We, { path: '/guild', element: g.jsx(ZS, {}) }),
      g.jsx(We, { path: '/guild/char/:id', element: g.jsx(Y2, {}) }),
      g.jsx(We, { path: '/shop', element: g.jsx(mx, {}) }),
      g.jsx(We, { path: '/dungeon', element: g.jsx(SS, {}) }),
      g.jsx(We, { path: '/battle', element: g.jsx(Nb, {}) }),
      g.jsx(We, { path: '*', element: g.jsx(X2, {}) }),
    ],
  });
}
const tE = {
    races: Ve,
    classes: ue,
    titles: oa,
    skills: rr,
    enemies: pa,
    items: se,
    equipment: Ce,
  },
  eE = /^[a-z]+_[a-z0-9_]+$/;
function vn(a, c, o) {
  for (const s of c)
    eE.test(s) || o.push(`[${a}] ID 命名規約違反: "${s}"（期待: <domain>_<name>）`);
}
function Yo(a, c, o, s) {
  const r = new Set(c.skills.map((d) => d.skillId));
  for (const d of c.skills) {
    o.has(d.skillId) || s.push(`[${a}] 未定義スキルを参照: "${d.skillId}"`);
    for (const p of d.requires ?? [])
      r.has(p.skillId) ||
        s.push(`[${a}] スキル "${d.skillId}" の前提 "${p.skillId}" が同ツリーに存在しない`);
  }
}
function lE() {
  const a = [],
    { races: c, classes: o, titles: s, skills: r, enemies: d, items: p, equipment: _ } = tE;
  (vn('races', Object.keys(c), a),
    vn('classes', Object.keys(o), a),
    vn('titles', Object.keys(s), a),
    vn('skills', Object.keys(r), a),
    vn('enemies', Object.keys(d), a),
    vn('items', Object.keys(p), a),
    vn('equipment', Object.keys(_), a));
  const y = (E, k) => {
    for (const [j, w] of Object.entries(k))
      j !== w.id && a.push(`[${E}] キー "${j}" と id "${w.id}" が不一致`);
  };
  (y('races', c),
    y('classes', o),
    y('titles', s),
    y('skills', r),
    y('enemies', d),
    y('items', p),
    y('equipment', _));
  const m = new Set(Object.keys(r)),
    b = new Set(Object.keys(o)),
    v = new Set(Object.keys(s));
  for (const E of Object.values(c))
    (b.has(E.defaultClassId) ||
      a.push(`[races] "${E.id}" の defaultClassId "${E.defaultClassId}" が未定義`),
      Yo(`races/${E.id}`, E.unionSkillTree, m, a));
  for (const E of Object.values(o)) {
    Yo(`classes/${E.id}`, E.skillTree, m, a);
    for (const k of E.titleOptions) {
      if (!v.has(k)) {
        a.push(`[classes] "${E.id}" の称号 "${k}" が未定義`);
        continue;
      }
      s[k].parentClassId !== E.id &&
        a.push(`[classes] 称号 "${k}" の parentClassId が "${E.id}" と不一致`);
    }
  }
  for (const E of Object.values(s))
    (b.has(E.parentClassId) ||
      a.push(`[titles] "${E.id}" の parentClassId "${E.parentClassId}" が未定義`),
      Yo(`titles/${E.id}`, E.skillTree, m, a));
  for (const E of Object.values(_))
    (E.slot === 'weapon' &&
      !E.weaponType &&
      a.push(`[equipment] "${E.id}" は weapon だが weaponType が未設定`),
      E.slot === 'armor' &&
        !E.armorType &&
        a.push(`[equipment] "${E.id}" は armor だが armorType が未設定`),
      (E.buyPrice < 0 || E.tier < 0) && a.push(`[equipment] "${E.id}" の buyPrice/tier が負`));
  for (const E of Object.values(p))
    (E.buyPrice < 0 && a.push(`[items] "${E.id}" の buyPrice が負`),
      E.category === 'consumable' &&
        !E.useContext &&
        !E.effects &&
        a.push(`[items] 消費アイテム "${E.id}" に useContext も effects も無い（使用不能）`));
  for (const E of Object.values(d))
    for (const k of E.drops ?? [])
      (k.itemId in p || a.push(`[enemies] "${E.id}" のドロップ "${k.itemId}" が未定義アイテム`),
        (k.rate < 0 || k.rate > 1) &&
          a.push(`[enemies] "${E.id}" のドロップ "${k.itemId}" の rate が 0..1 外`));
  for (const [E, k] of Object.entries(ly)) {
    E in p || a.push(`[SELL_UNLOCKS] キー素材 "${E}" が未定義`);
    for (const j of k) j in _ || a.push(`[SELL_UNLOCKS] 解放先装備 "${j}" が未定義`);
  }
  return { ok: a.length === 0, errors: a };
}
const up = lE();
up.ok || console.error('マスターデータ検証エラー:', up.errors);
const ny = document.getElementById('root');
if (!ny) throw new Error('Failed to find #root element');
Lg.createRoot(ny).render(
  g.jsx(i1, { basename: '/sekaiju-like-game', children: g.jsx(Tb, { children: g.jsx(Px, {}) }) })
);
