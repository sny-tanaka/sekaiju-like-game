var gy = Object.defineProperty;
var ky = (l, i, r) =>
  i in l ? gy(l, i, { enumerable: !0, configurable: !0, writable: !0, value: r }) : (l[i] = r);
var Tu = (l, i, r) => ky(l, typeof i != 'symbol' ? i + '' : i, r);
(function () {
  const i = document.createElement('link').relList;
  if (i && i.supports && i.supports('modulepreload')) return;
  for (const u of document.querySelectorAll('link[rel="modulepreload"]')) o(u);
  new MutationObserver((u) => {
    for (const m of u)
      if (m.type === 'childList')
        for (const f of m.addedNodes) f.tagName === 'LINK' && f.rel === 'modulepreload' && o(f);
  }).observe(document, { childList: !0, subtree: !0 });
  function r(u) {
    const m = {};
    return (
      u.integrity && (m.integrity = u.integrity),
      u.referrerPolicy && (m.referrerPolicy = u.referrerPolicy),
      u.crossOrigin === 'use-credentials'
        ? (m.credentials = 'include')
        : u.crossOrigin === 'anonymous'
          ? (m.credentials = 'omit')
          : (m.credentials = 'same-origin'),
      m
    );
  }
  function o(u) {
    if (u.ep) return;
    u.ep = !0;
    const m = r(u);
    fetch(u.href, m);
  }
})();
var Nu = { exports: {} },
  Zi = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Op;
function vy() {
  if (Op) return Zi;
  Op = 1;
  var l = Symbol.for('react.transitional.element'),
    i = Symbol.for('react.fragment');
  function r(o, u, m) {
    var f = null;
    if ((m !== void 0 && (f = '' + m), u.key !== void 0 && (f = '' + u.key), 'key' in u)) {
      m = {};
      for (var h in u) h !== 'key' && (m[h] = u[h]);
    } else m = u;
    return ((u = m.ref), { $$typeof: l, type: o, key: f, ref: u !== void 0 ? u : null, props: m });
  }
  return ((Zi.Fragment = i), (Zi.jsx = r), (Zi.jsxs = r), Zi);
}
var Rp;
function yy() {
  return (Rp || ((Rp = 1), (Nu.exports = vy())), Nu.exports);
}
var d = yy(),
  ju = { exports: {} },
  Ji = {},
  Eu = { exports: {} },
  Cu = {};
/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Dp;
function by() {
  return (
    Dp ||
      ((Dp = 1),
      (function (l) {
        function i(O, le) {
          var re = O.length;
          O.push(le);
          e: for (; 0 < re; ) {
            var ke = (re - 1) >>> 1,
              R = O[ke];
            if (0 < u(R, le)) ((O[ke] = le), (O[re] = R), (re = ke));
            else break e;
          }
        }
        function r(O) {
          return O.length === 0 ? null : O[0];
        }
        function o(O) {
          if (O.length === 0) return null;
          var le = O[0],
            re = O.pop();
          if (re !== le) {
            O[0] = re;
            e: for (var ke = 0, R = O.length, b = R >>> 1; ke < b; ) {
              var w = 2 * (ke + 1) - 1,
                X = O[w],
                K = w + 1,
                se = O[K];
              if (0 > u(X, re))
                K < R && 0 > u(se, X)
                  ? ((O[ke] = se), (O[K] = re), (ke = K))
                  : ((O[ke] = X), (O[w] = re), (ke = w));
              else if (K < R && 0 > u(se, re)) ((O[ke] = se), (O[K] = re), (ke = K));
              else break e;
            }
          }
          return le;
        }
        function u(O, le) {
          var re = O.sortIndex - le.sortIndex;
          return re !== 0 ? re : O.id - le.id;
        }
        if (
          ((l.unstable_now = void 0),
          typeof performance == 'object' && typeof performance.now == 'function')
        ) {
          var m = performance;
          l.unstable_now = function () {
            return m.now();
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
          k = null,
          L = 3,
          N = !1,
          M = !1,
          G = !1,
          B = !1,
          j = typeof setTimeout == 'function' ? setTimeout : null,
          A = typeof clearTimeout == 'function' ? clearTimeout : null,
          V = typeof setImmediate < 'u' ? setImmediate : null;
        function U(O) {
          for (var le = r(g); le !== null; ) {
            if (le.callback === null) o(g);
            else if (le.startTime <= O) (o(g), (le.sortIndex = le.expirationTime), i(p, le));
            else break;
            le = r(g);
          }
        }
        function oe(O) {
          if (((G = !1), U(O), !M))
            if (r(p) !== null) ((M = !0), W || ((W = !0), ce()));
            else {
              var le = r(g);
              le !== null && fe(oe, le.startTime - O);
            }
        }
        var W = !1,
          x = -1,
          q = 5,
          Z = -1;
        function ee() {
          return B ? !0 : !(l.unstable_now() - Z < q);
        }
        function te() {
          if (((B = !1), W)) {
            var O = l.unstable_now();
            Z = O;
            var le = !0;
            try {
              e: {
                ((M = !1), G && ((G = !1), A(x), (x = -1)), (N = !0));
                var re = L;
                try {
                  t: {
                    for (U(O), k = r(p); k !== null && !(k.expirationTime > O && ee()); ) {
                      var ke = k.callback;
                      if (typeof ke == 'function') {
                        ((k.callback = null), (L = k.priorityLevel));
                        var R = ke(k.expirationTime <= O);
                        if (((O = l.unstable_now()), typeof R == 'function')) {
                          ((k.callback = R), U(O), (le = !0));
                          break t;
                        }
                        (k === r(p) && o(p), U(O));
                      } else o(p);
                      k = r(p);
                    }
                    if (k !== null) le = !0;
                    else {
                      var b = r(g);
                      (b !== null && fe(oe, b.startTime - O), (le = !1));
                    }
                  }
                  break e;
                } finally {
                  ((k = null), (L = re), (N = !1));
                }
                le = void 0;
              }
            } finally {
              le ? ce() : (W = !1);
            }
          }
        }
        var ce;
        if (typeof V == 'function')
          ce = function () {
            V(te);
          };
        else if (typeof MessageChannel < 'u') {
          var ve = new MessageChannel(),
            D = ve.port2;
          ((ve.port1.onmessage = te),
            (ce = function () {
              D.postMessage(null);
            }));
        } else
          ce = function () {
            j(te, 0);
          };
        function fe(O, le) {
          x = j(function () {
            O(l.unstable_now());
          }, le);
        }
        ((l.unstable_IdlePriority = 5),
          (l.unstable_ImmediatePriority = 1),
          (l.unstable_LowPriority = 4),
          (l.unstable_NormalPriority = 3),
          (l.unstable_Profiling = null),
          (l.unstable_UserBlockingPriority = 2),
          (l.unstable_cancelCallback = function (O) {
            O.callback = null;
          }),
          (l.unstable_forceFrameRate = function (O) {
            0 > O || 125 < O
              ? console.error(
                  'forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported'
                )
              : (q = 0 < O ? Math.floor(1e3 / O) : 5);
          }),
          (l.unstable_getCurrentPriorityLevel = function () {
            return L;
          }),
          (l.unstable_next = function (O) {
            switch (L) {
              case 1:
              case 2:
              case 3:
                var le = 3;
                break;
              default:
                le = L;
            }
            var re = L;
            L = le;
            try {
              return O();
            } finally {
              L = re;
            }
          }),
          (l.unstable_requestPaint = function () {
            B = !0;
          }),
          (l.unstable_runWithPriority = function (O, le) {
            switch (O) {
              case 1:
              case 2:
              case 3:
              case 4:
              case 5:
                break;
              default:
                O = 3;
            }
            var re = L;
            L = O;
            try {
              return le();
            } finally {
              L = re;
            }
          }),
          (l.unstable_scheduleCallback = function (O, le, re) {
            var ke = l.unstable_now();
            switch (
              (typeof re == 'object' && re !== null
                ? ((re = re.delay), (re = typeof re == 'number' && 0 < re ? ke + re : ke))
                : (re = ke),
              O)
            ) {
              case 1:
                var R = -1;
                break;
              case 2:
                R = 250;
                break;
              case 5:
                R = 1073741823;
                break;
              case 4:
                R = 1e4;
                break;
              default:
                R = 5e3;
            }
            return (
              (R = re + R),
              (O = {
                id: y++,
                callback: le,
                priorityLevel: O,
                startTime: re,
                expirationTime: R,
                sortIndex: -1,
              }),
              re > ke
                ? ((O.sortIndex = re),
                  i(g, O),
                  r(p) === null && O === r(g) && (G ? (A(x), (x = -1)) : (G = !0), fe(oe, re - ke)))
                : ((O.sortIndex = R), i(p, O), M || N || ((M = !0), W || ((W = !0), ce()))),
              O
            );
          }),
          (l.unstable_shouldYield = ee),
          (l.unstable_wrapCallback = function (O) {
            var le = L;
            return function () {
              var re = L;
              L = le;
              try {
                return O.apply(this, arguments);
              } finally {
                L = re;
              }
            };
          }));
      })(Cu)),
    Cu
  );
}
var zp;
function xy() {
  return (zp || ((zp = 1), (Eu.exports = by())), Eu.exports);
}
var Au = { exports: {} },
  Se = {};
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Hp;
function Sy() {
  if (Hp) return Se;
  Hp = 1;
  var l = Symbol.for('react.transitional.element'),
    i = Symbol.for('react.portal'),
    r = Symbol.for('react.fragment'),
    o = Symbol.for('react.strict_mode'),
    u = Symbol.for('react.profiler'),
    m = Symbol.for('react.consumer'),
    f = Symbol.for('react.context'),
    h = Symbol.for('react.forward_ref'),
    p = Symbol.for('react.suspense'),
    g = Symbol.for('react.memo'),
    y = Symbol.for('react.lazy'),
    k = Symbol.for('react.activity'),
    L = Symbol.iterator;
  function N(b) {
    return b === null || typeof b != 'object'
      ? null
      : ((b = (L && b[L]) || b['@@iterator']), typeof b == 'function' ? b : null);
  }
  var M = {
      isMounted: function () {
        return !1;
      },
      enqueueForceUpdate: function () {},
      enqueueReplaceState: function () {},
      enqueueSetState: function () {},
    },
    G = Object.assign,
    B = {};
  function j(b, w, X) {
    ((this.props = b), (this.context = w), (this.refs = B), (this.updater = X || M));
  }
  ((j.prototype.isReactComponent = {}),
    (j.prototype.setState = function (b, w) {
      if (typeof b != 'object' && typeof b != 'function' && b != null)
        throw Error(
          'takes an object of state variables to update or a function which returns an object of state variables.'
        );
      this.updater.enqueueSetState(this, b, w, 'setState');
    }),
    (j.prototype.forceUpdate = function (b) {
      this.updater.enqueueForceUpdate(this, b, 'forceUpdate');
    }));
  function A() {}
  A.prototype = j.prototype;
  function V(b, w, X) {
    ((this.props = b), (this.context = w), (this.refs = B), (this.updater = X || M));
  }
  var U = (V.prototype = new A());
  ((U.constructor = V), G(U, j.prototype), (U.isPureReactComponent = !0));
  var oe = Array.isArray;
  function W() {}
  var x = { H: null, A: null, T: null, S: null },
    q = Object.prototype.hasOwnProperty;
  function Z(b, w, X) {
    var K = X.ref;
    return { $$typeof: l, type: b, key: w, ref: K !== void 0 ? K : null, props: X };
  }
  function ee(b, w) {
    return Z(b.type, w, b.props);
  }
  function te(b) {
    return typeof b == 'object' && b !== null && b.$$typeof === l;
  }
  function ce(b) {
    var w = { '=': '=0', ':': '=2' };
    return (
      '$' +
      b.replace(/[=:]/g, function (X) {
        return w[X];
      })
    );
  }
  var ve = /\/+/g;
  function D(b, w) {
    return typeof b == 'object' && b !== null && b.key != null ? ce('' + b.key) : w.toString(36);
  }
  function fe(b) {
    switch (b.status) {
      case 'fulfilled':
        return b.value;
      case 'rejected':
        throw b.reason;
      default:
        switch (
          (typeof b.status == 'string'
            ? b.then(W, W)
            : ((b.status = 'pending'),
              b.then(
                function (w) {
                  b.status === 'pending' && ((b.status = 'fulfilled'), (b.value = w));
                },
                function (w) {
                  b.status === 'pending' && ((b.status = 'rejected'), (b.reason = w));
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
  function O(b, w, X, K, se) {
    var pe = typeof b;
    (pe === 'undefined' || pe === 'boolean') && (b = null);
    var be = !1;
    if (b === null) be = !0;
    else
      switch (pe) {
        case 'bigint':
        case 'string':
        case 'number':
          be = !0;
          break;
        case 'object':
          switch (b.$$typeof) {
            case l:
            case i:
              be = !0;
              break;
            case y:
              return ((be = b._init), O(be(b._payload), w, X, K, se));
          }
      }
    if (be)
      return (
        (se = se(b)),
        (be = K === '' ? '.' + D(b, 0) : K),
        oe(se)
          ? ((X = ''),
            be != null && (X = be.replace(ve, '$&/') + '/'),
            O(se, w, X, '', function (hl) {
              return hl;
            }))
          : se != null &&
            (te(se) &&
              (se = ee(
                se,
                X +
                  (se.key == null || (b && b.key === se.key)
                    ? ''
                    : ('' + se.key).replace(ve, '$&/') + '/') +
                  be
              )),
            w.push(se)),
        1
      );
    be = 0;
    var Re = K === '' ? '.' : K + ':';
    if (oe(b))
      for (var De = 0; De < b.length; De++)
        ((K = b[De]), (pe = Re + D(K, De)), (be += O(K, w, X, pe, se)));
    else if (((De = N(b)), typeof De == 'function'))
      for (b = De.call(b), De = 0; !(K = b.next()).done; )
        ((K = K.value), (pe = Re + D(K, De++)), (be += O(K, w, X, pe, se)));
    else if (pe === 'object') {
      if (typeof b.then == 'function') return O(fe(b), w, X, K, se);
      throw (
        (w = String(b)),
        Error(
          'Objects are not valid as a React child (found: ' +
            (w === '[object Object]' ? 'object with keys {' + Object.keys(b).join(', ') + '}' : w) +
            '). If you meant to render a collection of children, use an array instead.'
        )
      );
    }
    return be;
  }
  function le(b, w, X) {
    if (b == null) return b;
    var K = [],
      se = 0;
    return (
      O(b, K, '', '', function (pe) {
        return w.call(X, pe, se++);
      }),
      K
    );
  }
  function re(b) {
    if (b._status === -1) {
      var w = b._result;
      ((w = w()),
        w.then(
          function (X) {
            (b._status === 0 || b._status === -1) && ((b._status = 1), (b._result = X));
          },
          function (X) {
            (b._status === 0 || b._status === -1) && ((b._status = 2), (b._result = X));
          }
        ),
        b._status === -1 && ((b._status = 0), (b._result = w)));
    }
    if (b._status === 1) return b._result.default;
    throw b._result;
  }
  var ke =
      typeof reportError == 'function'
        ? reportError
        : function (b) {
            if (typeof window == 'object' && typeof window.ErrorEvent == 'function') {
              var w = new window.ErrorEvent('error', {
                bubbles: !0,
                cancelable: !0,
                message:
                  typeof b == 'object' && b !== null && typeof b.message == 'string'
                    ? String(b.message)
                    : String(b),
                error: b,
              });
              if (!window.dispatchEvent(w)) return;
            } else if (typeof process == 'object' && typeof process.emit == 'function') {
              process.emit('uncaughtException', b);
              return;
            }
            console.error(b);
          },
    R = {
      map: le,
      forEach: function (b, w, X) {
        le(
          b,
          function () {
            w.apply(this, arguments);
          },
          X
        );
      },
      count: function (b) {
        var w = 0;
        return (
          le(b, function () {
            w++;
          }),
          w
        );
      },
      toArray: function (b) {
        return (
          le(b, function (w) {
            return w;
          }) || []
        );
      },
      only: function (b) {
        if (!te(b))
          throw Error('React.Children.only expected to receive a single React element child.');
        return b;
      },
    };
  return (
    (Se.Activity = k),
    (Se.Children = R),
    (Se.Component = j),
    (Se.Fragment = r),
    (Se.Profiler = u),
    (Se.PureComponent = V),
    (Se.StrictMode = o),
    (Se.Suspense = p),
    (Se.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = x),
    (Se.__COMPILER_RUNTIME = {
      __proto__: null,
      c: function (b) {
        return x.H.useMemoCache(b);
      },
    }),
    (Se.cache = function (b) {
      return function () {
        return b.apply(null, arguments);
      };
    }),
    (Se.cacheSignal = function () {
      return null;
    }),
    (Se.cloneElement = function (b, w, X) {
      if (b == null) throw Error('The argument must be a React element, but you passed ' + b + '.');
      var K = G({}, b.props),
        se = b.key;
      if (w != null)
        for (pe in (w.key !== void 0 && (se = '' + w.key), w))
          !q.call(w, pe) ||
            pe === 'key' ||
            pe === '__self' ||
            pe === '__source' ||
            (pe === 'ref' && w.ref === void 0) ||
            (K[pe] = w[pe]);
      var pe = arguments.length - 2;
      if (pe === 1) K.children = X;
      else if (1 < pe) {
        for (var be = Array(pe), Re = 0; Re < pe; Re++) be[Re] = arguments[Re + 2];
        K.children = be;
      }
      return Z(b.type, se, K);
    }),
    (Se.createContext = function (b) {
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
        (b.Consumer = { $$typeof: m, _context: b }),
        b
      );
    }),
    (Se.createElement = function (b, w, X) {
      var K,
        se = {},
        pe = null;
      if (w != null)
        for (K in (w.key !== void 0 && (pe = '' + w.key), w))
          q.call(w, K) && K !== 'key' && K !== '__self' && K !== '__source' && (se[K] = w[K]);
      var be = arguments.length - 2;
      if (be === 1) se.children = X;
      else if (1 < be) {
        for (var Re = Array(be), De = 0; De < be; De++) Re[De] = arguments[De + 2];
        se.children = Re;
      }
      if (b && b.defaultProps)
        for (K in ((be = b.defaultProps), be)) se[K] === void 0 && (se[K] = be[K]);
      return Z(b, pe, se);
    }),
    (Se.createRef = function () {
      return { current: null };
    }),
    (Se.forwardRef = function (b) {
      return { $$typeof: h, render: b };
    }),
    (Se.isValidElement = te),
    (Se.lazy = function (b) {
      return { $$typeof: y, _payload: { _status: -1, _result: b }, _init: re };
    }),
    (Se.memo = function (b, w) {
      return { $$typeof: g, type: b, compare: w === void 0 ? null : w };
    }),
    (Se.startTransition = function (b) {
      var w = x.T,
        X = {};
      x.T = X;
      try {
        var K = b(),
          se = x.S;
        (se !== null && se(X, K),
          typeof K == 'object' && K !== null && typeof K.then == 'function' && K.then(W, ke));
      } catch (pe) {
        ke(pe);
      } finally {
        (w !== null && X.types !== null && (w.types = X.types), (x.T = w));
      }
    }),
    (Se.unstable_useCacheRefresh = function () {
      return x.H.useCacheRefresh();
    }),
    (Se.use = function (b) {
      return x.H.use(b);
    }),
    (Se.useActionState = function (b, w, X) {
      return x.H.useActionState(b, w, X);
    }),
    (Se.useCallback = function (b, w) {
      return x.H.useCallback(b, w);
    }),
    (Se.useContext = function (b) {
      return x.H.useContext(b);
    }),
    (Se.useDebugValue = function () {}),
    (Se.useDeferredValue = function (b, w) {
      return x.H.useDeferredValue(b, w);
    }),
    (Se.useEffect = function (b, w) {
      return x.H.useEffect(b, w);
    }),
    (Se.useEffectEvent = function (b) {
      return x.H.useEffectEvent(b);
    }),
    (Se.useId = function () {
      return x.H.useId();
    }),
    (Se.useImperativeHandle = function (b, w, X) {
      return x.H.useImperativeHandle(b, w, X);
    }),
    (Se.useInsertionEffect = function (b, w) {
      return x.H.useInsertionEffect(b, w);
    }),
    (Se.useLayoutEffect = function (b, w) {
      return x.H.useLayoutEffect(b, w);
    }),
    (Se.useMemo = function (b, w) {
      return x.H.useMemo(b, w);
    }),
    (Se.useOptimistic = function (b, w) {
      return x.H.useOptimistic(b, w);
    }),
    (Se.useReducer = function (b, w, X) {
      return x.H.useReducer(b, w, X);
    }),
    (Se.useRef = function (b) {
      return x.H.useRef(b);
    }),
    (Se.useState = function (b) {
      return x.H.useState(b);
    }),
    (Se.useSyncExternalStore = function (b, w, X) {
      return x.H.useSyncExternalStore(b, w, X);
    }),
    (Se.useTransition = function () {
      return x.H.useTransition();
    }),
    (Se.version = '19.2.5'),
    Se
  );
}
var Up;
function ud() {
  return (Up || ((Up = 1), (Au.exports = Sy())), Au.exports);
}
var Lu = { exports: {} },
  jt = {};
/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var $p;
function wy() {
  if ($p) return jt;
  $p = 1;
  var l = ud();
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
  function r() {}
  var o = {
      d: {
        f: r,
        r: function () {
          throw Error(i(522));
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
    u = Symbol.for('react.portal');
  function m(p, g, y) {
    var k = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: u,
      key: k == null ? null : '' + k,
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
    (jt.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = o),
    (jt.createPortal = function (p, g) {
      var y = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
      if (!g || (g.nodeType !== 1 && g.nodeType !== 9 && g.nodeType !== 11)) throw Error(i(299));
      return m(p, g, null, y);
    }),
    (jt.flushSync = function (p) {
      var g = f.T,
        y = o.p;
      try {
        if (((f.T = null), (o.p = 2), p)) return p();
      } finally {
        ((f.T = g), (o.p = y), o.d.f());
      }
    }),
    (jt.preconnect = function (p, g) {
      typeof p == 'string' &&
        (g
          ? ((g = g.crossOrigin),
            (g = typeof g == 'string' ? (g === 'use-credentials' ? g : '') : void 0))
          : (g = null),
        o.d.C(p, g));
    }),
    (jt.prefetchDNS = function (p) {
      typeof p == 'string' && o.d.D(p);
    }),
    (jt.preinit = function (p, g) {
      if (typeof p == 'string' && g && typeof g.as == 'string') {
        var y = g.as,
          k = h(y, g.crossOrigin),
          L = typeof g.integrity == 'string' ? g.integrity : void 0,
          N = typeof g.fetchPriority == 'string' ? g.fetchPriority : void 0;
        y === 'style'
          ? o.d.S(p, typeof g.precedence == 'string' ? g.precedence : void 0, {
              crossOrigin: k,
              integrity: L,
              fetchPriority: N,
            })
          : y === 'script' &&
            o.d.X(p, {
              crossOrigin: k,
              integrity: L,
              fetchPriority: N,
              nonce: typeof g.nonce == 'string' ? g.nonce : void 0,
            });
      }
    }),
    (jt.preinitModule = function (p, g) {
      if (typeof p == 'string')
        if (typeof g == 'object' && g !== null) {
          if (g.as == null || g.as === 'script') {
            var y = h(g.as, g.crossOrigin);
            o.d.M(p, {
              crossOrigin: y,
              integrity: typeof g.integrity == 'string' ? g.integrity : void 0,
              nonce: typeof g.nonce == 'string' ? g.nonce : void 0,
            });
          }
        } else g == null && o.d.M(p);
    }),
    (jt.preload = function (p, g) {
      if (typeof p == 'string' && typeof g == 'object' && g !== null && typeof g.as == 'string') {
        var y = g.as,
          k = h(y, g.crossOrigin);
        o.d.L(p, y, {
          crossOrigin: k,
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
    (jt.preloadModule = function (p, g) {
      if (typeof p == 'string')
        if (g) {
          var y = h(g.as, g.crossOrigin);
          o.d.m(p, {
            as: typeof g.as == 'string' && g.as !== 'script' ? g.as : void 0,
            crossOrigin: y,
            integrity: typeof g.integrity == 'string' ? g.integrity : void 0,
          });
        } else o.d.m(p);
    }),
    (jt.requestFormReset = function (p) {
      o.d.r(p);
    }),
    (jt.unstable_batchedUpdates = function (p, g) {
      return p(g);
    }),
    (jt.useFormState = function (p, g, y) {
      return f.H.useFormState(p, g, y);
    }),
    (jt.useFormStatus = function () {
      return f.H.useHostTransitionStatus();
    }),
    (jt.version = '19.2.5'),
    jt
  );
}
var Gp;
function Ty() {
  if (Gp) return Lu.exports;
  Gp = 1;
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
  return (l(), (Lu.exports = wy()), Lu.exports);
}
/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Yp;
function Ny() {
  if (Yp) return Ji;
  Yp = 1;
  var l = xy(),
    i = ud(),
    r = Ty();
  function o(e) {
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
  function m(e) {
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
    if (m(e) !== e) throw Error(o(188));
  }
  function g(e) {
    var t = e.alternate;
    if (!t) {
      if (((t = m(e)), t === null)) throw Error(o(188));
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
        throw Error(o(188));
      }
      if (a.return !== n.return) ((a = s), (n = c));
      else {
        for (var _ = !1, v = s.child; v; ) {
          if (v === a) {
            ((_ = !0), (a = s), (n = c));
            break;
          }
          if (v === n) {
            ((_ = !0), (n = s), (a = c));
            break;
          }
          v = v.sibling;
        }
        if (!_) {
          for (v = c.child; v; ) {
            if (v === a) {
              ((_ = !0), (a = c), (n = s));
              break;
            }
            if (v === n) {
              ((_ = !0), (n = c), (a = s));
              break;
            }
            v = v.sibling;
          }
          if (!_) throw Error(o(189));
        }
      }
      if (a.alternate !== n) throw Error(o(190));
    }
    if (a.tag !== 3) throw Error(o(188));
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
  var k = Object.assign,
    L = Symbol.for('react.element'),
    N = Symbol.for('react.transitional.element'),
    M = Symbol.for('react.portal'),
    G = Symbol.for('react.fragment'),
    B = Symbol.for('react.strict_mode'),
    j = Symbol.for('react.profiler'),
    A = Symbol.for('react.consumer'),
    V = Symbol.for('react.context'),
    U = Symbol.for('react.forward_ref'),
    oe = Symbol.for('react.suspense'),
    W = Symbol.for('react.suspense_list'),
    x = Symbol.for('react.memo'),
    q = Symbol.for('react.lazy'),
    Z = Symbol.for('react.activity'),
    ee = Symbol.for('react.memo_cache_sentinel'),
    te = Symbol.iterator;
  function ce(e) {
    return e === null || typeof e != 'object'
      ? null
      : ((e = (te && e[te]) || e['@@iterator']), typeof e == 'function' ? e : null);
  }
  var ve = Symbol.for('react.client.reference');
  function D(e) {
    if (e == null) return null;
    if (typeof e == 'function') return e.$$typeof === ve ? null : e.displayName || e.name || null;
    if (typeof e == 'string') return e;
    switch (e) {
      case G:
        return 'Fragment';
      case j:
        return 'Profiler';
      case B:
        return 'StrictMode';
      case oe:
        return 'Suspense';
      case W:
        return 'SuspenseList';
      case Z:
        return 'Activity';
    }
    if (typeof e == 'object')
      switch (e.$$typeof) {
        case M:
          return 'Portal';
        case V:
          return e.displayName || 'Context';
        case A:
          return (e._context.displayName || 'Context') + '.Consumer';
        case U:
          var t = e.render;
          return (
            (e = e.displayName),
            e ||
              ((e = t.displayName || t.name || ''),
              (e = e !== '' ? 'ForwardRef(' + e + ')' : 'ForwardRef')),
            e
          );
        case x:
          return ((t = e.displayName || null), t !== null ? t : D(e.type) || 'Memo');
        case q:
          ((t = e._payload), (e = e._init));
          try {
            return D(e(t));
          } catch {}
      }
    return null;
  }
  var fe = Array.isArray,
    O = i.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
    le = r.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
    re = { pending: !1, data: null, method: null, action: null },
    ke = [],
    R = -1;
  function b(e) {
    return { current: e };
  }
  function w(e) {
    0 > R || ((e.current = ke[R]), (ke[R] = null), R--);
  }
  function X(e, t) {
    (R++, (ke[R] = e.current), (e.current = t));
  }
  var K = b(null),
    se = b(null),
    pe = b(null),
    be = b(null);
  function Re(e, t) {
    switch ((X(pe, t), X(se, e), X(K, null), t.nodeType)) {
      case 9:
      case 11:
        e = (e = t.documentElement) && (e = e.namespaceURI) ? ip(e) : 0;
        break;
      default:
        if (((e = t.tagName), (t = t.namespaceURI))) ((t = ip(t)), (e = sp(t, e)));
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
    (w(K), X(K, e));
  }
  function De() {
    (w(K), w(se), w(pe));
  }
  function hl(e) {
    e.memoizedState !== null && X(be, e);
    var t = K.current,
      a = sp(t, e.type);
    t !== a && (X(se, e), X(K, a));
  }
  function il(e) {
    (se.current === e && (w(K), w(se)), be.current === e && (w(be), (Xi._currentValue = re)));
  }
  var Sl, gs;
  function gl(e) {
    if (Sl === void 0)
      try {
        throw Error();
      } catch (a) {
        var t = a.stack.trim().match(/\n( *(at )?)/);
        ((Sl = (t && t[1]) || ''),
          (gs =
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
      Sl +
      e +
      gs
    );
  }
  var Wn = !1;
  function wa(e, t) {
    if (!e || Wn) return '';
    Wn = !0;
    var a = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var n = {
        DetermineComponentFrameRoot: function () {
          try {
            if (t) {
              var F = function () {
                throw Error();
              };
              if (
                (Object.defineProperty(F.prototype, 'props', {
                  set: function () {
                    throw Error();
                  },
                }),
                typeof Reflect == 'object' && Reflect.construct)
              ) {
                try {
                  Reflect.construct(F, []);
                } catch (Y) {
                  var $ = Y;
                }
                Reflect.construct(e, [], F);
              } else {
                try {
                  F.call();
                } catch (Y) {
                  $ = Y;
                }
                e.call(F.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (Y) {
                $ = Y;
              }
              (F = e()) && typeof F.catch == 'function' && F.catch(function () {});
            }
          } catch (Y) {
            if (Y && $ && typeof Y.stack == 'string') return [Y.stack, $.stack];
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
        v = c[1];
      if (_ && v) {
        var T = _.split(`
`),
          H = v.split(`
`);
        for (s = n = 0; n < T.length && !T[n].includes('DetermineComponentFrameRoot'); ) n++;
        for (; s < H.length && !H[s].includes('DetermineComponentFrameRoot'); ) s++;
        if (n === T.length || s === H.length)
          for (n = T.length - 1, s = H.length - 1; 1 <= n && 0 <= s && T[n] !== H[s]; ) s--;
        for (; 1 <= n && 0 <= s; n--, s--)
          if (T[n] !== H[s]) {
            if (n !== 1 || s !== 1)
              do
                if ((n--, s--, 0 > s || T[n] !== H[s])) {
                  var Q =
                    `
` + T[n].replace(' at new ', ' at ');
                  return (
                    e.displayName &&
                      Q.includes('<anonymous>') &&
                      (Q = Q.replace('<anonymous>', e.displayName)),
                    Q
                  );
                }
              while (1 <= n && 0 <= s);
            break;
          }
      }
    } finally {
      ((Wn = !1), (Error.prepareStackTrace = a));
    }
    return (a = e ? e.displayName || e.name : '') ? gl(a) : '';
  }
  function Ka(e, t) {
    switch (e.tag) {
      case 26:
      case 27:
      case 5:
        return gl(e.type);
      case 16:
        return gl('Lazy');
      case 13:
        return e.child !== t && t !== null ? gl('Suspense Fallback') : gl('Suspense');
      case 19:
        return gl('SuspenseList');
      case 0:
      case 15:
        return wa(e.type, !1);
      case 11:
        return wa(e.type.render, !1);
      case 1:
        return wa(e.type, !0);
      case 31:
        return gl('Activity');
      default:
        return '';
    }
  }
  function ei(e) {
    try {
      var t = '',
        a = null;
      do ((t += Ka(e, a)), (a = e), (e = e.return));
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
  var Za = Object.prototype.hasOwnProperty,
    ti = l.unstable_scheduleCallback,
    lt = l.unstable_cancelCallback,
    Zl = l.unstable_shouldYield,
    mo = l.unstable_requestPaint,
    Nt = l.unstable_now,
    ks = l.unstable_getCurrentPriorityLevel,
    vs = l.unstable_ImmediatePriority,
    li = l.unstable_UserBlockingPriority,
    Ta = l.unstable_NormalPriority,
    ys = l.unstable_LowPriority,
    ai = l.unstable_IdlePriority,
    bs = l.log,
    C = l.unstable_setDisableYieldValue,
    ae = null,
    ne = null;
  function ue(e) {
    if ((typeof bs == 'function' && C(e), ne && typeof ne.setStrictMode == 'function'))
      try {
        ne.setStrictMode(ae, e);
      } catch {}
  }
  var Te = Math.clz32 ? Math.clz32 : Ja,
    rt = Math.log,
    kt = Math.LN2;
  function Ja(e) {
    return ((e >>>= 0), e === 0 ? 32 : (31 - ((rt(e) / kt) | 0)) | 0);
  }
  var Jl = 256,
    xs = 262144,
    Ss = 4194304;
  function Na(e) {
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
  function ws(e, t, a) {
    var n = e.pendingLanes;
    if (n === 0) return 0;
    var s = 0,
      c = e.suspendedLanes,
      _ = e.pingedLanes;
    e = e.warmLanes;
    var v = n & 134217727;
    return (
      v !== 0
        ? ((n = v & ~c),
          n !== 0
            ? (s = Na(n))
            : ((_ &= v), _ !== 0 ? (s = Na(_)) : a || ((a = v & ~e), a !== 0 && (s = Na(a)))))
        : ((v = n & ~c),
          v !== 0
            ? (s = Na(v))
            : _ !== 0
              ? (s = Na(_))
              : a || ((a = n & ~e), a !== 0 && (s = Na(a)))),
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
  function ni(e, t) {
    return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & t) === 0;
  }
  function nk(e, t) {
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
  function zd() {
    var e = Ss;
    return ((Ss <<= 1), (Ss & 62914560) === 0 && (Ss = 4194304), e);
  }
  function _o(e) {
    for (var t = [], a = 0; 31 > a; a++) t.push(e);
    return t;
  }
  function ii(e, t) {
    ((e.pendingLanes |= t),
      t !== 268435456 && ((e.suspendedLanes = 0), (e.pingedLanes = 0), (e.warmLanes = 0)));
  }
  function ik(e, t, a, n, s, c) {
    var _ = e.pendingLanes;
    ((e.pendingLanes = a),
      (e.suspendedLanes = 0),
      (e.pingedLanes = 0),
      (e.warmLanes = 0),
      (e.expiredLanes &= a),
      (e.entangledLanes &= a),
      (e.errorRecoveryDisabledLanes &= a),
      (e.shellSuspendCounter = 0));
    var v = e.entanglements,
      T = e.expirationTimes,
      H = e.hiddenUpdates;
    for (a = _ & ~a; 0 < a; ) {
      var Q = 31 - Te(a),
        F = 1 << Q;
      ((v[Q] = 0), (T[Q] = -1));
      var $ = H[Q];
      if ($ !== null)
        for (H[Q] = null, Q = 0; Q < $.length; Q++) {
          var Y = $[Q];
          Y !== null && (Y.lane &= -536870913);
        }
      a &= ~F;
    }
    (n !== 0 && Hd(e, n, 0),
      c !== 0 && s === 0 && e.tag !== 0 && (e.suspendedLanes |= c & ~(_ & ~t)));
  }
  function Hd(e, t, a) {
    ((e.pendingLanes |= t), (e.suspendedLanes &= ~t));
    var n = 31 - Te(t);
    ((e.entangledLanes |= t),
      (e.entanglements[n] = e.entanglements[n] | 1073741824 | (a & 261930)));
  }
  function Ud(e, t) {
    var a = (e.entangledLanes |= t);
    for (e = e.entanglements; a; ) {
      var n = 31 - Te(a),
        s = 1 << n;
      ((s & t) | (e[n] & t) && (e[n] |= t), (a &= ~s));
    }
  }
  function $d(e, t) {
    var a = t & -t;
    return ((a = (a & 42) !== 0 ? 1 : fo(a)), (a & (e.suspendedLanes | t)) !== 0 ? 0 : a);
  }
  function fo(e) {
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
  function po(e) {
    return ((e &= -e), 2 < e ? (8 < e ? ((e & 134217727) !== 0 ? 32 : 268435456) : 8) : 2);
  }
  function Gd() {
    var e = le.p;
    return e !== 0 ? e : ((e = window.event), e === void 0 ? 32 : Cp(e.type));
  }
  function Yd(e, t) {
    var a = le.p;
    try {
      return ((le.p = e), t());
    } finally {
      le.p = a;
    }
  }
  var Pl = Math.random().toString(36).slice(2),
    vt = '__reactFiber$' + Pl,
    Ct = '__reactProps$' + Pl,
    Pa = '__reactContainer$' + Pl,
    ho = '__reactEvents$' + Pl,
    sk = '__reactListeners$' + Pl,
    rk = '__reactHandles$' + Pl,
    Xd = '__reactResources$' + Pl,
    si = '__reactMarker$' + Pl;
  function go(e) {
    (delete e[vt], delete e[Ct], delete e[ho], delete e[sk], delete e[rk]);
  }
  function Fa(e) {
    var t = e[vt];
    if (t) return t;
    for (var a = e.parentNode; a; ) {
      if ((t = a[Pa] || a[vt])) {
        if (((a = t.alternate), t.child !== null || (a !== null && a.child !== null)))
          for (e = _p(e); e !== null; ) {
            if ((a = e[vt])) return a;
            e = _p(e);
          }
        return t;
      }
      ((e = a), (a = e.parentNode));
    }
    return null;
  }
  function Wa(e) {
    if ((e = e[vt] || e[Pa])) {
      var t = e.tag;
      if (t === 5 || t === 6 || t === 13 || t === 31 || t === 26 || t === 27 || t === 3) return e;
    }
    return null;
  }
  function ri(e) {
    var t = e.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return e.stateNode;
    throw Error(o(33));
  }
  function en(e) {
    var t = e[Xd];
    return (t || (t = e[Xd] = { hoistableStyles: new Map(), hoistableScripts: new Map() }), t);
  }
  function ft(e) {
    e[si] = !0;
  }
  var Vd = new Set(),
    Qd = {};
  function ja(e, t) {
    (tn(e, t), tn(e + 'Capture', t));
  }
  function tn(e, t) {
    for (Qd[e] = t, e = 0; e < t.length; e++) Vd.add(t[e]);
  }
  var ok = RegExp(
      '^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$'
    ),
    Kd = {},
    Zd = {};
  function ck(e) {
    return Za.call(Zd, e)
      ? !0
      : Za.call(Kd, e)
        ? !1
        : ok.test(e)
          ? (Zd[e] = !0)
          : ((Kd[e] = !0), !1);
  }
  function Ts(e, t, a) {
    if (ck(t))
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
  function Ns(e, t, a) {
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
  function wl(e, t, a, n) {
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
  function Xt(e) {
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
  function Jd(e) {
    var t = e.type;
    return (e = e.nodeName) && e.toLowerCase() === 'input' && (t === 'checkbox' || t === 'radio');
  }
  function uk(e, t, a) {
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
  function ko(e) {
    if (!e._valueTracker) {
      var t = Jd(e) ? 'checked' : 'value';
      e._valueTracker = uk(e, t, '' + e[t]);
    }
  }
  function Pd(e) {
    if (!e) return !1;
    var t = e._valueTracker;
    if (!t) return !0;
    var a = t.getValue(),
      n = '';
    return (
      e && (n = Jd(e) ? (e.checked ? 'true' : 'false') : e.value),
      (e = n),
      e !== a ? (t.setValue(e), !0) : !1
    );
  }
  function js(e) {
    if (((e = e || (typeof document < 'u' ? document : void 0)), typeof e > 'u')) return null;
    try {
      return e.activeElement || e.body;
    } catch {
      return e.body;
    }
  }
  var dk = /[\n"\\]/g;
  function Vt(e) {
    return e.replace(dk, function (t) {
      return '\\' + t.charCodeAt(0).toString(16) + ' ';
    });
  }
  function vo(e, t, a, n, s, c, _, v) {
    ((e.name = ''),
      _ != null && typeof _ != 'function' && typeof _ != 'symbol' && typeof _ != 'boolean'
        ? (e.type = _)
        : e.removeAttribute('type'),
      t != null
        ? _ === 'number'
          ? ((t === 0 && e.value === '') || e.value != t) && (e.value = '' + Xt(t))
          : e.value !== '' + Xt(t) && (e.value = '' + Xt(t))
        : (_ !== 'submit' && _ !== 'reset') || e.removeAttribute('value'),
      t != null
        ? yo(e, _, Xt(t))
        : a != null
          ? yo(e, _, Xt(a))
          : n != null && e.removeAttribute('value'),
      s == null && c != null && (e.defaultChecked = !!c),
      s != null && (e.checked = s && typeof s != 'function' && typeof s != 'symbol'),
      v != null && typeof v != 'function' && typeof v != 'symbol' && typeof v != 'boolean'
        ? (e.name = '' + Xt(v))
        : e.removeAttribute('name'));
  }
  function Fd(e, t, a, n, s, c, _, v) {
    if (
      (c != null &&
        typeof c != 'function' &&
        typeof c != 'symbol' &&
        typeof c != 'boolean' &&
        (e.type = c),
      t != null || a != null)
    ) {
      if (!((c !== 'submit' && c !== 'reset') || t != null)) {
        ko(e);
        return;
      }
      ((a = a != null ? '' + Xt(a) : ''),
        (t = t != null ? '' + Xt(t) : a),
        v || t === e.value || (e.value = t),
        (e.defaultValue = t));
    }
    ((n = n ?? s),
      (n = typeof n != 'function' && typeof n != 'symbol' && !!n),
      (e.checked = v ? e.checked : !!n),
      (e.defaultChecked = !!n),
      _ != null &&
        typeof _ != 'function' &&
        typeof _ != 'symbol' &&
        typeof _ != 'boolean' &&
        (e.name = _),
      ko(e));
  }
  function yo(e, t, a) {
    (t === 'number' && js(e.ownerDocument) === e) ||
      e.defaultValue === '' + a ||
      (e.defaultValue = '' + a);
  }
  function ln(e, t, a, n) {
    if (((e = e.options), t)) {
      t = {};
      for (var s = 0; s < a.length; s++) t['$' + a[s]] = !0;
      for (a = 0; a < e.length; a++)
        ((s = t.hasOwnProperty('$' + e[a].value)),
          e[a].selected !== s && (e[a].selected = s),
          s && n && (e[a].defaultSelected = !0));
    } else {
      for (a = '' + Xt(a), t = null, s = 0; s < e.length; s++) {
        if (e[s].value === a) {
          ((e[s].selected = !0), n && (e[s].defaultSelected = !0));
          return;
        }
        t !== null || e[s].disabled || (t = e[s]);
      }
      t !== null && (t.selected = !0);
    }
  }
  function Wd(e, t, a) {
    if (t != null && ((t = '' + Xt(t)), t !== e.value && (e.value = t), a == null)) {
      e.defaultValue !== t && (e.defaultValue = t);
      return;
    }
    e.defaultValue = a != null ? '' + Xt(a) : '';
  }
  function em(e, t, a, n) {
    if (t == null) {
      if (n != null) {
        if (a != null) throw Error(o(92));
        if (fe(n)) {
          if (1 < n.length) throw Error(o(93));
          n = n[0];
        }
        a = n;
      }
      (a == null && (a = ''), (t = a));
    }
    ((a = Xt(t)),
      (e.defaultValue = a),
      (n = e.textContent),
      n === a && n !== '' && n !== null && (e.value = n),
      ko(e));
  }
  function an(e, t) {
    if (t) {
      var a = e.firstChild;
      if (a && a === e.lastChild && a.nodeType === 3) {
        a.nodeValue = t;
        return;
      }
    }
    e.textContent = t;
  }
  var mk = new Set(
    'animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp'.split(
      ' '
    )
  );
  function tm(e, t, a) {
    var n = t.indexOf('--') === 0;
    a == null || typeof a == 'boolean' || a === ''
      ? n
        ? e.setProperty(t, '')
        : t === 'float'
          ? (e.cssFloat = '')
          : (e[t] = '')
      : n
        ? e.setProperty(t, a)
        : typeof a != 'number' || a === 0 || mk.has(t)
          ? t === 'float'
            ? (e.cssFloat = a)
            : (e[t] = ('' + a).trim())
          : (e[t] = a + 'px');
  }
  function lm(e, t, a) {
    if (t != null && typeof t != 'object') throw Error(o(62));
    if (((e = e.style), a != null)) {
      for (var n in a)
        !a.hasOwnProperty(n) ||
          (t != null && t.hasOwnProperty(n)) ||
          (n.indexOf('--') === 0
            ? e.setProperty(n, '')
            : n === 'float'
              ? (e.cssFloat = '')
              : (e[n] = ''));
      for (var s in t) ((n = t[s]), t.hasOwnProperty(s) && a[s] !== n && tm(e, s, n));
    } else for (var c in t) t.hasOwnProperty(c) && tm(e, c, t[c]);
  }
  function bo(e) {
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
  var _k = new Map([
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
    fk =
      /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function Es(e) {
    return fk.test('' + e)
      ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')"
      : e;
  }
  function Tl() {}
  var xo = null;
  function So(e) {
    return (
      (e = e.target || e.srcElement || window),
      e.correspondingUseElement && (e = e.correspondingUseElement),
      e.nodeType === 3 ? e.parentNode : e
    );
  }
  var nn = null,
    sn = null;
  function am(e) {
    var t = Wa(e);
    if (t && (e = t.stateNode)) {
      var a = e[Ct] || null;
      e: switch (((e = t.stateNode), t.type)) {
        case 'input':
          if (
            (vo(
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
              a = a.querySelectorAll('input[name="' + Vt('' + t) + '"][type="radio"]'), t = 0;
              t < a.length;
              t++
            ) {
              var n = a[t];
              if (n !== e && n.form === e.form) {
                var s = n[Ct] || null;
                if (!s) throw Error(o(90));
                vo(
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
            for (t = 0; t < a.length; t++) ((n = a[t]), n.form === e.form && Pd(n));
          }
          break e;
        case 'textarea':
          Wd(e, a.value, a.defaultValue);
          break e;
        case 'select':
          ((t = a.value), t != null && ln(e, !!a.multiple, t, !1));
      }
    }
  }
  var wo = !1;
  function nm(e, t, a) {
    if (wo) return e(t, a);
    wo = !0;
    try {
      var n = e(t);
      return n;
    } finally {
      if (
        ((wo = !1),
        (nn !== null || sn !== null) &&
          (pr(), nn && ((t = nn), (e = sn), (sn = nn = null), am(t), e)))
      )
        for (t = 0; t < e.length; t++) am(e[t]);
    }
  }
  function oi(e, t) {
    var a = e.stateNode;
    if (a === null) return null;
    var n = a[Ct] || null;
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
    if (a && typeof a != 'function') throw Error(o(231, t, typeof a));
    return a;
  }
  var Nl = !(
      typeof window > 'u' ||
      typeof window.document > 'u' ||
      typeof window.document.createElement > 'u'
    ),
    To = !1;
  if (Nl)
    try {
      var ci = {};
      (Object.defineProperty(ci, 'passive', {
        get: function () {
          To = !0;
        },
      }),
        window.addEventListener('test', ci, ci),
        window.removeEventListener('test', ci, ci));
    } catch {
      To = !1;
    }
  var Fl = null,
    No = null,
    Cs = null;
  function im() {
    if (Cs) return Cs;
    var e,
      t = No,
      a = t.length,
      n,
      s = 'value' in Fl ? Fl.value : Fl.textContent,
      c = s.length;
    for (e = 0; e < a && t[e] === s[e]; e++);
    var _ = a - e;
    for (n = 1; n <= _ && t[a - n] === s[c - n]; n++);
    return (Cs = s.slice(e, 1 < n ? 1 - n : void 0));
  }
  function As(e) {
    var t = e.keyCode;
    return (
      'charCode' in e ? ((e = e.charCode), e === 0 && t === 13 && (e = 13)) : (e = t),
      e === 10 && (e = 13),
      32 <= e || e === 13 ? e : 0
    );
  }
  function Ls() {
    return !0;
  }
  function sm() {
    return !1;
  }
  function At(e) {
    function t(a, n, s, c, _) {
      ((this._reactName = a),
        (this._targetInst = s),
        (this.type = n),
        (this.nativeEvent = c),
        (this.target = _),
        (this.currentTarget = null));
      for (var v in e) e.hasOwnProperty(v) && ((a = e[v]), (this[v] = a ? a(c) : c[v]));
      return (
        (this.isDefaultPrevented = (
          c.defaultPrevented != null ? c.defaultPrevented : c.returnValue === !1
        )
          ? Ls
          : sm),
        (this.isPropagationStopped = sm),
        this
      );
    }
    return (
      k(t.prototype, {
        preventDefault: function () {
          this.defaultPrevented = !0;
          var a = this.nativeEvent;
          a &&
            (a.preventDefault
              ? a.preventDefault()
              : typeof a.returnValue != 'unknown' && (a.returnValue = !1),
            (this.isDefaultPrevented = Ls));
        },
        stopPropagation: function () {
          var a = this.nativeEvent;
          a &&
            (a.stopPropagation
              ? a.stopPropagation()
              : typeof a.cancelBubble != 'unknown' && (a.cancelBubble = !0),
            (this.isPropagationStopped = Ls));
        },
        persist: function () {},
        isPersistent: Ls,
      }),
      t
    );
  }
  var Ea = {
      eventPhase: 0,
      bubbles: 0,
      cancelable: 0,
      timeStamp: function (e) {
        return e.timeStamp || Date.now();
      },
      defaultPrevented: 0,
      isTrusted: 0,
    },
    qs = At(Ea),
    ui = k({}, Ea, { view: 0, detail: 0 }),
    pk = At(ui),
    jo,
    Eo,
    di,
    Bs = k({}, ui, {
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
      getModifierState: Ao,
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
          : (e !== di &&
              (di && e.type === 'mousemove'
                ? ((jo = e.screenX - di.screenX), (Eo = e.screenY - di.screenY))
                : (Eo = jo = 0),
              (di = e)),
            jo);
      },
      movementY: function (e) {
        return 'movementY' in e ? e.movementY : Eo;
      },
    }),
    rm = At(Bs),
    hk = k({}, Bs, { dataTransfer: 0 }),
    gk = At(hk),
    kk = k({}, ui, { relatedTarget: 0 }),
    Co = At(kk),
    vk = k({}, Ea, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
    yk = At(vk),
    bk = k({}, Ea, {
      clipboardData: function (e) {
        return 'clipboardData' in e ? e.clipboardData : window.clipboardData;
      },
    }),
    xk = At(bk),
    Sk = k({}, Ea, { data: 0 }),
    om = At(Sk),
    wk = {
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
    Tk = {
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
    Nk = { Alt: 'altKey', Control: 'ctrlKey', Meta: 'metaKey', Shift: 'shiftKey' };
  function jk(e) {
    var t = this.nativeEvent;
    return t.getModifierState ? t.getModifierState(e) : (e = Nk[e]) ? !!t[e] : !1;
  }
  function Ao() {
    return jk;
  }
  var Ek = k({}, ui, {
      key: function (e) {
        if (e.key) {
          var t = wk[e.key] || e.key;
          if (t !== 'Unidentified') return t;
        }
        return e.type === 'keypress'
          ? ((e = As(e)), e === 13 ? 'Enter' : String.fromCharCode(e))
          : e.type === 'keydown' || e.type === 'keyup'
            ? Tk[e.keyCode] || 'Unidentified'
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
      getModifierState: Ao,
      charCode: function (e) {
        return e.type === 'keypress' ? As(e) : 0;
      },
      keyCode: function (e) {
        return e.type === 'keydown' || e.type === 'keyup' ? e.keyCode : 0;
      },
      which: function (e) {
        return e.type === 'keypress'
          ? As(e)
          : e.type === 'keydown' || e.type === 'keyup'
            ? e.keyCode
            : 0;
      },
    }),
    Ck = At(Ek),
    Ak = k({}, Bs, {
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
    cm = At(Ak),
    Lk = k({}, ui, {
      touches: 0,
      targetTouches: 0,
      changedTouches: 0,
      altKey: 0,
      metaKey: 0,
      ctrlKey: 0,
      shiftKey: 0,
      getModifierState: Ao,
    }),
    qk = At(Lk),
    Bk = k({}, Ea, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
    Ik = At(Bk),
    Mk = k({}, Bs, {
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
    Ok = At(Mk),
    Rk = k({}, Ea, { newState: 0, oldState: 0 }),
    Dk = At(Rk),
    zk = [9, 13, 27, 32],
    Lo = Nl && 'CompositionEvent' in window,
    mi = null;
  Nl && 'documentMode' in document && (mi = document.documentMode);
  var Hk = Nl && 'TextEvent' in window && !mi,
    um = Nl && (!Lo || (mi && 8 < mi && 11 >= mi)),
    dm = ' ',
    mm = !1;
  function _m(e, t) {
    switch (e) {
      case 'keyup':
        return zk.indexOf(t.keyCode) !== -1;
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
  function fm(e) {
    return ((e = e.detail), typeof e == 'object' && 'data' in e ? e.data : null);
  }
  var rn = !1;
  function Uk(e, t) {
    switch (e) {
      case 'compositionend':
        return fm(t);
      case 'keypress':
        return t.which !== 32 ? null : ((mm = !0), dm);
      case 'textInput':
        return ((e = t.data), e === dm && mm ? null : e);
      default:
        return null;
    }
  }
  function $k(e, t) {
    if (rn)
      return e === 'compositionend' || (!Lo && _m(e, t))
        ? ((e = im()), (Cs = No = Fl = null), (rn = !1), e)
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
        return um && t.locale !== 'ko' ? null : t.data;
      default:
        return null;
    }
  }
  var Gk = {
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
  function pm(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t === 'input' ? !!Gk[e.type] : t === 'textarea';
  }
  function hm(e, t, a, n) {
    (nn ? (sn ? sn.push(n) : (sn = [n])) : (nn = n),
      (t = xr(t, 'onChange')),
      0 < t.length &&
        ((a = new qs('onChange', 'change', null, a, n)), e.push({ event: a, listeners: t })));
  }
  var _i = null,
    fi = null;
  function Yk(e) {
    Wf(e, 0);
  }
  function Is(e) {
    var t = ri(e);
    if (Pd(t)) return e;
  }
  function gm(e, t) {
    if (e === 'change') return t;
  }
  var km = !1;
  if (Nl) {
    var qo;
    if (Nl) {
      var Bo = 'oninput' in document;
      if (!Bo) {
        var vm = document.createElement('div');
        (vm.setAttribute('oninput', 'return;'), (Bo = typeof vm.oninput == 'function'));
      }
      qo = Bo;
    } else qo = !1;
    km = qo && (!document.documentMode || 9 < document.documentMode);
  }
  function ym() {
    _i && (_i.detachEvent('onpropertychange', bm), (fi = _i = null));
  }
  function bm(e) {
    if (e.propertyName === 'value' && Is(fi)) {
      var t = [];
      (hm(t, fi, e, So(e)), nm(Yk, t));
    }
  }
  function Xk(e, t, a) {
    e === 'focusin'
      ? (ym(), (_i = t), (fi = a), _i.attachEvent('onpropertychange', bm))
      : e === 'focusout' && ym();
  }
  function Vk(e) {
    if (e === 'selectionchange' || e === 'keyup' || e === 'keydown') return Is(fi);
  }
  function Qk(e, t) {
    if (e === 'click') return Is(t);
  }
  function Kk(e, t) {
    if (e === 'input' || e === 'change') return Is(t);
  }
  function Zk(e, t) {
    return (e === t && (e !== 0 || 1 / e === 1 / t)) || (e !== e && t !== t);
  }
  var Ot = typeof Object.is == 'function' ? Object.is : Zk;
  function pi(e, t) {
    if (Ot(e, t)) return !0;
    if (typeof e != 'object' || e === null || typeof t != 'object' || t === null) return !1;
    var a = Object.keys(e),
      n = Object.keys(t);
    if (a.length !== n.length) return !1;
    for (n = 0; n < a.length; n++) {
      var s = a[n];
      if (!Za.call(t, s) || !Ot(e[s], t[s])) return !1;
    }
    return !0;
  }
  function xm(e) {
    for (; e && e.firstChild; ) e = e.firstChild;
    return e;
  }
  function Sm(e, t) {
    var a = xm(e);
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
      a = xm(a);
    }
  }
  function wm(e, t) {
    return e && t
      ? e === t
        ? !0
        : e && e.nodeType === 3
          ? !1
          : t && t.nodeType === 3
            ? wm(e, t.parentNode)
            : 'contains' in e
              ? e.contains(t)
              : e.compareDocumentPosition
                ? !!(e.compareDocumentPosition(t) & 16)
                : !1
      : !1;
  }
  function Tm(e) {
    e =
      e != null && e.ownerDocument != null && e.ownerDocument.defaultView != null
        ? e.ownerDocument.defaultView
        : window;
    for (var t = js(e.document); t instanceof e.HTMLIFrameElement; ) {
      try {
        var a = typeof t.contentWindow.location.href == 'string';
      } catch {
        a = !1;
      }
      if (a) e = t.contentWindow;
      else break;
      t = js(e.document);
    }
    return t;
  }
  function Io(e) {
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
  var Jk = Nl && 'documentMode' in document && 11 >= document.documentMode,
    on = null,
    Mo = null,
    hi = null,
    Oo = !1;
  function Nm(e, t, a) {
    var n = a.window === a ? a.document : a.nodeType === 9 ? a : a.ownerDocument;
    Oo ||
      on == null ||
      on !== js(n) ||
      ((n = on),
      'selectionStart' in n && Io(n)
        ? (n = { start: n.selectionStart, end: n.selectionEnd })
        : ((n = ((n.ownerDocument && n.ownerDocument.defaultView) || window).getSelection()),
          (n = {
            anchorNode: n.anchorNode,
            anchorOffset: n.anchorOffset,
            focusNode: n.focusNode,
            focusOffset: n.focusOffset,
          })),
      (hi && pi(hi, n)) ||
        ((hi = n),
        (n = xr(Mo, 'onSelect')),
        0 < n.length &&
          ((t = new qs('onSelect', 'select', null, t, a)),
          e.push({ event: t, listeners: n }),
          (t.target = on))));
  }
  function Ca(e, t) {
    var a = {};
    return (
      (a[e.toLowerCase()] = t.toLowerCase()),
      (a['Webkit' + e] = 'webkit' + t),
      (a['Moz' + e] = 'moz' + t),
      a
    );
  }
  var cn = {
      animationend: Ca('Animation', 'AnimationEnd'),
      animationiteration: Ca('Animation', 'AnimationIteration'),
      animationstart: Ca('Animation', 'AnimationStart'),
      transitionrun: Ca('Transition', 'TransitionRun'),
      transitionstart: Ca('Transition', 'TransitionStart'),
      transitioncancel: Ca('Transition', 'TransitionCancel'),
      transitionend: Ca('Transition', 'TransitionEnd'),
    },
    Ro = {},
    jm = {};
  Nl &&
    ((jm = document.createElement('div').style),
    'AnimationEvent' in window ||
      (delete cn.animationend.animation,
      delete cn.animationiteration.animation,
      delete cn.animationstart.animation),
    'TransitionEvent' in window || delete cn.transitionend.transition);
  function Aa(e) {
    if (Ro[e]) return Ro[e];
    if (!cn[e]) return e;
    var t = cn[e],
      a;
    for (a in t) if (t.hasOwnProperty(a) && a in jm) return (Ro[e] = t[a]);
    return e;
  }
  var Em = Aa('animationend'),
    Cm = Aa('animationiteration'),
    Am = Aa('animationstart'),
    Pk = Aa('transitionrun'),
    Fk = Aa('transitionstart'),
    Wk = Aa('transitioncancel'),
    Lm = Aa('transitionend'),
    qm = new Map(),
    Do =
      'abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel'.split(
        ' '
      );
  Do.push('scrollEnd');
  function sl(e, t) {
    (qm.set(e, t), ja(t, [e]));
  }
  var Ms =
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
    Qt = [],
    un = 0,
    zo = 0;
  function Os() {
    for (var e = un, t = (zo = un = 0); t < e; ) {
      var a = Qt[t];
      Qt[t++] = null;
      var n = Qt[t];
      Qt[t++] = null;
      var s = Qt[t];
      Qt[t++] = null;
      var c = Qt[t];
      if (((Qt[t++] = null), n !== null && s !== null)) {
        var _ = n.pending;
        (_ === null ? (s.next = s) : ((s.next = _.next), (_.next = s)), (n.pending = s));
      }
      c !== 0 && Bm(a, s, c);
    }
  }
  function Rs(e, t, a, n) {
    ((Qt[un++] = e),
      (Qt[un++] = t),
      (Qt[un++] = a),
      (Qt[un++] = n),
      (zo |= n),
      (e.lanes |= n),
      (e = e.alternate),
      e !== null && (e.lanes |= n));
  }
  function Ho(e, t, a, n) {
    return (Rs(e, t, a, n), Ds(e));
  }
  function La(e, t) {
    return (Rs(e, null, null, t), Ds(e));
  }
  function Bm(e, t, a) {
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
          ((s = 31 - Te(a)),
          (e = c.hiddenUpdates),
          (n = e[s]),
          n === null ? (e[s] = [t]) : n.push(t),
          (t.lane = a | 536870912)),
        c)
      : null;
  }
  function Ds(e) {
    if (50 < Di) throw ((Di = 0), (Zc = null), Error(o(185)));
    for (var t = e.return; t !== null; ) ((e = t), (t = e.return));
    return e.tag === 3 ? e.stateNode : null;
  }
  var dn = {};
  function ev(e, t, a, n) {
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
  function Rt(e, t, a, n) {
    return new ev(e, t, a, n);
  }
  function Uo(e) {
    return ((e = e.prototype), !(!e || !e.isReactComponent));
  }
  function jl(e, t) {
    var a = e.alternate;
    return (
      a === null
        ? ((a = Rt(e.tag, t, e.key, e.mode)),
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
  function Im(e, t) {
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
  function zs(e, t, a, n, s, c) {
    var _ = 0;
    if (((n = e), typeof e == 'function')) Uo(e) && (_ = 1);
    else if (typeof e == 'string')
      _ = iy(e, a, K.current) ? 26 : e === 'html' || e === 'head' || e === 'body' ? 27 : 5;
    else
      e: switch (e) {
        case Z:
          return ((e = Rt(31, a, t, s)), (e.elementType = Z), (e.lanes = c), e);
        case G:
          return qa(a.children, s, c, t);
        case B:
          ((_ = 8), (s |= 24));
          break;
        case j:
          return ((e = Rt(12, a, t, s | 2)), (e.elementType = j), (e.lanes = c), e);
        case oe:
          return ((e = Rt(13, a, t, s)), (e.elementType = oe), (e.lanes = c), e);
        case W:
          return ((e = Rt(19, a, t, s)), (e.elementType = W), (e.lanes = c), e);
        default:
          if (typeof e == 'object' && e !== null)
            switch (e.$$typeof) {
              case V:
                _ = 10;
                break e;
              case A:
                _ = 9;
                break e;
              case U:
                _ = 11;
                break e;
              case x:
                _ = 14;
                break e;
              case q:
                ((_ = 16), (n = null));
                break e;
            }
          ((_ = 29), (a = Error(o(130, e === null ? 'null' : typeof e, ''))), (n = null));
      }
    return ((t = Rt(_, a, t, s)), (t.elementType = e), (t.type = n), (t.lanes = c), t);
  }
  function qa(e, t, a, n) {
    return ((e = Rt(7, e, n, t)), (e.lanes = a), e);
  }
  function $o(e, t, a) {
    return ((e = Rt(6, e, null, t)), (e.lanes = a), e);
  }
  function Mm(e) {
    var t = Rt(18, null, null, 0);
    return ((t.stateNode = e), t);
  }
  function Go(e, t, a) {
    return (
      (t = Rt(4, e.children !== null ? e.children : [], e.key, t)),
      (t.lanes = a),
      (t.stateNode = {
        containerInfo: e.containerInfo,
        pendingChildren: null,
        implementation: e.implementation,
      }),
      t
    );
  }
  var Om = new WeakMap();
  function Kt(e, t) {
    if (typeof e == 'object' && e !== null) {
      var a = Om.get(e);
      return a !== void 0 ? a : ((t = { value: e, source: t, stack: ei(t) }), Om.set(e, t), t);
    }
    return { value: e, source: t, stack: ei(t) };
  }
  var mn = [],
    _n = 0,
    Hs = null,
    gi = 0,
    Zt = [],
    Jt = 0,
    Wl = null,
    kl = 1,
    vl = '';
  function El(e, t) {
    ((mn[_n++] = gi), (mn[_n++] = Hs), (Hs = e), (gi = t));
  }
  function Rm(e, t, a) {
    ((Zt[Jt++] = kl), (Zt[Jt++] = vl), (Zt[Jt++] = Wl), (Wl = e));
    var n = kl;
    e = vl;
    var s = 32 - Te(n) - 1;
    ((n &= ~(1 << s)), (a += 1));
    var c = 32 - Te(t) + s;
    if (30 < c) {
      var _ = s - (s % 5);
      ((c = (n & ((1 << _) - 1)).toString(32)),
        (n >>= _),
        (s -= _),
        (kl = (1 << (32 - Te(t) + s)) | (a << s) | n),
        (vl = c + e));
    } else ((kl = (1 << c) | (a << s) | n), (vl = e));
  }
  function Yo(e) {
    e.return !== null && (El(e, 1), Rm(e, 1, 0));
  }
  function Xo(e) {
    for (; e === Hs; ) ((Hs = mn[--_n]), (mn[_n] = null), (gi = mn[--_n]), (mn[_n] = null));
    for (; e === Wl; )
      ((Wl = Zt[--Jt]),
        (Zt[Jt] = null),
        (vl = Zt[--Jt]),
        (Zt[Jt] = null),
        (kl = Zt[--Jt]),
        (Zt[Jt] = null));
  }
  function Dm(e, t) {
    ((Zt[Jt++] = kl), (Zt[Jt++] = vl), (Zt[Jt++] = Wl), (kl = t.id), (vl = t.overflow), (Wl = e));
  }
  var yt = null,
    Ze = null,
    qe = !1,
    ea = null,
    Pt = !1,
    Vo = Error(o(519));
  function ta(e) {
    var t = Error(
      o(418, 1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? 'text' : 'HTML', '')
    );
    throw (ki(Kt(t, e)), Vo);
  }
  function zm(e) {
    var t = e.stateNode,
      a = e.type,
      n = e.memoizedProps;
    switch (((t[vt] = e), (t[Ct] = n), a)) {
      case 'dialog':
        (Ce('cancel', t), Ce('close', t));
        break;
      case 'iframe':
      case 'object':
      case 'embed':
        Ce('load', t);
        break;
      case 'video':
      case 'audio':
        for (a = 0; a < Hi.length; a++) Ce(Hi[a], t);
        break;
      case 'source':
        Ce('error', t);
        break;
      case 'img':
      case 'image':
      case 'link':
        (Ce('error', t), Ce('load', t));
        break;
      case 'details':
        Ce('toggle', t);
        break;
      case 'input':
        (Ce('invalid', t),
          Fd(t, n.value, n.defaultValue, n.checked, n.defaultChecked, n.type, n.name, !0));
        break;
      case 'select':
        Ce('invalid', t);
        break;
      case 'textarea':
        (Ce('invalid', t), em(t, n.value, n.defaultValue, n.children));
    }
    ((a = n.children),
      (typeof a != 'string' && typeof a != 'number' && typeof a != 'bigint') ||
      t.textContent === '' + a ||
      n.suppressHydrationWarning === !0 ||
      ap(t.textContent, a)
        ? (n.popover != null && (Ce('beforetoggle', t), Ce('toggle', t)),
          n.onScroll != null && Ce('scroll', t),
          n.onScrollEnd != null && Ce('scrollend', t),
          n.onClick != null && (t.onclick = Tl),
          (t = !0))
        : (t = !1),
      t || ta(e, !0));
  }
  function Hm(e) {
    for (yt = e.return; yt; )
      switch (yt.tag) {
        case 5:
        case 31:
        case 13:
          Pt = !1;
          return;
        case 27:
        case 3:
          Pt = !0;
          return;
        default:
          yt = yt.return;
      }
  }
  function fn(e) {
    if (e !== yt) return !1;
    if (!qe) return (Hm(e), (qe = !0), !1);
    var t = e.tag,
      a;
    if (
      ((a = t !== 3 && t !== 27) &&
        ((a = t === 5) &&
          ((a = e.type), (a = !(a !== 'form' && a !== 'button') || uu(e.type, e.memoizedProps))),
        (a = !a)),
      a && Ze && ta(e),
      Hm(e),
      t === 13)
    ) {
      if (((e = e.memoizedState), (e = e !== null ? e.dehydrated : null), !e)) throw Error(o(317));
      Ze = mp(e);
    } else if (t === 31) {
      if (((e = e.memoizedState), (e = e !== null ? e.dehydrated : null), !e)) throw Error(o(317));
      Ze = mp(e);
    } else
      t === 27
        ? ((t = Ze), pa(e.type) ? ((e = pu), (pu = null), (Ze = e)) : (Ze = t))
        : (Ze = yt ? Wt(e.stateNode.nextSibling) : null);
    return !0;
  }
  function Ba() {
    ((Ze = yt = null), (qe = !1));
  }
  function Qo() {
    var e = ea;
    return (e !== null && (It === null ? (It = e) : It.push.apply(It, e), (ea = null)), e);
  }
  function ki(e) {
    ea === null ? (ea = [e]) : ea.push(e);
  }
  var Ko = b(null),
    Ia = null,
    Cl = null;
  function la(e, t, a) {
    (X(Ko, t._currentValue), (t._currentValue = a));
  }
  function Al(e) {
    ((e._currentValue = Ko.current), w(Ko));
  }
  function Zo(e, t, a) {
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
  function Jo(e, t, a, n) {
    var s = e.child;
    for (s !== null && (s.return = e); s !== null; ) {
      var c = s.dependencies;
      if (c !== null) {
        var _ = s.child;
        c = c.firstContext;
        e: for (; c !== null; ) {
          var v = c;
          c = s;
          for (var T = 0; T < t.length; T++)
            if (v.context === t[T]) {
              ((c.lanes |= a),
                (v = c.alternate),
                v !== null && (v.lanes |= a),
                Zo(c.return, a, e),
                n || (_ = null));
              break e;
            }
          c = v.next;
        }
      } else if (s.tag === 18) {
        if (((_ = s.return), _ === null)) throw Error(o(341));
        ((_.lanes |= a), (c = _.alternate), c !== null && (c.lanes |= a), Zo(_, a, e), (_ = null));
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
  function pn(e, t, a, n) {
    e = null;
    for (var s = t, c = !1; s !== null; ) {
      if (!c) {
        if ((s.flags & 524288) !== 0) c = !0;
        else if ((s.flags & 262144) !== 0) break;
      }
      if (s.tag === 10) {
        var _ = s.alternate;
        if (_ === null) throw Error(o(387));
        if (((_ = _.memoizedProps), _ !== null)) {
          var v = s.type;
          Ot(s.pendingProps.value, _.value) || (e !== null ? e.push(v) : (e = [v]));
        }
      } else if (s === be.current) {
        if (((_ = s.alternate), _ === null)) throw Error(o(387));
        _.memoizedState.memoizedState !== s.memoizedState.memoizedState &&
          (e !== null ? e.push(Xi) : (e = [Xi]));
      }
      s = s.return;
    }
    (e !== null && Jo(t, e, a, n), (t.flags |= 262144));
  }
  function Us(e) {
    for (e = e.firstContext; e !== null; ) {
      if (!Ot(e.context._currentValue, e.memoizedValue)) return !0;
      e = e.next;
    }
    return !1;
  }
  function Ma(e) {
    ((Ia = e), (Cl = null), (e = e.dependencies), e !== null && (e.firstContext = null));
  }
  function bt(e) {
    return Um(Ia, e);
  }
  function $s(e, t) {
    return (Ia === null && Ma(e), Um(e, t));
  }
  function Um(e, t) {
    var a = t._currentValue;
    if (((t = { context: t, memoizedValue: a, next: null }), Cl === null)) {
      if (e === null) throw Error(o(308));
      ((Cl = t), (e.dependencies = { lanes: 0, firstContext: t }), (e.flags |= 524288));
    } else Cl = Cl.next = t;
    return a;
  }
  var tv =
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
    lv = l.unstable_scheduleCallback,
    av = l.unstable_NormalPriority,
    ot = {
      $$typeof: V,
      Consumer: null,
      Provider: null,
      _currentValue: null,
      _currentValue2: null,
      _threadCount: 0,
    };
  function Po() {
    return { controller: new tv(), data: new Map(), refCount: 0 };
  }
  function vi(e) {
    (e.refCount--,
      e.refCount === 0 &&
        lv(av, function () {
          e.controller.abort();
        }));
  }
  var yi = null,
    Fo = 0,
    hn = 0,
    gn = null;
  function nv(e, t) {
    if (yi === null) {
      var a = (yi = []);
      ((Fo = 0),
        (hn = tu()),
        (gn = {
          status: 'pending',
          value: void 0,
          then: function (n) {
            a.push(n);
          },
        }));
    }
    return (Fo++, t.then($m, $m), t);
  }
  function $m() {
    if (--Fo === 0 && yi !== null) {
      gn !== null && (gn.status = 'fulfilled');
      var e = yi;
      ((yi = null), (hn = 0), (gn = null));
      for (var t = 0; t < e.length; t++) (0, e[t])();
    }
  }
  function iv(e, t) {
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
  var Gm = O.S;
  O.S = function (e, t) {
    ((jf = Nt()),
      typeof t == 'object' && t !== null && typeof t.then == 'function' && nv(e, t),
      Gm !== null && Gm(e, t));
  };
  var Oa = b(null);
  function Wo() {
    var e = Oa.current;
    return e !== null ? e : Ve.pooledCache;
  }
  function Gs(e, t) {
    t === null ? X(Oa, Oa.current) : X(Oa, t.pool);
  }
  function Ym() {
    var e = Wo();
    return e === null ? null : { parent: ot._currentValue, pool: e };
  }
  var kn = Error(o(460)),
    ec = Error(o(474)),
    Ys = Error(o(542)),
    Xs = { then: function () {} };
  function Xm(e) {
    return ((e = e.status), e === 'fulfilled' || e === 'rejected');
  }
  function Vm(e, t, a) {
    switch (
      ((a = e[a]), a === void 0 ? e.push(t) : a !== t && (t.then(Tl, Tl), (t = a)), t.status)
    ) {
      case 'fulfilled':
        return t.value;
      case 'rejected':
        throw ((e = t.reason), Km(e), e);
      default:
        if (typeof t.status == 'string') t.then(Tl, Tl);
        else {
          if (((e = Ve), e !== null && 100 < e.shellSuspendCounter)) throw Error(o(482));
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
            throw ((e = t.reason), Km(e), e);
        }
        throw ((Da = t), kn);
    }
  }
  function Ra(e) {
    try {
      var t = e._init;
      return t(e._payload);
    } catch (a) {
      throw a !== null && typeof a == 'object' && typeof a.then == 'function' ? ((Da = a), kn) : a;
    }
  }
  var Da = null;
  function Qm() {
    if (Da === null) throw Error(o(459));
    var e = Da;
    return ((Da = null), e);
  }
  function Km(e) {
    if (e === kn || e === Ys) throw Error(o(483));
  }
  var vn = null,
    bi = 0;
  function Vs(e) {
    var t = bi;
    return ((bi += 1), vn === null && (vn = []), Vm(vn, e, t));
  }
  function xi(e, t) {
    ((t = t.props.ref), (e.ref = t !== void 0 ? t : null));
  }
  function Qs(e, t) {
    throw t.$$typeof === L
      ? Error(o(525))
      : ((e = Object.prototype.toString.call(t)),
        Error(
          o(
            31,
            e === '[object Object]' ? 'object with keys {' + Object.keys(t).join(', ') + '}' : e
          )
        ));
  }
  function Zm(e) {
    function t(I, E) {
      if (e) {
        var z = I.deletions;
        z === null ? ((I.deletions = [E]), (I.flags |= 16)) : z.push(E);
      }
    }
    function a(I, E) {
      if (!e) return null;
      for (; E !== null; ) (t(I, E), (E = E.sibling));
      return null;
    }
    function n(I) {
      for (var E = new Map(); I !== null; )
        (I.key !== null ? E.set(I.key, I) : E.set(I.index, I), (I = I.sibling));
      return E;
    }
    function s(I, E) {
      return ((I = jl(I, E)), (I.index = 0), (I.sibling = null), I);
    }
    function c(I, E, z) {
      return (
        (I.index = z),
        e
          ? ((z = I.alternate),
            z !== null
              ? ((z = z.index), z < E ? ((I.flags |= 67108866), E) : z)
              : ((I.flags |= 67108866), E))
          : ((I.flags |= 1048576), E)
      );
    }
    function _(I) {
      return (e && I.alternate === null && (I.flags |= 67108866), I);
    }
    function v(I, E, z, J) {
      return E === null || E.tag !== 6
        ? ((E = $o(z, I.mode, J)), (E.return = I), E)
        : ((E = s(E, z)), (E.return = I), E);
    }
    function T(I, E, z, J) {
      var ye = z.type;
      return ye === G
        ? Q(I, E, z.props.children, J, z.key)
        : E !== null &&
            (E.elementType === ye ||
              (typeof ye == 'object' && ye !== null && ye.$$typeof === q && Ra(ye) === E.type))
          ? ((E = s(E, z.props)), xi(E, z), (E.return = I), E)
          : ((E = zs(z.type, z.key, z.props, null, I.mode, J)), xi(E, z), (E.return = I), E);
    }
    function H(I, E, z, J) {
      return E === null ||
        E.tag !== 4 ||
        E.stateNode.containerInfo !== z.containerInfo ||
        E.stateNode.implementation !== z.implementation
        ? ((E = Go(z, I.mode, J)), (E.return = I), E)
        : ((E = s(E, z.children || [])), (E.return = I), E);
    }
    function Q(I, E, z, J, ye) {
      return E === null || E.tag !== 7
        ? ((E = qa(z, I.mode, J, ye)), (E.return = I), E)
        : ((E = s(E, z)), (E.return = I), E);
    }
    function F(I, E, z) {
      if ((typeof E == 'string' && E !== '') || typeof E == 'number' || typeof E == 'bigint')
        return ((E = $o('' + E, I.mode, z)), (E.return = I), E);
      if (typeof E == 'object' && E !== null) {
        switch (E.$$typeof) {
          case N:
            return ((z = zs(E.type, E.key, E.props, null, I.mode, z)), xi(z, E), (z.return = I), z);
          case M:
            return ((E = Go(E, I.mode, z)), (E.return = I), E);
          case q:
            return ((E = Ra(E)), F(I, E, z));
        }
        if (fe(E) || ce(E)) return ((E = qa(E, I.mode, z, null)), (E.return = I), E);
        if (typeof E.then == 'function') return F(I, Vs(E), z);
        if (E.$$typeof === V) return F(I, $s(I, E), z);
        Qs(I, E);
      }
      return null;
    }
    function $(I, E, z, J) {
      var ye = E !== null ? E.key : null;
      if ((typeof z == 'string' && z !== '') || typeof z == 'number' || typeof z == 'bigint')
        return ye !== null ? null : v(I, E, '' + z, J);
      if (typeof z == 'object' && z !== null) {
        switch (z.$$typeof) {
          case N:
            return z.key === ye ? T(I, E, z, J) : null;
          case M:
            return z.key === ye ? H(I, E, z, J) : null;
          case q:
            return ((z = Ra(z)), $(I, E, z, J));
        }
        if (fe(z) || ce(z)) return ye !== null ? null : Q(I, E, z, J, null);
        if (typeof z.then == 'function') return $(I, E, Vs(z), J);
        if (z.$$typeof === V) return $(I, E, $s(I, z), J);
        Qs(I, z);
      }
      return null;
    }
    function Y(I, E, z, J, ye) {
      if ((typeof J == 'string' && J !== '') || typeof J == 'number' || typeof J == 'bigint')
        return ((I = I.get(z) || null), v(E, I, '' + J, ye));
      if (typeof J == 'object' && J !== null) {
        switch (J.$$typeof) {
          case N:
            return ((I = I.get(J.key === null ? z : J.key) || null), T(E, I, J, ye));
          case M:
            return ((I = I.get(J.key === null ? z : J.key) || null), H(E, I, J, ye));
          case q:
            return ((J = Ra(J)), Y(I, E, z, J, ye));
        }
        if (fe(J) || ce(J)) return ((I = I.get(z) || null), Q(E, I, J, ye, null));
        if (typeof J.then == 'function') return Y(I, E, z, Vs(J), ye);
        if (J.$$typeof === V) return Y(I, E, z, $s(E, J), ye);
        Qs(E, J);
      }
      return null;
    }
    function _e(I, E, z, J) {
      for (
        var ye = null, Ie = null, he = E, Ne = (E = 0), Le = null;
        he !== null && Ne < z.length;
        Ne++
      ) {
        he.index > Ne ? ((Le = he), (he = null)) : (Le = he.sibling);
        var Me = $(I, he, z[Ne], J);
        if (Me === null) {
          he === null && (he = Le);
          break;
        }
        (e && he && Me.alternate === null && t(I, he),
          (E = c(Me, E, Ne)),
          Ie === null ? (ye = Me) : (Ie.sibling = Me),
          (Ie = Me),
          (he = Le));
      }
      if (Ne === z.length) return (a(I, he), qe && El(I, Ne), ye);
      if (he === null) {
        for (; Ne < z.length; Ne++)
          ((he = F(I, z[Ne], J)),
            he !== null &&
              ((E = c(he, E, Ne)), Ie === null ? (ye = he) : (Ie.sibling = he), (Ie = he)));
        return (qe && El(I, Ne), ye);
      }
      for (he = n(he); Ne < z.length; Ne++)
        ((Le = Y(he, I, Ne, z[Ne], J)),
          Le !== null &&
            (e && Le.alternate !== null && he.delete(Le.key === null ? Ne : Le.key),
            (E = c(Le, E, Ne)),
            Ie === null ? (ye = Le) : (Ie.sibling = Le),
            (Ie = Le)));
      return (
        e &&
          he.forEach(function (ya) {
            return t(I, ya);
          }),
        qe && El(I, Ne),
        ye
      );
    }
    function xe(I, E, z, J) {
      if (z == null) throw Error(o(151));
      for (
        var ye = null, Ie = null, he = E, Ne = (E = 0), Le = null, Me = z.next();
        he !== null && !Me.done;
        Ne++, Me = z.next()
      ) {
        he.index > Ne ? ((Le = he), (he = null)) : (Le = he.sibling);
        var ya = $(I, he, Me.value, J);
        if (ya === null) {
          he === null && (he = Le);
          break;
        }
        (e && he && ya.alternate === null && t(I, he),
          (E = c(ya, E, Ne)),
          Ie === null ? (ye = ya) : (Ie.sibling = ya),
          (Ie = ya),
          (he = Le));
      }
      if (Me.done) return (a(I, he), qe && El(I, Ne), ye);
      if (he === null) {
        for (; !Me.done; Ne++, Me = z.next())
          ((Me = F(I, Me.value, J)),
            Me !== null &&
              ((E = c(Me, E, Ne)), Ie === null ? (ye = Me) : (Ie.sibling = Me), (Ie = Me)));
        return (qe && El(I, Ne), ye);
      }
      for (he = n(he); !Me.done; Ne++, Me = z.next())
        ((Me = Y(he, I, Ne, Me.value, J)),
          Me !== null &&
            (e && Me.alternate !== null && he.delete(Me.key === null ? Ne : Me.key),
            (E = c(Me, E, Ne)),
            Ie === null ? (ye = Me) : (Ie.sibling = Me),
            (Ie = Me)));
      return (
        e &&
          he.forEach(function (hy) {
            return t(I, hy);
          }),
        qe && El(I, Ne),
        ye
      );
    }
    function Ye(I, E, z, J) {
      if (
        (typeof z == 'object' &&
          z !== null &&
          z.type === G &&
          z.key === null &&
          (z = z.props.children),
        typeof z == 'object' && z !== null)
      ) {
        switch (z.$$typeof) {
          case N:
            e: {
              for (var ye = z.key; E !== null; ) {
                if (E.key === ye) {
                  if (((ye = z.type), ye === G)) {
                    if (E.tag === 7) {
                      (a(I, E.sibling), (J = s(E, z.props.children)), (J.return = I), (I = J));
                      break e;
                    }
                  } else if (
                    E.elementType === ye ||
                    (typeof ye == 'object' && ye !== null && ye.$$typeof === q && Ra(ye) === E.type)
                  ) {
                    (a(I, E.sibling), (J = s(E, z.props)), xi(J, z), (J.return = I), (I = J));
                    break e;
                  }
                  a(I, E);
                  break;
                } else t(I, E);
                E = E.sibling;
              }
              z.type === G
                ? ((J = qa(z.props.children, I.mode, J, z.key)), (J.return = I), (I = J))
                : ((J = zs(z.type, z.key, z.props, null, I.mode, J)),
                  xi(J, z),
                  (J.return = I),
                  (I = J));
            }
            return _(I);
          case M:
            e: {
              for (ye = z.key; E !== null; ) {
                if (E.key === ye)
                  if (
                    E.tag === 4 &&
                    E.stateNode.containerInfo === z.containerInfo &&
                    E.stateNode.implementation === z.implementation
                  ) {
                    (a(I, E.sibling), (J = s(E, z.children || [])), (J.return = I), (I = J));
                    break e;
                  } else {
                    a(I, E);
                    break;
                  }
                else t(I, E);
                E = E.sibling;
              }
              ((J = Go(z, I.mode, J)), (J.return = I), (I = J));
            }
            return _(I);
          case q:
            return ((z = Ra(z)), Ye(I, E, z, J));
        }
        if (fe(z)) return _e(I, E, z, J);
        if (ce(z)) {
          if (((ye = ce(z)), typeof ye != 'function')) throw Error(o(150));
          return ((z = ye.call(z)), xe(I, E, z, J));
        }
        if (typeof z.then == 'function') return Ye(I, E, Vs(z), J);
        if (z.$$typeof === V) return Ye(I, E, $s(I, z), J);
        Qs(I, z);
      }
      return (typeof z == 'string' && z !== '') || typeof z == 'number' || typeof z == 'bigint'
        ? ((z = '' + z),
          E !== null && E.tag === 6
            ? (a(I, E.sibling), (J = s(E, z)), (J.return = I), (I = J))
            : (a(I, E), (J = $o(z, I.mode, J)), (J.return = I), (I = J)),
          _(I))
        : a(I, E);
    }
    return function (I, E, z, J) {
      try {
        bi = 0;
        var ye = Ye(I, E, z, J);
        return ((vn = null), ye);
      } catch (he) {
        if (he === kn || he === Ys) throw he;
        var Ie = Rt(29, he, null, I.mode);
        return ((Ie.lanes = J), (Ie.return = I), Ie);
      } finally {
      }
    };
  }
  var za = Zm(!0),
    Jm = Zm(!1),
    aa = !1;
  function tc(e) {
    e.updateQueue = {
      baseState: e.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null,
    };
  }
  function lc(e, t) {
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
  function na(e) {
    return { lane: e, tag: 0, payload: null, callback: null, next: null };
  }
  function ia(e, t, a) {
    var n = e.updateQueue;
    if (n === null) return null;
    if (((n = n.shared), (Oe & 2) !== 0)) {
      var s = n.pending;
      return (
        s === null ? (t.next = t) : ((t.next = s.next), (s.next = t)),
        (n.pending = t),
        (t = Ds(e)),
        Bm(e, null, a),
        t
      );
    }
    return (Rs(e, n, t, a), Ds(e));
  }
  function Si(e, t, a) {
    if (((t = t.updateQueue), t !== null && ((t = t.shared), (a & 4194048) !== 0))) {
      var n = t.lanes;
      ((n &= e.pendingLanes), (a |= n), (t.lanes = a), Ud(e, a));
    }
  }
  function ac(e, t) {
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
  var nc = !1;
  function wi() {
    if (nc) {
      var e = gn;
      if (e !== null) throw e;
    }
  }
  function Ti(e, t, a, n) {
    nc = !1;
    var s = e.updateQueue;
    aa = !1;
    var c = s.firstBaseUpdate,
      _ = s.lastBaseUpdate,
      v = s.shared.pending;
    if (v !== null) {
      s.shared.pending = null;
      var T = v,
        H = T.next;
      ((T.next = null), _ === null ? (c = H) : (_.next = H), (_ = T));
      var Q = e.alternate;
      Q !== null &&
        ((Q = Q.updateQueue),
        (v = Q.lastBaseUpdate),
        v !== _ && (v === null ? (Q.firstBaseUpdate = H) : (v.next = H), (Q.lastBaseUpdate = T)));
    }
    if (c !== null) {
      var F = s.baseState;
      ((_ = 0), (Q = H = T = null), (v = c));
      do {
        var $ = v.lane & -536870913,
          Y = $ !== v.lane;
        if (Y ? (Ae & $) === $ : (n & $) === $) {
          ($ !== 0 && $ === hn && (nc = !0),
            Q !== null &&
              (Q = Q.next =
                { lane: 0, tag: v.tag, payload: v.payload, callback: null, next: null }));
          e: {
            var _e = e,
              xe = v;
            $ = t;
            var Ye = a;
            switch (xe.tag) {
              case 1:
                if (((_e = xe.payload), typeof _e == 'function')) {
                  F = _e.call(Ye, F, $);
                  break e;
                }
                F = _e;
                break e;
              case 3:
                _e.flags = (_e.flags & -65537) | 128;
              case 0:
                if (
                  ((_e = xe.payload),
                  ($ = typeof _e == 'function' ? _e.call(Ye, F, $) : _e),
                  $ == null)
                )
                  break e;
                F = k({}, F, $);
                break e;
              case 2:
                aa = !0;
            }
          }
          (($ = v.callback),
            $ !== null &&
              ((e.flags |= 64),
              Y && (e.flags |= 8192),
              (Y = s.callbacks),
              Y === null ? (s.callbacks = [$]) : Y.push($)));
        } else
          ((Y = { lane: $, tag: v.tag, payload: v.payload, callback: v.callback, next: null }),
            Q === null ? ((H = Q = Y), (T = F)) : (Q = Q.next = Y),
            (_ |= $));
        if (((v = v.next), v === null)) {
          if (((v = s.shared.pending), v === null)) break;
          ((Y = v),
            (v = Y.next),
            (Y.next = null),
            (s.lastBaseUpdate = Y),
            (s.shared.pending = null));
        }
      } while (!0);
      (Q === null && (T = F),
        (s.baseState = T),
        (s.firstBaseUpdate = H),
        (s.lastBaseUpdate = Q),
        c === null && (s.shared.lanes = 0),
        (ua |= _),
        (e.lanes = _),
        (e.memoizedState = F));
    }
  }
  function Pm(e, t) {
    if (typeof e != 'function') throw Error(o(191, e));
    e.call(t);
  }
  function Fm(e, t) {
    var a = e.callbacks;
    if (a !== null) for (e.callbacks = null, e = 0; e < a.length; e++) Pm(a[e], t);
  }
  var yn = b(null),
    Ks = b(0);
  function Wm(e, t) {
    ((e = zl), X(Ks, e), X(yn, t), (zl = e | t.baseLanes));
  }
  function ic() {
    (X(Ks, zl), X(yn, yn.current));
  }
  function sc() {
    ((zl = Ks.current), w(yn), w(Ks));
  }
  var Dt = b(null),
    Ft = null;
  function sa(e) {
    var t = e.alternate;
    (X(it, it.current & 1),
      X(Dt, e),
      Ft === null && (t === null || yn.current !== null || t.memoizedState !== null) && (Ft = e));
  }
  function rc(e) {
    (X(it, it.current), X(Dt, e), Ft === null && (Ft = e));
  }
  function e_(e) {
    e.tag === 22 ? (X(it, it.current), X(Dt, e), Ft === null && (Ft = e)) : ra();
  }
  function ra() {
    (X(it, it.current), X(Dt, Dt.current));
  }
  function zt(e) {
    (w(Dt), Ft === e && (Ft = null), w(it));
  }
  var it = b(0);
  function Zs(e) {
    for (var t = e; t !== null; ) {
      if (t.tag === 13) {
        var a = t.memoizedState;
        if (a !== null && ((a = a.dehydrated), a === null || _u(a) || fu(a))) return t;
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
  var Ll = 0,
    we = null,
    $e = null,
    ct = null,
    Js = !1,
    bn = !1,
    Ha = !1,
    Ps = 0,
    Ni = 0,
    xn = null,
    sv = 0;
  function at() {
    throw Error(o(321));
  }
  function oc(e, t) {
    if (t === null) return !1;
    for (var a = 0; a < t.length && a < e.length; a++) if (!Ot(e[a], t[a])) return !1;
    return !0;
  }
  function cc(e, t, a, n, s, c) {
    return (
      (Ll = c),
      (we = t),
      (t.memoizedState = null),
      (t.updateQueue = null),
      (t.lanes = 0),
      (O.H = e === null || e.memoizedState === null ? R_ : wc),
      (Ha = !1),
      (c = a(n, s)),
      (Ha = !1),
      bn && (c = l_(t, a, n, s)),
      t_(e),
      c
    );
  }
  function t_(e) {
    O.H = Ci;
    var t = $e !== null && $e.next !== null;
    if (((Ll = 0), (ct = $e = we = null), (Js = !1), (Ni = 0), (xn = null), t)) throw Error(o(300));
    e === null || ut || ((e = e.dependencies), e !== null && Us(e) && (ut = !0));
  }
  function l_(e, t, a, n) {
    we = e;
    var s = 0;
    do {
      if ((bn && (xn = null), (Ni = 0), (bn = !1), 25 <= s)) throw Error(o(301));
      if (((s += 1), (ct = $e = null), e.updateQueue != null)) {
        var c = e.updateQueue;
        ((c.lastEffect = null),
          (c.events = null),
          (c.stores = null),
          c.memoCache != null && (c.memoCache.index = 0));
      }
      ((O.H = D_), (c = t(a, n)));
    } while (bn);
    return c;
  }
  function rv() {
    var e = O.H,
      t = e.useState()[0];
    return (
      (t = typeof t.then == 'function' ? ji(t) : t),
      (e = e.useState()[0]),
      ($e !== null ? $e.memoizedState : null) !== e && (we.flags |= 1024),
      t
    );
  }
  function uc() {
    var e = Ps !== 0;
    return ((Ps = 0), e);
  }
  function dc(e, t, a) {
    ((t.updateQueue = e.updateQueue), (t.flags &= -2053), (e.lanes &= ~a));
  }
  function mc(e) {
    if (Js) {
      for (e = e.memoizedState; e !== null; ) {
        var t = e.queue;
        (t !== null && (t.pending = null), (e = e.next));
      }
      Js = !1;
    }
    ((Ll = 0), (ct = $e = we = null), (bn = !1), (Ni = Ps = 0), (xn = null));
  }
  function Et() {
    var e = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
    return (ct === null ? (we.memoizedState = ct = e) : (ct = ct.next = e), ct);
  }
  function st() {
    if ($e === null) {
      var e = we.alternate;
      e = e !== null ? e.memoizedState : null;
    } else e = $e.next;
    var t = ct === null ? we.memoizedState : ct.next;
    if (t !== null) ((ct = t), ($e = e));
    else {
      if (e === null) throw we.alternate === null ? Error(o(467)) : Error(o(310));
      (($e = e),
        (e = {
          memoizedState: $e.memoizedState,
          baseState: $e.baseState,
          baseQueue: $e.baseQueue,
          queue: $e.queue,
          next: null,
        }),
        ct === null ? (we.memoizedState = ct = e) : (ct = ct.next = e));
    }
    return ct;
  }
  function Fs() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function ji(e) {
    var t = Ni;
    return (
      (Ni += 1),
      xn === null && (xn = []),
      (e = Vm(xn, e, t)),
      (t = we),
      (ct === null ? t.memoizedState : ct.next) === null &&
        ((t = t.alternate), (O.H = t === null || t.memoizedState === null ? R_ : wc)),
      e
    );
  }
  function Ws(e) {
    if (e !== null && typeof e == 'object') {
      if (typeof e.then == 'function') return ji(e);
      if (e.$$typeof === V) return bt(e);
    }
    throw Error(o(438, String(e)));
  }
  function _c(e) {
    var t = null,
      a = we.updateQueue;
    if ((a !== null && (t = a.memoCache), t == null)) {
      var n = we.alternate;
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
      a === null && ((a = Fs()), (we.updateQueue = a)),
      (a.memoCache = t),
      (a = t.data[t.index]),
      a === void 0)
    )
      for (a = t.data[t.index] = Array(e), n = 0; n < e; n++) a[n] = ee;
    return (t.index++, a);
  }
  function ql(e, t) {
    return typeof t == 'function' ? t(e) : t;
  }
  function er(e) {
    var t = st();
    return fc(t, $e, e);
  }
  function fc(e, t, a) {
    var n = e.queue;
    if (n === null) throw Error(o(311));
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
      var v = (_ = null),
        T = null,
        H = t,
        Q = !1;
      do {
        var F = H.lane & -536870913;
        if (F !== H.lane ? (Ae & F) === F : (Ll & F) === F) {
          var $ = H.revertLane;
          if ($ === 0)
            (T !== null &&
              (T = T.next =
                {
                  lane: 0,
                  revertLane: 0,
                  gesture: null,
                  action: H.action,
                  hasEagerState: H.hasEagerState,
                  eagerState: H.eagerState,
                  next: null,
                }),
              F === hn && (Q = !0));
          else if ((Ll & $) === $) {
            ((H = H.next), $ === hn && (Q = !0));
            continue;
          } else
            ((F = {
              lane: 0,
              revertLane: H.revertLane,
              gesture: null,
              action: H.action,
              hasEagerState: H.hasEagerState,
              eagerState: H.eagerState,
              next: null,
            }),
              T === null ? ((v = T = F), (_ = c)) : (T = T.next = F),
              (we.lanes |= $),
              (ua |= $));
          ((F = H.action), Ha && a(c, F), (c = H.hasEagerState ? H.eagerState : a(c, F)));
        } else
          (($ = {
            lane: F,
            revertLane: H.revertLane,
            gesture: H.gesture,
            action: H.action,
            hasEagerState: H.hasEagerState,
            eagerState: H.eagerState,
            next: null,
          }),
            T === null ? ((v = T = $), (_ = c)) : (T = T.next = $),
            (we.lanes |= F),
            (ua |= F));
        H = H.next;
      } while (H !== null && H !== t);
      if (
        (T === null ? (_ = c) : (T.next = v),
        !Ot(c, e.memoizedState) && ((ut = !0), Q && ((a = gn), a !== null)))
      )
        throw a;
      ((e.memoizedState = c), (e.baseState = _), (e.baseQueue = T), (n.lastRenderedState = c));
    }
    return (s === null && (n.lanes = 0), [e.memoizedState, n.dispatch]);
  }
  function pc(e) {
    var t = st(),
      a = t.queue;
    if (a === null) throw Error(o(311));
    a.lastRenderedReducer = e;
    var n = a.dispatch,
      s = a.pending,
      c = t.memoizedState;
    if (s !== null) {
      a.pending = null;
      var _ = (s = s.next);
      do ((c = e(c, _.action)), (_ = _.next));
      while (_ !== s);
      (Ot(c, t.memoizedState) || (ut = !0),
        (t.memoizedState = c),
        t.baseQueue === null && (t.baseState = c),
        (a.lastRenderedState = c));
    }
    return [c, n];
  }
  function a_(e, t, a) {
    var n = we,
      s = st(),
      c = qe;
    if (c) {
      if (a === void 0) throw Error(o(407));
      a = a();
    } else a = t();
    var _ = !Ot(($e || s).memoizedState, a);
    if (
      (_ && ((s.memoizedState = a), (ut = !0)),
      (s = s.queue),
      kc(s_.bind(null, n, s, e), [e]),
      s.getSnapshot !== t || _ || (ct !== null && ct.memoizedState.tag & 1))
    ) {
      if (
        ((n.flags |= 2048),
        Sn(9, { destroy: void 0 }, i_.bind(null, n, s, a, t), null),
        Ve === null)
      )
        throw Error(o(349));
      c || (Ll & 127) !== 0 || n_(n, t, a);
    }
    return a;
  }
  function n_(e, t, a) {
    ((e.flags |= 16384),
      (e = { getSnapshot: t, value: a }),
      (t = we.updateQueue),
      t === null
        ? ((t = Fs()), (we.updateQueue = t), (t.stores = [e]))
        : ((a = t.stores), a === null ? (t.stores = [e]) : a.push(e)));
  }
  function i_(e, t, a, n) {
    ((t.value = a), (t.getSnapshot = n), r_(t) && o_(e));
  }
  function s_(e, t, a) {
    return a(function () {
      r_(t) && o_(e);
    });
  }
  function r_(e) {
    var t = e.getSnapshot;
    e = e.value;
    try {
      var a = t();
      return !Ot(e, a);
    } catch {
      return !0;
    }
  }
  function o_(e) {
    var t = La(e, 2);
    t !== null && Mt(t, e, 2);
  }
  function hc(e) {
    var t = Et();
    if (typeof e == 'function') {
      var a = e;
      if (((e = a()), Ha)) {
        ue(!0);
        try {
          a();
        } finally {
          ue(!1);
        }
      }
    }
    return (
      (t.memoizedState = t.baseState = e),
      (t.queue = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: ql,
        lastRenderedState: e,
      }),
      t
    );
  }
  function c_(e, t, a, n) {
    return ((e.baseState = a), fc(e, $e, typeof n == 'function' ? n : ql));
  }
  function ov(e, t, a, n, s) {
    if (ar(e)) throw Error(o(485));
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
      (O.T !== null ? a(!0) : (c.isTransition = !1),
        n(c),
        (a = t.pending),
        a === null
          ? ((c.next = t.pending = c), u_(t, c))
          : ((c.next = a.next), (t.pending = a.next = c)));
    }
  }
  function u_(e, t) {
    var a = t.action,
      n = t.payload,
      s = e.state;
    if (t.isTransition) {
      var c = O.T,
        _ = {};
      O.T = _;
      try {
        var v = a(s, n),
          T = O.S;
        (T !== null && T(_, v), d_(e, t, v));
      } catch (H) {
        gc(e, t, H);
      } finally {
        (c !== null && _.types !== null && (c.types = _.types), (O.T = c));
      }
    } else
      try {
        ((c = a(s, n)), d_(e, t, c));
      } catch (H) {
        gc(e, t, H);
      }
  }
  function d_(e, t, a) {
    a !== null && typeof a == 'object' && typeof a.then == 'function'
      ? a.then(
          function (n) {
            m_(e, t, n);
          },
          function (n) {
            return gc(e, t, n);
          }
        )
      : m_(e, t, a);
  }
  function m_(e, t, a) {
    ((t.status = 'fulfilled'),
      (t.value = a),
      __(t),
      (e.state = a),
      (t = e.pending),
      t !== null &&
        ((a = t.next), a === t ? (e.pending = null) : ((a = a.next), (t.next = a), u_(e, a))));
  }
  function gc(e, t, a) {
    var n = e.pending;
    if (((e.pending = null), n !== null)) {
      n = n.next;
      do ((t.status = 'rejected'), (t.reason = a), __(t), (t = t.next));
      while (t !== n);
    }
    e.action = null;
  }
  function __(e) {
    e = e.listeners;
    for (var t = 0; t < e.length; t++) (0, e[t])();
  }
  function f_(e, t) {
    return t;
  }
  function p_(e, t) {
    if (qe) {
      var a = Ve.formState;
      if (a !== null) {
        e: {
          var n = we;
          if (qe) {
            if (Ze) {
              t: {
                for (var s = Ze, c = Pt; s.nodeType !== 8; ) {
                  if (!c) {
                    s = null;
                    break t;
                  }
                  if (((s = Wt(s.nextSibling)), s === null)) {
                    s = null;
                    break t;
                  }
                }
                ((c = s.data), (s = c === 'F!' || c === 'F' ? s : null));
              }
              if (s) {
                ((Ze = Wt(s.nextSibling)), (n = s.data === 'F!'));
                break e;
              }
            }
            ta(n);
          }
          n = !1;
        }
        n && (t = a[0]);
      }
    }
    return (
      (a = Et()),
      (a.memoizedState = a.baseState = t),
      (n = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: f_,
        lastRenderedState: t,
      }),
      (a.queue = n),
      (a = I_.bind(null, we, n)),
      (n.dispatch = a),
      (n = hc(!1)),
      (c = Sc.bind(null, we, !1, n.queue)),
      (n = Et()),
      (s = { state: t, dispatch: null, action: e, pending: null }),
      (n.queue = s),
      (a = ov.bind(null, we, s, c, a)),
      (s.dispatch = a),
      (n.memoizedState = e),
      [t, a, !1]
    );
  }
  function h_(e) {
    var t = st();
    return g_(t, $e, e);
  }
  function g_(e, t, a) {
    if (
      ((t = fc(e, t, f_)[0]),
      (e = er(ql)[0]),
      typeof t == 'object' && t !== null && typeof t.then == 'function')
    )
      try {
        var n = ji(t);
      } catch (_) {
        throw _ === kn ? Ys : _;
      }
    else n = t;
    t = st();
    var s = t.queue,
      c = s.dispatch;
    return (
      a !== t.memoizedState &&
        ((we.flags |= 2048), Sn(9, { destroy: void 0 }, cv.bind(null, s, a), null)),
      [n, c, e]
    );
  }
  function cv(e, t) {
    e.action = t;
  }
  function k_(e) {
    var t = st(),
      a = $e;
    if (a !== null) return g_(t, a, e);
    (st(), (t = t.memoizedState), (a = st()));
    var n = a.queue.dispatch;
    return ((a.memoizedState = e), [t, n, !1]);
  }
  function Sn(e, t, a, n) {
    return (
      (e = { tag: e, create: a, deps: n, inst: t, next: null }),
      (t = we.updateQueue),
      t === null && ((t = Fs()), (we.updateQueue = t)),
      (a = t.lastEffect),
      a === null
        ? (t.lastEffect = e.next = e)
        : ((n = a.next), (a.next = e), (e.next = n), (t.lastEffect = e)),
      e
    );
  }
  function v_() {
    return st().memoizedState;
  }
  function tr(e, t, a, n) {
    var s = Et();
    ((we.flags |= e),
      (s.memoizedState = Sn(1 | t, { destroy: void 0 }, a, n === void 0 ? null : n)));
  }
  function lr(e, t, a, n) {
    var s = st();
    n = n === void 0 ? null : n;
    var c = s.memoizedState.inst;
    $e !== null && n !== null && oc(n, $e.memoizedState.deps)
      ? (s.memoizedState = Sn(t, c, a, n))
      : ((we.flags |= e), (s.memoizedState = Sn(1 | t, c, a, n)));
  }
  function y_(e, t) {
    tr(8390656, 8, e, t);
  }
  function kc(e, t) {
    lr(2048, 8, e, t);
  }
  function uv(e) {
    we.flags |= 4;
    var t = we.updateQueue;
    if (t === null) ((t = Fs()), (we.updateQueue = t), (t.events = [e]));
    else {
      var a = t.events;
      a === null ? (t.events = [e]) : a.push(e);
    }
  }
  function b_(e) {
    var t = st().memoizedState;
    return (
      uv({ ref: t, nextImpl: e }),
      function () {
        if ((Oe & 2) !== 0) throw Error(o(440));
        return t.impl.apply(void 0, arguments);
      }
    );
  }
  function x_(e, t) {
    return lr(4, 2, e, t);
  }
  function S_(e, t) {
    return lr(4, 4, e, t);
  }
  function w_(e, t) {
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
  function T_(e, t, a) {
    ((a = a != null ? a.concat([e]) : null), lr(4, 4, w_.bind(null, t, e), a));
  }
  function vc() {}
  function N_(e, t) {
    var a = st();
    t = t === void 0 ? null : t;
    var n = a.memoizedState;
    return t !== null && oc(t, n[1]) ? n[0] : ((a.memoizedState = [e, t]), e);
  }
  function j_(e, t) {
    var a = st();
    t = t === void 0 ? null : t;
    var n = a.memoizedState;
    if (t !== null && oc(t, n[1])) return n[0];
    if (((n = e()), Ha)) {
      ue(!0);
      try {
        e();
      } finally {
        ue(!1);
      }
    }
    return ((a.memoizedState = [n, t]), n);
  }
  function yc(e, t, a) {
    return a === void 0 || ((Ll & 1073741824) !== 0 && (Ae & 261930) === 0)
      ? (e.memoizedState = t)
      : ((e.memoizedState = a), (e = Cf()), (we.lanes |= e), (ua |= e), a);
  }
  function E_(e, t, a, n) {
    return Ot(a, t)
      ? a
      : yn.current !== null
        ? ((e = yc(e, a, n)), Ot(e, t) || (ut = !0), e)
        : (Ll & 42) === 0 || ((Ll & 1073741824) !== 0 && (Ae & 261930) === 0)
          ? ((ut = !0), (e.memoizedState = a))
          : ((e = Cf()), (we.lanes |= e), (ua |= e), t);
  }
  function C_(e, t, a, n, s) {
    var c = le.p;
    le.p = c !== 0 && 8 > c ? c : 8;
    var _ = O.T,
      v = {};
    ((O.T = v), Sc(e, !1, t, a));
    try {
      var T = s(),
        H = O.S;
      if (
        (H !== null && H(v, T), T !== null && typeof T == 'object' && typeof T.then == 'function')
      ) {
        var Q = iv(T, n);
        Ei(e, t, Q, $t(e));
      } else Ei(e, t, n, $t(e));
    } catch (F) {
      Ei(e, t, { then: function () {}, status: 'rejected', reason: F }, $t());
    } finally {
      ((le.p = c), _ !== null && v.types !== null && (_.types = v.types), (O.T = _));
    }
  }
  function dv() {}
  function bc(e, t, a, n) {
    if (e.tag !== 5) throw Error(o(476));
    var s = A_(e).queue;
    C_(
      e,
      s,
      t,
      re,
      a === null
        ? dv
        : function () {
            return (L_(e), a(n));
          }
    );
  }
  function A_(e) {
    var t = e.memoizedState;
    if (t !== null) return t;
    t = {
      memoizedState: re,
      baseState: re,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: ql,
        lastRenderedState: re,
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
          lastRenderedReducer: ql,
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
  function L_(e) {
    var t = A_(e);
    (t.next === null && (t = e.alternate.memoizedState), Ei(e, t.next.queue, {}, $t()));
  }
  function xc() {
    return bt(Xi);
  }
  function q_() {
    return st().memoizedState;
  }
  function B_() {
    return st().memoizedState;
  }
  function mv(e) {
    for (var t = e.return; t !== null; ) {
      switch (t.tag) {
        case 24:
        case 3:
          var a = $t();
          e = na(a);
          var n = ia(t, e, a);
          (n !== null && (Mt(n, t, a), Si(n, t, a)), (t = { cache: Po() }), (e.payload = t));
          return;
      }
      t = t.return;
    }
  }
  function _v(e, t, a) {
    var n = $t();
    ((a = {
      lane: n,
      revertLane: 0,
      gesture: null,
      action: a,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    }),
      ar(e) ? M_(t, a) : ((a = Ho(e, t, a, n)), a !== null && (Mt(a, e, n), O_(a, t, n))));
  }
  function I_(e, t, a) {
    var n = $t();
    Ei(e, t, a, n);
  }
  function Ei(e, t, a, n) {
    var s = {
      lane: n,
      revertLane: 0,
      gesture: null,
      action: a,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    };
    if (ar(e)) M_(t, s);
    else {
      var c = e.alternate;
      if (
        e.lanes === 0 &&
        (c === null || c.lanes === 0) &&
        ((c = t.lastRenderedReducer), c !== null)
      )
        try {
          var _ = t.lastRenderedState,
            v = c(_, a);
          if (((s.hasEagerState = !0), (s.eagerState = v), Ot(v, _)))
            return (Rs(e, t, s, 0), Ve === null && Os(), !1);
        } catch {
        } finally {
        }
      if (((a = Ho(e, t, s, n)), a !== null)) return (Mt(a, e, n), O_(a, t, n), !0);
    }
    return !1;
  }
  function Sc(e, t, a, n) {
    if (
      ((n = {
        lane: 2,
        revertLane: tu(),
        gesture: null,
        action: n,
        hasEagerState: !1,
        eagerState: null,
        next: null,
      }),
      ar(e))
    ) {
      if (t) throw Error(o(479));
    } else ((t = Ho(e, a, n, 2)), t !== null && Mt(t, e, 2));
  }
  function ar(e) {
    var t = e.alternate;
    return e === we || (t !== null && t === we);
  }
  function M_(e, t) {
    bn = Js = !0;
    var a = e.pending;
    (a === null ? (t.next = t) : ((t.next = a.next), (a.next = t)), (e.pending = t));
  }
  function O_(e, t, a) {
    if ((a & 4194048) !== 0) {
      var n = t.lanes;
      ((n &= e.pendingLanes), (a |= n), (t.lanes = a), Ud(e, a));
    }
  }
  var Ci = {
    readContext: bt,
    use: Ws,
    useCallback: at,
    useContext: at,
    useEffect: at,
    useImperativeHandle: at,
    useLayoutEffect: at,
    useInsertionEffect: at,
    useMemo: at,
    useReducer: at,
    useRef: at,
    useState: at,
    useDebugValue: at,
    useDeferredValue: at,
    useTransition: at,
    useSyncExternalStore: at,
    useId: at,
    useHostTransitionStatus: at,
    useFormState: at,
    useActionState: at,
    useOptimistic: at,
    useMemoCache: at,
    useCacheRefresh: at,
  };
  Ci.useEffectEvent = at;
  var R_ = {
      readContext: bt,
      use: Ws,
      useCallback: function (e, t) {
        return ((Et().memoizedState = [e, t === void 0 ? null : t]), e);
      },
      useContext: bt,
      useEffect: y_,
      useImperativeHandle: function (e, t, a) {
        ((a = a != null ? a.concat([e]) : null), tr(4194308, 4, w_.bind(null, t, e), a));
      },
      useLayoutEffect: function (e, t) {
        return tr(4194308, 4, e, t);
      },
      useInsertionEffect: function (e, t) {
        tr(4, 2, e, t);
      },
      useMemo: function (e, t) {
        var a = Et();
        t = t === void 0 ? null : t;
        var n = e();
        if (Ha) {
          ue(!0);
          try {
            e();
          } finally {
            ue(!1);
          }
        }
        return ((a.memoizedState = [n, t]), n);
      },
      useReducer: function (e, t, a) {
        var n = Et();
        if (a !== void 0) {
          var s = a(t);
          if (Ha) {
            ue(!0);
            try {
              a(t);
            } finally {
              ue(!1);
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
          (e = e.dispatch = _v.bind(null, we, e)),
          [n.memoizedState, e]
        );
      },
      useRef: function (e) {
        var t = Et();
        return ((e = { current: e }), (t.memoizedState = e));
      },
      useState: function (e) {
        e = hc(e);
        var t = e.queue,
          a = I_.bind(null, we, t);
        return ((t.dispatch = a), [e.memoizedState, a]);
      },
      useDebugValue: vc,
      useDeferredValue: function (e, t) {
        var a = Et();
        return yc(a, e, t);
      },
      useTransition: function () {
        var e = hc(!1);
        return ((e = C_.bind(null, we, e.queue, !0, !1)), (Et().memoizedState = e), [!1, e]);
      },
      useSyncExternalStore: function (e, t, a) {
        var n = we,
          s = Et();
        if (qe) {
          if (a === void 0) throw Error(o(407));
          a = a();
        } else {
          if (((a = t()), Ve === null)) throw Error(o(349));
          (Ae & 127) !== 0 || n_(n, t, a);
        }
        s.memoizedState = a;
        var c = { value: a, getSnapshot: t };
        return (
          (s.queue = c),
          y_(s_.bind(null, n, c, e), [e]),
          (n.flags |= 2048),
          Sn(9, { destroy: void 0 }, i_.bind(null, n, c, a, t), null),
          a
        );
      },
      useId: function () {
        var e = Et(),
          t = Ve.identifierPrefix;
        if (qe) {
          var a = vl,
            n = kl;
          ((a = (n & ~(1 << (32 - Te(n) - 1))).toString(32) + a),
            (t = '_' + t + 'R_' + a),
            (a = Ps++),
            0 < a && (t += 'H' + a.toString(32)),
            (t += '_'));
        } else ((a = sv++), (t = '_' + t + 'r_' + a.toString(32) + '_'));
        return (e.memoizedState = t);
      },
      useHostTransitionStatus: xc,
      useFormState: p_,
      useActionState: p_,
      useOptimistic: function (e) {
        var t = Et();
        t.memoizedState = t.baseState = e;
        var a = {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: null,
          lastRenderedState: null,
        };
        return ((t.queue = a), (t = Sc.bind(null, we, !0, a)), (a.dispatch = t), [e, t]);
      },
      useMemoCache: _c,
      useCacheRefresh: function () {
        return (Et().memoizedState = mv.bind(null, we));
      },
      useEffectEvent: function (e) {
        var t = Et(),
          a = { impl: e };
        return (
          (t.memoizedState = a),
          function () {
            if ((Oe & 2) !== 0) throw Error(o(440));
            return a.impl.apply(void 0, arguments);
          }
        );
      },
    },
    wc = {
      readContext: bt,
      use: Ws,
      useCallback: N_,
      useContext: bt,
      useEffect: kc,
      useImperativeHandle: T_,
      useInsertionEffect: x_,
      useLayoutEffect: S_,
      useMemo: j_,
      useReducer: er,
      useRef: v_,
      useState: function () {
        return er(ql);
      },
      useDebugValue: vc,
      useDeferredValue: function (e, t) {
        var a = st();
        return E_(a, $e.memoizedState, e, t);
      },
      useTransition: function () {
        var e = er(ql)[0],
          t = st().memoizedState;
        return [typeof e == 'boolean' ? e : ji(e), t];
      },
      useSyncExternalStore: a_,
      useId: q_,
      useHostTransitionStatus: xc,
      useFormState: h_,
      useActionState: h_,
      useOptimistic: function (e, t) {
        var a = st();
        return c_(a, $e, e, t);
      },
      useMemoCache: _c,
      useCacheRefresh: B_,
    };
  wc.useEffectEvent = b_;
  var D_ = {
    readContext: bt,
    use: Ws,
    useCallback: N_,
    useContext: bt,
    useEffect: kc,
    useImperativeHandle: T_,
    useInsertionEffect: x_,
    useLayoutEffect: S_,
    useMemo: j_,
    useReducer: pc,
    useRef: v_,
    useState: function () {
      return pc(ql);
    },
    useDebugValue: vc,
    useDeferredValue: function (e, t) {
      var a = st();
      return $e === null ? yc(a, e, t) : E_(a, $e.memoizedState, e, t);
    },
    useTransition: function () {
      var e = pc(ql)[0],
        t = st().memoizedState;
      return [typeof e == 'boolean' ? e : ji(e), t];
    },
    useSyncExternalStore: a_,
    useId: q_,
    useHostTransitionStatus: xc,
    useFormState: k_,
    useActionState: k_,
    useOptimistic: function (e, t) {
      var a = st();
      return $e !== null ? c_(a, $e, e, t) : ((a.baseState = e), [e, a.queue.dispatch]);
    },
    useMemoCache: _c,
    useCacheRefresh: B_,
  };
  D_.useEffectEvent = b_;
  function Tc(e, t, a, n) {
    ((t = e.memoizedState),
      (a = a(n, t)),
      (a = a == null ? t : k({}, t, a)),
      (e.memoizedState = a),
      e.lanes === 0 && (e.updateQueue.baseState = a));
  }
  var Nc = {
    enqueueSetState: function (e, t, a) {
      e = e._reactInternals;
      var n = $t(),
        s = na(n);
      ((s.payload = t),
        a != null && (s.callback = a),
        (t = ia(e, s, n)),
        t !== null && (Mt(t, e, n), Si(t, e, n)));
    },
    enqueueReplaceState: function (e, t, a) {
      e = e._reactInternals;
      var n = $t(),
        s = na(n);
      ((s.tag = 1),
        (s.payload = t),
        a != null && (s.callback = a),
        (t = ia(e, s, n)),
        t !== null && (Mt(t, e, n), Si(t, e, n)));
    },
    enqueueForceUpdate: function (e, t) {
      e = e._reactInternals;
      var a = $t(),
        n = na(a);
      ((n.tag = 2),
        t != null && (n.callback = t),
        (t = ia(e, n, a)),
        t !== null && (Mt(t, e, a), Si(t, e, a)));
    },
  };
  function z_(e, t, a, n, s, c, _) {
    return (
      (e = e.stateNode),
      typeof e.shouldComponentUpdate == 'function'
        ? e.shouldComponentUpdate(n, c, _)
        : t.prototype && t.prototype.isPureReactComponent
          ? !pi(a, n) || !pi(s, c)
          : !0
    );
  }
  function H_(e, t, a, n) {
    ((e = t.state),
      typeof t.componentWillReceiveProps == 'function' && t.componentWillReceiveProps(a, n),
      typeof t.UNSAFE_componentWillReceiveProps == 'function' &&
        t.UNSAFE_componentWillReceiveProps(a, n),
      t.state !== e && Nc.enqueueReplaceState(t, t.state, null));
  }
  function Ua(e, t) {
    var a = t;
    if ('ref' in t) {
      a = {};
      for (var n in t) n !== 'ref' && (a[n] = t[n]);
    }
    if ((e = e.defaultProps)) {
      a === t && (a = k({}, a));
      for (var s in e) a[s] === void 0 && (a[s] = e[s]);
    }
    return a;
  }
  function U_(e) {
    Ms(e);
  }
  function $_(e) {
    console.error(e);
  }
  function G_(e) {
    Ms(e);
  }
  function nr(e, t) {
    try {
      var a = e.onUncaughtError;
      a(t.value, { componentStack: t.stack });
    } catch (n) {
      setTimeout(function () {
        throw n;
      });
    }
  }
  function Y_(e, t, a) {
    try {
      var n = e.onCaughtError;
      n(a.value, { componentStack: a.stack, errorBoundary: t.tag === 1 ? t.stateNode : null });
    } catch (s) {
      setTimeout(function () {
        throw s;
      });
    }
  }
  function jc(e, t, a) {
    return (
      (a = na(a)),
      (a.tag = 3),
      (a.payload = { element: null }),
      (a.callback = function () {
        nr(e, t);
      }),
      a
    );
  }
  function X_(e) {
    return ((e = na(e)), (e.tag = 3), e);
  }
  function V_(e, t, a, n) {
    var s = a.type.getDerivedStateFromError;
    if (typeof s == 'function') {
      var c = n.value;
      ((e.payload = function () {
        return s(c);
      }),
        (e.callback = function () {
          Y_(t, a, n);
        }));
    }
    var _ = a.stateNode;
    _ !== null &&
      typeof _.componentDidCatch == 'function' &&
      (e.callback = function () {
        (Y_(t, a, n),
          typeof s != 'function' && (da === null ? (da = new Set([this])) : da.add(this)));
        var v = n.stack;
        this.componentDidCatch(n.value, { componentStack: v !== null ? v : '' });
      });
  }
  function fv(e, t, a, n, s) {
    if (((a.flags |= 32768), n !== null && typeof n == 'object' && typeof n.then == 'function')) {
      if (((t = a.alternate), t !== null && pn(t, a, s, !0), (a = Dt.current), a !== null)) {
        switch (a.tag) {
          case 31:
          case 13:
            return (
              Ft === null ? hr() : a.alternate === null && nt === 0 && (nt = 3),
              (a.flags &= -257),
              (a.flags |= 65536),
              (a.lanes = s),
              n === Xs
                ? (a.flags |= 16384)
                : ((t = a.updateQueue),
                  t === null ? (a.updateQueue = new Set([n])) : t.add(n),
                  Fc(e, n, s)),
              !1
            );
          case 22:
            return (
              (a.flags |= 65536),
              n === Xs
                ? (a.flags |= 16384)
                : ((t = a.updateQueue),
                  t === null
                    ? ((t = { transitions: null, markerInstances: null, retryQueue: new Set([n]) }),
                      (a.updateQueue = t))
                    : ((a = t.retryQueue), a === null ? (t.retryQueue = new Set([n])) : a.add(n)),
                  Fc(e, n, s)),
              !1
            );
        }
        throw Error(o(435, a.tag));
      }
      return (Fc(e, n, s), hr(), !1);
    }
    if (qe)
      return (
        (t = Dt.current),
        t !== null
          ? ((t.flags & 65536) === 0 && (t.flags |= 256),
            (t.flags |= 65536),
            (t.lanes = s),
            n !== Vo && ((e = Error(o(422), { cause: n })), ki(Kt(e, a))))
          : (n !== Vo && ((t = Error(o(423), { cause: n })), ki(Kt(t, a))),
            (e = e.current.alternate),
            (e.flags |= 65536),
            (s &= -s),
            (e.lanes |= s),
            (n = Kt(n, a)),
            (s = jc(e.stateNode, n, s)),
            ac(e, s),
            nt !== 4 && (nt = 2)),
        !1
      );
    var c = Error(o(520), { cause: n });
    if (((c = Kt(c, a)), Ri === null ? (Ri = [c]) : Ri.push(c), nt !== 4 && (nt = 2), t === null))
      return !0;
    ((n = Kt(n, a)), (a = t));
    do {
      switch (a.tag) {
        case 3:
          return (
            (a.flags |= 65536),
            (e = s & -s),
            (a.lanes |= e),
            (e = jc(a.stateNode, n, e)),
            ac(a, e),
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
                  (da === null || !da.has(c)))))
          )
            return (
              (a.flags |= 65536),
              (s &= -s),
              (a.lanes |= s),
              (s = X_(s)),
              V_(s, e, a, n),
              ac(a, s),
              !1
            );
      }
      a = a.return;
    } while (a !== null);
    return !1;
  }
  var Ec = Error(o(461)),
    ut = !1;
  function xt(e, t, a, n) {
    t.child = e === null ? Jm(t, null, a, n) : za(t, e.child, a, n);
  }
  function Q_(e, t, a, n, s) {
    a = a.render;
    var c = t.ref;
    if ('ref' in n) {
      var _ = {};
      for (var v in n) v !== 'ref' && (_[v] = n[v]);
    } else _ = n;
    return (
      Ma(t),
      (n = cc(e, t, a, _, c, s)),
      (v = uc()),
      e !== null && !ut
        ? (dc(e, t, s), Bl(e, t, s))
        : (qe && v && Yo(t), (t.flags |= 1), xt(e, t, n, s), t.child)
    );
  }
  function K_(e, t, a, n, s) {
    if (e === null) {
      var c = a.type;
      return typeof c == 'function' && !Uo(c) && c.defaultProps === void 0 && a.compare === null
        ? ((t.tag = 15), (t.type = c), Z_(e, t, c, n, s))
        : ((e = zs(a.type, null, n, t, t.mode, s)), (e.ref = t.ref), (e.return = t), (t.child = e));
    }
    if (((c = e.child), !Oc(e, s))) {
      var _ = c.memoizedProps;
      if (((a = a.compare), (a = a !== null ? a : pi), a(_, n) && e.ref === t.ref))
        return Bl(e, t, s);
    }
    return ((t.flags |= 1), (e = jl(c, n)), (e.ref = t.ref), (e.return = t), (t.child = e));
  }
  function Z_(e, t, a, n, s) {
    if (e !== null) {
      var c = e.memoizedProps;
      if (pi(c, n) && e.ref === t.ref)
        if (((ut = !1), (t.pendingProps = n = c), Oc(e, s))) (e.flags & 131072) !== 0 && (ut = !0);
        else return ((t.lanes = e.lanes), Bl(e, t, s));
    }
    return Cc(e, t, a, n, s);
  }
  function J_(e, t, a, n) {
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
        return P_(e, t, c, a, n);
      }
      if ((a & 536870912) !== 0)
        ((t.memoizedState = { baseLanes: 0, cachePool: null }),
          e !== null && Gs(t, c !== null ? c.cachePool : null),
          c !== null ? Wm(t, c) : ic(),
          e_(t));
      else return ((n = t.lanes = 536870912), P_(e, t, c !== null ? c.baseLanes | a : a, a, n));
    } else
      c !== null
        ? (Gs(t, c.cachePool), Wm(t, c), ra(), (t.memoizedState = null))
        : (e !== null && Gs(t, null), ic(), ra());
    return (xt(e, t, s, a), t.child);
  }
  function Ai(e, t) {
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
  function P_(e, t, a, n, s) {
    var c = Wo();
    return (
      (c = c === null ? null : { parent: ot._currentValue, pool: c }),
      (t.memoizedState = { baseLanes: a, cachePool: c }),
      e !== null && Gs(t, null),
      ic(),
      e_(t),
      e !== null && pn(e, t, n, !0),
      (t.childLanes = s),
      null
    );
  }
  function ir(e, t) {
    return (
      (t = rr({ mode: t.mode, children: t.children }, e.mode)),
      (t.ref = e.ref),
      (e.child = t),
      (t.return = e),
      t
    );
  }
  function F_(e, t, a) {
    return (
      za(t, e.child, null, a),
      (e = ir(t, t.pendingProps)),
      (e.flags |= 2),
      zt(t),
      (t.memoizedState = null),
      e
    );
  }
  function pv(e, t, a) {
    var n = t.pendingProps,
      s = (t.flags & 128) !== 0;
    if (((t.flags &= -129), e === null)) {
      if (qe) {
        if (n.mode === 'hidden') return ((e = ir(t, n)), (t.lanes = 536870912), Ai(null, e));
        if (
          (rc(t),
          (e = Ze)
            ? ((e = dp(e, Pt)),
              (e = e !== null && e.data === '&' ? e : null),
              e !== null &&
                ((t.memoizedState = {
                  dehydrated: e,
                  treeContext: Wl !== null ? { id: kl, overflow: vl } : null,
                  retryLane: 536870912,
                  hydrationErrors: null,
                }),
                (a = Mm(e)),
                (a.return = t),
                (t.child = a),
                (yt = t),
                (Ze = null)))
            : (e = null),
          e === null)
        )
          throw ta(t);
        return ((t.lanes = 536870912), null);
      }
      return ir(t, n);
    }
    var c = e.memoizedState;
    if (c !== null) {
      var _ = c.dehydrated;
      if ((rc(t), s))
        if (t.flags & 256) ((t.flags &= -257), (t = F_(e, t, a)));
        else if (t.memoizedState !== null) ((t.child = e.child), (t.flags |= 128), (t = null));
        else throw Error(o(558));
      else if ((ut || pn(e, t, a, !1), (s = (a & e.childLanes) !== 0), ut || s)) {
        if (((n = Ve), n !== null && ((_ = $d(n, a)), _ !== 0 && _ !== c.retryLane)))
          throw ((c.retryLane = _), La(e, _), Mt(n, e, _), Ec);
        (hr(), (t = F_(e, t, a)));
      } else
        ((e = c.treeContext),
          (Ze = Wt(_.nextSibling)),
          (yt = t),
          (qe = !0),
          (ea = null),
          (Pt = !1),
          e !== null && Dm(t, e),
          (t = ir(t, n)),
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
  function sr(e, t) {
    var a = t.ref;
    if (a === null) e !== null && e.ref !== null && (t.flags |= 4194816);
    else {
      if (typeof a != 'function' && typeof a != 'object') throw Error(o(284));
      (e === null || e.ref !== a) && (t.flags |= 4194816);
    }
  }
  function Cc(e, t, a, n, s) {
    return (
      Ma(t),
      (a = cc(e, t, a, n, void 0, s)),
      (n = uc()),
      e !== null && !ut
        ? (dc(e, t, s), Bl(e, t, s))
        : (qe && n && Yo(t), (t.flags |= 1), xt(e, t, a, s), t.child)
    );
  }
  function W_(e, t, a, n, s, c) {
    return (
      Ma(t),
      (t.updateQueue = null),
      (a = l_(t, n, a, s)),
      t_(e),
      (n = uc()),
      e !== null && !ut
        ? (dc(e, t, c), Bl(e, t, c))
        : (qe && n && Yo(t), (t.flags |= 1), xt(e, t, a, c), t.child)
    );
  }
  function ef(e, t, a, n, s) {
    if ((Ma(t), t.stateNode === null)) {
      var c = dn,
        _ = a.contextType;
      (typeof _ == 'object' && _ !== null && (c = bt(_)),
        (c = new a(n, c)),
        (t.memoizedState = c.state !== null && c.state !== void 0 ? c.state : null),
        (c.updater = Nc),
        (t.stateNode = c),
        (c._reactInternals = t),
        (c = t.stateNode),
        (c.props = n),
        (c.state = t.memoizedState),
        (c.refs = {}),
        tc(t),
        (_ = a.contextType),
        (c.context = typeof _ == 'object' && _ !== null ? bt(_) : dn),
        (c.state = t.memoizedState),
        (_ = a.getDerivedStateFromProps),
        typeof _ == 'function' && (Tc(t, a, _, n), (c.state = t.memoizedState)),
        typeof a.getDerivedStateFromProps == 'function' ||
          typeof c.getSnapshotBeforeUpdate == 'function' ||
          (typeof c.UNSAFE_componentWillMount != 'function' &&
            typeof c.componentWillMount != 'function') ||
          ((_ = c.state),
          typeof c.componentWillMount == 'function' && c.componentWillMount(),
          typeof c.UNSAFE_componentWillMount == 'function' && c.UNSAFE_componentWillMount(),
          _ !== c.state && Nc.enqueueReplaceState(c, c.state, null),
          Ti(t, n, c, s),
          wi(),
          (c.state = t.memoizedState)),
        typeof c.componentDidMount == 'function' && (t.flags |= 4194308),
        (n = !0));
    } else if (e === null) {
      c = t.stateNode;
      var v = t.memoizedProps,
        T = Ua(a, v);
      c.props = T;
      var H = c.context,
        Q = a.contextType;
      ((_ = dn), typeof Q == 'object' && Q !== null && (_ = bt(Q)));
      var F = a.getDerivedStateFromProps;
      ((Q = typeof F == 'function' || typeof c.getSnapshotBeforeUpdate == 'function'),
        (v = t.pendingProps !== v),
        Q ||
          (typeof c.UNSAFE_componentWillReceiveProps != 'function' &&
            typeof c.componentWillReceiveProps != 'function') ||
          ((v || H !== _) && H_(t, c, n, _)),
        (aa = !1));
      var $ = t.memoizedState;
      ((c.state = $),
        Ti(t, n, c, s),
        wi(),
        (H = t.memoizedState),
        v || $ !== H || aa
          ? (typeof F == 'function' && (Tc(t, a, F, n), (H = t.memoizedState)),
            (T = aa || z_(t, a, T, n, $, H, _))
              ? (Q ||
                  (typeof c.UNSAFE_componentWillMount != 'function' &&
                    typeof c.componentWillMount != 'function') ||
                  (typeof c.componentWillMount == 'function' && c.componentWillMount(),
                  typeof c.UNSAFE_componentWillMount == 'function' &&
                    c.UNSAFE_componentWillMount()),
                typeof c.componentDidMount == 'function' && (t.flags |= 4194308))
              : (typeof c.componentDidMount == 'function' && (t.flags |= 4194308),
                (t.memoizedProps = n),
                (t.memoizedState = H)),
            (c.props = n),
            (c.state = H),
            (c.context = _),
            (n = T))
          : (typeof c.componentDidMount == 'function' && (t.flags |= 4194308), (n = !1)));
    } else {
      ((c = t.stateNode),
        lc(e, t),
        (_ = t.memoizedProps),
        (Q = Ua(a, _)),
        (c.props = Q),
        (F = t.pendingProps),
        ($ = c.context),
        (H = a.contextType),
        (T = dn),
        typeof H == 'object' && H !== null && (T = bt(H)),
        (v = a.getDerivedStateFromProps),
        (H = typeof v == 'function' || typeof c.getSnapshotBeforeUpdate == 'function') ||
          (typeof c.UNSAFE_componentWillReceiveProps != 'function' &&
            typeof c.componentWillReceiveProps != 'function') ||
          ((_ !== F || $ !== T) && H_(t, c, n, T)),
        (aa = !1),
        ($ = t.memoizedState),
        (c.state = $),
        Ti(t, n, c, s),
        wi());
      var Y = t.memoizedState;
      _ !== F || $ !== Y || aa || (e !== null && e.dependencies !== null && Us(e.dependencies))
        ? (typeof v == 'function' && (Tc(t, a, v, n), (Y = t.memoizedState)),
          (Q =
            aa ||
            z_(t, a, Q, n, $, Y, T) ||
            (e !== null && e.dependencies !== null && Us(e.dependencies)))
            ? (H ||
                (typeof c.UNSAFE_componentWillUpdate != 'function' &&
                  typeof c.componentWillUpdate != 'function') ||
                (typeof c.componentWillUpdate == 'function' && c.componentWillUpdate(n, Y, T),
                typeof c.UNSAFE_componentWillUpdate == 'function' &&
                  c.UNSAFE_componentWillUpdate(n, Y, T)),
              typeof c.componentDidUpdate == 'function' && (t.flags |= 4),
              typeof c.getSnapshotBeforeUpdate == 'function' && (t.flags |= 1024))
            : (typeof c.componentDidUpdate != 'function' ||
                (_ === e.memoizedProps && $ === e.memoizedState) ||
                (t.flags |= 4),
              typeof c.getSnapshotBeforeUpdate != 'function' ||
                (_ === e.memoizedProps && $ === e.memoizedState) ||
                (t.flags |= 1024),
              (t.memoizedProps = n),
              (t.memoizedState = Y)),
          (c.props = n),
          (c.state = Y),
          (c.context = T),
          (n = Q))
        : (typeof c.componentDidUpdate != 'function' ||
            (_ === e.memoizedProps && $ === e.memoizedState) ||
            (t.flags |= 4),
          typeof c.getSnapshotBeforeUpdate != 'function' ||
            (_ === e.memoizedProps && $ === e.memoizedState) ||
            (t.flags |= 1024),
          (n = !1));
    }
    return (
      (c = n),
      sr(e, t),
      (n = (t.flags & 128) !== 0),
      c || n
        ? ((c = t.stateNode),
          (a = n && typeof a.getDerivedStateFromError != 'function' ? null : c.render()),
          (t.flags |= 1),
          e !== null && n
            ? ((t.child = za(t, e.child, null, s)), (t.child = za(t, null, a, s)))
            : xt(e, t, a, s),
          (t.memoizedState = c.state),
          (e = t.child))
        : (e = Bl(e, t, s)),
      e
    );
  }
  function tf(e, t, a, n) {
    return (Ba(), (t.flags |= 256), xt(e, t, a, n), t.child);
  }
  var Ac = { dehydrated: null, treeContext: null, retryLane: 0, hydrationErrors: null };
  function Lc(e) {
    return { baseLanes: e, cachePool: Ym() };
  }
  function qc(e, t, a) {
    return ((e = e !== null ? e.childLanes & ~a : 0), t && (e |= Ut), e);
  }
  function lf(e, t, a) {
    var n = t.pendingProps,
      s = !1,
      c = (t.flags & 128) !== 0,
      _;
    if (
      ((_ = c) || (_ = e !== null && e.memoizedState === null ? !1 : (it.current & 2) !== 0),
      _ && ((s = !0), (t.flags &= -129)),
      (_ = (t.flags & 32) !== 0),
      (t.flags &= -33),
      e === null)
    ) {
      if (qe) {
        if (
          (s ? sa(t) : ra(),
          (e = Ze)
            ? ((e = dp(e, Pt)),
              (e = e !== null && e.data !== '&' ? e : null),
              e !== null &&
                ((t.memoizedState = {
                  dehydrated: e,
                  treeContext: Wl !== null ? { id: kl, overflow: vl } : null,
                  retryLane: 536870912,
                  hydrationErrors: null,
                }),
                (a = Mm(e)),
                (a.return = t),
                (t.child = a),
                (yt = t),
                (Ze = null)))
            : (e = null),
          e === null)
        )
          throw ta(t);
        return (fu(e) ? (t.lanes = 32) : (t.lanes = 536870912), null);
      }
      var v = n.children;
      return (
        (n = n.fallback),
        s
          ? (ra(),
            (s = t.mode),
            (v = rr({ mode: 'hidden', children: v }, s)),
            (n = qa(n, s, a, null)),
            (v.return = t),
            (n.return = t),
            (v.sibling = n),
            (t.child = v),
            (n = t.child),
            (n.memoizedState = Lc(a)),
            (n.childLanes = qc(e, _, a)),
            (t.memoizedState = Ac),
            Ai(null, n))
          : (sa(t), Bc(t, v))
      );
    }
    var T = e.memoizedState;
    if (T !== null && ((v = T.dehydrated), v !== null)) {
      if (c)
        t.flags & 256
          ? (sa(t), (t.flags &= -257), (t = Ic(e, t, a)))
          : t.memoizedState !== null
            ? (ra(), (t.child = e.child), (t.flags |= 128), (t = null))
            : (ra(),
              (v = n.fallback),
              (s = t.mode),
              (n = rr({ mode: 'visible', children: n.children }, s)),
              (v = qa(v, s, a, null)),
              (v.flags |= 2),
              (n.return = t),
              (v.return = t),
              (n.sibling = v),
              (t.child = n),
              za(t, e.child, null, a),
              (n = t.child),
              (n.memoizedState = Lc(a)),
              (n.childLanes = qc(e, _, a)),
              (t.memoizedState = Ac),
              (t = Ai(null, n)));
      else if ((sa(t), fu(v))) {
        if (((_ = v.nextSibling && v.nextSibling.dataset), _)) var H = _.dgst;
        ((_ = H),
          (n = Error(o(419))),
          (n.stack = ''),
          (n.digest = _),
          ki({ value: n, source: null, stack: null }),
          (t = Ic(e, t, a)));
      } else if ((ut || pn(e, t, a, !1), (_ = (a & e.childLanes) !== 0), ut || _)) {
        if (((_ = Ve), _ !== null && ((n = $d(_, a)), n !== 0 && n !== T.retryLane)))
          throw ((T.retryLane = n), La(e, n), Mt(_, e, n), Ec);
        (_u(v) || hr(), (t = Ic(e, t, a)));
      } else
        _u(v)
          ? ((t.flags |= 192), (t.child = e.child), (t = null))
          : ((e = T.treeContext),
            (Ze = Wt(v.nextSibling)),
            (yt = t),
            (qe = !0),
            (ea = null),
            (Pt = !1),
            e !== null && Dm(t, e),
            (t = Bc(t, n.children)),
            (t.flags |= 4096));
      return t;
    }
    return s
      ? (ra(),
        (v = n.fallback),
        (s = t.mode),
        (T = e.child),
        (H = T.sibling),
        (n = jl(T, { mode: 'hidden', children: n.children })),
        (n.subtreeFlags = T.subtreeFlags & 65011712),
        H !== null ? (v = jl(H, v)) : ((v = qa(v, s, a, null)), (v.flags |= 2)),
        (v.return = t),
        (n.return = t),
        (n.sibling = v),
        (t.child = n),
        Ai(null, n),
        (n = t.child),
        (v = e.child.memoizedState),
        v === null
          ? (v = Lc(a))
          : ((s = v.cachePool),
            s !== null
              ? ((T = ot._currentValue), (s = s.parent !== T ? { parent: T, pool: T } : s))
              : (s = Ym()),
            (v = { baseLanes: v.baseLanes | a, cachePool: s })),
        (n.memoizedState = v),
        (n.childLanes = qc(e, _, a)),
        (t.memoizedState = Ac),
        Ai(e.child, n))
      : (sa(t),
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
  function Bc(e, t) {
    return ((t = rr({ mode: 'visible', children: t }, e.mode)), (t.return = e), (e.child = t));
  }
  function rr(e, t) {
    return ((e = Rt(22, e, null, t)), (e.lanes = 0), e);
  }
  function Ic(e, t, a) {
    return (
      za(t, e.child, null, a),
      (e = Bc(t, t.pendingProps.children)),
      (e.flags |= 2),
      (t.memoizedState = null),
      e
    );
  }
  function af(e, t, a) {
    e.lanes |= t;
    var n = e.alternate;
    (n !== null && (n.lanes |= t), Zo(e.return, t, a));
  }
  function Mc(e, t, a, n, s, c) {
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
  function nf(e, t, a) {
    var n = t.pendingProps,
      s = n.revealOrder,
      c = n.tail;
    n = n.children;
    var _ = it.current,
      v = (_ & 2) !== 0;
    if (
      (v ? ((_ = (_ & 1) | 2), (t.flags |= 128)) : (_ &= 1),
      X(it, _),
      xt(e, t, n, a),
      (n = qe ? gi : 0),
      !v && e !== null && (e.flags & 128) !== 0)
    )
      e: for (e = t.child; e !== null; ) {
        if (e.tag === 13) e.memoizedState !== null && af(e, a, t);
        else if (e.tag === 19) af(e, a, t);
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
          ((e = a.alternate), e !== null && Zs(e) === null && (s = a), (a = a.sibling));
        ((a = s),
          a === null ? ((s = t.child), (t.child = null)) : ((s = a.sibling), (a.sibling = null)),
          Mc(t, !1, s, a, c, n));
        break;
      case 'backwards':
      case 'unstable_legacy-backwards':
        for (a = null, s = t.child, t.child = null; s !== null; ) {
          if (((e = s.alternate), e !== null && Zs(e) === null)) {
            t.child = s;
            break;
          }
          ((e = s.sibling), (s.sibling = a), (a = s), (s = e));
        }
        Mc(t, !0, a, null, c, n);
        break;
      case 'together':
        Mc(t, !1, null, null, void 0, n);
        break;
      default:
        t.memoizedState = null;
    }
    return t.child;
  }
  function Bl(e, t, a) {
    if (
      (e !== null && (t.dependencies = e.dependencies), (ua |= t.lanes), (a & t.childLanes) === 0)
    )
      if (e !== null) {
        if ((pn(e, t, a, !1), (a & t.childLanes) === 0)) return null;
      } else return null;
    if (e !== null && t.child !== e.child) throw Error(o(153));
    if (t.child !== null) {
      for (e = t.child, a = jl(e, e.pendingProps), t.child = a, a.return = t; e.sibling !== null; )
        ((e = e.sibling), (a = a.sibling = jl(e, e.pendingProps)), (a.return = t));
      a.sibling = null;
    }
    return t.child;
  }
  function Oc(e, t) {
    return (e.lanes & t) !== 0 ? !0 : ((e = e.dependencies), !!(e !== null && Us(e)));
  }
  function hv(e, t, a) {
    switch (t.tag) {
      case 3:
        (Re(t, t.stateNode.containerInfo), la(t, ot, e.memoizedState.cache), Ba());
        break;
      case 27:
      case 5:
        hl(t);
        break;
      case 4:
        Re(t, t.stateNode.containerInfo);
        break;
      case 10:
        la(t, t.type, t.memoizedProps.value);
        break;
      case 31:
        if (t.memoizedState !== null) return ((t.flags |= 128), rc(t), null);
        break;
      case 13:
        var n = t.memoizedState;
        if (n !== null)
          return n.dehydrated !== null
            ? (sa(t), (t.flags |= 128), null)
            : (a & t.child.childLanes) !== 0
              ? lf(e, t, a)
              : (sa(t), (e = Bl(e, t, a)), e !== null ? e.sibling : null);
        sa(t);
        break;
      case 19:
        var s = (e.flags & 128) !== 0;
        if (
          ((n = (a & t.childLanes) !== 0),
          n || (pn(e, t, a, !1), (n = (a & t.childLanes) !== 0)),
          s)
        ) {
          if (n) return nf(e, t, a);
          t.flags |= 128;
        }
        if (
          ((s = t.memoizedState),
          s !== null && ((s.rendering = null), (s.tail = null), (s.lastEffect = null)),
          X(it, it.current),
          n)
        )
          break;
        return null;
      case 22:
        return ((t.lanes = 0), J_(e, t, a, t.pendingProps));
      case 24:
        la(t, ot, e.memoizedState.cache);
    }
    return Bl(e, t, a);
  }
  function sf(e, t, a) {
    if (e !== null)
      if (e.memoizedProps !== t.pendingProps) ut = !0;
      else {
        if (!Oc(e, a) && (t.flags & 128) === 0) return ((ut = !1), hv(e, t, a));
        ut = (e.flags & 131072) !== 0;
      }
    else ((ut = !1), qe && (t.flags & 1048576) !== 0 && Rm(t, gi, t.index));
    switch (((t.lanes = 0), t.tag)) {
      case 16:
        e: {
          var n = t.pendingProps;
          if (((e = Ra(t.elementType)), (t.type = e), typeof e == 'function'))
            Uo(e)
              ? ((n = Ua(e, n)), (t.tag = 1), (t = ef(null, t, e, n, a)))
              : ((t.tag = 0), (t = Cc(null, t, e, n, a)));
          else {
            if (e != null) {
              var s = e.$$typeof;
              if (s === U) {
                ((t.tag = 11), (t = Q_(null, t, e, n, a)));
                break e;
              } else if (s === x) {
                ((t.tag = 14), (t = K_(null, t, e, n, a)));
                break e;
              }
            }
            throw ((t = D(e) || e), Error(o(306, t, '')));
          }
        }
        return t;
      case 0:
        return Cc(e, t, t.type, t.pendingProps, a);
      case 1:
        return ((n = t.type), (s = Ua(n, t.pendingProps)), ef(e, t, n, s, a));
      case 3:
        e: {
          if ((Re(t, t.stateNode.containerInfo), e === null)) throw Error(o(387));
          n = t.pendingProps;
          var c = t.memoizedState;
          ((s = c.element), lc(e, t), Ti(t, n, null, a));
          var _ = t.memoizedState;
          if (
            ((n = _.cache),
            la(t, ot, n),
            n !== c.cache && Jo(t, [ot], a, !0),
            wi(),
            (n = _.element),
            c.isDehydrated)
          )
            if (
              ((c = { element: n, isDehydrated: !1, cache: _.cache }),
              (t.updateQueue.baseState = c),
              (t.memoizedState = c),
              t.flags & 256)
            ) {
              t = tf(e, t, n, a);
              break e;
            } else if (n !== s) {
              ((s = Kt(Error(o(424)), t)), ki(s), (t = tf(e, t, n, a)));
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
                Ze = Wt(e.firstChild),
                  yt = t,
                  qe = !0,
                  ea = null,
                  Pt = !0,
                  a = Jm(t, null, n, a),
                  t.child = a;
                a;
              )
                ((a.flags = (a.flags & -3) | 4096), (a = a.sibling));
            }
          else {
            if ((Ba(), n === s)) {
              t = Bl(e, t, a);
              break e;
            }
            xt(e, t, n, a);
          }
          t = t.child;
        }
        return t;
      case 26:
        return (
          sr(e, t),
          e === null
            ? (a = gp(t.type, null, t.pendingProps, null))
              ? (t.memoizedState = a)
              : qe ||
                ((a = t.type),
                (e = t.pendingProps),
                (n = Sr(pe.current).createElement(a)),
                (n[vt] = t),
                (n[Ct] = e),
                St(n, a, e),
                ft(n),
                (t.stateNode = n))
            : (t.memoizedState = gp(t.type, e.memoizedProps, t.pendingProps, e.memoizedState)),
          null
        );
      case 27:
        return (
          hl(t),
          e === null &&
            qe &&
            ((n = t.stateNode = fp(t.type, t.pendingProps, pe.current)),
            (yt = t),
            (Pt = !0),
            (s = Ze),
            pa(t.type) ? ((pu = s), (Ze = Wt(n.firstChild))) : (Ze = s)),
          xt(e, t, t.pendingProps.children, a),
          sr(e, t),
          e === null && (t.flags |= 4194304),
          t.child
        );
      case 5:
        return (
          e === null &&
            qe &&
            ((s = n = Ze) &&
              ((n = Vv(n, t.type, t.pendingProps, Pt)),
              n !== null
                ? ((t.stateNode = n), (yt = t), (Ze = Wt(n.firstChild)), (Pt = !1), (s = !0))
                : (s = !1)),
            s || ta(t)),
          hl(t),
          (s = t.type),
          (c = t.pendingProps),
          (_ = e !== null ? e.memoizedProps : null),
          (n = c.children),
          uu(s, c) ? (n = null) : _ !== null && uu(s, _) && (t.flags |= 32),
          t.memoizedState !== null && ((s = cc(e, t, rv, null, null, a)), (Xi._currentValue = s)),
          sr(e, t),
          xt(e, t, n, a),
          t.child
        );
      case 6:
        return (
          e === null &&
            qe &&
            ((e = a = Ze) &&
              ((a = Qv(a, t.pendingProps, Pt)),
              a !== null ? ((t.stateNode = a), (yt = t), (Ze = null), (e = !0)) : (e = !1)),
            e || ta(t)),
          null
        );
      case 13:
        return lf(e, t, a);
      case 4:
        return (
          Re(t, t.stateNode.containerInfo),
          (n = t.pendingProps),
          e === null ? (t.child = za(t, null, n, a)) : xt(e, t, n, a),
          t.child
        );
      case 11:
        return Q_(e, t, t.type, t.pendingProps, a);
      case 7:
        return (xt(e, t, t.pendingProps, a), t.child);
      case 8:
        return (xt(e, t, t.pendingProps.children, a), t.child);
      case 12:
        return (xt(e, t, t.pendingProps.children, a), t.child);
      case 10:
        return ((n = t.pendingProps), la(t, t.type, n.value), xt(e, t, n.children, a), t.child);
      case 9:
        return (
          (s = t.type._context),
          (n = t.pendingProps.children),
          Ma(t),
          (s = bt(s)),
          (n = n(s)),
          (t.flags |= 1),
          xt(e, t, n, a),
          t.child
        );
      case 14:
        return K_(e, t, t.type, t.pendingProps, a);
      case 15:
        return Z_(e, t, t.type, t.pendingProps, a);
      case 19:
        return nf(e, t, a);
      case 31:
        return pv(e, t, a);
      case 22:
        return J_(e, t, a, t.pendingProps);
      case 24:
        return (
          Ma(t),
          (n = bt(ot)),
          e === null
            ? ((s = Wo()),
              s === null &&
                ((s = Ve),
                (c = Po()),
                (s.pooledCache = c),
                c.refCount++,
                c !== null && (s.pooledCacheLanes |= a),
                (s = c)),
              (t.memoizedState = { parent: n, cache: s }),
              tc(t),
              la(t, ot, s))
            : ((e.lanes & a) !== 0 && (lc(e, t), Ti(t, null, null, a), wi()),
              (s = e.memoizedState),
              (c = t.memoizedState),
              s.parent !== n
                ? ((s = { parent: n, cache: n }),
                  (t.memoizedState = s),
                  t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = s),
                  la(t, ot, n))
                : ((n = c.cache), la(t, ot, n), n !== s.cache && Jo(t, [ot], a, !0))),
          xt(e, t, t.pendingProps.children, a),
          t.child
        );
      case 29:
        throw t.pendingProps;
    }
    throw Error(o(156, t.tag));
  }
  function Il(e) {
    e.flags |= 4;
  }
  function Rc(e, t, a, n, s) {
    if (((t = (e.mode & 32) !== 0) && (t = !1), t)) {
      if (((e.flags |= 16777216), (s & 335544128) === s))
        if (e.stateNode.complete) e.flags |= 8192;
        else if (Bf()) e.flags |= 8192;
        else throw ((Da = Xs), ec);
    } else e.flags &= -16777217;
  }
  function rf(e, t) {
    if (t.type !== 'stylesheet' || (t.state.loading & 4) !== 0) e.flags &= -16777217;
    else if (((e.flags |= 16777216), !xp(t)))
      if (Bf()) e.flags |= 8192;
      else throw ((Da = Xs), ec);
  }
  function or(e, t) {
    (t !== null && (e.flags |= 4),
      e.flags & 16384 && ((t = e.tag !== 22 ? zd() : 536870912), (e.lanes |= t), (jn |= t)));
  }
  function Li(e, t) {
    if (!qe)
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
  function Je(e) {
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
  function gv(e, t, a) {
    var n = t.pendingProps;
    switch ((Xo(t), t.tag)) {
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return (Je(t), null);
      case 1:
        return (Je(t), null);
      case 3:
        return (
          (a = t.stateNode),
          (n = null),
          e !== null && (n = e.memoizedState.cache),
          t.memoizedState.cache !== n && (t.flags |= 2048),
          Al(ot),
          De(),
          a.pendingContext && ((a.context = a.pendingContext), (a.pendingContext = null)),
          (e === null || e.child === null) &&
            (fn(t)
              ? Il(t)
              : e === null ||
                (e.memoizedState.isDehydrated && (t.flags & 256) === 0) ||
                ((t.flags |= 1024), Qo())),
          Je(t),
          null
        );
      case 26:
        var s = t.type,
          c = t.memoizedState;
        return (
          e === null
            ? (Il(t), c !== null ? (Je(t), rf(t, c)) : (Je(t), Rc(t, s, null, n, a)))
            : c
              ? c !== e.memoizedState
                ? (Il(t), Je(t), rf(t, c))
                : (Je(t), (t.flags &= -16777217))
              : ((e = e.memoizedProps), e !== n && Il(t), Je(t), Rc(t, s, e, n, a)),
          null
        );
      case 27:
        if ((il(t), (a = pe.current), (s = t.type), e !== null && t.stateNode != null))
          e.memoizedProps !== n && Il(t);
        else {
          if (!n) {
            if (t.stateNode === null) throw Error(o(166));
            return (Je(t), null);
          }
          ((e = K.current), fn(t) ? zm(t) : ((e = fp(s, n, a)), (t.stateNode = e), Il(t)));
        }
        return (Je(t), null);
      case 5:
        if ((il(t), (s = t.type), e !== null && t.stateNode != null))
          e.memoizedProps !== n && Il(t);
        else {
          if (!n) {
            if (t.stateNode === null) throw Error(o(166));
            return (Je(t), null);
          }
          if (((c = K.current), fn(t))) zm(t);
          else {
            var _ = Sr(pe.current);
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
            ((c[vt] = t), (c[Ct] = n));
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
            e: switch ((St(c, s, n), s)) {
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
            n && Il(t);
          }
        }
        return (Je(t), Rc(t, t.type, e === null ? null : e.memoizedProps, t.pendingProps, a), null);
      case 6:
        if (e && t.stateNode != null) e.memoizedProps !== n && Il(t);
        else {
          if (typeof n != 'string' && t.stateNode === null) throw Error(o(166));
          if (((e = pe.current), fn(t))) {
            if (((e = t.stateNode), (a = t.memoizedProps), (n = null), (s = yt), s !== null))
              switch (s.tag) {
                case 27:
                case 5:
                  n = s.memoizedProps;
              }
            ((e[vt] = t),
              (e = !!(
                e.nodeValue === a ||
                (n !== null && n.suppressHydrationWarning === !0) ||
                ap(e.nodeValue, a)
              )),
              e || ta(t, !0));
          } else ((e = Sr(e).createTextNode(n)), (e[vt] = t), (t.stateNode = e));
        }
        return (Je(t), null);
      case 31:
        if (((a = t.memoizedState), e === null || e.memoizedState !== null)) {
          if (((n = fn(t)), a !== null)) {
            if (e === null) {
              if (!n) throw Error(o(318));
              if (((e = t.memoizedState), (e = e !== null ? e.dehydrated : null), !e))
                throw Error(o(557));
              e[vt] = t;
            } else (Ba(), (t.flags & 128) === 0 && (t.memoizedState = null), (t.flags |= 4));
            (Je(t), (e = !1));
          } else
            ((a = Qo()),
              e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = a),
              (e = !0));
          if (!e) return t.flags & 256 ? (zt(t), t) : (zt(t), null);
          if ((t.flags & 128) !== 0) throw Error(o(558));
        }
        return (Je(t), null);
      case 13:
        if (
          ((n = t.memoizedState),
          e === null || (e.memoizedState !== null && e.memoizedState.dehydrated !== null))
        ) {
          if (((s = fn(t)), n !== null && n.dehydrated !== null)) {
            if (e === null) {
              if (!s) throw Error(o(318));
              if (((s = t.memoizedState), (s = s !== null ? s.dehydrated : null), !s))
                throw Error(o(317));
              s[vt] = t;
            } else (Ba(), (t.flags & 128) === 0 && (t.memoizedState = null), (t.flags |= 4));
            (Je(t), (s = !1));
          } else
            ((s = Qo()),
              e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = s),
              (s = !0));
          if (!s) return t.flags & 256 ? (zt(t), t) : (zt(t), null);
        }
        return (
          zt(t),
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
              or(t, t.updateQueue),
              Je(t),
              null)
        );
      case 4:
        return (De(), e === null && iu(t.stateNode.containerInfo), Je(t), null);
      case 10:
        return (Al(t.type), Je(t), null);
      case 19:
        if ((w(it), (n = t.memoizedState), n === null)) return (Je(t), null);
        if (((s = (t.flags & 128) !== 0), (c = n.rendering), c === null))
          if (s) Li(n, !1);
          else {
            if (nt !== 0 || (e !== null && (e.flags & 128) !== 0))
              for (e = t.child; e !== null; ) {
                if (((c = Zs(e)), c !== null)) {
                  for (
                    t.flags |= 128,
                      Li(n, !1),
                      e = c.updateQueue,
                      t.updateQueue = e,
                      or(t, e),
                      t.subtreeFlags = 0,
                      e = a,
                      a = t.child;
                    a !== null;
                  )
                    (Im(a, e), (a = a.sibling));
                  return (X(it, (it.current & 1) | 2), qe && El(t, n.treeForkCount), t.child);
                }
                e = e.sibling;
              }
            n.tail !== null &&
              Nt() > _r &&
              ((t.flags |= 128), (s = !0), Li(n, !1), (t.lanes = 4194304));
          }
        else {
          if (!s)
            if (((e = Zs(c)), e !== null)) {
              if (
                ((t.flags |= 128),
                (s = !0),
                (e = e.updateQueue),
                (t.updateQueue = e),
                or(t, e),
                Li(n, !0),
                n.tail === null && n.tailMode === 'hidden' && !c.alternate && !qe)
              )
                return (Je(t), null);
            } else
              2 * Nt() - n.renderingStartTime > _r &&
                a !== 536870912 &&
                ((t.flags |= 128), (s = !0), Li(n, !1), (t.lanes = 4194304));
          n.isBackwards
            ? ((c.sibling = t.child), (t.child = c))
            : ((e = n.last), e !== null ? (e.sibling = c) : (t.child = c), (n.last = c));
        }
        return n.tail !== null
          ? ((e = n.tail),
            (n.rendering = e),
            (n.tail = e.sibling),
            (n.renderingStartTime = Nt()),
            (e.sibling = null),
            (a = it.current),
            X(it, s ? (a & 1) | 2 : a & 1),
            qe && El(t, n.treeForkCount),
            e)
          : (Je(t), null);
      case 22:
      case 23:
        return (
          zt(t),
          sc(),
          (n = t.memoizedState !== null),
          e !== null
            ? (e.memoizedState !== null) !== n && (t.flags |= 8192)
            : n && (t.flags |= 8192),
          n
            ? (a & 536870912) !== 0 &&
              (t.flags & 128) === 0 &&
              (Je(t), t.subtreeFlags & 6 && (t.flags |= 8192))
            : Je(t),
          (a = t.updateQueue),
          a !== null && or(t, a.retryQueue),
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
          e !== null && w(Oa),
          null
        );
      case 24:
        return (
          (a = null),
          e !== null && (a = e.memoizedState.cache),
          t.memoizedState.cache !== a && (t.flags |= 2048),
          Al(ot),
          Je(t),
          null
        );
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(o(156, t.tag));
  }
  function kv(e, t) {
    switch ((Xo(t), t.tag)) {
      case 1:
        return ((e = t.flags), e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null);
      case 3:
        return (
          Al(ot),
          De(),
          (e = t.flags),
          (e & 65536) !== 0 && (e & 128) === 0 ? ((t.flags = (e & -65537) | 128), t) : null
        );
      case 26:
      case 27:
      case 5:
        return (il(t), null);
      case 31:
        if (t.memoizedState !== null) {
          if ((zt(t), t.alternate === null)) throw Error(o(340));
          Ba();
        }
        return ((e = t.flags), e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null);
      case 13:
        if ((zt(t), (e = t.memoizedState), e !== null && e.dehydrated !== null)) {
          if (t.alternate === null) throw Error(o(340));
          Ba();
        }
        return ((e = t.flags), e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null);
      case 19:
        return (w(it), null);
      case 4:
        return (De(), null);
      case 10:
        return (Al(t.type), null);
      case 22:
      case 23:
        return (
          zt(t),
          sc(),
          e !== null && w(Oa),
          (e = t.flags),
          e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
        );
      case 24:
        return (Al(ot), null);
      case 25:
        return null;
      default:
        return null;
    }
  }
  function of(e, t) {
    switch ((Xo(t), t.tag)) {
      case 3:
        (Al(ot), De());
        break;
      case 26:
      case 27:
      case 5:
        il(t);
        break;
      case 4:
        De();
        break;
      case 31:
        t.memoizedState !== null && zt(t);
        break;
      case 13:
        zt(t);
        break;
      case 19:
        w(it);
        break;
      case 10:
        Al(t.type);
        break;
      case 22:
      case 23:
        (zt(t), sc(), e !== null && w(Oa));
        break;
      case 24:
        Al(ot);
    }
  }
  function qi(e, t) {
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
    } catch (v) {
      Ue(t, t.return, v);
    }
  }
  function oa(e, t, a) {
    try {
      var n = t.updateQueue,
        s = n !== null ? n.lastEffect : null;
      if (s !== null) {
        var c = s.next;
        n = c;
        do {
          if ((n.tag & e) === e) {
            var _ = n.inst,
              v = _.destroy;
            if (v !== void 0) {
              ((_.destroy = void 0), (s = t));
              var T = a,
                H = v;
              try {
                H();
              } catch (Q) {
                Ue(s, T, Q);
              }
            }
          }
          n = n.next;
        } while (n !== c);
      }
    } catch (Q) {
      Ue(t, t.return, Q);
    }
  }
  function cf(e) {
    var t = e.updateQueue;
    if (t !== null) {
      var a = e.stateNode;
      try {
        Fm(t, a);
      } catch (n) {
        Ue(e, e.return, n);
      }
    }
  }
  function uf(e, t, a) {
    ((a.props = Ua(e.type, e.memoizedProps)), (a.state = e.memoizedState));
    try {
      a.componentWillUnmount();
    } catch (n) {
      Ue(e, t, n);
    }
  }
  function Bi(e, t) {
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
      Ue(e, t, s);
    }
  }
  function yl(e, t) {
    var a = e.ref,
      n = e.refCleanup;
    if (a !== null)
      if (typeof n == 'function')
        try {
          n();
        } catch (s) {
          Ue(e, t, s);
        } finally {
          ((e.refCleanup = null), (e = e.alternate), e != null && (e.refCleanup = null));
        }
      else if (typeof a == 'function')
        try {
          a(null);
        } catch (s) {
          Ue(e, t, s);
        }
      else a.current = null;
  }
  function df(e) {
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
      Ue(e, e.return, s);
    }
  }
  function Dc(e, t, a) {
    try {
      var n = e.stateNode;
      (Hv(n, e.type, a, t), (n[Ct] = t));
    } catch (s) {
      Ue(e, e.return, s);
    }
  }
  function mf(e) {
    return (
      e.tag === 5 || e.tag === 3 || e.tag === 26 || (e.tag === 27 && pa(e.type)) || e.tag === 4
    );
  }
  function zc(e) {
    e: for (;;) {
      for (; e.sibling === null; ) {
        if (e.return === null || mf(e.return)) return null;
        e = e.return;
      }
      for (
        e.sibling.return = e.return, e = e.sibling;
        e.tag !== 5 && e.tag !== 6 && e.tag !== 18;
      ) {
        if ((e.tag === 27 && pa(e.type)) || e.flags & 2 || e.child === null || e.tag === 4)
          continue e;
        ((e.child.return = e), (e = e.child));
      }
      if (!(e.flags & 2)) return e.stateNode;
    }
  }
  function Hc(e, t, a) {
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
            a != null || t.onclick !== null || (t.onclick = Tl)));
    else if (
      n !== 4 &&
      (n === 27 && pa(e.type) && ((a = e.stateNode), (t = null)), (e = e.child), e !== null)
    )
      for (Hc(e, t, a), e = e.sibling; e !== null; ) (Hc(e, t, a), (e = e.sibling));
  }
  function cr(e, t, a) {
    var n = e.tag;
    if (n === 5 || n === 6) ((e = e.stateNode), t ? a.insertBefore(e, t) : a.appendChild(e));
    else if (n !== 4 && (n === 27 && pa(e.type) && (a = e.stateNode), (e = e.child), e !== null))
      for (cr(e, t, a), e = e.sibling; e !== null; ) (cr(e, t, a), (e = e.sibling));
  }
  function _f(e) {
    var t = e.stateNode,
      a = e.memoizedProps;
    try {
      for (var n = e.type, s = t.attributes; s.length; ) t.removeAttributeNode(s[0]);
      (St(t, n, a), (t[vt] = e), (t[Ct] = a));
    } catch (c) {
      Ue(e, e.return, c);
    }
  }
  var Ml = !1,
    dt = !1,
    Uc = !1,
    ff = typeof WeakSet == 'function' ? WeakSet : Set,
    pt = null;
  function vv(e, t) {
    if (((e = e.containerInfo), (ou = Ar), (e = Tm(e)), Io(e))) {
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
              v = -1,
              T = -1,
              H = 0,
              Q = 0,
              F = e,
              $ = null;
            t: for (;;) {
              for (
                var Y;
                F !== a || (s !== 0 && F.nodeType !== 3) || (v = _ + s),
                  F !== c || (n !== 0 && F.nodeType !== 3) || (T = _ + n),
                  F.nodeType === 3 && (_ += F.nodeValue.length),
                  (Y = F.firstChild) !== null;
              )
                (($ = F), (F = Y));
              for (;;) {
                if (F === e) break t;
                if (
                  ($ === a && ++H === s && (v = _),
                  $ === c && ++Q === n && (T = _),
                  (Y = F.nextSibling) !== null)
                )
                  break;
                ((F = $), ($ = F.parentNode));
              }
              F = Y;
            }
            a = v === -1 || T === -1 ? null : { start: v, end: T };
          } else a = null;
        }
      a = a || { start: 0, end: 0 };
    } else a = null;
    for (cu = { focusedElem: e, selectionRange: a }, Ar = !1, pt = t; pt !== null; )
      if (((t = pt), (e = t.child), (t.subtreeFlags & 1028) !== 0 && e !== null))
        ((e.return = t), (pt = e));
      else
        for (; pt !== null; ) {
          switch (((t = pt), (c = t.alternate), (e = t.flags), t.tag)) {
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
                  var _e = Ua(a.type, s);
                  ((e = n.getSnapshotBeforeUpdate(_e, c)),
                    (n.__reactInternalSnapshotBeforeUpdate = e));
                } catch (xe) {
                  Ue(a, a.return, xe);
                }
              }
              break;
            case 3:
              if ((e & 1024) !== 0) {
                if (((e = t.stateNode.containerInfo), (a = e.nodeType), a === 9)) mu(e);
                else if (a === 1)
                  switch (e.nodeName) {
                    case 'HEAD':
                    case 'HTML':
                    case 'BODY':
                      mu(e);
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
              if ((e & 1024) !== 0) throw Error(o(163));
          }
          if (((e = t.sibling), e !== null)) {
            ((e.return = t.return), (pt = e));
            break;
          }
          pt = t.return;
        }
  }
  function pf(e, t, a) {
    var n = a.flags;
    switch (a.tag) {
      case 0:
      case 11:
      case 15:
        (Rl(e, a), n & 4 && qi(5, a));
        break;
      case 1:
        if ((Rl(e, a), n & 4))
          if (((e = a.stateNode), t === null))
            try {
              e.componentDidMount();
            } catch (_) {
              Ue(a, a.return, _);
            }
          else {
            var s = Ua(a.type, t.memoizedProps);
            t = t.memoizedState;
            try {
              e.componentDidUpdate(s, t, e.__reactInternalSnapshotBeforeUpdate);
            } catch (_) {
              Ue(a, a.return, _);
            }
          }
        (n & 64 && cf(a), n & 512 && Bi(a, a.return));
        break;
      case 3:
        if ((Rl(e, a), n & 64 && ((e = a.updateQueue), e !== null))) {
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
            Fm(e, t);
          } catch (_) {
            Ue(a, a.return, _);
          }
        }
        break;
      case 27:
        t === null && n & 4 && _f(a);
      case 26:
      case 5:
        (Rl(e, a), t === null && n & 4 && df(a), n & 512 && Bi(a, a.return));
        break;
      case 12:
        Rl(e, a);
        break;
      case 31:
        (Rl(e, a), n & 4 && kf(e, a));
        break;
      case 13:
        (Rl(e, a),
          n & 4 && vf(e, a),
          n & 64 &&
            ((e = a.memoizedState),
            e !== null && ((e = e.dehydrated), e !== null && ((a = Ev.bind(null, a)), Kv(e, a)))));
        break;
      case 22:
        if (((n = a.memoizedState !== null || Ml), !n)) {
          ((t = (t !== null && t.memoizedState !== null) || dt), (s = Ml));
          var c = dt;
          ((Ml = n),
            (dt = t) && !c ? Dl(e, a, (a.subtreeFlags & 8772) !== 0) : Rl(e, a),
            (Ml = s),
            (dt = c));
        }
        break;
      case 30:
        break;
      default:
        Rl(e, a);
    }
  }
  function hf(e) {
    var t = e.alternate;
    (t !== null && ((e.alternate = null), hf(t)),
      (e.child = null),
      (e.deletions = null),
      (e.sibling = null),
      e.tag === 5 && ((t = e.stateNode), t !== null && go(t)),
      (e.stateNode = null),
      (e.return = null),
      (e.dependencies = null),
      (e.memoizedProps = null),
      (e.memoizedState = null),
      (e.pendingProps = null),
      (e.stateNode = null),
      (e.updateQueue = null));
  }
  var Fe = null,
    Lt = !1;
  function Ol(e, t, a) {
    for (a = a.child; a !== null; ) (gf(e, t, a), (a = a.sibling));
  }
  function gf(e, t, a) {
    if (ne && typeof ne.onCommitFiberUnmount == 'function')
      try {
        ne.onCommitFiberUnmount(ae, a);
      } catch {}
    switch (a.tag) {
      case 26:
        (dt || yl(a, t),
          Ol(e, t, a),
          a.memoizedState
            ? a.memoizedState.count--
            : a.stateNode && ((a = a.stateNode), a.parentNode.removeChild(a)));
        break;
      case 27:
        dt || yl(a, t);
        var n = Fe,
          s = Lt;
        (pa(a.type) && ((Fe = a.stateNode), (Lt = !1)),
          Ol(e, t, a),
          $i(a.stateNode),
          (Fe = n),
          (Lt = s));
        break;
      case 5:
        dt || yl(a, t);
      case 6:
        if (((n = Fe), (s = Lt), (Fe = null), Ol(e, t, a), (Fe = n), (Lt = s), Fe !== null))
          if (Lt)
            try {
              (Fe.nodeType === 9
                ? Fe.body
                : Fe.nodeName === 'HTML'
                  ? Fe.ownerDocument.body
                  : Fe
              ).removeChild(a.stateNode);
            } catch (c) {
              Ue(a, t, c);
            }
          else
            try {
              Fe.removeChild(a.stateNode);
            } catch (c) {
              Ue(a, t, c);
            }
        break;
      case 18:
        Fe !== null &&
          (Lt
            ? ((e = Fe),
              cp(
                e.nodeType === 9 ? e.body : e.nodeName === 'HTML' ? e.ownerDocument.body : e,
                a.stateNode
              ),
              Mn(e))
            : cp(Fe, a.stateNode));
        break;
      case 4:
        ((n = Fe),
          (s = Lt),
          (Fe = a.stateNode.containerInfo),
          (Lt = !0),
          Ol(e, t, a),
          (Fe = n),
          (Lt = s));
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        (oa(2, a, t), dt || oa(4, a, t), Ol(e, t, a));
        break;
      case 1:
        (dt ||
          (yl(a, t), (n = a.stateNode), typeof n.componentWillUnmount == 'function' && uf(a, t, n)),
          Ol(e, t, a));
        break;
      case 21:
        Ol(e, t, a);
        break;
      case 22:
        ((dt = (n = dt) || a.memoizedState !== null), Ol(e, t, a), (dt = n));
        break;
      default:
        Ol(e, t, a);
    }
  }
  function kf(e, t) {
    if (
      t.memoizedState === null &&
      ((e = t.alternate), e !== null && ((e = e.memoizedState), e !== null))
    ) {
      e = e.dehydrated;
      try {
        Mn(e);
      } catch (a) {
        Ue(t, t.return, a);
      }
    }
  }
  function vf(e, t) {
    if (
      t.memoizedState === null &&
      ((e = t.alternate),
      e !== null && ((e = e.memoizedState), e !== null && ((e = e.dehydrated), e !== null)))
    )
      try {
        Mn(e);
      } catch (a) {
        Ue(t, t.return, a);
      }
  }
  function yv(e) {
    switch (e.tag) {
      case 31:
      case 13:
      case 19:
        var t = e.stateNode;
        return (t === null && (t = e.stateNode = new ff()), t);
      case 22:
        return (
          (e = e.stateNode),
          (t = e._retryCache),
          t === null && (t = e._retryCache = new ff()),
          t
        );
      default:
        throw Error(o(435, e.tag));
    }
  }
  function ur(e, t) {
    var a = yv(e);
    t.forEach(function (n) {
      if (!a.has(n)) {
        a.add(n);
        var s = Cv.bind(null, e, n);
        n.then(s, s);
      }
    });
  }
  function qt(e, t) {
    var a = t.deletions;
    if (a !== null)
      for (var n = 0; n < a.length; n++) {
        var s = a[n],
          c = e,
          _ = t,
          v = _;
        e: for (; v !== null; ) {
          switch (v.tag) {
            case 27:
              if (pa(v.type)) {
                ((Fe = v.stateNode), (Lt = !1));
                break e;
              }
              break;
            case 5:
              ((Fe = v.stateNode), (Lt = !1));
              break e;
            case 3:
            case 4:
              ((Fe = v.stateNode.containerInfo), (Lt = !0));
              break e;
          }
          v = v.return;
        }
        if (Fe === null) throw Error(o(160));
        (gf(c, _, s),
          (Fe = null),
          (Lt = !1),
          (c = s.alternate),
          c !== null && (c.return = null),
          (s.return = null));
      }
    if (t.subtreeFlags & 13886) for (t = t.child; t !== null; ) (yf(t, e), (t = t.sibling));
  }
  var rl = null;
  function yf(e, t) {
    var a = e.alternate,
      n = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        (qt(t, e), Bt(e), n & 4 && (oa(3, e, e.return), qi(3, e), oa(5, e, e.return)));
        break;
      case 1:
        (qt(t, e),
          Bt(e),
          n & 512 && (dt || a === null || yl(a, a.return)),
          n & 64 &&
            Ml &&
            ((e = e.updateQueue),
            e !== null &&
              ((n = e.callbacks),
              n !== null &&
                ((a = e.shared.hiddenCallbacks),
                (e.shared.hiddenCallbacks = a === null ? n : a.concat(n))))));
        break;
      case 26:
        var s = rl;
        if ((qt(t, e), Bt(e), n & 512 && (dt || a === null || yl(a, a.return)), n & 4)) {
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
                          c[si] ||
                          c[vt] ||
                          c.namespaceURI === 'http://www.w3.org/2000/svg' ||
                          c.hasAttribute('itemprop')) &&
                          ((c = s.createElement(n)),
                          s.head.insertBefore(c, s.querySelector('head > title'))),
                        St(c, n, a),
                        (c[vt] = e),
                        ft(c),
                        (n = c));
                      break e;
                    case 'link':
                      var _ = yp('link', 'href', s).get(n + (a.href || ''));
                      if (_) {
                        for (var v = 0; v < _.length; v++)
                          if (
                            ((c = _[v]),
                            c.getAttribute('href') ===
                              (a.href == null || a.href === '' ? null : a.href) &&
                              c.getAttribute('rel') === (a.rel == null ? null : a.rel) &&
                              c.getAttribute('title') === (a.title == null ? null : a.title) &&
                              c.getAttribute('crossorigin') ===
                                (a.crossOrigin == null ? null : a.crossOrigin))
                          ) {
                            _.splice(v, 1);
                            break t;
                          }
                      }
                      ((c = s.createElement(n)), St(c, n, a), s.head.appendChild(c));
                      break;
                    case 'meta':
                      if ((_ = yp('meta', 'content', s).get(n + (a.content || '')))) {
                        for (v = 0; v < _.length; v++)
                          if (
                            ((c = _[v]),
                            c.getAttribute('content') ===
                              (a.content == null ? null : '' + a.content) &&
                              c.getAttribute('name') === (a.name == null ? null : a.name) &&
                              c.getAttribute('property') ===
                                (a.property == null ? null : a.property) &&
                              c.getAttribute('http-equiv') ===
                                (a.httpEquiv == null ? null : a.httpEquiv) &&
                              c.getAttribute('charset') === (a.charSet == null ? null : a.charSet))
                          ) {
                            _.splice(v, 1);
                            break t;
                          }
                      }
                      ((c = s.createElement(n)), St(c, n, a), s.head.appendChild(c));
                      break;
                    default:
                      throw Error(o(468, n));
                  }
                  ((c[vt] = e), ft(c), (n = c));
                }
                e.stateNode = n;
              } else bp(s, e.type, e.stateNode);
            else e.stateNode = vp(s, n, e.memoizedProps);
          else
            c !== n
              ? (c === null
                  ? a.stateNode !== null && ((a = a.stateNode), a.parentNode.removeChild(a))
                  : c.count--,
                n === null ? bp(s, e.type, e.stateNode) : vp(s, n, e.memoizedProps))
              : n === null && e.stateNode !== null && Dc(e, e.memoizedProps, a.memoizedProps);
        }
        break;
      case 27:
        (qt(t, e),
          Bt(e),
          n & 512 && (dt || a === null || yl(a, a.return)),
          a !== null && n & 4 && Dc(e, e.memoizedProps, a.memoizedProps));
        break;
      case 5:
        if ((qt(t, e), Bt(e), n & 512 && (dt || a === null || yl(a, a.return)), e.flags & 32)) {
          s = e.stateNode;
          try {
            an(s, '');
          } catch (_e) {
            Ue(e, e.return, _e);
          }
        }
        (n & 4 &&
          e.stateNode != null &&
          ((s = e.memoizedProps), Dc(e, s, a !== null ? a.memoizedProps : s)),
          n & 1024 && (Uc = !0));
        break;
      case 6:
        if ((qt(t, e), Bt(e), n & 4)) {
          if (e.stateNode === null) throw Error(o(162));
          ((n = e.memoizedProps), (a = e.stateNode));
          try {
            a.nodeValue = n;
          } catch (_e) {
            Ue(e, e.return, _e);
          }
        }
        break;
      case 3:
        if (
          ((Nr = null),
          (s = rl),
          (rl = wr(t.containerInfo)),
          qt(t, e),
          (rl = s),
          Bt(e),
          n & 4 && a !== null && a.memoizedState.isDehydrated)
        )
          try {
            Mn(t.containerInfo);
          } catch (_e) {
            Ue(e, e.return, _e);
          }
        Uc && ((Uc = !1), bf(e));
        break;
      case 4:
        ((n = rl), (rl = wr(e.stateNode.containerInfo)), qt(t, e), Bt(e), (rl = n));
        break;
      case 12:
        (qt(t, e), Bt(e));
        break;
      case 31:
        (qt(t, e),
          Bt(e),
          n & 4 && ((n = e.updateQueue), n !== null && ((e.updateQueue = null), ur(e, n))));
        break;
      case 13:
        (qt(t, e),
          Bt(e),
          e.child.flags & 8192 &&
            (e.memoizedState !== null) != (a !== null && a.memoizedState !== null) &&
            (mr = Nt()),
          n & 4 && ((n = e.updateQueue), n !== null && ((e.updateQueue = null), ur(e, n))));
        break;
      case 22:
        s = e.memoizedState !== null;
        var T = a !== null && a.memoizedState !== null,
          H = Ml,
          Q = dt;
        if (((Ml = H || s), (dt = Q || T), qt(t, e), (dt = Q), (Ml = H), Bt(e), n & 8192))
          e: for (
            t = e.stateNode,
              t._visibility = s ? t._visibility & -2 : t._visibility | 1,
              s && (a === null || T || Ml || dt || $a(e)),
              a = null,
              t = e;
            ;
          ) {
            if (t.tag === 5 || t.tag === 26) {
              if (a === null) {
                T = a = t;
                try {
                  if (((c = T.stateNode), s))
                    ((_ = c.style),
                      typeof _.setProperty == 'function'
                        ? _.setProperty('display', 'none', 'important')
                        : (_.display = 'none'));
                  else {
                    v = T.stateNode;
                    var F = T.memoizedProps.style,
                      $ = F != null && F.hasOwnProperty('display') ? F.display : null;
                    v.style.display = $ == null || typeof $ == 'boolean' ? '' : ('' + $).trim();
                  }
                } catch (_e) {
                  Ue(T, T.return, _e);
                }
              }
            } else if (t.tag === 6) {
              if (a === null) {
                T = t;
                try {
                  T.stateNode.nodeValue = s ? '' : T.memoizedProps;
                } catch (_e) {
                  Ue(T, T.return, _e);
                }
              }
            } else if (t.tag === 18) {
              if (a === null) {
                T = t;
                try {
                  var Y = T.stateNode;
                  s ? up(Y, !0) : up(T.stateNode, !1);
                } catch (_e) {
                  Ue(T, T.return, _e);
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
          n !== null && ((a = n.retryQueue), a !== null && ((n.retryQueue = null), ur(e, a))));
        break;
      case 19:
        (qt(t, e),
          Bt(e),
          n & 4 && ((n = e.updateQueue), n !== null && ((e.updateQueue = null), ur(e, n))));
        break;
      case 30:
        break;
      case 21:
        break;
      default:
        (qt(t, e), Bt(e));
    }
  }
  function Bt(e) {
    var t = e.flags;
    if (t & 2) {
      try {
        for (var a, n = e.return; n !== null; ) {
          if (mf(n)) {
            a = n;
            break;
          }
          n = n.return;
        }
        if (a == null) throw Error(o(160));
        switch (a.tag) {
          case 27:
            var s = a.stateNode,
              c = zc(e);
            cr(e, c, s);
            break;
          case 5:
            var _ = a.stateNode;
            a.flags & 32 && (an(_, ''), (a.flags &= -33));
            var v = zc(e);
            cr(e, v, _);
            break;
          case 3:
          case 4:
            var T = a.stateNode.containerInfo,
              H = zc(e);
            Hc(e, H, T);
            break;
          default:
            throw Error(o(161));
        }
      } catch (Q) {
        Ue(e, e.return, Q);
      }
      e.flags &= -3;
    }
    t & 4096 && (e.flags &= -4097);
  }
  function bf(e) {
    if (e.subtreeFlags & 1024)
      for (e = e.child; e !== null; ) {
        var t = e;
        (bf(t), t.tag === 5 && t.flags & 1024 && t.stateNode.reset(), (e = e.sibling));
      }
  }
  function Rl(e, t) {
    if (t.subtreeFlags & 8772)
      for (t = t.child; t !== null; ) (pf(e, t.alternate, t), (t = t.sibling));
  }
  function $a(e) {
    for (e = e.child; e !== null; ) {
      var t = e;
      switch (t.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          (oa(4, t, t.return), $a(t));
          break;
        case 1:
          yl(t, t.return);
          var a = t.stateNode;
          (typeof a.componentWillUnmount == 'function' && uf(t, t.return, a), $a(t));
          break;
        case 27:
          $i(t.stateNode);
        case 26:
        case 5:
          (yl(t, t.return), $a(t));
          break;
        case 22:
          t.memoizedState === null && $a(t);
          break;
        case 30:
          $a(t);
          break;
        default:
          $a(t);
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
          (Dl(s, c, a), qi(4, c));
          break;
        case 1:
          if ((Dl(s, c, a), (n = c), (s = n.stateNode), typeof s.componentDidMount == 'function'))
            try {
              s.componentDidMount();
            } catch (H) {
              Ue(n, n.return, H);
            }
          if (((n = c), (s = n.updateQueue), s !== null)) {
            var v = n.stateNode;
            try {
              var T = s.shared.hiddenCallbacks;
              if (T !== null)
                for (s.shared.hiddenCallbacks = null, s = 0; s < T.length; s++) Pm(T[s], v);
            } catch (H) {
              Ue(n, n.return, H);
            }
          }
          (a && _ & 64 && cf(c), Bi(c, c.return));
          break;
        case 27:
          _f(c);
        case 26:
        case 5:
          (Dl(s, c, a), a && n === null && _ & 4 && df(c), Bi(c, c.return));
          break;
        case 12:
          Dl(s, c, a);
          break;
        case 31:
          (Dl(s, c, a), a && _ & 4 && kf(s, c));
          break;
        case 13:
          (Dl(s, c, a), a && _ & 4 && vf(s, c));
          break;
        case 22:
          (c.memoizedState === null && Dl(s, c, a), Bi(c, c.return));
          break;
        case 30:
          break;
        default:
          Dl(s, c, a);
      }
      t = t.sibling;
    }
  }
  function $c(e, t) {
    var a = null;
    (e !== null &&
      e.memoizedState !== null &&
      e.memoizedState.cachePool !== null &&
      (a = e.memoizedState.cachePool.pool),
      (e = null),
      t.memoizedState !== null &&
        t.memoizedState.cachePool !== null &&
        (e = t.memoizedState.cachePool.pool),
      e !== a && (e != null && e.refCount++, a != null && vi(a)));
  }
  function Gc(e, t) {
    ((e = null),
      t.alternate !== null && (e = t.alternate.memoizedState.cache),
      (t = t.memoizedState.cache),
      t !== e && (t.refCount++, e != null && vi(e)));
  }
  function ol(e, t, a, n) {
    if (t.subtreeFlags & 10256) for (t = t.child; t !== null; ) (xf(e, t, a, n), (t = t.sibling));
  }
  function xf(e, t, a, n) {
    var s = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        (ol(e, t, a, n), s & 2048 && qi(9, t));
        break;
      case 1:
        ol(e, t, a, n);
        break;
      case 3:
        (ol(e, t, a, n),
          s & 2048 &&
            ((e = null),
            t.alternate !== null && (e = t.alternate.memoizedState.cache),
            (t = t.memoizedState.cache),
            t !== e && (t.refCount++, e != null && vi(e))));
        break;
      case 12:
        if (s & 2048) {
          (ol(e, t, a, n), (e = t.stateNode));
          try {
            var c = t.memoizedProps,
              _ = c.id,
              v = c.onPostCommit;
            typeof v == 'function' &&
              v(_, t.alternate === null ? 'mount' : 'update', e.passiveEffectDuration, -0);
          } catch (T) {
            Ue(t, t.return, T);
          }
        } else ol(e, t, a, n);
        break;
      case 31:
        ol(e, t, a, n);
        break;
      case 13:
        ol(e, t, a, n);
        break;
      case 23:
        break;
      case 22:
        ((c = t.stateNode),
          (_ = t.alternate),
          t.memoizedState !== null
            ? c._visibility & 2
              ? ol(e, t, a, n)
              : Ii(e, t)
            : c._visibility & 2
              ? ol(e, t, a, n)
              : ((c._visibility |= 2), wn(e, t, a, n, (t.subtreeFlags & 10256) !== 0 || !1)),
          s & 2048 && $c(_, t));
        break;
      case 24:
        (ol(e, t, a, n), s & 2048 && Gc(t.alternate, t));
        break;
      default:
        ol(e, t, a, n);
    }
  }
  function wn(e, t, a, n, s) {
    for (s = s && ((t.subtreeFlags & 10256) !== 0 || !1), t = t.child; t !== null; ) {
      var c = e,
        _ = t,
        v = a,
        T = n,
        H = _.flags;
      switch (_.tag) {
        case 0:
        case 11:
        case 15:
          (wn(c, _, v, T, s), qi(8, _));
          break;
        case 23:
          break;
        case 22:
          var Q = _.stateNode;
          (_.memoizedState !== null
            ? Q._visibility & 2
              ? wn(c, _, v, T, s)
              : Ii(c, _)
            : ((Q._visibility |= 2), wn(c, _, v, T, s)),
            s && H & 2048 && $c(_.alternate, _));
          break;
        case 24:
          (wn(c, _, v, T, s), s && H & 2048 && Gc(_.alternate, _));
          break;
        default:
          wn(c, _, v, T, s);
      }
      t = t.sibling;
    }
  }
  function Ii(e, t) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; ) {
        var a = e,
          n = t,
          s = n.flags;
        switch (n.tag) {
          case 22:
            (Ii(a, n), s & 2048 && $c(n.alternate, n));
            break;
          case 24:
            (Ii(a, n), s & 2048 && Gc(n.alternate, n));
            break;
          default:
            Ii(a, n);
        }
        t = t.sibling;
      }
  }
  var Mi = 8192;
  function Tn(e, t, a) {
    if (e.subtreeFlags & Mi) for (e = e.child; e !== null; ) (Sf(e, t, a), (e = e.sibling));
  }
  function Sf(e, t, a) {
    switch (e.tag) {
      case 26:
        (Tn(e, t, a),
          e.flags & Mi && e.memoizedState !== null && sy(a, rl, e.memoizedState, e.memoizedProps));
        break;
      case 5:
        Tn(e, t, a);
        break;
      case 3:
      case 4:
        var n = rl;
        ((rl = wr(e.stateNode.containerInfo)), Tn(e, t, a), (rl = n));
        break;
      case 22:
        e.memoizedState === null &&
          ((n = e.alternate),
          n !== null && n.memoizedState !== null
            ? ((n = Mi), (Mi = 16777216), Tn(e, t, a), (Mi = n))
            : Tn(e, t, a));
        break;
      default:
        Tn(e, t, a);
    }
  }
  function wf(e) {
    var t = e.alternate;
    if (t !== null && ((e = t.child), e !== null)) {
      t.child = null;
      do ((t = e.sibling), (e.sibling = null), (e = t));
      while (e !== null);
    }
  }
  function Oi(e) {
    var t = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (t !== null)
        for (var a = 0; a < t.length; a++) {
          var n = t[a];
          ((pt = n), Nf(n, e));
        }
      wf(e);
    }
    if (e.subtreeFlags & 10256) for (e = e.child; e !== null; ) (Tf(e), (e = e.sibling));
  }
  function Tf(e) {
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        (Oi(e), e.flags & 2048 && oa(9, e, e.return));
        break;
      case 3:
        Oi(e);
        break;
      case 12:
        Oi(e);
        break;
      case 22:
        var t = e.stateNode;
        e.memoizedState !== null && t._visibility & 2 && (e.return === null || e.return.tag !== 13)
          ? ((t._visibility &= -3), dr(e))
          : Oi(e);
        break;
      default:
        Oi(e);
    }
  }
  function dr(e) {
    var t = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (t !== null)
        for (var a = 0; a < t.length; a++) {
          var n = t[a];
          ((pt = n), Nf(n, e));
        }
      wf(e);
    }
    for (e = e.child; e !== null; ) {
      switch (((t = e), t.tag)) {
        case 0:
        case 11:
        case 15:
          (oa(8, t, t.return), dr(t));
          break;
        case 22:
          ((a = t.stateNode), a._visibility & 2 && ((a._visibility &= -3), dr(t)));
          break;
        default:
          dr(t);
      }
      e = e.sibling;
    }
  }
  function Nf(e, t) {
    for (; pt !== null; ) {
      var a = pt;
      switch (a.tag) {
        case 0:
        case 11:
        case 15:
          oa(8, a, t);
          break;
        case 23:
        case 22:
          if (a.memoizedState !== null && a.memoizedState.cachePool !== null) {
            var n = a.memoizedState.cachePool.pool;
            n != null && n.refCount++;
          }
          break;
        case 24:
          vi(a.memoizedState.cache);
      }
      if (((n = a.child), n !== null)) ((n.return = a), (pt = n));
      else
        e: for (a = e; pt !== null; ) {
          n = pt;
          var s = n.sibling,
            c = n.return;
          if ((hf(n), n === a)) {
            pt = null;
            break e;
          }
          if (s !== null) {
            ((s.return = c), (pt = s));
            break e;
          }
          pt = c;
        }
    }
  }
  var bv = {
      getCacheForType: function (e) {
        var t = bt(ot),
          a = t.data.get(e);
        return (a === void 0 && ((a = e()), t.data.set(e, a)), a);
      },
      cacheSignal: function () {
        return bt(ot).controller.signal;
      },
    },
    xv = typeof WeakMap == 'function' ? WeakMap : Map,
    Oe = 0,
    Ve = null,
    Ee = null,
    Ae = 0,
    He = 0,
    Ht = null,
    ca = !1,
    Nn = !1,
    Yc = !1,
    zl = 0,
    nt = 0,
    ua = 0,
    Ga = 0,
    Xc = 0,
    Ut = 0,
    jn = 0,
    Ri = null,
    It = null,
    Vc = !1,
    mr = 0,
    jf = 0,
    _r = 1 / 0,
    fr = null,
    da = null,
    mt = 0,
    ma = null,
    En = null,
    Hl = 0,
    Qc = 0,
    Kc = null,
    Ef = null,
    Di = 0,
    Zc = null;
  function $t() {
    return (Oe & 2) !== 0 && Ae !== 0 ? Ae & -Ae : O.T !== null ? tu() : Gd();
  }
  function Cf() {
    if (Ut === 0)
      if ((Ae & 536870912) === 0 || qe) {
        var e = xs;
        ((xs <<= 1), (xs & 3932160) === 0 && (xs = 262144), (Ut = e));
      } else Ut = 536870912;
    return ((e = Dt.current), e !== null && (e.flags |= 32), Ut);
  }
  function Mt(e, t, a) {
    (((e === Ve && (He === 2 || He === 9)) || e.cancelPendingCommit !== null) &&
      (Cn(e, 0), _a(e, Ae, Ut, !1)),
      ii(e, a),
      ((Oe & 2) === 0 || e !== Ve) &&
        (e === Ve && ((Oe & 2) === 0 && (Ga |= a), nt === 4 && _a(e, Ae, Ut, !1)), bl(e)));
  }
  function Af(e, t, a) {
    if ((Oe & 6) !== 0) throw Error(o(327));
    var n = (!a && (t & 127) === 0 && (t & e.expiredLanes) === 0) || ni(e, t),
      s = n ? Tv(e, t) : Pc(e, t, !0),
      c = n;
    do {
      if (s === 0) {
        Nn && !n && _a(e, t, 0, !1);
        break;
      } else {
        if (((a = e.current.alternate), c && !Sv(a))) {
          ((s = Pc(e, t, !1)), (c = !1));
          continue;
        }
        if (s === 2) {
          if (((c = t), e.errorRecoveryDisabledLanes & c)) var _ = 0;
          else
            ((_ = e.pendingLanes & -536870913), (_ = _ !== 0 ? _ : _ & 536870912 ? 536870912 : 0));
          if (_ !== 0) {
            t = _;
            e: {
              var v = e;
              s = Ri;
              var T = v.current.memoizedState.isDehydrated;
              if ((T && (Cn(v, _).flags |= 256), (_ = Pc(v, _, !1)), _ !== 2)) {
                if (Yc && !T) {
                  ((v.errorRecoveryDisabledLanes |= c), (Ga |= c), (s = 4));
                  break e;
                }
                ((c = It), (It = s), c !== null && (It === null ? (It = c) : It.push.apply(It, c)));
              }
              s = _;
            }
            if (((c = !1), s !== 2)) continue;
          }
        }
        if (s === 1) {
          (Cn(e, 0), _a(e, t, 0, !0));
          break;
        }
        e: {
          switch (((n = e), (c = s), c)) {
            case 0:
            case 1:
              throw Error(o(345));
            case 4:
              if ((t & 4194048) !== t) break;
            case 6:
              _a(n, t, Ut, !ca);
              break e;
            case 2:
              It = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(o(329));
          }
          if ((t & 62914560) === t && ((s = mr + 300 - Nt()), 10 < s)) {
            if ((_a(n, t, Ut, !ca), ws(n, 0, !0) !== 0)) break e;
            ((Hl = t),
              (n.timeoutHandle = rp(
                Lf.bind(null, n, a, It, fr, Vc, t, Ut, Ga, jn, ca, c, 'Throttled', -0, 0),
                s
              )));
            break e;
          }
          Lf(n, a, It, fr, Vc, t, Ut, Ga, jn, ca, c, null, -0, 0);
        }
      }
      break;
    } while (!0);
    bl(e);
  }
  function Lf(e, t, a, n, s, c, _, v, T, H, Q, F, $, Y) {
    if (((e.timeoutHandle = -1), (F = t.subtreeFlags), F & 8192 || (F & 16785408) === 16785408)) {
      ((F = {
        stylesheets: null,
        count: 0,
        imgCount: 0,
        imgBytes: 0,
        suspenseyImages: [],
        waitingForImages: !0,
        waitingForViewTransition: !1,
        unsuspend: Tl,
      }),
        Sf(t, c, F));
      var _e = (c & 62914560) === c ? mr - Nt() : (c & 4194048) === c ? jf - Nt() : 0;
      if (((_e = ry(F, _e)), _e !== null)) {
        ((Hl = c),
          (e.cancelPendingCommit = _e(zf.bind(null, e, t, c, a, n, s, _, v, T, Q, F, null, $, Y))),
          _a(e, c, _, !H));
        return;
      }
    }
    zf(e, t, c, a, n, s, _, v, T);
  }
  function Sv(e) {
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
            if (!Ot(c(), s)) return !1;
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
  function _a(e, t, a, n) {
    ((t &= ~Xc),
      (t &= ~Ga),
      (e.suspendedLanes |= t),
      (e.pingedLanes &= ~t),
      n && (e.warmLanes |= t),
      (n = e.expirationTimes));
    for (var s = t; 0 < s; ) {
      var c = 31 - Te(s),
        _ = 1 << c;
      ((n[c] = -1), (s &= ~_));
    }
    a !== 0 && Hd(e, a, t);
  }
  function pr() {
    return (Oe & 6) === 0 ? (zi(0), !1) : !0;
  }
  function Jc() {
    if (Ee !== null) {
      if (He === 0) var e = Ee.return;
      else ((e = Ee), (Cl = Ia = null), mc(e), (vn = null), (bi = 0), (e = Ee));
      for (; e !== null; ) (of(e.alternate, e), (e = e.return));
      Ee = null;
    }
  }
  function Cn(e, t) {
    var a = e.timeoutHandle;
    (a !== -1 && ((e.timeoutHandle = -1), Gv(a)),
      (a = e.cancelPendingCommit),
      a !== null && ((e.cancelPendingCommit = null), a()),
      (Hl = 0),
      Jc(),
      (Ve = e),
      (Ee = a = jl(e.current, null)),
      (Ae = t),
      (He = 0),
      (Ht = null),
      (ca = !1),
      (Nn = ni(e, t)),
      (Yc = !1),
      (jn = Ut = Xc = Ga = ua = nt = 0),
      (It = Ri = null),
      (Vc = !1),
      (t & 8) !== 0 && (t |= t & 32));
    var n = e.entangledLanes;
    if (n !== 0)
      for (e = e.entanglements, n &= t; 0 < n; ) {
        var s = 31 - Te(n),
          c = 1 << s;
        ((t |= e[s]), (n &= ~c));
      }
    return ((zl = t), Os(), a);
  }
  function qf(e, t) {
    ((we = null),
      (O.H = Ci),
      t === kn || t === Ys
        ? ((t = Qm()), (He = 3))
        : t === ec
          ? ((t = Qm()), (He = 4))
          : (He =
              t === Ec
                ? 8
                : t !== null && typeof t == 'object' && typeof t.then == 'function'
                  ? 6
                  : 1),
      (Ht = t),
      Ee === null && ((nt = 1), nr(e, Kt(t, e.current))));
  }
  function Bf() {
    var e = Dt.current;
    return e === null
      ? !0
      : (Ae & 4194048) === Ae
        ? Ft === null
        : (Ae & 62914560) === Ae || (Ae & 536870912) !== 0
          ? e === Ft
          : !1;
  }
  function If() {
    var e = O.H;
    return ((O.H = Ci), e === null ? Ci : e);
  }
  function Mf() {
    var e = O.A;
    return ((O.A = bv), e);
  }
  function hr() {
    ((nt = 4),
      ca || ((Ae & 4194048) !== Ae && Dt.current !== null) || (Nn = !0),
      ((ua & 134217727) === 0 && (Ga & 134217727) === 0) || Ve === null || _a(Ve, Ae, Ut, !1));
  }
  function Pc(e, t, a) {
    var n = Oe;
    Oe |= 2;
    var s = If(),
      c = Mf();
    ((Ve !== e || Ae !== t) && ((fr = null), Cn(e, t)), (t = !1));
    var _ = nt;
    e: do
      try {
        if (He !== 0 && Ee !== null) {
          var v = Ee,
            T = Ht;
          switch (He) {
            case 8:
              (Jc(), (_ = 6));
              break e;
            case 3:
            case 2:
            case 9:
            case 6:
              Dt.current === null && (t = !0);
              var H = He;
              if (((He = 0), (Ht = null), An(e, v, T, H), a && Nn)) {
                _ = 0;
                break e;
              }
              break;
            default:
              ((H = He), (He = 0), (Ht = null), An(e, v, T, H));
          }
        }
        (wv(), (_ = nt));
        break;
      } catch (Q) {
        qf(e, Q);
      }
    while (!0);
    return (
      t && e.shellSuspendCounter++,
      (Cl = Ia = null),
      (Oe = n),
      (O.H = s),
      (O.A = c),
      Ee === null && ((Ve = null), (Ae = 0), Os()),
      _
    );
  }
  function wv() {
    for (; Ee !== null; ) Of(Ee);
  }
  function Tv(e, t) {
    var a = Oe;
    Oe |= 2;
    var n = If(),
      s = Mf();
    Ve !== e || Ae !== t ? ((fr = null), (_r = Nt() + 500), Cn(e, t)) : (Nn = ni(e, t));
    e: do
      try {
        if (He !== 0 && Ee !== null) {
          t = Ee;
          var c = Ht;
          t: switch (He) {
            case 1:
              ((He = 0), (Ht = null), An(e, t, c, 1));
              break;
            case 2:
            case 9:
              if (Xm(c)) {
                ((He = 0), (Ht = null), Rf(t));
                break;
              }
              ((t = function () {
                ((He !== 2 && He !== 9) || Ve !== e || (He = 7), bl(e));
              }),
                c.then(t, t));
              break e;
            case 3:
              He = 7;
              break e;
            case 4:
              He = 5;
              break e;
            case 7:
              Xm(c) ? ((He = 0), (Ht = null), Rf(t)) : ((He = 0), (Ht = null), An(e, t, c, 7));
              break;
            case 5:
              var _ = null;
              switch (Ee.tag) {
                case 26:
                  _ = Ee.memoizedState;
                case 5:
                case 27:
                  var v = Ee;
                  if (_ ? xp(_) : v.stateNode.complete) {
                    ((He = 0), (Ht = null));
                    var T = v.sibling;
                    if (T !== null) Ee = T;
                    else {
                      var H = v.return;
                      H !== null ? ((Ee = H), gr(H)) : (Ee = null);
                    }
                    break t;
                  }
              }
              ((He = 0), (Ht = null), An(e, t, c, 5));
              break;
            case 6:
              ((He = 0), (Ht = null), An(e, t, c, 6));
              break;
            case 8:
              (Jc(), (nt = 6));
              break e;
            default:
              throw Error(o(462));
          }
        }
        Nv();
        break;
      } catch (Q) {
        qf(e, Q);
      }
    while (!0);
    return (
      (Cl = Ia = null),
      (O.H = n),
      (O.A = s),
      (Oe = a),
      Ee !== null ? 0 : ((Ve = null), (Ae = 0), Os(), nt)
    );
  }
  function Nv() {
    for (; Ee !== null && !Zl(); ) Of(Ee);
  }
  function Of(e) {
    var t = sf(e.alternate, e, zl);
    ((e.memoizedProps = e.pendingProps), t === null ? gr(e) : (Ee = t));
  }
  function Rf(e) {
    var t = e,
      a = t.alternate;
    switch (t.tag) {
      case 15:
      case 0:
        t = W_(a, t, t.pendingProps, t.type, void 0, Ae);
        break;
      case 11:
        t = W_(a, t, t.pendingProps, t.type.render, t.ref, Ae);
        break;
      case 5:
        mc(t);
      default:
        (of(a, t), (t = Ee = Im(t, zl)), (t = sf(a, t, zl)));
    }
    ((e.memoizedProps = e.pendingProps), t === null ? gr(e) : (Ee = t));
  }
  function An(e, t, a, n) {
    ((Cl = Ia = null), mc(t), (vn = null), (bi = 0));
    var s = t.return;
    try {
      if (fv(e, s, t, a, Ae)) {
        ((nt = 1), nr(e, Kt(a, e.current)), (Ee = null));
        return;
      }
    } catch (c) {
      if (s !== null) throw ((Ee = s), c);
      ((nt = 1), nr(e, Kt(a, e.current)), (Ee = null));
      return;
    }
    t.flags & 32768
      ? (qe || n === 1
          ? (e = !0)
          : Nn || (Ae & 536870912) !== 0
            ? (e = !1)
            : ((ca = e = !0),
              (n === 2 || n === 9 || n === 3 || n === 6) &&
                ((n = Dt.current), n !== null && n.tag === 13 && (n.flags |= 16384))),
        Df(t, e))
      : gr(t);
  }
  function gr(e) {
    var t = e;
    do {
      if ((t.flags & 32768) !== 0) {
        Df(t, ca);
        return;
      }
      e = t.return;
      var a = gv(t.alternate, t, zl);
      if (a !== null) {
        Ee = a;
        return;
      }
      if (((t = t.sibling), t !== null)) {
        Ee = t;
        return;
      }
      Ee = t = e;
    } while (t !== null);
    nt === 0 && (nt = 5);
  }
  function Df(e, t) {
    do {
      var a = kv(e.alternate, e);
      if (a !== null) {
        ((a.flags &= 32767), (Ee = a));
        return;
      }
      if (
        ((a = e.return),
        a !== null && ((a.flags |= 32768), (a.subtreeFlags = 0), (a.deletions = null)),
        !t && ((e = e.sibling), e !== null))
      ) {
        Ee = e;
        return;
      }
      Ee = e = a;
    } while (e !== null);
    ((nt = 6), (Ee = null));
  }
  function zf(e, t, a, n, s, c, _, v, T) {
    e.cancelPendingCommit = null;
    do kr();
    while (mt !== 0);
    if ((Oe & 6) !== 0) throw Error(o(327));
    if (t !== null) {
      if (t === e.current) throw Error(o(177));
      if (
        ((c = t.lanes | t.childLanes),
        (c |= zo),
        ik(e, a, c, _, v, T),
        e === Ve && ((Ee = Ve = null), (Ae = 0)),
        (En = t),
        (ma = e),
        (Hl = a),
        (Qc = c),
        (Kc = s),
        (Ef = n),
        (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0
          ? ((e.callbackNode = null),
            (e.callbackPriority = 0),
            Av(Ta, function () {
              return (Yf(), null);
            }))
          : ((e.callbackNode = null), (e.callbackPriority = 0)),
        (n = (t.flags & 13878) !== 0),
        (t.subtreeFlags & 13878) !== 0 || n)
      ) {
        ((n = O.T), (O.T = null), (s = le.p), (le.p = 2), (_ = Oe), (Oe |= 4));
        try {
          vv(e, t, a);
        } finally {
          ((Oe = _), (le.p = s), (O.T = n));
        }
      }
      ((mt = 1), Hf(), Uf(), $f());
    }
  }
  function Hf() {
    if (mt === 1) {
      mt = 0;
      var e = ma,
        t = En,
        a = (t.flags & 13878) !== 0;
      if ((t.subtreeFlags & 13878) !== 0 || a) {
        ((a = O.T), (O.T = null));
        var n = le.p;
        le.p = 2;
        var s = Oe;
        Oe |= 4;
        try {
          yf(t, e);
          var c = cu,
            _ = Tm(e.containerInfo),
            v = c.focusedElem,
            T = c.selectionRange;
          if (_ !== v && v && v.ownerDocument && wm(v.ownerDocument.documentElement, v)) {
            if (T !== null && Io(v)) {
              var H = T.start,
                Q = T.end;
              if ((Q === void 0 && (Q = H), 'selectionStart' in v))
                ((v.selectionStart = H), (v.selectionEnd = Math.min(Q, v.value.length)));
              else {
                var F = v.ownerDocument || document,
                  $ = (F && F.defaultView) || window;
                if ($.getSelection) {
                  var Y = $.getSelection(),
                    _e = v.textContent.length,
                    xe = Math.min(T.start, _e),
                    Ye = T.end === void 0 ? xe : Math.min(T.end, _e);
                  !Y.extend && xe > Ye && ((_ = Ye), (Ye = xe), (xe = _));
                  var I = Sm(v, xe),
                    E = Sm(v, Ye);
                  if (
                    I &&
                    E &&
                    (Y.rangeCount !== 1 ||
                      Y.anchorNode !== I.node ||
                      Y.anchorOffset !== I.offset ||
                      Y.focusNode !== E.node ||
                      Y.focusOffset !== E.offset)
                  ) {
                    var z = F.createRange();
                    (z.setStart(I.node, I.offset),
                      Y.removeAllRanges(),
                      xe > Ye
                        ? (Y.addRange(z), Y.extend(E.node, E.offset))
                        : (z.setEnd(E.node, E.offset), Y.addRange(z)));
                  }
                }
              }
            }
            for (F = [], Y = v; (Y = Y.parentNode); )
              Y.nodeType === 1 && F.push({ element: Y, left: Y.scrollLeft, top: Y.scrollTop });
            for (typeof v.focus == 'function' && v.focus(), v = 0; v < F.length; v++) {
              var J = F[v];
              ((J.element.scrollLeft = J.left), (J.element.scrollTop = J.top));
            }
          }
          ((Ar = !!ou), (cu = ou = null));
        } finally {
          ((Oe = s), (le.p = n), (O.T = a));
        }
      }
      ((e.current = t), (mt = 2));
    }
  }
  function Uf() {
    if (mt === 2) {
      mt = 0;
      var e = ma,
        t = En,
        a = (t.flags & 8772) !== 0;
      if ((t.subtreeFlags & 8772) !== 0 || a) {
        ((a = O.T), (O.T = null));
        var n = le.p;
        le.p = 2;
        var s = Oe;
        Oe |= 4;
        try {
          pf(e, t.alternate, t);
        } finally {
          ((Oe = s), (le.p = n), (O.T = a));
        }
      }
      mt = 3;
    }
  }
  function $f() {
    if (mt === 4 || mt === 3) {
      ((mt = 0), mo());
      var e = ma,
        t = En,
        a = Hl,
        n = Ef;
      (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0
        ? (mt = 5)
        : ((mt = 0), (En = ma = null), Gf(e, e.pendingLanes));
      var s = e.pendingLanes;
      if (
        (s === 0 && (da = null),
        po(a),
        (t = t.stateNode),
        ne && typeof ne.onCommitFiberRoot == 'function')
      )
        try {
          ne.onCommitFiberRoot(ae, t, void 0, (t.current.flags & 128) === 128);
        } catch {}
      if (n !== null) {
        ((t = O.T), (s = le.p), (le.p = 2), (O.T = null));
        try {
          for (var c = e.onRecoverableError, _ = 0; _ < n.length; _++) {
            var v = n[_];
            c(v.value, { componentStack: v.stack });
          }
        } finally {
          ((O.T = t), (le.p = s));
        }
      }
      ((Hl & 3) !== 0 && kr(),
        bl(e),
        (s = e.pendingLanes),
        (a & 261930) !== 0 && (s & 42) !== 0 ? (e === Zc ? Di++ : ((Di = 0), (Zc = e))) : (Di = 0),
        zi(0));
    }
  }
  function Gf(e, t) {
    (e.pooledCacheLanes &= t) === 0 &&
      ((t = e.pooledCache), t != null && ((e.pooledCache = null), vi(t)));
  }
  function kr() {
    return (Hf(), Uf(), $f(), Yf());
  }
  function Yf() {
    if (mt !== 5) return !1;
    var e = ma,
      t = Qc;
    Qc = 0;
    var a = po(Hl),
      n = O.T,
      s = le.p;
    try {
      ((le.p = 32 > a ? 32 : a), (O.T = null), (a = Kc), (Kc = null));
      var c = ma,
        _ = Hl;
      if (((mt = 0), (En = ma = null), (Hl = 0), (Oe & 6) !== 0)) throw Error(o(331));
      var v = Oe;
      if (
        ((Oe |= 4),
        Tf(c.current),
        xf(c, c.current, _, a),
        (Oe = v),
        zi(0, !1),
        ne && typeof ne.onPostCommitFiberRoot == 'function')
      )
        try {
          ne.onPostCommitFiberRoot(ae, c);
        } catch {}
      return !0;
    } finally {
      ((le.p = s), (O.T = n), Gf(e, t));
    }
  }
  function Xf(e, t, a) {
    ((t = Kt(a, t)),
      (t = jc(e.stateNode, t, 2)),
      (e = ia(e, t, 2)),
      e !== null && (ii(e, 2), bl(e)));
  }
  function Ue(e, t, a) {
    if (e.tag === 3) Xf(e, e, a);
    else
      for (; t !== null; ) {
        if (t.tag === 3) {
          Xf(t, e, a);
          break;
        } else if (t.tag === 1) {
          var n = t.stateNode;
          if (
            typeof t.type.getDerivedStateFromError == 'function' ||
            (typeof n.componentDidCatch == 'function' && (da === null || !da.has(n)))
          ) {
            ((e = Kt(a, e)),
              (a = X_(2)),
              (n = ia(t, a, 2)),
              n !== null && (V_(a, n, t, e), ii(n, 2), bl(n)));
            break;
          }
        }
        t = t.return;
      }
  }
  function Fc(e, t, a) {
    var n = e.pingCache;
    if (n === null) {
      n = e.pingCache = new xv();
      var s = new Set();
      n.set(t, s);
    } else ((s = n.get(t)), s === void 0 && ((s = new Set()), n.set(t, s)));
    s.has(a) || ((Yc = !0), s.add(a), (e = jv.bind(null, e, t, a)), t.then(e, e));
  }
  function jv(e, t, a) {
    var n = e.pingCache;
    (n !== null && n.delete(t),
      (e.pingedLanes |= e.suspendedLanes & a),
      (e.warmLanes &= ~a),
      Ve === e &&
        (Ae & a) === a &&
        (nt === 4 || (nt === 3 && (Ae & 62914560) === Ae && 300 > Nt() - mr)
          ? (Oe & 2) === 0 && Cn(e, 0)
          : (Xc |= a),
        jn === Ae && (jn = 0)),
      bl(e));
  }
  function Vf(e, t) {
    (t === 0 && (t = zd()), (e = La(e, t)), e !== null && (ii(e, t), bl(e)));
  }
  function Ev(e) {
    var t = e.memoizedState,
      a = 0;
    (t !== null && (a = t.retryLane), Vf(e, a));
  }
  function Cv(e, t) {
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
        throw Error(o(314));
    }
    (n !== null && n.delete(t), Vf(e, a));
  }
  function Av(e, t) {
    return ti(e, t);
  }
  var vr = null,
    Ln = null,
    Wc = !1,
    yr = !1,
    eu = !1,
    fa = 0;
  function bl(e) {
    (e !== Ln && e.next === null && (Ln === null ? (vr = Ln = e) : (Ln = Ln.next = e)),
      (yr = !0),
      Wc || ((Wc = !0), qv()));
  }
  function zi(e, t) {
    if (!eu && yr) {
      eu = !0;
      do
        for (var a = !1, n = vr; n !== null; ) {
          if (e !== 0) {
            var s = n.pendingLanes;
            if (s === 0) var c = 0;
            else {
              var _ = n.suspendedLanes,
                v = n.pingedLanes;
              ((c = (1 << (31 - Te(42 | e) + 1)) - 1),
                (c &= s & ~(_ & ~v)),
                (c = c & 201326741 ? (c & 201326741) | 1 : c ? c | 2 : 0));
            }
            c !== 0 && ((a = !0), Jf(n, c));
          } else
            ((c = Ae),
              (c = ws(
                n,
                n === Ve ? c : 0,
                n.cancelPendingCommit !== null || n.timeoutHandle !== -1
              )),
              (c & 3) === 0 || ni(n, c) || ((a = !0), Jf(n, c)));
          n = n.next;
        }
      while (a);
      eu = !1;
    }
  }
  function Lv() {
    Qf();
  }
  function Qf() {
    yr = Wc = !1;
    var e = 0;
    fa !== 0 && $v() && (e = fa);
    for (var t = Nt(), a = null, n = vr; n !== null; ) {
      var s = n.next,
        c = Kf(n, t);
      (c === 0
        ? ((n.next = null), a === null ? (vr = s) : (a.next = s), s === null && (Ln = a))
        : ((a = n), (e !== 0 || (c & 3) !== 0) && (yr = !0)),
        (n = s));
    }
    ((mt !== 0 && mt !== 5) || zi(e), fa !== 0 && (fa = 0));
  }
  function Kf(e, t) {
    for (
      var a = e.suspendedLanes,
        n = e.pingedLanes,
        s = e.expirationTimes,
        c = e.pendingLanes & -62914561;
      0 < c;
    ) {
      var _ = 31 - Te(c),
        v = 1 << _,
        T = s[_];
      (T === -1
        ? ((v & a) === 0 || (v & n) !== 0) && (s[_] = nk(v, t))
        : T <= t && (e.expiredLanes |= v),
        (c &= ~v));
    }
    if (
      ((t = Ve),
      (a = Ae),
      (a = ws(e, e === t ? a : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== -1)),
      (n = e.callbackNode),
      a === 0 || (e === t && (He === 2 || He === 9)) || e.cancelPendingCommit !== null)
    )
      return (n !== null && n !== null && lt(n), (e.callbackNode = null), (e.callbackPriority = 0));
    if ((a & 3) === 0 || ni(e, a)) {
      if (((t = a & -a), t === e.callbackPriority)) return t;
      switch ((n !== null && lt(n), po(a))) {
        case 2:
        case 8:
          a = li;
          break;
        case 32:
          a = Ta;
          break;
        case 268435456:
          a = ai;
          break;
        default:
          a = Ta;
      }
      return (
        (n = Zf.bind(null, e)),
        (a = ti(a, n)),
        (e.callbackPriority = t),
        (e.callbackNode = a),
        t
      );
    }
    return (
      n !== null && n !== null && lt(n),
      (e.callbackPriority = 2),
      (e.callbackNode = null),
      2
    );
  }
  function Zf(e, t) {
    if (mt !== 0 && mt !== 5) return ((e.callbackNode = null), (e.callbackPriority = 0), null);
    var a = e.callbackNode;
    if (kr() && e.callbackNode !== a) return null;
    var n = Ae;
    return (
      (n = ws(e, e === Ve ? n : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== -1)),
      n === 0
        ? null
        : (Af(e, n, t),
          Kf(e, Nt()),
          e.callbackNode != null && e.callbackNode === a ? Zf.bind(null, e) : null)
    );
  }
  function Jf(e, t) {
    if (kr()) return null;
    Af(e, t, !0);
  }
  function qv() {
    Yv(function () {
      (Oe & 6) !== 0 ? ti(vs, Lv) : Qf();
    });
  }
  function tu() {
    if (fa === 0) {
      var e = hn;
      (e === 0 && ((e = Jl), (Jl <<= 1), (Jl & 261888) === 0 && (Jl = 256)), (fa = e));
    }
    return fa;
  }
  function Pf(e) {
    return e == null || typeof e == 'symbol' || typeof e == 'boolean'
      ? null
      : typeof e == 'function'
        ? e
        : Es('' + e);
  }
  function Ff(e, t) {
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
  function Bv(e, t, a, n, s) {
    if (t === 'submit' && a && a.stateNode === s) {
      var c = Pf((s[Ct] || null).action),
        _ = n.submitter;
      _ &&
        ((t = (t = _[Ct] || null) ? Pf(t.formAction) : _.getAttribute('formAction')),
        t !== null && ((c = t), (_ = null)));
      var v = new qs('action', 'action', null, n, s);
      e.push({
        event: v,
        listeners: [
          {
            instance: null,
            listener: function () {
              if (n.defaultPrevented) {
                if (fa !== 0) {
                  var T = _ ? Ff(s, _) : new FormData(s);
                  bc(a, { pending: !0, data: T, method: s.method, action: c }, null, T);
                }
              } else
                typeof c == 'function' &&
                  (v.preventDefault(),
                  (T = _ ? Ff(s, _) : new FormData(s)),
                  bc(a, { pending: !0, data: T, method: s.method, action: c }, c, T));
            },
            currentTarget: s,
          },
        ],
      });
    }
  }
  for (var lu = 0; lu < Do.length; lu++) {
    var au = Do[lu],
      Iv = au.toLowerCase(),
      Mv = au[0].toUpperCase() + au.slice(1);
    sl(Iv, 'on' + Mv);
  }
  (sl(Em, 'onAnimationEnd'),
    sl(Cm, 'onAnimationIteration'),
    sl(Am, 'onAnimationStart'),
    sl('dblclick', 'onDoubleClick'),
    sl('focusin', 'onFocus'),
    sl('focusout', 'onBlur'),
    sl(Pk, 'onTransitionRun'),
    sl(Fk, 'onTransitionStart'),
    sl(Wk, 'onTransitionCancel'),
    sl(Lm, 'onTransitionEnd'),
    tn('onMouseEnter', ['mouseout', 'mouseover']),
    tn('onMouseLeave', ['mouseout', 'mouseover']),
    tn('onPointerEnter', ['pointerout', 'pointerover']),
    tn('onPointerLeave', ['pointerout', 'pointerover']),
    ja('onChange', 'change click focusin focusout input keydown keyup selectionchange'.split(' ')),
    ja(
      'onSelect',
      'focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange'.split(
        ' '
      )
    ),
    ja('onBeforeInput', ['compositionend', 'keypress', 'textInput', 'paste']),
    ja('onCompositionEnd', 'compositionend focusout keydown keypress keyup mousedown'.split(' ')),
    ja(
      'onCompositionStart',
      'compositionstart focusout keydown keypress keyup mousedown'.split(' ')
    ),
    ja(
      'onCompositionUpdate',
      'compositionupdate focusout keydown keypress keyup mousedown'.split(' ')
    ));
  var Hi =
      'abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting'.split(
        ' '
      ),
    Ov = new Set(
      'beforetoggle cancel close invalid load scroll scrollend toggle'.split(' ').concat(Hi)
    );
  function Wf(e, t) {
    t = (t & 4) !== 0;
    for (var a = 0; a < e.length; a++) {
      var n = e[a],
        s = n.event;
      n = n.listeners;
      e: {
        var c = void 0;
        if (t)
          for (var _ = n.length - 1; 0 <= _; _--) {
            var v = n[_],
              T = v.instance,
              H = v.currentTarget;
            if (((v = v.listener), T !== c && s.isPropagationStopped())) break e;
            ((c = v), (s.currentTarget = H));
            try {
              c(s);
            } catch (Q) {
              Ms(Q);
            }
            ((s.currentTarget = null), (c = T));
          }
        else
          for (_ = 0; _ < n.length; _++) {
            if (
              ((v = n[_]),
              (T = v.instance),
              (H = v.currentTarget),
              (v = v.listener),
              T !== c && s.isPropagationStopped())
            )
              break e;
            ((c = v), (s.currentTarget = H));
            try {
              c(s);
            } catch (Q) {
              Ms(Q);
            }
            ((s.currentTarget = null), (c = T));
          }
      }
    }
  }
  function Ce(e, t) {
    var a = t[ho];
    a === void 0 && (a = t[ho] = new Set());
    var n = e + '__bubble';
    a.has(n) || (ep(t, e, 2, !1), a.add(n));
  }
  function nu(e, t, a) {
    var n = 0;
    (t && (n |= 4), ep(a, e, n, t));
  }
  var br = '_reactListening' + Math.random().toString(36).slice(2);
  function iu(e) {
    if (!e[br]) {
      ((e[br] = !0),
        Vd.forEach(function (a) {
          a !== 'selectionchange' && (Ov.has(a) || nu(a, !1, e), nu(a, !0, e));
        }));
      var t = e.nodeType === 9 ? e : e.ownerDocument;
      t === null || t[br] || ((t[br] = !0), nu('selectionchange', !1, t));
    }
  }
  function ep(e, t, a, n) {
    switch (Cp(t)) {
      case 2:
        var s = uy;
        break;
      case 8:
        s = dy;
        break;
      default:
        s = yu;
    }
    ((a = s.bind(null, t, a, e)),
      (s = void 0),
      !To || (t !== 'touchstart' && t !== 'touchmove' && t !== 'wheel') || (s = !0),
      n
        ? s !== void 0
          ? e.addEventListener(t, a, { capture: !0, passive: s })
          : e.addEventListener(t, a, !0)
        : s !== void 0
          ? e.addEventListener(t, a, { passive: s })
          : e.addEventListener(t, a, !1));
  }
  function su(e, t, a, n, s) {
    var c = n;
    if ((t & 1) === 0 && (t & 2) === 0 && n !== null)
      e: for (;;) {
        if (n === null) return;
        var _ = n.tag;
        if (_ === 3 || _ === 4) {
          var v = n.stateNode.containerInfo;
          if (v === s) break;
          if (_ === 4)
            for (_ = n.return; _ !== null; ) {
              var T = _.tag;
              if ((T === 3 || T === 4) && _.stateNode.containerInfo === s) return;
              _ = _.return;
            }
          for (; v !== null; ) {
            if (((_ = Fa(v)), _ === null)) return;
            if (((T = _.tag), T === 5 || T === 6 || T === 26 || T === 27)) {
              n = c = _;
              continue e;
            }
            v = v.parentNode;
          }
        }
        n = n.return;
      }
    nm(function () {
      var H = c,
        Q = So(a),
        F = [];
      e: {
        var $ = qm.get(e);
        if ($ !== void 0) {
          var Y = qs,
            _e = e;
          switch (e) {
            case 'keypress':
              if (As(a) === 0) break e;
            case 'keydown':
            case 'keyup':
              Y = Ck;
              break;
            case 'focusin':
              ((_e = 'focus'), (Y = Co));
              break;
            case 'focusout':
              ((_e = 'blur'), (Y = Co));
              break;
            case 'beforeblur':
            case 'afterblur':
              Y = Co;
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
              Y = rm;
              break;
            case 'drag':
            case 'dragend':
            case 'dragenter':
            case 'dragexit':
            case 'dragleave':
            case 'dragover':
            case 'dragstart':
            case 'drop':
              Y = gk;
              break;
            case 'touchcancel':
            case 'touchend':
            case 'touchmove':
            case 'touchstart':
              Y = qk;
              break;
            case Em:
            case Cm:
            case Am:
              Y = yk;
              break;
            case Lm:
              Y = Ik;
              break;
            case 'scroll':
            case 'scrollend':
              Y = pk;
              break;
            case 'wheel':
              Y = Ok;
              break;
            case 'copy':
            case 'cut':
            case 'paste':
              Y = xk;
              break;
            case 'gotpointercapture':
            case 'lostpointercapture':
            case 'pointercancel':
            case 'pointerdown':
            case 'pointermove':
            case 'pointerout':
            case 'pointerover':
            case 'pointerup':
              Y = cm;
              break;
            case 'toggle':
            case 'beforetoggle':
              Y = Dk;
          }
          var xe = (t & 4) !== 0,
            Ye = !xe && (e === 'scroll' || e === 'scrollend'),
            I = xe ? ($ !== null ? $ + 'Capture' : null) : $;
          xe = [];
          for (var E = H, z; E !== null; ) {
            var J = E;
            if (
              ((z = J.stateNode),
              (J = J.tag),
              (J !== 5 && J !== 26 && J !== 27) ||
                z === null ||
                I === null ||
                ((J = oi(E, I)), J != null && xe.push(Ui(E, J, z))),
              Ye)
            )
              break;
            E = E.return;
          }
          0 < xe.length && (($ = new Y($, _e, null, a, Q)), F.push({ event: $, listeners: xe }));
        }
      }
      if ((t & 7) === 0) {
        e: {
          if (
            (($ = e === 'mouseover' || e === 'pointerover'),
            (Y = e === 'mouseout' || e === 'pointerout'),
            $ && a !== xo && (_e = a.relatedTarget || a.fromElement) && (Fa(_e) || _e[Pa]))
          )
            break e;
          if (
            (Y || $) &&
            (($ =
              Q.window === Q
                ? Q
                : ($ = Q.ownerDocument)
                  ? $.defaultView || $.parentWindow
                  : window),
            Y
              ? ((_e = a.relatedTarget || a.toElement),
                (Y = H),
                (_e = _e ? Fa(_e) : null),
                _e !== null &&
                  ((Ye = m(_e)), (xe = _e.tag), _e !== Ye || (xe !== 5 && xe !== 27 && xe !== 6)) &&
                  (_e = null))
              : ((Y = null), (_e = H)),
            Y !== _e)
          ) {
            if (
              ((xe = rm),
              (J = 'onMouseLeave'),
              (I = 'onMouseEnter'),
              (E = 'mouse'),
              (e === 'pointerout' || e === 'pointerover') &&
                ((xe = cm), (J = 'onPointerLeave'), (I = 'onPointerEnter'), (E = 'pointer')),
              (Ye = Y == null ? $ : ri(Y)),
              (z = _e == null ? $ : ri(_e)),
              ($ = new xe(J, E + 'leave', Y, a, Q)),
              ($.target = Ye),
              ($.relatedTarget = z),
              (J = null),
              Fa(Q) === H &&
                ((xe = new xe(I, E + 'enter', _e, a, Q)),
                (xe.target = z),
                (xe.relatedTarget = Ye),
                (J = xe)),
              (Ye = J),
              Y && _e)
            )
              t: {
                for (xe = Rv, I = Y, E = _e, z = 0, J = I; J; J = xe(J)) z++;
                J = 0;
                for (var ye = E; ye; ye = xe(ye)) J++;
                for (; 0 < z - J; ) ((I = xe(I)), z--);
                for (; 0 < J - z; ) ((E = xe(E)), J--);
                for (; z--; ) {
                  if (I === E || (E !== null && I === E.alternate)) {
                    xe = I;
                    break t;
                  }
                  ((I = xe(I)), (E = xe(E)));
                }
                xe = null;
              }
            else xe = null;
            (Y !== null && tp(F, $, Y, xe, !1),
              _e !== null && Ye !== null && tp(F, Ye, _e, xe, !0));
          }
        }
        e: {
          if (
            (($ = H ? ri(H) : window),
            (Y = $.nodeName && $.nodeName.toLowerCase()),
            Y === 'select' || (Y === 'input' && $.type === 'file'))
          )
            var Ie = gm;
          else if (pm($))
            if (km) Ie = Kk;
            else {
              Ie = Vk;
              var he = Xk;
            }
          else
            ((Y = $.nodeName),
              !Y || Y.toLowerCase() !== 'input' || ($.type !== 'checkbox' && $.type !== 'radio')
                ? H && bo(H.elementType) && (Ie = gm)
                : (Ie = Qk));
          if (Ie && (Ie = Ie(e, H))) {
            hm(F, Ie, a, Q);
            break e;
          }
          (he && he(e, $, H),
            e === 'focusout' &&
              H &&
              $.type === 'number' &&
              H.memoizedProps.value != null &&
              yo($, 'number', $.value));
        }
        switch (((he = H ? ri(H) : window), e)) {
          case 'focusin':
            (pm(he) || he.contentEditable === 'true') && ((on = he), (Mo = H), (hi = null));
            break;
          case 'focusout':
            hi = Mo = on = null;
            break;
          case 'mousedown':
            Oo = !0;
            break;
          case 'contextmenu':
          case 'mouseup':
          case 'dragend':
            ((Oo = !1), Nm(F, a, Q));
            break;
          case 'selectionchange':
            if (Jk) break;
          case 'keydown':
          case 'keyup':
            Nm(F, a, Q);
        }
        var Ne;
        if (Lo)
          e: {
            switch (e) {
              case 'compositionstart':
                var Le = 'onCompositionStart';
                break e;
              case 'compositionend':
                Le = 'onCompositionEnd';
                break e;
              case 'compositionupdate':
                Le = 'onCompositionUpdate';
                break e;
            }
            Le = void 0;
          }
        else
          rn
            ? _m(e, a) && (Le = 'onCompositionEnd')
            : e === 'keydown' && a.keyCode === 229 && (Le = 'onCompositionStart');
        (Le &&
          (um &&
            a.locale !== 'ko' &&
            (rn || Le !== 'onCompositionStart'
              ? Le === 'onCompositionEnd' && rn && (Ne = im())
              : ((Fl = Q), (No = 'value' in Fl ? Fl.value : Fl.textContent), (rn = !0))),
          (he = xr(H, Le)),
          0 < he.length &&
            ((Le = new om(Le, e, null, a, Q)),
            F.push({ event: Le, listeners: he }),
            Ne ? (Le.data = Ne) : ((Ne = fm(a)), Ne !== null && (Le.data = Ne)))),
          (Ne = Hk ? Uk(e, a) : $k(e, a)) &&
            ((Le = xr(H, 'onBeforeInput')),
            0 < Le.length &&
              ((he = new om('onBeforeInput', 'beforeinput', null, a, Q)),
              F.push({ event: he, listeners: Le }),
              (he.data = Ne))),
          Bv(F, e, H, a, Q));
      }
      Wf(F, t);
    });
  }
  function Ui(e, t, a) {
    return { instance: e, listener: t, currentTarget: a };
  }
  function xr(e, t) {
    for (var a = t + 'Capture', n = []; e !== null; ) {
      var s = e,
        c = s.stateNode;
      if (
        ((s = s.tag),
        (s !== 5 && s !== 26 && s !== 27) ||
          c === null ||
          ((s = oi(e, a)),
          s != null && n.unshift(Ui(e, s, c)),
          (s = oi(e, t)),
          s != null && n.push(Ui(e, s, c))),
        e.tag === 3)
      )
        return n;
      e = e.return;
    }
    return [];
  }
  function Rv(e) {
    if (e === null) return null;
    do e = e.return;
    while (e && e.tag !== 5 && e.tag !== 27);
    return e || null;
  }
  function tp(e, t, a, n, s) {
    for (var c = t._reactName, _ = []; a !== null && a !== n; ) {
      var v = a,
        T = v.alternate,
        H = v.stateNode;
      if (((v = v.tag), T !== null && T === n)) break;
      ((v !== 5 && v !== 26 && v !== 27) ||
        H === null ||
        ((T = H),
        s
          ? ((H = oi(a, c)), H != null && _.unshift(Ui(a, H, T)))
          : s || ((H = oi(a, c)), H != null && _.push(Ui(a, H, T)))),
        (a = a.return));
    }
    _.length !== 0 && e.push({ event: t, listeners: _ });
  }
  var Dv = /\r\n?/g,
    zv = /\u0000|\uFFFD/g;
  function lp(e) {
    return (typeof e == 'string' ? e : '' + e)
      .replace(
        Dv,
        `
`
      )
      .replace(zv, '');
  }
  function ap(e, t) {
    return ((t = lp(t)), lp(e) === t);
  }
  function Ge(e, t, a, n, s, c) {
    switch (a) {
      case 'children':
        typeof n == 'string'
          ? t === 'body' || (t === 'textarea' && n === '') || an(e, n)
          : (typeof n == 'number' || typeof n == 'bigint') && t !== 'body' && an(e, '' + n);
        break;
      case 'className':
        Ns(e, 'class', n);
        break;
      case 'tabIndex':
        Ns(e, 'tabindex', n);
        break;
      case 'dir':
      case 'role':
      case 'viewBox':
      case 'width':
      case 'height':
        Ns(e, a, n);
        break;
      case 'style':
        lm(e, n, c);
        break;
      case 'data':
        if (t !== 'object') {
          Ns(e, 'data', n);
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
        ((n = Es('' + n)), e.setAttribute(a, n));
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
              ? (t !== 'input' && Ge(e, t, 'name', s.name, s, null),
                Ge(e, t, 'formEncType', s.formEncType, s, null),
                Ge(e, t, 'formMethod', s.formMethod, s, null),
                Ge(e, t, 'formTarget', s.formTarget, s, null))
              : (Ge(e, t, 'encType', s.encType, s, null),
                Ge(e, t, 'method', s.method, s, null),
                Ge(e, t, 'target', s.target, s, null)));
        if (n == null || typeof n == 'symbol' || typeof n == 'boolean') {
          e.removeAttribute(a);
          break;
        }
        ((n = Es('' + n)), e.setAttribute(a, n));
        break;
      case 'onClick':
        n != null && (e.onclick = Tl);
        break;
      case 'onScroll':
        n != null && Ce('scroll', e);
        break;
      case 'onScrollEnd':
        n != null && Ce('scrollend', e);
        break;
      case 'dangerouslySetInnerHTML':
        if (n != null) {
          if (typeof n != 'object' || !('__html' in n)) throw Error(o(61));
          if (((a = n.__html), a != null)) {
            if (s.children != null) throw Error(o(60));
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
        ((a = Es('' + n)), e.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', a));
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
        (Ce('beforetoggle', e), Ce('toggle', e), Ts(e, 'popover', n));
        break;
      case 'xlinkActuate':
        wl(e, 'http://www.w3.org/1999/xlink', 'xlink:actuate', n);
        break;
      case 'xlinkArcrole':
        wl(e, 'http://www.w3.org/1999/xlink', 'xlink:arcrole', n);
        break;
      case 'xlinkRole':
        wl(e, 'http://www.w3.org/1999/xlink', 'xlink:role', n);
        break;
      case 'xlinkShow':
        wl(e, 'http://www.w3.org/1999/xlink', 'xlink:show', n);
        break;
      case 'xlinkTitle':
        wl(e, 'http://www.w3.org/1999/xlink', 'xlink:title', n);
        break;
      case 'xlinkType':
        wl(e, 'http://www.w3.org/1999/xlink', 'xlink:type', n);
        break;
      case 'xmlBase':
        wl(e, 'http://www.w3.org/XML/1998/namespace', 'xml:base', n);
        break;
      case 'xmlLang':
        wl(e, 'http://www.w3.org/XML/1998/namespace', 'xml:lang', n);
        break;
      case 'xmlSpace':
        wl(e, 'http://www.w3.org/XML/1998/namespace', 'xml:space', n);
        break;
      case 'is':
        Ts(e, 'is', n);
        break;
      case 'innerText':
      case 'textContent':
        break;
      default:
        (!(2 < a.length) || (a[0] !== 'o' && a[0] !== 'O') || (a[1] !== 'n' && a[1] !== 'N')) &&
          ((a = _k.get(a) || a), Ts(e, a, n));
    }
  }
  function ru(e, t, a, n, s, c) {
    switch (a) {
      case 'style':
        lm(e, n, c);
        break;
      case 'dangerouslySetInnerHTML':
        if (n != null) {
          if (typeof n != 'object' || !('__html' in n)) throw Error(o(61));
          if (((a = n.__html), a != null)) {
            if (s.children != null) throw Error(o(60));
            e.innerHTML = a;
          }
        }
        break;
      case 'children':
        typeof n == 'string'
          ? an(e, n)
          : (typeof n == 'number' || typeof n == 'bigint') && an(e, '' + n);
        break;
      case 'onScroll':
        n != null && Ce('scroll', e);
        break;
      case 'onScrollEnd':
        n != null && Ce('scrollend', e);
        break;
      case 'onClick':
        n != null && (e.onclick = Tl);
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
        if (!Qd.hasOwnProperty(a))
          e: {
            if (
              a[0] === 'o' &&
              a[1] === 'n' &&
              ((s = a.endsWith('Capture')),
              (t = a.slice(2, s ? a.length - 7 : void 0)),
              (c = e[Ct] || null),
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
            a in e ? (e[a] = n) : n === !0 ? e.setAttribute(a, '') : Ts(e, a, n);
          }
    }
  }
  function St(e, t, a) {
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
        (Ce('error', e), Ce('load', e));
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
                  throw Error(o(137, t));
                default:
                  Ge(e, t, c, _, a, null);
              }
          }
        (s && Ge(e, t, 'srcSet', a.srcSet, a, null), n && Ge(e, t, 'src', a.src, a, null));
        return;
      case 'input':
        Ce('invalid', e);
        var v = (c = _ = s = null),
          T = null,
          H = null;
        for (n in a)
          if (a.hasOwnProperty(n)) {
            var Q = a[n];
            if (Q != null)
              switch (n) {
                case 'name':
                  s = Q;
                  break;
                case 'type':
                  _ = Q;
                  break;
                case 'checked':
                  T = Q;
                  break;
                case 'defaultChecked':
                  H = Q;
                  break;
                case 'value':
                  c = Q;
                  break;
                case 'defaultValue':
                  v = Q;
                  break;
                case 'children':
                case 'dangerouslySetInnerHTML':
                  if (Q != null) throw Error(o(137, t));
                  break;
                default:
                  Ge(e, t, n, Q, a, null);
              }
          }
        Fd(e, c, v, T, H, _, s, !1);
        return;
      case 'select':
        (Ce('invalid', e), (n = _ = c = null));
        for (s in a)
          if (a.hasOwnProperty(s) && ((v = a[s]), v != null))
            switch (s) {
              case 'value':
                c = v;
                break;
              case 'defaultValue':
                _ = v;
                break;
              case 'multiple':
                n = v;
              default:
                Ge(e, t, s, v, a, null);
            }
        ((t = c),
          (a = _),
          (e.multiple = !!n),
          t != null ? ln(e, !!n, t, !1) : a != null && ln(e, !!n, a, !0));
        return;
      case 'textarea':
        (Ce('invalid', e), (c = s = n = null));
        for (_ in a)
          if (a.hasOwnProperty(_) && ((v = a[_]), v != null))
            switch (_) {
              case 'value':
                n = v;
                break;
              case 'defaultValue':
                s = v;
                break;
              case 'children':
                c = v;
                break;
              case 'dangerouslySetInnerHTML':
                if (v != null) throw Error(o(91));
                break;
              default:
                Ge(e, t, _, v, a, null);
            }
        em(e, n, s, c);
        return;
      case 'option':
        for (T in a)
          if (a.hasOwnProperty(T) && ((n = a[T]), n != null))
            switch (T) {
              case 'selected':
                e.selected = n && typeof n != 'function' && typeof n != 'symbol';
                break;
              default:
                Ge(e, t, T, n, a, null);
            }
        return;
      case 'dialog':
        (Ce('beforetoggle', e), Ce('toggle', e), Ce('cancel', e), Ce('close', e));
        break;
      case 'iframe':
      case 'object':
        Ce('load', e);
        break;
      case 'video':
      case 'audio':
        for (n = 0; n < Hi.length; n++) Ce(Hi[n], e);
        break;
      case 'image':
        (Ce('error', e), Ce('load', e));
        break;
      case 'details':
        Ce('toggle', e);
        break;
      case 'embed':
      case 'source':
      case 'link':
        (Ce('error', e), Ce('load', e));
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
        for (H in a)
          if (a.hasOwnProperty(H) && ((n = a[H]), n != null))
            switch (H) {
              case 'children':
              case 'dangerouslySetInnerHTML':
                throw Error(o(137, t));
              default:
                Ge(e, t, H, n, a, null);
            }
        return;
      default:
        if (bo(t)) {
          for (Q in a)
            a.hasOwnProperty(Q) && ((n = a[Q]), n !== void 0 && ru(e, t, Q, n, a, void 0));
          return;
        }
    }
    for (v in a) a.hasOwnProperty(v) && ((n = a[v]), n != null && Ge(e, t, v, n, a, null));
  }
  function Hv(e, t, a, n) {
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
          v = null,
          T = null,
          H = null,
          Q = null;
        for (Y in a) {
          var F = a[Y];
          if (a.hasOwnProperty(Y) && F != null)
            switch (Y) {
              case 'checked':
                break;
              case 'value':
                break;
              case 'defaultValue':
                T = F;
              default:
                n.hasOwnProperty(Y) || Ge(e, t, Y, null, n, F);
            }
        }
        for (var $ in n) {
          var Y = n[$];
          if (((F = a[$]), n.hasOwnProperty($) && (Y != null || F != null)))
            switch ($) {
              case 'type':
                c = Y;
                break;
              case 'name':
                s = Y;
                break;
              case 'checked':
                H = Y;
                break;
              case 'defaultChecked':
                Q = Y;
                break;
              case 'value':
                _ = Y;
                break;
              case 'defaultValue':
                v = Y;
                break;
              case 'children':
              case 'dangerouslySetInnerHTML':
                if (Y != null) throw Error(o(137, t));
                break;
              default:
                Y !== F && Ge(e, t, $, Y, n, F);
            }
        }
        vo(e, _, v, T, H, Q, c, s);
        return;
      case 'select':
        Y = _ = v = $ = null;
        for (c in a)
          if (((T = a[c]), a.hasOwnProperty(c) && T != null))
            switch (c) {
              case 'value':
                break;
              case 'multiple':
                Y = T;
              default:
                n.hasOwnProperty(c) || Ge(e, t, c, null, n, T);
            }
        for (s in n)
          if (((c = n[s]), (T = a[s]), n.hasOwnProperty(s) && (c != null || T != null)))
            switch (s) {
              case 'value':
                $ = c;
                break;
              case 'defaultValue':
                v = c;
                break;
              case 'multiple':
                _ = c;
              default:
                c !== T && Ge(e, t, s, c, n, T);
            }
        ((t = v),
          (a = _),
          (n = Y),
          $ != null
            ? ln(e, !!a, $, !1)
            : !!n != !!a && (t != null ? ln(e, !!a, t, !0) : ln(e, !!a, a ? [] : '', !1)));
        return;
      case 'textarea':
        Y = $ = null;
        for (v in a)
          if (((s = a[v]), a.hasOwnProperty(v) && s != null && !n.hasOwnProperty(v)))
            switch (v) {
              case 'value':
                break;
              case 'children':
                break;
              default:
                Ge(e, t, v, null, n, s);
            }
        for (_ in n)
          if (((s = n[_]), (c = a[_]), n.hasOwnProperty(_) && (s != null || c != null)))
            switch (_) {
              case 'value':
                $ = s;
                break;
              case 'defaultValue':
                Y = s;
                break;
              case 'children':
                break;
              case 'dangerouslySetInnerHTML':
                if (s != null) throw Error(o(91));
                break;
              default:
                s !== c && Ge(e, t, _, s, n, c);
            }
        Wd(e, $, Y);
        return;
      case 'option':
        for (var _e in a)
          if ((($ = a[_e]), a.hasOwnProperty(_e) && $ != null && !n.hasOwnProperty(_e)))
            switch (_e) {
              case 'selected':
                e.selected = !1;
                break;
              default:
                Ge(e, t, _e, null, n, $);
            }
        for (T in n)
          if ((($ = n[T]), (Y = a[T]), n.hasOwnProperty(T) && $ !== Y && ($ != null || Y != null)))
            switch (T) {
              case 'selected':
                e.selected = $ && typeof $ != 'function' && typeof $ != 'symbol';
                break;
              default:
                Ge(e, t, T, $, n, Y);
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
        for (var xe in a)
          (($ = a[xe]),
            a.hasOwnProperty(xe) && $ != null && !n.hasOwnProperty(xe) && Ge(e, t, xe, null, n, $));
        for (H in n)
          if ((($ = n[H]), (Y = a[H]), n.hasOwnProperty(H) && $ !== Y && ($ != null || Y != null)))
            switch (H) {
              case 'children':
              case 'dangerouslySetInnerHTML':
                if ($ != null) throw Error(o(137, t));
                break;
              default:
                Ge(e, t, H, $, n, Y);
            }
        return;
      default:
        if (bo(t)) {
          for (var Ye in a)
            (($ = a[Ye]),
              a.hasOwnProperty(Ye) &&
                $ !== void 0 &&
                !n.hasOwnProperty(Ye) &&
                ru(e, t, Ye, void 0, n, $));
          for (Q in n)
            (($ = n[Q]),
              (Y = a[Q]),
              !n.hasOwnProperty(Q) ||
                $ === Y ||
                ($ === void 0 && Y === void 0) ||
                ru(e, t, Q, $, n, Y));
          return;
        }
    }
    for (var I in a)
      (($ = a[I]),
        a.hasOwnProperty(I) && $ != null && !n.hasOwnProperty(I) && Ge(e, t, I, null, n, $));
    for (F in n)
      (($ = n[F]),
        (Y = a[F]),
        !n.hasOwnProperty(F) || $ === Y || ($ == null && Y == null) || Ge(e, t, F, $, n, Y));
  }
  function np(e) {
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
  function Uv() {
    if (typeof performance.getEntriesByType == 'function') {
      for (
        var e = 0, t = 0, a = performance.getEntriesByType('resource'), n = 0;
        n < a.length;
        n++
      ) {
        var s = a[n],
          c = s.transferSize,
          _ = s.initiatorType,
          v = s.duration;
        if (c && v && np(_)) {
          for (_ = 0, v = s.responseEnd, n += 1; n < a.length; n++) {
            var T = a[n],
              H = T.startTime;
            if (H > v) break;
            var Q = T.transferSize,
              F = T.initiatorType;
            Q && np(F) && ((T = T.responseEnd), (_ += Q * (T < v ? 1 : (v - H) / (T - H))));
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
  var ou = null,
    cu = null;
  function Sr(e) {
    return e.nodeType === 9 ? e : e.ownerDocument;
  }
  function ip(e) {
    switch (e) {
      case 'http://www.w3.org/2000/svg':
        return 1;
      case 'http://www.w3.org/1998/Math/MathML':
        return 2;
      default:
        return 0;
    }
  }
  function sp(e, t) {
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
  function uu(e, t) {
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
  var du = null;
  function $v() {
    var e = window.event;
    return e && e.type === 'popstate' ? (e === du ? !1 : ((du = e), !0)) : ((du = null), !1);
  }
  var rp = typeof setTimeout == 'function' ? setTimeout : void 0,
    Gv = typeof clearTimeout == 'function' ? clearTimeout : void 0,
    op = typeof Promise == 'function' ? Promise : void 0,
    Yv =
      typeof queueMicrotask == 'function'
        ? queueMicrotask
        : typeof op < 'u'
          ? function (e) {
              return op.resolve(null).then(e).catch(Xv);
            }
          : rp;
  function Xv(e) {
    setTimeout(function () {
      throw e;
    });
  }
  function pa(e) {
    return e === 'head';
  }
  function cp(e, t) {
    var a = t,
      n = 0;
    do {
      var s = a.nextSibling;
      if ((e.removeChild(a), s && s.nodeType === 8))
        if (((a = s.data), a === '/$' || a === '/&')) {
          if (n === 0) {
            (e.removeChild(s), Mn(t));
            return;
          }
          n--;
        } else if (a === '$' || a === '$?' || a === '$~' || a === '$!' || a === '&') n++;
        else if (a === 'html') $i(e.ownerDocument.documentElement);
        else if (a === 'head') {
          ((a = e.ownerDocument.head), $i(a));
          for (var c = a.firstChild; c; ) {
            var _ = c.nextSibling,
              v = c.nodeName;
            (c[si] ||
              v === 'SCRIPT' ||
              v === 'STYLE' ||
              (v === 'LINK' && c.rel.toLowerCase() === 'stylesheet') ||
              a.removeChild(c),
              (c = _));
          }
        } else a === 'body' && $i(e.ownerDocument.body);
      a = s;
    } while (a);
    Mn(t);
  }
  function up(e, t) {
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
  function mu(e) {
    var t = e.firstChild;
    for (t && t.nodeType === 10 && (t = t.nextSibling); t; ) {
      var a = t;
      switch (((t = t.nextSibling), a.nodeName)) {
        case 'HTML':
        case 'HEAD':
        case 'BODY':
          (mu(a), go(a));
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
  function Vv(e, t, a, n) {
    for (; e.nodeType === 1; ) {
      var s = a;
      if (e.nodeName.toLowerCase() !== t.toLowerCase()) {
        if (!n && (e.nodeName !== 'INPUT' || e.type !== 'hidden')) break;
      } else if (n) {
        if (!e[si])
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
      if (((e = Wt(e.nextSibling)), e === null)) break;
    }
    return null;
  }
  function Qv(e, t, a) {
    if (t === '') return null;
    for (; e.nodeType !== 3; )
      if (
        ((e.nodeType !== 1 || e.nodeName !== 'INPUT' || e.type !== 'hidden') && !a) ||
        ((e = Wt(e.nextSibling)), e === null)
      )
        return null;
    return e;
  }
  function dp(e, t) {
    for (; e.nodeType !== 8; )
      if (
        ((e.nodeType !== 1 || e.nodeName !== 'INPUT' || e.type !== 'hidden') && !t) ||
        ((e = Wt(e.nextSibling)), e === null)
      )
        return null;
    return e;
  }
  function _u(e) {
    return e.data === '$?' || e.data === '$~';
  }
  function fu(e) {
    return e.data === '$!' || (e.data === '$?' && e.ownerDocument.readyState !== 'loading');
  }
  function Kv(e, t) {
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
  function Wt(e) {
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
  var pu = null;
  function mp(e) {
    e = e.nextSibling;
    for (var t = 0; e; ) {
      if (e.nodeType === 8) {
        var a = e.data;
        if (a === '/$' || a === '/&') {
          if (t === 0) return Wt(e.nextSibling);
          t--;
        } else (a !== '$' && a !== '$!' && a !== '$?' && a !== '$~' && a !== '&') || t++;
      }
      e = e.nextSibling;
    }
    return null;
  }
  function _p(e) {
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
  function fp(e, t, a) {
    switch (((t = Sr(a)), e)) {
      case 'html':
        if (((e = t.documentElement), !e)) throw Error(o(452));
        return e;
      case 'head':
        if (((e = t.head), !e)) throw Error(o(453));
        return e;
      case 'body':
        if (((e = t.body), !e)) throw Error(o(454));
        return e;
      default:
        throw Error(o(451));
    }
  }
  function $i(e) {
    for (var t = e.attributes; t.length; ) e.removeAttributeNode(t[0]);
    go(e);
  }
  var el = new Map(),
    pp = new Set();
  function wr(e) {
    return typeof e.getRootNode == 'function'
      ? e.getRootNode()
      : e.nodeType === 9
        ? e
        : e.ownerDocument;
  }
  var Ul = le.d;
  le.d = { f: Zv, r: Jv, D: Pv, C: Fv, L: Wv, m: ey, X: ly, S: ty, M: ay };
  function Zv() {
    var e = Ul.f(),
      t = pr();
    return e || t;
  }
  function Jv(e) {
    var t = Wa(e);
    t !== null && t.tag === 5 && t.type === 'form' ? L_(t) : Ul.r(e);
  }
  var qn = typeof document > 'u' ? null : document;
  function hp(e, t, a) {
    var n = qn;
    if (n && typeof t == 'string' && t) {
      var s = Vt(t);
      ((s = 'link[rel="' + e + '"][href="' + s + '"]'),
        typeof a == 'string' && (s += '[crossorigin="' + a + '"]'),
        pp.has(s) ||
          (pp.add(s),
          (e = { rel: e, crossOrigin: a, href: t }),
          n.querySelector(s) === null &&
            ((t = n.createElement('link')), St(t, 'link', e), ft(t), n.head.appendChild(t))));
    }
  }
  function Pv(e) {
    (Ul.D(e), hp('dns-prefetch', e, null));
  }
  function Fv(e, t) {
    (Ul.C(e, t), hp('preconnect', e, t));
  }
  function Wv(e, t, a) {
    Ul.L(e, t, a);
    var n = qn;
    if (n && e && t) {
      var s = 'link[rel="preload"][as="' + Vt(t) + '"]';
      t === 'image' && a && a.imageSrcSet
        ? ((s += '[imagesrcset="' + Vt(a.imageSrcSet) + '"]'),
          typeof a.imageSizes == 'string' && (s += '[imagesizes="' + Vt(a.imageSizes) + '"]'))
        : (s += '[href="' + Vt(e) + '"]');
      var c = s;
      switch (t) {
        case 'style':
          c = Bn(e);
          break;
        case 'script':
          c = In(e);
      }
      el.has(c) ||
        ((e = k(
          { rel: 'preload', href: t === 'image' && a && a.imageSrcSet ? void 0 : e, as: t },
          a
        )),
        el.set(c, e),
        n.querySelector(s) !== null ||
          (t === 'style' && n.querySelector(Gi(c))) ||
          (t === 'script' && n.querySelector(Yi(c))) ||
          ((t = n.createElement('link')), St(t, 'link', e), ft(t), n.head.appendChild(t)));
    }
  }
  function ey(e, t) {
    Ul.m(e, t);
    var a = qn;
    if (a && e) {
      var n = t && typeof t.as == 'string' ? t.as : 'script',
        s = 'link[rel="modulepreload"][as="' + Vt(n) + '"][href="' + Vt(e) + '"]',
        c = s;
      switch (n) {
        case 'audioworklet':
        case 'paintworklet':
        case 'serviceworker':
        case 'sharedworker':
        case 'worker':
        case 'script':
          c = In(e);
      }
      if (
        !el.has(c) &&
        ((e = k({ rel: 'modulepreload', href: e }, t)), el.set(c, e), a.querySelector(s) === null)
      ) {
        switch (n) {
          case 'audioworklet':
          case 'paintworklet':
          case 'serviceworker':
          case 'sharedworker':
          case 'worker':
          case 'script':
            if (a.querySelector(Yi(c))) return;
        }
        ((n = a.createElement('link')), St(n, 'link', e), ft(n), a.head.appendChild(n));
      }
    }
  }
  function ty(e, t, a) {
    Ul.S(e, t, a);
    var n = qn;
    if (n && e) {
      var s = en(n).hoistableStyles,
        c = Bn(e);
      t = t || 'default';
      var _ = s.get(c);
      if (!_) {
        var v = { loading: 0, preload: null };
        if ((_ = n.querySelector(Gi(c)))) v.loading = 5;
        else {
          ((e = k({ rel: 'stylesheet', href: e, 'data-precedence': t }, a)),
            (a = el.get(c)) && hu(e, a));
          var T = (_ = n.createElement('link'));
          (ft(T),
            St(T, 'link', e),
            (T._p = new Promise(function (H, Q) {
              ((T.onload = H), (T.onerror = Q));
            })),
            T.addEventListener('load', function () {
              v.loading |= 1;
            }),
            T.addEventListener('error', function () {
              v.loading |= 2;
            }),
            (v.loading |= 4),
            Tr(_, t, n));
        }
        ((_ = { type: 'stylesheet', instance: _, count: 1, state: v }), s.set(c, _));
      }
    }
  }
  function ly(e, t) {
    Ul.X(e, t);
    var a = qn;
    if (a && e) {
      var n = en(a).hoistableScripts,
        s = In(e),
        c = n.get(s);
      c ||
        ((c = a.querySelector(Yi(s))),
        c ||
          ((e = k({ src: e, async: !0 }, t)),
          (t = el.get(s)) && gu(e, t),
          (c = a.createElement('script')),
          ft(c),
          St(c, 'link', e),
          a.head.appendChild(c)),
        (c = { type: 'script', instance: c, count: 1, state: null }),
        n.set(s, c));
    }
  }
  function ay(e, t) {
    Ul.M(e, t);
    var a = qn;
    if (a && e) {
      var n = en(a).hoistableScripts,
        s = In(e),
        c = n.get(s);
      c ||
        ((c = a.querySelector(Yi(s))),
        c ||
          ((e = k({ src: e, async: !0, type: 'module' }, t)),
          (t = el.get(s)) && gu(e, t),
          (c = a.createElement('script')),
          ft(c),
          St(c, 'link', e),
          a.head.appendChild(c)),
        (c = { type: 'script', instance: c, count: 1, state: null }),
        n.set(s, c));
    }
  }
  function gp(e, t, a, n) {
    var s = (s = pe.current) ? wr(s) : null;
    if (!s) throw Error(o(446));
    switch (e) {
      case 'meta':
      case 'title':
        return null;
      case 'style':
        return typeof a.precedence == 'string' && typeof a.href == 'string'
          ? ((t = Bn(a.href)),
            (a = en(s).hoistableStyles),
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
          e = Bn(a.href);
          var c = en(s).hoistableStyles,
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
              (c = s.querySelector(Gi(e))) && !c._p && ((_.instance = c), (_.state.loading = 5)),
              el.has(e) ||
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
                el.set(e, a),
                c || ny(s, e, a, _.state))),
            t && n === null)
          )
            throw Error(o(528, ''));
          return _;
        }
        if (t && n !== null) throw Error(o(529, ''));
        return null;
      case 'script':
        return (
          (t = a.async),
          (a = a.src),
          typeof a == 'string' && t && typeof t != 'function' && typeof t != 'symbol'
            ? ((t = In(a)),
              (a = en(s).hoistableScripts),
              (n = a.get(t)),
              n || ((n = { type: 'script', instance: null, count: 0, state: null }), a.set(t, n)),
              n)
            : { type: 'void', instance: null, count: 0, state: null }
        );
      default:
        throw Error(o(444, e));
    }
  }
  function Bn(e) {
    return 'href="' + Vt(e) + '"';
  }
  function Gi(e) {
    return 'link[rel="stylesheet"][' + e + ']';
  }
  function kp(e) {
    return k({}, e, { 'data-precedence': e.precedence, precedence: null });
  }
  function ny(e, t, a, n) {
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
        St(t, 'link', a),
        ft(t),
        e.head.appendChild(t));
  }
  function In(e) {
    return '[src="' + Vt(e) + '"]';
  }
  function Yi(e) {
    return 'script[async]' + e;
  }
  function vp(e, t, a) {
    if ((t.count++, t.instance === null))
      switch (t.type) {
        case 'style':
          var n = e.querySelector('style[data-href~="' + Vt(a.href) + '"]');
          if (n) return ((t.instance = n), ft(n), n);
          var s = k({}, a, {
            'data-href': a.href,
            'data-precedence': a.precedence,
            href: null,
            precedence: null,
          });
          return (
            (n = (e.ownerDocument || e).createElement('style')),
            ft(n),
            St(n, 'style', s),
            Tr(n, a.precedence, e),
            (t.instance = n)
          );
        case 'stylesheet':
          s = Bn(a.href);
          var c = e.querySelector(Gi(s));
          if (c) return ((t.state.loading |= 4), (t.instance = c), ft(c), c);
          ((n = kp(a)),
            (s = el.get(s)) && hu(n, s),
            (c = (e.ownerDocument || e).createElement('link')),
            ft(c));
          var _ = c;
          return (
            (_._p = new Promise(function (v, T) {
              ((_.onload = v), (_.onerror = T));
            })),
            St(c, 'link', n),
            (t.state.loading |= 4),
            Tr(c, a.precedence, e),
            (t.instance = c)
          );
        case 'script':
          return (
            (c = In(a.src)),
            (s = e.querySelector(Yi(c)))
              ? ((t.instance = s), ft(s), s)
              : ((n = a),
                (s = el.get(c)) && ((n = k({}, a)), gu(n, s)),
                (e = e.ownerDocument || e),
                (s = e.createElement('script')),
                ft(s),
                St(s, 'link', n),
                e.head.appendChild(s),
                (t.instance = s))
          );
        case 'void':
          return null;
        default:
          throw Error(o(443, t.type));
      }
    else
      t.type === 'stylesheet' &&
        (t.state.loading & 4) === 0 &&
        ((n = t.instance), (t.state.loading |= 4), Tr(n, a.precedence, e));
    return t.instance;
  }
  function Tr(e, t, a) {
    for (
      var n = a.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),
        s = n.length ? n[n.length - 1] : null,
        c = s,
        _ = 0;
      _ < n.length;
      _++
    ) {
      var v = n[_];
      if (v.dataset.precedence === t) c = v;
      else if (c !== s) break;
    }
    c
      ? c.parentNode.insertBefore(e, c.nextSibling)
      : ((t = a.nodeType === 9 ? a.head : a), t.insertBefore(e, t.firstChild));
  }
  function hu(e, t) {
    (e.crossOrigin == null && (e.crossOrigin = t.crossOrigin),
      e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy),
      e.title == null && (e.title = t.title));
  }
  function gu(e, t) {
    (e.crossOrigin == null && (e.crossOrigin = t.crossOrigin),
      e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy),
      e.integrity == null && (e.integrity = t.integrity));
  }
  var Nr = null;
  function yp(e, t, a) {
    if (Nr === null) {
      var n = new Map(),
        s = (Nr = new Map());
      s.set(a, n);
    } else ((s = Nr), (n = s.get(a)), n || ((n = new Map()), s.set(a, n)));
    if (n.has(e)) return n;
    for (n.set(e, null), a = a.getElementsByTagName(e), s = 0; s < a.length; s++) {
      var c = a[s];
      if (
        !(c[si] || c[vt] || (e === 'link' && c.getAttribute('rel') === 'stylesheet')) &&
        c.namespaceURI !== 'http://www.w3.org/2000/svg'
      ) {
        var _ = c.getAttribute(t) || '';
        _ = e + _;
        var v = n.get(_);
        v ? v.push(c) : n.set(_, [c]);
      }
    }
    return n;
  }
  function bp(e, t, a) {
    ((e = e.ownerDocument || e),
      e.head.insertBefore(a, t === 'title' ? e.querySelector('head > title') : null));
  }
  function iy(e, t, a) {
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
  function xp(e) {
    return !(e.type === 'stylesheet' && (e.state.loading & 3) === 0);
  }
  function sy(e, t, a, n) {
    if (
      a.type === 'stylesheet' &&
      (typeof n.media != 'string' || matchMedia(n.media).matches !== !1) &&
      (a.state.loading & 4) === 0
    ) {
      if (a.instance === null) {
        var s = Bn(n.href),
          c = t.querySelector(Gi(s));
        if (c) {
          ((t = c._p),
            t !== null &&
              typeof t == 'object' &&
              typeof t.then == 'function' &&
              (e.count++, (e = jr.bind(e)), t.then(e, e)),
            (a.state.loading |= 4),
            (a.instance = c),
            ft(c));
          return;
        }
        ((c = t.ownerDocument || t),
          (n = kp(n)),
          (s = el.get(s)) && hu(n, s),
          (c = c.createElement('link')),
          ft(c));
        var _ = c;
        ((_._p = new Promise(function (v, T) {
          ((_.onload = v), (_.onerror = T));
        })),
          St(c, 'link', n),
          (a.instance = c));
      }
      (e.stylesheets === null && (e.stylesheets = new Map()),
        e.stylesheets.set(a, t),
        (t = a.state.preload) &&
          (a.state.loading & 3) === 0 &&
          (e.count++,
          (a = jr.bind(e)),
          t.addEventListener('load', a),
          t.addEventListener('error', a)));
    }
  }
  var ku = 0;
  function ry(e, t) {
    return (
      e.stylesheets && e.count === 0 && Cr(e, e.stylesheets),
      0 < e.count || 0 < e.imgCount
        ? function (a) {
            var n = setTimeout(function () {
              if ((e.stylesheets && Cr(e, e.stylesheets), e.unsuspend)) {
                var c = e.unsuspend;
                ((e.unsuspend = null), c());
              }
            }, 6e4 + t);
            0 < e.imgBytes && ku === 0 && (ku = 62500 * Uv());
            var s = setTimeout(
              function () {
                if (
                  ((e.waitingForImages = !1),
                  e.count === 0 && (e.stylesheets && Cr(e, e.stylesheets), e.unsuspend))
                ) {
                  var c = e.unsuspend;
                  ((e.unsuspend = null), c());
                }
              },
              (e.imgBytes > ku ? 50 : 800) + t
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
  function jr() {
    if ((this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages))) {
      if (this.stylesheets) Cr(this, this.stylesheets);
      else if (this.unsuspend) {
        var e = this.unsuspend;
        ((this.unsuspend = null), e());
      }
    }
  }
  var Er = null;
  function Cr(e, t) {
    ((e.stylesheets = null),
      e.unsuspend !== null &&
        (e.count++, (Er = new Map()), t.forEach(oy, e), (Er = null), jr.call(e)));
  }
  function oy(e, t) {
    if (!(t.state.loading & 4)) {
      var a = Er.get(e);
      if (a) var n = a.get(null);
      else {
        ((a = new Map()), Er.set(e, a));
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
        (n = jr.bind(this)),
        s.addEventListener('load', n),
        s.addEventListener('error', n),
        c
          ? c.parentNode.insertBefore(s, c.nextSibling)
          : ((e = e.nodeType === 9 ? e.head : e), e.insertBefore(s, e.firstChild)),
        (t.state.loading |= 4));
    }
  }
  var Xi = {
    $$typeof: V,
    Provider: null,
    Consumer: null,
    _currentValue: re,
    _currentValue2: re,
    _threadCount: 0,
  };
  function cy(e, t, a, n, s, c, _, v, T) {
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
      (this.expirationTimes = _o(-1)),
      (this.entangledLanes =
        this.shellSuspendCounter =
        this.errorRecoveryDisabledLanes =
        this.expiredLanes =
        this.warmLanes =
        this.pingedLanes =
        this.suspendedLanes =
        this.pendingLanes =
          0),
      (this.entanglements = _o(0)),
      (this.hiddenUpdates = _o(null)),
      (this.identifierPrefix = n),
      (this.onUncaughtError = s),
      (this.onCaughtError = c),
      (this.onRecoverableError = _),
      (this.pooledCache = null),
      (this.pooledCacheLanes = 0),
      (this.formState = T),
      (this.incompleteTransitions = new Map()));
  }
  function Sp(e, t, a, n, s, c, _, v, T, H, Q, F) {
    return (
      (e = new cy(e, t, a, _, T, H, Q, F, v)),
      (t = 1),
      c === !0 && (t |= 24),
      (c = Rt(3, null, null, t)),
      (e.current = c),
      (c.stateNode = e),
      (t = Po()),
      t.refCount++,
      (e.pooledCache = t),
      t.refCount++,
      (c.memoizedState = { element: n, isDehydrated: a, cache: t }),
      tc(c),
      e
    );
  }
  function wp(e) {
    return e ? ((e = dn), e) : dn;
  }
  function Tp(e, t, a, n, s, c) {
    ((s = wp(s)),
      n.context === null ? (n.context = s) : (n.pendingContext = s),
      (n = na(t)),
      (n.payload = { element: a }),
      (c = c === void 0 ? null : c),
      c !== null && (n.callback = c),
      (a = ia(e, n, t)),
      a !== null && (Mt(a, e, t), Si(a, e, t)));
  }
  function Np(e, t) {
    if (((e = e.memoizedState), e !== null && e.dehydrated !== null)) {
      var a = e.retryLane;
      e.retryLane = a !== 0 && a < t ? a : t;
    }
  }
  function vu(e, t) {
    (Np(e, t), (e = e.alternate) && Np(e, t));
  }
  function jp(e) {
    if (e.tag === 13 || e.tag === 31) {
      var t = La(e, 67108864);
      (t !== null && Mt(t, e, 67108864), vu(e, 67108864));
    }
  }
  function Ep(e) {
    if (e.tag === 13 || e.tag === 31) {
      var t = $t();
      t = fo(t);
      var a = La(e, t);
      (a !== null && Mt(a, e, t), vu(e, t));
    }
  }
  var Ar = !0;
  function uy(e, t, a, n) {
    var s = O.T;
    O.T = null;
    var c = le.p;
    try {
      ((le.p = 2), yu(e, t, a, n));
    } finally {
      ((le.p = c), (O.T = s));
    }
  }
  function dy(e, t, a, n) {
    var s = O.T;
    O.T = null;
    var c = le.p;
    try {
      ((le.p = 8), yu(e, t, a, n));
    } finally {
      ((le.p = c), (O.T = s));
    }
  }
  function yu(e, t, a, n) {
    if (Ar) {
      var s = bu(n);
      if (s === null) (su(e, t, n, Lr, a), Ap(e, n));
      else if (_y(s, e, t, a, n)) n.stopPropagation();
      else if ((Ap(e, n), t & 4 && -1 < my.indexOf(e))) {
        for (; s !== null; ) {
          var c = Wa(s);
          if (c !== null)
            switch (c.tag) {
              case 3:
                if (((c = c.stateNode), c.current.memoizedState.isDehydrated)) {
                  var _ = Na(c.pendingLanes);
                  if (_ !== 0) {
                    var v = c;
                    for (v.pendingLanes |= 2, v.entangledLanes |= 2; _; ) {
                      var T = 1 << (31 - Te(_));
                      ((v.entanglements[1] |= T), (_ &= ~T));
                    }
                    (bl(c), (Oe & 6) === 0 && ((_r = Nt() + 500), zi(0)));
                  }
                }
                break;
              case 31:
              case 13:
                ((v = La(c, 2)), v !== null && Mt(v, c, 2), pr(), vu(c, 2));
            }
          if (((c = bu(n)), c === null && su(e, t, n, Lr, a), c === s)) break;
          s = c;
        }
        s !== null && n.stopPropagation();
      } else su(e, t, n, null, a);
    }
  }
  function bu(e) {
    return ((e = So(e)), xu(e));
  }
  var Lr = null;
  function xu(e) {
    if (((Lr = null), (e = Fa(e)), e !== null)) {
      var t = m(e);
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
    return ((Lr = e), null);
  }
  function Cp(e) {
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
        switch (ks()) {
          case vs:
            return 2;
          case li:
            return 8;
          case Ta:
          case ys:
            return 32;
          case ai:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var Su = !1,
    ha = null,
    ga = null,
    ka = null,
    Vi = new Map(),
    Qi = new Map(),
    va = [],
    my =
      'mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset'.split(
        ' '
      );
  function Ap(e, t) {
    switch (e) {
      case 'focusin':
      case 'focusout':
        ha = null;
        break;
      case 'dragenter':
      case 'dragleave':
        ga = null;
        break;
      case 'mouseover':
      case 'mouseout':
        ka = null;
        break;
      case 'pointerover':
      case 'pointerout':
        Vi.delete(t.pointerId);
        break;
      case 'gotpointercapture':
      case 'lostpointercapture':
        Qi.delete(t.pointerId);
    }
  }
  function Ki(e, t, a, n, s, c) {
    return e === null || e.nativeEvent !== c
      ? ((e = {
          blockedOn: t,
          domEventName: a,
          eventSystemFlags: n,
          nativeEvent: c,
          targetContainers: [s],
        }),
        t !== null && ((t = Wa(t)), t !== null && jp(t)),
        e)
      : ((e.eventSystemFlags |= n),
        (t = e.targetContainers),
        s !== null && t.indexOf(s) === -1 && t.push(s),
        e);
  }
  function _y(e, t, a, n, s) {
    switch (t) {
      case 'focusin':
        return ((ha = Ki(ha, e, t, a, n, s)), !0);
      case 'dragenter':
        return ((ga = Ki(ga, e, t, a, n, s)), !0);
      case 'mouseover':
        return ((ka = Ki(ka, e, t, a, n, s)), !0);
      case 'pointerover':
        var c = s.pointerId;
        return (Vi.set(c, Ki(Vi.get(c) || null, e, t, a, n, s)), !0);
      case 'gotpointercapture':
        return ((c = s.pointerId), Qi.set(c, Ki(Qi.get(c) || null, e, t, a, n, s)), !0);
    }
    return !1;
  }
  function Lp(e) {
    var t = Fa(e.target);
    if (t !== null) {
      var a = m(t);
      if (a !== null) {
        if (((t = a.tag), t === 13)) {
          if (((t = f(a)), t !== null)) {
            ((e.blockedOn = t),
              Yd(e.priority, function () {
                Ep(a);
              }));
            return;
          }
        } else if (t === 31) {
          if (((t = h(a)), t !== null)) {
            ((e.blockedOn = t),
              Yd(e.priority, function () {
                Ep(a);
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
  function qr(e) {
    if (e.blockedOn !== null) return !1;
    for (var t = e.targetContainers; 0 < t.length; ) {
      var a = bu(e.nativeEvent);
      if (a === null) {
        a = e.nativeEvent;
        var n = new a.constructor(a.type, a);
        ((xo = n), a.target.dispatchEvent(n), (xo = null));
      } else return ((t = Wa(a)), t !== null && jp(t), (e.blockedOn = a), !1);
      t.shift();
    }
    return !0;
  }
  function qp(e, t, a) {
    qr(e) && a.delete(t);
  }
  function fy() {
    ((Su = !1),
      ha !== null && qr(ha) && (ha = null),
      ga !== null && qr(ga) && (ga = null),
      ka !== null && qr(ka) && (ka = null),
      Vi.forEach(qp),
      Qi.forEach(qp));
  }
  function Br(e, t) {
    e.blockedOn === t &&
      ((e.blockedOn = null),
      Su || ((Su = !0), l.unstable_scheduleCallback(l.unstable_NormalPriority, fy)));
  }
  var Ir = null;
  function Bp(e) {
    Ir !== e &&
      ((Ir = e),
      l.unstable_scheduleCallback(l.unstable_NormalPriority, function () {
        Ir === e && (Ir = null);
        for (var t = 0; t < e.length; t += 3) {
          var a = e[t],
            n = e[t + 1],
            s = e[t + 2];
          if (typeof n != 'function') {
            if (xu(n || a) === null) continue;
            break;
          }
          var c = Wa(a);
          c !== null &&
            (e.splice(t, 3),
            (t -= 3),
            bc(c, { pending: !0, data: s, method: a.method, action: n }, n, s));
        }
      }));
  }
  function Mn(e) {
    function t(T) {
      return Br(T, e);
    }
    (ha !== null && Br(ha, e),
      ga !== null && Br(ga, e),
      ka !== null && Br(ka, e),
      Vi.forEach(t),
      Qi.forEach(t));
    for (var a = 0; a < va.length; a++) {
      var n = va[a];
      n.blockedOn === e && (n.blockedOn = null);
    }
    for (; 0 < va.length && ((a = va[0]), a.blockedOn === null); )
      (Lp(a), a.blockedOn === null && va.shift());
    if (((a = (e.ownerDocument || e).$$reactFormReplay), a != null))
      for (n = 0; n < a.length; n += 3) {
        var s = a[n],
          c = a[n + 1],
          _ = s[Ct] || null;
        if (typeof c == 'function') _ || Bp(a);
        else if (_) {
          var v = null;
          if (c && c.hasAttribute('formAction')) {
            if (((s = c), (_ = c[Ct] || null))) v = _.formAction;
            else if (xu(s) !== null) continue;
          } else v = _.action;
          (typeof v == 'function' ? (a[n + 1] = v) : (a.splice(n, 3), (n -= 3)), Bp(a));
        }
      }
  }
  function Ip() {
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
  function wu(e) {
    this._internalRoot = e;
  }
  ((Mr.prototype.render = wu.prototype.render =
    function (e) {
      var t = this._internalRoot;
      if (t === null) throw Error(o(409));
      var a = t.current,
        n = $t();
      Tp(a, n, e, t, null, null);
    }),
    (Mr.prototype.unmount = wu.prototype.unmount =
      function () {
        var e = this._internalRoot;
        if (e !== null) {
          this._internalRoot = null;
          var t = e.containerInfo;
          (Tp(e.current, 2, null, e, null, null), pr(), (t[Pa] = null));
        }
      }));
  function Mr(e) {
    this._internalRoot = e;
  }
  Mr.prototype.unstable_scheduleHydration = function (e) {
    if (e) {
      var t = Gd();
      e = { blockedOn: null, target: e, priority: t };
      for (var a = 0; a < va.length && t !== 0 && t < va[a].priority; a++);
      (va.splice(a, 0, e), a === 0 && Lp(e));
    }
  };
  var Mp = i.version;
  if (Mp !== '19.2.5') throw Error(o(527, Mp, '19.2.5'));
  le.findDOMNode = function (e) {
    var t = e._reactInternals;
    if (t === void 0)
      throw typeof e.render == 'function'
        ? Error(o(188))
        : ((e = Object.keys(e).join(',')), Error(o(268, e)));
    return ((e = g(t)), (e = e !== null ? y(e) : null), (e = e === null ? null : e.stateNode), e);
  };
  var py = {
    bundleType: 0,
    version: '19.2.5',
    rendererPackageName: 'react-dom',
    currentDispatcherRef: O,
    reconcilerVersion: '19.2.5',
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < 'u') {
    var Or = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Or.isDisabled && Or.supportsFiber)
      try {
        ((ae = Or.inject(py)), (ne = Or));
      } catch {}
  }
  return (
    (Ji.createRoot = function (e, t) {
      if (!u(e)) throw Error(o(299));
      var a = !1,
        n = '',
        s = U_,
        c = $_,
        _ = G_;
      return (
        t != null &&
          (t.unstable_strictMode === !0 && (a = !0),
          t.identifierPrefix !== void 0 && (n = t.identifierPrefix),
          t.onUncaughtError !== void 0 && (s = t.onUncaughtError),
          t.onCaughtError !== void 0 && (c = t.onCaughtError),
          t.onRecoverableError !== void 0 && (_ = t.onRecoverableError)),
        (t = Sp(e, 1, !1, null, null, a, n, null, s, c, _, Ip)),
        (e[Pa] = t.current),
        iu(e),
        new wu(t)
      );
    }),
    (Ji.hydrateRoot = function (e, t, a) {
      if (!u(e)) throw Error(o(299));
      var n = !1,
        s = '',
        c = U_,
        _ = $_,
        v = G_,
        T = null;
      return (
        a != null &&
          (a.unstable_strictMode === !0 && (n = !0),
          a.identifierPrefix !== void 0 && (s = a.identifierPrefix),
          a.onUncaughtError !== void 0 && (c = a.onUncaughtError),
          a.onCaughtError !== void 0 && (_ = a.onCaughtError),
          a.onRecoverableError !== void 0 && (v = a.onRecoverableError),
          a.formState !== void 0 && (T = a.formState)),
        (t = Sp(e, 1, !0, t, a ?? null, n, s, T, c, _, v, Ip)),
        (t.context = wp(null)),
        (a = t.current),
        (n = $t()),
        (n = fo(n)),
        (s = na(n)),
        (s.callback = null),
        ia(a, s, n),
        (a = n),
        (t.current.lanes = a),
        ii(t, a),
        bl(t),
        (e[Pa] = t.current),
        iu(e),
        new Mr(t)
      );
    }),
    (Ji.version = '19.2.5'),
    Ji
  );
}
var Xp;
function jy() {
  if (Xp) return ju.exports;
  Xp = 1;
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
  return (l(), (ju.exports = Ny()), ju.exports);
}
var Ey = jy(),
  S = ud();
/**
 * react-router v7.14.2
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */ var Vp = 'popstate';
function Qp(l) {
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
function Cy(l = {}) {
  function i(o, u) {
    var g;
    let m = (g = u.state) == null ? void 0 : g.masked,
      { pathname: f, search: h, hash: p } = m || o.location;
    return Qu(
      '',
      { pathname: f, search: h, hash: p },
      (u.state && u.state.usr) || null,
      (u.state && u.state.key) || 'default',
      m
        ? { pathname: o.location.pathname, search: o.location.search, hash: o.location.hash }
        : void 0
    );
  }
  function r(o, u) {
    return typeof u == 'string' ? u : as(u);
  }
  return Ly(i, r, null, l);
}
function We(l, i) {
  if (l === !1 || l === null || typeof l > 'u') throw new Error(i);
}
function ml(l, i) {
  if (!l) {
    typeof console < 'u' && console.warn(i);
    try {
      throw new Error(i);
    } catch {}
  }
}
function Ay() {
  return Math.random().toString(36).substring(2, 10);
}
function Kp(l, i) {
  return {
    usr: l.state,
    key: l.key,
    idx: i,
    masked: l.unstable_mask ? { pathname: l.pathname, search: l.search, hash: l.hash } : void 0,
  };
}
function Qu(l, i, r = null, o, u) {
  return {
    pathname: typeof l == 'string' ? l : l.pathname,
    search: '',
    hash: '',
    ...(typeof i == 'string' ? Qn(i) : i),
    state: r,
    key: (i && i.key) || o || Ay(),
    unstable_mask: u,
  };
}
function as({ pathname: l = '/', search: i = '', hash: r = '' }) {
  return (
    i && i !== '?' && (l += i.charAt(0) === '?' ? i : '?' + i),
    r && r !== '#' && (l += r.charAt(0) === '#' ? r : '#' + r),
    l
  );
}
function Qn(l) {
  let i = {};
  if (l) {
    let r = l.indexOf('#');
    r >= 0 && ((i.hash = l.substring(r)), (l = l.substring(0, r)));
    let o = l.indexOf('?');
    (o >= 0 && ((i.search = l.substring(o)), (l = l.substring(0, o))), l && (i.pathname = l));
  }
  return i;
}
function Ly(l, i, r, o = {}) {
  let { window: u = document.defaultView, v5Compat: m = !1 } = o,
    f = u.history,
    h = 'POP',
    p = null,
    g = y();
  g == null && ((g = 0), f.replaceState({ ...f.state, idx: g }, ''));
  function y() {
    return (f.state || { idx: null }).idx;
  }
  function k() {
    h = 'POP';
    let B = y(),
      j = B == null ? null : B - g;
    ((g = B), p && p({ action: h, location: G.location, delta: j }));
  }
  function L(B, j) {
    h = 'PUSH';
    let A = Qp(B) ? B : Qu(G.location, B, j);
    g = y() + 1;
    let V = Kp(A, g),
      U = G.createHref(A.unstable_mask || A);
    try {
      f.pushState(V, '', U);
    } catch (oe) {
      if (oe instanceof DOMException && oe.name === 'DataCloneError') throw oe;
      u.location.assign(U);
    }
    m && p && p({ action: h, location: G.location, delta: 1 });
  }
  function N(B, j) {
    h = 'REPLACE';
    let A = Qp(B) ? B : Qu(G.location, B, j);
    g = y();
    let V = Kp(A, g),
      U = G.createHref(A.unstable_mask || A);
    (f.replaceState(V, '', U), m && p && p({ action: h, location: G.location, delta: 0 }));
  }
  function M(B) {
    return qy(B);
  }
  let G = {
    get action() {
      return h;
    },
    get location() {
      return l(u, f);
    },
    listen(B) {
      if (p) throw new Error('A history only accepts one active listener');
      return (
        u.addEventListener(Vp, k),
        (p = B),
        () => {
          (u.removeEventListener(Vp, k), (p = null));
        }
      );
    },
    createHref(B) {
      return i(u, B);
    },
    createURL: M,
    encodeLocation(B) {
      let j = M(B);
      return { pathname: j.pathname, search: j.search, hash: j.hash };
    },
    push: L,
    replace: N,
    go(B) {
      return f.go(B);
    },
  };
  return G;
}
function qy(l, i = !1) {
  let r = 'http://localhost';
  (typeof window < 'u' &&
    (r = window.location.origin !== 'null' ? window.location.origin : window.location.href),
    We(r, 'No window.location.(origin|href) available to create URL'));
  let o = typeof l == 'string' ? l : as(l);
  return ((o = o.replace(/ $/, '%20')), !i && o.startsWith('//') && (o = r + o), new URL(o, r));
}
function Mh(l, i, r = '/') {
  return By(l, i, r, !1);
}
function By(l, i, r, o) {
  let u = typeof i == 'string' ? Qn(i) : i,
    m = Ql(u.pathname || '/', r);
  if (m == null) return null;
  let f = Oh(l);
  Iy(f);
  let h = null;
  for (let p = 0; h == null && p < f.length; ++p) {
    let g = Xy(m);
    h = Gy(f[p], g, o);
  }
  return h;
}
function Oh(l, i = [], r = [], o = '', u = !1) {
  let m = (f, h, p = u, g) => {
    let y = {
      relativePath: g === void 0 ? f.path || '' : g,
      caseSensitive: f.caseSensitive === !0,
      childrenIndex: h,
      route: f,
    };
    if (y.relativePath.startsWith('/')) {
      if (!y.relativePath.startsWith(o) && p) return;
      (We(
        y.relativePath.startsWith(o),
        `Absolute route path "${y.relativePath}" nested under path "${o}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`
      ),
        (y.relativePath = y.relativePath.slice(o.length)));
    }
    let k = dl([o, y.relativePath]),
      L = r.concat(y);
    (f.children &&
      f.children.length > 0 &&
      (We(
        f.index !== !0,
        `Index routes must not have child routes. Please remove all child routes from route path "${k}".`
      ),
      Oh(f.children, i, L, k, p)),
      !(f.path == null && !f.index) && i.push({ path: k, score: Uy(k, f.index), routesMeta: L }));
  };
  return (
    l.forEach((f, h) => {
      var p;
      if (f.path === '' || !((p = f.path) != null && p.includes('?'))) m(f, h);
      else for (let g of Rh(f.path)) m(f, h, !0, g);
    }),
    i
  );
}
function Rh(l) {
  let i = l.split('/');
  if (i.length === 0) return [];
  let [r, ...o] = i,
    u = r.endsWith('?'),
    m = r.replace(/\?$/, '');
  if (o.length === 0) return u ? [m, ''] : [m];
  let f = Rh(o.join('/')),
    h = [];
  return (
    h.push(...f.map((p) => (p === '' ? m : [m, p].join('/')))),
    u && h.push(...f),
    h.map((p) => (l.startsWith('/') && p === '' ? '/' : p))
  );
}
function Iy(l) {
  l.sort((i, r) =>
    i.score !== r.score
      ? r.score - i.score
      : $y(
          i.routesMeta.map((o) => o.childrenIndex),
          r.routesMeta.map((o) => o.childrenIndex)
        )
  );
}
var My = /^:[\w-]+$/,
  Oy = 3,
  Ry = 2,
  Dy = 1,
  zy = 10,
  Hy = -2,
  Zp = (l) => l === '*';
function Uy(l, i) {
  let r = l.split('/'),
    o = r.length;
  return (
    r.some(Zp) && (o += Hy),
    i && (o += Ry),
    r.filter((u) => !Zp(u)).reduce((u, m) => u + (My.test(m) ? Oy : m === '' ? Dy : zy), o)
  );
}
function $y(l, i) {
  return l.length === i.length && l.slice(0, -1).every((o, u) => o === i[u])
    ? l[l.length - 1] - i[i.length - 1]
    : 0;
}
function Gy(l, i, r = !1) {
  let { routesMeta: o } = l,
    u = {},
    m = '/',
    f = [];
  for (let h = 0; h < o.length; ++h) {
    let p = o[h],
      g = h === o.length - 1,
      y = m === '/' ? i : i.slice(m.length) || '/',
      k = Kr({ path: p.relativePath, caseSensitive: p.caseSensitive, end: g }, y),
      L = p.route;
    if (
      (!k &&
        g &&
        r &&
        !o[o.length - 1].route.index &&
        (k = Kr({ path: p.relativePath, caseSensitive: p.caseSensitive, end: !1 }, y)),
      !k)
    )
      return null;
    (Object.assign(u, k.params),
      f.push({
        params: u,
        pathname: dl([m, k.pathname]),
        pathnameBase: Zy(dl([m, k.pathnameBase])),
        route: L,
      }),
      k.pathnameBase !== '/' && (m = dl([m, k.pathnameBase])));
  }
  return f;
}
function Kr(l, i) {
  typeof l == 'string' && (l = { path: l, caseSensitive: !1, end: !0 });
  let [r, o] = Yy(l.path, l.caseSensitive, l.end),
    u = i.match(r);
  if (!u) return null;
  let m = u[0],
    f = m.replace(/(.)\/+$/, '$1'),
    h = u.slice(1);
  return {
    params: o.reduce((g, { paramName: y, isOptional: k }, L) => {
      if (y === '*') {
        let M = h[L] || '';
        f = m.slice(0, m.length - M.length).replace(/(.)\/+$/, '$1');
      }
      const N = h[L];
      return (k && !N ? (g[y] = void 0) : (g[y] = (N || '').replace(/%2F/g, '/')), g);
    }, {}),
    pathname: m,
    pathnameBase: f,
    pattern: l,
  };
}
function Yy(l, i = !1, r = !0) {
  ml(
    l === '*' || !l.endsWith('*') || l.endsWith('/*'),
    `Route path "${l}" will be treated as if it were "${l.replace(/\*$/, '/*')}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${l.replace(/\*$/, '/*')}".`
  );
  let o = [],
    u =
      '^' +
      l
        .replace(/\/*\*?$/, '')
        .replace(/^\/*/, '/')
        .replace(/[\\.*+^${}|()[\]]/g, '\\$&')
        .replace(/\/:([\w-]+)(\?)?/g, (f, h, p, g, y) => {
          if ((o.push({ paramName: h, isOptional: p != null }), p)) {
            let k = y.charAt(g + f.length);
            return k && k !== '/' ? '/([^\\/]*)' : '(?:/([^\\/]*))?';
          }
          return '/([^\\/]+)';
        })
        .replace(/\/([\w-]+)\?(\/|$)/g, '(/$1)?$2');
  return (
    l.endsWith('*')
      ? (o.push({ paramName: '*' }), (u += l === '*' || l === '/*' ? '(.*)$' : '(?:\\/(.+)|\\/*)$'))
      : r
        ? (u += '\\/*$')
        : l !== '' && l !== '/' && (u += '(?:(?=\\/|$))'),
    [new RegExp(u, i ? void 0 : 'i'), o]
  );
}
function Xy(l) {
  try {
    return l
      .split('/')
      .map((i) => decodeURIComponent(i).replace(/\//g, '%2F'))
      .join('/');
  } catch (i) {
    return (
      ml(
        !1,
        `The URL path "${l}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${i}).`
      ),
      l
    );
  }
}
function Ql(l, i) {
  if (i === '/') return l;
  if (!l.toLowerCase().startsWith(i.toLowerCase())) return null;
  let r = i.endsWith('/') ? i.length - 1 : i.length,
    o = l.charAt(r);
  return o && o !== '/' ? null : l.slice(r) || '/';
}
var Vy = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;
function Qy(l, i = '/') {
  let { pathname: r, search: o = '', hash: u = '' } = typeof l == 'string' ? Qn(l) : l,
    m;
  return (
    r ? ((r = Dh(r)), r.startsWith('/') ? (m = Jp(r.substring(1), '/')) : (m = Jp(r, i))) : (m = i),
    { pathname: m, search: Jy(o), hash: Py(u) }
  );
}
function Jp(l, i) {
  let r = Zr(i).split('/');
  return (
    l.split('/').forEach((u) => {
      u === '..' ? r.length > 1 && r.pop() : u !== '.' && r.push(u);
    }),
    r.length > 1 ? r.join('/') : '/'
  );
}
function qu(l, i, r, o) {
  return `Cannot include a '${l}' character in a manually specified \`to.${i}\` field [${JSON.stringify(o)}].  Please separate it out to the \`to.${r}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`;
}
function Ky(l) {
  return l.filter((i, r) => r === 0 || (i.route.path && i.route.path.length > 0));
}
function dd(l) {
  let i = Ky(l);
  return i.map((r, o) => (o === i.length - 1 ? r.pathname : r.pathnameBase));
}
function ao(l, i, r, o = !1) {
  let u;
  typeof l == 'string'
    ? (u = Qn(l))
    : ((u = { ...l }),
      We(!u.pathname || !u.pathname.includes('?'), qu('?', 'pathname', 'search', u)),
      We(!u.pathname || !u.pathname.includes('#'), qu('#', 'pathname', 'hash', u)),
      We(!u.search || !u.search.includes('#'), qu('#', 'search', 'hash', u)));
  let m = l === '' || u.pathname === '',
    f = m ? '/' : u.pathname,
    h;
  if (f == null) h = r;
  else {
    let k = i.length - 1;
    if (!o && f.startsWith('..')) {
      let L = f.split('/');
      for (; L[0] === '..'; ) (L.shift(), (k -= 1));
      u.pathname = L.join('/');
    }
    h = k >= 0 ? i[k] : '/';
  }
  let p = Qy(u, h),
    g = f && f !== '/' && f.endsWith('/'),
    y = (m || f === '.') && r.endsWith('/');
  return (!p.pathname.endsWith('/') && (g || y) && (p.pathname += '/'), p);
}
var Dh = (l) => l.replace(/\/\/+/g, '/'),
  dl = (l) => Dh(l.join('/')),
  Zr = (l) => l.replace(/\/+$/, ''),
  Zy = (l) => Zr(l).replace(/^\/*/, '/'),
  Jy = (l) => (!l || l === '?' ? '' : l.startsWith('?') ? l : '?' + l),
  Py = (l) => (!l || l === '#' ? '' : l.startsWith('#') ? l : '#' + l),
  Fy = class {
    constructor(l, i, r, o = !1) {
      ((this.status = l),
        (this.statusText = i || ''),
        (this.internal = o),
        r instanceof Error ? ((this.data = r.toString()), (this.error = r)) : (this.data = r));
    }
  };
function Wy(l) {
  return (
    l != null &&
    typeof l.status == 'number' &&
    typeof l.statusText == 'string' &&
    typeof l.internal == 'boolean' &&
    'data' in l
  );
}
function e0(l) {
  let i = l.map((r) => r.route.path).filter(Boolean);
  return dl(i) || '/';
}
var zh =
  typeof window < 'u' && typeof window.document < 'u' && typeof window.document.createElement < 'u';
function Hh(l, i) {
  let r = l;
  if (typeof r != 'string' || !Vy.test(r)) return { absoluteURL: void 0, isExternal: !1, to: r };
  let o = r,
    u = !1;
  if (zh)
    try {
      let m = new URL(window.location.href),
        f = r.startsWith('//') ? new URL(m.protocol + r) : new URL(r),
        h = Ql(f.pathname, i);
      f.origin === m.origin && h != null ? (r = h + f.search + f.hash) : (u = !0);
    } catch {
      ml(
        !1,
        `<Link to="${r}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`
      );
    }
  return { absoluteURL: o, isExternal: u, to: r };
}
Object.getOwnPropertyNames(Object.prototype).sort().join('\0');
var Uh = ['POST', 'PUT', 'PATCH', 'DELETE'];
new Set(Uh);
var t0 = ['GET', ...Uh];
new Set(t0);
var Kn = S.createContext(null);
Kn.displayName = 'DataRouter';
var no = S.createContext(null);
no.displayName = 'DataRouterState';
var $h = S.createContext(!1);
function l0() {
  return S.useContext($h);
}
var Gh = S.createContext({ isTransitioning: !1 });
Gh.displayName = 'ViewTransition';
var a0 = S.createContext(new Map());
a0.displayName = 'Fetchers';
var n0 = S.createContext(null);
n0.displayName = 'Await';
var Yt = S.createContext(null);
Yt.displayName = 'Navigation';
var rs = S.createContext(null);
rs.displayName = 'Location';
var fl = S.createContext({ outlet: null, matches: [], isDataRoute: !1 });
fl.displayName = 'Route';
var md = S.createContext(null);
md.displayName = 'RouteError';
var Yh = 'REACT_ROUTER_ERROR',
  i0 = 'REDIRECT',
  s0 = 'ROUTE_ERROR_RESPONSE';
function r0(l) {
  if (l.startsWith(`${Yh}:${i0}:{`))
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
function o0(l) {
  if (l.startsWith(`${Yh}:${s0}:{`))
    try {
      let i = JSON.parse(l.slice(40));
      if (
        typeof i == 'object' &&
        i &&
        typeof i.status == 'number' &&
        typeof i.statusText == 'string'
      )
        return new Fy(i.status, i.statusText, i.data);
    } catch {}
}
function c0(l, { relative: i } = {}) {
  We(Zn(), 'useHref() may be used only in the context of a <Router> component.');
  let { basename: r, navigator: o } = S.useContext(Yt),
    { hash: u, pathname: m, search: f } = os(l, { relative: i }),
    h = m;
  return (
    r !== '/' && (h = m === '/' ? r : dl([r, m])),
    o.createHref({ pathname: h, search: f, hash: u })
  );
}
function Zn() {
  return S.useContext(rs) != null;
}
function xl() {
  return (
    We(Zn(), 'useLocation() may be used only in the context of a <Router> component.'),
    S.useContext(rs).location
  );
}
var Xh =
  'You should call navigate() in a React.useEffect(), not when your component is first rendered.';
function Vh(l) {
  S.useContext(Yt).static || S.useLayoutEffect(l);
}
function pl() {
  let { isDataRoute: l } = S.useContext(fl);
  return l ? S0() : u0();
}
function u0() {
  We(Zn(), 'useNavigate() may be used only in the context of a <Router> component.');
  let l = S.useContext(Kn),
    { basename: i, navigator: r } = S.useContext(Yt),
    { matches: o } = S.useContext(fl),
    { pathname: u } = xl(),
    m = JSON.stringify(dd(o)),
    f = S.useRef(!1);
  return (
    Vh(() => {
      f.current = !0;
    }),
    S.useCallback(
      (p, g = {}) => {
        if ((ml(f.current, Xh), !f.current)) return;
        if (typeof p == 'number') {
          r.go(p);
          return;
        }
        let y = ao(p, JSON.parse(m), u, g.relative === 'path');
        (l == null && i !== '/' && (y.pathname = y.pathname === '/' ? i : dl([i, y.pathname])),
          (g.replace ? r.replace : r.push)(y, g.state, g));
      },
      [i, r, m, u, l]
    )
  );
}
S.createContext(null);
function d0() {
  let { matches: l } = S.useContext(fl),
    i = l[l.length - 1];
  return (i == null ? void 0 : i.params) ?? {};
}
function os(l, { relative: i } = {}) {
  let { matches: r } = S.useContext(fl),
    { pathname: o } = xl(),
    u = JSON.stringify(dd(r));
  return S.useMemo(() => ao(l, JSON.parse(u), o, i === 'path'), [l, u, o, i]);
}
function m0(l, i) {
  return Qh(l, i);
}
function Qh(l, i, r) {
  var B;
  We(Zn(), 'useRoutes() may be used only in the context of a <Router> component.');
  let { navigator: o } = S.useContext(Yt),
    { matches: u } = S.useContext(fl),
    m = u[u.length - 1],
    f = m ? m.params : {},
    h = m ? m.pathname : '/',
    p = m ? m.pathnameBase : '/',
    g = m && m.route;
  {
    let j = (g && g.path) || '';
    Zh(
      h,
      !g || j.endsWith('*') || j.endsWith('*?'),
      `You rendered descendant <Routes> (or called \`useRoutes()\`) at "${h}" (under <Route path="${j}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${j}"> to <Route path="${j === '/' ? '*' : `${j}/*`}">.`
    );
  }
  let y = xl(),
    k;
  if (i) {
    let j = typeof i == 'string' ? Qn(i) : i;
    (We(
      p === '/' || ((B = j.pathname) == null ? void 0 : B.startsWith(p)),
      `When overriding the location using \`<Routes location>\` or \`useRoutes(routes, location)\`, the location pathname must begin with the portion of the URL pathname that was matched by all parent routes. The current pathname base is "${p}" but pathname "${j.pathname}" was given in the \`location\` prop.`
    ),
      (k = j));
  } else k = y;
  let L = k.pathname || '/',
    N = L;
  if (p !== '/') {
    let j = p.replace(/^\//, '').split('/');
    N = '/' + L.replace(/^\//, '').split('/').slice(j.length).join('/');
  }
  let M = Mh(l, { pathname: N });
  (ml(g || M != null, `No routes matched location "${k.pathname}${k.search}${k.hash}" `),
    ml(
      M == null ||
        M[M.length - 1].route.element !== void 0 ||
        M[M.length - 1].route.Component !== void 0 ||
        M[M.length - 1].route.lazy !== void 0,
      `Matched leaf route at location "${k.pathname}${k.search}${k.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`
    ));
  let G = g0(
    M &&
      M.map((j) =>
        Object.assign({}, j, {
          params: Object.assign({}, f, j.params),
          pathname: dl([
            p,
            o.encodeLocation
              ? o.encodeLocation(
                  j.pathname.replace(/%/g, '%25').replace(/\?/g, '%3F').replace(/#/g, '%23')
                ).pathname
              : j.pathname,
          ]),
          pathnameBase:
            j.pathnameBase === '/'
              ? p
              : dl([
                  p,
                  o.encodeLocation
                    ? o.encodeLocation(
                        j.pathnameBase
                          .replace(/%/g, '%25')
                          .replace(/\?/g, '%3F')
                          .replace(/#/g, '%23')
                      ).pathname
                    : j.pathnameBase,
                ]),
        })
      ),
    u,
    r
  );
  return i && G
    ? S.createElement(
        rs.Provider,
        {
          value: {
            location: {
              pathname: '/',
              search: '',
              hash: '',
              state: null,
              key: 'default',
              unstable_mask: void 0,
              ...k,
            },
            navigationType: 'POP',
          },
        },
        G
      )
    : G;
}
function _0() {
  let l = x0(),
    i = Wy(l) ? `${l.status} ${l.statusText}` : l instanceof Error ? l.message : JSON.stringify(l),
    r = l instanceof Error ? l.stack : null,
    o = 'rgba(200,200,200, 0.5)',
    u = { padding: '0.5rem', backgroundColor: o },
    m = { padding: '2px 4px', backgroundColor: o },
    f = null;
  return (
    console.error('Error handled by React Router default ErrorBoundary:', l),
    (f = S.createElement(
      S.Fragment,
      null,
      S.createElement('p', null, '💿 Hey developer 👋'),
      S.createElement(
        'p',
        null,
        'You can provide a way better UX than this when your app throws errors by providing your own ',
        S.createElement('code', { style: m }, 'ErrorBoundary'),
        ' or',
        ' ',
        S.createElement('code', { style: m }, 'errorElement'),
        ' prop on your route.'
      )
    )),
    S.createElement(
      S.Fragment,
      null,
      S.createElement('h2', null, 'Unexpected Application Error!'),
      S.createElement('h3', { style: { fontStyle: 'italic' } }, i),
      r ? S.createElement('pre', { style: u }, r) : null,
      f
    )
  );
}
var f0 = S.createElement(_0, null),
  Kh = class extends S.Component {
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
        const r = o0(l.digest);
        r && (l = r);
      }
      let i =
        l !== void 0
          ? S.createElement(
              fl.Provider,
              { value: this.props.routeContext },
              S.createElement(md.Provider, { value: l, children: this.props.component })
            )
          : this.props.children;
      return this.context ? S.createElement(p0, { error: l }, i) : i;
    }
  };
Kh.contextType = $h;
var Bu = new WeakMap();
function p0({ children: l, error: i }) {
  let { basename: r } = S.useContext(Yt);
  if (typeof i == 'object' && i && 'digest' in i && typeof i.digest == 'string') {
    let o = r0(i.digest);
    if (o) {
      let u = Bu.get(i);
      if (u) throw u;
      let m = Hh(o.location, r);
      if (zh && !Bu.get(i))
        if (m.isExternal || o.reloadDocument) window.location.href = m.absoluteURL || m.to;
        else {
          const f = Promise.resolve().then(() =>
            window.__reactRouterDataRouter.navigate(m.to, { replace: o.replace })
          );
          throw (Bu.set(i, f), f);
        }
      return S.createElement('meta', {
        httpEquiv: 'refresh',
        content: `0;url=${m.absoluteURL || m.to}`,
      });
    }
  }
  return l;
}
function h0({ routeContext: l, match: i, children: r }) {
  let o = S.useContext(Kn);
  return (
    o &&
      o.static &&
      o.staticContext &&
      (i.route.errorElement || i.route.ErrorBoundary) &&
      (o.staticContext._deepestRenderedBoundaryId = i.route.id),
    S.createElement(fl.Provider, { value: l }, r)
  );
}
function g0(l, i = [], r) {
  let o = r == null ? void 0 : r.state;
  if (l == null) {
    if (!o) return null;
    if (o.errors) l = o.matches;
    else if (i.length === 0 && !o.initialized && o.matches.length > 0) l = o.matches;
    else return null;
  }
  let u = l,
    m = o == null ? void 0 : o.errors;
  if (m != null) {
    let y = u.findIndex((k) => k.route.id && (m == null ? void 0 : m[k.route.id]) !== void 0);
    (We(
      y >= 0,
      `Could not find a matching route for errors on route IDs: ${Object.keys(m).join(',')}`
    ),
      (u = u.slice(0, Math.min(u.length, y + 1))));
  }
  let f = !1,
    h = -1;
  if (r && o) {
    f = o.renderFallback;
    for (let y = 0; y < u.length; y++) {
      let k = u[y];
      if (((k.route.HydrateFallback || k.route.hydrateFallbackElement) && (h = y), k.route.id)) {
        let { loaderData: L, errors: N } = o,
          M = k.route.loader && !L.hasOwnProperty(k.route.id) && (!N || N[k.route.id] === void 0);
        if (k.route.lazy || M) {
          (r.isStatic && (f = !0), h >= 0 ? (u = u.slice(0, h + 1)) : (u = [u[0]]));
          break;
        }
      }
    }
  }
  let p = r == null ? void 0 : r.onError,
    g =
      o && p
        ? (y, k) => {
            var L, N;
            p(y, {
              location: o.location,
              params:
                ((N = (L = o.matches) == null ? void 0 : L[0]) == null ? void 0 : N.params) ?? {},
              unstable_pattern: e0(o.matches),
              errorInfo: k,
            });
          }
        : void 0;
  return u.reduceRight((y, k, L) => {
    let N,
      M = !1,
      G = null,
      B = null;
    o &&
      ((N = m && k.route.id ? m[k.route.id] : void 0),
      (G = k.route.errorElement || f0),
      f &&
        (h < 0 && L === 0
          ? (Zh(
              'route-fallback',
              !1,
              'No `HydrateFallback` element provided to render during initial hydration'
            ),
            (M = !0),
            (B = null))
          : h === L && ((M = !0), (B = k.route.hydrateFallbackElement || null))));
    let j = i.concat(u.slice(0, L + 1)),
      A = () => {
        let V;
        return (
          N
            ? (V = G)
            : M
              ? (V = B)
              : k.route.Component
                ? (V = S.createElement(k.route.Component, null))
                : k.route.element
                  ? (V = k.route.element)
                  : (V = y),
          S.createElement(h0, {
            match: k,
            routeContext: { outlet: y, matches: j, isDataRoute: o != null },
            children: V,
          })
        );
      };
    return o && (k.route.ErrorBoundary || k.route.errorElement || L === 0)
      ? S.createElement(Kh, {
          location: o.location,
          revalidation: o.revalidation,
          component: G,
          error: N,
          children: A(),
          routeContext: { outlet: null, matches: j, isDataRoute: !0 },
          onError: g,
        })
      : A();
  }, null);
}
function _d(l) {
  return `${l} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function k0(l) {
  let i = S.useContext(Kn);
  return (We(i, _d(l)), i);
}
function v0(l) {
  let i = S.useContext(no);
  return (We(i, _d(l)), i);
}
function y0(l) {
  let i = S.useContext(fl);
  return (We(i, _d(l)), i);
}
function fd(l) {
  let i = y0(l),
    r = i.matches[i.matches.length - 1];
  return (We(r.route.id, `${l} can only be used on routes that contain a unique "id"`), r.route.id);
}
function b0() {
  return fd('useRouteId');
}
function x0() {
  var o;
  let l = S.useContext(md),
    i = v0('useRouteError'),
    r = fd('useRouteError');
  return l !== void 0 ? l : (o = i.errors) == null ? void 0 : o[r];
}
function S0() {
  let { router: l } = k0('useNavigate'),
    i = fd('useNavigate'),
    r = S.useRef(!1);
  return (
    Vh(() => {
      r.current = !0;
    }),
    S.useCallback(
      async (u, m = {}) => {
        (ml(r.current, Xh),
          r.current &&
            (typeof u == 'number'
              ? await l.navigate(u)
              : await l.navigate(u, { fromRouteId: i, ...m })));
      },
      [l, i]
    )
  );
}
var Pp = {};
function Zh(l, i, r) {
  !i && !Pp[l] && ((Pp[l] = !0), ml(!1, r));
}
S.memo(w0);
function w0({ routes: l, future: i, state: r, isStatic: o, onError: u }) {
  return Qh(l, void 0, { state: r, isStatic: o, onError: u });
}
function _l({ to: l, replace: i, state: r, relative: o }) {
  We(Zn(), '<Navigate> may be used only in the context of a <Router> component.');
  let { static: u } = S.useContext(Yt);
  ml(
    !u,
    '<Navigate> must not be used on the initial render in a <StaticRouter>. This is a no-op, but you should modify your code so the <Navigate> is only ever rendered in response to some user interaction or state change.'
  );
  let { matches: m } = S.useContext(fl),
    { pathname: f } = xl(),
    h = pl(),
    p = ao(l, dd(m), f, o === 'path'),
    g = JSON.stringify(p);
  return (
    S.useEffect(() => {
      h(JSON.parse(g), { replace: i, state: r, relative: o });
    }, [h, g, o, i, r]),
    null
  );
}
function al(l) {
  We(
    !1,
    'A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>.'
  );
}
function T0({
  basename: l = '/',
  children: i = null,
  location: r,
  navigationType: o = 'POP',
  navigator: u,
  static: m = !1,
  unstable_useTransitions: f,
}) {
  We(
    !Zn(),
    'You cannot render a <Router> inside another <Router>. You should never have more than one in your app.'
  );
  let h = l.replace(/^\/*/, '/'),
    p = S.useMemo(
      () => ({ basename: h, navigator: u, static: m, unstable_useTransitions: f, future: {} }),
      [h, u, m, f]
    );
  typeof r == 'string' && (r = Qn(r));
  let {
      pathname: g = '/',
      search: y = '',
      hash: k = '',
      state: L = null,
      key: N = 'default',
      unstable_mask: M,
    } = r,
    G = S.useMemo(() => {
      let B = Ql(g, h);
      return B == null
        ? null
        : {
            location: { pathname: B, search: y, hash: k, state: L, key: N, unstable_mask: M },
            navigationType: o,
          };
    }, [h, g, y, k, L, N, o, M]);
  return (
    ml(
      G != null,
      `<Router basename="${h}"> is not able to match the URL "${g}${y}${k}" because it does not start with the basename, so the <Router> won't render anything.`
    ),
    G == null
      ? null
      : S.createElement(
          Yt.Provider,
          { value: p },
          S.createElement(rs.Provider, { children: i, value: G })
        )
  );
}
function N0({ children: l, location: i }) {
  return m0(Ku(l), i);
}
function Ku(l, i = []) {
  let r = [];
  return (
    S.Children.forEach(l, (o, u) => {
      if (!S.isValidElement(o)) return;
      let m = [...i, u];
      if (o.type === S.Fragment) {
        r.push.apply(r, Ku(o.props.children, m));
        return;
      }
      (We(
        o.type === al,
        `[${typeof o.type == 'string' ? o.type : o.type.name}] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>`
      ),
        We(!o.props.index || !o.props.children, 'An index route cannot have child routes.'));
      let f = {
        id: o.props.id || m.join('-'),
        caseSensitive: o.props.caseSensitive,
        element: o.props.element,
        Component: o.props.Component,
        index: o.props.index,
        path: o.props.path,
        middleware: o.props.middleware,
        loader: o.props.loader,
        action: o.props.action,
        hydrateFallbackElement: o.props.hydrateFallbackElement,
        HydrateFallback: o.props.HydrateFallback,
        errorElement: o.props.errorElement,
        ErrorBoundary: o.props.ErrorBoundary,
        hasErrorBoundary:
          o.props.hasErrorBoundary === !0 ||
          o.props.ErrorBoundary != null ||
          o.props.errorElement != null,
        shouldRevalidate: o.props.shouldRevalidate,
        handle: o.props.handle,
        lazy: o.props.lazy,
      };
      (o.props.children && (f.children = Ku(o.props.children, m)), r.push(f));
    }),
    r
  );
}
var Xr = 'get',
  Vr = 'application/x-www-form-urlencoded';
function io(l) {
  return typeof HTMLElement < 'u' && l instanceof HTMLElement;
}
function j0(l) {
  return io(l) && l.tagName.toLowerCase() === 'button';
}
function E0(l) {
  return io(l) && l.tagName.toLowerCase() === 'form';
}
function C0(l) {
  return io(l) && l.tagName.toLowerCase() === 'input';
}
function A0(l) {
  return !!(l.metaKey || l.altKey || l.ctrlKey || l.shiftKey);
}
function L0(l, i) {
  return l.button === 0 && (!i || i === '_self') && !A0(l);
}
var Rr = null;
function q0() {
  if (Rr === null)
    try {
      (new FormData(document.createElement('form'), 0), (Rr = !1));
    } catch {
      Rr = !0;
    }
  return Rr;
}
var B0 = new Set(['application/x-www-form-urlencoded', 'multipart/form-data', 'text/plain']);
function Iu(l) {
  return l != null && !B0.has(l)
    ? (ml(
        !1,
        `"${l}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${Vr}"`
      ),
      null)
    : l;
}
function I0(l, i) {
  let r, o, u, m, f;
  if (E0(l)) {
    let h = l.getAttribute('action');
    ((o = h ? Ql(h, i) : null),
      (r = l.getAttribute('method') || Xr),
      (u = Iu(l.getAttribute('enctype')) || Vr),
      (m = new FormData(l)));
  } else if (j0(l) || (C0(l) && (l.type === 'submit' || l.type === 'image'))) {
    let h = l.form;
    if (h == null)
      throw new Error('Cannot submit a <button> or <input type="submit"> without a <form>');
    let p = l.getAttribute('formaction') || h.getAttribute('action');
    if (
      ((o = p ? Ql(p, i) : null),
      (r = l.getAttribute('formmethod') || h.getAttribute('method') || Xr),
      (u = Iu(l.getAttribute('formenctype')) || Iu(h.getAttribute('enctype')) || Vr),
      (m = new FormData(h, l)),
      !q0())
    ) {
      let { name: g, type: y, value: k } = l;
      if (y === 'image') {
        let L = g ? `${g}.` : '';
        (m.append(`${L}x`, '0'), m.append(`${L}y`, '0'));
      } else g && m.append(g, k);
    }
  } else {
    if (io(l))
      throw new Error(
        'Cannot submit element that is not <form>, <button>, or <input type="submit|image">'
      );
    ((r = Xr), (o = null), (u = Vr), (f = l));
  }
  return (
    m && u === 'text/plain' && ((f = m), (m = void 0)),
    { action: o, method: r.toLowerCase(), encType: u, formData: m, body: f }
  );
}
Object.getOwnPropertyNames(Object.prototype).sort().join('\0');
function pd(l, i) {
  if (l === !1 || l === null || typeof l > 'u') throw new Error(i);
}
function Jh(l, i, r, o) {
  let u =
    typeof l == 'string'
      ? new URL(l, typeof window > 'u' ? 'server://singlefetch/' : window.location.origin)
      : l;
  return (
    r
      ? u.pathname.endsWith('/')
        ? (u.pathname = `${u.pathname}_.${o}`)
        : (u.pathname = `${u.pathname}.${o}`)
      : u.pathname === '/'
        ? (u.pathname = `_root.${o}`)
        : i && Ql(u.pathname, i) === '/'
          ? (u.pathname = `${Zr(i)}/_root.${o}`)
          : (u.pathname = `${Zr(u.pathname)}.${o}`),
    u
  );
}
async function M0(l, i) {
  if (l.id in i) return i[l.id];
  try {
    let r = await import(l.module);
    return ((i[l.id] = r), r);
  } catch (r) {
    return (
      console.error(`Error loading route module \`${l.module}\`, reloading page...`),
      console.error(r),
      window.__reactRouterContext && window.__reactRouterContext.isSpaMode,
      window.location.reload(),
      new Promise(() => {})
    );
  }
}
function O0(l) {
  return l == null
    ? !1
    : l.href == null
      ? l.rel === 'preload' && typeof l.imageSrcSet == 'string' && typeof l.imageSizes == 'string'
      : typeof l.rel == 'string' && typeof l.href == 'string';
}
async function R0(l, i, r) {
  let o = await Promise.all(
    l.map(async (u) => {
      let m = i.routes[u.route.id];
      if (m) {
        let f = await M0(m, r);
        return f.links ? f.links() : [];
      }
      return [];
    })
  );
  return U0(
    o
      .flat(1)
      .filter(O0)
      .filter((u) => u.rel === 'stylesheet' || u.rel === 'preload')
      .map((u) =>
        u.rel === 'stylesheet' ? { ...u, rel: 'prefetch', as: 'style' } : { ...u, rel: 'prefetch' }
      )
  );
}
function Fp(l, i, r, o, u, m) {
  let f = (p, g) => (r[g] ? p.route.id !== r[g].route.id : !0),
    h = (p, g) => {
      var y;
      return (
        r[g].pathname !== p.pathname ||
        (((y = r[g].route.path) == null ? void 0 : y.endsWith('*')) &&
          r[g].params['*'] !== p.params['*'])
      );
    };
  return m === 'assets'
    ? i.filter((p, g) => f(p, g) || h(p, g))
    : m === 'data'
      ? i.filter((p, g) => {
          var k;
          let y = o.routes[p.route.id];
          if (!y || !y.hasLoader) return !1;
          if (f(p, g) || h(p, g)) return !0;
          if (p.route.shouldRevalidate) {
            let L = p.route.shouldRevalidate({
              currentUrl: new URL(u.pathname + u.search + u.hash, window.origin),
              currentParams: ((k = r[0]) == null ? void 0 : k.params) || {},
              nextUrl: new URL(l, window.origin),
              nextParams: p.params,
              defaultShouldRevalidate: !0,
            });
            if (typeof L == 'boolean') return L;
          }
          return !0;
        })
      : [];
}
function D0(l, i, { includeHydrateFallback: r } = {}) {
  return z0(
    l
      .map((o) => {
        let u = i.routes[o.route.id];
        if (!u) return [];
        let m = [u.module];
        return (
          u.clientActionModule && (m = m.concat(u.clientActionModule)),
          u.clientLoaderModule && (m = m.concat(u.clientLoaderModule)),
          r && u.hydrateFallbackModule && (m = m.concat(u.hydrateFallbackModule)),
          u.imports && (m = m.concat(u.imports)),
          m
        );
      })
      .flat(1)
  );
}
function z0(l) {
  return [...new Set(l)];
}
function H0(l) {
  let i = {},
    r = Object.keys(l).sort();
  for (let o of r) i[o] = l[o];
  return i;
}
function U0(l, i) {
  let r = new Set();
  return (
    new Set(i),
    l.reduce((o, u) => {
      let m = JSON.stringify(H0(u));
      return (r.has(m) || (r.add(m), o.push({ key: m, link: u })), o);
    }, [])
  );
}
function hd() {
  let l = S.useContext(Kn);
  return (pd(l, 'You must render this element inside a <DataRouterContext.Provider> element'), l);
}
function $0() {
  let l = S.useContext(no);
  return (
    pd(l, 'You must render this element inside a <DataRouterStateContext.Provider> element'),
    l
  );
}
var gd = S.createContext(void 0);
gd.displayName = 'FrameworkContext';
function kd() {
  let l = S.useContext(gd);
  return (pd(l, 'You must render this element inside a <HydratedRouter> element'), l);
}
function G0(l, i) {
  let r = S.useContext(gd),
    [o, u] = S.useState(!1),
    [m, f] = S.useState(!1),
    { onFocus: h, onBlur: p, onMouseEnter: g, onMouseLeave: y, onTouchStart: k } = i,
    L = S.useRef(null);
  (S.useEffect(() => {
    if ((l === 'render' && f(!0), l === 'viewport')) {
      let G = (j) => {
          j.forEach((A) => {
            f(A.isIntersecting);
          });
        },
        B = new IntersectionObserver(G, { threshold: 0.5 });
      return (
        L.current && B.observe(L.current),
        () => {
          B.disconnect();
        }
      );
    }
  }, [l]),
    S.useEffect(() => {
      if (o) {
        let G = setTimeout(() => {
          f(!0);
        }, 100);
        return () => {
          clearTimeout(G);
        };
      }
    }, [o]));
  let N = () => {
      u(!0);
    },
    M = () => {
      (u(!1), f(!1));
    };
  return r
    ? l !== 'intent'
      ? [m, L, {}]
      : [
          m,
          L,
          {
            onFocus: Pi(h, N),
            onBlur: Pi(p, M),
            onMouseEnter: Pi(g, N),
            onMouseLeave: Pi(y, M),
            onTouchStart: Pi(k, N),
          },
        ]
    : [!1, L, {}];
}
function Pi(l, i) {
  return (r) => {
    (l && l(r), r.defaultPrevented || i(r));
  };
}
function Y0({ page: l, ...i }) {
  let r = l0(),
    { router: o } = hd(),
    u = S.useMemo(() => Mh(o.routes, l, o.basename), [o.routes, l, o.basename]);
  return u
    ? r
      ? S.createElement(V0, { page: l, matches: u, ...i })
      : S.createElement(Q0, { page: l, matches: u, ...i })
    : null;
}
function X0(l) {
  let { manifest: i, routeModules: r } = kd(),
    [o, u] = S.useState([]);
  return (
    S.useEffect(() => {
      let m = !1;
      return (
        R0(l, i, r).then((f) => {
          m || u(f);
        }),
        () => {
          m = !0;
        }
      );
    }, [l, i, r]),
    o
  );
}
function V0({ page: l, matches: i, ...r }) {
  let o = xl(),
    { future: u } = kd(),
    { basename: m } = hd(),
    f = S.useMemo(() => {
      if (l === o.pathname + o.search + o.hash) return [];
      let h = Jh(l, m, u.unstable_trailingSlashAwareDataRequests, 'rsc'),
        p = !1,
        g = [];
      for (let y of i)
        typeof y.route.shouldRevalidate == 'function' ? (p = !0) : g.push(y.route.id);
      return (
        p && g.length > 0 && h.searchParams.set('_routes', g.join(',')),
        [h.pathname + h.search]
      );
    }, [m, u.unstable_trailingSlashAwareDataRequests, l, o, i]);
  return S.createElement(
    S.Fragment,
    null,
    f.map((h) => S.createElement('link', { key: h, rel: 'prefetch', as: 'fetch', href: h, ...r }))
  );
}
function Q0({ page: l, matches: i, ...r }) {
  let o = xl(),
    { future: u, manifest: m, routeModules: f } = kd(),
    { basename: h } = hd(),
    { loaderData: p, matches: g } = $0(),
    y = S.useMemo(() => Fp(l, i, g, m, o, 'data'), [l, i, g, m, o]),
    k = S.useMemo(() => Fp(l, i, g, m, o, 'assets'), [l, i, g, m, o]),
    L = S.useMemo(() => {
      if (l === o.pathname + o.search + o.hash) return [];
      let G = new Set(),
        B = !1;
      if (
        (i.forEach((A) => {
          var U;
          let V = m.routes[A.route.id];
          !V ||
            !V.hasLoader ||
            ((!y.some((oe) => oe.route.id === A.route.id) &&
              A.route.id in p &&
              (U = f[A.route.id]) != null &&
              U.shouldRevalidate) ||
            V.hasClientLoader
              ? (B = !0)
              : G.add(A.route.id));
        }),
        G.size === 0)
      )
        return [];
      let j = Jh(l, h, u.unstable_trailingSlashAwareDataRequests, 'data');
      return (
        B &&
          G.size > 0 &&
          j.searchParams.set(
            '_routes',
            i
              .filter((A) => G.has(A.route.id))
              .map((A) => A.route.id)
              .join(',')
          ),
        [j.pathname + j.search]
      );
    }, [h, u.unstable_trailingSlashAwareDataRequests, p, o, m, y, i, l, f]),
    N = S.useMemo(() => D0(k, m), [k, m]),
    M = X0(k);
  return S.createElement(
    S.Fragment,
    null,
    L.map((G) => S.createElement('link', { key: G, rel: 'prefetch', as: 'fetch', href: G, ...r })),
    N.map((G) => S.createElement('link', { key: G, rel: 'modulepreload', href: G, ...r })),
    M.map(({ key: G, link: B }) =>
      S.createElement('link', {
        key: G,
        nonce: r.nonce,
        ...B,
        crossOrigin: B.crossOrigin ?? r.crossOrigin,
      })
    )
  );
}
function K0(...l) {
  return (i) => {
    l.forEach((r) => {
      typeof r == 'function' ? r(i) : r != null && (r.current = i);
    });
  };
}
var Z0 =
  typeof window < 'u' && typeof window.document < 'u' && typeof window.document.createElement < 'u';
try {
  Z0 && (window.__reactRouterVersion = '7.14.2');
} catch {}
function J0({ basename: l, children: i, unstable_useTransitions: r, window: o }) {
  let u = S.useRef();
  u.current == null && (u.current = Cy({ window: o, v5Compat: !0 }));
  let m = u.current,
    [f, h] = S.useState({ action: m.action, location: m.location }),
    p = S.useCallback(
      (g) => {
        r === !1 ? h(g) : S.startTransition(() => h(g));
      },
      [r]
    );
  return (
    S.useLayoutEffect(() => m.listen(p), [m, p]),
    S.createElement(T0, {
      basename: l,
      children: i,
      location: f.location,
      navigationType: f.action,
      navigator: m,
      unstable_useTransitions: r,
    })
  );
}
var Ph = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,
  Fh = S.forwardRef(function (
    {
      onClick: i,
      discover: r = 'render',
      prefetch: o = 'none',
      relative: u,
      reloadDocument: m,
      replace: f,
      unstable_mask: h,
      state: p,
      target: g,
      to: y,
      preventScrollReset: k,
      viewTransition: L,
      unstable_defaultShouldRevalidate: N,
      ...M
    },
    G
  ) {
    let { basename: B, navigator: j, unstable_useTransitions: A } = S.useContext(Yt),
      V = typeof y == 'string' && Ph.test(y),
      U = Hh(y, B);
    y = U.to;
    let oe = c0(y, { relative: u }),
      W = xl(),
      x = null;
    if (h) {
      let fe = ao(h, [], W.unstable_mask ? W.unstable_mask.pathname : '/', !0);
      (B !== '/' && (fe.pathname = fe.pathname === '/' ? B : dl([B, fe.pathname])),
        (x = j.createHref(fe)));
    }
    let [q, Z, ee] = G0(o, M),
      te = eb(y, {
        replace: f,
        unstable_mask: h,
        state: p,
        target: g,
        preventScrollReset: k,
        relative: u,
        viewTransition: L,
        unstable_defaultShouldRevalidate: N,
        unstable_useTransitions: A,
      });
    function ce(fe) {
      (i && i(fe), fe.defaultPrevented || te(fe));
    }
    let ve = !(U.isExternal || m),
      D = S.createElement('a', {
        ...M,
        ...ee,
        href: (ve ? x : void 0) || U.absoluteURL || oe,
        onClick: ve ? ce : i,
        ref: K0(G, Z),
        target: g,
        'data-discover': !V && r === 'render' ? 'true' : void 0,
      });
    return q && !V ? S.createElement(S.Fragment, null, D, S.createElement(Y0, { page: oe })) : D;
  });
Fh.displayName = 'Link';
var P0 = S.forwardRef(function (
  {
    'aria-current': i = 'page',
    caseSensitive: r = !1,
    className: o = '',
    end: u = !1,
    style: m,
    to: f,
    viewTransition: h,
    children: p,
    ...g
  },
  y
) {
  let k = os(f, { relative: g.relative }),
    L = xl(),
    N = S.useContext(no),
    { navigator: M, basename: G } = S.useContext(Yt),
    B = N != null && ib(k) && h === !0,
    j = M.encodeLocation ? M.encodeLocation(k).pathname : k.pathname,
    A = L.pathname,
    V = N && N.navigation && N.navigation.location ? N.navigation.location.pathname : null;
  (r || ((A = A.toLowerCase()), (V = V ? V.toLowerCase() : null), (j = j.toLowerCase())),
    V && G && (V = Ql(V, G) || V));
  const U = j !== '/' && j.endsWith('/') ? j.length - 1 : j.length;
  let oe = A === j || (!u && A.startsWith(j) && A.charAt(U) === '/'),
    W = V != null && (V === j || (!u && V.startsWith(j) && V.charAt(j.length) === '/')),
    x = { isActive: oe, isPending: W, isTransitioning: B },
    q = oe ? i : void 0,
    Z;
  typeof o == 'function'
    ? (Z = o(x))
    : (Z = [o, oe ? 'active' : null, W ? 'pending' : null, B ? 'transitioning' : null]
        .filter(Boolean)
        .join(' '));
  let ee = typeof m == 'function' ? m(x) : m;
  return S.createElement(
    Fh,
    { ...g, 'aria-current': q, className: Z, ref: y, style: ee, to: f, viewTransition: h },
    typeof p == 'function' ? p(x) : p
  );
});
P0.displayName = 'NavLink';
var F0 = S.forwardRef(
  (
    {
      discover: l = 'render',
      fetcherKey: i,
      navigate: r,
      reloadDocument: o,
      replace: u,
      state: m,
      method: f = Xr,
      action: h,
      onSubmit: p,
      relative: g,
      preventScrollReset: y,
      viewTransition: k,
      unstable_defaultShouldRevalidate: L,
      ...N
    },
    M
  ) => {
    let { unstable_useTransitions: G } = S.useContext(Yt),
      B = ab(),
      j = nb(h, { relative: g }),
      A = f.toLowerCase() === 'get' ? 'get' : 'post',
      V = typeof h == 'string' && Ph.test(h),
      U = (oe) => {
        if ((p && p(oe), oe.defaultPrevented)) return;
        oe.preventDefault();
        let W = oe.nativeEvent.submitter,
          x = (W == null ? void 0 : W.getAttribute('formmethod')) || f,
          q = () =>
            B(W || oe.currentTarget, {
              fetcherKey: i,
              method: x,
              navigate: r,
              replace: u,
              state: m,
              relative: g,
              preventScrollReset: y,
              viewTransition: k,
              unstable_defaultShouldRevalidate: L,
            });
        G && r !== !1 ? S.startTransition(() => q()) : q();
      };
    return S.createElement('form', {
      ref: M,
      method: A,
      action: j,
      onSubmit: o ? p : U,
      ...N,
      'data-discover': !V && l === 'render' ? 'true' : void 0,
    });
  }
);
F0.displayName = 'Form';
function W0(l) {
  return `${l} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function Wh(l) {
  let i = S.useContext(Kn);
  return (We(i, W0(l)), i);
}
function eb(
  l,
  {
    target: i,
    replace: r,
    unstable_mask: o,
    state: u,
    preventScrollReset: m,
    relative: f,
    viewTransition: h,
    unstable_defaultShouldRevalidate: p,
    unstable_useTransitions: g,
  } = {}
) {
  let y = pl(),
    k = xl(),
    L = os(l, { relative: f });
  return S.useCallback(
    (N) => {
      if (L0(N, i)) {
        N.preventDefault();
        let M = r !== void 0 ? r : as(k) === as(L),
          G = () =>
            y(l, {
              replace: M,
              unstable_mask: o,
              state: u,
              preventScrollReset: m,
              relative: f,
              viewTransition: h,
              unstable_defaultShouldRevalidate: p,
            });
        g ? S.startTransition(() => G()) : G();
      }
    },
    [k, y, L, r, o, u, i, l, m, f, h, p, g]
  );
}
var tb = 0,
  lb = () => `__${String(++tb)}__`;
function ab() {
  let { router: l } = Wh('useSubmit'),
    { basename: i } = S.useContext(Yt),
    r = b0(),
    o = l.fetch,
    u = l.navigate;
  return S.useCallback(
    async (m, f = {}) => {
      let { action: h, method: p, encType: g, formData: y, body: k } = I0(m, i);
      if (f.navigate === !1) {
        let L = f.fetcherKey || lb();
        await o(L, r, f.action || h, {
          unstable_defaultShouldRevalidate: f.unstable_defaultShouldRevalidate,
          preventScrollReset: f.preventScrollReset,
          formData: y,
          body: k,
          formMethod: f.method || p,
          formEncType: f.encType || g,
          flushSync: f.flushSync,
        });
      } else
        await u(f.action || h, {
          unstable_defaultShouldRevalidate: f.unstable_defaultShouldRevalidate,
          preventScrollReset: f.preventScrollReset,
          formData: y,
          body: k,
          formMethod: f.method || p,
          formEncType: f.encType || g,
          replace: f.replace,
          state: f.state,
          fromRouteId: r,
          flushSync: f.flushSync,
          viewTransition: f.viewTransition,
        });
    },
    [o, u, i, r]
  );
}
function nb(l, { relative: i } = {}) {
  let { basename: r } = S.useContext(Yt),
    o = S.useContext(fl);
  We(o, 'useFormAction must be used inside a RouteContext');
  let [u] = o.matches.slice(-1),
    m = { ...os(l || '.', { relative: i }) },
    f = xl();
  if (l == null) {
    m.search = f.search;
    let h = new URLSearchParams(m.search),
      p = h.getAll('index');
    if (p.some((y) => y === '')) {
      (h.delete('index'), p.filter((k) => k).forEach((k) => h.append('index', k)));
      let y = h.toString();
      m.search = y ? `?${y}` : '';
    }
  }
  return (
    (!l || l === '.') &&
      u.route.index &&
      (m.search = m.search ? m.search.replace(/^\?/, '?index&') : '?index'),
    r !== '/' && (m.pathname = m.pathname === '/' ? r : dl([r, m.pathname])),
    as(m)
  );
}
function ib(l, { relative: i } = {}) {
  let r = S.useContext(Gh);
  We(
    r != null,
    "`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?"
  );
  let { basename: o } = Wh('useViewTransitionState'),
    u = os(l, { relative: i });
  if (!r.isTransitioning) return !1;
  let m = Ql(r.currentLocation.pathname, o) || r.currentLocation.pathname,
    f = Ql(r.nextLocation.pathname, o) || r.nextLocation.pathname;
  return Kr(u.pathname, f) != null || Kr(u.pathname, m) != null;
}
const sb = '_layout_ahbo7_1',
  rb = '_enemies_ahbo7_12',
  ob = '_enemy_ahbo7_20',
  cb = '_targeted_ahbo7_35',
  ub = '_enemyName_ahbo7_39',
  db = '_enemyResist_ahbo7_44',
  mb = '_down_ahbo7_49',
  _b = '_log_ahbo7_53',
  fb = '_logLine_ahbo7_65',
  pb = '_party_ahbo7_69',
  hb = '_rowTag_ahbo7_76',
  gb = '_cardRow_ahbo7_82',
  kb = '_card_ahbo7_82',
  vb = '_cardActive_ahbo7_105',
  yb = '_allySelectable_ahbo7_110',
  bb = '_allyTargeted_ahbo7_116',
  xb = '_cardDecided_ahbo7_123',
  Sb = '_cardName_ahbo7_127',
  wb = '_uni_ahbo7_135',
  Tb = '_cardJob_ahbo7_139',
  Nb = '_gaugeRow_ahbo7_145',
  jb = '_gaugeLabel_ahbo7_151',
  Eb = '_flash_ahbo7_159',
  Cb = '_summons_ahbo7_181',
  Ab = '_summon_ahbo7_181',
  Lb = '_summonName_ahbo7_199',
  qb = '_summonHp_ahbo7_208',
  Bb = '_cardNums_ahbo7_214',
  Ib = '_cardCmd_ahbo7_220',
  Mb = '_empty_ahbo7_226',
  Ob = '_command_ahbo7_231',
  Rb = '_skillList_ahbo7_237',
  Db = '_skillBtn_ahbo7_243',
  zb = '_skillTop_ahbo7_255',
  Hb = '_skillName_ahbo7_262',
  Ub = '_skillDesc_ahbo7_267',
  $b = '_skillSummary_ahbo7_273',
  Gb = '_target_ahbo7_35',
  Yb = '_targetAlly_ahbo7_285',
  Xb = '_unionBanner_ahbo7_291',
  Vb = '_unionBannerHead_ahbo7_304',
  Qb = '_unionBannerDesc_ahbo7_311',
  Kb = '_unionInfo_ahbo7_318',
  Zb = '_unionCancel_ahbo7_328',
  Jb = '_unionHint_ahbo7_337',
  Pb = '_allyTargetHint_ahbo7_343',
  Fb = '_allyTargetSub_ahbo7_354',
  Wb = '_allyTargetSelected_ahbo7_361',
  e1 = '_unionBtn_ahbo7_366',
  t1 = '_cmdHead_ahbo7_372',
  l1 = '_menu_ahbo7_377',
  a1 = '_menuBtn_ahbo7_383',
  n1 = '_tp_ahbo7_400',
  i1 = '_menuBack_ahbo7_406',
  s1 = '_execRow_ahbo7_416',
  r1 = '_redo_ahbo7_421',
  o1 = '_primary_ahbo7_431',
  c1 = '_result_ahbo7_446',
  u1 = '_resultTitle_ahbo7_457',
  d1 = '_resultBody_ahbo7_462',
  m1 = '_expList_ahbo7_466',
  _1 = '_expRow_ahbo7_474',
  f1 = '_expName_ahbo7_480',
  p1 = '_expLv_ahbo7_488',
  h1 = '_expUp_ahbo7_493',
  g1 = '_expNum_ahbo7_498',
  k1 = '_playback_ahbo7_504',
  v1 = '_playbackHint_ahbo7_514',
  y1 = '_skip_ahbo7_520',
  b1 = '_logLineNew_ahbo7_531',
  x1 = '_dialogOverlay_ahbo7_546',
  S1 = '_dialog_ahbo7_546',
  w1 = '_dialogTitle_ahbo7_581',
  T1 = '_dialogName_ahbo7_587',
  N1 = '_dialogStats_ahbo7_592',
  j1 = '_dialogStat_ahbo7_592',
  E1 = '_fxIntro_ahbo7_608',
  C1 = '_fxOutro_ahbo7_628',
  A1 = '_fxLose_ahbo7_637',
  P = {
    layout: sb,
    enemies: rb,
    enemy: ob,
    targeted: cb,
    enemyName: ub,
    enemyResist: db,
    down: mb,
    log: _b,
    logLine: fb,
    party: pb,
    rowTag: hb,
    cardRow: gb,
    card: kb,
    cardActive: vb,
    allySelectable: yb,
    allyTargeted: bb,
    cardDecided: xb,
    cardName: Sb,
    uni: wb,
    cardJob: Tb,
    gaugeRow: Nb,
    gaugeLabel: jb,
    flash: Eb,
    summons: Cb,
    summon: Ab,
    summonName: Lb,
    summonHp: qb,
    cardNums: Bb,
    cardCmd: Ib,
    empty: Mb,
    command: Ob,
    skillList: Rb,
    skillBtn: Db,
    skillTop: zb,
    skillName: Hb,
    skillDesc: Ub,
    skillSummary: $b,
    target: Gb,
    targetAlly: Yb,
    unionBanner: Xb,
    unionBannerHead: Vb,
    unionBannerDesc: Qb,
    unionInfo: Kb,
    unionCancel: Zb,
    unionHint: Jb,
    allyTargetHint: Pb,
    allyTargetSub: Fb,
    allyTargetSelected: Wb,
    unionBtn: e1,
    cmdHead: t1,
    menu: l1,
    menuBtn: a1,
    tp: n1,
    menuBack: i1,
    execRow: s1,
    redo: r1,
    primary: o1,
    result: c1,
    resultTitle: u1,
    resultBody: d1,
    expList: m1,
    expRow: _1,
    expName: f1,
    expLv: p1,
    expUp: h1,
    expNum: g1,
    playback: k1,
    playbackHint: v1,
    skip: y1,
    logLineNew: b1,
    dialogOverlay: x1,
    dialog: S1,
    dialogTitle: w1,
    dialogName: T1,
    dialogStats: N1,
    dialogStat: j1,
    fxIntro: E1,
    fxOutro: C1,
    fxLose: A1,
  },
  L1 = '_root_1q1uf_1',
  q1 = '_group_1q1uf_7',
  B1 = '_groupLabel_1q1uf_14',
  I1 = '_badges_1q1uf_23',
  M1 = '_badge_1q1uf_23',
  O1 = '_weak_1q1uf_39',
  R1 = '_half_1q1uf_45',
  D1 = '_none_1q1uf_57',
  tl = {
    root: L1,
    group: q1,
    groupLabel: B1,
    badges: I1,
    badge: M1,
    weak: O1,
    half: R1,
    null: '_null_1q1uf_51',
    none: D1,
  },
  z1 = { slash: '斬', pierce: '突', bash: '壊', fire: '火', ice: '氷', volt: '雷', almighty: '無' },
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
function Wp(l) {
  return l === 0
    ? { text: '無', tier: 'null' }
    : l < 1
      ? { text: '半', tier: 'half' }
      : l > 1
        ? { text: '弱', tier: 'weak' }
        : null;
}
const U1 = ['slash', 'pierce', 'bash', 'fire', 'ice', 'volt'],
  $1 = [
    'poison',
    'paralysis',
    'sleep',
    'blind',
    'confusion',
    'curse',
    'instantDeath',
    'headBind',
    'armBind',
    'legBind',
  ],
  Yn = ({ elementResist: l, ailmentResist: i, compact: r = !1 }) => {
    const o = [];
    for (const h of U1) {
      const p = (l == null ? void 0 : l[h]) ?? 1,
        g = Wp(p);
      g && ((r && g.tier === 'half') || o.push({ label: `${z1[h]}${g.text}`, tier: g.tier }));
    }
    const u = [];
    for (const h of $1) {
      const p = (i == null ? void 0 : i[h]) ?? 1,
        g = Wp(p);
      g && ((r && g.tier === 'half') || u.push({ label: `${H1[h]}${g.text}`, tier: g.tier }));
    }
    const m = o.length > 0,
      f = u.length > 0;
    return !m && !f
      ? d.jsx('span', { className: tl.none, children: '（耐性なし）' })
      : d.jsxs('div', {
          className: tl.root,
          children: [
            m &&
              d.jsxs('div', {
                className: tl.group,
                children: [
                  !r && d.jsx('span', { className: tl.groupLabel, children: '属性' }),
                  d.jsx('div', {
                    className: tl.badges,
                    children: o.map((h) =>
                      d.jsx(
                        'span',
                        { className: `${tl.badge} ${tl[h.tier]}`, children: h.label },
                        h.label
                      )
                    ),
                  }),
                ],
              }),
            f &&
              d.jsxs('div', {
                className: tl.group,
                children: [
                  !r && d.jsx('span', { className: tl.groupLabel, children: '状態異常' }),
                  d.jsx('div', {
                    className: tl.badges,
                    children: u.map((h) =>
                      d.jsx(
                        'span',
                        { className: `${tl.badge} ${tl[h.tier]}`, children: h.label },
                        h.label
                      )
                    ),
                  }),
                ],
              }),
          ],
        });
  },
  G1 = '_row_1t6j7_1',
  Y1 = '_label_1t6j7_8',
  X1 = '_track_1t6j7_16',
  V1 = '_fill_1t6j7_24',
  Q1 = '_value_1t6j7_30',
  Fi = { row: G1, label: Y1, track: X1, fill: V1, value: Q1 },
  On = ({ value: l, max: i, color: r = '#4caf50', label: o, showValue: u = !0 }) => {
    const m = i > 0 ? Math.max(0, Math.min(100, (l / i) * 100)) : 0;
    return d.jsxs('div', {
      className: Fi.row,
      children: [
        o ? d.jsx('span', { className: Fi.label, children: o }) : null,
        d.jsx('div', {
          className: Fi.track,
          children: d.jsx('div', {
            className: Fi.fill,
            style: { width: `${m}%`, backgroundColor: r },
          }),
        }),
        u
          ? d.jsxs('span', {
              className: Fi.value,
              children: [Math.max(0, Math.round(l)), '/', Math.round(i)],
            })
          : null,
      ],
    });
  },
  wt = {
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
      effects: [{ kind: 'heal', amount: (l) => 20 + 5 * l, matkCoef: 'one' }],
    },
    skill_mass_heal: {
      id: 'skill_mass_heal',
      name: 'マスヒール',
      tree: 'base',
      tpCost: (l) => 8 + l,
      element: 'almighty',
      target: 'allyAll',
      effects: [{ kind: 'heal', amount: (l) => 10 + 3 * l, matkCoef: 'all' }],
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
      effects: [{ kind: 'heal', amount: (l) => 8 + 2 * l, matkCoef: 'minor' }],
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
      effects: [{ kind: 'heal', amount: (l) => 8 + 2 * l, matkCoef: 'minor' }],
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
      effects: [{ kind: 'heal', amount: (l) => 20 + 5 * l, matkCoef: 'one' }],
    },
    skill_medic_party_cure: {
      id: 'skill_medic_party_cure',
      name: 'パーティキュア',
      tree: 'master',
      tpCost: (l) => 10 + l,
      element: 'almighty',
      target: 'allyAll',
      effects: [{ kind: 'heal', amount: (l) => 10 + 3 * l, matkCoef: 'all' }],
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
      effects: [{ kind: 'heal', amount: (l) => 8 + 2 * l, matkCoef: 'minor' }],
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
      effects: [{ kind: 'heal', amount: (l) => 10 + 3 * l, matkCoef: 'all' }],
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
  ze = {
    class_warrior: {
      id: 'class_warrior',
      name: '戦士',
      description: '剣と斧の連携追撃・反撃を備えた前衛物理アタッカー。剣／斧で攻め筋が分岐する。',
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
      description: '盾と挑発で敵を引きつけ、障壁と反撃で味方を守る前衛タンク。',
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
      description: '火・氷・雷の属性魔法で敵を殲滅する後衛アタッカー。',
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
      description: '弓の射撃・部位封じ・召喚獣・救護をこなす器用な後衛。',
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
      description: '回復・状態異常治療・防御支援の要となるメインヒーラー。',
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
      description: '舞と歌でパーティを強化・回復し、剣舞で攻撃もこなす支援職。',
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
      description: '素手の多段攻撃・部位封じ・反撃を操る近接アタッカー。',
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
      description: '状態異常と弱体で敵を崩すデバッファー。',
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
      description: '死霊を召喚・使役し、障壁と爆裂で戦う変則召喚職。',
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
  K1 = 10,
  Z1 = {
    id: 'ea_double_strike',
    name: '二連撃',
    element: 'bash',
    target: 'enemyOne',
    effects: [{ kind: 'damage', statBase: 'str', power: () => 0.7, hits: 2 }],
    weight: 5,
    cond: { cooldown: 3 },
  },
  eh = {
    id: 'ea_guard_up',
    name: '身構え',
    element: 'almighty',
    target: 'self',
    effects: [{ kind: 'buff', stat: 'pdef', modifier: () => 1.3, turns: 2, stackGroup: 'defBuff' }],
    weight: 3,
    cond: { cooldown: 4 },
  },
  J1 = {
    id: 'ea_weak_poison',
    name: '毒牙',
    element: 'pierce',
    target: 'enemyOne',
    effects: [
      { kind: 'damage', statBase: 'str', power: () => 0.8 },
      { kind: 'ailment', ailment: 'poison', chance: () => 0.4, turns: 3 },
    ],
    weight: 4,
    cond: { cooldown: 3 },
  },
  th = {
    id: 'ea_screech',
    name: '威嚇',
    element: 'almighty',
    target: 'enemyAll',
    effects: [
      { kind: 'buff', stat: 'patk', modifier: () => 0.85, turns: 2, stackGroup: 'atkDebuff' },
    ],
    weight: 3,
    cond: { cooldown: 4 },
  },
  lh = {
    id: 'ea_heavy_blow',
    name: '強打',
    element: 'bash',
    target: 'enemyOne',
    effects: [{ kind: 'damage', statBase: 'str', power: () => 1.6 }],
    weight: 5,
    cond: { cooldown: 3 },
  },
  P1 = {
    id: 'ea_sweep',
    name: '薙ぎ払い',
    element: 'bash',
    target: 'enemyAll',
    effects: [{ kind: 'damage', statBase: 'str', power: () => 0.9 }],
    weight: 4,
    cond: { cooldown: 4 },
  },
  F1 = {
    id: 'ea_war_roar',
    name: '戦吼',
    element: 'almighty',
    target: 'self',
    effects: [{ kind: 'buff', stat: 'patk', modifier: () => 1.3, turns: 3, stackGroup: 'atkBuff' }],
    weight: 3,
    cond: { cooldown: 5 },
  },
  W1 = {
    id: 'ea_bind_bite',
    name: '噛み砕き',
    element: 'bash',
    target: 'enemyOne',
    effects: [
      { kind: 'damage', statBase: 'str', power: () => 1 },
      { kind: 'ailment', ailment: 'armBind', chance: () => 0.4, turns: 2 },
    ],
    weight: 3,
    cond: { cooldown: 4 },
  };
function cs(l, i, r) {
  return {
    id: l,
    name: i,
    element: r,
    target: 'enemyOne',
    effects: [{ kind: 'damage', statBase: 'str', power: () => 2.2 }],
    weight: 6,
    cond: { cooldown: 4 },
  };
}
function us(l, i, r) {
  return {
    id: l,
    name: i,
    element: r,
    target: 'enemyAll',
    effects: [{ kind: 'damage', statBase: 'str', power: () => 1 }],
    weight: 7,
    cond: { cooldown: 2 },
  };
}
function ds(l) {
  return {
    id: l,
    name: '力を溜める',
    element: 'almighty',
    target: 'self',
    effects: [
      { kind: 'buff', stat: 'patk', modifier: () => 1.35, turns: 3, stackGroup: 'atkBuff' },
    ],
    weight: 4,
    cond: { cooldown: 5, hpAbove: 0.5 },
  };
}
function ms(l) {
  return {
    id: l,
    name: '守りを固める',
    element: 'almighty',
    target: 'self',
    effects: [{ kind: 'buff', stat: 'pdef', modifier: () => 1.4, turns: 3, stackGroup: 'defBuff' }],
    weight: 3,
    cond: { cooldown: 6 },
  };
}
function _s(l, i, r) {
  return {
    id: l,
    name: i,
    element: r,
    target: 'enemyAll',
    effects: [{ kind: 'damage', statBase: 'str', power: () => 1.4 }],
    weight: 8,
    cond: { hpBelow: 0.65, cooldown: 3 },
  };
}
function fs(l, i, r) {
  return {
    id: l,
    name: i,
    element: 'almighty',
    target: 'enemyAll',
    effects: [{ kind: 'ailment', ailment: r, chance: () => 0.4, turns: 3 }],
    weight: 4,
    cond: { hpBelow: 0.6, cooldown: 5 },
  };
}
const ex = {
    zako_bruiser: [Z1, eh],
    zako_venom: [J1, th],
    zako_caster: [th, eh],
    foe_heavy: [lh, F1, W1],
    foe_striker: [lh, P1],
  },
  tx = [
    cs('eb_gk_sig', '大地割り', 'bash'),
    us('eb_gk_aoe', '岩砕き', 'bash'),
    ds('eb_gk_sbuff'),
    ms('eb_gk_dbuff'),
    _s('eb_gk_enrage', '激昂', 'bash'),
    fs('eb_gk_status', '石礫の嵐', 'paralysis'),
  ],
  lx = [
    cs('eb_ml_sig', '山嶺の一撃', 'bash'),
    us('eb_ml_aoe', '猿軍の押し潰し', 'bash'),
    ds('eb_ml_sbuff'),
    ms('eb_ml_dbuff'),
    _s('eb_ml_enrage', '激昂', 'bash'),
    fs('eb_ml_status', '雄叫び', 'paralysis'),
  ],
  ax = [
    cs('eb_fm_sig', '絶対零度', 'bash'),
    us('eb_fm_aoe', '氷雪乱舞', 'ice'),
    ds('eb_fm_sbuff'),
    ms('eb_fm_dbuff'),
    _s('eb_fm_enrage', '激昂・極氷', 'ice'),
    fs('eb_fm_status', '凍結の息吹', 'paralysis'),
  ],
  nx = [
    cs('eb_ts_sig', '雷霆斬', 'slash'),
    us('eb_ts_aoe', '嵐の剣舞', 'volt'),
    ds('eb_ts_sbuff'),
    ms('eb_ts_dbuff'),
    _s('eb_ts_enrage', '激昂・雷霆', 'volt'),
    fs('eb_ts_status', '電撃の刃', 'paralysis'),
  ],
  ix = [
    cs('eb_bs_sig', '瘴気爆発', 'bash'),
    us('eb_bs_aoe', '腐敗の波動', 'bash'),
    ds('eb_bs_sbuff'),
    ms('eb_bs_dbuff'),
    _s('eb_bs_enrage', '激昂・腐王', 'bash'),
    fs('eb_bs_status', '猛毒の霧', 'poison'),
  ],
  Tt = {
    enemy_slime: {
      id: 'enemy_slime',
      name: 'スライム',
      baseStats: { hp: 54, tp: 0, str: 5, vit: 4, agi: 4, int: 2, mnd: 3, luc: 3 },
      refDepth: 1,
      tierBand: 0,
      exp: 48,
      gold: 12,
      attackElement: 'bash',
      resist: { fire: 1.5, ice: 0.5 },
      drops: [{ itemId: 'item_slime_jelly', rate: 0.45 }],
      kit: 'zako_bruiser',
    },
    enemy_giant_rat: {
      id: 'enemy_giant_rat',
      name: 'おおねずみ',
      baseStats: { hp: 42, tp: 0, str: 6, vit: 3, agi: 7, int: 2, mnd: 2, luc: 4 },
      refDepth: 1,
      tierBand: 0,
      exp: 40,
      gold: 15,
      attackElement: 'slash',
      drops: [{ itemId: 'item_rat_tail', rate: 0.45 }],
      kit: 'zako_bruiser',
    },
    enemy_cave_bat: {
      id: 'enemy_cave_bat',
      name: 'どうくつコウモリ',
      baseStats: { hp: 36, tp: 0, str: 5, vit: 2, agi: 9, int: 3, mnd: 2, luc: 5 },
      refDepth: 1,
      tierBand: 0,
      exp: 40,
      gold: 9,
      attackElement: 'pierce',
      resist: { volt: 1.5 },
      drops: [{ itemId: 'item_bat_wing', rate: 0.45 }],
      kit: 'zako_caster',
    },
    enemy_boss_gatekeeper: {
      id: 'enemy_boss_gatekeeper',
      name: '門番のゴーレム',
      baseStats: { hp: 9e3, tp: 0, str: 30, vit: 16, agi: 6, int: 4, mnd: 10, luc: 6 },
      refDepth: 10,
      tierBand: 0,
      exp: 720,
      gold: 600,
      attackElement: 'bash',
      resist: { slash: 0.5, pierce: 0.5, ice: 1.5 },
      drops: [{ itemId: 'item_golem_core', rate: 1 }],
      isBoss: !0,
      kind: 'boss',
      actions: tx,
    },
    enemy_t0_forest_rabbit: {
      id: 'enemy_t0_forest_rabbit',
      name: 'もりウサギ',
      baseStats: { hp: 48, tp: 0, str: 5, vit: 3, agi: 9, int: 2, mnd: 3, luc: 6 },
      refDepth: 3,
      tierBand: 0,
      exp: 40,
      gold: 12,
      attackElement: 'bash',
      drops: [{ itemId: 'item_mat_t0_soft_pelt', rate: 0.45 }],
      kind: 'zako',
      kit: 'zako_bruiser',
    },
    enemy_t0_glow_mushroom: {
      id: 'enemy_t0_glow_mushroom',
      name: 'ひかりタケ',
      baseStats: { hp: 66, tp: 0, str: 6, vit: 6, agi: 4, int: 4, mnd: 4, luc: 3 },
      refDepth: 3,
      tierBand: 0,
      exp: 56,
      gold: 15,
      attackElement: 'bash',
      resist: { fire: 1.5, volt: 0.5 },
      drops: [{ itemId: 'item_mat_t0_spore_cap', rate: 0.45 }],
      kind: 'zako',
      kit: 'zako_caster',
    },
    enemy_t0_wood_caracal: {
      id: 'enemy_t0_wood_caracal',
      name: 'やぶカラカル',
      baseStats: { hp: 60, tp: 0, str: 8, vit: 4, agi: 8, int: 3, mnd: 2, luc: 5 },
      refDepth: 3,
      tierBand: 0,
      exp: 64,
      gold: 18,
      attackElement: 'slash',
      drops: [{ itemId: 'item_mat_t0_soft_pelt', rate: 0.45 }],
      kind: 'zako',
      kit: 'zako_bruiser',
    },
    enemy_t0_pale_wisp: {
      id: 'enemy_t0_pale_wisp',
      name: 'あおざめた亡霊',
      baseStats: { hp: 57, tp: 0, str: 6, vit: 3, agi: 6, int: 4, mnd: 4, luc: 4 },
      refDepth: 3,
      tierBand: 0,
      exp: 64,
      gold: 21,
      attackElement: 'bash',
      resist: { slash: 0.5, pierce: 0.5, fire: 1.5 },
      drops: [{ itemId: 'item_mat_t0_faint_ember', rate: 0.45 }],
      kind: 'zako',
      kit: 'zako_venom',
    },
    enemy_t0_bristle_boar: {
      id: 'enemy_t0_bristle_boar',
      name: 'こイノシシ',
      baseStats: { hp: 78, tp: 0, str: 8, vit: 6, agi: 5, int: 2, mnd: 3, luc: 4 },
      refDepth: 3,
      tierBand: 0,
      exp: 72,
      gold: 24,
      attackElement: 'bash',
      drops: [{ itemId: 'item_mat_t0_soft_pelt', rate: 0.45 }],
      kind: 'zako',
      kit: 'zako_bruiser',
    },
    enemy_t0_thicket_stag: {
      id: 'enemy_t0_thicket_stag',
      name: 'しげみのオオツノジカ',
      baseStats: { hp: 174, tp: 0, str: 13, vit: 9, agi: 8, int: 3, mnd: 5, luc: 5 },
      refDepth: 6,
      tierBand: 0,
      exp: 240,
      gold: 120,
      attackElement: 'pierce',
      resist: { fire: 1.5 },
      drops: [{ itemId: 'item_mat_t0_great_antler', rate: 0.45 }],
      kind: 'foe',
      kit: 'foe_striker',
    },
    enemy_t0_cave_crawler: {
      id: 'enemy_t0_cave_crawler',
      name: 'どうくつヤスデ',
      baseStats: { hp: 210, tp: 0, str: 12, vit: 10, agi: 5, int: 2, mnd: 4, luc: 3 },
      refDepth: 6,
      tierBand: 0,
      exp: 280,
      gold: 135,
      attackElement: 'bash',
      resist: { pierce: 0.5, ice: 1.5 },
      drops: [{ itemId: 'item_mat_t0_chitin_plate', rate: 0.45 }],
      kind: 'foe',
      kit: 'foe_heavy',
    },
    enemy_t0_elder_treant: {
      id: 'enemy_t0_elder_treant',
      name: 'ふるびた樹人',
      baseStats: { hp: 204, tp: 0, str: 15, vit: 10, agi: 5, int: 4, mnd: 6, luc: 4 },
      refDepth: 6,
      tierBand: 0,
      exp: 320,
      gold: 165,
      attackElement: 'bash',
      resist: { slash: 0.5, bash: 0.5, fire: 1.5, ice: 0.5 },
      drops: [{ itemId: 'item_mat_t0_great_antler', rate: 0.45 }],
      kind: 'foe',
      kit: 'foe_heavy',
    },
    enemy_t1_crag_goat: {
      id: 'enemy_t1_crag_goat',
      name: 'がんぺきヤギ',
      baseStats: { hp: 440, tp: 0, str: 14, vit: 11, agi: 9, int: 3, mnd: 4, luc: 5 },
      refDepth: 13,
      tierBand: 1,
      exp: 100,
      gold: 42,
      attackElement: 'bash',
      drops: [{ itemId: 'item_mat_t1_coarse_hide', rate: 0.45 }],
      kind: 'zako',
      kit: 'zako_bruiser',
    },
    enemy_t1_rock_lizard: {
      id: 'enemy_t1_rock_lizard',
      name: 'いわトカゲ',
      baseStats: { hp: 500, tp: 0, str: 13, vit: 13, agi: 7, int: 3, mnd: 4, luc: 4 },
      refDepth: 13,
      tierBand: 1,
      exp: 144,
      gold: 48,
      attackElement: 'slash',
      resist: { fire: 0.5, ice: 1.5 },
      drops: [{ itemId: 'item_mat_t1_stone_scale', rate: 0.45 }],
      kind: 'zako',
      kit: 'zako_bruiser',
    },
    enemy_t1_highland_hawk: {
      id: 'enemy_t1_highland_hawk',
      name: 'こうちタカ',
      baseStats: { hp: 380, tp: 0, str: 15, vit: 8, agi: 12, int: 4, mnd: 4, luc: 6 },
      refDepth: 13,
      tierBand: 1,
      exp: 136,
      gold: 45,
      attackElement: 'pierce',
      resist: { volt: 1.5 },
      drops: [{ itemId: 'item_mat_t1_sharp_feather', rate: 0.45 }],
      kind: 'zako',
      kit: 'zako_caster',
    },
    enemy_t1_stone_beetle: {
      id: 'enemy_t1_stone_beetle',
      name: 'いわかぶとムシ',
      baseStats: { hp: 560, tp: 0, str: 13, vit: 13, agi: 6, int: 2, mnd: 5, luc: 4 },
      refDepth: 13,
      tierBand: 1,
      exp: 152,
      gold: 51,
      attackElement: 'bash',
      resist: { bash: 0.5, pierce: 0.5, volt: 1.5 },
      drops: [{ itemId: 'item_mat_t1_stone_scale', rate: 0.45 }],
      kind: 'zako',
      kit: 'zako_venom',
    },
    enemy_t1_cliff_ram: {
      id: 'enemy_t1_cliff_ram',
      name: 'がけのオオヒツジ',
      baseStats: { hp: 520, tp: 0, str: 16, vit: 12, agi: 8, int: 2, mnd: 4, luc: 5 },
      refDepth: 13,
      tierBand: 1,
      exp: 160,
      gold: 54,
      attackElement: 'bash',
      drops: [{ itemId: 'item_mat_t1_coarse_hide', rate: 0.45 }],
      kind: 'zako',
      kit: 'zako_bruiser',
    },
    enemy_t1_ember_lizard: {
      id: 'enemy_t1_ember_lizard',
      name: 'ほむらトカゲ',
      baseStats: { hp: 460, tp: 0, str: 17, vit: 10, agi: 10, int: 5, mnd: 5, luc: 5 },
      refDepth: 13,
      tierBand: 1,
      exp: 168,
      gold: 60,
      attackElement: 'slash',
      resist: { fire: 0, ice: 1.5 },
      drops: [{ itemId: 'item_mat_t1_stone_scale', rate: 0.45 }],
      kind: 'zako',
      kit: 'zako_bruiser',
    },
    enemy_t1_boulder_toad: {
      id: 'enemy_t1_boulder_toad',
      name: 'いわガマ',
      baseStats: { hp: 580, tp: 0, str: 12, vit: 12, agi: 6, int: 4, mnd: 6, luc: 4 },
      refDepth: 13,
      tierBand: 1,
      exp: 144,
      gold: 48,
      attackElement: 'bash',
      resist: { volt: 1.5, ice: 0.5 },
      drops: [{ itemId: 'item_mat_t1_coarse_hide', rate: 0.45 }],
      kind: 'zako',
      kit: 'zako_venom',
    },
    enemy_t1_young_baboon: {
      id: 'enemy_t1_young_baboon',
      name: 'わかザル',
      baseStats: { hp: 480, tp: 0, str: 16, vit: 9, agi: 11, int: 4, mnd: 4, luc: 6 },
      refDepth: 13,
      tierBand: 1,
      exp: 176,
      gold: 66,
      attackElement: 'bash',
      drops: [{ itemId: 'item_mat_t1_coarse_hide', rate: 0.45 }],
      kind: 'zako',
      kit: 'zako_bruiser',
    },
    enemy_t1_boulder_ogre: {
      id: 'enemy_t1_boulder_ogre',
      name: 'おおいわのオーガ',
      baseStats: { hp: 4200, tp: 0, str: 33, vit: 22, agi: 7, int: 3, mnd: 8, luc: 5 },
      refDepth: 16,
      tierBand: 1,
      exp: 800,
      gold: 420,
      attackElement: 'bash',
      resist: { bash: 0.5, slash: 0.5, ice: 1.5 },
      drops: [{ itemId: 'item_mat_t1_ogre_fang', rate: 0.45 }],
      kind: 'foe',
      kit: 'foe_heavy',
    },
    enemy_t1_thunder_roc: {
      id: 'enemy_t1_thunder_roc',
      name: 'いかずちの大ワシ',
      baseStats: { hp: 330, tp: 0, str: 31, vit: 16, agi: 13, int: 6, mnd: 7, luc: 6 },
      refDepth: 16,
      tierBand: 1,
      exp: 640,
      gold: 330,
      attackElement: 'pierce',
      resist: { volt: 0, ice: 1.5 },
      drops: [{ itemId: 'item_mat_t1_sharp_feather', rate: 0.45 }],
      kind: 'foe',
      kit: 'foe_striker',
    },
    enemy_t1_magma_drake: {
      id: 'enemy_t1_magma_drake',
      name: 'マグマの竜トカゲ',
      baseStats: { hp: 480, tp: 0, str: 36, vit: 20, agi: 9, int: 7, mnd: 9, luc: 5 },
      refDepth: 16,
      tierBand: 1,
      exp: 880,
      gold: 480,
      attackElement: 'slash',
      resist: { fire: 0, slash: 0.5, ice: 1.5 },
      drops: [{ itemId: 'item_mat_t1_drake_horn', rate: 0.45 }],
      kind: 'foe',
      kit: 'foe_heavy',
    },
    enemy_t1_boss_mountain_lord: {
      id: 'enemy_t1_boss_mountain_lord',
      name: '山嶺の大猿王',
      baseStats: { hp: 9500, tp: 0, str: 48, vit: 34, agi: 12, int: 8, mnd: 18, luc: 8 },
      refDepth: 20,
      tierBand: 1,
      exp: 2400,
      gold: 1950,
      attackElement: 'bash',
      resist: { bash: 0.5, slash: 0.5, pierce: 0.5, fire: 0.5, volt: 0.5, ice: 1.5 },
      drops: [{ itemId: 'item_mat_t1_lord_pelt', rate: 1 }],
      kind: 'boss',
      isBoss: !0,
      actions: lx,
      ailmentResist: { sleep: 0 },
    },
    enemy_t2_frostfang_wolf: {
      id: 'enemy_t2_frostfang_wolf',
      name: 'シモフリオオカミ',
      baseStats: { hp: 792, tp: 0, str: 26, vit: 16, agi: 14, int: 6, mnd: 8, luc: 7 },
      refDepth: 23,
      tierBand: 2,
      exp: 368,
      gold: 126,
      attackElement: 'slash',
      resist: { ice: 0.5, fire: 1.5 },
      drops: [{ itemId: 'item_mat_t2_frost_pelt', rate: 0.45 }],
      kind: 'zako',
      kit: 'zako_bruiser',
    },
    enemy_t2_snow_ape: {
      id: 'enemy_t2_snow_ape',
      name: 'セッペキザル',
      baseStats: { hp: 864, tp: 0, str: 27, vit: 18, agi: 10, int: 5, mnd: 9, luc: 6 },
      refDepth: 23,
      tierBand: 2,
      exp: 400,
      gold: 144,
      attackElement: 'bash',
      resist: { ice: 0.5, fire: 1.5, bash: 0.5 },
      drops: [{ itemId: 'item_mat_t2_frost_pelt', rate: 0.45 }],
      kind: 'zako',
      kit: 'zako_bruiser',
    },
    enemy_t2_glacier_crab: {
      id: 'enemy_t2_glacier_crab',
      name: 'ヒョウケツガニ',
      baseStats: { hp: 900, tp: 0, str: 23, vit: 20, agi: 8, int: 4, mnd: 10, luc: 5 },
      refDepth: 23,
      tierBand: 2,
      exp: 384,
      gold: 150,
      attackElement: 'pierce',
      resist: { ice: 0.5, fire: 1.5, slash: 0.5 },
      drops: [{ itemId: 'item_mat_t2_ice_crystal', rate: 0.45 }],
      kind: 'zako',
      kit: 'zako_venom',
    },
    enemy_t2_snow_owl: {
      id: 'enemy_t2_snow_owl',
      name: 'セツゲンフクロウ',
      baseStats: { hp: 648, tp: 0, str: 24, vit: 14, agi: 16, int: 9, mnd: 8, luc: 9 },
      refDepth: 23,
      tierBand: 2,
      exp: 352,
      gold: 114,
      attackElement: 'slash',
      resist: { ice: 0.5, fire: 1.5, volt: 1.5 },
      drops: [{ itemId: 'item_mat_t2_frost_pelt', rate: 0.45 }],
      kind: 'zako',
      kit: 'zako_caster',
    },
    enemy_t2_ice_wisp: {
      id: 'enemy_t2_ice_wisp',
      name: 'コオリビ',
      baseStats: { hp: 630, tp: 0, str: 22, vit: 14, agi: 15, int: 12, mnd: 12, luc: 8 },
      refDepth: 23,
      tierBand: 2,
      exp: 336,
      gold: 120,
      attackElement: 'bash',
      resist: { ice: 0, fire: 1.5, slash: 0.5, pierce: 0.5 },
      drops: [{ itemId: 'item_mat_t2_chill_core', rate: 0.45 }],
      kind: 'zako',
      kit: 'zako_caster',
    },
    enemy_t2_rime_beetle: {
      id: 'enemy_t2_rime_beetle',
      name: 'ジュヒョウムシ',
      baseStats: { hp: 828, tp: 0, str: 25, vit: 19, agi: 11, int: 5, mnd: 7, luc: 6 },
      refDepth: 23,
      tierBand: 2,
      exp: 376,
      gold: 132,
      attackElement: 'pierce',
      resist: { ice: 0.5, fire: 1.5 },
      drops: [{ itemId: 'item_mat_t2_ice_crystal', rate: 0.45 }],
      kind: 'zako',
      kit: 'zako_venom',
    },
    enemy_t2_frost_stag: {
      id: 'enemy_t2_frost_stag',
      name: 'ヒョウガジカ',
      baseStats: { hp: 882, tp: 0, str: 28, vit: 18, agi: 13, int: 6, mnd: 9, luc: 7 },
      refDepth: 23,
      tierBand: 2,
      exp: 416,
      gold: 138,
      attackElement: 'pierce',
      resist: { ice: 0.5, fire: 1.5 },
      drops: [{ itemId: 'item_mat_t2_frost_pelt', rate: 0.45 }],
      kind: 'zako',
      kit: 'zako_bruiser',
    },
    enemy_t2_snow_serpent: {
      id: 'enemy_t2_snow_serpent',
      name: 'セツゲンヘビ',
      baseStats: { hp: 756, tp: 0, str: 27, vit: 15, agi: 16, int: 7, mnd: 7, luc: 8 },
      refDepth: 23,
      tierBand: 2,
      exp: 392,
      gold: 129,
      attackElement: 'pierce',
      resist: { ice: 0.5, fire: 1.5, volt: 0.5 },
      drops: [{ itemId: 'item_mat_t2_chill_core', rate: 0.45 }],
      kind: 'zako',
      kit: 'zako_venom',
    },
    enemy_t2_glacial_bear: {
      id: 'enemy_t2_glacial_bear',
      name: 'ヒョウガグマ',
      baseStats: { hp: 840, tp: 0, str: 60, vit: 30, agi: 12, int: 6, mnd: 14, luc: 8 },
      refDepth: 26,
      tierBand: 2,
      exp: 1760,
      gold: 960,
      attackElement: 'bash',
      resist: { ice: 0.5, fire: 1.5, bash: 0.5 },
      drops: [
        { itemId: 'item_mat_t2_frost_pelt', rate: 0.45 },
        { itemId: 'item_mat_t2_chill_core', rate: 0.3 },
      ],
      kind: 'foe',
      kit: 'foe_heavy',
    },
    enemy_t2_iron_ice_golem: {
      id: 'enemy_t2_iron_ice_golem',
      name: 'ヒョウケツゴーレム',
      baseStats: { hp: 900, tp: 0, str: 55, vit: 34, agi: 8, int: 5, mnd: 16, luc: 6 },
      refDepth: 26,
      tierBand: 2,
      exp: 1680,
      gold: 1020,
      attackElement: 'bash',
      resist: { ice: 0, fire: 1.5, slash: 0.5, pierce: 0.5 },
      drops: [
        { itemId: 'item_mat_t2_ice_crystal', rate: 0.45 },
        { itemId: 'item_mat_t2_chill_core', rate: 0.3 },
      ],
      kind: 'foe',
      kit: 'foe_heavy',
    },
    enemy_t2_blizzard_hawk: {
      id: 'enemy_t2_blizzard_hawk',
      name: 'フブキタカ',
      baseStats: { hp: 600, tp: 0, str: 62, vit: 24, agi: 22, int: 8, mnd: 10, luc: 11 },
      refDepth: 26,
      tierBand: 2,
      exp: 1280,
      gold: 660,
      attackElement: 'slash',
      resist: { ice: 0.5, fire: 1.5, volt: 1.5 },
      drops: [
        { itemId: 'item_mat_t2_frost_pelt', rate: 0.45 },
        { itemId: 'item_mat_t2_ice_crystal', rate: 0.3 },
      ],
      kind: 'foe',
      kit: 'foe_striker',
    },
    enemy_t2_boss_frost_monarch: {
      id: 'enemy_t2_boss_frost_monarch',
      name: '氷晶の女王',
      baseStats: { hp: 28e3, tp: 0, str: 140, vit: 54, agi: 18, int: 16, mnd: 22, luc: 12 },
      refDepth: 30,
      tierBand: 2,
      exp: 5160,
      gold: 4200,
      attackElement: 'bash',
      resist: { ice: 0, fire: 1.5, slash: 0.5, pierce: 0.5, bash: 0.5, volt: 0.5 },
      drops: [{ itemId: 'item_mat_t2_monarch_diadem', rate: 1 }],
      kind: 'boss',
      isBoss: !0,
      actions: ax,
      ailmentResist: { poison: 0, sleep: 0, paralysis: 0.5 },
    },
    enemy_t3_storm_wolf: {
      id: 'enemy_t3_storm_wolf',
      name: 'ライメイオオカミ',
      baseStats: { hp: 1050, tp: 0, str: 42, vit: 26, agi: 24, int: 8, mnd: 10, luc: 10 },
      refDepth: 33,
      tierBand: 3,
      exp: 768,
      gold: 252,
      attackElement: 'slash',
      resist: { volt: 0.5, ice: 1.5 },
      drops: [{ itemId: 'item_mat_t3_charged_hide', rate: 0.45 }],
      kind: 'zako',
      kit: 'zako_bruiser',
    },
    enemy_t3_thunder_bird: {
      id: 'enemy_t3_thunder_bird',
      name: 'ライウチョウ',
      baseStats: { hp: 938, tp: 0, str: 40, vit: 24, agi: 30, int: 12, mnd: 11, luc: 13 },
      refDepth: 33,
      tierBand: 3,
      exp: 736,
      gold: 234,
      attackElement: 'slash',
      resist: { volt: 0, ice: 1.5 },
      drops: [{ itemId: 'item_mat_t3_storm_feather', rate: 0.45 }],
      kind: 'zako',
      kit: 'zako_caster',
    },
    enemy_t3_spark_beetle: {
      id: 'enemy_t3_spark_beetle',
      name: 'ホウデンムシ',
      baseStats: { hp: 1092, tp: 0, str: 38, vit: 30, agi: 20, int: 10, mnd: 9, luc: 9 },
      refDepth: 33,
      tierBand: 3,
      exp: 720,
      gold: 240,
      attackElement: 'pierce',
      resist: { volt: 0.5, ice: 1.5, bash: 0.5 },
      drops: [{ itemId: 'item_mat_t3_thunder_carapace', rate: 0.45 }],
      kind: 'zako',
      kit: 'zako_venom',
    },
    enemy_t3_gale_serpent: {
      id: 'enemy_t3_gale_serpent',
      name: 'シップウヘビ',
      baseStats: { hp: 980, tp: 0, str: 44, vit: 24, agi: 28, int: 9, mnd: 8, luc: 11 },
      refDepth: 33,
      tierBand: 3,
      exp: 752,
      gold: 246,
      attackElement: 'pierce',
      resist: { volt: 0.5, ice: 1.5 },
      drops: [{ itemId: 'item_mat_t3_charged_hide', rate: 0.45 }],
      kind: 'zako',
      kit: 'zako_venom',
    },
    enemy_t3_charged_wisp: {
      id: 'enemy_t3_charged_wisp',
      name: 'イカズチビ',
      baseStats: { hp: 910, tp: 0, str: 36, vit: 24, agi: 26, int: 16, mnd: 14, luc: 10 },
      refDepth: 33,
      tierBand: 3,
      exp: 704,
      gold: 258,
      attackElement: 'bash',
      resist: { volt: 0, ice: 1.5, slash: 0.5, pierce: 0.5 },
      drops: [{ itemId: 'item_mat_t3_storm_feather', rate: 0.45 }],
      kind: 'zako',
      kit: 'zako_caster',
    },
    enemy_t3_tempest_ape: {
      id: 'enemy_t3_tempest_ape',
      name: 'アラシザル',
      baseStats: { hp: 1176, tp: 0, str: 45, vit: 32, agi: 22, int: 7, mnd: 10, luc: 8 },
      refDepth: 33,
      tierBand: 3,
      exp: 800,
      gold: 270,
      attackElement: 'bash',
      resist: { volt: 0.5, ice: 1.5 },
      drops: [{ itemId: 'item_mat_t3_charged_hide', rate: 0.45 }],
      kind: 'zako',
      kit: 'zako_bruiser',
    },
    enemy_t3_static_crystal: {
      id: 'enemy_t3_static_crystal',
      name: 'タイデンクリスタル',
      baseStats: { hp: 1134, tp: 0, str: 38, vit: 32, agi: 18, int: 14, mnd: 16, luc: 7 },
      refDepth: 33,
      tierBand: 3,
      exp: 784,
      gold: 300,
      attackElement: 'bash',
      resist: { volt: 0, ice: 1.5, slash: 0.5, pierce: 0.5 },
      drops: [{ itemId: 'item_mat_t3_thunder_carapace', rate: 0.45 }],
      kind: 'zako',
      kit: 'zako_caster',
    },
    enemy_t3_rain_hawk: {
      id: 'enemy_t3_rain_hawk',
      name: 'シグレタカ',
      baseStats: { hp: 966, tp: 0, str: 41, vit: 25, agi: 32, int: 10, mnd: 11, luc: 13 },
      refDepth: 33,
      tierBand: 3,
      exp: 760,
      gold: 228,
      attackElement: 'slash',
      resist: { volt: 0.5, ice: 1.5, fire: 1.5 },
      drops: [{ itemId: 'item_mat_t3_storm_feather', rate: 0.45 }],
      kind: 'zako',
      kit: 'zako_caster',
    },
    enemy_t3_thunder_beast: {
      id: 'enemy_t3_thunder_beast',
      name: 'ゴウライジュウ',
      baseStats: { hp: 1440, tp: 0, str: 93, vit: 40, agi: 26, int: 10, mnd: 14, luc: 10 },
      refDepth: 36,
      tierBand: 3,
      exp: 3520,
      gold: 1920,
      attackElement: 'bash',
      resist: { volt: 0, ice: 1.5, bash: 0.5 },
      drops: [
        { itemId: 'item_mat_t3_charged_hide', rate: 0.45 },
        { itemId: 'item_mat_t3_thunder_carapace', rate: 0.3 },
      ],
      kind: 'foe',
      kit: 'foe_heavy',
    },
    enemy_t3_storm_roc: {
      id: 'enemy_t3_storm_roc',
      name: 'バクフウチョウ',
      baseStats: { hp: 1080, tp: 0, str: 96, vit: 34, agi: 36, int: 12, mnd: 12, luc: 14 },
      refDepth: 36,
      tierBand: 3,
      exp: 2880,
      gold: 1440,
      attackElement: 'slash',
      resist: { volt: 0.5, ice: 1.5 },
      drops: [
        { itemId: 'item_mat_t3_storm_feather', rate: 0.45 },
        { itemId: 'item_mat_t3_charged_hide', rate: 0.3 },
      ],
      kind: 'foe',
      kit: 'foe_striker',
    },
    enemy_t3_discharge_idol: {
      id: 'enemy_t3_discharge_idol',
      name: 'ホウデンキョゾウ',
      baseStats: { hp: 1560, tp: 0, str: 76, vit: 44, agi: 20, int: 18, mnd: 20, luc: 8 },
      refDepth: 36,
      tierBand: 3,
      exp: 3040,
      gold: 1680,
      attackElement: 'bash',
      resist: { volt: 0, ice: 1.5, slash: 0.5, pierce: 0.5 },
      drops: [
        { itemId: 'item_mat_t3_thunder_carapace', rate: 0.45 },
        { itemId: 'item_mat_t3_storm_feather', rate: 0.3 },
      ],
      kind: 'foe',
      kit: 'foe_heavy',
    },
    enemy_t3_boss_tempest_sovereign: {
      id: 'enemy_t3_boss_tempest_sovereign',
      name: '雷霆の覇王',
      baseStats: { hp: 19e3, tp: 0, str: 220, vit: 86, agi: 34, int: 22, mnd: 26, luc: 14 },
      refDepth: 40,
      tierBand: 3,
      exp: 10080,
      gold: 8400,
      attackElement: 'slash',
      resist: { volt: 0, ice: 1.5, slash: 0.5, pierce: 0.5, bash: 0.5, fire: 0.5 },
      drops: [{ itemId: 'item_mat_t3_sovereign_horn', rate: 1 }],
      kind: 'boss',
      isBoss: !0,
      actions: nx,
      ailmentResist: { paralysis: 0, sleep: 0 },
    },
    enemy_t4_rotwalker: {
      id: 'enemy_t4_rotwalker',
      name: '腐肉の徘徊者',
      baseStats: { hp: 1305, tp: 0, str: 64, vit: 50, agi: 11, int: 8, mnd: 18, luc: 14 },
      refDepth: 43,
      tierBand: 4,
      exp: 1440,
      gold: 420,
      attackElement: 'bash',
      resist: { slash: 0.5, pierce: 0.5, fire: 1.5, ice: 0.5 },
      drops: [
        { itemId: 'item_mat_t4_rotflesh', rate: 0.45 },
        { itemId: 'item_mat_t4_grave_dust', rate: 0.3 },
      ],
      kind: 'zako',
      kit: 'zako_venom',
    },
    enemy_t4_bone_lancer: {
      id: 'enemy_t4_bone_lancer',
      name: '骸骨の突撃兵',
      baseStats: { hp: 1116, tp: 0, str: 70, vit: 44, agi: 18, int: 6, mnd: 12, luc: 16 },
      refDepth: 43,
      tierBand: 4,
      exp: 1400,
      gold: 450,
      attackElement: 'pierce',
      resist: { pierce: 0.5, ice: 1.5, volt: 0.5 },
      drops: [
        { itemId: 'item_mat_t4_grave_dust', rate: 0.45 },
        { itemId: 'item_mat_t4_cursed_marrow', rate: 0.3 },
      ],
      kind: 'zako',
      kit: 'zako_venom',
    },
    enemy_t4_miasma_moth: {
      id: 'enemy_t4_miasma_moth',
      name: '瘴気の毒蛾',
      baseStats: { hp: 1044, tp: 0, str: 58, vit: 40, agi: 22, int: 16, mnd: 16, luc: 20 },
      refDepth: 43,
      tierBand: 4,
      exp: 1320,
      gold: 360,
      attackElement: 'slash',
      resist: { fire: 0.5, ice: 1.5 },
      drops: [
        { itemId: 'item_mat_t4_toxic_scale', rate: 0.45 },
        { itemId: 'item_mat_t4_rotflesh', rate: 0.3 },
      ],
      kind: 'zako',
      kit: 'zako_venom',
    },
    enemy_t4_wraith_lantern: {
      id: 'enemy_t4_wraith_lantern',
      name: '彷徨う鬼火',
      baseStats: { hp: 1080, tp: 0, str: 60, vit: 42, agi: 20, int: 20, mnd: 22, luc: 18 },
      refDepth: 43,
      tierBand: 4,
      exp: 1520,
      gold: 480,
      attackElement: 'bash',
      resist: { slash: 0.5, bash: 0.5, fire: 0.5, volt: 1.5 },
      drops: [
        { itemId: 'item_mat_t4_spectral_ash', rate: 0.45 },
        { itemId: 'item_mat_t4_cursed_marrow', rate: 0.3 },
      ],
      kind: 'zako',
      kit: 'zako_caster',
    },
    enemy_t4_rust_sentinel: {
      id: 'enemy_t4_rust_sentinel',
      name: '錆びた哨戒機',
      baseStats: { hp: 1404, tp: 0, str: 66, vit: 52, agi: 10, int: 10, mnd: 14, luc: 12 },
      refDepth: 43,
      tierBand: 4,
      exp: 1680,
      gold: 555,
      attackElement: 'bash',
      resist: { slash: 0.5, fire: 0.5, volt: 1.5 },
      drops: [
        { itemId: 'item_mat_t4_steel_gear', rate: 0.45 },
        { itemId: 'item_mat_t4_corroded_plate', rate: 0.3 },
      ],
      kind: 'zako',
      kit: 'zako_bruiser',
    },
    enemy_t4_plague_crawler: {
      id: 'enemy_t4_plague_crawler',
      name: '疫病の這い虫',
      baseStats: { hp: 1206, tp: 0, str: 62, vit: 46, agi: 16, int: 12, mnd: 14, luc: 16 },
      refDepth: 43,
      tierBand: 4,
      exp: 1360,
      gold: 390,
      attackElement: 'pierce',
      resist: { pierce: 0.5, ice: 0.5, fire: 1.5 },
      drops: [
        { itemId: 'item_mat_t4_toxic_scale', rate: 0.45 },
        { itemId: 'item_mat_t4_rotflesh', rate: 0.3 },
      ],
      kind: 'zako',
      kit: 'zako_venom',
    },
    enemy_t4_grave_acolyte: {
      id: 'enemy_t4_grave_acolyte',
      name: '墓守の呪詛師',
      baseStats: { hp: 1062, tp: 0, str: 59, vit: 41, agi: 14, int: 22, mnd: 24, luc: 18 },
      refDepth: 43,
      tierBand: 4,
      exp: 1600,
      gold: 525,
      attackElement: 'slash',
      resist: { volt: 0.5, ice: 1.5 },
      drops: [
        { itemId: 'item_mat_t4_cursed_marrow', rate: 0.45 },
        { itemId: 'item_mat_t4_spectral_ash', rate: 0.3 },
      ],
      kind: 'zako',
      kit: 'zako_venom',
    },
    enemy_t4_gear_hound: {
      id: 'enemy_t4_gear_hound',
      name: '鋼鉄の番犬',
      baseStats: { hp: 1152, tp: 0, str: 72, vit: 48, agi: 21, int: 8, mnd: 10, luc: 14 },
      refDepth: 43,
      tierBand: 4,
      exp: 1560,
      gold: 495,
      attackElement: 'slash',
      resist: { bash: 0.5, fire: 0.5, ice: 1.5 },
      drops: [
        { itemId: 'item_mat_t4_steel_gear', rate: 0.45 },
        { itemId: 'item_mat_t4_corroded_plate', rate: 0.3 },
      ],
      kind: 'zako',
      kit: 'zako_bruiser',
    },
    enemy_t4_corpse_colossus: {
      id: 'enemy_t4_corpse_colossus',
      name: '腐肉の巨像',
      baseStats: { hp: 2580, tp: 0, str: 141, vit: 86, agi: 10, int: 12, mnd: 24, luc: 18 },
      refDepth: 46,
      tierBand: 4,
      exp: 7040,
      gold: 3840,
      attackElement: 'bash',
      resist: { slash: 0.5, pierce: 0.5, bash: 0.5, fire: 1.5, ice: 0.5 },
      drops: [
        { itemId: 'item_mat_t4_rotflesh', rate: 0.45 },
        { itemId: 'item_mat_t4_grave_dust', rate: 0.3 },
      ],
      kind: 'foe',
      kit: 'foe_heavy',
    },
    enemy_t4_siege_automaton: {
      id: 'enemy_t4_siege_automaton',
      name: '攻城の自動兵器',
      baseStats: { hp: 2460, tp: 0, str: 148, vit: 96, agi: 8, int: 14, mnd: 20, luc: 14 },
      refDepth: 46,
      tierBand: 4,
      exp: 6560,
      gold: 3900,
      attackElement: 'pierce',
      resist: { slash: 0.5, pierce: 0.5, fire: 0.5, volt: 1.5 },
      drops: [
        { itemId: 'item_mat_t4_steel_gear', rate: 0.45 },
        { itemId: 'item_mat_t4_corroded_plate', rate: 0.3 },
      ],
      kind: 'foe',
      kit: 'foe_heavy',
    },
    enemy_t4_shroud_revenant: {
      id: 'enemy_t4_shroud_revenant',
      name: '帷子の怨霊',
      baseStats: { hp: 2100, tp: 0, str: 129, vit: 70, agi: 18, int: 24, mnd: 30, luc: 22 },
      refDepth: 46,
      tierBand: 4,
      exp: 6080,
      gold: 2940,
      attackElement: 'slash',
      resist: { slash: 0.5, bash: 0.5, volt: 0.5, ice: 1.5 },
      drops: [
        { itemId: 'item_mat_t4_spectral_ash', rate: 0.45 },
        { itemId: 'item_mat_t4_cursed_marrow', rate: 0.3 },
      ],
      kind: 'foe',
      kit: 'foe_striker',
    },
    enemy_t4_boss_blight_sovereign: {
      id: 'enemy_t4_boss_blight_sovereign',
      name: '瘴気を統べる腐王',
      baseStats: { hp: 16e3, tp: 0, str: 142, vit: 122, agi: 16, int: 30, mnd: 64, luc: 26 },
      refDepth: 50,
      tierBand: 4,
      exp: 18e3,
      gold: 14400,
      attackElement: 'bash',
      resist: { slash: 0.5, pierce: 0.5, bash: 0.5, fire: 0.5, volt: 0.5, ice: 1.5 },
      drops: [
        { itemId: 'item_mat_t4_sovereign_crown', rate: 1 },
        { itemId: 'item_mat_t4_rotflesh', rate: 0.3 },
        { itemId: 'item_mat_t4_cursed_marrow', rate: 0.3 },
      ],
      kind: 'boss',
      isBoss: !0,
      actions: ix,
      ailmentResist: { poison: 0, sleep: 0 },
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
function sx(l) {
  return l.category === 'food' ? 0 : l.category === 'material' ? 8 : Math.floor(l.buyPrice / 2);
}
function rx(l) {
  var i;
  return ((i = tt[l]) == null ? void 0 : i.category) === 'food';
}
const Ke = {
    race_human: {
      id: 'race_human',
      name: 'ヒト',
      description:
        '純血なヒト族。突出した長所も短所もなく、あらゆる能力が平均的。どの職業にも無理なく適応できる万能種。',
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
      description:
        '屈強な肉体を誇る大型種。高いHPと腕力で前線を支える物理の要だが、素早さと魔法は不得手。火属性に弱い。',
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
      elementResist: { bash: 0.8, fire: 1.2 },
      ailmentResist: { poison: 0.4, legBind: 0.7, paralysis: 1.2 },
    },
    race_pix: {
      id: 'race_pix',
      name: 'ピクス',
      description:
        '魔力に愛された小型種。豊富なTPと高い知力・精神で魔法戦に長けるが、打たれ弱く物理攻撃に弱い。',
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
      elementResist: { fire: 0.85, ice: 0.85, volt: 0.85, slash: 1.2, pierce: 1.2, bash: 1.2 },
      ailmentResist: { blind: 0.5, headBind: 0.6, armBind: 1.3, sleep: 1.2 },
    },
    race_therian: {
      id: 'race_therian',
      name: 'テリアン',
      description:
        '野生の勘を宿す獣人種。素早さと幸運に優れ、命中・回避と手数で戦う。食料調達も得意だが氷属性に弱い。',
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
      elementResist: { ice: 1.2 },
      ailmentResist: { legBind: 0.4, blind: 0.5, sleep: 1.2 },
    },
    race_lunar: {
      id: 'race_lunar',
      name: 'ルーナ',
      description:
        '月の加護を受けた癒し手。精神と幸運が高く回復・補助に向き、TPと魔法防御が伸びる。体は脆い。',
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
      elementResist: { ice: 0.8, fire: 1.2 },
      ailmentResist: { sleep: 0.4, headBind: 0.5, poison: 1.2 },
    },
    race_golan: {
      id: 'race_golan',
      name: 'ゴラン',
      description:
        '岩のごとき体躯を持つ重厚種。最高峰のHP・防御・腕力を誇り物理に強いが、極端に鈍重で魔法を苦手とする。',
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
      elementResist: { slash: 0.8, pierce: 0.8, bash: 0.8, ice: 1.2 },
      ailmentResist: { poison: 0.3, paralysis: 0.5, blind: 1.2 },
    },
  },
  $n = {
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
  Un = {
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
  ox = [
    'poison',
    'paralysis',
    'sleep',
    'confusion',
    'curse',
    'blind',
    'instantDeath',
    'headBind',
    'armBind',
    'legBind',
  ],
  cx = { zako: 0.7, foe: 0.5, boss: 0.35 };
function ux(l) {
  const i = cx[l],
    r = {};
  for (const o of ox) r[o] = i;
  return r;
}
const dx = {
  construct: { poison: 0, sleep: 0, paralysis: 0.5 },
  spirit: { armBind: 0, headBind: 0, legBind: 0, poison: 0, sleep: 1.3 },
  undead: { poison: 0, sleep: 0 },
  plant: { poison: 0, blind: 0 },
  slime: { armBind: 0, legBind: 0, paralysis: 1.3 },
  insect: { poison: 0.5, paralysis: 1.3 },
  bird: { legBind: 0 },
  beast: {},
};
function mx(l) {
  const i = l.name,
    r = l.id;
  return i.includes('ゴーレム') ||
    i.includes('哨戒機') ||
    i.includes('自動兵器') ||
    i.includes('番犬') ||
    i.includes('歯車') ||
    i.includes('装甲') ||
    i.includes('結晶') ||
    i.includes('クリスタル') ||
    i.includes('タイデン') ||
    i.includes('ホウデン') ||
    r.includes('golem') ||
    r.includes('sentinel') ||
    r.includes('automaton') ||
    r.includes('crystal') ||
    r.includes('idol')
    ? 'construct'
    : i.includes('鬼火') ||
        i.includes('亡霊') ||
        i.includes('残り火') ||
        i.includes('コオリビ') ||
        i.includes('イカズチビ') ||
        r.includes('wisp') ||
        r.includes('wraith') ||
        r.includes('revenant')
      ? 'spirit'
      : i.includes('骸骨') ||
          i.includes('怨霊') ||
          i.includes('呪詛') ||
          i.includes('墓守') ||
          i.includes('腐肉') ||
          i.includes('疫病') ||
          i.includes('這い虫') ||
          i.includes('亡者') ||
          i.includes('腐王') ||
          r.includes('bone') ||
          r.includes('grave') ||
          r.includes('corpse') ||
          r.includes('plague') ||
          r.includes('rotwalker') ||
          r.includes('blight')
        ? 'undead'
        : i.includes('タケ') || i.includes('樹人') || r.includes('mushroom') || r.includes('treant')
          ? 'plant'
          : i.includes('スライム') || r.includes('slime')
            ? 'slime'
            : i.includes('ムシ') ||
                i.includes('ヤスデ') ||
                i.includes('ガニ') ||
                i.includes('ガマ') ||
                i.includes('毒蛾') ||
                r.includes('beetle') ||
                r.includes('crawler') ||
                r.includes('crab') ||
                r.includes('toad') ||
                r.includes('moth')
              ? 'insect'
              : i.includes('タカ') ||
                  i.includes('チョウ') ||
                  i.includes('ワシ') ||
                  i.includes('フクロウ') ||
                  r.includes('hawk') ||
                  r.includes('roc') ||
                  r.includes('bird') ||
                  r.includes('owl')
                ? 'bird'
                : 'beast';
}
function vd(l) {
  const i = Tt[l];
  if (!i) return {};
  const r = i.kind ?? 'zako',
    o = r === 'boss' ? 'boss' : r === 'foe' ? 'foe' : 'zako',
    u = mx(i);
  return { ...ux(o), ...dx[u], ...(i.ailmentResist ?? {}) };
}
const Be = {
    LEVEL_CAP: 100,
    BOSS_INTERVAL: 10,
    BAND_SIZE: 10,
    ENEMY_SCALE_K: 0.05,
    EXP_CURVE_BASE: 14,
    EXP_CURVE_POW: 1.52,
    SP_PER_LEVEL: 1.62,
    DAMAGE_DEF_K: 120,
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
    POISON_HP_RATIO: 0.03,
    TP_REGEN_RATIO: 0.04,
    UNION_GAIN_ON_WIN: 15,
    FARM_EXP_DECAY_PER_BAND: 0.85,
    HEAL_MATK_COEF_ONE: 0.7,
    HEAL_MATK_COEF_ALL: 0.45,
    HEAL_MATK_COEF_MINOR: 0.3,
    SURPLUS_SP_PER_STAT: 4,
  },
  _x = 500,
  Zu = 30,
  ps = 3,
  hs = 2,
  ah = ps + hs,
  Wi = { TITLE_DEPTH: 20, REBIRTH_MIN_LEVEL: 30 },
  eg = 5,
  fx = 5,
  Yl = {
    MAX_LEVEL: 5,
    STAT_PER_LEVEL: 2,
    TIER_STEP: 1.6,
    INGOT_INC: { copper: 1, silver: 3, gold: 5 },
    FRAGMENTS_PER_INGOT: 10,
  },
  es = (l) => l > 0 && l % Be.BOSS_INTERVAL === 0,
  nh = (l) => Math.floor((l - 1) / Be.BAND_SIZE),
  Ju = (l) => Math.round(Be.EXP_CURVE_BASE * Math.pow(l, Be.EXP_CURVE_POW)),
  Jr = (l) => Math.round(Be.SP_PER_LEVEL * Math.max(0, l - 1)),
  px = (l) => Jr(l) - Jr(l - 1),
  ts = (l) => l < Be.LEVEL_CAP,
  yd = (l, i) => 1 + Be.ENEMY_SCALE_K * (l - i),
  Pe = {
    equip_short_sword: {
      id: 'equip_short_sword',
      name: 'ショートソード',
      slot: 'weapon',
      tier: 0,
      buyPrice: 120,
      weaponType: 'sword',
      bonuses: { atk: 8 },
    },
    equip_iron_spear: {
      id: 'equip_iron_spear',
      name: '鉄の槍',
      slot: 'weapon',
      tier: 0,
      buyPrice: 150,
      weaponType: 'spear',
      bonuses: { atk: 8 },
    },
    equip_oak_staff: {
      id: 'equip_oak_staff',
      name: '樫の杖',
      slot: 'weapon',
      tier: 0,
      buyPrice: 150,
      weaponType: 'staff',
      bonuses: { mat: 8 },
    },
    equip_short_bow: {
      id: 'equip_short_bow',
      name: 'ショートボウ',
      slot: 'weapon',
      tier: 0,
      buyPrice: 110,
      weaponType: 'bow',
      bonuses: { atk: 7 },
    },
    equip_iron_knuckle: {
      id: 'equip_iron_knuckle',
      name: '鉄甲',
      slot: 'weapon',
      tier: 0,
      buyPrice: 100,
      weaponType: 'fist',
      bonuses: { atk: 7 },
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
      bonuses: { def: 6, mdf: 4 },
    },
    equip_iron_armor: {
      id: 'equip_iron_armor',
      name: '鉄の鎧',
      slot: 'armor',
      tier: 0,
      buyPrice: 180,
      armorType: 'heavy',
      bonuses: { def: 8, mdf: 3 },
    },
    equip_cloth_robe: {
      id: 'equip_cloth_robe',
      name: '布のローブ',
      slot: 'armor',
      tier: 0,
      buyPrice: 120,
      armorType: 'clothes',
      bonuses: { def: 3, mdf: 8 },
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
      bonuses: { def: 12, mdf: 5 },
    },
    equip_rat_dagger: {
      id: 'equip_rat_dagger',
      name: 'ねずみ牙の短剣',
      slot: 'weapon',
      tier: 1,
      buyPrice: 231,
      weaponType: 'sword',
      bonuses: { atk: 13 },
    },
    equip_bat_cloak: {
      id: 'equip_bat_cloak',
      name: 'コウモリのマント',
      slot: 'armor',
      tier: 1,
      buyPrice: 209,
      armorType: 'light',
      bonuses: { def: 8, mdf: 7 },
    },
    equip_golem_blade: {
      id: 'equip_golem_blade',
      name: 'ゴーレムの大剣',
      slot: 'weapon',
      tier: 1,
      buyPrice: 480,
      weaponType: 'sword',
      bonuses: { atk: 13 },
    },
    equip_t2_sword: {
      id: 'equip_t2_sword',
      name: '鋼の剣',
      slot: 'weapon',
      tier: 2,
      buyPrice: 581,
      weaponType: 'sword',
      bonuses: { atk: 20 },
    },
    equip_t2_spear: {
      id: 'equip_t2_spear',
      name: '鋼の槍',
      slot: 'weapon',
      tier: 2,
      buyPrice: 726,
      weaponType: 'spear',
      bonuses: { atk: 21 },
    },
    equip_t2_axe: {
      id: 'equip_t2_axe',
      name: '鋼の戦斧',
      slot: 'weapon',
      tier: 2,
      buyPrice: 774,
      weaponType: 'axe',
      bonuses: { atk: 22 },
    },
    equip_t2_bow: {
      id: 'equip_t2_bow',
      name: '狩人の弓',
      slot: 'weapon',
      tier: 2,
      buyPrice: 532,
      weaponType: 'bow',
      bonuses: { atk: 19 },
    },
    equip_t2_fist: {
      id: 'equip_t2_fist',
      name: '鋼の籠手',
      slot: 'weapon',
      tier: 2,
      buyPrice: 484,
      weaponType: 'fist',
      bonuses: { atk: 18 },
    },
    equip_t2_staff: {
      id: 'equip_t2_staff',
      name: '銀飾りの杖',
      slot: 'weapon',
      tier: 2,
      buyPrice: 726,
      weaponType: 'staff',
      bonuses: { mat: 21 },
    },
    equip_t2_heavy: {
      id: 'equip_t2_heavy',
      name: '鋼の鎧',
      slot: 'armor',
      tier: 2,
      buyPrice: 871,
      armorType: 'heavy',
      bonuses: { def: 19, mdf: 8 },
    },
    equip_t2_light: {
      id: 'equip_t2_light',
      name: '鎖かたびら',
      slot: 'armor',
      tier: 2,
      buyPrice: 484,
      armorType: 'light',
      bonuses: { def: 13, mdf: 10 },
    },
    equip_t2_clothes: {
      id: 'equip_t2_clothes',
      name: '魔導のローブ',
      slot: 'armor',
      tier: 2,
      buyPrice: 581,
      armorType: 'clothes',
      bonuses: { def: 8, mdf: 18 },
    },
    equip_t2_accessory: {
      id: 'equip_t2_accessory',
      name: '守りの護符',
      slot: 'accessory',
      tier: 2,
      buyPrice: 678,
      bonuses: { def: 5, mdf: 5 },
    },
    equip_t3_sword: {
      id: 'equip_t3_sword',
      name: '銀の剣',
      slot: 'weapon',
      tier: 3,
      buyPrice: 1278,
      weaponType: 'sword',
      bonuses: { atk: 33 },
    },
    equip_t3_spear: {
      id: 'equip_t3_spear',
      name: '銀の槍',
      slot: 'weapon',
      tier: 3,
      buyPrice: 1597,
      weaponType: 'spear',
      bonuses: { atk: 34 },
    },
    equip_t3_axe: {
      id: 'equip_t3_axe',
      name: '銀の大斧',
      slot: 'weapon',
      tier: 3,
      buyPrice: 1704,
      weaponType: 'axe',
      bonuses: { atk: 36 },
    },
    equip_t3_bow: {
      id: 'equip_t3_bow',
      name: '精霊の弓',
      slot: 'weapon',
      tier: 3,
      buyPrice: 1171,
      weaponType: 'bow',
      bonuses: { atk: 31 },
    },
    equip_t3_fist: {
      id: 'equip_t3_fist',
      name: '銀の籠手',
      slot: 'weapon',
      tier: 3,
      buyPrice: 1065,
      weaponType: 'fist',
      bonuses: { atk: 29 },
    },
    equip_t3_staff: {
      id: 'equip_t3_staff',
      name: '賢者の杖',
      slot: 'weapon',
      tier: 3,
      buyPrice: 1597,
      weaponType: 'staff',
      bonuses: { mat: 34 },
    },
    equip_t3_heavy: {
      id: 'equip_t3_heavy',
      name: '銀の鎧',
      slot: 'armor',
      tier: 3,
      buyPrice: 1917,
      armorType: 'heavy',
      bonuses: { def: 30, mdf: 12 },
    },
    equip_t3_light: {
      id: 'equip_t3_light',
      name: '精霊布の服',
      slot: 'armor',
      tier: 3,
      buyPrice: 1065,
      armorType: 'light',
      bonuses: { def: 21, mdf: 17 },
    },
    equip_t3_clothes: {
      id: 'equip_t3_clothes',
      name: '大魔導のローブ',
      slot: 'armor',
      tier: 3,
      buyPrice: 1278,
      armorType: 'clothes',
      bonuses: { def: 12, mdf: 29 },
    },
    equip_t3_accessory: {
      id: 'equip_t3_accessory',
      name: '精霊の指輪',
      slot: 'accessory',
      tier: 3,
      buyPrice: 1491,
      bonuses: { def: 8, mdf: 8 },
    },
    equip_t4_sword: {
      id: 'equip_t4_sword',
      name: 'ミスリルソード',
      slot: 'weapon',
      tier: 4,
      buyPrice: 2811,
      weaponType: 'sword',
      bonuses: { atk: 53 },
    },
    equip_t4_spear: {
      id: 'equip_t4_spear',
      name: 'ミスリルランス',
      slot: 'weapon',
      tier: 4,
      buyPrice: 3514,
      weaponType: 'spear',
      bonuses: { atk: 55 },
    },
    equip_t4_axe: {
      id: 'equip_t4_axe',
      name: 'ミスリルアックス',
      slot: 'weapon',
      tier: 4,
      buyPrice: 3748,
      weaponType: 'axe',
      bonuses: { atk: 58 },
    },
    equip_t4_bow: {
      id: 'equip_t4_bow',
      name: '月光の弓',
      slot: 'weapon',
      tier: 4,
      buyPrice: 2577,
      weaponType: 'bow',
      bonuses: { atk: 50 },
    },
    equip_t4_fist: {
      id: 'equip_t4_fist',
      name: 'ミスリルの籠手',
      slot: 'weapon',
      tier: 4,
      buyPrice: 2343,
      weaponType: 'fist',
      bonuses: { atk: 47 },
    },
    equip_t4_staff: {
      id: 'equip_t4_staff',
      name: '星見の杖',
      slot: 'weapon',
      tier: 4,
      buyPrice: 3514,
      weaponType: 'staff',
      bonuses: { mat: 55 },
    },
    equip_t4_heavy: {
      id: 'equip_t4_heavy',
      name: 'ミスリルメイル',
      slot: 'armor',
      tier: 4,
      buyPrice: 4217,
      armorType: 'heavy',
      bonuses: { def: 46, mdf: 18 },
    },
    equip_t4_light: {
      id: 'equip_t4_light',
      name: '月光の装束',
      slot: 'armor',
      tier: 4,
      buyPrice: 2343,
      armorType: 'light',
      bonuses: { def: 32, mdf: 25 },
    },
    equip_t4_clothes: {
      id: 'equip_t4_clothes',
      name: '賢者のローブ',
      slot: 'armor',
      tier: 4,
      buyPrice: 2811,
      armorType: 'clothes',
      bonuses: { def: 18, mdf: 44 },
    },
    equip_t4_accessory: {
      id: 'equip_t4_accessory',
      name: '星詠みの護符',
      slot: 'accessory',
      tier: 4,
      buyPrice: 3280,
      bonuses: { def: 12, mdf: 12 },
    },
    equip_t5_sword: {
      id: 'equip_t5_sword',
      name: '竜鱗の剣',
      slot: 'weapon',
      tier: 5,
      buyPrice: 6184,
      weaponType: 'sword',
      bonuses: { atk: 86 },
    },
    equip_t5_spear: {
      id: 'equip_t5_spear',
      name: '竜牙の槍',
      slot: 'weapon',
      tier: 5,
      buyPrice: 7730,
      weaponType: 'spear',
      bonuses: { atk: 89 },
    },
    equip_t5_axe: {
      id: 'equip_t5_axe',
      name: '竜骨の大斧',
      slot: 'weapon',
      tier: 5,
      buyPrice: 8246,
      weaponType: 'axe',
      bonuses: { atk: 93 },
    },
    equip_t5_bow: {
      id: 'equip_t5_bow',
      name: '竜骨の弓',
      slot: 'weapon',
      tier: 5,
      buyPrice: 5669,
      weaponType: 'bow',
      bonuses: { atk: 80 },
    },
    equip_t5_fist: {
      id: 'equip_t5_fist',
      name: '竜鱗の籠手',
      slot: 'weapon',
      tier: 5,
      buyPrice: 5154,
      weaponType: 'fist',
      bonuses: { atk: 76 },
    },
    equip_t5_staff: {
      id: 'equip_t5_staff',
      name: '竜詠みの杖',
      slot: 'weapon',
      tier: 5,
      buyPrice: 7730,
      weaponType: 'staff',
      bonuses: { mat: 89 },
    },
    equip_t5_heavy: {
      id: 'equip_t5_heavy',
      name: '竜鱗の鎧',
      slot: 'armor',
      tier: 5,
      buyPrice: 9277,
      armorType: 'heavy',
      bonuses: { def: 72, mdf: 29 },
    },
    equip_t5_light: {
      id: 'equip_t5_light',
      name: '竜革の装束',
      slot: 'armor',
      tier: 5,
      buyPrice: 5154,
      armorType: 'light',
      bonuses: { def: 50, mdf: 40 },
    },
    equip_t5_clothes: {
      id: 'equip_t5_clothes',
      name: '竜詠みのローブ',
      slot: 'armor',
      tier: 5,
      buyPrice: 6184,
      armorType: 'clothes',
      bonuses: { def: 29, mdf: 68 },
    },
    equip_t5_accessory: {
      id: 'equip_t5_accessory',
      name: '竜の紋章',
      slot: 'accessory',
      tier: 5,
      buyPrice: 7215,
      bonuses: { def: 18, mdf: 18 },
    },
  },
  Jn = {
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
  hx = ['hp', 'tp', 'str', 'vit', 'agi', 'int', 'mnd', 'luc'],
  gx = ['slash', 'pierce', 'bash'],
  Pr = (l, i, r) => Math.max(i, Math.min(r, l));
function tg(l, i) {
  const r = {};
  for (const o of hx) r[o] = Math.round(l[o] * i);
  return r;
}
function kx(l, i) {
  return tg(l.baseStats, yd(i, l.refDepth));
}
function Rn(l, i) {
  const r = new Map();
  for (const u of l) {
    if (u.stat !== i) continue;
    const m = Pr(u.modifier, 0.5, 1.5),
      f = r.get(u.stackGroup);
    (f === void 0 || Math.abs(m - 1) > Math.abs(f - 1)) && r.set(u.stackGroup, m);
  }
  let o = 1;
  for (const u of r.values()) o *= u;
  return Pr(o, 0.25, 2);
}
function Pu(l, i, r, o) {
  const u = (g) => (o == null ? void 0 : o[g]) ?? 1,
    m = (l.str * 2 + (i.atk ?? 0)) * Rn(r, 'patk') * u('patk'),
    f = (l.vit * 2 + (i.def ?? 0)) * Rn(r, 'pdef') * u('pdef'),
    h = (l.int * 2 + (i.mat ?? 0)) * Rn(r, 'matk') * u('matk'),
    p = (l.mnd * 2 + (i.mdf ?? 0)) * Rn(r, 'mdef') * u('mdef');
  return {
    patk: m,
    pdef: f,
    matk: h,
    mdef: p,
    hit: l.agi,
    acc: l.agi * Rn(r, 'acc') * u('acc'),
    eva: l.agi * Rn(r, 'eva') * u('eva'),
    crit: l.luc,
  };
}
const vx = (l) => l.ailments.some((i) => i.type === 'blind'),
  yx = (l) => l.ailments.some((i) => i.type === 'legBind');
function bx(l, i, r, o) {
  var x;
  const u = r.statBase === 'str',
    m = Pu(l.stats, l.equip, l.buffs, l.passive),
    f = Pu(i.stats, i.equip, i.buffs, i.passive),
    h = u ? m.patk : m.matk,
    p = u ? f.pdef : f.mdef;
  let g = !0;
  if (u) {
    const q = vx(l) ? Be.BLIND_ACC_PENALTY : 0,
      Z = yx(i) ? 0 : f.eva,
      ee = Pr(Be.BASE_HIT + (m.acc - Z) * Be.HIT_AGI_K - q, Be.HIT_MIN, 1);
    g = o.next() < ee;
  }
  if (!g) return { damage: 0, hit: !1, critical: !1 };
  const k = (h * r.power * Be.DAMAGE_DEF_K) / (Be.DAMAGE_DEF_K + Math.max(0, p)),
    L = u && gx.includes(r.element),
    N = L && l.row === 'back' ? Be.BACK_ROW_MELEE_MULT : 1,
    M = L && i.row === 'back' ? Be.BACK_ROW_MELEE_MULT : 1,
    G = N * M,
    [B, j] = Be.DMG_VARIANCE,
    A = B + o.next() * (j - B);
  let V = k * r.elementMultiplier * G * A;
  const U = Pr(
      Be.CRIT_BASE +
        (l.stats.luc - i.stats.luc) * Be.CRIT_LUC_K +
        (((x = l.passive) == null ? void 0 : x.crit) ?? 0),
      Be.CRIT_MIN,
      Be.CRIT_MAX
    ),
    oe = o.next() < U;
  return (
    oe && (V *= Be.CRIT_MULT),
    { damage: r.elementMultiplier === 0 ? 0 : Math.max(1, Math.floor(V)), hit: !0, critical: oe }
  );
}
const lg = () => Math.max(0, ...Object.values(Tt).map((l) => l.tierBand)),
  ag = (l) => Math.floor((l - 1) / Be.BAND_SIZE);
function ng(l) {
  return ag(l) % (lg() + 1);
}
function ig(l) {
  return Math.floor(ag(l) / (lg() + 1)) + 1;
}
function xx(l) {
  const i = ng(l);
  return Object.values(Tt)
    .filter((r) => r.tierBand === i && !r.isBoss && r.kind !== 'foe')
    .map((r) => r.id);
}
function Sx(l, i) {
  const r = xx(l);
  if (r.length === 0) return [];
  const o = i.range(1, 3);
  return Array.from({ length: o }, () => i.pick(r));
}
function wx(l) {
  return Math.round(Yl.STAT_PER_LEVEL * Math.pow(Yl.TIER_STEP, l));
}
function sg(l) {
  const i = Pe[l];
  return i ? Math.max(2, Math.floor(i.buyPrice / 120)) : 2;
}
function Tx(l, i) {
  const r = Pe[l];
  if (!r || i <= 0) return {};
  const o = wx(r.tier ?? 0),
    u = i * o;
  return r.slot === 'weapon' ? { atk: u, mat: u } : r.slot === 'armor' ? { def: u, mdf: u } : {};
}
function Xn(l) {
  return 1 + 0.5 * (Math.max(1, l ?? 1) - 1);
}
function bd(l, i) {
  const r = Pe[l];
  if (!r) return {};
  const o = Xn(i),
    u = {};
  return (
    r.bonuses.atk && (u.atk = Math.round(r.bonuses.atk * o)),
    r.bonuses.mat && (u.mat = Math.round(r.bonuses.mat * o)),
    r.bonuses.def && (u.def = Math.round(r.bonuses.def * o)),
    r.bonuses.mdf && (u.mdf = Math.round(r.bonuses.mdf * o)),
    r.bonuses.statMods && (u.statMods = r.bonuses.statMods),
    u
  );
}
const rg = ['weapon', 'armor', 'accessory'];
function Nx(l, i, r) {
  const o = l.guild.equipment.map((m) => (m.id === i ? r(m) : m)),
    u = l.guild.members.map((m) => {
      let f = !1;
      const h = { ...m.equipment };
      for (const p of rg) {
        const g = h[p];
        g && g.id === i && ((h[p] = r(g)), (f = !0));
      }
      return f ? { ...m, equipment: h } : m;
    });
  return { ...l, guild: { ...l.guild, equipment: o, members: u } };
}
function jx(l, i, r) {
  let o = l.guild.equipment.find((f) => f.id === i);
  if (!o)
    for (const f of l.guild.members)
      for (const h of rg) {
        const p = f.equipment[h];
        (p == null ? void 0 : p.id) === i && (o = p);
      }
  if (!o) return { ok: !1, save: l, reason: 'notFound' };
  if (o.forgeLevel >= Yl.MAX_LEVEL) return { ok: !1, save: l, reason: 'maxLevel' };
  if ((l.forgeInventory.ingots[r] ?? 0) <= 0) return { ok: !1, save: l, reason: 'noIngot' };
  const u = Math.min(Yl.MAX_LEVEL, o.forgeLevel + Yl.INGOT_INC[r]);
  let m = {
    ...l,
    forgeInventory: {
      ...l.forgeInventory,
      ingots: { ...l.forgeInventory.ingots, [r]: l.forgeInventory.ingots[r] - 1 },
    },
  };
  return ((m = Nx(m, i, (f) => ({ ...f, forgeLevel: u }))), { ok: !0, save: m });
}
function Ex(l, i) {
  const r = l.guild.equipment.find((f) => f.id === i);
  if (!r) return { ok: !1, save: l, reason: 'notFound' };
  const o = l.guild.equipment.filter((f) => f.id !== i),
    u = { ...l.forgeInventory.fragments };
  u.common = (u.common ?? 0) + sg(r.masterId);
  let m = l.forgeInventory.ingots.copper;
  for (; u.common >= Yl.FRAGMENTS_PER_INGOT; ) ((u.common -= Yl.FRAGMENTS_PER_INGOT), (m += 1));
  return {
    ok: !0,
    save: {
      ...l,
      guild: { ...l.guild, equipment: o },
      forgeInventory: {
        ...l.forgeInventory,
        fragments: u,
        ingots: { ...l.forgeInventory.ingots, copper: m },
      },
    },
  };
}
function xa(l) {
  var o;
  const i = ((o = Pe[l.masterId]) == null ? void 0 : o.name) ?? l.masterId,
    r = l.grade && l.grade > 1 ? `${i} Lv${l.grade}` : i;
  return l.forgeLevel > 0 ? `${r} +${l.forgeLevel}` : r;
}
const og = (l) => l.grade ?? 1;
function xd(l, i, r) {
  return l.guild.storage
    .filter((o) => o.itemId === i && r === void 0)
    .reduce((o, u) => o + u.qty, 0);
}
function Sd(l, i, r = 1, o = 1) {
  if (r <= 0) return l;
  const u = [...l.guild.storage],
    m = u.findIndex((f) => f.itemId === i && og(f) === o);
  return (
    m >= 0
      ? (u[m] = { ...u[m], qty: u[m].qty + r })
      : u.push(o > 1 ? { itemId: i, qty: r, grade: o } : { itemId: i, qty: r }),
    { ...l, guild: { ...l.guild, storage: u } }
  );
}
function wd(l, i, r = 1, o = 1) {
  if (r <= 0) return l;
  const u = l.guild.storage.findIndex((h) => h.itemId === i && og(h) === o);
  if (u < 0 || l.guild.storage[u].qty < r) return l;
  const m = [...l.guild.storage],
    f = m[u].qty - r;
  return (
    f <= 0 ? m.splice(u, 1) : (m[u] = { ...m[u], qty: f }),
    { ...l, guild: { ...l.guild, storage: m } }
  );
}
const cg = 60,
  so = (l) => l.guild.foodStorage ?? [];
function ug(l) {
  return so(l).reduce((i, r) => i + r.qty, 0);
}
function Td(l, i) {
  var r;
  return ((r = so(l).find((o) => o.itemId === i)) == null ? void 0 : r.qty) ?? 0;
}
function dg(l, i, r = 1) {
  if (r <= 0) return l;
  const o = cg - ug(l),
    u = Math.min(r, Math.max(0, o));
  if (u <= 0) return l;
  const m = [...so(l)],
    f = m.findIndex((h) => h.itemId === i);
  return (
    f >= 0 ? (m[f] = { ...m[f], qty: m[f].qty + u }) : m.push({ itemId: i, qty: u }),
    { ...l, guild: { ...l.guild, foodStorage: m } }
  );
}
function mg(l, i, r = 1) {
  if (r <= 0) return l;
  const o = [...so(l)],
    u = o.findIndex((f) => f.itemId === i);
  if (u < 0 || o[u].qty < r) return l;
  const m = o[u].qty - r;
  return (
    m <= 0 ? o.splice(u, 1) : (o[u] = { ...o[u], qty: m }),
    { ...l, guild: { ...l.guild, foodStorage: o } }
  );
}
function _g(l, i, r) {
  return {
    ...l,
    guild: { ...l.guild, members: l.guild.members.map((o) => (o.id === i ? r(o) : o)) },
  };
}
function Cx() {
  return `eq_${Date.now().toString(36)}_${Math.floor(Math.random() * 16777215).toString(36)}`;
}
function Ax(l, i, r = 0, o = 1) {
  if (!Pe[i]) return l;
  const u = { id: Cx(), masterId: i, forgeLevel: r };
  return (
    o > 1 && (u.grade = o),
    { ...l, guild: { ...l.guild, equipment: [...l.guild.equipment, u] } }
  );
}
function Nd(l, i) {
  const r = Pe[i];
  if (!r) return !1;
  const o = ze[l.classId];
  return o
    ? r.slot === 'weapon'
      ? !!r.weaponType && o.equipableWeaponTypes.includes(r.weaponType)
      : r.slot === 'armor'
        ? !!r.armorType && o.equipableArmorTypes.includes(r.armorType)
        : !0
    : !1;
}
function Lx(l, i, r) {
  const o = l.guild.equipment.find((g) => g.id === r),
    u = l.guild.members.find((g) => g.id === i);
  if (!o || !u || !Nd(u, o.masterId)) return l;
  const m = Pe[o.masterId];
  let f = l.guild.equipment.filter((g) => g.id !== r);
  const h = u.equipment[m.slot];
  h && (f = [...f, h]);
  const p = { ...l, guild: { ...l.guild, equipment: f } };
  return _g(p, i, (g) => ({ ...g, equipment: { ...g.equipment, [m.slot]: o } }));
}
function jd(l, i, r) {
  const o = l.guild.members.find((f) => f.id === i);
  if (!o) return l;
  const u = o.equipment[r];
  if (!u) return l;
  const m = { ...l, guild: { ...l.guild, equipment: [...l.guild.equipment, u] } };
  return _g(m, i, (f) => ({ ...f, equipment: { ...f.equipment, [r]: null } }));
}
const Fu = {
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
  qx = ['patk', 'matk', 'pdef', 'mdef', 'acc', 'eva', 'maxHp', 'maxTp'];
function Bx(l) {
  var r;
  const i = l.equipment.weapon;
  if (i) return (r = Pe[i.masterId]) == null ? void 0 : r.weaponType;
}
function Ix(l) {
  const i = Bx(l),
    r = {};
  let o = 0;
  for (const [u, m] of Object.entries(l.learnedSkills)) {
    if (m <= 0) continue;
    const f = Fu[u];
    if (!f || (f.weaponType && f.weaponType !== i)) continue;
    const h = f.mods(m);
    for (const p of qx) h[p] !== void 0 && (r[p] = (r[p] ?? 1) * h[p]);
    h.crit !== void 0 && (o += h.crit);
  }
  return (o !== 0 && (r.crit = o), r);
}
const ht = (l) => ({ hp: 0, tp: 0, str: 0, vit: 0, agi: 0, int: 0, mnd: 0, luc: 0, ...l }),
  Gl = {
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
      growthModifier: ht({ str: 1 }),
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
      growthModifier: ht({ vit: 1 }),
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
      growthModifier: ht({ vit: 1, hp: 2 }),
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
      growthModifier: ht({ str: 1 }),
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
      growthModifier: ht({ int: 1 }),
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
      growthModifier: ht({ tp: 2, mnd: 1 }),
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
      growthModifier: ht({ agi: 1, luc: 1 }),
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
      growthModifier: ht({ agi: 1 }),
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
      growthModifier: ht({ mnd: 1, tp: 2 }),
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
      growthModifier: ht({ luc: 1, tp: 1 }),
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
      growthModifier: ht({ agi: 1, str: 1 }),
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
      growthModifier: ht({ mnd: 1, tp: 1 }),
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
      growthModifier: ht({ str: 1, agi: 1 }),
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
      growthModifier: ht({ vit: 1, tp: 1 }),
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
      growthModifier: ht({ int: 1 }),
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
      growthModifier: ht({ int: 1, luc: 1 }),
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
      growthModifier: ht({ int: 1, tp: 1 }),
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
      growthModifier: ht({ mnd: 1, vit: 1 }),
    },
  },
  ih = [1, 2, 2, 2, 2];
function fg(l) {
  return ih[Math.min(Math.max(0, l), ih.length - 1)];
}
function Ed(l) {
  var r, o;
  const i = [
    ...(((r = ze[l.classId]) == null ? void 0 : r.skillTree.skills) ?? []),
    ...(((o = Ke[l.raceId]) == null ? void 0 : o.raceSkillTree.skills) ?? []),
  ];
  return (l.titleId && Gl[l.titleId] && i.push(...Gl[l.titleId].skillTree.skills), i);
}
function Mx(l, i) {
  const r = new Map(l.map((m) => [m.skillId, m])),
    o = new Map(),
    u = (m, f = 0) => {
      var y;
      const h = o.get(m);
      if (h !== void 0) return h;
      const p = r.get(m);
      if (!p || !((y = p.requires) != null && y.length) || f > 30) return (o.set(m, 0), 0);
      const g =
        1 + Math.max(...p.requires.map((k) => (r.has(k.skillId) ? u(k.skillId, f + 1) : 0)));
      return (o.set(m, g), g);
    };
  return u(i);
}
function Pn(l, i) {
  return fg(Mx(Ed(l), i));
}
function Gn(l, i) {
  return l.learnedSkills[i] ?? 0;
}
function ns(l) {
  return l.skillPoints.total - l.skillPoints.spent;
}
function pg(l, i) {
  return (i.requires ?? []).every((r) => Gn(l, r.skillId) >= r.level);
}
function hg(l, i) {
  const r = Ed(l).find((o) => o.skillId === i);
  return !r || Gn(l, i) >= r.maxLevel || ns(l) < Pn(l, i) ? !1 : pg(l, r);
}
function gg(l, i) {
  return hg(l, i)
    ? {
        ...l,
        learnedSkills: { ...l.learnedSkills, [i]: Gn(l, i) + 1 },
        skillPoints: { ...l.skillPoints, spent: l.skillPoints.spent + Pn(l, i) },
      }
    : l;
}
function Ox(l) {
  var u, m;
  const i = Ed(l),
    r =
      (m = (u = ze[l.classId]) == null ? void 0 : u.skillTree.skills[0]) == null
        ? void 0
        : m.skillId;
  let o = 0;
  for (const f of i) {
    const h = Pn(l, f.skillId);
    let p = f.maxLevel;
    (f.skillId === r && (p = Math.max(0, p - 1)), (o += h * p));
  }
  return o;
}
function Rx(l) {
  return Math.max(0, l.skillPoints.total - Ox(l));
}
const Dx = ['hp', 'tp', 'str', 'vit', 'agi', 'int', 'mnd', 'luc'];
function Xl(l) {
  var p, g;
  const i = Ke[l.raceId];
  if (!i) throw new Error(`computeBaseStats: 未定義の種族 "${l.raceId}"`);
  const o = Math.max(1, Math.min(l.level, Be.LEVEL_CAP)) - 1,
    u = l.titleId ? ((p = Gl[l.titleId]) == null ? void 0 : p.growthModifier) : void 0,
    m = ((g = l.rebirthBonus) == null ? void 0 : g.allStats) ?? 0,
    f = Math.floor(Rx(l) / Be.SURPLUS_SP_PER_STAT),
    h = {};
  for (const y of Dx) {
    const k = i.statGrowth[y] + ((u == null ? void 0 : u[y]) ?? 0);
    h[y] = i.baseStatsAtLv1[y] + k * o + m + f;
  }
  return h;
}
const zx = 3,
  Vl = (l, i, r) => Math.max(i, Math.min(r, l)),
  Hx = {
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
function Ux(l) {
  const i = { atk: 0, mat: 0, def: 0, mdf: 0 };
  for (const r of Object.values(l.equipment)) {
    if (!r || !Pe[r.masterId]) continue;
    const u = bd(r.masterId, r.grade),
      m = Tx(r.masterId, r.forgeLevel);
    ((i.atk += (u.atk ?? 0) + (m.atk ?? 0)),
      (i.mat += (u.mat ?? 0) + (m.mat ?? 0)),
      (i.def += (u.def ?? 0) + (m.def ?? 0)),
      (i.mdf += (u.mdf ?? 0) + (m.mdf ?? 0)));
  }
  return i;
}
function $x(l, i) {
  var y;
  const r = l.guild.members.find((k) => k.id === i);
  if (!r) return null;
  const o = (y = l.diveState) == null ? void 0 : y.party.find((k) => k.charId === i),
    u = Xl(r),
    m = Ix(r),
    f = Math.round(u.hp * (m.maxHp ?? 1)),
    h = Math.round(u.tp * (m.maxTp ?? 1)),
    p = l.guild.party.front.includes(i),
    g = Ke[r.raceId];
  return {
    id: i,
    name: r.name,
    side: 'ally',
    row: p ? 'front' : 'back',
    stats: u,
    equip: Ux(r),
    hp: o ? Math.min(o.hp, f) : f,
    maxHp: f,
    tp: o ? Math.min(o.tp, h) : h,
    maxTp: h,
    buffs: [],
    ailments: o ? [...o.ailments] : [],
    states: [],
    passive: m,
    unionGauge: (o == null ? void 0 : o.unionGauge) ?? 0,
    isDown: o ? o.hp <= 0 : !1,
    resist: g == null ? void 0 : g.elementResist,
    ailmentResist: g == null ? void 0 : g.ailmentResist,
    skillLevels: r.learnedSkills,
  };
}
function Gx(l, i, r) {
  const o = Tt[l],
    u = kx(o, r),
    m = ig(r);
  return {
    id: `enemy_${i}`,
    name: m >= 2 ? `${o.name} Lv${m}` : o.name,
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
    resist: o.resist,
    ailmentResist: vd(l),
  };
}
function kg(l, i, r, o, u) {
  const m = Jn[l],
    f = tg(m.baseStats, yd(i, m.refDepth)),
    h = u ?? f.hp;
  return {
    id: o,
    name: m.name,
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
    ownerId: r,
  };
}
function sh(l, i, r = 'none') {
  var p, g;
  const o = ((p = l.diveState) == null ? void 0 : p.depth) ?? 1,
    m = [...l.guild.party.front, ...l.guild.party.back]
      .filter((y) => y !== null)
      .map((y) => $x(l, y))
      .filter((y) => y !== null),
    f = i.map((y, k) => Gx(y, k, o)),
    h = (((g = l.diveState) == null ? void 0 : g.persistentSummons) ?? [])
      .map((y, k) => kg(y.summonKind, o, y.ownerId, `summon_persist_${k}`, y.hp))
      .filter((y) => !y.isDown);
  return {
    turn: 1,
    depth: o,
    allies: m,
    enemies: f,
    summons: h,
    log: [],
    outcome: 'ongoing',
    firstStrike: r,
    drops: [],
    consumedItems: [],
  };
}
const gt = (l, i) => (i === 'ally' ? l.allies : l.enemies).filter((r) => !r.isDown),
  ro = (l) => l.summons.filter((i) => !i.isDown);
function $l(l, i) {
  return (
    l.allies.find((r) => r.id === i) ??
    l.enemies.find((r) => r.id === i) ??
    l.summons.find((r) => r.id === i)
  );
}
const Cd = (l) => {
    var i;
    return (
      !!l.isSummon && !!l.summonKind && ((i = Jn[l.summonKind]) == null ? void 0 : i.buffImmune)
    );
  },
  Yx = (l, i) => {
    var r;
    return ((r = l.resist) == null ? void 0 : r[i]) ?? 1;
  };
function vg(l, i, r) {
  ((l.hp = Vl(l.hp - i, 0, l.maxHp)),
    i > 0 &&
      l.ailments.some((o) => o.type === 'sleep') &&
      ((l.ailments = l.ailments.filter((o) => o.type !== 'sleep')),
      r.push({ text: `${l.name} は目を覚ました` })),
    l.hp === 0 &&
      !l.isDown &&
      ((l.isDown = !0),
      (l.unionGauge = Math.floor(l.unionGauge / 2)),
      r.push({ text: `${l.name} は倒れた！` })));
}
function Wu(l, i) {
  l.isDown || (l.unionGauge = Vl(l.unionGauge + i, 0, 100));
}
function ed(l, i) {
  Cd(l) ||
    ((l.buffs = l.buffs.filter((r) => !(r.stat === i.stat && r.stackGroup === i.stackGroup))),
    l.buffs.push(i));
}
function Xx(l, i) {
  if (Cd(l)) return;
  const r = l.ailments.find((o) => o.type === i.type);
  if (r) {
    r.remainingTurns = Math.max(r.remainingTurns, i.remainingTurns);
    return;
  }
  l.ailments.push(i);
}
function Dr(l, i) {
  Cd(l) || (l.states = [...(l.states ?? []).filter((r) => r.kind !== i.kind), i]);
}
function Vx(l, i) {
  return i.side === 'ally' ? [...gt(l, 'ally'), ...ro(l)] : gt(l, 'enemy');
}
function Qx(l, i, r) {
  const o = (l.states ?? []).find((m) => m.kind === 'barrier' && m.absorb > 0);
  if (!o || o.kind !== 'barrier') return i;
  const u = Math.min(o.absorb, i);
  return (
    (o.absorb -= u),
    u > 0 && r.push({ text: `${l.name} は障壁で ${u} のダメージを防いだ` }),
    o.absorb <= 0 && (l.states = (l.states ?? []).filter((m) => m !== o)),
    i - u
  );
}
function Fr(l, i, r, o, u, m = {}) {
  if (r.isDown) return { hit: !1, dealt: 0 };
  const f = bx(
    i,
    r,
    {
      statBase: o.statBase,
      power: o.power,
      element: o.element,
      elementMultiplier: Yx(r, o.element),
    },
    u
  );
  if (!f.hit) return (l.log.push({ text: `${i.name} の攻撃は外れた` }), { hit: !1, dealt: 0 });
  const h = Qx(r, f.damage, l.log);
  return (
    vg(r, h, l.log),
    m.actorUnion && Wu(i, m.actorUnion),
    Wu(r, 5),
    h > 0 &&
      l.log.push({
        text: `${i.name} の攻撃！ ${r.name} に ${h} ダメージ${f.critical ? '（会心）' : ''}`,
      }),
    { hit: !0, dealt: h }
  );
}
function yg(l, i, r, o, u, m) {
  if (!r.isDown && !i.isDown && r.side !== i.side)
    for (const f of r.states ?? []) {
      if (f.kind !== 'counter' || m.next() >= f.chance) continue;
      l.log.push({ text: `${r.name} の反撃！` });
      const h = f.statBase === 'str' ? 'bash' : 'almighty';
      if ((Fr(l, r, i, { statBase: f.statBase, power: f.power, element: h }, m), i.isDown)) break;
    }
  if (u > 0 && r.side !== i.side) {
    for (const f of Vx(l, i))
      if (!(f.id === i.id || f.isDown || r.isDown))
        for (const h of f.states ?? [])
          h.kind === 'chase' &&
            ((h.element !== o && h.element !== 'almighty' && o !== 'almighty') ||
              (l.log.push({ text: `${f.name} の連携追撃！` }),
              Fr(l, f, r, { statBase: h.statBase, power: h.power, element: h.element }, m)));
  }
}
function Kx(l, i, r, o) {
  var f;
  const u = o !== void 0 ? (((f = r.ailmentResist) == null ? void 0 : f[o]) ?? 1) : 1;
  if (u === 0) return 0;
  const m = l * (1 + (i.stats.luc - r.stats.luc) * Be.AILMENT_LUC_K);
  return Vl(m * u, 0, Be.AILMENT_MAX);
}
function Ad(l, i, r, o) {
  const u = i.side === 'ally' ? 'enemy' : 'ally';
  switch (r) {
    case 'self':
      return [i];
    case 'allyAll':
      return i.side === 'ally' ? [...gt(l, 'ally'), ...ro(l)] : gt(l, 'enemy');
    case 'allyOne': {
      const m = $l(l, o);
      return m && m.side === i.side ? [m] : [i];
    }
    case 'enemyAll':
      return gt(l, u);
    case 'enemyRow':
    case 'enemyOne':
    default: {
      const m = $l(l, o);
      return m && m.side === u && !m.isDown ? [m] : gt(l, u).slice(0, 1);
    }
  }
}
function Zx(l, i, r, o) {
  return Ad(l, i, r.target, o);
}
function td(l, i, r, o, u, m, f) {
  switch (r.kind) {
    case 'damage': {
      const h = r.hits ?? 1,
        p = r.power(u);
      for (const g of m) {
        if (g.isDown) continue;
        let y = !1,
          k = 0;
        for (let L = 0; L < h && !g.isDown; L++) {
          const N = Fr(l, i, g, { statBase: r.statBase, power: p, element: o }, f);
          N.hit && ((y = !0), (k += N.dealt));
        }
        y && yg(l, i, g, o, k, f);
      }
      break;
    }
    case 'heal': {
      const h = r.amount(u),
        p =
          r.matkCoef === 'one'
            ? Be.HEAL_MATK_COEF_ONE
            : r.matkCoef === 'minor'
              ? Be.HEAL_MATK_COEF_MINOR
              : Be.HEAL_MATK_COEF_ALL,
        g = Pu(i.stats, i.equip, i.buffs, i.passive).matk,
        y = Math.round(h + g * p);
      for (const k of m) k.isDown || (k.hp = Vl(k.hp + y, 0, k.maxHp));
      l.log.push({ text: `${i.name} は回復魔法を使った（+${y}）` });
      break;
    }
    case 'buff': {
      for (const h of m)
        ed(h, {
          stat: r.stat,
          modifier: r.modifier(u),
          remainingTurns: r.turns,
          stackGroup: r.stackGroup,
        });
      l.log.push({ text: `${i.name} は態勢を整えた` });
      break;
    }
    case 'ailment': {
      for (const h of m) {
        if (h.isDown) continue;
        const p = Kx(r.chance(u), i, h, r.ailment);
        f.next() < p &&
          (Xx(h, { type: r.ailment, remainingTurns: r.turns, magnitude: r.magnitude }),
          l.log.push({ text: `${h.name} は${Hx[r.ailment]}になった` }));
      }
      break;
    }
    case 'summon': {
      if (i.side !== 'ally') break;
      if (ro(l).length >= zx) {
        l.log.push({ text: 'これ以上は召喚できない' });
        break;
      }
      const h = `summon_${l.turn}_${l.summons.length}`,
        p = kg(r.summonKind, l.depth, i.id, h);
      (l.summons.push(p), l.log.push({ text: `${i.name} は ${p.name} を召喚した！` }));
      break;
    }
    case 'counter': {
      for (const h of m)
        h.isDown ||
          Dr(h, {
            kind: 'counter',
            chance: r.chance(u),
            power: r.power(u),
            statBase: r.statBase,
            remainingTurns: r.turns,
          });
      l.log.push({ text: `${i.name} は反撃の構えを取った` });
      break;
    }
    case 'chase': {
      for (const h of m)
        h.isDown ||
          Dr(h, {
            kind: 'chase',
            element: o,
            power: r.power(u),
            statBase: r.statBase,
            remainingTurns: r.turns,
          });
      l.log.push({ text: `${i.name} は連携の構えを取った` });
      break;
    }
    case 'decoy': {
      for (const h of m)
        h.isDown || Dr(h, { kind: 'decoy', weight: r.weight(u), remainingTurns: r.turns });
      l.log.push({ text: `${i.name} は敵の注意を引きつけた` });
      break;
    }
    case 'barrier': {
      for (const h of m)
        h.isDown || Dr(h, { kind: 'barrier', absorb: r.absorb(u), remainingTurns: r.turns });
      l.log.push({ text: `${i.name} は守りの障壁を張った` });
      break;
    }
    case 'cleanse': {
      for (const h of m)
        h.isDown ||
          h.ailments.length === 0 ||
          ((h.ailments = []), l.log.push({ text: `${h.name} の状態異常が治療された` }));
      break;
    }
  }
}
function Mu(l, i, r, o) {
  var f;
  if (r.isDown) return;
  const u = i.enemyId
      ? (Tt[i.enemyId].attackElement ?? 'bash')
      : i.isSummon && i.summonKind
        ? (((f = Jn[i.summonKind]) == null ? void 0 : f.attackElement) ?? 'bash')
        : 'bash',
    m = Fr(l, i, r, { statBase: 'str', power: 1, element: u }, o, { actorUnion: 5 });
  m.hit && yg(l, i, r, u, m.dealt, o);
}
const rh = (l) => (l.length === 0 ? 0 : l.reduce((i, r) => i + r.stats.agi, 0) / l.length);
function Jx(l, i) {
  const r = l.map(
      (m) => 1 + (m.states ?? []).reduce((f, h) => f + (h.kind === 'decoy' ? h.weight : 0), 0)
    ),
    o = r.reduce((m, f) => m + f, 0);
  let u = i.next() * o;
  for (let m = 0; m < l.length; m++) if (((u -= r[m]), u < 0)) return l[m];
  return l[l.length - 1];
}
const Px = (l) => l.ailments.some((i) => i.type === 'paralysis'),
  Fx = (l) => l.ailments.some((i) => i.type === 'sleep'),
  Ld = (l, i) => l.ailments.some((r) => r.type === i),
  Ou = (l) => Ld(l, 'armBind'),
  oh = (l) => Ld(l, 'headBind'),
  Wx = (l) => Ld(l, 'legBind');
function ch(l) {
  return l.effects.some((i) => i.kind === 'damage' && i.statBase === 'str');
}
function e2(l, i, r) {
  var y;
  const o = Un[i.unionSkillId];
  if (!o) return;
  const u = $l(l, i.actorId);
  if (!u || u.isDown || u.side !== 'ally') return;
  if (u.unionGauge < 100) {
    l.log.push({ text: `${u.name} はユニオンゲージが足りない` });
    return;
  }
  const m = new Set(i.participantIds);
  m.add(u.id);
  const f = [...m].map((k) => $l(l, k)).filter((k) => !!k && !k.isDown && k.side === 'ally');
  if (f.length < o.requiredParticipants) {
    l.log.push({ text: `${u.name} の${o.name}は参加人数が足りない` });
    return;
  }
  const h = [u, ...f.filter((k) => k.id !== u.id)].slice(0, o.requiredParticipants);
  for (const k of h) k.unionGauge = Vl(k.unionGauge - o.gaugeCostPerParticipant, 0, 100);
  l.log.push({ text: `ユニオン！ ${u.name} の${o.name}！` });
  const p = ((y = u.skillLevels) == null ? void 0 : y[i.unionSkillId]) ?? 1,
    g = Ad(l, u, o.target, i.targetId);
  for (const k of o.effects) td(l, u, k, o.element, p, g, r);
}
function t2(l, i, r) {
  var M, G, B, j, A, V, U, oe, W;
  if (l.outcome !== 'ongoing') return l;
  const o = structuredClone({ ...l, log: [] }),
    u = o.log.push.bind(o.log);
  o.log.push = (...x) => {
    const q = u(...x),
      Z = {};
    for (const ee of [...o.allies, ...o.enemies, ...o.summons])
      Z[ee.id] = { hp: ee.hp, isDown: ee.isDown };
    for (const ee of x) ee.snapshot = Z;
    return q;
  };
  const m = new Map(i.filter((x) => x.kind !== 'union').map((x) => [x.actorId, x])),
    f = o.turn === 1 && o.firstStrike !== 'none',
    h = f && o.firstStrike === 'preemptive',
    p = f && o.firstStrike === 'ambush';
  if (
    (h && o.log.push({ text: '先制攻撃！ 味方が先手を取った' }),
    p && o.log.push({ text: '不意打ち！ 敵に先手を取られた' }),
    !p)
  )
    for (const x of i) x.kind === 'union' && e2(o, x, r);
  const g = i.find((x) => x.kind === 'flee');
  if (!p && g && o.outcome === 'ongoing') {
    const x = $l(o, g.actorId);
    if (x && Wx(x)) o.log.push({ text: `${x.name} は脚を封じられて逃げられない` });
    else {
      let q = Vl(0.4 + (rh(gt(o, 'ally')) - rh(gt(o, 'enemy'))) * 0.02, 0.05, 0.9);
      if (
        (o.enemies.some((Z) => {
          var ee;
          return Z.enemyId && ((ee = Tt[Z.enemyId]) == null ? void 0 : ee.kind) === 'boss';
        })
          ? (q = 0)
          : o.enemies.some((Z) => {
              var ee;
              return Z.enemyId && ((ee = Tt[Z.enemyId]) == null ? void 0 : ee.kind) === 'foe';
            }) && (q *= 0.5),
        q > 0 && r.next() < q)
      )
        return (o.log.push({ text: 'うまく逃げ切れた！' }), (o.outcome = 'fled'), o);
      o.log.push({ text: '逃げられなかった！' });
    }
  }
  if (!p)
    for (const x of i) {
      if (x.kind !== 'guard') continue;
      const q = $l(o, x.actorId);
      !q ||
        q.isDown ||
        (ed(q, { stat: 'pdef', modifier: 1.5, remainingTurns: 1, stackGroup: 'guard' }),
        ed(q, { stat: 'mdef', modifier: 1.5, remainingTurns: 1, stackGroup: 'guard' }));
    }
  const y = new Map(),
    k = new Map(),
    L = new Set();
  if (!h)
    for (const x of gt(o, 'enemy')) {
      const q = [...ro(o), ...gt(o, 'ally')];
      q.length > 0 && y.set(x.id, Jx(q, r).id);
      const Z = x.enemyId ? Tt[x.enemyId] : void 0,
        ee = (Z == null ? void 0 : Z.actions) ?? (Z != null && Z.kit ? (ex[Z.kit] ?? []) : []),
        te = o.turn,
        ce = x,
        ve = (R) => R.effects.some((b) => b.kind === 'damage' && b.statBase === 'str'),
        D = Ou(x),
        fe = oh(x),
        O = [];
      D || O.push({ action: null, weight: K1 });
      for (const R of ee) {
        const b = R.cond;
        if (b) {
          if (
            (b.hpBelow !== void 0 && ce.hp / ce.maxHp > b.hpBelow) ||
            (b.hpAbove !== void 0 && ce.hp / ce.maxHp < b.hpAbove) ||
            (b.minTurn !== void 0 && te < b.minTurn) ||
            (b.maxUses !== void 0 &&
              (((G = (M = ce.actionState) == null ? void 0 : M[R.id]) == null ? void 0 : G.uses) ??
                0) >= b.maxUses)
          )
            continue;
          if (b.cooldown !== void 0) {
            const w =
              ((j = (B = ce.actionState) == null ? void 0 : B[R.id]) == null
                ? void 0
                : j.lastUsedTurn) ?? -1 / 0;
            if (te - w < b.cooldown) continue;
          }
        }
        (D && ve(R)) || (fe && !ve(R)) || O.push({ action: R, weight: R.weight });
      }
      if (O.length === 0) {
        (L.add(x.id), k.set(x.id, null));
        continue;
      }
      const le = O.reduce((R, b) => R + b.weight, 0);
      let re = r.next() * le,
        ke = null;
      for (const R of O)
        if (((re -= R.weight), re < 0)) {
          ke = R.action;
          break;
        }
      (ke === void 0 && (ke = null), k.set(x.id, ke));
    }
  const N = [...o.allies, ...o.enemies, ...o.summons]
    .filter((x) => !x.isDown)
    .filter((x) => !(h && x.side === 'enemy') && !(p && x.side === 'ally'))
    .map((x) => ({ c: x, agi: x.stats.agi, tie: r.next() }))
    .sort((x, q) => q.agi - x.agi || q.tie - x.tie)
    .map((x) => x.c);
  for (const x of N)
    if (!x.isDown) {
      if (o.outcome !== 'ongoing') break;
      if (Fx(x)) {
        o.log.push({ text: `${x.name} は眠っている` });
        continue;
      }
      if (Px(x) && r.next() < Be.PARALYSIS_SKIP) {
        o.log.push({ text: `${x.name} は麻痺で動けない` });
        continue;
      }
      if (x.isSummon) {
        const q = x.summonKind ? Jn[x.summonKind] : void 0;
        if (q != null && q.actsOnTurn) {
          const Z = gt(o, 'enemy');
          Z.length > 0 && Mu(o, x, r.pick(Z), r);
        }
        if (gt(o, 'enemy').length === 0) break;
        continue;
      }
      if (x.side === 'enemy') {
        if (L.has(x.id)) {
          o.log.push({ text: `${x.name} は封じられて動けない` });
          continue;
        }
        const q = k.get(x.id),
          Z = y.get(x.id);
        if (q == null) {
          const ee = Z ? $l(o, Z) : void 0,
            te = ee && !ee.isDown ? ee : gt(o, 'ally')[0];
          te && Mu(o, x, te, r);
        } else {
          const ee = Ad(o, x, q.target, Z ?? '');
          for (const te of q.effects) td(o, x, te, q.element, 1, ee, r);
          (x.actionState || (x.actionState = {}),
            (x.actionState[q.id] = {
              lastUsedTurn: o.turn,
              uses: (((A = x.actionState[q.id]) == null ? void 0 : A.uses) ?? 0) + 1,
            }),
            o.log.push({ text: `${x.name} の${q.name}！` }));
        }
      } else {
        const q = m.get(x.id);
        if (!q || q.kind === 'guard' || q.kind === 'flee') continue;
        if (q.kind === 'attack') {
          if (Ou(x)) {
            o.log.push({ text: `${x.name} は腕を封じられて攻撃できない` });
            continue;
          }
          const Z = $l(o, q.targetId),
            ee = Z && !Z.isDown ? Z : gt(o, 'enemy')[0];
          ee && Mu(o, x, ee, r);
        } else if (q.kind === 'skill') {
          const Z = wt[q.skillId];
          if (!Z) continue;
          if (ch(Z) && Ou(x)) {
            o.log.push({ text: `${x.name} は腕を封じられてスキルを使えない` });
            continue;
          }
          if (!ch(Z) && oh(x)) {
            o.log.push({ text: `${x.name} は頭を封じられてスキルを使えない` });
            continue;
          }
          const ee = ((V = x.skillLevels) == null ? void 0 : V[q.skillId]) ?? 1,
            te = Z.tpCost(ee);
          if (x.tp < te) {
            o.log.push({ text: `${x.name} は TP が足りない` });
            continue;
          }
          ((x.tp -= te), Wu(x, 10));
          const ce = Zx(o, x, Z, q.targetId);
          for (const ve of Z.effects) td(o, x, ve, Z.element, ee, ce, r);
        } else if (q.kind === 'item') {
          const Z = tt[q.itemId];
          if (!Z || !((U = Z.useContext) != null && U.includes('battle'))) continue;
          const ee = $l(o, q.targetId) ?? x;
          for (const te of Z.effects ?? [])
            te.kind === 'heal'
              ? (ee.hp = Vl(ee.hp + te.amount(1), 0, ee.maxHp))
              : te.kind === 'restoreTp' && (ee.tp = Vl(ee.tp + te.amount(1), 0, ee.maxTp));
          (o.consumedItems.push(q.itemId), o.log.push({ text: `${x.name} は ${Z.name} を使った` }));
        }
      }
      if (gt(o, 'enemy').length === 0 || gt(o, 'ally').length === 0) break;
    }
  for (const x of [...o.allies, ...o.enemies, ...o.summons]) {
    if (x.isDown) continue;
    const q = x.ailments.find((Z) => Z.type === 'poison');
    if (q) {
      const Z = q.magnitude ?? Math.max(1, Math.floor(x.maxHp * Be.POISON_HP_RATIO));
      (vg(x, Z, o.log), o.log.push({ text: `${x.name} は毒で ${Z} のダメージ` }));
    }
  }
  for (const x of [...o.allies, ...o.enemies, ...o.summons])
    (!x.isDown &&
      x.maxTp > 0 &&
      (x.tp = Math.min(x.maxTp, x.tp + Math.ceil(x.maxTp * Be.TP_REGEN_RATIO))),
      (x.buffs = x.buffs
        .map((q) => ({ ...q, remainingTurns: q.remainingTurns - 1 }))
        .filter((q) => q.remainingTurns > 0)),
      (x.ailments = x.ailments
        .map((q) => ({ ...q, remainingTurns: q.remainingTurns - 1 }))
        .filter((q) => q.remainingTurns > 0)),
      x.states &&
        x.states.length > 0 &&
        (x.states = x.states
          .map((q) => ({ ...q, remainingTurns: q.remainingTurns - 1 }))
          .filter((q) => q.remainingTurns > 0)));
  for (const x of o.enemies)
    if (
      !(
        !x.isDown ||
        !x.enemyId ||
        (((oe = l.enemies.find((Z) => Z.id === x.id)) == null ? void 0 : oe.isDown) ?? !1)
      )
    )
      for (const Z of Tt[x.enemyId].drops ?? [])
        r.next() < Z.rate &&
          (o.drops.push({ enemyId: x.enemyId, itemId: Z.itemId }),
          o.log.push({
            text: `${x.name} は ${((W = tt[Z.itemId]) == null ? void 0 : W.name) ?? Z.itemId} を落とした`,
          }));
  return (
    (o.summons = o.summons.filter((x) => !x.isDown)),
    (o.turn += 1),
    gt(o, 'enemy').length === 0
      ? (o.outcome = 'win')
      : gt(o, 'ally').length === 0 && (o.outcome = 'lose'),
    o
  );
}
function qd(l, i) {
  let r = 0,
    o = 0;
  const u = i !== void 0 ? nh(i) : void 0,
    m = nh(l.depth),
    f = u !== void 0 ? Math.pow(Be.FARM_EXP_DECAY_PER_BAND, Math.max(0, u - m)) : 1;
  for (const h of l.enemies) {
    if (!h.enemyId) continue;
    const p = Tt[h.enemyId],
      g = yd(l.depth, p.refDepth);
    ((r += Math.round(p.exp * g * f)), (o += Math.round(p.gold * g * f)));
  }
  return { exp: r, gold: o };
}
function l2(l, i) {
  if (i.outcome !== 'win' || !l.diveState) return [];
  const r = l.towerState.record.deepestReached,
    { exp: o } = qd(i, r),
    u = new Set(l.diveState.party.map((h) => h.charId)),
    m = u.size > 0 ? Math.floor(o / u.size) : 0,
    f = [];
  for (const h of l.guild.members) {
    if (!u.has(h.id)) continue;
    const p = bg(h, m),
      g = {};
    if (p.level > h.level) {
      const y = Xl(h),
        k = Xl(p);
      for (const L of Object.keys(y)) {
        const N = Math.round(k[L] - y[L]);
        N !== 0 && (g[L] = N);
      }
    }
    f.push({
      charId: h.id,
      name: h.name,
      gainedExp: ts(h.level) ? m : 0,
      fromLevel: h.level,
      toLevel: p.level,
      exp: p.exp,
      expToNext: ts(p.level) ? Ju(p.level) : 0,
      statGains: g,
    });
  }
  return f;
}
function bg(l, i) {
  let r = l.level,
    o = l.exp + (ts(r) ? i : 0),
    u = l.skillPoints.total;
  for (; ts(r) && o >= Ju(r); ) ((o -= Ju(r)), (r += 1), (u += px(r)));
  return {
    ...l,
    level: r,
    exp: ts(l.level) ? o : l.exp,
    skillPoints: { ...l.skillPoints, total: u },
  };
}
function uh(l, i) {
  if (!l.diveState) return l;
  const r = i.outcome === 'win',
    o = i.outcome === 'win' || i.outcome === 'fled',
    u = new Map(i.allies.map((N) => [N.id, N])),
    m = l.diveState.party.map((N) => {
      const M = u.get(N.charId);
      if (!M) return N;
      let G = M.unionGauge;
      return (
        o && !M.isDown && (G = Vl(G + Be.UNION_GAIN_ON_WIN, 0, 100)),
        { ...N, hp: M.hp, tp: M.tp, unionGauge: G, ailments: M.ailments }
      );
    });
  let f = l.guild.members,
    h = l.guild.gold;
  const p = { ...l.bestiary.monsters };
  for (const N of i.enemies) {
    if (!N.enemyId) continue;
    const M = p[N.enemyId] ?? { seen: !1, defeated: !1, dropsFound: [] };
    p[N.enemyId] = { ...M, seen: !0, defeated: M.defeated || N.isDown };
  }
  if (r)
    for (const N of i.drops) {
      const M = p[N.enemyId];
      M &&
        !M.dropsFound.includes(N.itemId) &&
        (p[N.enemyId] = { ...M, dropsFound: [...M.dropsFound, N.itemId] });
    }
  const g = { ...l.bestiary, monsters: p };
  if (r) {
    const N = l.towerState.record.deepestReached,
      { exp: M, gold: G } = qd(i, N);
    h += G;
    const B = new Set(m.map((A) => A.charId)),
      j = B.size > 0 ? Math.floor(M / B.size) : 0;
    f = f.map((A) => (B.has(A.id) ? bg(A, j) : A));
  }
  const y = i.summons
    .filter((N) => {
      var M;
      return (
        !N.isDown &&
        N.summonKind &&
        ((M = Jn[N.summonKind]) == null ? void 0 : M.persistsAfterBattle)
      );
    })
    .map((N) => ({ summonKind: N.summonKind, ownerId: N.ownerId ?? '', hp: N.hp }));
  let k = {
    ...l,
    guild: { ...l.guild, members: f, gold: h, bestiary: g },
    bestiary: g,
    diveState: { ...l.diveState, party: m, persistentSummons: y },
  };
  for (const N of i.consumedItems) k = wd(k, N, 1);
  const L = ig(i.depth);
  if (r) for (const N of i.drops) k = Sd(k, N.itemId, 1, L);
  return k;
}
const a2 = 8,
  ld = 16,
  ls = 5;
function Bd(l) {
  return l.range(a2, ld);
}
function n2(l, i) {
  const r = l - 1;
  return r <= 0
    ? { stepsUntilEncounter: Bd(i), triggered: !0 }
    : { stepsUntilEncounter: r, triggered: !1 };
}
function i2(l) {
  const i = Math.max(0, ld - l),
    r = Math.round((i / ld) * ls);
  return Math.min(ls, Math.max(0, r));
}
const nl = { N: { dx: 0, dy: -1 }, E: { dx: 1, dy: 0 }, S: { dx: 0, dy: 1 }, W: { dx: -1, dy: 0 } },
  Vn = ['N', 'E', 'S', 'W'];
function xg(l) {
  return Vn[(Vn.indexOf(l) + 1) % 4];
}
function Sg(l) {
  return Vn[(Vn.indexOf(l) + 3) % 4];
}
function s2(l) {
  return Vn[(Vn.indexOf(l) + 2) % 4];
}
const wg = (l, i, r) => l >= 0 && i >= 0 && l < r.width && i < r.height;
function Xa(l, i, r, o) {
  if (l.cells[r][i].walls[o]) return !1;
  const u = i + nl[o].dx,
    m = r + nl[o].dy;
  return wg(u, m, l) ? l.cells[m][u].passable : !1;
}
function r2(l, i, r) {
  return Xa(l, i.x, i.y, r) ? { x: i.x + nl[r].dx, y: i.y + nl[r].dy } : null;
}
function Id(l, i, r) {
  return ['N', 'E', 'S', 'W'].filter((o) => !l.cells[r][i].walls[o]);
}
function o2(l, i, r) {
  if (i.x === r.x && i.y === r.y) return [];
  if (!wg(r.x, r.y, l) || !l.cells[r.y][r.x].passable) return null;
  const o = (f, h) => `${f},${h}`,
    u = new Map();
  u.set(o(i.x, i.y), null);
  const m = [{ ...i }];
  for (; m.length > 0; ) {
    const f = m.shift();
    for (const h of ['N', 'E', 'S', 'W']) {
      if (!Xa(l, f.x, f.y, h)) continue;
      const p = f.x + nl[h].dx,
        g = f.y + nl[h].dy,
        y = o(p, g);
      if (!u.has(y)) {
        if ((u.set(y, { x: f.x, y: f.y, dir: h }), p === r.x && g === r.y)) {
          const k = [];
          let L = y;
          for (;;) {
            const N = u.get(L);
            if (!N) break;
            (k.unshift(N.dir), (L = o(N.x, N.y)));
          }
          return k;
        }
        m.push({ x: p, y: g });
      }
    }
  }
  return null;
}
const dh = ['N', 'E', 'S', 'W'],
  Ru = (l, i) => Math.abs(l.x - i.x) + Math.abs(l.y - i.y);
function c2(l, i, r, o, u) {
  const m = i.map((y) => ({ ...y, cell: { ...y.cell } })),
    f = new Map(l.foeSpawns.map((y) => [y.id, y])),
    h = new Set(m.filter((y) => !y.defeated).map((y) => `${y.cell.x},${y.cell.y}`));
  let p = null;
  const g = [...m].sort((y, k) => y.spawnId.localeCompare(k.spawnId, void 0, { numeric: !0 }));
  for (const y of g) {
    if (p) break;
    if (y.defeated) continue;
    const k = f.get(y.spawnId);
    if (!k) continue;
    !y.alerted && Ru(y.cell, r) <= k.sightRange && (y.alerted = !0);
    const L = (N) => {
      if (!Xa(l, y.cell.x, y.cell.y, N)) return 'blocked';
      const M = y.cell.x + nl[N].dx,
        G = y.cell.y + nl[N].dy;
      if (M === r.x && G === r.y) {
        const B = N === o;
        return (
          (p = { spawnId: y.spawnId, enemyId: k.enemyId, firstStrike: B ? 'ambush' : 'none' }),
          'contact'
        );
      }
      return h.has(`${M},${G}`)
        ? 'blocked'
        : (h.delete(`${y.cell.x},${y.cell.y}`),
          (y.cell = { x: M, y: G }),
          h.add(`${M},${G}`),
          'moved');
    };
    if (y.alerted)
      for (let N = 0; N < k.moveSpeed; N++) {
        let M = null,
          G = Ru(y.cell, r),
          B = !1;
        for (const A of dh) {
          const V = y.cell.x + nl[A].dx,
            U = y.cell.y + nl[A].dy;
          if (V === r.x && U === r.y && Xa(l, y.cell.x, y.cell.y, A)) {
            ((M = A), (B = !0));
            break;
          }
          if (!Xa(l, y.cell.x, y.cell.y, A) || h.has(`${V},${U}`)) continue;
          const oe = Ru({ x: V, y: U }, r);
          oe < G && ((G = oe), (M = A));
        }
        if (!M) break;
        const j = L(M);
        if (j === 'contact' || j === 'blocked' || B) break;
      }
    else {
      const N = k.patrol;
      if (N.kind === 'wander') {
        const M = dh.filter(
          (G) =>
            Xa(l, y.cell.x, y.cell.y, G) && !h.has(`${y.cell.x + nl[G].dx},${y.cell.y + nl[G].dy}`)
        );
        M.length > 0 && L(u.pick(M));
      } else N.kind === 'charge' && L(N.dir);
    }
  }
  return { foes: m, contact: p };
}
const Va = {
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
  u2 = Object.keys(Va);
function d2(l) {
  const i = Object.values(Tt)
    .filter((r) => r.tierBand === l && r.kind === 'foe')
    .map((r) => r.id);
  return i.length > 0
    ? i
    : Object.values(Tt)
        .filter((r) => r.tierBand === l && !r.isBoss && r.kind !== 'foe')
        .map((r) => r.id);
}
function m2(l) {
  const i = Object.values(Tt).filter((o) => o.isBoss);
  if (i.length === 0) return null;
  const r = i.filter((o) => o.tierBand === l);
  return r.length > 0 ? r[0].id : i.sort((o, u) => u.tierBand - o.tierBand)[0].id;
}
function _2(l, i, r, o, u) {
  for (const m of ['N', 'E', 'S', 'W']) {
    if (l[r][i].walls[m]) continue;
    const f = i + ul[m].dx,
      h = r + ul[m].dy;
    if (Wr(f, h, o, u) && !l[h][f].event) return { x: f, y: h };
  }
  return null;
}
const ul = { N: { dx: 0, dy: -1 }, E: { dx: 1, dy: 0 }, S: { dx: 0, dy: 1 }, W: { dx: -1, dy: 0 } },
  f2 = { N: 'S', E: 'W', S: 'N', W: 'E' };
function p2(l) {
  return Math.min(25, 15 + Math.floor(l / 5));
}
function h2() {
  return { walls: { N: !0, E: !0, S: !0, W: !0 }, floorType: 'normal', passable: !0 };
}
const Wr = (l, i, r, o) => l >= 0 && i >= 0 && l < r && i < o;
function mh(l, i, r, o) {
  const { dx: u, dy: m } = ul[o];
  ((l[r][i].walls[o] = !1), (l[r + m][i + u].walls[f2[o]] = !1));
}
function g2(l, i, r) {
  const o = l.length,
    u = l[0].length,
    m = Array.from({ length: o }, () => Array(u).fill(-1)),
    f = [{ x: i, y: r }];
  m[r][i] = 0;
  for (let h = 0; h < f.length; h++) {
    const { x: p, y: g } = f[h];
    for (const y of ['N', 'E', 'S', 'W']) {
      if (l[g][p].walls[y]) continue;
      const k = p + ul[y].dx,
        L = g + ul[y].dy;
      !Wr(k, L, u, o) || m[L][k] !== -1 || ((m[L][k] = m[g][p] + 1), f.push({ x: k, y: L }));
    }
  }
  return m;
}
function k2(l, i) {
  const r = p2(l),
    o = r,
    u = r,
    m = Array.from({ length: u }, () => Array.from({ length: o }, () => h2())),
    f = Array.from({ length: u }, () => Array(o).fill(!1)),
    h = i.int(o),
    p = i.int(u),
    g = [{ x: h, y: p }];
  for (f[p][h] = !0; g.length > 0; ) {
    const W = g[g.length - 1],
      x = [];
    for (const te of ['N', 'E', 'S', 'W']) {
      const ce = W.x + ul[te].dx,
        ve = W.y + ul[te].dy;
      Wr(ce, ve, o, u) && !f[ve][ce] && x.push(te);
    }
    if (x.length === 0) {
      g.pop();
      continue;
    }
    const q = i.pick(x);
    mh(m, W.x, W.y, q);
    const Z = W.x + ul[q].dx,
      ee = W.y + ul[q].dy;
    ((f[ee][Z] = !0), g.push({ x: Z, y: ee }));
  }
  const y = Math.floor((o * u) / 25);
  for (let W = 0; W < y; W++) {
    const x = i.int(o),
      q = i.int(u),
      Z = i.pick(['N', 'E', 'S', 'W']),
      ee = x + ul[Z].dx,
      te = q + ul[Z].dy;
    Wr(ee, te, o, u) && m[q][x].walls[Z] && mh(m, x, q, Z);
  }
  const k = i.int(o),
    L = i.int(u),
    N = g2(m, k, L);
  let M = k,
    G = L,
    B = -1;
  for (let W = 0; W < u; W++)
    for (let x = 0; x < o; x++) N[W][x] > B && ((B = N[W][x]), (M = x), (G = W));
  ((m[L][k].event = { kind: 'stairsDown' }), (m[G][M].event = { kind: 'stairsUp' }));
  const j = ng(l),
    A = [];
  if (es(l)) {
    const W = m2(j);
    if (W) {
      const x = _2(m, M, G, o, u) ?? { x: M, y: G };
      A.push({
        id: 'boss',
        enemyId: W,
        startCell: x,
        patrol: { kind: 'static' },
        moveSpeed: 0,
        sightRange: 0,
        respawn: !1,
        isBoss: !0,
      });
    }
  } else {
    const W = d2(j),
      x = 1 + Math.floor(l / 8);
    for (let q = 0; q < x && W.length > 0; q++) {
      let Z = i.int(o),
        ee = i.int(u);
      for (let te = 0; te < 20; te++) {
        ((Z = i.int(o)), (ee = i.int(u)));
        const ce = m[ee][Z].event,
          ve = Math.abs(Z - k) + Math.abs(ee - L) >= 3;
        if (!ce && ve) break;
      }
      A.push({
        id: `foe_${q}`,
        enemyId: i.pick(W),
        startCell: { x: Z, y: ee },
        patrol: { kind: 'wander' },
        moveSpeed: 1,
        sightRange: 3,
        respawn: !1,
      });
    }
  }
  const V = [],
    U = () => {
      for (let W = 0; W < 25; W++) {
        const x = i.int(o),
          q = i.int(u),
          Z = Math.abs(x - k) + Math.abs(q - L) >= 2;
        if (!m[q][x].event && Z) return { x, y: q };
      }
      return null;
    },
    oe = 2 + Math.floor(l / 10);
  for (let W = 0; W < oe; W++) {
    const x = U();
    if (!x) break;
    const q = i.pick(u2),
      Z = `gather_${W}`;
    ((m[x.y][x.x].event = { kind: 'gather', gatherId: Z }), V.push({ id: Z, cell: x, type: q }));
  }
  if (!es(l)) {
    const W = U();
    W && (m[W.y][W.x].event = { kind: 'cookingSpot', spotId: 'cook_0' });
  }
  return {
    depth: l,
    width: o,
    height: u,
    cells: m,
    encounterTable: `band_${j}`,
    foeSpawns: A,
    gatheringPoints: V,
    bgmId: es(l) ? 'bgm_boss' : 'bgm_dungeon',
  };
}
function Tg(l, i) {
  var r;
  for (let o = 0; o < l.height; o++)
    for (let u = 0; u < l.width; u++)
      if (((r = l.cells[o][u].event) == null ? void 0 : r.kind) === i) return { x: u, y: o };
  return null;
}
const v2 = 4294967296;
function y2(l, i) {
  let r = 3735928559 ^ l,
    o = 1103547991 ^ l;
  for (let u = 0; u < i.length; u++) {
    const m = i.charCodeAt(u);
    ((r = Math.imul(r ^ m, 2654435761)), (o = Math.imul(o ^ m, 1597334677)));
  }
  return (
    (r = Math.imul(r ^ (r >>> 16), 2246822507) ^ Math.imul(o ^ (o >>> 13), 3266489909)),
    (o = Math.imul(o ^ (o >>> 16), 2246822507) ^ Math.imul(r ^ (r >>> 13), 3266489909)),
    (o >>> 0) ^ (r >>> 0)
  );
}
class Md {
  constructor(i, r) {
    Tu(this, 'baseSeed');
    Tu(this, '_state');
    ((this._state = i >>> 0), (this.baseSeed = (r ?? i) >>> 0));
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
      ((i ^ (i >>> 14)) >>> 0) / v2
    );
  }
  int(i) {
    return i <= 0 ? 0 : Math.floor(this.next() * i);
  }
  range(i, r) {
    r < i && ([i, r] = [r, i]);
    const o = r - i + 1;
    return i + this.int(o);
  }
  pick(i) {
    if (i.length === 0) throw new Error('Rng.pick: 空配列は選択できません');
    return i[this.int(i.length)];
  }
  fork(i) {
    const r = y2(this.baseSeed, i);
    return new Md(r, r);
  }
}
function Sa(l) {
  return new Md(l, l);
}
function b2() {
  return Math.floor(Math.random() * 4294967296) >>> 0;
}
const eo = (l, i) => `${l},${i}`;
function x2(l, i) {
  return Sa(l).fork(`floor:${i}`);
}
function Ng(l, i) {
  const r = l.towerState.floors[i];
  if (r) return { save: l, floor: r };
  const o = k2(i, x2(l.masterSeed, i)),
    u = o.foeSpawns.map((h) => ({
      spawnId: h.id,
      cell: { ...h.startCell },
      defeated: !1,
      alerted: !1,
    })),
    m = {
      depth: i,
      seed: l.masterSeed,
      generated: o,
      isBossFloor: es(i),
      encounterTier: Math.floor((i - 1) / 10),
      foeRuntime: u,
      openedChests: [],
      depletedGathers: [],
      consumedEvents: [],
    };
  return {
    save: { ...l, towerState: { ...l.towerState, floors: { ...l.towerState.floors, [i]: m } } },
    floor: m,
  };
}
function S2(l) {
  const i = [...l.guild.party.front, ...l.guild.party.back].filter((o) => o !== null),
    r = [];
  for (const o of i) {
    const u = l.guild.members.find((f) => f.id === o);
    if (!u) continue;
    const m = Xl(u);
    r.push({ charId: o, hp: m.hp, tp: m.tp, unionGauge: 0, ailments: [] });
  }
  return r;
}
function to(l, i, r, o) {
  const u = l.towerState.floors[i].generated,
    m = new Set(l.exploredCells[i] ?? []);
  m.add(eo(r, o));
  for (const f of Id(u, r, o)) {
    const h = r + (f === 'E' ? 1 : f === 'W' ? -1 : 0),
      p = o + (f === 'S' ? 1 : f === 'N' ? -1 : 0);
    m.add(eo(h, p));
  }
  return { ...l, exploredCells: { ...l.exploredCells, [i]: [...m] } };
}
function jg(l, i, r) {
  var p, g;
  const o = Ng(l, i);
  let u = o.save;
  const m = o.floor.generated,
    f = Tg(m, 'stairsDown') ?? { x: 0, y: 0 },
    h = Id(m, f.x, f.y)[0] ?? 'N';
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
        party: ((p = u.diveState) == null ? void 0 : p.party) ?? S2(u),
        persistentSummons: ((g = u.diveState) == null ? void 0 : g.persistentSummons) ?? [],
        encounter: { stepsUntilEncounter: Bd(r) },
        pendingFoeBattle: null,
      },
    }),
    to(u, i, f.x, f.y)
  );
}
function _h(l, i = 1) {
  const r = Sa(l.masterSeed).fork(`dive:${l.towerState.record.totalDives}`),
    o = {
      ...l,
      diveState: null,
      towerState: {
        ...l.towerState,
        record: { ...l.towerState.record, totalDives: l.towerState.record.totalDives + 1 },
      },
    };
  return jg(o, i, r);
}
function Eg(l, i) {
  return l.diveState ? { ...l, diveState: { ...l.diveState, dir: i } } : l;
}
function Cg(l, i, r) {
  const o = l.towerState.floors[i];
  return {
    ...l,
    towerState: {
      ...l.towerState,
      floors: { ...l.towerState.floors, [i]: { ...o, foeRuntime: r } },
    },
  };
}
function fh(l, i, r) {
  const o = l.diveState;
  if (!o) return { save: l, moved: !1, triggered: !1 };
  const u = l.towerState.floors[o.depth],
    m = u.generated,
    f = r2(m, o.pos, i);
  if (!f) return { save: Eg(l, i), moved: !1, triggered: !1 };
  const h = u.foeRuntime.find((k) => !k.defeated && k.cell.x === f.x && k.cell.y === f.y);
  if (h) {
    const k = m.foeSpawns.find((M) => M.id === h.spawnId),
      L = k
        ? {
            spawnId: h.spawnId,
            enemyId: k.enemyId,
            firstStrike: k.isBoss ? 'none' : 'preemptive',
            isBoss: k.isBoss,
          }
        : null;
    let N = { ...l, diveState: { ...o, pos: f, dir: i, pendingFoeBattle: L } };
    return ((N = to(N, o.depth, f.x, f.y)), { save: N, moved: !0, triggered: L !== null });
  }
  const p = n2(o.encounter.stepsUntilEncounter, r);
  let g = {
    ...l,
    diveState: {
      ...o,
      pos: f,
      dir: i,
      encounter: { stepsUntilEncounter: p.stepsUntilEncounter },
      pendingFoeBattle: null,
    },
  };
  g = to(g, o.depth, f.x, f.y);
  const y = c2(m, u.foeRuntime, f, i, r);
  return (
    (g = Cg(g, o.depth, y.foes)),
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
function w2(l, i) {
  const r = l.diveState;
  if (!r) return l;
  const o = r.pendingFoeBattle;
  let u = { ...l, diveState: { ...r, pendingFoeBattle: null } };
  if (o && i) {
    const f = u.towerState.floors[r.depth].foeRuntime.map((h) =>
      h.spawnId === o.spawnId ? { ...h, defeated: !0 } : h
    );
    ((u = Cg(u, r.depth, f)), o.isBoss && (u = T2(u, r.depth)));
  }
  return u;
}
function T2(l, i, r = Date.now()) {
  const o = l.towerState,
    u = { ...o.bossGates, [i]: { depth: i, defeated: !0 } },
    m = o.warp.unlockedCheckpoints.includes(i)
      ? o.warp.unlockedCheckpoints
      : [...o.warp.unlockedCheckpoints, i].sort((p, g) => p - g),
    f = o.record.bossDefeatLog.some((p) => p.depth === i),
    h = {
      ...o.record,
      highestBossDefeated: Math.max(o.record.highestBossDefeated, i),
      bossDefeatLog: f ? o.record.bossDefeatLog : [...o.record.bossDefeatLog, { depth: i, at: r }],
    };
  return {
    ...l,
    towerState: { ...o, bossGates: u, warp: { ...o.warp, unlockedCheckpoints: m }, record: h },
  };
}
function Ag(l, i) {
  var r;
  return es(i) ? ((r = l.towerState.bossGates[i]) == null ? void 0 : r.defeated) === !0 : !0;
}
function ph(l) {
  const i = l.diveState;
  if (!i) return null;
  const r = l.towerState.floors[i.depth].generated.cells[i.pos.y][i.pos.x].event;
  return (r == null ? void 0 : r.kind) === 'stairsUp' ||
    (r == null ? void 0 : r.kind) === 'stairsDown'
    ? r.kind
    : null;
}
function N2(l) {
  if (!l.diveState || !Ag(l, l.diveState.depth)) return l;
  const i = l.diveState.depth + 1,
    r = Sa(l.masterSeed).fork(`enc:${i}:${l.towerState.record.totalDives}`);
  return jg(l, i, r);
}
function j2(l) {
  if (!l.diveState) return l;
  const i = l.diveState.depth;
  if (i <= 1) return is(l);
  const r = i - 1,
    o = Ng(l, r),
    u = Tg(o.floor.generated, 'stairsUp') ?? { x: 0, y: 0 },
    m = Sa(l.masterSeed).fork(`enc:${r}:${l.towerState.record.totalDives}`);
  let f = o.save;
  const h = o.floor.generated,
    p = Id(h, u.x, u.y)[0] ?? 'N';
  return (
    (f = {
      ...f,
      diveState: {
        ...f.diveState,
        depth: r,
        pos: { x: u.x, y: u.y },
        dir: p,
        encounter: { stepsUntilEncounter: Bd(m) },
        pendingFoeBattle: null,
      },
    }),
    to(f, r, u.x, u.y)
  );
}
function is(l) {
  return { ...l, diveState: null };
}
const Fn = {
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
function E2() {
  return Object.values(Fn)
    .filter((l) => l.unlockedByDefault)
    .map((l) => l.id);
}
const Qr = 2,
  C2 = { autoMap: 'on', bgmVolume: 0.6, seVolume: 0.6 };
function hh() {
  return { monsters: {}, items: {} };
}
function A2() {
  return { deepestReached: 0, highestBossDefeated: 0, totalDives: 0, bossDefeatLog: [] };
}
const L2 = () => ({ weapon: null, armor: null, accessory: null });
function q2() {
  return `char_${Date.now().toString(36)}_${Math.floor(Math.random() * 16777215).toString(36)}`;
}
function Lg(l) {
  var h;
  const { raceId: i, classId: r, name: o, id: u } = l;
  if (!Ke[i]) throw new Error(`createCharacter: 未定義の種族 "${i}"`);
  if (!ze[r]) throw new Error(`createCharacter: 未定義の職業 "${r}"`);
  const m = (h = ze[r].skillTree.skills[0]) == null ? void 0 : h.skillId,
    f = m ? { [m]: 1 } : {};
  return {
    id: u ?? q2(),
    name: o,
    raceId: i,
    classId: r,
    titleId: null,
    level: 1,
    exp: 0,
    skillPoints: { total: 0, spent: 0 },
    learnedSkills: f,
    equipment: L2(),
  };
}
function B2() {
  return { front: Array(ps).fill(null), back: Array(hs).fill(null) };
}
function I2(l, i) {
  const r = l.front.indexOf(null);
  if (r !== -1) {
    const u = [...l.front];
    return ((u[r] = i), { ...l, front: u });
  }
  const o = l.back.indexOf(null);
  if (o !== -1) {
    const u = [...l.back];
    return ((u[o] = i), { ...l, back: u });
  }
  return l;
}
function M2(l, i) {
  return l.guild.members.length >= Zu
    ? l
    : {
        ...l,
        guild: { ...l.guild, members: [...l.guild.members, i], party: I2(l.guild.party, i.id) },
      };
}
function O2(l, i) {
  if (!l.guild.members.some((m) => m.id === i)) return l;
  const r = l.guild.party.front.map((m) => (m === i ? null : m)),
    o = l.guild.party.back.map((m) => (m === i ? null : m)),
    u = l.diveState
      ? { ...l.diveState, party: l.diveState.party.filter((m) => m.charId !== i) }
      : l.diveState;
  return {
    ...l,
    guild: {
      ...l.guild,
      members: l.guild.members.filter((m) => m.id !== i),
      party: { front: r, back: o },
    },
    diveState: u,
  };
}
function R2(l) {
  return {
    schemaVersion: Qr,
    savedAt: 0,
    masterSeed: b2(),
    settings: { ...C2 },
    guild: {
      name: l,
      gold: _x,
      members: [],
      party: B2(),
      storage: [],
      equipment: [],
      foodStorage: [],
      bestiary: hh(),
    },
    towerState: { floors: {}, bossGates: {}, warp: { unlockedCheckpoints: [] }, record: A2() },
    diveState: null,
    bestiary: hh(),
    playerMaps: {},
    exploredCells: {},
    forgeInventory: { fragments: {}, ingots: { copper: 0, silver: 0, gold: 0 } },
    shopStock: { unlockedTier: 0, unlockedItemIds: [] },
    unlockedRecipeIds: E2(),
    flags: {},
  };
}
const ad = (l, i) => i.some((r) => l instanceof r);
let gh, kh;
function D2() {
  return gh || (gh = [IDBDatabase, IDBObjectStore, IDBIndex, IDBCursor, IDBTransaction]);
}
function z2() {
  return (
    kh ||
    (kh = [
      IDBCursor.prototype.advance,
      IDBCursor.prototype.continue,
      IDBCursor.prototype.continuePrimaryKey,
    ])
  );
}
const nd = new WeakMap(),
  Du = new WeakMap(),
  oo = new WeakMap();
function H2(l) {
  const i = new Promise((r, o) => {
    const u = () => {
        (l.removeEventListener('success', m), l.removeEventListener('error', f));
      },
      m = () => {
        (r(Qa(l.result)), u());
      },
      f = () => {
        (o(l.error), u());
      };
    (l.addEventListener('success', m), l.addEventListener('error', f));
  });
  return (oo.set(i, l), i);
}
function U2(l) {
  if (nd.has(l)) return;
  const i = new Promise((r, o) => {
    const u = () => {
        (l.removeEventListener('complete', m),
          l.removeEventListener('error', f),
          l.removeEventListener('abort', f));
      },
      m = () => {
        (r(), u());
      },
      f = () => {
        (o(l.error || new DOMException('AbortError', 'AbortError')), u());
      };
    (l.addEventListener('complete', m),
      l.addEventListener('error', f),
      l.addEventListener('abort', f));
  });
  nd.set(l, i);
}
let id = {
  get(l, i, r) {
    if (l instanceof IDBTransaction) {
      if (i === 'done') return nd.get(l);
      if (i === 'store')
        return r.objectStoreNames[1] ? void 0 : r.objectStore(r.objectStoreNames[0]);
    }
    return Qa(l[i]);
  },
  set(l, i, r) {
    return ((l[i] = r), !0);
  },
  has(l, i) {
    return l instanceof IDBTransaction && (i === 'done' || i === 'store') ? !0 : i in l;
  },
};
function qg(l) {
  id = l(id);
}
function $2(l) {
  return z2().includes(l)
    ? function (...i) {
        return (l.apply(sd(this), i), Qa(this.request));
      }
    : function (...i) {
        return Qa(l.apply(sd(this), i));
      };
}
function G2(l) {
  return typeof l == 'function'
    ? $2(l)
    : (l instanceof IDBTransaction && U2(l), ad(l, D2()) ? new Proxy(l, id) : l);
}
function Qa(l) {
  if (l instanceof IDBRequest) return H2(l);
  if (Du.has(l)) return Du.get(l);
  const i = G2(l);
  return (i !== l && (Du.set(l, i), oo.set(i, l)), i);
}
const sd = (l) => oo.get(l);
function Y2(l, i, { blocked: r, upgrade: o, blocking: u, terminated: m } = {}) {
  const f = indexedDB.open(l, i),
    h = Qa(f);
  return (
    o &&
      f.addEventListener('upgradeneeded', (p) => {
        o(Qa(f.result), p.oldVersion, p.newVersion, Qa(f.transaction), p);
      }),
    r && f.addEventListener('blocked', (p) => r(p.oldVersion, p.newVersion, p)),
    h
      .then((p) => {
        (m && p.addEventListener('close', () => m()),
          u && p.addEventListener('versionchange', (g) => u(g.oldVersion, g.newVersion, g)));
      })
      .catch(() => {}),
    h
  );
}
const X2 = ['get', 'getKey', 'getAll', 'getAllKeys', 'count'],
  V2 = ['put', 'add', 'delete', 'clear'],
  zu = new Map();
function vh(l, i) {
  if (!(l instanceof IDBDatabase && !(i in l) && typeof i == 'string')) return;
  if (zu.get(i)) return zu.get(i);
  const r = i.replace(/FromIndex$/, ''),
    o = i !== r,
    u = V2.includes(r);
  if (!(r in (o ? IDBIndex : IDBObjectStore).prototype) || !(u || X2.includes(r))) return;
  const m = async function (f, ...h) {
    const p = this.transaction(f, u ? 'readwrite' : 'readonly');
    let g = p.store;
    return (o && (g = g.index(h.shift())), (await Promise.all([g[r](...h), u && p.done]))[0]);
  };
  return (zu.set(i, m), m);
}
qg((l) => ({
  ...l,
  get: (i, r, o) => vh(i, r) || l.get(i, r, o),
  has: (i, r) => !!vh(i, r) || l.has(i, r),
}));
const Q2 = ['continue', 'continuePrimaryKey', 'advance'],
  yh = {},
  rd = new WeakMap(),
  Bg = new WeakMap(),
  K2 = {
    get(l, i) {
      if (!Q2.includes(i)) return l[i];
      let r = yh[i];
      return (
        r ||
          (r = yh[i] =
            function (...o) {
              rd.set(this, Bg.get(this)[i](...o));
            }),
        r
      );
    },
  };
async function* Z2(...l) {
  let i = this;
  if ((i instanceof IDBCursor || (i = await i.openCursor(...l)), !i)) return;
  i = i;
  const r = new Proxy(i, K2);
  for (Bg.set(r, i), oo.set(r, sd(i)); i; )
    (yield r, (i = await (rd.get(r) || i.continue())), rd.delete(r));
}
function bh(l, i) {
  return (
    (i === Symbol.asyncIterator && ad(l, [IDBIndex, IDBObjectStore, IDBCursor])) ||
    (i === 'iterate' && ad(l, [IDBIndex, IDBObjectStore]))
  );
}
qg((l) => ({
  ...l,
  get(i, r, o) {
    return bh(i, r) ? Z2 : l.get(i, r, o);
  },
  has(i, r) {
    return bh(i, r) || l.has(i, r);
  },
}));
const J2 = { 1: (l) => P2(l) },
  Hu = (l) => typeof l == 'object' && l !== null && !Array.isArray(l);
function P2(l) {
  const i = { ...l, schemaVersion: 2 };
  let r = 0;
  const o = (m) => ({ id: `eq_mig_${Date.now().toString(36)}_${r++}`, masterId: m, forgeLevel: 0 }),
    u = Hu(i.guild) ? { ...i.guild } : {};
  return (
    Array.isArray(u.equipment) || (u.equipment = []),
    Array.isArray(u.foodStorage) || (u.foodStorage = []),
    Array.isArray(u.members) &&
      (u.members = u.members.map((m) => {
        if (!Hu(m)) return m;
        const f = Hu(m.equipment) ? { ...m.equipment } : {};
        for (const h of ['weapon', 'armor', 'accessory']) {
          const p = f[h];
          f[h] = typeof p == 'string' ? o(p) : (p ?? null);
        }
        return { ...m, equipment: f };
      })),
    (i.guild = u),
    Array.isArray(i.unlockedRecipeIds) || (i.unlockedRecipeIds = []),
    i
  );
}
function F2(l) {
  return structuredClone(l);
}
function Hn(l) {
  return typeof l == 'object' && l !== null && !Array.isArray(l);
}
function W2(l) {
  if (
    !Hn(l) ||
    typeof l.schemaVersion != 'number' ||
    typeof l.masterSeed != 'number' ||
    !Hn(l.guild)
  )
    return !1;
  const i = l.guild;
  return !(
    typeof i.name != 'string' ||
    !Array.isArray(i.members) ||
    !Array.isArray(i.equipment) ||
    !Hn(l.forgeInventory) ||
    !Hn(l.towerState) ||
    !Hn(l.towerState.record) ||
    typeof l.towerState.record.deepestReached != 'number'
  );
}
function Ig(l) {
  if (!Hn(l) || typeof l.schemaVersion != 'number')
    return { ok: !1, reason: 'セーブデータの構造が不正です' };
  let i = l.schemaVersion;
  if (i > Qr) return { ok: !1, reason: `未知のバージョン (${i} > ${Qr}) のセーブデータです` };
  let r = { ...l };
  for (; i < Qr; ) {
    const o = J2[i];
    if (!o) return { ok: !1, reason: `バージョン ${i} の migration が未定義です` };
    ((r = o(r)), (i = typeof r.schemaVersion == 'number' ? r.schemaVersion : i + 1));
  }
  return W2(r)
    ? { ok: !0, data: r }
    : { ok: !1, reason: 'migration 後のデータが SaveData の形をしていません' };
}
function e3(l) {
  return {
    guildName: l.guild.name,
    deepestReached: l.towerState.record.deepestReached,
    memberCount: l.guild.members.length,
    savedAt: l.savedAt,
  };
}
function xh() {
  return {
    guildName: '(破損データ)',
    deepestReached: 0,
    memberCount: 0,
    savedAt: 0,
    corrupted: !0,
  };
}
const t3 = 'sekaiju-like-game',
  l3 = 1,
  ss = 'saves',
  Od = 'main';
let Uu = null;
function Rd() {
  return (
    Uu ||
      (Uu = Y2(t3, l3, {
        upgrade(l) {
          l.objectStoreNames.contains(ss) || l.createObjectStore(ss);
        },
      })),
    Uu
  );
}
async function $u(l) {
  const i = { ...l, savedAt: Date.now() };
  return (await (await Rd()).put(ss, F2(i), Od), i);
}
async function a3() {
  const i = await (await Rd()).get(ss, Od);
  return i === void 0 ? { ok: !1, reason: 'empty' } : Ig(i);
}
async function n3() {
  const i = await (await Rd()).get(ss, Od);
  if (i === void 0) return null;
  const r = Ig(i);
  if (!r.ok) return xh();
  try {
    return e3(r.data);
  } catch {
    return xh();
  }
}
const Mg = { save: null, saving: !1 };
function i3(l, i) {
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
      return { ...Mg };
  }
}
const Og = S.createContext(null);
function s3(l) {
  const i = S.useRef(l);
  return ((i.current = l), i);
}
function r3({ children: l }) {
  const [i, r] = S.useReducer(i3, Mg),
    o = s3(i),
    u = S.useCallback(async (k) => {
      const L = R2(k),
        N = await $u(L);
      r({ type: 'load', save: N });
    }, []),
    m = S.useCallback(async () => {
      const k = await a3();
      return k.ok ? (r({ type: 'load', save: k.data }), { ok: !0 }) : { ok: !1, reason: k.reason };
    }, []),
    f = S.useCallback((k) => {
      r({ type: 'updateSave', updater: k });
    }, []),
    h = S.useCallback(
      async (k) => {
        const L = o.current.save;
        if (!L) return;
        const N = k(L);
        (r({ type: 'setSave', save: N }), r({ type: 'saving', saving: !0 }));
        try {
          const M = await $u(N);
          r({ type: 'setSave', save: M });
        } finally {
          r({ type: 'saving', saving: !1 });
        }
      },
      [o]
    ),
    p = S.useCallback(async () => {
      const { save: k } = o.current;
      if (k) {
        r({ type: 'saving', saving: !0 });
        try {
          const L = await $u(k);
          r({ type: 'setSave', save: L });
        } finally {
          r({ type: 'saving', saving: !1 });
        }
      }
    }, [o]),
    g = S.useCallback(() => {
      r({ type: 'clear' });
    }, []),
    y = S.useMemo(
      () => ({
        ...i,
        startNewGame: u,
        continueGame: m,
        applySave: f,
        applyAndPersist: h,
        persist: p,
        exitToTitle: g,
      }),
      [i, u, m, f, h, p, g]
    );
  return d.jsx(Og.Provider, { value: y, children: l });
}
function Kl() {
  const l = S.useContext(Og);
  if (!l) throw new Error('useGameState は GameStateProvider の内側で使ってください');
  return l;
}
const o3 = {
    slash: '斬',
    pierce: '突',
    bash: '壊',
    fire: '火',
    ice: '氷',
    volt: '雷',
    almighty: '無',
  },
  c3 = {
    enemyOne: '敵単体',
    enemyRow: '敵1列',
    enemyAll: '敵全体',
    allyOne: '味方単体',
    allyAll: '味方全体',
    self: '自分',
  },
  u3 = {
    patk: '物攻',
    pdef: '物防',
    matk: '魔攻',
    mdef: '魔防',
    acc: '命中',
    eva: '回避',
    elementResist: '属性耐性',
  },
  d3 = {
    poison: '毒',
    paralysis: '麻痺',
    sleep: '睡眠',
    blind: '盲目',
    headBind: '頭封じ',
    armBind: '腕封じ',
    legBind: '脚封じ',
  };
function m3(l, i) {
  switch (l.kind) {
    case 'damage':
      return `${l.statBase === 'str' ? '物理' : '魔法'}威力${Math.round(l.power(i) * 100)}%${l.hits && l.hits > 1 ? `×${l.hits}` : ''}`;
    case 'heal':
      return `HP回復${l.amount(i)}`;
    case 'restoreTp':
      return `TP回復${l.amount(i)}`;
    case 'buff':
      return `${u3[l.stat]}${l.modifier(i) < 1 ? '↓' : '↑'}`;
    case 'ailment':
      return `${d3[l.ailment] ?? l.ailment}${Math.round(l.chance(i) * 100)}%`;
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
function zr(l, i, r, o = 1) {
  return `${o3[l] ?? l}・${c3[i] ?? i}／${r.map((u) => m3(u, o)).join('・')}`;
}
const _3 = {
  hp: 'HP',
  tp: 'TP',
  str: '腕力',
  vit: '体力',
  agi: '敏捷',
  int: '知力',
  mnd: '精神',
  luc: '幸運',
};
function f3(l) {
  const i = {};
  for (const r of [...l.allies, ...l.enemies, ...l.summons])
    i[r.id] = { hp: r.hp, isDown: r.isDown };
  return i;
}
const p3 = () => {
    var Ta, ys, ai, bs;
    const l = pl(),
      { save: i, applyAndPersist: r } = Kl(),
      o = S.useRef(null),
      [u, m] = S.useState(null),
      [f, h] = S.useState({}),
      [p, g] = S.useState(null),
      [y, k] = S.useState(!1),
      [L, N] = S.useState(!1),
      [M, G] = S.useState(null),
      [B, j] = S.useState({}),
      [A, V] = S.useState(null),
      [U, oe] = S.useState(!1),
      [W, x] = S.useState(null),
      [q, Z] = S.useState(null),
      [ee, te] = S.useState(null),
      [ce, ve] = S.useState(new Set()),
      [D, fe] = S.useState(!0),
      [O, le] = S.useState(null),
      [re, ke] = S.useState([]);
    (S.useEffect(() => {
      if (u || !(i != null && i.diveState)) return;
      const C = i.diveState.depth,
        ae = (i.masterSeed ^ (C * 2654435761) ^ (i.towerState.record.totalDives * 40503)) >>> 0;
      o.current = Sa(ae);
      const ne = i.diveState.pendingFoeBattle;
      m(ne ? sh(i, [ne.enemyId], ne.firstStrike) : sh(i, Sx(C, o.current)));
    }, [i, u]),
      S.useEffect(() => {
        if (!D) return;
        const C = setTimeout(() => fe(!1), 700);
        return () => clearTimeout(C);
      }, [D]));
    const R = S.useCallback(
        (C) => {
          if (!u || !o.current || u.outcome !== 'ongoing') return;
          const ae = f3(u),
            ne = t2(u, C, o.current);
          (m(ne),
            h({}),
            j({}),
            k(!1),
            N(!1),
            V(null),
            x(null),
            Z(null),
            g(null),
            ve(new Set()),
            te(ne.log.length > 0 ? { base: ae, revealed: 0 } : null));
        },
        [u]
      ),
      b = S.useRef(!1);
    (S.useEffect(() => {
      !u ||
        !o.current ||
        b.current ||
        D ||
        (u.turn === 1 &&
          u.firstStrike === 'ambush' &&
          u.outcome === 'ongoing' &&
          ((b.current = !0), R([])));
    }, [u, D, R]),
      S.useEffect(() => {
        if (!u || !ee) return;
        if (ee.revealed >= u.log.length) {
          const ae = setTimeout(() => {
            (te(null), ve(new Set()));
          }, 200);
          return () => clearTimeout(ae);
        }
        const C = setTimeout(
          () => {
            var rt, kt;
            const ae = ee.revealed,
              ne = (rt = u.log[ae]) == null ? void 0 : rt.snapshot,
              ue =
                ae > 0
                  ? (((kt = u.log[ae - 1]) == null ? void 0 : kt.snapshot) ?? ee.base)
                  : ee.base,
              Te = new Set();
            if (ne)
              for (const Ja of Object.keys(ne)) {
                const Jl = ue == null ? void 0 : ue[Ja];
                Jl && (ne[Ja].hp < Jl.hp || (ne[Ja].isDown && !Jl.isDown)) && Te.add(Ja);
              }
            (ve(Te), te({ ...ee, revealed: ee.revealed + 1 }));
          },
          ee.revealed === 0 ? 240 : 540
        );
        return () => clearTimeout(C);
      }, [u, ee]));
    const w = S.useMemo(() => (u && u.outcome === 'win' && i ? l2(i, u) : []), [u, i]);
    S.useEffect(() => {
      (u == null ? void 0 : u.outcome) === 'win' &&
        !ee &&
        ke(w.filter((C) => C.toLevel > C.fromLevel));
    }, [u == null ? void 0 : u.outcome, ee, w]);
    const X = S.useMemo(() => (u == null ? void 0 : u.enemies.filter((C) => !C.isDown)) ?? [], [u]),
      K = S.useMemo(() => (u == null ? void 0 : u.allies.filter((C) => !C.isDown)) ?? [], [u]);
    (S.useEffect(() => {
      X.length > 0 && !X.some((C) => C.id === M) && G(X[0].id);
    }, [X, M]),
      S.useEffect(() => {
        if ((u == null ? void 0 : u.outcome) !== 'ongoing' || (p && K.some((ae) => ae.id === p)))
          return;
        const C = K.find((ae) => !f[ae.id]) ?? null;
        g(C ? C.id : null);
      }, [u, K, p, f]));
    const se =
        K.length > 0 &&
        K.every((C) => {
          var ne;
          const ae = f[C.id];
          return ae
            ? ae.kind === 'skill' &&
              ((ne = wt[ae.skillId]) == null ? void 0 : ne.target) === 'allyOne'
              ? B[C.id] !== void 0
              : !0
            : !1;
        }),
      pe = S.useCallback(
        (C, ae, ne) => {
          var rt;
          if (
            ae.kind === 'skill' &&
            ((rt = wt[ae.skillId]) == null ? void 0 : rt.target) === 'allyOne' &&
            !ne
          ) {
            (k(!1), N(!1), V(ae.skillId), h((kt) => ({ ...kt, [C]: ae })));
            return;
          }
          const ue = { ...f, [C]: ae };
          (h(ue),
            ae.kind === 'skill' && ne && j((kt) => ({ ...kt, [C]: ne })),
            k(!1),
            N(!1),
            V(null));
          const Te = K.find((kt) => kt.id !== C && !ue[kt.id]);
          g(Te ? Te.id : null);
        },
        [f, K]
      ),
      be = S.useCallback(
        async (C) => {
          (oe(!0),
            le(C.outcome === 'lose' ? 'lose' : C.outcome === 'fled' ? 'fled' : 'win'),
            await new Promise((ne) => setTimeout(ne, 460)));
          const ae = C.outcome === 'win';
          C.outcome === 'lose'
            ? (await r((ne) => is(uh(ne, C))), l('/town'))
            : (await r((ne) => w2(uh(ne, C), ae)), l('/dungeon'));
        },
        [r, l]
      ),
      Re = S.useCallback(() => {
        var C;
        (h({}),
          j({}),
          k(!1),
          N(!1),
          V(null),
          x(null),
          Z(null),
          g(((C = K[0]) == null ? void 0 : C.id) ?? null));
      }, [K]),
      De = S.useCallback(() => {
        var ne;
        if (!u || !o.current || u.outcome !== 'ongoing') return;
        const C = M ?? ((ne = X[0]) == null ? void 0 : ne.id) ?? '',
          ae = K.map((ue) => {
            const Te = f[ue.id] ?? { kind: 'attack' };
            if (Te.kind === 'guard') return { kind: 'guard', actorId: ue.id };
            if (Te.kind === 'skill') {
              const rt = wt[Te.skillId];
              let kt;
              return (
                (rt == null ? void 0 : rt.target) === 'allyOne'
                  ? (kt = B[ue.id] ?? ue.id)
                  : (rt == null ? void 0 : rt.target) === 'allyAll' ||
                      (rt == null ? void 0 : rt.target) === 'self'
                    ? (kt = ue.id)
                    : (kt = C),
                { kind: 'skill', actorId: ue.id, skillId: Te.skillId, targetId: kt }
              );
            }
            return Te.kind === 'item'
              ? { kind: 'item', actorId: ue.id, itemId: Te.itemId, targetId: ue.id }
              : { kind: 'attack', actorId: ue.id, targetId: C };
          });
        if (W) {
          const ue = Un[W.unionSkillId],
            Te =
              (ue == null ? void 0 : ue.target) === 'enemyOne' ||
              (ue == null ? void 0 : ue.target) === 'enemyRow' ||
              (ue == null ? void 0 : ue.target) === 'enemyAll';
          ae.unshift({ kind: 'union', ...W, targetId: Te ? C : W.targetId });
        }
        R(ae);
      }, [u, f, B, M, K, X, W, R]),
      hl = S.useCallback(() => {
        if (!u || !o.current || u.outcome !== 'ongoing') return;
        const C = K[0];
        C && R([{ kind: 'flee', actorId: C.id }]);
      }, [u, K, R]);
    if (!i || !i.diveState) return d.jsx(_l, { to: '/town', replace: !0 });
    if (!u) return d.jsx('div', { className: P.layout, children: '戦闘準備中...' });
    const il = (C) => {
        const ae = i.guild.members.find((ne) => ne.id === C.id);
        return ae
          ? Object.keys(ae.learnedSkills).filter((ne) => {
              var ue;
              return (
                ne in wt &&
                C.tp >= wt[ne].tpCost(((ue = C.skillLevels) == null ? void 0 : ue[ne]) ?? 1)
              );
            })
          : [];
      },
      Sl = () => {
        const C = (ne) =>
            Object.values(f).filter((ue) => ue.kind === 'item' && ue.itemId === ne).length,
          ae = (ne) => u.consumedItems.filter((ue) => ue === ne).length;
        return i.guild.storage
          .filter((ne) => {
            var ue, Te;
            return (Te = (ue = tt[ne.itemId]) == null ? void 0 : ue.useContext) == null
              ? void 0
              : Te.includes('battle');
          })
          .map((ne) => ({
            id: ne.itemId,
            remaining: xd(i, ne.itemId) - ae(ne.itemId) - C(ne.itemId),
          }))
          .filter((ne) => ne.remaining > 0);
      },
      gs = (C) => {
        var ne, ue;
        const ae = f[C.id];
        return ae
          ? ae.kind === 'attack'
            ? '攻撃'
            : ae.kind === 'guard'
              ? '防御'
              : ae.kind === 'item'
                ? (((ne = tt[ae.itemId]) == null ? void 0 : ne.name) ?? 'どうぐ')
                : (((ue = wt[ae.skillId]) == null ? void 0 : ue.name) ?? 'スキル')
          : '';
      },
      gl = (C) => {
        const ae = (ue) => ue === 'headBind' || ue === 'armBind' || ue === 'legBind';
        let ne = '';
        return (
          C.ailments.some((ue) => ae(ue.type)) && (ne += ' 🔒'),
          C.ailments.some((ue) => !ae(ue.type)) && (ne += ' 🌀'),
          ne
        );
      },
      Wn = (C) => {
        var ne;
        const ae = i.guild.members.find((ue) => ue.id === C.id);
        return ae ? (((ne = ze[ae.classId]) == null ? void 0 : ne.name) ?? '') : '';
      },
      wa = ee
        ? ee.revealed > 0
          ? (((Ta = u.log[ee.revealed - 1]) == null ? void 0 : Ta.snapshot) ?? ee.base)
          : ee.base
        : null,
      Ka = (C) => (wa == null ? void 0 : wa[C.id]) ?? { hp: C.hp, isDown: C.isDown },
      ei = (C) => {
        var ue;
        const ae = i.guild.members.find((Te) => Te.id === C.id);
        if (!ae) return null;
        const ne =
          (ue = Ke[ae.raceId]) == null
            ? void 0
            : ue.raceSkillTree.skills.find((Te) => Te.skillId in Un);
        return !ne || !(ne.skillId in ae.learnedSkills) ? null : (Un[ne.skillId] ?? null);
      },
      Za = (C, ae, ne) => {
        var rt;
        const Te =
          ae.target === 'enemyOne' || ae.target === 'enemyRow' || ae.target === 'enemyAll'
            ? (M ?? ((rt = X[0]) == null ? void 0 : rt.id) ?? '')
            : C;
        (x({ actorId: C, unionSkillId: ae.id, participantIds: ne, targetId: Te }), Z(null));
      },
      ti = (C, ae) => {
        ae.requiredParticipants <= 1 ? Za(C.id, ae, [C.id]) : Z({ actorId: C.id, def: ae });
      },
      lt = p ? K.find((C) => C.id === p) : void 0,
      Zl = A !== null,
      mo = ((ys = u.enemies.find((C) => C.id === M)) == null ? void 0 : ys.name) ?? '-',
      Nt = qd(u),
      ks = (C) => {
        const ae = Ka(C),
          ne = Zl && p !== null && B[p] === C.id,
          ue = Zl && !C.isDown;
        return d.jsxs(
          'button',
          {
            type: 'button',
            className: [
              P.card,
              ae.isDown ? P.down : '',
              ue ? P.allySelectable : p === C.id ? P.cardActive : '',
              ne ? P.allyTargeted : '',
              f[C.id] && !Zl ? P.cardDecided : '',
              ce.has(C.id) ? P.flash : '',
            ].join(' '),
            disabled: C.isDown || u.outcome !== 'ongoing' || !!ee,
            onClick: () => {
              Zl && p ? pe(p, { kind: 'skill', skillId: A }, C.id) : (g(C.id), k(!1), N(!1));
            },
            children: [
              d.jsxs('div', {
                className: P.cardName,
                children: [
                  C.name,
                  C.unionGauge >= 100 ? d.jsx('span', { className: P.uni, children: '★' }) : null,
                  gl(C),
                ],
              }),
              d.jsx('div', { className: P.cardJob, children: Wn(C) }),
              d.jsx(On, { value: ae.hp, max: C.maxHp, color: '#4caf50', showValue: !1 }),
              d.jsx(On, { value: C.tp, max: C.maxTp, color: '#2196f3', showValue: !1 }),
              d.jsxs('div', {
                className: P.cardNums,
                children: ['HP ', Math.max(0, ae.hp), ' · TP ', C.tp],
              }),
              d.jsxs('div', {
                className: P.gaugeRow,
                children: [
                  d.jsx(On, { value: C.unionGauge, max: 100, color: '#ff9800', showValue: !1 }),
                  d.jsxs('span', { className: P.gaugeLabel, children: ['U ', C.unionGauge, '%'] }),
                ],
              }),
              f[C.id] ? d.jsxs('div', { className: P.cardCmd, children: ['▶ ', gs(C)] }) : null,
            ],
          },
          C.id
        );
      },
      vs = u.allies.filter((C) => C.row === 'front'),
      li = u.allies.filter((C) => C.row === 'back');
    return d.jsxs('div', {
      className: P.layout,
      children: [
        d.jsx('div', {
          className: P.enemies,
          children: u.enemies.map((C) => {
            const ae = Ka(C),
              ne = M === C.id,
              ue = C.enemyId,
              Te = ue ? Tt[ue] : void 0;
            return d.jsxs(
              'button',
              {
                type: 'button',
                className: `${P.enemy} ${ae.isDown ? P.down : ''} ${ne ? P.targeted : ''} ${ce.has(C.id) ? P.flash : ''}`,
                disabled: C.isDown || !!ee || Zl,
                onClick: () => G(C.id),
                children: [
                  d.jsxs('span', { className: P.enemyName, children: [C.name, gl(C)] }),
                  d.jsx(On, { value: ae.hp, max: C.maxHp, color: '#e57373', showValue: !1 }),
                  ne && Te
                    ? d.jsx('div', {
                        className: P.enemyResist,
                        children: d.jsx(Yn, {
                          elementResist: Te.resist,
                          ailmentResist: ue ? vd(ue) : void 0,
                          compact: !0,
                        }),
                      })
                    : null,
                ],
              },
              C.id
            );
          }),
        }),
        u.summons.length > 0
          ? d.jsx('div', {
              className: P.summons,
              children: u.summons.map((C) => {
                const ae = Ka(C);
                return d.jsxs(
                  'div',
                  {
                    className: `${P.summon} ${ae.isDown ? P.down : ''} ${ce.has(C.id) ? P.flash : ''}`,
                    children: [
                      d.jsxs('span', { className: P.summonName, children: ['🐾 ', C.name] }),
                      d.jsx(On, { value: ae.hp, max: C.maxHp, color: '#8d6e63', showValue: !1 }),
                      d.jsxs('span', {
                        className: P.summonHp,
                        children: ['HP ', Math.max(0, ae.hp)],
                      }),
                    ],
                  },
                  C.id
                );
              }),
            })
          : null,
        d.jsxs('div', {
          className: P.party,
          children: [
            d.jsx('div', { className: P.rowTag, children: '前衛' }),
            d.jsx('div', { className: P.cardRow, children: vs.map(ks) }),
            d.jsx('div', { className: P.rowTag, children: '後衛（近接ダメージ -30%）' }),
            d.jsx('div', {
              className: P.cardRow,
              children:
                li.length > 0
                  ? li.map(ks)
                  : d.jsx('div', { className: P.empty, children: '（なし）' }),
            }),
          ],
        }),
        ee
          ? d.jsxs('div', {
              className: P.playback,
              children: [
                d.jsx('span', { className: P.playbackHint, children: '戦況を再生中…' }),
                d.jsx('button', {
                  type: 'button',
                  className: P.skip,
                  onClick: () => {
                    (te(null), ve(new Set()));
                  },
                  children: '▶▶ スキップ',
                }),
              ],
            })
          : u.outcome !== 'ongoing'
            ? d.jsxs('div', {
                className: P.result,
                children: [
                  d.jsx('div', {
                    className: P.resultTitle,
                    children:
                      u.outcome === 'win'
                        ? '勝利！'
                        : u.outcome === 'fled'
                          ? '逃走した'
                          : '全滅...',
                  }),
                  u.outcome === 'win'
                    ? d.jsxs(d.Fragment, {
                        children: [
                          d.jsxs('div', {
                            className: P.resultBody,
                            children: ['経験値 ', Nt.exp, ' ／ ', Nt.gold, ' G を獲得'],
                          }),
                          d.jsx('div', {
                            className: P.expList,
                            children: w.map((C) =>
                              d.jsxs(
                                'div',
                                {
                                  className: P.expRow,
                                  children: [
                                    d.jsxs('span', {
                                      className: P.expName,
                                      children: [
                                        C.name,
                                        d.jsxs('span', {
                                          className: P.expLv,
                                          children: [
                                            'Lv',
                                            C.toLevel,
                                            C.toLevel > C.fromLevel
                                              ? d.jsxs('span', {
                                                  className: P.expUp,
                                                  children: [' ↑', C.toLevel - C.fromLevel],
                                                })
                                              : null,
                                          ],
                                        }),
                                      ],
                                    }),
                                    d.jsx(On, {
                                      value: C.expToNext > 0 ? C.exp : 1,
                                      max: C.expToNext > 0 ? C.expToNext : 1,
                                      color: '#ffca28',
                                      showValue: !1,
                                    }),
                                    d.jsxs('span', {
                                      className: P.expNum,
                                      children: [
                                        C.expToNext > 0
                                          ? `次まで ${Math.max(0, C.expToNext - C.exp)}`
                                          : 'MAX',
                                        C.gainedExp > 0 ? `（+${C.gainedExp}）` : '',
                                      ],
                                    }),
                                  ],
                                },
                                C.charId
                              )
                            ),
                          }),
                        ],
                      })
                    : u.outcome === 'lose'
                      ? d.jsx('div', { className: P.resultBody, children: '拠点へ帰還する' })
                      : null,
                  d.jsx('button', {
                    type: 'button',
                    className: P.primary,
                    disabled: U || re.length > 0,
                    onClick: () => void be(u),
                    children: 'つづける',
                  }),
                ],
              })
            : d.jsxs('div', {
                className: P.command,
                children: [
                  Zl
                    ? d.jsxs('div', {
                        className: `${P.target} ${P.targetAlly}`,
                        children: [
                          ((ai = wt[A]) == null ? void 0 : ai.name) ?? 'スキル',
                          ': 味方をタップで対象を選択',
                        ],
                      })
                    : d.jsxs('div', {
                        className: P.target,
                        children: ['対象: ', mo, '（敵をタップで変更）'],
                      }),
                  W
                    ? (() => {
                        const C = Un[W.unionSkillId];
                        return d.jsxs('div', {
                          className: P.unionBanner,
                          children: [
                            d.jsxs('div', {
                              className: P.unionBannerHead,
                              children: [
                                '⚡ ユニオン予約: ',
                                C == null ? void 0 : C.name,
                                d.jsx('button', {
                                  type: 'button',
                                  className: P.unionCancel,
                                  onClick: () => x(null),
                                  children: '取消',
                                }),
                              ],
                            }),
                            C
                              ? d.jsxs('div', {
                                  className: P.unionBannerDesc,
                                  children: [
                                    zr(C.element, C.target, C.effects),
                                    d.jsx('br', {}),
                                    C.description,
                                  ],
                                })
                              : null,
                          ],
                        });
                      })()
                    : null,
                  lt
                    ? d.jsxs(d.Fragment, {
                        children: [
                          d.jsxs('div', {
                            className: P.cmdHead,
                            children: [lt.name, ' のコマンド'],
                          }),
                          A
                            ? d.jsxs('div', {
                                className: P.skillList,
                                children: [
                                  d.jsxs('div', {
                                    className: P.allyTargetHint,
                                    children: [
                                      d.jsx('strong', {
                                        children: (bs = wt[A]) == null ? void 0 : bs.name,
                                      }),
                                      ' の対象を選択',
                                      d.jsx('br', {}),
                                      d.jsx('span', {
                                        className: P.allyTargetSub,
                                        children: '上の味方カードをタップしてください',
                                      }),
                                    ],
                                  }),
                                  K.map((C) =>
                                    d.jsx(
                                      'button',
                                      {
                                        type: 'button',
                                        className: [
                                          P.skillBtn,
                                          B[lt.id] === C.id ? P.allyTargetSelected : '',
                                        ].join(' '),
                                        onClick: () => {
                                          pe(lt.id, { kind: 'skill', skillId: A }, C.id);
                                        },
                                        children: d.jsxs('span', {
                                          className: P.skillTop,
                                          children: [
                                            d.jsx('span', {
                                              className: P.skillName,
                                              children: C.name,
                                            }),
                                            d.jsxs('span', {
                                              className: P.tp,
                                              children: [
                                                'HP ',
                                                Math.max(0, Ka(C).hp),
                                                '/',
                                                C.maxHp,
                                              ],
                                            }),
                                          ],
                                        }),
                                      },
                                      C.id
                                    )
                                  ),
                                  d.jsx('button', {
                                    type: 'button',
                                    className: P.menuBack,
                                    onClick: () => {
                                      (V(null),
                                        h((C) => {
                                          const ae = { ...C };
                                          return (delete ae[lt.id], ae);
                                        }));
                                    },
                                    children: 'もどる',
                                  }),
                                ],
                              })
                            : y
                              ? d.jsxs('div', {
                                  className: P.skillList,
                                  children: [
                                    il(lt).map((C) => {
                                      var ae, ne;
                                      return d.jsxs(
                                        'button',
                                        {
                                          type: 'button',
                                          className: P.skillBtn,
                                          onClick: () => pe(lt.id, { kind: 'skill', skillId: C }),
                                          children: [
                                            d.jsxs('span', {
                                              className: P.skillTop,
                                              children: [
                                                d.jsx('span', {
                                                  className: P.skillName,
                                                  children: wt[C].name,
                                                }),
                                                d.jsxs('span', {
                                                  className: P.tp,
                                                  children: [
                                                    'TP ',
                                                    wt[C].tpCost(
                                                      ((ae = lt.skillLevels) == null
                                                        ? void 0
                                                        : ae[C]) ?? 1
                                                    ),
                                                  ],
                                                }),
                                              ],
                                            }),
                                            d.jsx('span', {
                                              className: P.skillSummary,
                                              children: zr(
                                                wt[C].element,
                                                wt[C].target,
                                                wt[C].effects
                                              ),
                                            }),
                                            d.jsx('span', {
                                              className: P.skillDesc,
                                              children:
                                                ((ne = $n[C]) == null ? void 0 : ne.description) ??
                                                '',
                                            }),
                                          ],
                                        },
                                        C
                                      );
                                    }),
                                    il(lt).length === 0
                                      ? d.jsx('div', {
                                          className: P.empty,
                                          children: '使えるスキルがない',
                                        })
                                      : null,
                                    d.jsx('button', {
                                      type: 'button',
                                      className: P.menuBack,
                                      onClick: () => k(!1),
                                      children: 'もどる',
                                    }),
                                  ],
                                })
                              : L
                                ? d.jsxs('div', {
                                    className: P.skillList,
                                    children: [
                                      Sl().map(({ id: C, remaining: ae }) =>
                                        d.jsxs(
                                          'button',
                                          {
                                            type: 'button',
                                            className: P.skillBtn,
                                            onClick: () => pe(lt.id, { kind: 'item', itemId: C }),
                                            children: [
                                              d.jsx('span', {
                                                className: P.skillTop,
                                                children: d.jsxs('span', {
                                                  className: P.skillName,
                                                  children: [tt[C].name, ' ×', ae],
                                                }),
                                              }),
                                              d.jsx('span', {
                                                className: P.skillDesc,
                                                children: tt[C].description,
                                              }),
                                            ],
                                          },
                                          C
                                        )
                                      ),
                                      Sl().length === 0
                                        ? d.jsx('div', {
                                            className: P.empty,
                                            children: '使える道具がない',
                                          })
                                        : null,
                                      d.jsx('button', {
                                        type: 'button',
                                        className: P.menuBack,
                                        onClick: () => N(!1),
                                        children: 'もどる',
                                      }),
                                    ],
                                  })
                                : q
                                  ? d.jsxs('div', {
                                      className: P.skillList,
                                      children: [
                                        d.jsxs('div', {
                                          className: P.unionHint,
                                          children: [
                                            d.jsx('strong', { children: q.def.name }),
                                            d.jsx('br', {}),
                                            zr(q.def.element, q.def.target, q.def.effects),
                                            d.jsx('br', {}),
                                            q.def.description,
                                            d.jsx('br', {}),
                                            '協力者を選択（あと',
                                            q.def.requiredParticipants - 1,
                                            '人。各自ゲージ',
                                            q.def.gaugeCostPerParticipant,
                                            '消費）',
                                          ],
                                        }),
                                        K.filter((C) => C.id !== q.actorId).map((C) =>
                                          d.jsx(
                                            'button',
                                            {
                                              type: 'button',
                                              className: P.skillBtn,
                                              onClick: () =>
                                                Za(q.actorId, q.def, [q.actorId, C.id]),
                                              children: d.jsxs('span', {
                                                className: P.skillTop,
                                                children: [
                                                  d.jsx('span', {
                                                    className: P.skillName,
                                                    children: C.name,
                                                  }),
                                                  d.jsxs('span', {
                                                    className: P.tp,
                                                    children: ['ゲージ ', C.unionGauge],
                                                  }),
                                                ],
                                              }),
                                            },
                                            C.id
                                          )
                                        ),
                                        K.filter((C) => C.id !== q.actorId).length === 0
                                          ? d.jsx('div', {
                                              className: P.empty,
                                              children: '協力できる味方がいない',
                                            })
                                          : null,
                                        d.jsx('button', {
                                          type: 'button',
                                          className: P.menuBack,
                                          onClick: () => Z(null),
                                          children: 'もどる',
                                        }),
                                      ],
                                    })
                                  : d.jsxs(d.Fragment, {
                                      children: [
                                        (() => {
                                          const C = ei(lt);
                                          return !C || lt.unionGauge < 100 || W
                                            ? null
                                            : d.jsxs('div', {
                                                className: P.unionInfo,
                                                children: [
                                                  '⚡ ',
                                                  d.jsx('strong', { children: C.name }),
                                                  ' 発動可（ゲージ100%）',
                                                  d.jsx('br', {}),
                                                  zr(C.element, C.target, C.effects),
                                                ],
                                              });
                                        })(),
                                        d.jsxs('div', {
                                          className: P.menu,
                                          children: [
                                            d.jsx('button', {
                                              type: 'button',
                                              className: P.menuBtn,
                                              onClick: () => pe(lt.id, { kind: 'attack' }),
                                              children: '攻撃',
                                            }),
                                            d.jsx('button', {
                                              type: 'button',
                                              className: P.menuBtn,
                                              onClick: () => pe(lt.id, { kind: 'guard' }),
                                              children: '防御',
                                            }),
                                            d.jsx('button', {
                                              type: 'button',
                                              className: P.menuBtn,
                                              disabled: il(lt).length === 0,
                                              onClick: () => k(!0),
                                              children: 'スキル',
                                            }),
                                            d.jsx('button', {
                                              type: 'button',
                                              className: P.menuBtn,
                                              disabled: Sl().length === 0,
                                              onClick: () => N(!0),
                                              children: 'どうぐ',
                                            }),
                                            (() => {
                                              const C = ei(lt);
                                              return !C || lt.unionGauge < 100 || W
                                                ? null
                                                : d.jsx('button', {
                                                    type: 'button',
                                                    className: `${P.menuBtn} ${P.unionBtn}`,
                                                    onClick: () => ti(lt, C),
                                                    children: '⚡ユニオン',
                                                  });
                                            })(),
                                            d.jsx('button', {
                                              type: 'button',
                                              className: P.menuBtn,
                                              onClick: hl,
                                              children: '逃走',
                                            }),
                                          ],
                                        }),
                                      ],
                                    }),
                        ],
                      })
                    : d.jsxs('div', {
                        className: P.execRow,
                        children: [
                          d.jsx('button', {
                            type: 'button',
                            className: P.redo,
                            onClick: Re,
                            children: 'やり直す',
                          }),
                          d.jsx('button', {
                            type: 'button',
                            className: P.primary,
                            disabled: !se,
                            onClick: De,
                            children: '実行',
                          }),
                        ],
                      }),
                ],
              }),
        d.jsx('div', {
          className: P.log,
          children: (() => {
            const C = ee ? u.log.slice(0, ee.revealed) : u.log;
            return C.length === 0
              ? d.jsxs('div', {
                  className: P.logLine,
                  children: ['てきが あらわれた！（', u.turn, ' ターン目）'],
                })
              : C.map((ae, ne) =>
                  d.jsx(
                    'div',
                    {
                      className: `${P.logLine} ${ee && ne === C.length - 1 ? P.logLineNew : ''}`,
                      children: ae.text,
                    },
                    ne
                  )
                );
          })(),
        }),
        re.length > 0
          ? (() => {
              const C = re[0];
              return d.jsx('div', {
                className: P.dialogOverlay,
                children: d.jsxs('div', {
                  className: P.dialog,
                  children: [
                    d.jsx('div', { className: P.dialogTitle, children: 'レベルアップ！' }),
                    d.jsxs('div', {
                      className: P.dialogName,
                      children: [
                        C.name,
                        ' は Lv',
                        C.fromLevel,
                        ' → ',
                        d.jsxs('strong', { children: ['Lv', C.toLevel] }),
                        ' になった！',
                      ],
                    }),
                    d.jsx('div', {
                      className: P.dialogStats,
                      children: Object.entries(C.statGains).map(([ae, ne]) =>
                        d.jsxs(
                          'span',
                          { className: P.dialogStat, children: [_3[ae] ?? ae, ' +', ne] },
                          ae
                        )
                      ),
                    }),
                    d.jsx('button', {
                      type: 'button',
                      className: P.primary,
                      onClick: () => ke((ae) => ae.slice(1)),
                      children: 'OK',
                    }),
                  ],
                }),
              });
            })()
          : null,
        D ? d.jsx('div', { className: P.fxIntro }) : null,
        O ? d.jsx('div', { className: `${P.fxOutro} ${O === 'lose' ? P.fxLose : ''}` }) : null,
      ],
    });
  },
  h3 = '_layout_1qamj_1',
  g3 = '_head_1qamj_11',
  k3 = '_title_1qamj_15',
  v3 = '_tabs_1qamj_21',
  y3 = '_tab_1qamj_21',
  b3 = '_tabActive_1qamj_38',
  x3 = '_records_1qamj_43',
  S3 = '_statBig_1qamj_48',
  w3 = '_statNum_1qamj_60',
  T3 = '_statLabel_1qamj_67',
  N3 = '_statList_1qamj_72',
  j3 = '_statRow_1qamj_76',
  E3 = '_h2_1qamj_91',
  C3 = '_bossLog_1qamj_97',
  A3 = '_bossRow_1qamj_106',
  L3 = '_codex_1qamj_114',
  q3 = '_codexSummary_1qamj_121',
  B3 = '_list_1qamj_127',
  I3 = '_row_1qamj_133',
  M3 = '_unseen_1qamj_140',
  O3 = '_info_1qamj_144',
  R3 = '_name_1qamj_150',
  D3 = '_badge_1qamj_158',
  z3 = '_sub_1qamj_167',
  H3 = '_empty_1qamj_172',
  U3 = '_rowClickable_1qamj_177',
  $3 = '_expand_1qamj_185',
  G3 = '_resistDetail_1qamj_191',
  Y3 = '_resistSection_1qamj_200',
  X3 = '_resistHead_1qamj_206',
  V3 = '_foot_1qamj_212',
  Q3 = '_back_1qamj_216',
  je = {
    layout: h3,
    head: g3,
    title: k3,
    tabs: v3,
    tab: y3,
    tabActive: b3,
    records: x3,
    statBig: S3,
    statNum: w3,
    statLabel: T3,
    statList: N3,
    statRow: j3,
    h2: E3,
    bossLog: C3,
    bossRow: A3,
    codex: L3,
    codexSummary: q3,
    list: B3,
    row: I3,
    unseen: M3,
    info: O3,
    name: R3,
    badge: D3,
    sub: z3,
    empty: H3,
    rowClickable: U3,
    expand: $3,
    resistDetail: G3,
    resistSection: Y3,
    resistHead: X3,
    foot: V3,
    back: Q3,
  };
function Rg(l) {
  const i = l.bestiary.monsters;
  return Object.values(Tt)
    .slice()
    .sort((r, o) => r.tierBand - o.tierBand || r.id.localeCompare(o.id))
    .map((r) => {
      const o = i[r.id],
        u = new Set((o == null ? void 0 : o.dropsFound) ?? []);
      return {
        id: r.id,
        name: r.name,
        tierBand: r.tierBand,
        seen: (o == null ? void 0 : o.seen) ?? !1,
        defeated: (o == null ? void 0 : o.defeated) ?? !1,
        drops: (r.drops ?? []).map((m) => {
          var f;
          return {
            itemId: m.itemId,
            name: ((f = tt[m.itemId]) == null ? void 0 : f.name) ?? m.itemId,
            found: u.has(m.itemId),
          };
        }),
      };
    });
}
function K3(l) {
  const i = Rg(l),
    r = i.length,
    o = i.filter((y) => y.seen).length,
    u = i.filter((y) => y.defeated).length;
  let m = 0,
    f = 0;
  for (const y of i) for (const k of y.drops) ((m += 1), k.found && (f += 1));
  const h = r + m,
    p = u + f,
    g = h === 0 ? 0 : Math.round((p / h) * 100);
  return {
    monstersTotal: r,
    monstersSeen: o,
    monstersDefeated: u,
    dropsTotal: m,
    dropsFound: f,
    completionPct: g,
  };
}
const Z3 = () => {
    const l = pl(),
      { save: i } = Kl(),
      [r, o] = S.useState('record'),
      [u, m] = S.useState(null);
    if (!i) return d.jsx(_l, { to: '/title', replace: !0 });
    const f = i.towerState.record,
      h = K3(i),
      p = Rg(i),
      g = (y, k) => {
        k && m((L) => (L === y ? null : y));
      };
    return d.jsxs('div', {
      className: je.layout,
      children: [
        d.jsx('header', {
          className: je.head,
          children: d.jsx('h1', { className: je.title, children: '図鑑 / 記録' }),
        }),
        d.jsxs('div', {
          className: je.tabs,
          children: [
            d.jsx('button', {
              type: 'button',
              className: `${je.tab} ${r === 'record' ? je.tabActive : ''}`,
              onClick: () => o('record'),
              children: '到達記録',
            }),
            d.jsx('button', {
              type: 'button',
              className: `${je.tab} ${r === 'codex' ? je.tabActive : ''}`,
              onClick: () => o('codex'),
              children: '図鑑',
            }),
          ],
        }),
        r === 'record'
          ? d.jsxs('div', {
              className: je.records,
              children: [
                d.jsxs('div', {
                  className: je.statBig,
                  children: [
                    d.jsx('span', { className: je.statNum, children: f.deepestReached }),
                    d.jsx('span', { className: je.statLabel, children: '最深到達階' }),
                  ],
                }),
                d.jsxs('dl', {
                  className: je.statList,
                  children: [
                    d.jsxs('div', {
                      className: je.statRow,
                      children: [
                        d.jsx('dt', { children: '最高撃破ボス階' }),
                        d.jsx('dd', {
                          children: f.highestBossDefeated > 0 ? `${f.highestBossDefeated}F` : '—',
                        }),
                      ],
                    }),
                    d.jsxs('div', {
                      className: je.statRow,
                      children: [
                        d.jsx('dt', { children: '挑戦回数' }),
                        d.jsx('dd', { children: f.totalDives }),
                      ],
                    }),
                    d.jsxs('div', {
                      className: je.statRow,
                      children: [
                        d.jsx('dt', { children: '図鑑達成率' }),
                        d.jsxs('dd', { children: [h.completionPct, '%'] }),
                      ],
                    }),
                  ],
                }),
                d.jsx('h2', { className: je.h2, children: 'ボス撃破履歴' }),
                f.bossDefeatLog.length === 0
                  ? d.jsx('p', { className: je.empty, children: 'まだボスを倒していません。' })
                  : d.jsx('ul', {
                      className: je.bossLog,
                      children: f.bossDefeatLog
                        .slice()
                        .reverse()
                        .map((y, k) =>
                          d.jsx(
                            'li',
                            {
                              className: je.bossRow,
                              children: d.jsxs('span', { children: [y.depth, 'F のボス撃破'] }),
                            },
                            k
                          )
                        ),
                    }),
              ],
            })
          : d.jsxs('div', {
              className: je.codex,
              children: [
                d.jsxs('div', {
                  className: je.codexSummary,
                  children: [
                    '撃破 ',
                    h.monstersDefeated,
                    '/',
                    h.monstersTotal,
                    '・ドロップ ',
                    h.dropsFound,
                    '/',
                    h.dropsTotal,
                  ],
                }),
                d.jsx('div', {
                  className: je.list,
                  children: p.map((y) => {
                    const k = u === y.id,
                      L = Tt[y.id];
                    return d.jsxs(
                      'div',
                      {
                        className: `${je.row} ${y.seen ? '' : je.unseen} ${y.seen ? je.rowClickable : ''}`,
                        role: y.seen ? 'button' : void 0,
                        tabIndex: y.seen ? 0 : void 0,
                        onClick: () => g(y.id, y.seen),
                        onKeyDown: (N) => {
                          (N.key === 'Enter' || N.key === ' ') && g(y.id, y.seen);
                        },
                        children: [
                          d.jsxs('div', {
                            className: je.info,
                            children: [
                              d.jsxs('span', {
                                className: je.name,
                                children: [
                                  y.seen ? y.name : '？？？',
                                  y.defeated
                                    ? d.jsx('span', { className: je.badge, children: '撃破' })
                                    : null,
                                  y.seen
                                    ? d.jsx('span', {
                                        className: je.expand,
                                        children: k ? '▲' : '▼',
                                      })
                                    : null,
                                ],
                              }),
                              d.jsxs('span', {
                                className: je.sub,
                                children: [
                                  '第',
                                  y.tierBand + 1,
                                  '帯',
                                  y.seen && y.drops.length > 0
                                    ? '・' +
                                      y.drops.map((N) => (N.found ? N.name : '？')).join(' / ')
                                    : '',
                                ],
                              }),
                            ],
                          }),
                          k && L
                            ? d.jsxs('div', {
                                className: je.resistDetail,
                                children: [
                                  d.jsxs('div', {
                                    className: je.resistSection,
                                    children: [
                                      d.jsx('span', { className: je.resistHead, children: '属性' }),
                                      d.jsx(Yn, { elementResist: L.resist, ailmentResist: void 0 }),
                                    ],
                                  }),
                                  d.jsxs('div', {
                                    className: je.resistSection,
                                    children: [
                                      d.jsx('span', {
                                        className: je.resistHead,
                                        children: '状態異常',
                                      }),
                                      d.jsx(Yn, { elementResist: void 0, ailmentResist: vd(y.id) }),
                                    ],
                                  }),
                                ],
                              })
                            : null,
                        ],
                      },
                      y.id
                    );
                  }),
                }),
              ],
            }),
        d.jsx('footer', {
          className: je.foot,
          children: d.jsx('button', {
            type: 'button',
            className: je.back,
            onClick: () => l('/town'),
            children: '拠点へ戻る',
          }),
        }),
      ],
    });
  },
  J3 = '_layout_j0tqt_1',
  P3 = '_head_j0tqt_13',
  F3 = '_depth_j0tqt_22',
  W3 = '_theme_j0tqt_28',
  eS = '_fpvWrap_j0tqt_45',
  tS = '_fpvControls_j0tqt_52',
  lS = '_fpvTurn_j0tqt_63',
  aS = '_fpvForward_j0tqt_64',
  nS = '_fpvBack_j0tqt_65',
  iS = '_menuBtn_j0tqt_99',
  sS = '_menuGold_j0tqt_112',
  rS = '_menuActions_j0tqt_118',
  oS = '_menuAction_j0tqt_118',
  cS = '_menuSectionLabel_j0tqt_135',
  uS = '_menuMember_j0tqt_141',
  dS = '_menuMemberName_j0tqt_155',
  mS = '_menuMemberJob_j0tqt_159',
  _S = '_menuMemberStat_j0tqt_166',
  fS = '_menuSp_j0tqt_171',
  pS = '_menuStats_j0tqt_178',
  hS = '_menuStat_j0tqt_178',
  gS = '_skillTabs_j0tqt_190',
  kS = '_skillTab_j0tqt_190',
  vS = '_skillTabOn_j0tqt_207',
  yS = '_mapWrap_j0tqt_213',
  bS = '_paletteHint_j0tqt_247',
  xS = '_stairs_j0tqt_256',
  SS = '_action_j0tqt_270',
  wS = '_notice_j0tqt_287',
  TS = '_itemOverlay_j0tqt_351',
  NS = '_itemPanel_j0tqt_361',
  jS = '_itemTitle_j0tqt_374',
  ES = '_itemEmpty_j0tqt_379',
  CS = '_itemRow_j0tqt_385',
  AS = '_itemName_j0tqt_393',
  LS = '_itemDesc_j0tqt_401',
  qS = '_itemTargets_j0tqt_407',
  BS = '_itemTarget_j0tqt_407',
  IS = '_itemHp_j0tqt_427',
  MS = '_itemUse_j0tqt_433',
  OS = '_itemClose_j0tqt_450',
  RS = '_confirmOverlay_j0tqt_460',
  DS = '_confirmBox_j0tqt_471',
  zS = '_confirmText_j0tqt_483',
  HS = '_confirmActions_j0tqt_490',
  US = '_confirmCancel_j0tqt_495',
  $S = '_confirmOk_j0tqt_496',
  de = {
    layout: J3,
    head: P3,
    depth: F3,
    theme: W3,
    fpvWrap: eS,
    fpvControls: tS,
    fpvTurn: lS,
    fpvForward: aS,
    fpvBack: nS,
    menuBtn: iS,
    menuGold: sS,
    menuActions: rS,
    menuAction: oS,
    menuSectionLabel: cS,
    menuMember: uS,
    menuMemberName: dS,
    menuMemberJob: mS,
    menuMemberStat: _S,
    menuSp: fS,
    menuStats: pS,
    menuStat: hS,
    skillTabs: gS,
    skillTab: kS,
    skillTabOn: vS,
    mapWrap: yS,
    paletteHint: bS,
    stairs: xS,
    action: SS,
    notice: wS,
    itemOverlay: TS,
    itemPanel: NS,
    itemTitle: jS,
    itemEmpty: ES,
    itemRow: CS,
    itemName: AS,
    itemDesc: LS,
    itemTargets: qS,
    itemTarget: BS,
    itemHp: IS,
    itemUse: MS,
    itemClose: OS,
    confirmOverlay: RS,
    confirmBox: DS,
    confirmText: zS,
    confirmActions: HS,
    confirmCancel: US,
    confirmOk: $S,
  },
  GS = '_canvas_1keax_1',
  YS = { canvas: GS },
  XS = '/sekaiju-like-game/assets/stairs-down-BjaF19rU.png',
  VS = '/sekaiju-like-game/assets/stairs-up-DhyZlujG.png';
function Dg(l) {
  if (typeof Image > 'u') return null;
  const i = new Image();
  return ((i.src = l), i);
}
const co = Dg(VS),
  uo = Dg(XS);
function lo(l) {
  return !!l && l.complete && l.naturalWidth > 0;
}
const Gu = () => lo(co) && lo(uo);
function zg() {
  const [l, i] = S.useState(Gu);
  return (
    S.useEffect(() => {
      if (Gu()) {
        i(!0);
        return;
      }
      const r = [co, uo].filter((u) => !!u),
        o = () => {
          Gu() && i(!0);
        };
      return (
        r.forEach((u) => u.addEventListener('load', o)),
        () => r.forEach((u) => u.removeEventListener('load', o))
      );
    }, []),
    l
  );
}
const QS = [
    { id: 'icon_chest', symbol: '📦', label: '宝箱' },
    { id: 'icon_foe', symbol: '👹', label: '強敵(FOE)' },
    { id: 'icon_warning', symbol: '⚠️', label: '注意' },
    { id: 'icon_door', symbol: '🚪', label: '扉/近道' },
    { id: 'icon_gather', symbol: '⛏️', label: '採集' },
    { id: 'icon_event', symbol: '❗', label: 'イベント' },
    { id: 'icon_note', symbol: '📝', label: 'メモ' },
    { id: 'icon_star', symbol: '⭐', label: '任意' },
  ],
  KS = new Map(QS.map((l) => [l.id, l]));
function ZS(l) {
  var i;
  return ((i = KS.get(l)) == null ? void 0 : i.symbol) ?? '•';
}
const Ya = {
    fog: '#cdd9b8',
    floor: '#fbfdf7',
    wall: '#4a5a3a',
    grid: '#e3ebd6',
    player: '#2196f3',
    foe: '#b0533a',
    foeAlert: '#d32f2f',
  },
  JS = {
    mining: '⛏️',
    gathering: '🌿',
    logging: '🪓',
    fishing: '🎣',
    harvest: '🌰',
    hunting: '🍖',
  },
  PS = '🍳',
  FS = ({
    floor: l,
    explored: i,
    pos: r,
    dir: o,
    icons: u = [],
    foes: m = [],
    depletedGathers: f = [],
    maxCell: h = 26,
    onCellClick: p,
  }) => {
    const g = S.useRef(null),
      y = zg(),
      k = Math.max(10, Math.min(h, Math.floor(360 / l.width))),
      L = l.width * k,
      N = l.height * k;
    S.useEffect(() => {
      const G = g.current;
      if (!G) return;
      const B = new Set(i),
        j = new Set(f),
        A = new Map(l.gatheringPoints.map((te) => [`${te.cell.x},${te.cell.y}`, te.type])),
        V = window.devicePixelRatio || 1;
      ((G.width = L * V), (G.height = N * V));
      const U = G.getContext('2d');
      if (!U) return;
      (U.scale(V, V), U.clearRect(0, 0, L, N));
      for (let te = 0; te < l.height; te++)
        for (let ce = 0; ce < l.width; ce++) {
          const ve = B.has(`${ce},${te}`);
          ((U.fillStyle = ve ? Ya.floor : Ya.fog),
            U.fillRect(ce * k, te * k, k, k),
            ve &&
              ((U.strokeStyle = Ya.grid),
              (U.lineWidth = 1),
              U.strokeRect(ce * k + 0.5, te * k + 0.5, k - 1, k - 1)));
        }
      ((U.strokeStyle = Ya.wall), (U.lineWidth = 2), (U.lineCap = 'round'));
      const oe = (te, ce, ve, D) => {
        (U.beginPath(), U.moveTo(te, ce), U.lineTo(ve, D), U.stroke());
      };
      for (let te = 0; te < l.height; te++)
        for (let ce = 0; ce < l.width; ce++) {
          if (!B.has(`${ce},${te}`)) continue;
          const ve = l.cells[te][ce],
            D = ce * k,
            fe = te * k;
          (ve.walls.N && oe(D, fe, D + k, fe),
            ve.walls.S && oe(D, fe + k, D + k, fe + k),
            ve.walls.W && oe(D, fe, D, fe + k),
            ve.walls.E && oe(D + k, fe, D + k, fe + k));
          const O = ve.event;
          if (
            (O == null ? void 0 : O.kind) === 'stairsUp' ||
            (O == null ? void 0 : O.kind) === 'stairsDown'
          ) {
            const le = O.kind === 'stairsUp' ? co : uo;
            if (lo(le)) {
              const re = k * 0.9,
                ke = D + (k - re) / 2,
                R = fe + (k - re) / 2;
              ((U.imageSmoothingEnabled = !1), U.drawImage(le, ke, R, re, re));
            }
          } else if ((O == null ? void 0 : O.kind) === 'gather') {
            const le = j.has(`${ce},${te}`),
              re = A.get(`${ce},${te}`);
            ((U.globalAlpha = le ? 0.35 : 1),
              (U.font = `${Math.floor(k * 0.7)}px sans-serif`),
              (U.textAlign = 'center'),
              (U.textBaseline = 'middle'),
              U.fillText((re && JS[re]) || '🌿', D + k / 2, fe + k / 2 + 1),
              (U.globalAlpha = 1));
          } else
            (O == null ? void 0 : O.kind) === 'cookingSpot' &&
              ((U.font = `${Math.floor(k * 0.7)}px sans-serif`),
              (U.textAlign = 'center'),
              (U.textBaseline = 'middle'),
              U.fillText(PS, D + k / 2, fe + k / 2 + 1));
        }
      ((U.font = `${Math.floor(k * 0.66)}px sans-serif`),
        (U.textAlign = 'center'),
        (U.textBaseline = 'middle'));
      for (const te of u)
        B.has(`${te.x},${te.y}`) &&
          U.fillText(ZS(te.iconId), te.x * k + k / 2, te.y * k + k / 2 + 1);
      for (const te of m) {
        if (!B.has(`${te.x},${te.y}`)) continue;
        const ce = te.x * k + k / 2,
          ve = te.y * k + k / 2;
        ((U.fillStyle = te.alerted ? Ya.foeAlert : Ya.foe),
          U.beginPath(),
          U.arc(ce, ve, k * 0.3, 0, Math.PI * 2),
          U.fill(),
          (U.fillStyle = '#ffffff'),
          (U.font = `bold ${Math.floor(k * 0.5)}px sans-serif`),
          (U.textAlign = 'center'),
          (U.textBaseline = 'middle'),
          U.fillText('!', ce, ve + 1));
      }
      const W = r.x * k + k / 2,
        x = r.y * k + k / 2,
        q = k * 0.34,
        ee = { N: -Math.PI / 2, E: 0, S: Math.PI / 2, W: Math.PI }[o];
      ((U.fillStyle = Ya.player),
        U.beginPath(),
        U.moveTo(W + Math.cos(ee) * q, x + Math.sin(ee) * q),
        U.lineTo(W + Math.cos(ee + 2.5) * q, x + Math.sin(ee + 2.5) * q),
        U.lineTo(W + Math.cos(ee - 2.5) * q, x + Math.sin(ee - 2.5) * q),
        U.closePath(),
        U.fill());
    }, [l, i, r, o, u, m, f, k, L, N, y]);
    const M = (G) => {
      if (!p) return;
      const B = G.currentTarget.getBoundingClientRect(),
        j = Math.floor(((G.clientX - B.left) / B.width) * l.width),
        A = Math.floor(((G.clientY - B.top) / B.height) * l.height);
      j >= 0 && A >= 0 && j < l.width && A < l.height && p(j, A);
    };
    return d.jsx('canvas', {
      ref: g,
      className: YS.canvas,
      style: { width: L, height: N },
      onClick: M,
    });
  },
  WS = '_gauge_1o2hx_1',
  ew = '_icon_1o2hx_11',
  tw = '_segments_1o2hx_16',
  lw = '_seg_1o2hx_16',
  aw = '_filled_1o2hx_28',
  nw = '_danger_1o2hx_32',
  Dn = { gauge: WS, icon: ew, segments: tw, seg: lw, filled: aw, danger: nw },
  iw = ({ level: l }) => {
    const i = l >= ls;
    return d.jsxs('div', {
      className: Dn.gauge,
      role: 'img',
      'aria-label': `エンカウントゲージ ${l}/${ls}`,
      children: [
        d.jsx('span', { className: Dn.icon, children: i ? '⚠' : '👣' }),
        d.jsx('div', {
          className: Dn.segments,
          children: Array.from({ length: ls }, (r, o) =>
            d.jsx(
              'span',
              { className: [Dn.seg, o < l ? Dn.filled : '', i ? Dn.danger : ''].join(' ') },
              o
            )
          ),
        }),
      ],
    });
  },
  sw = '_view_tw2v9_1',
  rw = { view: sw },
  Sh = { N: { dx: 0, dy: -1 }, E: { dx: 1, dy: 0 }, S: { dx: 0, dy: 1 }, W: { dx: -1, dy: 0 } };
function ow(l, i, r, o = 4) {
  const u = Sg(r),
    m = xg(r),
    f = [];
  let { x: h, y: p } = i;
  for (let g = 0; g < o; g++) {
    const y = Xa(l, h, p, r);
    if (
      (f.push({
        x: h,
        y: p,
        leftOpen: !l.cells[p][h].walls[u],
        rightOpen: !l.cells[p][h].walls[m],
        frontOpen: y,
        event: l.cells[p][h].event,
      }),
      !y)
    )
      break;
    ((h += Sh[r].dx), (p += Sh[r].dy));
  }
  return f;
}
const cw = {
    sky: '#26301c',
    ceiling: '#3a4a2c',
    floor: '#5d6b46',
    wall: '#8b9a6b',
    frontWall: '#7a8a5c',
    outline: '#2c3720',
  },
  uw = 0.56,
  dw = ({
    floor: l,
    pos: i,
    dir: r,
    foes: o = [],
    theme: u,
    maxDepth: m = 4,
    width: f = 358,
    height: h = 200,
  }) => {
    const p = S.useRef(null),
      g = zg();
    return (
      S.useEffect(() => {
        const y = { ...cw, ...(u ?? {}) },
          k = p.current;
        if (!k) return;
        const L = window.devicePixelRatio || 1;
        ((k.width = f * L), (k.height = h * L));
        const N = k.getContext('2d');
        if (!N) return;
        N.scale(L, L);
        const M = f,
          G = h,
          B = M / 2,
          j = G / 2,
          A = ow(l, i, r, m),
          V = (W) => {
            const x = Math.pow(uw, W);
            return {
              l: B - (M / 2) * x,
              r: B + (M / 2) * x,
              t: j - (G / 2) * x,
              b: j + (G / 2) * x,
            };
          },
          U = (W, x, q = !1) => {
            (N.beginPath(), N.moveTo(W[0][0], W[0][1]));
            for (let Z = 1; Z < W.length; Z++) N.lineTo(W[Z][0], W[Z][1]);
            (N.closePath(),
              (N.fillStyle = x),
              N.fill(),
              q && ((N.strokeStyle = y.outline), (N.lineWidth = 1), N.stroke()));
          },
          oe = (W) => `rgba(0,0,0,${Math.min(0.5, W * 0.13)})`;
        ((N.fillStyle = y.sky), N.fillRect(0, 0, M, G));
        for (let W = A.length - 1; W >= 0; W--) {
          const x = V(W),
            q = V(W + 1),
            Z = A[W];
          (U(
            [
              [x.l, x.t],
              [x.r, x.t],
              [q.r, q.t],
              [q.l, q.t],
            ],
            y.ceiling
          ),
            U(
              [
                [x.l, x.b],
                [x.r, x.b],
                [q.r, q.b],
                [q.l, q.b],
              ],
              y.floor
            ),
            U(
              [
                [x.l, x.t],
                [q.l, q.t],
                [q.l, q.b],
                [x.l, x.b],
              ],
              Z.leftOpen ? y.sky : y.wall,
              !0
            ),
            U(
              [
                [x.r, x.t],
                [q.r, q.t],
                [q.r, q.b],
                [x.r, x.b],
              ],
              Z.rightOpen ? y.sky : y.wall,
              !0
            ),
            Z.frontOpen ||
              U(
                [
                  [q.l, q.t],
                  [q.r, q.t],
                  [q.r, q.b],
                  [q.l, q.b],
                ],
                y.frontWall,
                !0
              ),
            (N.fillStyle = oe(W)),
            N.fillRect(q.l, q.t, q.r - q.l, q.b - q.t));
          const ee = Z.event;
          if (
            (ee == null ? void 0 : ee.kind) === 'stairsUp' ||
            (ee == null ? void 0 : ee.kind) === 'stairsDown'
          ) {
            const te = ee.kind === 'stairsUp' ? co : uo;
            if (lo(te)) {
              const ce = Math.max(20, (x.b - q.b) * 0.95),
                ve = B - ce / 2,
                D = (x.b + q.b) / 2 - ce / 2;
              ((N.imageSmoothingEnabled = !1), N.drawImage(te, ve, D, ce, ce));
            }
          }
          if (W > 0 && o.some((te) => te.x === Z.x && te.y === Z.y)) {
            const te = o.some((fe) => fe.x === Z.x && fe.y === Z.y && fe.alerted),
              ce = B,
              ve = (x.b + q.b) / 2 - (x.b - q.b) * 0.1,
              D = Math.max(14, (x.b - x.t) * 0.22);
            ((N.fillStyle = te ? '#d32f2f' : '#b0533a'),
              N.beginPath(),
              N.arc(ce, ve, D, 0, Math.PI * 2),
              N.fill(),
              (N.fillStyle = '#fff'),
              (N.font = `bold ${Math.floor(D * 1.3)}px sans-serif`),
              (N.textAlign = 'center'),
              (N.textBaseline = 'middle'),
              N.fillText('!', ce, ve + 1));
          }
        }
      }, [l, i, r, o, u, m, f, h, g]),
      d.jsx('canvas', { ref: p, className: rw.view, style: { width: f, height: h } })
    );
  },
  mw = '_wrap_1uoga_1',
  _w = '_scroll_1uoga_7',
  fw = '_canvas_1uoga_17',
  pw = '_edges_1uoga_21',
  hw = '_edge_1uoga_21',
  gw = '_edgeLabel_1uoga_34',
  kw = '_node_1uoga_40',
  vw = '_learned_1uoga_57',
  yw = '_maxed_1uoga_62',
  bw = '_available_1uoga_67',
  xw = '_locked_1uoga_72',
  Sw = '_selected_1uoga_76',
  ww = '_nodeName_1uoga_81',
  Tw = '_nodeCost_1uoga_92',
  Nw = '_nodeLv_1uoga_104',
  jw = '_lvNum_1uoga_112',
  Ew = '_lvBar_1uoga_118',
  Cw = '_lvFill_1uoga_126',
  Aw = '_lvMax_1uoga_132',
  Lw = '_detail_1uoga_136',
  qw = '_detailName_1uoga_143',
  Bw = '_detailLv_1uoga_151',
  Iw = '_detailDesc_1uoga_157',
  Mw = '_detailReq_1uoga_164',
  Ow = '_hint_1uoga_170',
  Rw = '_learnBtn_1uoga_176',
  Qe = {
    wrap: mw,
    scroll: _w,
    canvas: fw,
    edges: pw,
    edge: hw,
    edgeLabel: gw,
    node: kw,
    learned: vw,
    maxed: yw,
    available: bw,
    locked: xw,
    selected: Sw,
    nodeName: ww,
    nodeCost: Tw,
    nodeLv: Nw,
    lvNum: jw,
    lvBar: Ew,
    lvFill: Cw,
    lvMax: Aw,
    detail: Lw,
    detailName: qw,
    detailLv: Bw,
    detailDesc: Iw,
    detailReq: Mw,
    hint: Ow,
    learnBtn: Rw,
  },
  Yu = 132,
  Xu = 48,
  Hr = 176,
  Ur = 62,
  Hg = ({ nodes: l, char: i, onLearn: r }) => {
    const [o, u] = S.useState(null),
      m = S.useMemo(() => {
        var j;
        const p = new Map(l.map((A) => [A.skillId, A])),
          g = new Map(),
          y = (A, V = 0) => {
            var W;
            if (g.has(A)) return g.get(A);
            const U = p.get(A);
            if (!U || !((W = U.requires) != null && W.length) || V > 20) return (g.set(A, 0), 0);
            const oe =
              1 + Math.max(...U.requires.map((x) => (p.has(x.skillId) ? y(x.skillId, V + 1) : 0)));
            return (g.set(A, oe), oe);
          },
          k = [];
        l.forEach((A, V) => {
          const U = y(A.skillId);
          (k[U] || (k[U] = [])).push(V);
        });
        const L = new Map(),
          N = k.map(() => new Set());
        for (let A = 0; A < k.length; A++)
          for (const V of k[A] ?? []) {
            const U = l[V];
            let oe = 0;
            if (A > 0 && (j = U.requires) != null && j.length) {
              const x = U.requires.map((q) => L.get(q.skillId)).filter((q) => q !== void 0);
              x.length && (oe = Math.min(...x));
            }
            let W = oe;
            for (; N[A].has(W); ) W++;
            (N[A].add(W), L.set(U.skillId, W));
          }
        const M = Math.max(0, ...L.values()),
          G = l.map((A) => ({ node: A, col: y(A.skillId), row: L.get(A.skillId) ?? 0 })),
          B = [];
        for (const A of G)
          for (const V of A.node.requires ?? []) {
            const U = G.find((oe) => oe.node.skillId === V.skillId);
            U &&
              B.push({
                from: V.skillId,
                to: A.node.skillId,
                level: V.level,
                x1: U.col * Hr + Yu,
                y1: U.row * Ur + Xu / 2,
                x2: A.col * Hr,
                y2: A.row * Ur + Xu / 2,
              });
          }
        return { placed: G, edges: B, width: (k.length - 1) * Hr + Yu, height: (M + 1) * Ur };
      }, [l]),
      f = o ? $n[o] : null,
      h = o ? l.find((p) => p.skillId === o) : null;
    return d.jsxs('div', {
      className: Qe.wrap,
      children: [
        d.jsx('div', {
          className: Qe.scroll,
          children: d.jsxs('div', {
            className: Qe.canvas,
            style: { width: m.width, height: m.height },
            children: [
              d.jsx('svg', {
                className: Qe.edges,
                width: m.width,
                height: m.height,
                children: m.edges.map((p) => {
                  const g = (p.x1 + p.x2) / 2;
                  return d.jsxs(
                    'g',
                    {
                      children: [
                        d.jsx('path', {
                          className: Qe.edge,
                          d: `M ${p.x1} ${p.y1} H ${g} V ${p.y2} H ${p.x2}`,
                          fill: 'none',
                        }),
                        d.jsxs('text', {
                          className: Qe.edgeLabel,
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
              m.placed.map(({ node: p, col: g, row: y }) => {
                var B;
                const k = Gn(i, p.skillId),
                  L = k >= p.maxLevel,
                  N = (p.requires ?? []).every((j) => Gn(i, j.skillId) >= j.level),
                  M = hg(i, p.skillId),
                  G = [
                    Qe.node,
                    k > 0 ? Qe.learned : '',
                    L ? Qe.maxed : '',
                    M ? Qe.available : '',
                    N ? '' : Qe.locked,
                    o === p.skillId ? Qe.selected : '',
                  ]
                    .filter(Boolean)
                    .join(' ');
                return d.jsxs(
                  'button',
                  {
                    type: 'button',
                    className: G,
                    style: { left: g * Hr, top: y * Ur, width: Yu, height: Xu },
                    onClick: () => u(p.skillId),
                    children: [
                      d.jsx('span', {
                        className: Qe.nodeName,
                        children: ((B = $n[p.skillId]) == null ? void 0 : B.name) ?? p.skillId,
                      }),
                      d.jsxs('span', { className: Qe.nodeCost, children: ['SP', fg(g)] }),
                      d.jsxs('span', {
                        className: Qe.nodeLv,
                        children: [
                          d.jsx('span', { className: Qe.lvNum, children: k }),
                          d.jsx('span', {
                            className: Qe.lvBar,
                            children: d.jsx('span', {
                              className: Qe.lvFill,
                              style: { width: `${(k / p.maxLevel) * 100}%` },
                            }),
                          }),
                          d.jsx('span', { className: Qe.lvMax, children: p.maxLevel }),
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
              var G;
              const p = Gn(i, f.id),
                g = p >= h.maxLevel,
                y = pg(i, h),
                k = Pn(i, f.id),
                L = ns(i) >= k,
                N = !g && y && L,
                M = g
                  ? '習得済み（最大Lv）'
                  : y
                    ? L
                      ? p === 0
                        ? `習得する（SP${k} 消費）`
                        : `Lv${p}→${p + 1} に強化（SP${k} 消費）`
                      : `SP不足（必要 SP${k}）`
                    : '前提スキル未達';
              return d.jsxs('div', {
                className: Qe.detail,
                children: [
                  d.jsxs('div', {
                    className: Qe.detailName,
                    children: [
                      f.name,
                      d.jsxs('span', {
                        className: Qe.detailLv,
                        children: ['Lv ', p, '/', h.maxLevel],
                      }),
                    ],
                  }),
                  d.jsx('div', { className: Qe.detailDesc, children: f.description }),
                  (G = h.requires) != null && G.length
                    ? d.jsxs('div', {
                        className: Qe.detailReq,
                        children: [
                          '前提:',
                          ' ',
                          h.requires
                            .map((B) => {
                              var j;
                              return `${((j = $n[B.skillId]) == null ? void 0 : j.name) ?? B.skillId} Lv${B.level}`;
                            })
                            .join('・'),
                        ],
                      })
                    : null,
                  d.jsx('button', {
                    type: 'button',
                    className: Qe.learnBtn,
                    disabled: !N,
                    onClick: () => r(f.id),
                    children: M,
                  }),
                ],
              });
            })()
          : d.jsx('div', {
              className: Qe.hint,
              children:
                'ノードをタップで選択し、下の「習得する」ボタンで習得/強化（1Lvあたりの消費SPは各ノードの「SP◯」。深いスキルほど高コスト）。緑=習得済 / 枠強調=習得可 / 暗=前提未達。',
            }),
      ],
    });
  },
  $r = [
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
function wh(l) {
  const i = Math.floor((l - 1) / 10);
  return $r[((i % $r.length) + $r.length) % $r.length];
}
function Dw(l) {
  var o, u, m;
  const i = l.diveState;
  if (!i) return !1;
  const r =
    (u = (o = l.towerState.floors[i.depth]) == null ? void 0 : o.generated.cells[i.pos.y]) == null
      ? void 0
      : u[i.pos.x];
  return ((m = r == null ? void 0 : r.event) == null ? void 0 : m.kind) === 'cookingSpot';
}
function zw(l) {
  const i = new Set(l.unlockedRecipeIds ?? []);
  return Object.values(Fn).filter((r) => i.has(r.id));
}
function Ug(l, i) {
  const r = Fn[i];
  return !r || !(l.unlockedRecipeIds ?? []).includes(i)
    ? !1
    : r.ingredients.every((o) => Td(l, o.itemId) >= o.qty);
}
function Hw(l, i) {
  if (!Ug(l, i)) return { ok: !1, save: l };
  const r = Fn[i];
  let o = l;
  for (const u of r.ingredients) o = mg(o, u.itemId, u.qty);
  return ((o = dg(o, r.result.itemId, r.result.count)), { ok: !0, save: o });
}
function $g(l, i) {
  const r = new Set([...l.guild.party.front, ...l.guild.party.back].filter((o) => o !== null));
  return l.guild.members.some((o) => r.has(o.id) && (o.learnedSkills[i] ?? 0) > 0);
}
function Gg(l) {
  var m, f, h;
  const i = l.diveState;
  if (!i) return null;
  const r = (m = l.towerState.floors[i.depth]) == null ? void 0 : m.generated,
    o = (f = r == null ? void 0 : r.cells[i.pos.y]) == null ? void 0 : f[i.pos.x];
  if (!r || ((h = o == null ? void 0 : o.event) == null ? void 0 : h.kind) !== 'gather')
    return null;
  const u = o.event.gatherId;
  return r.gatheringPoints.find((p) => p.id === u) ?? null;
}
function od(l, i) {
  var u;
  const r = l.diveState;
  return r
    ? (((u = l.towerState.floors[r.depth]) == null ? void 0 : u.depletedGathers) ?? []).includes(
        eo(i.cell.x, i.cell.y)
      )
    : !0;
}
function Th(l, i) {
  return $g(l, Va[i.type].requiredSkillId);
}
function Uw(l, i) {
  const r = l.reduce((u, m) => u + m.weight, 0);
  let o = i.next() * r;
  for (const u of l) if (((o -= u.weight), o < 0)) return u.itemId;
  return l[l.length - 1].itemId;
}
function $w(l, i) {
  const r = l.diveState;
  if (!r) return { ok: !1, save: l, reason: 'noDive' };
  const o = Gg(l);
  if (!o) return { ok: !1, save: l, reason: 'noPoint' };
  if (od(l, o)) return { ok: !1, save: l, reason: 'depleted' };
  const u = Va[o.type];
  if (!$g(l, u.requiredSkillId)) return { ok: !1, save: l, reason: 'noSkill' };
  if (u.food && ug(l) >= cg) return { ok: !1, save: l, reason: 'foodFull' };
  const m = Uw(u.drops, i);
  let f = u.food ? dg(l, m, 1) : Sd(l, m, 1);
  const h = eo(o.cell.x, o.cell.y),
    p = f.towerState.floors[r.depth],
    g = p.depletedGathers.includes(h) ? p.depletedGathers : [...p.depletedGathers, h];
  return (
    (f = {
      ...f,
      towerState: {
        ...f.towerState,
        floors: { ...f.towerState.floors, [r.depth]: { ...p, depletedGathers: g } },
      },
    }),
    { ok: !0, save: f, itemId: m, reason: void 0 }
  );
}
function Gw(l, i, r) {
  var G;
  const o = tt[i];
  if (!o) return { save: l, ok: !1, message: 'そのアイテムは無い' };
  if (!((G = o.useContext) != null && G.includes('field')))
    return { save: l, ok: !1, message: 'ここでは使えない' };
  const u = rx(i);
  if ((u ? Td(l, i) : xd(l, i)) <= 0) return { save: l, ok: !1, message: '所持していない' };
  const f = (B) => (u ? mg(B, i, 1) : wd(B, i, 1));
  if (i === 'item_return_thread')
    return l.diveState
      ? { save: is(f(l)), ok: !0, message: '拠点へ帰還した' }
      : { save: l, ok: !1, message: '探索中のみ使える' };
  if (!l.diveState) return { save: l, ok: !1, message: '探索中のみ使える' };
  const h = l.diveState.party.find((B) => B.charId === r),
    p = l.guild.members.find((B) => B.id === r);
  if (!h || !p) return { save: l, ok: !1, message: '対象がいない' };
  const g = Xl(p);
  let y = h.hp,
    k = h.tp,
    L = !1;
  for (const B of o.effects ?? [])
    B.kind === 'heal'
      ? ((y = Math.min(g.hp, y + B.amount(1))), (L = !0))
      : B.kind === 'restoreTp' && ((k = Math.min(g.tp, k + B.amount(1))), (L = !0));
  if (!L) return { save: l, ok: !1, message: 'いま使う効果がない' };
  const N = l.diveState.party.map((B) => (B.charId === r ? { ...B, hp: y, tp: k } : B));
  return {
    save: f({ ...l, diveState: { ...l.diveState, party: N } }),
    ok: !0,
    message: `${p.name} に ${o.name} を使った`,
  };
}
const Yw = (l) => new Promise((i) => setTimeout(i, l)),
  Xw = () => {
    const l = pl(),
      { save: i, applySave: r, applyAndPersist: o } = Kl(),
      u = S.useRef(null),
      m = S.useRef(!1),
      [f, h] = S.useState(!1),
      [p, g] = S.useState(!1),
      [y, k] = S.useState(!1),
      [L, N] = S.useState(null),
      [M, G] = S.useState('class'),
      [B, j] = S.useState(null),
      [A, V] = S.useState(null),
      U = (i == null ? void 0 : i.diveState) ?? null,
      oe = S.useMemo(() => {
        var R;
        return i && U ? ((R = i.towerState.floors[U.depth]) == null ? void 0 : R.generated) : null;
      }, [i, U]),
      W = S.useMemo(() => {
        var R;
        return i && U
          ? (((R = i.towerState.floors[U.depth]) == null ? void 0 : R.foeRuntime) ?? [])
              .filter((b) => !b.defeated)
              .map((b) => ({ x: b.cell.x, y: b.cell.y, alerted: b.alerted }))
          : [];
      }, [i, U]),
      x = S.useMemo(() => (i ? Gg(i) : null), [i]),
      q = S.useMemo(() => (i ? Dw(i) : !1), [i]),
      Z = S.useMemo(() => {
        var R;
        return i && U
          ? (((R = i.towerState.floors[U.depth]) == null ? void 0 : R.depletedGathers) ?? [])
          : [];
      }, [i, U]),
      ee = S.useCallback(() => {
        var b;
        if (!i) return;
        u.current || (u.current = Sa((i.masterSeed ^ 2654435769) >>> 0));
        const R = $w(i, u.current);
        if (!R.ok) {
          j(
            R.reason === 'noSkill'
              ? '対応する採集スキルを持つ仲間がいない'
              : R.reason === 'foodFull'
                ? '食料がいっぱいで採れない'
                : '採集できない'
          );
          return;
        }
        (o(() => R.save),
          j(
            `${R.itemId ? (((b = tt[R.itemId]) == null ? void 0 : b.name) ?? '素材') : '素材'} を手に入れた`
          ));
      }, [i, o]),
      te = S.useCallback(
        (R) => {
          var w;
          if (!i) return;
          const b = Hw(i, R);
          b.ok &&
            (o(() => b.save), j(`${((w = Fn[R]) == null ? void 0 : w.name) ?? '料理'} を作った`));
        },
        [i, o]
      ),
      ce = S.useCallback(
        (R) => {
          if (!i) return;
          (j(null), u.current || (u.current = Sa((i.masterSeed ^ 2654435769) >>> 0)));
          const b = fh(i, R, u.current);
          (o(() => b.save), b.triggered && l('/battle'));
        },
        [i, o, l]
      ),
      ve = S.useCallback(
        (R) => {
          r((b) => Eg(b, R));
        },
        [r]
      ),
      D = S.useCallback(async () => {
        if (!i) return;
        const R = ph(i);
        if (R === 'stairsUp') {
          if (!Ag(i, i.diveState.depth)) {
            j('強大な力に阻まれている。階層ボスを倒さねば先へ進めない。');
            return;
          }
          await o((b) => N2(b));
        } else
          R === 'stairsDown' &&
            (i.diveState.depth <= 1 ? (await o((b) => is(b)), l('/town')) : await o((b) => j2(b)));
      }, [i, o, l]),
      fe = S.useCallback(async () => {
        (await o((R) => is(R)), l('/town'));
      }, [o, l]),
      O = S.useCallback(
        (R, b) => {
          if (!i) return;
          const w = Gw(i, R, b);
          w.ok && (o(() => w.save), w.save.diveState || (h(!1), l('/town')));
        },
        [i, o, l]
      ),
      le = S.useCallback(
        async (R) => {
          if (!(m.current || R.length === 0)) {
            ((m.current = !0), j(null));
            try {
              for (const b of R) {
                if (!u.current) continue;
                let w = !1,
                  X = !1;
                if (
                  (await o((K) => {
                    if (!K.diveState) return K;
                    const se = fh(K, b, u.current);
                    return ((w = se.triggered), (X = se.moved), se.save);
                  }),
                  w)
                ) {
                  l('/battle');
                  return;
                }
                if (!X) return;
                await Yw(110);
              }
            } finally {
              m.current = !1;
            }
          }
        },
        [o, l]
      ),
      re = S.useCallback(
        (R, b) => {
          if (!U || !oe || m.current) return;
          u.current || (u.current = Sa((i.masterSeed ^ 2654435769) >>> 0));
          const w = o2(oe, U.pos, { x: R, y: b });
          w && w.length > 0 && le(w);
        },
        [U, oe, i, le]
      );
    if (!i) return d.jsx(_l, { to: '/title', replace: !0 });
    if (!U || !oe) return d.jsx(_l, { to: '/town', replace: !0 });
    const ke = ph(i);
    return d.jsxs('div', {
      className: de.layout,
      children: [
        d.jsxs('header', {
          className: de.head,
          children: [
            d.jsxs('div', {
              className: de.depth,
              children: [
                U.depth,
                'F ',
                d.jsx('span', { className: de.theme, children: wh(U.depth).name }),
              ],
            }),
            d.jsx(iw, { level: i2(U.encounter.stepsUntilEncounter) }),
            d.jsx('button', {
              type: 'button',
              className: de.menuBtn,
              onClick: () => {
                (N(null), k(!0));
              },
              children: '☰ メニュー',
            }),
          ],
        }),
        d.jsxs('div', {
          className: de.fpvWrap,
          children: [
            d.jsx(dw, { floor: oe, pos: U.pos, dir: U.dir, foes: W, theme: wh(U.depth) }),
            d.jsxs('div', {
              className: de.fpvControls,
              children: [
                d.jsx('button', {
                  type: 'button',
                  className: de.fpvTurn,
                  onClick: () => ve(Sg(U.dir)),
                  'aria-label': '左を向く',
                  children: '↰',
                }),
                d.jsx('button', {
                  type: 'button',
                  className: de.fpvForward,
                  onClick: () => ce(U.dir),
                  children: '▲ 前進',
                }),
                d.jsx('button', {
                  type: 'button',
                  className: de.fpvTurn,
                  onClick: () => ve(xg(U.dir)),
                  'aria-label': '右を向く',
                  children: '↱',
                }),
              ],
            }),
            d.jsx('button', {
              type: 'button',
              className: de.fpvBack,
              onClick: () => ve(s2(U.dir)),
              'aria-label': '振り向く',
              children: '↻',
            }),
          ],
        }),
        d.jsx('div', {
          className: de.mapWrap,
          children: d.jsx(FS, {
            floor: oe,
            explored: i.exploredCells[U.depth] ?? [],
            pos: U.pos,
            dir: U.dir,
            foes: W,
            depletedGathers: Z,
            onCellClick: re,
          }),
        }),
        d.jsx('p', {
          className: de.paletteHint,
          children: 'マップのマスをタップすると、そこまで自動で移動します。',
        }),
        ke &&
          d.jsx('button', {
            type: 'button',
            className: de.stairs,
            onClick: () => void D(),
            children:
              ke === 'stairsUp'
                ? '▲ 次の階へ進む'
                : U.depth <= 1
                  ? '▼ 拠点へ戻る'
                  : '▼ 前の階へ戻る',
          }),
        x &&
          d.jsx('button', {
            type: 'button',
            className: de.action,
            disabled: od(i, x) || !Th(i, x),
            onClick: ee,
            children: od(i, x)
              ? `🌿 ${Va[x.type].name}（採集済み）`
              : Th(i, x)
                ? `🌿 ${Va[x.type].name}する`
                : `🌿 ${Va[x.type].name}（スキル要）`,
          }),
        q &&
          d.jsx('button', {
            type: 'button',
            className: de.action,
            onClick: () => g(!0),
            children: '🍳 調理する',
          }),
        B && d.jsx('p', { className: de.notice, children: B }),
        f
          ? d.jsx('div', {
              className: de.itemOverlay,
              onClick: () => h(!1),
              children: d.jsxs('div', {
                className: de.itemPanel,
                onClick: (R) => R.stopPropagation(),
                children: [
                  d.jsx('div', { className: de.itemTitle, children: 'どうぐ・食料' }),
                  (() => {
                    const R = [...i.guild.storage, ...(i.guild.foodStorage ?? [])].filter((b) => {
                      var w, X;
                      return (
                        ((X = (w = tt[b.itemId]) == null ? void 0 : w.useContext) == null
                          ? void 0
                          : X.includes('field')) && b.qty > 0
                      );
                    });
                    return R.length === 0
                      ? d.jsx('p', {
                          className: de.itemEmpty,
                          children: '使える道具がありません。',
                        })
                      : R.map((b) => {
                          const w = tt[b.itemId],
                            X = b.itemId === 'item_return_thread';
                          return d.jsxs(
                            'div',
                            {
                              className: de.itemRow,
                              children: [
                                d.jsxs('div', {
                                  className: de.itemName,
                                  children: [
                                    w.name,
                                    ' ×',
                                    b.qty,
                                    d.jsx('span', {
                                      className: de.itemDesc,
                                      children: w.description,
                                    }),
                                  ],
                                }),
                                X
                                  ? d.jsx('button', {
                                      type: 'button',
                                      className: de.itemUse,
                                      onClick: () =>
                                        V({
                                          message: `${w.name} を使いますか？`,
                                          okLabel: '使う',
                                          onYes: () => O(b.itemId),
                                        }),
                                      children: '使う',
                                    })
                                  : d.jsx('div', {
                                      className: de.itemTargets,
                                      children: U.party.map((K) => {
                                        const se = i.guild.members.find((be) => be.id === K.charId);
                                        if (!se) return null;
                                        const pe = Xl(se);
                                        return d.jsxs(
                                          'button',
                                          {
                                            type: 'button',
                                            className: de.itemTarget,
                                            onClick: () =>
                                              V({
                                                message: `${se.name} に ${w.name} を使いますか？`,
                                                okLabel: '使う',
                                                onYes: () => O(b.itemId, K.charId),
                                              }),
                                            children: [
                                              se.name,
                                              d.jsxs('span', {
                                                className: de.itemHp,
                                                children: [
                                                  'HP ',
                                                  K.hp,
                                                  '/',
                                                  pe.hp,
                                                  '・TP ',
                                                  K.tp,
                                                  '/',
                                                  pe.tp,
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
                            b.itemId
                          );
                        });
                  })(),
                  d.jsx('button', {
                    type: 'button',
                    className: de.itemClose,
                    onClick: () => h(!1),
                    children: 'とじる',
                  }),
                ],
              }),
            })
          : null,
        p
          ? d.jsx('div', {
              className: de.itemOverlay,
              onClick: () => g(!1),
              children: d.jsxs('div', {
                className: de.itemPanel,
                onClick: (R) => R.stopPropagation(),
                children: [
                  d.jsx('div', { className: de.itemTitle, children: '調理' }),
                  (() => {
                    const R = zw(i);
                    return R.length === 0
                      ? d.jsx('p', {
                          className: de.itemEmpty,
                          children: '作れるレシピがありません。',
                        })
                      : R.map((b) => {
                          var K;
                          const w = Ug(i, b.id),
                            X = b.ingredients
                              .map((se) => {
                                var pe;
                                return `${((pe = tt[se.itemId]) == null ? void 0 : pe.name) ?? se.itemId}×${se.qty}`;
                              })
                              .join(' ＋ ');
                          return d.jsxs(
                            'div',
                            {
                              className: de.itemRow,
                              children: [
                                d.jsxs('div', {
                                  className: de.itemName,
                                  children: [
                                    b.name,
                                    d.jsxs('span', {
                                      className: de.itemDesc,
                                      children: [
                                        X,
                                        ' → ',
                                        ((K = tt[b.result.itemId]) == null ? void 0 : K.name) ??
                                          b.result.itemId,
                                        '（所持',
                                        b.ingredients
                                          .map((se) => {
                                            var pe;
                                            return `${((pe = tt[se.itemId]) == null ? void 0 : pe.name) ?? ''}${Td(i, se.itemId)}`;
                                          })
                                          .join('・'),
                                        '）',
                                      ],
                                    }),
                                  ],
                                }),
                                d.jsx('button', {
                                  type: 'button',
                                  className: de.itemUse,
                                  disabled: !w,
                                  onClick: () =>
                                    V({
                                      message: `${b.name} を作りますか？`,
                                      okLabel: '作る',
                                      onYes: () => te(b.id),
                                    }),
                                  children: '作る',
                                }),
                              ],
                            },
                            b.id
                          );
                        });
                  })(),
                  d.jsx('button', {
                    type: 'button',
                    className: de.itemClose,
                    onClick: () => g(!1),
                    children: 'とじる',
                  }),
                ],
              }),
            })
          : null,
        y
          ? d.jsx('div', {
              className: de.itemOverlay,
              onClick: () => k(!1),
              children: d.jsx('div', {
                className: de.itemPanel,
                onClick: (R) => R.stopPropagation(),
                children: (() => {
                  var X, K, se, pe;
                  const R = L ? i.guild.members.find((be) => be.id === L) : null;
                  if (!R)
                    return d.jsxs(d.Fragment, {
                      children: [
                        d.jsx('div', { className: de.itemTitle, children: 'メニュー' }),
                        d.jsxs('p', {
                          className: de.menuGold,
                          children: ['所持金 ', i.guild.gold, ' G'],
                        }),
                        d.jsxs('div', {
                          className: de.menuActions,
                          children: [
                            d.jsx('button', {
                              type: 'button',
                              className: de.menuAction,
                              onClick: () => {
                                (k(!1), h(!0));
                              },
                              children: '🎒 どうぐ・食料',
                            }),
                            d.jsx('button', {
                              type: 'button',
                              className: de.menuAction,
                              onClick: () => void fe(),
                              children: '🏠 拠点へ帰還',
                            }),
                          ],
                        }),
                        d.jsx('p', {
                          className: de.menuSectionLabel,
                          children: 'パーティ（タップで詳細・スキル振り）',
                        }),
                        U.party.map((be) => {
                          var il;
                          const Re = i.guild.members.find((Sl) => Sl.id === be.charId);
                          if (!Re) return null;
                          const De = Xl(Re),
                            hl = ns(Re);
                          return d.jsxs(
                            'button',
                            {
                              type: 'button',
                              className: de.menuMember,
                              onClick: () => {
                                (N(be.charId), G('class'));
                              },
                              children: [
                                d.jsxs('span', {
                                  className: de.menuMemberName,
                                  children: [
                                    Re.name,
                                    d.jsxs('span', {
                                      className: de.menuMemberJob,
                                      children: [
                                        (il = ze[Re.classId]) == null ? void 0 : il.name,
                                        ' Lv',
                                        Re.level,
                                      ],
                                    }),
                                  ],
                                }),
                                d.jsxs('span', {
                                  className: de.menuMemberStat,
                                  children: [
                                    'HP ',
                                    be.hp,
                                    '/',
                                    De.hp,
                                    '・TP ',
                                    be.tp,
                                    '/',
                                    De.tp,
                                    hl > 0
                                      ? d.jsxs('span', {
                                          className: de.menuSp,
                                          children: ['SP ', hl],
                                        })
                                      : null,
                                  ],
                                }),
                              ],
                            },
                            be.charId
                          );
                        }),
                        d.jsx('button', {
                          type: 'button',
                          className: de.itemClose,
                          onClick: () => k(!1),
                          children: 'とじる',
                        }),
                      ],
                    });
                  const b = Xl(R),
                    w =
                      M === 'class'
                        ? (((X = ze[R.classId]) == null ? void 0 : X.skillTree.skills) ?? [])
                        : M === 'race'
                          ? (((K = Ke[R.raceId]) == null ? void 0 : K.raceSkillTree.skills) ?? [])
                          : R.titleId
                            ? (((se = Gl[R.titleId]) == null ? void 0 : se.skillTree.skills) ?? [])
                            : [];
                  return d.jsxs(d.Fragment, {
                    children: [
                      d.jsxs('div', {
                        className: de.itemTitle,
                        children: [
                          R.name,
                          '（',
                          (pe = ze[R.classId]) == null ? void 0 : pe.name,
                          ' Lv',
                          R.level,
                          '）',
                          d.jsxs('span', { className: de.menuSp, children: ['SP ', ns(R)] }),
                        ],
                      }),
                      d.jsx('div', {
                        className: de.menuStats,
                        children: [
                          ['HP', b.hp],
                          ['TP', b.tp],
                          ['STR', b.str],
                          ['VIT', b.vit],
                          ['AGI', b.agi],
                          ['INT', b.int],
                          ['MND', b.mnd],
                          ['LUC', b.luc],
                        ].map(([be, Re]) =>
                          d.jsxs('span', { className: de.menuStat, children: [be, ' ', Re] }, be)
                        ),
                      }),
                      d.jsx('div', {
                        className: de.skillTabs,
                        children: ['class', 'race', 'title'].map((be) =>
                          d.jsx(
                            'button',
                            {
                              type: 'button',
                              className: `${de.skillTab} ${M === be ? de.skillTabOn : ''}`,
                              onClick: () => G(be),
                              disabled: be === 'title' && !R.titleId,
                              children: be === 'class' ? '職業' : be === 'race' ? '種族' : '称号',
                            },
                            be
                          )
                        ),
                      }),
                      d.jsx(Hg, {
                        nodes: w,
                        char: R,
                        onLearn: (be) =>
                          void o((Re) => ({
                            ...Re,
                            guild: {
                              ...Re.guild,
                              members: Re.guild.members.map((De) =>
                                De.id === R.id ? gg(De, be) : De
                              ),
                            },
                          })),
                      }),
                      d.jsx('button', {
                        type: 'button',
                        className: de.itemClose,
                        onClick: () => N(null),
                        children: '← もどる',
                      }),
                    ],
                  });
                })(),
              }),
            })
          : null,
        A
          ? d.jsx('div', {
              className: de.confirmOverlay,
              onClick: () => V(null),
              children: d.jsxs('div', {
                className: de.confirmBox,
                onClick: (R) => R.stopPropagation(),
                children: [
                  d.jsx('div', { className: de.confirmText, children: A.message }),
                  d.jsxs('div', {
                    className: de.confirmActions,
                    children: [
                      d.jsx('button', {
                        type: 'button',
                        className: de.confirmCancel,
                        onClick: () => V(null),
                        children: 'やめる',
                      }),
                      d.jsx('button', {
                        type: 'button',
                        className: de.confirmOk,
                        onClick: () => {
                          (A.onYes(), V(null));
                        },
                        children: A.okLabel,
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
  Vw = '_layout_1id7b_1',
  Qw = '_head_1id7b_11',
  Kw = '_title_1id7b_18',
  Zw = '_stock_1id7b_24',
  Jw = '_tabs_1id7b_29',
  Pw = '_tab_1id7b_29',
  Fw = '_tabActive_1id7b_46',
  Ww = '_hint_1id7b_51',
  e5 = '_list_1id7b_57',
  t5 = '_row_1id7b_65',
  l5 = '_info_1id7b_76',
  a5 = '_name_1id7b_82',
  n5 = '_note_1id7b_87',
  i5 = '_actions_1id7b_92',
  s5 = '_ingot_1id7b_97',
  r5 = '_recycle_1id7b_114',
  o5 = '_maxed_1id7b_126',
  c5 = '_empty_1id7b_132',
  u5 = '_foot_1id7b_137',
  d5 = '_back_1id7b_141',
  m5 = '_confirmOverlay_1id7b_151',
  _5 = '_confirmBox_1id7b_162',
  f5 = '_confirmText_1id7b_174',
  p5 = '_confirmActions_1id7b_181',
  h5 = '_confirmCancel_1id7b_186',
  g5 = '_confirmOk_1id7b_187',
  Xe = {
    layout: Vw,
    head: Qw,
    title: Kw,
    stock: Zw,
    tabs: Jw,
    tab: Pw,
    tabActive: Fw,
    hint: Ww,
    list: e5,
    row: t5,
    info: l5,
    name: a5,
    note: n5,
    actions: i5,
    ingot: s5,
    recycle: r5,
    maxed: o5,
    empty: c5,
    foot: u5,
    back: d5,
    confirmOverlay: m5,
    confirmBox: _5,
    confirmText: f5,
    confirmActions: p5,
    confirmCancel: h5,
    confirmOk: g5,
  },
  k5 = () => {
    const l = pl(),
      { save: i, applyAndPersist: r } = Kl(),
      [o, u] = S.useState('forge'),
      [m, f] = S.useState(null);
    if (!i) return d.jsx(_l, { to: '/title', replace: !0 });
    const { copper: h, silver: p, gold: g } = i.forgeInventory.ingots,
      y = i.forgeInventory.fragments.common ?? 0,
      k = i.guild.equipment,
      L = () => {
        m &&
          (m.kind === 'forge'
            ? r((M) => jx(M, m.instanceId, m.ingot).save)
            : r((M) => Ex(M, m.id).save),
          f(null));
      },
      N = (M, G, B, j, A) =>
        d.jsxs('button', {
          type: 'button',
          className: Xe.ingot,
          disabled: A <= 0,
          onClick: () => f({ kind: 'forge', instanceId: M, ingot: B, name: G, ingotLabel: j }),
          children: [j, '+', Yl.INGOT_INC[B], '（', A, '）'],
        });
    return d.jsxs('div', {
      className: Xe.layout,
      children: [
        d.jsxs('header', {
          className: Xe.head,
          children: [
            d.jsx('h1', { className: Xe.title, children: '鍛冶屋' }),
            d.jsxs('span', {
              className: Xe.stock,
              children: ['銅', h, '・銀', p, '・金', g, '／断片', y],
            }),
          ],
        }),
        d.jsxs('div', {
          className: Xe.tabs,
          children: [
            d.jsx('button', {
              type: 'button',
              className: `${Xe.tab} ${o === 'forge' ? Xe.tabActive : ''}`,
              onClick: () => u('forge'),
              children: '強化',
            }),
            d.jsx('button', {
              type: 'button',
              className: `${Xe.tab} ${o === 'recycle' ? Xe.tabActive : ''}`,
              onClick: () => u('recycle'),
              children: 'リサイクル',
            }),
          ],
        }),
        d.jsx('p', {
          className: Xe.hint,
          children:
            o === 'forge'
              ? 'インゴットで装備を強化（最大 +5）。銅+1・銀+3・金+5。'
              : '不要な装備を断片に変換。断片10個で銅インゴット1個になる。',
        }),
        d.jsx('div', {
          className: Xe.list,
          children:
            k.length === 0
              ? d.jsx('p', { className: Xe.empty, children: '所有している装備がありません。' })
              : k.map((M) => {
                  const G = Pe[M.masterId],
                    B = M.forgeLevel >= Yl.MAX_LEVEL;
                  return d.jsxs(
                    'div',
                    {
                      className: Xe.row,
                      children: [
                        d.jsxs('div', {
                          className: Xe.info,
                          children: [
                            d.jsx('span', { className: Xe.name, children: xa(M) }),
                            d.jsx('span', {
                              className: Xe.note,
                              children: G == null ? void 0 : G.slot,
                            }),
                          ],
                        }),
                        o === 'forge'
                          ? d.jsx('div', {
                              className: Xe.actions,
                              children: B
                                ? d.jsx('span', { className: Xe.maxed, children: '最大強化' })
                                : d.jsxs(d.Fragment, {
                                    children: [
                                      N(M.id, xa(M), 'copper', '銅', h),
                                      N(M.id, xa(M), 'silver', '銀', p),
                                      N(M.id, xa(M), 'gold', '金', g),
                                    ],
                                  }),
                            })
                          : d.jsxs('button', {
                              type: 'button',
                              className: Xe.recycle,
                              onClick: () => f({ kind: 'recycle', id: M.id, name: xa(M) }),
                              children: ['分解（断片+', sg(M.masterId), '）'],
                            }),
                      ],
                    },
                    M.id
                  );
                }),
        }),
        d.jsx('footer', {
          className: Xe.foot,
          children: d.jsx('button', {
            type: 'button',
            className: Xe.back,
            onClick: () => l('/town'),
            children: '拠点へ戻る',
          }),
        }),
        m
          ? d.jsx('div', {
              className: Xe.confirmOverlay,
              onClick: () => f(null),
              children: d.jsxs('div', {
                className: Xe.confirmBox,
                onClick: (M) => M.stopPropagation(),
                children: [
                  d.jsx('div', {
                    className: Xe.confirmText,
                    children:
                      m.kind === 'forge'
                        ? d.jsxs(d.Fragment, {
                            children: [
                              d.jsx('strong', { children: m.name }),
                              ' を',
                              m.ingotLabel,
                              'インゴットで強化しますか？',
                            ],
                          })
                        : d.jsxs(d.Fragment, {
                            children: [
                              d.jsx('strong', { children: m.name }),
                              ' を分解しますか？（装備は失われます）',
                            ],
                          }),
                  }),
                  d.jsxs('div', {
                    className: Xe.confirmActions,
                    children: [
                      d.jsx('button', {
                        type: 'button',
                        className: Xe.confirmCancel,
                        onClick: () => f(null),
                        children: 'やめる',
                      }),
                      d.jsx('button', {
                        type: 'button',
                        className: Xe.confirmOk,
                        onClick: L,
                        children: m.kind === 'forge' ? '強化する' : '分解する',
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
  v5 = '_layout_fn0ll_2',
  y5 = '_head_fn0ll_13',
  b5 = '_title_fn0ll_20',
  x5 = '_count_fn0ll_26',
  S5 = '_create_fn0ll_31',
  w5 = '_sectionTitle_fn0ll_42',
  T5 = '_field_fn0ll_48',
  N5 = '_primary_fn0ll_64',
  j5 = '_list_fn0ll_79',
  E5 = '_empty_fn0ll_83',
  C5 = '_members_fn0ll_88',
  A5 = '_member_fn0ll_88',
  L5 = '_memberMain_fn0ll_107',
  q5 = '_memberName_fn0ll_119',
  B5 = '_pos_fn0ll_127',
  I5 = '_memberSub_fn0ll_144',
  M5 = '_posBtns_fn0ll_149',
  O5 = '_posBtn_fn0ll_149',
  R5 = '_posBtnActive_fn0ll_164',
  D5 = '_tabs_fn0ll_170',
  z5 = '_tab_fn0ll_170',
  H5 = '_tabActive_fn0ll_187',
  U5 = '_notice_fn0ll_192',
  $5 = '_filters_fn0ll_202',
  G5 = '_filter_fn0ll_202',
  Y5 = '_hint_fn0ll_221',
  X5 = '_slotGroup_fn0ll_227',
  V5 = '_slotGroupLabel_fn0ll_234',
  Q5 = '_slot_fn0ll_227',
  K5 = '_slotFilled_fn0ll_251',
  Z5 = '_slotEmpty_fn0ll_256',
  J5 = '_slotName_fn0ll_261',
  P5 = '_slotSub_fn0ll_266',
  F5 = '_slotPlaceholder_fn0ll_271',
  W5 = '_banishBtn_fn0ll_277',
  e4 = '_overlay_fn0ll_289',
  t4 = '_panel_fn0ll_300',
  l4 = '_panelTitle_fn0ll_314',
  a4 = '_pickerList_fn0ll_319',
  n4 = '_pickerItem_fn0ll_328',
  i4 = '_pickerItemActive_fn0ll_341',
  s4 = '_removeRow_fn0ll_346',
  r4 = '_panelClose_fn0ll_357',
  o4 = '_confirmBox_fn0ll_366',
  c4 = '_confirmText_fn0ll_378',
  u4 = '_confirmActions_fn0ll_384',
  d4 = '_confirmCancel_fn0ll_389',
  m4 = '_confirmOk_fn0ll_390',
  _4 = '_foot_fn0ll_411',
  f4 = '_sub_fn0ll_415',
  ie = {
    layout: v5,
    head: y5,
    title: b5,
    count: x5,
    create: S5,
    sectionTitle: w5,
    field: T5,
    primary: N5,
    list: j5,
    empty: E5,
    members: C5,
    member: A5,
    memberMain: L5,
    memberName: q5,
    pos: B5,
    pos_前衛: '_pos_前衛_fn0ll_136',
    pos_後衛: '_pos_後衛_fn0ll_140',
    memberSub: I5,
    posBtns: M5,
    posBtn: O5,
    posBtnActive: R5,
    tabs: D5,
    tab: z5,
    tabActive: H5,
    notice: U5,
    filters: $5,
    filter: G5,
    hint: Y5,
    slotGroup: X5,
    slotGroupLabel: V5,
    slot: Q5,
    slotFilled: K5,
    slotEmpty: Z5,
    slotName: J5,
    slotSub: P5,
    slotPlaceholder: F5,
    banishBtn: W5,
    overlay: e4,
    panel: t4,
    panelTitle: l4,
    pickerList: a4,
    pickerItem: n4,
    pickerItemActive: i4,
    removeRow: s4,
    panelClose: r4,
    confirmBox: o4,
    confirmText: c4,
    confirmActions: u4,
    confirmCancel: d4,
    confirmOk: m4,
    foot: _4,
    sub: f4,
  },
  p4 = '_card_14c64_1',
  h4 = '_className_14c64_11',
  g4 = '_description_14c64_17',
  k4 = '_sectionLabel_14c64_25',
  v4 = '_equipSection_14c64_32',
  y4 = '_equipRow_14c64_38',
  b4 = '_equipKind_14c64_45',
  x4 = '_equipList_14c64_52',
  S4 = '_skillSection_14c64_56',
  w4 = '_skillList_14c64_61',
  T4 = '_skillItem_14c64_70',
  N4 = '_skillHeader_14c64_76',
  j4 = '_skillName_14c64_83',
  E4 = '_skillMaxLv_14c64_89',
  C4 = '_skillDesc_14c64_94',
  _t = {
    card: p4,
    className: h4,
    description: g4,
    sectionLabel: k4,
    equipSection: v4,
    equipRow: y4,
    equipKind: b4,
    equipList: x4,
    skillSection: S4,
    skillList: w4,
    skillItem: T4,
    skillHeader: N4,
    skillName: j4,
    skillMaxLv: E4,
    skillDesc: C4,
  },
  Yg = { sword: '剣', spear: '槍', axe: '斧', bow: '弓', staff: '杖', fist: '拳' },
  Xg = { heavy: '重装', light: '軽装', clothes: '衣' },
  A4 = { weapon: '武器', armor: '防具', accessory: '装飾品' },
  L4 = ({ classId: l }) => {
    const i = ze[l];
    if (!i) return null;
    const r = i.equipableWeaponTypes.map((u) => Yg[u]),
      o = i.equipableArmorTypes.map((u) => Xg[u]);
    return d.jsxs('div', {
      className: _t.card,
      children: [
        d.jsx('div', { className: _t.className, children: i.name }),
        d.jsx('p', { className: _t.description, children: i.description }),
        d.jsxs('div', {
          className: _t.equipSection,
          children: [
            d.jsx('div', { className: _t.sectionLabel, children: '装備' }),
            d.jsxs('div', {
              className: _t.equipRow,
              children: [
                d.jsx('span', { className: _t.equipKind, children: '武器' }),
                d.jsx('span', { className: _t.equipList, children: r.join(' / ') }),
              ],
            }),
            d.jsxs('div', {
              className: _t.equipRow,
              children: [
                d.jsx('span', { className: _t.equipKind, children: '防具' }),
                d.jsx('span', { className: _t.equipList, children: o.join(' / ') }),
              ],
            }),
          ],
        }),
        d.jsxs('div', {
          className: _t.skillSection,
          children: [
            d.jsx('div', { className: _t.sectionLabel, children: '習得スキル' }),
            d.jsx('div', {
              className: _t.skillList,
              children: i.skillTree.skills.map((u) => {
                const m = $n[u.skillId];
                return m
                  ? d.jsxs(
                      'div',
                      {
                        className: _t.skillItem,
                        children: [
                          d.jsxs('div', {
                            className: _t.skillHeader,
                            children: [
                              d.jsx('span', { className: _t.skillName, children: m.name }),
                              d.jsxs('span', {
                                className: _t.skillMaxLv,
                                children: ['最大Lv', u.maxLevel],
                              }),
                            ],
                          }),
                          d.jsx('div', { className: _t.skillDesc, children: m.description }),
                        ],
                      },
                      u.skillId
                    )
                  : null;
              }),
            }),
          ],
        }),
      ],
    });
  },
  q4 = '_card_15x2d_1',
  B4 = '_raceName_15x2d_11',
  I4 = '_description_15x2d_17',
  M4 = '_sectionLabel_15x2d_25',
  O4 = '_rankGrid_15x2d_32',
  R4 = '_rankChip_15x2d_38',
  D4 = '_chipLabel_15x2d_48',
  z4 = '_chipRank_15x2d_53',
  H4 = '_rank_S_15x2d_58',
  U4 = '_rank_A_15x2d_63',
  $4 = '_rank_B_15x2d_68',
  G4 = '_rank_C_15x2d_73',
  Y4 = '_rank_D_15x2d_78',
  ll = {
    card: q4,
    raceName: B4,
    description: I4,
    sectionLabel: M4,
    rankGrid: O4,
    rankChip: R4,
    chipLabel: D4,
    chipRank: z4,
    rank_S: H4,
    rank_A: U4,
    rank_B: $4,
    rank_C: G4,
    rank_D: Y4,
  },
  X4 = 20,
  Vg = ['hp', 'tp', 'str', 'vit', 'agi', 'int', 'mnd', 'luc'],
  Qg = Object.keys(Ke);
function Kg(l, i) {
  const r = Ke[l];
  return r.baseStatsAtLv1[i] + r.statGrowth[i] * (X4 - 1);
}
function V4(l) {
  return l >= 0.84 ? 'S' : l >= 0.63 ? 'A' : l >= 0.42 ? 'B' : l >= 0.21 ? 'C' : 'D';
}
const Zg = {};
for (const l of Vg) {
  const i = Qg.map((r) => Kg(r, l));
  Zg[l] = { min: Math.min(...i), max: Math.max(...i) };
}
const Jg = {};
for (const l of Qg) {
  const i = {};
  for (const r of Vg) {
    const o = Kg(l, r),
      { min: u, max: m } = Zg[r],
      f = m === u ? 0.5 : (o - u) / (m - u);
    i[r] = V4(f);
  }
  Jg[l] = i;
}
function Q4(l) {
  const i = Jg[l];
  if (!i) throw new Error(`Unknown raceId: ${l}`);
  return i;
}
const K4 = [
    { key: 'hp', label: 'HP' },
    { key: 'tp', label: 'TP' },
    { key: 'str', label: '力' },
    { key: 'vit', label: '守' },
    { key: 'agi', label: '速' },
    { key: 'int', label: '魔' },
    { key: 'mnd', label: '心' },
    { key: 'luc', label: '運' },
  ],
  Z4 = ({ raceId: l }) => {
    const i = Ke[l];
    if (!i) return null;
    const r = Q4(l);
    return d.jsxs('div', {
      className: ll.card,
      children: [
        d.jsx('div', { className: ll.raceName, children: i.name }),
        d.jsx('p', { className: ll.description, children: i.description }),
        d.jsxs('div', {
          className: ll.rankSection,
          children: [
            d.jsx('div', { className: ll.sectionLabel, children: '能力ランク' }),
            d.jsx('div', {
              className: ll.rankGrid,
              children: K4.map(({ key: o, label: u }) => {
                const m = r[o];
                return d.jsxs(
                  'div',
                  {
                    className: `${ll.rankChip} ${ll[`rank_${m}`]}`,
                    children: [
                      d.jsx('span', { className: ll.chipLabel, children: u }),
                      d.jsx('span', { className: ll.chipRank, children: m }),
                    ],
                  },
                  o
                );
              }),
            }),
          ],
        }),
        d.jsxs('div', {
          className: ll.resistSection,
          children: [
            d.jsx('div', { className: ll.sectionLabel, children: '種族耐性' }),
            d.jsx(Yn, { elementResist: i.elementResist, ailmentResist: i.ailmentResist }),
          ],
        }),
      ],
    });
  };
function Nh(l) {
  return [...l.guild.party.front, ...l.guild.party.back].filter((i) => i !== null).length;
}
const J4 = (l) => (l === 'front' ? ps : hs);
function jh(l, i, r, o) {
  if (r < 0 || r >= J4(i) || (o !== null && !l.guild.members.some((f) => f.id === o))) return l;
  const u = l.guild.party.front.map((f) => (f === o ? null : f)),
    m = l.guild.party.back.map((f) => (f === o ? null : f));
  for (; u.length < ps; ) u.push(null);
  for (; m.length < hs; ) m.push(null);
  return (
    i === 'front' ? (u[r] = o) : (m[r] = o),
    { ...l, guild: { ...l.guild, party: { front: u, back: m } } }
  );
}
const Eh = { created: '作成順', levelDesc: 'レベルが高い順', levelAsc: 'レベルが低い順' },
  P4 = [];
function Ch(l, i) {
  return l.guild.party.front.includes(i)
    ? '前衛'
    : l.guild.party.back.includes(i)
      ? '後衛'
      : '控え';
}
const F4 = () => {
    var R, b;
    const l = pl(),
      { save: i, applyAndPersist: r } = Kl(),
      o = Object.keys(Ke),
      u = Object.keys(ze),
      [m, f] = S.useState('roster'),
      [h, p] = S.useState(''),
      [g, y] = S.useState(o[0]),
      [k, L] = S.useState(u[0]),
      [N, M] = S.useState(!1),
      [G, B] = S.useState(null),
      [j, A] = S.useState('all'),
      [V, U] = S.useState('all'),
      [oe, W] = S.useState('created'),
      [x, q] = S.useState(null),
      [Z, ee] = S.useState(null),
      te = (i == null ? void 0 : i.guild.members) ?? P4,
      ce = S.useMemo(() => {
        let w = te;
        (j !== 'all' && (w = w.filter((K) => K.raceId === j)),
          V !== 'all' && (w = w.filter((K) => K.classId === V)));
        const X = [...w];
        return (
          oe === 'levelDesc'
            ? X.sort((K, se) => se.level - K.level)
            : oe === 'levelAsc' && X.sort((K, se) => K.level - se.level),
          X
        );
      }, [te, j, V, oe]),
      ve = S.useCallback(async () => {
        var K, se;
        const w = h.trim() || '名もなき冒険者',
          X = Lg({ raceId: g, classId: k, name: w });
        (M(!0),
          await r((pe) => M2(pe, X)),
          B(
            `${w}（${(K = Ke[g]) == null ? void 0 : K.name} / ${(se = ze[k]) == null ? void 0 : se.name}）を作成しました`
          ),
          p(''),
          M(!1));
      }, [h, g, k, r]);
    if (!i) return d.jsx(_l, { to: '/title', replace: !0 });
    const D = te.length >= Zu,
      fe = o.filter((w) => te.some((X) => X.raceId === w)),
      O = u.filter((w) => te.some((X) => X.classId === w)),
      le = Z ? te.find((w) => w.id === Z) : null,
      re = (w, X) => (w === 'front' ? i.guild.party.front : i.guild.party.back)[X] ?? null,
      ke = (w) => {
        var X, K;
        return `${(X = Ke[w.raceId]) == null ? void 0 : X.name} / ${(K = ze[w.classId]) == null ? void 0 : K.name} / Lv${w.level}`;
      };
    return d.jsxs('div', {
      className: ie.layout,
      children: [
        d.jsxs('header', {
          className: ie.head,
          children: [
            d.jsx('h1', { className: ie.title, children: 'ギルド管理' }),
            d.jsxs('span', { className: ie.count, children: ['団員 ', te.length, ' / ', Zu] }),
          ],
        }),
        d.jsxs('div', {
          className: ie.tabs,
          children: [
            d.jsx('button', {
              type: 'button',
              className: `${ie.tab} ${m === 'roster' ? ie.tabActive : ''}`,
              onClick: () => f('roster'),
              children: '作成・一覧',
            }),
            d.jsx('button', {
              type: 'button',
              className: `${ie.tab} ${m === 'party' ? ie.tabActive : ''}`,
              onClick: () => f('party'),
              children: '編成',
            }),
            d.jsx('button', {
              type: 'button',
              className: `${ie.tab} ${m === 'banish' ? ie.tabActive : ''}`,
              onClick: () => f('banish'),
              children: '追放',
            }),
          ],
        }),
        m === 'roster'
          ? d.jsxs(d.Fragment, {
              children: [
                d.jsxs('section', {
                  className: ie.create,
                  children: [
                    d.jsx('h2', { className: ie.sectionTitle, children: '冒険者を作成' }),
                    d.jsxs('label', {
                      className: ie.field,
                      children: [
                        d.jsx('span', { children: '名前' }),
                        d.jsx('input', {
                          type: 'text',
                          value: h,
                          maxLength: 16,
                          placeholder: '名もなき冒険者',
                          onChange: (w) => p(w.target.value),
                        }),
                      ],
                    }),
                    d.jsxs('label', {
                      className: ie.field,
                      children: [
                        d.jsx('span', { children: '種族' }),
                        d.jsx('select', {
                          value: g,
                          onChange: (w) => y(w.target.value),
                          children: o.map((w) =>
                            d.jsx('option', { value: w, children: Ke[w].name }, w)
                          ),
                        }),
                      ],
                    }),
                    d.jsx(Z4, { raceId: g }),
                    d.jsxs('label', {
                      className: ie.field,
                      children: [
                        d.jsx('span', { children: '職業' }),
                        d.jsx('select', {
                          value: k,
                          onChange: (w) => L(w.target.value),
                          children: u.map((w) =>
                            d.jsx('option', { value: w, children: ze[w].name }, w)
                          ),
                        }),
                      ],
                    }),
                    d.jsx(L4, { classId: k }),
                    d.jsx('button', {
                      type: 'button',
                      className: ie.primary,
                      disabled: N || D,
                      onClick: () => void ve(),
                      children: D ? '団員が上限です' : '作成する',
                    }),
                    G ? d.jsx('p', { className: ie.notice, children: G }) : null,
                  ],
                }),
                d.jsxs('section', {
                  className: ie.list,
                  children: [
                    d.jsxs('h2', {
                      className: ie.sectionTitle,
                      children: [
                        '団員一覧',
                        ' ',
                        d.jsxs('span', {
                          className: ie.count,
                          children: ['（出撃 ', Nh(i), ' / ', ah, '）'],
                        }),
                      ],
                    }),
                    d.jsxs('div', {
                      className: ie.filters,
                      children: [
                        d.jsxs('select', {
                          className: ie.filter,
                          value: j,
                          onChange: (w) => A(w.target.value),
                          children: [
                            d.jsx('option', { value: 'all', children: '種族: すべて' }),
                            fe.map((w) => d.jsx('option', { value: w, children: Ke[w].name }, w)),
                          ],
                        }),
                        d.jsxs('select', {
                          className: ie.filter,
                          value: V,
                          onChange: (w) => U(w.target.value),
                          children: [
                            d.jsx('option', { value: 'all', children: '職業: すべて' }),
                            O.map((w) => d.jsx('option', { value: w, children: ze[w].name }, w)),
                          ],
                        }),
                        d.jsx('select', {
                          className: ie.filter,
                          value: oe,
                          onChange: (w) => W(w.target.value),
                          children: Object.keys(Eh).map((w) =>
                            d.jsx('option', { value: w, children: Eh[w] }, w)
                          ),
                        }),
                      ],
                    }),
                    te.length === 0
                      ? d.jsx('p', { className: ie.empty, children: 'まだ冒険者がいません。' })
                      : ce.length === 0
                        ? d.jsx('p', {
                            className: ie.empty,
                            children: '条件に合う団員がいません。',
                          })
                        : d.jsx('ul', {
                            className: ie.members,
                            children: ce.map((w) => {
                              const X = Ch(i, w.id);
                              return d.jsx(
                                'li',
                                {
                                  className: ie.member,
                                  children: d.jsxs('button', {
                                    type: 'button',
                                    className: ie.memberMain,
                                    onClick: () => l(`/guild/char/${w.id}`),
                                    children: [
                                      d.jsxs('span', {
                                        className: ie.memberName,
                                        children: [
                                          w.name,
                                          d.jsx('span', {
                                            className: `${ie.pos} ${ie[`pos_${X}`] ?? ''}`,
                                            children: X,
                                          }),
                                        ],
                                      }),
                                      d.jsxs('span', {
                                        className: ie.memberSub,
                                        children: [ke(w), ' ›'],
                                      }),
                                    ],
                                  }),
                                },
                                w.id
                              );
                            }),
                          }),
                  ],
                }),
              ],
            })
          : null,
        m === 'party'
          ? d.jsxs('section', {
              className: ie.list,
              children: [
                d.jsxs('h2', {
                  className: ie.sectionTitle,
                  children: [
                    'パーティー編成',
                    ' ',
                    d.jsxs('span', {
                      className: ie.count,
                      children: ['（出撃 ', Nh(i), ' / ', ah, '）'],
                    }),
                  ],
                }),
                d.jsx('p', {
                  className: ie.hint,
                  children: '枠をタップして編成する団員を選びます。',
                }),
                d.jsxs('div', {
                  className: ie.slotGroup,
                  children: [
                    d.jsx('div', { className: ie.slotGroupLabel, children: '前衛' }),
                    Array.from({ length: ps }).map((w, X) => {
                      const K = re('front', X),
                        se = K ? te.find((pe) => pe.id === K) : null;
                      return d.jsx(
                        'button',
                        {
                          type: 'button',
                          className: `${ie.slot} ${se ? ie.slotFilled : ie.slotEmpty}`,
                          onClick: () => q({ row: 'front', idx: X }),
                          children: se
                            ? d.jsxs(d.Fragment, {
                                children: [
                                  d.jsx('span', { className: ie.slotName, children: se.name }),
                                  d.jsx('span', { className: ie.slotSub, children: ke(se) }),
                                ],
                              })
                            : d.jsxs('span', {
                                className: ie.slotPlaceholder,
                                children: ['＋ 前衛', X + 1, '（空き）'],
                              }),
                        },
                        `front_${X}`
                      );
                    }),
                  ],
                }),
                d.jsxs('div', {
                  className: ie.slotGroup,
                  children: [
                    d.jsx('div', {
                      className: ie.slotGroupLabel,
                      children: '後衛（近接ダメージ -30%）',
                    }),
                    Array.from({ length: hs }).map((w, X) => {
                      const K = re('back', X),
                        se = K ? te.find((pe) => pe.id === K) : null;
                      return d.jsx(
                        'button',
                        {
                          type: 'button',
                          className: `${ie.slot} ${se ? ie.slotFilled : ie.slotEmpty}`,
                          onClick: () => q({ row: 'back', idx: X }),
                          children: se
                            ? d.jsxs(d.Fragment, {
                                children: [
                                  d.jsx('span', { className: ie.slotName, children: se.name }),
                                  d.jsx('span', { className: ie.slotSub, children: ke(se) }),
                                ],
                              })
                            : d.jsxs('span', {
                                className: ie.slotPlaceholder,
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
        m === 'banish'
          ? d.jsxs('section', {
              className: ie.list,
              children: [
                d.jsx('h2', { className: ie.sectionTitle, children: '団員追放' }),
                d.jsx('p', { className: ie.hint, children: '追放した団員は元に戻せません。' }),
                te.length === 0
                  ? d.jsx('p', { className: ie.empty, children: '追放できる団員がいません。' })
                  : d.jsx('ul', {
                      className: ie.members,
                      children: te.map((w) =>
                        d.jsxs(
                          'li',
                          {
                            className: ie.member,
                            children: [
                              d.jsxs('div', {
                                className: ie.memberMain,
                                children: [
                                  d.jsx('span', { className: ie.memberName, children: w.name }),
                                  d.jsx('span', { className: ie.memberSub, children: ke(w) }),
                                ],
                              }),
                              d.jsx('button', {
                                type: 'button',
                                className: ie.banishBtn,
                                onClick: () => ee(w.id),
                                children: '追放',
                              }),
                            ],
                          },
                          w.id
                        )
                      ),
                    }),
              ],
            })
          : null,
        d.jsx('footer', {
          className: ie.foot,
          children: d.jsx('button', {
            type: 'button',
            className: ie.sub,
            onClick: () => l('/town'),
            children: '拠点へ戻る',
          }),
        }),
        x
          ? d.jsx('div', {
              className: ie.overlay,
              onClick: () => q(null),
              children: d.jsxs('div', {
                className: ie.panel,
                onClick: (w) => w.stopPropagation(),
                children: [
                  d.jsxs('div', {
                    className: ie.panelTitle,
                    children: [x.row === 'front' ? '前衛' : '後衛', x.idx + 1, ' に編成する団員'],
                  }),
                  re(x.row, x.idx)
                    ? d.jsx('button', {
                        type: 'button',
                        className: ie.removeRow,
                        onClick: () => void r((w) => jh(w, x.row, x.idx, null)).then(() => q(null)),
                        children: 'この枠を空ける（編成から外す）',
                      })
                    : null,
                  te.length === 0
                    ? d.jsx('p', { className: ie.empty, children: '団員がいません。' })
                    : d.jsx('ul', {
                        className: ie.pickerList,
                        children: te.map((w) => {
                          const X = Ch(i, w.id),
                            K = re(x.row, x.idx) === w.id;
                          return d.jsx(
                            'li',
                            {
                              children: d.jsxs('button', {
                                type: 'button',
                                className: `${ie.pickerItem} ${K ? ie.pickerItemActive : ''}`,
                                onClick: () =>
                                  void r((se) => jh(se, x.row, x.idx, w.id)).then(() => q(null)),
                                children: [
                                  d.jsxs('span', {
                                    className: ie.memberName,
                                    children: [
                                      w.name,
                                      d.jsx('span', {
                                        className: `${ie.pos} ${ie[`pos_${X}`] ?? ''}`,
                                        children: X,
                                      }),
                                    ],
                                  }),
                                  d.jsx('span', { className: ie.memberSub, children: ke(w) }),
                                ],
                              }),
                            },
                            w.id
                          );
                        }),
                      }),
                  d.jsx('button', {
                    type: 'button',
                    className: ie.panelClose,
                    onClick: () => q(null),
                    children: 'とじる',
                  }),
                ],
              }),
            })
          : null,
        le
          ? d.jsx('div', {
              className: ie.overlay,
              onClick: () => ee(null),
              children: d.jsxs('div', {
                className: ie.confirmBox,
                onClick: (w) => w.stopPropagation(),
                children: [
                  d.jsxs('div', {
                    className: ie.confirmText,
                    children: [
                      'Lv',
                      le.level,
                      ' ',
                      le.name,
                      '（',
                      (R = Ke[le.raceId]) == null ? void 0 : R.name,
                      ' ',
                      (b = ze[le.classId]) == null ? void 0 : b.name,
                      '）を追放します。よろしいですか？',
                    ],
                  }),
                  d.jsxs('div', {
                    className: ie.confirmActions,
                    children: [
                      d.jsx('button', {
                        type: 'button',
                        className: ie.confirmCancel,
                        onClick: () => ee(null),
                        children: 'いいえ',
                      }),
                      d.jsx('button', {
                        type: 'button',
                        className: ie.confirmOk,
                        onClick: () => {
                          const w = le.id;
                          (r((X) => O2(X, w)), ee(null));
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
  W4 = '_layout_dwk01_1',
  eT = '_head_dwk01_12',
  tT = '_title_dwk01_16',
  lT = '_sub_dwk01_22',
  aT = '_card_dwk01_27',
  nT = '_h2_dwk01_35',
  iT = '_sp_dwk01_44',
  sT = '_stats_dwk01_50',
  rT = '_equipSlot_dwk01_74',
  oT = '_equipHead_dwk01_82',
  cT = '_slotLabel_dwk01_88',
  uT = '_equipName_dwk01_95',
  dT = '_smallBtn_dwk01_100',
  mT = '_equipPick_dwk01_110',
  _T = '_pickBtn_dwk01_118',
  fT = '_jobRow_dwk01_185',
  pT = '_select_dwk01_192',
  hT = '_input_dwk01_193',
  gT = '_actBtn_dwk01_203',
  kT = '_warn_dwk01_220',
  vT = '_titleHave_dwk01_227',
  yT = '_titleOpts_dwk01_233',
  bT = '_titleBtn_dwk01_240',
  xT = '_rbForm_dwk01_252',
  ST = '_danger_dwk01_258',
  wT = '_foot_dwk01_270',
  TT = '_back_dwk01_274',
  NT = '_resistBlock_dwk01_284',
  jT = '_resistRow_dwk01_290',
  ET = '_resistLabel_dwk01_296',
  CT = '_skillTabs_dwk01_302',
  AT = '_skillTab_dwk01_302',
  LT = '_skillTabOn_dwk01_322',
  ge = {
    layout: W4,
    head: eT,
    title: tT,
    sub: lT,
    card: aT,
    h2: nT,
    sp: iT,
    stats: sT,
    equipSlot: rT,
    equipHead: oT,
    slotLabel: cT,
    equipName: uT,
    smallBtn: dT,
    equipPick: mT,
    pickBtn: _T,
    jobRow: fT,
    select: pT,
    input: hT,
    actBtn: gT,
    warn: kT,
    titleHave: vT,
    titleOpts: yT,
    titleBtn: bT,
    rbForm: xT,
    danger: ST,
    foot: wT,
    back: TT,
    resistBlock: NT,
    resistRow: jT,
    resistLabel: ET,
    skillTabs: CT,
    skillTab: AT,
    skillTabOn: LT,
  },
  Pg = ['weapon', 'armor', 'accessory'];
function Fg(l, i, r) {
  return { ...l, guild: { ...l.guild, members: l.guild.members.map((o) => (o.id === i ? r : o)) } };
}
function qT(l) {
  var i, r;
  return (r = (i = ze[l]) == null ? void 0 : i.skillTree.skills[0]) == null ? void 0 : r.skillId;
}
function BT(l) {
  var i;
  return new Set(
    (((i = Ke[l]) == null ? void 0 : i.raceSkillTree.skills) ?? []).map((r) => r.skillId)
  );
}
const IT = (l, i) => {
  const r = { ...l };
  let o = 0;
  for (const [u, m] of Object.entries(i)) o += Pn(r, u) * m;
  return o;
};
function MT(l, i) {
  if (!ze[i]) return l;
  const r = BT(l.raceId);
  let o = {};
  for (const [g, y] of Object.entries(l.learnedSkills)) r.has(g) && (o[g] = y);
  const u = qT(i);
  u && !o[u] && (o[u] = 1);
  const m = Math.max(1, l.level - eg),
    f = Jr(m),
    h = { ...l, classId: i, titleId: null, learnedSkills: o };
  let p = IT(h, o) - (u && o[u] ? Pn(h, u) : 0);
  return (
    p > f && ((o = u ? { [u]: 1 } : {}), (p = 0)),
    {
      ...l,
      classId: i,
      titleId: null,
      level: m,
      exp: 0,
      learnedSkills: o,
      skillPoints: { total: f, spent: p },
    }
  );
}
function OT(l, i, r) {
  const o = l.guild.members.find((f) => f.id === i);
  if (!o) return l;
  let u = Fg(l, i, MT(o, r));
  const m = u.guild.members.find((f) => f.id === i);
  for (const f of Pg) {
    const h = m.equipment[f];
    h && !Nd(m, h.masterId) && (u = jd(u, i, f));
  }
  return u;
}
const RT = [
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
function DT(l) {
  const i = RT.find((r) => l >= r.min && l <= r.max);
  return i ? { allStats: i.allStats, bonusSp: i.bonusSp } : null;
}
function Wg(l) {
  return l.level >= Wi.REBIRTH_MIN_LEVEL;
}
function zT(l, i) {
  const r = DT(l.level);
  if (!r) return l;
  const o = Math.min(30, Math.floor(l.level / 2)),
    u = Lg({ ...i, id: l.id }),
    m = Jr(o) + r.bonusSp;
  return {
    ...u,
    level: Math.max(1, o),
    exp: 0,
    rebirthBonus: r,
    skillPoints: { total: m, spent: u.skillPoints.spent },
  };
}
function HT(l, i, r) {
  const o = l.guild.members.find((f) => f.id === i);
  if (!o || !Wg(o)) return l;
  let u = l;
  for (const f of Pg) o.equipment[f] && (u = jd(u, i, f));
  const m = u.guild.members.find((f) => f.id === i);
  return Fg(u, i, zT(m, r));
}
function ek(l, i, r) {
  var u;
  return r < Wi.TITLE_DEPTH || l.titleId
    ? !1
    : (((u = ze[l.classId]) == null ? void 0 : u.titleOptions) ?? []).includes(i);
}
function UT(l, i, r) {
  return ek(l, i, r)
    ? { ...l, titleId: i, skillPoints: { ...l.skillPoints, total: l.skillPoints.total + fx } }
    : l;
}
const Ah = Object.keys(Ke),
  Gr = Object.keys(ze),
  $T = ['weapon', 'armor', 'accessory'],
  GT = { weapon: '武器', armor: '防具', accessory: '装飾' },
  YT = [
    { key: 'hp', label: 'HP' },
    { key: 'tp', label: 'TP' },
    { key: 'str', label: 'STR' },
    { key: 'vit', label: 'VIT' },
    { key: 'agi', label: 'AGI' },
    { key: 'int', label: 'INT' },
    { key: 'mnd', label: 'MND' },
    { key: 'luc', label: 'LUC' },
  ],
  XT = () => {
    var W, x, q, Z, ee, te, ce, ve, D, fe, O, le, re, ke;
    const l = pl(),
      { id: i } = d0(),
      { save: r, applyAndPersist: o } = Kl(),
      [u, m] = S.useState('class'),
      [f, h] = S.useState(Gr[0]),
      [p, g] = S.useState(''),
      [y, k] = S.useState(Ah[0]),
      [L, N] = S.useState(Gr[0]),
      [M, G] = S.useState(!1);
    if (!r) return d.jsx(_l, { to: '/title', replace: !0 });
    const B = r.guild.members.find((R) => R.id === i);
    if (!B || !i) return d.jsx(_l, { to: '/guild', replace: !0 });
    const j = Xl(B),
      A = ns(B),
      V = r.towerState.record.deepestReached,
      U = (R) =>
        o((b) => ({
          ...b,
          guild: { ...b.guild, members: b.guild.members.map((w) => (w.id === i ? R(w) : w)) },
        }));
    return d.jsxs('div', {
      className: ge.layout,
      children: [
        d.jsxs('header', {
          className: ge.head,
          children: [
            d.jsx('h1', { className: ge.title, children: B.name }),
            d.jsxs('span', {
              className: ge.sub,
              children: [
                (W = Ke[B.raceId]) == null ? void 0 : W.name,
                ' / ',
                (x = ze[B.classId]) == null ? void 0 : x.name,
                ' / Lv',
                B.level,
              ],
            }),
          ],
        }),
        d.jsxs('section', {
          className: ge.card,
          children: [
            d.jsx('h2', { className: ge.h2, children: 'ステータス' }),
            d.jsx('dl', {
              className: ge.stats,
              children: YT.map((R) =>
                d.jsxs(
                  'div',
                  {
                    children: [
                      d.jsx('dt', { children: R.label }),
                      d.jsx('dd', { children: j[R.key] }),
                    ],
                  },
                  R.key
                )
              ),
            }),
          ],
        }),
        ((q = Ke[B.raceId]) != null && q.elementResist) ||
        ((Z = Ke[B.raceId]) != null && Z.ailmentResist)
          ? d.jsxs('section', {
              className: ge.card,
              children: [
                d.jsx('h2', { className: ge.h2, children: '種族耐性' }),
                d.jsxs('div', {
                  className: ge.resistBlock,
                  children: [
                    d.jsxs('div', {
                      className: ge.resistRow,
                      children: [
                        d.jsx('span', { className: ge.resistLabel, children: '属性' }),
                        d.jsx(Yn, {
                          elementResist: (ee = Ke[B.raceId]) == null ? void 0 : ee.elementResist,
                          ailmentResist: void 0,
                        }),
                      ],
                    }),
                    d.jsxs('div', {
                      className: ge.resistRow,
                      children: [
                        d.jsx('span', { className: ge.resistLabel, children: '状態異常' }),
                        d.jsx(Yn, {
                          elementResist: void 0,
                          ailmentResist: (te = Ke[B.raceId]) == null ? void 0 : te.ailmentResist,
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            })
          : d.jsxs('section', {
              className: ge.card,
              children: [
                d.jsx('h2', { className: ge.h2, children: '種族耐性' }),
                d.jsx('p', { className: ge.warn, children: 'この種族は特別な耐性を持ちません。' }),
              ],
            }),
        d.jsxs('section', {
          className: ge.card,
          children: [
            d.jsx('h2', { className: ge.h2, children: '装備' }),
            $T.map((R) => {
              const b = B.equipment[R],
                w = r.guild.equipment.filter((X) => {
                  var K;
                  return (
                    ((K = Pe[X.masterId]) == null ? void 0 : K.slot) === R && Nd(B, X.masterId)
                  );
                });
              return d.jsxs(
                'div',
                {
                  className: ge.equipSlot,
                  children: [
                    d.jsxs('div', {
                      className: ge.equipHead,
                      children: [
                        d.jsx('span', { className: ge.slotLabel, children: GT[R] }),
                        d.jsx('span', {
                          className: ge.equipName,
                          children: b ? xa(b) : '（なし）',
                        }),
                        b
                          ? d.jsx('button', {
                              type: 'button',
                              className: ge.smallBtn,
                              onClick: () => void oe(R),
                              children: '外す',
                            })
                          : null,
                      ],
                    }),
                    w.length > 0
                      ? d.jsx('div', {
                          className: ge.equipPick,
                          children: w.map((X) =>
                            d.jsxs(
                              'button',
                              {
                                type: 'button',
                                className: ge.pickBtn,
                                onClick: () => void o((K) => Lx(K, i, X.id)),
                                children: [xa(X), ' 装備'],
                              },
                              X.id
                            )
                          ),
                        })
                      : null,
                  ],
                },
                R
              );
            }),
          ],
        }),
        d.jsxs('section', {
          className: ge.card,
          children: [
            d.jsxs('h2', {
              className: ge.h2,
              children: ['スキル ', d.jsxs('span', { className: ge.sp, children: ['SP ', A] })],
            }),
            d.jsxs('div', {
              className: ge.skillTabs,
              children: [
                d.jsxs('button', {
                  type: 'button',
                  className: `${ge.skillTab} ${u === 'class' ? ge.skillTabOn : ''}`,
                  onClick: () => m('class'),
                  children: [
                    '職業（',
                    ((ce = ze[B.classId]) == null ? void 0 : ce.name) ?? '',
                    '）',
                  ],
                }),
                d.jsxs('button', {
                  type: 'button',
                  className: `${ge.skillTab} ${u === 'race' ? ge.skillTabOn : ''}`,
                  onClick: () => m('race'),
                  children: [
                    '種族（',
                    ((ve = Ke[B.raceId]) == null ? void 0 : ve.name) ?? '',
                    '）',
                  ],
                }),
                B.titleId
                  ? d.jsxs('button', {
                      type: 'button',
                      className: `${ge.skillTab} ${u === 'title' ? ge.skillTabOn : ''}`,
                      onClick: () => m('title'),
                      children: [
                        '称号（',
                        ((D = Gl[B.titleId]) == null ? void 0 : D.name) ?? '',
                        '）',
                      ],
                    })
                  : null,
              ],
            }),
            d.jsx(Hg, {
              nodes:
                u === 'class'
                  ? (((fe = ze[B.classId]) == null ? void 0 : fe.skillTree.skills) ?? [])
                  : u === 'race'
                    ? (((O = Ke[B.raceId]) == null ? void 0 : O.raceSkillTree.skills) ?? [])
                    : B.titleId
                      ? (((le = Gl[B.titleId]) == null ? void 0 : le.skillTree.skills) ?? [])
                      : [],
              char: B,
              onLearn: (R) => void U((b) => gg(b, R)),
            }),
          ],
        }),
        d.jsxs('section', {
          className: ge.card,
          children: [
            d.jsx('h2', { className: ge.h2, children: '転職' }),
            d.jsxs('div', {
              className: ge.jobRow,
              children: [
                d.jsx('select', {
                  className: ge.select,
                  value: f,
                  onChange: (R) => h(R.target.value),
                  children: Gr.map((R) => d.jsx('option', { value: R, children: ze[R].name }, R)),
                }),
                d.jsx('button', {
                  type: 'button',
                  className: ge.actBtn,
                  disabled: f === B.classId,
                  onClick: () => void o((R) => OT(R, i, f)),
                  children: '転職する',
                }),
              ],
            }),
            d.jsxs('p', {
              className: ge.warn,
              children: [
                '※ レベルが ',
                eg,
                ' ',
                '下がり、職業/称号スキルは振り直しになります（種族スキルは保持）。',
              ],
            }),
            d.jsx('h2', { className: ge.h2, children: '称号' }),
            B.titleId
              ? d.jsxs('p', {
                  className: ge.titleHave,
                  children: ['習得済み: ', (re = Gl[B.titleId]) == null ? void 0 : re.name],
                })
              : V < Wi.TITLE_DEPTH
                ? d.jsxs('p', {
                    className: ge.warn,
                    children: ['第 ', Wi.TITLE_DEPTH, ' 階到達で習得できます（現在 ', V, 'F）。'],
                  })
                : d.jsx('div', {
                    className: ge.titleOpts,
                    children: (((ke = ze[B.classId]) == null ? void 0 : ke.titleOptions) ?? []).map(
                      (R) => {
                        var b;
                        return d.jsxs(
                          'button',
                          {
                            type: 'button',
                            className: ge.titleBtn,
                            disabled: !ek(B, R, V),
                            onClick: () => void U((w) => UT(w, R, V)),
                            children: [(b = Gl[R]) == null ? void 0 : b.name, '（SP+5）'],
                          },
                          R
                        );
                      }
                    ),
                  }),
            d.jsx('h2', { className: ge.h2, children: '転生' }),
            Wg(B)
              ? M
                ? d.jsxs('div', {
                    className: ge.rbForm,
                    children: [
                      d.jsxs('p', {
                        className: ge.warn,
                        children: [
                          '※ 作り直して強い新人になります（開始Lv ',
                          Math.min(30, Math.floor(B.level / 2)),
                          '・ボーナス付き）。',
                        ],
                      }),
                      d.jsx('input', {
                        className: ge.input,
                        type: 'text',
                        maxLength: 16,
                        placeholder: B.name,
                        value: p,
                        onChange: (R) => g(R.target.value),
                      }),
                      d.jsxs('div', {
                        className: ge.jobRow,
                        children: [
                          d.jsx('select', {
                            className: ge.select,
                            value: y,
                            onChange: (R) => k(R.target.value),
                            children: Ah.map((R) =>
                              d.jsx('option', { value: R, children: Ke[R].name }, R)
                            ),
                          }),
                          d.jsx('select', {
                            className: ge.select,
                            value: L,
                            onChange: (R) => N(R.target.value),
                            children: Gr.map((R) =>
                              d.jsx('option', { value: R, children: ze[R].name }, R)
                            ),
                          }),
                        ],
                      }),
                      d.jsxs('div', {
                        className: ge.jobRow,
                        children: [
                          d.jsx('button', {
                            type: 'button',
                            className: ge.danger,
                            onClick: () => {
                              (o((R) =>
                                HT(R, i, { raceId: y, classId: L, name: p.trim() || B.name })
                              ),
                                G(!1));
                            },
                            children: '転生を実行',
                          }),
                          d.jsx('button', {
                            type: 'button',
                            className: ge.actBtn,
                            onClick: () => G(!1),
                            children: 'やめる',
                          }),
                        ],
                      }),
                    ],
                  })
                : d.jsx('button', {
                    type: 'button',
                    className: ge.actBtn,
                    onClick: () => G(!0),
                    children: '転生する…',
                  })
              : d.jsxs('p', {
                  className: ge.warn,
                  children: [
                    'Lv',
                    Wi.REBIRTH_MIN_LEVEL,
                    ' 以上で転生できます（現在 Lv',
                    B.level,
                    '）。',
                  ],
                }),
          ],
        }),
        d.jsx('footer', {
          className: ge.foot,
          children: d.jsx('button', {
            type: 'button',
            className: ge.back,
            onClick: () => l('/guild'),
            children: 'もどる',
          }),
        }),
      ],
    });
    function oe(R) {
      return o((b) => jd(b, i, R));
    }
  },
  VT = () => d.jsx('div', { children: d.jsx('h1', { children: 'Not Found' }) }),
  QT = '_layout_1ktxr_1',
  KT = '_head_1ktxr_11',
  ZT = '_title_1ktxr_18',
  JT = '_gold_1ktxr_24',
  PT = '_tabs_1ktxr_29',
  FT = '_tab_1ktxr_29',
  WT = '_tabActive_1ktxr_46',
  eN = '_controls_1ktxr_51',
  tN = '_filters_1ktxr_58',
  lN = '_chip_1ktxr_64',
  aN = '_chipActive_1ktxr_75',
  nN = '_sortRow_1ktxr_81',
  iN = '_sortLabel_1ktxr_87',
  sN = '_sort_1ktxr_81',
  rN = '_list_1ktxr_105',
  oN = '_row_1ktxr_113',
  cN = '_info_1ktxr_124',
  uN = '_name_1ktxr_130',
  dN = '_note_1ktxr_135',
  mN = '_action_1ktxr_140',
  _N = '_empty_1ktxr_157',
  fN = '_foot_1ktxr_162',
  pN = '_back_1ktxr_166',
  hN = '_confirmOverlay_1ktxr_176',
  gN = '_confirmBox_1ktxr_187',
  kN = '_confirmText_1ktxr_199',
  vN = '_confirmActions_1ktxr_206',
  yN = '_confirmCancel_1ktxr_211',
  bN = '_confirmOk_1ktxr_212',
  xN = '_stepperRow_1ktxr_233',
  SN = '_stepperBtn_1ktxr_240',
  wN = '_stepperVal_1ktxr_255',
  TN = '_stepperMax_1ktxr_262',
  NN = '_totalRow_1ktxr_278',
  jN = '_nameBtn_1ktxr_284',
  EN = '_detailHeader_1ktxr_297',
  CN = '_detailName_1ktxr_304',
  AN = '_detailSlot_1ktxr_309',
  LN = '_detailRow_1ktxr_317',
  qN = '_detailLabel_1ktxr_324',
  me = {
    layout: QT,
    head: KT,
    title: ZT,
    gold: JT,
    tabs: PT,
    tab: FT,
    tabActive: WT,
    controls: eN,
    filters: tN,
    chip: lN,
    chipActive: aN,
    sortRow: nN,
    sortLabel: iN,
    sort: sN,
    list: rN,
    row: oN,
    info: cN,
    name: uN,
    note: dN,
    action: mN,
    empty: _N,
    foot: fN,
    back: pN,
    confirmOverlay: hN,
    confirmBox: gN,
    confirmText: kN,
    confirmActions: vN,
    confirmCancel: yN,
    confirmOk: bN,
    stepperRow: xN,
    stepperBtn: SN,
    stepperVal: wN,
    stepperMax: TN,
    totalRow: NN,
    nameBtn: jN,
    detailHeader: EN,
    detailName: CN,
    detailSlot: AN,
    detailRow: LN,
    detailLabel: qN,
  };
function BN(l) {
  return Math.max(0, Math.floor(l.towerState.record.deepestReached / 10));
}
const tk = {
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
  IN = (l, i = 1) => {
    const r = bd(l, i),
      o = [];
    return (
      r.atk && o.push(`ATK+${r.atk}`),
      r.mat && o.push(`MAT+${r.mat}`),
      r.def && o.push(`DEF+${r.def}`),
      r.mdf && o.push(`MDF+${r.mdf}`),
      o.join(' ')
    );
  };
function Dd(l, i) {
  var r;
  return ((r = l.shopStock.unlockedGrades) == null ? void 0 : r[i]) ?? 1;
}
function MN(l) {
  const i = BN(l),
    r = new Set(l.shopStock.unlockedItemIds),
    o = Object.values(tt)
      .filter((m) => m.buyPrice > 0)
      .map((m) => ({ id: m.id, name: m.name, price: m.buyPrice, kind: 'item' }));
  return [
    ...Object.values(Pe)
      .filter((m) => m.tier <= i || r.has(m.id))
      .map((m) => {
        const f = Dd(l, m.id);
        return {
          id: m.id,
          name: f > 1 ? `${m.name} Lv${f}` : m.name,
          price: Math.round(m.buyPrice * Xn(f)),
          kind: 'equip',
          note: IN(m.id, f),
        };
      }),
    ...o,
  ];
}
function ON(l) {
  return tk[l] ?? [];
}
function RN(l, i = 1) {
  return tt[l] ? tt[l].buyPrice : Pe[l] ? Math.round(Pe[l].buyPrice * Xn(i)) : null;
}
function cd(l, i = 1) {
  return tt[l]
    ? Math.round(sx(tt[l]) * Xn(i))
    : Pe[l]
      ? Math.floor((Pe[l].buyPrice * Xn(i)) / 2)
      : 0;
}
function lk(l) {
  var r;
  const i = (((r = Pe[l.masterId]) == null ? void 0 : r.buyPrice) ?? 0) * Xn(l.grade);
  return Math.floor(i / 2) + l.forgeLevel * 10;
}
function DN(l, i) {
  const r = l.guild.equipment.find((m) => m.id === i);
  if (!r) return l;
  const o = lk(r),
    u = l.guild.equipment.filter((m) => m.id !== i);
  return { ...l, guild: { ...l.guild, equipment: u, gold: l.guild.gold + o } };
}
function zN(l, i, r) {
  const o = Pe[i] ? Dd(l, i) : 1,
    u = RN(i, o);
  if (u === null || u <= 0 || r <= 0) return l;
  const m = Math.floor(l.guild.gold / u),
    f = Math.min(r, m);
  if (f <= 0) return l;
  const h = u * f;
  let p = l;
  if (Pe[i]) for (let g = 0; g < f; g++) p = Ax(p, i, 0, o);
  else p = Sd(p, i, f);
  return { ...p, guild: { ...p.guild, gold: p.guild.gold - h } };
}
function HN(l, i, r = 1, o = 1) {
  if (
    l.guild.storage
      .filter((y) => y.itemId === i && (y.grade ?? 1) === o)
      .reduce((y, k) => y + k.qty, 0) < r
  )
    return l;
  const m = cd(i, o) * r,
    f = wd(l, i, r, o),
    h = ON(i),
    p = [
      ...f.shopStock.unlockedItemIds,
      ...h.filter((y) => !f.shopStock.unlockedItemIds.includes(y)),
    ],
    g = { ...(f.shopStock.unlockedGrades ?? {}) };
  for (const y of h) g[y] = Math.max(g[y] ?? 1, o);
  return {
    ...f,
    guild: { ...f.guild, gold: f.guild.gold + m },
    shopStock: { ...f.shopStock, unlockedItemIds: p, unlockedGrades: g },
  };
}
function UN(l) {
  const i = Pe[l];
  return i
    ? i.slot === 'accessory'
      ? Object.values(ze).map((r) => r.name)
      : i.slot === 'weapon'
        ? Object.values(ze)
            .filter((r) => i.weaponType !== void 0 && r.equipableWeaponTypes.includes(i.weaponType))
            .map((r) => r.name)
        : Object.values(ze)
            .filter((r) => i.armorType !== void 0 && r.equipableArmorTypes.includes(i.armorType))
            .map((r) => r.name)
    : [];
}
const Lh = {
    weapon: '武器',
    armor: '防具',
    accessory: '装飾品',
    item: 'アイテム',
    material: '素材',
  },
  $N = ['weapon', 'armor', 'accessory', 'item', 'material'],
  qh = { priceDesc: '金額が高い順', priceAsc: '金額が安い順', qtyDesc: '所持数が多い順' },
  Bh = (l) => {
    var r;
    const i = (r = tt[l]) == null ? void 0 : r.category;
    return i === 'material' || i === 'drop' ? 'material' : 'item';
  },
  GN = () => {
    const l = pl(),
      { save: i, applyAndPersist: r } = Kl(),
      [o, u] = S.useState('buy'),
      [m, f] = S.useState(null),
      [h, p] = S.useState(1),
      [g, y] = S.useState('all'),
      [k, L] = S.useState('priceAsc'),
      [N, M] = S.useState(null);
    if (!i) return d.jsx(_l, { to: '/title', replace: !0 });
    const G = i.guild.gold,
      B = (D, fe = 1) => {
        var le, re;
        const O =
          ((le = tt[D]) == null ? void 0 : le.name) ??
          ((re = Pe[D]) == null ? void 0 : re.name) ??
          D;
        return fe > 1 ? `${O} Lv${fe}` : O;
      },
      j = MN(i).map((D) => {
        var fe;
        return {
          key: D.id,
          entry: D,
          category:
            D.kind === 'equip'
              ? (((fe = Pe[D.id]) == null ? void 0 : fe.slot) ?? 'item')
              : Bh(D.id),
          price: D.price,
          qty:
            D.kind === 'equip'
              ? i.guild.equipment.filter((O) => O.masterId === D.id).length
              : xd(i, D.id),
        };
      }),
      A = [
        ...i.guild.equipment.map((D) => {
          var fe;
          return {
            key: `eq_${D.id}`,
            kind: 'equip',
            inst: D,
            name: xa(D),
            price: lk(D),
            category: ((fe = Pe[D.masterId]) == null ? void 0 : fe.slot) ?? 'item',
            qty: 1,
          };
        }),
        ...i.guild.storage
          .filter((D) => cd(D.itemId, D.grade ?? 1) > 0)
          .map((D) => ({
            key: `it_${D.itemId}_${D.grade ?? 1}`,
            kind: 'item',
            itemId: D.itemId,
            grade: D.grade ?? 1,
            name: B(D.itemId, D.grade ?? 1),
            price: cd(D.itemId, D.grade ?? 1),
            category: Bh(D.itemId),
            qty: D.qty,
          })),
      ],
      V = o === 'buy' ? j : A,
      U = $N.filter((D) => V.some((fe) => fe.category === D)),
      oe = g !== 'all' && !U.includes(g) ? 'all' : g;
    function W(D) {
      return [...(oe === 'all' ? D : D.filter((O) => O.category === oe))].sort((O, le) =>
        k === 'priceAsc'
          ? O.price - le.price
          : k === 'qtyDesc'
            ? le.qty - O.qty
            : le.price - O.price
      );
    }
    const x = (D) => {
        (u(D), y('all'));
      },
      q = (D) => {
        (f(D), p(1));
      },
      Z = () => {
        m &&
          (m.kind === 'buy'
            ? r((D) => zN(D, m.id, h))
            : m.kind === 'sellItem'
              ? r((D) => HN(D, m.itemId, h, m.grade))
              : r((D) => DN(D, m.id)),
          f(null));
      },
      ee = W(j),
      te = W(A),
      ce =
        m && m.kind !== 'sellEquip'
          ? m.kind === 'buy'
            ? Math.max(1, Math.floor(G / m.price))
            : m.maxQty
          : 1,
      ve = () => {
        if (!N) return null;
        const D = Pe[N.masterId];
        if (!D) return null;
        const fe = N.grade ?? Dd(i, N.masterId),
          O = bd(N.masterId, fe),
          le = A4[D.slot],
          re = UN(N.masterId),
          ke = [];
        if (
          (O.atk && ke.push(`ATK+${O.atk}`),
          O.mat && ke.push(`MAT+${O.mat}`),
          O.def && ke.push(`DEF+${O.def}`),
          O.mdf && ke.push(`MDF+${O.mdf}`),
          O.statMods)
        ) {
          const R = {
            hp: 'HP',
            tp: 'TP',
            str: 'STR',
            vit: 'VIT',
            agi: 'AGI',
            int: 'INT',
            mnd: 'MND',
            luc: 'LUC',
          };
          for (const [b, w] of Object.entries(O.statMods))
            w && ke.push(`${R[b] ?? b}${w >= 0 ? '+' : ''}${w}`);
        }
        return d.jsx('div', {
          className: me.confirmOverlay,
          onClick: () => M(null),
          children: d.jsxs('div', {
            className: me.confirmBox,
            onClick: (R) => R.stopPropagation(),
            children: [
              d.jsxs('div', {
                className: me.detailHeader,
                children: [
                  d.jsx('span', { className: me.detailName, children: N.name }),
                  d.jsx('span', { className: me.detailSlot, children: le }),
                ],
              }),
              D.slot === 'weapon' &&
                D.weaponType &&
                d.jsxs('div', {
                  className: me.detailRow,
                  children: [
                    d.jsx('span', { className: me.detailLabel, children: '武器種' }),
                    d.jsx('span', { children: Yg[D.weaponType] }),
                  ],
                }),
              D.slot === 'armor' &&
                D.armorType &&
                d.jsxs('div', {
                  className: me.detailRow,
                  children: [
                    d.jsx('span', { className: me.detailLabel, children: '防具種' }),
                    d.jsx('span', { children: Xg[D.armorType] }),
                  ],
                }),
              ke.length > 0 &&
                d.jsxs('div', {
                  className: me.detailRow,
                  children: [
                    d.jsx('span', { className: me.detailLabel, children: '性能' }),
                    d.jsx('span', { children: ke.join(' / ') }),
                  ],
                }),
              d.jsxs('div', {
                className: me.detailRow,
                children: [
                  d.jsx('span', { className: me.detailLabel, children: '装備可能' }),
                  d.jsx('span', { children: D.slot === 'accessory' ? '全職業' : re.join('・') }),
                ],
              }),
              d.jsxs('div', {
                className: me.detailRow,
                children: [
                  d.jsx('span', {
                    className: me.detailLabel,
                    children: N.mode === 'buy' ? '購入価格' : '売却額',
                  }),
                  d.jsxs('span', { children: [N.price, ' G'] }),
                ],
              }),
              d.jsxs('div', {
                className: me.detailRow,
                children: [
                  d.jsx('span', { className: me.detailLabel, children: '所持数' }),
                  d.jsx('span', { children: N.ownedQty }),
                ],
              }),
              d.jsx('div', {
                className: me.confirmActions,
                children: d.jsx('button', {
                  type: 'button',
                  className: me.confirmCancel,
                  onClick: () => M(null),
                  children: '閉じる',
                }),
              }),
            ],
          }),
        });
      };
    return d.jsxs('div', {
      className: me.layout,
      children: [
        d.jsxs('header', {
          className: me.head,
          children: [
            d.jsx('h1', { className: me.title, children: 'ショップ' }),
            d.jsxs('span', { className: me.gold, children: [G, ' G'] }),
          ],
        }),
        d.jsxs('div', {
          className: me.tabs,
          children: [
            d.jsx('button', {
              type: 'button',
              className: `${me.tab} ${o === 'buy' ? me.tabActive : ''}`,
              onClick: () => x('buy'),
              children: '買う',
            }),
            d.jsx('button', {
              type: 'button',
              className: `${me.tab} ${o === 'sell' ? me.tabActive : ''}`,
              onClick: () => x('sell'),
              children: '売る',
            }),
          ],
        }),
        d.jsxs('div', {
          className: me.controls,
          children: [
            d.jsxs('div', {
              className: me.filters,
              children: [
                d.jsx('button', {
                  type: 'button',
                  className: `${me.chip} ${oe === 'all' ? me.chipActive : ''}`,
                  onClick: () => y('all'),
                  children: 'すべて',
                }),
                U.map((D) =>
                  d.jsx(
                    'button',
                    {
                      type: 'button',
                      className: `${me.chip} ${oe === D ? me.chipActive : ''}`,
                      onClick: () => y(D),
                      children: Lh[D],
                    },
                    D
                  )
                ),
              ],
            }),
            d.jsxs('label', {
              className: me.sortRow,
              children: [
                d.jsx('span', { className: me.sortLabel, children: '並び替え' }),
                d.jsx('select', {
                  className: me.sort,
                  value: k,
                  onChange: (D) => L(D.target.value),
                  children: Object.keys(qh).map((D) =>
                    d.jsx('option', { value: D, children: qh[D] }, D)
                  ),
                }),
              ],
            }),
          ],
        }),
        d.jsx('div', {
          className: me.list,
          children:
            o === 'buy'
              ? ee.length === 0
                ? d.jsx('p', { className: me.empty, children: '該当する商品がありません。' })
                : ee.map(({ entry: D, qty: fe }) =>
                    d.jsxs(
                      'div',
                      {
                        className: me.row,
                        children: [
                          d.jsxs('div', {
                            className: me.info,
                            children: [
                              D.kind === 'equip'
                                ? d.jsx('button', {
                                    type: 'button',
                                    className: me.nameBtn,
                                    onClick: () =>
                                      M({
                                        masterId: D.id,
                                        name: D.name,
                                        ownedQty: fe,
                                        price: D.price,
                                        mode: 'buy',
                                      }),
                                    children: D.name,
                                  })
                                : d.jsx('span', { className: me.name, children: D.name }),
                              d.jsxs('span', {
                                className: me.note,
                                children: [D.note ? `${D.note} ・ ` : '', '所持 ', fe],
                              }),
                            ],
                          }),
                          d.jsxs('button', {
                            type: 'button',
                            className: me.action,
                            disabled: G < D.price,
                            onClick: () =>
                              q({ kind: 'buy', id: D.id, name: D.name, price: D.price }),
                            children: [D.price, ' G'],
                          }),
                        ],
                      },
                      D.id
                    )
                  )
              : te.length === 0
                ? d.jsx('p', { className: me.empty, children: '売れる物がありません。' })
                : te.map((D) =>
                    d.jsxs(
                      'div',
                      {
                        className: me.row,
                        children: [
                          d.jsxs('div', {
                            className: me.info,
                            children: [
                              D.kind === 'equip'
                                ? d.jsx('button', {
                                    type: 'button',
                                    className: me.nameBtn,
                                    onClick: () =>
                                      M({
                                        masterId: D.inst.masterId,
                                        name: D.name,
                                        ownedQty: 1,
                                        price: D.price,
                                        mode: 'sell',
                                        grade: D.inst.grade ?? 1,
                                      }),
                                    children: D.name,
                                  })
                                : d.jsx('span', { className: me.name, children: D.name }),
                              d.jsxs('span', {
                                className: me.note,
                                children: [
                                  Lh[D.category],
                                  D.kind === 'item' ? ` ・ 所持 ${D.qty}` : '',
                                ],
                              }),
                            ],
                          }),
                          d.jsxs('button', {
                            type: 'button',
                            className: me.action,
                            onClick: () =>
                              q(
                                D.kind === 'equip'
                                  ? {
                                      kind: 'sellEquip',
                                      id: D.inst.id,
                                      name: D.name,
                                      price: D.price,
                                    }
                                  : {
                                      kind: 'sellItem',
                                      itemId: D.itemId,
                                      grade: D.grade,
                                      name: D.name,
                                      price: D.price,
                                      maxQty: D.qty,
                                    }
                              ),
                            children: ['売却 ', D.price, ' G'],
                          }),
                        ],
                      },
                      D.key
                    )
                  ),
        }),
        d.jsx('footer', {
          className: me.foot,
          children: d.jsx('button', {
            type: 'button',
            className: me.back,
            onClick: () => l('/town'),
            children: '拠点へ戻る',
          }),
        }),
        m
          ? d.jsx('div', {
              className: me.confirmOverlay,
              onClick: () => f(null),
              children: d.jsxs('div', {
                className: me.confirmBox,
                onClick: (D) => D.stopPropagation(),
                children: [
                  d.jsx('div', {
                    className: me.confirmText,
                    children:
                      m.kind === 'buy'
                        ? d.jsxs(d.Fragment, {
                            children: [d.jsx('strong', { children: m.name }), ' を購入しますか？'],
                          })
                        : m.kind === 'sellEquip'
                          ? d.jsxs(d.Fragment, {
                              children: [
                                d.jsx('strong', { children: m.name }),
                                ' を ',
                                m.price,
                                ' G で売却しますか？',
                              ],
                            })
                          : d.jsxs(d.Fragment, {
                              children: [
                                d.jsx('strong', { children: m.name }),
                                ' を売却しますか？',
                              ],
                            }),
                  }),
                  m.kind !== 'sellEquip' &&
                    d.jsxs('div', {
                      className: me.stepperRow,
                      children: [
                        d.jsx('button', {
                          type: 'button',
                          className: me.stepperBtn,
                          disabled: h <= 1,
                          onClick: () => p((D) => Math.max(1, D - 1)),
                          children: '−',
                        }),
                        d.jsx('span', { className: me.stepperVal, children: h }),
                        d.jsx('button', {
                          type: 'button',
                          className: me.stepperBtn,
                          disabled: h >= ce,
                          onClick: () => p((D) => Math.min(ce, D + 1)),
                          children: '＋',
                        }),
                        d.jsx('button', {
                          type: 'button',
                          className: me.stepperMax,
                          disabled: h >= ce,
                          onClick: () => p(ce),
                          children: '最大',
                        }),
                      ],
                    }),
                  m.kind !== 'sellEquip' &&
                    d.jsxs('div', {
                      className: me.totalRow,
                      children: ['合計: ', d.jsxs('strong', { children: [m.price * h, ' G'] })],
                    }),
                  d.jsxs('div', {
                    className: me.confirmActions,
                    children: [
                      d.jsx('button', {
                        type: 'button',
                        className: me.confirmCancel,
                        onClick: () => f(null),
                        children: 'やめる',
                      }),
                      d.jsx('button', {
                        type: 'button',
                        className: me.confirmOk,
                        onClick: Z,
                        children: m.kind === 'buy' ? '購入する' : '売却する',
                      }),
                    ],
                  }),
                ],
              }),
            })
          : null,
        N ? ve() : null,
      ],
    });
  },
  YN = '_layout_1xkiw_1',
  XN = '_head_1xkiw_12',
  VN = '_title_1xkiw_17',
  QN = '_subtitle_1xkiw_24',
  KN = '_body_1xkiw_30',
  ZN = '_menu_1xkiw_34',
  JN = '_loading_1xkiw_40',
  PN = '_warn_1xkiw_45',
  FN = '_danger_1xkiw_52',
  WN = '_dialog_1xkiw_67',
  ej = '_dialogTitle_1xkiw_77',
  tj = '_field_1xkiw_82',
  lj = '_note_1xkiw_96',
  aj = '_dialogActions_1xkiw_102',
  nj = '_primary_1xkiw_107',
  ij = '_sub_1xkiw_24',
  sj = '_foot_1xkiw_132',
  et = {
    layout: YN,
    head: XN,
    title: VN,
    subtitle: QN,
    body: KN,
    menu: ZN,
    loading: JN,
    warn: PN,
    danger: FN,
    dialog: WN,
    dialogTitle: ej,
    field: tj,
    note: lj,
    dialogActions: aj,
    primary: nj,
    sub: ij,
    foot: sj,
  },
  rj = '_card_3vsn6_1',
  oj = '_corrupted_3vsn6_14',
  cj = '_corruptedText_3vsn6_19',
  uj = '_corruptedNote_3vsn6_25',
  dj = '_guildName_3vsn6_31',
  mj = '_meta_3vsn6_36',
  ba = {
    card: rj,
    corrupted: oj,
    corruptedText: cj,
    corruptedNote: uj,
    guildName: dj,
    meta: mj,
    continue: '_continue_3vsn6_56',
  },
  _j = (l) => {
    if (!l) return '-';
    const i = new Date(l),
      r = (o) => String(o).padStart(2, '0');
    return `${i.getFullYear()}/${r(i.getMonth() + 1)}/${r(i.getDate())} ${r(i.getHours())}:${r(i.getMinutes())}`;
  },
  fj = ({ meta: l, onContinue: i }) =>
    l.corrupted
      ? d.jsxs('div', {
          className: `${ba.card} ${ba.corrupted}`,
          children: [
            d.jsx('div', { className: ba.corruptedText, children: 'セーブデータが破損しています' }),
            d.jsx('p', {
              className: ba.corruptedNote,
              children: '「最初から」で新しく始められます。',
            }),
          ],
        })
      : d.jsxs('div', {
          className: ba.card,
          children: [
            d.jsx('div', { className: ba.guildName, children: l.guildName }),
            d.jsxs('dl', {
              className: ba.meta,
              children: [
                d.jsxs('div', {
                  children: [
                    d.jsx('dt', { children: '最高到達階' }),
                    d.jsx('dd', {
                      children: l.deepestReached > 0 ? `${l.deepestReached}F` : '未踏破',
                    }),
                  ],
                }),
                d.jsxs('div', {
                  children: [
                    d.jsx('dt', { children: '団員' }),
                    d.jsxs('dd', { children: [l.memberCount, '人'] }),
                  ],
                }),
                d.jsxs('div', {
                  children: [
                    d.jsx('dt', { children: '最終セーブ' }),
                    d.jsx('dd', { children: _j(l.savedAt) }),
                  ],
                }),
              ],
            }),
            d.jsx('button', {
              type: 'button',
              className: ba.continue,
              onClick: i,
              children: 'つづきから',
            }),
          ],
        }),
  pj = () => {
    const l = pl(),
      { startNewGame: i, continueGame: r } = Kl(),
      [o, u] = S.useState(null),
      [m, f] = S.useState(!0),
      [h, p] = S.useState('menu'),
      [g, y] = S.useState(''),
      [k, L] = S.useState(!1);
    S.useEffect(() => {
      (async () => (u(await n3()), f(!1)))();
    }, []);
    const N = o !== null && !o.corrupted,
      M = S.useCallback(async () => {
        L(!0);
        const j = await r();
        (L(!1), j.ok && l('/town'));
      }, [r, l]),
      G = S.useCallback(() => {
        (y(''), p(N ? 'confirm' : 'guildName'));
      }, [N]),
      B = S.useCallback(async () => {
        const j = g.trim() || 'ななしのギルド';
        (L(!0), await i(j), L(!1), l('/town'));
      }, [g, i, l]);
    return d.jsxs('div', {
      className: et.layout,
      children: [
        d.jsxs('header', {
          className: et.head,
          children: [
            d.jsx('h1', { className: et.title, children: '世界樹ライク' }),
            d.jsx('p', { className: et.subtitle, children: '無限タワー探索 RPG' }),
          ],
        }),
        d.jsx('main', {
          className: et.body,
          children: m
            ? d.jsx('p', { className: et.loading, children: '読み込み中...' })
            : h === 'guildName'
              ? d.jsxs('div', {
                  className: et.dialog,
                  children: [
                    d.jsx('h2', { className: et.dialogTitle, children: '新しいギルド' }),
                    d.jsxs('label', {
                      className: et.field,
                      children: [
                        d.jsx('span', { children: 'ギルド名' }),
                        d.jsx('input', {
                          type: 'text',
                          value: g,
                          maxLength: 16,
                          placeholder: 'ななしのギルド',
                          onChange: (j) => y(j.target.value),
                          autoFocus: !0,
                        }),
                      ],
                    }),
                    d.jsx('p', {
                      className: et.note,
                      children:
                        '冒険者はまだいません。開始後、ギルドメニューで仲間を作成してください。',
                    }),
                    d.jsxs('div', {
                      className: et.dialogActions,
                      children: [
                        d.jsx('button', {
                          type: 'button',
                          className: et.primary,
                          disabled: k,
                          onClick: B,
                          children: 'はじめる',
                        }),
                        d.jsx('button', {
                          type: 'button',
                          className: et.sub,
                          disabled: k,
                          onClick: () => p('menu'),
                          children: 'もどる',
                        }),
                      ],
                    }),
                  ],
                })
              : h === 'confirm'
                ? d.jsxs('div', {
                    className: et.dialog,
                    children: [
                      d.jsx('h2', { className: et.dialogTitle, children: '最初から始めますか？' }),
                      d.jsxs('p', {
                        className: et.warn,
                        children: [
                          '現在のセーブデータ「',
                          o == null ? void 0 : o.guildName,
                          '」は上書きされ、元に戻せません。',
                        ],
                      }),
                      d.jsxs('div', {
                        className: et.dialogActions,
                        children: [
                          d.jsx('button', {
                            type: 'button',
                            className: et.danger,
                            disabled: k,
                            onClick: () => p('guildName'),
                            children: 'データを消して始める',
                          }),
                          d.jsx('button', {
                            type: 'button',
                            className: et.sub,
                            disabled: k,
                            onClick: () => p('menu'),
                            children: 'もどる',
                          }),
                        ],
                      }),
                    ],
                  })
                : d.jsxs('div', {
                    className: et.menu,
                    children: [
                      o !== null && d.jsx(fj, { meta: o, onContinue: () => void M() }),
                      d.jsx('button', {
                        type: 'button',
                        className: N ? et.sub : et.primary,
                        onClick: G,
                        children: '最初から',
                      }),
                    ],
                  }),
        }),
        d.jsxs('footer', { className: et.foot, children: ['v', '0.1.38'] }),
      ],
    });
  },
  hj = '_layout_uxqv8_1',
  gj = '_head_uxqv8_12',
  kj = '_guildName_uxqv8_16',
  vj = '_stats_uxqv8_21',
  yj = '_hint_uxqv8_40',
  bj = '_menu_uxqv8_50',
  xj = '_foot_uxqv8_57',
  Sj = '_exit_uxqv8_61',
  wj = '_warpOverlay_uxqv8_72',
  Tj = '_warpPanel_uxqv8_83',
  Nj = '_warpTitle_uxqv8_94',
  jj = '_warpBtn_uxqv8_99',
  Ej = '_warpClose_uxqv8_110',
  Gt = {
    layout: hj,
    head: gj,
    guildName: kj,
    stats: vj,
    hint: yj,
    menu: bj,
    foot: xj,
    exit: Sj,
    warpOverlay: wj,
    warpPanel: Tj,
    warpTitle: Nj,
    warpBtn: jj,
    warpClose: Ej,
  },
  Cj = '_button_1tp4a_1',
  Aj = '_primary_1tp4a_26',
  Lj = '_label_1tp4a_32',
  qj = '_description_1tp4a_37',
  Yr = { button: Cj, primary: Aj, label: Lj, description: qj },
  zn = ({ label: l, description: i, variant: r = 'default', disabled: o = !1, onClick: u }) =>
    d.jsxs('button', {
      type: 'button',
      className: `${Yr.button} ${r === 'primary' ? Yr.primary : ''}`,
      disabled: o,
      onClick: u,
      children: [
        d.jsx('span', { className: Yr.label, children: l }),
        i ? d.jsx('span', { className: Yr.description, children: i }) : null,
      ],
    }),
  Bj = () => {
    const l = pl(),
      { save: i, exitToTitle: r, applyAndPersist: o } = Kl(),
      [u, m] = S.useState(!1);
    if (!i) return d.jsx(_l, { to: '/title', replace: !0 });
    const { guild: f, towerState: h, diveState: p } = i,
      g = f.members.length > 0,
      y = () => {
        (r(), l('/title'));
      },
      k = async () => {
        (p || (await o((M) => _h(M, 1))), l('/dungeon'));
      },
      L = h.warp.unlockedCheckpoints,
      N = async (M) => {
        (m(!1), await o((G) => _h(G, M)), l('/dungeon'));
      };
    return d.jsxs('div', {
      className: Gt.layout,
      children: [
        d.jsxs('header', {
          className: Gt.head,
          children: [
            d.jsx('div', { className: Gt.guildName, children: f.name }),
            d.jsxs('dl', {
              className: Gt.stats,
              children: [
                d.jsxs('div', {
                  children: [
                    d.jsx('dt', { children: '所持金' }),
                    d.jsxs('dd', { children: [f.gold, ' G'] }),
                  ],
                }),
                d.jsxs('div', {
                  children: [
                    d.jsx('dt', { children: '最高到達' }),
                    d.jsx('dd', {
                      children: h.record.deepestReached > 0 ? `${h.record.deepestReached}F` : '-',
                    }),
                  ],
                }),
                d.jsxs('div', {
                  children: [
                    d.jsx('dt', { children: '団員' }),
                    d.jsxs('dd', { children: [f.members.length, '人'] }),
                  ],
                }),
              ],
            }),
          ],
        }),
        !g &&
          d.jsx('p', {
            className: Gt.hint,
            children:
              'まずは「ギルド管理」で冒険者を作成してください。団員がいないとダイブできません。',
          }),
        d.jsxs('main', {
          className: Gt.menu,
          children: [
            d.jsx(zn, {
              label: p ? '潜行を再開' : 'ダイブ開始',
              description: g
                ? p
                  ? `${p.depth}F から再開`
                  : '第1階からタワーへ潜る'
                : '団員が必要です',
              variant: 'primary',
              disabled: !g,
              onClick: () => void k(),
            }),
            d.jsx(zn, {
              label: 'ワープ',
              description:
                L.length === 0
                  ? 'ボス撃破で解放'
                  : p
                    ? '潜行中は使えません'
                    : `解放済み: ${L.map((M) => `${M}F`).join('・')}`,
              disabled: !g || L.length === 0 || !!p,
              onClick: () => m(!0),
            }),
            d.jsx(zn, {
              label: 'ギルド管理',
              description: '編成・キャラ作成',
              onClick: () => l('/guild'),
            }),
            d.jsx(zn, {
              label: 'ショップ',
              description: '装備・アイテム売買',
              onClick: () => l('/shop'),
            }),
            d.jsx(zn, {
              label: '鍛冶屋',
              description: '装備の強化・リサイクル',
              onClick: () => l('/forge'),
            }),
            d.jsx(zn, {
              label: '図鑑 / 記録',
              description: '到達記録・モンスター図鑑',
              onClick: () => l('/codex'),
            }),
          ],
        }),
        d.jsx('footer', {
          className: Gt.foot,
          children: d.jsx('button', {
            type: 'button',
            className: Gt.exit,
            onClick: y,
            children: 'タイトルへ戻る',
          }),
        }),
        u
          ? d.jsx('div', {
              className: Gt.warpOverlay,
              onClick: () => m(!1),
              children: d.jsxs('div', {
                className: Gt.warpPanel,
                onClick: (M) => M.stopPropagation(),
                children: [
                  d.jsx('div', { className: Gt.warpTitle, children: 'ワープ先を選択' }),
                  L.map((M) =>
                    d.jsxs(
                      'button',
                      {
                        type: 'button',
                        className: Gt.warpBtn,
                        onClick: () => void N(M),
                        children: ['第 ', M, ' 階へ'],
                      },
                      M
                    )
                  ),
                  d.jsx('button', {
                    type: 'button',
                    className: Gt.warpClose,
                    onClick: () => m(!1),
                    children: 'とじる',
                  }),
                ],
              }),
            })
          : null,
      ],
    });
  };
function Ij() {
  return d.jsxs(N0, {
    children: [
      d.jsx(al, { path: '/', element: d.jsx(_l, { to: '/title', replace: !0 }) }),
      d.jsx(al, { path: '/title', element: d.jsx(pj, {}) }),
      d.jsx(al, { path: '/town', element: d.jsx(Bj, {}) }),
      d.jsx(al, { path: '/guild', element: d.jsx(F4, {}) }),
      d.jsx(al, { path: '/guild/char/:id', element: d.jsx(XT, {}) }),
      d.jsx(al, { path: '/shop', element: d.jsx(GN, {}) }),
      d.jsx(al, { path: '/forge', element: d.jsx(k5, {}) }),
      d.jsx(al, { path: '/codex', element: d.jsx(Z3, {}) }),
      d.jsx(al, { path: '/dungeon', element: d.jsx(Xw, {}) }),
      d.jsx(al, { path: '/battle', element: d.jsx(p3, {}) }),
      d.jsx(al, { path: '*', element: d.jsx(VT, {}) }),
    ],
  });
}
const Mj = {
    races: Ke,
    classes: ze,
    titles: Gl,
    skills: $n,
    unionSkills: Un,
    summons: Jn,
    gatherTypes: Va,
    recipes: Fn,
    enemies: Tt,
    items: tt,
    equipment: Pe,
  },
  Oj = /^[a-z]+_[a-z0-9_]+$/;
function cl(l, i, r) {
  for (const o of i)
    Oj.test(o) || r.push(`[${l}] ID 命名規約違反: "${o}"（期待: <domain>_<name>）`);
}
function Vu(l, i, r, o) {
  const u = new Set(i.skills.map((m) => m.skillId));
  for (const m of i.skills) {
    r.has(m.skillId) || o.push(`[${l}] 未定義スキルを参照: "${m.skillId}"`);
    for (const f of m.requires ?? [])
      u.has(f.skillId) ||
        o.push(`[${l}] スキル "${m.skillId}" の前提 "${f.skillId}" が同ツリーに存在しない`);
  }
}
function Rj() {
  var B;
  const l = [],
    {
      races: i,
      classes: r,
      titles: o,
      skills: u,
      unionSkills: m,
      summons: f,
      gatherTypes: h,
      recipes: p,
      enemies: g,
      items: y,
      equipment: k,
    } = Mj;
  (cl('races', Object.keys(i), l),
    cl('classes', Object.keys(r), l),
    cl('titles', Object.keys(o), l),
    cl('skills', Object.keys(u), l),
    cl('enemies', Object.keys(g), l),
    cl('items', Object.keys(y), l),
    cl('equipment', Object.keys(k), l));
  const L = (j, A) => {
    for (const [V, U] of Object.entries(A))
      V !== U.id && l.push(`[${j}] キー "${V}" と id "${U.id}" が不一致`);
  };
  (L('races', i),
    L('classes', r),
    L('titles', o),
    L('skills', u),
    L('enemies', g),
    L('items', y),
    L('equipment', k));
  const N = new Set(Object.keys(u)),
    M = new Set(Object.keys(r)),
    G = new Set(Object.keys(o));
  for (const j of Object.values(i)) {
    (M.has(j.defaultClassId) ||
      l.push(`[races] "${j.id}" の defaultClassId "${j.defaultClassId}" が未定義`),
      Vu(`races/${j.id}`, j.raceSkillTree, N, l));
    for (const A of j.raceSkillTree.skills) {
      const V = m[A.skillId];
      V &&
        V.raceId !== j.id &&
        l.push(`[races/${j.id}] ユニオンスキル "${A.skillId}" の raceId "${V.raceId}" が不一致`);
    }
  }
  for (const j of Object.values(m)) {
    const A = (B = i[j.raceId]) == null ? void 0 : B.raceSkillTree;
    (!A || !A.skills.some((V) => V.skillId === j.id)) &&
      l.push(`[unionSkills] "${j.id}" が種族 "${j.raceId}" のスキルツリーに無い`);
  }
  cl('unionSkills', Object.keys(m), l);
  for (const [j, A] of Object.entries(m))
    (j !== A.id && l.push(`[unionSkills] キー "${j}" と id "${A.id}" が不一致`),
      A.id in u || l.push(`[unionSkills] "${A.id}" が skills に未定義`),
      A.requiredParticipants < 1 &&
        l.push(`[unionSkills] "${A.id}" の requiredParticipants が 1 未満`),
      (A.gaugeCostPerParticipant < 0 || A.gaugeCostPerParticipant > 100) &&
        l.push(`[unionSkills] "${A.id}" の gaugeCostPerParticipant が 0..100 外`),
      A.id in wt &&
        l.push(
          `[unionSkills] "${A.id}" が BATTLE_SKILLS にも存在（通常スキルとして撃ててしまう）`
        ));
  cl('passiveSkills', Object.keys(Fu), l);
  for (const [j, A] of Object.entries(Fu))
    (j !== A.id && l.push(`[passiveSkills] キー "${j}" と id "${A.id}" が不一致`),
      N.has(A.id) || l.push(`[passiveSkills] "${A.id}" が skills に未定義`),
      A.id in wt &&
        l.push(`[passiveSkills] "${A.id}" が BATTLE_SKILLS にも存在（戦闘で撃ててしまう）`),
      A.id in m && l.push(`[passiveSkills] "${A.id}" が UNION_SKILLS にも存在`));
  cl('summons', Object.keys(f), l);
  for (const [j, A] of Object.entries(f))
    j !== A.id && l.push(`[summons] キー "${j}" と id "${A.id}" が不一致`);
  for (const j of Object.values(wt))
    for (const A of j.effects)
      A.kind === 'summon' &&
        !(A.summonKind in f) &&
        l.push(`[battleSkills] "${j.id}" の召喚 "${A.summonKind}" が未定義`);
  for (const [j, A] of Object.entries(h)) {
    (j !== A.type && l.push(`[gatherTypes] キー "${j}" と type "${A.type}" が不一致`),
      N.has(A.requiredSkillId) ||
        l.push(`[gatherTypes] "${A.type}" の requiredSkillId "${A.requiredSkillId}" が未定義`));
    for (const V of A.drops) {
      if (!(V.itemId in y))
        l.push(`[gatherTypes] "${A.type}" のドロップ "${V.itemId}" が未定義アイテム`);
      else {
        const U = y[V.itemId].category === 'food';
        (A.food &&
          !U &&
          l.push(`[gatherTypes] 食材系統 "${A.type}" のドロップ "${V.itemId}" が food でない`),
          !A.food &&
            U &&
            l.push(`[gatherTypes] 素材系統 "${A.type}" のドロップ "${V.itemId}" が food`));
      }
      V.weight <= 0 && l.push(`[gatherTypes] "${A.type}" のドロップ重みが正でない`);
    }
  }
  cl('recipes', Object.keys(p), l);
  for (const [j, A] of Object.entries(p)) {
    j !== A.id && l.push(`[recipes] キー "${j}" と id "${A.id}" が不一致`);
    for (const V of A.ingredients)
      V.itemId in y
        ? y[V.itemId].category !== 'food' &&
          l.push(`[recipes] "${A.id}" の材料 "${V.itemId}" が food カテゴリでない`)
        : l.push(`[recipes] "${A.id}" の材料 "${V.itemId}" が未定義`);
    A.result.itemId in y
      ? y[A.result.itemId].category !== 'food' &&
        l.push(`[recipes] "${A.id}" の結果 "${A.result.itemId}" が food カテゴリでない`)
      : l.push(`[recipes] "${A.id}" の結果 "${A.result.itemId}" が未定義`);
  }
  for (const j of Object.values(r)) {
    Vu(`classes/${j.id}`, j.skillTree, N, l);
    for (const A of j.titleOptions) {
      if (!G.has(A)) {
        l.push(`[classes] "${j.id}" の称号 "${A}" が未定義`);
        continue;
      }
      o[A].parentClassId !== j.id &&
        l.push(`[classes] 称号 "${A}" の parentClassId が "${j.id}" と不一致`);
    }
  }
  for (const j of Object.values(o))
    (M.has(j.parentClassId) ||
      l.push(`[titles] "${j.id}" の parentClassId "${j.parentClassId}" が未定義`),
      Vu(`titles/${j.id}`, j.skillTree, N, l));
  for (const j of Object.values(k))
    (j.slot === 'weapon' &&
      !j.weaponType &&
      l.push(`[equipment] "${j.id}" は weapon だが weaponType が未設定`),
      j.slot === 'armor' &&
        !j.armorType &&
        l.push(`[equipment] "${j.id}" は armor だが armorType が未設定`),
      (j.buyPrice < 0 || j.tier < 0) && l.push(`[equipment] "${j.id}" の buyPrice/tier が負`));
  for (const j of Object.values(y))
    (j.buyPrice < 0 && l.push(`[items] "${j.id}" の buyPrice が負`),
      j.category === 'consumable' &&
        !j.useContext &&
        !j.effects &&
        l.push(`[items] 消費アイテム "${j.id}" に useContext も effects も無い（使用不能）`));
  for (const j of Object.values(g))
    for (const A of j.drops ?? [])
      (A.itemId in y || l.push(`[enemies] "${j.id}" のドロップ "${A.itemId}" が未定義アイテム`),
        (A.rate < 0 || A.rate > 1) &&
          l.push(`[enemies] "${j.id}" のドロップ "${A.itemId}" の rate が 0..1 外`));
  for (const [j, A] of Object.entries(tk)) {
    j in y || l.push(`[SELL_UNLOCKS] キー素材 "${j}" が未定義`);
    for (const V of A) V in k || l.push(`[SELL_UNLOCKS] 解放先装備 "${V}" が未定義`);
  }
  return { ok: l.length === 0, errors: l };
}
const Ih = Rj();
Ih.ok || console.error('マスターデータ検証エラー:', Ih.errors);
const ak = document.getElementById('root');
if (!ak) throw new Error('Failed to find #root element');
Ey.createRoot(ak).render(
  d.jsx(J0, { basename: '/sekaiju-like-game', children: d.jsx(r3, { children: d.jsx(Ij, {}) }) })
);
