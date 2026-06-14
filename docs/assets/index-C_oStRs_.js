(function () {
  const o = document.createElement('link').relList;
  if (o && o.supports && o.supports('modulepreload')) return;
  for (const d of document.querySelectorAll('link[rel="modulepreload"]')) c(d);
  new MutationObserver((d) => {
    for (const y of d)
      if (y.type === 'childList')
        for (const b of y.addedNodes) b.tagName === 'LINK' && b.rel === 'modulepreload' && c(b);
  }).observe(document, { childList: !0, subtree: !0 });
  function s(d) {
    const y = {};
    return (
      d.integrity && (y.integrity = d.integrity),
      d.referrerPolicy && (y.referrerPolicy = d.referrerPolicy),
      d.crossOrigin === 'use-credentials'
        ? (y.credentials = 'include')
        : d.crossOrigin === 'anonymous'
          ? (y.credentials = 'omit')
          : (y.credentials = 'same-origin'),
      y
    );
  }
  function c(d) {
    if (d.ep) return;
    d.ep = !0;
    const y = s(d);
    fetch(d.href, y);
  }
})();
var _c = { exports: {} },
  Mu = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Wd;
function ev() {
  if (Wd) return Mu;
  Wd = 1;
  var f = Symbol.for('react.transitional.element'),
    o = Symbol.for('react.fragment');
  function s(c, d, y) {
    var b = null;
    if ((y !== void 0 && (b = '' + y), d.key !== void 0 && (b = '' + d.key), 'key' in d)) {
      y = {};
      for (var O in d) O !== 'key' && (y[O] = d[O]);
    } else y = d;
    return ((d = y.ref), { $$typeof: f, type: c, key: b, ref: d !== void 0 ? d : null, props: y });
  }
  return ((Mu.Fragment = o), (Mu.jsx = s), (Mu.jsxs = s), Mu);
}
var kd;
function av() {
  return (kd || ((kd = 1), (_c.exports = ev())), _c.exports);
}
var Dl = av(),
  Oc = { exports: {} },
  Du = {},
  Mc = { exports: {} },
  Dc = {};
/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Fd;
function uv() {
  return (
    Fd ||
      ((Fd = 1),
      (function (f) {
        function o(M, B) {
          var $ = M.length;
          M.push(B);
          t: for (; 0 < $; ) {
            var yt = ($ - 1) >>> 1,
              pt = M[yt];
            if (0 < d(pt, B)) ((M[yt] = B), (M[$] = pt), ($ = yt));
            else break t;
          }
        }
        function s(M) {
          return M.length === 0 ? null : M[0];
        }
        function c(M) {
          if (M.length === 0) return null;
          var B = M[0],
            $ = M.pop();
          if ($ !== B) {
            M[0] = $;
            t: for (var yt = 0, pt = M.length, g = pt >>> 1; yt < g; ) {
              var H = 2 * (yt + 1) - 1,
                q = M[H],
                X = H + 1,
                I = M[X];
              if (0 > d(q, $))
                X < pt && 0 > d(I, q)
                  ? ((M[yt] = I), (M[X] = $), (yt = X))
                  : ((M[yt] = q), (M[H] = $), (yt = H));
              else if (X < pt && 0 > d(I, $)) ((M[yt] = I), (M[X] = $), (yt = X));
              else break t;
            }
          }
          return B;
        }
        function d(M, B) {
          var $ = M.sortIndex - B.sortIndex;
          return $ !== 0 ? $ : M.id - B.id;
        }
        if (
          ((f.unstable_now = void 0),
          typeof performance == 'object' && typeof performance.now == 'function')
        ) {
          var y = performance;
          f.unstable_now = function () {
            return y.now();
          };
        } else {
          var b = Date,
            O = b.now();
          f.unstable_now = function () {
            return b.now() - O;
          };
        }
        var p = [],
          v = [],
          C = 1,
          A = null,
          x = 3,
          K = !1,
          V = !1,
          j = !1,
          G = !1,
          Y = typeof setTimeout == 'function' ? setTimeout : null,
          F = typeof clearTimeout == 'function' ? clearTimeout : null,
          w = typeof setImmediate < 'u' ? setImmediate : null;
        function mt(M) {
          for (var B = s(v); B !== null; ) {
            if (B.callback === null) c(v);
            else if (B.startTime <= M) (c(v), (B.sortIndex = B.expirationTime), o(p, B));
            else break;
            B = s(v);
          }
        }
        function st(M) {
          if (((j = !1), mt(M), !V))
            if (s(p) !== null) ((V = !0), Et || ((Et = !0), Jt()));
            else {
              var B = s(v);
              B !== null && Nt(st, B.startTime - M);
            }
        }
        var Et = !1,
          W = -1,
          Mt = 5,
          Kt = -1;
        function Cl() {
          return G ? !0 : !(f.unstable_now() - Kt < Mt);
        }
        function hl() {
          if (((G = !1), Et)) {
            var M = f.unstable_now();
            Kt = M;
            var B = !0;
            try {
              t: {
                ((V = !1), j && ((j = !1), F(W), (W = -1)), (K = !0));
                var $ = x;
                try {
                  l: {
                    for (mt(M), A = s(p); A !== null && !(A.expirationTime > M && Cl()); ) {
                      var yt = A.callback;
                      if (typeof yt == 'function') {
                        ((A.callback = null), (x = A.priorityLevel));
                        var pt = yt(A.expirationTime <= M);
                        if (((M = f.unstable_now()), typeof pt == 'function')) {
                          ((A.callback = pt), mt(M), (B = !0));
                          break l;
                        }
                        (A === s(p) && c(p), mt(M));
                      } else c(p);
                      A = s(p);
                    }
                    if (A !== null) B = !0;
                    else {
                      var g = s(v);
                      (g !== null && Nt(st, g.startTime - M), (B = !1));
                    }
                  }
                  break t;
                } finally {
                  ((A = null), (x = $), (K = !1));
                }
                B = void 0;
              }
            } finally {
              B ? Jt() : (Et = !1);
            }
          }
        }
        var Jt;
        if (typeof w == 'function')
          Jt = function () {
            w(hl);
          };
        else if (typeof MessageChannel < 'u') {
          var Nl = new MessageChannel(),
            ml = Nl.port2;
          ((Nl.port1.onmessage = hl),
            (Jt = function () {
              ml.postMessage(null);
            }));
        } else
          Jt = function () {
            Y(hl, 0);
          };
        function Nt(M, B) {
          W = Y(function () {
            M(f.unstable_now());
          }, B);
        }
        ((f.unstable_IdlePriority = 5),
          (f.unstable_ImmediatePriority = 1),
          (f.unstable_LowPriority = 4),
          (f.unstable_NormalPriority = 3),
          (f.unstable_Profiling = null),
          (f.unstable_UserBlockingPriority = 2),
          (f.unstable_cancelCallback = function (M) {
            M.callback = null;
          }),
          (f.unstable_forceFrameRate = function (M) {
            0 > M || 125 < M
              ? console.error(
                  'forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported'
                )
              : (Mt = 0 < M ? Math.floor(1e3 / M) : 5);
          }),
          (f.unstable_getCurrentPriorityLevel = function () {
            return x;
          }),
          (f.unstable_next = function (M) {
            switch (x) {
              case 1:
              case 2:
              case 3:
                var B = 3;
                break;
              default:
                B = x;
            }
            var $ = x;
            x = B;
            try {
              return M();
            } finally {
              x = $;
            }
          }),
          (f.unstable_requestPaint = function () {
            G = !0;
          }),
          (f.unstable_runWithPriority = function (M, B) {
            switch (M) {
              case 1:
              case 2:
              case 3:
              case 4:
              case 5:
                break;
              default:
                M = 3;
            }
            var $ = x;
            x = M;
            try {
              return B();
            } finally {
              x = $;
            }
          }),
          (f.unstable_scheduleCallback = function (M, B, $) {
            var yt = f.unstable_now();
            switch (
              (typeof $ == 'object' && $ !== null
                ? (($ = $.delay), ($ = typeof $ == 'number' && 0 < $ ? yt + $ : yt))
                : ($ = yt),
              M)
            ) {
              case 1:
                var pt = -1;
                break;
              case 2:
                pt = 250;
                break;
              case 5:
                pt = 1073741823;
                break;
              case 4:
                pt = 1e4;
                break;
              default:
                pt = 5e3;
            }
            return (
              (pt = $ + pt),
              (M = {
                id: C++,
                callback: B,
                priorityLevel: M,
                startTime: $,
                expirationTime: pt,
                sortIndex: -1,
              }),
              $ > yt
                ? ((M.sortIndex = $),
                  o(v, M),
                  s(p) === null && M === s(v) && (j ? (F(W), (W = -1)) : (j = !0), Nt(st, $ - yt)))
                : ((M.sortIndex = pt), o(p, M), V || K || ((V = !0), Et || ((Et = !0), Jt()))),
              M
            );
          }),
          (f.unstable_shouldYield = Cl),
          (f.unstable_wrapCallback = function (M) {
            var B = x;
            return function () {
              var $ = x;
              x = B;
              try {
                return M.apply(this, arguments);
              } finally {
                x = $;
              }
            };
          }));
      })(Dc)),
    Dc
  );
}
var Id;
function nv() {
  return (Id || ((Id = 1), (Mc.exports = uv())), Mc.exports);
}
var Uc = { exports: {} },
  k = {};
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Pd;
function iv() {
  if (Pd) return k;
  Pd = 1;
  var f = Symbol.for('react.transitional.element'),
    o = Symbol.for('react.portal'),
    s = Symbol.for('react.fragment'),
    c = Symbol.for('react.strict_mode'),
    d = Symbol.for('react.profiler'),
    y = Symbol.for('react.consumer'),
    b = Symbol.for('react.context'),
    O = Symbol.for('react.forward_ref'),
    p = Symbol.for('react.suspense'),
    v = Symbol.for('react.memo'),
    C = Symbol.for('react.lazy'),
    A = Symbol.for('react.activity'),
    x = Symbol.iterator;
  function K(g) {
    return g === null || typeof g != 'object'
      ? null
      : ((g = (x && g[x]) || g['@@iterator']), typeof g == 'function' ? g : null);
  }
  var V = {
      isMounted: function () {
        return !1;
      },
      enqueueForceUpdate: function () {},
      enqueueReplaceState: function () {},
      enqueueSetState: function () {},
    },
    j = Object.assign,
    G = {};
  function Y(g, H, q) {
    ((this.props = g), (this.context = H), (this.refs = G), (this.updater = q || V));
  }
  ((Y.prototype.isReactComponent = {}),
    (Y.prototype.setState = function (g, H) {
      if (typeof g != 'object' && typeof g != 'function' && g != null)
        throw Error(
          'takes an object of state variables to update or a function which returns an object of state variables.'
        );
      this.updater.enqueueSetState(this, g, H, 'setState');
    }),
    (Y.prototype.forceUpdate = function (g) {
      this.updater.enqueueForceUpdate(this, g, 'forceUpdate');
    }));
  function F() {}
  F.prototype = Y.prototype;
  function w(g, H, q) {
    ((this.props = g), (this.context = H), (this.refs = G), (this.updater = q || V));
  }
  var mt = (w.prototype = new F());
  ((mt.constructor = w), j(mt, Y.prototype), (mt.isPureReactComponent = !0));
  var st = Array.isArray;
  function Et() {}
  var W = { H: null, A: null, T: null, S: null },
    Mt = Object.prototype.hasOwnProperty;
  function Kt(g, H, q) {
    var X = q.ref;
    return { $$typeof: f, type: g, key: H, ref: X !== void 0 ? X : null, props: q };
  }
  function Cl(g, H) {
    return Kt(g.type, H, g.props);
  }
  function hl(g) {
    return typeof g == 'object' && g !== null && g.$$typeof === f;
  }
  function Jt(g) {
    var H = { '=': '=0', ':': '=2' };
    return (
      '$' +
      g.replace(/[=:]/g, function (q) {
        return H[q];
      })
    );
  }
  var Nl = /\/+/g;
  function ml(g, H) {
    return typeof g == 'object' && g !== null && g.key != null ? Jt('' + g.key) : H.toString(36);
  }
  function Nt(g) {
    switch (g.status) {
      case 'fulfilled':
        return g.value;
      case 'rejected':
        throw g.reason;
      default:
        switch (
          (typeof g.status == 'string'
            ? g.then(Et, Et)
            : ((g.status = 'pending'),
              g.then(
                function (H) {
                  g.status === 'pending' && ((g.status = 'fulfilled'), (g.value = H));
                },
                function (H) {
                  g.status === 'pending' && ((g.status = 'rejected'), (g.reason = H));
                }
              )),
          g.status)
        ) {
          case 'fulfilled':
            return g.value;
          case 'rejected':
            throw g.reason;
        }
    }
    throw g;
  }
  function M(g, H, q, X, I) {
    var lt = typeof g;
    (lt === 'undefined' || lt === 'boolean') && (g = null);
    var ot = !1;
    if (g === null) ot = !0;
    else
      switch (lt) {
        case 'bigint':
        case 'string':
        case 'number':
          ot = !0;
          break;
        case 'object':
          switch (g.$$typeof) {
            case f:
            case o:
              ot = !0;
              break;
            case C:
              return ((ot = g._init), M(ot(g._payload), H, q, X, I));
          }
      }
    if (ot)
      return (
        (I = I(g)),
        (ot = X === '' ? '.' + ml(g, 0) : X),
        st(I)
          ? ((q = ''),
            ot != null && (q = ot.replace(Nl, '$&/') + '/'),
            M(I, H, q, '', function (Ba) {
              return Ba;
            }))
          : I != null &&
            (hl(I) &&
              (I = Cl(
                I,
                q +
                  (I.key == null || (g && g.key === I.key)
                    ? ''
                    : ('' + I.key).replace(Nl, '$&/') + '/') +
                  ot
              )),
            H.push(I)),
        1
      );
    ot = 0;
    var $t = X === '' ? '.' : X + ':';
    if (st(g))
      for (var Dt = 0; Dt < g.length; Dt++)
        ((X = g[Dt]), (lt = $t + ml(X, Dt)), (ot += M(X, H, q, lt, I)));
    else if (((Dt = K(g)), typeof Dt == 'function'))
      for (g = Dt.call(g), Dt = 0; !(X = g.next()).done; )
        ((X = X.value), (lt = $t + ml(X, Dt++)), (ot += M(X, H, q, lt, I)));
    else if (lt === 'object') {
      if (typeof g.then == 'function') return M(Nt(g), H, q, X, I);
      throw (
        (H = String(g)),
        Error(
          'Objects are not valid as a React child (found: ' +
            (H === '[object Object]' ? 'object with keys {' + Object.keys(g).join(', ') + '}' : H) +
            '). If you meant to render a collection of children, use an array instead.'
        )
      );
    }
    return ot;
  }
  function B(g, H, q) {
    if (g == null) return g;
    var X = [],
      I = 0;
    return (
      M(g, X, '', '', function (lt) {
        return H.call(q, lt, I++);
      }),
      X
    );
  }
  function $(g) {
    if (g._status === -1) {
      var H = g._result;
      ((H = H()),
        H.then(
          function (q) {
            (g._status === 0 || g._status === -1) && ((g._status = 1), (g._result = q));
          },
          function (q) {
            (g._status === 0 || g._status === -1) && ((g._status = 2), (g._result = q));
          }
        ),
        g._status === -1 && ((g._status = 0), (g._result = H)));
    }
    if (g._status === 1) return g._result.default;
    throw g._result;
  }
  var yt =
      typeof reportError == 'function'
        ? reportError
        : function (g) {
            if (typeof window == 'object' && typeof window.ErrorEvent == 'function') {
              var H = new window.ErrorEvent('error', {
                bubbles: !0,
                cancelable: !0,
                message:
                  typeof g == 'object' && g !== null && typeof g.message == 'string'
                    ? String(g.message)
                    : String(g),
                error: g,
              });
              if (!window.dispatchEvent(H)) return;
            } else if (typeof process == 'object' && typeof process.emit == 'function') {
              process.emit('uncaughtException', g);
              return;
            }
            console.error(g);
          },
    pt = {
      map: B,
      forEach: function (g, H, q) {
        B(
          g,
          function () {
            H.apply(this, arguments);
          },
          q
        );
      },
      count: function (g) {
        var H = 0;
        return (
          B(g, function () {
            H++;
          }),
          H
        );
      },
      toArray: function (g) {
        return (
          B(g, function (H) {
            return H;
          }) || []
        );
      },
      only: function (g) {
        if (!hl(g))
          throw Error('React.Children.only expected to receive a single React element child.');
        return g;
      },
    };
  return (
    (k.Activity = A),
    (k.Children = pt),
    (k.Component = Y),
    (k.Fragment = s),
    (k.Profiler = d),
    (k.PureComponent = w),
    (k.StrictMode = c),
    (k.Suspense = p),
    (k.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = W),
    (k.__COMPILER_RUNTIME = {
      __proto__: null,
      c: function (g) {
        return W.H.useMemoCache(g);
      },
    }),
    (k.cache = function (g) {
      return function () {
        return g.apply(null, arguments);
      };
    }),
    (k.cacheSignal = function () {
      return null;
    }),
    (k.cloneElement = function (g, H, q) {
      if (g == null) throw Error('The argument must be a React element, but you passed ' + g + '.');
      var X = j({}, g.props),
        I = g.key;
      if (H != null)
        for (lt in (H.key !== void 0 && (I = '' + H.key), H))
          !Mt.call(H, lt) ||
            lt === 'key' ||
            lt === '__self' ||
            lt === '__source' ||
            (lt === 'ref' && H.ref === void 0) ||
            (X[lt] = H[lt]);
      var lt = arguments.length - 2;
      if (lt === 1) X.children = q;
      else if (1 < lt) {
        for (var ot = Array(lt), $t = 0; $t < lt; $t++) ot[$t] = arguments[$t + 2];
        X.children = ot;
      }
      return Kt(g.type, I, X);
    }),
    (k.createContext = function (g) {
      return (
        (g = {
          $$typeof: b,
          _currentValue: g,
          _currentValue2: g,
          _threadCount: 0,
          Provider: null,
          Consumer: null,
        }),
        (g.Provider = g),
        (g.Consumer = { $$typeof: y, _context: g }),
        g
      );
    }),
    (k.createElement = function (g, H, q) {
      var X,
        I = {},
        lt = null;
      if (H != null)
        for (X in (H.key !== void 0 && (lt = '' + H.key), H))
          Mt.call(H, X) && X !== 'key' && X !== '__self' && X !== '__source' && (I[X] = H[X]);
      var ot = arguments.length - 2;
      if (ot === 1) I.children = q;
      else if (1 < ot) {
        for (var $t = Array(ot), Dt = 0; Dt < ot; Dt++) $t[Dt] = arguments[Dt + 2];
        I.children = $t;
      }
      if (g && g.defaultProps)
        for (X in ((ot = g.defaultProps), ot)) I[X] === void 0 && (I[X] = ot[X]);
      return Kt(g, lt, I);
    }),
    (k.createRef = function () {
      return { current: null };
    }),
    (k.forwardRef = function (g) {
      return { $$typeof: O, render: g };
    }),
    (k.isValidElement = hl),
    (k.lazy = function (g) {
      return { $$typeof: C, _payload: { _status: -1, _result: g }, _init: $ };
    }),
    (k.memo = function (g, H) {
      return { $$typeof: v, type: g, compare: H === void 0 ? null : H };
    }),
    (k.startTransition = function (g) {
      var H = W.T,
        q = {};
      W.T = q;
      try {
        var X = g(),
          I = W.S;
        (I !== null && I(q, X),
          typeof X == 'object' && X !== null && typeof X.then == 'function' && X.then(Et, yt));
      } catch (lt) {
        yt(lt);
      } finally {
        (H !== null && q.types !== null && (H.types = q.types), (W.T = H));
      }
    }),
    (k.unstable_useCacheRefresh = function () {
      return W.H.useCacheRefresh();
    }),
    (k.use = function (g) {
      return W.H.use(g);
    }),
    (k.useActionState = function (g, H, q) {
      return W.H.useActionState(g, H, q);
    }),
    (k.useCallback = function (g, H) {
      return W.H.useCallback(g, H);
    }),
    (k.useContext = function (g) {
      return W.H.useContext(g);
    }),
    (k.useDebugValue = function () {}),
    (k.useDeferredValue = function (g, H) {
      return W.H.useDeferredValue(g, H);
    }),
    (k.useEffect = function (g, H) {
      return W.H.useEffect(g, H);
    }),
    (k.useEffectEvent = function (g) {
      return W.H.useEffectEvent(g);
    }),
    (k.useId = function () {
      return W.H.useId();
    }),
    (k.useImperativeHandle = function (g, H, q) {
      return W.H.useImperativeHandle(g, H, q);
    }),
    (k.useInsertionEffect = function (g, H) {
      return W.H.useInsertionEffect(g, H);
    }),
    (k.useLayoutEffect = function (g, H) {
      return W.H.useLayoutEffect(g, H);
    }),
    (k.useMemo = function (g, H) {
      return W.H.useMemo(g, H);
    }),
    (k.useOptimistic = function (g, H) {
      return W.H.useOptimistic(g, H);
    }),
    (k.useReducer = function (g, H, q) {
      return W.H.useReducer(g, H, q);
    }),
    (k.useRef = function (g) {
      return W.H.useRef(g);
    }),
    (k.useState = function (g) {
      return W.H.useState(g);
    }),
    (k.useSyncExternalStore = function (g, H, q) {
      return W.H.useSyncExternalStore(g, H, q);
    }),
    (k.useTransition = function () {
      return W.H.useTransition();
    }),
    (k.version = '19.2.5'),
    k
  );
}
var th;
function Lc() {
  return (th || ((th = 1), (Uc.exports = iv())), Uc.exports);
}
var Cc = { exports: {} },
  wt = {};
/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var lh;
function fv() {
  if (lh) return wt;
  lh = 1;
  var f = Lc();
  function o(p) {
    var v = 'https://react.dev/errors/' + p;
    if (1 < arguments.length) {
      v += '?args[]=' + encodeURIComponent(arguments[1]);
      for (var C = 2; C < arguments.length; C++) v += '&args[]=' + encodeURIComponent(arguments[C]);
    }
    return (
      'Minified React error #' +
      p +
      '; visit ' +
      v +
      ' for the full message or use the non-minified dev environment for full errors and additional helpful warnings.'
    );
  }
  function s() {}
  var c = {
      d: {
        f: s,
        r: function () {
          throw Error(o(522));
        },
        D: s,
        C: s,
        L: s,
        m: s,
        X: s,
        S: s,
        M: s,
      },
      p: 0,
      findDOMNode: null,
    },
    d = Symbol.for('react.portal');
  function y(p, v, C) {
    var A = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: d,
      key: A == null ? null : '' + A,
      children: p,
      containerInfo: v,
      implementation: C,
    };
  }
  var b = f.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function O(p, v) {
    if (p === 'font') return '';
    if (typeof v == 'string') return v === 'use-credentials' ? v : '';
  }
  return (
    (wt.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = c),
    (wt.createPortal = function (p, v) {
      var C = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
      if (!v || (v.nodeType !== 1 && v.nodeType !== 9 && v.nodeType !== 11)) throw Error(o(299));
      return y(p, v, null, C);
    }),
    (wt.flushSync = function (p) {
      var v = b.T,
        C = c.p;
      try {
        if (((b.T = null), (c.p = 2), p)) return p();
      } finally {
        ((b.T = v), (c.p = C), c.d.f());
      }
    }),
    (wt.preconnect = function (p, v) {
      typeof p == 'string' &&
        (v
          ? ((v = v.crossOrigin),
            (v = typeof v == 'string' ? (v === 'use-credentials' ? v : '') : void 0))
          : (v = null),
        c.d.C(p, v));
    }),
    (wt.prefetchDNS = function (p) {
      typeof p == 'string' && c.d.D(p);
    }),
    (wt.preinit = function (p, v) {
      if (typeof p == 'string' && v && typeof v.as == 'string') {
        var C = v.as,
          A = O(C, v.crossOrigin),
          x = typeof v.integrity == 'string' ? v.integrity : void 0,
          K = typeof v.fetchPriority == 'string' ? v.fetchPriority : void 0;
        C === 'style'
          ? c.d.S(p, typeof v.precedence == 'string' ? v.precedence : void 0, {
              crossOrigin: A,
              integrity: x,
              fetchPriority: K,
            })
          : C === 'script' &&
            c.d.X(p, {
              crossOrigin: A,
              integrity: x,
              fetchPriority: K,
              nonce: typeof v.nonce == 'string' ? v.nonce : void 0,
            });
      }
    }),
    (wt.preinitModule = function (p, v) {
      if (typeof p == 'string')
        if (typeof v == 'object' && v !== null) {
          if (v.as == null || v.as === 'script') {
            var C = O(v.as, v.crossOrigin);
            c.d.M(p, {
              crossOrigin: C,
              integrity: typeof v.integrity == 'string' ? v.integrity : void 0,
              nonce: typeof v.nonce == 'string' ? v.nonce : void 0,
            });
          }
        } else v == null && c.d.M(p);
    }),
    (wt.preload = function (p, v) {
      if (typeof p == 'string' && typeof v == 'object' && v !== null && typeof v.as == 'string') {
        var C = v.as,
          A = O(C, v.crossOrigin);
        c.d.L(p, C, {
          crossOrigin: A,
          integrity: typeof v.integrity == 'string' ? v.integrity : void 0,
          nonce: typeof v.nonce == 'string' ? v.nonce : void 0,
          type: typeof v.type == 'string' ? v.type : void 0,
          fetchPriority: typeof v.fetchPriority == 'string' ? v.fetchPriority : void 0,
          referrerPolicy: typeof v.referrerPolicy == 'string' ? v.referrerPolicy : void 0,
          imageSrcSet: typeof v.imageSrcSet == 'string' ? v.imageSrcSet : void 0,
          imageSizes: typeof v.imageSizes == 'string' ? v.imageSizes : void 0,
          media: typeof v.media == 'string' ? v.media : void 0,
        });
      }
    }),
    (wt.preloadModule = function (p, v) {
      if (typeof p == 'string')
        if (v) {
          var C = O(v.as, v.crossOrigin);
          c.d.m(p, {
            as: typeof v.as == 'string' && v.as !== 'script' ? v.as : void 0,
            crossOrigin: C,
            integrity: typeof v.integrity == 'string' ? v.integrity : void 0,
          });
        } else c.d.m(p);
    }),
    (wt.requestFormReset = function (p) {
      c.d.r(p);
    }),
    (wt.unstable_batchedUpdates = function (p, v) {
      return p(v);
    }),
    (wt.useFormState = function (p, v, C) {
      return b.H.useFormState(p, v, C);
    }),
    (wt.useFormStatus = function () {
      return b.H.useHostTransitionStatus();
    }),
    (wt.version = '19.2.5'),
    wt
  );
}
var eh;
function cv() {
  if (eh) return Cc.exports;
  eh = 1;
  function f() {
    if (
      !(
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > 'u' ||
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != 'function'
      )
    )
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(f);
      } catch (o) {
        console.error(o);
      }
  }
  return (f(), (Cc.exports = fv()), Cc.exports);
}
/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var ah;
function rv() {
  if (ah) return Du;
  ah = 1;
  var f = nv(),
    o = Lc(),
    s = cv();
  function c(t) {
    var l = 'https://react.dev/errors/' + t;
    if (1 < arguments.length) {
      l += '?args[]=' + encodeURIComponent(arguments[1]);
      for (var e = 2; e < arguments.length; e++) l += '&args[]=' + encodeURIComponent(arguments[e]);
    }
    return (
      'Minified React error #' +
      t +
      '; visit ' +
      l +
      ' for the full message or use the non-minified dev environment for full errors and additional helpful warnings.'
    );
  }
  function d(t) {
    return !(!t || (t.nodeType !== 1 && t.nodeType !== 9 && t.nodeType !== 11));
  }
  function y(t) {
    var l = t,
      e = t;
    if (t.alternate) for (; l.return; ) l = l.return;
    else {
      t = l;
      do ((l = t), (l.flags & 4098) !== 0 && (e = l.return), (t = l.return));
      while (t);
    }
    return l.tag === 3 ? e : null;
  }
  function b(t) {
    if (t.tag === 13) {
      var l = t.memoizedState;
      if ((l === null && ((t = t.alternate), t !== null && (l = t.memoizedState)), l !== null))
        return l.dehydrated;
    }
    return null;
  }
  function O(t) {
    if (t.tag === 31) {
      var l = t.memoizedState;
      if ((l === null && ((t = t.alternate), t !== null && (l = t.memoizedState)), l !== null))
        return l.dehydrated;
    }
    return null;
  }
  function p(t) {
    if (y(t) !== t) throw Error(c(188));
  }
  function v(t) {
    var l = t.alternate;
    if (!l) {
      if (((l = y(t)), l === null)) throw Error(c(188));
      return l !== t ? null : t;
    }
    for (var e = t, a = l; ; ) {
      var u = e.return;
      if (u === null) break;
      var n = u.alternate;
      if (n === null) {
        if (((a = u.return), a !== null)) {
          e = a;
          continue;
        }
        break;
      }
      if (u.child === n.child) {
        for (n = u.child; n; ) {
          if (n === e) return (p(u), t);
          if (n === a) return (p(u), l);
          n = n.sibling;
        }
        throw Error(c(188));
      }
      if (e.return !== a.return) ((e = u), (a = n));
      else {
        for (var i = !1, r = u.child; r; ) {
          if (r === e) {
            ((i = !0), (e = u), (a = n));
            break;
          }
          if (r === a) {
            ((i = !0), (a = u), (e = n));
            break;
          }
          r = r.sibling;
        }
        if (!i) {
          for (r = n.child; r; ) {
            if (r === e) {
              ((i = !0), (e = n), (a = u));
              break;
            }
            if (r === a) {
              ((i = !0), (a = n), (e = u));
              break;
            }
            r = r.sibling;
          }
          if (!i) throw Error(c(189));
        }
      }
      if (e.alternate !== a) throw Error(c(190));
    }
    if (e.tag !== 3) throw Error(c(188));
    return e.stateNode.current === e ? t : l;
  }
  function C(t) {
    var l = t.tag;
    if (l === 5 || l === 26 || l === 27 || l === 6) return t;
    for (t = t.child; t !== null; ) {
      if (((l = C(t)), l !== null)) return l;
      t = t.sibling;
    }
    return null;
  }
  var A = Object.assign,
    x = Symbol.for('react.element'),
    K = Symbol.for('react.transitional.element'),
    V = Symbol.for('react.portal'),
    j = Symbol.for('react.fragment'),
    G = Symbol.for('react.strict_mode'),
    Y = Symbol.for('react.profiler'),
    F = Symbol.for('react.consumer'),
    w = Symbol.for('react.context'),
    mt = Symbol.for('react.forward_ref'),
    st = Symbol.for('react.suspense'),
    Et = Symbol.for('react.suspense_list'),
    W = Symbol.for('react.memo'),
    Mt = Symbol.for('react.lazy'),
    Kt = Symbol.for('react.activity'),
    Cl = Symbol.for('react.memo_cache_sentinel'),
    hl = Symbol.iterator;
  function Jt(t) {
    return t === null || typeof t != 'object'
      ? null
      : ((t = (hl && t[hl]) || t['@@iterator']), typeof t == 'function' ? t : null);
  }
  var Nl = Symbol.for('react.client.reference');
  function ml(t) {
    if (t == null) return null;
    if (typeof t == 'function') return t.$$typeof === Nl ? null : t.displayName || t.name || null;
    if (typeof t == 'string') return t;
    switch (t) {
      case j:
        return 'Fragment';
      case Y:
        return 'Profiler';
      case G:
        return 'StrictMode';
      case st:
        return 'Suspense';
      case Et:
        return 'SuspenseList';
      case Kt:
        return 'Activity';
    }
    if (typeof t == 'object')
      switch (t.$$typeof) {
        case V:
          return 'Portal';
        case w:
          return t.displayName || 'Context';
        case F:
          return (t._context.displayName || 'Context') + '.Consumer';
        case mt:
          var l = t.render;
          return (
            (t = t.displayName),
            t ||
              ((t = l.displayName || l.name || ''),
              (t = t !== '' ? 'ForwardRef(' + t + ')' : 'ForwardRef')),
            t
          );
        case W:
          return ((l = t.displayName || null), l !== null ? l : ml(t.type) || 'Memo');
        case Mt:
          ((l = t._payload), (t = t._init));
          try {
            return ml(t(l));
          } catch {}
      }
    return null;
  }
  var Nt = Array.isArray,
    M = o.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
    B = s.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
    $ = { pending: !1, data: null, method: null, action: null },
    yt = [],
    pt = -1;
  function g(t) {
    return { current: t };
  }
  function H(t) {
    0 > pt || ((t.current = yt[pt]), (yt[pt] = null), pt--);
  }
  function q(t, l) {
    (pt++, (yt[pt] = t.current), (t.current = l));
  }
  var X = g(null),
    I = g(null),
    lt = g(null),
    ot = g(null);
  function $t(t, l) {
    switch ((q(lt, l), q(I, t), q(X, null), l.nodeType)) {
      case 9:
      case 11:
        t = (t = l.documentElement) && (t = t.namespaceURI) ? Sd(t) : 0;
        break;
      default:
        if (((t = l.tagName), (l = l.namespaceURI))) ((l = Sd(l)), (t = pd(l, t)));
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
    (H(X), q(X, t));
  }
  function Dt() {
    (H(X), H(I), H(lt));
  }
  function Ba(t) {
    t.memoizedState !== null && q(ot, t);
    var l = X.current,
      e = pd(l, t.type);
    l !== e && (q(I, t), q(X, e));
  }
  function Bu(t) {
    (I.current === t && (H(X), H(I)), ot.current === t && (H(ot), (Au._currentValue = $)));
  }
  var fi, wc;
  function Ue(t) {
    if (fi === void 0)
      try {
        throw Error();
      } catch (e) {
        var l = e.stack.trim().match(/\n( *(at )?)/);
        ((fi = (l && l[1]) || ''),
          (wc =
            -1 <
            e.stack.indexOf(`
    at`)
              ? ' (<anonymous>)'
              : -1 < e.stack.indexOf('@')
                ? '@unknown:0:0'
                : ''));
      }
    return (
      `
` +
      fi +
      t +
      wc
    );
  }
  var ci = !1;
  function ri(t, l) {
    if (!t || ci) return '';
    ci = !0;
    var e = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var a = {
        DetermineComponentFrameRoot: function () {
          try {
            if (l) {
              var N = function () {
                throw Error();
              };
              if (
                (Object.defineProperty(N.prototype, 'props', {
                  set: function () {
                    throw Error();
                  },
                }),
                typeof Reflect == 'object' && Reflect.construct)
              ) {
                try {
                  Reflect.construct(N, []);
                } catch (R) {
                  var z = R;
                }
                Reflect.construct(t, [], N);
              } else {
                try {
                  N.call();
                } catch (R) {
                  z = R;
                }
                t.call(N.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (R) {
                z = R;
              }
              (N = t()) && typeof N.catch == 'function' && N.catch(function () {});
            }
          } catch (R) {
            if (R && z && typeof R.stack == 'string') return [R.stack, z.stack];
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
      var n = a.DetermineComponentFrameRoot(),
        i = n[0],
        r = n[1];
      if (i && r) {
        var h = i.split(`
`),
          T = r.split(`
`);
        for (u = a = 0; a < h.length && !h[a].includes('DetermineComponentFrameRoot'); ) a++;
        for (; u < T.length && !T[u].includes('DetermineComponentFrameRoot'); ) u++;
        if (a === h.length || u === T.length)
          for (a = h.length - 1, u = T.length - 1; 1 <= a && 0 <= u && h[a] !== T[u]; ) u--;
        for (; 1 <= a && 0 <= u; a--, u--)
          if (h[a] !== T[u]) {
            if (a !== 1 || u !== 1)
              do
                if ((a--, u--, 0 > u || h[a] !== T[u])) {
                  var _ =
                    `
` + h[a].replace(' at new ', ' at ');
                  return (
                    t.displayName &&
                      _.includes('<anonymous>') &&
                      (_ = _.replace('<anonymous>', t.displayName)),
                    _
                  );
                }
              while (1 <= a && 0 <= u);
            break;
          }
      }
    } finally {
      ((ci = !1), (Error.prepareStackTrace = e));
    }
    return (e = t ? t.displayName || t.name : '') ? Ue(e) : '';
  }
  function Hh(t, l) {
    switch (t.tag) {
      case 26:
      case 27:
      case 5:
        return Ue(t.type);
      case 16:
        return Ue('Lazy');
      case 13:
        return t.child !== l && l !== null ? Ue('Suspense Fallback') : Ue('Suspense');
      case 19:
        return Ue('SuspenseList');
      case 0:
      case 15:
        return ri(t.type, !1);
      case 11:
        return ri(t.type.render, !1);
      case 1:
        return ri(t.type, !0);
      case 31:
        return Ue('Activity');
      default:
        return '';
    }
  }
  function $c(t) {
    try {
      var l = '',
        e = null;
      do ((l += Hh(t, e)), (e = t), (t = t.return));
      while (t);
      return l;
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
  var oi = Object.prototype.hasOwnProperty,
    si = f.unstable_scheduleCallback,
    di = f.unstable_cancelCallback,
    xh = f.unstable_shouldYield,
    Bh = f.unstable_requestPaint,
    al = f.unstable_now,
    qh = f.unstable_getCurrentPriorityLevel,
    Wc = f.unstable_ImmediatePriority,
    kc = f.unstable_UserBlockingPriority,
    qu = f.unstable_NormalPriority,
    Yh = f.unstable_LowPriority,
    Fc = f.unstable_IdlePriority,
    Lh = f.log,
    jh = f.unstable_setDisableYieldValue,
    qa = null,
    ul = null;
  function ne(t) {
    if ((typeof Lh == 'function' && jh(t), ul && typeof ul.setStrictMode == 'function'))
      try {
        ul.setStrictMode(qa, t);
      } catch {}
  }
  var nl = Math.clz32 ? Math.clz32 : Qh,
    Gh = Math.log,
    Xh = Math.LN2;
  function Qh(t) {
    return ((t >>>= 0), t === 0 ? 32 : (31 - ((Gh(t) / Xh) | 0)) | 0);
  }
  var Yu = 256,
    Lu = 262144,
    ju = 4194304;
  function Ce(t) {
    var l = t & 42;
    if (l !== 0) return l;
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
  function Gu(t, l, e) {
    var a = t.pendingLanes;
    if (a === 0) return 0;
    var u = 0,
      n = t.suspendedLanes,
      i = t.pingedLanes;
    t = t.warmLanes;
    var r = a & 134217727;
    return (
      r !== 0
        ? ((a = r & ~n),
          a !== 0
            ? (u = Ce(a))
            : ((i &= r), i !== 0 ? (u = Ce(i)) : e || ((e = r & ~t), e !== 0 && (u = Ce(e)))))
        : ((r = a & ~n),
          r !== 0
            ? (u = Ce(r))
            : i !== 0
              ? (u = Ce(i))
              : e || ((e = a & ~t), e !== 0 && (u = Ce(e)))),
      u === 0
        ? 0
        : l !== 0 &&
            l !== u &&
            (l & n) === 0 &&
            ((n = u & -u), (e = l & -l), n >= e || (n === 32 && (e & 4194048) !== 0))
          ? l
          : u
    );
  }
  function Ya(t, l) {
    return (t.pendingLanes & ~(t.suspendedLanes & ~t.pingedLanes) & l) === 0;
  }
  function Zh(t, l) {
    switch (t) {
      case 1:
      case 2:
      case 4:
      case 8:
      case 64:
        return l + 250;
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
        return l + 5e3;
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
  function Ic() {
    var t = ju;
    return ((ju <<= 1), (ju & 62914560) === 0 && (ju = 4194304), t);
  }
  function hi(t) {
    for (var l = [], e = 0; 31 > e; e++) l.push(t);
    return l;
  }
  function La(t, l) {
    ((t.pendingLanes |= l),
      l !== 268435456 && ((t.suspendedLanes = 0), (t.pingedLanes = 0), (t.warmLanes = 0)));
  }
  function Vh(t, l, e, a, u, n) {
    var i = t.pendingLanes;
    ((t.pendingLanes = e),
      (t.suspendedLanes = 0),
      (t.pingedLanes = 0),
      (t.warmLanes = 0),
      (t.expiredLanes &= e),
      (t.entangledLanes &= e),
      (t.errorRecoveryDisabledLanes &= e),
      (t.shellSuspendCounter = 0));
    var r = t.entanglements,
      h = t.expirationTimes,
      T = t.hiddenUpdates;
    for (e = i & ~e; 0 < e; ) {
      var _ = 31 - nl(e),
        N = 1 << _;
      ((r[_] = 0), (h[_] = -1));
      var z = T[_];
      if (z !== null)
        for (T[_] = null, _ = 0; _ < z.length; _++) {
          var R = z[_];
          R !== null && (R.lane &= -536870913);
        }
      e &= ~N;
    }
    (a !== 0 && Pc(t, a, 0),
      n !== 0 && u === 0 && t.tag !== 0 && (t.suspendedLanes |= n & ~(i & ~l)));
  }
  function Pc(t, l, e) {
    ((t.pendingLanes |= l), (t.suspendedLanes &= ~l));
    var a = 31 - nl(l);
    ((t.entangledLanes |= l),
      (t.entanglements[a] = t.entanglements[a] | 1073741824 | (e & 261930)));
  }
  function tr(t, l) {
    var e = (t.entangledLanes |= l);
    for (t = t.entanglements; e; ) {
      var a = 31 - nl(e),
        u = 1 << a;
      ((u & l) | (t[a] & l) && (t[a] |= l), (e &= ~u));
    }
  }
  function lr(t, l) {
    var e = l & -l;
    return ((e = (e & 42) !== 0 ? 1 : mi(e)), (e & (t.suspendedLanes | l)) !== 0 ? 0 : e);
  }
  function mi(t) {
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
  function yi(t) {
    return ((t &= -t), 2 < t ? (8 < t ? ((t & 134217727) !== 0 ? 32 : 268435456) : 8) : 2);
  }
  function er() {
    var t = B.p;
    return t !== 0 ? t : ((t = window.event), t === void 0 ? 32 : Qd(t.type));
  }
  function ar(t, l) {
    var e = B.p;
    try {
      return ((B.p = t), l());
    } finally {
      B.p = e;
    }
  }
  var ie = Math.random().toString(36).slice(2),
    Gt = '__reactFiber$' + ie,
    kt = '__reactProps$' + ie,
    We = '__reactContainer$' + ie,
    vi = '__reactEvents$' + ie,
    Kh = '__reactListeners$' + ie,
    Jh = '__reactHandles$' + ie,
    ur = '__reactResources$' + ie,
    ja = '__reactMarker$' + ie;
  function gi(t) {
    (delete t[Gt], delete t[kt], delete t[vi], delete t[Kh], delete t[Jh]);
  }
  function ke(t) {
    var l = t[Gt];
    if (l) return l;
    for (var e = t.parentNode; e; ) {
      if ((l = e[We] || e[Gt])) {
        if (((e = l.alternate), l.child !== null || (e !== null && e.child !== null)))
          for (t = _d(t); t !== null; ) {
            if ((e = t[Gt])) return e;
            t = _d(t);
          }
        return l;
      }
      ((t = e), (e = t.parentNode));
    }
    return null;
  }
  function Fe(t) {
    if ((t = t[Gt] || t[We])) {
      var l = t.tag;
      if (l === 5 || l === 6 || l === 13 || l === 31 || l === 26 || l === 27 || l === 3) return t;
    }
    return null;
  }
  function Ga(t) {
    var l = t.tag;
    if (l === 5 || l === 26 || l === 27 || l === 6) return t.stateNode;
    throw Error(c(33));
  }
  function Ie(t) {
    var l = t[ur];
    return (l || (l = t[ur] = { hoistableStyles: new Map(), hoistableScripts: new Map() }), l);
  }
  function Lt(t) {
    t[ja] = !0;
  }
  var nr = new Set(),
    ir = {};
  function Ne(t, l) {
    (Pe(t, l), Pe(t + 'Capture', l));
  }
  function Pe(t, l) {
    for (ir[t] = l, t = 0; t < l.length; t++) nr.add(l[t]);
  }
  var wh = RegExp(
      '^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$'
    ),
    fr = {},
    cr = {};
  function $h(t) {
    return oi.call(cr, t)
      ? !0
      : oi.call(fr, t)
        ? !1
        : wh.test(t)
          ? (cr[t] = !0)
          : ((fr[t] = !0), !1);
  }
  function Xu(t, l, e) {
    if ($h(l))
      if (e === null) t.removeAttribute(l);
      else {
        switch (typeof e) {
          case 'undefined':
          case 'function':
          case 'symbol':
            t.removeAttribute(l);
            return;
          case 'boolean':
            var a = l.toLowerCase().slice(0, 5);
            if (a !== 'data-' && a !== 'aria-') {
              t.removeAttribute(l);
              return;
            }
        }
        t.setAttribute(l, '' + e);
      }
  }
  function Qu(t, l, e) {
    if (e === null) t.removeAttribute(l);
    else {
      switch (typeof e) {
        case 'undefined':
        case 'function':
        case 'symbol':
        case 'boolean':
          t.removeAttribute(l);
          return;
      }
      t.setAttribute(l, '' + e);
    }
  }
  function Ll(t, l, e, a) {
    if (a === null) t.removeAttribute(e);
    else {
      switch (typeof a) {
        case 'undefined':
        case 'function':
        case 'symbol':
        case 'boolean':
          t.removeAttribute(e);
          return;
      }
      t.setAttributeNS(l, e, '' + a);
    }
  }
  function yl(t) {
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
  function rr(t) {
    var l = t.type;
    return (t = t.nodeName) && t.toLowerCase() === 'input' && (l === 'checkbox' || l === 'radio');
  }
  function Wh(t, l, e) {
    var a = Object.getOwnPropertyDescriptor(t.constructor.prototype, l);
    if (
      !t.hasOwnProperty(l) &&
      typeof a < 'u' &&
      typeof a.get == 'function' &&
      typeof a.set == 'function'
    ) {
      var u = a.get,
        n = a.set;
      return (
        Object.defineProperty(t, l, {
          configurable: !0,
          get: function () {
            return u.call(this);
          },
          set: function (i) {
            ((e = '' + i), n.call(this, i));
          },
        }),
        Object.defineProperty(t, l, { enumerable: a.enumerable }),
        {
          getValue: function () {
            return e;
          },
          setValue: function (i) {
            e = '' + i;
          },
          stopTracking: function () {
            ((t._valueTracker = null), delete t[l]);
          },
        }
      );
    }
  }
  function Si(t) {
    if (!t._valueTracker) {
      var l = rr(t) ? 'checked' : 'value';
      t._valueTracker = Wh(t, l, '' + t[l]);
    }
  }
  function or(t) {
    if (!t) return !1;
    var l = t._valueTracker;
    if (!l) return !0;
    var e = l.getValue(),
      a = '';
    return (
      t && (a = rr(t) ? (t.checked ? 'true' : 'false') : t.value),
      (t = a),
      t !== e ? (l.setValue(t), !0) : !1
    );
  }
  function Zu(t) {
    if (((t = t || (typeof document < 'u' ? document : void 0)), typeof t > 'u')) return null;
    try {
      return t.activeElement || t.body;
    } catch {
      return t.body;
    }
  }
  var kh = /[\n"\\]/g;
  function vl(t) {
    return t.replace(kh, function (l) {
      return '\\' + l.charCodeAt(0).toString(16) + ' ';
    });
  }
  function pi(t, l, e, a, u, n, i, r) {
    ((t.name = ''),
      i != null && typeof i != 'function' && typeof i != 'symbol' && typeof i != 'boolean'
        ? (t.type = i)
        : t.removeAttribute('type'),
      l != null
        ? i === 'number'
          ? ((l === 0 && t.value === '') || t.value != l) && (t.value = '' + yl(l))
          : t.value !== '' + yl(l) && (t.value = '' + yl(l))
        : (i !== 'submit' && i !== 'reset') || t.removeAttribute('value'),
      l != null
        ? bi(t, i, yl(l))
        : e != null
          ? bi(t, i, yl(e))
          : a != null && t.removeAttribute('value'),
      u == null && n != null && (t.defaultChecked = !!n),
      u != null && (t.checked = u && typeof u != 'function' && typeof u != 'symbol'),
      r != null && typeof r != 'function' && typeof r != 'symbol' && typeof r != 'boolean'
        ? (t.name = '' + yl(r))
        : t.removeAttribute('name'));
  }
  function sr(t, l, e, a, u, n, i, r) {
    if (
      (n != null &&
        typeof n != 'function' &&
        typeof n != 'symbol' &&
        typeof n != 'boolean' &&
        (t.type = n),
      l != null || e != null)
    ) {
      if (!((n !== 'submit' && n !== 'reset') || l != null)) {
        Si(t);
        return;
      }
      ((e = e != null ? '' + yl(e) : ''),
        (l = l != null ? '' + yl(l) : e),
        r || l === t.value || (t.value = l),
        (t.defaultValue = l));
    }
    ((a = a ?? u),
      (a = typeof a != 'function' && typeof a != 'symbol' && !!a),
      (t.checked = r ? t.checked : !!a),
      (t.defaultChecked = !!a),
      i != null &&
        typeof i != 'function' &&
        typeof i != 'symbol' &&
        typeof i != 'boolean' &&
        (t.name = i),
      Si(t));
  }
  function bi(t, l, e) {
    (l === 'number' && Zu(t.ownerDocument) === t) ||
      t.defaultValue === '' + e ||
      (t.defaultValue = '' + e);
  }
  function ta(t, l, e, a) {
    if (((t = t.options), l)) {
      l = {};
      for (var u = 0; u < e.length; u++) l['$' + e[u]] = !0;
      for (e = 0; e < t.length; e++)
        ((u = l.hasOwnProperty('$' + t[e].value)),
          t[e].selected !== u && (t[e].selected = u),
          u && a && (t[e].defaultSelected = !0));
    } else {
      for (e = '' + yl(e), l = null, u = 0; u < t.length; u++) {
        if (t[u].value === e) {
          ((t[u].selected = !0), a && (t[u].defaultSelected = !0));
          return;
        }
        l !== null || t[u].disabled || (l = t[u]);
      }
      l !== null && (l.selected = !0);
    }
  }
  function dr(t, l, e) {
    if (l != null && ((l = '' + yl(l)), l !== t.value && (t.value = l), e == null)) {
      t.defaultValue !== l && (t.defaultValue = l);
      return;
    }
    t.defaultValue = e != null ? '' + yl(e) : '';
  }
  function hr(t, l, e, a) {
    if (l == null) {
      if (a != null) {
        if (e != null) throw Error(c(92));
        if (Nt(a)) {
          if (1 < a.length) throw Error(c(93));
          a = a[0];
        }
        e = a;
      }
      (e == null && (e = ''), (l = e));
    }
    ((e = yl(l)),
      (t.defaultValue = e),
      (a = t.textContent),
      a === e && a !== '' && a !== null && (t.value = a),
      Si(t));
  }
  function la(t, l) {
    if (l) {
      var e = t.firstChild;
      if (e && e === t.lastChild && e.nodeType === 3) {
        e.nodeValue = l;
        return;
      }
    }
    t.textContent = l;
  }
  var Fh = new Set(
    'animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp'.split(
      ' '
    )
  );
  function mr(t, l, e) {
    var a = l.indexOf('--') === 0;
    e == null || typeof e == 'boolean' || e === ''
      ? a
        ? t.setProperty(l, '')
        : l === 'float'
          ? (t.cssFloat = '')
          : (t[l] = '')
      : a
        ? t.setProperty(l, e)
        : typeof e != 'number' || e === 0 || Fh.has(l)
          ? l === 'float'
            ? (t.cssFloat = e)
            : (t[l] = ('' + e).trim())
          : (t[l] = e + 'px');
  }
  function yr(t, l, e) {
    if (l != null && typeof l != 'object') throw Error(c(62));
    if (((t = t.style), e != null)) {
      for (var a in e)
        !e.hasOwnProperty(a) ||
          (l != null && l.hasOwnProperty(a)) ||
          (a.indexOf('--') === 0
            ? t.setProperty(a, '')
            : a === 'float'
              ? (t.cssFloat = '')
              : (t[a] = ''));
      for (var u in l) ((a = l[u]), l.hasOwnProperty(u) && e[u] !== a && mr(t, u, a));
    } else for (var n in l) l.hasOwnProperty(n) && mr(t, n, l[n]);
  }
  function Ei(t) {
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
  var Ih = new Map([
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
    Ph =
      /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function Vu(t) {
    return Ph.test('' + t)
      ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')"
      : t;
  }
  function jl() {}
  var Ti = null;
  function zi(t) {
    return (
      (t = t.target || t.srcElement || window),
      t.correspondingUseElement && (t = t.correspondingUseElement),
      t.nodeType === 3 ? t.parentNode : t
    );
  }
  var ea = null,
    aa = null;
  function vr(t) {
    var l = Fe(t);
    if (l && (t = l.stateNode)) {
      var e = t[kt] || null;
      t: switch (((t = l.stateNode), l.type)) {
        case 'input':
          if (
            (pi(
              t,
              e.value,
              e.defaultValue,
              e.defaultValue,
              e.checked,
              e.defaultChecked,
              e.type,
              e.name
            ),
            (l = e.name),
            e.type === 'radio' && l != null)
          ) {
            for (e = t; e.parentNode; ) e = e.parentNode;
            for (
              e = e.querySelectorAll('input[name="' + vl('' + l) + '"][type="radio"]'), l = 0;
              l < e.length;
              l++
            ) {
              var a = e[l];
              if (a !== t && a.form === t.form) {
                var u = a[kt] || null;
                if (!u) throw Error(c(90));
                pi(
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
            for (l = 0; l < e.length; l++) ((a = e[l]), a.form === t.form && or(a));
          }
          break t;
        case 'textarea':
          dr(t, e.value, e.defaultValue);
          break t;
        case 'select':
          ((l = e.value), l != null && ta(t, !!e.multiple, l, !1));
      }
    }
  }
  var Ai = !1;
  function gr(t, l, e) {
    if (Ai) return t(l, e);
    Ai = !0;
    try {
      var a = t(l);
      return a;
    } finally {
      if (
        ((Ai = !1),
        (ea !== null || aa !== null) &&
          (Nn(), ea && ((l = ea), (t = aa), (aa = ea = null), vr(l), t)))
      )
        for (l = 0; l < t.length; l++) vr(t[l]);
    }
  }
  function Xa(t, l) {
    var e = t.stateNode;
    if (e === null) return null;
    var a = e[kt] || null;
    if (a === null) return null;
    e = a[l];
    t: switch (l) {
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
    if (e && typeof e != 'function') throw Error(c(231, l, typeof e));
    return e;
  }
  var Gl = !(
      typeof window > 'u' ||
      typeof window.document > 'u' ||
      typeof window.document.createElement > 'u'
    ),
    Ri = !1;
  if (Gl)
    try {
      var Qa = {};
      (Object.defineProperty(Qa, 'passive', {
        get: function () {
          Ri = !0;
        },
      }),
        window.addEventListener('test', Qa, Qa),
        window.removeEventListener('test', Qa, Qa));
    } catch {
      Ri = !1;
    }
  var fe = null,
    _i = null,
    Ku = null;
  function Sr() {
    if (Ku) return Ku;
    var t,
      l = _i,
      e = l.length,
      a,
      u = 'value' in fe ? fe.value : fe.textContent,
      n = u.length;
    for (t = 0; t < e && l[t] === u[t]; t++);
    var i = e - t;
    for (a = 1; a <= i && l[e - a] === u[n - a]; a++);
    return (Ku = u.slice(t, 1 < a ? 1 - a : void 0));
  }
  function Ju(t) {
    var l = t.keyCode;
    return (
      'charCode' in t ? ((t = t.charCode), t === 0 && l === 13 && (t = 13)) : (t = l),
      t === 10 && (t = 13),
      32 <= t || t === 13 ? t : 0
    );
  }
  function wu() {
    return !0;
  }
  function pr() {
    return !1;
  }
  function Ft(t) {
    function l(e, a, u, n, i) {
      ((this._reactName = e),
        (this._targetInst = u),
        (this.type = a),
        (this.nativeEvent = n),
        (this.target = i),
        (this.currentTarget = null));
      for (var r in t) t.hasOwnProperty(r) && ((e = t[r]), (this[r] = e ? e(n) : n[r]));
      return (
        (this.isDefaultPrevented = (
          n.defaultPrevented != null ? n.defaultPrevented : n.returnValue === !1
        )
          ? wu
          : pr),
        (this.isPropagationStopped = pr),
        this
      );
    }
    return (
      A(l.prototype, {
        preventDefault: function () {
          this.defaultPrevented = !0;
          var e = this.nativeEvent;
          e &&
            (e.preventDefault
              ? e.preventDefault()
              : typeof e.returnValue != 'unknown' && (e.returnValue = !1),
            (this.isDefaultPrevented = wu));
        },
        stopPropagation: function () {
          var e = this.nativeEvent;
          e &&
            (e.stopPropagation
              ? e.stopPropagation()
              : typeof e.cancelBubble != 'unknown' && (e.cancelBubble = !0),
            (this.isPropagationStopped = wu));
        },
        persist: function () {},
        isPersistent: wu,
      }),
      l
    );
  }
  var He = {
      eventPhase: 0,
      bubbles: 0,
      cancelable: 0,
      timeStamp: function (t) {
        return t.timeStamp || Date.now();
      },
      defaultPrevented: 0,
      isTrusted: 0,
    },
    $u = Ft(He),
    Za = A({}, He, { view: 0, detail: 0 }),
    tm = Ft(Za),
    Oi,
    Mi,
    Va,
    Wu = A({}, Za, {
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
      getModifierState: Ui,
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
          : (t !== Va &&
              (Va && t.type === 'mousemove'
                ? ((Oi = t.screenX - Va.screenX), (Mi = t.screenY - Va.screenY))
                : (Mi = Oi = 0),
              (Va = t)),
            Oi);
      },
      movementY: function (t) {
        return 'movementY' in t ? t.movementY : Mi;
      },
    }),
    br = Ft(Wu),
    lm = A({}, Wu, { dataTransfer: 0 }),
    em = Ft(lm),
    am = A({}, Za, { relatedTarget: 0 }),
    Di = Ft(am),
    um = A({}, He, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
    nm = Ft(um),
    im = A({}, He, {
      clipboardData: function (t) {
        return 'clipboardData' in t ? t.clipboardData : window.clipboardData;
      },
    }),
    fm = Ft(im),
    cm = A({}, He, { data: 0 }),
    Er = Ft(cm),
    rm = {
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
    om = {
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
    sm = { Alt: 'altKey', Control: 'ctrlKey', Meta: 'metaKey', Shift: 'shiftKey' };
  function dm(t) {
    var l = this.nativeEvent;
    return l.getModifierState ? l.getModifierState(t) : (t = sm[t]) ? !!l[t] : !1;
  }
  function Ui() {
    return dm;
  }
  var hm = A({}, Za, {
      key: function (t) {
        if (t.key) {
          var l = rm[t.key] || t.key;
          if (l !== 'Unidentified') return l;
        }
        return t.type === 'keypress'
          ? ((t = Ju(t)), t === 13 ? 'Enter' : String.fromCharCode(t))
          : t.type === 'keydown' || t.type === 'keyup'
            ? om[t.keyCode] || 'Unidentified'
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
      getModifierState: Ui,
      charCode: function (t) {
        return t.type === 'keypress' ? Ju(t) : 0;
      },
      keyCode: function (t) {
        return t.type === 'keydown' || t.type === 'keyup' ? t.keyCode : 0;
      },
      which: function (t) {
        return t.type === 'keypress'
          ? Ju(t)
          : t.type === 'keydown' || t.type === 'keyup'
            ? t.keyCode
            : 0;
      },
    }),
    mm = Ft(hm),
    ym = A({}, Wu, {
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
    Tr = Ft(ym),
    vm = A({}, Za, {
      touches: 0,
      targetTouches: 0,
      changedTouches: 0,
      altKey: 0,
      metaKey: 0,
      ctrlKey: 0,
      shiftKey: 0,
      getModifierState: Ui,
    }),
    gm = Ft(vm),
    Sm = A({}, He, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
    pm = Ft(Sm),
    bm = A({}, Wu, {
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
    Em = Ft(bm),
    Tm = A({}, He, { newState: 0, oldState: 0 }),
    zm = Ft(Tm),
    Am = [9, 13, 27, 32],
    Ci = Gl && 'CompositionEvent' in window,
    Ka = null;
  Gl && 'documentMode' in document && (Ka = document.documentMode);
  var Rm = Gl && 'TextEvent' in window && !Ka,
    zr = Gl && (!Ci || (Ka && 8 < Ka && 11 >= Ka)),
    Ar = ' ',
    Rr = !1;
  function _r(t, l) {
    switch (t) {
      case 'keyup':
        return Am.indexOf(l.keyCode) !== -1;
      case 'keydown':
        return l.keyCode !== 229;
      case 'keypress':
      case 'mousedown':
      case 'focusout':
        return !0;
      default:
        return !1;
    }
  }
  function Or(t) {
    return ((t = t.detail), typeof t == 'object' && 'data' in t ? t.data : null);
  }
  var ua = !1;
  function _m(t, l) {
    switch (t) {
      case 'compositionend':
        return Or(l);
      case 'keypress':
        return l.which !== 32 ? null : ((Rr = !0), Ar);
      case 'textInput':
        return ((t = l.data), t === Ar && Rr ? null : t);
      default:
        return null;
    }
  }
  function Om(t, l) {
    if (ua)
      return t === 'compositionend' || (!Ci && _r(t, l))
        ? ((t = Sr()), (Ku = _i = fe = null), (ua = !1), t)
        : null;
    switch (t) {
      case 'paste':
        return null;
      case 'keypress':
        if (!(l.ctrlKey || l.altKey || l.metaKey) || (l.ctrlKey && l.altKey)) {
          if (l.char && 1 < l.char.length) return l.char;
          if (l.which) return String.fromCharCode(l.which);
        }
        return null;
      case 'compositionend':
        return zr && l.locale !== 'ko' ? null : l.data;
      default:
        return null;
    }
  }
  var Mm = {
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
  function Mr(t) {
    var l = t && t.nodeName && t.nodeName.toLowerCase();
    return l === 'input' ? !!Mm[t.type] : l === 'textarea';
  }
  function Dr(t, l, e, a) {
    (ea ? (aa ? aa.push(a) : (aa = [a])) : (ea = a),
      (l = jn(l, 'onChange')),
      0 < l.length &&
        ((e = new $u('onChange', 'change', null, e, a)), t.push({ event: e, listeners: l })));
  }
  var Ja = null,
    wa = null;
  function Dm(t) {
    dd(t, 0);
  }
  function ku(t) {
    var l = Ga(t);
    if (or(l)) return t;
  }
  function Ur(t, l) {
    if (t === 'change') return l;
  }
  var Cr = !1;
  if (Gl) {
    var Ni;
    if (Gl) {
      var Hi = 'oninput' in document;
      if (!Hi) {
        var Nr = document.createElement('div');
        (Nr.setAttribute('oninput', 'return;'), (Hi = typeof Nr.oninput == 'function'));
      }
      Ni = Hi;
    } else Ni = !1;
    Cr = Ni && (!document.documentMode || 9 < document.documentMode);
  }
  function Hr() {
    Ja && (Ja.detachEvent('onpropertychange', xr), (wa = Ja = null));
  }
  function xr(t) {
    if (t.propertyName === 'value' && ku(wa)) {
      var l = [];
      (Dr(l, wa, t, zi(t)), gr(Dm, l));
    }
  }
  function Um(t, l, e) {
    t === 'focusin'
      ? (Hr(), (Ja = l), (wa = e), Ja.attachEvent('onpropertychange', xr))
      : t === 'focusout' && Hr();
  }
  function Cm(t) {
    if (t === 'selectionchange' || t === 'keyup' || t === 'keydown') return ku(wa);
  }
  function Nm(t, l) {
    if (t === 'click') return ku(l);
  }
  function Hm(t, l) {
    if (t === 'input' || t === 'change') return ku(l);
  }
  function xm(t, l) {
    return (t === l && (t !== 0 || 1 / t === 1 / l)) || (t !== t && l !== l);
  }
  var il = typeof Object.is == 'function' ? Object.is : xm;
  function $a(t, l) {
    if (il(t, l)) return !0;
    if (typeof t != 'object' || t === null || typeof l != 'object' || l === null) return !1;
    var e = Object.keys(t),
      a = Object.keys(l);
    if (e.length !== a.length) return !1;
    for (a = 0; a < e.length; a++) {
      var u = e[a];
      if (!oi.call(l, u) || !il(t[u], l[u])) return !1;
    }
    return !0;
  }
  function Br(t) {
    for (; t && t.firstChild; ) t = t.firstChild;
    return t;
  }
  function qr(t, l) {
    var e = Br(t);
    t = 0;
    for (var a; e; ) {
      if (e.nodeType === 3) {
        if (((a = t + e.textContent.length), t <= l && a >= l)) return { node: e, offset: l - t };
        t = a;
      }
      t: {
        for (; e; ) {
          if (e.nextSibling) {
            e = e.nextSibling;
            break t;
          }
          e = e.parentNode;
        }
        e = void 0;
      }
      e = Br(e);
    }
  }
  function Yr(t, l) {
    return t && l
      ? t === l
        ? !0
        : t && t.nodeType === 3
          ? !1
          : l && l.nodeType === 3
            ? Yr(t, l.parentNode)
            : 'contains' in t
              ? t.contains(l)
              : t.compareDocumentPosition
                ? !!(t.compareDocumentPosition(l) & 16)
                : !1
      : !1;
  }
  function Lr(t) {
    t =
      t != null && t.ownerDocument != null && t.ownerDocument.defaultView != null
        ? t.ownerDocument.defaultView
        : window;
    for (var l = Zu(t.document); l instanceof t.HTMLIFrameElement; ) {
      try {
        var e = typeof l.contentWindow.location.href == 'string';
      } catch {
        e = !1;
      }
      if (e) t = l.contentWindow;
      else break;
      l = Zu(t.document);
    }
    return l;
  }
  function xi(t) {
    var l = t && t.nodeName && t.nodeName.toLowerCase();
    return (
      l &&
      ((l === 'input' &&
        (t.type === 'text' ||
          t.type === 'search' ||
          t.type === 'tel' ||
          t.type === 'url' ||
          t.type === 'password')) ||
        l === 'textarea' ||
        t.contentEditable === 'true')
    );
  }
  var Bm = Gl && 'documentMode' in document && 11 >= document.documentMode,
    na = null,
    Bi = null,
    Wa = null,
    qi = !1;
  function jr(t, l, e) {
    var a = e.window === e ? e.document : e.nodeType === 9 ? e : e.ownerDocument;
    qi ||
      na == null ||
      na !== Zu(a) ||
      ((a = na),
      'selectionStart' in a && xi(a)
        ? (a = { start: a.selectionStart, end: a.selectionEnd })
        : ((a = ((a.ownerDocument && a.ownerDocument.defaultView) || window).getSelection()),
          (a = {
            anchorNode: a.anchorNode,
            anchorOffset: a.anchorOffset,
            focusNode: a.focusNode,
            focusOffset: a.focusOffset,
          })),
      (Wa && $a(Wa, a)) ||
        ((Wa = a),
        (a = jn(Bi, 'onSelect')),
        0 < a.length &&
          ((l = new $u('onSelect', 'select', null, l, e)),
          t.push({ event: l, listeners: a }),
          (l.target = na))));
  }
  function xe(t, l) {
    var e = {};
    return (
      (e[t.toLowerCase()] = l.toLowerCase()),
      (e['Webkit' + t] = 'webkit' + l),
      (e['Moz' + t] = 'moz' + l),
      e
    );
  }
  var ia = {
      animationend: xe('Animation', 'AnimationEnd'),
      animationiteration: xe('Animation', 'AnimationIteration'),
      animationstart: xe('Animation', 'AnimationStart'),
      transitionrun: xe('Transition', 'TransitionRun'),
      transitionstart: xe('Transition', 'TransitionStart'),
      transitioncancel: xe('Transition', 'TransitionCancel'),
      transitionend: xe('Transition', 'TransitionEnd'),
    },
    Yi = {},
    Gr = {};
  Gl &&
    ((Gr = document.createElement('div').style),
    'AnimationEvent' in window ||
      (delete ia.animationend.animation,
      delete ia.animationiteration.animation,
      delete ia.animationstart.animation),
    'TransitionEvent' in window || delete ia.transitionend.transition);
  function Be(t) {
    if (Yi[t]) return Yi[t];
    if (!ia[t]) return t;
    var l = ia[t],
      e;
    for (e in l) if (l.hasOwnProperty(e) && e in Gr) return (Yi[t] = l[e]);
    return t;
  }
  var Xr = Be('animationend'),
    Qr = Be('animationiteration'),
    Zr = Be('animationstart'),
    qm = Be('transitionrun'),
    Ym = Be('transitionstart'),
    Lm = Be('transitioncancel'),
    Vr = Be('transitionend'),
    Kr = new Map(),
    Li =
      'abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel'.split(
        ' '
      );
  Li.push('scrollEnd');
  function _l(t, l) {
    (Kr.set(t, l), Ne(l, [t]));
  }
  var Fu =
      typeof reportError == 'function'
        ? reportError
        : function (t) {
            if (typeof window == 'object' && typeof window.ErrorEvent == 'function') {
              var l = new window.ErrorEvent('error', {
                bubbles: !0,
                cancelable: !0,
                message:
                  typeof t == 'object' && t !== null && typeof t.message == 'string'
                    ? String(t.message)
                    : String(t),
                error: t,
              });
              if (!window.dispatchEvent(l)) return;
            } else if (typeof process == 'object' && typeof process.emit == 'function') {
              process.emit('uncaughtException', t);
              return;
            }
            console.error(t);
          },
    gl = [],
    fa = 0,
    ji = 0;
  function Iu() {
    for (var t = fa, l = (ji = fa = 0); l < t; ) {
      var e = gl[l];
      gl[l++] = null;
      var a = gl[l];
      gl[l++] = null;
      var u = gl[l];
      gl[l++] = null;
      var n = gl[l];
      if (((gl[l++] = null), a !== null && u !== null)) {
        var i = a.pending;
        (i === null ? (u.next = u) : ((u.next = i.next), (i.next = u)), (a.pending = u));
      }
      n !== 0 && Jr(e, u, n);
    }
  }
  function Pu(t, l, e, a) {
    ((gl[fa++] = t),
      (gl[fa++] = l),
      (gl[fa++] = e),
      (gl[fa++] = a),
      (ji |= a),
      (t.lanes |= a),
      (t = t.alternate),
      t !== null && (t.lanes |= a));
  }
  function Gi(t, l, e, a) {
    return (Pu(t, l, e, a), tn(t));
  }
  function qe(t, l) {
    return (Pu(t, null, null, l), tn(t));
  }
  function Jr(t, l, e) {
    t.lanes |= e;
    var a = t.alternate;
    a !== null && (a.lanes |= e);
    for (var u = !1, n = t.return; n !== null; )
      ((n.childLanes |= e),
        (a = n.alternate),
        a !== null && (a.childLanes |= e),
        n.tag === 22 && ((t = n.stateNode), t === null || t._visibility & 1 || (u = !0)),
        (t = n),
        (n = n.return));
    return t.tag === 3
      ? ((n = t.stateNode),
        u &&
          l !== null &&
          ((u = 31 - nl(e)),
          (t = n.hiddenUpdates),
          (a = t[u]),
          a === null ? (t[u] = [l]) : a.push(l),
          (l.lane = e | 536870912)),
        n)
      : null;
  }
  function tn(t) {
    if (50 < gu) throw ((gu = 0), (kf = null), Error(c(185)));
    for (var l = t.return; l !== null; ) ((t = l), (l = t.return));
    return t.tag === 3 ? t.stateNode : null;
  }
  var ca = {};
  function jm(t, l, e, a) {
    ((this.tag = t),
      (this.key = e),
      (this.sibling =
        this.child =
        this.return =
        this.stateNode =
        this.type =
        this.elementType =
          null),
      (this.index = 0),
      (this.refCleanup = this.ref = null),
      (this.pendingProps = l),
      (this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null),
      (this.mode = a),
      (this.subtreeFlags = this.flags = 0),
      (this.deletions = null),
      (this.childLanes = this.lanes = 0),
      (this.alternate = null));
  }
  function fl(t, l, e, a) {
    return new jm(t, l, e, a);
  }
  function Xi(t) {
    return ((t = t.prototype), !(!t || !t.isReactComponent));
  }
  function Xl(t, l) {
    var e = t.alternate;
    return (
      e === null
        ? ((e = fl(t.tag, l, t.key, t.mode)),
          (e.elementType = t.elementType),
          (e.type = t.type),
          (e.stateNode = t.stateNode),
          (e.alternate = t),
          (t.alternate = e))
        : ((e.pendingProps = l),
          (e.type = t.type),
          (e.flags = 0),
          (e.subtreeFlags = 0),
          (e.deletions = null)),
      (e.flags = t.flags & 65011712),
      (e.childLanes = t.childLanes),
      (e.lanes = t.lanes),
      (e.child = t.child),
      (e.memoizedProps = t.memoizedProps),
      (e.memoizedState = t.memoizedState),
      (e.updateQueue = t.updateQueue),
      (l = t.dependencies),
      (e.dependencies = l === null ? null : { lanes: l.lanes, firstContext: l.firstContext }),
      (e.sibling = t.sibling),
      (e.index = t.index),
      (e.ref = t.ref),
      (e.refCleanup = t.refCleanup),
      e
    );
  }
  function wr(t, l) {
    t.flags &= 65011714;
    var e = t.alternate;
    return (
      e === null
        ? ((t.childLanes = 0),
          (t.lanes = l),
          (t.child = null),
          (t.subtreeFlags = 0),
          (t.memoizedProps = null),
          (t.memoizedState = null),
          (t.updateQueue = null),
          (t.dependencies = null),
          (t.stateNode = null))
        : ((t.childLanes = e.childLanes),
          (t.lanes = e.lanes),
          (t.child = e.child),
          (t.subtreeFlags = 0),
          (t.deletions = null),
          (t.memoizedProps = e.memoizedProps),
          (t.memoizedState = e.memoizedState),
          (t.updateQueue = e.updateQueue),
          (t.type = e.type),
          (l = e.dependencies),
          (t.dependencies = l === null ? null : { lanes: l.lanes, firstContext: l.firstContext })),
      t
    );
  }
  function ln(t, l, e, a, u, n) {
    var i = 0;
    if (((a = t), typeof t == 'function')) Xi(t) && (i = 1);
    else if (typeof t == 'string')
      i = Vy(t, e, X.current) ? 26 : t === 'html' || t === 'head' || t === 'body' ? 27 : 5;
    else
      t: switch (t) {
        case Kt:
          return ((t = fl(31, e, l, u)), (t.elementType = Kt), (t.lanes = n), t);
        case j:
          return Ye(e.children, u, n, l);
        case G:
          ((i = 8), (u |= 24));
          break;
        case Y:
          return ((t = fl(12, e, l, u | 2)), (t.elementType = Y), (t.lanes = n), t);
        case st:
          return ((t = fl(13, e, l, u)), (t.elementType = st), (t.lanes = n), t);
        case Et:
          return ((t = fl(19, e, l, u)), (t.elementType = Et), (t.lanes = n), t);
        default:
          if (typeof t == 'object' && t !== null)
            switch (t.$$typeof) {
              case w:
                i = 10;
                break t;
              case F:
                i = 9;
                break t;
              case mt:
                i = 11;
                break t;
              case W:
                i = 14;
                break t;
              case Mt:
                ((i = 16), (a = null));
                break t;
            }
          ((i = 29), (e = Error(c(130, t === null ? 'null' : typeof t, ''))), (a = null));
      }
    return ((l = fl(i, e, l, u)), (l.elementType = t), (l.type = a), (l.lanes = n), l);
  }
  function Ye(t, l, e, a) {
    return ((t = fl(7, t, a, l)), (t.lanes = e), t);
  }
  function Qi(t, l, e) {
    return ((t = fl(6, t, null, l)), (t.lanes = e), t);
  }
  function $r(t) {
    var l = fl(18, null, null, 0);
    return ((l.stateNode = t), l);
  }
  function Zi(t, l, e) {
    return (
      (l = fl(4, t.children !== null ? t.children : [], t.key, l)),
      (l.lanes = e),
      (l.stateNode = {
        containerInfo: t.containerInfo,
        pendingChildren: null,
        implementation: t.implementation,
      }),
      l
    );
  }
  var Wr = new WeakMap();
  function Sl(t, l) {
    if (typeof t == 'object' && t !== null) {
      var e = Wr.get(t);
      return e !== void 0 ? e : ((l = { value: t, source: l, stack: $c(l) }), Wr.set(t, l), l);
    }
    return { value: t, source: l, stack: $c(l) };
  }
  var ra = [],
    oa = 0,
    en = null,
    ka = 0,
    pl = [],
    bl = 0,
    ce = null,
    Hl = 1,
    xl = '';
  function Ql(t, l) {
    ((ra[oa++] = ka), (ra[oa++] = en), (en = t), (ka = l));
  }
  function kr(t, l, e) {
    ((pl[bl++] = Hl), (pl[bl++] = xl), (pl[bl++] = ce), (ce = t));
    var a = Hl;
    t = xl;
    var u = 32 - nl(a) - 1;
    ((a &= ~(1 << u)), (e += 1));
    var n = 32 - nl(l) + u;
    if (30 < n) {
      var i = u - (u % 5);
      ((n = (a & ((1 << i) - 1)).toString(32)),
        (a >>= i),
        (u -= i),
        (Hl = (1 << (32 - nl(l) + u)) | (e << u) | a),
        (xl = n + t));
    } else ((Hl = (1 << n) | (e << u) | a), (xl = t));
  }
  function Vi(t) {
    t.return !== null && (Ql(t, 1), kr(t, 1, 0));
  }
  function Ki(t) {
    for (; t === en; ) ((en = ra[--oa]), (ra[oa] = null), (ka = ra[--oa]), (ra[oa] = null));
    for (; t === ce; )
      ((ce = pl[--bl]),
        (pl[bl] = null),
        (xl = pl[--bl]),
        (pl[bl] = null),
        (Hl = pl[--bl]),
        (pl[bl] = null));
  }
  function Fr(t, l) {
    ((pl[bl++] = Hl), (pl[bl++] = xl), (pl[bl++] = ce), (Hl = l.id), (xl = l.overflow), (ce = t));
  }
  var Xt = null,
    Tt = null,
    it = !1,
    re = null,
    El = !1,
    Ji = Error(c(519));
  function oe(t) {
    var l = Error(
      c(418, 1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? 'text' : 'HTML', '')
    );
    throw (Fa(Sl(l, t)), Ji);
  }
  function Ir(t) {
    var l = t.stateNode,
      e = t.type,
      a = t.memoizedProps;
    switch (((l[Gt] = t), (l[kt] = a), e)) {
      case 'dialog':
        (at('cancel', l), at('close', l));
        break;
      case 'iframe':
      case 'object':
      case 'embed':
        at('load', l);
        break;
      case 'video':
      case 'audio':
        for (e = 0; e < pu.length; e++) at(pu[e], l);
        break;
      case 'source':
        at('error', l);
        break;
      case 'img':
      case 'image':
      case 'link':
        (at('error', l), at('load', l));
        break;
      case 'details':
        at('toggle', l);
        break;
      case 'input':
        (at('invalid', l),
          sr(l, a.value, a.defaultValue, a.checked, a.defaultChecked, a.type, a.name, !0));
        break;
      case 'select':
        at('invalid', l);
        break;
      case 'textarea':
        (at('invalid', l), hr(l, a.value, a.defaultValue, a.children));
    }
    ((e = a.children),
      (typeof e != 'string' && typeof e != 'number' && typeof e != 'bigint') ||
      l.textContent === '' + e ||
      a.suppressHydrationWarning === !0 ||
      vd(l.textContent, e)
        ? (a.popover != null && (at('beforetoggle', l), at('toggle', l)),
          a.onScroll != null && at('scroll', l),
          a.onScrollEnd != null && at('scrollend', l),
          a.onClick != null && (l.onclick = jl),
          (l = !0))
        : (l = !1),
      l || oe(t, !0));
  }
  function Pr(t) {
    for (Xt = t.return; Xt; )
      switch (Xt.tag) {
        case 5:
        case 31:
        case 13:
          El = !1;
          return;
        case 27:
        case 3:
          El = !0;
          return;
        default:
          Xt = Xt.return;
      }
  }
  function sa(t) {
    if (t !== Xt) return !1;
    if (!it) return (Pr(t), (it = !0), !1);
    var l = t.tag,
      e;
    if (
      ((e = l !== 3 && l !== 27) &&
        ((e = l === 5) &&
          ((e = t.type), (e = !(e !== 'form' && e !== 'button') || sc(t.type, t.memoizedProps))),
        (e = !e)),
      e && Tt && oe(t),
      Pr(t),
      l === 13)
    ) {
      if (((t = t.memoizedState), (t = t !== null ? t.dehydrated : null), !t)) throw Error(c(317));
      Tt = Rd(t);
    } else if (l === 31) {
      if (((t = t.memoizedState), (t = t !== null ? t.dehydrated : null), !t)) throw Error(c(317));
      Tt = Rd(t);
    } else
      l === 27
        ? ((l = Tt), Ae(t.type) ? ((t = vc), (vc = null), (Tt = t)) : (Tt = l))
        : (Tt = Xt ? zl(t.stateNode.nextSibling) : null);
    return !0;
  }
  function Le() {
    ((Tt = Xt = null), (it = !1));
  }
  function wi() {
    var t = re;
    return (t !== null && (ll === null ? (ll = t) : ll.push.apply(ll, t), (re = null)), t);
  }
  function Fa(t) {
    re === null ? (re = [t]) : re.push(t);
  }
  var $i = g(null),
    je = null,
    Zl = null;
  function se(t, l, e) {
    (q($i, l._currentValue), (l._currentValue = e));
  }
  function Vl(t) {
    ((t._currentValue = $i.current), H($i));
  }
  function Wi(t, l, e) {
    for (; t !== null; ) {
      var a = t.alternate;
      if (
        ((t.childLanes & l) !== l
          ? ((t.childLanes |= l), a !== null && (a.childLanes |= l))
          : a !== null && (a.childLanes & l) !== l && (a.childLanes |= l),
        t === e)
      )
        break;
      t = t.return;
    }
  }
  function ki(t, l, e, a) {
    var u = t.child;
    for (u !== null && (u.return = t); u !== null; ) {
      var n = u.dependencies;
      if (n !== null) {
        var i = u.child;
        n = n.firstContext;
        t: for (; n !== null; ) {
          var r = n;
          n = u;
          for (var h = 0; h < l.length; h++)
            if (r.context === l[h]) {
              ((n.lanes |= e),
                (r = n.alternate),
                r !== null && (r.lanes |= e),
                Wi(n.return, e, t),
                a || (i = null));
              break t;
            }
          n = r.next;
        }
      } else if (u.tag === 18) {
        if (((i = u.return), i === null)) throw Error(c(341));
        ((i.lanes |= e), (n = i.alternate), n !== null && (n.lanes |= e), Wi(i, e, t), (i = null));
      } else i = u.child;
      if (i !== null) i.return = u;
      else
        for (i = u; i !== null; ) {
          if (i === t) {
            i = null;
            break;
          }
          if (((u = i.sibling), u !== null)) {
            ((u.return = i.return), (i = u));
            break;
          }
          i = i.return;
        }
      u = i;
    }
  }
  function da(t, l, e, a) {
    t = null;
    for (var u = l, n = !1; u !== null; ) {
      if (!n) {
        if ((u.flags & 524288) !== 0) n = !0;
        else if ((u.flags & 262144) !== 0) break;
      }
      if (u.tag === 10) {
        var i = u.alternate;
        if (i === null) throw Error(c(387));
        if (((i = i.memoizedProps), i !== null)) {
          var r = u.type;
          il(u.pendingProps.value, i.value) || (t !== null ? t.push(r) : (t = [r]));
        }
      } else if (u === ot.current) {
        if (((i = u.alternate), i === null)) throw Error(c(387));
        i.memoizedState.memoizedState !== u.memoizedState.memoizedState &&
          (t !== null ? t.push(Au) : (t = [Au]));
      }
      u = u.return;
    }
    (t !== null && ki(l, t, e, a), (l.flags |= 262144));
  }
  function an(t) {
    for (t = t.firstContext; t !== null; ) {
      if (!il(t.context._currentValue, t.memoizedValue)) return !0;
      t = t.next;
    }
    return !1;
  }
  function Ge(t) {
    ((je = t), (Zl = null), (t = t.dependencies), t !== null && (t.firstContext = null));
  }
  function Qt(t) {
    return to(je, t);
  }
  function un(t, l) {
    return (je === null && Ge(t), to(t, l));
  }
  function to(t, l) {
    var e = l._currentValue;
    if (((l = { context: l, memoizedValue: e, next: null }), Zl === null)) {
      if (t === null) throw Error(c(308));
      ((Zl = l), (t.dependencies = { lanes: 0, firstContext: l }), (t.flags |= 524288));
    } else Zl = Zl.next = l;
    return e;
  }
  var Gm =
      typeof AbortController < 'u'
        ? AbortController
        : function () {
            var t = [],
              l = (this.signal = {
                aborted: !1,
                addEventListener: function (e, a) {
                  t.push(a);
                },
              });
            this.abort = function () {
              ((l.aborted = !0),
                t.forEach(function (e) {
                  return e();
                }));
            };
          },
    Xm = f.unstable_scheduleCallback,
    Qm = f.unstable_NormalPriority,
    Ht = {
      $$typeof: w,
      Consumer: null,
      Provider: null,
      _currentValue: null,
      _currentValue2: null,
      _threadCount: 0,
    };
  function Fi() {
    return { controller: new Gm(), data: new Map(), refCount: 0 };
  }
  function Ia(t) {
    (t.refCount--,
      t.refCount === 0 &&
        Xm(Qm, function () {
          t.controller.abort();
        }));
  }
  var Pa = null,
    Ii = 0,
    ha = 0,
    ma = null;
  function Zm(t, l) {
    if (Pa === null) {
      var e = (Pa = []);
      ((Ii = 0),
        (ha = ec()),
        (ma = {
          status: 'pending',
          value: void 0,
          then: function (a) {
            e.push(a);
          },
        }));
    }
    return (Ii++, l.then(lo, lo), l);
  }
  function lo() {
    if (--Ii === 0 && Pa !== null) {
      ma !== null && (ma.status = 'fulfilled');
      var t = Pa;
      ((Pa = null), (ha = 0), (ma = null));
      for (var l = 0; l < t.length; l++) (0, t[l])();
    }
  }
  function Vm(t, l) {
    var e = [],
      a = {
        status: 'pending',
        value: null,
        reason: null,
        then: function (u) {
          e.push(u);
        },
      };
    return (
      t.then(
        function () {
          ((a.status = 'fulfilled'), (a.value = l));
          for (var u = 0; u < e.length; u++) (0, e[u])(l);
        },
        function (u) {
          for (a.status = 'rejected', a.reason = u, u = 0; u < e.length; u++) (0, e[u])(void 0);
        }
      ),
      a
    );
  }
  var eo = M.S;
  M.S = function (t, l) {
    ((Gs = al()),
      typeof l == 'object' && l !== null && typeof l.then == 'function' && Zm(t, l),
      eo !== null && eo(t, l));
  };
  var Xe = g(null);
  function Pi() {
    var t = Xe.current;
    return t !== null ? t : bt.pooledCache;
  }
  function nn(t, l) {
    l === null ? q(Xe, Xe.current) : q(Xe, l.pool);
  }
  function ao() {
    var t = Pi();
    return t === null ? null : { parent: Ht._currentValue, pool: t };
  }
  var ya = Error(c(460)),
    tf = Error(c(474)),
    fn = Error(c(542)),
    cn = { then: function () {} };
  function uo(t) {
    return ((t = t.status), t === 'fulfilled' || t === 'rejected');
  }
  function no(t, l, e) {
    switch (
      ((e = t[e]), e === void 0 ? t.push(l) : e !== l && (l.then(jl, jl), (l = e)), l.status)
    ) {
      case 'fulfilled':
        return l.value;
      case 'rejected':
        throw ((t = l.reason), fo(t), t);
      default:
        if (typeof l.status == 'string') l.then(jl, jl);
        else {
          if (((t = bt), t !== null && 100 < t.shellSuspendCounter)) throw Error(c(482));
          ((t = l),
            (t.status = 'pending'),
            t.then(
              function (a) {
                if (l.status === 'pending') {
                  var u = l;
                  ((u.status = 'fulfilled'), (u.value = a));
                }
              },
              function (a) {
                if (l.status === 'pending') {
                  var u = l;
                  ((u.status = 'rejected'), (u.reason = a));
                }
              }
            ));
        }
        switch (l.status) {
          case 'fulfilled':
            return l.value;
          case 'rejected':
            throw ((t = l.reason), fo(t), t);
        }
        throw ((Ze = l), ya);
    }
  }
  function Qe(t) {
    try {
      var l = t._init;
      return l(t._payload);
    } catch (e) {
      throw e !== null && typeof e == 'object' && typeof e.then == 'function' ? ((Ze = e), ya) : e;
    }
  }
  var Ze = null;
  function io() {
    if (Ze === null) throw Error(c(459));
    var t = Ze;
    return ((Ze = null), t);
  }
  function fo(t) {
    if (t === ya || t === fn) throw Error(c(483));
  }
  var va = null,
    tu = 0;
  function rn(t) {
    var l = tu;
    return ((tu += 1), va === null && (va = []), no(va, t, l));
  }
  function lu(t, l) {
    ((l = l.props.ref), (t.ref = l !== void 0 ? l : null));
  }
  function on(t, l) {
    throw l.$$typeof === x
      ? Error(c(525))
      : ((t = Object.prototype.toString.call(l)),
        Error(
          c(
            31,
            t === '[object Object]' ? 'object with keys {' + Object.keys(l).join(', ') + '}' : t
          )
        ));
  }
  function co(t) {
    function l(S, m) {
      if (t) {
        var E = S.deletions;
        E === null ? ((S.deletions = [m]), (S.flags |= 16)) : E.push(m);
      }
    }
    function e(S, m) {
      if (!t) return null;
      for (; m !== null; ) (l(S, m), (m = m.sibling));
      return null;
    }
    function a(S) {
      for (var m = new Map(); S !== null; )
        (S.key !== null ? m.set(S.key, S) : m.set(S.index, S), (S = S.sibling));
      return m;
    }
    function u(S, m) {
      return ((S = Xl(S, m)), (S.index = 0), (S.sibling = null), S);
    }
    function n(S, m, E) {
      return (
        (S.index = E),
        t
          ? ((E = S.alternate),
            E !== null
              ? ((E = E.index), E < m ? ((S.flags |= 67108866), m) : E)
              : ((S.flags |= 67108866), m))
          : ((S.flags |= 1048576), m)
      );
    }
    function i(S) {
      return (t && S.alternate === null && (S.flags |= 67108866), S);
    }
    function r(S, m, E, U) {
      return m === null || m.tag !== 6
        ? ((m = Qi(E, S.mode, U)), (m.return = S), m)
        : ((m = u(m, E)), (m.return = S), m);
    }
    function h(S, m, E, U) {
      var Z = E.type;
      return Z === j
        ? _(S, m, E.props.children, U, E.key)
        : m !== null &&
            (m.elementType === Z ||
              (typeof Z == 'object' && Z !== null && Z.$$typeof === Mt && Qe(Z) === m.type))
          ? ((m = u(m, E.props)), lu(m, E), (m.return = S), m)
          : ((m = ln(E.type, E.key, E.props, null, S.mode, U)), lu(m, E), (m.return = S), m);
    }
    function T(S, m, E, U) {
      return m === null ||
        m.tag !== 4 ||
        m.stateNode.containerInfo !== E.containerInfo ||
        m.stateNode.implementation !== E.implementation
        ? ((m = Zi(E, S.mode, U)), (m.return = S), m)
        : ((m = u(m, E.children || [])), (m.return = S), m);
    }
    function _(S, m, E, U, Z) {
      return m === null || m.tag !== 7
        ? ((m = Ye(E, S.mode, U, Z)), (m.return = S), m)
        : ((m = u(m, E)), (m.return = S), m);
    }
    function N(S, m, E) {
      if ((typeof m == 'string' && m !== '') || typeof m == 'number' || typeof m == 'bigint')
        return ((m = Qi('' + m, S.mode, E)), (m.return = S), m);
      if (typeof m == 'object' && m !== null) {
        switch (m.$$typeof) {
          case K:
            return ((E = ln(m.type, m.key, m.props, null, S.mode, E)), lu(E, m), (E.return = S), E);
          case V:
            return ((m = Zi(m, S.mode, E)), (m.return = S), m);
          case Mt:
            return ((m = Qe(m)), N(S, m, E));
        }
        if (Nt(m) || Jt(m)) return ((m = Ye(m, S.mode, E, null)), (m.return = S), m);
        if (typeof m.then == 'function') return N(S, rn(m), E);
        if (m.$$typeof === w) return N(S, un(S, m), E);
        on(S, m);
      }
      return null;
    }
    function z(S, m, E, U) {
      var Z = m !== null ? m.key : null;
      if ((typeof E == 'string' && E !== '') || typeof E == 'number' || typeof E == 'bigint')
        return Z !== null ? null : r(S, m, '' + E, U);
      if (typeof E == 'object' && E !== null) {
        switch (E.$$typeof) {
          case K:
            return E.key === Z ? h(S, m, E, U) : null;
          case V:
            return E.key === Z ? T(S, m, E, U) : null;
          case Mt:
            return ((E = Qe(E)), z(S, m, E, U));
        }
        if (Nt(E) || Jt(E)) return Z !== null ? null : _(S, m, E, U, null);
        if (typeof E.then == 'function') return z(S, m, rn(E), U);
        if (E.$$typeof === w) return z(S, m, un(S, E), U);
        on(S, E);
      }
      return null;
    }
    function R(S, m, E, U, Z) {
      if ((typeof U == 'string' && U !== '') || typeof U == 'number' || typeof U == 'bigint')
        return ((S = S.get(E) || null), r(m, S, '' + U, Z));
      if (typeof U == 'object' && U !== null) {
        switch (U.$$typeof) {
          case K:
            return ((S = S.get(U.key === null ? E : U.key) || null), h(m, S, U, Z));
          case V:
            return ((S = S.get(U.key === null ? E : U.key) || null), T(m, S, U, Z));
          case Mt:
            return ((U = Qe(U)), R(S, m, E, U, Z));
        }
        if (Nt(U) || Jt(U)) return ((S = S.get(E) || null), _(m, S, U, Z, null));
        if (typeof U.then == 'function') return R(S, m, E, rn(U), Z);
        if (U.$$typeof === w) return R(S, m, E, un(m, U), Z);
        on(m, U);
      }
      return null;
    }
    function L(S, m, E, U) {
      for (
        var Z = null, ft = null, Q = m, tt = (m = 0), nt = null;
        Q !== null && tt < E.length;
        tt++
      ) {
        Q.index > tt ? ((nt = Q), (Q = null)) : (nt = Q.sibling);
        var ct = z(S, Q, E[tt], U);
        if (ct === null) {
          Q === null && (Q = nt);
          break;
        }
        (t && Q && ct.alternate === null && l(S, Q),
          (m = n(ct, m, tt)),
          ft === null ? (Z = ct) : (ft.sibling = ct),
          (ft = ct),
          (Q = nt));
      }
      if (tt === E.length) return (e(S, Q), it && Ql(S, tt), Z);
      if (Q === null) {
        for (; tt < E.length; tt++)
          ((Q = N(S, E[tt], U)),
            Q !== null && ((m = n(Q, m, tt)), ft === null ? (Z = Q) : (ft.sibling = Q), (ft = Q)));
        return (it && Ql(S, tt), Z);
      }
      for (Q = a(Q); tt < E.length; tt++)
        ((nt = R(Q, S, tt, E[tt], U)),
          nt !== null &&
            (t && nt.alternate !== null && Q.delete(nt.key === null ? tt : nt.key),
            (m = n(nt, m, tt)),
            ft === null ? (Z = nt) : (ft.sibling = nt),
            (ft = nt)));
      return (
        t &&
          Q.forEach(function (De) {
            return l(S, De);
          }),
        it && Ql(S, tt),
        Z
      );
    }
    function J(S, m, E, U) {
      if (E == null) throw Error(c(151));
      for (
        var Z = null, ft = null, Q = m, tt = (m = 0), nt = null, ct = E.next();
        Q !== null && !ct.done;
        tt++, ct = E.next()
      ) {
        Q.index > tt ? ((nt = Q), (Q = null)) : (nt = Q.sibling);
        var De = z(S, Q, ct.value, U);
        if (De === null) {
          Q === null && (Q = nt);
          break;
        }
        (t && Q && De.alternate === null && l(S, Q),
          (m = n(De, m, tt)),
          ft === null ? (Z = De) : (ft.sibling = De),
          (ft = De),
          (Q = nt));
      }
      if (ct.done) return (e(S, Q), it && Ql(S, tt), Z);
      if (Q === null) {
        for (; !ct.done; tt++, ct = E.next())
          ((ct = N(S, ct.value, U)),
            ct !== null &&
              ((m = n(ct, m, tt)), ft === null ? (Z = ct) : (ft.sibling = ct), (ft = ct)));
        return (it && Ql(S, tt), Z);
      }
      for (Q = a(Q); !ct.done; tt++, ct = E.next())
        ((ct = R(Q, S, tt, ct.value, U)),
          ct !== null &&
            (t && ct.alternate !== null && Q.delete(ct.key === null ? tt : ct.key),
            (m = n(ct, m, tt)),
            ft === null ? (Z = ct) : (ft.sibling = ct),
            (ft = ct)));
      return (
        t &&
          Q.forEach(function (lv) {
            return l(S, lv);
          }),
        it && Ql(S, tt),
        Z
      );
    }
    function St(S, m, E, U) {
      if (
        (typeof E == 'object' &&
          E !== null &&
          E.type === j &&
          E.key === null &&
          (E = E.props.children),
        typeof E == 'object' && E !== null)
      ) {
        switch (E.$$typeof) {
          case K:
            t: {
              for (var Z = E.key; m !== null; ) {
                if (m.key === Z) {
                  if (((Z = E.type), Z === j)) {
                    if (m.tag === 7) {
                      (e(S, m.sibling), (U = u(m, E.props.children)), (U.return = S), (S = U));
                      break t;
                    }
                  } else if (
                    m.elementType === Z ||
                    (typeof Z == 'object' && Z !== null && Z.$$typeof === Mt && Qe(Z) === m.type)
                  ) {
                    (e(S, m.sibling), (U = u(m, E.props)), lu(U, E), (U.return = S), (S = U));
                    break t;
                  }
                  e(S, m);
                  break;
                } else l(S, m);
                m = m.sibling;
              }
              E.type === j
                ? ((U = Ye(E.props.children, S.mode, U, E.key)), (U.return = S), (S = U))
                : ((U = ln(E.type, E.key, E.props, null, S.mode, U)),
                  lu(U, E),
                  (U.return = S),
                  (S = U));
            }
            return i(S);
          case V:
            t: {
              for (Z = E.key; m !== null; ) {
                if (m.key === Z)
                  if (
                    m.tag === 4 &&
                    m.stateNode.containerInfo === E.containerInfo &&
                    m.stateNode.implementation === E.implementation
                  ) {
                    (e(S, m.sibling), (U = u(m, E.children || [])), (U.return = S), (S = U));
                    break t;
                  } else {
                    e(S, m);
                    break;
                  }
                else l(S, m);
                m = m.sibling;
              }
              ((U = Zi(E, S.mode, U)), (U.return = S), (S = U));
            }
            return i(S);
          case Mt:
            return ((E = Qe(E)), St(S, m, E, U));
        }
        if (Nt(E)) return L(S, m, E, U);
        if (Jt(E)) {
          if (((Z = Jt(E)), typeof Z != 'function')) throw Error(c(150));
          return ((E = Z.call(E)), J(S, m, E, U));
        }
        if (typeof E.then == 'function') return St(S, m, rn(E), U);
        if (E.$$typeof === w) return St(S, m, un(S, E), U);
        on(S, E);
      }
      return (typeof E == 'string' && E !== '') || typeof E == 'number' || typeof E == 'bigint'
        ? ((E = '' + E),
          m !== null && m.tag === 6
            ? (e(S, m.sibling), (U = u(m, E)), (U.return = S), (S = U))
            : (e(S, m), (U = Qi(E, S.mode, U)), (U.return = S), (S = U)),
          i(S))
        : e(S, m);
    }
    return function (S, m, E, U) {
      try {
        tu = 0;
        var Z = St(S, m, E, U);
        return ((va = null), Z);
      } catch (Q) {
        if (Q === ya || Q === fn) throw Q;
        var ft = fl(29, Q, null, S.mode);
        return ((ft.lanes = U), (ft.return = S), ft);
      } finally {
      }
    };
  }
  var Ve = co(!0),
    ro = co(!1),
    de = !1;
  function lf(t) {
    t.updateQueue = {
      baseState: t.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null,
    };
  }
  function ef(t, l) {
    ((t = t.updateQueue),
      l.updateQueue === t &&
        (l.updateQueue = {
          baseState: t.baseState,
          firstBaseUpdate: t.firstBaseUpdate,
          lastBaseUpdate: t.lastBaseUpdate,
          shared: t.shared,
          callbacks: null,
        }));
  }
  function he(t) {
    return { lane: t, tag: 0, payload: null, callback: null, next: null };
  }
  function me(t, l, e) {
    var a = t.updateQueue;
    if (a === null) return null;
    if (((a = a.shared), (rt & 2) !== 0)) {
      var u = a.pending;
      return (
        u === null ? (l.next = l) : ((l.next = u.next), (u.next = l)),
        (a.pending = l),
        (l = tn(t)),
        Jr(t, null, e),
        l
      );
    }
    return (Pu(t, a, l, e), tn(t));
  }
  function eu(t, l, e) {
    if (((l = l.updateQueue), l !== null && ((l = l.shared), (e & 4194048) !== 0))) {
      var a = l.lanes;
      ((a &= t.pendingLanes), (e |= a), (l.lanes = e), tr(t, e));
    }
  }
  function af(t, l) {
    var e = t.updateQueue,
      a = t.alternate;
    if (a !== null && ((a = a.updateQueue), e === a)) {
      var u = null,
        n = null;
      if (((e = e.firstBaseUpdate), e !== null)) {
        do {
          var i = { lane: e.lane, tag: e.tag, payload: e.payload, callback: null, next: null };
          (n === null ? (u = n = i) : (n = n.next = i), (e = e.next));
        } while (e !== null);
        n === null ? (u = n = l) : (n = n.next = l);
      } else u = n = l;
      ((e = {
        baseState: a.baseState,
        firstBaseUpdate: u,
        lastBaseUpdate: n,
        shared: a.shared,
        callbacks: a.callbacks,
      }),
        (t.updateQueue = e));
      return;
    }
    ((t = e.lastBaseUpdate),
      t === null ? (e.firstBaseUpdate = l) : (t.next = l),
      (e.lastBaseUpdate = l));
  }
  var uf = !1;
  function au() {
    if (uf) {
      var t = ma;
      if (t !== null) throw t;
    }
  }
  function uu(t, l, e, a) {
    uf = !1;
    var u = t.updateQueue;
    de = !1;
    var n = u.firstBaseUpdate,
      i = u.lastBaseUpdate,
      r = u.shared.pending;
    if (r !== null) {
      u.shared.pending = null;
      var h = r,
        T = h.next;
      ((h.next = null), i === null ? (n = T) : (i.next = T), (i = h));
      var _ = t.alternate;
      _ !== null &&
        ((_ = _.updateQueue),
        (r = _.lastBaseUpdate),
        r !== i && (r === null ? (_.firstBaseUpdate = T) : (r.next = T), (_.lastBaseUpdate = h)));
    }
    if (n !== null) {
      var N = u.baseState;
      ((i = 0), (_ = T = h = null), (r = n));
      do {
        var z = r.lane & -536870913,
          R = z !== r.lane;
        if (R ? (ut & z) === z : (a & z) === z) {
          (z !== 0 && z === ha && (uf = !0),
            _ !== null &&
              (_ = _.next =
                { lane: 0, tag: r.tag, payload: r.payload, callback: null, next: null }));
          t: {
            var L = t,
              J = r;
            z = l;
            var St = e;
            switch (J.tag) {
              case 1:
                if (((L = J.payload), typeof L == 'function')) {
                  N = L.call(St, N, z);
                  break t;
                }
                N = L;
                break t;
              case 3:
                L.flags = (L.flags & -65537) | 128;
              case 0:
                if (
                  ((L = J.payload), (z = typeof L == 'function' ? L.call(St, N, z) : L), z == null)
                )
                  break t;
                N = A({}, N, z);
                break t;
              case 2:
                de = !0;
            }
          }
          ((z = r.callback),
            z !== null &&
              ((t.flags |= 64),
              R && (t.flags |= 8192),
              (R = u.callbacks),
              R === null ? (u.callbacks = [z]) : R.push(z)));
        } else
          ((R = { lane: z, tag: r.tag, payload: r.payload, callback: r.callback, next: null }),
            _ === null ? ((T = _ = R), (h = N)) : (_ = _.next = R),
            (i |= z));
        if (((r = r.next), r === null)) {
          if (((r = u.shared.pending), r === null)) break;
          ((R = r),
            (r = R.next),
            (R.next = null),
            (u.lastBaseUpdate = R),
            (u.shared.pending = null));
        }
      } while (!0);
      (_ === null && (h = N),
        (u.baseState = h),
        (u.firstBaseUpdate = T),
        (u.lastBaseUpdate = _),
        n === null && (u.shared.lanes = 0),
        (pe |= i),
        (t.lanes = i),
        (t.memoizedState = N));
    }
  }
  function oo(t, l) {
    if (typeof t != 'function') throw Error(c(191, t));
    t.call(l);
  }
  function so(t, l) {
    var e = t.callbacks;
    if (e !== null) for (t.callbacks = null, t = 0; t < e.length; t++) oo(e[t], l);
  }
  var ga = g(null),
    sn = g(0);
  function ho(t, l) {
    ((t = Pl), q(sn, t), q(ga, l), (Pl = t | l.baseLanes));
  }
  function nf() {
    (q(sn, Pl), q(ga, ga.current));
  }
  function ff() {
    ((Pl = sn.current), H(ga), H(sn));
  }
  var cl = g(null),
    Tl = null;
  function ye(t) {
    var l = t.alternate;
    (q(Ut, Ut.current & 1),
      q(cl, t),
      Tl === null && (l === null || ga.current !== null || l.memoizedState !== null) && (Tl = t));
  }
  function cf(t) {
    (q(Ut, Ut.current), q(cl, t), Tl === null && (Tl = t));
  }
  function mo(t) {
    t.tag === 22 ? (q(Ut, Ut.current), q(cl, t), Tl === null && (Tl = t)) : ve();
  }
  function ve() {
    (q(Ut, Ut.current), q(cl, cl.current));
  }
  function rl(t) {
    (H(cl), Tl === t && (Tl = null), H(Ut));
  }
  var Ut = g(0);
  function dn(t) {
    for (var l = t; l !== null; ) {
      if (l.tag === 13) {
        var e = l.memoizedState;
        if (e !== null && ((e = e.dehydrated), e === null || mc(e) || yc(e))) return l;
      } else if (
        l.tag === 19 &&
        (l.memoizedProps.revealOrder === 'forwards' ||
          l.memoizedProps.revealOrder === 'backwards' ||
          l.memoizedProps.revealOrder === 'unstable_legacy-backwards' ||
          l.memoizedProps.revealOrder === 'together')
      ) {
        if ((l.flags & 128) !== 0) return l;
      } else if (l.child !== null) {
        ((l.child.return = l), (l = l.child));
        continue;
      }
      if (l === t) break;
      for (; l.sibling === null; ) {
        if (l.return === null || l.return === t) return null;
        l = l.return;
      }
      ((l.sibling.return = l.return), (l = l.sibling));
    }
    return null;
  }
  var Kl = 0,
    P = null,
    vt = null,
    xt = null,
    hn = !1,
    Sa = !1,
    Ke = !1,
    mn = 0,
    nu = 0,
    pa = null,
    Km = 0;
  function _t() {
    throw Error(c(321));
  }
  function rf(t, l) {
    if (l === null) return !1;
    for (var e = 0; e < l.length && e < t.length; e++) if (!il(t[e], l[e])) return !1;
    return !0;
  }
  function of(t, l, e, a, u, n) {
    return (
      (Kl = n),
      (P = l),
      (l.memoizedState = null),
      (l.updateQueue = null),
      (l.lanes = 0),
      (M.H = t === null || t.memoizedState === null ? Fo : Rf),
      (Ke = !1),
      (n = e(a, u)),
      (Ke = !1),
      Sa && (n = vo(l, e, a, u)),
      yo(t),
      n
    );
  }
  function yo(t) {
    M.H = cu;
    var l = vt !== null && vt.next !== null;
    if (((Kl = 0), (xt = vt = P = null), (hn = !1), (nu = 0), (pa = null), l)) throw Error(c(300));
    t === null || Bt || ((t = t.dependencies), t !== null && an(t) && (Bt = !0));
  }
  function vo(t, l, e, a) {
    P = t;
    var u = 0;
    do {
      if ((Sa && (pa = null), (nu = 0), (Sa = !1), 25 <= u)) throw Error(c(301));
      if (((u += 1), (xt = vt = null), t.updateQueue != null)) {
        var n = t.updateQueue;
        ((n.lastEffect = null),
          (n.events = null),
          (n.stores = null),
          n.memoCache != null && (n.memoCache.index = 0));
      }
      ((M.H = Io), (n = l(e, a)));
    } while (Sa);
    return n;
  }
  function Jm() {
    var t = M.H,
      l = t.useState()[0];
    return (
      (l = typeof l.then == 'function' ? iu(l) : l),
      (t = t.useState()[0]),
      (vt !== null ? vt.memoizedState : null) !== t && (P.flags |= 1024),
      l
    );
  }
  function sf() {
    var t = mn !== 0;
    return ((mn = 0), t);
  }
  function df(t, l, e) {
    ((l.updateQueue = t.updateQueue), (l.flags &= -2053), (t.lanes &= ~e));
  }
  function hf(t) {
    if (hn) {
      for (t = t.memoizedState; t !== null; ) {
        var l = t.queue;
        (l !== null && (l.pending = null), (t = t.next));
      }
      hn = !1;
    }
    ((Kl = 0), (xt = vt = P = null), (Sa = !1), (nu = mn = 0), (pa = null));
  }
  function Wt() {
    var t = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
    return (xt === null ? (P.memoizedState = xt = t) : (xt = xt.next = t), xt);
  }
  function Ct() {
    if (vt === null) {
      var t = P.alternate;
      t = t !== null ? t.memoizedState : null;
    } else t = vt.next;
    var l = xt === null ? P.memoizedState : xt.next;
    if (l !== null) ((xt = l), (vt = t));
    else {
      if (t === null) throw P.alternate === null ? Error(c(467)) : Error(c(310));
      ((vt = t),
        (t = {
          memoizedState: vt.memoizedState,
          baseState: vt.baseState,
          baseQueue: vt.baseQueue,
          queue: vt.queue,
          next: null,
        }),
        xt === null ? (P.memoizedState = xt = t) : (xt = xt.next = t));
    }
    return xt;
  }
  function yn() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function iu(t) {
    var l = nu;
    return (
      (nu += 1),
      pa === null && (pa = []),
      (t = no(pa, t, l)),
      (l = P),
      (xt === null ? l.memoizedState : xt.next) === null &&
        ((l = l.alternate), (M.H = l === null || l.memoizedState === null ? Fo : Rf)),
      t
    );
  }
  function vn(t) {
    if (t !== null && typeof t == 'object') {
      if (typeof t.then == 'function') return iu(t);
      if (t.$$typeof === w) return Qt(t);
    }
    throw Error(c(438, String(t)));
  }
  function mf(t) {
    var l = null,
      e = P.updateQueue;
    if ((e !== null && (l = e.memoCache), l == null)) {
      var a = P.alternate;
      a !== null &&
        ((a = a.updateQueue),
        a !== null &&
          ((a = a.memoCache),
          a != null &&
            (l = {
              data: a.data.map(function (u) {
                return u.slice();
              }),
              index: 0,
            })));
    }
    if (
      (l == null && (l = { data: [], index: 0 }),
      e === null && ((e = yn()), (P.updateQueue = e)),
      (e.memoCache = l),
      (e = l.data[l.index]),
      e === void 0)
    )
      for (e = l.data[l.index] = Array(t), a = 0; a < t; a++) e[a] = Cl;
    return (l.index++, e);
  }
  function Jl(t, l) {
    return typeof l == 'function' ? l(t) : l;
  }
  function gn(t) {
    var l = Ct();
    return yf(l, vt, t);
  }
  function yf(t, l, e) {
    var a = t.queue;
    if (a === null) throw Error(c(311));
    a.lastRenderedReducer = e;
    var u = t.baseQueue,
      n = a.pending;
    if (n !== null) {
      if (u !== null) {
        var i = u.next;
        ((u.next = n.next), (n.next = i));
      }
      ((l.baseQueue = u = n), (a.pending = null));
    }
    if (((n = t.baseState), u === null)) t.memoizedState = n;
    else {
      l = u.next;
      var r = (i = null),
        h = null,
        T = l,
        _ = !1;
      do {
        var N = T.lane & -536870913;
        if (N !== T.lane ? (ut & N) === N : (Kl & N) === N) {
          var z = T.revertLane;
          if (z === 0)
            (h !== null &&
              (h = h.next =
                {
                  lane: 0,
                  revertLane: 0,
                  gesture: null,
                  action: T.action,
                  hasEagerState: T.hasEagerState,
                  eagerState: T.eagerState,
                  next: null,
                }),
              N === ha && (_ = !0));
          else if ((Kl & z) === z) {
            ((T = T.next), z === ha && (_ = !0));
            continue;
          } else
            ((N = {
              lane: 0,
              revertLane: T.revertLane,
              gesture: null,
              action: T.action,
              hasEagerState: T.hasEagerState,
              eagerState: T.eagerState,
              next: null,
            }),
              h === null ? ((r = h = N), (i = n)) : (h = h.next = N),
              (P.lanes |= z),
              (pe |= z));
          ((N = T.action), Ke && e(n, N), (n = T.hasEagerState ? T.eagerState : e(n, N)));
        } else
          ((z = {
            lane: N,
            revertLane: T.revertLane,
            gesture: T.gesture,
            action: T.action,
            hasEagerState: T.hasEagerState,
            eagerState: T.eagerState,
            next: null,
          }),
            h === null ? ((r = h = z), (i = n)) : (h = h.next = z),
            (P.lanes |= N),
            (pe |= N));
        T = T.next;
      } while (T !== null && T !== l);
      if (
        (h === null ? (i = n) : (h.next = r),
        !il(n, t.memoizedState) && ((Bt = !0), _ && ((e = ma), e !== null)))
      )
        throw e;
      ((t.memoizedState = n), (t.baseState = i), (t.baseQueue = h), (a.lastRenderedState = n));
    }
    return (u === null && (a.lanes = 0), [t.memoizedState, a.dispatch]);
  }
  function vf(t) {
    var l = Ct(),
      e = l.queue;
    if (e === null) throw Error(c(311));
    e.lastRenderedReducer = t;
    var a = e.dispatch,
      u = e.pending,
      n = l.memoizedState;
    if (u !== null) {
      e.pending = null;
      var i = (u = u.next);
      do ((n = t(n, i.action)), (i = i.next));
      while (i !== u);
      (il(n, l.memoizedState) || (Bt = !0),
        (l.memoizedState = n),
        l.baseQueue === null && (l.baseState = n),
        (e.lastRenderedState = n));
    }
    return [n, a];
  }
  function go(t, l, e) {
    var a = P,
      u = Ct(),
      n = it;
    if (n) {
      if (e === void 0) throw Error(c(407));
      e = e();
    } else e = l();
    var i = !il((vt || u).memoizedState, e);
    if (
      (i && ((u.memoizedState = e), (Bt = !0)),
      (u = u.queue),
      pf(bo.bind(null, a, u, t), [t]),
      u.getSnapshot !== l || i || (xt !== null && xt.memoizedState.tag & 1))
    ) {
      if (
        ((a.flags |= 2048),
        ba(9, { destroy: void 0 }, po.bind(null, a, u, e, l), null),
        bt === null)
      )
        throw Error(c(349));
      n || (Kl & 127) !== 0 || So(a, l, e);
    }
    return e;
  }
  function So(t, l, e) {
    ((t.flags |= 16384),
      (t = { getSnapshot: l, value: e }),
      (l = P.updateQueue),
      l === null
        ? ((l = yn()), (P.updateQueue = l), (l.stores = [t]))
        : ((e = l.stores), e === null ? (l.stores = [t]) : e.push(t)));
  }
  function po(t, l, e, a) {
    ((l.value = e), (l.getSnapshot = a), Eo(l) && To(t));
  }
  function bo(t, l, e) {
    return e(function () {
      Eo(l) && To(t);
    });
  }
  function Eo(t) {
    var l = t.getSnapshot;
    t = t.value;
    try {
      var e = l();
      return !il(t, e);
    } catch {
      return !0;
    }
  }
  function To(t) {
    var l = qe(t, 2);
    l !== null && el(l, t, 2);
  }
  function gf(t) {
    var l = Wt();
    if (typeof t == 'function') {
      var e = t;
      if (((t = e()), Ke)) {
        ne(!0);
        try {
          e();
        } finally {
          ne(!1);
        }
      }
    }
    return (
      (l.memoizedState = l.baseState = t),
      (l.queue = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Jl,
        lastRenderedState: t,
      }),
      l
    );
  }
  function zo(t, l, e, a) {
    return ((t.baseState = e), yf(t, vt, typeof a == 'function' ? a : Jl));
  }
  function wm(t, l, e, a, u) {
    if (bn(t)) throw Error(c(485));
    if (((t = l.action), t !== null)) {
      var n = {
        payload: u,
        action: t,
        next: null,
        isTransition: !0,
        status: 'pending',
        value: null,
        reason: null,
        listeners: [],
        then: function (i) {
          n.listeners.push(i);
        },
      };
      (M.T !== null ? e(!0) : (n.isTransition = !1),
        a(n),
        (e = l.pending),
        e === null
          ? ((n.next = l.pending = n), Ao(l, n))
          : ((n.next = e.next), (l.pending = e.next = n)));
    }
  }
  function Ao(t, l) {
    var e = l.action,
      a = l.payload,
      u = t.state;
    if (l.isTransition) {
      var n = M.T,
        i = {};
      M.T = i;
      try {
        var r = e(u, a),
          h = M.S;
        (h !== null && h(i, r), Ro(t, l, r));
      } catch (T) {
        Sf(t, l, T);
      } finally {
        (n !== null && i.types !== null && (n.types = i.types), (M.T = n));
      }
    } else
      try {
        ((n = e(u, a)), Ro(t, l, n));
      } catch (T) {
        Sf(t, l, T);
      }
  }
  function Ro(t, l, e) {
    e !== null && typeof e == 'object' && typeof e.then == 'function'
      ? e.then(
          function (a) {
            _o(t, l, a);
          },
          function (a) {
            return Sf(t, l, a);
          }
        )
      : _o(t, l, e);
  }
  function _o(t, l, e) {
    ((l.status = 'fulfilled'),
      (l.value = e),
      Oo(l),
      (t.state = e),
      (l = t.pending),
      l !== null &&
        ((e = l.next), e === l ? (t.pending = null) : ((e = e.next), (l.next = e), Ao(t, e))));
  }
  function Sf(t, l, e) {
    var a = t.pending;
    if (((t.pending = null), a !== null)) {
      a = a.next;
      do ((l.status = 'rejected'), (l.reason = e), Oo(l), (l = l.next));
      while (l !== a);
    }
    t.action = null;
  }
  function Oo(t) {
    t = t.listeners;
    for (var l = 0; l < t.length; l++) (0, t[l])();
  }
  function Mo(t, l) {
    return l;
  }
  function Do(t, l) {
    if (it) {
      var e = bt.formState;
      if (e !== null) {
        t: {
          var a = P;
          if (it) {
            if (Tt) {
              l: {
                for (var u = Tt, n = El; u.nodeType !== 8; ) {
                  if (!n) {
                    u = null;
                    break l;
                  }
                  if (((u = zl(u.nextSibling)), u === null)) {
                    u = null;
                    break l;
                  }
                }
                ((n = u.data), (u = n === 'F!' || n === 'F' ? u : null));
              }
              if (u) {
                ((Tt = zl(u.nextSibling)), (a = u.data === 'F!'));
                break t;
              }
            }
            oe(a);
          }
          a = !1;
        }
        a && (l = e[0]);
      }
    }
    return (
      (e = Wt()),
      (e.memoizedState = e.baseState = l),
      (a = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Mo,
        lastRenderedState: l,
      }),
      (e.queue = a),
      (e = $o.bind(null, P, a)),
      (a.dispatch = e),
      (a = gf(!1)),
      (n = Af.bind(null, P, !1, a.queue)),
      (a = Wt()),
      (u = { state: l, dispatch: null, action: t, pending: null }),
      (a.queue = u),
      (e = wm.bind(null, P, u, n, e)),
      (u.dispatch = e),
      (a.memoizedState = t),
      [l, e, !1]
    );
  }
  function Uo(t) {
    var l = Ct();
    return Co(l, vt, t);
  }
  function Co(t, l, e) {
    if (
      ((l = yf(t, l, Mo)[0]),
      (t = gn(Jl)[0]),
      typeof l == 'object' && l !== null && typeof l.then == 'function')
    )
      try {
        var a = iu(l);
      } catch (i) {
        throw i === ya ? fn : i;
      }
    else a = l;
    l = Ct();
    var u = l.queue,
      n = u.dispatch;
    return (
      e !== l.memoizedState &&
        ((P.flags |= 2048), ba(9, { destroy: void 0 }, $m.bind(null, u, e), null)),
      [a, n, t]
    );
  }
  function $m(t, l) {
    t.action = l;
  }
  function No(t) {
    var l = Ct(),
      e = vt;
    if (e !== null) return Co(l, e, t);
    (Ct(), (l = l.memoizedState), (e = Ct()));
    var a = e.queue.dispatch;
    return ((e.memoizedState = t), [l, a, !1]);
  }
  function ba(t, l, e, a) {
    return (
      (t = { tag: t, create: e, deps: a, inst: l, next: null }),
      (l = P.updateQueue),
      l === null && ((l = yn()), (P.updateQueue = l)),
      (e = l.lastEffect),
      e === null
        ? (l.lastEffect = t.next = t)
        : ((a = e.next), (e.next = t), (t.next = a), (l.lastEffect = t)),
      t
    );
  }
  function Ho() {
    return Ct().memoizedState;
  }
  function Sn(t, l, e, a) {
    var u = Wt();
    ((P.flags |= t),
      (u.memoizedState = ba(1 | l, { destroy: void 0 }, e, a === void 0 ? null : a)));
  }
  function pn(t, l, e, a) {
    var u = Ct();
    a = a === void 0 ? null : a;
    var n = u.memoizedState.inst;
    vt !== null && a !== null && rf(a, vt.memoizedState.deps)
      ? (u.memoizedState = ba(l, n, e, a))
      : ((P.flags |= t), (u.memoizedState = ba(1 | l, n, e, a)));
  }
  function xo(t, l) {
    Sn(8390656, 8, t, l);
  }
  function pf(t, l) {
    pn(2048, 8, t, l);
  }
  function Wm(t) {
    P.flags |= 4;
    var l = P.updateQueue;
    if (l === null) ((l = yn()), (P.updateQueue = l), (l.events = [t]));
    else {
      var e = l.events;
      e === null ? (l.events = [t]) : e.push(t);
    }
  }
  function Bo(t) {
    var l = Ct().memoizedState;
    return (
      Wm({ ref: l, nextImpl: t }),
      function () {
        if ((rt & 2) !== 0) throw Error(c(440));
        return l.impl.apply(void 0, arguments);
      }
    );
  }
  function qo(t, l) {
    return pn(4, 2, t, l);
  }
  function Yo(t, l) {
    return pn(4, 4, t, l);
  }
  function Lo(t, l) {
    if (typeof l == 'function') {
      t = t();
      var e = l(t);
      return function () {
        typeof e == 'function' ? e() : l(null);
      };
    }
    if (l != null)
      return (
        (t = t()),
        (l.current = t),
        function () {
          l.current = null;
        }
      );
  }
  function jo(t, l, e) {
    ((e = e != null ? e.concat([t]) : null), pn(4, 4, Lo.bind(null, l, t), e));
  }
  function bf() {}
  function Go(t, l) {
    var e = Ct();
    l = l === void 0 ? null : l;
    var a = e.memoizedState;
    return l !== null && rf(l, a[1]) ? a[0] : ((e.memoizedState = [t, l]), t);
  }
  function Xo(t, l) {
    var e = Ct();
    l = l === void 0 ? null : l;
    var a = e.memoizedState;
    if (l !== null && rf(l, a[1])) return a[0];
    if (((a = t()), Ke)) {
      ne(!0);
      try {
        t();
      } finally {
        ne(!1);
      }
    }
    return ((e.memoizedState = [a, l]), a);
  }
  function Ef(t, l, e) {
    return e === void 0 || ((Kl & 1073741824) !== 0 && (ut & 261930) === 0)
      ? (t.memoizedState = l)
      : ((t.memoizedState = e), (t = Qs()), (P.lanes |= t), (pe |= t), e);
  }
  function Qo(t, l, e, a) {
    return il(e, l)
      ? e
      : ga.current !== null
        ? ((t = Ef(t, e, a)), il(t, l) || (Bt = !0), t)
        : (Kl & 42) === 0 || ((Kl & 1073741824) !== 0 && (ut & 261930) === 0)
          ? ((Bt = !0), (t.memoizedState = e))
          : ((t = Qs()), (P.lanes |= t), (pe |= t), l);
  }
  function Zo(t, l, e, a, u) {
    var n = B.p;
    B.p = n !== 0 && 8 > n ? n : 8;
    var i = M.T,
      r = {};
    ((M.T = r), Af(t, !1, l, e));
    try {
      var h = u(),
        T = M.S;
      if (
        (T !== null && T(r, h), h !== null && typeof h == 'object' && typeof h.then == 'function')
      ) {
        var _ = Vm(h, a);
        fu(t, l, _, dl(t));
      } else fu(t, l, a, dl(t));
    } catch (N) {
      fu(t, l, { then: function () {}, status: 'rejected', reason: N }, dl());
    } finally {
      ((B.p = n), i !== null && r.types !== null && (i.types = r.types), (M.T = i));
    }
  }
  function km() {}
  function Tf(t, l, e, a) {
    if (t.tag !== 5) throw Error(c(476));
    var u = Vo(t).queue;
    Zo(
      t,
      u,
      l,
      $,
      e === null
        ? km
        : function () {
            return (Ko(t), e(a));
          }
    );
  }
  function Vo(t) {
    var l = t.memoizedState;
    if (l !== null) return l;
    l = {
      memoizedState: $,
      baseState: $,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Jl,
        lastRenderedState: $,
      },
      next: null,
    };
    var e = {};
    return (
      (l.next = {
        memoizedState: e,
        baseState: e,
        baseQueue: null,
        queue: {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: Jl,
          lastRenderedState: e,
        },
        next: null,
      }),
      (t.memoizedState = l),
      (t = t.alternate),
      t !== null && (t.memoizedState = l),
      l
    );
  }
  function Ko(t) {
    var l = Vo(t);
    (l.next === null && (l = t.alternate.memoizedState), fu(t, l.next.queue, {}, dl()));
  }
  function zf() {
    return Qt(Au);
  }
  function Jo() {
    return Ct().memoizedState;
  }
  function wo() {
    return Ct().memoizedState;
  }
  function Fm(t) {
    for (var l = t.return; l !== null; ) {
      switch (l.tag) {
        case 24:
        case 3:
          var e = dl();
          t = he(e);
          var a = me(l, t, e);
          (a !== null && (el(a, l, e), eu(a, l, e)), (l = { cache: Fi() }), (t.payload = l));
          return;
      }
      l = l.return;
    }
  }
  function Im(t, l, e) {
    var a = dl();
    ((e = {
      lane: a,
      revertLane: 0,
      gesture: null,
      action: e,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    }),
      bn(t) ? Wo(l, e) : ((e = Gi(t, l, e, a)), e !== null && (el(e, t, a), ko(e, l, a))));
  }
  function $o(t, l, e) {
    var a = dl();
    fu(t, l, e, a);
  }
  function fu(t, l, e, a) {
    var u = {
      lane: a,
      revertLane: 0,
      gesture: null,
      action: e,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    };
    if (bn(t)) Wo(l, u);
    else {
      var n = t.alternate;
      if (
        t.lanes === 0 &&
        (n === null || n.lanes === 0) &&
        ((n = l.lastRenderedReducer), n !== null)
      )
        try {
          var i = l.lastRenderedState,
            r = n(i, e);
          if (((u.hasEagerState = !0), (u.eagerState = r), il(r, i)))
            return (Pu(t, l, u, 0), bt === null && Iu(), !1);
        } catch {
        } finally {
        }
      if (((e = Gi(t, l, u, a)), e !== null)) return (el(e, t, a), ko(e, l, a), !0);
    }
    return !1;
  }
  function Af(t, l, e, a) {
    if (
      ((a = {
        lane: 2,
        revertLane: ec(),
        gesture: null,
        action: a,
        hasEagerState: !1,
        eagerState: null,
        next: null,
      }),
      bn(t))
    ) {
      if (l) throw Error(c(479));
    } else ((l = Gi(t, e, a, 2)), l !== null && el(l, t, 2));
  }
  function bn(t) {
    var l = t.alternate;
    return t === P || (l !== null && l === P);
  }
  function Wo(t, l) {
    Sa = hn = !0;
    var e = t.pending;
    (e === null ? (l.next = l) : ((l.next = e.next), (e.next = l)), (t.pending = l));
  }
  function ko(t, l, e) {
    if ((e & 4194048) !== 0) {
      var a = l.lanes;
      ((a &= t.pendingLanes), (e |= a), (l.lanes = e), tr(t, e));
    }
  }
  var cu = {
    readContext: Qt,
    use: vn,
    useCallback: _t,
    useContext: _t,
    useEffect: _t,
    useImperativeHandle: _t,
    useLayoutEffect: _t,
    useInsertionEffect: _t,
    useMemo: _t,
    useReducer: _t,
    useRef: _t,
    useState: _t,
    useDebugValue: _t,
    useDeferredValue: _t,
    useTransition: _t,
    useSyncExternalStore: _t,
    useId: _t,
    useHostTransitionStatus: _t,
    useFormState: _t,
    useActionState: _t,
    useOptimistic: _t,
    useMemoCache: _t,
    useCacheRefresh: _t,
  };
  cu.useEffectEvent = _t;
  var Fo = {
      readContext: Qt,
      use: vn,
      useCallback: function (t, l) {
        return ((Wt().memoizedState = [t, l === void 0 ? null : l]), t);
      },
      useContext: Qt,
      useEffect: xo,
      useImperativeHandle: function (t, l, e) {
        ((e = e != null ? e.concat([t]) : null), Sn(4194308, 4, Lo.bind(null, l, t), e));
      },
      useLayoutEffect: function (t, l) {
        return Sn(4194308, 4, t, l);
      },
      useInsertionEffect: function (t, l) {
        Sn(4, 2, t, l);
      },
      useMemo: function (t, l) {
        var e = Wt();
        l = l === void 0 ? null : l;
        var a = t();
        if (Ke) {
          ne(!0);
          try {
            t();
          } finally {
            ne(!1);
          }
        }
        return ((e.memoizedState = [a, l]), a);
      },
      useReducer: function (t, l, e) {
        var a = Wt();
        if (e !== void 0) {
          var u = e(l);
          if (Ke) {
            ne(!0);
            try {
              e(l);
            } finally {
              ne(!1);
            }
          }
        } else u = l;
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
          (t = t.dispatch = Im.bind(null, P, t)),
          [a.memoizedState, t]
        );
      },
      useRef: function (t) {
        var l = Wt();
        return ((t = { current: t }), (l.memoizedState = t));
      },
      useState: function (t) {
        t = gf(t);
        var l = t.queue,
          e = $o.bind(null, P, l);
        return ((l.dispatch = e), [t.memoizedState, e]);
      },
      useDebugValue: bf,
      useDeferredValue: function (t, l) {
        var e = Wt();
        return Ef(e, t, l);
      },
      useTransition: function () {
        var t = gf(!1);
        return ((t = Zo.bind(null, P, t.queue, !0, !1)), (Wt().memoizedState = t), [!1, t]);
      },
      useSyncExternalStore: function (t, l, e) {
        var a = P,
          u = Wt();
        if (it) {
          if (e === void 0) throw Error(c(407));
          e = e();
        } else {
          if (((e = l()), bt === null)) throw Error(c(349));
          (ut & 127) !== 0 || So(a, l, e);
        }
        u.memoizedState = e;
        var n = { value: e, getSnapshot: l };
        return (
          (u.queue = n),
          xo(bo.bind(null, a, n, t), [t]),
          (a.flags |= 2048),
          ba(9, { destroy: void 0 }, po.bind(null, a, n, e, l), null),
          e
        );
      },
      useId: function () {
        var t = Wt(),
          l = bt.identifierPrefix;
        if (it) {
          var e = xl,
            a = Hl;
          ((e = (a & ~(1 << (32 - nl(a) - 1))).toString(32) + e),
            (l = '_' + l + 'R_' + e),
            (e = mn++),
            0 < e && (l += 'H' + e.toString(32)),
            (l += '_'));
        } else ((e = Km++), (l = '_' + l + 'r_' + e.toString(32) + '_'));
        return (t.memoizedState = l);
      },
      useHostTransitionStatus: zf,
      useFormState: Do,
      useActionState: Do,
      useOptimistic: function (t) {
        var l = Wt();
        l.memoizedState = l.baseState = t;
        var e = {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: null,
          lastRenderedState: null,
        };
        return ((l.queue = e), (l = Af.bind(null, P, !0, e)), (e.dispatch = l), [t, l]);
      },
      useMemoCache: mf,
      useCacheRefresh: function () {
        return (Wt().memoizedState = Fm.bind(null, P));
      },
      useEffectEvent: function (t) {
        var l = Wt(),
          e = { impl: t };
        return (
          (l.memoizedState = e),
          function () {
            if ((rt & 2) !== 0) throw Error(c(440));
            return e.impl.apply(void 0, arguments);
          }
        );
      },
    },
    Rf = {
      readContext: Qt,
      use: vn,
      useCallback: Go,
      useContext: Qt,
      useEffect: pf,
      useImperativeHandle: jo,
      useInsertionEffect: qo,
      useLayoutEffect: Yo,
      useMemo: Xo,
      useReducer: gn,
      useRef: Ho,
      useState: function () {
        return gn(Jl);
      },
      useDebugValue: bf,
      useDeferredValue: function (t, l) {
        var e = Ct();
        return Qo(e, vt.memoizedState, t, l);
      },
      useTransition: function () {
        var t = gn(Jl)[0],
          l = Ct().memoizedState;
        return [typeof t == 'boolean' ? t : iu(t), l];
      },
      useSyncExternalStore: go,
      useId: Jo,
      useHostTransitionStatus: zf,
      useFormState: Uo,
      useActionState: Uo,
      useOptimistic: function (t, l) {
        var e = Ct();
        return zo(e, vt, t, l);
      },
      useMemoCache: mf,
      useCacheRefresh: wo,
    };
  Rf.useEffectEvent = Bo;
  var Io = {
    readContext: Qt,
    use: vn,
    useCallback: Go,
    useContext: Qt,
    useEffect: pf,
    useImperativeHandle: jo,
    useInsertionEffect: qo,
    useLayoutEffect: Yo,
    useMemo: Xo,
    useReducer: vf,
    useRef: Ho,
    useState: function () {
      return vf(Jl);
    },
    useDebugValue: bf,
    useDeferredValue: function (t, l) {
      var e = Ct();
      return vt === null ? Ef(e, t, l) : Qo(e, vt.memoizedState, t, l);
    },
    useTransition: function () {
      var t = vf(Jl)[0],
        l = Ct().memoizedState;
      return [typeof t == 'boolean' ? t : iu(t), l];
    },
    useSyncExternalStore: go,
    useId: Jo,
    useHostTransitionStatus: zf,
    useFormState: No,
    useActionState: No,
    useOptimistic: function (t, l) {
      var e = Ct();
      return vt !== null ? zo(e, vt, t, l) : ((e.baseState = t), [t, e.queue.dispatch]);
    },
    useMemoCache: mf,
    useCacheRefresh: wo,
  };
  Io.useEffectEvent = Bo;
  function _f(t, l, e, a) {
    ((l = t.memoizedState),
      (e = e(a, l)),
      (e = e == null ? l : A({}, l, e)),
      (t.memoizedState = e),
      t.lanes === 0 && (t.updateQueue.baseState = e));
  }
  var Of = {
    enqueueSetState: function (t, l, e) {
      t = t._reactInternals;
      var a = dl(),
        u = he(a);
      ((u.payload = l),
        e != null && (u.callback = e),
        (l = me(t, u, a)),
        l !== null && (el(l, t, a), eu(l, t, a)));
    },
    enqueueReplaceState: function (t, l, e) {
      t = t._reactInternals;
      var a = dl(),
        u = he(a);
      ((u.tag = 1),
        (u.payload = l),
        e != null && (u.callback = e),
        (l = me(t, u, a)),
        l !== null && (el(l, t, a), eu(l, t, a)));
    },
    enqueueForceUpdate: function (t, l) {
      t = t._reactInternals;
      var e = dl(),
        a = he(e);
      ((a.tag = 2),
        l != null && (a.callback = l),
        (l = me(t, a, e)),
        l !== null && (el(l, t, e), eu(l, t, e)));
    },
  };
  function Po(t, l, e, a, u, n, i) {
    return (
      (t = t.stateNode),
      typeof t.shouldComponentUpdate == 'function'
        ? t.shouldComponentUpdate(a, n, i)
        : l.prototype && l.prototype.isPureReactComponent
          ? !$a(e, a) || !$a(u, n)
          : !0
    );
  }
  function ts(t, l, e, a) {
    ((t = l.state),
      typeof l.componentWillReceiveProps == 'function' && l.componentWillReceiveProps(e, a),
      typeof l.UNSAFE_componentWillReceiveProps == 'function' &&
        l.UNSAFE_componentWillReceiveProps(e, a),
      l.state !== t && Of.enqueueReplaceState(l, l.state, null));
  }
  function Je(t, l) {
    var e = l;
    if ('ref' in l) {
      e = {};
      for (var a in l) a !== 'ref' && (e[a] = l[a]);
    }
    if ((t = t.defaultProps)) {
      e === l && (e = A({}, e));
      for (var u in t) e[u] === void 0 && (e[u] = t[u]);
    }
    return e;
  }
  function ls(t) {
    Fu(t);
  }
  function es(t) {
    console.error(t);
  }
  function as(t) {
    Fu(t);
  }
  function En(t, l) {
    try {
      var e = t.onUncaughtError;
      e(l.value, { componentStack: l.stack });
    } catch (a) {
      setTimeout(function () {
        throw a;
      });
    }
  }
  function us(t, l, e) {
    try {
      var a = t.onCaughtError;
      a(e.value, { componentStack: e.stack, errorBoundary: l.tag === 1 ? l.stateNode : null });
    } catch (u) {
      setTimeout(function () {
        throw u;
      });
    }
  }
  function Mf(t, l, e) {
    return (
      (e = he(e)),
      (e.tag = 3),
      (e.payload = { element: null }),
      (e.callback = function () {
        En(t, l);
      }),
      e
    );
  }
  function ns(t) {
    return ((t = he(t)), (t.tag = 3), t);
  }
  function is(t, l, e, a) {
    var u = e.type.getDerivedStateFromError;
    if (typeof u == 'function') {
      var n = a.value;
      ((t.payload = function () {
        return u(n);
      }),
        (t.callback = function () {
          us(l, e, a);
        }));
    }
    var i = e.stateNode;
    i !== null &&
      typeof i.componentDidCatch == 'function' &&
      (t.callback = function () {
        (us(l, e, a),
          typeof u != 'function' && (be === null ? (be = new Set([this])) : be.add(this)));
        var r = a.stack;
        this.componentDidCatch(a.value, { componentStack: r !== null ? r : '' });
      });
  }
  function Pm(t, l, e, a, u) {
    if (((e.flags |= 32768), a !== null && typeof a == 'object' && typeof a.then == 'function')) {
      if (((l = e.alternate), l !== null && da(l, e, u, !0), (e = cl.current), e !== null)) {
        switch (e.tag) {
          case 31:
          case 13:
            return (
              Tl === null ? Hn() : e.alternate === null && Ot === 0 && (Ot = 3),
              (e.flags &= -257),
              (e.flags |= 65536),
              (e.lanes = u),
              a === cn
                ? (e.flags |= 16384)
                : ((l = e.updateQueue),
                  l === null ? (e.updateQueue = new Set([a])) : l.add(a),
                  Pf(t, a, u)),
              !1
            );
          case 22:
            return (
              (e.flags |= 65536),
              a === cn
                ? (e.flags |= 16384)
                : ((l = e.updateQueue),
                  l === null
                    ? ((l = { transitions: null, markerInstances: null, retryQueue: new Set([a]) }),
                      (e.updateQueue = l))
                    : ((e = l.retryQueue), e === null ? (l.retryQueue = new Set([a])) : e.add(a)),
                  Pf(t, a, u)),
              !1
            );
        }
        throw Error(c(435, e.tag));
      }
      return (Pf(t, a, u), Hn(), !1);
    }
    if (it)
      return (
        (l = cl.current),
        l !== null
          ? ((l.flags & 65536) === 0 && (l.flags |= 256),
            (l.flags |= 65536),
            (l.lanes = u),
            a !== Ji && ((t = Error(c(422), { cause: a })), Fa(Sl(t, e))))
          : (a !== Ji && ((l = Error(c(423), { cause: a })), Fa(Sl(l, e))),
            (t = t.current.alternate),
            (t.flags |= 65536),
            (u &= -u),
            (t.lanes |= u),
            (a = Sl(a, e)),
            (u = Mf(t.stateNode, a, u)),
            af(t, u),
            Ot !== 4 && (Ot = 2)),
        !1
      );
    var n = Error(c(520), { cause: a });
    if (((n = Sl(n, e)), vu === null ? (vu = [n]) : vu.push(n), Ot !== 4 && (Ot = 2), l === null))
      return !0;
    ((a = Sl(a, e)), (e = l));
    do {
      switch (e.tag) {
        case 3:
          return (
            (e.flags |= 65536),
            (t = u & -u),
            (e.lanes |= t),
            (t = Mf(e.stateNode, a, t)),
            af(e, t),
            !1
          );
        case 1:
          if (
            ((l = e.type),
            (n = e.stateNode),
            (e.flags & 128) === 0 &&
              (typeof l.getDerivedStateFromError == 'function' ||
                (n !== null &&
                  typeof n.componentDidCatch == 'function' &&
                  (be === null || !be.has(n)))))
          )
            return (
              (e.flags |= 65536),
              (u &= -u),
              (e.lanes |= u),
              (u = ns(u)),
              is(u, t, e, a),
              af(e, u),
              !1
            );
      }
      e = e.return;
    } while (e !== null);
    return !1;
  }
  var Df = Error(c(461)),
    Bt = !1;
  function Zt(t, l, e, a) {
    l.child = t === null ? ro(l, null, e, a) : Ve(l, t.child, e, a);
  }
  function fs(t, l, e, a, u) {
    e = e.render;
    var n = l.ref;
    if ('ref' in a) {
      var i = {};
      for (var r in a) r !== 'ref' && (i[r] = a[r]);
    } else i = a;
    return (
      Ge(l),
      (a = of(t, l, e, i, n, u)),
      (r = sf()),
      t !== null && !Bt
        ? (df(t, l, u), wl(t, l, u))
        : (it && r && Vi(l), (l.flags |= 1), Zt(t, l, a, u), l.child)
    );
  }
  function cs(t, l, e, a, u) {
    if (t === null) {
      var n = e.type;
      return typeof n == 'function' && !Xi(n) && n.defaultProps === void 0 && e.compare === null
        ? ((l.tag = 15), (l.type = n), rs(t, l, n, a, u))
        : ((t = ln(e.type, null, a, l, l.mode, u)), (t.ref = l.ref), (t.return = l), (l.child = t));
    }
    if (((n = t.child), !Yf(t, u))) {
      var i = n.memoizedProps;
      if (((e = e.compare), (e = e !== null ? e : $a), e(i, a) && t.ref === l.ref))
        return wl(t, l, u);
    }
    return ((l.flags |= 1), (t = Xl(n, a)), (t.ref = l.ref), (t.return = l), (l.child = t));
  }
  function rs(t, l, e, a, u) {
    if (t !== null) {
      var n = t.memoizedProps;
      if ($a(n, a) && t.ref === l.ref)
        if (((Bt = !1), (l.pendingProps = a = n), Yf(t, u))) (t.flags & 131072) !== 0 && (Bt = !0);
        else return ((l.lanes = t.lanes), wl(t, l, u));
    }
    return Uf(t, l, e, a, u);
  }
  function os(t, l, e, a) {
    var u = a.children,
      n = t !== null ? t.memoizedState : null;
    if (
      (t === null &&
        l.stateNode === null &&
        (l.stateNode = {
          _visibility: 1,
          _pendingMarkers: null,
          _retryCache: null,
          _transitions: null,
        }),
      a.mode === 'hidden')
    ) {
      if ((l.flags & 128) !== 0) {
        if (((n = n !== null ? n.baseLanes | e : e), t !== null)) {
          for (a = l.child = t.child, u = 0; a !== null; )
            ((u = u | a.lanes | a.childLanes), (a = a.sibling));
          a = u & ~n;
        } else ((a = 0), (l.child = null));
        return ss(t, l, n, e, a);
      }
      if ((e & 536870912) !== 0)
        ((l.memoizedState = { baseLanes: 0, cachePool: null }),
          t !== null && nn(l, n !== null ? n.cachePool : null),
          n !== null ? ho(l, n) : nf(),
          mo(l));
      else return ((a = l.lanes = 536870912), ss(t, l, n !== null ? n.baseLanes | e : e, e, a));
    } else
      n !== null
        ? (nn(l, n.cachePool), ho(l, n), ve(), (l.memoizedState = null))
        : (t !== null && nn(l, null), nf(), ve());
    return (Zt(t, l, u, e), l.child);
  }
  function ru(t, l) {
    return (
      (t !== null && t.tag === 22) ||
        l.stateNode !== null ||
        (l.stateNode = {
          _visibility: 1,
          _pendingMarkers: null,
          _retryCache: null,
          _transitions: null,
        }),
      l.sibling
    );
  }
  function ss(t, l, e, a, u) {
    var n = Pi();
    return (
      (n = n === null ? null : { parent: Ht._currentValue, pool: n }),
      (l.memoizedState = { baseLanes: e, cachePool: n }),
      t !== null && nn(l, null),
      nf(),
      mo(l),
      t !== null && da(t, l, a, !0),
      (l.childLanes = u),
      null
    );
  }
  function Tn(t, l) {
    return (
      (l = An({ mode: l.mode, children: l.children }, t.mode)),
      (l.ref = t.ref),
      (t.child = l),
      (l.return = t),
      l
    );
  }
  function ds(t, l, e) {
    return (
      Ve(l, t.child, null, e),
      (t = Tn(l, l.pendingProps)),
      (t.flags |= 2),
      rl(l),
      (l.memoizedState = null),
      t
    );
  }
  function ty(t, l, e) {
    var a = l.pendingProps,
      u = (l.flags & 128) !== 0;
    if (((l.flags &= -129), t === null)) {
      if (it) {
        if (a.mode === 'hidden') return ((t = Tn(l, a)), (l.lanes = 536870912), ru(null, t));
        if (
          (cf(l),
          (t = Tt)
            ? ((t = Ad(t, El)),
              (t = t !== null && t.data === '&' ? t : null),
              t !== null &&
                ((l.memoizedState = {
                  dehydrated: t,
                  treeContext: ce !== null ? { id: Hl, overflow: xl } : null,
                  retryLane: 536870912,
                  hydrationErrors: null,
                }),
                (e = $r(t)),
                (e.return = l),
                (l.child = e),
                (Xt = l),
                (Tt = null)))
            : (t = null),
          t === null)
        )
          throw oe(l);
        return ((l.lanes = 536870912), null);
      }
      return Tn(l, a);
    }
    var n = t.memoizedState;
    if (n !== null) {
      var i = n.dehydrated;
      if ((cf(l), u))
        if (l.flags & 256) ((l.flags &= -257), (l = ds(t, l, e)));
        else if (l.memoizedState !== null) ((l.child = t.child), (l.flags |= 128), (l = null));
        else throw Error(c(558));
      else if ((Bt || da(t, l, e, !1), (u = (e & t.childLanes) !== 0), Bt || u)) {
        if (((a = bt), a !== null && ((i = lr(a, e)), i !== 0 && i !== n.retryLane)))
          throw ((n.retryLane = i), qe(t, i), el(a, t, i), Df);
        (Hn(), (l = ds(t, l, e)));
      } else
        ((t = n.treeContext),
          (Tt = zl(i.nextSibling)),
          (Xt = l),
          (it = !0),
          (re = null),
          (El = !1),
          t !== null && Fr(l, t),
          (l = Tn(l, a)),
          (l.flags |= 4096));
      return l;
    }
    return (
      (t = Xl(t.child, { mode: a.mode, children: a.children })),
      (t.ref = l.ref),
      (l.child = t),
      (t.return = l),
      t
    );
  }
  function zn(t, l) {
    var e = l.ref;
    if (e === null) t !== null && t.ref !== null && (l.flags |= 4194816);
    else {
      if (typeof e != 'function' && typeof e != 'object') throw Error(c(284));
      (t === null || t.ref !== e) && (l.flags |= 4194816);
    }
  }
  function Uf(t, l, e, a, u) {
    return (
      Ge(l),
      (e = of(t, l, e, a, void 0, u)),
      (a = sf()),
      t !== null && !Bt
        ? (df(t, l, u), wl(t, l, u))
        : (it && a && Vi(l), (l.flags |= 1), Zt(t, l, e, u), l.child)
    );
  }
  function hs(t, l, e, a, u, n) {
    return (
      Ge(l),
      (l.updateQueue = null),
      (e = vo(l, a, e, u)),
      yo(t),
      (a = sf()),
      t !== null && !Bt
        ? (df(t, l, n), wl(t, l, n))
        : (it && a && Vi(l), (l.flags |= 1), Zt(t, l, e, n), l.child)
    );
  }
  function ms(t, l, e, a, u) {
    if ((Ge(l), l.stateNode === null)) {
      var n = ca,
        i = e.contextType;
      (typeof i == 'object' && i !== null && (n = Qt(i)),
        (n = new e(a, n)),
        (l.memoizedState = n.state !== null && n.state !== void 0 ? n.state : null),
        (n.updater = Of),
        (l.stateNode = n),
        (n._reactInternals = l),
        (n = l.stateNode),
        (n.props = a),
        (n.state = l.memoizedState),
        (n.refs = {}),
        lf(l),
        (i = e.contextType),
        (n.context = typeof i == 'object' && i !== null ? Qt(i) : ca),
        (n.state = l.memoizedState),
        (i = e.getDerivedStateFromProps),
        typeof i == 'function' && (_f(l, e, i, a), (n.state = l.memoizedState)),
        typeof e.getDerivedStateFromProps == 'function' ||
          typeof n.getSnapshotBeforeUpdate == 'function' ||
          (typeof n.UNSAFE_componentWillMount != 'function' &&
            typeof n.componentWillMount != 'function') ||
          ((i = n.state),
          typeof n.componentWillMount == 'function' && n.componentWillMount(),
          typeof n.UNSAFE_componentWillMount == 'function' && n.UNSAFE_componentWillMount(),
          i !== n.state && Of.enqueueReplaceState(n, n.state, null),
          uu(l, a, n, u),
          au(),
          (n.state = l.memoizedState)),
        typeof n.componentDidMount == 'function' && (l.flags |= 4194308),
        (a = !0));
    } else if (t === null) {
      n = l.stateNode;
      var r = l.memoizedProps,
        h = Je(e, r);
      n.props = h;
      var T = n.context,
        _ = e.contextType;
      ((i = ca), typeof _ == 'object' && _ !== null && (i = Qt(_)));
      var N = e.getDerivedStateFromProps;
      ((_ = typeof N == 'function' || typeof n.getSnapshotBeforeUpdate == 'function'),
        (r = l.pendingProps !== r),
        _ ||
          (typeof n.UNSAFE_componentWillReceiveProps != 'function' &&
            typeof n.componentWillReceiveProps != 'function') ||
          ((r || T !== i) && ts(l, n, a, i)),
        (de = !1));
      var z = l.memoizedState;
      ((n.state = z),
        uu(l, a, n, u),
        au(),
        (T = l.memoizedState),
        r || z !== T || de
          ? (typeof N == 'function' && (_f(l, e, N, a), (T = l.memoizedState)),
            (h = de || Po(l, e, h, a, z, T, i))
              ? (_ ||
                  (typeof n.UNSAFE_componentWillMount != 'function' &&
                    typeof n.componentWillMount != 'function') ||
                  (typeof n.componentWillMount == 'function' && n.componentWillMount(),
                  typeof n.UNSAFE_componentWillMount == 'function' &&
                    n.UNSAFE_componentWillMount()),
                typeof n.componentDidMount == 'function' && (l.flags |= 4194308))
              : (typeof n.componentDidMount == 'function' && (l.flags |= 4194308),
                (l.memoizedProps = a),
                (l.memoizedState = T)),
            (n.props = a),
            (n.state = T),
            (n.context = i),
            (a = h))
          : (typeof n.componentDidMount == 'function' && (l.flags |= 4194308), (a = !1)));
    } else {
      ((n = l.stateNode),
        ef(t, l),
        (i = l.memoizedProps),
        (_ = Je(e, i)),
        (n.props = _),
        (N = l.pendingProps),
        (z = n.context),
        (T = e.contextType),
        (h = ca),
        typeof T == 'object' && T !== null && (h = Qt(T)),
        (r = e.getDerivedStateFromProps),
        (T = typeof r == 'function' || typeof n.getSnapshotBeforeUpdate == 'function') ||
          (typeof n.UNSAFE_componentWillReceiveProps != 'function' &&
            typeof n.componentWillReceiveProps != 'function') ||
          ((i !== N || z !== h) && ts(l, n, a, h)),
        (de = !1),
        (z = l.memoizedState),
        (n.state = z),
        uu(l, a, n, u),
        au());
      var R = l.memoizedState;
      i !== N || z !== R || de || (t !== null && t.dependencies !== null && an(t.dependencies))
        ? (typeof r == 'function' && (_f(l, e, r, a), (R = l.memoizedState)),
          (_ =
            de ||
            Po(l, e, _, a, z, R, h) ||
            (t !== null && t.dependencies !== null && an(t.dependencies)))
            ? (T ||
                (typeof n.UNSAFE_componentWillUpdate != 'function' &&
                  typeof n.componentWillUpdate != 'function') ||
                (typeof n.componentWillUpdate == 'function' && n.componentWillUpdate(a, R, h),
                typeof n.UNSAFE_componentWillUpdate == 'function' &&
                  n.UNSAFE_componentWillUpdate(a, R, h)),
              typeof n.componentDidUpdate == 'function' && (l.flags |= 4),
              typeof n.getSnapshotBeforeUpdate == 'function' && (l.flags |= 1024))
            : (typeof n.componentDidUpdate != 'function' ||
                (i === t.memoizedProps && z === t.memoizedState) ||
                (l.flags |= 4),
              typeof n.getSnapshotBeforeUpdate != 'function' ||
                (i === t.memoizedProps && z === t.memoizedState) ||
                (l.flags |= 1024),
              (l.memoizedProps = a),
              (l.memoizedState = R)),
          (n.props = a),
          (n.state = R),
          (n.context = h),
          (a = _))
        : (typeof n.componentDidUpdate != 'function' ||
            (i === t.memoizedProps && z === t.memoizedState) ||
            (l.flags |= 4),
          typeof n.getSnapshotBeforeUpdate != 'function' ||
            (i === t.memoizedProps && z === t.memoizedState) ||
            (l.flags |= 1024),
          (a = !1));
    }
    return (
      (n = a),
      zn(t, l),
      (a = (l.flags & 128) !== 0),
      n || a
        ? ((n = l.stateNode),
          (e = a && typeof e.getDerivedStateFromError != 'function' ? null : n.render()),
          (l.flags |= 1),
          t !== null && a
            ? ((l.child = Ve(l, t.child, null, u)), (l.child = Ve(l, null, e, u)))
            : Zt(t, l, e, u),
          (l.memoizedState = n.state),
          (t = l.child))
        : (t = wl(t, l, u)),
      t
    );
  }
  function ys(t, l, e, a) {
    return (Le(), (l.flags |= 256), Zt(t, l, e, a), l.child);
  }
  var Cf = { dehydrated: null, treeContext: null, retryLane: 0, hydrationErrors: null };
  function Nf(t) {
    return { baseLanes: t, cachePool: ao() };
  }
  function Hf(t, l, e) {
    return ((t = t !== null ? t.childLanes & ~e : 0), l && (t |= sl), t);
  }
  function vs(t, l, e) {
    var a = l.pendingProps,
      u = !1,
      n = (l.flags & 128) !== 0,
      i;
    if (
      ((i = n) || (i = t !== null && t.memoizedState === null ? !1 : (Ut.current & 2) !== 0),
      i && ((u = !0), (l.flags &= -129)),
      (i = (l.flags & 32) !== 0),
      (l.flags &= -33),
      t === null)
    ) {
      if (it) {
        if (
          (u ? ye(l) : ve(),
          (t = Tt)
            ? ((t = Ad(t, El)),
              (t = t !== null && t.data !== '&' ? t : null),
              t !== null &&
                ((l.memoizedState = {
                  dehydrated: t,
                  treeContext: ce !== null ? { id: Hl, overflow: xl } : null,
                  retryLane: 536870912,
                  hydrationErrors: null,
                }),
                (e = $r(t)),
                (e.return = l),
                (l.child = e),
                (Xt = l),
                (Tt = null)))
            : (t = null),
          t === null)
        )
          throw oe(l);
        return (yc(t) ? (l.lanes = 32) : (l.lanes = 536870912), null);
      }
      var r = a.children;
      return (
        (a = a.fallback),
        u
          ? (ve(),
            (u = l.mode),
            (r = An({ mode: 'hidden', children: r }, u)),
            (a = Ye(a, u, e, null)),
            (r.return = l),
            (a.return = l),
            (r.sibling = a),
            (l.child = r),
            (a = l.child),
            (a.memoizedState = Nf(e)),
            (a.childLanes = Hf(t, i, e)),
            (l.memoizedState = Cf),
            ru(null, a))
          : (ye(l), xf(l, r))
      );
    }
    var h = t.memoizedState;
    if (h !== null && ((r = h.dehydrated), r !== null)) {
      if (n)
        l.flags & 256
          ? (ye(l), (l.flags &= -257), (l = Bf(t, l, e)))
          : l.memoizedState !== null
            ? (ve(), (l.child = t.child), (l.flags |= 128), (l = null))
            : (ve(),
              (r = a.fallback),
              (u = l.mode),
              (a = An({ mode: 'visible', children: a.children }, u)),
              (r = Ye(r, u, e, null)),
              (r.flags |= 2),
              (a.return = l),
              (r.return = l),
              (a.sibling = r),
              (l.child = a),
              Ve(l, t.child, null, e),
              (a = l.child),
              (a.memoizedState = Nf(e)),
              (a.childLanes = Hf(t, i, e)),
              (l.memoizedState = Cf),
              (l = ru(null, a)));
      else if ((ye(l), yc(r))) {
        if (((i = r.nextSibling && r.nextSibling.dataset), i)) var T = i.dgst;
        ((i = T),
          (a = Error(c(419))),
          (a.stack = ''),
          (a.digest = i),
          Fa({ value: a, source: null, stack: null }),
          (l = Bf(t, l, e)));
      } else if ((Bt || da(t, l, e, !1), (i = (e & t.childLanes) !== 0), Bt || i)) {
        if (((i = bt), i !== null && ((a = lr(i, e)), a !== 0 && a !== h.retryLane)))
          throw ((h.retryLane = a), qe(t, a), el(i, t, a), Df);
        (mc(r) || Hn(), (l = Bf(t, l, e)));
      } else
        mc(r)
          ? ((l.flags |= 192), (l.child = t.child), (l = null))
          : ((t = h.treeContext),
            (Tt = zl(r.nextSibling)),
            (Xt = l),
            (it = !0),
            (re = null),
            (El = !1),
            t !== null && Fr(l, t),
            (l = xf(l, a.children)),
            (l.flags |= 4096));
      return l;
    }
    return u
      ? (ve(),
        (r = a.fallback),
        (u = l.mode),
        (h = t.child),
        (T = h.sibling),
        (a = Xl(h, { mode: 'hidden', children: a.children })),
        (a.subtreeFlags = h.subtreeFlags & 65011712),
        T !== null ? (r = Xl(T, r)) : ((r = Ye(r, u, e, null)), (r.flags |= 2)),
        (r.return = l),
        (a.return = l),
        (a.sibling = r),
        (l.child = a),
        ru(null, a),
        (a = l.child),
        (r = t.child.memoizedState),
        r === null
          ? (r = Nf(e))
          : ((u = r.cachePool),
            u !== null
              ? ((h = Ht._currentValue), (u = u.parent !== h ? { parent: h, pool: h } : u))
              : (u = ao()),
            (r = { baseLanes: r.baseLanes | e, cachePool: u })),
        (a.memoizedState = r),
        (a.childLanes = Hf(t, i, e)),
        (l.memoizedState = Cf),
        ru(t.child, a))
      : (ye(l),
        (e = t.child),
        (t = e.sibling),
        (e = Xl(e, { mode: 'visible', children: a.children })),
        (e.return = l),
        (e.sibling = null),
        t !== null &&
          ((i = l.deletions), i === null ? ((l.deletions = [t]), (l.flags |= 16)) : i.push(t)),
        (l.child = e),
        (l.memoizedState = null),
        e);
  }
  function xf(t, l) {
    return ((l = An({ mode: 'visible', children: l }, t.mode)), (l.return = t), (t.child = l));
  }
  function An(t, l) {
    return ((t = fl(22, t, null, l)), (t.lanes = 0), t);
  }
  function Bf(t, l, e) {
    return (
      Ve(l, t.child, null, e),
      (t = xf(l, l.pendingProps.children)),
      (t.flags |= 2),
      (l.memoizedState = null),
      t
    );
  }
  function gs(t, l, e) {
    t.lanes |= l;
    var a = t.alternate;
    (a !== null && (a.lanes |= l), Wi(t.return, l, e));
  }
  function qf(t, l, e, a, u, n) {
    var i = t.memoizedState;
    i === null
      ? (t.memoizedState = {
          isBackwards: l,
          rendering: null,
          renderingStartTime: 0,
          last: a,
          tail: e,
          tailMode: u,
          treeForkCount: n,
        })
      : ((i.isBackwards = l),
        (i.rendering = null),
        (i.renderingStartTime = 0),
        (i.last = a),
        (i.tail = e),
        (i.tailMode = u),
        (i.treeForkCount = n));
  }
  function Ss(t, l, e) {
    var a = l.pendingProps,
      u = a.revealOrder,
      n = a.tail;
    a = a.children;
    var i = Ut.current,
      r = (i & 2) !== 0;
    if (
      (r ? ((i = (i & 1) | 2), (l.flags |= 128)) : (i &= 1),
      q(Ut, i),
      Zt(t, l, a, e),
      (a = it ? ka : 0),
      !r && t !== null && (t.flags & 128) !== 0)
    )
      t: for (t = l.child; t !== null; ) {
        if (t.tag === 13) t.memoizedState !== null && gs(t, e, l);
        else if (t.tag === 19) gs(t, e, l);
        else if (t.child !== null) {
          ((t.child.return = t), (t = t.child));
          continue;
        }
        if (t === l) break t;
        for (; t.sibling === null; ) {
          if (t.return === null || t.return === l) break t;
          t = t.return;
        }
        ((t.sibling.return = t.return), (t = t.sibling));
      }
    switch (u) {
      case 'forwards':
        for (e = l.child, u = null; e !== null; )
          ((t = e.alternate), t !== null && dn(t) === null && (u = e), (e = e.sibling));
        ((e = u),
          e === null ? ((u = l.child), (l.child = null)) : ((u = e.sibling), (e.sibling = null)),
          qf(l, !1, u, e, n, a));
        break;
      case 'backwards':
      case 'unstable_legacy-backwards':
        for (e = null, u = l.child, l.child = null; u !== null; ) {
          if (((t = u.alternate), t !== null && dn(t) === null)) {
            l.child = u;
            break;
          }
          ((t = u.sibling), (u.sibling = e), (e = u), (u = t));
        }
        qf(l, !0, e, null, n, a);
        break;
      case 'together':
        qf(l, !1, null, null, void 0, a);
        break;
      default:
        l.memoizedState = null;
    }
    return l.child;
  }
  function wl(t, l, e) {
    if (
      (t !== null && (l.dependencies = t.dependencies), (pe |= l.lanes), (e & l.childLanes) === 0)
    )
      if (t !== null) {
        if ((da(t, l, e, !1), (e & l.childLanes) === 0)) return null;
      } else return null;
    if (t !== null && l.child !== t.child) throw Error(c(153));
    if (l.child !== null) {
      for (t = l.child, e = Xl(t, t.pendingProps), l.child = e, e.return = l; t.sibling !== null; )
        ((t = t.sibling), (e = e.sibling = Xl(t, t.pendingProps)), (e.return = l));
      e.sibling = null;
    }
    return l.child;
  }
  function Yf(t, l) {
    return (t.lanes & l) !== 0 ? !0 : ((t = t.dependencies), !!(t !== null && an(t)));
  }
  function ly(t, l, e) {
    switch (l.tag) {
      case 3:
        ($t(l, l.stateNode.containerInfo), se(l, Ht, t.memoizedState.cache), Le());
        break;
      case 27:
      case 5:
        Ba(l);
        break;
      case 4:
        $t(l, l.stateNode.containerInfo);
        break;
      case 10:
        se(l, l.type, l.memoizedProps.value);
        break;
      case 31:
        if (l.memoizedState !== null) return ((l.flags |= 128), cf(l), null);
        break;
      case 13:
        var a = l.memoizedState;
        if (a !== null)
          return a.dehydrated !== null
            ? (ye(l), (l.flags |= 128), null)
            : (e & l.child.childLanes) !== 0
              ? vs(t, l, e)
              : (ye(l), (t = wl(t, l, e)), t !== null ? t.sibling : null);
        ye(l);
        break;
      case 19:
        var u = (t.flags & 128) !== 0;
        if (
          ((a = (e & l.childLanes) !== 0),
          a || (da(t, l, e, !1), (a = (e & l.childLanes) !== 0)),
          u)
        ) {
          if (a) return Ss(t, l, e);
          l.flags |= 128;
        }
        if (
          ((u = l.memoizedState),
          u !== null && ((u.rendering = null), (u.tail = null), (u.lastEffect = null)),
          q(Ut, Ut.current),
          a)
        )
          break;
        return null;
      case 22:
        return ((l.lanes = 0), os(t, l, e, l.pendingProps));
      case 24:
        se(l, Ht, t.memoizedState.cache);
    }
    return wl(t, l, e);
  }
  function ps(t, l, e) {
    if (t !== null)
      if (t.memoizedProps !== l.pendingProps) Bt = !0;
      else {
        if (!Yf(t, e) && (l.flags & 128) === 0) return ((Bt = !1), ly(t, l, e));
        Bt = (t.flags & 131072) !== 0;
      }
    else ((Bt = !1), it && (l.flags & 1048576) !== 0 && kr(l, ka, l.index));
    switch (((l.lanes = 0), l.tag)) {
      case 16:
        t: {
          var a = l.pendingProps;
          if (((t = Qe(l.elementType)), (l.type = t), typeof t == 'function'))
            Xi(t)
              ? ((a = Je(t, a)), (l.tag = 1), (l = ms(null, l, t, a, e)))
              : ((l.tag = 0), (l = Uf(null, l, t, a, e)));
          else {
            if (t != null) {
              var u = t.$$typeof;
              if (u === mt) {
                ((l.tag = 11), (l = fs(null, l, t, a, e)));
                break t;
              } else if (u === W) {
                ((l.tag = 14), (l = cs(null, l, t, a, e)));
                break t;
              }
            }
            throw ((l = ml(t) || t), Error(c(306, l, '')));
          }
        }
        return l;
      case 0:
        return Uf(t, l, l.type, l.pendingProps, e);
      case 1:
        return ((a = l.type), (u = Je(a, l.pendingProps)), ms(t, l, a, u, e));
      case 3:
        t: {
          if (($t(l, l.stateNode.containerInfo), t === null)) throw Error(c(387));
          a = l.pendingProps;
          var n = l.memoizedState;
          ((u = n.element), ef(t, l), uu(l, a, null, e));
          var i = l.memoizedState;
          if (
            ((a = i.cache),
            se(l, Ht, a),
            a !== n.cache && ki(l, [Ht], e, !0),
            au(),
            (a = i.element),
            n.isDehydrated)
          )
            if (
              ((n = { element: a, isDehydrated: !1, cache: i.cache }),
              (l.updateQueue.baseState = n),
              (l.memoizedState = n),
              l.flags & 256)
            ) {
              l = ys(t, l, a, e);
              break t;
            } else if (a !== u) {
              ((u = Sl(Error(c(424)), l)), Fa(u), (l = ys(t, l, a, e)));
              break t;
            } else {
              switch (((t = l.stateNode.containerInfo), t.nodeType)) {
                case 9:
                  t = t.body;
                  break;
                default:
                  t = t.nodeName === 'HTML' ? t.ownerDocument.body : t;
              }
              for (
                Tt = zl(t.firstChild),
                  Xt = l,
                  it = !0,
                  re = null,
                  El = !0,
                  e = ro(l, null, a, e),
                  l.child = e;
                e;
              )
                ((e.flags = (e.flags & -3) | 4096), (e = e.sibling));
            }
          else {
            if ((Le(), a === u)) {
              l = wl(t, l, e);
              break t;
            }
            Zt(t, l, a, e);
          }
          l = l.child;
        }
        return l;
      case 26:
        return (
          zn(t, l),
          t === null
            ? (e = Ud(l.type, null, l.pendingProps, null))
              ? (l.memoizedState = e)
              : it ||
                ((e = l.type),
                (t = l.pendingProps),
                (a = Gn(lt.current).createElement(e)),
                (a[Gt] = l),
                (a[kt] = t),
                Vt(a, e, t),
                Lt(a),
                (l.stateNode = a))
            : (l.memoizedState = Ud(l.type, t.memoizedProps, l.pendingProps, t.memoizedState)),
          null
        );
      case 27:
        return (
          Ba(l),
          t === null &&
            it &&
            ((a = l.stateNode = Od(l.type, l.pendingProps, lt.current)),
            (Xt = l),
            (El = !0),
            (u = Tt),
            Ae(l.type) ? ((vc = u), (Tt = zl(a.firstChild))) : (Tt = u)),
          Zt(t, l, l.pendingProps.children, e),
          zn(t, l),
          t === null && (l.flags |= 4194304),
          l.child
        );
      case 5:
        return (
          t === null &&
            it &&
            ((u = a = Tt) &&
              ((a = Cy(a, l.type, l.pendingProps, El)),
              a !== null
                ? ((l.stateNode = a), (Xt = l), (Tt = zl(a.firstChild)), (El = !1), (u = !0))
                : (u = !1)),
            u || oe(l)),
          Ba(l),
          (u = l.type),
          (n = l.pendingProps),
          (i = t !== null ? t.memoizedProps : null),
          (a = n.children),
          sc(u, n) ? (a = null) : i !== null && sc(u, i) && (l.flags |= 32),
          l.memoizedState !== null && ((u = of(t, l, Jm, null, null, e)), (Au._currentValue = u)),
          zn(t, l),
          Zt(t, l, a, e),
          l.child
        );
      case 6:
        return (
          t === null &&
            it &&
            ((t = e = Tt) &&
              ((e = Ny(e, l.pendingProps, El)),
              e !== null ? ((l.stateNode = e), (Xt = l), (Tt = null), (t = !0)) : (t = !1)),
            t || oe(l)),
          null
        );
      case 13:
        return vs(t, l, e);
      case 4:
        return (
          $t(l, l.stateNode.containerInfo),
          (a = l.pendingProps),
          t === null ? (l.child = Ve(l, null, a, e)) : Zt(t, l, a, e),
          l.child
        );
      case 11:
        return fs(t, l, l.type, l.pendingProps, e);
      case 7:
        return (Zt(t, l, l.pendingProps, e), l.child);
      case 8:
        return (Zt(t, l, l.pendingProps.children, e), l.child);
      case 12:
        return (Zt(t, l, l.pendingProps.children, e), l.child);
      case 10:
        return ((a = l.pendingProps), se(l, l.type, a.value), Zt(t, l, a.children, e), l.child);
      case 9:
        return (
          (u = l.type._context),
          (a = l.pendingProps.children),
          Ge(l),
          (u = Qt(u)),
          (a = a(u)),
          (l.flags |= 1),
          Zt(t, l, a, e),
          l.child
        );
      case 14:
        return cs(t, l, l.type, l.pendingProps, e);
      case 15:
        return rs(t, l, l.type, l.pendingProps, e);
      case 19:
        return Ss(t, l, e);
      case 31:
        return ty(t, l, e);
      case 22:
        return os(t, l, e, l.pendingProps);
      case 24:
        return (
          Ge(l),
          (a = Qt(Ht)),
          t === null
            ? ((u = Pi()),
              u === null &&
                ((u = bt),
                (n = Fi()),
                (u.pooledCache = n),
                n.refCount++,
                n !== null && (u.pooledCacheLanes |= e),
                (u = n)),
              (l.memoizedState = { parent: a, cache: u }),
              lf(l),
              se(l, Ht, u))
            : ((t.lanes & e) !== 0 && (ef(t, l), uu(l, null, null, e), au()),
              (u = t.memoizedState),
              (n = l.memoizedState),
              u.parent !== a
                ? ((u = { parent: a, cache: a }),
                  (l.memoizedState = u),
                  l.lanes === 0 && (l.memoizedState = l.updateQueue.baseState = u),
                  se(l, Ht, a))
                : ((a = n.cache), se(l, Ht, a), a !== u.cache && ki(l, [Ht], e, !0))),
          Zt(t, l, l.pendingProps.children, e),
          l.child
        );
      case 29:
        throw l.pendingProps;
    }
    throw Error(c(156, l.tag));
  }
  function $l(t) {
    t.flags |= 4;
  }
  function Lf(t, l, e, a, u) {
    if (((l = (t.mode & 32) !== 0) && (l = !1), l)) {
      if (((t.flags |= 16777216), (u & 335544128) === u))
        if (t.stateNode.complete) t.flags |= 8192;
        else if (Js()) t.flags |= 8192;
        else throw ((Ze = cn), tf);
    } else t.flags &= -16777217;
  }
  function bs(t, l) {
    if (l.type !== 'stylesheet' || (l.state.loading & 4) !== 0) t.flags &= -16777217;
    else if (((t.flags |= 16777216), !Bd(l)))
      if (Js()) t.flags |= 8192;
      else throw ((Ze = cn), tf);
  }
  function Rn(t, l) {
    (l !== null && (t.flags |= 4),
      t.flags & 16384 && ((l = t.tag !== 22 ? Ic() : 536870912), (t.lanes |= l), (Aa |= l)));
  }
  function ou(t, l) {
    if (!it)
      switch (t.tailMode) {
        case 'hidden':
          l = t.tail;
          for (var e = null; l !== null; ) (l.alternate !== null && (e = l), (l = l.sibling));
          e === null ? (t.tail = null) : (e.sibling = null);
          break;
        case 'collapsed':
          e = t.tail;
          for (var a = null; e !== null; ) (e.alternate !== null && (a = e), (e = e.sibling));
          a === null
            ? l || t.tail === null
              ? (t.tail = null)
              : (t.tail.sibling = null)
            : (a.sibling = null);
      }
  }
  function zt(t) {
    var l = t.alternate !== null && t.alternate.child === t.child,
      e = 0,
      a = 0;
    if (l)
      for (var u = t.child; u !== null; )
        ((e |= u.lanes | u.childLanes),
          (a |= u.subtreeFlags & 65011712),
          (a |= u.flags & 65011712),
          (u.return = t),
          (u = u.sibling));
    else
      for (u = t.child; u !== null; )
        ((e |= u.lanes | u.childLanes),
          (a |= u.subtreeFlags),
          (a |= u.flags),
          (u.return = t),
          (u = u.sibling));
    return ((t.subtreeFlags |= a), (t.childLanes = e), l);
  }
  function ey(t, l, e) {
    var a = l.pendingProps;
    switch ((Ki(l), l.tag)) {
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return (zt(l), null);
      case 1:
        return (zt(l), null);
      case 3:
        return (
          (e = l.stateNode),
          (a = null),
          t !== null && (a = t.memoizedState.cache),
          l.memoizedState.cache !== a && (l.flags |= 2048),
          Vl(Ht),
          Dt(),
          e.pendingContext && ((e.context = e.pendingContext), (e.pendingContext = null)),
          (t === null || t.child === null) &&
            (sa(l)
              ? $l(l)
              : t === null ||
                (t.memoizedState.isDehydrated && (l.flags & 256) === 0) ||
                ((l.flags |= 1024), wi())),
          zt(l),
          null
        );
      case 26:
        var u = l.type,
          n = l.memoizedState;
        return (
          t === null
            ? ($l(l), n !== null ? (zt(l), bs(l, n)) : (zt(l), Lf(l, u, null, a, e)))
            : n
              ? n !== t.memoizedState
                ? ($l(l), zt(l), bs(l, n))
                : (zt(l), (l.flags &= -16777217))
              : ((t = t.memoizedProps), t !== a && $l(l), zt(l), Lf(l, u, t, a, e)),
          null
        );
      case 27:
        if ((Bu(l), (e = lt.current), (u = l.type), t !== null && l.stateNode != null))
          t.memoizedProps !== a && $l(l);
        else {
          if (!a) {
            if (l.stateNode === null) throw Error(c(166));
            return (zt(l), null);
          }
          ((t = X.current), sa(l) ? Ir(l) : ((t = Od(u, a, e)), (l.stateNode = t), $l(l)));
        }
        return (zt(l), null);
      case 5:
        if ((Bu(l), (u = l.type), t !== null && l.stateNode != null))
          t.memoizedProps !== a && $l(l);
        else {
          if (!a) {
            if (l.stateNode === null) throw Error(c(166));
            return (zt(l), null);
          }
          if (((n = X.current), sa(l))) Ir(l);
          else {
            var i = Gn(lt.current);
            switch (n) {
              case 1:
                n = i.createElementNS('http://www.w3.org/2000/svg', u);
                break;
              case 2:
                n = i.createElementNS('http://www.w3.org/1998/Math/MathML', u);
                break;
              default:
                switch (u) {
                  case 'svg':
                    n = i.createElementNS('http://www.w3.org/2000/svg', u);
                    break;
                  case 'math':
                    n = i.createElementNS('http://www.w3.org/1998/Math/MathML', u);
                    break;
                  case 'script':
                    ((n = i.createElement('div')),
                      (n.innerHTML = '<script><\/script>'),
                      (n = n.removeChild(n.firstChild)));
                    break;
                  case 'select':
                    ((n =
                      typeof a.is == 'string'
                        ? i.createElement('select', { is: a.is })
                        : i.createElement('select')),
                      a.multiple ? (n.multiple = !0) : a.size && (n.size = a.size));
                    break;
                  default:
                    n =
                      typeof a.is == 'string'
                        ? i.createElement(u, { is: a.is })
                        : i.createElement(u);
                }
            }
            ((n[Gt] = l), (n[kt] = a));
            t: for (i = l.child; i !== null; ) {
              if (i.tag === 5 || i.tag === 6) n.appendChild(i.stateNode);
              else if (i.tag !== 4 && i.tag !== 27 && i.child !== null) {
                ((i.child.return = i), (i = i.child));
                continue;
              }
              if (i === l) break t;
              for (; i.sibling === null; ) {
                if (i.return === null || i.return === l) break t;
                i = i.return;
              }
              ((i.sibling.return = i.return), (i = i.sibling));
            }
            l.stateNode = n;
            t: switch ((Vt(n, u, a), u)) {
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
            a && $l(l);
          }
        }
        return (zt(l), Lf(l, l.type, t === null ? null : t.memoizedProps, l.pendingProps, e), null);
      case 6:
        if (t && l.stateNode != null) t.memoizedProps !== a && $l(l);
        else {
          if (typeof a != 'string' && l.stateNode === null) throw Error(c(166));
          if (((t = lt.current), sa(l))) {
            if (((t = l.stateNode), (e = l.memoizedProps), (a = null), (u = Xt), u !== null))
              switch (u.tag) {
                case 27:
                case 5:
                  a = u.memoizedProps;
              }
            ((t[Gt] = l),
              (t = !!(
                t.nodeValue === e ||
                (a !== null && a.suppressHydrationWarning === !0) ||
                vd(t.nodeValue, e)
              )),
              t || oe(l, !0));
          } else ((t = Gn(t).createTextNode(a)), (t[Gt] = l), (l.stateNode = t));
        }
        return (zt(l), null);
      case 31:
        if (((e = l.memoizedState), t === null || t.memoizedState !== null)) {
          if (((a = sa(l)), e !== null)) {
            if (t === null) {
              if (!a) throw Error(c(318));
              if (((t = l.memoizedState), (t = t !== null ? t.dehydrated : null), !t))
                throw Error(c(557));
              t[Gt] = l;
            } else (Le(), (l.flags & 128) === 0 && (l.memoizedState = null), (l.flags |= 4));
            (zt(l), (t = !1));
          } else
            ((e = wi()),
              t !== null && t.memoizedState !== null && (t.memoizedState.hydrationErrors = e),
              (t = !0));
          if (!t) return l.flags & 256 ? (rl(l), l) : (rl(l), null);
          if ((l.flags & 128) !== 0) throw Error(c(558));
        }
        return (zt(l), null);
      case 13:
        if (
          ((a = l.memoizedState),
          t === null || (t.memoizedState !== null && t.memoizedState.dehydrated !== null))
        ) {
          if (((u = sa(l)), a !== null && a.dehydrated !== null)) {
            if (t === null) {
              if (!u) throw Error(c(318));
              if (((u = l.memoizedState), (u = u !== null ? u.dehydrated : null), !u))
                throw Error(c(317));
              u[Gt] = l;
            } else (Le(), (l.flags & 128) === 0 && (l.memoizedState = null), (l.flags |= 4));
            (zt(l), (u = !1));
          } else
            ((u = wi()),
              t !== null && t.memoizedState !== null && (t.memoizedState.hydrationErrors = u),
              (u = !0));
          if (!u) return l.flags & 256 ? (rl(l), l) : (rl(l), null);
        }
        return (
          rl(l),
          (l.flags & 128) !== 0
            ? ((l.lanes = e), l)
            : ((e = a !== null),
              (t = t !== null && t.memoizedState !== null),
              e &&
                ((a = l.child),
                (u = null),
                a.alternate !== null &&
                  a.alternate.memoizedState !== null &&
                  a.alternate.memoizedState.cachePool !== null &&
                  (u = a.alternate.memoizedState.cachePool.pool),
                (n = null),
                a.memoizedState !== null &&
                  a.memoizedState.cachePool !== null &&
                  (n = a.memoizedState.cachePool.pool),
                n !== u && (a.flags |= 2048)),
              e !== t && e && (l.child.flags |= 8192),
              Rn(l, l.updateQueue),
              zt(l),
              null)
        );
      case 4:
        return (Dt(), t === null && ic(l.stateNode.containerInfo), zt(l), null);
      case 10:
        return (Vl(l.type), zt(l), null);
      case 19:
        if ((H(Ut), (a = l.memoizedState), a === null)) return (zt(l), null);
        if (((u = (l.flags & 128) !== 0), (n = a.rendering), n === null))
          if (u) ou(a, !1);
          else {
            if (Ot !== 0 || (t !== null && (t.flags & 128) !== 0))
              for (t = l.child; t !== null; ) {
                if (((n = dn(t)), n !== null)) {
                  for (
                    l.flags |= 128,
                      ou(a, !1),
                      t = n.updateQueue,
                      l.updateQueue = t,
                      Rn(l, t),
                      l.subtreeFlags = 0,
                      t = e,
                      e = l.child;
                    e !== null;
                  )
                    (wr(e, t), (e = e.sibling));
                  return (q(Ut, (Ut.current & 1) | 2), it && Ql(l, a.treeForkCount), l.child);
                }
                t = t.sibling;
              }
            a.tail !== null &&
              al() > Un &&
              ((l.flags |= 128), (u = !0), ou(a, !1), (l.lanes = 4194304));
          }
        else {
          if (!u)
            if (((t = dn(n)), t !== null)) {
              if (
                ((l.flags |= 128),
                (u = !0),
                (t = t.updateQueue),
                (l.updateQueue = t),
                Rn(l, t),
                ou(a, !0),
                a.tail === null && a.tailMode === 'hidden' && !n.alternate && !it)
              )
                return (zt(l), null);
            } else
              2 * al() - a.renderingStartTime > Un &&
                e !== 536870912 &&
                ((l.flags |= 128), (u = !0), ou(a, !1), (l.lanes = 4194304));
          a.isBackwards
            ? ((n.sibling = l.child), (l.child = n))
            : ((t = a.last), t !== null ? (t.sibling = n) : (l.child = n), (a.last = n));
        }
        return a.tail !== null
          ? ((t = a.tail),
            (a.rendering = t),
            (a.tail = t.sibling),
            (a.renderingStartTime = al()),
            (t.sibling = null),
            (e = Ut.current),
            q(Ut, u ? (e & 1) | 2 : e & 1),
            it && Ql(l, a.treeForkCount),
            t)
          : (zt(l), null);
      case 22:
      case 23:
        return (
          rl(l),
          ff(),
          (a = l.memoizedState !== null),
          t !== null
            ? (t.memoizedState !== null) !== a && (l.flags |= 8192)
            : a && (l.flags |= 8192),
          a
            ? (e & 536870912) !== 0 &&
              (l.flags & 128) === 0 &&
              (zt(l), l.subtreeFlags & 6 && (l.flags |= 8192))
            : zt(l),
          (e = l.updateQueue),
          e !== null && Rn(l, e.retryQueue),
          (e = null),
          t !== null &&
            t.memoizedState !== null &&
            t.memoizedState.cachePool !== null &&
            (e = t.memoizedState.cachePool.pool),
          (a = null),
          l.memoizedState !== null &&
            l.memoizedState.cachePool !== null &&
            (a = l.memoizedState.cachePool.pool),
          a !== e && (l.flags |= 2048),
          t !== null && H(Xe),
          null
        );
      case 24:
        return (
          (e = null),
          t !== null && (e = t.memoizedState.cache),
          l.memoizedState.cache !== e && (l.flags |= 2048),
          Vl(Ht),
          zt(l),
          null
        );
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(c(156, l.tag));
  }
  function ay(t, l) {
    switch ((Ki(l), l.tag)) {
      case 1:
        return ((t = l.flags), t & 65536 ? ((l.flags = (t & -65537) | 128), l) : null);
      case 3:
        return (
          Vl(Ht),
          Dt(),
          (t = l.flags),
          (t & 65536) !== 0 && (t & 128) === 0 ? ((l.flags = (t & -65537) | 128), l) : null
        );
      case 26:
      case 27:
      case 5:
        return (Bu(l), null);
      case 31:
        if (l.memoizedState !== null) {
          if ((rl(l), l.alternate === null)) throw Error(c(340));
          Le();
        }
        return ((t = l.flags), t & 65536 ? ((l.flags = (t & -65537) | 128), l) : null);
      case 13:
        if ((rl(l), (t = l.memoizedState), t !== null && t.dehydrated !== null)) {
          if (l.alternate === null) throw Error(c(340));
          Le();
        }
        return ((t = l.flags), t & 65536 ? ((l.flags = (t & -65537) | 128), l) : null);
      case 19:
        return (H(Ut), null);
      case 4:
        return (Dt(), null);
      case 10:
        return (Vl(l.type), null);
      case 22:
      case 23:
        return (
          rl(l),
          ff(),
          t !== null && H(Xe),
          (t = l.flags),
          t & 65536 ? ((l.flags = (t & -65537) | 128), l) : null
        );
      case 24:
        return (Vl(Ht), null);
      case 25:
        return null;
      default:
        return null;
    }
  }
  function Es(t, l) {
    switch ((Ki(l), l.tag)) {
      case 3:
        (Vl(Ht), Dt());
        break;
      case 26:
      case 27:
      case 5:
        Bu(l);
        break;
      case 4:
        Dt();
        break;
      case 31:
        l.memoizedState !== null && rl(l);
        break;
      case 13:
        rl(l);
        break;
      case 19:
        H(Ut);
        break;
      case 10:
        Vl(l.type);
        break;
      case 22:
      case 23:
        (rl(l), ff(), t !== null && H(Xe));
        break;
      case 24:
        Vl(Ht);
    }
  }
  function su(t, l) {
    try {
      var e = l.updateQueue,
        a = e !== null ? e.lastEffect : null;
      if (a !== null) {
        var u = a.next;
        e = u;
        do {
          if ((e.tag & t) === t) {
            a = void 0;
            var n = e.create,
              i = e.inst;
            ((a = n()), (i.destroy = a));
          }
          e = e.next;
        } while (e !== u);
      }
    } catch (r) {
      ht(l, l.return, r);
    }
  }
  function ge(t, l, e) {
    try {
      var a = l.updateQueue,
        u = a !== null ? a.lastEffect : null;
      if (u !== null) {
        var n = u.next;
        a = n;
        do {
          if ((a.tag & t) === t) {
            var i = a.inst,
              r = i.destroy;
            if (r !== void 0) {
              ((i.destroy = void 0), (u = l));
              var h = e,
                T = r;
              try {
                T();
              } catch (_) {
                ht(u, h, _);
              }
            }
          }
          a = a.next;
        } while (a !== n);
      }
    } catch (_) {
      ht(l, l.return, _);
    }
  }
  function Ts(t) {
    var l = t.updateQueue;
    if (l !== null) {
      var e = t.stateNode;
      try {
        so(l, e);
      } catch (a) {
        ht(t, t.return, a);
      }
    }
  }
  function zs(t, l, e) {
    ((e.props = Je(t.type, t.memoizedProps)), (e.state = t.memoizedState));
    try {
      e.componentWillUnmount();
    } catch (a) {
      ht(t, l, a);
    }
  }
  function du(t, l) {
    try {
      var e = t.ref;
      if (e !== null) {
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
        typeof e == 'function' ? (t.refCleanup = e(a)) : (e.current = a);
      }
    } catch (u) {
      ht(t, l, u);
    }
  }
  function Bl(t, l) {
    var e = t.ref,
      a = t.refCleanup;
    if (e !== null)
      if (typeof a == 'function')
        try {
          a();
        } catch (u) {
          ht(t, l, u);
        } finally {
          ((t.refCleanup = null), (t = t.alternate), t != null && (t.refCleanup = null));
        }
      else if (typeof e == 'function')
        try {
          e(null);
        } catch (u) {
          ht(t, l, u);
        }
      else e.current = null;
  }
  function As(t) {
    var l = t.type,
      e = t.memoizedProps,
      a = t.stateNode;
    try {
      t: switch (l) {
        case 'button':
        case 'input':
        case 'select':
        case 'textarea':
          e.autoFocus && a.focus();
          break t;
        case 'img':
          e.src ? (a.src = e.src) : e.srcSet && (a.srcset = e.srcSet);
      }
    } catch (u) {
      ht(t, t.return, u);
    }
  }
  function jf(t, l, e) {
    try {
      var a = t.stateNode;
      (Ry(a, t.type, e, l), (a[kt] = l));
    } catch (u) {
      ht(t, t.return, u);
    }
  }
  function Rs(t) {
    return (
      t.tag === 5 || t.tag === 3 || t.tag === 26 || (t.tag === 27 && Ae(t.type)) || t.tag === 4
    );
  }
  function Gf(t) {
    t: for (;;) {
      for (; t.sibling === null; ) {
        if (t.return === null || Rs(t.return)) return null;
        t = t.return;
      }
      for (
        t.sibling.return = t.return, t = t.sibling;
        t.tag !== 5 && t.tag !== 6 && t.tag !== 18;
      ) {
        if ((t.tag === 27 && Ae(t.type)) || t.flags & 2 || t.child === null || t.tag === 4)
          continue t;
        ((t.child.return = t), (t = t.child));
      }
      if (!(t.flags & 2)) return t.stateNode;
    }
  }
  function Xf(t, l, e) {
    var a = t.tag;
    if (a === 5 || a === 6)
      ((t = t.stateNode),
        l
          ? (e.nodeType === 9
              ? e.body
              : e.nodeName === 'HTML'
                ? e.ownerDocument.body
                : e
            ).insertBefore(t, l)
          : ((l = e.nodeType === 9 ? e.body : e.nodeName === 'HTML' ? e.ownerDocument.body : e),
            l.appendChild(t),
            (e = e._reactRootContainer),
            e != null || l.onclick !== null || (l.onclick = jl)));
    else if (
      a !== 4 &&
      (a === 27 && Ae(t.type) && ((e = t.stateNode), (l = null)), (t = t.child), t !== null)
    )
      for (Xf(t, l, e), t = t.sibling; t !== null; ) (Xf(t, l, e), (t = t.sibling));
  }
  function _n(t, l, e) {
    var a = t.tag;
    if (a === 5 || a === 6) ((t = t.stateNode), l ? e.insertBefore(t, l) : e.appendChild(t));
    else if (a !== 4 && (a === 27 && Ae(t.type) && (e = t.stateNode), (t = t.child), t !== null))
      for (_n(t, l, e), t = t.sibling; t !== null; ) (_n(t, l, e), (t = t.sibling));
  }
  function _s(t) {
    var l = t.stateNode,
      e = t.memoizedProps;
    try {
      for (var a = t.type, u = l.attributes; u.length; ) l.removeAttributeNode(u[0]);
      (Vt(l, a, e), (l[Gt] = t), (l[kt] = e));
    } catch (n) {
      ht(t, t.return, n);
    }
  }
  var Wl = !1,
    qt = !1,
    Qf = !1,
    Os = typeof WeakSet == 'function' ? WeakSet : Set,
    jt = null;
  function uy(t, l) {
    if (((t = t.containerInfo), (rc = wn), (t = Lr(t)), xi(t))) {
      if ('selectionStart' in t) var e = { start: t.selectionStart, end: t.selectionEnd };
      else
        t: {
          e = ((e = t.ownerDocument) && e.defaultView) || window;
          var a = e.getSelection && e.getSelection();
          if (a && a.rangeCount !== 0) {
            e = a.anchorNode;
            var u = a.anchorOffset,
              n = a.focusNode;
            a = a.focusOffset;
            try {
              (e.nodeType, n.nodeType);
            } catch {
              e = null;
              break t;
            }
            var i = 0,
              r = -1,
              h = -1,
              T = 0,
              _ = 0,
              N = t,
              z = null;
            l: for (;;) {
              for (
                var R;
                N !== e || (u !== 0 && N.nodeType !== 3) || (r = i + u),
                  N !== n || (a !== 0 && N.nodeType !== 3) || (h = i + a),
                  N.nodeType === 3 && (i += N.nodeValue.length),
                  (R = N.firstChild) !== null;
              )
                ((z = N), (N = R));
              for (;;) {
                if (N === t) break l;
                if (
                  (z === e && ++T === u && (r = i),
                  z === n && ++_ === a && (h = i),
                  (R = N.nextSibling) !== null)
                )
                  break;
                ((N = z), (z = N.parentNode));
              }
              N = R;
            }
            e = r === -1 || h === -1 ? null : { start: r, end: h };
          } else e = null;
        }
      e = e || { start: 0, end: 0 };
    } else e = null;
    for (oc = { focusedElem: t, selectionRange: e }, wn = !1, jt = l; jt !== null; )
      if (((l = jt), (t = l.child), (l.subtreeFlags & 1028) !== 0 && t !== null))
        ((t.return = l), (jt = t));
      else
        for (; jt !== null; ) {
          switch (((l = jt), (n = l.alternate), (t = l.flags), l.tag)) {
            case 0:
              if (
                (t & 4) !== 0 &&
                ((t = l.updateQueue), (t = t !== null ? t.events : null), t !== null)
              )
                for (e = 0; e < t.length; e++) ((u = t[e]), (u.ref.impl = u.nextImpl));
              break;
            case 11:
            case 15:
              break;
            case 1:
              if ((t & 1024) !== 0 && n !== null) {
                ((t = void 0),
                  (e = l),
                  (u = n.memoizedProps),
                  (n = n.memoizedState),
                  (a = e.stateNode));
                try {
                  var L = Je(e.type, u);
                  ((t = a.getSnapshotBeforeUpdate(L, n)),
                    (a.__reactInternalSnapshotBeforeUpdate = t));
                } catch (J) {
                  ht(e, e.return, J);
                }
              }
              break;
            case 3:
              if ((t & 1024) !== 0) {
                if (((t = l.stateNode.containerInfo), (e = t.nodeType), e === 9)) hc(t);
                else if (e === 1)
                  switch (t.nodeName) {
                    case 'HEAD':
                    case 'HTML':
                    case 'BODY':
                      hc(t);
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
              if ((t & 1024) !== 0) throw Error(c(163));
          }
          if (((t = l.sibling), t !== null)) {
            ((t.return = l.return), (jt = t));
            break;
          }
          jt = l.return;
        }
  }
  function Ms(t, l, e) {
    var a = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        (Fl(t, e), a & 4 && su(5, e));
        break;
      case 1:
        if ((Fl(t, e), a & 4))
          if (((t = e.stateNode), l === null))
            try {
              t.componentDidMount();
            } catch (i) {
              ht(e, e.return, i);
            }
          else {
            var u = Je(e.type, l.memoizedProps);
            l = l.memoizedState;
            try {
              t.componentDidUpdate(u, l, t.__reactInternalSnapshotBeforeUpdate);
            } catch (i) {
              ht(e, e.return, i);
            }
          }
        (a & 64 && Ts(e), a & 512 && du(e, e.return));
        break;
      case 3:
        if ((Fl(t, e), a & 64 && ((t = e.updateQueue), t !== null))) {
          if (((l = null), e.child !== null))
            switch (e.child.tag) {
              case 27:
              case 5:
                l = e.child.stateNode;
                break;
              case 1:
                l = e.child.stateNode;
            }
          try {
            so(t, l);
          } catch (i) {
            ht(e, e.return, i);
          }
        }
        break;
      case 27:
        l === null && a & 4 && _s(e);
      case 26:
      case 5:
        (Fl(t, e), l === null && a & 4 && As(e), a & 512 && du(e, e.return));
        break;
      case 12:
        Fl(t, e);
        break;
      case 31:
        (Fl(t, e), a & 4 && Cs(t, e));
        break;
      case 13:
        (Fl(t, e),
          a & 4 && Ns(t, e),
          a & 64 &&
            ((t = e.memoizedState),
            t !== null && ((t = t.dehydrated), t !== null && ((e = hy.bind(null, e)), Hy(t, e)))));
        break;
      case 22:
        if (((a = e.memoizedState !== null || Wl), !a)) {
          ((l = (l !== null && l.memoizedState !== null) || qt), (u = Wl));
          var n = qt;
          ((Wl = a),
            (qt = l) && !n ? Il(t, e, (e.subtreeFlags & 8772) !== 0) : Fl(t, e),
            (Wl = u),
            (qt = n));
        }
        break;
      case 30:
        break;
      default:
        Fl(t, e);
    }
  }
  function Ds(t) {
    var l = t.alternate;
    (l !== null && ((t.alternate = null), Ds(l)),
      (t.child = null),
      (t.deletions = null),
      (t.sibling = null),
      t.tag === 5 && ((l = t.stateNode), l !== null && gi(l)),
      (t.stateNode = null),
      (t.return = null),
      (t.dependencies = null),
      (t.memoizedProps = null),
      (t.memoizedState = null),
      (t.pendingProps = null),
      (t.stateNode = null),
      (t.updateQueue = null));
  }
  var At = null,
    It = !1;
  function kl(t, l, e) {
    for (e = e.child; e !== null; ) (Us(t, l, e), (e = e.sibling));
  }
  function Us(t, l, e) {
    if (ul && typeof ul.onCommitFiberUnmount == 'function')
      try {
        ul.onCommitFiberUnmount(qa, e);
      } catch {}
    switch (e.tag) {
      case 26:
        (qt || Bl(e, l),
          kl(t, l, e),
          e.memoizedState
            ? e.memoizedState.count--
            : e.stateNode && ((e = e.stateNode), e.parentNode.removeChild(e)));
        break;
      case 27:
        qt || Bl(e, l);
        var a = At,
          u = It;
        (Ae(e.type) && ((At = e.stateNode), (It = !1)),
          kl(t, l, e),
          Eu(e.stateNode),
          (At = a),
          (It = u));
        break;
      case 5:
        qt || Bl(e, l);
      case 6:
        if (((a = At), (u = It), (At = null), kl(t, l, e), (At = a), (It = u), At !== null))
          if (It)
            try {
              (At.nodeType === 9
                ? At.body
                : At.nodeName === 'HTML'
                  ? At.ownerDocument.body
                  : At
              ).removeChild(e.stateNode);
            } catch (n) {
              ht(e, l, n);
            }
          else
            try {
              At.removeChild(e.stateNode);
            } catch (n) {
              ht(e, l, n);
            }
        break;
      case 18:
        At !== null &&
          (It
            ? ((t = At),
              Td(
                t.nodeType === 9 ? t.body : t.nodeName === 'HTML' ? t.ownerDocument.body : t,
                e.stateNode
              ),
              Na(t))
            : Td(At, e.stateNode));
        break;
      case 4:
        ((a = At),
          (u = It),
          (At = e.stateNode.containerInfo),
          (It = !0),
          kl(t, l, e),
          (At = a),
          (It = u));
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        (ge(2, e, l), qt || ge(4, e, l), kl(t, l, e));
        break;
      case 1:
        (qt ||
          (Bl(e, l), (a = e.stateNode), typeof a.componentWillUnmount == 'function' && zs(e, l, a)),
          kl(t, l, e));
        break;
      case 21:
        kl(t, l, e);
        break;
      case 22:
        ((qt = (a = qt) || e.memoizedState !== null), kl(t, l, e), (qt = a));
        break;
      default:
        kl(t, l, e);
    }
  }
  function Cs(t, l) {
    if (
      l.memoizedState === null &&
      ((t = l.alternate), t !== null && ((t = t.memoizedState), t !== null))
    ) {
      t = t.dehydrated;
      try {
        Na(t);
      } catch (e) {
        ht(l, l.return, e);
      }
    }
  }
  function Ns(t, l) {
    if (
      l.memoizedState === null &&
      ((t = l.alternate),
      t !== null && ((t = t.memoizedState), t !== null && ((t = t.dehydrated), t !== null)))
    )
      try {
        Na(t);
      } catch (e) {
        ht(l, l.return, e);
      }
  }
  function ny(t) {
    switch (t.tag) {
      case 31:
      case 13:
      case 19:
        var l = t.stateNode;
        return (l === null && (l = t.stateNode = new Os()), l);
      case 22:
        return (
          (t = t.stateNode),
          (l = t._retryCache),
          l === null && (l = t._retryCache = new Os()),
          l
        );
      default:
        throw Error(c(435, t.tag));
    }
  }
  function On(t, l) {
    var e = ny(t);
    l.forEach(function (a) {
      if (!e.has(a)) {
        e.add(a);
        var u = my.bind(null, t, a);
        a.then(u, u);
      }
    });
  }
  function Pt(t, l) {
    var e = l.deletions;
    if (e !== null)
      for (var a = 0; a < e.length; a++) {
        var u = e[a],
          n = t,
          i = l,
          r = i;
        t: for (; r !== null; ) {
          switch (r.tag) {
            case 27:
              if (Ae(r.type)) {
                ((At = r.stateNode), (It = !1));
                break t;
              }
              break;
            case 5:
              ((At = r.stateNode), (It = !1));
              break t;
            case 3:
            case 4:
              ((At = r.stateNode.containerInfo), (It = !0));
              break t;
          }
          r = r.return;
        }
        if (At === null) throw Error(c(160));
        (Us(n, i, u),
          (At = null),
          (It = !1),
          (n = u.alternate),
          n !== null && (n.return = null),
          (u.return = null));
      }
    if (l.subtreeFlags & 13886) for (l = l.child; l !== null; ) (Hs(l, t), (l = l.sibling));
  }
  var Ol = null;
  function Hs(t, l) {
    var e = t.alternate,
      a = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        (Pt(l, t), tl(t), a & 4 && (ge(3, t, t.return), su(3, t), ge(5, t, t.return)));
        break;
      case 1:
        (Pt(l, t),
          tl(t),
          a & 512 && (qt || e === null || Bl(e, e.return)),
          a & 64 &&
            Wl &&
            ((t = t.updateQueue),
            t !== null &&
              ((a = t.callbacks),
              a !== null &&
                ((e = t.shared.hiddenCallbacks),
                (t.shared.hiddenCallbacks = e === null ? a : e.concat(a))))));
        break;
      case 26:
        var u = Ol;
        if ((Pt(l, t), tl(t), a & 512 && (qt || e === null || Bl(e, e.return)), a & 4)) {
          var n = e !== null ? e.memoizedState : null;
          if (((a = t.memoizedState), e === null))
            if (a === null)
              if (t.stateNode === null) {
                t: {
                  ((a = t.type), (e = t.memoizedProps), (u = u.ownerDocument || u));
                  l: switch (a) {
                    case 'title':
                      ((n = u.getElementsByTagName('title')[0]),
                        (!n ||
                          n[ja] ||
                          n[Gt] ||
                          n.namespaceURI === 'http://www.w3.org/2000/svg' ||
                          n.hasAttribute('itemprop')) &&
                          ((n = u.createElement(a)),
                          u.head.insertBefore(n, u.querySelector('head > title'))),
                        Vt(n, a, e),
                        (n[Gt] = t),
                        Lt(n),
                        (a = n));
                      break t;
                    case 'link':
                      var i = Hd('link', 'href', u).get(a + (e.href || ''));
                      if (i) {
                        for (var r = 0; r < i.length; r++)
                          if (
                            ((n = i[r]),
                            n.getAttribute('href') ===
                              (e.href == null || e.href === '' ? null : e.href) &&
                              n.getAttribute('rel') === (e.rel == null ? null : e.rel) &&
                              n.getAttribute('title') === (e.title == null ? null : e.title) &&
                              n.getAttribute('crossorigin') ===
                                (e.crossOrigin == null ? null : e.crossOrigin))
                          ) {
                            i.splice(r, 1);
                            break l;
                          }
                      }
                      ((n = u.createElement(a)), Vt(n, a, e), u.head.appendChild(n));
                      break;
                    case 'meta':
                      if ((i = Hd('meta', 'content', u).get(a + (e.content || '')))) {
                        for (r = 0; r < i.length; r++)
                          if (
                            ((n = i[r]),
                            n.getAttribute('content') ===
                              (e.content == null ? null : '' + e.content) &&
                              n.getAttribute('name') === (e.name == null ? null : e.name) &&
                              n.getAttribute('property') ===
                                (e.property == null ? null : e.property) &&
                              n.getAttribute('http-equiv') ===
                                (e.httpEquiv == null ? null : e.httpEquiv) &&
                              n.getAttribute('charset') === (e.charSet == null ? null : e.charSet))
                          ) {
                            i.splice(r, 1);
                            break l;
                          }
                      }
                      ((n = u.createElement(a)), Vt(n, a, e), u.head.appendChild(n));
                      break;
                    default:
                      throw Error(c(468, a));
                  }
                  ((n[Gt] = t), Lt(n), (a = n));
                }
                t.stateNode = a;
              } else xd(u, t.type, t.stateNode);
            else t.stateNode = Nd(u, a, t.memoizedProps);
          else
            n !== a
              ? (n === null
                  ? e.stateNode !== null && ((e = e.stateNode), e.parentNode.removeChild(e))
                  : n.count--,
                a === null ? xd(u, t.type, t.stateNode) : Nd(u, a, t.memoizedProps))
              : a === null && t.stateNode !== null && jf(t, t.memoizedProps, e.memoizedProps);
        }
        break;
      case 27:
        (Pt(l, t),
          tl(t),
          a & 512 && (qt || e === null || Bl(e, e.return)),
          e !== null && a & 4 && jf(t, t.memoizedProps, e.memoizedProps));
        break;
      case 5:
        if ((Pt(l, t), tl(t), a & 512 && (qt || e === null || Bl(e, e.return)), t.flags & 32)) {
          u = t.stateNode;
          try {
            la(u, '');
          } catch (L) {
            ht(t, t.return, L);
          }
        }
        (a & 4 &&
          t.stateNode != null &&
          ((u = t.memoizedProps), jf(t, u, e !== null ? e.memoizedProps : u)),
          a & 1024 && (Qf = !0));
        break;
      case 6:
        if ((Pt(l, t), tl(t), a & 4)) {
          if (t.stateNode === null) throw Error(c(162));
          ((a = t.memoizedProps), (e = t.stateNode));
          try {
            e.nodeValue = a;
          } catch (L) {
            ht(t, t.return, L);
          }
        }
        break;
      case 3:
        if (
          ((Zn = null),
          (u = Ol),
          (Ol = Xn(l.containerInfo)),
          Pt(l, t),
          (Ol = u),
          tl(t),
          a & 4 && e !== null && e.memoizedState.isDehydrated)
        )
          try {
            Na(l.containerInfo);
          } catch (L) {
            ht(t, t.return, L);
          }
        Qf && ((Qf = !1), xs(t));
        break;
      case 4:
        ((a = Ol), (Ol = Xn(t.stateNode.containerInfo)), Pt(l, t), tl(t), (Ol = a));
        break;
      case 12:
        (Pt(l, t), tl(t));
        break;
      case 31:
        (Pt(l, t),
          tl(t),
          a & 4 && ((a = t.updateQueue), a !== null && ((t.updateQueue = null), On(t, a))));
        break;
      case 13:
        (Pt(l, t),
          tl(t),
          t.child.flags & 8192 &&
            (t.memoizedState !== null) != (e !== null && e.memoizedState !== null) &&
            (Dn = al()),
          a & 4 && ((a = t.updateQueue), a !== null && ((t.updateQueue = null), On(t, a))));
        break;
      case 22:
        u = t.memoizedState !== null;
        var h = e !== null && e.memoizedState !== null,
          T = Wl,
          _ = qt;
        if (((Wl = T || u), (qt = _ || h), Pt(l, t), (qt = _), (Wl = T), tl(t), a & 8192))
          t: for (
            l = t.stateNode,
              l._visibility = u ? l._visibility & -2 : l._visibility | 1,
              u && (e === null || h || Wl || qt || we(t)),
              e = null,
              l = t;
            ;
          ) {
            if (l.tag === 5 || l.tag === 26) {
              if (e === null) {
                h = e = l;
                try {
                  if (((n = h.stateNode), u))
                    ((i = n.style),
                      typeof i.setProperty == 'function'
                        ? i.setProperty('display', 'none', 'important')
                        : (i.display = 'none'));
                  else {
                    r = h.stateNode;
                    var N = h.memoizedProps.style,
                      z = N != null && N.hasOwnProperty('display') ? N.display : null;
                    r.style.display = z == null || typeof z == 'boolean' ? '' : ('' + z).trim();
                  }
                } catch (L) {
                  ht(h, h.return, L);
                }
              }
            } else if (l.tag === 6) {
              if (e === null) {
                h = l;
                try {
                  h.stateNode.nodeValue = u ? '' : h.memoizedProps;
                } catch (L) {
                  ht(h, h.return, L);
                }
              }
            } else if (l.tag === 18) {
              if (e === null) {
                h = l;
                try {
                  var R = h.stateNode;
                  u ? zd(R, !0) : zd(h.stateNode, !1);
                } catch (L) {
                  ht(h, h.return, L);
                }
              }
            } else if (
              ((l.tag !== 22 && l.tag !== 23) || l.memoizedState === null || l === t) &&
              l.child !== null
            ) {
              ((l.child.return = l), (l = l.child));
              continue;
            }
            if (l === t) break t;
            for (; l.sibling === null; ) {
              if (l.return === null || l.return === t) break t;
              (e === l && (e = null), (l = l.return));
            }
            (e === l && (e = null), (l.sibling.return = l.return), (l = l.sibling));
          }
        a & 4 &&
          ((a = t.updateQueue),
          a !== null && ((e = a.retryQueue), e !== null && ((a.retryQueue = null), On(t, e))));
        break;
      case 19:
        (Pt(l, t),
          tl(t),
          a & 4 && ((a = t.updateQueue), a !== null && ((t.updateQueue = null), On(t, a))));
        break;
      case 30:
        break;
      case 21:
        break;
      default:
        (Pt(l, t), tl(t));
    }
  }
  function tl(t) {
    var l = t.flags;
    if (l & 2) {
      try {
        for (var e, a = t.return; a !== null; ) {
          if (Rs(a)) {
            e = a;
            break;
          }
          a = a.return;
        }
        if (e == null) throw Error(c(160));
        switch (e.tag) {
          case 27:
            var u = e.stateNode,
              n = Gf(t);
            _n(t, n, u);
            break;
          case 5:
            var i = e.stateNode;
            e.flags & 32 && (la(i, ''), (e.flags &= -33));
            var r = Gf(t);
            _n(t, r, i);
            break;
          case 3:
          case 4:
            var h = e.stateNode.containerInfo,
              T = Gf(t);
            Xf(t, T, h);
            break;
          default:
            throw Error(c(161));
        }
      } catch (_) {
        ht(t, t.return, _);
      }
      t.flags &= -3;
    }
    l & 4096 && (t.flags &= -4097);
  }
  function xs(t) {
    if (t.subtreeFlags & 1024)
      for (t = t.child; t !== null; ) {
        var l = t;
        (xs(l), l.tag === 5 && l.flags & 1024 && l.stateNode.reset(), (t = t.sibling));
      }
  }
  function Fl(t, l) {
    if (l.subtreeFlags & 8772)
      for (l = l.child; l !== null; ) (Ms(t, l.alternate, l), (l = l.sibling));
  }
  function we(t) {
    for (t = t.child; t !== null; ) {
      var l = t;
      switch (l.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          (ge(4, l, l.return), we(l));
          break;
        case 1:
          Bl(l, l.return);
          var e = l.stateNode;
          (typeof e.componentWillUnmount == 'function' && zs(l, l.return, e), we(l));
          break;
        case 27:
          Eu(l.stateNode);
        case 26:
        case 5:
          (Bl(l, l.return), we(l));
          break;
        case 22:
          l.memoizedState === null && we(l);
          break;
        case 30:
          we(l);
          break;
        default:
          we(l);
      }
      t = t.sibling;
    }
  }
  function Il(t, l, e) {
    for (e = e && (l.subtreeFlags & 8772) !== 0, l = l.child; l !== null; ) {
      var a = l.alternate,
        u = t,
        n = l,
        i = n.flags;
      switch (n.tag) {
        case 0:
        case 11:
        case 15:
          (Il(u, n, e), su(4, n));
          break;
        case 1:
          if ((Il(u, n, e), (a = n), (u = a.stateNode), typeof u.componentDidMount == 'function'))
            try {
              u.componentDidMount();
            } catch (T) {
              ht(a, a.return, T);
            }
          if (((a = n), (u = a.updateQueue), u !== null)) {
            var r = a.stateNode;
            try {
              var h = u.shared.hiddenCallbacks;
              if (h !== null)
                for (u.shared.hiddenCallbacks = null, u = 0; u < h.length; u++) oo(h[u], r);
            } catch (T) {
              ht(a, a.return, T);
            }
          }
          (e && i & 64 && Ts(n), du(n, n.return));
          break;
        case 27:
          _s(n);
        case 26:
        case 5:
          (Il(u, n, e), e && a === null && i & 4 && As(n), du(n, n.return));
          break;
        case 12:
          Il(u, n, e);
          break;
        case 31:
          (Il(u, n, e), e && i & 4 && Cs(u, n));
          break;
        case 13:
          (Il(u, n, e), e && i & 4 && Ns(u, n));
          break;
        case 22:
          (n.memoizedState === null && Il(u, n, e), du(n, n.return));
          break;
        case 30:
          break;
        default:
          Il(u, n, e);
      }
      l = l.sibling;
    }
  }
  function Zf(t, l) {
    var e = null;
    (t !== null &&
      t.memoizedState !== null &&
      t.memoizedState.cachePool !== null &&
      (e = t.memoizedState.cachePool.pool),
      (t = null),
      l.memoizedState !== null &&
        l.memoizedState.cachePool !== null &&
        (t = l.memoizedState.cachePool.pool),
      t !== e && (t != null && t.refCount++, e != null && Ia(e)));
  }
  function Vf(t, l) {
    ((t = null),
      l.alternate !== null && (t = l.alternate.memoizedState.cache),
      (l = l.memoizedState.cache),
      l !== t && (l.refCount++, t != null && Ia(t)));
  }
  function Ml(t, l, e, a) {
    if (l.subtreeFlags & 10256) for (l = l.child; l !== null; ) (Bs(t, l, e, a), (l = l.sibling));
  }
  function Bs(t, l, e, a) {
    var u = l.flags;
    switch (l.tag) {
      case 0:
      case 11:
      case 15:
        (Ml(t, l, e, a), u & 2048 && su(9, l));
        break;
      case 1:
        Ml(t, l, e, a);
        break;
      case 3:
        (Ml(t, l, e, a),
          u & 2048 &&
            ((t = null),
            l.alternate !== null && (t = l.alternate.memoizedState.cache),
            (l = l.memoizedState.cache),
            l !== t && (l.refCount++, t != null && Ia(t))));
        break;
      case 12:
        if (u & 2048) {
          (Ml(t, l, e, a), (t = l.stateNode));
          try {
            var n = l.memoizedProps,
              i = n.id,
              r = n.onPostCommit;
            typeof r == 'function' &&
              r(i, l.alternate === null ? 'mount' : 'update', t.passiveEffectDuration, -0);
          } catch (h) {
            ht(l, l.return, h);
          }
        } else Ml(t, l, e, a);
        break;
      case 31:
        Ml(t, l, e, a);
        break;
      case 13:
        Ml(t, l, e, a);
        break;
      case 23:
        break;
      case 22:
        ((n = l.stateNode),
          (i = l.alternate),
          l.memoizedState !== null
            ? n._visibility & 2
              ? Ml(t, l, e, a)
              : hu(t, l)
            : n._visibility & 2
              ? Ml(t, l, e, a)
              : ((n._visibility |= 2), Ea(t, l, e, a, (l.subtreeFlags & 10256) !== 0 || !1)),
          u & 2048 && Zf(i, l));
        break;
      case 24:
        (Ml(t, l, e, a), u & 2048 && Vf(l.alternate, l));
        break;
      default:
        Ml(t, l, e, a);
    }
  }
  function Ea(t, l, e, a, u) {
    for (u = u && ((l.subtreeFlags & 10256) !== 0 || !1), l = l.child; l !== null; ) {
      var n = t,
        i = l,
        r = e,
        h = a,
        T = i.flags;
      switch (i.tag) {
        case 0:
        case 11:
        case 15:
          (Ea(n, i, r, h, u), su(8, i));
          break;
        case 23:
          break;
        case 22:
          var _ = i.stateNode;
          (i.memoizedState !== null
            ? _._visibility & 2
              ? Ea(n, i, r, h, u)
              : hu(n, i)
            : ((_._visibility |= 2), Ea(n, i, r, h, u)),
            u && T & 2048 && Zf(i.alternate, i));
          break;
        case 24:
          (Ea(n, i, r, h, u), u && T & 2048 && Vf(i.alternate, i));
          break;
        default:
          Ea(n, i, r, h, u);
      }
      l = l.sibling;
    }
  }
  function hu(t, l) {
    if (l.subtreeFlags & 10256)
      for (l = l.child; l !== null; ) {
        var e = t,
          a = l,
          u = a.flags;
        switch (a.tag) {
          case 22:
            (hu(e, a), u & 2048 && Zf(a.alternate, a));
            break;
          case 24:
            (hu(e, a), u & 2048 && Vf(a.alternate, a));
            break;
          default:
            hu(e, a);
        }
        l = l.sibling;
      }
  }
  var mu = 8192;
  function Ta(t, l, e) {
    if (t.subtreeFlags & mu) for (t = t.child; t !== null; ) (qs(t, l, e), (t = t.sibling));
  }
  function qs(t, l, e) {
    switch (t.tag) {
      case 26:
        (Ta(t, l, e),
          t.flags & mu && t.memoizedState !== null && Ky(e, Ol, t.memoizedState, t.memoizedProps));
        break;
      case 5:
        Ta(t, l, e);
        break;
      case 3:
      case 4:
        var a = Ol;
        ((Ol = Xn(t.stateNode.containerInfo)), Ta(t, l, e), (Ol = a));
        break;
      case 22:
        t.memoizedState === null &&
          ((a = t.alternate),
          a !== null && a.memoizedState !== null
            ? ((a = mu), (mu = 16777216), Ta(t, l, e), (mu = a))
            : Ta(t, l, e));
        break;
      default:
        Ta(t, l, e);
    }
  }
  function Ys(t) {
    var l = t.alternate;
    if (l !== null && ((t = l.child), t !== null)) {
      l.child = null;
      do ((l = t.sibling), (t.sibling = null), (t = l));
      while (t !== null);
    }
  }
  function yu(t) {
    var l = t.deletions;
    if ((t.flags & 16) !== 0) {
      if (l !== null)
        for (var e = 0; e < l.length; e++) {
          var a = l[e];
          ((jt = a), js(a, t));
        }
      Ys(t);
    }
    if (t.subtreeFlags & 10256) for (t = t.child; t !== null; ) (Ls(t), (t = t.sibling));
  }
  function Ls(t) {
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        (yu(t), t.flags & 2048 && ge(9, t, t.return));
        break;
      case 3:
        yu(t);
        break;
      case 12:
        yu(t);
        break;
      case 22:
        var l = t.stateNode;
        t.memoizedState !== null && l._visibility & 2 && (t.return === null || t.return.tag !== 13)
          ? ((l._visibility &= -3), Mn(t))
          : yu(t);
        break;
      default:
        yu(t);
    }
  }
  function Mn(t) {
    var l = t.deletions;
    if ((t.flags & 16) !== 0) {
      if (l !== null)
        for (var e = 0; e < l.length; e++) {
          var a = l[e];
          ((jt = a), js(a, t));
        }
      Ys(t);
    }
    for (t = t.child; t !== null; ) {
      switch (((l = t), l.tag)) {
        case 0:
        case 11:
        case 15:
          (ge(8, l, l.return), Mn(l));
          break;
        case 22:
          ((e = l.stateNode), e._visibility & 2 && ((e._visibility &= -3), Mn(l)));
          break;
        default:
          Mn(l);
      }
      t = t.sibling;
    }
  }
  function js(t, l) {
    for (; jt !== null; ) {
      var e = jt;
      switch (e.tag) {
        case 0:
        case 11:
        case 15:
          ge(8, e, l);
          break;
        case 23:
        case 22:
          if (e.memoizedState !== null && e.memoizedState.cachePool !== null) {
            var a = e.memoizedState.cachePool.pool;
            a != null && a.refCount++;
          }
          break;
        case 24:
          Ia(e.memoizedState.cache);
      }
      if (((a = e.child), a !== null)) ((a.return = e), (jt = a));
      else
        t: for (e = t; jt !== null; ) {
          a = jt;
          var u = a.sibling,
            n = a.return;
          if ((Ds(a), a === e)) {
            jt = null;
            break t;
          }
          if (u !== null) {
            ((u.return = n), (jt = u));
            break t;
          }
          jt = n;
        }
    }
  }
  var iy = {
      getCacheForType: function (t) {
        var l = Qt(Ht),
          e = l.data.get(t);
        return (e === void 0 && ((e = t()), l.data.set(t, e)), e);
      },
      cacheSignal: function () {
        return Qt(Ht).controller.signal;
      },
    },
    fy = typeof WeakMap == 'function' ? WeakMap : Map,
    rt = 0,
    bt = null,
    et = null,
    ut = 0,
    dt = 0,
    ol = null,
    Se = !1,
    za = !1,
    Kf = !1,
    Pl = 0,
    Ot = 0,
    pe = 0,
    $e = 0,
    Jf = 0,
    sl = 0,
    Aa = 0,
    vu = null,
    ll = null,
    wf = !1,
    Dn = 0,
    Gs = 0,
    Un = 1 / 0,
    Cn = null,
    be = null,
    Yt = 0,
    Ee = null,
    Ra = null,
    te = 0,
    $f = 0,
    Wf = null,
    Xs = null,
    gu = 0,
    kf = null;
  function dl() {
    return (rt & 2) !== 0 && ut !== 0 ? ut & -ut : M.T !== null ? ec() : er();
  }
  function Qs() {
    if (sl === 0)
      if ((ut & 536870912) === 0 || it) {
        var t = Lu;
        ((Lu <<= 1), (Lu & 3932160) === 0 && (Lu = 262144), (sl = t));
      } else sl = 536870912;
    return ((t = cl.current), t !== null && (t.flags |= 32), sl);
  }
  function el(t, l, e) {
    (((t === bt && (dt === 2 || dt === 9)) || t.cancelPendingCommit !== null) &&
      (_a(t, 0), Te(t, ut, sl, !1)),
      La(t, e),
      ((rt & 2) === 0 || t !== bt) &&
        (t === bt && ((rt & 2) === 0 && ($e |= e), Ot === 4 && Te(t, ut, sl, !1)), ql(t)));
  }
  function Zs(t, l, e) {
    if ((rt & 6) !== 0) throw Error(c(327));
    var a = (!e && (l & 127) === 0 && (l & t.expiredLanes) === 0) || Ya(t, l),
      u = a ? oy(t, l) : If(t, l, !0),
      n = a;
    do {
      if (u === 0) {
        za && !a && Te(t, l, 0, !1);
        break;
      } else {
        if (((e = t.current.alternate), n && !cy(e))) {
          ((u = If(t, l, !1)), (n = !1));
          continue;
        }
        if (u === 2) {
          if (((n = l), t.errorRecoveryDisabledLanes & n)) var i = 0;
          else
            ((i = t.pendingLanes & -536870913), (i = i !== 0 ? i : i & 536870912 ? 536870912 : 0));
          if (i !== 0) {
            l = i;
            t: {
              var r = t;
              u = vu;
              var h = r.current.memoizedState.isDehydrated;
              if ((h && (_a(r, i).flags |= 256), (i = If(r, i, !1)), i !== 2)) {
                if (Kf && !h) {
                  ((r.errorRecoveryDisabledLanes |= n), ($e |= n), (u = 4));
                  break t;
                }
                ((n = ll), (ll = u), n !== null && (ll === null ? (ll = n) : ll.push.apply(ll, n)));
              }
              u = i;
            }
            if (((n = !1), u !== 2)) continue;
          }
        }
        if (u === 1) {
          (_a(t, 0), Te(t, l, 0, !0));
          break;
        }
        t: {
          switch (((a = t), (n = u), n)) {
            case 0:
            case 1:
              throw Error(c(345));
            case 4:
              if ((l & 4194048) !== l) break;
            case 6:
              Te(a, l, sl, !Se);
              break t;
            case 2:
              ll = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(c(329));
          }
          if ((l & 62914560) === l && ((u = Dn + 300 - al()), 10 < u)) {
            if ((Te(a, l, sl, !Se), Gu(a, 0, !0) !== 0)) break t;
            ((te = l),
              (a.timeoutHandle = bd(
                Vs.bind(null, a, e, ll, Cn, wf, l, sl, $e, Aa, Se, n, 'Throttled', -0, 0),
                u
              )));
            break t;
          }
          Vs(a, e, ll, Cn, wf, l, sl, $e, Aa, Se, n, null, -0, 0);
        }
      }
      break;
    } while (!0);
    ql(t);
  }
  function Vs(t, l, e, a, u, n, i, r, h, T, _, N, z, R) {
    if (((t.timeoutHandle = -1), (N = l.subtreeFlags), N & 8192 || (N & 16785408) === 16785408)) {
      ((N = {
        stylesheets: null,
        count: 0,
        imgCount: 0,
        imgBytes: 0,
        suspenseyImages: [],
        waitingForImages: !0,
        waitingForViewTransition: !1,
        unsuspend: jl,
      }),
        qs(l, n, N));
      var L = (n & 62914560) === n ? Dn - al() : (n & 4194048) === n ? Gs - al() : 0;
      if (((L = Jy(N, L)), L !== null)) {
        ((te = n),
          (t.cancelPendingCommit = L(Is.bind(null, t, l, n, e, a, u, i, r, h, _, N, null, z, R))),
          Te(t, n, i, !T));
        return;
      }
    }
    Is(t, l, n, e, a, u, i, r, h);
  }
  function cy(t) {
    for (var l = t; ; ) {
      var e = l.tag;
      if (
        (e === 0 || e === 11 || e === 15) &&
        l.flags & 16384 &&
        ((e = l.updateQueue), e !== null && ((e = e.stores), e !== null))
      )
        for (var a = 0; a < e.length; a++) {
          var u = e[a],
            n = u.getSnapshot;
          u = u.value;
          try {
            if (!il(n(), u)) return !1;
          } catch {
            return !1;
          }
        }
      if (((e = l.child), l.subtreeFlags & 16384 && e !== null)) ((e.return = l), (l = e));
      else {
        if (l === t) break;
        for (; l.sibling === null; ) {
          if (l.return === null || l.return === t) return !0;
          l = l.return;
        }
        ((l.sibling.return = l.return), (l = l.sibling));
      }
    }
    return !0;
  }
  function Te(t, l, e, a) {
    ((l &= ~Jf),
      (l &= ~$e),
      (t.suspendedLanes |= l),
      (t.pingedLanes &= ~l),
      a && (t.warmLanes |= l),
      (a = t.expirationTimes));
    for (var u = l; 0 < u; ) {
      var n = 31 - nl(u),
        i = 1 << n;
      ((a[n] = -1), (u &= ~i));
    }
    e !== 0 && Pc(t, e, l);
  }
  function Nn() {
    return (rt & 6) === 0 ? (Su(0), !1) : !0;
  }
  function Ff() {
    if (et !== null) {
      if (dt === 0) var t = et.return;
      else ((t = et), (Zl = je = null), hf(t), (va = null), (tu = 0), (t = et));
      for (; t !== null; ) (Es(t.alternate, t), (t = t.return));
      et = null;
    }
  }
  function _a(t, l) {
    var e = t.timeoutHandle;
    (e !== -1 && ((t.timeoutHandle = -1), My(e)),
      (e = t.cancelPendingCommit),
      e !== null && ((t.cancelPendingCommit = null), e()),
      (te = 0),
      Ff(),
      (bt = t),
      (et = e = Xl(t.current, null)),
      (ut = l),
      (dt = 0),
      (ol = null),
      (Se = !1),
      (za = Ya(t, l)),
      (Kf = !1),
      (Aa = sl = Jf = $e = pe = Ot = 0),
      (ll = vu = null),
      (wf = !1),
      (l & 8) !== 0 && (l |= l & 32));
    var a = t.entangledLanes;
    if (a !== 0)
      for (t = t.entanglements, a &= l; 0 < a; ) {
        var u = 31 - nl(a),
          n = 1 << u;
        ((l |= t[u]), (a &= ~n));
      }
    return ((Pl = l), Iu(), e);
  }
  function Ks(t, l) {
    ((P = null),
      (M.H = cu),
      l === ya || l === fn
        ? ((l = io()), (dt = 3))
        : l === tf
          ? ((l = io()), (dt = 4))
          : (dt =
              l === Df
                ? 8
                : l !== null && typeof l == 'object' && typeof l.then == 'function'
                  ? 6
                  : 1),
      (ol = l),
      et === null && ((Ot = 1), En(t, Sl(l, t.current))));
  }
  function Js() {
    var t = cl.current;
    return t === null
      ? !0
      : (ut & 4194048) === ut
        ? Tl === null
        : (ut & 62914560) === ut || (ut & 536870912) !== 0
          ? t === Tl
          : !1;
  }
  function ws() {
    var t = M.H;
    return ((M.H = cu), t === null ? cu : t);
  }
  function $s() {
    var t = M.A;
    return ((M.A = iy), t);
  }
  function Hn() {
    ((Ot = 4),
      Se || ((ut & 4194048) !== ut && cl.current !== null) || (za = !0),
      ((pe & 134217727) === 0 && ($e & 134217727) === 0) || bt === null || Te(bt, ut, sl, !1));
  }
  function If(t, l, e) {
    var a = rt;
    rt |= 2;
    var u = ws(),
      n = $s();
    ((bt !== t || ut !== l) && ((Cn = null), _a(t, l)), (l = !1));
    var i = Ot;
    t: do
      try {
        if (dt !== 0 && et !== null) {
          var r = et,
            h = ol;
          switch (dt) {
            case 8:
              (Ff(), (i = 6));
              break t;
            case 3:
            case 2:
            case 9:
            case 6:
              cl.current === null && (l = !0);
              var T = dt;
              if (((dt = 0), (ol = null), Oa(t, r, h, T), e && za)) {
                i = 0;
                break t;
              }
              break;
            default:
              ((T = dt), (dt = 0), (ol = null), Oa(t, r, h, T));
          }
        }
        (ry(), (i = Ot));
        break;
      } catch (_) {
        Ks(t, _);
      }
    while (!0);
    return (
      l && t.shellSuspendCounter++,
      (Zl = je = null),
      (rt = a),
      (M.H = u),
      (M.A = n),
      et === null && ((bt = null), (ut = 0), Iu()),
      i
    );
  }
  function ry() {
    for (; et !== null; ) Ws(et);
  }
  function oy(t, l) {
    var e = rt;
    rt |= 2;
    var a = ws(),
      u = $s();
    bt !== t || ut !== l ? ((Cn = null), (Un = al() + 500), _a(t, l)) : (za = Ya(t, l));
    t: do
      try {
        if (dt !== 0 && et !== null) {
          l = et;
          var n = ol;
          l: switch (dt) {
            case 1:
              ((dt = 0), (ol = null), Oa(t, l, n, 1));
              break;
            case 2:
            case 9:
              if (uo(n)) {
                ((dt = 0), (ol = null), ks(l));
                break;
              }
              ((l = function () {
                ((dt !== 2 && dt !== 9) || bt !== t || (dt = 7), ql(t));
              }),
                n.then(l, l));
              break t;
            case 3:
              dt = 7;
              break t;
            case 4:
              dt = 5;
              break t;
            case 7:
              uo(n) ? ((dt = 0), (ol = null), ks(l)) : ((dt = 0), (ol = null), Oa(t, l, n, 7));
              break;
            case 5:
              var i = null;
              switch (et.tag) {
                case 26:
                  i = et.memoizedState;
                case 5:
                case 27:
                  var r = et;
                  if (i ? Bd(i) : r.stateNode.complete) {
                    ((dt = 0), (ol = null));
                    var h = r.sibling;
                    if (h !== null) et = h;
                    else {
                      var T = r.return;
                      T !== null ? ((et = T), xn(T)) : (et = null);
                    }
                    break l;
                  }
              }
              ((dt = 0), (ol = null), Oa(t, l, n, 5));
              break;
            case 6:
              ((dt = 0), (ol = null), Oa(t, l, n, 6));
              break;
            case 8:
              (Ff(), (Ot = 6));
              break t;
            default:
              throw Error(c(462));
          }
        }
        sy();
        break;
      } catch (_) {
        Ks(t, _);
      }
    while (!0);
    return (
      (Zl = je = null),
      (M.H = a),
      (M.A = u),
      (rt = e),
      et !== null ? 0 : ((bt = null), (ut = 0), Iu(), Ot)
    );
  }
  function sy() {
    for (; et !== null && !xh(); ) Ws(et);
  }
  function Ws(t) {
    var l = ps(t.alternate, t, Pl);
    ((t.memoizedProps = t.pendingProps), l === null ? xn(t) : (et = l));
  }
  function ks(t) {
    var l = t,
      e = l.alternate;
    switch (l.tag) {
      case 15:
      case 0:
        l = hs(e, l, l.pendingProps, l.type, void 0, ut);
        break;
      case 11:
        l = hs(e, l, l.pendingProps, l.type.render, l.ref, ut);
        break;
      case 5:
        hf(l);
      default:
        (Es(e, l), (l = et = wr(l, Pl)), (l = ps(e, l, Pl)));
    }
    ((t.memoizedProps = t.pendingProps), l === null ? xn(t) : (et = l));
  }
  function Oa(t, l, e, a) {
    ((Zl = je = null), hf(l), (va = null), (tu = 0));
    var u = l.return;
    try {
      if (Pm(t, u, l, e, ut)) {
        ((Ot = 1), En(t, Sl(e, t.current)), (et = null));
        return;
      }
    } catch (n) {
      if (u !== null) throw ((et = u), n);
      ((Ot = 1), En(t, Sl(e, t.current)), (et = null));
      return;
    }
    l.flags & 32768
      ? (it || a === 1
          ? (t = !0)
          : za || (ut & 536870912) !== 0
            ? (t = !1)
            : ((Se = t = !0),
              (a === 2 || a === 9 || a === 3 || a === 6) &&
                ((a = cl.current), a !== null && a.tag === 13 && (a.flags |= 16384))),
        Fs(l, t))
      : xn(l);
  }
  function xn(t) {
    var l = t;
    do {
      if ((l.flags & 32768) !== 0) {
        Fs(l, Se);
        return;
      }
      t = l.return;
      var e = ey(l.alternate, l, Pl);
      if (e !== null) {
        et = e;
        return;
      }
      if (((l = l.sibling), l !== null)) {
        et = l;
        return;
      }
      et = l = t;
    } while (l !== null);
    Ot === 0 && (Ot = 5);
  }
  function Fs(t, l) {
    do {
      var e = ay(t.alternate, t);
      if (e !== null) {
        ((e.flags &= 32767), (et = e));
        return;
      }
      if (
        ((e = t.return),
        e !== null && ((e.flags |= 32768), (e.subtreeFlags = 0), (e.deletions = null)),
        !l && ((t = t.sibling), t !== null))
      ) {
        et = t;
        return;
      }
      et = t = e;
    } while (t !== null);
    ((Ot = 6), (et = null));
  }
  function Is(t, l, e, a, u, n, i, r, h) {
    t.cancelPendingCommit = null;
    do Bn();
    while (Yt !== 0);
    if ((rt & 6) !== 0) throw Error(c(327));
    if (l !== null) {
      if (l === t.current) throw Error(c(177));
      if (
        ((n = l.lanes | l.childLanes),
        (n |= ji),
        Vh(t, e, n, i, r, h),
        t === bt && ((et = bt = null), (ut = 0)),
        (Ra = l),
        (Ee = t),
        (te = e),
        ($f = n),
        (Wf = u),
        (Xs = a),
        (l.subtreeFlags & 10256) !== 0 || (l.flags & 10256) !== 0
          ? ((t.callbackNode = null),
            (t.callbackPriority = 0),
            yy(qu, function () {
              return (ad(), null);
            }))
          : ((t.callbackNode = null), (t.callbackPriority = 0)),
        (a = (l.flags & 13878) !== 0),
        (l.subtreeFlags & 13878) !== 0 || a)
      ) {
        ((a = M.T), (M.T = null), (u = B.p), (B.p = 2), (i = rt), (rt |= 4));
        try {
          uy(t, l, e);
        } finally {
          ((rt = i), (B.p = u), (M.T = a));
        }
      }
      ((Yt = 1), Ps(), td(), ld());
    }
  }
  function Ps() {
    if (Yt === 1) {
      Yt = 0;
      var t = Ee,
        l = Ra,
        e = (l.flags & 13878) !== 0;
      if ((l.subtreeFlags & 13878) !== 0 || e) {
        ((e = M.T), (M.T = null));
        var a = B.p;
        B.p = 2;
        var u = rt;
        rt |= 4;
        try {
          Hs(l, t);
          var n = oc,
            i = Lr(t.containerInfo),
            r = n.focusedElem,
            h = n.selectionRange;
          if (i !== r && r && r.ownerDocument && Yr(r.ownerDocument.documentElement, r)) {
            if (h !== null && xi(r)) {
              var T = h.start,
                _ = h.end;
              if ((_ === void 0 && (_ = T), 'selectionStart' in r))
                ((r.selectionStart = T), (r.selectionEnd = Math.min(_, r.value.length)));
              else {
                var N = r.ownerDocument || document,
                  z = (N && N.defaultView) || window;
                if (z.getSelection) {
                  var R = z.getSelection(),
                    L = r.textContent.length,
                    J = Math.min(h.start, L),
                    St = h.end === void 0 ? J : Math.min(h.end, L);
                  !R.extend && J > St && ((i = St), (St = J), (J = i));
                  var S = qr(r, J),
                    m = qr(r, St);
                  if (
                    S &&
                    m &&
                    (R.rangeCount !== 1 ||
                      R.anchorNode !== S.node ||
                      R.anchorOffset !== S.offset ||
                      R.focusNode !== m.node ||
                      R.focusOffset !== m.offset)
                  ) {
                    var E = N.createRange();
                    (E.setStart(S.node, S.offset),
                      R.removeAllRanges(),
                      J > St
                        ? (R.addRange(E), R.extend(m.node, m.offset))
                        : (E.setEnd(m.node, m.offset), R.addRange(E)));
                  }
                }
              }
            }
            for (N = [], R = r; (R = R.parentNode); )
              R.nodeType === 1 && N.push({ element: R, left: R.scrollLeft, top: R.scrollTop });
            for (typeof r.focus == 'function' && r.focus(), r = 0; r < N.length; r++) {
              var U = N[r];
              ((U.element.scrollLeft = U.left), (U.element.scrollTop = U.top));
            }
          }
          ((wn = !!rc), (oc = rc = null));
        } finally {
          ((rt = u), (B.p = a), (M.T = e));
        }
      }
      ((t.current = l), (Yt = 2));
    }
  }
  function td() {
    if (Yt === 2) {
      Yt = 0;
      var t = Ee,
        l = Ra,
        e = (l.flags & 8772) !== 0;
      if ((l.subtreeFlags & 8772) !== 0 || e) {
        ((e = M.T), (M.T = null));
        var a = B.p;
        B.p = 2;
        var u = rt;
        rt |= 4;
        try {
          Ms(t, l.alternate, l);
        } finally {
          ((rt = u), (B.p = a), (M.T = e));
        }
      }
      Yt = 3;
    }
  }
  function ld() {
    if (Yt === 4 || Yt === 3) {
      ((Yt = 0), Bh());
      var t = Ee,
        l = Ra,
        e = te,
        a = Xs;
      (l.subtreeFlags & 10256) !== 0 || (l.flags & 10256) !== 0
        ? (Yt = 5)
        : ((Yt = 0), (Ra = Ee = null), ed(t, t.pendingLanes));
      var u = t.pendingLanes;
      if (
        (u === 0 && (be = null),
        yi(e),
        (l = l.stateNode),
        ul && typeof ul.onCommitFiberRoot == 'function')
      )
        try {
          ul.onCommitFiberRoot(qa, l, void 0, (l.current.flags & 128) === 128);
        } catch {}
      if (a !== null) {
        ((l = M.T), (u = B.p), (B.p = 2), (M.T = null));
        try {
          for (var n = t.onRecoverableError, i = 0; i < a.length; i++) {
            var r = a[i];
            n(r.value, { componentStack: r.stack });
          }
        } finally {
          ((M.T = l), (B.p = u));
        }
      }
      ((te & 3) !== 0 && Bn(),
        ql(t),
        (u = t.pendingLanes),
        (e & 261930) !== 0 && (u & 42) !== 0 ? (t === kf ? gu++ : ((gu = 0), (kf = t))) : (gu = 0),
        Su(0));
    }
  }
  function ed(t, l) {
    (t.pooledCacheLanes &= l) === 0 &&
      ((l = t.pooledCache), l != null && ((t.pooledCache = null), Ia(l)));
  }
  function Bn() {
    return (Ps(), td(), ld(), ad());
  }
  function ad() {
    if (Yt !== 5) return !1;
    var t = Ee,
      l = $f;
    $f = 0;
    var e = yi(te),
      a = M.T,
      u = B.p;
    try {
      ((B.p = 32 > e ? 32 : e), (M.T = null), (e = Wf), (Wf = null));
      var n = Ee,
        i = te;
      if (((Yt = 0), (Ra = Ee = null), (te = 0), (rt & 6) !== 0)) throw Error(c(331));
      var r = rt;
      if (
        ((rt |= 4),
        Ls(n.current),
        Bs(n, n.current, i, e),
        (rt = r),
        Su(0, !1),
        ul && typeof ul.onPostCommitFiberRoot == 'function')
      )
        try {
          ul.onPostCommitFiberRoot(qa, n);
        } catch {}
      return !0;
    } finally {
      ((B.p = u), (M.T = a), ed(t, l));
    }
  }
  function ud(t, l, e) {
    ((l = Sl(e, l)),
      (l = Mf(t.stateNode, l, 2)),
      (t = me(t, l, 2)),
      t !== null && (La(t, 2), ql(t)));
  }
  function ht(t, l, e) {
    if (t.tag === 3) ud(t, t, e);
    else
      for (; l !== null; ) {
        if (l.tag === 3) {
          ud(l, t, e);
          break;
        } else if (l.tag === 1) {
          var a = l.stateNode;
          if (
            typeof l.type.getDerivedStateFromError == 'function' ||
            (typeof a.componentDidCatch == 'function' && (be === null || !be.has(a)))
          ) {
            ((t = Sl(e, t)),
              (e = ns(2)),
              (a = me(l, e, 2)),
              a !== null && (is(e, a, l, t), La(a, 2), ql(a)));
            break;
          }
        }
        l = l.return;
      }
  }
  function Pf(t, l, e) {
    var a = t.pingCache;
    if (a === null) {
      a = t.pingCache = new fy();
      var u = new Set();
      a.set(l, u);
    } else ((u = a.get(l)), u === void 0 && ((u = new Set()), a.set(l, u)));
    u.has(e) || ((Kf = !0), u.add(e), (t = dy.bind(null, t, l, e)), l.then(t, t));
  }
  function dy(t, l, e) {
    var a = t.pingCache;
    (a !== null && a.delete(l),
      (t.pingedLanes |= t.suspendedLanes & e),
      (t.warmLanes &= ~e),
      bt === t &&
        (ut & e) === e &&
        (Ot === 4 || (Ot === 3 && (ut & 62914560) === ut && 300 > al() - Dn)
          ? (rt & 2) === 0 && _a(t, 0)
          : (Jf |= e),
        Aa === ut && (Aa = 0)),
      ql(t));
  }
  function nd(t, l) {
    (l === 0 && (l = Ic()), (t = qe(t, l)), t !== null && (La(t, l), ql(t)));
  }
  function hy(t) {
    var l = t.memoizedState,
      e = 0;
    (l !== null && (e = l.retryLane), nd(t, e));
  }
  function my(t, l) {
    var e = 0;
    switch (t.tag) {
      case 31:
      case 13:
        var a = t.stateNode,
          u = t.memoizedState;
        u !== null && (e = u.retryLane);
        break;
      case 19:
        a = t.stateNode;
        break;
      case 22:
        a = t.stateNode._retryCache;
        break;
      default:
        throw Error(c(314));
    }
    (a !== null && a.delete(l), nd(t, e));
  }
  function yy(t, l) {
    return si(t, l);
  }
  var qn = null,
    Ma = null,
    tc = !1,
    Yn = !1,
    lc = !1,
    ze = 0;
  function ql(t) {
    (t !== Ma && t.next === null && (Ma === null ? (qn = Ma = t) : (Ma = Ma.next = t)),
      (Yn = !0),
      tc || ((tc = !0), gy()));
  }
  function Su(t, l) {
    if (!lc && Yn) {
      lc = !0;
      do
        for (var e = !1, a = qn; a !== null; ) {
          if (t !== 0) {
            var u = a.pendingLanes;
            if (u === 0) var n = 0;
            else {
              var i = a.suspendedLanes,
                r = a.pingedLanes;
              ((n = (1 << (31 - nl(42 | t) + 1)) - 1),
                (n &= u & ~(i & ~r)),
                (n = n & 201326741 ? (n & 201326741) | 1 : n ? n | 2 : 0));
            }
            n !== 0 && ((e = !0), rd(a, n));
          } else
            ((n = ut),
              (n = Gu(
                a,
                a === bt ? n : 0,
                a.cancelPendingCommit !== null || a.timeoutHandle !== -1
              )),
              (n & 3) === 0 || Ya(a, n) || ((e = !0), rd(a, n)));
          a = a.next;
        }
      while (e);
      lc = !1;
    }
  }
  function vy() {
    id();
  }
  function id() {
    Yn = tc = !1;
    var t = 0;
    ze !== 0 && Oy() && (t = ze);
    for (var l = al(), e = null, a = qn; a !== null; ) {
      var u = a.next,
        n = fd(a, l);
      (n === 0
        ? ((a.next = null), e === null ? (qn = u) : (e.next = u), u === null && (Ma = e))
        : ((e = a), (t !== 0 || (n & 3) !== 0) && (Yn = !0)),
        (a = u));
    }
    ((Yt !== 0 && Yt !== 5) || Su(t), ze !== 0 && (ze = 0));
  }
  function fd(t, l) {
    for (
      var e = t.suspendedLanes,
        a = t.pingedLanes,
        u = t.expirationTimes,
        n = t.pendingLanes & -62914561;
      0 < n;
    ) {
      var i = 31 - nl(n),
        r = 1 << i,
        h = u[i];
      (h === -1
        ? ((r & e) === 0 || (r & a) !== 0) && (u[i] = Zh(r, l))
        : h <= l && (t.expiredLanes |= r),
        (n &= ~r));
    }
    if (
      ((l = bt),
      (e = ut),
      (e = Gu(t, t === l ? e : 0, t.cancelPendingCommit !== null || t.timeoutHandle !== -1)),
      (a = t.callbackNode),
      e === 0 || (t === l && (dt === 2 || dt === 9)) || t.cancelPendingCommit !== null)
    )
      return (a !== null && a !== null && di(a), (t.callbackNode = null), (t.callbackPriority = 0));
    if ((e & 3) === 0 || Ya(t, e)) {
      if (((l = e & -e), l === t.callbackPriority)) return l;
      switch ((a !== null && di(a), yi(e))) {
        case 2:
        case 8:
          e = kc;
          break;
        case 32:
          e = qu;
          break;
        case 268435456:
          e = Fc;
          break;
        default:
          e = qu;
      }
      return (
        (a = cd.bind(null, t)),
        (e = si(e, a)),
        (t.callbackPriority = l),
        (t.callbackNode = e),
        l
      );
    }
    return (
      a !== null && a !== null && di(a),
      (t.callbackPriority = 2),
      (t.callbackNode = null),
      2
    );
  }
  function cd(t, l) {
    if (Yt !== 0 && Yt !== 5) return ((t.callbackNode = null), (t.callbackPriority = 0), null);
    var e = t.callbackNode;
    if (Bn() && t.callbackNode !== e) return null;
    var a = ut;
    return (
      (a = Gu(t, t === bt ? a : 0, t.cancelPendingCommit !== null || t.timeoutHandle !== -1)),
      a === 0
        ? null
        : (Zs(t, a, l),
          fd(t, al()),
          t.callbackNode != null && t.callbackNode === e ? cd.bind(null, t) : null)
    );
  }
  function rd(t, l) {
    if (Bn()) return null;
    Zs(t, l, !0);
  }
  function gy() {
    Dy(function () {
      (rt & 6) !== 0 ? si(Wc, vy) : id();
    });
  }
  function ec() {
    if (ze === 0) {
      var t = ha;
      (t === 0 && ((t = Yu), (Yu <<= 1), (Yu & 261888) === 0 && (Yu = 256)), (ze = t));
    }
    return ze;
  }
  function od(t) {
    return t == null || typeof t == 'symbol' || typeof t == 'boolean'
      ? null
      : typeof t == 'function'
        ? t
        : Vu('' + t);
  }
  function sd(t, l) {
    var e = l.ownerDocument.createElement('input');
    return (
      (e.name = l.name),
      (e.value = l.value),
      t.id && e.setAttribute('form', t.id),
      l.parentNode.insertBefore(e, l),
      (t = new FormData(t)),
      e.parentNode.removeChild(e),
      t
    );
  }
  function Sy(t, l, e, a, u) {
    if (l === 'submit' && e && e.stateNode === u) {
      var n = od((u[kt] || null).action),
        i = a.submitter;
      i &&
        ((l = (l = i[kt] || null) ? od(l.formAction) : i.getAttribute('formAction')),
        l !== null && ((n = l), (i = null)));
      var r = new $u('action', 'action', null, a, u);
      t.push({
        event: r,
        listeners: [
          {
            instance: null,
            listener: function () {
              if (a.defaultPrevented) {
                if (ze !== 0) {
                  var h = i ? sd(u, i) : new FormData(u);
                  Tf(e, { pending: !0, data: h, method: u.method, action: n }, null, h);
                }
              } else
                typeof n == 'function' &&
                  (r.preventDefault(),
                  (h = i ? sd(u, i) : new FormData(u)),
                  Tf(e, { pending: !0, data: h, method: u.method, action: n }, n, h));
            },
            currentTarget: u,
          },
        ],
      });
    }
  }
  for (var ac = 0; ac < Li.length; ac++) {
    var uc = Li[ac],
      py = uc.toLowerCase(),
      by = uc[0].toUpperCase() + uc.slice(1);
    _l(py, 'on' + by);
  }
  (_l(Xr, 'onAnimationEnd'),
    _l(Qr, 'onAnimationIteration'),
    _l(Zr, 'onAnimationStart'),
    _l('dblclick', 'onDoubleClick'),
    _l('focusin', 'onFocus'),
    _l('focusout', 'onBlur'),
    _l(qm, 'onTransitionRun'),
    _l(Ym, 'onTransitionStart'),
    _l(Lm, 'onTransitionCancel'),
    _l(Vr, 'onTransitionEnd'),
    Pe('onMouseEnter', ['mouseout', 'mouseover']),
    Pe('onMouseLeave', ['mouseout', 'mouseover']),
    Pe('onPointerEnter', ['pointerout', 'pointerover']),
    Pe('onPointerLeave', ['pointerout', 'pointerover']),
    Ne('onChange', 'change click focusin focusout input keydown keyup selectionchange'.split(' ')),
    Ne(
      'onSelect',
      'focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange'.split(
        ' '
      )
    ),
    Ne('onBeforeInput', ['compositionend', 'keypress', 'textInput', 'paste']),
    Ne('onCompositionEnd', 'compositionend focusout keydown keypress keyup mousedown'.split(' ')),
    Ne(
      'onCompositionStart',
      'compositionstart focusout keydown keypress keyup mousedown'.split(' ')
    ),
    Ne(
      'onCompositionUpdate',
      'compositionupdate focusout keydown keypress keyup mousedown'.split(' ')
    ));
  var pu =
      'abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting'.split(
        ' '
      ),
    Ey = new Set(
      'beforetoggle cancel close invalid load scroll scrollend toggle'.split(' ').concat(pu)
    );
  function dd(t, l) {
    l = (l & 4) !== 0;
    for (var e = 0; e < t.length; e++) {
      var a = t[e],
        u = a.event;
      a = a.listeners;
      t: {
        var n = void 0;
        if (l)
          for (var i = a.length - 1; 0 <= i; i--) {
            var r = a[i],
              h = r.instance,
              T = r.currentTarget;
            if (((r = r.listener), h !== n && u.isPropagationStopped())) break t;
            ((n = r), (u.currentTarget = T));
            try {
              n(u);
            } catch (_) {
              Fu(_);
            }
            ((u.currentTarget = null), (n = h));
          }
        else
          for (i = 0; i < a.length; i++) {
            if (
              ((r = a[i]),
              (h = r.instance),
              (T = r.currentTarget),
              (r = r.listener),
              h !== n && u.isPropagationStopped())
            )
              break t;
            ((n = r), (u.currentTarget = T));
            try {
              n(u);
            } catch (_) {
              Fu(_);
            }
            ((u.currentTarget = null), (n = h));
          }
      }
    }
  }
  function at(t, l) {
    var e = l[vi];
    e === void 0 && (e = l[vi] = new Set());
    var a = t + '__bubble';
    e.has(a) || (hd(l, t, 2, !1), e.add(a));
  }
  function nc(t, l, e) {
    var a = 0;
    (l && (a |= 4), hd(e, t, a, l));
  }
  var Ln = '_reactListening' + Math.random().toString(36).slice(2);
  function ic(t) {
    if (!t[Ln]) {
      ((t[Ln] = !0),
        nr.forEach(function (e) {
          e !== 'selectionchange' && (Ey.has(e) || nc(e, !1, t), nc(e, !0, t));
        }));
      var l = t.nodeType === 9 ? t : t.ownerDocument;
      l === null || l[Ln] || ((l[Ln] = !0), nc('selectionchange', !1, l));
    }
  }
  function hd(t, l, e, a) {
    switch (Qd(l)) {
      case 2:
        var u = Wy;
        break;
      case 8:
        u = ky;
        break;
      default:
        u = Ec;
    }
    ((e = u.bind(null, l, e, t)),
      (u = void 0),
      !Ri || (l !== 'touchstart' && l !== 'touchmove' && l !== 'wheel') || (u = !0),
      a
        ? u !== void 0
          ? t.addEventListener(l, e, { capture: !0, passive: u })
          : t.addEventListener(l, e, !0)
        : u !== void 0
          ? t.addEventListener(l, e, { passive: u })
          : t.addEventListener(l, e, !1));
  }
  function fc(t, l, e, a, u) {
    var n = a;
    if ((l & 1) === 0 && (l & 2) === 0 && a !== null)
      t: for (;;) {
        if (a === null) return;
        var i = a.tag;
        if (i === 3 || i === 4) {
          var r = a.stateNode.containerInfo;
          if (r === u) break;
          if (i === 4)
            for (i = a.return; i !== null; ) {
              var h = i.tag;
              if ((h === 3 || h === 4) && i.stateNode.containerInfo === u) return;
              i = i.return;
            }
          for (; r !== null; ) {
            if (((i = ke(r)), i === null)) return;
            if (((h = i.tag), h === 5 || h === 6 || h === 26 || h === 27)) {
              a = n = i;
              continue t;
            }
            r = r.parentNode;
          }
        }
        a = a.return;
      }
    gr(function () {
      var T = n,
        _ = zi(e),
        N = [];
      t: {
        var z = Kr.get(t);
        if (z !== void 0) {
          var R = $u,
            L = t;
          switch (t) {
            case 'keypress':
              if (Ju(e) === 0) break t;
            case 'keydown':
            case 'keyup':
              R = mm;
              break;
            case 'focusin':
              ((L = 'focus'), (R = Di));
              break;
            case 'focusout':
              ((L = 'blur'), (R = Di));
              break;
            case 'beforeblur':
            case 'afterblur':
              R = Di;
              break;
            case 'click':
              if (e.button === 2) break t;
            case 'auxclick':
            case 'dblclick':
            case 'mousedown':
            case 'mousemove':
            case 'mouseup':
            case 'mouseout':
            case 'mouseover':
            case 'contextmenu':
              R = br;
              break;
            case 'drag':
            case 'dragend':
            case 'dragenter':
            case 'dragexit':
            case 'dragleave':
            case 'dragover':
            case 'dragstart':
            case 'drop':
              R = em;
              break;
            case 'touchcancel':
            case 'touchend':
            case 'touchmove':
            case 'touchstart':
              R = gm;
              break;
            case Xr:
            case Qr:
            case Zr:
              R = nm;
              break;
            case Vr:
              R = pm;
              break;
            case 'scroll':
            case 'scrollend':
              R = tm;
              break;
            case 'wheel':
              R = Em;
              break;
            case 'copy':
            case 'cut':
            case 'paste':
              R = fm;
              break;
            case 'gotpointercapture':
            case 'lostpointercapture':
            case 'pointercancel':
            case 'pointerdown':
            case 'pointermove':
            case 'pointerout':
            case 'pointerover':
            case 'pointerup':
              R = Tr;
              break;
            case 'toggle':
            case 'beforetoggle':
              R = zm;
          }
          var J = (l & 4) !== 0,
            St = !J && (t === 'scroll' || t === 'scrollend'),
            S = J ? (z !== null ? z + 'Capture' : null) : z;
          J = [];
          for (var m = T, E; m !== null; ) {
            var U = m;
            if (
              ((E = U.stateNode),
              (U = U.tag),
              (U !== 5 && U !== 26 && U !== 27) ||
                E === null ||
                S === null ||
                ((U = Xa(m, S)), U != null && J.push(bu(m, U, E))),
              St)
            )
              break;
            m = m.return;
          }
          0 < J.length && ((z = new R(z, L, null, e, _)), N.push({ event: z, listeners: J }));
        }
      }
      if ((l & 7) === 0) {
        t: {
          if (
            ((z = t === 'mouseover' || t === 'pointerover'),
            (R = t === 'mouseout' || t === 'pointerout'),
            z && e !== Ti && (L = e.relatedTarget || e.fromElement) && (ke(L) || L[We]))
          )
            break t;
          if (
            (R || z) &&
            ((z =
              _.window === _
                ? _
                : (z = _.ownerDocument)
                  ? z.defaultView || z.parentWindow
                  : window),
            R
              ? ((L = e.relatedTarget || e.toElement),
                (R = T),
                (L = L ? ke(L) : null),
                L !== null &&
                  ((St = y(L)), (J = L.tag), L !== St || (J !== 5 && J !== 27 && J !== 6)) &&
                  (L = null))
              : ((R = null), (L = T)),
            R !== L)
          ) {
            if (
              ((J = br),
              (U = 'onMouseLeave'),
              (S = 'onMouseEnter'),
              (m = 'mouse'),
              (t === 'pointerout' || t === 'pointerover') &&
                ((J = Tr), (U = 'onPointerLeave'), (S = 'onPointerEnter'), (m = 'pointer')),
              (St = R == null ? z : Ga(R)),
              (E = L == null ? z : Ga(L)),
              (z = new J(U, m + 'leave', R, e, _)),
              (z.target = St),
              (z.relatedTarget = E),
              (U = null),
              ke(_) === T &&
                ((J = new J(S, m + 'enter', L, e, _)),
                (J.target = E),
                (J.relatedTarget = St),
                (U = J)),
              (St = U),
              R && L)
            )
              l: {
                for (J = Ty, S = R, m = L, E = 0, U = S; U; U = J(U)) E++;
                U = 0;
                for (var Z = m; Z; Z = J(Z)) U++;
                for (; 0 < E - U; ) ((S = J(S)), E--);
                for (; 0 < U - E; ) ((m = J(m)), U--);
                for (; E--; ) {
                  if (S === m || (m !== null && S === m.alternate)) {
                    J = S;
                    break l;
                  }
                  ((S = J(S)), (m = J(m)));
                }
                J = null;
              }
            else J = null;
            (R !== null && md(N, z, R, J, !1), L !== null && St !== null && md(N, St, L, J, !0));
          }
        }
        t: {
          if (
            ((z = T ? Ga(T) : window),
            (R = z.nodeName && z.nodeName.toLowerCase()),
            R === 'select' || (R === 'input' && z.type === 'file'))
          )
            var ft = Ur;
          else if (Mr(z))
            if (Cr) ft = Hm;
            else {
              ft = Cm;
              var Q = Um;
            }
          else
            ((R = z.nodeName),
              !R || R.toLowerCase() !== 'input' || (z.type !== 'checkbox' && z.type !== 'radio')
                ? T && Ei(T.elementType) && (ft = Ur)
                : (ft = Nm));
          if (ft && (ft = ft(t, T))) {
            Dr(N, ft, e, _);
            break t;
          }
          (Q && Q(t, z, T),
            t === 'focusout' &&
              T &&
              z.type === 'number' &&
              T.memoizedProps.value != null &&
              bi(z, 'number', z.value));
        }
        switch (((Q = T ? Ga(T) : window), t)) {
          case 'focusin':
            (Mr(Q) || Q.contentEditable === 'true') && ((na = Q), (Bi = T), (Wa = null));
            break;
          case 'focusout':
            Wa = Bi = na = null;
            break;
          case 'mousedown':
            qi = !0;
            break;
          case 'contextmenu':
          case 'mouseup':
          case 'dragend':
            ((qi = !1), jr(N, e, _));
            break;
          case 'selectionchange':
            if (Bm) break;
          case 'keydown':
          case 'keyup':
            jr(N, e, _);
        }
        var tt;
        if (Ci)
          t: {
            switch (t) {
              case 'compositionstart':
                var nt = 'onCompositionStart';
                break t;
              case 'compositionend':
                nt = 'onCompositionEnd';
                break t;
              case 'compositionupdate':
                nt = 'onCompositionUpdate';
                break t;
            }
            nt = void 0;
          }
        else
          ua
            ? _r(t, e) && (nt = 'onCompositionEnd')
            : t === 'keydown' && e.keyCode === 229 && (nt = 'onCompositionStart');
        (nt &&
          (zr &&
            e.locale !== 'ko' &&
            (ua || nt !== 'onCompositionStart'
              ? nt === 'onCompositionEnd' && ua && (tt = Sr())
              : ((fe = _), (_i = 'value' in fe ? fe.value : fe.textContent), (ua = !0))),
          (Q = jn(T, nt)),
          0 < Q.length &&
            ((nt = new Er(nt, t, null, e, _)),
            N.push({ event: nt, listeners: Q }),
            tt ? (nt.data = tt) : ((tt = Or(e)), tt !== null && (nt.data = tt)))),
          (tt = Rm ? _m(t, e) : Om(t, e)) &&
            ((nt = jn(T, 'onBeforeInput')),
            0 < nt.length &&
              ((Q = new Er('onBeforeInput', 'beforeinput', null, e, _)),
              N.push({ event: Q, listeners: nt }),
              (Q.data = tt))),
          Sy(N, t, T, e, _));
      }
      dd(N, l);
    });
  }
  function bu(t, l, e) {
    return { instance: t, listener: l, currentTarget: e };
  }
  function jn(t, l) {
    for (var e = l + 'Capture', a = []; t !== null; ) {
      var u = t,
        n = u.stateNode;
      if (
        ((u = u.tag),
        (u !== 5 && u !== 26 && u !== 27) ||
          n === null ||
          ((u = Xa(t, e)),
          u != null && a.unshift(bu(t, u, n)),
          (u = Xa(t, l)),
          u != null && a.push(bu(t, u, n))),
        t.tag === 3)
      )
        return a;
      t = t.return;
    }
    return [];
  }
  function Ty(t) {
    if (t === null) return null;
    do t = t.return;
    while (t && t.tag !== 5 && t.tag !== 27);
    return t || null;
  }
  function md(t, l, e, a, u) {
    for (var n = l._reactName, i = []; e !== null && e !== a; ) {
      var r = e,
        h = r.alternate,
        T = r.stateNode;
      if (((r = r.tag), h !== null && h === a)) break;
      ((r !== 5 && r !== 26 && r !== 27) ||
        T === null ||
        ((h = T),
        u
          ? ((T = Xa(e, n)), T != null && i.unshift(bu(e, T, h)))
          : u || ((T = Xa(e, n)), T != null && i.push(bu(e, T, h)))),
        (e = e.return));
    }
    i.length !== 0 && t.push({ event: l, listeners: i });
  }
  var zy = /\r\n?/g,
    Ay = /\u0000|\uFFFD/g;
  function yd(t) {
    return (typeof t == 'string' ? t : '' + t)
      .replace(
        zy,
        `
`
      )
      .replace(Ay, '');
  }
  function vd(t, l) {
    return ((l = yd(l)), yd(t) === l);
  }
  function gt(t, l, e, a, u, n) {
    switch (e) {
      case 'children':
        typeof a == 'string'
          ? l === 'body' || (l === 'textarea' && a === '') || la(t, a)
          : (typeof a == 'number' || typeof a == 'bigint') && l !== 'body' && la(t, '' + a);
        break;
      case 'className':
        Qu(t, 'class', a);
        break;
      case 'tabIndex':
        Qu(t, 'tabindex', a);
        break;
      case 'dir':
      case 'role':
      case 'viewBox':
      case 'width':
      case 'height':
        Qu(t, e, a);
        break;
      case 'style':
        yr(t, a, n);
        break;
      case 'data':
        if (l !== 'object') {
          Qu(t, 'data', a);
          break;
        }
      case 'src':
      case 'href':
        if (a === '' && (l !== 'a' || e !== 'href')) {
          t.removeAttribute(e);
          break;
        }
        if (a == null || typeof a == 'function' || typeof a == 'symbol' || typeof a == 'boolean') {
          t.removeAttribute(e);
          break;
        }
        ((a = Vu('' + a)), t.setAttribute(e, a));
        break;
      case 'action':
      case 'formAction':
        if (typeof a == 'function') {
          t.setAttribute(
            e,
            "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')"
          );
          break;
        } else
          typeof n == 'function' &&
            (e === 'formAction'
              ? (l !== 'input' && gt(t, l, 'name', u.name, u, null),
                gt(t, l, 'formEncType', u.formEncType, u, null),
                gt(t, l, 'formMethod', u.formMethod, u, null),
                gt(t, l, 'formTarget', u.formTarget, u, null))
              : (gt(t, l, 'encType', u.encType, u, null),
                gt(t, l, 'method', u.method, u, null),
                gt(t, l, 'target', u.target, u, null)));
        if (a == null || typeof a == 'symbol' || typeof a == 'boolean') {
          t.removeAttribute(e);
          break;
        }
        ((a = Vu('' + a)), t.setAttribute(e, a));
        break;
      case 'onClick':
        a != null && (t.onclick = jl);
        break;
      case 'onScroll':
        a != null && at('scroll', t);
        break;
      case 'onScrollEnd':
        a != null && at('scrollend', t);
        break;
      case 'dangerouslySetInnerHTML':
        if (a != null) {
          if (typeof a != 'object' || !('__html' in a)) throw Error(c(61));
          if (((e = a.__html), e != null)) {
            if (u.children != null) throw Error(c(60));
            t.innerHTML = e;
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
        ((e = Vu('' + a)), t.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', e));
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
          ? t.setAttribute(e, '' + a)
          : t.removeAttribute(e);
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
          ? t.setAttribute(e, '')
          : t.removeAttribute(e);
        break;
      case 'capture':
      case 'download':
        a === !0
          ? t.setAttribute(e, '')
          : a !== !1 && a != null && typeof a != 'function' && typeof a != 'symbol'
            ? t.setAttribute(e, a)
            : t.removeAttribute(e);
        break;
      case 'cols':
      case 'rows':
      case 'size':
      case 'span':
        a != null && typeof a != 'function' && typeof a != 'symbol' && !isNaN(a) && 1 <= a
          ? t.setAttribute(e, a)
          : t.removeAttribute(e);
        break;
      case 'rowSpan':
      case 'start':
        a == null || typeof a == 'function' || typeof a == 'symbol' || isNaN(a)
          ? t.removeAttribute(e)
          : t.setAttribute(e, a);
        break;
      case 'popover':
        (at('beforetoggle', t), at('toggle', t), Xu(t, 'popover', a));
        break;
      case 'xlinkActuate':
        Ll(t, 'http://www.w3.org/1999/xlink', 'xlink:actuate', a);
        break;
      case 'xlinkArcrole':
        Ll(t, 'http://www.w3.org/1999/xlink', 'xlink:arcrole', a);
        break;
      case 'xlinkRole':
        Ll(t, 'http://www.w3.org/1999/xlink', 'xlink:role', a);
        break;
      case 'xlinkShow':
        Ll(t, 'http://www.w3.org/1999/xlink', 'xlink:show', a);
        break;
      case 'xlinkTitle':
        Ll(t, 'http://www.w3.org/1999/xlink', 'xlink:title', a);
        break;
      case 'xlinkType':
        Ll(t, 'http://www.w3.org/1999/xlink', 'xlink:type', a);
        break;
      case 'xmlBase':
        Ll(t, 'http://www.w3.org/XML/1998/namespace', 'xml:base', a);
        break;
      case 'xmlLang':
        Ll(t, 'http://www.w3.org/XML/1998/namespace', 'xml:lang', a);
        break;
      case 'xmlSpace':
        Ll(t, 'http://www.w3.org/XML/1998/namespace', 'xml:space', a);
        break;
      case 'is':
        Xu(t, 'is', a);
        break;
      case 'innerText':
      case 'textContent':
        break;
      default:
        (!(2 < e.length) || (e[0] !== 'o' && e[0] !== 'O') || (e[1] !== 'n' && e[1] !== 'N')) &&
          ((e = Ih.get(e) || e), Xu(t, e, a));
    }
  }
  function cc(t, l, e, a, u, n) {
    switch (e) {
      case 'style':
        yr(t, a, n);
        break;
      case 'dangerouslySetInnerHTML':
        if (a != null) {
          if (typeof a != 'object' || !('__html' in a)) throw Error(c(61));
          if (((e = a.__html), e != null)) {
            if (u.children != null) throw Error(c(60));
            t.innerHTML = e;
          }
        }
        break;
      case 'children':
        typeof a == 'string'
          ? la(t, a)
          : (typeof a == 'number' || typeof a == 'bigint') && la(t, '' + a);
        break;
      case 'onScroll':
        a != null && at('scroll', t);
        break;
      case 'onScrollEnd':
        a != null && at('scrollend', t);
        break;
      case 'onClick':
        a != null && (t.onclick = jl);
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
        if (!ir.hasOwnProperty(e))
          t: {
            if (
              e[0] === 'o' &&
              e[1] === 'n' &&
              ((u = e.endsWith('Capture')),
              (l = e.slice(2, u ? e.length - 7 : void 0)),
              (n = t[kt] || null),
              (n = n != null ? n[e] : null),
              typeof n == 'function' && t.removeEventListener(l, n, u),
              typeof a == 'function')
            ) {
              (typeof n != 'function' &&
                n !== null &&
                (e in t ? (t[e] = null) : t.hasAttribute(e) && t.removeAttribute(e)),
                t.addEventListener(l, a, u));
              break t;
            }
            e in t ? (t[e] = a) : a === !0 ? t.setAttribute(e, '') : Xu(t, e, a);
          }
    }
  }
  function Vt(t, l, e) {
    switch (l) {
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
        (at('error', t), at('load', t));
        var a = !1,
          u = !1,
          n;
        for (n in e)
          if (e.hasOwnProperty(n)) {
            var i = e[n];
            if (i != null)
              switch (n) {
                case 'src':
                  a = !0;
                  break;
                case 'srcSet':
                  u = !0;
                  break;
                case 'children':
                case 'dangerouslySetInnerHTML':
                  throw Error(c(137, l));
                default:
                  gt(t, l, n, i, e, null);
              }
          }
        (u && gt(t, l, 'srcSet', e.srcSet, e, null), a && gt(t, l, 'src', e.src, e, null));
        return;
      case 'input':
        at('invalid', t);
        var r = (n = i = u = null),
          h = null,
          T = null;
        for (a in e)
          if (e.hasOwnProperty(a)) {
            var _ = e[a];
            if (_ != null)
              switch (a) {
                case 'name':
                  u = _;
                  break;
                case 'type':
                  i = _;
                  break;
                case 'checked':
                  h = _;
                  break;
                case 'defaultChecked':
                  T = _;
                  break;
                case 'value':
                  n = _;
                  break;
                case 'defaultValue':
                  r = _;
                  break;
                case 'children':
                case 'dangerouslySetInnerHTML':
                  if (_ != null) throw Error(c(137, l));
                  break;
                default:
                  gt(t, l, a, _, e, null);
              }
          }
        sr(t, n, r, h, T, i, u, !1);
        return;
      case 'select':
        (at('invalid', t), (a = i = n = null));
        for (u in e)
          if (e.hasOwnProperty(u) && ((r = e[u]), r != null))
            switch (u) {
              case 'value':
                n = r;
                break;
              case 'defaultValue':
                i = r;
                break;
              case 'multiple':
                a = r;
              default:
                gt(t, l, u, r, e, null);
            }
        ((l = n),
          (e = i),
          (t.multiple = !!a),
          l != null ? ta(t, !!a, l, !1) : e != null && ta(t, !!a, e, !0));
        return;
      case 'textarea':
        (at('invalid', t), (n = u = a = null));
        for (i in e)
          if (e.hasOwnProperty(i) && ((r = e[i]), r != null))
            switch (i) {
              case 'value':
                a = r;
                break;
              case 'defaultValue':
                u = r;
                break;
              case 'children':
                n = r;
                break;
              case 'dangerouslySetInnerHTML':
                if (r != null) throw Error(c(91));
                break;
              default:
                gt(t, l, i, r, e, null);
            }
        hr(t, a, u, n);
        return;
      case 'option':
        for (h in e)
          if (e.hasOwnProperty(h) && ((a = e[h]), a != null))
            switch (h) {
              case 'selected':
                t.selected = a && typeof a != 'function' && typeof a != 'symbol';
                break;
              default:
                gt(t, l, h, a, e, null);
            }
        return;
      case 'dialog':
        (at('beforetoggle', t), at('toggle', t), at('cancel', t), at('close', t));
        break;
      case 'iframe':
      case 'object':
        at('load', t);
        break;
      case 'video':
      case 'audio':
        for (a = 0; a < pu.length; a++) at(pu[a], t);
        break;
      case 'image':
        (at('error', t), at('load', t));
        break;
      case 'details':
        at('toggle', t);
        break;
      case 'embed':
      case 'source':
      case 'link':
        (at('error', t), at('load', t));
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
        for (T in e)
          if (e.hasOwnProperty(T) && ((a = e[T]), a != null))
            switch (T) {
              case 'children':
              case 'dangerouslySetInnerHTML':
                throw Error(c(137, l));
              default:
                gt(t, l, T, a, e, null);
            }
        return;
      default:
        if (Ei(l)) {
          for (_ in e)
            e.hasOwnProperty(_) && ((a = e[_]), a !== void 0 && cc(t, l, _, a, e, void 0));
          return;
        }
    }
    for (r in e) e.hasOwnProperty(r) && ((a = e[r]), a != null && gt(t, l, r, a, e, null));
  }
  function Ry(t, l, e, a) {
    switch (l) {
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
          n = null,
          i = null,
          r = null,
          h = null,
          T = null,
          _ = null;
        for (R in e) {
          var N = e[R];
          if (e.hasOwnProperty(R) && N != null)
            switch (R) {
              case 'checked':
                break;
              case 'value':
                break;
              case 'defaultValue':
                h = N;
              default:
                a.hasOwnProperty(R) || gt(t, l, R, null, a, N);
            }
        }
        for (var z in a) {
          var R = a[z];
          if (((N = e[z]), a.hasOwnProperty(z) && (R != null || N != null)))
            switch (z) {
              case 'type':
                n = R;
                break;
              case 'name':
                u = R;
                break;
              case 'checked':
                T = R;
                break;
              case 'defaultChecked':
                _ = R;
                break;
              case 'value':
                i = R;
                break;
              case 'defaultValue':
                r = R;
                break;
              case 'children':
              case 'dangerouslySetInnerHTML':
                if (R != null) throw Error(c(137, l));
                break;
              default:
                R !== N && gt(t, l, z, R, a, N);
            }
        }
        pi(t, i, r, h, T, _, n, u);
        return;
      case 'select':
        R = i = r = z = null;
        for (n in e)
          if (((h = e[n]), e.hasOwnProperty(n) && h != null))
            switch (n) {
              case 'value':
                break;
              case 'multiple':
                R = h;
              default:
                a.hasOwnProperty(n) || gt(t, l, n, null, a, h);
            }
        for (u in a)
          if (((n = a[u]), (h = e[u]), a.hasOwnProperty(u) && (n != null || h != null)))
            switch (u) {
              case 'value':
                z = n;
                break;
              case 'defaultValue':
                r = n;
                break;
              case 'multiple':
                i = n;
              default:
                n !== h && gt(t, l, u, n, a, h);
            }
        ((l = r),
          (e = i),
          (a = R),
          z != null
            ? ta(t, !!e, z, !1)
            : !!a != !!e && (l != null ? ta(t, !!e, l, !0) : ta(t, !!e, e ? [] : '', !1)));
        return;
      case 'textarea':
        R = z = null;
        for (r in e)
          if (((u = e[r]), e.hasOwnProperty(r) && u != null && !a.hasOwnProperty(r)))
            switch (r) {
              case 'value':
                break;
              case 'children':
                break;
              default:
                gt(t, l, r, null, a, u);
            }
        for (i in a)
          if (((u = a[i]), (n = e[i]), a.hasOwnProperty(i) && (u != null || n != null)))
            switch (i) {
              case 'value':
                z = u;
                break;
              case 'defaultValue':
                R = u;
                break;
              case 'children':
                break;
              case 'dangerouslySetInnerHTML':
                if (u != null) throw Error(c(91));
                break;
              default:
                u !== n && gt(t, l, i, u, a, n);
            }
        dr(t, z, R);
        return;
      case 'option':
        for (var L in e)
          if (((z = e[L]), e.hasOwnProperty(L) && z != null && !a.hasOwnProperty(L)))
            switch (L) {
              case 'selected':
                t.selected = !1;
                break;
              default:
                gt(t, l, L, null, a, z);
            }
        for (h in a)
          if (((z = a[h]), (R = e[h]), a.hasOwnProperty(h) && z !== R && (z != null || R != null)))
            switch (h) {
              case 'selected':
                t.selected = z && typeof z != 'function' && typeof z != 'symbol';
                break;
              default:
                gt(t, l, h, z, a, R);
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
        for (var J in e)
          ((z = e[J]),
            e.hasOwnProperty(J) && z != null && !a.hasOwnProperty(J) && gt(t, l, J, null, a, z));
        for (T in a)
          if (((z = a[T]), (R = e[T]), a.hasOwnProperty(T) && z !== R && (z != null || R != null)))
            switch (T) {
              case 'children':
              case 'dangerouslySetInnerHTML':
                if (z != null) throw Error(c(137, l));
                break;
              default:
                gt(t, l, T, z, a, R);
            }
        return;
      default:
        if (Ei(l)) {
          for (var St in e)
            ((z = e[St]),
              e.hasOwnProperty(St) &&
                z !== void 0 &&
                !a.hasOwnProperty(St) &&
                cc(t, l, St, void 0, a, z));
          for (_ in a)
            ((z = a[_]),
              (R = e[_]),
              !a.hasOwnProperty(_) ||
                z === R ||
                (z === void 0 && R === void 0) ||
                cc(t, l, _, z, a, R));
          return;
        }
    }
    for (var S in e)
      ((z = e[S]),
        e.hasOwnProperty(S) && z != null && !a.hasOwnProperty(S) && gt(t, l, S, null, a, z));
    for (N in a)
      ((z = a[N]),
        (R = e[N]),
        !a.hasOwnProperty(N) || z === R || (z == null && R == null) || gt(t, l, N, z, a, R));
  }
  function gd(t) {
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
  function _y() {
    if (typeof performance.getEntriesByType == 'function') {
      for (
        var t = 0, l = 0, e = performance.getEntriesByType('resource'), a = 0;
        a < e.length;
        a++
      ) {
        var u = e[a],
          n = u.transferSize,
          i = u.initiatorType,
          r = u.duration;
        if (n && r && gd(i)) {
          for (i = 0, r = u.responseEnd, a += 1; a < e.length; a++) {
            var h = e[a],
              T = h.startTime;
            if (T > r) break;
            var _ = h.transferSize,
              N = h.initiatorType;
            _ && gd(N) && ((h = h.responseEnd), (i += _ * (h < r ? 1 : (r - T) / (h - T))));
          }
          if ((--a, (l += (8 * (n + i)) / (u.duration / 1e3)), t++, 10 < t)) break;
        }
      }
      if (0 < t) return l / t / 1e6;
    }
    return navigator.connection && ((t = navigator.connection.downlink), typeof t == 'number')
      ? t
      : 5;
  }
  var rc = null,
    oc = null;
  function Gn(t) {
    return t.nodeType === 9 ? t : t.ownerDocument;
  }
  function Sd(t) {
    switch (t) {
      case 'http://www.w3.org/2000/svg':
        return 1;
      case 'http://www.w3.org/1998/Math/MathML':
        return 2;
      default:
        return 0;
    }
  }
  function pd(t, l) {
    if (t === 0)
      switch (l) {
        case 'svg':
          return 1;
        case 'math':
          return 2;
        default:
          return 0;
      }
    return t === 1 && l === 'foreignObject' ? 0 : t;
  }
  function sc(t, l) {
    return (
      t === 'textarea' ||
      t === 'noscript' ||
      typeof l.children == 'string' ||
      typeof l.children == 'number' ||
      typeof l.children == 'bigint' ||
      (typeof l.dangerouslySetInnerHTML == 'object' &&
        l.dangerouslySetInnerHTML !== null &&
        l.dangerouslySetInnerHTML.__html != null)
    );
  }
  var dc = null;
  function Oy() {
    var t = window.event;
    return t && t.type === 'popstate' ? (t === dc ? !1 : ((dc = t), !0)) : ((dc = null), !1);
  }
  var bd = typeof setTimeout == 'function' ? setTimeout : void 0,
    My = typeof clearTimeout == 'function' ? clearTimeout : void 0,
    Ed = typeof Promise == 'function' ? Promise : void 0,
    Dy =
      typeof queueMicrotask == 'function'
        ? queueMicrotask
        : typeof Ed < 'u'
          ? function (t) {
              return Ed.resolve(null).then(t).catch(Uy);
            }
          : bd;
  function Uy(t) {
    setTimeout(function () {
      throw t;
    });
  }
  function Ae(t) {
    return t === 'head';
  }
  function Td(t, l) {
    var e = l,
      a = 0;
    do {
      var u = e.nextSibling;
      if ((t.removeChild(e), u && u.nodeType === 8))
        if (((e = u.data), e === '/$' || e === '/&')) {
          if (a === 0) {
            (t.removeChild(u), Na(l));
            return;
          }
          a--;
        } else if (e === '$' || e === '$?' || e === '$~' || e === '$!' || e === '&') a++;
        else if (e === 'html') Eu(t.ownerDocument.documentElement);
        else if (e === 'head') {
          ((e = t.ownerDocument.head), Eu(e));
          for (var n = e.firstChild; n; ) {
            var i = n.nextSibling,
              r = n.nodeName;
            (n[ja] ||
              r === 'SCRIPT' ||
              r === 'STYLE' ||
              (r === 'LINK' && n.rel.toLowerCase() === 'stylesheet') ||
              e.removeChild(n),
              (n = i));
          }
        } else e === 'body' && Eu(t.ownerDocument.body);
      e = u;
    } while (e);
    Na(l);
  }
  function zd(t, l) {
    var e = t;
    t = 0;
    do {
      var a = e.nextSibling;
      if (
        (e.nodeType === 1
          ? l
            ? ((e._stashedDisplay = e.style.display), (e.style.display = 'none'))
            : ((e.style.display = e._stashedDisplay || ''),
              e.getAttribute('style') === '' && e.removeAttribute('style'))
          : e.nodeType === 3 &&
            (l
              ? ((e._stashedText = e.nodeValue), (e.nodeValue = ''))
              : (e.nodeValue = e._stashedText || '')),
        a && a.nodeType === 8)
      )
        if (((e = a.data), e === '/$')) {
          if (t === 0) break;
          t--;
        } else (e !== '$' && e !== '$?' && e !== '$~' && e !== '$!') || t++;
      e = a;
    } while (e);
  }
  function hc(t) {
    var l = t.firstChild;
    for (l && l.nodeType === 10 && (l = l.nextSibling); l; ) {
      var e = l;
      switch (((l = l.nextSibling), e.nodeName)) {
        case 'HTML':
        case 'HEAD':
        case 'BODY':
          (hc(e), gi(e));
          continue;
        case 'SCRIPT':
        case 'STYLE':
          continue;
        case 'LINK':
          if (e.rel.toLowerCase() === 'stylesheet') continue;
      }
      t.removeChild(e);
    }
  }
  function Cy(t, l, e, a) {
    for (; t.nodeType === 1; ) {
      var u = e;
      if (t.nodeName.toLowerCase() !== l.toLowerCase()) {
        if (!a && (t.nodeName !== 'INPUT' || t.type !== 'hidden')) break;
      } else if (a) {
        if (!t[ja])
          switch (l) {
            case 'meta':
              if (!t.hasAttribute('itemprop')) break;
              return t;
            case 'link':
              if (
                ((n = t.getAttribute('rel')),
                n === 'stylesheet' && t.hasAttribute('data-precedence'))
              )
                break;
              if (
                n !== u.rel ||
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
                ((n = t.getAttribute('src')),
                (n !== (u.src == null ? null : u.src) ||
                  t.getAttribute('type') !== (u.type == null ? null : u.type) ||
                  t.getAttribute('crossorigin') !==
                    (u.crossOrigin == null ? null : u.crossOrigin)) &&
                  n &&
                  t.hasAttribute('async') &&
                  !t.hasAttribute('itemprop'))
              )
                break;
              return t;
            default:
              return t;
          }
      } else if (l === 'input' && t.type === 'hidden') {
        var n = u.name == null ? null : '' + u.name;
        if (u.type === 'hidden' && t.getAttribute('name') === n) return t;
      } else return t;
      if (((t = zl(t.nextSibling)), t === null)) break;
    }
    return null;
  }
  function Ny(t, l, e) {
    if (l === '') return null;
    for (; t.nodeType !== 3; )
      if (
        ((t.nodeType !== 1 || t.nodeName !== 'INPUT' || t.type !== 'hidden') && !e) ||
        ((t = zl(t.nextSibling)), t === null)
      )
        return null;
    return t;
  }
  function Ad(t, l) {
    for (; t.nodeType !== 8; )
      if (
        ((t.nodeType !== 1 || t.nodeName !== 'INPUT' || t.type !== 'hidden') && !l) ||
        ((t = zl(t.nextSibling)), t === null)
      )
        return null;
    return t;
  }
  function mc(t) {
    return t.data === '$?' || t.data === '$~';
  }
  function yc(t) {
    return t.data === '$!' || (t.data === '$?' && t.ownerDocument.readyState !== 'loading');
  }
  function Hy(t, l) {
    var e = t.ownerDocument;
    if (t.data === '$~') t._reactRetry = l;
    else if (t.data !== '$?' || e.readyState !== 'loading') l();
    else {
      var a = function () {
        (l(), e.removeEventListener('DOMContentLoaded', a));
      };
      (e.addEventListener('DOMContentLoaded', a), (t._reactRetry = a));
    }
  }
  function zl(t) {
    for (; t != null; t = t.nextSibling) {
      var l = t.nodeType;
      if (l === 1 || l === 3) break;
      if (l === 8) {
        if (
          ((l = t.data),
          l === '$' ||
            l === '$!' ||
            l === '$?' ||
            l === '$~' ||
            l === '&' ||
            l === 'F!' ||
            l === 'F')
        )
          break;
        if (l === '/$' || l === '/&') return null;
      }
    }
    return t;
  }
  var vc = null;
  function Rd(t) {
    t = t.nextSibling;
    for (var l = 0; t; ) {
      if (t.nodeType === 8) {
        var e = t.data;
        if (e === '/$' || e === '/&') {
          if (l === 0) return zl(t.nextSibling);
          l--;
        } else (e !== '$' && e !== '$!' && e !== '$?' && e !== '$~' && e !== '&') || l++;
      }
      t = t.nextSibling;
    }
    return null;
  }
  function _d(t) {
    t = t.previousSibling;
    for (var l = 0; t; ) {
      if (t.nodeType === 8) {
        var e = t.data;
        if (e === '$' || e === '$!' || e === '$?' || e === '$~' || e === '&') {
          if (l === 0) return t;
          l--;
        } else (e !== '/$' && e !== '/&') || l++;
      }
      t = t.previousSibling;
    }
    return null;
  }
  function Od(t, l, e) {
    switch (((l = Gn(e)), t)) {
      case 'html':
        if (((t = l.documentElement), !t)) throw Error(c(452));
        return t;
      case 'head':
        if (((t = l.head), !t)) throw Error(c(453));
        return t;
      case 'body':
        if (((t = l.body), !t)) throw Error(c(454));
        return t;
      default:
        throw Error(c(451));
    }
  }
  function Eu(t) {
    for (var l = t.attributes; l.length; ) t.removeAttributeNode(l[0]);
    gi(t);
  }
  var Al = new Map(),
    Md = new Set();
  function Xn(t) {
    return typeof t.getRootNode == 'function'
      ? t.getRootNode()
      : t.nodeType === 9
        ? t
        : t.ownerDocument;
  }
  var le = B.d;
  B.d = { f: xy, r: By, D: qy, C: Yy, L: Ly, m: jy, X: Xy, S: Gy, M: Qy };
  function xy() {
    var t = le.f(),
      l = Nn();
    return t || l;
  }
  function By(t) {
    var l = Fe(t);
    l !== null && l.tag === 5 && l.type === 'form' ? Ko(l) : le.r(t);
  }
  var Da = typeof document > 'u' ? null : document;
  function Dd(t, l, e) {
    var a = Da;
    if (a && typeof l == 'string' && l) {
      var u = vl(l);
      ((u = 'link[rel="' + t + '"][href="' + u + '"]'),
        typeof e == 'string' && (u += '[crossorigin="' + e + '"]'),
        Md.has(u) ||
          (Md.add(u),
          (t = { rel: t, crossOrigin: e, href: l }),
          a.querySelector(u) === null &&
            ((l = a.createElement('link')), Vt(l, 'link', t), Lt(l), a.head.appendChild(l))));
    }
  }
  function qy(t) {
    (le.D(t), Dd('dns-prefetch', t, null));
  }
  function Yy(t, l) {
    (le.C(t, l), Dd('preconnect', t, l));
  }
  function Ly(t, l, e) {
    le.L(t, l, e);
    var a = Da;
    if (a && t && l) {
      var u = 'link[rel="preload"][as="' + vl(l) + '"]';
      l === 'image' && e && e.imageSrcSet
        ? ((u += '[imagesrcset="' + vl(e.imageSrcSet) + '"]'),
          typeof e.imageSizes == 'string' && (u += '[imagesizes="' + vl(e.imageSizes) + '"]'))
        : (u += '[href="' + vl(t) + '"]');
      var n = u;
      switch (l) {
        case 'style':
          n = Ua(t);
          break;
        case 'script':
          n = Ca(t);
      }
      Al.has(n) ||
        ((t = A(
          { rel: 'preload', href: l === 'image' && e && e.imageSrcSet ? void 0 : t, as: l },
          e
        )),
        Al.set(n, t),
        a.querySelector(u) !== null ||
          (l === 'style' && a.querySelector(Tu(n))) ||
          (l === 'script' && a.querySelector(zu(n))) ||
          ((l = a.createElement('link')), Vt(l, 'link', t), Lt(l), a.head.appendChild(l)));
    }
  }
  function jy(t, l) {
    le.m(t, l);
    var e = Da;
    if (e && t) {
      var a = l && typeof l.as == 'string' ? l.as : 'script',
        u = 'link[rel="modulepreload"][as="' + vl(a) + '"][href="' + vl(t) + '"]',
        n = u;
      switch (a) {
        case 'audioworklet':
        case 'paintworklet':
        case 'serviceworker':
        case 'sharedworker':
        case 'worker':
        case 'script':
          n = Ca(t);
      }
      if (
        !Al.has(n) &&
        ((t = A({ rel: 'modulepreload', href: t }, l)), Al.set(n, t), e.querySelector(u) === null)
      ) {
        switch (a) {
          case 'audioworklet':
          case 'paintworklet':
          case 'serviceworker':
          case 'sharedworker':
          case 'worker':
          case 'script':
            if (e.querySelector(zu(n))) return;
        }
        ((a = e.createElement('link')), Vt(a, 'link', t), Lt(a), e.head.appendChild(a));
      }
    }
  }
  function Gy(t, l, e) {
    le.S(t, l, e);
    var a = Da;
    if (a && t) {
      var u = Ie(a).hoistableStyles,
        n = Ua(t);
      l = l || 'default';
      var i = u.get(n);
      if (!i) {
        var r = { loading: 0, preload: null };
        if ((i = a.querySelector(Tu(n)))) r.loading = 5;
        else {
          ((t = A({ rel: 'stylesheet', href: t, 'data-precedence': l }, e)),
            (e = Al.get(n)) && gc(t, e));
          var h = (i = a.createElement('link'));
          (Lt(h),
            Vt(h, 'link', t),
            (h._p = new Promise(function (T, _) {
              ((h.onload = T), (h.onerror = _));
            })),
            h.addEventListener('load', function () {
              r.loading |= 1;
            }),
            h.addEventListener('error', function () {
              r.loading |= 2;
            }),
            (r.loading |= 4),
            Qn(i, l, a));
        }
        ((i = { type: 'stylesheet', instance: i, count: 1, state: r }), u.set(n, i));
      }
    }
  }
  function Xy(t, l) {
    le.X(t, l);
    var e = Da;
    if (e && t) {
      var a = Ie(e).hoistableScripts,
        u = Ca(t),
        n = a.get(u);
      n ||
        ((n = e.querySelector(zu(u))),
        n ||
          ((t = A({ src: t, async: !0 }, l)),
          (l = Al.get(u)) && Sc(t, l),
          (n = e.createElement('script')),
          Lt(n),
          Vt(n, 'link', t),
          e.head.appendChild(n)),
        (n = { type: 'script', instance: n, count: 1, state: null }),
        a.set(u, n));
    }
  }
  function Qy(t, l) {
    le.M(t, l);
    var e = Da;
    if (e && t) {
      var a = Ie(e).hoistableScripts,
        u = Ca(t),
        n = a.get(u);
      n ||
        ((n = e.querySelector(zu(u))),
        n ||
          ((t = A({ src: t, async: !0, type: 'module' }, l)),
          (l = Al.get(u)) && Sc(t, l),
          (n = e.createElement('script')),
          Lt(n),
          Vt(n, 'link', t),
          e.head.appendChild(n)),
        (n = { type: 'script', instance: n, count: 1, state: null }),
        a.set(u, n));
    }
  }
  function Ud(t, l, e, a) {
    var u = (u = lt.current) ? Xn(u) : null;
    if (!u) throw Error(c(446));
    switch (t) {
      case 'meta':
      case 'title':
        return null;
      case 'style':
        return typeof e.precedence == 'string' && typeof e.href == 'string'
          ? ((l = Ua(e.href)),
            (e = Ie(u).hoistableStyles),
            (a = e.get(l)),
            a || ((a = { type: 'style', instance: null, count: 0, state: null }), e.set(l, a)),
            a)
          : { type: 'void', instance: null, count: 0, state: null };
      case 'link':
        if (
          e.rel === 'stylesheet' &&
          typeof e.href == 'string' &&
          typeof e.precedence == 'string'
        ) {
          t = Ua(e.href);
          var n = Ie(u).hoistableStyles,
            i = n.get(t);
          if (
            (i ||
              ((u = u.ownerDocument || u),
              (i = {
                type: 'stylesheet',
                instance: null,
                count: 0,
                state: { loading: 0, preload: null },
              }),
              n.set(t, i),
              (n = u.querySelector(Tu(t))) && !n._p && ((i.instance = n), (i.state.loading = 5)),
              Al.has(t) ||
                ((e = {
                  rel: 'preload',
                  as: 'style',
                  href: e.href,
                  crossOrigin: e.crossOrigin,
                  integrity: e.integrity,
                  media: e.media,
                  hrefLang: e.hrefLang,
                  referrerPolicy: e.referrerPolicy,
                }),
                Al.set(t, e),
                n || Zy(u, t, e, i.state))),
            l && a === null)
          )
            throw Error(c(528, ''));
          return i;
        }
        if (l && a !== null) throw Error(c(529, ''));
        return null;
      case 'script':
        return (
          (l = e.async),
          (e = e.src),
          typeof e == 'string' && l && typeof l != 'function' && typeof l != 'symbol'
            ? ((l = Ca(e)),
              (e = Ie(u).hoistableScripts),
              (a = e.get(l)),
              a || ((a = { type: 'script', instance: null, count: 0, state: null }), e.set(l, a)),
              a)
            : { type: 'void', instance: null, count: 0, state: null }
        );
      default:
        throw Error(c(444, t));
    }
  }
  function Ua(t) {
    return 'href="' + vl(t) + '"';
  }
  function Tu(t) {
    return 'link[rel="stylesheet"][' + t + ']';
  }
  function Cd(t) {
    return A({}, t, { 'data-precedence': t.precedence, precedence: null });
  }
  function Zy(t, l, e, a) {
    t.querySelector('link[rel="preload"][as="style"][' + l + ']')
      ? (a.loading = 1)
      : ((l = t.createElement('link')),
        (a.preload = l),
        l.addEventListener('load', function () {
          return (a.loading |= 1);
        }),
        l.addEventListener('error', function () {
          return (a.loading |= 2);
        }),
        Vt(l, 'link', e),
        Lt(l),
        t.head.appendChild(l));
  }
  function Ca(t) {
    return '[src="' + vl(t) + '"]';
  }
  function zu(t) {
    return 'script[async]' + t;
  }
  function Nd(t, l, e) {
    if ((l.count++, l.instance === null))
      switch (l.type) {
        case 'style':
          var a = t.querySelector('style[data-href~="' + vl(e.href) + '"]');
          if (a) return ((l.instance = a), Lt(a), a);
          var u = A({}, e, {
            'data-href': e.href,
            'data-precedence': e.precedence,
            href: null,
            precedence: null,
          });
          return (
            (a = (t.ownerDocument || t).createElement('style')),
            Lt(a),
            Vt(a, 'style', u),
            Qn(a, e.precedence, t),
            (l.instance = a)
          );
        case 'stylesheet':
          u = Ua(e.href);
          var n = t.querySelector(Tu(u));
          if (n) return ((l.state.loading |= 4), (l.instance = n), Lt(n), n);
          ((a = Cd(e)),
            (u = Al.get(u)) && gc(a, u),
            (n = (t.ownerDocument || t).createElement('link')),
            Lt(n));
          var i = n;
          return (
            (i._p = new Promise(function (r, h) {
              ((i.onload = r), (i.onerror = h));
            })),
            Vt(n, 'link', a),
            (l.state.loading |= 4),
            Qn(n, e.precedence, t),
            (l.instance = n)
          );
        case 'script':
          return (
            (n = Ca(e.src)),
            (u = t.querySelector(zu(n)))
              ? ((l.instance = u), Lt(u), u)
              : ((a = e),
                (u = Al.get(n)) && ((a = A({}, e)), Sc(a, u)),
                (t = t.ownerDocument || t),
                (u = t.createElement('script')),
                Lt(u),
                Vt(u, 'link', a),
                t.head.appendChild(u),
                (l.instance = u))
          );
        case 'void':
          return null;
        default:
          throw Error(c(443, l.type));
      }
    else
      l.type === 'stylesheet' &&
        (l.state.loading & 4) === 0 &&
        ((a = l.instance), (l.state.loading |= 4), Qn(a, e.precedence, t));
    return l.instance;
  }
  function Qn(t, l, e) {
    for (
      var a = e.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),
        u = a.length ? a[a.length - 1] : null,
        n = u,
        i = 0;
      i < a.length;
      i++
    ) {
      var r = a[i];
      if (r.dataset.precedence === l) n = r;
      else if (n !== u) break;
    }
    n
      ? n.parentNode.insertBefore(t, n.nextSibling)
      : ((l = e.nodeType === 9 ? e.head : e), l.insertBefore(t, l.firstChild));
  }
  function gc(t, l) {
    (t.crossOrigin == null && (t.crossOrigin = l.crossOrigin),
      t.referrerPolicy == null && (t.referrerPolicy = l.referrerPolicy),
      t.title == null && (t.title = l.title));
  }
  function Sc(t, l) {
    (t.crossOrigin == null && (t.crossOrigin = l.crossOrigin),
      t.referrerPolicy == null && (t.referrerPolicy = l.referrerPolicy),
      t.integrity == null && (t.integrity = l.integrity));
  }
  var Zn = null;
  function Hd(t, l, e) {
    if (Zn === null) {
      var a = new Map(),
        u = (Zn = new Map());
      u.set(e, a);
    } else ((u = Zn), (a = u.get(e)), a || ((a = new Map()), u.set(e, a)));
    if (a.has(t)) return a;
    for (a.set(t, null), e = e.getElementsByTagName(t), u = 0; u < e.length; u++) {
      var n = e[u];
      if (
        !(n[ja] || n[Gt] || (t === 'link' && n.getAttribute('rel') === 'stylesheet')) &&
        n.namespaceURI !== 'http://www.w3.org/2000/svg'
      ) {
        var i = n.getAttribute(l) || '';
        i = t + i;
        var r = a.get(i);
        r ? r.push(n) : a.set(i, [n]);
      }
    }
    return a;
  }
  function xd(t, l, e) {
    ((t = t.ownerDocument || t),
      t.head.insertBefore(e, l === 'title' ? t.querySelector('head > title') : null));
  }
  function Vy(t, l, e) {
    if (e === 1 || l.itemProp != null) return !1;
    switch (t) {
      case 'meta':
      case 'title':
        return !0;
      case 'style':
        if (typeof l.precedence != 'string' || typeof l.href != 'string' || l.href === '') break;
        return !0;
      case 'link':
        if (
          typeof l.rel != 'string' ||
          typeof l.href != 'string' ||
          l.href === '' ||
          l.onLoad ||
          l.onError
        )
          break;
        switch (l.rel) {
          case 'stylesheet':
            return ((t = l.disabled), typeof l.precedence == 'string' && t == null);
          default:
            return !0;
        }
      case 'script':
        if (
          l.async &&
          typeof l.async != 'function' &&
          typeof l.async != 'symbol' &&
          !l.onLoad &&
          !l.onError &&
          l.src &&
          typeof l.src == 'string'
        )
          return !0;
    }
    return !1;
  }
  function Bd(t) {
    return !(t.type === 'stylesheet' && (t.state.loading & 3) === 0);
  }
  function Ky(t, l, e, a) {
    if (
      e.type === 'stylesheet' &&
      (typeof a.media != 'string' || matchMedia(a.media).matches !== !1) &&
      (e.state.loading & 4) === 0
    ) {
      if (e.instance === null) {
        var u = Ua(a.href),
          n = l.querySelector(Tu(u));
        if (n) {
          ((l = n._p),
            l !== null &&
              typeof l == 'object' &&
              typeof l.then == 'function' &&
              (t.count++, (t = Vn.bind(t)), l.then(t, t)),
            (e.state.loading |= 4),
            (e.instance = n),
            Lt(n));
          return;
        }
        ((n = l.ownerDocument || l),
          (a = Cd(a)),
          (u = Al.get(u)) && gc(a, u),
          (n = n.createElement('link')),
          Lt(n));
        var i = n;
        ((i._p = new Promise(function (r, h) {
          ((i.onload = r), (i.onerror = h));
        })),
          Vt(n, 'link', a),
          (e.instance = n));
      }
      (t.stylesheets === null && (t.stylesheets = new Map()),
        t.stylesheets.set(e, l),
        (l = e.state.preload) &&
          (e.state.loading & 3) === 0 &&
          (t.count++,
          (e = Vn.bind(t)),
          l.addEventListener('load', e),
          l.addEventListener('error', e)));
    }
  }
  var pc = 0;
  function Jy(t, l) {
    return (
      t.stylesheets && t.count === 0 && Jn(t, t.stylesheets),
      0 < t.count || 0 < t.imgCount
        ? function (e) {
            var a = setTimeout(function () {
              if ((t.stylesheets && Jn(t, t.stylesheets), t.unsuspend)) {
                var n = t.unsuspend;
                ((t.unsuspend = null), n());
              }
            }, 6e4 + l);
            0 < t.imgBytes && pc === 0 && (pc = 62500 * _y());
            var u = setTimeout(
              function () {
                if (
                  ((t.waitingForImages = !1),
                  t.count === 0 && (t.stylesheets && Jn(t, t.stylesheets), t.unsuspend))
                ) {
                  var n = t.unsuspend;
                  ((t.unsuspend = null), n());
                }
              },
              (t.imgBytes > pc ? 50 : 800) + l
            );
            return (
              (t.unsuspend = e),
              function () {
                ((t.unsuspend = null), clearTimeout(a), clearTimeout(u));
              }
            );
          }
        : null
    );
  }
  function Vn() {
    if ((this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages))) {
      if (this.stylesheets) Jn(this, this.stylesheets);
      else if (this.unsuspend) {
        var t = this.unsuspend;
        ((this.unsuspend = null), t());
      }
    }
  }
  var Kn = null;
  function Jn(t, l) {
    ((t.stylesheets = null),
      t.unsuspend !== null &&
        (t.count++, (Kn = new Map()), l.forEach(wy, t), (Kn = null), Vn.call(t)));
  }
  function wy(t, l) {
    if (!(l.state.loading & 4)) {
      var e = Kn.get(t);
      if (e) var a = e.get(null);
      else {
        ((e = new Map()), Kn.set(t, e));
        for (
          var u = t.querySelectorAll('link[data-precedence],style[data-precedence]'), n = 0;
          n < u.length;
          n++
        ) {
          var i = u[n];
          (i.nodeName === 'LINK' || i.getAttribute('media') !== 'not all') &&
            (e.set(i.dataset.precedence, i), (a = i));
        }
        a && e.set(null, a);
      }
      ((u = l.instance),
        (i = u.getAttribute('data-precedence')),
        (n = e.get(i) || a),
        n === a && e.set(null, u),
        e.set(i, u),
        this.count++,
        (a = Vn.bind(this)),
        u.addEventListener('load', a),
        u.addEventListener('error', a),
        n
          ? n.parentNode.insertBefore(u, n.nextSibling)
          : ((t = t.nodeType === 9 ? t.head : t), t.insertBefore(u, t.firstChild)),
        (l.state.loading |= 4));
    }
  }
  var Au = {
    $$typeof: w,
    Provider: null,
    Consumer: null,
    _currentValue: $,
    _currentValue2: $,
    _threadCount: 0,
  };
  function $y(t, l, e, a, u, n, i, r, h) {
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
      (this.expirationTimes = hi(-1)),
      (this.entangledLanes =
        this.shellSuspendCounter =
        this.errorRecoveryDisabledLanes =
        this.expiredLanes =
        this.warmLanes =
        this.pingedLanes =
        this.suspendedLanes =
        this.pendingLanes =
          0),
      (this.entanglements = hi(0)),
      (this.hiddenUpdates = hi(null)),
      (this.identifierPrefix = a),
      (this.onUncaughtError = u),
      (this.onCaughtError = n),
      (this.onRecoverableError = i),
      (this.pooledCache = null),
      (this.pooledCacheLanes = 0),
      (this.formState = h),
      (this.incompleteTransitions = new Map()));
  }
  function qd(t, l, e, a, u, n, i, r, h, T, _, N) {
    return (
      (t = new $y(t, l, e, i, h, T, _, N, r)),
      (l = 1),
      n === !0 && (l |= 24),
      (n = fl(3, null, null, l)),
      (t.current = n),
      (n.stateNode = t),
      (l = Fi()),
      l.refCount++,
      (t.pooledCache = l),
      l.refCount++,
      (n.memoizedState = { element: a, isDehydrated: e, cache: l }),
      lf(n),
      t
    );
  }
  function Yd(t) {
    return t ? ((t = ca), t) : ca;
  }
  function Ld(t, l, e, a, u, n) {
    ((u = Yd(u)),
      a.context === null ? (a.context = u) : (a.pendingContext = u),
      (a = he(l)),
      (a.payload = { element: e }),
      (n = n === void 0 ? null : n),
      n !== null && (a.callback = n),
      (e = me(t, a, l)),
      e !== null && (el(e, t, l), eu(e, t, l)));
  }
  function jd(t, l) {
    if (((t = t.memoizedState), t !== null && t.dehydrated !== null)) {
      var e = t.retryLane;
      t.retryLane = e !== 0 && e < l ? e : l;
    }
  }
  function bc(t, l) {
    (jd(t, l), (t = t.alternate) && jd(t, l));
  }
  function Gd(t) {
    if (t.tag === 13 || t.tag === 31) {
      var l = qe(t, 67108864);
      (l !== null && el(l, t, 67108864), bc(t, 67108864));
    }
  }
  function Xd(t) {
    if (t.tag === 13 || t.tag === 31) {
      var l = dl();
      l = mi(l);
      var e = qe(t, l);
      (e !== null && el(e, t, l), bc(t, l));
    }
  }
  var wn = !0;
  function Wy(t, l, e, a) {
    var u = M.T;
    M.T = null;
    var n = B.p;
    try {
      ((B.p = 2), Ec(t, l, e, a));
    } finally {
      ((B.p = n), (M.T = u));
    }
  }
  function ky(t, l, e, a) {
    var u = M.T;
    M.T = null;
    var n = B.p;
    try {
      ((B.p = 8), Ec(t, l, e, a));
    } finally {
      ((B.p = n), (M.T = u));
    }
  }
  function Ec(t, l, e, a) {
    if (wn) {
      var u = Tc(a);
      if (u === null) (fc(t, l, a, $n, e), Zd(t, a));
      else if (Iy(u, t, l, e, a)) a.stopPropagation();
      else if ((Zd(t, a), l & 4 && -1 < Fy.indexOf(t))) {
        for (; u !== null; ) {
          var n = Fe(u);
          if (n !== null)
            switch (n.tag) {
              case 3:
                if (((n = n.stateNode), n.current.memoizedState.isDehydrated)) {
                  var i = Ce(n.pendingLanes);
                  if (i !== 0) {
                    var r = n;
                    for (r.pendingLanes |= 2, r.entangledLanes |= 2; i; ) {
                      var h = 1 << (31 - nl(i));
                      ((r.entanglements[1] |= h), (i &= ~h));
                    }
                    (ql(n), (rt & 6) === 0 && ((Un = al() + 500), Su(0)));
                  }
                }
                break;
              case 31:
              case 13:
                ((r = qe(n, 2)), r !== null && el(r, n, 2), Nn(), bc(n, 2));
            }
          if (((n = Tc(a)), n === null && fc(t, l, a, $n, e), n === u)) break;
          u = n;
        }
        u !== null && a.stopPropagation();
      } else fc(t, l, a, null, e);
    }
  }
  function Tc(t) {
    return ((t = zi(t)), zc(t));
  }
  var $n = null;
  function zc(t) {
    if ((($n = null), (t = ke(t)), t !== null)) {
      var l = y(t);
      if (l === null) t = null;
      else {
        var e = l.tag;
        if (e === 13) {
          if (((t = b(l)), t !== null)) return t;
          t = null;
        } else if (e === 31) {
          if (((t = O(l)), t !== null)) return t;
          t = null;
        } else if (e === 3) {
          if (l.stateNode.current.memoizedState.isDehydrated)
            return l.tag === 3 ? l.stateNode.containerInfo : null;
          t = null;
        } else l !== t && (t = null);
      }
    }
    return (($n = t), null);
  }
  function Qd(t) {
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
        switch (qh()) {
          case Wc:
            return 2;
          case kc:
            return 8;
          case qu:
          case Yh:
            return 32;
          case Fc:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var Ac = !1,
    Re = null,
    _e = null,
    Oe = null,
    Ru = new Map(),
    _u = new Map(),
    Me = [],
    Fy =
      'mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset'.split(
        ' '
      );
  function Zd(t, l) {
    switch (t) {
      case 'focusin':
      case 'focusout':
        Re = null;
        break;
      case 'dragenter':
      case 'dragleave':
        _e = null;
        break;
      case 'mouseover':
      case 'mouseout':
        Oe = null;
        break;
      case 'pointerover':
      case 'pointerout':
        Ru.delete(l.pointerId);
        break;
      case 'gotpointercapture':
      case 'lostpointercapture':
        _u.delete(l.pointerId);
    }
  }
  function Ou(t, l, e, a, u, n) {
    return t === null || t.nativeEvent !== n
      ? ((t = {
          blockedOn: l,
          domEventName: e,
          eventSystemFlags: a,
          nativeEvent: n,
          targetContainers: [u],
        }),
        l !== null && ((l = Fe(l)), l !== null && Gd(l)),
        t)
      : ((t.eventSystemFlags |= a),
        (l = t.targetContainers),
        u !== null && l.indexOf(u) === -1 && l.push(u),
        t);
  }
  function Iy(t, l, e, a, u) {
    switch (l) {
      case 'focusin':
        return ((Re = Ou(Re, t, l, e, a, u)), !0);
      case 'dragenter':
        return ((_e = Ou(_e, t, l, e, a, u)), !0);
      case 'mouseover':
        return ((Oe = Ou(Oe, t, l, e, a, u)), !0);
      case 'pointerover':
        var n = u.pointerId;
        return (Ru.set(n, Ou(Ru.get(n) || null, t, l, e, a, u)), !0);
      case 'gotpointercapture':
        return ((n = u.pointerId), _u.set(n, Ou(_u.get(n) || null, t, l, e, a, u)), !0);
    }
    return !1;
  }
  function Vd(t) {
    var l = ke(t.target);
    if (l !== null) {
      var e = y(l);
      if (e !== null) {
        if (((l = e.tag), l === 13)) {
          if (((l = b(e)), l !== null)) {
            ((t.blockedOn = l),
              ar(t.priority, function () {
                Xd(e);
              }));
            return;
          }
        } else if (l === 31) {
          if (((l = O(e)), l !== null)) {
            ((t.blockedOn = l),
              ar(t.priority, function () {
                Xd(e);
              }));
            return;
          }
        } else if (l === 3 && e.stateNode.current.memoizedState.isDehydrated) {
          t.blockedOn = e.tag === 3 ? e.stateNode.containerInfo : null;
          return;
        }
      }
    }
    t.blockedOn = null;
  }
  function Wn(t) {
    if (t.blockedOn !== null) return !1;
    for (var l = t.targetContainers; 0 < l.length; ) {
      var e = Tc(t.nativeEvent);
      if (e === null) {
        e = t.nativeEvent;
        var a = new e.constructor(e.type, e);
        ((Ti = a), e.target.dispatchEvent(a), (Ti = null));
      } else return ((l = Fe(e)), l !== null && Gd(l), (t.blockedOn = e), !1);
      l.shift();
    }
    return !0;
  }
  function Kd(t, l, e) {
    Wn(t) && e.delete(l);
  }
  function Py() {
    ((Ac = !1),
      Re !== null && Wn(Re) && (Re = null),
      _e !== null && Wn(_e) && (_e = null),
      Oe !== null && Wn(Oe) && (Oe = null),
      Ru.forEach(Kd),
      _u.forEach(Kd));
  }
  function kn(t, l) {
    t.blockedOn === l &&
      ((t.blockedOn = null),
      Ac || ((Ac = !0), f.unstable_scheduleCallback(f.unstable_NormalPriority, Py)));
  }
  var Fn = null;
  function Jd(t) {
    Fn !== t &&
      ((Fn = t),
      f.unstable_scheduleCallback(f.unstable_NormalPriority, function () {
        Fn === t && (Fn = null);
        for (var l = 0; l < t.length; l += 3) {
          var e = t[l],
            a = t[l + 1],
            u = t[l + 2];
          if (typeof a != 'function') {
            if (zc(a || e) === null) continue;
            break;
          }
          var n = Fe(e);
          n !== null &&
            (t.splice(l, 3),
            (l -= 3),
            Tf(n, { pending: !0, data: u, method: e.method, action: a }, a, u));
        }
      }));
  }
  function Na(t) {
    function l(h) {
      return kn(h, t);
    }
    (Re !== null && kn(Re, t),
      _e !== null && kn(_e, t),
      Oe !== null && kn(Oe, t),
      Ru.forEach(l),
      _u.forEach(l));
    for (var e = 0; e < Me.length; e++) {
      var a = Me[e];
      a.blockedOn === t && (a.blockedOn = null);
    }
    for (; 0 < Me.length && ((e = Me[0]), e.blockedOn === null); )
      (Vd(e), e.blockedOn === null && Me.shift());
    if (((e = (t.ownerDocument || t).$$reactFormReplay), e != null))
      for (a = 0; a < e.length; a += 3) {
        var u = e[a],
          n = e[a + 1],
          i = u[kt] || null;
        if (typeof n == 'function') i || Jd(e);
        else if (i) {
          var r = null;
          if (n && n.hasAttribute('formAction')) {
            if (((u = n), (i = n[kt] || null))) r = i.formAction;
            else if (zc(u) !== null) continue;
          } else r = i.action;
          (typeof r == 'function' ? (e[a + 1] = r) : (e.splice(a, 3), (a -= 3)), Jd(e));
        }
      }
  }
  function wd() {
    function t(n) {
      n.canIntercept &&
        n.info === 'react-transition' &&
        n.intercept({
          handler: function () {
            return new Promise(function (i) {
              return (u = i);
            });
          },
          focusReset: 'manual',
          scroll: 'manual',
        });
    }
    function l() {
      (u !== null && (u(), (u = null)), a || setTimeout(e, 20));
    }
    function e() {
      if (!a && !navigation.transition) {
        var n = navigation.currentEntry;
        n &&
          n.url != null &&
          navigation.navigate(n.url, {
            state: n.getState(),
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
        navigation.addEventListener('navigatesuccess', l),
        navigation.addEventListener('navigateerror', l),
        setTimeout(e, 100),
        function () {
          ((a = !0),
            navigation.removeEventListener('navigate', t),
            navigation.removeEventListener('navigatesuccess', l),
            navigation.removeEventListener('navigateerror', l),
            u !== null && (u(), (u = null)));
        }
      );
    }
  }
  function Rc(t) {
    this._internalRoot = t;
  }
  ((In.prototype.render = Rc.prototype.render =
    function (t) {
      var l = this._internalRoot;
      if (l === null) throw Error(c(409));
      var e = l.current,
        a = dl();
      Ld(e, a, t, l, null, null);
    }),
    (In.prototype.unmount = Rc.prototype.unmount =
      function () {
        var t = this._internalRoot;
        if (t !== null) {
          this._internalRoot = null;
          var l = t.containerInfo;
          (Ld(t.current, 2, null, t, null, null), Nn(), (l[We] = null));
        }
      }));
  function In(t) {
    this._internalRoot = t;
  }
  In.prototype.unstable_scheduleHydration = function (t) {
    if (t) {
      var l = er();
      t = { blockedOn: null, target: t, priority: l };
      for (var e = 0; e < Me.length && l !== 0 && l < Me[e].priority; e++);
      (Me.splice(e, 0, t), e === 0 && Vd(t));
    }
  };
  var $d = o.version;
  if ($d !== '19.2.5') throw Error(c(527, $d, '19.2.5'));
  B.findDOMNode = function (t) {
    var l = t._reactInternals;
    if (l === void 0)
      throw typeof t.render == 'function'
        ? Error(c(188))
        : ((t = Object.keys(t).join(',')), Error(c(268, t)));
    return ((t = v(l)), (t = t !== null ? C(t) : null), (t = t === null ? null : t.stateNode), t);
  };
  var tv = {
    bundleType: 0,
    version: '19.2.5',
    rendererPackageName: 'react-dom',
    currentDispatcherRef: M,
    reconcilerVersion: '19.2.5',
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < 'u') {
    var Pn = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Pn.isDisabled && Pn.supportsFiber)
      try {
        ((qa = Pn.inject(tv)), (ul = Pn));
      } catch {}
  }
  return (
    (Du.createRoot = function (t, l) {
      if (!d(t)) throw Error(c(299));
      var e = !1,
        a = '',
        u = ls,
        n = es,
        i = as;
      return (
        l != null &&
          (l.unstable_strictMode === !0 && (e = !0),
          l.identifierPrefix !== void 0 && (a = l.identifierPrefix),
          l.onUncaughtError !== void 0 && (u = l.onUncaughtError),
          l.onCaughtError !== void 0 && (n = l.onCaughtError),
          l.onRecoverableError !== void 0 && (i = l.onRecoverableError)),
        (l = qd(t, 1, !1, null, null, e, a, null, u, n, i, wd)),
        (t[We] = l.current),
        ic(t),
        new Rc(l)
      );
    }),
    (Du.hydrateRoot = function (t, l, e) {
      if (!d(t)) throw Error(c(299));
      var a = !1,
        u = '',
        n = ls,
        i = es,
        r = as,
        h = null;
      return (
        e != null &&
          (e.unstable_strictMode === !0 && (a = !0),
          e.identifierPrefix !== void 0 && (u = e.identifierPrefix),
          e.onUncaughtError !== void 0 && (n = e.onUncaughtError),
          e.onCaughtError !== void 0 && (i = e.onCaughtError),
          e.onRecoverableError !== void 0 && (r = e.onRecoverableError),
          e.formState !== void 0 && (h = e.formState)),
        (l = qd(t, 1, !0, l, e ?? null, a, u, h, n, i, r, wd)),
        (l.context = Yd(null)),
        (e = l.current),
        (a = dl()),
        (a = mi(a)),
        (u = he(a)),
        (u.callback = null),
        me(e, u, a),
        (e = a),
        (l.current.lanes = e),
        La(l, e),
        ql(l),
        (t[We] = l.current),
        ic(t),
        new In(l)
      );
    }),
    (Du.version = '19.2.5'),
    Du
  );
}
var uh;
function ov() {
  if (uh) return Oc.exports;
  uh = 1;
  function f() {
    if (
      !(
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > 'u' ||
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != 'function'
      )
    )
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(f);
      } catch (o) {
        console.error(o);
      }
  }
  return (f(), (Oc.exports = rv()), Oc.exports);
}
var sv = ov(),
  D = Lc();
/**
 * react-router v7.14.2
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */ var nh = 'popstate';
function ih(f) {
  return (
    typeof f == 'object' &&
    f != null &&
    'pathname' in f &&
    'search' in f &&
    'hash' in f &&
    'state' in f &&
    'key' in f
  );
}
function dv(f = {}) {
  function o(c, d) {
    var v;
    let y = (v = d.state) == null ? void 0 : v.masked,
      { pathname: b, search: O, hash: p } = y || c.location;
    return Bc(
      '',
      { pathname: b, search: O, hash: p },
      (d.state && d.state.usr) || null,
      (d.state && d.state.key) || 'default',
      y
        ? { pathname: c.location.pathname, search: c.location.search, hash: c.location.hash }
        : void 0
    );
  }
  function s(c, d) {
    return typeof d == 'string' ? d : Cu(d);
  }
  return mv(o, s, null, f);
}
function Rt(f, o) {
  if (f === !1 || f === null || typeof f > 'u') throw new Error(o);
}
function Yl(f, o) {
  if (!f) {
    typeof console < 'u' && console.warn(o);
    try {
      throw new Error(o);
    } catch {}
  }
}
function hv() {
  return Math.random().toString(36).substring(2, 10);
}
function fh(f, o) {
  return {
    usr: f.state,
    key: f.key,
    idx: o,
    masked: f.unstable_mask ? { pathname: f.pathname, search: f.search, hash: f.hash } : void 0,
  };
}
function Bc(f, o, s = null, c, d) {
  return {
    pathname: typeof f == 'string' ? f : f.pathname,
    search: '',
    hash: '',
    ...(typeof o == 'string' ? Ha(o) : o),
    state: s,
    key: (o && o.key) || c || hv(),
    unstable_mask: d,
  };
}
function Cu({ pathname: f = '/', search: o = '', hash: s = '' }) {
  return (
    o && o !== '?' && (f += o.charAt(0) === '?' ? o : '?' + o),
    s && s !== '#' && (f += s.charAt(0) === '#' ? s : '#' + s),
    f
  );
}
function Ha(f) {
  let o = {};
  if (f) {
    let s = f.indexOf('#');
    s >= 0 && ((o.hash = f.substring(s)), (f = f.substring(0, s)));
    let c = f.indexOf('?');
    (c >= 0 && ((o.search = f.substring(c)), (f = f.substring(0, c))), f && (o.pathname = f));
  }
  return o;
}
function mv(f, o, s, c = {}) {
  let { window: d = document.defaultView, v5Compat: y = !1 } = c,
    b = d.history,
    O = 'POP',
    p = null,
    v = C();
  v == null && ((v = 0), b.replaceState({ ...b.state, idx: v }, ''));
  function C() {
    return (b.state || { idx: null }).idx;
  }
  function A() {
    O = 'POP';
    let G = C(),
      Y = G == null ? null : G - v;
    ((v = G), p && p({ action: O, location: j.location, delta: Y }));
  }
  function x(G, Y) {
    O = 'PUSH';
    let F = ih(G) ? G : Bc(j.location, G, Y);
    v = C() + 1;
    let w = fh(F, v),
      mt = j.createHref(F.unstable_mask || F);
    try {
      b.pushState(w, '', mt);
    } catch (st) {
      if (st instanceof DOMException && st.name === 'DataCloneError') throw st;
      d.location.assign(mt);
    }
    y && p && p({ action: O, location: j.location, delta: 1 });
  }
  function K(G, Y) {
    O = 'REPLACE';
    let F = ih(G) ? G : Bc(j.location, G, Y);
    v = C();
    let w = fh(F, v),
      mt = j.createHref(F.unstable_mask || F);
    (b.replaceState(w, '', mt), y && p && p({ action: O, location: j.location, delta: 0 }));
  }
  function V(G) {
    return yv(G);
  }
  let j = {
    get action() {
      return O;
    },
    get location() {
      return f(d, b);
    },
    listen(G) {
      if (p) throw new Error('A history only accepts one active listener');
      return (
        d.addEventListener(nh, A),
        (p = G),
        () => {
          (d.removeEventListener(nh, A), (p = null));
        }
      );
    },
    createHref(G) {
      return o(d, G);
    },
    createURL: V,
    encodeLocation(G) {
      let Y = V(G);
      return { pathname: Y.pathname, search: Y.search, hash: Y.hash };
    },
    push: x,
    replace: K,
    go(G) {
      return b.go(G);
    },
  };
  return j;
}
function yv(f, o = !1) {
  let s = 'http://localhost';
  (typeof window < 'u' &&
    (s = window.location.origin !== 'null' ? window.location.origin : window.location.href),
    Rt(s, 'No window.location.(origin|href) available to create URL'));
  let c = typeof f == 'string' ? f : Cu(f);
  return ((c = c.replace(/ $/, '%20')), !o && c.startsWith('//') && (c = s + c), new URL(c, s));
}
function dh(f, o, s = '/') {
  return vv(f, o, s, !1);
}
function vv(f, o, s, c) {
  let d = typeof o == 'string' ? Ha(o) : o,
    y = ee(d.pathname || '/', s);
  if (y == null) return null;
  let b = hh(f);
  gv(b);
  let O = null;
  for (let p = 0; O == null && p < b.length; ++p) {
    let v = Mv(y);
    O = _v(b[p], v, c);
  }
  return O;
}
function hh(f, o = [], s = [], c = '', d = !1) {
  let y = (b, O, p = d, v) => {
    let C = {
      relativePath: v === void 0 ? b.path || '' : v,
      caseSensitive: b.caseSensitive === !0,
      childrenIndex: O,
      route: b,
    };
    if (C.relativePath.startsWith('/')) {
      if (!C.relativePath.startsWith(c) && p) return;
      (Rt(
        C.relativePath.startsWith(c),
        `Absolute route path "${C.relativePath}" nested under path "${c}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`
      ),
        (C.relativePath = C.relativePath.slice(c.length)));
    }
    let A = Ul([c, C.relativePath]),
      x = s.concat(C);
    (b.children &&
      b.children.length > 0 &&
      (Rt(
        b.index !== !0,
        `Index routes must not have child routes. Please remove all child routes from route path "${A}".`
      ),
      hh(b.children, o, x, A, p)),
      !(b.path == null && !b.index) && o.push({ path: A, score: Av(A, b.index), routesMeta: x }));
  };
  return (
    f.forEach((b, O) => {
      var p;
      if (b.path === '' || !((p = b.path) != null && p.includes('?'))) y(b, O);
      else for (let v of mh(b.path)) y(b, O, !0, v);
    }),
    o
  );
}
function mh(f) {
  let o = f.split('/');
  if (o.length === 0) return [];
  let [s, ...c] = o,
    d = s.endsWith('?'),
    y = s.replace(/\?$/, '');
  if (c.length === 0) return d ? [y, ''] : [y];
  let b = mh(c.join('/')),
    O = [];
  return (
    O.push(...b.map((p) => (p === '' ? y : [y, p].join('/')))),
    d && O.push(...b),
    O.map((p) => (f.startsWith('/') && p === '' ? '/' : p))
  );
}
function gv(f) {
  f.sort((o, s) =>
    o.score !== s.score
      ? s.score - o.score
      : Rv(
          o.routesMeta.map((c) => c.childrenIndex),
          s.routesMeta.map((c) => c.childrenIndex)
        )
  );
}
var Sv = /^:[\w-]+$/,
  pv = 3,
  bv = 2,
  Ev = 1,
  Tv = 10,
  zv = -2,
  ch = (f) => f === '*';
function Av(f, o) {
  let s = f.split('/'),
    c = s.length;
  return (
    s.some(ch) && (c += zv),
    o && (c += bv),
    s.filter((d) => !ch(d)).reduce((d, y) => d + (Sv.test(y) ? pv : y === '' ? Ev : Tv), c)
  );
}
function Rv(f, o) {
  return f.length === o.length && f.slice(0, -1).every((c, d) => c === o[d])
    ? f[f.length - 1] - o[o.length - 1]
    : 0;
}
function _v(f, o, s = !1) {
  let { routesMeta: c } = f,
    d = {},
    y = '/',
    b = [];
  for (let O = 0; O < c.length; ++O) {
    let p = c[O],
      v = O === c.length - 1,
      C = y === '/' ? o : o.slice(y.length) || '/',
      A = ai({ path: p.relativePath, caseSensitive: p.caseSensitive, end: v }, C),
      x = p.route;
    if (
      (!A &&
        v &&
        s &&
        !c[c.length - 1].route.index &&
        (A = ai({ path: p.relativePath, caseSensitive: p.caseSensitive, end: !1 }, C)),
      !A)
    )
      return null;
    (Object.assign(d, A.params),
      b.push({
        params: d,
        pathname: Ul([y, A.pathname]),
        pathnameBase: Nv(Ul([y, A.pathnameBase])),
        route: x,
      }),
      A.pathnameBase !== '/' && (y = Ul([y, A.pathnameBase])));
  }
  return b;
}
function ai(f, o) {
  typeof f == 'string' && (f = { path: f, caseSensitive: !1, end: !0 });
  let [s, c] = Ov(f.path, f.caseSensitive, f.end),
    d = o.match(s);
  if (!d) return null;
  let y = d[0],
    b = y.replace(/(.)\/+$/, '$1'),
    O = d.slice(1);
  return {
    params: c.reduce((v, { paramName: C, isOptional: A }, x) => {
      if (C === '*') {
        let V = O[x] || '';
        b = y.slice(0, y.length - V.length).replace(/(.)\/+$/, '$1');
      }
      const K = O[x];
      return (A && !K ? (v[C] = void 0) : (v[C] = (K || '').replace(/%2F/g, '/')), v);
    }, {}),
    pathname: y,
    pathnameBase: b,
    pattern: f,
  };
}
function Ov(f, o = !1, s = !0) {
  Yl(
    f === '*' || !f.endsWith('*') || f.endsWith('/*'),
    `Route path "${f}" will be treated as if it were "${f.replace(/\*$/, '/*')}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${f.replace(/\*$/, '/*')}".`
  );
  let c = [],
    d =
      '^' +
      f
        .replace(/\/*\*?$/, '')
        .replace(/^\/*/, '/')
        .replace(/[\\.*+^${}|()[\]]/g, '\\$&')
        .replace(/\/:([\w-]+)(\?)?/g, (b, O, p, v, C) => {
          if ((c.push({ paramName: O, isOptional: p != null }), p)) {
            let A = C.charAt(v + b.length);
            return A && A !== '/' ? '/([^\\/]*)' : '(?:/([^\\/]*))?';
          }
          return '/([^\\/]+)';
        })
        .replace(/\/([\w-]+)\?(\/|$)/g, '(/$1)?$2');
  return (
    f.endsWith('*')
      ? (c.push({ paramName: '*' }), (d += f === '*' || f === '/*' ? '(.*)$' : '(?:\\/(.+)|\\/*)$'))
      : s
        ? (d += '\\/*$')
        : f !== '' && f !== '/' && (d += '(?:(?=\\/|$))'),
    [new RegExp(d, o ? void 0 : 'i'), c]
  );
}
function Mv(f) {
  try {
    return f
      .split('/')
      .map((o) => decodeURIComponent(o).replace(/\//g, '%2F'))
      .join('/');
  } catch (o) {
    return (
      Yl(
        !1,
        `The URL path "${f}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${o}).`
      ),
      f
    );
  }
}
function ee(f, o) {
  if (o === '/') return f;
  if (!f.toLowerCase().startsWith(o.toLowerCase())) return null;
  let s = o.endsWith('/') ? o.length - 1 : o.length,
    c = f.charAt(s);
  return c && c !== '/' ? null : f.slice(s) || '/';
}
var Dv = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;
function Uv(f, o = '/') {
  let { pathname: s, search: c = '', hash: d = '' } = typeof f == 'string' ? Ha(f) : f,
    y;
  return (
    s ? ((s = vh(s)), s.startsWith('/') ? (y = rh(s.substring(1), '/')) : (y = rh(s, o))) : (y = o),
    { pathname: y, search: Hv(c), hash: xv(d) }
  );
}
function rh(f, o) {
  let s = ui(o).split('/');
  return (
    f.split('/').forEach((d) => {
      d === '..' ? s.length > 1 && s.pop() : d !== '.' && s.push(d);
    }),
    s.length > 1 ? s.join('/') : '/'
  );
}
function Nc(f, o, s, c) {
  return `Cannot include a '${f}' character in a manually specified \`to.${o}\` field [${JSON.stringify(c)}].  Please separate it out to the \`to.${s}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`;
}
function Cv(f) {
  return f.filter((o, s) => s === 0 || (o.route.path && o.route.path.length > 0));
}
function yh(f) {
  let o = Cv(f);
  return o.map((s, c) => (c === o.length - 1 ? s.pathname : s.pathnameBase));
}
function jc(f, o, s, c = !1) {
  let d;
  typeof f == 'string'
    ? (d = Ha(f))
    : ((d = { ...f }),
      Rt(!d.pathname || !d.pathname.includes('?'), Nc('?', 'pathname', 'search', d)),
      Rt(!d.pathname || !d.pathname.includes('#'), Nc('#', 'pathname', 'hash', d)),
      Rt(!d.search || !d.search.includes('#'), Nc('#', 'search', 'hash', d)));
  let y = f === '' || d.pathname === '',
    b = y ? '/' : d.pathname,
    O;
  if (b == null) O = s;
  else {
    let A = o.length - 1;
    if (!c && b.startsWith('..')) {
      let x = b.split('/');
      for (; x[0] === '..'; ) (x.shift(), (A -= 1));
      d.pathname = x.join('/');
    }
    O = A >= 0 ? o[A] : '/';
  }
  let p = Uv(d, O),
    v = b && b !== '/' && b.endsWith('/'),
    C = (y || b === '.') && s.endsWith('/');
  return (!p.pathname.endsWith('/') && (v || C) && (p.pathname += '/'), p);
}
var vh = (f) => f.replace(/\/\/+/g, '/'),
  Ul = (f) => vh(f.join('/')),
  ui = (f) => f.replace(/\/+$/, ''),
  Nv = (f) => ui(f).replace(/^\/*/, '/'),
  Hv = (f) => (!f || f === '?' ? '' : f.startsWith('?') ? f : '?' + f),
  xv = (f) => (!f || f === '#' ? '' : f.startsWith('#') ? f : '#' + f),
  Bv = class {
    constructor(f, o, s, c = !1) {
      ((this.status = f),
        (this.statusText = o || ''),
        (this.internal = c),
        s instanceof Error ? ((this.data = s.toString()), (this.error = s)) : (this.data = s));
    }
  };
function qv(f) {
  return (
    f != null &&
    typeof f.status == 'number' &&
    typeof f.statusText == 'string' &&
    typeof f.internal == 'boolean' &&
    'data' in f
  );
}
function Yv(f) {
  let o = f.map((s) => s.route.path).filter(Boolean);
  return Ul(o) || '/';
}
var gh =
  typeof window < 'u' && typeof window.document < 'u' && typeof window.document.createElement < 'u';
function Sh(f, o) {
  let s = f;
  if (typeof s != 'string' || !Dv.test(s)) return { absoluteURL: void 0, isExternal: !1, to: s };
  let c = s,
    d = !1;
  if (gh)
    try {
      let y = new URL(window.location.href),
        b = s.startsWith('//') ? new URL(y.protocol + s) : new URL(s),
        O = ee(b.pathname, o);
      b.origin === y.origin && O != null ? (s = O + b.search + b.hash) : (d = !0);
    } catch {
      Yl(
        !1,
        `<Link to="${s}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`
      );
    }
  return { absoluteURL: c, isExternal: d, to: s };
}
Object.getOwnPropertyNames(Object.prototype).sort().join('\0');
var ph = ['POST', 'PUT', 'PATCH', 'DELETE'];
new Set(ph);
var Lv = ['GET', ...ph];
new Set(Lv);
var xa = D.createContext(null);
xa.displayName = 'DataRouter';
var ni = D.createContext(null);
ni.displayName = 'DataRouterState';
var bh = D.createContext(!1);
function jv() {
  return D.useContext(bh);
}
var Eh = D.createContext({ isTransitioning: !1 });
Eh.displayName = 'ViewTransition';
var Gv = D.createContext(new Map());
Gv.displayName = 'Fetchers';
var Xv = D.createContext(null);
Xv.displayName = 'Await';
var Rl = D.createContext(null);
Rl.displayName = 'Navigation';
var Nu = D.createContext(null);
Nu.displayName = 'Location';
var ae = D.createContext({ outlet: null, matches: [], isDataRoute: !1 });
ae.displayName = 'Route';
var Gc = D.createContext(null);
Gc.displayName = 'RouteError';
var Th = 'REACT_ROUTER_ERROR',
  Qv = 'REDIRECT',
  Zv = 'ROUTE_ERROR_RESPONSE';
function Vv(f) {
  if (f.startsWith(`${Th}:${Qv}:{`))
    try {
      let o = JSON.parse(f.slice(28));
      if (
        typeof o == 'object' &&
        o &&
        typeof o.status == 'number' &&
        typeof o.statusText == 'string' &&
        typeof o.location == 'string' &&
        typeof o.reloadDocument == 'boolean' &&
        typeof o.replace == 'boolean'
      )
        return o;
    } catch {}
}
function Kv(f) {
  if (f.startsWith(`${Th}:${Zv}:{`))
    try {
      let o = JSON.parse(f.slice(40));
      if (
        typeof o == 'object' &&
        o &&
        typeof o.status == 'number' &&
        typeof o.statusText == 'string'
      )
        return new Bv(o.status, o.statusText, o.data);
    } catch {}
}
function Jv(f, { relative: o } = {}) {
  Rt(Hu(), 'useHref() may be used only in the context of a <Router> component.');
  let { basename: s, navigator: c } = D.useContext(Rl),
    { hash: d, pathname: y, search: b } = xu(f, { relative: o }),
    O = y;
  return (
    s !== '/' && (O = y === '/' ? s : Ul([s, y])),
    c.createHref({ pathname: O, search: b, hash: d })
  );
}
function Hu() {
  return D.useContext(Nu) != null;
}
function ue() {
  return (
    Rt(Hu(), 'useLocation() may be used only in the context of a <Router> component.'),
    D.useContext(Nu).location
  );
}
var zh =
  'You should call navigate() in a React.useEffect(), not when your component is first rendered.';
function Ah(f) {
  D.useContext(Rl).static || D.useLayoutEffect(f);
}
function wv() {
  let { isDataRoute: f } = D.useContext(ae);
  return f ? i0() : $v();
}
function $v() {
  Rt(Hu(), 'useNavigate() may be used only in the context of a <Router> component.');
  let f = D.useContext(xa),
    { basename: o, navigator: s } = D.useContext(Rl),
    { matches: c } = D.useContext(ae),
    { pathname: d } = ue(),
    y = JSON.stringify(yh(c)),
    b = D.useRef(!1);
  return (
    Ah(() => {
      b.current = !0;
    }),
    D.useCallback(
      (p, v = {}) => {
        if ((Yl(b.current, zh), !b.current)) return;
        if (typeof p == 'number') {
          s.go(p);
          return;
        }
        let C = jc(p, JSON.parse(y), d, v.relative === 'path');
        (f == null && o !== '/' && (C.pathname = C.pathname === '/' ? o : Ul([o, C.pathname])),
          (v.replace ? s.replace : s.push)(C, v.state, v));
      },
      [o, s, y, d, f]
    )
  );
}
D.createContext(null);
function xu(f, { relative: o } = {}) {
  let { matches: s } = D.useContext(ae),
    { pathname: c } = ue(),
    d = JSON.stringify(yh(s));
  return D.useMemo(() => jc(f, JSON.parse(d), c, o === 'path'), [f, d, c, o]);
}
function Wv(f, o) {
  return Rh(f, o);
}
function Rh(f, o, s) {
  var G;
  Rt(Hu(), 'useRoutes() may be used only in the context of a <Router> component.');
  let { navigator: c } = D.useContext(Rl),
    { matches: d } = D.useContext(ae),
    y = d[d.length - 1],
    b = y ? y.params : {},
    O = y ? y.pathname : '/',
    p = y ? y.pathnameBase : '/',
    v = y && y.route;
  {
    let Y = (v && v.path) || '';
    Oh(
      O,
      !v || Y.endsWith('*') || Y.endsWith('*?'),
      `You rendered descendant <Routes> (or called \`useRoutes()\`) at "${O}" (under <Route path="${Y}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${Y}"> to <Route path="${Y === '/' ? '*' : `${Y}/*`}">.`
    );
  }
  let C = ue(),
    A;
  if (o) {
    let Y = typeof o == 'string' ? Ha(o) : o;
    (Rt(
      p === '/' || ((G = Y.pathname) == null ? void 0 : G.startsWith(p)),
      `When overriding the location using \`<Routes location>\` or \`useRoutes(routes, location)\`, the location pathname must begin with the portion of the URL pathname that was matched by all parent routes. The current pathname base is "${p}" but pathname "${Y.pathname}" was given in the \`location\` prop.`
    ),
      (A = Y));
  } else A = C;
  let x = A.pathname || '/',
    K = x;
  if (p !== '/') {
    let Y = p.replace(/^\//, '').split('/');
    K = '/' + x.replace(/^\//, '').split('/').slice(Y.length).join('/');
  }
  let V = dh(f, { pathname: K });
  (Yl(v || V != null, `No routes matched location "${A.pathname}${A.search}${A.hash}" `),
    Yl(
      V == null ||
        V[V.length - 1].route.element !== void 0 ||
        V[V.length - 1].route.Component !== void 0 ||
        V[V.length - 1].route.lazy !== void 0,
      `Matched leaf route at location "${A.pathname}${A.search}${A.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`
    ));
  let j = t0(
    V &&
      V.map((Y) =>
        Object.assign({}, Y, {
          params: Object.assign({}, b, Y.params),
          pathname: Ul([
            p,
            c.encodeLocation
              ? c.encodeLocation(
                  Y.pathname.replace(/%/g, '%25').replace(/\?/g, '%3F').replace(/#/g, '%23')
                ).pathname
              : Y.pathname,
          ]),
          pathnameBase:
            Y.pathnameBase === '/'
              ? p
              : Ul([
                  p,
                  c.encodeLocation
                    ? c.encodeLocation(
                        Y.pathnameBase
                          .replace(/%/g, '%25')
                          .replace(/\?/g, '%3F')
                          .replace(/#/g, '%23')
                      ).pathname
                    : Y.pathnameBase,
                ]),
        })
      ),
    d,
    s
  );
  return o && j
    ? D.createElement(
        Nu.Provider,
        {
          value: {
            location: {
              pathname: '/',
              search: '',
              hash: '',
              state: null,
              key: 'default',
              unstable_mask: void 0,
              ...A,
            },
            navigationType: 'POP',
          },
        },
        j
      )
    : j;
}
function kv() {
  let f = n0(),
    o = qv(f) ? `${f.status} ${f.statusText}` : f instanceof Error ? f.message : JSON.stringify(f),
    s = f instanceof Error ? f.stack : null,
    c = 'rgba(200,200,200, 0.5)',
    d = { padding: '0.5rem', backgroundColor: c },
    y = { padding: '2px 4px', backgroundColor: c },
    b = null;
  return (
    console.error('Error handled by React Router default ErrorBoundary:', f),
    (b = D.createElement(
      D.Fragment,
      null,
      D.createElement('p', null, '💿 Hey developer 👋'),
      D.createElement(
        'p',
        null,
        'You can provide a way better UX than this when your app throws errors by providing your own ',
        D.createElement('code', { style: y }, 'ErrorBoundary'),
        ' or',
        ' ',
        D.createElement('code', { style: y }, 'errorElement'),
        ' prop on your route.'
      )
    )),
    D.createElement(
      D.Fragment,
      null,
      D.createElement('h2', null, 'Unexpected Application Error!'),
      D.createElement('h3', { style: { fontStyle: 'italic' } }, o),
      s ? D.createElement('pre', { style: d }, s) : null,
      b
    )
  );
}
var Fv = D.createElement(kv, null),
  _h = class extends D.Component {
    constructor(f) {
      (super(f),
        (this.state = { location: f.location, revalidation: f.revalidation, error: f.error }));
    }
    static getDerivedStateFromError(f) {
      return { error: f };
    }
    static getDerivedStateFromProps(f, o) {
      return o.location !== f.location || (o.revalidation !== 'idle' && f.revalidation === 'idle')
        ? { error: f.error, location: f.location, revalidation: f.revalidation }
        : {
            error: f.error !== void 0 ? f.error : o.error,
            location: o.location,
            revalidation: f.revalidation || o.revalidation,
          };
    }
    componentDidCatch(f, o) {
      this.props.onError
        ? this.props.onError(f, o)
        : console.error('React Router caught the following error during render', f);
    }
    render() {
      let f = this.state.error;
      if (
        this.context &&
        typeof f == 'object' &&
        f &&
        'digest' in f &&
        typeof f.digest == 'string'
      ) {
        const s = Kv(f.digest);
        s && (f = s);
      }
      let o =
        f !== void 0
          ? D.createElement(
              ae.Provider,
              { value: this.props.routeContext },
              D.createElement(Gc.Provider, { value: f, children: this.props.component })
            )
          : this.props.children;
      return this.context ? D.createElement(Iv, { error: f }, o) : o;
    }
  };
_h.contextType = bh;
var Hc = new WeakMap();
function Iv({ children: f, error: o }) {
  let { basename: s } = D.useContext(Rl);
  if (typeof o == 'object' && o && 'digest' in o && typeof o.digest == 'string') {
    let c = Vv(o.digest);
    if (c) {
      let d = Hc.get(o);
      if (d) throw d;
      let y = Sh(c.location, s);
      if (gh && !Hc.get(o))
        if (y.isExternal || c.reloadDocument) window.location.href = y.absoluteURL || y.to;
        else {
          const b = Promise.resolve().then(() =>
            window.__reactRouterDataRouter.navigate(y.to, { replace: c.replace })
          );
          throw (Hc.set(o, b), b);
        }
      return D.createElement('meta', {
        httpEquiv: 'refresh',
        content: `0;url=${y.absoluteURL || y.to}`,
      });
    }
  }
  return f;
}
function Pv({ routeContext: f, match: o, children: s }) {
  let c = D.useContext(xa);
  return (
    c &&
      c.static &&
      c.staticContext &&
      (o.route.errorElement || o.route.ErrorBoundary) &&
      (c.staticContext._deepestRenderedBoundaryId = o.route.id),
    D.createElement(ae.Provider, { value: f }, s)
  );
}
function t0(f, o = [], s) {
  let c = s == null ? void 0 : s.state;
  if (f == null) {
    if (!c) return null;
    if (c.errors) f = c.matches;
    else if (o.length === 0 && !c.initialized && c.matches.length > 0) f = c.matches;
    else return null;
  }
  let d = f,
    y = c == null ? void 0 : c.errors;
  if (y != null) {
    let C = d.findIndex((A) => A.route.id && (y == null ? void 0 : y[A.route.id]) !== void 0);
    (Rt(
      C >= 0,
      `Could not find a matching route for errors on route IDs: ${Object.keys(y).join(',')}`
    ),
      (d = d.slice(0, Math.min(d.length, C + 1))));
  }
  let b = !1,
    O = -1;
  if (s && c) {
    b = c.renderFallback;
    for (let C = 0; C < d.length; C++) {
      let A = d[C];
      if (((A.route.HydrateFallback || A.route.hydrateFallbackElement) && (O = C), A.route.id)) {
        let { loaderData: x, errors: K } = c,
          V = A.route.loader && !x.hasOwnProperty(A.route.id) && (!K || K[A.route.id] === void 0);
        if (A.route.lazy || V) {
          (s.isStatic && (b = !0), O >= 0 ? (d = d.slice(0, O + 1)) : (d = [d[0]]));
          break;
        }
      }
    }
  }
  let p = s == null ? void 0 : s.onError,
    v =
      c && p
        ? (C, A) => {
            var x, K;
            p(C, {
              location: c.location,
              params:
                ((K = (x = c.matches) == null ? void 0 : x[0]) == null ? void 0 : K.params) ?? {},
              unstable_pattern: Yv(c.matches),
              errorInfo: A,
            });
          }
        : void 0;
  return d.reduceRight((C, A, x) => {
    let K,
      V = !1,
      j = null,
      G = null;
    c &&
      ((K = y && A.route.id ? y[A.route.id] : void 0),
      (j = A.route.errorElement || Fv),
      b &&
        (O < 0 && x === 0
          ? (Oh(
              'route-fallback',
              !1,
              'No `HydrateFallback` element provided to render during initial hydration'
            ),
            (V = !0),
            (G = null))
          : O === x && ((V = !0), (G = A.route.hydrateFallbackElement || null))));
    let Y = o.concat(d.slice(0, x + 1)),
      F = () => {
        let w;
        return (
          K
            ? (w = j)
            : V
              ? (w = G)
              : A.route.Component
                ? (w = D.createElement(A.route.Component, null))
                : A.route.element
                  ? (w = A.route.element)
                  : (w = C),
          D.createElement(Pv, {
            match: A,
            routeContext: { outlet: C, matches: Y, isDataRoute: c != null },
            children: w,
          })
        );
      };
    return c && (A.route.ErrorBoundary || A.route.errorElement || x === 0)
      ? D.createElement(_h, {
          location: c.location,
          revalidation: c.revalidation,
          component: j,
          error: K,
          children: F(),
          routeContext: { outlet: null, matches: Y, isDataRoute: !0 },
          onError: v,
        })
      : F();
  }, null);
}
function Xc(f) {
  return `${f} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function l0(f) {
  let o = D.useContext(xa);
  return (Rt(o, Xc(f)), o);
}
function e0(f) {
  let o = D.useContext(ni);
  return (Rt(o, Xc(f)), o);
}
function a0(f) {
  let o = D.useContext(ae);
  return (Rt(o, Xc(f)), o);
}
function Qc(f) {
  let o = a0(f),
    s = o.matches[o.matches.length - 1];
  return (Rt(s.route.id, `${f} can only be used on routes that contain a unique "id"`), s.route.id);
}
function u0() {
  return Qc('useRouteId');
}
function n0() {
  var c;
  let f = D.useContext(Gc),
    o = e0('useRouteError'),
    s = Qc('useRouteError');
  return f !== void 0 ? f : (c = o.errors) == null ? void 0 : c[s];
}
function i0() {
  let { router: f } = l0('useNavigate'),
    o = Qc('useNavigate'),
    s = D.useRef(!1);
  return (
    Ah(() => {
      s.current = !0;
    }),
    D.useCallback(
      async (d, y = {}) => {
        (Yl(s.current, zh),
          s.current &&
            (typeof d == 'number'
              ? await f.navigate(d)
              : await f.navigate(d, { fromRouteId: o, ...y })));
      },
      [f, o]
    )
  );
}
var oh = {};
function Oh(f, o, s) {
  !o && !oh[f] && ((oh[f] = !0), Yl(!1, s));
}
D.memo(f0);
function f0({ routes: f, future: o, state: s, isStatic: c, onError: d }) {
  return Rh(f, void 0, { state: s, isStatic: c, onError: d });
}
function qc(f) {
  Rt(
    !1,
    'A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>.'
  );
}
function c0({
  basename: f = '/',
  children: o = null,
  location: s,
  navigationType: c = 'POP',
  navigator: d,
  static: y = !1,
  unstable_useTransitions: b,
}) {
  Rt(
    !Hu(),
    'You cannot render a <Router> inside another <Router>. You should never have more than one in your app.'
  );
  let O = f.replace(/^\/*/, '/'),
    p = D.useMemo(
      () => ({ basename: O, navigator: d, static: y, unstable_useTransitions: b, future: {} }),
      [O, d, y, b]
    );
  typeof s == 'string' && (s = Ha(s));
  let {
      pathname: v = '/',
      search: C = '',
      hash: A = '',
      state: x = null,
      key: K = 'default',
      unstable_mask: V,
    } = s,
    j = D.useMemo(() => {
      let G = ee(v, O);
      return G == null
        ? null
        : {
            location: { pathname: G, search: C, hash: A, state: x, key: K, unstable_mask: V },
            navigationType: c,
          };
    }, [O, v, C, A, x, K, c, V]);
  return (
    Yl(
      j != null,
      `<Router basename="${O}"> is not able to match the URL "${v}${C}${A}" because it does not start with the basename, so the <Router> won't render anything.`
    ),
    j == null
      ? null
      : D.createElement(
          Rl.Provider,
          { value: p },
          D.createElement(Nu.Provider, { children: o, value: j })
        )
  );
}
function r0({ children: f, location: o }) {
  return Wv(Yc(f), o);
}
function Yc(f, o = []) {
  let s = [];
  return (
    D.Children.forEach(f, (c, d) => {
      if (!D.isValidElement(c)) return;
      let y = [...o, d];
      if (c.type === D.Fragment) {
        s.push.apply(s, Yc(c.props.children, y));
        return;
      }
      (Rt(
        c.type === qc,
        `[${typeof c.type == 'string' ? c.type : c.type.name}] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>`
      ),
        Rt(!c.props.index || !c.props.children, 'An index route cannot have child routes.'));
      let b = {
        id: c.props.id || y.join('-'),
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
      (c.props.children && (b.children = Yc(c.props.children, y)), s.push(b));
    }),
    s
  );
}
var li = 'get',
  ei = 'application/x-www-form-urlencoded';
function ii(f) {
  return typeof HTMLElement < 'u' && f instanceof HTMLElement;
}
function o0(f) {
  return ii(f) && f.tagName.toLowerCase() === 'button';
}
function s0(f) {
  return ii(f) && f.tagName.toLowerCase() === 'form';
}
function d0(f) {
  return ii(f) && f.tagName.toLowerCase() === 'input';
}
function h0(f) {
  return !!(f.metaKey || f.altKey || f.ctrlKey || f.shiftKey);
}
function m0(f, o) {
  return f.button === 0 && (!o || o === '_self') && !h0(f);
}
var ti = null;
function y0() {
  if (ti === null)
    try {
      (new FormData(document.createElement('form'), 0), (ti = !1));
    } catch {
      ti = !0;
    }
  return ti;
}
var v0 = new Set(['application/x-www-form-urlencoded', 'multipart/form-data', 'text/plain']);
function xc(f) {
  return f != null && !v0.has(f)
    ? (Yl(
        !1,
        `"${f}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${ei}"`
      ),
      null)
    : f;
}
function g0(f, o) {
  let s, c, d, y, b;
  if (s0(f)) {
    let O = f.getAttribute('action');
    ((c = O ? ee(O, o) : null),
      (s = f.getAttribute('method') || li),
      (d = xc(f.getAttribute('enctype')) || ei),
      (y = new FormData(f)));
  } else if (o0(f) || (d0(f) && (f.type === 'submit' || f.type === 'image'))) {
    let O = f.form;
    if (O == null)
      throw new Error('Cannot submit a <button> or <input type="submit"> without a <form>');
    let p = f.getAttribute('formaction') || O.getAttribute('action');
    if (
      ((c = p ? ee(p, o) : null),
      (s = f.getAttribute('formmethod') || O.getAttribute('method') || li),
      (d = xc(f.getAttribute('formenctype')) || xc(O.getAttribute('enctype')) || ei),
      (y = new FormData(O, f)),
      !y0())
    ) {
      let { name: v, type: C, value: A } = f;
      if (C === 'image') {
        let x = v ? `${v}.` : '';
        (y.append(`${x}x`, '0'), y.append(`${x}y`, '0'));
      } else v && y.append(v, A);
    }
  } else {
    if (ii(f))
      throw new Error(
        'Cannot submit element that is not <form>, <button>, or <input type="submit|image">'
      );
    ((s = li), (c = null), (d = ei), (b = f));
  }
  return (
    y && d === 'text/plain' && ((b = y), (y = void 0)),
    { action: c, method: s.toLowerCase(), encType: d, formData: y, body: b }
  );
}
Object.getOwnPropertyNames(Object.prototype).sort().join('\0');
function Zc(f, o) {
  if (f === !1 || f === null || typeof f > 'u') throw new Error(o);
}
function Mh(f, o, s, c) {
  let d =
    typeof f == 'string'
      ? new URL(f, typeof window > 'u' ? 'server://singlefetch/' : window.location.origin)
      : f;
  return (
    s
      ? d.pathname.endsWith('/')
        ? (d.pathname = `${d.pathname}_.${c}`)
        : (d.pathname = `${d.pathname}.${c}`)
      : d.pathname === '/'
        ? (d.pathname = `_root.${c}`)
        : o && ee(d.pathname, o) === '/'
          ? (d.pathname = `${ui(o)}/_root.${c}`)
          : (d.pathname = `${ui(d.pathname)}.${c}`),
    d
  );
}
async function S0(f, o) {
  if (f.id in o) return o[f.id];
  try {
    let s = await import(f.module);
    return ((o[f.id] = s), s);
  } catch (s) {
    return (
      console.error(`Error loading route module \`${f.module}\`, reloading page...`),
      console.error(s),
      window.__reactRouterContext && window.__reactRouterContext.isSpaMode,
      window.location.reload(),
      new Promise(() => {})
    );
  }
}
function p0(f) {
  return f == null
    ? !1
    : f.href == null
      ? f.rel === 'preload' && typeof f.imageSrcSet == 'string' && typeof f.imageSizes == 'string'
      : typeof f.rel == 'string' && typeof f.href == 'string';
}
async function b0(f, o, s) {
  let c = await Promise.all(
    f.map(async (d) => {
      let y = o.routes[d.route.id];
      if (y) {
        let b = await S0(y, s);
        return b.links ? b.links() : [];
      }
      return [];
    })
  );
  return A0(
    c
      .flat(1)
      .filter(p0)
      .filter((d) => d.rel === 'stylesheet' || d.rel === 'preload')
      .map((d) =>
        d.rel === 'stylesheet' ? { ...d, rel: 'prefetch', as: 'style' } : { ...d, rel: 'prefetch' }
      )
  );
}
function sh(f, o, s, c, d, y) {
  let b = (p, v) => (s[v] ? p.route.id !== s[v].route.id : !0),
    O = (p, v) => {
      var C;
      return (
        s[v].pathname !== p.pathname ||
        (((C = s[v].route.path) == null ? void 0 : C.endsWith('*')) &&
          s[v].params['*'] !== p.params['*'])
      );
    };
  return y === 'assets'
    ? o.filter((p, v) => b(p, v) || O(p, v))
    : y === 'data'
      ? o.filter((p, v) => {
          var A;
          let C = c.routes[p.route.id];
          if (!C || !C.hasLoader) return !1;
          if (b(p, v) || O(p, v)) return !0;
          if (p.route.shouldRevalidate) {
            let x = p.route.shouldRevalidate({
              currentUrl: new URL(d.pathname + d.search + d.hash, window.origin),
              currentParams: ((A = s[0]) == null ? void 0 : A.params) || {},
              nextUrl: new URL(f, window.origin),
              nextParams: p.params,
              defaultShouldRevalidate: !0,
            });
            if (typeof x == 'boolean') return x;
          }
          return !0;
        })
      : [];
}
function E0(f, o, { includeHydrateFallback: s } = {}) {
  return T0(
    f
      .map((c) => {
        let d = o.routes[c.route.id];
        if (!d) return [];
        let y = [d.module];
        return (
          d.clientActionModule && (y = y.concat(d.clientActionModule)),
          d.clientLoaderModule && (y = y.concat(d.clientLoaderModule)),
          s && d.hydrateFallbackModule && (y = y.concat(d.hydrateFallbackModule)),
          d.imports && (y = y.concat(d.imports)),
          y
        );
      })
      .flat(1)
  );
}
function T0(f) {
  return [...new Set(f)];
}
function z0(f) {
  let o = {},
    s = Object.keys(f).sort();
  for (let c of s) o[c] = f[c];
  return o;
}
function A0(f, o) {
  let s = new Set();
  return (
    new Set(o),
    f.reduce((c, d) => {
      let y = JSON.stringify(z0(d));
      return (s.has(y) || (s.add(y), c.push({ key: y, link: d })), c);
    }, [])
  );
}
function Vc() {
  let f = D.useContext(xa);
  return (Zc(f, 'You must render this element inside a <DataRouterContext.Provider> element'), f);
}
function R0() {
  let f = D.useContext(ni);
  return (
    Zc(f, 'You must render this element inside a <DataRouterStateContext.Provider> element'),
    f
  );
}
var Kc = D.createContext(void 0);
Kc.displayName = 'FrameworkContext';
function Jc() {
  let f = D.useContext(Kc);
  return (Zc(f, 'You must render this element inside a <HydratedRouter> element'), f);
}
function _0(f, o) {
  let s = D.useContext(Kc),
    [c, d] = D.useState(!1),
    [y, b] = D.useState(!1),
    { onFocus: O, onBlur: p, onMouseEnter: v, onMouseLeave: C, onTouchStart: A } = o,
    x = D.useRef(null);
  (D.useEffect(() => {
    if ((f === 'render' && b(!0), f === 'viewport')) {
      let j = (Y) => {
          Y.forEach((F) => {
            b(F.isIntersecting);
          });
        },
        G = new IntersectionObserver(j, { threshold: 0.5 });
      return (
        x.current && G.observe(x.current),
        () => {
          G.disconnect();
        }
      );
    }
  }, [f]),
    D.useEffect(() => {
      if (c) {
        let j = setTimeout(() => {
          b(!0);
        }, 100);
        return () => {
          clearTimeout(j);
        };
      }
    }, [c]));
  let K = () => {
      d(!0);
    },
    V = () => {
      (d(!1), b(!1));
    };
  return s
    ? f !== 'intent'
      ? [y, x, {}]
      : [
          y,
          x,
          {
            onFocus: Uu(O, K),
            onBlur: Uu(p, V),
            onMouseEnter: Uu(v, K),
            onMouseLeave: Uu(C, V),
            onTouchStart: Uu(A, K),
          },
        ]
    : [!1, x, {}];
}
function Uu(f, o) {
  return (s) => {
    (f && f(s), s.defaultPrevented || o(s));
  };
}
function O0({ page: f, ...o }) {
  let s = jv(),
    { router: c } = Vc(),
    d = D.useMemo(() => dh(c.routes, f, c.basename), [c.routes, f, c.basename]);
  return d
    ? s
      ? D.createElement(D0, { page: f, matches: d, ...o })
      : D.createElement(U0, { page: f, matches: d, ...o })
    : null;
}
function M0(f) {
  let { manifest: o, routeModules: s } = Jc(),
    [c, d] = D.useState([]);
  return (
    D.useEffect(() => {
      let y = !1;
      return (
        b0(f, o, s).then((b) => {
          y || d(b);
        }),
        () => {
          y = !0;
        }
      );
    }, [f, o, s]),
    c
  );
}
function D0({ page: f, matches: o, ...s }) {
  let c = ue(),
    { future: d } = Jc(),
    { basename: y } = Vc(),
    b = D.useMemo(() => {
      if (f === c.pathname + c.search + c.hash) return [];
      let O = Mh(f, y, d.unstable_trailingSlashAwareDataRequests, 'rsc'),
        p = !1,
        v = [];
      for (let C of o)
        typeof C.route.shouldRevalidate == 'function' ? (p = !0) : v.push(C.route.id);
      return (
        p && v.length > 0 && O.searchParams.set('_routes', v.join(',')),
        [O.pathname + O.search]
      );
    }, [y, d.unstable_trailingSlashAwareDataRequests, f, c, o]);
  return D.createElement(
    D.Fragment,
    null,
    b.map((O) => D.createElement('link', { key: O, rel: 'prefetch', as: 'fetch', href: O, ...s }))
  );
}
function U0({ page: f, matches: o, ...s }) {
  let c = ue(),
    { future: d, manifest: y, routeModules: b } = Jc(),
    { basename: O } = Vc(),
    { loaderData: p, matches: v } = R0(),
    C = D.useMemo(() => sh(f, o, v, y, c, 'data'), [f, o, v, y, c]),
    A = D.useMemo(() => sh(f, o, v, y, c, 'assets'), [f, o, v, y, c]),
    x = D.useMemo(() => {
      if (f === c.pathname + c.search + c.hash) return [];
      let j = new Set(),
        G = !1;
      if (
        (o.forEach((F) => {
          var mt;
          let w = y.routes[F.route.id];
          !w ||
            !w.hasLoader ||
            ((!C.some((st) => st.route.id === F.route.id) &&
              F.route.id in p &&
              (mt = b[F.route.id]) != null &&
              mt.shouldRevalidate) ||
            w.hasClientLoader
              ? (G = !0)
              : j.add(F.route.id));
        }),
        j.size === 0)
      )
        return [];
      let Y = Mh(f, O, d.unstable_trailingSlashAwareDataRequests, 'data');
      return (
        G &&
          j.size > 0 &&
          Y.searchParams.set(
            '_routes',
            o
              .filter((F) => j.has(F.route.id))
              .map((F) => F.route.id)
              .join(',')
          ),
        [Y.pathname + Y.search]
      );
    }, [O, d.unstable_trailingSlashAwareDataRequests, p, c, y, C, o, f, b]),
    K = D.useMemo(() => E0(A, y), [A, y]),
    V = M0(A);
  return D.createElement(
    D.Fragment,
    null,
    x.map((j) => D.createElement('link', { key: j, rel: 'prefetch', as: 'fetch', href: j, ...s })),
    K.map((j) => D.createElement('link', { key: j, rel: 'modulepreload', href: j, ...s })),
    V.map(({ key: j, link: G }) =>
      D.createElement('link', {
        key: j,
        nonce: s.nonce,
        ...G,
        crossOrigin: G.crossOrigin ?? s.crossOrigin,
      })
    )
  );
}
function C0(...f) {
  return (o) => {
    f.forEach((s) => {
      typeof s == 'function' ? s(o) : s != null && (s.current = o);
    });
  };
}
var N0 =
  typeof window < 'u' && typeof window.document < 'u' && typeof window.document.createElement < 'u';
try {
  N0 && (window.__reactRouterVersion = '7.14.2');
} catch {}
function H0({ basename: f, children: o, unstable_useTransitions: s, window: c }) {
  let d = D.useRef();
  d.current == null && (d.current = dv({ window: c, v5Compat: !0 }));
  let y = d.current,
    [b, O] = D.useState({ action: y.action, location: y.location }),
    p = D.useCallback(
      (v) => {
        s === !1 ? O(v) : D.startTransition(() => O(v));
      },
      [s]
    );
  return (
    D.useLayoutEffect(() => y.listen(p), [y, p]),
    D.createElement(c0, {
      basename: f,
      children: o,
      location: b.location,
      navigationType: b.action,
      navigator: y,
      unstable_useTransitions: s,
    })
  );
}
var Dh = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,
  Uh = D.forwardRef(function (
    {
      onClick: o,
      discover: s = 'render',
      prefetch: c = 'none',
      relative: d,
      reloadDocument: y,
      replace: b,
      unstable_mask: O,
      state: p,
      target: v,
      to: C,
      preventScrollReset: A,
      viewTransition: x,
      unstable_defaultShouldRevalidate: K,
      ...V
    },
    j
  ) {
    let { basename: G, navigator: Y, unstable_useTransitions: F } = D.useContext(Rl),
      w = typeof C == 'string' && Dh.test(C),
      mt = Sh(C, G);
    C = mt.to;
    let st = Jv(C, { relative: d }),
      Et = ue(),
      W = null;
    if (O) {
      let Nt = jc(O, [], Et.unstable_mask ? Et.unstable_mask.pathname : '/', !0);
      (G !== '/' && (Nt.pathname = Nt.pathname === '/' ? G : Ul([G, Nt.pathname])),
        (W = Y.createHref(Nt)));
    }
    let [Mt, Kt, Cl] = _0(c, V),
      hl = Y0(C, {
        replace: b,
        unstable_mask: O,
        state: p,
        target: v,
        preventScrollReset: A,
        relative: d,
        viewTransition: x,
        unstable_defaultShouldRevalidate: K,
        unstable_useTransitions: F,
      });
    function Jt(Nt) {
      (o && o(Nt), Nt.defaultPrevented || hl(Nt));
    }
    let Nl = !(mt.isExternal || y),
      ml = D.createElement('a', {
        ...V,
        ...Cl,
        href: (Nl ? W : void 0) || mt.absoluteURL || st,
        onClick: Nl ? Jt : o,
        ref: C0(j, Kt),
        target: v,
        'data-discover': !w && s === 'render' ? 'true' : void 0,
      });
    return Mt && !w ? D.createElement(D.Fragment, null, ml, D.createElement(O0, { page: st })) : ml;
  });
Uh.displayName = 'Link';
var x0 = D.forwardRef(function (
  {
    'aria-current': o = 'page',
    caseSensitive: s = !1,
    className: c = '',
    end: d = !1,
    style: y,
    to: b,
    viewTransition: O,
    children: p,
    ...v
  },
  C
) {
  let A = xu(b, { relative: v.relative }),
    x = ue(),
    K = D.useContext(ni),
    { navigator: V, basename: j } = D.useContext(Rl),
    G = K != null && Q0(A) && O === !0,
    Y = V.encodeLocation ? V.encodeLocation(A).pathname : A.pathname,
    F = x.pathname,
    w = K && K.navigation && K.navigation.location ? K.navigation.location.pathname : null;
  (s || ((F = F.toLowerCase()), (w = w ? w.toLowerCase() : null), (Y = Y.toLowerCase())),
    w && j && (w = ee(w, j) || w));
  const mt = Y !== '/' && Y.endsWith('/') ? Y.length - 1 : Y.length;
  let st = F === Y || (!d && F.startsWith(Y) && F.charAt(mt) === '/'),
    Et = w != null && (w === Y || (!d && w.startsWith(Y) && w.charAt(Y.length) === '/')),
    W = { isActive: st, isPending: Et, isTransitioning: G },
    Mt = st ? o : void 0,
    Kt;
  typeof c == 'function'
    ? (Kt = c(W))
    : (Kt = [c, st ? 'active' : null, Et ? 'pending' : null, G ? 'transitioning' : null]
        .filter(Boolean)
        .join(' '));
  let Cl = typeof y == 'function' ? y(W) : y;
  return D.createElement(
    Uh,
    { ...v, 'aria-current': Mt, className: Kt, ref: C, style: Cl, to: b, viewTransition: O },
    typeof p == 'function' ? p(W) : p
  );
});
x0.displayName = 'NavLink';
var B0 = D.forwardRef(
  (
    {
      discover: f = 'render',
      fetcherKey: o,
      navigate: s,
      reloadDocument: c,
      replace: d,
      state: y,
      method: b = li,
      action: O,
      onSubmit: p,
      relative: v,
      preventScrollReset: C,
      viewTransition: A,
      unstable_defaultShouldRevalidate: x,
      ...K
    },
    V
  ) => {
    let { unstable_useTransitions: j } = D.useContext(Rl),
      G = G0(),
      Y = X0(O, { relative: v }),
      F = b.toLowerCase() === 'get' ? 'get' : 'post',
      w = typeof O == 'string' && Dh.test(O),
      mt = (st) => {
        if ((p && p(st), st.defaultPrevented)) return;
        st.preventDefault();
        let Et = st.nativeEvent.submitter,
          W = (Et == null ? void 0 : Et.getAttribute('formmethod')) || b,
          Mt = () =>
            G(Et || st.currentTarget, {
              fetcherKey: o,
              method: W,
              navigate: s,
              replace: d,
              state: y,
              relative: v,
              preventScrollReset: C,
              viewTransition: A,
              unstable_defaultShouldRevalidate: x,
            });
        j && s !== !1 ? D.startTransition(() => Mt()) : Mt();
      };
    return D.createElement('form', {
      ref: V,
      method: F,
      action: Y,
      onSubmit: c ? p : mt,
      ...K,
      'data-discover': !w && f === 'render' ? 'true' : void 0,
    });
  }
);
B0.displayName = 'Form';
function q0(f) {
  return `${f} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function Ch(f) {
  let o = D.useContext(xa);
  return (Rt(o, q0(f)), o);
}
function Y0(
  f,
  {
    target: o,
    replace: s,
    unstable_mask: c,
    state: d,
    preventScrollReset: y,
    relative: b,
    viewTransition: O,
    unstable_defaultShouldRevalidate: p,
    unstable_useTransitions: v,
  } = {}
) {
  let C = wv(),
    A = ue(),
    x = xu(f, { relative: b });
  return D.useCallback(
    (K) => {
      if (m0(K, o)) {
        K.preventDefault();
        let V = s !== void 0 ? s : Cu(A) === Cu(x),
          j = () =>
            C(f, {
              replace: V,
              unstable_mask: c,
              state: d,
              preventScrollReset: y,
              relative: b,
              viewTransition: O,
              unstable_defaultShouldRevalidate: p,
            });
        v ? D.startTransition(() => j()) : j();
      }
    },
    [A, C, x, s, c, d, o, f, y, b, O, p, v]
  );
}
var L0 = 0,
  j0 = () => `__${String(++L0)}__`;
function G0() {
  let { router: f } = Ch('useSubmit'),
    { basename: o } = D.useContext(Rl),
    s = u0(),
    c = f.fetch,
    d = f.navigate;
  return D.useCallback(
    async (y, b = {}) => {
      let { action: O, method: p, encType: v, formData: C, body: A } = g0(y, o);
      if (b.navigate === !1) {
        let x = b.fetcherKey || j0();
        await c(x, s, b.action || O, {
          unstable_defaultShouldRevalidate: b.unstable_defaultShouldRevalidate,
          preventScrollReset: b.preventScrollReset,
          formData: C,
          body: A,
          formMethod: b.method || p,
          formEncType: b.encType || v,
          flushSync: b.flushSync,
        });
      } else
        await d(b.action || O, {
          unstable_defaultShouldRevalidate: b.unstable_defaultShouldRevalidate,
          preventScrollReset: b.preventScrollReset,
          formData: C,
          body: A,
          formMethod: b.method || p,
          formEncType: b.encType || v,
          replace: b.replace,
          state: b.state,
          fromRouteId: s,
          flushSync: b.flushSync,
          viewTransition: b.viewTransition,
        });
    },
    [c, d, o, s]
  );
}
function X0(f, { relative: o } = {}) {
  let { basename: s } = D.useContext(Rl),
    c = D.useContext(ae);
  Rt(c, 'useFormAction must be used inside a RouteContext');
  let [d] = c.matches.slice(-1),
    y = { ...xu(f || '.', { relative: o }) },
    b = ue();
  if (f == null) {
    y.search = b.search;
    let O = new URLSearchParams(y.search),
      p = O.getAll('index');
    if (p.some((C) => C === '')) {
      (O.delete('index'), p.filter((A) => A).forEach((A) => O.append('index', A)));
      let C = O.toString();
      y.search = C ? `?${C}` : '';
    }
  }
  return (
    (!f || f === '.') &&
      d.route.index &&
      (y.search = y.search ? y.search.replace(/^\?/, '?index&') : '?index'),
    s !== '/' && (y.pathname = y.pathname === '/' ? s : Ul([s, y.pathname])),
    Cu(y)
  );
}
function Q0(f, { relative: o } = {}) {
  let s = D.useContext(Eh);
  Rt(
    s != null,
    "`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?"
  );
  let { basename: c } = Ch('useViewTransitionState'),
    d = xu(f, { relative: o });
  if (!s.isTransitioning) return !1;
  let y = ee(s.currentLocation.pathname, c) || s.currentLocation.pathname,
    b = ee(s.nextLocation.pathname, c) || s.nextLocation.pathname;
  return ai(d.pathname, b) != null || ai(d.pathname, y) != null;
}
const Z0 = '_index_1c4bz_1',
  V0 = { index: Z0 },
  K0 = () =>
    Dl.jsx('div', { className: V0.index, children: Dl.jsx('h1', { children: '世界樹ライク' }) }),
  J0 = () => Dl.jsx('div', { children: Dl.jsx('h1', { children: 'Not Found' }) });
function w0() {
  return Dl.jsxs(r0, {
    children: [
      Dl.jsx(qc, { path: '/', element: Dl.jsx(K0, {}) }),
      Dl.jsx(qc, { path: '*', element: Dl.jsx(J0, {}) }),
    ],
  });
}
const Nh = document.getElementById('root');
if (!Nh) throw new Error('Failed to find #root element');
sv.createRoot(Nh).render(Dl.jsx(H0, { basename: '/sekaiju-like-game', children: Dl.jsx(w0, {}) }));
