var Vv = Object.defineProperty;
var Qv = (l, i, o) =>
  i in l ? Vv(l, i, { enumerable: !0, configurable: !0, writable: !0, value: o }) : (l[i] = o);
var mu = (l, i, o) => Qv(l, typeof i != 'symbol' ? i + '' : i, o);
(function () {
  const i = document.createElement('link').relList;
  if (i && i.supports && i.supports('modulepreload')) return;
  for (const u of document.querySelectorAll('link[rel="modulepreload"]')) r(u);
  new MutationObserver((u) => {
    for (const d of u)
      if (d.type === 'childList')
        for (const f of d.addedNodes) f.tagName === 'LINK' && f.rel === 'modulepreload' && r(f);
  }).observe(document, { childList: !0, subtree: !0 });
  function o(u) {
    const d = {};
    return (
      u.integrity && (d.integrity = u.integrity),
      u.referrerPolicy && (d.referrerPolicy = u.referrerPolicy),
      u.crossOrigin === 'use-credentials'
        ? (d.credentials = 'include')
        : u.crossOrigin === 'anonymous'
          ? (d.credentials = 'omit')
          : (d.credentials = 'same-origin'),
      d
    );
  }
  function r(u) {
    if (u.ep) return;
    u.ep = !0;
    const d = o(u);
    fetch(u.href, d);
  }
})();
var _u = { exports: {} },
  Ui = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var hp;
function Kv() {
  if (hp) return Ui;
  hp = 1;
  var l = Symbol.for('react.transitional.element'),
    i = Symbol.for('react.fragment');
  function o(r, u, d) {
    var f = null;
    if ((d !== void 0 && (f = '' + d), u.key !== void 0 && (f = '' + u.key), 'key' in u)) {
      d = {};
      for (var h in u) h !== 'key' && (d[h] = u[h]);
    } else d = u;
    return ((u = d.ref), { $$typeof: l, type: r, key: f, ref: u !== void 0 ? u : null, props: d });
  }
  return ((Ui.Fragment = i), (Ui.jsx = o), (Ui.jsxs = o), Ui);
}
var gp;
function Zv() {
  return (gp || ((gp = 1), (_u.exports = Kv())), _u.exports);
}
var m = Zv(),
  fu = { exports: {} },
  $i = {},
  pu = { exports: {} },
  hu = {};
/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var kp;
function Jv() {
  return (
    kp ||
      ((kp = 1),
      (function (l) {
        function i(q, J) {
          var ne = q.length;
          q.push(J);
          e: for (; 0 < ne; ) {
            var pe = (ne - 1) >>> 1,
              K = q[pe];
            if (0 < u(K, J)) ((q[pe] = J), (q[ne] = K), (ne = pe));
            else break e;
          }
        }
        function o(q) {
          return q.length === 0 ? null : q[0];
        }
        function r(q) {
          if (q.length === 0) return null;
          var J = q[0],
            ne = q.pop();
          if (ne !== J) {
            q[0] = ne;
            e: for (var pe = 0, K = q.length, b = K >>> 1; pe < b; ) {
              var N = 2 * (pe + 1) - 1,
                X = q[N],
                F = N + 1,
                te = q[F];
              if (0 > u(X, ne))
                F < K && 0 > u(te, X)
                  ? ((q[pe] = te), (q[F] = ne), (pe = F))
                  : ((q[pe] = X), (q[N] = ne), (pe = N));
              else if (F < K && 0 > u(te, ne)) ((q[pe] = te), (q[F] = ne), (pe = F));
              else break e;
            }
          }
          return J;
        }
        function u(q, J) {
          var ne = q.sortIndex - J.sortIndex;
          return ne !== 0 ? ne : q.id - J.id;
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
        var p = [],
          g = [],
          y = 1,
          v = null,
          I = 3,
          L = !1,
          M = !1,
          S = !1,
          E = !1,
          x = typeof setTimeout == 'function' ? setTimeout : null,
          C = typeof clearTimeout == 'function' ? clearTimeout : null,
          $ = typeof setImmediate < 'u' ? setImmediate : null;
        function D(q) {
          for (var J = o(g); J !== null; ) {
            if (J.callback === null) r(g);
            else if (J.startTime <= q) (r(g), (J.sortIndex = J.expirationTime), i(p, J));
            else break;
            J = o(g);
          }
        }
        function ae(q) {
          if (((S = !1), D(q), !M))
            if (o(p) !== null) ((M = !0), Y || ((Y = !0), de()));
            else {
              var J = o(g);
              J !== null && ve(ae, J.startTime - q);
            }
        }
        var Y = !1,
          T = -1,
          V = 5,
          ie = -1;
        function ue() {
          return E ? !0 : !(l.unstable_now() - ie < V);
        }
        function W() {
          if (((E = !1), Y)) {
            var q = l.unstable_now();
            ie = q;
            var J = !0;
            try {
              e: {
                ((M = !1), S && ((S = !1), C(T), (T = -1)), (L = !0));
                var ne = I;
                try {
                  t: {
                    for (D(q), v = o(p); v !== null && !(v.expirationTime > q && ue()); ) {
                      var pe = v.callback;
                      if (typeof pe == 'function') {
                        ((v.callback = null), (I = v.priorityLevel));
                        var K = pe(v.expirationTime <= q);
                        if (((q = l.unstable_now()), typeof K == 'function')) {
                          ((v.callback = K), D(q), (J = !0));
                          break t;
                        }
                        (v === o(p) && r(p), D(q));
                      } else r(p);
                      v = o(p);
                    }
                    if (v !== null) J = !0;
                    else {
                      var b = o(g);
                      (b !== null && ve(ae, b.startTime - q), (J = !1));
                    }
                  }
                  break e;
                } finally {
                  ((v = null), (I = ne), (L = !1));
                }
                J = void 0;
              }
            } finally {
              J ? de() : (Y = !1);
            }
          }
        }
        var de;
        if (typeof $ == 'function')
          de = function () {
            $(W);
          };
        else if (typeof MessageChannel < 'u') {
          var ye = new MessageChannel(),
            xe = ye.port2;
          ((ye.port1.onmessage = W),
            (de = function () {
              xe.postMessage(null);
            }));
        } else
          de = function () {
            x(W, 0);
          };
        function ve(q, J) {
          T = x(function () {
            q(l.unstable_now());
          }, J);
        }
        ((l.unstable_IdlePriority = 5),
          (l.unstable_ImmediatePriority = 1),
          (l.unstable_LowPriority = 4),
          (l.unstable_NormalPriority = 3),
          (l.unstable_Profiling = null),
          (l.unstable_UserBlockingPriority = 2),
          (l.unstable_cancelCallback = function (q) {
            q.callback = null;
          }),
          (l.unstable_forceFrameRate = function (q) {
            0 > q || 125 < q
              ? console.error(
                  'forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported'
                )
              : (V = 0 < q ? Math.floor(1e3 / q) : 5);
          }),
          (l.unstable_getCurrentPriorityLevel = function () {
            return I;
          }),
          (l.unstable_next = function (q) {
            switch (I) {
              case 1:
              case 2:
              case 3:
                var J = 3;
                break;
              default:
                J = I;
            }
            var ne = I;
            I = J;
            try {
              return q();
            } finally {
              I = ne;
            }
          }),
          (l.unstable_requestPaint = function () {
            E = !0;
          }),
          (l.unstable_runWithPriority = function (q, J) {
            switch (q) {
              case 1:
              case 2:
              case 3:
              case 4:
              case 5:
                break;
              default:
                q = 3;
            }
            var ne = I;
            I = q;
            try {
              return J();
            } finally {
              I = ne;
            }
          }),
          (l.unstable_scheduleCallback = function (q, J, ne) {
            var pe = l.unstable_now();
            switch (
              (typeof ne == 'object' && ne !== null
                ? ((ne = ne.delay), (ne = typeof ne == 'number' && 0 < ne ? pe + ne : pe))
                : (ne = pe),
              q)
            ) {
              case 1:
                var K = -1;
                break;
              case 2:
                K = 250;
                break;
              case 5:
                K = 1073741823;
                break;
              case 4:
                K = 1e4;
                break;
              default:
                K = 5e3;
            }
            return (
              (K = ne + K),
              (q = {
                id: y++,
                callback: J,
                priorityLevel: q,
                startTime: ne,
                expirationTime: K,
                sortIndex: -1,
              }),
              ne > pe
                ? ((q.sortIndex = ne),
                  i(g, q),
                  o(p) === null && q === o(g) && (S ? (C(T), (T = -1)) : (S = !0), ve(ae, ne - pe)))
                : ((q.sortIndex = K), i(p, q), M || L || ((M = !0), Y || ((Y = !0), de()))),
              q
            );
          }),
          (l.unstable_shouldYield = ue),
          (l.unstable_wrapCallback = function (q) {
            var J = I;
            return function () {
              var ne = I;
              I = J;
              try {
                return q.apply(this, arguments);
              } finally {
                I = ne;
              }
            };
          }));
      })(hu)),
    hu
  );
}
var vp;
function Pv() {
  return (vp || ((vp = 1), (pu.exports = Jv())), pu.exports);
}
var gu = { exports: {} },
  be = {};
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var yp;
function Fv() {
  if (yp) return be;
  yp = 1;
  var l = Symbol.for('react.transitional.element'),
    i = Symbol.for('react.portal'),
    o = Symbol.for('react.fragment'),
    r = Symbol.for('react.strict_mode'),
    u = Symbol.for('react.profiler'),
    d = Symbol.for('react.consumer'),
    f = Symbol.for('react.context'),
    h = Symbol.for('react.forward_ref'),
    p = Symbol.for('react.suspense'),
    g = Symbol.for('react.memo'),
    y = Symbol.for('react.lazy'),
    v = Symbol.for('react.activity'),
    I = Symbol.iterator;
  function L(b) {
    return b === null || typeof b != 'object'
      ? null
      : ((b = (I && b[I]) || b['@@iterator']), typeof b == 'function' ? b : null);
  }
  var M = {
      isMounted: function () {
        return !1;
      },
      enqueueForceUpdate: function () {},
      enqueueReplaceState: function () {},
      enqueueSetState: function () {},
    },
    S = Object.assign,
    E = {};
  function x(b, N, X) {
    ((this.props = b), (this.context = N), (this.refs = E), (this.updater = X || M));
  }
  ((x.prototype.isReactComponent = {}),
    (x.prototype.setState = function (b, N) {
      if (typeof b != 'object' && typeof b != 'function' && b != null)
        throw Error(
          'takes an object of state variables to update or a function which returns an object of state variables.'
        );
      this.updater.enqueueSetState(this, b, N, 'setState');
    }),
    (x.prototype.forceUpdate = function (b) {
      this.updater.enqueueForceUpdate(this, b, 'forceUpdate');
    }));
  function C() {}
  C.prototype = x.prototype;
  function $(b, N, X) {
    ((this.props = b), (this.context = N), (this.refs = E), (this.updater = X || M));
  }
  var D = ($.prototype = new C());
  ((D.constructor = $), S(D, x.prototype), (D.isPureReactComponent = !0));
  var ae = Array.isArray;
  function Y() {}
  var T = { H: null, A: null, T: null, S: null },
    V = Object.prototype.hasOwnProperty;
  function ie(b, N, X) {
    var F = X.ref;
    return { $$typeof: l, type: b, key: N, ref: F !== void 0 ? F : null, props: X };
  }
  function ue(b, N) {
    return ie(b.type, N, b.props);
  }
  function W(b) {
    return typeof b == 'object' && b !== null && b.$$typeof === l;
  }
  function de(b) {
    var N = { '=': '=0', ':': '=2' };
    return (
      '$' +
      b.replace(/[=:]/g, function (X) {
        return N[X];
      })
    );
  }
  var ye = /\/+/g;
  function xe(b, N) {
    return typeof b == 'object' && b !== null && b.key != null ? de('' + b.key) : N.toString(36);
  }
  function ve(b) {
    switch (b.status) {
      case 'fulfilled':
        return b.value;
      case 'rejected':
        throw b.reason;
      default:
        switch (
          (typeof b.status == 'string'
            ? b.then(Y, Y)
            : ((b.status = 'pending'),
              b.then(
                function (N) {
                  b.status === 'pending' && ((b.status = 'fulfilled'), (b.value = N));
                },
                function (N) {
                  b.status === 'pending' && ((b.status = 'rejected'), (b.reason = N));
                }
              )),
          b.status)
        ) {
          case 'fulfilled':
            return b.value;
          case 'rejected':
            throw b.reason;
        }
    }
    throw b;
  }
  function q(b, N, X, F, te) {
    var me = typeof b;
    (me === 'undefined' || me === 'boolean') && (b = null);
    var _e = !1;
    if (b === null) _e = !0;
    else
      switch (me) {
        case 'bigint':
        case 'string':
        case 'number':
          _e = !0;
          break;
        case 'object':
          switch (b.$$typeof) {
            case l:
            case i:
              _e = !0;
              break;
            case y:
              return ((_e = b._init), q(_e(b._payload), N, X, F, te));
          }
      }
    if (_e)
      return (
        (te = te(b)),
        (_e = F === '' ? '.' + xe(b, 0) : F),
        ae(te)
          ? ((X = ''),
            _e != null && (X = _e.replace(ye, '$&/') + '/'),
            q(te, N, X, '', function (tl) {
              return tl;
            }))
          : te != null &&
            (W(te) &&
              (te = ue(
                te,
                X +
                  (te.key == null || (b && b.key === te.key)
                    ? ''
                    : ('' + te.key).replace(ye, '$&/') + '/') +
                  _e
              )),
            N.push(te)),
        1
      );
    _e = 0;
    var Le = F === '' ? '.' : F + ':';
    if (ae(b))
      for (var Me = 0; Me < b.length; Me++)
        ((F = b[Me]), (me = Le + xe(F, Me)), (_e += q(F, N, X, me, te)));
    else if (((Me = L(b)), typeof Me == 'function'))
      for (b = Me.call(b), Me = 0; !(F = b.next()).done; )
        ((F = F.value), (me = Le + xe(F, Me++)), (_e += q(F, N, X, me, te)));
    else if (me === 'object') {
      if (typeof b.then == 'function') return q(ve(b), N, X, F, te);
      throw (
        (N = String(b)),
        Error(
          'Objects are not valid as a React child (found: ' +
            (N === '[object Object]' ? 'object with keys {' + Object.keys(b).join(', ') + '}' : N) +
            '). If you meant to render a collection of children, use an array instead.'
        )
      );
    }
    return _e;
  }
  function J(b, N, X) {
    if (b == null) return b;
    var F = [],
      te = 0;
    return (
      q(b, F, '', '', function (me) {
        return N.call(X, me, te++);
      }),
      F
    );
  }
  function ne(b) {
    if (b._status === -1) {
      var N = b._result;
      ((N = N()),
        N.then(
          function (X) {
            (b._status === 0 || b._status === -1) && ((b._status = 1), (b._result = X));
          },
          function (X) {
            (b._status === 0 || b._status === -1) && ((b._status = 2), (b._result = X));
          }
        ),
        b._status === -1 && ((b._status = 0), (b._result = N)));
    }
    if (b._status === 1) return b._result.default;
    throw b._result;
  }
  var pe =
      typeof reportError == 'function'
        ? reportError
        : function (b) {
            if (typeof window == 'object' && typeof window.ErrorEvent == 'function') {
              var N = new window.ErrorEvent('error', {
                bubbles: !0,
                cancelable: !0,
                message:
                  typeof b == 'object' && b !== null && typeof b.message == 'string'
                    ? String(b.message)
                    : String(b),
                error: b,
              });
              if (!window.dispatchEvent(N)) return;
            } else if (typeof process == 'object' && typeof process.emit == 'function') {
              process.emit('uncaughtException', b);
              return;
            }
            console.error(b);
          },
    K = {
      map: J,
      forEach: function (b, N, X) {
        J(
          b,
          function () {
            N.apply(this, arguments);
          },
          X
        );
      },
      count: function (b) {
        var N = 0;
        return (
          J(b, function () {
            N++;
          }),
          N
        );
      },
      toArray: function (b) {
        return (
          J(b, function (N) {
            return N;
          }) || []
        );
      },
      only: function (b) {
        if (!W(b))
          throw Error('React.Children.only expected to receive a single React element child.');
        return b;
      },
    };
  return (
    (be.Activity = v),
    (be.Children = K),
    (be.Component = x),
    (be.Fragment = o),
    (be.Profiler = u),
    (be.PureComponent = $),
    (be.StrictMode = r),
    (be.Suspense = p),
    (be.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = T),
    (be.__COMPILER_RUNTIME = {
      __proto__: null,
      c: function (b) {
        return T.H.useMemoCache(b);
      },
    }),
    (be.cache = function (b) {
      return function () {
        return b.apply(null, arguments);
      };
    }),
    (be.cacheSignal = function () {
      return null;
    }),
    (be.cloneElement = function (b, N, X) {
      if (b == null) throw Error('The argument must be a React element, but you passed ' + b + '.');
      var F = S({}, b.props),
        te = b.key;
      if (N != null)
        for (me in (N.key !== void 0 && (te = '' + N.key), N))
          !V.call(N, me) ||
            me === 'key' ||
            me === '__self' ||
            me === '__source' ||
            (me === 'ref' && N.ref === void 0) ||
            (F[me] = N[me]);
      var me = arguments.length - 2;
      if (me === 1) F.children = X;
      else if (1 < me) {
        for (var _e = Array(me), Le = 0; Le < me; Le++) _e[Le] = arguments[Le + 2];
        F.children = _e;
      }
      return ie(b.type, te, F);
    }),
    (be.createContext = function (b) {
      return (
        (b = {
          $$typeof: f,
          _currentValue: b,
          _currentValue2: b,
          _threadCount: 0,
          Provider: null,
          Consumer: null,
        }),
        (b.Provider = b),
        (b.Consumer = { $$typeof: d, _context: b }),
        b
      );
    }),
    (be.createElement = function (b, N, X) {
      var F,
        te = {},
        me = null;
      if (N != null)
        for (F in (N.key !== void 0 && (me = '' + N.key), N))
          V.call(N, F) && F !== 'key' && F !== '__self' && F !== '__source' && (te[F] = N[F]);
      var _e = arguments.length - 2;
      if (_e === 1) te.children = X;
      else if (1 < _e) {
        for (var Le = Array(_e), Me = 0; Me < _e; Me++) Le[Me] = arguments[Me + 2];
        te.children = Le;
      }
      if (b && b.defaultProps)
        for (F in ((_e = b.defaultProps), _e)) te[F] === void 0 && (te[F] = _e[F]);
      return ie(b, me, te);
    }),
    (be.createRef = function () {
      return { current: null };
    }),
    (be.forwardRef = function (b) {
      return { $$typeof: h, render: b };
    }),
    (be.isValidElement = W),
    (be.lazy = function (b) {
      return { $$typeof: y, _payload: { _status: -1, _result: b }, _init: ne };
    }),
    (be.memo = function (b, N) {
      return { $$typeof: g, type: b, compare: N === void 0 ? null : N };
    }),
    (be.startTransition = function (b) {
      var N = T.T,
        X = {};
      T.T = X;
      try {
        var F = b(),
          te = T.S;
        (te !== null && te(X, F),
          typeof F == 'object' && F !== null && typeof F.then == 'function' && F.then(Y, pe));
      } catch (me) {
        pe(me);
      } finally {
        (N !== null && X.types !== null && (N.types = X.types), (T.T = N));
      }
    }),
    (be.unstable_useCacheRefresh = function () {
      return T.H.useCacheRefresh();
    }),
    (be.use = function (b) {
      return T.H.use(b);
    }),
    (be.useActionState = function (b, N, X) {
      return T.H.useActionState(b, N, X);
    }),
    (be.useCallback = function (b, N) {
      return T.H.useCallback(b, N);
    }),
    (be.useContext = function (b) {
      return T.H.useContext(b);
    }),
    (be.useDebugValue = function () {}),
    (be.useDeferredValue = function (b, N) {
      return T.H.useDeferredValue(b, N);
    }),
    (be.useEffect = function (b, N) {
      return T.H.useEffect(b, N);
    }),
    (be.useEffectEvent = function (b) {
      return T.H.useEffectEvent(b);
    }),
    (be.useId = function () {
      return T.H.useId();
    }),
    (be.useImperativeHandle = function (b, N, X) {
      return T.H.useImperativeHandle(b, N, X);
    }),
    (be.useInsertionEffect = function (b, N) {
      return T.H.useInsertionEffect(b, N);
    }),
    (be.useLayoutEffect = function (b, N) {
      return T.H.useLayoutEffect(b, N);
    }),
    (be.useMemo = function (b, N) {
      return T.H.useMemo(b, N);
    }),
    (be.useOptimistic = function (b, N) {
      return T.H.useOptimistic(b, N);
    }),
    (be.useReducer = function (b, N, X) {
      return T.H.useReducer(b, N, X);
    }),
    (be.useRef = function (b) {
      return T.H.useRef(b);
    }),
    (be.useState = function (b) {
      return T.H.useState(b);
    }),
    (be.useSyncExternalStore = function (b, N, X) {
      return T.H.useSyncExternalStore(b, N, X);
    }),
    (be.useTransition = function () {
      return T.H.useTransition();
    }),
    (be.version = '19.2.5'),
    be
  );
}
var bp;
function Zu() {
  return (bp || ((bp = 1), (gu.exports = Fv())), gu.exports);
}
var ku = { exports: {} },
  xt = {};
/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var xp;
function Wv() {
  if (xp) return xt;
  xp = 1;
  var l = Zu();
  function i(p) {
    var g = 'https://react.dev/errors/' + p;
    if (1 < arguments.length) {
      g += '?args[]=' + encodeURIComponent(arguments[1]);
      for (var y = 2; y < arguments.length; y++) g += '&args[]=' + encodeURIComponent(arguments[y]);
    }
    return (
      'Minified React error #' +
      p +
      '; visit ' +
      g +
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
    u = Symbol.for('react.portal');
  function d(p, g, y) {
    var v = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: u,
      key: v == null ? null : '' + v,
      children: p,
      containerInfo: g,
      implementation: y,
    };
  }
  var f = l.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function h(p, g) {
    if (p === 'font') return '';
    if (typeof g == 'string') return g === 'use-credentials' ? g : '';
  }
  return (
    (xt.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = r),
    (xt.createPortal = function (p, g) {
      var y = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
      if (!g || (g.nodeType !== 1 && g.nodeType !== 9 && g.nodeType !== 11)) throw Error(i(299));
      return d(p, g, null, y);
    }),
    (xt.flushSync = function (p) {
      var g = f.T,
        y = r.p;
      try {
        if (((f.T = null), (r.p = 2), p)) return p();
      } finally {
        ((f.T = g), (r.p = y), r.d.f());
      }
    }),
    (xt.preconnect = function (p, g) {
      typeof p == 'string' &&
        (g
          ? ((g = g.crossOrigin),
            (g = typeof g == 'string' ? (g === 'use-credentials' ? g : '') : void 0))
          : (g = null),
        r.d.C(p, g));
    }),
    (xt.prefetchDNS = function (p) {
      typeof p == 'string' && r.d.D(p);
    }),
    (xt.preinit = function (p, g) {
      if (typeof p == 'string' && g && typeof g.as == 'string') {
        var y = g.as,
          v = h(y, g.crossOrigin),
          I = typeof g.integrity == 'string' ? g.integrity : void 0,
          L = typeof g.fetchPriority == 'string' ? g.fetchPriority : void 0;
        y === 'style'
          ? r.d.S(p, typeof g.precedence == 'string' ? g.precedence : void 0, {
              crossOrigin: v,
              integrity: I,
              fetchPriority: L,
            })
          : y === 'script' &&
            r.d.X(p, {
              crossOrigin: v,
              integrity: I,
              fetchPriority: L,
              nonce: typeof g.nonce == 'string' ? g.nonce : void 0,
            });
      }
    }),
    (xt.preinitModule = function (p, g) {
      if (typeof p == 'string')
        if (typeof g == 'object' && g !== null) {
          if (g.as == null || g.as === 'script') {
            var y = h(g.as, g.crossOrigin);
            r.d.M(p, {
              crossOrigin: y,
              integrity: typeof g.integrity == 'string' ? g.integrity : void 0,
              nonce: typeof g.nonce == 'string' ? g.nonce : void 0,
            });
          }
        } else g == null && r.d.M(p);
    }),
    (xt.preload = function (p, g) {
      if (typeof p == 'string' && typeof g == 'object' && g !== null && typeof g.as == 'string') {
        var y = g.as,
          v = h(y, g.crossOrigin);
        r.d.L(p, y, {
          crossOrigin: v,
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
    (xt.preloadModule = function (p, g) {
      if (typeof p == 'string')
        if (g) {
          var y = h(g.as, g.crossOrigin);
          r.d.m(p, {
            as: typeof g.as == 'string' && g.as !== 'script' ? g.as : void 0,
            crossOrigin: y,
            integrity: typeof g.integrity == 'string' ? g.integrity : void 0,
          });
        } else r.d.m(p);
    }),
    (xt.requestFormReset = function (p) {
      r.d.r(p);
    }),
    (xt.unstable_batchedUpdates = function (p, g) {
      return p(g);
    }),
    (xt.useFormState = function (p, g, y) {
      return f.H.useFormState(p, g, y);
    }),
    (xt.useFormStatus = function () {
      return f.H.useHostTransitionStatus();
    }),
    (xt.version = '19.2.5'),
    xt
  );
}
var Sp;
function ey() {
  if (Sp) return ku.exports;
  Sp = 1;
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
  return (l(), (ku.exports = Wv()), ku.exports);
}
/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var wp;
function ty() {
  if (wp) return $i;
  wp = 1;
  var l = Pv(),
    i = Zu(),
    o = ey();
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
  function u(e) {
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
  function p(e) {
    if (d(e) !== e) throw Error(r(188));
  }
  function g(e) {
    var t = e.alternate;
    if (!t) {
      if (((t = d(e)), t === null)) throw Error(r(188));
      return t !== e ? null : e;
    }
    for (var a = e, n = t; ; ) {
      var s = a.return;
      if (s === null) break;
      var c = s.alternate;
      if (c === null) {
        if (((n = s.return), n !== null)) {
          a = n;
          continue;
        }
        break;
      }
      if (s.child === c.child) {
        for (c = s.child; c; ) {
          if (c === a) return (p(s), e);
          if (c === n) return (p(s), t);
          c = c.sibling;
        }
        throw Error(r(188));
      }
      if (a.return !== n.return) ((a = s), (n = c));
      else {
        for (var _ = !1, k = s.child; k; ) {
          if (k === a) {
            ((_ = !0), (a = s), (n = c));
            break;
          }
          if (k === n) {
            ((_ = !0), (n = s), (a = c));
            break;
          }
          k = k.sibling;
        }
        if (!_) {
          for (k = c.child; k; ) {
            if (k === a) {
              ((_ = !0), (a = c), (n = s));
              break;
            }
            if (k === n) {
              ((_ = !0), (n = c), (a = s));
              break;
            }
            k = k.sibling;
          }
          if (!_) throw Error(r(189));
        }
      }
      if (a.alternate !== n) throw Error(r(190));
    }
    if (a.tag !== 3) throw Error(r(188));
    return a.stateNode.current === a ? e : t;
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
  var v = Object.assign,
    I = Symbol.for('react.element'),
    L = Symbol.for('react.transitional.element'),
    M = Symbol.for('react.portal'),
    S = Symbol.for('react.fragment'),
    E = Symbol.for('react.strict_mode'),
    x = Symbol.for('react.profiler'),
    C = Symbol.for('react.consumer'),
    $ = Symbol.for('react.context'),
    D = Symbol.for('react.forward_ref'),
    ae = Symbol.for('react.suspense'),
    Y = Symbol.for('react.suspense_list'),
    T = Symbol.for('react.memo'),
    V = Symbol.for('react.lazy'),
    ie = Symbol.for('react.activity'),
    ue = Symbol.for('react.memo_cache_sentinel'),
    W = Symbol.iterator;
  function de(e) {
    return e === null || typeof e != 'object'
      ? null
      : ((e = (W && e[W]) || e['@@iterator']), typeof e == 'function' ? e : null);
  }
  var ye = Symbol.for('react.client.reference');
  function xe(e) {
    if (e == null) return null;
    if (typeof e == 'function') return e.$$typeof === ye ? null : e.displayName || e.name || null;
    if (typeof e == 'string') return e;
    switch (e) {
      case S:
        return 'Fragment';
      case x:
        return 'Profiler';
      case E:
        return 'StrictMode';
      case ae:
        return 'Suspense';
      case Y:
        return 'SuspenseList';
      case ie:
        return 'Activity';
    }
    if (typeof e == 'object')
      switch (e.$$typeof) {
        case M:
          return 'Portal';
        case $:
          return e.displayName || 'Context';
        case C:
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
        case T:
          return ((t = e.displayName || null), t !== null ? t : xe(e.type) || 'Memo');
        case V:
          ((t = e._payload), (e = e._init));
          try {
            return xe(e(t));
          } catch {}
      }
    return null;
  }
  var ve = Array.isArray,
    q = i.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
    J = o.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
    ne = { pending: !1, data: null, method: null, action: null },
    pe = [],
    K = -1;
  function b(e) {
    return { current: e };
  }
  function N(e) {
    0 > K || ((e.current = pe[K]), (pe[K] = null), K--);
  }
  function X(e, t) {
    (K++, (pe[K] = e.current), (e.current = t));
  }
  var F = b(null),
    te = b(null),
    me = b(null),
    _e = b(null);
  function Le(e, t) {
    switch ((X(me, t), X(te, e), X(F, null), t.nodeType)) {
      case 9:
      case 11:
        e = (e = t.documentElement) && (e = e.namespaceURI) ? zf(e) : 0;
        break;
      default:
        if (((e = t.tagName), (t = t.namespaceURI))) ((t = zf(t)), (e = Hf(t, e)));
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
    (N(F), X(F, e));
  }
  function Me() {
    (N(F), N(te), N(me));
  }
  function tl(e) {
    e.memoizedState !== null && X(_e, e);
    var t = F.current,
      a = Hf(t, e.type);
    t !== a && (X(te, e), X(F, a));
  }
  function yl(e) {
    (te.current === e && (N(F), N(te)), _e.current === e && (N(_e), (Di._currentValue = ne)));
  }
  var bl, Ya;
  function _l(e) {
    if (bl === void 0)
      try {
        throw Error();
      } catch (a) {
        var t = a.stack.trim().match(/\n( *(at )?)/);
        ((bl = (t && t[1]) || ''),
          (Ya =
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
      bl +
      e +
      Ya
    );
  }
  var Xa = !1;
  function Kn(e, t) {
    if (!e || Xa) return '';
    Xa = !0;
    var a = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var n = {
        DetermineComponentFrameRoot: function () {
          try {
            if (t) {
              var Z = function () {
                throw Error();
              };
              if (
                (Object.defineProperty(Z.prototype, 'props', {
                  set: function () {
                    throw Error();
                  },
                }),
                typeof Reflect == 'object' && Reflect.construct)
              ) {
                try {
                  Reflect.construct(Z, []);
                } catch (U) {
                  var H = U;
                }
                Reflect.construct(e, [], Z);
              } else {
                try {
                  Z.call();
                } catch (U) {
                  H = U;
                }
                e.call(Z.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (U) {
                H = U;
              }
              (Z = e()) && typeof Z.catch == 'function' && Z.catch(function () {});
            }
          } catch (U) {
            if (U && H && typeof U.stack == 'string') return [U.stack, H.stack];
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
      var c = n.DetermineComponentFrameRoot(),
        _ = c[0],
        k = c[1];
      if (_ && k) {
        var j = _.split(`
`),
          z = k.split(`
`);
        for (s = n = 0; n < j.length && !j[n].includes('DetermineComponentFrameRoot'); ) n++;
        for (; s < z.length && !z[s].includes('DetermineComponentFrameRoot'); ) s++;
        if (n === j.length || s === z.length)
          for (n = j.length - 1, s = z.length - 1; 1 <= n && 0 <= s && j[n] !== z[s]; ) s--;
        for (; 1 <= n && 0 <= s; n--, s--)
          if (j[n] !== z[s]) {
            if (n !== 1 || s !== 1)
              do
                if ((n--, s--, 0 > s || j[n] !== z[s])) {
                  var G =
                    `
` + j[n].replace(' at new ', ' at ');
                  return (
                    e.displayName &&
                      G.includes('<anonymous>') &&
                      (G = G.replace('<anonymous>', e.displayName)),
                    G
                  );
                }
              while (1 <= n && 0 <= s);
            break;
          }
      }
    } finally {
      ((Xa = !1), (Error.prepareStackTrace = a));
    }
    return (a = e ? e.displayName || e.name : '') ? _l(a) : '';
  }
  function yt(e, t) {
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
        return Kn(e.type, !1);
      case 11:
        return Kn(e.type.render, !1);
      case 1:
        return Kn(e.type, !0);
      case 31:
        return _l('Activity');
      default:
        return '';
    }
  }
  function is(e) {
    try {
      var t = '',
        a = null;
      do ((t += yt(e, a)), (a = e), (e = e.return));
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
  var Va = Object.prototype.hasOwnProperty,
    Qa = l.unstable_scheduleCallback,
    Zn = l.unstable_cancelCallback,
    ss = l.unstable_shouldYield,
    rs = l.unstable_requestPaint,
    bt = l.unstable_now,
    B = l.unstable_getCurrentPriorityLevel,
    le = l.unstable_ImmediatePriority,
    re = l.unstable_UserBlockingPriority,
    he = l.unstable_NormalPriority,
    Ze = l.unstable_LowPriority,
    Ql = l.unstable_IdlePriority,
    os = l.log,
    Ka = l.unstable_setDisableYieldValue,
    xl = null,
    Lt = null;
  function Kl(e) {
    if ((typeof os == 'function' && Ka(e), Lt && typeof Lt.setStrictMode == 'function'))
      try {
        Lt.setStrictMode(xl, e);
      } catch {}
  }
  var qt = Math.clz32 ? Math.clz32 : qg,
    Ag = Math.log,
    Lg = Math.LN2;
  function qg(e) {
    return ((e >>>= 0), e === 0 ? 32 : (31 - ((Ag(e) / Lg) | 0)) | 0);
  }
  var cs = 256,
    us = 262144,
    ds = 4194304;
  function xa(e) {
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
  function ms(e, t, a) {
    var n = e.pendingLanes;
    if (n === 0) return 0;
    var s = 0,
      c = e.suspendedLanes,
      _ = e.pingedLanes;
    e = e.warmLanes;
    var k = n & 134217727;
    return (
      k !== 0
        ? ((n = k & ~c),
          n !== 0
            ? (s = xa(n))
            : ((_ &= k), _ !== 0 ? (s = xa(_)) : a || ((a = k & ~e), a !== 0 && (s = xa(a)))))
        : ((k = n & ~c),
          k !== 0
            ? (s = xa(k))
            : _ !== 0
              ? (s = xa(_))
              : a || ((a = n & ~e), a !== 0 && (s = xa(a)))),
      s === 0
        ? 0
        : t !== 0 &&
            t !== s &&
            (t & c) === 0 &&
            ((c = s & -s), (a = t & -t), c >= a || (c === 32 && (a & 4194048) !== 0))
          ? t
          : s
    );
  }
  function Jn(e, t) {
    return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & t) === 0;
  }
  function Bg(e, t) {
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
  function vd() {
    var e = ds;
    return ((ds <<= 1), (ds & 62914560) === 0 && (ds = 4194304), e);
  }
  function Wr(e) {
    for (var t = [], a = 0; 31 > a; a++) t.push(e);
    return t;
  }
  function Pn(e, t) {
    ((e.pendingLanes |= t),
      t !== 268435456 && ((e.suspendedLanes = 0), (e.pingedLanes = 0), (e.warmLanes = 0)));
  }
  function Og(e, t, a, n, s, c) {
    var _ = e.pendingLanes;
    ((e.pendingLanes = a),
      (e.suspendedLanes = 0),
      (e.pingedLanes = 0),
      (e.warmLanes = 0),
      (e.expiredLanes &= a),
      (e.entangledLanes &= a),
      (e.errorRecoveryDisabledLanes &= a),
      (e.shellSuspendCounter = 0));
    var k = e.entanglements,
      j = e.expirationTimes,
      z = e.hiddenUpdates;
    for (a = _ & ~a; 0 < a; ) {
      var G = 31 - qt(a),
        Z = 1 << G;
      ((k[G] = 0), (j[G] = -1));
      var H = z[G];
      if (H !== null)
        for (z[G] = null, G = 0; G < H.length; G++) {
          var U = H[G];
          U !== null && (U.lane &= -536870913);
        }
      a &= ~Z;
    }
    (n !== 0 && yd(e, n, 0),
      c !== 0 && s === 0 && e.tag !== 0 && (e.suspendedLanes |= c & ~(_ & ~t)));
  }
  function yd(e, t, a) {
    ((e.pendingLanes |= t), (e.suspendedLanes &= ~t));
    var n = 31 - qt(t);
    ((e.entangledLanes |= t),
      (e.entanglements[n] = e.entanglements[n] | 1073741824 | (a & 261930)));
  }
  function bd(e, t) {
    var a = (e.entangledLanes |= t);
    for (e = e.entanglements; a; ) {
      var n = 31 - qt(a),
        s = 1 << n;
      ((s & t) | (e[n] & t) && (e[n] |= t), (a &= ~s));
    }
  }
  function xd(e, t) {
    var a = t & -t;
    return ((a = (a & 42) !== 0 ? 1 : eo(a)), (a & (e.suspendedLanes | t)) !== 0 ? 0 : a);
  }
  function eo(e) {
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
  function to(e) {
    return ((e &= -e), 2 < e ? (8 < e ? ((e & 134217727) !== 0 ? 32 : 268435456) : 8) : 2);
  }
  function Sd() {
    var e = J.p;
    return e !== 0 ? e : ((e = window.event), e === void 0 ? 32 : cp(e.type));
  }
  function wd(e, t) {
    var a = J.p;
    try {
      return ((J.p = e), t());
    } finally {
      J.p = a;
    }
  }
  var Zl = Math.random().toString(36).slice(2),
    pt = '__reactFiber$' + Zl,
    wt = '__reactProps$' + Zl,
    Za = '__reactContainer$' + Zl,
    lo = '__reactEvents$' + Zl,
    Ig = '__reactListeners$' + Zl,
    Mg = '__reactHandles$' + Zl,
    Td = '__reactResources$' + Zl,
    Fn = '__reactMarker$' + Zl;
  function ao(e) {
    (delete e[pt], delete e[wt], delete e[lo], delete e[Ig], delete e[Mg]);
  }
  function Ja(e) {
    var t = e[pt];
    if (t) return t;
    for (var a = e.parentNode; a; ) {
      if ((t = a[Za] || a[pt])) {
        if (((a = t.alternate), t.child !== null || (a !== null && a.child !== null)))
          for (e = Qf(e); e !== null; ) {
            if ((a = e[pt])) return a;
            e = Qf(e);
          }
        return t;
      }
      ((e = a), (a = e.parentNode));
    }
    return null;
  }
  function Pa(e) {
    if ((e = e[pt] || e[Za])) {
      var t = e.tag;
      if (t === 5 || t === 6 || t === 13 || t === 31 || t === 26 || t === 27 || t === 3) return e;
    }
    return null;
  }
  function Wn(e) {
    var t = e.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return e.stateNode;
    throw Error(r(33));
  }
  function Fa(e) {
    var t = e[Td];
    return (t || (t = e[Td] = { hoistableStyles: new Map(), hoistableScripts: new Map() }), t);
  }
  function ut(e) {
    e[Fn] = !0;
  }
  var jd = new Set(),
    Nd = {};
  function Sa(e, t) {
    (Wa(e, t), Wa(e + 'Capture', t));
  }
  function Wa(e, t) {
    for (Nd[e] = t, e = 0; e < t.length; e++) jd.add(t[e]);
  }
  var Dg = RegExp(
      '^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$'
    ),
    Ed = {},
    Cd = {};
  function Rg(e) {
    return Va.call(Cd, e)
      ? !0
      : Va.call(Ed, e)
        ? !1
        : Dg.test(e)
          ? (Cd[e] = !0)
          : ((Ed[e] = !0), !1);
  }
  function _s(e, t, a) {
    if (Rg(t))
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
  function fs(e, t, a) {
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
  function Sl(e, t, a, n) {
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
  function $t(e) {
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
  function Ad(e) {
    var t = e.type;
    return (e = e.nodeName) && e.toLowerCase() === 'input' && (t === 'checkbox' || t === 'radio');
  }
  function zg(e, t, a) {
    var n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t);
    if (
      !e.hasOwnProperty(t) &&
      typeof n < 'u' &&
      typeof n.get == 'function' &&
      typeof n.set == 'function'
    ) {
      var s = n.get,
        c = n.set;
      return (
        Object.defineProperty(e, t, {
          configurable: !0,
          get: function () {
            return s.call(this);
          },
          set: function (_) {
            ((a = '' + _), c.call(this, _));
          },
        }),
        Object.defineProperty(e, t, { enumerable: n.enumerable }),
        {
          getValue: function () {
            return a;
          },
          setValue: function (_) {
            a = '' + _;
          },
          stopTracking: function () {
            ((e._valueTracker = null), delete e[t]);
          },
        }
      );
    }
  }
  function no(e) {
    if (!e._valueTracker) {
      var t = Ad(e) ? 'checked' : 'value';
      e._valueTracker = zg(e, t, '' + e[t]);
    }
  }
  function Ld(e) {
    if (!e) return !1;
    var t = e._valueTracker;
    if (!t) return !0;
    var a = t.getValue(),
      n = '';
    return (
      e && (n = Ad(e) ? (e.checked ? 'true' : 'false') : e.value),
      (e = n),
      e !== a ? (t.setValue(e), !0) : !1
    );
  }
  function ps(e) {
    if (((e = e || (typeof document < 'u' ? document : void 0)), typeof e > 'u')) return null;
    try {
      return e.activeElement || e.body;
    } catch {
      return e.body;
    }
  }
  var Hg = /[\n"\\]/g;
  function Gt(e) {
    return e.replace(Hg, function (t) {
      return '\\' + t.charCodeAt(0).toString(16) + ' ';
    });
  }
  function io(e, t, a, n, s, c, _, k) {
    ((e.name = ''),
      _ != null && typeof _ != 'function' && typeof _ != 'symbol' && typeof _ != 'boolean'
        ? (e.type = _)
        : e.removeAttribute('type'),
      t != null
        ? _ === 'number'
          ? ((t === 0 && e.value === '') || e.value != t) && (e.value = '' + $t(t))
          : e.value !== '' + $t(t) && (e.value = '' + $t(t))
        : (_ !== 'submit' && _ !== 'reset') || e.removeAttribute('value'),
      t != null
        ? so(e, _, $t(t))
        : a != null
          ? so(e, _, $t(a))
          : n != null && e.removeAttribute('value'),
      s == null && c != null && (e.defaultChecked = !!c),
      s != null && (e.checked = s && typeof s != 'function' && typeof s != 'symbol'),
      k != null && typeof k != 'function' && typeof k != 'symbol' && typeof k != 'boolean'
        ? (e.name = '' + $t(k))
        : e.removeAttribute('name'));
  }
  function qd(e, t, a, n, s, c, _, k) {
    if (
      (c != null &&
        typeof c != 'function' &&
        typeof c != 'symbol' &&
        typeof c != 'boolean' &&
        (e.type = c),
      t != null || a != null)
    ) {
      if (!((c !== 'submit' && c !== 'reset') || t != null)) {
        no(e);
        return;
      }
      ((a = a != null ? '' + $t(a) : ''),
        (t = t != null ? '' + $t(t) : a),
        k || t === e.value || (e.value = t),
        (e.defaultValue = t));
    }
    ((n = n ?? s),
      (n = typeof n != 'function' && typeof n != 'symbol' && !!n),
      (e.checked = k ? e.checked : !!n),
      (e.defaultChecked = !!n),
      _ != null &&
        typeof _ != 'function' &&
        typeof _ != 'symbol' &&
        typeof _ != 'boolean' &&
        (e.name = _),
      no(e));
  }
  function so(e, t, a) {
    (t === 'number' && ps(e.ownerDocument) === e) ||
      e.defaultValue === '' + a ||
      (e.defaultValue = '' + a);
  }
  function en(e, t, a, n) {
    if (((e = e.options), t)) {
      t = {};
      for (var s = 0; s < a.length; s++) t['$' + a[s]] = !0;
      for (a = 0; a < e.length; a++)
        ((s = t.hasOwnProperty('$' + e[a].value)),
          e[a].selected !== s && (e[a].selected = s),
          s && n && (e[a].defaultSelected = !0));
    } else {
      for (a = '' + $t(a), t = null, s = 0; s < e.length; s++) {
        if (e[s].value === a) {
          ((e[s].selected = !0), n && (e[s].defaultSelected = !0));
          return;
        }
        t !== null || e[s].disabled || (t = e[s]);
      }
      t !== null && (t.selected = !0);
    }
  }
  function Bd(e, t, a) {
    if (t != null && ((t = '' + $t(t)), t !== e.value && (e.value = t), a == null)) {
      e.defaultValue !== t && (e.defaultValue = t);
      return;
    }
    e.defaultValue = a != null ? '' + $t(a) : '';
  }
  function Od(e, t, a, n) {
    if (t == null) {
      if (n != null) {
        if (a != null) throw Error(r(92));
        if (ve(n)) {
          if (1 < n.length) throw Error(r(93));
          n = n[0];
        }
        a = n;
      }
      (a == null && (a = ''), (t = a));
    }
    ((a = $t(t)),
      (e.defaultValue = a),
      (n = e.textContent),
      n === a && n !== '' && n !== null && (e.value = n),
      no(e));
  }
  function tn(e, t) {
    if (t) {
      var a = e.firstChild;
      if (a && a === e.lastChild && a.nodeType === 3) {
        a.nodeValue = t;
        return;
      }
    }
    e.textContent = t;
  }
  var Ug = new Set(
    'animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp'.split(
      ' '
    )
  );
  function Id(e, t, a) {
    var n = t.indexOf('--') === 0;
    a == null || typeof a == 'boolean' || a === ''
      ? n
        ? e.setProperty(t, '')
        : t === 'float'
          ? (e.cssFloat = '')
          : (e[t] = '')
      : n
        ? e.setProperty(t, a)
        : typeof a != 'number' || a === 0 || Ug.has(t)
          ? t === 'float'
            ? (e.cssFloat = a)
            : (e[t] = ('' + a).trim())
          : (e[t] = a + 'px');
  }
  function Md(e, t, a) {
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
      for (var s in t) ((n = t[s]), t.hasOwnProperty(s) && a[s] !== n && Id(e, s, n));
    } else for (var c in t) t.hasOwnProperty(c) && Id(e, c, t[c]);
  }
  function ro(e) {
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
  var $g = new Map([
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
    Gg =
      /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function hs(e) {
    return Gg.test('' + e)
      ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')"
      : e;
  }
  function wl() {}
  var oo = null;
  function co(e) {
    return (
      (e = e.target || e.srcElement || window),
      e.correspondingUseElement && (e = e.correspondingUseElement),
      e.nodeType === 3 ? e.parentNode : e
    );
  }
  var ln = null,
    an = null;
  function Dd(e) {
    var t = Pa(e);
    if (t && (e = t.stateNode)) {
      var a = e[wt] || null;
      e: switch (((e = t.stateNode), t.type)) {
        case 'input':
          if (
            (io(
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
              a = a.querySelectorAll('input[name="' + Gt('' + t) + '"][type="radio"]'), t = 0;
              t < a.length;
              t++
            ) {
              var n = a[t];
              if (n !== e && n.form === e.form) {
                var s = n[wt] || null;
                if (!s) throw Error(r(90));
                io(
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
            for (t = 0; t < a.length; t++) ((n = a[t]), n.form === e.form && Ld(n));
          }
          break e;
        case 'textarea':
          Bd(e, a.value, a.defaultValue);
          break e;
        case 'select':
          ((t = a.value), t != null && en(e, !!a.multiple, t, !1));
      }
    }
  }
  var uo = !1;
  function Rd(e, t, a) {
    if (uo) return e(t, a);
    uo = !0;
    try {
      var n = e(t);
      return n;
    } finally {
      if (
        ((uo = !1),
        (ln !== null || an !== null) &&
          (ar(), ln && ((t = ln), (e = an), (an = ln = null), Dd(t), e)))
      )
        for (t = 0; t < e.length; t++) Dd(e[t]);
    }
  }
  function ei(e, t) {
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
  var Tl = !(
      typeof window > 'u' ||
      typeof window.document > 'u' ||
      typeof window.document.createElement > 'u'
    ),
    mo = !1;
  if (Tl)
    try {
      var ti = {};
      (Object.defineProperty(ti, 'passive', {
        get: function () {
          mo = !0;
        },
      }),
        window.addEventListener('test', ti, ti),
        window.removeEventListener('test', ti, ti));
    } catch {
      mo = !1;
    }
  var Jl = null,
    _o = null,
    gs = null;
  function zd() {
    if (gs) return gs;
    var e,
      t = _o,
      a = t.length,
      n,
      s = 'value' in Jl ? Jl.value : Jl.textContent,
      c = s.length;
    for (e = 0; e < a && t[e] === s[e]; e++);
    var _ = a - e;
    for (n = 1; n <= _ && t[a - n] === s[c - n]; n++);
    return (gs = s.slice(e, 1 < n ? 1 - n : void 0));
  }
  function ks(e) {
    var t = e.keyCode;
    return (
      'charCode' in e ? ((e = e.charCode), e === 0 && t === 13 && (e = 13)) : (e = t),
      e === 10 && (e = 13),
      32 <= e || e === 13 ? e : 0
    );
  }
  function vs() {
    return !0;
  }
  function Hd() {
    return !1;
  }
  function Tt(e) {
    function t(a, n, s, c, _) {
      ((this._reactName = a),
        (this._targetInst = s),
        (this.type = n),
        (this.nativeEvent = c),
        (this.target = _),
        (this.currentTarget = null));
      for (var k in e) e.hasOwnProperty(k) && ((a = e[k]), (this[k] = a ? a(c) : c[k]));
      return (
        (this.isDefaultPrevented = (
          c.defaultPrevented != null ? c.defaultPrevented : c.returnValue === !1
        )
          ? vs
          : Hd),
        (this.isPropagationStopped = Hd),
        this
      );
    }
    return (
      v(t.prototype, {
        preventDefault: function () {
          this.defaultPrevented = !0;
          var a = this.nativeEvent;
          a &&
            (a.preventDefault
              ? a.preventDefault()
              : typeof a.returnValue != 'unknown' && (a.returnValue = !1),
            (this.isDefaultPrevented = vs));
        },
        stopPropagation: function () {
          var a = this.nativeEvent;
          a &&
            (a.stopPropagation
              ? a.stopPropagation()
              : typeof a.cancelBubble != 'unknown' && (a.cancelBubble = !0),
            (this.isPropagationStopped = vs));
        },
        persist: function () {},
        isPersistent: vs,
      }),
      t
    );
  }
  var wa = {
      eventPhase: 0,
      bubbles: 0,
      cancelable: 0,
      timeStamp: function (e) {
        return e.timeStamp || Date.now();
      },
      defaultPrevented: 0,
      isTrusted: 0,
    },
    ys = Tt(wa),
    li = v({}, wa, { view: 0, detail: 0 }),
    Yg = Tt(li),
    fo,
    po,
    ai,
    bs = v({}, li, {
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
      getModifierState: go,
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
          : (e !== ai &&
              (ai && e.type === 'mousemove'
                ? ((fo = e.screenX - ai.screenX), (po = e.screenY - ai.screenY))
                : (po = fo = 0),
              (ai = e)),
            fo);
      },
      movementY: function (e) {
        return 'movementY' in e ? e.movementY : po;
      },
    }),
    Ud = Tt(bs),
    Xg = v({}, bs, { dataTransfer: 0 }),
    Vg = Tt(Xg),
    Qg = v({}, li, { relatedTarget: 0 }),
    ho = Tt(Qg),
    Kg = v({}, wa, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
    Zg = Tt(Kg),
    Jg = v({}, wa, {
      clipboardData: function (e) {
        return 'clipboardData' in e ? e.clipboardData : window.clipboardData;
      },
    }),
    Pg = Tt(Jg),
    Fg = v({}, wa, { data: 0 }),
    $d = Tt(Fg),
    Wg = {
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
    ek = {
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
    tk = { Alt: 'altKey', Control: 'ctrlKey', Meta: 'metaKey', Shift: 'shiftKey' };
  function lk(e) {
    var t = this.nativeEvent;
    return t.getModifierState ? t.getModifierState(e) : (e = tk[e]) ? !!t[e] : !1;
  }
  function go() {
    return lk;
  }
  var ak = v({}, li, {
      key: function (e) {
        if (e.key) {
          var t = Wg[e.key] || e.key;
          if (t !== 'Unidentified') return t;
        }
        return e.type === 'keypress'
          ? ((e = ks(e)), e === 13 ? 'Enter' : String.fromCharCode(e))
          : e.type === 'keydown' || e.type === 'keyup'
            ? ek[e.keyCode] || 'Unidentified'
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
      getModifierState: go,
      charCode: function (e) {
        return e.type === 'keypress' ? ks(e) : 0;
      },
      keyCode: function (e) {
        return e.type === 'keydown' || e.type === 'keyup' ? e.keyCode : 0;
      },
      which: function (e) {
        return e.type === 'keypress'
          ? ks(e)
          : e.type === 'keydown' || e.type === 'keyup'
            ? e.keyCode
            : 0;
      },
    }),
    nk = Tt(ak),
    ik = v({}, bs, {
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
    Gd = Tt(ik),
    sk = v({}, li, {
      touches: 0,
      targetTouches: 0,
      changedTouches: 0,
      altKey: 0,
      metaKey: 0,
      ctrlKey: 0,
      shiftKey: 0,
      getModifierState: go,
    }),
    rk = Tt(sk),
    ok = v({}, wa, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
    ck = Tt(ok),
    uk = v({}, bs, {
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
    dk = Tt(uk),
    mk = v({}, wa, { newState: 0, oldState: 0 }),
    _k = Tt(mk),
    fk = [9, 13, 27, 32],
    ko = Tl && 'CompositionEvent' in window,
    ni = null;
  Tl && 'documentMode' in document && (ni = document.documentMode);
  var pk = Tl && 'TextEvent' in window && !ni,
    Yd = Tl && (!ko || (ni && 8 < ni && 11 >= ni)),
    Xd = ' ',
    Vd = !1;
  function Qd(e, t) {
    switch (e) {
      case 'keyup':
        return fk.indexOf(t.keyCode) !== -1;
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
  function Kd(e) {
    return ((e = e.detail), typeof e == 'object' && 'data' in e ? e.data : null);
  }
  var nn = !1;
  function hk(e, t) {
    switch (e) {
      case 'compositionend':
        return Kd(t);
      case 'keypress':
        return t.which !== 32 ? null : ((Vd = !0), Xd);
      case 'textInput':
        return ((e = t.data), e === Xd && Vd ? null : e);
      default:
        return null;
    }
  }
  function gk(e, t) {
    if (nn)
      return e === 'compositionend' || (!ko && Qd(e, t))
        ? ((e = zd()), (gs = _o = Jl = null), (nn = !1), e)
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
        return Yd && t.locale !== 'ko' ? null : t.data;
      default:
        return null;
    }
  }
  var kk = {
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
  function Zd(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t === 'input' ? !!kk[e.type] : t === 'textarea';
  }
  function Jd(e, t, a, n) {
    (ln ? (an ? an.push(n) : (an = [n])) : (ln = n),
      (t = ur(t, 'onChange')),
      0 < t.length &&
        ((a = new ys('onChange', 'change', null, a, n)), e.push({ event: a, listeners: t })));
  }
  var ii = null,
    si = null;
  function vk(e) {
    Bf(e, 0);
  }
  function xs(e) {
    var t = Wn(e);
    if (Ld(t)) return e;
  }
  function Pd(e, t) {
    if (e === 'change') return t;
  }
  var Fd = !1;
  if (Tl) {
    var vo;
    if (Tl) {
      var yo = 'oninput' in document;
      if (!yo) {
        var Wd = document.createElement('div');
        (Wd.setAttribute('oninput', 'return;'), (yo = typeof Wd.oninput == 'function'));
      }
      vo = yo;
    } else vo = !1;
    Fd = vo && (!document.documentMode || 9 < document.documentMode);
  }
  function em() {
    ii && (ii.detachEvent('onpropertychange', tm), (si = ii = null));
  }
  function tm(e) {
    if (e.propertyName === 'value' && xs(si)) {
      var t = [];
      (Jd(t, si, e, co(e)), Rd(vk, t));
    }
  }
  function yk(e, t, a) {
    e === 'focusin'
      ? (em(), (ii = t), (si = a), ii.attachEvent('onpropertychange', tm))
      : e === 'focusout' && em();
  }
  function bk(e) {
    if (e === 'selectionchange' || e === 'keyup' || e === 'keydown') return xs(si);
  }
  function xk(e, t) {
    if (e === 'click') return xs(t);
  }
  function Sk(e, t) {
    if (e === 'input' || e === 'change') return xs(t);
  }
  function wk(e, t) {
    return (e === t && (e !== 0 || 1 / e === 1 / t)) || (e !== e && t !== t);
  }
  var Bt = typeof Object.is == 'function' ? Object.is : wk;
  function ri(e, t) {
    if (Bt(e, t)) return !0;
    if (typeof e != 'object' || e === null || typeof t != 'object' || t === null) return !1;
    var a = Object.keys(e),
      n = Object.keys(t);
    if (a.length !== n.length) return !1;
    for (n = 0; n < a.length; n++) {
      var s = a[n];
      if (!Va.call(t, s) || !Bt(e[s], t[s])) return !1;
    }
    return !0;
  }
  function lm(e) {
    for (; e && e.firstChild; ) e = e.firstChild;
    return e;
  }
  function am(e, t) {
    var a = lm(e);
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
      a = lm(a);
    }
  }
  function nm(e, t) {
    return e && t
      ? e === t
        ? !0
        : e && e.nodeType === 3
          ? !1
          : t && t.nodeType === 3
            ? nm(e, t.parentNode)
            : 'contains' in e
              ? e.contains(t)
              : e.compareDocumentPosition
                ? !!(e.compareDocumentPosition(t) & 16)
                : !1
      : !1;
  }
  function im(e) {
    e =
      e != null && e.ownerDocument != null && e.ownerDocument.defaultView != null
        ? e.ownerDocument.defaultView
        : window;
    for (var t = ps(e.document); t instanceof e.HTMLIFrameElement; ) {
      try {
        var a = typeof t.contentWindow.location.href == 'string';
      } catch {
        a = !1;
      }
      if (a) e = t.contentWindow;
      else break;
      t = ps(e.document);
    }
    return t;
  }
  function bo(e) {
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
  var Tk = Tl && 'documentMode' in document && 11 >= document.documentMode,
    sn = null,
    xo = null,
    oi = null,
    So = !1;
  function sm(e, t, a) {
    var n = a.window === a ? a.document : a.nodeType === 9 ? a : a.ownerDocument;
    So ||
      sn == null ||
      sn !== ps(n) ||
      ((n = sn),
      'selectionStart' in n && bo(n)
        ? (n = { start: n.selectionStart, end: n.selectionEnd })
        : ((n = ((n.ownerDocument && n.ownerDocument.defaultView) || window).getSelection()),
          (n = {
            anchorNode: n.anchorNode,
            anchorOffset: n.anchorOffset,
            focusNode: n.focusNode,
            focusOffset: n.focusOffset,
          })),
      (oi && ri(oi, n)) ||
        ((oi = n),
        (n = ur(xo, 'onSelect')),
        0 < n.length &&
          ((t = new ys('onSelect', 'select', null, t, a)),
          e.push({ event: t, listeners: n }),
          (t.target = sn))));
  }
  function Ta(e, t) {
    var a = {};
    return (
      (a[e.toLowerCase()] = t.toLowerCase()),
      (a['Webkit' + e] = 'webkit' + t),
      (a['Moz' + e] = 'moz' + t),
      a
    );
  }
  var rn = {
      animationend: Ta('Animation', 'AnimationEnd'),
      animationiteration: Ta('Animation', 'AnimationIteration'),
      animationstart: Ta('Animation', 'AnimationStart'),
      transitionrun: Ta('Transition', 'TransitionRun'),
      transitionstart: Ta('Transition', 'TransitionStart'),
      transitioncancel: Ta('Transition', 'TransitionCancel'),
      transitionend: Ta('Transition', 'TransitionEnd'),
    },
    wo = {},
    rm = {};
  Tl &&
    ((rm = document.createElement('div').style),
    'AnimationEvent' in window ||
      (delete rn.animationend.animation,
      delete rn.animationiteration.animation,
      delete rn.animationstart.animation),
    'TransitionEvent' in window || delete rn.transitionend.transition);
  function ja(e) {
    if (wo[e]) return wo[e];
    if (!rn[e]) return e;
    var t = rn[e],
      a;
    for (a in t) if (t.hasOwnProperty(a) && a in rm) return (wo[e] = t[a]);
    return e;
  }
  var om = ja('animationend'),
    cm = ja('animationiteration'),
    um = ja('animationstart'),
    jk = ja('transitionrun'),
    Nk = ja('transitionstart'),
    Ek = ja('transitioncancel'),
    dm = ja('transitionend'),
    mm = new Map(),
    To =
      'abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel'.split(
        ' '
      );
  To.push('scrollEnd');
  function ll(e, t) {
    (mm.set(e, t), Sa(t, [e]));
  }
  var Ss =
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
    on = 0,
    jo = 0;
  function ws() {
    for (var e = on, t = (jo = on = 0); t < e; ) {
      var a = Yt[t];
      Yt[t++] = null;
      var n = Yt[t];
      Yt[t++] = null;
      var s = Yt[t];
      Yt[t++] = null;
      var c = Yt[t];
      if (((Yt[t++] = null), n !== null && s !== null)) {
        var _ = n.pending;
        (_ === null ? (s.next = s) : ((s.next = _.next), (_.next = s)), (n.pending = s));
      }
      c !== 0 && _m(a, s, c);
    }
  }
  function Ts(e, t, a, n) {
    ((Yt[on++] = e),
      (Yt[on++] = t),
      (Yt[on++] = a),
      (Yt[on++] = n),
      (jo |= n),
      (e.lanes |= n),
      (e = e.alternate),
      e !== null && (e.lanes |= n));
  }
  function No(e, t, a, n) {
    return (Ts(e, t, a, n), js(e));
  }
  function Na(e, t) {
    return (Ts(e, null, null, t), js(e));
  }
  function _m(e, t, a) {
    e.lanes |= a;
    var n = e.alternate;
    n !== null && (n.lanes |= a);
    for (var s = !1, c = e.return; c !== null; )
      ((c.childLanes |= a),
        (n = c.alternate),
        n !== null && (n.childLanes |= a),
        c.tag === 22 && ((e = c.stateNode), e === null || e._visibility & 1 || (s = !0)),
        (e = c),
        (c = c.return));
    return e.tag === 3
      ? ((c = e.stateNode),
        s &&
          t !== null &&
          ((s = 31 - qt(a)),
          (e = c.hiddenUpdates),
          (n = e[s]),
          n === null ? (e[s] = [t]) : n.push(t),
          (t.lane = a | 536870912)),
        c)
      : null;
  }
  function js(e) {
    if (50 < Ai) throw ((Ai = 0), (Mc = null), Error(r(185)));
    for (var t = e.return; t !== null; ) ((e = t), (t = e.return));
    return e.tag === 3 ? e.stateNode : null;
  }
  var cn = {};
  function Ck(e, t, a, n) {
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
  function Ot(e, t, a, n) {
    return new Ck(e, t, a, n);
  }
  function Eo(e) {
    return ((e = e.prototype), !(!e || !e.isReactComponent));
  }
  function jl(e, t) {
    var a = e.alternate;
    return (
      a === null
        ? ((a = Ot(e.tag, t, e.key, e.mode)),
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
  function fm(e, t) {
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
  function Ns(e, t, a, n, s, c) {
    var _ = 0;
    if (((n = e), typeof e == 'function')) Eo(e) && (_ = 1);
    else if (typeof e == 'string')
      _ = Ov(e, a, F.current) ? 26 : e === 'html' || e === 'head' || e === 'body' ? 27 : 5;
    else
      e: switch (e) {
        case ie:
          return ((e = Ot(31, a, t, s)), (e.elementType = ie), (e.lanes = c), e);
        case S:
          return Ea(a.children, s, c, t);
        case E:
          ((_ = 8), (s |= 24));
          break;
        case x:
          return ((e = Ot(12, a, t, s | 2)), (e.elementType = x), (e.lanes = c), e);
        case ae:
          return ((e = Ot(13, a, t, s)), (e.elementType = ae), (e.lanes = c), e);
        case Y:
          return ((e = Ot(19, a, t, s)), (e.elementType = Y), (e.lanes = c), e);
        default:
          if (typeof e == 'object' && e !== null)
            switch (e.$$typeof) {
              case $:
                _ = 10;
                break e;
              case C:
                _ = 9;
                break e;
              case D:
                _ = 11;
                break e;
              case T:
                _ = 14;
                break e;
              case V:
                ((_ = 16), (n = null));
                break e;
            }
          ((_ = 29), (a = Error(r(130, e === null ? 'null' : typeof e, ''))), (n = null));
      }
    return ((t = Ot(_, a, t, s)), (t.elementType = e), (t.type = n), (t.lanes = c), t);
  }
  function Ea(e, t, a, n) {
    return ((e = Ot(7, e, n, t)), (e.lanes = a), e);
  }
  function Co(e, t, a) {
    return ((e = Ot(6, e, null, t)), (e.lanes = a), e);
  }
  function pm(e) {
    var t = Ot(18, null, null, 0);
    return ((t.stateNode = e), t);
  }
  function Ao(e, t, a) {
    return (
      (t = Ot(4, e.children !== null ? e.children : [], e.key, t)),
      (t.lanes = a),
      (t.stateNode = {
        containerInfo: e.containerInfo,
        pendingChildren: null,
        implementation: e.implementation,
      }),
      t
    );
  }
  var hm = new WeakMap();
  function Xt(e, t) {
    if (typeof e == 'object' && e !== null) {
      var a = hm.get(e);
      return a !== void 0 ? a : ((t = { value: e, source: t, stack: is(t) }), hm.set(e, t), t);
    }
    return { value: e, source: t, stack: is(t) };
  }
  var un = [],
    dn = 0,
    Es = null,
    ci = 0,
    Vt = [],
    Qt = 0,
    Pl = null,
    fl = 1,
    pl = '';
  function Nl(e, t) {
    ((un[dn++] = ci), (un[dn++] = Es), (Es = e), (ci = t));
  }
  function gm(e, t, a) {
    ((Vt[Qt++] = fl), (Vt[Qt++] = pl), (Vt[Qt++] = Pl), (Pl = e));
    var n = fl;
    e = pl;
    var s = 32 - qt(n) - 1;
    ((n &= ~(1 << s)), (a += 1));
    var c = 32 - qt(t) + s;
    if (30 < c) {
      var _ = s - (s % 5);
      ((c = (n & ((1 << _) - 1)).toString(32)),
        (n >>= _),
        (s -= _),
        (fl = (1 << (32 - qt(t) + s)) | (a << s) | n),
        (pl = c + e));
    } else ((fl = (1 << c) | (a << s) | n), (pl = e));
  }
  function Lo(e) {
    e.return !== null && (Nl(e, 1), gm(e, 1, 0));
  }
  function qo(e) {
    for (; e === Es; ) ((Es = un[--dn]), (un[dn] = null), (ci = un[--dn]), (un[dn] = null));
    for (; e === Pl; )
      ((Pl = Vt[--Qt]),
        (Vt[Qt] = null),
        (pl = Vt[--Qt]),
        (Vt[Qt] = null),
        (fl = Vt[--Qt]),
        (Vt[Qt] = null));
  }
  function km(e, t) {
    ((Vt[Qt++] = fl), (Vt[Qt++] = pl), (Vt[Qt++] = Pl), (fl = t.id), (pl = t.overflow), (Pl = e));
  }
  var ht = null,
    Ve = null,
    Ae = !1,
    Fl = null,
    Kt = !1,
    Bo = Error(r(519));
  function Wl(e) {
    var t = Error(
      r(418, 1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? 'text' : 'HTML', '')
    );
    throw (ui(Xt(t, e)), Bo);
  }
  function vm(e) {
    var t = e.stateNode,
      a = e.type,
      n = e.memoizedProps;
    switch (((t[pt] = e), (t[wt] = n), a)) {
      case 'dialog':
        (Ne('cancel', t), Ne('close', t));
        break;
      case 'iframe':
      case 'object':
      case 'embed':
        Ne('load', t);
        break;
      case 'video':
      case 'audio':
        for (a = 0; a < qi.length; a++) Ne(qi[a], t);
        break;
      case 'source':
        Ne('error', t);
        break;
      case 'img':
      case 'image':
      case 'link':
        (Ne('error', t), Ne('load', t));
        break;
      case 'details':
        Ne('toggle', t);
        break;
      case 'input':
        (Ne('invalid', t),
          qd(t, n.value, n.defaultValue, n.checked, n.defaultChecked, n.type, n.name, !0));
        break;
      case 'select':
        Ne('invalid', t);
        break;
      case 'textarea':
        (Ne('invalid', t), Od(t, n.value, n.defaultValue, n.children));
    }
    ((a = n.children),
      (typeof a != 'string' && typeof a != 'number' && typeof a != 'bigint') ||
      t.textContent === '' + a ||
      n.suppressHydrationWarning === !0 ||
      Df(t.textContent, a)
        ? (n.popover != null && (Ne('beforetoggle', t), Ne('toggle', t)),
          n.onScroll != null && Ne('scroll', t),
          n.onScrollEnd != null && Ne('scrollend', t),
          n.onClick != null && (t.onclick = wl),
          (t = !0))
        : (t = !1),
      t || Wl(e, !0));
  }
  function ym(e) {
    for (ht = e.return; ht; )
      switch (ht.tag) {
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
          ht = ht.return;
      }
  }
  function mn(e) {
    if (e !== ht) return !1;
    if (!Ae) return (ym(e), (Ae = !0), !1);
    var t = e.tag,
      a;
    if (
      ((a = t !== 3 && t !== 27) &&
        ((a = t === 5) &&
          ((a = e.type), (a = !(a !== 'form' && a !== 'button') || Pc(e.type, e.memoizedProps))),
        (a = !a)),
      a && Ve && Wl(e),
      ym(e),
      t === 13)
    ) {
      if (((e = e.memoizedState), (e = e !== null ? e.dehydrated : null), !e)) throw Error(r(317));
      Ve = Vf(e);
    } else if (t === 31) {
      if (((e = e.memoizedState), (e = e !== null ? e.dehydrated : null), !e)) throw Error(r(317));
      Ve = Vf(e);
    } else
      t === 27
        ? ((t = Ve), _a(e.type) ? ((e = lu), (lu = null), (Ve = e)) : (Ve = t))
        : (Ve = ht ? Jt(e.stateNode.nextSibling) : null);
    return !0;
  }
  function Ca() {
    ((Ve = ht = null), (Ae = !1));
  }
  function Oo() {
    var e = Fl;
    return (e !== null && (Ct === null ? (Ct = e) : Ct.push.apply(Ct, e), (Fl = null)), e);
  }
  function ui(e) {
    Fl === null ? (Fl = [e]) : Fl.push(e);
  }
  var Io = b(null),
    Aa = null,
    El = null;
  function ea(e, t, a) {
    (X(Io, t._currentValue), (t._currentValue = a));
  }
  function Cl(e) {
    ((e._currentValue = Io.current), N(Io));
  }
  function Mo(e, t, a) {
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
  function Do(e, t, a, n) {
    var s = e.child;
    for (s !== null && (s.return = e); s !== null; ) {
      var c = s.dependencies;
      if (c !== null) {
        var _ = s.child;
        c = c.firstContext;
        e: for (; c !== null; ) {
          var k = c;
          c = s;
          for (var j = 0; j < t.length; j++)
            if (k.context === t[j]) {
              ((c.lanes |= a),
                (k = c.alternate),
                k !== null && (k.lanes |= a),
                Mo(c.return, a, e),
                n || (_ = null));
              break e;
            }
          c = k.next;
        }
      } else if (s.tag === 18) {
        if (((_ = s.return), _ === null)) throw Error(r(341));
        ((_.lanes |= a), (c = _.alternate), c !== null && (c.lanes |= a), Mo(_, a, e), (_ = null));
      } else _ = s.child;
      if (_ !== null) _.return = s;
      else
        for (_ = s; _ !== null; ) {
          if (_ === e) {
            _ = null;
            break;
          }
          if (((s = _.sibling), s !== null)) {
            ((s.return = _.return), (_ = s));
            break;
          }
          _ = _.return;
        }
      s = _;
    }
  }
  function _n(e, t, a, n) {
    e = null;
    for (var s = t, c = !1; s !== null; ) {
      if (!c) {
        if ((s.flags & 524288) !== 0) c = !0;
        else if ((s.flags & 262144) !== 0) break;
      }
      if (s.tag === 10) {
        var _ = s.alternate;
        if (_ === null) throw Error(r(387));
        if (((_ = _.memoizedProps), _ !== null)) {
          var k = s.type;
          Bt(s.pendingProps.value, _.value) || (e !== null ? e.push(k) : (e = [k]));
        }
      } else if (s === _e.current) {
        if (((_ = s.alternate), _ === null)) throw Error(r(387));
        _.memoizedState.memoizedState !== s.memoizedState.memoizedState &&
          (e !== null ? e.push(Di) : (e = [Di]));
      }
      s = s.return;
    }
    (e !== null && Do(t, e, a, n), (t.flags |= 262144));
  }
  function Cs(e) {
    for (e = e.firstContext; e !== null; ) {
      if (!Bt(e.context._currentValue, e.memoizedValue)) return !0;
      e = e.next;
    }
    return !1;
  }
  function La(e) {
    ((Aa = e), (El = null), (e = e.dependencies), e !== null && (e.firstContext = null));
  }
  function gt(e) {
    return bm(Aa, e);
  }
  function As(e, t) {
    return (Aa === null && La(e), bm(e, t));
  }
  function bm(e, t) {
    var a = t._currentValue;
    if (((t = { context: t, memoizedValue: a, next: null }), El === null)) {
      if (e === null) throw Error(r(308));
      ((El = t), (e.dependencies = { lanes: 0, firstContext: t }), (e.flags |= 524288));
    } else El = El.next = t;
    return a;
  }
  var Ak =
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
    Lk = l.unstable_scheduleCallback,
    qk = l.unstable_NormalPriority,
    it = {
      $$typeof: $,
      Consumer: null,
      Provider: null,
      _currentValue: null,
      _currentValue2: null,
      _threadCount: 0,
    };
  function Ro() {
    return { controller: new Ak(), data: new Map(), refCount: 0 };
  }
  function di(e) {
    (e.refCount--,
      e.refCount === 0 &&
        Lk(qk, function () {
          e.controller.abort();
        }));
  }
  var mi = null,
    zo = 0,
    fn = 0,
    pn = null;
  function Bk(e, t) {
    if (mi === null) {
      var a = (mi = []);
      ((zo = 0),
        (fn = $c()),
        (pn = {
          status: 'pending',
          value: void 0,
          then: function (n) {
            a.push(n);
          },
        }));
    }
    return (zo++, t.then(xm, xm), t);
  }
  function xm() {
    if (--zo === 0 && mi !== null) {
      pn !== null && (pn.status = 'fulfilled');
      var e = mi;
      ((mi = null), (fn = 0), (pn = null));
      for (var t = 0; t < e.length; t++) (0, e[t])();
    }
  }
  function Ok(e, t) {
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
  var Sm = q.S;
  q.S = function (e, t) {
    ((rf = bt()),
      typeof t == 'object' && t !== null && typeof t.then == 'function' && Bk(e, t),
      Sm !== null && Sm(e, t));
  };
  var qa = b(null);
  function Ho() {
    var e = qa.current;
    return e !== null ? e : Ye.pooledCache;
  }
  function Ls(e, t) {
    t === null ? X(qa, qa.current) : X(qa, t.pool);
  }
  function wm() {
    var e = Ho();
    return e === null ? null : { parent: it._currentValue, pool: e };
  }
  var hn = Error(r(460)),
    Uo = Error(r(474)),
    qs = Error(r(542)),
    Bs = { then: function () {} };
  function Tm(e) {
    return ((e = e.status), e === 'fulfilled' || e === 'rejected');
  }
  function jm(e, t, a) {
    switch (
      ((a = e[a]), a === void 0 ? e.push(t) : a !== t && (t.then(wl, wl), (t = a)), t.status)
    ) {
      case 'fulfilled':
        return t.value;
      case 'rejected':
        throw ((e = t.reason), Em(e), e);
      default:
        if (typeof t.status == 'string') t.then(wl, wl);
        else {
          if (((e = Ye), e !== null && 100 < e.shellSuspendCounter)) throw Error(r(482));
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
            throw ((e = t.reason), Em(e), e);
        }
        throw ((Oa = t), hn);
    }
  }
  function Ba(e) {
    try {
      var t = e._init;
      return t(e._payload);
    } catch (a) {
      throw a !== null && typeof a == 'object' && typeof a.then == 'function' ? ((Oa = a), hn) : a;
    }
  }
  var Oa = null;
  function Nm() {
    if (Oa === null) throw Error(r(459));
    var e = Oa;
    return ((Oa = null), e);
  }
  function Em(e) {
    if (e === hn || e === qs) throw Error(r(483));
  }
  var gn = null,
    _i = 0;
  function Os(e) {
    var t = _i;
    return ((_i += 1), gn === null && (gn = []), jm(gn, e, t));
  }
  function fi(e, t) {
    ((t = t.props.ref), (e.ref = t !== void 0 ? t : null));
  }
  function Is(e, t) {
    throw t.$$typeof === I
      ? Error(r(525))
      : ((e = Object.prototype.toString.call(t)),
        Error(
          r(
            31,
            e === '[object Object]' ? 'object with keys {' + Object.keys(t).join(', ') + '}' : e
          )
        ));
  }
  function Cm(e) {
    function t(O, A) {
      if (e) {
        var R = O.deletions;
        R === null ? ((O.deletions = [A]), (O.flags |= 16)) : R.push(A);
      }
    }
    function a(O, A) {
      if (!e) return null;
      for (; A !== null; ) (t(O, A), (A = A.sibling));
      return null;
    }
    function n(O) {
      for (var A = new Map(); O !== null; )
        (O.key !== null ? A.set(O.key, O) : A.set(O.index, O), (O = O.sibling));
      return A;
    }
    function s(O, A) {
      return ((O = jl(O, A)), (O.index = 0), (O.sibling = null), O);
    }
    function c(O, A, R) {
      return (
        (O.index = R),
        e
          ? ((R = O.alternate),
            R !== null
              ? ((R = R.index), R < A ? ((O.flags |= 67108866), A) : R)
              : ((O.flags |= 67108866), A))
          : ((O.flags |= 1048576), A)
      );
    }
    function _(O) {
      return (e && O.alternate === null && (O.flags |= 67108866), O);
    }
    function k(O, A, R, Q) {
      return A === null || A.tag !== 6
        ? ((A = Co(R, O.mode, Q)), (A.return = O), A)
        : ((A = s(A, R)), (A.return = O), A);
    }
    function j(O, A, R, Q) {
      var fe = R.type;
      return fe === S
        ? G(O, A, R.props.children, Q, R.key)
        : A !== null &&
            (A.elementType === fe ||
              (typeof fe == 'object' && fe !== null && fe.$$typeof === V && Ba(fe) === A.type))
          ? ((A = s(A, R.props)), fi(A, R), (A.return = O), A)
          : ((A = Ns(R.type, R.key, R.props, null, O.mode, Q)), fi(A, R), (A.return = O), A);
    }
    function z(O, A, R, Q) {
      return A === null ||
        A.tag !== 4 ||
        A.stateNode.containerInfo !== R.containerInfo ||
        A.stateNode.implementation !== R.implementation
        ? ((A = Ao(R, O.mode, Q)), (A.return = O), A)
        : ((A = s(A, R.children || [])), (A.return = O), A);
    }
    function G(O, A, R, Q, fe) {
      return A === null || A.tag !== 7
        ? ((A = Ea(R, O.mode, Q, fe)), (A.return = O), A)
        : ((A = s(A, R)), (A.return = O), A);
    }
    function Z(O, A, R) {
      if ((typeof A == 'string' && A !== '') || typeof A == 'number' || typeof A == 'bigint')
        return ((A = Co('' + A, O.mode, R)), (A.return = O), A);
      if (typeof A == 'object' && A !== null) {
        switch (A.$$typeof) {
          case L:
            return ((R = Ns(A.type, A.key, A.props, null, O.mode, R)), fi(R, A), (R.return = O), R);
          case M:
            return ((A = Ao(A, O.mode, R)), (A.return = O), A);
          case V:
            return ((A = Ba(A)), Z(O, A, R));
        }
        if (ve(A) || de(A)) return ((A = Ea(A, O.mode, R, null)), (A.return = O), A);
        if (typeof A.then == 'function') return Z(O, Os(A), R);
        if (A.$$typeof === $) return Z(O, As(O, A), R);
        Is(O, A);
      }
      return null;
    }
    function H(O, A, R, Q) {
      var fe = A !== null ? A.key : null;
      if ((typeof R == 'string' && R !== '') || typeof R == 'number' || typeof R == 'bigint')
        return fe !== null ? null : k(O, A, '' + R, Q);
      if (typeof R == 'object' && R !== null) {
        switch (R.$$typeof) {
          case L:
            return R.key === fe ? j(O, A, R, Q) : null;
          case M:
            return R.key === fe ? z(O, A, R, Q) : null;
          case V:
            return ((R = Ba(R)), H(O, A, R, Q));
        }
        if (ve(R) || de(R)) return fe !== null ? null : G(O, A, R, Q, null);
        if (typeof R.then == 'function') return H(O, A, Os(R), Q);
        if (R.$$typeof === $) return H(O, A, As(O, R), Q);
        Is(O, R);
      }
      return null;
    }
    function U(O, A, R, Q, fe) {
      if ((typeof Q == 'string' && Q !== '') || typeof Q == 'number' || typeof Q == 'bigint')
        return ((O = O.get(R) || null), k(A, O, '' + Q, fe));
      if (typeof Q == 'object' && Q !== null) {
        switch (Q.$$typeof) {
          case L:
            return ((O = O.get(Q.key === null ? R : Q.key) || null), j(A, O, Q, fe));
          case M:
            return ((O = O.get(Q.key === null ? R : Q.key) || null), z(A, O, Q, fe));
          case V:
            return ((Q = Ba(Q)), U(O, A, R, Q, fe));
        }
        if (ve(Q) || de(Q)) return ((O = O.get(R) || null), G(A, O, Q, fe, null));
        if (typeof Q.then == 'function') return U(O, A, R, Os(Q), fe);
        if (Q.$$typeof === $) return U(O, A, R, As(A, Q), fe);
        Is(A, Q);
      }
      return null;
    }
    function oe(O, A, R, Q) {
      for (
        var fe = null, qe = null, ce = A, we = (A = 0), Ce = null;
        ce !== null && we < R.length;
        we++
      ) {
        ce.index > we ? ((Ce = ce), (ce = null)) : (Ce = ce.sibling);
        var Be = H(O, ce, R[we], Q);
        if (Be === null) {
          ce === null && (ce = Ce);
          break;
        }
        (e && ce && Be.alternate === null && t(O, ce),
          (A = c(Be, A, we)),
          qe === null ? (fe = Be) : (qe.sibling = Be),
          (qe = Be),
          (ce = Ce));
      }
      if (we === R.length) return (a(O, ce), Ae && Nl(O, we), fe);
      if (ce === null) {
        for (; we < R.length; we++)
          ((ce = Z(O, R[we], Q)),
            ce !== null &&
              ((A = c(ce, A, we)), qe === null ? (fe = ce) : (qe.sibling = ce), (qe = ce)));
        return (Ae && Nl(O, we), fe);
      }
      for (ce = n(ce); we < R.length; we++)
        ((Ce = U(ce, O, we, R[we], Q)),
          Ce !== null &&
            (e && Ce.alternate !== null && ce.delete(Ce.key === null ? we : Ce.key),
            (A = c(Ce, A, we)),
            qe === null ? (fe = Ce) : (qe.sibling = Ce),
            (qe = Ce)));
      return (
        e &&
          ce.forEach(function (ka) {
            return t(O, ka);
          }),
        Ae && Nl(O, we),
        fe
      );
    }
    function ge(O, A, R, Q) {
      if (R == null) throw Error(r(151));
      for (
        var fe = null, qe = null, ce = A, we = (A = 0), Ce = null, Be = R.next();
        ce !== null && !Be.done;
        we++, Be = R.next()
      ) {
        ce.index > we ? ((Ce = ce), (ce = null)) : (Ce = ce.sibling);
        var ka = H(O, ce, Be.value, Q);
        if (ka === null) {
          ce === null && (ce = Ce);
          break;
        }
        (e && ce && ka.alternate === null && t(O, ce),
          (A = c(ka, A, we)),
          qe === null ? (fe = ka) : (qe.sibling = ka),
          (qe = ka),
          (ce = Ce));
      }
      if (Be.done) return (a(O, ce), Ae && Nl(O, we), fe);
      if (ce === null) {
        for (; !Be.done; we++, Be = R.next())
          ((Be = Z(O, Be.value, Q)),
            Be !== null &&
              ((A = c(Be, A, we)), qe === null ? (fe = Be) : (qe.sibling = Be), (qe = Be)));
        return (Ae && Nl(O, we), fe);
      }
      for (ce = n(ce); !Be.done; we++, Be = R.next())
        ((Be = U(ce, O, we, Be.value, Q)),
          Be !== null &&
            (e && Be.alternate !== null && ce.delete(Be.key === null ? we : Be.key),
            (A = c(Be, A, we)),
            qe === null ? (fe = Be) : (qe.sibling = Be),
            (qe = Be)));
      return (
        e &&
          ce.forEach(function (Xv) {
            return t(O, Xv);
          }),
        Ae && Nl(O, we),
        fe
      );
    }
    function Ue(O, A, R, Q) {
      if (
        (typeof R == 'object' &&
          R !== null &&
          R.type === S &&
          R.key === null &&
          (R = R.props.children),
        typeof R == 'object' && R !== null)
      ) {
        switch (R.$$typeof) {
          case L:
            e: {
              for (var fe = R.key; A !== null; ) {
                if (A.key === fe) {
                  if (((fe = R.type), fe === S)) {
                    if (A.tag === 7) {
                      (a(O, A.sibling), (Q = s(A, R.props.children)), (Q.return = O), (O = Q));
                      break e;
                    }
                  } else if (
                    A.elementType === fe ||
                    (typeof fe == 'object' && fe !== null && fe.$$typeof === V && Ba(fe) === A.type)
                  ) {
                    (a(O, A.sibling), (Q = s(A, R.props)), fi(Q, R), (Q.return = O), (O = Q));
                    break e;
                  }
                  a(O, A);
                  break;
                } else t(O, A);
                A = A.sibling;
              }
              R.type === S
                ? ((Q = Ea(R.props.children, O.mode, Q, R.key)), (Q.return = O), (O = Q))
                : ((Q = Ns(R.type, R.key, R.props, null, O.mode, Q)),
                  fi(Q, R),
                  (Q.return = O),
                  (O = Q));
            }
            return _(O);
          case M:
            e: {
              for (fe = R.key; A !== null; ) {
                if (A.key === fe)
                  if (
                    A.tag === 4 &&
                    A.stateNode.containerInfo === R.containerInfo &&
                    A.stateNode.implementation === R.implementation
                  ) {
                    (a(O, A.sibling), (Q = s(A, R.children || [])), (Q.return = O), (O = Q));
                    break e;
                  } else {
                    a(O, A);
                    break;
                  }
                else t(O, A);
                A = A.sibling;
              }
              ((Q = Ao(R, O.mode, Q)), (Q.return = O), (O = Q));
            }
            return _(O);
          case V:
            return ((R = Ba(R)), Ue(O, A, R, Q));
        }
        if (ve(R)) return oe(O, A, R, Q);
        if (de(R)) {
          if (((fe = de(R)), typeof fe != 'function')) throw Error(r(150));
          return ((R = fe.call(R)), ge(O, A, R, Q));
        }
        if (typeof R.then == 'function') return Ue(O, A, Os(R), Q);
        if (R.$$typeof === $) return Ue(O, A, As(O, R), Q);
        Is(O, R);
      }
      return (typeof R == 'string' && R !== '') || typeof R == 'number' || typeof R == 'bigint'
        ? ((R = '' + R),
          A !== null && A.tag === 6
            ? (a(O, A.sibling), (Q = s(A, R)), (Q.return = O), (O = Q))
            : (a(O, A), (Q = Co(R, O.mode, Q)), (Q.return = O), (O = Q)),
          _(O))
        : a(O, A);
    }
    return function (O, A, R, Q) {
      try {
        _i = 0;
        var fe = Ue(O, A, R, Q);
        return ((gn = null), fe);
      } catch (ce) {
        if (ce === hn || ce === qs) throw ce;
        var qe = Ot(29, ce, null, O.mode);
        return ((qe.lanes = Q), (qe.return = O), qe);
      } finally {
      }
    };
  }
  var Ia = Cm(!0),
    Am = Cm(!1),
    ta = !1;
  function $o(e) {
    e.updateQueue = {
      baseState: e.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null,
    };
  }
  function Go(e, t) {
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
  function la(e) {
    return { lane: e, tag: 0, payload: null, callback: null, next: null };
  }
  function aa(e, t, a) {
    var n = e.updateQueue;
    if (n === null) return null;
    if (((n = n.shared), (Oe & 2) !== 0)) {
      var s = n.pending;
      return (
        s === null ? (t.next = t) : ((t.next = s.next), (s.next = t)),
        (n.pending = t),
        (t = js(e)),
        _m(e, null, a),
        t
      );
    }
    return (Ts(e, n, t, a), js(e));
  }
  function pi(e, t, a) {
    if (((t = t.updateQueue), t !== null && ((t = t.shared), (a & 4194048) !== 0))) {
      var n = t.lanes;
      ((n &= e.pendingLanes), (a |= n), (t.lanes = a), bd(e, a));
    }
  }
  function Yo(e, t) {
    var a = e.updateQueue,
      n = e.alternate;
    if (n !== null && ((n = n.updateQueue), a === n)) {
      var s = null,
        c = null;
      if (((a = a.firstBaseUpdate), a !== null)) {
        do {
          var _ = { lane: a.lane, tag: a.tag, payload: a.payload, callback: null, next: null };
          (c === null ? (s = c = _) : (c = c.next = _), (a = a.next));
        } while (a !== null);
        c === null ? (s = c = t) : (c = c.next = t);
      } else s = c = t;
      ((a = {
        baseState: n.baseState,
        firstBaseUpdate: s,
        lastBaseUpdate: c,
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
  var Xo = !1;
  function hi() {
    if (Xo) {
      var e = pn;
      if (e !== null) throw e;
    }
  }
  function gi(e, t, a, n) {
    Xo = !1;
    var s = e.updateQueue;
    ta = !1;
    var c = s.firstBaseUpdate,
      _ = s.lastBaseUpdate,
      k = s.shared.pending;
    if (k !== null) {
      s.shared.pending = null;
      var j = k,
        z = j.next;
      ((j.next = null), _ === null ? (c = z) : (_.next = z), (_ = j));
      var G = e.alternate;
      G !== null &&
        ((G = G.updateQueue),
        (k = G.lastBaseUpdate),
        k !== _ && (k === null ? (G.firstBaseUpdate = z) : (k.next = z), (G.lastBaseUpdate = j)));
    }
    if (c !== null) {
      var Z = s.baseState;
      ((_ = 0), (G = z = j = null), (k = c));
      do {
        var H = k.lane & -536870913,
          U = H !== k.lane;
        if (U ? (Ee & H) === H : (n & H) === H) {
          (H !== 0 && H === fn && (Xo = !0),
            G !== null &&
              (G = G.next =
                { lane: 0, tag: k.tag, payload: k.payload, callback: null, next: null }));
          e: {
            var oe = e,
              ge = k;
            H = t;
            var Ue = a;
            switch (ge.tag) {
              case 1:
                if (((oe = ge.payload), typeof oe == 'function')) {
                  Z = oe.call(Ue, Z, H);
                  break e;
                }
                Z = oe;
                break e;
              case 3:
                oe.flags = (oe.flags & -65537) | 128;
              case 0:
                if (
                  ((oe = ge.payload),
                  (H = typeof oe == 'function' ? oe.call(Ue, Z, H) : oe),
                  H == null)
                )
                  break e;
                Z = v({}, Z, H);
                break e;
              case 2:
                ta = !0;
            }
          }
          ((H = k.callback),
            H !== null &&
              ((e.flags |= 64),
              U && (e.flags |= 8192),
              (U = s.callbacks),
              U === null ? (s.callbacks = [H]) : U.push(H)));
        } else
          ((U = { lane: H, tag: k.tag, payload: k.payload, callback: k.callback, next: null }),
            G === null ? ((z = G = U), (j = Z)) : (G = G.next = U),
            (_ |= H));
        if (((k = k.next), k === null)) {
          if (((k = s.shared.pending), k === null)) break;
          ((U = k),
            (k = U.next),
            (U.next = null),
            (s.lastBaseUpdate = U),
            (s.shared.pending = null));
        }
      } while (!0);
      (G === null && (j = Z),
        (s.baseState = j),
        (s.firstBaseUpdate = z),
        (s.lastBaseUpdate = G),
        c === null && (s.shared.lanes = 0),
        (oa |= _),
        (e.lanes = _),
        (e.memoizedState = Z));
    }
  }
  function Lm(e, t) {
    if (typeof e != 'function') throw Error(r(191, e));
    e.call(t);
  }
  function qm(e, t) {
    var a = e.callbacks;
    if (a !== null) for (e.callbacks = null, e = 0; e < a.length; e++) Lm(a[e], t);
  }
  var kn = b(null),
    Ms = b(0);
  function Bm(e, t) {
    ((e = Rl), X(Ms, e), X(kn, t), (Rl = e | t.baseLanes));
  }
  function Vo() {
    (X(Ms, Rl), X(kn, kn.current));
  }
  function Qo() {
    ((Rl = Ms.current), N(kn), N(Ms));
  }
  var It = b(null),
    Zt = null;
  function na(e) {
    var t = e.alternate;
    (X(at, at.current & 1),
      X(It, e),
      Zt === null && (t === null || kn.current !== null || t.memoizedState !== null) && (Zt = e));
  }
  function Ko(e) {
    (X(at, at.current), X(It, e), Zt === null && (Zt = e));
  }
  function Om(e) {
    e.tag === 22 ? (X(at, at.current), X(It, e), Zt === null && (Zt = e)) : ia();
  }
  function ia() {
    (X(at, at.current), X(It, It.current));
  }
  function Mt(e) {
    (N(It), Zt === e && (Zt = null), N(at));
  }
  var at = b(0);
  function Ds(e) {
    for (var t = e; t !== null; ) {
      if (t.tag === 13) {
        var a = t.memoizedState;
        if (a !== null && ((a = a.dehydrated), a === null || eu(a) || tu(a))) return t;
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
  var Al = 0,
    Se = null,
    ze = null,
    st = null,
    Rs = !1,
    vn = !1,
    Ma = !1,
    zs = 0,
    ki = 0,
    yn = null,
    Ik = 0;
  function et() {
    throw Error(r(321));
  }
  function Zo(e, t) {
    if (t === null) return !1;
    for (var a = 0; a < t.length && a < e.length; a++) if (!Bt(e[a], t[a])) return !1;
    return !0;
  }
  function Jo(e, t, a, n, s, c) {
    return (
      (Al = c),
      (Se = t),
      (t.memoizedState = null),
      (t.updateQueue = null),
      (t.lanes = 0),
      (q.H = e === null || e.memoizedState === null ? g_ : dc),
      (Ma = !1),
      (c = a(n, s)),
      (Ma = !1),
      vn && (c = Mm(t, a, n, s)),
      Im(e),
      c
    );
  }
  function Im(e) {
    q.H = bi;
    var t = ze !== null && ze.next !== null;
    if (((Al = 0), (st = ze = Se = null), (Rs = !1), (ki = 0), (yn = null), t)) throw Error(r(300));
    e === null || rt || ((e = e.dependencies), e !== null && Cs(e) && (rt = !0));
  }
  function Mm(e, t, a, n) {
    Se = e;
    var s = 0;
    do {
      if ((vn && (yn = null), (ki = 0), (vn = !1), 25 <= s)) throw Error(r(301));
      if (((s += 1), (st = ze = null), e.updateQueue != null)) {
        var c = e.updateQueue;
        ((c.lastEffect = null),
          (c.events = null),
          (c.stores = null),
          c.memoCache != null && (c.memoCache.index = 0));
      }
      ((q.H = k_), (c = t(a, n)));
    } while (vn);
    return c;
  }
  function Mk() {
    var e = q.H,
      t = e.useState()[0];
    return (
      (t = typeof t.then == 'function' ? vi(t) : t),
      (e = e.useState()[0]),
      (ze !== null ? ze.memoizedState : null) !== e && (Se.flags |= 1024),
      t
    );
  }
  function Po() {
    var e = zs !== 0;
    return ((zs = 0), e);
  }
  function Fo(e, t, a) {
    ((t.updateQueue = e.updateQueue), (t.flags &= -2053), (e.lanes &= ~a));
  }
  function Wo(e) {
    if (Rs) {
      for (e = e.memoizedState; e !== null; ) {
        var t = e.queue;
        (t !== null && (t.pending = null), (e = e.next));
      }
      Rs = !1;
    }
    ((Al = 0), (st = ze = Se = null), (vn = !1), (ki = zs = 0), (yn = null));
  }
  function St() {
    var e = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
    return (st === null ? (Se.memoizedState = st = e) : (st = st.next = e), st);
  }
  function nt() {
    if (ze === null) {
      var e = Se.alternate;
      e = e !== null ? e.memoizedState : null;
    } else e = ze.next;
    var t = st === null ? Se.memoizedState : st.next;
    if (t !== null) ((st = t), (ze = e));
    else {
      if (e === null) throw Se.alternate === null ? Error(r(467)) : Error(r(310));
      ((ze = e),
        (e = {
          memoizedState: ze.memoizedState,
          baseState: ze.baseState,
          baseQueue: ze.baseQueue,
          queue: ze.queue,
          next: null,
        }),
        st === null ? (Se.memoizedState = st = e) : (st = st.next = e));
    }
    return st;
  }
  function Hs() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function vi(e) {
    var t = ki;
    return (
      (ki += 1),
      yn === null && (yn = []),
      (e = jm(yn, e, t)),
      (t = Se),
      (st === null ? t.memoizedState : st.next) === null &&
        ((t = t.alternate), (q.H = t === null || t.memoizedState === null ? g_ : dc)),
      e
    );
  }
  function Us(e) {
    if (e !== null && typeof e == 'object') {
      if (typeof e.then == 'function') return vi(e);
      if (e.$$typeof === $) return gt(e);
    }
    throw Error(r(438, String(e)));
  }
  function ec(e) {
    var t = null,
      a = Se.updateQueue;
    if ((a !== null && (t = a.memoCache), t == null)) {
      var n = Se.alternate;
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
      a === null && ((a = Hs()), (Se.updateQueue = a)),
      (a.memoCache = t),
      (a = t.data[t.index]),
      a === void 0)
    )
      for (a = t.data[t.index] = Array(e), n = 0; n < e; n++) a[n] = ue;
    return (t.index++, a);
  }
  function Ll(e, t) {
    return typeof t == 'function' ? t(e) : t;
  }
  function $s(e) {
    var t = nt();
    return tc(t, ze, e);
  }
  function tc(e, t, a) {
    var n = e.queue;
    if (n === null) throw Error(r(311));
    n.lastRenderedReducer = a;
    var s = e.baseQueue,
      c = n.pending;
    if (c !== null) {
      if (s !== null) {
        var _ = s.next;
        ((s.next = c.next), (c.next = _));
      }
      ((t.baseQueue = s = c), (n.pending = null));
    }
    if (((c = e.baseState), s === null)) e.memoizedState = c;
    else {
      t = s.next;
      var k = (_ = null),
        j = null,
        z = t,
        G = !1;
      do {
        var Z = z.lane & -536870913;
        if (Z !== z.lane ? (Ee & Z) === Z : (Al & Z) === Z) {
          var H = z.revertLane;
          if (H === 0)
            (j !== null &&
              (j = j.next =
                {
                  lane: 0,
                  revertLane: 0,
                  gesture: null,
                  action: z.action,
                  hasEagerState: z.hasEagerState,
                  eagerState: z.eagerState,
                  next: null,
                }),
              Z === fn && (G = !0));
          else if ((Al & H) === H) {
            ((z = z.next), H === fn && (G = !0));
            continue;
          } else
            ((Z = {
              lane: 0,
              revertLane: z.revertLane,
              gesture: null,
              action: z.action,
              hasEagerState: z.hasEagerState,
              eagerState: z.eagerState,
              next: null,
            }),
              j === null ? ((k = j = Z), (_ = c)) : (j = j.next = Z),
              (Se.lanes |= H),
              (oa |= H));
          ((Z = z.action), Ma && a(c, Z), (c = z.hasEagerState ? z.eagerState : a(c, Z)));
        } else
          ((H = {
            lane: Z,
            revertLane: z.revertLane,
            gesture: z.gesture,
            action: z.action,
            hasEagerState: z.hasEagerState,
            eagerState: z.eagerState,
            next: null,
          }),
            j === null ? ((k = j = H), (_ = c)) : (j = j.next = H),
            (Se.lanes |= Z),
            (oa |= Z));
        z = z.next;
      } while (z !== null && z !== t);
      if (
        (j === null ? (_ = c) : (j.next = k),
        !Bt(c, e.memoizedState) && ((rt = !0), G && ((a = pn), a !== null)))
      )
        throw a;
      ((e.memoizedState = c), (e.baseState = _), (e.baseQueue = j), (n.lastRenderedState = c));
    }
    return (s === null && (n.lanes = 0), [e.memoizedState, n.dispatch]);
  }
  function lc(e) {
    var t = nt(),
      a = t.queue;
    if (a === null) throw Error(r(311));
    a.lastRenderedReducer = e;
    var n = a.dispatch,
      s = a.pending,
      c = t.memoizedState;
    if (s !== null) {
      a.pending = null;
      var _ = (s = s.next);
      do ((c = e(c, _.action)), (_ = _.next));
      while (_ !== s);
      (Bt(c, t.memoizedState) || (rt = !0),
        (t.memoizedState = c),
        t.baseQueue === null && (t.baseState = c),
        (a.lastRenderedState = c));
    }
    return [c, n];
  }
  function Dm(e, t, a) {
    var n = Se,
      s = nt(),
      c = Ae;
    if (c) {
      if (a === void 0) throw Error(r(407));
      a = a();
    } else a = t();
    var _ = !Bt((ze || s).memoizedState, a);
    if (
      (_ && ((s.memoizedState = a), (rt = !0)),
      (s = s.queue),
      ic(Hm.bind(null, n, s, e), [e]),
      s.getSnapshot !== t || _ || (st !== null && st.memoizedState.tag & 1))
    ) {
      if (
        ((n.flags |= 2048),
        bn(9, { destroy: void 0 }, zm.bind(null, n, s, a, t), null),
        Ye === null)
      )
        throw Error(r(349));
      c || (Al & 127) !== 0 || Rm(n, t, a);
    }
    return a;
  }
  function Rm(e, t, a) {
    ((e.flags |= 16384),
      (e = { getSnapshot: t, value: a }),
      (t = Se.updateQueue),
      t === null
        ? ((t = Hs()), (Se.updateQueue = t), (t.stores = [e]))
        : ((a = t.stores), a === null ? (t.stores = [e]) : a.push(e)));
  }
  function zm(e, t, a, n) {
    ((t.value = a), (t.getSnapshot = n), Um(t) && $m(e));
  }
  function Hm(e, t, a) {
    return a(function () {
      Um(t) && $m(e);
    });
  }
  function Um(e) {
    var t = e.getSnapshot;
    e = e.value;
    try {
      var a = t();
      return !Bt(e, a);
    } catch {
      return !0;
    }
  }
  function $m(e) {
    var t = Na(e, 2);
    t !== null && At(t, e, 2);
  }
  function ac(e) {
    var t = St();
    if (typeof e == 'function') {
      var a = e;
      if (((e = a()), Ma)) {
        Kl(!0);
        try {
          a();
        } finally {
          Kl(!1);
        }
      }
    }
    return (
      (t.memoizedState = t.baseState = e),
      (t.queue = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Ll,
        lastRenderedState: e,
      }),
      t
    );
  }
  function Gm(e, t, a, n) {
    return ((e.baseState = a), tc(e, ze, typeof n == 'function' ? n : Ll));
  }
  function Dk(e, t, a, n, s) {
    if (Xs(e)) throw Error(r(485));
    if (((e = t.action), e !== null)) {
      var c = {
        payload: s,
        action: e,
        next: null,
        isTransition: !0,
        status: 'pending',
        value: null,
        reason: null,
        listeners: [],
        then: function (_) {
          c.listeners.push(_);
        },
      };
      (q.T !== null ? a(!0) : (c.isTransition = !1),
        n(c),
        (a = t.pending),
        a === null
          ? ((c.next = t.pending = c), Ym(t, c))
          : ((c.next = a.next), (t.pending = a.next = c)));
    }
  }
  function Ym(e, t) {
    var a = t.action,
      n = t.payload,
      s = e.state;
    if (t.isTransition) {
      var c = q.T,
        _ = {};
      q.T = _;
      try {
        var k = a(s, n),
          j = q.S;
        (j !== null && j(_, k), Xm(e, t, k));
      } catch (z) {
        nc(e, t, z);
      } finally {
        (c !== null && _.types !== null && (c.types = _.types), (q.T = c));
      }
    } else
      try {
        ((c = a(s, n)), Xm(e, t, c));
      } catch (z) {
        nc(e, t, z);
      }
  }
  function Xm(e, t, a) {
    a !== null && typeof a == 'object' && typeof a.then == 'function'
      ? a.then(
          function (n) {
            Vm(e, t, n);
          },
          function (n) {
            return nc(e, t, n);
          }
        )
      : Vm(e, t, a);
  }
  function Vm(e, t, a) {
    ((t.status = 'fulfilled'),
      (t.value = a),
      Qm(t),
      (e.state = a),
      (t = e.pending),
      t !== null &&
        ((a = t.next), a === t ? (e.pending = null) : ((a = a.next), (t.next = a), Ym(e, a))));
  }
  function nc(e, t, a) {
    var n = e.pending;
    if (((e.pending = null), n !== null)) {
      n = n.next;
      do ((t.status = 'rejected'), (t.reason = a), Qm(t), (t = t.next));
      while (t !== n);
    }
    e.action = null;
  }
  function Qm(e) {
    e = e.listeners;
    for (var t = 0; t < e.length; t++) (0, e[t])();
  }
  function Km(e, t) {
    return t;
  }
  function Zm(e, t) {
    if (Ae) {
      var a = Ye.formState;
      if (a !== null) {
        e: {
          var n = Se;
          if (Ae) {
            if (Ve) {
              t: {
                for (var s = Ve, c = Kt; s.nodeType !== 8; ) {
                  if (!c) {
                    s = null;
                    break t;
                  }
                  if (((s = Jt(s.nextSibling)), s === null)) {
                    s = null;
                    break t;
                  }
                }
                ((c = s.data), (s = c === 'F!' || c === 'F' ? s : null));
              }
              if (s) {
                ((Ve = Jt(s.nextSibling)), (n = s.data === 'F!'));
                break e;
              }
            }
            Wl(n);
          }
          n = !1;
        }
        n && (t = a[0]);
      }
    }
    return (
      (a = St()),
      (a.memoizedState = a.baseState = t),
      (n = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Km,
        lastRenderedState: t,
      }),
      (a.queue = n),
      (a = f_.bind(null, Se, n)),
      (n.dispatch = a),
      (n = ac(!1)),
      (c = uc.bind(null, Se, !1, n.queue)),
      (n = St()),
      (s = { state: t, dispatch: null, action: e, pending: null }),
      (n.queue = s),
      (a = Dk.bind(null, Se, s, c, a)),
      (s.dispatch = a),
      (n.memoizedState = e),
      [t, a, !1]
    );
  }
  function Jm(e) {
    var t = nt();
    return Pm(t, ze, e);
  }
  function Pm(e, t, a) {
    if (
      ((t = tc(e, t, Km)[0]),
      (e = $s(Ll)[0]),
      typeof t == 'object' && t !== null && typeof t.then == 'function')
    )
      try {
        var n = vi(t);
      } catch (_) {
        throw _ === hn ? qs : _;
      }
    else n = t;
    t = nt();
    var s = t.queue,
      c = s.dispatch;
    return (
      a !== t.memoizedState &&
        ((Se.flags |= 2048), bn(9, { destroy: void 0 }, Rk.bind(null, s, a), null)),
      [n, c, e]
    );
  }
  function Rk(e, t) {
    e.action = t;
  }
  function Fm(e) {
    var t = nt(),
      a = ze;
    if (a !== null) return Pm(t, a, e);
    (nt(), (t = t.memoizedState), (a = nt()));
    var n = a.queue.dispatch;
    return ((a.memoizedState = e), [t, n, !1]);
  }
  function bn(e, t, a, n) {
    return (
      (e = { tag: e, create: a, deps: n, inst: t, next: null }),
      (t = Se.updateQueue),
      t === null && ((t = Hs()), (Se.updateQueue = t)),
      (a = t.lastEffect),
      a === null
        ? (t.lastEffect = e.next = e)
        : ((n = a.next), (a.next = e), (e.next = n), (t.lastEffect = e)),
      e
    );
  }
  function Wm() {
    return nt().memoizedState;
  }
  function Gs(e, t, a, n) {
    var s = St();
    ((Se.flags |= e),
      (s.memoizedState = bn(1 | t, { destroy: void 0 }, a, n === void 0 ? null : n)));
  }
  function Ys(e, t, a, n) {
    var s = nt();
    n = n === void 0 ? null : n;
    var c = s.memoizedState.inst;
    ze !== null && n !== null && Zo(n, ze.memoizedState.deps)
      ? (s.memoizedState = bn(t, c, a, n))
      : ((Se.flags |= e), (s.memoizedState = bn(1 | t, c, a, n)));
  }
  function e_(e, t) {
    Gs(8390656, 8, e, t);
  }
  function ic(e, t) {
    Ys(2048, 8, e, t);
  }
  function zk(e) {
    Se.flags |= 4;
    var t = Se.updateQueue;
    if (t === null) ((t = Hs()), (Se.updateQueue = t), (t.events = [e]));
    else {
      var a = t.events;
      a === null ? (t.events = [e]) : a.push(e);
    }
  }
  function t_(e) {
    var t = nt().memoizedState;
    return (
      zk({ ref: t, nextImpl: e }),
      function () {
        if ((Oe & 2) !== 0) throw Error(r(440));
        return t.impl.apply(void 0, arguments);
      }
    );
  }
  function l_(e, t) {
    return Ys(4, 2, e, t);
  }
  function a_(e, t) {
    return Ys(4, 4, e, t);
  }
  function n_(e, t) {
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
  function i_(e, t, a) {
    ((a = a != null ? a.concat([e]) : null), Ys(4, 4, n_.bind(null, t, e), a));
  }
  function sc() {}
  function s_(e, t) {
    var a = nt();
    t = t === void 0 ? null : t;
    var n = a.memoizedState;
    return t !== null && Zo(t, n[1]) ? n[0] : ((a.memoizedState = [e, t]), e);
  }
  function r_(e, t) {
    var a = nt();
    t = t === void 0 ? null : t;
    var n = a.memoizedState;
    if (t !== null && Zo(t, n[1])) return n[0];
    if (((n = e()), Ma)) {
      Kl(!0);
      try {
        e();
      } finally {
        Kl(!1);
      }
    }
    return ((a.memoizedState = [n, t]), n);
  }
  function rc(e, t, a) {
    return a === void 0 || ((Al & 1073741824) !== 0 && (Ee & 261930) === 0)
      ? (e.memoizedState = t)
      : ((e.memoizedState = a), (e = cf()), (Se.lanes |= e), (oa |= e), a);
  }
  function o_(e, t, a, n) {
    return Bt(a, t)
      ? a
      : kn.current !== null
        ? ((e = rc(e, a, n)), Bt(e, t) || (rt = !0), e)
        : (Al & 42) === 0 || ((Al & 1073741824) !== 0 && (Ee & 261930) === 0)
          ? ((rt = !0), (e.memoizedState = a))
          : ((e = cf()), (Se.lanes |= e), (oa |= e), t);
  }
  function c_(e, t, a, n, s) {
    var c = J.p;
    J.p = c !== 0 && 8 > c ? c : 8;
    var _ = q.T,
      k = {};
    ((q.T = k), uc(e, !1, t, a));
    try {
      var j = s(),
        z = q.S;
      if (
        (z !== null && z(k, j), j !== null && typeof j == 'object' && typeof j.then == 'function')
      ) {
        var G = Ok(j, n);
        yi(e, t, G, zt(e));
      } else yi(e, t, n, zt(e));
    } catch (Z) {
      yi(e, t, { then: function () {}, status: 'rejected', reason: Z }, zt());
    } finally {
      ((J.p = c), _ !== null && k.types !== null && (_.types = k.types), (q.T = _));
    }
  }
  function Hk() {}
  function oc(e, t, a, n) {
    if (e.tag !== 5) throw Error(r(476));
    var s = u_(e).queue;
    c_(
      e,
      s,
      t,
      ne,
      a === null
        ? Hk
        : function () {
            return (d_(e), a(n));
          }
    );
  }
  function u_(e) {
    var t = e.memoizedState;
    if (t !== null) return t;
    t = {
      memoizedState: ne,
      baseState: ne,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Ll,
        lastRenderedState: ne,
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
          lastRenderedReducer: Ll,
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
  function d_(e) {
    var t = u_(e);
    (t.next === null && (t = e.alternate.memoizedState), yi(e, t.next.queue, {}, zt()));
  }
  function cc() {
    return gt(Di);
  }
  function m_() {
    return nt().memoizedState;
  }
  function __() {
    return nt().memoizedState;
  }
  function Uk(e) {
    for (var t = e.return; t !== null; ) {
      switch (t.tag) {
        case 24:
        case 3:
          var a = zt();
          e = la(a);
          var n = aa(t, e, a);
          (n !== null && (At(n, t, a), pi(n, t, a)), (t = { cache: Ro() }), (e.payload = t));
          return;
      }
      t = t.return;
    }
  }
  function $k(e, t, a) {
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
      Xs(e) ? p_(t, a) : ((a = No(e, t, a, n)), a !== null && (At(a, e, n), h_(a, t, n))));
  }
  function f_(e, t, a) {
    var n = zt();
    yi(e, t, a, n);
  }
  function yi(e, t, a, n) {
    var s = {
      lane: n,
      revertLane: 0,
      gesture: null,
      action: a,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    };
    if (Xs(e)) p_(t, s);
    else {
      var c = e.alternate;
      if (
        e.lanes === 0 &&
        (c === null || c.lanes === 0) &&
        ((c = t.lastRenderedReducer), c !== null)
      )
        try {
          var _ = t.lastRenderedState,
            k = c(_, a);
          if (((s.hasEagerState = !0), (s.eagerState = k), Bt(k, _)))
            return (Ts(e, t, s, 0), Ye === null && ws(), !1);
        } catch {
        } finally {
        }
      if (((a = No(e, t, s, n)), a !== null)) return (At(a, e, n), h_(a, t, n), !0);
    }
    return !1;
  }
  function uc(e, t, a, n) {
    if (
      ((n = {
        lane: 2,
        revertLane: $c(),
        gesture: null,
        action: n,
        hasEagerState: !1,
        eagerState: null,
        next: null,
      }),
      Xs(e))
    ) {
      if (t) throw Error(r(479));
    } else ((t = No(e, a, n, 2)), t !== null && At(t, e, 2));
  }
  function Xs(e) {
    var t = e.alternate;
    return e === Se || (t !== null && t === Se);
  }
  function p_(e, t) {
    vn = Rs = !0;
    var a = e.pending;
    (a === null ? (t.next = t) : ((t.next = a.next), (a.next = t)), (e.pending = t));
  }
  function h_(e, t, a) {
    if ((a & 4194048) !== 0) {
      var n = t.lanes;
      ((n &= e.pendingLanes), (a |= n), (t.lanes = a), bd(e, a));
    }
  }
  var bi = {
    readContext: gt,
    use: Us,
    useCallback: et,
    useContext: et,
    useEffect: et,
    useImperativeHandle: et,
    useLayoutEffect: et,
    useInsertionEffect: et,
    useMemo: et,
    useReducer: et,
    useRef: et,
    useState: et,
    useDebugValue: et,
    useDeferredValue: et,
    useTransition: et,
    useSyncExternalStore: et,
    useId: et,
    useHostTransitionStatus: et,
    useFormState: et,
    useActionState: et,
    useOptimistic: et,
    useMemoCache: et,
    useCacheRefresh: et,
  };
  bi.useEffectEvent = et;
  var g_ = {
      readContext: gt,
      use: Us,
      useCallback: function (e, t) {
        return ((St().memoizedState = [e, t === void 0 ? null : t]), e);
      },
      useContext: gt,
      useEffect: e_,
      useImperativeHandle: function (e, t, a) {
        ((a = a != null ? a.concat([e]) : null), Gs(4194308, 4, n_.bind(null, t, e), a));
      },
      useLayoutEffect: function (e, t) {
        return Gs(4194308, 4, e, t);
      },
      useInsertionEffect: function (e, t) {
        Gs(4, 2, e, t);
      },
      useMemo: function (e, t) {
        var a = St();
        t = t === void 0 ? null : t;
        var n = e();
        if (Ma) {
          Kl(!0);
          try {
            e();
          } finally {
            Kl(!1);
          }
        }
        return ((a.memoizedState = [n, t]), n);
      },
      useReducer: function (e, t, a) {
        var n = St();
        if (a !== void 0) {
          var s = a(t);
          if (Ma) {
            Kl(!0);
            try {
              a(t);
            } finally {
              Kl(!1);
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
          (e = e.dispatch = $k.bind(null, Se, e)),
          [n.memoizedState, e]
        );
      },
      useRef: function (e) {
        var t = St();
        return ((e = { current: e }), (t.memoizedState = e));
      },
      useState: function (e) {
        e = ac(e);
        var t = e.queue,
          a = f_.bind(null, Se, t);
        return ((t.dispatch = a), [e.memoizedState, a]);
      },
      useDebugValue: sc,
      useDeferredValue: function (e, t) {
        var a = St();
        return rc(a, e, t);
      },
      useTransition: function () {
        var e = ac(!1);
        return ((e = c_.bind(null, Se, e.queue, !0, !1)), (St().memoizedState = e), [!1, e]);
      },
      useSyncExternalStore: function (e, t, a) {
        var n = Se,
          s = St();
        if (Ae) {
          if (a === void 0) throw Error(r(407));
          a = a();
        } else {
          if (((a = t()), Ye === null)) throw Error(r(349));
          (Ee & 127) !== 0 || Rm(n, t, a);
        }
        s.memoizedState = a;
        var c = { value: a, getSnapshot: t };
        return (
          (s.queue = c),
          e_(Hm.bind(null, n, c, e), [e]),
          (n.flags |= 2048),
          bn(9, { destroy: void 0 }, zm.bind(null, n, c, a, t), null),
          a
        );
      },
      useId: function () {
        var e = St(),
          t = Ye.identifierPrefix;
        if (Ae) {
          var a = pl,
            n = fl;
          ((a = (n & ~(1 << (32 - qt(n) - 1))).toString(32) + a),
            (t = '_' + t + 'R_' + a),
            (a = zs++),
            0 < a && (t += 'H' + a.toString(32)),
            (t += '_'));
        } else ((a = Ik++), (t = '_' + t + 'r_' + a.toString(32) + '_'));
        return (e.memoizedState = t);
      },
      useHostTransitionStatus: cc,
      useFormState: Zm,
      useActionState: Zm,
      useOptimistic: function (e) {
        var t = St();
        t.memoizedState = t.baseState = e;
        var a = {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: null,
          lastRenderedState: null,
        };
        return ((t.queue = a), (t = uc.bind(null, Se, !0, a)), (a.dispatch = t), [e, t]);
      },
      useMemoCache: ec,
      useCacheRefresh: function () {
        return (St().memoizedState = Uk.bind(null, Se));
      },
      useEffectEvent: function (e) {
        var t = St(),
          a = { impl: e };
        return (
          (t.memoizedState = a),
          function () {
            if ((Oe & 2) !== 0) throw Error(r(440));
            return a.impl.apply(void 0, arguments);
          }
        );
      },
    },
    dc = {
      readContext: gt,
      use: Us,
      useCallback: s_,
      useContext: gt,
      useEffect: ic,
      useImperativeHandle: i_,
      useInsertionEffect: l_,
      useLayoutEffect: a_,
      useMemo: r_,
      useReducer: $s,
      useRef: Wm,
      useState: function () {
        return $s(Ll);
      },
      useDebugValue: sc,
      useDeferredValue: function (e, t) {
        var a = nt();
        return o_(a, ze.memoizedState, e, t);
      },
      useTransition: function () {
        var e = $s(Ll)[0],
          t = nt().memoizedState;
        return [typeof e == 'boolean' ? e : vi(e), t];
      },
      useSyncExternalStore: Dm,
      useId: m_,
      useHostTransitionStatus: cc,
      useFormState: Jm,
      useActionState: Jm,
      useOptimistic: function (e, t) {
        var a = nt();
        return Gm(a, ze, e, t);
      },
      useMemoCache: ec,
      useCacheRefresh: __,
    };
  dc.useEffectEvent = t_;
  var k_ = {
    readContext: gt,
    use: Us,
    useCallback: s_,
    useContext: gt,
    useEffect: ic,
    useImperativeHandle: i_,
    useInsertionEffect: l_,
    useLayoutEffect: a_,
    useMemo: r_,
    useReducer: lc,
    useRef: Wm,
    useState: function () {
      return lc(Ll);
    },
    useDebugValue: sc,
    useDeferredValue: function (e, t) {
      var a = nt();
      return ze === null ? rc(a, e, t) : o_(a, ze.memoizedState, e, t);
    },
    useTransition: function () {
      var e = lc(Ll)[0],
        t = nt().memoizedState;
      return [typeof e == 'boolean' ? e : vi(e), t];
    },
    useSyncExternalStore: Dm,
    useId: m_,
    useHostTransitionStatus: cc,
    useFormState: Fm,
    useActionState: Fm,
    useOptimistic: function (e, t) {
      var a = nt();
      return ze !== null ? Gm(a, ze, e, t) : ((a.baseState = e), [e, a.queue.dispatch]);
    },
    useMemoCache: ec,
    useCacheRefresh: __,
  };
  k_.useEffectEvent = t_;
  function mc(e, t, a, n) {
    ((t = e.memoizedState),
      (a = a(n, t)),
      (a = a == null ? t : v({}, t, a)),
      (e.memoizedState = a),
      e.lanes === 0 && (e.updateQueue.baseState = a));
  }
  var _c = {
    enqueueSetState: function (e, t, a) {
      e = e._reactInternals;
      var n = zt(),
        s = la(n);
      ((s.payload = t),
        a != null && (s.callback = a),
        (t = aa(e, s, n)),
        t !== null && (At(t, e, n), pi(t, e, n)));
    },
    enqueueReplaceState: function (e, t, a) {
      e = e._reactInternals;
      var n = zt(),
        s = la(n);
      ((s.tag = 1),
        (s.payload = t),
        a != null && (s.callback = a),
        (t = aa(e, s, n)),
        t !== null && (At(t, e, n), pi(t, e, n)));
    },
    enqueueForceUpdate: function (e, t) {
      e = e._reactInternals;
      var a = zt(),
        n = la(a);
      ((n.tag = 2),
        t != null && (n.callback = t),
        (t = aa(e, n, a)),
        t !== null && (At(t, e, a), pi(t, e, a)));
    },
  };
  function v_(e, t, a, n, s, c, _) {
    return (
      (e = e.stateNode),
      typeof e.shouldComponentUpdate == 'function'
        ? e.shouldComponentUpdate(n, c, _)
        : t.prototype && t.prototype.isPureReactComponent
          ? !ri(a, n) || !ri(s, c)
          : !0
    );
  }
  function y_(e, t, a, n) {
    ((e = t.state),
      typeof t.componentWillReceiveProps == 'function' && t.componentWillReceiveProps(a, n),
      typeof t.UNSAFE_componentWillReceiveProps == 'function' &&
        t.UNSAFE_componentWillReceiveProps(a, n),
      t.state !== e && _c.enqueueReplaceState(t, t.state, null));
  }
  function Da(e, t) {
    var a = t;
    if ('ref' in t) {
      a = {};
      for (var n in t) n !== 'ref' && (a[n] = t[n]);
    }
    if ((e = e.defaultProps)) {
      a === t && (a = v({}, a));
      for (var s in e) a[s] === void 0 && (a[s] = e[s]);
    }
    return a;
  }
  function b_(e) {
    Ss(e);
  }
  function x_(e) {
    console.error(e);
  }
  function S_(e) {
    Ss(e);
  }
  function Vs(e, t) {
    try {
      var a = e.onUncaughtError;
      a(t.value, { componentStack: t.stack });
    } catch (n) {
      setTimeout(function () {
        throw n;
      });
    }
  }
  function w_(e, t, a) {
    try {
      var n = e.onCaughtError;
      n(a.value, { componentStack: a.stack, errorBoundary: t.tag === 1 ? t.stateNode : null });
    } catch (s) {
      setTimeout(function () {
        throw s;
      });
    }
  }
  function fc(e, t, a) {
    return (
      (a = la(a)),
      (a.tag = 3),
      (a.payload = { element: null }),
      (a.callback = function () {
        Vs(e, t);
      }),
      a
    );
  }
  function T_(e) {
    return ((e = la(e)), (e.tag = 3), e);
  }
  function j_(e, t, a, n) {
    var s = a.type.getDerivedStateFromError;
    if (typeof s == 'function') {
      var c = n.value;
      ((e.payload = function () {
        return s(c);
      }),
        (e.callback = function () {
          w_(t, a, n);
        }));
    }
    var _ = a.stateNode;
    _ !== null &&
      typeof _.componentDidCatch == 'function' &&
      (e.callback = function () {
        (w_(t, a, n),
          typeof s != 'function' && (ca === null ? (ca = new Set([this])) : ca.add(this)));
        var k = n.stack;
        this.componentDidCatch(n.value, { componentStack: k !== null ? k : '' });
      });
  }
  function Gk(e, t, a, n, s) {
    if (((a.flags |= 32768), n !== null && typeof n == 'object' && typeof n.then == 'function')) {
      if (((t = a.alternate), t !== null && _n(t, a, s, !0), (a = It.current), a !== null)) {
        switch (a.tag) {
          case 31:
          case 13:
            return (
              Zt === null ? nr() : a.alternate === null && tt === 0 && (tt = 3),
              (a.flags &= -257),
              (a.flags |= 65536),
              (a.lanes = s),
              n === Bs
                ? (a.flags |= 16384)
                : ((t = a.updateQueue),
                  t === null ? (a.updateQueue = new Set([n])) : t.add(n),
                  zc(e, n, s)),
              !1
            );
          case 22:
            return (
              (a.flags |= 65536),
              n === Bs
                ? (a.flags |= 16384)
                : ((t = a.updateQueue),
                  t === null
                    ? ((t = { transitions: null, markerInstances: null, retryQueue: new Set([n]) }),
                      (a.updateQueue = t))
                    : ((a = t.retryQueue), a === null ? (t.retryQueue = new Set([n])) : a.add(n)),
                  zc(e, n, s)),
              !1
            );
        }
        throw Error(r(435, a.tag));
      }
      return (zc(e, n, s), nr(), !1);
    }
    if (Ae)
      return (
        (t = It.current),
        t !== null
          ? ((t.flags & 65536) === 0 && (t.flags |= 256),
            (t.flags |= 65536),
            (t.lanes = s),
            n !== Bo && ((e = Error(r(422), { cause: n })), ui(Xt(e, a))))
          : (n !== Bo && ((t = Error(r(423), { cause: n })), ui(Xt(t, a))),
            (e = e.current.alternate),
            (e.flags |= 65536),
            (s &= -s),
            (e.lanes |= s),
            (n = Xt(n, a)),
            (s = fc(e.stateNode, n, s)),
            Yo(e, s),
            tt !== 4 && (tt = 2)),
        !1
      );
    var c = Error(r(520), { cause: n });
    if (((c = Xt(c, a)), Ci === null ? (Ci = [c]) : Ci.push(c), tt !== 4 && (tt = 2), t === null))
      return !0;
    ((n = Xt(n, a)), (a = t));
    do {
      switch (a.tag) {
        case 3:
          return (
            (a.flags |= 65536),
            (e = s & -s),
            (a.lanes |= e),
            (e = fc(a.stateNode, n, e)),
            Yo(a, e),
            !1
          );
        case 1:
          if (
            ((t = a.type),
            (c = a.stateNode),
            (a.flags & 128) === 0 &&
              (typeof t.getDerivedStateFromError == 'function' ||
                (c !== null &&
                  typeof c.componentDidCatch == 'function' &&
                  (ca === null || !ca.has(c)))))
          )
            return (
              (a.flags |= 65536),
              (s &= -s),
              (a.lanes |= s),
              (s = T_(s)),
              j_(s, e, a, n),
              Yo(a, s),
              !1
            );
      }
      a = a.return;
    } while (a !== null);
    return !1;
  }
  var pc = Error(r(461)),
    rt = !1;
  function kt(e, t, a, n) {
    t.child = e === null ? Am(t, null, a, n) : Ia(t, e.child, a, n);
  }
  function N_(e, t, a, n, s) {
    a = a.render;
    var c = t.ref;
    if ('ref' in n) {
      var _ = {};
      for (var k in n) k !== 'ref' && (_[k] = n[k]);
    } else _ = n;
    return (
      La(t),
      (n = Jo(e, t, a, _, c, s)),
      (k = Po()),
      e !== null && !rt
        ? (Fo(e, t, s), ql(e, t, s))
        : (Ae && k && Lo(t), (t.flags |= 1), kt(e, t, n, s), t.child)
    );
  }
  function E_(e, t, a, n, s) {
    if (e === null) {
      var c = a.type;
      return typeof c == 'function' && !Eo(c) && c.defaultProps === void 0 && a.compare === null
        ? ((t.tag = 15), (t.type = c), C_(e, t, c, n, s))
        : ((e = Ns(a.type, null, n, t, t.mode, s)), (e.ref = t.ref), (e.return = t), (t.child = e));
    }
    if (((c = e.child), !Sc(e, s))) {
      var _ = c.memoizedProps;
      if (((a = a.compare), (a = a !== null ? a : ri), a(_, n) && e.ref === t.ref))
        return ql(e, t, s);
    }
    return ((t.flags |= 1), (e = jl(c, n)), (e.ref = t.ref), (e.return = t), (t.child = e));
  }
  function C_(e, t, a, n, s) {
    if (e !== null) {
      var c = e.memoizedProps;
      if (ri(c, n) && e.ref === t.ref)
        if (((rt = !1), (t.pendingProps = n = c), Sc(e, s))) (e.flags & 131072) !== 0 && (rt = !0);
        else return ((t.lanes = e.lanes), ql(e, t, s));
    }
    return hc(e, t, a, n, s);
  }
  function A_(e, t, a, n) {
    var s = n.children,
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
        if (((c = c !== null ? c.baseLanes | a : a), e !== null)) {
          for (n = t.child = e.child, s = 0; n !== null; )
            ((s = s | n.lanes | n.childLanes), (n = n.sibling));
          n = s & ~c;
        } else ((n = 0), (t.child = null));
        return L_(e, t, c, a, n);
      }
      if ((a & 536870912) !== 0)
        ((t.memoizedState = { baseLanes: 0, cachePool: null }),
          e !== null && Ls(t, c !== null ? c.cachePool : null),
          c !== null ? Bm(t, c) : Vo(),
          Om(t));
      else return ((n = t.lanes = 536870912), L_(e, t, c !== null ? c.baseLanes | a : a, a, n));
    } else
      c !== null
        ? (Ls(t, c.cachePool), Bm(t, c), ia(), (t.memoizedState = null))
        : (e !== null && Ls(t, null), Vo(), ia());
    return (kt(e, t, s, a), t.child);
  }
  function xi(e, t) {
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
  function L_(e, t, a, n, s) {
    var c = Ho();
    return (
      (c = c === null ? null : { parent: it._currentValue, pool: c }),
      (t.memoizedState = { baseLanes: a, cachePool: c }),
      e !== null && Ls(t, null),
      Vo(),
      Om(t),
      e !== null && _n(e, t, n, !0),
      (t.childLanes = s),
      null
    );
  }
  function Qs(e, t) {
    return (
      (t = Zs({ mode: t.mode, children: t.children }, e.mode)),
      (t.ref = e.ref),
      (e.child = t),
      (t.return = e),
      t
    );
  }
  function q_(e, t, a) {
    return (
      Ia(t, e.child, null, a),
      (e = Qs(t, t.pendingProps)),
      (e.flags |= 2),
      Mt(t),
      (t.memoizedState = null),
      e
    );
  }
  function Yk(e, t, a) {
    var n = t.pendingProps,
      s = (t.flags & 128) !== 0;
    if (((t.flags &= -129), e === null)) {
      if (Ae) {
        if (n.mode === 'hidden') return ((e = Qs(t, n)), (t.lanes = 536870912), xi(null, e));
        if (
          (Ko(t),
          (e = Ve)
            ? ((e = Xf(e, Kt)),
              (e = e !== null && e.data === '&' ? e : null),
              e !== null &&
                ((t.memoizedState = {
                  dehydrated: e,
                  treeContext: Pl !== null ? { id: fl, overflow: pl } : null,
                  retryLane: 536870912,
                  hydrationErrors: null,
                }),
                (a = pm(e)),
                (a.return = t),
                (t.child = a),
                (ht = t),
                (Ve = null)))
            : (e = null),
          e === null)
        )
          throw Wl(t);
        return ((t.lanes = 536870912), null);
      }
      return Qs(t, n);
    }
    var c = e.memoizedState;
    if (c !== null) {
      var _ = c.dehydrated;
      if ((Ko(t), s))
        if (t.flags & 256) ((t.flags &= -257), (t = q_(e, t, a)));
        else if (t.memoizedState !== null) ((t.child = e.child), (t.flags |= 128), (t = null));
        else throw Error(r(558));
      else if ((rt || _n(e, t, a, !1), (s = (a & e.childLanes) !== 0), rt || s)) {
        if (((n = Ye), n !== null && ((_ = xd(n, a)), _ !== 0 && _ !== c.retryLane)))
          throw ((c.retryLane = _), Na(e, _), At(n, e, _), pc);
        (nr(), (t = q_(e, t, a)));
      } else
        ((e = c.treeContext),
          (Ve = Jt(_.nextSibling)),
          (ht = t),
          (Ae = !0),
          (Fl = null),
          (Kt = !1),
          e !== null && km(t, e),
          (t = Qs(t, n)),
          (t.flags |= 4096));
      return t;
    }
    return (
      (e = jl(e.child, { mode: n.mode, children: n.children })),
      (e.ref = t.ref),
      (t.child = e),
      (e.return = t),
      e
    );
  }
  function Ks(e, t) {
    var a = t.ref;
    if (a === null) e !== null && e.ref !== null && (t.flags |= 4194816);
    else {
      if (typeof a != 'function' && typeof a != 'object') throw Error(r(284));
      (e === null || e.ref !== a) && (t.flags |= 4194816);
    }
  }
  function hc(e, t, a, n, s) {
    return (
      La(t),
      (a = Jo(e, t, a, n, void 0, s)),
      (n = Po()),
      e !== null && !rt
        ? (Fo(e, t, s), ql(e, t, s))
        : (Ae && n && Lo(t), (t.flags |= 1), kt(e, t, a, s), t.child)
    );
  }
  function B_(e, t, a, n, s, c) {
    return (
      La(t),
      (t.updateQueue = null),
      (a = Mm(t, n, a, s)),
      Im(e),
      (n = Po()),
      e !== null && !rt
        ? (Fo(e, t, c), ql(e, t, c))
        : (Ae && n && Lo(t), (t.flags |= 1), kt(e, t, a, c), t.child)
    );
  }
  function O_(e, t, a, n, s) {
    if ((La(t), t.stateNode === null)) {
      var c = cn,
        _ = a.contextType;
      (typeof _ == 'object' && _ !== null && (c = gt(_)),
        (c = new a(n, c)),
        (t.memoizedState = c.state !== null && c.state !== void 0 ? c.state : null),
        (c.updater = _c),
        (t.stateNode = c),
        (c._reactInternals = t),
        (c = t.stateNode),
        (c.props = n),
        (c.state = t.memoizedState),
        (c.refs = {}),
        $o(t),
        (_ = a.contextType),
        (c.context = typeof _ == 'object' && _ !== null ? gt(_) : cn),
        (c.state = t.memoizedState),
        (_ = a.getDerivedStateFromProps),
        typeof _ == 'function' && (mc(t, a, _, n), (c.state = t.memoizedState)),
        typeof a.getDerivedStateFromProps == 'function' ||
          typeof c.getSnapshotBeforeUpdate == 'function' ||
          (typeof c.UNSAFE_componentWillMount != 'function' &&
            typeof c.componentWillMount != 'function') ||
          ((_ = c.state),
          typeof c.componentWillMount == 'function' && c.componentWillMount(),
          typeof c.UNSAFE_componentWillMount == 'function' && c.UNSAFE_componentWillMount(),
          _ !== c.state && _c.enqueueReplaceState(c, c.state, null),
          gi(t, n, c, s),
          hi(),
          (c.state = t.memoizedState)),
        typeof c.componentDidMount == 'function' && (t.flags |= 4194308),
        (n = !0));
    } else if (e === null) {
      c = t.stateNode;
      var k = t.memoizedProps,
        j = Da(a, k);
      c.props = j;
      var z = c.context,
        G = a.contextType;
      ((_ = cn), typeof G == 'object' && G !== null && (_ = gt(G)));
      var Z = a.getDerivedStateFromProps;
      ((G = typeof Z == 'function' || typeof c.getSnapshotBeforeUpdate == 'function'),
        (k = t.pendingProps !== k),
        G ||
          (typeof c.UNSAFE_componentWillReceiveProps != 'function' &&
            typeof c.componentWillReceiveProps != 'function') ||
          ((k || z !== _) && y_(t, c, n, _)),
        (ta = !1));
      var H = t.memoizedState;
      ((c.state = H),
        gi(t, n, c, s),
        hi(),
        (z = t.memoizedState),
        k || H !== z || ta
          ? (typeof Z == 'function' && (mc(t, a, Z, n), (z = t.memoizedState)),
            (j = ta || v_(t, a, j, n, H, z, _))
              ? (G ||
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
            (c.context = _),
            (n = j))
          : (typeof c.componentDidMount == 'function' && (t.flags |= 4194308), (n = !1)));
    } else {
      ((c = t.stateNode),
        Go(e, t),
        (_ = t.memoizedProps),
        (G = Da(a, _)),
        (c.props = G),
        (Z = t.pendingProps),
        (H = c.context),
        (z = a.contextType),
        (j = cn),
        typeof z == 'object' && z !== null && (j = gt(z)),
        (k = a.getDerivedStateFromProps),
        (z = typeof k == 'function' || typeof c.getSnapshotBeforeUpdate == 'function') ||
          (typeof c.UNSAFE_componentWillReceiveProps != 'function' &&
            typeof c.componentWillReceiveProps != 'function') ||
          ((_ !== Z || H !== j) && y_(t, c, n, j)),
        (ta = !1),
        (H = t.memoizedState),
        (c.state = H),
        gi(t, n, c, s),
        hi());
      var U = t.memoizedState;
      _ !== Z || H !== U || ta || (e !== null && e.dependencies !== null && Cs(e.dependencies))
        ? (typeof k == 'function' && (mc(t, a, k, n), (U = t.memoizedState)),
          (G =
            ta ||
            v_(t, a, G, n, H, U, j) ||
            (e !== null && e.dependencies !== null && Cs(e.dependencies)))
            ? (z ||
                (typeof c.UNSAFE_componentWillUpdate != 'function' &&
                  typeof c.componentWillUpdate != 'function') ||
                (typeof c.componentWillUpdate == 'function' && c.componentWillUpdate(n, U, j),
                typeof c.UNSAFE_componentWillUpdate == 'function' &&
                  c.UNSAFE_componentWillUpdate(n, U, j)),
              typeof c.componentDidUpdate == 'function' && (t.flags |= 4),
              typeof c.getSnapshotBeforeUpdate == 'function' && (t.flags |= 1024))
            : (typeof c.componentDidUpdate != 'function' ||
                (_ === e.memoizedProps && H === e.memoizedState) ||
                (t.flags |= 4),
              typeof c.getSnapshotBeforeUpdate != 'function' ||
                (_ === e.memoizedProps && H === e.memoizedState) ||
                (t.flags |= 1024),
              (t.memoizedProps = n),
              (t.memoizedState = U)),
          (c.props = n),
          (c.state = U),
          (c.context = j),
          (n = G))
        : (typeof c.componentDidUpdate != 'function' ||
            (_ === e.memoizedProps && H === e.memoizedState) ||
            (t.flags |= 4),
          typeof c.getSnapshotBeforeUpdate != 'function' ||
            (_ === e.memoizedProps && H === e.memoizedState) ||
            (t.flags |= 1024),
          (n = !1));
    }
    return (
      (c = n),
      Ks(e, t),
      (n = (t.flags & 128) !== 0),
      c || n
        ? ((c = t.stateNode),
          (a = n && typeof a.getDerivedStateFromError != 'function' ? null : c.render()),
          (t.flags |= 1),
          e !== null && n
            ? ((t.child = Ia(t, e.child, null, s)), (t.child = Ia(t, null, a, s)))
            : kt(e, t, a, s),
          (t.memoizedState = c.state),
          (e = t.child))
        : (e = ql(e, t, s)),
      e
    );
  }
  function I_(e, t, a, n) {
    return (Ca(), (t.flags |= 256), kt(e, t, a, n), t.child);
  }
  var gc = { dehydrated: null, treeContext: null, retryLane: 0, hydrationErrors: null };
  function kc(e) {
    return { baseLanes: e, cachePool: wm() };
  }
  function vc(e, t, a) {
    return ((e = e !== null ? e.childLanes & ~a : 0), t && (e |= Rt), e);
  }
  function M_(e, t, a) {
    var n = t.pendingProps,
      s = !1,
      c = (t.flags & 128) !== 0,
      _;
    if (
      ((_ = c) || (_ = e !== null && e.memoizedState === null ? !1 : (at.current & 2) !== 0),
      _ && ((s = !0), (t.flags &= -129)),
      (_ = (t.flags & 32) !== 0),
      (t.flags &= -33),
      e === null)
    ) {
      if (Ae) {
        if (
          (s ? na(t) : ia(),
          (e = Ve)
            ? ((e = Xf(e, Kt)),
              (e = e !== null && e.data !== '&' ? e : null),
              e !== null &&
                ((t.memoizedState = {
                  dehydrated: e,
                  treeContext: Pl !== null ? { id: fl, overflow: pl } : null,
                  retryLane: 536870912,
                  hydrationErrors: null,
                }),
                (a = pm(e)),
                (a.return = t),
                (t.child = a),
                (ht = t),
                (Ve = null)))
            : (e = null),
          e === null)
        )
          throw Wl(t);
        return (tu(e) ? (t.lanes = 32) : (t.lanes = 536870912), null);
      }
      var k = n.children;
      return (
        (n = n.fallback),
        s
          ? (ia(),
            (s = t.mode),
            (k = Zs({ mode: 'hidden', children: k }, s)),
            (n = Ea(n, s, a, null)),
            (k.return = t),
            (n.return = t),
            (k.sibling = n),
            (t.child = k),
            (n = t.child),
            (n.memoizedState = kc(a)),
            (n.childLanes = vc(e, _, a)),
            (t.memoizedState = gc),
            xi(null, n))
          : (na(t), yc(t, k))
      );
    }
    var j = e.memoizedState;
    if (j !== null && ((k = j.dehydrated), k !== null)) {
      if (c)
        t.flags & 256
          ? (na(t), (t.flags &= -257), (t = bc(e, t, a)))
          : t.memoizedState !== null
            ? (ia(), (t.child = e.child), (t.flags |= 128), (t = null))
            : (ia(),
              (k = n.fallback),
              (s = t.mode),
              (n = Zs({ mode: 'visible', children: n.children }, s)),
              (k = Ea(k, s, a, null)),
              (k.flags |= 2),
              (n.return = t),
              (k.return = t),
              (n.sibling = k),
              (t.child = n),
              Ia(t, e.child, null, a),
              (n = t.child),
              (n.memoizedState = kc(a)),
              (n.childLanes = vc(e, _, a)),
              (t.memoizedState = gc),
              (t = xi(null, n)));
      else if ((na(t), tu(k))) {
        if (((_ = k.nextSibling && k.nextSibling.dataset), _)) var z = _.dgst;
        ((_ = z),
          (n = Error(r(419))),
          (n.stack = ''),
          (n.digest = _),
          ui({ value: n, source: null, stack: null }),
          (t = bc(e, t, a)));
      } else if ((rt || _n(e, t, a, !1), (_ = (a & e.childLanes) !== 0), rt || _)) {
        if (((_ = Ye), _ !== null && ((n = xd(_, a)), n !== 0 && n !== j.retryLane)))
          throw ((j.retryLane = n), Na(e, n), At(_, e, n), pc);
        (eu(k) || nr(), (t = bc(e, t, a)));
      } else
        eu(k)
          ? ((t.flags |= 192), (t.child = e.child), (t = null))
          : ((e = j.treeContext),
            (Ve = Jt(k.nextSibling)),
            (ht = t),
            (Ae = !0),
            (Fl = null),
            (Kt = !1),
            e !== null && km(t, e),
            (t = yc(t, n.children)),
            (t.flags |= 4096));
      return t;
    }
    return s
      ? (ia(),
        (k = n.fallback),
        (s = t.mode),
        (j = e.child),
        (z = j.sibling),
        (n = jl(j, { mode: 'hidden', children: n.children })),
        (n.subtreeFlags = j.subtreeFlags & 65011712),
        z !== null ? (k = jl(z, k)) : ((k = Ea(k, s, a, null)), (k.flags |= 2)),
        (k.return = t),
        (n.return = t),
        (n.sibling = k),
        (t.child = n),
        xi(null, n),
        (n = t.child),
        (k = e.child.memoizedState),
        k === null
          ? (k = kc(a))
          : ((s = k.cachePool),
            s !== null
              ? ((j = it._currentValue), (s = s.parent !== j ? { parent: j, pool: j } : s))
              : (s = wm()),
            (k = { baseLanes: k.baseLanes | a, cachePool: s })),
        (n.memoizedState = k),
        (n.childLanes = vc(e, _, a)),
        (t.memoizedState = gc),
        xi(e.child, n))
      : (na(t),
        (a = e.child),
        (e = a.sibling),
        (a = jl(a, { mode: 'visible', children: n.children })),
        (a.return = t),
        (a.sibling = null),
        e !== null &&
          ((_ = t.deletions), _ === null ? ((t.deletions = [e]), (t.flags |= 16)) : _.push(e)),
        (t.child = a),
        (t.memoizedState = null),
        a);
  }
  function yc(e, t) {
    return ((t = Zs({ mode: 'visible', children: t }, e.mode)), (t.return = e), (e.child = t));
  }
  function Zs(e, t) {
    return ((e = Ot(22, e, null, t)), (e.lanes = 0), e);
  }
  function bc(e, t, a) {
    return (
      Ia(t, e.child, null, a),
      (e = yc(t, t.pendingProps.children)),
      (e.flags |= 2),
      (t.memoizedState = null),
      e
    );
  }
  function D_(e, t, a) {
    e.lanes |= t;
    var n = e.alternate;
    (n !== null && (n.lanes |= t), Mo(e.return, t, a));
  }
  function xc(e, t, a, n, s, c) {
    var _ = e.memoizedState;
    _ === null
      ? (e.memoizedState = {
          isBackwards: t,
          rendering: null,
          renderingStartTime: 0,
          last: n,
          tail: a,
          tailMode: s,
          treeForkCount: c,
        })
      : ((_.isBackwards = t),
        (_.rendering = null),
        (_.renderingStartTime = 0),
        (_.last = n),
        (_.tail = a),
        (_.tailMode = s),
        (_.treeForkCount = c));
  }
  function R_(e, t, a) {
    var n = t.pendingProps,
      s = n.revealOrder,
      c = n.tail;
    n = n.children;
    var _ = at.current,
      k = (_ & 2) !== 0;
    if (
      (k ? ((_ = (_ & 1) | 2), (t.flags |= 128)) : (_ &= 1),
      X(at, _),
      kt(e, t, n, a),
      (n = Ae ? ci : 0),
      !k && e !== null && (e.flags & 128) !== 0)
    )
      e: for (e = t.child; e !== null; ) {
        if (e.tag === 13) e.memoizedState !== null && D_(e, a, t);
        else if (e.tag === 19) D_(e, a, t);
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
          ((e = a.alternate), e !== null && Ds(e) === null && (s = a), (a = a.sibling));
        ((a = s),
          a === null ? ((s = t.child), (t.child = null)) : ((s = a.sibling), (a.sibling = null)),
          xc(t, !1, s, a, c, n));
        break;
      case 'backwards':
      case 'unstable_legacy-backwards':
        for (a = null, s = t.child, t.child = null; s !== null; ) {
          if (((e = s.alternate), e !== null && Ds(e) === null)) {
            t.child = s;
            break;
          }
          ((e = s.sibling), (s.sibling = a), (a = s), (s = e));
        }
        xc(t, !0, a, null, c, n);
        break;
      case 'together':
        xc(t, !1, null, null, void 0, n);
        break;
      default:
        t.memoizedState = null;
    }
    return t.child;
  }
  function ql(e, t, a) {
    if (
      (e !== null && (t.dependencies = e.dependencies), (oa |= t.lanes), (a & t.childLanes) === 0)
    )
      if (e !== null) {
        if ((_n(e, t, a, !1), (a & t.childLanes) === 0)) return null;
      } else return null;
    if (e !== null && t.child !== e.child) throw Error(r(153));
    if (t.child !== null) {
      for (e = t.child, a = jl(e, e.pendingProps), t.child = a, a.return = t; e.sibling !== null; )
        ((e = e.sibling), (a = a.sibling = jl(e, e.pendingProps)), (a.return = t));
      a.sibling = null;
    }
    return t.child;
  }
  function Sc(e, t) {
    return (e.lanes & t) !== 0 ? !0 : ((e = e.dependencies), !!(e !== null && Cs(e)));
  }
  function Xk(e, t, a) {
    switch (t.tag) {
      case 3:
        (Le(t, t.stateNode.containerInfo), ea(t, it, e.memoizedState.cache), Ca());
        break;
      case 27:
      case 5:
        tl(t);
        break;
      case 4:
        Le(t, t.stateNode.containerInfo);
        break;
      case 10:
        ea(t, t.type, t.memoizedProps.value);
        break;
      case 31:
        if (t.memoizedState !== null) return ((t.flags |= 128), Ko(t), null);
        break;
      case 13:
        var n = t.memoizedState;
        if (n !== null)
          return n.dehydrated !== null
            ? (na(t), (t.flags |= 128), null)
            : (a & t.child.childLanes) !== 0
              ? M_(e, t, a)
              : (na(t), (e = ql(e, t, a)), e !== null ? e.sibling : null);
        na(t);
        break;
      case 19:
        var s = (e.flags & 128) !== 0;
        if (
          ((n = (a & t.childLanes) !== 0),
          n || (_n(e, t, a, !1), (n = (a & t.childLanes) !== 0)),
          s)
        ) {
          if (n) return R_(e, t, a);
          t.flags |= 128;
        }
        if (
          ((s = t.memoizedState),
          s !== null && ((s.rendering = null), (s.tail = null), (s.lastEffect = null)),
          X(at, at.current),
          n)
        )
          break;
        return null;
      case 22:
        return ((t.lanes = 0), A_(e, t, a, t.pendingProps));
      case 24:
        ea(t, it, e.memoizedState.cache);
    }
    return ql(e, t, a);
  }
  function z_(e, t, a) {
    if (e !== null)
      if (e.memoizedProps !== t.pendingProps) rt = !0;
      else {
        if (!Sc(e, a) && (t.flags & 128) === 0) return ((rt = !1), Xk(e, t, a));
        rt = (e.flags & 131072) !== 0;
      }
    else ((rt = !1), Ae && (t.flags & 1048576) !== 0 && gm(t, ci, t.index));
    switch (((t.lanes = 0), t.tag)) {
      case 16:
        e: {
          var n = t.pendingProps;
          if (((e = Ba(t.elementType)), (t.type = e), typeof e == 'function'))
            Eo(e)
              ? ((n = Da(e, n)), (t.tag = 1), (t = O_(null, t, e, n, a)))
              : ((t.tag = 0), (t = hc(null, t, e, n, a)));
          else {
            if (e != null) {
              var s = e.$$typeof;
              if (s === D) {
                ((t.tag = 11), (t = N_(null, t, e, n, a)));
                break e;
              } else if (s === T) {
                ((t.tag = 14), (t = E_(null, t, e, n, a)));
                break e;
              }
            }
            throw ((t = xe(e) || e), Error(r(306, t, '')));
          }
        }
        return t;
      case 0:
        return hc(e, t, t.type, t.pendingProps, a);
      case 1:
        return ((n = t.type), (s = Da(n, t.pendingProps)), O_(e, t, n, s, a));
      case 3:
        e: {
          if ((Le(t, t.stateNode.containerInfo), e === null)) throw Error(r(387));
          n = t.pendingProps;
          var c = t.memoizedState;
          ((s = c.element), Go(e, t), gi(t, n, null, a));
          var _ = t.memoizedState;
          if (
            ((n = _.cache),
            ea(t, it, n),
            n !== c.cache && Do(t, [it], a, !0),
            hi(),
            (n = _.element),
            c.isDehydrated)
          )
            if (
              ((c = { element: n, isDehydrated: !1, cache: _.cache }),
              (t.updateQueue.baseState = c),
              (t.memoizedState = c),
              t.flags & 256)
            ) {
              t = I_(e, t, n, a);
              break e;
            } else if (n !== s) {
              ((s = Xt(Error(r(424)), t)), ui(s), (t = I_(e, t, n, a)));
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
                Ve = Jt(e.firstChild),
                  ht = t,
                  Ae = !0,
                  Fl = null,
                  Kt = !0,
                  a = Am(t, null, n, a),
                  t.child = a;
                a;
              )
                ((a.flags = (a.flags & -3) | 4096), (a = a.sibling));
            }
          else {
            if ((Ca(), n === s)) {
              t = ql(e, t, a);
              break e;
            }
            kt(e, t, n, a);
          }
          t = t.child;
        }
        return t;
      case 26:
        return (
          Ks(e, t),
          e === null
            ? (a = Pf(t.type, null, t.pendingProps, null))
              ? (t.memoizedState = a)
              : Ae ||
                ((a = t.type),
                (e = t.pendingProps),
                (n = dr(me.current).createElement(a)),
                (n[pt] = t),
                (n[wt] = e),
                vt(n, a, e),
                ut(n),
                (t.stateNode = n))
            : (t.memoizedState = Pf(t.type, e.memoizedProps, t.pendingProps, e.memoizedState)),
          null
        );
      case 27:
        return (
          tl(t),
          e === null &&
            Ae &&
            ((n = t.stateNode = Kf(t.type, t.pendingProps, me.current)),
            (ht = t),
            (Kt = !0),
            (s = Ve),
            _a(t.type) ? ((lu = s), (Ve = Jt(n.firstChild))) : (Ve = s)),
          kt(e, t, t.pendingProps.children, a),
          Ks(e, t),
          e === null && (t.flags |= 4194304),
          t.child
        );
      case 5:
        return (
          e === null &&
            Ae &&
            ((s = n = Ve) &&
              ((n = bv(n, t.type, t.pendingProps, Kt)),
              n !== null
                ? ((t.stateNode = n), (ht = t), (Ve = Jt(n.firstChild)), (Kt = !1), (s = !0))
                : (s = !1)),
            s || Wl(t)),
          tl(t),
          (s = t.type),
          (c = t.pendingProps),
          (_ = e !== null ? e.memoizedProps : null),
          (n = c.children),
          Pc(s, c) ? (n = null) : _ !== null && Pc(s, _) && (t.flags |= 32),
          t.memoizedState !== null && ((s = Jo(e, t, Mk, null, null, a)), (Di._currentValue = s)),
          Ks(e, t),
          kt(e, t, n, a),
          t.child
        );
      case 6:
        return (
          e === null &&
            Ae &&
            ((e = a = Ve) &&
              ((a = xv(a, t.pendingProps, Kt)),
              a !== null ? ((t.stateNode = a), (ht = t), (Ve = null), (e = !0)) : (e = !1)),
            e || Wl(t)),
          null
        );
      case 13:
        return M_(e, t, a);
      case 4:
        return (
          Le(t, t.stateNode.containerInfo),
          (n = t.pendingProps),
          e === null ? (t.child = Ia(t, null, n, a)) : kt(e, t, n, a),
          t.child
        );
      case 11:
        return N_(e, t, t.type, t.pendingProps, a);
      case 7:
        return (kt(e, t, t.pendingProps, a), t.child);
      case 8:
        return (kt(e, t, t.pendingProps.children, a), t.child);
      case 12:
        return (kt(e, t, t.pendingProps.children, a), t.child);
      case 10:
        return ((n = t.pendingProps), ea(t, t.type, n.value), kt(e, t, n.children, a), t.child);
      case 9:
        return (
          (s = t.type._context),
          (n = t.pendingProps.children),
          La(t),
          (s = gt(s)),
          (n = n(s)),
          (t.flags |= 1),
          kt(e, t, n, a),
          t.child
        );
      case 14:
        return E_(e, t, t.type, t.pendingProps, a);
      case 15:
        return C_(e, t, t.type, t.pendingProps, a);
      case 19:
        return R_(e, t, a);
      case 31:
        return Yk(e, t, a);
      case 22:
        return A_(e, t, a, t.pendingProps);
      case 24:
        return (
          La(t),
          (n = gt(it)),
          e === null
            ? ((s = Ho()),
              s === null &&
                ((s = Ye),
                (c = Ro()),
                (s.pooledCache = c),
                c.refCount++,
                c !== null && (s.pooledCacheLanes |= a),
                (s = c)),
              (t.memoizedState = { parent: n, cache: s }),
              $o(t),
              ea(t, it, s))
            : ((e.lanes & a) !== 0 && (Go(e, t), gi(t, null, null, a), hi()),
              (s = e.memoizedState),
              (c = t.memoizedState),
              s.parent !== n
                ? ((s = { parent: n, cache: n }),
                  (t.memoizedState = s),
                  t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = s),
                  ea(t, it, n))
                : ((n = c.cache), ea(t, it, n), n !== s.cache && Do(t, [it], a, !0))),
          kt(e, t, t.pendingProps.children, a),
          t.child
        );
      case 29:
        throw t.pendingProps;
    }
    throw Error(r(156, t.tag));
  }
  function Bl(e) {
    e.flags |= 4;
  }
  function wc(e, t, a, n, s) {
    if (((t = (e.mode & 32) !== 0) && (t = !1), t)) {
      if (((e.flags |= 16777216), (s & 335544128) === s))
        if (e.stateNode.complete) e.flags |= 8192;
        else if (_f()) e.flags |= 8192;
        else throw ((Oa = Bs), Uo);
    } else e.flags &= -16777217;
  }
  function H_(e, t) {
    if (t.type !== 'stylesheet' || (t.state.loading & 4) !== 0) e.flags &= -16777217;
    else if (((e.flags |= 16777216), !lp(t)))
      if (_f()) e.flags |= 8192;
      else throw ((Oa = Bs), Uo);
  }
  function Js(e, t) {
    (t !== null && (e.flags |= 4),
      e.flags & 16384 && ((t = e.tag !== 22 ? vd() : 536870912), (e.lanes |= t), (Tn |= t)));
  }
  function Si(e, t) {
    if (!Ae)
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
  function Qe(e) {
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
  function Vk(e, t, a) {
    var n = t.pendingProps;
    switch ((qo(t), t.tag)) {
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return (Qe(t), null);
      case 1:
        return (Qe(t), null);
      case 3:
        return (
          (a = t.stateNode),
          (n = null),
          e !== null && (n = e.memoizedState.cache),
          t.memoizedState.cache !== n && (t.flags |= 2048),
          Cl(it),
          Me(),
          a.pendingContext && ((a.context = a.pendingContext), (a.pendingContext = null)),
          (e === null || e.child === null) &&
            (mn(t)
              ? Bl(t)
              : e === null ||
                (e.memoizedState.isDehydrated && (t.flags & 256) === 0) ||
                ((t.flags |= 1024), Oo())),
          Qe(t),
          null
        );
      case 26:
        var s = t.type,
          c = t.memoizedState;
        return (
          e === null
            ? (Bl(t), c !== null ? (Qe(t), H_(t, c)) : (Qe(t), wc(t, s, null, n, a)))
            : c
              ? c !== e.memoizedState
                ? (Bl(t), Qe(t), H_(t, c))
                : (Qe(t), (t.flags &= -16777217))
              : ((e = e.memoizedProps), e !== n && Bl(t), Qe(t), wc(t, s, e, n, a)),
          null
        );
      case 27:
        if ((yl(t), (a = me.current), (s = t.type), e !== null && t.stateNode != null))
          e.memoizedProps !== n && Bl(t);
        else {
          if (!n) {
            if (t.stateNode === null) throw Error(r(166));
            return (Qe(t), null);
          }
          ((e = F.current), mn(t) ? vm(t) : ((e = Kf(s, n, a)), (t.stateNode = e), Bl(t)));
        }
        return (Qe(t), null);
      case 5:
        if ((yl(t), (s = t.type), e !== null && t.stateNode != null))
          e.memoizedProps !== n && Bl(t);
        else {
          if (!n) {
            if (t.stateNode === null) throw Error(r(166));
            return (Qe(t), null);
          }
          if (((c = F.current), mn(t))) vm(t);
          else {
            var _ = dr(me.current);
            switch (c) {
              case 1:
                c = _.createElementNS('http://www.w3.org/2000/svg', s);
                break;
              case 2:
                c = _.createElementNS('http://www.w3.org/1998/Math/MathML', s);
                break;
              default:
                switch (s) {
                  case 'svg':
                    c = _.createElementNS('http://www.w3.org/2000/svg', s);
                    break;
                  case 'math':
                    c = _.createElementNS('http://www.w3.org/1998/Math/MathML', s);
                    break;
                  case 'script':
                    ((c = _.createElement('div')),
                      (c.innerHTML = '<script><\/script>'),
                      (c = c.removeChild(c.firstChild)));
                    break;
                  case 'select':
                    ((c =
                      typeof n.is == 'string'
                        ? _.createElement('select', { is: n.is })
                        : _.createElement('select')),
                      n.multiple ? (c.multiple = !0) : n.size && (c.size = n.size));
                    break;
                  default:
                    c =
                      typeof n.is == 'string'
                        ? _.createElement(s, { is: n.is })
                        : _.createElement(s);
                }
            }
            ((c[pt] = t), (c[wt] = n));
            e: for (_ = t.child; _ !== null; ) {
              if (_.tag === 5 || _.tag === 6) c.appendChild(_.stateNode);
              else if (_.tag !== 4 && _.tag !== 27 && _.child !== null) {
                ((_.child.return = _), (_ = _.child));
                continue;
              }
              if (_ === t) break e;
              for (; _.sibling === null; ) {
                if (_.return === null || _.return === t) break e;
                _ = _.return;
              }
              ((_.sibling.return = _.return), (_ = _.sibling));
            }
            t.stateNode = c;
            e: switch ((vt(c, s, n), s)) {
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
            n && Bl(t);
          }
        }
        return (Qe(t), wc(t, t.type, e === null ? null : e.memoizedProps, t.pendingProps, a), null);
      case 6:
        if (e && t.stateNode != null) e.memoizedProps !== n && Bl(t);
        else {
          if (typeof n != 'string' && t.stateNode === null) throw Error(r(166));
          if (((e = me.current), mn(t))) {
            if (((e = t.stateNode), (a = t.memoizedProps), (n = null), (s = ht), s !== null))
              switch (s.tag) {
                case 27:
                case 5:
                  n = s.memoizedProps;
              }
            ((e[pt] = t),
              (e = !!(
                e.nodeValue === a ||
                (n !== null && n.suppressHydrationWarning === !0) ||
                Df(e.nodeValue, a)
              )),
              e || Wl(t, !0));
          } else ((e = dr(e).createTextNode(n)), (e[pt] = t), (t.stateNode = e));
        }
        return (Qe(t), null);
      case 31:
        if (((a = t.memoizedState), e === null || e.memoizedState !== null)) {
          if (((n = mn(t)), a !== null)) {
            if (e === null) {
              if (!n) throw Error(r(318));
              if (((e = t.memoizedState), (e = e !== null ? e.dehydrated : null), !e))
                throw Error(r(557));
              e[pt] = t;
            } else (Ca(), (t.flags & 128) === 0 && (t.memoizedState = null), (t.flags |= 4));
            (Qe(t), (e = !1));
          } else
            ((a = Oo()),
              e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = a),
              (e = !0));
          if (!e) return t.flags & 256 ? (Mt(t), t) : (Mt(t), null);
          if ((t.flags & 128) !== 0) throw Error(r(558));
        }
        return (Qe(t), null);
      case 13:
        if (
          ((n = t.memoizedState),
          e === null || (e.memoizedState !== null && e.memoizedState.dehydrated !== null))
        ) {
          if (((s = mn(t)), n !== null && n.dehydrated !== null)) {
            if (e === null) {
              if (!s) throw Error(r(318));
              if (((s = t.memoizedState), (s = s !== null ? s.dehydrated : null), !s))
                throw Error(r(317));
              s[pt] = t;
            } else (Ca(), (t.flags & 128) === 0 && (t.memoizedState = null), (t.flags |= 4));
            (Qe(t), (s = !1));
          } else
            ((s = Oo()),
              e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = s),
              (s = !0));
          if (!s) return t.flags & 256 ? (Mt(t), t) : (Mt(t), null);
        }
        return (
          Mt(t),
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
                (c = null),
                n.memoizedState !== null &&
                  n.memoizedState.cachePool !== null &&
                  (c = n.memoizedState.cachePool.pool),
                c !== s && (n.flags |= 2048)),
              a !== e && a && (t.child.flags |= 8192),
              Js(t, t.updateQueue),
              Qe(t),
              null)
        );
      case 4:
        return (Me(), e === null && Vc(t.stateNode.containerInfo), Qe(t), null);
      case 10:
        return (Cl(t.type), Qe(t), null);
      case 19:
        if ((N(at), (n = t.memoizedState), n === null)) return (Qe(t), null);
        if (((s = (t.flags & 128) !== 0), (c = n.rendering), c === null))
          if (s) Si(n, !1);
          else {
            if (tt !== 0 || (e !== null && (e.flags & 128) !== 0))
              for (e = t.child; e !== null; ) {
                if (((c = Ds(e)), c !== null)) {
                  for (
                    t.flags |= 128,
                      Si(n, !1),
                      e = c.updateQueue,
                      t.updateQueue = e,
                      Js(t, e),
                      t.subtreeFlags = 0,
                      e = a,
                      a = t.child;
                    a !== null;
                  )
                    (fm(a, e), (a = a.sibling));
                  return (X(at, (at.current & 1) | 2), Ae && Nl(t, n.treeForkCount), t.child);
                }
                e = e.sibling;
              }
            n.tail !== null &&
              bt() > tr &&
              ((t.flags |= 128), (s = !0), Si(n, !1), (t.lanes = 4194304));
          }
        else {
          if (!s)
            if (((e = Ds(c)), e !== null)) {
              if (
                ((t.flags |= 128),
                (s = !0),
                (e = e.updateQueue),
                (t.updateQueue = e),
                Js(t, e),
                Si(n, !0),
                n.tail === null && n.tailMode === 'hidden' && !c.alternate && !Ae)
              )
                return (Qe(t), null);
            } else
              2 * bt() - n.renderingStartTime > tr &&
                a !== 536870912 &&
                ((t.flags |= 128), (s = !0), Si(n, !1), (t.lanes = 4194304));
          n.isBackwards
            ? ((c.sibling = t.child), (t.child = c))
            : ((e = n.last), e !== null ? (e.sibling = c) : (t.child = c), (n.last = c));
        }
        return n.tail !== null
          ? ((e = n.tail),
            (n.rendering = e),
            (n.tail = e.sibling),
            (n.renderingStartTime = bt()),
            (e.sibling = null),
            (a = at.current),
            X(at, s ? (a & 1) | 2 : a & 1),
            Ae && Nl(t, n.treeForkCount),
            e)
          : (Qe(t), null);
      case 22:
      case 23:
        return (
          Mt(t),
          Qo(),
          (n = t.memoizedState !== null),
          e !== null
            ? (e.memoizedState !== null) !== n && (t.flags |= 8192)
            : n && (t.flags |= 8192),
          n
            ? (a & 536870912) !== 0 &&
              (t.flags & 128) === 0 &&
              (Qe(t), t.subtreeFlags & 6 && (t.flags |= 8192))
            : Qe(t),
          (a = t.updateQueue),
          a !== null && Js(t, a.retryQueue),
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
          e !== null && N(qa),
          null
        );
      case 24:
        return (
          (a = null),
          e !== null && (a = e.memoizedState.cache),
          t.memoizedState.cache !== a && (t.flags |= 2048),
          Cl(it),
          Qe(t),
          null
        );
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(r(156, t.tag));
  }
  function Qk(e, t) {
    switch ((qo(t), t.tag)) {
      case 1:
        return ((e = t.flags), e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null);
      case 3:
        return (
          Cl(it),
          Me(),
          (e = t.flags),
          (e & 65536) !== 0 && (e & 128) === 0 ? ((t.flags = (e & -65537) | 128), t) : null
        );
      case 26:
      case 27:
      case 5:
        return (yl(t), null);
      case 31:
        if (t.memoizedState !== null) {
          if ((Mt(t), t.alternate === null)) throw Error(r(340));
          Ca();
        }
        return ((e = t.flags), e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null);
      case 13:
        if ((Mt(t), (e = t.memoizedState), e !== null && e.dehydrated !== null)) {
          if (t.alternate === null) throw Error(r(340));
          Ca();
        }
        return ((e = t.flags), e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null);
      case 19:
        return (N(at), null);
      case 4:
        return (Me(), null);
      case 10:
        return (Cl(t.type), null);
      case 22:
      case 23:
        return (
          Mt(t),
          Qo(),
          e !== null && N(qa),
          (e = t.flags),
          e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
        );
      case 24:
        return (Cl(it), null);
      case 25:
        return null;
      default:
        return null;
    }
  }
  function U_(e, t) {
    switch ((qo(t), t.tag)) {
      case 3:
        (Cl(it), Me());
        break;
      case 26:
      case 27:
      case 5:
        yl(t);
        break;
      case 4:
        Me();
        break;
      case 31:
        t.memoizedState !== null && Mt(t);
        break;
      case 13:
        Mt(t);
        break;
      case 19:
        N(at);
        break;
      case 10:
        Cl(t.type);
        break;
      case 22:
      case 23:
        (Mt(t), Qo(), e !== null && N(qa));
        break;
      case 24:
        Cl(it);
    }
  }
  function wi(e, t) {
    try {
      var a = t.updateQueue,
        n = a !== null ? a.lastEffect : null;
      if (n !== null) {
        var s = n.next;
        a = s;
        do {
          if ((a.tag & e) === e) {
            n = void 0;
            var c = a.create,
              _ = a.inst;
            ((n = c()), (_.destroy = n));
          }
          a = a.next;
        } while (a !== s);
      }
    } catch (k) {
      Re(t, t.return, k);
    }
  }
  function sa(e, t, a) {
    try {
      var n = t.updateQueue,
        s = n !== null ? n.lastEffect : null;
      if (s !== null) {
        var c = s.next;
        n = c;
        do {
          if ((n.tag & e) === e) {
            var _ = n.inst,
              k = _.destroy;
            if (k !== void 0) {
              ((_.destroy = void 0), (s = t));
              var j = a,
                z = k;
              try {
                z();
              } catch (G) {
                Re(s, j, G);
              }
            }
          }
          n = n.next;
        } while (n !== c);
      }
    } catch (G) {
      Re(t, t.return, G);
    }
  }
  function $_(e) {
    var t = e.updateQueue;
    if (t !== null) {
      var a = e.stateNode;
      try {
        qm(t, a);
      } catch (n) {
        Re(e, e.return, n);
      }
    }
  }
  function G_(e, t, a) {
    ((a.props = Da(e.type, e.memoizedProps)), (a.state = e.memoizedState));
    try {
      a.componentWillUnmount();
    } catch (n) {
      Re(e, t, n);
    }
  }
  function Ti(e, t) {
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
      Re(e, t, s);
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
          Re(e, t, s);
        } finally {
          ((e.refCleanup = null), (e = e.alternate), e != null && (e.refCleanup = null));
        }
      else if (typeof a == 'function')
        try {
          a(null);
        } catch (s) {
          Re(e, t, s);
        }
      else a.current = null;
  }
  function Y_(e) {
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
      Re(e, e.return, s);
    }
  }
  function Tc(e, t, a) {
    try {
      var n = e.stateNode;
      (pv(n, e.type, a, t), (n[wt] = t));
    } catch (s) {
      Re(e, e.return, s);
    }
  }
  function X_(e) {
    return (
      e.tag === 5 || e.tag === 3 || e.tag === 26 || (e.tag === 27 && _a(e.type)) || e.tag === 4
    );
  }
  function jc(e) {
    e: for (;;) {
      for (; e.sibling === null; ) {
        if (e.return === null || X_(e.return)) return null;
        e = e.return;
      }
      for (
        e.sibling.return = e.return, e = e.sibling;
        e.tag !== 5 && e.tag !== 6 && e.tag !== 18;
      ) {
        if ((e.tag === 27 && _a(e.type)) || e.flags & 2 || e.child === null || e.tag === 4)
          continue e;
        ((e.child.return = e), (e = e.child));
      }
      if (!(e.flags & 2)) return e.stateNode;
    }
  }
  function Nc(e, t, a) {
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
            a != null || t.onclick !== null || (t.onclick = wl)));
    else if (
      n !== 4 &&
      (n === 27 && _a(e.type) && ((a = e.stateNode), (t = null)), (e = e.child), e !== null)
    )
      for (Nc(e, t, a), e = e.sibling; e !== null; ) (Nc(e, t, a), (e = e.sibling));
  }
  function Ps(e, t, a) {
    var n = e.tag;
    if (n === 5 || n === 6) ((e = e.stateNode), t ? a.insertBefore(e, t) : a.appendChild(e));
    else if (n !== 4 && (n === 27 && _a(e.type) && (a = e.stateNode), (e = e.child), e !== null))
      for (Ps(e, t, a), e = e.sibling; e !== null; ) (Ps(e, t, a), (e = e.sibling));
  }
  function V_(e) {
    var t = e.stateNode,
      a = e.memoizedProps;
    try {
      for (var n = e.type, s = t.attributes; s.length; ) t.removeAttributeNode(s[0]);
      (vt(t, n, a), (t[pt] = e), (t[wt] = a));
    } catch (c) {
      Re(e, e.return, c);
    }
  }
  var Ol = !1,
    ot = !1,
    Ec = !1,
    Q_ = typeof WeakSet == 'function' ? WeakSet : Set,
    dt = null;
  function Kk(e, t) {
    if (((e = e.containerInfo), (Zc = kr), (e = im(e)), bo(e))) {
      if ('selectionStart' in e) var a = { start: e.selectionStart, end: e.selectionEnd };
      else
        e: {
          a = ((a = e.ownerDocument) && a.defaultView) || window;
          var n = a.getSelection && a.getSelection();
          if (n && n.rangeCount !== 0) {
            a = n.anchorNode;
            var s = n.anchorOffset,
              c = n.focusNode;
            n = n.focusOffset;
            try {
              (a.nodeType, c.nodeType);
            } catch {
              a = null;
              break e;
            }
            var _ = 0,
              k = -1,
              j = -1,
              z = 0,
              G = 0,
              Z = e,
              H = null;
            t: for (;;) {
              for (
                var U;
                Z !== a || (s !== 0 && Z.nodeType !== 3) || (k = _ + s),
                  Z !== c || (n !== 0 && Z.nodeType !== 3) || (j = _ + n),
                  Z.nodeType === 3 && (_ += Z.nodeValue.length),
                  (U = Z.firstChild) !== null;
              )
                ((H = Z), (Z = U));
              for (;;) {
                if (Z === e) break t;
                if (
                  (H === a && ++z === s && (k = _),
                  H === c && ++G === n && (j = _),
                  (U = Z.nextSibling) !== null)
                )
                  break;
                ((Z = H), (H = Z.parentNode));
              }
              Z = U;
            }
            a = k === -1 || j === -1 ? null : { start: k, end: j };
          } else a = null;
        }
      a = a || { start: 0, end: 0 };
    } else a = null;
    for (Jc = { focusedElem: e, selectionRange: a }, kr = !1, dt = t; dt !== null; )
      if (((t = dt), (e = t.child), (t.subtreeFlags & 1028) !== 0 && e !== null))
        ((e.return = t), (dt = e));
      else
        for (; dt !== null; ) {
          switch (((t = dt), (c = t.alternate), (e = t.flags), t.tag)) {
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
              if ((e & 1024) !== 0 && c !== null) {
                ((e = void 0),
                  (a = t),
                  (s = c.memoizedProps),
                  (c = c.memoizedState),
                  (n = a.stateNode));
                try {
                  var oe = Da(a.type, s);
                  ((e = n.getSnapshotBeforeUpdate(oe, c)),
                    (n.__reactInternalSnapshotBeforeUpdate = e));
                } catch (ge) {
                  Re(a, a.return, ge);
                }
              }
              break;
            case 3:
              if ((e & 1024) !== 0) {
                if (((e = t.stateNode.containerInfo), (a = e.nodeType), a === 9)) Wc(e);
                else if (a === 1)
                  switch (e.nodeName) {
                    case 'HEAD':
                    case 'HTML':
                    case 'BODY':
                      Wc(e);
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
  function K_(e, t, a) {
    var n = a.flags;
    switch (a.tag) {
      case 0:
      case 11:
      case 15:
        (Ml(e, a), n & 4 && wi(5, a));
        break;
      case 1:
        if ((Ml(e, a), n & 4))
          if (((e = a.stateNode), t === null))
            try {
              e.componentDidMount();
            } catch (_) {
              Re(a, a.return, _);
            }
          else {
            var s = Da(a.type, t.memoizedProps);
            t = t.memoizedState;
            try {
              e.componentDidUpdate(s, t, e.__reactInternalSnapshotBeforeUpdate);
            } catch (_) {
              Re(a, a.return, _);
            }
          }
        (n & 64 && $_(a), n & 512 && Ti(a, a.return));
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
            qm(e, t);
          } catch (_) {
            Re(a, a.return, _);
          }
        }
        break;
      case 27:
        t === null && n & 4 && V_(a);
      case 26:
      case 5:
        (Ml(e, a), t === null && n & 4 && Y_(a), n & 512 && Ti(a, a.return));
        break;
      case 12:
        Ml(e, a);
        break;
      case 31:
        (Ml(e, a), n & 4 && P_(e, a));
        break;
      case 13:
        (Ml(e, a),
          n & 4 && F_(e, a),
          n & 64 &&
            ((e = a.memoizedState),
            e !== null && ((e = e.dehydrated), e !== null && ((a = av.bind(null, a)), Sv(e, a)))));
        break;
      case 22:
        if (((n = a.memoizedState !== null || Ol), !n)) {
          ((t = (t !== null && t.memoizedState !== null) || ot), (s = Ol));
          var c = ot;
          ((Ol = n),
            (ot = t) && !c ? Dl(e, a, (a.subtreeFlags & 8772) !== 0) : Ml(e, a),
            (Ol = s),
            (ot = c));
        }
        break;
      case 30:
        break;
      default:
        Ml(e, a);
    }
  }
  function Z_(e) {
    var t = e.alternate;
    (t !== null && ((e.alternate = null), Z_(t)),
      (e.child = null),
      (e.deletions = null),
      (e.sibling = null),
      e.tag === 5 && ((t = e.stateNode), t !== null && ao(t)),
      (e.stateNode = null),
      (e.return = null),
      (e.dependencies = null),
      (e.memoizedProps = null),
      (e.memoizedState = null),
      (e.pendingProps = null),
      (e.stateNode = null),
      (e.updateQueue = null));
  }
  var Je = null,
    jt = !1;
  function Il(e, t, a) {
    for (a = a.child; a !== null; ) (J_(e, t, a), (a = a.sibling));
  }
  function J_(e, t, a) {
    if (Lt && typeof Lt.onCommitFiberUnmount == 'function')
      try {
        Lt.onCommitFiberUnmount(xl, a);
      } catch {}
    switch (a.tag) {
      case 26:
        (ot || hl(a, t),
          Il(e, t, a),
          a.memoizedState
            ? a.memoizedState.count--
            : a.stateNode && ((a = a.stateNode), a.parentNode.removeChild(a)));
        break;
      case 27:
        ot || hl(a, t);
        var n = Je,
          s = jt;
        (_a(a.type) && ((Je = a.stateNode), (jt = !1)),
          Il(e, t, a),
          Oi(a.stateNode),
          (Je = n),
          (jt = s));
        break;
      case 5:
        ot || hl(a, t);
      case 6:
        if (((n = Je), (s = jt), (Je = null), Il(e, t, a), (Je = n), (jt = s), Je !== null))
          if (jt)
            try {
              (Je.nodeType === 9
                ? Je.body
                : Je.nodeName === 'HTML'
                  ? Je.ownerDocument.body
                  : Je
              ).removeChild(a.stateNode);
            } catch (c) {
              Re(a, t, c);
            }
          else
            try {
              Je.removeChild(a.stateNode);
            } catch (c) {
              Re(a, t, c);
            }
        break;
      case 18:
        Je !== null &&
          (jt
            ? ((e = Je),
              Gf(
                e.nodeType === 9 ? e.body : e.nodeName === 'HTML' ? e.ownerDocument.body : e,
                a.stateNode
              ),
              Bn(e))
            : Gf(Je, a.stateNode));
        break;
      case 4:
        ((n = Je),
          (s = jt),
          (Je = a.stateNode.containerInfo),
          (jt = !0),
          Il(e, t, a),
          (Je = n),
          (jt = s));
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        (sa(2, a, t), ot || sa(4, a, t), Il(e, t, a));
        break;
      case 1:
        (ot ||
          (hl(a, t), (n = a.stateNode), typeof n.componentWillUnmount == 'function' && G_(a, t, n)),
          Il(e, t, a));
        break;
      case 21:
        Il(e, t, a);
        break;
      case 22:
        ((ot = (n = ot) || a.memoizedState !== null), Il(e, t, a), (ot = n));
        break;
      default:
        Il(e, t, a);
    }
  }
  function P_(e, t) {
    if (
      t.memoizedState === null &&
      ((e = t.alternate), e !== null && ((e = e.memoizedState), e !== null))
    ) {
      e = e.dehydrated;
      try {
        Bn(e);
      } catch (a) {
        Re(t, t.return, a);
      }
    }
  }
  function F_(e, t) {
    if (
      t.memoizedState === null &&
      ((e = t.alternate),
      e !== null && ((e = e.memoizedState), e !== null && ((e = e.dehydrated), e !== null)))
    )
      try {
        Bn(e);
      } catch (a) {
        Re(t, t.return, a);
      }
  }
  function Zk(e) {
    switch (e.tag) {
      case 31:
      case 13:
      case 19:
        var t = e.stateNode;
        return (t === null && (t = e.stateNode = new Q_()), t);
      case 22:
        return (
          (e = e.stateNode),
          (t = e._retryCache),
          t === null && (t = e._retryCache = new Q_()),
          t
        );
      default:
        throw Error(r(435, e.tag));
    }
  }
  function Fs(e, t) {
    var a = Zk(e);
    t.forEach(function (n) {
      if (!a.has(n)) {
        a.add(n);
        var s = nv.bind(null, e, n);
        n.then(s, s);
      }
    });
  }
  function Nt(e, t) {
    var a = t.deletions;
    if (a !== null)
      for (var n = 0; n < a.length; n++) {
        var s = a[n],
          c = e,
          _ = t,
          k = _;
        e: for (; k !== null; ) {
          switch (k.tag) {
            case 27:
              if (_a(k.type)) {
                ((Je = k.stateNode), (jt = !1));
                break e;
              }
              break;
            case 5:
              ((Je = k.stateNode), (jt = !1));
              break e;
            case 3:
            case 4:
              ((Je = k.stateNode.containerInfo), (jt = !0));
              break e;
          }
          k = k.return;
        }
        if (Je === null) throw Error(r(160));
        (J_(c, _, s),
          (Je = null),
          (jt = !1),
          (c = s.alternate),
          c !== null && (c.return = null),
          (s.return = null));
      }
    if (t.subtreeFlags & 13886) for (t = t.child; t !== null; ) (W_(t, e), (t = t.sibling));
  }
  var al = null;
  function W_(e, t) {
    var a = e.alternate,
      n = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        (Nt(t, e), Et(e), n & 4 && (sa(3, e, e.return), wi(3, e), sa(5, e, e.return)));
        break;
      case 1:
        (Nt(t, e),
          Et(e),
          n & 512 && (ot || a === null || hl(a, a.return)),
          n & 64 &&
            Ol &&
            ((e = e.updateQueue),
            e !== null &&
              ((n = e.callbacks),
              n !== null &&
                ((a = e.shared.hiddenCallbacks),
                (e.shared.hiddenCallbacks = a === null ? n : a.concat(n))))));
        break;
      case 26:
        var s = al;
        if ((Nt(t, e), Et(e), n & 512 && (ot || a === null || hl(a, a.return)), n & 4)) {
          var c = a !== null ? a.memoizedState : null;
          if (((n = e.memoizedState), a === null))
            if (n === null)
              if (e.stateNode === null) {
                e: {
                  ((n = e.type), (a = e.memoizedProps), (s = s.ownerDocument || s));
                  t: switch (n) {
                    case 'title':
                      ((c = s.getElementsByTagName('title')[0]),
                        (!c ||
                          c[Fn] ||
                          c[pt] ||
                          c.namespaceURI === 'http://www.w3.org/2000/svg' ||
                          c.hasAttribute('itemprop')) &&
                          ((c = s.createElement(n)),
                          s.head.insertBefore(c, s.querySelector('head > title'))),
                        vt(c, n, a),
                        (c[pt] = e),
                        ut(c),
                        (n = c));
                      break e;
                    case 'link':
                      var _ = ep('link', 'href', s).get(n + (a.href || ''));
                      if (_) {
                        for (var k = 0; k < _.length; k++)
                          if (
                            ((c = _[k]),
                            c.getAttribute('href') ===
                              (a.href == null || a.href === '' ? null : a.href) &&
                              c.getAttribute('rel') === (a.rel == null ? null : a.rel) &&
                              c.getAttribute('title') === (a.title == null ? null : a.title) &&
                              c.getAttribute('crossorigin') ===
                                (a.crossOrigin == null ? null : a.crossOrigin))
                          ) {
                            _.splice(k, 1);
                            break t;
                          }
                      }
                      ((c = s.createElement(n)), vt(c, n, a), s.head.appendChild(c));
                      break;
                    case 'meta':
                      if ((_ = ep('meta', 'content', s).get(n + (a.content || '')))) {
                        for (k = 0; k < _.length; k++)
                          if (
                            ((c = _[k]),
                            c.getAttribute('content') ===
                              (a.content == null ? null : '' + a.content) &&
                              c.getAttribute('name') === (a.name == null ? null : a.name) &&
                              c.getAttribute('property') ===
                                (a.property == null ? null : a.property) &&
                              c.getAttribute('http-equiv') ===
                                (a.httpEquiv == null ? null : a.httpEquiv) &&
                              c.getAttribute('charset') === (a.charSet == null ? null : a.charSet))
                          ) {
                            _.splice(k, 1);
                            break t;
                          }
                      }
                      ((c = s.createElement(n)), vt(c, n, a), s.head.appendChild(c));
                      break;
                    default:
                      throw Error(r(468, n));
                  }
                  ((c[pt] = e), ut(c), (n = c));
                }
                e.stateNode = n;
              } else tp(s, e.type, e.stateNode);
            else e.stateNode = Wf(s, n, e.memoizedProps);
          else
            c !== n
              ? (c === null
                  ? a.stateNode !== null && ((a = a.stateNode), a.parentNode.removeChild(a))
                  : c.count--,
                n === null ? tp(s, e.type, e.stateNode) : Wf(s, n, e.memoizedProps))
              : n === null && e.stateNode !== null && Tc(e, e.memoizedProps, a.memoizedProps);
        }
        break;
      case 27:
        (Nt(t, e),
          Et(e),
          n & 512 && (ot || a === null || hl(a, a.return)),
          a !== null && n & 4 && Tc(e, e.memoizedProps, a.memoizedProps));
        break;
      case 5:
        if ((Nt(t, e), Et(e), n & 512 && (ot || a === null || hl(a, a.return)), e.flags & 32)) {
          s = e.stateNode;
          try {
            tn(s, '');
          } catch (oe) {
            Re(e, e.return, oe);
          }
        }
        (n & 4 &&
          e.stateNode != null &&
          ((s = e.memoizedProps), Tc(e, s, a !== null ? a.memoizedProps : s)),
          n & 1024 && (Ec = !0));
        break;
      case 6:
        if ((Nt(t, e), Et(e), n & 4)) {
          if (e.stateNode === null) throw Error(r(162));
          ((n = e.memoizedProps), (a = e.stateNode));
          try {
            a.nodeValue = n;
          } catch (oe) {
            Re(e, e.return, oe);
          }
        }
        break;
      case 3:
        if (
          ((fr = null),
          (s = al),
          (al = mr(t.containerInfo)),
          Nt(t, e),
          (al = s),
          Et(e),
          n & 4 && a !== null && a.memoizedState.isDehydrated)
        )
          try {
            Bn(t.containerInfo);
          } catch (oe) {
            Re(e, e.return, oe);
          }
        Ec && ((Ec = !1), ef(e));
        break;
      case 4:
        ((n = al), (al = mr(e.stateNode.containerInfo)), Nt(t, e), Et(e), (al = n));
        break;
      case 12:
        (Nt(t, e), Et(e));
        break;
      case 31:
        (Nt(t, e),
          Et(e),
          n & 4 && ((n = e.updateQueue), n !== null && ((e.updateQueue = null), Fs(e, n))));
        break;
      case 13:
        (Nt(t, e),
          Et(e),
          e.child.flags & 8192 &&
            (e.memoizedState !== null) != (a !== null && a.memoizedState !== null) &&
            (er = bt()),
          n & 4 && ((n = e.updateQueue), n !== null && ((e.updateQueue = null), Fs(e, n))));
        break;
      case 22:
        s = e.memoizedState !== null;
        var j = a !== null && a.memoizedState !== null,
          z = Ol,
          G = ot;
        if (((Ol = z || s), (ot = G || j), Nt(t, e), (ot = G), (Ol = z), Et(e), n & 8192))
          e: for (
            t = e.stateNode,
              t._visibility = s ? t._visibility & -2 : t._visibility | 1,
              s && (a === null || j || Ol || ot || Ra(e)),
              a = null,
              t = e;
            ;
          ) {
            if (t.tag === 5 || t.tag === 26) {
              if (a === null) {
                j = a = t;
                try {
                  if (((c = j.stateNode), s))
                    ((_ = c.style),
                      typeof _.setProperty == 'function'
                        ? _.setProperty('display', 'none', 'important')
                        : (_.display = 'none'));
                  else {
                    k = j.stateNode;
                    var Z = j.memoizedProps.style,
                      H = Z != null && Z.hasOwnProperty('display') ? Z.display : null;
                    k.style.display = H == null || typeof H == 'boolean' ? '' : ('' + H).trim();
                  }
                } catch (oe) {
                  Re(j, j.return, oe);
                }
              }
            } else if (t.tag === 6) {
              if (a === null) {
                j = t;
                try {
                  j.stateNode.nodeValue = s ? '' : j.memoizedProps;
                } catch (oe) {
                  Re(j, j.return, oe);
                }
              }
            } else if (t.tag === 18) {
              if (a === null) {
                j = t;
                try {
                  var U = j.stateNode;
                  s ? Yf(U, !0) : Yf(j.stateNode, !1);
                } catch (oe) {
                  Re(j, j.return, oe);
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
          n !== null && ((a = n.retryQueue), a !== null && ((n.retryQueue = null), Fs(e, a))));
        break;
      case 19:
        (Nt(t, e),
          Et(e),
          n & 4 && ((n = e.updateQueue), n !== null && ((e.updateQueue = null), Fs(e, n))));
        break;
      case 30:
        break;
      case 21:
        break;
      default:
        (Nt(t, e), Et(e));
    }
  }
  function Et(e) {
    var t = e.flags;
    if (t & 2) {
      try {
        for (var a, n = e.return; n !== null; ) {
          if (X_(n)) {
            a = n;
            break;
          }
          n = n.return;
        }
        if (a == null) throw Error(r(160));
        switch (a.tag) {
          case 27:
            var s = a.stateNode,
              c = jc(e);
            Ps(e, c, s);
            break;
          case 5:
            var _ = a.stateNode;
            a.flags & 32 && (tn(_, ''), (a.flags &= -33));
            var k = jc(e);
            Ps(e, k, _);
            break;
          case 3:
          case 4:
            var j = a.stateNode.containerInfo,
              z = jc(e);
            Nc(e, z, j);
            break;
          default:
            throw Error(r(161));
        }
      } catch (G) {
        Re(e, e.return, G);
      }
      e.flags &= -3;
    }
    t & 4096 && (e.flags &= -4097);
  }
  function ef(e) {
    if (e.subtreeFlags & 1024)
      for (e = e.child; e !== null; ) {
        var t = e;
        (ef(t), t.tag === 5 && t.flags & 1024 && t.stateNode.reset(), (e = e.sibling));
      }
  }
  function Ml(e, t) {
    if (t.subtreeFlags & 8772)
      for (t = t.child; t !== null; ) (K_(e, t.alternate, t), (t = t.sibling));
  }
  function Ra(e) {
    for (e = e.child; e !== null; ) {
      var t = e;
      switch (t.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          (sa(4, t, t.return), Ra(t));
          break;
        case 1:
          hl(t, t.return);
          var a = t.stateNode;
          (typeof a.componentWillUnmount == 'function' && G_(t, t.return, a), Ra(t));
          break;
        case 27:
          Oi(t.stateNode);
        case 26:
        case 5:
          (hl(t, t.return), Ra(t));
          break;
        case 22:
          t.memoizedState === null && Ra(t);
          break;
        case 30:
          Ra(t);
          break;
        default:
          Ra(t);
      }
      e = e.sibling;
    }
  }
  function Dl(e, t, a) {
    for (a = a && (t.subtreeFlags & 8772) !== 0, t = t.child; t !== null; ) {
      var n = t.alternate,
        s = e,
        c = t,
        _ = c.flags;
      switch (c.tag) {
        case 0:
        case 11:
        case 15:
          (Dl(s, c, a), wi(4, c));
          break;
        case 1:
          if ((Dl(s, c, a), (n = c), (s = n.stateNode), typeof s.componentDidMount == 'function'))
            try {
              s.componentDidMount();
            } catch (z) {
              Re(n, n.return, z);
            }
          if (((n = c), (s = n.updateQueue), s !== null)) {
            var k = n.stateNode;
            try {
              var j = s.shared.hiddenCallbacks;
              if (j !== null)
                for (s.shared.hiddenCallbacks = null, s = 0; s < j.length; s++) Lm(j[s], k);
            } catch (z) {
              Re(n, n.return, z);
            }
          }
          (a && _ & 64 && $_(c), Ti(c, c.return));
          break;
        case 27:
          V_(c);
        case 26:
        case 5:
          (Dl(s, c, a), a && n === null && _ & 4 && Y_(c), Ti(c, c.return));
          break;
        case 12:
          Dl(s, c, a);
          break;
        case 31:
          (Dl(s, c, a), a && _ & 4 && P_(s, c));
          break;
        case 13:
          (Dl(s, c, a), a && _ & 4 && F_(s, c));
          break;
        case 22:
          (c.memoizedState === null && Dl(s, c, a), Ti(c, c.return));
          break;
        case 30:
          break;
        default:
          Dl(s, c, a);
      }
      t = t.sibling;
    }
  }
  function Cc(e, t) {
    var a = null;
    (e !== null &&
      e.memoizedState !== null &&
      e.memoizedState.cachePool !== null &&
      (a = e.memoizedState.cachePool.pool),
      (e = null),
      t.memoizedState !== null &&
        t.memoizedState.cachePool !== null &&
        (e = t.memoizedState.cachePool.pool),
      e !== a && (e != null && e.refCount++, a != null && di(a)));
  }
  function Ac(e, t) {
    ((e = null),
      t.alternate !== null && (e = t.alternate.memoizedState.cache),
      (t = t.memoizedState.cache),
      t !== e && (t.refCount++, e != null && di(e)));
  }
  function nl(e, t, a, n) {
    if (t.subtreeFlags & 10256) for (t = t.child; t !== null; ) (tf(e, t, a, n), (t = t.sibling));
  }
  function tf(e, t, a, n) {
    var s = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        (nl(e, t, a, n), s & 2048 && wi(9, t));
        break;
      case 1:
        nl(e, t, a, n);
        break;
      case 3:
        (nl(e, t, a, n),
          s & 2048 &&
            ((e = null),
            t.alternate !== null && (e = t.alternate.memoizedState.cache),
            (t = t.memoizedState.cache),
            t !== e && (t.refCount++, e != null && di(e))));
        break;
      case 12:
        if (s & 2048) {
          (nl(e, t, a, n), (e = t.stateNode));
          try {
            var c = t.memoizedProps,
              _ = c.id,
              k = c.onPostCommit;
            typeof k == 'function' &&
              k(_, t.alternate === null ? 'mount' : 'update', e.passiveEffectDuration, -0);
          } catch (j) {
            Re(t, t.return, j);
          }
        } else nl(e, t, a, n);
        break;
      case 31:
        nl(e, t, a, n);
        break;
      case 13:
        nl(e, t, a, n);
        break;
      case 23:
        break;
      case 22:
        ((c = t.stateNode),
          (_ = t.alternate),
          t.memoizedState !== null
            ? c._visibility & 2
              ? nl(e, t, a, n)
              : ji(e, t)
            : c._visibility & 2
              ? nl(e, t, a, n)
              : ((c._visibility |= 2), xn(e, t, a, n, (t.subtreeFlags & 10256) !== 0 || !1)),
          s & 2048 && Cc(_, t));
        break;
      case 24:
        (nl(e, t, a, n), s & 2048 && Ac(t.alternate, t));
        break;
      default:
        nl(e, t, a, n);
    }
  }
  function xn(e, t, a, n, s) {
    for (s = s && ((t.subtreeFlags & 10256) !== 0 || !1), t = t.child; t !== null; ) {
      var c = e,
        _ = t,
        k = a,
        j = n,
        z = _.flags;
      switch (_.tag) {
        case 0:
        case 11:
        case 15:
          (xn(c, _, k, j, s), wi(8, _));
          break;
        case 23:
          break;
        case 22:
          var G = _.stateNode;
          (_.memoizedState !== null
            ? G._visibility & 2
              ? xn(c, _, k, j, s)
              : ji(c, _)
            : ((G._visibility |= 2), xn(c, _, k, j, s)),
            s && z & 2048 && Cc(_.alternate, _));
          break;
        case 24:
          (xn(c, _, k, j, s), s && z & 2048 && Ac(_.alternate, _));
          break;
        default:
          xn(c, _, k, j, s);
      }
      t = t.sibling;
    }
  }
  function ji(e, t) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; ) {
        var a = e,
          n = t,
          s = n.flags;
        switch (n.tag) {
          case 22:
            (ji(a, n), s & 2048 && Cc(n.alternate, n));
            break;
          case 24:
            (ji(a, n), s & 2048 && Ac(n.alternate, n));
            break;
          default:
            ji(a, n);
        }
        t = t.sibling;
      }
  }
  var Ni = 8192;
  function Sn(e, t, a) {
    if (e.subtreeFlags & Ni) for (e = e.child; e !== null; ) (lf(e, t, a), (e = e.sibling));
  }
  function lf(e, t, a) {
    switch (e.tag) {
      case 26:
        (Sn(e, t, a),
          e.flags & Ni && e.memoizedState !== null && Iv(a, al, e.memoizedState, e.memoizedProps));
        break;
      case 5:
        Sn(e, t, a);
        break;
      case 3:
      case 4:
        var n = al;
        ((al = mr(e.stateNode.containerInfo)), Sn(e, t, a), (al = n));
        break;
      case 22:
        e.memoizedState === null &&
          ((n = e.alternate),
          n !== null && n.memoizedState !== null
            ? ((n = Ni), (Ni = 16777216), Sn(e, t, a), (Ni = n))
            : Sn(e, t, a));
        break;
      default:
        Sn(e, t, a);
    }
  }
  function af(e) {
    var t = e.alternate;
    if (t !== null && ((e = t.child), e !== null)) {
      t.child = null;
      do ((t = e.sibling), (e.sibling = null), (e = t));
      while (e !== null);
    }
  }
  function Ei(e) {
    var t = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (t !== null)
        for (var a = 0; a < t.length; a++) {
          var n = t[a];
          ((dt = n), sf(n, e));
        }
      af(e);
    }
    if (e.subtreeFlags & 10256) for (e = e.child; e !== null; ) (nf(e), (e = e.sibling));
  }
  function nf(e) {
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        (Ei(e), e.flags & 2048 && sa(9, e, e.return));
        break;
      case 3:
        Ei(e);
        break;
      case 12:
        Ei(e);
        break;
      case 22:
        var t = e.stateNode;
        e.memoizedState !== null && t._visibility & 2 && (e.return === null || e.return.tag !== 13)
          ? ((t._visibility &= -3), Ws(e))
          : Ei(e);
        break;
      default:
        Ei(e);
    }
  }
  function Ws(e) {
    var t = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (t !== null)
        for (var a = 0; a < t.length; a++) {
          var n = t[a];
          ((dt = n), sf(n, e));
        }
      af(e);
    }
    for (e = e.child; e !== null; ) {
      switch (((t = e), t.tag)) {
        case 0:
        case 11:
        case 15:
          (sa(8, t, t.return), Ws(t));
          break;
        case 22:
          ((a = t.stateNode), a._visibility & 2 && ((a._visibility &= -3), Ws(t)));
          break;
        default:
          Ws(t);
      }
      e = e.sibling;
    }
  }
  function sf(e, t) {
    for (; dt !== null; ) {
      var a = dt;
      switch (a.tag) {
        case 0:
        case 11:
        case 15:
          sa(8, a, t);
          break;
        case 23:
        case 22:
          if (a.memoizedState !== null && a.memoizedState.cachePool !== null) {
            var n = a.memoizedState.cachePool.pool;
            n != null && n.refCount++;
          }
          break;
        case 24:
          di(a.memoizedState.cache);
      }
      if (((n = a.child), n !== null)) ((n.return = a), (dt = n));
      else
        e: for (a = e; dt !== null; ) {
          n = dt;
          var s = n.sibling,
            c = n.return;
          if ((Z_(n), n === a)) {
            dt = null;
            break e;
          }
          if (s !== null) {
            ((s.return = c), (dt = s));
            break e;
          }
          dt = c;
        }
    }
  }
  var Jk = {
      getCacheForType: function (e) {
        var t = gt(it),
          a = t.data.get(e);
        return (a === void 0 && ((a = e()), t.data.set(e, a)), a);
      },
      cacheSignal: function () {
        return gt(it).controller.signal;
      },
    },
    Pk = typeof WeakMap == 'function' ? WeakMap : Map,
    Oe = 0,
    Ye = null,
    je = null,
    Ee = 0,
    De = 0,
    Dt = null,
    ra = !1,
    wn = !1,
    Lc = !1,
    Rl = 0,
    tt = 0,
    oa = 0,
    za = 0,
    qc = 0,
    Rt = 0,
    Tn = 0,
    Ci = null,
    Ct = null,
    Bc = !1,
    er = 0,
    rf = 0,
    tr = 1 / 0,
    lr = null,
    ca = null,
    ct = 0,
    ua = null,
    jn = null,
    zl = 0,
    Oc = 0,
    Ic = null,
    of = null,
    Ai = 0,
    Mc = null;
  function zt() {
    return (Oe & 2) !== 0 && Ee !== 0 ? Ee & -Ee : q.T !== null ? $c() : Sd();
  }
  function cf() {
    if (Rt === 0)
      if ((Ee & 536870912) === 0 || Ae) {
        var e = us;
        ((us <<= 1), (us & 3932160) === 0 && (us = 262144), (Rt = e));
      } else Rt = 536870912;
    return ((e = It.current), e !== null && (e.flags |= 32), Rt);
  }
  function At(e, t, a) {
    (((e === Ye && (De === 2 || De === 9)) || e.cancelPendingCommit !== null) &&
      (Nn(e, 0), da(e, Ee, Rt, !1)),
      Pn(e, a),
      ((Oe & 2) === 0 || e !== Ye) &&
        (e === Ye && ((Oe & 2) === 0 && (za |= a), tt === 4 && da(e, Ee, Rt, !1)), gl(e)));
  }
  function uf(e, t, a) {
    if ((Oe & 6) !== 0) throw Error(r(327));
    var n = (!a && (t & 127) === 0 && (t & e.expiredLanes) === 0) || Jn(e, t),
      s = n ? ev(e, t) : Rc(e, t, !0),
      c = n;
    do {
      if (s === 0) {
        wn && !n && da(e, t, 0, !1);
        break;
      } else {
        if (((a = e.current.alternate), c && !Fk(a))) {
          ((s = Rc(e, t, !1)), (c = !1));
          continue;
        }
        if (s === 2) {
          if (((c = t), e.errorRecoveryDisabledLanes & c)) var _ = 0;
          else
            ((_ = e.pendingLanes & -536870913), (_ = _ !== 0 ? _ : _ & 536870912 ? 536870912 : 0));
          if (_ !== 0) {
            t = _;
            e: {
              var k = e;
              s = Ci;
              var j = k.current.memoizedState.isDehydrated;
              if ((j && (Nn(k, _).flags |= 256), (_ = Rc(k, _, !1)), _ !== 2)) {
                if (Lc && !j) {
                  ((k.errorRecoveryDisabledLanes |= c), (za |= c), (s = 4));
                  break e;
                }
                ((c = Ct), (Ct = s), c !== null && (Ct === null ? (Ct = c) : Ct.push.apply(Ct, c)));
              }
              s = _;
            }
            if (((c = !1), s !== 2)) continue;
          }
        }
        if (s === 1) {
          (Nn(e, 0), da(e, t, 0, !0));
          break;
        }
        e: {
          switch (((n = e), (c = s), c)) {
            case 0:
            case 1:
              throw Error(r(345));
            case 4:
              if ((t & 4194048) !== t) break;
            case 6:
              da(n, t, Rt, !ra);
              break e;
            case 2:
              Ct = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(r(329));
          }
          if ((t & 62914560) === t && ((s = er + 300 - bt()), 10 < s)) {
            if ((da(n, t, Rt, !ra), ms(n, 0, !0) !== 0)) break e;
            ((zl = t),
              (n.timeoutHandle = Uf(
                df.bind(null, n, a, Ct, lr, Bc, t, Rt, za, Tn, ra, c, 'Throttled', -0, 0),
                s
              )));
            break e;
          }
          df(n, a, Ct, lr, Bc, t, Rt, za, Tn, ra, c, null, -0, 0);
        }
      }
      break;
    } while (!0);
    gl(e);
  }
  function df(e, t, a, n, s, c, _, k, j, z, G, Z, H, U) {
    if (((e.timeoutHandle = -1), (Z = t.subtreeFlags), Z & 8192 || (Z & 16785408) === 16785408)) {
      ((Z = {
        stylesheets: null,
        count: 0,
        imgCount: 0,
        imgBytes: 0,
        suspenseyImages: [],
        waitingForImages: !0,
        waitingForViewTransition: !1,
        unsuspend: wl,
      }),
        lf(t, c, Z));
      var oe = (c & 62914560) === c ? er - bt() : (c & 4194048) === c ? rf - bt() : 0;
      if (((oe = Mv(Z, oe)), oe !== null)) {
        ((zl = c),
          (e.cancelPendingCommit = oe(vf.bind(null, e, t, c, a, n, s, _, k, j, G, Z, null, H, U))),
          da(e, c, _, !z));
        return;
      }
    }
    vf(e, t, c, a, n, s, _, k, j);
  }
  function Fk(e) {
    for (var t = e; ; ) {
      var a = t.tag;
      if (
        (a === 0 || a === 11 || a === 15) &&
        t.flags & 16384 &&
        ((a = t.updateQueue), a !== null && ((a = a.stores), a !== null))
      )
        for (var n = 0; n < a.length; n++) {
          var s = a[n],
            c = s.getSnapshot;
          s = s.value;
          try {
            if (!Bt(c(), s)) return !1;
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
  function da(e, t, a, n) {
    ((t &= ~qc),
      (t &= ~za),
      (e.suspendedLanes |= t),
      (e.pingedLanes &= ~t),
      n && (e.warmLanes |= t),
      (n = e.expirationTimes));
    for (var s = t; 0 < s; ) {
      var c = 31 - qt(s),
        _ = 1 << c;
      ((n[c] = -1), (s &= ~_));
    }
    a !== 0 && yd(e, a, t);
  }
  function ar() {
    return (Oe & 6) === 0 ? (Li(0), !1) : !0;
  }
  function Dc() {
    if (je !== null) {
      if (De === 0) var e = je.return;
      else ((e = je), (El = Aa = null), Wo(e), (gn = null), (_i = 0), (e = je));
      for (; e !== null; ) (U_(e.alternate, e), (e = e.return));
      je = null;
    }
  }
  function Nn(e, t) {
    var a = e.timeoutHandle;
    (a !== -1 && ((e.timeoutHandle = -1), kv(a)),
      (a = e.cancelPendingCommit),
      a !== null && ((e.cancelPendingCommit = null), a()),
      (zl = 0),
      Dc(),
      (Ye = e),
      (je = a = jl(e.current, null)),
      (Ee = t),
      (De = 0),
      (Dt = null),
      (ra = !1),
      (wn = Jn(e, t)),
      (Lc = !1),
      (Tn = Rt = qc = za = oa = tt = 0),
      (Ct = Ci = null),
      (Bc = !1),
      (t & 8) !== 0 && (t |= t & 32));
    var n = e.entangledLanes;
    if (n !== 0)
      for (e = e.entanglements, n &= t; 0 < n; ) {
        var s = 31 - qt(n),
          c = 1 << s;
        ((t |= e[s]), (n &= ~c));
      }
    return ((Rl = t), ws(), a);
  }
  function mf(e, t) {
    ((Se = null),
      (q.H = bi),
      t === hn || t === qs
        ? ((t = Nm()), (De = 3))
        : t === Uo
          ? ((t = Nm()), (De = 4))
          : (De =
              t === pc
                ? 8
                : t !== null && typeof t == 'object' && typeof t.then == 'function'
                  ? 6
                  : 1),
      (Dt = t),
      je === null && ((tt = 1), Vs(e, Xt(t, e.current))));
  }
  function _f() {
    var e = It.current;
    return e === null
      ? !0
      : (Ee & 4194048) === Ee
        ? Zt === null
        : (Ee & 62914560) === Ee || (Ee & 536870912) !== 0
          ? e === Zt
          : !1;
  }
  function ff() {
    var e = q.H;
    return ((q.H = bi), e === null ? bi : e);
  }
  function pf() {
    var e = q.A;
    return ((q.A = Jk), e);
  }
  function nr() {
    ((tt = 4),
      ra || ((Ee & 4194048) !== Ee && It.current !== null) || (wn = !0),
      ((oa & 134217727) === 0 && (za & 134217727) === 0) || Ye === null || da(Ye, Ee, Rt, !1));
  }
  function Rc(e, t, a) {
    var n = Oe;
    Oe |= 2;
    var s = ff(),
      c = pf();
    ((Ye !== e || Ee !== t) && ((lr = null), Nn(e, t)), (t = !1));
    var _ = tt;
    e: do
      try {
        if (De !== 0 && je !== null) {
          var k = je,
            j = Dt;
          switch (De) {
            case 8:
              (Dc(), (_ = 6));
              break e;
            case 3:
            case 2:
            case 9:
            case 6:
              It.current === null && (t = !0);
              var z = De;
              if (((De = 0), (Dt = null), En(e, k, j, z), a && wn)) {
                _ = 0;
                break e;
              }
              break;
            default:
              ((z = De), (De = 0), (Dt = null), En(e, k, j, z));
          }
        }
        (Wk(), (_ = tt));
        break;
      } catch (G) {
        mf(e, G);
      }
    while (!0);
    return (
      t && e.shellSuspendCounter++,
      (El = Aa = null),
      (Oe = n),
      (q.H = s),
      (q.A = c),
      je === null && ((Ye = null), (Ee = 0), ws()),
      _
    );
  }
  function Wk() {
    for (; je !== null; ) hf(je);
  }
  function ev(e, t) {
    var a = Oe;
    Oe |= 2;
    var n = ff(),
      s = pf();
    Ye !== e || Ee !== t ? ((lr = null), (tr = bt() + 500), Nn(e, t)) : (wn = Jn(e, t));
    e: do
      try {
        if (De !== 0 && je !== null) {
          t = je;
          var c = Dt;
          t: switch (De) {
            case 1:
              ((De = 0), (Dt = null), En(e, t, c, 1));
              break;
            case 2:
            case 9:
              if (Tm(c)) {
                ((De = 0), (Dt = null), gf(t));
                break;
              }
              ((t = function () {
                ((De !== 2 && De !== 9) || Ye !== e || (De = 7), gl(e));
              }),
                c.then(t, t));
              break e;
            case 3:
              De = 7;
              break e;
            case 4:
              De = 5;
              break e;
            case 7:
              Tm(c) ? ((De = 0), (Dt = null), gf(t)) : ((De = 0), (Dt = null), En(e, t, c, 7));
              break;
            case 5:
              var _ = null;
              switch (je.tag) {
                case 26:
                  _ = je.memoizedState;
                case 5:
                case 27:
                  var k = je;
                  if (_ ? lp(_) : k.stateNode.complete) {
                    ((De = 0), (Dt = null));
                    var j = k.sibling;
                    if (j !== null) je = j;
                    else {
                      var z = k.return;
                      z !== null ? ((je = z), ir(z)) : (je = null);
                    }
                    break t;
                  }
              }
              ((De = 0), (Dt = null), En(e, t, c, 5));
              break;
            case 6:
              ((De = 0), (Dt = null), En(e, t, c, 6));
              break;
            case 8:
              (Dc(), (tt = 6));
              break e;
            default:
              throw Error(r(462));
          }
        }
        tv();
        break;
      } catch (G) {
        mf(e, G);
      }
    while (!0);
    return (
      (El = Aa = null),
      (q.H = n),
      (q.A = s),
      (Oe = a),
      je !== null ? 0 : ((Ye = null), (Ee = 0), ws(), tt)
    );
  }
  function tv() {
    for (; je !== null && !ss(); ) hf(je);
  }
  function hf(e) {
    var t = z_(e.alternate, e, Rl);
    ((e.memoizedProps = e.pendingProps), t === null ? ir(e) : (je = t));
  }
  function gf(e) {
    var t = e,
      a = t.alternate;
    switch (t.tag) {
      case 15:
      case 0:
        t = B_(a, t, t.pendingProps, t.type, void 0, Ee);
        break;
      case 11:
        t = B_(a, t, t.pendingProps, t.type.render, t.ref, Ee);
        break;
      case 5:
        Wo(t);
      default:
        (U_(a, t), (t = je = fm(t, Rl)), (t = z_(a, t, Rl)));
    }
    ((e.memoizedProps = e.pendingProps), t === null ? ir(e) : (je = t));
  }
  function En(e, t, a, n) {
    ((El = Aa = null), Wo(t), (gn = null), (_i = 0));
    var s = t.return;
    try {
      if (Gk(e, s, t, a, Ee)) {
        ((tt = 1), Vs(e, Xt(a, e.current)), (je = null));
        return;
      }
    } catch (c) {
      if (s !== null) throw ((je = s), c);
      ((tt = 1), Vs(e, Xt(a, e.current)), (je = null));
      return;
    }
    t.flags & 32768
      ? (Ae || n === 1
          ? (e = !0)
          : wn || (Ee & 536870912) !== 0
            ? (e = !1)
            : ((ra = e = !0),
              (n === 2 || n === 9 || n === 3 || n === 6) &&
                ((n = It.current), n !== null && n.tag === 13 && (n.flags |= 16384))),
        kf(t, e))
      : ir(t);
  }
  function ir(e) {
    var t = e;
    do {
      if ((t.flags & 32768) !== 0) {
        kf(t, ra);
        return;
      }
      e = t.return;
      var a = Vk(t.alternate, t, Rl);
      if (a !== null) {
        je = a;
        return;
      }
      if (((t = t.sibling), t !== null)) {
        je = t;
        return;
      }
      je = t = e;
    } while (t !== null);
    tt === 0 && (tt = 5);
  }
  function kf(e, t) {
    do {
      var a = Qk(e.alternate, e);
      if (a !== null) {
        ((a.flags &= 32767), (je = a));
        return;
      }
      if (
        ((a = e.return),
        a !== null && ((a.flags |= 32768), (a.subtreeFlags = 0), (a.deletions = null)),
        !t && ((e = e.sibling), e !== null))
      ) {
        je = e;
        return;
      }
      je = e = a;
    } while (e !== null);
    ((tt = 6), (je = null));
  }
  function vf(e, t, a, n, s, c, _, k, j) {
    e.cancelPendingCommit = null;
    do sr();
    while (ct !== 0);
    if ((Oe & 6) !== 0) throw Error(r(327));
    if (t !== null) {
      if (t === e.current) throw Error(r(177));
      if (
        ((c = t.lanes | t.childLanes),
        (c |= jo),
        Og(e, a, c, _, k, j),
        e === Ye && ((je = Ye = null), (Ee = 0)),
        (jn = t),
        (ua = e),
        (zl = a),
        (Oc = c),
        (Ic = s),
        (of = n),
        (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0
          ? ((e.callbackNode = null),
            (e.callbackPriority = 0),
            iv(he, function () {
              return (wf(), null);
            }))
          : ((e.callbackNode = null), (e.callbackPriority = 0)),
        (n = (t.flags & 13878) !== 0),
        (t.subtreeFlags & 13878) !== 0 || n)
      ) {
        ((n = q.T), (q.T = null), (s = J.p), (J.p = 2), (_ = Oe), (Oe |= 4));
        try {
          Kk(e, t, a);
        } finally {
          ((Oe = _), (J.p = s), (q.T = n));
        }
      }
      ((ct = 1), yf(), bf(), xf());
    }
  }
  function yf() {
    if (ct === 1) {
      ct = 0;
      var e = ua,
        t = jn,
        a = (t.flags & 13878) !== 0;
      if ((t.subtreeFlags & 13878) !== 0 || a) {
        ((a = q.T), (q.T = null));
        var n = J.p;
        J.p = 2;
        var s = Oe;
        Oe |= 4;
        try {
          W_(t, e);
          var c = Jc,
            _ = im(e.containerInfo),
            k = c.focusedElem,
            j = c.selectionRange;
          if (_ !== k && k && k.ownerDocument && nm(k.ownerDocument.documentElement, k)) {
            if (j !== null && bo(k)) {
              var z = j.start,
                G = j.end;
              if ((G === void 0 && (G = z), 'selectionStart' in k))
                ((k.selectionStart = z), (k.selectionEnd = Math.min(G, k.value.length)));
              else {
                var Z = k.ownerDocument || document,
                  H = (Z && Z.defaultView) || window;
                if (H.getSelection) {
                  var U = H.getSelection(),
                    oe = k.textContent.length,
                    ge = Math.min(j.start, oe),
                    Ue = j.end === void 0 ? ge : Math.min(j.end, oe);
                  !U.extend && ge > Ue && ((_ = Ue), (Ue = ge), (ge = _));
                  var O = am(k, ge),
                    A = am(k, Ue);
                  if (
                    O &&
                    A &&
                    (U.rangeCount !== 1 ||
                      U.anchorNode !== O.node ||
                      U.anchorOffset !== O.offset ||
                      U.focusNode !== A.node ||
                      U.focusOffset !== A.offset)
                  ) {
                    var R = Z.createRange();
                    (R.setStart(O.node, O.offset),
                      U.removeAllRanges(),
                      ge > Ue
                        ? (U.addRange(R), U.extend(A.node, A.offset))
                        : (R.setEnd(A.node, A.offset), U.addRange(R)));
                  }
                }
              }
            }
            for (Z = [], U = k; (U = U.parentNode); )
              U.nodeType === 1 && Z.push({ element: U, left: U.scrollLeft, top: U.scrollTop });
            for (typeof k.focus == 'function' && k.focus(), k = 0; k < Z.length; k++) {
              var Q = Z[k];
              ((Q.element.scrollLeft = Q.left), (Q.element.scrollTop = Q.top));
            }
          }
          ((kr = !!Zc), (Jc = Zc = null));
        } finally {
          ((Oe = s), (J.p = n), (q.T = a));
        }
      }
      ((e.current = t), (ct = 2));
    }
  }
  function bf() {
    if (ct === 2) {
      ct = 0;
      var e = ua,
        t = jn,
        a = (t.flags & 8772) !== 0;
      if ((t.subtreeFlags & 8772) !== 0 || a) {
        ((a = q.T), (q.T = null));
        var n = J.p;
        J.p = 2;
        var s = Oe;
        Oe |= 4;
        try {
          K_(e, t.alternate, t);
        } finally {
          ((Oe = s), (J.p = n), (q.T = a));
        }
      }
      ct = 3;
    }
  }
  function xf() {
    if (ct === 4 || ct === 3) {
      ((ct = 0), rs());
      var e = ua,
        t = jn,
        a = zl,
        n = of;
      (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0
        ? (ct = 5)
        : ((ct = 0), (jn = ua = null), Sf(e, e.pendingLanes));
      var s = e.pendingLanes;
      if (
        (s === 0 && (ca = null),
        to(a),
        (t = t.stateNode),
        Lt && typeof Lt.onCommitFiberRoot == 'function')
      )
        try {
          Lt.onCommitFiberRoot(xl, t, void 0, (t.current.flags & 128) === 128);
        } catch {}
      if (n !== null) {
        ((t = q.T), (s = J.p), (J.p = 2), (q.T = null));
        try {
          for (var c = e.onRecoverableError, _ = 0; _ < n.length; _++) {
            var k = n[_];
            c(k.value, { componentStack: k.stack });
          }
        } finally {
          ((q.T = t), (J.p = s));
        }
      }
      ((zl & 3) !== 0 && sr(),
        gl(e),
        (s = e.pendingLanes),
        (a & 261930) !== 0 && (s & 42) !== 0 ? (e === Mc ? Ai++ : ((Ai = 0), (Mc = e))) : (Ai = 0),
        Li(0));
    }
  }
  function Sf(e, t) {
    (e.pooledCacheLanes &= t) === 0 &&
      ((t = e.pooledCache), t != null && ((e.pooledCache = null), di(t)));
  }
  function sr() {
    return (yf(), bf(), xf(), wf());
  }
  function wf() {
    if (ct !== 5) return !1;
    var e = ua,
      t = Oc;
    Oc = 0;
    var a = to(zl),
      n = q.T,
      s = J.p;
    try {
      ((J.p = 32 > a ? 32 : a), (q.T = null), (a = Ic), (Ic = null));
      var c = ua,
        _ = zl;
      if (((ct = 0), (jn = ua = null), (zl = 0), (Oe & 6) !== 0)) throw Error(r(331));
      var k = Oe;
      if (
        ((Oe |= 4),
        nf(c.current),
        tf(c, c.current, _, a),
        (Oe = k),
        Li(0, !1),
        Lt && typeof Lt.onPostCommitFiberRoot == 'function')
      )
        try {
          Lt.onPostCommitFiberRoot(xl, c);
        } catch {}
      return !0;
    } finally {
      ((J.p = s), (q.T = n), Sf(e, t));
    }
  }
  function Tf(e, t, a) {
    ((t = Xt(a, t)),
      (t = fc(e.stateNode, t, 2)),
      (e = aa(e, t, 2)),
      e !== null && (Pn(e, 2), gl(e)));
  }
  function Re(e, t, a) {
    if (e.tag === 3) Tf(e, e, a);
    else
      for (; t !== null; ) {
        if (t.tag === 3) {
          Tf(t, e, a);
          break;
        } else if (t.tag === 1) {
          var n = t.stateNode;
          if (
            typeof t.type.getDerivedStateFromError == 'function' ||
            (typeof n.componentDidCatch == 'function' && (ca === null || !ca.has(n)))
          ) {
            ((e = Xt(a, e)),
              (a = T_(2)),
              (n = aa(t, a, 2)),
              n !== null && (j_(a, n, t, e), Pn(n, 2), gl(n)));
            break;
          }
        }
        t = t.return;
      }
  }
  function zc(e, t, a) {
    var n = e.pingCache;
    if (n === null) {
      n = e.pingCache = new Pk();
      var s = new Set();
      n.set(t, s);
    } else ((s = n.get(t)), s === void 0 && ((s = new Set()), n.set(t, s)));
    s.has(a) || ((Lc = !0), s.add(a), (e = lv.bind(null, e, t, a)), t.then(e, e));
  }
  function lv(e, t, a) {
    var n = e.pingCache;
    (n !== null && n.delete(t),
      (e.pingedLanes |= e.suspendedLanes & a),
      (e.warmLanes &= ~a),
      Ye === e &&
        (Ee & a) === a &&
        (tt === 4 || (tt === 3 && (Ee & 62914560) === Ee && 300 > bt() - er)
          ? (Oe & 2) === 0 && Nn(e, 0)
          : (qc |= a),
        Tn === Ee && (Tn = 0)),
      gl(e));
  }
  function jf(e, t) {
    (t === 0 && (t = vd()), (e = Na(e, t)), e !== null && (Pn(e, t), gl(e)));
  }
  function av(e) {
    var t = e.memoizedState,
      a = 0;
    (t !== null && (a = t.retryLane), jf(e, a));
  }
  function nv(e, t) {
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
    (n !== null && n.delete(t), jf(e, a));
  }
  function iv(e, t) {
    return Qa(e, t);
  }
  var rr = null,
    Cn = null,
    Hc = !1,
    or = !1,
    Uc = !1,
    ma = 0;
  function gl(e) {
    (e !== Cn && e.next === null && (Cn === null ? (rr = Cn = e) : (Cn = Cn.next = e)),
      (or = !0),
      Hc || ((Hc = !0), rv()));
  }
  function Li(e, t) {
    if (!Uc && or) {
      Uc = !0;
      do
        for (var a = !1, n = rr; n !== null; ) {
          if (e !== 0) {
            var s = n.pendingLanes;
            if (s === 0) var c = 0;
            else {
              var _ = n.suspendedLanes,
                k = n.pingedLanes;
              ((c = (1 << (31 - qt(42 | e) + 1)) - 1),
                (c &= s & ~(_ & ~k)),
                (c = c & 201326741 ? (c & 201326741) | 1 : c ? c | 2 : 0));
            }
            c !== 0 && ((a = !0), Af(n, c));
          } else
            ((c = Ee),
              (c = ms(
                n,
                n === Ye ? c : 0,
                n.cancelPendingCommit !== null || n.timeoutHandle !== -1
              )),
              (c & 3) === 0 || Jn(n, c) || ((a = !0), Af(n, c)));
          n = n.next;
        }
      while (a);
      Uc = !1;
    }
  }
  function sv() {
    Nf();
  }
  function Nf() {
    or = Hc = !1;
    var e = 0;
    ma !== 0 && gv() && (e = ma);
    for (var t = bt(), a = null, n = rr; n !== null; ) {
      var s = n.next,
        c = Ef(n, t);
      (c === 0
        ? ((n.next = null), a === null ? (rr = s) : (a.next = s), s === null && (Cn = a))
        : ((a = n), (e !== 0 || (c & 3) !== 0) && (or = !0)),
        (n = s));
    }
    ((ct !== 0 && ct !== 5) || Li(e), ma !== 0 && (ma = 0));
  }
  function Ef(e, t) {
    for (
      var a = e.suspendedLanes,
        n = e.pingedLanes,
        s = e.expirationTimes,
        c = e.pendingLanes & -62914561;
      0 < c;
    ) {
      var _ = 31 - qt(c),
        k = 1 << _,
        j = s[_];
      (j === -1
        ? ((k & a) === 0 || (k & n) !== 0) && (s[_] = Bg(k, t))
        : j <= t && (e.expiredLanes |= k),
        (c &= ~k));
    }
    if (
      ((t = Ye),
      (a = Ee),
      (a = ms(e, e === t ? a : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== -1)),
      (n = e.callbackNode),
      a === 0 || (e === t && (De === 2 || De === 9)) || e.cancelPendingCommit !== null)
    )
      return (n !== null && n !== null && Zn(n), (e.callbackNode = null), (e.callbackPriority = 0));
    if ((a & 3) === 0 || Jn(e, a)) {
      if (((t = a & -a), t === e.callbackPriority)) return t;
      switch ((n !== null && Zn(n), to(a))) {
        case 2:
        case 8:
          a = re;
          break;
        case 32:
          a = he;
          break;
        case 268435456:
          a = Ql;
          break;
        default:
          a = he;
      }
      return (
        (n = Cf.bind(null, e)),
        (a = Qa(a, n)),
        (e.callbackPriority = t),
        (e.callbackNode = a),
        t
      );
    }
    return (
      n !== null && n !== null && Zn(n),
      (e.callbackPriority = 2),
      (e.callbackNode = null),
      2
    );
  }
  function Cf(e, t) {
    if (ct !== 0 && ct !== 5) return ((e.callbackNode = null), (e.callbackPriority = 0), null);
    var a = e.callbackNode;
    if (sr() && e.callbackNode !== a) return null;
    var n = Ee;
    return (
      (n = ms(e, e === Ye ? n : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== -1)),
      n === 0
        ? null
        : (uf(e, n, t),
          Ef(e, bt()),
          e.callbackNode != null && e.callbackNode === a ? Cf.bind(null, e) : null)
    );
  }
  function Af(e, t) {
    if (sr()) return null;
    uf(e, t, !0);
  }
  function rv() {
    vv(function () {
      (Oe & 6) !== 0 ? Qa(le, sv) : Nf();
    });
  }
  function $c() {
    if (ma === 0) {
      var e = fn;
      (e === 0 && ((e = cs), (cs <<= 1), (cs & 261888) === 0 && (cs = 256)), (ma = e));
    }
    return ma;
  }
  function Lf(e) {
    return e == null || typeof e == 'symbol' || typeof e == 'boolean'
      ? null
      : typeof e == 'function'
        ? e
        : hs('' + e);
  }
  function qf(e, t) {
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
  function ov(e, t, a, n, s) {
    if (t === 'submit' && a && a.stateNode === s) {
      var c = Lf((s[wt] || null).action),
        _ = n.submitter;
      _ &&
        ((t = (t = _[wt] || null) ? Lf(t.formAction) : _.getAttribute('formAction')),
        t !== null && ((c = t), (_ = null)));
      var k = new ys('action', 'action', null, n, s);
      e.push({
        event: k,
        listeners: [
          {
            instance: null,
            listener: function () {
              if (n.defaultPrevented) {
                if (ma !== 0) {
                  var j = _ ? qf(s, _) : new FormData(s);
                  oc(a, { pending: !0, data: j, method: s.method, action: c }, null, j);
                }
              } else
                typeof c == 'function' &&
                  (k.preventDefault(),
                  (j = _ ? qf(s, _) : new FormData(s)),
                  oc(a, { pending: !0, data: j, method: s.method, action: c }, c, j));
            },
            currentTarget: s,
          },
        ],
      });
    }
  }
  for (var Gc = 0; Gc < To.length; Gc++) {
    var Yc = To[Gc],
      cv = Yc.toLowerCase(),
      uv = Yc[0].toUpperCase() + Yc.slice(1);
    ll(cv, 'on' + uv);
  }
  (ll(om, 'onAnimationEnd'),
    ll(cm, 'onAnimationIteration'),
    ll(um, 'onAnimationStart'),
    ll('dblclick', 'onDoubleClick'),
    ll('focusin', 'onFocus'),
    ll('focusout', 'onBlur'),
    ll(jk, 'onTransitionRun'),
    ll(Nk, 'onTransitionStart'),
    ll(Ek, 'onTransitionCancel'),
    ll(dm, 'onTransitionEnd'),
    Wa('onMouseEnter', ['mouseout', 'mouseover']),
    Wa('onMouseLeave', ['mouseout', 'mouseover']),
    Wa('onPointerEnter', ['pointerout', 'pointerover']),
    Wa('onPointerLeave', ['pointerout', 'pointerover']),
    Sa('onChange', 'change click focusin focusout input keydown keyup selectionchange'.split(' ')),
    Sa(
      'onSelect',
      'focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange'.split(
        ' '
      )
    ),
    Sa('onBeforeInput', ['compositionend', 'keypress', 'textInput', 'paste']),
    Sa('onCompositionEnd', 'compositionend focusout keydown keypress keyup mousedown'.split(' ')),
    Sa(
      'onCompositionStart',
      'compositionstart focusout keydown keypress keyup mousedown'.split(' ')
    ),
    Sa(
      'onCompositionUpdate',
      'compositionupdate focusout keydown keypress keyup mousedown'.split(' ')
    ));
  var qi =
      'abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting'.split(
        ' '
      ),
    dv = new Set(
      'beforetoggle cancel close invalid load scroll scrollend toggle'.split(' ').concat(qi)
    );
  function Bf(e, t) {
    t = (t & 4) !== 0;
    for (var a = 0; a < e.length; a++) {
      var n = e[a],
        s = n.event;
      n = n.listeners;
      e: {
        var c = void 0;
        if (t)
          for (var _ = n.length - 1; 0 <= _; _--) {
            var k = n[_],
              j = k.instance,
              z = k.currentTarget;
            if (((k = k.listener), j !== c && s.isPropagationStopped())) break e;
            ((c = k), (s.currentTarget = z));
            try {
              c(s);
            } catch (G) {
              Ss(G);
            }
            ((s.currentTarget = null), (c = j));
          }
        else
          for (_ = 0; _ < n.length; _++) {
            if (
              ((k = n[_]),
              (j = k.instance),
              (z = k.currentTarget),
              (k = k.listener),
              j !== c && s.isPropagationStopped())
            )
              break e;
            ((c = k), (s.currentTarget = z));
            try {
              c(s);
            } catch (G) {
              Ss(G);
            }
            ((s.currentTarget = null), (c = j));
          }
      }
    }
  }
  function Ne(e, t) {
    var a = t[lo];
    a === void 0 && (a = t[lo] = new Set());
    var n = e + '__bubble';
    a.has(n) || (Of(t, e, 2, !1), a.add(n));
  }
  function Xc(e, t, a) {
    var n = 0;
    (t && (n |= 4), Of(a, e, n, t));
  }
  var cr = '_reactListening' + Math.random().toString(36).slice(2);
  function Vc(e) {
    if (!e[cr]) {
      ((e[cr] = !0),
        jd.forEach(function (a) {
          a !== 'selectionchange' && (dv.has(a) || Xc(a, !1, e), Xc(a, !0, e));
        }));
      var t = e.nodeType === 9 ? e : e.ownerDocument;
      t === null || t[cr] || ((t[cr] = !0), Xc('selectionchange', !1, t));
    }
  }
  function Of(e, t, a, n) {
    switch (cp(t)) {
      case 2:
        var s = zv;
        break;
      case 8:
        s = Hv;
        break;
      default:
        s = ru;
    }
    ((a = s.bind(null, t, a, e)),
      (s = void 0),
      !mo || (t !== 'touchstart' && t !== 'touchmove' && t !== 'wheel') || (s = !0),
      n
        ? s !== void 0
          ? e.addEventListener(t, a, { capture: !0, passive: s })
          : e.addEventListener(t, a, !0)
        : s !== void 0
          ? e.addEventListener(t, a, { passive: s })
          : e.addEventListener(t, a, !1));
  }
  function Qc(e, t, a, n, s) {
    var c = n;
    if ((t & 1) === 0 && (t & 2) === 0 && n !== null)
      e: for (;;) {
        if (n === null) return;
        var _ = n.tag;
        if (_ === 3 || _ === 4) {
          var k = n.stateNode.containerInfo;
          if (k === s) break;
          if (_ === 4)
            for (_ = n.return; _ !== null; ) {
              var j = _.tag;
              if ((j === 3 || j === 4) && _.stateNode.containerInfo === s) return;
              _ = _.return;
            }
          for (; k !== null; ) {
            if (((_ = Ja(k)), _ === null)) return;
            if (((j = _.tag), j === 5 || j === 6 || j === 26 || j === 27)) {
              n = c = _;
              continue e;
            }
            k = k.parentNode;
          }
        }
        n = n.return;
      }
    Rd(function () {
      var z = c,
        G = co(a),
        Z = [];
      e: {
        var H = mm.get(e);
        if (H !== void 0) {
          var U = ys,
            oe = e;
          switch (e) {
            case 'keypress':
              if (ks(a) === 0) break e;
            case 'keydown':
            case 'keyup':
              U = nk;
              break;
            case 'focusin':
              ((oe = 'focus'), (U = ho));
              break;
            case 'focusout':
              ((oe = 'blur'), (U = ho));
              break;
            case 'beforeblur':
            case 'afterblur':
              U = ho;
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
              U = Ud;
              break;
            case 'drag':
            case 'dragend':
            case 'dragenter':
            case 'dragexit':
            case 'dragleave':
            case 'dragover':
            case 'dragstart':
            case 'drop':
              U = Vg;
              break;
            case 'touchcancel':
            case 'touchend':
            case 'touchmove':
            case 'touchstart':
              U = rk;
              break;
            case om:
            case cm:
            case um:
              U = Zg;
              break;
            case dm:
              U = ck;
              break;
            case 'scroll':
            case 'scrollend':
              U = Yg;
              break;
            case 'wheel':
              U = dk;
              break;
            case 'copy':
            case 'cut':
            case 'paste':
              U = Pg;
              break;
            case 'gotpointercapture':
            case 'lostpointercapture':
            case 'pointercancel':
            case 'pointerdown':
            case 'pointermove':
            case 'pointerout':
            case 'pointerover':
            case 'pointerup':
              U = Gd;
              break;
            case 'toggle':
            case 'beforetoggle':
              U = _k;
          }
          var ge = (t & 4) !== 0,
            Ue = !ge && (e === 'scroll' || e === 'scrollend'),
            O = ge ? (H !== null ? H + 'Capture' : null) : H;
          ge = [];
          for (var A = z, R; A !== null; ) {
            var Q = A;
            if (
              ((R = Q.stateNode),
              (Q = Q.tag),
              (Q !== 5 && Q !== 26 && Q !== 27) ||
                R === null ||
                O === null ||
                ((Q = ei(A, O)), Q != null && ge.push(Bi(A, Q, R))),
              Ue)
            )
              break;
            A = A.return;
          }
          0 < ge.length && ((H = new U(H, oe, null, a, G)), Z.push({ event: H, listeners: ge }));
        }
      }
      if ((t & 7) === 0) {
        e: {
          if (
            ((H = e === 'mouseover' || e === 'pointerover'),
            (U = e === 'mouseout' || e === 'pointerout'),
            H && a !== oo && (oe = a.relatedTarget || a.fromElement) && (Ja(oe) || oe[Za]))
          )
            break e;
          if (
            (U || H) &&
            ((H =
              G.window === G
                ? G
                : (H = G.ownerDocument)
                  ? H.defaultView || H.parentWindow
                  : window),
            U
              ? ((oe = a.relatedTarget || a.toElement),
                (U = z),
                (oe = oe ? Ja(oe) : null),
                oe !== null &&
                  ((Ue = d(oe)), (ge = oe.tag), oe !== Ue || (ge !== 5 && ge !== 27 && ge !== 6)) &&
                  (oe = null))
              : ((U = null), (oe = z)),
            U !== oe)
          ) {
            if (
              ((ge = Ud),
              (Q = 'onMouseLeave'),
              (O = 'onMouseEnter'),
              (A = 'mouse'),
              (e === 'pointerout' || e === 'pointerover') &&
                ((ge = Gd), (Q = 'onPointerLeave'), (O = 'onPointerEnter'), (A = 'pointer')),
              (Ue = U == null ? H : Wn(U)),
              (R = oe == null ? H : Wn(oe)),
              (H = new ge(Q, A + 'leave', U, a, G)),
              (H.target = Ue),
              (H.relatedTarget = R),
              (Q = null),
              Ja(G) === z &&
                ((ge = new ge(O, A + 'enter', oe, a, G)),
                (ge.target = R),
                (ge.relatedTarget = Ue),
                (Q = ge)),
              (Ue = Q),
              U && oe)
            )
              t: {
                for (ge = mv, O = U, A = oe, R = 0, Q = O; Q; Q = ge(Q)) R++;
                Q = 0;
                for (var fe = A; fe; fe = ge(fe)) Q++;
                for (; 0 < R - Q; ) ((O = ge(O)), R--);
                for (; 0 < Q - R; ) ((A = ge(A)), Q--);
                for (; R--; ) {
                  if (O === A || (A !== null && O === A.alternate)) {
                    ge = O;
                    break t;
                  }
                  ((O = ge(O)), (A = ge(A)));
                }
                ge = null;
              }
            else ge = null;
            (U !== null && If(Z, H, U, ge, !1),
              oe !== null && Ue !== null && If(Z, Ue, oe, ge, !0));
          }
        }
        e: {
          if (
            ((H = z ? Wn(z) : window),
            (U = H.nodeName && H.nodeName.toLowerCase()),
            U === 'select' || (U === 'input' && H.type === 'file'))
          )
            var qe = Pd;
          else if (Zd(H))
            if (Fd) qe = Sk;
            else {
              qe = bk;
              var ce = yk;
            }
          else
            ((U = H.nodeName),
              !U || U.toLowerCase() !== 'input' || (H.type !== 'checkbox' && H.type !== 'radio')
                ? z && ro(z.elementType) && (qe = Pd)
                : (qe = xk));
          if (qe && (qe = qe(e, z))) {
            Jd(Z, qe, a, G);
            break e;
          }
          (ce && ce(e, H, z),
            e === 'focusout' &&
              z &&
              H.type === 'number' &&
              z.memoizedProps.value != null &&
              so(H, 'number', H.value));
        }
        switch (((ce = z ? Wn(z) : window), e)) {
          case 'focusin':
            (Zd(ce) || ce.contentEditable === 'true') && ((sn = ce), (xo = z), (oi = null));
            break;
          case 'focusout':
            oi = xo = sn = null;
            break;
          case 'mousedown':
            So = !0;
            break;
          case 'contextmenu':
          case 'mouseup':
          case 'dragend':
            ((So = !1), sm(Z, a, G));
            break;
          case 'selectionchange':
            if (Tk) break;
          case 'keydown':
          case 'keyup':
            sm(Z, a, G);
        }
        var we;
        if (ko)
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
          nn
            ? Qd(e, a) && (Ce = 'onCompositionEnd')
            : e === 'keydown' && a.keyCode === 229 && (Ce = 'onCompositionStart');
        (Ce &&
          (Yd &&
            a.locale !== 'ko' &&
            (nn || Ce !== 'onCompositionStart'
              ? Ce === 'onCompositionEnd' && nn && (we = zd())
              : ((Jl = G), (_o = 'value' in Jl ? Jl.value : Jl.textContent), (nn = !0))),
          (ce = ur(z, Ce)),
          0 < ce.length &&
            ((Ce = new $d(Ce, e, null, a, G)),
            Z.push({ event: Ce, listeners: ce }),
            we ? (Ce.data = we) : ((we = Kd(a)), we !== null && (Ce.data = we)))),
          (we = pk ? hk(e, a) : gk(e, a)) &&
            ((Ce = ur(z, 'onBeforeInput')),
            0 < Ce.length &&
              ((ce = new $d('onBeforeInput', 'beforeinput', null, a, G)),
              Z.push({ event: ce, listeners: Ce }),
              (ce.data = we))),
          ov(Z, e, z, a, G));
      }
      Bf(Z, t);
    });
  }
  function Bi(e, t, a) {
    return { instance: e, listener: t, currentTarget: a };
  }
  function ur(e, t) {
    for (var a = t + 'Capture', n = []; e !== null; ) {
      var s = e,
        c = s.stateNode;
      if (
        ((s = s.tag),
        (s !== 5 && s !== 26 && s !== 27) ||
          c === null ||
          ((s = ei(e, a)),
          s != null && n.unshift(Bi(e, s, c)),
          (s = ei(e, t)),
          s != null && n.push(Bi(e, s, c))),
        e.tag === 3)
      )
        return n;
      e = e.return;
    }
    return [];
  }
  function mv(e) {
    if (e === null) return null;
    do e = e.return;
    while (e && e.tag !== 5 && e.tag !== 27);
    return e || null;
  }
  function If(e, t, a, n, s) {
    for (var c = t._reactName, _ = []; a !== null && a !== n; ) {
      var k = a,
        j = k.alternate,
        z = k.stateNode;
      if (((k = k.tag), j !== null && j === n)) break;
      ((k !== 5 && k !== 26 && k !== 27) ||
        z === null ||
        ((j = z),
        s
          ? ((z = ei(a, c)), z != null && _.unshift(Bi(a, z, j)))
          : s || ((z = ei(a, c)), z != null && _.push(Bi(a, z, j)))),
        (a = a.return));
    }
    _.length !== 0 && e.push({ event: t, listeners: _ });
  }
  var _v = /\r\n?/g,
    fv = /\u0000|\uFFFD/g;
  function Mf(e) {
    return (typeof e == 'string' ? e : '' + e)
      .replace(
        _v,
        `
`
      )
      .replace(fv, '');
  }
  function Df(e, t) {
    return ((t = Mf(t)), Mf(e) === t);
  }
  function He(e, t, a, n, s, c) {
    switch (a) {
      case 'children':
        typeof n == 'string'
          ? t === 'body' || (t === 'textarea' && n === '') || tn(e, n)
          : (typeof n == 'number' || typeof n == 'bigint') && t !== 'body' && tn(e, '' + n);
        break;
      case 'className':
        fs(e, 'class', n);
        break;
      case 'tabIndex':
        fs(e, 'tabindex', n);
        break;
      case 'dir':
      case 'role':
      case 'viewBox':
      case 'width':
      case 'height':
        fs(e, a, n);
        break;
      case 'style':
        Md(e, n, c);
        break;
      case 'data':
        if (t !== 'object') {
          fs(e, 'data', n);
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
        ((n = hs('' + n)), e.setAttribute(a, n));
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
          typeof c == 'function' &&
            (a === 'formAction'
              ? (t !== 'input' && He(e, t, 'name', s.name, s, null),
                He(e, t, 'formEncType', s.formEncType, s, null),
                He(e, t, 'formMethod', s.formMethod, s, null),
                He(e, t, 'formTarget', s.formTarget, s, null))
              : (He(e, t, 'encType', s.encType, s, null),
                He(e, t, 'method', s.method, s, null),
                He(e, t, 'target', s.target, s, null)));
        if (n == null || typeof n == 'symbol' || typeof n == 'boolean') {
          e.removeAttribute(a);
          break;
        }
        ((n = hs('' + n)), e.setAttribute(a, n));
        break;
      case 'onClick':
        n != null && (e.onclick = wl);
        break;
      case 'onScroll':
        n != null && Ne('scroll', e);
        break;
      case 'onScrollEnd':
        n != null && Ne('scrollend', e);
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
        ((a = hs('' + n)), e.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', a));
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
        (Ne('beforetoggle', e), Ne('toggle', e), _s(e, 'popover', n));
        break;
      case 'xlinkActuate':
        Sl(e, 'http://www.w3.org/1999/xlink', 'xlink:actuate', n);
        break;
      case 'xlinkArcrole':
        Sl(e, 'http://www.w3.org/1999/xlink', 'xlink:arcrole', n);
        break;
      case 'xlinkRole':
        Sl(e, 'http://www.w3.org/1999/xlink', 'xlink:role', n);
        break;
      case 'xlinkShow':
        Sl(e, 'http://www.w3.org/1999/xlink', 'xlink:show', n);
        break;
      case 'xlinkTitle':
        Sl(e, 'http://www.w3.org/1999/xlink', 'xlink:title', n);
        break;
      case 'xlinkType':
        Sl(e, 'http://www.w3.org/1999/xlink', 'xlink:type', n);
        break;
      case 'xmlBase':
        Sl(e, 'http://www.w3.org/XML/1998/namespace', 'xml:base', n);
        break;
      case 'xmlLang':
        Sl(e, 'http://www.w3.org/XML/1998/namespace', 'xml:lang', n);
        break;
      case 'xmlSpace':
        Sl(e, 'http://www.w3.org/XML/1998/namespace', 'xml:space', n);
        break;
      case 'is':
        _s(e, 'is', n);
        break;
      case 'innerText':
      case 'textContent':
        break;
      default:
        (!(2 < a.length) || (a[0] !== 'o' && a[0] !== 'O') || (a[1] !== 'n' && a[1] !== 'N')) &&
          ((a = $g.get(a) || a), _s(e, a, n));
    }
  }
  function Kc(e, t, a, n, s, c) {
    switch (a) {
      case 'style':
        Md(e, n, c);
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
          ? tn(e, n)
          : (typeof n == 'number' || typeof n == 'bigint') && tn(e, '' + n);
        break;
      case 'onScroll':
        n != null && Ne('scroll', e);
        break;
      case 'onScrollEnd':
        n != null && Ne('scrollend', e);
        break;
      case 'onClick':
        n != null && (e.onclick = wl);
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
        if (!Nd.hasOwnProperty(a))
          e: {
            if (
              a[0] === 'o' &&
              a[1] === 'n' &&
              ((s = a.endsWith('Capture')),
              (t = a.slice(2, s ? a.length - 7 : void 0)),
              (c = e[wt] || null),
              (c = c != null ? c[a] : null),
              typeof c == 'function' && e.removeEventListener(t, c, s),
              typeof n == 'function')
            ) {
              (typeof c != 'function' &&
                c !== null &&
                (a in e ? (e[a] = null) : e.hasAttribute(a) && e.removeAttribute(a)),
                e.addEventListener(t, n, s));
              break e;
            }
            a in e ? (e[a] = n) : n === !0 ? e.setAttribute(a, '') : _s(e, a, n);
          }
    }
  }
  function vt(e, t, a) {
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
        (Ne('error', e), Ne('load', e));
        var n = !1,
          s = !1,
          c;
        for (c in a)
          if (a.hasOwnProperty(c)) {
            var _ = a[c];
            if (_ != null)
              switch (c) {
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
                  He(e, t, c, _, a, null);
              }
          }
        (s && He(e, t, 'srcSet', a.srcSet, a, null), n && He(e, t, 'src', a.src, a, null));
        return;
      case 'input':
        Ne('invalid', e);
        var k = (c = _ = s = null),
          j = null,
          z = null;
        for (n in a)
          if (a.hasOwnProperty(n)) {
            var G = a[n];
            if (G != null)
              switch (n) {
                case 'name':
                  s = G;
                  break;
                case 'type':
                  _ = G;
                  break;
                case 'checked':
                  j = G;
                  break;
                case 'defaultChecked':
                  z = G;
                  break;
                case 'value':
                  c = G;
                  break;
                case 'defaultValue':
                  k = G;
                  break;
                case 'children':
                case 'dangerouslySetInnerHTML':
                  if (G != null) throw Error(r(137, t));
                  break;
                default:
                  He(e, t, n, G, a, null);
              }
          }
        qd(e, c, k, j, z, _, s, !1);
        return;
      case 'select':
        (Ne('invalid', e), (n = _ = c = null));
        for (s in a)
          if (a.hasOwnProperty(s) && ((k = a[s]), k != null))
            switch (s) {
              case 'value':
                c = k;
                break;
              case 'defaultValue':
                _ = k;
                break;
              case 'multiple':
                n = k;
              default:
                He(e, t, s, k, a, null);
            }
        ((t = c),
          (a = _),
          (e.multiple = !!n),
          t != null ? en(e, !!n, t, !1) : a != null && en(e, !!n, a, !0));
        return;
      case 'textarea':
        (Ne('invalid', e), (c = s = n = null));
        for (_ in a)
          if (a.hasOwnProperty(_) && ((k = a[_]), k != null))
            switch (_) {
              case 'value':
                n = k;
                break;
              case 'defaultValue':
                s = k;
                break;
              case 'children':
                c = k;
                break;
              case 'dangerouslySetInnerHTML':
                if (k != null) throw Error(r(91));
                break;
              default:
                He(e, t, _, k, a, null);
            }
        Od(e, n, s, c);
        return;
      case 'option':
        for (j in a)
          if (a.hasOwnProperty(j) && ((n = a[j]), n != null))
            switch (j) {
              case 'selected':
                e.selected = n && typeof n != 'function' && typeof n != 'symbol';
                break;
              default:
                He(e, t, j, n, a, null);
            }
        return;
      case 'dialog':
        (Ne('beforetoggle', e), Ne('toggle', e), Ne('cancel', e), Ne('close', e));
        break;
      case 'iframe':
      case 'object':
        Ne('load', e);
        break;
      case 'video':
      case 'audio':
        for (n = 0; n < qi.length; n++) Ne(qi[n], e);
        break;
      case 'image':
        (Ne('error', e), Ne('load', e));
        break;
      case 'details':
        Ne('toggle', e);
        break;
      case 'embed':
      case 'source':
      case 'link':
        (Ne('error', e), Ne('load', e));
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
        for (z in a)
          if (a.hasOwnProperty(z) && ((n = a[z]), n != null))
            switch (z) {
              case 'children':
              case 'dangerouslySetInnerHTML':
                throw Error(r(137, t));
              default:
                He(e, t, z, n, a, null);
            }
        return;
      default:
        if (ro(t)) {
          for (G in a)
            a.hasOwnProperty(G) && ((n = a[G]), n !== void 0 && Kc(e, t, G, n, a, void 0));
          return;
        }
    }
    for (k in a) a.hasOwnProperty(k) && ((n = a[k]), n != null && He(e, t, k, n, a, null));
  }
  function pv(e, t, a, n) {
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
          c = null,
          _ = null,
          k = null,
          j = null,
          z = null,
          G = null;
        for (U in a) {
          var Z = a[U];
          if (a.hasOwnProperty(U) && Z != null)
            switch (U) {
              case 'checked':
                break;
              case 'value':
                break;
              case 'defaultValue':
                j = Z;
              default:
                n.hasOwnProperty(U) || He(e, t, U, null, n, Z);
            }
        }
        for (var H in n) {
          var U = n[H];
          if (((Z = a[H]), n.hasOwnProperty(H) && (U != null || Z != null)))
            switch (H) {
              case 'type':
                c = U;
                break;
              case 'name':
                s = U;
                break;
              case 'checked':
                z = U;
                break;
              case 'defaultChecked':
                G = U;
                break;
              case 'value':
                _ = U;
                break;
              case 'defaultValue':
                k = U;
                break;
              case 'children':
              case 'dangerouslySetInnerHTML':
                if (U != null) throw Error(r(137, t));
                break;
              default:
                U !== Z && He(e, t, H, U, n, Z);
            }
        }
        io(e, _, k, j, z, G, c, s);
        return;
      case 'select':
        U = _ = k = H = null;
        for (c in a)
          if (((j = a[c]), a.hasOwnProperty(c) && j != null))
            switch (c) {
              case 'value':
                break;
              case 'multiple':
                U = j;
              default:
                n.hasOwnProperty(c) || He(e, t, c, null, n, j);
            }
        for (s in n)
          if (((c = n[s]), (j = a[s]), n.hasOwnProperty(s) && (c != null || j != null)))
            switch (s) {
              case 'value':
                H = c;
                break;
              case 'defaultValue':
                k = c;
                break;
              case 'multiple':
                _ = c;
              default:
                c !== j && He(e, t, s, c, n, j);
            }
        ((t = k),
          (a = _),
          (n = U),
          H != null
            ? en(e, !!a, H, !1)
            : !!n != !!a && (t != null ? en(e, !!a, t, !0) : en(e, !!a, a ? [] : '', !1)));
        return;
      case 'textarea':
        U = H = null;
        for (k in a)
          if (((s = a[k]), a.hasOwnProperty(k) && s != null && !n.hasOwnProperty(k)))
            switch (k) {
              case 'value':
                break;
              case 'children':
                break;
              default:
                He(e, t, k, null, n, s);
            }
        for (_ in n)
          if (((s = n[_]), (c = a[_]), n.hasOwnProperty(_) && (s != null || c != null)))
            switch (_) {
              case 'value':
                H = s;
                break;
              case 'defaultValue':
                U = s;
                break;
              case 'children':
                break;
              case 'dangerouslySetInnerHTML':
                if (s != null) throw Error(r(91));
                break;
              default:
                s !== c && He(e, t, _, s, n, c);
            }
        Bd(e, H, U);
        return;
      case 'option':
        for (var oe in a)
          if (((H = a[oe]), a.hasOwnProperty(oe) && H != null && !n.hasOwnProperty(oe)))
            switch (oe) {
              case 'selected':
                e.selected = !1;
                break;
              default:
                He(e, t, oe, null, n, H);
            }
        for (j in n)
          if (((H = n[j]), (U = a[j]), n.hasOwnProperty(j) && H !== U && (H != null || U != null)))
            switch (j) {
              case 'selected':
                e.selected = H && typeof H != 'function' && typeof H != 'symbol';
                break;
              default:
                He(e, t, j, H, n, U);
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
        for (var ge in a)
          ((H = a[ge]),
            a.hasOwnProperty(ge) && H != null && !n.hasOwnProperty(ge) && He(e, t, ge, null, n, H));
        for (z in n)
          if (((H = n[z]), (U = a[z]), n.hasOwnProperty(z) && H !== U && (H != null || U != null)))
            switch (z) {
              case 'children':
              case 'dangerouslySetInnerHTML':
                if (H != null) throw Error(r(137, t));
                break;
              default:
                He(e, t, z, H, n, U);
            }
        return;
      default:
        if (ro(t)) {
          for (var Ue in a)
            ((H = a[Ue]),
              a.hasOwnProperty(Ue) &&
                H !== void 0 &&
                !n.hasOwnProperty(Ue) &&
                Kc(e, t, Ue, void 0, n, H));
          for (G in n)
            ((H = n[G]),
              (U = a[G]),
              !n.hasOwnProperty(G) ||
                H === U ||
                (H === void 0 && U === void 0) ||
                Kc(e, t, G, H, n, U));
          return;
        }
    }
    for (var O in a)
      ((H = a[O]),
        a.hasOwnProperty(O) && H != null && !n.hasOwnProperty(O) && He(e, t, O, null, n, H));
    for (Z in n)
      ((H = n[Z]),
        (U = a[Z]),
        !n.hasOwnProperty(Z) || H === U || (H == null && U == null) || He(e, t, Z, H, n, U));
  }
  function Rf(e) {
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
  function hv() {
    if (typeof performance.getEntriesByType == 'function') {
      for (
        var e = 0, t = 0, a = performance.getEntriesByType('resource'), n = 0;
        n < a.length;
        n++
      ) {
        var s = a[n],
          c = s.transferSize,
          _ = s.initiatorType,
          k = s.duration;
        if (c && k && Rf(_)) {
          for (_ = 0, k = s.responseEnd, n += 1; n < a.length; n++) {
            var j = a[n],
              z = j.startTime;
            if (z > k) break;
            var G = j.transferSize,
              Z = j.initiatorType;
            G && Rf(Z) && ((j = j.responseEnd), (_ += G * (j < k ? 1 : (k - z) / (j - z))));
          }
          if ((--n, (t += (8 * (c + _)) / (s.duration / 1e3)), e++, 10 < e)) break;
        }
      }
      if (0 < e) return t / e / 1e6;
    }
    return navigator.connection && ((e = navigator.connection.downlink), typeof e == 'number')
      ? e
      : 5;
  }
  var Zc = null,
    Jc = null;
  function dr(e) {
    return e.nodeType === 9 ? e : e.ownerDocument;
  }
  function zf(e) {
    switch (e) {
      case 'http://www.w3.org/2000/svg':
        return 1;
      case 'http://www.w3.org/1998/Math/MathML':
        return 2;
      default:
        return 0;
    }
  }
  function Hf(e, t) {
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
  function Pc(e, t) {
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
  var Fc = null;
  function gv() {
    var e = window.event;
    return e && e.type === 'popstate' ? (e === Fc ? !1 : ((Fc = e), !0)) : ((Fc = null), !1);
  }
  var Uf = typeof setTimeout == 'function' ? setTimeout : void 0,
    kv = typeof clearTimeout == 'function' ? clearTimeout : void 0,
    $f = typeof Promise == 'function' ? Promise : void 0,
    vv =
      typeof queueMicrotask == 'function'
        ? queueMicrotask
        : typeof $f < 'u'
          ? function (e) {
              return $f.resolve(null).then(e).catch(yv);
            }
          : Uf;
  function yv(e) {
    setTimeout(function () {
      throw e;
    });
  }
  function _a(e) {
    return e === 'head';
  }
  function Gf(e, t) {
    var a = t,
      n = 0;
    do {
      var s = a.nextSibling;
      if ((e.removeChild(a), s && s.nodeType === 8))
        if (((a = s.data), a === '/$' || a === '/&')) {
          if (n === 0) {
            (e.removeChild(s), Bn(t));
            return;
          }
          n--;
        } else if (a === '$' || a === '$?' || a === '$~' || a === '$!' || a === '&') n++;
        else if (a === 'html') Oi(e.ownerDocument.documentElement);
        else if (a === 'head') {
          ((a = e.ownerDocument.head), Oi(a));
          for (var c = a.firstChild; c; ) {
            var _ = c.nextSibling,
              k = c.nodeName;
            (c[Fn] ||
              k === 'SCRIPT' ||
              k === 'STYLE' ||
              (k === 'LINK' && c.rel.toLowerCase() === 'stylesheet') ||
              a.removeChild(c),
              (c = _));
          }
        } else a === 'body' && Oi(e.ownerDocument.body);
      a = s;
    } while (a);
    Bn(t);
  }
  function Yf(e, t) {
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
  function Wc(e) {
    var t = e.firstChild;
    for (t && t.nodeType === 10 && (t = t.nextSibling); t; ) {
      var a = t;
      switch (((t = t.nextSibling), a.nodeName)) {
        case 'HTML':
        case 'HEAD':
        case 'BODY':
          (Wc(a), ao(a));
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
  function bv(e, t, a, n) {
    for (; e.nodeType === 1; ) {
      var s = a;
      if (e.nodeName.toLowerCase() !== t.toLowerCase()) {
        if (!n && (e.nodeName !== 'INPUT' || e.type !== 'hidden')) break;
      } else if (n) {
        if (!e[Fn])
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
                c !== s.rel ||
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
                ((c = e.getAttribute('src')),
                (c !== (s.src == null ? null : s.src) ||
                  e.getAttribute('type') !== (s.type == null ? null : s.type) ||
                  e.getAttribute('crossorigin') !==
                    (s.crossOrigin == null ? null : s.crossOrigin)) &&
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
        var c = s.name == null ? null : '' + s.name;
        if (s.type === 'hidden' && e.getAttribute('name') === c) return e;
      } else return e;
      if (((e = Jt(e.nextSibling)), e === null)) break;
    }
    return null;
  }
  function xv(e, t, a) {
    if (t === '') return null;
    for (; e.nodeType !== 3; )
      if (
        ((e.nodeType !== 1 || e.nodeName !== 'INPUT' || e.type !== 'hidden') && !a) ||
        ((e = Jt(e.nextSibling)), e === null)
      )
        return null;
    return e;
  }
  function Xf(e, t) {
    for (; e.nodeType !== 8; )
      if (
        ((e.nodeType !== 1 || e.nodeName !== 'INPUT' || e.type !== 'hidden') && !t) ||
        ((e = Jt(e.nextSibling)), e === null)
      )
        return null;
    return e;
  }
  function eu(e) {
    return e.data === '$?' || e.data === '$~';
  }
  function tu(e) {
    return e.data === '$!' || (e.data === '$?' && e.ownerDocument.readyState !== 'loading');
  }
  function Sv(e, t) {
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
  var lu = null;
  function Vf(e) {
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
  function Qf(e) {
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
  function Kf(e, t, a) {
    switch (((t = dr(a)), e)) {
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
  function Oi(e) {
    for (var t = e.attributes; t.length; ) e.removeAttributeNode(t[0]);
    ao(e);
  }
  var Pt = new Map(),
    Zf = new Set();
  function mr(e) {
    return typeof e.getRootNode == 'function'
      ? e.getRootNode()
      : e.nodeType === 9
        ? e
        : e.ownerDocument;
  }
  var Hl = J.d;
  J.d = { f: wv, r: Tv, D: jv, C: Nv, L: Ev, m: Cv, X: Lv, S: Av, M: qv };
  function wv() {
    var e = Hl.f(),
      t = ar();
    return e || t;
  }
  function Tv(e) {
    var t = Pa(e);
    t !== null && t.tag === 5 && t.type === 'form' ? d_(t) : Hl.r(e);
  }
  var An = typeof document > 'u' ? null : document;
  function Jf(e, t, a) {
    var n = An;
    if (n && typeof t == 'string' && t) {
      var s = Gt(t);
      ((s = 'link[rel="' + e + '"][href="' + s + '"]'),
        typeof a == 'string' && (s += '[crossorigin="' + a + '"]'),
        Zf.has(s) ||
          (Zf.add(s),
          (e = { rel: e, crossOrigin: a, href: t }),
          n.querySelector(s) === null &&
            ((t = n.createElement('link')), vt(t, 'link', e), ut(t), n.head.appendChild(t))));
    }
  }
  function jv(e) {
    (Hl.D(e), Jf('dns-prefetch', e, null));
  }
  function Nv(e, t) {
    (Hl.C(e, t), Jf('preconnect', e, t));
  }
  function Ev(e, t, a) {
    Hl.L(e, t, a);
    var n = An;
    if (n && e && t) {
      var s = 'link[rel="preload"][as="' + Gt(t) + '"]';
      t === 'image' && a && a.imageSrcSet
        ? ((s += '[imagesrcset="' + Gt(a.imageSrcSet) + '"]'),
          typeof a.imageSizes == 'string' && (s += '[imagesizes="' + Gt(a.imageSizes) + '"]'))
        : (s += '[href="' + Gt(e) + '"]');
      var c = s;
      switch (t) {
        case 'style':
          c = Ln(e);
          break;
        case 'script':
          c = qn(e);
      }
      Pt.has(c) ||
        ((e = v(
          { rel: 'preload', href: t === 'image' && a && a.imageSrcSet ? void 0 : e, as: t },
          a
        )),
        Pt.set(c, e),
        n.querySelector(s) !== null ||
          (t === 'style' && n.querySelector(Ii(c))) ||
          (t === 'script' && n.querySelector(Mi(c))) ||
          ((t = n.createElement('link')), vt(t, 'link', e), ut(t), n.head.appendChild(t)));
    }
  }
  function Cv(e, t) {
    Hl.m(e, t);
    var a = An;
    if (a && e) {
      var n = t && typeof t.as == 'string' ? t.as : 'script',
        s = 'link[rel="modulepreload"][as="' + Gt(n) + '"][href="' + Gt(e) + '"]',
        c = s;
      switch (n) {
        case 'audioworklet':
        case 'paintworklet':
        case 'serviceworker':
        case 'sharedworker':
        case 'worker':
        case 'script':
          c = qn(e);
      }
      if (
        !Pt.has(c) &&
        ((e = v({ rel: 'modulepreload', href: e }, t)), Pt.set(c, e), a.querySelector(s) === null)
      ) {
        switch (n) {
          case 'audioworklet':
          case 'paintworklet':
          case 'serviceworker':
          case 'sharedworker':
          case 'worker':
          case 'script':
            if (a.querySelector(Mi(c))) return;
        }
        ((n = a.createElement('link')), vt(n, 'link', e), ut(n), a.head.appendChild(n));
      }
    }
  }
  function Av(e, t, a) {
    Hl.S(e, t, a);
    var n = An;
    if (n && e) {
      var s = Fa(n).hoistableStyles,
        c = Ln(e);
      t = t || 'default';
      var _ = s.get(c);
      if (!_) {
        var k = { loading: 0, preload: null };
        if ((_ = n.querySelector(Ii(c)))) k.loading = 5;
        else {
          ((e = v({ rel: 'stylesheet', href: e, 'data-precedence': t }, a)),
            (a = Pt.get(c)) && au(e, a));
          var j = (_ = n.createElement('link'));
          (ut(j),
            vt(j, 'link', e),
            (j._p = new Promise(function (z, G) {
              ((j.onload = z), (j.onerror = G));
            })),
            j.addEventListener('load', function () {
              k.loading |= 1;
            }),
            j.addEventListener('error', function () {
              k.loading |= 2;
            }),
            (k.loading |= 4),
            _r(_, t, n));
        }
        ((_ = { type: 'stylesheet', instance: _, count: 1, state: k }), s.set(c, _));
      }
    }
  }
  function Lv(e, t) {
    Hl.X(e, t);
    var a = An;
    if (a && e) {
      var n = Fa(a).hoistableScripts,
        s = qn(e),
        c = n.get(s);
      c ||
        ((c = a.querySelector(Mi(s))),
        c ||
          ((e = v({ src: e, async: !0 }, t)),
          (t = Pt.get(s)) && nu(e, t),
          (c = a.createElement('script')),
          ut(c),
          vt(c, 'link', e),
          a.head.appendChild(c)),
        (c = { type: 'script', instance: c, count: 1, state: null }),
        n.set(s, c));
    }
  }
  function qv(e, t) {
    Hl.M(e, t);
    var a = An;
    if (a && e) {
      var n = Fa(a).hoistableScripts,
        s = qn(e),
        c = n.get(s);
      c ||
        ((c = a.querySelector(Mi(s))),
        c ||
          ((e = v({ src: e, async: !0, type: 'module' }, t)),
          (t = Pt.get(s)) && nu(e, t),
          (c = a.createElement('script')),
          ut(c),
          vt(c, 'link', e),
          a.head.appendChild(c)),
        (c = { type: 'script', instance: c, count: 1, state: null }),
        n.set(s, c));
    }
  }
  function Pf(e, t, a, n) {
    var s = (s = me.current) ? mr(s) : null;
    if (!s) throw Error(r(446));
    switch (e) {
      case 'meta':
      case 'title':
        return null;
      case 'style':
        return typeof a.precedence == 'string' && typeof a.href == 'string'
          ? ((t = Ln(a.href)),
            (a = Fa(s).hoistableStyles),
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
          e = Ln(a.href);
          var c = Fa(s).hoistableStyles,
            _ = c.get(e);
          if (
            (_ ||
              ((s = s.ownerDocument || s),
              (_ = {
                type: 'stylesheet',
                instance: null,
                count: 0,
                state: { loading: 0, preload: null },
              }),
              c.set(e, _),
              (c = s.querySelector(Ii(e))) && !c._p && ((_.instance = c), (_.state.loading = 5)),
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
                c || Bv(s, e, a, _.state))),
            t && n === null)
          )
            throw Error(r(528, ''));
          return _;
        }
        if (t && n !== null) throw Error(r(529, ''));
        return null;
      case 'script':
        return (
          (t = a.async),
          (a = a.src),
          typeof a == 'string' && t && typeof t != 'function' && typeof t != 'symbol'
            ? ((t = qn(a)),
              (a = Fa(s).hoistableScripts),
              (n = a.get(t)),
              n || ((n = { type: 'script', instance: null, count: 0, state: null }), a.set(t, n)),
              n)
            : { type: 'void', instance: null, count: 0, state: null }
        );
      default:
        throw Error(r(444, e));
    }
  }
  function Ln(e) {
    return 'href="' + Gt(e) + '"';
  }
  function Ii(e) {
    return 'link[rel="stylesheet"][' + e + ']';
  }
  function Ff(e) {
    return v({}, e, { 'data-precedence': e.precedence, precedence: null });
  }
  function Bv(e, t, a, n) {
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
        vt(t, 'link', a),
        ut(t),
        e.head.appendChild(t));
  }
  function qn(e) {
    return '[src="' + Gt(e) + '"]';
  }
  function Mi(e) {
    return 'script[async]' + e;
  }
  function Wf(e, t, a) {
    if ((t.count++, t.instance === null))
      switch (t.type) {
        case 'style':
          var n = e.querySelector('style[data-href~="' + Gt(a.href) + '"]');
          if (n) return ((t.instance = n), ut(n), n);
          var s = v({}, a, {
            'data-href': a.href,
            'data-precedence': a.precedence,
            href: null,
            precedence: null,
          });
          return (
            (n = (e.ownerDocument || e).createElement('style')),
            ut(n),
            vt(n, 'style', s),
            _r(n, a.precedence, e),
            (t.instance = n)
          );
        case 'stylesheet':
          s = Ln(a.href);
          var c = e.querySelector(Ii(s));
          if (c) return ((t.state.loading |= 4), (t.instance = c), ut(c), c);
          ((n = Ff(a)),
            (s = Pt.get(s)) && au(n, s),
            (c = (e.ownerDocument || e).createElement('link')),
            ut(c));
          var _ = c;
          return (
            (_._p = new Promise(function (k, j) {
              ((_.onload = k), (_.onerror = j));
            })),
            vt(c, 'link', n),
            (t.state.loading |= 4),
            _r(c, a.precedence, e),
            (t.instance = c)
          );
        case 'script':
          return (
            (c = qn(a.src)),
            (s = e.querySelector(Mi(c)))
              ? ((t.instance = s), ut(s), s)
              : ((n = a),
                (s = Pt.get(c)) && ((n = v({}, a)), nu(n, s)),
                (e = e.ownerDocument || e),
                (s = e.createElement('script')),
                ut(s),
                vt(s, 'link', n),
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
        ((n = t.instance), (t.state.loading |= 4), _r(n, a.precedence, e));
    return t.instance;
  }
  function _r(e, t, a) {
    for (
      var n = a.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),
        s = n.length ? n[n.length - 1] : null,
        c = s,
        _ = 0;
      _ < n.length;
      _++
    ) {
      var k = n[_];
      if (k.dataset.precedence === t) c = k;
      else if (c !== s) break;
    }
    c
      ? c.parentNode.insertBefore(e, c.nextSibling)
      : ((t = a.nodeType === 9 ? a.head : a), t.insertBefore(e, t.firstChild));
  }
  function au(e, t) {
    (e.crossOrigin == null && (e.crossOrigin = t.crossOrigin),
      e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy),
      e.title == null && (e.title = t.title));
  }
  function nu(e, t) {
    (e.crossOrigin == null && (e.crossOrigin = t.crossOrigin),
      e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy),
      e.integrity == null && (e.integrity = t.integrity));
  }
  var fr = null;
  function ep(e, t, a) {
    if (fr === null) {
      var n = new Map(),
        s = (fr = new Map());
      s.set(a, n);
    } else ((s = fr), (n = s.get(a)), n || ((n = new Map()), s.set(a, n)));
    if (n.has(e)) return n;
    for (n.set(e, null), a = a.getElementsByTagName(e), s = 0; s < a.length; s++) {
      var c = a[s];
      if (
        !(c[Fn] || c[pt] || (e === 'link' && c.getAttribute('rel') === 'stylesheet')) &&
        c.namespaceURI !== 'http://www.w3.org/2000/svg'
      ) {
        var _ = c.getAttribute(t) || '';
        _ = e + _;
        var k = n.get(_);
        k ? k.push(c) : n.set(_, [c]);
      }
    }
    return n;
  }
  function tp(e, t, a) {
    ((e = e.ownerDocument || e),
      e.head.insertBefore(a, t === 'title' ? e.querySelector('head > title') : null));
  }
  function Ov(e, t, a) {
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
  function lp(e) {
    return !(e.type === 'stylesheet' && (e.state.loading & 3) === 0);
  }
  function Iv(e, t, a, n) {
    if (
      a.type === 'stylesheet' &&
      (typeof n.media != 'string' || matchMedia(n.media).matches !== !1) &&
      (a.state.loading & 4) === 0
    ) {
      if (a.instance === null) {
        var s = Ln(n.href),
          c = t.querySelector(Ii(s));
        if (c) {
          ((t = c._p),
            t !== null &&
              typeof t == 'object' &&
              typeof t.then == 'function' &&
              (e.count++, (e = pr.bind(e)), t.then(e, e)),
            (a.state.loading |= 4),
            (a.instance = c),
            ut(c));
          return;
        }
        ((c = t.ownerDocument || t),
          (n = Ff(n)),
          (s = Pt.get(s)) && au(n, s),
          (c = c.createElement('link')),
          ut(c));
        var _ = c;
        ((_._p = new Promise(function (k, j) {
          ((_.onload = k), (_.onerror = j));
        })),
          vt(c, 'link', n),
          (a.instance = c));
      }
      (e.stylesheets === null && (e.stylesheets = new Map()),
        e.stylesheets.set(a, t),
        (t = a.state.preload) &&
          (a.state.loading & 3) === 0 &&
          (e.count++,
          (a = pr.bind(e)),
          t.addEventListener('load', a),
          t.addEventListener('error', a)));
    }
  }
  var iu = 0;
  function Mv(e, t) {
    return (
      e.stylesheets && e.count === 0 && gr(e, e.stylesheets),
      0 < e.count || 0 < e.imgCount
        ? function (a) {
            var n = setTimeout(function () {
              if ((e.stylesheets && gr(e, e.stylesheets), e.unsuspend)) {
                var c = e.unsuspend;
                ((e.unsuspend = null), c());
              }
            }, 6e4 + t);
            0 < e.imgBytes && iu === 0 && (iu = 62500 * hv());
            var s = setTimeout(
              function () {
                if (
                  ((e.waitingForImages = !1),
                  e.count === 0 && (e.stylesheets && gr(e, e.stylesheets), e.unsuspend))
                ) {
                  var c = e.unsuspend;
                  ((e.unsuspend = null), c());
                }
              },
              (e.imgBytes > iu ? 50 : 800) + t
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
  function pr() {
    if ((this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages))) {
      if (this.stylesheets) gr(this, this.stylesheets);
      else if (this.unsuspend) {
        var e = this.unsuspend;
        ((this.unsuspend = null), e());
      }
    }
  }
  var hr = null;
  function gr(e, t) {
    ((e.stylesheets = null),
      e.unsuspend !== null &&
        (e.count++, (hr = new Map()), t.forEach(Dv, e), (hr = null), pr.call(e)));
  }
  function Dv(e, t) {
    if (!(t.state.loading & 4)) {
      var a = hr.get(e);
      if (a) var n = a.get(null);
      else {
        ((a = new Map()), hr.set(e, a));
        for (
          var s = e.querySelectorAll('link[data-precedence],style[data-precedence]'), c = 0;
          c < s.length;
          c++
        ) {
          var _ = s[c];
          (_.nodeName === 'LINK' || _.getAttribute('media') !== 'not all') &&
            (a.set(_.dataset.precedence, _), (n = _));
        }
        n && a.set(null, n);
      }
      ((s = t.instance),
        (_ = s.getAttribute('data-precedence')),
        (c = a.get(_) || n),
        c === n && a.set(null, s),
        a.set(_, s),
        this.count++,
        (n = pr.bind(this)),
        s.addEventListener('load', n),
        s.addEventListener('error', n),
        c
          ? c.parentNode.insertBefore(s, c.nextSibling)
          : ((e = e.nodeType === 9 ? e.head : e), e.insertBefore(s, e.firstChild)),
        (t.state.loading |= 4));
    }
  }
  var Di = {
    $$typeof: $,
    Provider: null,
    Consumer: null,
    _currentValue: ne,
    _currentValue2: ne,
    _threadCount: 0,
  };
  function Rv(e, t, a, n, s, c, _, k, j) {
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
      (this.expirationTimes = Wr(-1)),
      (this.entangledLanes =
        this.shellSuspendCounter =
        this.errorRecoveryDisabledLanes =
        this.expiredLanes =
        this.warmLanes =
        this.pingedLanes =
        this.suspendedLanes =
        this.pendingLanes =
          0),
      (this.entanglements = Wr(0)),
      (this.hiddenUpdates = Wr(null)),
      (this.identifierPrefix = n),
      (this.onUncaughtError = s),
      (this.onCaughtError = c),
      (this.onRecoverableError = _),
      (this.pooledCache = null),
      (this.pooledCacheLanes = 0),
      (this.formState = j),
      (this.incompleteTransitions = new Map()));
  }
  function ap(e, t, a, n, s, c, _, k, j, z, G, Z) {
    return (
      (e = new Rv(e, t, a, _, j, z, G, Z, k)),
      (t = 1),
      c === !0 && (t |= 24),
      (c = Ot(3, null, null, t)),
      (e.current = c),
      (c.stateNode = e),
      (t = Ro()),
      t.refCount++,
      (e.pooledCache = t),
      t.refCount++,
      (c.memoizedState = { element: n, isDehydrated: a, cache: t }),
      $o(c),
      e
    );
  }
  function np(e) {
    return e ? ((e = cn), e) : cn;
  }
  function ip(e, t, a, n, s, c) {
    ((s = np(s)),
      n.context === null ? (n.context = s) : (n.pendingContext = s),
      (n = la(t)),
      (n.payload = { element: a }),
      (c = c === void 0 ? null : c),
      c !== null && (n.callback = c),
      (a = aa(e, n, t)),
      a !== null && (At(a, e, t), pi(a, e, t)));
  }
  function sp(e, t) {
    if (((e = e.memoizedState), e !== null && e.dehydrated !== null)) {
      var a = e.retryLane;
      e.retryLane = a !== 0 && a < t ? a : t;
    }
  }
  function su(e, t) {
    (sp(e, t), (e = e.alternate) && sp(e, t));
  }
  function rp(e) {
    if (e.tag === 13 || e.tag === 31) {
      var t = Na(e, 67108864);
      (t !== null && At(t, e, 67108864), su(e, 67108864));
    }
  }
  function op(e) {
    if (e.tag === 13 || e.tag === 31) {
      var t = zt();
      t = eo(t);
      var a = Na(e, t);
      (a !== null && At(a, e, t), su(e, t));
    }
  }
  var kr = !0;
  function zv(e, t, a, n) {
    var s = q.T;
    q.T = null;
    var c = J.p;
    try {
      ((J.p = 2), ru(e, t, a, n));
    } finally {
      ((J.p = c), (q.T = s));
    }
  }
  function Hv(e, t, a, n) {
    var s = q.T;
    q.T = null;
    var c = J.p;
    try {
      ((J.p = 8), ru(e, t, a, n));
    } finally {
      ((J.p = c), (q.T = s));
    }
  }
  function ru(e, t, a, n) {
    if (kr) {
      var s = ou(n);
      if (s === null) (Qc(e, t, n, vr, a), up(e, n));
      else if ($v(s, e, t, a, n)) n.stopPropagation();
      else if ((up(e, n), t & 4 && -1 < Uv.indexOf(e))) {
        for (; s !== null; ) {
          var c = Pa(s);
          if (c !== null)
            switch (c.tag) {
              case 3:
                if (((c = c.stateNode), c.current.memoizedState.isDehydrated)) {
                  var _ = xa(c.pendingLanes);
                  if (_ !== 0) {
                    var k = c;
                    for (k.pendingLanes |= 2, k.entangledLanes |= 2; _; ) {
                      var j = 1 << (31 - qt(_));
                      ((k.entanglements[1] |= j), (_ &= ~j));
                    }
                    (gl(c), (Oe & 6) === 0 && ((tr = bt() + 500), Li(0)));
                  }
                }
                break;
              case 31:
              case 13:
                ((k = Na(c, 2)), k !== null && At(k, c, 2), ar(), su(c, 2));
            }
          if (((c = ou(n)), c === null && Qc(e, t, n, vr, a), c === s)) break;
          s = c;
        }
        s !== null && n.stopPropagation();
      } else Qc(e, t, n, null, a);
    }
  }
  function ou(e) {
    return ((e = co(e)), cu(e));
  }
  var vr = null;
  function cu(e) {
    if (((vr = null), (e = Ja(e)), e !== null)) {
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
    return ((vr = e), null);
  }
  function cp(e) {
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
        switch (B()) {
          case le:
            return 2;
          case re:
            return 8;
          case he:
          case Ze:
            return 32;
          case Ql:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var uu = !1,
    fa = null,
    pa = null,
    ha = null,
    Ri = new Map(),
    zi = new Map(),
    ga = [],
    Uv =
      'mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset'.split(
        ' '
      );
  function up(e, t) {
    switch (e) {
      case 'focusin':
      case 'focusout':
        fa = null;
        break;
      case 'dragenter':
      case 'dragleave':
        pa = null;
        break;
      case 'mouseover':
      case 'mouseout':
        ha = null;
        break;
      case 'pointerover':
      case 'pointerout':
        Ri.delete(t.pointerId);
        break;
      case 'gotpointercapture':
      case 'lostpointercapture':
        zi.delete(t.pointerId);
    }
  }
  function Hi(e, t, a, n, s, c) {
    return e === null || e.nativeEvent !== c
      ? ((e = {
          blockedOn: t,
          domEventName: a,
          eventSystemFlags: n,
          nativeEvent: c,
          targetContainers: [s],
        }),
        t !== null && ((t = Pa(t)), t !== null && rp(t)),
        e)
      : ((e.eventSystemFlags |= n),
        (t = e.targetContainers),
        s !== null && t.indexOf(s) === -1 && t.push(s),
        e);
  }
  function $v(e, t, a, n, s) {
    switch (t) {
      case 'focusin':
        return ((fa = Hi(fa, e, t, a, n, s)), !0);
      case 'dragenter':
        return ((pa = Hi(pa, e, t, a, n, s)), !0);
      case 'mouseover':
        return ((ha = Hi(ha, e, t, a, n, s)), !0);
      case 'pointerover':
        var c = s.pointerId;
        return (Ri.set(c, Hi(Ri.get(c) || null, e, t, a, n, s)), !0);
      case 'gotpointercapture':
        return ((c = s.pointerId), zi.set(c, Hi(zi.get(c) || null, e, t, a, n, s)), !0);
    }
    return !1;
  }
  function dp(e) {
    var t = Ja(e.target);
    if (t !== null) {
      var a = d(t);
      if (a !== null) {
        if (((t = a.tag), t === 13)) {
          if (((t = f(a)), t !== null)) {
            ((e.blockedOn = t),
              wd(e.priority, function () {
                op(a);
              }));
            return;
          }
        } else if (t === 31) {
          if (((t = h(a)), t !== null)) {
            ((e.blockedOn = t),
              wd(e.priority, function () {
                op(a);
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
  function yr(e) {
    if (e.blockedOn !== null) return !1;
    for (var t = e.targetContainers; 0 < t.length; ) {
      var a = ou(e.nativeEvent);
      if (a === null) {
        a = e.nativeEvent;
        var n = new a.constructor(a.type, a);
        ((oo = n), a.target.dispatchEvent(n), (oo = null));
      } else return ((t = Pa(a)), t !== null && rp(t), (e.blockedOn = a), !1);
      t.shift();
    }
    return !0;
  }
  function mp(e, t, a) {
    yr(e) && a.delete(t);
  }
  function Gv() {
    ((uu = !1),
      fa !== null && yr(fa) && (fa = null),
      pa !== null && yr(pa) && (pa = null),
      ha !== null && yr(ha) && (ha = null),
      Ri.forEach(mp),
      zi.forEach(mp));
  }
  function br(e, t) {
    e.blockedOn === t &&
      ((e.blockedOn = null),
      uu || ((uu = !0), l.unstable_scheduleCallback(l.unstable_NormalPriority, Gv)));
  }
  var xr = null;
  function _p(e) {
    xr !== e &&
      ((xr = e),
      l.unstable_scheduleCallback(l.unstable_NormalPriority, function () {
        xr === e && (xr = null);
        for (var t = 0; t < e.length; t += 3) {
          var a = e[t],
            n = e[t + 1],
            s = e[t + 2];
          if (typeof n != 'function') {
            if (cu(n || a) === null) continue;
            break;
          }
          var c = Pa(a);
          c !== null &&
            (e.splice(t, 3),
            (t -= 3),
            oc(c, { pending: !0, data: s, method: a.method, action: n }, n, s));
        }
      }));
  }
  function Bn(e) {
    function t(j) {
      return br(j, e);
    }
    (fa !== null && br(fa, e),
      pa !== null && br(pa, e),
      ha !== null && br(ha, e),
      Ri.forEach(t),
      zi.forEach(t));
    for (var a = 0; a < ga.length; a++) {
      var n = ga[a];
      n.blockedOn === e && (n.blockedOn = null);
    }
    for (; 0 < ga.length && ((a = ga[0]), a.blockedOn === null); )
      (dp(a), a.blockedOn === null && ga.shift());
    if (((a = (e.ownerDocument || e).$$reactFormReplay), a != null))
      for (n = 0; n < a.length; n += 3) {
        var s = a[n],
          c = a[n + 1],
          _ = s[wt] || null;
        if (typeof c == 'function') _ || _p(a);
        else if (_) {
          var k = null;
          if (c && c.hasAttribute('formAction')) {
            if (((s = c), (_ = c[wt] || null))) k = _.formAction;
            else if (cu(s) !== null) continue;
          } else k = _.action;
          (typeof k == 'function' ? (a[n + 1] = k) : (a.splice(n, 3), (n -= 3)), _p(a));
        }
      }
  }
  function fp() {
    function e(c) {
      c.canIntercept &&
        c.info === 'react-transition' &&
        c.intercept({
          handler: function () {
            return new Promise(function (_) {
              return (s = _);
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
  function du(e) {
    this._internalRoot = e;
  }
  ((Sr.prototype.render = du.prototype.render =
    function (e) {
      var t = this._internalRoot;
      if (t === null) throw Error(r(409));
      var a = t.current,
        n = zt();
      ip(a, n, e, t, null, null);
    }),
    (Sr.prototype.unmount = du.prototype.unmount =
      function () {
        var e = this._internalRoot;
        if (e !== null) {
          this._internalRoot = null;
          var t = e.containerInfo;
          (ip(e.current, 2, null, e, null, null), ar(), (t[Za] = null));
        }
      }));
  function Sr(e) {
    this._internalRoot = e;
  }
  Sr.prototype.unstable_scheduleHydration = function (e) {
    if (e) {
      var t = Sd();
      e = { blockedOn: null, target: e, priority: t };
      for (var a = 0; a < ga.length && t !== 0 && t < ga[a].priority; a++);
      (ga.splice(a, 0, e), a === 0 && dp(e));
    }
  };
  var pp = i.version;
  if (pp !== '19.2.5') throw Error(r(527, pp, '19.2.5'));
  J.findDOMNode = function (e) {
    var t = e._reactInternals;
    if (t === void 0)
      throw typeof e.render == 'function'
        ? Error(r(188))
        : ((e = Object.keys(e).join(',')), Error(r(268, e)));
    return ((e = g(t)), (e = e !== null ? y(e) : null), (e = e === null ? null : e.stateNode), e);
  };
  var Yv = {
    bundleType: 0,
    version: '19.2.5',
    rendererPackageName: 'react-dom',
    currentDispatcherRef: q,
    reconcilerVersion: '19.2.5',
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < 'u') {
    var wr = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!wr.isDisabled && wr.supportsFiber)
      try {
        ((xl = wr.inject(Yv)), (Lt = wr));
      } catch {}
  }
  return (
    ($i.createRoot = function (e, t) {
      if (!u(e)) throw Error(r(299));
      var a = !1,
        n = '',
        s = b_,
        c = x_,
        _ = S_;
      return (
        t != null &&
          (t.unstable_strictMode === !0 && (a = !0),
          t.identifierPrefix !== void 0 && (n = t.identifierPrefix),
          t.onUncaughtError !== void 0 && (s = t.onUncaughtError),
          t.onCaughtError !== void 0 && (c = t.onCaughtError),
          t.onRecoverableError !== void 0 && (_ = t.onRecoverableError)),
        (t = ap(e, 1, !1, null, null, a, n, null, s, c, _, fp)),
        (e[Za] = t.current),
        Vc(e),
        new du(t)
      );
    }),
    ($i.hydrateRoot = function (e, t, a) {
      if (!u(e)) throw Error(r(299));
      var n = !1,
        s = '',
        c = b_,
        _ = x_,
        k = S_,
        j = null;
      return (
        a != null &&
          (a.unstable_strictMode === !0 && (n = !0),
          a.identifierPrefix !== void 0 && (s = a.identifierPrefix),
          a.onUncaughtError !== void 0 && (c = a.onUncaughtError),
          a.onCaughtError !== void 0 && (_ = a.onCaughtError),
          a.onRecoverableError !== void 0 && (k = a.onRecoverableError),
          a.formState !== void 0 && (j = a.formState)),
        (t = ap(e, 1, !0, t, a ?? null, n, s, j, c, _, k, fp)),
        (t.context = np(null)),
        (a = t.current),
        (n = zt()),
        (n = eo(n)),
        (s = la(n)),
        (s.callback = null),
        aa(a, s, n),
        (a = n),
        (t.current.lanes = a),
        Pn(t, a),
        gl(t),
        (e[Za] = t.current),
        Vc(e),
        new Sr(t)
      );
    }),
    ($i.version = '19.2.5'),
    $i
  );
}
var Tp;
function ly() {
  if (Tp) return fu.exports;
  Tp = 1;
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
  return (l(), (fu.exports = ty()), fu.exports);
}
var ay = ly(),
  w = Zu();
/**
 * react-router v7.14.2
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */ var jp = 'popstate';
function Np(l) {
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
function ny(l = {}) {
  function i(r, u) {
    var g;
    let d = (g = u.state) == null ? void 0 : g.masked,
      { pathname: f, search: h, hash: p } = d || r.location;
    return Ou(
      '',
      { pathname: f, search: h, hash: p },
      (u.state && u.state.usr) || null,
      (u.state && u.state.key) || 'default',
      d
        ? { pathname: r.location.pathname, search: r.location.search, hash: r.location.hash }
        : void 0
    );
  }
  function o(r, u) {
    return typeof u == 'string' ? u : Ji(u);
  }
  return sy(i, o, null, l);
}
function Pe(l, i) {
  if (l === !1 || l === null || typeof l > 'u') throw new Error(i);
}
function ol(l, i) {
  if (!l) {
    typeof console < 'u' && console.warn(i);
    try {
      throw new Error(i);
    } catch {}
  }
}
function iy() {
  return Math.random().toString(36).substring(2, 10);
}
function Ep(l, i) {
  return {
    usr: l.state,
    key: l.key,
    idx: i,
    masked: l.unstable_mask ? { pathname: l.pathname, search: l.search, hash: l.hash } : void 0,
  };
}
function Ou(l, i, o = null, r, u) {
  return {
    pathname: typeof l == 'string' ? l : l.pathname,
    search: '',
    hash: '',
    ...(typeof i == 'string' ? Gn(i) : i),
    state: o,
    key: (i && i.key) || r || iy(),
    unstable_mask: u,
  };
}
function Ji({ pathname: l = '/', search: i = '', hash: o = '' }) {
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
function sy(l, i, o, r = {}) {
  let { window: u = document.defaultView, v5Compat: d = !1 } = r,
    f = u.history,
    h = 'POP',
    p = null,
    g = y();
  g == null && ((g = 0), f.replaceState({ ...f.state, idx: g }, ''));
  function y() {
    return (f.state || { idx: null }).idx;
  }
  function v() {
    h = 'POP';
    let E = y(),
      x = E == null ? null : E - g;
    ((g = E), p && p({ action: h, location: S.location, delta: x }));
  }
  function I(E, x) {
    h = 'PUSH';
    let C = Np(E) ? E : Ou(S.location, E, x);
    g = y() + 1;
    let $ = Ep(C, g),
      D = S.createHref(C.unstable_mask || C);
    try {
      f.pushState($, '', D);
    } catch (ae) {
      if (ae instanceof DOMException && ae.name === 'DataCloneError') throw ae;
      u.location.assign(D);
    }
    d && p && p({ action: h, location: S.location, delta: 1 });
  }
  function L(E, x) {
    h = 'REPLACE';
    let C = Np(E) ? E : Ou(S.location, E, x);
    g = y();
    let $ = Ep(C, g),
      D = S.createHref(C.unstable_mask || C);
    (f.replaceState($, '', D), d && p && p({ action: h, location: S.location, delta: 0 }));
  }
  function M(E) {
    return ry(E);
  }
  let S = {
    get action() {
      return h;
    },
    get location() {
      return l(u, f);
    },
    listen(E) {
      if (p) throw new Error('A history only accepts one active listener');
      return (
        u.addEventListener(jp, v),
        (p = E),
        () => {
          (u.removeEventListener(jp, v), (p = null));
        }
      );
    },
    createHref(E) {
      return i(u, E);
    },
    createURL: M,
    encodeLocation(E) {
      let x = M(E);
      return { pathname: x.pathname, search: x.search, hash: x.hash };
    },
    push: I,
    replace: L,
    go(E) {
      return f.go(E);
    },
  };
  return S;
}
function ry(l, i = !1) {
  let o = 'http://localhost';
  (typeof window < 'u' &&
    (o = window.location.origin !== 'null' ? window.location.origin : window.location.href),
    Pe(o, 'No window.location.(origin|href) available to create URL'));
  let r = typeof l == 'string' ? l : Ji(l);
  return ((r = r.replace(/ $/, '%20')), !i && r.startsWith('//') && (r = o + r), new URL(r, o));
}
function uh(l, i, o = '/') {
  return oy(l, i, o, !1);
}
function oy(l, i, o, r) {
  let u = typeof i == 'string' ? Gn(i) : i,
    d = Xl(u.pathname || '/', o);
  if (d == null) return null;
  let f = dh(l);
  cy(f);
  let h = null;
  for (let p = 0; h == null && p < f.length; ++p) {
    let g = yy(d);
    h = ky(f[p], g, r);
  }
  return h;
}
function dh(l, i = [], o = [], r = '', u = !1) {
  let d = (f, h, p = u, g) => {
    let y = {
      relativePath: g === void 0 ? f.path || '' : g,
      caseSensitive: f.caseSensitive === !0,
      childrenIndex: h,
      route: f,
    };
    if (y.relativePath.startsWith('/')) {
      if (!y.relativePath.startsWith(r) && p) return;
      (Pe(
        y.relativePath.startsWith(r),
        `Absolute route path "${y.relativePath}" nested under path "${r}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`
      ),
        (y.relativePath = y.relativePath.slice(r.length)));
    }
    let v = rl([r, y.relativePath]),
      I = o.concat(y);
    (f.children &&
      f.children.length > 0 &&
      (Pe(
        f.index !== !0,
        `Index routes must not have child routes. Please remove all child routes from route path "${v}".`
      ),
      dh(f.children, i, I, v, p)),
      !(f.path == null && !f.index) && i.push({ path: v, score: hy(v, f.index), routesMeta: I }));
  };
  return (
    l.forEach((f, h) => {
      var p;
      if (f.path === '' || !((p = f.path) != null && p.includes('?'))) d(f, h);
      else for (let g of mh(f.path)) d(f, h, !0, g);
    }),
    i
  );
}
function mh(l) {
  let i = l.split('/');
  if (i.length === 0) return [];
  let [o, ...r] = i,
    u = o.endsWith('?'),
    d = o.replace(/\?$/, '');
  if (r.length === 0) return u ? [d, ''] : [d];
  let f = mh(r.join('/')),
    h = [];
  return (
    h.push(...f.map((p) => (p === '' ? d : [d, p].join('/')))),
    u && h.push(...f),
    h.map((p) => (l.startsWith('/') && p === '' ? '/' : p))
  );
}
function cy(l) {
  l.sort((i, o) =>
    i.score !== o.score
      ? o.score - i.score
      : gy(
          i.routesMeta.map((r) => r.childrenIndex),
          o.routesMeta.map((r) => r.childrenIndex)
        )
  );
}
var uy = /^:[\w-]+$/,
  dy = 3,
  my = 2,
  _y = 1,
  fy = 10,
  py = -2,
  Cp = (l) => l === '*';
function hy(l, i) {
  let o = l.split('/'),
    r = o.length;
  return (
    o.some(Cp) && (r += py),
    i && (r += my),
    o.filter((u) => !Cp(u)).reduce((u, d) => u + (uy.test(d) ? dy : d === '' ? _y : fy), r)
  );
}
function gy(l, i) {
  return l.length === i.length && l.slice(0, -1).every((r, u) => r === i[u])
    ? l[l.length - 1] - i[i.length - 1]
    : 0;
}
function ky(l, i, o = !1) {
  let { routesMeta: r } = l,
    u = {},
    d = '/',
    f = [];
  for (let h = 0; h < r.length; ++h) {
    let p = r[h],
      g = h === r.length - 1,
      y = d === '/' ? i : i.slice(d.length) || '/',
      v = Mr({ path: p.relativePath, caseSensitive: p.caseSensitive, end: g }, y),
      I = p.route;
    if (
      (!v &&
        g &&
        o &&
        !r[r.length - 1].route.index &&
        (v = Mr({ path: p.relativePath, caseSensitive: p.caseSensitive, end: !1 }, y)),
      !v)
    )
      return null;
    (Object.assign(u, v.params),
      f.push({
        params: u,
        pathname: rl([d, v.pathname]),
        pathnameBase: wy(rl([d, v.pathnameBase])),
        route: I,
      }),
      v.pathnameBase !== '/' && (d = rl([d, v.pathnameBase])));
  }
  return f;
}
function Mr(l, i) {
  typeof l == 'string' && (l = { path: l, caseSensitive: !1, end: !0 });
  let [o, r] = vy(l.path, l.caseSensitive, l.end),
    u = i.match(o);
  if (!u) return null;
  let d = u[0],
    f = d.replace(/(.)\/+$/, '$1'),
    h = u.slice(1);
  return {
    params: r.reduce((g, { paramName: y, isOptional: v }, I) => {
      if (y === '*') {
        let M = h[I] || '';
        f = d.slice(0, d.length - M.length).replace(/(.)\/+$/, '$1');
      }
      const L = h[I];
      return (v && !L ? (g[y] = void 0) : (g[y] = (L || '').replace(/%2F/g, '/')), g);
    }, {}),
    pathname: d,
    pathnameBase: f,
    pattern: l,
  };
}
function vy(l, i = !1, o = !0) {
  ol(
    l === '*' || !l.endsWith('*') || l.endsWith('/*'),
    `Route path "${l}" will be treated as if it were "${l.replace(/\*$/, '/*')}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${l.replace(/\*$/, '/*')}".`
  );
  let r = [],
    u =
      '^' +
      l
        .replace(/\/*\*?$/, '')
        .replace(/^\/*/, '/')
        .replace(/[\\.*+^${}|()[\]]/g, '\\$&')
        .replace(/\/:([\w-]+)(\?)?/g, (f, h, p, g, y) => {
          if ((r.push({ paramName: h, isOptional: p != null }), p)) {
            let v = y.charAt(g + f.length);
            return v && v !== '/' ? '/([^\\/]*)' : '(?:/([^\\/]*))?';
          }
          return '/([^\\/]+)';
        })
        .replace(/\/([\w-]+)\?(\/|$)/g, '(/$1)?$2');
  return (
    l.endsWith('*')
      ? (r.push({ paramName: '*' }), (u += l === '*' || l === '/*' ? '(.*)$' : '(?:\\/(.+)|\\/*)$'))
      : o
        ? (u += '\\/*$')
        : l !== '' && l !== '/' && (u += '(?:(?=\\/|$))'),
    [new RegExp(u, i ? void 0 : 'i'), r]
  );
}
function yy(l) {
  try {
    return l
      .split('/')
      .map((i) => decodeURIComponent(i).replace(/\//g, '%2F'))
      .join('/');
  } catch (i) {
    return (
      ol(
        !1,
        `The URL path "${l}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${i}).`
      ),
      l
    );
  }
}
function Xl(l, i) {
  if (i === '/') return l;
  if (!l.toLowerCase().startsWith(i.toLowerCase())) return null;
  let o = i.endsWith('/') ? i.length - 1 : i.length,
    r = l.charAt(o);
  return r && r !== '/' ? null : l.slice(o) || '/';
}
var by = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;
function xy(l, i = '/') {
  let { pathname: o, search: r = '', hash: u = '' } = typeof l == 'string' ? Gn(l) : l,
    d;
  return (
    o ? ((o = _h(o)), o.startsWith('/') ? (d = Ap(o.substring(1), '/')) : (d = Ap(o, i))) : (d = i),
    { pathname: d, search: Ty(r), hash: jy(u) }
  );
}
function Ap(l, i) {
  let o = Dr(i).split('/');
  return (
    l.split('/').forEach((u) => {
      u === '..' ? o.length > 1 && o.pop() : u !== '.' && o.push(u);
    }),
    o.length > 1 ? o.join('/') : '/'
  );
}
function vu(l, i, o, r) {
  return `Cannot include a '${l}' character in a manually specified \`to.${i}\` field [${JSON.stringify(r)}].  Please separate it out to the \`to.${o}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`;
}
function Sy(l) {
  return l.filter((i, o) => o === 0 || (i.route.path && i.route.path.length > 0));
}
function Ju(l) {
  let i = Sy(l);
  return i.map((o, r) => (r === i.length - 1 ? o.pathname : o.pathnameBase));
}
function Xr(l, i, o, r = !1) {
  let u;
  typeof l == 'string'
    ? (u = Gn(l))
    : ((u = { ...l }),
      Pe(!u.pathname || !u.pathname.includes('?'), vu('?', 'pathname', 'search', u)),
      Pe(!u.pathname || !u.pathname.includes('#'), vu('#', 'pathname', 'hash', u)),
      Pe(!u.search || !u.search.includes('#'), vu('#', 'search', 'hash', u)));
  let d = l === '' || u.pathname === '',
    f = d ? '/' : u.pathname,
    h;
  if (f == null) h = o;
  else {
    let v = i.length - 1;
    if (!r && f.startsWith('..')) {
      let I = f.split('/');
      for (; I[0] === '..'; ) (I.shift(), (v -= 1));
      u.pathname = I.join('/');
    }
    h = v >= 0 ? i[v] : '/';
  }
  let p = xy(u, h),
    g = f && f !== '/' && f.endsWith('/'),
    y = (d || f === '.') && o.endsWith('/');
  return (!p.pathname.endsWith('/') && (g || y) && (p.pathname += '/'), p);
}
var _h = (l) => l.replace(/\/\/+/g, '/'),
  rl = (l) => _h(l.join('/')),
  Dr = (l) => l.replace(/\/+$/, ''),
  wy = (l) => Dr(l).replace(/^\/*/, '/'),
  Ty = (l) => (!l || l === '?' ? '' : l.startsWith('?') ? l : '?' + l),
  jy = (l) => (!l || l === '#' ? '' : l.startsWith('#') ? l : '#' + l),
  Ny = class {
    constructor(l, i, o, r = !1) {
      ((this.status = l),
        (this.statusText = i || ''),
        (this.internal = r),
        o instanceof Error ? ((this.data = o.toString()), (this.error = o)) : (this.data = o));
    }
  };
function Ey(l) {
  return (
    l != null &&
    typeof l.status == 'number' &&
    typeof l.statusText == 'string' &&
    typeof l.internal == 'boolean' &&
    'data' in l
  );
}
function Cy(l) {
  let i = l.map((o) => o.route.path).filter(Boolean);
  return rl(i) || '/';
}
var fh =
  typeof window < 'u' && typeof window.document < 'u' && typeof window.document.createElement < 'u';
function ph(l, i) {
  let o = l;
  if (typeof o != 'string' || !by.test(o)) return { absoluteURL: void 0, isExternal: !1, to: o };
  let r = o,
    u = !1;
  if (fh)
    try {
      let d = new URL(window.location.href),
        f = o.startsWith('//') ? new URL(d.protocol + o) : new URL(o),
        h = Xl(f.pathname, i);
      f.origin === d.origin && h != null ? (o = h + f.search + f.hash) : (u = !0);
    } catch {
      ol(
        !1,
        `<Link to="${o}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`
      );
    }
  return { absoluteURL: r, isExternal: u, to: o };
}
Object.getOwnPropertyNames(Object.prototype).sort().join('\0');
var hh = ['POST', 'PUT', 'PATCH', 'DELETE'];
new Set(hh);
var Ay = ['GET', ...hh];
new Set(Ay);
var Yn = w.createContext(null);
Yn.displayName = 'DataRouter';
var Vr = w.createContext(null);
Vr.displayName = 'DataRouterState';
var gh = w.createContext(!1);
function Ly() {
  return w.useContext(gh);
}
var kh = w.createContext({ isTransitioning: !1 });
kh.displayName = 'ViewTransition';
var qy = w.createContext(new Map());
qy.displayName = 'Fetchers';
var By = w.createContext(null);
By.displayName = 'Await';
var Ut = w.createContext(null);
Ut.displayName = 'Navigation';
var es = w.createContext(null);
es.displayName = 'Location';
var dl = w.createContext({ outlet: null, matches: [], isDataRoute: !1 });
dl.displayName = 'Route';
var Pu = w.createContext(null);
Pu.displayName = 'RouteError';
var vh = 'REACT_ROUTER_ERROR',
  Oy = 'REDIRECT',
  Iy = 'ROUTE_ERROR_RESPONSE';
function My(l) {
  if (l.startsWith(`${vh}:${Oy}:{`))
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
function Dy(l) {
  if (l.startsWith(`${vh}:${Iy}:{`))
    try {
      let i = JSON.parse(l.slice(40));
      if (
        typeof i == 'object' &&
        i &&
        typeof i.status == 'number' &&
        typeof i.statusText == 'string'
      )
        return new Ny(i.status, i.statusText, i.data);
    } catch {}
}
function Ry(l, { relative: i } = {}) {
  Pe(Xn(), 'useHref() may be used only in the context of a <Router> component.');
  let { basename: o, navigator: r } = w.useContext(Ut),
    { hash: u, pathname: d, search: f } = ts(l, { relative: i }),
    h = d;
  return (
    o !== '/' && (h = d === '/' ? o : rl([o, d])),
    r.createHref({ pathname: h, search: f, hash: u })
  );
}
function Xn() {
  return w.useContext(es) != null;
}
function vl() {
  return (
    Pe(Xn(), 'useLocation() may be used only in the context of a <Router> component.'),
    w.useContext(es).location
  );
}
var yh =
  'You should call navigate() in a React.useEffect(), not when your component is first rendered.';
function bh(l) {
  w.useContext(Ut).static || w.useLayoutEffect(l);
}
function ml() {
  let { isDataRoute: l } = w.useContext(dl);
  return l ? Fy() : zy();
}
function zy() {
  Pe(Xn(), 'useNavigate() may be used only in the context of a <Router> component.');
  let l = w.useContext(Yn),
    { basename: i, navigator: o } = w.useContext(Ut),
    { matches: r } = w.useContext(dl),
    { pathname: u } = vl(),
    d = JSON.stringify(Ju(r)),
    f = w.useRef(!1);
  return (
    bh(() => {
      f.current = !0;
    }),
    w.useCallback(
      (p, g = {}) => {
        if ((ol(f.current, yh), !f.current)) return;
        if (typeof p == 'number') {
          o.go(p);
          return;
        }
        let y = Xr(p, JSON.parse(d), u, g.relative === 'path');
        (l == null && i !== '/' && (y.pathname = y.pathname === '/' ? i : rl([i, y.pathname])),
          (g.replace ? o.replace : o.push)(y, g.state, g));
      },
      [i, o, d, u, l]
    )
  );
}
w.createContext(null);
function Hy() {
  let { matches: l } = w.useContext(dl),
    i = l[l.length - 1];
  return (i == null ? void 0 : i.params) ?? {};
}
function ts(l, { relative: i } = {}) {
  let { matches: o } = w.useContext(dl),
    { pathname: r } = vl(),
    u = JSON.stringify(Ju(o));
  return w.useMemo(() => Xr(l, JSON.parse(u), r, i === 'path'), [l, u, r, i]);
}
function Uy(l, i) {
  return xh(l, i);
}
function xh(l, i, o) {
  var E;
  Pe(Xn(), 'useRoutes() may be used only in the context of a <Router> component.');
  let { navigator: r } = w.useContext(Ut),
    { matches: u } = w.useContext(dl),
    d = u[u.length - 1],
    f = d ? d.params : {},
    h = d ? d.pathname : '/',
    p = d ? d.pathnameBase : '/',
    g = d && d.route;
  {
    let x = (g && g.path) || '';
    wh(
      h,
      !g || x.endsWith('*') || x.endsWith('*?'),
      `You rendered descendant <Routes> (or called \`useRoutes()\`) at "${h}" (under <Route path="${x}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${x}"> to <Route path="${x === '/' ? '*' : `${x}/*`}">.`
    );
  }
  let y = vl(),
    v;
  if (i) {
    let x = typeof i == 'string' ? Gn(i) : i;
    (Pe(
      p === '/' || ((E = x.pathname) == null ? void 0 : E.startsWith(p)),
      `When overriding the location using \`<Routes location>\` or \`useRoutes(routes, location)\`, the location pathname must begin with the portion of the URL pathname that was matched by all parent routes. The current pathname base is "${p}" but pathname "${x.pathname}" was given in the \`location\` prop.`
    ),
      (v = x));
  } else v = y;
  let I = v.pathname || '/',
    L = I;
  if (p !== '/') {
    let x = p.replace(/^\//, '').split('/');
    L = '/' + I.replace(/^\//, '').split('/').slice(x.length).join('/');
  }
  let M = uh(l, { pathname: L });
  (ol(g || M != null, `No routes matched location "${v.pathname}${v.search}${v.hash}" `),
    ol(
      M == null ||
        M[M.length - 1].route.element !== void 0 ||
        M[M.length - 1].route.Component !== void 0 ||
        M[M.length - 1].route.lazy !== void 0,
      `Matched leaf route at location "${v.pathname}${v.search}${v.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`
    ));
  let S = Vy(
    M &&
      M.map((x) =>
        Object.assign({}, x, {
          params: Object.assign({}, f, x.params),
          pathname: rl([
            p,
            r.encodeLocation
              ? r.encodeLocation(
                  x.pathname.replace(/%/g, '%25').replace(/\?/g, '%3F').replace(/#/g, '%23')
                ).pathname
              : x.pathname,
          ]),
          pathnameBase:
            x.pathnameBase === '/'
              ? p
              : rl([
                  p,
                  r.encodeLocation
                    ? r.encodeLocation(
                        x.pathnameBase
                          .replace(/%/g, '%25')
                          .replace(/\?/g, '%3F')
                          .replace(/#/g, '%23')
                      ).pathname
                    : x.pathnameBase,
                ]),
        })
      ),
    u,
    o
  );
  return i && S
    ? w.createElement(
        es.Provider,
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
        S
      )
    : S;
}
function $y() {
  let l = Py(),
    i = Ey(l) ? `${l.status} ${l.statusText}` : l instanceof Error ? l.message : JSON.stringify(l),
    o = l instanceof Error ? l.stack : null,
    r = 'rgba(200,200,200, 0.5)',
    u = { padding: '0.5rem', backgroundColor: r },
    d = { padding: '2px 4px', backgroundColor: r },
    f = null;
  return (
    console.error('Error handled by React Router default ErrorBoundary:', l),
    (f = w.createElement(
      w.Fragment,
      null,
      w.createElement('p', null, '💿 Hey developer 👋'),
      w.createElement(
        'p',
        null,
        'You can provide a way better UX than this when your app throws errors by providing your own ',
        w.createElement('code', { style: d }, 'ErrorBoundary'),
        ' or',
        ' ',
        w.createElement('code', { style: d }, 'errorElement'),
        ' prop on your route.'
      )
    )),
    w.createElement(
      w.Fragment,
      null,
      w.createElement('h2', null, 'Unexpected Application Error!'),
      w.createElement('h3', { style: { fontStyle: 'italic' } }, i),
      o ? w.createElement('pre', { style: u }, o) : null,
      f
    )
  );
}
var Gy = w.createElement($y, null),
  Sh = class extends w.Component {
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
        const o = Dy(l.digest);
        o && (l = o);
      }
      let i =
        l !== void 0
          ? w.createElement(
              dl.Provider,
              { value: this.props.routeContext },
              w.createElement(Pu.Provider, { value: l, children: this.props.component })
            )
          : this.props.children;
      return this.context ? w.createElement(Yy, { error: l }, i) : i;
    }
  };
Sh.contextType = gh;
var yu = new WeakMap();
function Yy({ children: l, error: i }) {
  let { basename: o } = w.useContext(Ut);
  if (typeof i == 'object' && i && 'digest' in i && typeof i.digest == 'string') {
    let r = My(i.digest);
    if (r) {
      let u = yu.get(i);
      if (u) throw u;
      let d = ph(r.location, o);
      if (fh && !yu.get(i))
        if (d.isExternal || r.reloadDocument) window.location.href = d.absoluteURL || d.to;
        else {
          const f = Promise.resolve().then(() =>
            window.__reactRouterDataRouter.navigate(d.to, { replace: r.replace })
          );
          throw (yu.set(i, f), f);
        }
      return w.createElement('meta', {
        httpEquiv: 'refresh',
        content: `0;url=${d.absoluteURL || d.to}`,
      });
    }
  }
  return l;
}
function Xy({ routeContext: l, match: i, children: o }) {
  let r = w.useContext(Yn);
  return (
    r &&
      r.static &&
      r.staticContext &&
      (i.route.errorElement || i.route.ErrorBoundary) &&
      (r.staticContext._deepestRenderedBoundaryId = i.route.id),
    w.createElement(dl.Provider, { value: l }, o)
  );
}
function Vy(l, i = [], o) {
  let r = o == null ? void 0 : o.state;
  if (l == null) {
    if (!r) return null;
    if (r.errors) l = r.matches;
    else if (i.length === 0 && !r.initialized && r.matches.length > 0) l = r.matches;
    else return null;
  }
  let u = l,
    d = r == null ? void 0 : r.errors;
  if (d != null) {
    let y = u.findIndex((v) => v.route.id && (d == null ? void 0 : d[v.route.id]) !== void 0);
    (Pe(
      y >= 0,
      `Could not find a matching route for errors on route IDs: ${Object.keys(d).join(',')}`
    ),
      (u = u.slice(0, Math.min(u.length, y + 1))));
  }
  let f = !1,
    h = -1;
  if (o && r) {
    f = r.renderFallback;
    for (let y = 0; y < u.length; y++) {
      let v = u[y];
      if (((v.route.HydrateFallback || v.route.hydrateFallbackElement) && (h = y), v.route.id)) {
        let { loaderData: I, errors: L } = r,
          M = v.route.loader && !I.hasOwnProperty(v.route.id) && (!L || L[v.route.id] === void 0);
        if (v.route.lazy || M) {
          (o.isStatic && (f = !0), h >= 0 ? (u = u.slice(0, h + 1)) : (u = [u[0]]));
          break;
        }
      }
    }
  }
  let p = o == null ? void 0 : o.onError,
    g =
      r && p
        ? (y, v) => {
            var I, L;
            p(y, {
              location: r.location,
              params:
                ((L = (I = r.matches) == null ? void 0 : I[0]) == null ? void 0 : L.params) ?? {},
              unstable_pattern: Cy(r.matches),
              errorInfo: v,
            });
          }
        : void 0;
  return u.reduceRight((y, v, I) => {
    let L,
      M = !1,
      S = null,
      E = null;
    r &&
      ((L = d && v.route.id ? d[v.route.id] : void 0),
      (S = v.route.errorElement || Gy),
      f &&
        (h < 0 && I === 0
          ? (wh(
              'route-fallback',
              !1,
              'No `HydrateFallback` element provided to render during initial hydration'
            ),
            (M = !0),
            (E = null))
          : h === I && ((M = !0), (E = v.route.hydrateFallbackElement || null))));
    let x = i.concat(u.slice(0, I + 1)),
      C = () => {
        let $;
        return (
          L
            ? ($ = S)
            : M
              ? ($ = E)
              : v.route.Component
                ? ($ = w.createElement(v.route.Component, null))
                : v.route.element
                  ? ($ = v.route.element)
                  : ($ = y),
          w.createElement(Xy, {
            match: v,
            routeContext: { outlet: y, matches: x, isDataRoute: r != null },
            children: $,
          })
        );
      };
    return r && (v.route.ErrorBoundary || v.route.errorElement || I === 0)
      ? w.createElement(Sh, {
          location: r.location,
          revalidation: r.revalidation,
          component: S,
          error: L,
          children: C(),
          routeContext: { outlet: null, matches: x, isDataRoute: !0 },
          onError: g,
        })
      : C();
  }, null);
}
function Fu(l) {
  return `${l} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function Qy(l) {
  let i = w.useContext(Yn);
  return (Pe(i, Fu(l)), i);
}
function Ky(l) {
  let i = w.useContext(Vr);
  return (Pe(i, Fu(l)), i);
}
function Zy(l) {
  let i = w.useContext(dl);
  return (Pe(i, Fu(l)), i);
}
function Wu(l) {
  let i = Zy(l),
    o = i.matches[i.matches.length - 1];
  return (Pe(o.route.id, `${l} can only be used on routes that contain a unique "id"`), o.route.id);
}
function Jy() {
  return Wu('useRouteId');
}
function Py() {
  var r;
  let l = w.useContext(Pu),
    i = Ky('useRouteError'),
    o = Wu('useRouteError');
  return l !== void 0 ? l : (r = i.errors) == null ? void 0 : r[o];
}
function Fy() {
  let { router: l } = Qy('useNavigate'),
    i = Wu('useNavigate'),
    o = w.useRef(!1);
  return (
    bh(() => {
      o.current = !0;
    }),
    w.useCallback(
      async (u, d = {}) => {
        (ol(o.current, yh),
          o.current &&
            (typeof u == 'number'
              ? await l.navigate(u)
              : await l.navigate(u, { fromRouteId: i, ...d })));
      },
      [l, i]
    )
  );
}
var Lp = {};
function wh(l, i, o) {
  !i && !Lp[l] && ((Lp[l] = !0), ol(!1, o));
}
w.memo(Wy);
function Wy({ routes: l, future: i, state: o, isStatic: r, onError: u }) {
  return xh(l, void 0, { state: o, isStatic: r, onError: u });
}
function cl({ to: l, replace: i, state: o, relative: r }) {
  Pe(Xn(), '<Navigate> may be used only in the context of a <Router> component.');
  let { static: u } = w.useContext(Ut);
  ol(
    !u,
    '<Navigate> must not be used on the initial render in a <StaticRouter>. This is a no-op, but you should modify your code so the <Navigate> is only ever rendered in response to some user interaction or state change.'
  );
  let { matches: d } = w.useContext(dl),
    { pathname: f } = vl(),
    h = ml(),
    p = Xr(l, Ju(d), f, r === 'path'),
    g = JSON.stringify(p);
  return (
    w.useEffect(() => {
      h(JSON.parse(g), { replace: i, state: o, relative: r });
    }, [h, g, r, i, o]),
    null
  );
}
function Ft(l) {
  Pe(
    !1,
    'A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>.'
  );
}
function e0({
  basename: l = '/',
  children: i = null,
  location: o,
  navigationType: r = 'POP',
  navigator: u,
  static: d = !1,
  unstable_useTransitions: f,
}) {
  Pe(
    !Xn(),
    'You cannot render a <Router> inside another <Router>. You should never have more than one in your app.'
  );
  let h = l.replace(/^\/*/, '/'),
    p = w.useMemo(
      () => ({ basename: h, navigator: u, static: d, unstable_useTransitions: f, future: {} }),
      [h, u, d, f]
    );
  typeof o == 'string' && (o = Gn(o));
  let {
      pathname: g = '/',
      search: y = '',
      hash: v = '',
      state: I = null,
      key: L = 'default',
      unstable_mask: M,
    } = o,
    S = w.useMemo(() => {
      let E = Xl(g, h);
      return E == null
        ? null
        : {
            location: { pathname: E, search: y, hash: v, state: I, key: L, unstable_mask: M },
            navigationType: r,
          };
    }, [h, g, y, v, I, L, r, M]);
  return (
    ol(
      S != null,
      `<Router basename="${h}"> is not able to match the URL "${g}${y}${v}" because it does not start with the basename, so the <Router> won't render anything.`
    ),
    S == null
      ? null
      : w.createElement(
          Ut.Provider,
          { value: p },
          w.createElement(es.Provider, { children: i, value: S })
        )
  );
}
function t0({ children: l, location: i }) {
  return Uy(Iu(l), i);
}
function Iu(l, i = []) {
  let o = [];
  return (
    w.Children.forEach(l, (r, u) => {
      if (!w.isValidElement(r)) return;
      let d = [...i, u];
      if (r.type === w.Fragment) {
        o.push.apply(o, Iu(r.props.children, d));
        return;
      }
      (Pe(
        r.type === Ft,
        `[${typeof r.type == 'string' ? r.type : r.type.name}] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>`
      ),
        Pe(!r.props.index || !r.props.children, 'An index route cannot have child routes.'));
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
      (r.props.children && (f.children = Iu(r.props.children, d)), o.push(f));
    }),
    o
  );
}
var Br = 'get',
  Or = 'application/x-www-form-urlencoded';
function Qr(l) {
  return typeof HTMLElement < 'u' && l instanceof HTMLElement;
}
function l0(l) {
  return Qr(l) && l.tagName.toLowerCase() === 'button';
}
function a0(l) {
  return Qr(l) && l.tagName.toLowerCase() === 'form';
}
function n0(l) {
  return Qr(l) && l.tagName.toLowerCase() === 'input';
}
function i0(l) {
  return !!(l.metaKey || l.altKey || l.ctrlKey || l.shiftKey);
}
function s0(l, i) {
  return l.button === 0 && (!i || i === '_self') && !i0(l);
}
var Tr = null;
function r0() {
  if (Tr === null)
    try {
      (new FormData(document.createElement('form'), 0), (Tr = !1));
    } catch {
      Tr = !0;
    }
  return Tr;
}
var o0 = new Set(['application/x-www-form-urlencoded', 'multipart/form-data', 'text/plain']);
function bu(l) {
  return l != null && !o0.has(l)
    ? (ol(
        !1,
        `"${l}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${Or}"`
      ),
      null)
    : l;
}
function c0(l, i) {
  let o, r, u, d, f;
  if (a0(l)) {
    let h = l.getAttribute('action');
    ((r = h ? Xl(h, i) : null),
      (o = l.getAttribute('method') || Br),
      (u = bu(l.getAttribute('enctype')) || Or),
      (d = new FormData(l)));
  } else if (l0(l) || (n0(l) && (l.type === 'submit' || l.type === 'image'))) {
    let h = l.form;
    if (h == null)
      throw new Error('Cannot submit a <button> or <input type="submit"> without a <form>');
    let p = l.getAttribute('formaction') || h.getAttribute('action');
    if (
      ((r = p ? Xl(p, i) : null),
      (o = l.getAttribute('formmethod') || h.getAttribute('method') || Br),
      (u = bu(l.getAttribute('formenctype')) || bu(h.getAttribute('enctype')) || Or),
      (d = new FormData(h, l)),
      !r0())
    ) {
      let { name: g, type: y, value: v } = l;
      if (y === 'image') {
        let I = g ? `${g}.` : '';
        (d.append(`${I}x`, '0'), d.append(`${I}y`, '0'));
      } else g && d.append(g, v);
    }
  } else {
    if (Qr(l))
      throw new Error(
        'Cannot submit element that is not <form>, <button>, or <input type="submit|image">'
      );
    ((o = Br), (r = null), (u = Or), (f = l));
  }
  return (
    d && u === 'text/plain' && ((f = d), (d = void 0)),
    { action: r, method: o.toLowerCase(), encType: u, formData: d, body: f }
  );
}
Object.getOwnPropertyNames(Object.prototype).sort().join('\0');
function ed(l, i) {
  if (l === !1 || l === null || typeof l > 'u') throw new Error(i);
}
function Th(l, i, o, r) {
  let u =
    typeof l == 'string'
      ? new URL(l, typeof window > 'u' ? 'server://singlefetch/' : window.location.origin)
      : l;
  return (
    o
      ? u.pathname.endsWith('/')
        ? (u.pathname = `${u.pathname}_.${r}`)
        : (u.pathname = `${u.pathname}.${r}`)
      : u.pathname === '/'
        ? (u.pathname = `_root.${r}`)
        : i && Xl(u.pathname, i) === '/'
          ? (u.pathname = `${Dr(i)}/_root.${r}`)
          : (u.pathname = `${Dr(u.pathname)}.${r}`),
    u
  );
}
async function u0(l, i) {
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
function d0(l) {
  return l == null
    ? !1
    : l.href == null
      ? l.rel === 'preload' && typeof l.imageSrcSet == 'string' && typeof l.imageSizes == 'string'
      : typeof l.rel == 'string' && typeof l.href == 'string';
}
async function m0(l, i, o) {
  let r = await Promise.all(
    l.map(async (u) => {
      let d = i.routes[u.route.id];
      if (d) {
        let f = await u0(d, o);
        return f.links ? f.links() : [];
      }
      return [];
    })
  );
  return h0(
    r
      .flat(1)
      .filter(d0)
      .filter((u) => u.rel === 'stylesheet' || u.rel === 'preload')
      .map((u) =>
        u.rel === 'stylesheet' ? { ...u, rel: 'prefetch', as: 'style' } : { ...u, rel: 'prefetch' }
      )
  );
}
function qp(l, i, o, r, u, d) {
  let f = (p, g) => (o[g] ? p.route.id !== o[g].route.id : !0),
    h = (p, g) => {
      var y;
      return (
        o[g].pathname !== p.pathname ||
        (((y = o[g].route.path) == null ? void 0 : y.endsWith('*')) &&
          o[g].params['*'] !== p.params['*'])
      );
    };
  return d === 'assets'
    ? i.filter((p, g) => f(p, g) || h(p, g))
    : d === 'data'
      ? i.filter((p, g) => {
          var v;
          let y = r.routes[p.route.id];
          if (!y || !y.hasLoader) return !1;
          if (f(p, g) || h(p, g)) return !0;
          if (p.route.shouldRevalidate) {
            let I = p.route.shouldRevalidate({
              currentUrl: new URL(u.pathname + u.search + u.hash, window.origin),
              currentParams: ((v = o[0]) == null ? void 0 : v.params) || {},
              nextUrl: new URL(l, window.origin),
              nextParams: p.params,
              defaultShouldRevalidate: !0,
            });
            if (typeof I == 'boolean') return I;
          }
          return !0;
        })
      : [];
}
function _0(l, i, { includeHydrateFallback: o } = {}) {
  return f0(
    l
      .map((r) => {
        let u = i.routes[r.route.id];
        if (!u) return [];
        let d = [u.module];
        return (
          u.clientActionModule && (d = d.concat(u.clientActionModule)),
          u.clientLoaderModule && (d = d.concat(u.clientLoaderModule)),
          o && u.hydrateFallbackModule && (d = d.concat(u.hydrateFallbackModule)),
          u.imports && (d = d.concat(u.imports)),
          d
        );
      })
      .flat(1)
  );
}
function f0(l) {
  return [...new Set(l)];
}
function p0(l) {
  let i = {},
    o = Object.keys(l).sort();
  for (let r of o) i[r] = l[r];
  return i;
}
function h0(l, i) {
  let o = new Set();
  return (
    new Set(i),
    l.reduce((r, u) => {
      let d = JSON.stringify(p0(u));
      return (o.has(d) || (o.add(d), r.push({ key: d, link: u })), r);
    }, [])
  );
}
function td() {
  let l = w.useContext(Yn);
  return (ed(l, 'You must render this element inside a <DataRouterContext.Provider> element'), l);
}
function g0() {
  let l = w.useContext(Vr);
  return (
    ed(l, 'You must render this element inside a <DataRouterStateContext.Provider> element'),
    l
  );
}
var ld = w.createContext(void 0);
ld.displayName = 'FrameworkContext';
function ad() {
  let l = w.useContext(ld);
  return (ed(l, 'You must render this element inside a <HydratedRouter> element'), l);
}
function k0(l, i) {
  let o = w.useContext(ld),
    [r, u] = w.useState(!1),
    [d, f] = w.useState(!1),
    { onFocus: h, onBlur: p, onMouseEnter: g, onMouseLeave: y, onTouchStart: v } = i,
    I = w.useRef(null);
  (w.useEffect(() => {
    if ((l === 'render' && f(!0), l === 'viewport')) {
      let S = (x) => {
          x.forEach((C) => {
            f(C.isIntersecting);
          });
        },
        E = new IntersectionObserver(S, { threshold: 0.5 });
      return (
        I.current && E.observe(I.current),
        () => {
          E.disconnect();
        }
      );
    }
  }, [l]),
    w.useEffect(() => {
      if (r) {
        let S = setTimeout(() => {
          f(!0);
        }, 100);
        return () => {
          clearTimeout(S);
        };
      }
    }, [r]));
  let L = () => {
      u(!0);
    },
    M = () => {
      (u(!1), f(!1));
    };
  return o
    ? l !== 'intent'
      ? [d, I, {}]
      : [
          d,
          I,
          {
            onFocus: Gi(h, L),
            onBlur: Gi(p, M),
            onMouseEnter: Gi(g, L),
            onMouseLeave: Gi(y, M),
            onTouchStart: Gi(v, L),
          },
        ]
    : [!1, I, {}];
}
function Gi(l, i) {
  return (o) => {
    (l && l(o), o.defaultPrevented || i(o));
  };
}
function v0({ page: l, ...i }) {
  let o = Ly(),
    { router: r } = td(),
    u = w.useMemo(() => uh(r.routes, l, r.basename), [r.routes, l, r.basename]);
  return u
    ? o
      ? w.createElement(b0, { page: l, matches: u, ...i })
      : w.createElement(x0, { page: l, matches: u, ...i })
    : null;
}
function y0(l) {
  let { manifest: i, routeModules: o } = ad(),
    [r, u] = w.useState([]);
  return (
    w.useEffect(() => {
      let d = !1;
      return (
        m0(l, i, o).then((f) => {
          d || u(f);
        }),
        () => {
          d = !0;
        }
      );
    }, [l, i, o]),
    r
  );
}
function b0({ page: l, matches: i, ...o }) {
  let r = vl(),
    { future: u } = ad(),
    { basename: d } = td(),
    f = w.useMemo(() => {
      if (l === r.pathname + r.search + r.hash) return [];
      let h = Th(l, d, u.unstable_trailingSlashAwareDataRequests, 'rsc'),
        p = !1,
        g = [];
      for (let y of i)
        typeof y.route.shouldRevalidate == 'function' ? (p = !0) : g.push(y.route.id);
      return (
        p && g.length > 0 && h.searchParams.set('_routes', g.join(',')),
        [h.pathname + h.search]
      );
    }, [d, u.unstable_trailingSlashAwareDataRequests, l, r, i]);
  return w.createElement(
    w.Fragment,
    null,
    f.map((h) => w.createElement('link', { key: h, rel: 'prefetch', as: 'fetch', href: h, ...o }))
  );
}
function x0({ page: l, matches: i, ...o }) {
  let r = vl(),
    { future: u, manifest: d, routeModules: f } = ad(),
    { basename: h } = td(),
    { loaderData: p, matches: g } = g0(),
    y = w.useMemo(() => qp(l, i, g, d, r, 'data'), [l, i, g, d, r]),
    v = w.useMemo(() => qp(l, i, g, d, r, 'assets'), [l, i, g, d, r]),
    I = w.useMemo(() => {
      if (l === r.pathname + r.search + r.hash) return [];
      let S = new Set(),
        E = !1;
      if (
        (i.forEach((C) => {
          var D;
          let $ = d.routes[C.route.id];
          !$ ||
            !$.hasLoader ||
            ((!y.some((ae) => ae.route.id === C.route.id) &&
              C.route.id in p &&
              (D = f[C.route.id]) != null &&
              D.shouldRevalidate) ||
            $.hasClientLoader
              ? (E = !0)
              : S.add(C.route.id));
        }),
        S.size === 0)
      )
        return [];
      let x = Th(l, h, u.unstable_trailingSlashAwareDataRequests, 'data');
      return (
        E &&
          S.size > 0 &&
          x.searchParams.set(
            '_routes',
            i
              .filter((C) => S.has(C.route.id))
              .map((C) => C.route.id)
              .join(',')
          ),
        [x.pathname + x.search]
      );
    }, [h, u.unstable_trailingSlashAwareDataRequests, p, r, d, y, i, l, f]),
    L = w.useMemo(() => _0(v, d), [v, d]),
    M = y0(v);
  return w.createElement(
    w.Fragment,
    null,
    I.map((S) => w.createElement('link', { key: S, rel: 'prefetch', as: 'fetch', href: S, ...o })),
    L.map((S) => w.createElement('link', { key: S, rel: 'modulepreload', href: S, ...o })),
    M.map(({ key: S, link: E }) =>
      w.createElement('link', {
        key: S,
        nonce: o.nonce,
        ...E,
        crossOrigin: E.crossOrigin ?? o.crossOrigin,
      })
    )
  );
}
function S0(...l) {
  return (i) => {
    l.forEach((o) => {
      typeof o == 'function' ? o(i) : o != null && (o.current = i);
    });
  };
}
var w0 =
  typeof window < 'u' && typeof window.document < 'u' && typeof window.document.createElement < 'u';
try {
  w0 && (window.__reactRouterVersion = '7.14.2');
} catch {}
function T0({ basename: l, children: i, unstable_useTransitions: o, window: r }) {
  let u = w.useRef();
  u.current == null && (u.current = ny({ window: r, v5Compat: !0 }));
  let d = u.current,
    [f, h] = w.useState({ action: d.action, location: d.location }),
    p = w.useCallback(
      (g) => {
        o === !1 ? h(g) : w.startTransition(() => h(g));
      },
      [o]
    );
  return (
    w.useLayoutEffect(() => d.listen(p), [d, p]),
    w.createElement(e0, {
      basename: l,
      children: i,
      location: f.location,
      navigationType: f.action,
      navigator: d,
      unstable_useTransitions: o,
    })
  );
}
var jh = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,
  Nh = w.forwardRef(function (
    {
      onClick: i,
      discover: o = 'render',
      prefetch: r = 'none',
      relative: u,
      reloadDocument: d,
      replace: f,
      unstable_mask: h,
      state: p,
      target: g,
      to: y,
      preventScrollReset: v,
      viewTransition: I,
      unstable_defaultShouldRevalidate: L,
      ...M
    },
    S
  ) {
    let { basename: E, navigator: x, unstable_useTransitions: C } = w.useContext(Ut),
      $ = typeof y == 'string' && jh.test(y),
      D = ph(y, E);
    y = D.to;
    let ae = Ry(y, { relative: u }),
      Y = vl(),
      T = null;
    if (h) {
      let ve = Xr(h, [], Y.unstable_mask ? Y.unstable_mask.pathname : '/', !0);
      (E !== '/' && (ve.pathname = ve.pathname === '/' ? E : rl([E, ve.pathname])),
        (T = x.createHref(ve)));
    }
    let [V, ie, ue] = k0(r, M),
      W = C0(y, {
        replace: f,
        unstable_mask: h,
        state: p,
        target: g,
        preventScrollReset: v,
        relative: u,
        viewTransition: I,
        unstable_defaultShouldRevalidate: L,
        unstable_useTransitions: C,
      });
    function de(ve) {
      (i && i(ve), ve.defaultPrevented || W(ve));
    }
    let ye = !(D.isExternal || d),
      xe = w.createElement('a', {
        ...M,
        ...ue,
        href: (ye ? T : void 0) || D.absoluteURL || ae,
        onClick: ye ? de : i,
        ref: S0(S, ie),
        target: g,
        'data-discover': !$ && o === 'render' ? 'true' : void 0,
      });
    return V && !$ ? w.createElement(w.Fragment, null, xe, w.createElement(v0, { page: ae })) : xe;
  });
Nh.displayName = 'Link';
var j0 = w.forwardRef(function (
  {
    'aria-current': i = 'page',
    caseSensitive: o = !1,
    className: r = '',
    end: u = !1,
    style: d,
    to: f,
    viewTransition: h,
    children: p,
    ...g
  },
  y
) {
  let v = ts(f, { relative: g.relative }),
    I = vl(),
    L = w.useContext(Vr),
    { navigator: M, basename: S } = w.useContext(Ut),
    E = L != null && O0(v) && h === !0,
    x = M.encodeLocation ? M.encodeLocation(v).pathname : v.pathname,
    C = I.pathname,
    $ = L && L.navigation && L.navigation.location ? L.navigation.location.pathname : null;
  (o || ((C = C.toLowerCase()), ($ = $ ? $.toLowerCase() : null), (x = x.toLowerCase())),
    $ && S && ($ = Xl($, S) || $));
  const D = x !== '/' && x.endsWith('/') ? x.length - 1 : x.length;
  let ae = C === x || (!u && C.startsWith(x) && C.charAt(D) === '/'),
    Y = $ != null && ($ === x || (!u && $.startsWith(x) && $.charAt(x.length) === '/')),
    T = { isActive: ae, isPending: Y, isTransitioning: E },
    V = ae ? i : void 0,
    ie;
  typeof r == 'function'
    ? (ie = r(T))
    : (ie = [r, ae ? 'active' : null, Y ? 'pending' : null, E ? 'transitioning' : null]
        .filter(Boolean)
        .join(' '));
  let ue = typeof d == 'function' ? d(T) : d;
  return w.createElement(
    Nh,
    { ...g, 'aria-current': V, className: ie, ref: y, style: ue, to: f, viewTransition: h },
    typeof p == 'function' ? p(T) : p
  );
});
j0.displayName = 'NavLink';
var N0 = w.forwardRef(
  (
    {
      discover: l = 'render',
      fetcherKey: i,
      navigate: o,
      reloadDocument: r,
      replace: u,
      state: d,
      method: f = Br,
      action: h,
      onSubmit: p,
      relative: g,
      preventScrollReset: y,
      viewTransition: v,
      unstable_defaultShouldRevalidate: I,
      ...L
    },
    M
  ) => {
    let { unstable_useTransitions: S } = w.useContext(Ut),
      E = q0(),
      x = B0(h, { relative: g }),
      C = f.toLowerCase() === 'get' ? 'get' : 'post',
      $ = typeof h == 'string' && jh.test(h),
      D = (ae) => {
        if ((p && p(ae), ae.defaultPrevented)) return;
        ae.preventDefault();
        let Y = ae.nativeEvent.submitter,
          T = (Y == null ? void 0 : Y.getAttribute('formmethod')) || f,
          V = () =>
            E(Y || ae.currentTarget, {
              fetcherKey: i,
              method: T,
              navigate: o,
              replace: u,
              state: d,
              relative: g,
              preventScrollReset: y,
              viewTransition: v,
              unstable_defaultShouldRevalidate: I,
            });
        S && o !== !1 ? w.startTransition(() => V()) : V();
      };
    return w.createElement('form', {
      ref: M,
      method: C,
      action: x,
      onSubmit: r ? p : D,
      ...L,
      'data-discover': !$ && l === 'render' ? 'true' : void 0,
    });
  }
);
N0.displayName = 'Form';
function E0(l) {
  return `${l} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function Eh(l) {
  let i = w.useContext(Yn);
  return (Pe(i, E0(l)), i);
}
function C0(
  l,
  {
    target: i,
    replace: o,
    unstable_mask: r,
    state: u,
    preventScrollReset: d,
    relative: f,
    viewTransition: h,
    unstable_defaultShouldRevalidate: p,
    unstable_useTransitions: g,
  } = {}
) {
  let y = ml(),
    v = vl(),
    I = ts(l, { relative: f });
  return w.useCallback(
    (L) => {
      if (s0(L, i)) {
        L.preventDefault();
        let M = o !== void 0 ? o : Ji(v) === Ji(I),
          S = () =>
            y(l, {
              replace: M,
              unstable_mask: r,
              state: u,
              preventScrollReset: d,
              relative: f,
              viewTransition: h,
              unstable_defaultShouldRevalidate: p,
            });
        g ? w.startTransition(() => S()) : S();
      }
    },
    [v, y, I, o, r, u, i, l, d, f, h, p, g]
  );
}
var A0 = 0,
  L0 = () => `__${String(++A0)}__`;
function q0() {
  let { router: l } = Eh('useSubmit'),
    { basename: i } = w.useContext(Ut),
    o = Jy(),
    r = l.fetch,
    u = l.navigate;
  return w.useCallback(
    async (d, f = {}) => {
      let { action: h, method: p, encType: g, formData: y, body: v } = c0(d, i);
      if (f.navigate === !1) {
        let I = f.fetcherKey || L0();
        await r(I, o, f.action || h, {
          unstable_defaultShouldRevalidate: f.unstable_defaultShouldRevalidate,
          preventScrollReset: f.preventScrollReset,
          formData: y,
          body: v,
          formMethod: f.method || p,
          formEncType: f.encType || g,
          flushSync: f.flushSync,
        });
      } else
        await u(f.action || h, {
          unstable_defaultShouldRevalidate: f.unstable_defaultShouldRevalidate,
          preventScrollReset: f.preventScrollReset,
          formData: y,
          body: v,
          formMethod: f.method || p,
          formEncType: f.encType || g,
          replace: f.replace,
          state: f.state,
          fromRouteId: o,
          flushSync: f.flushSync,
          viewTransition: f.viewTransition,
        });
    },
    [r, u, i, o]
  );
}
function B0(l, { relative: i } = {}) {
  let { basename: o } = w.useContext(Ut),
    r = w.useContext(dl);
  Pe(r, 'useFormAction must be used inside a RouteContext');
  let [u] = r.matches.slice(-1),
    d = { ...ts(l || '.', { relative: i }) },
    f = vl();
  if (l == null) {
    d.search = f.search;
    let h = new URLSearchParams(d.search),
      p = h.getAll('index');
    if (p.some((y) => y === '')) {
      (h.delete('index'), p.filter((v) => v).forEach((v) => h.append('index', v)));
      let y = h.toString();
      d.search = y ? `?${y}` : '';
    }
  }
  return (
    (!l || l === '.') &&
      u.route.index &&
      (d.search = d.search ? d.search.replace(/^\?/, '?index&') : '?index'),
    o !== '/' && (d.pathname = d.pathname === '/' ? o : rl([o, d.pathname])),
    Ji(d)
  );
}
function O0(l, { relative: i } = {}) {
  let o = w.useContext(kh);
  Pe(
    o != null,
    "`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?"
  );
  let { basename: r } = Eh('useViewTransitionState'),
    u = ts(l, { relative: i });
  if (!o.isTransitioning) return !1;
  let d = Xl(o.currentLocation.pathname, r) || o.currentLocation.pathname,
    f = Xl(o.nextLocation.pathname, r) || o.nextLocation.pathname;
  return Mr(u.pathname, f) != null || Mr(u.pathname, d) != null;
}
const I0 = '_layout_bjf95_1',
  M0 = '_enemies_bjf95_12',
  D0 = '_enemy_bjf95_20',
  R0 = '_targeted_bjf95_35',
  z0 = '_enemyName_bjf95_39',
  H0 = '_down_bjf95_44',
  U0 = '_log_bjf95_48',
  $0 = '_logLine_bjf95_60',
  G0 = '_party_bjf95_64',
  Y0 = '_rowTag_bjf95_71',
  X0 = '_cardRow_bjf95_77',
  V0 = '_card_bjf95_77',
  Q0 = '_cardActive_bjf95_100',
  K0 = '_cardDecided_bjf95_105',
  Z0 = '_cardName_bjf95_109',
  J0 = '_uni_bjf95_117',
  P0 = '_cardJob_bjf95_121',
  F0 = '_gaugeRow_bjf95_127',
  W0 = '_gaugeLabel_bjf95_133',
  eb = '_flash_bjf95_141',
  tb = '_summons_bjf95_163',
  lb = '_summon_bjf95_163',
  ab = '_summonName_bjf95_181',
  nb = '_summonHp_bjf95_190',
  ib = '_cardNums_bjf95_196',
  sb = '_cardCmd_bjf95_202',
  rb = '_empty_bjf95_208',
  ob = '_command_bjf95_213',
  cb = '_skillList_bjf95_219',
  ub = '_skillBtn_bjf95_225',
  db = '_skillTop_bjf95_237',
  mb = '_skillName_bjf95_244',
  _b = '_skillDesc_bjf95_249',
  fb = '_skillSummary_bjf95_255',
  pb = '_target_bjf95_35',
  hb = '_unionBanner_bjf95_267',
  gb = '_unionBannerHead_bjf95_280',
  kb = '_unionBannerDesc_bjf95_287',
  vb = '_unionInfo_bjf95_294',
  yb = '_unionCancel_bjf95_304',
  bb = '_unionHint_bjf95_313',
  xb = '_unionBtn_bjf95_319',
  Sb = '_cmdHead_bjf95_325',
  wb = '_menu_bjf95_330',
  Tb = '_menuBtn_bjf95_336',
  jb = '_tp_bjf95_353',
  Nb = '_menuBack_bjf95_359',
  Eb = '_execRow_bjf95_369',
  Cb = '_redo_bjf95_374',
  Ab = '_primary_bjf95_384',
  Lb = '_result_bjf95_399',
  qb = '_resultTitle_bjf95_410',
  Bb = '_resultBody_bjf95_415',
  Ob = '_expList_bjf95_419',
  Ib = '_expRow_bjf95_427',
  Mb = '_expName_bjf95_433',
  Db = '_expLv_bjf95_441',
  Rb = '_expUp_bjf95_446',
  zb = '_expNum_bjf95_451',
  Hb = '_playback_bjf95_457',
  Ub = '_playbackHint_bjf95_467',
  $b = '_skip_bjf95_473',
  Gb = '_logLineNew_bjf95_484',
  Yb = '_dialogOverlay_bjf95_499',
  Xb = '_dialog_bjf95_499',
  Vb = '_dialogTitle_bjf95_534',
  Qb = '_dialogName_bjf95_540',
  Kb = '_dialogStats_bjf95_545',
  Zb = '_dialogStat_bjf95_545',
  Jb = '_fxIntro_bjf95_561',
  Pb = '_fxOutro_bjf95_581',
  Fb = '_fxLose_bjf95_590',
  P = {
    layout: I0,
    enemies: M0,
    enemy: D0,
    targeted: R0,
    enemyName: z0,
    down: H0,
    log: U0,
    logLine: $0,
    party: G0,
    rowTag: Y0,
    cardRow: X0,
    card: V0,
    cardActive: Q0,
    cardDecided: K0,
    cardName: Z0,
    uni: J0,
    cardJob: P0,
    gaugeRow: F0,
    gaugeLabel: W0,
    flash: eb,
    summons: tb,
    summon: lb,
    summonName: ab,
    summonHp: nb,
    cardNums: ib,
    cardCmd: sb,
    empty: rb,
    command: ob,
    skillList: cb,
    skillBtn: ub,
    skillTop: db,
    skillName: mb,
    skillDesc: _b,
    skillSummary: fb,
    target: pb,
    unionBanner: hb,
    unionBannerHead: gb,
    unionBannerDesc: kb,
    unionInfo: vb,
    unionCancel: yb,
    unionHint: bb,
    unionBtn: xb,
    cmdHead: Sb,
    menu: wb,
    menuBtn: Tb,
    tp: jb,
    menuBack: Nb,
    execRow: Eb,
    redo: Cb,
    primary: Ab,
    result: Lb,
    resultTitle: qb,
    resultBody: Bb,
    expList: Ob,
    expRow: Ib,
    expName: Mb,
    expLv: Db,
    expUp: Rb,
    expNum: zb,
    playback: Hb,
    playbackHint: Ub,
    skip: $b,
    logLineNew: Gb,
    dialogOverlay: Yb,
    dialog: Xb,
    dialogTitle: Vb,
    dialogName: Qb,
    dialogStats: Kb,
    dialogStat: Zb,
    fxIntro: Jb,
    fxOutro: Pb,
    fxLose: Fb,
  },
  Wb = '_row_1t6j7_1',
  e1 = '_label_1t6j7_8',
  t1 = '_track_1t6j7_16',
  l1 = '_fill_1t6j7_24',
  a1 = '_value_1t6j7_30',
  Yi = { row: Wb, label: e1, track: t1, fill: l1, value: a1 },
  On = ({ value: l, max: i, color: o = '#4caf50', label: r, showValue: u = !0 }) => {
    const d = i > 0 ? Math.max(0, Math.min(100, (l / i) * 100)) : 0;
    return m.jsxs('div', {
      className: Yi.row,
      children: [
        r ? m.jsx('span', { className: Yi.label, children: r }) : null,
        m.jsx('div', {
          className: Yi.track,
          children: m.jsx('div', {
            className: Yi.fill,
            style: { width: `${d}%`, backgroundColor: o },
          }),
        }),
        u
          ? m.jsxs('span', {
              className: Yi.value,
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
  Ke = {
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
  We = {
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
function n1(l) {
  return l.category === 'food' ? 0 : l.category === 'material' ? 8 : Math.floor(l.buyPrice / 2);
}
function i1(l) {
  var i;
  return ((i = We[l]) == null ? void 0 : i.category) === 'food';
}
const ft = {
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
  Xi = {
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
  zn = {
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
  Ge = {
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
  s1 = 500,
  Mu = 30,
  ls = 3,
  as = 2,
  Bp = ls + as,
  Vi = { TITLE_DEPTH: 20, REBIRTH_MIN_LEVEL: 30 },
  Ch = 5,
  r1 = 5,
  kl = {
    MAX_LEVEL: 5,
    STAT_PER_LEVEL: 2,
    INGOT_INC: { copper: 1, silver: 3, gold: 5 },
    FRAGMENTS_PER_INGOT: 10,
    RECYCLE_FRAGMENTS: 3,
  },
  Qi = (l) => l > 0 && l % Ge.BOSS_INTERVAL === 0,
  Du = (l) => Math.round(Ge.EXP_CURVE_BASE * Math.pow(l, Ge.EXP_CURVE_POW)),
  Rr = (l) => Math.round(Ge.SP_PER_LEVEL * Math.max(0, l - 1)),
  o1 = (l) => Rr(l) - Rr(l - 1),
  Ki = (l) => l < Ge.LEVEL_CAP,
  nd = (l, i) => 1 + Ge.ENEMY_SCALE_K * (l - i),
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
  lt = {
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
  Vn = {
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
  c1 = ['hp', 'tp', 'str', 'vit', 'agi', 'int', 'mnd', 'luc'],
  u1 = ['slash', 'pierce', 'bash'],
  zr = (l, i, o) => Math.max(i, Math.min(o, l));
function Ah(l, i) {
  const o = {};
  for (const r of c1) o[r] = Math.round(l[r] * i);
  return o;
}
function d1(l, i) {
  return Ah(l.baseStats, nd(i, l.refDepth));
}
function In(l, i) {
  const o = new Map();
  for (const u of l) {
    if (u.stat !== i) continue;
    const d = zr(u.modifier, 0.5, 1.5),
      f = o.get(u.stackGroup);
    (f === void 0 || Math.abs(d - 1) > Math.abs(f - 1)) && o.set(u.stackGroup, d);
  }
  let r = 1;
  for (const u of o.values()) r *= u;
  return zr(r, 0.25, 2);
}
function Op(l, i, o, r) {
  const u = (g) => (r == null ? void 0 : r[g]) ?? 1,
    d = (l.str * 2 + (i.atk ?? 0)) * In(o, 'patk') * u('patk'),
    f = (l.vit * 2 + (i.def ?? 0)) * In(o, 'pdef') * u('pdef'),
    h = (l.int * 2 + (i.mat ?? 0)) * In(o, 'matk') * u('matk'),
    p = (l.mnd * 2 + (i.mdf ?? 0)) * In(o, 'mdef') * u('mdef');
  return {
    patk: d,
    pdef: f,
    matk: h,
    mdef: p,
    hit: l.agi,
    acc: l.agi * In(o, 'acc') * u('acc'),
    eva: l.agi * In(o, 'eva') * u('eva'),
    crit: l.luc,
  };
}
const m1 = (l) => l.ailments.some((i) => i.type === 'blind'),
  _1 = (l) => l.ailments.some((i) => i.type === 'legBind');
function f1(l, i, o, r) {
  var T;
  const u = o.statBase === 'str',
    d = Op(l.stats, l.equip, l.buffs, l.passive),
    f = Op(i.stats, i.equip, i.buffs, i.passive),
    h = u ? d.patk : d.matk,
    p = u ? f.pdef : f.mdef;
  let g = !0;
  if (u) {
    const V = m1(l) ? Ge.BLIND_ACC_PENALTY : 0,
      ie = _1(i) ? 0 : f.eva,
      ue = zr(Ge.BASE_HIT + (d.acc - ie) * Ge.HIT_AGI_K - V, Ge.HIT_MIN, 1);
    g = r.next() < ue;
  }
  if (!g) return { damage: 0, hit: !1, critical: !1 };
  const v = (h * o.power * Ge.DAMAGE_DEF_K) / (Ge.DAMAGE_DEF_K + Math.max(0, p)),
    I = u && u1.includes(o.element),
    L = I && l.row === 'back' ? Ge.BACK_ROW_MELEE_MULT : 1,
    M = I && i.row === 'back' ? Ge.BACK_ROW_MELEE_MULT : 1,
    S = L * M,
    [E, x] = Ge.DMG_VARIANCE,
    C = E + r.next() * (x - E);
  let $ = v * o.elementMultiplier * S * C;
  const D = zr(
      Ge.CRIT_BASE +
        (l.stats.luc - i.stats.luc) * Ge.CRIT_LUC_K +
        (((T = l.passive) == null ? void 0 : T.crit) ?? 0),
      Ge.CRIT_MIN,
      Ge.CRIT_MAX
    ),
    ae = r.next() < D;
  return (
    ae && ($ *= Ge.CRIT_MULT),
    { damage: o.elementMultiplier === 0 ? 0 : Math.max(1, Math.floor($)), hit: !0, critical: ae }
  );
}
const Lh = () => Math.max(0, ...Object.values(ul).map((l) => l.tierBand)),
  qh = (l) => Math.floor((l - 1) / Ge.BAND_SIZE);
function Bh(l) {
  return qh(l) % (Lh() + 1);
}
function Oh(l) {
  return Math.floor(qh(l) / (Lh() + 1)) + 1;
}
function p1(l) {
  const i = Bh(l);
  return Object.values(ul)
    .filter((o) => o.tierBand === i && !o.isBoss && o.kind !== 'foe')
    .map((o) => o.id);
}
function h1(l, i) {
  const o = p1(l);
  if (o.length === 0) return [];
  const r = i.range(1, 3);
  return Array.from({ length: r }, () => i.pick(o));
}
function g1(l, i) {
  const o = lt[l];
  if (!o || i <= 0) return {};
  const r = i * kl.STAT_PER_LEVEL;
  return o.slot === 'weapon' ? { atk: r, mat: r } : o.slot === 'armor' ? { def: r, mdf: r } : {};
}
function Un(l) {
  return 1 + 0.5 * (Math.max(1, l ?? 1) - 1);
}
function Ih(l, i) {
  const o = lt[l];
  if (!o) return {};
  const r = Un(i),
    u = {};
  return (
    o.bonuses.atk && (u.atk = Math.round(o.bonuses.atk * r)),
    o.bonuses.mat && (u.mat = Math.round(o.bonuses.mat * r)),
    o.bonuses.def && (u.def = Math.round(o.bonuses.def * r)),
    o.bonuses.mdf && (u.mdf = Math.round(o.bonuses.mdf * r)),
    o.bonuses.statMods && (u.statMods = o.bonuses.statMods),
    u
  );
}
const Mh = ['weapon', 'armor', 'accessory'];
function k1(l, i, o) {
  const r = l.guild.equipment.map((d) => (d.id === i ? o(d) : d)),
    u = l.guild.members.map((d) => {
      let f = !1;
      const h = { ...d.equipment };
      for (const p of Mh) {
        const g = h[p];
        g && g.id === i && ((h[p] = o(g)), (f = !0));
      }
      return f ? { ...d, equipment: h } : d;
    });
  return { ...l, guild: { ...l.guild, equipment: r, members: u } };
}
function v1(l, i, o) {
  let r = l.guild.equipment.find((f) => f.id === i);
  if (!r)
    for (const f of l.guild.members)
      for (const h of Mh) {
        const p = f.equipment[h];
        (p == null ? void 0 : p.id) === i && (r = p);
      }
  if (!r) return { ok: !1, save: l, reason: 'notFound' };
  if (r.forgeLevel >= kl.MAX_LEVEL) return { ok: !1, save: l, reason: 'maxLevel' };
  if ((l.forgeInventory.ingots[o] ?? 0) <= 0) return { ok: !1, save: l, reason: 'noIngot' };
  const u = Math.min(kl.MAX_LEVEL, r.forgeLevel + kl.INGOT_INC[o]);
  let d = {
    ...l,
    forgeInventory: {
      ...l.forgeInventory,
      ingots: { ...l.forgeInventory.ingots, [o]: l.forgeInventory.ingots[o] - 1 },
    },
  };
  return ((d = k1(d, i, (f) => ({ ...f, forgeLevel: u }))), { ok: !0, save: d });
}
function y1(l, i) {
  if (!l.guild.equipment.find((f) => f.id === i)) return { ok: !1, save: l, reason: 'notFound' };
  const r = l.guild.equipment.filter((f) => f.id !== i),
    u = { ...l.forgeInventory.fragments };
  u.common = (u.common ?? 0) + kl.RECYCLE_FRAGMENTS;
  let d = l.forgeInventory.ingots.copper;
  for (; u.common >= kl.FRAGMENTS_PER_INGOT; ) ((u.common -= kl.FRAGMENTS_PER_INGOT), (d += 1));
  return {
    ok: !0,
    save: {
      ...l,
      guild: { ...l.guild, equipment: r },
      forgeInventory: {
        ...l.forgeInventory,
        fragments: u,
        ingots: { ...l.forgeInventory.ingots, copper: d },
      },
    },
  };
}
function ya(l) {
  var r;
  const i = ((r = lt[l.masterId]) == null ? void 0 : r.name) ?? l.masterId,
    o = l.grade && l.grade > 1 ? `${i} Lv${l.grade}` : i;
  return l.forgeLevel > 0 ? `${o} +${l.forgeLevel}` : o;
}
const Dh = (l) => l.grade ?? 1;
function id(l, i, o) {
  return l.guild.storage
    .filter((r) => r.itemId === i && o === void 0)
    .reduce((r, u) => r + u.qty, 0);
}
function sd(l, i, o = 1, r = 1) {
  if (o <= 0) return l;
  const u = [...l.guild.storage],
    d = u.findIndex((f) => f.itemId === i && Dh(f) === r);
  return (
    d >= 0
      ? (u[d] = { ...u[d], qty: u[d].qty + o })
      : u.push(r > 1 ? { itemId: i, qty: o, grade: r } : { itemId: i, qty: o }),
    { ...l, guild: { ...l.guild, storage: u } }
  );
}
function rd(l, i, o = 1, r = 1) {
  if (o <= 0) return l;
  const u = l.guild.storage.findIndex((h) => h.itemId === i && Dh(h) === r);
  if (u < 0 || l.guild.storage[u].qty < o) return l;
  const d = [...l.guild.storage],
    f = d[u].qty - o;
  return (
    f <= 0 ? d.splice(u, 1) : (d[u] = { ...d[u], qty: f }),
    { ...l, guild: { ...l.guild, storage: d } }
  );
}
const Rh = 60,
  Kr = (l) => l.guild.foodStorage ?? [];
function zh(l) {
  return Kr(l).reduce((i, o) => i + o.qty, 0);
}
function od(l, i) {
  var o;
  return ((o = Kr(l).find((r) => r.itemId === i)) == null ? void 0 : o.qty) ?? 0;
}
function Hh(l, i, o = 1) {
  if (o <= 0) return l;
  const r = Rh - zh(l),
    u = Math.min(o, Math.max(0, r));
  if (u <= 0) return l;
  const d = [...Kr(l)],
    f = d.findIndex((h) => h.itemId === i);
  return (
    f >= 0 ? (d[f] = { ...d[f], qty: d[f].qty + u }) : d.push({ itemId: i, qty: u }),
    { ...l, guild: { ...l.guild, foodStorage: d } }
  );
}
function Uh(l, i, o = 1) {
  if (o <= 0) return l;
  const r = [...Kr(l)],
    u = r.findIndex((f) => f.itemId === i);
  if (u < 0 || r[u].qty < o) return l;
  const d = r[u].qty - o;
  return (
    d <= 0 ? r.splice(u, 1) : (r[u] = { ...r[u], qty: d }),
    { ...l, guild: { ...l.guild, foodStorage: r } }
  );
}
function $h(l, i, o) {
  return {
    ...l,
    guild: { ...l.guild, members: l.guild.members.map((r) => (r.id === i ? o(r) : r)) },
  };
}
function b1() {
  return `eq_${Date.now().toString(36)}_${Math.floor(Math.random() * 16777215).toString(36)}`;
}
function x1(l, i, o = 0, r = 1) {
  if (!lt[i]) return l;
  const u = { id: b1(), masterId: i, forgeLevel: o };
  return (
    r > 1 && (u.grade = r),
    { ...l, guild: { ...l.guild, equipment: [...l.guild.equipment, u] } }
  );
}
function cd(l, i) {
  const o = lt[i];
  if (!o) return !1;
  const r = Ke[l.classId];
  return r
    ? o.slot === 'weapon'
      ? !!o.weaponType && r.equipableWeaponTypes.includes(o.weaponType)
      : o.slot === 'armor'
        ? !!o.armorType && r.equipableArmorTypes.includes(o.armorType)
        : !0
    : !1;
}
function S1(l, i, o) {
  const r = l.guild.equipment.find((g) => g.id === o),
    u = l.guild.members.find((g) => g.id === i);
  if (!r || !u || !cd(u, r.masterId)) return l;
  const d = lt[r.masterId];
  let f = l.guild.equipment.filter((g) => g.id !== o);
  const h = u.equipment[d.slot];
  h && (f = [...f, h]);
  const p = { ...l, guild: { ...l.guild, equipment: f } };
  return $h(p, i, (g) => ({ ...g, equipment: { ...g.equipment, [d.slot]: r } }));
}
function ud(l, i, o) {
  const r = l.guild.members.find((f) => f.id === i);
  if (!r) return l;
  const u = r.equipment[o];
  if (!u) return l;
  const d = { ...l, guild: { ...l.guild, equipment: [...l.guild.equipment, u] } };
  return $h(d, i, (f) => ({ ...f, equipment: { ...f.equipment, [o]: null } }));
}
const Ru = {
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
  w1 = ['patk', 'matk', 'pdef', 'mdef', 'acc', 'eva', 'maxHp', 'maxTp'];
function T1(l) {
  var o;
  const i = l.equipment.weapon;
  if (i) return (o = lt[i.masterId]) == null ? void 0 : o.weaponType;
}
function j1(l) {
  const i = T1(l),
    o = {};
  let r = 0;
  for (const [u, d] of Object.entries(l.learnedSkills)) {
    if (d <= 0) continue;
    const f = Ru[u];
    if (!f || (f.weaponType && f.weaponType !== i)) continue;
    const h = f.mods(d);
    for (const p of w1) h[p] !== void 0 && (o[p] = (o[p] ?? 1) * h[p]);
    h.crit !== void 0 && (r += h.crit);
  }
  return (r !== 0 && (o.crit = r), o);
}
const mt = (l) => ({ hp: 0, tp: 0, str: 0, vit: 0, agi: 0, int: 0, mnd: 0, luc: 0, ...l }),
  $l = {
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
  N1 = ['hp', 'tp', 'str', 'vit', 'agi', 'int', 'mnd', 'luc'];
function Gl(l) {
  var h, p;
  const i = ft[l.raceId];
  if (!i) throw new Error(`computeBaseStats: 未定義の種族 "${l.raceId}"`);
  const r = Math.max(1, Math.min(l.level, Ge.LEVEL_CAP)) - 1,
    u = l.titleId ? ((h = $l[l.titleId]) == null ? void 0 : h.growthModifier) : void 0,
    d = ((p = l.rebirthBonus) == null ? void 0 : p.allStats) ?? 0,
    f = {};
  for (const g of N1) {
    const y = i.statGrowth[g] + ((u == null ? void 0 : u[g]) ?? 0);
    f[g] = i.baseStatsAtLv1[g] + y * r + d;
  }
  return f;
}
const E1 = 3,
  Yl = (l, i, o) => Math.max(i, Math.min(o, l)),
  C1 = {
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
function A1(l) {
  const i = { atk: 0, mat: 0, def: 0, mdf: 0 };
  for (const o of Object.values(l.equipment)) {
    if (!o || !lt[o.masterId]) continue;
    const u = Ih(o.masterId, o.grade),
      d = g1(o.masterId, o.forgeLevel);
    ((i.atk += (u.atk ?? 0) + (d.atk ?? 0)),
      (i.mat += (u.mat ?? 0) + (d.mat ?? 0)),
      (i.def += (u.def ?? 0) + (d.def ?? 0)),
      (i.mdf += (u.mdf ?? 0) + (d.mdf ?? 0)));
  }
  return i;
}
function L1(l, i) {
  var g;
  const o = l.guild.members.find((y) => y.id === i);
  if (!o) return null;
  const r = (g = l.diveState) == null ? void 0 : g.party.find((y) => y.charId === i),
    u = Gl(o),
    d = j1(o),
    f = Math.round(u.hp * (d.maxHp ?? 1)),
    h = Math.round(u.tp * (d.maxTp ?? 1)),
    p = l.guild.party.front.includes(i);
  return {
    id: i,
    name: o.name,
    side: 'ally',
    row: p ? 'front' : 'back',
    stats: u,
    equip: A1(o),
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
function q1(l, i, o) {
  const r = ul[l],
    u = d1(r, o),
    d = Oh(o);
  return {
    id: `enemy_${i}`,
    name: d >= 2 ? `${r.name} Lv${d}` : r.name,
    side: 'enemy',
    row: 'front',
    stats: u,
    equip: {},
    hp: u.hp,
    maxHp: u.hp,
    tp: u.tp,
    maxTp: u.tp,
    buffs: [],
    ailments: [],
    unionGauge: 0,
    isDown: !1,
    enemyId: l,
    resist: r.resist,
  };
}
function Gh(l, i, o, r, u) {
  const d = Vn[l],
    f = Ah(d.baseStats, nd(i, d.refDepth)),
    h = u ?? f.hp;
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
function Ip(l, i, o = 'none') {
  var p, g;
  const r = ((p = l.diveState) == null ? void 0 : p.depth) ?? 1,
    d = [...l.guild.party.front, ...l.guild.party.back]
      .filter((y) => y !== null)
      .map((y) => L1(l, y))
      .filter((y) => y !== null),
    f = i.map((y, v) => q1(y, v, r)),
    h = (((g = l.diveState) == null ? void 0 : g.persistentSummons) ?? [])
      .map((y, v) => Gh(y.summonKind, r, y.ownerId, `summon_persist_${v}`, y.hp))
      .filter((y) => !y.isDown);
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
  Zr = (l) => l.summons.filter((i) => !i.isDown);
function Ul(l, i) {
  return (
    l.allies.find((o) => o.id === i) ??
    l.enemies.find((o) => o.id === i) ??
    l.summons.find((o) => o.id === i)
  );
}
const dd = (l) => {
    var i;
    return (
      !!l.isSummon && !!l.summonKind && ((i = Vn[l.summonKind]) == null ? void 0 : i.buffImmune)
    );
  },
  B1 = (l, i) => {
    var o;
    return ((o = l.resist) == null ? void 0 : o[i]) ?? 1;
  };
function Yh(l, i, o) {
  ((l.hp = Yl(l.hp - i, 0, l.maxHp)),
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
function zu(l, i) {
  l.isDown || (l.unionGauge = Yl(l.unionGauge + i, 0, 100));
}
function Hu(l, i) {
  dd(l) ||
    ((l.buffs = l.buffs.filter((o) => !(o.stat === i.stat && o.stackGroup === i.stackGroup))),
    l.buffs.push(i));
}
function O1(l, i) {
  if (dd(l)) return;
  const o = l.ailments.find((r) => r.type === i.type);
  if (o) {
    o.remainingTurns = Math.max(o.remainingTurns, i.remainingTurns);
    return;
  }
  l.ailments.push(i);
}
function jr(l, i) {
  dd(l) || (l.states = [...(l.states ?? []).filter((o) => o.kind !== i.kind), i]);
}
function I1(l, i) {
  return i.side === 'ally' ? [..._t(l, 'ally'), ...Zr(l)] : _t(l, 'enemy');
}
function M1(l, i, o) {
  const r = (l.states ?? []).find((d) => d.kind === 'barrier' && d.absorb > 0);
  if (!r || r.kind !== 'barrier') return i;
  const u = Math.min(r.absorb, i);
  return (
    (r.absorb -= u),
    u > 0 && o.push({ text: `${l.name} は障壁で ${u} のダメージを防いだ` }),
    r.absorb <= 0 && (l.states = (l.states ?? []).filter((d) => d !== r)),
    i - u
  );
}
function Hr(l, i, o, r, u, d = {}) {
  if (o.isDown) return { hit: !1, dealt: 0 };
  const f = f1(
    i,
    o,
    {
      statBase: r.statBase,
      power: r.power,
      element: r.element,
      elementMultiplier: B1(o, r.element),
    },
    u
  );
  if (!f.hit) return (l.log.push({ text: `${i.name} の攻撃は外れた` }), { hit: !1, dealt: 0 });
  const h = M1(o, f.damage, l.log);
  return (
    Yh(o, h, l.log),
    d.actorUnion && zu(i, d.actorUnion),
    zu(o, 5),
    h > 0 &&
      l.log.push({
        text: `${i.name} の攻撃！ ${o.name} に ${h} ダメージ${f.critical ? '（会心）' : ''}`,
      }),
    { hit: !0, dealt: h }
  );
}
function Xh(l, i, o, r, u, d) {
  if (!o.isDown && !i.isDown && o.side !== i.side)
    for (const f of o.states ?? []) {
      if (f.kind !== 'counter' || d.next() >= f.chance) continue;
      l.log.push({ text: `${o.name} の反撃！` });
      const h = f.statBase === 'str' ? 'bash' : 'almighty';
      if ((Hr(l, o, i, { statBase: f.statBase, power: f.power, element: h }, d), i.isDown)) break;
    }
  if (u > 0 && o.side !== i.side) {
    for (const f of I1(l, i))
      if (!(f.id === i.id || f.isDown || o.isDown))
        for (const h of f.states ?? [])
          h.kind === 'chase' &&
            ((h.element !== r && h.element !== 'almighty' && r !== 'almighty') ||
              (l.log.push({ text: `${f.name} の連携追撃！` }),
              Hr(l, f, o, { statBase: h.statBase, power: h.power, element: h.element }, d)));
  }
}
function D1(l, i, o) {
  return Yl(l * (1 + (i.stats.luc - o.stats.luc) * Ge.AILMENT_LUC_K), 0, Ge.AILMENT_MAX);
}
function Vh(l, i, o, r) {
  const u = i.side === 'ally' ? 'enemy' : 'ally';
  switch (o) {
    case 'self':
      return [i];
    case 'allyAll':
      return i.side === 'ally' ? [..._t(l, 'ally'), ...Zr(l)] : _t(l, 'enemy');
    case 'allyOne': {
      const d = Ul(l, r);
      return d && d.side === i.side ? [d] : [i];
    }
    case 'enemyAll':
      return _t(l, u);
    case 'enemyRow':
    case 'enemyOne':
    default: {
      const d = Ul(l, r);
      return d && d.side === u && !d.isDown ? [d] : _t(l, u).slice(0, 1);
    }
  }
}
function R1(l, i, o, r) {
  return Vh(l, i, o.target, r);
}
function Qh(l, i, o, r, u, d, f) {
  switch (o.kind) {
    case 'damage': {
      const h = o.hits ?? 1,
        p = o.power(u);
      for (const g of d) {
        if (g.isDown) continue;
        let y = !1,
          v = 0;
        for (let I = 0; I < h && !g.isDown; I++) {
          const L = Hr(l, i, g, { statBase: o.statBase, power: p, element: r }, f);
          L.hit && ((y = !0), (v += L.dealt));
        }
        y && Xh(l, i, g, r, v, f);
      }
      break;
    }
    case 'heal': {
      const h = o.amount(u);
      for (const p of d) p.isDown || (p.hp = Yl(p.hp + h, 0, p.maxHp));
      l.log.push({ text: `${i.name} は回復魔法を使った（+${h}）` });
      break;
    }
    case 'buff': {
      for (const h of d)
        Hu(h, {
          stat: o.stat,
          modifier: o.modifier(u),
          remainingTurns: o.turns,
          stackGroup: o.stackGroup,
        });
      l.log.push({ text: `${i.name} は態勢を整えた` });
      break;
    }
    case 'ailment': {
      for (const h of d) {
        if (h.isDown) continue;
        const p = D1(o.chance(u), i, h);
        f.next() < p &&
          (O1(h, { type: o.ailment, remainingTurns: o.turns, magnitude: o.magnitude }),
          l.log.push({ text: `${h.name} は${C1[o.ailment]}になった` }));
      }
      break;
    }
    case 'summon': {
      if (i.side !== 'ally') break;
      if (Zr(l).length >= E1) {
        l.log.push({ text: 'これ以上は召喚できない' });
        break;
      }
      const h = `summon_${l.turn}_${l.summons.length}`,
        p = Gh(o.summonKind, l.depth, i.id, h);
      (l.summons.push(p), l.log.push({ text: `${i.name} は ${p.name} を召喚した！` }));
      break;
    }
    case 'counter': {
      for (const h of d)
        h.isDown ||
          jr(h, {
            kind: 'counter',
            chance: o.chance(u),
            power: o.power(u),
            statBase: o.statBase,
            remainingTurns: o.turns,
          });
      l.log.push({ text: `${i.name} は反撃の構えを取った` });
      break;
    }
    case 'chase': {
      for (const h of d)
        h.isDown ||
          jr(h, {
            kind: 'chase',
            element: r,
            power: o.power(u),
            statBase: o.statBase,
            remainingTurns: o.turns,
          });
      l.log.push({ text: `${i.name} は連携の構えを取った` });
      break;
    }
    case 'decoy': {
      for (const h of d)
        h.isDown || jr(h, { kind: 'decoy', weight: o.weight(u), remainingTurns: o.turns });
      l.log.push({ text: `${i.name} は敵の注意を引きつけた` });
      break;
    }
    case 'barrier': {
      for (const h of d)
        h.isDown || jr(h, { kind: 'barrier', absorb: o.absorb(u), remainingTurns: o.turns });
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
function xu(l, i, o, r) {
  var f;
  if (o.isDown) return;
  const u = i.enemyId
      ? (ul[i.enemyId].attackElement ?? 'bash')
      : i.isSummon && i.summonKind
        ? (((f = Vn[i.summonKind]) == null ? void 0 : f.attackElement) ?? 'bash')
        : 'bash',
    d = Hr(l, i, o, { statBase: 'str', power: 1, element: u }, r, { actorUnion: 5 });
  d.hit && Xh(l, i, o, u, d.dealt, r);
}
const Mp = (l) => (l.length === 0 ? 0 : l.reduce((i, o) => i + o.stats.agi, 0) / l.length);
function z1(l, i) {
  const o = l.map(
      (d) => 1 + (d.states ?? []).reduce((f, h) => f + (h.kind === 'decoy' ? h.weight : 0), 0)
    ),
    r = o.reduce((d, f) => d + f, 0);
  let u = i.next() * r;
  for (let d = 0; d < l.length; d++) if (((u -= o[d]), u < 0)) return l[d];
  return l[l.length - 1];
}
const H1 = (l) => l.ailments.some((i) => i.type === 'paralysis'),
  U1 = (l) => l.ailments.some((i) => i.type === 'sleep'),
  md = (l, i) => l.ailments.some((o) => o.type === i),
  Su = (l) => md(l, 'armBind'),
  $1 = (l) => md(l, 'headBind'),
  G1 = (l) => md(l, 'legBind');
function Dp(l) {
  return l.effects.some((i) => i.kind === 'damage' && i.statBase === 'str');
}
function Y1(l, i, o) {
  const r = zn[i.unionSkillId];
  if (!r) return;
  const u = Ul(l, i.actorId);
  if (!u || u.isDown || u.side !== 'ally') return;
  if (u.unionGauge < 100) {
    l.log.push({ text: `${u.name} はユニオンゲージが足りない` });
    return;
  }
  const d = new Set(i.participantIds);
  d.add(u.id);
  const f = [...d].map((y) => Ul(l, y)).filter((y) => !!y && !y.isDown && y.side === 'ally');
  if (f.length < r.requiredParticipants) {
    l.log.push({ text: `${u.name} の${r.name}は参加人数が足りない` });
    return;
  }
  const h = [u, ...f.filter((y) => y.id !== u.id)].slice(0, r.requiredParticipants);
  for (const y of h) y.unionGauge = Yl(y.unionGauge - r.gaugeCostPerParticipant, 0, 100);
  l.log.push({ text: `ユニオン！ ${u.name} の${r.name}！` });
  const p = 1,
    g = Vh(l, u, r.target, i.targetId);
  for (const y of r.effects) Qh(l, u, y, r.element, p, g, o);
}
function X1(l, i, o) {
  var I, L, M;
  if (l.outcome !== 'ongoing') return l;
  const r = structuredClone({ ...l, log: [] }),
    u = r.log.push.bind(r.log);
  r.log.push = (...S) => {
    const E = u(...S),
      x = {};
    for (const C of [...r.allies, ...r.enemies, ...r.summons])
      x[C.id] = { hp: C.hp, isDown: C.isDown };
    for (const C of S) C.snapshot = x;
    return E;
  };
  const d = new Map(i.filter((S) => S.kind !== 'union').map((S) => [S.actorId, S])),
    f = r.turn === 1 && r.firstStrike !== 'none',
    h = f && r.firstStrike === 'preemptive',
    p = f && r.firstStrike === 'ambush';
  if (
    (h && r.log.push({ text: '先制攻撃！ 味方が先手を取った' }),
    p && r.log.push({ text: '不意打ち！ 敵に先手を取られた' }),
    !p)
  )
    for (const S of i) S.kind === 'union' && Y1(r, S, o);
  const g = i.find((S) => S.kind === 'flee');
  if (!p && g && r.outcome === 'ongoing') {
    const S = Ul(r, g.actorId);
    if (S && G1(S)) r.log.push({ text: `${S.name} は脚を封じられて逃げられない` });
    else {
      const E = Yl(0.5 + (Mp(_t(r, 'ally')) - Mp(_t(r, 'enemy'))) * 0.02, 0.1, 0.95);
      if (o.next() < E)
        return (r.log.push({ text: 'うまく逃げ切れた！' }), (r.outcome = 'fled'), r);
      r.log.push({ text: '逃げられなかった！' });
    }
  }
  if (!p)
    for (const S of i) {
      if (S.kind !== 'guard') continue;
      const E = Ul(r, S.actorId);
      !E ||
        E.isDown ||
        (Hu(E, { stat: 'pdef', modifier: 1.5, remainingTurns: 1, stackGroup: 'guard' }),
        Hu(E, { stat: 'mdef', modifier: 1.5, remainingTurns: 1, stackGroup: 'guard' }));
    }
  const y = new Map();
  if (!h)
    for (const S of _t(r, 'enemy')) {
      const E = [...Zr(r), ..._t(r, 'ally')];
      E.length > 0 && y.set(S.id, z1(E, o).id);
    }
  const v = [...r.allies, ...r.enemies, ...r.summons]
    .filter((S) => !S.isDown)
    .filter((S) => !(h && S.side === 'enemy') && !(p && S.side === 'ally'))
    .map((S) => ({ c: S, agi: S.stats.agi, tie: o.next() }))
    .sort((S, E) => E.agi - S.agi || E.tie - S.tie)
    .map((S) => S.c);
  for (const S of v)
    if (!S.isDown) {
      if (r.outcome !== 'ongoing') break;
      if (U1(S)) {
        r.log.push({ text: `${S.name} は眠っている` });
        continue;
      }
      if (H1(S) && o.next() < Ge.PARALYSIS_SKIP) {
        r.log.push({ text: `${S.name} は麻痺で動けない` });
        continue;
      }
      if (S.isSummon) {
        const E = S.summonKind ? Vn[S.summonKind] : void 0;
        if (E != null && E.actsOnTurn) {
          const x = _t(r, 'enemy');
          x.length > 0 && xu(r, S, o.pick(x), o);
        }
        if (_t(r, 'enemy').length === 0) break;
        continue;
      }
      if (S.side === 'enemy') {
        if (Su(S)) {
          r.log.push({ text: `${S.name} は腕を封じられて攻撃できない` });
          continue;
        }
        const E = y.get(S.id),
          x = E ? Ul(r, E) : void 0,
          C = x && !x.isDown ? x : _t(r, 'ally')[0];
        C && xu(r, S, C, o);
      } else {
        const E = d.get(S.id);
        if (!E || E.kind === 'guard' || E.kind === 'flee') continue;
        if (E.kind === 'attack') {
          if (Su(S)) {
            r.log.push({ text: `${S.name} は腕を封じられて攻撃できない` });
            continue;
          }
          const x = Ul(r, E.targetId),
            C = x && !x.isDown ? x : _t(r, 'enemy')[0];
          C && xu(r, S, C, o);
        } else if (E.kind === 'skill') {
          const x = Wt[E.skillId];
          if (!x) continue;
          if (Dp(x) && Su(S)) {
            r.log.push({ text: `${S.name} は腕を封じられてスキルを使えない` });
            continue;
          }
          if (!Dp(x) && $1(S)) {
            r.log.push({ text: `${S.name} は頭を封じられてスキルを使えない` });
            continue;
          }
          const C = 1,
            $ = x.tpCost(C);
          if (S.tp < $) {
            r.log.push({ text: `${S.name} は TP が足りない` });
            continue;
          }
          ((S.tp -= $), zu(S, 10));
          const D = R1(r, S, x, E.targetId);
          for (const ae of x.effects) Qh(r, S, ae, x.element, C, D, o);
        } else if (E.kind === 'item') {
          const x = We[E.itemId];
          if (!x || !((I = x.useContext) != null && I.includes('battle'))) continue;
          const C = Ul(r, E.targetId) ?? S;
          for (const $ of x.effects ?? [])
            $.kind === 'heal'
              ? (C.hp = Yl(C.hp + $.amount(1), 0, C.maxHp))
              : $.kind === 'restoreTp' && (C.tp = Yl(C.tp + $.amount(1), 0, C.maxTp));
          (r.consumedItems.push(E.itemId), r.log.push({ text: `${S.name} は ${x.name} を使った` }));
        }
      }
      if (_t(r, 'enemy').length === 0 || _t(r, 'ally').length === 0) break;
    }
  for (const S of [...r.allies, ...r.enemies, ...r.summons]) {
    if (S.isDown) continue;
    const E = S.ailments.find((x) => x.type === 'poison');
    if (E) {
      const x = E.magnitude ?? Math.max(1, Math.floor(S.maxHp * Ge.POISON_HP_RATIO));
      (Yh(S, x, r.log), r.log.push({ text: `${S.name} は毒で ${x} のダメージ` }));
    }
  }
  for (const S of [...r.allies, ...r.enemies, ...r.summons])
    (!S.isDown &&
      S.maxTp > 0 &&
      (S.tp = Math.min(S.maxTp, S.tp + Math.ceil(S.maxTp * Ge.TP_REGEN_RATIO))),
      (S.buffs = S.buffs
        .map((E) => ({ ...E, remainingTurns: E.remainingTurns - 1 }))
        .filter((E) => E.remainingTurns > 0)),
      (S.ailments = S.ailments
        .map((E) => ({ ...E, remainingTurns: E.remainingTurns - 1 }))
        .filter((E) => E.remainingTurns > 0)),
      S.states &&
        S.states.length > 0 &&
        (S.states = S.states
          .map((E) => ({ ...E, remainingTurns: E.remainingTurns - 1 }))
          .filter((E) => E.remainingTurns > 0)));
  for (const S of r.enemies)
    if (
      !(
        !S.isDown ||
        !S.enemyId ||
        (((L = l.enemies.find((x) => x.id === S.id)) == null ? void 0 : L.isDown) ?? !1)
      )
    )
      for (const x of ul[S.enemyId].drops ?? [])
        o.next() < x.rate &&
          (r.drops.push({ enemyId: S.enemyId, itemId: x.itemId }),
          r.log.push({
            text: `${S.name} は ${((M = We[x.itemId]) == null ? void 0 : M.name) ?? x.itemId} を落とした`,
          }));
  return (
    (r.summons = r.summons.filter((S) => !S.isDown)),
    (r.turn += 1),
    _t(r, 'enemy').length === 0
      ? (r.outcome = 'win')
      : _t(r, 'ally').length === 0 && (r.outcome = 'lose'),
    r
  );
}
function _d(l) {
  let i = 0,
    o = 0;
  for (const r of l.enemies) {
    if (!r.enemyId) continue;
    const u = ul[r.enemyId],
      d = nd(l.depth, u.refDepth);
    ((i += Math.round(u.exp * d)), (o += Math.round(u.gold * d)));
  }
  return { exp: i, gold: o };
}
function V1(l, i) {
  if (i.outcome !== 'win' || !l.diveState) return [];
  const { exp: o } = _d(i),
    r = new Set(l.diveState.party.map((f) => f.charId)),
    u = r.size > 0 ? Math.floor(o / r.size) : 0,
    d = [];
  for (const f of l.guild.members) {
    if (!r.has(f.id)) continue;
    const h = Kh(f, u),
      p = {};
    if (h.level > f.level) {
      const g = Gl(f),
        y = Gl(h);
      for (const v of Object.keys(g)) {
        const I = Math.round(y[v] - g[v]);
        I !== 0 && (p[v] = I);
      }
    }
    d.push({
      charId: f.id,
      name: f.name,
      gainedExp: Ki(f.level) ? u : 0,
      fromLevel: f.level,
      toLevel: h.level,
      exp: h.exp,
      expToNext: Ki(h.level) ? Du(h.level) : 0,
      statGains: p,
    });
  }
  return d;
}
function Kh(l, i) {
  let o = l.level,
    r = l.exp + (Ki(o) ? i : 0),
    u = l.skillPoints.total;
  for (; Ki(o) && r >= Du(o); ) ((r -= Du(o)), (o += 1), (u += o1(o)));
  return {
    ...l,
    level: o,
    exp: Ki(l.level) ? r : l.exp,
    skillPoints: { ...l.skillPoints, total: u },
  };
}
function Rp(l, i) {
  if (!l.diveState) return l;
  const o = i.outcome === 'win',
    r = i.outcome === 'win' || i.outcome === 'fled',
    u = new Map(i.allies.map((L) => [L.id, L])),
    d = l.diveState.party.map((L) => {
      const M = u.get(L.charId);
      if (!M) return L;
      let S = M.unionGauge;
      return (
        r && !M.isDown && (S = Yl(S + Ge.UNION_GAIN_ON_WIN, 0, 100)),
        { ...L, hp: M.hp, tp: M.tp, unionGauge: S, ailments: M.ailments }
      );
    });
  let f = l.guild.members,
    h = l.guild.gold;
  const p = { ...l.bestiary.monsters };
  for (const L of i.enemies) {
    if (!L.enemyId) continue;
    const M = p[L.enemyId] ?? { seen: !1, defeated: !1, dropsFound: [] };
    p[L.enemyId] = { ...M, seen: !0, defeated: M.defeated || L.isDown };
  }
  if (o)
    for (const L of i.drops) {
      const M = p[L.enemyId];
      M &&
        !M.dropsFound.includes(L.itemId) &&
        (p[L.enemyId] = { ...M, dropsFound: [...M.dropsFound, L.itemId] });
    }
  const g = { ...l.bestiary, monsters: p };
  if (o) {
    const { exp: L, gold: M } = _d(i);
    h += M;
    const S = new Set(d.map((x) => x.charId)),
      E = S.size > 0 ? Math.floor(L / S.size) : 0;
    f = f.map((x) => (S.has(x.id) ? Kh(x, E) : x));
  }
  const y = i.summons
    .filter((L) => {
      var M;
      return (
        !L.isDown &&
        L.summonKind &&
        ((M = Vn[L.summonKind]) == null ? void 0 : M.persistsAfterBattle)
      );
    })
    .map((L) => ({ summonKind: L.summonKind, ownerId: L.ownerId ?? '', hp: L.hp }));
  let v = {
    ...l,
    guild: { ...l.guild, members: f, gold: h, bestiary: g },
    bestiary: g,
    diveState: { ...l.diveState, party: d, persistentSummons: y },
  };
  for (const L of i.consumedItems) v = rd(v, L, 1);
  const I = Oh(i.depth);
  if (o) for (const L of i.drops) v = sd(v, L.itemId, 1, I);
  return v;
}
const Q1 = 8,
  Uu = 16,
  Zi = 5;
function fd(l) {
  return l.range(Q1, Uu);
}
function K1(l, i) {
  const o = l - 1;
  return o <= 0
    ? { stepsUntilEncounter: fd(i), triggered: !0 }
    : { stepsUntilEncounter: o, triggered: !1 };
}
function Z1(l) {
  const i = Math.max(0, Uu - l),
    o = Math.round((i / Uu) * Zi);
  return Math.min(Zi, Math.max(0, o));
}
const el = { N: { dx: 0, dy: -1 }, E: { dx: 1, dy: 0 }, S: { dx: 0, dy: 1 }, W: { dx: -1, dy: 0 } },
  $n = ['N', 'E', 'S', 'W'];
function Zh(l) {
  return $n[($n.indexOf(l) + 1) % 4];
}
function Jh(l) {
  return $n[($n.indexOf(l) + 3) % 4];
}
function J1(l) {
  return $n[($n.indexOf(l) + 2) % 4];
}
const Ph = (l, i, o) => l >= 0 && i >= 0 && l < o.width && i < o.height;
function Ua(l, i, o, r) {
  if (l.cells[o][i].walls[r]) return !1;
  const u = i + el[r].dx,
    d = o + el[r].dy;
  return Ph(u, d, l) ? l.cells[d][u].passable : !1;
}
function P1(l, i, o) {
  return Ua(l, i.x, i.y, o) ? { x: i.x + el[o].dx, y: i.y + el[o].dy } : null;
}
function pd(l, i, o) {
  return ['N', 'E', 'S', 'W'].filter((r) => !l.cells[o][i].walls[r]);
}
function F1(l, i, o) {
  if (i.x === o.x && i.y === o.y) return [];
  if (!Ph(o.x, o.y, l) || !l.cells[o.y][o.x].passable) return null;
  const r = (f, h) => `${f},${h}`,
    u = new Map();
  u.set(r(i.x, i.y), null);
  const d = [{ ...i }];
  for (; d.length > 0; ) {
    const f = d.shift();
    for (const h of ['N', 'E', 'S', 'W']) {
      if (!Ua(l, f.x, f.y, h)) continue;
      const p = f.x + el[h].dx,
        g = f.y + el[h].dy,
        y = r(p, g);
      if (!u.has(y)) {
        if ((u.set(y, { x: f.x, y: f.y, dir: h }), p === o.x && g === o.y)) {
          const v = [];
          let I = y;
          for (;;) {
            const L = u.get(I);
            if (!L) break;
            (v.unshift(L.dir), (I = r(L.x, L.y)));
          }
          return v;
        }
        d.push({ x: p, y: g });
      }
    }
  }
  return null;
}
const zp = ['N', 'E', 'S', 'W'],
  wu = (l, i) => Math.abs(l.x - i.x) + Math.abs(l.y - i.y);
function W1(l, i, o, r, u) {
  const d = i.map((y) => ({ ...y, cell: { ...y.cell } })),
    f = new Map(l.foeSpawns.map((y) => [y.id, y])),
    h = new Set(d.filter((y) => !y.defeated).map((y) => `${y.cell.x},${y.cell.y}`));
  let p = null;
  const g = [...d].sort((y, v) => y.spawnId.localeCompare(v.spawnId, void 0, { numeric: !0 }));
  for (const y of g) {
    if (p) break;
    if (y.defeated) continue;
    const v = f.get(y.spawnId);
    if (!v) continue;
    !y.alerted && wu(y.cell, o) <= v.sightRange && (y.alerted = !0);
    const I = (L) => {
      if (!Ua(l, y.cell.x, y.cell.y, L)) return 'blocked';
      const M = y.cell.x + el[L].dx,
        S = y.cell.y + el[L].dy;
      if (M === o.x && S === o.y) {
        const E = L === r;
        return (
          (p = { spawnId: y.spawnId, enemyId: v.enemyId, firstStrike: E ? 'ambush' : 'none' }),
          'contact'
        );
      }
      return h.has(`${M},${S}`)
        ? 'blocked'
        : (h.delete(`${y.cell.x},${y.cell.y}`),
          (y.cell = { x: M, y: S }),
          h.add(`${M},${S}`),
          'moved');
    };
    if (y.alerted)
      for (let L = 0; L < v.moveSpeed; L++) {
        let M = null,
          S = wu(y.cell, o),
          E = !1;
        for (const C of zp) {
          const $ = y.cell.x + el[C].dx,
            D = y.cell.y + el[C].dy;
          if ($ === o.x && D === o.y && Ua(l, y.cell.x, y.cell.y, C)) {
            ((M = C), (E = !0));
            break;
          }
          if (!Ua(l, y.cell.x, y.cell.y, C) || h.has(`${$},${D}`)) continue;
          const ae = wu({ x: $, y: D }, o);
          ae < S && ((S = ae), (M = C));
        }
        if (!M) break;
        const x = I(M);
        if (x === 'contact' || x === 'blocked' || E) break;
      }
    else {
      const L = v.patrol;
      if (L.kind === 'wander') {
        const M = zp.filter(
          (S) =>
            Ua(l, y.cell.x, y.cell.y, S) && !h.has(`${y.cell.x + el[S].dx},${y.cell.y + el[S].dy}`)
        );
        M.length > 0 && I(u.pick(M));
      } else L.kind === 'charge' && I(L.dir);
    }
  }
  return { foes: d, contact: p };
}
const $a = {
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
  ex = Object.keys($a);
function tx(l) {
  const i = Object.values(ul)
    .filter((o) => o.tierBand === l && o.kind === 'foe')
    .map((o) => o.id);
  return i.length > 0
    ? i
    : Object.values(ul)
        .filter((o) => o.tierBand === l && !o.isBoss && o.kind !== 'foe')
        .map((o) => o.id);
}
function lx(l) {
  const i = Object.values(ul).filter((r) => r.isBoss);
  if (i.length === 0) return null;
  const o = i.filter((r) => r.tierBand === l);
  return o.length > 0 ? o[0].id : i.sort((r, u) => u.tierBand - r.tierBand)[0].id;
}
function ax(l, i, o, r, u) {
  for (const d of ['N', 'E', 'S', 'W']) {
    if (l[o][i].walls[d]) continue;
    const f = i + sl[d].dx,
      h = o + sl[d].dy;
    if (Ur(f, h, r, u) && !l[h][f].event) return { x: f, y: h };
  }
  return null;
}
const sl = { N: { dx: 0, dy: -1 }, E: { dx: 1, dy: 0 }, S: { dx: 0, dy: 1 }, W: { dx: -1, dy: 0 } },
  nx = { N: 'S', E: 'W', S: 'N', W: 'E' };
function ix(l) {
  return Math.min(25, 15 + Math.floor(l / 5));
}
function sx() {
  return { walls: { N: !0, E: !0, S: !0, W: !0 }, floorType: 'normal', passable: !0 };
}
const Ur = (l, i, o, r) => l >= 0 && i >= 0 && l < o && i < r;
function Hp(l, i, o, r) {
  const { dx: u, dy: d } = sl[r];
  ((l[o][i].walls[r] = !1), (l[o + d][i + u].walls[nx[r]] = !1));
}
function rx(l, i, o) {
  const r = l.length,
    u = l[0].length,
    d = Array.from({ length: r }, () => Array(u).fill(-1)),
    f = [{ x: i, y: o }];
  d[o][i] = 0;
  for (let h = 0; h < f.length; h++) {
    const { x: p, y: g } = f[h];
    for (const y of ['N', 'E', 'S', 'W']) {
      if (l[g][p].walls[y]) continue;
      const v = p + sl[y].dx,
        I = g + sl[y].dy;
      !Ur(v, I, u, r) || d[I][v] !== -1 || ((d[I][v] = d[g][p] + 1), f.push({ x: v, y: I }));
    }
  }
  return d;
}
function ox(l, i) {
  const o = ix(l),
    r = o,
    u = o,
    d = Array.from({ length: u }, () => Array.from({ length: r }, () => sx())),
    f = Array.from({ length: u }, () => Array(r).fill(!1)),
    h = i.int(r),
    p = i.int(u),
    g = [{ x: h, y: p }];
  for (f[p][h] = !0; g.length > 0; ) {
    const Y = g[g.length - 1],
      T = [];
    for (const W of ['N', 'E', 'S', 'W']) {
      const de = Y.x + sl[W].dx,
        ye = Y.y + sl[W].dy;
      Ur(de, ye, r, u) && !f[ye][de] && T.push(W);
    }
    if (T.length === 0) {
      g.pop();
      continue;
    }
    const V = i.pick(T);
    Hp(d, Y.x, Y.y, V);
    const ie = Y.x + sl[V].dx,
      ue = Y.y + sl[V].dy;
    ((f[ue][ie] = !0), g.push({ x: ie, y: ue }));
  }
  const y = Math.floor((r * u) / 25);
  for (let Y = 0; Y < y; Y++) {
    const T = i.int(r),
      V = i.int(u),
      ie = i.pick(['N', 'E', 'S', 'W']),
      ue = T + sl[ie].dx,
      W = V + sl[ie].dy;
    Ur(ue, W, r, u) && d[V][T].walls[ie] && Hp(d, T, V, ie);
  }
  const v = i.int(r),
    I = i.int(u),
    L = rx(d, v, I);
  let M = v,
    S = I,
    E = -1;
  for (let Y = 0; Y < u; Y++)
    for (let T = 0; T < r; T++) L[Y][T] > E && ((E = L[Y][T]), (M = T), (S = Y));
  ((d[I][v].event = { kind: 'stairsDown' }), (d[S][M].event = { kind: 'stairsUp' }));
  const x = Bh(l),
    C = [];
  if (Qi(l)) {
    const Y = lx(x);
    if (Y) {
      const T = ax(d, M, S, r, u) ?? { x: M, y: S };
      C.push({
        id: 'boss',
        enemyId: Y,
        startCell: T,
        patrol: { kind: 'static' },
        moveSpeed: 0,
        sightRange: 0,
        respawn: !1,
        isBoss: !0,
      });
    }
  } else {
    const Y = tx(x),
      T = 1 + Math.floor(l / 8);
    for (let V = 0; V < T && Y.length > 0; V++) {
      let ie = i.int(r),
        ue = i.int(u);
      for (let W = 0; W < 20; W++) {
        ((ie = i.int(r)), (ue = i.int(u)));
        const de = d[ue][ie].event,
          ye = Math.abs(ie - v) + Math.abs(ue - I) >= 3;
        if (!de && ye) break;
      }
      C.push({
        id: `foe_${V}`,
        enemyId: i.pick(Y),
        startCell: { x: ie, y: ue },
        patrol: { kind: 'wander' },
        moveSpeed: 1,
        sightRange: 3,
        respawn: !1,
      });
    }
  }
  const $ = [],
    D = () => {
      for (let Y = 0; Y < 25; Y++) {
        const T = i.int(r),
          V = i.int(u),
          ie = Math.abs(T - v) + Math.abs(V - I) >= 2;
        if (!d[V][T].event && ie) return { x: T, y: V };
      }
      return null;
    },
    ae = 2 + Math.floor(l / 10);
  for (let Y = 0; Y < ae; Y++) {
    const T = D();
    if (!T) break;
    const V = i.pick(ex),
      ie = `gather_${Y}`;
    ((d[T.y][T.x].event = { kind: 'gather', gatherId: ie }), $.push({ id: ie, cell: T, type: V }));
  }
  if (!Qi(l)) {
    const Y = D();
    Y && (d[Y.y][Y.x].event = { kind: 'cookingSpot', spotId: 'cook_0' });
  }
  return {
    depth: l,
    width: r,
    height: u,
    cells: d,
    encounterTable: `band_${x}`,
    foeSpawns: C,
    gatheringPoints: $,
    bgmId: Qi(l) ? 'bgm_boss' : 'bgm_dungeon',
  };
}
function Fh(l, i) {
  var o;
  for (let r = 0; r < l.height; r++)
    for (let u = 0; u < l.width; u++)
      if (((o = l.cells[r][u].event) == null ? void 0 : o.kind) === i) return { x: u, y: r };
  return null;
}
const cx = 4294967296;
function ux(l, i) {
  let o = 3735928559 ^ l,
    r = 1103547991 ^ l;
  for (let u = 0; u < i.length; u++) {
    const d = i.charCodeAt(u);
    ((o = Math.imul(o ^ d, 2654435761)), (r = Math.imul(r ^ d, 1597334677)));
  }
  return (
    (o = Math.imul(o ^ (o >>> 16), 2246822507) ^ Math.imul(r ^ (r >>> 13), 3266489909)),
    (r = Math.imul(r ^ (r >>> 16), 2246822507) ^ Math.imul(o ^ (o >>> 13), 3266489909)),
    (r >>> 0) ^ (o >>> 0)
  );
}
class hd {
  constructor(i, o) {
    mu(this, 'baseSeed');
    mu(this, '_state');
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
      ((i ^ (i >>> 14)) >>> 0) / cx
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
    const o = ux(this.baseSeed, i);
    return new hd(o, o);
  }
}
function ba(l) {
  return new hd(l, l);
}
function dx() {
  return Math.floor(Math.random() * 4294967296) >>> 0;
}
const $r = (l, i) => `${l},${i}`;
function mx(l, i) {
  return ba(l).fork(`floor:${i}`);
}
function Wh(l, i) {
  const o = l.towerState.floors[i];
  if (o) return { save: l, floor: o };
  const r = ox(i, mx(l.masterSeed, i)),
    u = r.foeSpawns.map((h) => ({
      spawnId: h.id,
      cell: { ...h.startCell },
      defeated: !1,
      alerted: !1,
    })),
    d = {
      depth: i,
      seed: l.masterSeed,
      generated: r,
      isBossFloor: Qi(i),
      encounterTier: Math.floor((i - 1) / 10),
      foeRuntime: u,
      openedChests: [],
      depletedGathers: [],
      consumedEvents: [],
    };
  return {
    save: { ...l, towerState: { ...l.towerState, floors: { ...l.towerState.floors, [i]: d } } },
    floor: d,
  };
}
function _x(l) {
  const i = [...l.guild.party.front, ...l.guild.party.back].filter((r) => r !== null),
    o = [];
  for (const r of i) {
    const u = l.guild.members.find((f) => f.id === r);
    if (!u) continue;
    const d = Gl(u);
    o.push({ charId: r, hp: d.hp, tp: d.tp, unionGauge: 0, ailments: [] });
  }
  return o;
}
function Gr(l, i, o, r) {
  const u = l.towerState.floors[i].generated,
    d = new Set(l.exploredCells[i] ?? []);
  d.add($r(o, r));
  for (const f of pd(u, o, r)) {
    const h = o + (f === 'E' ? 1 : f === 'W' ? -1 : 0),
      p = r + (f === 'S' ? 1 : f === 'N' ? -1 : 0);
    d.add($r(h, p));
  }
  return { ...l, exploredCells: { ...l.exploredCells, [i]: [...d] } };
}
function eg(l, i, o) {
  var p, g;
  const r = Wh(l, i);
  let u = r.save;
  const d = r.floor.generated,
    f = Fh(d, 'stairsDown') ?? { x: 0, y: 0 },
    h = pd(d, f.x, f.y)[0] ?? 'N';
  return (
    i > u.towerState.record.deepestReached &&
      (u = {
        ...u,
        towerState: { ...u.towerState, record: { ...u.towerState.record, deepestReached: i } },
      }),
    (u = {
      ...u,
      diveState: {
        depth: i,
        pos: { x: f.x, y: f.y },
        dir: h,
        party: ((p = u.diveState) == null ? void 0 : p.party) ?? _x(u),
        persistentSummons: ((g = u.diveState) == null ? void 0 : g.persistentSummons) ?? [],
        encounter: { stepsUntilEncounter: fd(o) },
        pendingFoeBattle: null,
      },
    }),
    Gr(u, i, f.x, f.y)
  );
}
function Up(l, i = 1) {
  const o = ba(l.masterSeed).fork(`dive:${l.towerState.record.totalDives}`),
    r = {
      ...l,
      diveState: null,
      towerState: {
        ...l.towerState,
        record: { ...l.towerState.record, totalDives: l.towerState.record.totalDives + 1 },
      },
    };
  return eg(r, i, o);
}
function tg(l, i) {
  return l.diveState ? { ...l, diveState: { ...l.diveState, dir: i } } : l;
}
function lg(l, i, o) {
  const r = l.towerState.floors[i];
  return {
    ...l,
    towerState: {
      ...l.towerState,
      floors: { ...l.towerState.floors, [i]: { ...r, foeRuntime: o } },
    },
  };
}
function $p(l, i, o) {
  const r = l.diveState;
  if (!r) return { save: l, moved: !1, triggered: !1 };
  const u = l.towerState.floors[r.depth],
    d = u.generated,
    f = P1(d, r.pos, i);
  if (!f) return { save: tg(l, i), moved: !1, triggered: !1 };
  const h = u.foeRuntime.find((v) => !v.defeated && v.cell.x === f.x && v.cell.y === f.y);
  if (h) {
    const v = d.foeSpawns.find((M) => M.id === h.spawnId),
      I = v
        ? {
            spawnId: h.spawnId,
            enemyId: v.enemyId,
            firstStrike: v.isBoss ? 'none' : 'preemptive',
            isBoss: v.isBoss,
          }
        : null;
    let L = { ...l, diveState: { ...r, pos: f, dir: i, pendingFoeBattle: I } };
    return ((L = Gr(L, r.depth, f.x, f.y)), { save: L, moved: !0, triggered: I !== null });
  }
  const p = K1(r.encounter.stepsUntilEncounter, o);
  let g = {
    ...l,
    diveState: {
      ...r,
      pos: f,
      dir: i,
      encounter: { stepsUntilEncounter: p.stepsUntilEncounter },
      pendingFoeBattle: null,
    },
  };
  g = Gr(g, r.depth, f.x, f.y);
  const y = W1(d, u.foeRuntime, f, i, o);
  return (
    (g = lg(g, r.depth, y.foes)),
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
      : { save: g, moved: !0, triggered: p.triggered }
  );
}
function fx(l, i) {
  const o = l.diveState;
  if (!o) return l;
  const r = o.pendingFoeBattle;
  let u = { ...l, diveState: { ...o, pendingFoeBattle: null } };
  if (r && i) {
    const f = u.towerState.floors[o.depth].foeRuntime.map((h) =>
      h.spawnId === r.spawnId ? { ...h, defeated: !0 } : h
    );
    ((u = lg(u, o.depth, f)), r.isBoss && (u = px(u, o.depth)));
  }
  return u;
}
function px(l, i, o = Date.now()) {
  const r = l.towerState,
    u = { ...r.bossGates, [i]: { depth: i, defeated: !0 } },
    d = r.warp.unlockedCheckpoints.includes(i)
      ? r.warp.unlockedCheckpoints
      : [...r.warp.unlockedCheckpoints, i].sort((p, g) => p - g),
    f = r.record.bossDefeatLog.some((p) => p.depth === i),
    h = {
      ...r.record,
      highestBossDefeated: Math.max(r.record.highestBossDefeated, i),
      bossDefeatLog: f ? r.record.bossDefeatLog : [...r.record.bossDefeatLog, { depth: i, at: o }],
    };
  return {
    ...l,
    towerState: { ...r, bossGates: u, warp: { ...r.warp, unlockedCheckpoints: d }, record: h },
  };
}
function ag(l, i) {
  var o;
  return Qi(i) ? ((o = l.towerState.bossGates[i]) == null ? void 0 : o.defeated) === !0 : !0;
}
function Gp(l) {
  const i = l.diveState;
  if (!i) return null;
  const o = l.towerState.floors[i.depth].generated.cells[i.pos.y][i.pos.x].event;
  return (o == null ? void 0 : o.kind) === 'stairsUp' ||
    (o == null ? void 0 : o.kind) === 'stairsDown'
    ? o.kind
    : null;
}
function hx(l) {
  if (!l.diveState || !ag(l, l.diveState.depth)) return l;
  const i = l.diveState.depth + 1,
    o = ba(l.masterSeed).fork(`enc:${i}:${l.towerState.record.totalDives}`);
  return eg(l, i, o);
}
function gx(l) {
  if (!l.diveState) return l;
  const i = l.diveState.depth;
  if (i <= 1) return Pi(l);
  const o = i - 1,
    r = Wh(l, o),
    u = Fh(r.floor.generated, 'stairsUp') ?? { x: 0, y: 0 },
    d = ba(l.masterSeed).fork(`enc:${o}:${l.towerState.record.totalDives}`);
  let f = r.save;
  const h = r.floor.generated,
    p = pd(h, u.x, u.y)[0] ?? 'N';
  return (
    (f = {
      ...f,
      diveState: {
        ...f.diveState,
        depth: o,
        pos: { x: u.x, y: u.y },
        dir: p,
        encounter: { stepsUntilEncounter: fd(d) },
        pendingFoeBattle: null,
      },
    }),
    Gr(f, o, u.x, u.y)
  );
}
function Pi(l) {
  return { ...l, diveState: null };
}
const Qn = {
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
function kx() {
  return Object.values(Qn)
    .filter((l) => l.unlockedByDefault)
    .map((l) => l.id);
}
const Ir = 2,
  vx = { autoMap: 'on', bgmVolume: 0.6, seVolume: 0.6 };
function Yp() {
  return { monsters: {}, items: {} };
}
function yx() {
  return { deepestReached: 0, highestBossDefeated: 0, totalDives: 0, bossDefeatLog: [] };
}
const bx = () => ({ weapon: null, armor: null, accessory: null });
function xx() {
  return `char_${Date.now().toString(36)}_${Math.floor(Math.random() * 16777215).toString(36)}`;
}
function ng(l) {
  var h;
  const { raceId: i, classId: o, name: r, id: u } = l;
  if (!ft[i]) throw new Error(`createCharacter: 未定義の種族 "${i}"`);
  if (!Ke[o]) throw new Error(`createCharacter: 未定義の職業 "${o}"`);
  const d = (h = Ke[o].skillTree.skills[0]) == null ? void 0 : h.skillId,
    f = d ? { [d]: 1 } : {};
  return {
    id: u ?? xx(),
    name: r,
    raceId: i,
    classId: o,
    titleId: null,
    level: 1,
    exp: 0,
    skillPoints: { total: 0, spent: 0 },
    learnedSkills: f,
    equipment: bx(),
  };
}
function Sx() {
  return { front: Array(ls).fill(null), back: Array(as).fill(null) };
}
function wx(l, i) {
  const o = l.front.indexOf(null);
  if (o !== -1) {
    const u = [...l.front];
    return ((u[o] = i), { ...l, front: u });
  }
  const r = l.back.indexOf(null);
  if (r !== -1) {
    const u = [...l.back];
    return ((u[r] = i), { ...l, back: u });
  }
  return l;
}
function Tx(l, i) {
  return l.guild.members.length >= Mu
    ? l
    : {
        ...l,
        guild: { ...l.guild, members: [...l.guild.members, i], party: wx(l.guild.party, i.id) },
      };
}
function jx(l, i) {
  if (!l.guild.members.some((d) => d.id === i)) return l;
  const o = l.guild.party.front.map((d) => (d === i ? null : d)),
    r = l.guild.party.back.map((d) => (d === i ? null : d)),
    u = l.diveState
      ? { ...l.diveState, party: l.diveState.party.filter((d) => d.charId !== i) }
      : l.diveState;
  return {
    ...l,
    guild: {
      ...l.guild,
      members: l.guild.members.filter((d) => d.id !== i),
      party: { front: o, back: r },
    },
    diveState: u,
  };
}
function Nx(l) {
  return {
    schemaVersion: Ir,
    savedAt: 0,
    masterSeed: dx(),
    settings: { ...vx },
    guild: {
      name: l,
      gold: s1,
      members: [],
      party: Sx(),
      storage: [],
      equipment: [],
      foodStorage: [],
      bestiary: Yp(),
    },
    towerState: { floors: {}, bossGates: {}, warp: { unlockedCheckpoints: [] }, record: yx() },
    diveState: null,
    bestiary: Yp(),
    playerMaps: {},
    exploredCells: {},
    forgeInventory: { fragments: {}, ingots: { copper: 0, silver: 0, gold: 0 } },
    shopStock: { unlockedTier: 0, unlockedItemIds: [] },
    unlockedRecipeIds: kx(),
    flags: {},
  };
}
const $u = (l, i) => i.some((o) => l instanceof o);
let Xp, Vp;
function Ex() {
  return Xp || (Xp = [IDBDatabase, IDBObjectStore, IDBIndex, IDBCursor, IDBTransaction]);
}
function Cx() {
  return (
    Vp ||
    (Vp = [
      IDBCursor.prototype.advance,
      IDBCursor.prototype.continue,
      IDBCursor.prototype.continuePrimaryKey,
    ])
  );
}
const Gu = new WeakMap(),
  Tu = new WeakMap(),
  Jr = new WeakMap();
function Ax(l) {
  const i = new Promise((o, r) => {
    const u = () => {
        (l.removeEventListener('success', d), l.removeEventListener('error', f));
      },
      d = () => {
        (o(Ga(l.result)), u());
      },
      f = () => {
        (r(l.error), u());
      };
    (l.addEventListener('success', d), l.addEventListener('error', f));
  });
  return (Jr.set(i, l), i);
}
function Lx(l) {
  if (Gu.has(l)) return;
  const i = new Promise((o, r) => {
    const u = () => {
        (l.removeEventListener('complete', d),
          l.removeEventListener('error', f),
          l.removeEventListener('abort', f));
      },
      d = () => {
        (o(), u());
      },
      f = () => {
        (r(l.error || new DOMException('AbortError', 'AbortError')), u());
      };
    (l.addEventListener('complete', d),
      l.addEventListener('error', f),
      l.addEventListener('abort', f));
  });
  Gu.set(l, i);
}
let Yu = {
  get(l, i, o) {
    if (l instanceof IDBTransaction) {
      if (i === 'done') return Gu.get(l);
      if (i === 'store')
        return o.objectStoreNames[1] ? void 0 : o.objectStore(o.objectStoreNames[0]);
    }
    return Ga(l[i]);
  },
  set(l, i, o) {
    return ((l[i] = o), !0);
  },
  has(l, i) {
    return l instanceof IDBTransaction && (i === 'done' || i === 'store') ? !0 : i in l;
  },
};
function ig(l) {
  Yu = l(Yu);
}
function qx(l) {
  return Cx().includes(l)
    ? function (...i) {
        return (l.apply(Xu(this), i), Ga(this.request));
      }
    : function (...i) {
        return Ga(l.apply(Xu(this), i));
      };
}
function Bx(l) {
  return typeof l == 'function'
    ? qx(l)
    : (l instanceof IDBTransaction && Lx(l), $u(l, Ex()) ? new Proxy(l, Yu) : l);
}
function Ga(l) {
  if (l instanceof IDBRequest) return Ax(l);
  if (Tu.has(l)) return Tu.get(l);
  const i = Bx(l);
  return (i !== l && (Tu.set(l, i), Jr.set(i, l)), i);
}
const Xu = (l) => Jr.get(l);
function Ox(l, i, { blocked: o, upgrade: r, blocking: u, terminated: d } = {}) {
  const f = indexedDB.open(l, i),
    h = Ga(f);
  return (
    r &&
      f.addEventListener('upgradeneeded', (p) => {
        r(Ga(f.result), p.oldVersion, p.newVersion, Ga(f.transaction), p);
      }),
    o && f.addEventListener('blocked', (p) => o(p.oldVersion, p.newVersion, p)),
    h
      .then((p) => {
        (d && p.addEventListener('close', () => d()),
          u && p.addEventListener('versionchange', (g) => u(g.oldVersion, g.newVersion, g)));
      })
      .catch(() => {}),
    h
  );
}
const Ix = ['get', 'getKey', 'getAll', 'getAllKeys', 'count'],
  Mx = ['put', 'add', 'delete', 'clear'],
  ju = new Map();
function Qp(l, i) {
  if (!(l instanceof IDBDatabase && !(i in l) && typeof i == 'string')) return;
  if (ju.get(i)) return ju.get(i);
  const o = i.replace(/FromIndex$/, ''),
    r = i !== o,
    u = Mx.includes(o);
  if (!(o in (r ? IDBIndex : IDBObjectStore).prototype) || !(u || Ix.includes(o))) return;
  const d = async function (f, ...h) {
    const p = this.transaction(f, u ? 'readwrite' : 'readonly');
    let g = p.store;
    return (r && (g = g.index(h.shift())), (await Promise.all([g[o](...h), u && p.done]))[0]);
  };
  return (ju.set(i, d), d);
}
ig((l) => ({
  ...l,
  get: (i, o, r) => Qp(i, o) || l.get(i, o, r),
  has: (i, o) => !!Qp(i, o) || l.has(i, o),
}));
const Dx = ['continue', 'continuePrimaryKey', 'advance'],
  Kp = {},
  Vu = new WeakMap(),
  sg = new WeakMap(),
  Rx = {
    get(l, i) {
      if (!Dx.includes(i)) return l[i];
      let o = Kp[i];
      return (
        o ||
          (o = Kp[i] =
            function (...r) {
              Vu.set(this, sg.get(this)[i](...r));
            }),
        o
      );
    },
  };
async function* zx(...l) {
  let i = this;
  if ((i instanceof IDBCursor || (i = await i.openCursor(...l)), !i)) return;
  i = i;
  const o = new Proxy(i, Rx);
  for (sg.set(o, i), Jr.set(o, Xu(i)); i; )
    (yield o, (i = await (Vu.get(o) || i.continue())), Vu.delete(o));
}
function Zp(l, i) {
  return (
    (i === Symbol.asyncIterator && $u(l, [IDBIndex, IDBObjectStore, IDBCursor])) ||
    (i === 'iterate' && $u(l, [IDBIndex, IDBObjectStore]))
  );
}
ig((l) => ({
  ...l,
  get(i, o, r) {
    return Zp(i, o) ? zx : l.get(i, o, r);
  },
  has(i, o) {
    return Zp(i, o) || l.has(i, o);
  },
}));
const Hx = { 1: (l) => Ux(l) },
  Nu = (l) => typeof l == 'object' && l !== null && !Array.isArray(l);
function Ux(l) {
  const i = { ...l, schemaVersion: 2 };
  let o = 0;
  const r = (d) => ({ id: `eq_mig_${Date.now().toString(36)}_${o++}`, masterId: d, forgeLevel: 0 }),
    u = Nu(i.guild) ? { ...i.guild } : {};
  return (
    Array.isArray(u.equipment) || (u.equipment = []),
    Array.isArray(u.foodStorage) || (u.foodStorage = []),
    Array.isArray(u.members) &&
      (u.members = u.members.map((d) => {
        if (!Nu(d)) return d;
        const f = Nu(d.equipment) ? { ...d.equipment } : {};
        for (const h of ['weapon', 'armor', 'accessory']) {
          const p = f[h];
          f[h] = typeof p == 'string' ? r(p) : (p ?? null);
        }
        return { ...d, equipment: f };
      })),
    (i.guild = u),
    Array.isArray(i.unlockedRecipeIds) || (i.unlockedRecipeIds = []),
    i
  );
}
function $x(l) {
  return structuredClone(l);
}
function Rn(l) {
  return typeof l == 'object' && l !== null && !Array.isArray(l);
}
function Gx(l) {
  if (
    !Rn(l) ||
    typeof l.schemaVersion != 'number' ||
    typeof l.masterSeed != 'number' ||
    !Rn(l.guild)
  )
    return !1;
  const i = l.guild;
  return !(
    typeof i.name != 'string' ||
    !Array.isArray(i.members) ||
    !Array.isArray(i.equipment) ||
    !Rn(l.forgeInventory) ||
    !Rn(l.towerState) ||
    !Rn(l.towerState.record) ||
    typeof l.towerState.record.deepestReached != 'number'
  );
}
function rg(l) {
  if (!Rn(l) || typeof l.schemaVersion != 'number')
    return { ok: !1, reason: 'セーブデータの構造が不正です' };
  let i = l.schemaVersion;
  if (i > Ir) return { ok: !1, reason: `未知のバージョン (${i} > ${Ir}) のセーブデータです` };
  let o = { ...l };
  for (; i < Ir; ) {
    const r = Hx[i];
    if (!r) return { ok: !1, reason: `バージョン ${i} の migration が未定義です` };
    ((o = r(o)), (i = typeof o.schemaVersion == 'number' ? o.schemaVersion : i + 1));
  }
  return Gx(o)
    ? { ok: !0, data: o }
    : { ok: !1, reason: 'migration 後のデータが SaveData の形をしていません' };
}
function Yx(l) {
  return {
    guildName: l.guild.name,
    deepestReached: l.towerState.record.deepestReached,
    memberCount: l.guild.members.length,
    savedAt: l.savedAt,
  };
}
function Jp() {
  return {
    guildName: '(破損データ)',
    deepestReached: 0,
    memberCount: 0,
    savedAt: 0,
    corrupted: !0,
  };
}
const Xx = 'sekaiju-like-game',
  Vx = 1,
  Fi = 'saves',
  gd = 'main';
let Eu = null;
function kd() {
  return (
    Eu ||
      (Eu = Ox(Xx, Vx, {
        upgrade(l) {
          l.objectStoreNames.contains(Fi) || l.createObjectStore(Fi);
        },
      })),
    Eu
  );
}
async function Cu(l) {
  const i = { ...l, savedAt: Date.now() };
  return (await (await kd()).put(Fi, $x(i), gd), i);
}
async function Qx() {
  const i = await (await kd()).get(Fi, gd);
  return i === void 0 ? { ok: !1, reason: 'empty' } : rg(i);
}
async function Kx() {
  const i = await (await kd()).get(Fi, gd);
  if (i === void 0) return null;
  const o = rg(i);
  if (!o.ok) return Jp();
  try {
    return Yx(o.data);
  } catch {
    return Jp();
  }
}
const og = { save: null, saving: !1 };
function Zx(l, i) {
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
      return { ...og };
  }
}
const cg = w.createContext(null);
function Jx(l) {
  const i = w.useRef(l);
  return ((i.current = l), i);
}
function Px({ children: l }) {
  const [i, o] = w.useReducer(Zx, og),
    r = Jx(i),
    u = w.useCallback(async (v) => {
      const I = Nx(v),
        L = await Cu(I);
      o({ type: 'load', save: L });
    }, []),
    d = w.useCallback(async () => {
      const v = await Qx();
      return v.ok ? (o({ type: 'load', save: v.data }), { ok: !0 }) : { ok: !1, reason: v.reason };
    }, []),
    f = w.useCallback((v) => {
      o({ type: 'updateSave', updater: v });
    }, []),
    h = w.useCallback(
      async (v) => {
        const I = r.current.save;
        if (!I) return;
        const L = v(I);
        (o({ type: 'setSave', save: L }), o({ type: 'saving', saving: !0 }));
        try {
          const M = await Cu(L);
          o({ type: 'setSave', save: M });
        } finally {
          o({ type: 'saving', saving: !1 });
        }
      },
      [r]
    ),
    p = w.useCallback(async () => {
      const { save: v } = r.current;
      if (v) {
        o({ type: 'saving', saving: !0 });
        try {
          const I = await Cu(v);
          o({ type: 'setSave', save: I });
        } finally {
          o({ type: 'saving', saving: !1 });
        }
      }
    }, [r]),
    g = w.useCallback(() => {
      o({ type: 'clear' });
    }, []),
    y = w.useMemo(
      () => ({
        ...i,
        startNewGame: u,
        continueGame: d,
        applySave: f,
        applyAndPersist: h,
        persist: p,
        exitToTitle: g,
      }),
      [i, u, d, f, h, p, g]
    );
  return m.jsx(cg.Provider, { value: y, children: l });
}
function Vl() {
  const l = w.useContext(cg);
  if (!l) throw new Error('useGameState は GameStateProvider の内側で使ってください');
  return l;
}
const Fx = {
    slash: '斬',
    pierce: '突',
    bash: '壊',
    fire: '火',
    ice: '氷',
    volt: '雷',
    almighty: '無',
  },
  Wx = {
    enemyOne: '敵単体',
    enemyRow: '敵1列',
    enemyAll: '敵全体',
    allyOne: '味方単体',
    allyAll: '味方全体',
    self: '自分',
  },
  e3 = {
    patk: '物攻',
    pdef: '物防',
    matk: '魔攻',
    mdef: '魔防',
    acc: '命中',
    eva: '回避',
    elementResist: '属性耐性',
  },
  t3 = {
    poison: '毒',
    paralysis: '麻痺',
    sleep: '睡眠',
    blind: '盲目',
    headBind: '頭封じ',
    armBind: '腕封じ',
    legBind: '脚封じ',
  };
function l3(l, i) {
  switch (l.kind) {
    case 'damage':
      return `${l.statBase === 'str' ? '物理' : '魔法'}威力${Math.round(l.power(i) * 100)}%${l.hits && l.hits > 1 ? `×${l.hits}` : ''}`;
    case 'heal':
      return `HP回復${l.amount(i)}`;
    case 'restoreTp':
      return `TP回復${l.amount(i)}`;
    case 'buff':
      return `${e3[l.stat]}${l.modifier(i) < 1 ? '↓' : '↑'}`;
    case 'ailment':
      return `${t3[l.ailment] ?? l.ailment}${Math.round(l.chance(i) * 100)}%`;
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
function Nr(l, i, o, r = 1) {
  return `${Fx[l] ?? l}・${Wx[i] ?? i}／${o.map((u) => l3(u, r)).join('・')}`;
}
const a3 = {
  hp: 'HP',
  tp: 'TP',
  str: '腕力',
  vit: '体力',
  agi: '敏捷',
  int: '知力',
  mnd: '精神',
  luc: '幸運',
};
function n3(l) {
  const i = {};
  for (const o of [...l.allies, ...l.enemies, ...l.summons])
    i[o.id] = { hp: o.hp, isDown: o.isDown };
  return i;
}
const i3 = () => {
    var rs, bt;
    const l = ml(),
      { save: i, applyAndPersist: o } = Vl(),
      r = w.useRef(null),
      [u, d] = w.useState(null),
      [f, h] = w.useState({}),
      [p, g] = w.useState(null),
      [y, v] = w.useState(!1),
      [I, L] = w.useState(!1),
      [M, S] = w.useState(null),
      [E, x] = w.useState(!1),
      [C, $] = w.useState(null),
      [D, ae] = w.useState(null),
      [Y, T] = w.useState(null),
      [V, ie] = w.useState(new Set()),
      [ue, W] = w.useState(!0),
      [de, ye] = w.useState(null),
      [xe, ve] = w.useState([]);
    (w.useEffect(() => {
      if (u || !(i != null && i.diveState)) return;
      const B = i.diveState.depth,
        le = (i.masterSeed ^ (B * 2654435761) ^ (i.towerState.record.totalDives * 40503)) >>> 0;
      r.current = ba(le);
      const re = i.diveState.pendingFoeBattle;
      d(re ? Ip(i, [re.enemyId], re.firstStrike) : Ip(i, h1(B, r.current)));
    }, [i, u]),
      w.useEffect(() => {
        if (!ue) return;
        const B = setTimeout(() => W(!1), 700);
        return () => clearTimeout(B);
      }, [ue]));
    const q = w.useCallback(
        (B) => {
          if (!u || !r.current || u.outcome !== 'ongoing') return;
          const le = n3(u),
            re = X1(u, B, r.current);
          (d(re),
            h({}),
            v(!1),
            L(!1),
            $(null),
            ae(null),
            g(null),
            ie(new Set()),
            T(re.log.length > 0 ? { base: le, revealed: 0 } : null));
        },
        [u]
      ),
      J = w.useRef(!1);
    (w.useEffect(() => {
      !u ||
        !r.current ||
        J.current ||
        ue ||
        (u.turn === 1 &&
          u.firstStrike === 'ambush' &&
          u.outcome === 'ongoing' &&
          ((J.current = !0), q([])));
    }, [u, ue, q]),
      w.useEffect(() => {
        if (!u || !Y) return;
        if (Y.revealed >= u.log.length) {
          const le = setTimeout(() => {
            (T(null), ie(new Set()));
          }, 200);
          return () => clearTimeout(le);
        }
        const B = setTimeout(
          () => {
            var Ql, os;
            const le = Y.revealed,
              re = (Ql = u.log[le]) == null ? void 0 : Ql.snapshot,
              he =
                le > 0 ? (((os = u.log[le - 1]) == null ? void 0 : os.snapshot) ?? Y.base) : Y.base,
              Ze = new Set();
            if (re)
              for (const Ka of Object.keys(re)) {
                const xl = he == null ? void 0 : he[Ka];
                xl && (re[Ka].hp < xl.hp || (re[Ka].isDown && !xl.isDown)) && Ze.add(Ka);
              }
            (ie(Ze), T({ ...Y, revealed: Y.revealed + 1 }));
          },
          Y.revealed === 0 ? 240 : 540
        );
        return () => clearTimeout(B);
      }, [u, Y]));
    const ne = w.useMemo(() => (u && u.outcome === 'win' && i ? V1(i, u) : []), [u, i]);
    w.useEffect(() => {
      (u == null ? void 0 : u.outcome) === 'win' &&
        !Y &&
        ve(ne.filter((B) => B.toLevel > B.fromLevel));
    }, [u == null ? void 0 : u.outcome, Y, ne]);
    const pe = w.useMemo(
        () => (u == null ? void 0 : u.enemies.filter((B) => !B.isDown)) ?? [],
        [u]
      ),
      K = w.useMemo(() => (u == null ? void 0 : u.allies.filter((B) => !B.isDown)) ?? [], [u]);
    (w.useEffect(() => {
      pe.length > 0 && !pe.some((B) => B.id === M) && S(pe[0].id);
    }, [pe, M]),
      w.useEffect(() => {
        if ((u == null ? void 0 : u.outcome) !== 'ongoing' || (p && K.some((le) => le.id === p)))
          return;
        const B = K.find((le) => !f[le.id]) ?? null;
        g(B ? B.id : null);
      }, [u, K, p, f]));
    const b = K.length > 0 && K.every((B) => f[B.id] !== void 0),
      N = w.useCallback(
        (B, le) => {
          const re = { ...f, [B]: le };
          (h(re), v(!1), L(!1));
          const he = K.find((Ze) => Ze.id !== B && !re[Ze.id]);
          g(he ? he.id : null);
        },
        [f, K]
      ),
      X = w.useCallback(
        async (B) => {
          (x(!0),
            ye(B.outcome === 'lose' ? 'lose' : B.outcome === 'fled' ? 'fled' : 'win'),
            await new Promise((re) => setTimeout(re, 460)));
          const le = B.outcome === 'win';
          B.outcome === 'lose'
            ? (await o((re) => Pi(Rp(re, B))), l('/town'))
            : (await o((re) => fx(Rp(re, B), le)), l('/dungeon'));
        },
        [o, l]
      ),
      F = w.useCallback(() => {
        var B;
        (h({}), v(!1), L(!1), $(null), ae(null), g(((B = K[0]) == null ? void 0 : B.id) ?? null));
      }, [K]),
      te = w.useCallback(() => {
        var re;
        if (!u || !r.current || u.outcome !== 'ongoing') return;
        const B = M ?? ((re = pe[0]) == null ? void 0 : re.id) ?? '',
          le = K.map((he) => {
            const Ze = f[he.id] ?? { kind: 'attack' };
            return Ze.kind === 'guard'
              ? { kind: 'guard', actorId: he.id }
              : Ze.kind === 'skill'
                ? { kind: 'skill', actorId: he.id, skillId: Ze.skillId, targetId: B }
                : Ze.kind === 'item'
                  ? { kind: 'item', actorId: he.id, itemId: Ze.itemId, targetId: he.id }
                  : { kind: 'attack', actorId: he.id, targetId: B };
          });
        if (C) {
          const he = zn[C.unionSkillId],
            Ze =
              (he == null ? void 0 : he.target) === 'enemyOne' ||
              (he == null ? void 0 : he.target) === 'enemyRow' ||
              (he == null ? void 0 : he.target) === 'enemyAll';
          le.unshift({ kind: 'union', ...C, targetId: Ze ? B : C.targetId });
        }
        q(le);
      }, [u, f, M, K, pe, C, q]),
      me = w.useCallback(() => {
        if (!u || !r.current || u.outcome !== 'ongoing') return;
        const B = K[0];
        B && q([{ kind: 'flee', actorId: B.id }]);
      }, [u, K, q]);
    if (!i || !i.diveState) return m.jsx(cl, { to: '/town', replace: !0 });
    if (!u) return m.jsx('div', { className: P.layout, children: '戦闘準備中...' });
    const _e = (B) => {
        const le = i.guild.members.find((re) => re.id === B.id);
        return le
          ? Object.keys(le.learnedSkills).filter((re) => re in Wt && B.tp >= Wt[re].tpCost(1))
          : [];
      },
      Le = () => {
        const B = (re) =>
            Object.values(f).filter((he) => he.kind === 'item' && he.itemId === re).length,
          le = (re) => u.consumedItems.filter((he) => he === re).length;
        return i.guild.storage
          .filter((re) => {
            var he, Ze;
            return (Ze = (he = We[re.itemId]) == null ? void 0 : he.useContext) == null
              ? void 0
              : Ze.includes('battle');
          })
          .map((re) => ({
            id: re.itemId,
            remaining: id(i, re.itemId) - le(re.itemId) - B(re.itemId),
          }))
          .filter((re) => re.remaining > 0);
      },
      Me = (B) => {
        var re, he;
        const le = f[B.id];
        return le
          ? le.kind === 'attack'
            ? '攻撃'
            : le.kind === 'guard'
              ? '防御'
              : le.kind === 'item'
                ? (((re = We[le.itemId]) == null ? void 0 : re.name) ?? 'どうぐ')
                : (((he = Wt[le.skillId]) == null ? void 0 : he.name) ?? 'スキル')
          : '';
      },
      tl = (B) => {
        const le = (he) => he === 'headBind' || he === 'armBind' || he === 'legBind';
        let re = '';
        return (
          B.ailments.some((he) => le(he.type)) && (re += ' 🔒'),
          B.ailments.some((he) => !le(he.type)) && (re += ' 🌀'),
          re
        );
      },
      yl = (B) => {
        var re;
        const le = i.guild.members.find((he) => he.id === B.id);
        return le ? (((re = Ke[le.classId]) == null ? void 0 : re.name) ?? '') : '';
      },
      bl = Y
        ? Y.revealed > 0
          ? (((rs = u.log[Y.revealed - 1]) == null ? void 0 : rs.snapshot) ?? Y.base)
          : Y.base
        : null,
      Ya = (B) => (bl == null ? void 0 : bl[B.id]) ?? { hp: B.hp, isDown: B.isDown },
      _l = (B) => {
        var he;
        const le = i.guild.members.find((Ze) => Ze.id === B.id);
        if (!le) return null;
        const re =
          (he = ft[le.raceId]) == null
            ? void 0
            : he.raceSkillTree.skills.find((Ze) => Ze.skillId in zn);
        return !re || !(re.skillId in le.learnedSkills) ? null : (zn[re.skillId] ?? null);
      },
      Xa = (B, le, re) => {
        var Ql;
        const Ze =
          le.target === 'enemyOne' || le.target === 'enemyRow' || le.target === 'enemyAll'
            ? (M ?? ((Ql = pe[0]) == null ? void 0 : Ql.id) ?? '')
            : B;
        ($({ actorId: B, unionSkillId: le.id, participantIds: re, targetId: Ze }), ae(null));
      },
      Kn = (B, le) => {
        le.requiredParticipants <= 1 ? Xa(B.id, le, [B.id]) : ae({ actorId: B.id, def: le });
      },
      yt = p ? K.find((B) => B.id === p) : void 0,
      is = ((bt = u.enemies.find((B) => B.id === M)) == null ? void 0 : bt.name) ?? '-',
      Va = _d(u),
      Qa = (B) => {
        const le = Ya(B);
        return m.jsxs(
          'button',
          {
            type: 'button',
            className: [
              P.card,
              le.isDown ? P.down : '',
              p === B.id ? P.cardActive : '',
              f[B.id] ? P.cardDecided : '',
              V.has(B.id) ? P.flash : '',
            ].join(' '),
            disabled: B.isDown || u.outcome !== 'ongoing' || !!Y,
            onClick: () => {
              (g(B.id), v(!1), L(!1));
            },
            children: [
              m.jsxs('div', {
                className: P.cardName,
                children: [
                  B.name,
                  B.unionGauge >= 100 ? m.jsx('span', { className: P.uni, children: '★' }) : null,
                  tl(B),
                ],
              }),
              m.jsx('div', { className: P.cardJob, children: yl(B) }),
              m.jsx(On, { value: le.hp, max: B.maxHp, color: '#4caf50', showValue: !1 }),
              m.jsx(On, { value: B.tp, max: B.maxTp, color: '#2196f3', showValue: !1 }),
              m.jsxs('div', {
                className: P.cardNums,
                children: ['HP ', Math.max(0, le.hp), ' · TP ', B.tp],
              }),
              m.jsxs('div', {
                className: P.gaugeRow,
                children: [
                  m.jsx(On, { value: B.unionGauge, max: 100, color: '#ff9800', showValue: !1 }),
                  m.jsxs('span', { className: P.gaugeLabel, children: ['U ', B.unionGauge, '%'] }),
                ],
              }),
              f[B.id] ? m.jsxs('div', { className: P.cardCmd, children: ['▶ ', Me(B)] }) : null,
            ],
          },
          B.id
        );
      },
      Zn = u.allies.filter((B) => B.row === 'front'),
      ss = u.allies.filter((B) => B.row === 'back');
    return m.jsxs('div', {
      className: P.layout,
      children: [
        m.jsx('div', {
          className: P.enemies,
          children: u.enemies.map((B) => {
            const le = Ya(B);
            return m.jsxs(
              'button',
              {
                type: 'button',
                className: `${P.enemy} ${le.isDown ? P.down : ''} ${M === B.id ? P.targeted : ''} ${V.has(B.id) ? P.flash : ''}`,
                disabled: B.isDown || !!Y,
                onClick: () => S(B.id),
                children: [
                  m.jsxs('span', { className: P.enemyName, children: [B.name, tl(B)] }),
                  m.jsx(On, { value: le.hp, max: B.maxHp, color: '#e57373', showValue: !1 }),
                ],
              },
              B.id
            );
          }),
        }),
        u.summons.length > 0
          ? m.jsx('div', {
              className: P.summons,
              children: u.summons.map((B) => {
                const le = Ya(B);
                return m.jsxs(
                  'div',
                  {
                    className: `${P.summon} ${le.isDown ? P.down : ''} ${V.has(B.id) ? P.flash : ''}`,
                    children: [
                      m.jsxs('span', { className: P.summonName, children: ['🐾 ', B.name] }),
                      m.jsx(On, { value: le.hp, max: B.maxHp, color: '#8d6e63', showValue: !1 }),
                      m.jsxs('span', {
                        className: P.summonHp,
                        children: ['HP ', Math.max(0, le.hp)],
                      }),
                    ],
                  },
                  B.id
                );
              }),
            })
          : null,
        m.jsxs('div', {
          className: P.party,
          children: [
            m.jsx('div', { className: P.rowTag, children: '前衛' }),
            m.jsx('div', { className: P.cardRow, children: Zn.map(Qa) }),
            m.jsx('div', { className: P.rowTag, children: '後衛（近接ダメージ -30%）' }),
            m.jsx('div', {
              className: P.cardRow,
              children:
                ss.length > 0
                  ? ss.map(Qa)
                  : m.jsx('div', { className: P.empty, children: '（なし）' }),
            }),
          ],
        }),
        Y
          ? m.jsxs('div', {
              className: P.playback,
              children: [
                m.jsx('span', { className: P.playbackHint, children: '戦況を再生中…' }),
                m.jsx('button', {
                  type: 'button',
                  className: P.skip,
                  onClick: () => {
                    (T(null), ie(new Set()));
                  },
                  children: '▶▶ スキップ',
                }),
              ],
            })
          : u.outcome !== 'ongoing'
            ? m.jsxs('div', {
                className: P.result,
                children: [
                  m.jsx('div', {
                    className: P.resultTitle,
                    children:
                      u.outcome === 'win'
                        ? '勝利！'
                        : u.outcome === 'fled'
                          ? '逃走した'
                          : '全滅...',
                  }),
                  u.outcome === 'win'
                    ? m.jsxs(m.Fragment, {
                        children: [
                          m.jsxs('div', {
                            className: P.resultBody,
                            children: ['経験値 ', Va.exp, ' ／ ', Va.gold, ' G を獲得'],
                          }),
                          m.jsx('div', {
                            className: P.expList,
                            children: ne.map((B) =>
                              m.jsxs(
                                'div',
                                {
                                  className: P.expRow,
                                  children: [
                                    m.jsxs('span', {
                                      className: P.expName,
                                      children: [
                                        B.name,
                                        m.jsxs('span', {
                                          className: P.expLv,
                                          children: [
                                            'Lv',
                                            B.toLevel,
                                            B.toLevel > B.fromLevel
                                              ? m.jsxs('span', {
                                                  className: P.expUp,
                                                  children: [' ↑', B.toLevel - B.fromLevel],
                                                })
                                              : null,
                                          ],
                                        }),
                                      ],
                                    }),
                                    m.jsx(On, {
                                      value: B.expToNext > 0 ? B.exp : 1,
                                      max: B.expToNext > 0 ? B.expToNext : 1,
                                      color: '#ffca28',
                                      showValue: !1,
                                    }),
                                    m.jsxs('span', {
                                      className: P.expNum,
                                      children: [
                                        B.expToNext > 0
                                          ? `次まで ${Math.max(0, B.expToNext - B.exp)}`
                                          : 'MAX',
                                        B.gainedExp > 0 ? `（+${B.gainedExp}）` : '',
                                      ],
                                    }),
                                  ],
                                },
                                B.charId
                              )
                            ),
                          }),
                        ],
                      })
                    : u.outcome === 'lose'
                      ? m.jsx('div', { className: P.resultBody, children: '拠点へ帰還する' })
                      : null,
                  m.jsx('button', {
                    type: 'button',
                    className: P.primary,
                    disabled: E || xe.length > 0,
                    onClick: () => void X(u),
                    children: 'つづける',
                  }),
                ],
              })
            : m.jsxs('div', {
                className: P.command,
                children: [
                  m.jsxs('div', {
                    className: P.target,
                    children: ['対象: ', is, '（敵をタップで変更）'],
                  }),
                  C
                    ? (() => {
                        const B = zn[C.unionSkillId];
                        return m.jsxs('div', {
                          className: P.unionBanner,
                          children: [
                            m.jsxs('div', {
                              className: P.unionBannerHead,
                              children: [
                                '⚡ ユニオン予約: ',
                                B == null ? void 0 : B.name,
                                m.jsx('button', {
                                  type: 'button',
                                  className: P.unionCancel,
                                  onClick: () => $(null),
                                  children: '取消',
                                }),
                              ],
                            }),
                            B
                              ? m.jsxs('div', {
                                  className: P.unionBannerDesc,
                                  children: [
                                    Nr(B.element, B.target, B.effects),
                                    m.jsx('br', {}),
                                    B.description,
                                  ],
                                })
                              : null,
                          ],
                        });
                      })()
                    : null,
                  yt
                    ? m.jsxs(m.Fragment, {
                        children: [
                          m.jsxs('div', {
                            className: P.cmdHead,
                            children: [yt.name, ' のコマンド'],
                          }),
                          y
                            ? m.jsxs('div', {
                                className: P.skillList,
                                children: [
                                  _e(yt).map((B) => {
                                    var le;
                                    return m.jsxs(
                                      'button',
                                      {
                                        type: 'button',
                                        className: P.skillBtn,
                                        onClick: () => N(yt.id, { kind: 'skill', skillId: B }),
                                        children: [
                                          m.jsxs('span', {
                                            className: P.skillTop,
                                            children: [
                                              m.jsx('span', {
                                                className: P.skillName,
                                                children: Wt[B].name,
                                              }),
                                              m.jsxs('span', {
                                                className: P.tp,
                                                children: ['TP ', Wt[B].tpCost(1)],
                                              }),
                                            ],
                                          }),
                                          m.jsx('span', {
                                            className: P.skillSummary,
                                            children: Nr(
                                              Wt[B].element,
                                              Wt[B].target,
                                              Wt[B].effects
                                            ),
                                          }),
                                          m.jsx('span', {
                                            className: P.skillDesc,
                                            children:
                                              ((le = Xi[B]) == null ? void 0 : le.description) ??
                                              '',
                                          }),
                                        ],
                                      },
                                      B
                                    );
                                  }),
                                  _e(yt).length === 0
                                    ? m.jsx('div', {
                                        className: P.empty,
                                        children: '使えるスキルがない',
                                      })
                                    : null,
                                  m.jsx('button', {
                                    type: 'button',
                                    className: P.menuBack,
                                    onClick: () => v(!1),
                                    children: 'もどる',
                                  }),
                                ],
                              })
                            : I
                              ? m.jsxs('div', {
                                  className: P.skillList,
                                  children: [
                                    Le().map(({ id: B, remaining: le }) =>
                                      m.jsxs(
                                        'button',
                                        {
                                          type: 'button',
                                          className: P.skillBtn,
                                          onClick: () => N(yt.id, { kind: 'item', itemId: B }),
                                          children: [
                                            m.jsx('span', {
                                              className: P.skillTop,
                                              children: m.jsxs('span', {
                                                className: P.skillName,
                                                children: [We[B].name, ' ×', le],
                                              }),
                                            }),
                                            m.jsx('span', {
                                              className: P.skillDesc,
                                              children: We[B].description,
                                            }),
                                          ],
                                        },
                                        B
                                      )
                                    ),
                                    Le().length === 0
                                      ? m.jsx('div', {
                                          className: P.empty,
                                          children: '使える道具がない',
                                        })
                                      : null,
                                    m.jsx('button', {
                                      type: 'button',
                                      className: P.menuBack,
                                      onClick: () => L(!1),
                                      children: 'もどる',
                                    }),
                                  ],
                                })
                              : D
                                ? m.jsxs('div', {
                                    className: P.skillList,
                                    children: [
                                      m.jsxs('div', {
                                        className: P.unionHint,
                                        children: [
                                          m.jsx('strong', { children: D.def.name }),
                                          m.jsx('br', {}),
                                          Nr(D.def.element, D.def.target, D.def.effects),
                                          m.jsx('br', {}),
                                          D.def.description,
                                          m.jsx('br', {}),
                                          '協力者を選択（あと',
                                          D.def.requiredParticipants - 1,
                                          '人。各自ゲージ',
                                          D.def.gaugeCostPerParticipant,
                                          '消費）',
                                        ],
                                      }),
                                      K.filter((B) => B.id !== D.actorId).map((B) =>
                                        m.jsx(
                                          'button',
                                          {
                                            type: 'button',
                                            className: P.skillBtn,
                                            onClick: () => Xa(D.actorId, D.def, [D.actorId, B.id]),
                                            children: m.jsxs('span', {
                                              className: P.skillTop,
                                              children: [
                                                m.jsx('span', {
                                                  className: P.skillName,
                                                  children: B.name,
                                                }),
                                                m.jsxs('span', {
                                                  className: P.tp,
                                                  children: ['ゲージ ', B.unionGauge],
                                                }),
                                              ],
                                            }),
                                          },
                                          B.id
                                        )
                                      ),
                                      K.filter((B) => B.id !== D.actorId).length === 0
                                        ? m.jsx('div', {
                                            className: P.empty,
                                            children: '協力できる味方がいない',
                                          })
                                        : null,
                                      m.jsx('button', {
                                        type: 'button',
                                        className: P.menuBack,
                                        onClick: () => ae(null),
                                        children: 'もどる',
                                      }),
                                    ],
                                  })
                                : m.jsxs(m.Fragment, {
                                    children: [
                                      (() => {
                                        const B = _l(yt);
                                        return !B || yt.unionGauge < 100 || C
                                          ? null
                                          : m.jsxs('div', {
                                              className: P.unionInfo,
                                              children: [
                                                '⚡ ',
                                                m.jsx('strong', { children: B.name }),
                                                ' 発動可（ゲージ100%）',
                                                m.jsx('br', {}),
                                                Nr(B.element, B.target, B.effects),
                                              ],
                                            });
                                      })(),
                                      m.jsxs('div', {
                                        className: P.menu,
                                        children: [
                                          m.jsx('button', {
                                            type: 'button',
                                            className: P.menuBtn,
                                            onClick: () => N(yt.id, { kind: 'attack' }),
                                            children: '攻撃',
                                          }),
                                          m.jsx('button', {
                                            type: 'button',
                                            className: P.menuBtn,
                                            onClick: () => N(yt.id, { kind: 'guard' }),
                                            children: '防御',
                                          }),
                                          m.jsx('button', {
                                            type: 'button',
                                            className: P.menuBtn,
                                            disabled: _e(yt).length === 0,
                                            onClick: () => v(!0),
                                            children: 'スキル',
                                          }),
                                          m.jsx('button', {
                                            type: 'button',
                                            className: P.menuBtn,
                                            disabled: Le().length === 0,
                                            onClick: () => L(!0),
                                            children: 'どうぐ',
                                          }),
                                          (() => {
                                            const B = _l(yt);
                                            return !B || yt.unionGauge < 100 || C
                                              ? null
                                              : m.jsx('button', {
                                                  type: 'button',
                                                  className: `${P.menuBtn} ${P.unionBtn}`,
                                                  onClick: () => Kn(yt, B),
                                                  children: '⚡ユニオン',
                                                });
                                          })(),
                                          m.jsx('button', {
                                            type: 'button',
                                            className: P.menuBtn,
                                            onClick: me,
                                            children: '逃走',
                                          }),
                                        ],
                                      }),
                                    ],
                                  }),
                        ],
                      })
                    : m.jsxs('div', {
                        className: P.execRow,
                        children: [
                          m.jsx('button', {
                            type: 'button',
                            className: P.redo,
                            onClick: F,
                            children: 'やり直す',
                          }),
                          m.jsx('button', {
                            type: 'button',
                            className: P.primary,
                            disabled: !b,
                            onClick: te,
                            children: '実行',
                          }),
                        ],
                      }),
                ],
              }),
        m.jsx('div', {
          className: P.log,
          children: (() => {
            const B = Y ? u.log.slice(0, Y.revealed) : u.log;
            return B.length === 0
              ? m.jsxs('div', {
                  className: P.logLine,
                  children: ['てきが あらわれた！（', u.turn, ' ターン目）'],
                })
              : B.map((le, re) =>
                  m.jsx(
                    'div',
                    {
                      className: `${P.logLine} ${Y && re === B.length - 1 ? P.logLineNew : ''}`,
                      children: le.text,
                    },
                    re
                  )
                );
          })(),
        }),
        xe.length > 0
          ? (() => {
              const B = xe[0];
              return m.jsx('div', {
                className: P.dialogOverlay,
                children: m.jsxs('div', {
                  className: P.dialog,
                  children: [
                    m.jsx('div', { className: P.dialogTitle, children: 'レベルアップ！' }),
                    m.jsxs('div', {
                      className: P.dialogName,
                      children: [
                        B.name,
                        ' は Lv',
                        B.fromLevel,
                        ' → ',
                        m.jsxs('strong', { children: ['Lv', B.toLevel] }),
                        ' になった！',
                      ],
                    }),
                    m.jsx('div', {
                      className: P.dialogStats,
                      children: Object.entries(B.statGains).map(([le, re]) =>
                        m.jsxs(
                          'span',
                          { className: P.dialogStat, children: [a3[le] ?? le, ' +', re] },
                          le
                        )
                      ),
                    }),
                    m.jsx('button', {
                      type: 'button',
                      className: P.primary,
                      onClick: () => ve((le) => le.slice(1)),
                      children: 'OK',
                    }),
                  ],
                }),
              });
            })()
          : null,
        ue ? m.jsx('div', { className: P.fxIntro }) : null,
        de ? m.jsx('div', { className: `${P.fxOutro} ${de === 'lose' ? P.fxLose : ''}` }) : null,
      ],
    });
  },
  s3 = '_layout_iunlg_1',
  r3 = '_head_iunlg_11',
  o3 = '_title_iunlg_15',
  c3 = '_tabs_iunlg_21',
  u3 = '_tab_iunlg_21',
  d3 = '_tabActive_iunlg_38',
  m3 = '_records_iunlg_43',
  _3 = '_statBig_iunlg_48',
  f3 = '_statNum_iunlg_60',
  p3 = '_statLabel_iunlg_67',
  h3 = '_statList_iunlg_72',
  g3 = '_statRow_iunlg_76',
  k3 = '_h2_iunlg_91',
  v3 = '_bossLog_iunlg_97',
  y3 = '_bossRow_iunlg_106',
  b3 = '_codex_iunlg_114',
  x3 = '_codexSummary_iunlg_121',
  S3 = '_list_iunlg_127',
  w3 = '_row_iunlg_133',
  T3 = '_unseen_iunlg_140',
  j3 = '_info_iunlg_144',
  N3 = '_name_iunlg_150',
  E3 = '_badge_iunlg_158',
  C3 = '_sub_iunlg_167',
  A3 = '_empty_iunlg_172',
  L3 = '_foot_iunlg_177',
  q3 = '_back_iunlg_181',
  Ie = {
    layout: s3,
    head: r3,
    title: o3,
    tabs: c3,
    tab: u3,
    tabActive: d3,
    records: m3,
    statBig: _3,
    statNum: f3,
    statLabel: p3,
    statList: h3,
    statRow: g3,
    h2: k3,
    bossLog: v3,
    bossRow: y3,
    codex: b3,
    codexSummary: x3,
    list: S3,
    row: w3,
    unseen: T3,
    info: j3,
    name: N3,
    badge: E3,
    sub: C3,
    empty: A3,
    foot: L3,
    back: q3,
  };
function ug(l) {
  const i = l.bestiary.monsters;
  return Object.values(ul)
    .slice()
    .sort((o, r) => o.tierBand - r.tierBand || o.id.localeCompare(r.id))
    .map((o) => {
      const r = i[o.id],
        u = new Set((r == null ? void 0 : r.dropsFound) ?? []);
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
            name: ((f = We[d.itemId]) == null ? void 0 : f.name) ?? d.itemId,
            found: u.has(d.itemId),
          };
        }),
      };
    });
}
function B3(l) {
  const i = ug(l),
    o = i.length,
    r = i.filter((y) => y.seen).length,
    u = i.filter((y) => y.defeated).length;
  let d = 0,
    f = 0;
  for (const y of i) for (const v of y.drops) ((d += 1), v.found && (f += 1));
  const h = o + d,
    p = u + f,
    g = h === 0 ? 0 : Math.round((p / h) * 100);
  return {
    monstersTotal: o,
    monstersSeen: r,
    monstersDefeated: u,
    dropsTotal: d,
    dropsFound: f,
    completionPct: g,
  };
}
const O3 = () => {
    const l = ml(),
      { save: i } = Vl(),
      [o, r] = w.useState('record');
    if (!i) return m.jsx(cl, { to: '/title', replace: !0 });
    const u = i.towerState.record,
      d = B3(i),
      f = ug(i);
    return m.jsxs('div', {
      className: Ie.layout,
      children: [
        m.jsx('header', {
          className: Ie.head,
          children: m.jsx('h1', { className: Ie.title, children: '図鑑 / 記録' }),
        }),
        m.jsxs('div', {
          className: Ie.tabs,
          children: [
            m.jsx('button', {
              type: 'button',
              className: `${Ie.tab} ${o === 'record' ? Ie.tabActive : ''}`,
              onClick: () => r('record'),
              children: '到達記録',
            }),
            m.jsx('button', {
              type: 'button',
              className: `${Ie.tab} ${o === 'codex' ? Ie.tabActive : ''}`,
              onClick: () => r('codex'),
              children: '図鑑',
            }),
          ],
        }),
        o === 'record'
          ? m.jsxs('div', {
              className: Ie.records,
              children: [
                m.jsxs('div', {
                  className: Ie.statBig,
                  children: [
                    m.jsx('span', { className: Ie.statNum, children: u.deepestReached }),
                    m.jsx('span', { className: Ie.statLabel, children: '最深到達階' }),
                  ],
                }),
                m.jsxs('dl', {
                  className: Ie.statList,
                  children: [
                    m.jsxs('div', {
                      className: Ie.statRow,
                      children: [
                        m.jsx('dt', { children: '最高撃破ボス階' }),
                        m.jsx('dd', {
                          children: u.highestBossDefeated > 0 ? `${u.highestBossDefeated}F` : '—',
                        }),
                      ],
                    }),
                    m.jsxs('div', {
                      className: Ie.statRow,
                      children: [
                        m.jsx('dt', { children: '挑戦回数' }),
                        m.jsx('dd', { children: u.totalDives }),
                      ],
                    }),
                    m.jsxs('div', {
                      className: Ie.statRow,
                      children: [
                        m.jsx('dt', { children: '図鑑達成率' }),
                        m.jsxs('dd', { children: [d.completionPct, '%'] }),
                      ],
                    }),
                  ],
                }),
                m.jsx('h2', { className: Ie.h2, children: 'ボス撃破履歴' }),
                u.bossDefeatLog.length === 0
                  ? m.jsx('p', { className: Ie.empty, children: 'まだボスを倒していません。' })
                  : m.jsx('ul', {
                      className: Ie.bossLog,
                      children: u.bossDefeatLog
                        .slice()
                        .reverse()
                        .map((h, p) =>
                          m.jsx(
                            'li',
                            {
                              className: Ie.bossRow,
                              children: m.jsxs('span', { children: [h.depth, 'F のボス撃破'] }),
                            },
                            p
                          )
                        ),
                    }),
              ],
            })
          : m.jsxs('div', {
              className: Ie.codex,
              children: [
                m.jsxs('div', {
                  className: Ie.codexSummary,
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
                  className: Ie.list,
                  children: f.map((h) =>
                    m.jsx(
                      'div',
                      {
                        className: `${Ie.row} ${h.seen ? '' : Ie.unseen}`,
                        children: m.jsxs('div', {
                          className: Ie.info,
                          children: [
                            m.jsxs('span', {
                              className: Ie.name,
                              children: [
                                h.seen ? h.name : '？？？',
                                h.defeated
                                  ? m.jsx('span', { className: Ie.badge, children: '撃破' })
                                  : null,
                              ],
                            }),
                            m.jsxs('span', {
                              className: Ie.sub,
                              children: [
                                '第',
                                h.tierBand + 1,
                                '帯',
                                h.seen && h.drops.length > 0
                                  ? '・' + h.drops.map((p) => (p.found ? p.name : '？')).join(' / ')
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
        m.jsx('footer', {
          className: Ie.foot,
          children: m.jsx('button', {
            type: 'button',
            className: Ie.back,
            onClick: () => l('/town'),
            children: '拠点へ戻る',
          }),
        }),
      ],
    });
  },
  I3 = '_layout_j0tqt_1',
  M3 = '_head_j0tqt_13',
  D3 = '_depth_j0tqt_22',
  R3 = '_theme_j0tqt_28',
  z3 = '_fpvWrap_j0tqt_45',
  H3 = '_fpvControls_j0tqt_52',
  U3 = '_fpvTurn_j0tqt_63',
  $3 = '_fpvForward_j0tqt_64',
  G3 = '_fpvBack_j0tqt_65',
  Y3 = '_menuBtn_j0tqt_99',
  X3 = '_menuGold_j0tqt_112',
  V3 = '_menuActions_j0tqt_118',
  Q3 = '_menuAction_j0tqt_118',
  K3 = '_menuSectionLabel_j0tqt_135',
  Z3 = '_menuMember_j0tqt_141',
  J3 = '_menuMemberName_j0tqt_155',
  P3 = '_menuMemberJob_j0tqt_159',
  F3 = '_menuMemberStat_j0tqt_166',
  W3 = '_menuSp_j0tqt_171',
  e2 = '_menuStats_j0tqt_178',
  t2 = '_menuStat_j0tqt_178',
  l2 = '_skillTabs_j0tqt_190',
  a2 = '_skillTab_j0tqt_190',
  n2 = '_skillTabOn_j0tqt_207',
  i2 = '_mapWrap_j0tqt_213',
  s2 = '_paletteHint_j0tqt_247',
  r2 = '_stairs_j0tqt_256',
  o2 = '_action_j0tqt_270',
  c2 = '_notice_j0tqt_287',
  u2 = '_itemOverlay_j0tqt_351',
  d2 = '_itemPanel_j0tqt_361',
  m2 = '_itemTitle_j0tqt_374',
  _2 = '_itemEmpty_j0tqt_379',
  f2 = '_itemRow_j0tqt_385',
  p2 = '_itemName_j0tqt_393',
  h2 = '_itemDesc_j0tqt_401',
  g2 = '_itemTargets_j0tqt_407',
  k2 = '_itemTarget_j0tqt_407',
  v2 = '_itemHp_j0tqt_427',
  y2 = '_itemUse_j0tqt_433',
  b2 = '_itemClose_j0tqt_450',
  x2 = '_confirmOverlay_j0tqt_460',
  S2 = '_confirmBox_j0tqt_471',
  w2 = '_confirmText_j0tqt_483',
  T2 = '_confirmActions_j0tqt_490',
  j2 = '_confirmCancel_j0tqt_495',
  N2 = '_confirmOk_j0tqt_496',
  se = {
    layout: I3,
    head: M3,
    depth: D3,
    theme: R3,
    fpvWrap: z3,
    fpvControls: H3,
    fpvTurn: U3,
    fpvForward: $3,
    fpvBack: G3,
    menuBtn: Y3,
    menuGold: X3,
    menuActions: V3,
    menuAction: Q3,
    menuSectionLabel: K3,
    menuMember: Z3,
    menuMemberName: J3,
    menuMemberJob: P3,
    menuMemberStat: F3,
    menuSp: W3,
    menuStats: e2,
    menuStat: t2,
    skillTabs: l2,
    skillTab: a2,
    skillTabOn: n2,
    mapWrap: i2,
    paletteHint: s2,
    stairs: r2,
    action: o2,
    notice: c2,
    itemOverlay: u2,
    itemPanel: d2,
    itemTitle: m2,
    itemEmpty: _2,
    itemRow: f2,
    itemName: p2,
    itemDesc: h2,
    itemTargets: g2,
    itemTarget: k2,
    itemHp: v2,
    itemUse: y2,
    itemClose: b2,
    confirmOverlay: x2,
    confirmBox: S2,
    confirmText: w2,
    confirmActions: T2,
    confirmCancel: j2,
    confirmOk: N2,
  },
  E2 = '_canvas_1keax_1',
  C2 = { canvas: E2 },
  A2 = '/sekaiju-like-game/assets/stairs-down-BjaF19rU.png',
  L2 = '/sekaiju-like-game/assets/stairs-up-DhyZlujG.png';
function dg(l) {
  if (typeof Image > 'u') return null;
  const i = new Image();
  return ((i.src = l), i);
}
const Pr = dg(L2),
  Fr = dg(A2);
function Yr(l) {
  return !!l && l.complete && l.naturalWidth > 0;
}
const Au = () => Yr(Pr) && Yr(Fr);
function mg() {
  const [l, i] = w.useState(Au);
  return (
    w.useEffect(() => {
      if (Au()) {
        i(!0);
        return;
      }
      const o = [Pr, Fr].filter((u) => !!u),
        r = () => {
          Au() && i(!0);
        };
      return (
        o.forEach((u) => u.addEventListener('load', r)),
        () => o.forEach((u) => u.removeEventListener('load', r))
      );
    }, []),
    l
  );
}
const q2 = [
    { id: 'icon_chest', symbol: '📦', label: '宝箱' },
    { id: 'icon_foe', symbol: '👹', label: '強敵(FOE)' },
    { id: 'icon_warning', symbol: '⚠️', label: '注意' },
    { id: 'icon_door', symbol: '🚪', label: '扉/近道' },
    { id: 'icon_gather', symbol: '⛏️', label: '採集' },
    { id: 'icon_event', symbol: '❗', label: 'イベント' },
    { id: 'icon_note', symbol: '📝', label: 'メモ' },
    { id: 'icon_star', symbol: '⭐', label: '任意' },
  ],
  B2 = new Map(q2.map((l) => [l.id, l]));
function O2(l) {
  var i;
  return ((i = B2.get(l)) == null ? void 0 : i.symbol) ?? '•';
}
const Ha = {
    fog: '#cdd9b8',
    floor: '#fbfdf7',
    wall: '#4a5a3a',
    grid: '#e3ebd6',
    player: '#2196f3',
    foe: '#b0533a',
    foeAlert: '#d32f2f',
  },
  I2 = {
    mining: '⛏️',
    gathering: '🌿',
    logging: '🪓',
    fishing: '🎣',
    harvest: '🌰',
    hunting: '🍖',
  },
  M2 = '🍳',
  D2 = ({
    floor: l,
    explored: i,
    pos: o,
    dir: r,
    icons: u = [],
    foes: d = [],
    depletedGathers: f = [],
    maxCell: h = 26,
    onCellClick: p,
  }) => {
    const g = w.useRef(null),
      y = mg(),
      v = Math.max(10, Math.min(h, Math.floor(360 / l.width))),
      I = l.width * v,
      L = l.height * v;
    w.useEffect(() => {
      const S = g.current;
      if (!S) return;
      const E = new Set(i),
        x = new Set(f),
        C = new Map(l.gatheringPoints.map((W) => [`${W.cell.x},${W.cell.y}`, W.type])),
        $ = window.devicePixelRatio || 1;
      ((S.width = I * $), (S.height = L * $));
      const D = S.getContext('2d');
      if (!D) return;
      (D.scale($, $), D.clearRect(0, 0, I, L));
      for (let W = 0; W < l.height; W++)
        for (let de = 0; de < l.width; de++) {
          const ye = E.has(`${de},${W}`);
          ((D.fillStyle = ye ? Ha.floor : Ha.fog),
            D.fillRect(de * v, W * v, v, v),
            ye &&
              ((D.strokeStyle = Ha.grid),
              (D.lineWidth = 1),
              D.strokeRect(de * v + 0.5, W * v + 0.5, v - 1, v - 1)));
        }
      ((D.strokeStyle = Ha.wall), (D.lineWidth = 2), (D.lineCap = 'round'));
      const ae = (W, de, ye, xe) => {
        (D.beginPath(), D.moveTo(W, de), D.lineTo(ye, xe), D.stroke());
      };
      for (let W = 0; W < l.height; W++)
        for (let de = 0; de < l.width; de++) {
          if (!E.has(`${de},${W}`)) continue;
          const ye = l.cells[W][de],
            xe = de * v,
            ve = W * v;
          (ye.walls.N && ae(xe, ve, xe + v, ve),
            ye.walls.S && ae(xe, ve + v, xe + v, ve + v),
            ye.walls.W && ae(xe, ve, xe, ve + v),
            ye.walls.E && ae(xe + v, ve, xe + v, ve + v));
          const q = ye.event;
          if (
            (q == null ? void 0 : q.kind) === 'stairsUp' ||
            (q == null ? void 0 : q.kind) === 'stairsDown'
          ) {
            const J = q.kind === 'stairsUp' ? Pr : Fr;
            if (Yr(J)) {
              const ne = v * 0.9,
                pe = xe + (v - ne) / 2,
                K = ve + (v - ne) / 2;
              ((D.imageSmoothingEnabled = !1), D.drawImage(J, pe, K, ne, ne));
            }
          } else if ((q == null ? void 0 : q.kind) === 'gather') {
            const J = x.has(`${de},${W}`),
              ne = C.get(`${de},${W}`);
            ((D.globalAlpha = J ? 0.35 : 1),
              (D.font = `${Math.floor(v * 0.7)}px sans-serif`),
              (D.textAlign = 'center'),
              (D.textBaseline = 'middle'),
              D.fillText((ne && I2[ne]) || '🌿', xe + v / 2, ve + v / 2 + 1),
              (D.globalAlpha = 1));
          } else
            (q == null ? void 0 : q.kind) === 'cookingSpot' &&
              ((D.font = `${Math.floor(v * 0.7)}px sans-serif`),
              (D.textAlign = 'center'),
              (D.textBaseline = 'middle'),
              D.fillText(M2, xe + v / 2, ve + v / 2 + 1));
        }
      ((D.font = `${Math.floor(v * 0.66)}px sans-serif`),
        (D.textAlign = 'center'),
        (D.textBaseline = 'middle'));
      for (const W of u)
        E.has(`${W.x},${W.y}`) && D.fillText(O2(W.iconId), W.x * v + v / 2, W.y * v + v / 2 + 1);
      for (const W of d) {
        if (!E.has(`${W.x},${W.y}`)) continue;
        const de = W.x * v + v / 2,
          ye = W.y * v + v / 2;
        ((D.fillStyle = W.alerted ? Ha.foeAlert : Ha.foe),
          D.beginPath(),
          D.arc(de, ye, v * 0.3, 0, Math.PI * 2),
          D.fill(),
          (D.fillStyle = '#ffffff'),
          (D.font = `bold ${Math.floor(v * 0.5)}px sans-serif`),
          (D.textAlign = 'center'),
          (D.textBaseline = 'middle'),
          D.fillText('!', de, ye + 1));
      }
      const Y = o.x * v + v / 2,
        T = o.y * v + v / 2,
        V = v * 0.34,
        ue = { N: -Math.PI / 2, E: 0, S: Math.PI / 2, W: Math.PI }[r];
      ((D.fillStyle = Ha.player),
        D.beginPath(),
        D.moveTo(Y + Math.cos(ue) * V, T + Math.sin(ue) * V),
        D.lineTo(Y + Math.cos(ue + 2.5) * V, T + Math.sin(ue + 2.5) * V),
        D.lineTo(Y + Math.cos(ue - 2.5) * V, T + Math.sin(ue - 2.5) * V),
        D.closePath(),
        D.fill());
    }, [l, i, o, r, u, d, f, v, I, L, y]);
    const M = (S) => {
      if (!p) return;
      const E = S.currentTarget.getBoundingClientRect(),
        x = Math.floor(((S.clientX - E.left) / E.width) * l.width),
        C = Math.floor(((S.clientY - E.top) / E.height) * l.height);
      x >= 0 && C >= 0 && x < l.width && C < l.height && p(x, C);
    };
    return m.jsx('canvas', {
      ref: g,
      className: C2.canvas,
      style: { width: I, height: L },
      onClick: M,
    });
  },
  R2 = '_gauge_1o2hx_1',
  z2 = '_icon_1o2hx_11',
  H2 = '_segments_1o2hx_16',
  U2 = '_seg_1o2hx_16',
  $2 = '_filled_1o2hx_28',
  G2 = '_danger_1o2hx_32',
  Mn = { gauge: R2, icon: z2, segments: H2, seg: U2, filled: $2, danger: G2 },
  Y2 = ({ level: l }) => {
    const i = l >= Zi;
    return m.jsxs('div', {
      className: Mn.gauge,
      role: 'img',
      'aria-label': `エンカウントゲージ ${l}/${Zi}`,
      children: [
        m.jsx('span', { className: Mn.icon, children: i ? '⚠' : '👣' }),
        m.jsx('div', {
          className: Mn.segments,
          children: Array.from({ length: Zi }, (o, r) =>
            m.jsx(
              'span',
              { className: [Mn.seg, r < l ? Mn.filled : '', i ? Mn.danger : ''].join(' ') },
              r
            )
          ),
        }),
      ],
    });
  },
  X2 = '_view_tw2v9_1',
  V2 = { view: X2 },
  Pp = { N: { dx: 0, dy: -1 }, E: { dx: 1, dy: 0 }, S: { dx: 0, dy: 1 }, W: { dx: -1, dy: 0 } };
function Q2(l, i, o, r = 4) {
  const u = Jh(o),
    d = Zh(o),
    f = [];
  let { x: h, y: p } = i;
  for (let g = 0; g < r; g++) {
    const y = Ua(l, h, p, o);
    if (
      (f.push({
        x: h,
        y: p,
        leftOpen: !l.cells[p][h].walls[u],
        rightOpen: !l.cells[p][h].walls[d],
        frontOpen: y,
        event: l.cells[p][h].event,
      }),
      !y)
    )
      break;
    ((h += Pp[o].dx), (p += Pp[o].dy));
  }
  return f;
}
const K2 = {
    sky: '#26301c',
    ceiling: '#3a4a2c',
    floor: '#5d6b46',
    wall: '#8b9a6b',
    frontWall: '#7a8a5c',
    outline: '#2c3720',
  },
  Z2 = 0.56,
  J2 = ({
    floor: l,
    pos: i,
    dir: o,
    foes: r = [],
    theme: u,
    maxDepth: d = 4,
    width: f = 358,
    height: h = 200,
  }) => {
    const p = w.useRef(null),
      g = mg();
    return (
      w.useEffect(() => {
        const y = { ...K2, ...(u ?? {}) },
          v = p.current;
        if (!v) return;
        const I = window.devicePixelRatio || 1;
        ((v.width = f * I), (v.height = h * I));
        const L = v.getContext('2d');
        if (!L) return;
        L.scale(I, I);
        const M = f,
          S = h,
          E = M / 2,
          x = S / 2,
          C = Q2(l, i, o, d),
          $ = (Y) => {
            const T = Math.pow(Z2, Y);
            return {
              l: E - (M / 2) * T,
              r: E + (M / 2) * T,
              t: x - (S / 2) * T,
              b: x + (S / 2) * T,
            };
          },
          D = (Y, T, V = !1) => {
            (L.beginPath(), L.moveTo(Y[0][0], Y[0][1]));
            for (let ie = 1; ie < Y.length; ie++) L.lineTo(Y[ie][0], Y[ie][1]);
            (L.closePath(),
              (L.fillStyle = T),
              L.fill(),
              V && ((L.strokeStyle = y.outline), (L.lineWidth = 1), L.stroke()));
          },
          ae = (Y) => `rgba(0,0,0,${Math.min(0.5, Y * 0.13)})`;
        ((L.fillStyle = y.sky), L.fillRect(0, 0, M, S));
        for (let Y = C.length - 1; Y >= 0; Y--) {
          const T = $(Y),
            V = $(Y + 1),
            ie = C[Y];
          (D(
            [
              [T.l, T.t],
              [T.r, T.t],
              [V.r, V.t],
              [V.l, V.t],
            ],
            y.ceiling
          ),
            D(
              [
                [T.l, T.b],
                [T.r, T.b],
                [V.r, V.b],
                [V.l, V.b],
              ],
              y.floor
            ),
            D(
              [
                [T.l, T.t],
                [V.l, V.t],
                [V.l, V.b],
                [T.l, T.b],
              ],
              ie.leftOpen ? y.sky : y.wall,
              !0
            ),
            D(
              [
                [T.r, T.t],
                [V.r, V.t],
                [V.r, V.b],
                [T.r, T.b],
              ],
              ie.rightOpen ? y.sky : y.wall,
              !0
            ),
            ie.frontOpen ||
              D(
                [
                  [V.l, V.t],
                  [V.r, V.t],
                  [V.r, V.b],
                  [V.l, V.b],
                ],
                y.frontWall,
                !0
              ),
            (L.fillStyle = ae(Y)),
            L.fillRect(V.l, V.t, V.r - V.l, V.b - V.t));
          const ue = ie.event;
          if (
            (ue == null ? void 0 : ue.kind) === 'stairsUp' ||
            (ue == null ? void 0 : ue.kind) === 'stairsDown'
          ) {
            const W = ue.kind === 'stairsUp' ? Pr : Fr;
            if (Yr(W)) {
              const de = Math.max(20, (T.b - V.b) * 0.95),
                ye = E - de / 2,
                xe = (T.b + V.b) / 2 - de / 2;
              ((L.imageSmoothingEnabled = !1), L.drawImage(W, ye, xe, de, de));
            }
          }
          if (Y > 0 && r.some((W) => W.x === ie.x && W.y === ie.y)) {
            const W = r.some((ve) => ve.x === ie.x && ve.y === ie.y && ve.alerted),
              de = E,
              ye = (T.b + V.b) / 2 - (T.b - V.b) * 0.1,
              xe = Math.max(14, (T.b - T.t) * 0.22);
            ((L.fillStyle = W ? '#d32f2f' : '#b0533a'),
              L.beginPath(),
              L.arc(de, ye, xe, 0, Math.PI * 2),
              L.fill(),
              (L.fillStyle = '#fff'),
              (L.font = `bold ${Math.floor(xe * 1.3)}px sans-serif`),
              (L.textAlign = 'center'),
              (L.textBaseline = 'middle'),
              L.fillText('!', de, ye + 1));
          }
        }
      }, [l, i, o, r, u, d, f, h, g]),
      m.jsx('canvas', { ref: p, className: V2.view, style: { width: f, height: h } })
    );
  },
  P2 = '_wrap_1uoga_1',
  F2 = '_scroll_1uoga_7',
  W2 = '_canvas_1uoga_17',
  eS = '_edges_1uoga_21',
  tS = '_edge_1uoga_21',
  lS = '_edgeLabel_1uoga_34',
  aS = '_node_1uoga_40',
  nS = '_learned_1uoga_57',
  iS = '_maxed_1uoga_62',
  sS = '_available_1uoga_67',
  rS = '_locked_1uoga_72',
  oS = '_selected_1uoga_76',
  cS = '_nodeName_1uoga_81',
  uS = '_nodeCost_1uoga_92',
  dS = '_nodeLv_1uoga_104',
  mS = '_lvNum_1uoga_112',
  _S = '_lvBar_1uoga_118',
  fS = '_lvFill_1uoga_126',
  pS = '_lvMax_1uoga_132',
  hS = '_detail_1uoga_136',
  gS = '_detailName_1uoga_143',
  kS = '_detailLv_1uoga_151',
  vS = '_detailDesc_1uoga_157',
  yS = '_detailReq_1uoga_164',
  bS = '_hint_1uoga_170',
  xS = '_learnBtn_1uoga_176',
  Xe = {
    wrap: P2,
    scroll: F2,
    canvas: W2,
    edges: eS,
    edge: tS,
    edgeLabel: lS,
    node: aS,
    learned: nS,
    maxed: iS,
    available: sS,
    locked: rS,
    selected: oS,
    nodeName: cS,
    nodeCost: uS,
    nodeLv: dS,
    lvNum: mS,
    lvBar: _S,
    lvFill: fS,
    lvMax: pS,
    detail: hS,
    detailName: gS,
    detailLv: kS,
    detailDesc: vS,
    detailReq: yS,
    hint: bS,
    learnBtn: xS,
  },
  Fp = [1, 2, 2, 2, 2];
function _g(l) {
  return Fp[Math.min(Math.max(0, l), Fp.length - 1)];
}
function fg(l) {
  var o, r;
  const i = [
    ...(((o = Ke[l.classId]) == null ? void 0 : o.skillTree.skills) ?? []),
    ...(((r = ft[l.raceId]) == null ? void 0 : r.raceSkillTree.skills) ?? []),
  ];
  return (l.titleId && $l[l.titleId] && i.push(...$l[l.titleId].skillTree.skills), i);
}
function SS(l, i) {
  const o = new Map(l.map((d) => [d.skillId, d])),
    r = new Map(),
    u = (d, f = 0) => {
      var y;
      const h = r.get(d);
      if (h !== void 0) return h;
      const p = o.get(d);
      if (!p || !((y = p.requires) != null && y.length) || f > 30) return (r.set(d, 0), 0);
      const g =
        1 + Math.max(...p.requires.map((v) => (o.has(v.skillId) ? u(v.skillId, f + 1) : 0)));
      return (r.set(d, g), g);
    };
  return u(i);
}
function ns(l, i) {
  return _g(SS(fg(l), i));
}
function Hn(l, i) {
  return l.learnedSkills[i] ?? 0;
}
function Wi(l) {
  return l.skillPoints.total - l.skillPoints.spent;
}
function pg(l, i) {
  return (i.requires ?? []).every((o) => Hn(l, o.skillId) >= o.level);
}
function hg(l, i) {
  const o = fg(l).find((r) => r.skillId === i);
  return !o || Hn(l, i) >= o.maxLevel || Wi(l) < ns(l, i) ? !1 : pg(l, o);
}
function gg(l, i) {
  return hg(l, i)
    ? {
        ...l,
        learnedSkills: { ...l.learnedSkills, [i]: Hn(l, i) + 1 },
        skillPoints: { ...l.skillPoints, spent: l.skillPoints.spent + ns(l, i) },
      }
    : l;
}
const Lu = 132,
  qu = 48,
  Er = 176,
  Cr = 62,
  kg = ({ nodes: l, char: i, onLearn: o }) => {
    const [r, u] = w.useState(null),
      d = w.useMemo(() => {
        var x;
        const p = new Map(l.map((C) => [C.skillId, C])),
          g = new Map(),
          y = (C, $ = 0) => {
            var Y;
            if (g.has(C)) return g.get(C);
            const D = p.get(C);
            if (!D || !((Y = D.requires) != null && Y.length) || $ > 20) return (g.set(C, 0), 0);
            const ae =
              1 + Math.max(...D.requires.map((T) => (p.has(T.skillId) ? y(T.skillId, $ + 1) : 0)));
            return (g.set(C, ae), ae);
          },
          v = [];
        l.forEach((C, $) => {
          const D = y(C.skillId);
          (v[D] || (v[D] = [])).push($);
        });
        const I = new Map(),
          L = v.map(() => new Set());
        for (let C = 0; C < v.length; C++)
          for (const $ of v[C] ?? []) {
            const D = l[$];
            let ae = 0;
            if (C > 0 && (x = D.requires) != null && x.length) {
              const T = D.requires.map((V) => I.get(V.skillId)).filter((V) => V !== void 0);
              T.length && (ae = Math.min(...T));
            }
            let Y = ae;
            for (; L[C].has(Y); ) Y++;
            (L[C].add(Y), I.set(D.skillId, Y));
          }
        const M = Math.max(0, ...I.values()),
          S = l.map((C) => ({ node: C, col: y(C.skillId), row: I.get(C.skillId) ?? 0 })),
          E = [];
        for (const C of S)
          for (const $ of C.node.requires ?? []) {
            const D = S.find((ae) => ae.node.skillId === $.skillId);
            D &&
              E.push({
                from: $.skillId,
                to: C.node.skillId,
                level: $.level,
                x1: D.col * Er + Lu,
                y1: D.row * Cr + qu / 2,
                x2: C.col * Er,
                y2: C.row * Cr + qu / 2,
              });
          }
        return { placed: S, edges: E, width: (v.length - 1) * Er + Lu, height: (M + 1) * Cr };
      }, [l]),
      f = r ? Xi[r] : null,
      h = r ? l.find((p) => p.skillId === r) : null;
    return m.jsxs('div', {
      className: Xe.wrap,
      children: [
        m.jsx('div', {
          className: Xe.scroll,
          children: m.jsxs('div', {
            className: Xe.canvas,
            style: { width: d.width, height: d.height },
            children: [
              m.jsx('svg', {
                className: Xe.edges,
                width: d.width,
                height: d.height,
                children: d.edges.map((p) => {
                  const g = (p.x1 + p.x2) / 2;
                  return m.jsxs(
                    'g',
                    {
                      children: [
                        m.jsx('path', {
                          className: Xe.edge,
                          d: `M ${p.x1} ${p.y1} H ${g} V ${p.y2} H ${p.x2}`,
                          fill: 'none',
                        }),
                        m.jsxs('text', {
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
              d.placed.map(({ node: p, col: g, row: y }) => {
                var E;
                const v = Hn(i, p.skillId),
                  I = v >= p.maxLevel,
                  L = (p.requires ?? []).every((x) => Hn(i, x.skillId) >= x.level),
                  M = hg(i, p.skillId),
                  S = [
                    Xe.node,
                    v > 0 ? Xe.learned : '',
                    I ? Xe.maxed : '',
                    M ? Xe.available : '',
                    L ? '' : Xe.locked,
                    r === p.skillId ? Xe.selected : '',
                  ]
                    .filter(Boolean)
                    .join(' ');
                return m.jsxs(
                  'button',
                  {
                    type: 'button',
                    className: S,
                    style: { left: g * Er, top: y * Cr, width: Lu, height: qu },
                    onClick: () => u(p.skillId),
                    children: [
                      m.jsx('span', {
                        className: Xe.nodeName,
                        children: ((E = Xi[p.skillId]) == null ? void 0 : E.name) ?? p.skillId,
                      }),
                      m.jsxs('span', { className: Xe.nodeCost, children: ['SP', _g(g)] }),
                      m.jsxs('span', {
                        className: Xe.nodeLv,
                        children: [
                          m.jsx('span', { className: Xe.lvNum, children: v }),
                          m.jsx('span', {
                            className: Xe.lvBar,
                            children: m.jsx('span', {
                              className: Xe.lvFill,
                              style: { width: `${(v / p.maxLevel) * 100}%` },
                            }),
                          }),
                          m.jsx('span', { className: Xe.lvMax, children: p.maxLevel }),
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
        f && h
          ? (() => {
              var S;
              const p = Hn(i, f.id),
                g = p >= h.maxLevel,
                y = pg(i, h),
                v = ns(i, f.id),
                I = Wi(i) >= v,
                L = !g && y && I,
                M = g
                  ? '習得済み（最大Lv）'
                  : y
                    ? I
                      ? p === 0
                        ? `習得する（SP${v} 消費）`
                        : `Lv${p}→${p + 1} に強化（SP${v} 消費）`
                      : `SP不足（必要 SP${v}）`
                    : '前提スキル未達';
              return m.jsxs('div', {
                className: Xe.detail,
                children: [
                  m.jsxs('div', {
                    className: Xe.detailName,
                    children: [
                      f.name,
                      m.jsxs('span', {
                        className: Xe.detailLv,
                        children: ['Lv ', p, '/', h.maxLevel],
                      }),
                    ],
                  }),
                  m.jsx('div', { className: Xe.detailDesc, children: f.description }),
                  (S = h.requires) != null && S.length
                    ? m.jsxs('div', {
                        className: Xe.detailReq,
                        children: [
                          '前提:',
                          ' ',
                          h.requires
                            .map((E) => {
                              var x;
                              return `${((x = Xi[E.skillId]) == null ? void 0 : x.name) ?? E.skillId} Lv${E.level}`;
                            })
                            .join('・'),
                        ],
                      })
                    : null,
                  m.jsx('button', {
                    type: 'button',
                    className: Xe.learnBtn,
                    disabled: !L,
                    onClick: () => o(f.id),
                    children: M,
                  }),
                ],
              });
            })()
          : m.jsx('div', {
              className: Xe.hint,
              children:
                'ノードをタップで選択し、下の「習得する」ボタンで習得/強化（1Lvあたりの消費SPは各ノードの「SP◯」。深いスキルほど高コスト）。緑=習得済 / 枠強調=習得可 / 暗=前提未達。',
            }),
      ],
    });
  },
  Ar = [
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
function Wp(l) {
  const i = Math.floor((l - 1) / 10);
  return Ar[((i % Ar.length) + Ar.length) % Ar.length];
}
function wS(l) {
  var r, u, d;
  const i = l.diveState;
  if (!i) return !1;
  const o =
    (u = (r = l.towerState.floors[i.depth]) == null ? void 0 : r.generated.cells[i.pos.y]) == null
      ? void 0
      : u[i.pos.x];
  return ((d = o == null ? void 0 : o.event) == null ? void 0 : d.kind) === 'cookingSpot';
}
function TS(l) {
  const i = new Set(l.unlockedRecipeIds ?? []);
  return Object.values(Qn).filter((o) => i.has(o.id));
}
function vg(l, i) {
  const o = Qn[i];
  return !o || !(l.unlockedRecipeIds ?? []).includes(i)
    ? !1
    : o.ingredients.every((r) => od(l, r.itemId) >= r.qty);
}
function jS(l, i) {
  if (!vg(l, i)) return { ok: !1, save: l };
  const o = Qn[i];
  let r = l;
  for (const u of o.ingredients) r = Uh(r, u.itemId, u.qty);
  return ((r = Hh(r, o.result.itemId, o.result.count)), { ok: !0, save: r });
}
function yg(l, i) {
  const o = new Set([...l.guild.party.front, ...l.guild.party.back].filter((r) => r !== null));
  return l.guild.members.some((r) => o.has(r.id) && (r.learnedSkills[i] ?? 0) > 0);
}
function bg(l) {
  var d, f, h;
  const i = l.diveState;
  if (!i) return null;
  const o = (d = l.towerState.floors[i.depth]) == null ? void 0 : d.generated,
    r = (f = o == null ? void 0 : o.cells[i.pos.y]) == null ? void 0 : f[i.pos.x];
  if (!o || ((h = r == null ? void 0 : r.event) == null ? void 0 : h.kind) !== 'gather')
    return null;
  const u = r.event.gatherId;
  return o.gatheringPoints.find((p) => p.id === u) ?? null;
}
function Qu(l, i) {
  var u;
  const o = l.diveState;
  return o
    ? (((u = l.towerState.floors[o.depth]) == null ? void 0 : u.depletedGathers) ?? []).includes(
        $r(i.cell.x, i.cell.y)
      )
    : !0;
}
function eh(l, i) {
  return yg(l, $a[i.type].requiredSkillId);
}
function NS(l, i) {
  const o = l.reduce((u, d) => u + d.weight, 0);
  let r = i.next() * o;
  for (const u of l) if (((r -= u.weight), r < 0)) return u.itemId;
  return l[l.length - 1].itemId;
}
function ES(l, i) {
  const o = l.diveState;
  if (!o) return { ok: !1, save: l, reason: 'noDive' };
  const r = bg(l);
  if (!r) return { ok: !1, save: l, reason: 'noPoint' };
  if (Qu(l, r)) return { ok: !1, save: l, reason: 'depleted' };
  const u = $a[r.type];
  if (!yg(l, u.requiredSkillId)) return { ok: !1, save: l, reason: 'noSkill' };
  if (u.food && zh(l) >= Rh) return { ok: !1, save: l, reason: 'foodFull' };
  const d = NS(u.drops, i);
  let f = u.food ? Hh(l, d, 1) : sd(l, d, 1);
  const h = $r(r.cell.x, r.cell.y),
    p = f.towerState.floors[o.depth],
    g = p.depletedGathers.includes(h) ? p.depletedGathers : [...p.depletedGathers, h];
  return (
    (f = {
      ...f,
      towerState: {
        ...f.towerState,
        floors: { ...f.towerState.floors, [o.depth]: { ...p, depletedGathers: g } },
      },
    }),
    { ok: !0, save: f, itemId: d, reason: void 0 }
  );
}
function CS(l, i, o) {
  var S;
  const r = We[i];
  if (!r) return { save: l, ok: !1, message: 'そのアイテムは無い' };
  if (!((S = r.useContext) != null && S.includes('field')))
    return { save: l, ok: !1, message: 'ここでは使えない' };
  const u = i1(i);
  if ((u ? od(l, i) : id(l, i)) <= 0) return { save: l, ok: !1, message: '所持していない' };
  const f = (E) => (u ? Uh(E, i, 1) : rd(E, i, 1));
  if (i === 'item_return_thread')
    return l.diveState
      ? { save: Pi(f(l)), ok: !0, message: '拠点へ帰還した' }
      : { save: l, ok: !1, message: '探索中のみ使える' };
  if (!l.diveState) return { save: l, ok: !1, message: '探索中のみ使える' };
  const h = l.diveState.party.find((E) => E.charId === o),
    p = l.guild.members.find((E) => E.id === o);
  if (!h || !p) return { save: l, ok: !1, message: '対象がいない' };
  const g = Gl(p);
  let y = h.hp,
    v = h.tp,
    I = !1;
  for (const E of r.effects ?? [])
    E.kind === 'heal'
      ? ((y = Math.min(g.hp, y + E.amount(1))), (I = !0))
      : E.kind === 'restoreTp' && ((v = Math.min(g.tp, v + E.amount(1))), (I = !0));
  if (!I) return { save: l, ok: !1, message: 'いま使う効果がない' };
  const L = l.diveState.party.map((E) => (E.charId === o ? { ...E, hp: y, tp: v } : E));
  return {
    save: f({ ...l, diveState: { ...l.diveState, party: L } }),
    ok: !0,
    message: `${p.name} に ${r.name} を使った`,
  };
}
const AS = (l) => new Promise((i) => setTimeout(i, l)),
  LS = () => {
    const l = ml(),
      { save: i, applySave: o, applyAndPersist: r } = Vl(),
      u = w.useRef(null),
      d = w.useRef(!1),
      [f, h] = w.useState(!1),
      [p, g] = w.useState(!1),
      [y, v] = w.useState(!1),
      [I, L] = w.useState(null),
      [M, S] = w.useState('class'),
      [E, x] = w.useState(null),
      [C, $] = w.useState(null),
      D = (i == null ? void 0 : i.diveState) ?? null,
      ae = w.useMemo(() => {
        var K;
        return i && D ? ((K = i.towerState.floors[D.depth]) == null ? void 0 : K.generated) : null;
      }, [i, D]),
      Y = w.useMemo(() => {
        var K;
        return i && D
          ? (((K = i.towerState.floors[D.depth]) == null ? void 0 : K.foeRuntime) ?? [])
              .filter((b) => !b.defeated)
              .map((b) => ({ x: b.cell.x, y: b.cell.y, alerted: b.alerted }))
          : [];
      }, [i, D]),
      T = w.useMemo(() => (i ? bg(i) : null), [i]),
      V = w.useMemo(() => (i ? wS(i) : !1), [i]),
      ie = w.useMemo(() => {
        var K;
        return i && D
          ? (((K = i.towerState.floors[D.depth]) == null ? void 0 : K.depletedGathers) ?? [])
          : [];
      }, [i, D]),
      ue = w.useCallback(() => {
        var b;
        if (!i) return;
        u.current || (u.current = ba((i.masterSeed ^ 2654435769) >>> 0));
        const K = ES(i, u.current);
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
        (r(() => K.save),
          x(
            `${K.itemId ? (((b = We[K.itemId]) == null ? void 0 : b.name) ?? '素材') : '素材'} を手に入れた`
          ));
      }, [i, r]),
      W = w.useCallback(
        (K) => {
          var N;
          if (!i) return;
          const b = jS(i, K);
          b.ok &&
            (r(() => b.save), x(`${((N = Qn[K]) == null ? void 0 : N.name) ?? '料理'} を作った`));
        },
        [i, r]
      ),
      de = w.useCallback(
        (K) => {
          if (!i) return;
          (x(null), u.current || (u.current = ba((i.masterSeed ^ 2654435769) >>> 0)));
          const b = $p(i, K, u.current);
          (r(() => b.save), b.triggered && l('/battle'));
        },
        [i, r, l]
      ),
      ye = w.useCallback(
        (K) => {
          o((b) => tg(b, K));
        },
        [o]
      ),
      xe = w.useCallback(async () => {
        if (!i) return;
        const K = Gp(i);
        if (K === 'stairsUp') {
          if (!ag(i, i.diveState.depth)) {
            x('強大な力に阻まれている。階層ボスを倒さねば先へ進めない。');
            return;
          }
          await r((b) => hx(b));
        } else
          K === 'stairsDown' &&
            (i.diveState.depth <= 1 ? (await r((b) => Pi(b)), l('/town')) : await r((b) => gx(b)));
      }, [i, r, l]),
      ve = w.useCallback(async () => {
        (await r((K) => Pi(K)), l('/town'));
      }, [r, l]),
      q = w.useCallback(
        (K, b) => {
          if (!i) return;
          const N = CS(i, K, b);
          N.ok && (r(() => N.save), N.save.diveState || (h(!1), l('/town')));
        },
        [i, r, l]
      ),
      J = w.useCallback(
        async (K) => {
          if (!(d.current || K.length === 0)) {
            ((d.current = !0), x(null));
            try {
              for (const b of K) {
                if (!u.current) continue;
                let N = !1,
                  X = !1;
                if (
                  (await r((F) => {
                    if (!F.diveState) return F;
                    const te = $p(F, b, u.current);
                    return ((N = te.triggered), (X = te.moved), te.save);
                  }),
                  N)
                ) {
                  l('/battle');
                  return;
                }
                if (!X) return;
                await AS(110);
              }
            } finally {
              d.current = !1;
            }
          }
        },
        [r, l]
      ),
      ne = w.useCallback(
        (K, b) => {
          if (!D || !ae || d.current) return;
          u.current || (u.current = ba((i.masterSeed ^ 2654435769) >>> 0));
          const N = F1(ae, D.pos, { x: K, y: b });
          N && N.length > 0 && J(N);
        },
        [D, ae, i, J]
      );
    if (!i) return m.jsx(cl, { to: '/title', replace: !0 });
    if (!D || !ae) return m.jsx(cl, { to: '/town', replace: !0 });
    const pe = Gp(i);
    return m.jsxs('div', {
      className: se.layout,
      children: [
        m.jsxs('header', {
          className: se.head,
          children: [
            m.jsxs('div', {
              className: se.depth,
              children: [
                D.depth,
                'F ',
                m.jsx('span', { className: se.theme, children: Wp(D.depth).name }),
              ],
            }),
            m.jsx(Y2, { level: Z1(D.encounter.stepsUntilEncounter) }),
            m.jsx('button', {
              type: 'button',
              className: se.menuBtn,
              onClick: () => {
                (L(null), v(!0));
              },
              children: '☰ メニュー',
            }),
          ],
        }),
        m.jsxs('div', {
          className: se.fpvWrap,
          children: [
            m.jsx(J2, { floor: ae, pos: D.pos, dir: D.dir, foes: Y, theme: Wp(D.depth) }),
            m.jsxs('div', {
              className: se.fpvControls,
              children: [
                m.jsx('button', {
                  type: 'button',
                  className: se.fpvTurn,
                  onClick: () => ye(Jh(D.dir)),
                  'aria-label': '左を向く',
                  children: '↰',
                }),
                m.jsx('button', {
                  type: 'button',
                  className: se.fpvForward,
                  onClick: () => de(D.dir),
                  children: '▲ 前進',
                }),
                m.jsx('button', {
                  type: 'button',
                  className: se.fpvTurn,
                  onClick: () => ye(Zh(D.dir)),
                  'aria-label': '右を向く',
                  children: '↱',
                }),
              ],
            }),
            m.jsx('button', {
              type: 'button',
              className: se.fpvBack,
              onClick: () => ye(J1(D.dir)),
              'aria-label': '振り向く',
              children: '↻',
            }),
          ],
        }),
        m.jsx('div', {
          className: se.mapWrap,
          children: m.jsx(D2, {
            floor: ae,
            explored: i.exploredCells[D.depth] ?? [],
            pos: D.pos,
            dir: D.dir,
            foes: Y,
            depletedGathers: ie,
            onCellClick: ne,
          }),
        }),
        m.jsx('p', {
          className: se.paletteHint,
          children: 'マップのマスをタップすると、そこまで自動で移動します。',
        }),
        pe &&
          m.jsx('button', {
            type: 'button',
            className: se.stairs,
            onClick: () => void xe(),
            children:
              pe === 'stairsUp'
                ? '▲ 次の階へ進む'
                : D.depth <= 1
                  ? '▼ 拠点へ戻る'
                  : '▼ 前の階へ戻る',
          }),
        T &&
          m.jsx('button', {
            type: 'button',
            className: se.action,
            disabled: Qu(i, T) || !eh(i, T),
            onClick: ue,
            children: Qu(i, T)
              ? `🌿 ${$a[T.type].name}（採集済み）`
              : eh(i, T)
                ? `🌿 ${$a[T.type].name}する`
                : `🌿 ${$a[T.type].name}（スキル要）`,
          }),
        V &&
          m.jsx('button', {
            type: 'button',
            className: se.action,
            onClick: () => g(!0),
            children: '🍳 調理する',
          }),
        E && m.jsx('p', { className: se.notice, children: E }),
        f
          ? m.jsx('div', {
              className: se.itemOverlay,
              onClick: () => h(!1),
              children: m.jsxs('div', {
                className: se.itemPanel,
                onClick: (K) => K.stopPropagation(),
                children: [
                  m.jsx('div', { className: se.itemTitle, children: 'どうぐ・食料' }),
                  (() => {
                    const K = [...i.guild.storage, ...(i.guild.foodStorage ?? [])].filter((b) => {
                      var N, X;
                      return (
                        ((X = (N = We[b.itemId]) == null ? void 0 : N.useContext) == null
                          ? void 0
                          : X.includes('field')) && b.qty > 0
                      );
                    });
                    return K.length === 0
                      ? m.jsx('p', {
                          className: se.itemEmpty,
                          children: '使える道具がありません。',
                        })
                      : K.map((b) => {
                          const N = We[b.itemId],
                            X = b.itemId === 'item_return_thread';
                          return m.jsxs(
                            'div',
                            {
                              className: se.itemRow,
                              children: [
                                m.jsxs('div', {
                                  className: se.itemName,
                                  children: [
                                    N.name,
                                    ' ×',
                                    b.qty,
                                    m.jsx('span', {
                                      className: se.itemDesc,
                                      children: N.description,
                                    }),
                                  ],
                                }),
                                X
                                  ? m.jsx('button', {
                                      type: 'button',
                                      className: se.itemUse,
                                      onClick: () =>
                                        $({
                                          message: `${N.name} を使いますか？`,
                                          okLabel: '使う',
                                          onYes: () => q(b.itemId),
                                        }),
                                      children: '使う',
                                    })
                                  : m.jsx('div', {
                                      className: se.itemTargets,
                                      children: D.party.map((F) => {
                                        const te = i.guild.members.find((_e) => _e.id === F.charId);
                                        if (!te) return null;
                                        const me = Gl(te);
                                        return m.jsxs(
                                          'button',
                                          {
                                            type: 'button',
                                            className: se.itemTarget,
                                            onClick: () =>
                                              $({
                                                message: `${te.name} に ${N.name} を使いますか？`,
                                                okLabel: '使う',
                                                onYes: () => q(b.itemId, F.charId),
                                              }),
                                            children: [
                                              te.name,
                                              m.jsxs('span', {
                                                className: se.itemHp,
                                                children: [
                                                  'HP ',
                                                  F.hp,
                                                  '/',
                                                  me.hp,
                                                  '・TP ',
                                                  F.tp,
                                                  '/',
                                                  me.tp,
                                                ],
                                              }),
                                            ],
                                          },
                                          F.charId
                                        );
                                      }),
                                    }),
                              ],
                            },
                            b.itemId
                          );
                        });
                  })(),
                  m.jsx('button', {
                    type: 'button',
                    className: se.itemClose,
                    onClick: () => h(!1),
                    children: 'とじる',
                  }),
                ],
              }),
            })
          : null,
        p
          ? m.jsx('div', {
              className: se.itemOverlay,
              onClick: () => g(!1),
              children: m.jsxs('div', {
                className: se.itemPanel,
                onClick: (K) => K.stopPropagation(),
                children: [
                  m.jsx('div', { className: se.itemTitle, children: '調理' }),
                  (() => {
                    const K = TS(i);
                    return K.length === 0
                      ? m.jsx('p', {
                          className: se.itemEmpty,
                          children: '作れるレシピがありません。',
                        })
                      : K.map((b) => {
                          var F;
                          const N = vg(i, b.id),
                            X = b.ingredients
                              .map((te) => {
                                var me;
                                return `${((me = We[te.itemId]) == null ? void 0 : me.name) ?? te.itemId}×${te.qty}`;
                              })
                              .join(' ＋ ');
                          return m.jsxs(
                            'div',
                            {
                              className: se.itemRow,
                              children: [
                                m.jsxs('div', {
                                  className: se.itemName,
                                  children: [
                                    b.name,
                                    m.jsxs('span', {
                                      className: se.itemDesc,
                                      children: [
                                        X,
                                        ' → ',
                                        ((F = We[b.result.itemId]) == null ? void 0 : F.name) ??
                                          b.result.itemId,
                                        '（所持',
                                        b.ingredients
                                          .map((te) => {
                                            var me;
                                            return `${((me = We[te.itemId]) == null ? void 0 : me.name) ?? ''}${od(i, te.itemId)}`;
                                          })
                                          .join('・'),
                                        '）',
                                      ],
                                    }),
                                  ],
                                }),
                                m.jsx('button', {
                                  type: 'button',
                                  className: se.itemUse,
                                  disabled: !N,
                                  onClick: () =>
                                    $({
                                      message: `${b.name} を作りますか？`,
                                      okLabel: '作る',
                                      onYes: () => W(b.id),
                                    }),
                                  children: '作る',
                                }),
                              ],
                            },
                            b.id
                          );
                        });
                  })(),
                  m.jsx('button', {
                    type: 'button',
                    className: se.itemClose,
                    onClick: () => g(!1),
                    children: 'とじる',
                  }),
                ],
              }),
            })
          : null,
        y
          ? m.jsx('div', {
              className: se.itemOverlay,
              onClick: () => v(!1),
              children: m.jsx('div', {
                className: se.itemPanel,
                onClick: (K) => K.stopPropagation(),
                children: (() => {
                  var X, F, te, me;
                  const K = I ? i.guild.members.find((_e) => _e.id === I) : null;
                  if (!K)
                    return m.jsxs(m.Fragment, {
                      children: [
                        m.jsx('div', { className: se.itemTitle, children: 'メニュー' }),
                        m.jsxs('p', {
                          className: se.menuGold,
                          children: ['所持金 ', i.guild.gold, ' G'],
                        }),
                        m.jsxs('div', {
                          className: se.menuActions,
                          children: [
                            m.jsx('button', {
                              type: 'button',
                              className: se.menuAction,
                              onClick: () => {
                                (v(!1), h(!0));
                              },
                              children: '🎒 どうぐ・食料',
                            }),
                            m.jsx('button', {
                              type: 'button',
                              className: se.menuAction,
                              onClick: () => void ve(),
                              children: '🏠 拠点へ帰還',
                            }),
                          ],
                        }),
                        m.jsx('p', {
                          className: se.menuSectionLabel,
                          children: 'パーティ（タップで詳細・スキル振り）',
                        }),
                        D.party.map((_e) => {
                          var yl;
                          const Le = i.guild.members.find((bl) => bl.id === _e.charId);
                          if (!Le) return null;
                          const Me = Gl(Le),
                            tl = Wi(Le);
                          return m.jsxs(
                            'button',
                            {
                              type: 'button',
                              className: se.menuMember,
                              onClick: () => {
                                (L(_e.charId), S('class'));
                              },
                              children: [
                                m.jsxs('span', {
                                  className: se.menuMemberName,
                                  children: [
                                    Le.name,
                                    m.jsxs('span', {
                                      className: se.menuMemberJob,
                                      children: [
                                        (yl = Ke[Le.classId]) == null ? void 0 : yl.name,
                                        ' Lv',
                                        Le.level,
                                      ],
                                    }),
                                  ],
                                }),
                                m.jsxs('span', {
                                  className: se.menuMemberStat,
                                  children: [
                                    'HP ',
                                    _e.hp,
                                    '/',
                                    Me.hp,
                                    '・TP ',
                                    _e.tp,
                                    '/',
                                    Me.tp,
                                    tl > 0
                                      ? m.jsxs('span', {
                                          className: se.menuSp,
                                          children: ['SP ', tl],
                                        })
                                      : null,
                                  ],
                                }),
                              ],
                            },
                            _e.charId
                          );
                        }),
                        m.jsx('button', {
                          type: 'button',
                          className: se.itemClose,
                          onClick: () => v(!1),
                          children: 'とじる',
                        }),
                      ],
                    });
                  const b = Gl(K),
                    N =
                      M === 'class'
                        ? (((X = Ke[K.classId]) == null ? void 0 : X.skillTree.skills) ?? [])
                        : M === 'race'
                          ? (((F = ft[K.raceId]) == null ? void 0 : F.raceSkillTree.skills) ?? [])
                          : K.titleId
                            ? (((te = $l[K.titleId]) == null ? void 0 : te.skillTree.skills) ?? [])
                            : [];
                  return m.jsxs(m.Fragment, {
                    children: [
                      m.jsxs('div', {
                        className: se.itemTitle,
                        children: [
                          K.name,
                          '（',
                          (me = Ke[K.classId]) == null ? void 0 : me.name,
                          ' Lv',
                          K.level,
                          '）',
                          m.jsxs('span', { className: se.menuSp, children: ['SP ', Wi(K)] }),
                        ],
                      }),
                      m.jsx('div', {
                        className: se.menuStats,
                        children: [
                          ['HP', b.hp],
                          ['TP', b.tp],
                          ['STR', b.str],
                          ['VIT', b.vit],
                          ['AGI', b.agi],
                          ['INT', b.int],
                          ['MND', b.mnd],
                          ['LUC', b.luc],
                        ].map(([_e, Le]) =>
                          m.jsxs('span', { className: se.menuStat, children: [_e, ' ', Le] }, _e)
                        ),
                      }),
                      m.jsx('div', {
                        className: se.skillTabs,
                        children: ['class', 'race', 'title'].map((_e) =>
                          m.jsx(
                            'button',
                            {
                              type: 'button',
                              className: `${se.skillTab} ${M === _e ? se.skillTabOn : ''}`,
                              onClick: () => S(_e),
                              disabled: _e === 'title' && !K.titleId,
                              children: _e === 'class' ? '職業' : _e === 'race' ? '種族' : '称号',
                            },
                            _e
                          )
                        ),
                      }),
                      m.jsx(kg, {
                        nodes: N,
                        char: K,
                        onLearn: (_e) =>
                          void r((Le) => ({
                            ...Le,
                            guild: {
                              ...Le.guild,
                              members: Le.guild.members.map((Me) =>
                                Me.id === K.id ? gg(Me, _e) : Me
                              ),
                            },
                          })),
                      }),
                      m.jsx('button', {
                        type: 'button',
                        className: se.itemClose,
                        onClick: () => L(null),
                        children: '← もどる',
                      }),
                    ],
                  });
                })(),
              }),
            })
          : null,
        C
          ? m.jsx('div', {
              className: se.confirmOverlay,
              onClick: () => $(null),
              children: m.jsxs('div', {
                className: se.confirmBox,
                onClick: (K) => K.stopPropagation(),
                children: [
                  m.jsx('div', { className: se.confirmText, children: C.message }),
                  m.jsxs('div', {
                    className: se.confirmActions,
                    children: [
                      m.jsx('button', {
                        type: 'button',
                        className: se.confirmCancel,
                        onClick: () => $(null),
                        children: 'やめる',
                      }),
                      m.jsx('button', {
                        type: 'button',
                        className: se.confirmOk,
                        onClick: () => {
                          (C.onYes(), $(null));
                        },
                        children: C.okLabel,
                      }),
                    ],
                  }),
                ],
              }),
            })
          : null,
      ],
    });
  },
  qS = '_layout_1id7b_1',
  BS = '_head_1id7b_11',
  OS = '_title_1id7b_18',
  IS = '_stock_1id7b_24',
  MS = '_tabs_1id7b_29',
  DS = '_tab_1id7b_29',
  RS = '_tabActive_1id7b_46',
  zS = '_hint_1id7b_51',
  HS = '_list_1id7b_57',
  US = '_row_1id7b_65',
  $S = '_info_1id7b_76',
  GS = '_name_1id7b_82',
  YS = '_note_1id7b_87',
  XS = '_actions_1id7b_92',
  VS = '_ingot_1id7b_97',
  QS = '_recycle_1id7b_114',
  KS = '_maxed_1id7b_126',
  ZS = '_empty_1id7b_132',
  JS = '_foot_1id7b_137',
  PS = '_back_1id7b_141',
  FS = '_confirmOverlay_1id7b_151',
  WS = '_confirmBox_1id7b_162',
  e5 = '_confirmText_1id7b_174',
  t5 = '_confirmActions_1id7b_181',
  l5 = '_confirmCancel_1id7b_186',
  a5 = '_confirmOk_1id7b_187',
  $e = {
    layout: qS,
    head: BS,
    title: OS,
    stock: IS,
    tabs: MS,
    tab: DS,
    tabActive: RS,
    hint: zS,
    list: HS,
    row: US,
    info: $S,
    name: GS,
    note: YS,
    actions: XS,
    ingot: VS,
    recycle: QS,
    maxed: KS,
    empty: ZS,
    foot: JS,
    back: PS,
    confirmOverlay: FS,
    confirmBox: WS,
    confirmText: e5,
    confirmActions: t5,
    confirmCancel: l5,
    confirmOk: a5,
  },
  n5 = () => {
    const l = ml(),
      { save: i, applyAndPersist: o } = Vl(),
      [r, u] = w.useState('forge'),
      [d, f] = w.useState(null);
    if (!i) return m.jsx(cl, { to: '/title', replace: !0 });
    const { copper: h, silver: p, gold: g } = i.forgeInventory.ingots,
      y = i.forgeInventory.fragments.common ?? 0,
      v = i.guild.equipment,
      I = () => {
        d &&
          (d.kind === 'forge'
            ? o((M) => v1(M, d.instanceId, d.ingot).save)
            : o((M) => y1(M, d.id).save),
          f(null));
      },
      L = (M, S, E, x, C) =>
        m.jsxs('button', {
          type: 'button',
          className: $e.ingot,
          disabled: C <= 0,
          onClick: () => f({ kind: 'forge', instanceId: M, ingot: E, name: S, ingotLabel: x }),
          children: [x, '+', kl.INGOT_INC[E], '（', C, '）'],
        });
    return m.jsxs('div', {
      className: $e.layout,
      children: [
        m.jsxs('header', {
          className: $e.head,
          children: [
            m.jsx('h1', { className: $e.title, children: '鍛冶屋' }),
            m.jsxs('span', {
              className: $e.stock,
              children: ['銅', h, '・銀', p, '・金', g, '／断片', y],
            }),
          ],
        }),
        m.jsxs('div', {
          className: $e.tabs,
          children: [
            m.jsx('button', {
              type: 'button',
              className: `${$e.tab} ${r === 'forge' ? $e.tabActive : ''}`,
              onClick: () => u('forge'),
              children: '強化',
            }),
            m.jsx('button', {
              type: 'button',
              className: `${$e.tab} ${r === 'recycle' ? $e.tabActive : ''}`,
              onClick: () => u('recycle'),
              children: 'リサイクル',
            }),
          ],
        }),
        m.jsx('p', {
          className: $e.hint,
          children:
            r === 'forge'
              ? 'インゴットで装備を強化（最大 +5）。銅+1・銀+3・金+5。'
              : '不要な装備を断片に変換。断片10個で銅インゴット1個になる。',
        }),
        m.jsx('div', {
          className: $e.list,
          children:
            v.length === 0
              ? m.jsx('p', { className: $e.empty, children: '所有している装備がありません。' })
              : v.map((M) => {
                  const S = lt[M.masterId],
                    E = M.forgeLevel >= kl.MAX_LEVEL;
                  return m.jsxs(
                    'div',
                    {
                      className: $e.row,
                      children: [
                        m.jsxs('div', {
                          className: $e.info,
                          children: [
                            m.jsx('span', { className: $e.name, children: ya(M) }),
                            m.jsx('span', {
                              className: $e.note,
                              children: S == null ? void 0 : S.slot,
                            }),
                          ],
                        }),
                        r === 'forge'
                          ? m.jsx('div', {
                              className: $e.actions,
                              children: E
                                ? m.jsx('span', { className: $e.maxed, children: '最大強化' })
                                : m.jsxs(m.Fragment, {
                                    children: [
                                      L(M.id, ya(M), 'copper', '銅', h),
                                      L(M.id, ya(M), 'silver', '銀', p),
                                      L(M.id, ya(M), 'gold', '金', g),
                                    ],
                                  }),
                            })
                          : m.jsxs('button', {
                              type: 'button',
                              className: $e.recycle,
                              onClick: () => f({ kind: 'recycle', id: M.id, name: ya(M) }),
                              children: ['分解（断片+', kl.RECYCLE_FRAGMENTS, '）'],
                            }),
                      ],
                    },
                    M.id
                  );
                }),
        }),
        m.jsx('footer', {
          className: $e.foot,
          children: m.jsx('button', {
            type: 'button',
            className: $e.back,
            onClick: () => l('/town'),
            children: '拠点へ戻る',
          }),
        }),
        d
          ? m.jsx('div', {
              className: $e.confirmOverlay,
              onClick: () => f(null),
              children: m.jsxs('div', {
                className: $e.confirmBox,
                onClick: (M) => M.stopPropagation(),
                children: [
                  m.jsx('div', {
                    className: $e.confirmText,
                    children:
                      d.kind === 'forge'
                        ? m.jsxs(m.Fragment, {
                            children: [
                              m.jsx('strong', { children: d.name }),
                              ' を',
                              d.ingotLabel,
                              'インゴットで強化しますか？',
                            ],
                          })
                        : m.jsxs(m.Fragment, {
                            children: [
                              m.jsx('strong', { children: d.name }),
                              ' を分解しますか？（装備は失われます）',
                            ],
                          }),
                  }),
                  m.jsxs('div', {
                    className: $e.confirmActions,
                    children: [
                      m.jsx('button', {
                        type: 'button',
                        className: $e.confirmCancel,
                        onClick: () => f(null),
                        children: 'やめる',
                      }),
                      m.jsx('button', {
                        type: 'button',
                        className: $e.confirmOk,
                        onClick: I,
                        children: d.kind === 'forge' ? '強化する' : '分解する',
                      }),
                    ],
                  }),
                ],
              }),
            })
          : null,
      ],
    });
  },
  i5 = '_layout_fn0ll_2',
  s5 = '_head_fn0ll_13',
  r5 = '_title_fn0ll_20',
  o5 = '_count_fn0ll_26',
  c5 = '_create_fn0ll_31',
  u5 = '_sectionTitle_fn0ll_42',
  d5 = '_field_fn0ll_48',
  m5 = '_primary_fn0ll_64',
  _5 = '_list_fn0ll_79',
  f5 = '_empty_fn0ll_83',
  p5 = '_members_fn0ll_88',
  h5 = '_member_fn0ll_88',
  g5 = '_memberMain_fn0ll_107',
  k5 = '_memberName_fn0ll_119',
  v5 = '_pos_fn0ll_127',
  y5 = '_memberSub_fn0ll_144',
  b5 = '_posBtns_fn0ll_149',
  x5 = '_posBtn_fn0ll_149',
  S5 = '_posBtnActive_fn0ll_164',
  w5 = '_tabs_fn0ll_170',
  T5 = '_tab_fn0ll_170',
  j5 = '_tabActive_fn0ll_187',
  N5 = '_notice_fn0ll_192',
  E5 = '_filters_fn0ll_202',
  C5 = '_filter_fn0ll_202',
  A5 = '_hint_fn0ll_221',
  L5 = '_slotGroup_fn0ll_227',
  q5 = '_slotGroupLabel_fn0ll_234',
  B5 = '_slot_fn0ll_227',
  O5 = '_slotFilled_fn0ll_251',
  I5 = '_slotEmpty_fn0ll_256',
  M5 = '_slotName_fn0ll_261',
  D5 = '_slotSub_fn0ll_266',
  R5 = '_slotPlaceholder_fn0ll_271',
  z5 = '_banishBtn_fn0ll_277',
  H5 = '_overlay_fn0ll_289',
  U5 = '_panel_fn0ll_300',
  $5 = '_panelTitle_fn0ll_314',
  G5 = '_pickerList_fn0ll_319',
  Y5 = '_pickerItem_fn0ll_328',
  X5 = '_pickerItemActive_fn0ll_341',
  V5 = '_removeRow_fn0ll_346',
  Q5 = '_panelClose_fn0ll_357',
  K5 = '_confirmBox_fn0ll_366',
  Z5 = '_confirmText_fn0ll_378',
  J5 = '_confirmActions_fn0ll_384',
  P5 = '_confirmCancel_fn0ll_389',
  F5 = '_confirmOk_fn0ll_390',
  W5 = '_foot_fn0ll_411',
  ew = '_sub_fn0ll_415',
  ee = {
    layout: i5,
    head: s5,
    title: r5,
    count: o5,
    create: c5,
    sectionTitle: u5,
    field: d5,
    primary: m5,
    list: _5,
    empty: f5,
    members: p5,
    member: h5,
    memberMain: g5,
    memberName: k5,
    pos: v5,
    pos_前衛: '_pos_前衛_fn0ll_136',
    pos_後衛: '_pos_後衛_fn0ll_140',
    memberSub: y5,
    posBtns: b5,
    posBtn: x5,
    posBtnActive: S5,
    tabs: w5,
    tab: T5,
    tabActive: j5,
    notice: N5,
    filters: E5,
    filter: C5,
    hint: A5,
    slotGroup: L5,
    slotGroupLabel: q5,
    slot: B5,
    slotFilled: O5,
    slotEmpty: I5,
    slotName: M5,
    slotSub: D5,
    slotPlaceholder: R5,
    banishBtn: z5,
    overlay: H5,
    panel: U5,
    panelTitle: $5,
    pickerList: G5,
    pickerItem: Y5,
    pickerItemActive: X5,
    removeRow: V5,
    panelClose: Q5,
    confirmBox: K5,
    confirmText: Z5,
    confirmActions: J5,
    confirmCancel: P5,
    confirmOk: F5,
    foot: W5,
    sub: ew,
  };
function th(l) {
  return [...l.guild.party.front, ...l.guild.party.back].filter((i) => i !== null).length;
}
const tw = (l) => (l === 'front' ? ls : as);
function lh(l, i, o, r) {
  if (o < 0 || o >= tw(i) || (r !== null && !l.guild.members.some((f) => f.id === r))) return l;
  const u = l.guild.party.front.map((f) => (f === r ? null : f)),
    d = l.guild.party.back.map((f) => (f === r ? null : f));
  for (; u.length < ls; ) u.push(null);
  for (; d.length < as; ) d.push(null);
  return (
    i === 'front' ? (u[o] = r) : (d[o] = r),
    { ...l, guild: { ...l.guild, party: { front: u, back: d } } }
  );
}
const ah = { created: '作成順', levelDesc: 'レベルが高い順', levelAsc: 'レベルが低い順' },
  lw = [];
function nh(l, i) {
  return l.guild.party.front.includes(i)
    ? '前衛'
    : l.guild.party.back.includes(i)
      ? '後衛'
      : '控え';
}
const aw = () => {
    var K, b;
    const l = ml(),
      { save: i, applyAndPersist: o } = Vl(),
      r = Object.keys(ft),
      u = Object.keys(Ke),
      [d, f] = w.useState('roster'),
      [h, p] = w.useState(''),
      [g, y] = w.useState(r[0]),
      [v, I] = w.useState(u[0]),
      [L, M] = w.useState(!1),
      [S, E] = w.useState(null),
      [x, C] = w.useState('all'),
      [$, D] = w.useState('all'),
      [ae, Y] = w.useState('created'),
      [T, V] = w.useState(null),
      [ie, ue] = w.useState(null),
      W = (i == null ? void 0 : i.guild.members) ?? lw,
      de = w.useMemo(() => {
        let N = W;
        (x !== 'all' && (N = N.filter((F) => F.raceId === x)),
          $ !== 'all' && (N = N.filter((F) => F.classId === $)));
        const X = [...N];
        return (
          ae === 'levelDesc'
            ? X.sort((F, te) => te.level - F.level)
            : ae === 'levelAsc' && X.sort((F, te) => F.level - te.level),
          X
        );
      }, [W, x, $, ae]),
      ye = w.useCallback(async () => {
        var F, te;
        const N = h.trim() || '名もなき冒険者',
          X = ng({ raceId: g, classId: v, name: N });
        (M(!0),
          await o((me) => Tx(me, X)),
          E(
            `${N}（${(F = ft[g]) == null ? void 0 : F.name} / ${(te = Ke[v]) == null ? void 0 : te.name}）を作成しました`
          ),
          p(''),
          M(!1));
      }, [h, g, v, o]);
    if (!i) return m.jsx(cl, { to: '/title', replace: !0 });
    const xe = W.length >= Mu,
      ve = r.filter((N) => W.some((X) => X.raceId === N)),
      q = u.filter((N) => W.some((X) => X.classId === N)),
      J = ie ? W.find((N) => N.id === ie) : null,
      ne = (N, X) => (N === 'front' ? i.guild.party.front : i.guild.party.back)[X] ?? null,
      pe = (N) => {
        var X, F;
        return `${(X = ft[N.raceId]) == null ? void 0 : X.name} / ${(F = Ke[N.classId]) == null ? void 0 : F.name} / Lv${N.level}`;
      };
    return m.jsxs('div', {
      className: ee.layout,
      children: [
        m.jsxs('header', {
          className: ee.head,
          children: [
            m.jsx('h1', { className: ee.title, children: 'ギルド管理' }),
            m.jsxs('span', { className: ee.count, children: ['団員 ', W.length, ' / ', Mu] }),
          ],
        }),
        m.jsxs('div', {
          className: ee.tabs,
          children: [
            m.jsx('button', {
              type: 'button',
              className: `${ee.tab} ${d === 'roster' ? ee.tabActive : ''}`,
              onClick: () => f('roster'),
              children: '作成・一覧',
            }),
            m.jsx('button', {
              type: 'button',
              className: `${ee.tab} ${d === 'party' ? ee.tabActive : ''}`,
              onClick: () => f('party'),
              children: '編成',
            }),
            m.jsx('button', {
              type: 'button',
              className: `${ee.tab} ${d === 'banish' ? ee.tabActive : ''}`,
              onClick: () => f('banish'),
              children: '追放',
            }),
          ],
        }),
        d === 'roster'
          ? m.jsxs(m.Fragment, {
              children: [
                m.jsxs('section', {
                  className: ee.create,
                  children: [
                    m.jsx('h2', { className: ee.sectionTitle, children: '冒険者を作成' }),
                    m.jsxs('label', {
                      className: ee.field,
                      children: [
                        m.jsx('span', { children: '名前' }),
                        m.jsx('input', {
                          type: 'text',
                          value: h,
                          maxLength: 16,
                          placeholder: '名もなき冒険者',
                          onChange: (N) => p(N.target.value),
                        }),
                      ],
                    }),
                    m.jsxs('label', {
                      className: ee.field,
                      children: [
                        m.jsx('span', { children: '種族' }),
                        m.jsx('select', {
                          value: g,
                          onChange: (N) => y(N.target.value),
                          children: r.map((N) =>
                            m.jsx('option', { value: N, children: ft[N].name }, N)
                          ),
                        }),
                      ],
                    }),
                    m.jsxs('label', {
                      className: ee.field,
                      children: [
                        m.jsx('span', { children: '職業' }),
                        m.jsx('select', {
                          value: v,
                          onChange: (N) => I(N.target.value),
                          children: u.map((N) =>
                            m.jsx('option', { value: N, children: Ke[N].name }, N)
                          ),
                        }),
                      ],
                    }),
                    m.jsx('button', {
                      type: 'button',
                      className: ee.primary,
                      disabled: L || xe,
                      onClick: () => void ye(),
                      children: xe ? '団員が上限です' : '作成する',
                    }),
                    S ? m.jsx('p', { className: ee.notice, children: S }) : null,
                  ],
                }),
                m.jsxs('section', {
                  className: ee.list,
                  children: [
                    m.jsxs('h2', {
                      className: ee.sectionTitle,
                      children: [
                        '団員一覧',
                        ' ',
                        m.jsxs('span', {
                          className: ee.count,
                          children: ['（出撃 ', th(i), ' / ', Bp, '）'],
                        }),
                      ],
                    }),
                    m.jsxs('div', {
                      className: ee.filters,
                      children: [
                        m.jsxs('select', {
                          className: ee.filter,
                          value: x,
                          onChange: (N) => C(N.target.value),
                          children: [
                            m.jsx('option', { value: 'all', children: '種族: すべて' }),
                            ve.map((N) => m.jsx('option', { value: N, children: ft[N].name }, N)),
                          ],
                        }),
                        m.jsxs('select', {
                          className: ee.filter,
                          value: $,
                          onChange: (N) => D(N.target.value),
                          children: [
                            m.jsx('option', { value: 'all', children: '職業: すべて' }),
                            q.map((N) => m.jsx('option', { value: N, children: Ke[N].name }, N)),
                          ],
                        }),
                        m.jsx('select', {
                          className: ee.filter,
                          value: ae,
                          onChange: (N) => Y(N.target.value),
                          children: Object.keys(ah).map((N) =>
                            m.jsx('option', { value: N, children: ah[N] }, N)
                          ),
                        }),
                      ],
                    }),
                    W.length === 0
                      ? m.jsx('p', { className: ee.empty, children: 'まだ冒険者がいません。' })
                      : de.length === 0
                        ? m.jsx('p', {
                            className: ee.empty,
                            children: '条件に合う団員がいません。',
                          })
                        : m.jsx('ul', {
                            className: ee.members,
                            children: de.map((N) => {
                              const X = nh(i, N.id);
                              return m.jsx(
                                'li',
                                {
                                  className: ee.member,
                                  children: m.jsxs('button', {
                                    type: 'button',
                                    className: ee.memberMain,
                                    onClick: () => l(`/guild/char/${N.id}`),
                                    children: [
                                      m.jsxs('span', {
                                        className: ee.memberName,
                                        children: [
                                          N.name,
                                          m.jsx('span', {
                                            className: `${ee.pos} ${ee[`pos_${X}`] ?? ''}`,
                                            children: X,
                                          }),
                                        ],
                                      }),
                                      m.jsxs('span', {
                                        className: ee.memberSub,
                                        children: [pe(N), ' ›'],
                                      }),
                                    ],
                                  }),
                                },
                                N.id
                              );
                            }),
                          }),
                  ],
                }),
              ],
            })
          : null,
        d === 'party'
          ? m.jsxs('section', {
              className: ee.list,
              children: [
                m.jsxs('h2', {
                  className: ee.sectionTitle,
                  children: [
                    'パーティー編成',
                    ' ',
                    m.jsxs('span', {
                      className: ee.count,
                      children: ['（出撃 ', th(i), ' / ', Bp, '）'],
                    }),
                  ],
                }),
                m.jsx('p', {
                  className: ee.hint,
                  children: '枠をタップして編成する団員を選びます。',
                }),
                m.jsxs('div', {
                  className: ee.slotGroup,
                  children: [
                    m.jsx('div', { className: ee.slotGroupLabel, children: '前衛' }),
                    Array.from({ length: ls }).map((N, X) => {
                      const F = ne('front', X),
                        te = F ? W.find((me) => me.id === F) : null;
                      return m.jsx(
                        'button',
                        {
                          type: 'button',
                          className: `${ee.slot} ${te ? ee.slotFilled : ee.slotEmpty}`,
                          onClick: () => V({ row: 'front', idx: X }),
                          children: te
                            ? m.jsxs(m.Fragment, {
                                children: [
                                  m.jsx('span', { className: ee.slotName, children: te.name }),
                                  m.jsx('span', { className: ee.slotSub, children: pe(te) }),
                                ],
                              })
                            : m.jsxs('span', {
                                className: ee.slotPlaceholder,
                                children: ['＋ 前衛', X + 1, '（空き）'],
                              }),
                        },
                        `front_${X}`
                      );
                    }),
                  ],
                }),
                m.jsxs('div', {
                  className: ee.slotGroup,
                  children: [
                    m.jsx('div', {
                      className: ee.slotGroupLabel,
                      children: '後衛（近接ダメージ -30%）',
                    }),
                    Array.from({ length: as }).map((N, X) => {
                      const F = ne('back', X),
                        te = F ? W.find((me) => me.id === F) : null;
                      return m.jsx(
                        'button',
                        {
                          type: 'button',
                          className: `${ee.slot} ${te ? ee.slotFilled : ee.slotEmpty}`,
                          onClick: () => V({ row: 'back', idx: X }),
                          children: te
                            ? m.jsxs(m.Fragment, {
                                children: [
                                  m.jsx('span', { className: ee.slotName, children: te.name }),
                                  m.jsx('span', { className: ee.slotSub, children: pe(te) }),
                                ],
                              })
                            : m.jsxs('span', {
                                className: ee.slotPlaceholder,
                                children: ['＋ 後衛', X + 1, '（空き）'],
                              }),
                        },
                        `back_${X}`
                      );
                    }),
                  ],
                }),
              ],
            })
          : null,
        d === 'banish'
          ? m.jsxs('section', {
              className: ee.list,
              children: [
                m.jsx('h2', { className: ee.sectionTitle, children: '団員追放' }),
                m.jsx('p', { className: ee.hint, children: '追放した団員は元に戻せません。' }),
                W.length === 0
                  ? m.jsx('p', { className: ee.empty, children: '追放できる団員がいません。' })
                  : m.jsx('ul', {
                      className: ee.members,
                      children: W.map((N) =>
                        m.jsxs(
                          'li',
                          {
                            className: ee.member,
                            children: [
                              m.jsxs('div', {
                                className: ee.memberMain,
                                children: [
                                  m.jsx('span', { className: ee.memberName, children: N.name }),
                                  m.jsx('span', { className: ee.memberSub, children: pe(N) }),
                                ],
                              }),
                              m.jsx('button', {
                                type: 'button',
                                className: ee.banishBtn,
                                onClick: () => ue(N.id),
                                children: '追放',
                              }),
                            ],
                          },
                          N.id
                        )
                      ),
                    }),
              ],
            })
          : null,
        m.jsx('footer', {
          className: ee.foot,
          children: m.jsx('button', {
            type: 'button',
            className: ee.sub,
            onClick: () => l('/town'),
            children: '拠点へ戻る',
          }),
        }),
        T
          ? m.jsx('div', {
              className: ee.overlay,
              onClick: () => V(null),
              children: m.jsxs('div', {
                className: ee.panel,
                onClick: (N) => N.stopPropagation(),
                children: [
                  m.jsxs('div', {
                    className: ee.panelTitle,
                    children: [T.row === 'front' ? '前衛' : '後衛', T.idx + 1, ' に編成する団員'],
                  }),
                  ne(T.row, T.idx)
                    ? m.jsx('button', {
                        type: 'button',
                        className: ee.removeRow,
                        onClick: () => void o((N) => lh(N, T.row, T.idx, null)).then(() => V(null)),
                        children: 'この枠を空ける（編成から外す）',
                      })
                    : null,
                  W.length === 0
                    ? m.jsx('p', { className: ee.empty, children: '団員がいません。' })
                    : m.jsx('ul', {
                        className: ee.pickerList,
                        children: W.map((N) => {
                          const X = nh(i, N.id),
                            F = ne(T.row, T.idx) === N.id;
                          return m.jsx(
                            'li',
                            {
                              children: m.jsxs('button', {
                                type: 'button',
                                className: `${ee.pickerItem} ${F ? ee.pickerItemActive : ''}`,
                                onClick: () =>
                                  void o((te) => lh(te, T.row, T.idx, N.id)).then(() => V(null)),
                                children: [
                                  m.jsxs('span', {
                                    className: ee.memberName,
                                    children: [
                                      N.name,
                                      m.jsx('span', {
                                        className: `${ee.pos} ${ee[`pos_${X}`] ?? ''}`,
                                        children: X,
                                      }),
                                    ],
                                  }),
                                  m.jsx('span', { className: ee.memberSub, children: pe(N) }),
                                ],
                              }),
                            },
                            N.id
                          );
                        }),
                      }),
                  m.jsx('button', {
                    type: 'button',
                    className: ee.panelClose,
                    onClick: () => V(null),
                    children: 'とじる',
                  }),
                ],
              }),
            })
          : null,
        J
          ? m.jsx('div', {
              className: ee.overlay,
              onClick: () => ue(null),
              children: m.jsxs('div', {
                className: ee.confirmBox,
                onClick: (N) => N.stopPropagation(),
                children: [
                  m.jsxs('div', {
                    className: ee.confirmText,
                    children: [
                      'Lv',
                      J.level,
                      ' ',
                      J.name,
                      '（',
                      (K = ft[J.raceId]) == null ? void 0 : K.name,
                      ' ',
                      (b = Ke[J.classId]) == null ? void 0 : b.name,
                      '）を追放します。よろしいですか？',
                    ],
                  }),
                  m.jsxs('div', {
                    className: ee.confirmActions,
                    children: [
                      m.jsx('button', {
                        type: 'button',
                        className: ee.confirmCancel,
                        onClick: () => ue(null),
                        children: 'いいえ',
                      }),
                      m.jsx('button', {
                        type: 'button',
                        className: ee.confirmOk,
                        onClick: () => {
                          const N = J.id;
                          (o((X) => jx(X, N)), ue(null));
                        },
                        children: 'はい',
                      }),
                    ],
                  }),
                ],
              }),
            })
          : null,
      ],
    });
  },
  nw = '_layout_c3v63_1',
  iw = '_head_c3v63_12',
  sw = '_title_c3v63_16',
  rw = '_sub_c3v63_22',
  ow = '_card_c3v63_27',
  cw = '_h2_c3v63_35',
  uw = '_sp_c3v63_44',
  dw = '_stats_c3v63_50',
  mw = '_equipSlot_c3v63_74',
  _w = '_equipHead_c3v63_82',
  fw = '_slotLabel_c3v63_88',
  pw = '_equipName_c3v63_95',
  hw = '_smallBtn_c3v63_100',
  gw = '_equipPick_c3v63_110',
  kw = '_pickBtn_c3v63_118',
  vw = '_jobRow_c3v63_185',
  yw = '_select_c3v63_192',
  bw = '_input_c3v63_193',
  xw = '_actBtn_c3v63_203',
  Sw = '_warn_c3v63_220',
  ww = '_titleHave_c3v63_227',
  Tw = '_titleOpts_c3v63_233',
  jw = '_titleBtn_c3v63_240',
  Nw = '_rbForm_c3v63_252',
  Ew = '_danger_c3v63_258',
  Cw = '_foot_c3v63_270',
  Aw = '_back_c3v63_274',
  Lw = '_skillTabs_c3v63_284',
  qw = '_skillTab_c3v63_284',
  Bw = '_skillTabOn_c3v63_304',
  ke = {
    layout: nw,
    head: iw,
    title: sw,
    sub: rw,
    card: ow,
    h2: cw,
    sp: uw,
    stats: dw,
    equipSlot: mw,
    equipHead: _w,
    slotLabel: fw,
    equipName: pw,
    smallBtn: hw,
    equipPick: gw,
    pickBtn: kw,
    jobRow: vw,
    select: yw,
    input: bw,
    actBtn: xw,
    warn: Sw,
    titleHave: ww,
    titleOpts: Tw,
    titleBtn: jw,
    rbForm: Nw,
    danger: Ew,
    foot: Cw,
    back: Aw,
    skillTabs: Lw,
    skillTab: qw,
    skillTabOn: Bw,
  },
  xg = ['weapon', 'armor', 'accessory'];
function Sg(l, i, o) {
  return { ...l, guild: { ...l.guild, members: l.guild.members.map((r) => (r.id === i ? o : r)) } };
}
function Ow(l) {
  var i, o;
  return (o = (i = Ke[l]) == null ? void 0 : i.skillTree.skills[0]) == null ? void 0 : o.skillId;
}
function Iw(l) {
  var i;
  return new Set(
    (((i = ft[l]) == null ? void 0 : i.raceSkillTree.skills) ?? []).map((o) => o.skillId)
  );
}
const Mw = (l, i) => {
  const o = { ...l };
  let r = 0;
  for (const [u, d] of Object.entries(i)) r += ns(o, u) * d;
  return r;
};
function Dw(l, i) {
  if (!Ke[i]) return l;
  const o = Iw(l.raceId);
  let r = {};
  for (const [g, y] of Object.entries(l.learnedSkills)) o.has(g) && (r[g] = y);
  const u = Ow(i);
  u && !r[u] && (r[u] = 1);
  const d = Math.max(1, l.level - Ch),
    f = Rr(d),
    h = { ...l, classId: i, titleId: null, learnedSkills: r };
  let p = Mw(h, r) - (u && r[u] ? ns(h, u) : 0);
  return (
    p > f && ((r = u ? { [u]: 1 } : {}), (p = 0)),
    {
      ...l,
      classId: i,
      titleId: null,
      level: d,
      exp: 0,
      learnedSkills: r,
      skillPoints: { total: f, spent: p },
    }
  );
}
function Rw(l, i, o) {
  const r = l.guild.members.find((f) => f.id === i);
  if (!r) return l;
  let u = Sg(l, i, Dw(r, o));
  const d = u.guild.members.find((f) => f.id === i);
  for (const f of xg) {
    const h = d.equipment[f];
    h && !cd(d, h.masterId) && (u = ud(u, i, f));
  }
  return u;
}
const zw = [
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
function Hw(l) {
  const i = zw.find((o) => l >= o.min && l <= o.max);
  return i ? { allStats: i.allStats, bonusSp: i.bonusSp } : null;
}
function wg(l) {
  return l.level >= Vi.REBIRTH_MIN_LEVEL;
}
function Uw(l, i) {
  const o = Hw(l.level);
  if (!o) return l;
  const r = Math.min(30, Math.floor(l.level / 2)),
    u = ng({ ...i, id: l.id }),
    d = Rr(r) + o.bonusSp;
  return {
    ...u,
    level: Math.max(1, r),
    exp: 0,
    rebirthBonus: o,
    skillPoints: { total: d, spent: u.skillPoints.spent },
  };
}
function $w(l, i, o) {
  const r = l.guild.members.find((f) => f.id === i);
  if (!r || !wg(r)) return l;
  let u = l;
  for (const f of xg) r.equipment[f] && (u = ud(u, i, f));
  const d = u.guild.members.find((f) => f.id === i);
  return Sg(u, i, Uw(d, o));
}
function Tg(l, i, o) {
  var u;
  return o < Vi.TITLE_DEPTH || l.titleId
    ? !1
    : (((u = Ke[l.classId]) == null ? void 0 : u.titleOptions) ?? []).includes(i);
}
function Gw(l, i, o) {
  return Tg(l, i, o)
    ? { ...l, titleId: i, skillPoints: { ...l.skillPoints, total: l.skillPoints.total + r1 } }
    : l;
}
const ih = Object.keys(ft),
  Lr = Object.keys(Ke),
  Yw = ['weapon', 'armor', 'accessory'],
  Xw = { weapon: '武器', armor: '防具', accessory: '装飾' },
  Vw = [
    { key: 'hp', label: 'HP' },
    { key: 'tp', label: 'TP' },
    { key: 'str', label: 'STR' },
    { key: 'vit', label: 'VIT' },
    { key: 'agi', label: 'AGI' },
    { key: 'int', label: 'INT' },
    { key: 'mnd', label: 'MND' },
    { key: 'luc', label: 'LUC' },
  ],
  Qw = () => {
    var Y, T, V, ie, ue, W, de, ye, xe, ve;
    const l = ml(),
      { id: i } = Hy(),
      { save: o, applyAndPersist: r } = Vl(),
      [u, d] = w.useState('class'),
      [f, h] = w.useState(Lr[0]),
      [p, g] = w.useState(''),
      [y, v] = w.useState(ih[0]),
      [I, L] = w.useState(Lr[0]),
      [M, S] = w.useState(!1);
    if (!o) return m.jsx(cl, { to: '/title', replace: !0 });
    const E = o.guild.members.find((q) => q.id === i);
    if (!E || !i) return m.jsx(cl, { to: '/guild', replace: !0 });
    const x = Gl(E),
      C = Wi(E),
      $ = o.towerState.record.deepestReached,
      D = (q) =>
        r((J) => ({
          ...J,
          guild: { ...J.guild, members: J.guild.members.map((ne) => (ne.id === i ? q(ne) : ne)) },
        }));
    return m.jsxs('div', {
      className: ke.layout,
      children: [
        m.jsxs('header', {
          className: ke.head,
          children: [
            m.jsx('h1', { className: ke.title, children: E.name }),
            m.jsxs('span', {
              className: ke.sub,
              children: [
                (Y = ft[E.raceId]) == null ? void 0 : Y.name,
                ' / ',
                (T = Ke[E.classId]) == null ? void 0 : T.name,
                ' / Lv',
                E.level,
              ],
            }),
          ],
        }),
        m.jsxs('section', {
          className: ke.card,
          children: [
            m.jsx('h2', { className: ke.h2, children: 'ステータス' }),
            m.jsx('dl', {
              className: ke.stats,
              children: Vw.map((q) =>
                m.jsxs(
                  'div',
                  {
                    children: [
                      m.jsx('dt', { children: q.label }),
                      m.jsx('dd', { children: x[q.key] }),
                    ],
                  },
                  q.key
                )
              ),
            }),
          ],
        }),
        m.jsxs('section', {
          className: ke.card,
          children: [
            m.jsx('h2', { className: ke.h2, children: '装備' }),
            Yw.map((q) => {
              const J = E.equipment[q],
                ne = o.guild.equipment.filter((pe) => {
                  var K;
                  return (
                    ((K = lt[pe.masterId]) == null ? void 0 : K.slot) === q && cd(E, pe.masterId)
                  );
                });
              return m.jsxs(
                'div',
                {
                  className: ke.equipSlot,
                  children: [
                    m.jsxs('div', {
                      className: ke.equipHead,
                      children: [
                        m.jsx('span', { className: ke.slotLabel, children: Xw[q] }),
                        m.jsx('span', {
                          className: ke.equipName,
                          children: J ? ya(J) : '（なし）',
                        }),
                        J
                          ? m.jsx('button', {
                              type: 'button',
                              className: ke.smallBtn,
                              onClick: () => void ae(q),
                              children: '外す',
                            })
                          : null,
                      ],
                    }),
                    ne.length > 0
                      ? m.jsx('div', {
                          className: ke.equipPick,
                          children: ne.map((pe) =>
                            m.jsxs(
                              'button',
                              {
                                type: 'button',
                                className: ke.pickBtn,
                                onClick: () => void r((K) => S1(K, i, pe.id)),
                                children: [ya(pe), ' 装備'],
                              },
                              pe.id
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
          className: ke.card,
          children: [
            m.jsxs('h2', {
              className: ke.h2,
              children: ['スキル ', m.jsxs('span', { className: ke.sp, children: ['SP ', C] })],
            }),
            m.jsxs('div', {
              className: ke.skillTabs,
              children: [
                m.jsxs('button', {
                  type: 'button',
                  className: `${ke.skillTab} ${u === 'class' ? ke.skillTabOn : ''}`,
                  onClick: () => d('class'),
                  children: ['職業（', ((V = Ke[E.classId]) == null ? void 0 : V.name) ?? '', '）'],
                }),
                m.jsxs('button', {
                  type: 'button',
                  className: `${ke.skillTab} ${u === 'race' ? ke.skillTabOn : ''}`,
                  onClick: () => d('race'),
                  children: [
                    '種族（',
                    ((ie = ft[E.raceId]) == null ? void 0 : ie.name) ?? '',
                    '）',
                  ],
                }),
                E.titleId
                  ? m.jsxs('button', {
                      type: 'button',
                      className: `${ke.skillTab} ${u === 'title' ? ke.skillTabOn : ''}`,
                      onClick: () => d('title'),
                      children: [
                        '称号（',
                        ((ue = $l[E.titleId]) == null ? void 0 : ue.name) ?? '',
                        '）',
                      ],
                    })
                  : null,
              ],
            }),
            m.jsx(kg, {
              nodes:
                u === 'class'
                  ? (((W = Ke[E.classId]) == null ? void 0 : W.skillTree.skills) ?? [])
                  : u === 'race'
                    ? (((de = ft[E.raceId]) == null ? void 0 : de.raceSkillTree.skills) ?? [])
                    : E.titleId
                      ? (((ye = $l[E.titleId]) == null ? void 0 : ye.skillTree.skills) ?? [])
                      : [],
              char: E,
              onLearn: (q) => void D((J) => gg(J, q)),
            }),
          ],
        }),
        m.jsxs('section', {
          className: ke.card,
          children: [
            m.jsx('h2', { className: ke.h2, children: '転職' }),
            m.jsxs('div', {
              className: ke.jobRow,
              children: [
                m.jsx('select', {
                  className: ke.select,
                  value: f,
                  onChange: (q) => h(q.target.value),
                  children: Lr.map((q) => m.jsx('option', { value: q, children: Ke[q].name }, q)),
                }),
                m.jsx('button', {
                  type: 'button',
                  className: ke.actBtn,
                  disabled: f === E.classId,
                  onClick: () => void r((q) => Rw(q, i, f)),
                  children: '転職する',
                }),
              ],
            }),
            m.jsxs('p', {
              className: ke.warn,
              children: [
                '※ レベルが ',
                Ch,
                ' ',
                '下がり、職業/称号スキルは振り直しになります（種族スキルは保持）。',
              ],
            }),
            m.jsx('h2', { className: ke.h2, children: '称号' }),
            E.titleId
              ? m.jsxs('p', {
                  className: ke.titleHave,
                  children: ['習得済み: ', (xe = $l[E.titleId]) == null ? void 0 : xe.name],
                })
              : $ < Vi.TITLE_DEPTH
                ? m.jsxs('p', {
                    className: ke.warn,
                    children: ['第 ', Vi.TITLE_DEPTH, ' 階到達で習得できます（現在 ', $, 'F）。'],
                  })
                : m.jsx('div', {
                    className: ke.titleOpts,
                    children: (((ve = Ke[E.classId]) == null ? void 0 : ve.titleOptions) ?? []).map(
                      (q) => {
                        var J;
                        return m.jsxs(
                          'button',
                          {
                            type: 'button',
                            className: ke.titleBtn,
                            disabled: !Tg(E, q, $),
                            onClick: () => void D((ne) => Gw(ne, q, $)),
                            children: [(J = $l[q]) == null ? void 0 : J.name, '（SP+5）'],
                          },
                          q
                        );
                      }
                    ),
                  }),
            m.jsx('h2', { className: ke.h2, children: '転生' }),
            wg(E)
              ? M
                ? m.jsxs('div', {
                    className: ke.rbForm,
                    children: [
                      m.jsxs('p', {
                        className: ke.warn,
                        children: [
                          '※ 作り直して強い新人になります（開始Lv ',
                          Math.min(30, Math.floor(E.level / 2)),
                          '・ボーナス付き）。',
                        ],
                      }),
                      m.jsx('input', {
                        className: ke.input,
                        type: 'text',
                        maxLength: 16,
                        placeholder: E.name,
                        value: p,
                        onChange: (q) => g(q.target.value),
                      }),
                      m.jsxs('div', {
                        className: ke.jobRow,
                        children: [
                          m.jsx('select', {
                            className: ke.select,
                            value: y,
                            onChange: (q) => v(q.target.value),
                            children: ih.map((q) =>
                              m.jsx('option', { value: q, children: ft[q].name }, q)
                            ),
                          }),
                          m.jsx('select', {
                            className: ke.select,
                            value: I,
                            onChange: (q) => L(q.target.value),
                            children: Lr.map((q) =>
                              m.jsx('option', { value: q, children: Ke[q].name }, q)
                            ),
                          }),
                        ],
                      }),
                      m.jsxs('div', {
                        className: ke.jobRow,
                        children: [
                          m.jsx('button', {
                            type: 'button',
                            className: ke.danger,
                            onClick: () => {
                              (r((q) =>
                                $w(q, i, { raceId: y, classId: I, name: p.trim() || E.name })
                              ),
                                S(!1));
                            },
                            children: '転生を実行',
                          }),
                          m.jsx('button', {
                            type: 'button',
                            className: ke.actBtn,
                            onClick: () => S(!1),
                            children: 'やめる',
                          }),
                        ],
                      }),
                    ],
                  })
                : m.jsx('button', {
                    type: 'button',
                    className: ke.actBtn,
                    onClick: () => S(!0),
                    children: '転生する…',
                  })
              : m.jsxs('p', {
                  className: ke.warn,
                  children: [
                    'Lv',
                    Vi.REBIRTH_MIN_LEVEL,
                    ' 以上で転生できます（現在 Lv',
                    E.level,
                    '）。',
                  ],
                }),
          ],
        }),
        m.jsx('footer', {
          className: ke.foot,
          children: m.jsx('button', {
            type: 'button',
            className: ke.back,
            onClick: () => l('/guild'),
            children: 'もどる',
          }),
        }),
      ],
    });
    function ae(q) {
      return r((J) => ud(J, i, q));
    }
  },
  Kw = () => m.jsx('div', { children: m.jsx('h1', { children: 'Not Found' }) }),
  Zw = '_layout_j9gth_1',
  Jw = '_head_j9gth_11',
  Pw = '_title_j9gth_18',
  Fw = '_gold_j9gth_24',
  Ww = '_tabs_j9gth_29',
  eT = '_tab_j9gth_29',
  tT = '_tabActive_j9gth_46',
  lT = '_controls_j9gth_51',
  aT = '_filters_j9gth_58',
  nT = '_chip_j9gth_64',
  iT = '_chipActive_j9gth_75',
  sT = '_sortRow_j9gth_81',
  rT = '_sortLabel_j9gth_87',
  oT = '_sort_j9gth_81',
  cT = '_list_j9gth_105',
  uT = '_row_j9gth_113',
  dT = '_info_j9gth_124',
  mT = '_name_j9gth_130',
  _T = '_note_j9gth_135',
  fT = '_action_j9gth_140',
  pT = '_empty_j9gth_157',
  hT = '_foot_j9gth_162',
  gT = '_back_j9gth_166',
  kT = '_confirmOverlay_j9gth_176',
  vT = '_confirmBox_j9gth_187',
  yT = '_confirmText_j9gth_199',
  bT = '_confirmActions_j9gth_206',
  xT = '_confirmCancel_j9gth_211',
  ST = '_confirmOk_j9gth_212',
  Te = {
    layout: Zw,
    head: Jw,
    title: Pw,
    gold: Fw,
    tabs: Ww,
    tab: eT,
    tabActive: tT,
    controls: lT,
    filters: aT,
    chip: nT,
    chipActive: iT,
    sortRow: sT,
    sortLabel: rT,
    sort: oT,
    list: cT,
    row: uT,
    info: dT,
    name: mT,
    note: _T,
    action: fT,
    empty: pT,
    foot: hT,
    back: gT,
    confirmOverlay: kT,
    confirmBox: vT,
    confirmText: yT,
    confirmActions: bT,
    confirmCancel: xT,
    confirmOk: ST,
  };
function wT(l) {
  return Math.max(0, Math.floor(l.towerState.record.deepestReached / 10));
}
const jg = {
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
  TT = (l, i = 1) => {
    const o = Ih(l, i),
      r = [];
    return (
      o.atk && r.push(`ATK+${o.atk}`),
      o.mat && r.push(`MAT+${o.mat}`),
      o.def && r.push(`DEF+${o.def}`),
      o.mdf && r.push(`MDF+${o.mdf}`),
      r.join(' ')
    );
  };
function Ng(l, i) {
  var o;
  return ((o = l.shopStock.unlockedGrades) == null ? void 0 : o[i]) ?? 1;
}
function jT(l) {
  const i = wT(l),
    o = new Set(l.shopStock.unlockedItemIds),
    r = Object.values(We)
      .filter((d) => d.buyPrice > 0)
      .map((d) => ({ id: d.id, name: d.name, price: d.buyPrice, kind: 'item' }));
  return [
    ...Object.values(lt)
      .filter((d) => d.tier <= i || o.has(d.id))
      .map((d) => {
        const f = Ng(l, d.id);
        return {
          id: d.id,
          name: f > 1 ? `${d.name} Lv${f}` : d.name,
          price: Math.round(d.buyPrice * Un(f)),
          kind: 'equip',
          note: TT(d.id, f),
        };
      }),
    ...r,
  ];
}
function NT(l) {
  return jg[l] ?? [];
}
function ET(l, i = 1) {
  return We[l] ? We[l].buyPrice : lt[l] ? Math.round(lt[l].buyPrice * Un(i)) : null;
}
function Ku(l, i = 1) {
  return We[l]
    ? Math.round(n1(We[l]) * Un(i))
    : lt[l]
      ? Math.floor((lt[l].buyPrice * Un(i)) / 2)
      : 0;
}
function CT(l, i) {
  const o = lt[i] ? Ng(l, i) : 1,
    r = ET(i, o);
  if (r === null || r <= 0 || l.guild.gold < r) return l;
  const u = lt[i] ? x1(l, i, 0, o) : sd(l, i, 1);
  return { ...u, guild: { ...u.guild, gold: u.guild.gold - r } };
}
function Eg(l) {
  var o;
  const i = (((o = lt[l.masterId]) == null ? void 0 : o.buyPrice) ?? 0) * Un(l.grade);
  return Math.floor(i / 2) + l.forgeLevel * 10;
}
function AT(l, i) {
  const o = l.guild.equipment.find((d) => d.id === i);
  if (!o) return l;
  const r = Eg(o),
    u = l.guild.equipment.filter((d) => d.id !== i);
  return { ...l, guild: { ...l.guild, equipment: u, gold: l.guild.gold + r } };
}
function LT(l, i, o = 1, r = 1) {
  if (
    l.guild.storage
      .filter((y) => y.itemId === i && (y.grade ?? 1) === r)
      .reduce((y, v) => y + v.qty, 0) < o
  )
    return l;
  const d = Ku(i, r) * o,
    f = rd(l, i, o, r),
    h = NT(i),
    p = [
      ...f.shopStock.unlockedItemIds,
      ...h.filter((y) => !f.shopStock.unlockedItemIds.includes(y)),
    ],
    g = { ...(f.shopStock.unlockedGrades ?? {}) };
  for (const y of h) g[y] = Math.max(g[y] ?? 1, r);
  return {
    ...f,
    guild: { ...f.guild, gold: f.guild.gold + d },
    shopStock: { ...f.shopStock, unlockedItemIds: p, unlockedGrades: g },
  };
}
const sh = {
    weapon: '武器',
    armor: '防具',
    accessory: '装飾品',
    item: 'アイテム',
    material: '素材',
  },
  qT = ['weapon', 'armor', 'accessory', 'item', 'material'],
  rh = { priceDesc: '金額が高い順', priceAsc: '金額が安い順', qtyDesc: '所持数が多い順' },
  oh = (l) => {
    var o;
    const i = (o = We[l]) == null ? void 0 : o.category;
    return i === 'material' || i === 'drop' ? 'material' : 'item';
  },
  BT = () => {
    const l = ml(),
      { save: i, applyAndPersist: o } = Vl(),
      [r, u] = w.useState('buy'),
      [d, f] = w.useState(null),
      [h, p] = w.useState('all'),
      [g, y] = w.useState('priceAsc');
    if (!i) return m.jsx(cl, { to: '/title', replace: !0 });
    const v = i.guild.gold,
      I = (T, V = 1) => {
        var ue, W;
        const ie =
          ((ue = We[T]) == null ? void 0 : ue.name) ?? ((W = lt[T]) == null ? void 0 : W.name) ?? T;
        return V > 1 ? `${ie} Lv${V}` : ie;
      },
      L = jT(i).map((T) => {
        var V;
        return {
          key: T.id,
          entry: T,
          category:
            T.kind === 'equip' ? (((V = lt[T.id]) == null ? void 0 : V.slot) ?? 'item') : oh(T.id),
          price: T.price,
          qty:
            T.kind === 'equip'
              ? i.guild.equipment.filter((ie) => ie.masterId === T.id).length
              : id(i, T.id),
        };
      }),
      M = [
        ...i.guild.equipment.map((T) => {
          var V;
          return {
            key: `eq_${T.id}`,
            kind: 'equip',
            inst: T,
            name: ya(T),
            price: Eg(T),
            category: ((V = lt[T.masterId]) == null ? void 0 : V.slot) ?? 'item',
            qty: 1,
          };
        }),
        ...i.guild.storage
          .filter((T) => Ku(T.itemId, T.grade ?? 1) > 0)
          .map((T) => ({
            key: `it_${T.itemId}_${T.grade ?? 1}`,
            kind: 'item',
            itemId: T.itemId,
            grade: T.grade ?? 1,
            name: I(T.itemId, T.grade ?? 1),
            price: Ku(T.itemId, T.grade ?? 1),
            category: oh(T.itemId),
            qty: T.qty,
          })),
      ],
      S = r === 'buy' ? L : M,
      E = qT.filter((T) => S.some((V) => V.category === T)),
      x = h !== 'all' && !E.includes(h) ? 'all' : h;
    function C(T) {
      return [...(x === 'all' ? T : T.filter((ie) => ie.category === x))].sort((ie, ue) =>
        g === 'priceAsc'
          ? ie.price - ue.price
          : g === 'qtyDesc'
            ? ue.qty - ie.qty
            : ue.price - ie.price
      );
    }
    const $ = (T) => {
        (u(T), p('all'));
      },
      D = () => {
        d &&
          (d.kind === 'buy'
            ? o((T) => CT(T, d.id))
            : d.kind === 'sellItem'
              ? o((T) => LT(T, d.itemId, 1, d.grade))
              : o((T) => AT(T, d.id)),
          f(null));
      },
      ae = C(L),
      Y = C(M);
    return m.jsxs('div', {
      className: Te.layout,
      children: [
        m.jsxs('header', {
          className: Te.head,
          children: [
            m.jsx('h1', { className: Te.title, children: 'ショップ' }),
            m.jsxs('span', { className: Te.gold, children: [v, ' G'] }),
          ],
        }),
        m.jsxs('div', {
          className: Te.tabs,
          children: [
            m.jsx('button', {
              type: 'button',
              className: `${Te.tab} ${r === 'buy' ? Te.tabActive : ''}`,
              onClick: () => $('buy'),
              children: '買う',
            }),
            m.jsx('button', {
              type: 'button',
              className: `${Te.tab} ${r === 'sell' ? Te.tabActive : ''}`,
              onClick: () => $('sell'),
              children: '売る',
            }),
          ],
        }),
        m.jsxs('div', {
          className: Te.controls,
          children: [
            m.jsxs('div', {
              className: Te.filters,
              children: [
                m.jsx('button', {
                  type: 'button',
                  className: `${Te.chip} ${x === 'all' ? Te.chipActive : ''}`,
                  onClick: () => p('all'),
                  children: 'すべて',
                }),
                E.map((T) =>
                  m.jsx(
                    'button',
                    {
                      type: 'button',
                      className: `${Te.chip} ${x === T ? Te.chipActive : ''}`,
                      onClick: () => p(T),
                      children: sh[T],
                    },
                    T
                  )
                ),
              ],
            }),
            m.jsxs('label', {
              className: Te.sortRow,
              children: [
                m.jsx('span', { className: Te.sortLabel, children: '並び替え' }),
                m.jsx('select', {
                  className: Te.sort,
                  value: g,
                  onChange: (T) => y(T.target.value),
                  children: Object.keys(rh).map((T) =>
                    m.jsx('option', { value: T, children: rh[T] }, T)
                  ),
                }),
              ],
            }),
          ],
        }),
        m.jsx('div', {
          className: Te.list,
          children:
            r === 'buy'
              ? ae.length === 0
                ? m.jsx('p', { className: Te.empty, children: '該当する商品がありません。' })
                : ae.map(({ entry: T, qty: V }) =>
                    m.jsxs(
                      'div',
                      {
                        className: Te.row,
                        children: [
                          m.jsxs('div', {
                            className: Te.info,
                            children: [
                              m.jsx('span', { className: Te.name, children: T.name }),
                              m.jsxs('span', {
                                className: Te.note,
                                children: [T.note ? `${T.note} ・ ` : '', '所持 ', V],
                              }),
                            ],
                          }),
                          m.jsxs('button', {
                            type: 'button',
                            className: Te.action,
                            disabled: v < T.price,
                            onClick: () =>
                              f({ kind: 'buy', id: T.id, name: T.name, price: T.price }),
                            children: [T.price, ' G'],
                          }),
                        ],
                      },
                      T.id
                    )
                  )
              : Y.length === 0
                ? m.jsx('p', { className: Te.empty, children: '売れる物がありません。' })
                : Y.map((T) =>
                    m.jsxs(
                      'div',
                      {
                        className: Te.row,
                        children: [
                          m.jsxs('div', {
                            className: Te.info,
                            children: [
                              m.jsx('span', { className: Te.name, children: T.name }),
                              m.jsxs('span', {
                                className: Te.note,
                                children: [
                                  sh[T.category],
                                  T.kind === 'item' ? ` ・ 所持 ${T.qty}` : '',
                                ],
                              }),
                            ],
                          }),
                          m.jsxs('button', {
                            type: 'button',
                            className: Te.action,
                            onClick: () =>
                              f(
                                T.kind === 'equip'
                                  ? {
                                      kind: 'sellEquip',
                                      id: T.inst.id,
                                      name: T.name,
                                      price: T.price,
                                    }
                                  : {
                                      kind: 'sellItem',
                                      itemId: T.itemId,
                                      grade: T.grade,
                                      name: T.name,
                                      price: T.price,
                                    }
                              ),
                            children: ['売却 ', T.price, ' G'],
                          }),
                        ],
                      },
                      T.key
                    )
                  ),
        }),
        m.jsx('footer', {
          className: Te.foot,
          children: m.jsx('button', {
            type: 'button',
            className: Te.back,
            onClick: () => l('/town'),
            children: '拠点へ戻る',
          }),
        }),
        d
          ? m.jsx('div', {
              className: Te.confirmOverlay,
              onClick: () => f(null),
              children: m.jsxs('div', {
                className: Te.confirmBox,
                onClick: (T) => T.stopPropagation(),
                children: [
                  m.jsx('div', {
                    className: Te.confirmText,
                    children:
                      d.kind === 'buy'
                        ? m.jsxs(m.Fragment, {
                            children: [
                              m.jsx('strong', { children: d.name }),
                              ' を ',
                              d.price,
                              ' G で購入しますか？',
                            ],
                          })
                        : m.jsxs(m.Fragment, {
                            children: [
                              m.jsx('strong', { children: d.name }),
                              ' を ',
                              d.price,
                              ' G で売却しますか？',
                            ],
                          }),
                  }),
                  m.jsxs('div', {
                    className: Te.confirmActions,
                    children: [
                      m.jsx('button', {
                        type: 'button',
                        className: Te.confirmCancel,
                        onClick: () => f(null),
                        children: 'やめる',
                      }),
                      m.jsx('button', {
                        type: 'button',
                        className: Te.confirmOk,
                        onClick: D,
                        children: d.kind === 'buy' ? '購入する' : '売却する',
                      }),
                    ],
                  }),
                ],
              }),
            })
          : null,
      ],
    });
  },
  OT = '_layout_1xkiw_1',
  IT = '_head_1xkiw_12',
  MT = '_title_1xkiw_17',
  DT = '_subtitle_1xkiw_24',
  RT = '_body_1xkiw_30',
  zT = '_menu_1xkiw_34',
  HT = '_loading_1xkiw_40',
  UT = '_warn_1xkiw_45',
  $T = '_danger_1xkiw_52',
  GT = '_dialog_1xkiw_67',
  YT = '_dialogTitle_1xkiw_77',
  XT = '_field_1xkiw_82',
  VT = '_note_1xkiw_96',
  QT = '_dialogActions_1xkiw_102',
  KT = '_primary_1xkiw_107',
  ZT = '_sub_1xkiw_24',
  JT = '_foot_1xkiw_132',
  Fe = {
    layout: OT,
    head: IT,
    title: MT,
    subtitle: DT,
    body: RT,
    menu: zT,
    loading: HT,
    warn: UT,
    danger: $T,
    dialog: GT,
    dialogTitle: YT,
    field: XT,
    note: VT,
    dialogActions: QT,
    primary: KT,
    sub: ZT,
    foot: JT,
  },
  PT = '_card_3vsn6_1',
  FT = '_corrupted_3vsn6_14',
  WT = '_corruptedText_3vsn6_19',
  e4 = '_corruptedNote_3vsn6_25',
  t4 = '_guildName_3vsn6_31',
  l4 = '_meta_3vsn6_36',
  va = {
    card: PT,
    corrupted: FT,
    corruptedText: WT,
    corruptedNote: e4,
    guildName: t4,
    meta: l4,
    continue: '_continue_3vsn6_56',
  },
  a4 = (l) => {
    if (!l) return '-';
    const i = new Date(l),
      o = (r) => String(r).padStart(2, '0');
    return `${i.getFullYear()}/${o(i.getMonth() + 1)}/${o(i.getDate())} ${o(i.getHours())}:${o(i.getMinutes())}`;
  },
  n4 = ({ meta: l, onContinue: i }) =>
    l.corrupted
      ? m.jsxs('div', {
          className: `${va.card} ${va.corrupted}`,
          children: [
            m.jsx('div', { className: va.corruptedText, children: 'セーブデータが破損しています' }),
            m.jsx('p', {
              className: va.corruptedNote,
              children: '「最初から」で新しく始められます。',
            }),
          ],
        })
      : m.jsxs('div', {
          className: va.card,
          children: [
            m.jsx('div', { className: va.guildName, children: l.guildName }),
            m.jsxs('dl', {
              className: va.meta,
              children: [
                m.jsxs('div', {
                  children: [
                    m.jsx('dt', { children: '最高到達階' }),
                    m.jsx('dd', {
                      children: l.deepestReached > 0 ? `${l.deepestReached}F` : '未踏破',
                    }),
                  ],
                }),
                m.jsxs('div', {
                  children: [
                    m.jsx('dt', { children: '団員' }),
                    m.jsxs('dd', { children: [l.memberCount, '人'] }),
                  ],
                }),
                m.jsxs('div', {
                  children: [
                    m.jsx('dt', { children: '最終セーブ' }),
                    m.jsx('dd', { children: a4(l.savedAt) }),
                  ],
                }),
              ],
            }),
            m.jsx('button', {
              type: 'button',
              className: va.continue,
              onClick: i,
              children: 'つづきから',
            }),
          ],
        }),
  i4 = () => {
    const l = ml(),
      { startNewGame: i, continueGame: o } = Vl(),
      [r, u] = w.useState(null),
      [d, f] = w.useState(!0),
      [h, p] = w.useState('menu'),
      [g, y] = w.useState(''),
      [v, I] = w.useState(!1);
    w.useEffect(() => {
      (async () => (u(await Kx()), f(!1)))();
    }, []);
    const L = r !== null && !r.corrupted,
      M = w.useCallback(async () => {
        I(!0);
        const x = await o();
        (I(!1), x.ok && l('/town'));
      }, [o, l]),
      S = w.useCallback(() => {
        (y(''), p(L ? 'confirm' : 'guildName'));
      }, [L]),
      E = w.useCallback(async () => {
        const x = g.trim() || 'ななしのギルド';
        (I(!0), await i(x), I(!1), l('/town'));
      }, [g, i, l]);
    return m.jsxs('div', {
      className: Fe.layout,
      children: [
        m.jsxs('header', {
          className: Fe.head,
          children: [
            m.jsx('h1', { className: Fe.title, children: '世界樹ライク' }),
            m.jsx('p', { className: Fe.subtitle, children: '無限タワー探索 RPG' }),
          ],
        }),
        m.jsx('main', {
          className: Fe.body,
          children: d
            ? m.jsx('p', { className: Fe.loading, children: '読み込み中...' })
            : h === 'guildName'
              ? m.jsxs('div', {
                  className: Fe.dialog,
                  children: [
                    m.jsx('h2', { className: Fe.dialogTitle, children: '新しいギルド' }),
                    m.jsxs('label', {
                      className: Fe.field,
                      children: [
                        m.jsx('span', { children: 'ギルド名' }),
                        m.jsx('input', {
                          type: 'text',
                          value: g,
                          maxLength: 16,
                          placeholder: 'ななしのギルド',
                          onChange: (x) => y(x.target.value),
                          autoFocus: !0,
                        }),
                      ],
                    }),
                    m.jsx('p', {
                      className: Fe.note,
                      children:
                        '冒険者はまだいません。開始後、ギルドメニューで仲間を作成してください。',
                    }),
                    m.jsxs('div', {
                      className: Fe.dialogActions,
                      children: [
                        m.jsx('button', {
                          type: 'button',
                          className: Fe.primary,
                          disabled: v,
                          onClick: E,
                          children: 'はじめる',
                        }),
                        m.jsx('button', {
                          type: 'button',
                          className: Fe.sub,
                          disabled: v,
                          onClick: () => p('menu'),
                          children: 'もどる',
                        }),
                      ],
                    }),
                  ],
                })
              : h === 'confirm'
                ? m.jsxs('div', {
                    className: Fe.dialog,
                    children: [
                      m.jsx('h2', { className: Fe.dialogTitle, children: '最初から始めますか？' }),
                      m.jsxs('p', {
                        className: Fe.warn,
                        children: [
                          '現在のセーブデータ「',
                          r == null ? void 0 : r.guildName,
                          '」は上書きされ、元に戻せません。',
                        ],
                      }),
                      m.jsxs('div', {
                        className: Fe.dialogActions,
                        children: [
                          m.jsx('button', {
                            type: 'button',
                            className: Fe.danger,
                            disabled: v,
                            onClick: () => p('guildName'),
                            children: 'データを消して始める',
                          }),
                          m.jsx('button', {
                            type: 'button',
                            className: Fe.sub,
                            disabled: v,
                            onClick: () => p('menu'),
                            children: 'もどる',
                          }),
                        ],
                      }),
                    ],
                  })
                : m.jsxs('div', {
                    className: Fe.menu,
                    children: [
                      r !== null && m.jsx(n4, { meta: r, onContinue: () => void M() }),
                      m.jsx('button', {
                        type: 'button',
                        className: L ? Fe.sub : Fe.primary,
                        onClick: S,
                        children: '最初から',
                      }),
                    ],
                  }),
        }),
        m.jsxs('footer', { className: Fe.foot, children: ['v', '0.1.36'] }),
      ],
    });
  },
  s4 = '_layout_uxqv8_1',
  r4 = '_head_uxqv8_12',
  o4 = '_guildName_uxqv8_16',
  c4 = '_stats_uxqv8_21',
  u4 = '_hint_uxqv8_40',
  d4 = '_menu_uxqv8_50',
  m4 = '_foot_uxqv8_57',
  _4 = '_exit_uxqv8_61',
  f4 = '_warpOverlay_uxqv8_72',
  p4 = '_warpPanel_uxqv8_83',
  h4 = '_warpTitle_uxqv8_94',
  g4 = '_warpBtn_uxqv8_99',
  k4 = '_warpClose_uxqv8_110',
  Ht = {
    layout: s4,
    head: r4,
    guildName: o4,
    stats: c4,
    hint: u4,
    menu: d4,
    foot: m4,
    exit: _4,
    warpOverlay: f4,
    warpPanel: p4,
    warpTitle: h4,
    warpBtn: g4,
    warpClose: k4,
  },
  v4 = '_button_1tp4a_1',
  y4 = '_primary_1tp4a_26',
  b4 = '_label_1tp4a_32',
  x4 = '_description_1tp4a_37',
  qr = { button: v4, primary: y4, label: b4, description: x4 },
  Dn = ({ label: l, description: i, variant: o = 'default', disabled: r = !1, onClick: u }) =>
    m.jsxs('button', {
      type: 'button',
      className: `${qr.button} ${o === 'primary' ? qr.primary : ''}`,
      disabled: r,
      onClick: u,
      children: [
        m.jsx('span', { className: qr.label, children: l }),
        i ? m.jsx('span', { className: qr.description, children: i }) : null,
      ],
    }),
  S4 = () => {
    const l = ml(),
      { save: i, exitToTitle: o, applyAndPersist: r } = Vl(),
      [u, d] = w.useState(!1);
    if (!i) return m.jsx(cl, { to: '/title', replace: !0 });
    const { guild: f, towerState: h, diveState: p } = i,
      g = f.members.length > 0,
      y = () => {
        (o(), l('/title'));
      },
      v = async () => {
        (p || (await r((M) => Up(M, 1))), l('/dungeon'));
      },
      I = h.warp.unlockedCheckpoints,
      L = async (M) => {
        (d(!1), await r((S) => Up(S, M)), l('/dungeon'));
      };
    return m.jsxs('div', {
      className: Ht.layout,
      children: [
        m.jsxs('header', {
          className: Ht.head,
          children: [
            m.jsx('div', { className: Ht.guildName, children: f.name }),
            m.jsxs('dl', {
              className: Ht.stats,
              children: [
                m.jsxs('div', {
                  children: [
                    m.jsx('dt', { children: '所持金' }),
                    m.jsxs('dd', { children: [f.gold, ' G'] }),
                  ],
                }),
                m.jsxs('div', {
                  children: [
                    m.jsx('dt', { children: '最高到達' }),
                    m.jsx('dd', {
                      children: h.record.deepestReached > 0 ? `${h.record.deepestReached}F` : '-',
                    }),
                  ],
                }),
                m.jsxs('div', {
                  children: [
                    m.jsx('dt', { children: '団員' }),
                    m.jsxs('dd', { children: [f.members.length, '人'] }),
                  ],
                }),
              ],
            }),
          ],
        }),
        !g &&
          m.jsx('p', {
            className: Ht.hint,
            children:
              'まずは「ギルド管理」で冒険者を作成してください。団員がいないとダイブできません。',
          }),
        m.jsxs('main', {
          className: Ht.menu,
          children: [
            m.jsx(Dn, {
              label: p ? '潜行を再開' : 'ダイブ開始',
              description: g
                ? p
                  ? `${p.depth}F から再開`
                  : '第1階からタワーへ潜る'
                : '団員が必要です',
              variant: 'primary',
              disabled: !g,
              onClick: () => void v(),
            }),
            m.jsx(Dn, {
              label: 'ワープ',
              description:
                I.length === 0
                  ? 'ボス撃破で解放'
                  : p
                    ? '潜行中は使えません'
                    : `解放済み: ${I.map((M) => `${M}F`).join('・')}`,
              disabled: !g || I.length === 0 || !!p,
              onClick: () => d(!0),
            }),
            m.jsx(Dn, {
              label: 'ギルド管理',
              description: '編成・キャラ作成',
              onClick: () => l('/guild'),
            }),
            m.jsx(Dn, {
              label: 'ショップ',
              description: '装備・アイテム売買',
              onClick: () => l('/shop'),
            }),
            m.jsx(Dn, {
              label: '鍛冶屋',
              description: '装備の強化・リサイクル',
              onClick: () => l('/forge'),
            }),
            m.jsx(Dn, {
              label: '図鑑 / 記録',
              description: '到達記録・モンスター図鑑',
              onClick: () => l('/codex'),
            }),
          ],
        }),
        m.jsx('footer', {
          className: Ht.foot,
          children: m.jsx('button', {
            type: 'button',
            className: Ht.exit,
            onClick: y,
            children: 'タイトルへ戻る',
          }),
        }),
        u
          ? m.jsx('div', {
              className: Ht.warpOverlay,
              onClick: () => d(!1),
              children: m.jsxs('div', {
                className: Ht.warpPanel,
                onClick: (M) => M.stopPropagation(),
                children: [
                  m.jsx('div', { className: Ht.warpTitle, children: 'ワープ先を選択' }),
                  I.map((M) =>
                    m.jsxs(
                      'button',
                      {
                        type: 'button',
                        className: Ht.warpBtn,
                        onClick: () => void L(M),
                        children: ['第 ', M, ' 階へ'],
                      },
                      M
                    )
                  ),
                  m.jsx('button', {
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
function w4() {
  return m.jsxs(t0, {
    children: [
      m.jsx(Ft, { path: '/', element: m.jsx(cl, { to: '/title', replace: !0 }) }),
      m.jsx(Ft, { path: '/title', element: m.jsx(i4, {}) }),
      m.jsx(Ft, { path: '/town', element: m.jsx(S4, {}) }),
      m.jsx(Ft, { path: '/guild', element: m.jsx(aw, {}) }),
      m.jsx(Ft, { path: '/guild/char/:id', element: m.jsx(Qw, {}) }),
      m.jsx(Ft, { path: '/shop', element: m.jsx(BT, {}) }),
      m.jsx(Ft, { path: '/forge', element: m.jsx(n5, {}) }),
      m.jsx(Ft, { path: '/codex', element: m.jsx(O3, {}) }),
      m.jsx(Ft, { path: '/dungeon', element: m.jsx(LS, {}) }),
      m.jsx(Ft, { path: '/battle', element: m.jsx(i3, {}) }),
      m.jsx(Ft, { path: '*', element: m.jsx(Kw, {}) }),
    ],
  });
}
const T4 = {
    races: ft,
    classes: Ke,
    titles: $l,
    skills: Xi,
    unionSkills: zn,
    summons: Vn,
    gatherTypes: $a,
    recipes: Qn,
    enemies: ul,
    items: We,
    equipment: lt,
  },
  j4 = /^[a-z]+_[a-z0-9_]+$/;
function il(l, i, o) {
  for (const r of i)
    j4.test(r) || o.push(`[${l}] ID 命名規約違反: "${r}"（期待: <domain>_<name>）`);
}
function Bu(l, i, o, r) {
  const u = new Set(i.skills.map((d) => d.skillId));
  for (const d of i.skills) {
    o.has(d.skillId) || r.push(`[${l}] 未定義スキルを参照: "${d.skillId}"`);
    for (const f of d.requires ?? [])
      u.has(f.skillId) ||
        r.push(`[${l}] スキル "${d.skillId}" の前提 "${f.skillId}" が同ツリーに存在しない`);
  }
}
function N4() {
  var E;
  const l = [],
    {
      races: i,
      classes: o,
      titles: r,
      skills: u,
      unionSkills: d,
      summons: f,
      gatherTypes: h,
      recipes: p,
      enemies: g,
      items: y,
      equipment: v,
    } = T4;
  (il('races', Object.keys(i), l),
    il('classes', Object.keys(o), l),
    il('titles', Object.keys(r), l),
    il('skills', Object.keys(u), l),
    il('enemies', Object.keys(g), l),
    il('items', Object.keys(y), l),
    il('equipment', Object.keys(v), l));
  const I = (x, C) => {
    for (const [$, D] of Object.entries(C))
      $ !== D.id && l.push(`[${x}] キー "${$}" と id "${D.id}" が不一致`);
  };
  (I('races', i),
    I('classes', o),
    I('titles', r),
    I('skills', u),
    I('enemies', g),
    I('items', y),
    I('equipment', v));
  const L = new Set(Object.keys(u)),
    M = new Set(Object.keys(o)),
    S = new Set(Object.keys(r));
  for (const x of Object.values(i)) {
    (M.has(x.defaultClassId) ||
      l.push(`[races] "${x.id}" の defaultClassId "${x.defaultClassId}" が未定義`),
      Bu(`races/${x.id}`, x.raceSkillTree, L, l));
    for (const C of x.raceSkillTree.skills) {
      const $ = d[C.skillId];
      $ &&
        $.raceId !== x.id &&
        l.push(`[races/${x.id}] ユニオンスキル "${C.skillId}" の raceId "${$.raceId}" が不一致`);
    }
  }
  for (const x of Object.values(d)) {
    const C = (E = i[x.raceId]) == null ? void 0 : E.raceSkillTree;
    (!C || !C.skills.some(($) => $.skillId === x.id)) &&
      l.push(`[unionSkills] "${x.id}" が種族 "${x.raceId}" のスキルツリーに無い`);
  }
  il('unionSkills', Object.keys(d), l);
  for (const [x, C] of Object.entries(d))
    (x !== C.id && l.push(`[unionSkills] キー "${x}" と id "${C.id}" が不一致`),
      C.id in u || l.push(`[unionSkills] "${C.id}" が skills に未定義`),
      C.requiredParticipants < 1 &&
        l.push(`[unionSkills] "${C.id}" の requiredParticipants が 1 未満`),
      (C.gaugeCostPerParticipant < 0 || C.gaugeCostPerParticipant > 100) &&
        l.push(`[unionSkills] "${C.id}" の gaugeCostPerParticipant が 0..100 外`),
      C.id in Wt &&
        l.push(
          `[unionSkills] "${C.id}" が BATTLE_SKILLS にも存在（通常スキルとして撃ててしまう）`
        ));
  il('passiveSkills', Object.keys(Ru), l);
  for (const [x, C] of Object.entries(Ru))
    (x !== C.id && l.push(`[passiveSkills] キー "${x}" と id "${C.id}" が不一致`),
      L.has(C.id) || l.push(`[passiveSkills] "${C.id}" が skills に未定義`),
      C.id in Wt &&
        l.push(`[passiveSkills] "${C.id}" が BATTLE_SKILLS にも存在（戦闘で撃ててしまう）`),
      C.id in d && l.push(`[passiveSkills] "${C.id}" が UNION_SKILLS にも存在`));
  il('summons', Object.keys(f), l);
  for (const [x, C] of Object.entries(f))
    x !== C.id && l.push(`[summons] キー "${x}" と id "${C.id}" が不一致`);
  for (const x of Object.values(Wt))
    for (const C of x.effects)
      C.kind === 'summon' &&
        !(C.summonKind in f) &&
        l.push(`[battleSkills] "${x.id}" の召喚 "${C.summonKind}" が未定義`);
  for (const [x, C] of Object.entries(h)) {
    (x !== C.type && l.push(`[gatherTypes] キー "${x}" と type "${C.type}" が不一致`),
      L.has(C.requiredSkillId) ||
        l.push(`[gatherTypes] "${C.type}" の requiredSkillId "${C.requiredSkillId}" が未定義`));
    for (const $ of C.drops) {
      if (!($.itemId in y))
        l.push(`[gatherTypes] "${C.type}" のドロップ "${$.itemId}" が未定義アイテム`);
      else {
        const D = y[$.itemId].category === 'food';
        (C.food &&
          !D &&
          l.push(`[gatherTypes] 食材系統 "${C.type}" のドロップ "${$.itemId}" が food でない`),
          !C.food &&
            D &&
            l.push(`[gatherTypes] 素材系統 "${C.type}" のドロップ "${$.itemId}" が food`));
      }
      $.weight <= 0 && l.push(`[gatherTypes] "${C.type}" のドロップ重みが正でない`);
    }
  }
  il('recipes', Object.keys(p), l);
  for (const [x, C] of Object.entries(p)) {
    x !== C.id && l.push(`[recipes] キー "${x}" と id "${C.id}" が不一致`);
    for (const $ of C.ingredients)
      $.itemId in y
        ? y[$.itemId].category !== 'food' &&
          l.push(`[recipes] "${C.id}" の材料 "${$.itemId}" が food カテゴリでない`)
        : l.push(`[recipes] "${C.id}" の材料 "${$.itemId}" が未定義`);
    C.result.itemId in y
      ? y[C.result.itemId].category !== 'food' &&
        l.push(`[recipes] "${C.id}" の結果 "${C.result.itemId}" が food カテゴリでない`)
      : l.push(`[recipes] "${C.id}" の結果 "${C.result.itemId}" が未定義`);
  }
  for (const x of Object.values(o)) {
    Bu(`classes/${x.id}`, x.skillTree, L, l);
    for (const C of x.titleOptions) {
      if (!S.has(C)) {
        l.push(`[classes] "${x.id}" の称号 "${C}" が未定義`);
        continue;
      }
      r[C].parentClassId !== x.id &&
        l.push(`[classes] 称号 "${C}" の parentClassId が "${x.id}" と不一致`);
    }
  }
  for (const x of Object.values(r))
    (M.has(x.parentClassId) ||
      l.push(`[titles] "${x.id}" の parentClassId "${x.parentClassId}" が未定義`),
      Bu(`titles/${x.id}`, x.skillTree, L, l));
  for (const x of Object.values(v))
    (x.slot === 'weapon' &&
      !x.weaponType &&
      l.push(`[equipment] "${x.id}" は weapon だが weaponType が未設定`),
      x.slot === 'armor' &&
        !x.armorType &&
        l.push(`[equipment] "${x.id}" は armor だが armorType が未設定`),
      (x.buyPrice < 0 || x.tier < 0) && l.push(`[equipment] "${x.id}" の buyPrice/tier が負`));
  for (const x of Object.values(y))
    (x.buyPrice < 0 && l.push(`[items] "${x.id}" の buyPrice が負`),
      x.category === 'consumable' &&
        !x.useContext &&
        !x.effects &&
        l.push(`[items] 消費アイテム "${x.id}" に useContext も effects も無い（使用不能）`));
  for (const x of Object.values(g))
    for (const C of x.drops ?? [])
      (C.itemId in y || l.push(`[enemies] "${x.id}" のドロップ "${C.itemId}" が未定義アイテム`),
        (C.rate < 0 || C.rate > 1) &&
          l.push(`[enemies] "${x.id}" のドロップ "${C.itemId}" の rate が 0..1 外`));
  for (const [x, C] of Object.entries(jg)) {
    x in y || l.push(`[SELL_UNLOCKS] キー素材 "${x}" が未定義`);
    for (const $ of C) $ in v || l.push(`[SELL_UNLOCKS] 解放先装備 "${$}" が未定義`);
  }
  return { ok: l.length === 0, errors: l };
}
const ch = N4();
ch.ok || console.error('マスターデータ検証エラー:', ch.errors);
const Cg = document.getElementById('root');
if (!Cg) throw new Error('Failed to find #root element');
ay.createRoot(Cg).render(
  m.jsx(T0, { basename: '/sekaiju-like-game', children: m.jsx(Px, { children: m.jsx(w4, {}) }) })
);
