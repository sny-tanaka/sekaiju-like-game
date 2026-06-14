var zg = Object.defineProperty;
var Og = (a, i, o) =>
  i in a ? zg(a, i, { enumerable: !0, configurable: !0, writable: !0, value: o }) : (a[i] = o);
var Ro = (a, i, o) => Og(a, typeof i != 'symbol' ? i + '' : i, o);
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
var jo = { exports: {} },
  fu = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Ah;
function Dg() {
  if (Ah) return fu;
  Ah = 1;
  var a = Symbol.for('react.transitional.element'),
    i = Symbol.for('react.fragment');
  function o(s, r, d) {
    var h = null;
    if ((d !== void 0 && (h = '' + d), r.key !== void 0 && (h = '' + r.key), 'key' in r)) {
      d = {};
      for (var _ in r) _ !== 'key' && (d[_] = r[_]);
    } else d = r;
    return ((r = d.ref), { $$typeof: a, type: s, key: h, ref: r !== void 0 ? r : null, props: d });
  }
  return ((fu.Fragment = i), (fu.jsx = o), (fu.jsxs = o), fu);
}
var Mh;
function kg() {
  return (Mh || ((Mh = 1), (jo.exports = Dg())), jo.exports);
}
var y = kg(),
  zo = { exports: {} },
  du = {},
  Oo = { exports: {} },
  Do = {};
/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Ch;
function wg() {
  return (
    Ch ||
      ((Ch = 1),
      (function (a) {
        function i(L, J) {
          var it = L.length;
          L.push(J);
          t: for (; 0 < it; ) {
            var St = (it - 1) >>> 1,
              Et = L[St];
            if (0 < r(Et, J)) ((L[St] = J), (L[it] = Et), (it = St));
            else break t;
          }
        }
        function o(L) {
          return L.length === 0 ? null : L[0];
        }
        function s(L) {
          if (L.length === 0) return null;
          var J = L[0],
            it = L.pop();
          if (it !== J) {
            L[0] = it;
            t: for (var St = 0, Et = L.length, v = Et >>> 1; St < v; ) {
              var w = 2 * (St + 1) - 1,
                Q = L[w],
                $ = w + 1,
                lt = L[$];
              if (0 > r(Q, it))
                $ < Et && 0 > r(lt, Q)
                  ? ((L[St] = lt), (L[$] = it), (St = $))
                  : ((L[St] = Q), (L[w] = it), (St = w));
              else if ($ < Et && 0 > r(lt, it)) ((L[St] = lt), (L[$] = it), (St = $));
              else break t;
            }
          }
          return J;
        }
        function r(L, J) {
          var it = L.sortIndex - J.sortIndex;
          return it !== 0 ? it : L.id - J.id;
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
          b = 1,
          S = null,
          N = 3,
          E = !1,
          A = !1,
          k = !1,
          R = !1,
          G = typeof setTimeout == 'function' ? setTimeout : null,
          I = typeof clearTimeout == 'function' ? clearTimeout : null,
          V = typeof setImmediate < 'u' ? setImmediate : null;
        function D(L) {
          for (var J = o(m); J !== null; ) {
            if (J.callback === null) s(m);
            else if (J.startTime <= L) (s(m), (J.sortIndex = J.expirationTime), i(g, J));
            else break;
            J = o(m);
          }
        }
        function H(L) {
          if (((k = !1), D(L), !A))
            if (o(g) !== null) ((A = !0), K || ((K = !0), st()));
            else {
              var J = o(m);
              J !== null && qt(H, J.startTime - L);
            }
        }
        var K = !1,
          Z = -1,
          q = 5,
          F = -1;
        function et() {
          return R ? !0 : !(a.unstable_now() - F < q);
        }
        function ct() {
          if (((R = !1), K)) {
            var L = a.unstable_now();
            F = L;
            var J = !0;
            try {
              t: {
                ((A = !1), k && ((k = !1), I(Z), (Z = -1)), (E = !0));
                var it = N;
                try {
                  e: {
                    for (D(L), S = o(g); S !== null && !(S.expirationTime > L && et()); ) {
                      var St = S.callback;
                      if (typeof St == 'function') {
                        ((S.callback = null), (N = S.priorityLevel));
                        var Et = St(S.expirationTime <= L);
                        if (((L = a.unstable_now()), typeof Et == 'function')) {
                          ((S.callback = Et), D(L), (J = !0));
                          break e;
                        }
                        (S === o(g) && s(g), D(L));
                      } else s(g);
                      S = o(g);
                    }
                    if (S !== null) J = !0;
                    else {
                      var v = o(m);
                      (v !== null && qt(H, v.startTime - L), (J = !1));
                    }
                  }
                  break t;
                } finally {
                  ((S = null), (N = it), (E = !1));
                }
                J = void 0;
              }
            } finally {
              J ? st() : (K = !1);
            }
          }
        }
        var st;
        if (typeof V == 'function')
          st = function () {
            V(ct);
          };
        else if (typeof MessageChannel < 'u') {
          var Pt = new MessageChannel(),
            Ht = Pt.port2;
          ((Pt.port1.onmessage = ct),
            (st = function () {
              Ht.postMessage(null);
            }));
        } else
          st = function () {
            G(ct, 0);
          };
        function qt(L, J) {
          Z = G(function () {
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
              : (q = 0 < L ? Math.floor(1e3 / L) : 5);
          }),
          (a.unstable_getCurrentPriorityLevel = function () {
            return N;
          }),
          (a.unstable_next = function (L) {
            switch (N) {
              case 1:
              case 2:
              case 3:
                var J = 3;
                break;
              default:
                J = N;
            }
            var it = N;
            N = J;
            try {
              return L();
            } finally {
              N = it;
            }
          }),
          (a.unstable_requestPaint = function () {
            R = !0;
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
            var it = N;
            N = L;
            try {
              return J();
            } finally {
              N = it;
            }
          }),
          (a.unstable_scheduleCallback = function (L, J, it) {
            var St = a.unstable_now();
            switch (
              (typeof it == 'object' && it !== null
                ? ((it = it.delay), (it = typeof it == 'number' && 0 < it ? St + it : St))
                : (it = St),
              L)
            ) {
              case 1:
                var Et = -1;
                break;
              case 2:
                Et = 250;
                break;
              case 5:
                Et = 1073741823;
                break;
              case 4:
                Et = 1e4;
                break;
              default:
                Et = 5e3;
            }
            return (
              (Et = it + Et),
              (L = {
                id: b++,
                callback: J,
                priorityLevel: L,
                startTime: it,
                expirationTime: Et,
                sortIndex: -1,
              }),
              it > St
                ? ((L.sortIndex = it),
                  i(m, L),
                  o(g) === null && L === o(m) && (k ? (I(Z), (Z = -1)) : (k = !0), qt(H, it - St)))
                : ((L.sortIndex = Et), i(g, L), A || E || ((A = !0), K || ((K = !0), st()))),
              L
            );
          }),
          (a.unstable_shouldYield = et),
          (a.unstable_wrapCallback = function (L) {
            var J = N;
            return function () {
              var it = N;
              N = J;
              try {
                return L.apply(this, arguments);
              } finally {
                N = it;
              }
            };
          }));
      })(Do)),
    Do
  );
}
var Rh;
function Bg() {
  return (Rh || ((Rh = 1), (Oo.exports = wg())), Oo.exports);
}
var ko = { exports: {} },
  ot = {};
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var jh;
function Ug() {
  if (jh) return ot;
  jh = 1;
  var a = Symbol.for('react.transitional.element'),
    i = Symbol.for('react.portal'),
    o = Symbol.for('react.fragment'),
    s = Symbol.for('react.strict_mode'),
    r = Symbol.for('react.profiler'),
    d = Symbol.for('react.consumer'),
    h = Symbol.for('react.context'),
    _ = Symbol.for('react.forward_ref'),
    g = Symbol.for('react.suspense'),
    m = Symbol.for('react.memo'),
    b = Symbol.for('react.lazy'),
    S = Symbol.for('react.activity'),
    N = Symbol.iterator;
  function E(v) {
    return v === null || typeof v != 'object'
      ? null
      : ((v = (N && v[N]) || v['@@iterator']), typeof v == 'function' ? v : null);
  }
  var A = {
      isMounted: function () {
        return !1;
      },
      enqueueForceUpdate: function () {},
      enqueueReplaceState: function () {},
      enqueueSetState: function () {},
    },
    k = Object.assign,
    R = {};
  function G(v, w, Q) {
    ((this.props = v), (this.context = w), (this.refs = R), (this.updater = Q || A));
  }
  ((G.prototype.isReactComponent = {}),
    (G.prototype.setState = function (v, w) {
      if (typeof v != 'object' && typeof v != 'function' && v != null)
        throw Error(
          'takes an object of state variables to update or a function which returns an object of state variables.'
        );
      this.updater.enqueueSetState(this, v, w, 'setState');
    }),
    (G.prototype.forceUpdate = function (v) {
      this.updater.enqueueForceUpdate(this, v, 'forceUpdate');
    }));
  function I() {}
  I.prototype = G.prototype;
  function V(v, w, Q) {
    ((this.props = v), (this.context = w), (this.refs = R), (this.updater = Q || A));
  }
  var D = (V.prototype = new I());
  ((D.constructor = V), k(D, G.prototype), (D.isPureReactComponent = !0));
  var H = Array.isArray;
  function K() {}
  var Z = { H: null, A: null, T: null, S: null },
    q = Object.prototype.hasOwnProperty;
  function F(v, w, Q) {
    var $ = Q.ref;
    return { $$typeof: a, type: v, key: w, ref: $ !== void 0 ? $ : null, props: Q };
  }
  function et(v, w) {
    return F(v.type, w, v.props);
  }
  function ct(v) {
    return typeof v == 'object' && v !== null && v.$$typeof === a;
  }
  function st(v) {
    var w = { '=': '=0', ':': '=2' };
    return (
      '$' +
      v.replace(/[=:]/g, function (Q) {
        return w[Q];
      })
    );
  }
  var Pt = /\/+/g;
  function Ht(v, w) {
    return typeof v == 'object' && v !== null && v.key != null ? st('' + v.key) : w.toString(36);
  }
  function qt(v) {
    switch (v.status) {
      case 'fulfilled':
        return v.value;
      case 'rejected':
        throw v.reason;
      default:
        switch (
          (typeof v.status == 'string'
            ? v.then(K, K)
            : ((v.status = 'pending'),
              v.then(
                function (w) {
                  v.status === 'pending' && ((v.status = 'fulfilled'), (v.value = w));
                },
                function (w) {
                  v.status === 'pending' && ((v.status = 'rejected'), (v.reason = w));
                }
              )),
          v.status)
        ) {
          case 'fulfilled':
            return v.value;
          case 'rejected':
            throw v.reason;
        }
    }
    throw v;
  }
  function L(v, w, Q, $, lt) {
    var rt = typeof v;
    (rt === 'undefined' || rt === 'boolean') && (v = null);
    var Tt = !1;
    if (v === null) Tt = !0;
    else
      switch (rt) {
        case 'bigint':
        case 'string':
        case 'number':
          Tt = !0;
          break;
        case 'object':
          switch (v.$$typeof) {
            case a:
            case i:
              Tt = !0;
              break;
            case b:
              return ((Tt = v._init), L(Tt(v._payload), w, Q, $, lt));
          }
      }
    if (Tt)
      return (
        (lt = lt(v)),
        (Tt = $ === '' ? '.' + Ht(v, 0) : $),
        H(lt)
          ? ((Q = ''),
            Tt != null && (Q = Tt.replace(Pt, '$&/') + '/'),
            L(lt, w, Q, '', function (va) {
              return va;
            }))
          : lt != null &&
            (ct(lt) &&
              (lt = et(
                lt,
                Q +
                  (lt.key == null || (v && v.key === lt.key)
                    ? ''
                    : ('' + lt.key).replace(Pt, '$&/') + '/') +
                  Tt
              )),
            w.push(lt)),
        1
      );
    Tt = 0;
    var ce = $ === '' ? '.' : $ + ':';
    if (H(v))
      for (var Xt = 0; Xt < v.length; Xt++)
        (($ = v[Xt]), (rt = ce + Ht($, Xt)), (Tt += L($, w, Q, rt, lt)));
    else if (((Xt = E(v)), typeof Xt == 'function'))
      for (v = Xt.call(v), Xt = 0; !($ = v.next()).done; )
        (($ = $.value), (rt = ce + Ht($, Xt++)), (Tt += L($, w, Q, rt, lt)));
    else if (rt === 'object') {
      if (typeof v.then == 'function') return L(qt(v), w, Q, $, lt);
      throw (
        (w = String(v)),
        Error(
          'Objects are not valid as a React child (found: ' +
            (w === '[object Object]' ? 'object with keys {' + Object.keys(v).join(', ') + '}' : w) +
            '). If you meant to render a collection of children, use an array instead.'
        )
      );
    }
    return Tt;
  }
  function J(v, w, Q) {
    if (v == null) return v;
    var $ = [],
      lt = 0;
    return (
      L(v, $, '', '', function (rt) {
        return w.call(Q, rt, lt++);
      }),
      $
    );
  }
  function it(v) {
    if (v._status === -1) {
      var w = v._result;
      ((w = w()),
        w.then(
          function (Q) {
            (v._status === 0 || v._status === -1) && ((v._status = 1), (v._result = Q));
          },
          function (Q) {
            (v._status === 0 || v._status === -1) && ((v._status = 2), (v._result = Q));
          }
        ),
        v._status === -1 && ((v._status = 0), (v._result = w)));
    }
    if (v._status === 1) return v._result.default;
    throw v._result;
  }
  var St =
      typeof reportError == 'function'
        ? reportError
        : function (v) {
            if (typeof window == 'object' && typeof window.ErrorEvent == 'function') {
              var w = new window.ErrorEvent('error', {
                bubbles: !0,
                cancelable: !0,
                message:
                  typeof v == 'object' && v !== null && typeof v.message == 'string'
                    ? String(v.message)
                    : String(v),
                error: v,
              });
              if (!window.dispatchEvent(w)) return;
            } else if (typeof process == 'object' && typeof process.emit == 'function') {
              process.emit('uncaughtException', v);
              return;
            }
            console.error(v);
          },
    Et = {
      map: J,
      forEach: function (v, w, Q) {
        J(
          v,
          function () {
            w.apply(this, arguments);
          },
          Q
        );
      },
      count: function (v) {
        var w = 0;
        return (
          J(v, function () {
            w++;
          }),
          w
        );
      },
      toArray: function (v) {
        return (
          J(v, function (w) {
            return w;
          }) || []
        );
      },
      only: function (v) {
        if (!ct(v))
          throw Error('React.Children.only expected to receive a single React element child.');
        return v;
      },
    };
  return (
    (ot.Activity = S),
    (ot.Children = Et),
    (ot.Component = G),
    (ot.Fragment = o),
    (ot.Profiler = r),
    (ot.PureComponent = V),
    (ot.StrictMode = s),
    (ot.Suspense = g),
    (ot.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = Z),
    (ot.__COMPILER_RUNTIME = {
      __proto__: null,
      c: function (v) {
        return Z.H.useMemoCache(v);
      },
    }),
    (ot.cache = function (v) {
      return function () {
        return v.apply(null, arguments);
      };
    }),
    (ot.cacheSignal = function () {
      return null;
    }),
    (ot.cloneElement = function (v, w, Q) {
      if (v == null) throw Error('The argument must be a React element, but you passed ' + v + '.');
      var $ = k({}, v.props),
        lt = v.key;
      if (w != null)
        for (rt in (w.key !== void 0 && (lt = '' + w.key), w))
          !q.call(w, rt) ||
            rt === 'key' ||
            rt === '__self' ||
            rt === '__source' ||
            (rt === 'ref' && w.ref === void 0) ||
            ($[rt] = w[rt]);
      var rt = arguments.length - 2;
      if (rt === 1) $.children = Q;
      else if (1 < rt) {
        for (var Tt = Array(rt), ce = 0; ce < rt; ce++) Tt[ce] = arguments[ce + 2];
        $.children = Tt;
      }
      return F(v.type, lt, $);
    }),
    (ot.createContext = function (v) {
      return (
        (v = {
          $$typeof: h,
          _currentValue: v,
          _currentValue2: v,
          _threadCount: 0,
          Provider: null,
          Consumer: null,
        }),
        (v.Provider = v),
        (v.Consumer = { $$typeof: d, _context: v }),
        v
      );
    }),
    (ot.createElement = function (v, w, Q) {
      var $,
        lt = {},
        rt = null;
      if (w != null)
        for ($ in (w.key !== void 0 && (rt = '' + w.key), w))
          q.call(w, $) && $ !== 'key' && $ !== '__self' && $ !== '__source' && (lt[$] = w[$]);
      var Tt = arguments.length - 2;
      if (Tt === 1) lt.children = Q;
      else if (1 < Tt) {
        for (var ce = Array(Tt), Xt = 0; Xt < Tt; Xt++) ce[Xt] = arguments[Xt + 2];
        lt.children = ce;
      }
      if (v && v.defaultProps)
        for ($ in ((Tt = v.defaultProps), Tt)) lt[$] === void 0 && (lt[$] = Tt[$]);
      return F(v, rt, lt);
    }),
    (ot.createRef = function () {
      return { current: null };
    }),
    (ot.forwardRef = function (v) {
      return { $$typeof: _, render: v };
    }),
    (ot.isValidElement = ct),
    (ot.lazy = function (v) {
      return { $$typeof: b, _payload: { _status: -1, _result: v }, _init: it };
    }),
    (ot.memo = function (v, w) {
      return { $$typeof: m, type: v, compare: w === void 0 ? null : w };
    }),
    (ot.startTransition = function (v) {
      var w = Z.T,
        Q = {};
      Z.T = Q;
      try {
        var $ = v(),
          lt = Z.S;
        (lt !== null && lt(Q, $),
          typeof $ == 'object' && $ !== null && typeof $.then == 'function' && $.then(K, St));
      } catch (rt) {
        St(rt);
      } finally {
        (w !== null && Q.types !== null && (w.types = Q.types), (Z.T = w));
      }
    }),
    (ot.unstable_useCacheRefresh = function () {
      return Z.H.useCacheRefresh();
    }),
    (ot.use = function (v) {
      return Z.H.use(v);
    }),
    (ot.useActionState = function (v, w, Q) {
      return Z.H.useActionState(v, w, Q);
    }),
    (ot.useCallback = function (v, w) {
      return Z.H.useCallback(v, w);
    }),
    (ot.useContext = function (v) {
      return Z.H.useContext(v);
    }),
    (ot.useDebugValue = function () {}),
    (ot.useDeferredValue = function (v, w) {
      return Z.H.useDeferredValue(v, w);
    }),
    (ot.useEffect = function (v, w) {
      return Z.H.useEffect(v, w);
    }),
    (ot.useEffectEvent = function (v) {
      return Z.H.useEffectEvent(v);
    }),
    (ot.useId = function () {
      return Z.H.useId();
    }),
    (ot.useImperativeHandle = function (v, w, Q) {
      return Z.H.useImperativeHandle(v, w, Q);
    }),
    (ot.useInsertionEffect = function (v, w) {
      return Z.H.useInsertionEffect(v, w);
    }),
    (ot.useLayoutEffect = function (v, w) {
      return Z.H.useLayoutEffect(v, w);
    }),
    (ot.useMemo = function (v, w) {
      return Z.H.useMemo(v, w);
    }),
    (ot.useOptimistic = function (v, w) {
      return Z.H.useOptimistic(v, w);
    }),
    (ot.useReducer = function (v, w, Q) {
      return Z.H.useReducer(v, w, Q);
    }),
    (ot.useRef = function (v) {
      return Z.H.useRef(v);
    }),
    (ot.useState = function (v) {
      return Z.H.useState(v);
    }),
    (ot.useSyncExternalStore = function (v, w, Q) {
      return Z.H.useSyncExternalStore(v, w, Q);
    }),
    (ot.useTransition = function () {
      return Z.H.useTransition();
    }),
    (ot.version = '19.2.5'),
    ot
  );
}
var zh;
function ir() {
  return (zh || ((zh = 1), (ko.exports = Ug())), ko.exports);
}
var wo = { exports: {} },
  ue = {};
/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Oh;
function Lg() {
  if (Oh) return ue;
  Oh = 1;
  var a = ir();
  function i(g) {
    var m = 'https://react.dev/errors/' + g;
    if (1 < arguments.length) {
      m += '?args[]=' + encodeURIComponent(arguments[1]);
      for (var b = 2; b < arguments.length; b++) m += '&args[]=' + encodeURIComponent(arguments[b]);
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
  function d(g, m, b) {
    var S = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: r,
      key: S == null ? null : '' + S,
      children: g,
      containerInfo: m,
      implementation: b,
    };
  }
  var h = a.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function _(g, m) {
    if (g === 'font') return '';
    if (typeof m == 'string') return m === 'use-credentials' ? m : '';
  }
  return (
    (ue.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = s),
    (ue.createPortal = function (g, m) {
      var b = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
      if (!m || (m.nodeType !== 1 && m.nodeType !== 9 && m.nodeType !== 11)) throw Error(i(299));
      return d(g, m, null, b);
    }),
    (ue.flushSync = function (g) {
      var m = h.T,
        b = s.p;
      try {
        if (((h.T = null), (s.p = 2), g)) return g();
      } finally {
        ((h.T = m), (s.p = b), s.d.f());
      }
    }),
    (ue.preconnect = function (g, m) {
      typeof g == 'string' &&
        (m
          ? ((m = m.crossOrigin),
            (m = typeof m == 'string' ? (m === 'use-credentials' ? m : '') : void 0))
          : (m = null),
        s.d.C(g, m));
    }),
    (ue.prefetchDNS = function (g) {
      typeof g == 'string' && s.d.D(g);
    }),
    (ue.preinit = function (g, m) {
      if (typeof g == 'string' && m && typeof m.as == 'string') {
        var b = m.as,
          S = _(b, m.crossOrigin),
          N = typeof m.integrity == 'string' ? m.integrity : void 0,
          E = typeof m.fetchPriority == 'string' ? m.fetchPriority : void 0;
        b === 'style'
          ? s.d.S(g, typeof m.precedence == 'string' ? m.precedence : void 0, {
              crossOrigin: S,
              integrity: N,
              fetchPriority: E,
            })
          : b === 'script' &&
            s.d.X(g, {
              crossOrigin: S,
              integrity: N,
              fetchPriority: E,
              nonce: typeof m.nonce == 'string' ? m.nonce : void 0,
            });
      }
    }),
    (ue.preinitModule = function (g, m) {
      if (typeof g == 'string')
        if (typeof m == 'object' && m !== null) {
          if (m.as == null || m.as === 'script') {
            var b = _(m.as, m.crossOrigin);
            s.d.M(g, {
              crossOrigin: b,
              integrity: typeof m.integrity == 'string' ? m.integrity : void 0,
              nonce: typeof m.nonce == 'string' ? m.nonce : void 0,
            });
          }
        } else m == null && s.d.M(g);
    }),
    (ue.preload = function (g, m) {
      if (typeof g == 'string' && typeof m == 'object' && m !== null && typeof m.as == 'string') {
        var b = m.as,
          S = _(b, m.crossOrigin);
        s.d.L(g, b, {
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
    (ue.preloadModule = function (g, m) {
      if (typeof g == 'string')
        if (m) {
          var b = _(m.as, m.crossOrigin);
          s.d.m(g, {
            as: typeof m.as == 'string' && m.as !== 'script' ? m.as : void 0,
            crossOrigin: b,
            integrity: typeof m.integrity == 'string' ? m.integrity : void 0,
          });
        } else s.d.m(g);
    }),
    (ue.requestFormReset = function (g) {
      s.d.r(g);
    }),
    (ue.unstable_batchedUpdates = function (g, m) {
      return g(m);
    }),
    (ue.useFormState = function (g, m, b) {
      return h.H.useFormState(g, m, b);
    }),
    (ue.useFormStatus = function () {
      return h.H.useHostTransitionStatus();
    }),
    (ue.version = '19.2.5'),
    ue
  );
}
var Dh;
function Hg() {
  if (Dh) return wo.exports;
  Dh = 1;
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
  return (a(), (wo.exports = Lg()), wo.exports);
}
/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var kh;
function qg() {
  if (kh) return du;
  kh = 1;
  var a = Bg(),
    i = ir(),
    o = Hg();
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
  function h(t) {
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
  function g(t) {
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
          if (c === l) return (g(u), t);
          if (c === n) return (g(u), e);
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
  var S = Object.assign,
    N = Symbol.for('react.element'),
    E = Symbol.for('react.transitional.element'),
    A = Symbol.for('react.portal'),
    k = Symbol.for('react.fragment'),
    R = Symbol.for('react.strict_mode'),
    G = Symbol.for('react.profiler'),
    I = Symbol.for('react.consumer'),
    V = Symbol.for('react.context'),
    D = Symbol.for('react.forward_ref'),
    H = Symbol.for('react.suspense'),
    K = Symbol.for('react.suspense_list'),
    Z = Symbol.for('react.memo'),
    q = Symbol.for('react.lazy'),
    F = Symbol.for('react.activity'),
    et = Symbol.for('react.memo_cache_sentinel'),
    ct = Symbol.iterator;
  function st(t) {
    return t === null || typeof t != 'object'
      ? null
      : ((t = (ct && t[ct]) || t['@@iterator']), typeof t == 'function' ? t : null);
  }
  var Pt = Symbol.for('react.client.reference');
  function Ht(t) {
    if (t == null) return null;
    if (typeof t == 'function') return t.$$typeof === Pt ? null : t.displayName || t.name || null;
    if (typeof t == 'string') return t;
    switch (t) {
      case k:
        return 'Fragment';
      case G:
        return 'Profiler';
      case R:
        return 'StrictMode';
      case H:
        return 'Suspense';
      case K:
        return 'SuspenseList';
      case F:
        return 'Activity';
    }
    if (typeof t == 'object')
      switch (t.$$typeof) {
        case A:
          return 'Portal';
        case V:
          return t.displayName || 'Context';
        case I:
          return (t._context.displayName || 'Context') + '.Consumer';
        case D:
          var e = t.render;
          return (
            (t = t.displayName),
            t ||
              ((t = e.displayName || e.name || ''),
              (t = t !== '' ? 'ForwardRef(' + t + ')' : 'ForwardRef')),
            t
          );
        case Z:
          return ((e = t.displayName || null), e !== null ? e : Ht(t.type) || 'Memo');
        case q:
          ((e = t._payload), (t = t._init));
          try {
            return Ht(t(e));
          } catch {}
      }
    return null;
  }
  var qt = Array.isArray,
    L = i.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
    J = o.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
    it = { pending: !1, data: null, method: null, action: null },
    St = [],
    Et = -1;
  function v(t) {
    return { current: t };
  }
  function w(t) {
    0 > Et || ((t.current = St[Et]), (St[Et] = null), Et--);
  }
  function Q(t, e) {
    (Et++, (St[Et] = t.current), (t.current = e));
  }
  var $ = v(null),
    lt = v(null),
    rt = v(null),
    Tt = v(null);
  function ce(t, e) {
    switch ((Q(rt, e), Q(lt, t), Q($, null), e.nodeType)) {
      case 9:
      case 11:
        t = (t = e.documentElement) && (t = t.namespaceURI) ? Jm(t) : 0;
        break;
      default:
        if (((t = e.tagName), (e = e.namespaceURI))) ((e = Jm(e)), (t = Im(e, t)));
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
    (w($), Q($, t));
  }
  function Xt() {
    (w($), w(lt), w(rt));
  }
  function va(t) {
    t.memoizedState !== null && Q(Tt, t);
    var e = $.current,
      l = Im(e, t.type);
    e !== l && (Q(lt, t), Q($, l));
  }
  function Au(t) {
    (lt.current === t && (w($), w(lt)), Tt.current === t && (w(Tt), (cu._currentValue = it)));
  }
  var rc, Tr;
  function Pl(t) {
    if (rc === void 0)
      try {
        throw Error();
      } catch (l) {
        var e = l.stack.trim().match(/\n( *(at )?)/);
        ((rc = (e && e[1]) || ''),
          (Tr =
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
      rc +
      t +
      Tr
    );
  }
  var fc = !1;
  function dc(t, e) {
    if (!t || fc) return '';
    fc = !0;
    var l = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var n = {
        DetermineComponentFrameRoot: function () {
          try {
            if (e) {
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
                  var O = B;
                }
                Reflect.construct(t, [], X);
              } else {
                try {
                  X.call();
                } catch (B) {
                  O = B;
                }
                t.call(X.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (B) {
                O = B;
              }
              (X = t()) && typeof X.catch == 'function' && X.catch(function () {});
            }
          } catch (B) {
            if (B && O && typeof B.stack == 'string') return [B.stack, O.stack];
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
      ((fc = !1), (Error.prepareStackTrace = l));
    }
    return (l = t ? t.displayName || t.name : '') ? Pl(l) : '';
  }
  function sy(t, e) {
    switch (t.tag) {
      case 26:
      case 27:
      case 5:
        return Pl(t.type);
      case 16:
        return Pl('Lazy');
      case 13:
        return t.child !== e && e !== null ? Pl('Suspense Fallback') : Pl('Suspense');
      case 19:
        return Pl('SuspenseList');
      case 0:
      case 15:
        return dc(t.type, !1);
      case 11:
        return dc(t.type.render, !1);
      case 1:
        return dc(t.type, !0);
      case 31:
        return Pl('Activity');
      default:
        return '';
    }
  }
  function Nr(t) {
    try {
      var e = '',
        l = null;
      do ((e += sy(t, l)), (l = t), (t = t.return));
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
  var mc = Object.prototype.hasOwnProperty,
    hc = a.unstable_scheduleCallback,
    pc = a.unstable_cancelCallback,
    oy = a.unstable_shouldYield,
    ry = a.unstable_requestPaint,
    ge = a.unstable_now,
    fy = a.unstable_getCurrentPriorityLevel,
    Ar = a.unstable_ImmediatePriority,
    Mr = a.unstable_UserBlockingPriority,
    Mu = a.unstable_NormalPriority,
    dy = a.unstable_LowPriority,
    Cr = a.unstable_IdlePriority,
    my = a.log,
    hy = a.unstable_setDisableYieldValue,
    _a = null,
    ve = null;
  function Tl(t) {
    if ((typeof my == 'function' && hy(t), ve && typeof ve.setStrictMode == 'function'))
      try {
        ve.setStrictMode(_a, t);
      } catch {}
  }
  var _e = Math.clz32 ? Math.clz32 : gy,
    py = Math.log,
    yy = Math.LN2;
  function gy(t) {
    return ((t >>>= 0), t === 0 ? 32 : (31 - ((py(t) / yy) | 0)) | 0);
  }
  var Cu = 256,
    Ru = 262144,
    ju = 4194304;
  function tn(t) {
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
  function zu(t, e, l) {
    var n = t.pendingLanes;
    if (n === 0) return 0;
    var u = 0,
      c = t.suspendedLanes,
      f = t.pingedLanes;
    t = t.warmLanes;
    var p = n & 134217727;
    return (
      p !== 0
        ? ((n = p & ~c),
          n !== 0
            ? (u = tn(n))
            : ((f &= p), f !== 0 ? (u = tn(f)) : l || ((l = p & ~t), l !== 0 && (u = tn(l)))))
        : ((p = n & ~c),
          p !== 0
            ? (u = tn(p))
            : f !== 0
              ? (u = tn(f))
              : l || ((l = n & ~t), l !== 0 && (u = tn(l)))),
      u === 0
        ? 0
        : e !== 0 &&
            e !== u &&
            (e & c) === 0 &&
            ((c = u & -u), (l = e & -e), c >= l || (c === 32 && (l & 4194048) !== 0))
          ? e
          : u
    );
  }
  function ba(t, e) {
    return (t.pendingLanes & ~(t.suspendedLanes & ~t.pingedLanes) & e) === 0;
  }
  function vy(t, e) {
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
  function Rr() {
    var t = ju;
    return ((ju <<= 1), (ju & 62914560) === 0 && (ju = 4194304), t);
  }
  function yc(t) {
    for (var e = [], l = 0; 31 > l; l++) e.push(t);
    return e;
  }
  function Sa(t, e) {
    ((t.pendingLanes |= e),
      e !== 268435456 && ((t.suspendedLanes = 0), (t.pingedLanes = 0), (t.warmLanes = 0)));
  }
  function _y(t, e, l, n, u, c) {
    var f = t.pendingLanes;
    ((t.pendingLanes = l),
      (t.suspendedLanes = 0),
      (t.pingedLanes = 0),
      (t.warmLanes = 0),
      (t.expiredLanes &= l),
      (t.entangledLanes &= l),
      (t.errorRecoveryDisabledLanes &= l),
      (t.shellSuspendCounter = 0));
    var p = t.entanglements,
      x = t.expirationTimes,
      z = t.hiddenUpdates;
    for (l = f & ~l; 0 < l; ) {
      var U = 31 - _e(l),
        X = 1 << U;
      ((p[U] = 0), (x[U] = -1));
      var O = z[U];
      if (O !== null)
        for (z[U] = null, U = 0; U < O.length; U++) {
          var B = O[U];
          B !== null && (B.lane &= -536870913);
        }
      l &= ~X;
    }
    (n !== 0 && jr(t, n, 0),
      c !== 0 && u === 0 && t.tag !== 0 && (t.suspendedLanes |= c & ~(f & ~e)));
  }
  function jr(t, e, l) {
    ((t.pendingLanes |= e), (t.suspendedLanes &= ~e));
    var n = 31 - _e(e);
    ((t.entangledLanes |= e),
      (t.entanglements[n] = t.entanglements[n] | 1073741824 | (l & 261930)));
  }
  function zr(t, e) {
    var l = (t.entangledLanes |= e);
    for (t = t.entanglements; l; ) {
      var n = 31 - _e(l),
        u = 1 << n;
      ((u & e) | (t[n] & e) && (t[n] |= e), (l &= ~u));
    }
  }
  function Or(t, e) {
    var l = e & -e;
    return ((l = (l & 42) !== 0 ? 1 : gc(l)), (l & (t.suspendedLanes | e)) !== 0 ? 0 : l);
  }
  function gc(t) {
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
  function vc(t) {
    return ((t &= -t), 2 < t ? (8 < t ? ((t & 134217727) !== 0 ? 32 : 268435456) : 8) : 2);
  }
  function Dr() {
    var t = J.p;
    return t !== 0 ? t : ((t = window.event), t === void 0 ? 32 : _h(t.type));
  }
  function kr(t, e) {
    var l = J.p;
    try {
      return ((J.p = t), e());
    } finally {
      J.p = l;
    }
  }
  var Nl = Math.random().toString(36).slice(2),
    te = '__reactFiber$' + Nl,
    re = '__reactProps$' + Nl,
    En = '__reactContainer$' + Nl,
    _c = '__reactEvents$' + Nl,
    by = '__reactListeners$' + Nl,
    Sy = '__reactHandles$' + Nl,
    wr = '__reactResources$' + Nl,
    xa = '__reactMarker$' + Nl;
  function bc(t) {
    (delete t[te], delete t[re], delete t[_c], delete t[by], delete t[Sy]);
  }
  function Tn(t) {
    var e = t[te];
    if (e) return e;
    for (var l = t.parentNode; l; ) {
      if ((e = l[En] || l[te])) {
        if (((l = e.alternate), e.child !== null || (l !== null && l.child !== null)))
          for (t = nh(t); t !== null; ) {
            if ((l = t[te])) return l;
            t = nh(t);
          }
        return e;
      }
      ((t = l), (l = t.parentNode));
    }
    return null;
  }
  function Nn(t) {
    if ((t = t[te] || t[En])) {
      var e = t.tag;
      if (e === 5 || e === 6 || e === 13 || e === 31 || e === 26 || e === 27 || e === 3) return t;
    }
    return null;
  }
  function Ea(t) {
    var e = t.tag;
    if (e === 5 || e === 26 || e === 27 || e === 6) return t.stateNode;
    throw Error(s(33));
  }
  function An(t) {
    var e = t[wr];
    return (e || (e = t[wr] = { hoistableStyles: new Map(), hoistableScripts: new Map() }), e);
  }
  function Wt(t) {
    t[xa] = !0;
  }
  var Br = new Set(),
    Ur = {};
  function en(t, e) {
    (Mn(t, e), Mn(t + 'Capture', e));
  }
  function Mn(t, e) {
    for (Ur[t] = e, t = 0; t < e.length; t++) Br.add(e[t]);
  }
  var xy = RegExp(
      '^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$'
    ),
    Lr = {},
    Hr = {};
  function Ey(t) {
    return mc.call(Hr, t)
      ? !0
      : mc.call(Lr, t)
        ? !1
        : xy.test(t)
          ? (Hr[t] = !0)
          : ((Lr[t] = !0), !1);
  }
  function Ou(t, e, l) {
    if (Ey(e))
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
  function Du(t, e, l) {
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
  function tl(t, e, l, n) {
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
  function qr(t) {
    var e = t.type;
    return (t = t.nodeName) && t.toLowerCase() === 'input' && (e === 'checkbox' || e === 'radio');
  }
  function Ty(t, e, l) {
    var n = Object.getOwnPropertyDescriptor(t.constructor.prototype, e);
    if (
      !t.hasOwnProperty(e) &&
      typeof n < 'u' &&
      typeof n.get == 'function' &&
      typeof n.set == 'function'
    ) {
      var u = n.get,
        c = n.set;
      return (
        Object.defineProperty(t, e, {
          configurable: !0,
          get: function () {
            return u.call(this);
          },
          set: function (f) {
            ((l = '' + f), c.call(this, f));
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
  function Sc(t) {
    if (!t._valueTracker) {
      var e = qr(t) ? 'checked' : 'value';
      t._valueTracker = Ty(t, e, '' + t[e]);
    }
  }
  function Gr(t) {
    if (!t) return !1;
    var e = t._valueTracker;
    if (!e) return !0;
    var l = e.getValue(),
      n = '';
    return (
      t && (n = qr(t) ? (t.checked ? 'true' : 'false') : t.value),
      (t = n),
      t !== l ? (e.setValue(t), !0) : !1
    );
  }
  function ku(t) {
    if (((t = t || (typeof document < 'u' ? document : void 0)), typeof t > 'u')) return null;
    try {
      return t.activeElement || t.body;
    } catch {
      return t.body;
    }
  }
  var Ny = /[\n"\\]/g;
  function je(t) {
    return t.replace(Ny, function (e) {
      return '\\' + e.charCodeAt(0).toString(16) + ' ';
    });
  }
  function xc(t, e, l, n, u, c, f, p) {
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
        ? Ec(t, f, Re(e))
        : l != null
          ? Ec(t, f, Re(l))
          : n != null && t.removeAttribute('value'),
      u == null && c != null && (t.defaultChecked = !!c),
      u != null && (t.checked = u && typeof u != 'function' && typeof u != 'symbol'),
      p != null && typeof p != 'function' && typeof p != 'symbol' && typeof p != 'boolean'
        ? (t.name = '' + Re(p))
        : t.removeAttribute('name'));
  }
  function Yr(t, e, l, n, u, c, f, p) {
    if (
      (c != null &&
        typeof c != 'function' &&
        typeof c != 'symbol' &&
        typeof c != 'boolean' &&
        (t.type = c),
      e != null || l != null)
    ) {
      if (!((c !== 'submit' && c !== 'reset') || e != null)) {
        Sc(t);
        return;
      }
      ((l = l != null ? '' + Re(l) : ''),
        (e = e != null ? '' + Re(e) : l),
        p || e === t.value || (t.value = e),
        (t.defaultValue = e));
    }
    ((n = n ?? u),
      (n = typeof n != 'function' && typeof n != 'symbol' && !!n),
      (t.checked = p ? t.checked : !!n),
      (t.defaultChecked = !!n),
      f != null &&
        typeof f != 'function' &&
        typeof f != 'symbol' &&
        typeof f != 'boolean' &&
        (t.name = f),
      Sc(t));
  }
  function Ec(t, e, l) {
    (e === 'number' && ku(t.ownerDocument) === t) ||
      t.defaultValue === '' + l ||
      (t.defaultValue = '' + l);
  }
  function Cn(t, e, l, n) {
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
  function Xr(t, e, l) {
    if (e != null && ((e = '' + Re(e)), e !== t.value && (t.value = e), l == null)) {
      t.defaultValue !== e && (t.defaultValue = e);
      return;
    }
    t.defaultValue = l != null ? '' + Re(l) : '';
  }
  function Vr(t, e, l, n) {
    if (e == null) {
      if (n != null) {
        if (l != null) throw Error(s(92));
        if (qt(n)) {
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
      Sc(t));
  }
  function Rn(t, e) {
    if (e) {
      var l = t.firstChild;
      if (l && l === t.lastChild && l.nodeType === 3) {
        l.nodeValue = e;
        return;
      }
    }
    t.textContent = e;
  }
  var Ay = new Set(
    'animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp'.split(
      ' '
    )
  );
  function Qr(t, e, l) {
    var n = e.indexOf('--') === 0;
    l == null || typeof l == 'boolean' || l === ''
      ? n
        ? t.setProperty(e, '')
        : e === 'float'
          ? (t.cssFloat = '')
          : (t[e] = '')
      : n
        ? t.setProperty(e, l)
        : typeof l != 'number' || l === 0 || Ay.has(e)
          ? e === 'float'
            ? (t.cssFloat = l)
            : (t[e] = ('' + l).trim())
          : (t[e] = l + 'px');
  }
  function Zr(t, e, l) {
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
      for (var u in e) ((n = e[u]), e.hasOwnProperty(u) && l[u] !== n && Qr(t, u, n));
    } else for (var c in e) e.hasOwnProperty(c) && Qr(t, c, e[c]);
  }
  function Tc(t) {
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
  var My = new Map([
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
    Cy =
      /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function wu(t) {
    return Cy.test('' + t)
      ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')"
      : t;
  }
  function el() {}
  var Nc = null;
  function Ac(t) {
    return (
      (t = t.target || t.srcElement || window),
      t.correspondingUseElement && (t = t.correspondingUseElement),
      t.nodeType === 3 ? t.parentNode : t
    );
  }
  var jn = null,
    zn = null;
  function Kr(t) {
    var e = Nn(t);
    if (e && (t = e.stateNode)) {
      var l = t[re] || null;
      t: switch (((t = e.stateNode), e.type)) {
        case 'input':
          if (
            (xc(
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
                xc(
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
            for (e = 0; e < l.length; e++) ((n = l[e]), n.form === t.form && Gr(n));
          }
          break t;
        case 'textarea':
          Xr(t, l.value, l.defaultValue);
          break t;
        case 'select':
          ((e = l.value), e != null && Cn(t, !!l.multiple, e, !1));
      }
    }
  }
  var Mc = !1;
  function $r(t, e, l) {
    if (Mc) return t(e, l);
    Mc = !0;
    try {
      var n = t(e);
      return n;
    } finally {
      if (
        ((Mc = !1),
        (jn !== null || zn !== null) &&
          (xi(), jn && ((e = jn), (t = zn), (zn = jn = null), Kr(e), t)))
      )
        for (e = 0; e < t.length; e++) Kr(t[e]);
    }
  }
  function Ta(t, e) {
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
  var ll = !(
      typeof window > 'u' ||
      typeof window.document > 'u' ||
      typeof window.document.createElement > 'u'
    ),
    Cc = !1;
  if (ll)
    try {
      var Na = {};
      (Object.defineProperty(Na, 'passive', {
        get: function () {
          Cc = !0;
        },
      }),
        window.addEventListener('test', Na, Na),
        window.removeEventListener('test', Na, Na));
    } catch {
      Cc = !1;
    }
  var Al = null,
    Rc = null,
    Bu = null;
  function Jr() {
    if (Bu) return Bu;
    var t,
      e = Rc,
      l = e.length,
      n,
      u = 'value' in Al ? Al.value : Al.textContent,
      c = u.length;
    for (t = 0; t < l && e[t] === u[t]; t++);
    var f = l - t;
    for (n = 1; n <= f && e[l - n] === u[c - n]; n++);
    return (Bu = u.slice(t, 1 < n ? 1 - n : void 0));
  }
  function Uu(t) {
    var e = t.keyCode;
    return (
      'charCode' in t ? ((t = t.charCode), t === 0 && e === 13 && (t = 13)) : (t = e),
      t === 10 && (t = 13),
      32 <= t || t === 13 ? t : 0
    );
  }
  function Lu() {
    return !0;
  }
  function Ir() {
    return !1;
  }
  function fe(t) {
    function e(l, n, u, c, f) {
      ((this._reactName = l),
        (this._targetInst = u),
        (this.type = n),
        (this.nativeEvent = c),
        (this.target = f),
        (this.currentTarget = null));
      for (var p in t) t.hasOwnProperty(p) && ((l = t[p]), (this[p] = l ? l(c) : c[p]));
      return (
        (this.isDefaultPrevented = (
          c.defaultPrevented != null ? c.defaultPrevented : c.returnValue === !1
        )
          ? Lu
          : Ir),
        (this.isPropagationStopped = Ir),
        this
      );
    }
    return (
      S(e.prototype, {
        preventDefault: function () {
          this.defaultPrevented = !0;
          var l = this.nativeEvent;
          l &&
            (l.preventDefault
              ? l.preventDefault()
              : typeof l.returnValue != 'unknown' && (l.returnValue = !1),
            (this.isDefaultPrevented = Lu));
        },
        stopPropagation: function () {
          var l = this.nativeEvent;
          l &&
            (l.stopPropagation
              ? l.stopPropagation()
              : typeof l.cancelBubble != 'unknown' && (l.cancelBubble = !0),
            (this.isPropagationStopped = Lu));
        },
        persist: function () {},
        isPersistent: Lu,
      }),
      e
    );
  }
  var ln = {
      eventPhase: 0,
      bubbles: 0,
      cancelable: 0,
      timeStamp: function (t) {
        return t.timeStamp || Date.now();
      },
      defaultPrevented: 0,
      isTrusted: 0,
    },
    Hu = fe(ln),
    Aa = S({}, ln, { view: 0, detail: 0 }),
    Ry = fe(Aa),
    jc,
    zc,
    Ma,
    qu = S({}, Aa, {
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
      getModifierState: Dc,
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
          : (t !== Ma &&
              (Ma && t.type === 'mousemove'
                ? ((jc = t.screenX - Ma.screenX), (zc = t.screenY - Ma.screenY))
                : (zc = jc = 0),
              (Ma = t)),
            jc);
      },
      movementY: function (t) {
        return 'movementY' in t ? t.movementY : zc;
      },
    }),
    Wr = fe(qu),
    jy = S({}, qu, { dataTransfer: 0 }),
    zy = fe(jy),
    Oy = S({}, Aa, { relatedTarget: 0 }),
    Oc = fe(Oy),
    Dy = S({}, ln, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
    ky = fe(Dy),
    wy = S({}, ln, {
      clipboardData: function (t) {
        return 'clipboardData' in t ? t.clipboardData : window.clipboardData;
      },
    }),
    By = fe(wy),
    Uy = S({}, ln, { data: 0 }),
    Fr = fe(Uy),
    Ly = {
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
    Hy = {
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
    qy = { Alt: 'altKey', Control: 'ctrlKey', Meta: 'metaKey', Shift: 'shiftKey' };
  function Gy(t) {
    var e = this.nativeEvent;
    return e.getModifierState ? e.getModifierState(t) : (t = qy[t]) ? !!e[t] : !1;
  }
  function Dc() {
    return Gy;
  }
  var Yy = S({}, Aa, {
      key: function (t) {
        if (t.key) {
          var e = Ly[t.key] || t.key;
          if (e !== 'Unidentified') return e;
        }
        return t.type === 'keypress'
          ? ((t = Uu(t)), t === 13 ? 'Enter' : String.fromCharCode(t))
          : t.type === 'keydown' || t.type === 'keyup'
            ? Hy[t.keyCode] || 'Unidentified'
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
      getModifierState: Dc,
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
    Xy = fe(Yy),
    Vy = S({}, qu, {
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
    Pr = fe(Vy),
    Qy = S({}, Aa, {
      touches: 0,
      targetTouches: 0,
      changedTouches: 0,
      altKey: 0,
      metaKey: 0,
      ctrlKey: 0,
      shiftKey: 0,
      getModifierState: Dc,
    }),
    Zy = fe(Qy),
    Ky = S({}, ln, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
    $y = fe(Ky),
    Jy = S({}, qu, {
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
    Iy = fe(Jy),
    Wy = S({}, ln, { newState: 0, oldState: 0 }),
    Fy = fe(Wy),
    Py = [9, 13, 27, 32],
    kc = ll && 'CompositionEvent' in window,
    Ca = null;
  ll && 'documentMode' in document && (Ca = document.documentMode);
  var t0 = ll && 'TextEvent' in window && !Ca,
    tf = ll && (!kc || (Ca && 8 < Ca && 11 >= Ca)),
    ef = ' ',
    lf = !1;
  function nf(t, e) {
    switch (t) {
      case 'keyup':
        return Py.indexOf(e.keyCode) !== -1;
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
  function af(t) {
    return ((t = t.detail), typeof t == 'object' && 'data' in t ? t.data : null);
  }
  var On = !1;
  function e0(t, e) {
    switch (t) {
      case 'compositionend':
        return af(e);
      case 'keypress':
        return e.which !== 32 ? null : ((lf = !0), ef);
      case 'textInput':
        return ((t = e.data), t === ef && lf ? null : t);
      default:
        return null;
    }
  }
  function l0(t, e) {
    if (On)
      return t === 'compositionend' || (!kc && nf(t, e))
        ? ((t = Jr()), (Bu = Rc = Al = null), (On = !1), t)
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
        return tf && e.locale !== 'ko' ? null : e.data;
      default:
        return null;
    }
  }
  var n0 = {
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
  function uf(t) {
    var e = t && t.nodeName && t.nodeName.toLowerCase();
    return e === 'input' ? !!n0[t.type] : e === 'textarea';
  }
  function cf(t, e, l, n) {
    (jn ? (zn ? zn.push(n) : (zn = [n])) : (jn = n),
      (e = Ri(e, 'onChange')),
      0 < e.length &&
        ((l = new Hu('onChange', 'change', null, l, n)), t.push({ event: l, listeners: e })));
  }
  var Ra = null,
    ja = null;
  function a0(t) {
    Xm(t, 0);
  }
  function Gu(t) {
    var e = Ea(t);
    if (Gr(e)) return t;
  }
  function sf(t, e) {
    if (t === 'change') return e;
  }
  var of = !1;
  if (ll) {
    var wc;
    if (ll) {
      var Bc = 'oninput' in document;
      if (!Bc) {
        var rf = document.createElement('div');
        (rf.setAttribute('oninput', 'return;'), (Bc = typeof rf.oninput == 'function'));
      }
      wc = Bc;
    } else wc = !1;
    of = wc && (!document.documentMode || 9 < document.documentMode);
  }
  function ff() {
    Ra && (Ra.detachEvent('onpropertychange', df), (ja = Ra = null));
  }
  function df(t) {
    if (t.propertyName === 'value' && Gu(ja)) {
      var e = [];
      (cf(e, ja, t, Ac(t)), $r(a0, e));
    }
  }
  function u0(t, e, l) {
    t === 'focusin'
      ? (ff(), (Ra = e), (ja = l), Ra.attachEvent('onpropertychange', df))
      : t === 'focusout' && ff();
  }
  function i0(t) {
    if (t === 'selectionchange' || t === 'keyup' || t === 'keydown') return Gu(ja);
  }
  function c0(t, e) {
    if (t === 'click') return Gu(e);
  }
  function s0(t, e) {
    if (t === 'input' || t === 'change') return Gu(e);
  }
  function o0(t, e) {
    return (t === e && (t !== 0 || 1 / t === 1 / e)) || (t !== t && e !== e);
  }
  var be = typeof Object.is == 'function' ? Object.is : o0;
  function za(t, e) {
    if (be(t, e)) return !0;
    if (typeof t != 'object' || t === null || typeof e != 'object' || e === null) return !1;
    var l = Object.keys(t),
      n = Object.keys(e);
    if (l.length !== n.length) return !1;
    for (n = 0; n < l.length; n++) {
      var u = l[n];
      if (!mc.call(e, u) || !be(t[u], e[u])) return !1;
    }
    return !0;
  }
  function mf(t) {
    for (; t && t.firstChild; ) t = t.firstChild;
    return t;
  }
  function hf(t, e) {
    var l = mf(t);
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
      l = mf(l);
    }
  }
  function pf(t, e) {
    return t && e
      ? t === e
        ? !0
        : t && t.nodeType === 3
          ? !1
          : e && e.nodeType === 3
            ? pf(t, e.parentNode)
            : 'contains' in t
              ? t.contains(e)
              : t.compareDocumentPosition
                ? !!(t.compareDocumentPosition(e) & 16)
                : !1
      : !1;
  }
  function yf(t) {
    t =
      t != null && t.ownerDocument != null && t.ownerDocument.defaultView != null
        ? t.ownerDocument.defaultView
        : window;
    for (var e = ku(t.document); e instanceof t.HTMLIFrameElement; ) {
      try {
        var l = typeof e.contentWindow.location.href == 'string';
      } catch {
        l = !1;
      }
      if (l) t = e.contentWindow;
      else break;
      e = ku(t.document);
    }
    return e;
  }
  function Uc(t) {
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
  var r0 = ll && 'documentMode' in document && 11 >= document.documentMode,
    Dn = null,
    Lc = null,
    Oa = null,
    Hc = !1;
  function gf(t, e, l) {
    var n = l.window === l ? l.document : l.nodeType === 9 ? l : l.ownerDocument;
    Hc ||
      Dn == null ||
      Dn !== ku(n) ||
      ((n = Dn),
      'selectionStart' in n && Uc(n)
        ? (n = { start: n.selectionStart, end: n.selectionEnd })
        : ((n = ((n.ownerDocument && n.ownerDocument.defaultView) || window).getSelection()),
          (n = {
            anchorNode: n.anchorNode,
            anchorOffset: n.anchorOffset,
            focusNode: n.focusNode,
            focusOffset: n.focusOffset,
          })),
      (Oa && za(Oa, n)) ||
        ((Oa = n),
        (n = Ri(Lc, 'onSelect')),
        0 < n.length &&
          ((e = new Hu('onSelect', 'select', null, e, l)),
          t.push({ event: e, listeners: n }),
          (e.target = Dn))));
  }
  function nn(t, e) {
    var l = {};
    return (
      (l[t.toLowerCase()] = e.toLowerCase()),
      (l['Webkit' + t] = 'webkit' + e),
      (l['Moz' + t] = 'moz' + e),
      l
    );
  }
  var kn = {
      animationend: nn('Animation', 'AnimationEnd'),
      animationiteration: nn('Animation', 'AnimationIteration'),
      animationstart: nn('Animation', 'AnimationStart'),
      transitionrun: nn('Transition', 'TransitionRun'),
      transitionstart: nn('Transition', 'TransitionStart'),
      transitioncancel: nn('Transition', 'TransitionCancel'),
      transitionend: nn('Transition', 'TransitionEnd'),
    },
    qc = {},
    vf = {};
  ll &&
    ((vf = document.createElement('div').style),
    'AnimationEvent' in window ||
      (delete kn.animationend.animation,
      delete kn.animationiteration.animation,
      delete kn.animationstart.animation),
    'TransitionEvent' in window || delete kn.transitionend.transition);
  function an(t) {
    if (qc[t]) return qc[t];
    if (!kn[t]) return t;
    var e = kn[t],
      l;
    for (l in e) if (e.hasOwnProperty(l) && l in vf) return (qc[t] = e[l]);
    return t;
  }
  var _f = an('animationend'),
    bf = an('animationiteration'),
    Sf = an('animationstart'),
    f0 = an('transitionrun'),
    d0 = an('transitionstart'),
    m0 = an('transitioncancel'),
    xf = an('transitionend'),
    Ef = new Map(),
    Gc =
      'abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel'.split(
        ' '
      );
  Gc.push('scrollEnd');
  function Ge(t, e) {
    (Ef.set(t, e), en(e, [t]));
  }
  var Yu =
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
    wn = 0,
    Yc = 0;
  function Xu() {
    for (var t = wn, e = (Yc = wn = 0); e < t; ) {
      var l = ze[e];
      ze[e++] = null;
      var n = ze[e];
      ze[e++] = null;
      var u = ze[e];
      ze[e++] = null;
      var c = ze[e];
      if (((ze[e++] = null), n !== null && u !== null)) {
        var f = n.pending;
        (f === null ? (u.next = u) : ((u.next = f.next), (f.next = u)), (n.pending = u));
      }
      c !== 0 && Tf(l, u, c);
    }
  }
  function Vu(t, e, l, n) {
    ((ze[wn++] = t),
      (ze[wn++] = e),
      (ze[wn++] = l),
      (ze[wn++] = n),
      (Yc |= n),
      (t.lanes |= n),
      (t = t.alternate),
      t !== null && (t.lanes |= n));
  }
  function Xc(t, e, l, n) {
    return (Vu(t, e, l, n), Qu(t));
  }
  function un(t, e) {
    return (Vu(t, null, null, e), Qu(t));
  }
  function Tf(t, e, l) {
    t.lanes |= l;
    var n = t.alternate;
    n !== null && (n.lanes |= l);
    for (var u = !1, c = t.return; c !== null; )
      ((c.childLanes |= l),
        (n = c.alternate),
        n !== null && (n.childLanes |= l),
        c.tag === 22 && ((t = c.stateNode), t === null || t._visibility & 1 || (u = !0)),
        (t = c),
        (c = c.return));
    return t.tag === 3
      ? ((c = t.stateNode),
        u &&
          e !== null &&
          ((u = 31 - _e(l)),
          (t = c.hiddenUpdates),
          (n = t[u]),
          n === null ? (t[u] = [e]) : n.push(e),
          (e.lane = l | 536870912)),
        c)
      : null;
  }
  function Qu(t) {
    if (50 < tu) throw ((tu = 0), (Fs = null), Error(s(185)));
    for (var e = t.return; e !== null; ) ((t = e), (e = t.return));
    return t.tag === 3 ? t.stateNode : null;
  }
  var Bn = {};
  function h0(t, e, l, n) {
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
    return new h0(t, e, l, n);
  }
  function Vc(t) {
    return ((t = t.prototype), !(!t || !t.isReactComponent));
  }
  function nl(t, e) {
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
  function Nf(t, e) {
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
  function Zu(t, e, l, n, u, c) {
    var f = 0;
    if (((n = t), typeof t == 'function')) Vc(t) && (f = 1);
    else if (typeof t == 'string')
      f = _g(t, l, $.current) ? 26 : t === 'html' || t === 'head' || t === 'body' ? 27 : 5;
    else
      t: switch (t) {
        case F:
          return ((t = Se(31, l, e, u)), (t.elementType = F), (t.lanes = c), t);
        case k:
          return cn(l.children, u, c, e);
        case R:
          ((f = 8), (u |= 24));
          break;
        case G:
          return ((t = Se(12, l, e, u | 2)), (t.elementType = G), (t.lanes = c), t);
        case H:
          return ((t = Se(13, l, e, u)), (t.elementType = H), (t.lanes = c), t);
        case K:
          return ((t = Se(19, l, e, u)), (t.elementType = K), (t.lanes = c), t);
        default:
          if (typeof t == 'object' && t !== null)
            switch (t.$$typeof) {
              case V:
                f = 10;
                break t;
              case I:
                f = 9;
                break t;
              case D:
                f = 11;
                break t;
              case Z:
                f = 14;
                break t;
              case q:
                ((f = 16), (n = null));
                break t;
            }
          ((f = 29), (l = Error(s(130, t === null ? 'null' : typeof t, ''))), (n = null));
      }
    return ((e = Se(f, l, e, u)), (e.elementType = t), (e.type = n), (e.lanes = c), e);
  }
  function cn(t, e, l, n) {
    return ((t = Se(7, t, n, e)), (t.lanes = l), t);
  }
  function Qc(t, e, l) {
    return ((t = Se(6, t, null, e)), (t.lanes = l), t);
  }
  function Af(t) {
    var e = Se(18, null, null, 0);
    return ((e.stateNode = t), e);
  }
  function Zc(t, e, l) {
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
  var Mf = new WeakMap();
  function Oe(t, e) {
    if (typeof t == 'object' && t !== null) {
      var l = Mf.get(t);
      return l !== void 0 ? l : ((e = { value: t, source: e, stack: Nr(e) }), Mf.set(t, e), e);
    }
    return { value: t, source: e, stack: Nr(e) };
  }
  var Un = [],
    Ln = 0,
    Ku = null,
    Da = 0,
    De = [],
    ke = 0,
    Ml = null,
    $e = 1,
    Je = '';
  function al(t, e) {
    ((Un[Ln++] = Da), (Un[Ln++] = Ku), (Ku = t), (Da = e));
  }
  function Cf(t, e, l) {
    ((De[ke++] = $e), (De[ke++] = Je), (De[ke++] = Ml), (Ml = t));
    var n = $e;
    t = Je;
    var u = 32 - _e(n) - 1;
    ((n &= ~(1 << u)), (l += 1));
    var c = 32 - _e(e) + u;
    if (30 < c) {
      var f = u - (u % 5);
      ((c = (n & ((1 << f) - 1)).toString(32)),
        (n >>= f),
        (u -= f),
        ($e = (1 << (32 - _e(e) + u)) | (l << u) | n),
        (Je = c + t));
    } else (($e = (1 << c) | (l << u) | n), (Je = t));
  }
  function Kc(t) {
    t.return !== null && (al(t, 1), Cf(t, 1, 0));
  }
  function $c(t) {
    for (; t === Ku; ) ((Ku = Un[--Ln]), (Un[Ln] = null), (Da = Un[--Ln]), (Un[Ln] = null));
    for (; t === Ml; )
      ((Ml = De[--ke]),
        (De[ke] = null),
        (Je = De[--ke]),
        (De[ke] = null),
        ($e = De[--ke]),
        (De[ke] = null));
  }
  function Rf(t, e) {
    ((De[ke++] = $e), (De[ke++] = Je), (De[ke++] = Ml), ($e = e.id), (Je = e.overflow), (Ml = t));
  }
  var ee = null,
    Dt = null,
    gt = !1,
    Cl = null,
    we = !1,
    Jc = Error(s(519));
  function Rl(t) {
    var e = Error(
      s(418, 1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? 'text' : 'HTML', '')
    );
    throw (ka(Oe(e, t)), Jc);
  }
  function jf(t) {
    var e = t.stateNode,
      l = t.type,
      n = t.memoizedProps;
    switch (((e[te] = t), (e[re] = n), l)) {
      case 'dialog':
        (ht('cancel', e), ht('close', e));
        break;
      case 'iframe':
      case 'object':
      case 'embed':
        ht('load', e);
        break;
      case 'video':
      case 'audio':
        for (l = 0; l < lu.length; l++) ht(lu[l], e);
        break;
      case 'source':
        ht('error', e);
        break;
      case 'img':
      case 'image':
      case 'link':
        (ht('error', e), ht('load', e));
        break;
      case 'details':
        ht('toggle', e);
        break;
      case 'input':
        (ht('invalid', e),
          Yr(e, n.value, n.defaultValue, n.checked, n.defaultChecked, n.type, n.name, !0));
        break;
      case 'select':
        ht('invalid', e);
        break;
      case 'textarea':
        (ht('invalid', e), Vr(e, n.value, n.defaultValue, n.children));
    }
    ((l = n.children),
      (typeof l != 'string' && typeof l != 'number' && typeof l != 'bigint') ||
      e.textContent === '' + l ||
      n.suppressHydrationWarning === !0 ||
      Km(e.textContent, l)
        ? (n.popover != null && (ht('beforetoggle', e), ht('toggle', e)),
          n.onScroll != null && ht('scroll', e),
          n.onScrollEnd != null && ht('scrollend', e),
          n.onClick != null && (e.onclick = el),
          (e = !0))
        : (e = !1),
      e || Rl(t, !0));
  }
  function zf(t) {
    for (ee = t.return; ee; )
      switch (ee.tag) {
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
          ee = ee.return;
      }
  }
  function Hn(t) {
    if (t !== ee) return !1;
    if (!gt) return (zf(t), (gt = !0), !1);
    var e = t.tag,
      l;
    if (
      ((l = e !== 3 && e !== 27) &&
        ((l = e === 5) &&
          ((l = t.type), (l = !(l !== 'form' && l !== 'button') || ho(t.type, t.memoizedProps))),
        (l = !l)),
      l && Dt && Rl(t),
      zf(t),
      e === 13)
    ) {
      if (((t = t.memoizedState), (t = t !== null ? t.dehydrated : null), !t)) throw Error(s(317));
      Dt = lh(t);
    } else if (e === 31) {
      if (((t = t.memoizedState), (t = t !== null ? t.dehydrated : null), !t)) throw Error(s(317));
      Dt = lh(t);
    } else
      e === 27
        ? ((e = Dt), Xl(t.type) ? ((t = _o), (_o = null), (Dt = t)) : (Dt = e))
        : (Dt = ee ? Ue(t.stateNode.nextSibling) : null);
    return !0;
  }
  function sn() {
    ((Dt = ee = null), (gt = !1));
  }
  function Ic() {
    var t = Cl;
    return (t !== null && (pe === null ? (pe = t) : pe.push.apply(pe, t), (Cl = null)), t);
  }
  function ka(t) {
    Cl === null ? (Cl = [t]) : Cl.push(t);
  }
  var Wc = v(null),
    on = null,
    ul = null;
  function jl(t, e, l) {
    (Q(Wc, e._currentValue), (e._currentValue = l));
  }
  function il(t) {
    ((t._currentValue = Wc.current), w(Wc));
  }
  function Fc(t, e, l) {
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
  function Pc(t, e, l, n) {
    var u = t.child;
    for (u !== null && (u.return = t); u !== null; ) {
      var c = u.dependencies;
      if (c !== null) {
        var f = u.child;
        c = c.firstContext;
        t: for (; c !== null; ) {
          var p = c;
          c = u;
          for (var x = 0; x < e.length; x++)
            if (p.context === e[x]) {
              ((c.lanes |= l),
                (p = c.alternate),
                p !== null && (p.lanes |= l),
                Fc(c.return, l, t),
                n || (f = null));
              break t;
            }
          c = p.next;
        }
      } else if (u.tag === 18) {
        if (((f = u.return), f === null)) throw Error(s(341));
        ((f.lanes |= l), (c = f.alternate), c !== null && (c.lanes |= l), Fc(f, l, t), (f = null));
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
  function qn(t, e, l, n) {
    t = null;
    for (var u = e, c = !1; u !== null; ) {
      if (!c) {
        if ((u.flags & 524288) !== 0) c = !0;
        else if ((u.flags & 262144) !== 0) break;
      }
      if (u.tag === 10) {
        var f = u.alternate;
        if (f === null) throw Error(s(387));
        if (((f = f.memoizedProps), f !== null)) {
          var p = u.type;
          be(u.pendingProps.value, f.value) || (t !== null ? t.push(p) : (t = [p]));
        }
      } else if (u === Tt.current) {
        if (((f = u.alternate), f === null)) throw Error(s(387));
        f.memoizedState.memoizedState !== u.memoizedState.memoizedState &&
          (t !== null ? t.push(cu) : (t = [cu]));
      }
      u = u.return;
    }
    (t !== null && Pc(e, t, l, n), (e.flags |= 262144));
  }
  function $u(t) {
    for (t = t.firstContext; t !== null; ) {
      if (!be(t.context._currentValue, t.memoizedValue)) return !0;
      t = t.next;
    }
    return !1;
  }
  function rn(t) {
    ((on = t), (ul = null), (t = t.dependencies), t !== null && (t.firstContext = null));
  }
  function le(t) {
    return Of(on, t);
  }
  function Ju(t, e) {
    return (on === null && rn(t), Of(t, e));
  }
  function Of(t, e) {
    var l = e._currentValue;
    if (((e = { context: e, memoizedValue: l, next: null }), ul === null)) {
      if (t === null) throw Error(s(308));
      ((ul = e), (t.dependencies = { lanes: 0, firstContext: e }), (t.flags |= 524288));
    } else ul = ul.next = e;
    return l;
  }
  var p0 =
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
    y0 = a.unstable_scheduleCallback,
    g0 = a.unstable_NormalPriority,
    Zt = {
      $$typeof: V,
      Consumer: null,
      Provider: null,
      _currentValue: null,
      _currentValue2: null,
      _threadCount: 0,
    };
  function ts() {
    return { controller: new p0(), data: new Map(), refCount: 0 };
  }
  function wa(t) {
    (t.refCount--,
      t.refCount === 0 &&
        y0(g0, function () {
          t.controller.abort();
        }));
  }
  var Ba = null,
    es = 0,
    Gn = 0,
    Yn = null;
  function v0(t, e) {
    if (Ba === null) {
      var l = (Ba = []);
      ((es = 0),
        (Gn = ao()),
        (Yn = {
          status: 'pending',
          value: void 0,
          then: function (n) {
            l.push(n);
          },
        }));
    }
    return (es++, e.then(Df, Df), e);
  }
  function Df() {
    if (--es === 0 && Ba !== null) {
      Yn !== null && (Yn.status = 'fulfilled');
      var t = Ba;
      ((Ba = null), (Gn = 0), (Yn = null));
      for (var e = 0; e < t.length; e++) (0, t[e])();
    }
  }
  function _0(t, e) {
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
  var kf = L.S;
  L.S = function (t, e) {
    ((gm = ge()),
      typeof e == 'object' && e !== null && typeof e.then == 'function' && v0(t, e),
      kf !== null && kf(t, e));
  };
  var fn = v(null);
  function ls() {
    var t = fn.current;
    return t !== null ? t : Ot.pooledCache;
  }
  function Iu(t, e) {
    e === null ? Q(fn, fn.current) : Q(fn, e.pool);
  }
  function wf() {
    var t = ls();
    return t === null ? null : { parent: Zt._currentValue, pool: t };
  }
  var Xn = Error(s(460)),
    ns = Error(s(474)),
    Wu = Error(s(542)),
    Fu = { then: function () {} };
  function Bf(t) {
    return ((t = t.status), t === 'fulfilled' || t === 'rejected');
  }
  function Uf(t, e, l) {
    switch (
      ((l = t[l]), l === void 0 ? t.push(e) : l !== e && (e.then(el, el), (e = l)), e.status)
    ) {
      case 'fulfilled':
        return e.value;
      case 'rejected':
        throw ((t = e.reason), Hf(t), t);
      default:
        if (typeof e.status == 'string') e.then(el, el);
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
            throw ((t = e.reason), Hf(t), t);
        }
        throw ((mn = e), Xn);
    }
  }
  function dn(t) {
    try {
      var e = t._init;
      return e(t._payload);
    } catch (l) {
      throw l !== null && typeof l == 'object' && typeof l.then == 'function' ? ((mn = l), Xn) : l;
    }
  }
  var mn = null;
  function Lf() {
    if (mn === null) throw Error(s(459));
    var t = mn;
    return ((mn = null), t);
  }
  function Hf(t) {
    if (t === Xn || t === Wu) throw Error(s(483));
  }
  var Vn = null,
    Ua = 0;
  function Pu(t) {
    var e = Ua;
    return ((Ua += 1), Vn === null && (Vn = []), Uf(Vn, t, e));
  }
  function La(t, e) {
    ((e = e.props.ref), (t.ref = e !== void 0 ? e : null));
  }
  function ti(t, e) {
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
  function qf(t) {
    function e(C, T) {
      if (t) {
        var j = C.deletions;
        j === null ? ((C.deletions = [T]), (C.flags |= 16)) : j.push(T);
      }
    }
    function l(C, T) {
      if (!t) return null;
      for (; T !== null; ) (e(C, T), (T = T.sibling));
      return null;
    }
    function n(C) {
      for (var T = new Map(); C !== null; )
        (C.key !== null ? T.set(C.key, C) : T.set(C.index, C), (C = C.sibling));
      return T;
    }
    function u(C, T) {
      return ((C = nl(C, T)), (C.index = 0), (C.sibling = null), C);
    }
    function c(C, T, j) {
      return (
        (C.index = j),
        t
          ? ((j = C.alternate),
            j !== null
              ? ((j = j.index), j < T ? ((C.flags |= 67108866), T) : j)
              : ((C.flags |= 67108866), T))
          : ((C.flags |= 1048576), T)
      );
    }
    function f(C) {
      return (t && C.alternate === null && (C.flags |= 67108866), C);
    }
    function p(C, T, j, Y) {
      return T === null || T.tag !== 6
        ? ((T = Qc(j, C.mode, Y)), (T.return = C), T)
        : ((T = u(T, j)), (T.return = C), T);
    }
    function x(C, T, j, Y) {
      var nt = j.type;
      return nt === k
        ? U(C, T, j.props.children, Y, j.key)
        : T !== null &&
            (T.elementType === nt ||
              (typeof nt == 'object' && nt !== null && nt.$$typeof === q && dn(nt) === T.type))
          ? ((T = u(T, j.props)), La(T, j), (T.return = C), T)
          : ((T = Zu(j.type, j.key, j.props, null, C.mode, Y)), La(T, j), (T.return = C), T);
    }
    function z(C, T, j, Y) {
      return T === null ||
        T.tag !== 4 ||
        T.stateNode.containerInfo !== j.containerInfo ||
        T.stateNode.implementation !== j.implementation
        ? ((T = Zc(j, C.mode, Y)), (T.return = C), T)
        : ((T = u(T, j.children || [])), (T.return = C), T);
    }
    function U(C, T, j, Y, nt) {
      return T === null || T.tag !== 7
        ? ((T = cn(j, C.mode, Y, nt)), (T.return = C), T)
        : ((T = u(T, j)), (T.return = C), T);
    }
    function X(C, T, j) {
      if ((typeof T == 'string' && T !== '') || typeof T == 'number' || typeof T == 'bigint')
        return ((T = Qc('' + T, C.mode, j)), (T.return = C), T);
      if (typeof T == 'object' && T !== null) {
        switch (T.$$typeof) {
          case E:
            return ((j = Zu(T.type, T.key, T.props, null, C.mode, j)), La(j, T), (j.return = C), j);
          case A:
            return ((T = Zc(T, C.mode, j)), (T.return = C), T);
          case q:
            return ((T = dn(T)), X(C, T, j));
        }
        if (qt(T) || st(T)) return ((T = cn(T, C.mode, j, null)), (T.return = C), T);
        if (typeof T.then == 'function') return X(C, Pu(T), j);
        if (T.$$typeof === V) return X(C, Ju(C, T), j);
        ti(C, T);
      }
      return null;
    }
    function O(C, T, j, Y) {
      var nt = T !== null ? T.key : null;
      if ((typeof j == 'string' && j !== '') || typeof j == 'number' || typeof j == 'bigint')
        return nt !== null ? null : p(C, T, '' + j, Y);
      if (typeof j == 'object' && j !== null) {
        switch (j.$$typeof) {
          case E:
            return j.key === nt ? x(C, T, j, Y) : null;
          case A:
            return j.key === nt ? z(C, T, j, Y) : null;
          case q:
            return ((j = dn(j)), O(C, T, j, Y));
        }
        if (qt(j) || st(j)) return nt !== null ? null : U(C, T, j, Y, null);
        if (typeof j.then == 'function') return O(C, T, Pu(j), Y);
        if (j.$$typeof === V) return O(C, T, Ju(C, j), Y);
        ti(C, j);
      }
      return null;
    }
    function B(C, T, j, Y, nt) {
      if ((typeof Y == 'string' && Y !== '') || typeof Y == 'number' || typeof Y == 'bigint')
        return ((C = C.get(j) || null), p(T, C, '' + Y, nt));
      if (typeof Y == 'object' && Y !== null) {
        switch (Y.$$typeof) {
          case E:
            return ((C = C.get(Y.key === null ? j : Y.key) || null), x(T, C, Y, nt));
          case A:
            return ((C = C.get(Y.key === null ? j : Y.key) || null), z(T, C, Y, nt));
          case q:
            return ((Y = dn(Y)), B(C, T, j, Y, nt));
        }
        if (qt(Y) || st(Y)) return ((C = C.get(j) || null), U(T, C, Y, nt, null));
        if (typeof Y.then == 'function') return B(C, T, j, Pu(Y), nt);
        if (Y.$$typeof === V) return B(C, T, j, Ju(T, Y), nt);
        ti(T, Y);
      }
      return null;
    }
    function W(C, T, j, Y) {
      for (
        var nt = null, _t = null, P = T, dt = (T = 0), yt = null;
        P !== null && dt < j.length;
        dt++
      ) {
        P.index > dt ? ((yt = P), (P = null)) : (yt = P.sibling);
        var bt = O(C, P, j[dt], Y);
        if (bt === null) {
          P === null && (P = yt);
          break;
        }
        (t && P && bt.alternate === null && e(C, P),
          (T = c(bt, T, dt)),
          _t === null ? (nt = bt) : (_t.sibling = bt),
          (_t = bt),
          (P = yt));
      }
      if (dt === j.length) return (l(C, P), gt && al(C, dt), nt);
      if (P === null) {
        for (; dt < j.length; dt++)
          ((P = X(C, j[dt], Y)),
            P !== null && ((T = c(P, T, dt)), _t === null ? (nt = P) : (_t.sibling = P), (_t = P)));
        return (gt && al(C, dt), nt);
      }
      for (P = n(P); dt < j.length; dt++)
        ((yt = B(P, C, dt, j[dt], Y)),
          yt !== null &&
            (t && yt.alternate !== null && P.delete(yt.key === null ? dt : yt.key),
            (T = c(yt, T, dt)),
            _t === null ? (nt = yt) : (_t.sibling = yt),
            (_t = yt)));
      return (
        t &&
          P.forEach(function ($l) {
            return e(C, $l);
          }),
        gt && al(C, dt),
        nt
      );
    }
    function at(C, T, j, Y) {
      if (j == null) throw Error(s(151));
      for (
        var nt = null, _t = null, P = T, dt = (T = 0), yt = null, bt = j.next();
        P !== null && !bt.done;
        dt++, bt = j.next()
      ) {
        P.index > dt ? ((yt = P), (P = null)) : (yt = P.sibling);
        var $l = O(C, P, bt.value, Y);
        if ($l === null) {
          P === null && (P = yt);
          break;
        }
        (t && P && $l.alternate === null && e(C, P),
          (T = c($l, T, dt)),
          _t === null ? (nt = $l) : (_t.sibling = $l),
          (_t = $l),
          (P = yt));
      }
      if (bt.done) return (l(C, P), gt && al(C, dt), nt);
      if (P === null) {
        for (; !bt.done; dt++, bt = j.next())
          ((bt = X(C, bt.value, Y)),
            bt !== null &&
              ((T = c(bt, T, dt)), _t === null ? (nt = bt) : (_t.sibling = bt), (_t = bt)));
        return (gt && al(C, dt), nt);
      }
      for (P = n(P); !bt.done; dt++, bt = j.next())
        ((bt = B(P, C, dt, bt.value, Y)),
          bt !== null &&
            (t && bt.alternate !== null && P.delete(bt.key === null ? dt : bt.key),
            (T = c(bt, T, dt)),
            _t === null ? (nt = bt) : (_t.sibling = bt),
            (_t = bt)));
      return (
        t &&
          P.forEach(function (jg) {
            return e(C, jg);
          }),
        gt && al(C, dt),
        nt
      );
    }
    function zt(C, T, j, Y) {
      if (
        (typeof j == 'object' &&
          j !== null &&
          j.type === k &&
          j.key === null &&
          (j = j.props.children),
        typeof j == 'object' && j !== null)
      ) {
        switch (j.$$typeof) {
          case E:
            t: {
              for (var nt = j.key; T !== null; ) {
                if (T.key === nt) {
                  if (((nt = j.type), nt === k)) {
                    if (T.tag === 7) {
                      (l(C, T.sibling), (Y = u(T, j.props.children)), (Y.return = C), (C = Y));
                      break t;
                    }
                  } else if (
                    T.elementType === nt ||
                    (typeof nt == 'object' && nt !== null && nt.$$typeof === q && dn(nt) === T.type)
                  ) {
                    (l(C, T.sibling), (Y = u(T, j.props)), La(Y, j), (Y.return = C), (C = Y));
                    break t;
                  }
                  l(C, T);
                  break;
                } else e(C, T);
                T = T.sibling;
              }
              j.type === k
                ? ((Y = cn(j.props.children, C.mode, Y, j.key)), (Y.return = C), (C = Y))
                : ((Y = Zu(j.type, j.key, j.props, null, C.mode, Y)),
                  La(Y, j),
                  (Y.return = C),
                  (C = Y));
            }
            return f(C);
          case A:
            t: {
              for (nt = j.key; T !== null; ) {
                if (T.key === nt)
                  if (
                    T.tag === 4 &&
                    T.stateNode.containerInfo === j.containerInfo &&
                    T.stateNode.implementation === j.implementation
                  ) {
                    (l(C, T.sibling), (Y = u(T, j.children || [])), (Y.return = C), (C = Y));
                    break t;
                  } else {
                    l(C, T);
                    break;
                  }
                else e(C, T);
                T = T.sibling;
              }
              ((Y = Zc(j, C.mode, Y)), (Y.return = C), (C = Y));
            }
            return f(C);
          case q:
            return ((j = dn(j)), zt(C, T, j, Y));
        }
        if (qt(j)) return W(C, T, j, Y);
        if (st(j)) {
          if (((nt = st(j)), typeof nt != 'function')) throw Error(s(150));
          return ((j = nt.call(j)), at(C, T, j, Y));
        }
        if (typeof j.then == 'function') return zt(C, T, Pu(j), Y);
        if (j.$$typeof === V) return zt(C, T, Ju(C, j), Y);
        ti(C, j);
      }
      return (typeof j == 'string' && j !== '') || typeof j == 'number' || typeof j == 'bigint'
        ? ((j = '' + j),
          T !== null && T.tag === 6
            ? (l(C, T.sibling), (Y = u(T, j)), (Y.return = C), (C = Y))
            : (l(C, T), (Y = Qc(j, C.mode, Y)), (Y.return = C), (C = Y)),
          f(C))
        : l(C, T);
    }
    return function (C, T, j, Y) {
      try {
        Ua = 0;
        var nt = zt(C, T, j, Y);
        return ((Vn = null), nt);
      } catch (P) {
        if (P === Xn || P === Wu) throw P;
        var _t = Se(29, P, null, C.mode);
        return ((_t.lanes = Y), (_t.return = C), _t);
      } finally {
      }
    };
  }
  var hn = qf(!0),
    Gf = qf(!1),
    zl = !1;
  function as(t) {
    t.updateQueue = {
      baseState: t.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null,
    };
  }
  function us(t, e) {
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
  function Ol(t) {
    return { lane: t, tag: 0, payload: null, callback: null, next: null };
  }
  function Dl(t, e, l) {
    var n = t.updateQueue;
    if (n === null) return null;
    if (((n = n.shared), (xt & 2) !== 0)) {
      var u = n.pending;
      return (
        u === null ? (e.next = e) : ((e.next = u.next), (u.next = e)),
        (n.pending = e),
        (e = Qu(t)),
        Tf(t, null, l),
        e
      );
    }
    return (Vu(t, n, e, l), Qu(t));
  }
  function Ha(t, e, l) {
    if (((e = e.updateQueue), e !== null && ((e = e.shared), (l & 4194048) !== 0))) {
      var n = e.lanes;
      ((n &= t.pendingLanes), (l |= n), (e.lanes = l), zr(t, l));
    }
  }
  function is(t, e) {
    var l = t.updateQueue,
      n = t.alternate;
    if (n !== null && ((n = n.updateQueue), l === n)) {
      var u = null,
        c = null;
      if (((l = l.firstBaseUpdate), l !== null)) {
        do {
          var f = { lane: l.lane, tag: l.tag, payload: l.payload, callback: null, next: null };
          (c === null ? (u = c = f) : (c = c.next = f), (l = l.next));
        } while (l !== null);
        c === null ? (u = c = e) : (c = c.next = e);
      } else u = c = e;
      ((l = {
        baseState: n.baseState,
        firstBaseUpdate: u,
        lastBaseUpdate: c,
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
  var cs = !1;
  function qa() {
    if (cs) {
      var t = Yn;
      if (t !== null) throw t;
    }
  }
  function Ga(t, e, l, n) {
    cs = !1;
    var u = t.updateQueue;
    zl = !1;
    var c = u.firstBaseUpdate,
      f = u.lastBaseUpdate,
      p = u.shared.pending;
    if (p !== null) {
      u.shared.pending = null;
      var x = p,
        z = x.next;
      ((x.next = null), f === null ? (c = z) : (f.next = z), (f = x));
      var U = t.alternate;
      U !== null &&
        ((U = U.updateQueue),
        (p = U.lastBaseUpdate),
        p !== f && (p === null ? (U.firstBaseUpdate = z) : (p.next = z), (U.lastBaseUpdate = x)));
    }
    if (c !== null) {
      var X = u.baseState;
      ((f = 0), (U = z = x = null), (p = c));
      do {
        var O = p.lane & -536870913,
          B = O !== p.lane;
        if (B ? (pt & O) === O : (n & O) === O) {
          (O !== 0 && O === Gn && (cs = !0),
            U !== null &&
              (U = U.next =
                { lane: 0, tag: p.tag, payload: p.payload, callback: null, next: null }));
          t: {
            var W = t,
              at = p;
            O = e;
            var zt = l;
            switch (at.tag) {
              case 1:
                if (((W = at.payload), typeof W == 'function')) {
                  X = W.call(zt, X, O);
                  break t;
                }
                X = W;
                break t;
              case 3:
                W.flags = (W.flags & -65537) | 128;
              case 0:
                if (
                  ((W = at.payload), (O = typeof W == 'function' ? W.call(zt, X, O) : W), O == null)
                )
                  break t;
                X = S({}, X, O);
                break t;
              case 2:
                zl = !0;
            }
          }
          ((O = p.callback),
            O !== null &&
              ((t.flags |= 64),
              B && (t.flags |= 8192),
              (B = u.callbacks),
              B === null ? (u.callbacks = [O]) : B.push(O)));
        } else
          ((B = { lane: O, tag: p.tag, payload: p.payload, callback: p.callback, next: null }),
            U === null ? ((z = U = B), (x = X)) : (U = U.next = B),
            (f |= O));
        if (((p = p.next), p === null)) {
          if (((p = u.shared.pending), p === null)) break;
          ((B = p),
            (p = B.next),
            (B.next = null),
            (u.lastBaseUpdate = B),
            (u.shared.pending = null));
        }
      } while (!0);
      (U === null && (x = X),
        (u.baseState = x),
        (u.firstBaseUpdate = z),
        (u.lastBaseUpdate = U),
        c === null && (u.shared.lanes = 0),
        (Ll |= f),
        (t.lanes = f),
        (t.memoizedState = X));
    }
  }
  function Yf(t, e) {
    if (typeof t != 'function') throw Error(s(191, t));
    t.call(e);
  }
  function Xf(t, e) {
    var l = t.callbacks;
    if (l !== null) for (t.callbacks = null, t = 0; t < l.length; t++) Yf(l[t], e);
  }
  var Qn = v(null),
    ei = v(0);
  function Vf(t, e) {
    ((t = pl), Q(ei, t), Q(Qn, e), (pl = t | e.baseLanes));
  }
  function ss() {
    (Q(ei, pl), Q(Qn, Qn.current));
  }
  function os() {
    ((pl = ei.current), w(Qn), w(ei));
  }
  var xe = v(null),
    Be = null;
  function kl(t) {
    var e = t.alternate;
    (Q(Vt, Vt.current & 1),
      Q(xe, t),
      Be === null && (e === null || Qn.current !== null || e.memoizedState !== null) && (Be = t));
  }
  function rs(t) {
    (Q(Vt, Vt.current), Q(xe, t), Be === null && (Be = t));
  }
  function Qf(t) {
    t.tag === 22 ? (Q(Vt, Vt.current), Q(xe, t), Be === null && (Be = t)) : wl();
  }
  function wl() {
    (Q(Vt, Vt.current), Q(xe, xe.current));
  }
  function Ee(t) {
    (w(xe), Be === t && (Be = null), w(Vt));
  }
  var Vt = v(0);
  function li(t) {
    for (var e = t; e !== null; ) {
      if (e.tag === 13) {
        var l = e.memoizedState;
        if (l !== null && ((l = l.dehydrated), l === null || go(l) || vo(l))) return e;
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
  var cl = 0,
    ft = null,
    Rt = null,
    Kt = null,
    ni = !1,
    Zn = !1,
    pn = !1,
    ai = 0,
    Ya = 0,
    Kn = null,
    b0 = 0;
  function Gt() {
    throw Error(s(321));
  }
  function fs(t, e) {
    if (e === null) return !1;
    for (var l = 0; l < e.length && l < t.length; l++) if (!be(t[l], e[l])) return !1;
    return !0;
  }
  function ds(t, e, l, n, u, c) {
    return (
      (cl = c),
      (ft = e),
      (e.memoizedState = null),
      (e.updateQueue = null),
      (e.lanes = 0),
      (L.H = t === null || t.memoizedState === null ? Cd : Ms),
      (pn = !1),
      (c = l(n, u)),
      (pn = !1),
      Zn && (c = Kf(e, l, n, u)),
      Zf(t),
      c
    );
  }
  function Zf(t) {
    L.H = Qa;
    var e = Rt !== null && Rt.next !== null;
    if (((cl = 0), (Kt = Rt = ft = null), (ni = !1), (Ya = 0), (Kn = null), e)) throw Error(s(300));
    t === null || $t || ((t = t.dependencies), t !== null && $u(t) && ($t = !0));
  }
  function Kf(t, e, l, n) {
    ft = t;
    var u = 0;
    do {
      if ((Zn && (Kn = null), (Ya = 0), (Zn = !1), 25 <= u)) throw Error(s(301));
      if (((u += 1), (Kt = Rt = null), t.updateQueue != null)) {
        var c = t.updateQueue;
        ((c.lastEffect = null),
          (c.events = null),
          (c.stores = null),
          c.memoCache != null && (c.memoCache.index = 0));
      }
      ((L.H = Rd), (c = e(l, n)));
    } while (Zn);
    return c;
  }
  function S0() {
    var t = L.H,
      e = t.useState()[0];
    return (
      (e = typeof e.then == 'function' ? Xa(e) : e),
      (t = t.useState()[0]),
      (Rt !== null ? Rt.memoizedState : null) !== t && (ft.flags |= 1024),
      e
    );
  }
  function ms() {
    var t = ai !== 0;
    return ((ai = 0), t);
  }
  function hs(t, e, l) {
    ((e.updateQueue = t.updateQueue), (e.flags &= -2053), (t.lanes &= ~l));
  }
  function ps(t) {
    if (ni) {
      for (t = t.memoizedState; t !== null; ) {
        var e = t.queue;
        (e !== null && (e.pending = null), (t = t.next));
      }
      ni = !1;
    }
    ((cl = 0), (Kt = Rt = ft = null), (Zn = !1), (Ya = ai = 0), (Kn = null));
  }
  function se() {
    var t = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
    return (Kt === null ? (ft.memoizedState = Kt = t) : (Kt = Kt.next = t), Kt);
  }
  function Qt() {
    if (Rt === null) {
      var t = ft.alternate;
      t = t !== null ? t.memoizedState : null;
    } else t = Rt.next;
    var e = Kt === null ? ft.memoizedState : Kt.next;
    if (e !== null) ((Kt = e), (Rt = t));
    else {
      if (t === null) throw ft.alternate === null ? Error(s(467)) : Error(s(310));
      ((Rt = t),
        (t = {
          memoizedState: Rt.memoizedState,
          baseState: Rt.baseState,
          baseQueue: Rt.baseQueue,
          queue: Rt.queue,
          next: null,
        }),
        Kt === null ? (ft.memoizedState = Kt = t) : (Kt = Kt.next = t));
    }
    return Kt;
  }
  function ui() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function Xa(t) {
    var e = Ya;
    return (
      (Ya += 1),
      Kn === null && (Kn = []),
      (t = Uf(Kn, t, e)),
      (e = ft),
      (Kt === null ? e.memoizedState : Kt.next) === null &&
        ((e = e.alternate), (L.H = e === null || e.memoizedState === null ? Cd : Ms)),
      t
    );
  }
  function ii(t) {
    if (t !== null && typeof t == 'object') {
      if (typeof t.then == 'function') return Xa(t);
      if (t.$$typeof === V) return le(t);
    }
    throw Error(s(438, String(t)));
  }
  function ys(t) {
    var e = null,
      l = ft.updateQueue;
    if ((l !== null && (e = l.memoCache), e == null)) {
      var n = ft.alternate;
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
      l === null && ((l = ui()), (ft.updateQueue = l)),
      (l.memoCache = e),
      (l = e.data[e.index]),
      l === void 0)
    )
      for (l = e.data[e.index] = Array(t), n = 0; n < t; n++) l[n] = et;
    return (e.index++, l);
  }
  function sl(t, e) {
    return typeof e == 'function' ? e(t) : e;
  }
  function ci(t) {
    var e = Qt();
    return gs(e, Rt, t);
  }
  function gs(t, e, l) {
    var n = t.queue;
    if (n === null) throw Error(s(311));
    n.lastRenderedReducer = l;
    var u = t.baseQueue,
      c = n.pending;
    if (c !== null) {
      if (u !== null) {
        var f = u.next;
        ((u.next = c.next), (c.next = f));
      }
      ((e.baseQueue = u = c), (n.pending = null));
    }
    if (((c = t.baseState), u === null)) t.memoizedState = c;
    else {
      e = u.next;
      var p = (f = null),
        x = null,
        z = e,
        U = !1;
      do {
        var X = z.lane & -536870913;
        if (X !== z.lane ? (pt & X) === X : (cl & X) === X) {
          var O = z.revertLane;
          if (O === 0)
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
              X === Gn && (U = !0));
          else if ((cl & O) === O) {
            ((z = z.next), O === Gn && (U = !0));
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
              (ft.lanes |= O),
              (Ll |= O));
          ((X = z.action), pn && l(c, X), (c = z.hasEagerState ? z.eagerState : l(c, X)));
        } else
          ((O = {
            lane: X,
            revertLane: z.revertLane,
            gesture: z.gesture,
            action: z.action,
            hasEagerState: z.hasEagerState,
            eagerState: z.eagerState,
            next: null,
          }),
            x === null ? ((p = x = O), (f = c)) : (x = x.next = O),
            (ft.lanes |= X),
            (Ll |= X));
        z = z.next;
      } while (z !== null && z !== e);
      if (
        (x === null ? (f = c) : (x.next = p),
        !be(c, t.memoizedState) && (($t = !0), U && ((l = Yn), l !== null)))
      )
        throw l;
      ((t.memoizedState = c), (t.baseState = f), (t.baseQueue = x), (n.lastRenderedState = c));
    }
    return (u === null && (n.lanes = 0), [t.memoizedState, n.dispatch]);
  }
  function vs(t) {
    var e = Qt(),
      l = e.queue;
    if (l === null) throw Error(s(311));
    l.lastRenderedReducer = t;
    var n = l.dispatch,
      u = l.pending,
      c = e.memoizedState;
    if (u !== null) {
      l.pending = null;
      var f = (u = u.next);
      do ((c = t(c, f.action)), (f = f.next));
      while (f !== u);
      (be(c, e.memoizedState) || ($t = !0),
        (e.memoizedState = c),
        e.baseQueue === null && (e.baseState = c),
        (l.lastRenderedState = c));
    }
    return [c, n];
  }
  function $f(t, e, l) {
    var n = ft,
      u = Qt(),
      c = gt;
    if (c) {
      if (l === void 0) throw Error(s(407));
      l = l();
    } else l = e();
    var f = !be((Rt || u).memoizedState, l);
    if (
      (f && ((u.memoizedState = l), ($t = !0)),
      (u = u.queue),
      Ss(Wf.bind(null, n, u, t), [t]),
      u.getSnapshot !== e || f || (Kt !== null && Kt.memoizedState.tag & 1))
    ) {
      if (
        ((n.flags |= 2048),
        $n(9, { destroy: void 0 }, If.bind(null, n, u, l, e), null),
        Ot === null)
      )
        throw Error(s(349));
      c || (cl & 127) !== 0 || Jf(n, e, l);
    }
    return l;
  }
  function Jf(t, e, l) {
    ((t.flags |= 16384),
      (t = { getSnapshot: e, value: l }),
      (e = ft.updateQueue),
      e === null
        ? ((e = ui()), (ft.updateQueue = e), (e.stores = [t]))
        : ((l = e.stores), l === null ? (e.stores = [t]) : l.push(t)));
  }
  function If(t, e, l, n) {
    ((e.value = l), (e.getSnapshot = n), Ff(e) && Pf(t));
  }
  function Wf(t, e, l) {
    return l(function () {
      Ff(e) && Pf(t);
    });
  }
  function Ff(t) {
    var e = t.getSnapshot;
    t = t.value;
    try {
      var l = e();
      return !be(t, l);
    } catch {
      return !0;
    }
  }
  function Pf(t) {
    var e = un(t, 2);
    e !== null && ye(e, t, 2);
  }
  function _s(t) {
    var e = se();
    if (typeof t == 'function') {
      var l = t;
      if (((t = l()), pn)) {
        Tl(!0);
        try {
          l();
        } finally {
          Tl(!1);
        }
      }
    }
    return (
      (e.memoizedState = e.baseState = t),
      (e.queue = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: sl,
        lastRenderedState: t,
      }),
      e
    );
  }
  function td(t, e, l, n) {
    return ((t.baseState = l), gs(t, Rt, typeof n == 'function' ? n : sl));
  }
  function x0(t, e, l, n, u) {
    if (ri(t)) throw Error(s(485));
    if (((t = e.action), t !== null)) {
      var c = {
        payload: u,
        action: t,
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
        (l = e.pending),
        l === null
          ? ((c.next = e.pending = c), ed(e, c))
          : ((c.next = l.next), (e.pending = l.next = c)));
    }
  }
  function ed(t, e) {
    var l = e.action,
      n = e.payload,
      u = t.state;
    if (e.isTransition) {
      var c = L.T,
        f = {};
      L.T = f;
      try {
        var p = l(u, n),
          x = L.S;
        (x !== null && x(f, p), ld(t, e, p));
      } catch (z) {
        bs(t, e, z);
      } finally {
        (c !== null && f.types !== null && (c.types = f.types), (L.T = c));
      }
    } else
      try {
        ((c = l(u, n)), ld(t, e, c));
      } catch (z) {
        bs(t, e, z);
      }
  }
  function ld(t, e, l) {
    l !== null && typeof l == 'object' && typeof l.then == 'function'
      ? l.then(
          function (n) {
            nd(t, e, n);
          },
          function (n) {
            return bs(t, e, n);
          }
        )
      : nd(t, e, l);
  }
  function nd(t, e, l) {
    ((e.status = 'fulfilled'),
      (e.value = l),
      ad(e),
      (t.state = l),
      (e = t.pending),
      e !== null &&
        ((l = e.next), l === e ? (t.pending = null) : ((l = l.next), (e.next = l), ed(t, l))));
  }
  function bs(t, e, l) {
    var n = t.pending;
    if (((t.pending = null), n !== null)) {
      n = n.next;
      do ((e.status = 'rejected'), (e.reason = l), ad(e), (e = e.next));
      while (e !== n);
    }
    t.action = null;
  }
  function ad(t) {
    t = t.listeners;
    for (var e = 0; e < t.length; e++) (0, t[e])();
  }
  function ud(t, e) {
    return e;
  }
  function id(t, e) {
    if (gt) {
      var l = Ot.formState;
      if (l !== null) {
        t: {
          var n = ft;
          if (gt) {
            if (Dt) {
              e: {
                for (var u = Dt, c = we; u.nodeType !== 8; ) {
                  if (!c) {
                    u = null;
                    break e;
                  }
                  if (((u = Ue(u.nextSibling)), u === null)) {
                    u = null;
                    break e;
                  }
                }
                ((c = u.data), (u = c === 'F!' || c === 'F' ? u : null));
              }
              if (u) {
                ((Dt = Ue(u.nextSibling)), (n = u.data === 'F!'));
                break t;
              }
            }
            Rl(n);
          }
          n = !1;
        }
        n && (e = l[0]);
      }
    }
    return (
      (l = se()),
      (l.memoizedState = l.baseState = e),
      (n = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: ud,
        lastRenderedState: e,
      }),
      (l.queue = n),
      (l = Nd.bind(null, ft, n)),
      (n.dispatch = l),
      (n = _s(!1)),
      (c = As.bind(null, ft, !1, n.queue)),
      (n = se()),
      (u = { state: e, dispatch: null, action: t, pending: null }),
      (n.queue = u),
      (l = x0.bind(null, ft, u, c, l)),
      (u.dispatch = l),
      (n.memoizedState = t),
      [e, l, !1]
    );
  }
  function cd(t) {
    var e = Qt();
    return sd(e, Rt, t);
  }
  function sd(t, e, l) {
    if (
      ((e = gs(t, e, ud)[0]),
      (t = ci(sl)[0]),
      typeof e == 'object' && e !== null && typeof e.then == 'function')
    )
      try {
        var n = Xa(e);
      } catch (f) {
        throw f === Xn ? Wu : f;
      }
    else n = e;
    e = Qt();
    var u = e.queue,
      c = u.dispatch;
    return (
      l !== e.memoizedState &&
        ((ft.flags |= 2048), $n(9, { destroy: void 0 }, E0.bind(null, u, l), null)),
      [n, c, t]
    );
  }
  function E0(t, e) {
    t.action = e;
  }
  function od(t) {
    var e = Qt(),
      l = Rt;
    if (l !== null) return sd(e, l, t);
    (Qt(), (e = e.memoizedState), (l = Qt()));
    var n = l.queue.dispatch;
    return ((l.memoizedState = t), [e, n, !1]);
  }
  function $n(t, e, l, n) {
    return (
      (t = { tag: t, create: l, deps: n, inst: e, next: null }),
      (e = ft.updateQueue),
      e === null && ((e = ui()), (ft.updateQueue = e)),
      (l = e.lastEffect),
      l === null
        ? (e.lastEffect = t.next = t)
        : ((n = l.next), (l.next = t), (t.next = n), (e.lastEffect = t)),
      t
    );
  }
  function rd() {
    return Qt().memoizedState;
  }
  function si(t, e, l, n) {
    var u = se();
    ((ft.flags |= t),
      (u.memoizedState = $n(1 | e, { destroy: void 0 }, l, n === void 0 ? null : n)));
  }
  function oi(t, e, l, n) {
    var u = Qt();
    n = n === void 0 ? null : n;
    var c = u.memoizedState.inst;
    Rt !== null && n !== null && fs(n, Rt.memoizedState.deps)
      ? (u.memoizedState = $n(e, c, l, n))
      : ((ft.flags |= t), (u.memoizedState = $n(1 | e, c, l, n)));
  }
  function fd(t, e) {
    si(8390656, 8, t, e);
  }
  function Ss(t, e) {
    oi(2048, 8, t, e);
  }
  function T0(t) {
    ft.flags |= 4;
    var e = ft.updateQueue;
    if (e === null) ((e = ui()), (ft.updateQueue = e), (e.events = [t]));
    else {
      var l = e.events;
      l === null ? (e.events = [t]) : l.push(t);
    }
  }
  function dd(t) {
    var e = Qt().memoizedState;
    return (
      T0({ ref: e, nextImpl: t }),
      function () {
        if ((xt & 2) !== 0) throw Error(s(440));
        return e.impl.apply(void 0, arguments);
      }
    );
  }
  function md(t, e) {
    return oi(4, 2, t, e);
  }
  function hd(t, e) {
    return oi(4, 4, t, e);
  }
  function pd(t, e) {
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
  function yd(t, e, l) {
    ((l = l != null ? l.concat([t]) : null), oi(4, 4, pd.bind(null, e, t), l));
  }
  function xs() {}
  function gd(t, e) {
    var l = Qt();
    e = e === void 0 ? null : e;
    var n = l.memoizedState;
    return e !== null && fs(e, n[1]) ? n[0] : ((l.memoizedState = [t, e]), t);
  }
  function vd(t, e) {
    var l = Qt();
    e = e === void 0 ? null : e;
    var n = l.memoizedState;
    if (e !== null && fs(e, n[1])) return n[0];
    if (((n = t()), pn)) {
      Tl(!0);
      try {
        t();
      } finally {
        Tl(!1);
      }
    }
    return ((l.memoizedState = [n, e]), n);
  }
  function Es(t, e, l) {
    return l === void 0 || ((cl & 1073741824) !== 0 && (pt & 261930) === 0)
      ? (t.memoizedState = e)
      : ((t.memoizedState = l), (t = _m()), (ft.lanes |= t), (Ll |= t), l);
  }
  function _d(t, e, l, n) {
    return be(l, e)
      ? l
      : Qn.current !== null
        ? ((t = Es(t, l, n)), be(t, e) || ($t = !0), t)
        : (cl & 42) === 0 || ((cl & 1073741824) !== 0 && (pt & 261930) === 0)
          ? (($t = !0), (t.memoizedState = l))
          : ((t = _m()), (ft.lanes |= t), (Ll |= t), e);
  }
  function bd(t, e, l, n, u) {
    var c = J.p;
    J.p = c !== 0 && 8 > c ? c : 8;
    var f = L.T,
      p = {};
    ((L.T = p), As(t, !1, e, l));
    try {
      var x = u(),
        z = L.S;
      if (
        (z !== null && z(p, x), x !== null && typeof x == 'object' && typeof x.then == 'function')
      ) {
        var U = _0(x, n);
        Va(t, e, U, Ae(t));
      } else Va(t, e, n, Ae(t));
    } catch (X) {
      Va(t, e, { then: function () {}, status: 'rejected', reason: X }, Ae());
    } finally {
      ((J.p = c), f !== null && p.types !== null && (f.types = p.types), (L.T = f));
    }
  }
  function N0() {}
  function Ts(t, e, l, n) {
    if (t.tag !== 5) throw Error(s(476));
    var u = Sd(t).queue;
    bd(
      t,
      u,
      e,
      it,
      l === null
        ? N0
        : function () {
            return (xd(t), l(n));
          }
    );
  }
  function Sd(t) {
    var e = t.memoizedState;
    if (e !== null) return e;
    e = {
      memoizedState: it,
      baseState: it,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: sl,
        lastRenderedState: it,
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
          lastRenderedReducer: sl,
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
  function xd(t) {
    var e = Sd(t);
    (e.next === null && (e = t.alternate.memoizedState), Va(t, e.next.queue, {}, Ae()));
  }
  function Ns() {
    return le(cu);
  }
  function Ed() {
    return Qt().memoizedState;
  }
  function Td() {
    return Qt().memoizedState;
  }
  function A0(t) {
    for (var e = t.return; e !== null; ) {
      switch (e.tag) {
        case 24:
        case 3:
          var l = Ae();
          t = Ol(l);
          var n = Dl(e, t, l);
          (n !== null && (ye(n, e, l), Ha(n, e, l)), (e = { cache: ts() }), (t.payload = e));
          return;
      }
      e = e.return;
    }
  }
  function M0(t, e, l) {
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
      ri(t) ? Ad(e, l) : ((l = Xc(t, e, l, n)), l !== null && (ye(l, t, n), Md(l, e, n))));
  }
  function Nd(t, e, l) {
    var n = Ae();
    Va(t, e, l, n);
  }
  function Va(t, e, l, n) {
    var u = {
      lane: n,
      revertLane: 0,
      gesture: null,
      action: l,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    };
    if (ri(t)) Ad(e, u);
    else {
      var c = t.alternate;
      if (
        t.lanes === 0 &&
        (c === null || c.lanes === 0) &&
        ((c = e.lastRenderedReducer), c !== null)
      )
        try {
          var f = e.lastRenderedState,
            p = c(f, l);
          if (((u.hasEagerState = !0), (u.eagerState = p), be(p, f)))
            return (Vu(t, e, u, 0), Ot === null && Xu(), !1);
        } catch {
        } finally {
        }
      if (((l = Xc(t, e, u, n)), l !== null)) return (ye(l, t, n), Md(l, e, n), !0);
    }
    return !1;
  }
  function As(t, e, l, n) {
    if (
      ((n = {
        lane: 2,
        revertLane: ao(),
        gesture: null,
        action: n,
        hasEagerState: !1,
        eagerState: null,
        next: null,
      }),
      ri(t))
    ) {
      if (e) throw Error(s(479));
    } else ((e = Xc(t, l, n, 2)), e !== null && ye(e, t, 2));
  }
  function ri(t) {
    var e = t.alternate;
    return t === ft || (e !== null && e === ft);
  }
  function Ad(t, e) {
    Zn = ni = !0;
    var l = t.pending;
    (l === null ? (e.next = e) : ((e.next = l.next), (l.next = e)), (t.pending = e));
  }
  function Md(t, e, l) {
    if ((l & 4194048) !== 0) {
      var n = e.lanes;
      ((n &= t.pendingLanes), (l |= n), (e.lanes = l), zr(t, l));
    }
  }
  var Qa = {
    readContext: le,
    use: ii,
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
  Qa.useEffectEvent = Gt;
  var Cd = {
      readContext: le,
      use: ii,
      useCallback: function (t, e) {
        return ((se().memoizedState = [t, e === void 0 ? null : e]), t);
      },
      useContext: le,
      useEffect: fd,
      useImperativeHandle: function (t, e, l) {
        ((l = l != null ? l.concat([t]) : null), si(4194308, 4, pd.bind(null, e, t), l));
      },
      useLayoutEffect: function (t, e) {
        return si(4194308, 4, t, e);
      },
      useInsertionEffect: function (t, e) {
        si(4, 2, t, e);
      },
      useMemo: function (t, e) {
        var l = se();
        e = e === void 0 ? null : e;
        var n = t();
        if (pn) {
          Tl(!0);
          try {
            t();
          } finally {
            Tl(!1);
          }
        }
        return ((l.memoizedState = [n, e]), n);
      },
      useReducer: function (t, e, l) {
        var n = se();
        if (l !== void 0) {
          var u = l(e);
          if (pn) {
            Tl(!0);
            try {
              l(e);
            } finally {
              Tl(!1);
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
          (t = t.dispatch = M0.bind(null, ft, t)),
          [n.memoizedState, t]
        );
      },
      useRef: function (t) {
        var e = se();
        return ((t = { current: t }), (e.memoizedState = t));
      },
      useState: function (t) {
        t = _s(t);
        var e = t.queue,
          l = Nd.bind(null, ft, e);
        return ((e.dispatch = l), [t.memoizedState, l]);
      },
      useDebugValue: xs,
      useDeferredValue: function (t, e) {
        var l = se();
        return Es(l, t, e);
      },
      useTransition: function () {
        var t = _s(!1);
        return ((t = bd.bind(null, ft, t.queue, !0, !1)), (se().memoizedState = t), [!1, t]);
      },
      useSyncExternalStore: function (t, e, l) {
        var n = ft,
          u = se();
        if (gt) {
          if (l === void 0) throw Error(s(407));
          l = l();
        } else {
          if (((l = e()), Ot === null)) throw Error(s(349));
          (pt & 127) !== 0 || Jf(n, e, l);
        }
        u.memoizedState = l;
        var c = { value: l, getSnapshot: e };
        return (
          (u.queue = c),
          fd(Wf.bind(null, n, c, t), [t]),
          (n.flags |= 2048),
          $n(9, { destroy: void 0 }, If.bind(null, n, c, l, e), null),
          l
        );
      },
      useId: function () {
        var t = se(),
          e = Ot.identifierPrefix;
        if (gt) {
          var l = Je,
            n = $e;
          ((l = (n & ~(1 << (32 - _e(n) - 1))).toString(32) + l),
            (e = '_' + e + 'R_' + l),
            (l = ai++),
            0 < l && (e += 'H' + l.toString(32)),
            (e += '_'));
        } else ((l = b0++), (e = '_' + e + 'r_' + l.toString(32) + '_'));
        return (t.memoizedState = e);
      },
      useHostTransitionStatus: Ns,
      useFormState: id,
      useActionState: id,
      useOptimistic: function (t) {
        var e = se();
        e.memoizedState = e.baseState = t;
        var l = {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: null,
          lastRenderedState: null,
        };
        return ((e.queue = l), (e = As.bind(null, ft, !0, l)), (l.dispatch = e), [t, e]);
      },
      useMemoCache: ys,
      useCacheRefresh: function () {
        return (se().memoizedState = A0.bind(null, ft));
      },
      useEffectEvent: function (t) {
        var e = se(),
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
    Ms = {
      readContext: le,
      use: ii,
      useCallback: gd,
      useContext: le,
      useEffect: Ss,
      useImperativeHandle: yd,
      useInsertionEffect: md,
      useLayoutEffect: hd,
      useMemo: vd,
      useReducer: ci,
      useRef: rd,
      useState: function () {
        return ci(sl);
      },
      useDebugValue: xs,
      useDeferredValue: function (t, e) {
        var l = Qt();
        return _d(l, Rt.memoizedState, t, e);
      },
      useTransition: function () {
        var t = ci(sl)[0],
          e = Qt().memoizedState;
        return [typeof t == 'boolean' ? t : Xa(t), e];
      },
      useSyncExternalStore: $f,
      useId: Ed,
      useHostTransitionStatus: Ns,
      useFormState: cd,
      useActionState: cd,
      useOptimistic: function (t, e) {
        var l = Qt();
        return td(l, Rt, t, e);
      },
      useMemoCache: ys,
      useCacheRefresh: Td,
    };
  Ms.useEffectEvent = dd;
  var Rd = {
    readContext: le,
    use: ii,
    useCallback: gd,
    useContext: le,
    useEffect: Ss,
    useImperativeHandle: yd,
    useInsertionEffect: md,
    useLayoutEffect: hd,
    useMemo: vd,
    useReducer: vs,
    useRef: rd,
    useState: function () {
      return vs(sl);
    },
    useDebugValue: xs,
    useDeferredValue: function (t, e) {
      var l = Qt();
      return Rt === null ? Es(l, t, e) : _d(l, Rt.memoizedState, t, e);
    },
    useTransition: function () {
      var t = vs(sl)[0],
        e = Qt().memoizedState;
      return [typeof t == 'boolean' ? t : Xa(t), e];
    },
    useSyncExternalStore: $f,
    useId: Ed,
    useHostTransitionStatus: Ns,
    useFormState: od,
    useActionState: od,
    useOptimistic: function (t, e) {
      var l = Qt();
      return Rt !== null ? td(l, Rt, t, e) : ((l.baseState = t), [t, l.queue.dispatch]);
    },
    useMemoCache: ys,
    useCacheRefresh: Td,
  };
  Rd.useEffectEvent = dd;
  function Cs(t, e, l, n) {
    ((e = t.memoizedState),
      (l = l(n, e)),
      (l = l == null ? e : S({}, e, l)),
      (t.memoizedState = l),
      t.lanes === 0 && (t.updateQueue.baseState = l));
  }
  var Rs = {
    enqueueSetState: function (t, e, l) {
      t = t._reactInternals;
      var n = Ae(),
        u = Ol(n);
      ((u.payload = e),
        l != null && (u.callback = l),
        (e = Dl(t, u, n)),
        e !== null && (ye(e, t, n), Ha(e, t, n)));
    },
    enqueueReplaceState: function (t, e, l) {
      t = t._reactInternals;
      var n = Ae(),
        u = Ol(n);
      ((u.tag = 1),
        (u.payload = e),
        l != null && (u.callback = l),
        (e = Dl(t, u, n)),
        e !== null && (ye(e, t, n), Ha(e, t, n)));
    },
    enqueueForceUpdate: function (t, e) {
      t = t._reactInternals;
      var l = Ae(),
        n = Ol(l);
      ((n.tag = 2),
        e != null && (n.callback = e),
        (e = Dl(t, n, l)),
        e !== null && (ye(e, t, l), Ha(e, t, l)));
    },
  };
  function jd(t, e, l, n, u, c, f) {
    return (
      (t = t.stateNode),
      typeof t.shouldComponentUpdate == 'function'
        ? t.shouldComponentUpdate(n, c, f)
        : e.prototype && e.prototype.isPureReactComponent
          ? !za(l, n) || !za(u, c)
          : !0
    );
  }
  function zd(t, e, l, n) {
    ((t = e.state),
      typeof e.componentWillReceiveProps == 'function' && e.componentWillReceiveProps(l, n),
      typeof e.UNSAFE_componentWillReceiveProps == 'function' &&
        e.UNSAFE_componentWillReceiveProps(l, n),
      e.state !== t && Rs.enqueueReplaceState(e, e.state, null));
  }
  function yn(t, e) {
    var l = e;
    if ('ref' in e) {
      l = {};
      for (var n in e) n !== 'ref' && (l[n] = e[n]);
    }
    if ((t = t.defaultProps)) {
      l === e && (l = S({}, l));
      for (var u in t) l[u] === void 0 && (l[u] = t[u]);
    }
    return l;
  }
  function Od(t) {
    Yu(t);
  }
  function Dd(t) {
    console.error(t);
  }
  function kd(t) {
    Yu(t);
  }
  function fi(t, e) {
    try {
      var l = t.onUncaughtError;
      l(e.value, { componentStack: e.stack });
    } catch (n) {
      setTimeout(function () {
        throw n;
      });
    }
  }
  function wd(t, e, l) {
    try {
      var n = t.onCaughtError;
      n(l.value, { componentStack: l.stack, errorBoundary: e.tag === 1 ? e.stateNode : null });
    } catch (u) {
      setTimeout(function () {
        throw u;
      });
    }
  }
  function js(t, e, l) {
    return (
      (l = Ol(l)),
      (l.tag = 3),
      (l.payload = { element: null }),
      (l.callback = function () {
        fi(t, e);
      }),
      l
    );
  }
  function Bd(t) {
    return ((t = Ol(t)), (t.tag = 3), t);
  }
  function Ud(t, e, l, n) {
    var u = l.type.getDerivedStateFromError;
    if (typeof u == 'function') {
      var c = n.value;
      ((t.payload = function () {
        return u(c);
      }),
        (t.callback = function () {
          wd(e, l, n);
        }));
    }
    var f = l.stateNode;
    f !== null &&
      typeof f.componentDidCatch == 'function' &&
      (t.callback = function () {
        (wd(e, l, n),
          typeof u != 'function' && (Hl === null ? (Hl = new Set([this])) : Hl.add(this)));
        var p = n.stack;
        this.componentDidCatch(n.value, { componentStack: p !== null ? p : '' });
      });
  }
  function C0(t, e, l, n, u) {
    if (((l.flags |= 32768), n !== null && typeof n == 'object' && typeof n.then == 'function')) {
      if (((e = l.alternate), e !== null && qn(e, l, u, !0), (l = xe.current), l !== null)) {
        switch (l.tag) {
          case 31:
          case 13:
            return (
              Be === null ? Ei() : l.alternate === null && Yt === 0 && (Yt = 3),
              (l.flags &= -257),
              (l.flags |= 65536),
              (l.lanes = u),
              n === Fu
                ? (l.flags |= 16384)
                : ((e = l.updateQueue),
                  e === null ? (l.updateQueue = new Set([n])) : e.add(n),
                  eo(t, n, u)),
              !1
            );
          case 22:
            return (
              (l.flags |= 65536),
              n === Fu
                ? (l.flags |= 16384)
                : ((e = l.updateQueue),
                  e === null
                    ? ((e = { transitions: null, markerInstances: null, retryQueue: new Set([n]) }),
                      (l.updateQueue = e))
                    : ((l = e.retryQueue), l === null ? (e.retryQueue = new Set([n])) : l.add(n)),
                  eo(t, n, u)),
              !1
            );
        }
        throw Error(s(435, l.tag));
      }
      return (eo(t, n, u), Ei(), !1);
    }
    if (gt)
      return (
        (e = xe.current),
        e !== null
          ? ((e.flags & 65536) === 0 && (e.flags |= 256),
            (e.flags |= 65536),
            (e.lanes = u),
            n !== Jc && ((t = Error(s(422), { cause: n })), ka(Oe(t, l))))
          : (n !== Jc && ((e = Error(s(423), { cause: n })), ka(Oe(e, l))),
            (t = t.current.alternate),
            (t.flags |= 65536),
            (u &= -u),
            (t.lanes |= u),
            (n = Oe(n, l)),
            (u = js(t.stateNode, n, u)),
            is(t, u),
            Yt !== 4 && (Yt = 2)),
        !1
      );
    var c = Error(s(520), { cause: n });
    if (((c = Oe(c, l)), Pa === null ? (Pa = [c]) : Pa.push(c), Yt !== 4 && (Yt = 2), e === null))
      return !0;
    ((n = Oe(n, l)), (l = e));
    do {
      switch (l.tag) {
        case 3:
          return (
            (l.flags |= 65536),
            (t = u & -u),
            (l.lanes |= t),
            (t = js(l.stateNode, n, t)),
            is(l, t),
            !1
          );
        case 1:
          if (
            ((e = l.type),
            (c = l.stateNode),
            (l.flags & 128) === 0 &&
              (typeof e.getDerivedStateFromError == 'function' ||
                (c !== null &&
                  typeof c.componentDidCatch == 'function' &&
                  (Hl === null || !Hl.has(c)))))
          )
            return (
              (l.flags |= 65536),
              (u &= -u),
              (l.lanes |= u),
              (u = Bd(u)),
              Ud(u, t, l, n),
              is(l, u),
              !1
            );
      }
      l = l.return;
    } while (l !== null);
    return !1;
  }
  var zs = Error(s(461)),
    $t = !1;
  function ne(t, e, l, n) {
    e.child = t === null ? Gf(e, null, l, n) : hn(e, t.child, l, n);
  }
  function Ld(t, e, l, n, u) {
    l = l.render;
    var c = e.ref;
    if ('ref' in n) {
      var f = {};
      for (var p in n) p !== 'ref' && (f[p] = n[p]);
    } else f = n;
    return (
      rn(e),
      (n = ds(t, e, l, f, c, u)),
      (p = ms()),
      t !== null && !$t
        ? (hs(t, e, u), ol(t, e, u))
        : (gt && p && Kc(e), (e.flags |= 1), ne(t, e, n, u), e.child)
    );
  }
  function Hd(t, e, l, n, u) {
    if (t === null) {
      var c = l.type;
      return typeof c == 'function' && !Vc(c) && c.defaultProps === void 0 && l.compare === null
        ? ((e.tag = 15), (e.type = c), qd(t, e, c, n, u))
        : ((t = Zu(l.type, null, n, e, e.mode, u)), (t.ref = e.ref), (t.return = e), (e.child = t));
    }
    if (((c = t.child), !Hs(t, u))) {
      var f = c.memoizedProps;
      if (((l = l.compare), (l = l !== null ? l : za), l(f, n) && t.ref === e.ref))
        return ol(t, e, u);
    }
    return ((e.flags |= 1), (t = nl(c, n)), (t.ref = e.ref), (t.return = e), (e.child = t));
  }
  function qd(t, e, l, n, u) {
    if (t !== null) {
      var c = t.memoizedProps;
      if (za(c, n) && t.ref === e.ref)
        if ((($t = !1), (e.pendingProps = n = c), Hs(t, u))) (t.flags & 131072) !== 0 && ($t = !0);
        else return ((e.lanes = t.lanes), ol(t, e, u));
    }
    return Os(t, e, l, n, u);
  }
  function Gd(t, e, l, n) {
    var u = n.children,
      c = t !== null ? t.memoizedState : null;
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
        if (((c = c !== null ? c.baseLanes | l : l), t !== null)) {
          for (n = e.child = t.child, u = 0; n !== null; )
            ((u = u | n.lanes | n.childLanes), (n = n.sibling));
          n = u & ~c;
        } else ((n = 0), (e.child = null));
        return Yd(t, e, c, l, n);
      }
      if ((l & 536870912) !== 0)
        ((e.memoizedState = { baseLanes: 0, cachePool: null }),
          t !== null && Iu(e, c !== null ? c.cachePool : null),
          c !== null ? Vf(e, c) : ss(),
          Qf(e));
      else return ((n = e.lanes = 536870912), Yd(t, e, c !== null ? c.baseLanes | l : l, l, n));
    } else
      c !== null
        ? (Iu(e, c.cachePool), Vf(e, c), wl(), (e.memoizedState = null))
        : (t !== null && Iu(e, null), ss(), wl());
    return (ne(t, e, u, l), e.child);
  }
  function Za(t, e) {
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
  function Yd(t, e, l, n, u) {
    var c = ls();
    return (
      (c = c === null ? null : { parent: Zt._currentValue, pool: c }),
      (e.memoizedState = { baseLanes: l, cachePool: c }),
      t !== null && Iu(e, null),
      ss(),
      Qf(e),
      t !== null && qn(t, e, n, !0),
      (e.childLanes = u),
      null
    );
  }
  function di(t, e) {
    return (
      (e = hi({ mode: e.mode, children: e.children }, t.mode)),
      (e.ref = t.ref),
      (t.child = e),
      (e.return = t),
      e
    );
  }
  function Xd(t, e, l) {
    return (
      hn(e, t.child, null, l),
      (t = di(e, e.pendingProps)),
      (t.flags |= 2),
      Ee(e),
      (e.memoizedState = null),
      t
    );
  }
  function R0(t, e, l) {
    var n = e.pendingProps,
      u = (e.flags & 128) !== 0;
    if (((e.flags &= -129), t === null)) {
      if (gt) {
        if (n.mode === 'hidden') return ((t = di(e, n)), (e.lanes = 536870912), Za(null, t));
        if (
          (rs(e),
          (t = Dt)
            ? ((t = eh(t, we)),
              (t = t !== null && t.data === '&' ? t : null),
              t !== null &&
                ((e.memoizedState = {
                  dehydrated: t,
                  treeContext: Ml !== null ? { id: $e, overflow: Je } : null,
                  retryLane: 536870912,
                  hydrationErrors: null,
                }),
                (l = Af(t)),
                (l.return = e),
                (e.child = l),
                (ee = e),
                (Dt = null)))
            : (t = null),
          t === null)
        )
          throw Rl(e);
        return ((e.lanes = 536870912), null);
      }
      return di(e, n);
    }
    var c = t.memoizedState;
    if (c !== null) {
      var f = c.dehydrated;
      if ((rs(e), u))
        if (e.flags & 256) ((e.flags &= -257), (e = Xd(t, e, l)));
        else if (e.memoizedState !== null) ((e.child = t.child), (e.flags |= 128), (e = null));
        else throw Error(s(558));
      else if (($t || qn(t, e, l, !1), (u = (l & t.childLanes) !== 0), $t || u)) {
        if (((n = Ot), n !== null && ((f = Or(n, l)), f !== 0 && f !== c.retryLane)))
          throw ((c.retryLane = f), un(t, f), ye(n, t, f), zs);
        (Ei(), (e = Xd(t, e, l)));
      } else
        ((t = c.treeContext),
          (Dt = Ue(f.nextSibling)),
          (ee = e),
          (gt = !0),
          (Cl = null),
          (we = !1),
          t !== null && Rf(e, t),
          (e = di(e, n)),
          (e.flags |= 4096));
      return e;
    }
    return (
      (t = nl(t.child, { mode: n.mode, children: n.children })),
      (t.ref = e.ref),
      (e.child = t),
      (t.return = e),
      t
    );
  }
  function mi(t, e) {
    var l = e.ref;
    if (l === null) t !== null && t.ref !== null && (e.flags |= 4194816);
    else {
      if (typeof l != 'function' && typeof l != 'object') throw Error(s(284));
      (t === null || t.ref !== l) && (e.flags |= 4194816);
    }
  }
  function Os(t, e, l, n, u) {
    return (
      rn(e),
      (l = ds(t, e, l, n, void 0, u)),
      (n = ms()),
      t !== null && !$t
        ? (hs(t, e, u), ol(t, e, u))
        : (gt && n && Kc(e), (e.flags |= 1), ne(t, e, l, u), e.child)
    );
  }
  function Vd(t, e, l, n, u, c) {
    return (
      rn(e),
      (e.updateQueue = null),
      (l = Kf(e, n, l, u)),
      Zf(t),
      (n = ms()),
      t !== null && !$t
        ? (hs(t, e, c), ol(t, e, c))
        : (gt && n && Kc(e), (e.flags |= 1), ne(t, e, l, c), e.child)
    );
  }
  function Qd(t, e, l, n, u) {
    if ((rn(e), e.stateNode === null)) {
      var c = Bn,
        f = l.contextType;
      (typeof f == 'object' && f !== null && (c = le(f)),
        (c = new l(n, c)),
        (e.memoizedState = c.state !== null && c.state !== void 0 ? c.state : null),
        (c.updater = Rs),
        (e.stateNode = c),
        (c._reactInternals = e),
        (c = e.stateNode),
        (c.props = n),
        (c.state = e.memoizedState),
        (c.refs = {}),
        as(e),
        (f = l.contextType),
        (c.context = typeof f == 'object' && f !== null ? le(f) : Bn),
        (c.state = e.memoizedState),
        (f = l.getDerivedStateFromProps),
        typeof f == 'function' && (Cs(e, l, f, n), (c.state = e.memoizedState)),
        typeof l.getDerivedStateFromProps == 'function' ||
          typeof c.getSnapshotBeforeUpdate == 'function' ||
          (typeof c.UNSAFE_componentWillMount != 'function' &&
            typeof c.componentWillMount != 'function') ||
          ((f = c.state),
          typeof c.componentWillMount == 'function' && c.componentWillMount(),
          typeof c.UNSAFE_componentWillMount == 'function' && c.UNSAFE_componentWillMount(),
          f !== c.state && Rs.enqueueReplaceState(c, c.state, null),
          Ga(e, n, c, u),
          qa(),
          (c.state = e.memoizedState)),
        typeof c.componentDidMount == 'function' && (e.flags |= 4194308),
        (n = !0));
    } else if (t === null) {
      c = e.stateNode;
      var p = e.memoizedProps,
        x = yn(l, p);
      c.props = x;
      var z = c.context,
        U = l.contextType;
      ((f = Bn), typeof U == 'object' && U !== null && (f = le(U)));
      var X = l.getDerivedStateFromProps;
      ((U = typeof X == 'function' || typeof c.getSnapshotBeforeUpdate == 'function'),
        (p = e.pendingProps !== p),
        U ||
          (typeof c.UNSAFE_componentWillReceiveProps != 'function' &&
            typeof c.componentWillReceiveProps != 'function') ||
          ((p || z !== f) && zd(e, c, n, f)),
        (zl = !1));
      var O = e.memoizedState;
      ((c.state = O),
        Ga(e, n, c, u),
        qa(),
        (z = e.memoizedState),
        p || O !== z || zl
          ? (typeof X == 'function' && (Cs(e, l, X, n), (z = e.memoizedState)),
            (x = zl || jd(e, l, x, n, O, z, f))
              ? (U ||
                  (typeof c.UNSAFE_componentWillMount != 'function' &&
                    typeof c.componentWillMount != 'function') ||
                  (typeof c.componentWillMount == 'function' && c.componentWillMount(),
                  typeof c.UNSAFE_componentWillMount == 'function' &&
                    c.UNSAFE_componentWillMount()),
                typeof c.componentDidMount == 'function' && (e.flags |= 4194308))
              : (typeof c.componentDidMount == 'function' && (e.flags |= 4194308),
                (e.memoizedProps = n),
                (e.memoizedState = z)),
            (c.props = n),
            (c.state = z),
            (c.context = f),
            (n = x))
          : (typeof c.componentDidMount == 'function' && (e.flags |= 4194308), (n = !1)));
    } else {
      ((c = e.stateNode),
        us(t, e),
        (f = e.memoizedProps),
        (U = yn(l, f)),
        (c.props = U),
        (X = e.pendingProps),
        (O = c.context),
        (z = l.contextType),
        (x = Bn),
        typeof z == 'object' && z !== null && (x = le(z)),
        (p = l.getDerivedStateFromProps),
        (z = typeof p == 'function' || typeof c.getSnapshotBeforeUpdate == 'function') ||
          (typeof c.UNSAFE_componentWillReceiveProps != 'function' &&
            typeof c.componentWillReceiveProps != 'function') ||
          ((f !== X || O !== x) && zd(e, c, n, x)),
        (zl = !1),
        (O = e.memoizedState),
        (c.state = O),
        Ga(e, n, c, u),
        qa());
      var B = e.memoizedState;
      f !== X || O !== B || zl || (t !== null && t.dependencies !== null && $u(t.dependencies))
        ? (typeof p == 'function' && (Cs(e, l, p, n), (B = e.memoizedState)),
          (U =
            zl ||
            jd(e, l, U, n, O, B, x) ||
            (t !== null && t.dependencies !== null && $u(t.dependencies)))
            ? (z ||
                (typeof c.UNSAFE_componentWillUpdate != 'function' &&
                  typeof c.componentWillUpdate != 'function') ||
                (typeof c.componentWillUpdate == 'function' && c.componentWillUpdate(n, B, x),
                typeof c.UNSAFE_componentWillUpdate == 'function' &&
                  c.UNSAFE_componentWillUpdate(n, B, x)),
              typeof c.componentDidUpdate == 'function' && (e.flags |= 4),
              typeof c.getSnapshotBeforeUpdate == 'function' && (e.flags |= 1024))
            : (typeof c.componentDidUpdate != 'function' ||
                (f === t.memoizedProps && O === t.memoizedState) ||
                (e.flags |= 4),
              typeof c.getSnapshotBeforeUpdate != 'function' ||
                (f === t.memoizedProps && O === t.memoizedState) ||
                (e.flags |= 1024),
              (e.memoizedProps = n),
              (e.memoizedState = B)),
          (c.props = n),
          (c.state = B),
          (c.context = x),
          (n = U))
        : (typeof c.componentDidUpdate != 'function' ||
            (f === t.memoizedProps && O === t.memoizedState) ||
            (e.flags |= 4),
          typeof c.getSnapshotBeforeUpdate != 'function' ||
            (f === t.memoizedProps && O === t.memoizedState) ||
            (e.flags |= 1024),
          (n = !1));
    }
    return (
      (c = n),
      mi(t, e),
      (n = (e.flags & 128) !== 0),
      c || n
        ? ((c = e.stateNode),
          (l = n && typeof l.getDerivedStateFromError != 'function' ? null : c.render()),
          (e.flags |= 1),
          t !== null && n
            ? ((e.child = hn(e, t.child, null, u)), (e.child = hn(e, null, l, u)))
            : ne(t, e, l, u),
          (e.memoizedState = c.state),
          (t = e.child))
        : (t = ol(t, e, u)),
      t
    );
  }
  function Zd(t, e, l, n) {
    return (sn(), (e.flags |= 256), ne(t, e, l, n), e.child);
  }
  var Ds = { dehydrated: null, treeContext: null, retryLane: 0, hydrationErrors: null };
  function ks(t) {
    return { baseLanes: t, cachePool: wf() };
  }
  function ws(t, e, l) {
    return ((t = t !== null ? t.childLanes & ~l : 0), e && (t |= Ne), t);
  }
  function Kd(t, e, l) {
    var n = e.pendingProps,
      u = !1,
      c = (e.flags & 128) !== 0,
      f;
    if (
      ((f = c) || (f = t !== null && t.memoizedState === null ? !1 : (Vt.current & 2) !== 0),
      f && ((u = !0), (e.flags &= -129)),
      (f = (e.flags & 32) !== 0),
      (e.flags &= -33),
      t === null)
    ) {
      if (gt) {
        if (
          (u ? kl(e) : wl(),
          (t = Dt)
            ? ((t = eh(t, we)),
              (t = t !== null && t.data !== '&' ? t : null),
              t !== null &&
                ((e.memoizedState = {
                  dehydrated: t,
                  treeContext: Ml !== null ? { id: $e, overflow: Je } : null,
                  retryLane: 536870912,
                  hydrationErrors: null,
                }),
                (l = Af(t)),
                (l.return = e),
                (e.child = l),
                (ee = e),
                (Dt = null)))
            : (t = null),
          t === null)
        )
          throw Rl(e);
        return (vo(t) ? (e.lanes = 32) : (e.lanes = 536870912), null);
      }
      var p = n.children;
      return (
        (n = n.fallback),
        u
          ? (wl(),
            (u = e.mode),
            (p = hi({ mode: 'hidden', children: p }, u)),
            (n = cn(n, u, l, null)),
            (p.return = e),
            (n.return = e),
            (p.sibling = n),
            (e.child = p),
            (n = e.child),
            (n.memoizedState = ks(l)),
            (n.childLanes = ws(t, f, l)),
            (e.memoizedState = Ds),
            Za(null, n))
          : (kl(e), Bs(e, p))
      );
    }
    var x = t.memoizedState;
    if (x !== null && ((p = x.dehydrated), p !== null)) {
      if (c)
        e.flags & 256
          ? (kl(e), (e.flags &= -257), (e = Us(t, e, l)))
          : e.memoizedState !== null
            ? (wl(), (e.child = t.child), (e.flags |= 128), (e = null))
            : (wl(),
              (p = n.fallback),
              (u = e.mode),
              (n = hi({ mode: 'visible', children: n.children }, u)),
              (p = cn(p, u, l, null)),
              (p.flags |= 2),
              (n.return = e),
              (p.return = e),
              (n.sibling = p),
              (e.child = n),
              hn(e, t.child, null, l),
              (n = e.child),
              (n.memoizedState = ks(l)),
              (n.childLanes = ws(t, f, l)),
              (e.memoizedState = Ds),
              (e = Za(null, n)));
      else if ((kl(e), vo(p))) {
        if (((f = p.nextSibling && p.nextSibling.dataset), f)) var z = f.dgst;
        ((f = z),
          (n = Error(s(419))),
          (n.stack = ''),
          (n.digest = f),
          ka({ value: n, source: null, stack: null }),
          (e = Us(t, e, l)));
      } else if (($t || qn(t, e, l, !1), (f = (l & t.childLanes) !== 0), $t || f)) {
        if (((f = Ot), f !== null && ((n = Or(f, l)), n !== 0 && n !== x.retryLane)))
          throw ((x.retryLane = n), un(t, n), ye(f, t, n), zs);
        (go(p) || Ei(), (e = Us(t, e, l)));
      } else
        go(p)
          ? ((e.flags |= 192), (e.child = t.child), (e = null))
          : ((t = x.treeContext),
            (Dt = Ue(p.nextSibling)),
            (ee = e),
            (gt = !0),
            (Cl = null),
            (we = !1),
            t !== null && Rf(e, t),
            (e = Bs(e, n.children)),
            (e.flags |= 4096));
      return e;
    }
    return u
      ? (wl(),
        (p = n.fallback),
        (u = e.mode),
        (x = t.child),
        (z = x.sibling),
        (n = nl(x, { mode: 'hidden', children: n.children })),
        (n.subtreeFlags = x.subtreeFlags & 65011712),
        z !== null ? (p = nl(z, p)) : ((p = cn(p, u, l, null)), (p.flags |= 2)),
        (p.return = e),
        (n.return = e),
        (n.sibling = p),
        (e.child = n),
        Za(null, n),
        (n = e.child),
        (p = t.child.memoizedState),
        p === null
          ? (p = ks(l))
          : ((u = p.cachePool),
            u !== null
              ? ((x = Zt._currentValue), (u = u.parent !== x ? { parent: x, pool: x } : u))
              : (u = wf()),
            (p = { baseLanes: p.baseLanes | l, cachePool: u })),
        (n.memoizedState = p),
        (n.childLanes = ws(t, f, l)),
        (e.memoizedState = Ds),
        Za(t.child, n))
      : (kl(e),
        (l = t.child),
        (t = l.sibling),
        (l = nl(l, { mode: 'visible', children: n.children })),
        (l.return = e),
        (l.sibling = null),
        t !== null &&
          ((f = e.deletions), f === null ? ((e.deletions = [t]), (e.flags |= 16)) : f.push(t)),
        (e.child = l),
        (e.memoizedState = null),
        l);
  }
  function Bs(t, e) {
    return ((e = hi({ mode: 'visible', children: e }, t.mode)), (e.return = t), (t.child = e));
  }
  function hi(t, e) {
    return ((t = Se(22, t, null, e)), (t.lanes = 0), t);
  }
  function Us(t, e, l) {
    return (
      hn(e, t.child, null, l),
      (t = Bs(e, e.pendingProps.children)),
      (t.flags |= 2),
      (e.memoizedState = null),
      t
    );
  }
  function $d(t, e, l) {
    t.lanes |= e;
    var n = t.alternate;
    (n !== null && (n.lanes |= e), Fc(t.return, e, l));
  }
  function Ls(t, e, l, n, u, c) {
    var f = t.memoizedState;
    f === null
      ? (t.memoizedState = {
          isBackwards: e,
          rendering: null,
          renderingStartTime: 0,
          last: n,
          tail: l,
          tailMode: u,
          treeForkCount: c,
        })
      : ((f.isBackwards = e),
        (f.rendering = null),
        (f.renderingStartTime = 0),
        (f.last = n),
        (f.tail = l),
        (f.tailMode = u),
        (f.treeForkCount = c));
  }
  function Jd(t, e, l) {
    var n = e.pendingProps,
      u = n.revealOrder,
      c = n.tail;
    n = n.children;
    var f = Vt.current,
      p = (f & 2) !== 0;
    if (
      (p ? ((f = (f & 1) | 2), (e.flags |= 128)) : (f &= 1),
      Q(Vt, f),
      ne(t, e, n, l),
      (n = gt ? Da : 0),
      !p && t !== null && (t.flags & 128) !== 0)
    )
      t: for (t = e.child; t !== null; ) {
        if (t.tag === 13) t.memoizedState !== null && $d(t, l, e);
        else if (t.tag === 19) $d(t, l, e);
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
          ((t = l.alternate), t !== null && li(t) === null && (u = l), (l = l.sibling));
        ((l = u),
          l === null ? ((u = e.child), (e.child = null)) : ((u = l.sibling), (l.sibling = null)),
          Ls(e, !1, u, l, c, n));
        break;
      case 'backwards':
      case 'unstable_legacy-backwards':
        for (l = null, u = e.child, e.child = null; u !== null; ) {
          if (((t = u.alternate), t !== null && li(t) === null)) {
            e.child = u;
            break;
          }
          ((t = u.sibling), (u.sibling = l), (l = u), (u = t));
        }
        Ls(e, !0, l, null, c, n);
        break;
      case 'together':
        Ls(e, !1, null, null, void 0, n);
        break;
      default:
        e.memoizedState = null;
    }
    return e.child;
  }
  function ol(t, e, l) {
    if (
      (t !== null && (e.dependencies = t.dependencies), (Ll |= e.lanes), (l & e.childLanes) === 0)
    )
      if (t !== null) {
        if ((qn(t, e, l, !1), (l & e.childLanes) === 0)) return null;
      } else return null;
    if (t !== null && e.child !== t.child) throw Error(s(153));
    if (e.child !== null) {
      for (t = e.child, l = nl(t, t.pendingProps), e.child = l, l.return = e; t.sibling !== null; )
        ((t = t.sibling), (l = l.sibling = nl(t, t.pendingProps)), (l.return = e));
      l.sibling = null;
    }
    return e.child;
  }
  function Hs(t, e) {
    return (t.lanes & e) !== 0 ? !0 : ((t = t.dependencies), !!(t !== null && $u(t)));
  }
  function j0(t, e, l) {
    switch (e.tag) {
      case 3:
        (ce(e, e.stateNode.containerInfo), jl(e, Zt, t.memoizedState.cache), sn());
        break;
      case 27:
      case 5:
        va(e);
        break;
      case 4:
        ce(e, e.stateNode.containerInfo);
        break;
      case 10:
        jl(e, e.type, e.memoizedProps.value);
        break;
      case 31:
        if (e.memoizedState !== null) return ((e.flags |= 128), rs(e), null);
        break;
      case 13:
        var n = e.memoizedState;
        if (n !== null)
          return n.dehydrated !== null
            ? (kl(e), (e.flags |= 128), null)
            : (l & e.child.childLanes) !== 0
              ? Kd(t, e, l)
              : (kl(e), (t = ol(t, e, l)), t !== null ? t.sibling : null);
        kl(e);
        break;
      case 19:
        var u = (t.flags & 128) !== 0;
        if (
          ((n = (l & e.childLanes) !== 0),
          n || (qn(t, e, l, !1), (n = (l & e.childLanes) !== 0)),
          u)
        ) {
          if (n) return Jd(t, e, l);
          e.flags |= 128;
        }
        if (
          ((u = e.memoizedState),
          u !== null && ((u.rendering = null), (u.tail = null), (u.lastEffect = null)),
          Q(Vt, Vt.current),
          n)
        )
          break;
        return null;
      case 22:
        return ((e.lanes = 0), Gd(t, e, l, e.pendingProps));
      case 24:
        jl(e, Zt, t.memoizedState.cache);
    }
    return ol(t, e, l);
  }
  function Id(t, e, l) {
    if (t !== null)
      if (t.memoizedProps !== e.pendingProps) $t = !0;
      else {
        if (!Hs(t, l) && (e.flags & 128) === 0) return (($t = !1), j0(t, e, l));
        $t = (t.flags & 131072) !== 0;
      }
    else (($t = !1), gt && (e.flags & 1048576) !== 0 && Cf(e, Da, e.index));
    switch (((e.lanes = 0), e.tag)) {
      case 16:
        t: {
          var n = e.pendingProps;
          if (((t = dn(e.elementType)), (e.type = t), typeof t == 'function'))
            Vc(t)
              ? ((n = yn(t, n)), (e.tag = 1), (e = Qd(null, e, t, n, l)))
              : ((e.tag = 0), (e = Os(null, e, t, n, l)));
          else {
            if (t != null) {
              var u = t.$$typeof;
              if (u === D) {
                ((e.tag = 11), (e = Ld(null, e, t, n, l)));
                break t;
              } else if (u === Z) {
                ((e.tag = 14), (e = Hd(null, e, t, n, l)));
                break t;
              }
            }
            throw ((e = Ht(t) || t), Error(s(306, e, '')));
          }
        }
        return e;
      case 0:
        return Os(t, e, e.type, e.pendingProps, l);
      case 1:
        return ((n = e.type), (u = yn(n, e.pendingProps)), Qd(t, e, n, u, l));
      case 3:
        t: {
          if ((ce(e, e.stateNode.containerInfo), t === null)) throw Error(s(387));
          n = e.pendingProps;
          var c = e.memoizedState;
          ((u = c.element), us(t, e), Ga(e, n, null, l));
          var f = e.memoizedState;
          if (
            ((n = f.cache),
            jl(e, Zt, n),
            n !== c.cache && Pc(e, [Zt], l, !0),
            qa(),
            (n = f.element),
            c.isDehydrated)
          )
            if (
              ((c = { element: n, isDehydrated: !1, cache: f.cache }),
              (e.updateQueue.baseState = c),
              (e.memoizedState = c),
              e.flags & 256)
            ) {
              e = Zd(t, e, n, l);
              break t;
            } else if (n !== u) {
              ((u = Oe(Error(s(424)), e)), ka(u), (e = Zd(t, e, n, l)));
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
                Dt = Ue(t.firstChild),
                  ee = e,
                  gt = !0,
                  Cl = null,
                  we = !0,
                  l = Gf(e, null, n, l),
                  e.child = l;
                l;
              )
                ((l.flags = (l.flags & -3) | 4096), (l = l.sibling));
            }
          else {
            if ((sn(), n === u)) {
              e = ol(t, e, l);
              break t;
            }
            ne(t, e, n, l);
          }
          e = e.child;
        }
        return e;
      case 26:
        return (
          mi(t, e),
          t === null
            ? (l = ch(e.type, null, e.pendingProps, null))
              ? (e.memoizedState = l)
              : gt ||
                ((l = e.type),
                (t = e.pendingProps),
                (n = ji(rt.current).createElement(l)),
                (n[te] = e),
                (n[re] = t),
                ae(n, l, t),
                Wt(n),
                (e.stateNode = n))
            : (e.memoizedState = ch(e.type, t.memoizedProps, e.pendingProps, t.memoizedState)),
          null
        );
      case 27:
        return (
          va(e),
          t === null &&
            gt &&
            ((n = e.stateNode = ah(e.type, e.pendingProps, rt.current)),
            (ee = e),
            (we = !0),
            (u = Dt),
            Xl(e.type) ? ((_o = u), (Dt = Ue(n.firstChild))) : (Dt = u)),
          ne(t, e, e.pendingProps.children, l),
          mi(t, e),
          t === null && (e.flags |= 4194304),
          e.child
        );
      case 5:
        return (
          t === null &&
            gt &&
            ((u = n = Dt) &&
              ((n = ig(n, e.type, e.pendingProps, we)),
              n !== null
                ? ((e.stateNode = n), (ee = e), (Dt = Ue(n.firstChild)), (we = !1), (u = !0))
                : (u = !1)),
            u || Rl(e)),
          va(e),
          (u = e.type),
          (c = e.pendingProps),
          (f = t !== null ? t.memoizedProps : null),
          (n = c.children),
          ho(u, c) ? (n = null) : f !== null && ho(u, f) && (e.flags |= 32),
          e.memoizedState !== null && ((u = ds(t, e, S0, null, null, l)), (cu._currentValue = u)),
          mi(t, e),
          ne(t, e, n, l),
          e.child
        );
      case 6:
        return (
          t === null &&
            gt &&
            ((t = l = Dt) &&
              ((l = cg(l, e.pendingProps, we)),
              l !== null ? ((e.stateNode = l), (ee = e), (Dt = null), (t = !0)) : (t = !1)),
            t || Rl(e)),
          null
        );
      case 13:
        return Kd(t, e, l);
      case 4:
        return (
          ce(e, e.stateNode.containerInfo),
          (n = e.pendingProps),
          t === null ? (e.child = hn(e, null, n, l)) : ne(t, e, n, l),
          e.child
        );
      case 11:
        return Ld(t, e, e.type, e.pendingProps, l);
      case 7:
        return (ne(t, e, e.pendingProps, l), e.child);
      case 8:
        return (ne(t, e, e.pendingProps.children, l), e.child);
      case 12:
        return (ne(t, e, e.pendingProps.children, l), e.child);
      case 10:
        return ((n = e.pendingProps), jl(e, e.type, n.value), ne(t, e, n.children, l), e.child);
      case 9:
        return (
          (u = e.type._context),
          (n = e.pendingProps.children),
          rn(e),
          (u = le(u)),
          (n = n(u)),
          (e.flags |= 1),
          ne(t, e, n, l),
          e.child
        );
      case 14:
        return Hd(t, e, e.type, e.pendingProps, l);
      case 15:
        return qd(t, e, e.type, e.pendingProps, l);
      case 19:
        return Jd(t, e, l);
      case 31:
        return R0(t, e, l);
      case 22:
        return Gd(t, e, l, e.pendingProps);
      case 24:
        return (
          rn(e),
          (n = le(Zt)),
          t === null
            ? ((u = ls()),
              u === null &&
                ((u = Ot),
                (c = ts()),
                (u.pooledCache = c),
                c.refCount++,
                c !== null && (u.pooledCacheLanes |= l),
                (u = c)),
              (e.memoizedState = { parent: n, cache: u }),
              as(e),
              jl(e, Zt, u))
            : ((t.lanes & l) !== 0 && (us(t, e), Ga(e, null, null, l), qa()),
              (u = t.memoizedState),
              (c = e.memoizedState),
              u.parent !== n
                ? ((u = { parent: n, cache: n }),
                  (e.memoizedState = u),
                  e.lanes === 0 && (e.memoizedState = e.updateQueue.baseState = u),
                  jl(e, Zt, n))
                : ((n = c.cache), jl(e, Zt, n), n !== u.cache && Pc(e, [Zt], l, !0))),
          ne(t, e, e.pendingProps.children, l),
          e.child
        );
      case 29:
        throw e.pendingProps;
    }
    throw Error(s(156, e.tag));
  }
  function rl(t) {
    t.flags |= 4;
  }
  function qs(t, e, l, n, u) {
    if (((e = (t.mode & 32) !== 0) && (e = !1), e)) {
      if (((t.flags |= 16777216), (u & 335544128) === u))
        if (t.stateNode.complete) t.flags |= 8192;
        else if (Em()) t.flags |= 8192;
        else throw ((mn = Fu), ns);
    } else t.flags &= -16777217;
  }
  function Wd(t, e) {
    if (e.type !== 'stylesheet' || (e.state.loading & 4) !== 0) t.flags &= -16777217;
    else if (((t.flags |= 16777216), !dh(e)))
      if (Em()) t.flags |= 8192;
      else throw ((mn = Fu), ns);
  }
  function pi(t, e) {
    (e !== null && (t.flags |= 4),
      t.flags & 16384 && ((e = t.tag !== 22 ? Rr() : 536870912), (t.lanes |= e), (Fn |= e)));
  }
  function Ka(t, e) {
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
  function z0(t, e, l) {
    var n = e.pendingProps;
    switch (($c(e), e.tag)) {
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
          il(Zt),
          Xt(),
          l.pendingContext && ((l.context = l.pendingContext), (l.pendingContext = null)),
          (t === null || t.child === null) &&
            (Hn(e)
              ? rl(e)
              : t === null ||
                (t.memoizedState.isDehydrated && (e.flags & 256) === 0) ||
                ((e.flags |= 1024), Ic())),
          kt(e),
          null
        );
      case 26:
        var u = e.type,
          c = e.memoizedState;
        return (
          t === null
            ? (rl(e), c !== null ? (kt(e), Wd(e, c)) : (kt(e), qs(e, u, null, n, l)))
            : c
              ? c !== t.memoizedState
                ? (rl(e), kt(e), Wd(e, c))
                : (kt(e), (e.flags &= -16777217))
              : ((t = t.memoizedProps), t !== n && rl(e), kt(e), qs(e, u, t, n, l)),
          null
        );
      case 27:
        if ((Au(e), (l = rt.current), (u = e.type), t !== null && e.stateNode != null))
          t.memoizedProps !== n && rl(e);
        else {
          if (!n) {
            if (e.stateNode === null) throw Error(s(166));
            return (kt(e), null);
          }
          ((t = $.current), Hn(e) ? jf(e) : ((t = ah(u, n, l)), (e.stateNode = t), rl(e)));
        }
        return (kt(e), null);
      case 5:
        if ((Au(e), (u = e.type), t !== null && e.stateNode != null))
          t.memoizedProps !== n && rl(e);
        else {
          if (!n) {
            if (e.stateNode === null) throw Error(s(166));
            return (kt(e), null);
          }
          if (((c = $.current), Hn(e))) jf(e);
          else {
            var f = ji(rt.current);
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
            ((c[te] = e), (c[re] = n));
            t: for (f = e.child; f !== null; ) {
              if (f.tag === 5 || f.tag === 6) c.appendChild(f.stateNode);
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
            e.stateNode = c;
            t: switch ((ae(c, u, n), u)) {
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
            n && rl(e);
          }
        }
        return (kt(e), qs(e, e.type, t === null ? null : t.memoizedProps, e.pendingProps, l), null);
      case 6:
        if (t && e.stateNode != null) t.memoizedProps !== n && rl(e);
        else {
          if (typeof n != 'string' && e.stateNode === null) throw Error(s(166));
          if (((t = rt.current), Hn(e))) {
            if (((t = e.stateNode), (l = e.memoizedProps), (n = null), (u = ee), u !== null))
              switch (u.tag) {
                case 27:
                case 5:
                  n = u.memoizedProps;
              }
            ((t[te] = e),
              (t = !!(
                t.nodeValue === l ||
                (n !== null && n.suppressHydrationWarning === !0) ||
                Km(t.nodeValue, l)
              )),
              t || Rl(e, !0));
          } else ((t = ji(t).createTextNode(n)), (t[te] = e), (e.stateNode = t));
        }
        return (kt(e), null);
      case 31:
        if (((l = e.memoizedState), t === null || t.memoizedState !== null)) {
          if (((n = Hn(e)), l !== null)) {
            if (t === null) {
              if (!n) throw Error(s(318));
              if (((t = e.memoizedState), (t = t !== null ? t.dehydrated : null), !t))
                throw Error(s(557));
              t[te] = e;
            } else (sn(), (e.flags & 128) === 0 && (e.memoizedState = null), (e.flags |= 4));
            (kt(e), (t = !1));
          } else
            ((l = Ic()),
              t !== null && t.memoizedState !== null && (t.memoizedState.hydrationErrors = l),
              (t = !0));
          if (!t) return e.flags & 256 ? (Ee(e), e) : (Ee(e), null);
          if ((e.flags & 128) !== 0) throw Error(s(558));
        }
        return (kt(e), null);
      case 13:
        if (
          ((n = e.memoizedState),
          t === null || (t.memoizedState !== null && t.memoizedState.dehydrated !== null))
        ) {
          if (((u = Hn(e)), n !== null && n.dehydrated !== null)) {
            if (t === null) {
              if (!u) throw Error(s(318));
              if (((u = e.memoizedState), (u = u !== null ? u.dehydrated : null), !u))
                throw Error(s(317));
              u[te] = e;
            } else (sn(), (e.flags & 128) === 0 && (e.memoizedState = null), (e.flags |= 4));
            (kt(e), (u = !1));
          } else
            ((u = Ic()),
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
                (c = null),
                n.memoizedState !== null &&
                  n.memoizedState.cachePool !== null &&
                  (c = n.memoizedState.cachePool.pool),
                c !== u && (n.flags |= 2048)),
              l !== t && l && (e.child.flags |= 8192),
              pi(e, e.updateQueue),
              kt(e),
              null)
        );
      case 4:
        return (Xt(), t === null && so(e.stateNode.containerInfo), kt(e), null);
      case 10:
        return (il(e.type), kt(e), null);
      case 19:
        if ((w(Vt), (n = e.memoizedState), n === null)) return (kt(e), null);
        if (((u = (e.flags & 128) !== 0), (c = n.rendering), c === null))
          if (u) Ka(n, !1);
          else {
            if (Yt !== 0 || (t !== null && (t.flags & 128) !== 0))
              for (t = e.child; t !== null; ) {
                if (((c = li(t)), c !== null)) {
                  for (
                    e.flags |= 128,
                      Ka(n, !1),
                      t = c.updateQueue,
                      e.updateQueue = t,
                      pi(e, t),
                      e.subtreeFlags = 0,
                      t = l,
                      l = e.child;
                    l !== null;
                  )
                    (Nf(l, t), (l = l.sibling));
                  return (Q(Vt, (Vt.current & 1) | 2), gt && al(e, n.treeForkCount), e.child);
                }
                t = t.sibling;
              }
            n.tail !== null &&
              ge() > bi &&
              ((e.flags |= 128), (u = !0), Ka(n, !1), (e.lanes = 4194304));
          }
        else {
          if (!u)
            if (((t = li(c)), t !== null)) {
              if (
                ((e.flags |= 128),
                (u = !0),
                (t = t.updateQueue),
                (e.updateQueue = t),
                pi(e, t),
                Ka(n, !0),
                n.tail === null && n.tailMode === 'hidden' && !c.alternate && !gt)
              )
                return (kt(e), null);
            } else
              2 * ge() - n.renderingStartTime > bi &&
                l !== 536870912 &&
                ((e.flags |= 128), (u = !0), Ka(n, !1), (e.lanes = 4194304));
          n.isBackwards
            ? ((c.sibling = e.child), (e.child = c))
            : ((t = n.last), t !== null ? (t.sibling = c) : (e.child = c), (n.last = c));
        }
        return n.tail !== null
          ? ((t = n.tail),
            (n.rendering = t),
            (n.tail = t.sibling),
            (n.renderingStartTime = ge()),
            (t.sibling = null),
            (l = Vt.current),
            Q(Vt, u ? (l & 1) | 2 : l & 1),
            gt && al(e, n.treeForkCount),
            t)
          : (kt(e), null);
      case 22:
      case 23:
        return (
          Ee(e),
          os(),
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
          l !== null && pi(e, l.retryQueue),
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
          t !== null && w(fn),
          null
        );
      case 24:
        return (
          (l = null),
          t !== null && (l = t.memoizedState.cache),
          e.memoizedState.cache !== l && (e.flags |= 2048),
          il(Zt),
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
  function O0(t, e) {
    switch (($c(e), e.tag)) {
      case 1:
        return ((t = e.flags), t & 65536 ? ((e.flags = (t & -65537) | 128), e) : null);
      case 3:
        return (
          il(Zt),
          Xt(),
          (t = e.flags),
          (t & 65536) !== 0 && (t & 128) === 0 ? ((e.flags = (t & -65537) | 128), e) : null
        );
      case 26:
      case 27:
      case 5:
        return (Au(e), null);
      case 31:
        if (e.memoizedState !== null) {
          if ((Ee(e), e.alternate === null)) throw Error(s(340));
          sn();
        }
        return ((t = e.flags), t & 65536 ? ((e.flags = (t & -65537) | 128), e) : null);
      case 13:
        if ((Ee(e), (t = e.memoizedState), t !== null && t.dehydrated !== null)) {
          if (e.alternate === null) throw Error(s(340));
          sn();
        }
        return ((t = e.flags), t & 65536 ? ((e.flags = (t & -65537) | 128), e) : null);
      case 19:
        return (w(Vt), null);
      case 4:
        return (Xt(), null);
      case 10:
        return (il(e.type), null);
      case 22:
      case 23:
        return (
          Ee(e),
          os(),
          t !== null && w(fn),
          (t = e.flags),
          t & 65536 ? ((e.flags = (t & -65537) | 128), e) : null
        );
      case 24:
        return (il(Zt), null);
      case 25:
        return null;
      default:
        return null;
    }
  }
  function Fd(t, e) {
    switch (($c(e), e.tag)) {
      case 3:
        (il(Zt), Xt());
        break;
      case 26:
      case 27:
      case 5:
        Au(e);
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
        w(Vt);
        break;
      case 10:
        il(e.type);
        break;
      case 22:
      case 23:
        (Ee(e), os(), t !== null && w(fn));
        break;
      case 24:
        il(Zt);
    }
  }
  function $a(t, e) {
    try {
      var l = e.updateQueue,
        n = l !== null ? l.lastEffect : null;
      if (n !== null) {
        var u = n.next;
        l = u;
        do {
          if ((l.tag & t) === t) {
            n = void 0;
            var c = l.create,
              f = l.inst;
            ((n = c()), (f.destroy = n));
          }
          l = l.next;
        } while (l !== u);
      }
    } catch (p) {
      Mt(e, e.return, p);
    }
  }
  function Bl(t, e, l) {
    try {
      var n = e.updateQueue,
        u = n !== null ? n.lastEffect : null;
      if (u !== null) {
        var c = u.next;
        n = c;
        do {
          if ((n.tag & t) === t) {
            var f = n.inst,
              p = f.destroy;
            if (p !== void 0) {
              ((f.destroy = void 0), (u = e));
              var x = l,
                z = p;
              try {
                z();
              } catch (U) {
                Mt(u, x, U);
              }
            }
          }
          n = n.next;
        } while (n !== c);
      }
    } catch (U) {
      Mt(e, e.return, U);
    }
  }
  function Pd(t) {
    var e = t.updateQueue;
    if (e !== null) {
      var l = t.stateNode;
      try {
        Xf(e, l);
      } catch (n) {
        Mt(t, t.return, n);
      }
    }
  }
  function tm(t, e, l) {
    ((l.props = yn(t.type, t.memoizedProps)), (l.state = t.memoizedState));
    try {
      l.componentWillUnmount();
    } catch (n) {
      Mt(t, e, n);
    }
  }
  function Ja(t, e) {
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
      Mt(t, e, u);
    }
  }
  function Ie(t, e) {
    var l = t.ref,
      n = t.refCleanup;
    if (l !== null)
      if (typeof n == 'function')
        try {
          n();
        } catch (u) {
          Mt(t, e, u);
        } finally {
          ((t.refCleanup = null), (t = t.alternate), t != null && (t.refCleanup = null));
        }
      else if (typeof l == 'function')
        try {
          l(null);
        } catch (u) {
          Mt(t, e, u);
        }
      else l.current = null;
  }
  function em(t) {
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
      Mt(t, t.return, u);
    }
  }
  function Gs(t, e, l) {
    try {
      var n = t.stateNode;
      (tg(n, t.type, l, e), (n[re] = e));
    } catch (u) {
      Mt(t, t.return, u);
    }
  }
  function lm(t) {
    return (
      t.tag === 5 || t.tag === 3 || t.tag === 26 || (t.tag === 27 && Xl(t.type)) || t.tag === 4
    );
  }
  function Ys(t) {
    t: for (;;) {
      for (; t.sibling === null; ) {
        if (t.return === null || lm(t.return)) return null;
        t = t.return;
      }
      for (
        t.sibling.return = t.return, t = t.sibling;
        t.tag !== 5 && t.tag !== 6 && t.tag !== 18;
      ) {
        if ((t.tag === 27 && Xl(t.type)) || t.flags & 2 || t.child === null || t.tag === 4)
          continue t;
        ((t.child.return = t), (t = t.child));
      }
      if (!(t.flags & 2)) return t.stateNode;
    }
  }
  function Xs(t, e, l) {
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
            l != null || e.onclick !== null || (e.onclick = el)));
    else if (
      n !== 4 &&
      (n === 27 && Xl(t.type) && ((l = t.stateNode), (e = null)), (t = t.child), t !== null)
    )
      for (Xs(t, e, l), t = t.sibling; t !== null; ) (Xs(t, e, l), (t = t.sibling));
  }
  function yi(t, e, l) {
    var n = t.tag;
    if (n === 5 || n === 6) ((t = t.stateNode), e ? l.insertBefore(t, e) : l.appendChild(t));
    else if (n !== 4 && (n === 27 && Xl(t.type) && (l = t.stateNode), (t = t.child), t !== null))
      for (yi(t, e, l), t = t.sibling; t !== null; ) (yi(t, e, l), (t = t.sibling));
  }
  function nm(t) {
    var e = t.stateNode,
      l = t.memoizedProps;
    try {
      for (var n = t.type, u = e.attributes; u.length; ) e.removeAttributeNode(u[0]);
      (ae(e, n, l), (e[te] = t), (e[re] = l));
    } catch (c) {
      Mt(t, t.return, c);
    }
  }
  var fl = !1,
    Jt = !1,
    Vs = !1,
    am = typeof WeakSet == 'function' ? WeakSet : Set,
    Ft = null;
  function D0(t, e) {
    if (((t = t.containerInfo), (fo = Ui), (t = yf(t)), Uc(t))) {
      if ('selectionStart' in t) var l = { start: t.selectionStart, end: t.selectionEnd };
      else
        t: {
          l = ((l = t.ownerDocument) && l.defaultView) || window;
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
              break t;
            }
            var f = 0,
              p = -1,
              x = -1,
              z = 0,
              U = 0,
              X = t,
              O = null;
            e: for (;;) {
              for (
                var B;
                X !== l || (u !== 0 && X.nodeType !== 3) || (p = f + u),
                  X !== c || (n !== 0 && X.nodeType !== 3) || (x = f + n),
                  X.nodeType === 3 && (f += X.nodeValue.length),
                  (B = X.firstChild) !== null;
              )
                ((O = X), (X = B));
              for (;;) {
                if (X === t) break e;
                if (
                  (O === l && ++z === u && (p = f),
                  O === c && ++U === n && (x = f),
                  (B = X.nextSibling) !== null)
                )
                  break;
                ((X = O), (O = X.parentNode));
              }
              X = B;
            }
            l = p === -1 || x === -1 ? null : { start: p, end: x };
          } else l = null;
        }
      l = l || { start: 0, end: 0 };
    } else l = null;
    for (mo = { focusedElem: t, selectionRange: l }, Ui = !1, Ft = e; Ft !== null; )
      if (((e = Ft), (t = e.child), (e.subtreeFlags & 1028) !== 0 && t !== null))
        ((t.return = e), (Ft = t));
      else
        for (; Ft !== null; ) {
          switch (((e = Ft), (c = e.alternate), (t = e.flags), e.tag)) {
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
              if ((t & 1024) !== 0 && c !== null) {
                ((t = void 0),
                  (l = e),
                  (u = c.memoizedProps),
                  (c = c.memoizedState),
                  (n = l.stateNode));
                try {
                  var W = yn(l.type, u);
                  ((t = n.getSnapshotBeforeUpdate(W, c)),
                    (n.__reactInternalSnapshotBeforeUpdate = t));
                } catch (at) {
                  Mt(l, l.return, at);
                }
              }
              break;
            case 3:
              if ((t & 1024) !== 0) {
                if (((t = e.stateNode.containerInfo), (l = t.nodeType), l === 9)) yo(t);
                else if (l === 1)
                  switch (t.nodeName) {
                    case 'HEAD':
                    case 'HTML':
                    case 'BODY':
                      yo(t);
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
  function um(t, e, l) {
    var n = l.flags;
    switch (l.tag) {
      case 0:
      case 11:
      case 15:
        (ml(t, l), n & 4 && $a(5, l));
        break;
      case 1:
        if ((ml(t, l), n & 4))
          if (((t = l.stateNode), e === null))
            try {
              t.componentDidMount();
            } catch (f) {
              Mt(l, l.return, f);
            }
          else {
            var u = yn(l.type, e.memoizedProps);
            e = e.memoizedState;
            try {
              t.componentDidUpdate(u, e, t.__reactInternalSnapshotBeforeUpdate);
            } catch (f) {
              Mt(l, l.return, f);
            }
          }
        (n & 64 && Pd(l), n & 512 && Ja(l, l.return));
        break;
      case 3:
        if ((ml(t, l), n & 64 && ((t = l.updateQueue), t !== null))) {
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
            Xf(t, e);
          } catch (f) {
            Mt(l, l.return, f);
          }
        }
        break;
      case 27:
        e === null && n & 4 && nm(l);
      case 26:
      case 5:
        (ml(t, l), e === null && n & 4 && em(l), n & 512 && Ja(l, l.return));
        break;
      case 12:
        ml(t, l);
        break;
      case 31:
        (ml(t, l), n & 4 && sm(t, l));
        break;
      case 13:
        (ml(t, l),
          n & 4 && om(t, l),
          n & 64 &&
            ((t = l.memoizedState),
            t !== null && ((t = t.dehydrated), t !== null && ((l = Y0.bind(null, l)), sg(t, l)))));
        break;
      case 22:
        if (((n = l.memoizedState !== null || fl), !n)) {
          ((e = (e !== null && e.memoizedState !== null) || Jt), (u = fl));
          var c = Jt;
          ((fl = n),
            (Jt = e) && !c ? hl(t, l, (l.subtreeFlags & 8772) !== 0) : ml(t, l),
            (fl = u),
            (Jt = c));
        }
        break;
      case 30:
        break;
      default:
        ml(t, l);
    }
  }
  function im(t) {
    var e = t.alternate;
    (e !== null && ((t.alternate = null), im(e)),
      (t.child = null),
      (t.deletions = null),
      (t.sibling = null),
      t.tag === 5 && ((e = t.stateNode), e !== null && bc(e)),
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
    de = !1;
  function dl(t, e, l) {
    for (l = l.child; l !== null; ) (cm(t, e, l), (l = l.sibling));
  }
  function cm(t, e, l) {
    if (ve && typeof ve.onCommitFiberUnmount == 'function')
      try {
        ve.onCommitFiberUnmount(_a, l);
      } catch {}
    switch (l.tag) {
      case 26:
        (Jt || Ie(l, e),
          dl(t, e, l),
          l.memoizedState
            ? l.memoizedState.count--
            : l.stateNode && ((l = l.stateNode), l.parentNode.removeChild(l)));
        break;
      case 27:
        Jt || Ie(l, e);
        var n = wt,
          u = de;
        (Xl(l.type) && ((wt = l.stateNode), (de = !1)),
          dl(t, e, l),
          au(l.stateNode),
          (wt = n),
          (de = u));
        break;
      case 5:
        Jt || Ie(l, e);
      case 6:
        if (((n = wt), (u = de), (wt = null), dl(t, e, l), (wt = n), (de = u), wt !== null))
          if (de)
            try {
              (wt.nodeType === 9
                ? wt.body
                : wt.nodeName === 'HTML'
                  ? wt.ownerDocument.body
                  : wt
              ).removeChild(l.stateNode);
            } catch (c) {
              Mt(l, e, c);
            }
          else
            try {
              wt.removeChild(l.stateNode);
            } catch (c) {
              Mt(l, e, c);
            }
        break;
      case 18:
        wt !== null &&
          (de
            ? ((t = wt),
              Pm(
                t.nodeType === 9 ? t.body : t.nodeName === 'HTML' ? t.ownerDocument.body : t,
                l.stateNode
              ),
              ia(t))
            : Pm(wt, l.stateNode));
        break;
      case 4:
        ((n = wt),
          (u = de),
          (wt = l.stateNode.containerInfo),
          (de = !0),
          dl(t, e, l),
          (wt = n),
          (de = u));
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        (Bl(2, l, e), Jt || Bl(4, l, e), dl(t, e, l));
        break;
      case 1:
        (Jt ||
          (Ie(l, e), (n = l.stateNode), typeof n.componentWillUnmount == 'function' && tm(l, e, n)),
          dl(t, e, l));
        break;
      case 21:
        dl(t, e, l);
        break;
      case 22:
        ((Jt = (n = Jt) || l.memoizedState !== null), dl(t, e, l), (Jt = n));
        break;
      default:
        dl(t, e, l);
    }
  }
  function sm(t, e) {
    if (
      e.memoizedState === null &&
      ((t = e.alternate), t !== null && ((t = t.memoizedState), t !== null))
    ) {
      t = t.dehydrated;
      try {
        ia(t);
      } catch (l) {
        Mt(e, e.return, l);
      }
    }
  }
  function om(t, e) {
    if (
      e.memoizedState === null &&
      ((t = e.alternate),
      t !== null && ((t = t.memoizedState), t !== null && ((t = t.dehydrated), t !== null)))
    )
      try {
        ia(t);
      } catch (l) {
        Mt(e, e.return, l);
      }
  }
  function k0(t) {
    switch (t.tag) {
      case 31:
      case 13:
      case 19:
        var e = t.stateNode;
        return (e === null && (e = t.stateNode = new am()), e);
      case 22:
        return (
          (t = t.stateNode),
          (e = t._retryCache),
          e === null && (e = t._retryCache = new am()),
          e
        );
      default:
        throw Error(s(435, t.tag));
    }
  }
  function gi(t, e) {
    var l = k0(t);
    e.forEach(function (n) {
      if (!l.has(n)) {
        l.add(n);
        var u = X0.bind(null, t, n);
        n.then(u, u);
      }
    });
  }
  function me(t, e) {
    var l = e.deletions;
    if (l !== null)
      for (var n = 0; n < l.length; n++) {
        var u = l[n],
          c = t,
          f = e,
          p = f;
        t: for (; p !== null; ) {
          switch (p.tag) {
            case 27:
              if (Xl(p.type)) {
                ((wt = p.stateNode), (de = !1));
                break t;
              }
              break;
            case 5:
              ((wt = p.stateNode), (de = !1));
              break t;
            case 3:
            case 4:
              ((wt = p.stateNode.containerInfo), (de = !0));
              break t;
          }
          p = p.return;
        }
        if (wt === null) throw Error(s(160));
        (cm(c, f, u),
          (wt = null),
          (de = !1),
          (c = u.alternate),
          c !== null && (c.return = null),
          (u.return = null));
      }
    if (e.subtreeFlags & 13886) for (e = e.child; e !== null; ) (rm(e, t), (e = e.sibling));
  }
  var Ye = null;
  function rm(t, e) {
    var l = t.alternate,
      n = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        (me(e, t), he(t), n & 4 && (Bl(3, t, t.return), $a(3, t), Bl(5, t, t.return)));
        break;
      case 1:
        (me(e, t),
          he(t),
          n & 512 && (Jt || l === null || Ie(l, l.return)),
          n & 64 &&
            fl &&
            ((t = t.updateQueue),
            t !== null &&
              ((n = t.callbacks),
              n !== null &&
                ((l = t.shared.hiddenCallbacks),
                (t.shared.hiddenCallbacks = l === null ? n : l.concat(n))))));
        break;
      case 26:
        var u = Ye;
        if ((me(e, t), he(t), n & 512 && (Jt || l === null || Ie(l, l.return)), n & 4)) {
          var c = l !== null ? l.memoizedState : null;
          if (((n = t.memoizedState), l === null))
            if (n === null)
              if (t.stateNode === null) {
                t: {
                  ((n = t.type), (l = t.memoizedProps), (u = u.ownerDocument || u));
                  e: switch (n) {
                    case 'title':
                      ((c = u.getElementsByTagName('title')[0]),
                        (!c ||
                          c[xa] ||
                          c[te] ||
                          c.namespaceURI === 'http://www.w3.org/2000/svg' ||
                          c.hasAttribute('itemprop')) &&
                          ((c = u.createElement(n)),
                          u.head.insertBefore(c, u.querySelector('head > title'))),
                        ae(c, n, l),
                        (c[te] = t),
                        Wt(c),
                        (n = c));
                      break t;
                    case 'link':
                      var f = rh('link', 'href', u).get(n + (l.href || ''));
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
                            break e;
                          }
                      }
                      ((c = u.createElement(n)), ae(c, n, l), u.head.appendChild(c));
                      break;
                    case 'meta':
                      if ((f = rh('meta', 'content', u).get(n + (l.content || '')))) {
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
                            break e;
                          }
                      }
                      ((c = u.createElement(n)), ae(c, n, l), u.head.appendChild(c));
                      break;
                    default:
                      throw Error(s(468, n));
                  }
                  ((c[te] = t), Wt(c), (n = c));
                }
                t.stateNode = n;
              } else fh(u, t.type, t.stateNode);
            else t.stateNode = oh(u, n, t.memoizedProps);
          else
            c !== n
              ? (c === null
                  ? l.stateNode !== null && ((l = l.stateNode), l.parentNode.removeChild(l))
                  : c.count--,
                n === null ? fh(u, t.type, t.stateNode) : oh(u, n, t.memoizedProps))
              : n === null && t.stateNode !== null && Gs(t, t.memoizedProps, l.memoizedProps);
        }
        break;
      case 27:
        (me(e, t),
          he(t),
          n & 512 && (Jt || l === null || Ie(l, l.return)),
          l !== null && n & 4 && Gs(t, t.memoizedProps, l.memoizedProps));
        break;
      case 5:
        if ((me(e, t), he(t), n & 512 && (Jt || l === null || Ie(l, l.return)), t.flags & 32)) {
          u = t.stateNode;
          try {
            Rn(u, '');
          } catch (W) {
            Mt(t, t.return, W);
          }
        }
        (n & 4 &&
          t.stateNode != null &&
          ((u = t.memoizedProps), Gs(t, u, l !== null ? l.memoizedProps : u)),
          n & 1024 && (Vs = !0));
        break;
      case 6:
        if ((me(e, t), he(t), n & 4)) {
          if (t.stateNode === null) throw Error(s(162));
          ((n = t.memoizedProps), (l = t.stateNode));
          try {
            l.nodeValue = n;
          } catch (W) {
            Mt(t, t.return, W);
          }
        }
        break;
      case 3:
        if (
          ((Di = null),
          (u = Ye),
          (Ye = zi(e.containerInfo)),
          me(e, t),
          (Ye = u),
          he(t),
          n & 4 && l !== null && l.memoizedState.isDehydrated)
        )
          try {
            ia(e.containerInfo);
          } catch (W) {
            Mt(t, t.return, W);
          }
        Vs && ((Vs = !1), fm(t));
        break;
      case 4:
        ((n = Ye), (Ye = zi(t.stateNode.containerInfo)), me(e, t), he(t), (Ye = n));
        break;
      case 12:
        (me(e, t), he(t));
        break;
      case 31:
        (me(e, t),
          he(t),
          n & 4 && ((n = t.updateQueue), n !== null && ((t.updateQueue = null), gi(t, n))));
        break;
      case 13:
        (me(e, t),
          he(t),
          t.child.flags & 8192 &&
            (t.memoizedState !== null) != (l !== null && l.memoizedState !== null) &&
            (_i = ge()),
          n & 4 && ((n = t.updateQueue), n !== null && ((t.updateQueue = null), gi(t, n))));
        break;
      case 22:
        u = t.memoizedState !== null;
        var x = l !== null && l.memoizedState !== null,
          z = fl,
          U = Jt;
        if (((fl = z || u), (Jt = U || x), me(e, t), (Jt = U), (fl = z), he(t), n & 8192))
          t: for (
            e = t.stateNode,
              e._visibility = u ? e._visibility & -2 : e._visibility | 1,
              u && (l === null || x || fl || Jt || gn(t)),
              l = null,
              e = t;
            ;
          ) {
            if (e.tag === 5 || e.tag === 26) {
              if (l === null) {
                x = l = e;
                try {
                  if (((c = x.stateNode), u))
                    ((f = c.style),
                      typeof f.setProperty == 'function'
                        ? f.setProperty('display', 'none', 'important')
                        : (f.display = 'none'));
                  else {
                    p = x.stateNode;
                    var X = x.memoizedProps.style,
                      O = X != null && X.hasOwnProperty('display') ? X.display : null;
                    p.style.display = O == null || typeof O == 'boolean' ? '' : ('' + O).trim();
                  }
                } catch (W) {
                  Mt(x, x.return, W);
                }
              }
            } else if (e.tag === 6) {
              if (l === null) {
                x = e;
                try {
                  x.stateNode.nodeValue = u ? '' : x.memoizedProps;
                } catch (W) {
                  Mt(x, x.return, W);
                }
              }
            } else if (e.tag === 18) {
              if (l === null) {
                x = e;
                try {
                  var B = x.stateNode;
                  u ? th(B, !0) : th(x.stateNode, !1);
                } catch (W) {
                  Mt(x, x.return, W);
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
          n !== null && ((l = n.retryQueue), l !== null && ((n.retryQueue = null), gi(t, l))));
        break;
      case 19:
        (me(e, t),
          he(t),
          n & 4 && ((n = t.updateQueue), n !== null && ((t.updateQueue = null), gi(t, n))));
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
          if (lm(n)) {
            l = n;
            break;
          }
          n = n.return;
        }
        if (l == null) throw Error(s(160));
        switch (l.tag) {
          case 27:
            var u = l.stateNode,
              c = Ys(t);
            yi(t, c, u);
            break;
          case 5:
            var f = l.stateNode;
            l.flags & 32 && (Rn(f, ''), (l.flags &= -33));
            var p = Ys(t);
            yi(t, p, f);
            break;
          case 3:
          case 4:
            var x = l.stateNode.containerInfo,
              z = Ys(t);
            Xs(t, z, x);
            break;
          default:
            throw Error(s(161));
        }
      } catch (U) {
        Mt(t, t.return, U);
      }
      t.flags &= -3;
    }
    e & 4096 && (t.flags &= -4097);
  }
  function fm(t) {
    if (t.subtreeFlags & 1024)
      for (t = t.child; t !== null; ) {
        var e = t;
        (fm(e), e.tag === 5 && e.flags & 1024 && e.stateNode.reset(), (t = t.sibling));
      }
  }
  function ml(t, e) {
    if (e.subtreeFlags & 8772)
      for (e = e.child; e !== null; ) (um(t, e.alternate, e), (e = e.sibling));
  }
  function gn(t) {
    for (t = t.child; t !== null; ) {
      var e = t;
      switch (e.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          (Bl(4, e, e.return), gn(e));
          break;
        case 1:
          Ie(e, e.return);
          var l = e.stateNode;
          (typeof l.componentWillUnmount == 'function' && tm(e, e.return, l), gn(e));
          break;
        case 27:
          au(e.stateNode);
        case 26:
        case 5:
          (Ie(e, e.return), gn(e));
          break;
        case 22:
          e.memoizedState === null && gn(e);
          break;
        case 30:
          gn(e);
          break;
        default:
          gn(e);
      }
      t = t.sibling;
    }
  }
  function hl(t, e, l) {
    for (l = l && (e.subtreeFlags & 8772) !== 0, e = e.child; e !== null; ) {
      var n = e.alternate,
        u = t,
        c = e,
        f = c.flags;
      switch (c.tag) {
        case 0:
        case 11:
        case 15:
          (hl(u, c, l), $a(4, c));
          break;
        case 1:
          if ((hl(u, c, l), (n = c), (u = n.stateNode), typeof u.componentDidMount == 'function'))
            try {
              u.componentDidMount();
            } catch (z) {
              Mt(n, n.return, z);
            }
          if (((n = c), (u = n.updateQueue), u !== null)) {
            var p = n.stateNode;
            try {
              var x = u.shared.hiddenCallbacks;
              if (x !== null)
                for (u.shared.hiddenCallbacks = null, u = 0; u < x.length; u++) Yf(x[u], p);
            } catch (z) {
              Mt(n, n.return, z);
            }
          }
          (l && f & 64 && Pd(c), Ja(c, c.return));
          break;
        case 27:
          nm(c);
        case 26:
        case 5:
          (hl(u, c, l), l && n === null && f & 4 && em(c), Ja(c, c.return));
          break;
        case 12:
          hl(u, c, l);
          break;
        case 31:
          (hl(u, c, l), l && f & 4 && sm(u, c));
          break;
        case 13:
          (hl(u, c, l), l && f & 4 && om(u, c));
          break;
        case 22:
          (c.memoizedState === null && hl(u, c, l), Ja(c, c.return));
          break;
        case 30:
          break;
        default:
          hl(u, c, l);
      }
      e = e.sibling;
    }
  }
  function Qs(t, e) {
    var l = null;
    (t !== null &&
      t.memoizedState !== null &&
      t.memoizedState.cachePool !== null &&
      (l = t.memoizedState.cachePool.pool),
      (t = null),
      e.memoizedState !== null &&
        e.memoizedState.cachePool !== null &&
        (t = e.memoizedState.cachePool.pool),
      t !== l && (t != null && t.refCount++, l != null && wa(l)));
  }
  function Zs(t, e) {
    ((t = null),
      e.alternate !== null && (t = e.alternate.memoizedState.cache),
      (e = e.memoizedState.cache),
      e !== t && (e.refCount++, t != null && wa(t)));
  }
  function Xe(t, e, l, n) {
    if (e.subtreeFlags & 10256) for (e = e.child; e !== null; ) (dm(t, e, l, n), (e = e.sibling));
  }
  function dm(t, e, l, n) {
    var u = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        (Xe(t, e, l, n), u & 2048 && $a(9, e));
        break;
      case 1:
        Xe(t, e, l, n);
        break;
      case 3:
        (Xe(t, e, l, n),
          u & 2048 &&
            ((t = null),
            e.alternate !== null && (t = e.alternate.memoizedState.cache),
            (e = e.memoizedState.cache),
            e !== t && (e.refCount++, t != null && wa(t))));
        break;
      case 12:
        if (u & 2048) {
          (Xe(t, e, l, n), (t = e.stateNode));
          try {
            var c = e.memoizedProps,
              f = c.id,
              p = c.onPostCommit;
            typeof p == 'function' &&
              p(f, e.alternate === null ? 'mount' : 'update', t.passiveEffectDuration, -0);
          } catch (x) {
            Mt(e, e.return, x);
          }
        } else Xe(t, e, l, n);
        break;
      case 31:
        Xe(t, e, l, n);
        break;
      case 13:
        Xe(t, e, l, n);
        break;
      case 23:
        break;
      case 22:
        ((c = e.stateNode),
          (f = e.alternate),
          e.memoizedState !== null
            ? c._visibility & 2
              ? Xe(t, e, l, n)
              : Ia(t, e)
            : c._visibility & 2
              ? Xe(t, e, l, n)
              : ((c._visibility |= 2), Jn(t, e, l, n, (e.subtreeFlags & 10256) !== 0 || !1)),
          u & 2048 && Qs(f, e));
        break;
      case 24:
        (Xe(t, e, l, n), u & 2048 && Zs(e.alternate, e));
        break;
      default:
        Xe(t, e, l, n);
    }
  }
  function Jn(t, e, l, n, u) {
    for (u = u && ((e.subtreeFlags & 10256) !== 0 || !1), e = e.child; e !== null; ) {
      var c = t,
        f = e,
        p = l,
        x = n,
        z = f.flags;
      switch (f.tag) {
        case 0:
        case 11:
        case 15:
          (Jn(c, f, p, x, u), $a(8, f));
          break;
        case 23:
          break;
        case 22:
          var U = f.stateNode;
          (f.memoizedState !== null
            ? U._visibility & 2
              ? Jn(c, f, p, x, u)
              : Ia(c, f)
            : ((U._visibility |= 2), Jn(c, f, p, x, u)),
            u && z & 2048 && Qs(f.alternate, f));
          break;
        case 24:
          (Jn(c, f, p, x, u), u && z & 2048 && Zs(f.alternate, f));
          break;
        default:
          Jn(c, f, p, x, u);
      }
      e = e.sibling;
    }
  }
  function Ia(t, e) {
    if (e.subtreeFlags & 10256)
      for (e = e.child; e !== null; ) {
        var l = t,
          n = e,
          u = n.flags;
        switch (n.tag) {
          case 22:
            (Ia(l, n), u & 2048 && Qs(n.alternate, n));
            break;
          case 24:
            (Ia(l, n), u & 2048 && Zs(n.alternate, n));
            break;
          default:
            Ia(l, n);
        }
        e = e.sibling;
      }
  }
  var Wa = 8192;
  function In(t, e, l) {
    if (t.subtreeFlags & Wa) for (t = t.child; t !== null; ) (mm(t, e, l), (t = t.sibling));
  }
  function mm(t, e, l) {
    switch (t.tag) {
      case 26:
        (In(t, e, l),
          t.flags & Wa && t.memoizedState !== null && bg(l, Ye, t.memoizedState, t.memoizedProps));
        break;
      case 5:
        In(t, e, l);
        break;
      case 3:
      case 4:
        var n = Ye;
        ((Ye = zi(t.stateNode.containerInfo)), In(t, e, l), (Ye = n));
        break;
      case 22:
        t.memoizedState === null &&
          ((n = t.alternate),
          n !== null && n.memoizedState !== null
            ? ((n = Wa), (Wa = 16777216), In(t, e, l), (Wa = n))
            : In(t, e, l));
        break;
      default:
        In(t, e, l);
    }
  }
  function hm(t) {
    var e = t.alternate;
    if (e !== null && ((t = e.child), t !== null)) {
      e.child = null;
      do ((e = t.sibling), (t.sibling = null), (t = e));
      while (t !== null);
    }
  }
  function Fa(t) {
    var e = t.deletions;
    if ((t.flags & 16) !== 0) {
      if (e !== null)
        for (var l = 0; l < e.length; l++) {
          var n = e[l];
          ((Ft = n), ym(n, t));
        }
      hm(t);
    }
    if (t.subtreeFlags & 10256) for (t = t.child; t !== null; ) (pm(t), (t = t.sibling));
  }
  function pm(t) {
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        (Fa(t), t.flags & 2048 && Bl(9, t, t.return));
        break;
      case 3:
        Fa(t);
        break;
      case 12:
        Fa(t);
        break;
      case 22:
        var e = t.stateNode;
        t.memoizedState !== null && e._visibility & 2 && (t.return === null || t.return.tag !== 13)
          ? ((e._visibility &= -3), vi(t))
          : Fa(t);
        break;
      default:
        Fa(t);
    }
  }
  function vi(t) {
    var e = t.deletions;
    if ((t.flags & 16) !== 0) {
      if (e !== null)
        for (var l = 0; l < e.length; l++) {
          var n = e[l];
          ((Ft = n), ym(n, t));
        }
      hm(t);
    }
    for (t = t.child; t !== null; ) {
      switch (((e = t), e.tag)) {
        case 0:
        case 11:
        case 15:
          (Bl(8, e, e.return), vi(e));
          break;
        case 22:
          ((l = e.stateNode), l._visibility & 2 && ((l._visibility &= -3), vi(e)));
          break;
        default:
          vi(e);
      }
      t = t.sibling;
    }
  }
  function ym(t, e) {
    for (; Ft !== null; ) {
      var l = Ft;
      switch (l.tag) {
        case 0:
        case 11:
        case 15:
          Bl(8, l, e);
          break;
        case 23:
        case 22:
          if (l.memoizedState !== null && l.memoizedState.cachePool !== null) {
            var n = l.memoizedState.cachePool.pool;
            n != null && n.refCount++;
          }
          break;
        case 24:
          wa(l.memoizedState.cache);
      }
      if (((n = l.child), n !== null)) ((n.return = l), (Ft = n));
      else
        t: for (l = t; Ft !== null; ) {
          n = Ft;
          var u = n.sibling,
            c = n.return;
          if ((im(n), n === l)) {
            Ft = null;
            break t;
          }
          if (u !== null) {
            ((u.return = c), (Ft = u));
            break t;
          }
          Ft = c;
        }
    }
  }
  var w0 = {
      getCacheForType: function (t) {
        var e = le(Zt),
          l = e.data.get(t);
        return (l === void 0 && ((l = t()), e.data.set(t, l)), l);
      },
      cacheSignal: function () {
        return le(Zt).controller.signal;
      },
    },
    B0 = typeof WeakMap == 'function' ? WeakMap : Map,
    xt = 0,
    Ot = null,
    mt = null,
    pt = 0,
    At = 0,
    Te = null,
    Ul = !1,
    Wn = !1,
    Ks = !1,
    pl = 0,
    Yt = 0,
    Ll = 0,
    vn = 0,
    $s = 0,
    Ne = 0,
    Fn = 0,
    Pa = null,
    pe = null,
    Js = !1,
    _i = 0,
    gm = 0,
    bi = 1 / 0,
    Si = null,
    Hl = null,
    It = 0,
    ql = null,
    Pn = null,
    yl = 0,
    Is = 0,
    Ws = null,
    vm = null,
    tu = 0,
    Fs = null;
  function Ae() {
    return (xt & 2) !== 0 && pt !== 0 ? pt & -pt : L.T !== null ? ao() : Dr();
  }
  function _m() {
    if (Ne === 0)
      if ((pt & 536870912) === 0 || gt) {
        var t = Ru;
        ((Ru <<= 1), (Ru & 3932160) === 0 && (Ru = 262144), (Ne = t));
      } else Ne = 536870912;
    return ((t = xe.current), t !== null && (t.flags |= 32), Ne);
  }
  function ye(t, e, l) {
    (((t === Ot && (At === 2 || At === 9)) || t.cancelPendingCommit !== null) &&
      (ta(t, 0), Gl(t, pt, Ne, !1)),
      Sa(t, l),
      ((xt & 2) === 0 || t !== Ot) &&
        (t === Ot && ((xt & 2) === 0 && (vn |= l), Yt === 4 && Gl(t, pt, Ne, !1)), We(t)));
  }
  function bm(t, e, l) {
    if ((xt & 6) !== 0) throw Error(s(327));
    var n = (!l && (e & 127) === 0 && (e & t.expiredLanes) === 0) || ba(t, e),
      u = n ? H0(t, e) : to(t, e, !0),
      c = n;
    do {
      if (u === 0) {
        Wn && !n && Gl(t, e, 0, !1);
        break;
      } else {
        if (((l = t.current.alternate), c && !U0(l))) {
          ((u = to(t, e, !1)), (c = !1));
          continue;
        }
        if (u === 2) {
          if (((c = e), t.errorRecoveryDisabledLanes & c)) var f = 0;
          else
            ((f = t.pendingLanes & -536870913), (f = f !== 0 ? f : f & 536870912 ? 536870912 : 0));
          if (f !== 0) {
            e = f;
            t: {
              var p = t;
              u = Pa;
              var x = p.current.memoizedState.isDehydrated;
              if ((x && (ta(p, f).flags |= 256), (f = to(p, f, !1)), f !== 2)) {
                if (Ks && !x) {
                  ((p.errorRecoveryDisabledLanes |= c), (vn |= c), (u = 4));
                  break t;
                }
                ((c = pe), (pe = u), c !== null && (pe === null ? (pe = c) : pe.push.apply(pe, c)));
              }
              u = f;
            }
            if (((c = !1), u !== 2)) continue;
          }
        }
        if (u === 1) {
          (ta(t, 0), Gl(t, e, 0, !0));
          break;
        }
        t: {
          switch (((n = t), (c = u), c)) {
            case 0:
            case 1:
              throw Error(s(345));
            case 4:
              if ((e & 4194048) !== e) break;
            case 6:
              Gl(n, e, Ne, !Ul);
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
          if ((e & 62914560) === e && ((u = _i + 300 - ge()), 10 < u)) {
            if ((Gl(n, e, Ne, !Ul), zu(n, 0, !0) !== 0)) break t;
            ((yl = e),
              (n.timeoutHandle = Wm(
                Sm.bind(null, n, l, pe, Si, Js, e, Ne, vn, Fn, Ul, c, 'Throttled', -0, 0),
                u
              )));
            break t;
          }
          Sm(n, l, pe, Si, Js, e, Ne, vn, Fn, Ul, c, null, -0, 0);
        }
      }
      break;
    } while (!0);
    We(t);
  }
  function Sm(t, e, l, n, u, c, f, p, x, z, U, X, O, B) {
    if (((t.timeoutHandle = -1), (X = e.subtreeFlags), X & 8192 || (X & 16785408) === 16785408)) {
      ((X = {
        stylesheets: null,
        count: 0,
        imgCount: 0,
        imgBytes: 0,
        suspenseyImages: [],
        waitingForImages: !0,
        waitingForViewTransition: !1,
        unsuspend: el,
      }),
        mm(e, c, X));
      var W = (c & 62914560) === c ? _i - ge() : (c & 4194048) === c ? gm - ge() : 0;
      if (((W = Sg(X, W)), W !== null)) {
        ((yl = c),
          (t.cancelPendingCommit = W(Rm.bind(null, t, e, c, l, n, u, f, p, x, U, X, null, O, B))),
          Gl(t, c, f, !z));
        return;
      }
    }
    Rm(t, e, c, l, n, u, f, p, x);
  }
  function U0(t) {
    for (var e = t; ; ) {
      var l = e.tag;
      if (
        (l === 0 || l === 11 || l === 15) &&
        e.flags & 16384 &&
        ((l = e.updateQueue), l !== null && ((l = l.stores), l !== null))
      )
        for (var n = 0; n < l.length; n++) {
          var u = l[n],
            c = u.getSnapshot;
          u = u.value;
          try {
            if (!be(c(), u)) return !1;
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
  function Gl(t, e, l, n) {
    ((e &= ~$s),
      (e &= ~vn),
      (t.suspendedLanes |= e),
      (t.pingedLanes &= ~e),
      n && (t.warmLanes |= e),
      (n = t.expirationTimes));
    for (var u = e; 0 < u; ) {
      var c = 31 - _e(u),
        f = 1 << c;
      ((n[c] = -1), (u &= ~f));
    }
    l !== 0 && jr(t, l, e);
  }
  function xi() {
    return (xt & 6) === 0 ? (eu(0), !1) : !0;
  }
  function Ps() {
    if (mt !== null) {
      if (At === 0) var t = mt.return;
      else ((t = mt), (ul = on = null), ps(t), (Vn = null), (Ua = 0), (t = mt));
      for (; t !== null; ) (Fd(t.alternate, t), (t = t.return));
      mt = null;
    }
  }
  function ta(t, e) {
    var l = t.timeoutHandle;
    (l !== -1 && ((t.timeoutHandle = -1), ng(l)),
      (l = t.cancelPendingCommit),
      l !== null && ((t.cancelPendingCommit = null), l()),
      (yl = 0),
      Ps(),
      (Ot = t),
      (mt = l = nl(t.current, null)),
      (pt = e),
      (At = 0),
      (Te = null),
      (Ul = !1),
      (Wn = ba(t, e)),
      (Ks = !1),
      (Fn = Ne = $s = vn = Ll = Yt = 0),
      (pe = Pa = null),
      (Js = !1),
      (e & 8) !== 0 && (e |= e & 32));
    var n = t.entangledLanes;
    if (n !== 0)
      for (t = t.entanglements, n &= e; 0 < n; ) {
        var u = 31 - _e(n),
          c = 1 << u;
        ((e |= t[u]), (n &= ~c));
      }
    return ((pl = e), Xu(), l);
  }
  function xm(t, e) {
    ((ft = null),
      (L.H = Qa),
      e === Xn || e === Wu
        ? ((e = Lf()), (At = 3))
        : e === ns
          ? ((e = Lf()), (At = 4))
          : (At =
              e === zs
                ? 8
                : e !== null && typeof e == 'object' && typeof e.then == 'function'
                  ? 6
                  : 1),
      (Te = e),
      mt === null && ((Yt = 1), fi(t, Oe(e, t.current))));
  }
  function Em() {
    var t = xe.current;
    return t === null
      ? !0
      : (pt & 4194048) === pt
        ? Be === null
        : (pt & 62914560) === pt || (pt & 536870912) !== 0
          ? t === Be
          : !1;
  }
  function Tm() {
    var t = L.H;
    return ((L.H = Qa), t === null ? Qa : t);
  }
  function Nm() {
    var t = L.A;
    return ((L.A = w0), t);
  }
  function Ei() {
    ((Yt = 4),
      Ul || ((pt & 4194048) !== pt && xe.current !== null) || (Wn = !0),
      ((Ll & 134217727) === 0 && (vn & 134217727) === 0) || Ot === null || Gl(Ot, pt, Ne, !1));
  }
  function to(t, e, l) {
    var n = xt;
    xt |= 2;
    var u = Tm(),
      c = Nm();
    ((Ot !== t || pt !== e) && ((Si = null), ta(t, e)), (e = !1));
    var f = Yt;
    t: do
      try {
        if (At !== 0 && mt !== null) {
          var p = mt,
            x = Te;
          switch (At) {
            case 8:
              (Ps(), (f = 6));
              break t;
            case 3:
            case 2:
            case 9:
            case 6:
              xe.current === null && (e = !0);
              var z = At;
              if (((At = 0), (Te = null), ea(t, p, x, z), l && Wn)) {
                f = 0;
                break t;
              }
              break;
            default:
              ((z = At), (At = 0), (Te = null), ea(t, p, x, z));
          }
        }
        (L0(), (f = Yt));
        break;
      } catch (U) {
        xm(t, U);
      }
    while (!0);
    return (
      e && t.shellSuspendCounter++,
      (ul = on = null),
      (xt = n),
      (L.H = u),
      (L.A = c),
      mt === null && ((Ot = null), (pt = 0), Xu()),
      f
    );
  }
  function L0() {
    for (; mt !== null; ) Am(mt);
  }
  function H0(t, e) {
    var l = xt;
    xt |= 2;
    var n = Tm(),
      u = Nm();
    Ot !== t || pt !== e ? ((Si = null), (bi = ge() + 500), ta(t, e)) : (Wn = ba(t, e));
    t: do
      try {
        if (At !== 0 && mt !== null) {
          e = mt;
          var c = Te;
          e: switch (At) {
            case 1:
              ((At = 0), (Te = null), ea(t, e, c, 1));
              break;
            case 2:
            case 9:
              if (Bf(c)) {
                ((At = 0), (Te = null), Mm(e));
                break;
              }
              ((e = function () {
                ((At !== 2 && At !== 9) || Ot !== t || (At = 7), We(t));
              }),
                c.then(e, e));
              break t;
            case 3:
              At = 7;
              break t;
            case 4:
              At = 5;
              break t;
            case 7:
              Bf(c) ? ((At = 0), (Te = null), Mm(e)) : ((At = 0), (Te = null), ea(t, e, c, 7));
              break;
            case 5:
              var f = null;
              switch (mt.tag) {
                case 26:
                  f = mt.memoizedState;
                case 5:
                case 27:
                  var p = mt;
                  if (f ? dh(f) : p.stateNode.complete) {
                    ((At = 0), (Te = null));
                    var x = p.sibling;
                    if (x !== null) mt = x;
                    else {
                      var z = p.return;
                      z !== null ? ((mt = z), Ti(z)) : (mt = null);
                    }
                    break e;
                  }
              }
              ((At = 0), (Te = null), ea(t, e, c, 5));
              break;
            case 6:
              ((At = 0), (Te = null), ea(t, e, c, 6));
              break;
            case 8:
              (Ps(), (Yt = 6));
              break t;
            default:
              throw Error(s(462));
          }
        }
        q0();
        break;
      } catch (U) {
        xm(t, U);
      }
    while (!0);
    return (
      (ul = on = null),
      (L.H = n),
      (L.A = u),
      (xt = l),
      mt !== null ? 0 : ((Ot = null), (pt = 0), Xu(), Yt)
    );
  }
  function q0() {
    for (; mt !== null && !oy(); ) Am(mt);
  }
  function Am(t) {
    var e = Id(t.alternate, t, pl);
    ((t.memoizedProps = t.pendingProps), e === null ? Ti(t) : (mt = e));
  }
  function Mm(t) {
    var e = t,
      l = e.alternate;
    switch (e.tag) {
      case 15:
      case 0:
        e = Vd(l, e, e.pendingProps, e.type, void 0, pt);
        break;
      case 11:
        e = Vd(l, e, e.pendingProps, e.type.render, e.ref, pt);
        break;
      case 5:
        ps(e);
      default:
        (Fd(l, e), (e = mt = Nf(e, pl)), (e = Id(l, e, pl)));
    }
    ((t.memoizedProps = t.pendingProps), e === null ? Ti(t) : (mt = e));
  }
  function ea(t, e, l, n) {
    ((ul = on = null), ps(e), (Vn = null), (Ua = 0));
    var u = e.return;
    try {
      if (C0(t, u, e, l, pt)) {
        ((Yt = 1), fi(t, Oe(l, t.current)), (mt = null));
        return;
      }
    } catch (c) {
      if (u !== null) throw ((mt = u), c);
      ((Yt = 1), fi(t, Oe(l, t.current)), (mt = null));
      return;
    }
    e.flags & 32768
      ? (gt || n === 1
          ? (t = !0)
          : Wn || (pt & 536870912) !== 0
            ? (t = !1)
            : ((Ul = t = !0),
              (n === 2 || n === 9 || n === 3 || n === 6) &&
                ((n = xe.current), n !== null && n.tag === 13 && (n.flags |= 16384))),
        Cm(e, t))
      : Ti(e);
  }
  function Ti(t) {
    var e = t;
    do {
      if ((e.flags & 32768) !== 0) {
        Cm(e, Ul);
        return;
      }
      t = e.return;
      var l = z0(e.alternate, e, pl);
      if (l !== null) {
        mt = l;
        return;
      }
      if (((e = e.sibling), e !== null)) {
        mt = e;
        return;
      }
      mt = e = t;
    } while (e !== null);
    Yt === 0 && (Yt = 5);
  }
  function Cm(t, e) {
    do {
      var l = O0(t.alternate, t);
      if (l !== null) {
        ((l.flags &= 32767), (mt = l));
        return;
      }
      if (
        ((l = t.return),
        l !== null && ((l.flags |= 32768), (l.subtreeFlags = 0), (l.deletions = null)),
        !e && ((t = t.sibling), t !== null))
      ) {
        mt = t;
        return;
      }
      mt = t = l;
    } while (t !== null);
    ((Yt = 6), (mt = null));
  }
  function Rm(t, e, l, n, u, c, f, p, x) {
    t.cancelPendingCommit = null;
    do Ni();
    while (It !== 0);
    if ((xt & 6) !== 0) throw Error(s(327));
    if (e !== null) {
      if (e === t.current) throw Error(s(177));
      if (
        ((c = e.lanes | e.childLanes),
        (c |= Yc),
        _y(t, l, c, f, p, x),
        t === Ot && ((mt = Ot = null), (pt = 0)),
        (Pn = e),
        (ql = t),
        (yl = l),
        (Is = c),
        (Ws = u),
        (vm = n),
        (e.subtreeFlags & 10256) !== 0 || (e.flags & 10256) !== 0
          ? ((t.callbackNode = null),
            (t.callbackPriority = 0),
            V0(Mu, function () {
              return (km(), null);
            }))
          : ((t.callbackNode = null), (t.callbackPriority = 0)),
        (n = (e.flags & 13878) !== 0),
        (e.subtreeFlags & 13878) !== 0 || n)
      ) {
        ((n = L.T), (L.T = null), (u = J.p), (J.p = 2), (f = xt), (xt |= 4));
        try {
          D0(t, e, l);
        } finally {
          ((xt = f), (J.p = u), (L.T = n));
        }
      }
      ((It = 1), jm(), zm(), Om());
    }
  }
  function jm() {
    if (It === 1) {
      It = 0;
      var t = ql,
        e = Pn,
        l = (e.flags & 13878) !== 0;
      if ((e.subtreeFlags & 13878) !== 0 || l) {
        ((l = L.T), (L.T = null));
        var n = J.p;
        J.p = 2;
        var u = xt;
        xt |= 4;
        try {
          rm(e, t);
          var c = mo,
            f = yf(t.containerInfo),
            p = c.focusedElem,
            x = c.selectionRange;
          if (f !== p && p && p.ownerDocument && pf(p.ownerDocument.documentElement, p)) {
            if (x !== null && Uc(p)) {
              var z = x.start,
                U = x.end;
              if ((U === void 0 && (U = z), 'selectionStart' in p))
                ((p.selectionStart = z), (p.selectionEnd = Math.min(U, p.value.length)));
              else {
                var X = p.ownerDocument || document,
                  O = (X && X.defaultView) || window;
                if (O.getSelection) {
                  var B = O.getSelection(),
                    W = p.textContent.length,
                    at = Math.min(x.start, W),
                    zt = x.end === void 0 ? at : Math.min(x.end, W);
                  !B.extend && at > zt && ((f = zt), (zt = at), (at = f));
                  var C = hf(p, at),
                    T = hf(p, zt);
                  if (
                    C &&
                    T &&
                    (B.rangeCount !== 1 ||
                      B.anchorNode !== C.node ||
                      B.anchorOffset !== C.offset ||
                      B.focusNode !== T.node ||
                      B.focusOffset !== T.offset)
                  ) {
                    var j = X.createRange();
                    (j.setStart(C.node, C.offset),
                      B.removeAllRanges(),
                      at > zt
                        ? (B.addRange(j), B.extend(T.node, T.offset))
                        : (j.setEnd(T.node, T.offset), B.addRange(j)));
                  }
                }
              }
            }
            for (X = [], B = p; (B = B.parentNode); )
              B.nodeType === 1 && X.push({ element: B, left: B.scrollLeft, top: B.scrollTop });
            for (typeof p.focus == 'function' && p.focus(), p = 0; p < X.length; p++) {
              var Y = X[p];
              ((Y.element.scrollLeft = Y.left), (Y.element.scrollTop = Y.top));
            }
          }
          ((Ui = !!fo), (mo = fo = null));
        } finally {
          ((xt = u), (J.p = n), (L.T = l));
        }
      }
      ((t.current = e), (It = 2));
    }
  }
  function zm() {
    if (It === 2) {
      It = 0;
      var t = ql,
        e = Pn,
        l = (e.flags & 8772) !== 0;
      if ((e.subtreeFlags & 8772) !== 0 || l) {
        ((l = L.T), (L.T = null));
        var n = J.p;
        J.p = 2;
        var u = xt;
        xt |= 4;
        try {
          um(t, e.alternate, e);
        } finally {
          ((xt = u), (J.p = n), (L.T = l));
        }
      }
      It = 3;
    }
  }
  function Om() {
    if (It === 4 || It === 3) {
      ((It = 0), ry());
      var t = ql,
        e = Pn,
        l = yl,
        n = vm;
      (e.subtreeFlags & 10256) !== 0 || (e.flags & 10256) !== 0
        ? (It = 5)
        : ((It = 0), (Pn = ql = null), Dm(t, t.pendingLanes));
      var u = t.pendingLanes;
      if (
        (u === 0 && (Hl = null),
        vc(l),
        (e = e.stateNode),
        ve && typeof ve.onCommitFiberRoot == 'function')
      )
        try {
          ve.onCommitFiberRoot(_a, e, void 0, (e.current.flags & 128) === 128);
        } catch {}
      if (n !== null) {
        ((e = L.T), (u = J.p), (J.p = 2), (L.T = null));
        try {
          for (var c = t.onRecoverableError, f = 0; f < n.length; f++) {
            var p = n[f];
            c(p.value, { componentStack: p.stack });
          }
        } finally {
          ((L.T = e), (J.p = u));
        }
      }
      ((yl & 3) !== 0 && Ni(),
        We(t),
        (u = t.pendingLanes),
        (l & 261930) !== 0 && (u & 42) !== 0 ? (t === Fs ? tu++ : ((tu = 0), (Fs = t))) : (tu = 0),
        eu(0));
    }
  }
  function Dm(t, e) {
    (t.pooledCacheLanes &= e) === 0 &&
      ((e = t.pooledCache), e != null && ((t.pooledCache = null), wa(e)));
  }
  function Ni() {
    return (jm(), zm(), Om(), km());
  }
  function km() {
    if (It !== 5) return !1;
    var t = ql,
      e = Is;
    Is = 0;
    var l = vc(yl),
      n = L.T,
      u = J.p;
    try {
      ((J.p = 32 > l ? 32 : l), (L.T = null), (l = Ws), (Ws = null));
      var c = ql,
        f = yl;
      if (((It = 0), (Pn = ql = null), (yl = 0), (xt & 6) !== 0)) throw Error(s(331));
      var p = xt;
      if (
        ((xt |= 4),
        pm(c.current),
        dm(c, c.current, f, l),
        (xt = p),
        eu(0, !1),
        ve && typeof ve.onPostCommitFiberRoot == 'function')
      )
        try {
          ve.onPostCommitFiberRoot(_a, c);
        } catch {}
      return !0;
    } finally {
      ((J.p = u), (L.T = n), Dm(t, e));
    }
  }
  function wm(t, e, l) {
    ((e = Oe(l, e)),
      (e = js(t.stateNode, e, 2)),
      (t = Dl(t, e, 2)),
      t !== null && (Sa(t, 2), We(t)));
  }
  function Mt(t, e, l) {
    if (t.tag === 3) wm(t, t, l);
    else
      for (; e !== null; ) {
        if (e.tag === 3) {
          wm(e, t, l);
          break;
        } else if (e.tag === 1) {
          var n = e.stateNode;
          if (
            typeof e.type.getDerivedStateFromError == 'function' ||
            (typeof n.componentDidCatch == 'function' && (Hl === null || !Hl.has(n)))
          ) {
            ((t = Oe(l, t)),
              (l = Bd(2)),
              (n = Dl(e, l, 2)),
              n !== null && (Ud(l, n, e, t), Sa(n, 2), We(n)));
            break;
          }
        }
        e = e.return;
      }
  }
  function eo(t, e, l) {
    var n = t.pingCache;
    if (n === null) {
      n = t.pingCache = new B0();
      var u = new Set();
      n.set(e, u);
    } else ((u = n.get(e)), u === void 0 && ((u = new Set()), n.set(e, u)));
    u.has(l) || ((Ks = !0), u.add(l), (t = G0.bind(null, t, e, l)), e.then(t, t));
  }
  function G0(t, e, l) {
    var n = t.pingCache;
    (n !== null && n.delete(e),
      (t.pingedLanes |= t.suspendedLanes & l),
      (t.warmLanes &= ~l),
      Ot === t &&
        (pt & l) === l &&
        (Yt === 4 || (Yt === 3 && (pt & 62914560) === pt && 300 > ge() - _i)
          ? (xt & 2) === 0 && ta(t, 0)
          : ($s |= l),
        Fn === pt && (Fn = 0)),
      We(t));
  }
  function Bm(t, e) {
    (e === 0 && (e = Rr()), (t = un(t, e)), t !== null && (Sa(t, e), We(t)));
  }
  function Y0(t) {
    var e = t.memoizedState,
      l = 0;
    (e !== null && (l = e.retryLane), Bm(t, l));
  }
  function X0(t, e) {
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
    (n !== null && n.delete(e), Bm(t, l));
  }
  function V0(t, e) {
    return hc(t, e);
  }
  var Ai = null,
    la = null,
    lo = !1,
    Mi = !1,
    no = !1,
    Yl = 0;
  function We(t) {
    (t !== la && t.next === null && (la === null ? (Ai = la = t) : (la = la.next = t)),
      (Mi = !0),
      lo || ((lo = !0), Z0()));
  }
  function eu(t, e) {
    if (!no && Mi) {
      no = !0;
      do
        for (var l = !1, n = Ai; n !== null; ) {
          if (t !== 0) {
            var u = n.pendingLanes;
            if (u === 0) var c = 0;
            else {
              var f = n.suspendedLanes,
                p = n.pingedLanes;
              ((c = (1 << (31 - _e(42 | t) + 1)) - 1),
                (c &= u & ~(f & ~p)),
                (c = c & 201326741 ? (c & 201326741) | 1 : c ? c | 2 : 0));
            }
            c !== 0 && ((l = !0), qm(n, c));
          } else
            ((c = pt),
              (c = zu(
                n,
                n === Ot ? c : 0,
                n.cancelPendingCommit !== null || n.timeoutHandle !== -1
              )),
              (c & 3) === 0 || ba(n, c) || ((l = !0), qm(n, c)));
          n = n.next;
        }
      while (l);
      no = !1;
    }
  }
  function Q0() {
    Um();
  }
  function Um() {
    Mi = lo = !1;
    var t = 0;
    Yl !== 0 && lg() && (t = Yl);
    for (var e = ge(), l = null, n = Ai; n !== null; ) {
      var u = n.next,
        c = Lm(n, e);
      (c === 0
        ? ((n.next = null), l === null ? (Ai = u) : (l.next = u), u === null && (la = l))
        : ((l = n), (t !== 0 || (c & 3) !== 0) && (Mi = !0)),
        (n = u));
    }
    ((It !== 0 && It !== 5) || eu(t), Yl !== 0 && (Yl = 0));
  }
  function Lm(t, e) {
    for (
      var l = t.suspendedLanes,
        n = t.pingedLanes,
        u = t.expirationTimes,
        c = t.pendingLanes & -62914561;
      0 < c;
    ) {
      var f = 31 - _e(c),
        p = 1 << f,
        x = u[f];
      (x === -1
        ? ((p & l) === 0 || (p & n) !== 0) && (u[f] = vy(p, e))
        : x <= e && (t.expiredLanes |= p),
        (c &= ~p));
    }
    if (
      ((e = Ot),
      (l = pt),
      (l = zu(t, t === e ? l : 0, t.cancelPendingCommit !== null || t.timeoutHandle !== -1)),
      (n = t.callbackNode),
      l === 0 || (t === e && (At === 2 || At === 9)) || t.cancelPendingCommit !== null)
    )
      return (n !== null && n !== null && pc(n), (t.callbackNode = null), (t.callbackPriority = 0));
    if ((l & 3) === 0 || ba(t, l)) {
      if (((e = l & -l), e === t.callbackPriority)) return e;
      switch ((n !== null && pc(n), vc(l))) {
        case 2:
        case 8:
          l = Mr;
          break;
        case 32:
          l = Mu;
          break;
        case 268435456:
          l = Cr;
          break;
        default:
          l = Mu;
      }
      return (
        (n = Hm.bind(null, t)),
        (l = hc(l, n)),
        (t.callbackPriority = e),
        (t.callbackNode = l),
        e
      );
    }
    return (
      n !== null && n !== null && pc(n),
      (t.callbackPriority = 2),
      (t.callbackNode = null),
      2
    );
  }
  function Hm(t, e) {
    if (It !== 0 && It !== 5) return ((t.callbackNode = null), (t.callbackPriority = 0), null);
    var l = t.callbackNode;
    if (Ni() && t.callbackNode !== l) return null;
    var n = pt;
    return (
      (n = zu(t, t === Ot ? n : 0, t.cancelPendingCommit !== null || t.timeoutHandle !== -1)),
      n === 0
        ? null
        : (bm(t, n, e),
          Lm(t, ge()),
          t.callbackNode != null && t.callbackNode === l ? Hm.bind(null, t) : null)
    );
  }
  function qm(t, e) {
    if (Ni()) return null;
    bm(t, e, !0);
  }
  function Z0() {
    ag(function () {
      (xt & 6) !== 0 ? hc(Ar, Q0) : Um();
    });
  }
  function ao() {
    if (Yl === 0) {
      var t = Gn;
      (t === 0 && ((t = Cu), (Cu <<= 1), (Cu & 261888) === 0 && (Cu = 256)), (Yl = t));
    }
    return Yl;
  }
  function Gm(t) {
    return t == null || typeof t == 'symbol' || typeof t == 'boolean'
      ? null
      : typeof t == 'function'
        ? t
        : wu('' + t);
  }
  function Ym(t, e) {
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
  function K0(t, e, l, n, u) {
    if (e === 'submit' && l && l.stateNode === u) {
      var c = Gm((u[re] || null).action),
        f = n.submitter;
      f &&
        ((e = (e = f[re] || null) ? Gm(e.formAction) : f.getAttribute('formAction')),
        e !== null && ((c = e), (f = null)));
      var p = new Hu('action', 'action', null, n, u);
      t.push({
        event: p,
        listeners: [
          {
            instance: null,
            listener: function () {
              if (n.defaultPrevented) {
                if (Yl !== 0) {
                  var x = f ? Ym(u, f) : new FormData(u);
                  Ts(l, { pending: !0, data: x, method: u.method, action: c }, null, x);
                }
              } else
                typeof c == 'function' &&
                  (p.preventDefault(),
                  (x = f ? Ym(u, f) : new FormData(u)),
                  Ts(l, { pending: !0, data: x, method: u.method, action: c }, c, x));
            },
            currentTarget: u,
          },
        ],
      });
    }
  }
  for (var uo = 0; uo < Gc.length; uo++) {
    var io = Gc[uo],
      $0 = io.toLowerCase(),
      J0 = io[0].toUpperCase() + io.slice(1);
    Ge($0, 'on' + J0);
  }
  (Ge(_f, 'onAnimationEnd'),
    Ge(bf, 'onAnimationIteration'),
    Ge(Sf, 'onAnimationStart'),
    Ge('dblclick', 'onDoubleClick'),
    Ge('focusin', 'onFocus'),
    Ge('focusout', 'onBlur'),
    Ge(f0, 'onTransitionRun'),
    Ge(d0, 'onTransitionStart'),
    Ge(m0, 'onTransitionCancel'),
    Ge(xf, 'onTransitionEnd'),
    Mn('onMouseEnter', ['mouseout', 'mouseover']),
    Mn('onMouseLeave', ['mouseout', 'mouseover']),
    Mn('onPointerEnter', ['pointerout', 'pointerover']),
    Mn('onPointerLeave', ['pointerout', 'pointerover']),
    en('onChange', 'change click focusin focusout input keydown keyup selectionchange'.split(' ')),
    en(
      'onSelect',
      'focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange'.split(
        ' '
      )
    ),
    en('onBeforeInput', ['compositionend', 'keypress', 'textInput', 'paste']),
    en('onCompositionEnd', 'compositionend focusout keydown keypress keyup mousedown'.split(' ')),
    en(
      'onCompositionStart',
      'compositionstart focusout keydown keypress keyup mousedown'.split(' ')
    ),
    en(
      'onCompositionUpdate',
      'compositionupdate focusout keydown keypress keyup mousedown'.split(' ')
    ));
  var lu =
      'abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting'.split(
        ' '
      ),
    I0 = new Set(
      'beforetoggle cancel close invalid load scroll scrollend toggle'.split(' ').concat(lu)
    );
  function Xm(t, e) {
    e = (e & 4) !== 0;
    for (var l = 0; l < t.length; l++) {
      var n = t[l],
        u = n.event;
      n = n.listeners;
      t: {
        var c = void 0;
        if (e)
          for (var f = n.length - 1; 0 <= f; f--) {
            var p = n[f],
              x = p.instance,
              z = p.currentTarget;
            if (((p = p.listener), x !== c && u.isPropagationStopped())) break t;
            ((c = p), (u.currentTarget = z));
            try {
              c(u);
            } catch (U) {
              Yu(U);
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
              break t;
            ((c = p), (u.currentTarget = z));
            try {
              c(u);
            } catch (U) {
              Yu(U);
            }
            ((u.currentTarget = null), (c = x));
          }
      }
    }
  }
  function ht(t, e) {
    var l = e[_c];
    l === void 0 && (l = e[_c] = new Set());
    var n = t + '__bubble';
    l.has(n) || (Vm(e, t, 2, !1), l.add(n));
  }
  function co(t, e, l) {
    var n = 0;
    (e && (n |= 4), Vm(l, t, n, e));
  }
  var Ci = '_reactListening' + Math.random().toString(36).slice(2);
  function so(t) {
    if (!t[Ci]) {
      ((t[Ci] = !0),
        Br.forEach(function (l) {
          l !== 'selectionchange' && (I0.has(l) || co(l, !1, t), co(l, !0, t));
        }));
      var e = t.nodeType === 9 ? t : t.ownerDocument;
      e === null || e[Ci] || ((e[Ci] = !0), co('selectionchange', !1, e));
    }
  }
  function Vm(t, e, l, n) {
    switch (_h(e)) {
      case 2:
        var u = Tg;
        break;
      case 8:
        u = Ng;
        break;
      default:
        u = To;
    }
    ((l = u.bind(null, e, l, t)),
      (u = void 0),
      !Cc || (e !== 'touchstart' && e !== 'touchmove' && e !== 'wheel') || (u = !0),
      n
        ? u !== void 0
          ? t.addEventListener(e, l, { capture: !0, passive: u })
          : t.addEventListener(e, l, !0)
        : u !== void 0
          ? t.addEventListener(e, l, { passive: u })
          : t.addEventListener(e, l, !1));
  }
  function oo(t, e, l, n, u) {
    var c = n;
    if ((e & 1) === 0 && (e & 2) === 0 && n !== null)
      t: for (;;) {
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
            if (((f = Tn(p)), f === null)) return;
            if (((x = f.tag), x === 5 || x === 6 || x === 26 || x === 27)) {
              n = c = f;
              continue t;
            }
            p = p.parentNode;
          }
        }
        n = n.return;
      }
    $r(function () {
      var z = c,
        U = Ac(l),
        X = [];
      t: {
        var O = Ef.get(t);
        if (O !== void 0) {
          var B = Hu,
            W = t;
          switch (t) {
            case 'keypress':
              if (Uu(l) === 0) break t;
            case 'keydown':
            case 'keyup':
              B = Xy;
              break;
            case 'focusin':
              ((W = 'focus'), (B = Oc));
              break;
            case 'focusout':
              ((W = 'blur'), (B = Oc));
              break;
            case 'beforeblur':
            case 'afterblur':
              B = Oc;
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
              B = Wr;
              break;
            case 'drag':
            case 'dragend':
            case 'dragenter':
            case 'dragexit':
            case 'dragleave':
            case 'dragover':
            case 'dragstart':
            case 'drop':
              B = zy;
              break;
            case 'touchcancel':
            case 'touchend':
            case 'touchmove':
            case 'touchstart':
              B = Zy;
              break;
            case _f:
            case bf:
            case Sf:
              B = ky;
              break;
            case xf:
              B = $y;
              break;
            case 'scroll':
            case 'scrollend':
              B = Ry;
              break;
            case 'wheel':
              B = Iy;
              break;
            case 'copy':
            case 'cut':
            case 'paste':
              B = By;
              break;
            case 'gotpointercapture':
            case 'lostpointercapture':
            case 'pointercancel':
            case 'pointerdown':
            case 'pointermove':
            case 'pointerout':
            case 'pointerover':
            case 'pointerup':
              B = Pr;
              break;
            case 'toggle':
            case 'beforetoggle':
              B = Fy;
          }
          var at = (e & 4) !== 0,
            zt = !at && (t === 'scroll' || t === 'scrollend'),
            C = at ? (O !== null ? O + 'Capture' : null) : O;
          at = [];
          for (var T = z, j; T !== null; ) {
            var Y = T;
            if (
              ((j = Y.stateNode),
              (Y = Y.tag),
              (Y !== 5 && Y !== 26 && Y !== 27) ||
                j === null ||
                C === null ||
                ((Y = Ta(T, C)), Y != null && at.push(nu(T, Y, j))),
              zt)
            )
              break;
            T = T.return;
          }
          0 < at.length && ((O = new B(O, W, null, l, U)), X.push({ event: O, listeners: at }));
        }
      }
      if ((e & 7) === 0) {
        t: {
          if (
            ((O = t === 'mouseover' || t === 'pointerover'),
            (B = t === 'mouseout' || t === 'pointerout'),
            O && l !== Nc && (W = l.relatedTarget || l.fromElement) && (Tn(W) || W[En]))
          )
            break t;
          if (
            (B || O) &&
            ((O =
              U.window === U
                ? U
                : (O = U.ownerDocument)
                  ? O.defaultView || O.parentWindow
                  : window),
            B
              ? ((W = l.relatedTarget || l.toElement),
                (B = z),
                (W = W ? Tn(W) : null),
                W !== null &&
                  ((zt = d(W)), (at = W.tag), W !== zt || (at !== 5 && at !== 27 && at !== 6)) &&
                  (W = null))
              : ((B = null), (W = z)),
            B !== W)
          ) {
            if (
              ((at = Wr),
              (Y = 'onMouseLeave'),
              (C = 'onMouseEnter'),
              (T = 'mouse'),
              (t === 'pointerout' || t === 'pointerover') &&
                ((at = Pr), (Y = 'onPointerLeave'), (C = 'onPointerEnter'), (T = 'pointer')),
              (zt = B == null ? O : Ea(B)),
              (j = W == null ? O : Ea(W)),
              (O = new at(Y, T + 'leave', B, l, U)),
              (O.target = zt),
              (O.relatedTarget = j),
              (Y = null),
              Tn(U) === z &&
                ((at = new at(C, T + 'enter', W, l, U)),
                (at.target = j),
                (at.relatedTarget = zt),
                (Y = at)),
              (zt = Y),
              B && W)
            )
              e: {
                for (at = W0, C = B, T = W, j = 0, Y = C; Y; Y = at(Y)) j++;
                Y = 0;
                for (var nt = T; nt; nt = at(nt)) Y++;
                for (; 0 < j - Y; ) ((C = at(C)), j--);
                for (; 0 < Y - j; ) ((T = at(T)), Y--);
                for (; j--; ) {
                  if (C === T || (T !== null && C === T.alternate)) {
                    at = C;
                    break e;
                  }
                  ((C = at(C)), (T = at(T)));
                }
                at = null;
              }
            else at = null;
            (B !== null && Qm(X, O, B, at, !1), W !== null && zt !== null && Qm(X, zt, W, at, !0));
          }
        }
        t: {
          if (
            ((O = z ? Ea(z) : window),
            (B = O.nodeName && O.nodeName.toLowerCase()),
            B === 'select' || (B === 'input' && O.type === 'file'))
          )
            var _t = sf;
          else if (uf(O))
            if (of) _t = s0;
            else {
              _t = i0;
              var P = u0;
            }
          else
            ((B = O.nodeName),
              !B || B.toLowerCase() !== 'input' || (O.type !== 'checkbox' && O.type !== 'radio')
                ? z && Tc(z.elementType) && (_t = sf)
                : (_t = c0));
          if (_t && (_t = _t(t, z))) {
            cf(X, _t, l, U);
            break t;
          }
          (P && P(t, O, z),
            t === 'focusout' &&
              z &&
              O.type === 'number' &&
              z.memoizedProps.value != null &&
              Ec(O, 'number', O.value));
        }
        switch (((P = z ? Ea(z) : window), t)) {
          case 'focusin':
            (uf(P) || P.contentEditable === 'true') && ((Dn = P), (Lc = z), (Oa = null));
            break;
          case 'focusout':
            Oa = Lc = Dn = null;
            break;
          case 'mousedown':
            Hc = !0;
            break;
          case 'contextmenu':
          case 'mouseup':
          case 'dragend':
            ((Hc = !1), gf(X, l, U));
            break;
          case 'selectionchange':
            if (r0) break;
          case 'keydown':
          case 'keyup':
            gf(X, l, U);
        }
        var dt;
        if (kc)
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
          On
            ? nf(t, l) && (yt = 'onCompositionEnd')
            : t === 'keydown' && l.keyCode === 229 && (yt = 'onCompositionStart');
        (yt &&
          (tf &&
            l.locale !== 'ko' &&
            (On || yt !== 'onCompositionStart'
              ? yt === 'onCompositionEnd' && On && (dt = Jr())
              : ((Al = U), (Rc = 'value' in Al ? Al.value : Al.textContent), (On = !0))),
          (P = Ri(z, yt)),
          0 < P.length &&
            ((yt = new Fr(yt, t, null, l, U)),
            X.push({ event: yt, listeners: P }),
            dt ? (yt.data = dt) : ((dt = af(l)), dt !== null && (yt.data = dt)))),
          (dt = t0 ? e0(t, l) : l0(t, l)) &&
            ((yt = Ri(z, 'onBeforeInput')),
            0 < yt.length &&
              ((P = new Fr('onBeforeInput', 'beforeinput', null, l, U)),
              X.push({ event: P, listeners: yt }),
              (P.data = dt))),
          K0(X, t, z, l, U));
      }
      Xm(X, e);
    });
  }
  function nu(t, e, l) {
    return { instance: t, listener: e, currentTarget: l };
  }
  function Ri(t, e) {
    for (var l = e + 'Capture', n = []; t !== null; ) {
      var u = t,
        c = u.stateNode;
      if (
        ((u = u.tag),
        (u !== 5 && u !== 26 && u !== 27) ||
          c === null ||
          ((u = Ta(t, l)),
          u != null && n.unshift(nu(t, u, c)),
          (u = Ta(t, e)),
          u != null && n.push(nu(t, u, c))),
        t.tag === 3)
      )
        return n;
      t = t.return;
    }
    return [];
  }
  function W0(t) {
    if (t === null) return null;
    do t = t.return;
    while (t && t.tag !== 5 && t.tag !== 27);
    return t || null;
  }
  function Qm(t, e, l, n, u) {
    for (var c = e._reactName, f = []; l !== null && l !== n; ) {
      var p = l,
        x = p.alternate,
        z = p.stateNode;
      if (((p = p.tag), x !== null && x === n)) break;
      ((p !== 5 && p !== 26 && p !== 27) ||
        z === null ||
        ((x = z),
        u
          ? ((z = Ta(l, c)), z != null && f.unshift(nu(l, z, x)))
          : u || ((z = Ta(l, c)), z != null && f.push(nu(l, z, x)))),
        (l = l.return));
    }
    f.length !== 0 && t.push({ event: e, listeners: f });
  }
  var F0 = /\r\n?/g,
    P0 = /\u0000|\uFFFD/g;
  function Zm(t) {
    return (typeof t == 'string' ? t : '' + t)
      .replace(
        F0,
        `
`
      )
      .replace(P0, '');
  }
  function Km(t, e) {
    return ((e = Zm(e)), Zm(t) === e);
  }
  function jt(t, e, l, n, u, c) {
    switch (l) {
      case 'children':
        typeof n == 'string'
          ? e === 'body' || (e === 'textarea' && n === '') || Rn(t, n)
          : (typeof n == 'number' || typeof n == 'bigint') && e !== 'body' && Rn(t, '' + n);
        break;
      case 'className':
        Du(t, 'class', n);
        break;
      case 'tabIndex':
        Du(t, 'tabindex', n);
        break;
      case 'dir':
      case 'role':
      case 'viewBox':
      case 'width':
      case 'height':
        Du(t, l, n);
        break;
      case 'style':
        Zr(t, n, c);
        break;
      case 'data':
        if (e !== 'object') {
          Du(t, 'data', n);
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
        ((n = wu('' + n)), t.setAttribute(l, n));
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
          typeof c == 'function' &&
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
        ((n = wu('' + n)), t.setAttribute(l, n));
        break;
      case 'onClick':
        n != null && (t.onclick = el);
        break;
      case 'onScroll':
        n != null && ht('scroll', t);
        break;
      case 'onScrollEnd':
        n != null && ht('scrollend', t);
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
        ((l = wu('' + n)), t.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', l));
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
        (ht('beforetoggle', t), ht('toggle', t), Ou(t, 'popover', n));
        break;
      case 'xlinkActuate':
        tl(t, 'http://www.w3.org/1999/xlink', 'xlink:actuate', n);
        break;
      case 'xlinkArcrole':
        tl(t, 'http://www.w3.org/1999/xlink', 'xlink:arcrole', n);
        break;
      case 'xlinkRole':
        tl(t, 'http://www.w3.org/1999/xlink', 'xlink:role', n);
        break;
      case 'xlinkShow':
        tl(t, 'http://www.w3.org/1999/xlink', 'xlink:show', n);
        break;
      case 'xlinkTitle':
        tl(t, 'http://www.w3.org/1999/xlink', 'xlink:title', n);
        break;
      case 'xlinkType':
        tl(t, 'http://www.w3.org/1999/xlink', 'xlink:type', n);
        break;
      case 'xmlBase':
        tl(t, 'http://www.w3.org/XML/1998/namespace', 'xml:base', n);
        break;
      case 'xmlLang':
        tl(t, 'http://www.w3.org/XML/1998/namespace', 'xml:lang', n);
        break;
      case 'xmlSpace':
        tl(t, 'http://www.w3.org/XML/1998/namespace', 'xml:space', n);
        break;
      case 'is':
        Ou(t, 'is', n);
        break;
      case 'innerText':
      case 'textContent':
        break;
      default:
        (!(2 < l.length) || (l[0] !== 'o' && l[0] !== 'O') || (l[1] !== 'n' && l[1] !== 'N')) &&
          ((l = My.get(l) || l), Ou(t, l, n));
    }
  }
  function ro(t, e, l, n, u, c) {
    switch (l) {
      case 'style':
        Zr(t, n, c);
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
          ? Rn(t, n)
          : (typeof n == 'number' || typeof n == 'bigint') && Rn(t, '' + n);
        break;
      case 'onScroll':
        n != null && ht('scroll', t);
        break;
      case 'onScrollEnd':
        n != null && ht('scrollend', t);
        break;
      case 'onClick':
        n != null && (t.onclick = el);
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
        if (!Ur.hasOwnProperty(l))
          t: {
            if (
              l[0] === 'o' &&
              l[1] === 'n' &&
              ((u = l.endsWith('Capture')),
              (e = l.slice(2, u ? l.length - 7 : void 0)),
              (c = t[re] || null),
              (c = c != null ? c[l] : null),
              typeof c == 'function' && t.removeEventListener(e, c, u),
              typeof n == 'function')
            ) {
              (typeof c != 'function' &&
                c !== null &&
                (l in t ? (t[l] = null) : t.hasAttribute(l) && t.removeAttribute(l)),
                t.addEventListener(e, n, u));
              break t;
            }
            l in t ? (t[l] = n) : n === !0 ? t.setAttribute(l, '') : Ou(t, l, n);
          }
    }
  }
  function ae(t, e, l) {
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
        (ht('error', t), ht('load', t));
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
                  throw Error(s(137, e));
                default:
                  jt(t, e, c, f, l, null);
              }
          }
        (u && jt(t, e, 'srcSet', l.srcSet, l, null), n && jt(t, e, 'src', l.src, l, null));
        return;
      case 'input':
        ht('invalid', t);
        var p = (c = f = u = null),
          x = null,
          z = null;
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
                  z = U;
                  break;
                case 'value':
                  c = U;
                  break;
                case 'defaultValue':
                  p = U;
                  break;
                case 'children':
                case 'dangerouslySetInnerHTML':
                  if (U != null) throw Error(s(137, e));
                  break;
                default:
                  jt(t, e, n, U, l, null);
              }
          }
        Yr(t, c, p, x, z, f, u, !1);
        return;
      case 'select':
        (ht('invalid', t), (n = f = c = null));
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
                jt(t, e, u, p, l, null);
            }
        ((e = c),
          (l = f),
          (t.multiple = !!n),
          e != null ? Cn(t, !!n, e, !1) : l != null && Cn(t, !!n, l, !0));
        return;
      case 'textarea':
        (ht('invalid', t), (c = u = n = null));
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
                jt(t, e, f, p, l, null);
            }
        Vr(t, n, u, c);
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
        (ht('beforetoggle', t), ht('toggle', t), ht('cancel', t), ht('close', t));
        break;
      case 'iframe':
      case 'object':
        ht('load', t);
        break;
      case 'video':
      case 'audio':
        for (n = 0; n < lu.length; n++) ht(lu[n], t);
        break;
      case 'image':
        (ht('error', t), ht('load', t));
        break;
      case 'details':
        ht('toggle', t);
        break;
      case 'embed':
      case 'source':
      case 'link':
        (ht('error', t), ht('load', t));
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
                throw Error(s(137, e));
              default:
                jt(t, e, z, n, l, null);
            }
        return;
      default:
        if (Tc(e)) {
          for (U in l)
            l.hasOwnProperty(U) && ((n = l[U]), n !== void 0 && ro(t, e, U, n, l, void 0));
          return;
        }
    }
    for (p in l) l.hasOwnProperty(p) && ((n = l[p]), n != null && jt(t, e, p, n, l, null));
  }
  function tg(t, e, l, n) {
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
          c = null,
          f = null,
          p = null,
          x = null,
          z = null,
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
                x = X;
              default:
                n.hasOwnProperty(B) || jt(t, e, B, null, n, X);
            }
        }
        for (var O in n) {
          var B = n[O];
          if (((X = l[O]), n.hasOwnProperty(O) && (B != null || X != null)))
            switch (O) {
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
                if (B != null) throw Error(s(137, e));
                break;
              default:
                B !== X && jt(t, e, O, B, n, X);
            }
        }
        xc(t, f, p, x, z, U, c, u);
        return;
      case 'select':
        B = f = p = O = null;
        for (c in l)
          if (((x = l[c]), l.hasOwnProperty(c) && x != null))
            switch (c) {
              case 'value':
                break;
              case 'multiple':
                B = x;
              default:
                n.hasOwnProperty(c) || jt(t, e, c, null, n, x);
            }
        for (u in n)
          if (((c = n[u]), (x = l[u]), n.hasOwnProperty(u) && (c != null || x != null)))
            switch (u) {
              case 'value':
                O = c;
                break;
              case 'defaultValue':
                p = c;
                break;
              case 'multiple':
                f = c;
              default:
                c !== x && jt(t, e, u, c, n, x);
            }
        ((e = p),
          (l = f),
          (n = B),
          O != null
            ? Cn(t, !!l, O, !1)
            : !!n != !!l && (e != null ? Cn(t, !!l, e, !0) : Cn(t, !!l, l ? [] : '', !1)));
        return;
      case 'textarea':
        B = O = null;
        for (p in l)
          if (((u = l[p]), l.hasOwnProperty(p) && u != null && !n.hasOwnProperty(p)))
            switch (p) {
              case 'value':
                break;
              case 'children':
                break;
              default:
                jt(t, e, p, null, n, u);
            }
        for (f in n)
          if (((u = n[f]), (c = l[f]), n.hasOwnProperty(f) && (u != null || c != null)))
            switch (f) {
              case 'value':
                O = u;
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
                u !== c && jt(t, e, f, u, n, c);
            }
        Xr(t, O, B);
        return;
      case 'option':
        for (var W in l)
          if (((O = l[W]), l.hasOwnProperty(W) && O != null && !n.hasOwnProperty(W)))
            switch (W) {
              case 'selected':
                t.selected = !1;
                break;
              default:
                jt(t, e, W, null, n, O);
            }
        for (x in n)
          if (((O = n[x]), (B = l[x]), n.hasOwnProperty(x) && O !== B && (O != null || B != null)))
            switch (x) {
              case 'selected':
                t.selected = O && typeof O != 'function' && typeof O != 'symbol';
                break;
              default:
                jt(t, e, x, O, n, B);
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
          ((O = l[at]),
            l.hasOwnProperty(at) && O != null && !n.hasOwnProperty(at) && jt(t, e, at, null, n, O));
        for (z in n)
          if (((O = n[z]), (B = l[z]), n.hasOwnProperty(z) && O !== B && (O != null || B != null)))
            switch (z) {
              case 'children':
              case 'dangerouslySetInnerHTML':
                if (O != null) throw Error(s(137, e));
                break;
              default:
                jt(t, e, z, O, n, B);
            }
        return;
      default:
        if (Tc(e)) {
          for (var zt in l)
            ((O = l[zt]),
              l.hasOwnProperty(zt) &&
                O !== void 0 &&
                !n.hasOwnProperty(zt) &&
                ro(t, e, zt, void 0, n, O));
          for (U in n)
            ((O = n[U]),
              (B = l[U]),
              !n.hasOwnProperty(U) ||
                O === B ||
                (O === void 0 && B === void 0) ||
                ro(t, e, U, O, n, B));
          return;
        }
    }
    for (var C in l)
      ((O = l[C]),
        l.hasOwnProperty(C) && O != null && !n.hasOwnProperty(C) && jt(t, e, C, null, n, O));
    for (X in n)
      ((O = n[X]),
        (B = l[X]),
        !n.hasOwnProperty(X) || O === B || (O == null && B == null) || jt(t, e, X, O, n, B));
  }
  function $m(t) {
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
  function eg() {
    if (typeof performance.getEntriesByType == 'function') {
      for (
        var t = 0, e = 0, l = performance.getEntriesByType('resource'), n = 0;
        n < l.length;
        n++
      ) {
        var u = l[n],
          c = u.transferSize,
          f = u.initiatorType,
          p = u.duration;
        if (c && p && $m(f)) {
          for (f = 0, p = u.responseEnd, n += 1; n < l.length; n++) {
            var x = l[n],
              z = x.startTime;
            if (z > p) break;
            var U = x.transferSize,
              X = x.initiatorType;
            U && $m(X) && ((x = x.responseEnd), (f += U * (x < p ? 1 : (p - z) / (x - z))));
          }
          if ((--n, (e += (8 * (c + f)) / (u.duration / 1e3)), t++, 10 < t)) break;
        }
      }
      if (0 < t) return e / t / 1e6;
    }
    return navigator.connection && ((t = navigator.connection.downlink), typeof t == 'number')
      ? t
      : 5;
  }
  var fo = null,
    mo = null;
  function ji(t) {
    return t.nodeType === 9 ? t : t.ownerDocument;
  }
  function Jm(t) {
    switch (t) {
      case 'http://www.w3.org/2000/svg':
        return 1;
      case 'http://www.w3.org/1998/Math/MathML':
        return 2;
      default:
        return 0;
    }
  }
  function Im(t, e) {
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
  function ho(t, e) {
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
  var po = null;
  function lg() {
    var t = window.event;
    return t && t.type === 'popstate' ? (t === po ? !1 : ((po = t), !0)) : ((po = null), !1);
  }
  var Wm = typeof setTimeout == 'function' ? setTimeout : void 0,
    ng = typeof clearTimeout == 'function' ? clearTimeout : void 0,
    Fm = typeof Promise == 'function' ? Promise : void 0,
    ag =
      typeof queueMicrotask == 'function'
        ? queueMicrotask
        : typeof Fm < 'u'
          ? function (t) {
              return Fm.resolve(null).then(t).catch(ug);
            }
          : Wm;
  function ug(t) {
    setTimeout(function () {
      throw t;
    });
  }
  function Xl(t) {
    return t === 'head';
  }
  function Pm(t, e) {
    var l = e,
      n = 0;
    do {
      var u = l.nextSibling;
      if ((t.removeChild(l), u && u.nodeType === 8))
        if (((l = u.data), l === '/$' || l === '/&')) {
          if (n === 0) {
            (t.removeChild(u), ia(e));
            return;
          }
          n--;
        } else if (l === '$' || l === '$?' || l === '$~' || l === '$!' || l === '&') n++;
        else if (l === 'html') au(t.ownerDocument.documentElement);
        else if (l === 'head') {
          ((l = t.ownerDocument.head), au(l));
          for (var c = l.firstChild; c; ) {
            var f = c.nextSibling,
              p = c.nodeName;
            (c[xa] ||
              p === 'SCRIPT' ||
              p === 'STYLE' ||
              (p === 'LINK' && c.rel.toLowerCase() === 'stylesheet') ||
              l.removeChild(c),
              (c = f));
          }
        } else l === 'body' && au(t.ownerDocument.body);
      l = u;
    } while (l);
    ia(e);
  }
  function th(t, e) {
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
  function yo(t) {
    var e = t.firstChild;
    for (e && e.nodeType === 10 && (e = e.nextSibling); e; ) {
      var l = e;
      switch (((e = e.nextSibling), l.nodeName)) {
        case 'HTML':
        case 'HEAD':
        case 'BODY':
          (yo(l), bc(l));
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
  function ig(t, e, l, n) {
    for (; t.nodeType === 1; ) {
      var u = l;
      if (t.nodeName.toLowerCase() !== e.toLowerCase()) {
        if (!n && (t.nodeName !== 'INPUT' || t.type !== 'hidden')) break;
      } else if (n) {
        if (!t[xa])
          switch (e) {
            case 'meta':
              if (!t.hasAttribute('itemprop')) break;
              return t;
            case 'link':
              if (
                ((c = t.getAttribute('rel')),
                c === 'stylesheet' && t.hasAttribute('data-precedence'))
              )
                break;
              if (
                c !== u.rel ||
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
                ((c = t.getAttribute('src')),
                (c !== (u.src == null ? null : u.src) ||
                  t.getAttribute('type') !== (u.type == null ? null : u.type) ||
                  t.getAttribute('crossorigin') !==
                    (u.crossOrigin == null ? null : u.crossOrigin)) &&
                  c &&
                  t.hasAttribute('async') &&
                  !t.hasAttribute('itemprop'))
              )
                break;
              return t;
            default:
              return t;
          }
      } else if (e === 'input' && t.type === 'hidden') {
        var c = u.name == null ? null : '' + u.name;
        if (u.type === 'hidden' && t.getAttribute('name') === c) return t;
      } else return t;
      if (((t = Ue(t.nextSibling)), t === null)) break;
    }
    return null;
  }
  function cg(t, e, l) {
    if (e === '') return null;
    for (; t.nodeType !== 3; )
      if (
        ((t.nodeType !== 1 || t.nodeName !== 'INPUT' || t.type !== 'hidden') && !l) ||
        ((t = Ue(t.nextSibling)), t === null)
      )
        return null;
    return t;
  }
  function eh(t, e) {
    for (; t.nodeType !== 8; )
      if (
        ((t.nodeType !== 1 || t.nodeName !== 'INPUT' || t.type !== 'hidden') && !e) ||
        ((t = Ue(t.nextSibling)), t === null)
      )
        return null;
    return t;
  }
  function go(t) {
    return t.data === '$?' || t.data === '$~';
  }
  function vo(t) {
    return t.data === '$!' || (t.data === '$?' && t.ownerDocument.readyState !== 'loading');
  }
  function sg(t, e) {
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
  function Ue(t) {
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
  var _o = null;
  function lh(t) {
    t = t.nextSibling;
    for (var e = 0; t; ) {
      if (t.nodeType === 8) {
        var l = t.data;
        if (l === '/$' || l === '/&') {
          if (e === 0) return Ue(t.nextSibling);
          e--;
        } else (l !== '$' && l !== '$!' && l !== '$?' && l !== '$~' && l !== '&') || e++;
      }
      t = t.nextSibling;
    }
    return null;
  }
  function nh(t) {
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
  function ah(t, e, l) {
    switch (((e = ji(l)), t)) {
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
  function au(t) {
    for (var e = t.attributes; e.length; ) t.removeAttributeNode(e[0]);
    bc(t);
  }
  var Le = new Map(),
    uh = new Set();
  function zi(t) {
    return typeof t.getRootNode == 'function'
      ? t.getRootNode()
      : t.nodeType === 9
        ? t
        : t.ownerDocument;
  }
  var gl = J.d;
  J.d = { f: og, r: rg, D: fg, C: dg, L: mg, m: hg, X: yg, S: pg, M: gg };
  function og() {
    var t = gl.f(),
      e = xi();
    return t || e;
  }
  function rg(t) {
    var e = Nn(t);
    e !== null && e.tag === 5 && e.type === 'form' ? xd(e) : gl.r(t);
  }
  var na = typeof document > 'u' ? null : document;
  function ih(t, e, l) {
    var n = na;
    if (n && typeof e == 'string' && e) {
      var u = je(e);
      ((u = 'link[rel="' + t + '"][href="' + u + '"]'),
        typeof l == 'string' && (u += '[crossorigin="' + l + '"]'),
        uh.has(u) ||
          (uh.add(u),
          (t = { rel: t, crossOrigin: l, href: e }),
          n.querySelector(u) === null &&
            ((e = n.createElement('link')), ae(e, 'link', t), Wt(e), n.head.appendChild(e))));
    }
  }
  function fg(t) {
    (gl.D(t), ih('dns-prefetch', t, null));
  }
  function dg(t, e) {
    (gl.C(t, e), ih('preconnect', t, e));
  }
  function mg(t, e, l) {
    gl.L(t, e, l);
    var n = na;
    if (n && t && e) {
      var u = 'link[rel="preload"][as="' + je(e) + '"]';
      e === 'image' && l && l.imageSrcSet
        ? ((u += '[imagesrcset="' + je(l.imageSrcSet) + '"]'),
          typeof l.imageSizes == 'string' && (u += '[imagesizes="' + je(l.imageSizes) + '"]'))
        : (u += '[href="' + je(t) + '"]');
      var c = u;
      switch (e) {
        case 'style':
          c = aa(t);
          break;
        case 'script':
          c = ua(t);
      }
      Le.has(c) ||
        ((t = S(
          { rel: 'preload', href: e === 'image' && l && l.imageSrcSet ? void 0 : t, as: e },
          l
        )),
        Le.set(c, t),
        n.querySelector(u) !== null ||
          (e === 'style' && n.querySelector(uu(c))) ||
          (e === 'script' && n.querySelector(iu(c))) ||
          ((e = n.createElement('link')), ae(e, 'link', t), Wt(e), n.head.appendChild(e)));
    }
  }
  function hg(t, e) {
    gl.m(t, e);
    var l = na;
    if (l && t) {
      var n = e && typeof e.as == 'string' ? e.as : 'script',
        u = 'link[rel="modulepreload"][as="' + je(n) + '"][href="' + je(t) + '"]',
        c = u;
      switch (n) {
        case 'audioworklet':
        case 'paintworklet':
        case 'serviceworker':
        case 'sharedworker':
        case 'worker':
        case 'script':
          c = ua(t);
      }
      if (
        !Le.has(c) &&
        ((t = S({ rel: 'modulepreload', href: t }, e)), Le.set(c, t), l.querySelector(u) === null)
      ) {
        switch (n) {
          case 'audioworklet':
          case 'paintworklet':
          case 'serviceworker':
          case 'sharedworker':
          case 'worker':
          case 'script':
            if (l.querySelector(iu(c))) return;
        }
        ((n = l.createElement('link')), ae(n, 'link', t), Wt(n), l.head.appendChild(n));
      }
    }
  }
  function pg(t, e, l) {
    gl.S(t, e, l);
    var n = na;
    if (n && t) {
      var u = An(n).hoistableStyles,
        c = aa(t);
      e = e || 'default';
      var f = u.get(c);
      if (!f) {
        var p = { loading: 0, preload: null };
        if ((f = n.querySelector(uu(c)))) p.loading = 5;
        else {
          ((t = S({ rel: 'stylesheet', href: t, 'data-precedence': e }, l)),
            (l = Le.get(c)) && bo(t, l));
          var x = (f = n.createElement('link'));
          (Wt(x),
            ae(x, 'link', t),
            (x._p = new Promise(function (z, U) {
              ((x.onload = z), (x.onerror = U));
            })),
            x.addEventListener('load', function () {
              p.loading |= 1;
            }),
            x.addEventListener('error', function () {
              p.loading |= 2;
            }),
            (p.loading |= 4),
            Oi(f, e, n));
        }
        ((f = { type: 'stylesheet', instance: f, count: 1, state: p }), u.set(c, f));
      }
    }
  }
  function yg(t, e) {
    gl.X(t, e);
    var l = na;
    if (l && t) {
      var n = An(l).hoistableScripts,
        u = ua(t),
        c = n.get(u);
      c ||
        ((c = l.querySelector(iu(u))),
        c ||
          ((t = S({ src: t, async: !0 }, e)),
          (e = Le.get(u)) && So(t, e),
          (c = l.createElement('script')),
          Wt(c),
          ae(c, 'link', t),
          l.head.appendChild(c)),
        (c = { type: 'script', instance: c, count: 1, state: null }),
        n.set(u, c));
    }
  }
  function gg(t, e) {
    gl.M(t, e);
    var l = na;
    if (l && t) {
      var n = An(l).hoistableScripts,
        u = ua(t),
        c = n.get(u);
      c ||
        ((c = l.querySelector(iu(u))),
        c ||
          ((t = S({ src: t, async: !0, type: 'module' }, e)),
          (e = Le.get(u)) && So(t, e),
          (c = l.createElement('script')),
          Wt(c),
          ae(c, 'link', t),
          l.head.appendChild(c)),
        (c = { type: 'script', instance: c, count: 1, state: null }),
        n.set(u, c));
    }
  }
  function ch(t, e, l, n) {
    var u = (u = rt.current) ? zi(u) : null;
    if (!u) throw Error(s(446));
    switch (t) {
      case 'meta':
      case 'title':
        return null;
      case 'style':
        return typeof l.precedence == 'string' && typeof l.href == 'string'
          ? ((e = aa(l.href)),
            (l = An(u).hoistableStyles),
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
          t = aa(l.href);
          var c = An(u).hoistableStyles,
            f = c.get(t);
          if (
            (f ||
              ((u = u.ownerDocument || u),
              (f = {
                type: 'stylesheet',
                instance: null,
                count: 0,
                state: { loading: 0, preload: null },
              }),
              c.set(t, f),
              (c = u.querySelector(uu(t))) && !c._p && ((f.instance = c), (f.state.loading = 5)),
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
                c || vg(u, t, l, f.state))),
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
            ? ((e = ua(l)),
              (l = An(u).hoistableScripts),
              (n = l.get(e)),
              n || ((n = { type: 'script', instance: null, count: 0, state: null }), l.set(e, n)),
              n)
            : { type: 'void', instance: null, count: 0, state: null }
        );
      default:
        throw Error(s(444, t));
    }
  }
  function aa(t) {
    return 'href="' + je(t) + '"';
  }
  function uu(t) {
    return 'link[rel="stylesheet"][' + t + ']';
  }
  function sh(t) {
    return S({}, t, { 'data-precedence': t.precedence, precedence: null });
  }
  function vg(t, e, l, n) {
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
        ae(e, 'link', l),
        Wt(e),
        t.head.appendChild(e));
  }
  function ua(t) {
    return '[src="' + je(t) + '"]';
  }
  function iu(t) {
    return 'script[async]' + t;
  }
  function oh(t, e, l) {
    if ((e.count++, e.instance === null))
      switch (e.type) {
        case 'style':
          var n = t.querySelector('style[data-href~="' + je(l.href) + '"]');
          if (n) return ((e.instance = n), Wt(n), n);
          var u = S({}, l, {
            'data-href': l.href,
            'data-precedence': l.precedence,
            href: null,
            precedence: null,
          });
          return (
            (n = (t.ownerDocument || t).createElement('style')),
            Wt(n),
            ae(n, 'style', u),
            Oi(n, l.precedence, t),
            (e.instance = n)
          );
        case 'stylesheet':
          u = aa(l.href);
          var c = t.querySelector(uu(u));
          if (c) return ((e.state.loading |= 4), (e.instance = c), Wt(c), c);
          ((n = sh(l)),
            (u = Le.get(u)) && bo(n, u),
            (c = (t.ownerDocument || t).createElement('link')),
            Wt(c));
          var f = c;
          return (
            (f._p = new Promise(function (p, x) {
              ((f.onload = p), (f.onerror = x));
            })),
            ae(c, 'link', n),
            (e.state.loading |= 4),
            Oi(c, l.precedence, t),
            (e.instance = c)
          );
        case 'script':
          return (
            (c = ua(l.src)),
            (u = t.querySelector(iu(c)))
              ? ((e.instance = u), Wt(u), u)
              : ((n = l),
                (u = Le.get(c)) && ((n = S({}, l)), So(n, u)),
                (t = t.ownerDocument || t),
                (u = t.createElement('script')),
                Wt(u),
                ae(u, 'link', n),
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
        ((n = e.instance), (e.state.loading |= 4), Oi(n, l.precedence, t));
    return e.instance;
  }
  function Oi(t, e, l) {
    for (
      var n = l.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),
        u = n.length ? n[n.length - 1] : null,
        c = u,
        f = 0;
      f < n.length;
      f++
    ) {
      var p = n[f];
      if (p.dataset.precedence === e) c = p;
      else if (c !== u) break;
    }
    c
      ? c.parentNode.insertBefore(t, c.nextSibling)
      : ((e = l.nodeType === 9 ? l.head : l), e.insertBefore(t, e.firstChild));
  }
  function bo(t, e) {
    (t.crossOrigin == null && (t.crossOrigin = e.crossOrigin),
      t.referrerPolicy == null && (t.referrerPolicy = e.referrerPolicy),
      t.title == null && (t.title = e.title));
  }
  function So(t, e) {
    (t.crossOrigin == null && (t.crossOrigin = e.crossOrigin),
      t.referrerPolicy == null && (t.referrerPolicy = e.referrerPolicy),
      t.integrity == null && (t.integrity = e.integrity));
  }
  var Di = null;
  function rh(t, e, l) {
    if (Di === null) {
      var n = new Map(),
        u = (Di = new Map());
      u.set(l, n);
    } else ((u = Di), (n = u.get(l)), n || ((n = new Map()), u.set(l, n)));
    if (n.has(t)) return n;
    for (n.set(t, null), l = l.getElementsByTagName(t), u = 0; u < l.length; u++) {
      var c = l[u];
      if (
        !(c[xa] || c[te] || (t === 'link' && c.getAttribute('rel') === 'stylesheet')) &&
        c.namespaceURI !== 'http://www.w3.org/2000/svg'
      ) {
        var f = c.getAttribute(e) || '';
        f = t + f;
        var p = n.get(f);
        p ? p.push(c) : n.set(f, [c]);
      }
    }
    return n;
  }
  function fh(t, e, l) {
    ((t = t.ownerDocument || t),
      t.head.insertBefore(l, e === 'title' ? t.querySelector('head > title') : null));
  }
  function _g(t, e, l) {
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
  function dh(t) {
    return !(t.type === 'stylesheet' && (t.state.loading & 3) === 0);
  }
  function bg(t, e, l, n) {
    if (
      l.type === 'stylesheet' &&
      (typeof n.media != 'string' || matchMedia(n.media).matches !== !1) &&
      (l.state.loading & 4) === 0
    ) {
      if (l.instance === null) {
        var u = aa(n.href),
          c = e.querySelector(uu(u));
        if (c) {
          ((e = c._p),
            e !== null &&
              typeof e == 'object' &&
              typeof e.then == 'function' &&
              (t.count++, (t = ki.bind(t)), e.then(t, t)),
            (l.state.loading |= 4),
            (l.instance = c),
            Wt(c));
          return;
        }
        ((c = e.ownerDocument || e),
          (n = sh(n)),
          (u = Le.get(u)) && bo(n, u),
          (c = c.createElement('link')),
          Wt(c));
        var f = c;
        ((f._p = new Promise(function (p, x) {
          ((f.onload = p), (f.onerror = x));
        })),
          ae(c, 'link', n),
          (l.instance = c));
      }
      (t.stylesheets === null && (t.stylesheets = new Map()),
        t.stylesheets.set(l, e),
        (e = l.state.preload) &&
          (l.state.loading & 3) === 0 &&
          (t.count++,
          (l = ki.bind(t)),
          e.addEventListener('load', l),
          e.addEventListener('error', l)));
    }
  }
  var xo = 0;
  function Sg(t, e) {
    return (
      t.stylesheets && t.count === 0 && Bi(t, t.stylesheets),
      0 < t.count || 0 < t.imgCount
        ? function (l) {
            var n = setTimeout(function () {
              if ((t.stylesheets && Bi(t, t.stylesheets), t.unsuspend)) {
                var c = t.unsuspend;
                ((t.unsuspend = null), c());
              }
            }, 6e4 + e);
            0 < t.imgBytes && xo === 0 && (xo = 62500 * eg());
            var u = setTimeout(
              function () {
                if (
                  ((t.waitingForImages = !1),
                  t.count === 0 && (t.stylesheets && Bi(t, t.stylesheets), t.unsuspend))
                ) {
                  var c = t.unsuspend;
                  ((t.unsuspend = null), c());
                }
              },
              (t.imgBytes > xo ? 50 : 800) + e
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
  function ki() {
    if ((this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages))) {
      if (this.stylesheets) Bi(this, this.stylesheets);
      else if (this.unsuspend) {
        var t = this.unsuspend;
        ((this.unsuspend = null), t());
      }
    }
  }
  var wi = null;
  function Bi(t, e) {
    ((t.stylesheets = null),
      t.unsuspend !== null &&
        (t.count++, (wi = new Map()), e.forEach(xg, t), (wi = null), ki.call(t)));
  }
  function xg(t, e) {
    if (!(e.state.loading & 4)) {
      var l = wi.get(t);
      if (l) var n = l.get(null);
      else {
        ((l = new Map()), wi.set(t, l));
        for (
          var u = t.querySelectorAll('link[data-precedence],style[data-precedence]'), c = 0;
          c < u.length;
          c++
        ) {
          var f = u[c];
          (f.nodeName === 'LINK' || f.getAttribute('media') !== 'not all') &&
            (l.set(f.dataset.precedence, f), (n = f));
        }
        n && l.set(null, n);
      }
      ((u = e.instance),
        (f = u.getAttribute('data-precedence')),
        (c = l.get(f) || n),
        c === n && l.set(null, u),
        l.set(f, u),
        this.count++,
        (n = ki.bind(this)),
        u.addEventListener('load', n),
        u.addEventListener('error', n),
        c
          ? c.parentNode.insertBefore(u, c.nextSibling)
          : ((t = t.nodeType === 9 ? t.head : t), t.insertBefore(u, t.firstChild)),
        (e.state.loading |= 4));
    }
  }
  var cu = {
    $$typeof: V,
    Provider: null,
    Consumer: null,
    _currentValue: it,
    _currentValue2: it,
    _threadCount: 0,
  };
  function Eg(t, e, l, n, u, c, f, p, x) {
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
      (this.expirationTimes = yc(-1)),
      (this.entangledLanes =
        this.shellSuspendCounter =
        this.errorRecoveryDisabledLanes =
        this.expiredLanes =
        this.warmLanes =
        this.pingedLanes =
        this.suspendedLanes =
        this.pendingLanes =
          0),
      (this.entanglements = yc(0)),
      (this.hiddenUpdates = yc(null)),
      (this.identifierPrefix = n),
      (this.onUncaughtError = u),
      (this.onCaughtError = c),
      (this.onRecoverableError = f),
      (this.pooledCache = null),
      (this.pooledCacheLanes = 0),
      (this.formState = x),
      (this.incompleteTransitions = new Map()));
  }
  function mh(t, e, l, n, u, c, f, p, x, z, U, X) {
    return (
      (t = new Eg(t, e, l, f, x, z, U, X, p)),
      (e = 1),
      c === !0 && (e |= 24),
      (c = Se(3, null, null, e)),
      (t.current = c),
      (c.stateNode = t),
      (e = ts()),
      e.refCount++,
      (t.pooledCache = e),
      e.refCount++,
      (c.memoizedState = { element: n, isDehydrated: l, cache: e }),
      as(c),
      t
    );
  }
  function hh(t) {
    return t ? ((t = Bn), t) : Bn;
  }
  function ph(t, e, l, n, u, c) {
    ((u = hh(u)),
      n.context === null ? (n.context = u) : (n.pendingContext = u),
      (n = Ol(e)),
      (n.payload = { element: l }),
      (c = c === void 0 ? null : c),
      c !== null && (n.callback = c),
      (l = Dl(t, n, e)),
      l !== null && (ye(l, t, e), Ha(l, t, e)));
  }
  function yh(t, e) {
    if (((t = t.memoizedState), t !== null && t.dehydrated !== null)) {
      var l = t.retryLane;
      t.retryLane = l !== 0 && l < e ? l : e;
    }
  }
  function Eo(t, e) {
    (yh(t, e), (t = t.alternate) && yh(t, e));
  }
  function gh(t) {
    if (t.tag === 13 || t.tag === 31) {
      var e = un(t, 67108864);
      (e !== null && ye(e, t, 67108864), Eo(t, 67108864));
    }
  }
  function vh(t) {
    if (t.tag === 13 || t.tag === 31) {
      var e = Ae();
      e = gc(e);
      var l = un(t, e);
      (l !== null && ye(l, t, e), Eo(t, e));
    }
  }
  var Ui = !0;
  function Tg(t, e, l, n) {
    var u = L.T;
    L.T = null;
    var c = J.p;
    try {
      ((J.p = 2), To(t, e, l, n));
    } finally {
      ((J.p = c), (L.T = u));
    }
  }
  function Ng(t, e, l, n) {
    var u = L.T;
    L.T = null;
    var c = J.p;
    try {
      ((J.p = 8), To(t, e, l, n));
    } finally {
      ((J.p = c), (L.T = u));
    }
  }
  function To(t, e, l, n) {
    if (Ui) {
      var u = No(n);
      if (u === null) (oo(t, e, n, Li, l), bh(t, n));
      else if (Mg(u, t, e, l, n)) n.stopPropagation();
      else if ((bh(t, n), e & 4 && -1 < Ag.indexOf(t))) {
        for (; u !== null; ) {
          var c = Nn(u);
          if (c !== null)
            switch (c.tag) {
              case 3:
                if (((c = c.stateNode), c.current.memoizedState.isDehydrated)) {
                  var f = tn(c.pendingLanes);
                  if (f !== 0) {
                    var p = c;
                    for (p.pendingLanes |= 2, p.entangledLanes |= 2; f; ) {
                      var x = 1 << (31 - _e(f));
                      ((p.entanglements[1] |= x), (f &= ~x));
                    }
                    (We(c), (xt & 6) === 0 && ((bi = ge() + 500), eu(0)));
                  }
                }
                break;
              case 31:
              case 13:
                ((p = un(c, 2)), p !== null && ye(p, c, 2), xi(), Eo(c, 2));
            }
          if (((c = No(n)), c === null && oo(t, e, n, Li, l), c === u)) break;
          u = c;
        }
        u !== null && n.stopPropagation();
      } else oo(t, e, n, null, l);
    }
  }
  function No(t) {
    return ((t = Ac(t)), Ao(t));
  }
  var Li = null;
  function Ao(t) {
    if (((Li = null), (t = Tn(t)), t !== null)) {
      var e = d(t);
      if (e === null) t = null;
      else {
        var l = e.tag;
        if (l === 13) {
          if (((t = h(e)), t !== null)) return t;
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
    return ((Li = t), null);
  }
  function _h(t) {
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
        switch (fy()) {
          case Ar:
            return 2;
          case Mr:
            return 8;
          case Mu:
          case dy:
            return 32;
          case Cr:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var Mo = !1,
    Vl = null,
    Ql = null,
    Zl = null,
    su = new Map(),
    ou = new Map(),
    Kl = [],
    Ag =
      'mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset'.split(
        ' '
      );
  function bh(t, e) {
    switch (t) {
      case 'focusin':
      case 'focusout':
        Vl = null;
        break;
      case 'dragenter':
      case 'dragleave':
        Ql = null;
        break;
      case 'mouseover':
      case 'mouseout':
        Zl = null;
        break;
      case 'pointerover':
      case 'pointerout':
        su.delete(e.pointerId);
        break;
      case 'gotpointercapture':
      case 'lostpointercapture':
        ou.delete(e.pointerId);
    }
  }
  function ru(t, e, l, n, u, c) {
    return t === null || t.nativeEvent !== c
      ? ((t = {
          blockedOn: e,
          domEventName: l,
          eventSystemFlags: n,
          nativeEvent: c,
          targetContainers: [u],
        }),
        e !== null && ((e = Nn(e)), e !== null && gh(e)),
        t)
      : ((t.eventSystemFlags |= n),
        (e = t.targetContainers),
        u !== null && e.indexOf(u) === -1 && e.push(u),
        t);
  }
  function Mg(t, e, l, n, u) {
    switch (e) {
      case 'focusin':
        return ((Vl = ru(Vl, t, e, l, n, u)), !0);
      case 'dragenter':
        return ((Ql = ru(Ql, t, e, l, n, u)), !0);
      case 'mouseover':
        return ((Zl = ru(Zl, t, e, l, n, u)), !0);
      case 'pointerover':
        var c = u.pointerId;
        return (su.set(c, ru(su.get(c) || null, t, e, l, n, u)), !0);
      case 'gotpointercapture':
        return ((c = u.pointerId), ou.set(c, ru(ou.get(c) || null, t, e, l, n, u)), !0);
    }
    return !1;
  }
  function Sh(t) {
    var e = Tn(t.target);
    if (e !== null) {
      var l = d(e);
      if (l !== null) {
        if (((e = l.tag), e === 13)) {
          if (((e = h(l)), e !== null)) {
            ((t.blockedOn = e),
              kr(t.priority, function () {
                vh(l);
              }));
            return;
          }
        } else if (e === 31) {
          if (((e = _(l)), e !== null)) {
            ((t.blockedOn = e),
              kr(t.priority, function () {
                vh(l);
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
  function Hi(t) {
    if (t.blockedOn !== null) return !1;
    for (var e = t.targetContainers; 0 < e.length; ) {
      var l = No(t.nativeEvent);
      if (l === null) {
        l = t.nativeEvent;
        var n = new l.constructor(l.type, l);
        ((Nc = n), l.target.dispatchEvent(n), (Nc = null));
      } else return ((e = Nn(l)), e !== null && gh(e), (t.blockedOn = l), !1);
      e.shift();
    }
    return !0;
  }
  function xh(t, e, l) {
    Hi(t) && l.delete(e);
  }
  function Cg() {
    ((Mo = !1),
      Vl !== null && Hi(Vl) && (Vl = null),
      Ql !== null && Hi(Ql) && (Ql = null),
      Zl !== null && Hi(Zl) && (Zl = null),
      su.forEach(xh),
      ou.forEach(xh));
  }
  function qi(t, e) {
    t.blockedOn === e &&
      ((t.blockedOn = null),
      Mo || ((Mo = !0), a.unstable_scheduleCallback(a.unstable_NormalPriority, Cg)));
  }
  var Gi = null;
  function Eh(t) {
    Gi !== t &&
      ((Gi = t),
      a.unstable_scheduleCallback(a.unstable_NormalPriority, function () {
        Gi === t && (Gi = null);
        for (var e = 0; e < t.length; e += 3) {
          var l = t[e],
            n = t[e + 1],
            u = t[e + 2];
          if (typeof n != 'function') {
            if (Ao(n || l) === null) continue;
            break;
          }
          var c = Nn(l);
          c !== null &&
            (t.splice(e, 3),
            (e -= 3),
            Ts(c, { pending: !0, data: u, method: l.method, action: n }, n, u));
        }
      }));
  }
  function ia(t) {
    function e(x) {
      return qi(x, t);
    }
    (Vl !== null && qi(Vl, t),
      Ql !== null && qi(Ql, t),
      Zl !== null && qi(Zl, t),
      su.forEach(e),
      ou.forEach(e));
    for (var l = 0; l < Kl.length; l++) {
      var n = Kl[l];
      n.blockedOn === t && (n.blockedOn = null);
    }
    for (; 0 < Kl.length && ((l = Kl[0]), l.blockedOn === null); )
      (Sh(l), l.blockedOn === null && Kl.shift());
    if (((l = (t.ownerDocument || t).$$reactFormReplay), l != null))
      for (n = 0; n < l.length; n += 3) {
        var u = l[n],
          c = l[n + 1],
          f = u[re] || null;
        if (typeof c == 'function') f || Eh(l);
        else if (f) {
          var p = null;
          if (c && c.hasAttribute('formAction')) {
            if (((u = c), (f = c[re] || null))) p = f.formAction;
            else if (Ao(u) !== null) continue;
          } else p = f.action;
          (typeof p == 'function' ? (l[n + 1] = p) : (l.splice(n, 3), (n -= 3)), Eh(l));
        }
      }
  }
  function Th() {
    function t(c) {
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
    function e() {
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
  function Co(t) {
    this._internalRoot = t;
  }
  ((Yi.prototype.render = Co.prototype.render =
    function (t) {
      var e = this._internalRoot;
      if (e === null) throw Error(s(409));
      var l = e.current,
        n = Ae();
      ph(l, n, t, e, null, null);
    }),
    (Yi.prototype.unmount = Co.prototype.unmount =
      function () {
        var t = this._internalRoot;
        if (t !== null) {
          this._internalRoot = null;
          var e = t.containerInfo;
          (ph(t.current, 2, null, t, null, null), xi(), (e[En] = null));
        }
      }));
  function Yi(t) {
    this._internalRoot = t;
  }
  Yi.prototype.unstable_scheduleHydration = function (t) {
    if (t) {
      var e = Dr();
      t = { blockedOn: null, target: t, priority: e };
      for (var l = 0; l < Kl.length && e !== 0 && e < Kl[l].priority; l++);
      (Kl.splice(l, 0, t), l === 0 && Sh(t));
    }
  };
  var Nh = i.version;
  if (Nh !== '19.2.5') throw Error(s(527, Nh, '19.2.5'));
  J.findDOMNode = function (t) {
    var e = t._reactInternals;
    if (e === void 0)
      throw typeof t.render == 'function'
        ? Error(s(188))
        : ((t = Object.keys(t).join(',')), Error(s(268, t)));
    return ((t = m(e)), (t = t !== null ? b(t) : null), (t = t === null ? null : t.stateNode), t);
  };
  var Rg = {
    bundleType: 0,
    version: '19.2.5',
    rendererPackageName: 'react-dom',
    currentDispatcherRef: L,
    reconcilerVersion: '19.2.5',
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < 'u') {
    var Xi = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Xi.isDisabled && Xi.supportsFiber)
      try {
        ((_a = Xi.inject(Rg)), (ve = Xi));
      } catch {}
  }
  return (
    (du.createRoot = function (t, e) {
      if (!r(t)) throw Error(s(299));
      var l = !1,
        n = '',
        u = Od,
        c = Dd,
        f = kd;
      return (
        e != null &&
          (e.unstable_strictMode === !0 && (l = !0),
          e.identifierPrefix !== void 0 && (n = e.identifierPrefix),
          e.onUncaughtError !== void 0 && (u = e.onUncaughtError),
          e.onCaughtError !== void 0 && (c = e.onCaughtError),
          e.onRecoverableError !== void 0 && (f = e.onRecoverableError)),
        (e = mh(t, 1, !1, null, null, l, n, null, u, c, f, Th)),
        (t[En] = e.current),
        so(t),
        new Co(e)
      );
    }),
    (du.hydrateRoot = function (t, e, l) {
      if (!r(t)) throw Error(s(299));
      var n = !1,
        u = '',
        c = Od,
        f = Dd,
        p = kd,
        x = null;
      return (
        l != null &&
          (l.unstable_strictMode === !0 && (n = !0),
          l.identifierPrefix !== void 0 && (u = l.identifierPrefix),
          l.onUncaughtError !== void 0 && (c = l.onUncaughtError),
          l.onCaughtError !== void 0 && (f = l.onCaughtError),
          l.onRecoverableError !== void 0 && (p = l.onRecoverableError),
          l.formState !== void 0 && (x = l.formState)),
        (e = mh(t, 1, !0, e, l ?? null, n, u, x, c, f, p, Th)),
        (e.context = hh(null)),
        (l = e.current),
        (n = Ae()),
        (n = gc(n)),
        (u = Ol(n)),
        (u.callback = null),
        Dl(l, u, n),
        (l = n),
        (e.current.lanes = l),
        Sa(e, l),
        We(e),
        (t[En] = e.current),
        so(t),
        new Yi(e)
      );
    }),
    (du.version = '19.2.5'),
    du
  );
}
var wh;
function Gg() {
  if (wh) return zo.exports;
  wh = 1;
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
  return (a(), (zo.exports = qg()), zo.exports);
}
var Yg = Gg(),
  M = ir();
/**
 * react-router v7.14.2
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */ var Bh = 'popstate';
function Uh(a) {
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
function Xg(a = {}) {
  function i(s, r) {
    var m;
    let d = (m = r.state) == null ? void 0 : m.masked,
      { pathname: h, search: _, hash: g } = d || s.location;
    return $o(
      '',
      { pathname: h, search: _, hash: g },
      (r.state && r.state.usr) || null,
      (r.state && r.state.key) || 'default',
      d
        ? { pathname: s.location.pathname, search: s.location.search, hash: s.location.hash }
        : void 0
    );
  }
  function o(s, r) {
    return typeof r == 'string' ? r : _u(r);
  }
  return Qg(i, o, null, a);
}
function Bt(a, i) {
  if (a === !1 || a === null || typeof a > 'u') throw new Error(i);
}
function Ze(a, i) {
  if (!a) {
    typeof console < 'u' && console.warn(i);
    try {
      throw new Error(i);
    } catch {}
  }
}
function Vg() {
  return Math.random().toString(36).substring(2, 10);
}
function Lh(a, i) {
  return {
    usr: a.state,
    key: a.key,
    idx: i,
    masked: a.unstable_mask ? { pathname: a.pathname, search: a.search, hash: a.hash } : void 0,
  };
}
function $o(a, i, o = null, s, r) {
  return {
    pathname: typeof a == 'string' ? a : a.pathname,
    search: '',
    hash: '',
    ...(typeof i == 'string' ? ha(i) : i),
    state: o,
    key: (i && i.key) || s || Vg(),
    unstable_mask: r,
  };
}
function _u({ pathname: a = '/', search: i = '', hash: o = '' }) {
  return (
    i && i !== '?' && (a += i.charAt(0) === '?' ? i : '?' + i),
    o && o !== '#' && (a += o.charAt(0) === '#' ? o : '#' + o),
    a
  );
}
function ha(a) {
  let i = {};
  if (a) {
    let o = a.indexOf('#');
    o >= 0 && ((i.hash = a.substring(o)), (a = a.substring(0, o)));
    let s = a.indexOf('?');
    (s >= 0 && ((i.search = a.substring(s)), (a = a.substring(0, s))), a && (i.pathname = a));
  }
  return i;
}
function Qg(a, i, o, s = {}) {
  let { window: r = document.defaultView, v5Compat: d = !1 } = s,
    h = r.history,
    _ = 'POP',
    g = null,
    m = b();
  m == null && ((m = 0), h.replaceState({ ...h.state, idx: m }, ''));
  function b() {
    return (h.state || { idx: null }).idx;
  }
  function S() {
    _ = 'POP';
    let R = b(),
      G = R == null ? null : R - m;
    ((m = R), g && g({ action: _, location: k.location, delta: G }));
  }
  function N(R, G) {
    _ = 'PUSH';
    let I = Uh(R) ? R : $o(k.location, R, G);
    m = b() + 1;
    let V = Lh(I, m),
      D = k.createHref(I.unstable_mask || I);
    try {
      h.pushState(V, '', D);
    } catch (H) {
      if (H instanceof DOMException && H.name === 'DataCloneError') throw H;
      r.location.assign(D);
    }
    d && g && g({ action: _, location: k.location, delta: 1 });
  }
  function E(R, G) {
    _ = 'REPLACE';
    let I = Uh(R) ? R : $o(k.location, R, G);
    m = b();
    let V = Lh(I, m),
      D = k.createHref(I.unstable_mask || I);
    (h.replaceState(V, '', D), d && g && g({ action: _, location: k.location, delta: 0 }));
  }
  function A(R) {
    return Zg(R);
  }
  let k = {
    get action() {
      return _;
    },
    get location() {
      return a(r, h);
    },
    listen(R) {
      if (g) throw new Error('A history only accepts one active listener');
      return (
        r.addEventListener(Bh, S),
        (g = R),
        () => {
          (r.removeEventListener(Bh, S), (g = null));
        }
      );
    },
    createHref(R) {
      return i(r, R);
    },
    createURL: A,
    encodeLocation(R) {
      let G = A(R);
      return { pathname: G.pathname, search: G.search, hash: G.hash };
    },
    push: N,
    replace: E,
    go(R) {
      return h.go(R);
    },
  };
  return k;
}
function Zg(a, i = !1) {
  let o = 'http://localhost';
  (typeof window < 'u' &&
    (o = window.location.origin !== 'null' ? window.location.origin : window.location.href),
    Bt(o, 'No window.location.(origin|href) available to create URL'));
  let s = typeof a == 'string' ? a : _u(a);
  return ((s = s.replace(/ $/, '%20')), !i && s.startsWith('//') && (s = o + s), new URL(s, o));
}
function rp(a, i, o = '/') {
  return Kg(a, i, o, !1);
}
function Kg(a, i, o, s) {
  let r = typeof i == 'string' ? ha(i) : i,
    d = Sl(r.pathname || '/', o);
  if (d == null) return null;
  let h = fp(a);
  $g(h);
  let _ = null;
  for (let g = 0; _ == null && g < h.length; ++g) {
    let m = uv(d);
    _ = nv(h[g], m, s);
  }
  return _;
}
function fp(a, i = [], o = [], s = '', r = !1) {
  let d = (h, _, g = r, m) => {
    let b = {
      relativePath: m === void 0 ? h.path || '' : m,
      caseSensitive: h.caseSensitive === !0,
      childrenIndex: _,
      route: h,
    };
    if (b.relativePath.startsWith('/')) {
      if (!b.relativePath.startsWith(s) && g) return;
      (Bt(
        b.relativePath.startsWith(s),
        `Absolute route path "${b.relativePath}" nested under path "${s}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`
      ),
        (b.relativePath = b.relativePath.slice(s.length)));
    }
    let S = Ve([s, b.relativePath]),
      N = o.concat(b);
    (h.children &&
      h.children.length > 0 &&
      (Bt(
        h.index !== !0,
        `Index routes must not have child routes. Please remove all child routes from route path "${S}".`
      ),
      fp(h.children, i, N, S, g)),
      !(h.path == null && !h.index) && i.push({ path: S, score: ev(S, h.index), routesMeta: N }));
  };
  return (
    a.forEach((h, _) => {
      var g;
      if (h.path === '' || !((g = h.path) != null && g.includes('?'))) d(h, _);
      else for (let m of dp(h.path)) d(h, _, !0, m);
    }),
    i
  );
}
function dp(a) {
  let i = a.split('/');
  if (i.length === 0) return [];
  let [o, ...s] = i,
    r = o.endsWith('?'),
    d = o.replace(/\?$/, '');
  if (s.length === 0) return r ? [d, ''] : [d];
  let h = dp(s.join('/')),
    _ = [];
  return (
    _.push(...h.map((g) => (g === '' ? d : [d, g].join('/')))),
    r && _.push(...h),
    _.map((g) => (a.startsWith('/') && g === '' ? '/' : g))
  );
}
function $g(a) {
  a.sort((i, o) =>
    i.score !== o.score
      ? o.score - i.score
      : lv(
          i.routesMeta.map((s) => s.childrenIndex),
          o.routesMeta.map((s) => s.childrenIndex)
        )
  );
}
var Jg = /^:[\w-]+$/,
  Ig = 3,
  Wg = 2,
  Fg = 1,
  Pg = 10,
  tv = -2,
  Hh = (a) => a === '*';
function ev(a, i) {
  let o = a.split('/'),
    s = o.length;
  return (
    o.some(Hh) && (s += tv),
    i && (s += Wg),
    o.filter((r) => !Hh(r)).reduce((r, d) => r + (Jg.test(d) ? Ig : d === '' ? Fg : Pg), s)
  );
}
function lv(a, i) {
  return a.length === i.length && a.slice(0, -1).every((s, r) => s === i[r])
    ? a[a.length - 1] - i[i.length - 1]
    : 0;
}
function nv(a, i, o = !1) {
  let { routesMeta: s } = a,
    r = {},
    d = '/',
    h = [];
  for (let _ = 0; _ < s.length; ++_) {
    let g = s[_],
      m = _ === s.length - 1,
      b = d === '/' ? i : i.slice(d.length) || '/',
      S = Ii({ path: g.relativePath, caseSensitive: g.caseSensitive, end: m }, b),
      N = g.route;
    if (
      (!S &&
        m &&
        o &&
        !s[s.length - 1].route.index &&
        (S = Ii({ path: g.relativePath, caseSensitive: g.caseSensitive, end: !1 }, b)),
      !S)
    )
      return null;
    (Object.assign(r, S.params),
      h.push({
        params: r,
        pathname: Ve([d, S.pathname]),
        pathnameBase: ov(Ve([d, S.pathnameBase])),
        route: N,
      }),
      S.pathnameBase !== '/' && (d = Ve([d, S.pathnameBase])));
  }
  return h;
}
function Ii(a, i) {
  typeof a == 'string' && (a = { path: a, caseSensitive: !1, end: !0 });
  let [o, s] = av(a.path, a.caseSensitive, a.end),
    r = i.match(o);
  if (!r) return null;
  let d = r[0],
    h = d.replace(/(.)\/+$/, '$1'),
    _ = r.slice(1);
  return {
    params: s.reduce((m, { paramName: b, isOptional: S }, N) => {
      if (b === '*') {
        let A = _[N] || '';
        h = d.slice(0, d.length - A.length).replace(/(.)\/+$/, '$1');
      }
      const E = _[N];
      return (S && !E ? (m[b] = void 0) : (m[b] = (E || '').replace(/%2F/g, '/')), m);
    }, {}),
    pathname: d,
    pathnameBase: h,
    pattern: a,
  };
}
function av(a, i = !1, o = !0) {
  Ze(
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
        .replace(/\/:([\w-]+)(\?)?/g, (h, _, g, m, b) => {
          if ((s.push({ paramName: _, isOptional: g != null }), g)) {
            let S = b.charAt(m + h.length);
            return S && S !== '/' ? '/([^\\/]*)' : '(?:/([^\\/]*))?';
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
function uv(a) {
  try {
    return a
      .split('/')
      .map((i) => decodeURIComponent(i).replace(/\//g, '%2F'))
      .join('/');
  } catch (i) {
    return (
      Ze(
        !1,
        `The URL path "${a}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${i}).`
      ),
      a
    );
  }
}
function Sl(a, i) {
  if (i === '/') return a;
  if (!a.toLowerCase().startsWith(i.toLowerCase())) return null;
  let o = i.endsWith('/') ? i.length - 1 : i.length,
    s = a.charAt(o);
  return s && s !== '/' ? null : a.slice(o) || '/';
}
var iv = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;
function cv(a, i = '/') {
  let { pathname: o, search: s = '', hash: r = '' } = typeof a == 'string' ? ha(a) : a,
    d;
  return (
    o ? ((o = mp(o)), o.startsWith('/') ? (d = qh(o.substring(1), '/')) : (d = qh(o, i))) : (d = i),
    { pathname: d, search: rv(s), hash: fv(r) }
  );
}
function qh(a, i) {
  let o = Wi(i).split('/');
  return (
    a.split('/').forEach((r) => {
      r === '..' ? o.length > 1 && o.pop() : r !== '.' && o.push(r);
    }),
    o.length > 1 ? o.join('/') : '/'
  );
}
function Bo(a, i, o, s) {
  return `Cannot include a '${a}' character in a manually specified \`to.${i}\` field [${JSON.stringify(s)}].  Please separate it out to the \`to.${o}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`;
}
function sv(a) {
  return a.filter((i, o) => o === 0 || (i.route.path && i.route.path.length > 0));
}
function cr(a) {
  let i = sv(a);
  return i.map((o, s) => (s === i.length - 1 ? o.pathname : o.pathnameBase));
}
function lc(a, i, o, s = !1) {
  let r;
  typeof a == 'string'
    ? (r = ha(a))
    : ((r = { ...a }),
      Bt(!r.pathname || !r.pathname.includes('?'), Bo('?', 'pathname', 'search', r)),
      Bt(!r.pathname || !r.pathname.includes('#'), Bo('#', 'pathname', 'hash', r)),
      Bt(!r.search || !r.search.includes('#'), Bo('#', 'search', 'hash', r)));
  let d = a === '' || r.pathname === '',
    h = d ? '/' : r.pathname,
    _;
  if (h == null) _ = o;
  else {
    let S = i.length - 1;
    if (!s && h.startsWith('..')) {
      let N = h.split('/');
      for (; N[0] === '..'; ) (N.shift(), (S -= 1));
      r.pathname = N.join('/');
    }
    _ = S >= 0 ? i[S] : '/';
  }
  let g = cv(r, _),
    m = h && h !== '/' && h.endsWith('/'),
    b = (d || h === '.') && o.endsWith('/');
  return (!g.pathname.endsWith('/') && (m || b) && (g.pathname += '/'), g);
}
var mp = (a) => a.replace(/\/\/+/g, '/'),
  Ve = (a) => mp(a.join('/')),
  Wi = (a) => a.replace(/\/+$/, ''),
  ov = (a) => Wi(a).replace(/^\/*/, '/'),
  rv = (a) => (!a || a === '?' ? '' : a.startsWith('?') ? a : '?' + a),
  fv = (a) => (!a || a === '#' ? '' : a.startsWith('#') ? a : '#' + a),
  dv = class {
    constructor(a, i, o, s = !1) {
      ((this.status = a),
        (this.statusText = i || ''),
        (this.internal = s),
        o instanceof Error ? ((this.data = o.toString()), (this.error = o)) : (this.data = o));
    }
  };
function mv(a) {
  return (
    a != null &&
    typeof a.status == 'number' &&
    typeof a.statusText == 'string' &&
    typeof a.internal == 'boolean' &&
    'data' in a
  );
}
function hv(a) {
  let i = a.map((o) => o.route.path).filter(Boolean);
  return Ve(i) || '/';
}
var hp =
  typeof window < 'u' && typeof window.document < 'u' && typeof window.document.createElement < 'u';
function pp(a, i) {
  let o = a;
  if (typeof o != 'string' || !iv.test(o)) return { absoluteURL: void 0, isExternal: !1, to: o };
  let s = o,
    r = !1;
  if (hp)
    try {
      let d = new URL(window.location.href),
        h = o.startsWith('//') ? new URL(d.protocol + o) : new URL(o),
        _ = Sl(h.pathname, i);
      h.origin === d.origin && _ != null ? (o = _ + h.search + h.hash) : (r = !0);
    } catch {
      Ze(
        !1,
        `<Link to="${o}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`
      );
    }
  return { absoluteURL: s, isExternal: r, to: o };
}
Object.getOwnPropertyNames(Object.prototype).sort().join('\0');
var yp = ['POST', 'PUT', 'PATCH', 'DELETE'];
new Set(yp);
var pv = ['GET', ...yp];
new Set(pv);
var pa = M.createContext(null);
pa.displayName = 'DataRouter';
var nc = M.createContext(null);
nc.displayName = 'DataRouterState';
var gp = M.createContext(!1);
function yv() {
  return M.useContext(gp);
}
var vp = M.createContext({ isTransitioning: !1 });
vp.displayName = 'ViewTransition';
var gv = M.createContext(new Map());
gv.displayName = 'Fetchers';
var vv = M.createContext(null);
vv.displayName = 'Await';
var Ce = M.createContext(null);
Ce.displayName = 'Navigation';
var Eu = M.createContext(null);
Eu.displayName = 'Location';
var Ke = M.createContext({ outlet: null, matches: [], isDataRoute: !1 });
Ke.displayName = 'Route';
var sr = M.createContext(null);
sr.displayName = 'RouteError';
var _p = 'REACT_ROUTER_ERROR',
  _v = 'REDIRECT',
  bv = 'ROUTE_ERROR_RESPONSE';
function Sv(a) {
  if (a.startsWith(`${_p}:${_v}:{`))
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
function xv(a) {
  if (a.startsWith(`${_p}:${bv}:{`))
    try {
      let i = JSON.parse(a.slice(40));
      if (
        typeof i == 'object' &&
        i &&
        typeof i.status == 'number' &&
        typeof i.statusText == 'string'
      )
        return new dv(i.status, i.statusText, i.data);
    } catch {}
}
function Ev(a, { relative: i } = {}) {
  Bt(ya(), 'useHref() may be used only in the context of a <Router> component.');
  let { basename: o, navigator: s } = M.useContext(Ce),
    { hash: r, pathname: d, search: h } = Tu(a, { relative: i }),
    _ = d;
  return (
    o !== '/' && (_ = d === '/' ? o : Ve([o, d])),
    s.createHref({ pathname: _, search: h, hash: r })
  );
}
function ya() {
  return M.useContext(Eu) != null;
}
function Pe() {
  return (
    Bt(ya(), 'useLocation() may be used only in the context of a <Router> component.'),
    M.useContext(Eu).location
  );
}
var bp =
  'You should call navigate() in a React.useEffect(), not when your component is first rendered.';
function Sp(a) {
  M.useContext(Ce).static || M.useLayoutEffect(a);
}
function El() {
  let { isDataRoute: a } = M.useContext(Ke);
  return a ? Uv() : Tv();
}
function Tv() {
  Bt(ya(), 'useNavigate() may be used only in the context of a <Router> component.');
  let a = M.useContext(pa),
    { basename: i, navigator: o } = M.useContext(Ce),
    { matches: s } = M.useContext(Ke),
    { pathname: r } = Pe(),
    d = JSON.stringify(cr(s)),
    h = M.useRef(!1);
  return (
    Sp(() => {
      h.current = !0;
    }),
    M.useCallback(
      (g, m = {}) => {
        if ((Ze(h.current, bp), !h.current)) return;
        if (typeof g == 'number') {
          o.go(g);
          return;
        }
        let b = lc(g, JSON.parse(d), r, m.relative === 'path');
        (a == null && i !== '/' && (b.pathname = b.pathname === '/' ? i : Ve([i, b.pathname])),
          (m.replace ? o.replace : o.push)(b, m.state, m));
      },
      [i, o, d, r, a]
    )
  );
}
M.createContext(null);
function Nv() {
  let { matches: a } = M.useContext(Ke),
    i = a[a.length - 1];
  return (i == null ? void 0 : i.params) ?? {};
}
function Tu(a, { relative: i } = {}) {
  let { matches: o } = M.useContext(Ke),
    { pathname: s } = Pe(),
    r = JSON.stringify(cr(o));
  return M.useMemo(() => lc(a, JSON.parse(r), s, i === 'path'), [a, r, s, i]);
}
function Av(a, i) {
  return xp(a, i);
}
function xp(a, i, o) {
  var R;
  Bt(ya(), 'useRoutes() may be used only in the context of a <Router> component.');
  let { navigator: s } = M.useContext(Ce),
    { matches: r } = M.useContext(Ke),
    d = r[r.length - 1],
    h = d ? d.params : {},
    _ = d ? d.pathname : '/',
    g = d ? d.pathnameBase : '/',
    m = d && d.route;
  {
    let G = (m && m.path) || '';
    Tp(
      _,
      !m || G.endsWith('*') || G.endsWith('*?'),
      `You rendered descendant <Routes> (or called \`useRoutes()\`) at "${_}" (under <Route path="${G}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${G}"> to <Route path="${G === '/' ? '*' : `${G}/*`}">.`
    );
  }
  let b = Pe(),
    S;
  if (i) {
    let G = typeof i == 'string' ? ha(i) : i;
    (Bt(
      g === '/' || ((R = G.pathname) == null ? void 0 : R.startsWith(g)),
      `When overriding the location using \`<Routes location>\` or \`useRoutes(routes, location)\`, the location pathname must begin with the portion of the URL pathname that was matched by all parent routes. The current pathname base is "${g}" but pathname "${G.pathname}" was given in the \`location\` prop.`
    ),
      (S = G));
  } else S = b;
  let N = S.pathname || '/',
    E = N;
  if (g !== '/') {
    let G = g.replace(/^\//, '').split('/');
    E = '/' + N.replace(/^\//, '').split('/').slice(G.length).join('/');
  }
  let A = rp(a, { pathname: E });
  (Ze(m || A != null, `No routes matched location "${S.pathname}${S.search}${S.hash}" `),
    Ze(
      A == null ||
        A[A.length - 1].route.element !== void 0 ||
        A[A.length - 1].route.Component !== void 0 ||
        A[A.length - 1].route.lazy !== void 0,
      `Matched leaf route at location "${S.pathname}${S.search}${S.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`
    ));
  let k = zv(
    A &&
      A.map((G) =>
        Object.assign({}, G, {
          params: Object.assign({}, h, G.params),
          pathname: Ve([
            g,
            s.encodeLocation
              ? s.encodeLocation(
                  G.pathname.replace(/%/g, '%25').replace(/\?/g, '%3F').replace(/#/g, '%23')
                ).pathname
              : G.pathname,
          ]),
          pathnameBase:
            G.pathnameBase === '/'
              ? g
              : Ve([
                  g,
                  s.encodeLocation
                    ? s.encodeLocation(
                        G.pathnameBase
                          .replace(/%/g, '%25')
                          .replace(/\?/g, '%3F')
                          .replace(/#/g, '%23')
                      ).pathname
                    : G.pathnameBase,
                ]),
        })
      ),
    r,
    o
  );
  return i && k
    ? M.createElement(
        Eu.Provider,
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
        k
      )
    : k;
}
function Mv() {
  let a = Bv(),
    i = mv(a) ? `${a.status} ${a.statusText}` : a instanceof Error ? a.message : JSON.stringify(a),
    o = a instanceof Error ? a.stack : null,
    s = 'rgba(200,200,200, 0.5)',
    r = { padding: '0.5rem', backgroundColor: s },
    d = { padding: '2px 4px', backgroundColor: s },
    h = null;
  return (
    console.error('Error handled by React Router default ErrorBoundary:', a),
    (h = M.createElement(
      M.Fragment,
      null,
      M.createElement('p', null, '💿 Hey developer 👋'),
      M.createElement(
        'p',
        null,
        'You can provide a way better UX than this when your app throws errors by providing your own ',
        M.createElement('code', { style: d }, 'ErrorBoundary'),
        ' or',
        ' ',
        M.createElement('code', { style: d }, 'errorElement'),
        ' prop on your route.'
      )
    )),
    M.createElement(
      M.Fragment,
      null,
      M.createElement('h2', null, 'Unexpected Application Error!'),
      M.createElement('h3', { style: { fontStyle: 'italic' } }, i),
      o ? M.createElement('pre', { style: r }, o) : null,
      h
    )
  );
}
var Cv = M.createElement(Mv, null),
  Ep = class extends M.Component {
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
        const o = xv(a.digest);
        o && (a = o);
      }
      let i =
        a !== void 0
          ? M.createElement(
              Ke.Provider,
              { value: this.props.routeContext },
              M.createElement(sr.Provider, { value: a, children: this.props.component })
            )
          : this.props.children;
      return this.context ? M.createElement(Rv, { error: a }, i) : i;
    }
  };
Ep.contextType = gp;
var Uo = new WeakMap();
function Rv({ children: a, error: i }) {
  let { basename: o } = M.useContext(Ce);
  if (typeof i == 'object' && i && 'digest' in i && typeof i.digest == 'string') {
    let s = Sv(i.digest);
    if (s) {
      let r = Uo.get(i);
      if (r) throw r;
      let d = pp(s.location, o);
      if (hp && !Uo.get(i))
        if (d.isExternal || s.reloadDocument) window.location.href = d.absoluteURL || d.to;
        else {
          const h = Promise.resolve().then(() =>
            window.__reactRouterDataRouter.navigate(d.to, { replace: s.replace })
          );
          throw (Uo.set(i, h), h);
        }
      return M.createElement('meta', {
        httpEquiv: 'refresh',
        content: `0;url=${d.absoluteURL || d.to}`,
      });
    }
  }
  return a;
}
function jv({ routeContext: a, match: i, children: o }) {
  let s = M.useContext(pa);
  return (
    s &&
      s.static &&
      s.staticContext &&
      (i.route.errorElement || i.route.ErrorBoundary) &&
      (s.staticContext._deepestRenderedBoundaryId = i.route.id),
    M.createElement(Ke.Provider, { value: a }, o)
  );
}
function zv(a, i = [], o) {
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
    let b = r.findIndex((S) => S.route.id && (d == null ? void 0 : d[S.route.id]) !== void 0);
    (Bt(
      b >= 0,
      `Could not find a matching route for errors on route IDs: ${Object.keys(d).join(',')}`
    ),
      (r = r.slice(0, Math.min(r.length, b + 1))));
  }
  let h = !1,
    _ = -1;
  if (o && s) {
    h = s.renderFallback;
    for (let b = 0; b < r.length; b++) {
      let S = r[b];
      if (((S.route.HydrateFallback || S.route.hydrateFallbackElement) && (_ = b), S.route.id)) {
        let { loaderData: N, errors: E } = s,
          A = S.route.loader && !N.hasOwnProperty(S.route.id) && (!E || E[S.route.id] === void 0);
        if (S.route.lazy || A) {
          (o.isStatic && (h = !0), _ >= 0 ? (r = r.slice(0, _ + 1)) : (r = [r[0]]));
          break;
        }
      }
    }
  }
  let g = o == null ? void 0 : o.onError,
    m =
      s && g
        ? (b, S) => {
            var N, E;
            g(b, {
              location: s.location,
              params:
                ((E = (N = s.matches) == null ? void 0 : N[0]) == null ? void 0 : E.params) ?? {},
              unstable_pattern: hv(s.matches),
              errorInfo: S,
            });
          }
        : void 0;
  return r.reduceRight((b, S, N) => {
    let E,
      A = !1,
      k = null,
      R = null;
    s &&
      ((E = d && S.route.id ? d[S.route.id] : void 0),
      (k = S.route.errorElement || Cv),
      h &&
        (_ < 0 && N === 0
          ? (Tp(
              'route-fallback',
              !1,
              'No `HydrateFallback` element provided to render during initial hydration'
            ),
            (A = !0),
            (R = null))
          : _ === N && ((A = !0), (R = S.route.hydrateFallbackElement || null))));
    let G = i.concat(r.slice(0, N + 1)),
      I = () => {
        let V;
        return (
          E
            ? (V = k)
            : A
              ? (V = R)
              : S.route.Component
                ? (V = M.createElement(S.route.Component, null))
                : S.route.element
                  ? (V = S.route.element)
                  : (V = b),
          M.createElement(jv, {
            match: S,
            routeContext: { outlet: b, matches: G, isDataRoute: s != null },
            children: V,
          })
        );
      };
    return s && (S.route.ErrorBoundary || S.route.errorElement || N === 0)
      ? M.createElement(Ep, {
          location: s.location,
          revalidation: s.revalidation,
          component: k,
          error: E,
          children: I(),
          routeContext: { outlet: null, matches: G, isDataRoute: !0 },
          onError: m,
        })
      : I();
  }, null);
}
function or(a) {
  return `${a} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function Ov(a) {
  let i = M.useContext(pa);
  return (Bt(i, or(a)), i);
}
function Dv(a) {
  let i = M.useContext(nc);
  return (Bt(i, or(a)), i);
}
function kv(a) {
  let i = M.useContext(Ke);
  return (Bt(i, or(a)), i);
}
function rr(a) {
  let i = kv(a),
    o = i.matches[i.matches.length - 1];
  return (Bt(o.route.id, `${a} can only be used on routes that contain a unique "id"`), o.route.id);
}
function wv() {
  return rr('useRouteId');
}
function Bv() {
  var s;
  let a = M.useContext(sr),
    i = Dv('useRouteError'),
    o = rr('useRouteError');
  return a !== void 0 ? a : (s = i.errors) == null ? void 0 : s[o];
}
function Uv() {
  let { router: a } = Ov('useNavigate'),
    i = rr('useNavigate'),
    o = M.useRef(!1);
  return (
    Sp(() => {
      o.current = !0;
    }),
    M.useCallback(
      async (r, d = {}) => {
        (Ze(o.current, bp),
          o.current &&
            (typeof r == 'number'
              ? await a.navigate(r)
              : await a.navigate(r, { fromRouteId: i, ...d })));
      },
      [a, i]
    )
  );
}
var Gh = {};
function Tp(a, i, o) {
  !i && !Gh[a] && ((Gh[a] = !0), Ze(!1, o));
}
M.memo(Lv);
function Lv({ routes: a, future: i, state: o, isStatic: s, onError: r }) {
  return xp(a, void 0, { state: o, isStatic: s, onError: r });
}
function xl({ to: a, replace: i, state: o, relative: s }) {
  Bt(ya(), '<Navigate> may be used only in the context of a <Router> component.');
  let { static: r } = M.useContext(Ce);
  Ze(
    !r,
    '<Navigate> must not be used on the initial render in a <StaticRouter>. This is a no-op, but you should modify your code so the <Navigate> is only ever rendered in response to some user interaction or state change.'
  );
  let { matches: d } = M.useContext(Ke),
    { pathname: h } = Pe(),
    _ = El(),
    g = lc(a, cr(d), h, s === 'path'),
    m = JSON.stringify(g);
  return (
    M.useEffect(() => {
      _(JSON.parse(m), { replace: i, state: o, relative: s });
    }, [_, m, s, i, o]),
    null
  );
}
function Fe(a) {
  Bt(
    !1,
    'A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>.'
  );
}
function Hv({
  basename: a = '/',
  children: i = null,
  location: o,
  navigationType: s = 'POP',
  navigator: r,
  static: d = !1,
  unstable_useTransitions: h,
}) {
  Bt(
    !ya(),
    'You cannot render a <Router> inside another <Router>. You should never have more than one in your app.'
  );
  let _ = a.replace(/^\/*/, '/'),
    g = M.useMemo(
      () => ({ basename: _, navigator: r, static: d, unstable_useTransitions: h, future: {} }),
      [_, r, d, h]
    );
  typeof o == 'string' && (o = ha(o));
  let {
      pathname: m = '/',
      search: b = '',
      hash: S = '',
      state: N = null,
      key: E = 'default',
      unstable_mask: A,
    } = o,
    k = M.useMemo(() => {
      let R = Sl(m, _);
      return R == null
        ? null
        : {
            location: { pathname: R, search: b, hash: S, state: N, key: E, unstable_mask: A },
            navigationType: s,
          };
    }, [_, m, b, S, N, E, s, A]);
  return (
    Ze(
      k != null,
      `<Router basename="${_}"> is not able to match the URL "${m}${b}${S}" because it does not start with the basename, so the <Router> won't render anything.`
    ),
    k == null
      ? null
      : M.createElement(
          Ce.Provider,
          { value: g },
          M.createElement(Eu.Provider, { children: i, value: k })
        )
  );
}
function qv({ children: a, location: i }) {
  return Av(Jo(a), i);
}
function Jo(a, i = []) {
  let o = [];
  return (
    M.Children.forEach(a, (s, r) => {
      if (!M.isValidElement(s)) return;
      let d = [...i, r];
      if (s.type === M.Fragment) {
        o.push.apply(o, Jo(s.props.children, d));
        return;
      }
      (Bt(
        s.type === Fe,
        `[${typeof s.type == 'string' ? s.type : s.type.name}] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>`
      ),
        Bt(!s.props.index || !s.props.children, 'An index route cannot have child routes.'));
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
      (s.props.children && (h.children = Jo(s.props.children, d)), o.push(h));
    }),
    o
  );
}
var Ki = 'get',
  $i = 'application/x-www-form-urlencoded';
function ac(a) {
  return typeof HTMLElement < 'u' && a instanceof HTMLElement;
}
function Gv(a) {
  return ac(a) && a.tagName.toLowerCase() === 'button';
}
function Yv(a) {
  return ac(a) && a.tagName.toLowerCase() === 'form';
}
function Xv(a) {
  return ac(a) && a.tagName.toLowerCase() === 'input';
}
function Vv(a) {
  return !!(a.metaKey || a.altKey || a.ctrlKey || a.shiftKey);
}
function Qv(a, i) {
  return a.button === 0 && (!i || i === '_self') && !Vv(a);
}
var Vi = null;
function Zv() {
  if (Vi === null)
    try {
      (new FormData(document.createElement('form'), 0), (Vi = !1));
    } catch {
      Vi = !0;
    }
  return Vi;
}
var Kv = new Set(['application/x-www-form-urlencoded', 'multipart/form-data', 'text/plain']);
function Lo(a) {
  return a != null && !Kv.has(a)
    ? (Ze(
        !1,
        `"${a}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${$i}"`
      ),
      null)
    : a;
}
function $v(a, i) {
  let o, s, r, d, h;
  if (Yv(a)) {
    let _ = a.getAttribute('action');
    ((s = _ ? Sl(_, i) : null),
      (o = a.getAttribute('method') || Ki),
      (r = Lo(a.getAttribute('enctype')) || $i),
      (d = new FormData(a)));
  } else if (Gv(a) || (Xv(a) && (a.type === 'submit' || a.type === 'image'))) {
    let _ = a.form;
    if (_ == null)
      throw new Error('Cannot submit a <button> or <input type="submit"> without a <form>');
    let g = a.getAttribute('formaction') || _.getAttribute('action');
    if (
      ((s = g ? Sl(g, i) : null),
      (o = a.getAttribute('formmethod') || _.getAttribute('method') || Ki),
      (r = Lo(a.getAttribute('formenctype')) || Lo(_.getAttribute('enctype')) || $i),
      (d = new FormData(_, a)),
      !Zv())
    ) {
      let { name: m, type: b, value: S } = a;
      if (b === 'image') {
        let N = m ? `${m}.` : '';
        (d.append(`${N}x`, '0'), d.append(`${N}y`, '0'));
      } else m && d.append(m, S);
    }
  } else {
    if (ac(a))
      throw new Error(
        'Cannot submit element that is not <form>, <button>, or <input type="submit|image">'
      );
    ((o = Ki), (s = null), (r = $i), (h = a));
  }
  return (
    d && r === 'text/plain' && ((h = d), (d = void 0)),
    { action: s, method: o.toLowerCase(), encType: r, formData: d, body: h }
  );
}
Object.getOwnPropertyNames(Object.prototype).sort().join('\0');
function fr(a, i) {
  if (a === !1 || a === null || typeof a > 'u') throw new Error(i);
}
function Np(a, i, o, s) {
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
        : i && Sl(r.pathname, i) === '/'
          ? (r.pathname = `${Wi(i)}/_root.${s}`)
          : (r.pathname = `${Wi(r.pathname)}.${s}`),
    r
  );
}
async function Jv(a, i) {
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
function Iv(a) {
  return a == null
    ? !1
    : a.href == null
      ? a.rel === 'preload' && typeof a.imageSrcSet == 'string' && typeof a.imageSizes == 'string'
      : typeof a.rel == 'string' && typeof a.href == 'string';
}
async function Wv(a, i, o) {
  let s = await Promise.all(
    a.map(async (r) => {
      let d = i.routes[r.route.id];
      if (d) {
        let h = await Jv(d, o);
        return h.links ? h.links() : [];
      }
      return [];
    })
  );
  return e1(
    s
      .flat(1)
      .filter(Iv)
      .filter((r) => r.rel === 'stylesheet' || r.rel === 'preload')
      .map((r) =>
        r.rel === 'stylesheet' ? { ...r, rel: 'prefetch', as: 'style' } : { ...r, rel: 'prefetch' }
      )
  );
}
function Yh(a, i, o, s, r, d) {
  let h = (g, m) => (o[m] ? g.route.id !== o[m].route.id : !0),
    _ = (g, m) => {
      var b;
      return (
        o[m].pathname !== g.pathname ||
        (((b = o[m].route.path) == null ? void 0 : b.endsWith('*')) &&
          o[m].params['*'] !== g.params['*'])
      );
    };
  return d === 'assets'
    ? i.filter((g, m) => h(g, m) || _(g, m))
    : d === 'data'
      ? i.filter((g, m) => {
          var S;
          let b = s.routes[g.route.id];
          if (!b || !b.hasLoader) return !1;
          if (h(g, m) || _(g, m)) return !0;
          if (g.route.shouldRevalidate) {
            let N = g.route.shouldRevalidate({
              currentUrl: new URL(r.pathname + r.search + r.hash, window.origin),
              currentParams: ((S = o[0]) == null ? void 0 : S.params) || {},
              nextUrl: new URL(a, window.origin),
              nextParams: g.params,
              defaultShouldRevalidate: !0,
            });
            if (typeof N == 'boolean') return N;
          }
          return !0;
        })
      : [];
}
function Fv(a, i, { includeHydrateFallback: o } = {}) {
  return Pv(
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
function Pv(a) {
  return [...new Set(a)];
}
function t1(a) {
  let i = {},
    o = Object.keys(a).sort();
  for (let s of o) i[s] = a[s];
  return i;
}
function e1(a, i) {
  let o = new Set();
  return (
    new Set(i),
    a.reduce((s, r) => {
      let d = JSON.stringify(t1(r));
      return (o.has(d) || (o.add(d), s.push({ key: d, link: r })), s);
    }, [])
  );
}
function dr() {
  let a = M.useContext(pa);
  return (fr(a, 'You must render this element inside a <DataRouterContext.Provider> element'), a);
}
function l1() {
  let a = M.useContext(nc);
  return (
    fr(a, 'You must render this element inside a <DataRouterStateContext.Provider> element'),
    a
  );
}
var mr = M.createContext(void 0);
mr.displayName = 'FrameworkContext';
function hr() {
  let a = M.useContext(mr);
  return (fr(a, 'You must render this element inside a <HydratedRouter> element'), a);
}
function n1(a, i) {
  let o = M.useContext(mr),
    [s, r] = M.useState(!1),
    [d, h] = M.useState(!1),
    { onFocus: _, onBlur: g, onMouseEnter: m, onMouseLeave: b, onTouchStart: S } = i,
    N = M.useRef(null);
  (M.useEffect(() => {
    if ((a === 'render' && h(!0), a === 'viewport')) {
      let k = (G) => {
          G.forEach((I) => {
            h(I.isIntersecting);
          });
        },
        R = new IntersectionObserver(k, { threshold: 0.5 });
      return (
        N.current && R.observe(N.current),
        () => {
          R.disconnect();
        }
      );
    }
  }, [a]),
    M.useEffect(() => {
      if (s) {
        let k = setTimeout(() => {
          h(!0);
        }, 100);
        return () => {
          clearTimeout(k);
        };
      }
    }, [s]));
  let E = () => {
      r(!0);
    },
    A = () => {
      (r(!1), h(!1));
    };
  return o
    ? a !== 'intent'
      ? [d, N, {}]
      : [
          d,
          N,
          {
            onFocus: mu(_, E),
            onBlur: mu(g, A),
            onMouseEnter: mu(m, E),
            onMouseLeave: mu(b, A),
            onTouchStart: mu(S, E),
          },
        ]
    : [!1, N, {}];
}
function mu(a, i) {
  return (o) => {
    (a && a(o), o.defaultPrevented || i(o));
  };
}
function a1({ page: a, ...i }) {
  let o = yv(),
    { router: s } = dr(),
    r = M.useMemo(() => rp(s.routes, a, s.basename), [s.routes, a, s.basename]);
  return r
    ? o
      ? M.createElement(i1, { page: a, matches: r, ...i })
      : M.createElement(c1, { page: a, matches: r, ...i })
    : null;
}
function u1(a) {
  let { manifest: i, routeModules: o } = hr(),
    [s, r] = M.useState([]);
  return (
    M.useEffect(() => {
      let d = !1;
      return (
        Wv(a, i, o).then((h) => {
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
function i1({ page: a, matches: i, ...o }) {
  let s = Pe(),
    { future: r } = hr(),
    { basename: d } = dr(),
    h = M.useMemo(() => {
      if (a === s.pathname + s.search + s.hash) return [];
      let _ = Np(a, d, r.unstable_trailingSlashAwareDataRequests, 'rsc'),
        g = !1,
        m = [];
      for (let b of i)
        typeof b.route.shouldRevalidate == 'function' ? (g = !0) : m.push(b.route.id);
      return (
        g && m.length > 0 && _.searchParams.set('_routes', m.join(',')),
        [_.pathname + _.search]
      );
    }, [d, r.unstable_trailingSlashAwareDataRequests, a, s, i]);
  return M.createElement(
    M.Fragment,
    null,
    h.map((_) => M.createElement('link', { key: _, rel: 'prefetch', as: 'fetch', href: _, ...o }))
  );
}
function c1({ page: a, matches: i, ...o }) {
  let s = Pe(),
    { future: r, manifest: d, routeModules: h } = hr(),
    { basename: _ } = dr(),
    { loaderData: g, matches: m } = l1(),
    b = M.useMemo(() => Yh(a, i, m, d, s, 'data'), [a, i, m, d, s]),
    S = M.useMemo(() => Yh(a, i, m, d, s, 'assets'), [a, i, m, d, s]),
    N = M.useMemo(() => {
      if (a === s.pathname + s.search + s.hash) return [];
      let k = new Set(),
        R = !1;
      if (
        (i.forEach((I) => {
          var D;
          let V = d.routes[I.route.id];
          !V ||
            !V.hasLoader ||
            ((!b.some((H) => H.route.id === I.route.id) &&
              I.route.id in g &&
              (D = h[I.route.id]) != null &&
              D.shouldRevalidate) ||
            V.hasClientLoader
              ? (R = !0)
              : k.add(I.route.id));
        }),
        k.size === 0)
      )
        return [];
      let G = Np(a, _, r.unstable_trailingSlashAwareDataRequests, 'data');
      return (
        R &&
          k.size > 0 &&
          G.searchParams.set(
            '_routes',
            i
              .filter((I) => k.has(I.route.id))
              .map((I) => I.route.id)
              .join(',')
          ),
        [G.pathname + G.search]
      );
    }, [_, r.unstable_trailingSlashAwareDataRequests, g, s, d, b, i, a, h]),
    E = M.useMemo(() => Fv(S, d), [S, d]),
    A = u1(S);
  return M.createElement(
    M.Fragment,
    null,
    N.map((k) => M.createElement('link', { key: k, rel: 'prefetch', as: 'fetch', href: k, ...o })),
    E.map((k) => M.createElement('link', { key: k, rel: 'modulepreload', href: k, ...o })),
    A.map(({ key: k, link: R }) =>
      M.createElement('link', {
        key: k,
        nonce: o.nonce,
        ...R,
        crossOrigin: R.crossOrigin ?? o.crossOrigin,
      })
    )
  );
}
function s1(...a) {
  return (i) => {
    a.forEach((o) => {
      typeof o == 'function' ? o(i) : o != null && (o.current = i);
    });
  };
}
var o1 =
  typeof window < 'u' && typeof window.document < 'u' && typeof window.document.createElement < 'u';
try {
  o1 && (window.__reactRouterVersion = '7.14.2');
} catch {}
function r1({ basename: a, children: i, unstable_useTransitions: o, window: s }) {
  let r = M.useRef();
  r.current == null && (r.current = Xg({ window: s, v5Compat: !0 }));
  let d = r.current,
    [h, _] = M.useState({ action: d.action, location: d.location }),
    g = M.useCallback(
      (m) => {
        o === !1 ? _(m) : M.startTransition(() => _(m));
      },
      [o]
    );
  return (
    M.useLayoutEffect(() => d.listen(g), [d, g]),
    M.createElement(Hv, {
      basename: a,
      children: i,
      location: h.location,
      navigationType: h.action,
      navigator: d,
      unstable_useTransitions: o,
    })
  );
}
var Ap = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,
  Mp = M.forwardRef(function (
    {
      onClick: i,
      discover: o = 'render',
      prefetch: s = 'none',
      relative: r,
      reloadDocument: d,
      replace: h,
      unstable_mask: _,
      state: g,
      target: m,
      to: b,
      preventScrollReset: S,
      viewTransition: N,
      unstable_defaultShouldRevalidate: E,
      ...A
    },
    k
  ) {
    let { basename: R, navigator: G, unstable_useTransitions: I } = M.useContext(Ce),
      V = typeof b == 'string' && Ap.test(b),
      D = pp(b, R);
    b = D.to;
    let H = Ev(b, { relative: r }),
      K = Pe(),
      Z = null;
    if (_) {
      let qt = lc(_, [], K.unstable_mask ? K.unstable_mask.pathname : '/', !0);
      (R !== '/' && (qt.pathname = qt.pathname === '/' ? R : Ve([R, qt.pathname])),
        (Z = G.createHref(qt)));
    }
    let [q, F, et] = n1(s, A),
      ct = h1(b, {
        replace: h,
        unstable_mask: _,
        state: g,
        target: m,
        preventScrollReset: S,
        relative: r,
        viewTransition: N,
        unstable_defaultShouldRevalidate: E,
        unstable_useTransitions: I,
      });
    function st(qt) {
      (i && i(qt), qt.defaultPrevented || ct(qt));
    }
    let Pt = !(D.isExternal || d),
      Ht = M.createElement('a', {
        ...A,
        ...et,
        href: (Pt ? Z : void 0) || D.absoluteURL || H,
        onClick: Pt ? st : i,
        ref: s1(k, F),
        target: m,
        'data-discover': !V && o === 'render' ? 'true' : void 0,
      });
    return q && !V ? M.createElement(M.Fragment, null, Ht, M.createElement(a1, { page: H })) : Ht;
  });
Mp.displayName = 'Link';
var f1 = M.forwardRef(function (
  {
    'aria-current': i = 'page',
    caseSensitive: o = !1,
    className: s = '',
    end: r = !1,
    style: d,
    to: h,
    viewTransition: _,
    children: g,
    ...m
  },
  b
) {
  let S = Tu(h, { relative: m.relative }),
    N = Pe(),
    E = M.useContext(nc),
    { navigator: A, basename: k } = M.useContext(Ce),
    R = E != null && _1(S) && _ === !0,
    G = A.encodeLocation ? A.encodeLocation(S).pathname : S.pathname,
    I = N.pathname,
    V = E && E.navigation && E.navigation.location ? E.navigation.location.pathname : null;
  (o || ((I = I.toLowerCase()), (V = V ? V.toLowerCase() : null), (G = G.toLowerCase())),
    V && k && (V = Sl(V, k) || V));
  const D = G !== '/' && G.endsWith('/') ? G.length - 1 : G.length;
  let H = I === G || (!r && I.startsWith(G) && I.charAt(D) === '/'),
    K = V != null && (V === G || (!r && V.startsWith(G) && V.charAt(G.length) === '/')),
    Z = { isActive: H, isPending: K, isTransitioning: R },
    q = H ? i : void 0,
    F;
  typeof s == 'function'
    ? (F = s(Z))
    : (F = [s, H ? 'active' : null, K ? 'pending' : null, R ? 'transitioning' : null]
        .filter(Boolean)
        .join(' '));
  let et = typeof d == 'function' ? d(Z) : d;
  return M.createElement(
    Mp,
    { ...m, 'aria-current': q, className: F, ref: b, style: et, to: h, viewTransition: _ },
    typeof g == 'function' ? g(Z) : g
  );
});
f1.displayName = 'NavLink';
var d1 = M.forwardRef(
  (
    {
      discover: a = 'render',
      fetcherKey: i,
      navigate: o,
      reloadDocument: s,
      replace: r,
      state: d,
      method: h = Ki,
      action: _,
      onSubmit: g,
      relative: m,
      preventScrollReset: b,
      viewTransition: S,
      unstable_defaultShouldRevalidate: N,
      ...E
    },
    A
  ) => {
    let { unstable_useTransitions: k } = M.useContext(Ce),
      R = g1(),
      G = v1(_, { relative: m }),
      I = h.toLowerCase() === 'get' ? 'get' : 'post',
      V = typeof _ == 'string' && Ap.test(_),
      D = (H) => {
        if ((g && g(H), H.defaultPrevented)) return;
        H.preventDefault();
        let K = H.nativeEvent.submitter,
          Z = (K == null ? void 0 : K.getAttribute('formmethod')) || h,
          q = () =>
            R(K || H.currentTarget, {
              fetcherKey: i,
              method: Z,
              navigate: o,
              replace: r,
              state: d,
              relative: m,
              preventScrollReset: b,
              viewTransition: S,
              unstable_defaultShouldRevalidate: N,
            });
        k && o !== !1 ? M.startTransition(() => q()) : q();
      };
    return M.createElement('form', {
      ref: A,
      method: I,
      action: G,
      onSubmit: s ? g : D,
      ...E,
      'data-discover': !V && a === 'render' ? 'true' : void 0,
    });
  }
);
d1.displayName = 'Form';
function m1(a) {
  return `${a} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function Cp(a) {
  let i = M.useContext(pa);
  return (Bt(i, m1(a)), i);
}
function h1(
  a,
  {
    target: i,
    replace: o,
    unstable_mask: s,
    state: r,
    preventScrollReset: d,
    relative: h,
    viewTransition: _,
    unstable_defaultShouldRevalidate: g,
    unstable_useTransitions: m,
  } = {}
) {
  let b = El(),
    S = Pe(),
    N = Tu(a, { relative: h });
  return M.useCallback(
    (E) => {
      if (Qv(E, i)) {
        E.preventDefault();
        let A = o !== void 0 ? o : _u(S) === _u(N),
          k = () =>
            b(a, {
              replace: A,
              unstable_mask: s,
              state: r,
              preventScrollReset: d,
              relative: h,
              viewTransition: _,
              unstable_defaultShouldRevalidate: g,
            });
        m ? M.startTransition(() => k()) : k();
      }
    },
    [S, b, N, o, s, r, i, a, d, h, _, g, m]
  );
}
var p1 = 0,
  y1 = () => `__${String(++p1)}__`;
function g1() {
  let { router: a } = Cp('useSubmit'),
    { basename: i } = M.useContext(Ce),
    o = wv(),
    s = a.fetch,
    r = a.navigate;
  return M.useCallback(
    async (d, h = {}) => {
      let { action: _, method: g, encType: m, formData: b, body: S } = $v(d, i);
      if (h.navigate === !1) {
        let N = h.fetcherKey || y1();
        await s(N, o, h.action || _, {
          unstable_defaultShouldRevalidate: h.unstable_defaultShouldRevalidate,
          preventScrollReset: h.preventScrollReset,
          formData: b,
          body: S,
          formMethod: h.method || g,
          formEncType: h.encType || m,
          flushSync: h.flushSync,
        });
      } else
        await r(h.action || _, {
          unstable_defaultShouldRevalidate: h.unstable_defaultShouldRevalidate,
          preventScrollReset: h.preventScrollReset,
          formData: b,
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
    [s, r, i, o]
  );
}
function v1(a, { relative: i } = {}) {
  let { basename: o } = M.useContext(Ce),
    s = M.useContext(Ke);
  Bt(s, 'useFormAction must be used inside a RouteContext');
  let [r] = s.matches.slice(-1),
    d = { ...Tu(a || '.', { relative: i }) },
    h = Pe();
  if (a == null) {
    d.search = h.search;
    let _ = new URLSearchParams(d.search),
      g = _.getAll('index');
    if (g.some((b) => b === '')) {
      (_.delete('index'), g.filter((S) => S).forEach((S) => _.append('index', S)));
      let b = _.toString();
      d.search = b ? `?${b}` : '';
    }
  }
  return (
    (!a || a === '.') &&
      r.route.index &&
      (d.search = d.search ? d.search.replace(/^\?/, '?index&') : '?index'),
    o !== '/' && (d.pathname = d.pathname === '/' ? o : Ve([o, d.pathname])),
    _u(d)
  );
}
function _1(a, { relative: i } = {}) {
  let o = M.useContext(vp);
  Bt(
    o != null,
    "`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?"
  );
  let { basename: s } = Cp('useViewTransitionState'),
    r = Tu(a, { relative: i });
  if (!o.isTransitioning) return !1;
  let d = Sl(o.currentLocation.pathname, s) || o.currentLocation.pathname,
    h = Sl(o.nextLocation.pathname, s) || o.nextLocation.pathname;
  return Ii(r.pathname, h) != null || Ii(r.pathname, d) != null;
}
const b1 = '_layout_apkdr_1',
  S1 = '_enemies_apkdr_12',
  x1 = '_enemy_apkdr_20',
  E1 = '_targeted_apkdr_35',
  T1 = '_enemyName_apkdr_39',
  N1 = '_down_apkdr_44',
  A1 = '_log_apkdr_48',
  M1 = '_logLine_apkdr_60',
  C1 = '_party_apkdr_64',
  R1 = '_rowTag_apkdr_71',
  j1 = '_cardRow_apkdr_77',
  z1 = '_card_apkdr_77',
  O1 = '_cardActive_apkdr_99',
  D1 = '_cardDecided_apkdr_104',
  k1 = '_cardName_apkdr_108',
  w1 = '_uni_apkdr_116',
  B1 = '_cardNums_apkdr_120',
  U1 = '_cardCmd_apkdr_126',
  L1 = '_empty_apkdr_132',
  H1 = '_command_apkdr_137',
  q1 = '_skillList_apkdr_143',
  G1 = '_skillBtn_apkdr_149',
  Y1 = '_skillTop_apkdr_161',
  X1 = '_skillName_apkdr_168',
  V1 = '_skillDesc_apkdr_173',
  Q1 = '_target_apkdr_35',
  Z1 = '_cmdHead_apkdr_184',
  K1 = '_menu_apkdr_189',
  $1 = '_menuBtn_apkdr_195',
  J1 = '_tp_apkdr_212',
  I1 = '_menuBack_apkdr_218',
  W1 = '_execRow_apkdr_228',
  F1 = '_redo_apkdr_233',
  P1 = '_primary_apkdr_243',
  t_ = '_result_apkdr_258',
  e_ = '_resultTitle_apkdr_269',
  l_ = '_resultBody_apkdr_274',
  tt = {
    layout: b1,
    enemies: S1,
    enemy: x1,
    targeted: E1,
    enemyName: T1,
    down: N1,
    log: A1,
    logLine: M1,
    party: C1,
    rowTag: R1,
    cardRow: j1,
    card: z1,
    cardActive: O1,
    cardDecided: D1,
    cardName: k1,
    uni: w1,
    cardNums: B1,
    cardCmd: U1,
    empty: L1,
    command: H1,
    skillList: q1,
    skillBtn: G1,
    skillTop: Y1,
    skillName: X1,
    skillDesc: V1,
    target: Q1,
    cmdHead: Z1,
    menu: K1,
    menuBtn: $1,
    tp: J1,
    menuBack: I1,
    execRow: W1,
    redo: F1,
    primary: P1,
    result: t_,
    resultTitle: e_,
    resultBody: l_,
  },
  n_ = '_row_1t6j7_1',
  a_ = '_label_1t6j7_8',
  u_ = '_track_1t6j7_16',
  i_ = '_fill_1t6j7_24',
  c_ = '_value_1t6j7_30',
  hu = { row: n_, label: a_, track: u_, fill: i_, value: c_ },
  Ho = ({ value: a, max: i, color: o = '#4caf50', label: s, showValue: r = !0 }) => {
    const d = i > 0 ? Math.max(0, Math.min(100, (a / i) * 100)) : 0;
    return y.jsxs('div', {
      className: hu.row,
      children: [
        s ? y.jsx('span', { className: hu.label, children: s }) : null,
        y.jsx('div', {
          className: hu.track,
          children: y.jsx('div', {
            className: hu.fill,
            style: { width: `${d}%`, backgroundColor: o },
          }),
        }),
        r
          ? y.jsxs('span', {
              className: hu.value,
              children: [Math.max(0, Math.round(a)), '/', Math.round(i)],
            })
          : null,
      ],
    });
  },
  oa = {
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
  oe = {
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
function s_(a) {
  return a.category === 'material' ? 8 : Math.floor(a.buyPrice / 2);
}
const pr = {
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
  Ct = {
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
  o_ = 500,
  Io = 30,
  uc = 3,
  ic = 2,
  r_ = uc + ic,
  gu = { TITLE_DEPTH: 20, REBIRTH_MIN_LEVEL: 30 },
  Rp = 5,
  f_ = 5,
  Fi = (a) => a > 0 && a % Ct.BOSS_INTERVAL === 0,
  Xh = (a) => Math.round(Ct.EXP_CURVE_BASE * Math.pow(a, Ct.EXP_CURVE_POW)),
  qo = (a) => a < Ct.LEVEL_CAP,
  jp = (a, i) => 1 + Ct.ENEMY_SCALE_K * (a - i),
  Sn = {
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
  Me = {
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
  d_ = ['hp', 'tp', 'str', 'vit', 'agi', 'int', 'mnd', 'luc'],
  m_ = ['slash', 'pierce', 'bash'],
  Pi = (a, i, o) => Math.max(i, Math.min(o, a));
function h_(a, i) {
  const o = {};
  for (const s of d_) o[s] = Math.round(a[s] * i);
  return o;
}
function p_(a, i) {
  return h_(a.baseStats, jp(i, a.refDepth));
}
function ca(a, i) {
  const o = new Map();
  for (const r of a) {
    if (r.stat !== i) continue;
    const d = Pi(r.modifier, 0.5, 1.5),
      h = o.get(r.stackGroup);
    (h === void 0 || Math.abs(d - 1) > Math.abs(h - 1)) && o.set(r.stackGroup, d);
  }
  let s = 1;
  for (const r of o.values()) s *= r;
  return Pi(s, 0.25, 2);
}
function Vh(a, i, o) {
  const s = (a.str * 2 + (i.atk ?? 0)) * ca(o, 'patk'),
    r = (a.vit * 2 + (i.def ?? 0)) * ca(o, 'pdef'),
    d = (a.int * 2 + (i.mat ?? 0)) * ca(o, 'matk'),
    h = (a.mnd * 2 + (i.mdf ?? 0)) * ca(o, 'mdef');
  return {
    patk: s,
    pdef: r,
    matk: d,
    mdef: h,
    hit: a.agi,
    acc: a.agi * ca(o, 'acc'),
    eva: a.agi * ca(o, 'eva'),
    crit: a.luc,
  };
}
const y_ = (a) => a.ailments.some((i) => i.type === 'blind');
function zp(a, i, o, s) {
  const r = o.statBase === 'str',
    d = Vh(a.stats, a.equip, a.buffs),
    h = Vh(i.stats, i.equip, i.buffs),
    _ = r ? d.patk : d.matk,
    g = r ? h.pdef : h.mdef;
  let m = !0;
  if (r) {
    const Z = y_(a) ? Ct.BLIND_ACC_PENALTY : 0,
      q = Pi(Ct.BASE_HIT + (d.acc - h.eva) * Ct.HIT_AGI_K - Z, Ct.HIT_MIN, 1);
    m = s.next() < q;
  }
  if (!m) return { damage: 0, hit: !1, critical: !1 };
  const S = (_ * o.power * Ct.DAMAGE_DEF_K) / (Ct.DAMAGE_DEF_K + Math.max(0, g)),
    N = r && m_.includes(o.element),
    E = N && a.row === 'back' ? Ct.BACK_ROW_MELEE_MULT : 1,
    A = N && i.row === 'back' ? Ct.BACK_ROW_MELEE_MULT : 1,
    k = E * A,
    [R, G] = Ct.DMG_VARIANCE,
    I = R + s.next() * (G - R);
  let V = S * o.elementMultiplier * k * I;
  const D = Pi(
      Ct.CRIT_BASE + (a.stats.luc - i.stats.luc) * Ct.CRIT_LUC_K,
      Ct.CRIT_MIN,
      Ct.CRIT_MAX
    ),
    H = s.next() < D;
  return (
    H && (V *= Ct.CRIT_MULT),
    { damage: o.elementMultiplier === 0 ? 0 : Math.max(1, Math.floor(V)), hit: !0, critical: H }
  );
}
const ie = {
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
function Op(a, i) {
  var o;
  return ((o = a.guild.storage.find((s) => s.itemId === i)) == null ? void 0 : o.qty) ?? 0;
}
function cc(a, i, o = 1) {
  if (o <= 0) return a;
  const s = [...a.guild.storage],
    r = s.findIndex((d) => d.itemId === i);
  return (
    r >= 0 ? (s[r] = { ...s[r], qty: s[r].qty + o }) : s.push({ itemId: i, qty: o }),
    { ...a, guild: { ...a.guild, storage: s } }
  );
}
function bu(a, i, o = 1) {
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
function Dp(a, i, o) {
  return {
    ...a,
    guild: { ...a.guild, members: a.guild.members.map((s) => (s.id === i ? o(s) : s)) },
  };
}
function yr(a, i) {
  const o = Me[i];
  if (!o) return !1;
  const s = ie[a.classId];
  return s
    ? o.slot === 'weapon'
      ? !!o.weaponType && s.equipableWeaponTypes.includes(o.weaponType)
      : o.slot === 'armor'
        ? !!o.armorType && s.equipableArmorTypes.includes(o.armorType)
        : !0
    : !1;
}
function g_(a, i, o) {
  const s = Me[o],
    r = a.guild.members.find((_) => _.id === i);
  if (!s || !r || !yr(r, o) || Op(a, o) <= 0) return a;
  let d = bu(a, o, 1);
  const h = r.equipment[s.slot];
  return (
    h && (d = cc(d, h, 1)),
    Dp(d, i, (_) => ({ ..._, equipment: { ..._.equipment, [s.slot]: o } }))
  );
}
function gr(a, i, o) {
  const s = a.guild.members.find((h) => h.id === i);
  if (!s) return a;
  const r = s.equipment[o];
  if (!r) return a;
  const d = cc(a, r, 1);
  return Dp(d, i, (h) => ({ ...h, equipment: { ...h.equipment, [o]: null } }));
}
const Qe = {
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
  Jl = (a) => ({ hp: 0, tp: 0, str: 0, vit: 0, agi: 0, int: 0, mnd: 0, luc: 0, ...a }),
  da = {
    title_berserker: {
      id: 'title_berserker',
      name: '狂戦士',
      parentClassId: 'class_warrior',
      skillTree: { skills: [] },
      growthModifier: Jl({ str: 1 }),
    },
    title_sentinel: {
      id: 'title_sentinel',
      name: '哨戒兵',
      parentClassId: 'class_warrior',
      skillTree: { skills: [] },
      growthModifier: Jl({ vit: 1 }),
    },
    title_bulwark: {
      id: 'title_bulwark',
      name: '城壁',
      parentClassId: 'class_guardian',
      skillTree: { skills: [] },
      growthModifier: Jl({ vit: 1, hp: 2 }),
    },
    title_vanguard: {
      id: 'title_vanguard',
      name: '先鋒',
      parentClassId: 'class_guardian',
      skillTree: { skills: [] },
      growthModifier: Jl({ str: 1 }),
    },
    title_pyromancer: {
      id: 'title_pyromancer',
      name: '紅蓮術士',
      parentClassId: 'class_mage',
      skillTree: { skills: [] },
      growthModifier: Jl({ int: 1 }),
    },
    title_sage: {
      id: 'title_sage',
      name: '賢者',
      parentClassId: 'class_mage',
      skillTree: { skills: [] },
      growthModifier: Jl({ tp: 2, mnd: 1 }),
    },
    title_sniper: {
      id: 'title_sniper',
      name: '狙撃手',
      parentClassId: 'class_ranger',
      skillTree: { skills: [] },
      growthModifier: Jl({ agi: 1, luc: 1 }),
    },
    title_tracker: {
      id: 'title_tracker',
      name: '追跡者',
      parentClassId: 'class_ranger',
      skillTree: { skills: [] },
      growthModifier: Jl({ agi: 1 }),
    },
  },
  v_ = ['hp', 'tp', 'str', 'vit', 'agi', 'int', 'mnd', 'luc'];
function Nu(a) {
  var _, g;
  const i = Qe[a.raceId];
  if (!i) throw new Error(`computeBaseStats: 未定義の種族 "${a.raceId}"`);
  const s = Math.max(1, Math.min(a.level, Ct.LEVEL_CAP)) - 1,
    r = a.titleId ? ((_ = da[a.titleId]) == null ? void 0 : _.growthModifier) : void 0,
    d = ((g = a.rebirthBonus) == null ? void 0 : g.allStats) ?? 0,
    h = {};
  for (const m of v_) {
    const b = i.statGrowth[m] + ((r == null ? void 0 : r[m]) ?? 0);
    h[m] = i.baseStatsAtLv1[m] + b * s + d;
  }
  return h;
}
const Fl = (a, i, o) => Math.max(i, Math.min(o, a));
function __(a) {
  const i = { atk: 0, mat: 0, def: 0, mdf: 0 };
  for (const o of Object.values(a.equipment)) {
    if (!o) continue;
    const s = Me[o];
    s &&
      ((i.atk += s.bonuses.atk ?? 0),
      (i.mat += s.bonuses.mat ?? 0),
      (i.def += s.bonuses.def ?? 0),
      (i.mdf += s.bonuses.mdf ?? 0));
  }
  return i;
}
function b_(a, i) {
  var h;
  const o = a.guild.members.find((_) => _.id === i);
  if (!o) return null;
  const s = (h = a.diveState) == null ? void 0 : h.party.find((_) => _.charId === i),
    r = Nu(o),
    d = a.guild.party.front.includes(i);
  return {
    id: i,
    name: o.name,
    side: 'ally',
    row: d ? 'front' : 'back',
    stats: r,
    equip: __(o),
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
function S_(a, i, o) {
  const s = Sn[a],
    r = p_(s, o);
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
function Qh(a, i, o = 'none') {
  var _;
  const s = ((_ = a.diveState) == null ? void 0 : _.depth) ?? 1,
    d = [...a.guild.party.front, ...a.guild.party.back]
      .filter((g) => g !== null)
      .map((g) => b_(a, g))
      .filter((g) => g !== null),
    h = i.map((g, m) => S_(g, m, s));
  return {
    turn: 1,
    depth: s,
    allies: d,
    enemies: h,
    log: [],
    outcome: 'ongoing',
    firstStrike: o,
    drops: [],
    consumedItems: [],
  };
}
const He = (a, i) => (i === 'ally' ? a.allies : a.enemies).filter((o) => !o.isDown);
function ra(a, i) {
  return a.allies.find((o) => o.id === i) ?? a.enemies.find((o) => o.id === i);
}
const kp = (a, i) => {
  var o;
  return ((o = a.resist) == null ? void 0 : o[i]) ?? 1;
};
function vr(a, i, o) {
  ((a.hp = Fl(a.hp - i, 0, a.maxHp)),
    a.hp === 0 &&
      !a.isDown &&
      ((a.isDown = !0),
      (a.unionGauge = Math.floor(a.unionGauge / 2)),
      o.push({ text: `${a.name} は倒れた！` })));
}
function tc(a, i) {
  a.isDown || (a.unionGauge = Fl(a.unionGauge + i, 0, 100));
}
function Wo(a, i) {
  ((a.buffs = a.buffs.filter((o) => !(o.stat === i.stat && o.stackGroup === i.stackGroup))),
    a.buffs.push(i));
}
function x_(a, i) {
  const o = a.ailments.find((s) => s.type === i.type);
  if (o) {
    o.remainingTurns = Math.max(o.remainingTurns, i.remainingTurns);
    return;
  }
  a.ailments.push(i);
}
function E_(a, i, o) {
  return Fl(a * (1 + (i.stats.luc - o.stats.luc) * Ct.AILMENT_LUC_K), 0, Ct.AILMENT_MAX);
}
function T_(a, i, o, s) {
  switch (o.target) {
    case 'self':
      return [i];
    case 'allyAll':
      return He(a, i.side);
    case 'allyOne': {
      const r = ra(a, s);
      return r ? [r] : [];
    }
    case 'enemyAll':
      return He(a, i.side === 'ally' ? 'enemy' : 'ally');
    case 'enemyRow':
    case 'enemyOne':
    default: {
      const r = ra(a, s);
      return r ? [r] : [];
    }
  }
}
function N_(a, i, o, s, r, d, h) {
  switch (o.kind) {
    case 'damage': {
      const _ = o.hits ?? 1;
      for (const g of d)
        if (!g.isDown)
          for (let m = 0; m < _; m++) {
            const b = zp(
              i,
              g,
              { statBase: o.statBase, power: o.power(r), element: s, elementMultiplier: kp(g, s) },
              h
            );
            b.hit
              ? (vr(g, b.damage, a.log),
                tc(g, 5),
                a.log.push({
                  text: `${i.name} の攻撃！ ${g.name} に ${b.damage} ダメージ${b.critical ? '（会心）' : ''}`,
                }))
              : a.log.push({ text: `${i.name} の攻撃は外れた` });
          }
      break;
    }
    case 'heal': {
      const _ = o.amount(r);
      for (const g of d) g.isDown || (g.hp = Fl(g.hp + _, 0, g.maxHp));
      a.log.push({ text: `${i.name} は回復魔法を使った（+${_}）` });
      break;
    }
    case 'buff': {
      for (const _ of d)
        Wo(_, {
          stat: o.stat,
          modifier: o.modifier(r),
          remainingTurns: o.turns,
          stackGroup: o.stackGroup,
        });
      a.log.push({ text: `${i.name} は態勢を整えた` });
      break;
    }
    case 'ailment': {
      for (const _ of d) {
        if (_.isDown) continue;
        const g = E_(o.chance(r), i, _);
        h.next() < g &&
          (x_(_, { type: o.ailment, remainingTurns: o.turns, magnitude: o.magnitude }),
          a.log.push({ text: `${_.name} は${o.ailment}になった` }));
      }
      break;
    }
  }
}
function Zh(a, i, o, s) {
  if (o.isDown) return;
  const r = i.enemyId ? (Sn[i.enemyId].attackElement ?? 'bash') : 'bash',
    d = zp(i, o, { statBase: 'str', power: 1, element: r, elementMultiplier: kp(o, r) }, s);
  d.hit
    ? (vr(o, d.damage, a.log),
      tc(i, 5),
      tc(o, 5),
      a.log.push({
        text: `${i.name} の攻撃！ ${o.name} に ${d.damage} ダメージ${d.critical ? '（会心）' : ''}`,
      }))
    : a.log.push({ text: `${i.name} の攻撃は外れた` });
}
const Kh = (a) => (a.length === 0 ? 0 : a.reduce((i, o) => i + o.stats.agi, 0) / a.length),
  A_ = (a) => a.ailments.some((i) => i.type === 'paralysis');
function Go(a, i, o) {
  var b, S, N;
  if (a.outcome !== 'ongoing') return a;
  const s = structuredClone({ ...a, log: [] }),
    r = new Map(i.map((E) => [E.actorId, E])),
    d = s.turn === 1 && s.firstStrike !== 'none',
    h = d && s.firstStrike === 'preemptive',
    _ = d && s.firstStrike === 'ambush';
  if (
    (h && s.log.push({ text: '先制攻撃！ 味方が先手を取った' }),
    _ && s.log.push({ text: '不意打ち！ 敵に先手を取られた' }),
    !_ && i.some((E) => E.kind === 'flee'))
  ) {
    const E = Fl(0.5 + (Kh(He(s, 'ally')) - Kh(He(s, 'enemy'))) * 0.02, 0.1, 0.95);
    if (o.next() < E) return (s.log.push({ text: 'うまく逃げ切れた！' }), (s.outcome = 'fled'), s);
    s.log.push({ text: '逃げられなかった！' });
  }
  if (!_)
    for (const E of i) {
      if (E.kind !== 'guard') continue;
      const A = ra(s, E.actorId);
      !A ||
        A.isDown ||
        (Wo(A, { stat: 'pdef', modifier: 1.5, remainingTurns: 1, stackGroup: 'guard' }),
        Wo(A, { stat: 'mdef', modifier: 1.5, remainingTurns: 1, stackGroup: 'guard' }));
    }
  const g = new Map();
  if (!h)
    for (const E of He(s, 'enemy')) {
      const A = He(s, 'ally');
      A.length > 0 && g.set(E.id, o.pick(A).id);
    }
  const m = [...s.allies, ...s.enemies]
    .filter((E) => !E.isDown)
    .filter((E) => !(h && E.side === 'enemy') && !(_ && E.side === 'ally'))
    .map((E) => ({ c: E, agi: E.stats.agi, tie: o.next() }))
    .sort((E, A) => A.agi - E.agi || A.tie - E.tie)
    .map((E) => E.c);
  for (const E of m)
    if (!E.isDown) {
      if (s.outcome !== 'ongoing') break;
      if (A_(E) && o.next() < Ct.PARALYSIS_SKIP) {
        s.log.push({ text: `${E.name} は麻痺で動けない` });
        continue;
      }
      if (E.side === 'enemy') {
        const A = g.get(E.id),
          k = A ? ra(s, A) : void 0,
          R = k && !k.isDown ? k : He(s, 'ally')[0];
        R && Zh(s, E, R, o);
      } else {
        const A = r.get(E.id);
        if (!A || A.kind === 'guard' || A.kind === 'flee') continue;
        if (A.kind === 'attack') {
          const k = ra(s, A.targetId),
            R = k && !k.isDown ? k : He(s, 'enemy')[0];
          R && Zh(s, E, R, o);
        } else if (A.kind === 'skill') {
          const k = oa[A.skillId];
          if (!k) continue;
          const R = 1,
            G = k.tpCost(R);
          if (E.tp < G) {
            s.log.push({ text: `${E.name} は TP が足りない` });
            continue;
          }
          ((E.tp -= G), tc(E, 10));
          const I = T_(s, E, k, A.targetId);
          for (const V of k.effects) N_(s, E, V, k.element, R, I, o);
        } else if (A.kind === 'item') {
          const k = oe[A.itemId];
          if (!k || !((b = k.useContext) != null && b.includes('battle'))) continue;
          const R = ra(s, A.targetId) ?? E;
          for (const G of k.effects ?? [])
            G.kind === 'heal'
              ? (R.hp = Fl(R.hp + G.amount(1), 0, R.maxHp))
              : G.kind === 'restoreTp' && (R.tp = Fl(R.tp + G.amount(1), 0, R.maxTp));
          (s.consumedItems.push(A.itemId), s.log.push({ text: `${E.name} は ${k.name} を使った` }));
        }
      }
      if (He(s, 'enemy').length === 0 || He(s, 'ally').length === 0) break;
    }
  for (const E of [...s.allies, ...s.enemies]) {
    if (E.isDown) continue;
    const A = E.ailments.find((k) => k.type === 'poison');
    if (A) {
      const k = A.magnitude ?? Math.max(1, Math.floor(E.maxHp * Ct.POISON_HP_RATIO));
      (vr(E, k, s.log), s.log.push({ text: `${E.name} は毒で ${k} のダメージ` }));
    }
  }
  for (const E of [...s.allies, ...s.enemies])
    (!E.isDown &&
      E.maxTp > 0 &&
      (E.tp = Math.min(E.maxTp, E.tp + Math.ceil(E.maxTp * Ct.TP_REGEN_RATIO))),
      (E.buffs = E.buffs
        .map((A) => ({ ...A, remainingTurns: A.remainingTurns - 1 }))
        .filter((A) => A.remainingTurns > 0)),
      (E.ailments = E.ailments
        .map((A) => ({ ...A, remainingTurns: A.remainingTurns - 1 }))
        .filter((A) => A.remainingTurns > 0)));
  for (const E of s.enemies)
    if (
      !(
        !E.isDown ||
        !E.enemyId ||
        (((S = a.enemies.find((k) => k.id === E.id)) == null ? void 0 : S.isDown) ?? !1)
      )
    )
      for (const k of Sn[E.enemyId].drops ?? [])
        o.next() < k.rate &&
          (s.drops.push({ enemyId: E.enemyId, itemId: k.itemId }),
          s.log.push({
            text: `${E.name} は ${((N = oe[k.itemId]) == null ? void 0 : N.name) ?? k.itemId} を落とした`,
          }));
  return (
    (s.turn += 1),
    He(s, 'enemy').length === 0
      ? (s.outcome = 'win')
      : He(s, 'ally').length === 0 && (s.outcome = 'lose'),
    s
  );
}
function wp(a) {
  let i = 0,
    o = 0;
  for (const s of a.enemies) {
    if (!s.enemyId) continue;
    const r = Sn[s.enemyId],
      d = jp(a.depth, r.refDepth);
    ((i += Math.round(r.exp * d)), (o += Math.round(r.gold * d)));
  }
  return { exp: i, gold: o };
}
function M_(a, i) {
  let o = a.level,
    s = a.exp + (qo(o) ? i : 0),
    r = a.skillPoints.total;
  for (; qo(o) && s >= Xh(o); ) ((s -= Xh(o)), (o += 1), (r += Ct.SP_PER_LEVEL));
  return {
    ...a,
    level: o,
    exp: qo(a.level) ? s : a.exp,
    skillPoints: { ...a.skillPoints, total: r },
  };
}
function $h(a, i) {
  if (!a.diveState) return a;
  const o = i.outcome === 'win',
    s = i.outcome === 'win' || i.outcome === 'fled',
    r = new Map(i.allies.map((S) => [S.id, S])),
    d = a.diveState.party.map((S) => {
      const N = r.get(S.charId);
      if (!N) return S;
      let E = N.unionGauge;
      return (
        s && !N.isDown && (E = Fl(E + Ct.UNION_GAIN_ON_WIN, 0, 100)),
        { ...S, hp: N.hp, tp: N.tp, unionGauge: E, ailments: N.ailments }
      );
    });
  let h = a.guild.members,
    _ = a.guild.gold;
  const g = { ...a.bestiary.monsters };
  for (const S of i.enemies) {
    if (!S.enemyId) continue;
    const N = g[S.enemyId] ?? { seen: !1, defeated: !1, dropsFound: [] };
    g[S.enemyId] = { ...N, seen: !0, defeated: N.defeated || S.isDown };
  }
  if (o)
    for (const S of i.drops) {
      const N = g[S.enemyId];
      N &&
        !N.dropsFound.includes(S.itemId) &&
        (g[S.enemyId] = { ...N, dropsFound: [...N.dropsFound, S.itemId] });
    }
  const m = { ...a.bestiary, monsters: g };
  if (o) {
    const { exp: S, gold: N } = wp(i);
    _ += N;
    const E = new Set(d.map((k) => k.charId)),
      A = E.size > 0 ? Math.floor(S / E.size) : 0;
    h = h.map((k) => (E.has(k.id) ? M_(k, A) : k));
  }
  let b = {
    ...a,
    guild: { ...a.guild, members: h, gold: _, bestiary: m },
    bestiary: m,
    diveState: { ...a.diveState, party: d },
  };
  for (const S of i.consumedItems) b = bu(b, S, 1);
  if (o) for (const S of i.drops) b = cc(b, S.itemId, 1);
  return b;
}
const C_ = 8,
  Fo = 16,
  vu = 5;
function _r(a) {
  return a.range(C_, Fo);
}
function R_(a, i) {
  const o = a - 1;
  return o <= 0
    ? { stepsUntilEncounter: _r(i), triggered: !0 }
    : { stepsUntilEncounter: o, triggered: !1 };
}
function j_(a) {
  const i = Math.max(0, Fo - a),
    o = Math.round((i / Fo) * vu);
  return Math.min(vu, Math.max(0, o));
}
const qe = { N: { dx: 0, dy: -1 }, E: { dx: 1, dy: 0 }, S: { dx: 0, dy: 1 }, W: { dx: -1, dy: 0 } },
  ma = ['N', 'E', 'S', 'W'];
function Bp(a) {
  return ma[(ma.indexOf(a) + 1) % 4];
}
function Up(a) {
  return ma[(ma.indexOf(a) + 3) % 4];
}
function z_(a) {
  return ma[(ma.indexOf(a) + 2) % 4];
}
const O_ = (a, i, o) => a >= 0 && i >= 0 && a < o.width && i < o.height;
function fa(a, i, o, s) {
  if (a.cells[o][i].walls[s]) return !1;
  const r = i + qe[s].dx,
    d = o + qe[s].dy;
  return O_(r, d, a) ? a.cells[d][r].passable : !1;
}
function D_(a, i, o) {
  return fa(a, i.x, i.y, o) ? { x: i.x + qe[o].dx, y: i.y + qe[o].dy } : null;
}
function br(a, i, o) {
  return ['N', 'E', 'S', 'W'].filter((s) => !a.cells[o][i].walls[s]);
}
const Jh = ['N', 'E', 'S', 'W'],
  Yo = (a, i) => Math.abs(a.x - i.x) + Math.abs(a.y - i.y);
function k_(a, i, o, s, r) {
  const d = i.map((b) => ({ ...b, cell: { ...b.cell } })),
    h = new Map(a.foeSpawns.map((b) => [b.id, b])),
    _ = new Set(d.filter((b) => !b.defeated).map((b) => `${b.cell.x},${b.cell.y}`));
  let g = null;
  const m = [...d].sort((b, S) => b.spawnId.localeCompare(S.spawnId));
  for (const b of m) {
    if (g) break;
    if (b.defeated) continue;
    const S = h.get(b.spawnId);
    if (!S) continue;
    !b.alerted && Yo(b.cell, o) <= S.sightRange && (b.alerted = !0);
    const N = (E) => {
      if (!fa(a, b.cell.x, b.cell.y, E)) return 'blocked';
      const A = b.cell.x + qe[E].dx,
        k = b.cell.y + qe[E].dy;
      if (A === o.x && k === o.y) {
        const R = E === s;
        return (
          (g = { spawnId: b.spawnId, enemyId: S.enemyId, firstStrike: R ? 'ambush' : 'none' }),
          'contact'
        );
      }
      return _.has(`${A},${k}`)
        ? 'blocked'
        : (_.delete(`${b.cell.x},${b.cell.y}`),
          (b.cell = { x: A, y: k }),
          _.add(`${A},${k}`),
          'moved');
    };
    if (b.alerted)
      for (let E = 0; E < S.moveSpeed; E++) {
        let A = null,
          k = Yo(b.cell, o),
          R = !1;
        for (const I of Jh) {
          const V = b.cell.x + qe[I].dx,
            D = b.cell.y + qe[I].dy;
          if (V === o.x && D === o.y && fa(a, b.cell.x, b.cell.y, I)) {
            ((A = I), (R = !0));
            break;
          }
          if (!fa(a, b.cell.x, b.cell.y, I) || _.has(`${V},${D}`)) continue;
          const H = Yo({ x: V, y: D }, o);
          H < k && ((k = H), (A = I));
        }
        if (!A) break;
        const G = N(A);
        if (G === 'contact' || G === 'blocked' || R) break;
      }
    else {
      const E = S.patrol;
      if (E.kind === 'wander') {
        const A = Jh.filter(
          (k) =>
            fa(a, b.cell.x, b.cell.y, k) && !_.has(`${b.cell.x + qe[k].dx},${b.cell.y + qe[k].dy}`)
        );
        A.length > 0 && N(r.pick(A));
      } else E.kind === 'charge' && N(E.dir);
    }
  }
  return { foes: d, contact: g };
}
function w_(a) {
  return Object.values(Sn)
    .filter((i) => i.tierBand === a && !i.id.startsWith('enemy_boss'))
    .map((i) => i.id);
}
const bl = { N: { dx: 0, dy: -1 }, E: { dx: 1, dy: 0 }, S: { dx: 0, dy: 1 }, W: { dx: -1, dy: 0 } },
  B_ = { N: 'S', E: 'W', S: 'N', W: 'E' };
function U_(a) {
  return Math.min(25, 15 + Math.floor(a / 5));
}
function L_() {
  return { walls: { N: !0, E: !0, S: !0, W: !0 }, floorType: 'normal', passable: !0 };
}
const Po = (a, i, o, s) => a >= 0 && i >= 0 && a < o && i < s;
function Ih(a, i, o, s) {
  const { dx: r, dy: d } = bl[s];
  ((a[o][i].walls[s] = !1), (a[o + d][i + r].walls[B_[s]] = !1));
}
function H_(a, i, o) {
  const s = a.length,
    r = a[0].length,
    d = Array.from({ length: s }, () => Array(r).fill(-1)),
    h = [{ x: i, y: o }];
  d[o][i] = 0;
  for (let _ = 0; _ < h.length; _++) {
    const { x: g, y: m } = h[_];
    for (const b of ['N', 'E', 'S', 'W']) {
      if (a[m][g].walls[b]) continue;
      const S = g + bl[b].dx,
        N = m + bl[b].dy;
      !Po(S, N, r, s) || d[N][S] !== -1 || ((d[N][S] = d[m][g] + 1), h.push({ x: S, y: N }));
    }
  }
  return d;
}
function q_(a, i) {
  const o = U_(a),
    s = o,
    r = o,
    d = Array.from({ length: r }, () => Array.from({ length: s }, () => L_())),
    h = Array.from({ length: r }, () => Array(s).fill(!1)),
    _ = i.int(s),
    g = i.int(r),
    m = [{ x: _, y: g }];
  for (h[g][_] = !0; m.length > 0; ) {
    const V = m[m.length - 1],
      D = [];
    for (const q of ['N', 'E', 'S', 'W']) {
      const F = V.x + bl[q].dx,
        et = V.y + bl[q].dy;
      Po(F, et, s, r) && !h[et][F] && D.push(q);
    }
    if (D.length === 0) {
      m.pop();
      continue;
    }
    const H = i.pick(D);
    Ih(d, V.x, V.y, H);
    const K = V.x + bl[H].dx,
      Z = V.y + bl[H].dy;
    ((h[Z][K] = !0), m.push({ x: K, y: Z }));
  }
  const b = Math.floor((s * r) / 25);
  for (let V = 0; V < b; V++) {
    const D = i.int(s),
      H = i.int(r),
      K = i.pick(['N', 'E', 'S', 'W']),
      Z = D + bl[K].dx,
      q = H + bl[K].dy;
    Po(Z, q, s, r) && d[H][D].walls[K] && Ih(d, D, H, K);
  }
  const S = i.int(s),
    N = i.int(r),
    E = H_(d, S, N);
  let A = S,
    k = N,
    R = -1;
  for (let V = 0; V < r; V++)
    for (let D = 0; D < s; D++) E[V][D] > R && ((R = E[V][D]), (A = D), (k = V));
  ((d[N][S].event = { kind: 'stairsDown' }), (d[k][A].event = { kind: 'stairsUp' }));
  const G = Math.floor((a - 1) / 10),
    I = [];
  if (!Fi(a)) {
    const V = w_(G),
      D = 1 + Math.floor(a / 8);
    for (let H = 0; H < D && V.length > 0; H++) {
      let K = i.int(s),
        Z = i.int(r);
      for (let q = 0; q < 20; q++) {
        ((K = i.int(s)), (Z = i.int(r)));
        const F = d[Z][K].event,
          et = Math.abs(K - S) + Math.abs(Z - N) >= 3;
        if (!F && et) break;
      }
      I.push({
        id: `foe_${H}`,
        enemyId: i.pick(V),
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
    width: s,
    height: r,
    cells: d,
    encounterTable: `band_${G}`,
    foeSpawns: I,
    bgmId: Fi(a) ? 'bgm_boss' : 'bgm_dungeon',
  };
}
function Lp(a, i) {
  var o;
  for (let s = 0; s < a.height; s++)
    for (let r = 0; r < a.width; r++)
      if (((o = a.cells[s][r].event) == null ? void 0 : o.kind) === i) return { x: r, y: s };
  return null;
}
const G_ = 4294967296;
function Y_(a, i) {
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
class Sr {
  constructor(i, o) {
    Ro(this, 'baseSeed');
    Ro(this, '_state');
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
      ((i ^ (i >>> 14)) >>> 0) / G_
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
    const o = Y_(this.baseSeed, i);
    return new Sr(o, o);
  }
}
function ga(a) {
  return new Sr(a, a);
}
function X_() {
  return Math.floor(Math.random() * 4294967296) >>> 0;
}
const Wh = (a, i) => `${a},${i}`;
function V_(a, i) {
  return ga(a).fork(`floor:${i}`);
}
function Hp(a, i) {
  const o = a.towerState.floors[i];
  if (o) return { save: a, floor: o };
  const s = q_(i, V_(a.masterSeed, i)),
    r = s.foeSpawns.map((_) => ({
      spawnId: _.id,
      cell: { ..._.startCell },
      defeated: !1,
      alerted: !1,
    })),
    d = {
      depth: i,
      seed: a.masterSeed,
      generated: s,
      isBossFloor: Fi(i),
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
function Q_(a) {
  const i = [...a.guild.party.front, ...a.guild.party.back].filter((s) => s !== null),
    o = [];
  for (const s of i) {
    const r = a.guild.members.find((h) => h.id === s);
    if (!r) continue;
    const d = Nu(r);
    o.push({ charId: s, hp: d.hp, tp: d.tp, unionGauge: 0, ailments: [] });
  }
  return o;
}
function ec(a, i, o, s) {
  const r = a.towerState.floors[i].generated,
    d = new Set(a.exploredCells[i] ?? []);
  d.add(Wh(o, s));
  for (const h of br(r, o, s)) {
    const _ = o + (h === 'E' ? 1 : h === 'W' ? -1 : 0),
      g = s + (h === 'S' ? 1 : h === 'N' ? -1 : 0);
    d.add(Wh(_, g));
  }
  return { ...a, exploredCells: { ...a.exploredCells, [i]: [...d] } };
}
function qp(a, i, o) {
  var g, m;
  const s = Hp(a, i);
  let r = s.save;
  const d = s.floor.generated,
    h = Lp(d, 'stairsDown') ?? { x: 0, y: 0 },
    _ = br(d, h.x, h.y)[0] ?? 'N';
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
        dir: _,
        party: ((g = r.diveState) == null ? void 0 : g.party) ?? Q_(r),
        persistentSummons: ((m = r.diveState) == null ? void 0 : m.persistentSummons) ?? [],
        encounter: { stepsUntilEncounter: _r(o) },
        pendingFoeBattle: null,
      },
    }),
    ec(r, i, h.x, h.y)
  );
}
function Z_(a, i = 1) {
  const o = ga(a.masterSeed).fork(`dive:${a.towerState.record.totalDives}`),
    s = {
      ...a,
      diveState: null,
      towerState: {
        ...a.towerState,
        record: { ...a.towerState.record, totalDives: a.towerState.record.totalDives + 1 },
      },
    };
  return qp(s, i, o);
}
function Gp(a, i) {
  return a.diveState ? { ...a, diveState: { ...a.diveState, dir: i } } : a;
}
function Yp(a, i, o) {
  const s = a.towerState.floors[i];
  return {
    ...a,
    towerState: {
      ...a.towerState,
      floors: { ...a.towerState.floors, [i]: { ...s, foeRuntime: o } },
    },
  };
}
function K_(a, i, o) {
  const s = a.diveState;
  if (!s) return { save: a, moved: !1, triggered: !1 };
  const r = a.towerState.floors[s.depth],
    d = r.generated,
    h = D_(d, s.pos, i);
  if (!h) return { save: Gp(a, i), moved: !1, triggered: !1 };
  const _ = r.foeRuntime.find((S) => !S.defeated && S.cell.x === h.x && S.cell.y === h.y);
  if (_) {
    const S = d.foeSpawns.find((A) => A.id === _.spawnId),
      N = S ? { spawnId: _.spawnId, enemyId: S.enemyId, firstStrike: 'preemptive' } : null;
    let E = { ...a, diveState: { ...s, pos: h, dir: i, pendingFoeBattle: N } };
    return ((E = ec(E, s.depth, h.x, h.y)), { save: E, moved: !0, triggered: N !== null });
  }
  const g = R_(s.encounter.stepsUntilEncounter, o);
  let m = {
    ...a,
    diveState: {
      ...s,
      pos: h,
      dir: i,
      encounter: { stepsUntilEncounter: g.stepsUntilEncounter },
      pendingFoeBattle: null,
    },
  };
  m = ec(m, s.depth, h.x, h.y);
  const b = k_(d, r.foeRuntime, h, i, o);
  return (
    (m = Yp(m, s.depth, b.foes)),
    b.contact
      ? ((m = {
          ...m,
          diveState: {
            ...m.diveState,
            pendingFoeBattle: {
              spawnId: b.contact.spawnId,
              enemyId: b.contact.enemyId,
              firstStrike: b.contact.firstStrike,
            },
          },
        }),
        { save: m, moved: !0, triggered: !0 })
      : { save: m, moved: !0, triggered: g.triggered }
  );
}
function $_(a, i) {
  const o = a.diveState;
  if (!o) return a;
  const s = o.pendingFoeBattle;
  let r = { ...a, diveState: { ...o, pendingFoeBattle: null } };
  if (s && i) {
    const h = r.towerState.floors[o.depth].foeRuntime.map((_) =>
      _.spawnId === s.spawnId ? { ..._, defeated: !0 } : _
    );
    r = Yp(r, o.depth, h);
  }
  return r;
}
function Fh(a) {
  const i = a.diveState;
  if (!i) return null;
  const o = a.towerState.floors[i.depth].generated.cells[i.pos.y][i.pos.x].event;
  return (o == null ? void 0 : o.kind) === 'stairsUp' ||
    (o == null ? void 0 : o.kind) === 'stairsDown'
    ? o.kind
    : null;
}
function J_(a) {
  if (!a.diveState) return a;
  const i = a.diveState.depth + 1,
    o = ga(a.masterSeed).fork(`enc:${i}:${a.towerState.record.totalDives}`);
  return qp(a, i, o);
}
function I_(a) {
  if (!a.diveState) return a;
  const i = a.diveState.depth;
  if (i <= 1) return Su(a);
  const o = i - 1,
    s = Hp(a, o),
    r = Lp(s.floor.generated, 'stairsUp') ?? { x: 0, y: 0 },
    d = ga(a.masterSeed).fork(`enc:${o}:${a.towerState.record.totalDives}`);
  let h = s.save;
  const _ = s.floor.generated,
    g = br(_, r.x, r.y)[0] ?? 'N';
  return (
    (h = {
      ...h,
      diveState: {
        ...h.diveState,
        depth: o,
        pos: { x: r.x, y: r.y },
        dir: g,
        encounter: { stepsUntilEncounter: _r(d) },
        pendingFoeBattle: null,
      },
    }),
    ec(h, o, r.x, r.y)
  );
}
function Su(a) {
  return { ...a, diveState: null };
}
const W_ = { 10: 'enemy_boss_gatekeeper' };
function F_(a) {
  const i = Math.floor((a - 1) / 10);
  return Object.values(Sn)
    .filter((o) => o.tierBand === i && !o.id.startsWith('enemy_boss'))
    .map((o) => o.id);
}
function P_(a, i) {
  if (Fi(a)) {
    const r = W_[a];
    if (r) return [r];
  }
  const o = F_(a);
  if (o.length === 0) return [];
  const s = i.range(1, 3);
  return Array.from({ length: s }, () => i.pick(o));
}
const Ji = 1,
  tb = { autoMap: 'on', bgmVolume: 0.6, seVolume: 0.6 };
function Ph() {
  return { monsters: {}, items: {} };
}
function eb() {
  return { deepestReached: 0, highestBossDefeated: 0, totalDives: 0, bossDefeatLog: [] };
}
const lb = () => ({ weapon: null, armor: null, accessory: null });
function nb() {
  return `char_${Date.now().toString(36)}_${Math.floor(Math.random() * 16777215).toString(36)}`;
}
function Xp(a) {
  var _;
  const { raceId: i, classId: o, name: s, id: r } = a;
  if (!Qe[i]) throw new Error(`createCharacter: 未定義の種族 "${i}"`);
  if (!ie[o]) throw new Error(`createCharacter: 未定義の職業 "${o}"`);
  const d = (_ = ie[o].skillTree.skills[0]) == null ? void 0 : _.skillId,
    h = d ? { [d]: 1 } : {};
  return {
    id: r ?? nb(),
    name: s,
    raceId: i,
    classId: o,
    titleId: null,
    level: 1,
    exp: 0,
    skillPoints: { total: 0, spent: 0 },
    learnedSkills: h,
    equipment: lb(),
  };
}
function ab() {
  return { front: Array(uc).fill(null), back: Array(ic).fill(null) };
}
function ub(a, i) {
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
function ib(a, i) {
  return a.guild.members.length >= Io
    ? a
    : {
        ...a,
        guild: { ...a.guild, members: [...a.guild.members, i], party: ub(a.guild.party, i.id) },
      };
}
function cb(a) {
  return {
    schemaVersion: Ji,
    savedAt: 0,
    masterSeed: X_(),
    settings: { ...tb },
    guild: { name: a, gold: o_, members: [], party: ab(), storage: [], bestiary: Ph() },
    towerState: { floors: {}, bossGates: {}, warp: { unlockedCheckpoints: [] }, record: eb() },
    diveState: null,
    bestiary: Ph(),
    playerMaps: {},
    exploredCells: {},
    forgeInventory: { fragments: {}, ingots: { copper: 0, silver: 0, gold: 0 } },
    shopStock: { unlockedTier: 0, unlockedItemIds: [] },
    flags: {},
  };
}
const tr = (a, i) => i.some((o) => a instanceof o);
let tp, ep;
function sb() {
  return tp || (tp = [IDBDatabase, IDBObjectStore, IDBIndex, IDBCursor, IDBTransaction]);
}
function ob() {
  return (
    ep ||
    (ep = [
      IDBCursor.prototype.advance,
      IDBCursor.prototype.continue,
      IDBCursor.prototype.continuePrimaryKey,
    ])
  );
}
const er = new WeakMap(),
  Xo = new WeakMap(),
  sc = new WeakMap();
function rb(a) {
  const i = new Promise((o, s) => {
    const r = () => {
        (a.removeEventListener('success', d), a.removeEventListener('error', h));
      },
      d = () => {
        (o(bn(a.result)), r());
      },
      h = () => {
        (s(a.error), r());
      };
    (a.addEventListener('success', d), a.addEventListener('error', h));
  });
  return (sc.set(i, a), i);
}
function fb(a) {
  if (er.has(a)) return;
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
  er.set(a, i);
}
let lr = {
  get(a, i, o) {
    if (a instanceof IDBTransaction) {
      if (i === 'done') return er.get(a);
      if (i === 'store')
        return o.objectStoreNames[1] ? void 0 : o.objectStore(o.objectStoreNames[0]);
    }
    return bn(a[i]);
  },
  set(a, i, o) {
    return ((a[i] = o), !0);
  },
  has(a, i) {
    return a instanceof IDBTransaction && (i === 'done' || i === 'store') ? !0 : i in a;
  },
};
function Vp(a) {
  lr = a(lr);
}
function db(a) {
  return ob().includes(a)
    ? function (...i) {
        return (a.apply(nr(this), i), bn(this.request));
      }
    : function (...i) {
        return bn(a.apply(nr(this), i));
      };
}
function mb(a) {
  return typeof a == 'function'
    ? db(a)
    : (a instanceof IDBTransaction && fb(a), tr(a, sb()) ? new Proxy(a, lr) : a);
}
function bn(a) {
  if (a instanceof IDBRequest) return rb(a);
  if (Xo.has(a)) return Xo.get(a);
  const i = mb(a);
  return (i !== a && (Xo.set(a, i), sc.set(i, a)), i);
}
const nr = (a) => sc.get(a);
function hb(a, i, { blocked: o, upgrade: s, blocking: r, terminated: d } = {}) {
  const h = indexedDB.open(a, i),
    _ = bn(h);
  return (
    s &&
      h.addEventListener('upgradeneeded', (g) => {
        s(bn(h.result), g.oldVersion, g.newVersion, bn(h.transaction), g);
      }),
    o && h.addEventListener('blocked', (g) => o(g.oldVersion, g.newVersion, g)),
    _.then((g) => {
      (d && g.addEventListener('close', () => d()),
        r && g.addEventListener('versionchange', (m) => r(m.oldVersion, m.newVersion, m)));
    }).catch(() => {}),
    _
  );
}
const pb = ['get', 'getKey', 'getAll', 'getAllKeys', 'count'],
  yb = ['put', 'add', 'delete', 'clear'],
  Vo = new Map();
function lp(a, i) {
  if (!(a instanceof IDBDatabase && !(i in a) && typeof i == 'string')) return;
  if (Vo.get(i)) return Vo.get(i);
  const o = i.replace(/FromIndex$/, ''),
    s = i !== o,
    r = yb.includes(o);
  if (!(o in (s ? IDBIndex : IDBObjectStore).prototype) || !(r || pb.includes(o))) return;
  const d = async function (h, ..._) {
    const g = this.transaction(h, r ? 'readwrite' : 'readonly');
    let m = g.store;
    return (s && (m = m.index(_.shift())), (await Promise.all([m[o](..._), r && g.done]))[0]);
  };
  return (Vo.set(i, d), d);
}
Vp((a) => ({
  ...a,
  get: (i, o, s) => lp(i, o) || a.get(i, o, s),
  has: (i, o) => !!lp(i, o) || a.has(i, o),
}));
const gb = ['continue', 'continuePrimaryKey', 'advance'],
  np = {},
  ar = new WeakMap(),
  Qp = new WeakMap(),
  vb = {
    get(a, i) {
      if (!gb.includes(i)) return a[i];
      let o = np[i];
      return (
        o ||
          (o = np[i] =
            function (...s) {
              ar.set(this, Qp.get(this)[i](...s));
            }),
        o
      );
    },
  };
async function* _b(...a) {
  let i = this;
  if ((i instanceof IDBCursor || (i = await i.openCursor(...a)), !i)) return;
  i = i;
  const o = new Proxy(i, vb);
  for (Qp.set(o, i), sc.set(o, nr(i)); i; )
    (yield o, (i = await (ar.get(o) || i.continue())), ar.delete(o));
}
function ap(a, i) {
  return (
    (i === Symbol.asyncIterator && tr(a, [IDBIndex, IDBObjectStore, IDBCursor])) ||
    (i === 'iterate' && tr(a, [IDBIndex, IDBObjectStore]))
  );
}
Vp((a) => ({
  ...a,
  get(i, o, s) {
    return ap(i, o) ? _b : a.get(i, o, s);
  },
  has(i, o) {
    return ap(i, o) || a.has(i, o);
  },
}));
const bb = {};
function Sb(a) {
  return structuredClone(a);
}
function yu(a) {
  return typeof a == 'object' && a !== null && !Array.isArray(a);
}
function xb(a) {
  if (
    !yu(a) ||
    typeof a.schemaVersion != 'number' ||
    typeof a.masterSeed != 'number' ||
    !yu(a.guild)
  )
    return !1;
  const i = a.guild;
  return !(
    typeof i.name != 'string' ||
    !Array.isArray(i.members) ||
    !yu(a.towerState) ||
    !yu(a.towerState.record) ||
    typeof a.towerState.record.deepestReached != 'number'
  );
}
function Zp(a) {
  if (!yu(a) || typeof a.schemaVersion != 'number')
    return { ok: !1, reason: 'セーブデータの構造が不正です' };
  let i = a.schemaVersion;
  if (i > Ji) return { ok: !1, reason: `未知のバージョン (${i} > ${Ji}) のセーブデータです` };
  let o = { ...a };
  for (; i < Ji; ) {
    const s = bb[i];
    if (!s) return { ok: !1, reason: `バージョン ${i} の migration が未定義です` };
    ((o = s(o)), (i = typeof o.schemaVersion == 'number' ? o.schemaVersion : i + 1));
  }
  return xb(o)
    ? { ok: !0, data: o }
    : { ok: !1, reason: 'migration 後のデータが SaveData の形をしていません' };
}
function Eb(a) {
  return {
    guildName: a.guild.name,
    deepestReached: a.towerState.record.deepestReached,
    memberCount: a.guild.members.length,
    savedAt: a.savedAt,
  };
}
function up() {
  return {
    guildName: '(破損データ)',
    deepestReached: 0,
    memberCount: 0,
    savedAt: 0,
    corrupted: !0,
  };
}
const Tb = 'sekaiju-like-game',
  Nb = 1,
  xu = 'saves',
  xr = 'main';
let Qo = null;
function Er() {
  return (
    Qo ||
      (Qo = hb(Tb, Nb, {
        upgrade(a) {
          a.objectStoreNames.contains(xu) || a.createObjectStore(xu);
        },
      })),
    Qo
  );
}
async function Zo(a) {
  const i = { ...a, savedAt: Date.now() };
  return (await (await Er()).put(xu, Sb(i), xr), i);
}
async function Ab() {
  const i = await (await Er()).get(xu, xr);
  return i === void 0 ? { ok: !1, reason: 'empty' } : Zp(i);
}
async function Mb() {
  const i = await (await Er()).get(xu, xr);
  if (i === void 0) return null;
  const o = Zp(i);
  if (!o.ok) return up();
  try {
    return Eb(o.data);
  } catch {
    return up();
  }
}
const Kp = { save: null, saving: !1 };
function Cb(a, i) {
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
      return { ...Kp };
  }
}
const $p = M.createContext(null);
function Rb(a) {
  const i = M.useRef(a);
  return ((i.current = a), i);
}
function jb({ children: a }) {
  const [i, o] = M.useReducer(Cb, Kp),
    s = Rb(i),
    r = M.useCallback(async (S) => {
      const N = cb(S),
        E = await Zo(N);
      o({ type: 'load', save: E });
    }, []),
    d = M.useCallback(async () => {
      const S = await Ab();
      return S.ok ? (o({ type: 'load', save: S.data }), { ok: !0 }) : { ok: !1, reason: S.reason };
    }, []),
    h = M.useCallback((S) => {
      o({ type: 'updateSave', updater: S });
    }, []),
    _ = M.useCallback(
      async (S) => {
        const N = s.current.save;
        if (!N) return;
        const E = S(N);
        (o({ type: 'setSave', save: E }), o({ type: 'saving', saving: !0 }));
        try {
          const A = await Zo(E);
          o({ type: 'setSave', save: A });
        } finally {
          o({ type: 'saving', saving: !1 });
        }
      },
      [s]
    ),
    g = M.useCallback(async () => {
      const { save: S } = s.current;
      if (S) {
        o({ type: 'saving', saving: !0 });
        try {
          const N = await Zo(S);
          o({ type: 'setSave', save: N });
        } finally {
          o({ type: 'saving', saving: !1 });
        }
      }
    }, [s]),
    m = M.useCallback(() => {
      o({ type: 'clear' });
    }, []),
    b = M.useMemo(
      () => ({
        ...i,
        startNewGame: r,
        continueGame: d,
        applySave: h,
        applyAndPersist: _,
        persist: g,
        exitToTitle: m,
      }),
      [i, r, d, h, _, g, m]
    );
  return y.jsx($p.Provider, { value: b, children: a });
}
function xn() {
  const a = M.useContext($p);
  if (!a) throw new Error('useGameState は GameStateProvider の内側で使ってください');
  return a;
}
const zb = () => {
    var Et;
    const a = El(),
      { save: i, applyAndPersist: o } = xn(),
      s = M.useRef(null),
      [r, d] = M.useState(null),
      [h, _] = M.useState({}),
      [g, m] = M.useState(null),
      [b, S] = M.useState(!1),
      [N, E] = M.useState(!1),
      [A, k] = M.useState(null),
      [R, G] = M.useState(!1);
    M.useEffect(() => {
      if (r || !(i != null && i.diveState)) return;
      const v = i.diveState.depth,
        w = (i.masterSeed ^ (v * 2654435761) ^ (i.towerState.record.totalDives * 40503)) >>> 0;
      s.current = ga(w);
      const Q = i.diveState.pendingFoeBattle;
      d(Q ? Qh(i, [Q.enemyId], Q.firstStrike) : Qh(i, P_(v, s.current)));
    }, [i, r]);
    const I = M.useRef(!1);
    M.useEffect(() => {
      !r ||
        !s.current ||
        I.current ||
        (r.turn === 1 &&
          r.firstStrike === 'ambush' &&
          r.outcome === 'ongoing' &&
          ((I.current = !0), d(Go(r, [], s.current))));
    }, [r]);
    const V = M.useMemo(() => (r == null ? void 0 : r.enemies.filter((v) => !v.isDown)) ?? [], [r]),
      D = M.useMemo(() => (r == null ? void 0 : r.allies.filter((v) => !v.isDown)) ?? [], [r]);
    (M.useEffect(() => {
      V.length > 0 && !V.some((v) => v.id === A) && k(V[0].id);
    }, [V, A]),
      M.useEffect(() => {
        if ((r == null ? void 0 : r.outcome) !== 'ongoing' || (g && D.some((w) => w.id === g)))
          return;
        const v = D.find((w) => !h[w.id]) ?? null;
        m(v ? v.id : null);
      }, [r, D, g, h]));
    const H = D.length > 0 && D.every((v) => h[v.id] !== void 0),
      K = M.useCallback(
        (v, w) => {
          const Q = { ...h, [v]: w };
          (_(Q), S(!1), E(!1));
          const $ = D.find((lt) => lt.id !== v && !Q[lt.id]);
          m($ ? $.id : null);
        },
        [h, D]
      ),
      Z = M.useCallback(
        async (v) => {
          G(!0);
          const w = v.outcome === 'win';
          v.outcome === 'lose'
            ? (await o((Q) => Su($h(Q, v))), a('/town'))
            : (await o((Q) => $_($h(Q, v), w)), a('/dungeon'));
        },
        [o, a]
      ),
      q = M.useCallback(() => {
        var v;
        (_({}), S(!1), E(!1), m(((v = D[0]) == null ? void 0 : v.id) ?? null));
      }, [D]),
      F = M.useCallback(() => {
        var $;
        if (!r || !s.current || r.outcome !== 'ongoing') return;
        const v = A ?? (($ = V[0]) == null ? void 0 : $.id) ?? '',
          w = D.map((lt) => {
            const rt = h[lt.id] ?? { kind: 'attack' };
            return rt.kind === 'guard'
              ? { kind: 'guard', actorId: lt.id }
              : rt.kind === 'skill'
                ? { kind: 'skill', actorId: lt.id, skillId: rt.skillId, targetId: v }
                : rt.kind === 'item'
                  ? { kind: 'item', actorId: lt.id, itemId: rt.itemId, targetId: lt.id }
                  : { kind: 'attack', actorId: lt.id, targetId: v };
          }),
          Q = Go(r, w, s.current);
        (d(Q), _({}), S(!1), E(!1), m(null));
      }, [r, h, A, D, V]),
      et = M.useCallback(() => {
        if (!r || !s.current || r.outcome !== 'ongoing') return;
        const v = D[0];
        v && (d(Go(r, [{ kind: 'flee', actorId: v.id }], s.current)), _({}), m(null));
      }, [r, D]);
    if (!i || !i.diveState) return y.jsx(xl, { to: '/town', replace: !0 });
    if (!r) return y.jsx('div', { className: tt.layout, children: '戦闘準備中...' });
    const ct = (v) => {
        const w = i.guild.members.find((Q) => Q.id === v.id);
        return w
          ? Object.keys(w.learnedSkills).filter((Q) => Q in oa && v.tp >= oa[Q].tpCost(1))
          : [];
      },
      st = () => {
        const v = (Q) => Object.values(h).filter(($) => $.kind === 'item' && $.itemId === Q).length,
          w = (Q) => r.consumedItems.filter(($) => $ === Q).length;
        return i.guild.storage
          .filter((Q) => {
            var $, lt;
            return (lt = ($ = oe[Q.itemId]) == null ? void 0 : $.useContext) == null
              ? void 0
              : lt.includes('battle');
          })
          .map((Q) => ({ id: Q.itemId, remaining: Op(i, Q.itemId) - w(Q.itemId) - v(Q.itemId) }))
          .filter((Q) => Q.remaining > 0);
      },
      Pt = (v) => {
        var Q, $;
        const w = h[v.id];
        return w
          ? w.kind === 'attack'
            ? '攻撃'
            : w.kind === 'guard'
              ? '防御'
              : w.kind === 'item'
                ? (((Q = oe[w.itemId]) == null ? void 0 : Q.name) ?? 'どうぐ')
                : ((($ = oa[w.skillId]) == null ? void 0 : $.name) ?? 'スキル')
          : '';
      },
      Ht = g ? D.find((v) => v.id === g) : void 0,
      qt = ((Et = r.enemies.find((v) => v.id === A)) == null ? void 0 : Et.name) ?? '-',
      L = wp(r),
      J = (v) =>
        y.jsxs(
          'button',
          {
            type: 'button',
            className: [
              tt.card,
              v.isDown ? tt.down : '',
              g === v.id ? tt.cardActive : '',
              h[v.id] ? tt.cardDecided : '',
            ].join(' '),
            disabled: v.isDown || r.outcome !== 'ongoing',
            onClick: () => {
              (m(v.id), S(!1), E(!1));
            },
            children: [
              y.jsxs('div', {
                className: tt.cardName,
                children: [
                  v.name,
                  v.unionGauge >= 100 ? y.jsx('span', { className: tt.uni, children: '★' }) : null,
                ],
              }),
              y.jsx(Ho, { value: v.hp, max: v.maxHp, color: '#4caf50', showValue: !1 }),
              y.jsx(Ho, { value: v.tp, max: v.maxTp, color: '#2196f3', showValue: !1 }),
              y.jsxs('div', {
                className: tt.cardNums,
                children: ['HP ', Math.max(0, v.hp), ' · TP ', v.tp],
              }),
              h[v.id] ? y.jsxs('div', { className: tt.cardCmd, children: ['▶ ', Pt(v)] }) : null,
            ],
          },
          v.id
        ),
      it = r.allies.filter((v) => v.row === 'front'),
      St = r.allies.filter((v) => v.row === 'back');
    return y.jsxs('div', {
      className: tt.layout,
      children: [
        y.jsx('div', {
          className: tt.enemies,
          children: r.enemies.map((v) =>
            y.jsxs(
              'button',
              {
                type: 'button',
                className: `${tt.enemy} ${v.isDown ? tt.down : ''} ${A === v.id ? tt.targeted : ''}`,
                disabled: v.isDown,
                onClick: () => k(v.id),
                children: [
                  y.jsxs('span', {
                    className: tt.enemyName,
                    children: [v.name, v.ailments.length > 0 ? ' 🌀' : ''],
                  }),
                  y.jsx(Ho, { value: v.hp, max: v.maxHp, color: '#e57373', showValue: !1 }),
                ],
              },
              v.id
            )
          ),
        }),
        y.jsxs('div', {
          className: tt.party,
          children: [
            y.jsx('div', { className: tt.rowTag, children: '前衛' }),
            y.jsx('div', { className: tt.cardRow, children: it.map(J) }),
            y.jsx('div', { className: tt.rowTag, children: '後衛（近接ダメージ -30%）' }),
            y.jsx('div', {
              className: tt.cardRow,
              children:
                St.length > 0
                  ? St.map(J)
                  : y.jsx('div', { className: tt.empty, children: '（なし）' }),
            }),
          ],
        }),
        r.outcome !== 'ongoing'
          ? y.jsxs('div', {
              className: tt.result,
              children: [
                y.jsx('div', {
                  className: tt.resultTitle,
                  children:
                    r.outcome === 'win' ? '勝利！' : r.outcome === 'fled' ? '逃走した' : '全滅...',
                }),
                r.outcome === 'win'
                  ? y.jsxs('div', {
                      className: tt.resultBody,
                      children: ['経験値 ', L.exp, ' ／ ', L.gold, ' G を獲得'],
                    })
                  : r.outcome === 'lose'
                    ? y.jsx('div', { className: tt.resultBody, children: '拠点へ帰還する' })
                    : null,
                y.jsx('button', {
                  type: 'button',
                  className: tt.primary,
                  disabled: R,
                  onClick: () => void Z(r),
                  children: 'つづける',
                }),
              ],
            })
          : y.jsxs('div', {
              className: tt.command,
              children: [
                y.jsxs('div', {
                  className: tt.target,
                  children: ['対象: ', qt, '（敵をタップで変更）'],
                }),
                Ht
                  ? y.jsxs(y.Fragment, {
                      children: [
                        y.jsxs('div', {
                          className: tt.cmdHead,
                          children: [Ht.name, ' のコマンド'],
                        }),
                        b
                          ? y.jsxs('div', {
                              className: tt.skillList,
                              children: [
                                ct(Ht).map((v) => {
                                  var w;
                                  return y.jsxs(
                                    'button',
                                    {
                                      type: 'button',
                                      className: tt.skillBtn,
                                      onClick: () => K(Ht.id, { kind: 'skill', skillId: v }),
                                      children: [
                                        y.jsxs('span', {
                                          className: tt.skillTop,
                                          children: [
                                            y.jsx('span', {
                                              className: tt.skillName,
                                              children: oa[v].name,
                                            }),
                                            y.jsxs('span', {
                                              className: tt.tp,
                                              children: ['TP ', oa[v].tpCost(1)],
                                            }),
                                          ],
                                        }),
                                        y.jsx('span', {
                                          className: tt.skillDesc,
                                          children:
                                            ((w = pr[v]) == null ? void 0 : w.description) ?? '',
                                        }),
                                      ],
                                    },
                                    v
                                  );
                                }),
                                ct(Ht).length === 0
                                  ? y.jsx('div', {
                                      className: tt.empty,
                                      children: '使えるスキルがない',
                                    })
                                  : null,
                                y.jsx('button', {
                                  type: 'button',
                                  className: tt.menuBack,
                                  onClick: () => S(!1),
                                  children: 'もどる',
                                }),
                              ],
                            })
                          : N
                            ? y.jsxs('div', {
                                className: tt.skillList,
                                children: [
                                  st().map(({ id: v, remaining: w }) =>
                                    y.jsxs(
                                      'button',
                                      {
                                        type: 'button',
                                        className: tt.skillBtn,
                                        onClick: () => K(Ht.id, { kind: 'item', itemId: v }),
                                        children: [
                                          y.jsx('span', {
                                            className: tt.skillTop,
                                            children: y.jsxs('span', {
                                              className: tt.skillName,
                                              children: [oe[v].name, ' ×', w],
                                            }),
                                          }),
                                          y.jsx('span', {
                                            className: tt.skillDesc,
                                            children: oe[v].description,
                                          }),
                                        ],
                                      },
                                      v
                                    )
                                  ),
                                  st().length === 0
                                    ? y.jsx('div', {
                                        className: tt.empty,
                                        children: '使える道具がない',
                                      })
                                    : null,
                                  y.jsx('button', {
                                    type: 'button',
                                    className: tt.menuBack,
                                    onClick: () => E(!1),
                                    children: 'もどる',
                                  }),
                                ],
                              })
                            : y.jsxs('div', {
                                className: tt.menu,
                                children: [
                                  y.jsx('button', {
                                    type: 'button',
                                    className: tt.menuBtn,
                                    onClick: () => K(Ht.id, { kind: 'attack' }),
                                    children: '攻撃',
                                  }),
                                  y.jsx('button', {
                                    type: 'button',
                                    className: tt.menuBtn,
                                    onClick: () => K(Ht.id, { kind: 'guard' }),
                                    children: '防御',
                                  }),
                                  y.jsx('button', {
                                    type: 'button',
                                    className: tt.menuBtn,
                                    disabled: ct(Ht).length === 0,
                                    onClick: () => S(!0),
                                    children: 'スキル',
                                  }),
                                  y.jsx('button', {
                                    type: 'button',
                                    className: tt.menuBtn,
                                    disabled: st().length === 0,
                                    onClick: () => E(!0),
                                    children: 'どうぐ',
                                  }),
                                  y.jsx('button', {
                                    type: 'button',
                                    className: tt.menuBtn,
                                    onClick: et,
                                    children: '逃走',
                                  }),
                                ],
                              }),
                      ],
                    })
                  : y.jsxs('div', {
                      className: tt.execRow,
                      children: [
                        y.jsx('button', {
                          type: 'button',
                          className: tt.redo,
                          onClick: q,
                          children: 'やり直す',
                        }),
                        y.jsx('button', {
                          type: 'button',
                          className: tt.primary,
                          disabled: !H,
                          onClick: F,
                          children: '実行',
                        }),
                      ],
                    }),
              ],
            }),
        y.jsx('div', {
          className: tt.log,
          children:
            r.log.length === 0
              ? y.jsxs('div', {
                  className: tt.logLine,
                  children: ['てきが あらわれた！（', r.turn, ' ターン目）'],
                })
              : r.log.map((v, w) => y.jsx('div', { className: tt.logLine, children: v.text }, w)),
        }),
      ],
    });
  },
  Ob = '_layout_1b11o_1',
  Db = '_head_1b11o_13',
  kb = '_depth_1b11o_22',
  wb = '_fpvWrap_1b11o_39',
  Bb = '_mapWrap_1b11o_45',
  Ub = '_palette_1b11o_52',
  Lb = '_tool_1b11o_62',
  Hb = '_toolActive_1b11o_73',
  qb = '_paletteHint_1b11o_79',
  Gb = '_stairs_1b11o_88',
  Yb = '_controls_1b11o_102',
  Xb = '_row_1b11o_112',
  Vb = '_forward_1b11o_118',
  Qb = '_turn_1b11o_133',
  Zb = '_back_1b11o_147',
  Kb = '_itemOverlay_1b11o_158',
  $b = '_itemPanel_1b11o_168',
  Jb = '_itemTitle_1b11o_181',
  Ib = '_itemEmpty_1b11o_186',
  Wb = '_itemRow_1b11o_192',
  Fb = '_itemName_1b11o_200',
  Pb = '_itemDesc_1b11o_208',
  tS = '_itemTargets_1b11o_214',
  eS = '_itemTarget_1b11o_214',
  lS = '_itemHp_1b11o_234',
  nS = '_itemUse_1b11o_240',
  aS = '_itemClose_1b11o_253',
  vt = {
    layout: Ob,
    head: Db,
    depth: kb,
    return: '_return_1b11o_28',
    fpvWrap: wb,
    mapWrap: Bb,
    palette: Ub,
    tool: Lb,
    toolActive: Hb,
    paletteHint: qb,
    stairs: Gb,
    controls: Yb,
    row: Xb,
    forward: Vb,
    turn: Qb,
    back: Zb,
    itemOverlay: Kb,
    itemPanel: $b,
    itemTitle: Jb,
    itemEmpty: Ib,
    itemRow: Wb,
    itemName: Fb,
    itemDesc: Pb,
    itemTargets: tS,
    itemTarget: eS,
    itemHp: lS,
    itemUse: nS,
    itemClose: aS,
  },
  uS = '_canvas_1keax_1',
  iS = { canvas: uS },
  Jp = [
    { id: 'icon_chest', symbol: '📦', label: '宝箱' },
    { id: 'icon_foe', symbol: '👹', label: '強敵(FOE)' },
    { id: 'icon_warning', symbol: '⚠️', label: '注意' },
    { id: 'icon_door', symbol: '🚪', label: '扉/近道' },
    { id: 'icon_gather', symbol: '⛏️', label: '採集' },
    { id: 'icon_event', symbol: '❗', label: 'イベント' },
    { id: 'icon_note', symbol: '📝', label: 'メモ' },
    { id: 'icon_star', symbol: '⭐', label: '任意' },
  ],
  cS = new Map(Jp.map((a) => [a.id, a]));
function sS(a) {
  var i;
  return ((i = cS.get(a)) == null ? void 0 : i.symbol) ?? '•';
}
const vl = {
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
  oS = ({
    floor: a,
    explored: i,
    pos: o,
    dir: s,
    icons: r = [],
    foes: d = [],
    maxCell: h = 26,
    onCellClick: _,
  }) => {
    const g = M.useRef(null),
      m = Math.max(10, Math.min(h, Math.floor(360 / a.width))),
      b = a.width * m,
      S = a.height * m;
    M.useEffect(() => {
      const E = g.current;
      if (!E) return;
      const A = new Set(i),
        k = window.devicePixelRatio || 1;
      ((E.width = b * k), (E.height = S * k));
      const R = E.getContext('2d');
      if (!R) return;
      (R.scale(k, k), R.clearRect(0, 0, b, S));
      for (let Z = 0; Z < a.height; Z++)
        for (let q = 0; q < a.width; q++) {
          const F = A.has(`${q},${Z}`);
          ((R.fillStyle = F ? vl.floor : vl.fog),
            R.fillRect(q * m, Z * m, m, m),
            F &&
              ((R.strokeStyle = vl.grid),
              (R.lineWidth = 1),
              R.strokeRect(q * m + 0.5, Z * m + 0.5, m - 1, m - 1)));
        }
      ((R.strokeStyle = vl.wall), (R.lineWidth = 2), (R.lineCap = 'round'));
      const G = (Z, q, F, et) => {
        (R.beginPath(), R.moveTo(Z, q), R.lineTo(F, et), R.stroke());
      };
      for (let Z = 0; Z < a.height; Z++)
        for (let q = 0; q < a.width; q++) {
          if (!A.has(`${q},${Z}`)) continue;
          const F = a.cells[Z][q],
            et = q * m,
            ct = Z * m;
          (F.walls.N && G(et, ct, et + m, ct),
            F.walls.S && G(et, ct + m, et + m, ct + m),
            F.walls.W && G(et, ct, et, ct + m),
            F.walls.E && G(et + m, ct, et + m, ct + m));
          const st = F.event;
          ((st == null ? void 0 : st.kind) === 'stairsUp' ||
            (st == null ? void 0 : st.kind) === 'stairsDown') &&
            ((R.fillStyle = st.kind === 'stairsUp' ? vl.stairsUp : vl.stairsDown),
            R.beginPath(),
            R.arc(et + m / 2, ct + m / 2, m * 0.28, 0, Math.PI * 2),
            R.fill(),
            (R.fillStyle = '#ffffff'),
            (R.font = `bold ${Math.floor(m * 0.5)}px sans-serif`),
            (R.textAlign = 'center'),
            (R.textBaseline = 'middle'),
            R.fillText(st.kind === 'stairsUp' ? '▲' : '▼', et + m / 2, ct + m / 2 + 1));
        }
      ((R.font = `${Math.floor(m * 0.66)}px sans-serif`),
        (R.textAlign = 'center'),
        (R.textBaseline = 'middle'));
      for (const Z of r)
        A.has(`${Z.x},${Z.y}`) && R.fillText(sS(Z.iconId), Z.x * m + m / 2, Z.y * m + m / 2 + 1);
      for (const Z of d) {
        if (!A.has(`${Z.x},${Z.y}`)) continue;
        const q = Z.x * m + m / 2,
          F = Z.y * m + m / 2;
        ((R.fillStyle = Z.alerted ? vl.foeAlert : vl.foe),
          R.beginPath(),
          R.arc(q, F, m * 0.3, 0, Math.PI * 2),
          R.fill(),
          (R.fillStyle = '#ffffff'),
          (R.font = `bold ${Math.floor(m * 0.5)}px sans-serif`),
          (R.textAlign = 'center'),
          (R.textBaseline = 'middle'),
          R.fillText('!', q, F + 1));
      }
      const I = o.x * m + m / 2,
        V = o.y * m + m / 2,
        D = m * 0.34,
        K = { N: -Math.PI / 2, E: 0, S: Math.PI / 2, W: Math.PI }[s];
      ((R.fillStyle = vl.player),
        R.beginPath(),
        R.moveTo(I + Math.cos(K) * D, V + Math.sin(K) * D),
        R.lineTo(I + Math.cos(K + 2.5) * D, V + Math.sin(K + 2.5) * D),
        R.lineTo(I + Math.cos(K - 2.5) * D, V + Math.sin(K - 2.5) * D),
        R.closePath(),
        R.fill());
    }, [a, i, o, s, r, d, m, b, S]);
    const N = (E) => {
      if (!_) return;
      const A = E.currentTarget.getBoundingClientRect(),
        k = Math.floor(((E.clientX - A.left) / A.width) * a.width),
        R = Math.floor(((E.clientY - A.top) / A.height) * a.height);
      k >= 0 && R >= 0 && k < a.width && R < a.height && _(k, R);
    };
    return y.jsx('canvas', {
      ref: g,
      className: iS.canvas,
      style: { width: b, height: S },
      onClick: N,
    });
  },
  rS = '_gauge_1o2hx_1',
  fS = '_icon_1o2hx_11',
  dS = '_segments_1o2hx_16',
  mS = '_seg_1o2hx_16',
  hS = '_filled_1o2hx_28',
  pS = '_danger_1o2hx_32',
  sa = { gauge: rS, icon: fS, segments: dS, seg: mS, filled: hS, danger: pS },
  yS = ({ level: a }) => {
    const i = a >= vu;
    return y.jsxs('div', {
      className: sa.gauge,
      role: 'img',
      'aria-label': `エンカウントゲージ ${a}/${vu}`,
      children: [
        y.jsx('span', { className: sa.icon, children: i ? '⚠' : '👣' }),
        y.jsx('div', {
          className: sa.segments,
          children: Array.from({ length: vu }, (o, s) =>
            y.jsx(
              'span',
              { className: [sa.seg, s < a ? sa.filled : '', i ? sa.danger : ''].join(' ') },
              s
            )
          ),
        }),
      ],
    });
  },
  gS = '_view_tw2v9_1',
  vS = { view: gS },
  ip = { N: { dx: 0, dy: -1 }, E: { dx: 1, dy: 0 }, S: { dx: 0, dy: 1 }, W: { dx: -1, dy: 0 } };
function _S(a, i, o, s = 4) {
  const r = Up(o),
    d = Bp(o),
    h = [];
  let { x: _, y: g } = i;
  for (let m = 0; m < s; m++) {
    const b = fa(a, _, g, o);
    if (
      (h.push({
        x: _,
        y: g,
        leftOpen: !a.cells[g][_].walls[r],
        rightOpen: !a.cells[g][_].walls[d],
        frontOpen: b,
        event: a.cells[g][_].event,
      }),
      !b)
    )
      break;
    ((_ += ip[o].dx), (g += ip[o].dy));
  }
  return h;
}
const _l = {
    sky: '#26301c',
    ceiling: '#3a4a2c',
    floor: '#5d6b46',
    wall: '#8b9a6b',
    frontWall: '#7a8a5c',
    outline: '#2c3720',
  },
  bS = 0.56,
  SS = ({
    floor: a,
    pos: i,
    dir: o,
    foes: s = [],
    maxDepth: r = 4,
    width: d = 358,
    height: h = 200,
  }) => {
    const _ = M.useRef(null);
    return (
      M.useEffect(() => {
        const g = _.current;
        if (!g) return;
        const m = window.devicePixelRatio || 1;
        ((g.width = d * m), (g.height = h * m));
        const b = g.getContext('2d');
        if (!b) return;
        b.scale(m, m);
        const S = d,
          N = h,
          E = S / 2,
          A = N / 2,
          k = _S(a, i, o, r),
          R = (V) => {
            const D = Math.pow(bS, V);
            return {
              l: E - (S / 2) * D,
              r: E + (S / 2) * D,
              t: A - (N / 2) * D,
              b: A + (N / 2) * D,
            };
          },
          G = (V, D, H = !1) => {
            (b.beginPath(), b.moveTo(V[0][0], V[0][1]));
            for (let K = 1; K < V.length; K++) b.lineTo(V[K][0], V[K][1]);
            (b.closePath(),
              (b.fillStyle = D),
              b.fill(),
              H && ((b.strokeStyle = _l.outline), (b.lineWidth = 1), b.stroke()));
          },
          I = (V) => `rgba(0,0,0,${Math.min(0.5, V * 0.13)})`;
        ((b.fillStyle = _l.sky), b.fillRect(0, 0, S, N));
        for (let V = k.length - 1; V >= 0; V--) {
          const D = R(V),
            H = R(V + 1),
            K = k[V];
          (G(
            [
              [D.l, D.t],
              [D.r, D.t],
              [H.r, H.t],
              [H.l, H.t],
            ],
            _l.ceiling
          ),
            G(
              [
                [D.l, D.b],
                [D.r, D.b],
                [H.r, H.b],
                [H.l, H.b],
              ],
              _l.floor
            ),
            G(
              [
                [D.l, D.t],
                [H.l, H.t],
                [H.l, H.b],
                [D.l, D.b],
              ],
              K.leftOpen ? _l.sky : _l.wall,
              !0
            ),
            G(
              [
                [D.r, D.t],
                [H.r, H.t],
                [H.r, H.b],
                [D.r, D.b],
              ],
              K.rightOpen ? _l.sky : _l.wall,
              !0
            ),
            K.frontOpen ||
              G(
                [
                  [H.l, H.t],
                  [H.r, H.t],
                  [H.r, H.b],
                  [H.l, H.b],
                ],
                _l.frontWall,
                !0
              ),
            (b.fillStyle = I(V)),
            b.fillRect(H.l, H.t, H.r - H.l, H.b - H.t));
          const Z = K.event;
          if (
            (Z == null ? void 0 : Z.kind) === 'stairsUp' ||
            (Z == null ? void 0 : Z.kind) === 'stairsDown'
          ) {
            const q = E,
              F = (D.b + H.b) / 2 - (D.b - H.b) * 0.15,
              et = Math.max(12, (D.b - D.t) * 0.18);
            ((b.fillStyle = Z.kind === 'stairsUp' ? '#e8923a' : '#7aa2d6'),
              b.beginPath(),
              b.arc(q, F, et, 0, Math.PI * 2),
              b.fill(),
              (b.fillStyle = '#fff'),
              (b.font = `bold ${Math.floor(et * 1.2)}px sans-serif`),
              (b.textAlign = 'center'),
              (b.textBaseline = 'middle'),
              b.fillText(Z.kind === 'stairsUp' ? '▲' : '▼', q, F + 1));
          }
          if (V > 0 && s.some((q) => q.x === K.x && q.y === K.y)) {
            const q = s.some((st) => st.x === K.x && st.y === K.y && st.alerted),
              F = E,
              et = (D.b + H.b) / 2 - (D.b - H.b) * 0.1,
              ct = Math.max(14, (D.b - D.t) * 0.22);
            ((b.fillStyle = q ? '#d32f2f' : '#b0533a'),
              b.beginPath(),
              b.arc(F, et, ct, 0, Math.PI * 2),
              b.fill(),
              (b.fillStyle = '#fff'),
              (b.font = `bold ${Math.floor(ct * 1.3)}px sans-serif`),
              (b.textAlign = 'center'),
              (b.textBaseline = 'middle'),
              b.fillText('!', F, et + 1));
          }
        }
      }, [a, i, o, s, r, d, h]),
      y.jsx('canvas', { ref: _, className: vS.view, style: { width: d, height: h } })
    );
  };
function xS(a, i, o) {
  var N, E;
  const s = oe[i];
  if (!s) return { save: a, ok: !1, message: 'そのアイテムは無い' };
  if (!((N = s.useContext) != null && N.includes('field')))
    return { save: a, ok: !1, message: 'ここでは使えない' };
  if ((((E = a.guild.storage.find((A) => A.itemId === i)) == null ? void 0 : E.qty) ?? 0) <= 0)
    return { save: a, ok: !1, message: '所持していない' };
  if (i === 'item_return_thread')
    return a.diveState
      ? { save: Su(bu(a, i, 1)), ok: !0, message: '拠点へ帰還した' }
      : { save: a, ok: !1, message: '探索中のみ使える' };
  if (!a.diveState) return { save: a, ok: !1, message: '探索中のみ使える' };
  const r = a.diveState.party.find((A) => A.charId === o),
    d = a.guild.members.find((A) => A.id === o);
  if (!r || !d) return { save: a, ok: !1, message: '対象がいない' };
  const h = Nu(d);
  let _ = r.hp,
    g = r.tp,
    m = !1;
  for (const A of s.effects ?? [])
    A.kind === 'heal'
      ? ((_ = Math.min(h.hp, _ + A.amount(1))), (m = !0))
      : A.kind === 'restoreTp' && ((g = Math.min(h.tp, g + A.amount(1))), (m = !0));
  if (!m) return { save: a, ok: !1, message: 'いま使う効果がない' };
  const b = a.diveState.party.map((A) => (A.charId === o ? { ...A, hp: _, tp: g } : A));
  return {
    save: bu({ ...a, diveState: { ...a.diveState, party: b } }, i, 1),
    ok: !0,
    message: `${d.name} に ${s.name} を使った`,
  };
}
function ES(a) {
  return { depth: a, floorPaint: [], wallDraw: [], icons: [], notes: [], autopilotRoutes: [] };
}
function TS(a, i) {
  return a.playerMaps[i] ?? ES(i);
}
function Ip(a, i, o) {
  return { ...a, playerMaps: { ...a.playerMaps, [i]: o } };
}
function NS(a, i, o, s, r) {
  const d = TS(a, i),
    h = d.icons.find((m) => m.x === o && m.y === s),
    _ = d.icons.filter((m) => !(m.x === o && m.y === s)),
    g = (h == null ? void 0 : h.iconId) === r ? _ : [..._, { x: o, y: s, iconId: r }];
  return Ip(a, i, { ...d, icons: g });
}
function AS(a, i, o, s) {
  const r = a.playerMaps[i];
  return r ? Ip(a, i, { ...r, icons: r.icons.filter((d) => !(d.x === o && d.y === s)) }) : a;
}
const MS = () => {
    var V;
    const a = El(),
      { save: i, applySave: o, applyAndPersist: s } = xn(),
      r = M.useRef(null),
      [d, h] = M.useState(null),
      [_, g] = M.useState(!1),
      m = (i == null ? void 0 : i.diveState) ?? null,
      b = M.useMemo(() => {
        var D;
        return i && m ? ((D = i.towerState.floors[m.depth]) == null ? void 0 : D.generated) : null;
      }, [i, m]),
      S = M.useMemo(() => {
        var D;
        return i && m
          ? (((D = i.towerState.floors[m.depth]) == null ? void 0 : D.foeRuntime) ?? [])
              .filter((H) => !H.defeated)
              .map((H) => ({ x: H.cell.x, y: H.cell.y, alerted: H.alerted }))
          : [];
      }, [i, m]),
      N = M.useCallback(
        (D) => {
          if (!i) return;
          r.current || (r.current = ga((i.masterSeed ^ 2654435769) >>> 0));
          const H = K_(i, D, r.current);
          (s(() => H.save), H.triggered && a('/battle'));
        },
        [i, s, a]
      ),
      E = M.useCallback(
        (D) => {
          o((H) => Gp(H, D));
        },
        [o]
      ),
      A = M.useCallback(async () => {
        if (!i) return;
        const D = Fh(i);
        D === 'stairsUp'
          ? await s((H) => J_(H))
          : D === 'stairsDown' &&
            (i.diveState.depth <= 1 ? (await s((H) => Su(H)), a('/town')) : await s((H) => I_(H)));
      }, [i, s, a]),
      k = M.useCallback(async () => {
        (await s((D) => Su(D)), a('/town'));
      }, [s, a]),
      R = M.useCallback(
        (D, H) => {
          if (!i) return;
          const K = xS(i, D, H);
          K.ok && (s(() => K.save), K.save.diveState || (g(!1), a('/town')));
        },
        [i, s, a]
      ),
      G = M.useCallback(
        (D, H) => {
          if (!m) return;
          const K = m.depth;
          if (d !== null) {
            if (!((i == null ? void 0 : i.exploredCells[K]) ?? []).includes(`${D},${H}`)) return;
            s(d === 'erase' ? (ct) => AS(ct, K, D, H) : (ct) => NS(ct, K, D, H, d));
            return;
          }
          const Z = D - m.pos.x,
            q = H - m.pos.y,
            F = ['N', 'E', 'S', 'W'].find((et) => qe[et].dx === Z && qe[et].dy === q);
          F && N(F);
        },
        [m, N, d, i, s]
      );
    if (!i) return y.jsx(xl, { to: '/title', replace: !0 });
    if (!m || !b) return y.jsx(xl, { to: '/town', replace: !0 });
    const I = Fh(i);
    return y.jsxs('div', {
      className: vt.layout,
      children: [
        y.jsxs('header', {
          className: vt.head,
          children: [
            y.jsxs('div', { className: vt.depth, children: [m.depth, 'F'] }),
            y.jsx(yS, { level: j_(m.encounter.stepsUntilEncounter) }),
            y.jsx('button', {
              type: 'button',
              className: vt.return,
              onClick: () => g(!0),
              children: '道具',
            }),
            y.jsx('button', {
              type: 'button',
              className: vt.return,
              onClick: () => void k(),
              children: '帰還',
            }),
          ],
        }),
        y.jsx('div', {
          className: vt.fpvWrap,
          children: y.jsx(SS, { floor: b, pos: m.pos, dir: m.dir, foes: S }),
        }),
        y.jsx('div', {
          className: vt.mapWrap,
          children: y.jsx(oS, {
            floor: b,
            explored: i.exploredCells[m.depth] ?? [],
            pos: m.pos,
            dir: m.dir,
            icons: ((V = i.playerMaps[m.depth]) == null ? void 0 : V.icons) ?? [],
            foes: S,
            onCellClick: G,
          }),
        }),
        y.jsxs('div', {
          className: vt.palette,
          children: [
            y.jsx('button', {
              type: 'button',
              className: `${vt.tool} ${d === null ? vt.toolActive : ''}`,
              onClick: () => h(null),
              'aria-label': '移動モード',
              children: '🚶',
            }),
            Jp.map((D) =>
              y.jsx(
                'button',
                {
                  type: 'button',
                  className: `${vt.tool} ${d === D.id ? vt.toolActive : ''}`,
                  onClick: () => h(D.id),
                  'aria-label': D.label,
                  children: D.symbol,
                },
                D.id
              )
            ),
            y.jsx('button', {
              type: 'button',
              className: `${vt.tool} ${d === 'erase' ? vt.toolActive : ''}`,
              onClick: () => h('erase'),
              'aria-label': '消しゴム',
              children: '🧽',
            }),
          ],
        }),
        y.jsx('p', {
          className: vt.paletteHint,
          children:
            d === null
              ? '隣接マスをタップで移動。アイコンを選ぶとマップに書き込めます。'
              : d === 'erase'
                ? 'マップ上のマスをタップでアイコンを消去。'
                : 'マップ上の探索済みマスをタップでアイコンを配置（再タップで消去）。',
        }),
        I &&
          y.jsx('button', {
            type: 'button',
            className: vt.stairs,
            onClick: () => void A(),
            children:
              I === 'stairsUp'
                ? '▲ 次の階へ進む'
                : m.depth <= 1
                  ? '▼ 拠点へ戻る'
                  : '▼ 前の階へ戻る',
          }),
        y.jsxs('div', {
          className: vt.controls,
          children: [
            y.jsxs('div', {
              className: vt.row,
              children: [
                y.jsx('button', {
                  type: 'button',
                  className: vt.turn,
                  onClick: () => E(Up(m.dir)),
                  'aria-label': '左を向く',
                  children: '↰',
                }),
                y.jsx('button', {
                  type: 'button',
                  className: vt.forward,
                  onClick: () => N(m.dir),
                  children: '前進',
                }),
                y.jsx('button', {
                  type: 'button',
                  className: vt.turn,
                  onClick: () => E(Bp(m.dir)),
                  'aria-label': '右を向く',
                  children: '↱',
                }),
              ],
            }),
            y.jsx('button', {
              type: 'button',
              className: vt.back,
              onClick: () => E(z_(m.dir)),
              'aria-label': '振り向く',
              children: '↻ 振り向く',
            }),
          ],
        }),
        _
          ? y.jsx('div', {
              className: vt.itemOverlay,
              onClick: () => g(!1),
              children: y.jsxs('div', {
                className: vt.itemPanel,
                onClick: (D) => D.stopPropagation(),
                children: [
                  y.jsx('div', { className: vt.itemTitle, children: 'どうぐ' }),
                  (() => {
                    const D = i.guild.storage.filter((H) => {
                      var K, Z;
                      return (
                        ((Z = (K = oe[H.itemId]) == null ? void 0 : K.useContext) == null
                          ? void 0
                          : Z.includes('field')) && H.qty > 0
                      );
                    });
                    return D.length === 0
                      ? y.jsx('p', {
                          className: vt.itemEmpty,
                          children: '使える道具がありません。',
                        })
                      : D.map((H) => {
                          const K = oe[H.itemId],
                            Z = H.itemId === 'item_return_thread';
                          return y.jsxs(
                            'div',
                            {
                              className: vt.itemRow,
                              children: [
                                y.jsxs('div', {
                                  className: vt.itemName,
                                  children: [
                                    K.name,
                                    ' ×',
                                    H.qty,
                                    y.jsx('span', {
                                      className: vt.itemDesc,
                                      children: K.description,
                                    }),
                                  ],
                                }),
                                Z
                                  ? y.jsx('button', {
                                      type: 'button',
                                      className: vt.itemUse,
                                      onClick: () => R(H.itemId),
                                      children: '使う',
                                    })
                                  : y.jsx('div', {
                                      className: vt.itemTargets,
                                      children: m.party.map((q) => {
                                        const F = i.guild.members.find((ct) => ct.id === q.charId);
                                        if (!F) return null;
                                        const et = Nu(F);
                                        return y.jsxs(
                                          'button',
                                          {
                                            type: 'button',
                                            className: vt.itemTarget,
                                            onClick: () => R(H.itemId, q.charId),
                                            children: [
                                              F.name,
                                              y.jsxs('span', {
                                                className: vt.itemHp,
                                                children: [
                                                  'HP ',
                                                  q.hp,
                                                  '/',
                                                  et.hp,
                                                  '・TP ',
                                                  q.tp,
                                                  '/',
                                                  et.tp,
                                                ],
                                              }),
                                            ],
                                          },
                                          q.charId
                                        );
                                      }),
                                    }),
                              ],
                            },
                            H.itemId
                          );
                        });
                  })(),
                  y.jsx('button', {
                    type: 'button',
                    className: vt.itemClose,
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
  CS = '_layout_16au8_2',
  RS = '_head_16au8_13',
  jS = '_title_16au8_20',
  zS = '_count_16au8_26',
  OS = '_create_16au8_31',
  DS = '_sectionTitle_16au8_42',
  kS = '_field_16au8_48',
  wS = '_primary_16au8_64',
  BS = '_list_16au8_79',
  US = '_empty_16au8_83',
  LS = '_members_16au8_88',
  HS = '_member_16au8_88',
  qS = '_memberMain_16au8_107',
  GS = '_memberName_16au8_119',
  YS = '_pos_16au8_127',
  XS = '_memberSub_16au8_144',
  VS = '_posBtns_16au8_149',
  QS = '_posBtn_16au8_149',
  ZS = '_posBtnActive_16au8_164',
  KS = '_foot_16au8_170',
  $S = '_sub_16au8_174',
  Nt = {
    layout: CS,
    head: RS,
    title: jS,
    count: zS,
    create: OS,
    sectionTitle: DS,
    field: kS,
    primary: wS,
    list: BS,
    empty: US,
    members: LS,
    member: HS,
    memberMain: qS,
    memberName: GS,
    pos: YS,
    pos_前衛: '_pos_前衛_16au8_136',
    pos_後衛: '_pos_後衛_16au8_140',
    memberSub: XS,
    posBtns: VS,
    posBtn: QS,
    posBtnActive: ZS,
    foot: KS,
    sub: $S,
  };
function JS(a) {
  return [...a.guild.party.front, ...a.guild.party.back].filter((i) => i !== null).length;
}
const Wp = (a) => (a === 'front' ? uc : ic);
function IS(a, i, o, s) {
  if (o < 0 || o >= Wp(i) || (s !== null && !a.guild.members.some((h) => h.id === s))) return a;
  const r = a.guild.party.front.map((h) => (h === s ? null : h)),
    d = a.guild.party.back.map((h) => (h === s ? null : h));
  for (; r.length < uc; ) r.push(null);
  for (; d.length < ic; ) d.push(null);
  return (
    i === 'front' ? (r[o] = s) : (d[o] = s),
    { ...a, guild: { ...a.guild, party: { front: r, back: d } } }
  );
}
function Fp(a, i) {
  const o = a.guild.party.front.map((r) => (r === i ? null : r)),
    s = a.guild.party.back.map((r) => (r === i ? null : r));
  return { ...a, guild: { ...a.guild, party: { front: o, back: s } } };
}
function cp(a, i, o) {
  if (
    !a.guild.members.some((_) => _.id === i) ||
    (o === 'front' ? a.guild.party.front : a.guild.party.back).includes(i)
  )
    return a;
  const r = Fp(a, i),
    d = o === 'front' ? r.guild.party.front : r.guild.party.back;
  let h = d.indexOf(null);
  if (h < 0)
    if (d.length < Wp(o)) h = d.length;
    else return a;
  return IS(r, o, h, i);
}
function WS(a, i) {
  return a.guild.party.front.includes(i)
    ? '前衛'
    : a.guild.party.back.includes(i)
      ? '後衛'
      : '控え';
}
const FS = () => {
    const a = El(),
      { save: i, applyAndPersist: o } = xn(),
      s = Object.keys(Qe),
      r = Object.keys(ie),
      [d, h] = M.useState(''),
      [_, g] = M.useState(s[0]),
      [m, b] = M.useState(r[0]),
      [S, N] = M.useState(!1),
      E = M.useCallback(async () => {
        const R = d.trim() || '名もなき冒険者',
          G = Xp({ raceId: _, classId: m, name: R });
        (N(!0), await o((I) => ib(I, G)), h(''), N(!1));
      }, [d, _, m, o]);
    if (!i) return y.jsx(xl, { to: '/title', replace: !0 });
    const { members: A } = i.guild,
      k = A.length >= Io;
    return y.jsxs('div', {
      className: Nt.layout,
      children: [
        y.jsxs('header', {
          className: Nt.head,
          children: [
            y.jsx('h1', { className: Nt.title, children: 'ギルド管理' }),
            y.jsxs('span', { className: Nt.count, children: ['団員 ', A.length, ' / ', Io] }),
          ],
        }),
        y.jsxs('section', {
          className: Nt.create,
          children: [
            y.jsx('h2', { className: Nt.sectionTitle, children: '冒険者を作成' }),
            y.jsxs('label', {
              className: Nt.field,
              children: [
                y.jsx('span', { children: '名前' }),
                y.jsx('input', {
                  type: 'text',
                  value: d,
                  maxLength: 16,
                  placeholder: '名もなき冒険者',
                  onChange: (R) => h(R.target.value),
                }),
              ],
            }),
            y.jsxs('label', {
              className: Nt.field,
              children: [
                y.jsx('span', { children: '種族' }),
                y.jsx('select', {
                  value: _,
                  onChange: (R) => g(R.target.value),
                  children: s.map((R) => y.jsx('option', { value: R, children: Qe[R].name }, R)),
                }),
              ],
            }),
            y.jsxs('label', {
              className: Nt.field,
              children: [
                y.jsx('span', { children: '職業' }),
                y.jsx('select', {
                  value: m,
                  onChange: (R) => b(R.target.value),
                  children: r.map((R) => y.jsx('option', { value: R, children: ie[R].name }, R)),
                }),
              ],
            }),
            y.jsx('button', {
              type: 'button',
              className: Nt.primary,
              disabled: S || k,
              onClick: () => void E(),
              children: k ? '団員が上限です' : '作成する',
            }),
          ],
        }),
        y.jsxs('section', {
          className: Nt.list,
          children: [
            y.jsxs('h2', {
              className: Nt.sectionTitle,
              children: [
                '団員一覧',
                ' ',
                y.jsxs('span', {
                  className: Nt.count,
                  children: ['（出撃 ', JS(i), ' / ', r_, '）'],
                }),
              ],
            }),
            A.length === 0
              ? y.jsx('p', { className: Nt.empty, children: 'まだ冒険者がいません。' })
              : y.jsx('ul', {
                  className: Nt.members,
                  children: A.map((R) => {
                    var I, V;
                    const G = WS(i, R.id);
                    return y.jsxs(
                      'li',
                      {
                        className: Nt.member,
                        children: [
                          y.jsxs('button', {
                            type: 'button',
                            className: Nt.memberMain,
                            onClick: () => a(`/guild/char/${R.id}`),
                            children: [
                              y.jsxs('span', {
                                className: Nt.memberName,
                                children: [
                                  R.name,
                                  y.jsx('span', {
                                    className: `${Nt.pos} ${Nt[`pos_${G}`] ?? ''}`,
                                    children: G,
                                  }),
                                ],
                              }),
                              y.jsxs('span', {
                                className: Nt.memberSub,
                                children: [
                                  (I = Qe[R.raceId]) == null ? void 0 : I.name,
                                  ' / ',
                                  (V = ie[R.classId]) == null ? void 0 : V.name,
                                  ' / Lv',
                                  R.level,
                                  ' ›',
                                ],
                              }),
                            ],
                          }),
                          y.jsxs('div', {
                            className: Nt.posBtns,
                            children: [
                              y.jsx('button', {
                                type: 'button',
                                className: `${Nt.posBtn} ${G === '前衛' ? Nt.posBtnActive : ''}`,
                                onClick: () => void o((D) => cp(D, R.id, 'front')),
                                children: '前',
                              }),
                              y.jsx('button', {
                                type: 'button',
                                className: `${Nt.posBtn} ${G === '後衛' ? Nt.posBtnActive : ''}`,
                                onClick: () => void o((D) => cp(D, R.id, 'back')),
                                children: '後',
                              }),
                              y.jsx('button', {
                                type: 'button',
                                className: `${Nt.posBtn} ${G === '控え' ? Nt.posBtnActive : ''}`,
                                onClick: () => void o((D) => Fp(D, R.id)),
                                children: '控',
                              }),
                            ],
                          }),
                        ],
                      },
                      R.id
                    );
                  }),
                }),
          ],
        }),
        y.jsx('footer', {
          className: Nt.foot,
          children: y.jsx('button', {
            type: 'button',
            className: Nt.sub,
            onClick: () => a('/town'),
            children: '拠点へ戻る',
          }),
        }),
      ],
    });
  },
  PS = '_layout_tw23z_1',
  t2 = '_head_tw23z_12',
  e2 = '_title_tw23z_16',
  l2 = '_sub_tw23z_22',
  n2 = '_card_tw23z_27',
  a2 = '_h2_tw23z_35',
  u2 = '_sp_tw23z_44',
  i2 = '_stats_tw23z_50',
  c2 = '_equipSlot_tw23z_74',
  s2 = '_equipHead_tw23z_82',
  o2 = '_slotLabel_tw23z_88',
  r2 = '_equipName_tw23z_95',
  f2 = '_smallBtn_tw23z_100',
  d2 = '_equipPick_tw23z_110',
  m2 = '_pickBtn_tw23z_118',
  h2 = '_skills_tw23z_128',
  p2 = '_skill_tw23z_128',
  y2 = '_skillInfo_tw23z_143',
  g2 = '_skillName_tw23z_150',
  v2 = '_skillLv_tw23z_158',
  _2 = '_skillDesc_tw23z_164',
  b2 = '_learnBtn_tw23z_169',
  S2 = '_jobRow_tw23z_185',
  x2 = '_select_tw23z_192',
  E2 = '_input_tw23z_193',
  T2 = '_actBtn_tw23z_203',
  N2 = '_warn_tw23z_220',
  A2 = '_titleHave_tw23z_227',
  M2 = '_titleOpts_tw23z_233',
  C2 = '_titleBtn_tw23z_240',
  R2 = '_rbForm_tw23z_252',
  j2 = '_danger_tw23z_258',
  z2 = '_foot_tw23z_270',
  O2 = '_back_tw23z_274',
  ut = {
    layout: PS,
    head: t2,
    title: e2,
    sub: l2,
    card: n2,
    h2: a2,
    sp: u2,
    stats: i2,
    equipSlot: c2,
    equipHead: s2,
    slotLabel: o2,
    equipName: r2,
    smallBtn: f2,
    equipPick: d2,
    pickBtn: m2,
    skills: h2,
    skill: p2,
    skillInfo: y2,
    skillName: g2,
    skillLv: v2,
    skillDesc: _2,
    learnBtn: b2,
    jobRow: S2,
    select: x2,
    input: E2,
    actBtn: T2,
    warn: N2,
    titleHave: A2,
    titleOpts: M2,
    titleBtn: C2,
    rbForm: R2,
    danger: j2,
    foot: z2,
    back: O2,
  },
  Pp = ['weapon', 'armor', 'accessory'];
function ty(a, i, o) {
  return { ...a, guild: { ...a.guild, members: a.guild.members.map((s) => (s.id === i ? o : s)) } };
}
function D2(a) {
  var i, o;
  return (o = (i = ie[a]) == null ? void 0 : i.skillTree.skills[0]) == null ? void 0 : o.skillId;
}
function k2(a) {
  var i;
  return new Set(
    (((i = Qe[a]) == null ? void 0 : i.unionSkillTree.skills) ?? []).map((o) => o.skillId)
  );
}
const w2 = (a) => Object.values(a).reduce((i, o) => i + o, 0);
function B2(a, i) {
  if (!ie[i]) return a;
  const o = k2(a.raceId);
  let s = {};
  for (const [g, m] of Object.entries(a.learnedSkills)) o.has(g) && (s[g] = m);
  const r = D2(i);
  r && !s[r] && (s[r] = 1);
  const d = Math.max(1, a.level - Rp),
    h = Ct.SP_PER_LEVEL * Math.max(0, d - 1);
  let _ = w2(s) - (r && s[r] ? 1 : 0);
  return (
    _ > h && ((s = r ? { [r]: 1 } : {}), (_ = 0)),
    {
      ...a,
      classId: i,
      titleId: null,
      level: d,
      exp: 0,
      learnedSkills: s,
      skillPoints: { total: h, spent: _ },
    }
  );
}
function U2(a, i, o) {
  const s = a.guild.members.find((h) => h.id === i);
  if (!s) return a;
  let r = ty(a, i, B2(s, o));
  const d = r.guild.members.find((h) => h.id === i);
  for (const h of Pp) {
    const _ = d.equipment[h];
    _ && !yr(d, _) && (r = gr(r, i, h));
  }
  return r;
}
const L2 = [
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
function H2(a) {
  const i = L2.find((o) => a >= o.min && a <= o.max);
  return i ? { allStats: i.allStats, bonusSp: i.bonusSp } : null;
}
function ey(a) {
  return a.level >= gu.REBIRTH_MIN_LEVEL;
}
function q2(a, i) {
  const o = H2(a.level);
  if (!o) return a;
  const s = Math.min(30, Math.floor(a.level / 2)),
    r = Xp({ ...i, id: a.id }),
    d = Ct.SP_PER_LEVEL * Math.max(0, s - 1) + o.bonusSp;
  return {
    ...r,
    level: Math.max(1, s),
    exp: 0,
    rebirthBonus: o,
    skillPoints: { total: d, spent: r.skillPoints.spent },
  };
}
function G2(a, i, o) {
  const s = a.guild.members.find((h) => h.id === i);
  if (!s || !ey(s)) return a;
  let r = a;
  for (const h of Pp) s.equipment[h] && (r = gr(r, i, h));
  const d = r.guild.members.find((h) => h.id === i);
  return ty(r, i, q2(d, o));
}
function ly(a, i, o) {
  var r;
  return o < gu.TITLE_DEPTH || a.titleId
    ? !1
    : (((r = ie[a.classId]) == null ? void 0 : r.titleOptions) ?? []).includes(i);
}
function Y2(a, i, o) {
  return ly(a, i, o)
    ? { ...a, titleId: i, skillPoints: { ...a.skillPoints, total: a.skillPoints.total + f_ } }
    : a;
}
function ny(a) {
  var o, s;
  const i = [
    ...(((o = ie[a.classId]) == null ? void 0 : o.skillTree.skills) ?? []),
    ...(((s = Qe[a.raceId]) == null ? void 0 : s.unionSkillTree.skills) ?? []),
  ];
  return (a.titleId && da[a.titleId] && i.push(...da[a.titleId].skillTree.skills), i);
}
function oc(a, i) {
  return a.learnedSkills[i] ?? 0;
}
function ay(a) {
  return a.skillPoints.total - a.skillPoints.spent;
}
function X2(a, i) {
  return (i.requires ?? []).every((o) => oc(a, o.skillId) >= o.level);
}
function uy(a, i) {
  const o = ny(a).find((s) => s.skillId === i);
  return !o || oc(a, i) >= o.maxLevel || ay(a) <= 0 ? !1 : X2(a, o);
}
function V2(a, i) {
  return uy(a, i)
    ? {
        ...a,
        learnedSkills: { ...a.learnedSkills, [i]: oc(a, i) + 1 },
        skillPoints: { ...a.skillPoints, spent: a.skillPoints.spent + 1 },
      }
    : a;
}
const sp = Object.keys(Qe),
  Qi = Object.keys(ie),
  Q2 = ['weapon', 'armor', 'accessory'],
  Z2 = { weapon: '武器', armor: '防具', accessory: '装飾' },
  K2 = [
    { key: 'hp', label: 'HP' },
    { key: 'tp', label: 'TP' },
    { key: 'str', label: 'STR' },
    { key: 'vit', label: 'VIT' },
    { key: 'agi', label: 'AGI' },
    { key: 'int', label: 'INT' },
    { key: 'mnd', label: 'MND' },
    { key: 'luc', label: 'LUC' },
  ],
  $2 = () => {
    var D, H, K, Z;
    const a = El(),
      { id: i } = Nv(),
      { save: o, applyAndPersist: s } = xn(),
      [r, d] = M.useState(Qi[0]),
      [h, _] = M.useState(''),
      [g, m] = M.useState(sp[0]),
      [b, S] = M.useState(Qi[0]),
      [N, E] = M.useState(!1);
    if (!o) return y.jsx(xl, { to: '/title', replace: !0 });
    const A = o.guild.members.find((q) => q.id === i);
    if (!A || !i) return y.jsx(xl, { to: '/guild', replace: !0 });
    const k = Nu(A),
      R = ay(A),
      G = o.towerState.record.deepestReached,
      I = (q) =>
        s((F) => ({
          ...F,
          guild: { ...F.guild, members: F.guild.members.map((et) => (et.id === i ? q(et) : et)) },
        }));
    return y.jsxs('div', {
      className: ut.layout,
      children: [
        y.jsxs('header', {
          className: ut.head,
          children: [
            y.jsx('h1', { className: ut.title, children: A.name }),
            y.jsxs('span', {
              className: ut.sub,
              children: [
                (D = Qe[A.raceId]) == null ? void 0 : D.name,
                ' / ',
                (H = ie[A.classId]) == null ? void 0 : H.name,
                ' / Lv',
                A.level,
              ],
            }),
          ],
        }),
        y.jsxs('section', {
          className: ut.card,
          children: [
            y.jsx('h2', { className: ut.h2, children: 'ステータス' }),
            y.jsx('dl', {
              className: ut.stats,
              children: K2.map((q) =>
                y.jsxs(
                  'div',
                  {
                    children: [
                      y.jsx('dt', { children: q.label }),
                      y.jsx('dd', { children: k[q.key] }),
                    ],
                  },
                  q.key
                )
              ),
            }),
          ],
        }),
        y.jsxs('section', {
          className: ut.card,
          children: [
            y.jsx('h2', { className: ut.h2, children: '装備' }),
            Q2.map((q) => {
              const F = A.equipment[q],
                et = F ? Me[F] : null,
                ct = o.guild.storage.filter((st) => {
                  var Pt;
                  return (
                    ((Pt = Me[st.itemId]) == null ? void 0 : Pt.slot) === q && yr(A, st.itemId)
                  );
                });
              return y.jsxs(
                'div',
                {
                  className: ut.equipSlot,
                  children: [
                    y.jsxs('div', {
                      className: ut.equipHead,
                      children: [
                        y.jsx('span', { className: ut.slotLabel, children: Z2[q] }),
                        y.jsx('span', {
                          className: ut.equipName,
                          children: et ? et.name : '（なし）',
                        }),
                        et
                          ? y.jsx('button', {
                              type: 'button',
                              className: ut.smallBtn,
                              onClick: () => void V(q),
                              children: '外す',
                            })
                          : null,
                      ],
                    }),
                    ct.length > 0
                      ? y.jsx('div', {
                          className: ut.equipPick,
                          children: ct.map((st) =>
                            y.jsxs(
                              'button',
                              {
                                type: 'button',
                                className: ut.pickBtn,
                                onClick: () => void s((Pt) => g_(Pt, i, st.itemId)),
                                children: [
                                  Me[st.itemId].name,
                                  ' 装備',
                                  st.qty > 1 ? `(${st.qty})` : '',
                                ],
                              },
                              st.itemId
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
        y.jsxs('section', {
          className: ut.card,
          children: [
            y.jsxs('h2', {
              className: ut.h2,
              children: ['スキル ', y.jsxs('span', { className: ut.sp, children: ['SP ', R] })],
            }),
            y.jsx('ul', {
              className: ut.skills,
              children: ny(A).map((q) => {
                const F = oc(A, q.skillId),
                  et = uy(A, q.skillId),
                  ct = pr[q.skillId];
                return y.jsxs(
                  'li',
                  {
                    className: ut.skill,
                    children: [
                      y.jsxs('div', {
                        className: ut.skillInfo,
                        children: [
                          y.jsxs('span', {
                            className: ut.skillName,
                            children: [
                              (ct == null ? void 0 : ct.name) ?? q.skillId,
                              y.jsxs('span', {
                                className: ut.skillLv,
                                children: ['Lv ', F, '/', q.maxLevel],
                              }),
                            ],
                          }),
                          y.jsx('span', {
                            className: ut.skillDesc,
                            children: (ct == null ? void 0 : ct.description) ?? '',
                          }),
                        ],
                      }),
                      y.jsx('button', {
                        type: 'button',
                        className: ut.learnBtn,
                        disabled: !et,
                        onClick: () => void I((st) => V2(st, q.skillId)),
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
        y.jsxs('section', {
          className: ut.card,
          children: [
            y.jsx('h2', { className: ut.h2, children: '転職' }),
            y.jsxs('div', {
              className: ut.jobRow,
              children: [
                y.jsx('select', {
                  className: ut.select,
                  value: r,
                  onChange: (q) => d(q.target.value),
                  children: Qi.map((q) => y.jsx('option', { value: q, children: ie[q].name }, q)),
                }),
                y.jsx('button', {
                  type: 'button',
                  className: ut.actBtn,
                  disabled: r === A.classId,
                  onClick: () => void s((q) => U2(q, i, r)),
                  children: '転職する',
                }),
              ],
            }),
            y.jsxs('p', {
              className: ut.warn,
              children: [
                '※ レベルが ',
                Rp,
                ' ',
                '下がり、職業/称号スキルは振り直しになります（種族スキルは保持）。',
              ],
            }),
            y.jsx('h2', { className: ut.h2, children: '称号' }),
            A.titleId
              ? y.jsxs('p', {
                  className: ut.titleHave,
                  children: ['習得済み: ', (K = da[A.titleId]) == null ? void 0 : K.name],
                })
              : G < gu.TITLE_DEPTH
                ? y.jsxs('p', {
                    className: ut.warn,
                    children: ['第 ', gu.TITLE_DEPTH, ' 階到達で習得できます（現在 ', G, 'F）。'],
                  })
                : y.jsx('div', {
                    className: ut.titleOpts,
                    children: (((Z = ie[A.classId]) == null ? void 0 : Z.titleOptions) ?? []).map(
                      (q) => {
                        var F;
                        return y.jsxs(
                          'button',
                          {
                            type: 'button',
                            className: ut.titleBtn,
                            disabled: !ly(A, q, G),
                            onClick: () => void I((et) => Y2(et, q, G)),
                            children: [(F = da[q]) == null ? void 0 : F.name, '（SP+5）'],
                          },
                          q
                        );
                      }
                    ),
                  }),
            y.jsx('h2', { className: ut.h2, children: '転生' }),
            ey(A)
              ? N
                ? y.jsxs('div', {
                    className: ut.rbForm,
                    children: [
                      y.jsxs('p', {
                        className: ut.warn,
                        children: [
                          '※ 作り直して強い新人になります（開始Lv ',
                          Math.min(30, Math.floor(A.level / 2)),
                          '・ボーナス付き）。',
                        ],
                      }),
                      y.jsx('input', {
                        className: ut.input,
                        type: 'text',
                        maxLength: 16,
                        placeholder: A.name,
                        value: h,
                        onChange: (q) => _(q.target.value),
                      }),
                      y.jsxs('div', {
                        className: ut.jobRow,
                        children: [
                          y.jsx('select', {
                            className: ut.select,
                            value: g,
                            onChange: (q) => m(q.target.value),
                            children: sp.map((q) =>
                              y.jsx('option', { value: q, children: Qe[q].name }, q)
                            ),
                          }),
                          y.jsx('select', {
                            className: ut.select,
                            value: b,
                            onChange: (q) => S(q.target.value),
                            children: Qi.map((q) =>
                              y.jsx('option', { value: q, children: ie[q].name }, q)
                            ),
                          }),
                        ],
                      }),
                      y.jsxs('div', {
                        className: ut.jobRow,
                        children: [
                          y.jsx('button', {
                            type: 'button',
                            className: ut.danger,
                            onClick: () => {
                              (s((q) =>
                                G2(q, i, { raceId: g, classId: b, name: h.trim() || A.name })
                              ),
                                E(!1));
                            },
                            children: '転生を実行',
                          }),
                          y.jsx('button', {
                            type: 'button',
                            className: ut.actBtn,
                            onClick: () => E(!1),
                            children: 'やめる',
                          }),
                        ],
                      }),
                    ],
                  })
                : y.jsx('button', {
                    type: 'button',
                    className: ut.actBtn,
                    onClick: () => E(!0),
                    children: '転生する…',
                  })
              : y.jsxs('p', {
                  className: ut.warn,
                  children: [
                    'Lv',
                    gu.REBIRTH_MIN_LEVEL,
                    ' 以上で転生できます（現在 Lv',
                    A.level,
                    '）。',
                  ],
                }),
          ],
        }),
        y.jsx('footer', {
          className: ut.foot,
          children: y.jsx('button', {
            type: 'button',
            className: ut.back,
            onClick: () => a('/guild'),
            children: 'もどる',
          }),
        }),
      ],
    });
    function V(q) {
      return s((F) => gr(F, i, q));
    }
  },
  J2 = () => y.jsx('div', { children: y.jsx('h1', { children: 'Not Found' }) }),
  I2 = '_layout_1u0ua_1',
  W2 = '_head_1u0ua_11',
  F2 = '_title_1u0ua_18',
  P2 = '_gold_1u0ua_24',
  tx = '_tabs_1u0ua_29',
  ex = '_tab_1u0ua_29',
  lx = '_tabActive_1u0ua_46',
  nx = '_list_1u0ua_51',
  ax = '_row_1u0ua_59',
  ux = '_info_1u0ua_70',
  ix = '_name_1u0ua_76',
  cx = '_note_1u0ua_81',
  sx = '_action_1u0ua_86',
  ox = '_empty_1u0ua_103',
  rx = '_foot_1u0ua_108',
  fx = '_back_1u0ua_112',
  Ut = {
    layout: I2,
    head: W2,
    title: F2,
    gold: P2,
    tabs: tx,
    tab: ex,
    tabActive: lx,
    list: nx,
    row: ax,
    info: ux,
    name: ix,
    note: cx,
    action: sx,
    empty: ox,
    foot: rx,
    back: fx,
  };
function dx(a) {
  return Math.max(0, Math.floor(a.towerState.record.deepestReached / 10));
}
const iy = {
    item_slime_jelly: ['equip_slime_shield'],
    item_rat_tail: ['equip_rat_dagger'],
    item_bat_wing: ['equip_bat_cloak'],
    item_golem_core: ['equip_golem_blade'],
  },
  mx = (a) => {
    const i = Me[a].bonuses,
      o = [];
    return (
      i.atk && o.push(`ATK+${i.atk}`),
      i.mat && o.push(`MAT+${i.mat}`),
      i.def && o.push(`DEF+${i.def}`),
      i.mdf && o.push(`MDF+${i.mdf}`),
      o.join(' ')
    );
  };
function hx(a) {
  const i = dx(a),
    o = new Set(a.shopStock.unlockedItemIds),
    s = Object.values(oe)
      .filter((d) => d.buyPrice > 0)
      .map((d) => ({ id: d.id, name: d.name, price: d.buyPrice, kind: 'item' }));
  return [
    ...Object.values(Me)
      .filter((d) => d.tier <= i || o.has(d.id))
      .map((d) => ({ id: d.id, name: d.name, price: d.buyPrice, kind: 'equip', note: mx(d.id) })),
    ...s,
  ];
}
function px(a) {
  return iy[a] ?? [];
}
function yx(a) {
  var i, o;
  return (
    ((i = oe[a]) == null ? void 0 : i.buyPrice) ??
    ((o = Me[a]) == null ? void 0 : o.buyPrice) ??
    null
  );
}
function ur(a) {
  return oe[a] ? s_(oe[a]) : Me[a] ? Math.floor(Me[a].buyPrice / 2) : 0;
}
function gx(a, i) {
  const o = yx(i);
  if (o === null || o <= 0 || a.guild.gold < o) return a;
  const s = cc(a, i, 1);
  return { ...s, guild: { ...s.guild, gold: s.guild.gold - o } };
}
function vx(a, i, o = 1) {
  var g;
  if ((((g = a.guild.storage.find((m) => m.itemId === i)) == null ? void 0 : g.qty) ?? 0) < o)
    return a;
  const r = ur(i) * o,
    d = bu(a, i, o),
    h = px(i).filter((m) => !d.shopStock.unlockedItemIds.includes(m)),
    _ = [...d.shopStock.unlockedItemIds, ...h];
  return {
    ...d,
    guild: { ...d.guild, gold: d.guild.gold + r },
    shopStock: { ...d.shopStock, unlockedItemIds: _ },
  };
}
const _x = () => {
    const a = El(),
      { save: i, applyAndPersist: o } = xn(),
      [s, r] = M.useState('buy');
    if (!i) return y.jsx(xl, { to: '/title', replace: !0 });
    const d = i.guild.gold,
      h = hx(i),
      _ = i.guild.storage.filter((m) => ur(m.itemId) > 0),
      g = (m) => {
        var b, S;
        return (
          ((b = oe[m]) == null ? void 0 : b.name) ?? ((S = Me[m]) == null ? void 0 : S.name) ?? m
        );
      };
    return y.jsxs('div', {
      className: Ut.layout,
      children: [
        y.jsxs('header', {
          className: Ut.head,
          children: [
            y.jsx('h1', { className: Ut.title, children: 'ショップ' }),
            y.jsxs('span', { className: Ut.gold, children: [d, ' G'] }),
          ],
        }),
        y.jsxs('div', {
          className: Ut.tabs,
          children: [
            y.jsx('button', {
              type: 'button',
              className: `${Ut.tab} ${s === 'buy' ? Ut.tabActive : ''}`,
              onClick: () => r('buy'),
              children: '買う',
            }),
            y.jsx('button', {
              type: 'button',
              className: `${Ut.tab} ${s === 'sell' ? Ut.tabActive : ''}`,
              onClick: () => r('sell'),
              children: '売る',
            }),
          ],
        }),
        y.jsx('div', {
          className: Ut.list,
          children:
            s === 'buy'
              ? h.map((m) =>
                  y.jsxs(
                    'div',
                    {
                      className: Ut.row,
                      children: [
                        y.jsxs('div', {
                          className: Ut.info,
                          children: [
                            y.jsx('span', { className: Ut.name, children: m.name }),
                            m.note ? y.jsx('span', { className: Ut.note, children: m.note }) : null,
                          ],
                        }),
                        y.jsxs('button', {
                          type: 'button',
                          className: Ut.action,
                          disabled: d < m.price,
                          onClick: () => void o((b) => gx(b, m.id)),
                          children: [m.price, ' G'],
                        }),
                      ],
                    },
                    m.id
                  )
                )
              : _.length === 0
                ? y.jsx('p', { className: Ut.empty, children: '売れる物がありません。' })
                : _.map((m) =>
                    y.jsxs(
                      'div',
                      {
                        className: Ut.row,
                        children: [
                          y.jsxs('div', {
                            className: Ut.info,
                            children: [
                              y.jsx('span', { className: Ut.name, children: g(m.itemId) }),
                              y.jsxs('span', { className: Ut.note, children: ['所持 ', m.qty] }),
                            ],
                          }),
                          y.jsxs('button', {
                            type: 'button',
                            className: Ut.action,
                            onClick: () => void o((b) => vx(b, m.itemId, 1)),
                            children: ['売却 ', ur(m.itemId), ' G'],
                          }),
                        ],
                      },
                      m.itemId
                    )
                  ),
        }),
        y.jsx('footer', {
          className: Ut.foot,
          children: y.jsx('button', {
            type: 'button',
            className: Ut.back,
            onClick: () => a('/town'),
            children: '拠点へ戻る',
          }),
        }),
      ],
    });
  },
  bx = '_layout_1xkiw_1',
  Sx = '_head_1xkiw_12',
  xx = '_title_1xkiw_17',
  Ex = '_subtitle_1xkiw_24',
  Tx = '_body_1xkiw_30',
  Nx = '_menu_1xkiw_34',
  Ax = '_loading_1xkiw_40',
  Mx = '_warn_1xkiw_45',
  Cx = '_danger_1xkiw_52',
  Rx = '_dialog_1xkiw_67',
  jx = '_dialogTitle_1xkiw_77',
  zx = '_field_1xkiw_82',
  Ox = '_note_1xkiw_96',
  Dx = '_dialogActions_1xkiw_102',
  kx = '_primary_1xkiw_107',
  wx = '_sub_1xkiw_24',
  Bx = '_foot_1xkiw_132',
  Lt = {
    layout: bx,
    head: Sx,
    title: xx,
    subtitle: Ex,
    body: Tx,
    menu: Nx,
    loading: Ax,
    warn: Mx,
    danger: Cx,
    dialog: Rx,
    dialogTitle: jx,
    field: zx,
    note: Ox,
    dialogActions: Dx,
    primary: kx,
    sub: wx,
    foot: Bx,
  },
  Ux = '_card_3vsn6_1',
  Lx = '_corrupted_3vsn6_14',
  Hx = '_corruptedText_3vsn6_19',
  qx = '_corruptedNote_3vsn6_25',
  Gx = '_guildName_3vsn6_31',
  Yx = '_meta_3vsn6_36',
  Il = {
    card: Ux,
    corrupted: Lx,
    corruptedText: Hx,
    corruptedNote: qx,
    guildName: Gx,
    meta: Yx,
    continue: '_continue_3vsn6_56',
  },
  Xx = (a) => {
    if (!a) return '-';
    const i = new Date(a),
      o = (s) => String(s).padStart(2, '0');
    return `${i.getFullYear()}/${o(i.getMonth() + 1)}/${o(i.getDate())} ${o(i.getHours())}:${o(i.getMinutes())}`;
  },
  Vx = ({ meta: a, onContinue: i }) =>
    a.corrupted
      ? y.jsxs('div', {
          className: `${Il.card} ${Il.corrupted}`,
          children: [
            y.jsx('div', { className: Il.corruptedText, children: 'セーブデータが破損しています' }),
            y.jsx('p', {
              className: Il.corruptedNote,
              children: '「最初から」で新しく始められます。',
            }),
          ],
        })
      : y.jsxs('div', {
          className: Il.card,
          children: [
            y.jsx('div', { className: Il.guildName, children: a.guildName }),
            y.jsxs('dl', {
              className: Il.meta,
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
                    y.jsx('dd', { children: Xx(a.savedAt) }),
                  ],
                }),
              ],
            }),
            y.jsx('button', {
              type: 'button',
              className: Il.continue,
              onClick: i,
              children: 'つづきから',
            }),
          ],
        }),
  Qx = () => {
    const a = El(),
      { startNewGame: i, continueGame: o } = xn(),
      [s, r] = M.useState(null),
      [d, h] = M.useState(!0),
      [_, g] = M.useState('menu'),
      [m, b] = M.useState(''),
      [S, N] = M.useState(!1);
    M.useEffect(() => {
      (async () => (r(await Mb()), h(!1)))();
    }, []);
    const E = s !== null && !s.corrupted,
      A = M.useCallback(async () => {
        N(!0);
        const G = await o();
        (N(!1), G.ok && a('/town'));
      }, [o, a]),
      k = M.useCallback(() => {
        (b(''), g(E ? 'confirm' : 'guildName'));
      }, [E]),
      R = M.useCallback(async () => {
        const G = m.trim() || 'ななしのギルド';
        (N(!0), await i(G), N(!1), a('/town'));
      }, [m, i, a]);
    return y.jsxs('div', {
      className: Lt.layout,
      children: [
        y.jsxs('header', {
          className: Lt.head,
          children: [
            y.jsx('h1', { className: Lt.title, children: '世界樹ライク' }),
            y.jsx('p', { className: Lt.subtitle, children: '無限タワー探索 RPG' }),
          ],
        }),
        y.jsx('main', {
          className: Lt.body,
          children: d
            ? y.jsx('p', { className: Lt.loading, children: '読み込み中...' })
            : _ === 'guildName'
              ? y.jsxs('div', {
                  className: Lt.dialog,
                  children: [
                    y.jsx('h2', { className: Lt.dialogTitle, children: '新しいギルド' }),
                    y.jsxs('label', {
                      className: Lt.field,
                      children: [
                        y.jsx('span', { children: 'ギルド名' }),
                        y.jsx('input', {
                          type: 'text',
                          value: m,
                          maxLength: 16,
                          placeholder: 'ななしのギルド',
                          onChange: (G) => b(G.target.value),
                          autoFocus: !0,
                        }),
                      ],
                    }),
                    y.jsx('p', {
                      className: Lt.note,
                      children:
                        '冒険者はまだいません。開始後、ギルドメニューで仲間を作成してください。',
                    }),
                    y.jsxs('div', {
                      className: Lt.dialogActions,
                      children: [
                        y.jsx('button', {
                          type: 'button',
                          className: Lt.primary,
                          disabled: S,
                          onClick: R,
                          children: 'はじめる',
                        }),
                        y.jsx('button', {
                          type: 'button',
                          className: Lt.sub,
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
                    className: Lt.dialog,
                    children: [
                      y.jsx('h2', { className: Lt.dialogTitle, children: '最初から始めますか？' }),
                      y.jsxs('p', {
                        className: Lt.warn,
                        children: [
                          '現在のセーブデータ「',
                          s == null ? void 0 : s.guildName,
                          '」は上書きされ、元に戻せません。',
                        ],
                      }),
                      y.jsxs('div', {
                        className: Lt.dialogActions,
                        children: [
                          y.jsx('button', {
                            type: 'button',
                            className: Lt.danger,
                            disabled: S,
                            onClick: () => g('guildName'),
                            children: 'データを消して始める',
                          }),
                          y.jsx('button', {
                            type: 'button',
                            className: Lt.sub,
                            disabled: S,
                            onClick: () => g('menu'),
                            children: 'もどる',
                          }),
                        ],
                      }),
                    ],
                  })
                : y.jsxs('div', {
                    className: Lt.menu,
                    children: [
                      s !== null && y.jsx(Vx, { meta: s, onContinue: () => void A() }),
                      y.jsx('button', {
                        type: 'button',
                        className: E ? Lt.sub : Lt.primary,
                        onClick: k,
                        children: '最初から',
                      }),
                    ],
                  }),
        }),
        y.jsxs('footer', { className: Lt.foot, children: ['v', '0.1.11'] }),
      ],
    });
  },
  Zx = '_layout_1wdo2_1',
  Kx = '_head_1wdo2_12',
  $x = '_guildName_1wdo2_16',
  Jx = '_stats_1wdo2_21',
  Ix = '_hint_1wdo2_40',
  Wx = '_menu_1wdo2_50',
  Fx = '_foot_1wdo2_57',
  Px = '_exit_1wdo2_61',
  Wl = { layout: Zx, head: Kx, guildName: $x, stats: Jx, hint: Ix, menu: Wx, foot: Fx, exit: Px },
  tE = '_button_1tp4a_1',
  eE = '_primary_1tp4a_26',
  lE = '_label_1tp4a_32',
  nE = '_description_1tp4a_37',
  Zi = { button: tE, primary: eE, label: lE, description: nE },
  pu = ({ label: a, description: i, variant: o = 'default', disabled: s = !1, onClick: r }) =>
    y.jsxs('button', {
      type: 'button',
      className: `${Zi.button} ${o === 'primary' ? Zi.primary : ''}`,
      disabled: s,
      onClick: r,
      children: [
        y.jsx('span', { className: Zi.label, children: a }),
        i ? y.jsx('span', { className: Zi.description, children: i }) : null,
      ],
    }),
  aE = () => {
    const a = El(),
      { save: i, exitToTitle: o, applyAndPersist: s } = xn();
    if (!i) return y.jsx(xl, { to: '/title', replace: !0 });
    const { guild: r, towerState: d, diveState: h } = i,
      _ = r.members.length > 0,
      g = () => {
        (o(), a('/title'));
      },
      m = async () => {
        (h || (await s((b) => Z_(b, 1))), a('/dungeon'));
      };
    return y.jsxs('div', {
      className: Wl.layout,
      children: [
        y.jsxs('header', {
          className: Wl.head,
          children: [
            y.jsx('div', { className: Wl.guildName, children: r.name }),
            y.jsxs('dl', {
              className: Wl.stats,
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
            className: Wl.hint,
            children:
              'まずは「ギルド管理」で冒険者を作成してください。団員がいないとダイブできません。',
          }),
        y.jsxs('main', {
          className: Wl.menu,
          children: [
            y.jsx(pu, {
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
            y.jsx(pu, {
              label: 'ギルド管理',
              description: '編成・キャラ作成',
              onClick: () => a('/guild'),
            }),
            y.jsx(pu, {
              label: 'ショップ',
              description: '装備・アイテム売買',
              onClick: () => a('/shop'),
            }),
            y.jsx(pu, { label: '鍛冶屋', description: '武器強化（Phase 4）', disabled: !0 }),
            y.jsx(pu, {
              label: '図鑑 / 記録',
              description: '到達記録・図鑑（Phase 4-5）',
              disabled: !0,
            }),
          ],
        }),
        y.jsx('footer', {
          className: Wl.foot,
          children: y.jsx('button', {
            type: 'button',
            className: Wl.exit,
            onClick: g,
            children: 'タイトルへ戻る',
          }),
        }),
      ],
    });
  };
function uE() {
  return y.jsxs(qv, {
    children: [
      y.jsx(Fe, { path: '/', element: y.jsx(xl, { to: '/title', replace: !0 }) }),
      y.jsx(Fe, { path: '/title', element: y.jsx(Qx, {}) }),
      y.jsx(Fe, { path: '/town', element: y.jsx(aE, {}) }),
      y.jsx(Fe, { path: '/guild', element: y.jsx(FS, {}) }),
      y.jsx(Fe, { path: '/guild/char/:id', element: y.jsx($2, {}) }),
      y.jsx(Fe, { path: '/shop', element: y.jsx(_x, {}) }),
      y.jsx(Fe, { path: '/dungeon', element: y.jsx(MS, {}) }),
      y.jsx(Fe, { path: '/battle', element: y.jsx(zb, {}) }),
      y.jsx(Fe, { path: '*', element: y.jsx(J2, {}) }),
    ],
  });
}
const iE = {
    races: Qe,
    classes: ie,
    titles: da,
    skills: pr,
    enemies: Sn,
    items: oe,
    equipment: Me,
  },
  cE = /^[a-z]+_[a-z0-9_]+$/;
function _n(a, i, o) {
  for (const s of i)
    cE.test(s) || o.push(`[${a}] ID 命名規約違反: "${s}"（期待: <domain>_<name>）`);
}
function Ko(a, i, o, s) {
  const r = new Set(i.skills.map((d) => d.skillId));
  for (const d of i.skills) {
    o.has(d.skillId) || s.push(`[${a}] 未定義スキルを参照: "${d.skillId}"`);
    for (const h of d.requires ?? [])
      r.has(h.skillId) ||
        s.push(`[${a}] スキル "${d.skillId}" の前提 "${h.skillId}" が同ツリーに存在しない`);
  }
}
function sE() {
  const a = [],
    { races: i, classes: o, titles: s, skills: r, enemies: d, items: h, equipment: _ } = iE;
  (_n('races', Object.keys(i), a),
    _n('classes', Object.keys(o), a),
    _n('titles', Object.keys(s), a),
    _n('skills', Object.keys(r), a),
    _n('enemies', Object.keys(d), a),
    _n('items', Object.keys(h), a),
    _n('equipment', Object.keys(_), a));
  const g = (N, E) => {
    for (const [A, k] of Object.entries(E))
      A !== k.id && a.push(`[${N}] キー "${A}" と id "${k.id}" が不一致`);
  };
  (g('races', i),
    g('classes', o),
    g('titles', s),
    g('skills', r),
    g('enemies', d),
    g('items', h),
    g('equipment', _));
  const m = new Set(Object.keys(r)),
    b = new Set(Object.keys(o)),
    S = new Set(Object.keys(s));
  for (const N of Object.values(i))
    (b.has(N.defaultClassId) ||
      a.push(`[races] "${N.id}" の defaultClassId "${N.defaultClassId}" が未定義`),
      Ko(`races/${N.id}`, N.unionSkillTree, m, a));
  for (const N of Object.values(o)) {
    Ko(`classes/${N.id}`, N.skillTree, m, a);
    for (const E of N.titleOptions) {
      if (!S.has(E)) {
        a.push(`[classes] "${N.id}" の称号 "${E}" が未定義`);
        continue;
      }
      s[E].parentClassId !== N.id &&
        a.push(`[classes] 称号 "${E}" の parentClassId が "${N.id}" と不一致`);
    }
  }
  for (const N of Object.values(s))
    (b.has(N.parentClassId) ||
      a.push(`[titles] "${N.id}" の parentClassId "${N.parentClassId}" が未定義`),
      Ko(`titles/${N.id}`, N.skillTree, m, a));
  for (const N of Object.values(_))
    (N.slot === 'weapon' &&
      !N.weaponType &&
      a.push(`[equipment] "${N.id}" は weapon だが weaponType が未設定`),
      N.slot === 'armor' &&
        !N.armorType &&
        a.push(`[equipment] "${N.id}" は armor だが armorType が未設定`),
      (N.buyPrice < 0 || N.tier < 0) && a.push(`[equipment] "${N.id}" の buyPrice/tier が負`));
  for (const N of Object.values(h))
    (N.buyPrice < 0 && a.push(`[items] "${N.id}" の buyPrice が負`),
      N.category === 'consumable' &&
        !N.useContext &&
        !N.effects &&
        a.push(`[items] 消費アイテム "${N.id}" に useContext も effects も無い（使用不能）`));
  for (const N of Object.values(d))
    for (const E of N.drops ?? [])
      (E.itemId in h || a.push(`[enemies] "${N.id}" のドロップ "${E.itemId}" が未定義アイテム`),
        (E.rate < 0 || E.rate > 1) &&
          a.push(`[enemies] "${N.id}" のドロップ "${E.itemId}" の rate が 0..1 外`));
  for (const [N, E] of Object.entries(iy)) {
    N in h || a.push(`[SELL_UNLOCKS] キー素材 "${N}" が未定義`);
    for (const A of E) A in _ || a.push(`[SELL_UNLOCKS] 解放先装備 "${A}" が未定義`);
  }
  return { ok: a.length === 0, errors: a };
}
const op = sE();
op.ok || console.error('マスターデータ検証エラー:', op.errors);
const cy = document.getElementById('root');
if (!cy) throw new Error('Failed to find #root element');
Yg.createRoot(cy).render(
  y.jsx(r1, { basename: '/sekaiju-like-game', children: y.jsx(jb, { children: y.jsx(uE, {}) }) })
);
