var Mv = Object.defineProperty;
var Ov = (l, i, o) =>
  i in l ? Mv(l, i, { enumerable: !0, configurable: !0, writable: !0, value: o }) : (l[i] = o);
var uc = (l, i, o) => Ov(l, typeof i != 'symbol' ? i + '' : i, o);
(function () {
  const i = document.createElement('link').relList;
  if (i && i.supports && i.supports('modulepreload')) return;
  for (const c of document.querySelectorAll('link[rel="modulepreload"]')) r(c);
  new MutationObserver((c) => {
    for (const d of c)
      if (d.type === 'childList')
        for (const f of d.addedNodes) f.tagName === 'LINK' && f.rel === 'modulepreload' && r(f);
  }).observe(document, { childList: !0, subtree: !0 });
  function o(c) {
    const d = {};
    return (
      c.integrity && (d.integrity = c.integrity),
      c.referrerPolicy && (d.referrerPolicy = c.referrerPolicy),
      c.crossOrigin === 'use-credentials'
        ? (d.credentials = 'include')
        : c.crossOrigin === 'anonymous'
          ? (d.credentials = 'omit')
          : (d.credentials = 'same-origin'),
      d
    );
  }
  function r(c) {
    if (c.ep) return;
    c.ep = !0;
    const d = o(c);
    fetch(c.href, d);
  }
})();
var cc = { exports: {} },
  Hi = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var dp;
function Iv() {
  if (dp) return Hi;
  dp = 1;
  var l = Symbol.for('react.transitional.element'),
    i = Symbol.for('react.fragment');
  function o(r, c, d) {
    var f = null;
    if ((d !== void 0 && (f = '' + d), c.key !== void 0 && (f = '' + c.key), 'key' in c)) {
      d = {};
      for (var h in c) h !== 'key' && (d[h] = c[h]);
    } else d = c;
    return ((c = d.ref), { $$typeof: l, type: r, key: f, ref: c !== void 0 ? c : null, props: d });
  }
  return ((Hi.Fragment = i), (Hi.jsx = o), (Hi.jsxs = o), Hi);
}
var mp;
function Dv() {
  return (mp || ((mp = 1), (cc.exports = Iv())), cc.exports);
}
var _ = Dv(),
  dc = { exports: {} },
  Ui = {},
  mc = { exports: {} },
  _c = {};
/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var _p;
function Rv() {
  return (
    _p ||
      ((_p = 1),
      (function (l) {
        function i(L, Q) {
          var $ = L.length;
          L.push(Q);
          e: for (; 0 < $; ) {
            var Z = ($ - 1) >>> 1,
              te = L[Z];
            if (0 < c(te, Q)) ((L[Z] = Q), (L[$] = te), ($ = Z));
            else break e;
          }
        }
        function o(L) {
          return L.length === 0 ? null : L[0];
        }
        function r(L) {
          if (L.length === 0) return null;
          var Q = L[0],
            $ = L.pop();
          if ($ !== Q) {
            L[0] = $;
            e: for (var Z = 0, te = L.length, N = te >>> 1; Z < N; ) {
              var H = 2 * (Z + 1) - 1,
                J = L[H],
                ee = H + 1,
                ne = L[ee];
              if (0 > c(J, $))
                ee < te && 0 > c(ne, J)
                  ? ((L[Z] = ne), (L[ee] = $), (Z = ee))
                  : ((L[Z] = J), (L[H] = $), (Z = H));
              else if (ee < te && 0 > c(ne, $)) ((L[Z] = ne), (L[ee] = $), (Z = ee));
              else break e;
            }
          }
          return Q;
        }
        function c(L, Q) {
          var $ = L.sortIndex - Q.sortIndex;
          return $ !== 0 ? $ : L.id - Q.id;
        }
        if (
          ((l.unstable_now = void 0),
          typeof performance == 'object' && typeof performance.now == 'function')
        ) {
          var d = performance;
          l.unstable_now = function () {
            return d.now();
          };
        } else {
          var f = Date,
            h = f.now();
          l.unstable_now = function () {
            return f.now() - h;
          };
        }
        var k = [],
          p = [],
          v = 1,
          y = null,
          E = 3,
          M = !1,
          O = !1,
          x = !1,
          S = !1,
          b = typeof setTimeout == 'function' ? setTimeout : null,
          C = typeof clearTimeout == 'function' ? clearTimeout : null,
          A = typeof setImmediate < 'u' ? setImmediate : null;
        function F(L) {
          for (var Q = o(p); Q !== null; ) {
            if (Q.callback === null) r(p);
            else if (Q.startTime <= L) (r(p), (Q.sortIndex = Q.expirationTime), i(k, Q));
            else break;
            Q = o(p);
          }
        }
        function P(L) {
          if (((x = !1), F(L), !O))
            if (o(k) !== null) ((O = !0), G || ((G = !0), he()));
            else {
              var Q = o(p);
              Q !== null && ge(P, Q.startTime - L);
            }
        }
        var G = !1,
          U = -1,
          ae = 5,
          ie = -1;
        function le() {
          return S ? !0 : !(l.unstable_now() - ie < ae);
        }
        function ce() {
          if (((S = !1), G)) {
            var L = l.unstable_now();
            ie = L;
            var Q = !0;
            try {
              e: {
                ((O = !1), x && ((x = !1), C(U), (U = -1)), (M = !0));
                var $ = E;
                try {
                  t: {
                    for (F(L), y = o(k); y !== null && !(y.expirationTime > L && le()); ) {
                      var Z = y.callback;
                      if (typeof Z == 'function') {
                        ((y.callback = null), (E = y.priorityLevel));
                        var te = Z(y.expirationTime <= L);
                        if (((L = l.unstable_now()), typeof te == 'function')) {
                          ((y.callback = te), F(L), (Q = !0));
                          break t;
                        }
                        (y === o(k) && r(k), F(L));
                      } else r(k);
                      y = o(k);
                    }
                    if (y !== null) Q = !0;
                    else {
                      var N = o(p);
                      (N !== null && ge(P, N.startTime - L), (Q = !1));
                    }
                  }
                  break e;
                } finally {
                  ((y = null), (E = $), (M = !1));
                }
                Q = void 0;
              }
            } finally {
              Q ? he() : (G = !1);
            }
          }
        }
        var he;
        if (typeof A == 'function')
          he = function () {
            A(ce);
          };
        else if (typeof MessageChannel < 'u') {
          var ve = new MessageChannel(),
            Se = ve.port2;
          ((ve.port1.onmessage = ce),
            (he = function () {
              Se.postMessage(null);
            }));
        } else
          he = function () {
            b(ce, 0);
          };
        function ge(L, Q) {
          U = b(function () {
            L(l.unstable_now());
          }, Q);
        }
        ((l.unstable_IdlePriority = 5),
          (l.unstable_ImmediatePriority = 1),
          (l.unstable_LowPriority = 4),
          (l.unstable_NormalPriority = 3),
          (l.unstable_Profiling = null),
          (l.unstable_UserBlockingPriority = 2),
          (l.unstable_cancelCallback = function (L) {
            L.callback = null;
          }),
          (l.unstable_forceFrameRate = function (L) {
            0 > L || 125 < L
              ? console.error(
                  'forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported'
                )
              : (ae = 0 < L ? Math.floor(1e3 / L) : 5);
          }),
          (l.unstable_getCurrentPriorityLevel = function () {
            return E;
          }),
          (l.unstable_next = function (L) {
            switch (E) {
              case 1:
              case 2:
              case 3:
                var Q = 3;
                break;
              default:
                Q = E;
            }
            var $ = E;
            E = Q;
            try {
              return L();
            } finally {
              E = $;
            }
          }),
          (l.unstable_requestPaint = function () {
            S = !0;
          }),
          (l.unstable_runWithPriority = function (L, Q) {
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
            var $ = E;
            E = L;
            try {
              return Q();
            } finally {
              E = $;
            }
          }),
          (l.unstable_scheduleCallback = function (L, Q, $) {
            var Z = l.unstable_now();
            switch (
              (typeof $ == 'object' && $ !== null
                ? (($ = $.delay), ($ = typeof $ == 'number' && 0 < $ ? Z + $ : Z))
                : ($ = Z),
              L)
            ) {
              case 1:
                var te = -1;
                break;
              case 2:
                te = 250;
                break;
              case 5:
                te = 1073741823;
                break;
              case 4:
                te = 1e4;
                break;
              default:
                te = 5e3;
            }
            return (
              (te = $ + te),
              (L = {
                id: v++,
                callback: Q,
                priorityLevel: L,
                startTime: $,
                expirationTime: te,
                sortIndex: -1,
              }),
              $ > Z
                ? ((L.sortIndex = $),
                  i(p, L),
                  o(k) === null && L === o(p) && (x ? (C(U), (U = -1)) : (x = !0), ge(P, $ - Z)))
                : ((L.sortIndex = te), i(k, L), O || M || ((O = !0), G || ((G = !0), he()))),
              L
            );
          }),
          (l.unstable_shouldYield = le),
          (l.unstable_wrapCallback = function (L) {
            var Q = E;
            return function () {
              var $ = E;
              E = Q;
              try {
                return L.apply(this, arguments);
              } finally {
                E = $;
              }
            };
          }));
      })(_c)),
    _c
  );
}
var fp;
function zv() {
  return (fp || ((fp = 1), (mc.exports = Rv())), mc.exports);
}
var fc = { exports: {} },
  ke = {};
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var pp;
function Hv() {
  if (pp) return ke;
  pp = 1;
  var l = Symbol.for('react.transitional.element'),
    i = Symbol.for('react.portal'),
    o = Symbol.for('react.fragment'),
    r = Symbol.for('react.strict_mode'),
    c = Symbol.for('react.profiler'),
    d = Symbol.for('react.consumer'),
    f = Symbol.for('react.context'),
    h = Symbol.for('react.forward_ref'),
    k = Symbol.for('react.suspense'),
    p = Symbol.for('react.memo'),
    v = Symbol.for('react.lazy'),
    y = Symbol.for('react.activity'),
    E = Symbol.iterator;
  function M(N) {
    return N === null || typeof N != 'object'
      ? null
      : ((N = (E && N[E]) || N['@@iterator']), typeof N == 'function' ? N : null);
  }
  var O = {
      isMounted: function () {
        return !1;
      },
      enqueueForceUpdate: function () {},
      enqueueReplaceState: function () {},
      enqueueSetState: function () {},
    },
    x = Object.assign,
    S = {};
  function b(N, H, J) {
    ((this.props = N), (this.context = H), (this.refs = S), (this.updater = J || O));
  }
  ((b.prototype.isReactComponent = {}),
    (b.prototype.setState = function (N, H) {
      if (typeof N != 'object' && typeof N != 'function' && N != null)
        throw Error(
          'takes an object of state variables to update or a function which returns an object of state variables.'
        );
      this.updater.enqueueSetState(this, N, H, 'setState');
    }),
    (b.prototype.forceUpdate = function (N) {
      this.updater.enqueueForceUpdate(this, N, 'forceUpdate');
    }));
  function C() {}
  C.prototype = b.prototype;
  function A(N, H, J) {
    ((this.props = N), (this.context = H), (this.refs = S), (this.updater = J || O));
  }
  var F = (A.prototype = new C());
  ((F.constructor = A), x(F, b.prototype), (F.isPureReactComponent = !0));
  var P = Array.isArray;
  function G() {}
  var U = { H: null, A: null, T: null, S: null },
    ae = Object.prototype.hasOwnProperty;
  function ie(N, H, J) {
    var ee = J.ref;
    return { $$typeof: l, type: N, key: H, ref: ee !== void 0 ? ee : null, props: J };
  }
  function le(N, H) {
    return ie(N.type, H, N.props);
  }
  function ce(N) {
    return typeof N == 'object' && N !== null && N.$$typeof === l;
  }
  function he(N) {
    var H = { '=': '=0', ':': '=2' };
    return (
      '$' +
      N.replace(/[=:]/g, function (J) {
        return H[J];
      })
    );
  }
  var ve = /\/+/g;
  function Se(N, H) {
    return typeof N == 'object' && N !== null && N.key != null ? he('' + N.key) : H.toString(36);
  }
  function ge(N) {
    switch (N.status) {
      case 'fulfilled':
        return N.value;
      case 'rejected':
        throw N.reason;
      default:
        switch (
          (typeof N.status == 'string'
            ? N.then(G, G)
            : ((N.status = 'pending'),
              N.then(
                function (H) {
                  N.status === 'pending' && ((N.status = 'fulfilled'), (N.value = H));
                },
                function (H) {
                  N.status === 'pending' && ((N.status = 'rejected'), (N.reason = H));
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
  function L(N, H, J, ee, ne) {
    var _e = typeof N;
    (_e === 'undefined' || _e === 'boolean') && (N = null);
    var be = !1;
    if (N === null) be = !0;
    else
      switch (_e) {
        case 'bigint':
        case 'string':
        case 'number':
          be = !0;
          break;
        case 'object':
          switch (N.$$typeof) {
            case l:
            case i:
              be = !0;
              break;
            case v:
              return ((be = N._init), L(be(N._payload), H, J, ee, ne));
          }
      }
    if (be)
      return (
        (ne = ne(N)),
        (be = ee === '' ? '.' + Se(N, 0) : ee),
        P(ne)
          ? ((J = ''),
            be != null && (J = be.replace(ve, '$&/') + '/'),
            L(ne, H, J, '', function (ml) {
              return ml;
            }))
          : ne != null &&
            (ce(ne) &&
              (ne = le(
                ne,
                J +
                  (ne.key == null || (N && N.key === ne.key)
                    ? ''
                    : ('' + ne.key).replace(ve, '$&/') + '/') +
                  be
              )),
            H.push(ne)),
        1
      );
    be = 0;
    var Je = ee === '' ? '.' : ee + ':';
    if (P(N))
      for (var Ge = 0; Ge < N.length; Ge++)
        ((ee = N[Ge]), (_e = Je + Se(ee, Ge)), (be += L(ee, H, J, _e, ne)));
    else if (((Ge = M(N)), typeof Ge == 'function'))
      for (N = Ge.call(N), Ge = 0; !(ee = N.next()).done; )
        ((ee = ee.value), (_e = Je + Se(ee, Ge++)), (be += L(ee, H, J, _e, ne)));
    else if (_e === 'object') {
      if (typeof N.then == 'function') return L(ge(N), H, J, ee, ne);
      throw (
        (H = String(N)),
        Error(
          'Objects are not valid as a React child (found: ' +
            (H === '[object Object]' ? 'object with keys {' + Object.keys(N).join(', ') + '}' : H) +
            '). If you meant to render a collection of children, use an array instead.'
        )
      );
    }
    return be;
  }
  function Q(N, H, J) {
    if (N == null) return N;
    var ee = [],
      ne = 0;
    return (
      L(N, ee, '', '', function (_e) {
        return H.call(J, _e, ne++);
      }),
      ee
    );
  }
  function $(N) {
    if (N._status === -1) {
      var H = N._result;
      ((H = H()),
        H.then(
          function (J) {
            (N._status === 0 || N._status === -1) && ((N._status = 1), (N._result = J));
          },
          function (J) {
            (N._status === 0 || N._status === -1) && ((N._status = 2), (N._result = J));
          }
        ),
        N._status === -1 && ((N._status = 0), (N._result = H)));
    }
    if (N._status === 1) return N._result.default;
    throw N._result;
  }
  var Z =
      typeof reportError == 'function'
        ? reportError
        : function (N) {
            if (typeof window == 'object' && typeof window.ErrorEvent == 'function') {
              var H = new window.ErrorEvent('error', {
                bubbles: !0,
                cancelable: !0,
                message:
                  typeof N == 'object' && N !== null && typeof N.message == 'string'
                    ? String(N.message)
                    : String(N),
                error: N,
              });
              if (!window.dispatchEvent(H)) return;
            } else if (typeof process == 'object' && typeof process.emit == 'function') {
              process.emit('uncaughtException', N);
              return;
            }
            console.error(N);
          },
    te = {
      map: Q,
      forEach: function (N, H, J) {
        Q(
          N,
          function () {
            H.apply(this, arguments);
          },
          J
        );
      },
      count: function (N) {
        var H = 0;
        return (
          Q(N, function () {
            H++;
          }),
          H
        );
      },
      toArray: function (N) {
        return (
          Q(N, function (H) {
            return H;
          }) || []
        );
      },
      only: function (N) {
        if (!ce(N))
          throw Error('React.Children.only expected to receive a single React element child.');
        return N;
      },
    };
  return (
    (ke.Activity = y),
    (ke.Children = te),
    (ke.Component = b),
    (ke.Fragment = o),
    (ke.Profiler = c),
    (ke.PureComponent = A),
    (ke.StrictMode = r),
    (ke.Suspense = k),
    (ke.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = U),
    (ke.__COMPILER_RUNTIME = {
      __proto__: null,
      c: function (N) {
        return U.H.useMemoCache(N);
      },
    }),
    (ke.cache = function (N) {
      return function () {
        return N.apply(null, arguments);
      };
    }),
    (ke.cacheSignal = function () {
      return null;
    }),
    (ke.cloneElement = function (N, H, J) {
      if (N == null) throw Error('The argument must be a React element, but you passed ' + N + '.');
      var ee = x({}, N.props),
        ne = N.key;
      if (H != null)
        for (_e in (H.key !== void 0 && (ne = '' + H.key), H))
          !ae.call(H, _e) ||
            _e === 'key' ||
            _e === '__self' ||
            _e === '__source' ||
            (_e === 'ref' && H.ref === void 0) ||
            (ee[_e] = H[_e]);
      var _e = arguments.length - 2;
      if (_e === 1) ee.children = J;
      else if (1 < _e) {
        for (var be = Array(_e), Je = 0; Je < _e; Je++) be[Je] = arguments[Je + 2];
        ee.children = be;
      }
      return ie(N.type, ne, ee);
    }),
    (ke.createContext = function (N) {
      return (
        (N = {
          $$typeof: f,
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
    (ke.createElement = function (N, H, J) {
      var ee,
        ne = {},
        _e = null;
      if (H != null)
        for (ee in (H.key !== void 0 && (_e = '' + H.key), H))
          ae.call(H, ee) &&
            ee !== 'key' &&
            ee !== '__self' &&
            ee !== '__source' &&
            (ne[ee] = H[ee]);
      var be = arguments.length - 2;
      if (be === 1) ne.children = J;
      else if (1 < be) {
        for (var Je = Array(be), Ge = 0; Ge < be; Ge++) Je[Ge] = arguments[Ge + 2];
        ne.children = Je;
      }
      if (N && N.defaultProps)
        for (ee in ((be = N.defaultProps), be)) ne[ee] === void 0 && (ne[ee] = be[ee]);
      return ie(N, _e, ne);
    }),
    (ke.createRef = function () {
      return { current: null };
    }),
    (ke.forwardRef = function (N) {
      return { $$typeof: h, render: N };
    }),
    (ke.isValidElement = ce),
    (ke.lazy = function (N) {
      return { $$typeof: v, _payload: { _status: -1, _result: N }, _init: $ };
    }),
    (ke.memo = function (N, H) {
      return { $$typeof: p, type: N, compare: H === void 0 ? null : H };
    }),
    (ke.startTransition = function (N) {
      var H = U.T,
        J = {};
      U.T = J;
      try {
        var ee = N(),
          ne = U.S;
        (ne !== null && ne(J, ee),
          typeof ee == 'object' && ee !== null && typeof ee.then == 'function' && ee.then(G, Z));
      } catch (_e) {
        Z(_e);
      } finally {
        (H !== null && J.types !== null && (H.types = J.types), (U.T = H));
      }
    }),
    (ke.unstable_useCacheRefresh = function () {
      return U.H.useCacheRefresh();
    }),
    (ke.use = function (N) {
      return U.H.use(N);
    }),
    (ke.useActionState = function (N, H, J) {
      return U.H.useActionState(N, H, J);
    }),
    (ke.useCallback = function (N, H) {
      return U.H.useCallback(N, H);
    }),
    (ke.useContext = function (N) {
      return U.H.useContext(N);
    }),
    (ke.useDebugValue = function () {}),
    (ke.useDeferredValue = function (N, H) {
      return U.H.useDeferredValue(N, H);
    }),
    (ke.useEffect = function (N, H) {
      return U.H.useEffect(N, H);
    }),
    (ke.useEffectEvent = function (N) {
      return U.H.useEffectEvent(N);
    }),
    (ke.useId = function () {
      return U.H.useId();
    }),
    (ke.useImperativeHandle = function (N, H, J) {
      return U.H.useImperativeHandle(N, H, J);
    }),
    (ke.useInsertionEffect = function (N, H) {
      return U.H.useInsertionEffect(N, H);
    }),
    (ke.useLayoutEffect = function (N, H) {
      return U.H.useLayoutEffect(N, H);
    }),
    (ke.useMemo = function (N, H) {
      return U.H.useMemo(N, H);
    }),
    (ke.useOptimistic = function (N, H) {
      return U.H.useOptimistic(N, H);
    }),
    (ke.useReducer = function (N, H, J) {
      return U.H.useReducer(N, H, J);
    }),
    (ke.useRef = function (N) {
      return U.H.useRef(N);
    }),
    (ke.useState = function (N) {
      return U.H.useState(N);
    }),
    (ke.useSyncExternalStore = function (N, H, J) {
      return U.H.useSyncExternalStore(N, H, J);
    }),
    (ke.useTransition = function () {
      return U.H.useTransition();
    }),
    (ke.version = '19.2.5'),
    ke
  );
}
var hp;
function Xc() {
  return (hp || ((hp = 1), (fc.exports = Hv())), fc.exports);
}
var pc = { exports: {} },
  bt = {};
/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var gp;
function Uv() {
  if (gp) return bt;
  gp = 1;
  var l = Xc();
  function i(k) {
    var p = 'https://react.dev/errors/' + k;
    if (1 < arguments.length) {
      p += '?args[]=' + encodeURIComponent(arguments[1]);
      for (var v = 2; v < arguments.length; v++) p += '&args[]=' + encodeURIComponent(arguments[v]);
    }
    return (
      'Minified React error #' +
      k +
      '; visit ' +
      p +
      ' for the full message or use the non-minified dev environment for full errors and additional helpful warnings.'
    );
  }
  function o() {}
  var r = {
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
    c = Symbol.for('react.portal');
  function d(k, p, v) {
    var y = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: c,
      key: y == null ? null : '' + y,
      children: k,
      containerInfo: p,
      implementation: v,
    };
  }
  var f = l.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function h(k, p) {
    if (k === 'font') return '';
    if (typeof p == 'string') return p === 'use-credentials' ? p : '';
  }
  return (
    (bt.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = r),
    (bt.createPortal = function (k, p) {
      var v = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
      if (!p || (p.nodeType !== 1 && p.nodeType !== 9 && p.nodeType !== 11)) throw Error(i(299));
      return d(k, p, null, v);
    }),
    (bt.flushSync = function (k) {
      var p = f.T,
        v = r.p;
      try {
        if (((f.T = null), (r.p = 2), k)) return k();
      } finally {
        ((f.T = p), (r.p = v), r.d.f());
      }
    }),
    (bt.preconnect = function (k, p) {
      typeof k == 'string' &&
        (p
          ? ((p = p.crossOrigin),
            (p = typeof p == 'string' ? (p === 'use-credentials' ? p : '') : void 0))
          : (p = null),
        r.d.C(k, p));
    }),
    (bt.prefetchDNS = function (k) {
      typeof k == 'string' && r.d.D(k);
    }),
    (bt.preinit = function (k, p) {
      if (typeof k == 'string' && p && typeof p.as == 'string') {
        var v = p.as,
          y = h(v, p.crossOrigin),
          E = typeof p.integrity == 'string' ? p.integrity : void 0,
          M = typeof p.fetchPriority == 'string' ? p.fetchPriority : void 0;
        v === 'style'
          ? r.d.S(k, typeof p.precedence == 'string' ? p.precedence : void 0, {
              crossOrigin: y,
              integrity: E,
              fetchPriority: M,
            })
          : v === 'script' &&
            r.d.X(k, {
              crossOrigin: y,
              integrity: E,
              fetchPriority: M,
              nonce: typeof p.nonce == 'string' ? p.nonce : void 0,
            });
      }
    }),
    (bt.preinitModule = function (k, p) {
      if (typeof k == 'string')
        if (typeof p == 'object' && p !== null) {
          if (p.as == null || p.as === 'script') {
            var v = h(p.as, p.crossOrigin);
            r.d.M(k, {
              crossOrigin: v,
              integrity: typeof p.integrity == 'string' ? p.integrity : void 0,
              nonce: typeof p.nonce == 'string' ? p.nonce : void 0,
            });
          }
        } else p == null && r.d.M(k);
    }),
    (bt.preload = function (k, p) {
      if (typeof k == 'string' && typeof p == 'object' && p !== null && typeof p.as == 'string') {
        var v = p.as,
          y = h(v, p.crossOrigin);
        r.d.L(k, v, {
          crossOrigin: y,
          integrity: typeof p.integrity == 'string' ? p.integrity : void 0,
          nonce: typeof p.nonce == 'string' ? p.nonce : void 0,
          type: typeof p.type == 'string' ? p.type : void 0,
          fetchPriority: typeof p.fetchPriority == 'string' ? p.fetchPriority : void 0,
          referrerPolicy: typeof p.referrerPolicy == 'string' ? p.referrerPolicy : void 0,
          imageSrcSet: typeof p.imageSrcSet == 'string' ? p.imageSrcSet : void 0,
          imageSizes: typeof p.imageSizes == 'string' ? p.imageSizes : void 0,
          media: typeof p.media == 'string' ? p.media : void 0,
        });
      }
    }),
    (bt.preloadModule = function (k, p) {
      if (typeof k == 'string')
        if (p) {
          var v = h(p.as, p.crossOrigin);
          r.d.m(k, {
            as: typeof p.as == 'string' && p.as !== 'script' ? p.as : void 0,
            crossOrigin: v,
            integrity: typeof p.integrity == 'string' ? p.integrity : void 0,
          });
        } else r.d.m(k);
    }),
    (bt.requestFormReset = function (k) {
      r.d.r(k);
    }),
    (bt.unstable_batchedUpdates = function (k, p) {
      return k(p);
    }),
    (bt.useFormState = function (k, p, v) {
      return f.H.useFormState(k, p, v);
    }),
    (bt.useFormStatus = function () {
      return f.H.useHostTransitionStatus();
    }),
    (bt.version = '19.2.5'),
    bt
  );
}
var kp;
function Gv() {
  if (kp) return pc.exports;
  kp = 1;
  function l() {
    if (
      !(
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > 'u' ||
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != 'function'
      )
    )
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(l);
      } catch (i) {
        console.error(i);
      }
  }
  return (l(), (pc.exports = Uv()), pc.exports);
}
/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var vp;
function $v() {
  if (vp) return Ui;
  vp = 1;
  var l = zv(),
    i = Xc(),
    o = Gv();
  function r(e) {
    var t = 'https://react.dev/errors/' + e;
    if (1 < arguments.length) {
      t += '?args[]=' + encodeURIComponent(arguments[1]);
      for (var a = 2; a < arguments.length; a++) t += '&args[]=' + encodeURIComponent(arguments[a]);
    }
    return (
      'Minified React error #' +
      e +
      '; visit ' +
      t +
      ' for the full message or use the non-minified dev environment for full errors and additional helpful warnings.'
    );
  }
  function c(e) {
    return !(!e || (e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11));
  }
  function d(e) {
    var t = e,
      a = e;
    if (e.alternate) for (; t.return; ) t = t.return;
    else {
      e = t;
      do ((t = e), (t.flags & 4098) !== 0 && (a = t.return), (e = t.return));
      while (e);
    }
    return t.tag === 3 ? a : null;
  }
  function f(e) {
    if (e.tag === 13) {
      var t = e.memoizedState;
      if ((t === null && ((e = e.alternate), e !== null && (t = e.memoizedState)), t !== null))
        return t.dehydrated;
    }
    return null;
  }
  function h(e) {
    if (e.tag === 31) {
      var t = e.memoizedState;
      if ((t === null && ((e = e.alternate), e !== null && (t = e.memoizedState)), t !== null))
        return t.dehydrated;
    }
    return null;
  }
  function k(e) {
    if (d(e) !== e) throw Error(r(188));
  }
  function p(e) {
    var t = e.alternate;
    if (!t) {
      if (((t = d(e)), t === null)) throw Error(r(188));
      return t !== e ? null : e;
    }
    for (var a = e, n = t; ; ) {
      var s = a.return;
      if (s === null) break;
      var u = s.alternate;
      if (u === null) {
        if (((n = s.return), n !== null)) {
          a = n;
          continue;
        }
        break;
      }
      if (s.child === u.child) {
        for (u = s.child; u; ) {
          if (u === a) return (k(s), e);
          if (u === n) return (k(s), t);
          u = u.sibling;
        }
        throw Error(r(188));
      }
      if (a.return !== n.return) ((a = s), (n = u));
      else {
        for (var m = !1, g = s.child; g; ) {
          if (g === a) {
            ((m = !0), (a = s), (n = u));
            break;
          }
          if (g === n) {
            ((m = !0), (n = s), (a = u));
            break;
          }
          g = g.sibling;
        }
        if (!m) {
          for (g = u.child; g; ) {
            if (g === a) {
              ((m = !0), (a = u), (n = s));
              break;
            }
            if (g === n) {
              ((m = !0), (n = u), (a = s));
              break;
            }
            g = g.sibling;
          }
          if (!m) throw Error(r(189));
        }
      }
      if (a.alternate !== n) throw Error(r(190));
    }
    if (a.tag !== 3) throw Error(r(188));
    return a.stateNode.current === a ? e : t;
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
  var y = Object.assign,
    E = Symbol.for('react.element'),
    M = Symbol.for('react.transitional.element'),
    O = Symbol.for('react.portal'),
    x = Symbol.for('react.fragment'),
    S = Symbol.for('react.strict_mode'),
    b = Symbol.for('react.profiler'),
    C = Symbol.for('react.consumer'),
    A = Symbol.for('react.context'),
    F = Symbol.for('react.forward_ref'),
    P = Symbol.for('react.suspense'),
    G = Symbol.for('react.suspense_list'),
    U = Symbol.for('react.memo'),
    ae = Symbol.for('react.lazy'),
    ie = Symbol.for('react.activity'),
    le = Symbol.for('react.memo_cache_sentinel'),
    ce = Symbol.iterator;
  function he(e) {
    return e === null || typeof e != 'object'
      ? null
      : ((e = (ce && e[ce]) || e['@@iterator']), typeof e == 'function' ? e : null);
  }
  var ve = Symbol.for('react.client.reference');
  function Se(e) {
    if (e == null) return null;
    if (typeof e == 'function') return e.$$typeof === ve ? null : e.displayName || e.name || null;
    if (typeof e == 'string') return e;
    switch (e) {
      case x:
        return 'Fragment';
      case b:
        return 'Profiler';
      case S:
        return 'StrictMode';
      case P:
        return 'Suspense';
      case G:
        return 'SuspenseList';
      case ie:
        return 'Activity';
    }
    if (typeof e == 'object')
      switch (e.$$typeof) {
        case O:
          return 'Portal';
        case A:
          return e.displayName || 'Context';
        case C:
          return (e._context.displayName || 'Context') + '.Consumer';
        case F:
          var t = e.render;
          return (
            (e = e.displayName),
            e ||
              ((e = t.displayName || t.name || ''),
              (e = e !== '' ? 'ForwardRef(' + e + ')' : 'ForwardRef')),
            e
          );
        case U:
          return ((t = e.displayName || null), t !== null ? t : Se(e.type) || 'Memo');
        case ae:
          ((t = e._payload), (e = e._init));
          try {
            return Se(e(t));
          } catch {}
      }
    return null;
  }
  var ge = Array.isArray,
    L = i.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
    Q = o.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
    $ = { pending: !1, data: null, method: null, action: null },
    Z = [],
    te = -1;
  function N(e) {
    return { current: e };
  }
  function H(e) {
    0 > te || ((e.current = Z[te]), (Z[te] = null), te--);
  }
  function J(e, t) {
    (te++, (Z[te] = e.current), (e.current = t));
  }
  var ee = N(null),
    ne = N(null),
    _e = N(null),
    be = N(null);
  function Je(e, t) {
    switch ((J(_e, t), J(ne, e), J(ee, null), t.nodeType)) {
      case 9:
      case 11:
        e = (e = t.documentElement) && (e = e.namespaceURI) ? Mf(e) : 0;
        break;
      default:
        if (((e = t.tagName), (t = t.namespaceURI))) ((t = Mf(t)), (e = Of(t, e)));
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
    (H(ee), J(ee, e));
  }
  function Ge() {
    (H(ee), H(ne), H(_e));
  }
  function ml(e) {
    e.memoizedState !== null && J(be, e);
    var t = ee.current,
      a = Of(t, e.type);
    t !== a && (J(ne, e), J(ee, a));
  }
  function Ga(e) {
    (ne.current === e && (H(ee), H(ne)), be.current === e && (H(be), (Ii._currentValue = $)));
  }
  var ya, $a;
  function _l(e) {
    if (ya === void 0)
      try {
        throw Error();
      } catch (a) {
        var t = a.stack.trim().match(/\n( *(at )?)/);
        ((ya = (t && t[1]) || ''),
          ($a =
            -1 <
            a.stack.indexOf(`
    at`)
              ? ' (<anonymous>)'
              : -1 < a.stack.indexOf('@')
                ? '@unknown:0:0'
                : ''));
      }
    return (
      `
` +
      ya +
      e +
      $a
    );
  }
  var Ya = !1;
  function Qn(e, t) {
    if (!e || Ya) return '';
    Ya = !0;
    var a = Error.prepareStackTrace;
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
                } catch (z) {
                  var R = z;
                }
                Reflect.construct(e, [], V);
              } else {
                try {
                  V.call();
                } catch (z) {
                  R = z;
                }
                e.call(V.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (z) {
                R = z;
              }
              (V = e()) && typeof V.catch == 'function' && V.catch(function () {});
            }
          } catch (z) {
            if (z && R && typeof z.stack == 'string') return [z.stack, R.stack];
          }
          return [null, null];
        },
      };
      n.DetermineComponentFrameRoot.displayName = 'DetermineComponentFrameRoot';
      var s = Object.getOwnPropertyDescriptor(n.DetermineComponentFrameRoot, 'name');
      s &&
        s.configurable &&
        Object.defineProperty(n.DetermineComponentFrameRoot, 'name', {
          value: 'DetermineComponentFrameRoot',
        });
      var u = n.DetermineComponentFrameRoot(),
        m = u[0],
        g = u[1];
      if (m && g) {
        var w = m.split(`
`),
          D = g.split(`
`);
        for (s = n = 0; n < w.length && !w[n].includes('DetermineComponentFrameRoot'); ) n++;
        for (; s < D.length && !D[s].includes('DetermineComponentFrameRoot'); ) s++;
        if (n === w.length || s === D.length)
          for (n = w.length - 1, s = D.length - 1; 1 <= n && 0 <= s && w[n] !== D[s]; ) s--;
        for (; 1 <= n && 0 <= s; n--, s--)
          if (w[n] !== D[s]) {
            if (n !== 1 || s !== 1)
              do
                if ((n--, s--, 0 > s || w[n] !== D[s])) {
                  var Y =
                    `
` + w[n].replace(' at new ', ' at ');
                  return (
                    e.displayName &&
                      Y.includes('<anonymous>') &&
                      (Y = Y.replace('<anonymous>', e.displayName)),
                    Y
                  );
                }
              while (1 <= n && 0 <= s);
            break;
          }
      }
    } finally {
      ((Ya = !1), (Error.prepareStackTrace = a));
    }
    return (a = e ? e.displayName || e.name : '') ? _l(a) : '';
  }
  function vt(e, t) {
    switch (e.tag) {
      case 26:
      case 27:
      case 5:
        return _l(e.type);
      case 16:
        return _l('Lazy');
      case 13:
        return e.child !== t && t !== null ? _l('Suspense Fallback') : _l('Suspense');
      case 19:
        return _l('SuspenseList');
      case 0:
      case 15:
        return Qn(e.type, !1);
      case 11:
        return Qn(e.type.render, !1);
      case 1:
        return Qn(e.type, !0);
      case 31:
        return _l('Activity');
      default:
        return '';
    }
  }
  function es(e) {
    try {
      var t = '',
        a = null;
      do ((t += vt(e, a)), (a = e), (e = e.return));
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
  var Xa = Object.prototype.hasOwnProperty,
    Va = l.unstable_scheduleCallback,
    Kn = l.unstable_cancelCallback,
    ts = l.unstable_shouldYield,
    ls = l.unstable_requestPaint,
    yt = l.unstable_now,
    q = l.unstable_getCurrentPriorityLevel,
    W = l.unstable_ImmediatePriority,
    se = l.unstable_UserBlockingPriority,
    me = l.unstable_NormalPriority,
    Ve = l.unstable_LowPriority,
    Vl = l.unstable_IdlePriority,
    as = l.log,
    Qa = l.unstable_setDisableYieldValue,
    yl = null,
    Lt = null;
  function Ql(e) {
    if ((typeof as == 'function' && Qa(e), Lt && typeof Lt.setStrictMode == 'function'))
      try {
        Lt.setStrictMode(yl, e);
      } catch {}
  }
  var qt = Math.clz32 ? Math.clz32 : yg,
    kg = Math.log,
    vg = Math.LN2;
  function yg(e) {
    return ((e >>>= 0), e === 0 ? 32 : (31 - ((kg(e) / vg) | 0)) | 0);
  }
  var ns = 256,
    is = 262144,
    ss = 4194304;
  function ba(e) {
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
  function rs(e, t, a) {
    var n = e.pendingLanes;
    if (n === 0) return 0;
    var s = 0,
      u = e.suspendedLanes,
      m = e.pingedLanes;
    e = e.warmLanes;
    var g = n & 134217727;
    return (
      g !== 0
        ? ((n = g & ~u),
          n !== 0
            ? (s = ba(n))
            : ((m &= g), m !== 0 ? (s = ba(m)) : a || ((a = g & ~e), a !== 0 && (s = ba(a)))))
        : ((g = n & ~u),
          g !== 0
            ? (s = ba(g))
            : m !== 0
              ? (s = ba(m))
              : a || ((a = n & ~e), a !== 0 && (s = ba(a)))),
      s === 0
        ? 0
        : t !== 0 &&
            t !== s &&
            (t & u) === 0 &&
            ((u = s & -s), (a = t & -t), u >= a || (u === 32 && (a & 4194048) !== 0))
          ? t
          : s
    );
  }
  function Zn(e, t) {
    return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & t) === 0;
  }
  function bg(e, t) {
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
  function fd() {
    var e = ss;
    return ((ss <<= 1), (ss & 62914560) === 0 && (ss = 4194304), e);
  }
  function Jr(e) {
    for (var t = [], a = 0; 31 > a; a++) t.push(e);
    return t;
  }
  function Jn(e, t) {
    ((e.pendingLanes |= t),
      t !== 268435456 && ((e.suspendedLanes = 0), (e.pingedLanes = 0), (e.warmLanes = 0)));
  }
  function xg(e, t, a, n, s, u) {
    var m = e.pendingLanes;
    ((e.pendingLanes = a),
      (e.suspendedLanes = 0),
      (e.pingedLanes = 0),
      (e.warmLanes = 0),
      (e.expiredLanes &= a),
      (e.entangledLanes &= a),
      (e.errorRecoveryDisabledLanes &= a),
      (e.shellSuspendCounter = 0));
    var g = e.entanglements,
      w = e.expirationTimes,
      D = e.hiddenUpdates;
    for (a = m & ~a; 0 < a; ) {
      var Y = 31 - qt(a),
        V = 1 << Y;
      ((g[Y] = 0), (w[Y] = -1));
      var R = D[Y];
      if (R !== null)
        for (D[Y] = null, Y = 0; Y < R.length; Y++) {
          var z = R[Y];
          z !== null && (z.lane &= -536870913);
        }
      a &= ~V;
    }
    (n !== 0 && pd(e, n, 0),
      u !== 0 && s === 0 && e.tag !== 0 && (e.suspendedLanes |= u & ~(m & ~t)));
  }
  function pd(e, t, a) {
    ((e.pendingLanes |= t), (e.suspendedLanes &= ~t));
    var n = 31 - qt(t);
    ((e.entangledLanes |= t),
      (e.entanglements[n] = e.entanglements[n] | 1073741824 | (a & 261930)));
  }
  function hd(e, t) {
    var a = (e.entangledLanes |= t);
    for (e = e.entanglements; a; ) {
      var n = 31 - qt(a),
        s = 1 << n;
      ((s & t) | (e[n] & t) && (e[n] |= t), (a &= ~s));
    }
  }
  function gd(e, t) {
    var a = t & -t;
    return ((a = (a & 42) !== 0 ? 1 : Pr(a)), (a & (e.suspendedLanes | t)) !== 0 ? 0 : a);
  }
  function Pr(e) {
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
  function Fr(e) {
    return ((e &= -e), 2 < e ? (8 < e ? ((e & 134217727) !== 0 ? 32 : 268435456) : 8) : 2);
  }
  function kd() {
    var e = Q.p;
    return e !== 0 ? e : ((e = window.event), e === void 0 ? 32 : np(e.type));
  }
  function vd(e, t) {
    var a = Q.p;
    try {
      return ((Q.p = e), t());
    } finally {
      Q.p = a;
    }
  }
  var Kl = Math.random().toString(36).slice(2),
    ft = '__reactFiber$' + Kl,
    wt = '__reactProps$' + Kl,
    Ka = '__reactContainer$' + Kl,
    Wr = '__reactEvents$' + Kl,
    Sg = '__reactListeners$' + Kl,
    wg = '__reactHandles$' + Kl,
    yd = '__reactResources$' + Kl,
    Pn = '__reactMarker$' + Kl;
  function eo(e) {
    (delete e[ft], delete e[wt], delete e[Wr], delete e[Sg], delete e[wg]);
  }
  function Za(e) {
    var t = e[ft];
    if (t) return t;
    for (var a = e.parentNode; a; ) {
      if ((t = a[Ka] || a[ft])) {
        if (((a = t.alternate), t.child !== null || (a !== null && a.child !== null)))
          for (e = Gf(e); e !== null; ) {
            if ((a = e[ft])) return a;
            e = Gf(e);
          }
        return t;
      }
      ((e = a), (a = e.parentNode));
    }
    return null;
  }
  function Ja(e) {
    if ((e = e[ft] || e[Ka])) {
      var t = e.tag;
      if (t === 5 || t === 6 || t === 13 || t === 31 || t === 26 || t === 27 || t === 3) return e;
    }
    return null;
  }
  function Fn(e) {
    var t = e.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return e.stateNode;
    throw Error(r(33));
  }
  function Pa(e) {
    var t = e[yd];
    return (t || (t = e[yd] = { hoistableStyles: new Map(), hoistableScripts: new Map() }), t);
  }
  function ct(e) {
    e[Pn] = !0;
  }
  var bd = new Set(),
    xd = {};
  function xa(e, t) {
    (Fa(e, t), Fa(e + 'Capture', t));
  }
  function Fa(e, t) {
    for (xd[e] = t, e = 0; e < t.length; e++) bd.add(t[e]);
  }
  var Tg = RegExp(
      '^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$'
    ),
    Sd = {},
    wd = {};
  function Eg(e) {
    return Xa.call(wd, e)
      ? !0
      : Xa.call(Sd, e)
        ? !1
        : Tg.test(e)
          ? (wd[e] = !0)
          : ((Sd[e] = !0), !1);
  }
  function os(e, t, a) {
    if (Eg(t))
      if (a === null) e.removeAttribute(t);
      else {
        switch (typeof a) {
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
        e.setAttribute(t, '' + a);
      }
  }
  function us(e, t, a) {
    if (a === null) e.removeAttribute(t);
    else {
      switch (typeof a) {
        case 'undefined':
        case 'function':
        case 'symbol':
        case 'boolean':
          e.removeAttribute(t);
          return;
      }
      e.setAttribute(t, '' + a);
    }
  }
  function bl(e, t, a, n) {
    if (n === null) e.removeAttribute(a);
    else {
      switch (typeof n) {
        case 'undefined':
        case 'function':
        case 'symbol':
        case 'boolean':
          e.removeAttribute(a);
          return;
      }
      e.setAttributeNS(t, a, '' + n);
    }
  }
  function Gt(e) {
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
  function Td(e) {
    var t = e.type;
    return (e = e.nodeName) && e.toLowerCase() === 'input' && (t === 'checkbox' || t === 'radio');
  }
  function Cg(e, t, a) {
    var n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t);
    if (
      !e.hasOwnProperty(t) &&
      typeof n < 'u' &&
      typeof n.get == 'function' &&
      typeof n.set == 'function'
    ) {
      var s = n.get,
        u = n.set;
      return (
        Object.defineProperty(e, t, {
          configurable: !0,
          get: function () {
            return s.call(this);
          },
          set: function (m) {
            ((a = '' + m), u.call(this, m));
          },
        }),
        Object.defineProperty(e, t, { enumerable: n.enumerable }),
        {
          getValue: function () {
            return a;
          },
          setValue: function (m) {
            a = '' + m;
          },
          stopTracking: function () {
            ((e._valueTracker = null), delete e[t]);
          },
        }
      );
    }
  }
  function to(e) {
    if (!e._valueTracker) {
      var t = Td(e) ? 'checked' : 'value';
      e._valueTracker = Cg(e, t, '' + e[t]);
    }
  }
  function Ed(e) {
    if (!e) return !1;
    var t = e._valueTracker;
    if (!t) return !0;
    var a = t.getValue(),
      n = '';
    return (
      e && (n = Td(e) ? (e.checked ? 'true' : 'false') : e.value),
      (e = n),
      e !== a ? (t.setValue(e), !0) : !1
    );
  }
  function cs(e) {
    if (((e = e || (typeof document < 'u' ? document : void 0)), typeof e > 'u')) return null;
    try {
      return e.activeElement || e.body;
    } catch {
      return e.body;
    }
  }
  var Ng = /[\n"\\]/g;
  function $t(e) {
    return e.replace(Ng, function (t) {
      return '\\' + t.charCodeAt(0).toString(16) + ' ';
    });
  }
  function lo(e, t, a, n, s, u, m, g) {
    ((e.name = ''),
      m != null && typeof m != 'function' && typeof m != 'symbol' && typeof m != 'boolean'
        ? (e.type = m)
        : e.removeAttribute('type'),
      t != null
        ? m === 'number'
          ? ((t === 0 && e.value === '') || e.value != t) && (e.value = '' + Gt(t))
          : e.value !== '' + Gt(t) && (e.value = '' + Gt(t))
        : (m !== 'submit' && m !== 'reset') || e.removeAttribute('value'),
      t != null
        ? ao(e, m, Gt(t))
        : a != null
          ? ao(e, m, Gt(a))
          : n != null && e.removeAttribute('value'),
      s == null && u != null && (e.defaultChecked = !!u),
      s != null && (e.checked = s && typeof s != 'function' && typeof s != 'symbol'),
      g != null && typeof g != 'function' && typeof g != 'symbol' && typeof g != 'boolean'
        ? (e.name = '' + Gt(g))
        : e.removeAttribute('name'));
  }
  function Cd(e, t, a, n, s, u, m, g) {
    if (
      (u != null &&
        typeof u != 'function' &&
        typeof u != 'symbol' &&
        typeof u != 'boolean' &&
        (e.type = u),
      t != null || a != null)
    ) {
      if (!((u !== 'submit' && u !== 'reset') || t != null)) {
        to(e);
        return;
      }
      ((a = a != null ? '' + Gt(a) : ''),
        (t = t != null ? '' + Gt(t) : a),
        g || t === e.value || (e.value = t),
        (e.defaultValue = t));
    }
    ((n = n ?? s),
      (n = typeof n != 'function' && typeof n != 'symbol' && !!n),
      (e.checked = g ? e.checked : !!n),
      (e.defaultChecked = !!n),
      m != null &&
        typeof m != 'function' &&
        typeof m != 'symbol' &&
        typeof m != 'boolean' &&
        (e.name = m),
      to(e));
  }
  function ao(e, t, a) {
    (t === 'number' && cs(e.ownerDocument) === e) ||
      e.defaultValue === '' + a ||
      (e.defaultValue = '' + a);
  }
  function Wa(e, t, a, n) {
    if (((e = e.options), t)) {
      t = {};
      for (var s = 0; s < a.length; s++) t['$' + a[s]] = !0;
      for (a = 0; a < e.length; a++)
        ((s = t.hasOwnProperty('$' + e[a].value)),
          e[a].selected !== s && (e[a].selected = s),
          s && n && (e[a].defaultSelected = !0));
    } else {
      for (a = '' + Gt(a), t = null, s = 0; s < e.length; s++) {
        if (e[s].value === a) {
          ((e[s].selected = !0), n && (e[s].defaultSelected = !0));
          return;
        }
        t !== null || e[s].disabled || (t = e[s]);
      }
      t !== null && (t.selected = !0);
    }
  }
  function Nd(e, t, a) {
    if (t != null && ((t = '' + Gt(t)), t !== e.value && (e.value = t), a == null)) {
      e.defaultValue !== t && (e.defaultValue = t);
      return;
    }
    e.defaultValue = a != null ? '' + Gt(a) : '';
  }
  function jd(e, t, a, n) {
    if (t == null) {
      if (n != null) {
        if (a != null) throw Error(r(92));
        if (ge(n)) {
          if (1 < n.length) throw Error(r(93));
          n = n[0];
        }
        a = n;
      }
      (a == null && (a = ''), (t = a));
    }
    ((a = Gt(t)),
      (e.defaultValue = a),
      (n = e.textContent),
      n === a && n !== '' && n !== null && (e.value = n),
      to(e));
  }
  function en(e, t) {
    if (t) {
      var a = e.firstChild;
      if (a && a === e.lastChild && a.nodeType === 3) {
        a.nodeValue = t;
        return;
      }
    }
    e.textContent = t;
  }
  var jg = new Set(
    'animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp'.split(
      ' '
    )
  );
  function Ad(e, t, a) {
    var n = t.indexOf('--') === 0;
    a == null || typeof a == 'boolean' || a === ''
      ? n
        ? e.setProperty(t, '')
        : t === 'float'
          ? (e.cssFloat = '')
          : (e[t] = '')
      : n
        ? e.setProperty(t, a)
        : typeof a != 'number' || a === 0 || jg.has(t)
          ? t === 'float'
            ? (e.cssFloat = a)
            : (e[t] = ('' + a).trim())
          : (e[t] = a + 'px');
  }
  function Ld(e, t, a) {
    if (t != null && typeof t != 'object') throw Error(r(62));
    if (((e = e.style), a != null)) {
      for (var n in a)
        !a.hasOwnProperty(n) ||
          (t != null && t.hasOwnProperty(n)) ||
          (n.indexOf('--') === 0
            ? e.setProperty(n, '')
            : n === 'float'
              ? (e.cssFloat = '')
              : (e[n] = ''));
      for (var s in t) ((n = t[s]), t.hasOwnProperty(s) && a[s] !== n && Ad(e, s, n));
    } else for (var u in t) t.hasOwnProperty(u) && Ad(e, u, t[u]);
  }
  function no(e) {
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
  var Ag = new Map([
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
    Lg =
      /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function ds(e) {
    return Lg.test('' + e)
      ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')"
      : e;
  }
  function xl() {}
  var io = null;
  function so(e) {
    return (
      (e = e.target || e.srcElement || window),
      e.correspondingUseElement && (e = e.correspondingUseElement),
      e.nodeType === 3 ? e.parentNode : e
    );
  }
  var tn = null,
    ln = null;
  function qd(e) {
    var t = Ja(e);
    if (t && (e = t.stateNode)) {
      var a = e[wt] || null;
      e: switch (((e = t.stateNode), t.type)) {
        case 'input':
          if (
            (lo(
              e,
              a.value,
              a.defaultValue,
              a.defaultValue,
              a.checked,
              a.defaultChecked,
              a.type,
              a.name
            ),
            (t = a.name),
            a.type === 'radio' && t != null)
          ) {
            for (a = e; a.parentNode; ) a = a.parentNode;
            for (
              a = a.querySelectorAll('input[name="' + $t('' + t) + '"][type="radio"]'), t = 0;
              t < a.length;
              t++
            ) {
              var n = a[t];
              if (n !== e && n.form === e.form) {
                var s = n[wt] || null;
                if (!s) throw Error(r(90));
                lo(
                  n,
                  s.value,
                  s.defaultValue,
                  s.defaultValue,
                  s.checked,
                  s.defaultChecked,
                  s.type,
                  s.name
                );
              }
            }
            for (t = 0; t < a.length; t++) ((n = a[t]), n.form === e.form && Ed(n));
          }
          break e;
        case 'textarea':
          Nd(e, a.value, a.defaultValue);
          break e;
        case 'select':
          ((t = a.value), t != null && Wa(e, !!a.multiple, t, !1));
      }
    }
  }
  var ro = !1;
  function Bd(e, t, a) {
    if (ro) return e(t, a);
    ro = !0;
    try {
      var n = e(t);
      return n;
    } finally {
      if (
        ((ro = !1),
        (tn !== null || ln !== null) &&
          (Fs(), tn && ((t = tn), (e = ln), (ln = tn = null), qd(t), e)))
      )
        for (t = 0; t < e.length; t++) qd(e[t]);
    }
  }
  function Wn(e, t) {
    var a = e.stateNode;
    if (a === null) return null;
    var n = a[wt] || null;
    if (n === null) return null;
    a = n[t];
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
    if (a && typeof a != 'function') throw Error(r(231, t, typeof a));
    return a;
  }
  var Sl = !(
      typeof window > 'u' ||
      typeof window.document > 'u' ||
      typeof window.document.createElement > 'u'
    ),
    oo = !1;
  if (Sl)
    try {
      var ei = {};
      (Object.defineProperty(ei, 'passive', {
        get: function () {
          oo = !0;
        },
      }),
        window.addEventListener('test', ei, ei),
        window.removeEventListener('test', ei, ei));
    } catch {
      oo = !1;
    }
  var Zl = null,
    uo = null,
    ms = null;
  function Md() {
    if (ms) return ms;
    var e,
      t = uo,
      a = t.length,
      n,
      s = 'value' in Zl ? Zl.value : Zl.textContent,
      u = s.length;
    for (e = 0; e < a && t[e] === s[e]; e++);
    var m = a - e;
    for (n = 1; n <= m && t[a - n] === s[u - n]; n++);
    return (ms = s.slice(e, 1 < n ? 1 - n : void 0));
  }
  function _s(e) {
    var t = e.keyCode;
    return (
      'charCode' in e ? ((e = e.charCode), e === 0 && t === 13 && (e = 13)) : (e = t),
      e === 10 && (e = 13),
      32 <= e || e === 13 ? e : 0
    );
  }
  function fs() {
    return !0;
  }
  function Od() {
    return !1;
  }
  function Tt(e) {
    function t(a, n, s, u, m) {
      ((this._reactName = a),
        (this._targetInst = s),
        (this.type = n),
        (this.nativeEvent = u),
        (this.target = m),
        (this.currentTarget = null));
      for (var g in e) e.hasOwnProperty(g) && ((a = e[g]), (this[g] = a ? a(u) : u[g]));
      return (
        (this.isDefaultPrevented = (
          u.defaultPrevented != null ? u.defaultPrevented : u.returnValue === !1
        )
          ? fs
          : Od),
        (this.isPropagationStopped = Od),
        this
      );
    }
    return (
      y(t.prototype, {
        preventDefault: function () {
          this.defaultPrevented = !0;
          var a = this.nativeEvent;
          a &&
            (a.preventDefault
              ? a.preventDefault()
              : typeof a.returnValue != 'unknown' && (a.returnValue = !1),
            (this.isDefaultPrevented = fs));
        },
        stopPropagation: function () {
          var a = this.nativeEvent;
          a &&
            (a.stopPropagation
              ? a.stopPropagation()
              : typeof a.cancelBubble != 'unknown' && (a.cancelBubble = !0),
            (this.isPropagationStopped = fs));
        },
        persist: function () {},
        isPersistent: fs,
      }),
      t
    );
  }
  var Sa = {
      eventPhase: 0,
      bubbles: 0,
      cancelable: 0,
      timeStamp: function (e) {
        return e.timeStamp || Date.now();
      },
      defaultPrevented: 0,
      isTrusted: 0,
    },
    ps = Tt(Sa),
    ti = y({}, Sa, { view: 0, detail: 0 }),
    qg = Tt(ti),
    co,
    mo,
    li,
    hs = y({}, ti, {
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
      getModifierState: fo,
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
          : (e !== li &&
              (li && e.type === 'mousemove'
                ? ((co = e.screenX - li.screenX), (mo = e.screenY - li.screenY))
                : (mo = co = 0),
              (li = e)),
            co);
      },
      movementY: function (e) {
        return 'movementY' in e ? e.movementY : mo;
      },
    }),
    Id = Tt(hs),
    Bg = y({}, hs, { dataTransfer: 0 }),
    Mg = Tt(Bg),
    Og = y({}, ti, { relatedTarget: 0 }),
    _o = Tt(Og),
    Ig = y({}, Sa, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
    Dg = Tt(Ig),
    Rg = y({}, Sa, {
      clipboardData: function (e) {
        return 'clipboardData' in e ? e.clipboardData : window.clipboardData;
      },
    }),
    zg = Tt(Rg),
    Hg = y({}, Sa, { data: 0 }),
    Dd = Tt(Hg),
    Ug = {
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
    Gg = {
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
    $g = { Alt: 'altKey', Control: 'ctrlKey', Meta: 'metaKey', Shift: 'shiftKey' };
  function Yg(e) {
    var t = this.nativeEvent;
    return t.getModifierState ? t.getModifierState(e) : (e = $g[e]) ? !!t[e] : !1;
  }
  function fo() {
    return Yg;
  }
  var Xg = y({}, ti, {
      key: function (e) {
        if (e.key) {
          var t = Ug[e.key] || e.key;
          if (t !== 'Unidentified') return t;
        }
        return e.type === 'keypress'
          ? ((e = _s(e)), e === 13 ? 'Enter' : String.fromCharCode(e))
          : e.type === 'keydown' || e.type === 'keyup'
            ? Gg[e.keyCode] || 'Unidentified'
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
      getModifierState: fo,
      charCode: function (e) {
        return e.type === 'keypress' ? _s(e) : 0;
      },
      keyCode: function (e) {
        return e.type === 'keydown' || e.type === 'keyup' ? e.keyCode : 0;
      },
      which: function (e) {
        return e.type === 'keypress'
          ? _s(e)
          : e.type === 'keydown' || e.type === 'keyup'
            ? e.keyCode
            : 0;
      },
    }),
    Vg = Tt(Xg),
    Qg = y({}, hs, {
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
    Rd = Tt(Qg),
    Kg = y({}, ti, {
      touches: 0,
      targetTouches: 0,
      changedTouches: 0,
      altKey: 0,
      metaKey: 0,
      ctrlKey: 0,
      shiftKey: 0,
      getModifierState: fo,
    }),
    Zg = Tt(Kg),
    Jg = y({}, Sa, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
    Pg = Tt(Jg),
    Fg = y({}, hs, {
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
    Wg = Tt(Fg),
    ek = y({}, Sa, { newState: 0, oldState: 0 }),
    tk = Tt(ek),
    lk = [9, 13, 27, 32],
    po = Sl && 'CompositionEvent' in window,
    ai = null;
  Sl && 'documentMode' in document && (ai = document.documentMode);
  var ak = Sl && 'TextEvent' in window && !ai,
    zd = Sl && (!po || (ai && 8 < ai && 11 >= ai)),
    Hd = ' ',
    Ud = !1;
  function Gd(e, t) {
    switch (e) {
      case 'keyup':
        return lk.indexOf(t.keyCode) !== -1;
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
  function $d(e) {
    return ((e = e.detail), typeof e == 'object' && 'data' in e ? e.data : null);
  }
  var an = !1;
  function nk(e, t) {
    switch (e) {
      case 'compositionend':
        return $d(t);
      case 'keypress':
        return t.which !== 32 ? null : ((Ud = !0), Hd);
      case 'textInput':
        return ((e = t.data), e === Hd && Ud ? null : e);
      default:
        return null;
    }
  }
  function ik(e, t) {
    if (an)
      return e === 'compositionend' || (!po && Gd(e, t))
        ? ((e = Md()), (ms = uo = Zl = null), (an = !1), e)
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
        return zd && t.locale !== 'ko' ? null : t.data;
      default:
        return null;
    }
  }
  var sk = {
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
  function Yd(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t === 'input' ? !!sk[e.type] : t === 'textarea';
  }
  function Xd(e, t, a, n) {
    (tn ? (ln ? ln.push(n) : (ln = [n])) : (tn = n),
      (t = ir(t, 'onChange')),
      0 < t.length &&
        ((a = new ps('onChange', 'change', null, a, n)), e.push({ event: a, listeners: t })));
  }
  var ni = null,
    ii = null;
  function rk(e) {
    Nf(e, 0);
  }
  function gs(e) {
    var t = Fn(e);
    if (Ed(t)) return e;
  }
  function Vd(e, t) {
    if (e === 'change') return t;
  }
  var Qd = !1;
  if (Sl) {
    var ho;
    if (Sl) {
      var go = 'oninput' in document;
      if (!go) {
        var Kd = document.createElement('div');
        (Kd.setAttribute('oninput', 'return;'), (go = typeof Kd.oninput == 'function'));
      }
      ho = go;
    } else ho = !1;
    Qd = ho && (!document.documentMode || 9 < document.documentMode);
  }
  function Zd() {
    ni && (ni.detachEvent('onpropertychange', Jd), (ii = ni = null));
  }
  function Jd(e) {
    if (e.propertyName === 'value' && gs(ii)) {
      var t = [];
      (Xd(t, ii, e, so(e)), Bd(rk, t));
    }
  }
  function ok(e, t, a) {
    e === 'focusin'
      ? (Zd(), (ni = t), (ii = a), ni.attachEvent('onpropertychange', Jd))
      : e === 'focusout' && Zd();
  }
  function uk(e) {
    if (e === 'selectionchange' || e === 'keyup' || e === 'keydown') return gs(ii);
  }
  function ck(e, t) {
    if (e === 'click') return gs(t);
  }
  function dk(e, t) {
    if (e === 'input' || e === 'change') return gs(t);
  }
  function mk(e, t) {
    return (e === t && (e !== 0 || 1 / e === 1 / t)) || (e !== e && t !== t);
  }
  var Bt = typeof Object.is == 'function' ? Object.is : mk;
  function si(e, t) {
    if (Bt(e, t)) return !0;
    if (typeof e != 'object' || e === null || typeof t != 'object' || t === null) return !1;
    var a = Object.keys(e),
      n = Object.keys(t);
    if (a.length !== n.length) return !1;
    for (n = 0; n < a.length; n++) {
      var s = a[n];
      if (!Xa.call(t, s) || !Bt(e[s], t[s])) return !1;
    }
    return !0;
  }
  function Pd(e) {
    for (; e && e.firstChild; ) e = e.firstChild;
    return e;
  }
  function Fd(e, t) {
    var a = Pd(e);
    e = 0;
    for (var n; a; ) {
      if (a.nodeType === 3) {
        if (((n = e + a.textContent.length), e <= t && n >= t)) return { node: a, offset: t - e };
        e = n;
      }
      e: {
        for (; a; ) {
          if (a.nextSibling) {
            a = a.nextSibling;
            break e;
          }
          a = a.parentNode;
        }
        a = void 0;
      }
      a = Pd(a);
    }
  }
  function Wd(e, t) {
    return e && t
      ? e === t
        ? !0
        : e && e.nodeType === 3
          ? !1
          : t && t.nodeType === 3
            ? Wd(e, t.parentNode)
            : 'contains' in e
              ? e.contains(t)
              : e.compareDocumentPosition
                ? !!(e.compareDocumentPosition(t) & 16)
                : !1
      : !1;
  }
  function em(e) {
    e =
      e != null && e.ownerDocument != null && e.ownerDocument.defaultView != null
        ? e.ownerDocument.defaultView
        : window;
    for (var t = cs(e.document); t instanceof e.HTMLIFrameElement; ) {
      try {
        var a = typeof t.contentWindow.location.href == 'string';
      } catch {
        a = !1;
      }
      if (a) e = t.contentWindow;
      else break;
      t = cs(e.document);
    }
    return t;
  }
  function ko(e) {
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
  var _k = Sl && 'documentMode' in document && 11 >= document.documentMode,
    nn = null,
    vo = null,
    ri = null,
    yo = !1;
  function tm(e, t, a) {
    var n = a.window === a ? a.document : a.nodeType === 9 ? a : a.ownerDocument;
    yo ||
      nn == null ||
      nn !== cs(n) ||
      ((n = nn),
      'selectionStart' in n && ko(n)
        ? (n = { start: n.selectionStart, end: n.selectionEnd })
        : ((n = ((n.ownerDocument && n.ownerDocument.defaultView) || window).getSelection()),
          (n = {
            anchorNode: n.anchorNode,
            anchorOffset: n.anchorOffset,
            focusNode: n.focusNode,
            focusOffset: n.focusOffset,
          })),
      (ri && si(ri, n)) ||
        ((ri = n),
        (n = ir(vo, 'onSelect')),
        0 < n.length &&
          ((t = new ps('onSelect', 'select', null, t, a)),
          e.push({ event: t, listeners: n }),
          (t.target = nn))));
  }
  function wa(e, t) {
    var a = {};
    return (
      (a[e.toLowerCase()] = t.toLowerCase()),
      (a['Webkit' + e] = 'webkit' + t),
      (a['Moz' + e] = 'moz' + t),
      a
    );
  }
  var sn = {
      animationend: wa('Animation', 'AnimationEnd'),
      animationiteration: wa('Animation', 'AnimationIteration'),
      animationstart: wa('Animation', 'AnimationStart'),
      transitionrun: wa('Transition', 'TransitionRun'),
      transitionstart: wa('Transition', 'TransitionStart'),
      transitioncancel: wa('Transition', 'TransitionCancel'),
      transitionend: wa('Transition', 'TransitionEnd'),
    },
    bo = {},
    lm = {};
  Sl &&
    ((lm = document.createElement('div').style),
    'AnimationEvent' in window ||
      (delete sn.animationend.animation,
      delete sn.animationiteration.animation,
      delete sn.animationstart.animation),
    'TransitionEvent' in window || delete sn.transitionend.transition);
  function Ta(e) {
    if (bo[e]) return bo[e];
    if (!sn[e]) return e;
    var t = sn[e],
      a;
    for (a in t) if (t.hasOwnProperty(a) && a in lm) return (bo[e] = t[a]);
    return e;
  }
  var am = Ta('animationend'),
    nm = Ta('animationiteration'),
    im = Ta('animationstart'),
    fk = Ta('transitionrun'),
    pk = Ta('transitionstart'),
    hk = Ta('transitioncancel'),
    sm = Ta('transitionend'),
    rm = new Map(),
    xo =
      'abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel'.split(
        ' '
      );
  xo.push('scrollEnd');
  function tl(e, t) {
    (rm.set(e, t), xa(t, [e]));
  }
  var ks =
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
    rn = 0,
    So = 0;
  function vs() {
    for (var e = rn, t = (So = rn = 0); t < e; ) {
      var a = Yt[t];
      Yt[t++] = null;
      var n = Yt[t];
      Yt[t++] = null;
      var s = Yt[t];
      Yt[t++] = null;
      var u = Yt[t];
      if (((Yt[t++] = null), n !== null && s !== null)) {
        var m = n.pending;
        (m === null ? (s.next = s) : ((s.next = m.next), (m.next = s)), (n.pending = s));
      }
      u !== 0 && om(a, s, u);
    }
  }
  function ys(e, t, a, n) {
    ((Yt[rn++] = e),
      (Yt[rn++] = t),
      (Yt[rn++] = a),
      (Yt[rn++] = n),
      (So |= n),
      (e.lanes |= n),
      (e = e.alternate),
      e !== null && (e.lanes |= n));
  }
  function wo(e, t, a, n) {
    return (ys(e, t, a, n), bs(e));
  }
  function Ea(e, t) {
    return (ys(e, null, null, t), bs(e));
  }
  function om(e, t, a) {
    e.lanes |= a;
    var n = e.alternate;
    n !== null && (n.lanes |= a);
    for (var s = !1, u = e.return; u !== null; )
      ((u.childLanes |= a),
        (n = u.alternate),
        n !== null && (n.childLanes |= a),
        u.tag === 22 && ((e = u.stateNode), e === null || e._visibility & 1 || (s = !0)),
        (e = u),
        (u = u.return));
    return e.tag === 3
      ? ((u = e.stateNode),
        s &&
          t !== null &&
          ((s = 31 - qt(a)),
          (e = u.hiddenUpdates),
          (n = e[s]),
          n === null ? (e[s] = [t]) : n.push(t),
          (t.lane = a | 536870912)),
        u)
      : null;
  }
  function bs(e) {
    if (50 < ji) throw ((ji = 0), (Bu = null), Error(r(185)));
    for (var t = e.return; t !== null; ) ((e = t), (t = e.return));
    return e.tag === 3 ? e.stateNode : null;
  }
  var on = {};
  function gk(e, t, a, n) {
    ((this.tag = e),
      (this.key = a),
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
  function Mt(e, t, a, n) {
    return new gk(e, t, a, n);
  }
  function To(e) {
    return ((e = e.prototype), !(!e || !e.isReactComponent));
  }
  function wl(e, t) {
    var a = e.alternate;
    return (
      a === null
        ? ((a = Mt(e.tag, t, e.key, e.mode)),
          (a.elementType = e.elementType),
          (a.type = e.type),
          (a.stateNode = e.stateNode),
          (a.alternate = e),
          (e.alternate = a))
        : ((a.pendingProps = t),
          (a.type = e.type),
          (a.flags = 0),
          (a.subtreeFlags = 0),
          (a.deletions = null)),
      (a.flags = e.flags & 65011712),
      (a.childLanes = e.childLanes),
      (a.lanes = e.lanes),
      (a.child = e.child),
      (a.memoizedProps = e.memoizedProps),
      (a.memoizedState = e.memoizedState),
      (a.updateQueue = e.updateQueue),
      (t = e.dependencies),
      (a.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }),
      (a.sibling = e.sibling),
      (a.index = e.index),
      (a.ref = e.ref),
      (a.refCleanup = e.refCleanup),
      a
    );
  }
  function um(e, t) {
    e.flags &= 65011714;
    var a = e.alternate;
    return (
      a === null
        ? ((e.childLanes = 0),
          (e.lanes = t),
          (e.child = null),
          (e.subtreeFlags = 0),
          (e.memoizedProps = null),
          (e.memoizedState = null),
          (e.updateQueue = null),
          (e.dependencies = null),
          (e.stateNode = null))
        : ((e.childLanes = a.childLanes),
          (e.lanes = a.lanes),
          (e.child = a.child),
          (e.subtreeFlags = 0),
          (e.deletions = null),
          (e.memoizedProps = a.memoizedProps),
          (e.memoizedState = a.memoizedState),
          (e.updateQueue = a.updateQueue),
          (e.type = a.type),
          (t = a.dependencies),
          (e.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext })),
      e
    );
  }
  function xs(e, t, a, n, s, u) {
    var m = 0;
    if (((n = e), typeof e == 'function')) To(e) && (m = 1);
    else if (typeof e == 'string')
      m = xv(e, a, ee.current) ? 26 : e === 'html' || e === 'head' || e === 'body' ? 27 : 5;
    else
      e: switch (e) {
        case ie:
          return ((e = Mt(31, a, t, s)), (e.elementType = ie), (e.lanes = u), e);
        case x:
          return Ca(a.children, s, u, t);
        case S:
          ((m = 8), (s |= 24));
          break;
        case b:
          return ((e = Mt(12, a, t, s | 2)), (e.elementType = b), (e.lanes = u), e);
        case P:
          return ((e = Mt(13, a, t, s)), (e.elementType = P), (e.lanes = u), e);
        case G:
          return ((e = Mt(19, a, t, s)), (e.elementType = G), (e.lanes = u), e);
        default:
          if (typeof e == 'object' && e !== null)
            switch (e.$$typeof) {
              case A:
                m = 10;
                break e;
              case C:
                m = 9;
                break e;
              case F:
                m = 11;
                break e;
              case U:
                m = 14;
                break e;
              case ae:
                ((m = 16), (n = null));
                break e;
            }
          ((m = 29), (a = Error(r(130, e === null ? 'null' : typeof e, ''))), (n = null));
      }
    return ((t = Mt(m, a, t, s)), (t.elementType = e), (t.type = n), (t.lanes = u), t);
  }
  function Ca(e, t, a, n) {
    return ((e = Mt(7, e, n, t)), (e.lanes = a), e);
  }
  function Eo(e, t, a) {
    return ((e = Mt(6, e, null, t)), (e.lanes = a), e);
  }
  function cm(e) {
    var t = Mt(18, null, null, 0);
    return ((t.stateNode = e), t);
  }
  function Co(e, t, a) {
    return (
      (t = Mt(4, e.children !== null ? e.children : [], e.key, t)),
      (t.lanes = a),
      (t.stateNode = {
        containerInfo: e.containerInfo,
        pendingChildren: null,
        implementation: e.implementation,
      }),
      t
    );
  }
  var dm = new WeakMap();
  function Xt(e, t) {
    if (typeof e == 'object' && e !== null) {
      var a = dm.get(e);
      return a !== void 0 ? a : ((t = { value: e, source: t, stack: es(t) }), dm.set(e, t), t);
    }
    return { value: e, source: t, stack: es(t) };
  }
  var un = [],
    cn = 0,
    Ss = null,
    oi = 0,
    Vt = [],
    Qt = 0,
    Jl = null,
    fl = 1,
    pl = '';
  function Tl(e, t) {
    ((un[cn++] = oi), (un[cn++] = Ss), (Ss = e), (oi = t));
  }
  function mm(e, t, a) {
    ((Vt[Qt++] = fl), (Vt[Qt++] = pl), (Vt[Qt++] = Jl), (Jl = e));
    var n = fl;
    e = pl;
    var s = 32 - qt(n) - 1;
    ((n &= ~(1 << s)), (a += 1));
    var u = 32 - qt(t) + s;
    if (30 < u) {
      var m = s - (s % 5);
      ((u = (n & ((1 << m) - 1)).toString(32)),
        (n >>= m),
        (s -= m),
        (fl = (1 << (32 - qt(t) + s)) | (a << s) | n),
        (pl = u + e));
    } else ((fl = (1 << u) | (a << s) | n), (pl = e));
  }
  function No(e) {
    e.return !== null && (Tl(e, 1), mm(e, 1, 0));
  }
  function jo(e) {
    for (; e === Ss; ) ((Ss = un[--cn]), (un[cn] = null), (oi = un[--cn]), (un[cn] = null));
    for (; e === Jl; )
      ((Jl = Vt[--Qt]),
        (Vt[Qt] = null),
        (pl = Vt[--Qt]),
        (Vt[Qt] = null),
        (fl = Vt[--Qt]),
        (Vt[Qt] = null));
  }
  function _m(e, t) {
    ((Vt[Qt++] = fl), (Vt[Qt++] = pl), (Vt[Qt++] = Jl), (fl = t.id), (pl = t.overflow), (Jl = e));
  }
  var pt = null,
    $e = null,
    Ne = !1,
    Pl = null,
    Kt = !1,
    Ao = Error(r(519));
  function Fl(e) {
    var t = Error(
      r(418, 1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? 'text' : 'HTML', '')
    );
    throw (ui(Xt(t, e)), Ao);
  }
  function fm(e) {
    var t = e.stateNode,
      a = e.type,
      n = e.memoizedProps;
    switch (((t[ft] = e), (t[wt] = n), a)) {
      case 'dialog':
        (Te('cancel', t), Te('close', t));
        break;
      case 'iframe':
      case 'object':
      case 'embed':
        Te('load', t);
        break;
      case 'video':
      case 'audio':
        for (a = 0; a < Li.length; a++) Te(Li[a], t);
        break;
      case 'source':
        Te('error', t);
        break;
      case 'img':
      case 'image':
      case 'link':
        (Te('error', t), Te('load', t));
        break;
      case 'details':
        Te('toggle', t);
        break;
      case 'input':
        (Te('invalid', t),
          Cd(t, n.value, n.defaultValue, n.checked, n.defaultChecked, n.type, n.name, !0));
        break;
      case 'select':
        Te('invalid', t);
        break;
      case 'textarea':
        (Te('invalid', t), jd(t, n.value, n.defaultValue, n.children));
    }
    ((a = n.children),
      (typeof a != 'string' && typeof a != 'number' && typeof a != 'bigint') ||
      t.textContent === '' + a ||
      n.suppressHydrationWarning === !0 ||
      qf(t.textContent, a)
        ? (n.popover != null && (Te('beforetoggle', t), Te('toggle', t)),
          n.onScroll != null && Te('scroll', t),
          n.onScrollEnd != null && Te('scrollend', t),
          n.onClick != null && (t.onclick = xl),
          (t = !0))
        : (t = !1),
      t || Fl(e, !0));
  }
  function pm(e) {
    for (pt = e.return; pt; )
      switch (pt.tag) {
        case 5:
        case 31:
        case 13:
          Kt = !1;
          return;
        case 27:
        case 3:
          Kt = !0;
          return;
        default:
          pt = pt.return;
      }
  }
  function dn(e) {
    if (e !== pt) return !1;
    if (!Ne) return (pm(e), (Ne = !0), !1);
    var t = e.tag,
      a;
    if (
      ((a = t !== 3 && t !== 27) &&
        ((a = t === 5) &&
          ((a = e.type), (a = !(a !== 'form' && a !== 'button') || Ku(e.type, e.memoizedProps))),
        (a = !a)),
      a && $e && Fl(e),
      pm(e),
      t === 13)
    ) {
      if (((e = e.memoizedState), (e = e !== null ? e.dehydrated : null), !e)) throw Error(r(317));
      $e = Uf(e);
    } else if (t === 31) {
      if (((e = e.memoizedState), (e = e !== null ? e.dehydrated : null), !e)) throw Error(r(317));
      $e = Uf(e);
    } else
      t === 27
        ? ((t = $e), ma(e.type) ? ((e = Wu), (Wu = null), ($e = e)) : ($e = t))
        : ($e = pt ? Jt(e.stateNode.nextSibling) : null);
    return !0;
  }
  function Na() {
    (($e = pt = null), (Ne = !1));
  }
  function Lo() {
    var e = Pl;
    return (e !== null && (jt === null ? (jt = e) : jt.push.apply(jt, e), (Pl = null)), e);
  }
  function ui(e) {
    Pl === null ? (Pl = [e]) : Pl.push(e);
  }
  var qo = N(null),
    ja = null,
    El = null;
  function Wl(e, t, a) {
    (J(qo, t._currentValue), (t._currentValue = a));
  }
  function Cl(e) {
    ((e._currentValue = qo.current), H(qo));
  }
  function Bo(e, t, a) {
    for (; e !== null; ) {
      var n = e.alternate;
      if (
        ((e.childLanes & t) !== t
          ? ((e.childLanes |= t), n !== null && (n.childLanes |= t))
          : n !== null && (n.childLanes & t) !== t && (n.childLanes |= t),
        e === a)
      )
        break;
      e = e.return;
    }
  }
  function Mo(e, t, a, n) {
    var s = e.child;
    for (s !== null && (s.return = e); s !== null; ) {
      var u = s.dependencies;
      if (u !== null) {
        var m = s.child;
        u = u.firstContext;
        e: for (; u !== null; ) {
          var g = u;
          u = s;
          for (var w = 0; w < t.length; w++)
            if (g.context === t[w]) {
              ((u.lanes |= a),
                (g = u.alternate),
                g !== null && (g.lanes |= a),
                Bo(u.return, a, e),
                n || (m = null));
              break e;
            }
          u = g.next;
        }
      } else if (s.tag === 18) {
        if (((m = s.return), m === null)) throw Error(r(341));
        ((m.lanes |= a), (u = m.alternate), u !== null && (u.lanes |= a), Bo(m, a, e), (m = null));
      } else m = s.child;
      if (m !== null) m.return = s;
      else
        for (m = s; m !== null; ) {
          if (m === e) {
            m = null;
            break;
          }
          if (((s = m.sibling), s !== null)) {
            ((s.return = m.return), (m = s));
            break;
          }
          m = m.return;
        }
      s = m;
    }
  }
  function mn(e, t, a, n) {
    e = null;
    for (var s = t, u = !1; s !== null; ) {
      if (!u) {
        if ((s.flags & 524288) !== 0) u = !0;
        else if ((s.flags & 262144) !== 0) break;
      }
      if (s.tag === 10) {
        var m = s.alternate;
        if (m === null) throw Error(r(387));
        if (((m = m.memoizedProps), m !== null)) {
          var g = s.type;
          Bt(s.pendingProps.value, m.value) || (e !== null ? e.push(g) : (e = [g]));
        }
      } else if (s === be.current) {
        if (((m = s.alternate), m === null)) throw Error(r(387));
        m.memoizedState.memoizedState !== s.memoizedState.memoizedState &&
          (e !== null ? e.push(Ii) : (e = [Ii]));
      }
      s = s.return;
    }
    (e !== null && Mo(t, e, a, n), (t.flags |= 262144));
  }
  function ws(e) {
    for (e = e.firstContext; e !== null; ) {
      if (!Bt(e.context._currentValue, e.memoizedValue)) return !0;
      e = e.next;
    }
    return !1;
  }
  function Aa(e) {
    ((ja = e), (El = null), (e = e.dependencies), e !== null && (e.firstContext = null));
  }
  function ht(e) {
    return hm(ja, e);
  }
  function Ts(e, t) {
    return (ja === null && Aa(e), hm(e, t));
  }
  function hm(e, t) {
    var a = t._currentValue;
    if (((t = { context: t, memoizedValue: a, next: null }), El === null)) {
      if (e === null) throw Error(r(308));
      ((El = t), (e.dependencies = { lanes: 0, firstContext: t }), (e.flags |= 524288));
    } else El = El.next = t;
    return a;
  }
  var kk =
      typeof AbortController < 'u'
        ? AbortController
        : function () {
            var e = [],
              t = (this.signal = {
                aborted: !1,
                addEventListener: function (a, n) {
                  e.push(n);
                },
              });
            this.abort = function () {
              ((t.aborted = !0),
                e.forEach(function (a) {
                  return a();
                }));
            };
          },
    vk = l.unstable_scheduleCallback,
    yk = l.unstable_NormalPriority,
    nt = {
      $$typeof: A,
      Consumer: null,
      Provider: null,
      _currentValue: null,
      _currentValue2: null,
      _threadCount: 0,
    };
  function Oo() {
    return { controller: new kk(), data: new Map(), refCount: 0 };
  }
  function ci(e) {
    (e.refCount--,
      e.refCount === 0 &&
        vk(yk, function () {
          e.controller.abort();
        }));
  }
  var di = null,
    Io = 0,
    _n = 0,
    fn = null;
  function bk(e, t) {
    if (di === null) {
      var a = (di = []);
      ((Io = 0),
        (_n = zu()),
        (fn = {
          status: 'pending',
          value: void 0,
          then: function (n) {
            a.push(n);
          },
        }));
    }
    return (Io++, t.then(gm, gm), t);
  }
  function gm() {
    if (--Io === 0 && di !== null) {
      fn !== null && (fn.status = 'fulfilled');
      var e = di;
      ((di = null), (_n = 0), (fn = null));
      for (var t = 0; t < e.length; t++) (0, e[t])();
    }
  }
  function xk(e, t) {
    var a = [],
      n = {
        status: 'pending',
        value: null,
        reason: null,
        then: function (s) {
          a.push(s);
        },
      };
    return (
      e.then(
        function () {
          ((n.status = 'fulfilled'), (n.value = t));
          for (var s = 0; s < a.length; s++) (0, a[s])(t);
        },
        function (s) {
          for (n.status = 'rejected', n.reason = s, s = 0; s < a.length; s++) (0, a[s])(void 0);
        }
      ),
      n
    );
  }
  var km = L.S;
  L.S = function (e, t) {
    ((tf = yt()),
      typeof t == 'object' && t !== null && typeof t.then == 'function' && bk(e, t),
      km !== null && km(e, t));
  };
  var La = N(null);
  function Do() {
    var e = La.current;
    return e !== null ? e : Ue.pooledCache;
  }
  function Es(e, t) {
    t === null ? J(La, La.current) : J(La, t.pool);
  }
  function vm() {
    var e = Do();
    return e === null ? null : { parent: nt._currentValue, pool: e };
  }
  var pn = Error(r(460)),
    Ro = Error(r(474)),
    Cs = Error(r(542)),
    Ns = { then: function () {} };
  function ym(e) {
    return ((e = e.status), e === 'fulfilled' || e === 'rejected');
  }
  function bm(e, t, a) {
    switch (
      ((a = e[a]), a === void 0 ? e.push(t) : a !== t && (t.then(xl, xl), (t = a)), t.status)
    ) {
      case 'fulfilled':
        return t.value;
      case 'rejected':
        throw ((e = t.reason), Sm(e), e);
      default:
        if (typeof t.status == 'string') t.then(xl, xl);
        else {
          if (((e = Ue), e !== null && 100 < e.shellSuspendCounter)) throw Error(r(482));
          ((e = t),
            (e.status = 'pending'),
            e.then(
              function (n) {
                if (t.status === 'pending') {
                  var s = t;
                  ((s.status = 'fulfilled'), (s.value = n));
                }
              },
              function (n) {
                if (t.status === 'pending') {
                  var s = t;
                  ((s.status = 'rejected'), (s.reason = n));
                }
              }
            ));
        }
        switch (t.status) {
          case 'fulfilled':
            return t.value;
          case 'rejected':
            throw ((e = t.reason), Sm(e), e);
        }
        throw ((Ba = t), pn);
    }
  }
  function qa(e) {
    try {
      var t = e._init;
      return t(e._payload);
    } catch (a) {
      throw a !== null && typeof a == 'object' && typeof a.then == 'function' ? ((Ba = a), pn) : a;
    }
  }
  var Ba = null;
  function xm() {
    if (Ba === null) throw Error(r(459));
    var e = Ba;
    return ((Ba = null), e);
  }
  function Sm(e) {
    if (e === pn || e === Cs) throw Error(r(483));
  }
  var hn = null,
    mi = 0;
  function js(e) {
    var t = mi;
    return ((mi += 1), hn === null && (hn = []), bm(hn, e, t));
  }
  function _i(e, t) {
    ((t = t.props.ref), (e.ref = t !== void 0 ? t : null));
  }
  function As(e, t) {
    throw t.$$typeof === E
      ? Error(r(525))
      : ((e = Object.prototype.toString.call(t)),
        Error(
          r(
            31,
            e === '[object Object]' ? 'object with keys {' + Object.keys(t).join(', ') + '}' : e
          )
        ));
  }
  function wm(e) {
    function t(B, j) {
      if (e) {
        var I = B.deletions;
        I === null ? ((B.deletions = [j]), (B.flags |= 16)) : I.push(j);
      }
    }
    function a(B, j) {
      if (!e) return null;
      for (; j !== null; ) (t(B, j), (j = j.sibling));
      return null;
    }
    function n(B) {
      for (var j = new Map(); B !== null; )
        (B.key !== null ? j.set(B.key, B) : j.set(B.index, B), (B = B.sibling));
      return j;
    }
    function s(B, j) {
      return ((B = wl(B, j)), (B.index = 0), (B.sibling = null), B);
    }
    function u(B, j, I) {
      return (
        (B.index = I),
        e
          ? ((I = B.alternate),
            I !== null
              ? ((I = I.index), I < j ? ((B.flags |= 67108866), j) : I)
              : ((B.flags |= 67108866), j))
          : ((B.flags |= 1048576), j)
      );
    }
    function m(B) {
      return (e && B.alternate === null && (B.flags |= 67108866), B);
    }
    function g(B, j, I, X) {
      return j === null || j.tag !== 6
        ? ((j = Eo(I, B.mode, X)), (j.return = B), j)
        : ((j = s(j, I)), (j.return = B), j);
    }
    function w(B, j, I, X) {
      var de = I.type;
      return de === x
        ? Y(B, j, I.props.children, X, I.key)
        : j !== null &&
            (j.elementType === de ||
              (typeof de == 'object' && de !== null && de.$$typeof === ae && qa(de) === j.type))
          ? ((j = s(j, I.props)), _i(j, I), (j.return = B), j)
          : ((j = xs(I.type, I.key, I.props, null, B.mode, X)), _i(j, I), (j.return = B), j);
    }
    function D(B, j, I, X) {
      return j === null ||
        j.tag !== 4 ||
        j.stateNode.containerInfo !== I.containerInfo ||
        j.stateNode.implementation !== I.implementation
        ? ((j = Co(I, B.mode, X)), (j.return = B), j)
        : ((j = s(j, I.children || [])), (j.return = B), j);
    }
    function Y(B, j, I, X, de) {
      return j === null || j.tag !== 7
        ? ((j = Ca(I, B.mode, X, de)), (j.return = B), j)
        : ((j = s(j, I)), (j.return = B), j);
    }
    function V(B, j, I) {
      if ((typeof j == 'string' && j !== '') || typeof j == 'number' || typeof j == 'bigint')
        return ((j = Eo('' + j, B.mode, I)), (j.return = B), j);
      if (typeof j == 'object' && j !== null) {
        switch (j.$$typeof) {
          case M:
            return ((I = xs(j.type, j.key, j.props, null, B.mode, I)), _i(I, j), (I.return = B), I);
          case O:
            return ((j = Co(j, B.mode, I)), (j.return = B), j);
          case ae:
            return ((j = qa(j)), V(B, j, I));
        }
        if (ge(j) || he(j)) return ((j = Ca(j, B.mode, I, null)), (j.return = B), j);
        if (typeof j.then == 'function') return V(B, js(j), I);
        if (j.$$typeof === A) return V(B, Ts(B, j), I);
        As(B, j);
      }
      return null;
    }
    function R(B, j, I, X) {
      var de = j !== null ? j.key : null;
      if ((typeof I == 'string' && I !== '') || typeof I == 'number' || typeof I == 'bigint')
        return de !== null ? null : g(B, j, '' + I, X);
      if (typeof I == 'object' && I !== null) {
        switch (I.$$typeof) {
          case M:
            return I.key === de ? w(B, j, I, X) : null;
          case O:
            return I.key === de ? D(B, j, I, X) : null;
          case ae:
            return ((I = qa(I)), R(B, j, I, X));
        }
        if (ge(I) || he(I)) return de !== null ? null : Y(B, j, I, X, null);
        if (typeof I.then == 'function') return R(B, j, js(I), X);
        if (I.$$typeof === A) return R(B, j, Ts(B, I), X);
        As(B, I);
      }
      return null;
    }
    function z(B, j, I, X, de) {
      if ((typeof X == 'string' && X !== '') || typeof X == 'number' || typeof X == 'bigint')
        return ((B = B.get(I) || null), g(j, B, '' + X, de));
      if (typeof X == 'object' && X !== null) {
        switch (X.$$typeof) {
          case M:
            return ((B = B.get(X.key === null ? I : X.key) || null), w(j, B, X, de));
          case O:
            return ((B = B.get(X.key === null ? I : X.key) || null), D(j, B, X, de));
          case ae:
            return ((X = qa(X)), z(B, j, I, X, de));
        }
        if (ge(X) || he(X)) return ((B = B.get(I) || null), Y(j, B, X, de, null));
        if (typeof X.then == 'function') return z(B, j, I, js(X), de);
        if (X.$$typeof === A) return z(B, j, I, Ts(j, X), de);
        As(j, X);
      }
      return null;
    }
    function re(B, j, I, X) {
      for (
        var de = null, je = null, oe = j, xe = (j = 0), Ce = null;
        oe !== null && xe < I.length;
        xe++
      ) {
        oe.index > xe ? ((Ce = oe), (oe = null)) : (Ce = oe.sibling);
        var Ae = R(B, oe, I[xe], X);
        if (Ae === null) {
          oe === null && (oe = Ce);
          break;
        }
        (e && oe && Ae.alternate === null && t(B, oe),
          (j = u(Ae, j, xe)),
          je === null ? (de = Ae) : (je.sibling = Ae),
          (je = Ae),
          (oe = Ce));
      }
      if (xe === I.length) return (a(B, oe), Ne && Tl(B, xe), de);
      if (oe === null) {
        for (; xe < I.length; xe++)
          ((oe = V(B, I[xe], X)),
            oe !== null &&
              ((j = u(oe, j, xe)), je === null ? (de = oe) : (je.sibling = oe), (je = oe)));
        return (Ne && Tl(B, xe), de);
      }
      for (oe = n(oe); xe < I.length; xe++)
        ((Ce = z(oe, B, xe, I[xe], X)),
          Ce !== null &&
            (e && Ce.alternate !== null && oe.delete(Ce.key === null ? xe : Ce.key),
            (j = u(Ce, j, xe)),
            je === null ? (de = Ce) : (je.sibling = Ce),
            (je = Ce)));
      return (
        e &&
          oe.forEach(function (ga) {
            return t(B, ga);
          }),
        Ne && Tl(B, xe),
        de
      );
    }
    function fe(B, j, I, X) {
      if (I == null) throw Error(r(151));
      for (
        var de = null, je = null, oe = j, xe = (j = 0), Ce = null, Ae = I.next();
        oe !== null && !Ae.done;
        xe++, Ae = I.next()
      ) {
        oe.index > xe ? ((Ce = oe), (oe = null)) : (Ce = oe.sibling);
        var ga = R(B, oe, Ae.value, X);
        if (ga === null) {
          oe === null && (oe = Ce);
          break;
        }
        (e && oe && ga.alternate === null && t(B, oe),
          (j = u(ga, j, xe)),
          je === null ? (de = ga) : (je.sibling = ga),
          (je = ga),
          (oe = Ce));
      }
      if (Ae.done) return (a(B, oe), Ne && Tl(B, xe), de);
      if (oe === null) {
        for (; !Ae.done; xe++, Ae = I.next())
          ((Ae = V(B, Ae.value, X)),
            Ae !== null &&
              ((j = u(Ae, j, xe)), je === null ? (de = Ae) : (je.sibling = Ae), (je = Ae)));
        return (Ne && Tl(B, xe), de);
      }
      for (oe = n(oe); !Ae.done; xe++, Ae = I.next())
        ((Ae = z(oe, B, xe, Ae.value, X)),
          Ae !== null &&
            (e && Ae.alternate !== null && oe.delete(Ae.key === null ? xe : Ae.key),
            (j = u(Ae, j, xe)),
            je === null ? (de = Ae) : (je.sibling = Ae),
            (je = Ae)));
      return (
        e &&
          oe.forEach(function (Bv) {
            return t(B, Bv);
          }),
        Ne && Tl(B, xe),
        de
      );
    }
    function Re(B, j, I, X) {
      if (
        (typeof I == 'object' &&
          I !== null &&
          I.type === x &&
          I.key === null &&
          (I = I.props.children),
        typeof I == 'object' && I !== null)
      ) {
        switch (I.$$typeof) {
          case M:
            e: {
              for (var de = I.key; j !== null; ) {
                if (j.key === de) {
                  if (((de = I.type), de === x)) {
                    if (j.tag === 7) {
                      (a(B, j.sibling), (X = s(j, I.props.children)), (X.return = B), (B = X));
                      break e;
                    }
                  } else if (
                    j.elementType === de ||
                    (typeof de == 'object' &&
                      de !== null &&
                      de.$$typeof === ae &&
                      qa(de) === j.type)
                  ) {
                    (a(B, j.sibling), (X = s(j, I.props)), _i(X, I), (X.return = B), (B = X));
                    break e;
                  }
                  a(B, j);
                  break;
                } else t(B, j);
                j = j.sibling;
              }
              I.type === x
                ? ((X = Ca(I.props.children, B.mode, X, I.key)), (X.return = B), (B = X))
                : ((X = xs(I.type, I.key, I.props, null, B.mode, X)),
                  _i(X, I),
                  (X.return = B),
                  (B = X));
            }
            return m(B);
          case O:
            e: {
              for (de = I.key; j !== null; ) {
                if (j.key === de)
                  if (
                    j.tag === 4 &&
                    j.stateNode.containerInfo === I.containerInfo &&
                    j.stateNode.implementation === I.implementation
                  ) {
                    (a(B, j.sibling), (X = s(j, I.children || [])), (X.return = B), (B = X));
                    break e;
                  } else {
                    a(B, j);
                    break;
                  }
                else t(B, j);
                j = j.sibling;
              }
              ((X = Co(I, B.mode, X)), (X.return = B), (B = X));
            }
            return m(B);
          case ae:
            return ((I = qa(I)), Re(B, j, I, X));
        }
        if (ge(I)) return re(B, j, I, X);
        if (he(I)) {
          if (((de = he(I)), typeof de != 'function')) throw Error(r(150));
          return ((I = de.call(I)), fe(B, j, I, X));
        }
        if (typeof I.then == 'function') return Re(B, j, js(I), X);
        if (I.$$typeof === A) return Re(B, j, Ts(B, I), X);
        As(B, I);
      }
      return (typeof I == 'string' && I !== '') || typeof I == 'number' || typeof I == 'bigint'
        ? ((I = '' + I),
          j !== null && j.tag === 6
            ? (a(B, j.sibling), (X = s(j, I)), (X.return = B), (B = X))
            : (a(B, j), (X = Eo(I, B.mode, X)), (X.return = B), (B = X)),
          m(B))
        : a(B, j);
    }
    return function (B, j, I, X) {
      try {
        mi = 0;
        var de = Re(B, j, I, X);
        return ((hn = null), de);
      } catch (oe) {
        if (oe === pn || oe === Cs) throw oe;
        var je = Mt(29, oe, null, B.mode);
        return ((je.lanes = X), (je.return = B), je);
      } finally {
      }
    };
  }
  var Ma = wm(!0),
    Tm = wm(!1),
    ea = !1;
  function zo(e) {
    e.updateQueue = {
      baseState: e.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null,
    };
  }
  function Ho(e, t) {
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
  function ta(e) {
    return { lane: e, tag: 0, payload: null, callback: null, next: null };
  }
  function la(e, t, a) {
    var n = e.updateQueue;
    if (n === null) return null;
    if (((n = n.shared), (Le & 2) !== 0)) {
      var s = n.pending;
      return (
        s === null ? (t.next = t) : ((t.next = s.next), (s.next = t)),
        (n.pending = t),
        (t = bs(e)),
        om(e, null, a),
        t
      );
    }
    return (ys(e, n, t, a), bs(e));
  }
  function fi(e, t, a) {
    if (((t = t.updateQueue), t !== null && ((t = t.shared), (a & 4194048) !== 0))) {
      var n = t.lanes;
      ((n &= e.pendingLanes), (a |= n), (t.lanes = a), hd(e, a));
    }
  }
  function Uo(e, t) {
    var a = e.updateQueue,
      n = e.alternate;
    if (n !== null && ((n = n.updateQueue), a === n)) {
      var s = null,
        u = null;
      if (((a = a.firstBaseUpdate), a !== null)) {
        do {
          var m = { lane: a.lane, tag: a.tag, payload: a.payload, callback: null, next: null };
          (u === null ? (s = u = m) : (u = u.next = m), (a = a.next));
        } while (a !== null);
        u === null ? (s = u = t) : (u = u.next = t);
      } else s = u = t;
      ((a = {
        baseState: n.baseState,
        firstBaseUpdate: s,
        lastBaseUpdate: u,
        shared: n.shared,
        callbacks: n.callbacks,
      }),
        (e.updateQueue = a));
      return;
    }
    ((e = a.lastBaseUpdate),
      e === null ? (a.firstBaseUpdate = t) : (e.next = t),
      (a.lastBaseUpdate = t));
  }
  var Go = !1;
  function pi() {
    if (Go) {
      var e = fn;
      if (e !== null) throw e;
    }
  }
  function hi(e, t, a, n) {
    Go = !1;
    var s = e.updateQueue;
    ea = !1;
    var u = s.firstBaseUpdate,
      m = s.lastBaseUpdate,
      g = s.shared.pending;
    if (g !== null) {
      s.shared.pending = null;
      var w = g,
        D = w.next;
      ((w.next = null), m === null ? (u = D) : (m.next = D), (m = w));
      var Y = e.alternate;
      Y !== null &&
        ((Y = Y.updateQueue),
        (g = Y.lastBaseUpdate),
        g !== m && (g === null ? (Y.firstBaseUpdate = D) : (g.next = D), (Y.lastBaseUpdate = w)));
    }
    if (u !== null) {
      var V = s.baseState;
      ((m = 0), (Y = D = w = null), (g = u));
      do {
        var R = g.lane & -536870913,
          z = R !== g.lane;
        if (z ? (Ee & R) === R : (n & R) === R) {
          (R !== 0 && R === _n && (Go = !0),
            Y !== null &&
              (Y = Y.next =
                { lane: 0, tag: g.tag, payload: g.payload, callback: null, next: null }));
          e: {
            var re = e,
              fe = g;
            R = t;
            var Re = a;
            switch (fe.tag) {
              case 1:
                if (((re = fe.payload), typeof re == 'function')) {
                  V = re.call(Re, V, R);
                  break e;
                }
                V = re;
                break e;
              case 3:
                re.flags = (re.flags & -65537) | 128;
              case 0:
                if (
                  ((re = fe.payload),
                  (R = typeof re == 'function' ? re.call(Re, V, R) : re),
                  R == null)
                )
                  break e;
                V = y({}, V, R);
                break e;
              case 2:
                ea = !0;
            }
          }
          ((R = g.callback),
            R !== null &&
              ((e.flags |= 64),
              z && (e.flags |= 8192),
              (z = s.callbacks),
              z === null ? (s.callbacks = [R]) : z.push(R)));
        } else
          ((z = { lane: R, tag: g.tag, payload: g.payload, callback: g.callback, next: null }),
            Y === null ? ((D = Y = z), (w = V)) : (Y = Y.next = z),
            (m |= R));
        if (((g = g.next), g === null)) {
          if (((g = s.shared.pending), g === null)) break;
          ((z = g),
            (g = z.next),
            (z.next = null),
            (s.lastBaseUpdate = z),
            (s.shared.pending = null));
        }
      } while (!0);
      (Y === null && (w = V),
        (s.baseState = w),
        (s.firstBaseUpdate = D),
        (s.lastBaseUpdate = Y),
        u === null && (s.shared.lanes = 0),
        (ra |= m),
        (e.lanes = m),
        (e.memoizedState = V));
    }
  }
  function Em(e, t) {
    if (typeof e != 'function') throw Error(r(191, e));
    e.call(t);
  }
  function Cm(e, t) {
    var a = e.callbacks;
    if (a !== null) for (e.callbacks = null, e = 0; e < a.length; e++) Em(a[e], t);
  }
  var gn = N(null),
    Ls = N(0);
  function Nm(e, t) {
    ((e = Il), J(Ls, e), J(gn, t), (Il = e | t.baseLanes));
  }
  function $o() {
    (J(Ls, Il), J(gn, gn.current));
  }
  function Yo() {
    ((Il = Ls.current), H(gn), H(Ls));
  }
  var Ot = N(null),
    Zt = null;
  function aa(e) {
    var t = e.alternate;
    (J(lt, lt.current & 1),
      J(Ot, e),
      Zt === null && (t === null || gn.current !== null || t.memoizedState !== null) && (Zt = e));
  }
  function Xo(e) {
    (J(lt, lt.current), J(Ot, e), Zt === null && (Zt = e));
  }
  function jm(e) {
    e.tag === 22 ? (J(lt, lt.current), J(Ot, e), Zt === null && (Zt = e)) : na();
  }
  function na() {
    (J(lt, lt.current), J(Ot, Ot.current));
  }
  function It(e) {
    (H(Ot), Zt === e && (Zt = null), H(lt));
  }
  var lt = N(0);
  function qs(e) {
    for (var t = e; t !== null; ) {
      if (t.tag === 13) {
        var a = t.memoizedState;
        if (a !== null && ((a = a.dehydrated), a === null || Pu(a) || Fu(a))) return t;
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
  var Nl = 0,
    ye = null,
    Ie = null,
    it = null,
    Bs = !1,
    kn = !1,
    Oa = !1,
    Ms = 0,
    gi = 0,
    vn = null,
    Sk = 0;
  function Pe() {
    throw Error(r(321));
  }
  function Vo(e, t) {
    if (t === null) return !1;
    for (var a = 0; a < t.length && a < e.length; a++) if (!Bt(e[a], t[a])) return !1;
    return !0;
  }
  function Qo(e, t, a, n, s, u) {
    return (
      (Nl = u),
      (ye = t),
      (t.memoizedState = null),
      (t.updateQueue = null),
      (t.lanes = 0),
      (L.H = e === null || e.memoizedState === null ? m_ : ou),
      (Oa = !1),
      (u = a(n, s)),
      (Oa = !1),
      kn && (u = Lm(t, a, n, s)),
      Am(e),
      u
    );
  }
  function Am(e) {
    L.H = yi;
    var t = Ie !== null && Ie.next !== null;
    if (((Nl = 0), (it = Ie = ye = null), (Bs = !1), (gi = 0), (vn = null), t)) throw Error(r(300));
    e === null || st || ((e = e.dependencies), e !== null && ws(e) && (st = !0));
  }
  function Lm(e, t, a, n) {
    ye = e;
    var s = 0;
    do {
      if ((kn && (vn = null), (gi = 0), (kn = !1), 25 <= s)) throw Error(r(301));
      if (((s += 1), (it = Ie = null), e.updateQueue != null)) {
        var u = e.updateQueue;
        ((u.lastEffect = null),
          (u.events = null),
          (u.stores = null),
          u.memoCache != null && (u.memoCache.index = 0));
      }
      ((L.H = __), (u = t(a, n)));
    } while (kn);
    return u;
  }
  function wk() {
    var e = L.H,
      t = e.useState()[0];
    return (
      (t = typeof t.then == 'function' ? ki(t) : t),
      (e = e.useState()[0]),
      (Ie !== null ? Ie.memoizedState : null) !== e && (ye.flags |= 1024),
      t
    );
  }
  function Ko() {
    var e = Ms !== 0;
    return ((Ms = 0), e);
  }
  function Zo(e, t, a) {
    ((t.updateQueue = e.updateQueue), (t.flags &= -2053), (e.lanes &= ~a));
  }
  function Jo(e) {
    if (Bs) {
      for (e = e.memoizedState; e !== null; ) {
        var t = e.queue;
        (t !== null && (t.pending = null), (e = e.next));
      }
      Bs = !1;
    }
    ((Nl = 0), (it = Ie = ye = null), (kn = !1), (gi = Ms = 0), (vn = null));
  }
  function xt() {
    var e = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
    return (it === null ? (ye.memoizedState = it = e) : (it = it.next = e), it);
  }
  function at() {
    if (Ie === null) {
      var e = ye.alternate;
      e = e !== null ? e.memoizedState : null;
    } else e = Ie.next;
    var t = it === null ? ye.memoizedState : it.next;
    if (t !== null) ((it = t), (Ie = e));
    else {
      if (e === null) throw ye.alternate === null ? Error(r(467)) : Error(r(310));
      ((Ie = e),
        (e = {
          memoizedState: Ie.memoizedState,
          baseState: Ie.baseState,
          baseQueue: Ie.baseQueue,
          queue: Ie.queue,
          next: null,
        }),
        it === null ? (ye.memoizedState = it = e) : (it = it.next = e));
    }
    return it;
  }
  function Os() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function ki(e) {
    var t = gi;
    return (
      (gi += 1),
      vn === null && (vn = []),
      (e = bm(vn, e, t)),
      (t = ye),
      (it === null ? t.memoizedState : it.next) === null &&
        ((t = t.alternate), (L.H = t === null || t.memoizedState === null ? m_ : ou)),
      e
    );
  }
  function Is(e) {
    if (e !== null && typeof e == 'object') {
      if (typeof e.then == 'function') return ki(e);
      if (e.$$typeof === A) return ht(e);
    }
    throw Error(r(438, String(e)));
  }
  function Po(e) {
    var t = null,
      a = ye.updateQueue;
    if ((a !== null && (t = a.memoCache), t == null)) {
      var n = ye.alternate;
      n !== null &&
        ((n = n.updateQueue),
        n !== null &&
          ((n = n.memoCache),
          n != null &&
            (t = {
              data: n.data.map(function (s) {
                return s.slice();
              }),
              index: 0,
            })));
    }
    if (
      (t == null && (t = { data: [], index: 0 }),
      a === null && ((a = Os()), (ye.updateQueue = a)),
      (a.memoCache = t),
      (a = t.data[t.index]),
      a === void 0)
    )
      for (a = t.data[t.index] = Array(e), n = 0; n < e; n++) a[n] = le;
    return (t.index++, a);
  }
  function jl(e, t) {
    return typeof t == 'function' ? t(e) : t;
  }
  function Ds(e) {
    var t = at();
    return Fo(t, Ie, e);
  }
  function Fo(e, t, a) {
    var n = e.queue;
    if (n === null) throw Error(r(311));
    n.lastRenderedReducer = a;
    var s = e.baseQueue,
      u = n.pending;
    if (u !== null) {
      if (s !== null) {
        var m = s.next;
        ((s.next = u.next), (u.next = m));
      }
      ((t.baseQueue = s = u), (n.pending = null));
    }
    if (((u = e.baseState), s === null)) e.memoizedState = u;
    else {
      t = s.next;
      var g = (m = null),
        w = null,
        D = t,
        Y = !1;
      do {
        var V = D.lane & -536870913;
        if (V !== D.lane ? (Ee & V) === V : (Nl & V) === V) {
          var R = D.revertLane;
          if (R === 0)
            (w !== null &&
              (w = w.next =
                {
                  lane: 0,
                  revertLane: 0,
                  gesture: null,
                  action: D.action,
                  hasEagerState: D.hasEagerState,
                  eagerState: D.eagerState,
                  next: null,
                }),
              V === _n && (Y = !0));
          else if ((Nl & R) === R) {
            ((D = D.next), R === _n && (Y = !0));
            continue;
          } else
            ((V = {
              lane: 0,
              revertLane: D.revertLane,
              gesture: null,
              action: D.action,
              hasEagerState: D.hasEagerState,
              eagerState: D.eagerState,
              next: null,
            }),
              w === null ? ((g = w = V), (m = u)) : (w = w.next = V),
              (ye.lanes |= R),
              (ra |= R));
          ((V = D.action), Oa && a(u, V), (u = D.hasEagerState ? D.eagerState : a(u, V)));
        } else
          ((R = {
            lane: V,
            revertLane: D.revertLane,
            gesture: D.gesture,
            action: D.action,
            hasEagerState: D.hasEagerState,
            eagerState: D.eagerState,
            next: null,
          }),
            w === null ? ((g = w = R), (m = u)) : (w = w.next = R),
            (ye.lanes |= V),
            (ra |= V));
        D = D.next;
      } while (D !== null && D !== t);
      if (
        (w === null ? (m = u) : (w.next = g),
        !Bt(u, e.memoizedState) && ((st = !0), Y && ((a = fn), a !== null)))
      )
        throw a;
      ((e.memoizedState = u), (e.baseState = m), (e.baseQueue = w), (n.lastRenderedState = u));
    }
    return (s === null && (n.lanes = 0), [e.memoizedState, n.dispatch]);
  }
  function Wo(e) {
    var t = at(),
      a = t.queue;
    if (a === null) throw Error(r(311));
    a.lastRenderedReducer = e;
    var n = a.dispatch,
      s = a.pending,
      u = t.memoizedState;
    if (s !== null) {
      a.pending = null;
      var m = (s = s.next);
      do ((u = e(u, m.action)), (m = m.next));
      while (m !== s);
      (Bt(u, t.memoizedState) || (st = !0),
        (t.memoizedState = u),
        t.baseQueue === null && (t.baseState = u),
        (a.lastRenderedState = u));
    }
    return [u, n];
  }
  function qm(e, t, a) {
    var n = ye,
      s = at(),
      u = Ne;
    if (u) {
      if (a === void 0) throw Error(r(407));
      a = a();
    } else a = t();
    var m = !Bt((Ie || s).memoizedState, a);
    if (
      (m && ((s.memoizedState = a), (st = !0)),
      (s = s.queue),
      lu(Om.bind(null, n, s, e), [e]),
      s.getSnapshot !== t || m || (it !== null && it.memoizedState.tag & 1))
    ) {
      if (
        ((n.flags |= 2048),
        yn(9, { destroy: void 0 }, Mm.bind(null, n, s, a, t), null),
        Ue === null)
      )
        throw Error(r(349));
      u || (Nl & 127) !== 0 || Bm(n, t, a);
    }
    return a;
  }
  function Bm(e, t, a) {
    ((e.flags |= 16384),
      (e = { getSnapshot: t, value: a }),
      (t = ye.updateQueue),
      t === null
        ? ((t = Os()), (ye.updateQueue = t), (t.stores = [e]))
        : ((a = t.stores), a === null ? (t.stores = [e]) : a.push(e)));
  }
  function Mm(e, t, a, n) {
    ((t.value = a), (t.getSnapshot = n), Im(t) && Dm(e));
  }
  function Om(e, t, a) {
    return a(function () {
      Im(t) && Dm(e);
    });
  }
  function Im(e) {
    var t = e.getSnapshot;
    e = e.value;
    try {
      var a = t();
      return !Bt(e, a);
    } catch {
      return !0;
    }
  }
  function Dm(e) {
    var t = Ea(e, 2);
    t !== null && At(t, e, 2);
  }
  function eu(e) {
    var t = xt();
    if (typeof e == 'function') {
      var a = e;
      if (((e = a()), Oa)) {
        Ql(!0);
        try {
          a();
        } finally {
          Ql(!1);
        }
      }
    }
    return (
      (t.memoizedState = t.baseState = e),
      (t.queue = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: jl,
        lastRenderedState: e,
      }),
      t
    );
  }
  function Rm(e, t, a, n) {
    return ((e.baseState = a), Fo(e, Ie, typeof n == 'function' ? n : jl));
  }
  function Tk(e, t, a, n, s) {
    if (Hs(e)) throw Error(r(485));
    if (((e = t.action), e !== null)) {
      var u = {
        payload: s,
        action: e,
        next: null,
        isTransition: !0,
        status: 'pending',
        value: null,
        reason: null,
        listeners: [],
        then: function (m) {
          u.listeners.push(m);
        },
      };
      (L.T !== null ? a(!0) : (u.isTransition = !1),
        n(u),
        (a = t.pending),
        a === null
          ? ((u.next = t.pending = u), zm(t, u))
          : ((u.next = a.next), (t.pending = a.next = u)));
    }
  }
  function zm(e, t) {
    var a = t.action,
      n = t.payload,
      s = e.state;
    if (t.isTransition) {
      var u = L.T,
        m = {};
      L.T = m;
      try {
        var g = a(s, n),
          w = L.S;
        (w !== null && w(m, g), Hm(e, t, g));
      } catch (D) {
        tu(e, t, D);
      } finally {
        (u !== null && m.types !== null && (u.types = m.types), (L.T = u));
      }
    } else
      try {
        ((u = a(s, n)), Hm(e, t, u));
      } catch (D) {
        tu(e, t, D);
      }
  }
  function Hm(e, t, a) {
    a !== null && typeof a == 'object' && typeof a.then == 'function'
      ? a.then(
          function (n) {
            Um(e, t, n);
          },
          function (n) {
            return tu(e, t, n);
          }
        )
      : Um(e, t, a);
  }
  function Um(e, t, a) {
    ((t.status = 'fulfilled'),
      (t.value = a),
      Gm(t),
      (e.state = a),
      (t = e.pending),
      t !== null &&
        ((a = t.next), a === t ? (e.pending = null) : ((a = a.next), (t.next = a), zm(e, a))));
  }
  function tu(e, t, a) {
    var n = e.pending;
    if (((e.pending = null), n !== null)) {
      n = n.next;
      do ((t.status = 'rejected'), (t.reason = a), Gm(t), (t = t.next));
      while (t !== n);
    }
    e.action = null;
  }
  function Gm(e) {
    e = e.listeners;
    for (var t = 0; t < e.length; t++) (0, e[t])();
  }
  function $m(e, t) {
    return t;
  }
  function Ym(e, t) {
    if (Ne) {
      var a = Ue.formState;
      if (a !== null) {
        e: {
          var n = ye;
          if (Ne) {
            if ($e) {
              t: {
                for (var s = $e, u = Kt; s.nodeType !== 8; ) {
                  if (!u) {
                    s = null;
                    break t;
                  }
                  if (((s = Jt(s.nextSibling)), s === null)) {
                    s = null;
                    break t;
                  }
                }
                ((u = s.data), (s = u === 'F!' || u === 'F' ? s : null));
              }
              if (s) {
                (($e = Jt(s.nextSibling)), (n = s.data === 'F!'));
                break e;
              }
            }
            Fl(n);
          }
          n = !1;
        }
        n && (t = a[0]);
      }
    }
    return (
      (a = xt()),
      (a.memoizedState = a.baseState = t),
      (n = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: $m,
        lastRenderedState: t,
      }),
      (a.queue = n),
      (a = u_.bind(null, ye, n)),
      (n.dispatch = a),
      (n = eu(!1)),
      (u = ru.bind(null, ye, !1, n.queue)),
      (n = xt()),
      (s = { state: t, dispatch: null, action: e, pending: null }),
      (n.queue = s),
      (a = Tk.bind(null, ye, s, u, a)),
      (s.dispatch = a),
      (n.memoizedState = e),
      [t, a, !1]
    );
  }
  function Xm(e) {
    var t = at();
    return Vm(t, Ie, e);
  }
  function Vm(e, t, a) {
    if (
      ((t = Fo(e, t, $m)[0]),
      (e = Ds(jl)[0]),
      typeof t == 'object' && t !== null && typeof t.then == 'function')
    )
      try {
        var n = ki(t);
      } catch (m) {
        throw m === pn ? Cs : m;
      }
    else n = t;
    t = at();
    var s = t.queue,
      u = s.dispatch;
    return (
      a !== t.memoizedState &&
        ((ye.flags |= 2048), yn(9, { destroy: void 0 }, Ek.bind(null, s, a), null)),
      [n, u, e]
    );
  }
  function Ek(e, t) {
    e.action = t;
  }
  function Qm(e) {
    var t = at(),
      a = Ie;
    if (a !== null) return Vm(t, a, e);
    (at(), (t = t.memoizedState), (a = at()));
    var n = a.queue.dispatch;
    return ((a.memoizedState = e), [t, n, !1]);
  }
  function yn(e, t, a, n) {
    return (
      (e = { tag: e, create: a, deps: n, inst: t, next: null }),
      (t = ye.updateQueue),
      t === null && ((t = Os()), (ye.updateQueue = t)),
      (a = t.lastEffect),
      a === null
        ? (t.lastEffect = e.next = e)
        : ((n = a.next), (a.next = e), (e.next = n), (t.lastEffect = e)),
      e
    );
  }
  function Km() {
    return at().memoizedState;
  }
  function Rs(e, t, a, n) {
    var s = xt();
    ((ye.flags |= e),
      (s.memoizedState = yn(1 | t, { destroy: void 0 }, a, n === void 0 ? null : n)));
  }
  function zs(e, t, a, n) {
    var s = at();
    n = n === void 0 ? null : n;
    var u = s.memoizedState.inst;
    Ie !== null && n !== null && Vo(n, Ie.memoizedState.deps)
      ? (s.memoizedState = yn(t, u, a, n))
      : ((ye.flags |= e), (s.memoizedState = yn(1 | t, u, a, n)));
  }
  function Zm(e, t) {
    Rs(8390656, 8, e, t);
  }
  function lu(e, t) {
    zs(2048, 8, e, t);
  }
  function Ck(e) {
    ye.flags |= 4;
    var t = ye.updateQueue;
    if (t === null) ((t = Os()), (ye.updateQueue = t), (t.events = [e]));
    else {
      var a = t.events;
      a === null ? (t.events = [e]) : a.push(e);
    }
  }
  function Jm(e) {
    var t = at().memoizedState;
    return (
      Ck({ ref: t, nextImpl: e }),
      function () {
        if ((Le & 2) !== 0) throw Error(r(440));
        return t.impl.apply(void 0, arguments);
      }
    );
  }
  function Pm(e, t) {
    return zs(4, 2, e, t);
  }
  function Fm(e, t) {
    return zs(4, 4, e, t);
  }
  function Wm(e, t) {
    if (typeof t == 'function') {
      e = e();
      var a = t(e);
      return function () {
        typeof a == 'function' ? a() : t(null);
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
  function e_(e, t, a) {
    ((a = a != null ? a.concat([e]) : null), zs(4, 4, Wm.bind(null, t, e), a));
  }
  function au() {}
  function t_(e, t) {
    var a = at();
    t = t === void 0 ? null : t;
    var n = a.memoizedState;
    return t !== null && Vo(t, n[1]) ? n[0] : ((a.memoizedState = [e, t]), e);
  }
  function l_(e, t) {
    var a = at();
    t = t === void 0 ? null : t;
    var n = a.memoizedState;
    if (t !== null && Vo(t, n[1])) return n[0];
    if (((n = e()), Oa)) {
      Ql(!0);
      try {
        e();
      } finally {
        Ql(!1);
      }
    }
    return ((a.memoizedState = [n, t]), n);
  }
  function nu(e, t, a) {
    return a === void 0 || ((Nl & 1073741824) !== 0 && (Ee & 261930) === 0)
      ? (e.memoizedState = t)
      : ((e.memoizedState = a), (e = af()), (ye.lanes |= e), (ra |= e), a);
  }
  function a_(e, t, a, n) {
    return Bt(a, t)
      ? a
      : gn.current !== null
        ? ((e = nu(e, a, n)), Bt(e, t) || (st = !0), e)
        : (Nl & 42) === 0 || ((Nl & 1073741824) !== 0 && (Ee & 261930) === 0)
          ? ((st = !0), (e.memoizedState = a))
          : ((e = af()), (ye.lanes |= e), (ra |= e), t);
  }
  function n_(e, t, a, n, s) {
    var u = Q.p;
    Q.p = u !== 0 && 8 > u ? u : 8;
    var m = L.T,
      g = {};
    ((L.T = g), ru(e, !1, t, a));
    try {
      var w = s(),
        D = L.S;
      if (
        (D !== null && D(g, w), w !== null && typeof w == 'object' && typeof w.then == 'function')
      ) {
        var Y = xk(w, n);
        vi(e, t, Y, zt(e));
      } else vi(e, t, n, zt(e));
    } catch (V) {
      vi(e, t, { then: function () {}, status: 'rejected', reason: V }, zt());
    } finally {
      ((Q.p = u), m !== null && g.types !== null && (m.types = g.types), (L.T = m));
    }
  }
  function Nk() {}
  function iu(e, t, a, n) {
    if (e.tag !== 5) throw Error(r(476));
    var s = i_(e).queue;
    n_(
      e,
      s,
      t,
      $,
      a === null
        ? Nk
        : function () {
            return (s_(e), a(n));
          }
    );
  }
  function i_(e) {
    var t = e.memoizedState;
    if (t !== null) return t;
    t = {
      memoizedState: $,
      baseState: $,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: jl,
        lastRenderedState: $,
      },
      next: null,
    };
    var a = {};
    return (
      (t.next = {
        memoizedState: a,
        baseState: a,
        baseQueue: null,
        queue: {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: jl,
          lastRenderedState: a,
        },
        next: null,
      }),
      (e.memoizedState = t),
      (e = e.alternate),
      e !== null && (e.memoizedState = t),
      t
    );
  }
  function s_(e) {
    var t = i_(e);
    (t.next === null && (t = e.alternate.memoizedState), vi(e, t.next.queue, {}, zt()));
  }
  function su() {
    return ht(Ii);
  }
  function r_() {
    return at().memoizedState;
  }
  function o_() {
    return at().memoizedState;
  }
  function jk(e) {
    for (var t = e.return; t !== null; ) {
      switch (t.tag) {
        case 24:
        case 3:
          var a = zt();
          e = ta(a);
          var n = la(t, e, a);
          (n !== null && (At(n, t, a), fi(n, t, a)), (t = { cache: Oo() }), (e.payload = t));
          return;
      }
      t = t.return;
    }
  }
  function Ak(e, t, a) {
    var n = zt();
    ((a = {
      lane: n,
      revertLane: 0,
      gesture: null,
      action: a,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    }),
      Hs(e) ? c_(t, a) : ((a = wo(e, t, a, n)), a !== null && (At(a, e, n), d_(a, t, n))));
  }
  function u_(e, t, a) {
    var n = zt();
    vi(e, t, a, n);
  }
  function vi(e, t, a, n) {
    var s = {
      lane: n,
      revertLane: 0,
      gesture: null,
      action: a,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    };
    if (Hs(e)) c_(t, s);
    else {
      var u = e.alternate;
      if (
        e.lanes === 0 &&
        (u === null || u.lanes === 0) &&
        ((u = t.lastRenderedReducer), u !== null)
      )
        try {
          var m = t.lastRenderedState,
            g = u(m, a);
          if (((s.hasEagerState = !0), (s.eagerState = g), Bt(g, m)))
            return (ys(e, t, s, 0), Ue === null && vs(), !1);
        } catch {
        } finally {
        }
      if (((a = wo(e, t, s, n)), a !== null)) return (At(a, e, n), d_(a, t, n), !0);
    }
    return !1;
  }
  function ru(e, t, a, n) {
    if (
      ((n = {
        lane: 2,
        revertLane: zu(),
        gesture: null,
        action: n,
        hasEagerState: !1,
        eagerState: null,
        next: null,
      }),
      Hs(e))
    ) {
      if (t) throw Error(r(479));
    } else ((t = wo(e, a, n, 2)), t !== null && At(t, e, 2));
  }
  function Hs(e) {
    var t = e.alternate;
    return e === ye || (t !== null && t === ye);
  }
  function c_(e, t) {
    kn = Bs = !0;
    var a = e.pending;
    (a === null ? (t.next = t) : ((t.next = a.next), (a.next = t)), (e.pending = t));
  }
  function d_(e, t, a) {
    if ((a & 4194048) !== 0) {
      var n = t.lanes;
      ((n &= e.pendingLanes), (a |= n), (t.lanes = a), hd(e, a));
    }
  }
  var yi = {
    readContext: ht,
    use: Is,
    useCallback: Pe,
    useContext: Pe,
    useEffect: Pe,
    useImperativeHandle: Pe,
    useLayoutEffect: Pe,
    useInsertionEffect: Pe,
    useMemo: Pe,
    useReducer: Pe,
    useRef: Pe,
    useState: Pe,
    useDebugValue: Pe,
    useDeferredValue: Pe,
    useTransition: Pe,
    useSyncExternalStore: Pe,
    useId: Pe,
    useHostTransitionStatus: Pe,
    useFormState: Pe,
    useActionState: Pe,
    useOptimistic: Pe,
    useMemoCache: Pe,
    useCacheRefresh: Pe,
  };
  yi.useEffectEvent = Pe;
  var m_ = {
      readContext: ht,
      use: Is,
      useCallback: function (e, t) {
        return ((xt().memoizedState = [e, t === void 0 ? null : t]), e);
      },
      useContext: ht,
      useEffect: Zm,
      useImperativeHandle: function (e, t, a) {
        ((a = a != null ? a.concat([e]) : null), Rs(4194308, 4, Wm.bind(null, t, e), a));
      },
      useLayoutEffect: function (e, t) {
        return Rs(4194308, 4, e, t);
      },
      useInsertionEffect: function (e, t) {
        Rs(4, 2, e, t);
      },
      useMemo: function (e, t) {
        var a = xt();
        t = t === void 0 ? null : t;
        var n = e();
        if (Oa) {
          Ql(!0);
          try {
            e();
          } finally {
            Ql(!1);
          }
        }
        return ((a.memoizedState = [n, t]), n);
      },
      useReducer: function (e, t, a) {
        var n = xt();
        if (a !== void 0) {
          var s = a(t);
          if (Oa) {
            Ql(!0);
            try {
              a(t);
            } finally {
              Ql(!1);
            }
          }
        } else s = t;
        return (
          (n.memoizedState = n.baseState = s),
          (e = {
            pending: null,
            lanes: 0,
            dispatch: null,
            lastRenderedReducer: e,
            lastRenderedState: s,
          }),
          (n.queue = e),
          (e = e.dispatch = Ak.bind(null, ye, e)),
          [n.memoizedState, e]
        );
      },
      useRef: function (e) {
        var t = xt();
        return ((e = { current: e }), (t.memoizedState = e));
      },
      useState: function (e) {
        e = eu(e);
        var t = e.queue,
          a = u_.bind(null, ye, t);
        return ((t.dispatch = a), [e.memoizedState, a]);
      },
      useDebugValue: au,
      useDeferredValue: function (e, t) {
        var a = xt();
        return nu(a, e, t);
      },
      useTransition: function () {
        var e = eu(!1);
        return ((e = n_.bind(null, ye, e.queue, !0, !1)), (xt().memoizedState = e), [!1, e]);
      },
      useSyncExternalStore: function (e, t, a) {
        var n = ye,
          s = xt();
        if (Ne) {
          if (a === void 0) throw Error(r(407));
          a = a();
        } else {
          if (((a = t()), Ue === null)) throw Error(r(349));
          (Ee & 127) !== 0 || Bm(n, t, a);
        }
        s.memoizedState = a;
        var u = { value: a, getSnapshot: t };
        return (
          (s.queue = u),
          Zm(Om.bind(null, n, u, e), [e]),
          (n.flags |= 2048),
          yn(9, { destroy: void 0 }, Mm.bind(null, n, u, a, t), null),
          a
        );
      },
      useId: function () {
        var e = xt(),
          t = Ue.identifierPrefix;
        if (Ne) {
          var a = pl,
            n = fl;
          ((a = (n & ~(1 << (32 - qt(n) - 1))).toString(32) + a),
            (t = '_' + t + 'R_' + a),
            (a = Ms++),
            0 < a && (t += 'H' + a.toString(32)),
            (t += '_'));
        } else ((a = Sk++), (t = '_' + t + 'r_' + a.toString(32) + '_'));
        return (e.memoizedState = t);
      },
      useHostTransitionStatus: su,
      useFormState: Ym,
      useActionState: Ym,
      useOptimistic: function (e) {
        var t = xt();
        t.memoizedState = t.baseState = e;
        var a = {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: null,
          lastRenderedState: null,
        };
        return ((t.queue = a), (t = ru.bind(null, ye, !0, a)), (a.dispatch = t), [e, t]);
      },
      useMemoCache: Po,
      useCacheRefresh: function () {
        return (xt().memoizedState = jk.bind(null, ye));
      },
      useEffectEvent: function (e) {
        var t = xt(),
          a = { impl: e };
        return (
          (t.memoizedState = a),
          function () {
            if ((Le & 2) !== 0) throw Error(r(440));
            return a.impl.apply(void 0, arguments);
          }
        );
      },
    },
    ou = {
      readContext: ht,
      use: Is,
      useCallback: t_,
      useContext: ht,
      useEffect: lu,
      useImperativeHandle: e_,
      useInsertionEffect: Pm,
      useLayoutEffect: Fm,
      useMemo: l_,
      useReducer: Ds,
      useRef: Km,
      useState: function () {
        return Ds(jl);
      },
      useDebugValue: au,
      useDeferredValue: function (e, t) {
        var a = at();
        return a_(a, Ie.memoizedState, e, t);
      },
      useTransition: function () {
        var e = Ds(jl)[0],
          t = at().memoizedState;
        return [typeof e == 'boolean' ? e : ki(e), t];
      },
      useSyncExternalStore: qm,
      useId: r_,
      useHostTransitionStatus: su,
      useFormState: Xm,
      useActionState: Xm,
      useOptimistic: function (e, t) {
        var a = at();
        return Rm(a, Ie, e, t);
      },
      useMemoCache: Po,
      useCacheRefresh: o_,
    };
  ou.useEffectEvent = Jm;
  var __ = {
    readContext: ht,
    use: Is,
    useCallback: t_,
    useContext: ht,
    useEffect: lu,
    useImperativeHandle: e_,
    useInsertionEffect: Pm,
    useLayoutEffect: Fm,
    useMemo: l_,
    useReducer: Wo,
    useRef: Km,
    useState: function () {
      return Wo(jl);
    },
    useDebugValue: au,
    useDeferredValue: function (e, t) {
      var a = at();
      return Ie === null ? nu(a, e, t) : a_(a, Ie.memoizedState, e, t);
    },
    useTransition: function () {
      var e = Wo(jl)[0],
        t = at().memoizedState;
      return [typeof e == 'boolean' ? e : ki(e), t];
    },
    useSyncExternalStore: qm,
    useId: r_,
    useHostTransitionStatus: su,
    useFormState: Qm,
    useActionState: Qm,
    useOptimistic: function (e, t) {
      var a = at();
      return Ie !== null ? Rm(a, Ie, e, t) : ((a.baseState = e), [e, a.queue.dispatch]);
    },
    useMemoCache: Po,
    useCacheRefresh: o_,
  };
  __.useEffectEvent = Jm;
  function uu(e, t, a, n) {
    ((t = e.memoizedState),
      (a = a(n, t)),
      (a = a == null ? t : y({}, t, a)),
      (e.memoizedState = a),
      e.lanes === 0 && (e.updateQueue.baseState = a));
  }
  var cu = {
    enqueueSetState: function (e, t, a) {
      e = e._reactInternals;
      var n = zt(),
        s = ta(n);
      ((s.payload = t),
        a != null && (s.callback = a),
        (t = la(e, s, n)),
        t !== null && (At(t, e, n), fi(t, e, n)));
    },
    enqueueReplaceState: function (e, t, a) {
      e = e._reactInternals;
      var n = zt(),
        s = ta(n);
      ((s.tag = 1),
        (s.payload = t),
        a != null && (s.callback = a),
        (t = la(e, s, n)),
        t !== null && (At(t, e, n), fi(t, e, n)));
    },
    enqueueForceUpdate: function (e, t) {
      e = e._reactInternals;
      var a = zt(),
        n = ta(a);
      ((n.tag = 2),
        t != null && (n.callback = t),
        (t = la(e, n, a)),
        t !== null && (At(t, e, a), fi(t, e, a)));
    },
  };
  function f_(e, t, a, n, s, u, m) {
    return (
      (e = e.stateNode),
      typeof e.shouldComponentUpdate == 'function'
        ? e.shouldComponentUpdate(n, u, m)
        : t.prototype && t.prototype.isPureReactComponent
          ? !si(a, n) || !si(s, u)
          : !0
    );
  }
  function p_(e, t, a, n) {
    ((e = t.state),
      typeof t.componentWillReceiveProps == 'function' && t.componentWillReceiveProps(a, n),
      typeof t.UNSAFE_componentWillReceiveProps == 'function' &&
        t.UNSAFE_componentWillReceiveProps(a, n),
      t.state !== e && cu.enqueueReplaceState(t, t.state, null));
  }
  function Ia(e, t) {
    var a = t;
    if ('ref' in t) {
      a = {};
      for (var n in t) n !== 'ref' && (a[n] = t[n]);
    }
    if ((e = e.defaultProps)) {
      a === t && (a = y({}, a));
      for (var s in e) a[s] === void 0 && (a[s] = e[s]);
    }
    return a;
  }
  function h_(e) {
    ks(e);
  }
  function g_(e) {
    console.error(e);
  }
  function k_(e) {
    ks(e);
  }
  function Us(e, t) {
    try {
      var a = e.onUncaughtError;
      a(t.value, { componentStack: t.stack });
    } catch (n) {
      setTimeout(function () {
        throw n;
      });
    }
  }
  function v_(e, t, a) {
    try {
      var n = e.onCaughtError;
      n(a.value, { componentStack: a.stack, errorBoundary: t.tag === 1 ? t.stateNode : null });
    } catch (s) {
      setTimeout(function () {
        throw s;
      });
    }
  }
  function du(e, t, a) {
    return (
      (a = ta(a)),
      (a.tag = 3),
      (a.payload = { element: null }),
      (a.callback = function () {
        Us(e, t);
      }),
      a
    );
  }
  function y_(e) {
    return ((e = ta(e)), (e.tag = 3), e);
  }
  function b_(e, t, a, n) {
    var s = a.type.getDerivedStateFromError;
    if (typeof s == 'function') {
      var u = n.value;
      ((e.payload = function () {
        return s(u);
      }),
        (e.callback = function () {
          v_(t, a, n);
        }));
    }
    var m = a.stateNode;
    m !== null &&
      typeof m.componentDidCatch == 'function' &&
      (e.callback = function () {
        (v_(t, a, n),
          typeof s != 'function' && (oa === null ? (oa = new Set([this])) : oa.add(this)));
        var g = n.stack;
        this.componentDidCatch(n.value, { componentStack: g !== null ? g : '' });
      });
  }
  function Lk(e, t, a, n, s) {
    if (((a.flags |= 32768), n !== null && typeof n == 'object' && typeof n.then == 'function')) {
      if (((t = a.alternate), t !== null && mn(t, a, s, !0), (a = Ot.current), a !== null)) {
        switch (a.tag) {
          case 31:
          case 13:
            return (
              Zt === null ? Ws() : a.alternate === null && Fe === 0 && (Fe = 3),
              (a.flags &= -257),
              (a.flags |= 65536),
              (a.lanes = s),
              n === Ns
                ? (a.flags |= 16384)
                : ((t = a.updateQueue),
                  t === null ? (a.updateQueue = new Set([n])) : t.add(n),
                  Iu(e, n, s)),
              !1
            );
          case 22:
            return (
              (a.flags |= 65536),
              n === Ns
                ? (a.flags |= 16384)
                : ((t = a.updateQueue),
                  t === null
                    ? ((t = { transitions: null, markerInstances: null, retryQueue: new Set([n]) }),
                      (a.updateQueue = t))
                    : ((a = t.retryQueue), a === null ? (t.retryQueue = new Set([n])) : a.add(n)),
                  Iu(e, n, s)),
              !1
            );
        }
        throw Error(r(435, a.tag));
      }
      return (Iu(e, n, s), Ws(), !1);
    }
    if (Ne)
      return (
        (t = Ot.current),
        t !== null
          ? ((t.flags & 65536) === 0 && (t.flags |= 256),
            (t.flags |= 65536),
            (t.lanes = s),
            n !== Ao && ((e = Error(r(422), { cause: n })), ui(Xt(e, a))))
          : (n !== Ao && ((t = Error(r(423), { cause: n })), ui(Xt(t, a))),
            (e = e.current.alternate),
            (e.flags |= 65536),
            (s &= -s),
            (e.lanes |= s),
            (n = Xt(n, a)),
            (s = du(e.stateNode, n, s)),
            Uo(e, s),
            Fe !== 4 && (Fe = 2)),
        !1
      );
    var u = Error(r(520), { cause: n });
    if (((u = Xt(u, a)), Ni === null ? (Ni = [u]) : Ni.push(u), Fe !== 4 && (Fe = 2), t === null))
      return !0;
    ((n = Xt(n, a)), (a = t));
    do {
      switch (a.tag) {
        case 3:
          return (
            (a.flags |= 65536),
            (e = s & -s),
            (a.lanes |= e),
            (e = du(a.stateNode, n, e)),
            Uo(a, e),
            !1
          );
        case 1:
          if (
            ((t = a.type),
            (u = a.stateNode),
            (a.flags & 128) === 0 &&
              (typeof t.getDerivedStateFromError == 'function' ||
                (u !== null &&
                  typeof u.componentDidCatch == 'function' &&
                  (oa === null || !oa.has(u)))))
          )
            return (
              (a.flags |= 65536),
              (s &= -s),
              (a.lanes |= s),
              (s = y_(s)),
              b_(s, e, a, n),
              Uo(a, s),
              !1
            );
      }
      a = a.return;
    } while (a !== null);
    return !1;
  }
  var mu = Error(r(461)),
    st = !1;
  function gt(e, t, a, n) {
    t.child = e === null ? Tm(t, null, a, n) : Ma(t, e.child, a, n);
  }
  function x_(e, t, a, n, s) {
    a = a.render;
    var u = t.ref;
    if ('ref' in n) {
      var m = {};
      for (var g in n) g !== 'ref' && (m[g] = n[g]);
    } else m = n;
    return (
      Aa(t),
      (n = Qo(e, t, a, m, u, s)),
      (g = Ko()),
      e !== null && !st
        ? (Zo(e, t, s), Al(e, t, s))
        : (Ne && g && No(t), (t.flags |= 1), gt(e, t, n, s), t.child)
    );
  }
  function S_(e, t, a, n, s) {
    if (e === null) {
      var u = a.type;
      return typeof u == 'function' && !To(u) && u.defaultProps === void 0 && a.compare === null
        ? ((t.tag = 15), (t.type = u), w_(e, t, u, n, s))
        : ((e = xs(a.type, null, n, t, t.mode, s)), (e.ref = t.ref), (e.return = t), (t.child = e));
    }
    if (((u = e.child), !yu(e, s))) {
      var m = u.memoizedProps;
      if (((a = a.compare), (a = a !== null ? a : si), a(m, n) && e.ref === t.ref))
        return Al(e, t, s);
    }
    return ((t.flags |= 1), (e = wl(u, n)), (e.ref = t.ref), (e.return = t), (t.child = e));
  }
  function w_(e, t, a, n, s) {
    if (e !== null) {
      var u = e.memoizedProps;
      if (si(u, n) && e.ref === t.ref)
        if (((st = !1), (t.pendingProps = n = u), yu(e, s))) (e.flags & 131072) !== 0 && (st = !0);
        else return ((t.lanes = e.lanes), Al(e, t, s));
    }
    return _u(e, t, a, n, s);
  }
  function T_(e, t, a, n) {
    var s = n.children,
      u = e !== null ? e.memoizedState : null;
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
        if (((u = u !== null ? u.baseLanes | a : a), e !== null)) {
          for (n = t.child = e.child, s = 0; n !== null; )
            ((s = s | n.lanes | n.childLanes), (n = n.sibling));
          n = s & ~u;
        } else ((n = 0), (t.child = null));
        return E_(e, t, u, a, n);
      }
      if ((a & 536870912) !== 0)
        ((t.memoizedState = { baseLanes: 0, cachePool: null }),
          e !== null && Es(t, u !== null ? u.cachePool : null),
          u !== null ? Nm(t, u) : $o(),
          jm(t));
      else return ((n = t.lanes = 536870912), E_(e, t, u !== null ? u.baseLanes | a : a, a, n));
    } else
      u !== null
        ? (Es(t, u.cachePool), Nm(t, u), na(), (t.memoizedState = null))
        : (e !== null && Es(t, null), $o(), na());
    return (gt(e, t, s, a), t.child);
  }
  function bi(e, t) {
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
  function E_(e, t, a, n, s) {
    var u = Do();
    return (
      (u = u === null ? null : { parent: nt._currentValue, pool: u }),
      (t.memoizedState = { baseLanes: a, cachePool: u }),
      e !== null && Es(t, null),
      $o(),
      jm(t),
      e !== null && mn(e, t, n, !0),
      (t.childLanes = s),
      null
    );
  }
  function Gs(e, t) {
    return (
      (t = Ys({ mode: t.mode, children: t.children }, e.mode)),
      (t.ref = e.ref),
      (e.child = t),
      (t.return = e),
      t
    );
  }
  function C_(e, t, a) {
    return (
      Ma(t, e.child, null, a),
      (e = Gs(t, t.pendingProps)),
      (e.flags |= 2),
      It(t),
      (t.memoizedState = null),
      e
    );
  }
  function qk(e, t, a) {
    var n = t.pendingProps,
      s = (t.flags & 128) !== 0;
    if (((t.flags &= -129), e === null)) {
      if (Ne) {
        if (n.mode === 'hidden') return ((e = Gs(t, n)), (t.lanes = 536870912), bi(null, e));
        if (
          (Xo(t),
          (e = $e)
            ? ((e = Hf(e, Kt)),
              (e = e !== null && e.data === '&' ? e : null),
              e !== null &&
                ((t.memoizedState = {
                  dehydrated: e,
                  treeContext: Jl !== null ? { id: fl, overflow: pl } : null,
                  retryLane: 536870912,
                  hydrationErrors: null,
                }),
                (a = cm(e)),
                (a.return = t),
                (t.child = a),
                (pt = t),
                ($e = null)))
            : (e = null),
          e === null)
        )
          throw Fl(t);
        return ((t.lanes = 536870912), null);
      }
      return Gs(t, n);
    }
    var u = e.memoizedState;
    if (u !== null) {
      var m = u.dehydrated;
      if ((Xo(t), s))
        if (t.flags & 256) ((t.flags &= -257), (t = C_(e, t, a)));
        else if (t.memoizedState !== null) ((t.child = e.child), (t.flags |= 128), (t = null));
        else throw Error(r(558));
      else if ((st || mn(e, t, a, !1), (s = (a & e.childLanes) !== 0), st || s)) {
        if (((n = Ue), n !== null && ((m = gd(n, a)), m !== 0 && m !== u.retryLane)))
          throw ((u.retryLane = m), Ea(e, m), At(n, e, m), mu);
        (Ws(), (t = C_(e, t, a)));
      } else
        ((e = u.treeContext),
          ($e = Jt(m.nextSibling)),
          (pt = t),
          (Ne = !0),
          (Pl = null),
          (Kt = !1),
          e !== null && _m(t, e),
          (t = Gs(t, n)),
          (t.flags |= 4096));
      return t;
    }
    return (
      (e = wl(e.child, { mode: n.mode, children: n.children })),
      (e.ref = t.ref),
      (t.child = e),
      (e.return = t),
      e
    );
  }
  function $s(e, t) {
    var a = t.ref;
    if (a === null) e !== null && e.ref !== null && (t.flags |= 4194816);
    else {
      if (typeof a != 'function' && typeof a != 'object') throw Error(r(284));
      (e === null || e.ref !== a) && (t.flags |= 4194816);
    }
  }
  function _u(e, t, a, n, s) {
    return (
      Aa(t),
      (a = Qo(e, t, a, n, void 0, s)),
      (n = Ko()),
      e !== null && !st
        ? (Zo(e, t, s), Al(e, t, s))
        : (Ne && n && No(t), (t.flags |= 1), gt(e, t, a, s), t.child)
    );
  }
  function N_(e, t, a, n, s, u) {
    return (
      Aa(t),
      (t.updateQueue = null),
      (a = Lm(t, n, a, s)),
      Am(e),
      (n = Ko()),
      e !== null && !st
        ? (Zo(e, t, u), Al(e, t, u))
        : (Ne && n && No(t), (t.flags |= 1), gt(e, t, a, u), t.child)
    );
  }
  function j_(e, t, a, n, s) {
    if ((Aa(t), t.stateNode === null)) {
      var u = on,
        m = a.contextType;
      (typeof m == 'object' && m !== null && (u = ht(m)),
        (u = new a(n, u)),
        (t.memoizedState = u.state !== null && u.state !== void 0 ? u.state : null),
        (u.updater = cu),
        (t.stateNode = u),
        (u._reactInternals = t),
        (u = t.stateNode),
        (u.props = n),
        (u.state = t.memoizedState),
        (u.refs = {}),
        zo(t),
        (m = a.contextType),
        (u.context = typeof m == 'object' && m !== null ? ht(m) : on),
        (u.state = t.memoizedState),
        (m = a.getDerivedStateFromProps),
        typeof m == 'function' && (uu(t, a, m, n), (u.state = t.memoizedState)),
        typeof a.getDerivedStateFromProps == 'function' ||
          typeof u.getSnapshotBeforeUpdate == 'function' ||
          (typeof u.UNSAFE_componentWillMount != 'function' &&
            typeof u.componentWillMount != 'function') ||
          ((m = u.state),
          typeof u.componentWillMount == 'function' && u.componentWillMount(),
          typeof u.UNSAFE_componentWillMount == 'function' && u.UNSAFE_componentWillMount(),
          m !== u.state && cu.enqueueReplaceState(u, u.state, null),
          hi(t, n, u, s),
          pi(),
          (u.state = t.memoizedState)),
        typeof u.componentDidMount == 'function' && (t.flags |= 4194308),
        (n = !0));
    } else if (e === null) {
      u = t.stateNode;
      var g = t.memoizedProps,
        w = Ia(a, g);
      u.props = w;
      var D = u.context,
        Y = a.contextType;
      ((m = on), typeof Y == 'object' && Y !== null && (m = ht(Y)));
      var V = a.getDerivedStateFromProps;
      ((Y = typeof V == 'function' || typeof u.getSnapshotBeforeUpdate == 'function'),
        (g = t.pendingProps !== g),
        Y ||
          (typeof u.UNSAFE_componentWillReceiveProps != 'function' &&
            typeof u.componentWillReceiveProps != 'function') ||
          ((g || D !== m) && p_(t, u, n, m)),
        (ea = !1));
      var R = t.memoizedState;
      ((u.state = R),
        hi(t, n, u, s),
        pi(),
        (D = t.memoizedState),
        g || R !== D || ea
          ? (typeof V == 'function' && (uu(t, a, V, n), (D = t.memoizedState)),
            (w = ea || f_(t, a, w, n, R, D, m))
              ? (Y ||
                  (typeof u.UNSAFE_componentWillMount != 'function' &&
                    typeof u.componentWillMount != 'function') ||
                  (typeof u.componentWillMount == 'function' && u.componentWillMount(),
                  typeof u.UNSAFE_componentWillMount == 'function' &&
                    u.UNSAFE_componentWillMount()),
                typeof u.componentDidMount == 'function' && (t.flags |= 4194308))
              : (typeof u.componentDidMount == 'function' && (t.flags |= 4194308),
                (t.memoizedProps = n),
                (t.memoizedState = D)),
            (u.props = n),
            (u.state = D),
            (u.context = m),
            (n = w))
          : (typeof u.componentDidMount == 'function' && (t.flags |= 4194308), (n = !1)));
    } else {
      ((u = t.stateNode),
        Ho(e, t),
        (m = t.memoizedProps),
        (Y = Ia(a, m)),
        (u.props = Y),
        (V = t.pendingProps),
        (R = u.context),
        (D = a.contextType),
        (w = on),
        typeof D == 'object' && D !== null && (w = ht(D)),
        (g = a.getDerivedStateFromProps),
        (D = typeof g == 'function' || typeof u.getSnapshotBeforeUpdate == 'function') ||
          (typeof u.UNSAFE_componentWillReceiveProps != 'function' &&
            typeof u.componentWillReceiveProps != 'function') ||
          ((m !== V || R !== w) && p_(t, u, n, w)),
        (ea = !1),
        (R = t.memoizedState),
        (u.state = R),
        hi(t, n, u, s),
        pi());
      var z = t.memoizedState;
      m !== V || R !== z || ea || (e !== null && e.dependencies !== null && ws(e.dependencies))
        ? (typeof g == 'function' && (uu(t, a, g, n), (z = t.memoizedState)),
          (Y =
            ea ||
            f_(t, a, Y, n, R, z, w) ||
            (e !== null && e.dependencies !== null && ws(e.dependencies)))
            ? (D ||
                (typeof u.UNSAFE_componentWillUpdate != 'function' &&
                  typeof u.componentWillUpdate != 'function') ||
                (typeof u.componentWillUpdate == 'function' && u.componentWillUpdate(n, z, w),
                typeof u.UNSAFE_componentWillUpdate == 'function' &&
                  u.UNSAFE_componentWillUpdate(n, z, w)),
              typeof u.componentDidUpdate == 'function' && (t.flags |= 4),
              typeof u.getSnapshotBeforeUpdate == 'function' && (t.flags |= 1024))
            : (typeof u.componentDidUpdate != 'function' ||
                (m === e.memoizedProps && R === e.memoizedState) ||
                (t.flags |= 4),
              typeof u.getSnapshotBeforeUpdate != 'function' ||
                (m === e.memoizedProps && R === e.memoizedState) ||
                (t.flags |= 1024),
              (t.memoizedProps = n),
              (t.memoizedState = z)),
          (u.props = n),
          (u.state = z),
          (u.context = w),
          (n = Y))
        : (typeof u.componentDidUpdate != 'function' ||
            (m === e.memoizedProps && R === e.memoizedState) ||
            (t.flags |= 4),
          typeof u.getSnapshotBeforeUpdate != 'function' ||
            (m === e.memoizedProps && R === e.memoizedState) ||
            (t.flags |= 1024),
          (n = !1));
    }
    return (
      (u = n),
      $s(e, t),
      (n = (t.flags & 128) !== 0),
      u || n
        ? ((u = t.stateNode),
          (a = n && typeof a.getDerivedStateFromError != 'function' ? null : u.render()),
          (t.flags |= 1),
          e !== null && n
            ? ((t.child = Ma(t, e.child, null, s)), (t.child = Ma(t, null, a, s)))
            : gt(e, t, a, s),
          (t.memoizedState = u.state),
          (e = t.child))
        : (e = Al(e, t, s)),
      e
    );
  }
  function A_(e, t, a, n) {
    return (Na(), (t.flags |= 256), gt(e, t, a, n), t.child);
  }
  var fu = { dehydrated: null, treeContext: null, retryLane: 0, hydrationErrors: null };
  function pu(e) {
    return { baseLanes: e, cachePool: vm() };
  }
  function hu(e, t, a) {
    return ((e = e !== null ? e.childLanes & ~a : 0), t && (e |= Rt), e);
  }
  function L_(e, t, a) {
    var n = t.pendingProps,
      s = !1,
      u = (t.flags & 128) !== 0,
      m;
    if (
      ((m = u) || (m = e !== null && e.memoizedState === null ? !1 : (lt.current & 2) !== 0),
      m && ((s = !0), (t.flags &= -129)),
      (m = (t.flags & 32) !== 0),
      (t.flags &= -33),
      e === null)
    ) {
      if (Ne) {
        if (
          (s ? aa(t) : na(),
          (e = $e)
            ? ((e = Hf(e, Kt)),
              (e = e !== null && e.data !== '&' ? e : null),
              e !== null &&
                ((t.memoizedState = {
                  dehydrated: e,
                  treeContext: Jl !== null ? { id: fl, overflow: pl } : null,
                  retryLane: 536870912,
                  hydrationErrors: null,
                }),
                (a = cm(e)),
                (a.return = t),
                (t.child = a),
                (pt = t),
                ($e = null)))
            : (e = null),
          e === null)
        )
          throw Fl(t);
        return (Fu(e) ? (t.lanes = 32) : (t.lanes = 536870912), null);
      }
      var g = n.children;
      return (
        (n = n.fallback),
        s
          ? (na(),
            (s = t.mode),
            (g = Ys({ mode: 'hidden', children: g }, s)),
            (n = Ca(n, s, a, null)),
            (g.return = t),
            (n.return = t),
            (g.sibling = n),
            (t.child = g),
            (n = t.child),
            (n.memoizedState = pu(a)),
            (n.childLanes = hu(e, m, a)),
            (t.memoizedState = fu),
            bi(null, n))
          : (aa(t), gu(t, g))
      );
    }
    var w = e.memoizedState;
    if (w !== null && ((g = w.dehydrated), g !== null)) {
      if (u)
        t.flags & 256
          ? (aa(t), (t.flags &= -257), (t = ku(e, t, a)))
          : t.memoizedState !== null
            ? (na(), (t.child = e.child), (t.flags |= 128), (t = null))
            : (na(),
              (g = n.fallback),
              (s = t.mode),
              (n = Ys({ mode: 'visible', children: n.children }, s)),
              (g = Ca(g, s, a, null)),
              (g.flags |= 2),
              (n.return = t),
              (g.return = t),
              (n.sibling = g),
              (t.child = n),
              Ma(t, e.child, null, a),
              (n = t.child),
              (n.memoizedState = pu(a)),
              (n.childLanes = hu(e, m, a)),
              (t.memoizedState = fu),
              (t = bi(null, n)));
      else if ((aa(t), Fu(g))) {
        if (((m = g.nextSibling && g.nextSibling.dataset), m)) var D = m.dgst;
        ((m = D),
          (n = Error(r(419))),
          (n.stack = ''),
          (n.digest = m),
          ui({ value: n, source: null, stack: null }),
          (t = ku(e, t, a)));
      } else if ((st || mn(e, t, a, !1), (m = (a & e.childLanes) !== 0), st || m)) {
        if (((m = Ue), m !== null && ((n = gd(m, a)), n !== 0 && n !== w.retryLane)))
          throw ((w.retryLane = n), Ea(e, n), At(m, e, n), mu);
        (Pu(g) || Ws(), (t = ku(e, t, a)));
      } else
        Pu(g)
          ? ((t.flags |= 192), (t.child = e.child), (t = null))
          : ((e = w.treeContext),
            ($e = Jt(g.nextSibling)),
            (pt = t),
            (Ne = !0),
            (Pl = null),
            (Kt = !1),
            e !== null && _m(t, e),
            (t = gu(t, n.children)),
            (t.flags |= 4096));
      return t;
    }
    return s
      ? (na(),
        (g = n.fallback),
        (s = t.mode),
        (w = e.child),
        (D = w.sibling),
        (n = wl(w, { mode: 'hidden', children: n.children })),
        (n.subtreeFlags = w.subtreeFlags & 65011712),
        D !== null ? (g = wl(D, g)) : ((g = Ca(g, s, a, null)), (g.flags |= 2)),
        (g.return = t),
        (n.return = t),
        (n.sibling = g),
        (t.child = n),
        bi(null, n),
        (n = t.child),
        (g = e.child.memoizedState),
        g === null
          ? (g = pu(a))
          : ((s = g.cachePool),
            s !== null
              ? ((w = nt._currentValue), (s = s.parent !== w ? { parent: w, pool: w } : s))
              : (s = vm()),
            (g = { baseLanes: g.baseLanes | a, cachePool: s })),
        (n.memoizedState = g),
        (n.childLanes = hu(e, m, a)),
        (t.memoizedState = fu),
        bi(e.child, n))
      : (aa(t),
        (a = e.child),
        (e = a.sibling),
        (a = wl(a, { mode: 'visible', children: n.children })),
        (a.return = t),
        (a.sibling = null),
        e !== null &&
          ((m = t.deletions), m === null ? ((t.deletions = [e]), (t.flags |= 16)) : m.push(e)),
        (t.child = a),
        (t.memoizedState = null),
        a);
  }
  function gu(e, t) {
    return ((t = Ys({ mode: 'visible', children: t }, e.mode)), (t.return = e), (e.child = t));
  }
  function Ys(e, t) {
    return ((e = Mt(22, e, null, t)), (e.lanes = 0), e);
  }
  function ku(e, t, a) {
    return (
      Ma(t, e.child, null, a),
      (e = gu(t, t.pendingProps.children)),
      (e.flags |= 2),
      (t.memoizedState = null),
      e
    );
  }
  function q_(e, t, a) {
    e.lanes |= t;
    var n = e.alternate;
    (n !== null && (n.lanes |= t), Bo(e.return, t, a));
  }
  function vu(e, t, a, n, s, u) {
    var m = e.memoizedState;
    m === null
      ? (e.memoizedState = {
          isBackwards: t,
          rendering: null,
          renderingStartTime: 0,
          last: n,
          tail: a,
          tailMode: s,
          treeForkCount: u,
        })
      : ((m.isBackwards = t),
        (m.rendering = null),
        (m.renderingStartTime = 0),
        (m.last = n),
        (m.tail = a),
        (m.tailMode = s),
        (m.treeForkCount = u));
  }
  function B_(e, t, a) {
    var n = t.pendingProps,
      s = n.revealOrder,
      u = n.tail;
    n = n.children;
    var m = lt.current,
      g = (m & 2) !== 0;
    if (
      (g ? ((m = (m & 1) | 2), (t.flags |= 128)) : (m &= 1),
      J(lt, m),
      gt(e, t, n, a),
      (n = Ne ? oi : 0),
      !g && e !== null && (e.flags & 128) !== 0)
    )
      e: for (e = t.child; e !== null; ) {
        if (e.tag === 13) e.memoizedState !== null && q_(e, a, t);
        else if (e.tag === 19) q_(e, a, t);
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
    switch (s) {
      case 'forwards':
        for (a = t.child, s = null; a !== null; )
          ((e = a.alternate), e !== null && qs(e) === null && (s = a), (a = a.sibling));
        ((a = s),
          a === null ? ((s = t.child), (t.child = null)) : ((s = a.sibling), (a.sibling = null)),
          vu(t, !1, s, a, u, n));
        break;
      case 'backwards':
      case 'unstable_legacy-backwards':
        for (a = null, s = t.child, t.child = null; s !== null; ) {
          if (((e = s.alternate), e !== null && qs(e) === null)) {
            t.child = s;
            break;
          }
          ((e = s.sibling), (s.sibling = a), (a = s), (s = e));
        }
        vu(t, !0, a, null, u, n);
        break;
      case 'together':
        vu(t, !1, null, null, void 0, n);
        break;
      default:
        t.memoizedState = null;
    }
    return t.child;
  }
  function Al(e, t, a) {
    if (
      (e !== null && (t.dependencies = e.dependencies), (ra |= t.lanes), (a & t.childLanes) === 0)
    )
      if (e !== null) {
        if ((mn(e, t, a, !1), (a & t.childLanes) === 0)) return null;
      } else return null;
    if (e !== null && t.child !== e.child) throw Error(r(153));
    if (t.child !== null) {
      for (e = t.child, a = wl(e, e.pendingProps), t.child = a, a.return = t; e.sibling !== null; )
        ((e = e.sibling), (a = a.sibling = wl(e, e.pendingProps)), (a.return = t));
      a.sibling = null;
    }
    return t.child;
  }
  function yu(e, t) {
    return (e.lanes & t) !== 0 ? !0 : ((e = e.dependencies), !!(e !== null && ws(e)));
  }
  function Bk(e, t, a) {
    switch (t.tag) {
      case 3:
        (Je(t, t.stateNode.containerInfo), Wl(t, nt, e.memoizedState.cache), Na());
        break;
      case 27:
      case 5:
        ml(t);
        break;
      case 4:
        Je(t, t.stateNode.containerInfo);
        break;
      case 10:
        Wl(t, t.type, t.memoizedProps.value);
        break;
      case 31:
        if (t.memoizedState !== null) return ((t.flags |= 128), Xo(t), null);
        break;
      case 13:
        var n = t.memoizedState;
        if (n !== null)
          return n.dehydrated !== null
            ? (aa(t), (t.flags |= 128), null)
            : (a & t.child.childLanes) !== 0
              ? L_(e, t, a)
              : (aa(t), (e = Al(e, t, a)), e !== null ? e.sibling : null);
        aa(t);
        break;
      case 19:
        var s = (e.flags & 128) !== 0;
        if (
          ((n = (a & t.childLanes) !== 0),
          n || (mn(e, t, a, !1), (n = (a & t.childLanes) !== 0)),
          s)
        ) {
          if (n) return B_(e, t, a);
          t.flags |= 128;
        }
        if (
          ((s = t.memoizedState),
          s !== null && ((s.rendering = null), (s.tail = null), (s.lastEffect = null)),
          J(lt, lt.current),
          n)
        )
          break;
        return null;
      case 22:
        return ((t.lanes = 0), T_(e, t, a, t.pendingProps));
      case 24:
        Wl(t, nt, e.memoizedState.cache);
    }
    return Al(e, t, a);
  }
  function M_(e, t, a) {
    if (e !== null)
      if (e.memoizedProps !== t.pendingProps) st = !0;
      else {
        if (!yu(e, a) && (t.flags & 128) === 0) return ((st = !1), Bk(e, t, a));
        st = (e.flags & 131072) !== 0;
      }
    else ((st = !1), Ne && (t.flags & 1048576) !== 0 && mm(t, oi, t.index));
    switch (((t.lanes = 0), t.tag)) {
      case 16:
        e: {
          var n = t.pendingProps;
          if (((e = qa(t.elementType)), (t.type = e), typeof e == 'function'))
            To(e)
              ? ((n = Ia(e, n)), (t.tag = 1), (t = j_(null, t, e, n, a)))
              : ((t.tag = 0), (t = _u(null, t, e, n, a)));
          else {
            if (e != null) {
              var s = e.$$typeof;
              if (s === F) {
                ((t.tag = 11), (t = x_(null, t, e, n, a)));
                break e;
              } else if (s === U) {
                ((t.tag = 14), (t = S_(null, t, e, n, a)));
                break e;
              }
            }
            throw ((t = Se(e) || e), Error(r(306, t, '')));
          }
        }
        return t;
      case 0:
        return _u(e, t, t.type, t.pendingProps, a);
      case 1:
        return ((n = t.type), (s = Ia(n, t.pendingProps)), j_(e, t, n, s, a));
      case 3:
        e: {
          if ((Je(t, t.stateNode.containerInfo), e === null)) throw Error(r(387));
          n = t.pendingProps;
          var u = t.memoizedState;
          ((s = u.element), Ho(e, t), hi(t, n, null, a));
          var m = t.memoizedState;
          if (
            ((n = m.cache),
            Wl(t, nt, n),
            n !== u.cache && Mo(t, [nt], a, !0),
            pi(),
            (n = m.element),
            u.isDehydrated)
          )
            if (
              ((u = { element: n, isDehydrated: !1, cache: m.cache }),
              (t.updateQueue.baseState = u),
              (t.memoizedState = u),
              t.flags & 256)
            ) {
              t = A_(e, t, n, a);
              break e;
            } else if (n !== s) {
              ((s = Xt(Error(r(424)), t)), ui(s), (t = A_(e, t, n, a)));
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
                $e = Jt(e.firstChild),
                  pt = t,
                  Ne = !0,
                  Pl = null,
                  Kt = !0,
                  a = Tm(t, null, n, a),
                  t.child = a;
                a;
              )
                ((a.flags = (a.flags & -3) | 4096), (a = a.sibling));
            }
          else {
            if ((Na(), n === s)) {
              t = Al(e, t, a);
              break e;
            }
            gt(e, t, n, a);
          }
          t = t.child;
        }
        return t;
      case 26:
        return (
          $s(e, t),
          e === null
            ? (a = Vf(t.type, null, t.pendingProps, null))
              ? (t.memoizedState = a)
              : Ne ||
                ((a = t.type),
                (e = t.pendingProps),
                (n = sr(_e.current).createElement(a)),
                (n[ft] = t),
                (n[wt] = e),
                kt(n, a, e),
                ct(n),
                (t.stateNode = n))
            : (t.memoizedState = Vf(t.type, e.memoizedProps, t.pendingProps, e.memoizedState)),
          null
        );
      case 27:
        return (
          ml(t),
          e === null &&
            Ne &&
            ((n = t.stateNode = $f(t.type, t.pendingProps, _e.current)),
            (pt = t),
            (Kt = !0),
            (s = $e),
            ma(t.type) ? ((Wu = s), ($e = Jt(n.firstChild))) : ($e = s)),
          gt(e, t, t.pendingProps.children, a),
          $s(e, t),
          e === null && (t.flags |= 4194304),
          t.child
        );
      case 5:
        return (
          e === null &&
            Ne &&
            ((s = n = $e) &&
              ((n = uv(n, t.type, t.pendingProps, Kt)),
              n !== null
                ? ((t.stateNode = n), (pt = t), ($e = Jt(n.firstChild)), (Kt = !1), (s = !0))
                : (s = !1)),
            s || Fl(t)),
          ml(t),
          (s = t.type),
          (u = t.pendingProps),
          (m = e !== null ? e.memoizedProps : null),
          (n = u.children),
          Ku(s, u) ? (n = null) : m !== null && Ku(s, m) && (t.flags |= 32),
          t.memoizedState !== null && ((s = Qo(e, t, wk, null, null, a)), (Ii._currentValue = s)),
          $s(e, t),
          gt(e, t, n, a),
          t.child
        );
      case 6:
        return (
          e === null &&
            Ne &&
            ((e = a = $e) &&
              ((a = cv(a, t.pendingProps, Kt)),
              a !== null ? ((t.stateNode = a), (pt = t), ($e = null), (e = !0)) : (e = !1)),
            e || Fl(t)),
          null
        );
      case 13:
        return L_(e, t, a);
      case 4:
        return (
          Je(t, t.stateNode.containerInfo),
          (n = t.pendingProps),
          e === null ? (t.child = Ma(t, null, n, a)) : gt(e, t, n, a),
          t.child
        );
      case 11:
        return x_(e, t, t.type, t.pendingProps, a);
      case 7:
        return (gt(e, t, t.pendingProps, a), t.child);
      case 8:
        return (gt(e, t, t.pendingProps.children, a), t.child);
      case 12:
        return (gt(e, t, t.pendingProps.children, a), t.child);
      case 10:
        return ((n = t.pendingProps), Wl(t, t.type, n.value), gt(e, t, n.children, a), t.child);
      case 9:
        return (
          (s = t.type._context),
          (n = t.pendingProps.children),
          Aa(t),
          (s = ht(s)),
          (n = n(s)),
          (t.flags |= 1),
          gt(e, t, n, a),
          t.child
        );
      case 14:
        return S_(e, t, t.type, t.pendingProps, a);
      case 15:
        return w_(e, t, t.type, t.pendingProps, a);
      case 19:
        return B_(e, t, a);
      case 31:
        return qk(e, t, a);
      case 22:
        return T_(e, t, a, t.pendingProps);
      case 24:
        return (
          Aa(t),
          (n = ht(nt)),
          e === null
            ? ((s = Do()),
              s === null &&
                ((s = Ue),
                (u = Oo()),
                (s.pooledCache = u),
                u.refCount++,
                u !== null && (s.pooledCacheLanes |= a),
                (s = u)),
              (t.memoizedState = { parent: n, cache: s }),
              zo(t),
              Wl(t, nt, s))
            : ((e.lanes & a) !== 0 && (Ho(e, t), hi(t, null, null, a), pi()),
              (s = e.memoizedState),
              (u = t.memoizedState),
              s.parent !== n
                ? ((s = { parent: n, cache: n }),
                  (t.memoizedState = s),
                  t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = s),
                  Wl(t, nt, n))
                : ((n = u.cache), Wl(t, nt, n), n !== s.cache && Mo(t, [nt], a, !0))),
          gt(e, t, t.pendingProps.children, a),
          t.child
        );
      case 29:
        throw t.pendingProps;
    }
    throw Error(r(156, t.tag));
  }
  function Ll(e) {
    e.flags |= 4;
  }
  function bu(e, t, a, n, s) {
    if (((t = (e.mode & 32) !== 0) && (t = !1), t)) {
      if (((e.flags |= 16777216), (s & 335544128) === s))
        if (e.stateNode.complete) e.flags |= 8192;
        else if (of()) e.flags |= 8192;
        else throw ((Ba = Ns), Ro);
    } else e.flags &= -16777217;
  }
  function O_(e, t) {
    if (t.type !== 'stylesheet' || (t.state.loading & 4) !== 0) e.flags &= -16777217;
    else if (((e.flags |= 16777216), !Pf(t)))
      if (of()) e.flags |= 8192;
      else throw ((Ba = Ns), Ro);
  }
  function Xs(e, t) {
    (t !== null && (e.flags |= 4),
      e.flags & 16384 && ((t = e.tag !== 22 ? fd() : 536870912), (e.lanes |= t), (wn |= t)));
  }
  function xi(e, t) {
    if (!Ne)
      switch (e.tailMode) {
        case 'hidden':
          t = e.tail;
          for (var a = null; t !== null; ) (t.alternate !== null && (a = t), (t = t.sibling));
          a === null ? (e.tail = null) : (a.sibling = null);
          break;
        case 'collapsed':
          a = e.tail;
          for (var n = null; a !== null; ) (a.alternate !== null && (n = a), (a = a.sibling));
          n === null
            ? t || e.tail === null
              ? (e.tail = null)
              : (e.tail.sibling = null)
            : (n.sibling = null);
      }
  }
  function Ye(e) {
    var t = e.alternate !== null && e.alternate.child === e.child,
      a = 0,
      n = 0;
    if (t)
      for (var s = e.child; s !== null; )
        ((a |= s.lanes | s.childLanes),
          (n |= s.subtreeFlags & 65011712),
          (n |= s.flags & 65011712),
          (s.return = e),
          (s = s.sibling));
    else
      for (s = e.child; s !== null; )
        ((a |= s.lanes | s.childLanes),
          (n |= s.subtreeFlags),
          (n |= s.flags),
          (s.return = e),
          (s = s.sibling));
    return ((e.subtreeFlags |= n), (e.childLanes = a), t);
  }
  function Mk(e, t, a) {
    var n = t.pendingProps;
    switch ((jo(t), t.tag)) {
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return (Ye(t), null);
      case 1:
        return (Ye(t), null);
      case 3:
        return (
          (a = t.stateNode),
          (n = null),
          e !== null && (n = e.memoizedState.cache),
          t.memoizedState.cache !== n && (t.flags |= 2048),
          Cl(nt),
          Ge(),
          a.pendingContext && ((a.context = a.pendingContext), (a.pendingContext = null)),
          (e === null || e.child === null) &&
            (dn(t)
              ? Ll(t)
              : e === null ||
                (e.memoizedState.isDehydrated && (t.flags & 256) === 0) ||
                ((t.flags |= 1024), Lo())),
          Ye(t),
          null
        );
      case 26:
        var s = t.type,
          u = t.memoizedState;
        return (
          e === null
            ? (Ll(t), u !== null ? (Ye(t), O_(t, u)) : (Ye(t), bu(t, s, null, n, a)))
            : u
              ? u !== e.memoizedState
                ? (Ll(t), Ye(t), O_(t, u))
                : (Ye(t), (t.flags &= -16777217))
              : ((e = e.memoizedProps), e !== n && Ll(t), Ye(t), bu(t, s, e, n, a)),
          null
        );
      case 27:
        if ((Ga(t), (a = _e.current), (s = t.type), e !== null && t.stateNode != null))
          e.memoizedProps !== n && Ll(t);
        else {
          if (!n) {
            if (t.stateNode === null) throw Error(r(166));
            return (Ye(t), null);
          }
          ((e = ee.current), dn(t) ? fm(t) : ((e = $f(s, n, a)), (t.stateNode = e), Ll(t)));
        }
        return (Ye(t), null);
      case 5:
        if ((Ga(t), (s = t.type), e !== null && t.stateNode != null))
          e.memoizedProps !== n && Ll(t);
        else {
          if (!n) {
            if (t.stateNode === null) throw Error(r(166));
            return (Ye(t), null);
          }
          if (((u = ee.current), dn(t))) fm(t);
          else {
            var m = sr(_e.current);
            switch (u) {
              case 1:
                u = m.createElementNS('http://www.w3.org/2000/svg', s);
                break;
              case 2:
                u = m.createElementNS('http://www.w3.org/1998/Math/MathML', s);
                break;
              default:
                switch (s) {
                  case 'svg':
                    u = m.createElementNS('http://www.w3.org/2000/svg', s);
                    break;
                  case 'math':
                    u = m.createElementNS('http://www.w3.org/1998/Math/MathML', s);
                    break;
                  case 'script':
                    ((u = m.createElement('div')),
                      (u.innerHTML = '<script><\/script>'),
                      (u = u.removeChild(u.firstChild)));
                    break;
                  case 'select':
                    ((u =
                      typeof n.is == 'string'
                        ? m.createElement('select', { is: n.is })
                        : m.createElement('select')),
                      n.multiple ? (u.multiple = !0) : n.size && (u.size = n.size));
                    break;
                  default:
                    u =
                      typeof n.is == 'string'
                        ? m.createElement(s, { is: n.is })
                        : m.createElement(s);
                }
            }
            ((u[ft] = t), (u[wt] = n));
            e: for (m = t.child; m !== null; ) {
              if (m.tag === 5 || m.tag === 6) u.appendChild(m.stateNode);
              else if (m.tag !== 4 && m.tag !== 27 && m.child !== null) {
                ((m.child.return = m), (m = m.child));
                continue;
              }
              if (m === t) break e;
              for (; m.sibling === null; ) {
                if (m.return === null || m.return === t) break e;
                m = m.return;
              }
              ((m.sibling.return = m.return), (m = m.sibling));
            }
            t.stateNode = u;
            e: switch ((kt(u, s, n), s)) {
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
            n && Ll(t);
          }
        }
        return (Ye(t), bu(t, t.type, e === null ? null : e.memoizedProps, t.pendingProps, a), null);
      case 6:
        if (e && t.stateNode != null) e.memoizedProps !== n && Ll(t);
        else {
          if (typeof n != 'string' && t.stateNode === null) throw Error(r(166));
          if (((e = _e.current), dn(t))) {
            if (((e = t.stateNode), (a = t.memoizedProps), (n = null), (s = pt), s !== null))
              switch (s.tag) {
                case 27:
                case 5:
                  n = s.memoizedProps;
              }
            ((e[ft] = t),
              (e = !!(
                e.nodeValue === a ||
                (n !== null && n.suppressHydrationWarning === !0) ||
                qf(e.nodeValue, a)
              )),
              e || Fl(t, !0));
          } else ((e = sr(e).createTextNode(n)), (e[ft] = t), (t.stateNode = e));
        }
        return (Ye(t), null);
      case 31:
        if (((a = t.memoizedState), e === null || e.memoizedState !== null)) {
          if (((n = dn(t)), a !== null)) {
            if (e === null) {
              if (!n) throw Error(r(318));
              if (((e = t.memoizedState), (e = e !== null ? e.dehydrated : null), !e))
                throw Error(r(557));
              e[ft] = t;
            } else (Na(), (t.flags & 128) === 0 && (t.memoizedState = null), (t.flags |= 4));
            (Ye(t), (e = !1));
          } else
            ((a = Lo()),
              e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = a),
              (e = !0));
          if (!e) return t.flags & 256 ? (It(t), t) : (It(t), null);
          if ((t.flags & 128) !== 0) throw Error(r(558));
        }
        return (Ye(t), null);
      case 13:
        if (
          ((n = t.memoizedState),
          e === null || (e.memoizedState !== null && e.memoizedState.dehydrated !== null))
        ) {
          if (((s = dn(t)), n !== null && n.dehydrated !== null)) {
            if (e === null) {
              if (!s) throw Error(r(318));
              if (((s = t.memoizedState), (s = s !== null ? s.dehydrated : null), !s))
                throw Error(r(317));
              s[ft] = t;
            } else (Na(), (t.flags & 128) === 0 && (t.memoizedState = null), (t.flags |= 4));
            (Ye(t), (s = !1));
          } else
            ((s = Lo()),
              e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = s),
              (s = !0));
          if (!s) return t.flags & 256 ? (It(t), t) : (It(t), null);
        }
        return (
          It(t),
          (t.flags & 128) !== 0
            ? ((t.lanes = a), t)
            : ((a = n !== null),
              (e = e !== null && e.memoizedState !== null),
              a &&
                ((n = t.child),
                (s = null),
                n.alternate !== null &&
                  n.alternate.memoizedState !== null &&
                  n.alternate.memoizedState.cachePool !== null &&
                  (s = n.alternate.memoizedState.cachePool.pool),
                (u = null),
                n.memoizedState !== null &&
                  n.memoizedState.cachePool !== null &&
                  (u = n.memoizedState.cachePool.pool),
                u !== s && (n.flags |= 2048)),
              a !== e && a && (t.child.flags |= 8192),
              Xs(t, t.updateQueue),
              Ye(t),
              null)
        );
      case 4:
        return (Ge(), e === null && $u(t.stateNode.containerInfo), Ye(t), null);
      case 10:
        return (Cl(t.type), Ye(t), null);
      case 19:
        if ((H(lt), (n = t.memoizedState), n === null)) return (Ye(t), null);
        if (((s = (t.flags & 128) !== 0), (u = n.rendering), u === null))
          if (s) xi(n, !1);
          else {
            if (Fe !== 0 || (e !== null && (e.flags & 128) !== 0))
              for (e = t.child; e !== null; ) {
                if (((u = qs(e)), u !== null)) {
                  for (
                    t.flags |= 128,
                      xi(n, !1),
                      e = u.updateQueue,
                      t.updateQueue = e,
                      Xs(t, e),
                      t.subtreeFlags = 0,
                      e = a,
                      a = t.child;
                    a !== null;
                  )
                    (um(a, e), (a = a.sibling));
                  return (J(lt, (lt.current & 1) | 2), Ne && Tl(t, n.treeForkCount), t.child);
                }
                e = e.sibling;
              }
            n.tail !== null &&
              yt() > Js &&
              ((t.flags |= 128), (s = !0), xi(n, !1), (t.lanes = 4194304));
          }
        else {
          if (!s)
            if (((e = qs(u)), e !== null)) {
              if (
                ((t.flags |= 128),
                (s = !0),
                (e = e.updateQueue),
                (t.updateQueue = e),
                Xs(t, e),
                xi(n, !0),
                n.tail === null && n.tailMode === 'hidden' && !u.alternate && !Ne)
              )
                return (Ye(t), null);
            } else
              2 * yt() - n.renderingStartTime > Js &&
                a !== 536870912 &&
                ((t.flags |= 128), (s = !0), xi(n, !1), (t.lanes = 4194304));
          n.isBackwards
            ? ((u.sibling = t.child), (t.child = u))
            : ((e = n.last), e !== null ? (e.sibling = u) : (t.child = u), (n.last = u));
        }
        return n.tail !== null
          ? ((e = n.tail),
            (n.rendering = e),
            (n.tail = e.sibling),
            (n.renderingStartTime = yt()),
            (e.sibling = null),
            (a = lt.current),
            J(lt, s ? (a & 1) | 2 : a & 1),
            Ne && Tl(t, n.treeForkCount),
            e)
          : (Ye(t), null);
      case 22:
      case 23:
        return (
          It(t),
          Yo(),
          (n = t.memoizedState !== null),
          e !== null
            ? (e.memoizedState !== null) !== n && (t.flags |= 8192)
            : n && (t.flags |= 8192),
          n
            ? (a & 536870912) !== 0 &&
              (t.flags & 128) === 0 &&
              (Ye(t), t.subtreeFlags & 6 && (t.flags |= 8192))
            : Ye(t),
          (a = t.updateQueue),
          a !== null && Xs(t, a.retryQueue),
          (a = null),
          e !== null &&
            e.memoizedState !== null &&
            e.memoizedState.cachePool !== null &&
            (a = e.memoizedState.cachePool.pool),
          (n = null),
          t.memoizedState !== null &&
            t.memoizedState.cachePool !== null &&
            (n = t.memoizedState.cachePool.pool),
          n !== a && (t.flags |= 2048),
          e !== null && H(La),
          null
        );
      case 24:
        return (
          (a = null),
          e !== null && (a = e.memoizedState.cache),
          t.memoizedState.cache !== a && (t.flags |= 2048),
          Cl(nt),
          Ye(t),
          null
        );
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(r(156, t.tag));
  }
  function Ok(e, t) {
    switch ((jo(t), t.tag)) {
      case 1:
        return ((e = t.flags), e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null);
      case 3:
        return (
          Cl(nt),
          Ge(),
          (e = t.flags),
          (e & 65536) !== 0 && (e & 128) === 0 ? ((t.flags = (e & -65537) | 128), t) : null
        );
      case 26:
      case 27:
      case 5:
        return (Ga(t), null);
      case 31:
        if (t.memoizedState !== null) {
          if ((It(t), t.alternate === null)) throw Error(r(340));
          Na();
        }
        return ((e = t.flags), e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null);
      case 13:
        if ((It(t), (e = t.memoizedState), e !== null && e.dehydrated !== null)) {
          if (t.alternate === null) throw Error(r(340));
          Na();
        }
        return ((e = t.flags), e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null);
      case 19:
        return (H(lt), null);
      case 4:
        return (Ge(), null);
      case 10:
        return (Cl(t.type), null);
      case 22:
      case 23:
        return (
          It(t),
          Yo(),
          e !== null && H(La),
          (e = t.flags),
          e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
        );
      case 24:
        return (Cl(nt), null);
      case 25:
        return null;
      default:
        return null;
    }
  }
  function I_(e, t) {
    switch ((jo(t), t.tag)) {
      case 3:
        (Cl(nt), Ge());
        break;
      case 26:
      case 27:
      case 5:
        Ga(t);
        break;
      case 4:
        Ge();
        break;
      case 31:
        t.memoizedState !== null && It(t);
        break;
      case 13:
        It(t);
        break;
      case 19:
        H(lt);
        break;
      case 10:
        Cl(t.type);
        break;
      case 22:
      case 23:
        (It(t), Yo(), e !== null && H(La));
        break;
      case 24:
        Cl(nt);
    }
  }
  function Si(e, t) {
    try {
      var a = t.updateQueue,
        n = a !== null ? a.lastEffect : null;
      if (n !== null) {
        var s = n.next;
        a = s;
        do {
          if ((a.tag & e) === e) {
            n = void 0;
            var u = a.create,
              m = a.inst;
            ((n = u()), (m.destroy = n));
          }
          a = a.next;
        } while (a !== s);
      }
    } catch (g) {
      Oe(t, t.return, g);
    }
  }
  function ia(e, t, a) {
    try {
      var n = t.updateQueue,
        s = n !== null ? n.lastEffect : null;
      if (s !== null) {
        var u = s.next;
        n = u;
        do {
          if ((n.tag & e) === e) {
            var m = n.inst,
              g = m.destroy;
            if (g !== void 0) {
              ((m.destroy = void 0), (s = t));
              var w = a,
                D = g;
              try {
                D();
              } catch (Y) {
                Oe(s, w, Y);
              }
            }
          }
          n = n.next;
        } while (n !== u);
      }
    } catch (Y) {
      Oe(t, t.return, Y);
    }
  }
  function D_(e) {
    var t = e.updateQueue;
    if (t !== null) {
      var a = e.stateNode;
      try {
        Cm(t, a);
      } catch (n) {
        Oe(e, e.return, n);
      }
    }
  }
  function R_(e, t, a) {
    ((a.props = Ia(e.type, e.memoizedProps)), (a.state = e.memoizedState));
    try {
      a.componentWillUnmount();
    } catch (n) {
      Oe(e, t, n);
    }
  }
  function wi(e, t) {
    try {
      var a = e.ref;
      if (a !== null) {
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
        typeof a == 'function' ? (e.refCleanup = a(n)) : (a.current = n);
      }
    } catch (s) {
      Oe(e, t, s);
    }
  }
  function hl(e, t) {
    var a = e.ref,
      n = e.refCleanup;
    if (a !== null)
      if (typeof n == 'function')
        try {
          n();
        } catch (s) {
          Oe(e, t, s);
        } finally {
          ((e.refCleanup = null), (e = e.alternate), e != null && (e.refCleanup = null));
        }
      else if (typeof a == 'function')
        try {
          a(null);
        } catch (s) {
          Oe(e, t, s);
        }
      else a.current = null;
  }
  function z_(e) {
    var t = e.type,
      a = e.memoizedProps,
      n = e.stateNode;
    try {
      e: switch (t) {
        case 'button':
        case 'input':
        case 'select':
        case 'textarea':
          a.autoFocus && n.focus();
          break e;
        case 'img':
          a.src ? (n.src = a.src) : a.srcSet && (n.srcset = a.srcSet);
      }
    } catch (s) {
      Oe(e, e.return, s);
    }
  }
  function xu(e, t, a) {
    try {
      var n = e.stateNode;
      (av(n, e.type, a, t), (n[wt] = t));
    } catch (s) {
      Oe(e, e.return, s);
    }
  }
  function H_(e) {
    return (
      e.tag === 5 || e.tag === 3 || e.tag === 26 || (e.tag === 27 && ma(e.type)) || e.tag === 4
    );
  }
  function Su(e) {
    e: for (;;) {
      for (; e.sibling === null; ) {
        if (e.return === null || H_(e.return)) return null;
        e = e.return;
      }
      for (
        e.sibling.return = e.return, e = e.sibling;
        e.tag !== 5 && e.tag !== 6 && e.tag !== 18;
      ) {
        if ((e.tag === 27 && ma(e.type)) || e.flags & 2 || e.child === null || e.tag === 4)
          continue e;
        ((e.child.return = e), (e = e.child));
      }
      if (!(e.flags & 2)) return e.stateNode;
    }
  }
  function wu(e, t, a) {
    var n = e.tag;
    if (n === 5 || n === 6)
      ((e = e.stateNode),
        t
          ? (a.nodeType === 9
              ? a.body
              : a.nodeName === 'HTML'
                ? a.ownerDocument.body
                : a
            ).insertBefore(e, t)
          : ((t = a.nodeType === 9 ? a.body : a.nodeName === 'HTML' ? a.ownerDocument.body : a),
            t.appendChild(e),
            (a = a._reactRootContainer),
            a != null || t.onclick !== null || (t.onclick = xl)));
    else if (
      n !== 4 &&
      (n === 27 && ma(e.type) && ((a = e.stateNode), (t = null)), (e = e.child), e !== null)
    )
      for (wu(e, t, a), e = e.sibling; e !== null; ) (wu(e, t, a), (e = e.sibling));
  }
  function Vs(e, t, a) {
    var n = e.tag;
    if (n === 5 || n === 6) ((e = e.stateNode), t ? a.insertBefore(e, t) : a.appendChild(e));
    else if (n !== 4 && (n === 27 && ma(e.type) && (a = e.stateNode), (e = e.child), e !== null))
      for (Vs(e, t, a), e = e.sibling; e !== null; ) (Vs(e, t, a), (e = e.sibling));
  }
  function U_(e) {
    var t = e.stateNode,
      a = e.memoizedProps;
    try {
      for (var n = e.type, s = t.attributes; s.length; ) t.removeAttributeNode(s[0]);
      (kt(t, n, a), (t[ft] = e), (t[wt] = a));
    } catch (u) {
      Oe(e, e.return, u);
    }
  }
  var ql = !1,
    rt = !1,
    Tu = !1,
    G_ = typeof WeakSet == 'function' ? WeakSet : Set,
    dt = null;
  function Ik(e, t) {
    if (((e = e.containerInfo), (Vu = _r), (e = em(e)), ko(e))) {
      if ('selectionStart' in e) var a = { start: e.selectionStart, end: e.selectionEnd };
      else
        e: {
          a = ((a = e.ownerDocument) && a.defaultView) || window;
          var n = a.getSelection && a.getSelection();
          if (n && n.rangeCount !== 0) {
            a = n.anchorNode;
            var s = n.anchorOffset,
              u = n.focusNode;
            n = n.focusOffset;
            try {
              (a.nodeType, u.nodeType);
            } catch {
              a = null;
              break e;
            }
            var m = 0,
              g = -1,
              w = -1,
              D = 0,
              Y = 0,
              V = e,
              R = null;
            t: for (;;) {
              for (
                var z;
                V !== a || (s !== 0 && V.nodeType !== 3) || (g = m + s),
                  V !== u || (n !== 0 && V.nodeType !== 3) || (w = m + n),
                  V.nodeType === 3 && (m += V.nodeValue.length),
                  (z = V.firstChild) !== null;
              )
                ((R = V), (V = z));
              for (;;) {
                if (V === e) break t;
                if (
                  (R === a && ++D === s && (g = m),
                  R === u && ++Y === n && (w = m),
                  (z = V.nextSibling) !== null)
                )
                  break;
                ((V = R), (R = V.parentNode));
              }
              V = z;
            }
            a = g === -1 || w === -1 ? null : { start: g, end: w };
          } else a = null;
        }
      a = a || { start: 0, end: 0 };
    } else a = null;
    for (Qu = { focusedElem: e, selectionRange: a }, _r = !1, dt = t; dt !== null; )
      if (((t = dt), (e = t.child), (t.subtreeFlags & 1028) !== 0 && e !== null))
        ((e.return = t), (dt = e));
      else
        for (; dt !== null; ) {
          switch (((t = dt), (u = t.alternate), (e = t.flags), t.tag)) {
            case 0:
              if (
                (e & 4) !== 0 &&
                ((e = t.updateQueue), (e = e !== null ? e.events : null), e !== null)
              )
                for (a = 0; a < e.length; a++) ((s = e[a]), (s.ref.impl = s.nextImpl));
              break;
            case 11:
            case 15:
              break;
            case 1:
              if ((e & 1024) !== 0 && u !== null) {
                ((e = void 0),
                  (a = t),
                  (s = u.memoizedProps),
                  (u = u.memoizedState),
                  (n = a.stateNode));
                try {
                  var re = Ia(a.type, s);
                  ((e = n.getSnapshotBeforeUpdate(re, u)),
                    (n.__reactInternalSnapshotBeforeUpdate = e));
                } catch (fe) {
                  Oe(a, a.return, fe);
                }
              }
              break;
            case 3:
              if ((e & 1024) !== 0) {
                if (((e = t.stateNode.containerInfo), (a = e.nodeType), a === 9)) Ju(e);
                else if (a === 1)
                  switch (e.nodeName) {
                    case 'HEAD':
                    case 'HTML':
                    case 'BODY':
                      Ju(e);
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
              if ((e & 1024) !== 0) throw Error(r(163));
          }
          if (((e = t.sibling), e !== null)) {
            ((e.return = t.return), (dt = e));
            break;
          }
          dt = t.return;
        }
  }
  function $_(e, t, a) {
    var n = a.flags;
    switch (a.tag) {
      case 0:
      case 11:
      case 15:
        (Ml(e, a), n & 4 && Si(5, a));
        break;
      case 1:
        if ((Ml(e, a), n & 4))
          if (((e = a.stateNode), t === null))
            try {
              e.componentDidMount();
            } catch (m) {
              Oe(a, a.return, m);
            }
          else {
            var s = Ia(a.type, t.memoizedProps);
            t = t.memoizedState;
            try {
              e.componentDidUpdate(s, t, e.__reactInternalSnapshotBeforeUpdate);
            } catch (m) {
              Oe(a, a.return, m);
            }
          }
        (n & 64 && D_(a), n & 512 && wi(a, a.return));
        break;
      case 3:
        if ((Ml(e, a), n & 64 && ((e = a.updateQueue), e !== null))) {
          if (((t = null), a.child !== null))
            switch (a.child.tag) {
              case 27:
              case 5:
                t = a.child.stateNode;
                break;
              case 1:
                t = a.child.stateNode;
            }
          try {
            Cm(e, t);
          } catch (m) {
            Oe(a, a.return, m);
          }
        }
        break;
      case 27:
        t === null && n & 4 && U_(a);
      case 26:
      case 5:
        (Ml(e, a), t === null && n & 4 && z_(a), n & 512 && wi(a, a.return));
        break;
      case 12:
        Ml(e, a);
        break;
      case 31:
        (Ml(e, a), n & 4 && V_(e, a));
        break;
      case 13:
        (Ml(e, a),
          n & 4 && Q_(e, a),
          n & 64 &&
            ((e = a.memoizedState),
            e !== null && ((e = e.dehydrated), e !== null && ((a = Xk.bind(null, a)), dv(e, a)))));
        break;
      case 22:
        if (((n = a.memoizedState !== null || ql), !n)) {
          ((t = (t !== null && t.memoizedState !== null) || rt), (s = ql));
          var u = rt;
          ((ql = n),
            (rt = t) && !u ? Ol(e, a, (a.subtreeFlags & 8772) !== 0) : Ml(e, a),
            (ql = s),
            (rt = u));
        }
        break;
      case 30:
        break;
      default:
        Ml(e, a);
    }
  }
  function Y_(e) {
    var t = e.alternate;
    (t !== null && ((e.alternate = null), Y_(t)),
      (e.child = null),
      (e.deletions = null),
      (e.sibling = null),
      e.tag === 5 && ((t = e.stateNode), t !== null && eo(t)),
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
    Et = !1;
  function Bl(e, t, a) {
    for (a = a.child; a !== null; ) (X_(e, t, a), (a = a.sibling));
  }
  function X_(e, t, a) {
    if (Lt && typeof Lt.onCommitFiberUnmount == 'function')
      try {
        Lt.onCommitFiberUnmount(yl, a);
      } catch {}
    switch (a.tag) {
      case 26:
        (rt || hl(a, t),
          Bl(e, t, a),
          a.memoizedState
            ? a.memoizedState.count--
            : a.stateNode && ((a = a.stateNode), a.parentNode.removeChild(a)));
        break;
      case 27:
        rt || hl(a, t);
        var n = Qe,
          s = Et;
        (ma(a.type) && ((Qe = a.stateNode), (Et = !1)),
          Bl(e, t, a),
          Bi(a.stateNode),
          (Qe = n),
          (Et = s));
        break;
      case 5:
        rt || hl(a, t);
      case 6:
        if (((n = Qe), (s = Et), (Qe = null), Bl(e, t, a), (Qe = n), (Et = s), Qe !== null))
          if (Et)
            try {
              (Qe.nodeType === 9
                ? Qe.body
                : Qe.nodeName === 'HTML'
                  ? Qe.ownerDocument.body
                  : Qe
              ).removeChild(a.stateNode);
            } catch (u) {
              Oe(a, t, u);
            }
          else
            try {
              Qe.removeChild(a.stateNode);
            } catch (u) {
              Oe(a, t, u);
            }
        break;
      case 18:
        Qe !== null &&
          (Et
            ? ((e = Qe),
              Rf(
                e.nodeType === 9 ? e.body : e.nodeName === 'HTML' ? e.ownerDocument.body : e,
                a.stateNode
              ),
              qn(e))
            : Rf(Qe, a.stateNode));
        break;
      case 4:
        ((n = Qe),
          (s = Et),
          (Qe = a.stateNode.containerInfo),
          (Et = !0),
          Bl(e, t, a),
          (Qe = n),
          (Et = s));
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        (ia(2, a, t), rt || ia(4, a, t), Bl(e, t, a));
        break;
      case 1:
        (rt ||
          (hl(a, t), (n = a.stateNode), typeof n.componentWillUnmount == 'function' && R_(a, t, n)),
          Bl(e, t, a));
        break;
      case 21:
        Bl(e, t, a);
        break;
      case 22:
        ((rt = (n = rt) || a.memoizedState !== null), Bl(e, t, a), (rt = n));
        break;
      default:
        Bl(e, t, a);
    }
  }
  function V_(e, t) {
    if (
      t.memoizedState === null &&
      ((e = t.alternate), e !== null && ((e = e.memoizedState), e !== null))
    ) {
      e = e.dehydrated;
      try {
        qn(e);
      } catch (a) {
        Oe(t, t.return, a);
      }
    }
  }
  function Q_(e, t) {
    if (
      t.memoizedState === null &&
      ((e = t.alternate),
      e !== null && ((e = e.memoizedState), e !== null && ((e = e.dehydrated), e !== null)))
    )
      try {
        qn(e);
      } catch (a) {
        Oe(t, t.return, a);
      }
  }
  function Dk(e) {
    switch (e.tag) {
      case 31:
      case 13:
      case 19:
        var t = e.stateNode;
        return (t === null && (t = e.stateNode = new G_()), t);
      case 22:
        return (
          (e = e.stateNode),
          (t = e._retryCache),
          t === null && (t = e._retryCache = new G_()),
          t
        );
      default:
        throw Error(r(435, e.tag));
    }
  }
  function Qs(e, t) {
    var a = Dk(e);
    t.forEach(function (n) {
      if (!a.has(n)) {
        a.add(n);
        var s = Vk.bind(null, e, n);
        n.then(s, s);
      }
    });
  }
  function Ct(e, t) {
    var a = t.deletions;
    if (a !== null)
      for (var n = 0; n < a.length; n++) {
        var s = a[n],
          u = e,
          m = t,
          g = m;
        e: for (; g !== null; ) {
          switch (g.tag) {
            case 27:
              if (ma(g.type)) {
                ((Qe = g.stateNode), (Et = !1));
                break e;
              }
              break;
            case 5:
              ((Qe = g.stateNode), (Et = !1));
              break e;
            case 3:
            case 4:
              ((Qe = g.stateNode.containerInfo), (Et = !0));
              break e;
          }
          g = g.return;
        }
        if (Qe === null) throw Error(r(160));
        (X_(u, m, s),
          (Qe = null),
          (Et = !1),
          (u = s.alternate),
          u !== null && (u.return = null),
          (s.return = null));
      }
    if (t.subtreeFlags & 13886) for (t = t.child; t !== null; ) (K_(t, e), (t = t.sibling));
  }
  var ll = null;
  function K_(e, t) {
    var a = e.alternate,
      n = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        (Ct(t, e), Nt(e), n & 4 && (ia(3, e, e.return), Si(3, e), ia(5, e, e.return)));
        break;
      case 1:
        (Ct(t, e),
          Nt(e),
          n & 512 && (rt || a === null || hl(a, a.return)),
          n & 64 &&
            ql &&
            ((e = e.updateQueue),
            e !== null &&
              ((n = e.callbacks),
              n !== null &&
                ((a = e.shared.hiddenCallbacks),
                (e.shared.hiddenCallbacks = a === null ? n : a.concat(n))))));
        break;
      case 26:
        var s = ll;
        if ((Ct(t, e), Nt(e), n & 512 && (rt || a === null || hl(a, a.return)), n & 4)) {
          var u = a !== null ? a.memoizedState : null;
          if (((n = e.memoizedState), a === null))
            if (n === null)
              if (e.stateNode === null) {
                e: {
                  ((n = e.type), (a = e.memoizedProps), (s = s.ownerDocument || s));
                  t: switch (n) {
                    case 'title':
                      ((u = s.getElementsByTagName('title')[0]),
                        (!u ||
                          u[Pn] ||
                          u[ft] ||
                          u.namespaceURI === 'http://www.w3.org/2000/svg' ||
                          u.hasAttribute('itemprop')) &&
                          ((u = s.createElement(n)),
                          s.head.insertBefore(u, s.querySelector('head > title'))),
                        kt(u, n, a),
                        (u[ft] = e),
                        ct(u),
                        (n = u));
                      break e;
                    case 'link':
                      var m = Zf('link', 'href', s).get(n + (a.href || ''));
                      if (m) {
                        for (var g = 0; g < m.length; g++)
                          if (
                            ((u = m[g]),
                            u.getAttribute('href') ===
                              (a.href == null || a.href === '' ? null : a.href) &&
                              u.getAttribute('rel') === (a.rel == null ? null : a.rel) &&
                              u.getAttribute('title') === (a.title == null ? null : a.title) &&
                              u.getAttribute('crossorigin') ===
                                (a.crossOrigin == null ? null : a.crossOrigin))
                          ) {
                            m.splice(g, 1);
                            break t;
                          }
                      }
                      ((u = s.createElement(n)), kt(u, n, a), s.head.appendChild(u));
                      break;
                    case 'meta':
                      if ((m = Zf('meta', 'content', s).get(n + (a.content || '')))) {
                        for (g = 0; g < m.length; g++)
                          if (
                            ((u = m[g]),
                            u.getAttribute('content') ===
                              (a.content == null ? null : '' + a.content) &&
                              u.getAttribute('name') === (a.name == null ? null : a.name) &&
                              u.getAttribute('property') ===
                                (a.property == null ? null : a.property) &&
                              u.getAttribute('http-equiv') ===
                                (a.httpEquiv == null ? null : a.httpEquiv) &&
                              u.getAttribute('charset') === (a.charSet == null ? null : a.charSet))
                          ) {
                            m.splice(g, 1);
                            break t;
                          }
                      }
                      ((u = s.createElement(n)), kt(u, n, a), s.head.appendChild(u));
                      break;
                    default:
                      throw Error(r(468, n));
                  }
                  ((u[ft] = e), ct(u), (n = u));
                }
                e.stateNode = n;
              } else Jf(s, e.type, e.stateNode);
            else e.stateNode = Kf(s, n, e.memoizedProps);
          else
            u !== n
              ? (u === null
                  ? a.stateNode !== null && ((a = a.stateNode), a.parentNode.removeChild(a))
                  : u.count--,
                n === null ? Jf(s, e.type, e.stateNode) : Kf(s, n, e.memoizedProps))
              : n === null && e.stateNode !== null && xu(e, e.memoizedProps, a.memoizedProps);
        }
        break;
      case 27:
        (Ct(t, e),
          Nt(e),
          n & 512 && (rt || a === null || hl(a, a.return)),
          a !== null && n & 4 && xu(e, e.memoizedProps, a.memoizedProps));
        break;
      case 5:
        if ((Ct(t, e), Nt(e), n & 512 && (rt || a === null || hl(a, a.return)), e.flags & 32)) {
          s = e.stateNode;
          try {
            en(s, '');
          } catch (re) {
            Oe(e, e.return, re);
          }
        }
        (n & 4 &&
          e.stateNode != null &&
          ((s = e.memoizedProps), xu(e, s, a !== null ? a.memoizedProps : s)),
          n & 1024 && (Tu = !0));
        break;
      case 6:
        if ((Ct(t, e), Nt(e), n & 4)) {
          if (e.stateNode === null) throw Error(r(162));
          ((n = e.memoizedProps), (a = e.stateNode));
          try {
            a.nodeValue = n;
          } catch (re) {
            Oe(e, e.return, re);
          }
        }
        break;
      case 3:
        if (
          ((ur = null),
          (s = ll),
          (ll = rr(t.containerInfo)),
          Ct(t, e),
          (ll = s),
          Nt(e),
          n & 4 && a !== null && a.memoizedState.isDehydrated)
        )
          try {
            qn(t.containerInfo);
          } catch (re) {
            Oe(e, e.return, re);
          }
        Tu && ((Tu = !1), Z_(e));
        break;
      case 4:
        ((n = ll), (ll = rr(e.stateNode.containerInfo)), Ct(t, e), Nt(e), (ll = n));
        break;
      case 12:
        (Ct(t, e), Nt(e));
        break;
      case 31:
        (Ct(t, e),
          Nt(e),
          n & 4 && ((n = e.updateQueue), n !== null && ((e.updateQueue = null), Qs(e, n))));
        break;
      case 13:
        (Ct(t, e),
          Nt(e),
          e.child.flags & 8192 &&
            (e.memoizedState !== null) != (a !== null && a.memoizedState !== null) &&
            (Zs = yt()),
          n & 4 && ((n = e.updateQueue), n !== null && ((e.updateQueue = null), Qs(e, n))));
        break;
      case 22:
        s = e.memoizedState !== null;
        var w = a !== null && a.memoizedState !== null,
          D = ql,
          Y = rt;
        if (((ql = D || s), (rt = Y || w), Ct(t, e), (rt = Y), (ql = D), Nt(e), n & 8192))
          e: for (
            t = e.stateNode,
              t._visibility = s ? t._visibility & -2 : t._visibility | 1,
              s && (a === null || w || ql || rt || Da(e)),
              a = null,
              t = e;
            ;
          ) {
            if (t.tag === 5 || t.tag === 26) {
              if (a === null) {
                w = a = t;
                try {
                  if (((u = w.stateNode), s))
                    ((m = u.style),
                      typeof m.setProperty == 'function'
                        ? m.setProperty('display', 'none', 'important')
                        : (m.display = 'none'));
                  else {
                    g = w.stateNode;
                    var V = w.memoizedProps.style,
                      R = V != null && V.hasOwnProperty('display') ? V.display : null;
                    g.style.display = R == null || typeof R == 'boolean' ? '' : ('' + R).trim();
                  }
                } catch (re) {
                  Oe(w, w.return, re);
                }
              }
            } else if (t.tag === 6) {
              if (a === null) {
                w = t;
                try {
                  w.stateNode.nodeValue = s ? '' : w.memoizedProps;
                } catch (re) {
                  Oe(w, w.return, re);
                }
              }
            } else if (t.tag === 18) {
              if (a === null) {
                w = t;
                try {
                  var z = w.stateNode;
                  s ? zf(z, !0) : zf(w.stateNode, !1);
                } catch (re) {
                  Oe(w, w.return, re);
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
              (a === t && (a = null), (t = t.return));
            }
            (a === t && (a = null), (t.sibling.return = t.return), (t = t.sibling));
          }
        n & 4 &&
          ((n = e.updateQueue),
          n !== null && ((a = n.retryQueue), a !== null && ((n.retryQueue = null), Qs(e, a))));
        break;
      case 19:
        (Ct(t, e),
          Nt(e),
          n & 4 && ((n = e.updateQueue), n !== null && ((e.updateQueue = null), Qs(e, n))));
        break;
      case 30:
        break;
      case 21:
        break;
      default:
        (Ct(t, e), Nt(e));
    }
  }
  function Nt(e) {
    var t = e.flags;
    if (t & 2) {
      try {
        for (var a, n = e.return; n !== null; ) {
          if (H_(n)) {
            a = n;
            break;
          }
          n = n.return;
        }
        if (a == null) throw Error(r(160));
        switch (a.tag) {
          case 27:
            var s = a.stateNode,
              u = Su(e);
            Vs(e, u, s);
            break;
          case 5:
            var m = a.stateNode;
            a.flags & 32 && (en(m, ''), (a.flags &= -33));
            var g = Su(e);
            Vs(e, g, m);
            break;
          case 3:
          case 4:
            var w = a.stateNode.containerInfo,
              D = Su(e);
            wu(e, D, w);
            break;
          default:
            throw Error(r(161));
        }
      } catch (Y) {
        Oe(e, e.return, Y);
      }
      e.flags &= -3;
    }
    t & 4096 && (e.flags &= -4097);
  }
  function Z_(e) {
    if (e.subtreeFlags & 1024)
      for (e = e.child; e !== null; ) {
        var t = e;
        (Z_(t), t.tag === 5 && t.flags & 1024 && t.stateNode.reset(), (e = e.sibling));
      }
  }
  function Ml(e, t) {
    if (t.subtreeFlags & 8772)
      for (t = t.child; t !== null; ) ($_(e, t.alternate, t), (t = t.sibling));
  }
  function Da(e) {
    for (e = e.child; e !== null; ) {
      var t = e;
      switch (t.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          (ia(4, t, t.return), Da(t));
          break;
        case 1:
          hl(t, t.return);
          var a = t.stateNode;
          (typeof a.componentWillUnmount == 'function' && R_(t, t.return, a), Da(t));
          break;
        case 27:
          Bi(t.stateNode);
        case 26:
        case 5:
          (hl(t, t.return), Da(t));
          break;
        case 22:
          t.memoizedState === null && Da(t);
          break;
        case 30:
          Da(t);
          break;
        default:
          Da(t);
      }
      e = e.sibling;
    }
  }
  function Ol(e, t, a) {
    for (a = a && (t.subtreeFlags & 8772) !== 0, t = t.child; t !== null; ) {
      var n = t.alternate,
        s = e,
        u = t,
        m = u.flags;
      switch (u.tag) {
        case 0:
        case 11:
        case 15:
          (Ol(s, u, a), Si(4, u));
          break;
        case 1:
          if ((Ol(s, u, a), (n = u), (s = n.stateNode), typeof s.componentDidMount == 'function'))
            try {
              s.componentDidMount();
            } catch (D) {
              Oe(n, n.return, D);
            }
          if (((n = u), (s = n.updateQueue), s !== null)) {
            var g = n.stateNode;
            try {
              var w = s.shared.hiddenCallbacks;
              if (w !== null)
                for (s.shared.hiddenCallbacks = null, s = 0; s < w.length; s++) Em(w[s], g);
            } catch (D) {
              Oe(n, n.return, D);
            }
          }
          (a && m & 64 && D_(u), wi(u, u.return));
          break;
        case 27:
          U_(u);
        case 26:
        case 5:
          (Ol(s, u, a), a && n === null && m & 4 && z_(u), wi(u, u.return));
          break;
        case 12:
          Ol(s, u, a);
          break;
        case 31:
          (Ol(s, u, a), a && m & 4 && V_(s, u));
          break;
        case 13:
          (Ol(s, u, a), a && m & 4 && Q_(s, u));
          break;
        case 22:
          (u.memoizedState === null && Ol(s, u, a), wi(u, u.return));
          break;
        case 30:
          break;
        default:
          Ol(s, u, a);
      }
      t = t.sibling;
    }
  }
  function Eu(e, t) {
    var a = null;
    (e !== null &&
      e.memoizedState !== null &&
      e.memoizedState.cachePool !== null &&
      (a = e.memoizedState.cachePool.pool),
      (e = null),
      t.memoizedState !== null &&
        t.memoizedState.cachePool !== null &&
        (e = t.memoizedState.cachePool.pool),
      e !== a && (e != null && e.refCount++, a != null && ci(a)));
  }
  function Cu(e, t) {
    ((e = null),
      t.alternate !== null && (e = t.alternate.memoizedState.cache),
      (t = t.memoizedState.cache),
      t !== e && (t.refCount++, e != null && ci(e)));
  }
  function al(e, t, a, n) {
    if (t.subtreeFlags & 10256) for (t = t.child; t !== null; ) (J_(e, t, a, n), (t = t.sibling));
  }
  function J_(e, t, a, n) {
    var s = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        (al(e, t, a, n), s & 2048 && Si(9, t));
        break;
      case 1:
        al(e, t, a, n);
        break;
      case 3:
        (al(e, t, a, n),
          s & 2048 &&
            ((e = null),
            t.alternate !== null && (e = t.alternate.memoizedState.cache),
            (t = t.memoizedState.cache),
            t !== e && (t.refCount++, e != null && ci(e))));
        break;
      case 12:
        if (s & 2048) {
          (al(e, t, a, n), (e = t.stateNode));
          try {
            var u = t.memoizedProps,
              m = u.id,
              g = u.onPostCommit;
            typeof g == 'function' &&
              g(m, t.alternate === null ? 'mount' : 'update', e.passiveEffectDuration, -0);
          } catch (w) {
            Oe(t, t.return, w);
          }
        } else al(e, t, a, n);
        break;
      case 31:
        al(e, t, a, n);
        break;
      case 13:
        al(e, t, a, n);
        break;
      case 23:
        break;
      case 22:
        ((u = t.stateNode),
          (m = t.alternate),
          t.memoizedState !== null
            ? u._visibility & 2
              ? al(e, t, a, n)
              : Ti(e, t)
            : u._visibility & 2
              ? al(e, t, a, n)
              : ((u._visibility |= 2), bn(e, t, a, n, (t.subtreeFlags & 10256) !== 0 || !1)),
          s & 2048 && Eu(m, t));
        break;
      case 24:
        (al(e, t, a, n), s & 2048 && Cu(t.alternate, t));
        break;
      default:
        al(e, t, a, n);
    }
  }
  function bn(e, t, a, n, s) {
    for (s = s && ((t.subtreeFlags & 10256) !== 0 || !1), t = t.child; t !== null; ) {
      var u = e,
        m = t,
        g = a,
        w = n,
        D = m.flags;
      switch (m.tag) {
        case 0:
        case 11:
        case 15:
          (bn(u, m, g, w, s), Si(8, m));
          break;
        case 23:
          break;
        case 22:
          var Y = m.stateNode;
          (m.memoizedState !== null
            ? Y._visibility & 2
              ? bn(u, m, g, w, s)
              : Ti(u, m)
            : ((Y._visibility |= 2), bn(u, m, g, w, s)),
            s && D & 2048 && Eu(m.alternate, m));
          break;
        case 24:
          (bn(u, m, g, w, s), s && D & 2048 && Cu(m.alternate, m));
          break;
        default:
          bn(u, m, g, w, s);
      }
      t = t.sibling;
    }
  }
  function Ti(e, t) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; ) {
        var a = e,
          n = t,
          s = n.flags;
        switch (n.tag) {
          case 22:
            (Ti(a, n), s & 2048 && Eu(n.alternate, n));
            break;
          case 24:
            (Ti(a, n), s & 2048 && Cu(n.alternate, n));
            break;
          default:
            Ti(a, n);
        }
        t = t.sibling;
      }
  }
  var Ei = 8192;
  function xn(e, t, a) {
    if (e.subtreeFlags & Ei) for (e = e.child; e !== null; ) (P_(e, t, a), (e = e.sibling));
  }
  function P_(e, t, a) {
    switch (e.tag) {
      case 26:
        (xn(e, t, a),
          e.flags & Ei && e.memoizedState !== null && Sv(a, ll, e.memoizedState, e.memoizedProps));
        break;
      case 5:
        xn(e, t, a);
        break;
      case 3:
      case 4:
        var n = ll;
        ((ll = rr(e.stateNode.containerInfo)), xn(e, t, a), (ll = n));
        break;
      case 22:
        e.memoizedState === null &&
          ((n = e.alternate),
          n !== null && n.memoizedState !== null
            ? ((n = Ei), (Ei = 16777216), xn(e, t, a), (Ei = n))
            : xn(e, t, a));
        break;
      default:
        xn(e, t, a);
    }
  }
  function F_(e) {
    var t = e.alternate;
    if (t !== null && ((e = t.child), e !== null)) {
      t.child = null;
      do ((t = e.sibling), (e.sibling = null), (e = t));
      while (e !== null);
    }
  }
  function Ci(e) {
    var t = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (t !== null)
        for (var a = 0; a < t.length; a++) {
          var n = t[a];
          ((dt = n), ef(n, e));
        }
      F_(e);
    }
    if (e.subtreeFlags & 10256) for (e = e.child; e !== null; ) (W_(e), (e = e.sibling));
  }
  function W_(e) {
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        (Ci(e), e.flags & 2048 && ia(9, e, e.return));
        break;
      case 3:
        Ci(e);
        break;
      case 12:
        Ci(e);
        break;
      case 22:
        var t = e.stateNode;
        e.memoizedState !== null && t._visibility & 2 && (e.return === null || e.return.tag !== 13)
          ? ((t._visibility &= -3), Ks(e))
          : Ci(e);
        break;
      default:
        Ci(e);
    }
  }
  function Ks(e) {
    var t = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (t !== null)
        for (var a = 0; a < t.length; a++) {
          var n = t[a];
          ((dt = n), ef(n, e));
        }
      F_(e);
    }
    for (e = e.child; e !== null; ) {
      switch (((t = e), t.tag)) {
        case 0:
        case 11:
        case 15:
          (ia(8, t, t.return), Ks(t));
          break;
        case 22:
          ((a = t.stateNode), a._visibility & 2 && ((a._visibility &= -3), Ks(t)));
          break;
        default:
          Ks(t);
      }
      e = e.sibling;
    }
  }
  function ef(e, t) {
    for (; dt !== null; ) {
      var a = dt;
      switch (a.tag) {
        case 0:
        case 11:
        case 15:
          ia(8, a, t);
          break;
        case 23:
        case 22:
          if (a.memoizedState !== null && a.memoizedState.cachePool !== null) {
            var n = a.memoizedState.cachePool.pool;
            n != null && n.refCount++;
          }
          break;
        case 24:
          ci(a.memoizedState.cache);
      }
      if (((n = a.child), n !== null)) ((n.return = a), (dt = n));
      else
        e: for (a = e; dt !== null; ) {
          n = dt;
          var s = n.sibling,
            u = n.return;
          if ((Y_(n), n === a)) {
            dt = null;
            break e;
          }
          if (s !== null) {
            ((s.return = u), (dt = s));
            break e;
          }
          dt = u;
        }
    }
  }
  var Rk = {
      getCacheForType: function (e) {
        var t = ht(nt),
          a = t.data.get(e);
        return (a === void 0 && ((a = e()), t.data.set(e, a)), a);
      },
      cacheSignal: function () {
        return ht(nt).controller.signal;
      },
    },
    zk = typeof WeakMap == 'function' ? WeakMap : Map,
    Le = 0,
    Ue = null,
    we = null,
    Ee = 0,
    Me = 0,
    Dt = null,
    sa = !1,
    Sn = !1,
    Nu = !1,
    Il = 0,
    Fe = 0,
    ra = 0,
    Ra = 0,
    ju = 0,
    Rt = 0,
    wn = 0,
    Ni = null,
    jt = null,
    Au = !1,
    Zs = 0,
    tf = 0,
    Js = 1 / 0,
    Ps = null,
    oa = null,
    ut = 0,
    ua = null,
    Tn = null,
    Dl = 0,
    Lu = 0,
    qu = null,
    lf = null,
    ji = 0,
    Bu = null;
  function zt() {
    return (Le & 2) !== 0 && Ee !== 0 ? Ee & -Ee : L.T !== null ? zu() : kd();
  }
  function af() {
    if (Rt === 0)
      if ((Ee & 536870912) === 0 || Ne) {
        var e = is;
        ((is <<= 1), (is & 3932160) === 0 && (is = 262144), (Rt = e));
      } else Rt = 536870912;
    return ((e = Ot.current), e !== null && (e.flags |= 32), Rt);
  }
  function At(e, t, a) {
    (((e === Ue && (Me === 2 || Me === 9)) || e.cancelPendingCommit !== null) &&
      (En(e, 0), ca(e, Ee, Rt, !1)),
      Jn(e, a),
      ((Le & 2) === 0 || e !== Ue) &&
        (e === Ue && ((Le & 2) === 0 && (Ra |= a), Fe === 4 && ca(e, Ee, Rt, !1)), gl(e)));
  }
  function nf(e, t, a) {
    if ((Le & 6) !== 0) throw Error(r(327));
    var n = (!a && (t & 127) === 0 && (t & e.expiredLanes) === 0) || Zn(e, t),
      s = n ? Gk(e, t) : Ou(e, t, !0),
      u = n;
    do {
      if (s === 0) {
        Sn && !n && ca(e, t, 0, !1);
        break;
      } else {
        if (((a = e.current.alternate), u && !Hk(a))) {
          ((s = Ou(e, t, !1)), (u = !1));
          continue;
        }
        if (s === 2) {
          if (((u = t), e.errorRecoveryDisabledLanes & u)) var m = 0;
          else
            ((m = e.pendingLanes & -536870913), (m = m !== 0 ? m : m & 536870912 ? 536870912 : 0));
          if (m !== 0) {
            t = m;
            e: {
              var g = e;
              s = Ni;
              var w = g.current.memoizedState.isDehydrated;
              if ((w && (En(g, m).flags |= 256), (m = Ou(g, m, !1)), m !== 2)) {
                if (Nu && !w) {
                  ((g.errorRecoveryDisabledLanes |= u), (Ra |= u), (s = 4));
                  break e;
                }
                ((u = jt), (jt = s), u !== null && (jt === null ? (jt = u) : jt.push.apply(jt, u)));
              }
              s = m;
            }
            if (((u = !1), s !== 2)) continue;
          }
        }
        if (s === 1) {
          (En(e, 0), ca(e, t, 0, !0));
          break;
        }
        e: {
          switch (((n = e), (u = s), u)) {
            case 0:
            case 1:
              throw Error(r(345));
            case 4:
              if ((t & 4194048) !== t) break;
            case 6:
              ca(n, t, Rt, !sa);
              break e;
            case 2:
              jt = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(r(329));
          }
          if ((t & 62914560) === t && ((s = Zs + 300 - yt()), 10 < s)) {
            if ((ca(n, t, Rt, !sa), rs(n, 0, !0) !== 0)) break e;
            ((Dl = t),
              (n.timeoutHandle = If(
                sf.bind(null, n, a, jt, Ps, Au, t, Rt, Ra, wn, sa, u, 'Throttled', -0, 0),
                s
              )));
            break e;
          }
          sf(n, a, jt, Ps, Au, t, Rt, Ra, wn, sa, u, null, -0, 0);
        }
      }
      break;
    } while (!0);
    gl(e);
  }
  function sf(e, t, a, n, s, u, m, g, w, D, Y, V, R, z) {
    if (((e.timeoutHandle = -1), (V = t.subtreeFlags), V & 8192 || (V & 16785408) === 16785408)) {
      ((V = {
        stylesheets: null,
        count: 0,
        imgCount: 0,
        imgBytes: 0,
        suspenseyImages: [],
        waitingForImages: !0,
        waitingForViewTransition: !1,
        unsuspend: xl,
      }),
        P_(t, u, V));
      var re = (u & 62914560) === u ? Zs - yt() : (u & 4194048) === u ? tf - yt() : 0;
      if (((re = wv(V, re)), re !== null)) {
        ((Dl = u),
          (e.cancelPendingCommit = re(ff.bind(null, e, t, u, a, n, s, m, g, w, Y, V, null, R, z))),
          ca(e, u, m, !D));
        return;
      }
    }
    ff(e, t, u, a, n, s, m, g, w);
  }
  function Hk(e) {
    for (var t = e; ; ) {
      var a = t.tag;
      if (
        (a === 0 || a === 11 || a === 15) &&
        t.flags & 16384 &&
        ((a = t.updateQueue), a !== null && ((a = a.stores), a !== null))
      )
        for (var n = 0; n < a.length; n++) {
          var s = a[n],
            u = s.getSnapshot;
          s = s.value;
          try {
            if (!Bt(u(), s)) return !1;
          } catch {
            return !1;
          }
        }
      if (((a = t.child), t.subtreeFlags & 16384 && a !== null)) ((a.return = t), (t = a));
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
  function ca(e, t, a, n) {
    ((t &= ~ju),
      (t &= ~Ra),
      (e.suspendedLanes |= t),
      (e.pingedLanes &= ~t),
      n && (e.warmLanes |= t),
      (n = e.expirationTimes));
    for (var s = t; 0 < s; ) {
      var u = 31 - qt(s),
        m = 1 << u;
      ((n[u] = -1), (s &= ~m));
    }
    a !== 0 && pd(e, a, t);
  }
  function Fs() {
    return (Le & 6) === 0 ? (Ai(0), !1) : !0;
  }
  function Mu() {
    if (we !== null) {
      if (Me === 0) var e = we.return;
      else ((e = we), (El = ja = null), Jo(e), (hn = null), (mi = 0), (e = we));
      for (; e !== null; ) (I_(e.alternate, e), (e = e.return));
      we = null;
    }
  }
  function En(e, t) {
    var a = e.timeoutHandle;
    (a !== -1 && ((e.timeoutHandle = -1), sv(a)),
      (a = e.cancelPendingCommit),
      a !== null && ((e.cancelPendingCommit = null), a()),
      (Dl = 0),
      Mu(),
      (Ue = e),
      (we = a = wl(e.current, null)),
      (Ee = t),
      (Me = 0),
      (Dt = null),
      (sa = !1),
      (Sn = Zn(e, t)),
      (Nu = !1),
      (wn = Rt = ju = Ra = ra = Fe = 0),
      (jt = Ni = null),
      (Au = !1),
      (t & 8) !== 0 && (t |= t & 32));
    var n = e.entangledLanes;
    if (n !== 0)
      for (e = e.entanglements, n &= t; 0 < n; ) {
        var s = 31 - qt(n),
          u = 1 << s;
        ((t |= e[s]), (n &= ~u));
      }
    return ((Il = t), vs(), a);
  }
  function rf(e, t) {
    ((ye = null),
      (L.H = yi),
      t === pn || t === Cs
        ? ((t = xm()), (Me = 3))
        : t === Ro
          ? ((t = xm()), (Me = 4))
          : (Me =
              t === mu
                ? 8
                : t !== null && typeof t == 'object' && typeof t.then == 'function'
                  ? 6
                  : 1),
      (Dt = t),
      we === null && ((Fe = 1), Us(e, Xt(t, e.current))));
  }
  function of() {
    var e = Ot.current;
    return e === null
      ? !0
      : (Ee & 4194048) === Ee
        ? Zt === null
        : (Ee & 62914560) === Ee || (Ee & 536870912) !== 0
          ? e === Zt
          : !1;
  }
  function uf() {
    var e = L.H;
    return ((L.H = yi), e === null ? yi : e);
  }
  function cf() {
    var e = L.A;
    return ((L.A = Rk), e);
  }
  function Ws() {
    ((Fe = 4),
      sa || ((Ee & 4194048) !== Ee && Ot.current !== null) || (Sn = !0),
      ((ra & 134217727) === 0 && (Ra & 134217727) === 0) || Ue === null || ca(Ue, Ee, Rt, !1));
  }
  function Ou(e, t, a) {
    var n = Le;
    Le |= 2;
    var s = uf(),
      u = cf();
    ((Ue !== e || Ee !== t) && ((Ps = null), En(e, t)), (t = !1));
    var m = Fe;
    e: do
      try {
        if (Me !== 0 && we !== null) {
          var g = we,
            w = Dt;
          switch (Me) {
            case 8:
              (Mu(), (m = 6));
              break e;
            case 3:
            case 2:
            case 9:
            case 6:
              Ot.current === null && (t = !0);
              var D = Me;
              if (((Me = 0), (Dt = null), Cn(e, g, w, D), a && Sn)) {
                m = 0;
                break e;
              }
              break;
            default:
              ((D = Me), (Me = 0), (Dt = null), Cn(e, g, w, D));
          }
        }
        (Uk(), (m = Fe));
        break;
      } catch (Y) {
        rf(e, Y);
      }
    while (!0);
    return (
      t && e.shellSuspendCounter++,
      (El = ja = null),
      (Le = n),
      (L.H = s),
      (L.A = u),
      we === null && ((Ue = null), (Ee = 0), vs()),
      m
    );
  }
  function Uk() {
    for (; we !== null; ) df(we);
  }
  function Gk(e, t) {
    var a = Le;
    Le |= 2;
    var n = uf(),
      s = cf();
    Ue !== e || Ee !== t ? ((Ps = null), (Js = yt() + 500), En(e, t)) : (Sn = Zn(e, t));
    e: do
      try {
        if (Me !== 0 && we !== null) {
          t = we;
          var u = Dt;
          t: switch (Me) {
            case 1:
              ((Me = 0), (Dt = null), Cn(e, t, u, 1));
              break;
            case 2:
            case 9:
              if (ym(u)) {
                ((Me = 0), (Dt = null), mf(t));
                break;
              }
              ((t = function () {
                ((Me !== 2 && Me !== 9) || Ue !== e || (Me = 7), gl(e));
              }),
                u.then(t, t));
              break e;
            case 3:
              Me = 7;
              break e;
            case 4:
              Me = 5;
              break e;
            case 7:
              ym(u) ? ((Me = 0), (Dt = null), mf(t)) : ((Me = 0), (Dt = null), Cn(e, t, u, 7));
              break;
            case 5:
              var m = null;
              switch (we.tag) {
                case 26:
                  m = we.memoizedState;
                case 5:
                case 27:
                  var g = we;
                  if (m ? Pf(m) : g.stateNode.complete) {
                    ((Me = 0), (Dt = null));
                    var w = g.sibling;
                    if (w !== null) we = w;
                    else {
                      var D = g.return;
                      D !== null ? ((we = D), er(D)) : (we = null);
                    }
                    break t;
                  }
              }
              ((Me = 0), (Dt = null), Cn(e, t, u, 5));
              break;
            case 6:
              ((Me = 0), (Dt = null), Cn(e, t, u, 6));
              break;
            case 8:
              (Mu(), (Fe = 6));
              break e;
            default:
              throw Error(r(462));
          }
        }
        $k();
        break;
      } catch (Y) {
        rf(e, Y);
      }
    while (!0);
    return (
      (El = ja = null),
      (L.H = n),
      (L.A = s),
      (Le = a),
      we !== null ? 0 : ((Ue = null), (Ee = 0), vs(), Fe)
    );
  }
  function $k() {
    for (; we !== null && !ts(); ) df(we);
  }
  function df(e) {
    var t = M_(e.alternate, e, Il);
    ((e.memoizedProps = e.pendingProps), t === null ? er(e) : (we = t));
  }
  function mf(e) {
    var t = e,
      a = t.alternate;
    switch (t.tag) {
      case 15:
      case 0:
        t = N_(a, t, t.pendingProps, t.type, void 0, Ee);
        break;
      case 11:
        t = N_(a, t, t.pendingProps, t.type.render, t.ref, Ee);
        break;
      case 5:
        Jo(t);
      default:
        (I_(a, t), (t = we = um(t, Il)), (t = M_(a, t, Il)));
    }
    ((e.memoizedProps = e.pendingProps), t === null ? er(e) : (we = t));
  }
  function Cn(e, t, a, n) {
    ((El = ja = null), Jo(t), (hn = null), (mi = 0));
    var s = t.return;
    try {
      if (Lk(e, s, t, a, Ee)) {
        ((Fe = 1), Us(e, Xt(a, e.current)), (we = null));
        return;
      }
    } catch (u) {
      if (s !== null) throw ((we = s), u);
      ((Fe = 1), Us(e, Xt(a, e.current)), (we = null));
      return;
    }
    t.flags & 32768
      ? (Ne || n === 1
          ? (e = !0)
          : Sn || (Ee & 536870912) !== 0
            ? (e = !1)
            : ((sa = e = !0),
              (n === 2 || n === 9 || n === 3 || n === 6) &&
                ((n = Ot.current), n !== null && n.tag === 13 && (n.flags |= 16384))),
        _f(t, e))
      : er(t);
  }
  function er(e) {
    var t = e;
    do {
      if ((t.flags & 32768) !== 0) {
        _f(t, sa);
        return;
      }
      e = t.return;
      var a = Mk(t.alternate, t, Il);
      if (a !== null) {
        we = a;
        return;
      }
      if (((t = t.sibling), t !== null)) {
        we = t;
        return;
      }
      we = t = e;
    } while (t !== null);
    Fe === 0 && (Fe = 5);
  }
  function _f(e, t) {
    do {
      var a = Ok(e.alternate, e);
      if (a !== null) {
        ((a.flags &= 32767), (we = a));
        return;
      }
      if (
        ((a = e.return),
        a !== null && ((a.flags |= 32768), (a.subtreeFlags = 0), (a.deletions = null)),
        !t && ((e = e.sibling), e !== null))
      ) {
        we = e;
        return;
      }
      we = e = a;
    } while (e !== null);
    ((Fe = 6), (we = null));
  }
  function ff(e, t, a, n, s, u, m, g, w) {
    e.cancelPendingCommit = null;
    do tr();
    while (ut !== 0);
    if ((Le & 6) !== 0) throw Error(r(327));
    if (t !== null) {
      if (t === e.current) throw Error(r(177));
      if (
        ((u = t.lanes | t.childLanes),
        (u |= So),
        xg(e, a, u, m, g, w),
        e === Ue && ((we = Ue = null), (Ee = 0)),
        (Tn = t),
        (ua = e),
        (Dl = a),
        (Lu = u),
        (qu = s),
        (lf = n),
        (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0
          ? ((e.callbackNode = null),
            (e.callbackPriority = 0),
            Qk(me, function () {
              return (vf(), null);
            }))
          : ((e.callbackNode = null), (e.callbackPriority = 0)),
        (n = (t.flags & 13878) !== 0),
        (t.subtreeFlags & 13878) !== 0 || n)
      ) {
        ((n = L.T), (L.T = null), (s = Q.p), (Q.p = 2), (m = Le), (Le |= 4));
        try {
          Ik(e, t, a);
        } finally {
          ((Le = m), (Q.p = s), (L.T = n));
        }
      }
      ((ut = 1), pf(), hf(), gf());
    }
  }
  function pf() {
    if (ut === 1) {
      ut = 0;
      var e = ua,
        t = Tn,
        a = (t.flags & 13878) !== 0;
      if ((t.subtreeFlags & 13878) !== 0 || a) {
        ((a = L.T), (L.T = null));
        var n = Q.p;
        Q.p = 2;
        var s = Le;
        Le |= 4;
        try {
          K_(t, e);
          var u = Qu,
            m = em(e.containerInfo),
            g = u.focusedElem,
            w = u.selectionRange;
          if (m !== g && g && g.ownerDocument && Wd(g.ownerDocument.documentElement, g)) {
            if (w !== null && ko(g)) {
              var D = w.start,
                Y = w.end;
              if ((Y === void 0 && (Y = D), 'selectionStart' in g))
                ((g.selectionStart = D), (g.selectionEnd = Math.min(Y, g.value.length)));
              else {
                var V = g.ownerDocument || document,
                  R = (V && V.defaultView) || window;
                if (R.getSelection) {
                  var z = R.getSelection(),
                    re = g.textContent.length,
                    fe = Math.min(w.start, re),
                    Re = w.end === void 0 ? fe : Math.min(w.end, re);
                  !z.extend && fe > Re && ((m = Re), (Re = fe), (fe = m));
                  var B = Fd(g, fe),
                    j = Fd(g, Re);
                  if (
                    B &&
                    j &&
                    (z.rangeCount !== 1 ||
                      z.anchorNode !== B.node ||
                      z.anchorOffset !== B.offset ||
                      z.focusNode !== j.node ||
                      z.focusOffset !== j.offset)
                  ) {
                    var I = V.createRange();
                    (I.setStart(B.node, B.offset),
                      z.removeAllRanges(),
                      fe > Re
                        ? (z.addRange(I), z.extend(j.node, j.offset))
                        : (I.setEnd(j.node, j.offset), z.addRange(I)));
                  }
                }
              }
            }
            for (V = [], z = g; (z = z.parentNode); )
              z.nodeType === 1 && V.push({ element: z, left: z.scrollLeft, top: z.scrollTop });
            for (typeof g.focus == 'function' && g.focus(), g = 0; g < V.length; g++) {
              var X = V[g];
              ((X.element.scrollLeft = X.left), (X.element.scrollTop = X.top));
            }
          }
          ((_r = !!Vu), (Qu = Vu = null));
        } finally {
          ((Le = s), (Q.p = n), (L.T = a));
        }
      }
      ((e.current = t), (ut = 2));
    }
  }
  function hf() {
    if (ut === 2) {
      ut = 0;
      var e = ua,
        t = Tn,
        a = (t.flags & 8772) !== 0;
      if ((t.subtreeFlags & 8772) !== 0 || a) {
        ((a = L.T), (L.T = null));
        var n = Q.p;
        Q.p = 2;
        var s = Le;
        Le |= 4;
        try {
          $_(e, t.alternate, t);
        } finally {
          ((Le = s), (Q.p = n), (L.T = a));
        }
      }
      ut = 3;
    }
  }
  function gf() {
    if (ut === 4 || ut === 3) {
      ((ut = 0), ls());
      var e = ua,
        t = Tn,
        a = Dl,
        n = lf;
      (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0
        ? (ut = 5)
        : ((ut = 0), (Tn = ua = null), kf(e, e.pendingLanes));
      var s = e.pendingLanes;
      if (
        (s === 0 && (oa = null),
        Fr(a),
        (t = t.stateNode),
        Lt && typeof Lt.onCommitFiberRoot == 'function')
      )
        try {
          Lt.onCommitFiberRoot(yl, t, void 0, (t.current.flags & 128) === 128);
        } catch {}
      if (n !== null) {
        ((t = L.T), (s = Q.p), (Q.p = 2), (L.T = null));
        try {
          for (var u = e.onRecoverableError, m = 0; m < n.length; m++) {
            var g = n[m];
            u(g.value, { componentStack: g.stack });
          }
        } finally {
          ((L.T = t), (Q.p = s));
        }
      }
      ((Dl & 3) !== 0 && tr(),
        gl(e),
        (s = e.pendingLanes),
        (a & 261930) !== 0 && (s & 42) !== 0 ? (e === Bu ? ji++ : ((ji = 0), (Bu = e))) : (ji = 0),
        Ai(0));
    }
  }
  function kf(e, t) {
    (e.pooledCacheLanes &= t) === 0 &&
      ((t = e.pooledCache), t != null && ((e.pooledCache = null), ci(t)));
  }
  function tr() {
    return (pf(), hf(), gf(), vf());
  }
  function vf() {
    if (ut !== 5) return !1;
    var e = ua,
      t = Lu;
    Lu = 0;
    var a = Fr(Dl),
      n = L.T,
      s = Q.p;
    try {
      ((Q.p = 32 > a ? 32 : a), (L.T = null), (a = qu), (qu = null));
      var u = ua,
        m = Dl;
      if (((ut = 0), (Tn = ua = null), (Dl = 0), (Le & 6) !== 0)) throw Error(r(331));
      var g = Le;
      if (
        ((Le |= 4),
        W_(u.current),
        J_(u, u.current, m, a),
        (Le = g),
        Ai(0, !1),
        Lt && typeof Lt.onPostCommitFiberRoot == 'function')
      )
        try {
          Lt.onPostCommitFiberRoot(yl, u);
        } catch {}
      return !0;
    } finally {
      ((Q.p = s), (L.T = n), kf(e, t));
    }
  }
  function yf(e, t, a) {
    ((t = Xt(a, t)),
      (t = du(e.stateNode, t, 2)),
      (e = la(e, t, 2)),
      e !== null && (Jn(e, 2), gl(e)));
  }
  function Oe(e, t, a) {
    if (e.tag === 3) yf(e, e, a);
    else
      for (; t !== null; ) {
        if (t.tag === 3) {
          yf(t, e, a);
          break;
        } else if (t.tag === 1) {
          var n = t.stateNode;
          if (
            typeof t.type.getDerivedStateFromError == 'function' ||
            (typeof n.componentDidCatch == 'function' && (oa === null || !oa.has(n)))
          ) {
            ((e = Xt(a, e)),
              (a = y_(2)),
              (n = la(t, a, 2)),
              n !== null && (b_(a, n, t, e), Jn(n, 2), gl(n)));
            break;
          }
        }
        t = t.return;
      }
  }
  function Iu(e, t, a) {
    var n = e.pingCache;
    if (n === null) {
      n = e.pingCache = new zk();
      var s = new Set();
      n.set(t, s);
    } else ((s = n.get(t)), s === void 0 && ((s = new Set()), n.set(t, s)));
    s.has(a) || ((Nu = !0), s.add(a), (e = Yk.bind(null, e, t, a)), t.then(e, e));
  }
  function Yk(e, t, a) {
    var n = e.pingCache;
    (n !== null && n.delete(t),
      (e.pingedLanes |= e.suspendedLanes & a),
      (e.warmLanes &= ~a),
      Ue === e &&
        (Ee & a) === a &&
        (Fe === 4 || (Fe === 3 && (Ee & 62914560) === Ee && 300 > yt() - Zs)
          ? (Le & 2) === 0 && En(e, 0)
          : (ju |= a),
        wn === Ee && (wn = 0)),
      gl(e));
  }
  function bf(e, t) {
    (t === 0 && (t = fd()), (e = Ea(e, t)), e !== null && (Jn(e, t), gl(e)));
  }
  function Xk(e) {
    var t = e.memoizedState,
      a = 0;
    (t !== null && (a = t.retryLane), bf(e, a));
  }
  function Vk(e, t) {
    var a = 0;
    switch (e.tag) {
      case 31:
      case 13:
        var n = e.stateNode,
          s = e.memoizedState;
        s !== null && (a = s.retryLane);
        break;
      case 19:
        n = e.stateNode;
        break;
      case 22:
        n = e.stateNode._retryCache;
        break;
      default:
        throw Error(r(314));
    }
    (n !== null && n.delete(t), bf(e, a));
  }
  function Qk(e, t) {
    return Va(e, t);
  }
  var lr = null,
    Nn = null,
    Du = !1,
    ar = !1,
    Ru = !1,
    da = 0;
  function gl(e) {
    (e !== Nn && e.next === null && (Nn === null ? (lr = Nn = e) : (Nn = Nn.next = e)),
      (ar = !0),
      Du || ((Du = !0), Zk()));
  }
  function Ai(e, t) {
    if (!Ru && ar) {
      Ru = !0;
      do
        for (var a = !1, n = lr; n !== null; ) {
          if (e !== 0) {
            var s = n.pendingLanes;
            if (s === 0) var u = 0;
            else {
              var m = n.suspendedLanes,
                g = n.pingedLanes;
              ((u = (1 << (31 - qt(42 | e) + 1)) - 1),
                (u &= s & ~(m & ~g)),
                (u = u & 201326741 ? (u & 201326741) | 1 : u ? u | 2 : 0));
            }
            u !== 0 && ((a = !0), Tf(n, u));
          } else
            ((u = Ee),
              (u = rs(
                n,
                n === Ue ? u : 0,
                n.cancelPendingCommit !== null || n.timeoutHandle !== -1
              )),
              (u & 3) === 0 || Zn(n, u) || ((a = !0), Tf(n, u)));
          n = n.next;
        }
      while (a);
      Ru = !1;
    }
  }
  function Kk() {
    xf();
  }
  function xf() {
    ar = Du = !1;
    var e = 0;
    da !== 0 && iv() && (e = da);
    for (var t = yt(), a = null, n = lr; n !== null; ) {
      var s = n.next,
        u = Sf(n, t);
      (u === 0
        ? ((n.next = null), a === null ? (lr = s) : (a.next = s), s === null && (Nn = a))
        : ((a = n), (e !== 0 || (u & 3) !== 0) && (ar = !0)),
        (n = s));
    }
    ((ut !== 0 && ut !== 5) || Ai(e), da !== 0 && (da = 0));
  }
  function Sf(e, t) {
    for (
      var a = e.suspendedLanes,
        n = e.pingedLanes,
        s = e.expirationTimes,
        u = e.pendingLanes & -62914561;
      0 < u;
    ) {
      var m = 31 - qt(u),
        g = 1 << m,
        w = s[m];
      (w === -1
        ? ((g & a) === 0 || (g & n) !== 0) && (s[m] = bg(g, t))
        : w <= t && (e.expiredLanes |= g),
        (u &= ~g));
    }
    if (
      ((t = Ue),
      (a = Ee),
      (a = rs(e, e === t ? a : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== -1)),
      (n = e.callbackNode),
      a === 0 || (e === t && (Me === 2 || Me === 9)) || e.cancelPendingCommit !== null)
    )
      return (n !== null && n !== null && Kn(n), (e.callbackNode = null), (e.callbackPriority = 0));
    if ((a & 3) === 0 || Zn(e, a)) {
      if (((t = a & -a), t === e.callbackPriority)) return t;
      switch ((n !== null && Kn(n), Fr(a))) {
        case 2:
        case 8:
          a = se;
          break;
        case 32:
          a = me;
          break;
        case 268435456:
          a = Vl;
          break;
        default:
          a = me;
      }
      return (
        (n = wf.bind(null, e)),
        (a = Va(a, n)),
        (e.callbackPriority = t),
        (e.callbackNode = a),
        t
      );
    }
    return (
      n !== null && n !== null && Kn(n),
      (e.callbackPriority = 2),
      (e.callbackNode = null),
      2
    );
  }
  function wf(e, t) {
    if (ut !== 0 && ut !== 5) return ((e.callbackNode = null), (e.callbackPriority = 0), null);
    var a = e.callbackNode;
    if (tr() && e.callbackNode !== a) return null;
    var n = Ee;
    return (
      (n = rs(e, e === Ue ? n : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== -1)),
      n === 0
        ? null
        : (nf(e, n, t),
          Sf(e, yt()),
          e.callbackNode != null && e.callbackNode === a ? wf.bind(null, e) : null)
    );
  }
  function Tf(e, t) {
    if (tr()) return null;
    nf(e, t, !0);
  }
  function Zk() {
    rv(function () {
      (Le & 6) !== 0 ? Va(W, Kk) : xf();
    });
  }
  function zu() {
    if (da === 0) {
      var e = _n;
      (e === 0 && ((e = ns), (ns <<= 1), (ns & 261888) === 0 && (ns = 256)), (da = e));
    }
    return da;
  }
  function Ef(e) {
    return e == null || typeof e == 'symbol' || typeof e == 'boolean'
      ? null
      : typeof e == 'function'
        ? e
        : ds('' + e);
  }
  function Cf(e, t) {
    var a = t.ownerDocument.createElement('input');
    return (
      (a.name = t.name),
      (a.value = t.value),
      e.id && a.setAttribute('form', e.id),
      t.parentNode.insertBefore(a, t),
      (e = new FormData(e)),
      a.parentNode.removeChild(a),
      e
    );
  }
  function Jk(e, t, a, n, s) {
    if (t === 'submit' && a && a.stateNode === s) {
      var u = Ef((s[wt] || null).action),
        m = n.submitter;
      m &&
        ((t = (t = m[wt] || null) ? Ef(t.formAction) : m.getAttribute('formAction')),
        t !== null && ((u = t), (m = null)));
      var g = new ps('action', 'action', null, n, s);
      e.push({
        event: g,
        listeners: [
          {
            instance: null,
            listener: function () {
              if (n.defaultPrevented) {
                if (da !== 0) {
                  var w = m ? Cf(s, m) : new FormData(s);
                  iu(a, { pending: !0, data: w, method: s.method, action: u }, null, w);
                }
              } else
                typeof u == 'function' &&
                  (g.preventDefault(),
                  (w = m ? Cf(s, m) : new FormData(s)),
                  iu(a, { pending: !0, data: w, method: s.method, action: u }, u, w));
            },
            currentTarget: s,
          },
        ],
      });
    }
  }
  for (var Hu = 0; Hu < xo.length; Hu++) {
    var Uu = xo[Hu],
      Pk = Uu.toLowerCase(),
      Fk = Uu[0].toUpperCase() + Uu.slice(1);
    tl(Pk, 'on' + Fk);
  }
  (tl(am, 'onAnimationEnd'),
    tl(nm, 'onAnimationIteration'),
    tl(im, 'onAnimationStart'),
    tl('dblclick', 'onDoubleClick'),
    tl('focusin', 'onFocus'),
    tl('focusout', 'onBlur'),
    tl(fk, 'onTransitionRun'),
    tl(pk, 'onTransitionStart'),
    tl(hk, 'onTransitionCancel'),
    tl(sm, 'onTransitionEnd'),
    Fa('onMouseEnter', ['mouseout', 'mouseover']),
    Fa('onMouseLeave', ['mouseout', 'mouseover']),
    Fa('onPointerEnter', ['pointerout', 'pointerover']),
    Fa('onPointerLeave', ['pointerout', 'pointerover']),
    xa('onChange', 'change click focusin focusout input keydown keyup selectionchange'.split(' ')),
    xa(
      'onSelect',
      'focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange'.split(
        ' '
      )
    ),
    xa('onBeforeInput', ['compositionend', 'keypress', 'textInput', 'paste']),
    xa('onCompositionEnd', 'compositionend focusout keydown keypress keyup mousedown'.split(' ')),
    xa(
      'onCompositionStart',
      'compositionstart focusout keydown keypress keyup mousedown'.split(' ')
    ),
    xa(
      'onCompositionUpdate',
      'compositionupdate focusout keydown keypress keyup mousedown'.split(' ')
    ));
  var Li =
      'abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting'.split(
        ' '
      ),
    Wk = new Set(
      'beforetoggle cancel close invalid load scroll scrollend toggle'.split(' ').concat(Li)
    );
  function Nf(e, t) {
    t = (t & 4) !== 0;
    for (var a = 0; a < e.length; a++) {
      var n = e[a],
        s = n.event;
      n = n.listeners;
      e: {
        var u = void 0;
        if (t)
          for (var m = n.length - 1; 0 <= m; m--) {
            var g = n[m],
              w = g.instance,
              D = g.currentTarget;
            if (((g = g.listener), w !== u && s.isPropagationStopped())) break e;
            ((u = g), (s.currentTarget = D));
            try {
              u(s);
            } catch (Y) {
              ks(Y);
            }
            ((s.currentTarget = null), (u = w));
          }
        else
          for (m = 0; m < n.length; m++) {
            if (
              ((g = n[m]),
              (w = g.instance),
              (D = g.currentTarget),
              (g = g.listener),
              w !== u && s.isPropagationStopped())
            )
              break e;
            ((u = g), (s.currentTarget = D));
            try {
              u(s);
            } catch (Y) {
              ks(Y);
            }
            ((s.currentTarget = null), (u = w));
          }
      }
    }
  }
  function Te(e, t) {
    var a = t[Wr];
    a === void 0 && (a = t[Wr] = new Set());
    var n = e + '__bubble';
    a.has(n) || (jf(t, e, 2, !1), a.add(n));
  }
  function Gu(e, t, a) {
    var n = 0;
    (t && (n |= 4), jf(a, e, n, t));
  }
  var nr = '_reactListening' + Math.random().toString(36).slice(2);
  function $u(e) {
    if (!e[nr]) {
      ((e[nr] = !0),
        bd.forEach(function (a) {
          a !== 'selectionchange' && (Wk.has(a) || Gu(a, !1, e), Gu(a, !0, e));
        }));
      var t = e.nodeType === 9 ? e : e.ownerDocument;
      t === null || t[nr] || ((t[nr] = !0), Gu('selectionchange', !1, t));
    }
  }
  function jf(e, t, a, n) {
    switch (np(t)) {
      case 2:
        var s = Cv;
        break;
      case 8:
        s = Nv;
        break;
      default:
        s = nc;
    }
    ((a = s.bind(null, t, a, e)),
      (s = void 0),
      !oo || (t !== 'touchstart' && t !== 'touchmove' && t !== 'wheel') || (s = !0),
      n
        ? s !== void 0
          ? e.addEventListener(t, a, { capture: !0, passive: s })
          : e.addEventListener(t, a, !0)
        : s !== void 0
          ? e.addEventListener(t, a, { passive: s })
          : e.addEventListener(t, a, !1));
  }
  function Yu(e, t, a, n, s) {
    var u = n;
    if ((t & 1) === 0 && (t & 2) === 0 && n !== null)
      e: for (;;) {
        if (n === null) return;
        var m = n.tag;
        if (m === 3 || m === 4) {
          var g = n.stateNode.containerInfo;
          if (g === s) break;
          if (m === 4)
            for (m = n.return; m !== null; ) {
              var w = m.tag;
              if ((w === 3 || w === 4) && m.stateNode.containerInfo === s) return;
              m = m.return;
            }
          for (; g !== null; ) {
            if (((m = Za(g)), m === null)) return;
            if (((w = m.tag), w === 5 || w === 6 || w === 26 || w === 27)) {
              n = u = m;
              continue e;
            }
            g = g.parentNode;
          }
        }
        n = n.return;
      }
    Bd(function () {
      var D = u,
        Y = so(a),
        V = [];
      e: {
        var R = rm.get(e);
        if (R !== void 0) {
          var z = ps,
            re = e;
          switch (e) {
            case 'keypress':
              if (_s(a) === 0) break e;
            case 'keydown':
            case 'keyup':
              z = Vg;
              break;
            case 'focusin':
              ((re = 'focus'), (z = _o));
              break;
            case 'focusout':
              ((re = 'blur'), (z = _o));
              break;
            case 'beforeblur':
            case 'afterblur':
              z = _o;
              break;
            case 'click':
              if (a.button === 2) break e;
            case 'auxclick':
            case 'dblclick':
            case 'mousedown':
            case 'mousemove':
            case 'mouseup':
            case 'mouseout':
            case 'mouseover':
            case 'contextmenu':
              z = Id;
              break;
            case 'drag':
            case 'dragend':
            case 'dragenter':
            case 'dragexit':
            case 'dragleave':
            case 'dragover':
            case 'dragstart':
            case 'drop':
              z = Mg;
              break;
            case 'touchcancel':
            case 'touchend':
            case 'touchmove':
            case 'touchstart':
              z = Zg;
              break;
            case am:
            case nm:
            case im:
              z = Dg;
              break;
            case sm:
              z = Pg;
              break;
            case 'scroll':
            case 'scrollend':
              z = qg;
              break;
            case 'wheel':
              z = Wg;
              break;
            case 'copy':
            case 'cut':
            case 'paste':
              z = zg;
              break;
            case 'gotpointercapture':
            case 'lostpointercapture':
            case 'pointercancel':
            case 'pointerdown':
            case 'pointermove':
            case 'pointerout':
            case 'pointerover':
            case 'pointerup':
              z = Rd;
              break;
            case 'toggle':
            case 'beforetoggle':
              z = tk;
          }
          var fe = (t & 4) !== 0,
            Re = !fe && (e === 'scroll' || e === 'scrollend'),
            B = fe ? (R !== null ? R + 'Capture' : null) : R;
          fe = [];
          for (var j = D, I; j !== null; ) {
            var X = j;
            if (
              ((I = X.stateNode),
              (X = X.tag),
              (X !== 5 && X !== 26 && X !== 27) ||
                I === null ||
                B === null ||
                ((X = Wn(j, B)), X != null && fe.push(qi(j, X, I))),
              Re)
            )
              break;
            j = j.return;
          }
          0 < fe.length && ((R = new z(R, re, null, a, Y)), V.push({ event: R, listeners: fe }));
        }
      }
      if ((t & 7) === 0) {
        e: {
          if (
            ((R = e === 'mouseover' || e === 'pointerover'),
            (z = e === 'mouseout' || e === 'pointerout'),
            R && a !== io && (re = a.relatedTarget || a.fromElement) && (Za(re) || re[Ka]))
          )
            break e;
          if (
            (z || R) &&
            ((R =
              Y.window === Y
                ? Y
                : (R = Y.ownerDocument)
                  ? R.defaultView || R.parentWindow
                  : window),
            z
              ? ((re = a.relatedTarget || a.toElement),
                (z = D),
                (re = re ? Za(re) : null),
                re !== null &&
                  ((Re = d(re)), (fe = re.tag), re !== Re || (fe !== 5 && fe !== 27 && fe !== 6)) &&
                  (re = null))
              : ((z = null), (re = D)),
            z !== re)
          ) {
            if (
              ((fe = Id),
              (X = 'onMouseLeave'),
              (B = 'onMouseEnter'),
              (j = 'mouse'),
              (e === 'pointerout' || e === 'pointerover') &&
                ((fe = Rd), (X = 'onPointerLeave'), (B = 'onPointerEnter'), (j = 'pointer')),
              (Re = z == null ? R : Fn(z)),
              (I = re == null ? R : Fn(re)),
              (R = new fe(X, j + 'leave', z, a, Y)),
              (R.target = Re),
              (R.relatedTarget = I),
              (X = null),
              Za(Y) === D &&
                ((fe = new fe(B, j + 'enter', re, a, Y)),
                (fe.target = I),
                (fe.relatedTarget = Re),
                (X = fe)),
              (Re = X),
              z && re)
            )
              t: {
                for (fe = ev, B = z, j = re, I = 0, X = B; X; X = fe(X)) I++;
                X = 0;
                for (var de = j; de; de = fe(de)) X++;
                for (; 0 < I - X; ) ((B = fe(B)), I--);
                for (; 0 < X - I; ) ((j = fe(j)), X--);
                for (; I--; ) {
                  if (B === j || (j !== null && B === j.alternate)) {
                    fe = B;
                    break t;
                  }
                  ((B = fe(B)), (j = fe(j)));
                }
                fe = null;
              }
            else fe = null;
            (z !== null && Af(V, R, z, fe, !1),
              re !== null && Re !== null && Af(V, Re, re, fe, !0));
          }
        }
        e: {
          if (
            ((R = D ? Fn(D) : window),
            (z = R.nodeName && R.nodeName.toLowerCase()),
            z === 'select' || (z === 'input' && R.type === 'file'))
          )
            var je = Vd;
          else if (Yd(R))
            if (Qd) je = dk;
            else {
              je = uk;
              var oe = ok;
            }
          else
            ((z = R.nodeName),
              !z || z.toLowerCase() !== 'input' || (R.type !== 'checkbox' && R.type !== 'radio')
                ? D && no(D.elementType) && (je = Vd)
                : (je = ck));
          if (je && (je = je(e, D))) {
            Xd(V, je, a, Y);
            break e;
          }
          (oe && oe(e, R, D),
            e === 'focusout' &&
              D &&
              R.type === 'number' &&
              D.memoizedProps.value != null &&
              ao(R, 'number', R.value));
        }
        switch (((oe = D ? Fn(D) : window), e)) {
          case 'focusin':
            (Yd(oe) || oe.contentEditable === 'true') && ((nn = oe), (vo = D), (ri = null));
            break;
          case 'focusout':
            ri = vo = nn = null;
            break;
          case 'mousedown':
            yo = !0;
            break;
          case 'contextmenu':
          case 'mouseup':
          case 'dragend':
            ((yo = !1), tm(V, a, Y));
            break;
          case 'selectionchange':
            if (_k) break;
          case 'keydown':
          case 'keyup':
            tm(V, a, Y);
        }
        var xe;
        if (po)
          e: {
            switch (e) {
              case 'compositionstart':
                var Ce = 'onCompositionStart';
                break e;
              case 'compositionend':
                Ce = 'onCompositionEnd';
                break e;
              case 'compositionupdate':
                Ce = 'onCompositionUpdate';
                break e;
            }
            Ce = void 0;
          }
        else
          an
            ? Gd(e, a) && (Ce = 'onCompositionEnd')
            : e === 'keydown' && a.keyCode === 229 && (Ce = 'onCompositionStart');
        (Ce &&
          (zd &&
            a.locale !== 'ko' &&
            (an || Ce !== 'onCompositionStart'
              ? Ce === 'onCompositionEnd' && an && (xe = Md())
              : ((Zl = Y), (uo = 'value' in Zl ? Zl.value : Zl.textContent), (an = !0))),
          (oe = ir(D, Ce)),
          0 < oe.length &&
            ((Ce = new Dd(Ce, e, null, a, Y)),
            V.push({ event: Ce, listeners: oe }),
            xe ? (Ce.data = xe) : ((xe = $d(a)), xe !== null && (Ce.data = xe)))),
          (xe = ak ? nk(e, a) : ik(e, a)) &&
            ((Ce = ir(D, 'onBeforeInput')),
            0 < Ce.length &&
              ((oe = new Dd('onBeforeInput', 'beforeinput', null, a, Y)),
              V.push({ event: oe, listeners: Ce }),
              (oe.data = xe))),
          Jk(V, e, D, a, Y));
      }
      Nf(V, t);
    });
  }
  function qi(e, t, a) {
    return { instance: e, listener: t, currentTarget: a };
  }
  function ir(e, t) {
    for (var a = t + 'Capture', n = []; e !== null; ) {
      var s = e,
        u = s.stateNode;
      if (
        ((s = s.tag),
        (s !== 5 && s !== 26 && s !== 27) ||
          u === null ||
          ((s = Wn(e, a)),
          s != null && n.unshift(qi(e, s, u)),
          (s = Wn(e, t)),
          s != null && n.push(qi(e, s, u))),
        e.tag === 3)
      )
        return n;
      e = e.return;
    }
    return [];
  }
  function ev(e) {
    if (e === null) return null;
    do e = e.return;
    while (e && e.tag !== 5 && e.tag !== 27);
    return e || null;
  }
  function Af(e, t, a, n, s) {
    for (var u = t._reactName, m = []; a !== null && a !== n; ) {
      var g = a,
        w = g.alternate,
        D = g.stateNode;
      if (((g = g.tag), w !== null && w === n)) break;
      ((g !== 5 && g !== 26 && g !== 27) ||
        D === null ||
        ((w = D),
        s
          ? ((D = Wn(a, u)), D != null && m.unshift(qi(a, D, w)))
          : s || ((D = Wn(a, u)), D != null && m.push(qi(a, D, w)))),
        (a = a.return));
    }
    m.length !== 0 && e.push({ event: t, listeners: m });
  }
  var tv = /\r\n?/g,
    lv = /\u0000|\uFFFD/g;
  function Lf(e) {
    return (typeof e == 'string' ? e : '' + e)
      .replace(
        tv,
        `
`
      )
      .replace(lv, '');
  }
  function qf(e, t) {
    return ((t = Lf(t)), Lf(e) === t);
  }
  function De(e, t, a, n, s, u) {
    switch (a) {
      case 'children':
        typeof n == 'string'
          ? t === 'body' || (t === 'textarea' && n === '') || en(e, n)
          : (typeof n == 'number' || typeof n == 'bigint') && t !== 'body' && en(e, '' + n);
        break;
      case 'className':
        us(e, 'class', n);
        break;
      case 'tabIndex':
        us(e, 'tabindex', n);
        break;
      case 'dir':
      case 'role':
      case 'viewBox':
      case 'width':
      case 'height':
        us(e, a, n);
        break;
      case 'style':
        Ld(e, n, u);
        break;
      case 'data':
        if (t !== 'object') {
          us(e, 'data', n);
          break;
        }
      case 'src':
      case 'href':
        if (n === '' && (t !== 'a' || a !== 'href')) {
          e.removeAttribute(a);
          break;
        }
        if (n == null || typeof n == 'function' || typeof n == 'symbol' || typeof n == 'boolean') {
          e.removeAttribute(a);
          break;
        }
        ((n = ds('' + n)), e.setAttribute(a, n));
        break;
      case 'action':
      case 'formAction':
        if (typeof n == 'function') {
          e.setAttribute(
            a,
            "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')"
          );
          break;
        } else
          typeof u == 'function' &&
            (a === 'formAction'
              ? (t !== 'input' && De(e, t, 'name', s.name, s, null),
                De(e, t, 'formEncType', s.formEncType, s, null),
                De(e, t, 'formMethod', s.formMethod, s, null),
                De(e, t, 'formTarget', s.formTarget, s, null))
              : (De(e, t, 'encType', s.encType, s, null),
                De(e, t, 'method', s.method, s, null),
                De(e, t, 'target', s.target, s, null)));
        if (n == null || typeof n == 'symbol' || typeof n == 'boolean') {
          e.removeAttribute(a);
          break;
        }
        ((n = ds('' + n)), e.setAttribute(a, n));
        break;
      case 'onClick':
        n != null && (e.onclick = xl);
        break;
      case 'onScroll':
        n != null && Te('scroll', e);
        break;
      case 'onScrollEnd':
        n != null && Te('scrollend', e);
        break;
      case 'dangerouslySetInnerHTML':
        if (n != null) {
          if (typeof n != 'object' || !('__html' in n)) throw Error(r(61));
          if (((a = n.__html), a != null)) {
            if (s.children != null) throw Error(r(60));
            e.innerHTML = a;
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
        ((a = ds('' + n)), e.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', a));
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
          ? e.setAttribute(a, '' + n)
          : e.removeAttribute(a);
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
          ? e.setAttribute(a, '')
          : e.removeAttribute(a);
        break;
      case 'capture':
      case 'download':
        n === !0
          ? e.setAttribute(a, '')
          : n !== !1 && n != null && typeof n != 'function' && typeof n != 'symbol'
            ? e.setAttribute(a, n)
            : e.removeAttribute(a);
        break;
      case 'cols':
      case 'rows':
      case 'size':
      case 'span':
        n != null && typeof n != 'function' && typeof n != 'symbol' && !isNaN(n) && 1 <= n
          ? e.setAttribute(a, n)
          : e.removeAttribute(a);
        break;
      case 'rowSpan':
      case 'start':
        n == null || typeof n == 'function' || typeof n == 'symbol' || isNaN(n)
          ? e.removeAttribute(a)
          : e.setAttribute(a, n);
        break;
      case 'popover':
        (Te('beforetoggle', e), Te('toggle', e), os(e, 'popover', n));
        break;
      case 'xlinkActuate':
        bl(e, 'http://www.w3.org/1999/xlink', 'xlink:actuate', n);
        break;
      case 'xlinkArcrole':
        bl(e, 'http://www.w3.org/1999/xlink', 'xlink:arcrole', n);
        break;
      case 'xlinkRole':
        bl(e, 'http://www.w3.org/1999/xlink', 'xlink:role', n);
        break;
      case 'xlinkShow':
        bl(e, 'http://www.w3.org/1999/xlink', 'xlink:show', n);
        break;
      case 'xlinkTitle':
        bl(e, 'http://www.w3.org/1999/xlink', 'xlink:title', n);
        break;
      case 'xlinkType':
        bl(e, 'http://www.w3.org/1999/xlink', 'xlink:type', n);
        break;
      case 'xmlBase':
        bl(e, 'http://www.w3.org/XML/1998/namespace', 'xml:base', n);
        break;
      case 'xmlLang':
        bl(e, 'http://www.w3.org/XML/1998/namespace', 'xml:lang', n);
        break;
      case 'xmlSpace':
        bl(e, 'http://www.w3.org/XML/1998/namespace', 'xml:space', n);
        break;
      case 'is':
        os(e, 'is', n);
        break;
      case 'innerText':
      case 'textContent':
        break;
      default:
        (!(2 < a.length) || (a[0] !== 'o' && a[0] !== 'O') || (a[1] !== 'n' && a[1] !== 'N')) &&
          ((a = Ag.get(a) || a), os(e, a, n));
    }
  }
  function Xu(e, t, a, n, s, u) {
    switch (a) {
      case 'style':
        Ld(e, n, u);
        break;
      case 'dangerouslySetInnerHTML':
        if (n != null) {
          if (typeof n != 'object' || !('__html' in n)) throw Error(r(61));
          if (((a = n.__html), a != null)) {
            if (s.children != null) throw Error(r(60));
            e.innerHTML = a;
          }
        }
        break;
      case 'children':
        typeof n == 'string'
          ? en(e, n)
          : (typeof n == 'number' || typeof n == 'bigint') && en(e, '' + n);
        break;
      case 'onScroll':
        n != null && Te('scroll', e);
        break;
      case 'onScrollEnd':
        n != null && Te('scrollend', e);
        break;
      case 'onClick':
        n != null && (e.onclick = xl);
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
        if (!xd.hasOwnProperty(a))
          e: {
            if (
              a[0] === 'o' &&
              a[1] === 'n' &&
              ((s = a.endsWith('Capture')),
              (t = a.slice(2, s ? a.length - 7 : void 0)),
              (u = e[wt] || null),
              (u = u != null ? u[a] : null),
              typeof u == 'function' && e.removeEventListener(t, u, s),
              typeof n == 'function')
            ) {
              (typeof u != 'function' &&
                u !== null &&
                (a in e ? (e[a] = null) : e.hasAttribute(a) && e.removeAttribute(a)),
                e.addEventListener(t, n, s));
              break e;
            }
            a in e ? (e[a] = n) : n === !0 ? e.setAttribute(a, '') : os(e, a, n);
          }
    }
  }
  function kt(e, t, a) {
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
        (Te('error', e), Te('load', e));
        var n = !1,
          s = !1,
          u;
        for (u in a)
          if (a.hasOwnProperty(u)) {
            var m = a[u];
            if (m != null)
              switch (u) {
                case 'src':
                  n = !0;
                  break;
                case 'srcSet':
                  s = !0;
                  break;
                case 'children':
                case 'dangerouslySetInnerHTML':
                  throw Error(r(137, t));
                default:
                  De(e, t, u, m, a, null);
              }
          }
        (s && De(e, t, 'srcSet', a.srcSet, a, null), n && De(e, t, 'src', a.src, a, null));
        return;
      case 'input':
        Te('invalid', e);
        var g = (u = m = s = null),
          w = null,
          D = null;
        for (n in a)
          if (a.hasOwnProperty(n)) {
            var Y = a[n];
            if (Y != null)
              switch (n) {
                case 'name':
                  s = Y;
                  break;
                case 'type':
                  m = Y;
                  break;
                case 'checked':
                  w = Y;
                  break;
                case 'defaultChecked':
                  D = Y;
                  break;
                case 'value':
                  u = Y;
                  break;
                case 'defaultValue':
                  g = Y;
                  break;
                case 'children':
                case 'dangerouslySetInnerHTML':
                  if (Y != null) throw Error(r(137, t));
                  break;
                default:
                  De(e, t, n, Y, a, null);
              }
          }
        Cd(e, u, g, w, D, m, s, !1);
        return;
      case 'select':
        (Te('invalid', e), (n = m = u = null));
        for (s in a)
          if (a.hasOwnProperty(s) && ((g = a[s]), g != null))
            switch (s) {
              case 'value':
                u = g;
                break;
              case 'defaultValue':
                m = g;
                break;
              case 'multiple':
                n = g;
              default:
                De(e, t, s, g, a, null);
            }
        ((t = u),
          (a = m),
          (e.multiple = !!n),
          t != null ? Wa(e, !!n, t, !1) : a != null && Wa(e, !!n, a, !0));
        return;
      case 'textarea':
        (Te('invalid', e), (u = s = n = null));
        for (m in a)
          if (a.hasOwnProperty(m) && ((g = a[m]), g != null))
            switch (m) {
              case 'value':
                n = g;
                break;
              case 'defaultValue':
                s = g;
                break;
              case 'children':
                u = g;
                break;
              case 'dangerouslySetInnerHTML':
                if (g != null) throw Error(r(91));
                break;
              default:
                De(e, t, m, g, a, null);
            }
        jd(e, n, s, u);
        return;
      case 'option':
        for (w in a)
          if (a.hasOwnProperty(w) && ((n = a[w]), n != null))
            switch (w) {
              case 'selected':
                e.selected = n && typeof n != 'function' && typeof n != 'symbol';
                break;
              default:
                De(e, t, w, n, a, null);
            }
        return;
      case 'dialog':
        (Te('beforetoggle', e), Te('toggle', e), Te('cancel', e), Te('close', e));
        break;
      case 'iframe':
      case 'object':
        Te('load', e);
        break;
      case 'video':
      case 'audio':
        for (n = 0; n < Li.length; n++) Te(Li[n], e);
        break;
      case 'image':
        (Te('error', e), Te('load', e));
        break;
      case 'details':
        Te('toggle', e);
        break;
      case 'embed':
      case 'source':
      case 'link':
        (Te('error', e), Te('load', e));
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
        for (D in a)
          if (a.hasOwnProperty(D) && ((n = a[D]), n != null))
            switch (D) {
              case 'children':
              case 'dangerouslySetInnerHTML':
                throw Error(r(137, t));
              default:
                De(e, t, D, n, a, null);
            }
        return;
      default:
        if (no(t)) {
          for (Y in a)
            a.hasOwnProperty(Y) && ((n = a[Y]), n !== void 0 && Xu(e, t, Y, n, a, void 0));
          return;
        }
    }
    for (g in a) a.hasOwnProperty(g) && ((n = a[g]), n != null && De(e, t, g, n, a, null));
  }
  function av(e, t, a, n) {
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
        var s = null,
          u = null,
          m = null,
          g = null,
          w = null,
          D = null,
          Y = null;
        for (z in a) {
          var V = a[z];
          if (a.hasOwnProperty(z) && V != null)
            switch (z) {
              case 'checked':
                break;
              case 'value':
                break;
              case 'defaultValue':
                w = V;
              default:
                n.hasOwnProperty(z) || De(e, t, z, null, n, V);
            }
        }
        for (var R in n) {
          var z = n[R];
          if (((V = a[R]), n.hasOwnProperty(R) && (z != null || V != null)))
            switch (R) {
              case 'type':
                u = z;
                break;
              case 'name':
                s = z;
                break;
              case 'checked':
                D = z;
                break;
              case 'defaultChecked':
                Y = z;
                break;
              case 'value':
                m = z;
                break;
              case 'defaultValue':
                g = z;
                break;
              case 'children':
              case 'dangerouslySetInnerHTML':
                if (z != null) throw Error(r(137, t));
                break;
              default:
                z !== V && De(e, t, R, z, n, V);
            }
        }
        lo(e, m, g, w, D, Y, u, s);
        return;
      case 'select':
        z = m = g = R = null;
        for (u in a)
          if (((w = a[u]), a.hasOwnProperty(u) && w != null))
            switch (u) {
              case 'value':
                break;
              case 'multiple':
                z = w;
              default:
                n.hasOwnProperty(u) || De(e, t, u, null, n, w);
            }
        for (s in n)
          if (((u = n[s]), (w = a[s]), n.hasOwnProperty(s) && (u != null || w != null)))
            switch (s) {
              case 'value':
                R = u;
                break;
              case 'defaultValue':
                g = u;
                break;
              case 'multiple':
                m = u;
              default:
                u !== w && De(e, t, s, u, n, w);
            }
        ((t = g),
          (a = m),
          (n = z),
          R != null
            ? Wa(e, !!a, R, !1)
            : !!n != !!a && (t != null ? Wa(e, !!a, t, !0) : Wa(e, !!a, a ? [] : '', !1)));
        return;
      case 'textarea':
        z = R = null;
        for (g in a)
          if (((s = a[g]), a.hasOwnProperty(g) && s != null && !n.hasOwnProperty(g)))
            switch (g) {
              case 'value':
                break;
              case 'children':
                break;
              default:
                De(e, t, g, null, n, s);
            }
        for (m in n)
          if (((s = n[m]), (u = a[m]), n.hasOwnProperty(m) && (s != null || u != null)))
            switch (m) {
              case 'value':
                R = s;
                break;
              case 'defaultValue':
                z = s;
                break;
              case 'children':
                break;
              case 'dangerouslySetInnerHTML':
                if (s != null) throw Error(r(91));
                break;
              default:
                s !== u && De(e, t, m, s, n, u);
            }
        Nd(e, R, z);
        return;
      case 'option':
        for (var re in a)
          if (((R = a[re]), a.hasOwnProperty(re) && R != null && !n.hasOwnProperty(re)))
            switch (re) {
              case 'selected':
                e.selected = !1;
                break;
              default:
                De(e, t, re, null, n, R);
            }
        for (w in n)
          if (((R = n[w]), (z = a[w]), n.hasOwnProperty(w) && R !== z && (R != null || z != null)))
            switch (w) {
              case 'selected':
                e.selected = R && typeof R != 'function' && typeof R != 'symbol';
                break;
              default:
                De(e, t, w, R, n, z);
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
        for (var fe in a)
          ((R = a[fe]),
            a.hasOwnProperty(fe) && R != null && !n.hasOwnProperty(fe) && De(e, t, fe, null, n, R));
        for (D in n)
          if (((R = n[D]), (z = a[D]), n.hasOwnProperty(D) && R !== z && (R != null || z != null)))
            switch (D) {
              case 'children':
              case 'dangerouslySetInnerHTML':
                if (R != null) throw Error(r(137, t));
                break;
              default:
                De(e, t, D, R, n, z);
            }
        return;
      default:
        if (no(t)) {
          for (var Re in a)
            ((R = a[Re]),
              a.hasOwnProperty(Re) &&
                R !== void 0 &&
                !n.hasOwnProperty(Re) &&
                Xu(e, t, Re, void 0, n, R));
          for (Y in n)
            ((R = n[Y]),
              (z = a[Y]),
              !n.hasOwnProperty(Y) ||
                R === z ||
                (R === void 0 && z === void 0) ||
                Xu(e, t, Y, R, n, z));
          return;
        }
    }
    for (var B in a)
      ((R = a[B]),
        a.hasOwnProperty(B) && R != null && !n.hasOwnProperty(B) && De(e, t, B, null, n, R));
    for (V in n)
      ((R = n[V]),
        (z = a[V]),
        !n.hasOwnProperty(V) || R === z || (R == null && z == null) || De(e, t, V, R, n, z));
  }
  function Bf(e) {
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
  function nv() {
    if (typeof performance.getEntriesByType == 'function') {
      for (
        var e = 0, t = 0, a = performance.getEntriesByType('resource'), n = 0;
        n < a.length;
        n++
      ) {
        var s = a[n],
          u = s.transferSize,
          m = s.initiatorType,
          g = s.duration;
        if (u && g && Bf(m)) {
          for (m = 0, g = s.responseEnd, n += 1; n < a.length; n++) {
            var w = a[n],
              D = w.startTime;
            if (D > g) break;
            var Y = w.transferSize,
              V = w.initiatorType;
            Y && Bf(V) && ((w = w.responseEnd), (m += Y * (w < g ? 1 : (g - D) / (w - D))));
          }
          if ((--n, (t += (8 * (u + m)) / (s.duration / 1e3)), e++, 10 < e)) break;
        }
      }
      if (0 < e) return t / e / 1e6;
    }
    return navigator.connection && ((e = navigator.connection.downlink), typeof e == 'number')
      ? e
      : 5;
  }
  var Vu = null,
    Qu = null;
  function sr(e) {
    return e.nodeType === 9 ? e : e.ownerDocument;
  }
  function Mf(e) {
    switch (e) {
      case 'http://www.w3.org/2000/svg':
        return 1;
      case 'http://www.w3.org/1998/Math/MathML':
        return 2;
      default:
        return 0;
    }
  }
  function Of(e, t) {
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
  function Ku(e, t) {
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
  var Zu = null;
  function iv() {
    var e = window.event;
    return e && e.type === 'popstate' ? (e === Zu ? !1 : ((Zu = e), !0)) : ((Zu = null), !1);
  }
  var If = typeof setTimeout == 'function' ? setTimeout : void 0,
    sv = typeof clearTimeout == 'function' ? clearTimeout : void 0,
    Df = typeof Promise == 'function' ? Promise : void 0,
    rv =
      typeof queueMicrotask == 'function'
        ? queueMicrotask
        : typeof Df < 'u'
          ? function (e) {
              return Df.resolve(null).then(e).catch(ov);
            }
          : If;
  function ov(e) {
    setTimeout(function () {
      throw e;
    });
  }
  function ma(e) {
    return e === 'head';
  }
  function Rf(e, t) {
    var a = t,
      n = 0;
    do {
      var s = a.nextSibling;
      if ((e.removeChild(a), s && s.nodeType === 8))
        if (((a = s.data), a === '/$' || a === '/&')) {
          if (n === 0) {
            (e.removeChild(s), qn(t));
            return;
          }
          n--;
        } else if (a === '$' || a === '$?' || a === '$~' || a === '$!' || a === '&') n++;
        else if (a === 'html') Bi(e.ownerDocument.documentElement);
        else if (a === 'head') {
          ((a = e.ownerDocument.head), Bi(a));
          for (var u = a.firstChild; u; ) {
            var m = u.nextSibling,
              g = u.nodeName;
            (u[Pn] ||
              g === 'SCRIPT' ||
              g === 'STYLE' ||
              (g === 'LINK' && u.rel.toLowerCase() === 'stylesheet') ||
              a.removeChild(u),
              (u = m));
          }
        } else a === 'body' && Bi(e.ownerDocument.body);
      a = s;
    } while (a);
    qn(t);
  }
  function zf(e, t) {
    var a = e;
    e = 0;
    do {
      var n = a.nextSibling;
      if (
        (a.nodeType === 1
          ? t
            ? ((a._stashedDisplay = a.style.display), (a.style.display = 'none'))
            : ((a.style.display = a._stashedDisplay || ''),
              a.getAttribute('style') === '' && a.removeAttribute('style'))
          : a.nodeType === 3 &&
            (t
              ? ((a._stashedText = a.nodeValue), (a.nodeValue = ''))
              : (a.nodeValue = a._stashedText || '')),
        n && n.nodeType === 8)
      )
        if (((a = n.data), a === '/$')) {
          if (e === 0) break;
          e--;
        } else (a !== '$' && a !== '$?' && a !== '$~' && a !== '$!') || e++;
      a = n;
    } while (a);
  }
  function Ju(e) {
    var t = e.firstChild;
    for (t && t.nodeType === 10 && (t = t.nextSibling); t; ) {
      var a = t;
      switch (((t = t.nextSibling), a.nodeName)) {
        case 'HTML':
        case 'HEAD':
        case 'BODY':
          (Ju(a), eo(a));
          continue;
        case 'SCRIPT':
        case 'STYLE':
          continue;
        case 'LINK':
          if (a.rel.toLowerCase() === 'stylesheet') continue;
      }
      e.removeChild(a);
    }
  }
  function uv(e, t, a, n) {
    for (; e.nodeType === 1; ) {
      var s = a;
      if (e.nodeName.toLowerCase() !== t.toLowerCase()) {
        if (!n && (e.nodeName !== 'INPUT' || e.type !== 'hidden')) break;
      } else if (n) {
        if (!e[Pn])
          switch (t) {
            case 'meta':
              if (!e.hasAttribute('itemprop')) break;
              return e;
            case 'link':
              if (
                ((u = e.getAttribute('rel')),
                u === 'stylesheet' && e.hasAttribute('data-precedence'))
              )
                break;
              if (
                u !== s.rel ||
                e.getAttribute('href') !== (s.href == null || s.href === '' ? null : s.href) ||
                e.getAttribute('crossorigin') !== (s.crossOrigin == null ? null : s.crossOrigin) ||
                e.getAttribute('title') !== (s.title == null ? null : s.title)
              )
                break;
              return e;
            case 'style':
              if (e.hasAttribute('data-precedence')) break;
              return e;
            case 'script':
              if (
                ((u = e.getAttribute('src')),
                (u !== (s.src == null ? null : s.src) ||
                  e.getAttribute('type') !== (s.type == null ? null : s.type) ||
                  e.getAttribute('crossorigin') !==
                    (s.crossOrigin == null ? null : s.crossOrigin)) &&
                  u &&
                  e.hasAttribute('async') &&
                  !e.hasAttribute('itemprop'))
              )
                break;
              return e;
            default:
              return e;
          }
      } else if (t === 'input' && e.type === 'hidden') {
        var u = s.name == null ? null : '' + s.name;
        if (s.type === 'hidden' && e.getAttribute('name') === u) return e;
      } else return e;
      if (((e = Jt(e.nextSibling)), e === null)) break;
    }
    return null;
  }
  function cv(e, t, a) {
    if (t === '') return null;
    for (; e.nodeType !== 3; )
      if (
        ((e.nodeType !== 1 || e.nodeName !== 'INPUT' || e.type !== 'hidden') && !a) ||
        ((e = Jt(e.nextSibling)), e === null)
      )
        return null;
    return e;
  }
  function Hf(e, t) {
    for (; e.nodeType !== 8; )
      if (
        ((e.nodeType !== 1 || e.nodeName !== 'INPUT' || e.type !== 'hidden') && !t) ||
        ((e = Jt(e.nextSibling)), e === null)
      )
        return null;
    return e;
  }
  function Pu(e) {
    return e.data === '$?' || e.data === '$~';
  }
  function Fu(e) {
    return e.data === '$!' || (e.data === '$?' && e.ownerDocument.readyState !== 'loading');
  }
  function dv(e, t) {
    var a = e.ownerDocument;
    if (e.data === '$~') e._reactRetry = t;
    else if (e.data !== '$?' || a.readyState !== 'loading') t();
    else {
      var n = function () {
        (t(), a.removeEventListener('DOMContentLoaded', n));
      };
      (a.addEventListener('DOMContentLoaded', n), (e._reactRetry = n));
    }
  }
  function Jt(e) {
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
  var Wu = null;
  function Uf(e) {
    e = e.nextSibling;
    for (var t = 0; e; ) {
      if (e.nodeType === 8) {
        var a = e.data;
        if (a === '/$' || a === '/&') {
          if (t === 0) return Jt(e.nextSibling);
          t--;
        } else (a !== '$' && a !== '$!' && a !== '$?' && a !== '$~' && a !== '&') || t++;
      }
      e = e.nextSibling;
    }
    return null;
  }
  function Gf(e) {
    e = e.previousSibling;
    for (var t = 0; e; ) {
      if (e.nodeType === 8) {
        var a = e.data;
        if (a === '$' || a === '$!' || a === '$?' || a === '$~' || a === '&') {
          if (t === 0) return e;
          t--;
        } else (a !== '/$' && a !== '/&') || t++;
      }
      e = e.previousSibling;
    }
    return null;
  }
  function $f(e, t, a) {
    switch (((t = sr(a)), e)) {
      case 'html':
        if (((e = t.documentElement), !e)) throw Error(r(452));
        return e;
      case 'head':
        if (((e = t.head), !e)) throw Error(r(453));
        return e;
      case 'body':
        if (((e = t.body), !e)) throw Error(r(454));
        return e;
      default:
        throw Error(r(451));
    }
  }
  function Bi(e) {
    for (var t = e.attributes; t.length; ) e.removeAttributeNode(t[0]);
    eo(e);
  }
  var Pt = new Map(),
    Yf = new Set();
  function rr(e) {
    return typeof e.getRootNode == 'function'
      ? e.getRootNode()
      : e.nodeType === 9
        ? e
        : e.ownerDocument;
  }
  var Rl = Q.d;
  Q.d = { f: mv, r: _v, D: fv, C: pv, L: hv, m: gv, X: vv, S: kv, M: yv };
  function mv() {
    var e = Rl.f(),
      t = Fs();
    return e || t;
  }
  function _v(e) {
    var t = Ja(e);
    t !== null && t.tag === 5 && t.type === 'form' ? s_(t) : Rl.r(e);
  }
  var jn = typeof document > 'u' ? null : document;
  function Xf(e, t, a) {
    var n = jn;
    if (n && typeof t == 'string' && t) {
      var s = $t(t);
      ((s = 'link[rel="' + e + '"][href="' + s + '"]'),
        typeof a == 'string' && (s += '[crossorigin="' + a + '"]'),
        Yf.has(s) ||
          (Yf.add(s),
          (e = { rel: e, crossOrigin: a, href: t }),
          n.querySelector(s) === null &&
            ((t = n.createElement('link')), kt(t, 'link', e), ct(t), n.head.appendChild(t))));
    }
  }
  function fv(e) {
    (Rl.D(e), Xf('dns-prefetch', e, null));
  }
  function pv(e, t) {
    (Rl.C(e, t), Xf('preconnect', e, t));
  }
  function hv(e, t, a) {
    Rl.L(e, t, a);
    var n = jn;
    if (n && e && t) {
      var s = 'link[rel="preload"][as="' + $t(t) + '"]';
      t === 'image' && a && a.imageSrcSet
        ? ((s += '[imagesrcset="' + $t(a.imageSrcSet) + '"]'),
          typeof a.imageSizes == 'string' && (s += '[imagesizes="' + $t(a.imageSizes) + '"]'))
        : (s += '[href="' + $t(e) + '"]');
      var u = s;
      switch (t) {
        case 'style':
          u = An(e);
          break;
        case 'script':
          u = Ln(e);
      }
      Pt.has(u) ||
        ((e = y(
          { rel: 'preload', href: t === 'image' && a && a.imageSrcSet ? void 0 : e, as: t },
          a
        )),
        Pt.set(u, e),
        n.querySelector(s) !== null ||
          (t === 'style' && n.querySelector(Mi(u))) ||
          (t === 'script' && n.querySelector(Oi(u))) ||
          ((t = n.createElement('link')), kt(t, 'link', e), ct(t), n.head.appendChild(t)));
    }
  }
  function gv(e, t) {
    Rl.m(e, t);
    var a = jn;
    if (a && e) {
      var n = t && typeof t.as == 'string' ? t.as : 'script',
        s = 'link[rel="modulepreload"][as="' + $t(n) + '"][href="' + $t(e) + '"]',
        u = s;
      switch (n) {
        case 'audioworklet':
        case 'paintworklet':
        case 'serviceworker':
        case 'sharedworker':
        case 'worker':
        case 'script':
          u = Ln(e);
      }
      if (
        !Pt.has(u) &&
        ((e = y({ rel: 'modulepreload', href: e }, t)), Pt.set(u, e), a.querySelector(s) === null)
      ) {
        switch (n) {
          case 'audioworklet':
          case 'paintworklet':
          case 'serviceworker':
          case 'sharedworker':
          case 'worker':
          case 'script':
            if (a.querySelector(Oi(u))) return;
        }
        ((n = a.createElement('link')), kt(n, 'link', e), ct(n), a.head.appendChild(n));
      }
    }
  }
  function kv(e, t, a) {
    Rl.S(e, t, a);
    var n = jn;
    if (n && e) {
      var s = Pa(n).hoistableStyles,
        u = An(e);
      t = t || 'default';
      var m = s.get(u);
      if (!m) {
        var g = { loading: 0, preload: null };
        if ((m = n.querySelector(Mi(u)))) g.loading = 5;
        else {
          ((e = y({ rel: 'stylesheet', href: e, 'data-precedence': t }, a)),
            (a = Pt.get(u)) && ec(e, a));
          var w = (m = n.createElement('link'));
          (ct(w),
            kt(w, 'link', e),
            (w._p = new Promise(function (D, Y) {
              ((w.onload = D), (w.onerror = Y));
            })),
            w.addEventListener('load', function () {
              g.loading |= 1;
            }),
            w.addEventListener('error', function () {
              g.loading |= 2;
            }),
            (g.loading |= 4),
            or(m, t, n));
        }
        ((m = { type: 'stylesheet', instance: m, count: 1, state: g }), s.set(u, m));
      }
    }
  }
  function vv(e, t) {
    Rl.X(e, t);
    var a = jn;
    if (a && e) {
      var n = Pa(a).hoistableScripts,
        s = Ln(e),
        u = n.get(s);
      u ||
        ((u = a.querySelector(Oi(s))),
        u ||
          ((e = y({ src: e, async: !0 }, t)),
          (t = Pt.get(s)) && tc(e, t),
          (u = a.createElement('script')),
          ct(u),
          kt(u, 'link', e),
          a.head.appendChild(u)),
        (u = { type: 'script', instance: u, count: 1, state: null }),
        n.set(s, u));
    }
  }
  function yv(e, t) {
    Rl.M(e, t);
    var a = jn;
    if (a && e) {
      var n = Pa(a).hoistableScripts,
        s = Ln(e),
        u = n.get(s);
      u ||
        ((u = a.querySelector(Oi(s))),
        u ||
          ((e = y({ src: e, async: !0, type: 'module' }, t)),
          (t = Pt.get(s)) && tc(e, t),
          (u = a.createElement('script')),
          ct(u),
          kt(u, 'link', e),
          a.head.appendChild(u)),
        (u = { type: 'script', instance: u, count: 1, state: null }),
        n.set(s, u));
    }
  }
  function Vf(e, t, a, n) {
    var s = (s = _e.current) ? rr(s) : null;
    if (!s) throw Error(r(446));
    switch (e) {
      case 'meta':
      case 'title':
        return null;
      case 'style':
        return typeof a.precedence == 'string' && typeof a.href == 'string'
          ? ((t = An(a.href)),
            (a = Pa(s).hoistableStyles),
            (n = a.get(t)),
            n || ((n = { type: 'style', instance: null, count: 0, state: null }), a.set(t, n)),
            n)
          : { type: 'void', instance: null, count: 0, state: null };
      case 'link':
        if (
          a.rel === 'stylesheet' &&
          typeof a.href == 'string' &&
          typeof a.precedence == 'string'
        ) {
          e = An(a.href);
          var u = Pa(s).hoistableStyles,
            m = u.get(e);
          if (
            (m ||
              ((s = s.ownerDocument || s),
              (m = {
                type: 'stylesheet',
                instance: null,
                count: 0,
                state: { loading: 0, preload: null },
              }),
              u.set(e, m),
              (u = s.querySelector(Mi(e))) && !u._p && ((m.instance = u), (m.state.loading = 5)),
              Pt.has(e) ||
                ((a = {
                  rel: 'preload',
                  as: 'style',
                  href: a.href,
                  crossOrigin: a.crossOrigin,
                  integrity: a.integrity,
                  media: a.media,
                  hrefLang: a.hrefLang,
                  referrerPolicy: a.referrerPolicy,
                }),
                Pt.set(e, a),
                u || bv(s, e, a, m.state))),
            t && n === null)
          )
            throw Error(r(528, ''));
          return m;
        }
        if (t && n !== null) throw Error(r(529, ''));
        return null;
      case 'script':
        return (
          (t = a.async),
          (a = a.src),
          typeof a == 'string' && t && typeof t != 'function' && typeof t != 'symbol'
            ? ((t = Ln(a)),
              (a = Pa(s).hoistableScripts),
              (n = a.get(t)),
              n || ((n = { type: 'script', instance: null, count: 0, state: null }), a.set(t, n)),
              n)
            : { type: 'void', instance: null, count: 0, state: null }
        );
      default:
        throw Error(r(444, e));
    }
  }
  function An(e) {
    return 'href="' + $t(e) + '"';
  }
  function Mi(e) {
    return 'link[rel="stylesheet"][' + e + ']';
  }
  function Qf(e) {
    return y({}, e, { 'data-precedence': e.precedence, precedence: null });
  }
  function bv(e, t, a, n) {
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
        kt(t, 'link', a),
        ct(t),
        e.head.appendChild(t));
  }
  function Ln(e) {
    return '[src="' + $t(e) + '"]';
  }
  function Oi(e) {
    return 'script[async]' + e;
  }
  function Kf(e, t, a) {
    if ((t.count++, t.instance === null))
      switch (t.type) {
        case 'style':
          var n = e.querySelector('style[data-href~="' + $t(a.href) + '"]');
          if (n) return ((t.instance = n), ct(n), n);
          var s = y({}, a, {
            'data-href': a.href,
            'data-precedence': a.precedence,
            href: null,
            precedence: null,
          });
          return (
            (n = (e.ownerDocument || e).createElement('style')),
            ct(n),
            kt(n, 'style', s),
            or(n, a.precedence, e),
            (t.instance = n)
          );
        case 'stylesheet':
          s = An(a.href);
          var u = e.querySelector(Mi(s));
          if (u) return ((t.state.loading |= 4), (t.instance = u), ct(u), u);
          ((n = Qf(a)),
            (s = Pt.get(s)) && ec(n, s),
            (u = (e.ownerDocument || e).createElement('link')),
            ct(u));
          var m = u;
          return (
            (m._p = new Promise(function (g, w) {
              ((m.onload = g), (m.onerror = w));
            })),
            kt(u, 'link', n),
            (t.state.loading |= 4),
            or(u, a.precedence, e),
            (t.instance = u)
          );
        case 'script':
          return (
            (u = Ln(a.src)),
            (s = e.querySelector(Oi(u)))
              ? ((t.instance = s), ct(s), s)
              : ((n = a),
                (s = Pt.get(u)) && ((n = y({}, a)), tc(n, s)),
                (e = e.ownerDocument || e),
                (s = e.createElement('script')),
                ct(s),
                kt(s, 'link', n),
                e.head.appendChild(s),
                (t.instance = s))
          );
        case 'void':
          return null;
        default:
          throw Error(r(443, t.type));
      }
    else
      t.type === 'stylesheet' &&
        (t.state.loading & 4) === 0 &&
        ((n = t.instance), (t.state.loading |= 4), or(n, a.precedence, e));
    return t.instance;
  }
  function or(e, t, a) {
    for (
      var n = a.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),
        s = n.length ? n[n.length - 1] : null,
        u = s,
        m = 0;
      m < n.length;
      m++
    ) {
      var g = n[m];
      if (g.dataset.precedence === t) u = g;
      else if (u !== s) break;
    }
    u
      ? u.parentNode.insertBefore(e, u.nextSibling)
      : ((t = a.nodeType === 9 ? a.head : a), t.insertBefore(e, t.firstChild));
  }
  function ec(e, t) {
    (e.crossOrigin == null && (e.crossOrigin = t.crossOrigin),
      e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy),
      e.title == null && (e.title = t.title));
  }
  function tc(e, t) {
    (e.crossOrigin == null && (e.crossOrigin = t.crossOrigin),
      e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy),
      e.integrity == null && (e.integrity = t.integrity));
  }
  var ur = null;
  function Zf(e, t, a) {
    if (ur === null) {
      var n = new Map(),
        s = (ur = new Map());
      s.set(a, n);
    } else ((s = ur), (n = s.get(a)), n || ((n = new Map()), s.set(a, n)));
    if (n.has(e)) return n;
    for (n.set(e, null), a = a.getElementsByTagName(e), s = 0; s < a.length; s++) {
      var u = a[s];
      if (
        !(u[Pn] || u[ft] || (e === 'link' && u.getAttribute('rel') === 'stylesheet')) &&
        u.namespaceURI !== 'http://www.w3.org/2000/svg'
      ) {
        var m = u.getAttribute(t) || '';
        m = e + m;
        var g = n.get(m);
        g ? g.push(u) : n.set(m, [u]);
      }
    }
    return n;
  }
  function Jf(e, t, a) {
    ((e = e.ownerDocument || e),
      e.head.insertBefore(a, t === 'title' ? e.querySelector('head > title') : null));
  }
  function xv(e, t, a) {
    if (a === 1 || t.itemProp != null) return !1;
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
  function Pf(e) {
    return !(e.type === 'stylesheet' && (e.state.loading & 3) === 0);
  }
  function Sv(e, t, a, n) {
    if (
      a.type === 'stylesheet' &&
      (typeof n.media != 'string' || matchMedia(n.media).matches !== !1) &&
      (a.state.loading & 4) === 0
    ) {
      if (a.instance === null) {
        var s = An(n.href),
          u = t.querySelector(Mi(s));
        if (u) {
          ((t = u._p),
            t !== null &&
              typeof t == 'object' &&
              typeof t.then == 'function' &&
              (e.count++, (e = cr.bind(e)), t.then(e, e)),
            (a.state.loading |= 4),
            (a.instance = u),
            ct(u));
          return;
        }
        ((u = t.ownerDocument || t),
          (n = Qf(n)),
          (s = Pt.get(s)) && ec(n, s),
          (u = u.createElement('link')),
          ct(u));
        var m = u;
        ((m._p = new Promise(function (g, w) {
          ((m.onload = g), (m.onerror = w));
        })),
          kt(u, 'link', n),
          (a.instance = u));
      }
      (e.stylesheets === null && (e.stylesheets = new Map()),
        e.stylesheets.set(a, t),
        (t = a.state.preload) &&
          (a.state.loading & 3) === 0 &&
          (e.count++,
          (a = cr.bind(e)),
          t.addEventListener('load', a),
          t.addEventListener('error', a)));
    }
  }
  var lc = 0;
  function wv(e, t) {
    return (
      e.stylesheets && e.count === 0 && mr(e, e.stylesheets),
      0 < e.count || 0 < e.imgCount
        ? function (a) {
            var n = setTimeout(function () {
              if ((e.stylesheets && mr(e, e.stylesheets), e.unsuspend)) {
                var u = e.unsuspend;
                ((e.unsuspend = null), u());
              }
            }, 6e4 + t);
            0 < e.imgBytes && lc === 0 && (lc = 62500 * nv());
            var s = setTimeout(
              function () {
                if (
                  ((e.waitingForImages = !1),
                  e.count === 0 && (e.stylesheets && mr(e, e.stylesheets), e.unsuspend))
                ) {
                  var u = e.unsuspend;
                  ((e.unsuspend = null), u());
                }
              },
              (e.imgBytes > lc ? 50 : 800) + t
            );
            return (
              (e.unsuspend = a),
              function () {
                ((e.unsuspend = null), clearTimeout(n), clearTimeout(s));
              }
            );
          }
        : null
    );
  }
  function cr() {
    if ((this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages))) {
      if (this.stylesheets) mr(this, this.stylesheets);
      else if (this.unsuspend) {
        var e = this.unsuspend;
        ((this.unsuspend = null), e());
      }
    }
  }
  var dr = null;
  function mr(e, t) {
    ((e.stylesheets = null),
      e.unsuspend !== null &&
        (e.count++, (dr = new Map()), t.forEach(Tv, e), (dr = null), cr.call(e)));
  }
  function Tv(e, t) {
    if (!(t.state.loading & 4)) {
      var a = dr.get(e);
      if (a) var n = a.get(null);
      else {
        ((a = new Map()), dr.set(e, a));
        for (
          var s = e.querySelectorAll('link[data-precedence],style[data-precedence]'), u = 0;
          u < s.length;
          u++
        ) {
          var m = s[u];
          (m.nodeName === 'LINK' || m.getAttribute('media') !== 'not all') &&
            (a.set(m.dataset.precedence, m), (n = m));
        }
        n && a.set(null, n);
      }
      ((s = t.instance),
        (m = s.getAttribute('data-precedence')),
        (u = a.get(m) || n),
        u === n && a.set(null, s),
        a.set(m, s),
        this.count++,
        (n = cr.bind(this)),
        s.addEventListener('load', n),
        s.addEventListener('error', n),
        u
          ? u.parentNode.insertBefore(s, u.nextSibling)
          : ((e = e.nodeType === 9 ? e.head : e), e.insertBefore(s, e.firstChild)),
        (t.state.loading |= 4));
    }
  }
  var Ii = {
    $$typeof: A,
    Provider: null,
    Consumer: null,
    _currentValue: $,
    _currentValue2: $,
    _threadCount: 0,
  };
  function Ev(e, t, a, n, s, u, m, g, w) {
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
      (this.expirationTimes = Jr(-1)),
      (this.entangledLanes =
        this.shellSuspendCounter =
        this.errorRecoveryDisabledLanes =
        this.expiredLanes =
        this.warmLanes =
        this.pingedLanes =
        this.suspendedLanes =
        this.pendingLanes =
          0),
      (this.entanglements = Jr(0)),
      (this.hiddenUpdates = Jr(null)),
      (this.identifierPrefix = n),
      (this.onUncaughtError = s),
      (this.onCaughtError = u),
      (this.onRecoverableError = m),
      (this.pooledCache = null),
      (this.pooledCacheLanes = 0),
      (this.formState = w),
      (this.incompleteTransitions = new Map()));
  }
  function Ff(e, t, a, n, s, u, m, g, w, D, Y, V) {
    return (
      (e = new Ev(e, t, a, m, w, D, Y, V, g)),
      (t = 1),
      u === !0 && (t |= 24),
      (u = Mt(3, null, null, t)),
      (e.current = u),
      (u.stateNode = e),
      (t = Oo()),
      t.refCount++,
      (e.pooledCache = t),
      t.refCount++,
      (u.memoizedState = { element: n, isDehydrated: a, cache: t }),
      zo(u),
      e
    );
  }
  function Wf(e) {
    return e ? ((e = on), e) : on;
  }
  function ep(e, t, a, n, s, u) {
    ((s = Wf(s)),
      n.context === null ? (n.context = s) : (n.pendingContext = s),
      (n = ta(t)),
      (n.payload = { element: a }),
      (u = u === void 0 ? null : u),
      u !== null && (n.callback = u),
      (a = la(e, n, t)),
      a !== null && (At(a, e, t), fi(a, e, t)));
  }
  function tp(e, t) {
    if (((e = e.memoizedState), e !== null && e.dehydrated !== null)) {
      var a = e.retryLane;
      e.retryLane = a !== 0 && a < t ? a : t;
    }
  }
  function ac(e, t) {
    (tp(e, t), (e = e.alternate) && tp(e, t));
  }
  function lp(e) {
    if (e.tag === 13 || e.tag === 31) {
      var t = Ea(e, 67108864);
      (t !== null && At(t, e, 67108864), ac(e, 67108864));
    }
  }
  function ap(e) {
    if (e.tag === 13 || e.tag === 31) {
      var t = zt();
      t = Pr(t);
      var a = Ea(e, t);
      (a !== null && At(a, e, t), ac(e, t));
    }
  }
  var _r = !0;
  function Cv(e, t, a, n) {
    var s = L.T;
    L.T = null;
    var u = Q.p;
    try {
      ((Q.p = 2), nc(e, t, a, n));
    } finally {
      ((Q.p = u), (L.T = s));
    }
  }
  function Nv(e, t, a, n) {
    var s = L.T;
    L.T = null;
    var u = Q.p;
    try {
      ((Q.p = 8), nc(e, t, a, n));
    } finally {
      ((Q.p = u), (L.T = s));
    }
  }
  function nc(e, t, a, n) {
    if (_r) {
      var s = ic(n);
      if (s === null) (Yu(e, t, n, fr, a), ip(e, n));
      else if (Av(s, e, t, a, n)) n.stopPropagation();
      else if ((ip(e, n), t & 4 && -1 < jv.indexOf(e))) {
        for (; s !== null; ) {
          var u = Ja(s);
          if (u !== null)
            switch (u.tag) {
              case 3:
                if (((u = u.stateNode), u.current.memoizedState.isDehydrated)) {
                  var m = ba(u.pendingLanes);
                  if (m !== 0) {
                    var g = u;
                    for (g.pendingLanes |= 2, g.entangledLanes |= 2; m; ) {
                      var w = 1 << (31 - qt(m));
                      ((g.entanglements[1] |= w), (m &= ~w));
                    }
                    (gl(u), (Le & 6) === 0 && ((Js = yt() + 500), Ai(0)));
                  }
                }
                break;
              case 31:
              case 13:
                ((g = Ea(u, 2)), g !== null && At(g, u, 2), Fs(), ac(u, 2));
            }
          if (((u = ic(n)), u === null && Yu(e, t, n, fr, a), u === s)) break;
          s = u;
        }
        s !== null && n.stopPropagation();
      } else Yu(e, t, n, null, a);
    }
  }
  function ic(e) {
    return ((e = so(e)), sc(e));
  }
  var fr = null;
  function sc(e) {
    if (((fr = null), (e = Za(e)), e !== null)) {
      var t = d(e);
      if (t === null) e = null;
      else {
        var a = t.tag;
        if (a === 13) {
          if (((e = f(t)), e !== null)) return e;
          e = null;
        } else if (a === 31) {
          if (((e = h(t)), e !== null)) return e;
          e = null;
        } else if (a === 3) {
          if (t.stateNode.current.memoizedState.isDehydrated)
            return t.tag === 3 ? t.stateNode.containerInfo : null;
          e = null;
        } else t !== e && (e = null);
      }
    }
    return ((fr = e), null);
  }
  function np(e) {
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
        switch (q()) {
          case W:
            return 2;
          case se:
            return 8;
          case me:
          case Ve:
            return 32;
          case Vl:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var rc = !1,
    _a = null,
    fa = null,
    pa = null,
    Di = new Map(),
    Ri = new Map(),
    ha = [],
    jv =
      'mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset'.split(
        ' '
      );
  function ip(e, t) {
    switch (e) {
      case 'focusin':
      case 'focusout':
        _a = null;
        break;
      case 'dragenter':
      case 'dragleave':
        fa = null;
        break;
      case 'mouseover':
      case 'mouseout':
        pa = null;
        break;
      case 'pointerover':
      case 'pointerout':
        Di.delete(t.pointerId);
        break;
      case 'gotpointercapture':
      case 'lostpointercapture':
        Ri.delete(t.pointerId);
    }
  }
  function zi(e, t, a, n, s, u) {
    return e === null || e.nativeEvent !== u
      ? ((e = {
          blockedOn: t,
          domEventName: a,
          eventSystemFlags: n,
          nativeEvent: u,
          targetContainers: [s],
        }),
        t !== null && ((t = Ja(t)), t !== null && lp(t)),
        e)
      : ((e.eventSystemFlags |= n),
        (t = e.targetContainers),
        s !== null && t.indexOf(s) === -1 && t.push(s),
        e);
  }
  function Av(e, t, a, n, s) {
    switch (t) {
      case 'focusin':
        return ((_a = zi(_a, e, t, a, n, s)), !0);
      case 'dragenter':
        return ((fa = zi(fa, e, t, a, n, s)), !0);
      case 'mouseover':
        return ((pa = zi(pa, e, t, a, n, s)), !0);
      case 'pointerover':
        var u = s.pointerId;
        return (Di.set(u, zi(Di.get(u) || null, e, t, a, n, s)), !0);
      case 'gotpointercapture':
        return ((u = s.pointerId), Ri.set(u, zi(Ri.get(u) || null, e, t, a, n, s)), !0);
    }
    return !1;
  }
  function sp(e) {
    var t = Za(e.target);
    if (t !== null) {
      var a = d(t);
      if (a !== null) {
        if (((t = a.tag), t === 13)) {
          if (((t = f(a)), t !== null)) {
            ((e.blockedOn = t),
              vd(e.priority, function () {
                ap(a);
              }));
            return;
          }
        } else if (t === 31) {
          if (((t = h(a)), t !== null)) {
            ((e.blockedOn = t),
              vd(e.priority, function () {
                ap(a);
              }));
            return;
          }
        } else if (t === 3 && a.stateNode.current.memoizedState.isDehydrated) {
          e.blockedOn = a.tag === 3 ? a.stateNode.containerInfo : null;
          return;
        }
      }
    }
    e.blockedOn = null;
  }
  function pr(e) {
    if (e.blockedOn !== null) return !1;
    for (var t = e.targetContainers; 0 < t.length; ) {
      var a = ic(e.nativeEvent);
      if (a === null) {
        a = e.nativeEvent;
        var n = new a.constructor(a.type, a);
        ((io = n), a.target.dispatchEvent(n), (io = null));
      } else return ((t = Ja(a)), t !== null && lp(t), (e.blockedOn = a), !1);
      t.shift();
    }
    return !0;
  }
  function rp(e, t, a) {
    pr(e) && a.delete(t);
  }
  function Lv() {
    ((rc = !1),
      _a !== null && pr(_a) && (_a = null),
      fa !== null && pr(fa) && (fa = null),
      pa !== null && pr(pa) && (pa = null),
      Di.forEach(rp),
      Ri.forEach(rp));
  }
  function hr(e, t) {
    e.blockedOn === t &&
      ((e.blockedOn = null),
      rc || ((rc = !0), l.unstable_scheduleCallback(l.unstable_NormalPriority, Lv)));
  }
  var gr = null;
  function op(e) {
    gr !== e &&
      ((gr = e),
      l.unstable_scheduleCallback(l.unstable_NormalPriority, function () {
        gr === e && (gr = null);
        for (var t = 0; t < e.length; t += 3) {
          var a = e[t],
            n = e[t + 1],
            s = e[t + 2];
          if (typeof n != 'function') {
            if (sc(n || a) === null) continue;
            break;
          }
          var u = Ja(a);
          u !== null &&
            (e.splice(t, 3),
            (t -= 3),
            iu(u, { pending: !0, data: s, method: a.method, action: n }, n, s));
        }
      }));
  }
  function qn(e) {
    function t(w) {
      return hr(w, e);
    }
    (_a !== null && hr(_a, e),
      fa !== null && hr(fa, e),
      pa !== null && hr(pa, e),
      Di.forEach(t),
      Ri.forEach(t));
    for (var a = 0; a < ha.length; a++) {
      var n = ha[a];
      n.blockedOn === e && (n.blockedOn = null);
    }
    for (; 0 < ha.length && ((a = ha[0]), a.blockedOn === null); )
      (sp(a), a.blockedOn === null && ha.shift());
    if (((a = (e.ownerDocument || e).$$reactFormReplay), a != null))
      for (n = 0; n < a.length; n += 3) {
        var s = a[n],
          u = a[n + 1],
          m = s[wt] || null;
        if (typeof u == 'function') m || op(a);
        else if (m) {
          var g = null;
          if (u && u.hasAttribute('formAction')) {
            if (((s = u), (m = u[wt] || null))) g = m.formAction;
            else if (sc(s) !== null) continue;
          } else g = m.action;
          (typeof g == 'function' ? (a[n + 1] = g) : (a.splice(n, 3), (n -= 3)), op(a));
        }
      }
  }
  function up() {
    function e(u) {
      u.canIntercept &&
        u.info === 'react-transition' &&
        u.intercept({
          handler: function () {
            return new Promise(function (m) {
              return (s = m);
            });
          },
          focusReset: 'manual',
          scroll: 'manual',
        });
    }
    function t() {
      (s !== null && (s(), (s = null)), n || setTimeout(a, 20));
    }
    function a() {
      if (!n && !navigation.transition) {
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
      var n = !1,
        s = null;
      return (
        navigation.addEventListener('navigate', e),
        navigation.addEventListener('navigatesuccess', t),
        navigation.addEventListener('navigateerror', t),
        setTimeout(a, 100),
        function () {
          ((n = !0),
            navigation.removeEventListener('navigate', e),
            navigation.removeEventListener('navigatesuccess', t),
            navigation.removeEventListener('navigateerror', t),
            s !== null && (s(), (s = null)));
        }
      );
    }
  }
  function oc(e) {
    this._internalRoot = e;
  }
  ((kr.prototype.render = oc.prototype.render =
    function (e) {
      var t = this._internalRoot;
      if (t === null) throw Error(r(409));
      var a = t.current,
        n = zt();
      ep(a, n, e, t, null, null);
    }),
    (kr.prototype.unmount = oc.prototype.unmount =
      function () {
        var e = this._internalRoot;
        if (e !== null) {
          this._internalRoot = null;
          var t = e.containerInfo;
          (ep(e.current, 2, null, e, null, null), Fs(), (t[Ka] = null));
        }
      }));
  function kr(e) {
    this._internalRoot = e;
  }
  kr.prototype.unstable_scheduleHydration = function (e) {
    if (e) {
      var t = kd();
      e = { blockedOn: null, target: e, priority: t };
      for (var a = 0; a < ha.length && t !== 0 && t < ha[a].priority; a++);
      (ha.splice(a, 0, e), a === 0 && sp(e));
    }
  };
  var cp = i.version;
  if (cp !== '19.2.5') throw Error(r(527, cp, '19.2.5'));
  Q.findDOMNode = function (e) {
    var t = e._reactInternals;
    if (t === void 0)
      throw typeof e.render == 'function'
        ? Error(r(188))
        : ((e = Object.keys(e).join(',')), Error(r(268, e)));
    return ((e = p(t)), (e = e !== null ? v(e) : null), (e = e === null ? null : e.stateNode), e);
  };
  var qv = {
    bundleType: 0,
    version: '19.2.5',
    rendererPackageName: 'react-dom',
    currentDispatcherRef: L,
    reconcilerVersion: '19.2.5',
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < 'u') {
    var vr = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!vr.isDisabled && vr.supportsFiber)
      try {
        ((yl = vr.inject(qv)), (Lt = vr));
      } catch {}
  }
  return (
    (Ui.createRoot = function (e, t) {
      if (!c(e)) throw Error(r(299));
      var a = !1,
        n = '',
        s = h_,
        u = g_,
        m = k_;
      return (
        t != null &&
          (t.unstable_strictMode === !0 && (a = !0),
          t.identifierPrefix !== void 0 && (n = t.identifierPrefix),
          t.onUncaughtError !== void 0 && (s = t.onUncaughtError),
          t.onCaughtError !== void 0 && (u = t.onCaughtError),
          t.onRecoverableError !== void 0 && (m = t.onRecoverableError)),
        (t = Ff(e, 1, !1, null, null, a, n, null, s, u, m, up)),
        (e[Ka] = t.current),
        $u(e),
        new oc(t)
      );
    }),
    (Ui.hydrateRoot = function (e, t, a) {
      if (!c(e)) throw Error(r(299));
      var n = !1,
        s = '',
        u = h_,
        m = g_,
        g = k_,
        w = null;
      return (
        a != null &&
          (a.unstable_strictMode === !0 && (n = !0),
          a.identifierPrefix !== void 0 && (s = a.identifierPrefix),
          a.onUncaughtError !== void 0 && (u = a.onUncaughtError),
          a.onCaughtError !== void 0 && (m = a.onCaughtError),
          a.onRecoverableError !== void 0 && (g = a.onRecoverableError),
          a.formState !== void 0 && (w = a.formState)),
        (t = Ff(e, 1, !0, t, a ?? null, n, s, w, u, m, g, up)),
        (t.context = Wf(null)),
        (a = t.current),
        (n = zt()),
        (n = Pr(n)),
        (s = ta(n)),
        (s.callback = null),
        la(a, s, n),
        (a = n),
        (t.current.lanes = a),
        Jn(t, a),
        gl(t),
        (e[Ka] = t.current),
        $u(e),
        new kr(t)
      );
    }),
    (Ui.version = '19.2.5'),
    Ui
  );
}
var yp;
function Yv() {
  if (yp) return dc.exports;
  yp = 1;
  function l() {
    if (
      !(
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > 'u' ||
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != 'function'
      )
    )
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(l);
      } catch (i) {
        console.error(i);
      }
  }
  return (l(), (dc.exports = $v()), dc.exports);
}
var Xv = Yv(),
  T = Xc();
/**
 * react-router v7.14.2
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */ var bp = 'popstate';
function xp(l) {
  return (
    typeof l == 'object' &&
    l != null &&
    'pathname' in l &&
    'search' in l &&
    'hash' in l &&
    'state' in l &&
    'key' in l
  );
}
function Vv(l = {}) {
  function i(r, c) {
    var p;
    let d = (p = c.state) == null ? void 0 : p.masked,
      { pathname: f, search: h, hash: k } = d || r.location;
    return Ac(
      '',
      { pathname: f, search: h, hash: k },
      (c.state && c.state.usr) || null,
      (c.state && c.state.key) || 'default',
      d
        ? { pathname: r.location.pathname, search: r.location.search, hash: r.location.hash }
        : void 0
    );
  }
  function o(r, c) {
    return typeof c == 'string' ? c : Zi(c);
  }
  return Kv(i, o, null, l);
}
function Ke(l, i) {
  if (l === !1 || l === null || typeof l > 'u') throw new Error(i);
}
function rl(l, i) {
  if (!l) {
    typeof console < 'u' && console.warn(i);
    try {
      throw new Error(i);
    } catch {}
  }
}
function Qv() {
  return Math.random().toString(36).substring(2, 10);
}
function Sp(l, i) {
  return {
    usr: l.state,
    key: l.key,
    idx: i,
    masked: l.unstable_mask ? { pathname: l.pathname, search: l.search, hash: l.hash } : void 0,
  };
}
function Ac(l, i, o = null, r, c) {
  return {
    pathname: typeof l == 'string' ? l : l.pathname,
    search: '',
    hash: '',
    ...(typeof i == 'string' ? Gn(i) : i),
    state: o,
    key: (i && i.key) || r || Qv(),
    unstable_mask: c,
  };
}
function Zi({ pathname: l = '/', search: i = '', hash: o = '' }) {
  return (
    i && i !== '?' && (l += i.charAt(0) === '?' ? i : '?' + i),
    o && o !== '#' && (l += o.charAt(0) === '#' ? o : '#' + o),
    l
  );
}
function Gn(l) {
  let i = {};
  if (l) {
    let o = l.indexOf('#');
    o >= 0 && ((i.hash = l.substring(o)), (l = l.substring(0, o)));
    let r = l.indexOf('?');
    (r >= 0 && ((i.search = l.substring(r)), (l = l.substring(0, r))), l && (i.pathname = l));
  }
  return i;
}
function Kv(l, i, o, r = {}) {
  let { window: c = document.defaultView, v5Compat: d = !1 } = r,
    f = c.history,
    h = 'POP',
    k = null,
    p = v();
  p == null && ((p = 0), f.replaceState({ ...f.state, idx: p }, ''));
  function v() {
    return (f.state || { idx: null }).idx;
  }
  function y() {
    h = 'POP';
    let S = v(),
      b = S == null ? null : S - p;
    ((p = S), k && k({ action: h, location: x.location, delta: b }));
  }
  function E(S, b) {
    h = 'PUSH';
    let C = xp(S) ? S : Ac(x.location, S, b);
    p = v() + 1;
    let A = Sp(C, p),
      F = x.createHref(C.unstable_mask || C);
    try {
      f.pushState(A, '', F);
    } catch (P) {
      if (P instanceof DOMException && P.name === 'DataCloneError') throw P;
      c.location.assign(F);
    }
    d && k && k({ action: h, location: x.location, delta: 1 });
  }
  function M(S, b) {
    h = 'REPLACE';
    let C = xp(S) ? S : Ac(x.location, S, b);
    p = v();
    let A = Sp(C, p),
      F = x.createHref(C.unstable_mask || C);
    (f.replaceState(A, '', F), d && k && k({ action: h, location: x.location, delta: 0 }));
  }
  function O(S) {
    return Zv(S);
  }
  let x = {
    get action() {
      return h;
    },
    get location() {
      return l(c, f);
    },
    listen(S) {
      if (k) throw new Error('A history only accepts one active listener');
      return (
        c.addEventListener(bp, y),
        (k = S),
        () => {
          (c.removeEventListener(bp, y), (k = null));
        }
      );
    },
    createHref(S) {
      return i(c, S);
    },
    createURL: O,
    encodeLocation(S) {
      let b = O(S);
      return { pathname: b.pathname, search: b.search, hash: b.hash };
    },
    push: E,
    replace: M,
    go(S) {
      return f.go(S);
    },
  };
  return x;
}
function Zv(l, i = !1) {
  let o = 'http://localhost';
  (typeof window < 'u' &&
    (o = window.location.origin !== 'null' ? window.location.origin : window.location.href),
    Ke(o, 'No window.location.(origin|href) available to create URL'));
  let r = typeof l == 'string' ? l : Zi(l);
  return ((r = r.replace(/ $/, '%20')), !i && r.startsWith('//') && (r = o + r), new URL(r, o));
}
function Fp(l, i, o = '/') {
  return Jv(l, i, o, !1);
}
function Jv(l, i, o, r) {
  let c = typeof i == 'string' ? Gn(i) : i,
    d = Yl(c.pathname || '/', o);
  if (d == null) return null;
  let f = Wp(l);
  Pv(f);
  let h = null;
  for (let k = 0; h == null && k < f.length; ++k) {
    let p = o0(d);
    h = s0(f[k], p, r);
  }
  return h;
}
function Wp(l, i = [], o = [], r = '', c = !1) {
  let d = (f, h, k = c, p) => {
    let v = {
      relativePath: p === void 0 ? f.path || '' : p,
      caseSensitive: f.caseSensitive === !0,
      childrenIndex: h,
      route: f,
    };
    if (v.relativePath.startsWith('/')) {
      if (!v.relativePath.startsWith(r) && k) return;
      (Ke(
        v.relativePath.startsWith(r),
        `Absolute route path "${v.relativePath}" nested under path "${r}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`
      ),
        (v.relativePath = v.relativePath.slice(r.length)));
    }
    let y = sl([r, v.relativePath]),
      E = o.concat(v);
    (f.children &&
      f.children.length > 0 &&
      (Ke(
        f.index !== !0,
        `Index routes must not have child routes. Please remove all child routes from route path "${y}".`
      ),
      Wp(f.children, i, E, y, k)),
      !(f.path == null && !f.index) && i.push({ path: y, score: n0(y, f.index), routesMeta: E }));
  };
  return (
    l.forEach((f, h) => {
      var k;
      if (f.path === '' || !((k = f.path) != null && k.includes('?'))) d(f, h);
      else for (let p of eh(f.path)) d(f, h, !0, p);
    }),
    i
  );
}
function eh(l) {
  let i = l.split('/');
  if (i.length === 0) return [];
  let [o, ...r] = i,
    c = o.endsWith('?'),
    d = o.replace(/\?$/, '');
  if (r.length === 0) return c ? [d, ''] : [d];
  let f = eh(r.join('/')),
    h = [];
  return (
    h.push(...f.map((k) => (k === '' ? d : [d, k].join('/')))),
    c && h.push(...f),
    h.map((k) => (l.startsWith('/') && k === '' ? '/' : k))
  );
}
function Pv(l) {
  l.sort((i, o) =>
    i.score !== o.score
      ? o.score - i.score
      : i0(
          i.routesMeta.map((r) => r.childrenIndex),
          o.routesMeta.map((r) => r.childrenIndex)
        )
  );
}
var Fv = /^:[\w-]+$/,
  Wv = 3,
  e0 = 2,
  t0 = 1,
  l0 = 10,
  a0 = -2,
  wp = (l) => l === '*';
function n0(l, i) {
  let o = l.split('/'),
    r = o.length;
  return (
    o.some(wp) && (r += a0),
    i && (r += e0),
    o.filter((c) => !wp(c)).reduce((c, d) => c + (Fv.test(d) ? Wv : d === '' ? t0 : l0), r)
  );
}
function i0(l, i) {
  return l.length === i.length && l.slice(0, -1).every((r, c) => r === i[c])
    ? l[l.length - 1] - i[i.length - 1]
    : 0;
}
function s0(l, i, o = !1) {
  let { routesMeta: r } = l,
    c = {},
    d = '/',
    f = [];
  for (let h = 0; h < r.length; ++h) {
    let k = r[h],
      p = h === r.length - 1,
      v = d === '/' ? i : i.slice(d.length) || '/',
      y = Lr({ path: k.relativePath, caseSensitive: k.caseSensitive, end: p }, v),
      E = k.route;
    if (
      (!y &&
        p &&
        o &&
        !r[r.length - 1].route.index &&
        (y = Lr({ path: k.relativePath, caseSensitive: k.caseSensitive, end: !1 }, v)),
      !y)
    )
      return null;
    (Object.assign(c, y.params),
      f.push({
        params: c,
        pathname: sl([d, y.pathname]),
        pathnameBase: m0(sl([d, y.pathnameBase])),
        route: E,
      }),
      y.pathnameBase !== '/' && (d = sl([d, y.pathnameBase])));
  }
  return f;
}
function Lr(l, i) {
  typeof l == 'string' && (l = { path: l, caseSensitive: !1, end: !0 });
  let [o, r] = r0(l.path, l.caseSensitive, l.end),
    c = i.match(o);
  if (!c) return null;
  let d = c[0],
    f = d.replace(/(.)\/+$/, '$1'),
    h = c.slice(1);
  return {
    params: r.reduce((p, { paramName: v, isOptional: y }, E) => {
      if (v === '*') {
        let O = h[E] || '';
        f = d.slice(0, d.length - O.length).replace(/(.)\/+$/, '$1');
      }
      const M = h[E];
      return (y && !M ? (p[v] = void 0) : (p[v] = (M || '').replace(/%2F/g, '/')), p);
    }, {}),
    pathname: d,
    pathnameBase: f,
    pattern: l,
  };
}
function r0(l, i = !1, o = !0) {
  rl(
    l === '*' || !l.endsWith('*') || l.endsWith('/*'),
    `Route path "${l}" will be treated as if it were "${l.replace(/\*$/, '/*')}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${l.replace(/\*$/, '/*')}".`
  );
  let r = [],
    c =
      '^' +
      l
        .replace(/\/*\*?$/, '')
        .replace(/^\/*/, '/')
        .replace(/[\\.*+^${}|()[\]]/g, '\\$&')
        .replace(/\/:([\w-]+)(\?)?/g, (f, h, k, p, v) => {
          if ((r.push({ paramName: h, isOptional: k != null }), k)) {
            let y = v.charAt(p + f.length);
            return y && y !== '/' ? '/([^\\/]*)' : '(?:/([^\\/]*))?';
          }
          return '/([^\\/]+)';
        })
        .replace(/\/([\w-]+)\?(\/|$)/g, '(/$1)?$2');
  return (
    l.endsWith('*')
      ? (r.push({ paramName: '*' }), (c += l === '*' || l === '/*' ? '(.*)$' : '(?:\\/(.+)|\\/*)$'))
      : o
        ? (c += '\\/*$')
        : l !== '' && l !== '/' && (c += '(?:(?=\\/|$))'),
    [new RegExp(c, i ? void 0 : 'i'), r]
  );
}
function o0(l) {
  try {
    return l
      .split('/')
      .map((i) => decodeURIComponent(i).replace(/\//g, '%2F'))
      .join('/');
  } catch (i) {
    return (
      rl(
        !1,
        `The URL path "${l}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${i}).`
      ),
      l
    );
  }
}
function Yl(l, i) {
  if (i === '/') return l;
  if (!l.toLowerCase().startsWith(i.toLowerCase())) return null;
  let o = i.endsWith('/') ? i.length - 1 : i.length,
    r = l.charAt(o);
  return r && r !== '/' ? null : l.slice(o) || '/';
}
var u0 = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;
function c0(l, i = '/') {
  let { pathname: o, search: r = '', hash: c = '' } = typeof l == 'string' ? Gn(l) : l,
    d;
  return (
    o ? ((o = th(o)), o.startsWith('/') ? (d = Tp(o.substring(1), '/')) : (d = Tp(o, i))) : (d = i),
    { pathname: d, search: _0(r), hash: f0(c) }
  );
}
function Tp(l, i) {
  let o = qr(i).split('/');
  return (
    l.split('/').forEach((c) => {
      c === '..' ? o.length > 1 && o.pop() : c !== '.' && o.push(c);
    }),
    o.length > 1 ? o.join('/') : '/'
  );
}
function hc(l, i, o, r) {
  return `Cannot include a '${l}' character in a manually specified \`to.${i}\` field [${JSON.stringify(r)}].  Please separate it out to the \`to.${o}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`;
}
function d0(l) {
  return l.filter((i, o) => o === 0 || (i.route.path && i.route.path.length > 0));
}
function Vc(l) {
  let i = d0(l);
  return i.map((o, r) => (r === i.length - 1 ? o.pathname : o.pathnameBase));
}
function Ur(l, i, o, r = !1) {
  let c;
  typeof l == 'string'
    ? (c = Gn(l))
    : ((c = { ...l }),
      Ke(!c.pathname || !c.pathname.includes('?'), hc('?', 'pathname', 'search', c)),
      Ke(!c.pathname || !c.pathname.includes('#'), hc('#', 'pathname', 'hash', c)),
      Ke(!c.search || !c.search.includes('#'), hc('#', 'search', 'hash', c)));
  let d = l === '' || c.pathname === '',
    f = d ? '/' : c.pathname,
    h;
  if (f == null) h = o;
  else {
    let y = i.length - 1;
    if (!r && f.startsWith('..')) {
      let E = f.split('/');
      for (; E[0] === '..'; ) (E.shift(), (y -= 1));
      c.pathname = E.join('/');
    }
    h = y >= 0 ? i[y] : '/';
  }
  let k = c0(c, h),
    p = f && f !== '/' && f.endsWith('/'),
    v = (d || f === '.') && o.endsWith('/');
  return (!k.pathname.endsWith('/') && (p || v) && (k.pathname += '/'), k);
}
var th = (l) => l.replace(/\/\/+/g, '/'),
  sl = (l) => th(l.join('/')),
  qr = (l) => l.replace(/\/+$/, ''),
  m0 = (l) => qr(l).replace(/^\/*/, '/'),
  _0 = (l) => (!l || l === '?' ? '' : l.startsWith('?') ? l : '?' + l),
  f0 = (l) => (!l || l === '#' ? '' : l.startsWith('#') ? l : '#' + l),
  p0 = class {
    constructor(l, i, o, r = !1) {
      ((this.status = l),
        (this.statusText = i || ''),
        (this.internal = r),
        o instanceof Error ? ((this.data = o.toString()), (this.error = o)) : (this.data = o));
    }
  };
function h0(l) {
  return (
    l != null &&
    typeof l.status == 'number' &&
    typeof l.statusText == 'string' &&
    typeof l.internal == 'boolean' &&
    'data' in l
  );
}
function g0(l) {
  let i = l.map((o) => o.route.path).filter(Boolean);
  return sl(i) || '/';
}
var lh =
  typeof window < 'u' && typeof window.document < 'u' && typeof window.document.createElement < 'u';
function ah(l, i) {
  let o = l;
  if (typeof o != 'string' || !u0.test(o)) return { absoluteURL: void 0, isExternal: !1, to: o };
  let r = o,
    c = !1;
  if (lh)
    try {
      let d = new URL(window.location.href),
        f = o.startsWith('//') ? new URL(d.protocol + o) : new URL(o),
        h = Yl(f.pathname, i);
      f.origin === d.origin && h != null ? (o = h + f.search + f.hash) : (c = !0);
    } catch {
      rl(
        !1,
        `<Link to="${o}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`
      );
    }
  return { absoluteURL: r, isExternal: c, to: o };
}
Object.getOwnPropertyNames(Object.prototype).sort().join('\0');
var nh = ['POST', 'PUT', 'PATCH', 'DELETE'];
new Set(nh);
var k0 = ['GET', ...nh];
new Set(k0);
var $n = T.createContext(null);
$n.displayName = 'DataRouter';
var Gr = T.createContext(null);
Gr.displayName = 'DataRouterState';
var ih = T.createContext(!1);
function v0() {
  return T.useContext(ih);
}
var sh = T.createContext({ isTransitioning: !1 });
sh.displayName = 'ViewTransition';
var y0 = T.createContext(new Map());
y0.displayName = 'Fetchers';
var b0 = T.createContext(null);
b0.displayName = 'Await';
var Ut = T.createContext(null);
Ut.displayName = 'Navigation';
var Fi = T.createContext(null);
Fi.displayName = 'Location';
var cl = T.createContext({ outlet: null, matches: [], isDataRoute: !1 });
cl.displayName = 'Route';
var Qc = T.createContext(null);
Qc.displayName = 'RouteError';
var rh = 'REACT_ROUTER_ERROR',
  x0 = 'REDIRECT',
  S0 = 'ROUTE_ERROR_RESPONSE';
function w0(l) {
  if (l.startsWith(`${rh}:${x0}:{`))
    try {
      let i = JSON.parse(l.slice(28));
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
function T0(l) {
  if (l.startsWith(`${rh}:${S0}:{`))
    try {
      let i = JSON.parse(l.slice(40));
      if (
        typeof i == 'object' &&
        i &&
        typeof i.status == 'number' &&
        typeof i.statusText == 'string'
      )
        return new p0(i.status, i.statusText, i.data);
    } catch {}
}
function E0(l, { relative: i } = {}) {
  Ke(Yn(), 'useHref() may be used only in the context of a <Router> component.');
  let { basename: o, navigator: r } = T.useContext(Ut),
    { hash: c, pathname: d, search: f } = Wi(l, { relative: i }),
    h = d;
  return (
    o !== '/' && (h = d === '/' ? o : sl([o, d])),
    r.createHref({ pathname: h, search: f, hash: c })
  );
}
function Yn() {
  return T.useContext(Fi) != null;
}
function vl() {
  return (
    Ke(Yn(), 'useLocation() may be used only in the context of a <Router> component.'),
    T.useContext(Fi).location
  );
}
var oh =
  'You should call navigate() in a React.useEffect(), not when your component is first rendered.';
function uh(l) {
  T.useContext(Ut).static || T.useLayoutEffect(l);
}
function dl() {
  let { isDataRoute: l } = T.useContext(cl);
  return l ? H0() : C0();
}
function C0() {
  Ke(Yn(), 'useNavigate() may be used only in the context of a <Router> component.');
  let l = T.useContext($n),
    { basename: i, navigator: o } = T.useContext(Ut),
    { matches: r } = T.useContext(cl),
    { pathname: c } = vl(),
    d = JSON.stringify(Vc(r)),
    f = T.useRef(!1);
  return (
    uh(() => {
      f.current = !0;
    }),
    T.useCallback(
      (k, p = {}) => {
        if ((rl(f.current, oh), !f.current)) return;
        if (typeof k == 'number') {
          o.go(k);
          return;
        }
        let v = Ur(k, JSON.parse(d), c, p.relative === 'path');
        (l == null && i !== '/' && (v.pathname = v.pathname === '/' ? i : sl([i, v.pathname])),
          (p.replace ? o.replace : o.push)(v, p.state, p));
      },
      [i, o, d, c, l]
    )
  );
}
T.createContext(null);
function N0() {
  let { matches: l } = T.useContext(cl),
    i = l[l.length - 1];
  return (i == null ? void 0 : i.params) ?? {};
}
function Wi(l, { relative: i } = {}) {
  let { matches: o } = T.useContext(cl),
    { pathname: r } = vl(),
    c = JSON.stringify(Vc(o));
  return T.useMemo(() => Ur(l, JSON.parse(c), r, i === 'path'), [l, c, r, i]);
}
function j0(l, i) {
  return ch(l, i);
}
function ch(l, i, o) {
  var S;
  Ke(Yn(), 'useRoutes() may be used only in the context of a <Router> component.');
  let { navigator: r } = T.useContext(Ut),
    { matches: c } = T.useContext(cl),
    d = c[c.length - 1],
    f = d ? d.params : {},
    h = d ? d.pathname : '/',
    k = d ? d.pathnameBase : '/',
    p = d && d.route;
  {
    let b = (p && p.path) || '';
    mh(
      h,
      !p || b.endsWith('*') || b.endsWith('*?'),
      `You rendered descendant <Routes> (or called \`useRoutes()\`) at "${h}" (under <Route path="${b}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${b}"> to <Route path="${b === '/' ? '*' : `${b}/*`}">.`
    );
  }
  let v = vl(),
    y;
  if (i) {
    let b = typeof i == 'string' ? Gn(i) : i;
    (Ke(
      k === '/' || ((S = b.pathname) == null ? void 0 : S.startsWith(k)),
      `When overriding the location using \`<Routes location>\` or \`useRoutes(routes, location)\`, the location pathname must begin with the portion of the URL pathname that was matched by all parent routes. The current pathname base is "${k}" but pathname "${b.pathname}" was given in the \`location\` prop.`
    ),
      (y = b));
  } else y = v;
  let E = y.pathname || '/',
    M = E;
  if (k !== '/') {
    let b = k.replace(/^\//, '').split('/');
    M = '/' + E.replace(/^\//, '').split('/').slice(b.length).join('/');
  }
  let O = Fp(l, { pathname: M });
  (rl(p || O != null, `No routes matched location "${y.pathname}${y.search}${y.hash}" `),
    rl(
      O == null ||
        O[O.length - 1].route.element !== void 0 ||
        O[O.length - 1].route.Component !== void 0 ||
        O[O.length - 1].route.lazy !== void 0,
      `Matched leaf route at location "${y.pathname}${y.search}${y.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`
    ));
  let x = M0(
    O &&
      O.map((b) =>
        Object.assign({}, b, {
          params: Object.assign({}, f, b.params),
          pathname: sl([
            k,
            r.encodeLocation
              ? r.encodeLocation(
                  b.pathname.replace(/%/g, '%25').replace(/\?/g, '%3F').replace(/#/g, '%23')
                ).pathname
              : b.pathname,
          ]),
          pathnameBase:
            b.pathnameBase === '/'
              ? k
              : sl([
                  k,
                  r.encodeLocation
                    ? r.encodeLocation(
                        b.pathnameBase
                          .replace(/%/g, '%25')
                          .replace(/\?/g, '%3F')
                          .replace(/#/g, '%23')
                      ).pathname
                    : b.pathnameBase,
                ]),
        })
      ),
    c,
    o
  );
  return i && x
    ? T.createElement(
        Fi.Provider,
        {
          value: {
            location: {
              pathname: '/',
              search: '',
              hash: '',
              state: null,
              key: 'default',
              unstable_mask: void 0,
              ...y,
            },
            navigationType: 'POP',
          },
        },
        x
      )
    : x;
}
function A0() {
  let l = z0(),
    i = h0(l) ? `${l.status} ${l.statusText}` : l instanceof Error ? l.message : JSON.stringify(l),
    o = l instanceof Error ? l.stack : null,
    r = 'rgba(200,200,200, 0.5)',
    c = { padding: '0.5rem', backgroundColor: r },
    d = { padding: '2px 4px', backgroundColor: r },
    f = null;
  return (
    console.error('Error handled by React Router default ErrorBoundary:', l),
    (f = T.createElement(
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
      o ? T.createElement('pre', { style: c }, o) : null,
      f
    )
  );
}
var L0 = T.createElement(A0, null),
  dh = class extends T.Component {
    constructor(l) {
      (super(l),
        (this.state = { location: l.location, revalidation: l.revalidation, error: l.error }));
    }
    static getDerivedStateFromError(l) {
      return { error: l };
    }
    static getDerivedStateFromProps(l, i) {
      return i.location !== l.location || (i.revalidation !== 'idle' && l.revalidation === 'idle')
        ? { error: l.error, location: l.location, revalidation: l.revalidation }
        : {
            error: l.error !== void 0 ? l.error : i.error,
            location: i.location,
            revalidation: l.revalidation || i.revalidation,
          };
    }
    componentDidCatch(l, i) {
      this.props.onError
        ? this.props.onError(l, i)
        : console.error('React Router caught the following error during render', l);
    }
    render() {
      let l = this.state.error;
      if (
        this.context &&
        typeof l == 'object' &&
        l &&
        'digest' in l &&
        typeof l.digest == 'string'
      ) {
        const o = T0(l.digest);
        o && (l = o);
      }
      let i =
        l !== void 0
          ? T.createElement(
              cl.Provider,
              { value: this.props.routeContext },
              T.createElement(Qc.Provider, { value: l, children: this.props.component })
            )
          : this.props.children;
      return this.context ? T.createElement(q0, { error: l }, i) : i;
    }
  };
dh.contextType = ih;
var gc = new WeakMap();
function q0({ children: l, error: i }) {
  let { basename: o } = T.useContext(Ut);
  if (typeof i == 'object' && i && 'digest' in i && typeof i.digest == 'string') {
    let r = w0(i.digest);
    if (r) {
      let c = gc.get(i);
      if (c) throw c;
      let d = ah(r.location, o);
      if (lh && !gc.get(i))
        if (d.isExternal || r.reloadDocument) window.location.href = d.absoluteURL || d.to;
        else {
          const f = Promise.resolve().then(() =>
            window.__reactRouterDataRouter.navigate(d.to, { replace: r.replace })
          );
          throw (gc.set(i, f), f);
        }
      return T.createElement('meta', {
        httpEquiv: 'refresh',
        content: `0;url=${d.absoluteURL || d.to}`,
      });
    }
  }
  return l;
}
function B0({ routeContext: l, match: i, children: o }) {
  let r = T.useContext($n);
  return (
    r &&
      r.static &&
      r.staticContext &&
      (i.route.errorElement || i.route.ErrorBoundary) &&
      (r.staticContext._deepestRenderedBoundaryId = i.route.id),
    T.createElement(cl.Provider, { value: l }, o)
  );
}
function M0(l, i = [], o) {
  let r = o == null ? void 0 : o.state;
  if (l == null) {
    if (!r) return null;
    if (r.errors) l = r.matches;
    else if (i.length === 0 && !r.initialized && r.matches.length > 0) l = r.matches;
    else return null;
  }
  let c = l,
    d = r == null ? void 0 : r.errors;
  if (d != null) {
    let v = c.findIndex((y) => y.route.id && (d == null ? void 0 : d[y.route.id]) !== void 0);
    (Ke(
      v >= 0,
      `Could not find a matching route for errors on route IDs: ${Object.keys(d).join(',')}`
    ),
      (c = c.slice(0, Math.min(c.length, v + 1))));
  }
  let f = !1,
    h = -1;
  if (o && r) {
    f = r.renderFallback;
    for (let v = 0; v < c.length; v++) {
      let y = c[v];
      if (((y.route.HydrateFallback || y.route.hydrateFallbackElement) && (h = v), y.route.id)) {
        let { loaderData: E, errors: M } = r,
          O = y.route.loader && !E.hasOwnProperty(y.route.id) && (!M || M[y.route.id] === void 0);
        if (y.route.lazy || O) {
          (o.isStatic && (f = !0), h >= 0 ? (c = c.slice(0, h + 1)) : (c = [c[0]]));
          break;
        }
      }
    }
  }
  let k = o == null ? void 0 : o.onError,
    p =
      r && k
        ? (v, y) => {
            var E, M;
            k(v, {
              location: r.location,
              params:
                ((M = (E = r.matches) == null ? void 0 : E[0]) == null ? void 0 : M.params) ?? {},
              unstable_pattern: g0(r.matches),
              errorInfo: y,
            });
          }
        : void 0;
  return c.reduceRight((v, y, E) => {
    let M,
      O = !1,
      x = null,
      S = null;
    r &&
      ((M = d && y.route.id ? d[y.route.id] : void 0),
      (x = y.route.errorElement || L0),
      f &&
        (h < 0 && E === 0
          ? (mh(
              'route-fallback',
              !1,
              'No `HydrateFallback` element provided to render during initial hydration'
            ),
            (O = !0),
            (S = null))
          : h === E && ((O = !0), (S = y.route.hydrateFallbackElement || null))));
    let b = i.concat(c.slice(0, E + 1)),
      C = () => {
        let A;
        return (
          M
            ? (A = x)
            : O
              ? (A = S)
              : y.route.Component
                ? (A = T.createElement(y.route.Component, null))
                : y.route.element
                  ? (A = y.route.element)
                  : (A = v),
          T.createElement(B0, {
            match: y,
            routeContext: { outlet: v, matches: b, isDataRoute: r != null },
            children: A,
          })
        );
      };
    return r && (y.route.ErrorBoundary || y.route.errorElement || E === 0)
      ? T.createElement(dh, {
          location: r.location,
          revalidation: r.revalidation,
          component: x,
          error: M,
          children: C(),
          routeContext: { outlet: null, matches: b, isDataRoute: !0 },
          onError: p,
        })
      : C();
  }, null);
}
function Kc(l) {
  return `${l} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function O0(l) {
  let i = T.useContext($n);
  return (Ke(i, Kc(l)), i);
}
function I0(l) {
  let i = T.useContext(Gr);
  return (Ke(i, Kc(l)), i);
}
function D0(l) {
  let i = T.useContext(cl);
  return (Ke(i, Kc(l)), i);
}
function Zc(l) {
  let i = D0(l),
    o = i.matches[i.matches.length - 1];
  return (Ke(o.route.id, `${l} can only be used on routes that contain a unique "id"`), o.route.id);
}
function R0() {
  return Zc('useRouteId');
}
function z0() {
  var r;
  let l = T.useContext(Qc),
    i = I0('useRouteError'),
    o = Zc('useRouteError');
  return l !== void 0 ? l : (r = i.errors) == null ? void 0 : r[o];
}
function H0() {
  let { router: l } = O0('useNavigate'),
    i = Zc('useNavigate'),
    o = T.useRef(!1);
  return (
    uh(() => {
      o.current = !0;
    }),
    T.useCallback(
      async (c, d = {}) => {
        (rl(o.current, oh),
          o.current &&
            (typeof c == 'number'
              ? await l.navigate(c)
              : await l.navigate(c, { fromRouteId: i, ...d })));
      },
      [l, i]
    )
  );
}
var Ep = {};
function mh(l, i, o) {
  !i && !Ep[l] && ((Ep[l] = !0), rl(!1, o));
}
T.memo(U0);
function U0({ routes: l, future: i, state: o, isStatic: r, onError: c }) {
  return ch(l, void 0, { state: o, isStatic: r, onError: c });
}
function ol({ to: l, replace: i, state: o, relative: r }) {
  Ke(Yn(), '<Navigate> may be used only in the context of a <Router> component.');
  let { static: c } = T.useContext(Ut);
  rl(
    !c,
    '<Navigate> must not be used on the initial render in a <StaticRouter>. This is a no-op, but you should modify your code so the <Navigate> is only ever rendered in response to some user interaction or state change.'
  );
  let { matches: d } = T.useContext(cl),
    { pathname: f } = vl(),
    h = dl(),
    k = Ur(l, Vc(d), f, r === 'path'),
    p = JSON.stringify(k);
  return (
    T.useEffect(() => {
      h(JSON.parse(p), { replace: i, state: o, relative: r });
    }, [h, p, r, i, o]),
    null
  );
}
function Ft(l) {
  Ke(
    !1,
    'A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>.'
  );
}
function G0({
  basename: l = '/',
  children: i = null,
  location: o,
  navigationType: r = 'POP',
  navigator: c,
  static: d = !1,
  unstable_useTransitions: f,
}) {
  Ke(
    !Yn(),
    'You cannot render a <Router> inside another <Router>. You should never have more than one in your app.'
  );
  let h = l.replace(/^\/*/, '/'),
    k = T.useMemo(
      () => ({ basename: h, navigator: c, static: d, unstable_useTransitions: f, future: {} }),
      [h, c, d, f]
    );
  typeof o == 'string' && (o = Gn(o));
  let {
      pathname: p = '/',
      search: v = '',
      hash: y = '',
      state: E = null,
      key: M = 'default',
      unstable_mask: O,
    } = o,
    x = T.useMemo(() => {
      let S = Yl(p, h);
      return S == null
        ? null
        : {
            location: { pathname: S, search: v, hash: y, state: E, key: M, unstable_mask: O },
            navigationType: r,
          };
    }, [h, p, v, y, E, M, r, O]);
  return (
    rl(
      x != null,
      `<Router basename="${h}"> is not able to match the URL "${p}${v}${y}" because it does not start with the basename, so the <Router> won't render anything.`
    ),
    x == null
      ? null
      : T.createElement(
          Ut.Provider,
          { value: k },
          T.createElement(Fi.Provider, { children: i, value: x })
        )
  );
}
function $0({ children: l, location: i }) {
  return j0(Lc(l), i);
}
function Lc(l, i = []) {
  let o = [];
  return (
    T.Children.forEach(l, (r, c) => {
      if (!T.isValidElement(r)) return;
      let d = [...i, c];
      if (r.type === T.Fragment) {
        o.push.apply(o, Lc(r.props.children, d));
        return;
      }
      (Ke(
        r.type === Ft,
        `[${typeof r.type == 'string' ? r.type : r.type.name}] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>`
      ),
        Ke(!r.props.index || !r.props.children, 'An index route cannot have child routes.'));
      let f = {
        id: r.props.id || d.join('-'),
        caseSensitive: r.props.caseSensitive,
        element: r.props.element,
        Component: r.props.Component,
        index: r.props.index,
        path: r.props.path,
        middleware: r.props.middleware,
        loader: r.props.loader,
        action: r.props.action,
        hydrateFallbackElement: r.props.hydrateFallbackElement,
        HydrateFallback: r.props.HydrateFallback,
        errorElement: r.props.errorElement,
        ErrorBoundary: r.props.ErrorBoundary,
        hasErrorBoundary:
          r.props.hasErrorBoundary === !0 ||
          r.props.ErrorBoundary != null ||
          r.props.errorElement != null,
        shouldRevalidate: r.props.shouldRevalidate,
        handle: r.props.handle,
        lazy: r.props.lazy,
      };
      (r.props.children && (f.children = Lc(r.props.children, d)), o.push(f));
    }),
    o
  );
}
var Nr = 'get',
  jr = 'application/x-www-form-urlencoded';
function $r(l) {
  return typeof HTMLElement < 'u' && l instanceof HTMLElement;
}
function Y0(l) {
  return $r(l) && l.tagName.toLowerCase() === 'button';
}
function X0(l) {
  return $r(l) && l.tagName.toLowerCase() === 'form';
}
function V0(l) {
  return $r(l) && l.tagName.toLowerCase() === 'input';
}
function Q0(l) {
  return !!(l.metaKey || l.altKey || l.ctrlKey || l.shiftKey);
}
function K0(l, i) {
  return l.button === 0 && (!i || i === '_self') && !Q0(l);
}
var yr = null;
function Z0() {
  if (yr === null)
    try {
      (new FormData(document.createElement('form'), 0), (yr = !1));
    } catch {
      yr = !0;
    }
  return yr;
}
var J0 = new Set(['application/x-www-form-urlencoded', 'multipart/form-data', 'text/plain']);
function kc(l) {
  return l != null && !J0.has(l)
    ? (rl(
        !1,
        `"${l}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${jr}"`
      ),
      null)
    : l;
}
function P0(l, i) {
  let o, r, c, d, f;
  if (X0(l)) {
    let h = l.getAttribute('action');
    ((r = h ? Yl(h, i) : null),
      (o = l.getAttribute('method') || Nr),
      (c = kc(l.getAttribute('enctype')) || jr),
      (d = new FormData(l)));
  } else if (Y0(l) || (V0(l) && (l.type === 'submit' || l.type === 'image'))) {
    let h = l.form;
    if (h == null)
      throw new Error('Cannot submit a <button> or <input type="submit"> without a <form>');
    let k = l.getAttribute('formaction') || h.getAttribute('action');
    if (
      ((r = k ? Yl(k, i) : null),
      (o = l.getAttribute('formmethod') || h.getAttribute('method') || Nr),
      (c = kc(l.getAttribute('formenctype')) || kc(h.getAttribute('enctype')) || jr),
      (d = new FormData(h, l)),
      !Z0())
    ) {
      let { name: p, type: v, value: y } = l;
      if (v === 'image') {
        let E = p ? `${p}.` : '';
        (d.append(`${E}x`, '0'), d.append(`${E}y`, '0'));
      } else p && d.append(p, y);
    }
  } else {
    if ($r(l))
      throw new Error(
        'Cannot submit element that is not <form>, <button>, or <input type="submit|image">'
      );
    ((o = Nr), (r = null), (c = jr), (f = l));
  }
  return (
    d && c === 'text/plain' && ((f = d), (d = void 0)),
    { action: r, method: o.toLowerCase(), encType: c, formData: d, body: f }
  );
}
Object.getOwnPropertyNames(Object.prototype).sort().join('\0');
function Jc(l, i) {
  if (l === !1 || l === null || typeof l > 'u') throw new Error(i);
}
function _h(l, i, o, r) {
  let c =
    typeof l == 'string'
      ? new URL(l, typeof window > 'u' ? 'server://singlefetch/' : window.location.origin)
      : l;
  return (
    o
      ? c.pathname.endsWith('/')
        ? (c.pathname = `${c.pathname}_.${r}`)
        : (c.pathname = `${c.pathname}.${r}`)
      : c.pathname === '/'
        ? (c.pathname = `_root.${r}`)
        : i && Yl(c.pathname, i) === '/'
          ? (c.pathname = `${qr(i)}/_root.${r}`)
          : (c.pathname = `${qr(c.pathname)}.${r}`),
    c
  );
}
async function F0(l, i) {
  if (l.id in i) return i[l.id];
  try {
    let o = await import(l.module);
    return ((i[l.id] = o), o);
  } catch (o) {
    return (
      console.error(`Error loading route module \`${l.module}\`, reloading page...`),
      console.error(o),
      window.__reactRouterContext && window.__reactRouterContext.isSpaMode,
      window.location.reload(),
      new Promise(() => {})
    );
  }
}
function W0(l) {
  return l == null
    ? !1
    : l.href == null
      ? l.rel === 'preload' && typeof l.imageSrcSet == 'string' && typeof l.imageSizes == 'string'
      : typeof l.rel == 'string' && typeof l.href == 'string';
}
async function ey(l, i, o) {
  let r = await Promise.all(
    l.map(async (c) => {
      let d = i.routes[c.route.id];
      if (d) {
        let f = await F0(d, o);
        return f.links ? f.links() : [];
      }
      return [];
    })
  );
  return ny(
    r
      .flat(1)
      .filter(W0)
      .filter((c) => c.rel === 'stylesheet' || c.rel === 'preload')
      .map((c) =>
        c.rel === 'stylesheet' ? { ...c, rel: 'prefetch', as: 'style' } : { ...c, rel: 'prefetch' }
      )
  );
}
function Cp(l, i, o, r, c, d) {
  let f = (k, p) => (o[p] ? k.route.id !== o[p].route.id : !0),
    h = (k, p) => {
      var v;
      return (
        o[p].pathname !== k.pathname ||
        (((v = o[p].route.path) == null ? void 0 : v.endsWith('*')) &&
          o[p].params['*'] !== k.params['*'])
      );
    };
  return d === 'assets'
    ? i.filter((k, p) => f(k, p) || h(k, p))
    : d === 'data'
      ? i.filter((k, p) => {
          var y;
          let v = r.routes[k.route.id];
          if (!v || !v.hasLoader) return !1;
          if (f(k, p) || h(k, p)) return !0;
          if (k.route.shouldRevalidate) {
            let E = k.route.shouldRevalidate({
              currentUrl: new URL(c.pathname + c.search + c.hash, window.origin),
              currentParams: ((y = o[0]) == null ? void 0 : y.params) || {},
              nextUrl: new URL(l, window.origin),
              nextParams: k.params,
              defaultShouldRevalidate: !0,
            });
            if (typeof E == 'boolean') return E;
          }
          return !0;
        })
      : [];
}
function ty(l, i, { includeHydrateFallback: o } = {}) {
  return ly(
    l
      .map((r) => {
        let c = i.routes[r.route.id];
        if (!c) return [];
        let d = [c.module];
        return (
          c.clientActionModule && (d = d.concat(c.clientActionModule)),
          c.clientLoaderModule && (d = d.concat(c.clientLoaderModule)),
          o && c.hydrateFallbackModule && (d = d.concat(c.hydrateFallbackModule)),
          c.imports && (d = d.concat(c.imports)),
          d
        );
      })
      .flat(1)
  );
}
function ly(l) {
  return [...new Set(l)];
}
function ay(l) {
  let i = {},
    o = Object.keys(l).sort();
  for (let r of o) i[r] = l[r];
  return i;
}
function ny(l, i) {
  let o = new Set();
  return (
    new Set(i),
    l.reduce((r, c) => {
      let d = JSON.stringify(ay(c));
      return (o.has(d) || (o.add(d), r.push({ key: d, link: c })), r);
    }, [])
  );
}
function Pc() {
  let l = T.useContext($n);
  return (Jc(l, 'You must render this element inside a <DataRouterContext.Provider> element'), l);
}
function iy() {
  let l = T.useContext(Gr);
  return (
    Jc(l, 'You must render this element inside a <DataRouterStateContext.Provider> element'),
    l
  );
}
var Fc = T.createContext(void 0);
Fc.displayName = 'FrameworkContext';
function Wc() {
  let l = T.useContext(Fc);
  return (Jc(l, 'You must render this element inside a <HydratedRouter> element'), l);
}
function sy(l, i) {
  let o = T.useContext(Fc),
    [r, c] = T.useState(!1),
    [d, f] = T.useState(!1),
    { onFocus: h, onBlur: k, onMouseEnter: p, onMouseLeave: v, onTouchStart: y } = i,
    E = T.useRef(null);
  (T.useEffect(() => {
    if ((l === 'render' && f(!0), l === 'viewport')) {
      let x = (b) => {
          b.forEach((C) => {
            f(C.isIntersecting);
          });
        },
        S = new IntersectionObserver(x, { threshold: 0.5 });
      return (
        E.current && S.observe(E.current),
        () => {
          S.disconnect();
        }
      );
    }
  }, [l]),
    T.useEffect(() => {
      if (r) {
        let x = setTimeout(() => {
          f(!0);
        }, 100);
        return () => {
          clearTimeout(x);
        };
      }
    }, [r]));
  let M = () => {
      c(!0);
    },
    O = () => {
      (c(!1), f(!1));
    };
  return o
    ? l !== 'intent'
      ? [d, E, {}]
      : [
          d,
          E,
          {
            onFocus: Gi(h, M),
            onBlur: Gi(k, O),
            onMouseEnter: Gi(p, M),
            onMouseLeave: Gi(v, O),
            onTouchStart: Gi(y, M),
          },
        ]
    : [!1, E, {}];
}
function Gi(l, i) {
  return (o) => {
    (l && l(o), o.defaultPrevented || i(o));
  };
}
function ry({ page: l, ...i }) {
  let o = v0(),
    { router: r } = Pc(),
    c = T.useMemo(() => Fp(r.routes, l, r.basename), [r.routes, l, r.basename]);
  return c
    ? o
      ? T.createElement(uy, { page: l, matches: c, ...i })
      : T.createElement(cy, { page: l, matches: c, ...i })
    : null;
}
function oy(l) {
  let { manifest: i, routeModules: o } = Wc(),
    [r, c] = T.useState([]);
  return (
    T.useEffect(() => {
      let d = !1;
      return (
        ey(l, i, o).then((f) => {
          d || c(f);
        }),
        () => {
          d = !0;
        }
      );
    }, [l, i, o]),
    r
  );
}
function uy({ page: l, matches: i, ...o }) {
  let r = vl(),
    { future: c } = Wc(),
    { basename: d } = Pc(),
    f = T.useMemo(() => {
      if (l === r.pathname + r.search + r.hash) return [];
      let h = _h(l, d, c.unstable_trailingSlashAwareDataRequests, 'rsc'),
        k = !1,
        p = [];
      for (let v of i)
        typeof v.route.shouldRevalidate == 'function' ? (k = !0) : p.push(v.route.id);
      return (
        k && p.length > 0 && h.searchParams.set('_routes', p.join(',')),
        [h.pathname + h.search]
      );
    }, [d, c.unstable_trailingSlashAwareDataRequests, l, r, i]);
  return T.createElement(
    T.Fragment,
    null,
    f.map((h) => T.createElement('link', { key: h, rel: 'prefetch', as: 'fetch', href: h, ...o }))
  );
}
function cy({ page: l, matches: i, ...o }) {
  let r = vl(),
    { future: c, manifest: d, routeModules: f } = Wc(),
    { basename: h } = Pc(),
    { loaderData: k, matches: p } = iy(),
    v = T.useMemo(() => Cp(l, i, p, d, r, 'data'), [l, i, p, d, r]),
    y = T.useMemo(() => Cp(l, i, p, d, r, 'assets'), [l, i, p, d, r]),
    E = T.useMemo(() => {
      if (l === r.pathname + r.search + r.hash) return [];
      let x = new Set(),
        S = !1;
      if (
        (i.forEach((C) => {
          var F;
          let A = d.routes[C.route.id];
          !A ||
            !A.hasLoader ||
            ((!v.some((P) => P.route.id === C.route.id) &&
              C.route.id in k &&
              (F = f[C.route.id]) != null &&
              F.shouldRevalidate) ||
            A.hasClientLoader
              ? (S = !0)
              : x.add(C.route.id));
        }),
        x.size === 0)
      )
        return [];
      let b = _h(l, h, c.unstable_trailingSlashAwareDataRequests, 'data');
      return (
        S &&
          x.size > 0 &&
          b.searchParams.set(
            '_routes',
            i
              .filter((C) => x.has(C.route.id))
              .map((C) => C.route.id)
              .join(',')
          ),
        [b.pathname + b.search]
      );
    }, [h, c.unstable_trailingSlashAwareDataRequests, k, r, d, v, i, l, f]),
    M = T.useMemo(() => ty(y, d), [y, d]),
    O = oy(y);
  return T.createElement(
    T.Fragment,
    null,
    E.map((x) => T.createElement('link', { key: x, rel: 'prefetch', as: 'fetch', href: x, ...o })),
    M.map((x) => T.createElement('link', { key: x, rel: 'modulepreload', href: x, ...o })),
    O.map(({ key: x, link: S }) =>
      T.createElement('link', {
        key: x,
        nonce: o.nonce,
        ...S,
        crossOrigin: S.crossOrigin ?? o.crossOrigin,
      })
    )
  );
}
function dy(...l) {
  return (i) => {
    l.forEach((o) => {
      typeof o == 'function' ? o(i) : o != null && (o.current = i);
    });
  };
}
var my =
  typeof window < 'u' && typeof window.document < 'u' && typeof window.document.createElement < 'u';
try {
  my && (window.__reactRouterVersion = '7.14.2');
} catch {}
function _y({ basename: l, children: i, unstable_useTransitions: o, window: r }) {
  let c = T.useRef();
  c.current == null && (c.current = Vv({ window: r, v5Compat: !0 }));
  let d = c.current,
    [f, h] = T.useState({ action: d.action, location: d.location }),
    k = T.useCallback(
      (p) => {
        o === !1 ? h(p) : T.startTransition(() => h(p));
      },
      [o]
    );
  return (
    T.useLayoutEffect(() => d.listen(k), [d, k]),
    T.createElement(G0, {
      basename: l,
      children: i,
      location: f.location,
      navigationType: f.action,
      navigator: d,
      unstable_useTransitions: o,
    })
  );
}
var fh = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,
  ph = T.forwardRef(function (
    {
      onClick: i,
      discover: o = 'render',
      prefetch: r = 'none',
      relative: c,
      reloadDocument: d,
      replace: f,
      unstable_mask: h,
      state: k,
      target: p,
      to: v,
      preventScrollReset: y,
      viewTransition: E,
      unstable_defaultShouldRevalidate: M,
      ...O
    },
    x
  ) {
    let { basename: S, navigator: b, unstable_useTransitions: C } = T.useContext(Ut),
      A = typeof v == 'string' && fh.test(v),
      F = ah(v, S);
    v = F.to;
    let P = E0(v, { relative: c }),
      G = vl(),
      U = null;
    if (h) {
      let ge = Ur(h, [], G.unstable_mask ? G.unstable_mask.pathname : '/', !0);
      (S !== '/' && (ge.pathname = ge.pathname === '/' ? S : sl([S, ge.pathname])),
        (U = b.createHref(ge)));
    }
    let [ae, ie, le] = sy(r, O),
      ce = gy(v, {
        replace: f,
        unstable_mask: h,
        state: k,
        target: p,
        preventScrollReset: y,
        relative: c,
        viewTransition: E,
        unstable_defaultShouldRevalidate: M,
        unstable_useTransitions: C,
      });
    function he(ge) {
      (i && i(ge), ge.defaultPrevented || ce(ge));
    }
    let ve = !(F.isExternal || d),
      Se = T.createElement('a', {
        ...O,
        ...le,
        href: (ve ? U : void 0) || F.absoluteURL || P,
        onClick: ve ? he : i,
        ref: dy(x, ie),
        target: p,
        'data-discover': !A && o === 'render' ? 'true' : void 0,
      });
    return ae && !A ? T.createElement(T.Fragment, null, Se, T.createElement(ry, { page: P })) : Se;
  });
ph.displayName = 'Link';
var fy = T.forwardRef(function (
  {
    'aria-current': i = 'page',
    caseSensitive: o = !1,
    className: r = '',
    end: c = !1,
    style: d,
    to: f,
    viewTransition: h,
    children: k,
    ...p
  },
  v
) {
  let y = Wi(f, { relative: p.relative }),
    E = vl(),
    M = T.useContext(Gr),
    { navigator: O, basename: x } = T.useContext(Ut),
    S = M != null && xy(y) && h === !0,
    b = O.encodeLocation ? O.encodeLocation(y).pathname : y.pathname,
    C = E.pathname,
    A = M && M.navigation && M.navigation.location ? M.navigation.location.pathname : null;
  (o || ((C = C.toLowerCase()), (A = A ? A.toLowerCase() : null), (b = b.toLowerCase())),
    A && x && (A = Yl(A, x) || A));
  const F = b !== '/' && b.endsWith('/') ? b.length - 1 : b.length;
  let P = C === b || (!c && C.startsWith(b) && C.charAt(F) === '/'),
    G = A != null && (A === b || (!c && A.startsWith(b) && A.charAt(b.length) === '/')),
    U = { isActive: P, isPending: G, isTransitioning: S },
    ae = P ? i : void 0,
    ie;
  typeof r == 'function'
    ? (ie = r(U))
    : (ie = [r, P ? 'active' : null, G ? 'pending' : null, S ? 'transitioning' : null]
        .filter(Boolean)
        .join(' '));
  let le = typeof d == 'function' ? d(U) : d;
  return T.createElement(
    ph,
    { ...p, 'aria-current': ae, className: ie, ref: v, style: le, to: f, viewTransition: h },
    typeof k == 'function' ? k(U) : k
  );
});
fy.displayName = 'NavLink';
var py = T.forwardRef(
  (
    {
      discover: l = 'render',
      fetcherKey: i,
      navigate: o,
      reloadDocument: r,
      replace: c,
      state: d,
      method: f = Nr,
      action: h,
      onSubmit: k,
      relative: p,
      preventScrollReset: v,
      viewTransition: y,
      unstable_defaultShouldRevalidate: E,
      ...M
    },
    O
  ) => {
    let { unstable_useTransitions: x } = T.useContext(Ut),
      S = yy(),
      b = by(h, { relative: p }),
      C = f.toLowerCase() === 'get' ? 'get' : 'post',
      A = typeof h == 'string' && fh.test(h),
      F = (P) => {
        if ((k && k(P), P.defaultPrevented)) return;
        P.preventDefault();
        let G = P.nativeEvent.submitter,
          U = (G == null ? void 0 : G.getAttribute('formmethod')) || f,
          ae = () =>
            S(G || P.currentTarget, {
              fetcherKey: i,
              method: U,
              navigate: o,
              replace: c,
              state: d,
              relative: p,
              preventScrollReset: v,
              viewTransition: y,
              unstable_defaultShouldRevalidate: E,
            });
        x && o !== !1 ? T.startTransition(() => ae()) : ae();
      };
    return T.createElement('form', {
      ref: O,
      method: C,
      action: b,
      onSubmit: r ? k : F,
      ...M,
      'data-discover': !A && l === 'render' ? 'true' : void 0,
    });
  }
);
py.displayName = 'Form';
function hy(l) {
  return `${l} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function hh(l) {
  let i = T.useContext($n);
  return (Ke(i, hy(l)), i);
}
function gy(
  l,
  {
    target: i,
    replace: o,
    unstable_mask: r,
    state: c,
    preventScrollReset: d,
    relative: f,
    viewTransition: h,
    unstable_defaultShouldRevalidate: k,
    unstable_useTransitions: p,
  } = {}
) {
  let v = dl(),
    y = vl(),
    E = Wi(l, { relative: f });
  return T.useCallback(
    (M) => {
      if (K0(M, i)) {
        M.preventDefault();
        let O = o !== void 0 ? o : Zi(y) === Zi(E),
          x = () =>
            v(l, {
              replace: O,
              unstable_mask: r,
              state: c,
              preventScrollReset: d,
              relative: f,
              viewTransition: h,
              unstable_defaultShouldRevalidate: k,
            });
        p ? T.startTransition(() => x()) : x();
      }
    },
    [y, v, E, o, r, c, i, l, d, f, h, k, p]
  );
}
var ky = 0,
  vy = () => `__${String(++ky)}__`;
function yy() {
  let { router: l } = hh('useSubmit'),
    { basename: i } = T.useContext(Ut),
    o = R0(),
    r = l.fetch,
    c = l.navigate;
  return T.useCallback(
    async (d, f = {}) => {
      let { action: h, method: k, encType: p, formData: v, body: y } = P0(d, i);
      if (f.navigate === !1) {
        let E = f.fetcherKey || vy();
        await r(E, o, f.action || h, {
          unstable_defaultShouldRevalidate: f.unstable_defaultShouldRevalidate,
          preventScrollReset: f.preventScrollReset,
          formData: v,
          body: y,
          formMethod: f.method || k,
          formEncType: f.encType || p,
          flushSync: f.flushSync,
        });
      } else
        await c(f.action || h, {
          unstable_defaultShouldRevalidate: f.unstable_defaultShouldRevalidate,
          preventScrollReset: f.preventScrollReset,
          formData: v,
          body: y,
          formMethod: f.method || k,
          formEncType: f.encType || p,
          replace: f.replace,
          state: f.state,
          fromRouteId: o,
          flushSync: f.flushSync,
          viewTransition: f.viewTransition,
        });
    },
    [r, c, i, o]
  );
}
function by(l, { relative: i } = {}) {
  let { basename: o } = T.useContext(Ut),
    r = T.useContext(cl);
  Ke(r, 'useFormAction must be used inside a RouteContext');
  let [c] = r.matches.slice(-1),
    d = { ...Wi(l || '.', { relative: i }) },
    f = vl();
  if (l == null) {
    d.search = f.search;
    let h = new URLSearchParams(d.search),
      k = h.getAll('index');
    if (k.some((v) => v === '')) {
      (h.delete('index'), k.filter((y) => y).forEach((y) => h.append('index', y)));
      let v = h.toString();
      d.search = v ? `?${v}` : '';
    }
  }
  return (
    (!l || l === '.') &&
      c.route.index &&
      (d.search = d.search ? d.search.replace(/^\?/, '?index&') : '?index'),
    o !== '/' && (d.pathname = d.pathname === '/' ? o : sl([o, d.pathname])),
    Zi(d)
  );
}
function xy(l, { relative: i } = {}) {
  let o = T.useContext(sh);
  Ke(
    o != null,
    "`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?"
  );
  let { basename: r } = hh('useViewTransitionState'),
    c = Wi(l, { relative: i });
  if (!o.isTransitioning) return !1;
  let d = Yl(o.currentLocation.pathname, r) || o.currentLocation.pathname,
    f = Yl(o.nextLocation.pathname, r) || o.nextLocation.pathname;
  return Lr(c.pathname, f) != null || Lr(c.pathname, d) != null;
}
const Sy = '_layout_bjf95_1',
  wy = '_enemies_bjf95_12',
  Ty = '_enemy_bjf95_20',
  Ey = '_targeted_bjf95_35',
  Cy = '_enemyName_bjf95_39',
  Ny = '_down_bjf95_44',
  jy = '_log_bjf95_48',
  Ay = '_logLine_bjf95_60',
  Ly = '_party_bjf95_64',
  qy = '_rowTag_bjf95_71',
  By = '_cardRow_bjf95_77',
  My = '_card_bjf95_77',
  Oy = '_cardActive_bjf95_100',
  Iy = '_cardDecided_bjf95_105',
  Dy = '_cardName_bjf95_109',
  Ry = '_uni_bjf95_117',
  zy = '_cardJob_bjf95_121',
  Hy = '_gaugeRow_bjf95_127',
  Uy = '_gaugeLabel_bjf95_133',
  Gy = '_flash_bjf95_141',
  $y = '_summons_bjf95_163',
  Yy = '_summon_bjf95_163',
  Xy = '_summonName_bjf95_181',
  Vy = '_summonHp_bjf95_190',
  Qy = '_cardNums_bjf95_196',
  Ky = '_cardCmd_bjf95_202',
  Zy = '_empty_bjf95_208',
  Jy = '_command_bjf95_213',
  Py = '_skillList_bjf95_219',
  Fy = '_skillBtn_bjf95_225',
  Wy = '_skillTop_bjf95_237',
  eb = '_skillName_bjf95_244',
  tb = '_skillDesc_bjf95_249',
  lb = '_skillSummary_bjf95_255',
  ab = '_target_bjf95_35',
  nb = '_unionBanner_bjf95_267',
  ib = '_unionBannerHead_bjf95_280',
  sb = '_unionBannerDesc_bjf95_287',
  rb = '_unionInfo_bjf95_294',
  ob = '_unionCancel_bjf95_304',
  ub = '_unionHint_bjf95_313',
  cb = '_unionBtn_bjf95_319',
  db = '_cmdHead_bjf95_325',
  mb = '_menu_bjf95_330',
  _b = '_menuBtn_bjf95_336',
  fb = '_tp_bjf95_353',
  pb = '_menuBack_bjf95_359',
  hb = '_execRow_bjf95_369',
  gb = '_redo_bjf95_374',
  kb = '_primary_bjf95_384',
  vb = '_result_bjf95_399',
  yb = '_resultTitle_bjf95_410',
  bb = '_resultBody_bjf95_415',
  xb = '_expList_bjf95_419',
  Sb = '_expRow_bjf95_427',
  wb = '_expName_bjf95_433',
  Tb = '_expLv_bjf95_441',
  Eb = '_expUp_bjf95_446',
  Cb = '_expNum_bjf95_451',
  Nb = '_playback_bjf95_457',
  jb = '_playbackHint_bjf95_467',
  Ab = '_skip_bjf95_473',
  Lb = '_logLineNew_bjf95_484',
  qb = '_dialogOverlay_bjf95_499',
  Bb = '_dialog_bjf95_499',
  Mb = '_dialogTitle_bjf95_534',
  Ob = '_dialogName_bjf95_540',
  Ib = '_dialogStats_bjf95_545',
  Db = '_dialogStat_bjf95_545',
  Rb = '_fxIntro_bjf95_561',
  zb = '_fxOutro_bjf95_581',
  Hb = '_fxLose_bjf95_590',
  K = {
    layout: Sy,
    enemies: wy,
    enemy: Ty,
    targeted: Ey,
    enemyName: Cy,
    down: Ny,
    log: jy,
    logLine: Ay,
    party: Ly,
    rowTag: qy,
    cardRow: By,
    card: My,
    cardActive: Oy,
    cardDecided: Iy,
    cardName: Dy,
    uni: Ry,
    cardJob: zy,
    gaugeRow: Hy,
    gaugeLabel: Uy,
    flash: Gy,
    summons: $y,
    summon: Yy,
    summonName: Xy,
    summonHp: Vy,
    cardNums: Qy,
    cardCmd: Ky,
    empty: Zy,
    command: Jy,
    skillList: Py,
    skillBtn: Fy,
    skillTop: Wy,
    skillName: eb,
    skillDesc: tb,
    skillSummary: lb,
    target: ab,
    unionBanner: nb,
    unionBannerHead: ib,
    unionBannerDesc: sb,
    unionInfo: rb,
    unionCancel: ob,
    unionHint: ub,
    unionBtn: cb,
    cmdHead: db,
    menu: mb,
    menuBtn: _b,
    tp: fb,
    menuBack: pb,
    execRow: hb,
    redo: gb,
    primary: kb,
    result: vb,
    resultTitle: yb,
    resultBody: bb,
    expList: xb,
    expRow: Sb,
    expName: wb,
    expLv: Tb,
    expUp: Eb,
    expNum: Cb,
    playback: Nb,
    playbackHint: jb,
    skip: Ab,
    logLineNew: Lb,
    dialogOverlay: qb,
    dialog: Bb,
    dialogTitle: Mb,
    dialogName: Ob,
    dialogStats: Ib,
    dialogStat: Db,
    fxIntro: Rb,
    fxOutro: zb,
    fxLose: Hb,
  },
  Ub = '_row_1t6j7_1',
  Gb = '_label_1t6j7_8',
  $b = '_track_1t6j7_16',
  Yb = '_fill_1t6j7_24',
  Xb = '_value_1t6j7_30',
  $i = { row: Ub, label: Gb, track: $b, fill: Yb, value: Xb },
  Bn = ({ value: l, max: i, color: o = '#4caf50', label: r, showValue: c = !0 }) => {
    const d = i > 0 ? Math.max(0, Math.min(100, (l / i) * 100)) : 0;
    return _.jsxs('div', {
      className: $i.row,
      children: [
        r ? _.jsx('span', { className: $i.label, children: r }) : null,
        _.jsx('div', {
          className: $i.track,
          children: _.jsx('div', {
            className: $i.fill,
            style: { width: `${d}%`, backgroundColor: o },
          }),
        }),
        c
          ? _.jsxs('span', {
              className: $i.value,
              children: [Math.max(0, Math.round(l)), '/', Math.round(i)],
            })
          : null,
      ],
    });
  },
  Wt = {
    skill_power_slash: {
      id: 'skill_power_slash',
      name: 'パワースラッシュ',
      tree: 'base',
      tpCost: (l) => 3 + l,
      element: 'slash',
      target: 'enemyOne',
      effects: [{ kind: 'damage', statBase: 'str', power: (l) => 1.4 + 0.2 * l }],
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
          modifier: (l) => 1.2 + 0.05 * l,
          turns: 3,
          stackGroup: 'defBuff',
        },
      ],
    },
    skill_shield_bash: {
      id: 'skill_shield_bash',
      name: 'シールドバッシュ',
      tree: 'base',
      tpCost: (l) => 3 + l,
      element: 'bash',
      target: 'enemyOne',
      effects: [
        { kind: 'damage', statBase: 'str', power: (l) => 1 + 0.15 * l },
        { kind: 'ailment', ailment: 'paralysis', chance: (l) => 0.2 + 0.05 * l, turns: 2 },
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
        { kind: 'decoy', weight: (l) => 2 + l, turns: 2 },
      ],
    },
    skill_fire_bolt: {
      id: 'skill_fire_bolt',
      name: 'ファイアボルト',
      tree: 'base',
      tpCost: (l) => 4 + l,
      element: 'fire',
      target: 'enemyOne',
      effects: [{ kind: 'damage', statBase: 'int', power: (l) => 1.5 + 0.25 * l }],
    },
    skill_ice_bolt: {
      id: 'skill_ice_bolt',
      name: 'アイスボルト',
      tree: 'base',
      tpCost: (l) => 4 + l,
      element: 'ice',
      target: 'enemyOne',
      effects: [{ kind: 'damage', statBase: 'int', power: (l) => 1.5 + 0.25 * l }],
    },
    skill_aimed_shot: {
      id: 'skill_aimed_shot',
      name: '狙撃',
      tree: 'base',
      tpCost: (l) => 3 + l,
      element: 'pierce',
      target: 'enemyOne',
      effects: [{ kind: 'damage', statBase: 'str', power: (l) => 1.3 + 0.2 * l }],
    },
    skill_spread_shot: {
      id: 'skill_spread_shot',
      name: '拡散射撃',
      tree: 'base',
      tpCost: (l) => 5 + l,
      element: 'pierce',
      target: 'enemyAll',
      effects: [{ kind: 'damage', statBase: 'str', power: (l) => 0.8 + 0.12 * l }],
    },
    skill_leg_snipe: {
      id: 'skill_leg_snipe',
      name: '脚封じの矢',
      tree: 'base',
      tpCost: (l) => 4 + l,
      element: 'pierce',
      target: 'enemyOne',
      effects: [
        { kind: 'damage', statBase: 'str', power: (l) => 1 + 0.15 * l },
        { kind: 'ailment', ailment: 'legBind', chance: (l) => 0.35 + 0.05 * l, turns: 3 },
      ],
    },
    skill_arm_snipe: {
      id: 'skill_arm_snipe',
      name: '腕封じの矢',
      tree: 'base',
      tpCost: (l) => 4 + l,
      element: 'pierce',
      target: 'enemyOne',
      effects: [
        { kind: 'damage', statBase: 'str', power: (l) => 1 + 0.15 * l },
        { kind: 'ailment', ailment: 'armBind', chance: (l) => 0.35 + 0.05 * l, turns: 3 },
      ],
    },
    skill_head_snipe: {
      id: 'skill_head_snipe',
      name: '頭封じの矢',
      tree: 'base',
      tpCost: (l) => 4 + l,
      element: 'pierce',
      target: 'enemyOne',
      effects: [
        { kind: 'damage', statBase: 'str', power: (l) => 1 + 0.15 * l },
        { kind: 'ailment', ailment: 'headBind', chance: (l) => 0.35 + 0.05 * l, turns: 3 },
      ],
    },
    skill_summon_wolf: {
      id: 'skill_summon_wolf',
      name: '狼を召喚',
      tree: 'base',
      tpCost: (l) => 6 + l,
      element: 'almighty',
      target: 'self',
      effects: [{ kind: 'summon', summonKind: 'summon_wolf' }],
    },
    skill_summon_bulwark: {
      id: 'skill_summon_bulwark',
      name: '石像を召喚',
      tree: 'base',
      tpCost: (l) => 6 + l,
      element: 'almighty',
      target: 'self',
      effects: [{ kind: 'summon', summonKind: 'summon_bulwark' }],
    },
    skill_summon_familiar: {
      id: 'skill_summon_familiar',
      name: '使い魔を召喚',
      tree: 'base',
      tpCost: (l) => 7 + l,
      element: 'almighty',
      target: 'self',
      effects: [{ kind: 'summon', summonKind: 'summon_familiar' }],
    },
    skill_cleave: {
      id: 'skill_cleave',
      name: 'なぎ払い',
      tree: 'master',
      tpCost: (l) => 5 + l,
      element: 'slash',
      target: 'enemyAll',
      effects: [{ kind: 'damage', statBase: 'str', power: (l) => 0.7 + 0.12 * l }],
    },
    skill_volt_bolt: {
      id: 'skill_volt_bolt',
      name: 'ボルトショック',
      tree: 'master',
      tpCost: (l) => 4 + l,
      element: 'volt',
      target: 'enemyOne',
      effects: [{ kind: 'damage', statBase: 'int', power: (l) => 1.5 + 0.25 * l }],
    },
    skill_heal: {
      id: 'skill_heal',
      name: 'ヒール',
      tree: 'base',
      tpCost: (l) => 4 + l,
      element: 'almighty',
      target: 'allyOne',
      effects: [{ kind: 'heal', amount: (l) => 40 + 20 * l }],
    },
    skill_mass_heal: {
      id: 'skill_mass_heal',
      name: 'マスヒール',
      tree: 'base',
      tpCost: (l) => 8 + l,
      element: 'almighty',
      target: 'allyAll',
      effects: [{ kind: 'heal', amount: (l) => 25 + 15 * l }],
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
          modifier: (l) => 1.2 + 0.05 * l,
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
          modifier: (l) => 1.2 + 0.05 * l,
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
          modifier: (l) => 1.2 + 0.05 * l,
          turns: 3,
          stackGroup: 'evaBuff',
        },
      ],
    },
    skill_weaken_song: {
      id: 'skill_weaken_song',
      name: '弱体の歌',
      tree: 'base',
      tpCost: (l) => 6 + l,
      element: 'almighty',
      target: 'enemyAll',
      effects: [
        {
          kind: 'buff',
          stat: 'patk',
          modifier: (l) => 0.85 - 0.03 * l,
          turns: 3,
          stackGroup: 'atkDebuff',
        },
      ],
    },
    skill_triple_strike: {
      id: 'skill_triple_strike',
      name: '三段突き',
      tree: 'base',
      tpCost: (l) => 4 + l,
      element: 'bash',
      target: 'enemyOne',
      effects: [{ kind: 'damage', statBase: 'str', power: (l) => 0.7 + 0.1 * l, hits: 3 }],
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
          modifier: (l) => 1.3 + 0.05 * l,
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
          modifier: (l) => 1.4 + 0.05 * l,
          turns: 3,
          stackGroup: 'defBuff',
        },
      ],
    },
    skill_venom_hex: {
      id: 'skill_venom_hex',
      name: '毒の呪',
      tree: 'base',
      tpCost: (l) => 5 + l,
      element: 'almighty',
      target: 'enemyOne',
      effects: [
        { kind: 'damage', statBase: 'int', power: (l) => 0.8 + 0.1 * l },
        { kind: 'ailment', ailment: 'poison', chance: (l) => 0.5 + 0.05 * l, turns: 3 },
      ],
    },
    skill_sleep_hex: {
      id: 'skill_sleep_hex',
      name: '眠りの呪',
      tree: 'base',
      tpCost: (l) => 7 + l,
      element: 'almighty',
      target: 'enemyAll',
      effects: [{ kind: 'ailment', ailment: 'sleep', chance: (l) => 0.35 + 0.03 * l, turns: 2 }],
    },
    skill_weaken_hex: {
      id: 'skill_weaken_hex',
      name: '魔弱の呪',
      tree: 'base',
      tpCost: (l) => 5 + l,
      element: 'almighty',
      target: 'enemyOne',
      effects: [
        {
          kind: 'buff',
          stat: 'matk',
          modifier: (l) => 0.8 - 0.03 * l,
          turns: 3,
          stackGroup: 'matkDebuff',
        },
      ],
    },
    skill_chain_slash: {
      id: 'skill_chain_slash',
      name: '連刃の構え',
      tree: 'master',
      tpCost: () => 5,
      element: 'slash',
      target: 'self',
      effects: [{ kind: 'chase', statBase: 'str', power: (l) => 0.6 + 0.1 * l, turns: 3 }],
    },
    skill_riposte: {
      id: 'skill_riposte',
      name: '反攻の構え',
      tree: 'master',
      tpCost: () => 5,
      element: 'almighty',
      target: 'self',
      effects: [
        {
          kind: 'counter',
          chance: (l) => 0.4 + 0.05 * l,
          power: (l) => 1 + 0.1 * l,
          statBase: 'str',
          turns: 3,
        },
      ],
    },
    skill_line_guard: {
      id: 'skill_line_guard',
      name: 'ラインガード',
      tree: 'master',
      tpCost: (l) => 6 + l,
      element: 'almighty',
      target: 'allyAll',
      effects: [{ kind: 'barrier', absorb: (l) => 30 + 15 * l, turns: 2 }],
    },
    skill_counter_guard: {
      id: 'skill_counter_guard',
      name: 'カウンターガード',
      tree: 'master',
      tpCost: () => 5,
      element: 'almighty',
      target: 'self',
      effects: [
        {
          kind: 'counter',
          chance: (l) => 0.5 + 0.04 * l,
          power: (l) => 1.1 + 0.1 * l,
          statBase: 'str',
          turns: 3,
        },
      ],
    },
    skill_fire_storm: {
      id: 'skill_fire_storm',
      name: 'ファイアストーム',
      tree: 'master',
      tpCost: (l) => 6 + l,
      element: 'fire',
      target: 'enemyAll',
      effects: [{ kind: 'damage', statBase: 'int', power: (l) => 0.9 + 0.15 * l }],
    },
    skill_first_aid: {
      id: 'skill_first_aid',
      name: '救護指示',
      tree: 'master',
      tpCost: (l) => 4 + l,
      element: 'almighty',
      target: 'allyOne',
      effects: [{ kind: 'heal', amount: (l) => 30 + 15 * l }],
    },
    skill_refresh_herb: {
      id: 'skill_refresh_herb',
      name: 'リフレシュハーブ',
      tree: 'master',
      tpCost: (l) => 5 + l,
      element: 'almighty',
      target: 'allyAll',
      effects: [{ kind: 'cleanse' }],
    },
    skill_poison_smoke: {
      id: 'skill_poison_smoke',
      name: 'ポイズンスモーク',
      tree: 'master',
      tpCost: (l) => 5 + l,
      element: 'almighty',
      target: 'enemyAll',
      effects: [{ kind: 'ailment', ailment: 'poison', chance: (l) => 0.4 + 0.04 * l, turns: 3 }],
    },
    skill_guard_dance: {
      id: 'skill_guard_dance',
      name: '守りの舞',
      tree: 'master',
      tpCost: () => 6,
      element: 'almighty',
      target: 'allyAll',
      effects: [
        {
          kind: 'buff',
          stat: 'pdef',
          modifier: (l) => 1.2 + 0.05 * l,
          turns: 3,
          stackGroup: 'defBuff',
        },
      ],
    },
    skill_healing_song: {
      id: 'skill_healing_song',
      name: '癒しの歌',
      tree: 'master',
      tpCost: (l) => 6 + l,
      element: 'almighty',
      target: 'allyAll',
      effects: [{ kind: 'heal', amount: (l) => 18 + 10 * l }],
    },
    skill_arm_break: {
      id: 'skill_arm_break',
      name: 'アームブレイク',
      tree: 'master',
      tpCost: (l) => 4 + l,
      element: 'bash',
      target: 'enemyOne',
      effects: [
        { kind: 'damage', statBase: 'str', power: (l) => 1 + 0.15 * l },
        { kind: 'ailment', ailment: 'armBind', chance: (l) => 0.4 + 0.05 * l, turns: 3 },
      ],
    },
    skill_cross_counter: {
      id: 'skill_cross_counter',
      name: 'クロスカウンター',
      tree: 'master',
      tpCost: () => 5,
      element: 'almighty',
      target: 'self',
      effects: [
        {
          kind: 'counter',
          chance: (l) => 0.5 + 0.04 * l,
          power: (l) => 1.3 + 0.1 * l,
          statBase: 'str',
          turns: 3,
        },
      ],
    },
    skill_blind_hex: {
      id: 'skill_blind_hex',
      name: '盲目の呪',
      tree: 'master',
      tpCost: (l) => 6 + l,
      element: 'almighty',
      target: 'enemyAll',
      effects: [{ kind: 'ailment', ailment: 'blind', chance: (l) => 0.35 + 0.03 * l, turns: 3 }],
    },
    skill_armor_hex: {
      id: 'skill_armor_hex',
      name: '鎧弱の呪',
      tree: 'master',
      tpCost: (l) => 5 + l,
      element: 'almighty',
      target: 'enemyOne',
      effects: [
        {
          kind: 'buff',
          stat: 'pdef',
          modifier: (l) => 0.8 - 0.03 * l,
          turns: 3,
          stackGroup: 'pdefDebuff',
        },
      ],
    },
    skill_call_wraith: {
      id: 'skill_call_wraith',
      name: '死霊召喚',
      tree: 'base',
      tpCost: (l) => 6 + l,
      element: 'almighty',
      target: 'self',
      effects: [{ kind: 'summon', summonKind: 'summon_wraith' }],
    },
    skill_soul_barrier: {
      id: 'skill_soul_barrier',
      name: '無慈悲な盾',
      tree: 'base',
      tpCost: (l) => 5 + l,
      element: 'almighty',
      target: 'allyAll',
      effects: [{ kind: 'barrier', absorb: (l) => 25 + 12 * l, turns: 2 }],
    },
    skill_call_sentinel: {
      id: 'skill_call_sentinel',
      name: '亡者の壁',
      tree: 'master',
      tpCost: (l) => 6 + l,
      element: 'almighty',
      target: 'self',
      effects: [{ kind: 'summon', summonKind: 'summon_revenant' }],
    },
    skill_soul_burst: {
      id: 'skill_soul_burst',
      name: '死霊爆裂',
      tree: 'master',
      tpCost: (l) => 7 + l,
      element: 'almighty',
      target: 'enemyAll',
      effects: [{ kind: 'damage', statBase: 'int', power: (l) => 0.9 + 0.15 * l }],
    },
    skill_cleanse_draft: {
      id: 'skill_cleanse_draft',
      name: '解毒の秘薬',
      tree: 'title',
      tpCost: (l) => 4 + l,
      element: 'almighty',
      target: 'allyAll',
      effects: [{ kind: 'cleanse' }],
    },
    skill_counter_throw: {
      id: 'skill_counter_throw',
      name: '当て身投げ',
      tree: 'title',
      tpCost: () => 5,
      element: 'almighty',
      target: 'self',
      effects: [
        {
          kind: 'counter',
          chance: (l) => 0.45 + 0.05 * l,
          power: (l) => 1.2 + 0.1 * l,
          statBase: 'str',
          turns: 3,
        },
      ],
    },
    skill_warrior_double_slash: {
      id: 'skill_warrior_double_slash',
      name: 'ダブルスラッシュ',
      tree: 'master',
      tpCost: (l) => 5 + l,
      element: 'slash',
      target: 'enemyOne',
      effects: [{ kind: 'damage', statBase: 'str', power: (l) => 0.6 + 0.1 * l, hits: 2 }],
    },
    skill_warrior_heavy_swing: {
      id: 'skill_warrior_heavy_swing',
      name: 'ヘビースイング',
      tree: 'master',
      tpCost: (l) => 5 + l,
      element: 'bash',
      target: 'enemyOne',
      effects: [
        { kind: 'damage', statBase: 'str', power: (l) => 1.5 + 0.2 * l },
        { kind: 'ailment', ailment: 'headBind', chance: (l) => 0.35 + 0.05 * l, turns: 2 },
      ],
    },
    skill_warrior_war_cry: {
      id: 'skill_warrior_war_cry',
      name: '雄叫び',
      tree: 'base',
      tpCost: () => 4,
      element: 'almighty',
      target: 'self',
      effects: [
        {
          kind: 'buff',
          stat: 'patk',
          modifier: (l) => 1.3 + 0.05 * l,
          turns: 3,
          stackGroup: 'atkBuff',
        },
      ],
    },
    skill_warrior_blade_storm: {
      id: 'skill_warrior_blade_storm',
      name: 'ブレイドストーム',
      tree: 'master',
      tpCost: (l) => 8 + l,
      element: 'slash',
      target: 'enemyAll',
      effects: [{ kind: 'damage', statBase: 'str', power: (l) => 1.1 + 0.18 * l }],
    },
    skill_warrior_executioner: {
      id: 'skill_warrior_executioner',
      name: 'エグゼキューション',
      tree: 'master',
      tpCost: (l) => 8 + l,
      element: 'slash',
      target: 'enemyOne',
      effects: [{ kind: 'damage', statBase: 'str', power: (l) => 2 + 0.3 * l }],
    },
    skill_warrior_t_rampage: {
      id: 'skill_warrior_t_rampage',
      name: 'ランページ',
      tree: 'title',
      tpCost: (l) => 8 + l,
      element: 'slash',
      target: 'enemyOne',
      effects: [{ kind: 'damage', statBase: 'str', power: (l) => 0.6 + 0.1 * l, hits: 3 }],
    },
    skill_warrior_t_overwatch: {
      id: 'skill_warrior_t_overwatch',
      name: '哨戒の構え',
      tree: 'title',
      tpCost: () => 5,
      element: 'almighty',
      target: 'self',
      effects: [
        {
          kind: 'counter',
          chance: (l) => 0.4 + 0.05 * l,
          power: (l) => 1.1 + 0.1 * l,
          statBase: 'str',
          turns: 3,
        },
      ],
    },
    skill_guardian_shield_press: {
      id: 'skill_guardian_shield_press',
      name: 'シールドプレス',
      tree: 'master',
      tpCost: (l) => 7 + l,
      element: 'bash',
      target: 'enemyAll',
      effects: [
        { kind: 'damage', statBase: 'str', power: (l) => 0.85 + 0.13 * l },
        { kind: 'ailment', ailment: 'paralysis', chance: (l) => 0.3 + 0.03 * l, turns: 2 },
      ],
    },
    skill_guardian_taunt_roar: {
      id: 'skill_guardian_taunt_roar',
      name: '威圧の咆哮',
      tree: 'master',
      tpCost: () => 5,
      element: 'almighty',
      target: 'self',
      effects: [
        {
          kind: 'buff',
          stat: 'pdef',
          modifier: (l) => 1.3 + 0.05 * l,
          turns: 3,
          stackGroup: 'defBuff',
        },
        { kind: 'decoy', weight: (l) => 2 + l, turns: 3 },
      ],
    },
    skill_guardian_aegis: {
      id: 'skill_guardian_aegis',
      name: 'イージスウォール',
      tree: 'master',
      tpCost: (l) => 8 + l,
      element: 'almighty',
      target: 'allyAll',
      effects: [{ kind: 'barrier', absorb: (l) => 25 + 12 * l, turns: 3 }],
    },
    skill_guardian_retribution: {
      id: 'skill_guardian_retribution',
      name: 'リトリビューション',
      tree: 'master',
      tpCost: () => 6,
      element: 'almighty',
      target: 'self',
      effects: [
        {
          kind: 'counter',
          chance: (l) => 0.4 + 0.05 * l,
          power: (l) => 1.1 + 0.1 * l,
          statBase: 'str',
          turns: 3,
        },
      ],
    },
    skill_guardian_t_last_bastion: {
      id: 'skill_guardian_t_last_bastion',
      name: 'ラストバスティオン',
      tree: 'title',
      tpCost: (l) => 8 + l,
      element: 'almighty',
      target: 'allyAll',
      effects: [{ kind: 'barrier', absorb: (l) => 40 + 15 * l, turns: 3 }],
    },
    skill_guardian_t_lance_charge: {
      id: 'skill_guardian_t_lance_charge',
      name: 'ランスチャージ',
      tree: 'title',
      tpCost: (l) => 5 + l,
      element: 'pierce',
      target: 'enemyOne',
      effects: [{ kind: 'damage', statBase: 'str', power: (l) => 1.5 + 0.2 * l }],
    },
    skill_mage_ice_storm: {
      id: 'skill_mage_ice_storm',
      name: 'アイスストーム',
      tree: 'master',
      tpCost: (l) => 6 + l,
      element: 'ice',
      target: 'enemyAll',
      effects: [{ kind: 'damage', statBase: 'int', power: (l) => 0.85 + 0.13 * l }],
    },
    skill_mage_volt_storm: {
      id: 'skill_mage_volt_storm',
      name: 'ボルトストーム',
      tree: 'master',
      tpCost: (l) => 6 + l,
      element: 'volt',
      target: 'enemyAll',
      effects: [{ kind: 'damage', statBase: 'int', power: (l) => 0.85 + 0.13 * l }],
    },
    skill_mage_focus: {
      id: 'skill_mage_focus',
      name: '魔力集中',
      tree: 'base',
      tpCost: () => 4,
      element: 'almighty',
      target: 'self',
      effects: [
        {
          kind: 'buff',
          stat: 'matk',
          modifier: (l) => 1.3 + 0.05 * l,
          turns: 3,
          stackGroup: 'matkBuff',
        },
      ],
    },
    skill_mage_meteor: {
      id: 'skill_mage_meteor',
      name: 'メテオ',
      tree: 'master',
      tpCost: (l) => 10 + l,
      element: 'fire',
      target: 'enemyAll',
      effects: [{ kind: 'damage', statBase: 'int', power: (l) => 1.1 + 0.18 * l }],
    },
    skill_mage_thunderbolt: {
      id: 'skill_mage_thunderbolt',
      name: 'サンダーボルト',
      tree: 'master',
      tpCost: (l) => 8 + l,
      element: 'volt',
      target: 'enemyOne',
      effects: [{ kind: 'damage', statBase: 'int', power: (l) => 2 + 0.3 * l }],
    },
    skill_mage_t_hellfire: {
      id: 'skill_mage_t_hellfire',
      name: 'ヘルファイア',
      tree: 'title',
      tpCost: (l) => 8 + l,
      element: 'fire',
      target: 'enemyOne',
      effects: [{ kind: 'damage', statBase: 'int', power: (l) => 2 + 0.3 * l }],
    },
    skill_mage_t_mana_surge: {
      id: 'skill_mage_t_mana_surge',
      name: 'マナサージ',
      tree: 'title',
      tpCost: () => 0,
      element: 'almighty',
      target: 'self',
      effects: [{ kind: 'restoreTp', amount: (l) => 8 + 4 * l }],
    },
    skill_ranger_piercing_arrow: {
      id: 'skill_ranger_piercing_arrow',
      name: '貫通の矢',
      tree: 'master',
      tpCost: (l) => 5 + l,
      element: 'pierce',
      target: 'enemyOne',
      effects: [{ kind: 'damage', statBase: 'str', power: (l) => 1.5 + 0.2 * l }],
    },
    skill_ranger_charged_shot: {
      id: 'skill_ranger_charged_shot',
      name: 'チャージショット',
      tree: 'master',
      tpCost: (l) => 8 + l,
      element: 'pierce',
      target: 'enemyOne',
      effects: [{ kind: 'damage', statBase: 'str', power: (l) => 2 + 0.3 * l }],
    },
    skill_ranger_rain_of_arrows: {
      id: 'skill_ranger_rain_of_arrows',
      name: '矢の雨',
      tree: 'master',
      tpCost: (l) => 7 + l,
      element: 'pierce',
      target: 'enemyAll',
      effects: [{ kind: 'damage', statBase: 'str', power: (l) => 0.85 + 0.13 * l }],
    },
    skill_ranger_pin_shot: {
      id: 'skill_ranger_pin_shot',
      name: '足止めの矢',
      tree: 'master',
      tpCost: (l) => 4 + l,
      element: 'pierce',
      target: 'enemyOne',
      effects: [
        { kind: 'damage', statBase: 'str', power: (l) => 1 + 0.15 * l },
        { kind: 'ailment', ailment: 'legBind', chance: (l) => 0.35 + 0.05 * l, turns: 3 },
      ],
    },
    skill_ranger_summon_falcon: {
      id: 'skill_ranger_summon_falcon',
      name: '鷹を召喚',
      tree: 'master',
      tpCost: (l) => 7 + l,
      element: 'almighty',
      target: 'self',
      effects: [{ kind: 'summon', summonKind: 'summon_familiar' }],
    },
    skill_ranger_t_snipe: {
      id: 'skill_ranger_t_snipe',
      name: '一矢必中',
      tree: 'title',
      tpCost: (l) => 8 + l,
      element: 'pierce',
      target: 'enemyOne',
      effects: [{ kind: 'damage', statBase: 'str', power: (l) => 2 + 0.3 * l }],
    },
    skill_ranger_t_camouflage: {
      id: 'skill_ranger_t_camouflage',
      name: '韜晦',
      tree: 'title',
      tpCost: () => 5,
      element: 'almighty',
      target: 'self',
      effects: [
        {
          kind: 'buff',
          stat: 'eva',
          modifier: (l) => 1.3 + 0.05 * l,
          turns: 3,
          stackGroup: 'evaBuff',
        },
      ],
    },
    skill_medic_full_heal: {
      id: 'skill_medic_full_heal',
      name: 'フルヒール',
      tree: 'master',
      tpCost: (l) => 8 + l,
      element: 'almighty',
      target: 'allyOne',
      effects: [{ kind: 'heal', amount: (l) => 40 + 20 * l }],
    },
    skill_medic_party_cure: {
      id: 'skill_medic_party_cure',
      name: 'パーティキュア',
      tree: 'master',
      tpCost: (l) => 10 + l,
      element: 'almighty',
      target: 'allyAll',
      effects: [{ kind: 'heal', amount: (l) => 25 + 15 * l }],
    },
    skill_medic_tp_tonic: {
      id: 'skill_medic_tp_tonic',
      name: 'TPトニック',
      tree: 'master',
      tpCost: (l) => 5 + l,
      element: 'almighty',
      target: 'allyAll',
      effects: [{ kind: 'restoreTp', amount: (l) => 8 + 4 * l }],
    },
    skill_medic_blind_powder: {
      id: 'skill_medic_blind_powder',
      name: '目潰しの粉',
      tree: 'master',
      tpCost: (l) => 5 + l,
      element: 'almighty',
      target: 'enemyAll',
      effects: [{ kind: 'ailment', ailment: 'blind', chance: (l) => 0.3 + 0.03 * l, turns: 3 }],
    },
    skill_medic_t_revive_light: {
      id: 'skill_medic_t_revive_light',
      name: '蘇生の光',
      tree: 'title',
      tpCost: (l) => 10 + l,
      element: 'almighty',
      target: 'allyAll',
      effects: [{ kind: 'heal', amount: (l) => 30 + 18 * l }],
    },
    skill_medic_t_stimulant: {
      id: 'skill_medic_t_stimulant',
      name: '気付け薬',
      tree: 'title',
      tpCost: (l) => 5 + l,
      element: 'almighty',
      target: 'allyAll',
      effects: [{ kind: 'restoreTp', amount: (l) => 8 + 4 * l }],
    },
    skill_dancer_blade_waltz: {
      id: 'skill_dancer_blade_waltz',
      name: '剣舞の円',
      tree: 'master',
      tpCost: (l) => 7 + l,
      element: 'slash',
      target: 'enemyAll',
      effects: [{ kind: 'damage', statBase: 'str', power: (l) => 0.85 + 0.13 * l }],
    },
    skill_dancer_inspire_dance: {
      id: 'skill_dancer_inspire_dance',
      name: '鼓舞の舞',
      tree: 'master',
      tpCost: () => 6,
      element: 'almighty',
      target: 'allyAll',
      effects: [
        {
          kind: 'buff',
          stat: 'matk',
          modifier: (l) => 1.2 + 0.05 * l,
          turns: 3,
          stackGroup: 'matkBuff',
        },
      ],
    },
    skill_dancer_grace_song: {
      id: 'skill_dancer_grace_song',
      name: '加護の歌',
      tree: 'master',
      tpCost: () => 6,
      element: 'almighty',
      target: 'allyAll',
      effects: [
        {
          kind: 'buff',
          stat: 'mdef',
          modifier: (l) => 1.2 + 0.05 * l,
          turns: 3,
          stackGroup: 'mdefBuff',
        },
      ],
    },
    skill_dancer_revival_dance: {
      id: 'skill_dancer_revival_dance',
      name: '蘇生の舞',
      tree: 'master',
      tpCost: (l) => 8 + l,
      element: 'almighty',
      target: 'allyAll',
      effects: [{ kind: 'heal', amount: (l) => 25 + 15 * l }],
    },
    skill_dancer_t_finale: {
      id: 'skill_dancer_t_finale',
      name: '剣の終幕',
      tree: 'title',
      tpCost: (l) => 8 + l,
      element: 'slash',
      target: 'enemyOne',
      effects: [{ kind: 'damage', statBase: 'str', power: (l) => 2 + 0.3 * l }],
    },
    skill_dancer_t_lullaby: {
      id: 'skill_dancer_t_lullaby',
      name: '子守唄',
      tree: 'title',
      tpCost: (l) => 7 + l,
      element: 'almighty',
      target: 'enemyAll',
      effects: [{ kind: 'ailment', ailment: 'sleep', chance: (l) => 0.3 + 0.03 * l, turns: 2 }],
    },
    skill_monk_palm_strike: {
      id: 'skill_monk_palm_strike',
      name: '崩拳',
      tree: 'base',
      tpCost: (l) => 3 + l,
      element: 'bash',
      target: 'enemyOne',
      effects: [{ kind: 'damage', statBase: 'str', power: (l) => 1.2 + 0.18 * l }],
    },
    skill_monk_leg_sweep: {
      id: 'skill_monk_leg_sweep',
      name: '足払い',
      tree: 'base',
      tpCost: (l) => 3 + l,
      element: 'bash',
      target: 'enemyOne',
      effects: [
        { kind: 'damage', statBase: 'str', power: (l) => 1 + 0.15 * l },
        { kind: 'ailment', ailment: 'legBind', chance: (l) => 0.35 + 0.05 * l, turns: 3 },
      ],
    },
    skill_monk_flurry: {
      id: 'skill_monk_flurry',
      name: '連弾',
      tree: 'master',
      tpCost: (l) => 5 + l,
      element: 'bash',
      target: 'enemyOne',
      effects: [{ kind: 'damage', statBase: 'str', power: (l) => 0.6 + 0.1 * l, hits: 4 }],
    },
    skill_monk_head_smash: {
      id: 'skill_monk_head_smash',
      name: '当て身打ち',
      tree: 'master',
      tpCost: (l) => 4 + l,
      element: 'bash',
      target: 'enemyOne',
      effects: [
        { kind: 'damage', statBase: 'str', power: (l) => 1 + 0.15 * l },
        { kind: 'ailment', ailment: 'headBind', chance: (l) => 0.4 + 0.05 * l, turns: 3 },
      ],
    },
    skill_monk_rising_dragon: {
      id: 'skill_monk_rising_dragon',
      name: '昇龍奥義',
      tree: 'master',
      tpCost: (l) => 8 + l,
      element: 'bash',
      target: 'enemyOne',
      effects: [{ kind: 'damage', statBase: 'str', power: (l) => 2 + 0.3 * l }],
    },
    skill_grappler_t_chain_throw: {
      id: 'skill_grappler_t_chain_throw',
      name: '連環投げ',
      tree: 'title',
      tpCost: () => 5,
      element: 'bash',
      target: 'self',
      effects: [{ kind: 'chase', statBase: 'str', power: (l) => 0.6 + 0.1 * l, turns: 3 }],
    },
    skill_zen_t_mountain_stance: {
      id: 'skill_zen_t_mountain_stance',
      name: '不動明王の構え',
      tree: 'title',
      tpCost: (l) => 4 + l,
      element: 'almighty',
      target: 'self',
      effects: [
        {
          kind: 'buff',
          stat: 'pdef',
          modifier: (l) => 1.3 + 0.05 * l,
          turns: 3,
          stackGroup: 'defBuff',
        },
        { kind: 'decoy', weight: (l) => 2 + l, turns: 3 },
      ],
    },
    skill_zen_t_meditation: {
      id: 'skill_zen_t_meditation',
      name: '瞑想',
      tree: 'title',
      tpCost: () => 0,
      element: 'almighty',
      target: 'self',
      effects: [{ kind: 'restoreTp', amount: (l) => 8 + 4 * l }],
    },
    skill_hexer_paralyze_hex: {
      id: 'skill_hexer_paralyze_hex',
      name: '麻痺の呪',
      tree: 'base',
      tpCost: (l) => 5 + l,
      element: 'almighty',
      target: 'enemyOne',
      effects: [
        { kind: 'damage', statBase: 'int', power: (l) => 0.8 + 0.1 * l },
        { kind: 'ailment', ailment: 'paralysis', chance: (l) => 0.35 + 0.05 * l, turns: 2 },
      ],
    },
    skill_hexer_eva_hex: {
      id: 'skill_hexer_eva_hex',
      name: '鈍重の呪',
      tree: 'base',
      tpCost: (l) => 7 + l,
      element: 'almighty',
      target: 'enemyAll',
      effects: [
        {
          kind: 'buff',
          stat: 'eva',
          modifier: (l) => 0.85 - 0.03 * l,
          turns: 3,
          stackGroup: 'evaDebuff',
        },
      ],
    },
    skill_hexer_acc_hex: {
      id: 'skill_hexer_acc_hex',
      name: '失明の呪',
      tree: 'base',
      tpCost: (l) => 5 + l,
      element: 'almighty',
      target: 'enemyOne',
      effects: [
        {
          kind: 'buff',
          stat: 'acc',
          modifier: (l) => 0.85 - 0.03 * l,
          turns: 3,
          stackGroup: 'accDebuff',
        },
      ],
    },
    skill_hexer_mass_venom: {
      id: 'skill_hexer_mass_venom',
      name: '瘴気の呪',
      tree: 'master',
      tpCost: (l) => 7 + l,
      element: 'almighty',
      target: 'enemyAll',
      effects: [{ kind: 'ailment', ailment: 'poison', chance: (l) => 0.3 + 0.03 * l, turns: 3 }],
    },
    skill_hexer_doom_hex: {
      id: 'skill_hexer_doom_hex',
      name: '崩呪',
      tree: 'master',
      tpCost: (l) => 8 + l,
      element: 'almighty',
      target: 'enemyOne',
      effects: [
        { kind: 'damage', statBase: 'int', power: (l) => 2 + 0.3 * l },
        { kind: 'ailment', ailment: 'paralysis', chance: (l) => 0.35 + 0.05 * l, turns: 2 },
      ],
    },
    skill_hexer_curse_field: {
      id: 'skill_hexer_curse_field',
      name: '呪縛の領域',
      tree: 'master',
      tpCost: (l) => 7 + l,
      element: 'almighty',
      target: 'enemyAll',
      effects: [
        {
          kind: 'buff',
          stat: 'patk',
          modifier: (l) => 0.85 - 0.03 * l,
          turns: 3,
          stackGroup: 'atkDebuff',
        },
      ],
    },
    skill_plague_t_pandemic: {
      id: 'skill_plague_t_pandemic',
      name: '疫病の散布',
      tree: 'title',
      tpCost: (l) => 7 + l,
      element: 'almighty',
      target: 'enemyAll',
      effects: [
        { kind: 'damage', statBase: 'int', power: (l) => 0.7 + 0.12 * l },
        { kind: 'ailment', ailment: 'poison', chance: (l) => 0.3 + 0.03 * l, turns: 3 },
      ],
    },
    skill_plague_t_wither: {
      id: 'skill_plague_t_wither',
      name: '衰弱の呪',
      tree: 'title',
      tpCost: (l) => 6 + l,
      element: 'almighty',
      target: 'enemyAll',
      effects: [
        {
          kind: 'buff',
          stat: 'matk',
          modifier: (l) => 0.85 - 0.03 * l,
          turns: 3,
          stackGroup: 'matkDebuff',
        },
      ],
    },
    skill_warlock_t_dark_bolt: {
      id: 'skill_warlock_t_dark_bolt',
      name: '闇撃の呪',
      tree: 'title',
      tpCost: (l) => 5 + l,
      element: 'almighty',
      target: 'enemyOne',
      effects: [{ kind: 'damage', statBase: 'int', power: (l) => 1.5 + 0.2 * l }],
    },
    skill_summoner_call_familiar: {
      id: 'skill_summoner_call_familiar',
      name: '使い魔召喚',
      tree: 'base',
      tpCost: (l) => 6 + l,
      element: 'almighty',
      target: 'self',
      effects: [{ kind: 'summon', summonKind: 'summon_familiar' }],
    },
    skill_summoner_soul_drain: {
      id: 'skill_summoner_soul_drain',
      name: '吸魂',
      tree: 'base',
      tpCost: (l) => 3 + l,
      element: 'almighty',
      target: 'enemyOne',
      effects: [{ kind: 'damage', statBase: 'int', power: (l) => 1.2 + 0.18 * l }],
    },
    skill_summoner_tp_offering: {
      id: 'skill_summoner_tp_offering',
      name: '供物の儀',
      tree: 'master',
      tpCost: () => 0,
      element: 'almighty',
      target: 'allyAll',
      effects: [{ kind: 'restoreTp', amount: (l) => 8 + 4 * l }],
    },
    skill_summoner_grave_chill: {
      id: 'skill_summoner_grave_chill',
      name: '冥府の冷気',
      tree: 'master',
      tpCost: (l) => 5 + l,
      element: 'ice',
      target: 'enemyOne',
      effects: [
        { kind: 'damage', statBase: 'int', power: (l) => 1.5 + 0.2 * l },
        { kind: 'ailment', ailment: 'paralysis', chance: (l) => 0.35 + 0.05 * l, turns: 2 },
      ],
    },
    skill_summoner_oblivion: {
      id: 'skill_summoner_oblivion',
      name: '滅魂爆裂',
      tree: 'master',
      tpCost: (l) => 10 + l,
      element: 'almighty',
      target: 'enemyAll',
      effects: [{ kind: 'damage', statBase: 'int', power: (l) => 1.1 + 0.18 * l }],
    },
    skill_summoner_spirit_chase: {
      id: 'skill_summoner_spirit_chase',
      name: '霊撃連鎖',
      tree: 'master',
      tpCost: () => 5,
      element: 'almighty',
      target: 'self',
      effects: [{ kind: 'chase', statBase: 'int', power: (l) => 0.6 + 0.1 * l, turns: 3 }],
    },
    skill_necromancer_t_call_revenant: {
      id: 'skill_necromancer_t_call_revenant',
      name: '亡者召喚',
      tree: 'title',
      tpCost: (l) => 6 + l,
      element: 'almighty',
      target: 'self',
      effects: [{ kind: 'summon', summonKind: 'summon_revenant' }],
    },
    skill_necromancer_t_death_pulse: {
      id: 'skill_necromancer_t_death_pulse',
      name: '死波',
      tree: 'title',
      tpCost: (l) => 7 + l,
      element: 'almighty',
      target: 'enemyAll',
      effects: [{ kind: 'damage', statBase: 'int', power: (l) => 0.85 + 0.13 * l }],
    },
    skill_puppeteer_t_aegis: {
      id: 'skill_puppeteer_t_aegis',
      name: '傀儡の盾',
      tree: 'title',
      tpCost: (l) => 5 + l,
      element: 'almighty',
      target: 'allyAll',
      effects: [{ kind: 'barrier', absorb: (l) => 25 + 12 * l, turns: 3 }],
    },
    skill_warrior_flame_blade: {
      id: 'skill_warrior_flame_blade',
      name: 'フレイムブレイド',
      tree: 'master',
      tpCost: (l) => 5 + l,
      element: 'fire',
      target: 'enemyOne',
      effects: [{ kind: 'damage', statBase: 'str', power: (l) => 1.5 + 0.2 * l }],
    },
    skill_warrior_whirlwind: {
      id: 'skill_warrior_whirlwind',
      name: 'ワールウィンド',
      tree: 'master',
      tpCost: (l) => 7 + l,
      element: 'bash',
      target: 'enemyAll',
      effects: [{ kind: 'damage', statBase: 'str', power: (l) => 0.85 + 0.13 * l }],
    },
    skill_warrior_armor_crush: {
      id: 'skill_warrior_armor_crush',
      name: 'アーマークラッシュ',
      tree: 'master',
      tpCost: (l) => 5 + l,
      element: 'bash',
      target: 'enemyOne',
      effects: [
        { kind: 'damage', statBase: 'str', power: (l) => 1.5 + 0.2 * l },
        { kind: 'ailment', ailment: 'armBind', chance: (l) => 0.35 + 0.05 * l, turns: 2 },
      ],
    },
    skill_warrior_blade_dance: {
      id: 'skill_warrior_blade_dance',
      name: 'ブレイドダンス',
      tree: 'master',
      tpCost: (l) => 5 + l,
      element: 'slash',
      target: 'enemyOne',
      effects: [{ kind: 'damage', statBase: 'str', power: (l) => 0.6 + 0.1 * l, hits: 3 }],
    },
    skill_warrior_savage_blow: {
      id: 'skill_warrior_savage_blow',
      name: 'サベージブロウ',
      tree: 'master',
      tpCost: (l) => 10 + l,
      element: 'bash',
      target: 'enemyOne',
      effects: [{ kind: 'damage', statBase: 'str', power: (l) => 2.4 + 0.35 * l }],
    },
    skill_warrior_meteor_strike: {
      id: 'skill_warrior_meteor_strike',
      name: 'メテオストライク',
      tree: 'master',
      tpCost: (l) => 12 + l,
      element: 'slash',
      target: 'enemyAll',
      effects: [{ kind: 'damage', statBase: 'str', power: (l) => 1.3 + 0.2 * l }],
    },
    skill_guardian_shield_throw: {
      id: 'skill_guardian_shield_throw',
      name: 'シールドスロー',
      tree: 'master',
      tpCost: (l) => 7 + l,
      element: 'bash',
      target: 'enemyAll',
      effects: [
        { kind: 'damage', statBase: 'str', power: (l) => 0.85 + 0.13 * l },
        { kind: 'ailment', ailment: 'paralysis', chance: (l) => 0.3 + 0.03 * l, turns: 2 },
      ],
    },
    skill_guardian_spear_thrust: {
      id: 'skill_guardian_spear_thrust',
      name: 'スピアスラスト',
      tree: 'master',
      tpCost: (l) => 5 + l,
      element: 'pierce',
      target: 'enemyOne',
      effects: [{ kind: 'damage', statBase: 'str', power: (l) => 1.5 + 0.2 * l }],
    },
    skill_guardian_bulwark_stance: {
      id: 'skill_guardian_bulwark_stance',
      name: 'バルワークの構え',
      tree: 'master',
      tpCost: (l) => 4 + l,
      element: 'almighty',
      target: 'self',
      effects: [
        {
          kind: 'buff',
          stat: 'pdef',
          modifier: (l) => 1.3 + 0.05 * l,
          turns: 3,
          stackGroup: 'defBuff',
        },
        { kind: 'decoy', weight: (l) => 2 + l, turns: 3 },
      ],
    },
    skill_guardian_iron_counter: {
      id: 'skill_guardian_iron_counter',
      name: 'アイアンカウンター',
      tree: 'master',
      tpCost: () => 6,
      element: 'almighty',
      target: 'self',
      effects: [
        {
          kind: 'counter',
          chance: (l) => 0.5 + 0.04 * l,
          power: (l) => 1.3 + 0.1 * l,
          statBase: 'str',
          turns: 3,
        },
      ],
    },
    skill_guardian_phalanx: {
      id: 'skill_guardian_phalanx',
      name: 'ファランクス',
      tree: 'master',
      tpCost: (l) => 6 + l,
      element: 'almighty',
      target: 'allyAll',
      effects: [{ kind: 'barrier', absorb: (l) => 30 + 15 * l, turns: 2 }],
    },
    skill_guardian_dragon_lance: {
      id: 'skill_guardian_dragon_lance',
      name: 'ドラゴンランス',
      tree: 'master',
      tpCost: (l) => 10 + l,
      element: 'pierce',
      target: 'enemyOne',
      effects: [{ kind: 'damage', statBase: 'str', power: (l) => 2.4 + 0.35 * l }],
    },
    skill_guardian_great_wall: {
      id: 'skill_guardian_great_wall',
      name: 'グレートウォール',
      tree: 'master',
      tpCost: (l) => 10 + l,
      element: 'almighty',
      target: 'allyAll',
      effects: [{ kind: 'barrier', absorb: (l) => 40 + 15 * l, turns: 3 }],
    },
    skill_mage_fire_lance: {
      id: 'skill_mage_fire_lance',
      name: 'ファイアランス',
      tree: 'master',
      tpCost: (l) => 5 + l,
      element: 'fire',
      target: 'enemyOne',
      effects: [{ kind: 'damage', statBase: 'int', power: (l) => 1.5 + 0.2 * l }],
    },
    skill_mage_frost_lance: {
      id: 'skill_mage_frost_lance',
      name: 'フロストランス',
      tree: 'master',
      tpCost: (l) => 5 + l,
      element: 'ice',
      target: 'enemyOne',
      effects: [
        { kind: 'damage', statBase: 'int', power: (l) => 1.5 + 0.2 * l },
        { kind: 'ailment', ailment: 'paralysis', chance: (l) => 0.35 + 0.05 * l, turns: 2 },
      ],
    },
    skill_mage_volt_lance: {
      id: 'skill_mage_volt_lance',
      name: 'ボルトランス',
      tree: 'master',
      tpCost: (l) => 5 + l,
      element: 'volt',
      target: 'enemyOne',
      effects: [{ kind: 'damage', statBase: 'int', power: (l) => 1.5 + 0.2 * l }],
    },
    skill_mage_mana_charge: {
      id: 'skill_mage_mana_charge',
      name: 'マナチャージ',
      tree: 'master',
      tpCost: (l) => 4 + l,
      element: 'almighty',
      target: 'self',
      effects: [{ kind: 'restoreTp', amount: (l) => 6 + 3 * l }],
    },
    skill_mage_absolute_zero: {
      id: 'skill_mage_absolute_zero',
      name: 'アブソリュートゼロ',
      tree: 'master',
      tpCost: (l) => 12 + l,
      element: 'ice',
      target: 'enemyAll',
      effects: [{ kind: 'damage', statBase: 'int', power: (l) => 1.3 + 0.2 * l }],
    },
    skill_mage_ragnarok: {
      id: 'skill_mage_ragnarok',
      name: 'ラグナロク',
      tree: 'master',
      tpCost: (l) => 10 + l,
      element: 'almighty',
      target: 'enemyOne',
      effects: [{ kind: 'damage', statBase: 'int', power: (l) => 2.4 + 0.35 * l }],
    },
    skill_ranger_double_shot: {
      id: 'skill_ranger_double_shot',
      name: 'ダブルショット',
      tree: 'master',
      tpCost: (l) => 5 + l,
      element: 'pierce',
      target: 'enemyOne',
      effects: [{ kind: 'damage', statBase: 'str', power: (l) => 0.6 + 0.1 * l, hits: 2 }],
    },
    skill_ranger_sky_volley: {
      id: 'skill_ranger_sky_volley',
      name: '空裂の斉射',
      tree: 'master',
      tpCost: (l) => 10 + l,
      element: 'pierce',
      target: 'enemyAll',
      effects: [{ kind: 'damage', statBase: 'str', power: (l) => 1.3 + 0.2 * l }],
    },
    skill_ranger_apollo_shot: {
      id: 'skill_ranger_apollo_shot',
      name: '滅びの一矢',
      tree: 'master',
      tpCost: (l) => 10 + l,
      element: 'pierce',
      target: 'enemyOne',
      effects: [{ kind: 'damage', statBase: 'str', power: (l) => 2.4 + 0.35 * l }],
    },
    skill_ranger_binding_volley: {
      id: 'skill_ranger_binding_volley',
      name: '封鎖の斉射',
      tree: 'master',
      tpCost: (l) => 7 + l,
      element: 'pierce',
      target: 'enemyAll',
      effects: [
        { kind: 'damage', statBase: 'str', power: (l) => 0.85 + 0.13 * l },
        { kind: 'ailment', ailment: 'armBind', chance: (l) => 0.3 + 0.03 * l, turns: 2 },
      ],
    },
    skill_ranger_falconry: {
      id: 'skill_ranger_falconry',
      name: '鷹匠の絆',
      tree: 'master',
      tpCost: (l) => 7 + l,
      element: 'almighty',
      target: 'self',
      effects: [{ kind: 'summon', summonKind: 'summon_falcon' }],
    },
    skill_ranger_hunters_mark: {
      id: 'skill_ranger_hunters_mark',
      name: '狩人の照準',
      tree: 'master',
      tpCost: () => 4,
      element: 'almighty',
      target: 'self',
      effects: [
        {
          kind: 'buff',
          stat: 'acc',
          modifier: (l) => 1.3 + 0.05 * l,
          turns: 3,
          stackGroup: 'accBuff',
        },
      ],
    },
    skill_ranger_field_dressing: {
      id: 'skill_ranger_field_dressing',
      name: '応急手当',
      tree: 'master',
      tpCost: (l) => 5 + l,
      element: 'almighty',
      target: 'allyAll',
      effects: [{ kind: 'cleanse' }],
    },
    skill_ranger_volley_chase: {
      id: 'skill_ranger_volley_chase',
      name: '追い討ちの構え',
      tree: 'master',
      tpCost: () => 5,
      element: 'pierce',
      target: 'self',
      effects: [{ kind: 'chase', statBase: 'str', power: (l) => 0.6 + 0.1 * l, turns: 3 }],
    },
    skill_medic_regen_balm: {
      id: 'skill_medic_regen_balm',
      name: 'リジェネバーム',
      tree: 'master',
      tpCost: (l) => 8 + l,
      element: 'almighty',
      target: 'allyOne',
      effects: [{ kind: 'heal', amount: (l) => 40 + 20 * l }],
    },
    skill_medic_salvation: {
      id: 'skill_medic_salvation',
      name: 'サルベーション',
      tree: 'master',
      tpCost: (l) => 12 + l,
      element: 'almighty',
      target: 'allyAll',
      effects: [{ kind: 'heal', amount: (l) => 25 + 15 * l }],
    },
    skill_medic_panacea: {
      id: 'skill_medic_panacea',
      name: 'パナケイア',
      tree: 'master',
      tpCost: (l) => 12 + l,
      element: 'almighty',
      target: 'allyAll',
      effects: [{ kind: 'heal', amount: (l) => 25 + 15 * l }, { kind: 'cleanse' }],
    },
    skill_medic_sleep_mist: {
      id: 'skill_medic_sleep_mist',
      name: 'スリープミスト',
      tree: 'master',
      tpCost: (l) => 7 + l,
      element: 'almighty',
      target: 'enemyAll',
      effects: [{ kind: 'ailment', ailment: 'sleep', chance: (l) => 0.3 + 0.03 * l, turns: 2 }],
    },
    skill_medic_paralysis_powder: {
      id: 'skill_medic_paralysis_powder',
      name: '痺れ粉',
      tree: 'master',
      tpCost: (l) => 6 + l,
      element: 'almighty',
      target: 'enemyAll',
      effects: [{ kind: 'ailment', ailment: 'paralysis', chance: (l) => 0.3 + 0.03 * l, turns: 2 }],
    },
    skill_medic_immune_hymn: {
      id: 'skill_medic_immune_hymn',
      name: '免疫の聖歌',
      tree: 'master',
      tpCost: () => 6,
      element: 'almighty',
      target: 'allyAll',
      effects: [
        {
          kind: 'buff',
          stat: 'pdef',
          modifier: (l) => 1.2 + 0.05 * l,
          turns: 3,
          stackGroup: 'defBuff',
        },
      ],
    },
    skill_medic_revive_draft: {
      id: 'skill_medic_revive_draft',
      name: '蘇生薬',
      tree: 'master',
      tpCost: (l) => 8 + l,
      element: 'almighty',
      target: 'allyAll',
      effects: [{ kind: 'restoreTp', amount: (l) => 6 + 3 * l }],
    },
    skill_medic_weakening_smoke: {
      id: 'skill_medic_weakening_smoke',
      name: '衰弱の煙',
      tree: 'master',
      tpCost: (l) => 6 + l,
      element: 'almighty',
      target: 'enemyAll',
      effects: [
        {
          kind: 'buff',
          stat: 'patk',
          modifier: (l) => 0.85 - 0.03 * l,
          turns: 3,
          stackGroup: 'atkDebuff',
        },
      ],
    },
    skill_dancer_chant_of_valor: {
      id: 'skill_dancer_chant_of_valor',
      name: '勇気の歌',
      tree: 'master',
      tpCost: () => 6,
      element: 'almighty',
      target: 'allyAll',
      effects: [
        {
          kind: 'buff',
          stat: 'acc',
          modifier: (l) => 1.2 + 0.05 * l,
          turns: 3,
          stackGroup: 'accBuff',
        },
      ],
    },
    skill_dancer_curse_dance: {
      id: 'skill_dancer_curse_dance',
      name: '呪縛の舞',
      tree: 'master',
      tpCost: (l) => 6 + l,
      element: 'almighty',
      target: 'enemyAll',
      effects: [
        {
          kind: 'buff',
          stat: 'eva',
          modifier: (l) => 0.85 - 0.03 * l,
          turns: 3,
          stackGroup: 'evaDebuff',
        },
      ],
    },
    skill_dancer_storm_waltz: {
      id: 'skill_dancer_storm_waltz',
      name: '嵐の円舞',
      tree: 'master',
      tpCost: (l) => 10 + l,
      element: 'slash',
      target: 'enemyAll',
      effects: [{ kind: 'damage', statBase: 'str', power: (l) => 1.3 + 0.2 * l }],
    },
    skill_dancer_dual_blade: {
      id: 'skill_dancer_dual_blade',
      name: '双剣の舞',
      tree: 'master',
      tpCost: (l) => 5 + l,
      element: 'slash',
      target: 'enemyOne',
      effects: [{ kind: 'damage', statBase: 'str', power: (l) => 0.6 + 0.1 * l, hits: 2 }],
    },
    skill_dancer_grand_finale: {
      id: 'skill_dancer_grand_finale',
      name: '大円舞曲',
      tree: 'master',
      tpCost: (l) => 10 + l,
      element: 'almighty',
      target: 'allyAll',
      effects: [{ kind: 'heal', amount: (l) => 25 + 15 * l }],
    },
    skill_dancer_blade_chase: {
      id: 'skill_dancer_blade_chase',
      name: '連舞の構え',
      tree: 'master',
      tpCost: () => 5,
      element: 'slash',
      target: 'self',
      effects: [{ kind: 'chase', statBase: 'str', power: (l) => 0.6 + 0.1 * l, turns: 3 }],
    },
    skill_dancer_lullaby_song: {
      id: 'skill_dancer_lullaby_song',
      name: '安らぎの調べ',
      tree: 'master',
      tpCost: (l) => 7 + l,
      element: 'almighty',
      target: 'enemyAll',
      effects: [{ kind: 'ailment', ailment: 'sleep', chance: (l) => 0.3 + 0.03 * l, turns: 2 }],
    },
    skill_dancer_mana_song: {
      id: 'skill_dancer_mana_song',
      name: '律動の歌',
      tree: 'master',
      tpCost: (l) => 5 + l,
      element: 'almighty',
      target: 'allyAll',
      effects: [{ kind: 'restoreTp', amount: (l) => 6 + 3 * l }],
    },
    skill_monk_double_palm: {
      id: 'skill_monk_double_palm',
      name: '双掌打',
      tree: 'master',
      tpCost: (l) => 5 + l,
      element: 'bash',
      target: 'enemyOne',
      effects: [{ kind: 'damage', statBase: 'str', power: (l) => 0.6 + 0.1 * l, hits: 2 }],
    },
    skill_monk_pressure_point: {
      id: 'skill_monk_pressure_point',
      name: '点穴突き',
      tree: 'master',
      tpCost: (l) => 4 + l,
      element: 'bash',
      target: 'enemyOne',
      effects: [
        { kind: 'damage', statBase: 'str', power: (l) => 1 + 0.15 * l },
        { kind: 'ailment', ailment: 'armBind', chance: (l) => 0.35 + 0.05 * l, turns: 3 },
      ],
    },
    skill_monk_whirlwind_kick: {
      id: 'skill_monk_whirlwind_kick',
      name: '旋風脚',
      tree: 'master',
      tpCost: (l) => 7 + l,
      element: 'bash',
      target: 'enemyAll',
      effects: [{ kind: 'damage', statBase: 'str', power: (l) => 0.85 + 0.13 * l }],
    },
    skill_monk_ki_guard: {
      id: 'skill_monk_ki_guard',
      name: '気功護身',
      tree: 'base',
      tpCost: () => 4,
      element: 'almighty',
      target: 'self',
      effects: [
        {
          kind: 'buff',
          stat: 'pdef',
          modifier: (l) => 1.3 + 0.05 * l,
          turns: 3,
          stackGroup: 'defBuff',
        },
      ],
    },
    skill_monk_breathing: {
      id: 'skill_monk_breathing',
      name: '吐納',
      tree: 'master',
      tpCost: (l) => 4 + l,
      element: 'almighty',
      target: 'self',
      effects: [{ kind: 'restoreTp', amount: (l) => 6 + 3 * l }],
    },
    skill_monk_seven_star: {
      id: 'skill_monk_seven_star',
      name: '七星連撃',
      tree: 'master',
      tpCost: (l) => 10 + l,
      element: 'bash',
      target: 'enemyOne',
      effects: [{ kind: 'damage', statBase: 'str', power: (l) => 0.6 + 0.1 * l, hits: 5 }],
    },
    skill_monk_demon_palm: {
      id: 'skill_monk_demon_palm',
      name: '羅刹掌',
      tree: 'master',
      tpCost: (l) => 10 + l,
      element: 'bash',
      target: 'enemyOne',
      effects: [{ kind: 'damage', statBase: 'str', power: (l) => 2.4 + 0.35 * l }],
    },
    skill_hexer_drowsy_hex: {
      id: 'skill_hexer_drowsy_hex',
      name: '微睡の呪',
      tree: 'master',
      tpCost: (l) => 5 + l,
      element: 'almighty',
      target: 'enemyOne',
      effects: [{ kind: 'ailment', ailment: 'sleep', chance: (l) => 0.35 + 0.05 * l, turns: 2 }],
    },
    skill_hexer_dark_bolt: {
      id: 'skill_hexer_dark_bolt',
      name: '闇の呪弾',
      tree: 'master',
      tpCost: (l) => 3 + l,
      element: 'almighty',
      target: 'enemyOne',
      effects: [{ kind: 'damage', statBase: 'int', power: (l) => 1.2 + 0.18 * l }],
    },
    skill_hexer_mass_paralyze: {
      id: 'skill_hexer_mass_paralyze',
      name: '痺れの呪',
      tree: 'master',
      tpCost: (l) => 7 + l,
      element: 'almighty',
      target: 'enemyAll',
      effects: [{ kind: 'ailment', ailment: 'paralysis', chance: (l) => 0.3 + 0.03 * l, turns: 2 }],
    },
    skill_hexer_def_hex: {
      id: 'skill_hexer_def_hex',
      name: '虚弱の呪',
      tree: 'master',
      tpCost: (l) => 7 + l,
      element: 'almighty',
      target: 'enemyAll',
      effects: [
        {
          kind: 'buff',
          stat: 'pdef',
          modifier: (l) => 0.85 - 0.03 * l,
          turns: 3,
          stackGroup: 'pdefDebuff',
        },
      ],
    },
    skill_hexer_mdef_hex: {
      id: 'skill_hexer_mdef_hex',
      name: '崩魔の呪',
      tree: 'master',
      tpCost: (l) => 7 + l,
      element: 'almighty',
      target: 'enemyAll',
      effects: [
        {
          kind: 'buff',
          stat: 'mdef',
          modifier: (l) => 0.85 - 0.03 * l,
          turns: 3,
          stackGroup: 'mdefDebuff',
        },
      ],
    },
    skill_hexer_nightmare: {
      id: 'skill_hexer_nightmare',
      name: '悪夢の呪',
      tree: 'master',
      tpCost: (l) => 8 + l,
      element: 'almighty',
      target: 'enemyOne',
      effects: [
        { kind: 'damage', statBase: 'int', power: (l) => 2 + 0.3 * l },
        { kind: 'ailment', ailment: 'sleep', chance: (l) => 0.35 + 0.05 * l, turns: 2 },
      ],
    },
    skill_hexer_calamity: {
      id: 'skill_hexer_calamity',
      name: '災禍の呪',
      tree: 'master',
      tpCost: (l) => 12 + l,
      element: 'almighty',
      target: 'enemyAll',
      effects: [
        { kind: 'damage', statBase: 'int', power: (l) => 1.3 + 0.2 * l },
        { kind: 'ailment', ailment: 'poison', chance: (l) => 0.3 + 0.03 * l, turns: 3 },
      ],
    },
    skill_summoner_bone_spear: {
      id: 'skill_summoner_bone_spear',
      name: '骨の槍',
      tree: 'master',
      tpCost: (l) => 5 + l,
      element: 'almighty',
      target: 'enemyOne',
      effects: [
        { kind: 'damage', statBase: 'int', power: (l) => 1.5 + 0.2 * l },
        { kind: 'ailment', ailment: 'paralysis', chance: (l) => 0.35 + 0.05 * l, turns: 2 },
      ],
    },
    skill_summoner_grave_field: {
      id: 'skill_summoner_grave_field',
      name: '墓標の凍土',
      tree: 'master',
      tpCost: (l) => 6 + l,
      element: 'ice',
      target: 'enemyAll',
      effects: [{ kind: 'damage', statBase: 'int', power: (l) => 0.85 + 0.13 * l }],
    },
    skill_summoner_soul_ward: {
      id: 'skill_summoner_soul_ward',
      name: '霊障の壁',
      tree: 'master',
      tpCost: (l) => 5 + l,
      element: 'almighty',
      target: 'allyAll',
      effects: [{ kind: 'barrier', absorb: (l) => 25 + 12 * l, turns: 3 }],
    },
    skill_summoner_spirit_veil: {
      id: 'skill_summoner_spirit_veil',
      name: '霊衣',
      tree: 'base',
      tpCost: () => 4,
      element: 'almighty',
      target: 'self',
      effects: [
        {
          kind: 'buff',
          stat: 'mdef',
          modifier: (l) => 1.3 + 0.05 * l,
          turns: 3,
          stackGroup: 'defBuff',
        },
      ],
    },
    skill_summoner_necro_bolt: {
      id: 'skill_summoner_necro_bolt',
      name: '死霊弾',
      tree: 'master',
      tpCost: (l) => 5 + l,
      element: 'almighty',
      target: 'enemyOne',
      effects: [{ kind: 'damage', statBase: 'int', power: (l) => 1.5 + 0.2 * l }],
    },
    skill_summoner_annihilation: {
      id: 'skill_summoner_annihilation',
      name: '冥滅爆裂',
      tree: 'master',
      tpCost: (l) => 12 + l,
      element: 'almighty',
      target: 'enemyAll',
      effects: [{ kind: 'damage', statBase: 'int', power: (l) => 1.3 + 0.2 * l }],
    },
    skill_summoner_soul_render: {
      id: 'skill_summoner_soul_render',
      name: '魂喰らい',
      tree: 'master',
      tpCost: (l) => 10 + l,
      element: 'almighty',
      target: 'enemyOne',
      effects: [{ kind: 'damage', statBase: 'int', power: (l) => 2.4 + 0.35 * l }],
    },
    skill_summoner_call_revenant: {
      id: 'skill_summoner_call_revenant',
      name: '亡者召喚',
      tree: 'master',
      tpCost: (l) => 6 + l,
      element: 'almighty',
      target: 'self',
      effects: [{ kind: 'summon', summonKind: 'summon_revenant' }],
    },
  },
  et = {
    class_warrior: {
      id: 'class_warrior',
      name: '戦士',
      skillTree: {
        skills: [
          { skillId: 'skill_power_slash', maxLevel: 5 },
          { skillId: 'passive_warrior_blade_mastery', maxLevel: 3 },
          { skillId: 'passive_warrior_axe_mastery', maxLevel: 3 },
          { skillId: 'passive_warrior_phys_boost', maxLevel: 3 },
          { skillId: 'skill_guard_stance', maxLevel: 3 },
          { skillId: 'skill_warrior_war_cry', maxLevel: 3 },
          {
            skillId: 'skill_cleave',
            maxLevel: 5,
            requires: [{ skillId: 'skill_power_slash', level: 2 }],
          },
          {
            skillId: 'skill_warrior_double_slash',
            maxLevel: 5,
            requires: [{ skillId: 'passive_warrior_blade_mastery', level: 2 }],
          },
          {
            skillId: 'skill_warrior_heavy_swing',
            maxLevel: 5,
            requires: [{ skillId: 'passive_warrior_axe_mastery', level: 2 }],
          },
          {
            skillId: 'skill_chain_slash',
            maxLevel: 3,
            requires: [{ skillId: 'passive_warrior_blade_mastery', level: 1 }],
          },
          {
            skillId: 'skill_riposte',
            maxLevel: 3,
            requires: [{ skillId: 'skill_guard_stance', level: 1 }],
          },
          {
            skillId: 'passive_warrior_crit_focus',
            maxLevel: 3,
            requires: [{ skillId: 'passive_warrior_phys_boost', level: 2 }],
          },
          {
            skillId: 'skill_warrior_blade_storm',
            maxLevel: 5,
            requires: [{ skillId: 'skill_cleave', level: 3 }],
          },
          {
            skillId: 'skill_warrior_executioner',
            maxLevel: 5,
            requires: [{ skillId: 'skill_warrior_double_slash', level: 3 }],
          },
          {
            skillId: 'passive_warrior_vitality',
            maxLevel: 3,
            requires: [{ skillId: 'passive_warrior_crit_focus', level: 3 }],
          },
          {
            skillId: 'skill_warrior_flame_blade',
            maxLevel: 5,
            requires: [{ skillId: 'skill_warrior_double_slash', level: 2 }],
          },
          {
            skillId: 'skill_warrior_armor_crush',
            maxLevel: 5,
            requires: [{ skillId: 'skill_warrior_heavy_swing', level: 3 }],
          },
          {
            skillId: 'passive_warrior_dual_edge',
            maxLevel: 3,
            requires: [{ skillId: 'passive_warrior_crit_focus', level: 2 }],
          },
          {
            skillId: 'skill_warrior_blade_dance',
            maxLevel: 5,
            requires: [{ skillId: 'skill_warrior_flame_blade', level: 3 }],
          },
          {
            skillId: 'skill_warrior_savage_blow',
            maxLevel: 5,
            requires: [{ skillId: 'skill_warrior_armor_crush', level: 3 }],
          },
          {
            skillId: 'skill_warrior_meteor_strike',
            maxLevel: 5,
            requires: [{ skillId: 'skill_warrior_blade_storm', level: 3 }],
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
          { skillId: 'passive_guardian_shield_mastery', maxLevel: 3 },
          { skillId: 'passive_guardian_spear_mastery', maxLevel: 3 },
          { skillId: 'passive_guardian_hp_boost', maxLevel: 3 },
          { skillId: 'skill_provoke', maxLevel: 3 },
          { skillId: 'skill_summon_bulwark', maxLevel: 3 },
          {
            skillId: 'skill_line_guard',
            maxLevel: 3,
            requires: [{ skillId: 'passive_guardian_shield_mastery', level: 1 }],
          },
          {
            skillId: 'skill_counter_guard',
            maxLevel: 3,
            requires: [{ skillId: 'skill_provoke', level: 1 }],
          },
          {
            skillId: 'skill_guardian_shield_press',
            maxLevel: 5,
            requires: [{ skillId: 'skill_shield_bash', level: 2 }],
          },
          {
            skillId: 'skill_guardian_taunt_roar',
            maxLevel: 3,
            requires: [{ skillId: 'skill_provoke', level: 2 }],
          },
          {
            skillId: 'passive_guardian_mdef_boost',
            maxLevel: 3,
            requires: [{ skillId: 'passive_guardian_hp_boost', level: 2 }],
          },
          {
            skillId: 'skill_guardian_retribution',
            maxLevel: 3,
            requires: [{ skillId: 'skill_counter_guard', level: 2 }],
          },
          {
            skillId: 'skill_guardian_spear_thrust',
            maxLevel: 5,
            requires: [{ skillId: 'passive_guardian_spear_mastery', level: 2 }],
          },
          {
            skillId: 'skill_guardian_aegis',
            maxLevel: 3,
            requires: [{ skillId: 'skill_line_guard', level: 3 }],
          },
          {
            skillId: 'passive_guardian_iron_will',
            maxLevel: 3,
            requires: [{ skillId: 'passive_guardian_mdef_boost', level: 3 }],
          },
          {
            skillId: 'skill_guardian_shield_throw',
            maxLevel: 5,
            requires: [{ skillId: 'skill_guardian_shield_press', level: 3 }],
          },
          {
            skillId: 'skill_guardian_bulwark_stance',
            maxLevel: 3,
            requires: [{ skillId: 'skill_guardian_taunt_roar', level: 3 }],
          },
          {
            skillId: 'skill_guardian_iron_counter',
            maxLevel: 3,
            requires: [{ skillId: 'skill_guardian_retribution', level: 3 }],
          },
          {
            skillId: 'skill_guardian_phalanx',
            maxLevel: 3,
            requires: [{ skillId: 'skill_guardian_aegis', level: 3 }],
          },
          {
            skillId: 'skill_guardian_great_wall',
            maxLevel: 3,
            requires: [{ skillId: 'skill_guardian_phalanx', level: 2 }],
          },
          {
            skillId: 'skill_guardian_dragon_lance',
            maxLevel: 5,
            requires: [{ skillId: 'skill_guardian_spear_thrust', level: 3 }],
          },
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
          { skillId: 'passive_mage_staff_mastery', maxLevel: 3 },
          { skillId: 'passive_mage_tp_boost', maxLevel: 3 },
          { skillId: 'skill_mage_focus', maxLevel: 3 },
          {
            skillId: 'skill_fire_storm',
            maxLevel: 5,
            requires: [{ skillId: 'skill_fire_bolt', level: 3 }],
          },
          {
            skillId: 'skill_mage_ice_storm',
            maxLevel: 5,
            requires: [{ skillId: 'skill_ice_bolt', level: 3 }],
          },
          {
            skillId: 'skill_mage_volt_storm',
            maxLevel: 5,
            requires: [{ skillId: 'skill_volt_bolt', level: 3 }],
          },
          {
            skillId: 'passive_mage_matk_boost',
            maxLevel: 3,
            requires: [{ skillId: 'passive_mage_staff_mastery', level: 2 }],
          },
          {
            skillId: 'skill_summon_familiar',
            maxLevel: 2,
            requires: [{ skillId: 'passive_mage_tp_boost', level: 2 }],
          },
          {
            skillId: 'skill_mage_mana_charge',
            maxLevel: 5,
            requires: [{ skillId: 'passive_mage_tp_boost', level: 2 }],
          },
          {
            skillId: 'skill_mage_meteor',
            maxLevel: 5,
            requires: [{ skillId: 'skill_fire_storm', level: 3 }],
          },
          {
            skillId: 'skill_mage_thunderbolt',
            maxLevel: 5,
            requires: [{ skillId: 'skill_mage_volt_storm', level: 3 }],
          },
          {
            skillId: 'passive_mage_spell_focus',
            maxLevel: 3,
            requires: [{ skillId: 'passive_mage_matk_boost', level: 3 }],
          },
          {
            skillId: 'skill_mage_fire_lance',
            maxLevel: 5,
            requires: [{ skillId: 'skill_fire_storm', level: 2 }],
          },
          {
            skillId: 'skill_mage_frost_lance',
            maxLevel: 5,
            requires: [{ skillId: 'skill_mage_ice_storm', level: 2 }],
          },
          {
            skillId: 'skill_mage_volt_lance',
            maxLevel: 5,
            requires: [{ skillId: 'skill_mage_volt_storm', level: 2 }],
          },
          {
            skillId: 'passive_mage_overload',
            maxLevel: 3,
            requires: [{ skillId: 'passive_mage_matk_boost', level: 2 }],
          },
          {
            skillId: 'skill_mage_absolute_zero',
            maxLevel: 5,
            requires: [{ skillId: 'skill_mage_frost_lance', level: 3 }],
          },
          {
            skillId: 'skill_mage_ragnarok',
            maxLevel: 5,
            requires: [{ skillId: 'skill_mage_thunderbolt', level: 3 }],
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
          { skillId: 'passive_ranger_bow_mastery', maxLevel: 3 },
          { skillId: 'passive_ranger_agi_boost', maxLevel: 3 },
          {
            skillId: 'skill_head_snipe',
            maxLevel: 3,
            requires: [{ skillId: 'skill_aimed_shot', level: 2 }],
          },
          {
            skillId: 'skill_ranger_piercing_arrow',
            maxLevel: 5,
            requires: [{ skillId: 'skill_aimed_shot', level: 3 }],
          },
          {
            skillId: 'skill_ranger_double_shot',
            maxLevel: 5,
            requires: [{ skillId: 'skill_aimed_shot', level: 2 }],
          },
          {
            skillId: 'skill_ranger_rain_of_arrows',
            maxLevel: 5,
            requires: [{ skillId: 'skill_spread_shot', level: 2 }],
          },
          {
            skillId: 'skill_ranger_pin_shot',
            maxLevel: 3,
            requires: [{ skillId: 'skill_leg_snipe', level: 2 }],
          },
          {
            skillId: 'passive_ranger_eagle_eye',
            maxLevel: 3,
            requires: [{ skillId: 'passive_ranger_bow_mastery', level: 2 }],
          },
          {
            skillId: 'passive_ranger_swift_hands',
            maxLevel: 3,
            requires: [{ skillId: 'passive_ranger_bow_mastery', level: 2 }],
          },
          {
            skillId: 'skill_first_aid',
            maxLevel: 3,
            requires: [{ skillId: 'passive_ranger_agi_boost', level: 2 }],
          },
          {
            skillId: 'skill_summon_wolf',
            maxLevel: 3,
            requires: [{ skillId: 'passive_ranger_agi_boost', level: 2 }],
          },
          {
            skillId: 'skill_ranger_charged_shot',
            maxLevel: 5,
            requires: [{ skillId: 'skill_ranger_piercing_arrow', level: 3 }],
          },
          {
            skillId: 'skill_ranger_binding_volley',
            maxLevel: 3,
            requires: [{ skillId: 'skill_ranger_rain_of_arrows', level: 3 }],
          },
          {
            skillId: 'skill_ranger_hunters_mark',
            maxLevel: 3,
            requires: [{ skillId: 'passive_ranger_eagle_eye', level: 3 }],
          },
          {
            skillId: 'skill_ranger_falconry',
            maxLevel: 3,
            requires: [{ skillId: 'skill_summon_wolf', level: 3 }],
          },
          {
            skillId: 'skill_ranger_field_dressing',
            maxLevel: 3,
            requires: [{ skillId: 'skill_first_aid', level: 3 }],
          },
          {
            skillId: 'skill_ranger_volley_chase',
            maxLevel: 3,
            requires: [{ skillId: 'skill_ranger_double_shot', level: 3 }],
          },
          {
            skillId: 'passive_ranger_predator',
            maxLevel: 3,
            requires: [{ skillId: 'passive_ranger_swift_hands', level: 3 }],
          },
          {
            skillId: 'skill_ranger_apollo_shot',
            maxLevel: 5,
            requires: [{ skillId: 'skill_ranger_charged_shot', level: 3 }],
          },
          {
            skillId: 'skill_ranger_sky_volley',
            maxLevel: 5,
            requires: [{ skillId: 'skill_ranger_binding_volley', level: 3 }],
          },
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
          { skillId: 'skill_protect_hymn', maxLevel: 3 },
          { skillId: 'skill_refresh_herb', maxLevel: 3 },
          { skillId: 'skill_poison_smoke', maxLevel: 3 },
          { skillId: 'passive_medic_tp_boost', maxLevel: 3 },
          { skillId: 'passive_medic_mdef_boost', maxLevel: 3 },
          {
            skillId: 'skill_mass_heal',
            maxLevel: 5,
            requires: [{ skillId: 'skill_heal', level: 2 }],
          },
          {
            skillId: 'skill_medic_full_heal',
            maxLevel: 5,
            requires: [{ skillId: 'skill_heal', level: 3 }],
          },
          {
            skillId: 'skill_medic_immune_hymn',
            maxLevel: 3,
            requires: [{ skillId: 'skill_protect_hymn', level: 2 }],
          },
          {
            skillId: 'skill_medic_blind_powder',
            maxLevel: 3,
            requires: [{ skillId: 'skill_poison_smoke', level: 2 }],
          },
          {
            skillId: 'skill_medic_sleep_mist',
            maxLevel: 3,
            requires: [{ skillId: 'skill_poison_smoke', level: 2 }],
          },
          {
            skillId: 'skill_medic_tp_tonic',
            maxLevel: 3,
            requires: [{ skillId: 'passive_medic_tp_boost', level: 2 }],
          },
          {
            skillId: 'passive_medic_mind_boost',
            maxLevel: 3,
            requires: [{ skillId: 'skill_heal', level: 2 }],
          },
          {
            skillId: 'passive_medic_healing_hands',
            maxLevel: 3,
            requires: [{ skillId: 'passive_medic_mdef_boost', level: 2 }],
          },
          {
            skillId: 'passive_medic_staff_mastery',
            maxLevel: 3,
            requires: [{ skillId: 'passive_medic_mdef_boost', level: 2 }],
          },
          {
            skillId: 'skill_medic_party_cure',
            maxLevel: 5,
            requires: [{ skillId: 'skill_mass_heal', level: 3 }],
          },
          {
            skillId: 'skill_medic_regen_balm',
            maxLevel: 5,
            requires: [{ skillId: 'skill_medic_full_heal', level: 3 }],
          },
          {
            skillId: 'skill_medic_paralysis_powder',
            maxLevel: 3,
            requires: [{ skillId: 'skill_medic_sleep_mist', level: 3 }],
          },
          {
            skillId: 'skill_medic_weakening_smoke',
            maxLevel: 3,
            requires: [{ skillId: 'skill_medic_blind_powder', level: 3 }],
          },
          {
            skillId: 'skill_medic_revive_draft',
            maxLevel: 3,
            requires: [{ skillId: 'skill_medic_tp_tonic', level: 3 }],
          },
          {
            skillId: 'passive_medic_vitality',
            maxLevel: 3,
            requires: [{ skillId: 'passive_medic_healing_hands', level: 3 }],
          },
          {
            skillId: 'skill_medic_salvation',
            maxLevel: 5,
            requires: [{ skillId: 'skill_medic_party_cure', level: 3 }],
          },
          {
            skillId: 'skill_medic_panacea',
            maxLevel: 5,
            requires: [{ skillId: 'skill_medic_regen_balm', level: 3 }],
          },
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
          { skillId: 'skill_guard_dance', maxLevel: 3 },
          { skillId: 'skill_weaken_song', maxLevel: 3 },
          { skillId: 'passive_dancer_agi_boost', maxLevel: 3 },
          { skillId: 'passive_dancer_tp_boost', maxLevel: 3 },
          {
            skillId: 'skill_healing_song',
            maxLevel: 3,
            requires: [{ skillId: 'skill_war_dance', level: 1 }],
          },
          {
            skillId: 'skill_dancer_inspire_dance',
            maxLevel: 3,
            requires: [{ skillId: 'skill_war_dance', level: 2 }],
          },
          {
            skillId: 'skill_dancer_chant_of_valor',
            maxLevel: 3,
            requires: [{ skillId: 'skill_war_dance', level: 2 }],
          },
          {
            skillId: 'skill_dancer_grace_song',
            maxLevel: 3,
            requires: [{ skillId: 'skill_guard_dance', level: 2 }],
          },
          {
            skillId: 'skill_dancer_blade_waltz',
            maxLevel: 5,
            requires: [{ skillId: 'skill_evasion_dance', level: 2 }],
          },
          {
            skillId: 'skill_dancer_dual_blade',
            maxLevel: 5,
            requires: [{ skillId: 'skill_evasion_dance', level: 2 }],
          },
          {
            skillId: 'skill_dancer_curse_dance',
            maxLevel: 3,
            requires: [{ skillId: 'skill_weaken_song', level: 2 }],
          },
          {
            skillId: 'passive_dancer_grace',
            maxLevel: 3,
            requires: [{ skillId: 'passive_dancer_agi_boost', level: 2 }],
          },
          {
            skillId: 'passive_dancer_blade_mastery',
            maxLevel: 3,
            requires: [{ skillId: 'passive_dancer_agi_boost', level: 2 }],
          },
          {
            skillId: 'skill_dancer_revival_dance',
            maxLevel: 3,
            requires: [{ skillId: 'skill_healing_song', level: 3 }],
          },
          {
            skillId: 'skill_dancer_mana_song',
            maxLevel: 3,
            requires: [{ skillId: 'skill_dancer_inspire_dance', level: 3 }],
          },
          {
            skillId: 'skill_dancer_lullaby_song',
            maxLevel: 3,
            requires: [{ skillId: 'skill_dancer_curse_dance', level: 3 }],
          },
          {
            skillId: 'skill_dancer_blade_chase',
            maxLevel: 3,
            requires: [{ skillId: 'skill_dancer_dual_blade', level: 3 }],
          },
          {
            skillId: 'passive_dancer_resonance',
            maxLevel: 3,
            requires: [{ skillId: 'passive_dancer_grace', level: 3 }],
          },
          {
            skillId: 'passive_dancer_vigor',
            maxLevel: 3,
            requires: [{ skillId: 'passive_dancer_blade_mastery', level: 3 }],
          },
          {
            skillId: 'skill_dancer_grand_finale',
            maxLevel: 3,
            requires: [{ skillId: 'skill_dancer_revival_dance', level: 3 }],
          },
          {
            skillId: 'skill_dancer_storm_waltz',
            maxLevel: 5,
            requires: [{ skillId: 'skill_dancer_blade_waltz', level: 3 }],
          },
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
          { skillId: 'skill_monk_palm_strike', maxLevel: 5 },
          { skillId: 'passive_monk_fist_mastery', maxLevel: 3 },
          { skillId: 'passive_monk_crit_boost', maxLevel: 3 },
          { skillId: 'passive_monk_hp_boost', maxLevel: 3 },
          { skillId: 'skill_focus_ki', maxLevel: 3 },
          {
            skillId: 'skill_arm_break',
            maxLevel: 5,
            requires: [{ skillId: 'skill_triple_strike', level: 2 }],
          },
          {
            skillId: 'skill_monk_leg_sweep',
            maxLevel: 3,
            requires: [{ skillId: 'skill_monk_palm_strike', level: 2 }],
          },
          {
            skillId: 'skill_monk_flurry',
            maxLevel: 5,
            requires: [{ skillId: 'skill_triple_strike', level: 3 }],
          },
          {
            skillId: 'skill_monk_double_palm',
            maxLevel: 5,
            requires: [{ skillId: 'skill_monk_palm_strike', level: 3 }],
          },
          {
            skillId: 'skill_monk_ki_guard',
            maxLevel: 3,
            requires: [{ skillId: 'skill_focus_ki', level: 2 }],
          },
          {
            skillId: 'skill_cross_counter',
            maxLevel: 3,
            requires: [{ skillId: 'skill_focus_ki', level: 1 }],
          },
          {
            skillId: 'passive_monk_eva_boost',
            maxLevel: 3,
            requires: [{ skillId: 'passive_monk_crit_boost', level: 2 }],
          },
          {
            skillId: 'passive_monk_counter_mastery',
            maxLevel: 3,
            requires: [{ skillId: 'passive_monk_fist_mastery', level: 2 }],
          },
          {
            skillId: 'skill_monk_head_smash',
            maxLevel: 3,
            requires: [{ skillId: 'skill_monk_leg_sweep', level: 3 }],
          },
          {
            skillId: 'skill_monk_pressure_point',
            maxLevel: 3,
            requires: [{ skillId: 'skill_arm_break', level: 3 }],
          },
          {
            skillId: 'skill_monk_whirlwind_kick',
            maxLevel: 5,
            requires: [{ skillId: 'skill_monk_double_palm', level: 3 }],
          },
          {
            skillId: 'skill_iron_body',
            maxLevel: 3,
            requires: [{ skillId: 'skill_monk_ki_guard', level: 3 }],
          },
          {
            skillId: 'skill_monk_breathing',
            maxLevel: 3,
            requires: [{ skillId: 'passive_monk_counter_mastery', level: 3 }],
          },
          {
            skillId: 'skill_monk_rising_dragon',
            maxLevel: 5,
            requires: [{ skillId: 'skill_monk_flurry', level: 3 }],
          },
          {
            skillId: 'skill_monk_seven_star',
            maxLevel: 5,
            requires: [{ skillId: 'skill_monk_whirlwind_kick', level: 3 }],
          },
          {
            skillId: 'skill_monk_demon_palm',
            maxLevel: 5,
            requires: [{ skillId: 'skill_monk_pressure_point', level: 3 }],
          },
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
          { skillId: 'passive_hexer_matk_boost', maxLevel: 3 },
          { skillId: 'passive_hexer_mdef_boost', maxLevel: 3 },
          { skillId: 'passive_hexer_acc_boost', maxLevel: 3 },
          {
            skillId: 'skill_hexer_paralyze_hex',
            maxLevel: 5,
            requires: [{ skillId: 'skill_venom_hex', level: 2 }],
          },
          {
            skillId: 'skill_blind_hex',
            maxLevel: 3,
            requires: [{ skillId: 'skill_sleep_hex', level: 2 }],
          },
          {
            skillId: 'skill_armor_hex',
            maxLevel: 3,
            requires: [{ skillId: 'skill_weaken_hex', level: 2 }],
          },
          {
            skillId: 'skill_hexer_eva_hex',
            maxLevel: 3,
            requires: [{ skillId: 'skill_weaken_hex', level: 2 }],
          },
          {
            skillId: 'skill_hexer_acc_hex',
            maxLevel: 3,
            requires: [{ skillId: 'skill_venom_hex', level: 3 }],
          },
          {
            skillId: 'skill_hexer_mass_venom',
            maxLevel: 3,
            requires: [{ skillId: 'skill_venom_hex', level: 3 }],
          },
          {
            skillId: 'skill_hexer_drowsy_hex',
            maxLevel: 3,
            requires: [{ skillId: 'skill_sleep_hex', level: 2 }],
          },
          {
            skillId: 'passive_hexer_curse_lore',
            maxLevel: 3,
            requires: [{ skillId: 'passive_hexer_matk_boost', level: 2 }],
          },
          {
            skillId: 'skill_hexer_doom_hex',
            maxLevel: 5,
            requires: [{ skillId: 'skill_hexer_paralyze_hex', level: 3 }],
          },
          {
            skillId: 'skill_hexer_curse_field',
            maxLevel: 3,
            requires: [{ skillId: 'skill_hexer_mass_venom', level: 3 }],
          },
          {
            skillId: 'skill_hexer_mass_paralyze',
            maxLevel: 3,
            requires: [{ skillId: 'skill_hexer_paralyze_hex', level: 3 }],
          },
          {
            skillId: 'skill_hexer_def_hex',
            maxLevel: 3,
            requires: [{ skillId: 'skill_armor_hex', level: 3 }],
          },
          {
            skillId: 'skill_hexer_dark_bolt',
            maxLevel: 5,
            requires: [{ skillId: 'passive_hexer_curse_lore', level: 3 }],
          },
          {
            skillId: 'skill_hexer_nightmare',
            maxLevel: 5,
            requires: [{ skillId: 'skill_hexer_drowsy_hex', level: 3 }],
          },
          {
            skillId: 'skill_hexer_calamity',
            maxLevel: 5,
            requires: [{ skillId: 'skill_hexer_mass_paralyze', level: 3 }],
          },
          {
            skillId: 'skill_hexer_mdef_hex',
            maxLevel: 3,
            requires: [{ skillId: 'skill_hexer_def_hex', level: 3 }],
          },
        ],
      },
      equipableWeaponTypes: ['staff'],
      equipableArmorTypes: ['clothes'],
      titleOptions: ['title_plague', 'title_warlock'],
    },
    class_summoner: {
      id: 'class_summoner',
      name: '降霊術士',
      skillTree: {
        skills: [
          { skillId: 'skill_call_wraith', maxLevel: 3 },
          { skillId: 'skill_soul_barrier', maxLevel: 3 },
          { skillId: 'skill_summoner_soul_drain', maxLevel: 5 },
          { skillId: 'passive_summoner_staff_mastery', maxLevel: 3 },
          { skillId: 'passive_summoner_tp_boost', maxLevel: 3 },
          { skillId: 'passive_summoner_mdef_boost', maxLevel: 3 },
          {
            skillId: 'skill_call_sentinel',
            maxLevel: 3,
            requires: [{ skillId: 'skill_call_wraith', level: 1 }],
          },
          {
            skillId: 'skill_soul_burst',
            maxLevel: 5,
            requires: [{ skillId: 'passive_summoner_staff_mastery', level: 1 }],
          },
          {
            skillId: 'skill_summoner_call_familiar',
            maxLevel: 2,
            requires: [{ skillId: 'skill_call_wraith', level: 2 }],
          },
          {
            skillId: 'skill_summoner_grave_chill',
            maxLevel: 5,
            requires: [{ skillId: 'skill_summoner_soul_drain', level: 2 }],
          },
          {
            skillId: 'skill_summoner_tp_offering',
            maxLevel: 3,
            requires: [{ skillId: 'passive_summoner_tp_boost', level: 2 }],
          },
          {
            skillId: 'skill_summoner_necro_bolt',
            maxLevel: 5,
            requires: [{ skillId: 'skill_summoner_soul_drain', level: 2 }],
          },
          {
            skillId: 'skill_summoner_spirit_veil',
            maxLevel: 3,
            requires: [{ skillId: 'passive_summoner_mdef_boost', level: 2 }],
          },
          {
            skillId: 'skill_summoner_oblivion',
            maxLevel: 5,
            requires: [{ skillId: 'skill_soul_burst', level: 3 }],
          },
          {
            skillId: 'skill_summoner_spirit_chase',
            maxLevel: 3,
            requires: [{ skillId: 'skill_summoner_soul_drain', level: 3 }],
          },
          {
            skillId: 'skill_summoner_grave_field',
            maxLevel: 5,
            requires: [{ skillId: 'skill_summoner_grave_chill', level: 3 }],
          },
          {
            skillId: 'skill_summoner_soul_ward',
            maxLevel: 3,
            requires: [{ skillId: 'skill_summoner_spirit_veil', level: 3 }],
          },
          {
            skillId: 'passive_summoner_spirit_lore',
            maxLevel: 3,
            requires: [{ skillId: 'skill_summoner_necro_bolt', level: 3 }],
          },
          {
            skillId: 'skill_summoner_annihilation',
            maxLevel: 5,
            requires: [{ skillId: 'skill_summoner_oblivion', level: 3 }],
          },
          {
            skillId: 'skill_summoner_soul_render',
            maxLevel: 5,
            requires: [{ skillId: 'passive_summoner_spirit_lore', level: 3 }],
          },
          {
            skillId: 'skill_summoner_call_revenant',
            maxLevel: 3,
            requires: [{ skillId: 'skill_summoner_soul_ward', level: 3 }],
          },
        ],
      },
      equipableWeaponTypes: ['staff'],
      equipableArmorTypes: ['clothes', 'light'],
      titleOptions: ['title_necromancer', 'title_puppeteer'],
    },
  },
  tt = {
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
    item_mat_t0_soft_pelt: {
      id: 'item_mat_t0_soft_pelt',
      name: 'やわらかな毛皮',
      description: '森の小動物の素材。売ると新しい装備が並ぶことがある。',
      category: 'material',
      buyPrice: 0,
    },
    item_mat_t0_spore_cap: {
      id: 'item_mat_t0_spore_cap',
      name: 'ひかるかさ',
      description: '光るきのこの素材。売ると新しい装備が並ぶことがある。',
      category: 'material',
      buyPrice: 0,
    },
    item_mat_t0_faint_ember: {
      id: 'item_mat_t0_faint_ember',
      name: 'かすかな残り火',
      description: '亡霊が残した素材。売ると新しい装備が並ぶことがある。',
      category: 'material',
      buyPrice: 0,
    },
    item_mat_t0_great_antler: {
      id: 'item_mat_t0_great_antler',
      name: 'りっぱな角',
      description: '森の大型獣の素材。売ると新しい装備が並ぶことがある。',
      category: 'material',
      buyPrice: 0,
    },
    item_mat_t0_chitin_plate: {
      id: 'item_mat_t0_chitin_plate',
      name: '硬い甲殻板',
      description: '洞窟の蟲の素材。売ると新しい装備が並ぶことがある。',
      category: 'material',
      buyPrice: 0,
    },
    item_mat_t1_coarse_hide: {
      id: 'item_mat_t1_coarse_hide',
      name: 'あらい獣皮',
      description: '山岳の獣の素材。売ると新しい装備が並ぶことがある。',
      category: 'material',
      buyPrice: 0,
    },
    item_mat_t1_stone_scale: {
      id: 'item_mat_t1_stone_scale',
      name: '岩のうろこ',
      description: '岩トカゲ類の素材。売ると新しい装備が並ぶことがある。',
      category: 'material',
      buyPrice: 0,
    },
    item_mat_t1_sharp_feather: {
      id: 'item_mat_t1_sharp_feather',
      name: 'するどい風切羽',
      description: '高地の猛禽の素材。売ると新しい装備が並ぶことがある。',
      category: 'material',
      buyPrice: 0,
    },
    item_mat_t1_ogre_fang: {
      id: 'item_mat_t1_ogre_fang',
      name: 'オーガの牙',
      description: '岩のオーガの素材。売ると強めの装備が並ぶことがある。',
      category: 'material',
      buyPrice: 0,
    },
    item_mat_t1_drake_horn: {
      id: 'item_mat_t1_drake_horn',
      name: '竜トカゲの角',
      description: 'マグマの竜トカゲの素材。売ると強めの装備が並ぶことがある。',
      category: 'material',
      buyPrice: 0,
    },
    item_mat_t1_lord_pelt: {
      id: 'item_mat_t1_lord_pelt',
      name: '猿王の毛皮',
      description: '山嶺の大猿王の素材。売ると強力な装備が並ぶ。',
      category: 'material',
      buyPrice: 0,
    },
    item_mat_t2_frost_pelt: {
      id: 'item_mat_t2_frost_pelt',
      name: '霜降りの毛皮',
      description: '氷雪の獣の毛皮。売ると新しい装備が並ぶことがある。',
      category: 'material',
      buyPrice: 0,
    },
    item_mat_t2_ice_crystal: {
      id: 'item_mat_t2_ice_crystal',
      name: '凍てつく結晶',
      description: '溶けない氷の結晶。売ると新しい装備が並ぶことがある。',
      category: 'material',
      buyPrice: 0,
    },
    item_mat_t2_chill_core: {
      id: 'item_mat_t2_chill_core',
      name: '冷気の核',
      description: '氷霊から採れる冷気の核。売ると新しい装備が並ぶことがある。',
      category: 'material',
      buyPrice: 0,
    },
    item_mat_t2_monarch_diadem: {
      id: 'item_mat_t2_monarch_diadem',
      name: '女王の氷冠',
      description: '氷晶の女王の冠。極めて貴重な素材。',
      category: 'material',
      buyPrice: 0,
    },
    item_mat_t3_charged_hide: {
      id: 'item_mat_t3_charged_hide',
      name: '帯電した獣皮',
      description: '雷を帯びた獣の皮。売ると新しい装備が並ぶことがある。',
      category: 'material',
      buyPrice: 0,
    },
    item_mat_t3_storm_feather: {
      id: 'item_mat_t3_storm_feather',
      name: '嵐鳥の風切羽',
      description: '嵐をまとう鳥の羽。売ると新しい装備が並ぶことがある。',
      category: 'material',
      buyPrice: 0,
    },
    item_mat_t3_thunder_carapace: {
      id: 'item_mat_t3_thunder_carapace',
      name: '雷甲の外殻',
      description: '放電する虫や結晶の外殻。売ると新しい装備が並ぶことがある。',
      category: 'material',
      buyPrice: 0,
    },
    item_mat_t3_sovereign_horn: {
      id: 'item_mat_t3_sovereign_horn',
      name: '覇王の雷角',
      description: '雷霆の覇王の角。至高の素材。',
      category: 'material',
      buyPrice: 0,
    },
    item_mat_t4_rotflesh: {
      id: 'item_mat_t4_rotflesh',
      name: '腐肉のかけら',
      description: '瘴気に侵され朽ちた肉片。',
      category: 'material',
      buyPrice: 0,
    },
    item_mat_t4_grave_dust: {
      id: 'item_mat_t4_grave_dust',
      name: '墓場の灰塵',
      description: '墓土と骨の粉。不死の素材。',
      category: 'material',
      buyPrice: 0,
    },
    item_mat_t4_cursed_marrow: {
      id: 'item_mat_t4_cursed_marrow',
      name: '呪詛の髄液',
      description: '呪われた骸から滲む粘液。',
      category: 'material',
      buyPrice: 0,
    },
    item_mat_t4_toxic_scale: {
      id: 'item_mat_t4_toxic_scale',
      name: '毒鱗の粉',
      description: '瘴気蟲の猛毒の鱗粉。',
      category: 'material',
      buyPrice: 0,
    },
    item_mat_t4_spectral_ash: {
      id: 'item_mat_t4_spectral_ash',
      name: '亡霊の燐灰',
      description: '鬼火が遺す青白い灰。',
      category: 'material',
      buyPrice: 0,
    },
    item_mat_t4_steel_gear: {
      id: 'item_mat_t4_steel_gear',
      name: '鋼の歯車',
      description: '機械兵の精密な駆動部品。',
      category: 'material',
      buyPrice: 0,
    },
    item_mat_t4_corroded_plate: {
      id: 'item_mat_t4_corroded_plate',
      name: '腐食した装甲板',
      description: '瘴気で錆びた重装甲の破片。',
      category: 'material',
      buyPrice: 0,
    },
    item_mat_t4_sovereign_crown: {
      id: 'item_mat_t4_sovereign_crown',
      name: '腐王の冠',
      description: '瘴気を統べる者の朽ちた王冠。',
      category: 'material',
      buyPrice: 0,
    },
  };
function Vb(l) {
  return l.category === 'food' ? 0 : l.category === 'material' ? 8 : Math.floor(l.buyPrice / 2);
}
function Qb(l) {
  var i;
  return ((i = tt[l]) == null ? void 0 : i.category) === 'food';
}
const St = {
    race_human: {
      id: 'race_human',
      name: 'ヒト',
      baseStatsAtLv1: { hp: 40, tp: 20, str: 8, vit: 8, agi: 8, int: 8, mnd: 8, luc: 8 },
      statGrowth: { hp: 8, tp: 4, str: 2, vit: 2, agi: 2, int: 2, mnd: 2, luc: 2 },
      raceSkillTree: {
        skills: [
          { skillId: 'skill_union_rally', maxLevel: 3 },
          { skillId: 'passive_race_human_adapt', maxLevel: 3 },
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
          { skillId: 'passive_race_garon_might', maxLevel: 3 },
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
          { skillId: 'passive_race_pix_focus', maxLevel: 3 },
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
          { skillId: 'passive_race_therian_swift', maxLevel: 3 },
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
          { skillId: 'passive_race_lunar_grace', maxLevel: 3 },
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
          { skillId: 'passive_race_golan_fortitude', maxLevel: 3 },
          { skillId: 'skill_mining', maxLevel: 1 },
          { skillId: 'skill_logging', maxLevel: 1 },
        ],
      },
      defaultClassId: 'class_monk',
    },
  },
  Yi = {
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
    passive_race_human_adapt: {
      id: 'passive_race_human_adapt',
      name: '適応力',
      description: '最大HPと命中が上昇する（常時）。',
    },
    passive_race_garon_might: {
      id: 'passive_race_garon_might',
      name: '剛力',
      description: '物理攻撃力と最大HPが上昇する（常時）。',
    },
    passive_race_pix_focus: {
      id: 'passive_race_pix_focus',
      name: '魔力集中',
      description: '魔法攻撃力と最大TPが上昇する（常時）。',
    },
    passive_race_therian_swift: {
      id: 'passive_race_therian_swift',
      name: '俊足',
      description: '命中と回避が上昇する（常時）。',
    },
    passive_race_lunar_grace: {
      id: 'passive_race_lunar_grace',
      name: '月の加護',
      description: '魔法防御と最大TPが上昇する（常時）。',
    },
    passive_race_golan_fortitude: {
      id: 'passive_race_golan_fortitude',
      name: '頑健',
      description: '物理防御と最大HPが上昇する（常時）。',
    },
    passive_warrior_blade_mastery: {
      id: 'passive_warrior_blade_mastery',
      name: '剣の心得',
      description: '剣を装備中、物理攻撃力が上昇する（常時）。',
    },
    passive_warrior_phys_boost: {
      id: 'passive_warrior_phys_boost',
      name: '剛腕',
      description: '物理攻撃力が上昇する（常時）。',
    },
    passive_guardian_shield_mastery: {
      id: 'passive_guardian_shield_mastery',
      name: '盾の心得',
      description: '物理防御が上昇する（常時）。',
    },
    passive_guardian_hp_boost: {
      id: 'passive_guardian_hp_boost',
      name: '頑強',
      description: '最大HPが上昇する（常時）。',
    },
    passive_mage_staff_mastery: {
      id: 'passive_mage_staff_mastery',
      name: '杖の心得',
      description: '杖を装備中、魔法攻撃力が上昇する（常時）。',
    },
    passive_mage_tp_boost: {
      id: 'passive_mage_tp_boost',
      name: '精神統一',
      description: '最大TPが上昇する（常時）。',
    },
    passive_ranger_bow_mastery: {
      id: 'passive_ranger_bow_mastery',
      name: '弓の心得',
      description: '弓を装備中、物理攻撃力が上昇する（常時）。',
    },
    passive_ranger_agi_boost: {
      id: 'passive_ranger_agi_boost',
      name: '機敏',
      description: '命中と回避が上昇する（常時）。',
    },
    passive_medic_tp_boost: {
      id: 'passive_medic_tp_boost',
      name: '薬学の知識',
      description: '最大TPが上昇する（常時）。',
    },
    passive_medic_mdef_boost: {
      id: 'passive_medic_mdef_boost',
      name: '抗体',
      description: '魔法防御が上昇する（常時）。',
    },
    passive_dancer_agi_boost: {
      id: 'passive_dancer_agi_boost',
      name: '舞踏の足捌き',
      description: '回避と命中が上昇する（常時）。',
    },
    passive_dancer_tp_boost: {
      id: 'passive_dancer_tp_boost',
      name: '高揚',
      description: '最大TPが上昇する（常時）。',
    },
    passive_monk_fist_mastery: {
      id: 'passive_monk_fist_mastery',
      name: '拳の心得',
      description: '拳を装備中、物理攻撃力が上昇する（常時）。',
    },
    passive_monk_crit_boost: {
      id: 'passive_monk_crit_boost',
      name: '練達',
      description: 'クリティカル率が上昇する（常時）。',
    },
    passive_hexer_matk_boost: {
      id: 'passive_hexer_matk_boost',
      name: '呪詛',
      description: '魔法攻撃力が上昇する（常時）。',
    },
    passive_hexer_mdef_boost: {
      id: 'passive_hexer_mdef_boost',
      name: '瘴気の衣',
      description: '魔法防御が上昇する（常時）。',
    },
    passive_summoner_staff_mastery: {
      id: 'passive_summoner_staff_mastery',
      name: '霊媒の心得',
      description: '杖を装備中、魔法攻撃力が上昇する（常時）。',
    },
    passive_summoner_tp_boost: {
      id: 'passive_summoner_tp_boost',
      name: '死霊術の知識',
      description: '最大TPが上昇する（常時）。',
    },
    passive_title_berserker: {
      id: 'passive_title_berserker',
      name: '狂気の力',
      description: '物理攻撃力とクリティカル率が上昇する（常時）。',
    },
    passive_title_sentinel: {
      id: 'passive_title_sentinel',
      name: '警戒',
      description: '物理防御と命中が上昇する（常時）。',
    },
    passive_title_bulwark: {
      id: 'passive_title_bulwark',
      name: '鉄壁',
      description: '物理防御と最大HPが上昇する（常時）。',
    },
    passive_title_vanguard: {
      id: 'passive_title_vanguard',
      name: '突撃',
      description: '物理攻撃力が大きく上昇する（常時）。',
    },
    passive_title_pyromancer: {
      id: 'passive_title_pyromancer',
      name: '業火',
      description: '魔法攻撃力が大きく上昇する（常時）。',
    },
    passive_title_sage: {
      id: 'passive_title_sage',
      name: '英知',
      description: '最大TPと魔法防御が上昇する（常時）。',
    },
    passive_title_sniper: {
      id: 'passive_title_sniper',
      name: '精密射撃',
      description: 'クリティカル率と命中が上昇する（常時）。',
    },
    passive_title_tracker: {
      id: 'passive_title_tracker',
      name: '隠密',
      description: '回避が大きく上昇する（常時）。',
    },
    passive_title_saint: {
      id: 'passive_title_saint',
      name: '慈愛',
      description: '最大TPと魔法防御が上昇する（常時）。',
    },
    passive_title_blade_dancer: {
      id: 'passive_title_blade_dancer',
      name: '剣の舞',
      description: '物理攻撃力と回避が上昇する（常時）。',
    },
    passive_title_muse: {
      id: 'passive_title_muse',
      name: '詩心',
      description: '最大TPが大きく上昇する（常時）。',
    },
    passive_title_zen: {
      id: 'passive_title_zen',
      name: '不動',
      description: '物理防御と最大HPが上昇する（常時）。',
    },
    passive_title_plague: {
      id: 'passive_title_plague',
      name: '疫病',
      description: '魔法攻撃力が大きく上昇する（常時）。',
    },
    passive_title_warlock: {
      id: 'passive_title_warlock',
      name: '魔道の極み',
      description: '魔法攻撃力とクリティカル率が上昇する（常時）。',
    },
    passive_title_necromancer: {
      id: 'passive_title_necromancer',
      name: '降霊',
      description: '魔法攻撃力と最大TPが上昇する（常時）。',
    },
    passive_title_puppeteer: {
      id: 'passive_title_puppeteer',
      name: '傀儡操糸',
      description: '最大HPと最大TPが上昇する（常時）。',
    },
    skill_chain_slash: {
      id: 'skill_chain_slash',
      name: '連刃の構え',
      description: '味方が斬属性で敵を攻撃した時、追撃する構えを取る（数ターン）。',
    },
    skill_riposte: {
      id: 'skill_riposte',
      name: '反攻の構え',
      description: '敵の攻撃を受けた時、確率で反撃する構えを取る（数ターン）。',
    },
    skill_line_guard: {
      id: 'skill_line_guard',
      name: 'ラインガード',
      description: '味方全体に、被弾を肩代わりする障壁を張る（数ターン）。',
    },
    skill_counter_guard: {
      id: 'skill_counter_guard',
      name: 'カウンターガード',
      description: '敵の攻撃を受けた時、高確率で反撃する構えを取る（数ターン）。',
    },
    skill_fire_storm: {
      id: 'skill_fire_storm',
      name: 'ファイアストーム',
      description: '敵全体に火属性魔法ダメージ。',
    },
    skill_first_aid: {
      id: 'skill_first_aid',
      name: '救護指示',
      description: '味方1人のHPを回復する。',
    },
    skill_refresh_herb: {
      id: 'skill_refresh_herb',
      name: 'リフレシュハーブ',
      description: '味方全体の状態異常を治療する。',
    },
    skill_poison_smoke: {
      id: 'skill_poison_smoke',
      name: 'ポイズンスモーク',
      description: '敵全体を確率で毒にする。',
    },
    skill_guard_dance: {
      id: 'skill_guard_dance',
      name: '守りの舞',
      description: '味方全体の物理防御を高める。',
    },
    skill_healing_song: {
      id: 'skill_healing_song',
      name: '癒しの歌',
      description: '味方全体のHPを小回復する。',
    },
    skill_arm_break: {
      id: 'skill_arm_break',
      name: 'アームブレイク',
      description: '単体に壊打ダメージを与え、確率で腕を封じる。',
    },
    skill_cross_counter: {
      id: 'skill_cross_counter',
      name: 'クロスカウンター',
      description: '敵の攻撃を受けた時、高確率で強烈な反撃を行う構えを取る（数ターン）。',
    },
    skill_blind_hex: {
      id: 'skill_blind_hex',
      name: '盲目の呪',
      description: '敵全体を確率で盲目にする。',
    },
    skill_armor_hex: {
      id: 'skill_armor_hex',
      name: '鎧弱の呪',
      description: '単体の物理防御を下げる。',
    },
    skill_call_wraith: {
      id: 'skill_call_wraith',
      name: '死霊召喚',
      description: '自律して敵を貫通攻撃する死霊を最前列に呼ぶ（戦闘限り）。',
    },
    skill_soul_barrier: {
      id: 'skill_soul_barrier',
      name: '無慈悲な盾',
      description: '味方全体に、被弾を肩代わりする障壁を張る（数ターン）。',
    },
    skill_call_sentinel: {
      id: 'skill_call_sentinel',
      name: '亡者の壁',
      description: '敵の攻撃を引き受ける高耐久の壁を最前列に呼ぶ（戦闘限り）。',
    },
    skill_soul_burst: {
      id: 'skill_soul_burst',
      name: '死霊爆裂',
      description: '敵全体に無属性魔法ダメージ。',
    },
    skill_cleanse_draft: {
      id: 'skill_cleanse_draft',
      name: '解毒の秘薬',
      description: '味方全体の状態異常を治療する。',
    },
    skill_counter_throw: {
      id: 'skill_counter_throw',
      name: '当て身投げ',
      description: '敵の攻撃を受けた時、確率で反撃する構えを取る（数ターン）。',
    },
    skill_warrior_double_slash: {
      id: 'skill_warrior_double_slash',
      name: 'ダブルスラッシュ',
      description: '単体に2連続の斬撃を浴びせる。',
    },
    skill_warrior_heavy_swing: {
      id: 'skill_warrior_heavy_swing',
      name: 'ヘビースイング',
      description: '斧で単体を強打し、確率で頭を封じる。',
    },
    skill_warrior_war_cry: {
      id: 'skill_warrior_war_cry',
      name: '雄叫び',
      description: '自身の物理攻撃を一時的に大きく高める。',
    },
    skill_warrior_blade_storm: {
      id: 'skill_warrior_blade_storm',
      name: 'ブレイドストーム',
      description: '敵全体を斬り払う奥義。',
    },
    skill_warrior_executioner: {
      id: 'skill_warrior_executioner',
      name: 'エグゼキューション',
      description: '渾身の一撃を単体に叩き込む奥義。',
    },
    passive_warrior_axe_mastery: {
      id: 'passive_warrior_axe_mastery',
      name: '斧の心得',
      description: '斧を装備中、物理攻撃力が上昇する（常時）。',
    },
    passive_warrior_crit_focus: {
      id: 'passive_warrior_crit_focus',
      name: '会心',
      description: 'クリティカル率が上昇する（常時）。',
    },
    passive_warrior_vitality: {
      id: 'passive_warrior_vitality',
      name: '頑健な肉体',
      description: '最大HPが上昇する（常時）。',
    },
    skill_warrior_t_rampage: {
      id: 'skill_warrior_t_rampage',
      name: 'ランページ',
      description: '渾身の3連撃を放つ狂戦士の奥義。',
    },
    passive_warrior_t_bloodlust: {
      id: 'passive_warrior_t_bloodlust',
      name: '血の渇き',
      description: '物理攻撃とクリティカル率が上昇する（常時）。',
    },
    skill_warrior_t_overwatch: {
      id: 'skill_warrior_t_overwatch',
      name: '哨戒の構え',
      description: '構えをとり、被弾時に確率で反撃する。',
    },
    passive_warrior_t_guardian_eye: {
      id: 'passive_warrior_t_guardian_eye',
      name: '監視眼',
      description: '物理防御と命中が上昇する（常時）。',
    },
    skill_guardian_shield_press: {
      id: 'skill_guardian_shield_press',
      name: 'シールドプレス',
      description: '盾で敵全体を押し潰し、確率で麻痺させる。',
    },
    skill_guardian_taunt_roar: {
      id: 'skill_guardian_taunt_roar',
      name: '威圧の咆哮',
      description: '敵の注意を引きつけつつ自身の物理防御を高める。',
    },
    skill_guardian_aegis: {
      id: 'skill_guardian_aegis',
      name: 'イージスウォール',
      description: '味方全体に強固な障壁を張る奥義。',
    },
    skill_guardian_retribution: {
      id: 'skill_guardian_retribution',
      name: 'リトリビューション',
      description: '盾を構え、被弾時に反撃を返す奥義。',
    },
    passive_guardian_spear_mastery: {
      id: 'passive_guardian_spear_mastery',
      name: '槍の心得',
      description: '槍を装備中、物理攻撃力が上昇する（常時）。',
    },
    passive_guardian_mdef_boost: {
      id: 'passive_guardian_mdef_boost',
      name: '魔法耐性',
      description: '魔法防御が上昇する（常時）。',
    },
    passive_guardian_iron_will: {
      id: 'passive_guardian_iron_will',
      name: '鋼の意志',
      description: '物理防御と最大HPが上昇する（常時）。',
    },
    passive_guardian_t_fortress: {
      id: 'passive_guardian_t_fortress',
      name: '要塞',
      description: '物理防御と最大HPが大きく上昇する（常時）。',
    },
    skill_guardian_t_last_bastion: {
      id: 'skill_guardian_t_last_bastion',
      name: 'ラストバスティオン',
      description: '味方全体に極大の障壁を展開する城壁の奥義。',
    },
    passive_guardian_t_spearhead: {
      id: 'passive_guardian_t_spearhead',
      name: '尖兵',
      description: '物理攻撃が上昇する（常時）。',
    },
    skill_guardian_t_lance_charge: {
      id: 'skill_guardian_t_lance_charge',
      name: 'ランスチャージ',
      description: '槍で単体を貫く先鋒の突撃。',
    },
    skill_mage_ice_storm: {
      id: 'skill_mage_ice_storm',
      name: 'アイスストーム',
      description: '敵全体に氷属性魔法ダメージ。',
    },
    skill_mage_volt_storm: {
      id: 'skill_mage_volt_storm',
      name: 'ボルトストーム',
      description: '敵全体に雷属性魔法ダメージ。',
    },
    skill_mage_focus: {
      id: 'skill_mage_focus',
      name: '魔力集中',
      description: '自身の魔法攻撃を一時的に大きく高める。',
    },
    skill_mage_meteor: {
      id: 'skill_mage_meteor',
      name: 'メテオ',
      description: '敵全体に超火力の火属性魔法を降らせる奥義。',
    },
    skill_mage_thunderbolt: {
      id: 'skill_mage_thunderbolt',
      name: 'サンダーボルト',
      description: '単体に極大の雷属性魔法を撃ち込む奥義。',
    },
    passive_mage_matk_boost: {
      id: 'passive_mage_matk_boost',
      name: '魔力増幅',
      description: '魔法攻撃が上昇する（常時）。',
    },
    passive_mage_spell_focus: {
      id: 'passive_mage_spell_focus',
      name: '魔法熟練',
      description: '魔法攻撃とクリティカル率が上昇する（常時）。',
    },
    passive_mage_t_inferno: {
      id: 'passive_mage_t_inferno',
      name: '業炎',
      description: '魔法攻撃が大きく上昇する（常時）。',
    },
    skill_mage_t_hellfire: {
      id: 'skill_mage_t_hellfire',
      name: 'ヘルファイア',
      description: '単体を業火で焼き尽くす紅蓮術士の奥義。',
    },
    passive_mage_t_arcane_lore: {
      id: 'passive_mage_t_arcane_lore',
      name: '深淵の知識',
      description: '最大TPと魔法防御が上昇する（常時）。',
    },
    skill_mage_t_mana_surge: {
      id: 'skill_mage_t_mana_surge',
      name: 'マナサージ',
      description: '自身のTPを回復する賢者の秘術。',
    },
    skill_ranger_piercing_arrow: {
      id: 'skill_ranger_piercing_arrow',
      name: '貫通の矢',
      description: '単体に強力な貫通射撃ダメージ。',
    },
    skill_ranger_charged_shot: {
      id: 'skill_ranger_charged_shot',
      name: 'チャージショット',
      description: '単体に絶大な貫通ダメージを与える奥義。',
    },
    skill_ranger_rain_of_arrows: {
      id: 'skill_ranger_rain_of_arrows',
      name: '矢の雨',
      description: '敵全体に降り注ぐ射撃ダメージ。',
    },
    skill_ranger_pin_shot: {
      id: 'skill_ranger_pin_shot',
      name: '足止めの矢',
      description: '射撃ダメージを与え、確率で脚を封じる。',
    },
    skill_ranger_summon_falcon: {
      id: 'skill_ranger_summon_falcon',
      name: '鷹を召喚',
      description: '自律して敵を攻撃する鷹を呼ぶ（戦闘限り）。',
    },
    passive_ranger_eagle_eye: {
      id: 'passive_ranger_eagle_eye',
      name: '鷹の目',
      description: '命中とクリティカル率が上昇する（常時）。',
    },
    skill_ranger_t_snipe: {
      id: 'skill_ranger_t_snipe',
      name: '一矢必中',
      description: '弱点を狙い澄ました必殺の一射。',
    },
    passive_ranger_t_keen_sight: {
      id: 'passive_ranger_t_keen_sight',
      name: '眼力',
      description: '命中が上昇する（常時）。',
    },
    skill_ranger_t_camouflage: {
      id: 'skill_ranger_t_camouflage',
      name: '韜晦',
      description: '自身の回避を大きく高める。',
    },
    passive_ranger_t_shadowstep: {
      id: 'passive_ranger_t_shadowstep',
      name: '影縫い',
      description: '回避が上昇する（常時）。',
    },
    skill_medic_full_heal: {
      id: 'skill_medic_full_heal',
      name: 'フルヒール',
      description: '味方1人のHPを大きく回復する。',
    },
    skill_medic_party_cure: {
      id: 'skill_medic_party_cure',
      name: 'パーティキュア',
      description: '味方全体のHPを大きく回復する。',
    },
    skill_medic_tp_tonic: {
      id: 'skill_medic_tp_tonic',
      name: 'TPトニック',
      description: '味方全体のTPを回復させる。',
    },
    skill_medic_blind_powder: {
      id: 'skill_medic_blind_powder',
      name: '目潰しの粉',
      description: '敵全体を確率で盲目にする。',
    },
    passive_medic_mind_boost: {
      id: 'passive_medic_mind_boost',
      name: '治療の心得',
      description: '魔法攻撃力が上昇する（常時）。',
    },
    skill_medic_t_revive_light: {
      id: 'skill_medic_t_revive_light',
      name: '蘇生の光',
      description: '味方全体のHPを絶大に回復する聖者の奇跡。',
    },
    passive_medic_t_blessing: {
      id: 'passive_medic_t_blessing',
      name: '祝福',
      description: '最大TPと魔法防御が上昇する（常時）。',
    },
    skill_medic_t_stimulant: {
      id: 'skill_medic_t_stimulant',
      name: '気付け薬',
      description: '味方全体のTPを回復させる。',
    },
    passive_medic_t_alchemy: {
      id: 'passive_medic_t_alchemy',
      name: '錬薬',
      description: '最大TPが上昇する（常時）。',
    },
    skill_dancer_blade_waltz: {
      id: 'skill_dancer_blade_waltz',
      name: '剣舞の円',
      description: '舞いながら敵全体を斬りつける。',
    },
    skill_dancer_inspire_dance: {
      id: 'skill_dancer_inspire_dance',
      name: '鼓舞の舞',
      description: '味方全体の魔法攻撃を高める。',
    },
    skill_dancer_grace_song: {
      id: 'skill_dancer_grace_song',
      name: '加護の歌',
      description: '味方全体の魔法防御を高める。',
    },
    skill_dancer_revival_dance: {
      id: 'skill_dancer_revival_dance',
      name: '蘇生の舞',
      description: '味方全体のHPを回復する癒しの舞。',
    },
    passive_dancer_grace: {
      id: 'passive_dancer_grace',
      name: '優美',
      description: '回避と命中が上昇する（常時）。',
    },
    skill_dancer_t_finale: {
      id: 'skill_dancer_t_finale',
      name: '剣の終幕',
      description: '渾身の舞で単体に絶大な斬撃ダメージを与える奥義。',
    },
    passive_dancer_t_grace: {
      id: 'passive_dancer_t_grace',
      name: '舞の極み',
      description: '物理攻撃と回避が上昇する（常時）。',
    },
    skill_dancer_t_lullaby: {
      id: 'skill_dancer_t_lullaby',
      name: '子守唄',
      description: '敵全体を確率で眠らせる舞姫の歌。',
    },
    passive_dancer_t_melody: {
      id: 'passive_dancer_t_melody',
      name: '調べ',
      description: '最大TPと魔法防御が上昇する（常時）。',
    },
    skill_monk_palm_strike: {
      id: 'skill_monk_palm_strike',
      name: '崩拳',
      description: '単体に強烈な壊打の一撃を放つ。',
    },
    skill_monk_leg_sweep: {
      id: 'skill_monk_leg_sweep',
      name: '足払い',
      description: '単体に壊打ダメージを与え、確率で脚を封じる。',
    },
    skill_monk_flurry: {
      id: 'skill_monk_flurry',
      name: '連弾',
      description: '単体に壊打の4連撃を浴びせる。',
    },
    skill_monk_head_smash: {
      id: 'skill_monk_head_smash',
      name: '当て身打ち',
      description: '単体に壊打ダメージを与え、確率で頭を封じる。',
    },
    skill_monk_rising_dragon: {
      id: 'skill_monk_rising_dragon',
      name: '昇龍奥義',
      description: '単体に壊打の奥義を叩き込む。',
    },
    passive_monk_hp_boost: {
      id: 'passive_monk_hp_boost',
      name: '鍛錬',
      description: '最大HPが上昇する（常時）。',
    },
    passive_monk_eva_boost: {
      id: 'passive_monk_eva_boost',
      name: '見切り',
      description: '回避が上昇する（常時）。',
    },
    skill_grappler_t_chain_throw: {
      id: 'skill_grappler_t_chain_throw',
      name: '連環投げ',
      description: '味方が壊属性で敵を攻撃した時、追撃する構えを取る（数ターン）。',
    },
    passive_grappler_t_counter_mastery: {
      id: 'passive_grappler_t_counter_mastery',
      name: '体捌き',
      description: '回避とクリティカル率が上昇する（常時）。',
    },
    skill_zen_t_mountain_stance: {
      id: 'skill_zen_t_mountain_stance',
      name: '不動明王の構え',
      description: '物理防御を大きく高め、敵の注意を引きつける。',
    },
    skill_zen_t_meditation: {
      id: 'skill_zen_t_meditation',
      name: '瞑想',
      description: '自身のTPを回復する。',
    },
    skill_hexer_paralyze_hex: {
      id: 'skill_hexer_paralyze_hex',
      name: '麻痺の呪',
      description: '単体に魔法ダメージを与え、確率で麻痺させる。',
    },
    skill_hexer_eva_hex: {
      id: 'skill_hexer_eva_hex',
      name: '鈍重の呪',
      description: '敵全体の回避を下げる。',
    },
    skill_hexer_acc_hex: {
      id: 'skill_hexer_acc_hex',
      name: '失明の呪',
      description: '単体の命中を下げる。',
    },
    skill_hexer_mass_venom: {
      id: 'skill_hexer_mass_venom',
      name: '瘴気の呪',
      description: '敵全体を確率で毒にする。',
    },
    skill_hexer_doom_hex: {
      id: 'skill_hexer_doom_hex',
      name: '崩呪',
      description: '単体に強力な魔法ダメージを与え、確率で麻痺させる奥義。',
    },
    skill_hexer_curse_field: {
      id: 'skill_hexer_curse_field',
      name: '呪縛の領域',
      description: '敵全体の物理攻撃力を下げる。',
    },
    passive_hexer_acc_boost: {
      id: 'passive_hexer_acc_boost',
      name: '呪言',
      description: '命中が上昇する（常時）。',
    },
    skill_plague_t_pandemic: {
      id: 'skill_plague_t_pandemic',
      name: '疫病の散布',
      description: '敵全体に魔法ダメージを与え、確率で毒にする。',
    },
    skill_plague_t_wither: {
      id: 'skill_plague_t_wither',
      name: '衰弱の呪',
      description: '敵全体の魔法攻撃力を下げる。',
    },
    skill_warlock_t_dark_bolt: {
      id: 'skill_warlock_t_dark_bolt',
      name: '闇撃の呪',
      description: '単体に強力な無属性魔法ダメージ。',
    },
    passive_warlock_t_matk_mastery: {
      id: 'passive_warlock_t_matk_mastery',
      name: '禁術の知識',
      description: '魔法攻撃力が大きく上昇する（常時）。',
    },
    skill_summoner_call_familiar: {
      id: 'skill_summoner_call_familiar',
      name: '使い魔召喚',
      description: '自律攻撃する使い魔を呼ぶ（戦闘限り）。',
    },
    skill_summoner_soul_drain: {
      id: 'skill_summoner_soul_drain',
      name: '吸魂',
      description: '単体に無属性魔法ダメージを与える。',
    },
    skill_summoner_tp_offering: {
      id: 'skill_summoner_tp_offering',
      name: '供物の儀',
      description: '味方全体のTPを回復する。',
    },
    skill_summoner_grave_chill: {
      id: 'skill_summoner_grave_chill',
      name: '冥府の冷気',
      description: '単体に氷属性魔法ダメージを与え、確率で麻痺させる。',
    },
    skill_summoner_oblivion: {
      id: 'skill_summoner_oblivion',
      name: '滅魂爆裂',
      description: '敵全体に強力な無属性魔法ダメージを与える奥義。',
    },
    skill_summoner_spirit_chase: {
      id: 'skill_summoner_spirit_chase',
      name: '霊撃連鎖',
      description: '味方が無属性で敵を攻撃した時、死霊が追撃する構えを取る（数ターン）。',
    },
    passive_summoner_mdef_boost: {
      id: 'passive_summoner_mdef_boost',
      name: '霊体防護',
      description: '魔法防御が上昇する（常時）。',
    },
    skill_necromancer_t_call_revenant: {
      id: 'skill_necromancer_t_call_revenant',
      name: '亡者召喚',
      description: '高耐久の亡者の壁を最前列に呼ぶ（戦闘限り）。',
    },
    skill_necromancer_t_death_pulse: {
      id: 'skill_necromancer_t_death_pulse',
      name: '死波',
      description: '敵全体に無属性魔法ダメージ。',
    },
    skill_puppeteer_t_aegis: {
      id: 'skill_puppeteer_t_aegis',
      name: '傀儡の盾',
      description: '味方全体に、被弾を肩代わりする障壁を張る（数ターン）。',
    },
    passive_puppeteer_t_vitality: {
      id: 'passive_puppeteer_t_vitality',
      name: '操糸の妙',
      description: '最大HPと最大TPが上昇する（常時）。',
    },
    skill_warrior_flame_blade: {
      id: 'skill_warrior_flame_blade',
      name: 'フレイムブレイド',
      description: '剣に炎を纏わせ単体に火属性の斬撃を放つ。',
    },
    skill_warrior_whirlwind: {
      id: 'skill_warrior_whirlwind',
      name: 'ワールウィンド',
      description: '斧で全方位を薙ぎ払い敵全体を強打する。',
    },
    skill_warrior_armor_crush: {
      id: 'skill_warrior_armor_crush',
      name: 'アーマークラッシュ',
      description: '斧で単体を打ち砕き、確率で腕を封じる。',
    },
    skill_warrior_blade_dance: {
      id: 'skill_warrior_blade_dance',
      name: 'ブレイドダンス',
      description: '単体に高速の3連斬を浴びせる。',
    },
    passive_warrior_dual_edge: {
      id: 'passive_warrior_dual_edge',
      name: '双刃の理',
      description: '物理攻撃とクリティカル率が上昇する（常時）。',
    },
    skill_warrior_savage_blow: {
      id: 'skill_warrior_savage_blow',
      name: 'サベージブロウ',
      description: '渾身の一撃を単体に叩き込む斧の極奥義。',
    },
    skill_warrior_meteor_strike: {
      id: 'skill_warrior_meteor_strike',
      name: 'メテオストライク',
      description: '剣で敵全体を斬り裂く極大の全体奥義。',
    },
    skill_guardian_shield_throw: {
      id: 'skill_guardian_shield_throw',
      name: 'シールドスロー',
      description: '盾を投げ敵全体を強打し、確率で麻痺させる。',
    },
    skill_guardian_spear_thrust: {
      id: 'skill_guardian_spear_thrust',
      name: 'スピアスラスト',
      description: '槍で単体を鋭く貫く突き技。',
    },
    skill_guardian_bulwark_stance: {
      id: 'skill_guardian_bulwark_stance',
      name: 'バルワークの構え',
      description: '物理防御を大きく高め、敵の注意を引きつける。',
    },
    skill_guardian_iron_counter: {
      id: 'skill_guardian_iron_counter',
      name: 'アイアンカウンター',
      description: '構えをとり、被弾時に高確率で強烈な反撃を返す。',
    },
    skill_guardian_phalanx: {
      id: 'skill_guardian_phalanx',
      name: 'ファランクス',
      description: '味方全体に被弾を肩代わりする障壁を張る。',
    },
    skill_guardian_dragon_lance: {
      id: 'skill_guardian_dragon_lance',
      name: 'ドラゴンランス',
      description: '槍で単体を貫く渾身の極奥義。',
    },
    skill_guardian_great_wall: {
      id: 'skill_guardian_great_wall',
      name: 'グレートウォール',
      description: '味方全体に極大の障壁を展開する城壁の奥義。',
    },
    skill_mage_fire_lance: {
      id: 'skill_mage_fire_lance',
      name: 'ファイアランス',
      description: '単体に上位の火属性魔法ダメージ。',
    },
    skill_mage_frost_lance: {
      id: 'skill_mage_frost_lance',
      name: 'フロストランス',
      description: '単体に上位の氷属性魔法を放ち、確率で麻痺させる。',
    },
    skill_mage_volt_lance: {
      id: 'skill_mage_volt_lance',
      name: 'ボルトランス',
      description: '単体に上位の雷属性魔法ダメージ。',
    },
    skill_mage_mana_charge: {
      id: 'skill_mage_mana_charge',
      name: 'マナチャージ',
      description: '自身のTPを回復する魔導士の秘術。',
    },
    skill_mage_absolute_zero: {
      id: 'skill_mage_absolute_zero',
      name: 'アブソリュートゼロ',
      description: '敵全体を凍てつかせる極大の氷属性奥義。',
    },
    skill_mage_ragnarok: {
      id: 'skill_mage_ragnarok',
      name: 'ラグナロク',
      description: '単体を無属性の極大魔法で滅する極奥義。',
    },
    passive_mage_overload: {
      id: 'passive_mage_overload',
      name: '魔導過負荷',
      description: '魔法攻撃が大きく上昇する（常時）。',
    },
    skill_ranger_double_shot: {
      id: 'skill_ranger_double_shot',
      name: 'ダブルショット',
      description: '単体に2連続の射撃を浴びせる。',
    },
    skill_ranger_sky_volley: {
      id: 'skill_ranger_sky_volley',
      name: '空裂の斉射',
      description: '敵全体に降り注ぐ強力な射撃ダメージ（奥義）。',
    },
    skill_ranger_apollo_shot: {
      id: 'skill_ranger_apollo_shot',
      name: '滅びの一矢',
      description: '単体に絶大な貫通ダメージを与える狙撃の極致（奥義）。',
    },
    skill_ranger_binding_volley: {
      id: 'skill_ranger_binding_volley',
      name: '封鎖の斉射',
      description: '敵全体に射撃ダメージを与え、確率で腕を封じる。',
    },
    skill_ranger_falconry: {
      id: 'skill_ranger_falconry',
      name: '鷹匠の絆',
      description: '自律して敵を攻撃する鷹を最前列に呼ぶ（戦闘限り）。',
    },
    skill_ranger_hunters_mark: {
      id: 'skill_ranger_hunters_mark',
      name: '狩人の照準',
      description: '自身の命中を大きく高める。',
    },
    skill_ranger_field_dressing: {
      id: 'skill_ranger_field_dressing',
      name: '応急手当',
      description: '味方全体の状態異常を治療する。',
    },
    skill_ranger_volley_chase: {
      id: 'skill_ranger_volley_chase',
      name: '追い討ちの構え',
      description: '味方が突属性で敵を攻撃した時、追撃する構えを取る（数ターン）。',
    },
    passive_ranger_keen_eye: {
      id: 'passive_ranger_keen_eye',
      name: '精密眼',
      description: '命中とクリティカル率が上昇する（常時）。',
    },
    passive_ranger_swift_hands: {
      id: 'passive_ranger_swift_hands',
      name: '速射の手',
      description: '物理攻撃が上昇する（常時）。',
    },
    passive_ranger_predator: {
      id: 'passive_ranger_predator',
      name: '狩猟本能',
      description: '物理攻撃とクリティカル率が上昇する（常時）。',
    },
    skill_medic_regen_balm: {
      id: 'skill_medic_regen_balm',
      name: 'リジェネバーム',
      description: '味方1人のHPを大きく回復する。',
    },
    skill_medic_salvation: {
      id: 'skill_medic_salvation',
      name: 'サルベーション',
      description: '味方全体のHPを絶大に回復する奥義。',
    },
    skill_medic_panacea: {
      id: 'skill_medic_panacea',
      name: 'パナケイア',
      description: '味方全体のHPを大きく回復しつつ状態異常を治療する奥義。',
    },
    skill_medic_sleep_mist: {
      id: 'skill_medic_sleep_mist',
      name: 'スリープミスト',
      description: '敵全体を確率で眠らせる。',
    },
    skill_medic_paralysis_powder: {
      id: 'skill_medic_paralysis_powder',
      name: '痺れ粉',
      description: '敵全体を確率で麻痺させる。',
    },
    skill_medic_immune_hymn: {
      id: 'skill_medic_immune_hymn',
      name: '免疫の聖歌',
      description: '味方全体の物理防御を高める。',
    },
    skill_medic_revive_draft: {
      id: 'skill_medic_revive_draft',
      name: '蘇生薬',
      description: '味方全体のTPを回復させる。',
    },
    skill_medic_weakening_smoke: {
      id: 'skill_medic_weakening_smoke',
      name: '衰弱の煙',
      description: '敵全体の物理攻撃力を下げる。',
    },
    passive_medic_healing_hands: {
      id: 'passive_medic_healing_hands',
      name: '癒しの手',
      description: '魔法攻撃力が上昇する（常時）。',
    },
    passive_medic_staff_mastery: {
      id: 'passive_medic_staff_mastery',
      name: '杖の心得',
      description: '杖を装備中、魔法攻撃力が上昇する（常時）。',
    },
    passive_medic_vitality: {
      id: 'passive_medic_vitality',
      name: '健勝',
      description: '最大HPが上昇する（常時）。',
    },
    skill_dancer_chant_of_valor: {
      id: 'skill_dancer_chant_of_valor',
      name: '勇気の歌',
      description: '味方全体の命中を高める。',
    },
    skill_dancer_curse_dance: {
      id: 'skill_dancer_curse_dance',
      name: '呪縛の舞',
      description: '敵全体の回避を下げる。',
    },
    skill_dancer_storm_waltz: {
      id: 'skill_dancer_storm_waltz',
      name: '嵐の円舞',
      description: '敵全体を斬り払う剣舞の奥義。',
    },
    skill_dancer_dual_blade: {
      id: 'skill_dancer_dual_blade',
      name: '双剣の舞',
      description: '単体に2連続の斬撃を浴びせる。',
    },
    skill_dancer_grand_finale: {
      id: 'skill_dancer_grand_finale',
      name: '大円舞曲',
      description: '味方全体のHPを大きく回復する癒しの奥義。',
    },
    skill_dancer_blade_chase: {
      id: 'skill_dancer_blade_chase',
      name: '連舞の構え',
      description: '味方が斬属性で敵を攻撃した時、追撃する構えを取る（数ターン）。',
    },
    skill_dancer_lullaby_song: {
      id: 'skill_dancer_lullaby_song',
      name: '安らぎの調べ',
      description: '敵全体を確率で眠らせる舞姫の歌。',
    },
    skill_dancer_mana_song: {
      id: 'skill_dancer_mana_song',
      name: '律動の歌',
      description: '味方全体のTPを回復させる。',
    },
    passive_dancer_blade_mastery: {
      id: 'passive_dancer_blade_mastery',
      name: '剣の心得',
      description: '剣を装備中、物理攻撃力が上昇する（常時）。',
    },
    passive_dancer_vigor: {
      id: 'passive_dancer_vigor',
      name: '活力',
      description: '最大HPが上昇する（常時）。',
    },
    passive_dancer_resonance: {
      id: 'passive_dancer_resonance',
      name: '共鳴',
      description: '魔法攻撃力と最大TPが上昇する（常時）。',
    },
    skill_monk_double_palm: {
      id: 'skill_monk_double_palm',
      name: '双掌打',
      description: '単体に壊打の2連撃を浴びせる。',
    },
    skill_monk_pressure_point: {
      id: 'skill_monk_pressure_point',
      name: '点穴突き',
      description: '単体に壊打ダメージを与え、確率で腕を封じる。',
    },
    skill_monk_whirlwind_kick: {
      id: 'skill_monk_whirlwind_kick',
      name: '旋風脚',
      description: '敵全体を蹴り払う壊打。',
    },
    skill_monk_ki_guard: {
      id: 'skill_monk_ki_guard',
      name: '気功護身',
      description: '自身の物理防御を高める。',
    },
    skill_monk_breathing: {
      id: 'skill_monk_breathing',
      name: '吐納',
      description: '自身のTPを回復する呼吸法。',
    },
    skill_monk_seven_star: {
      id: 'skill_monk_seven_star',
      name: '七星連撃',
      description: '単体に壊打の5連撃を叩き込む奥義。',
    },
    skill_monk_demon_palm: {
      id: 'skill_monk_demon_palm',
      name: '羅刹掌',
      description: '単体に壊打の渾身奥義を放つ。',
    },
    passive_monk_counter_mastery: {
      id: 'passive_monk_counter_mastery',
      name: '反骨',
      description: '物理攻撃力とクリティカル率が上昇する（常時）。',
    },
    skill_hexer_drowsy_hex: {
      id: 'skill_hexer_drowsy_hex',
      name: '微睡の呪',
      description: '単体を確率で眠らせる（被ダメで解除）。',
    },
    skill_hexer_dark_bolt: {
      id: 'skill_hexer_dark_bolt',
      name: '闇の呪弾',
      description: '単体に無属性魔法ダメージ。',
    },
    skill_hexer_mass_paralyze: {
      id: 'skill_hexer_mass_paralyze',
      name: '痺れの呪',
      description: '敵全体を確率で麻痺させる。',
    },
    skill_hexer_def_hex: {
      id: 'skill_hexer_def_hex',
      name: '虚弱の呪',
      description: '敵全体の物理防御を下げる。',
    },
    skill_hexer_mdef_hex: {
      id: 'skill_hexer_mdef_hex',
      name: '崩魔の呪',
      description: '敵全体の魔法防御を下げる。',
    },
    skill_hexer_nightmare: {
      id: 'skill_hexer_nightmare',
      name: '悪夢の呪',
      description: '単体に魔法ダメージを与え、確率で眠らせる奥義。',
    },
    skill_hexer_calamity: {
      id: 'skill_hexer_calamity',
      name: '災禍の呪',
      description: '敵全体に強力な無属性魔法ダメージを与え、確率で毒にする奥義。',
    },
    passive_hexer_curse_lore: {
      id: 'passive_hexer_curse_lore',
      name: '呪術の知識',
      description: '魔法攻撃力が上昇する（常時）。',
    },
    skill_summoner_bone_spear: {
      id: 'skill_summoner_bone_spear',
      name: '骨の槍',
      description: '単体に無属性魔法ダメージを与え、確率で麻痺させる。',
    },
    skill_summoner_grave_field: {
      id: 'skill_summoner_grave_field',
      name: '墓標の凍土',
      description: '敵全体に氷属性魔法ダメージ。',
    },
    skill_summoner_soul_ward: {
      id: 'skill_summoner_soul_ward',
      name: '霊障の壁',
      description: '味方全体に、被弾を肩代わりする障壁を張る（数ターン）。',
    },
    skill_summoner_spirit_veil: {
      id: 'skill_summoner_spirit_veil',
      name: '霊衣',
      description: '自身の魔法防御を高める。',
    },
    skill_summoner_necro_bolt: {
      id: 'skill_summoner_necro_bolt',
      name: '死霊弾',
      description: '単体に無属性魔法ダメージ。',
    },
    skill_summoner_annihilation: {
      id: 'skill_summoner_annihilation',
      name: '冥滅爆裂',
      description: '敵全体に絶大な無属性魔法ダメージを与える奥義。',
    },
    skill_summoner_soul_render: {
      id: 'skill_summoner_soul_render',
      name: '魂喰らい',
      description: '単体に極大の無属性魔法ダメージを与える奥義。',
    },
    passive_summoner_spirit_lore: {
      id: 'passive_summoner_spirit_lore',
      name: '冥導',
      description: '魔法攻撃力と最大TPが上昇する（常時）。',
    },
    skill_summoner_call_revenant: {
      id: 'skill_summoner_call_revenant',
      name: '亡者召喚',
      description: '敵の攻撃を引き受ける高耐久の亡者の壁を最前列に呼ぶ（戦闘限り）。',
    },
  },
  Rn = {
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
        { kind: 'heal', amount: (l) => 60 + 25 * l },
        {
          kind: 'buff',
          stat: 'patk',
          modifier: (l) => 1.2 + 0.05 * l,
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
      effects: [{ kind: 'damage', statBase: 'str', power: (l) => 2.2 + 0.4 * l }],
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
      effects: [{ kind: 'damage', statBase: 'int', power: (l) => 2.4 + 0.5 * l }],
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
      effects: [{ kind: 'damage', statBase: 'str', power: (l) => 1.4 + 0.3 * l, hits: 3 }],
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
        { kind: 'heal', amount: (l) => 55 + 22 * l },
        {
          kind: 'buff',
          stat: 'mdef',
          modifier: (l) => 1.2 + 0.05 * l,
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
      effects: [{ kind: 'damage', statBase: 'str', power: (l) => 2.3 + 0.4 * l }],
    },
  },
  He = {
    LEVEL_CAP: 100,
    BOSS_INTERVAL: 10,
    BAND_SIZE: 10,
    ENEMY_SCALE_K: 0.06,
    EXP_CURVE_BASE: 20,
    EXP_CURVE_POW: 1.6,
    SP_PER_LEVEL: 1.62,
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
  Kb = 500,
  qc = 30,
  Yr = 3,
  Xr = 2,
  Zb = Yr + Xr,
  Xi = { TITLE_DEPTH: 20, REBIRTH_MIN_LEVEL: 30 },
  gh = 5,
  Jb = 5,
  kl = {
    MAX_LEVEL: 5,
    STAT_PER_LEVEL: 2,
    INGOT_INC: { copper: 1, silver: 3, gold: 5 },
    FRAGMENTS_PER_INGOT: 10,
    RECYCLE_FRAGMENTS: 3,
  },
  Vi = (l) => l > 0 && l % He.BOSS_INTERVAL === 0,
  Bc = (l) => Math.round(He.EXP_CURVE_BASE * Math.pow(l, He.EXP_CURVE_POW)),
  Br = (l) => Math.round(He.SP_PER_LEVEL * Math.max(0, l - 1)),
  Pb = (l) => Br(l) - Br(l - 1),
  Qi = (l) => l < He.LEVEL_CAP,
  ed = (l, i) => 1 + He.ENEMY_SCALE_K * (l - i),
  ul = {
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
      kind: 'boss',
    },
    enemy_t0_forest_rabbit: {
      id: 'enemy_t0_forest_rabbit',
      name: 'もりウサギ',
      baseStats: { hp: 16, tp: 0, str: 5, vit: 3, agi: 9, int: 2, mnd: 3, luc: 6 },
      refDepth: 3,
      tierBand: 0,
      exp: 5,
      gold: 4,
      attackElement: 'bash',
      drops: [{ itemId: 'item_mat_t0_soft_pelt', rate: 0.5 }],
      kind: 'zako',
    },
    enemy_t0_glow_mushroom: {
      id: 'enemy_t0_glow_mushroom',
      name: 'ひかりタケ',
      baseStats: { hp: 22, tp: 0, str: 6, vit: 6, agi: 4, int: 4, mnd: 4, luc: 3 },
      refDepth: 3,
      tierBand: 0,
      exp: 7,
      gold: 5,
      attackElement: 'bash',
      resist: { fire: 1.5, volt: 0.5 },
      drops: [{ itemId: 'item_mat_t0_spore_cap', rate: 0.6 }],
      kind: 'zako',
    },
    enemy_t0_wood_caracal: {
      id: 'enemy_t0_wood_caracal',
      name: 'やぶカラカル',
      baseStats: { hp: 20, tp: 0, str: 8, vit: 4, agi: 8, int: 3, mnd: 2, luc: 5 },
      refDepth: 3,
      tierBand: 0,
      exp: 8,
      gold: 6,
      attackElement: 'slash',
      drops: [{ itemId: 'item_mat_t0_soft_pelt', rate: 0.5 }],
      kind: 'zako',
    },
    enemy_t0_pale_wisp: {
      id: 'enemy_t0_pale_wisp',
      name: 'あおざめた亡霊',
      baseStats: { hp: 19, tp: 0, str: 6, vit: 3, agi: 6, int: 4, mnd: 4, luc: 4 },
      refDepth: 3,
      tierBand: 0,
      exp: 8,
      gold: 7,
      attackElement: 'bash',
      resist: { slash: 0.5, pierce: 0.5, fire: 1.5 },
      drops: [{ itemId: 'item_mat_t0_faint_ember', rate: 0.4 }],
      kind: 'zako',
    },
    enemy_t0_bristle_boar: {
      id: 'enemy_t0_bristle_boar',
      name: 'こイノシシ',
      baseStats: { hp: 26, tp: 0, str: 8, vit: 6, agi: 5, int: 2, mnd: 3, luc: 4 },
      refDepth: 3,
      tierBand: 0,
      exp: 9,
      gold: 8,
      attackElement: 'bash',
      drops: [{ itemId: 'item_mat_t0_soft_pelt', rate: 0.5 }],
      kind: 'zako',
    },
    enemy_t0_thicket_stag: {
      id: 'enemy_t0_thicket_stag',
      name: 'しげみのオオツノジカ',
      baseStats: { hp: 58, tp: 0, str: 11, vit: 9, agi: 8, int: 3, mnd: 5, luc: 5 },
      refDepth: 6,
      tierBand: 0,
      exp: 30,
      gold: 40,
      attackElement: 'pierce',
      resist: { fire: 1.5 },
      drops: [{ itemId: 'item_mat_t0_great_antler', rate: 0.7 }],
      kind: 'foe',
    },
    enemy_t0_cave_crawler: {
      id: 'enemy_t0_cave_crawler',
      name: 'どうくつヤスデ',
      baseStats: { hp: 70, tp: 0, str: 10, vit: 10, agi: 5, int: 2, mnd: 4, luc: 3 },
      refDepth: 6,
      tierBand: 0,
      exp: 35,
      gold: 45,
      attackElement: 'bash',
      resist: { pierce: 0.5, ice: 1.5 },
      drops: [{ itemId: 'item_mat_t0_chitin_plate', rate: 0.7 }],
      kind: 'foe',
    },
    enemy_t0_elder_treant: {
      id: 'enemy_t0_elder_treant',
      name: 'ふるびた樹人',
      baseStats: { hp: 68, tp: 0, str: 13, vit: 10, agi: 5, int: 4, mnd: 6, luc: 4 },
      refDepth: 6,
      tierBand: 0,
      exp: 40,
      gold: 55,
      attackElement: 'bash',
      resist: { slash: 0.5, bash: 0.5, fire: 1.5, ice: 0.5 },
      drops: [{ itemId: 'item_mat_t0_great_antler', rate: 0.6 }],
      kind: 'foe',
    },
    enemy_t1_crag_goat: {
      id: 'enemy_t1_crag_goat',
      name: 'がんぺきヤギ',
      baseStats: { hp: 44, tp: 0, str: 14, vit: 11, agi: 9, int: 3, mnd: 4, luc: 5 },
      refDepth: 13,
      tierBand: 1,
      exp: 16,
      gold: 14,
      attackElement: 'bash',
      drops: [{ itemId: 'item_mat_t1_coarse_hide', rate: 0.5 }],
      kind: 'zako',
    },
    enemy_t1_rock_lizard: {
      id: 'enemy_t1_rock_lizard',
      name: 'いわトカゲ',
      baseStats: { hp: 50, tp: 0, str: 13, vit: 13, agi: 7, int: 3, mnd: 4, luc: 4 },
      refDepth: 13,
      tierBand: 1,
      exp: 18,
      gold: 16,
      attackElement: 'slash',
      resist: { fire: 0.5, ice: 1.5 },
      drops: [{ itemId: 'item_mat_t1_stone_scale', rate: 0.5 }],
      kind: 'zako',
    },
    enemy_t1_highland_hawk: {
      id: 'enemy_t1_highland_hawk',
      name: 'こうちタカ',
      baseStats: { hp: 38, tp: 0, str: 15, vit: 8, agi: 12, int: 4, mnd: 4, luc: 6 },
      refDepth: 13,
      tierBand: 1,
      exp: 17,
      gold: 15,
      attackElement: 'pierce',
      resist: { volt: 1.5 },
      drops: [{ itemId: 'item_mat_t1_sharp_feather', rate: 0.5 }],
      kind: 'zako',
    },
    enemy_t1_stone_beetle: {
      id: 'enemy_t1_stone_beetle',
      name: 'いわかぶとムシ',
      baseStats: { hp: 56, tp: 0, str: 13, vit: 13, agi: 6, int: 2, mnd: 5, luc: 4 },
      refDepth: 13,
      tierBand: 1,
      exp: 19,
      gold: 17,
      attackElement: 'bash',
      resist: { bash: 0.5, pierce: 0.5, volt: 1.5 },
      drops: [{ itemId: 'item_mat_t1_stone_scale', rate: 0.5 }],
      kind: 'zako',
    },
    enemy_t1_cliff_ram: {
      id: 'enemy_t1_cliff_ram',
      name: 'がけのオオヒツジ',
      baseStats: { hp: 52, tp: 0, str: 16, vit: 12, agi: 8, int: 2, mnd: 4, luc: 5 },
      refDepth: 13,
      tierBand: 1,
      exp: 20,
      gold: 18,
      attackElement: 'bash',
      drops: [{ itemId: 'item_mat_t1_coarse_hide', rate: 0.5 }],
      kind: 'zako',
    },
    enemy_t1_ember_lizard: {
      id: 'enemy_t1_ember_lizard',
      name: 'ほむらトカゲ',
      baseStats: { hp: 46, tp: 0, str: 17, vit: 10, agi: 10, int: 5, mnd: 5, luc: 5 },
      refDepth: 13,
      tierBand: 1,
      exp: 21,
      gold: 20,
      attackElement: 'slash',
      resist: { fire: 0, ice: 1.5 },
      drops: [{ itemId: 'item_mat_t1_stone_scale', rate: 0.5 }],
      kind: 'zako',
    },
    enemy_t1_boulder_toad: {
      id: 'enemy_t1_boulder_toad',
      name: 'いわガマ',
      baseStats: { hp: 58, tp: 0, str: 12, vit: 12, agi: 6, int: 4, mnd: 6, luc: 4 },
      refDepth: 13,
      tierBand: 1,
      exp: 18,
      gold: 16,
      attackElement: 'bash',
      resist: { volt: 1.5, ice: 0.5 },
      drops: [{ itemId: 'item_mat_t1_coarse_hide', rate: 0.5 }],
      kind: 'zako',
    },
    enemy_t1_young_baboon: {
      id: 'enemy_t1_young_baboon',
      name: 'わかザル',
      baseStats: { hp: 48, tp: 0, str: 16, vit: 9, agi: 11, int: 4, mnd: 4, luc: 6 },
      refDepth: 13,
      tierBand: 1,
      exp: 22,
      gold: 22,
      attackElement: 'bash',
      drops: [{ itemId: 'item_mat_t1_coarse_hide', rate: 0.5 }],
      kind: 'zako',
    },
    enemy_t1_boulder_ogre: {
      id: 'enemy_t1_boulder_ogre',
      name: 'おおいわのオーガ',
      baseStats: { hp: 150, tp: 0, str: 28, vit: 22, agi: 7, int: 3, mnd: 8, luc: 5 },
      refDepth: 16,
      tierBand: 1,
      exp: 100,
      gold: 140,
      attackElement: 'bash',
      resist: { bash: 0.5, slash: 0.5, ice: 1.5 },
      drops: [{ itemId: 'item_mat_t1_ogre_fang', rate: 0.7 }],
      kind: 'foe',
    },
    enemy_t1_thunder_roc: {
      id: 'enemy_t1_thunder_roc',
      name: 'いかずちの大ワシ',
      baseStats: { hp: 110, tp: 0, str: 26, vit: 16, agi: 13, int: 6, mnd: 7, luc: 6 },
      refDepth: 16,
      tierBand: 1,
      exp: 80,
      gold: 110,
      attackElement: 'pierce',
      resist: { volt: 0, ice: 1.5 },
      drops: [{ itemId: 'item_mat_t1_sharp_feather', rate: 0.7 }],
      kind: 'foe',
    },
    enemy_t1_magma_drake: {
      id: 'enemy_t1_magma_drake',
      name: 'マグマの竜トカゲ',
      baseStats: { hp: 160, tp: 0, str: 30, vit: 20, agi: 9, int: 7, mnd: 9, luc: 5 },
      refDepth: 16,
      tierBand: 1,
      exp: 110,
      gold: 160,
      attackElement: 'slash',
      resist: { fire: 0, slash: 0.5, ice: 1.5 },
      drops: [{ itemId: 'item_mat_t1_drake_horn', rate: 0.8 }],
      kind: 'foe',
    },
    enemy_t1_boss_mountain_lord: {
      id: 'enemy_t1_boss_mountain_lord',
      name: '山嶺の大猿王',
      baseStats: { hp: 620, tp: 0, str: 40, vit: 34, agi: 12, int: 8, mnd: 18, luc: 8 },
      refDepth: 20,
      tierBand: 1,
      exp: 400,
      gold: 650,
      attackElement: 'bash',
      resist: { bash: 0.5, slash: 0.5, pierce: 0.5, fire: 0.5, volt: 0.5, ice: 1.5 },
      drops: [{ itemId: 'item_mat_t1_lord_pelt', rate: 1 }],
      kind: 'boss',
      isBoss: !0,
    },
    enemy_t2_frostfang_wolf: {
      id: 'enemy_t2_frostfang_wolf',
      name: 'シモフリオオカミ',
      baseStats: { hp: 88, tp: 0, str: 26, vit: 16, agi: 14, int: 6, mnd: 8, luc: 7 },
      refDepth: 23,
      tierBand: 2,
      exp: 46,
      gold: 42,
      attackElement: 'slash',
      resist: { ice: 0.5, fire: 1.5 },
      drops: [{ itemId: 'item_mat_t2_frost_pelt', rate: 0.5 }],
      kind: 'zako',
    },
    enemy_t2_snow_ape: {
      id: 'enemy_t2_snow_ape',
      name: 'セッペキザル',
      baseStats: { hp: 96, tp: 0, str: 27, vit: 18, agi: 10, int: 5, mnd: 9, luc: 6 },
      refDepth: 23,
      tierBand: 2,
      exp: 50,
      gold: 48,
      attackElement: 'bash',
      resist: { ice: 0.5, fire: 1.5, bash: 0.5 },
      drops: [{ itemId: 'item_mat_t2_frost_pelt', rate: 0.45 }],
      kind: 'zako',
    },
    enemy_t2_glacier_crab: {
      id: 'enemy_t2_glacier_crab',
      name: 'ヒョウケツガニ',
      baseStats: { hp: 100, tp: 0, str: 23, vit: 20, agi: 8, int: 4, mnd: 10, luc: 5 },
      refDepth: 23,
      tierBand: 2,
      exp: 48,
      gold: 50,
      attackElement: 'pierce',
      resist: { ice: 0.5, fire: 1.5, slash: 0.5 },
      drops: [{ itemId: 'item_mat_t2_ice_crystal', rate: 0.5 }],
      kind: 'zako',
    },
    enemy_t2_snow_owl: {
      id: 'enemy_t2_snow_owl',
      name: 'セツゲンフクロウ',
      baseStats: { hp: 72, tp: 0, str: 24, vit: 14, agi: 16, int: 9, mnd: 8, luc: 9 },
      refDepth: 23,
      tierBand: 2,
      exp: 44,
      gold: 38,
      attackElement: 'slash',
      resist: { ice: 0.5, fire: 1.5, volt: 1.5 },
      drops: [{ itemId: 'item_mat_t2_frost_pelt', rate: 0.5 }],
      kind: 'zako',
    },
    enemy_t2_ice_wisp: {
      id: 'enemy_t2_ice_wisp',
      name: 'コオリビ',
      baseStats: { hp: 70, tp: 0, str: 22, vit: 14, agi: 15, int: 12, mnd: 12, luc: 8 },
      refDepth: 23,
      tierBand: 2,
      exp: 42,
      gold: 40,
      attackElement: 'bash',
      resist: { ice: 0, fire: 1.5, slash: 0.5, pierce: 0.5 },
      drops: [{ itemId: 'item_mat_t2_chill_core', rate: 0.45 }],
      kind: 'zako',
    },
    enemy_t2_rime_beetle: {
      id: 'enemy_t2_rime_beetle',
      name: 'ジュヒョウムシ',
      baseStats: { hp: 92, tp: 0, str: 25, vit: 19, agi: 11, int: 5, mnd: 7, luc: 6 },
      refDepth: 23,
      tierBand: 2,
      exp: 47,
      gold: 44,
      attackElement: 'pierce',
      resist: { ice: 0.5, fire: 1.5 },
      drops: [{ itemId: 'item_mat_t2_ice_crystal', rate: 0.5 }],
      kind: 'zako',
    },
    enemy_t2_frost_stag: {
      id: 'enemy_t2_frost_stag',
      name: 'ヒョウガジカ',
      baseStats: { hp: 98, tp: 0, str: 28, vit: 18, agi: 13, int: 6, mnd: 9, luc: 7 },
      refDepth: 23,
      tierBand: 2,
      exp: 52,
      gold: 46,
      attackElement: 'pierce',
      resist: { ice: 0.5, fire: 1.5 },
      drops: [{ itemId: 'item_mat_t2_frost_pelt', rate: 0.55 }],
      kind: 'zako',
    },
    enemy_t2_snow_serpent: {
      id: 'enemy_t2_snow_serpent',
      name: 'セツゲンヘビ',
      baseStats: { hp: 84, tp: 0, str: 27, vit: 15, agi: 16, int: 7, mnd: 7, luc: 8 },
      refDepth: 23,
      tierBand: 2,
      exp: 49,
      gold: 43,
      attackElement: 'pierce',
      resist: { ice: 0.5, fire: 1.5, volt: 0.5 },
      drops: [{ itemId: 'item_mat_t2_chill_core', rate: 0.5 }],
      kind: 'zako',
    },
    enemy_t2_glacial_bear: {
      id: 'enemy_t2_glacial_bear',
      name: 'ヒョウガグマ',
      baseStats: { hp: 280, tp: 0, str: 50, vit: 30, agi: 12, int: 6, mnd: 14, luc: 8 },
      refDepth: 26,
      tierBand: 2,
      exp: 220,
      gold: 320,
      attackElement: 'bash',
      resist: { ice: 0.5, fire: 1.5, bash: 0.5 },
      drops: [
        { itemId: 'item_mat_t2_frost_pelt', rate: 0.8 },
        { itemId: 'item_mat_t2_chill_core', rate: 0.6 },
      ],
      kind: 'foe',
    },
    enemy_t2_iron_ice_golem: {
      id: 'enemy_t2_iron_ice_golem',
      name: 'ヒョウケツゴーレム',
      baseStats: { hp: 300, tp: 0, str: 46, vit: 34, agi: 8, int: 5, mnd: 16, luc: 6 },
      refDepth: 26,
      tierBand: 2,
      exp: 210,
      gold: 340,
      attackElement: 'bash',
      resist: { ice: 0, fire: 1.5, slash: 0.5, pierce: 0.5 },
      drops: [
        { itemId: 'item_mat_t2_ice_crystal', rate: 0.8 },
        { itemId: 'item_mat_t2_chill_core', rate: 0.6 },
      ],
      kind: 'foe',
    },
    enemy_t2_blizzard_hawk: {
      id: 'enemy_t2_blizzard_hawk',
      name: 'フブキタカ',
      baseStats: { hp: 200, tp: 0, str: 52, vit: 24, agi: 22, int: 8, mnd: 10, luc: 11 },
      refDepth: 26,
      tierBand: 2,
      exp: 160,
      gold: 220,
      attackElement: 'slash',
      resist: { ice: 0.5, fire: 1.5, volt: 1.5 },
      drops: [
        { itemId: 'item_mat_t2_frost_pelt', rate: 0.7 },
        { itemId: 'item_mat_t2_ice_crystal', rate: 0.6 },
      ],
      kind: 'foe',
    },
    enemy_t2_boss_frost_monarch: {
      id: 'enemy_t2_boss_frost_monarch',
      name: '氷晶の女王',
      baseStats: { hp: 1300, tp: 0, str: 64, vit: 54, agi: 18, int: 16, mnd: 22, luc: 12 },
      refDepth: 30,
      tierBand: 2,
      exp: 860,
      gold: 1400,
      attackElement: 'bash',
      resist: { ice: 0, fire: 1.5, slash: 0.5, pierce: 0.5, bash: 0.5, volt: 0.5 },
      drops: [{ itemId: 'item_mat_t2_monarch_diadem', rate: 1 }],
      kind: 'boss',
      isBoss: !0,
    },
    enemy_t3_storm_wolf: {
      id: 'enemy_t3_storm_wolf',
      name: 'ライメイオオカミ',
      baseStats: { hp: 150, tp: 0, str: 42, vit: 26, agi: 24, int: 8, mnd: 10, luc: 10 },
      refDepth: 33,
      tierBand: 3,
      exp: 96,
      gold: 84,
      attackElement: 'slash',
      resist: { volt: 0.5, ice: 1.5 },
      drops: [{ itemId: 'item_mat_t3_charged_hide', rate: 0.5 }],
      kind: 'zako',
    },
    enemy_t3_thunder_bird: {
      id: 'enemy_t3_thunder_bird',
      name: 'ライウチョウ',
      baseStats: { hp: 134, tp: 0, str: 40, vit: 24, agi: 30, int: 12, mnd: 11, luc: 13 },
      refDepth: 33,
      tierBand: 3,
      exp: 92,
      gold: 78,
      attackElement: 'slash',
      resist: { volt: 0, ice: 1.5 },
      drops: [{ itemId: 'item_mat_t3_storm_feather', rate: 0.5 }],
      kind: 'zako',
    },
    enemy_t3_spark_beetle: {
      id: 'enemy_t3_spark_beetle',
      name: 'ホウデンムシ',
      baseStats: { hp: 156, tp: 0, str: 38, vit: 30, agi: 20, int: 10, mnd: 9, luc: 9 },
      refDepth: 33,
      tierBand: 3,
      exp: 90,
      gold: 80,
      attackElement: 'pierce',
      resist: { volt: 0.5, ice: 1.5, bash: 0.5 },
      drops: [{ itemId: 'item_mat_t3_thunder_carapace', rate: 0.5 }],
      kind: 'zako',
    },
    enemy_t3_gale_serpent: {
      id: 'enemy_t3_gale_serpent',
      name: 'シップウヘビ',
      baseStats: { hp: 140, tp: 0, str: 44, vit: 24, agi: 28, int: 9, mnd: 8, luc: 11 },
      refDepth: 33,
      tierBand: 3,
      exp: 94,
      gold: 82,
      attackElement: 'pierce',
      resist: { volt: 0.5, ice: 1.5 },
      drops: [{ itemId: 'item_mat_t3_charged_hide', rate: 0.5 }],
      kind: 'zako',
    },
    enemy_t3_charged_wisp: {
      id: 'enemy_t3_charged_wisp',
      name: 'イカズチビ',
      baseStats: { hp: 130, tp: 0, str: 36, vit: 24, agi: 26, int: 16, mnd: 14, luc: 10 },
      refDepth: 33,
      tierBand: 3,
      exp: 88,
      gold: 86,
      attackElement: 'bash',
      resist: { volt: 0, ice: 1.5, slash: 0.5, pierce: 0.5 },
      drops: [{ itemId: 'item_mat_t3_storm_feather', rate: 0.45 }],
      kind: 'zako',
    },
    enemy_t3_tempest_ape: {
      id: 'enemy_t3_tempest_ape',
      name: 'アラシザル',
      baseStats: { hp: 168, tp: 0, str: 45, vit: 32, agi: 22, int: 7, mnd: 10, luc: 8 },
      refDepth: 33,
      tierBand: 3,
      exp: 100,
      gold: 90,
      attackElement: 'bash',
      resist: { volt: 0.5, ice: 1.5 },
      drops: [{ itemId: 'item_mat_t3_charged_hide', rate: 0.55 }],
      kind: 'zako',
    },
    enemy_t3_static_crystal: {
      id: 'enemy_t3_static_crystal',
      name: 'タイデンクリスタル',
      baseStats: { hp: 162, tp: 0, str: 38, vit: 32, agi: 18, int: 14, mnd: 16, luc: 7 },
      refDepth: 33,
      tierBand: 3,
      exp: 98,
      gold: 100,
      attackElement: 'bash',
      resist: { volt: 0, ice: 1.5, slash: 0.5, pierce: 0.5 },
      drops: [{ itemId: 'item_mat_t3_thunder_carapace', rate: 0.5 }],
      kind: 'zako',
    },
    enemy_t3_rain_hawk: {
      id: 'enemy_t3_rain_hawk',
      name: 'シグレタカ',
      baseStats: { hp: 138, tp: 0, str: 41, vit: 25, agi: 32, int: 10, mnd: 11, luc: 13 },
      refDepth: 33,
      tierBand: 3,
      exp: 95,
      gold: 76,
      attackElement: 'slash',
      resist: { volt: 0.5, ice: 1.5, fire: 1.5 },
      drops: [{ itemId: 'item_mat_t3_storm_feather', rate: 0.55 }],
      kind: 'zako',
    },
    enemy_t3_thunder_beast: {
      id: 'enemy_t3_thunder_beast',
      name: 'ゴウライジュウ',
      baseStats: { hp: 480, tp: 0, str: 78, vit: 40, agi: 26, int: 10, mnd: 14, luc: 10 },
      refDepth: 36,
      tierBand: 3,
      exp: 440,
      gold: 640,
      attackElement: 'bash',
      resist: { volt: 0, ice: 1.5, bash: 0.5 },
      drops: [
        { itemId: 'item_mat_t3_charged_hide', rate: 0.8 },
        { itemId: 'item_mat_t3_thunder_carapace', rate: 0.6 },
      ],
      kind: 'foe',
    },
    enemy_t3_storm_roc: {
      id: 'enemy_t3_storm_roc',
      name: 'バクフウチョウ',
      baseStats: { hp: 360, tp: 0, str: 80, vit: 34, agi: 36, int: 12, mnd: 12, luc: 14 },
      refDepth: 36,
      tierBand: 3,
      exp: 360,
      gold: 480,
      attackElement: 'slash',
      resist: { volt: 0.5, ice: 1.5 },
      drops: [
        { itemId: 'item_mat_t3_storm_feather', rate: 0.8 },
        { itemId: 'item_mat_t3_charged_hide', rate: 0.6 },
      ],
      kind: 'foe',
    },
    enemy_t3_discharge_idol: {
      id: 'enemy_t3_discharge_idol',
      name: 'ホウデンキョゾウ',
      baseStats: { hp: 520, tp: 0, str: 64, vit: 44, agi: 20, int: 18, mnd: 20, luc: 8 },
      refDepth: 36,
      tierBand: 3,
      exp: 380,
      gold: 560,
      attackElement: 'bash',
      resist: { volt: 0, ice: 1.5, slash: 0.5, pierce: 0.5 },
      drops: [
        { itemId: 'item_mat_t3_thunder_carapace', rate: 0.8 },
        { itemId: 'item_mat_t3_storm_feather', rate: 0.6 },
      ],
      kind: 'foe',
    },
    enemy_t3_boss_tempest_sovereign: {
      id: 'enemy_t3_boss_tempest_sovereign',
      name: '雷霆の覇王',
      baseStats: { hp: 2500, tp: 0, str: 102, vit: 86, agi: 34, int: 22, mnd: 26, luc: 14 },
      refDepth: 40,
      tierBand: 3,
      exp: 1680,
      gold: 2800,
      attackElement: 'slash',
      resist: { volt: 0, ice: 1.5, slash: 0.5, pierce: 0.5, bash: 0.5, fire: 0.5 },
      drops: [{ itemId: 'item_mat_t3_sovereign_horn', rate: 1 }],
      kind: 'boss',
      isBoss: !0,
    },
    enemy_t4_rotwalker: {
      id: 'enemy_t4_rotwalker',
      name: '腐肉の徘徊者',
      baseStats: { hp: 290, tp: 0, str: 64, vit: 50, agi: 11, int: 8, mnd: 18, luc: 14 },
      refDepth: 43,
      tierBand: 4,
      exp: 180,
      gold: 140,
      attackElement: 'bash',
      resist: { slash: 0.5, pierce: 0.5, fire: 1.5, ice: 0.5 },
      drops: [
        { itemId: 'item_mat_t4_rotflesh', rate: 0.55 },
        { itemId: 'item_mat_t4_grave_dust', rate: 0.4 },
      ],
      kind: 'zako',
    },
    enemy_t4_bone_lancer: {
      id: 'enemy_t4_bone_lancer',
      name: '骸骨の突撃兵',
      baseStats: { hp: 248, tp: 0, str: 70, vit: 44, agi: 18, int: 6, mnd: 12, luc: 16 },
      refDepth: 43,
      tierBand: 4,
      exp: 175,
      gold: 150,
      attackElement: 'pierce',
      resist: { pierce: 0.5, ice: 1.5, volt: 0.5 },
      drops: [
        { itemId: 'item_mat_t4_grave_dust', rate: 0.5 },
        { itemId: 'item_mat_t4_cursed_marrow', rate: 0.45 },
      ],
      kind: 'zako',
    },
    enemy_t4_miasma_moth: {
      id: 'enemy_t4_miasma_moth',
      name: '瘴気の毒蛾',
      baseStats: { hp: 232, tp: 0, str: 58, vit: 40, agi: 22, int: 16, mnd: 16, luc: 20 },
      refDepth: 43,
      tierBand: 4,
      exp: 165,
      gold: 120,
      attackElement: 'slash',
      resist: { fire: 0.5, ice: 1.5 },
      drops: [
        { itemId: 'item_mat_t4_toxic_scale', rate: 0.6 },
        { itemId: 'item_mat_t4_rotflesh', rate: 0.4 },
      ],
      kind: 'zako',
    },
    enemy_t4_wraith_lantern: {
      id: 'enemy_t4_wraith_lantern',
      name: '彷徨う鬼火',
      baseStats: { hp: 240, tp: 0, str: 60, vit: 42, agi: 20, int: 20, mnd: 22, luc: 18 },
      refDepth: 43,
      tierBand: 4,
      exp: 190,
      gold: 160,
      attackElement: 'bash',
      resist: { slash: 0.5, bash: 0.5, fire: 0.5, volt: 1.5 },
      drops: [
        { itemId: 'item_mat_t4_spectral_ash', rate: 0.5 },
        { itemId: 'item_mat_t4_cursed_marrow', rate: 0.4 },
      ],
      kind: 'zako',
    },
    enemy_t4_rust_sentinel: {
      id: 'enemy_t4_rust_sentinel',
      name: '錆びた哨戒機',
      baseStats: { hp: 312, tp: 0, str: 66, vit: 52, agi: 10, int: 10, mnd: 14, luc: 12 },
      refDepth: 43,
      tierBand: 4,
      exp: 210,
      gold: 185,
      attackElement: 'bash',
      resist: { slash: 0.5, fire: 0.5, volt: 1.5 },
      drops: [
        { itemId: 'item_mat_t4_steel_gear', rate: 0.55 },
        { itemId: 'item_mat_t4_corroded_plate', rate: 0.45 },
      ],
      kind: 'zako',
    },
    enemy_t4_plague_crawler: {
      id: 'enemy_t4_plague_crawler',
      name: '疫病の這い虫',
      baseStats: { hp: 268, tp: 0, str: 62, vit: 46, agi: 16, int: 12, mnd: 14, luc: 16 },
      refDepth: 43,
      tierBand: 4,
      exp: 170,
      gold: 130,
      attackElement: 'pierce',
      resist: { pierce: 0.5, ice: 0.5, fire: 1.5 },
      drops: [
        { itemId: 'item_mat_t4_toxic_scale', rate: 0.5 },
        { itemId: 'item_mat_t4_rotflesh', rate: 0.45 },
      ],
      kind: 'zako',
    },
    enemy_t4_grave_acolyte: {
      id: 'enemy_t4_grave_acolyte',
      name: '墓守の呪詛師',
      baseStats: { hp: 236, tp: 0, str: 59, vit: 41, agi: 14, int: 22, mnd: 24, luc: 18 },
      refDepth: 43,
      tierBand: 4,
      exp: 200,
      gold: 175,
      attackElement: 'slash',
      resist: { volt: 0.5, ice: 1.5 },
      drops: [
        { itemId: 'item_mat_t4_cursed_marrow', rate: 0.55 },
        { itemId: 'item_mat_t4_spectral_ash', rate: 0.4 },
      ],
      kind: 'zako',
    },
    enemy_t4_gear_hound: {
      id: 'enemy_t4_gear_hound',
      name: '鋼鉄の番犬',
      baseStats: { hp: 256, tp: 0, str: 72, vit: 48, agi: 21, int: 8, mnd: 10, luc: 14 },
      refDepth: 43,
      tierBand: 4,
      exp: 195,
      gold: 165,
      attackElement: 'slash',
      resist: { bash: 0.5, fire: 0.5, ice: 1.5 },
      drops: [
        { itemId: 'item_mat_t4_steel_gear', rate: 0.5 },
        { itemId: 'item_mat_t4_corroded_plate', rate: 0.4 },
      ],
      kind: 'zako',
    },
    enemy_t4_corpse_colossus: {
      id: 'enemy_t4_corpse_colossus',
      name: '腐肉の巨像',
      baseStats: { hp: 860, tp: 0, str: 118, vit: 86, agi: 10, int: 12, mnd: 24, luc: 18 },
      refDepth: 46,
      tierBand: 4,
      exp: 880,
      gold: 1280,
      attackElement: 'bash',
      resist: { slash: 0.5, pierce: 0.5, bash: 0.5, fire: 1.5, ice: 0.5 },
      drops: [
        { itemId: 'item_mat_t4_rotflesh', rate: 0.75 },
        { itemId: 'item_mat_t4_grave_dust', rate: 0.6 },
      ],
      kind: 'foe',
    },
    enemy_t4_siege_automaton: {
      id: 'enemy_t4_siege_automaton',
      name: '攻城の自動兵器',
      baseStats: { hp: 820, tp: 0, str: 124, vit: 96, agi: 8, int: 14, mnd: 20, luc: 14 },
      refDepth: 46,
      tierBand: 4,
      exp: 820,
      gold: 1300,
      attackElement: 'pierce',
      resist: { slash: 0.5, pierce: 0.5, fire: 0.5, volt: 1.5 },
      drops: [
        { itemId: 'item_mat_t4_steel_gear', rate: 0.7 },
        { itemId: 'item_mat_t4_corroded_plate', rate: 0.65 },
      ],
      kind: 'foe',
    },
    enemy_t4_shroud_revenant: {
      id: 'enemy_t4_shroud_revenant',
      name: '帷子の怨霊',
      baseStats: { hp: 700, tp: 0, str: 108, vit: 70, agi: 18, int: 24, mnd: 30, luc: 22 },
      refDepth: 46,
      tierBand: 4,
      exp: 760,
      gold: 980,
      attackElement: 'slash',
      resist: { slash: 0.5, bash: 0.5, volt: 0.5, ice: 1.5 },
      drops: [
        { itemId: 'item_mat_t4_spectral_ash', rate: 0.7 },
        { itemId: 'item_mat_t4_cursed_marrow', rate: 0.6 },
      ],
      kind: 'foe',
    },
    enemy_t4_boss_blight_sovereign: {
      id: 'enemy_t4_boss_blight_sovereign',
      name: '瘴気を統べる腐王',
      baseStats: { hp: 4200, tp: 0, str: 142, vit: 122, agi: 16, int: 30, mnd: 64, luc: 26 },
      refDepth: 50,
      tierBand: 4,
      exp: 3e3,
      gold: 4800,
      attackElement: 'bash',
      resist: { slash: 0.5, pierce: 0.5, bash: 0.5, fire: 0.5, volt: 0.5, ice: 1.5 },
      drops: [
        { itemId: 'item_mat_t4_sovereign_crown', rate: 1 },
        { itemId: 'item_mat_t4_rotflesh', rate: 0.8 },
        { itemId: 'item_mat_t4_cursed_marrow', rate: 0.7 },
      ],
      kind: 'boss',
      isBoss: !0,
    },
  },
  ot = {
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
    equip_iron_knuckle: {
      id: 'equip_iron_knuckle',
      name: '鉄甲',
      slot: 'weapon',
      tier: 0,
      buyPrice: 100,
      weaponType: 'fist',
      bonuses: { atk: 5 },
    },
    equip_battle_axe: {
      id: 'equip_battle_axe',
      name: 'バトルアックス',
      slot: 'weapon',
      tier: 0,
      buyPrice: 160,
      weaponType: 'axe',
      bonuses: { atk: 8 },
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
    equip_t2_sword: {
      id: 'equip_t2_sword',
      name: '鋼の剣',
      slot: 'weapon',
      tier: 2,
      buyPrice: 620,
      weaponType: 'sword',
      bonuses: { atk: 20 },
    },
    equip_t2_spear: {
      id: 'equip_t2_spear',
      name: '鋼の槍',
      slot: 'weapon',
      tier: 2,
      buyPrice: 660,
      weaponType: 'spear',
      bonuses: { atk: 21 },
    },
    equip_t2_axe: {
      id: 'equip_t2_axe',
      name: '鋼の戦斧',
      slot: 'weapon',
      tier: 2,
      buyPrice: 700,
      weaponType: 'axe',
      bonuses: { atk: 23 },
    },
    equip_t2_bow: {
      id: 'equip_t2_bow',
      name: '狩人の弓',
      slot: 'weapon',
      tier: 2,
      buyPrice: 580,
      weaponType: 'bow',
      bonuses: { atk: 17 },
    },
    equip_t2_fist: {
      id: 'equip_t2_fist',
      name: '鋼の籠手',
      slot: 'weapon',
      tier: 2,
      buyPrice: 560,
      weaponType: 'fist',
      bonuses: { atk: 16 },
    },
    equip_t2_staff: {
      id: 'equip_t2_staff',
      name: '銀飾りの杖',
      slot: 'weapon',
      tier: 2,
      buyPrice: 660,
      weaponType: 'staff',
      bonuses: { mat: 21 },
    },
    equip_t2_heavy: {
      id: 'equip_t2_heavy',
      name: '鋼の鎧',
      slot: 'armor',
      tier: 2,
      buyPrice: 600,
      armorType: 'heavy',
      bonuses: { def: 16, mdf: 6 },
    },
    equip_t2_light: {
      id: 'equip_t2_light',
      name: '鎖かたびら',
      slot: 'armor',
      tier: 2,
      buyPrice: 560,
      armorType: 'light',
      bonuses: { def: 11, mdf: 9 },
    },
    equip_t2_clothes: {
      id: 'equip_t2_clothes',
      name: '魔導のローブ',
      slot: 'armor',
      tier: 2,
      buyPrice: 560,
      armorType: 'clothes',
      bonuses: { def: 6, mdf: 15 },
    },
    equip_t2_accessory: {
      id: 'equip_t2_accessory',
      name: '守りの護符',
      slot: 'accessory',
      tier: 2,
      buyPrice: 480,
      bonuses: { def: 4, mdf: 4 },
    },
    equip_t3_sword: {
      id: 'equip_t3_sword',
      name: '銀の剣',
      slot: 'weapon',
      tier: 3,
      buyPrice: 1400,
      weaponType: 'sword',
      bonuses: { atk: 30 },
    },
    equip_t3_spear: {
      id: 'equip_t3_spear',
      name: '銀の槍',
      slot: 'weapon',
      tier: 3,
      buyPrice: 1480,
      weaponType: 'spear',
      bonuses: { atk: 31 },
    },
    equip_t3_axe: {
      id: 'equip_t3_axe',
      name: '銀の大斧',
      slot: 'weapon',
      tier: 3,
      buyPrice: 1560,
      weaponType: 'axe',
      bonuses: { atk: 33 },
    },
    equip_t3_bow: {
      id: 'equip_t3_bow',
      name: '精霊の弓',
      slot: 'weapon',
      tier: 3,
      buyPrice: 1320,
      weaponType: 'bow',
      bonuses: { atk: 27 },
    },
    equip_t3_fist: {
      id: 'equip_t3_fist',
      name: '銀の籠手',
      slot: 'weapon',
      tier: 3,
      buyPrice: 1280,
      weaponType: 'fist',
      bonuses: { atk: 26 },
    },
    equip_t3_staff: {
      id: 'equip_t3_staff',
      name: '賢者の杖',
      slot: 'weapon',
      tier: 3,
      buyPrice: 1480,
      weaponType: 'staff',
      bonuses: { mat: 31 },
    },
    equip_t3_heavy: {
      id: 'equip_t3_heavy',
      name: '銀の鎧',
      slot: 'armor',
      tier: 3,
      buyPrice: 1360,
      armorType: 'heavy',
      bonuses: { def: 24, mdf: 10 },
    },
    equip_t3_light: {
      id: 'equip_t3_light',
      name: '精霊布の服',
      slot: 'armor',
      tier: 3,
      buyPrice: 1280,
      armorType: 'light',
      bonuses: { def: 17, mdf: 13 },
    },
    equip_t3_clothes: {
      id: 'equip_t3_clothes',
      name: '大魔導のローブ',
      slot: 'armor',
      tier: 3,
      buyPrice: 1280,
      armorType: 'clothes',
      bonuses: { def: 9, mdf: 22 },
    },
    equip_t3_accessory: {
      id: 'equip_t3_accessory',
      name: '精霊の指輪',
      slot: 'accessory',
      tier: 3,
      buyPrice: 1100,
      bonuses: { def: 6, mdf: 6 },
    },
    equip_t4_sword: {
      id: 'equip_t4_sword',
      name: 'ミスリルソード',
      slot: 'weapon',
      tier: 4,
      buyPrice: 3e3,
      weaponType: 'sword',
      bonuses: { atk: 42 },
    },
    equip_t4_spear: {
      id: 'equip_t4_spear',
      name: 'ミスリルランス',
      slot: 'weapon',
      tier: 4,
      buyPrice: 3150,
      weaponType: 'spear',
      bonuses: { atk: 43 },
    },
    equip_t4_axe: {
      id: 'equip_t4_axe',
      name: 'ミスリルアックス',
      slot: 'weapon',
      tier: 4,
      buyPrice: 3300,
      weaponType: 'axe',
      bonuses: { atk: 45 },
    },
    equip_t4_bow: {
      id: 'equip_t4_bow',
      name: '月光の弓',
      slot: 'weapon',
      tier: 4,
      buyPrice: 2850,
      weaponType: 'bow',
      bonuses: { atk: 39 },
    },
    equip_t4_fist: {
      id: 'equip_t4_fist',
      name: 'ミスリルの籠手',
      slot: 'weapon',
      tier: 4,
      buyPrice: 2750,
      weaponType: 'fist',
      bonuses: { atk: 38 },
    },
    equip_t4_staff: {
      id: 'equip_t4_staff',
      name: '星見の杖',
      slot: 'weapon',
      tier: 4,
      buyPrice: 3150,
      weaponType: 'staff',
      bonuses: { mat: 43 },
    },
    equip_t4_heavy: {
      id: 'equip_t4_heavy',
      name: 'ミスリルメイル',
      slot: 'armor',
      tier: 4,
      buyPrice: 2900,
      armorType: 'heavy',
      bonuses: { def: 34, mdf: 14 },
    },
    equip_t4_light: {
      id: 'equip_t4_light',
      name: '月光の装束',
      slot: 'armor',
      tier: 4,
      buyPrice: 2750,
      armorType: 'light',
      bonuses: { def: 24, mdf: 19 },
    },
    equip_t4_clothes: {
      id: 'equip_t4_clothes',
      name: '賢者のローブ',
      slot: 'armor',
      tier: 4,
      buyPrice: 2750,
      armorType: 'clothes',
      bonuses: { def: 13, mdf: 31 },
    },
    equip_t4_accessory: {
      id: 'equip_t4_accessory',
      name: '星詠みの護符',
      slot: 'accessory',
      tier: 4,
      buyPrice: 2400,
      bonuses: { def: 9, mdf: 9 },
    },
    equip_t5_sword: {
      id: 'equip_t5_sword',
      name: '竜鱗の剣',
      slot: 'weapon',
      tier: 5,
      buyPrice: 6e3,
      weaponType: 'sword',
      bonuses: { atk: 56 },
    },
    equip_t5_spear: {
      id: 'equip_t5_spear',
      name: '竜牙の槍',
      slot: 'weapon',
      tier: 5,
      buyPrice: 6300,
      weaponType: 'spear',
      bonuses: { atk: 57 },
    },
    equip_t5_axe: {
      id: 'equip_t5_axe',
      name: '竜骨の大斧',
      slot: 'weapon',
      tier: 5,
      buyPrice: 6600,
      weaponType: 'axe',
      bonuses: { atk: 59 },
    },
    equip_t5_bow: {
      id: 'equip_t5_bow',
      name: '竜骨の弓',
      slot: 'weapon',
      tier: 5,
      buyPrice: 5700,
      weaponType: 'bow',
      bonuses: { atk: 53 },
    },
    equip_t5_fist: {
      id: 'equip_t5_fist',
      name: '竜鱗の籠手',
      slot: 'weapon',
      tier: 5,
      buyPrice: 5500,
      weaponType: 'fist',
      bonuses: { atk: 52 },
    },
    equip_t5_staff: {
      id: 'equip_t5_staff',
      name: '竜詠みの杖',
      slot: 'weapon',
      tier: 5,
      buyPrice: 6300,
      weaponType: 'staff',
      bonuses: { mat: 57 },
    },
    equip_t5_heavy: {
      id: 'equip_t5_heavy',
      name: '竜鱗の鎧',
      slot: 'armor',
      tier: 5,
      buyPrice: 5800,
      armorType: 'heavy',
      bonuses: { def: 46, mdf: 18 },
    },
    equip_t5_light: {
      id: 'equip_t5_light',
      name: '竜革の装束',
      slot: 'armor',
      tier: 5,
      buyPrice: 5500,
      armorType: 'light',
      bonuses: { def: 32, mdf: 25 },
    },
    equip_t5_clothes: {
      id: 'equip_t5_clothes',
      name: '竜詠みのローブ',
      slot: 'armor',
      tier: 5,
      buyPrice: 5500,
      armorType: 'clothes',
      bonuses: { def: 18, mdf: 42 },
    },
    equip_t5_accessory: {
      id: 'equip_t5_accessory',
      name: '竜の紋章',
      slot: 'accessory',
      tier: 5,
      buyPrice: 4800,
      bonuses: { def: 12, mdf: 12 },
    },
  },
  Xn = {
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
    summon_falcon: {
      id: 'summon_falcon',
      name: '召喚獣・鷹',
      baseStats: { hp: 38, tp: 0, str: 11, vit: 5, agi: 18, int: 5, mnd: 4, luc: 8 },
      refDepth: 1,
      attackElement: 'pierce',
      actsOnTurn: !0,
      buffImmune: !1,
      persistsAfterBattle: !1,
      persistsOutOfDungeon: !1,
    },
    summon_wraith: {
      id: 'summon_wraith',
      name: '死霊',
      baseStats: { hp: 40, tp: 0, str: 13, vit: 5, agi: 13, int: 8, mnd: 5, luc: 6 },
      refDepth: 1,
      attackElement: 'pierce',
      actsOnTurn: !0,
      buffImmune: !1,
      persistsAfterBattle: !1,
      persistsOutOfDungeon: !1,
    },
    summon_revenant: {
      id: 'summon_revenant',
      name: '亡者の壁',
      baseStats: { hp: 120, tp: 0, str: 4, vit: 17, agi: 3, int: 2, mnd: 11, luc: 2 },
      refDepth: 1,
      attackElement: 'bash',
      actsOnTurn: !1,
      buffImmune: !0,
      persistsAfterBattle: !1,
      persistsOutOfDungeon: !1,
    },
  },
  Fb = ['hp', 'tp', 'str', 'vit', 'agi', 'int', 'mnd', 'luc'],
  Wb = ['slash', 'pierce', 'bash'],
  Mr = (l, i, o) => Math.max(i, Math.min(o, l));
function kh(l, i) {
  const o = {};
  for (const r of Fb) o[r] = Math.round(l[r] * i);
  return o;
}
function e1(l, i) {
  return kh(l.baseStats, ed(i, l.refDepth));
}
function Mn(l, i) {
  const o = new Map();
  for (const c of l) {
    if (c.stat !== i) continue;
    const d = Mr(c.modifier, 0.5, 1.5),
      f = o.get(c.stackGroup);
    (f === void 0 || Math.abs(d - 1) > Math.abs(f - 1)) && o.set(c.stackGroup, d);
  }
  let r = 1;
  for (const c of o.values()) r *= c;
  return Mr(r, 0.25, 2);
}
function Np(l, i, o, r) {
  const c = (p) => (r == null ? void 0 : r[p]) ?? 1,
    d = (l.str * 2 + (i.atk ?? 0)) * Mn(o, 'patk') * c('patk'),
    f = (l.vit * 2 + (i.def ?? 0)) * Mn(o, 'pdef') * c('pdef'),
    h = (l.int * 2 + (i.mat ?? 0)) * Mn(o, 'matk') * c('matk'),
    k = (l.mnd * 2 + (i.mdf ?? 0)) * Mn(o, 'mdef') * c('mdef');
  return {
    patk: d,
    pdef: f,
    matk: h,
    mdef: k,
    hit: l.agi,
    acc: l.agi * Mn(o, 'acc') * c('acc'),
    eva: l.agi * Mn(o, 'eva') * c('eva'),
    crit: l.luc,
  };
}
const t1 = (l) => l.ailments.some((i) => i.type === 'blind'),
  l1 = (l) => l.ailments.some((i) => i.type === 'legBind');
function a1(l, i, o, r) {
  var U;
  const c = o.statBase === 'str',
    d = Np(l.stats, l.equip, l.buffs, l.passive),
    f = Np(i.stats, i.equip, i.buffs, i.passive),
    h = c ? d.patk : d.matk,
    k = c ? f.pdef : f.mdef;
  let p = !0;
  if (c) {
    const ae = t1(l) ? He.BLIND_ACC_PENALTY : 0,
      ie = l1(i) ? 0 : f.eva,
      le = Mr(He.BASE_HIT + (d.acc - ie) * He.HIT_AGI_K - ae, He.HIT_MIN, 1);
    p = r.next() < le;
  }
  if (!p) return { damage: 0, hit: !1, critical: !1 };
  const y = (h * o.power * He.DAMAGE_DEF_K) / (He.DAMAGE_DEF_K + Math.max(0, k)),
    E = c && Wb.includes(o.element),
    M = E && l.row === 'back' ? He.BACK_ROW_MELEE_MULT : 1,
    O = E && i.row === 'back' ? He.BACK_ROW_MELEE_MULT : 1,
    x = M * O,
    [S, b] = He.DMG_VARIANCE,
    C = S + r.next() * (b - S);
  let A = y * o.elementMultiplier * x * C;
  const F = Mr(
      He.CRIT_BASE +
        (l.stats.luc - i.stats.luc) * He.CRIT_LUC_K +
        (((U = l.passive) == null ? void 0 : U.crit) ?? 0),
      He.CRIT_MIN,
      He.CRIT_MAX
    ),
    P = r.next() < F;
  return (
    P && (A *= He.CRIT_MULT),
    { damage: o.elementMultiplier === 0 ? 0 : Math.max(1, Math.floor(A)), hit: !0, critical: P }
  );
}
const vh = () => Math.max(0, ...Object.values(ul).map((l) => l.tierBand)),
  yh = (l) => Math.floor((l - 1) / He.BAND_SIZE);
function bh(l) {
  return yh(l) % (vh() + 1);
}
function xh(l) {
  return Math.floor(yh(l) / (vh() + 1)) + 1;
}
function n1(l) {
  const i = bh(l);
  return Object.values(ul)
    .filter((o) => o.tierBand === i && !o.isBoss && o.kind !== 'foe')
    .map((o) => o.id);
}
function i1(l, i) {
  const o = n1(l);
  if (o.length === 0) return [];
  const r = i.range(1, 3);
  return Array.from({ length: r }, () => i.pick(o));
}
function s1(l, i) {
  const o = ot[l];
  if (!o || i <= 0) return {};
  const r = i * kl.STAT_PER_LEVEL;
  return o.slot === 'weapon' ? { atk: r, mat: r } : o.slot === 'armor' ? { def: r, mdf: r } : {};
}
function Hn(l) {
  return 1 + 0.5 * (Math.max(1, l ?? 1) - 1);
}
function Sh(l, i) {
  const o = ot[l];
  if (!o) return {};
  const r = Hn(i),
    c = {};
  return (
    o.bonuses.atk && (c.atk = Math.round(o.bonuses.atk * r)),
    o.bonuses.mat && (c.mat = Math.round(o.bonuses.mat * r)),
    o.bonuses.def && (c.def = Math.round(o.bonuses.def * r)),
    o.bonuses.mdf && (c.mdf = Math.round(o.bonuses.mdf * r)),
    o.bonuses.statMods && (c.statMods = o.bonuses.statMods),
    c
  );
}
const wh = ['weapon', 'armor', 'accessory'];
function r1(l, i, o) {
  const r = l.guild.equipment.map((d) => (d.id === i ? o(d) : d)),
    c = l.guild.members.map((d) => {
      let f = !1;
      const h = { ...d.equipment };
      for (const k of wh) {
        const p = h[k];
        p && p.id === i && ((h[k] = o(p)), (f = !0));
      }
      return f ? { ...d, equipment: h } : d;
    });
  return { ...l, guild: { ...l.guild, equipment: r, members: c } };
}
function o1(l, i, o) {
  let r = l.guild.equipment.find((f) => f.id === i);
  if (!r)
    for (const f of l.guild.members)
      for (const h of wh) {
        const k = f.equipment[h];
        (k == null ? void 0 : k.id) === i && (r = k);
      }
  if (!r) return { ok: !1, save: l, reason: 'notFound' };
  if (r.forgeLevel >= kl.MAX_LEVEL) return { ok: !1, save: l, reason: 'maxLevel' };
  if ((l.forgeInventory.ingots[o] ?? 0) <= 0) return { ok: !1, save: l, reason: 'noIngot' };
  const c = Math.min(kl.MAX_LEVEL, r.forgeLevel + kl.INGOT_INC[o]);
  let d = {
    ...l,
    forgeInventory: {
      ...l.forgeInventory,
      ingots: { ...l.forgeInventory.ingots, [o]: l.forgeInventory.ingots[o] - 1 },
    },
  };
  return ((d = r1(d, i, (f) => ({ ...f, forgeLevel: c }))), { ok: !0, save: d });
}
function u1(l, i) {
  if (!l.guild.equipment.find((f) => f.id === i)) return { ok: !1, save: l, reason: 'notFound' };
  const r = l.guild.equipment.filter((f) => f.id !== i),
    c = { ...l.forgeInventory.fragments };
  c.common = (c.common ?? 0) + kl.RECYCLE_FRAGMENTS;
  let d = l.forgeInventory.ingots.copper;
  for (; c.common >= kl.FRAGMENTS_PER_INGOT; ) ((c.common -= kl.FRAGMENTS_PER_INGOT), (d += 1));
  return {
    ok: !0,
    save: {
      ...l,
      guild: { ...l.guild, equipment: r },
      forgeInventory: {
        ...l.forgeInventory,
        fragments: c,
        ingots: { ...l.forgeInventory.ingots, copper: d },
      },
    },
  };
}
function Or(l) {
  var r;
  const i = ((r = ot[l.masterId]) == null ? void 0 : r.name) ?? l.masterId,
    o = l.grade && l.grade > 1 ? `${i} Lv${l.grade}` : i;
  return l.forgeLevel > 0 ? `${o} +${l.forgeLevel}` : o;
}
const Th = (l) => l.grade ?? 1;
function Eh(l, i, o) {
  return l.guild.storage
    .filter((r) => r.itemId === i && o === void 0)
    .reduce((r, c) => r + c.qty, 0);
}
function td(l, i, o = 1, r = 1) {
  if (o <= 0) return l;
  const c = [...l.guild.storage],
    d = c.findIndex((f) => f.itemId === i && Th(f) === r);
  return (
    d >= 0
      ? (c[d] = { ...c[d], qty: c[d].qty + o })
      : c.push(r > 1 ? { itemId: i, qty: o, grade: r } : { itemId: i, qty: o }),
    { ...l, guild: { ...l.guild, storage: c } }
  );
}
function ld(l, i, o = 1, r = 1) {
  if (o <= 0) return l;
  const c = l.guild.storage.findIndex((h) => h.itemId === i && Th(h) === r);
  if (c < 0 || l.guild.storage[c].qty < o) return l;
  const d = [...l.guild.storage],
    f = d[c].qty - o;
  return (
    f <= 0 ? d.splice(c, 1) : (d[c] = { ...d[c], qty: f }),
    { ...l, guild: { ...l.guild, storage: d } }
  );
}
const Ch = 60,
  Vr = (l) => l.guild.foodStorage ?? [];
function Nh(l) {
  return Vr(l).reduce((i, o) => i + o.qty, 0);
}
function ad(l, i) {
  var o;
  return ((o = Vr(l).find((r) => r.itemId === i)) == null ? void 0 : o.qty) ?? 0;
}
function jh(l, i, o = 1) {
  if (o <= 0) return l;
  const r = Ch - Nh(l),
    c = Math.min(o, Math.max(0, r));
  if (c <= 0) return l;
  const d = [...Vr(l)],
    f = d.findIndex((h) => h.itemId === i);
  return (
    f >= 0 ? (d[f] = { ...d[f], qty: d[f].qty + c }) : d.push({ itemId: i, qty: c }),
    { ...l, guild: { ...l.guild, foodStorage: d } }
  );
}
function Ah(l, i, o = 1) {
  if (o <= 0) return l;
  const r = [...Vr(l)],
    c = r.findIndex((f) => f.itemId === i);
  if (c < 0 || r[c].qty < o) return l;
  const d = r[c].qty - o;
  return (
    d <= 0 ? r.splice(c, 1) : (r[c] = { ...r[c], qty: d }),
    { ...l, guild: { ...l.guild, foodStorage: r } }
  );
}
function Lh(l, i, o) {
  return {
    ...l,
    guild: { ...l.guild, members: l.guild.members.map((r) => (r.id === i ? o(r) : r)) },
  };
}
function c1() {
  return `eq_${Date.now().toString(36)}_${Math.floor(Math.random() * 16777215).toString(36)}`;
}
function d1(l, i, o = 0, r = 1) {
  if (!ot[i]) return l;
  const c = { id: c1(), masterId: i, forgeLevel: o };
  return (
    r > 1 && (c.grade = r),
    { ...l, guild: { ...l.guild, equipment: [...l.guild.equipment, c] } }
  );
}
function nd(l, i) {
  const o = ot[i];
  if (!o) return !1;
  const r = et[l.classId];
  return r
    ? o.slot === 'weapon'
      ? !!o.weaponType && r.equipableWeaponTypes.includes(o.weaponType)
      : o.slot === 'armor'
        ? !!o.armorType && r.equipableArmorTypes.includes(o.armorType)
        : !0
    : !1;
}
function m1(l, i, o) {
  const r = l.guild.equipment.find((p) => p.id === o),
    c = l.guild.members.find((p) => p.id === i);
  if (!r || !c || !nd(c, r.masterId)) return l;
  const d = ot[r.masterId];
  let f = l.guild.equipment.filter((p) => p.id !== o);
  const h = c.equipment[d.slot];
  h && (f = [...f, h]);
  const k = { ...l, guild: { ...l.guild, equipment: f } };
  return Lh(k, i, (p) => ({ ...p, equipment: { ...p.equipment, [d.slot]: r } }));
}
function id(l, i, o) {
  const r = l.guild.members.find((f) => f.id === i);
  if (!r) return l;
  const c = r.equipment[o];
  if (!c) return l;
  const d = { ...l, guild: { ...l.guild, equipment: [...l.guild.equipment, c] } };
  return Lh(d, i, (f) => ({ ...f, equipment: { ...f.equipment, [o]: null } }));
}
const Mc = {
    passive_race_human_adapt: {
      id: 'passive_race_human_adapt',
      name: '適応力',
      tree: 'race',
      mods: (l) => ({ maxHp: 1 + 0.02 * l, acc: 1 + 0.02 * l }),
    },
    passive_race_garon_might: {
      id: 'passive_race_garon_might',
      name: '剛力',
      tree: 'race',
      mods: (l) => ({ patk: 1 + 0.03 * l, maxHp: 1 + 0.02 * l }),
    },
    passive_race_pix_focus: {
      id: 'passive_race_pix_focus',
      name: '魔力集中',
      tree: 'race',
      mods: (l) => ({ matk: 1 + 0.03 * l, maxTp: 1 + 0.03 * l }),
    },
    passive_race_therian_swift: {
      id: 'passive_race_therian_swift',
      name: '俊足',
      tree: 'race',
      mods: (l) => ({ acc: 1 + 0.03 * l, eva: 1 + 0.03 * l }),
    },
    passive_race_lunar_grace: {
      id: 'passive_race_lunar_grace',
      name: '月の加護',
      tree: 'race',
      mods: (l) => ({ mdef: 1 + 0.03 * l, maxTp: 1 + 0.02 * l }),
    },
    passive_race_golan_fortitude: {
      id: 'passive_race_golan_fortitude',
      name: '頑健',
      tree: 'race',
      mods: (l) => ({ pdef: 1 + 0.03 * l, maxHp: 1 + 0.03 * l }),
    },
    passive_warrior_blade_mastery: {
      id: 'passive_warrior_blade_mastery',
      name: '剣の心得',
      tree: 'base',
      weaponType: 'sword',
      mods: (l) => ({ patk: 1 + 0.04 * l }),
    },
    passive_warrior_phys_boost: {
      id: 'passive_warrior_phys_boost',
      name: '剛腕',
      tree: 'base',
      mods: (l) => ({ patk: 1 + 0.03 * l }),
    },
    passive_guardian_shield_mastery: {
      id: 'passive_guardian_shield_mastery',
      name: '盾の心得',
      tree: 'base',
      mods: (l) => ({ pdef: 1 + 0.04 * l }),
    },
    passive_guardian_hp_boost: {
      id: 'passive_guardian_hp_boost',
      name: '頑強',
      tree: 'base',
      mods: (l) => ({ maxHp: 1 + 0.04 * l }),
    },
    passive_mage_staff_mastery: {
      id: 'passive_mage_staff_mastery',
      name: '杖の心得',
      tree: 'base',
      weaponType: 'staff',
      mods: (l) => ({ matk: 1 + 0.04 * l }),
    },
    passive_mage_tp_boost: {
      id: 'passive_mage_tp_boost',
      name: '精神統一',
      tree: 'base',
      mods: (l) => ({ maxTp: 1 + 0.04 * l }),
    },
    passive_ranger_bow_mastery: {
      id: 'passive_ranger_bow_mastery',
      name: '弓の心得',
      tree: 'base',
      weaponType: 'bow',
      mods: (l) => ({ patk: 1 + 0.04 * l }),
    },
    passive_ranger_agi_boost: {
      id: 'passive_ranger_agi_boost',
      name: '機敏',
      tree: 'base',
      mods: (l) => ({ acc: 1 + 0.03 * l, eva: 1 + 0.02 * l }),
    },
    passive_medic_tp_boost: {
      id: 'passive_medic_tp_boost',
      name: '薬学の知識',
      tree: 'base',
      mods: (l) => ({ maxTp: 1 + 0.04 * l }),
    },
    passive_medic_mdef_boost: {
      id: 'passive_medic_mdef_boost',
      name: '抗体',
      tree: 'base',
      mods: (l) => ({ mdef: 1 + 0.03 * l }),
    },
    passive_dancer_agi_boost: {
      id: 'passive_dancer_agi_boost',
      name: '舞踏の足捌き',
      tree: 'base',
      mods: (l) => ({ eva: 1 + 0.03 * l, acc: 1 + 0.02 * l }),
    },
    passive_dancer_tp_boost: {
      id: 'passive_dancer_tp_boost',
      name: '高揚',
      tree: 'base',
      mods: (l) => ({ maxTp: 1 + 0.03 * l }),
    },
    passive_monk_fist_mastery: {
      id: 'passive_monk_fist_mastery',
      name: '拳の心得',
      tree: 'base',
      weaponType: 'fist',
      mods: (l) => ({ patk: 1 + 0.04 * l }),
    },
    passive_monk_crit_boost: {
      id: 'passive_monk_crit_boost',
      name: '練達',
      tree: 'base',
      mods: (l) => ({ crit: 0.015 * l }),
    },
    passive_hexer_matk_boost: {
      id: 'passive_hexer_matk_boost',
      name: '呪詛',
      tree: 'base',
      mods: (l) => ({ matk: 1 + 0.03 * l }),
    },
    passive_hexer_mdef_boost: {
      id: 'passive_hexer_mdef_boost',
      name: '瘴気の衣',
      tree: 'base',
      mods: (l) => ({ mdef: 1 + 0.03 * l }),
    },
    passive_summoner_staff_mastery: {
      id: 'passive_summoner_staff_mastery',
      name: '霊媒の心得',
      tree: 'base',
      weaponType: 'staff',
      mods: (l) => ({ matk: 1 + 0.04 * l }),
    },
    passive_summoner_tp_boost: {
      id: 'passive_summoner_tp_boost',
      name: '死霊術の知識',
      tree: 'base',
      mods: (l) => ({ maxTp: 1 + 0.04 * l }),
    },
    passive_title_berserker: {
      id: 'passive_title_berserker',
      name: '狂気の力',
      tree: 'title',
      mods: (l) => ({ patk: 1 + 0.03 * l, crit: 0.01 * l }),
    },
    passive_title_sentinel: {
      id: 'passive_title_sentinel',
      name: '警戒',
      tree: 'title',
      mods: (l) => ({ pdef: 1 + 0.03 * l, acc: 1 + 0.02 * l }),
    },
    passive_title_bulwark: {
      id: 'passive_title_bulwark',
      name: '鉄壁',
      tree: 'title',
      mods: (l) => ({ pdef: 1 + 0.03 * l, maxHp: 1 + 0.03 * l }),
    },
    passive_title_vanguard: {
      id: 'passive_title_vanguard',
      name: '突撃',
      tree: 'title',
      mods: (l) => ({ patk: 1 + 0.04 * l }),
    },
    passive_title_pyromancer: {
      id: 'passive_title_pyromancer',
      name: '業火',
      tree: 'title',
      mods: (l) => ({ matk: 1 + 0.04 * l }),
    },
    passive_title_sage: {
      id: 'passive_title_sage',
      name: '英知',
      tree: 'title',
      mods: (l) => ({ maxTp: 1 + 0.04 * l, mdef: 1 + 0.02 * l }),
    },
    passive_title_sniper: {
      id: 'passive_title_sniper',
      name: '精密射撃',
      tree: 'title',
      mods: (l) => ({ crit: 0.015 * l, acc: 1 + 0.02 * l }),
    },
    passive_title_tracker: {
      id: 'passive_title_tracker',
      name: '隠密',
      tree: 'title',
      mods: (l) => ({ eva: 1 + 0.04 * l }),
    },
    passive_title_saint: {
      id: 'passive_title_saint',
      name: '慈愛',
      tree: 'title',
      mods: (l) => ({ maxTp: 1 + 0.03 * l, mdef: 1 + 0.03 * l }),
    },
    passive_title_blade_dancer: {
      id: 'passive_title_blade_dancer',
      name: '剣の舞',
      tree: 'title',
      mods: (l) => ({ patk: 1 + 0.03 * l, eva: 1 + 0.02 * l }),
    },
    passive_title_muse: {
      id: 'passive_title_muse',
      name: '詩心',
      tree: 'title',
      mods: (l) => ({ maxTp: 1 + 0.04 * l }),
    },
    passive_title_zen: {
      id: 'passive_title_zen',
      name: '不動',
      tree: 'title',
      mods: (l) => ({ pdef: 1 + 0.03 * l, maxHp: 1 + 0.03 * l }),
    },
    passive_title_plague: {
      id: 'passive_title_plague',
      name: '疫病',
      tree: 'title',
      mods: (l) => ({ matk: 1 + 0.04 * l }),
    },
    passive_title_warlock: {
      id: 'passive_title_warlock',
      name: '魔道の極み',
      tree: 'title',
      mods: (l) => ({ matk: 1 + 0.03 * l, crit: 0.01 * l }),
    },
    passive_title_necromancer: {
      id: 'passive_title_necromancer',
      name: '降霊',
      tree: 'title',
      mods: (l) => ({ matk: 1 + 0.03 * l, maxTp: 1 + 0.03 * l }),
    },
    passive_title_puppeteer: {
      id: 'passive_title_puppeteer',
      name: '傀儡操糸',
      tree: 'title',
      mods: (l) => ({ maxHp: 1 + 0.03 * l, maxTp: 1 + 0.02 * l }),
    },
    passive_warrior_axe_mastery: {
      id: 'passive_warrior_axe_mastery',
      name: '斧の心得',
      tree: 'base',
      weaponType: 'axe',
      mods: (l) => ({ patk: 1 + 0.04 * l }),
    },
    passive_warrior_crit_focus: {
      id: 'passive_warrior_crit_focus',
      name: '会心',
      tree: 'base',
      mods: (l) => ({ crit: 0.015 * l }),
    },
    passive_warrior_vitality: {
      id: 'passive_warrior_vitality',
      name: '頑健な肉体',
      tree: 'base',
      mods: (l) => ({ maxHp: 1 + 0.04 * l }),
    },
    passive_warrior_t_bloodlust: {
      id: 'passive_warrior_t_bloodlust',
      name: '血の渇き',
      tree: 'title',
      mods: (l) => ({ patk: 1 + 0.03 * l, crit: 0.015 * l }),
    },
    passive_warrior_t_guardian_eye: {
      id: 'passive_warrior_t_guardian_eye',
      name: '監視眼',
      tree: 'title',
      mods: (l) => ({ pdef: 1 + 0.03 * l, acc: 1 + 0.03 * l }),
    },
    passive_guardian_spear_mastery: {
      id: 'passive_guardian_spear_mastery',
      name: '槍の心得',
      tree: 'base',
      weaponType: 'spear',
      mods: (l) => ({ patk: 1 + 0.04 * l }),
    },
    passive_guardian_mdef_boost: {
      id: 'passive_guardian_mdef_boost',
      name: '魔法耐性',
      tree: 'base',
      mods: (l) => ({ mdef: 1 + 0.03 * l }),
    },
    passive_guardian_iron_will: {
      id: 'passive_guardian_iron_will',
      name: '鋼の意志',
      tree: 'base',
      mods: (l) => ({ pdef: 1 + 0.03 * l, maxHp: 1 + 0.04 * l }),
    },
    passive_guardian_t_fortress: {
      id: 'passive_guardian_t_fortress',
      name: '要塞',
      tree: 'title',
      mods: (l) => ({ pdef: 1 + 0.04 * l, maxHp: 1 + 0.04 * l }),
    },
    passive_guardian_t_spearhead: {
      id: 'passive_guardian_t_spearhead',
      name: '尖兵',
      tree: 'title',
      mods: (l) => ({ patk: 1 + 0.04 * l }),
    },
    passive_mage_matk_boost: {
      id: 'passive_mage_matk_boost',
      name: '魔力増幅',
      tree: 'base',
      mods: (l) => ({ matk: 1 + 0.03 * l }),
    },
    passive_mage_spell_focus: {
      id: 'passive_mage_spell_focus',
      name: '魔法熟練',
      tree: 'base',
      mods: (l) => ({ matk: 1 + 0.03 * l, crit: 0.015 * l }),
    },
    passive_mage_t_inferno: {
      id: 'passive_mage_t_inferno',
      name: '業炎',
      tree: 'title',
      mods: (l) => ({ matk: 1 + 0.04 * l }),
    },
    passive_mage_t_arcane_lore: {
      id: 'passive_mage_t_arcane_lore',
      name: '深淵の知識',
      tree: 'title',
      mods: (l) => ({ maxTp: 1 + 0.04 * l, mdef: 1 + 0.03 * l }),
    },
    passive_ranger_eagle_eye: {
      id: 'passive_ranger_eagle_eye',
      name: '鷹の目',
      tree: 'base',
      mods: (l) => ({ acc: 1 + 0.03 * l, crit: 0.015 * l }),
    },
    passive_ranger_t_keen_sight: {
      id: 'passive_ranger_t_keen_sight',
      name: '眼力',
      tree: 'title',
      mods: (l) => ({ acc: 1 + 0.03 * l }),
    },
    passive_ranger_t_shadowstep: {
      id: 'passive_ranger_t_shadowstep',
      name: '影縫い',
      tree: 'title',
      mods: (l) => ({ eva: 1 + 0.03 * l }),
    },
    passive_medic_mind_boost: {
      id: 'passive_medic_mind_boost',
      name: '治療の心得',
      tree: 'base',
      mods: (l) => ({ matk: 1 + 0.03 * l }),
    },
    passive_medic_t_blessing: {
      id: 'passive_medic_t_blessing',
      name: '祝福',
      tree: 'title',
      mods: (l) => ({ maxTp: 1 + 0.04 * l, mdef: 1 + 0.02 * l }),
    },
    passive_medic_t_alchemy: {
      id: 'passive_medic_t_alchemy',
      name: '錬薬',
      tree: 'title',
      mods: (l) => ({ maxTp: 1 + 0.04 * l }),
    },
    passive_dancer_grace: {
      id: 'passive_dancer_grace',
      name: '優美',
      tree: 'base',
      mods: (l) => ({ eva: 1 + 0.03 * l, acc: 1 + 0.02 * l }),
    },
    passive_dancer_t_grace: {
      id: 'passive_dancer_t_grace',
      name: '舞の極み',
      tree: 'title',
      mods: (l) => ({ patk: 1 + 0.03 * l, eva: 1 + 0.02 * l }),
    },
    passive_dancer_t_melody: {
      id: 'passive_dancer_t_melody',
      name: '調べ',
      tree: 'title',
      mods: (l) => ({ maxTp: 1 + 0.04 * l, mdef: 1 + 0.02 * l }),
    },
    passive_monk_hp_boost: {
      id: 'passive_monk_hp_boost',
      name: '鍛錬',
      tree: 'base',
      mods: (l) => ({ maxHp: 1 + 0.04 * l }),
    },
    passive_monk_eva_boost: {
      id: 'passive_monk_eva_boost',
      name: '見切り',
      tree: 'base',
      mods: (l) => ({ eva: 1 + 0.03 * l }),
    },
    passive_grappler_t_counter_mastery: {
      id: 'passive_grappler_t_counter_mastery',
      name: '体捌き',
      tree: 'title',
      mods: (l) => ({ eva: 1 + 0.03 * l, crit: 0.015 * l }),
    },
    passive_hexer_acc_boost: {
      id: 'passive_hexer_acc_boost',
      name: '呪言',
      tree: 'base',
      mods: (l) => ({ acc: 1 + 0.03 * l }),
    },
    passive_warlock_t_matk_mastery: {
      id: 'passive_warlock_t_matk_mastery',
      name: '禁術の知識',
      tree: 'title',
      mods: (l) => ({ matk: 1 + 0.04 * l }),
    },
    passive_summoner_mdef_boost: {
      id: 'passive_summoner_mdef_boost',
      name: '霊体防護',
      tree: 'base',
      mods: (l) => ({ mdef: 1 + 0.03 * l }),
    },
    passive_puppeteer_t_vitality: {
      id: 'passive_puppeteer_t_vitality',
      name: '操糸の妙',
      tree: 'title',
      mods: (l) => ({ maxHp: 1 + 0.04 * l, maxTp: 1 + 0.04 * l }),
    },
    passive_warrior_dual_edge: {
      id: 'passive_warrior_dual_edge',
      name: '双刃の理',
      tree: 'base',
      mods: (l) => ({ patk: 1 + 0.04 * l, crit: 0.015 * l }),
    },
    passive_mage_overload: {
      id: 'passive_mage_overload',
      name: '魔導過負荷',
      tree: 'base',
      mods: (l) => ({ matk: 1 + 0.04 * l }),
    },
    passive_ranger_keen_eye: {
      id: 'passive_ranger_keen_eye',
      name: '精密眼',
      tree: 'base',
      mods: (l) => ({ acc: 1 + 0.03 * l, crit: 0.015 * l }),
    },
    passive_ranger_swift_hands: {
      id: 'passive_ranger_swift_hands',
      name: '速射の手',
      tree: 'base',
      mods: (l) => ({ patk: 1 + 0.03 * l }),
    },
    passive_ranger_predator: {
      id: 'passive_ranger_predator',
      name: '狩猟本能',
      tree: 'base',
      mods: (l) => ({ patk: 1 + 0.04 * l, crit: 0.015 * l }),
    },
    passive_medic_healing_hands: {
      id: 'passive_medic_healing_hands',
      name: '癒しの手',
      tree: 'base',
      mods: (l) => ({ matk: 1 + 0.03 * l }),
    },
    passive_medic_staff_mastery: {
      id: 'passive_medic_staff_mastery',
      name: '杖の心得',
      tree: 'base',
      weaponType: 'staff',
      mods: (l) => ({ matk: 1 + 0.04 * l }),
    },
    passive_medic_vitality: {
      id: 'passive_medic_vitality',
      name: '健勝',
      tree: 'base',
      mods: (l) => ({ maxHp: 1 + 0.04 * l }),
    },
    passive_dancer_blade_mastery: {
      id: 'passive_dancer_blade_mastery',
      name: '剣の心得',
      tree: 'base',
      weaponType: 'sword',
      mods: (l) => ({ patk: 1 + 0.04 * l }),
    },
    passive_dancer_vigor: {
      id: 'passive_dancer_vigor',
      name: '活力',
      tree: 'base',
      mods: (l) => ({ maxHp: 1 + 0.04 * l }),
    },
    passive_dancer_resonance: {
      id: 'passive_dancer_resonance',
      name: '共鳴',
      tree: 'base',
      mods: (l) => ({ matk: 1 + 0.03 * l, maxTp: 1 + 0.03 * l }),
    },
    passive_monk_counter_mastery: {
      id: 'passive_monk_counter_mastery',
      name: '反骨',
      tree: 'base',
      mods: (l) => ({ patk: 1 + 0.03 * l, crit: 0.015 * l }),
    },
    passive_hexer_curse_lore: {
      id: 'passive_hexer_curse_lore',
      name: '呪術の知識',
      tree: 'base',
      mods: (l) => ({ matk: 1 + 0.04 * l }),
    },
    passive_summoner_spirit_lore: {
      id: 'passive_summoner_spirit_lore',
      name: '冥導',
      tree: 'base',
      mods: (l) => ({ matk: 1 + 0.03 * l, maxTp: 1 + 0.03 * l }),
    },
  },
  _1 = ['patk', 'matk', 'pdef', 'mdef', 'acc', 'eva', 'maxHp', 'maxTp'];
function f1(l) {
  var o;
  const i = l.equipment.weapon;
  if (i) return (o = ot[i.masterId]) == null ? void 0 : o.weaponType;
}
function p1(l) {
  const i = f1(l),
    o = {};
  let r = 0;
  for (const [c, d] of Object.entries(l.learnedSkills)) {
    if (d <= 0) continue;
    const f = Mc[c];
    if (!f || (f.weaponType && f.weaponType !== i)) continue;
    const h = f.mods(d);
    for (const k of _1) h[k] !== void 0 && (o[k] = (o[k] ?? 1) * h[k]);
    h.crit !== void 0 && (r += h.crit);
  }
  return (r !== 0 && (o.crit = r), o);
}
const mt = (l) => ({ hp: 0, tp: 0, str: 0, vit: 0, agi: 0, int: 0, mnd: 0, luc: 0, ...l }),
  Ul = {
    title_berserker: {
      id: 'title_berserker',
      name: '狂戦士',
      parentClassId: 'class_warrior',
      skillTree: {
        skills: [
          { skillId: 'passive_title_berserker', maxLevel: 3 },
          { skillId: 'passive_warrior_t_bloodlust', maxLevel: 3 },
          {
            skillId: 'skill_warrior_t_rampage',
            maxLevel: 3,
            requires: [{ skillId: 'passive_title_berserker', level: 2 }],
          },
        ],
      },
      growthModifier: mt({ str: 1 }),
    },
    title_sentinel: {
      id: 'title_sentinel',
      name: '哨戒兵',
      parentClassId: 'class_warrior',
      skillTree: {
        skills: [
          { skillId: 'passive_title_sentinel', maxLevel: 3 },
          { skillId: 'passive_warrior_t_guardian_eye', maxLevel: 3 },
          {
            skillId: 'skill_warrior_t_overwatch',
            maxLevel: 3,
            requires: [{ skillId: 'passive_title_sentinel', level: 2 }],
          },
        ],
      },
      growthModifier: mt({ vit: 1 }),
    },
    title_bulwark: {
      id: 'title_bulwark',
      name: '城壁',
      parentClassId: 'class_guardian',
      skillTree: {
        skills: [
          { skillId: 'passive_title_bulwark', maxLevel: 3 },
          { skillId: 'passive_guardian_t_fortress', maxLevel: 3 },
          {
            skillId: 'skill_guardian_t_last_bastion',
            maxLevel: 3,
            requires: [{ skillId: 'passive_title_bulwark', level: 2 }],
          },
        ],
      },
      growthModifier: mt({ vit: 1, hp: 2 }),
    },
    title_vanguard: {
      id: 'title_vanguard',
      name: '先鋒',
      parentClassId: 'class_guardian',
      skillTree: {
        skills: [
          { skillId: 'passive_title_vanguard', maxLevel: 3 },
          { skillId: 'passive_guardian_t_spearhead', maxLevel: 3 },
          {
            skillId: 'skill_guardian_t_lance_charge',
            maxLevel: 5,
            requires: [{ skillId: 'passive_title_vanguard', level: 2 }],
          },
        ],
      },
      growthModifier: mt({ str: 1 }),
    },
    title_pyromancer: {
      id: 'title_pyromancer',
      name: '紅蓮術士',
      parentClassId: 'class_mage',
      skillTree: {
        skills: [
          { skillId: 'passive_title_pyromancer', maxLevel: 3 },
          { skillId: 'passive_mage_t_inferno', maxLevel: 3 },
          {
            skillId: 'skill_mage_t_hellfire',
            maxLevel: 5,
            requires: [{ skillId: 'passive_title_pyromancer', level: 2 }],
          },
        ],
      },
      growthModifier: mt({ int: 1 }),
    },
    title_sage: {
      id: 'title_sage',
      name: '賢者',
      parentClassId: 'class_mage',
      skillTree: {
        skills: [
          { skillId: 'passive_title_sage', maxLevel: 3 },
          { skillId: 'passive_mage_t_arcane_lore', maxLevel: 3 },
          {
            skillId: 'skill_mage_t_mana_surge',
            maxLevel: 3,
            requires: [{ skillId: 'passive_title_sage', level: 2 }],
          },
        ],
      },
      growthModifier: mt({ tp: 2, mnd: 1 }),
    },
    title_sniper: {
      id: 'title_sniper',
      name: '狙撃手',
      parentClassId: 'class_ranger',
      skillTree: {
        skills: [
          { skillId: 'passive_title_sniper', maxLevel: 3 },
          { skillId: 'passive_ranger_t_keen_sight', maxLevel: 3 },
          {
            skillId: 'skill_ranger_t_snipe',
            maxLevel: 3,
            requires: [{ skillId: 'passive_title_sniper', level: 2 }],
          },
        ],
      },
      growthModifier: mt({ agi: 1, luc: 1 }),
    },
    title_tracker: {
      id: 'title_tracker',
      name: '追跡者',
      parentClassId: 'class_ranger',
      skillTree: {
        skills: [
          { skillId: 'passive_title_tracker', maxLevel: 3 },
          { skillId: 'passive_ranger_t_shadowstep', maxLevel: 3 },
          {
            skillId: 'skill_ranger_t_camouflage',
            maxLevel: 3,
            requires: [{ skillId: 'passive_title_tracker', level: 2 }],
          },
        ],
      },
      growthModifier: mt({ agi: 1 }),
    },
    title_saint: {
      id: 'title_saint',
      name: '聖者',
      parentClassId: 'class_medic',
      skillTree: {
        skills: [
          { skillId: 'passive_title_saint', maxLevel: 3 },
          { skillId: 'passive_medic_t_blessing', maxLevel: 3 },
          {
            skillId: 'skill_medic_t_revive_light',
            maxLevel: 3,
            requires: [{ skillId: 'passive_title_saint', level: 2 }],
          },
        ],
      },
      growthModifier: mt({ mnd: 1, tp: 2 }),
    },
    title_apothecary: {
      id: 'title_apothecary',
      name: '調薬師',
      parentClassId: 'class_medic',
      skillTree: {
        skills: [
          { skillId: 'skill_cleanse_draft', maxLevel: 3 },
          { skillId: 'passive_medic_t_alchemy', maxLevel: 3 },
          {
            skillId: 'skill_medic_t_stimulant',
            maxLevel: 3,
            requires: [{ skillId: 'skill_cleanse_draft', level: 2 }],
          },
        ],
      },
      growthModifier: mt({ luc: 1, tp: 1 }),
    },
    title_blade_dancer: {
      id: 'title_blade_dancer',
      name: '剣の舞手',
      parentClassId: 'class_dancer',
      skillTree: {
        skills: [
          { skillId: 'passive_title_blade_dancer', maxLevel: 3 },
          { skillId: 'passive_dancer_t_grace', maxLevel: 3 },
          {
            skillId: 'skill_dancer_t_finale',
            maxLevel: 3,
            requires: [{ skillId: 'passive_title_blade_dancer', level: 2 }],
          },
        ],
      },
      growthModifier: mt({ agi: 1, str: 1 }),
    },
    title_muse: {
      id: 'title_muse',
      name: '舞姫',
      parentClassId: 'class_dancer',
      skillTree: {
        skills: [
          { skillId: 'passive_title_muse', maxLevel: 3 },
          { skillId: 'passive_dancer_t_melody', maxLevel: 3 },
          {
            skillId: 'skill_dancer_t_lullaby',
            maxLevel: 3,
            requires: [{ skillId: 'passive_title_muse', level: 2 }],
          },
        ],
      },
      growthModifier: mt({ mnd: 1, tp: 1 }),
    },
    title_grappler: {
      id: 'title_grappler',
      name: '組手家',
      parentClassId: 'class_monk',
      skillTree: {
        skills: [
          { skillId: 'skill_counter_throw', maxLevel: 3 },
          { skillId: 'passive_grappler_t_counter_mastery', maxLevel: 3 },
          {
            skillId: 'skill_grappler_t_chain_throw',
            maxLevel: 3,
            requires: [{ skillId: 'skill_counter_throw', level: 1 }],
          },
        ],
      },
      growthModifier: mt({ str: 1, agi: 1 }),
    },
    title_zen: {
      id: 'title_zen',
      name: '禅僧',
      parentClassId: 'class_monk',
      skillTree: {
        skills: [
          { skillId: 'passive_title_zen', maxLevel: 3 },
          { skillId: 'skill_zen_t_meditation', maxLevel: 3 },
          {
            skillId: 'skill_zen_t_mountain_stance',
            maxLevel: 3,
            requires: [{ skillId: 'passive_title_zen', level: 1 }],
          },
        ],
      },
      growthModifier: mt({ vit: 1, tp: 1 }),
    },
    title_plague: {
      id: 'title_plague',
      name: '疫病使い',
      parentClassId: 'class_hexer',
      skillTree: {
        skills: [
          { skillId: 'passive_title_plague', maxLevel: 3 },
          { skillId: 'skill_plague_t_wither', maxLevel: 3 },
          {
            skillId: 'skill_plague_t_pandemic',
            maxLevel: 3,
            requires: [{ skillId: 'passive_title_plague', level: 1 }],
          },
        ],
      },
      growthModifier: mt({ int: 1 }),
    },
    title_warlock: {
      id: 'title_warlock',
      name: '魔道師',
      parentClassId: 'class_hexer',
      skillTree: {
        skills: [
          { skillId: 'passive_title_warlock', maxLevel: 3 },
          { skillId: 'passive_warlock_t_matk_mastery', maxLevel: 3 },
          {
            skillId: 'skill_warlock_t_dark_bolt',
            maxLevel: 3,
            requires: [{ skillId: 'passive_title_warlock', level: 1 }],
          },
        ],
      },
      growthModifier: mt({ int: 1, luc: 1 }),
    },
    title_necromancer: {
      id: 'title_necromancer',
      name: '降霊師',
      parentClassId: 'class_summoner',
      skillTree: {
        skills: [
          { skillId: 'passive_title_necromancer', maxLevel: 3 },
          { skillId: 'skill_necromancer_t_death_pulse', maxLevel: 3 },
          {
            skillId: 'skill_necromancer_t_call_revenant',
            maxLevel: 3,
            requires: [{ skillId: 'passive_title_necromancer', level: 1 }],
          },
        ],
      },
      growthModifier: mt({ int: 1, tp: 1 }),
    },
    title_puppeteer: {
      id: 'title_puppeteer',
      name: '傀儡師',
      parentClassId: 'class_summoner',
      skillTree: {
        skills: [
          { skillId: 'passive_title_puppeteer', maxLevel: 3 },
          { skillId: 'passive_puppeteer_t_vitality', maxLevel: 3 },
          {
            skillId: 'skill_puppeteer_t_aegis',
            maxLevel: 3,
            requires: [{ skillId: 'passive_title_puppeteer', level: 1 }],
          },
        ],
      },
      growthModifier: mt({ mnd: 1, vit: 1 }),
    },
  },
  h1 = ['hp', 'tp', 'str', 'vit', 'agi', 'int', 'mnd', 'luc'];
function Gl(l) {
  var h, k;
  const i = St[l.raceId];
  if (!i) throw new Error(`computeBaseStats: 未定義の種族 "${l.raceId}"`);
  const r = Math.max(1, Math.min(l.level, He.LEVEL_CAP)) - 1,
    c = l.titleId ? ((h = Ul[l.titleId]) == null ? void 0 : h.growthModifier) : void 0,
    d = ((k = l.rebirthBonus) == null ? void 0 : k.allStats) ?? 0,
    f = {};
  for (const p of h1) {
    const v = i.statGrowth[p] + ((c == null ? void 0 : c[p]) ?? 0);
    f[p] = i.baseStatsAtLv1[p] + v * r + d;
  }
  return f;
}
const g1 = 3,
  $l = (l, i, o) => Math.max(i, Math.min(o, l)),
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
function v1(l) {
  const i = { atk: 0, mat: 0, def: 0, mdf: 0 };
  for (const o of Object.values(l.equipment)) {
    if (!o || !ot[o.masterId]) continue;
    const c = Sh(o.masterId, o.grade),
      d = s1(o.masterId, o.forgeLevel);
    ((i.atk += (c.atk ?? 0) + (d.atk ?? 0)),
      (i.mat += (c.mat ?? 0) + (d.mat ?? 0)),
      (i.def += (c.def ?? 0) + (d.def ?? 0)),
      (i.mdf += (c.mdf ?? 0) + (d.mdf ?? 0)));
  }
  return i;
}
function y1(l, i) {
  var p;
  const o = l.guild.members.find((v) => v.id === i);
  if (!o) return null;
  const r = (p = l.diveState) == null ? void 0 : p.party.find((v) => v.charId === i),
    c = Gl(o),
    d = p1(o),
    f = Math.round(c.hp * (d.maxHp ?? 1)),
    h = Math.round(c.tp * (d.maxTp ?? 1)),
    k = l.guild.party.front.includes(i);
  return {
    id: i,
    name: o.name,
    side: 'ally',
    row: k ? 'front' : 'back',
    stats: c,
    equip: v1(o),
    hp: r ? Math.min(r.hp, f) : f,
    maxHp: f,
    tp: r ? Math.min(r.tp, h) : h,
    maxTp: h,
    buffs: [],
    ailments: r ? [...r.ailments] : [],
    states: [],
    passive: d,
    unionGauge: (r == null ? void 0 : r.unionGauge) ?? 0,
    isDown: r ? r.hp <= 0 : !1,
  };
}
function b1(l, i, o) {
  const r = ul[l],
    c = e1(r, o),
    d = xh(o);
  return {
    id: `enemy_${i}`,
    name: d >= 2 ? `${r.name} Lv${d}` : r.name,
    side: 'enemy',
    row: 'front',
    stats: c,
    equip: {},
    hp: c.hp,
    maxHp: c.hp,
    tp: c.tp,
    maxTp: c.tp,
    buffs: [],
    ailments: [],
    unionGauge: 0,
    isDown: !1,
    enemyId: l,
    resist: r.resist,
  };
}
function qh(l, i, o, r, c) {
  const d = Xn[l],
    f = kh(d.baseStats, ed(i, d.refDepth)),
    h = c ?? f.hp;
  return {
    id: r,
    name: d.name,
    side: 'ally',
    row: 'front',
    stats: f,
    equip: {},
    hp: h,
    maxHp: f.hp,
    tp: 0,
    maxTp: 0,
    buffs: [],
    ailments: [],
    unionGauge: 0,
    isDown: h <= 0,
    isSummon: !0,
    summonKind: l,
    ownerId: o,
  };
}
function jp(l, i, o = 'none') {
  var k, p;
  const r = ((k = l.diveState) == null ? void 0 : k.depth) ?? 1,
    d = [...l.guild.party.front, ...l.guild.party.back]
      .filter((v) => v !== null)
      .map((v) => y1(l, v))
      .filter((v) => v !== null),
    f = i.map((v, y) => b1(v, y, r)),
    h = (((p = l.diveState) == null ? void 0 : p.persistentSummons) ?? [])
      .map((v, y) => qh(v.summonKind, r, v.ownerId, `summon_persist_${y}`, v.hp))
      .filter((v) => !v.isDown);
  return {
    turn: 1,
    depth: r,
    allies: d,
    enemies: f,
    summons: h,
    log: [],
    outcome: 'ongoing',
    firstStrike: o,
    drops: [],
    consumedItems: [],
  };
}
const _t = (l, i) => (i === 'ally' ? l.allies : l.enemies).filter((o) => !o.isDown),
  Qr = (l) => l.summons.filter((i) => !i.isDown);
function Hl(l, i) {
  return (
    l.allies.find((o) => o.id === i) ??
    l.enemies.find((o) => o.id === i) ??
    l.summons.find((o) => o.id === i)
  );
}
const sd = (l) => {
    var i;
    return (
      !!l.isSummon && !!l.summonKind && ((i = Xn[l.summonKind]) == null ? void 0 : i.buffImmune)
    );
  },
  x1 = (l, i) => {
    var o;
    return ((o = l.resist) == null ? void 0 : o[i]) ?? 1;
  };
function Bh(l, i, o) {
  ((l.hp = $l(l.hp - i, 0, l.maxHp)),
    i > 0 &&
      l.ailments.some((r) => r.type === 'sleep') &&
      ((l.ailments = l.ailments.filter((r) => r.type !== 'sleep')),
      o.push({ text: `${l.name} は目を覚ました` })),
    l.hp === 0 &&
      !l.isDown &&
      ((l.isDown = !0),
      (l.unionGauge = Math.floor(l.unionGauge / 2)),
      o.push({ text: `${l.name} は倒れた！` })));
}
function Oc(l, i) {
  l.isDown || (l.unionGauge = $l(l.unionGauge + i, 0, 100));
}
function Ic(l, i) {
  sd(l) ||
    ((l.buffs = l.buffs.filter((o) => !(o.stat === i.stat && o.stackGroup === i.stackGroup))),
    l.buffs.push(i));
}
function S1(l, i) {
  if (sd(l)) return;
  const o = l.ailments.find((r) => r.type === i.type);
  if (o) {
    o.remainingTurns = Math.max(o.remainingTurns, i.remainingTurns);
    return;
  }
  l.ailments.push(i);
}
function br(l, i) {
  sd(l) || (l.states = [...(l.states ?? []).filter((o) => o.kind !== i.kind), i]);
}
function w1(l, i) {
  return i.side === 'ally' ? [..._t(l, 'ally'), ...Qr(l)] : _t(l, 'enemy');
}
function T1(l, i, o) {
  const r = (l.states ?? []).find((d) => d.kind === 'barrier' && d.absorb > 0);
  if (!r || r.kind !== 'barrier') return i;
  const c = Math.min(r.absorb, i);
  return (
    (r.absorb -= c),
    c > 0 && o.push({ text: `${l.name} は障壁で ${c} のダメージを防いだ` }),
    r.absorb <= 0 && (l.states = (l.states ?? []).filter((d) => d !== r)),
    i - c
  );
}
function Ir(l, i, o, r, c, d = {}) {
  if (o.isDown) return { hit: !1, dealt: 0 };
  const f = a1(
    i,
    o,
    {
      statBase: r.statBase,
      power: r.power,
      element: r.element,
      elementMultiplier: x1(o, r.element),
    },
    c
  );
  if (!f.hit) return (l.log.push({ text: `${i.name} の攻撃は外れた` }), { hit: !1, dealt: 0 });
  const h = T1(o, f.damage, l.log);
  return (
    Bh(o, h, l.log),
    d.actorUnion && Oc(i, d.actorUnion),
    Oc(o, 5),
    h > 0 &&
      l.log.push({
        text: `${i.name} の攻撃！ ${o.name} に ${h} ダメージ${f.critical ? '（会心）' : ''}`,
      }),
    { hit: !0, dealt: h }
  );
}
function Mh(l, i, o, r, c, d) {
  if (!o.isDown && !i.isDown && o.side !== i.side)
    for (const f of o.states ?? []) {
      if (f.kind !== 'counter' || d.next() >= f.chance) continue;
      l.log.push({ text: `${o.name} の反撃！` });
      const h = f.statBase === 'str' ? 'bash' : 'almighty';
      if ((Ir(l, o, i, { statBase: f.statBase, power: f.power, element: h }, d), i.isDown)) break;
    }
  if (c > 0 && o.side !== i.side) {
    for (const f of w1(l, i))
      if (!(f.id === i.id || f.isDown || o.isDown))
        for (const h of f.states ?? [])
          h.kind === 'chase' &&
            ((h.element !== r && h.element !== 'almighty' && r !== 'almighty') ||
              (l.log.push({ text: `${f.name} の連携追撃！` }),
              Ir(l, f, o, { statBase: h.statBase, power: h.power, element: h.element }, d)));
  }
}
function E1(l, i, o) {
  return $l(l * (1 + (i.stats.luc - o.stats.luc) * He.AILMENT_LUC_K), 0, He.AILMENT_MAX);
}
function Oh(l, i, o, r) {
  const c = i.side === 'ally' ? 'enemy' : 'ally';
  switch (o) {
    case 'self':
      return [i];
    case 'allyAll':
      return i.side === 'ally' ? [..._t(l, 'ally'), ...Qr(l)] : _t(l, 'enemy');
    case 'allyOne': {
      const d = Hl(l, r);
      return d && d.side === i.side ? [d] : [i];
    }
    case 'enemyAll':
      return _t(l, c);
    case 'enemyRow':
    case 'enemyOne':
    default: {
      const d = Hl(l, r);
      return d && d.side === c && !d.isDown ? [d] : _t(l, c).slice(0, 1);
    }
  }
}
function C1(l, i, o, r) {
  return Oh(l, i, o.target, r);
}
function Ih(l, i, o, r, c, d, f) {
  switch (o.kind) {
    case 'damage': {
      const h = o.hits ?? 1,
        k = o.power(c);
      for (const p of d) {
        if (p.isDown) continue;
        let v = !1,
          y = 0;
        for (let E = 0; E < h && !p.isDown; E++) {
          const M = Ir(l, i, p, { statBase: o.statBase, power: k, element: r }, f);
          M.hit && ((v = !0), (y += M.dealt));
        }
        v && Mh(l, i, p, r, y, f);
      }
      break;
    }
    case 'heal': {
      const h = o.amount(c);
      for (const k of d) k.isDown || (k.hp = $l(k.hp + h, 0, k.maxHp));
      l.log.push({ text: `${i.name} は回復魔法を使った（+${h}）` });
      break;
    }
    case 'buff': {
      for (const h of d)
        Ic(h, {
          stat: o.stat,
          modifier: o.modifier(c),
          remainingTurns: o.turns,
          stackGroup: o.stackGroup,
        });
      l.log.push({ text: `${i.name} は態勢を整えた` });
      break;
    }
    case 'ailment': {
      for (const h of d) {
        if (h.isDown) continue;
        const k = E1(o.chance(c), i, h);
        f.next() < k &&
          (S1(h, { type: o.ailment, remainingTurns: o.turns, magnitude: o.magnitude }),
          l.log.push({ text: `${h.name} は${k1[o.ailment]}になった` }));
      }
      break;
    }
    case 'summon': {
      if (i.side !== 'ally') break;
      if (Qr(l).length >= g1) {
        l.log.push({ text: 'これ以上は召喚できない' });
        break;
      }
      const h = `summon_${l.turn}_${l.summons.length}`,
        k = qh(o.summonKind, l.depth, i.id, h);
      (l.summons.push(k), l.log.push({ text: `${i.name} は ${k.name} を召喚した！` }));
      break;
    }
    case 'counter': {
      for (const h of d)
        h.isDown ||
          br(h, {
            kind: 'counter',
            chance: o.chance(c),
            power: o.power(c),
            statBase: o.statBase,
            remainingTurns: o.turns,
          });
      l.log.push({ text: `${i.name} は反撃の構えを取った` });
      break;
    }
    case 'chase': {
      for (const h of d)
        h.isDown ||
          br(h, {
            kind: 'chase',
            element: r,
            power: o.power(c),
            statBase: o.statBase,
            remainingTurns: o.turns,
          });
      l.log.push({ text: `${i.name} は連携の構えを取った` });
      break;
    }
    case 'decoy': {
      for (const h of d)
        h.isDown || br(h, { kind: 'decoy', weight: o.weight(c), remainingTurns: o.turns });
      l.log.push({ text: `${i.name} は敵の注意を引きつけた` });
      break;
    }
    case 'barrier': {
      for (const h of d)
        h.isDown || br(h, { kind: 'barrier', absorb: o.absorb(c), remainingTurns: o.turns });
      l.log.push({ text: `${i.name} は守りの障壁を張った` });
      break;
    }
    case 'cleanse': {
      for (const h of d)
        h.isDown ||
          h.ailments.length === 0 ||
          ((h.ailments = []), l.log.push({ text: `${h.name} の状態異常が治療された` }));
      break;
    }
  }
}
function vc(l, i, o, r) {
  var f;
  if (o.isDown) return;
  const c = i.enemyId
      ? (ul[i.enemyId].attackElement ?? 'bash')
      : i.isSummon && i.summonKind
        ? (((f = Xn[i.summonKind]) == null ? void 0 : f.attackElement) ?? 'bash')
        : 'bash',
    d = Ir(l, i, o, { statBase: 'str', power: 1, element: c }, r, { actorUnion: 5 });
  d.hit && Mh(l, i, o, c, d.dealt, r);
}
const Ap = (l) => (l.length === 0 ? 0 : l.reduce((i, o) => i + o.stats.agi, 0) / l.length);
function N1(l, i) {
  const o = l.map(
      (d) => 1 + (d.states ?? []).reduce((f, h) => f + (h.kind === 'decoy' ? h.weight : 0), 0)
    ),
    r = o.reduce((d, f) => d + f, 0);
  let c = i.next() * r;
  for (let d = 0; d < l.length; d++) if (((c -= o[d]), c < 0)) return l[d];
  return l[l.length - 1];
}
const j1 = (l) => l.ailments.some((i) => i.type === 'paralysis'),
  A1 = (l) => l.ailments.some((i) => i.type === 'sleep'),
  rd = (l, i) => l.ailments.some((o) => o.type === i),
  yc = (l) => rd(l, 'armBind'),
  L1 = (l) => rd(l, 'headBind'),
  q1 = (l) => rd(l, 'legBind');
function Lp(l) {
  return l.effects.some((i) => i.kind === 'damage' && i.statBase === 'str');
}
function B1(l, i, o) {
  const r = Rn[i.unionSkillId];
  if (!r) return;
  const c = Hl(l, i.actorId);
  if (!c || c.isDown || c.side !== 'ally') return;
  if (c.unionGauge < 100) {
    l.log.push({ text: `${c.name} はユニオンゲージが足りない` });
    return;
  }
  const d = new Set(i.participantIds);
  d.add(c.id);
  const f = [...d].map((v) => Hl(l, v)).filter((v) => !!v && !v.isDown && v.side === 'ally');
  if (f.length < r.requiredParticipants) {
    l.log.push({ text: `${c.name} の${r.name}は参加人数が足りない` });
    return;
  }
  const h = [c, ...f.filter((v) => v.id !== c.id)].slice(0, r.requiredParticipants);
  for (const v of h) v.unionGauge = $l(v.unionGauge - r.gaugeCostPerParticipant, 0, 100);
  l.log.push({ text: `ユニオン！ ${c.name} の${r.name}！` });
  const k = 1,
    p = Oh(l, c, r.target, i.targetId);
  for (const v of r.effects) Ih(l, c, v, r.element, k, p, o);
}
function M1(l, i, o) {
  var E, M, O;
  if (l.outcome !== 'ongoing') return l;
  const r = structuredClone({ ...l, log: [] }),
    c = r.log.push.bind(r.log);
  r.log.push = (...x) => {
    const S = c(...x),
      b = {};
    for (const C of [...r.allies, ...r.enemies, ...r.summons])
      b[C.id] = { hp: C.hp, isDown: C.isDown };
    for (const C of x) C.snapshot = b;
    return S;
  };
  const d = new Map(i.filter((x) => x.kind !== 'union').map((x) => [x.actorId, x])),
    f = r.turn === 1 && r.firstStrike !== 'none',
    h = f && r.firstStrike === 'preemptive',
    k = f && r.firstStrike === 'ambush';
  if (
    (h && r.log.push({ text: '先制攻撃！ 味方が先手を取った' }),
    k && r.log.push({ text: '不意打ち！ 敵に先手を取られた' }),
    !k)
  )
    for (const x of i) x.kind === 'union' && B1(r, x, o);
  const p = i.find((x) => x.kind === 'flee');
  if (!k && p && r.outcome === 'ongoing') {
    const x = Hl(r, p.actorId);
    if (x && q1(x)) r.log.push({ text: `${x.name} は脚を封じられて逃げられない` });
    else {
      const S = $l(0.5 + (Ap(_t(r, 'ally')) - Ap(_t(r, 'enemy'))) * 0.02, 0.1, 0.95);
      if (o.next() < S)
        return (r.log.push({ text: 'うまく逃げ切れた！' }), (r.outcome = 'fled'), r);
      r.log.push({ text: '逃げられなかった！' });
    }
  }
  if (!k)
    for (const x of i) {
      if (x.kind !== 'guard') continue;
      const S = Hl(r, x.actorId);
      !S ||
        S.isDown ||
        (Ic(S, { stat: 'pdef', modifier: 1.5, remainingTurns: 1, stackGroup: 'guard' }),
        Ic(S, { stat: 'mdef', modifier: 1.5, remainingTurns: 1, stackGroup: 'guard' }));
    }
  const v = new Map();
  if (!h)
    for (const x of _t(r, 'enemy')) {
      const S = [...Qr(r), ..._t(r, 'ally')];
      S.length > 0 && v.set(x.id, N1(S, o).id);
    }
  const y = [...r.allies, ...r.enemies, ...r.summons]
    .filter((x) => !x.isDown)
    .filter((x) => !(h && x.side === 'enemy') && !(k && x.side === 'ally'))
    .map((x) => ({ c: x, agi: x.stats.agi, tie: o.next() }))
    .sort((x, S) => S.agi - x.agi || S.tie - x.tie)
    .map((x) => x.c);
  for (const x of y)
    if (!x.isDown) {
      if (r.outcome !== 'ongoing') break;
      if (A1(x)) {
        r.log.push({ text: `${x.name} は眠っている` });
        continue;
      }
      if (j1(x) && o.next() < He.PARALYSIS_SKIP) {
        r.log.push({ text: `${x.name} は麻痺で動けない` });
        continue;
      }
      if (x.isSummon) {
        const S = x.summonKind ? Xn[x.summonKind] : void 0;
        if (S != null && S.actsOnTurn) {
          const b = _t(r, 'enemy');
          b.length > 0 && vc(r, x, o.pick(b), o);
        }
        if (_t(r, 'enemy').length === 0) break;
        continue;
      }
      if (x.side === 'enemy') {
        if (yc(x)) {
          r.log.push({ text: `${x.name} は腕を封じられて攻撃できない` });
          continue;
        }
        const S = v.get(x.id),
          b = S ? Hl(r, S) : void 0,
          C = b && !b.isDown ? b : _t(r, 'ally')[0];
        C && vc(r, x, C, o);
      } else {
        const S = d.get(x.id);
        if (!S || S.kind === 'guard' || S.kind === 'flee') continue;
        if (S.kind === 'attack') {
          if (yc(x)) {
            r.log.push({ text: `${x.name} は腕を封じられて攻撃できない` });
            continue;
          }
          const b = Hl(r, S.targetId),
            C = b && !b.isDown ? b : _t(r, 'enemy')[0];
          C && vc(r, x, C, o);
        } else if (S.kind === 'skill') {
          const b = Wt[S.skillId];
          if (!b) continue;
          if (Lp(b) && yc(x)) {
            r.log.push({ text: `${x.name} は腕を封じられてスキルを使えない` });
            continue;
          }
          if (!Lp(b) && L1(x)) {
            r.log.push({ text: `${x.name} は頭を封じられてスキルを使えない` });
            continue;
          }
          const C = 1,
            A = b.tpCost(C);
          if (x.tp < A) {
            r.log.push({ text: `${x.name} は TP が足りない` });
            continue;
          }
          ((x.tp -= A), Oc(x, 10));
          const F = C1(r, x, b, S.targetId);
          for (const P of b.effects) Ih(r, x, P, b.element, C, F, o);
        } else if (S.kind === 'item') {
          const b = tt[S.itemId];
          if (!b || !((E = b.useContext) != null && E.includes('battle'))) continue;
          const C = Hl(r, S.targetId) ?? x;
          for (const A of b.effects ?? [])
            A.kind === 'heal'
              ? (C.hp = $l(C.hp + A.amount(1), 0, C.maxHp))
              : A.kind === 'restoreTp' && (C.tp = $l(C.tp + A.amount(1), 0, C.maxTp));
          (r.consumedItems.push(S.itemId), r.log.push({ text: `${x.name} は ${b.name} を使った` }));
        }
      }
      if (_t(r, 'enemy').length === 0 || _t(r, 'ally').length === 0) break;
    }
  for (const x of [...r.allies, ...r.enemies, ...r.summons]) {
    if (x.isDown) continue;
    const S = x.ailments.find((b) => b.type === 'poison');
    if (S) {
      const b = S.magnitude ?? Math.max(1, Math.floor(x.maxHp * He.POISON_HP_RATIO));
      (Bh(x, b, r.log), r.log.push({ text: `${x.name} は毒で ${b} のダメージ` }));
    }
  }
  for (const x of [...r.allies, ...r.enemies, ...r.summons])
    (!x.isDown &&
      x.maxTp > 0 &&
      (x.tp = Math.min(x.maxTp, x.tp + Math.ceil(x.maxTp * He.TP_REGEN_RATIO))),
      (x.buffs = x.buffs
        .map((S) => ({ ...S, remainingTurns: S.remainingTurns - 1 }))
        .filter((S) => S.remainingTurns > 0)),
      (x.ailments = x.ailments
        .map((S) => ({ ...S, remainingTurns: S.remainingTurns - 1 }))
        .filter((S) => S.remainingTurns > 0)),
      x.states &&
        x.states.length > 0 &&
        (x.states = x.states
          .map((S) => ({ ...S, remainingTurns: S.remainingTurns - 1 }))
          .filter((S) => S.remainingTurns > 0)));
  for (const x of r.enemies)
    if (
      !(
        !x.isDown ||
        !x.enemyId ||
        (((M = l.enemies.find((b) => b.id === x.id)) == null ? void 0 : M.isDown) ?? !1)
      )
    )
      for (const b of ul[x.enemyId].drops ?? [])
        o.next() < b.rate &&
          (r.drops.push({ enemyId: x.enemyId, itemId: b.itemId }),
          r.log.push({
            text: `${x.name} は ${((O = tt[b.itemId]) == null ? void 0 : O.name) ?? b.itemId} を落とした`,
          }));
  return (
    (r.summons = r.summons.filter((x) => !x.isDown)),
    (r.turn += 1),
    _t(r, 'enemy').length === 0
      ? (r.outcome = 'win')
      : _t(r, 'ally').length === 0 && (r.outcome = 'lose'),
    r
  );
}
function od(l) {
  let i = 0,
    o = 0;
  for (const r of l.enemies) {
    if (!r.enemyId) continue;
    const c = ul[r.enemyId],
      d = ed(l.depth, c.refDepth);
    ((i += Math.round(c.exp * d)), (o += Math.round(c.gold * d)));
  }
  return { exp: i, gold: o };
}
function O1(l, i) {
  if (i.outcome !== 'win' || !l.diveState) return [];
  const { exp: o } = od(i),
    r = new Set(l.diveState.party.map((f) => f.charId)),
    c = r.size > 0 ? Math.floor(o / r.size) : 0,
    d = [];
  for (const f of l.guild.members) {
    if (!r.has(f.id)) continue;
    const h = Dh(f, c),
      k = {};
    if (h.level > f.level) {
      const p = Gl(f),
        v = Gl(h);
      for (const y of Object.keys(p)) {
        const E = Math.round(v[y] - p[y]);
        E !== 0 && (k[y] = E);
      }
    }
    d.push({
      charId: f.id,
      name: f.name,
      gainedExp: Qi(f.level) ? c : 0,
      fromLevel: f.level,
      toLevel: h.level,
      exp: h.exp,
      expToNext: Qi(h.level) ? Bc(h.level) : 0,
      statGains: k,
    });
  }
  return d;
}
function Dh(l, i) {
  let o = l.level,
    r = l.exp + (Qi(o) ? i : 0),
    c = l.skillPoints.total;
  for (; Qi(o) && r >= Bc(o); ) ((r -= Bc(o)), (o += 1), (c += Pb(o)));
  return {
    ...l,
    level: o,
    exp: Qi(l.level) ? r : l.exp,
    skillPoints: { ...l.skillPoints, total: c },
  };
}
function qp(l, i) {
  if (!l.diveState) return l;
  const o = i.outcome === 'win',
    r = i.outcome === 'win' || i.outcome === 'fled',
    c = new Map(i.allies.map((M) => [M.id, M])),
    d = l.diveState.party.map((M) => {
      const O = c.get(M.charId);
      if (!O) return M;
      let x = O.unionGauge;
      return (
        r && !O.isDown && (x = $l(x + He.UNION_GAIN_ON_WIN, 0, 100)),
        { ...M, hp: O.hp, tp: O.tp, unionGauge: x, ailments: O.ailments }
      );
    });
  let f = l.guild.members,
    h = l.guild.gold;
  const k = { ...l.bestiary.monsters };
  for (const M of i.enemies) {
    if (!M.enemyId) continue;
    const O = k[M.enemyId] ?? { seen: !1, defeated: !1, dropsFound: [] };
    k[M.enemyId] = { ...O, seen: !0, defeated: O.defeated || M.isDown };
  }
  if (o)
    for (const M of i.drops) {
      const O = k[M.enemyId];
      O &&
        !O.dropsFound.includes(M.itemId) &&
        (k[M.enemyId] = { ...O, dropsFound: [...O.dropsFound, M.itemId] });
    }
  const p = { ...l.bestiary, monsters: k };
  if (o) {
    const { exp: M, gold: O } = od(i);
    h += O;
    const x = new Set(d.map((b) => b.charId)),
      S = x.size > 0 ? Math.floor(M / x.size) : 0;
    f = f.map((b) => (x.has(b.id) ? Dh(b, S) : b));
  }
  const v = i.summons
    .filter((M) => {
      var O;
      return (
        !M.isDown &&
        M.summonKind &&
        ((O = Xn[M.summonKind]) == null ? void 0 : O.persistsAfterBattle)
      );
    })
    .map((M) => ({ summonKind: M.summonKind, ownerId: M.ownerId ?? '', hp: M.hp }));
  let y = {
    ...l,
    guild: { ...l.guild, members: f, gold: h, bestiary: p },
    bestiary: p,
    diveState: { ...l.diveState, party: d, persistentSummons: v },
  };
  for (const M of i.consumedItems) y = ld(y, M, 1);
  const E = xh(i.depth);
  if (o) for (const M of i.drops) y = td(y, M.itemId, 1, E);
  return y;
}
const I1 = 8,
  Dc = 16,
  Ki = 5;
function ud(l) {
  return l.range(I1, Dc);
}
function D1(l, i) {
  const o = l - 1;
  return o <= 0
    ? { stepsUntilEncounter: ud(i), triggered: !0 }
    : { stepsUntilEncounter: o, triggered: !1 };
}
function R1(l) {
  const i = Math.max(0, Dc - l),
    o = Math.round((i / Dc) * Ki);
  return Math.min(Ki, Math.max(0, o));
}
const el = { N: { dx: 0, dy: -1 }, E: { dx: 1, dy: 0 }, S: { dx: 0, dy: 1 }, W: { dx: -1, dy: 0 } },
  Un = ['N', 'E', 'S', 'W'];
function Rh(l) {
  return Un[(Un.indexOf(l) + 1) % 4];
}
function zh(l) {
  return Un[(Un.indexOf(l) + 3) % 4];
}
function z1(l) {
  return Un[(Un.indexOf(l) + 2) % 4];
}
const Hh = (l, i, o) => l >= 0 && i >= 0 && l < o.width && i < o.height;
function za(l, i, o, r) {
  if (l.cells[o][i].walls[r]) return !1;
  const c = i + el[r].dx,
    d = o + el[r].dy;
  return Hh(c, d, l) ? l.cells[d][c].passable : !1;
}
function H1(l, i, o) {
  return za(l, i.x, i.y, o) ? { x: i.x + el[o].dx, y: i.y + el[o].dy } : null;
}
function cd(l, i, o) {
  return ['N', 'E', 'S', 'W'].filter((r) => !l.cells[o][i].walls[r]);
}
function U1(l, i, o) {
  if (i.x === o.x && i.y === o.y) return [];
  if (!Hh(o.x, o.y, l) || !l.cells[o.y][o.x].passable) return null;
  const r = (f, h) => `${f},${h}`,
    c = new Map();
  c.set(r(i.x, i.y), null);
  const d = [{ ...i }];
  for (; d.length > 0; ) {
    const f = d.shift();
    for (const h of ['N', 'E', 'S', 'W']) {
      if (!za(l, f.x, f.y, h)) continue;
      const k = f.x + el[h].dx,
        p = f.y + el[h].dy,
        v = r(k, p);
      if (!c.has(v)) {
        if ((c.set(v, { x: f.x, y: f.y, dir: h }), k === o.x && p === o.y)) {
          const y = [];
          let E = v;
          for (;;) {
            const M = c.get(E);
            if (!M) break;
            (y.unshift(M.dir), (E = r(M.x, M.y)));
          }
          return y;
        }
        d.push({ x: k, y: p });
      }
    }
  }
  return null;
}
const Bp = ['N', 'E', 'S', 'W'],
  bc = (l, i) => Math.abs(l.x - i.x) + Math.abs(l.y - i.y);
function G1(l, i, o, r, c) {
  const d = i.map((v) => ({ ...v, cell: { ...v.cell } })),
    f = new Map(l.foeSpawns.map((v) => [v.id, v])),
    h = new Set(d.filter((v) => !v.defeated).map((v) => `${v.cell.x},${v.cell.y}`));
  let k = null;
  const p = [...d].sort((v, y) => v.spawnId.localeCompare(y.spawnId, void 0, { numeric: !0 }));
  for (const v of p) {
    if (k) break;
    if (v.defeated) continue;
    const y = f.get(v.spawnId);
    if (!y) continue;
    !v.alerted && bc(v.cell, o) <= y.sightRange && (v.alerted = !0);
    const E = (M) => {
      if (!za(l, v.cell.x, v.cell.y, M)) return 'blocked';
      const O = v.cell.x + el[M].dx,
        x = v.cell.y + el[M].dy;
      if (O === o.x && x === o.y) {
        const S = M === r;
        return (
          (k = { spawnId: v.spawnId, enemyId: y.enemyId, firstStrike: S ? 'ambush' : 'none' }),
          'contact'
        );
      }
      return h.has(`${O},${x}`)
        ? 'blocked'
        : (h.delete(`${v.cell.x},${v.cell.y}`),
          (v.cell = { x: O, y: x }),
          h.add(`${O},${x}`),
          'moved');
    };
    if (v.alerted)
      for (let M = 0; M < y.moveSpeed; M++) {
        let O = null,
          x = bc(v.cell, o),
          S = !1;
        for (const C of Bp) {
          const A = v.cell.x + el[C].dx,
            F = v.cell.y + el[C].dy;
          if (A === o.x && F === o.y && za(l, v.cell.x, v.cell.y, C)) {
            ((O = C), (S = !0));
            break;
          }
          if (!za(l, v.cell.x, v.cell.y, C) || h.has(`${A},${F}`)) continue;
          const P = bc({ x: A, y: F }, o);
          P < x && ((x = P), (O = C));
        }
        if (!O) break;
        const b = E(O);
        if (b === 'contact' || b === 'blocked' || S) break;
      }
    else {
      const M = y.patrol;
      if (M.kind === 'wander') {
        const O = Bp.filter(
          (x) =>
            za(l, v.cell.x, v.cell.y, x) && !h.has(`${v.cell.x + el[x].dx},${v.cell.y + el[x].dy}`)
        );
        O.length > 0 && E(c.pick(O));
      } else M.kind === 'charge' && E(M.dir);
    }
  }
  return { foes: d, contact: k };
}
const Ha = {
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
  $1 = Object.keys(Ha);
function Y1(l) {
  const i = Object.values(ul)
    .filter((o) => o.tierBand === l && o.kind === 'foe')
    .map((o) => o.id);
  return i.length > 0
    ? i
    : Object.values(ul)
        .filter((o) => o.tierBand === l && !o.isBoss && o.kind !== 'foe')
        .map((o) => o.id);
}
function X1(l) {
  const i = Object.values(ul).filter((r) => r.isBoss);
  if (i.length === 0) return null;
  const o = i.filter((r) => r.tierBand === l);
  return o.length > 0 ? o[0].id : i.sort((r, c) => c.tierBand - r.tierBand)[0].id;
}
function V1(l, i, o, r, c) {
  for (const d of ['N', 'E', 'S', 'W']) {
    if (l[o][i].walls[d]) continue;
    const f = i + il[d].dx,
      h = o + il[d].dy;
    if (Dr(f, h, r, c) && !l[h][f].event) return { x: f, y: h };
  }
  return null;
}
const il = { N: { dx: 0, dy: -1 }, E: { dx: 1, dy: 0 }, S: { dx: 0, dy: 1 }, W: { dx: -1, dy: 0 } },
  Q1 = { N: 'S', E: 'W', S: 'N', W: 'E' };
function K1(l) {
  return Math.min(25, 15 + Math.floor(l / 5));
}
function Z1() {
  return { walls: { N: !0, E: !0, S: !0, W: !0 }, floorType: 'normal', passable: !0 };
}
const Dr = (l, i, o, r) => l >= 0 && i >= 0 && l < o && i < r;
function Mp(l, i, o, r) {
  const { dx: c, dy: d } = il[r];
  ((l[o][i].walls[r] = !1), (l[o + d][i + c].walls[Q1[r]] = !1));
}
function J1(l, i, o) {
  const r = l.length,
    c = l[0].length,
    d = Array.from({ length: r }, () => Array(c).fill(-1)),
    f = [{ x: i, y: o }];
  d[o][i] = 0;
  for (let h = 0; h < f.length; h++) {
    const { x: k, y: p } = f[h];
    for (const v of ['N', 'E', 'S', 'W']) {
      if (l[p][k].walls[v]) continue;
      const y = k + il[v].dx,
        E = p + il[v].dy;
      !Dr(y, E, c, r) || d[E][y] !== -1 || ((d[E][y] = d[p][k] + 1), f.push({ x: y, y: E }));
    }
  }
  return d;
}
function P1(l, i) {
  const o = K1(l),
    r = o,
    c = o,
    d = Array.from({ length: c }, () => Array.from({ length: r }, () => Z1())),
    f = Array.from({ length: c }, () => Array(r).fill(!1)),
    h = i.int(r),
    k = i.int(c),
    p = [{ x: h, y: k }];
  for (f[k][h] = !0; p.length > 0; ) {
    const G = p[p.length - 1],
      U = [];
    for (const ce of ['N', 'E', 'S', 'W']) {
      const he = G.x + il[ce].dx,
        ve = G.y + il[ce].dy;
      Dr(he, ve, r, c) && !f[ve][he] && U.push(ce);
    }
    if (U.length === 0) {
      p.pop();
      continue;
    }
    const ae = i.pick(U);
    Mp(d, G.x, G.y, ae);
    const ie = G.x + il[ae].dx,
      le = G.y + il[ae].dy;
    ((f[le][ie] = !0), p.push({ x: ie, y: le }));
  }
  const v = Math.floor((r * c) / 25);
  for (let G = 0; G < v; G++) {
    const U = i.int(r),
      ae = i.int(c),
      ie = i.pick(['N', 'E', 'S', 'W']),
      le = U + il[ie].dx,
      ce = ae + il[ie].dy;
    Dr(le, ce, r, c) && d[ae][U].walls[ie] && Mp(d, U, ae, ie);
  }
  const y = i.int(r),
    E = i.int(c),
    M = J1(d, y, E);
  let O = y,
    x = E,
    S = -1;
  for (let G = 0; G < c; G++)
    for (let U = 0; U < r; U++) M[G][U] > S && ((S = M[G][U]), (O = U), (x = G));
  ((d[E][y].event = { kind: 'stairsDown' }), (d[x][O].event = { kind: 'stairsUp' }));
  const b = bh(l),
    C = [];
  if (Vi(l)) {
    const G = X1(b);
    if (G) {
      const U = V1(d, O, x, r, c) ?? { x: O, y: x };
      C.push({
        id: 'boss',
        enemyId: G,
        startCell: U,
        patrol: { kind: 'static' },
        moveSpeed: 0,
        sightRange: 0,
        respawn: !1,
        isBoss: !0,
      });
    }
  } else {
    const G = Y1(b),
      U = 1 + Math.floor(l / 8);
    for (let ae = 0; ae < U && G.length > 0; ae++) {
      let ie = i.int(r),
        le = i.int(c);
      for (let ce = 0; ce < 20; ce++) {
        ((ie = i.int(r)), (le = i.int(c)));
        const he = d[le][ie].event,
          ve = Math.abs(ie - y) + Math.abs(le - E) >= 3;
        if (!he && ve) break;
      }
      C.push({
        id: `foe_${ae}`,
        enemyId: i.pick(G),
        startCell: { x: ie, y: le },
        patrol: { kind: 'wander' },
        moveSpeed: 1,
        sightRange: 3,
        respawn: !1,
      });
    }
  }
  const A = [],
    F = () => {
      for (let G = 0; G < 25; G++) {
        const U = i.int(r),
          ae = i.int(c),
          ie = Math.abs(U - y) + Math.abs(ae - E) >= 2;
        if (!d[ae][U].event && ie) return { x: U, y: ae };
      }
      return null;
    },
    P = 2 + Math.floor(l / 10);
  for (let G = 0; G < P; G++) {
    const U = F();
    if (!U) break;
    const ae = i.pick($1),
      ie = `gather_${G}`;
    ((d[U.y][U.x].event = { kind: 'gather', gatherId: ie }), A.push({ id: ie, cell: U, type: ae }));
  }
  if (!Vi(l)) {
    const G = F();
    G && (d[G.y][G.x].event = { kind: 'cookingSpot', spotId: 'cook_0' });
  }
  return {
    depth: l,
    width: r,
    height: c,
    cells: d,
    encounterTable: `band_${b}`,
    foeSpawns: C,
    gatheringPoints: A,
    bgmId: Vi(l) ? 'bgm_boss' : 'bgm_dungeon',
  };
}
function Uh(l, i) {
  var o;
  for (let r = 0; r < l.height; r++)
    for (let c = 0; c < l.width; c++)
      if (((o = l.cells[r][c].event) == null ? void 0 : o.kind) === i) return { x: c, y: r };
  return null;
}
const F1 = 4294967296;
function W1(l, i) {
  let o = 3735928559 ^ l,
    r = 1103547991 ^ l;
  for (let c = 0; c < i.length; c++) {
    const d = i.charCodeAt(c);
    ((o = Math.imul(o ^ d, 2654435761)), (r = Math.imul(r ^ d, 1597334677)));
  }
  return (
    (o = Math.imul(o ^ (o >>> 16), 2246822507) ^ Math.imul(r ^ (r >>> 13), 3266489909)),
    (r = Math.imul(r ^ (r >>> 16), 2246822507) ^ Math.imul(o ^ (o >>> 13), 3266489909)),
    (r >>> 0) ^ (o >>> 0)
  );
}
class dd {
  constructor(i, o) {
    uc(this, 'baseSeed');
    uc(this, '_state');
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
      ((i ^ (i >>> 14)) >>> 0) / F1
    );
  }
  int(i) {
    return i <= 0 ? 0 : Math.floor(this.next() * i);
  }
  range(i, o) {
    o < i && ([i, o] = [o, i]);
    const r = o - i + 1;
    return i + this.int(r);
  }
  pick(i) {
    if (i.length === 0) throw new Error('Rng.pick: 空配列は選択できません');
    return i[this.int(i.length)];
  }
  fork(i) {
    const o = W1(this.baseSeed, i);
    return new dd(o, o);
  }
}
function va(l) {
  return new dd(l, l);
}
function ex() {
  return Math.floor(Math.random() * 4294967296) >>> 0;
}
const Rr = (l, i) => `${l},${i}`;
function tx(l, i) {
  return va(l).fork(`floor:${i}`);
}
function Gh(l, i) {
  const o = l.towerState.floors[i];
  if (o) return { save: l, floor: o };
  const r = P1(i, tx(l.masterSeed, i)),
    c = r.foeSpawns.map((h) => ({
      spawnId: h.id,
      cell: { ...h.startCell },
      defeated: !1,
      alerted: !1,
    })),
    d = {
      depth: i,
      seed: l.masterSeed,
      generated: r,
      isBossFloor: Vi(i),
      encounterTier: Math.floor((i - 1) / 10),
      foeRuntime: c,
      openedChests: [],
      depletedGathers: [],
      consumedEvents: [],
    };
  return {
    save: { ...l, towerState: { ...l.towerState, floors: { ...l.towerState.floors, [i]: d } } },
    floor: d,
  };
}
function lx(l) {
  const i = [...l.guild.party.front, ...l.guild.party.back].filter((r) => r !== null),
    o = [];
  for (const r of i) {
    const c = l.guild.members.find((f) => f.id === r);
    if (!c) continue;
    const d = Gl(c);
    o.push({ charId: r, hp: d.hp, tp: d.tp, unionGauge: 0, ailments: [] });
  }
  return o;
}
function zr(l, i, o, r) {
  const c = l.towerState.floors[i].generated,
    d = new Set(l.exploredCells[i] ?? []);
  d.add(Rr(o, r));
  for (const f of cd(c, o, r)) {
    const h = o + (f === 'E' ? 1 : f === 'W' ? -1 : 0),
      k = r + (f === 'S' ? 1 : f === 'N' ? -1 : 0);
    d.add(Rr(h, k));
  }
  return { ...l, exploredCells: { ...l.exploredCells, [i]: [...d] } };
}
function $h(l, i, o) {
  var k, p;
  const r = Gh(l, i);
  let c = r.save;
  const d = r.floor.generated,
    f = Uh(d, 'stairsDown') ?? { x: 0, y: 0 },
    h = cd(d, f.x, f.y)[0] ?? 'N';
  return (
    i > c.towerState.record.deepestReached &&
      (c = {
        ...c,
        towerState: { ...c.towerState, record: { ...c.towerState.record, deepestReached: i } },
      }),
    (c = {
      ...c,
      diveState: {
        depth: i,
        pos: { x: f.x, y: f.y },
        dir: h,
        party: ((k = c.diveState) == null ? void 0 : k.party) ?? lx(c),
        persistentSummons: ((p = c.diveState) == null ? void 0 : p.persistentSummons) ?? [],
        encounter: { stepsUntilEncounter: ud(o) },
        pendingFoeBattle: null,
      },
    }),
    zr(c, i, f.x, f.y)
  );
}
function Op(l, i = 1) {
  const o = va(l.masterSeed).fork(`dive:${l.towerState.record.totalDives}`),
    r = {
      ...l,
      diveState: null,
      towerState: {
        ...l.towerState,
        record: { ...l.towerState.record, totalDives: l.towerState.record.totalDives + 1 },
      },
    };
  return $h(r, i, o);
}
function Yh(l, i) {
  return l.diveState ? { ...l, diveState: { ...l.diveState, dir: i } } : l;
}
function Xh(l, i, o) {
  const r = l.towerState.floors[i];
  return {
    ...l,
    towerState: {
      ...l.towerState,
      floors: { ...l.towerState.floors, [i]: { ...r, foeRuntime: o } },
    },
  };
}
function Ip(l, i, o) {
  const r = l.diveState;
  if (!r) return { save: l, moved: !1, triggered: !1 };
  const c = l.towerState.floors[r.depth],
    d = c.generated,
    f = H1(d, r.pos, i);
  if (!f) return { save: Yh(l, i), moved: !1, triggered: !1 };
  const h = c.foeRuntime.find((y) => !y.defeated && y.cell.x === f.x && y.cell.y === f.y);
  if (h) {
    const y = d.foeSpawns.find((O) => O.id === h.spawnId),
      E = y
        ? {
            spawnId: h.spawnId,
            enemyId: y.enemyId,
            firstStrike: y.isBoss ? 'none' : 'preemptive',
            isBoss: y.isBoss,
          }
        : null;
    let M = { ...l, diveState: { ...r, pos: f, dir: i, pendingFoeBattle: E } };
    return ((M = zr(M, r.depth, f.x, f.y)), { save: M, moved: !0, triggered: E !== null });
  }
  const k = D1(r.encounter.stepsUntilEncounter, o);
  let p = {
    ...l,
    diveState: {
      ...r,
      pos: f,
      dir: i,
      encounter: { stepsUntilEncounter: k.stepsUntilEncounter },
      pendingFoeBattle: null,
    },
  };
  p = zr(p, r.depth, f.x, f.y);
  const v = G1(d, c.foeRuntime, f, i, o);
  return (
    (p = Xh(p, r.depth, v.foes)),
    v.contact
      ? ((p = {
          ...p,
          diveState: {
            ...p.diveState,
            pendingFoeBattle: {
              spawnId: v.contact.spawnId,
              enemyId: v.contact.enemyId,
              firstStrike: v.contact.firstStrike,
            },
          },
        }),
        { save: p, moved: !0, triggered: !0 })
      : { save: p, moved: !0, triggered: k.triggered }
  );
}
function ax(l, i) {
  const o = l.diveState;
  if (!o) return l;
  const r = o.pendingFoeBattle;
  let c = { ...l, diveState: { ...o, pendingFoeBattle: null } };
  if (r && i) {
    const f = c.towerState.floors[o.depth].foeRuntime.map((h) =>
      h.spawnId === r.spawnId ? { ...h, defeated: !0 } : h
    );
    ((c = Xh(c, o.depth, f)), r.isBoss && (c = nx(c, o.depth)));
  }
  return c;
}
function nx(l, i, o = Date.now()) {
  const r = l.towerState,
    c = { ...r.bossGates, [i]: { depth: i, defeated: !0 } },
    d = r.warp.unlockedCheckpoints.includes(i)
      ? r.warp.unlockedCheckpoints
      : [...r.warp.unlockedCheckpoints, i].sort((k, p) => k - p),
    f = r.record.bossDefeatLog.some((k) => k.depth === i),
    h = {
      ...r.record,
      highestBossDefeated: Math.max(r.record.highestBossDefeated, i),
      bossDefeatLog: f ? r.record.bossDefeatLog : [...r.record.bossDefeatLog, { depth: i, at: o }],
    };
  return {
    ...l,
    towerState: { ...r, bossGates: c, warp: { ...r.warp, unlockedCheckpoints: d }, record: h },
  };
}
function Vh(l, i) {
  var o;
  return Vi(i) ? ((o = l.towerState.bossGates[i]) == null ? void 0 : o.defeated) === !0 : !0;
}
function Dp(l) {
  const i = l.diveState;
  if (!i) return null;
  const o = l.towerState.floors[i.depth].generated.cells[i.pos.y][i.pos.x].event;
  return (o == null ? void 0 : o.kind) === 'stairsUp' ||
    (o == null ? void 0 : o.kind) === 'stairsDown'
    ? o.kind
    : null;
}
function ix(l) {
  if (!l.diveState || !Vh(l, l.diveState.depth)) return l;
  const i = l.diveState.depth + 1,
    o = va(l.masterSeed).fork(`enc:${i}:${l.towerState.record.totalDives}`);
  return $h(l, i, o);
}
function sx(l) {
  if (!l.diveState) return l;
  const i = l.diveState.depth;
  if (i <= 1) return Ji(l);
  const o = i - 1,
    r = Gh(l, o),
    c = Uh(r.floor.generated, 'stairsUp') ?? { x: 0, y: 0 },
    d = va(l.masterSeed).fork(`enc:${o}:${l.towerState.record.totalDives}`);
  let f = r.save;
  const h = r.floor.generated,
    k = cd(h, c.x, c.y)[0] ?? 'N';
  return (
    (f = {
      ...f,
      diveState: {
        ...f.diveState,
        depth: o,
        pos: { x: c.x, y: c.y },
        dir: k,
        encounter: { stepsUntilEncounter: ud(d) },
        pendingFoeBattle: null,
      },
    }),
    zr(f, o, c.x, c.y)
  );
}
function Ji(l) {
  return { ...l, diveState: null };
}
const Vn = {
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
function rx() {
  return Object.values(Vn)
    .filter((l) => l.unlockedByDefault)
    .map((l) => l.id);
}
const Ar = 2,
  ox = { autoMap: 'on', bgmVolume: 0.6, seVolume: 0.6 };
function Rp() {
  return { monsters: {}, items: {} };
}
function ux() {
  return { deepestReached: 0, highestBossDefeated: 0, totalDives: 0, bossDefeatLog: [] };
}
const cx = () => ({ weapon: null, armor: null, accessory: null });
function dx() {
  return `char_${Date.now().toString(36)}_${Math.floor(Math.random() * 16777215).toString(36)}`;
}
function Qh(l) {
  var h;
  const { raceId: i, classId: o, name: r, id: c } = l;
  if (!St[i]) throw new Error(`createCharacter: 未定義の種族 "${i}"`);
  if (!et[o]) throw new Error(`createCharacter: 未定義の職業 "${o}"`);
  const d = (h = et[o].skillTree.skills[0]) == null ? void 0 : h.skillId,
    f = d ? { [d]: 1 } : {};
  return {
    id: c ?? dx(),
    name: r,
    raceId: i,
    classId: o,
    titleId: null,
    level: 1,
    exp: 0,
    skillPoints: { total: 0, spent: 0 },
    learnedSkills: f,
    equipment: cx(),
  };
}
function mx() {
  return { front: Array(Yr).fill(null), back: Array(Xr).fill(null) };
}
function _x(l, i) {
  const o = l.front.indexOf(null);
  if (o !== -1) {
    const c = [...l.front];
    return ((c[o] = i), { ...l, front: c });
  }
  const r = l.back.indexOf(null);
  if (r !== -1) {
    const c = [...l.back];
    return ((c[r] = i), { ...l, back: c });
  }
  return l;
}
function fx(l, i) {
  return l.guild.members.length >= qc
    ? l
    : {
        ...l,
        guild: { ...l.guild, members: [...l.guild.members, i], party: _x(l.guild.party, i.id) },
      };
}
function px(l) {
  return {
    schemaVersion: Ar,
    savedAt: 0,
    masterSeed: ex(),
    settings: { ...ox },
    guild: {
      name: l,
      gold: Kb,
      members: [],
      party: mx(),
      storage: [],
      equipment: [],
      foodStorage: [],
      bestiary: Rp(),
    },
    towerState: { floors: {}, bossGates: {}, warp: { unlockedCheckpoints: [] }, record: ux() },
    diveState: null,
    bestiary: Rp(),
    playerMaps: {},
    exploredCells: {},
    forgeInventory: { fragments: {}, ingots: { copper: 0, silver: 0, gold: 0 } },
    shopStock: { unlockedTier: 0, unlockedItemIds: [] },
    unlockedRecipeIds: rx(),
    flags: {},
  };
}
const Rc = (l, i) => i.some((o) => l instanceof o);
let zp, Hp;
function hx() {
  return zp || (zp = [IDBDatabase, IDBObjectStore, IDBIndex, IDBCursor, IDBTransaction]);
}
function gx() {
  return (
    Hp ||
    (Hp = [
      IDBCursor.prototype.advance,
      IDBCursor.prototype.continue,
      IDBCursor.prototype.continuePrimaryKey,
    ])
  );
}
const zc = new WeakMap(),
  xc = new WeakMap(),
  Kr = new WeakMap();
function kx(l) {
  const i = new Promise((o, r) => {
    const c = () => {
        (l.removeEventListener('success', d), l.removeEventListener('error', f));
      },
      d = () => {
        (o(Ua(l.result)), c());
      },
      f = () => {
        (r(l.error), c());
      };
    (l.addEventListener('success', d), l.addEventListener('error', f));
  });
  return (Kr.set(i, l), i);
}
function vx(l) {
  if (zc.has(l)) return;
  const i = new Promise((o, r) => {
    const c = () => {
        (l.removeEventListener('complete', d),
          l.removeEventListener('error', f),
          l.removeEventListener('abort', f));
      },
      d = () => {
        (o(), c());
      },
      f = () => {
        (r(l.error || new DOMException('AbortError', 'AbortError')), c());
      };
    (l.addEventListener('complete', d),
      l.addEventListener('error', f),
      l.addEventListener('abort', f));
  });
  zc.set(l, i);
}
let Hc = {
  get(l, i, o) {
    if (l instanceof IDBTransaction) {
      if (i === 'done') return zc.get(l);
      if (i === 'store')
        return o.objectStoreNames[1] ? void 0 : o.objectStore(o.objectStoreNames[0]);
    }
    return Ua(l[i]);
  },
  set(l, i, o) {
    return ((l[i] = o), !0);
  },
  has(l, i) {
    return l instanceof IDBTransaction && (i === 'done' || i === 'store') ? !0 : i in l;
  },
};
function Kh(l) {
  Hc = l(Hc);
}
function yx(l) {
  return gx().includes(l)
    ? function (...i) {
        return (l.apply(Uc(this), i), Ua(this.request));
      }
    : function (...i) {
        return Ua(l.apply(Uc(this), i));
      };
}
function bx(l) {
  return typeof l == 'function'
    ? yx(l)
    : (l instanceof IDBTransaction && vx(l), Rc(l, hx()) ? new Proxy(l, Hc) : l);
}
function Ua(l) {
  if (l instanceof IDBRequest) return kx(l);
  if (xc.has(l)) return xc.get(l);
  const i = bx(l);
  return (i !== l && (xc.set(l, i), Kr.set(i, l)), i);
}
const Uc = (l) => Kr.get(l);
function xx(l, i, { blocked: o, upgrade: r, blocking: c, terminated: d } = {}) {
  const f = indexedDB.open(l, i),
    h = Ua(f);
  return (
    r &&
      f.addEventListener('upgradeneeded', (k) => {
        r(Ua(f.result), k.oldVersion, k.newVersion, Ua(f.transaction), k);
      }),
    o && f.addEventListener('blocked', (k) => o(k.oldVersion, k.newVersion, k)),
    h
      .then((k) => {
        (d && k.addEventListener('close', () => d()),
          c && k.addEventListener('versionchange', (p) => c(p.oldVersion, p.newVersion, p)));
      })
      .catch(() => {}),
    h
  );
}
const Sx = ['get', 'getKey', 'getAll', 'getAllKeys', 'count'],
  wx = ['put', 'add', 'delete', 'clear'],
  Sc = new Map();
function Up(l, i) {
  if (!(l instanceof IDBDatabase && !(i in l) && typeof i == 'string')) return;
  if (Sc.get(i)) return Sc.get(i);
  const o = i.replace(/FromIndex$/, ''),
    r = i !== o,
    c = wx.includes(o);
  if (!(o in (r ? IDBIndex : IDBObjectStore).prototype) || !(c || Sx.includes(o))) return;
  const d = async function (f, ...h) {
    const k = this.transaction(f, c ? 'readwrite' : 'readonly');
    let p = k.store;
    return (r && (p = p.index(h.shift())), (await Promise.all([p[o](...h), c && k.done]))[0]);
  };
  return (Sc.set(i, d), d);
}
Kh((l) => ({
  ...l,
  get: (i, o, r) => Up(i, o) || l.get(i, o, r),
  has: (i, o) => !!Up(i, o) || l.has(i, o),
}));
const Tx = ['continue', 'continuePrimaryKey', 'advance'],
  Gp = {},
  Gc = new WeakMap(),
  Zh = new WeakMap(),
  Ex = {
    get(l, i) {
      if (!Tx.includes(i)) return l[i];
      let o = Gp[i];
      return (
        o ||
          (o = Gp[i] =
            function (...r) {
              Gc.set(this, Zh.get(this)[i](...r));
            }),
        o
      );
    },
  };
async function* Cx(...l) {
  let i = this;
  if ((i instanceof IDBCursor || (i = await i.openCursor(...l)), !i)) return;
  i = i;
  const o = new Proxy(i, Ex);
  for (Zh.set(o, i), Kr.set(o, Uc(i)); i; )
    (yield o, (i = await (Gc.get(o) || i.continue())), Gc.delete(o));
}
function $p(l, i) {
  return (
    (i === Symbol.asyncIterator && Rc(l, [IDBIndex, IDBObjectStore, IDBCursor])) ||
    (i === 'iterate' && Rc(l, [IDBIndex, IDBObjectStore]))
  );
}
Kh((l) => ({
  ...l,
  get(i, o, r) {
    return $p(i, o) ? Cx : l.get(i, o, r);
  },
  has(i, o) {
    return $p(i, o) || l.has(i, o);
  },
}));
const Nx = { 1: (l) => jx(l) },
  wc = (l) => typeof l == 'object' && l !== null && !Array.isArray(l);
function jx(l) {
  const i = { ...l, schemaVersion: 2 };
  let o = 0;
  const r = (d) => ({ id: `eq_mig_${Date.now().toString(36)}_${o++}`, masterId: d, forgeLevel: 0 }),
    c = wc(i.guild) ? { ...i.guild } : {};
  return (
    Array.isArray(c.equipment) || (c.equipment = []),
    Array.isArray(c.foodStorage) || (c.foodStorage = []),
    Array.isArray(c.members) &&
      (c.members = c.members.map((d) => {
        if (!wc(d)) return d;
        const f = wc(d.equipment) ? { ...d.equipment } : {};
        for (const h of ['weapon', 'armor', 'accessory']) {
          const k = f[h];
          f[h] = typeof k == 'string' ? r(k) : (k ?? null);
        }
        return { ...d, equipment: f };
      })),
    (i.guild = c),
    Array.isArray(i.unlockedRecipeIds) || (i.unlockedRecipeIds = []),
    i
  );
}
function Ax(l) {
  return structuredClone(l);
}
function Dn(l) {
  return typeof l == 'object' && l !== null && !Array.isArray(l);
}
function Lx(l) {
  if (
    !Dn(l) ||
    typeof l.schemaVersion != 'number' ||
    typeof l.masterSeed != 'number' ||
    !Dn(l.guild)
  )
    return !1;
  const i = l.guild;
  return !(
    typeof i.name != 'string' ||
    !Array.isArray(i.members) ||
    !Array.isArray(i.equipment) ||
    !Dn(l.forgeInventory) ||
    !Dn(l.towerState) ||
    !Dn(l.towerState.record) ||
    typeof l.towerState.record.deepestReached != 'number'
  );
}
function Jh(l) {
  if (!Dn(l) || typeof l.schemaVersion != 'number')
    return { ok: !1, reason: 'セーブデータの構造が不正です' };
  let i = l.schemaVersion;
  if (i > Ar) return { ok: !1, reason: `未知のバージョン (${i} > ${Ar}) のセーブデータです` };
  let o = { ...l };
  for (; i < Ar; ) {
    const r = Nx[i];
    if (!r) return { ok: !1, reason: `バージョン ${i} の migration が未定義です` };
    ((o = r(o)), (i = typeof o.schemaVersion == 'number' ? o.schemaVersion : i + 1));
  }
  return Lx(o)
    ? { ok: !0, data: o }
    : { ok: !1, reason: 'migration 後のデータが SaveData の形をしていません' };
}
function qx(l) {
  return {
    guildName: l.guild.name,
    deepestReached: l.towerState.record.deepestReached,
    memberCount: l.guild.members.length,
    savedAt: l.savedAt,
  };
}
function Yp() {
  return {
    guildName: '(破損データ)',
    deepestReached: 0,
    memberCount: 0,
    savedAt: 0,
    corrupted: !0,
  };
}
const Bx = 'sekaiju-like-game',
  Mx = 1,
  Pi = 'saves',
  md = 'main';
let Tc = null;
function _d() {
  return (
    Tc ||
      (Tc = xx(Bx, Mx, {
        upgrade(l) {
          l.objectStoreNames.contains(Pi) || l.createObjectStore(Pi);
        },
      })),
    Tc
  );
}
async function Ec(l) {
  const i = { ...l, savedAt: Date.now() };
  return (await (await _d()).put(Pi, Ax(i), md), i);
}
async function Ox() {
  const i = await (await _d()).get(Pi, md);
  return i === void 0 ? { ok: !1, reason: 'empty' } : Jh(i);
}
async function Ix() {
  const i = await (await _d()).get(Pi, md);
  if (i === void 0) return null;
  const o = Jh(i);
  if (!o.ok) return Yp();
  try {
    return qx(o.data);
  } catch {
    return Yp();
  }
}
const Ph = { save: null, saving: !1 };
function Dx(l, i) {
  switch (i.type) {
    case 'load':
      return { ...l, save: i.save };
    case 'updateSave':
      return l.save ? { ...l, save: i.updater(l.save) } : l;
    case 'setSave':
      return { ...l, save: i.save };
    case 'saving':
      return { ...l, saving: i.saving };
    case 'clear':
      return { ...Ph };
  }
}
const Fh = T.createContext(null);
function Rx(l) {
  const i = T.useRef(l);
  return ((i.current = l), i);
}
function zx({ children: l }) {
  const [i, o] = T.useReducer(Dx, Ph),
    r = Rx(i),
    c = T.useCallback(async (y) => {
      const E = px(y),
        M = await Ec(E);
      o({ type: 'load', save: M });
    }, []),
    d = T.useCallback(async () => {
      const y = await Ox();
      return y.ok ? (o({ type: 'load', save: y.data }), { ok: !0 }) : { ok: !1, reason: y.reason };
    }, []),
    f = T.useCallback((y) => {
      o({ type: 'updateSave', updater: y });
    }, []),
    h = T.useCallback(
      async (y) => {
        const E = r.current.save;
        if (!E) return;
        const M = y(E);
        (o({ type: 'setSave', save: M }), o({ type: 'saving', saving: !0 }));
        try {
          const O = await Ec(M);
          o({ type: 'setSave', save: O });
        } finally {
          o({ type: 'saving', saving: !1 });
        }
      },
      [r]
    ),
    k = T.useCallback(async () => {
      const { save: y } = r.current;
      if (y) {
        o({ type: 'saving', saving: !0 });
        try {
          const E = await Ec(y);
          o({ type: 'setSave', save: E });
        } finally {
          o({ type: 'saving', saving: !1 });
        }
      }
    }, [r]),
    p = T.useCallback(() => {
      o({ type: 'clear' });
    }, []),
    v = T.useMemo(
      () => ({
        ...i,
        startNewGame: c,
        continueGame: d,
        applySave: f,
        applyAndPersist: h,
        persist: k,
        exitToTitle: p,
      }),
      [i, c, d, f, h, k, p]
    );
  return _.jsx(Fh.Provider, { value: v, children: l });
}
function Xl() {
  const l = T.useContext(Fh);
  if (!l) throw new Error('useGameState は GameStateProvider の内側で使ってください');
  return l;
}
const Hx = {
    slash: '斬',
    pierce: '突',
    bash: '壊',
    fire: '火',
    ice: '氷',
    volt: '雷',
    almighty: '無',
  },
  Ux = {
    enemyOne: '敵単体',
    enemyRow: '敵1列',
    enemyAll: '敵全体',
    allyOne: '味方単体',
    allyAll: '味方全体',
    self: '自分',
  },
  Gx = {
    patk: '物攻',
    pdef: '物防',
    matk: '魔攻',
    mdef: '魔防',
    acc: '命中',
    eva: '回避',
    elementResist: '属性耐性',
  },
  $x = {
    poison: '毒',
    paralysis: '麻痺',
    sleep: '睡眠',
    blind: '盲目',
    headBind: '頭封じ',
    armBind: '腕封じ',
    legBind: '脚封じ',
  };
function Yx(l, i) {
  switch (l.kind) {
    case 'damage':
      return `${l.statBase === 'str' ? '物理' : '魔法'}威力${Math.round(l.power(i) * 100)}%${l.hits && l.hits > 1 ? `×${l.hits}` : ''}`;
    case 'heal':
      return `HP回復${l.amount(i)}`;
    case 'restoreTp':
      return `TP回復${l.amount(i)}`;
    case 'buff':
      return `${Gx[l.stat]}${l.modifier(i) < 1 ? '↓' : '↑'}`;
    case 'ailment':
      return `${$x[l.ailment] ?? l.ailment}${Math.round(l.chance(i) * 100)}%`;
    case 'summon':
      return '召喚';
    case 'counter':
      return '反撃の構え';
    case 'chase':
      return '連携追撃の構え';
    case 'decoy':
      return '挑発';
    case 'barrier':
      return '障壁';
    case 'cleanse':
      return '状態異常治療';
    default:
      return '';
  }
}
function xr(l, i, o, r = 1) {
  return `${Hx[l] ?? l}・${Ux[i] ?? i}／${o.map((c) => Yx(c, r)).join('・')}`;
}
const Xx = {
  hp: 'HP',
  tp: 'TP',
  str: '腕力',
  vit: '体力',
  agi: '敏捷',
  int: '知力',
  mnd: '精神',
  luc: '幸運',
};
function Vx(l) {
  const i = {};
  for (const o of [...l.allies, ...l.enemies, ...l.summons])
    i[o.id] = { hp: o.hp, isDown: o.isDown };
  return i;
}
const Qx = () => {
    var ls, yt;
    const l = dl(),
      { save: i, applyAndPersist: o } = Xl(),
      r = T.useRef(null),
      [c, d] = T.useState(null),
      [f, h] = T.useState({}),
      [k, p] = T.useState(null),
      [v, y] = T.useState(!1),
      [E, M] = T.useState(!1),
      [O, x] = T.useState(null),
      [S, b] = T.useState(!1),
      [C, A] = T.useState(null),
      [F, P] = T.useState(null),
      [G, U] = T.useState(null),
      [ae, ie] = T.useState(new Set()),
      [le, ce] = T.useState(!0),
      [he, ve] = T.useState(null),
      [Se, ge] = T.useState([]);
    (T.useEffect(() => {
      if (c || !(i != null && i.diveState)) return;
      const q = i.diveState.depth,
        W = (i.masterSeed ^ (q * 2654435761) ^ (i.towerState.record.totalDives * 40503)) >>> 0;
      r.current = va(W);
      const se = i.diveState.pendingFoeBattle;
      d(se ? jp(i, [se.enemyId], se.firstStrike) : jp(i, i1(q, r.current)));
    }, [i, c]),
      T.useEffect(() => {
        if (!le) return;
        const q = setTimeout(() => ce(!1), 700);
        return () => clearTimeout(q);
      }, [le]));
    const L = T.useCallback(
        (q) => {
          if (!c || !r.current || c.outcome !== 'ongoing') return;
          const W = Vx(c),
            se = M1(c, q, r.current);
          (d(se),
            h({}),
            y(!1),
            M(!1),
            A(null),
            P(null),
            p(null),
            ie(new Set()),
            U(se.log.length > 0 ? { base: W, revealed: 0 } : null));
        },
        [c]
      ),
      Q = T.useRef(!1);
    (T.useEffect(() => {
      !c ||
        !r.current ||
        Q.current ||
        le ||
        (c.turn === 1 &&
          c.firstStrike === 'ambush' &&
          c.outcome === 'ongoing' &&
          ((Q.current = !0), L([])));
    }, [c, le, L]),
      T.useEffect(() => {
        if (!c || !G) return;
        if (G.revealed >= c.log.length) {
          const W = setTimeout(() => {
            (U(null), ie(new Set()));
          }, 200);
          return () => clearTimeout(W);
        }
        const q = setTimeout(
          () => {
            var Vl, as;
            const W = G.revealed,
              se = (Vl = c.log[W]) == null ? void 0 : Vl.snapshot,
              me =
                W > 0 ? (((as = c.log[W - 1]) == null ? void 0 : as.snapshot) ?? G.base) : G.base,
              Ve = new Set();
            if (se)
              for (const Qa of Object.keys(se)) {
                const yl = me == null ? void 0 : me[Qa];
                yl && (se[Qa].hp < yl.hp || (se[Qa].isDown && !yl.isDown)) && Ve.add(Qa);
              }
            (ie(Ve), U({ ...G, revealed: G.revealed + 1 }));
          },
          G.revealed === 0 ? 240 : 540
        );
        return () => clearTimeout(q);
      }, [c, G]));
    const $ = T.useMemo(() => (c && c.outcome === 'win' && i ? O1(i, c) : []), [c, i]);
    T.useEffect(() => {
      (c == null ? void 0 : c.outcome) === 'win' &&
        !G &&
        ge($.filter((q) => q.toLevel > q.fromLevel));
    }, [c == null ? void 0 : c.outcome, G, $]);
    const Z = T.useMemo(() => (c == null ? void 0 : c.enemies.filter((q) => !q.isDown)) ?? [], [c]),
      te = T.useMemo(() => (c == null ? void 0 : c.allies.filter((q) => !q.isDown)) ?? [], [c]);
    (T.useEffect(() => {
      Z.length > 0 && !Z.some((q) => q.id === O) && x(Z[0].id);
    }, [Z, O]),
      T.useEffect(() => {
        if ((c == null ? void 0 : c.outcome) !== 'ongoing' || (k && te.some((W) => W.id === k)))
          return;
        const q = te.find((W) => !f[W.id]) ?? null;
        p(q ? q.id : null);
      }, [c, te, k, f]));
    const N = te.length > 0 && te.every((q) => f[q.id] !== void 0),
      H = T.useCallback(
        (q, W) => {
          const se = { ...f, [q]: W };
          (h(se), y(!1), M(!1));
          const me = te.find((Ve) => Ve.id !== q && !se[Ve.id]);
          p(me ? me.id : null);
        },
        [f, te]
      ),
      J = T.useCallback(
        async (q) => {
          (b(!0),
            ve(q.outcome === 'lose' ? 'lose' : q.outcome === 'fled' ? 'fled' : 'win'),
            await new Promise((se) => setTimeout(se, 460)));
          const W = q.outcome === 'win';
          q.outcome === 'lose'
            ? (await o((se) => Ji(qp(se, q))), l('/town'))
            : (await o((se) => ax(qp(se, q), W)), l('/dungeon'));
        },
        [o, l]
      ),
      ee = T.useCallback(() => {
        var q;
        (h({}), y(!1), M(!1), A(null), P(null), p(((q = te[0]) == null ? void 0 : q.id) ?? null));
      }, [te]),
      ne = T.useCallback(() => {
        var se;
        if (!c || !r.current || c.outcome !== 'ongoing') return;
        const q = O ?? ((se = Z[0]) == null ? void 0 : se.id) ?? '',
          W = te.map((me) => {
            const Ve = f[me.id] ?? { kind: 'attack' };
            return Ve.kind === 'guard'
              ? { kind: 'guard', actorId: me.id }
              : Ve.kind === 'skill'
                ? { kind: 'skill', actorId: me.id, skillId: Ve.skillId, targetId: q }
                : Ve.kind === 'item'
                  ? { kind: 'item', actorId: me.id, itemId: Ve.itemId, targetId: me.id }
                  : { kind: 'attack', actorId: me.id, targetId: q };
          });
        if (C) {
          const me = Rn[C.unionSkillId],
            Ve =
              (me == null ? void 0 : me.target) === 'enemyOne' ||
              (me == null ? void 0 : me.target) === 'enemyRow' ||
              (me == null ? void 0 : me.target) === 'enemyAll';
          W.unshift({ kind: 'union', ...C, targetId: Ve ? q : C.targetId });
        }
        L(W);
      }, [c, f, O, te, Z, C, L]),
      _e = T.useCallback(() => {
        if (!c || !r.current || c.outcome !== 'ongoing') return;
        const q = te[0];
        q && L([{ kind: 'flee', actorId: q.id }]);
      }, [c, te, L]);
    if (!i || !i.diveState) return _.jsx(ol, { to: '/town', replace: !0 });
    if (!c) return _.jsx('div', { className: K.layout, children: '戦闘準備中...' });
    const be = (q) => {
        const W = i.guild.members.find((se) => se.id === q.id);
        return W
          ? Object.keys(W.learnedSkills).filter((se) => se in Wt && q.tp >= Wt[se].tpCost(1))
          : [];
      },
      Je = () => {
        const q = (se) =>
            Object.values(f).filter((me) => me.kind === 'item' && me.itemId === se).length,
          W = (se) => c.consumedItems.filter((me) => me === se).length;
        return i.guild.storage
          .filter((se) => {
            var me, Ve;
            return (Ve = (me = tt[se.itemId]) == null ? void 0 : me.useContext) == null
              ? void 0
              : Ve.includes('battle');
          })
          .map((se) => ({
            id: se.itemId,
            remaining: Eh(i, se.itemId) - W(se.itemId) - q(se.itemId),
          }))
          .filter((se) => se.remaining > 0);
      },
      Ge = (q) => {
        var se, me;
        const W = f[q.id];
        return W
          ? W.kind === 'attack'
            ? '攻撃'
            : W.kind === 'guard'
              ? '防御'
              : W.kind === 'item'
                ? (((se = tt[W.itemId]) == null ? void 0 : se.name) ?? 'どうぐ')
                : (((me = Wt[W.skillId]) == null ? void 0 : me.name) ?? 'スキル')
          : '';
      },
      ml = (q) => {
        const W = (me) => me === 'headBind' || me === 'armBind' || me === 'legBind';
        let se = '';
        return (
          q.ailments.some((me) => W(me.type)) && (se += ' 🔒'),
          q.ailments.some((me) => !W(me.type)) && (se += ' 🌀'),
          se
        );
      },
      Ga = (q) => {
        var se;
        const W = i.guild.members.find((me) => me.id === q.id);
        return W ? (((se = et[W.classId]) == null ? void 0 : se.name) ?? '') : '';
      },
      ya = G
        ? G.revealed > 0
          ? (((ls = c.log[G.revealed - 1]) == null ? void 0 : ls.snapshot) ?? G.base)
          : G.base
        : null,
      $a = (q) => (ya == null ? void 0 : ya[q.id]) ?? { hp: q.hp, isDown: q.isDown },
      _l = (q) => {
        var me;
        const W = i.guild.members.find((Ve) => Ve.id === q.id);
        if (!W) return null;
        const se =
          (me = St[W.raceId]) == null
            ? void 0
            : me.raceSkillTree.skills.find((Ve) => Ve.skillId in Rn);
        return !se || !(se.skillId in W.learnedSkills) ? null : (Rn[se.skillId] ?? null);
      },
      Ya = (q, W, se) => {
        var Vl;
        const Ve =
          W.target === 'enemyOne' || W.target === 'enemyRow' || W.target === 'enemyAll'
            ? (O ?? ((Vl = Z[0]) == null ? void 0 : Vl.id) ?? '')
            : q;
        (A({ actorId: q, unionSkillId: W.id, participantIds: se, targetId: Ve }), P(null));
      },
      Qn = (q, W) => {
        W.requiredParticipants <= 1 ? Ya(q.id, W, [q.id]) : P({ actorId: q.id, def: W });
      },
      vt = k ? te.find((q) => q.id === k) : void 0,
      es = ((yt = c.enemies.find((q) => q.id === O)) == null ? void 0 : yt.name) ?? '-',
      Xa = od(c),
      Va = (q) => {
        const W = $a(q);
        return _.jsxs(
          'button',
          {
            type: 'button',
            className: [
              K.card,
              W.isDown ? K.down : '',
              k === q.id ? K.cardActive : '',
              f[q.id] ? K.cardDecided : '',
              ae.has(q.id) ? K.flash : '',
            ].join(' '),
            disabled: q.isDown || c.outcome !== 'ongoing' || !!G,
            onClick: () => {
              (p(q.id), y(!1), M(!1));
            },
            children: [
              _.jsxs('div', {
                className: K.cardName,
                children: [
                  q.name,
                  q.unionGauge >= 100 ? _.jsx('span', { className: K.uni, children: '★' }) : null,
                  ml(q),
                ],
              }),
              _.jsx('div', { className: K.cardJob, children: Ga(q) }),
              _.jsx(Bn, { value: W.hp, max: q.maxHp, color: '#4caf50', showValue: !1 }),
              _.jsx(Bn, { value: q.tp, max: q.maxTp, color: '#2196f3', showValue: !1 }),
              _.jsxs('div', {
                className: K.cardNums,
                children: ['HP ', Math.max(0, W.hp), ' · TP ', q.tp],
              }),
              _.jsxs('div', {
                className: K.gaugeRow,
                children: [
                  _.jsx(Bn, { value: q.unionGauge, max: 100, color: '#ff9800', showValue: !1 }),
                  _.jsxs('span', { className: K.gaugeLabel, children: ['U ', q.unionGauge, '%'] }),
                ],
              }),
              f[q.id] ? _.jsxs('div', { className: K.cardCmd, children: ['▶ ', Ge(q)] }) : null,
            ],
          },
          q.id
        );
      },
      Kn = c.allies.filter((q) => q.row === 'front'),
      ts = c.allies.filter((q) => q.row === 'back');
    return _.jsxs('div', {
      className: K.layout,
      children: [
        _.jsx('div', {
          className: K.enemies,
          children: c.enemies.map((q) => {
            const W = $a(q);
            return _.jsxs(
              'button',
              {
                type: 'button',
                className: `${K.enemy} ${W.isDown ? K.down : ''} ${O === q.id ? K.targeted : ''} ${ae.has(q.id) ? K.flash : ''}`,
                disabled: q.isDown || !!G,
                onClick: () => x(q.id),
                children: [
                  _.jsxs('span', { className: K.enemyName, children: [q.name, ml(q)] }),
                  _.jsx(Bn, { value: W.hp, max: q.maxHp, color: '#e57373', showValue: !1 }),
                ],
              },
              q.id
            );
          }),
        }),
        c.summons.length > 0
          ? _.jsx('div', {
              className: K.summons,
              children: c.summons.map((q) => {
                const W = $a(q);
                return _.jsxs(
                  'div',
                  {
                    className: `${K.summon} ${W.isDown ? K.down : ''} ${ae.has(q.id) ? K.flash : ''}`,
                    children: [
                      _.jsxs('span', { className: K.summonName, children: ['🐾 ', q.name] }),
                      _.jsx(Bn, { value: W.hp, max: q.maxHp, color: '#8d6e63', showValue: !1 }),
                      _.jsxs('span', {
                        className: K.summonHp,
                        children: ['HP ', Math.max(0, W.hp)],
                      }),
                    ],
                  },
                  q.id
                );
              }),
            })
          : null,
        _.jsxs('div', {
          className: K.party,
          children: [
            _.jsx('div', { className: K.rowTag, children: '前衛' }),
            _.jsx('div', { className: K.cardRow, children: Kn.map(Va) }),
            _.jsx('div', { className: K.rowTag, children: '後衛（近接ダメージ -30%）' }),
            _.jsx('div', {
              className: K.cardRow,
              children:
                ts.length > 0
                  ? ts.map(Va)
                  : _.jsx('div', { className: K.empty, children: '（なし）' }),
            }),
          ],
        }),
        G
          ? _.jsxs('div', {
              className: K.playback,
              children: [
                _.jsx('span', { className: K.playbackHint, children: '戦況を再生中…' }),
                _.jsx('button', {
                  type: 'button',
                  className: K.skip,
                  onClick: () => {
                    (U(null), ie(new Set()));
                  },
                  children: '▶▶ スキップ',
                }),
              ],
            })
          : c.outcome !== 'ongoing'
            ? _.jsxs('div', {
                className: K.result,
                children: [
                  _.jsx('div', {
                    className: K.resultTitle,
                    children:
                      c.outcome === 'win'
                        ? '勝利！'
                        : c.outcome === 'fled'
                          ? '逃走した'
                          : '全滅...',
                  }),
                  c.outcome === 'win'
                    ? _.jsxs(_.Fragment, {
                        children: [
                          _.jsxs('div', {
                            className: K.resultBody,
                            children: ['経験値 ', Xa.exp, ' ／ ', Xa.gold, ' G を獲得'],
                          }),
                          _.jsx('div', {
                            className: K.expList,
                            children: $.map((q) =>
                              _.jsxs(
                                'div',
                                {
                                  className: K.expRow,
                                  children: [
                                    _.jsxs('span', {
                                      className: K.expName,
                                      children: [
                                        q.name,
                                        _.jsxs('span', {
                                          className: K.expLv,
                                          children: [
                                            'Lv',
                                            q.toLevel,
                                            q.toLevel > q.fromLevel
                                              ? _.jsxs('span', {
                                                  className: K.expUp,
                                                  children: [' ↑', q.toLevel - q.fromLevel],
                                                })
                                              : null,
                                          ],
                                        }),
                                      ],
                                    }),
                                    _.jsx(Bn, {
                                      value: q.expToNext > 0 ? q.exp : 1,
                                      max: q.expToNext > 0 ? q.expToNext : 1,
                                      color: '#ffca28',
                                      showValue: !1,
                                    }),
                                    _.jsxs('span', {
                                      className: K.expNum,
                                      children: [
                                        q.expToNext > 0
                                          ? `次まで ${Math.max(0, q.expToNext - q.exp)}`
                                          : 'MAX',
                                        q.gainedExp > 0 ? `（+${q.gainedExp}）` : '',
                                      ],
                                    }),
                                  ],
                                },
                                q.charId
                              )
                            ),
                          }),
                        ],
                      })
                    : c.outcome === 'lose'
                      ? _.jsx('div', { className: K.resultBody, children: '拠点へ帰還する' })
                      : null,
                  _.jsx('button', {
                    type: 'button',
                    className: K.primary,
                    disabled: S || Se.length > 0,
                    onClick: () => void J(c),
                    children: 'つづける',
                  }),
                ],
              })
            : _.jsxs('div', {
                className: K.command,
                children: [
                  _.jsxs('div', {
                    className: K.target,
                    children: ['対象: ', es, '（敵をタップで変更）'],
                  }),
                  C
                    ? (() => {
                        const q = Rn[C.unionSkillId];
                        return _.jsxs('div', {
                          className: K.unionBanner,
                          children: [
                            _.jsxs('div', {
                              className: K.unionBannerHead,
                              children: [
                                '⚡ ユニオン予約: ',
                                q == null ? void 0 : q.name,
                                _.jsx('button', {
                                  type: 'button',
                                  className: K.unionCancel,
                                  onClick: () => A(null),
                                  children: '取消',
                                }),
                              ],
                            }),
                            q
                              ? _.jsxs('div', {
                                  className: K.unionBannerDesc,
                                  children: [
                                    xr(q.element, q.target, q.effects),
                                    _.jsx('br', {}),
                                    q.description,
                                  ],
                                })
                              : null,
                          ],
                        });
                      })()
                    : null,
                  vt
                    ? _.jsxs(_.Fragment, {
                        children: [
                          _.jsxs('div', {
                            className: K.cmdHead,
                            children: [vt.name, ' のコマンド'],
                          }),
                          v
                            ? _.jsxs('div', {
                                className: K.skillList,
                                children: [
                                  be(vt).map((q) => {
                                    var W;
                                    return _.jsxs(
                                      'button',
                                      {
                                        type: 'button',
                                        className: K.skillBtn,
                                        onClick: () => H(vt.id, { kind: 'skill', skillId: q }),
                                        children: [
                                          _.jsxs('span', {
                                            className: K.skillTop,
                                            children: [
                                              _.jsx('span', {
                                                className: K.skillName,
                                                children: Wt[q].name,
                                              }),
                                              _.jsxs('span', {
                                                className: K.tp,
                                                children: ['TP ', Wt[q].tpCost(1)],
                                              }),
                                            ],
                                          }),
                                          _.jsx('span', {
                                            className: K.skillSummary,
                                            children: xr(
                                              Wt[q].element,
                                              Wt[q].target,
                                              Wt[q].effects
                                            ),
                                          }),
                                          _.jsx('span', {
                                            className: K.skillDesc,
                                            children:
                                              ((W = Yi[q]) == null ? void 0 : W.description) ?? '',
                                          }),
                                        ],
                                      },
                                      q
                                    );
                                  }),
                                  be(vt).length === 0
                                    ? _.jsx('div', {
                                        className: K.empty,
                                        children: '使えるスキルがない',
                                      })
                                    : null,
                                  _.jsx('button', {
                                    type: 'button',
                                    className: K.menuBack,
                                    onClick: () => y(!1),
                                    children: 'もどる',
                                  }),
                                ],
                              })
                            : E
                              ? _.jsxs('div', {
                                  className: K.skillList,
                                  children: [
                                    Je().map(({ id: q, remaining: W }) =>
                                      _.jsxs(
                                        'button',
                                        {
                                          type: 'button',
                                          className: K.skillBtn,
                                          onClick: () => H(vt.id, { kind: 'item', itemId: q }),
                                          children: [
                                            _.jsx('span', {
                                              className: K.skillTop,
                                              children: _.jsxs('span', {
                                                className: K.skillName,
                                                children: [tt[q].name, ' ×', W],
                                              }),
                                            }),
                                            _.jsx('span', {
                                              className: K.skillDesc,
                                              children: tt[q].description,
                                            }),
                                          ],
                                        },
                                        q
                                      )
                                    ),
                                    Je().length === 0
                                      ? _.jsx('div', {
                                          className: K.empty,
                                          children: '使える道具がない',
                                        })
                                      : null,
                                    _.jsx('button', {
                                      type: 'button',
                                      className: K.menuBack,
                                      onClick: () => M(!1),
                                      children: 'もどる',
                                    }),
                                  ],
                                })
                              : F
                                ? _.jsxs('div', {
                                    className: K.skillList,
                                    children: [
                                      _.jsxs('div', {
                                        className: K.unionHint,
                                        children: [
                                          _.jsx('strong', { children: F.def.name }),
                                          _.jsx('br', {}),
                                          xr(F.def.element, F.def.target, F.def.effects),
                                          _.jsx('br', {}),
                                          F.def.description,
                                          _.jsx('br', {}),
                                          '協力者を選択（あと',
                                          F.def.requiredParticipants - 1,
                                          '人。各自ゲージ',
                                          F.def.gaugeCostPerParticipant,
                                          '消費）',
                                        ],
                                      }),
                                      te
                                        .filter((q) => q.id !== F.actorId)
                                        .map((q) =>
                                          _.jsx(
                                            'button',
                                            {
                                              type: 'button',
                                              className: K.skillBtn,
                                              onClick: () =>
                                                Ya(F.actorId, F.def, [F.actorId, q.id]),
                                              children: _.jsxs('span', {
                                                className: K.skillTop,
                                                children: [
                                                  _.jsx('span', {
                                                    className: K.skillName,
                                                    children: q.name,
                                                  }),
                                                  _.jsxs('span', {
                                                    className: K.tp,
                                                    children: ['ゲージ ', q.unionGauge],
                                                  }),
                                                ],
                                              }),
                                            },
                                            q.id
                                          )
                                        ),
                                      te.filter((q) => q.id !== F.actorId).length === 0
                                        ? _.jsx('div', {
                                            className: K.empty,
                                            children: '協力できる味方がいない',
                                          })
                                        : null,
                                      _.jsx('button', {
                                        type: 'button',
                                        className: K.menuBack,
                                        onClick: () => P(null),
                                        children: 'もどる',
                                      }),
                                    ],
                                  })
                                : _.jsxs(_.Fragment, {
                                    children: [
                                      (() => {
                                        const q = _l(vt);
                                        return !q || vt.unionGauge < 100 || C
                                          ? null
                                          : _.jsxs('div', {
                                              className: K.unionInfo,
                                              children: [
                                                '⚡ ',
                                                _.jsx('strong', { children: q.name }),
                                                ' 発動可（ゲージ100%）',
                                                _.jsx('br', {}),
                                                xr(q.element, q.target, q.effects),
                                              ],
                                            });
                                      })(),
                                      _.jsxs('div', {
                                        className: K.menu,
                                        children: [
                                          _.jsx('button', {
                                            type: 'button',
                                            className: K.menuBtn,
                                            onClick: () => H(vt.id, { kind: 'attack' }),
                                            children: '攻撃',
                                          }),
                                          _.jsx('button', {
                                            type: 'button',
                                            className: K.menuBtn,
                                            onClick: () => H(vt.id, { kind: 'guard' }),
                                            children: '防御',
                                          }),
                                          _.jsx('button', {
                                            type: 'button',
                                            className: K.menuBtn,
                                            disabled: be(vt).length === 0,
                                            onClick: () => y(!0),
                                            children: 'スキル',
                                          }),
                                          _.jsx('button', {
                                            type: 'button',
                                            className: K.menuBtn,
                                            disabled: Je().length === 0,
                                            onClick: () => M(!0),
                                            children: 'どうぐ',
                                          }),
                                          (() => {
                                            const q = _l(vt);
                                            return !q || vt.unionGauge < 100 || C
                                              ? null
                                              : _.jsx('button', {
                                                  type: 'button',
                                                  className: `${K.menuBtn} ${K.unionBtn}`,
                                                  onClick: () => Qn(vt, q),
                                                  children: '⚡ユニオン',
                                                });
                                          })(),
                                          _.jsx('button', {
                                            type: 'button',
                                            className: K.menuBtn,
                                            onClick: _e,
                                            children: '逃走',
                                          }),
                                        ],
                                      }),
                                    ],
                                  }),
                        ],
                      })
                    : _.jsxs('div', {
                        className: K.execRow,
                        children: [
                          _.jsx('button', {
                            type: 'button',
                            className: K.redo,
                            onClick: ee,
                            children: 'やり直す',
                          }),
                          _.jsx('button', {
                            type: 'button',
                            className: K.primary,
                            disabled: !N,
                            onClick: ne,
                            children: '実行',
                          }),
                        ],
                      }),
                ],
              }),
        _.jsx('div', {
          className: K.log,
          children: (() => {
            const q = G ? c.log.slice(0, G.revealed) : c.log;
            return q.length === 0
              ? _.jsxs('div', {
                  className: K.logLine,
                  children: ['てきが あらわれた！（', c.turn, ' ターン目）'],
                })
              : q.map((W, se) =>
                  _.jsx(
                    'div',
                    {
                      className: `${K.logLine} ${G && se === q.length - 1 ? K.logLineNew : ''}`,
                      children: W.text,
                    },
                    se
                  )
                );
          })(),
        }),
        Se.length > 0
          ? (() => {
              const q = Se[0];
              return _.jsx('div', {
                className: K.dialogOverlay,
                children: _.jsxs('div', {
                  className: K.dialog,
                  children: [
                    _.jsx('div', { className: K.dialogTitle, children: 'レベルアップ！' }),
                    _.jsxs('div', {
                      className: K.dialogName,
                      children: [
                        q.name,
                        ' は Lv',
                        q.fromLevel,
                        ' → ',
                        _.jsxs('strong', { children: ['Lv', q.toLevel] }),
                        ' になった！',
                      ],
                    }),
                    _.jsx('div', {
                      className: K.dialogStats,
                      children: Object.entries(q.statGains).map(([W, se]) =>
                        _.jsxs(
                          'span',
                          { className: K.dialogStat, children: [Xx[W] ?? W, ' +', se] },
                          W
                        )
                      ),
                    }),
                    _.jsx('button', {
                      type: 'button',
                      className: K.primary,
                      onClick: () => ge((W) => W.slice(1)),
                      children: 'OK',
                    }),
                  ],
                }),
              });
            })()
          : null,
        le ? _.jsx('div', { className: K.fxIntro }) : null,
        he ? _.jsx('div', { className: `${K.fxOutro} ${he === 'lose' ? K.fxLose : ''}` }) : null,
      ],
    });
  },
  Kx = '_layout_iunlg_1',
  Zx = '_head_iunlg_11',
  Jx = '_title_iunlg_15',
  Px = '_tabs_iunlg_21',
  Fx = '_tab_iunlg_21',
  Wx = '_tabActive_iunlg_38',
  e3 = '_records_iunlg_43',
  t3 = '_statBig_iunlg_48',
  l3 = '_statNum_iunlg_60',
  a3 = '_statLabel_iunlg_67',
  n3 = '_statList_iunlg_72',
  i3 = '_statRow_iunlg_76',
  s3 = '_h2_iunlg_91',
  r3 = '_bossLog_iunlg_97',
  o3 = '_bossRow_iunlg_106',
  u3 = '_codex_iunlg_114',
  c3 = '_codexSummary_iunlg_121',
  d3 = '_list_iunlg_127',
  m3 = '_row_iunlg_133',
  _3 = '_unseen_iunlg_140',
  f3 = '_info_iunlg_144',
  p3 = '_name_iunlg_150',
  h3 = '_badge_iunlg_158',
  g3 = '_sub_iunlg_167',
  k3 = '_empty_iunlg_172',
  v3 = '_foot_iunlg_177',
  y3 = '_back_iunlg_181',
  qe = {
    layout: Kx,
    head: Zx,
    title: Jx,
    tabs: Px,
    tab: Fx,
    tabActive: Wx,
    records: e3,
    statBig: t3,
    statNum: l3,
    statLabel: a3,
    statList: n3,
    statRow: i3,
    h2: s3,
    bossLog: r3,
    bossRow: o3,
    codex: u3,
    codexSummary: c3,
    list: d3,
    row: m3,
    unseen: _3,
    info: f3,
    name: p3,
    badge: h3,
    sub: g3,
    empty: k3,
    foot: v3,
    back: y3,
  };
function Wh(l) {
  const i = l.bestiary.monsters;
  return Object.values(ul)
    .slice()
    .sort((o, r) => o.tierBand - r.tierBand || o.id.localeCompare(r.id))
    .map((o) => {
      const r = i[o.id],
        c = new Set((r == null ? void 0 : r.dropsFound) ?? []);
      return {
        id: o.id,
        name: o.name,
        tierBand: o.tierBand,
        seen: (r == null ? void 0 : r.seen) ?? !1,
        defeated: (r == null ? void 0 : r.defeated) ?? !1,
        drops: (o.drops ?? []).map((d) => {
          var f;
          return {
            itemId: d.itemId,
            name: ((f = tt[d.itemId]) == null ? void 0 : f.name) ?? d.itemId,
            found: c.has(d.itemId),
          };
        }),
      };
    });
}
function b3(l) {
  const i = Wh(l),
    o = i.length,
    r = i.filter((v) => v.seen).length,
    c = i.filter((v) => v.defeated).length;
  let d = 0,
    f = 0;
  for (const v of i) for (const y of v.drops) ((d += 1), y.found && (f += 1));
  const h = o + d,
    k = c + f,
    p = h === 0 ? 0 : Math.round((k / h) * 100);
  return {
    monstersTotal: o,
    monstersSeen: r,
    monstersDefeated: c,
    dropsTotal: d,
    dropsFound: f,
    completionPct: p,
  };
}
const x3 = () => {
    const l = dl(),
      { save: i } = Xl(),
      [o, r] = T.useState('record');
    if (!i) return _.jsx(ol, { to: '/title', replace: !0 });
    const c = i.towerState.record,
      d = b3(i),
      f = Wh(i);
    return _.jsxs('div', {
      className: qe.layout,
      children: [
        _.jsx('header', {
          className: qe.head,
          children: _.jsx('h1', { className: qe.title, children: '図鑑 / 記録' }),
        }),
        _.jsxs('div', {
          className: qe.tabs,
          children: [
            _.jsx('button', {
              type: 'button',
              className: `${qe.tab} ${o === 'record' ? qe.tabActive : ''}`,
              onClick: () => r('record'),
              children: '到達記録',
            }),
            _.jsx('button', {
              type: 'button',
              className: `${qe.tab} ${o === 'codex' ? qe.tabActive : ''}`,
              onClick: () => r('codex'),
              children: '図鑑',
            }),
          ],
        }),
        o === 'record'
          ? _.jsxs('div', {
              className: qe.records,
              children: [
                _.jsxs('div', {
                  className: qe.statBig,
                  children: [
                    _.jsx('span', { className: qe.statNum, children: c.deepestReached }),
                    _.jsx('span', { className: qe.statLabel, children: '最深到達階' }),
                  ],
                }),
                _.jsxs('dl', {
                  className: qe.statList,
                  children: [
                    _.jsxs('div', {
                      className: qe.statRow,
                      children: [
                        _.jsx('dt', { children: '最高撃破ボス階' }),
                        _.jsx('dd', {
                          children: c.highestBossDefeated > 0 ? `${c.highestBossDefeated}F` : '—',
                        }),
                      ],
                    }),
                    _.jsxs('div', {
                      className: qe.statRow,
                      children: [
                        _.jsx('dt', { children: '挑戦回数' }),
                        _.jsx('dd', { children: c.totalDives }),
                      ],
                    }),
                    _.jsxs('div', {
                      className: qe.statRow,
                      children: [
                        _.jsx('dt', { children: '図鑑達成率' }),
                        _.jsxs('dd', { children: [d.completionPct, '%'] }),
                      ],
                    }),
                  ],
                }),
                _.jsx('h2', { className: qe.h2, children: 'ボス撃破履歴' }),
                c.bossDefeatLog.length === 0
                  ? _.jsx('p', { className: qe.empty, children: 'まだボスを倒していません。' })
                  : _.jsx('ul', {
                      className: qe.bossLog,
                      children: c.bossDefeatLog
                        .slice()
                        .reverse()
                        .map((h, k) =>
                          _.jsx(
                            'li',
                            {
                              className: qe.bossRow,
                              children: _.jsxs('span', { children: [h.depth, 'F のボス撃破'] }),
                            },
                            k
                          )
                        ),
                    }),
              ],
            })
          : _.jsxs('div', {
              className: qe.codex,
              children: [
                _.jsxs('div', {
                  className: qe.codexSummary,
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
                _.jsx('div', {
                  className: qe.list,
                  children: f.map((h) =>
                    _.jsx(
                      'div',
                      {
                        className: `${qe.row} ${h.seen ? '' : qe.unseen}`,
                        children: _.jsxs('div', {
                          className: qe.info,
                          children: [
                            _.jsxs('span', {
                              className: qe.name,
                              children: [
                                h.seen ? h.name : '？？？',
                                h.defeated
                                  ? _.jsx('span', { className: qe.badge, children: '撃破' })
                                  : null,
                              ],
                            }),
                            _.jsxs('span', {
                              className: qe.sub,
                              children: [
                                '第',
                                h.tierBand + 1,
                                '帯',
                                h.seen && h.drops.length > 0
                                  ? '・' + h.drops.map((k) => (k.found ? k.name : '？')).join(' / ')
                                  : '',
                              ],
                            }),
                          ],
                        }),
                      },
                      h.id
                    )
                  ),
                }),
              ],
            }),
        _.jsx('footer', {
          className: qe.foot,
          children: _.jsx('button', {
            type: 'button',
            className: qe.back,
            onClick: () => l('/town'),
            children: '拠点へ戻る',
          }),
        }),
      ],
    });
  },
  S3 = '_layout_17qff_1',
  w3 = '_head_17qff_13',
  T3 = '_depth_17qff_22',
  E3 = '_theme_17qff_28',
  C3 = '_fpvWrap_17qff_45',
  N3 = '_fpvControls_17qff_52',
  j3 = '_fpvTurn_17qff_63',
  A3 = '_fpvForward_17qff_64',
  L3 = '_fpvBack_17qff_65',
  q3 = '_menuBtn_17qff_99',
  B3 = '_menuGold_17qff_112',
  M3 = '_menuActions_17qff_118',
  O3 = '_menuAction_17qff_118',
  I3 = '_menuSectionLabel_17qff_135',
  D3 = '_menuMember_17qff_141',
  R3 = '_menuMemberName_17qff_155',
  z3 = '_menuMemberJob_17qff_159',
  H3 = '_menuMemberStat_17qff_166',
  U3 = '_menuSp_17qff_171',
  G3 = '_menuStats_17qff_178',
  $3 = '_menuStat_17qff_178',
  Y3 = '_skillTabs_17qff_190',
  X3 = '_skillTab_17qff_190',
  V3 = '_skillTabOn_17qff_207',
  Q3 = '_mapWrap_17qff_213',
  K3 = '_paletteHint_17qff_247',
  Z3 = '_stairs_17qff_256',
  J3 = '_action_17qff_270',
  P3 = '_notice_17qff_287',
  F3 = '_itemOverlay_17qff_351',
  W3 = '_itemPanel_17qff_361',
  e2 = '_itemTitle_17qff_374',
  t2 = '_itemEmpty_17qff_379',
  l2 = '_itemRow_17qff_385',
  a2 = '_itemName_17qff_393',
  n2 = '_itemDesc_17qff_401',
  i2 = '_itemTargets_17qff_407',
  s2 = '_itemTarget_17qff_407',
  r2 = '_itemHp_17qff_427',
  o2 = '_itemUse_17qff_433',
  u2 = '_itemClose_17qff_450',
  ue = {
    layout: S3,
    head: w3,
    depth: T3,
    theme: E3,
    fpvWrap: C3,
    fpvControls: N3,
    fpvTurn: j3,
    fpvForward: A3,
    fpvBack: L3,
    menuBtn: q3,
    menuGold: B3,
    menuActions: M3,
    menuAction: O3,
    menuSectionLabel: I3,
    menuMember: D3,
    menuMemberName: R3,
    menuMemberJob: z3,
    menuMemberStat: H3,
    menuSp: U3,
    menuStats: G3,
    menuStat: $3,
    skillTabs: Y3,
    skillTab: X3,
    skillTabOn: V3,
    mapWrap: Q3,
    paletteHint: K3,
    stairs: Z3,
    action: J3,
    notice: P3,
    itemOverlay: F3,
    itemPanel: W3,
    itemTitle: e2,
    itemEmpty: t2,
    itemRow: l2,
    itemName: a2,
    itemDesc: n2,
    itemTargets: i2,
    itemTarget: s2,
    itemHp: r2,
    itemUse: o2,
    itemClose: u2,
  },
  c2 = '_canvas_1keax_1',
  d2 = { canvas: c2 },
  m2 = [
    { id: 'icon_chest', symbol: '📦', label: '宝箱' },
    { id: 'icon_foe', symbol: '👹', label: '強敵(FOE)' },
    { id: 'icon_warning', symbol: '⚠️', label: '注意' },
    { id: 'icon_door', symbol: '🚪', label: '扉/近道' },
    { id: 'icon_gather', symbol: '⛏️', label: '採集' },
    { id: 'icon_event', symbol: '❗', label: 'イベント' },
    { id: 'icon_note', symbol: '📝', label: 'メモ' },
    { id: 'icon_star', symbol: '⭐', label: '任意' },
  ],
  _2 = new Map(m2.map((l) => [l.id, l]));
function f2(l) {
  var i;
  return ((i = _2.get(l)) == null ? void 0 : i.symbol) ?? '•';
}
const zl = {
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
  p2 = {
    mining: '⛏️',
    gathering: '🌿',
    logging: '🪓',
    fishing: '🎣',
    harvest: '🌰',
    hunting: '🍖',
  },
  h2 = '🍳',
  g2 = ({
    floor: l,
    explored: i,
    pos: o,
    dir: r,
    icons: c = [],
    foes: d = [],
    depletedGathers: f = [],
    maxCell: h = 26,
    onCellClick: k,
  }) => {
    const p = T.useRef(null),
      v = Math.max(10, Math.min(h, Math.floor(360 / l.width))),
      y = l.width * v,
      E = l.height * v;
    T.useEffect(() => {
      const O = p.current;
      if (!O) return;
      const x = new Set(i),
        S = new Set(f),
        b = new Map(l.gatheringPoints.map((le) => [`${le.cell.x},${le.cell.y}`, le.type])),
        C = window.devicePixelRatio || 1;
      ((O.width = y * C), (O.height = E * C));
      const A = O.getContext('2d');
      if (!A) return;
      (A.scale(C, C), A.clearRect(0, 0, y, E));
      for (let le = 0; le < l.height; le++)
        for (let ce = 0; ce < l.width; ce++) {
          const he = x.has(`${ce},${le}`);
          ((A.fillStyle = he ? zl.floor : zl.fog),
            A.fillRect(ce * v, le * v, v, v),
            he &&
              ((A.strokeStyle = zl.grid),
              (A.lineWidth = 1),
              A.strokeRect(ce * v + 0.5, le * v + 0.5, v - 1, v - 1)));
        }
      ((A.strokeStyle = zl.wall), (A.lineWidth = 2), (A.lineCap = 'round'));
      const F = (le, ce, he, ve) => {
        (A.beginPath(), A.moveTo(le, ce), A.lineTo(he, ve), A.stroke());
      };
      for (let le = 0; le < l.height; le++)
        for (let ce = 0; ce < l.width; ce++) {
          if (!x.has(`${ce},${le}`)) continue;
          const he = l.cells[le][ce],
            ve = ce * v,
            Se = le * v;
          (he.walls.N && F(ve, Se, ve + v, Se),
            he.walls.S && F(ve, Se + v, ve + v, Se + v),
            he.walls.W && F(ve, Se, ve, Se + v),
            he.walls.E && F(ve + v, Se, ve + v, Se + v));
          const ge = he.event;
          if (
            (ge == null ? void 0 : ge.kind) === 'stairsUp' ||
            (ge == null ? void 0 : ge.kind) === 'stairsDown'
          ) {
            const L = ge.kind === 'stairsUp',
              Q = 3,
              $ = v * 0.62,
              Z = ve + (v - $) / 2,
              te = Se + (v - $) / 2,
              N = $ / Q;
            A.fillStyle = L ? zl.stairsUp : zl.stairsDown;
            for (let H = 0; H < Q; H++) {
              const J = ($ / Q) * (L ? H + 1 : Q - H);
              A.fillRect(Z + H * N, te + $ - J, N - 1, J);
            }
          } else if ((ge == null ? void 0 : ge.kind) === 'gather') {
            const L = S.has(`${ce},${le}`),
              Q = b.get(`${ce},${le}`);
            ((A.globalAlpha = L ? 0.35 : 1),
              (A.font = `${Math.floor(v * 0.7)}px sans-serif`),
              (A.textAlign = 'center'),
              (A.textBaseline = 'middle'),
              A.fillText((Q && p2[Q]) || '🌿', ve + v / 2, Se + v / 2 + 1),
              (A.globalAlpha = 1));
          } else
            (ge == null ? void 0 : ge.kind) === 'cookingSpot' &&
              ((A.font = `${Math.floor(v * 0.7)}px sans-serif`),
              (A.textAlign = 'center'),
              (A.textBaseline = 'middle'),
              A.fillText(h2, ve + v / 2, Se + v / 2 + 1));
        }
      ((A.font = `${Math.floor(v * 0.66)}px sans-serif`),
        (A.textAlign = 'center'),
        (A.textBaseline = 'middle'));
      for (const le of c)
        x.has(`${le.x},${le.y}`) &&
          A.fillText(f2(le.iconId), le.x * v + v / 2, le.y * v + v / 2 + 1);
      for (const le of d) {
        if (!x.has(`${le.x},${le.y}`)) continue;
        const ce = le.x * v + v / 2,
          he = le.y * v + v / 2;
        ((A.fillStyle = le.alerted ? zl.foeAlert : zl.foe),
          A.beginPath(),
          A.arc(ce, he, v * 0.3, 0, Math.PI * 2),
          A.fill(),
          (A.fillStyle = '#ffffff'),
          (A.font = `bold ${Math.floor(v * 0.5)}px sans-serif`),
          (A.textAlign = 'center'),
          (A.textBaseline = 'middle'),
          A.fillText('!', ce, he + 1));
      }
      const P = o.x * v + v / 2,
        G = o.y * v + v / 2,
        U = v * 0.34,
        ie = { N: -Math.PI / 2, E: 0, S: Math.PI / 2, W: Math.PI }[r];
      ((A.fillStyle = zl.player),
        A.beginPath(),
        A.moveTo(P + Math.cos(ie) * U, G + Math.sin(ie) * U),
        A.lineTo(P + Math.cos(ie + 2.5) * U, G + Math.sin(ie + 2.5) * U),
        A.lineTo(P + Math.cos(ie - 2.5) * U, G + Math.sin(ie - 2.5) * U),
        A.closePath(),
        A.fill());
    }, [l, i, o, r, c, d, f, v, y, E]);
    const M = (O) => {
      if (!k) return;
      const x = O.currentTarget.getBoundingClientRect(),
        S = Math.floor(((O.clientX - x.left) / x.width) * l.width),
        b = Math.floor(((O.clientY - x.top) / x.height) * l.height);
      S >= 0 && b >= 0 && S < l.width && b < l.height && k(S, b);
    };
    return _.jsx('canvas', {
      ref: p,
      className: d2.canvas,
      style: { width: y, height: E },
      onClick: M,
    });
  },
  k2 = '_gauge_1o2hx_1',
  v2 = '_icon_1o2hx_11',
  y2 = '_segments_1o2hx_16',
  b2 = '_seg_1o2hx_16',
  x2 = '_filled_1o2hx_28',
  S2 = '_danger_1o2hx_32',
  On = { gauge: k2, icon: v2, segments: y2, seg: b2, filled: x2, danger: S2 },
  w2 = ({ level: l }) => {
    const i = l >= Ki;
    return _.jsxs('div', {
      className: On.gauge,
      role: 'img',
      'aria-label': `エンカウントゲージ ${l}/${Ki}`,
      children: [
        _.jsx('span', { className: On.icon, children: i ? '⚠' : '👣' }),
        _.jsx('div', {
          className: On.segments,
          children: Array.from({ length: Ki }, (o, r) =>
            _.jsx(
              'span',
              { className: [On.seg, r < l ? On.filled : '', i ? On.danger : ''].join(' ') },
              r
            )
          ),
        }),
      ],
    });
  },
  T2 = '_view_tw2v9_1',
  E2 = { view: T2 },
  Xp = { N: { dx: 0, dy: -1 }, E: { dx: 1, dy: 0 }, S: { dx: 0, dy: 1 }, W: { dx: -1, dy: 0 } };
function C2(l, i, o, r = 4) {
  const c = zh(o),
    d = Rh(o),
    f = [];
  let { x: h, y: k } = i;
  for (let p = 0; p < r; p++) {
    const v = za(l, h, k, o);
    if (
      (f.push({
        x: h,
        y: k,
        leftOpen: !l.cells[k][h].walls[c],
        rightOpen: !l.cells[k][h].walls[d],
        frontOpen: v,
        event: l.cells[k][h].event,
      }),
      !v)
    )
      break;
    ((h += Xp[o].dx), (k += Xp[o].dy));
  }
  return f;
}
const N2 = {
    sky: '#26301c',
    ceiling: '#3a4a2c',
    floor: '#5d6b46',
    wall: '#8b9a6b',
    frontWall: '#7a8a5c',
    outline: '#2c3720',
  },
  j2 = 0.56,
  A2 = ({
    floor: l,
    pos: i,
    dir: o,
    foes: r = [],
    theme: c,
    maxDepth: d = 4,
    width: f = 358,
    height: h = 200,
  }) => {
    const k = T.useRef(null);
    return (
      T.useEffect(() => {
        const p = { ...N2, ...(c ?? {}) },
          v = k.current;
        if (!v) return;
        const y = window.devicePixelRatio || 1;
        ((v.width = f * y), (v.height = h * y));
        const E = v.getContext('2d');
        if (!E) return;
        E.scale(y, y);
        const M = f,
          O = h,
          x = M / 2,
          S = O / 2,
          b = C2(l, i, o, d),
          C = (P) => {
            const G = Math.pow(j2, P);
            return {
              l: x - (M / 2) * G,
              r: x + (M / 2) * G,
              t: S - (O / 2) * G,
              b: S + (O / 2) * G,
            };
          },
          A = (P, G, U = !1) => {
            (E.beginPath(), E.moveTo(P[0][0], P[0][1]));
            for (let ae = 1; ae < P.length; ae++) E.lineTo(P[ae][0], P[ae][1]);
            (E.closePath(),
              (E.fillStyle = G),
              E.fill(),
              U && ((E.strokeStyle = p.outline), (E.lineWidth = 1), E.stroke()));
          },
          F = (P) => `rgba(0,0,0,${Math.min(0.5, P * 0.13)})`;
        ((E.fillStyle = p.sky), E.fillRect(0, 0, M, O));
        for (let P = b.length - 1; P >= 0; P--) {
          const G = C(P),
            U = C(P + 1),
            ae = b[P];
          (A(
            [
              [G.l, G.t],
              [G.r, G.t],
              [U.r, U.t],
              [U.l, U.t],
            ],
            p.ceiling
          ),
            A(
              [
                [G.l, G.b],
                [G.r, G.b],
                [U.r, U.b],
                [U.l, U.b],
              ],
              p.floor
            ),
            A(
              [
                [G.l, G.t],
                [U.l, U.t],
                [U.l, U.b],
                [G.l, G.b],
              ],
              ae.leftOpen ? p.sky : p.wall,
              !0
            ),
            A(
              [
                [G.r, G.t],
                [U.r, U.t],
                [U.r, U.b],
                [G.r, G.b],
              ],
              ae.rightOpen ? p.sky : p.wall,
              !0
            ),
            ae.frontOpen ||
              A(
                [
                  [U.l, U.t],
                  [U.r, U.t],
                  [U.r, U.b],
                  [U.l, U.b],
                ],
                p.frontWall,
                !0
              ),
            (E.fillStyle = F(P)),
            E.fillRect(U.l, U.t, U.r - U.l, U.b - U.t));
          const ie = ae.event;
          if (
            (ie == null ? void 0 : ie.kind) === 'stairsUp' ||
            (ie == null ? void 0 : ie.kind) === 'stairsDown'
          ) {
            const le = ie.kind === 'stairsUp',
              ce = Math.max(18, (G.b - G.t) * 0.4),
              he = 4,
              ve = ce / he,
              Se = x - ce / 2,
              ge = (G.b + U.b) / 2 + ce / 2;
            E.fillStyle = le ? '#e8923a' : '#7aa2d6';
            for (let L = 0; L < he; L++) {
              const Q = ve * (le ? L + 1 : he - L);
              E.fillRect(Se + L * ve, ge - Q, ve - 1, Q);
            }
          }
          if (P > 0 && r.some((le) => le.x === ae.x && le.y === ae.y)) {
            const le = r.some((Se) => Se.x === ae.x && Se.y === ae.y && Se.alerted),
              ce = x,
              he = (G.b + U.b) / 2 - (G.b - U.b) * 0.1,
              ve = Math.max(14, (G.b - G.t) * 0.22);
            ((E.fillStyle = le ? '#d32f2f' : '#b0533a'),
              E.beginPath(),
              E.arc(ce, he, ve, 0, Math.PI * 2),
              E.fill(),
              (E.fillStyle = '#fff'),
              (E.font = `bold ${Math.floor(ve * 1.3)}px sans-serif`),
              (E.textAlign = 'center'),
              (E.textBaseline = 'middle'),
              E.fillText('!', ce, he + 1));
          }
        }
      }, [l, i, o, r, c, d, f, h]),
      _.jsx('canvas', { ref: k, className: E2.view, style: { width: f, height: h } })
    );
  },
  L2 = '_wrap_1ke60_1',
  q2 = '_scroll_1ke60_7',
  B2 = '_canvas_1ke60_17',
  M2 = '_edges_1ke60_21',
  O2 = '_edge_1ke60_21',
  I2 = '_edgeLabel_1ke60_34',
  D2 = '_node_1ke60_40',
  R2 = '_learned_1ke60_57',
  z2 = '_maxed_1ke60_62',
  H2 = '_available_1ke60_67',
  U2 = '_locked_1ke60_72',
  G2 = '_selected_1ke60_76',
  $2 = '_nodeName_1ke60_81',
  Y2 = '_nodeCost_1ke60_92',
  X2 = '_nodeLv_1ke60_104',
  V2 = '_lvNum_1ke60_112',
  Q2 = '_lvBar_1ke60_118',
  K2 = '_lvFill_1ke60_126',
  Z2 = '_lvMax_1ke60_132',
  J2 = '_detail_1ke60_136',
  P2 = '_detailName_1ke60_143',
  F2 = '_detailLv_1ke60_151',
  W2 = '_detailDesc_1ke60_157',
  eS = '_detailReq_1ke60_164',
  tS = '_hint_1ke60_170',
  Xe = {
    wrap: L2,
    scroll: q2,
    canvas: B2,
    edges: M2,
    edge: O2,
    edgeLabel: I2,
    node: D2,
    learned: R2,
    maxed: z2,
    available: H2,
    locked: U2,
    selected: G2,
    nodeName: $2,
    nodeCost: Y2,
    nodeLv: X2,
    lvNum: V2,
    lvBar: Q2,
    lvFill: K2,
    lvMax: Z2,
    detail: J2,
    detailName: P2,
    detailLv: F2,
    detailDesc: W2,
    detailReq: eS,
    hint: tS,
  },
  Vp = [1, 2, 2, 2, 2];
function eg(l) {
  return Vp[Math.min(Math.max(0, l), Vp.length - 1)];
}
function tg(l) {
  var o, r;
  const i = [
    ...(((o = et[l.classId]) == null ? void 0 : o.skillTree.skills) ?? []),
    ...(((r = St[l.raceId]) == null ? void 0 : r.raceSkillTree.skills) ?? []),
  ];
  return (l.titleId && Ul[l.titleId] && i.push(...Ul[l.titleId].skillTree.skills), i);
}
function lS(l, i) {
  const o = new Map(l.map((d) => [d.skillId, d])),
    r = new Map(),
    c = (d, f = 0) => {
      var v;
      const h = r.get(d);
      if (h !== void 0) return h;
      const k = o.get(d);
      if (!k || !((v = k.requires) != null && v.length) || f > 30) return (r.set(d, 0), 0);
      const p =
        1 + Math.max(...k.requires.map((y) => (o.has(y.skillId) ? c(y.skillId, f + 1) : 0)));
      return (r.set(d, p), p);
    };
  return c(i);
}
function Zr(l, i) {
  return eg(lS(tg(l), i));
}
function zn(l, i) {
  return l.learnedSkills[i] ?? 0;
}
function Hr(l) {
  return l.skillPoints.total - l.skillPoints.spent;
}
function aS(l, i) {
  return (i.requires ?? []).every((o) => zn(l, o.skillId) >= o.level);
}
function lg(l, i) {
  const o = tg(l).find((r) => r.skillId === i);
  return !o || zn(l, i) >= o.maxLevel || Hr(l) < Zr(l, i) ? !1 : aS(l, o);
}
function ag(l, i) {
  return lg(l, i)
    ? {
        ...l,
        learnedSkills: { ...l.learnedSkills, [i]: zn(l, i) + 1 },
        skillPoints: { ...l.skillPoints, spent: l.skillPoints.spent + Zr(l, i) },
      }
    : l;
}
const Cc = 132,
  Nc = 48,
  Sr = 176,
  wr = 62,
  ng = ({ nodes: l, char: i, onLearn: o }) => {
    var k;
    const [r, c] = T.useState(null),
      d = T.useMemo(() => {
        var C;
        const p = new Map(l.map((A) => [A.skillId, A])),
          v = new Map(),
          y = (A, F = 0) => {
            var U;
            if (v.has(A)) return v.get(A);
            const P = p.get(A);
            if (!P || !((U = P.requires) != null && U.length) || F > 20) return (v.set(A, 0), 0);
            const G =
              1 +
              Math.max(...P.requires.map((ae) => (p.has(ae.skillId) ? y(ae.skillId, F + 1) : 0)));
            return (v.set(A, G), G);
          },
          E = [];
        l.forEach((A, F) => {
          const P = y(A.skillId);
          (E[P] || (E[P] = [])).push(F);
        });
        const M = new Map(),
          O = E.map(() => new Set());
        for (let A = 0; A < E.length; A++)
          for (const F of E[A] ?? []) {
            const P = l[F];
            let G = 0;
            if (A > 0 && (C = P.requires) != null && C.length) {
              const ae = P.requires.map((ie) => M.get(ie.skillId)).filter((ie) => ie !== void 0);
              ae.length && (G = Math.min(...ae));
            }
            let U = G;
            for (; O[A].has(U); ) U++;
            (O[A].add(U), M.set(P.skillId, U));
          }
        const x = Math.max(0, ...M.values()),
          S = l.map((A) => ({ node: A, col: y(A.skillId), row: M.get(A.skillId) ?? 0 })),
          b = [];
        for (const A of S)
          for (const F of A.node.requires ?? []) {
            const P = S.find((G) => G.node.skillId === F.skillId);
            P &&
              b.push({
                from: F.skillId,
                to: A.node.skillId,
                level: F.level,
                x1: P.col * Sr + Cc,
                y1: P.row * wr + Nc / 2,
                x2: A.col * Sr,
                y2: A.row * wr + Nc / 2,
              });
          }
        return { placed: S, edges: b, width: (E.length - 1) * Sr + Cc, height: (x + 1) * wr };
      }, [l]),
      f = r ? Yi[r] : null,
      h = r ? l.find((p) => p.skillId === r) : null;
    return _.jsxs('div', {
      className: Xe.wrap,
      children: [
        _.jsx('div', {
          className: Xe.scroll,
          children: _.jsxs('div', {
            className: Xe.canvas,
            style: { width: d.width, height: d.height },
            children: [
              _.jsx('svg', {
                className: Xe.edges,
                width: d.width,
                height: d.height,
                children: d.edges.map((p) => {
                  const v = (p.x1 + p.x2) / 2;
                  return _.jsxs(
                    'g',
                    {
                      children: [
                        _.jsx('path', {
                          className: Xe.edge,
                          d: `M ${p.x1} ${p.y1} H ${v} V ${p.y2} H ${p.x2}`,
                          fill: 'none',
                        }),
                        _.jsxs('text', {
                          className: Xe.edgeLabel,
                          x: p.x2 - 6,
                          y: p.y2 - 5,
                          textAnchor: 'end',
                          children: ['Lv', p.level],
                        }),
                      ],
                    },
                    `${p.from}-${p.to}`
                  );
                }),
              }),
              d.placed.map(({ node: p, col: v, row: y }) => {
                var b;
                const E = zn(i, p.skillId),
                  M = E >= p.maxLevel,
                  O = (p.requires ?? []).every((C) => zn(i, C.skillId) >= C.level),
                  x = lg(i, p.skillId),
                  S = [
                    Xe.node,
                    E > 0 ? Xe.learned : '',
                    M ? Xe.maxed : '',
                    x ? Xe.available : '',
                    O ? '' : Xe.locked,
                    r === p.skillId ? Xe.selected : '',
                  ]
                    .filter(Boolean)
                    .join(' ');
                return _.jsxs(
                  'button',
                  {
                    type: 'button',
                    className: S,
                    style: { left: v * Sr, top: y * wr, width: Cc, height: Nc },
                    onClick: () => {
                      (c(p.skillId), x && o(p.skillId));
                    },
                    children: [
                      _.jsx('span', {
                        className: Xe.nodeName,
                        children: ((b = Yi[p.skillId]) == null ? void 0 : b.name) ?? p.skillId,
                      }),
                      _.jsxs('span', { className: Xe.nodeCost, children: ['SP', eg(v)] }),
                      _.jsxs('span', {
                        className: Xe.nodeLv,
                        children: [
                          _.jsx('span', { className: Xe.lvNum, children: E }),
                          _.jsx('span', {
                            className: Xe.lvBar,
                            children: _.jsx('span', {
                              className: Xe.lvFill,
                              style: { width: `${(E / p.maxLevel) * 100}%` },
                            }),
                          }),
                          _.jsx('span', { className: Xe.lvMax, children: p.maxLevel }),
                        ],
                      }),
                    ],
                  },
                  p.skillId
                );
              }),
            ],
          }),
        }),
        f
          ? _.jsxs('div', {
              className: Xe.detail,
              children: [
                _.jsxs('div', {
                  className: Xe.detailName,
                  children: [
                    f.name,
                    _.jsxs('span', {
                      className: Xe.detailLv,
                      children: ['Lv ', zn(i, f.id), '/', (h == null ? void 0 : h.maxLevel) ?? 0],
                    }),
                  ],
                }),
                _.jsx('div', { className: Xe.detailDesc, children: f.description }),
                (k = h == null ? void 0 : h.requires) != null && k.length
                  ? _.jsxs('div', {
                      className: Xe.detailReq,
                      children: [
                        '前提:',
                        ' ',
                        h.requires
                          .map((p) => {
                            var v;
                            return `${((v = Yi[p.skillId]) == null ? void 0 : v.name) ?? p.skillId} Lv${p.level}`;
                          })
                          .join('・'),
                      ],
                    })
                  : null,
              ],
            })
          : _.jsx('div', {
              className: Xe.hint,
              children:
                'ノードをタップで習得（1Lvあたりの消費SPは各ノードの「SP◯」。深いスキルほど高コスト）。緑=習得済 / 枠強調=習得可 / 暗=前提未達。',
            }),
      ],
    });
  },
  Tr = [
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
function Qp(l) {
  const i = Math.floor((l - 1) / 10);
  return Tr[((i % Tr.length) + Tr.length) % Tr.length];
}
function nS(l) {
  var r, c, d;
  const i = l.diveState;
  if (!i) return !1;
  const o =
    (c = (r = l.towerState.floors[i.depth]) == null ? void 0 : r.generated.cells[i.pos.y]) == null
      ? void 0
      : c[i.pos.x];
  return ((d = o == null ? void 0 : o.event) == null ? void 0 : d.kind) === 'cookingSpot';
}
function iS(l) {
  const i = new Set(l.unlockedRecipeIds ?? []);
  return Object.values(Vn).filter((o) => i.has(o.id));
}
function ig(l, i) {
  const o = Vn[i];
  return !o || !(l.unlockedRecipeIds ?? []).includes(i)
    ? !1
    : o.ingredients.every((r) => ad(l, r.itemId) >= r.qty);
}
function sS(l, i) {
  if (!ig(l, i)) return { ok: !1, save: l };
  const o = Vn[i];
  let r = l;
  for (const c of o.ingredients) r = Ah(r, c.itemId, c.qty);
  return ((r = jh(r, o.result.itemId, o.result.count)), { ok: !0, save: r });
}
function sg(l, i) {
  const o = new Set([...l.guild.party.front, ...l.guild.party.back].filter((r) => r !== null));
  return l.guild.members.some((r) => o.has(r.id) && (r.learnedSkills[i] ?? 0) > 0);
}
function rg(l) {
  var d, f, h;
  const i = l.diveState;
  if (!i) return null;
  const o = (d = l.towerState.floors[i.depth]) == null ? void 0 : d.generated,
    r = (f = o == null ? void 0 : o.cells[i.pos.y]) == null ? void 0 : f[i.pos.x];
  if (!o || ((h = r == null ? void 0 : r.event) == null ? void 0 : h.kind) !== 'gather')
    return null;
  const c = r.event.gatherId;
  return o.gatheringPoints.find((k) => k.id === c) ?? null;
}
function $c(l, i) {
  var c;
  const o = l.diveState;
  return o
    ? (((c = l.towerState.floors[o.depth]) == null ? void 0 : c.depletedGathers) ?? []).includes(
        Rr(i.cell.x, i.cell.y)
      )
    : !0;
}
function Kp(l, i) {
  return sg(l, Ha[i.type].requiredSkillId);
}
function rS(l, i) {
  const o = l.reduce((c, d) => c + d.weight, 0);
  let r = i.next() * o;
  for (const c of l) if (((r -= c.weight), r < 0)) return c.itemId;
  return l[l.length - 1].itemId;
}
function oS(l, i) {
  const o = l.diveState;
  if (!o) return { ok: !1, save: l, reason: 'noDive' };
  const r = rg(l);
  if (!r) return { ok: !1, save: l, reason: 'noPoint' };
  if ($c(l, r)) return { ok: !1, save: l, reason: 'depleted' };
  const c = Ha[r.type];
  if (!sg(l, c.requiredSkillId)) return { ok: !1, save: l, reason: 'noSkill' };
  if (c.food && Nh(l) >= Ch) return { ok: !1, save: l, reason: 'foodFull' };
  const d = rS(c.drops, i);
  let f = c.food ? jh(l, d, 1) : td(l, d, 1);
  const h = Rr(r.cell.x, r.cell.y),
    k = f.towerState.floors[o.depth],
    p = k.depletedGathers.includes(h) ? k.depletedGathers : [...k.depletedGathers, h];
  return (
    (f = {
      ...f,
      towerState: {
        ...f.towerState,
        floors: { ...f.towerState.floors, [o.depth]: { ...k, depletedGathers: p } },
      },
    }),
    { ok: !0, save: f, itemId: d, reason: void 0 }
  );
}
function uS(l, i, o) {
  var x;
  const r = tt[i];
  if (!r) return { save: l, ok: !1, message: 'そのアイテムは無い' };
  if (!((x = r.useContext) != null && x.includes('field')))
    return { save: l, ok: !1, message: 'ここでは使えない' };
  const c = Qb(i);
  if ((c ? ad(l, i) : Eh(l, i)) <= 0) return { save: l, ok: !1, message: '所持していない' };
  const f = (S) => (c ? Ah(S, i, 1) : ld(S, i, 1));
  if (i === 'item_return_thread')
    return l.diveState
      ? { save: Ji(f(l)), ok: !0, message: '拠点へ帰還した' }
      : { save: l, ok: !1, message: '探索中のみ使える' };
  if (!l.diveState) return { save: l, ok: !1, message: '探索中のみ使える' };
  const h = l.diveState.party.find((S) => S.charId === o),
    k = l.guild.members.find((S) => S.id === o);
  if (!h || !k) return { save: l, ok: !1, message: '対象がいない' };
  const p = Gl(k);
  let v = h.hp,
    y = h.tp,
    E = !1;
  for (const S of r.effects ?? [])
    S.kind === 'heal'
      ? ((v = Math.min(p.hp, v + S.amount(1))), (E = !0))
      : S.kind === 'restoreTp' && ((y = Math.min(p.tp, y + S.amount(1))), (E = !0));
  if (!E) return { save: l, ok: !1, message: 'いま使う効果がない' };
  const M = l.diveState.party.map((S) => (S.charId === o ? { ...S, hp: v, tp: y } : S));
  return {
    save: f({ ...l, diveState: { ...l.diveState, party: M } }),
    ok: !0,
    message: `${k.name} に ${r.name} を使った`,
  };
}
const cS = (l) => new Promise((i) => setTimeout(i, l)),
  dS = () => {
    const l = dl(),
      { save: i, applySave: o, applyAndPersist: r } = Xl(),
      c = T.useRef(null),
      d = T.useRef(!1),
      [f, h] = T.useState(!1),
      [k, p] = T.useState(!1),
      [v, y] = T.useState(!1),
      [E, M] = T.useState(null),
      [O, x] = T.useState('class'),
      [S, b] = T.useState(null),
      C = (i == null ? void 0 : i.diveState) ?? null,
      A = T.useMemo(() => {
        var $;
        return i && C ? (($ = i.towerState.floors[C.depth]) == null ? void 0 : $.generated) : null;
      }, [i, C]),
      F = T.useMemo(() => {
        var $;
        return i && C
          ? ((($ = i.towerState.floors[C.depth]) == null ? void 0 : $.foeRuntime) ?? [])
              .filter((Z) => !Z.defeated)
              .map((Z) => ({ x: Z.cell.x, y: Z.cell.y, alerted: Z.alerted }))
          : [];
      }, [i, C]),
      P = T.useMemo(() => (i ? rg(i) : null), [i]),
      G = T.useMemo(() => (i ? nS(i) : !1), [i]),
      U = T.useMemo(() => {
        var $;
        return i && C
          ? ((($ = i.towerState.floors[C.depth]) == null ? void 0 : $.depletedGathers) ?? [])
          : [];
      }, [i, C]),
      ae = T.useCallback(() => {
        var Z;
        if (!i) return;
        c.current || (c.current = va((i.masterSeed ^ 2654435769) >>> 0));
        const $ = oS(i, c.current);
        if (!$.ok) {
          b(
            $.reason === 'noSkill'
              ? '対応する採集スキルを持つ仲間がいない'
              : $.reason === 'foodFull'
                ? '食料がいっぱいで採れない'
                : '採集できない'
          );
          return;
        }
        (r(() => $.save),
          b(
            `${$.itemId ? (((Z = tt[$.itemId]) == null ? void 0 : Z.name) ?? '素材') : '素材'} を手に入れた`
          ));
      }, [i, r]),
      ie = T.useCallback(
        ($) => {
          var te;
          if (!i) return;
          const Z = sS(i, $);
          Z.ok &&
            (r(() => Z.save), b(`${((te = Vn[$]) == null ? void 0 : te.name) ?? '料理'} を作った`));
        },
        [i, r]
      ),
      le = T.useCallback(
        ($) => {
          if (!i) return;
          (b(null), c.current || (c.current = va((i.masterSeed ^ 2654435769) >>> 0)));
          const Z = Ip(i, $, c.current);
          (r(() => Z.save), Z.triggered && l('/battle'));
        },
        [i, r, l]
      ),
      ce = T.useCallback(
        ($) => {
          o((Z) => Yh(Z, $));
        },
        [o]
      ),
      he = T.useCallback(async () => {
        if (!i) return;
        const $ = Dp(i);
        if ($ === 'stairsUp') {
          if (!Vh(i, i.diveState.depth)) {
            b('強大な力に阻まれている。階層ボスを倒さねば先へ進めない。');
            return;
          }
          await r((Z) => ix(Z));
        } else
          $ === 'stairsDown' &&
            (i.diveState.depth <= 1 ? (await r((Z) => Ji(Z)), l('/town')) : await r((Z) => sx(Z)));
      }, [i, r, l]),
      ve = T.useCallback(async () => {
        (await r(($) => Ji($)), l('/town'));
      }, [r, l]),
      Se = T.useCallback(
        ($, Z) => {
          if (!i) return;
          const te = uS(i, $, Z);
          te.ok && (r(() => te.save), te.save.diveState || (h(!1), l('/town')));
        },
        [i, r, l]
      ),
      ge = T.useCallback(
        async ($) => {
          if (!(d.current || $.length === 0)) {
            ((d.current = !0), b(null));
            try {
              for (const Z of $) {
                if (!c.current) continue;
                let te = !1,
                  N = !1;
                if (
                  (await r((H) => {
                    if (!H.diveState) return H;
                    const J = Ip(H, Z, c.current);
                    return ((te = J.triggered), (N = J.moved), J.save);
                  }),
                  te)
                ) {
                  l('/battle');
                  return;
                }
                if (!N) return;
                await cS(110);
              }
            } finally {
              d.current = !1;
            }
          }
        },
        [r, l]
      ),
      L = T.useCallback(
        ($, Z) => {
          if (!C || !A || d.current) return;
          c.current || (c.current = va((i.masterSeed ^ 2654435769) >>> 0));
          const te = U1(A, C.pos, { x: $, y: Z });
          te && te.length > 0 && ge(te);
        },
        [C, A, i, ge]
      );
    if (!i) return _.jsx(ol, { to: '/title', replace: !0 });
    if (!C || !A) return _.jsx(ol, { to: '/town', replace: !0 });
    const Q = Dp(i);
    return _.jsxs('div', {
      className: ue.layout,
      children: [
        _.jsxs('header', {
          className: ue.head,
          children: [
            _.jsxs('div', {
              className: ue.depth,
              children: [
                C.depth,
                'F ',
                _.jsx('span', { className: ue.theme, children: Qp(C.depth).name }),
              ],
            }),
            _.jsx(w2, { level: R1(C.encounter.stepsUntilEncounter) }),
            _.jsx('button', {
              type: 'button',
              className: ue.menuBtn,
              onClick: () => {
                (M(null), y(!0));
              },
              children: '☰ メニュー',
            }),
          ],
        }),
        _.jsxs('div', {
          className: ue.fpvWrap,
          children: [
            _.jsx(A2, { floor: A, pos: C.pos, dir: C.dir, foes: F, theme: Qp(C.depth) }),
            _.jsxs('div', {
              className: ue.fpvControls,
              children: [
                _.jsx('button', {
                  type: 'button',
                  className: ue.fpvTurn,
                  onClick: () => ce(zh(C.dir)),
                  'aria-label': '左を向く',
                  children: '↰',
                }),
                _.jsx('button', {
                  type: 'button',
                  className: ue.fpvForward,
                  onClick: () => le(C.dir),
                  children: '▲ 前進',
                }),
                _.jsx('button', {
                  type: 'button',
                  className: ue.fpvTurn,
                  onClick: () => ce(Rh(C.dir)),
                  'aria-label': '右を向く',
                  children: '↱',
                }),
              ],
            }),
            _.jsx('button', {
              type: 'button',
              className: ue.fpvBack,
              onClick: () => ce(z1(C.dir)),
              'aria-label': '振り向く',
              children: '↻',
            }),
          ],
        }),
        _.jsx('div', {
          className: ue.mapWrap,
          children: _.jsx(g2, {
            floor: A,
            explored: i.exploredCells[C.depth] ?? [],
            pos: C.pos,
            dir: C.dir,
            foes: F,
            depletedGathers: U,
            onCellClick: L,
          }),
        }),
        _.jsx('p', {
          className: ue.paletteHint,
          children: 'マップのマスをタップすると、そこまで自動で移動します。',
        }),
        Q &&
          _.jsx('button', {
            type: 'button',
            className: ue.stairs,
            onClick: () => void he(),
            children:
              Q === 'stairsUp'
                ? '▲ 次の階へ進む'
                : C.depth <= 1
                  ? '▼ 拠点へ戻る'
                  : '▼ 前の階へ戻る',
          }),
        P &&
          _.jsx('button', {
            type: 'button',
            className: ue.action,
            disabled: $c(i, P) || !Kp(i, P),
            onClick: ae,
            children: $c(i, P)
              ? `🌿 ${Ha[P.type].name}（採集済み）`
              : Kp(i, P)
                ? `🌿 ${Ha[P.type].name}する`
                : `🌿 ${Ha[P.type].name}（スキル要）`,
          }),
        G &&
          _.jsx('button', {
            type: 'button',
            className: ue.action,
            onClick: () => p(!0),
            children: '🍳 調理する',
          }),
        S && _.jsx('p', { className: ue.notice, children: S }),
        f
          ? _.jsx('div', {
              className: ue.itemOverlay,
              onClick: () => h(!1),
              children: _.jsxs('div', {
                className: ue.itemPanel,
                onClick: ($) => $.stopPropagation(),
                children: [
                  _.jsx('div', { className: ue.itemTitle, children: 'どうぐ・食料' }),
                  (() => {
                    const $ = [...i.guild.storage, ...(i.guild.foodStorage ?? [])].filter((Z) => {
                      var te, N;
                      return (
                        ((N = (te = tt[Z.itemId]) == null ? void 0 : te.useContext) == null
                          ? void 0
                          : N.includes('field')) && Z.qty > 0
                      );
                    });
                    return $.length === 0
                      ? _.jsx('p', {
                          className: ue.itemEmpty,
                          children: '使える道具がありません。',
                        })
                      : $.map((Z) => {
                          const te = tt[Z.itemId],
                            N = Z.itemId === 'item_return_thread';
                          return _.jsxs(
                            'div',
                            {
                              className: ue.itemRow,
                              children: [
                                _.jsxs('div', {
                                  className: ue.itemName,
                                  children: [
                                    te.name,
                                    ' ×',
                                    Z.qty,
                                    _.jsx('span', {
                                      className: ue.itemDesc,
                                      children: te.description,
                                    }),
                                  ],
                                }),
                                N
                                  ? _.jsx('button', {
                                      type: 'button',
                                      className: ue.itemUse,
                                      onClick: () => Se(Z.itemId),
                                      children: '使う',
                                    })
                                  : _.jsx('div', {
                                      className: ue.itemTargets,
                                      children: C.party.map((H) => {
                                        const J = i.guild.members.find((ne) => ne.id === H.charId);
                                        if (!J) return null;
                                        const ee = Gl(J);
                                        return _.jsxs(
                                          'button',
                                          {
                                            type: 'button',
                                            className: ue.itemTarget,
                                            onClick: () => Se(Z.itemId, H.charId),
                                            children: [
                                              J.name,
                                              _.jsxs('span', {
                                                className: ue.itemHp,
                                                children: [
                                                  'HP ',
                                                  H.hp,
                                                  '/',
                                                  ee.hp,
                                                  '・TP ',
                                                  H.tp,
                                                  '/',
                                                  ee.tp,
                                                ],
                                              }),
                                            ],
                                          },
                                          H.charId
                                        );
                                      }),
                                    }),
                              ],
                            },
                            Z.itemId
                          );
                        });
                  })(),
                  _.jsx('button', {
                    type: 'button',
                    className: ue.itemClose,
                    onClick: () => h(!1),
                    children: 'とじる',
                  }),
                ],
              }),
            })
          : null,
        k
          ? _.jsx('div', {
              className: ue.itemOverlay,
              onClick: () => p(!1),
              children: _.jsxs('div', {
                className: ue.itemPanel,
                onClick: ($) => $.stopPropagation(),
                children: [
                  _.jsx('div', { className: ue.itemTitle, children: '調理' }),
                  (() => {
                    const $ = iS(i);
                    return $.length === 0
                      ? _.jsx('p', {
                          className: ue.itemEmpty,
                          children: '作れるレシピがありません。',
                        })
                      : $.map((Z) => {
                          var H;
                          const te = ig(i, Z.id),
                            N = Z.ingredients
                              .map((J) => {
                                var ee;
                                return `${((ee = tt[J.itemId]) == null ? void 0 : ee.name) ?? J.itemId}×${J.qty}`;
                              })
                              .join(' ＋ ');
                          return _.jsxs(
                            'div',
                            {
                              className: ue.itemRow,
                              children: [
                                _.jsxs('div', {
                                  className: ue.itemName,
                                  children: [
                                    Z.name,
                                    _.jsxs('span', {
                                      className: ue.itemDesc,
                                      children: [
                                        N,
                                        ' → ',
                                        ((H = tt[Z.result.itemId]) == null ? void 0 : H.name) ??
                                          Z.result.itemId,
                                        '（所持',
                                        Z.ingredients
                                          .map((J) => {
                                            var ee;
                                            return `${((ee = tt[J.itemId]) == null ? void 0 : ee.name) ?? ''}${ad(i, J.itemId)}`;
                                          })
                                          .join('・'),
                                        '）',
                                      ],
                                    }),
                                  ],
                                }),
                                _.jsx('button', {
                                  type: 'button',
                                  className: ue.itemUse,
                                  disabled: !te,
                                  onClick: () => ie(Z.id),
                                  children: '作る',
                                }),
                              ],
                            },
                            Z.id
                          );
                        });
                  })(),
                  _.jsx('button', {
                    type: 'button',
                    className: ue.itemClose,
                    onClick: () => p(!1),
                    children: 'とじる',
                  }),
                ],
              }),
            })
          : null,
        v
          ? _.jsx('div', {
              className: ue.itemOverlay,
              onClick: () => y(!1),
              children: _.jsx('div', {
                className: ue.itemPanel,
                onClick: ($) => $.stopPropagation(),
                children: (() => {
                  var N, H, J, ee;
                  const $ = E ? i.guild.members.find((ne) => ne.id === E) : null;
                  if (!$)
                    return _.jsxs(_.Fragment, {
                      children: [
                        _.jsx('div', { className: ue.itemTitle, children: 'メニュー' }),
                        _.jsxs('p', {
                          className: ue.menuGold,
                          children: ['所持金 ', i.guild.gold, ' G'],
                        }),
                        _.jsxs('div', {
                          className: ue.menuActions,
                          children: [
                            _.jsx('button', {
                              type: 'button',
                              className: ue.menuAction,
                              onClick: () => {
                                (y(!1), h(!0));
                              },
                              children: '🎒 どうぐ・食料',
                            }),
                            _.jsx('button', {
                              type: 'button',
                              className: ue.menuAction,
                              onClick: () => void ve(),
                              children: '🏠 拠点へ帰還',
                            }),
                          ],
                        }),
                        _.jsx('p', {
                          className: ue.menuSectionLabel,
                          children: 'パーティ（タップで詳細・スキル振り）',
                        }),
                        C.party.map((ne) => {
                          var Ge;
                          const _e = i.guild.members.find((ml) => ml.id === ne.charId);
                          if (!_e) return null;
                          const be = Gl(_e),
                            Je = Hr(_e);
                          return _.jsxs(
                            'button',
                            {
                              type: 'button',
                              className: ue.menuMember,
                              onClick: () => {
                                (M(ne.charId), x('class'));
                              },
                              children: [
                                _.jsxs('span', {
                                  className: ue.menuMemberName,
                                  children: [
                                    _e.name,
                                    _.jsxs('span', {
                                      className: ue.menuMemberJob,
                                      children: [
                                        (Ge = et[_e.classId]) == null ? void 0 : Ge.name,
                                        ' Lv',
                                        _e.level,
                                      ],
                                    }),
                                  ],
                                }),
                                _.jsxs('span', {
                                  className: ue.menuMemberStat,
                                  children: [
                                    'HP ',
                                    ne.hp,
                                    '/',
                                    be.hp,
                                    '・TP ',
                                    ne.tp,
                                    '/',
                                    be.tp,
                                    Je > 0
                                      ? _.jsxs('span', {
                                          className: ue.menuSp,
                                          children: ['SP ', Je],
                                        })
                                      : null,
                                  ],
                                }),
                              ],
                            },
                            ne.charId
                          );
                        }),
                        _.jsx('button', {
                          type: 'button',
                          className: ue.itemClose,
                          onClick: () => y(!1),
                          children: 'とじる',
                        }),
                      ],
                    });
                  const Z = Gl($),
                    te =
                      O === 'class'
                        ? (((N = et[$.classId]) == null ? void 0 : N.skillTree.skills) ?? [])
                        : O === 'race'
                          ? (((H = St[$.raceId]) == null ? void 0 : H.raceSkillTree.skills) ?? [])
                          : $.titleId
                            ? (((J = Ul[$.titleId]) == null ? void 0 : J.skillTree.skills) ?? [])
                            : [];
                  return _.jsxs(_.Fragment, {
                    children: [
                      _.jsxs('div', {
                        className: ue.itemTitle,
                        children: [
                          $.name,
                          '（',
                          (ee = et[$.classId]) == null ? void 0 : ee.name,
                          ' Lv',
                          $.level,
                          '）',
                          _.jsxs('span', { className: ue.menuSp, children: ['SP ', Hr($)] }),
                        ],
                      }),
                      _.jsx('div', {
                        className: ue.menuStats,
                        children: [
                          ['HP', Z.hp],
                          ['TP', Z.tp],
                          ['STR', Z.str],
                          ['VIT', Z.vit],
                          ['AGI', Z.agi],
                          ['INT', Z.int],
                          ['MND', Z.mnd],
                          ['LUC', Z.luc],
                        ].map(([ne, _e]) =>
                          _.jsxs('span', { className: ue.menuStat, children: [ne, ' ', _e] }, ne)
                        ),
                      }),
                      _.jsx('div', {
                        className: ue.skillTabs,
                        children: ['class', 'race', 'title'].map((ne) =>
                          _.jsx(
                            'button',
                            {
                              type: 'button',
                              className: `${ue.skillTab} ${O === ne ? ue.skillTabOn : ''}`,
                              onClick: () => x(ne),
                              disabled: ne === 'title' && !$.titleId,
                              children: ne === 'class' ? '職業' : ne === 'race' ? '種族' : '称号',
                            },
                            ne
                          )
                        ),
                      }),
                      _.jsx(ng, {
                        nodes: te,
                        char: $,
                        onLearn: (ne) =>
                          void r((_e) => ({
                            ..._e,
                            guild: {
                              ..._e.guild,
                              members: _e.guild.members.map((be) =>
                                be.id === $.id ? ag(be, ne) : be
                              ),
                            },
                          })),
                      }),
                      _.jsx('button', {
                        type: 'button',
                        className: ue.itemClose,
                        onClick: () => M(null),
                        children: '← もどる',
                      }),
                    ],
                  });
                })(),
              }),
            })
          : null,
      ],
    });
  },
  mS = '_layout_34t9v_1',
  _S = '_head_34t9v_11',
  fS = '_title_34t9v_18',
  pS = '_stock_34t9v_24',
  hS = '_tabs_34t9v_29',
  gS = '_tab_34t9v_29',
  kS = '_tabActive_34t9v_46',
  vS = '_hint_34t9v_51',
  yS = '_list_34t9v_57',
  bS = '_row_34t9v_65',
  xS = '_info_34t9v_76',
  SS = '_name_34t9v_82',
  wS = '_note_34t9v_87',
  TS = '_actions_34t9v_92',
  ES = '_ingot_34t9v_97',
  CS = '_recycle_34t9v_114',
  NS = '_maxed_34t9v_126',
  jS = '_empty_34t9v_132',
  AS = '_foot_34t9v_137',
  LS = '_back_34t9v_141',
  We = {
    layout: mS,
    head: _S,
    title: fS,
    stock: pS,
    tabs: hS,
    tab: gS,
    tabActive: kS,
    hint: vS,
    list: yS,
    row: bS,
    info: xS,
    name: SS,
    note: wS,
    actions: TS,
    ingot: ES,
    recycle: CS,
    maxed: NS,
    empty: jS,
    foot: AS,
    back: LS,
  },
  qS = () => {
    const l = dl(),
      { save: i, applyAndPersist: o } = Xl(),
      [r, c] = T.useState('forge');
    if (!i) return _.jsx(ol, { to: '/title', replace: !0 });
    const { copper: d, silver: f, gold: h } = i.forgeInventory.ingots,
      k = i.forgeInventory.fragments.common ?? 0,
      p = i.guild.equipment,
      v = (y, E, M, O) =>
        _.jsxs('button', {
          type: 'button',
          className: We.ingot,
          disabled: O <= 0,
          onClick: () => void o((x) => o1(x, y, E).save),
          children: [M, '+', kl.INGOT_INC[E], '（', O, '）'],
        });
    return _.jsxs('div', {
      className: We.layout,
      children: [
        _.jsxs('header', {
          className: We.head,
          children: [
            _.jsx('h1', { className: We.title, children: '鍛冶屋' }),
            _.jsxs('span', {
              className: We.stock,
              children: ['銅', d, '・銀', f, '・金', h, '／断片', k],
            }),
          ],
        }),
        _.jsxs('div', {
          className: We.tabs,
          children: [
            _.jsx('button', {
              type: 'button',
              className: `${We.tab} ${r === 'forge' ? We.tabActive : ''}`,
              onClick: () => c('forge'),
              children: '強化',
            }),
            _.jsx('button', {
              type: 'button',
              className: `${We.tab} ${r === 'recycle' ? We.tabActive : ''}`,
              onClick: () => c('recycle'),
              children: 'リサイクル',
            }),
          ],
        }),
        _.jsx('p', {
          className: We.hint,
          children:
            r === 'forge'
              ? 'インゴットで装備を強化（最大 +5）。銅+1・銀+3・金+5。'
              : '不要な装備を断片に変換。断片10個で銅インゴット1個になる。',
        }),
        _.jsx('div', {
          className: We.list,
          children:
            p.length === 0
              ? _.jsx('p', { className: We.empty, children: '所有している装備がありません。' })
              : p.map((y) => {
                  const E = ot[y.masterId],
                    M = y.forgeLevel >= kl.MAX_LEVEL;
                  return _.jsxs(
                    'div',
                    {
                      className: We.row,
                      children: [
                        _.jsxs('div', {
                          className: We.info,
                          children: [
                            _.jsx('span', { className: We.name, children: Or(y) }),
                            _.jsx('span', {
                              className: We.note,
                              children: E == null ? void 0 : E.slot,
                            }),
                          ],
                        }),
                        r === 'forge'
                          ? _.jsx('div', {
                              className: We.actions,
                              children: M
                                ? _.jsx('span', { className: We.maxed, children: '最大強化' })
                                : _.jsxs(_.Fragment, {
                                    children: [
                                      v(y.id, 'copper', '銅', d),
                                      v(y.id, 'silver', '銀', f),
                                      v(y.id, 'gold', '金', h),
                                    ],
                                  }),
                            })
                          : _.jsxs('button', {
                              type: 'button',
                              className: We.recycle,
                              onClick: () => void o((O) => u1(O, y.id).save),
                              children: ['分解（断片+', kl.RECYCLE_FRAGMENTS, '）'],
                            }),
                      ],
                    },
                    y.id
                  );
                }),
        }),
        _.jsx('footer', {
          className: We.foot,
          children: _.jsx('button', {
            type: 'button',
            className: We.back,
            onClick: () => l('/town'),
            children: '拠点へ戻る',
          }),
        }),
      ],
    });
  },
  BS = '_layout_16au8_2',
  MS = '_head_16au8_13',
  OS = '_title_16au8_20',
  IS = '_count_16au8_26',
  DS = '_create_16au8_31',
  RS = '_sectionTitle_16au8_42',
  zS = '_field_16au8_48',
  HS = '_primary_16au8_64',
  US = '_list_16au8_79',
  GS = '_empty_16au8_83',
  $S = '_members_16au8_88',
  YS = '_member_16au8_88',
  XS = '_memberMain_16au8_107',
  VS = '_memberName_16au8_119',
  QS = '_pos_16au8_127',
  KS = '_memberSub_16au8_144',
  ZS = '_posBtns_16au8_149',
  JS = '_posBtn_16au8_149',
  PS = '_posBtnActive_16au8_164',
  FS = '_foot_16au8_170',
  WS = '_sub_16au8_174',
  Be = {
    layout: BS,
    head: MS,
    title: OS,
    count: IS,
    create: DS,
    sectionTitle: RS,
    field: zS,
    primary: HS,
    list: US,
    empty: GS,
    members: $S,
    member: YS,
    memberMain: XS,
    memberName: VS,
    pos: QS,
    pos_前衛: '_pos_前衛_16au8_136',
    pos_後衛: '_pos_後衛_16au8_140',
    memberSub: KS,
    posBtns: ZS,
    posBtn: JS,
    posBtnActive: PS,
    foot: FS,
    sub: WS,
  };
function e5(l) {
  return [...l.guild.party.front, ...l.guild.party.back].filter((i) => i !== null).length;
}
const og = (l) => (l === 'front' ? Yr : Xr);
function t5(l, i, o, r) {
  if (o < 0 || o >= og(i) || (r !== null && !l.guild.members.some((f) => f.id === r))) return l;
  const c = l.guild.party.front.map((f) => (f === r ? null : f)),
    d = l.guild.party.back.map((f) => (f === r ? null : f));
  for (; c.length < Yr; ) c.push(null);
  for (; d.length < Xr; ) d.push(null);
  return (
    i === 'front' ? (c[o] = r) : (d[o] = r),
    { ...l, guild: { ...l.guild, party: { front: c, back: d } } }
  );
}
function ug(l, i) {
  const o = l.guild.party.front.map((c) => (c === i ? null : c)),
    r = l.guild.party.back.map((c) => (c === i ? null : c));
  return { ...l, guild: { ...l.guild, party: { front: o, back: r } } };
}
function Zp(l, i, o) {
  if (
    !l.guild.members.some((h) => h.id === i) ||
    (o === 'front' ? l.guild.party.front : l.guild.party.back).includes(i)
  )
    return l;
  const c = ug(l, i),
    d = o === 'front' ? c.guild.party.front : c.guild.party.back;
  let f = d.indexOf(null);
  if (f < 0)
    if (d.length < og(o)) f = d.length;
    else return l;
  return t5(c, o, f, i);
}
function l5(l, i) {
  return l.guild.party.front.includes(i)
    ? '前衛'
    : l.guild.party.back.includes(i)
      ? '後衛'
      : '控え';
}
const a5 = () => {
    const l = dl(),
      { save: i, applyAndPersist: o } = Xl(),
      r = Object.keys(St),
      c = Object.keys(et),
      [d, f] = T.useState(''),
      [h, k] = T.useState(r[0]),
      [p, v] = T.useState(c[0]),
      [y, E] = T.useState(!1),
      M = T.useCallback(async () => {
        const S = d.trim() || '名もなき冒険者',
          b = Qh({ raceId: h, classId: p, name: S });
        (E(!0), await o((C) => fx(C, b)), f(''), E(!1));
      }, [d, h, p, o]);
    if (!i) return _.jsx(ol, { to: '/title', replace: !0 });
    const { members: O } = i.guild,
      x = O.length >= qc;
    return _.jsxs('div', {
      className: Be.layout,
      children: [
        _.jsxs('header', {
          className: Be.head,
          children: [
            _.jsx('h1', { className: Be.title, children: 'ギルド管理' }),
            _.jsxs('span', { className: Be.count, children: ['団員 ', O.length, ' / ', qc] }),
          ],
        }),
        _.jsxs('section', {
          className: Be.create,
          children: [
            _.jsx('h2', { className: Be.sectionTitle, children: '冒険者を作成' }),
            _.jsxs('label', {
              className: Be.field,
              children: [
                _.jsx('span', { children: '名前' }),
                _.jsx('input', {
                  type: 'text',
                  value: d,
                  maxLength: 16,
                  placeholder: '名もなき冒険者',
                  onChange: (S) => f(S.target.value),
                }),
              ],
            }),
            _.jsxs('label', {
              className: Be.field,
              children: [
                _.jsx('span', { children: '種族' }),
                _.jsx('select', {
                  value: h,
                  onChange: (S) => k(S.target.value),
                  children: r.map((S) => _.jsx('option', { value: S, children: St[S].name }, S)),
                }),
              ],
            }),
            _.jsxs('label', {
              className: Be.field,
              children: [
                _.jsx('span', { children: '職業' }),
                _.jsx('select', {
                  value: p,
                  onChange: (S) => v(S.target.value),
                  children: c.map((S) => _.jsx('option', { value: S, children: et[S].name }, S)),
                }),
              ],
            }),
            _.jsx('button', {
              type: 'button',
              className: Be.primary,
              disabled: y || x,
              onClick: () => void M(),
              children: x ? '団員が上限です' : '作成する',
            }),
          ],
        }),
        _.jsxs('section', {
          className: Be.list,
          children: [
            _.jsxs('h2', {
              className: Be.sectionTitle,
              children: [
                '団員一覧',
                ' ',
                _.jsxs('span', {
                  className: Be.count,
                  children: ['（出撃 ', e5(i), ' / ', Zb, '）'],
                }),
              ],
            }),
            O.length === 0
              ? _.jsx('p', { className: Be.empty, children: 'まだ冒険者がいません。' })
              : _.jsx('ul', {
                  className: Be.members,
                  children: O.map((S) => {
                    var C, A;
                    const b = l5(i, S.id);
                    return _.jsxs(
                      'li',
                      {
                        className: Be.member,
                        children: [
                          _.jsxs('button', {
                            type: 'button',
                            className: Be.memberMain,
                            onClick: () => l(`/guild/char/${S.id}`),
                            children: [
                              _.jsxs('span', {
                                className: Be.memberName,
                                children: [
                                  S.name,
                                  _.jsx('span', {
                                    className: `${Be.pos} ${Be[`pos_${b}`] ?? ''}`,
                                    children: b,
                                  }),
                                ],
                              }),
                              _.jsxs('span', {
                                className: Be.memberSub,
                                children: [
                                  (C = St[S.raceId]) == null ? void 0 : C.name,
                                  ' / ',
                                  (A = et[S.classId]) == null ? void 0 : A.name,
                                  ' / Lv',
                                  S.level,
                                  ' ›',
                                ],
                              }),
                            ],
                          }),
                          _.jsxs('div', {
                            className: Be.posBtns,
                            children: [
                              _.jsx('button', {
                                type: 'button',
                                className: `${Be.posBtn} ${b === '前衛' ? Be.posBtnActive : ''}`,
                                onClick: () => void o((F) => Zp(F, S.id, 'front')),
                                children: '前',
                              }),
                              _.jsx('button', {
                                type: 'button',
                                className: `${Be.posBtn} ${b === '後衛' ? Be.posBtnActive : ''}`,
                                onClick: () => void o((F) => Zp(F, S.id, 'back')),
                                children: '後',
                              }),
                              _.jsx('button', {
                                type: 'button',
                                className: `${Be.posBtn} ${b === '控え' ? Be.posBtnActive : ''}`,
                                onClick: () => void o((F) => ug(F, S.id)),
                                children: '控',
                              }),
                            ],
                          }),
                        ],
                      },
                      S.id
                    );
                  }),
                }),
          ],
        }),
        _.jsx('footer', {
          className: Be.foot,
          children: _.jsx('button', {
            type: 'button',
            className: Be.sub,
            onClick: () => l('/town'),
            children: '拠点へ戻る',
          }),
        }),
      ],
    });
  },
  n5 = '_layout_c3v63_1',
  i5 = '_head_c3v63_12',
  s5 = '_title_c3v63_16',
  r5 = '_sub_c3v63_22',
  o5 = '_card_c3v63_27',
  u5 = '_h2_c3v63_35',
  c5 = '_sp_c3v63_44',
  d5 = '_stats_c3v63_50',
  m5 = '_equipSlot_c3v63_74',
  _5 = '_equipHead_c3v63_82',
  f5 = '_slotLabel_c3v63_88',
  p5 = '_equipName_c3v63_95',
  h5 = '_smallBtn_c3v63_100',
  g5 = '_equipPick_c3v63_110',
  k5 = '_pickBtn_c3v63_118',
  v5 = '_jobRow_c3v63_185',
  y5 = '_select_c3v63_192',
  b5 = '_input_c3v63_193',
  x5 = '_actBtn_c3v63_203',
  S5 = '_warn_c3v63_220',
  w5 = '_titleHave_c3v63_227',
  T5 = '_titleOpts_c3v63_233',
  E5 = '_titleBtn_c3v63_240',
  C5 = '_rbForm_c3v63_252',
  N5 = '_danger_c3v63_258',
  j5 = '_foot_c3v63_270',
  A5 = '_back_c3v63_274',
  L5 = '_skillTabs_c3v63_284',
  q5 = '_skillTab_c3v63_284',
  B5 = '_skillTabOn_c3v63_304',
  pe = {
    layout: n5,
    head: i5,
    title: s5,
    sub: r5,
    card: o5,
    h2: u5,
    sp: c5,
    stats: d5,
    equipSlot: m5,
    equipHead: _5,
    slotLabel: f5,
    equipName: p5,
    smallBtn: h5,
    equipPick: g5,
    pickBtn: k5,
    jobRow: v5,
    select: y5,
    input: b5,
    actBtn: x5,
    warn: S5,
    titleHave: w5,
    titleOpts: T5,
    titleBtn: E5,
    rbForm: C5,
    danger: N5,
    foot: j5,
    back: A5,
    skillTabs: L5,
    skillTab: q5,
    skillTabOn: B5,
  },
  cg = ['weapon', 'armor', 'accessory'];
function dg(l, i, o) {
  return { ...l, guild: { ...l.guild, members: l.guild.members.map((r) => (r.id === i ? o : r)) } };
}
function M5(l) {
  var i, o;
  return (o = (i = et[l]) == null ? void 0 : i.skillTree.skills[0]) == null ? void 0 : o.skillId;
}
function O5(l) {
  var i;
  return new Set(
    (((i = St[l]) == null ? void 0 : i.raceSkillTree.skills) ?? []).map((o) => o.skillId)
  );
}
const I5 = (l, i) => {
  const o = { ...l };
  let r = 0;
  for (const [c, d] of Object.entries(i)) r += Zr(o, c) * d;
  return r;
};
function D5(l, i) {
  if (!et[i]) return l;
  const o = O5(l.raceId);
  let r = {};
  for (const [p, v] of Object.entries(l.learnedSkills)) o.has(p) && (r[p] = v);
  const c = M5(i);
  c && !r[c] && (r[c] = 1);
  const d = Math.max(1, l.level - gh),
    f = Br(d),
    h = { ...l, classId: i, titleId: null, learnedSkills: r };
  let k = I5(h, r) - (c && r[c] ? Zr(h, c) : 0);
  return (
    k > f && ((r = c ? { [c]: 1 } : {}), (k = 0)),
    {
      ...l,
      classId: i,
      titleId: null,
      level: d,
      exp: 0,
      learnedSkills: r,
      skillPoints: { total: f, spent: k },
    }
  );
}
function R5(l, i, o) {
  const r = l.guild.members.find((f) => f.id === i);
  if (!r) return l;
  let c = dg(l, i, D5(r, o));
  const d = c.guild.members.find((f) => f.id === i);
  for (const f of cg) {
    const h = d.equipment[f];
    h && !nd(d, h.masterId) && (c = id(c, i, f));
  }
  return c;
}
const z5 = [
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
function H5(l) {
  const i = z5.find((o) => l >= o.min && l <= o.max);
  return i ? { allStats: i.allStats, bonusSp: i.bonusSp } : null;
}
function mg(l) {
  return l.level >= Xi.REBIRTH_MIN_LEVEL;
}
function U5(l, i) {
  const o = H5(l.level);
  if (!o) return l;
  const r = Math.min(30, Math.floor(l.level / 2)),
    c = Qh({ ...i, id: l.id }),
    d = Br(r) + o.bonusSp;
  return {
    ...c,
    level: Math.max(1, r),
    exp: 0,
    rebirthBonus: o,
    skillPoints: { total: d, spent: c.skillPoints.spent },
  };
}
function G5(l, i, o) {
  const r = l.guild.members.find((f) => f.id === i);
  if (!r || !mg(r)) return l;
  let c = l;
  for (const f of cg) r.equipment[f] && (c = id(c, i, f));
  const d = c.guild.members.find((f) => f.id === i);
  return dg(c, i, U5(d, o));
}
function _g(l, i, o) {
  var c;
  return o < Xi.TITLE_DEPTH || l.titleId
    ? !1
    : (((c = et[l.classId]) == null ? void 0 : c.titleOptions) ?? []).includes(i);
}
function $5(l, i, o) {
  return _g(l, i, o)
    ? { ...l, titleId: i, skillPoints: { ...l.skillPoints, total: l.skillPoints.total + Jb } }
    : l;
}
const Jp = Object.keys(St),
  Er = Object.keys(et),
  Y5 = ['weapon', 'armor', 'accessory'],
  X5 = { weapon: '武器', armor: '防具', accessory: '装飾' },
  V5 = [
    { key: 'hp', label: 'HP' },
    { key: 'tp', label: 'TP' },
    { key: 'str', label: 'STR' },
    { key: 'vit', label: 'VIT' },
    { key: 'agi', label: 'AGI' },
    { key: 'int', label: 'INT' },
    { key: 'mnd', label: 'MND' },
    { key: 'luc', label: 'LUC' },
  ],
  Q5 = () => {
    var G, U, ae, ie, le, ce, he, ve, Se, ge;
    const l = dl(),
      { id: i } = N0(),
      { save: o, applyAndPersist: r } = Xl(),
      [c, d] = T.useState('class'),
      [f, h] = T.useState(Er[0]),
      [k, p] = T.useState(''),
      [v, y] = T.useState(Jp[0]),
      [E, M] = T.useState(Er[0]),
      [O, x] = T.useState(!1);
    if (!o) return _.jsx(ol, { to: '/title', replace: !0 });
    const S = o.guild.members.find((L) => L.id === i);
    if (!S || !i) return _.jsx(ol, { to: '/guild', replace: !0 });
    const b = Gl(S),
      C = Hr(S),
      A = o.towerState.record.deepestReached,
      F = (L) =>
        r((Q) => ({
          ...Q,
          guild: { ...Q.guild, members: Q.guild.members.map(($) => ($.id === i ? L($) : $)) },
        }));
    return _.jsxs('div', {
      className: pe.layout,
      children: [
        _.jsxs('header', {
          className: pe.head,
          children: [
            _.jsx('h1', { className: pe.title, children: S.name }),
            _.jsxs('span', {
              className: pe.sub,
              children: [
                (G = St[S.raceId]) == null ? void 0 : G.name,
                ' / ',
                (U = et[S.classId]) == null ? void 0 : U.name,
                ' / Lv',
                S.level,
              ],
            }),
          ],
        }),
        _.jsxs('section', {
          className: pe.card,
          children: [
            _.jsx('h2', { className: pe.h2, children: 'ステータス' }),
            _.jsx('dl', {
              className: pe.stats,
              children: V5.map((L) =>
                _.jsxs(
                  'div',
                  {
                    children: [
                      _.jsx('dt', { children: L.label }),
                      _.jsx('dd', { children: b[L.key] }),
                    ],
                  },
                  L.key
                )
              ),
            }),
          ],
        }),
        _.jsxs('section', {
          className: pe.card,
          children: [
            _.jsx('h2', { className: pe.h2, children: '装備' }),
            Y5.map((L) => {
              const Q = S.equipment[L],
                $ = o.guild.equipment.filter((Z) => {
                  var te;
                  return (
                    ((te = ot[Z.masterId]) == null ? void 0 : te.slot) === L && nd(S, Z.masterId)
                  );
                });
              return _.jsxs(
                'div',
                {
                  className: pe.equipSlot,
                  children: [
                    _.jsxs('div', {
                      className: pe.equipHead,
                      children: [
                        _.jsx('span', { className: pe.slotLabel, children: X5[L] }),
                        _.jsx('span', {
                          className: pe.equipName,
                          children: Q ? Or(Q) : '（なし）',
                        }),
                        Q
                          ? _.jsx('button', {
                              type: 'button',
                              className: pe.smallBtn,
                              onClick: () => void P(L),
                              children: '外す',
                            })
                          : null,
                      ],
                    }),
                    $.length > 0
                      ? _.jsx('div', {
                          className: pe.equipPick,
                          children: $.map((Z) =>
                            _.jsxs(
                              'button',
                              {
                                type: 'button',
                                className: pe.pickBtn,
                                onClick: () => void r((te) => m1(te, i, Z.id)),
                                children: [Or(Z), ' 装備'],
                              },
                              Z.id
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
        _.jsxs('section', {
          className: pe.card,
          children: [
            _.jsxs('h2', {
              className: pe.h2,
              children: ['スキル ', _.jsxs('span', { className: pe.sp, children: ['SP ', C] })],
            }),
            _.jsxs('div', {
              className: pe.skillTabs,
              children: [
                _.jsxs('button', {
                  type: 'button',
                  className: `${pe.skillTab} ${c === 'class' ? pe.skillTabOn : ''}`,
                  onClick: () => d('class'),
                  children: [
                    '職業（',
                    ((ae = et[S.classId]) == null ? void 0 : ae.name) ?? '',
                    '）',
                  ],
                }),
                _.jsxs('button', {
                  type: 'button',
                  className: `${pe.skillTab} ${c === 'race' ? pe.skillTabOn : ''}`,
                  onClick: () => d('race'),
                  children: [
                    '種族（',
                    ((ie = St[S.raceId]) == null ? void 0 : ie.name) ?? '',
                    '）',
                  ],
                }),
                S.titleId
                  ? _.jsxs('button', {
                      type: 'button',
                      className: `${pe.skillTab} ${c === 'title' ? pe.skillTabOn : ''}`,
                      onClick: () => d('title'),
                      children: [
                        '称号（',
                        ((le = Ul[S.titleId]) == null ? void 0 : le.name) ?? '',
                        '）',
                      ],
                    })
                  : null,
              ],
            }),
            _.jsx(ng, {
              nodes:
                c === 'class'
                  ? (((ce = et[S.classId]) == null ? void 0 : ce.skillTree.skills) ?? [])
                  : c === 'race'
                    ? (((he = St[S.raceId]) == null ? void 0 : he.raceSkillTree.skills) ?? [])
                    : S.titleId
                      ? (((ve = Ul[S.titleId]) == null ? void 0 : ve.skillTree.skills) ?? [])
                      : [],
              char: S,
              onLearn: (L) => void F((Q) => ag(Q, L)),
            }),
          ],
        }),
        _.jsxs('section', {
          className: pe.card,
          children: [
            _.jsx('h2', { className: pe.h2, children: '転職' }),
            _.jsxs('div', {
              className: pe.jobRow,
              children: [
                _.jsx('select', {
                  className: pe.select,
                  value: f,
                  onChange: (L) => h(L.target.value),
                  children: Er.map((L) => _.jsx('option', { value: L, children: et[L].name }, L)),
                }),
                _.jsx('button', {
                  type: 'button',
                  className: pe.actBtn,
                  disabled: f === S.classId,
                  onClick: () => void r((L) => R5(L, i, f)),
                  children: '転職する',
                }),
              ],
            }),
            _.jsxs('p', {
              className: pe.warn,
              children: [
                '※ レベルが ',
                gh,
                ' ',
                '下がり、職業/称号スキルは振り直しになります（種族スキルは保持）。',
              ],
            }),
            _.jsx('h2', { className: pe.h2, children: '称号' }),
            S.titleId
              ? _.jsxs('p', {
                  className: pe.titleHave,
                  children: ['習得済み: ', (Se = Ul[S.titleId]) == null ? void 0 : Se.name],
                })
              : A < Xi.TITLE_DEPTH
                ? _.jsxs('p', {
                    className: pe.warn,
                    children: ['第 ', Xi.TITLE_DEPTH, ' 階到達で習得できます（現在 ', A, 'F）。'],
                  })
                : _.jsx('div', {
                    className: pe.titleOpts,
                    children: (((ge = et[S.classId]) == null ? void 0 : ge.titleOptions) ?? []).map(
                      (L) => {
                        var Q;
                        return _.jsxs(
                          'button',
                          {
                            type: 'button',
                            className: pe.titleBtn,
                            disabled: !_g(S, L, A),
                            onClick: () => void F(($) => $5($, L, A)),
                            children: [(Q = Ul[L]) == null ? void 0 : Q.name, '（SP+5）'],
                          },
                          L
                        );
                      }
                    ),
                  }),
            _.jsx('h2', { className: pe.h2, children: '転生' }),
            mg(S)
              ? O
                ? _.jsxs('div', {
                    className: pe.rbForm,
                    children: [
                      _.jsxs('p', {
                        className: pe.warn,
                        children: [
                          '※ 作り直して強い新人になります（開始Lv ',
                          Math.min(30, Math.floor(S.level / 2)),
                          '・ボーナス付き）。',
                        ],
                      }),
                      _.jsx('input', {
                        className: pe.input,
                        type: 'text',
                        maxLength: 16,
                        placeholder: S.name,
                        value: k,
                        onChange: (L) => p(L.target.value),
                      }),
                      _.jsxs('div', {
                        className: pe.jobRow,
                        children: [
                          _.jsx('select', {
                            className: pe.select,
                            value: v,
                            onChange: (L) => y(L.target.value),
                            children: Jp.map((L) =>
                              _.jsx('option', { value: L, children: St[L].name }, L)
                            ),
                          }),
                          _.jsx('select', {
                            className: pe.select,
                            value: E,
                            onChange: (L) => M(L.target.value),
                            children: Er.map((L) =>
                              _.jsx('option', { value: L, children: et[L].name }, L)
                            ),
                          }),
                        ],
                      }),
                      _.jsxs('div', {
                        className: pe.jobRow,
                        children: [
                          _.jsx('button', {
                            type: 'button',
                            className: pe.danger,
                            onClick: () => {
                              (r((L) =>
                                G5(L, i, { raceId: v, classId: E, name: k.trim() || S.name })
                              ),
                                x(!1));
                            },
                            children: '転生を実行',
                          }),
                          _.jsx('button', {
                            type: 'button',
                            className: pe.actBtn,
                            onClick: () => x(!1),
                            children: 'やめる',
                          }),
                        ],
                      }),
                    ],
                  })
                : _.jsx('button', {
                    type: 'button',
                    className: pe.actBtn,
                    onClick: () => x(!0),
                    children: '転生する…',
                  })
              : _.jsxs('p', {
                  className: pe.warn,
                  children: [
                    'Lv',
                    Xi.REBIRTH_MIN_LEVEL,
                    ' 以上で転生できます（現在 Lv',
                    S.level,
                    '）。',
                  ],
                }),
          ],
        }),
        _.jsx('footer', {
          className: pe.foot,
          children: _.jsx('button', {
            type: 'button',
            className: pe.back,
            onClick: () => l('/guild'),
            children: 'もどる',
          }),
        }),
      ],
    });
    function P(L) {
      return r((Q) => id(Q, i, L));
    }
  },
  K5 = () => _.jsx('div', { children: _.jsx('h1', { children: 'Not Found' }) }),
  Z5 = '_layout_1u0ua_1',
  J5 = '_head_1u0ua_11',
  P5 = '_title_1u0ua_18',
  F5 = '_gold_1u0ua_24',
  W5 = '_tabs_1u0ua_29',
  ew = '_tab_1u0ua_29',
  tw = '_tabActive_1u0ua_46',
  lw = '_list_1u0ua_51',
  aw = '_row_1u0ua_59',
  nw = '_info_1u0ua_70',
  iw = '_name_1u0ua_76',
  sw = '_note_1u0ua_81',
  rw = '_action_1u0ua_86',
  ow = '_empty_1u0ua_103',
  uw = '_foot_1u0ua_108',
  cw = '_back_1u0ua_112',
  ze = {
    layout: Z5,
    head: J5,
    title: P5,
    gold: F5,
    tabs: W5,
    tab: ew,
    tabActive: tw,
    list: lw,
    row: aw,
    info: nw,
    name: iw,
    note: sw,
    action: rw,
    empty: ow,
    foot: uw,
    back: cw,
  };
function dw(l) {
  return Math.max(0, Math.floor(l.towerState.record.deepestReached / 10));
}
const fg = {
    item_slime_jelly: ['equip_slime_shield'],
    item_rat_tail: ['equip_rat_dagger'],
    item_bat_wing: ['equip_bat_cloak'],
    item_golem_core: ['equip_golem_blade'],
    item_mat_t1_coarse_hide: ['equip_t2_light'],
    item_mat_t1_lord_pelt: ['equip_t2_sword', 'equip_t2_heavy'],
    item_mat_t2_frost_pelt: ['equip_t3_light'],
    item_mat_t2_monarch_diadem: ['equip_t3_staff', 'equip_t3_clothes'],
    item_mat_t3_charged_hide: ['equip_t4_light'],
    item_mat_t3_sovereign_horn: ['equip_t4_sword', 'equip_t4_heavy'],
    item_mat_t4_corroded_plate: ['equip_t5_light'],
    item_mat_t4_sovereign_crown: ['equip_t5_sword', 'equip_t5_heavy'],
  },
  mw = (l, i = 1) => {
    const o = Sh(l, i),
      r = [];
    return (
      o.atk && r.push(`ATK+${o.atk}`),
      o.mat && r.push(`MAT+${o.mat}`),
      o.def && r.push(`DEF+${o.def}`),
      o.mdf && r.push(`MDF+${o.mdf}`),
      r.join(' ')
    );
  };
function pg(l, i) {
  var o;
  return ((o = l.shopStock.unlockedGrades) == null ? void 0 : o[i]) ?? 1;
}
function _w(l) {
  const i = dw(l),
    o = new Set(l.shopStock.unlockedItemIds),
    r = Object.values(tt)
      .filter((d) => d.buyPrice > 0)
      .map((d) => ({ id: d.id, name: d.name, price: d.buyPrice, kind: 'item' }));
  return [
    ...Object.values(ot)
      .filter((d) => d.tier <= i || o.has(d.id))
      .map((d) => {
        const f = pg(l, d.id);
        return {
          id: d.id,
          name: f > 1 ? `${d.name} Lv${f}` : d.name,
          price: Math.round(d.buyPrice * Hn(f)),
          kind: 'equip',
          note: mw(d.id, f),
        };
      }),
    ...r,
  ];
}
function fw(l) {
  return fg[l] ?? [];
}
function pw(l, i = 1) {
  return tt[l] ? tt[l].buyPrice : ot[l] ? Math.round(ot[l].buyPrice * Hn(i)) : null;
}
function Yc(l, i = 1) {
  return tt[l]
    ? Math.round(Vb(tt[l]) * Hn(i))
    : ot[l]
      ? Math.floor((ot[l].buyPrice * Hn(i)) / 2)
      : 0;
}
function hw(l, i) {
  const o = ot[i] ? pg(l, i) : 1,
    r = pw(i, o);
  if (r === null || r <= 0 || l.guild.gold < r) return l;
  const c = ot[i] ? d1(l, i, 0, o) : td(l, i, 1);
  return { ...c, guild: { ...c.guild, gold: c.guild.gold - r } };
}
function hg(l) {
  var o;
  const i = (((o = ot[l.masterId]) == null ? void 0 : o.buyPrice) ?? 0) * Hn(l.grade);
  return Math.floor(i / 2) + l.forgeLevel * 10;
}
function gw(l, i) {
  const o = l.guild.equipment.find((d) => d.id === i);
  if (!o) return l;
  const r = hg(o),
    c = l.guild.equipment.filter((d) => d.id !== i);
  return { ...l, guild: { ...l.guild, equipment: c, gold: l.guild.gold + r } };
}
function kw(l, i, o = 1, r = 1) {
  if (
    l.guild.storage
      .filter((v) => v.itemId === i && (v.grade ?? 1) === r)
      .reduce((v, y) => v + y.qty, 0) < o
  )
    return l;
  const d = Yc(i, r) * o,
    f = ld(l, i, o, r),
    h = fw(i),
    k = [
      ...f.shopStock.unlockedItemIds,
      ...h.filter((v) => !f.shopStock.unlockedItemIds.includes(v)),
    ],
    p = { ...(f.shopStock.unlockedGrades ?? {}) };
  for (const v of h) p[v] = Math.max(p[v] ?? 1, r);
  return {
    ...f,
    guild: { ...f.guild, gold: f.guild.gold + d },
    shopStock: { ...f.shopStock, unlockedItemIds: k, unlockedGrades: p },
  };
}
const vw = () => {
    const l = dl(),
      { save: i, applyAndPersist: o } = Xl(),
      [r, c] = T.useState('buy');
    if (!i) return _.jsx(ol, { to: '/title', replace: !0 });
    const d = i.guild.gold,
      f = _w(i),
      h = i.guild.storage.filter((y) => Yc(y.itemId, y.grade ?? 1) > 0),
      k = i.guild.equipment,
      p = h.length === 0 && k.length === 0,
      v = (y, E = 1) => {
        var O, x;
        const M =
          ((O = tt[y]) == null ? void 0 : O.name) ?? ((x = ot[y]) == null ? void 0 : x.name) ?? y;
        return E > 1 ? `${M} Lv${E}` : M;
      };
    return _.jsxs('div', {
      className: ze.layout,
      children: [
        _.jsxs('header', {
          className: ze.head,
          children: [
            _.jsx('h1', { className: ze.title, children: 'ショップ' }),
            _.jsxs('span', { className: ze.gold, children: [d, ' G'] }),
          ],
        }),
        _.jsxs('div', {
          className: ze.tabs,
          children: [
            _.jsx('button', {
              type: 'button',
              className: `${ze.tab} ${r === 'buy' ? ze.tabActive : ''}`,
              onClick: () => c('buy'),
              children: '買う',
            }),
            _.jsx('button', {
              type: 'button',
              className: `${ze.tab} ${r === 'sell' ? ze.tabActive : ''}`,
              onClick: () => c('sell'),
              children: '売る',
            }),
          ],
        }),
        _.jsx('div', {
          className: ze.list,
          children:
            r === 'buy'
              ? f.map((y) =>
                  _.jsxs(
                    'div',
                    {
                      className: ze.row,
                      children: [
                        _.jsxs('div', {
                          className: ze.info,
                          children: [
                            _.jsx('span', { className: ze.name, children: y.name }),
                            y.note ? _.jsx('span', { className: ze.note, children: y.note }) : null,
                          ],
                        }),
                        _.jsxs('button', {
                          type: 'button',
                          className: ze.action,
                          disabled: d < y.price,
                          onClick: () => void o((E) => hw(E, y.id)),
                          children: [y.price, ' G'],
                        }),
                      ],
                    },
                    y.id
                  )
                )
              : p
                ? _.jsx('p', { className: ze.empty, children: '売れる物がありません。' })
                : _.jsxs(_.Fragment, {
                    children: [
                      k.map((y) =>
                        _.jsxs(
                          'div',
                          {
                            className: ze.row,
                            children: [
                              _.jsxs('div', {
                                className: ze.info,
                                children: [
                                  _.jsx('span', { className: ze.name, children: Or(y) }),
                                  _.jsx('span', { className: ze.note, children: '装備' }),
                                ],
                              }),
                              _.jsxs('button', {
                                type: 'button',
                                className: ze.action,
                                onClick: () => void o((E) => gw(E, y.id)),
                                children: ['売却 ', hg(y), ' G'],
                              }),
                            ],
                          },
                          y.id
                        )
                      ),
                      h.map((y) =>
                        _.jsxs(
                          'div',
                          {
                            className: ze.row,
                            children: [
                              _.jsxs('div', {
                                className: ze.info,
                                children: [
                                  _.jsx('span', {
                                    className: ze.name,
                                    children: v(y.itemId, y.grade ?? 1),
                                  }),
                                  _.jsxs('span', {
                                    className: ze.note,
                                    children: ['所持 ', y.qty],
                                  }),
                                ],
                              }),
                              _.jsxs('button', {
                                type: 'button',
                                className: ze.action,
                                onClick: () => void o((E) => kw(E, y.itemId, 1, y.grade ?? 1)),
                                children: ['売却 ', Yc(y.itemId, y.grade ?? 1), ' G'],
                              }),
                            ],
                          },
                          `${y.itemId}_${y.grade ?? 1}`
                        )
                      ),
                    ],
                  }),
        }),
        _.jsx('footer', {
          className: ze.foot,
          children: _.jsx('button', {
            type: 'button',
            className: ze.back,
            onClick: () => l('/town'),
            children: '拠点へ戻る',
          }),
        }),
      ],
    });
  },
  yw = '_layout_1xkiw_1',
  bw = '_head_1xkiw_12',
  xw = '_title_1xkiw_17',
  Sw = '_subtitle_1xkiw_24',
  ww = '_body_1xkiw_30',
  Tw = '_menu_1xkiw_34',
  Ew = '_loading_1xkiw_40',
  Cw = '_warn_1xkiw_45',
  Nw = '_danger_1xkiw_52',
  jw = '_dialog_1xkiw_67',
  Aw = '_dialogTitle_1xkiw_77',
  Lw = '_field_1xkiw_82',
  qw = '_note_1xkiw_96',
  Bw = '_dialogActions_1xkiw_102',
  Mw = '_primary_1xkiw_107',
  Ow = '_sub_1xkiw_24',
  Iw = '_foot_1xkiw_132',
  Ze = {
    layout: yw,
    head: bw,
    title: xw,
    subtitle: Sw,
    body: ww,
    menu: Tw,
    loading: Ew,
    warn: Cw,
    danger: Nw,
    dialog: jw,
    dialogTitle: Aw,
    field: Lw,
    note: qw,
    dialogActions: Bw,
    primary: Mw,
    sub: Ow,
    foot: Iw,
  },
  Dw = '_card_3vsn6_1',
  Rw = '_corrupted_3vsn6_14',
  zw = '_corruptedText_3vsn6_19',
  Hw = '_corruptedNote_3vsn6_25',
  Uw = '_guildName_3vsn6_31',
  Gw = '_meta_3vsn6_36',
  ka = {
    card: Dw,
    corrupted: Rw,
    corruptedText: zw,
    corruptedNote: Hw,
    guildName: Uw,
    meta: Gw,
    continue: '_continue_3vsn6_56',
  },
  $w = (l) => {
    if (!l) return '-';
    const i = new Date(l),
      o = (r) => String(r).padStart(2, '0');
    return `${i.getFullYear()}/${o(i.getMonth() + 1)}/${o(i.getDate())} ${o(i.getHours())}:${o(i.getMinutes())}`;
  },
  Yw = ({ meta: l, onContinue: i }) =>
    l.corrupted
      ? _.jsxs('div', {
          className: `${ka.card} ${ka.corrupted}`,
          children: [
            _.jsx('div', { className: ka.corruptedText, children: 'セーブデータが破損しています' }),
            _.jsx('p', {
              className: ka.corruptedNote,
              children: '「最初から」で新しく始められます。',
            }),
          ],
        })
      : _.jsxs('div', {
          className: ka.card,
          children: [
            _.jsx('div', { className: ka.guildName, children: l.guildName }),
            _.jsxs('dl', {
              className: ka.meta,
              children: [
                _.jsxs('div', {
                  children: [
                    _.jsx('dt', { children: '最高到達階' }),
                    _.jsx('dd', {
                      children: l.deepestReached > 0 ? `${l.deepestReached}F` : '未踏破',
                    }),
                  ],
                }),
                _.jsxs('div', {
                  children: [
                    _.jsx('dt', { children: '団員' }),
                    _.jsxs('dd', { children: [l.memberCount, '人'] }),
                  ],
                }),
                _.jsxs('div', {
                  children: [
                    _.jsx('dt', { children: '最終セーブ' }),
                    _.jsx('dd', { children: $w(l.savedAt) }),
                  ],
                }),
              ],
            }),
            _.jsx('button', {
              type: 'button',
              className: ka.continue,
              onClick: i,
              children: 'つづきから',
            }),
          ],
        }),
  Xw = () => {
    const l = dl(),
      { startNewGame: i, continueGame: o } = Xl(),
      [r, c] = T.useState(null),
      [d, f] = T.useState(!0),
      [h, k] = T.useState('menu'),
      [p, v] = T.useState(''),
      [y, E] = T.useState(!1);
    T.useEffect(() => {
      (async () => (c(await Ix()), f(!1)))();
    }, []);
    const M = r !== null && !r.corrupted,
      O = T.useCallback(async () => {
        E(!0);
        const b = await o();
        (E(!1), b.ok && l('/town'));
      }, [o, l]),
      x = T.useCallback(() => {
        (v(''), k(M ? 'confirm' : 'guildName'));
      }, [M]),
      S = T.useCallback(async () => {
        const b = p.trim() || 'ななしのギルド';
        (E(!0), await i(b), E(!1), l('/town'));
      }, [p, i, l]);
    return _.jsxs('div', {
      className: Ze.layout,
      children: [
        _.jsxs('header', {
          className: Ze.head,
          children: [
            _.jsx('h1', { className: Ze.title, children: '世界樹ライク' }),
            _.jsx('p', { className: Ze.subtitle, children: '無限タワー探索 RPG' }),
          ],
        }),
        _.jsx('main', {
          className: Ze.body,
          children: d
            ? _.jsx('p', { className: Ze.loading, children: '読み込み中...' })
            : h === 'guildName'
              ? _.jsxs('div', {
                  className: Ze.dialog,
                  children: [
                    _.jsx('h2', { className: Ze.dialogTitle, children: '新しいギルド' }),
                    _.jsxs('label', {
                      className: Ze.field,
                      children: [
                        _.jsx('span', { children: 'ギルド名' }),
                        _.jsx('input', {
                          type: 'text',
                          value: p,
                          maxLength: 16,
                          placeholder: 'ななしのギルド',
                          onChange: (b) => v(b.target.value),
                          autoFocus: !0,
                        }),
                      ],
                    }),
                    _.jsx('p', {
                      className: Ze.note,
                      children:
                        '冒険者はまだいません。開始後、ギルドメニューで仲間を作成してください。',
                    }),
                    _.jsxs('div', {
                      className: Ze.dialogActions,
                      children: [
                        _.jsx('button', {
                          type: 'button',
                          className: Ze.primary,
                          disabled: y,
                          onClick: S,
                          children: 'はじめる',
                        }),
                        _.jsx('button', {
                          type: 'button',
                          className: Ze.sub,
                          disabled: y,
                          onClick: () => k('menu'),
                          children: 'もどる',
                        }),
                      ],
                    }),
                  ],
                })
              : h === 'confirm'
                ? _.jsxs('div', {
                    className: Ze.dialog,
                    children: [
                      _.jsx('h2', { className: Ze.dialogTitle, children: '最初から始めますか？' }),
                      _.jsxs('p', {
                        className: Ze.warn,
                        children: [
                          '現在のセーブデータ「',
                          r == null ? void 0 : r.guildName,
                          '」は上書きされ、元に戻せません。',
                        ],
                      }),
                      _.jsxs('div', {
                        className: Ze.dialogActions,
                        children: [
                          _.jsx('button', {
                            type: 'button',
                            className: Ze.danger,
                            disabled: y,
                            onClick: () => k('guildName'),
                            children: 'データを消して始める',
                          }),
                          _.jsx('button', {
                            type: 'button',
                            className: Ze.sub,
                            disabled: y,
                            onClick: () => k('menu'),
                            children: 'もどる',
                          }),
                        ],
                      }),
                    ],
                  })
                : _.jsxs('div', {
                    className: Ze.menu,
                    children: [
                      r !== null && _.jsx(Yw, { meta: r, onContinue: () => void O() }),
                      _.jsx('button', {
                        type: 'button',
                        className: M ? Ze.sub : Ze.primary,
                        onClick: x,
                        children: '最初から',
                      }),
                    ],
                  }),
        }),
        _.jsxs('footer', { className: Ze.foot, children: ['v', '0.1.32'] }),
      ],
    });
  },
  Vw = '_layout_uxqv8_1',
  Qw = '_head_uxqv8_12',
  Kw = '_guildName_uxqv8_16',
  Zw = '_stats_uxqv8_21',
  Jw = '_hint_uxqv8_40',
  Pw = '_menu_uxqv8_50',
  Fw = '_foot_uxqv8_57',
  Ww = '_exit_uxqv8_61',
  eT = '_warpOverlay_uxqv8_72',
  tT = '_warpPanel_uxqv8_83',
  lT = '_warpTitle_uxqv8_94',
  aT = '_warpBtn_uxqv8_99',
  nT = '_warpClose_uxqv8_110',
  Ht = {
    layout: Vw,
    head: Qw,
    guildName: Kw,
    stats: Zw,
    hint: Jw,
    menu: Pw,
    foot: Fw,
    exit: Ww,
    warpOverlay: eT,
    warpPanel: tT,
    warpTitle: lT,
    warpBtn: aT,
    warpClose: nT,
  },
  iT = '_button_1tp4a_1',
  sT = '_primary_1tp4a_26',
  rT = '_label_1tp4a_32',
  oT = '_description_1tp4a_37',
  Cr = { button: iT, primary: sT, label: rT, description: oT },
  In = ({ label: l, description: i, variant: o = 'default', disabled: r = !1, onClick: c }) =>
    _.jsxs('button', {
      type: 'button',
      className: `${Cr.button} ${o === 'primary' ? Cr.primary : ''}`,
      disabled: r,
      onClick: c,
      children: [
        _.jsx('span', { className: Cr.label, children: l }),
        i ? _.jsx('span', { className: Cr.description, children: i }) : null,
      ],
    }),
  uT = () => {
    const l = dl(),
      { save: i, exitToTitle: o, applyAndPersist: r } = Xl(),
      [c, d] = T.useState(!1);
    if (!i) return _.jsx(ol, { to: '/title', replace: !0 });
    const { guild: f, towerState: h, diveState: k } = i,
      p = f.members.length > 0,
      v = () => {
        (o(), l('/title'));
      },
      y = async () => {
        (k || (await r((O) => Op(O, 1))), l('/dungeon'));
      },
      E = h.warp.unlockedCheckpoints,
      M = async (O) => {
        (d(!1), await r((x) => Op(x, O)), l('/dungeon'));
      };
    return _.jsxs('div', {
      className: Ht.layout,
      children: [
        _.jsxs('header', {
          className: Ht.head,
          children: [
            _.jsx('div', { className: Ht.guildName, children: f.name }),
            _.jsxs('dl', {
              className: Ht.stats,
              children: [
                _.jsxs('div', {
                  children: [
                    _.jsx('dt', { children: '所持金' }),
                    _.jsxs('dd', { children: [f.gold, ' G'] }),
                  ],
                }),
                _.jsxs('div', {
                  children: [
                    _.jsx('dt', { children: '最高到達' }),
                    _.jsx('dd', {
                      children: h.record.deepestReached > 0 ? `${h.record.deepestReached}F` : '-',
                    }),
                  ],
                }),
                _.jsxs('div', {
                  children: [
                    _.jsx('dt', { children: '団員' }),
                    _.jsxs('dd', { children: [f.members.length, '人'] }),
                  ],
                }),
              ],
            }),
          ],
        }),
        !p &&
          _.jsx('p', {
            className: Ht.hint,
            children:
              'まずは「ギルド管理」で冒険者を作成してください。団員がいないとダイブできません。',
          }),
        _.jsxs('main', {
          className: Ht.menu,
          children: [
            _.jsx(In, {
              label: k ? '潜行を再開' : 'ダイブ開始',
              description: p
                ? k
                  ? `${k.depth}F から再開`
                  : '第1階からタワーへ潜る'
                : '団員が必要です',
              variant: 'primary',
              disabled: !p,
              onClick: () => void y(),
            }),
            _.jsx(In, {
              label: 'ワープ',
              description:
                E.length === 0
                  ? 'ボス撃破で解放'
                  : k
                    ? '潜行中は使えません'
                    : `解放済み: ${E.map((O) => `${O}F`).join('・')}`,
              disabled: !p || E.length === 0 || !!k,
              onClick: () => d(!0),
            }),
            _.jsx(In, {
              label: 'ギルド管理',
              description: '編成・キャラ作成',
              onClick: () => l('/guild'),
            }),
            _.jsx(In, {
              label: 'ショップ',
              description: '装備・アイテム売買',
              onClick: () => l('/shop'),
            }),
            _.jsx(In, {
              label: '鍛冶屋',
              description: '装備の強化・リサイクル',
              onClick: () => l('/forge'),
            }),
            _.jsx(In, {
              label: '図鑑 / 記録',
              description: '到達記録・モンスター図鑑',
              onClick: () => l('/codex'),
            }),
          ],
        }),
        _.jsx('footer', {
          className: Ht.foot,
          children: _.jsx('button', {
            type: 'button',
            className: Ht.exit,
            onClick: v,
            children: 'タイトルへ戻る',
          }),
        }),
        c
          ? _.jsx('div', {
              className: Ht.warpOverlay,
              onClick: () => d(!1),
              children: _.jsxs('div', {
                className: Ht.warpPanel,
                onClick: (O) => O.stopPropagation(),
                children: [
                  _.jsx('div', { className: Ht.warpTitle, children: 'ワープ先を選択' }),
                  E.map((O) =>
                    _.jsxs(
                      'button',
                      {
                        type: 'button',
                        className: Ht.warpBtn,
                        onClick: () => void M(O),
                        children: ['第 ', O, ' 階へ'],
                      },
                      O
                    )
                  ),
                  _.jsx('button', {
                    type: 'button',
                    className: Ht.warpClose,
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
function cT() {
  return _.jsxs($0, {
    children: [
      _.jsx(Ft, { path: '/', element: _.jsx(ol, { to: '/title', replace: !0 }) }),
      _.jsx(Ft, { path: '/title', element: _.jsx(Xw, {}) }),
      _.jsx(Ft, { path: '/town', element: _.jsx(uT, {}) }),
      _.jsx(Ft, { path: '/guild', element: _.jsx(a5, {}) }),
      _.jsx(Ft, { path: '/guild/char/:id', element: _.jsx(Q5, {}) }),
      _.jsx(Ft, { path: '/shop', element: _.jsx(vw, {}) }),
      _.jsx(Ft, { path: '/forge', element: _.jsx(qS, {}) }),
      _.jsx(Ft, { path: '/codex', element: _.jsx(x3, {}) }),
      _.jsx(Ft, { path: '/dungeon', element: _.jsx(dS, {}) }),
      _.jsx(Ft, { path: '/battle', element: _.jsx(Qx, {}) }),
      _.jsx(Ft, { path: '*', element: _.jsx(K5, {}) }),
    ],
  });
}
const dT = {
    races: St,
    classes: et,
    titles: Ul,
    skills: Yi,
    unionSkills: Rn,
    summons: Xn,
    gatherTypes: Ha,
    recipes: Vn,
    enemies: ul,
    items: tt,
    equipment: ot,
  },
  mT = /^[a-z]+_[a-z0-9_]+$/;
function nl(l, i, o) {
  for (const r of i)
    mT.test(r) || o.push(`[${l}] ID 命名規約違反: "${r}"（期待: <domain>_<name>）`);
}
function jc(l, i, o, r) {
  const c = new Set(i.skills.map((d) => d.skillId));
  for (const d of i.skills) {
    o.has(d.skillId) || r.push(`[${l}] 未定義スキルを参照: "${d.skillId}"`);
    for (const f of d.requires ?? [])
      c.has(f.skillId) ||
        r.push(`[${l}] スキル "${d.skillId}" の前提 "${f.skillId}" が同ツリーに存在しない`);
  }
}
function _T() {
  var S;
  const l = [],
    {
      races: i,
      classes: o,
      titles: r,
      skills: c,
      unionSkills: d,
      summons: f,
      gatherTypes: h,
      recipes: k,
      enemies: p,
      items: v,
      equipment: y,
    } = dT;
  (nl('races', Object.keys(i), l),
    nl('classes', Object.keys(o), l),
    nl('titles', Object.keys(r), l),
    nl('skills', Object.keys(c), l),
    nl('enemies', Object.keys(p), l),
    nl('items', Object.keys(v), l),
    nl('equipment', Object.keys(y), l));
  const E = (b, C) => {
    for (const [A, F] of Object.entries(C))
      A !== F.id && l.push(`[${b}] キー "${A}" と id "${F.id}" が不一致`);
  };
  (E('races', i),
    E('classes', o),
    E('titles', r),
    E('skills', c),
    E('enemies', p),
    E('items', v),
    E('equipment', y));
  const M = new Set(Object.keys(c)),
    O = new Set(Object.keys(o)),
    x = new Set(Object.keys(r));
  for (const b of Object.values(i)) {
    (O.has(b.defaultClassId) ||
      l.push(`[races] "${b.id}" の defaultClassId "${b.defaultClassId}" が未定義`),
      jc(`races/${b.id}`, b.raceSkillTree, M, l));
    for (const C of b.raceSkillTree.skills) {
      const A = d[C.skillId];
      A &&
        A.raceId !== b.id &&
        l.push(`[races/${b.id}] ユニオンスキル "${C.skillId}" の raceId "${A.raceId}" が不一致`);
    }
  }
  for (const b of Object.values(d)) {
    const C = (S = i[b.raceId]) == null ? void 0 : S.raceSkillTree;
    (!C || !C.skills.some((A) => A.skillId === b.id)) &&
      l.push(`[unionSkills] "${b.id}" が種族 "${b.raceId}" のスキルツリーに無い`);
  }
  nl('unionSkills', Object.keys(d), l);
  for (const [b, C] of Object.entries(d))
    (b !== C.id && l.push(`[unionSkills] キー "${b}" と id "${C.id}" が不一致`),
      C.id in c || l.push(`[unionSkills] "${C.id}" が skills に未定義`),
      C.requiredParticipants < 1 &&
        l.push(`[unionSkills] "${C.id}" の requiredParticipants が 1 未満`),
      (C.gaugeCostPerParticipant < 0 || C.gaugeCostPerParticipant > 100) &&
        l.push(`[unionSkills] "${C.id}" の gaugeCostPerParticipant が 0..100 外`),
      C.id in Wt &&
        l.push(
          `[unionSkills] "${C.id}" が BATTLE_SKILLS にも存在（通常スキルとして撃ててしまう）`
        ));
  nl('passiveSkills', Object.keys(Mc), l);
  for (const [b, C] of Object.entries(Mc))
    (b !== C.id && l.push(`[passiveSkills] キー "${b}" と id "${C.id}" が不一致`),
      M.has(C.id) || l.push(`[passiveSkills] "${C.id}" が skills に未定義`),
      C.id in Wt &&
        l.push(`[passiveSkills] "${C.id}" が BATTLE_SKILLS にも存在（戦闘で撃ててしまう）`),
      C.id in d && l.push(`[passiveSkills] "${C.id}" が UNION_SKILLS にも存在`));
  nl('summons', Object.keys(f), l);
  for (const [b, C] of Object.entries(f))
    b !== C.id && l.push(`[summons] キー "${b}" と id "${C.id}" が不一致`);
  for (const b of Object.values(Wt))
    for (const C of b.effects)
      C.kind === 'summon' &&
        !(C.summonKind in f) &&
        l.push(`[battleSkills] "${b.id}" の召喚 "${C.summonKind}" が未定義`);
  for (const [b, C] of Object.entries(h)) {
    (b !== C.type && l.push(`[gatherTypes] キー "${b}" と type "${C.type}" が不一致`),
      M.has(C.requiredSkillId) ||
        l.push(`[gatherTypes] "${C.type}" の requiredSkillId "${C.requiredSkillId}" が未定義`));
    for (const A of C.drops) {
      if (!(A.itemId in v))
        l.push(`[gatherTypes] "${C.type}" のドロップ "${A.itemId}" が未定義アイテム`);
      else {
        const F = v[A.itemId].category === 'food';
        (C.food &&
          !F &&
          l.push(`[gatherTypes] 食材系統 "${C.type}" のドロップ "${A.itemId}" が food でない`),
          !C.food &&
            F &&
            l.push(`[gatherTypes] 素材系統 "${C.type}" のドロップ "${A.itemId}" が food`));
      }
      A.weight <= 0 && l.push(`[gatherTypes] "${C.type}" のドロップ重みが正でない`);
    }
  }
  nl('recipes', Object.keys(k), l);
  for (const [b, C] of Object.entries(k)) {
    b !== C.id && l.push(`[recipes] キー "${b}" と id "${C.id}" が不一致`);
    for (const A of C.ingredients)
      A.itemId in v
        ? v[A.itemId].category !== 'food' &&
          l.push(`[recipes] "${C.id}" の材料 "${A.itemId}" が food カテゴリでない`)
        : l.push(`[recipes] "${C.id}" の材料 "${A.itemId}" が未定義`);
    C.result.itemId in v
      ? v[C.result.itemId].category !== 'food' &&
        l.push(`[recipes] "${C.id}" の結果 "${C.result.itemId}" が food カテゴリでない`)
      : l.push(`[recipes] "${C.id}" の結果 "${C.result.itemId}" が未定義`);
  }
  for (const b of Object.values(o)) {
    jc(`classes/${b.id}`, b.skillTree, M, l);
    for (const C of b.titleOptions) {
      if (!x.has(C)) {
        l.push(`[classes] "${b.id}" の称号 "${C}" が未定義`);
        continue;
      }
      r[C].parentClassId !== b.id &&
        l.push(`[classes] 称号 "${C}" の parentClassId が "${b.id}" と不一致`);
    }
  }
  for (const b of Object.values(r))
    (O.has(b.parentClassId) ||
      l.push(`[titles] "${b.id}" の parentClassId "${b.parentClassId}" が未定義`),
      jc(`titles/${b.id}`, b.skillTree, M, l));
  for (const b of Object.values(y))
    (b.slot === 'weapon' &&
      !b.weaponType &&
      l.push(`[equipment] "${b.id}" は weapon だが weaponType が未設定`),
      b.slot === 'armor' &&
        !b.armorType &&
        l.push(`[equipment] "${b.id}" は armor だが armorType が未設定`),
      (b.buyPrice < 0 || b.tier < 0) && l.push(`[equipment] "${b.id}" の buyPrice/tier が負`));
  for (const b of Object.values(v))
    (b.buyPrice < 0 && l.push(`[items] "${b.id}" の buyPrice が負`),
      b.category === 'consumable' &&
        !b.useContext &&
        !b.effects &&
        l.push(`[items] 消費アイテム "${b.id}" に useContext も effects も無い（使用不能）`));
  for (const b of Object.values(p))
    for (const C of b.drops ?? [])
      (C.itemId in v || l.push(`[enemies] "${b.id}" のドロップ "${C.itemId}" が未定義アイテム`),
        (C.rate < 0 || C.rate > 1) &&
          l.push(`[enemies] "${b.id}" のドロップ "${C.itemId}" の rate が 0..1 外`));
  for (const [b, C] of Object.entries(fg)) {
    b in v || l.push(`[SELL_UNLOCKS] キー素材 "${b}" が未定義`);
    for (const A of C) A in y || l.push(`[SELL_UNLOCKS] 解放先装備 "${A}" が未定義`);
  }
  return { ok: l.length === 0, errors: l };
}
const Pp = _T();
Pp.ok || console.error('マスターデータ検証エラー:', Pp.errors);
const gg = document.getElementById('root');
if (!gg) throw new Error('Failed to find #root element');
Xv.createRoot(gg).render(
  _.jsx(_y, { basename: '/sekaiju-like-game', children: _.jsx(zx, { children: _.jsx(cT, {}) }) })
);
