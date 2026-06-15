var Yv = Object.defineProperty;
var Xv = (l, i, o) =>
  i in l ? Yv(l, i, { enumerable: !0, configurable: !0, writable: !0, value: o }) : (l[i] = o);
var mc = (l, i, o) => Xv(l, typeof i != 'symbol' ? i + '' : i, o);
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
var _c = { exports: {} },
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
function Vv() {
  if (hp) return Ui;
  hp = 1;
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
  return ((Ui.Fragment = i), (Ui.jsx = o), (Ui.jsxs = o), Ui);
}
var gp;
function Qv() {
  return (gp || ((gp = 1), (_c.exports = Vv())), _c.exports);
}
var m = Qv(),
  fc = { exports: {} },
  Gi = {},
  pc = { exports: {} },
  hc = {};
/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var kp;
function Kv() {
  return (
    kp ||
      ((kp = 1),
      (function (l) {
        function i(L, J) {
          var ae = L.length;
          L.push(J);
          e: for (; 0 < ae; ) {
            var ge = (ae - 1) >>> 1,
              Q = L[ge];
            if (0 < c(Q, J)) ((L[ge] = J), (L[ae] = Q), (ae = ge));
            else break e;
          }
        }
        function o(L) {
          return L.length === 0 ? null : L[0];
        }
        function r(L) {
          if (L.length === 0) return null;
          var J = L[0],
            ae = L.pop();
          if (ae !== J) {
            L[0] = ae;
            e: for (var ge = 0, Q = L.length, b = Q >>> 1; ge < b; ) {
              var H = 2 * (ge + 1) - 1,
                P = L[H],
                F = H + 1,
                re = L[F];
              if (0 > c(P, ae))
                F < Q && 0 > c(re, P)
                  ? ((L[ge] = re), (L[F] = ae), (ge = F))
                  : ((L[ge] = P), (L[H] = ae), (ge = H));
              else if (F < Q && 0 > c(re, ae)) ((L[ge] = re), (L[F] = ae), (ge = F));
              else break e;
            }
          }
          return J;
        }
        function c(L, J) {
          var ae = L.sortIndex - J.sortIndex;
          return ae !== 0 ? ae : L.id - J.id;
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
          B = 3,
          A = !1,
          I = !1,
          w = !1,
          x = !1,
          S = typeof setTimeout == 'function' ? setTimeout : null,
          j = typeof clearTimeout == 'function' ? clearTimeout : null,
          G = typeof setImmediate < 'u' ? setImmediate : null;
        function M(L) {
          for (var J = o(g); J !== null; ) {
            if (J.callback === null) r(g);
            else if (J.startTime <= L) (r(g), (J.sortIndex = J.expirationTime), i(p, J));
            else break;
            J = o(g);
          }
        }
        function ee(L) {
          if (((w = !1), M(L), !I))
            if (o(p) !== null) ((I = !0), Y || ((Y = !0), ue()));
            else {
              var J = o(g);
              J !== null && ke(ee, J.startTime - L);
            }
        }
        var Y = !1,
          C = -1,
          K = 5,
          te = -1;
        function de() {
          return x ? !0 : !(l.unstable_now() - te < K);
        }
        function le() {
          if (((x = !1), Y)) {
            var L = l.unstable_now();
            te = L;
            var J = !0;
            try {
              e: {
                ((I = !1), w && ((w = !1), j(C), (C = -1)), (A = !0));
                var ae = B;
                try {
                  t: {
                    for (M(L), v = o(p); v !== null && !(v.expirationTime > L && de()); ) {
                      var ge = v.callback;
                      if (typeof ge == 'function') {
                        ((v.callback = null), (B = v.priorityLevel));
                        var Q = ge(v.expirationTime <= L);
                        if (((L = l.unstable_now()), typeof Q == 'function')) {
                          ((v.callback = Q), M(L), (J = !0));
                          break t;
                        }
                        (v === o(p) && r(p), M(L));
                      } else r(p);
                      v = o(p);
                    }
                    if (v !== null) J = !0;
                    else {
                      var b = o(g);
                      (b !== null && ke(ee, b.startTime - L), (J = !1));
                    }
                  }
                  break e;
                } finally {
                  ((v = null), (B = ae), (A = !1));
                }
                J = void 0;
              }
            } finally {
              J ? ue() : (Y = !1);
            }
          }
        }
        var ue;
        if (typeof G == 'function')
          ue = function () {
            G(le);
          };
        else if (typeof MessageChannel < 'u') {
          var ye = new MessageChannel(),
            Se = ye.port2;
          ((ye.port1.onmessage = le),
            (ue = function () {
              Se.postMessage(null);
            }));
        } else
          ue = function () {
            S(le, 0);
          };
        function ke(L, J) {
          C = S(function () {
            L(l.unstable_now());
          }, J);
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
              : (K = 0 < L ? Math.floor(1e3 / L) : 5);
          }),
          (l.unstable_getCurrentPriorityLevel = function () {
            return B;
          }),
          (l.unstable_next = function (L) {
            switch (B) {
              case 1:
              case 2:
              case 3:
                var J = 3;
                break;
              default:
                J = B;
            }
            var ae = B;
            B = J;
            try {
              return L();
            } finally {
              B = ae;
            }
          }),
          (l.unstable_requestPaint = function () {
            x = !0;
          }),
          (l.unstable_runWithPriority = function (L, J) {
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
            var ae = B;
            B = L;
            try {
              return J();
            } finally {
              B = ae;
            }
          }),
          (l.unstable_scheduleCallback = function (L, J, ae) {
            var ge = l.unstable_now();
            switch (
              (typeof ae == 'object' && ae !== null
                ? ((ae = ae.delay), (ae = typeof ae == 'number' && 0 < ae ? ge + ae : ge))
                : (ae = ge),
              L)
            ) {
              case 1:
                var Q = -1;
                break;
              case 2:
                Q = 250;
                break;
              case 5:
                Q = 1073741823;
                break;
              case 4:
                Q = 1e4;
                break;
              default:
                Q = 5e3;
            }
            return (
              (Q = ae + Q),
              (L = {
                id: y++,
                callback: J,
                priorityLevel: L,
                startTime: ae,
                expirationTime: Q,
                sortIndex: -1,
              }),
              ae > ge
                ? ((L.sortIndex = ae),
                  i(g, L),
                  o(p) === null && L === o(g) && (w ? (j(C), (C = -1)) : (w = !0), ke(ee, ae - ge)))
                : ((L.sortIndex = Q), i(p, L), I || A || ((I = !0), Y || ((Y = !0), ue()))),
              L
            );
          }),
          (l.unstable_shouldYield = de),
          (l.unstable_wrapCallback = function (L) {
            var J = B;
            return function () {
              var ae = B;
              B = J;
              try {
                return L.apply(this, arguments);
              } finally {
                B = ae;
              }
            };
          }));
      })(hc)),
    hc
  );
}
var vp;
function Zv() {
  return (vp || ((vp = 1), (pc.exports = Kv())), pc.exports);
}
var gc = { exports: {} },
  ve = {};
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var yp;
function Jv() {
  if (yp) return ve;
  yp = 1;
  var l = Symbol.for('react.transitional.element'),
    i = Symbol.for('react.portal'),
    o = Symbol.for('react.fragment'),
    r = Symbol.for('react.strict_mode'),
    c = Symbol.for('react.profiler'),
    d = Symbol.for('react.consumer'),
    f = Symbol.for('react.context'),
    h = Symbol.for('react.forward_ref'),
    p = Symbol.for('react.suspense'),
    g = Symbol.for('react.memo'),
    y = Symbol.for('react.lazy'),
    v = Symbol.for('react.activity'),
    B = Symbol.iterator;
  function A(b) {
    return b === null || typeof b != 'object'
      ? null
      : ((b = (B && b[B]) || b['@@iterator']), typeof b == 'function' ? b : null);
  }
  var I = {
      isMounted: function () {
        return !1;
      },
      enqueueForceUpdate: function () {},
      enqueueReplaceState: function () {},
      enqueueSetState: function () {},
    },
    w = Object.assign,
    x = {};
  function S(b, H, P) {
    ((this.props = b), (this.context = H), (this.refs = x), (this.updater = P || I));
  }
  ((S.prototype.isReactComponent = {}),
    (S.prototype.setState = function (b, H) {
      if (typeof b != 'object' && typeof b != 'function' && b != null)
        throw Error(
          'takes an object of state variables to update or a function which returns an object of state variables.'
        );
      this.updater.enqueueSetState(this, b, H, 'setState');
    }),
    (S.prototype.forceUpdate = function (b) {
      this.updater.enqueueForceUpdate(this, b, 'forceUpdate');
    }));
  function j() {}
  j.prototype = S.prototype;
  function G(b, H, P) {
    ((this.props = b), (this.context = H), (this.refs = x), (this.updater = P || I));
  }
  var M = (G.prototype = new j());
  ((M.constructor = G), w(M, S.prototype), (M.isPureReactComponent = !0));
  var ee = Array.isArray;
  function Y() {}
  var C = { H: null, A: null, T: null, S: null },
    K = Object.prototype.hasOwnProperty;
  function te(b, H, P) {
    var F = P.ref;
    return { $$typeof: l, type: b, key: H, ref: F !== void 0 ? F : null, props: P };
  }
  function de(b, H) {
    return te(b.type, H, b.props);
  }
  function le(b) {
    return typeof b == 'object' && b !== null && b.$$typeof === l;
  }
  function ue(b) {
    var H = { '=': '=0', ':': '=2' };
    return (
      '$' +
      b.replace(/[=:]/g, function (P) {
        return H[P];
      })
    );
  }
  var ye = /\/+/g;
  function Se(b, H) {
    return typeof b == 'object' && b !== null && b.key != null ? ue('' + b.key) : H.toString(36);
  }
  function ke(b) {
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
                function (H) {
                  b.status === 'pending' && ((b.status = 'fulfilled'), (b.value = H));
                },
                function (H) {
                  b.status === 'pending' && ((b.status = 'rejected'), (b.reason = H));
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
  function L(b, H, P, F, re) {
    var fe = typeof b;
    (fe === 'undefined' || fe === 'boolean') && (b = null);
    var ce = !1;
    if (b === null) ce = !0;
    else
      switch (fe) {
        case 'bigint':
        case 'string':
        case 'number':
          ce = !0;
          break;
        case 'object':
          switch (b.$$typeof) {
            case l:
            case i:
              ce = !0;
              break;
            case y:
              return ((ce = b._init), L(ce(b._payload), H, P, F, re));
          }
      }
    if (ce)
      return (
        (re = re(b)),
        (ce = F === '' ? '.' + Se(b, 0) : F),
        ee(re)
          ? ((P = ''),
            ce != null && (P = ce.replace(ye, '$&/') + '/'),
            L(re, H, P, '', function (tl) {
              return tl;
            }))
          : re != null &&
            (le(re) &&
              (re = de(
                re,
                P +
                  (re.key == null || (b && b.key === re.key)
                    ? ''
                    : ('' + re.key).replace(ye, '$&/') + '/') +
                  ce
              )),
            H.push(re)),
        1
      );
    ce = 0;
    var Ae = F === '' ? '.' : F + ':';
    if (ee(b))
      for (var Ie = 0; Ie < b.length; Ie++)
        ((F = b[Ie]), (fe = Ae + Se(F, Ie)), (ce += L(F, H, P, fe, re)));
    else if (((Ie = A(b)), typeof Ie == 'function'))
      for (b = Ie.call(b), Ie = 0; !(F = b.next()).done; )
        ((F = F.value), (fe = Ae + Se(F, Ie++)), (ce += L(F, H, P, fe, re)));
    else if (fe === 'object') {
      if (typeof b.then == 'function') return L(ke(b), H, P, F, re);
      throw (
        (H = String(b)),
        Error(
          'Objects are not valid as a React child (found: ' +
            (H === '[object Object]' ? 'object with keys {' + Object.keys(b).join(', ') + '}' : H) +
            '). If you meant to render a collection of children, use an array instead.'
        )
      );
    }
    return ce;
  }
  function J(b, H, P) {
    if (b == null) return b;
    var F = [],
      re = 0;
    return (
      L(b, F, '', '', function (fe) {
        return H.call(P, fe, re++);
      }),
      F
    );
  }
  function ae(b) {
    if (b._status === -1) {
      var H = b._result;
      ((H = H()),
        H.then(
          function (P) {
            (b._status === 0 || b._status === -1) && ((b._status = 1), (b._result = P));
          },
          function (P) {
            (b._status === 0 || b._status === -1) && ((b._status = 2), (b._result = P));
          }
        ),
        b._status === -1 && ((b._status = 0), (b._result = H)));
    }
    if (b._status === 1) return b._result.default;
    throw b._result;
  }
  var ge =
      typeof reportError == 'function'
        ? reportError
        : function (b) {
            if (typeof window == 'object' && typeof window.ErrorEvent == 'function') {
              var H = new window.ErrorEvent('error', {
                bubbles: !0,
                cancelable: !0,
                message:
                  typeof b == 'object' && b !== null && typeof b.message == 'string'
                    ? String(b.message)
                    : String(b),
                error: b,
              });
              if (!window.dispatchEvent(H)) return;
            } else if (typeof process == 'object' && typeof process.emit == 'function') {
              process.emit('uncaughtException', b);
              return;
            }
            console.error(b);
          },
    Q = {
      map: J,
      forEach: function (b, H, P) {
        J(
          b,
          function () {
            H.apply(this, arguments);
          },
          P
        );
      },
      count: function (b) {
        var H = 0;
        return (
          J(b, function () {
            H++;
          }),
          H
        );
      },
      toArray: function (b) {
        return (
          J(b, function (H) {
            return H;
          }) || []
        );
      },
      only: function (b) {
        if (!le(b))
          throw Error('React.Children.only expected to receive a single React element child.');
        return b;
      },
    };
  return (
    (ve.Activity = v),
    (ve.Children = Q),
    (ve.Component = S),
    (ve.Fragment = o),
    (ve.Profiler = c),
    (ve.PureComponent = G),
    (ve.StrictMode = r),
    (ve.Suspense = p),
    (ve.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = C),
    (ve.__COMPILER_RUNTIME = {
      __proto__: null,
      c: function (b) {
        return C.H.useMemoCache(b);
      },
    }),
    (ve.cache = function (b) {
      return function () {
        return b.apply(null, arguments);
      };
    }),
    (ve.cacheSignal = function () {
      return null;
    }),
    (ve.cloneElement = function (b, H, P) {
      if (b == null) throw Error('The argument must be a React element, but you passed ' + b + '.');
      var F = w({}, b.props),
        re = b.key;
      if (H != null)
        for (fe in (H.key !== void 0 && (re = '' + H.key), H))
          !K.call(H, fe) ||
            fe === 'key' ||
            fe === '__self' ||
            fe === '__source' ||
            (fe === 'ref' && H.ref === void 0) ||
            (F[fe] = H[fe]);
      var fe = arguments.length - 2;
      if (fe === 1) F.children = P;
      else if (1 < fe) {
        for (var ce = Array(fe), Ae = 0; Ae < fe; Ae++) ce[Ae] = arguments[Ae + 2];
        F.children = ce;
      }
      return te(b.type, re, F);
    }),
    (ve.createContext = function (b) {
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
    (ve.createElement = function (b, H, P) {
      var F,
        re = {},
        fe = null;
      if (H != null)
        for (F in (H.key !== void 0 && (fe = '' + H.key), H))
          K.call(H, F) && F !== 'key' && F !== '__self' && F !== '__source' && (re[F] = H[F]);
      var ce = arguments.length - 2;
      if (ce === 1) re.children = P;
      else if (1 < ce) {
        for (var Ae = Array(ce), Ie = 0; Ie < ce; Ie++) Ae[Ie] = arguments[Ie + 2];
        re.children = Ae;
      }
      if (b && b.defaultProps)
        for (F in ((ce = b.defaultProps), ce)) re[F] === void 0 && (re[F] = ce[F]);
      return te(b, fe, re);
    }),
    (ve.createRef = function () {
      return { current: null };
    }),
    (ve.forwardRef = function (b) {
      return { $$typeof: h, render: b };
    }),
    (ve.isValidElement = le),
    (ve.lazy = function (b) {
      return { $$typeof: y, _payload: { _status: -1, _result: b }, _init: ae };
    }),
    (ve.memo = function (b, H) {
      return { $$typeof: g, type: b, compare: H === void 0 ? null : H };
    }),
    (ve.startTransition = function (b) {
      var H = C.T,
        P = {};
      C.T = P;
      try {
        var F = b(),
          re = C.S;
        (re !== null && re(P, F),
          typeof F == 'object' && F !== null && typeof F.then == 'function' && F.then(Y, ge));
      } catch (fe) {
        ge(fe);
      } finally {
        (H !== null && P.types !== null && (H.types = P.types), (C.T = H));
      }
    }),
    (ve.unstable_useCacheRefresh = function () {
      return C.H.useCacheRefresh();
    }),
    (ve.use = function (b) {
      return C.H.use(b);
    }),
    (ve.useActionState = function (b, H, P) {
      return C.H.useActionState(b, H, P);
    }),
    (ve.useCallback = function (b, H) {
      return C.H.useCallback(b, H);
    }),
    (ve.useContext = function (b) {
      return C.H.useContext(b);
    }),
    (ve.useDebugValue = function () {}),
    (ve.useDeferredValue = function (b, H) {
      return C.H.useDeferredValue(b, H);
    }),
    (ve.useEffect = function (b, H) {
      return C.H.useEffect(b, H);
    }),
    (ve.useEffectEvent = function (b) {
      return C.H.useEffectEvent(b);
    }),
    (ve.useId = function () {
      return C.H.useId();
    }),
    (ve.useImperativeHandle = function (b, H, P) {
      return C.H.useImperativeHandle(b, H, P);
    }),
    (ve.useInsertionEffect = function (b, H) {
      return C.H.useInsertionEffect(b, H);
    }),
    (ve.useLayoutEffect = function (b, H) {
      return C.H.useLayoutEffect(b, H);
    }),
    (ve.useMemo = function (b, H) {
      return C.H.useMemo(b, H);
    }),
    (ve.useOptimistic = function (b, H) {
      return C.H.useOptimistic(b, H);
    }),
    (ve.useReducer = function (b, H, P) {
      return C.H.useReducer(b, H, P);
    }),
    (ve.useRef = function (b) {
      return C.H.useRef(b);
    }),
    (ve.useState = function (b) {
      return C.H.useState(b);
    }),
    (ve.useSyncExternalStore = function (b, H, P) {
      return C.H.useSyncExternalStore(b, H, P);
    }),
    (ve.useTransition = function () {
      return C.H.useTransition();
    }),
    (ve.version = '19.2.5'),
    ve
  );
}
var bp;
function Zc() {
  return (bp || ((bp = 1), (gc.exports = Jv())), gc.exports);
}
var kc = { exports: {} },
  bt = {};
/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var xp;
function Pv() {
  if (xp) return bt;
  xp = 1;
  var l = Zc();
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
    c = Symbol.for('react.portal');
  function d(p, g, y) {
    var v = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: c,
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
    (bt.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = r),
    (bt.createPortal = function (p, g) {
      var y = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
      if (!g || (g.nodeType !== 1 && g.nodeType !== 9 && g.nodeType !== 11)) throw Error(i(299));
      return d(p, g, null, y);
    }),
    (bt.flushSync = function (p) {
      var g = f.T,
        y = r.p;
      try {
        if (((f.T = null), (r.p = 2), p)) return p();
      } finally {
        ((f.T = g), (r.p = y), r.d.f());
      }
    }),
    (bt.preconnect = function (p, g) {
      typeof p == 'string' &&
        (g
          ? ((g = g.crossOrigin),
            (g = typeof g == 'string' ? (g === 'use-credentials' ? g : '') : void 0))
          : (g = null),
        r.d.C(p, g));
    }),
    (bt.prefetchDNS = function (p) {
      typeof p == 'string' && r.d.D(p);
    }),
    (bt.preinit = function (p, g) {
      if (typeof p == 'string' && g && typeof g.as == 'string') {
        var y = g.as,
          v = h(y, g.crossOrigin),
          B = typeof g.integrity == 'string' ? g.integrity : void 0,
          A = typeof g.fetchPriority == 'string' ? g.fetchPriority : void 0;
        y === 'style'
          ? r.d.S(p, typeof g.precedence == 'string' ? g.precedence : void 0, {
              crossOrigin: v,
              integrity: B,
              fetchPriority: A,
            })
          : y === 'script' &&
            r.d.X(p, {
              crossOrigin: v,
              integrity: B,
              fetchPriority: A,
              nonce: typeof g.nonce == 'string' ? g.nonce : void 0,
            });
      }
    }),
    (bt.preinitModule = function (p, g) {
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
    (bt.preload = function (p, g) {
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
    (bt.preloadModule = function (p, g) {
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
    (bt.requestFormReset = function (p) {
      r.d.r(p);
    }),
    (bt.unstable_batchedUpdates = function (p, g) {
      return p(g);
    }),
    (bt.useFormState = function (p, g, y) {
      return f.H.useFormState(p, g, y);
    }),
    (bt.useFormStatus = function () {
      return f.H.useHostTransitionStatus();
    }),
    (bt.version = '19.2.5'),
    bt
  );
}
var Sp;
function Fv() {
  if (Sp) return kc.exports;
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
  return (l(), (kc.exports = Pv()), kc.exports);
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
function Wv() {
  if (wp) return Gi;
  wp = 1;
  var l = Zv(),
    i = Zc(),
    o = Fv();
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
          if (u === a) return (p(s), e);
          if (u === n) return (p(s), t);
          u = u.sibling;
        }
        throw Error(r(188));
      }
      if (a.return !== n.return) ((a = s), (n = u));
      else {
        for (var _ = !1, k = s.child; k; ) {
          if (k === a) {
            ((_ = !0), (a = s), (n = u));
            break;
          }
          if (k === n) {
            ((_ = !0), (n = s), (a = u));
            break;
          }
          k = k.sibling;
        }
        if (!_) {
          for (k = u.child; k; ) {
            if (k === a) {
              ((_ = !0), (a = u), (n = s));
              break;
            }
            if (k === n) {
              ((_ = !0), (n = u), (a = s));
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
    B = Symbol.for('react.element'),
    A = Symbol.for('react.transitional.element'),
    I = Symbol.for('react.portal'),
    w = Symbol.for('react.fragment'),
    x = Symbol.for('react.strict_mode'),
    S = Symbol.for('react.profiler'),
    j = Symbol.for('react.consumer'),
    G = Symbol.for('react.context'),
    M = Symbol.for('react.forward_ref'),
    ee = Symbol.for('react.suspense'),
    Y = Symbol.for('react.suspense_list'),
    C = Symbol.for('react.memo'),
    K = Symbol.for('react.lazy'),
    te = Symbol.for('react.activity'),
    de = Symbol.for('react.memo_cache_sentinel'),
    le = Symbol.iterator;
  function ue(e) {
    return e === null || typeof e != 'object'
      ? null
      : ((e = (le && e[le]) || e['@@iterator']), typeof e == 'function' ? e : null);
  }
  var ye = Symbol.for('react.client.reference');
  function Se(e) {
    if (e == null) return null;
    if (typeof e == 'function') return e.$$typeof === ye ? null : e.displayName || e.name || null;
    if (typeof e == 'string') return e;
    switch (e) {
      case w:
        return 'Fragment';
      case S:
        return 'Profiler';
      case x:
        return 'StrictMode';
      case ee:
        return 'Suspense';
      case Y:
        return 'SuspenseList';
      case te:
        return 'Activity';
    }
    if (typeof e == 'object')
      switch (e.$$typeof) {
        case I:
          return 'Portal';
        case G:
          return e.displayName || 'Context';
        case j:
          return (e._context.displayName || 'Context') + '.Consumer';
        case M:
          var t = e.render;
          return (
            (e = e.displayName),
            e ||
              ((e = t.displayName || t.name || ''),
              (e = e !== '' ? 'ForwardRef(' + e + ')' : 'ForwardRef')),
            e
          );
        case C:
          return ((t = e.displayName || null), t !== null ? t : Se(e.type) || 'Memo');
        case K:
          ((t = e._payload), (e = e._init));
          try {
            return Se(e(t));
          } catch {}
      }
    return null;
  }
  var ke = Array.isArray,
    L = i.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
    J = o.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
    ae = { pending: !1, data: null, method: null, action: null },
    ge = [],
    Q = -1;
  function b(e) {
    return { current: e };
  }
  function H(e) {
    0 > Q || ((e.current = ge[Q]), (ge[Q] = null), Q--);
  }
  function P(e, t) {
    (Q++, (ge[Q] = e.current), (e.current = t));
  }
  var F = b(null),
    re = b(null),
    fe = b(null),
    ce = b(null);
  function Ae(e, t) {
    switch ((P(fe, t), P(re, e), P(F, null), t.nodeType)) {
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
    (H(F), P(F, e));
  }
  function Ie() {
    (H(F), H(re), H(fe));
  }
  function tl(e) {
    e.memoizedState !== null && P(ce, e);
    var t = F.current,
      a = Hf(t, e.type);
    t !== a && (P(re, e), P(F, a));
  }
  function yl(e) {
    (re.current === e && (H(F), H(re)), ce.current === e && (H(ce), (Di._currentValue = ae)));
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
                } catch (U) {
                  var z = U;
                }
                Reflect.construct(e, [], V);
              } else {
                try {
                  V.call();
                } catch (U) {
                  z = U;
                }
                e.call(V.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (U) {
                z = U;
              }
              (V = e()) && typeof V.catch == 'function' && V.catch(function () {});
            }
          } catch (U) {
            if (U && z && typeof U.stack == 'string') return [U.stack, z.stack];
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
        _ = u[0],
        k = u[1];
      if (_ && k) {
        var T = _.split(`
`),
          R = k.split(`
`);
        for (s = n = 0; n < T.length && !T[n].includes('DetermineComponentFrameRoot'); ) n++;
        for (; s < R.length && !R[s].includes('DetermineComponentFrameRoot'); ) s++;
        if (n === T.length || s === R.length)
          for (n = T.length - 1, s = R.length - 1; 1 <= n && 0 <= s && T[n] !== R[s]; ) s--;
        for (; 1 <= n && 0 <= s; n--, s--)
          if (T[n] !== R[s]) {
            if (n !== 1 || s !== 1)
              do
                if ((n--, s--, 0 > s || T[n] !== R[s])) {
                  var $ =
                    `
` + T[n].replace(' at new ', ' at ');
                  return (
                    e.displayName &&
                      $.includes('<anonymous>') &&
                      ($ = $.replace('<anonymous>', e.displayName)),
                    $
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
  function as(e) {
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
  var Va = Object.prototype.hasOwnProperty,
    Qa = l.unstable_scheduleCallback,
    Zn = l.unstable_cancelCallback,
    ns = l.unstable_shouldYield,
    is = l.unstable_requestPaint,
    yt = l.unstable_now,
    q = l.unstable_getCurrentPriorityLevel,
    W = l.unstable_ImmediatePriority,
    ie = l.unstable_UserBlockingPriority,
    _e = l.unstable_NormalPriority,
    Ke = l.unstable_LowPriority,
    Ql = l.unstable_IdlePriority,
    ss = l.log,
    Ka = l.unstable_setDisableYieldValue,
    xl = null,
    Lt = null;
  function Kl(e) {
    if ((typeof ss == 'function' && Ka(e), Lt && typeof Lt.setStrictMode == 'function'))
      try {
        Lt.setStrictMode(xl, e);
      } catch {}
  }
  var qt = Math.clz32 ? Math.clz32 : Ag,
    jg = Math.log,
    Ng = Math.LN2;
  function Ag(e) {
    return ((e >>>= 0), e === 0 ? 32 : (31 - ((jg(e) / Ng) | 0)) | 0);
  }
  var rs = 256,
    os = 262144,
    us = 4194304;
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
  function cs(e, t, a) {
    var n = e.pendingLanes;
    if (n === 0) return 0;
    var s = 0,
      u = e.suspendedLanes,
      _ = e.pingedLanes;
    e = e.warmLanes;
    var k = n & 134217727;
    return (
      k !== 0
        ? ((n = k & ~u),
          n !== 0
            ? (s = xa(n))
            : ((_ &= k), _ !== 0 ? (s = xa(_)) : a || ((a = k & ~e), a !== 0 && (s = xa(a)))))
        : ((k = n & ~u),
          k !== 0
            ? (s = xa(k))
            : _ !== 0
              ? (s = xa(_))
              : a || ((a = n & ~e), a !== 0 && (s = xa(a)))),
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
  function Jn(e, t) {
    return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & t) === 0;
  }
  function Lg(e, t) {
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
    var e = us;
    return ((us <<= 1), (us & 62914560) === 0 && (us = 4194304), e);
  }
  function Wr(e) {
    for (var t = [], a = 0; 31 > a; a++) t.push(e);
    return t;
  }
  function Pn(e, t) {
    ((e.pendingLanes |= t),
      t !== 268435456 && ((e.suspendedLanes = 0), (e.pingedLanes = 0), (e.warmLanes = 0)));
  }
  function qg(e, t, a, n, s, u) {
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
      T = e.expirationTimes,
      R = e.hiddenUpdates;
    for (a = _ & ~a; 0 < a; ) {
      var $ = 31 - qt(a),
        V = 1 << $;
      ((k[$] = 0), (T[$] = -1));
      var z = R[$];
      if (z !== null)
        for (R[$] = null, $ = 0; $ < z.length; $++) {
          var U = z[$];
          U !== null && (U.lane &= -536870913);
        }
      a &= ~V;
    }
    (n !== 0 && yd(e, n, 0),
      u !== 0 && s === 0 && e.tag !== 0 && (e.suspendedLanes |= u & ~(_ & ~t)));
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
    return e !== 0 ? e : ((e = window.event), e === void 0 ? 32 : up(e.type));
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
    ft = '__reactFiber$' + Zl,
    wt = '__reactProps$' + Zl,
    Za = '__reactContainer$' + Zl,
    lo = '__reactEvents$' + Zl,
    Bg = '__reactListeners$' + Zl,
    Og = '__reactHandles$' + Zl,
    Td = '__reactResources$' + Zl,
    Fn = '__reactMarker$' + Zl;
  function ao(e) {
    (delete e[ft], delete e[wt], delete e[lo], delete e[Bg], delete e[Og]);
  }
  function Ja(e) {
    var t = e[ft];
    if (t) return t;
    for (var a = e.parentNode; a; ) {
      if ((t = a[Za] || a[ft])) {
        if (((a = t.alternate), t.child !== null || (a !== null && a.child !== null)))
          for (e = Qf(e); e !== null; ) {
            if ((a = e[ft])) return a;
            e = Qf(e);
          }
        return t;
      }
      ((e = a), (a = e.parentNode));
    }
    return null;
  }
  function Pa(e) {
    if ((e = e[ft] || e[Za])) {
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
  function ct(e) {
    e[Fn] = !0;
  }
  var Ed = new Set(),
    Cd = {};
  function Sa(e, t) {
    (Wa(e, t), Wa(e + 'Capture', t));
  }
  function Wa(e, t) {
    for (Cd[e] = t, e = 0; e < t.length; e++) Ed.add(t[e]);
  }
  var Ig = RegExp(
      '^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$'
    ),
    jd = {},
    Nd = {};
  function Mg(e) {
    return Va.call(Nd, e)
      ? !0
      : Va.call(jd, e)
        ? !1
        : Ig.test(e)
          ? (Nd[e] = !0)
          : ((jd[e] = !0), !1);
  }
  function ds(e, t, a) {
    if (Mg(t))
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
  function ms(e, t, a) {
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
  function Ad(e) {
    var t = e.type;
    return (e = e.nodeName) && e.toLowerCase() === 'input' && (t === 'checkbox' || t === 'radio');
  }
  function Dg(e, t, a) {
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
          set: function (_) {
            ((a = '' + _), u.call(this, _));
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
      e._valueTracker = Dg(e, t, '' + e[t]);
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
  function _s(e) {
    if (((e = e || (typeof document < 'u' ? document : void 0)), typeof e > 'u')) return null;
    try {
      return e.activeElement || e.body;
    } catch {
      return e.body;
    }
  }
  var Rg = /[\n"\\]/g;
  function $t(e) {
    return e.replace(Rg, function (t) {
      return '\\' + t.charCodeAt(0).toString(16) + ' ';
    });
  }
  function io(e, t, a, n, s, u, _, k) {
    ((e.name = ''),
      _ != null && typeof _ != 'function' && typeof _ != 'symbol' && typeof _ != 'boolean'
        ? (e.type = _)
        : e.removeAttribute('type'),
      t != null
        ? _ === 'number'
          ? ((t === 0 && e.value === '') || e.value != t) && (e.value = '' + Gt(t))
          : e.value !== '' + Gt(t) && (e.value = '' + Gt(t))
        : (_ !== 'submit' && _ !== 'reset') || e.removeAttribute('value'),
      t != null
        ? so(e, _, Gt(t))
        : a != null
          ? so(e, _, Gt(a))
          : n != null && e.removeAttribute('value'),
      s == null && u != null && (e.defaultChecked = !!u),
      s != null && (e.checked = s && typeof s != 'function' && typeof s != 'symbol'),
      k != null && typeof k != 'function' && typeof k != 'symbol' && typeof k != 'boolean'
        ? (e.name = '' + Gt(k))
        : e.removeAttribute('name'));
  }
  function qd(e, t, a, n, s, u, _, k) {
    if (
      (u != null &&
        typeof u != 'function' &&
        typeof u != 'symbol' &&
        typeof u != 'boolean' &&
        (e.type = u),
      t != null || a != null)
    ) {
      if (!((u !== 'submit' && u !== 'reset') || t != null)) {
        no(e);
        return;
      }
      ((a = a != null ? '' + Gt(a) : ''),
        (t = t != null ? '' + Gt(t) : a),
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
    (t === 'number' && _s(e.ownerDocument) === e) ||
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
  function Bd(e, t, a) {
    if (t != null && ((t = '' + Gt(t)), t !== e.value && (e.value = t), a == null)) {
      e.defaultValue !== t && (e.defaultValue = t);
      return;
    }
    e.defaultValue = a != null ? '' + Gt(a) : '';
  }
  function Od(e, t, a, n) {
    if (t == null) {
      if (n != null) {
        if (a != null) throw Error(r(92));
        if (ke(n)) {
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
  var zg = new Set(
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
        : typeof a != 'number' || a === 0 || zg.has(t)
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
    } else for (var u in t) t.hasOwnProperty(u) && Id(e, u, t[u]);
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
  var Hg = new Map([
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
    Ug =
      /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function fs(e) {
    return Ug.test('' + e)
      ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')"
      : e;
  }
  function wl() {}
  var oo = null;
  function uo(e) {
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
              a = a.querySelectorAll('input[name="' + $t('' + t) + '"][type="radio"]'), t = 0;
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
  var co = !1;
  function Rd(e, t, a) {
    if (co) return e(t, a);
    co = !0;
    try {
      var n = e(t);
      return n;
    } finally {
      if (
        ((co = !1),
        (ln !== null || an !== null) &&
          (tr(), ln && ((t = ln), (e = an), (an = ln = null), Dd(t), e)))
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
    ps = null;
  function zd() {
    if (ps) return ps;
    var e,
      t = _o,
      a = t.length,
      n,
      s = 'value' in Jl ? Jl.value : Jl.textContent,
      u = s.length;
    for (e = 0; e < a && t[e] === s[e]; e++);
    var _ = a - e;
    for (n = 1; n <= _ && t[a - n] === s[u - n]; n++);
    return (ps = s.slice(e, 1 < n ? 1 - n : void 0));
  }
  function hs(e) {
    var t = e.keyCode;
    return (
      'charCode' in e ? ((e = e.charCode), e === 0 && t === 13 && (e = 13)) : (e = t),
      e === 10 && (e = 13),
      32 <= e || e === 13 ? e : 0
    );
  }
  function gs() {
    return !0;
  }
  function Hd() {
    return !1;
  }
  function Tt(e) {
    function t(a, n, s, u, _) {
      ((this._reactName = a),
        (this._targetInst = s),
        (this.type = n),
        (this.nativeEvent = u),
        (this.target = _),
        (this.currentTarget = null));
      for (var k in e) e.hasOwnProperty(k) && ((a = e[k]), (this[k] = a ? a(u) : u[k]));
      return (
        (this.isDefaultPrevented = (
          u.defaultPrevented != null ? u.defaultPrevented : u.returnValue === !1
        )
          ? gs
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
            (this.isDefaultPrevented = gs));
        },
        stopPropagation: function () {
          var a = this.nativeEvent;
          a &&
            (a.stopPropagation
              ? a.stopPropagation()
              : typeof a.cancelBubble != 'unknown' && (a.cancelBubble = !0),
            (this.isPropagationStopped = gs));
        },
        persist: function () {},
        isPersistent: gs,
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
    ks = Tt(wa),
    li = v({}, wa, { view: 0, detail: 0 }),
    Gg = Tt(li),
    fo,
    po,
    ai,
    vs = v({}, li, {
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
    Ud = Tt(vs),
    $g = v({}, vs, { dataTransfer: 0 }),
    Yg = Tt($g),
    Xg = v({}, li, { relatedTarget: 0 }),
    ho = Tt(Xg),
    Vg = v({}, wa, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
    Qg = Tt(Vg),
    Kg = v({}, wa, {
      clipboardData: function (e) {
        return 'clipboardData' in e ? e.clipboardData : window.clipboardData;
      },
    }),
    Zg = Tt(Kg),
    Jg = v({}, wa, { data: 0 }),
    Gd = Tt(Jg),
    Pg = {
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
    Fg = {
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
    Wg = { Alt: 'altKey', Control: 'ctrlKey', Meta: 'metaKey', Shift: 'shiftKey' };
  function ek(e) {
    var t = this.nativeEvent;
    return t.getModifierState ? t.getModifierState(e) : (e = Wg[e]) ? !!t[e] : !1;
  }
  function go() {
    return ek;
  }
  var tk = v({}, li, {
      key: function (e) {
        if (e.key) {
          var t = Pg[e.key] || e.key;
          if (t !== 'Unidentified') return t;
        }
        return e.type === 'keypress'
          ? ((e = hs(e)), e === 13 ? 'Enter' : String.fromCharCode(e))
          : e.type === 'keydown' || e.type === 'keyup'
            ? Fg[e.keyCode] || 'Unidentified'
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
        return e.type === 'keypress' ? hs(e) : 0;
      },
      keyCode: function (e) {
        return e.type === 'keydown' || e.type === 'keyup' ? e.keyCode : 0;
      },
      which: function (e) {
        return e.type === 'keypress'
          ? hs(e)
          : e.type === 'keydown' || e.type === 'keyup'
            ? e.keyCode
            : 0;
      },
    }),
    lk = Tt(tk),
    ak = v({}, vs, {
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
    $d = Tt(ak),
    nk = v({}, li, {
      touches: 0,
      targetTouches: 0,
      changedTouches: 0,
      altKey: 0,
      metaKey: 0,
      ctrlKey: 0,
      shiftKey: 0,
      getModifierState: go,
    }),
    ik = Tt(nk),
    sk = v({}, wa, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
    rk = Tt(sk),
    ok = v({}, vs, {
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
    uk = Tt(ok),
    ck = v({}, wa, { newState: 0, oldState: 0 }),
    dk = Tt(ck),
    mk = [9, 13, 27, 32],
    ko = Tl && 'CompositionEvent' in window,
    ni = null;
  Tl && 'documentMode' in document && (ni = document.documentMode);
  var _k = Tl && 'TextEvent' in window && !ni,
    Yd = Tl && (!ko || (ni && 8 < ni && 11 >= ni)),
    Xd = ' ',
    Vd = !1;
  function Qd(e, t) {
    switch (e) {
      case 'keyup':
        return mk.indexOf(t.keyCode) !== -1;
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
  function fk(e, t) {
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
  function pk(e, t) {
    if (nn)
      return e === 'compositionend' || (!ko && Qd(e, t))
        ? ((e = zd()), (ps = _o = Jl = null), (nn = !1), e)
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
  var hk = {
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
    return t === 'input' ? !!hk[e.type] : t === 'textarea';
  }
  function Jd(e, t, a, n) {
    (ln ? (an ? an.push(n) : (an = [n])) : (ln = n),
      (t = or(t, 'onChange')),
      0 < t.length &&
        ((a = new ks('onChange', 'change', null, a, n)), e.push({ event: a, listeners: t })));
  }
  var ii = null,
    si = null;
  function gk(e) {
    Bf(e, 0);
  }
  function ys(e) {
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
    if (e.propertyName === 'value' && ys(si)) {
      var t = [];
      (Jd(t, si, e, uo(e)), Rd(gk, t));
    }
  }
  function kk(e, t, a) {
    e === 'focusin'
      ? (em(), (ii = t), (si = a), ii.attachEvent('onpropertychange', tm))
      : e === 'focusout' && em();
  }
  function vk(e) {
    if (e === 'selectionchange' || e === 'keyup' || e === 'keydown') return ys(si);
  }
  function yk(e, t) {
    if (e === 'click') return ys(t);
  }
  function bk(e, t) {
    if (e === 'input' || e === 'change') return ys(t);
  }
  function xk(e, t) {
    return (e === t && (e !== 0 || 1 / e === 1 / t)) || (e !== e && t !== t);
  }
  var Bt = typeof Object.is == 'function' ? Object.is : xk;
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
    for (var t = _s(e.document); t instanceof e.HTMLIFrameElement; ) {
      try {
        var a = typeof t.contentWindow.location.href == 'string';
      } catch {
        a = !1;
      }
      if (a) e = t.contentWindow;
      else break;
      t = _s(e.document);
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
  var Sk = Tl && 'documentMode' in document && 11 >= document.documentMode,
    sn = null,
    xo = null,
    oi = null,
    So = !1;
  function sm(e, t, a) {
    var n = a.window === a ? a.document : a.nodeType === 9 ? a : a.ownerDocument;
    So ||
      sn == null ||
      sn !== _s(n) ||
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
        (n = or(xo, 'onSelect')),
        0 < n.length &&
          ((t = new ks('onSelect', 'select', null, t, a)),
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
  function Ea(e) {
    if (wo[e]) return wo[e];
    if (!rn[e]) return e;
    var t = rn[e],
      a;
    for (a in t) if (t.hasOwnProperty(a) && a in rm) return (wo[e] = t[a]);
    return e;
  }
  var om = Ea('animationend'),
    um = Ea('animationiteration'),
    cm = Ea('animationstart'),
    wk = Ea('transitionrun'),
    Tk = Ea('transitionstart'),
    Ek = Ea('transitioncancel'),
    dm = Ea('transitionend'),
    mm = new Map(),
    To =
      'abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel'.split(
        ' '
      );
  To.push('scrollEnd');
  function ll(e, t) {
    (mm.set(e, t), Sa(t, [e]));
  }
  var bs =
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
    Eo = 0;
  function xs() {
    for (var e = on, t = (Eo = on = 0); t < e; ) {
      var a = Yt[t];
      Yt[t++] = null;
      var n = Yt[t];
      Yt[t++] = null;
      var s = Yt[t];
      Yt[t++] = null;
      var u = Yt[t];
      if (((Yt[t++] = null), n !== null && s !== null)) {
        var _ = n.pending;
        (_ === null ? (s.next = s) : ((s.next = _.next), (_.next = s)), (n.pending = s));
      }
      u !== 0 && _m(a, s, u);
    }
  }
  function Ss(e, t, a, n) {
    ((Yt[on++] = e),
      (Yt[on++] = t),
      (Yt[on++] = a),
      (Yt[on++] = n),
      (Eo |= n),
      (e.lanes |= n),
      (e = e.alternate),
      e !== null && (e.lanes |= n));
  }
  function Co(e, t, a, n) {
    return (Ss(e, t, a, n), ws(e));
  }
  function Ca(e, t) {
    return (Ss(e, null, null, t), ws(e));
  }
  function _m(e, t, a) {
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
  function ws(e) {
    if (50 < Ai) throw ((Ai = 0), (Mu = null), Error(r(185)));
    for (var t = e.return; t !== null; ) ((e = t), (t = e.return));
    return e.tag === 3 ? e.stateNode : null;
  }
  var un = {};
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
  function jo(e) {
    return ((e = e.prototype), !(!e || !e.isReactComponent));
  }
  function El(e, t) {
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
  function Ts(e, t, a, n, s, u) {
    var _ = 0;
    if (((n = e), typeof e == 'function')) jo(e) && (_ = 1);
    else if (typeof e == 'string')
      _ = qv(e, a, F.current) ? 26 : e === 'html' || e === 'head' || e === 'body' ? 27 : 5;
    else
      e: switch (e) {
        case te:
          return ((e = Ot(31, a, t, s)), (e.elementType = te), (e.lanes = u), e);
        case w:
          return ja(a.children, s, u, t);
        case x:
          ((_ = 8), (s |= 24));
          break;
        case S:
          return ((e = Ot(12, a, t, s | 2)), (e.elementType = S), (e.lanes = u), e);
        case ee:
          return ((e = Ot(13, a, t, s)), (e.elementType = ee), (e.lanes = u), e);
        case Y:
          return ((e = Ot(19, a, t, s)), (e.elementType = Y), (e.lanes = u), e);
        default:
          if (typeof e == 'object' && e !== null)
            switch (e.$$typeof) {
              case G:
                _ = 10;
                break e;
              case j:
                _ = 9;
                break e;
              case M:
                _ = 11;
                break e;
              case C:
                _ = 14;
                break e;
              case K:
                ((_ = 16), (n = null));
                break e;
            }
          ((_ = 29), (a = Error(r(130, e === null ? 'null' : typeof e, ''))), (n = null));
      }
    return ((t = Ot(_, a, t, s)), (t.elementType = e), (t.type = n), (t.lanes = u), t);
  }
  function ja(e, t, a, n) {
    return ((e = Ot(7, e, n, t)), (e.lanes = a), e);
  }
  function No(e, t, a) {
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
      return a !== void 0 ? a : ((t = { value: e, source: t, stack: as(t) }), hm.set(e, t), t);
    }
    return { value: e, source: t, stack: as(t) };
  }
  var cn = [],
    dn = 0,
    Es = null,
    ui = 0,
    Vt = [],
    Qt = 0,
    Pl = null,
    fl = 1,
    pl = '';
  function Cl(e, t) {
    ((cn[dn++] = ui), (cn[dn++] = Es), (Es = e), (ui = t));
  }
  function gm(e, t, a) {
    ((Vt[Qt++] = fl), (Vt[Qt++] = pl), (Vt[Qt++] = Pl), (Pl = e));
    var n = fl;
    e = pl;
    var s = 32 - qt(n) - 1;
    ((n &= ~(1 << s)), (a += 1));
    var u = 32 - qt(t) + s;
    if (30 < u) {
      var _ = s - (s % 5);
      ((u = (n & ((1 << _) - 1)).toString(32)),
        (n >>= _),
        (s -= _),
        (fl = (1 << (32 - qt(t) + s)) | (a << s) | n),
        (pl = u + e));
    } else ((fl = (1 << u) | (a << s) | n), (pl = e));
  }
  function Lo(e) {
    e.return !== null && (Cl(e, 1), gm(e, 1, 0));
  }
  function qo(e) {
    for (; e === Es; ) ((Es = cn[--dn]), (cn[dn] = null), (ui = cn[--dn]), (cn[dn] = null));
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
  var pt = null,
    Ve = null,
    Ne = !1,
    Fl = null,
    Kt = !1,
    Bo = Error(r(519));
  function Wl(e) {
    var t = Error(
      r(418, 1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? 'text' : 'HTML', '')
    );
    throw (ci(Xt(t, e)), Bo);
  }
  function vm(e) {
    var t = e.stateNode,
      a = e.type,
      n = e.memoizedProps;
    switch (((t[ft] = e), (t[wt] = n), a)) {
      case 'dialog':
        (Ee('cancel', t), Ee('close', t));
        break;
      case 'iframe':
      case 'object':
      case 'embed':
        Ee('load', t);
        break;
      case 'video':
      case 'audio':
        for (a = 0; a < qi.length; a++) Ee(qi[a], t);
        break;
      case 'source':
        Ee('error', t);
        break;
      case 'img':
      case 'image':
      case 'link':
        (Ee('error', t), Ee('load', t));
        break;
      case 'details':
        Ee('toggle', t);
        break;
      case 'input':
        (Ee('invalid', t),
          qd(t, n.value, n.defaultValue, n.checked, n.defaultChecked, n.type, n.name, !0));
        break;
      case 'select':
        Ee('invalid', t);
        break;
      case 'textarea':
        (Ee('invalid', t), Od(t, n.value, n.defaultValue, n.children));
    }
    ((a = n.children),
      (typeof a != 'string' && typeof a != 'number' && typeof a != 'bigint') ||
      t.textContent === '' + a ||
      n.suppressHydrationWarning === !0 ||
      Df(t.textContent, a)
        ? (n.popover != null && (Ee('beforetoggle', t), Ee('toggle', t)),
          n.onScroll != null && Ee('scroll', t),
          n.onScrollEnd != null && Ee('scrollend', t),
          n.onClick != null && (t.onclick = wl),
          (t = !0))
        : (t = !1),
      t || Wl(e, !0));
  }
  function ym(e) {
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
  function mn(e) {
    if (e !== pt) return !1;
    if (!Ne) return (ym(e), (Ne = !0), !1);
    var t = e.tag,
      a;
    if (
      ((a = t !== 3 && t !== 27) &&
        ((a = t === 5) &&
          ((a = e.type), (a = !(a !== 'form' && a !== 'button') || Pu(e.type, e.memoizedProps))),
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
        ? ((t = Ve), _a(e.type) ? ((e = lc), (lc = null), (Ve = e)) : (Ve = t))
        : (Ve = pt ? Jt(e.stateNode.nextSibling) : null);
    return !0;
  }
  function Na() {
    ((Ve = pt = null), (Ne = !1));
  }
  function Oo() {
    var e = Fl;
    return (e !== null && (Nt === null ? (Nt = e) : Nt.push.apply(Nt, e), (Fl = null)), e);
  }
  function ci(e) {
    Fl === null ? (Fl = [e]) : Fl.push(e);
  }
  var Io = b(null),
    Aa = null,
    jl = null;
  function ea(e, t, a) {
    (P(Io, t._currentValue), (t._currentValue = a));
  }
  function Nl(e) {
    ((e._currentValue = Io.current), H(Io));
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
      var u = s.dependencies;
      if (u !== null) {
        var _ = s.child;
        u = u.firstContext;
        e: for (; u !== null; ) {
          var k = u;
          u = s;
          for (var T = 0; T < t.length; T++)
            if (k.context === t[T]) {
              ((u.lanes |= a),
                (k = u.alternate),
                k !== null && (k.lanes |= a),
                Mo(u.return, a, e),
                n || (_ = null));
              break e;
            }
          u = k.next;
        }
      } else if (s.tag === 18) {
        if (((_ = s.return), _ === null)) throw Error(r(341));
        ((_.lanes |= a), (u = _.alternate), u !== null && (u.lanes |= a), Mo(_, a, e), (_ = null));
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
    for (var s = t, u = !1; s !== null; ) {
      if (!u) {
        if ((s.flags & 524288) !== 0) u = !0;
        else if ((s.flags & 262144) !== 0) break;
      }
      if (s.tag === 10) {
        var _ = s.alternate;
        if (_ === null) throw Error(r(387));
        if (((_ = _.memoizedProps), _ !== null)) {
          var k = s.type;
          Bt(s.pendingProps.value, _.value) || (e !== null ? e.push(k) : (e = [k]));
        }
      } else if (s === ce.current) {
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
    ((Aa = e), (jl = null), (e = e.dependencies), e !== null && (e.firstContext = null));
  }
  function ht(e) {
    return bm(Aa, e);
  }
  function js(e, t) {
    return (Aa === null && La(e), bm(e, t));
  }
  function bm(e, t) {
    var a = t._currentValue;
    if (((t = { context: t, memoizedValue: a, next: null }), jl === null)) {
      if (e === null) throw Error(r(308));
      ((jl = t), (e.dependencies = { lanes: 0, firstContext: t }), (e.flags |= 524288));
    } else jl = jl.next = t;
    return a;
  }
  var jk =
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
    Nk = l.unstable_scheduleCallback,
    Ak = l.unstable_NormalPriority,
    it = {
      $$typeof: G,
      Consumer: null,
      Provider: null,
      _currentValue: null,
      _currentValue2: null,
      _threadCount: 0,
    };
  function Ro() {
    return { controller: new jk(), data: new Map(), refCount: 0 };
  }
  function di(e) {
    (e.refCount--,
      e.refCount === 0 &&
        Nk(Ak, function () {
          e.controller.abort();
        }));
  }
  var mi = null,
    zo = 0,
    fn = 0,
    pn = null;
  function Lk(e, t) {
    if (mi === null) {
      var a = (mi = []);
      ((zo = 0),
        (fn = Gu()),
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
  function qk(e, t) {
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
  var Sm = L.S;
  L.S = function (e, t) {
    ((rf = yt()),
      typeof t == 'object' && t !== null && typeof t.then == 'function' && Lk(e, t),
      Sm !== null && Sm(e, t));
  };
  var qa = b(null);
  function Ho() {
    var e = qa.current;
    return e !== null ? e : Ye.pooledCache;
  }
  function Ns(e, t) {
    t === null ? P(qa, qa.current) : P(qa, t.pool);
  }
  function wm() {
    var e = Ho();
    return e === null ? null : { parent: it._currentValue, pool: e };
  }
  var hn = Error(r(460)),
    Uo = Error(r(474)),
    As = Error(r(542)),
    Ls = { then: function () {} };
  function Tm(e) {
    return ((e = e.status), e === 'fulfilled' || e === 'rejected');
  }
  function Em(e, t, a) {
    switch (
      ((a = e[a]), a === void 0 ? e.push(t) : a !== t && (t.then(wl, wl), (t = a)), t.status)
    ) {
      case 'fulfilled':
        return t.value;
      case 'rejected':
        throw ((e = t.reason), jm(e), e);
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
            throw ((e = t.reason), jm(e), e);
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
  function Cm() {
    if (Oa === null) throw Error(r(459));
    var e = Oa;
    return ((Oa = null), e);
  }
  function jm(e) {
    if (e === hn || e === As) throw Error(r(483));
  }
  var gn = null,
    _i = 0;
  function qs(e) {
    var t = _i;
    return ((_i += 1), gn === null && (gn = []), Em(gn, e, t));
  }
  function fi(e, t) {
    ((t = t.props.ref), (e.ref = t !== void 0 ? t : null));
  }
  function Bs(e, t) {
    throw t.$$typeof === B
      ? Error(r(525))
      : ((e = Object.prototype.toString.call(t)),
        Error(
          r(
            31,
            e === '[object Object]' ? 'object with keys {' + Object.keys(t).join(', ') + '}' : e
          )
        ));
  }
  function Nm(e) {
    function t(O, N) {
      if (e) {
        var D = O.deletions;
        D === null ? ((O.deletions = [N]), (O.flags |= 16)) : D.push(N);
      }
    }
    function a(O, N) {
      if (!e) return null;
      for (; N !== null; ) (t(O, N), (N = N.sibling));
      return null;
    }
    function n(O) {
      for (var N = new Map(); O !== null; )
        (O.key !== null ? N.set(O.key, O) : N.set(O.index, O), (O = O.sibling));
      return N;
    }
    function s(O, N) {
      return ((O = El(O, N)), (O.index = 0), (O.sibling = null), O);
    }
    function u(O, N, D) {
      return (
        (O.index = D),
        e
          ? ((D = O.alternate),
            D !== null
              ? ((D = D.index), D < N ? ((O.flags |= 67108866), N) : D)
              : ((O.flags |= 67108866), N))
          : ((O.flags |= 1048576), N)
      );
    }
    function _(O) {
      return (e && O.alternate === null && (O.flags |= 67108866), O);
    }
    function k(O, N, D, X) {
      return N === null || N.tag !== 6
        ? ((N = No(D, O.mode, X)), (N.return = O), N)
        : ((N = s(N, D)), (N.return = O), N);
    }
    function T(O, N, D, X) {
      var me = D.type;
      return me === w
        ? $(O, N, D.props.children, X, D.key)
        : N !== null &&
            (N.elementType === me ||
              (typeof me == 'object' && me !== null && me.$$typeof === K && Ba(me) === N.type))
          ? ((N = s(N, D.props)), fi(N, D), (N.return = O), N)
          : ((N = Ts(D.type, D.key, D.props, null, O.mode, X)), fi(N, D), (N.return = O), N);
    }
    function R(O, N, D, X) {
      return N === null ||
        N.tag !== 4 ||
        N.stateNode.containerInfo !== D.containerInfo ||
        N.stateNode.implementation !== D.implementation
        ? ((N = Ao(D, O.mode, X)), (N.return = O), N)
        : ((N = s(N, D.children || [])), (N.return = O), N);
    }
    function $(O, N, D, X, me) {
      return N === null || N.tag !== 7
        ? ((N = ja(D, O.mode, X, me)), (N.return = O), N)
        : ((N = s(N, D)), (N.return = O), N);
    }
    function V(O, N, D) {
      if ((typeof N == 'string' && N !== '') || typeof N == 'number' || typeof N == 'bigint')
        return ((N = No('' + N, O.mode, D)), (N.return = O), N);
      if (typeof N == 'object' && N !== null) {
        switch (N.$$typeof) {
          case A:
            return ((D = Ts(N.type, N.key, N.props, null, O.mode, D)), fi(D, N), (D.return = O), D);
          case I:
            return ((N = Ao(N, O.mode, D)), (N.return = O), N);
          case K:
            return ((N = Ba(N)), V(O, N, D));
        }
        if (ke(N) || ue(N)) return ((N = ja(N, O.mode, D, null)), (N.return = O), N);
        if (typeof N.then == 'function') return V(O, qs(N), D);
        if (N.$$typeof === G) return V(O, js(O, N), D);
        Bs(O, N);
      }
      return null;
    }
    function z(O, N, D, X) {
      var me = N !== null ? N.key : null;
      if ((typeof D == 'string' && D !== '') || typeof D == 'number' || typeof D == 'bigint')
        return me !== null ? null : k(O, N, '' + D, X);
      if (typeof D == 'object' && D !== null) {
        switch (D.$$typeof) {
          case A:
            return D.key === me ? T(O, N, D, X) : null;
          case I:
            return D.key === me ? R(O, N, D, X) : null;
          case K:
            return ((D = Ba(D)), z(O, N, D, X));
        }
        if (ke(D) || ue(D)) return me !== null ? null : $(O, N, D, X, null);
        if (typeof D.then == 'function') return z(O, N, qs(D), X);
        if (D.$$typeof === G) return z(O, N, js(O, D), X);
        Bs(O, D);
      }
      return null;
    }
    function U(O, N, D, X, me) {
      if ((typeof X == 'string' && X !== '') || typeof X == 'number' || typeof X == 'bigint')
        return ((O = O.get(D) || null), k(N, O, '' + X, me));
      if (typeof X == 'object' && X !== null) {
        switch (X.$$typeof) {
          case A:
            return ((O = O.get(X.key === null ? D : X.key) || null), T(N, O, X, me));
          case I:
            return ((O = O.get(X.key === null ? D : X.key) || null), R(N, O, X, me));
          case K:
            return ((X = Ba(X)), U(O, N, D, X, me));
        }
        if (ke(X) || ue(X)) return ((O = O.get(D) || null), $(N, O, X, me, null));
        if (typeof X.then == 'function') return U(O, N, D, qs(X), me);
        if (X.$$typeof === G) return U(O, N, D, js(N, X), me);
        Bs(N, X);
      }
      return null;
    }
    function se(O, N, D, X) {
      for (
        var me = null, Le = null, oe = N, xe = (N = 0), je = null;
        oe !== null && xe < D.length;
        xe++
      ) {
        oe.index > xe ? ((je = oe), (oe = null)) : (je = oe.sibling);
        var qe = z(O, oe, D[xe], X);
        if (qe === null) {
          oe === null && (oe = je);
          break;
        }
        (e && oe && qe.alternate === null && t(O, oe),
          (N = u(qe, N, xe)),
          Le === null ? (me = qe) : (Le.sibling = qe),
          (Le = qe),
          (oe = je));
      }
      if (xe === D.length) return (a(O, oe), Ne && Cl(O, xe), me);
      if (oe === null) {
        for (; xe < D.length; xe++)
          ((oe = V(O, D[xe], X)),
            oe !== null &&
              ((N = u(oe, N, xe)), Le === null ? (me = oe) : (Le.sibling = oe), (Le = oe)));
        return (Ne && Cl(O, xe), me);
      }
      for (oe = n(oe); xe < D.length; xe++)
        ((je = U(oe, O, xe, D[xe], X)),
          je !== null &&
            (e && je.alternate !== null && oe.delete(je.key === null ? xe : je.key),
            (N = u(je, N, xe)),
            Le === null ? (me = je) : (Le.sibling = je),
            (Le = je)));
      return (
        e &&
          oe.forEach(function (ka) {
            return t(O, ka);
          }),
        Ne && Cl(O, xe),
        me
      );
    }
    function pe(O, N, D, X) {
      if (D == null) throw Error(r(151));
      for (
        var me = null, Le = null, oe = N, xe = (N = 0), je = null, qe = D.next();
        oe !== null && !qe.done;
        xe++, qe = D.next()
      ) {
        oe.index > xe ? ((je = oe), (oe = null)) : (je = oe.sibling);
        var ka = z(O, oe, qe.value, X);
        if (ka === null) {
          oe === null && (oe = je);
          break;
        }
        (e && oe && ka.alternate === null && t(O, oe),
          (N = u(ka, N, xe)),
          Le === null ? (me = ka) : (Le.sibling = ka),
          (Le = ka),
          (oe = je));
      }
      if (qe.done) return (a(O, oe), Ne && Cl(O, xe), me);
      if (oe === null) {
        for (; !qe.done; xe++, qe = D.next())
          ((qe = V(O, qe.value, X)),
            qe !== null &&
              ((N = u(qe, N, xe)), Le === null ? (me = qe) : (Le.sibling = qe), (Le = qe)));
        return (Ne && Cl(O, xe), me);
      }
      for (oe = n(oe); !qe.done; xe++, qe = D.next())
        ((qe = U(oe, O, xe, qe.value, X)),
          qe !== null &&
            (e && qe.alternate !== null && oe.delete(qe.key === null ? xe : qe.key),
            (N = u(qe, N, xe)),
            Le === null ? (me = qe) : (Le.sibling = qe),
            (Le = qe)));
      return (
        e &&
          oe.forEach(function ($v) {
            return t(O, $v);
          }),
        Ne && Cl(O, xe),
        me
      );
    }
    function Ue(O, N, D, X) {
      if (
        (typeof D == 'object' &&
          D !== null &&
          D.type === w &&
          D.key === null &&
          (D = D.props.children),
        typeof D == 'object' && D !== null)
      ) {
        switch (D.$$typeof) {
          case A:
            e: {
              for (var me = D.key; N !== null; ) {
                if (N.key === me) {
                  if (((me = D.type), me === w)) {
                    if (N.tag === 7) {
                      (a(O, N.sibling), (X = s(N, D.props.children)), (X.return = O), (O = X));
                      break e;
                    }
                  } else if (
                    N.elementType === me ||
                    (typeof me == 'object' && me !== null && me.$$typeof === K && Ba(me) === N.type)
                  ) {
                    (a(O, N.sibling), (X = s(N, D.props)), fi(X, D), (X.return = O), (O = X));
                    break e;
                  }
                  a(O, N);
                  break;
                } else t(O, N);
                N = N.sibling;
              }
              D.type === w
                ? ((X = ja(D.props.children, O.mode, X, D.key)), (X.return = O), (O = X))
                : ((X = Ts(D.type, D.key, D.props, null, O.mode, X)),
                  fi(X, D),
                  (X.return = O),
                  (O = X));
            }
            return _(O);
          case I:
            e: {
              for (me = D.key; N !== null; ) {
                if (N.key === me)
                  if (
                    N.tag === 4 &&
                    N.stateNode.containerInfo === D.containerInfo &&
                    N.stateNode.implementation === D.implementation
                  ) {
                    (a(O, N.sibling), (X = s(N, D.children || [])), (X.return = O), (O = X));
                    break e;
                  } else {
                    a(O, N);
                    break;
                  }
                else t(O, N);
                N = N.sibling;
              }
              ((X = Ao(D, O.mode, X)), (X.return = O), (O = X));
            }
            return _(O);
          case K:
            return ((D = Ba(D)), Ue(O, N, D, X));
        }
        if (ke(D)) return se(O, N, D, X);
        if (ue(D)) {
          if (((me = ue(D)), typeof me != 'function')) throw Error(r(150));
          return ((D = me.call(D)), pe(O, N, D, X));
        }
        if (typeof D.then == 'function') return Ue(O, N, qs(D), X);
        if (D.$$typeof === G) return Ue(O, N, js(O, D), X);
        Bs(O, D);
      }
      return (typeof D == 'string' && D !== '') || typeof D == 'number' || typeof D == 'bigint'
        ? ((D = '' + D),
          N !== null && N.tag === 6
            ? (a(O, N.sibling), (X = s(N, D)), (X.return = O), (O = X))
            : (a(O, N), (X = No(D, O.mode, X)), (X.return = O), (O = X)),
          _(O))
        : a(O, N);
    }
    return function (O, N, D, X) {
      try {
        _i = 0;
        var me = Ue(O, N, D, X);
        return ((gn = null), me);
      } catch (oe) {
        if (oe === hn || oe === As) throw oe;
        var Le = Ot(29, oe, null, O.mode);
        return ((Le.lanes = X), (Le.return = O), Le);
      } finally {
      }
    };
  }
  var Ia = Nm(!0),
    Am = Nm(!1),
    ta = !1;
  function Go(e) {
    e.updateQueue = {
      baseState: e.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null,
    };
  }
  function $o(e, t) {
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
    if (((n = n.shared), (Be & 2) !== 0)) {
      var s = n.pending;
      return (
        s === null ? (t.next = t) : ((t.next = s.next), (s.next = t)),
        (n.pending = t),
        (t = ws(e)),
        _m(e, null, a),
        t
      );
    }
    return (Ss(e, n, t, a), ws(e));
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
        u = null;
      if (((a = a.firstBaseUpdate), a !== null)) {
        do {
          var _ = { lane: a.lane, tag: a.tag, payload: a.payload, callback: null, next: null };
          (u === null ? (s = u = _) : (u = u.next = _), (a = a.next));
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
    var u = s.firstBaseUpdate,
      _ = s.lastBaseUpdate,
      k = s.shared.pending;
    if (k !== null) {
      s.shared.pending = null;
      var T = k,
        R = T.next;
      ((T.next = null), _ === null ? (u = R) : (_.next = R), (_ = T));
      var $ = e.alternate;
      $ !== null &&
        (($ = $.updateQueue),
        (k = $.lastBaseUpdate),
        k !== _ && (k === null ? ($.firstBaseUpdate = R) : (k.next = R), ($.lastBaseUpdate = T)));
    }
    if (u !== null) {
      var V = s.baseState;
      ((_ = 0), ($ = R = T = null), (k = u));
      do {
        var z = k.lane & -536870913,
          U = z !== k.lane;
        if (U ? (Ce & z) === z : (n & z) === z) {
          (z !== 0 && z === fn && (Xo = !0),
            $ !== null &&
              ($ = $.next =
                { lane: 0, tag: k.tag, payload: k.payload, callback: null, next: null }));
          e: {
            var se = e,
              pe = k;
            z = t;
            var Ue = a;
            switch (pe.tag) {
              case 1:
                if (((se = pe.payload), typeof se == 'function')) {
                  V = se.call(Ue, V, z);
                  break e;
                }
                V = se;
                break e;
              case 3:
                se.flags = (se.flags & -65537) | 128;
              case 0:
                if (
                  ((se = pe.payload),
                  (z = typeof se == 'function' ? se.call(Ue, V, z) : se),
                  z == null)
                )
                  break e;
                V = v({}, V, z);
                break e;
              case 2:
                ta = !0;
            }
          }
          ((z = k.callback),
            z !== null &&
              ((e.flags |= 64),
              U && (e.flags |= 8192),
              (U = s.callbacks),
              U === null ? (s.callbacks = [z]) : U.push(z)));
        } else
          ((U = { lane: z, tag: k.tag, payload: k.payload, callback: k.callback, next: null }),
            $ === null ? ((R = $ = U), (T = V)) : ($ = $.next = U),
            (_ |= z));
        if (((k = k.next), k === null)) {
          if (((k = s.shared.pending), k === null)) break;
          ((U = k),
            (k = U.next),
            (U.next = null),
            (s.lastBaseUpdate = U),
            (s.shared.pending = null));
        }
      } while (!0);
      ($ === null && (T = V),
        (s.baseState = T),
        (s.firstBaseUpdate = R),
        (s.lastBaseUpdate = $),
        u === null && (s.shared.lanes = 0),
        (oa |= _),
        (e.lanes = _),
        (e.memoizedState = V));
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
    Os = b(0);
  function Bm(e, t) {
    ((e = Rl), P(Os, e), P(kn, t), (Rl = e | t.baseLanes));
  }
  function Vo() {
    (P(Os, Rl), P(kn, kn.current));
  }
  function Qo() {
    ((Rl = Os.current), H(kn), H(Os));
  }
  var It = b(null),
    Zt = null;
  function na(e) {
    var t = e.alternate;
    (P(at, at.current & 1),
      P(It, e),
      Zt === null && (t === null || kn.current !== null || t.memoizedState !== null) && (Zt = e));
  }
  function Ko(e) {
    (P(at, at.current), P(It, e), Zt === null && (Zt = e));
  }
  function Om(e) {
    e.tag === 22 ? (P(at, at.current), P(It, e), Zt === null && (Zt = e)) : ia();
  }
  function ia() {
    (P(at, at.current), P(It, It.current));
  }
  function Mt(e) {
    (H(It), Zt === e && (Zt = null), H(at));
  }
  var at = b(0);
  function Is(e) {
    for (var t = e; t !== null; ) {
      if (t.tag === 13) {
        var a = t.memoizedState;
        if (a !== null && ((a = a.dehydrated), a === null || ec(a) || tc(a))) return t;
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
    be = null,
    ze = null,
    st = null,
    Ms = !1,
    vn = !1,
    Ma = !1,
    Ds = 0,
    ki = 0,
    yn = null,
    Bk = 0;
  function We() {
    throw Error(r(321));
  }
  function Zo(e, t) {
    if (t === null) return !1;
    for (var a = 0; a < t.length && a < e.length; a++) if (!Bt(e[a], t[a])) return !1;
    return !0;
  }
  function Jo(e, t, a, n, s, u) {
    return (
      (Al = u),
      (be = t),
      (t.memoizedState = null),
      (t.updateQueue = null),
      (t.lanes = 0),
      (L.H = e === null || e.memoizedState === null ? g_ : du),
      (Ma = !1),
      (u = a(n, s)),
      (Ma = !1),
      vn && (u = Mm(t, a, n, s)),
      Im(e),
      u
    );
  }
  function Im(e) {
    L.H = bi;
    var t = ze !== null && ze.next !== null;
    if (((Al = 0), (st = ze = be = null), (Ms = !1), (ki = 0), (yn = null), t)) throw Error(r(300));
    e === null || rt || ((e = e.dependencies), e !== null && Cs(e) && (rt = !0));
  }
  function Mm(e, t, a, n) {
    be = e;
    var s = 0;
    do {
      if ((vn && (yn = null), (ki = 0), (vn = !1), 25 <= s)) throw Error(r(301));
      if (((s += 1), (st = ze = null), e.updateQueue != null)) {
        var u = e.updateQueue;
        ((u.lastEffect = null),
          (u.events = null),
          (u.stores = null),
          u.memoCache != null && (u.memoCache.index = 0));
      }
      ((L.H = k_), (u = t(a, n)));
    } while (vn);
    return u;
  }
  function Ok() {
    var e = L.H,
      t = e.useState()[0];
    return (
      (t = typeof t.then == 'function' ? vi(t) : t),
      (e = e.useState()[0]),
      (ze !== null ? ze.memoizedState : null) !== e && (be.flags |= 1024),
      t
    );
  }
  function Po() {
    var e = Ds !== 0;
    return ((Ds = 0), e);
  }
  function Fo(e, t, a) {
    ((t.updateQueue = e.updateQueue), (t.flags &= -2053), (e.lanes &= ~a));
  }
  function Wo(e) {
    if (Ms) {
      for (e = e.memoizedState; e !== null; ) {
        var t = e.queue;
        (t !== null && (t.pending = null), (e = e.next));
      }
      Ms = !1;
    }
    ((Al = 0), (st = ze = be = null), (vn = !1), (ki = Ds = 0), (yn = null));
  }
  function xt() {
    var e = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
    return (st === null ? (be.memoizedState = st = e) : (st = st.next = e), st);
  }
  function nt() {
    if (ze === null) {
      var e = be.alternate;
      e = e !== null ? e.memoizedState : null;
    } else e = ze.next;
    var t = st === null ? be.memoizedState : st.next;
    if (t !== null) ((st = t), (ze = e));
    else {
      if (e === null) throw be.alternate === null ? Error(r(467)) : Error(r(310));
      ((ze = e),
        (e = {
          memoizedState: ze.memoizedState,
          baseState: ze.baseState,
          baseQueue: ze.baseQueue,
          queue: ze.queue,
          next: null,
        }),
        st === null ? (be.memoizedState = st = e) : (st = st.next = e));
    }
    return st;
  }
  function Rs() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function vi(e) {
    var t = ki;
    return (
      (ki += 1),
      yn === null && (yn = []),
      (e = Em(yn, e, t)),
      (t = be),
      (st === null ? t.memoizedState : st.next) === null &&
        ((t = t.alternate), (L.H = t === null || t.memoizedState === null ? g_ : du)),
      e
    );
  }
  function zs(e) {
    if (e !== null && typeof e == 'object') {
      if (typeof e.then == 'function') return vi(e);
      if (e.$$typeof === G) return ht(e);
    }
    throw Error(r(438, String(e)));
  }
  function eu(e) {
    var t = null,
      a = be.updateQueue;
    if ((a !== null && (t = a.memoCache), t == null)) {
      var n = be.alternate;
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
      a === null && ((a = Rs()), (be.updateQueue = a)),
      (a.memoCache = t),
      (a = t.data[t.index]),
      a === void 0)
    )
      for (a = t.data[t.index] = Array(e), n = 0; n < e; n++) a[n] = de;
    return (t.index++, a);
  }
  function Ll(e, t) {
    return typeof t == 'function' ? t(e) : t;
  }
  function Hs(e) {
    var t = nt();
    return tu(t, ze, e);
  }
  function tu(e, t, a) {
    var n = e.queue;
    if (n === null) throw Error(r(311));
    n.lastRenderedReducer = a;
    var s = e.baseQueue,
      u = n.pending;
    if (u !== null) {
      if (s !== null) {
        var _ = s.next;
        ((s.next = u.next), (u.next = _));
      }
      ((t.baseQueue = s = u), (n.pending = null));
    }
    if (((u = e.baseState), s === null)) e.memoizedState = u;
    else {
      t = s.next;
      var k = (_ = null),
        T = null,
        R = t,
        $ = !1;
      do {
        var V = R.lane & -536870913;
        if (V !== R.lane ? (Ce & V) === V : (Al & V) === V) {
          var z = R.revertLane;
          if (z === 0)
            (T !== null &&
              (T = T.next =
                {
                  lane: 0,
                  revertLane: 0,
                  gesture: null,
                  action: R.action,
                  hasEagerState: R.hasEagerState,
                  eagerState: R.eagerState,
                  next: null,
                }),
              V === fn && ($ = !0));
          else if ((Al & z) === z) {
            ((R = R.next), z === fn && ($ = !0));
            continue;
          } else
            ((V = {
              lane: 0,
              revertLane: R.revertLane,
              gesture: null,
              action: R.action,
              hasEagerState: R.hasEagerState,
              eagerState: R.eagerState,
              next: null,
            }),
              T === null ? ((k = T = V), (_ = u)) : (T = T.next = V),
              (be.lanes |= z),
              (oa |= z));
          ((V = R.action), Ma && a(u, V), (u = R.hasEagerState ? R.eagerState : a(u, V)));
        } else
          ((z = {
            lane: V,
            revertLane: R.revertLane,
            gesture: R.gesture,
            action: R.action,
            hasEagerState: R.hasEagerState,
            eagerState: R.eagerState,
            next: null,
          }),
            T === null ? ((k = T = z), (_ = u)) : (T = T.next = z),
            (be.lanes |= V),
            (oa |= V));
        R = R.next;
      } while (R !== null && R !== t);
      if (
        (T === null ? (_ = u) : (T.next = k),
        !Bt(u, e.memoizedState) && ((rt = !0), $ && ((a = pn), a !== null)))
      )
        throw a;
      ((e.memoizedState = u), (e.baseState = _), (e.baseQueue = T), (n.lastRenderedState = u));
    }
    return (s === null && (n.lanes = 0), [e.memoizedState, n.dispatch]);
  }
  function lu(e) {
    var t = nt(),
      a = t.queue;
    if (a === null) throw Error(r(311));
    a.lastRenderedReducer = e;
    var n = a.dispatch,
      s = a.pending,
      u = t.memoizedState;
    if (s !== null) {
      a.pending = null;
      var _ = (s = s.next);
      do ((u = e(u, _.action)), (_ = _.next));
      while (_ !== s);
      (Bt(u, t.memoizedState) || (rt = !0),
        (t.memoizedState = u),
        t.baseQueue === null && (t.baseState = u),
        (a.lastRenderedState = u));
    }
    return [u, n];
  }
  function Dm(e, t, a) {
    var n = be,
      s = nt(),
      u = Ne;
    if (u) {
      if (a === void 0) throw Error(r(407));
      a = a();
    } else a = t();
    var _ = !Bt((ze || s).memoizedState, a);
    if (
      (_ && ((s.memoizedState = a), (rt = !0)),
      (s = s.queue),
      iu(Hm.bind(null, n, s, e), [e]),
      s.getSnapshot !== t || _ || (st !== null && st.memoizedState.tag & 1))
    ) {
      if (
        ((n.flags |= 2048),
        bn(9, { destroy: void 0 }, zm.bind(null, n, s, a, t), null),
        Ye === null)
      )
        throw Error(r(349));
      u || (Al & 127) !== 0 || Rm(n, t, a);
    }
    return a;
  }
  function Rm(e, t, a) {
    ((e.flags |= 16384),
      (e = { getSnapshot: t, value: a }),
      (t = be.updateQueue),
      t === null
        ? ((t = Rs()), (be.updateQueue = t), (t.stores = [e]))
        : ((a = t.stores), a === null ? (t.stores = [e]) : a.push(e)));
  }
  function zm(e, t, a, n) {
    ((t.value = a), (t.getSnapshot = n), Um(t) && Gm(e));
  }
  function Hm(e, t, a) {
    return a(function () {
      Um(t) && Gm(e);
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
  function Gm(e) {
    var t = Ca(e, 2);
    t !== null && At(t, e, 2);
  }
  function au(e) {
    var t = xt();
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
  function $m(e, t, a, n) {
    return ((e.baseState = a), tu(e, ze, typeof n == 'function' ? n : Ll));
  }
  function Ik(e, t, a, n, s) {
    if ($s(e)) throw Error(r(485));
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
        then: function (_) {
          u.listeners.push(_);
        },
      };
      (L.T !== null ? a(!0) : (u.isTransition = !1),
        n(u),
        (a = t.pending),
        a === null
          ? ((u.next = t.pending = u), Ym(t, u))
          : ((u.next = a.next), (t.pending = a.next = u)));
    }
  }
  function Ym(e, t) {
    var a = t.action,
      n = t.payload,
      s = e.state;
    if (t.isTransition) {
      var u = L.T,
        _ = {};
      L.T = _;
      try {
        var k = a(s, n),
          T = L.S;
        (T !== null && T(_, k), Xm(e, t, k));
      } catch (R) {
        nu(e, t, R);
      } finally {
        (u !== null && _.types !== null && (u.types = _.types), (L.T = u));
      }
    } else
      try {
        ((u = a(s, n)), Xm(e, t, u));
      } catch (R) {
        nu(e, t, R);
      }
  }
  function Xm(e, t, a) {
    a !== null && typeof a == 'object' && typeof a.then == 'function'
      ? a.then(
          function (n) {
            Vm(e, t, n);
          },
          function (n) {
            return nu(e, t, n);
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
  function nu(e, t, a) {
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
    if (Ne) {
      var a = Ye.formState;
      if (a !== null) {
        e: {
          var n = be;
          if (Ne) {
            if (Ve) {
              t: {
                for (var s = Ve, u = Kt; s.nodeType !== 8; ) {
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
      (a = xt()),
      (a.memoizedState = a.baseState = t),
      (n = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Km,
        lastRenderedState: t,
      }),
      (a.queue = n),
      (a = f_.bind(null, be, n)),
      (n.dispatch = a),
      (n = au(!1)),
      (u = cu.bind(null, be, !1, n.queue)),
      (n = xt()),
      (s = { state: t, dispatch: null, action: e, pending: null }),
      (n.queue = s),
      (a = Ik.bind(null, be, s, u, a)),
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
      ((t = tu(e, t, Km)[0]),
      (e = Hs(Ll)[0]),
      typeof t == 'object' && t !== null && typeof t.then == 'function')
    )
      try {
        var n = vi(t);
      } catch (_) {
        throw _ === hn ? As : _;
      }
    else n = t;
    t = nt();
    var s = t.queue,
      u = s.dispatch;
    return (
      a !== t.memoizedState &&
        ((be.flags |= 2048), bn(9, { destroy: void 0 }, Mk.bind(null, s, a), null)),
      [n, u, e]
    );
  }
  function Mk(e, t) {
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
      (t = be.updateQueue),
      t === null && ((t = Rs()), (be.updateQueue = t)),
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
  function Us(e, t, a, n) {
    var s = xt();
    ((be.flags |= e),
      (s.memoizedState = bn(1 | t, { destroy: void 0 }, a, n === void 0 ? null : n)));
  }
  function Gs(e, t, a, n) {
    var s = nt();
    n = n === void 0 ? null : n;
    var u = s.memoizedState.inst;
    ze !== null && n !== null && Zo(n, ze.memoizedState.deps)
      ? (s.memoizedState = bn(t, u, a, n))
      : ((be.flags |= e), (s.memoizedState = bn(1 | t, u, a, n)));
  }
  function e_(e, t) {
    Us(8390656, 8, e, t);
  }
  function iu(e, t) {
    Gs(2048, 8, e, t);
  }
  function Dk(e) {
    be.flags |= 4;
    var t = be.updateQueue;
    if (t === null) ((t = Rs()), (be.updateQueue = t), (t.events = [e]));
    else {
      var a = t.events;
      a === null ? (t.events = [e]) : a.push(e);
    }
  }
  function t_(e) {
    var t = nt().memoizedState;
    return (
      Dk({ ref: t, nextImpl: e }),
      function () {
        if ((Be & 2) !== 0) throw Error(r(440));
        return t.impl.apply(void 0, arguments);
      }
    );
  }
  function l_(e, t) {
    return Gs(4, 2, e, t);
  }
  function a_(e, t) {
    return Gs(4, 4, e, t);
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
    ((a = a != null ? a.concat([e]) : null), Gs(4, 4, n_.bind(null, t, e), a));
  }
  function su() {}
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
  function ru(e, t, a) {
    return a === void 0 || ((Al & 1073741824) !== 0 && (Ce & 261930) === 0)
      ? (e.memoizedState = t)
      : ((e.memoizedState = a), (e = uf()), (be.lanes |= e), (oa |= e), a);
  }
  function o_(e, t, a, n) {
    return Bt(a, t)
      ? a
      : kn.current !== null
        ? ((e = ru(e, a, n)), Bt(e, t) || (rt = !0), e)
        : (Al & 42) === 0 || ((Al & 1073741824) !== 0 && (Ce & 261930) === 0)
          ? ((rt = !0), (e.memoizedState = a))
          : ((e = uf()), (be.lanes |= e), (oa |= e), t);
  }
  function u_(e, t, a, n, s) {
    var u = J.p;
    J.p = u !== 0 && 8 > u ? u : 8;
    var _ = L.T,
      k = {};
    ((L.T = k), cu(e, !1, t, a));
    try {
      var T = s(),
        R = L.S;
      if (
        (R !== null && R(k, T), T !== null && typeof T == 'object' && typeof T.then == 'function')
      ) {
        var $ = qk(T, n);
        yi(e, t, $, zt(e));
      } else yi(e, t, n, zt(e));
    } catch (V) {
      yi(e, t, { then: function () {}, status: 'rejected', reason: V }, zt());
    } finally {
      ((J.p = u), _ !== null && k.types !== null && (_.types = k.types), (L.T = _));
    }
  }
  function Rk() {}
  function ou(e, t, a, n) {
    if (e.tag !== 5) throw Error(r(476));
    var s = c_(e).queue;
    u_(
      e,
      s,
      t,
      ae,
      a === null
        ? Rk
        : function () {
            return (d_(e), a(n));
          }
    );
  }
  function c_(e) {
    var t = e.memoizedState;
    if (t !== null) return t;
    t = {
      memoizedState: ae,
      baseState: ae,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Ll,
        lastRenderedState: ae,
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
    var t = c_(e);
    (t.next === null && (t = e.alternate.memoizedState), yi(e, t.next.queue, {}, zt()));
  }
  function uu() {
    return ht(Di);
  }
  function m_() {
    return nt().memoizedState;
  }
  function __() {
    return nt().memoizedState;
  }
  function zk(e) {
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
  function Hk(e, t, a) {
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
      $s(e) ? p_(t, a) : ((a = Co(e, t, a, n)), a !== null && (At(a, e, n), h_(a, t, n))));
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
    if ($s(e)) p_(t, s);
    else {
      var u = e.alternate;
      if (
        e.lanes === 0 &&
        (u === null || u.lanes === 0) &&
        ((u = t.lastRenderedReducer), u !== null)
      )
        try {
          var _ = t.lastRenderedState,
            k = u(_, a);
          if (((s.hasEagerState = !0), (s.eagerState = k), Bt(k, _)))
            return (Ss(e, t, s, 0), Ye === null && xs(), !1);
        } catch {
        } finally {
        }
      if (((a = Co(e, t, s, n)), a !== null)) return (At(a, e, n), h_(a, t, n), !0);
    }
    return !1;
  }
  function cu(e, t, a, n) {
    if (
      ((n = {
        lane: 2,
        revertLane: Gu(),
        gesture: null,
        action: n,
        hasEagerState: !1,
        eagerState: null,
        next: null,
      }),
      $s(e))
    ) {
      if (t) throw Error(r(479));
    } else ((t = Co(e, a, n, 2)), t !== null && At(t, e, 2));
  }
  function $s(e) {
    var t = e.alternate;
    return e === be || (t !== null && t === be);
  }
  function p_(e, t) {
    vn = Ms = !0;
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
    readContext: ht,
    use: zs,
    useCallback: We,
    useContext: We,
    useEffect: We,
    useImperativeHandle: We,
    useLayoutEffect: We,
    useInsertionEffect: We,
    useMemo: We,
    useReducer: We,
    useRef: We,
    useState: We,
    useDebugValue: We,
    useDeferredValue: We,
    useTransition: We,
    useSyncExternalStore: We,
    useId: We,
    useHostTransitionStatus: We,
    useFormState: We,
    useActionState: We,
    useOptimistic: We,
    useMemoCache: We,
    useCacheRefresh: We,
  };
  bi.useEffectEvent = We;
  var g_ = {
      readContext: ht,
      use: zs,
      useCallback: function (e, t) {
        return ((xt().memoizedState = [e, t === void 0 ? null : t]), e);
      },
      useContext: ht,
      useEffect: e_,
      useImperativeHandle: function (e, t, a) {
        ((a = a != null ? a.concat([e]) : null), Us(4194308, 4, n_.bind(null, t, e), a));
      },
      useLayoutEffect: function (e, t) {
        return Us(4194308, 4, e, t);
      },
      useInsertionEffect: function (e, t) {
        Us(4, 2, e, t);
      },
      useMemo: function (e, t) {
        var a = xt();
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
        var n = xt();
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
          (e = e.dispatch = Hk.bind(null, be, e)),
          [n.memoizedState, e]
        );
      },
      useRef: function (e) {
        var t = xt();
        return ((e = { current: e }), (t.memoizedState = e));
      },
      useState: function (e) {
        e = au(e);
        var t = e.queue,
          a = f_.bind(null, be, t);
        return ((t.dispatch = a), [e.memoizedState, a]);
      },
      useDebugValue: su,
      useDeferredValue: function (e, t) {
        var a = xt();
        return ru(a, e, t);
      },
      useTransition: function () {
        var e = au(!1);
        return ((e = u_.bind(null, be, e.queue, !0, !1)), (xt().memoizedState = e), [!1, e]);
      },
      useSyncExternalStore: function (e, t, a) {
        var n = be,
          s = xt();
        if (Ne) {
          if (a === void 0) throw Error(r(407));
          a = a();
        } else {
          if (((a = t()), Ye === null)) throw Error(r(349));
          (Ce & 127) !== 0 || Rm(n, t, a);
        }
        s.memoizedState = a;
        var u = { value: a, getSnapshot: t };
        return (
          (s.queue = u),
          e_(Hm.bind(null, n, u, e), [e]),
          (n.flags |= 2048),
          bn(9, { destroy: void 0 }, zm.bind(null, n, u, a, t), null),
          a
        );
      },
      useId: function () {
        var e = xt(),
          t = Ye.identifierPrefix;
        if (Ne) {
          var a = pl,
            n = fl;
          ((a = (n & ~(1 << (32 - qt(n) - 1))).toString(32) + a),
            (t = '_' + t + 'R_' + a),
            (a = Ds++),
            0 < a && (t += 'H' + a.toString(32)),
            (t += '_'));
        } else ((a = Bk++), (t = '_' + t + 'r_' + a.toString(32) + '_'));
        return (e.memoizedState = t);
      },
      useHostTransitionStatus: uu,
      useFormState: Zm,
      useActionState: Zm,
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
        return ((t.queue = a), (t = cu.bind(null, be, !0, a)), (a.dispatch = t), [e, t]);
      },
      useMemoCache: eu,
      useCacheRefresh: function () {
        return (xt().memoizedState = zk.bind(null, be));
      },
      useEffectEvent: function (e) {
        var t = xt(),
          a = { impl: e };
        return (
          (t.memoizedState = a),
          function () {
            if ((Be & 2) !== 0) throw Error(r(440));
            return a.impl.apply(void 0, arguments);
          }
        );
      },
    },
    du = {
      readContext: ht,
      use: zs,
      useCallback: s_,
      useContext: ht,
      useEffect: iu,
      useImperativeHandle: i_,
      useInsertionEffect: l_,
      useLayoutEffect: a_,
      useMemo: r_,
      useReducer: Hs,
      useRef: Wm,
      useState: function () {
        return Hs(Ll);
      },
      useDebugValue: su,
      useDeferredValue: function (e, t) {
        var a = nt();
        return o_(a, ze.memoizedState, e, t);
      },
      useTransition: function () {
        var e = Hs(Ll)[0],
          t = nt().memoizedState;
        return [typeof e == 'boolean' ? e : vi(e), t];
      },
      useSyncExternalStore: Dm,
      useId: m_,
      useHostTransitionStatus: uu,
      useFormState: Jm,
      useActionState: Jm,
      useOptimistic: function (e, t) {
        var a = nt();
        return $m(a, ze, e, t);
      },
      useMemoCache: eu,
      useCacheRefresh: __,
    };
  du.useEffectEvent = t_;
  var k_ = {
    readContext: ht,
    use: zs,
    useCallback: s_,
    useContext: ht,
    useEffect: iu,
    useImperativeHandle: i_,
    useInsertionEffect: l_,
    useLayoutEffect: a_,
    useMemo: r_,
    useReducer: lu,
    useRef: Wm,
    useState: function () {
      return lu(Ll);
    },
    useDebugValue: su,
    useDeferredValue: function (e, t) {
      var a = nt();
      return ze === null ? ru(a, e, t) : o_(a, ze.memoizedState, e, t);
    },
    useTransition: function () {
      var e = lu(Ll)[0],
        t = nt().memoizedState;
      return [typeof e == 'boolean' ? e : vi(e), t];
    },
    useSyncExternalStore: Dm,
    useId: m_,
    useHostTransitionStatus: uu,
    useFormState: Fm,
    useActionState: Fm,
    useOptimistic: function (e, t) {
      var a = nt();
      return ze !== null ? $m(a, ze, e, t) : ((a.baseState = e), [e, a.queue.dispatch]);
    },
    useMemoCache: eu,
    useCacheRefresh: __,
  };
  k_.useEffectEvent = t_;
  function mu(e, t, a, n) {
    ((t = e.memoizedState),
      (a = a(n, t)),
      (a = a == null ? t : v({}, t, a)),
      (e.memoizedState = a),
      e.lanes === 0 && (e.updateQueue.baseState = a));
  }
  var _u = {
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
  function v_(e, t, a, n, s, u, _) {
    return (
      (e = e.stateNode),
      typeof e.shouldComponentUpdate == 'function'
        ? e.shouldComponentUpdate(n, u, _)
        : t.prototype && t.prototype.isPureReactComponent
          ? !ri(a, n) || !ri(s, u)
          : !0
    );
  }
  function y_(e, t, a, n) {
    ((e = t.state),
      typeof t.componentWillReceiveProps == 'function' && t.componentWillReceiveProps(a, n),
      typeof t.UNSAFE_componentWillReceiveProps == 'function' &&
        t.UNSAFE_componentWillReceiveProps(a, n),
      t.state !== e && _u.enqueueReplaceState(t, t.state, null));
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
    bs(e);
  }
  function x_(e) {
    console.error(e);
  }
  function S_(e) {
    bs(e);
  }
  function Ys(e, t) {
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
  function fu(e, t, a) {
    return (
      (a = la(a)),
      (a.tag = 3),
      (a.payload = { element: null }),
      (a.callback = function () {
        Ys(e, t);
      }),
      a
    );
  }
  function T_(e) {
    return ((e = la(e)), (e.tag = 3), e);
  }
  function E_(e, t, a, n) {
    var s = a.type.getDerivedStateFromError;
    if (typeof s == 'function') {
      var u = n.value;
      ((e.payload = function () {
        return s(u);
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
          typeof s != 'function' && (ua === null ? (ua = new Set([this])) : ua.add(this)));
        var k = n.stack;
        this.componentDidCatch(n.value, { componentStack: k !== null ? k : '' });
      });
  }
  function Uk(e, t, a, n, s) {
    if (((a.flags |= 32768), n !== null && typeof n == 'object' && typeof n.then == 'function')) {
      if (((t = a.alternate), t !== null && _n(t, a, s, !0), (a = It.current), a !== null)) {
        switch (a.tag) {
          case 31:
          case 13:
            return (
              Zt === null ? lr() : a.alternate === null && et === 0 && (et = 3),
              (a.flags &= -257),
              (a.flags |= 65536),
              (a.lanes = s),
              n === Ls
                ? (a.flags |= 16384)
                : ((t = a.updateQueue),
                  t === null ? (a.updateQueue = new Set([n])) : t.add(n),
                  zu(e, n, s)),
              !1
            );
          case 22:
            return (
              (a.flags |= 65536),
              n === Ls
                ? (a.flags |= 16384)
                : ((t = a.updateQueue),
                  t === null
                    ? ((t = { transitions: null, markerInstances: null, retryQueue: new Set([n]) }),
                      (a.updateQueue = t))
                    : ((a = t.retryQueue), a === null ? (t.retryQueue = new Set([n])) : a.add(n)),
                  zu(e, n, s)),
              !1
            );
        }
        throw Error(r(435, a.tag));
      }
      return (zu(e, n, s), lr(), !1);
    }
    if (Ne)
      return (
        (t = It.current),
        t !== null
          ? ((t.flags & 65536) === 0 && (t.flags |= 256),
            (t.flags |= 65536),
            (t.lanes = s),
            n !== Bo && ((e = Error(r(422), { cause: n })), ci(Xt(e, a))))
          : (n !== Bo && ((t = Error(r(423), { cause: n })), ci(Xt(t, a))),
            (e = e.current.alternate),
            (e.flags |= 65536),
            (s &= -s),
            (e.lanes |= s),
            (n = Xt(n, a)),
            (s = fu(e.stateNode, n, s)),
            Yo(e, s),
            et !== 4 && (et = 2)),
        !1
      );
    var u = Error(r(520), { cause: n });
    if (((u = Xt(u, a)), Ni === null ? (Ni = [u]) : Ni.push(u), et !== 4 && (et = 2), t === null))
      return !0;
    ((n = Xt(n, a)), (a = t));
    do {
      switch (a.tag) {
        case 3:
          return (
            (a.flags |= 65536),
            (e = s & -s),
            (a.lanes |= e),
            (e = fu(a.stateNode, n, e)),
            Yo(a, e),
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
                  (ua === null || !ua.has(u)))))
          )
            return (
              (a.flags |= 65536),
              (s &= -s),
              (a.lanes |= s),
              (s = T_(s)),
              E_(s, e, a, n),
              Yo(a, s),
              !1
            );
      }
      a = a.return;
    } while (a !== null);
    return !1;
  }
  var pu = Error(r(461)),
    rt = !1;
  function gt(e, t, a, n) {
    t.child = e === null ? Am(t, null, a, n) : Ia(t, e.child, a, n);
  }
  function C_(e, t, a, n, s) {
    a = a.render;
    var u = t.ref;
    if ('ref' in n) {
      var _ = {};
      for (var k in n) k !== 'ref' && (_[k] = n[k]);
    } else _ = n;
    return (
      La(t),
      (n = Jo(e, t, a, _, u, s)),
      (k = Po()),
      e !== null && !rt
        ? (Fo(e, t, s), ql(e, t, s))
        : (Ne && k && Lo(t), (t.flags |= 1), gt(e, t, n, s), t.child)
    );
  }
  function j_(e, t, a, n, s) {
    if (e === null) {
      var u = a.type;
      return typeof u == 'function' && !jo(u) && u.defaultProps === void 0 && a.compare === null
        ? ((t.tag = 15), (t.type = u), N_(e, t, u, n, s))
        : ((e = Ts(a.type, null, n, t, t.mode, s)), (e.ref = t.ref), (e.return = t), (t.child = e));
    }
    if (((u = e.child), !Su(e, s))) {
      var _ = u.memoizedProps;
      if (((a = a.compare), (a = a !== null ? a : ri), a(_, n) && e.ref === t.ref))
        return ql(e, t, s);
    }
    return ((t.flags |= 1), (e = El(u, n)), (e.ref = t.ref), (e.return = t), (t.child = e));
  }
  function N_(e, t, a, n, s) {
    if (e !== null) {
      var u = e.memoizedProps;
      if (ri(u, n) && e.ref === t.ref)
        if (((rt = !1), (t.pendingProps = n = u), Su(e, s))) (e.flags & 131072) !== 0 && (rt = !0);
        else return ((t.lanes = e.lanes), ql(e, t, s));
    }
    return hu(e, t, a, n, s);
  }
  function A_(e, t, a, n) {
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
        return L_(e, t, u, a, n);
      }
      if ((a & 536870912) !== 0)
        ((t.memoizedState = { baseLanes: 0, cachePool: null }),
          e !== null && Ns(t, u !== null ? u.cachePool : null),
          u !== null ? Bm(t, u) : Vo(),
          Om(t));
      else return ((n = t.lanes = 536870912), L_(e, t, u !== null ? u.baseLanes | a : a, a, n));
    } else
      u !== null
        ? (Ns(t, u.cachePool), Bm(t, u), ia(), (t.memoizedState = null))
        : (e !== null && Ns(t, null), Vo(), ia());
    return (gt(e, t, s, a), t.child);
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
    var u = Ho();
    return (
      (u = u === null ? null : { parent: it._currentValue, pool: u }),
      (t.memoizedState = { baseLanes: a, cachePool: u }),
      e !== null && Ns(t, null),
      Vo(),
      Om(t),
      e !== null && _n(e, t, n, !0),
      (t.childLanes = s),
      null
    );
  }
  function Xs(e, t) {
    return (
      (t = Qs({ mode: t.mode, children: t.children }, e.mode)),
      (t.ref = e.ref),
      (e.child = t),
      (t.return = e),
      t
    );
  }
  function q_(e, t, a) {
    return (
      Ia(t, e.child, null, a),
      (e = Xs(t, t.pendingProps)),
      (e.flags |= 2),
      Mt(t),
      (t.memoizedState = null),
      e
    );
  }
  function Gk(e, t, a) {
    var n = t.pendingProps,
      s = (t.flags & 128) !== 0;
    if (((t.flags &= -129), e === null)) {
      if (Ne) {
        if (n.mode === 'hidden') return ((e = Xs(t, n)), (t.lanes = 536870912), xi(null, e));
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
                (pt = t),
                (Ve = null)))
            : (e = null),
          e === null)
        )
          throw Wl(t);
        return ((t.lanes = 536870912), null);
      }
      return Xs(t, n);
    }
    var u = e.memoizedState;
    if (u !== null) {
      var _ = u.dehydrated;
      if ((Ko(t), s))
        if (t.flags & 256) ((t.flags &= -257), (t = q_(e, t, a)));
        else if (t.memoizedState !== null) ((t.child = e.child), (t.flags |= 128), (t = null));
        else throw Error(r(558));
      else if ((rt || _n(e, t, a, !1), (s = (a & e.childLanes) !== 0), rt || s)) {
        if (((n = Ye), n !== null && ((_ = xd(n, a)), _ !== 0 && _ !== u.retryLane)))
          throw ((u.retryLane = _), Ca(e, _), At(n, e, _), pu);
        (lr(), (t = q_(e, t, a)));
      } else
        ((e = u.treeContext),
          (Ve = Jt(_.nextSibling)),
          (pt = t),
          (Ne = !0),
          (Fl = null),
          (Kt = !1),
          e !== null && km(t, e),
          (t = Xs(t, n)),
          (t.flags |= 4096));
      return t;
    }
    return (
      (e = El(e.child, { mode: n.mode, children: n.children })),
      (e.ref = t.ref),
      (t.child = e),
      (e.return = t),
      e
    );
  }
  function Vs(e, t) {
    var a = t.ref;
    if (a === null) e !== null && e.ref !== null && (t.flags |= 4194816);
    else {
      if (typeof a != 'function' && typeof a != 'object') throw Error(r(284));
      (e === null || e.ref !== a) && (t.flags |= 4194816);
    }
  }
  function hu(e, t, a, n, s) {
    return (
      La(t),
      (a = Jo(e, t, a, n, void 0, s)),
      (n = Po()),
      e !== null && !rt
        ? (Fo(e, t, s), ql(e, t, s))
        : (Ne && n && Lo(t), (t.flags |= 1), gt(e, t, a, s), t.child)
    );
  }
  function B_(e, t, a, n, s, u) {
    return (
      La(t),
      (t.updateQueue = null),
      (a = Mm(t, n, a, s)),
      Im(e),
      (n = Po()),
      e !== null && !rt
        ? (Fo(e, t, u), ql(e, t, u))
        : (Ne && n && Lo(t), (t.flags |= 1), gt(e, t, a, u), t.child)
    );
  }
  function O_(e, t, a, n, s) {
    if ((La(t), t.stateNode === null)) {
      var u = un,
        _ = a.contextType;
      (typeof _ == 'object' && _ !== null && (u = ht(_)),
        (u = new a(n, u)),
        (t.memoizedState = u.state !== null && u.state !== void 0 ? u.state : null),
        (u.updater = _u),
        (t.stateNode = u),
        (u._reactInternals = t),
        (u = t.stateNode),
        (u.props = n),
        (u.state = t.memoizedState),
        (u.refs = {}),
        Go(t),
        (_ = a.contextType),
        (u.context = typeof _ == 'object' && _ !== null ? ht(_) : un),
        (u.state = t.memoizedState),
        (_ = a.getDerivedStateFromProps),
        typeof _ == 'function' && (mu(t, a, _, n), (u.state = t.memoizedState)),
        typeof a.getDerivedStateFromProps == 'function' ||
          typeof u.getSnapshotBeforeUpdate == 'function' ||
          (typeof u.UNSAFE_componentWillMount != 'function' &&
            typeof u.componentWillMount != 'function') ||
          ((_ = u.state),
          typeof u.componentWillMount == 'function' && u.componentWillMount(),
          typeof u.UNSAFE_componentWillMount == 'function' && u.UNSAFE_componentWillMount(),
          _ !== u.state && _u.enqueueReplaceState(u, u.state, null),
          gi(t, n, u, s),
          hi(),
          (u.state = t.memoizedState)),
        typeof u.componentDidMount == 'function' && (t.flags |= 4194308),
        (n = !0));
    } else if (e === null) {
      u = t.stateNode;
      var k = t.memoizedProps,
        T = Da(a, k);
      u.props = T;
      var R = u.context,
        $ = a.contextType;
      ((_ = un), typeof $ == 'object' && $ !== null && (_ = ht($)));
      var V = a.getDerivedStateFromProps;
      (($ = typeof V == 'function' || typeof u.getSnapshotBeforeUpdate == 'function'),
        (k = t.pendingProps !== k),
        $ ||
          (typeof u.UNSAFE_componentWillReceiveProps != 'function' &&
            typeof u.componentWillReceiveProps != 'function') ||
          ((k || R !== _) && y_(t, u, n, _)),
        (ta = !1));
      var z = t.memoizedState;
      ((u.state = z),
        gi(t, n, u, s),
        hi(),
        (R = t.memoizedState),
        k || z !== R || ta
          ? (typeof V == 'function' && (mu(t, a, V, n), (R = t.memoizedState)),
            (T = ta || v_(t, a, T, n, z, R, _))
              ? ($ ||
                  (typeof u.UNSAFE_componentWillMount != 'function' &&
                    typeof u.componentWillMount != 'function') ||
                  (typeof u.componentWillMount == 'function' && u.componentWillMount(),
                  typeof u.UNSAFE_componentWillMount == 'function' &&
                    u.UNSAFE_componentWillMount()),
                typeof u.componentDidMount == 'function' && (t.flags |= 4194308))
              : (typeof u.componentDidMount == 'function' && (t.flags |= 4194308),
                (t.memoizedProps = n),
                (t.memoizedState = R)),
            (u.props = n),
            (u.state = R),
            (u.context = _),
            (n = T))
          : (typeof u.componentDidMount == 'function' && (t.flags |= 4194308), (n = !1)));
    } else {
      ((u = t.stateNode),
        $o(e, t),
        (_ = t.memoizedProps),
        ($ = Da(a, _)),
        (u.props = $),
        (V = t.pendingProps),
        (z = u.context),
        (R = a.contextType),
        (T = un),
        typeof R == 'object' && R !== null && (T = ht(R)),
        (k = a.getDerivedStateFromProps),
        (R = typeof k == 'function' || typeof u.getSnapshotBeforeUpdate == 'function') ||
          (typeof u.UNSAFE_componentWillReceiveProps != 'function' &&
            typeof u.componentWillReceiveProps != 'function') ||
          ((_ !== V || z !== T) && y_(t, u, n, T)),
        (ta = !1),
        (z = t.memoizedState),
        (u.state = z),
        gi(t, n, u, s),
        hi());
      var U = t.memoizedState;
      _ !== V || z !== U || ta || (e !== null && e.dependencies !== null && Cs(e.dependencies))
        ? (typeof k == 'function' && (mu(t, a, k, n), (U = t.memoizedState)),
          ($ =
            ta ||
            v_(t, a, $, n, z, U, T) ||
            (e !== null && e.dependencies !== null && Cs(e.dependencies)))
            ? (R ||
                (typeof u.UNSAFE_componentWillUpdate != 'function' &&
                  typeof u.componentWillUpdate != 'function') ||
                (typeof u.componentWillUpdate == 'function' && u.componentWillUpdate(n, U, T),
                typeof u.UNSAFE_componentWillUpdate == 'function' &&
                  u.UNSAFE_componentWillUpdate(n, U, T)),
              typeof u.componentDidUpdate == 'function' && (t.flags |= 4),
              typeof u.getSnapshotBeforeUpdate == 'function' && (t.flags |= 1024))
            : (typeof u.componentDidUpdate != 'function' ||
                (_ === e.memoizedProps && z === e.memoizedState) ||
                (t.flags |= 4),
              typeof u.getSnapshotBeforeUpdate != 'function' ||
                (_ === e.memoizedProps && z === e.memoizedState) ||
                (t.flags |= 1024),
              (t.memoizedProps = n),
              (t.memoizedState = U)),
          (u.props = n),
          (u.state = U),
          (u.context = T),
          (n = $))
        : (typeof u.componentDidUpdate != 'function' ||
            (_ === e.memoizedProps && z === e.memoizedState) ||
            (t.flags |= 4),
          typeof u.getSnapshotBeforeUpdate != 'function' ||
            (_ === e.memoizedProps && z === e.memoizedState) ||
            (t.flags |= 1024),
          (n = !1));
    }
    return (
      (u = n),
      Vs(e, t),
      (n = (t.flags & 128) !== 0),
      u || n
        ? ((u = t.stateNode),
          (a = n && typeof a.getDerivedStateFromError != 'function' ? null : u.render()),
          (t.flags |= 1),
          e !== null && n
            ? ((t.child = Ia(t, e.child, null, s)), (t.child = Ia(t, null, a, s)))
            : gt(e, t, a, s),
          (t.memoizedState = u.state),
          (e = t.child))
        : (e = ql(e, t, s)),
      e
    );
  }
  function I_(e, t, a, n) {
    return (Na(), (t.flags |= 256), gt(e, t, a, n), t.child);
  }
  var gu = { dehydrated: null, treeContext: null, retryLane: 0, hydrationErrors: null };
  function ku(e) {
    return { baseLanes: e, cachePool: wm() };
  }
  function vu(e, t, a) {
    return ((e = e !== null ? e.childLanes & ~a : 0), t && (e |= Rt), e);
  }
  function M_(e, t, a) {
    var n = t.pendingProps,
      s = !1,
      u = (t.flags & 128) !== 0,
      _;
    if (
      ((_ = u) || (_ = e !== null && e.memoizedState === null ? !1 : (at.current & 2) !== 0),
      _ && ((s = !0), (t.flags &= -129)),
      (_ = (t.flags & 32) !== 0),
      (t.flags &= -33),
      e === null)
    ) {
      if (Ne) {
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
                (pt = t),
                (Ve = null)))
            : (e = null),
          e === null)
        )
          throw Wl(t);
        return (tc(e) ? (t.lanes = 32) : (t.lanes = 536870912), null);
      }
      var k = n.children;
      return (
        (n = n.fallback),
        s
          ? (ia(),
            (s = t.mode),
            (k = Qs({ mode: 'hidden', children: k }, s)),
            (n = ja(n, s, a, null)),
            (k.return = t),
            (n.return = t),
            (k.sibling = n),
            (t.child = k),
            (n = t.child),
            (n.memoizedState = ku(a)),
            (n.childLanes = vu(e, _, a)),
            (t.memoizedState = gu),
            xi(null, n))
          : (na(t), yu(t, k))
      );
    }
    var T = e.memoizedState;
    if (T !== null && ((k = T.dehydrated), k !== null)) {
      if (u)
        t.flags & 256
          ? (na(t), (t.flags &= -257), (t = bu(e, t, a)))
          : t.memoizedState !== null
            ? (ia(), (t.child = e.child), (t.flags |= 128), (t = null))
            : (ia(),
              (k = n.fallback),
              (s = t.mode),
              (n = Qs({ mode: 'visible', children: n.children }, s)),
              (k = ja(k, s, a, null)),
              (k.flags |= 2),
              (n.return = t),
              (k.return = t),
              (n.sibling = k),
              (t.child = n),
              Ia(t, e.child, null, a),
              (n = t.child),
              (n.memoizedState = ku(a)),
              (n.childLanes = vu(e, _, a)),
              (t.memoizedState = gu),
              (t = xi(null, n)));
      else if ((na(t), tc(k))) {
        if (((_ = k.nextSibling && k.nextSibling.dataset), _)) var R = _.dgst;
        ((_ = R),
          (n = Error(r(419))),
          (n.stack = ''),
          (n.digest = _),
          ci({ value: n, source: null, stack: null }),
          (t = bu(e, t, a)));
      } else if ((rt || _n(e, t, a, !1), (_ = (a & e.childLanes) !== 0), rt || _)) {
        if (((_ = Ye), _ !== null && ((n = xd(_, a)), n !== 0 && n !== T.retryLane)))
          throw ((T.retryLane = n), Ca(e, n), At(_, e, n), pu);
        (ec(k) || lr(), (t = bu(e, t, a)));
      } else
        ec(k)
          ? ((t.flags |= 192), (t.child = e.child), (t = null))
          : ((e = T.treeContext),
            (Ve = Jt(k.nextSibling)),
            (pt = t),
            (Ne = !0),
            (Fl = null),
            (Kt = !1),
            e !== null && km(t, e),
            (t = yu(t, n.children)),
            (t.flags |= 4096));
      return t;
    }
    return s
      ? (ia(),
        (k = n.fallback),
        (s = t.mode),
        (T = e.child),
        (R = T.sibling),
        (n = El(T, { mode: 'hidden', children: n.children })),
        (n.subtreeFlags = T.subtreeFlags & 65011712),
        R !== null ? (k = El(R, k)) : ((k = ja(k, s, a, null)), (k.flags |= 2)),
        (k.return = t),
        (n.return = t),
        (n.sibling = k),
        (t.child = n),
        xi(null, n),
        (n = t.child),
        (k = e.child.memoizedState),
        k === null
          ? (k = ku(a))
          : ((s = k.cachePool),
            s !== null
              ? ((T = it._currentValue), (s = s.parent !== T ? { parent: T, pool: T } : s))
              : (s = wm()),
            (k = { baseLanes: k.baseLanes | a, cachePool: s })),
        (n.memoizedState = k),
        (n.childLanes = vu(e, _, a)),
        (t.memoizedState = gu),
        xi(e.child, n))
      : (na(t),
        (a = e.child),
        (e = a.sibling),
        (a = El(a, { mode: 'visible', children: n.children })),
        (a.return = t),
        (a.sibling = null),
        e !== null &&
          ((_ = t.deletions), _ === null ? ((t.deletions = [e]), (t.flags |= 16)) : _.push(e)),
        (t.child = a),
        (t.memoizedState = null),
        a);
  }
  function yu(e, t) {
    return ((t = Qs({ mode: 'visible', children: t }, e.mode)), (t.return = e), (e.child = t));
  }
  function Qs(e, t) {
    return ((e = Ot(22, e, null, t)), (e.lanes = 0), e);
  }
  function bu(e, t, a) {
    return (
      Ia(t, e.child, null, a),
      (e = yu(t, t.pendingProps.children)),
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
  function xu(e, t, a, n, s, u) {
    var _ = e.memoizedState;
    _ === null
      ? (e.memoizedState = {
          isBackwards: t,
          rendering: null,
          renderingStartTime: 0,
          last: n,
          tail: a,
          tailMode: s,
          treeForkCount: u,
        })
      : ((_.isBackwards = t),
        (_.rendering = null),
        (_.renderingStartTime = 0),
        (_.last = n),
        (_.tail = a),
        (_.tailMode = s),
        (_.treeForkCount = u));
  }
  function R_(e, t, a) {
    var n = t.pendingProps,
      s = n.revealOrder,
      u = n.tail;
    n = n.children;
    var _ = at.current,
      k = (_ & 2) !== 0;
    if (
      (k ? ((_ = (_ & 1) | 2), (t.flags |= 128)) : (_ &= 1),
      P(at, _),
      gt(e, t, n, a),
      (n = Ne ? ui : 0),
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
          ((e = a.alternate), e !== null && Is(e) === null && (s = a), (a = a.sibling));
        ((a = s),
          a === null ? ((s = t.child), (t.child = null)) : ((s = a.sibling), (a.sibling = null)),
          xu(t, !1, s, a, u, n));
        break;
      case 'backwards':
      case 'unstable_legacy-backwards':
        for (a = null, s = t.child, t.child = null; s !== null; ) {
          if (((e = s.alternate), e !== null && Is(e) === null)) {
            t.child = s;
            break;
          }
          ((e = s.sibling), (s.sibling = a), (a = s), (s = e));
        }
        xu(t, !0, a, null, u, n);
        break;
      case 'together':
        xu(t, !1, null, null, void 0, n);
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
      for (e = t.child, a = El(e, e.pendingProps), t.child = a, a.return = t; e.sibling !== null; )
        ((e = e.sibling), (a = a.sibling = El(e, e.pendingProps)), (a.return = t));
      a.sibling = null;
    }
    return t.child;
  }
  function Su(e, t) {
    return (e.lanes & t) !== 0 ? !0 : ((e = e.dependencies), !!(e !== null && Cs(e)));
  }
  function $k(e, t, a) {
    switch (t.tag) {
      case 3:
        (Ae(t, t.stateNode.containerInfo), ea(t, it, e.memoizedState.cache), Na());
        break;
      case 27:
      case 5:
        tl(t);
        break;
      case 4:
        Ae(t, t.stateNode.containerInfo);
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
          P(at, at.current),
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
        if (!Su(e, a) && (t.flags & 128) === 0) return ((rt = !1), $k(e, t, a));
        rt = (e.flags & 131072) !== 0;
      }
    else ((rt = !1), Ne && (t.flags & 1048576) !== 0 && gm(t, ui, t.index));
    switch (((t.lanes = 0), t.tag)) {
      case 16:
        e: {
          var n = t.pendingProps;
          if (((e = Ba(t.elementType)), (t.type = e), typeof e == 'function'))
            jo(e)
              ? ((n = Da(e, n)), (t.tag = 1), (t = O_(null, t, e, n, a)))
              : ((t.tag = 0), (t = hu(null, t, e, n, a)));
          else {
            if (e != null) {
              var s = e.$$typeof;
              if (s === M) {
                ((t.tag = 11), (t = C_(null, t, e, n, a)));
                break e;
              } else if (s === C) {
                ((t.tag = 14), (t = j_(null, t, e, n, a)));
                break e;
              }
            }
            throw ((t = Se(e) || e), Error(r(306, t, '')));
          }
        }
        return t;
      case 0:
        return hu(e, t, t.type, t.pendingProps, a);
      case 1:
        return ((n = t.type), (s = Da(n, t.pendingProps)), O_(e, t, n, s, a));
      case 3:
        e: {
          if ((Ae(t, t.stateNode.containerInfo), e === null)) throw Error(r(387));
          n = t.pendingProps;
          var u = t.memoizedState;
          ((s = u.element), $o(e, t), gi(t, n, null, a));
          var _ = t.memoizedState;
          if (
            ((n = _.cache),
            ea(t, it, n),
            n !== u.cache && Do(t, [it], a, !0),
            hi(),
            (n = _.element),
            u.isDehydrated)
          )
            if (
              ((u = { element: n, isDehydrated: !1, cache: _.cache }),
              (t.updateQueue.baseState = u),
              (t.memoizedState = u),
              t.flags & 256)
            ) {
              t = I_(e, t, n, a);
              break e;
            } else if (n !== s) {
              ((s = Xt(Error(r(424)), t)), ci(s), (t = I_(e, t, n, a)));
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
                  pt = t,
                  Ne = !0,
                  Fl = null,
                  Kt = !0,
                  a = Am(t, null, n, a),
                  t.child = a;
                a;
              )
                ((a.flags = (a.flags & -3) | 4096), (a = a.sibling));
            }
          else {
            if ((Na(), n === s)) {
              t = ql(e, t, a);
              break e;
            }
            gt(e, t, n, a);
          }
          t = t.child;
        }
        return t;
      case 26:
        return (
          Vs(e, t),
          e === null
            ? (a = Pf(t.type, null, t.pendingProps, null))
              ? (t.memoizedState = a)
              : Ne ||
                ((a = t.type),
                (e = t.pendingProps),
                (n = ur(fe.current).createElement(a)),
                (n[ft] = t),
                (n[wt] = e),
                kt(n, a, e),
                ct(n),
                (t.stateNode = n))
            : (t.memoizedState = Pf(t.type, e.memoizedProps, t.pendingProps, e.memoizedState)),
          null
        );
      case 27:
        return (
          tl(t),
          e === null &&
            Ne &&
            ((n = t.stateNode = Kf(t.type, t.pendingProps, fe.current)),
            (pt = t),
            (Kt = !0),
            (s = Ve),
            _a(t.type) ? ((lc = s), (Ve = Jt(n.firstChild))) : (Ve = s)),
          gt(e, t, t.pendingProps.children, a),
          Vs(e, t),
          e === null && (t.flags |= 4194304),
          t.child
        );
      case 5:
        return (
          e === null &&
            Ne &&
            ((s = n = Ve) &&
              ((n = vv(n, t.type, t.pendingProps, Kt)),
              n !== null
                ? ((t.stateNode = n), (pt = t), (Ve = Jt(n.firstChild)), (Kt = !1), (s = !0))
                : (s = !1)),
            s || Wl(t)),
          tl(t),
          (s = t.type),
          (u = t.pendingProps),
          (_ = e !== null ? e.memoizedProps : null),
          (n = u.children),
          Pu(s, u) ? (n = null) : _ !== null && Pu(s, _) && (t.flags |= 32),
          t.memoizedState !== null && ((s = Jo(e, t, Ok, null, null, a)), (Di._currentValue = s)),
          Vs(e, t),
          gt(e, t, n, a),
          t.child
        );
      case 6:
        return (
          e === null &&
            Ne &&
            ((e = a = Ve) &&
              ((a = yv(a, t.pendingProps, Kt)),
              a !== null ? ((t.stateNode = a), (pt = t), (Ve = null), (e = !0)) : (e = !1)),
            e || Wl(t)),
          null
        );
      case 13:
        return M_(e, t, a);
      case 4:
        return (
          Ae(t, t.stateNode.containerInfo),
          (n = t.pendingProps),
          e === null ? (t.child = Ia(t, null, n, a)) : gt(e, t, n, a),
          t.child
        );
      case 11:
        return C_(e, t, t.type, t.pendingProps, a);
      case 7:
        return (gt(e, t, t.pendingProps, a), t.child);
      case 8:
        return (gt(e, t, t.pendingProps.children, a), t.child);
      case 12:
        return (gt(e, t, t.pendingProps.children, a), t.child);
      case 10:
        return ((n = t.pendingProps), ea(t, t.type, n.value), gt(e, t, n.children, a), t.child);
      case 9:
        return (
          (s = t.type._context),
          (n = t.pendingProps.children),
          La(t),
          (s = ht(s)),
          (n = n(s)),
          (t.flags |= 1),
          gt(e, t, n, a),
          t.child
        );
      case 14:
        return j_(e, t, t.type, t.pendingProps, a);
      case 15:
        return N_(e, t, t.type, t.pendingProps, a);
      case 19:
        return R_(e, t, a);
      case 31:
        return Gk(e, t, a);
      case 22:
        return A_(e, t, a, t.pendingProps);
      case 24:
        return (
          La(t),
          (n = ht(it)),
          e === null
            ? ((s = Ho()),
              s === null &&
                ((s = Ye),
                (u = Ro()),
                (s.pooledCache = u),
                u.refCount++,
                u !== null && (s.pooledCacheLanes |= a),
                (s = u)),
              (t.memoizedState = { parent: n, cache: s }),
              Go(t),
              ea(t, it, s))
            : ((e.lanes & a) !== 0 && ($o(e, t), gi(t, null, null, a), hi()),
              (s = e.memoizedState),
              (u = t.memoizedState),
              s.parent !== n
                ? ((s = { parent: n, cache: n }),
                  (t.memoizedState = s),
                  t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = s),
                  ea(t, it, n))
                : ((n = u.cache), ea(t, it, n), n !== s.cache && Do(t, [it], a, !0))),
          gt(e, t, t.pendingProps.children, a),
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
  function wu(e, t, a, n, s) {
    if (((t = (e.mode & 32) !== 0) && (t = !1), t)) {
      if (((e.flags |= 16777216), (s & 335544128) === s))
        if (e.stateNode.complete) e.flags |= 8192;
        else if (_f()) e.flags |= 8192;
        else throw ((Oa = Ls), Uo);
    } else e.flags &= -16777217;
  }
  function H_(e, t) {
    if (t.type !== 'stylesheet' || (t.state.loading & 4) !== 0) e.flags &= -16777217;
    else if (((e.flags |= 16777216), !lp(t)))
      if (_f()) e.flags |= 8192;
      else throw ((Oa = Ls), Uo);
  }
  function Ks(e, t) {
    (t !== null && (e.flags |= 4),
      e.flags & 16384 && ((t = e.tag !== 22 ? vd() : 536870912), (e.lanes |= t), (Tn |= t)));
  }
  function Si(e, t) {
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
  function Yk(e, t, a) {
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
          Nl(it),
          Ie(),
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
          u = t.memoizedState;
        return (
          e === null
            ? (Bl(t), u !== null ? (Qe(t), H_(t, u)) : (Qe(t), wu(t, s, null, n, a)))
            : u
              ? u !== e.memoizedState
                ? (Bl(t), Qe(t), H_(t, u))
                : (Qe(t), (t.flags &= -16777217))
              : ((e = e.memoizedProps), e !== n && Bl(t), Qe(t), wu(t, s, e, n, a)),
          null
        );
      case 27:
        if ((yl(t), (a = fe.current), (s = t.type), e !== null && t.stateNode != null))
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
          if (((u = F.current), mn(t))) vm(t);
          else {
            var _ = ur(fe.current);
            switch (u) {
              case 1:
                u = _.createElementNS('http://www.w3.org/2000/svg', s);
                break;
              case 2:
                u = _.createElementNS('http://www.w3.org/1998/Math/MathML', s);
                break;
              default:
                switch (s) {
                  case 'svg':
                    u = _.createElementNS('http://www.w3.org/2000/svg', s);
                    break;
                  case 'math':
                    u = _.createElementNS('http://www.w3.org/1998/Math/MathML', s);
                    break;
                  case 'script':
                    ((u = _.createElement('div')),
                      (u.innerHTML = '<script><\/script>'),
                      (u = u.removeChild(u.firstChild)));
                    break;
                  case 'select':
                    ((u =
                      typeof n.is == 'string'
                        ? _.createElement('select', { is: n.is })
                        : _.createElement('select')),
                      n.multiple ? (u.multiple = !0) : n.size && (u.size = n.size));
                    break;
                  default:
                    u =
                      typeof n.is == 'string'
                        ? _.createElement(s, { is: n.is })
                        : _.createElement(s);
                }
            }
            ((u[ft] = t), (u[wt] = n));
            e: for (_ = t.child; _ !== null; ) {
              if (_.tag === 5 || _.tag === 6) u.appendChild(_.stateNode);
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
            n && Bl(t);
          }
        }
        return (Qe(t), wu(t, t.type, e === null ? null : e.memoizedProps, t.pendingProps, a), null);
      case 6:
        if (e && t.stateNode != null) e.memoizedProps !== n && Bl(t);
        else {
          if (typeof n != 'string' && t.stateNode === null) throw Error(r(166));
          if (((e = fe.current), mn(t))) {
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
                Df(e.nodeValue, a)
              )),
              e || Wl(t, !0));
          } else ((e = ur(e).createTextNode(n)), (e[ft] = t), (t.stateNode = e));
        }
        return (Qe(t), null);
      case 31:
        if (((a = t.memoizedState), e === null || e.memoizedState !== null)) {
          if (((n = mn(t)), a !== null)) {
            if (e === null) {
              if (!n) throw Error(r(318));
              if (((e = t.memoizedState), (e = e !== null ? e.dehydrated : null), !e))
                throw Error(r(557));
              e[ft] = t;
            } else (Na(), (t.flags & 128) === 0 && (t.memoizedState = null), (t.flags |= 4));
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
              s[ft] = t;
            } else (Na(), (t.flags & 128) === 0 && (t.memoizedState = null), (t.flags |= 4));
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
                (u = null),
                n.memoizedState !== null &&
                  n.memoizedState.cachePool !== null &&
                  (u = n.memoizedState.cachePool.pool),
                u !== s && (n.flags |= 2048)),
              a !== e && a && (t.child.flags |= 8192),
              Ks(t, t.updateQueue),
              Qe(t),
              null)
        );
      case 4:
        return (Ie(), e === null && Vu(t.stateNode.containerInfo), Qe(t), null);
      case 10:
        return (Nl(t.type), Qe(t), null);
      case 19:
        if ((H(at), (n = t.memoizedState), n === null)) return (Qe(t), null);
        if (((s = (t.flags & 128) !== 0), (u = n.rendering), u === null))
          if (s) Si(n, !1);
          else {
            if (et !== 0 || (e !== null && (e.flags & 128) !== 0))
              for (e = t.child; e !== null; ) {
                if (((u = Is(e)), u !== null)) {
                  for (
                    t.flags |= 128,
                      Si(n, !1),
                      e = u.updateQueue,
                      t.updateQueue = e,
                      Ks(t, e),
                      t.subtreeFlags = 0,
                      e = a,
                      a = t.child;
                    a !== null;
                  )
                    (fm(a, e), (a = a.sibling));
                  return (P(at, (at.current & 1) | 2), Ne && Cl(t, n.treeForkCount), t.child);
                }
                e = e.sibling;
              }
            n.tail !== null &&
              yt() > Ws &&
              ((t.flags |= 128), (s = !0), Si(n, !1), (t.lanes = 4194304));
          }
        else {
          if (!s)
            if (((e = Is(u)), e !== null)) {
              if (
                ((t.flags |= 128),
                (s = !0),
                (e = e.updateQueue),
                (t.updateQueue = e),
                Ks(t, e),
                Si(n, !0),
                n.tail === null && n.tailMode === 'hidden' && !u.alternate && !Ne)
              )
                return (Qe(t), null);
            } else
              2 * yt() - n.renderingStartTime > Ws &&
                a !== 536870912 &&
                ((t.flags |= 128), (s = !0), Si(n, !1), (t.lanes = 4194304));
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
            (a = at.current),
            P(at, s ? (a & 1) | 2 : a & 1),
            Ne && Cl(t, n.treeForkCount),
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
          a !== null && Ks(t, a.retryQueue),
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
          e !== null && H(qa),
          null
        );
      case 24:
        return (
          (a = null),
          e !== null && (a = e.memoizedState.cache),
          t.memoizedState.cache !== a && (t.flags |= 2048),
          Nl(it),
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
  function Xk(e, t) {
    switch ((qo(t), t.tag)) {
      case 1:
        return ((e = t.flags), e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null);
      case 3:
        return (
          Nl(it),
          Ie(),
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
          Na();
        }
        return ((e = t.flags), e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null);
      case 13:
        if ((Mt(t), (e = t.memoizedState), e !== null && e.dehydrated !== null)) {
          if (t.alternate === null) throw Error(r(340));
          Na();
        }
        return ((e = t.flags), e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null);
      case 19:
        return (H(at), null);
      case 4:
        return (Ie(), null);
      case 10:
        return (Nl(t.type), null);
      case 22:
      case 23:
        return (
          Mt(t),
          Qo(),
          e !== null && H(qa),
          (e = t.flags),
          e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
        );
      case 24:
        return (Nl(it), null);
      case 25:
        return null;
      default:
        return null;
    }
  }
  function U_(e, t) {
    switch ((qo(t), t.tag)) {
      case 3:
        (Nl(it), Ie());
        break;
      case 26:
      case 27:
      case 5:
        yl(t);
        break;
      case 4:
        Ie();
        break;
      case 31:
        t.memoizedState !== null && Mt(t);
        break;
      case 13:
        Mt(t);
        break;
      case 19:
        H(at);
        break;
      case 10:
        Nl(t.type);
        break;
      case 22:
      case 23:
        (Mt(t), Qo(), e !== null && H(qa));
        break;
      case 24:
        Nl(it);
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
            var u = a.create,
              _ = a.inst;
            ((n = u()), (_.destroy = n));
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
        var u = s.next;
        n = u;
        do {
          if ((n.tag & e) === e) {
            var _ = n.inst,
              k = _.destroy;
            if (k !== void 0) {
              ((_.destroy = void 0), (s = t));
              var T = a,
                R = k;
              try {
                R();
              } catch ($) {
                Re(s, T, $);
              }
            }
          }
          n = n.next;
        } while (n !== u);
      }
    } catch ($) {
      Re(t, t.return, $);
    }
  }
  function G_(e) {
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
  function $_(e, t, a) {
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
  function Tu(e, t, a) {
    try {
      var n = e.stateNode;
      (_v(n, e.type, a, t), (n[wt] = t));
    } catch (s) {
      Re(e, e.return, s);
    }
  }
  function X_(e) {
    return (
      e.tag === 5 || e.tag === 3 || e.tag === 26 || (e.tag === 27 && _a(e.type)) || e.tag === 4
    );
  }
  function Eu(e) {
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
  function Cu(e, t, a) {
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
      for (Cu(e, t, a), e = e.sibling; e !== null; ) (Cu(e, t, a), (e = e.sibling));
  }
  function Zs(e, t, a) {
    var n = e.tag;
    if (n === 5 || n === 6) ((e = e.stateNode), t ? a.insertBefore(e, t) : a.appendChild(e));
    else if (n !== 4 && (n === 27 && _a(e.type) && (a = e.stateNode), (e = e.child), e !== null))
      for (Zs(e, t, a), e = e.sibling; e !== null; ) (Zs(e, t, a), (e = e.sibling));
  }
  function V_(e) {
    var t = e.stateNode,
      a = e.memoizedProps;
    try {
      for (var n = e.type, s = t.attributes; s.length; ) t.removeAttributeNode(s[0]);
      (kt(t, n, a), (t[ft] = e), (t[wt] = a));
    } catch (u) {
      Re(e, e.return, u);
    }
  }
  var Ol = !1,
    ot = !1,
    ju = !1,
    Q_ = typeof WeakSet == 'function' ? WeakSet : Set,
    dt = null;
  function Vk(e, t) {
    if (((e = e.containerInfo), (Zu = hr), (e = im(e)), bo(e))) {
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
            var _ = 0,
              k = -1,
              T = -1,
              R = 0,
              $ = 0,
              V = e,
              z = null;
            t: for (;;) {
              for (
                var U;
                V !== a || (s !== 0 && V.nodeType !== 3) || (k = _ + s),
                  V !== u || (n !== 0 && V.nodeType !== 3) || (T = _ + n),
                  V.nodeType === 3 && (_ += V.nodeValue.length),
                  (U = V.firstChild) !== null;
              )
                ((z = V), (V = U));
              for (;;) {
                if (V === e) break t;
                if (
                  (z === a && ++R === s && (k = _),
                  z === u && ++$ === n && (T = _),
                  (U = V.nextSibling) !== null)
                )
                  break;
                ((V = z), (z = V.parentNode));
              }
              V = U;
            }
            a = k === -1 || T === -1 ? null : { start: k, end: T };
          } else a = null;
        }
      a = a || { start: 0, end: 0 };
    } else a = null;
    for (Ju = { focusedElem: e, selectionRange: a }, hr = !1, dt = t; dt !== null; )
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
                  var se = Da(a.type, s);
                  ((e = n.getSnapshotBeforeUpdate(se, u)),
                    (n.__reactInternalSnapshotBeforeUpdate = e));
                } catch (pe) {
                  Re(a, a.return, pe);
                }
              }
              break;
            case 3:
              if ((e & 1024) !== 0) {
                if (((e = t.stateNode.containerInfo), (a = e.nodeType), a === 9)) Wu(e);
                else if (a === 1)
                  switch (e.nodeName) {
                    case 'HEAD':
                    case 'HTML':
                    case 'BODY':
                      Wu(e);
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
        (n & 64 && G_(a), n & 512 && Ti(a, a.return));
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
            e !== null && ((e = e.dehydrated), e !== null && ((a = tv.bind(null, a)), bv(e, a)))));
        break;
      case 22:
        if (((n = a.memoizedState !== null || Ol), !n)) {
          ((t = (t !== null && t.memoizedState !== null) || ot), (s = Ol));
          var u = ot;
          ((Ol = n),
            (ot = t) && !u ? Dl(e, a, (a.subtreeFlags & 8772) !== 0) : Ml(e, a),
            (Ol = s),
            (ot = u));
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
  var Ze = null,
    Et = !1;
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
        var n = Ze,
          s = Et;
        (_a(a.type) && ((Ze = a.stateNode), (Et = !1)),
          Il(e, t, a),
          Oi(a.stateNode),
          (Ze = n),
          (Et = s));
        break;
      case 5:
        ot || hl(a, t);
      case 6:
        if (((n = Ze), (s = Et), (Ze = null), Il(e, t, a), (Ze = n), (Et = s), Ze !== null))
          if (Et)
            try {
              (Ze.nodeType === 9
                ? Ze.body
                : Ze.nodeName === 'HTML'
                  ? Ze.ownerDocument.body
                  : Ze
              ).removeChild(a.stateNode);
            } catch (u) {
              Re(a, t, u);
            }
          else
            try {
              Ze.removeChild(a.stateNode);
            } catch (u) {
              Re(a, t, u);
            }
        break;
      case 18:
        Ze !== null &&
          (Et
            ? ((e = Ze),
              $f(
                e.nodeType === 9 ? e.body : e.nodeName === 'HTML' ? e.ownerDocument.body : e,
                a.stateNode
              ),
              Bn(e))
            : $f(Ze, a.stateNode));
        break;
      case 4:
        ((n = Ze),
          (s = Et),
          (Ze = a.stateNode.containerInfo),
          (Et = !0),
          Il(e, t, a),
          (Ze = n),
          (Et = s));
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        (sa(2, a, t), ot || sa(4, a, t), Il(e, t, a));
        break;
      case 1:
        (ot ||
          (hl(a, t), (n = a.stateNode), typeof n.componentWillUnmount == 'function' && $_(a, t, n)),
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
  function Qk(e) {
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
  function Js(e, t) {
    var a = Qk(e);
    t.forEach(function (n) {
      if (!a.has(n)) {
        a.add(n);
        var s = lv.bind(null, e, n);
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
          _ = t,
          k = _;
        e: for (; k !== null; ) {
          switch (k.tag) {
            case 27:
              if (_a(k.type)) {
                ((Ze = k.stateNode), (Et = !1));
                break e;
              }
              break;
            case 5:
              ((Ze = k.stateNode), (Et = !1));
              break e;
            case 3:
            case 4:
              ((Ze = k.stateNode.containerInfo), (Et = !0));
              break e;
          }
          k = k.return;
        }
        if (Ze === null) throw Error(r(160));
        (J_(u, _, s),
          (Ze = null),
          (Et = !1),
          (u = s.alternate),
          u !== null && (u.return = null),
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
        (Ct(t, e), jt(e), n & 4 && (sa(3, e, e.return), wi(3, e), sa(5, e, e.return)));
        break;
      case 1:
        (Ct(t, e),
          jt(e),
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
        if ((Ct(t, e), jt(e), n & 512 && (ot || a === null || hl(a, a.return)), n & 4)) {
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
                          u[Fn] ||
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
                      var _ = ep('link', 'href', s).get(n + (a.href || ''));
                      if (_) {
                        for (var k = 0; k < _.length; k++)
                          if (
                            ((u = _[k]),
                            u.getAttribute('href') ===
                              (a.href == null || a.href === '' ? null : a.href) &&
                              u.getAttribute('rel') === (a.rel == null ? null : a.rel) &&
                              u.getAttribute('title') === (a.title == null ? null : a.title) &&
                              u.getAttribute('crossorigin') ===
                                (a.crossOrigin == null ? null : a.crossOrigin))
                          ) {
                            _.splice(k, 1);
                            break t;
                          }
                      }
                      ((u = s.createElement(n)), kt(u, n, a), s.head.appendChild(u));
                      break;
                    case 'meta':
                      if ((_ = ep('meta', 'content', s).get(n + (a.content || '')))) {
                        for (k = 0; k < _.length; k++)
                          if (
                            ((u = _[k]),
                            u.getAttribute('content') ===
                              (a.content == null ? null : '' + a.content) &&
                              u.getAttribute('name') === (a.name == null ? null : a.name) &&
                              u.getAttribute('property') ===
                                (a.property == null ? null : a.property) &&
                              u.getAttribute('http-equiv') ===
                                (a.httpEquiv == null ? null : a.httpEquiv) &&
                              u.getAttribute('charset') === (a.charSet == null ? null : a.charSet))
                          ) {
                            _.splice(k, 1);
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
              } else tp(s, e.type, e.stateNode);
            else e.stateNode = Wf(s, n, e.memoizedProps);
          else
            u !== n
              ? (u === null
                  ? a.stateNode !== null && ((a = a.stateNode), a.parentNode.removeChild(a))
                  : u.count--,
                n === null ? tp(s, e.type, e.stateNode) : Wf(s, n, e.memoizedProps))
              : n === null && e.stateNode !== null && Tu(e, e.memoizedProps, a.memoizedProps);
        }
        break;
      case 27:
        (Ct(t, e),
          jt(e),
          n & 512 && (ot || a === null || hl(a, a.return)),
          a !== null && n & 4 && Tu(e, e.memoizedProps, a.memoizedProps));
        break;
      case 5:
        if ((Ct(t, e), jt(e), n & 512 && (ot || a === null || hl(a, a.return)), e.flags & 32)) {
          s = e.stateNode;
          try {
            tn(s, '');
          } catch (se) {
            Re(e, e.return, se);
          }
        }
        (n & 4 &&
          e.stateNode != null &&
          ((s = e.memoizedProps), Tu(e, s, a !== null ? a.memoizedProps : s)),
          n & 1024 && (ju = !0));
        break;
      case 6:
        if ((Ct(t, e), jt(e), n & 4)) {
          if (e.stateNode === null) throw Error(r(162));
          ((n = e.memoizedProps), (a = e.stateNode));
          try {
            a.nodeValue = n;
          } catch (se) {
            Re(e, e.return, se);
          }
        }
        break;
      case 3:
        if (
          ((mr = null),
          (s = al),
          (al = cr(t.containerInfo)),
          Ct(t, e),
          (al = s),
          jt(e),
          n & 4 && a !== null && a.memoizedState.isDehydrated)
        )
          try {
            Bn(t.containerInfo);
          } catch (se) {
            Re(e, e.return, se);
          }
        ju && ((ju = !1), ef(e));
        break;
      case 4:
        ((n = al), (al = cr(e.stateNode.containerInfo)), Ct(t, e), jt(e), (al = n));
        break;
      case 12:
        (Ct(t, e), jt(e));
        break;
      case 31:
        (Ct(t, e),
          jt(e),
          n & 4 && ((n = e.updateQueue), n !== null && ((e.updateQueue = null), Js(e, n))));
        break;
      case 13:
        (Ct(t, e),
          jt(e),
          e.child.flags & 8192 &&
            (e.memoizedState !== null) != (a !== null && a.memoizedState !== null) &&
            (Fs = yt()),
          n & 4 && ((n = e.updateQueue), n !== null && ((e.updateQueue = null), Js(e, n))));
        break;
      case 22:
        s = e.memoizedState !== null;
        var T = a !== null && a.memoizedState !== null,
          R = Ol,
          $ = ot;
        if (((Ol = R || s), (ot = $ || T), Ct(t, e), (ot = $), (Ol = R), jt(e), n & 8192))
          e: for (
            t = e.stateNode,
              t._visibility = s ? t._visibility & -2 : t._visibility | 1,
              s && (a === null || T || Ol || ot || Ra(e)),
              a = null,
              t = e;
            ;
          ) {
            if (t.tag === 5 || t.tag === 26) {
              if (a === null) {
                T = a = t;
                try {
                  if (((u = T.stateNode), s))
                    ((_ = u.style),
                      typeof _.setProperty == 'function'
                        ? _.setProperty('display', 'none', 'important')
                        : (_.display = 'none'));
                  else {
                    k = T.stateNode;
                    var V = T.memoizedProps.style,
                      z = V != null && V.hasOwnProperty('display') ? V.display : null;
                    k.style.display = z == null || typeof z == 'boolean' ? '' : ('' + z).trim();
                  }
                } catch (se) {
                  Re(T, T.return, se);
                }
              }
            } else if (t.tag === 6) {
              if (a === null) {
                T = t;
                try {
                  T.stateNode.nodeValue = s ? '' : T.memoizedProps;
                } catch (se) {
                  Re(T, T.return, se);
                }
              }
            } else if (t.tag === 18) {
              if (a === null) {
                T = t;
                try {
                  var U = T.stateNode;
                  s ? Yf(U, !0) : Yf(T.stateNode, !1);
                } catch (se) {
                  Re(T, T.return, se);
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
          n !== null && ((a = n.retryQueue), a !== null && ((n.retryQueue = null), Js(e, a))));
        break;
      case 19:
        (Ct(t, e),
          jt(e),
          n & 4 && ((n = e.updateQueue), n !== null && ((e.updateQueue = null), Js(e, n))));
        break;
      case 30:
        break;
      case 21:
        break;
      default:
        (Ct(t, e), jt(e));
    }
  }
  function jt(e) {
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
              u = Eu(e);
            Zs(e, u, s);
            break;
          case 5:
            var _ = a.stateNode;
            a.flags & 32 && (tn(_, ''), (a.flags &= -33));
            var k = Eu(e);
            Zs(e, k, _);
            break;
          case 3:
          case 4:
            var T = a.stateNode.containerInfo,
              R = Eu(e);
            Cu(e, R, T);
            break;
          default:
            throw Error(r(161));
        }
      } catch ($) {
        Re(e, e.return, $);
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
          (typeof a.componentWillUnmount == 'function' && $_(t, t.return, a), Ra(t));
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
        u = t,
        _ = u.flags;
      switch (u.tag) {
        case 0:
        case 11:
        case 15:
          (Dl(s, u, a), wi(4, u));
          break;
        case 1:
          if ((Dl(s, u, a), (n = u), (s = n.stateNode), typeof s.componentDidMount == 'function'))
            try {
              s.componentDidMount();
            } catch (R) {
              Re(n, n.return, R);
            }
          if (((n = u), (s = n.updateQueue), s !== null)) {
            var k = n.stateNode;
            try {
              var T = s.shared.hiddenCallbacks;
              if (T !== null)
                for (s.shared.hiddenCallbacks = null, s = 0; s < T.length; s++) Lm(T[s], k);
            } catch (R) {
              Re(n, n.return, R);
            }
          }
          (a && _ & 64 && G_(u), Ti(u, u.return));
          break;
        case 27:
          V_(u);
        case 26:
        case 5:
          (Dl(s, u, a), a && n === null && _ & 4 && Y_(u), Ti(u, u.return));
          break;
        case 12:
          Dl(s, u, a);
          break;
        case 31:
          (Dl(s, u, a), a && _ & 4 && P_(s, u));
          break;
        case 13:
          (Dl(s, u, a), a && _ & 4 && F_(s, u));
          break;
        case 22:
          (u.memoizedState === null && Dl(s, u, a), Ti(u, u.return));
          break;
        case 30:
          break;
        default:
          Dl(s, u, a);
      }
      t = t.sibling;
    }
  }
  function Nu(e, t) {
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
  function Au(e, t) {
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
            var u = t.memoizedProps,
              _ = u.id,
              k = u.onPostCommit;
            typeof k == 'function' &&
              k(_, t.alternate === null ? 'mount' : 'update', e.passiveEffectDuration, -0);
          } catch (T) {
            Re(t, t.return, T);
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
        ((u = t.stateNode),
          (_ = t.alternate),
          t.memoizedState !== null
            ? u._visibility & 2
              ? nl(e, t, a, n)
              : Ei(e, t)
            : u._visibility & 2
              ? nl(e, t, a, n)
              : ((u._visibility |= 2), xn(e, t, a, n, (t.subtreeFlags & 10256) !== 0 || !1)),
          s & 2048 && Nu(_, t));
        break;
      case 24:
        (nl(e, t, a, n), s & 2048 && Au(t.alternate, t));
        break;
      default:
        nl(e, t, a, n);
    }
  }
  function xn(e, t, a, n, s) {
    for (s = s && ((t.subtreeFlags & 10256) !== 0 || !1), t = t.child; t !== null; ) {
      var u = e,
        _ = t,
        k = a,
        T = n,
        R = _.flags;
      switch (_.tag) {
        case 0:
        case 11:
        case 15:
          (xn(u, _, k, T, s), wi(8, _));
          break;
        case 23:
          break;
        case 22:
          var $ = _.stateNode;
          (_.memoizedState !== null
            ? $._visibility & 2
              ? xn(u, _, k, T, s)
              : Ei(u, _)
            : (($._visibility |= 2), xn(u, _, k, T, s)),
            s && R & 2048 && Nu(_.alternate, _));
          break;
        case 24:
          (xn(u, _, k, T, s), s && R & 2048 && Au(_.alternate, _));
          break;
        default:
          xn(u, _, k, T, s);
      }
      t = t.sibling;
    }
  }
  function Ei(e, t) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; ) {
        var a = e,
          n = t,
          s = n.flags;
        switch (n.tag) {
          case 22:
            (Ei(a, n), s & 2048 && Nu(n.alternate, n));
            break;
          case 24:
            (Ei(a, n), s & 2048 && Au(n.alternate, n));
            break;
          default:
            Ei(a, n);
        }
        t = t.sibling;
      }
  }
  var Ci = 8192;
  function Sn(e, t, a) {
    if (e.subtreeFlags & Ci) for (e = e.child; e !== null; ) (lf(e, t, a), (e = e.sibling));
  }
  function lf(e, t, a) {
    switch (e.tag) {
      case 26:
        (Sn(e, t, a),
          e.flags & Ci && e.memoizedState !== null && Bv(a, al, e.memoizedState, e.memoizedProps));
        break;
      case 5:
        Sn(e, t, a);
        break;
      case 3:
      case 4:
        var n = al;
        ((al = cr(e.stateNode.containerInfo)), Sn(e, t, a), (al = n));
        break;
      case 22:
        e.memoizedState === null &&
          ((n = e.alternate),
          n !== null && n.memoizedState !== null
            ? ((n = Ci), (Ci = 16777216), Sn(e, t, a), (Ci = n))
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
  function ji(e) {
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
        (ji(e), e.flags & 2048 && sa(9, e, e.return));
        break;
      case 3:
        ji(e);
        break;
      case 12:
        ji(e);
        break;
      case 22:
        var t = e.stateNode;
        e.memoizedState !== null && t._visibility & 2 && (e.return === null || e.return.tag !== 13)
          ? ((t._visibility &= -3), Ps(e))
          : ji(e);
        break;
      default:
        ji(e);
    }
  }
  function Ps(e) {
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
          (sa(8, t, t.return), Ps(t));
          break;
        case 22:
          ((a = t.stateNode), a._visibility & 2 && ((a._visibility &= -3), Ps(t)));
          break;
        default:
          Ps(t);
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
            u = n.return;
          if ((Z_(n), n === a)) {
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
  var Kk = {
      getCacheForType: function (e) {
        var t = ht(it),
          a = t.data.get(e);
        return (a === void 0 && ((a = e()), t.data.set(e, a)), a);
      },
      cacheSignal: function () {
        return ht(it).controller.signal;
      },
    },
    Zk = typeof WeakMap == 'function' ? WeakMap : Map,
    Be = 0,
    Ye = null,
    Te = null,
    Ce = 0,
    De = 0,
    Dt = null,
    ra = !1,
    wn = !1,
    Lu = !1,
    Rl = 0,
    et = 0,
    oa = 0,
    za = 0,
    qu = 0,
    Rt = 0,
    Tn = 0,
    Ni = null,
    Nt = null,
    Bu = !1,
    Fs = 0,
    rf = 0,
    Ws = 1 / 0,
    er = null,
    ua = null,
    ut = 0,
    ca = null,
    En = null,
    zl = 0,
    Ou = 0,
    Iu = null,
    of = null,
    Ai = 0,
    Mu = null;
  function zt() {
    return (Be & 2) !== 0 && Ce !== 0 ? Ce & -Ce : L.T !== null ? Gu() : Sd();
  }
  function uf() {
    if (Rt === 0)
      if ((Ce & 536870912) === 0 || Ne) {
        var e = os;
        ((os <<= 1), (os & 3932160) === 0 && (os = 262144), (Rt = e));
      } else Rt = 536870912;
    return ((e = It.current), e !== null && (e.flags |= 32), Rt);
  }
  function At(e, t, a) {
    (((e === Ye && (De === 2 || De === 9)) || e.cancelPendingCommit !== null) &&
      (Cn(e, 0), da(e, Ce, Rt, !1)),
      Pn(e, a),
      ((Be & 2) === 0 || e !== Ye) &&
        (e === Ye && ((Be & 2) === 0 && (za |= a), et === 4 && da(e, Ce, Rt, !1)), gl(e)));
  }
  function cf(e, t, a) {
    if ((Be & 6) !== 0) throw Error(r(327));
    var n = (!a && (t & 127) === 0 && (t & e.expiredLanes) === 0) || Jn(e, t),
      s = n ? Fk(e, t) : Ru(e, t, !0),
      u = n;
    do {
      if (s === 0) {
        wn && !n && da(e, t, 0, !1);
        break;
      } else {
        if (((a = e.current.alternate), u && !Jk(a))) {
          ((s = Ru(e, t, !1)), (u = !1));
          continue;
        }
        if (s === 2) {
          if (((u = t), e.errorRecoveryDisabledLanes & u)) var _ = 0;
          else
            ((_ = e.pendingLanes & -536870913), (_ = _ !== 0 ? _ : _ & 536870912 ? 536870912 : 0));
          if (_ !== 0) {
            t = _;
            e: {
              var k = e;
              s = Ni;
              var T = k.current.memoizedState.isDehydrated;
              if ((T && (Cn(k, _).flags |= 256), (_ = Ru(k, _, !1)), _ !== 2)) {
                if (Lu && !T) {
                  ((k.errorRecoveryDisabledLanes |= u), (za |= u), (s = 4));
                  break e;
                }
                ((u = Nt), (Nt = s), u !== null && (Nt === null ? (Nt = u) : Nt.push.apply(Nt, u)));
              }
              s = _;
            }
            if (((u = !1), s !== 2)) continue;
          }
        }
        if (s === 1) {
          (Cn(e, 0), da(e, t, 0, !0));
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
              da(n, t, Rt, !ra);
              break e;
            case 2:
              Nt = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(r(329));
          }
          if ((t & 62914560) === t && ((s = Fs + 300 - yt()), 10 < s)) {
            if ((da(n, t, Rt, !ra), cs(n, 0, !0) !== 0)) break e;
            ((zl = t),
              (n.timeoutHandle = Uf(
                df.bind(null, n, a, Nt, er, Bu, t, Rt, za, Tn, ra, u, 'Throttled', -0, 0),
                s
              )));
            break e;
          }
          df(n, a, Nt, er, Bu, t, Rt, za, Tn, ra, u, null, -0, 0);
        }
      }
      break;
    } while (!0);
    gl(e);
  }
  function df(e, t, a, n, s, u, _, k, T, R, $, V, z, U) {
    if (((e.timeoutHandle = -1), (V = t.subtreeFlags), V & 8192 || (V & 16785408) === 16785408)) {
      ((V = {
        stylesheets: null,
        count: 0,
        imgCount: 0,
        imgBytes: 0,
        suspenseyImages: [],
        waitingForImages: !0,
        waitingForViewTransition: !1,
        unsuspend: wl,
      }),
        lf(t, u, V));
      var se = (u & 62914560) === u ? Fs - yt() : (u & 4194048) === u ? rf - yt() : 0;
      if (((se = Ov(V, se)), se !== null)) {
        ((zl = u),
          (e.cancelPendingCommit = se(vf.bind(null, e, t, u, a, n, s, _, k, T, $, V, null, z, U))),
          da(e, u, _, !R));
        return;
      }
    }
    vf(e, t, u, a, n, s, _, k, T);
  }
  function Jk(e) {
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
  function da(e, t, a, n) {
    ((t &= ~qu),
      (t &= ~za),
      (e.suspendedLanes |= t),
      (e.pingedLanes &= ~t),
      n && (e.warmLanes |= t),
      (n = e.expirationTimes));
    for (var s = t; 0 < s; ) {
      var u = 31 - qt(s),
        _ = 1 << u;
      ((n[u] = -1), (s &= ~_));
    }
    a !== 0 && yd(e, a, t);
  }
  function tr() {
    return (Be & 6) === 0 ? (Li(0), !1) : !0;
  }
  function Du() {
    if (Te !== null) {
      if (De === 0) var e = Te.return;
      else ((e = Te), (jl = Aa = null), Wo(e), (gn = null), (_i = 0), (e = Te));
      for (; e !== null; ) (U_(e.alternate, e), (e = e.return));
      Te = null;
    }
  }
  function Cn(e, t) {
    var a = e.timeoutHandle;
    (a !== -1 && ((e.timeoutHandle = -1), hv(a)),
      (a = e.cancelPendingCommit),
      a !== null && ((e.cancelPendingCommit = null), a()),
      (zl = 0),
      Du(),
      (Ye = e),
      (Te = a = El(e.current, null)),
      (Ce = t),
      (De = 0),
      (Dt = null),
      (ra = !1),
      (wn = Jn(e, t)),
      (Lu = !1),
      (Tn = Rt = qu = za = oa = et = 0),
      (Nt = Ni = null),
      (Bu = !1),
      (t & 8) !== 0 && (t |= t & 32));
    var n = e.entangledLanes;
    if (n !== 0)
      for (e = e.entanglements, n &= t; 0 < n; ) {
        var s = 31 - qt(n),
          u = 1 << s;
        ((t |= e[s]), (n &= ~u));
      }
    return ((Rl = t), xs(), a);
  }
  function mf(e, t) {
    ((be = null),
      (L.H = bi),
      t === hn || t === As
        ? ((t = Cm()), (De = 3))
        : t === Uo
          ? ((t = Cm()), (De = 4))
          : (De =
              t === pu
                ? 8
                : t !== null && typeof t == 'object' && typeof t.then == 'function'
                  ? 6
                  : 1),
      (Dt = t),
      Te === null && ((et = 1), Ys(e, Xt(t, e.current))));
  }
  function _f() {
    var e = It.current;
    return e === null
      ? !0
      : (Ce & 4194048) === Ce
        ? Zt === null
        : (Ce & 62914560) === Ce || (Ce & 536870912) !== 0
          ? e === Zt
          : !1;
  }
  function ff() {
    var e = L.H;
    return ((L.H = bi), e === null ? bi : e);
  }
  function pf() {
    var e = L.A;
    return ((L.A = Kk), e);
  }
  function lr() {
    ((et = 4),
      ra || ((Ce & 4194048) !== Ce && It.current !== null) || (wn = !0),
      ((oa & 134217727) === 0 && (za & 134217727) === 0) || Ye === null || da(Ye, Ce, Rt, !1));
  }
  function Ru(e, t, a) {
    var n = Be;
    Be |= 2;
    var s = ff(),
      u = pf();
    ((Ye !== e || Ce !== t) && ((er = null), Cn(e, t)), (t = !1));
    var _ = et;
    e: do
      try {
        if (De !== 0 && Te !== null) {
          var k = Te,
            T = Dt;
          switch (De) {
            case 8:
              (Du(), (_ = 6));
              break e;
            case 3:
            case 2:
            case 9:
            case 6:
              It.current === null && (t = !0);
              var R = De;
              if (((De = 0), (Dt = null), jn(e, k, T, R), a && wn)) {
                _ = 0;
                break e;
              }
              break;
            default:
              ((R = De), (De = 0), (Dt = null), jn(e, k, T, R));
          }
        }
        (Pk(), (_ = et));
        break;
      } catch ($) {
        mf(e, $);
      }
    while (!0);
    return (
      t && e.shellSuspendCounter++,
      (jl = Aa = null),
      (Be = n),
      (L.H = s),
      (L.A = u),
      Te === null && ((Ye = null), (Ce = 0), xs()),
      _
    );
  }
  function Pk() {
    for (; Te !== null; ) hf(Te);
  }
  function Fk(e, t) {
    var a = Be;
    Be |= 2;
    var n = ff(),
      s = pf();
    Ye !== e || Ce !== t ? ((er = null), (Ws = yt() + 500), Cn(e, t)) : (wn = Jn(e, t));
    e: do
      try {
        if (De !== 0 && Te !== null) {
          t = Te;
          var u = Dt;
          t: switch (De) {
            case 1:
              ((De = 0), (Dt = null), jn(e, t, u, 1));
              break;
            case 2:
            case 9:
              if (Tm(u)) {
                ((De = 0), (Dt = null), gf(t));
                break;
              }
              ((t = function () {
                ((De !== 2 && De !== 9) || Ye !== e || (De = 7), gl(e));
              }),
                u.then(t, t));
              break e;
            case 3:
              De = 7;
              break e;
            case 4:
              De = 5;
              break e;
            case 7:
              Tm(u) ? ((De = 0), (Dt = null), gf(t)) : ((De = 0), (Dt = null), jn(e, t, u, 7));
              break;
            case 5:
              var _ = null;
              switch (Te.tag) {
                case 26:
                  _ = Te.memoizedState;
                case 5:
                case 27:
                  var k = Te;
                  if (_ ? lp(_) : k.stateNode.complete) {
                    ((De = 0), (Dt = null));
                    var T = k.sibling;
                    if (T !== null) Te = T;
                    else {
                      var R = k.return;
                      R !== null ? ((Te = R), ar(R)) : (Te = null);
                    }
                    break t;
                  }
              }
              ((De = 0), (Dt = null), jn(e, t, u, 5));
              break;
            case 6:
              ((De = 0), (Dt = null), jn(e, t, u, 6));
              break;
            case 8:
              (Du(), (et = 6));
              break e;
            default:
              throw Error(r(462));
          }
        }
        Wk();
        break;
      } catch ($) {
        mf(e, $);
      }
    while (!0);
    return (
      (jl = Aa = null),
      (L.H = n),
      (L.A = s),
      (Be = a),
      Te !== null ? 0 : ((Ye = null), (Ce = 0), xs(), et)
    );
  }
  function Wk() {
    for (; Te !== null && !ns(); ) hf(Te);
  }
  function hf(e) {
    var t = z_(e.alternate, e, Rl);
    ((e.memoizedProps = e.pendingProps), t === null ? ar(e) : (Te = t));
  }
  function gf(e) {
    var t = e,
      a = t.alternate;
    switch (t.tag) {
      case 15:
      case 0:
        t = B_(a, t, t.pendingProps, t.type, void 0, Ce);
        break;
      case 11:
        t = B_(a, t, t.pendingProps, t.type.render, t.ref, Ce);
        break;
      case 5:
        Wo(t);
      default:
        (U_(a, t), (t = Te = fm(t, Rl)), (t = z_(a, t, Rl)));
    }
    ((e.memoizedProps = e.pendingProps), t === null ? ar(e) : (Te = t));
  }
  function jn(e, t, a, n) {
    ((jl = Aa = null), Wo(t), (gn = null), (_i = 0));
    var s = t.return;
    try {
      if (Uk(e, s, t, a, Ce)) {
        ((et = 1), Ys(e, Xt(a, e.current)), (Te = null));
        return;
      }
    } catch (u) {
      if (s !== null) throw ((Te = s), u);
      ((et = 1), Ys(e, Xt(a, e.current)), (Te = null));
      return;
    }
    t.flags & 32768
      ? (Ne || n === 1
          ? (e = !0)
          : wn || (Ce & 536870912) !== 0
            ? (e = !1)
            : ((ra = e = !0),
              (n === 2 || n === 9 || n === 3 || n === 6) &&
                ((n = It.current), n !== null && n.tag === 13 && (n.flags |= 16384))),
        kf(t, e))
      : ar(t);
  }
  function ar(e) {
    var t = e;
    do {
      if ((t.flags & 32768) !== 0) {
        kf(t, ra);
        return;
      }
      e = t.return;
      var a = Yk(t.alternate, t, Rl);
      if (a !== null) {
        Te = a;
        return;
      }
      if (((t = t.sibling), t !== null)) {
        Te = t;
        return;
      }
      Te = t = e;
    } while (t !== null);
    et === 0 && (et = 5);
  }
  function kf(e, t) {
    do {
      var a = Xk(e.alternate, e);
      if (a !== null) {
        ((a.flags &= 32767), (Te = a));
        return;
      }
      if (
        ((a = e.return),
        a !== null && ((a.flags |= 32768), (a.subtreeFlags = 0), (a.deletions = null)),
        !t && ((e = e.sibling), e !== null))
      ) {
        Te = e;
        return;
      }
      Te = e = a;
    } while (e !== null);
    ((et = 6), (Te = null));
  }
  function vf(e, t, a, n, s, u, _, k, T) {
    e.cancelPendingCommit = null;
    do nr();
    while (ut !== 0);
    if ((Be & 6) !== 0) throw Error(r(327));
    if (t !== null) {
      if (t === e.current) throw Error(r(177));
      if (
        ((u = t.lanes | t.childLanes),
        (u |= Eo),
        qg(e, a, u, _, k, T),
        e === Ye && ((Te = Ye = null), (Ce = 0)),
        (En = t),
        (ca = e),
        (zl = a),
        (Ou = u),
        (Iu = s),
        (of = n),
        (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0
          ? ((e.callbackNode = null),
            (e.callbackPriority = 0),
            av(_e, function () {
              return (wf(), null);
            }))
          : ((e.callbackNode = null), (e.callbackPriority = 0)),
        (n = (t.flags & 13878) !== 0),
        (t.subtreeFlags & 13878) !== 0 || n)
      ) {
        ((n = L.T), (L.T = null), (s = J.p), (J.p = 2), (_ = Be), (Be |= 4));
        try {
          Vk(e, t, a);
        } finally {
          ((Be = _), (J.p = s), (L.T = n));
        }
      }
      ((ut = 1), yf(), bf(), xf());
    }
  }
  function yf() {
    if (ut === 1) {
      ut = 0;
      var e = ca,
        t = En,
        a = (t.flags & 13878) !== 0;
      if ((t.subtreeFlags & 13878) !== 0 || a) {
        ((a = L.T), (L.T = null));
        var n = J.p;
        J.p = 2;
        var s = Be;
        Be |= 4;
        try {
          W_(t, e);
          var u = Ju,
            _ = im(e.containerInfo),
            k = u.focusedElem,
            T = u.selectionRange;
          if (_ !== k && k && k.ownerDocument && nm(k.ownerDocument.documentElement, k)) {
            if (T !== null && bo(k)) {
              var R = T.start,
                $ = T.end;
              if (($ === void 0 && ($ = R), 'selectionStart' in k))
                ((k.selectionStart = R), (k.selectionEnd = Math.min($, k.value.length)));
              else {
                var V = k.ownerDocument || document,
                  z = (V && V.defaultView) || window;
                if (z.getSelection) {
                  var U = z.getSelection(),
                    se = k.textContent.length,
                    pe = Math.min(T.start, se),
                    Ue = T.end === void 0 ? pe : Math.min(T.end, se);
                  !U.extend && pe > Ue && ((_ = Ue), (Ue = pe), (pe = _));
                  var O = am(k, pe),
                    N = am(k, Ue);
                  if (
                    O &&
                    N &&
                    (U.rangeCount !== 1 ||
                      U.anchorNode !== O.node ||
                      U.anchorOffset !== O.offset ||
                      U.focusNode !== N.node ||
                      U.focusOffset !== N.offset)
                  ) {
                    var D = V.createRange();
                    (D.setStart(O.node, O.offset),
                      U.removeAllRanges(),
                      pe > Ue
                        ? (U.addRange(D), U.extend(N.node, N.offset))
                        : (D.setEnd(N.node, N.offset), U.addRange(D)));
                  }
                }
              }
            }
            for (V = [], U = k; (U = U.parentNode); )
              U.nodeType === 1 && V.push({ element: U, left: U.scrollLeft, top: U.scrollTop });
            for (typeof k.focus == 'function' && k.focus(), k = 0; k < V.length; k++) {
              var X = V[k];
              ((X.element.scrollLeft = X.left), (X.element.scrollTop = X.top));
            }
          }
          ((hr = !!Zu), (Ju = Zu = null));
        } finally {
          ((Be = s), (J.p = n), (L.T = a));
        }
      }
      ((e.current = t), (ut = 2));
    }
  }
  function bf() {
    if (ut === 2) {
      ut = 0;
      var e = ca,
        t = En,
        a = (t.flags & 8772) !== 0;
      if ((t.subtreeFlags & 8772) !== 0 || a) {
        ((a = L.T), (L.T = null));
        var n = J.p;
        J.p = 2;
        var s = Be;
        Be |= 4;
        try {
          K_(e, t.alternate, t);
        } finally {
          ((Be = s), (J.p = n), (L.T = a));
        }
      }
      ut = 3;
    }
  }
  function xf() {
    if (ut === 4 || ut === 3) {
      ((ut = 0), is());
      var e = ca,
        t = En,
        a = zl,
        n = of;
      (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0
        ? (ut = 5)
        : ((ut = 0), (En = ca = null), Sf(e, e.pendingLanes));
      var s = e.pendingLanes;
      if (
        (s === 0 && (ua = null),
        to(a),
        (t = t.stateNode),
        Lt && typeof Lt.onCommitFiberRoot == 'function')
      )
        try {
          Lt.onCommitFiberRoot(xl, t, void 0, (t.current.flags & 128) === 128);
        } catch {}
      if (n !== null) {
        ((t = L.T), (s = J.p), (J.p = 2), (L.T = null));
        try {
          for (var u = e.onRecoverableError, _ = 0; _ < n.length; _++) {
            var k = n[_];
            u(k.value, { componentStack: k.stack });
          }
        } finally {
          ((L.T = t), (J.p = s));
        }
      }
      ((zl & 3) !== 0 && nr(),
        gl(e),
        (s = e.pendingLanes),
        (a & 261930) !== 0 && (s & 42) !== 0 ? (e === Mu ? Ai++ : ((Ai = 0), (Mu = e))) : (Ai = 0),
        Li(0));
    }
  }
  function Sf(e, t) {
    (e.pooledCacheLanes &= t) === 0 &&
      ((t = e.pooledCache), t != null && ((e.pooledCache = null), di(t)));
  }
  function nr() {
    return (yf(), bf(), xf(), wf());
  }
  function wf() {
    if (ut !== 5) return !1;
    var e = ca,
      t = Ou;
    Ou = 0;
    var a = to(zl),
      n = L.T,
      s = J.p;
    try {
      ((J.p = 32 > a ? 32 : a), (L.T = null), (a = Iu), (Iu = null));
      var u = ca,
        _ = zl;
      if (((ut = 0), (En = ca = null), (zl = 0), (Be & 6) !== 0)) throw Error(r(331));
      var k = Be;
      if (
        ((Be |= 4),
        nf(u.current),
        tf(u, u.current, _, a),
        (Be = k),
        Li(0, !1),
        Lt && typeof Lt.onPostCommitFiberRoot == 'function')
      )
        try {
          Lt.onPostCommitFiberRoot(xl, u);
        } catch {}
      return !0;
    } finally {
      ((J.p = s), (L.T = n), Sf(e, t));
    }
  }
  function Tf(e, t, a) {
    ((t = Xt(a, t)),
      (t = fu(e.stateNode, t, 2)),
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
            (typeof n.componentDidCatch == 'function' && (ua === null || !ua.has(n)))
          ) {
            ((e = Xt(a, e)),
              (a = T_(2)),
              (n = aa(t, a, 2)),
              n !== null && (E_(a, n, t, e), Pn(n, 2), gl(n)));
            break;
          }
        }
        t = t.return;
      }
  }
  function zu(e, t, a) {
    var n = e.pingCache;
    if (n === null) {
      n = e.pingCache = new Zk();
      var s = new Set();
      n.set(t, s);
    } else ((s = n.get(t)), s === void 0 && ((s = new Set()), n.set(t, s)));
    s.has(a) || ((Lu = !0), s.add(a), (e = ev.bind(null, e, t, a)), t.then(e, e));
  }
  function ev(e, t, a) {
    var n = e.pingCache;
    (n !== null && n.delete(t),
      (e.pingedLanes |= e.suspendedLanes & a),
      (e.warmLanes &= ~a),
      Ye === e &&
        (Ce & a) === a &&
        (et === 4 || (et === 3 && (Ce & 62914560) === Ce && 300 > yt() - Fs)
          ? (Be & 2) === 0 && Cn(e, 0)
          : (qu |= a),
        Tn === Ce && (Tn = 0)),
      gl(e));
  }
  function Ef(e, t) {
    (t === 0 && (t = vd()), (e = Ca(e, t)), e !== null && (Pn(e, t), gl(e)));
  }
  function tv(e) {
    var t = e.memoizedState,
      a = 0;
    (t !== null && (a = t.retryLane), Ef(e, a));
  }
  function lv(e, t) {
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
    (n !== null && n.delete(t), Ef(e, a));
  }
  function av(e, t) {
    return Qa(e, t);
  }
  var ir = null,
    Nn = null,
    Hu = !1,
    sr = !1,
    Uu = !1,
    ma = 0;
  function gl(e) {
    (e !== Nn && e.next === null && (Nn === null ? (ir = Nn = e) : (Nn = Nn.next = e)),
      (sr = !0),
      Hu || ((Hu = !0), iv()));
  }
  function Li(e, t) {
    if (!Uu && sr) {
      Uu = !0;
      do
        for (var a = !1, n = ir; n !== null; ) {
          if (e !== 0) {
            var s = n.pendingLanes;
            if (s === 0) var u = 0;
            else {
              var _ = n.suspendedLanes,
                k = n.pingedLanes;
              ((u = (1 << (31 - qt(42 | e) + 1)) - 1),
                (u &= s & ~(_ & ~k)),
                (u = u & 201326741 ? (u & 201326741) | 1 : u ? u | 2 : 0));
            }
            u !== 0 && ((a = !0), Af(n, u));
          } else
            ((u = Ce),
              (u = cs(
                n,
                n === Ye ? u : 0,
                n.cancelPendingCommit !== null || n.timeoutHandle !== -1
              )),
              (u & 3) === 0 || Jn(n, u) || ((a = !0), Af(n, u)));
          n = n.next;
        }
      while (a);
      Uu = !1;
    }
  }
  function nv() {
    Cf();
  }
  function Cf() {
    sr = Hu = !1;
    var e = 0;
    ma !== 0 && pv() && (e = ma);
    for (var t = yt(), a = null, n = ir; n !== null; ) {
      var s = n.next,
        u = jf(n, t);
      (u === 0
        ? ((n.next = null), a === null ? (ir = s) : (a.next = s), s === null && (Nn = a))
        : ((a = n), (e !== 0 || (u & 3) !== 0) && (sr = !0)),
        (n = s));
    }
    ((ut !== 0 && ut !== 5) || Li(e), ma !== 0 && (ma = 0));
  }
  function jf(e, t) {
    for (
      var a = e.suspendedLanes,
        n = e.pingedLanes,
        s = e.expirationTimes,
        u = e.pendingLanes & -62914561;
      0 < u;
    ) {
      var _ = 31 - qt(u),
        k = 1 << _,
        T = s[_];
      (T === -1
        ? ((k & a) === 0 || (k & n) !== 0) && (s[_] = Lg(k, t))
        : T <= t && (e.expiredLanes |= k),
        (u &= ~k));
    }
    if (
      ((t = Ye),
      (a = Ce),
      (a = cs(e, e === t ? a : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== -1)),
      (n = e.callbackNode),
      a === 0 || (e === t && (De === 2 || De === 9)) || e.cancelPendingCommit !== null)
    )
      return (n !== null && n !== null && Zn(n), (e.callbackNode = null), (e.callbackPriority = 0));
    if ((a & 3) === 0 || Jn(e, a)) {
      if (((t = a & -a), t === e.callbackPriority)) return t;
      switch ((n !== null && Zn(n), to(a))) {
        case 2:
        case 8:
          a = ie;
          break;
        case 32:
          a = _e;
          break;
        case 268435456:
          a = Ql;
          break;
        default:
          a = _e;
      }
      return (
        (n = Nf.bind(null, e)),
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
  function Nf(e, t) {
    if (ut !== 0 && ut !== 5) return ((e.callbackNode = null), (e.callbackPriority = 0), null);
    var a = e.callbackNode;
    if (nr() && e.callbackNode !== a) return null;
    var n = Ce;
    return (
      (n = cs(e, e === Ye ? n : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== -1)),
      n === 0
        ? null
        : (cf(e, n, t),
          jf(e, yt()),
          e.callbackNode != null && e.callbackNode === a ? Nf.bind(null, e) : null)
    );
  }
  function Af(e, t) {
    if (nr()) return null;
    cf(e, t, !0);
  }
  function iv() {
    gv(function () {
      (Be & 6) !== 0 ? Qa(W, nv) : Cf();
    });
  }
  function Gu() {
    if (ma === 0) {
      var e = fn;
      (e === 0 && ((e = rs), (rs <<= 1), (rs & 261888) === 0 && (rs = 256)), (ma = e));
    }
    return ma;
  }
  function Lf(e) {
    return e == null || typeof e == 'symbol' || typeof e == 'boolean'
      ? null
      : typeof e == 'function'
        ? e
        : fs('' + e);
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
  function sv(e, t, a, n, s) {
    if (t === 'submit' && a && a.stateNode === s) {
      var u = Lf((s[wt] || null).action),
        _ = n.submitter;
      _ &&
        ((t = (t = _[wt] || null) ? Lf(t.formAction) : _.getAttribute('formAction')),
        t !== null && ((u = t), (_ = null)));
      var k = new ks('action', 'action', null, n, s);
      e.push({
        event: k,
        listeners: [
          {
            instance: null,
            listener: function () {
              if (n.defaultPrevented) {
                if (ma !== 0) {
                  var T = _ ? qf(s, _) : new FormData(s);
                  ou(a, { pending: !0, data: T, method: s.method, action: u }, null, T);
                }
              } else
                typeof u == 'function' &&
                  (k.preventDefault(),
                  (T = _ ? qf(s, _) : new FormData(s)),
                  ou(a, { pending: !0, data: T, method: s.method, action: u }, u, T));
            },
            currentTarget: s,
          },
        ],
      });
    }
  }
  for (var $u = 0; $u < To.length; $u++) {
    var Yu = To[$u],
      rv = Yu.toLowerCase(),
      ov = Yu[0].toUpperCase() + Yu.slice(1);
    ll(rv, 'on' + ov);
  }
  (ll(om, 'onAnimationEnd'),
    ll(um, 'onAnimationIteration'),
    ll(cm, 'onAnimationStart'),
    ll('dblclick', 'onDoubleClick'),
    ll('focusin', 'onFocus'),
    ll('focusout', 'onBlur'),
    ll(wk, 'onTransitionRun'),
    ll(Tk, 'onTransitionStart'),
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
    uv = new Set(
      'beforetoggle cancel close invalid load scroll scrollend toggle'.split(' ').concat(qi)
    );
  function Bf(e, t) {
    t = (t & 4) !== 0;
    for (var a = 0; a < e.length; a++) {
      var n = e[a],
        s = n.event;
      n = n.listeners;
      e: {
        var u = void 0;
        if (t)
          for (var _ = n.length - 1; 0 <= _; _--) {
            var k = n[_],
              T = k.instance,
              R = k.currentTarget;
            if (((k = k.listener), T !== u && s.isPropagationStopped())) break e;
            ((u = k), (s.currentTarget = R));
            try {
              u(s);
            } catch ($) {
              bs($);
            }
            ((s.currentTarget = null), (u = T));
          }
        else
          for (_ = 0; _ < n.length; _++) {
            if (
              ((k = n[_]),
              (T = k.instance),
              (R = k.currentTarget),
              (k = k.listener),
              T !== u && s.isPropagationStopped())
            )
              break e;
            ((u = k), (s.currentTarget = R));
            try {
              u(s);
            } catch ($) {
              bs($);
            }
            ((s.currentTarget = null), (u = T));
          }
      }
    }
  }
  function Ee(e, t) {
    var a = t[lo];
    a === void 0 && (a = t[lo] = new Set());
    var n = e + '__bubble';
    a.has(n) || (Of(t, e, 2, !1), a.add(n));
  }
  function Xu(e, t, a) {
    var n = 0;
    (t && (n |= 4), Of(a, e, n, t));
  }
  var rr = '_reactListening' + Math.random().toString(36).slice(2);
  function Vu(e) {
    if (!e[rr]) {
      ((e[rr] = !0),
        Ed.forEach(function (a) {
          a !== 'selectionchange' && (uv.has(a) || Xu(a, !1, e), Xu(a, !0, e));
        }));
      var t = e.nodeType === 9 ? e : e.ownerDocument;
      t === null || t[rr] || ((t[rr] = !0), Xu('selectionchange', !1, t));
    }
  }
  function Of(e, t, a, n) {
    switch (up(t)) {
      case 2:
        var s = Dv;
        break;
      case 8:
        s = Rv;
        break;
      default:
        s = rc;
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
  function Qu(e, t, a, n, s) {
    var u = n;
    if ((t & 1) === 0 && (t & 2) === 0 && n !== null)
      e: for (;;) {
        if (n === null) return;
        var _ = n.tag;
        if (_ === 3 || _ === 4) {
          var k = n.stateNode.containerInfo;
          if (k === s) break;
          if (_ === 4)
            for (_ = n.return; _ !== null; ) {
              var T = _.tag;
              if ((T === 3 || T === 4) && _.stateNode.containerInfo === s) return;
              _ = _.return;
            }
          for (; k !== null; ) {
            if (((_ = Ja(k)), _ === null)) return;
            if (((T = _.tag), T === 5 || T === 6 || T === 26 || T === 27)) {
              n = u = _;
              continue e;
            }
            k = k.parentNode;
          }
        }
        n = n.return;
      }
    Rd(function () {
      var R = u,
        $ = uo(a),
        V = [];
      e: {
        var z = mm.get(e);
        if (z !== void 0) {
          var U = ks,
            se = e;
          switch (e) {
            case 'keypress':
              if (hs(a) === 0) break e;
            case 'keydown':
            case 'keyup':
              U = lk;
              break;
            case 'focusin':
              ((se = 'focus'), (U = ho));
              break;
            case 'focusout':
              ((se = 'blur'), (U = ho));
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
              U = Yg;
              break;
            case 'touchcancel':
            case 'touchend':
            case 'touchmove':
            case 'touchstart':
              U = ik;
              break;
            case om:
            case um:
            case cm:
              U = Qg;
              break;
            case dm:
              U = rk;
              break;
            case 'scroll':
            case 'scrollend':
              U = Gg;
              break;
            case 'wheel':
              U = uk;
              break;
            case 'copy':
            case 'cut':
            case 'paste':
              U = Zg;
              break;
            case 'gotpointercapture':
            case 'lostpointercapture':
            case 'pointercancel':
            case 'pointerdown':
            case 'pointermove':
            case 'pointerout':
            case 'pointerover':
            case 'pointerup':
              U = $d;
              break;
            case 'toggle':
            case 'beforetoggle':
              U = dk;
          }
          var pe = (t & 4) !== 0,
            Ue = !pe && (e === 'scroll' || e === 'scrollend'),
            O = pe ? (z !== null ? z + 'Capture' : null) : z;
          pe = [];
          for (var N = R, D; N !== null; ) {
            var X = N;
            if (
              ((D = X.stateNode),
              (X = X.tag),
              (X !== 5 && X !== 26 && X !== 27) ||
                D === null ||
                O === null ||
                ((X = ei(N, O)), X != null && pe.push(Bi(N, X, D))),
              Ue)
            )
              break;
            N = N.return;
          }
          0 < pe.length && ((z = new U(z, se, null, a, $)), V.push({ event: z, listeners: pe }));
        }
      }
      if ((t & 7) === 0) {
        e: {
          if (
            ((z = e === 'mouseover' || e === 'pointerover'),
            (U = e === 'mouseout' || e === 'pointerout'),
            z && a !== oo && (se = a.relatedTarget || a.fromElement) && (Ja(se) || se[Za]))
          )
            break e;
          if (
            (U || z) &&
            ((z =
              $.window === $
                ? $
                : (z = $.ownerDocument)
                  ? z.defaultView || z.parentWindow
                  : window),
            U
              ? ((se = a.relatedTarget || a.toElement),
                (U = R),
                (se = se ? Ja(se) : null),
                se !== null &&
                  ((Ue = d(se)), (pe = se.tag), se !== Ue || (pe !== 5 && pe !== 27 && pe !== 6)) &&
                  (se = null))
              : ((U = null), (se = R)),
            U !== se)
          ) {
            if (
              ((pe = Ud),
              (X = 'onMouseLeave'),
              (O = 'onMouseEnter'),
              (N = 'mouse'),
              (e === 'pointerout' || e === 'pointerover') &&
                ((pe = $d), (X = 'onPointerLeave'), (O = 'onPointerEnter'), (N = 'pointer')),
              (Ue = U == null ? z : Wn(U)),
              (D = se == null ? z : Wn(se)),
              (z = new pe(X, N + 'leave', U, a, $)),
              (z.target = Ue),
              (z.relatedTarget = D),
              (X = null),
              Ja($) === R &&
                ((pe = new pe(O, N + 'enter', se, a, $)),
                (pe.target = D),
                (pe.relatedTarget = Ue),
                (X = pe)),
              (Ue = X),
              U && se)
            )
              t: {
                for (pe = cv, O = U, N = se, D = 0, X = O; X; X = pe(X)) D++;
                X = 0;
                for (var me = N; me; me = pe(me)) X++;
                for (; 0 < D - X; ) ((O = pe(O)), D--);
                for (; 0 < X - D; ) ((N = pe(N)), X--);
                for (; D--; ) {
                  if (O === N || (N !== null && O === N.alternate)) {
                    pe = O;
                    break t;
                  }
                  ((O = pe(O)), (N = pe(N)));
                }
                pe = null;
              }
            else pe = null;
            (U !== null && If(V, z, U, pe, !1),
              se !== null && Ue !== null && If(V, Ue, se, pe, !0));
          }
        }
        e: {
          if (
            ((z = R ? Wn(R) : window),
            (U = z.nodeName && z.nodeName.toLowerCase()),
            U === 'select' || (U === 'input' && z.type === 'file'))
          )
            var Le = Pd;
          else if (Zd(z))
            if (Fd) Le = bk;
            else {
              Le = vk;
              var oe = kk;
            }
          else
            ((U = z.nodeName),
              !U || U.toLowerCase() !== 'input' || (z.type !== 'checkbox' && z.type !== 'radio')
                ? R && ro(R.elementType) && (Le = Pd)
                : (Le = yk));
          if (Le && (Le = Le(e, R))) {
            Jd(V, Le, a, $);
            break e;
          }
          (oe && oe(e, z, R),
            e === 'focusout' &&
              R &&
              z.type === 'number' &&
              R.memoizedProps.value != null &&
              so(z, 'number', z.value));
        }
        switch (((oe = R ? Wn(R) : window), e)) {
          case 'focusin':
            (Zd(oe) || oe.contentEditable === 'true') && ((sn = oe), (xo = R), (oi = null));
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
            ((So = !1), sm(V, a, $));
            break;
          case 'selectionchange':
            if (Sk) break;
          case 'keydown':
          case 'keyup':
            sm(V, a, $);
        }
        var xe;
        if (ko)
          e: {
            switch (e) {
              case 'compositionstart':
                var je = 'onCompositionStart';
                break e;
              case 'compositionend':
                je = 'onCompositionEnd';
                break e;
              case 'compositionupdate':
                je = 'onCompositionUpdate';
                break e;
            }
            je = void 0;
          }
        else
          nn
            ? Qd(e, a) && (je = 'onCompositionEnd')
            : e === 'keydown' && a.keyCode === 229 && (je = 'onCompositionStart');
        (je &&
          (Yd &&
            a.locale !== 'ko' &&
            (nn || je !== 'onCompositionStart'
              ? je === 'onCompositionEnd' && nn && (xe = zd())
              : ((Jl = $), (_o = 'value' in Jl ? Jl.value : Jl.textContent), (nn = !0))),
          (oe = or(R, je)),
          0 < oe.length &&
            ((je = new Gd(je, e, null, a, $)),
            V.push({ event: je, listeners: oe }),
            xe ? (je.data = xe) : ((xe = Kd(a)), xe !== null && (je.data = xe)))),
          (xe = _k ? fk(e, a) : pk(e, a)) &&
            ((je = or(R, 'onBeforeInput')),
            0 < je.length &&
              ((oe = new Gd('onBeforeInput', 'beforeinput', null, a, $)),
              V.push({ event: oe, listeners: je }),
              (oe.data = xe))),
          sv(V, e, R, a, $));
      }
      Bf(V, t);
    });
  }
  function Bi(e, t, a) {
    return { instance: e, listener: t, currentTarget: a };
  }
  function or(e, t) {
    for (var a = t + 'Capture', n = []; e !== null; ) {
      var s = e,
        u = s.stateNode;
      if (
        ((s = s.tag),
        (s !== 5 && s !== 26 && s !== 27) ||
          u === null ||
          ((s = ei(e, a)),
          s != null && n.unshift(Bi(e, s, u)),
          (s = ei(e, t)),
          s != null && n.push(Bi(e, s, u))),
        e.tag === 3)
      )
        return n;
      e = e.return;
    }
    return [];
  }
  function cv(e) {
    if (e === null) return null;
    do e = e.return;
    while (e && e.tag !== 5 && e.tag !== 27);
    return e || null;
  }
  function If(e, t, a, n, s) {
    for (var u = t._reactName, _ = []; a !== null && a !== n; ) {
      var k = a,
        T = k.alternate,
        R = k.stateNode;
      if (((k = k.tag), T !== null && T === n)) break;
      ((k !== 5 && k !== 26 && k !== 27) ||
        R === null ||
        ((T = R),
        s
          ? ((R = ei(a, u)), R != null && _.unshift(Bi(a, R, T)))
          : s || ((R = ei(a, u)), R != null && _.push(Bi(a, R, T)))),
        (a = a.return));
    }
    _.length !== 0 && e.push({ event: t, listeners: _ });
  }
  var dv = /\r\n?/g,
    mv = /\u0000|\uFFFD/g;
  function Mf(e) {
    return (typeof e == 'string' ? e : '' + e)
      .replace(
        dv,
        `
`
      )
      .replace(mv, '');
  }
  function Df(e, t) {
    return ((t = Mf(t)), Mf(e) === t);
  }
  function He(e, t, a, n, s, u) {
    switch (a) {
      case 'children':
        typeof n == 'string'
          ? t === 'body' || (t === 'textarea' && n === '') || tn(e, n)
          : (typeof n == 'number' || typeof n == 'bigint') && t !== 'body' && tn(e, '' + n);
        break;
      case 'className':
        ms(e, 'class', n);
        break;
      case 'tabIndex':
        ms(e, 'tabindex', n);
        break;
      case 'dir':
      case 'role':
      case 'viewBox':
      case 'width':
      case 'height':
        ms(e, a, n);
        break;
      case 'style':
        Md(e, n, u);
        break;
      case 'data':
        if (t !== 'object') {
          ms(e, 'data', n);
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
        ((n = fs('' + n)), e.setAttribute(a, n));
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
        ((n = fs('' + n)), e.setAttribute(a, n));
        break;
      case 'onClick':
        n != null && (e.onclick = wl);
        break;
      case 'onScroll':
        n != null && Ee('scroll', e);
        break;
      case 'onScrollEnd':
        n != null && Ee('scrollend', e);
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
        ((a = fs('' + n)), e.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', a));
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
        (Ee('beforetoggle', e), Ee('toggle', e), ds(e, 'popover', n));
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
        ds(e, 'is', n);
        break;
      case 'innerText':
      case 'textContent':
        break;
      default:
        (!(2 < a.length) || (a[0] !== 'o' && a[0] !== 'O') || (a[1] !== 'n' && a[1] !== 'N')) &&
          ((a = Hg.get(a) || a), ds(e, a, n));
    }
  }
  function Ku(e, t, a, n, s, u) {
    switch (a) {
      case 'style':
        Md(e, n, u);
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
        n != null && Ee('scroll', e);
        break;
      case 'onScrollEnd':
        n != null && Ee('scrollend', e);
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
        if (!Cd.hasOwnProperty(a))
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
            a in e ? (e[a] = n) : n === !0 ? e.setAttribute(a, '') : ds(e, a, n);
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
        (Ee('error', e), Ee('load', e));
        var n = !1,
          s = !1,
          u;
        for (u in a)
          if (a.hasOwnProperty(u)) {
            var _ = a[u];
            if (_ != null)
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
                  He(e, t, u, _, a, null);
              }
          }
        (s && He(e, t, 'srcSet', a.srcSet, a, null), n && He(e, t, 'src', a.src, a, null));
        return;
      case 'input':
        Ee('invalid', e);
        var k = (u = _ = s = null),
          T = null,
          R = null;
        for (n in a)
          if (a.hasOwnProperty(n)) {
            var $ = a[n];
            if ($ != null)
              switch (n) {
                case 'name':
                  s = $;
                  break;
                case 'type':
                  _ = $;
                  break;
                case 'checked':
                  T = $;
                  break;
                case 'defaultChecked':
                  R = $;
                  break;
                case 'value':
                  u = $;
                  break;
                case 'defaultValue':
                  k = $;
                  break;
                case 'children':
                case 'dangerouslySetInnerHTML':
                  if ($ != null) throw Error(r(137, t));
                  break;
                default:
                  He(e, t, n, $, a, null);
              }
          }
        qd(e, u, k, T, R, _, s, !1);
        return;
      case 'select':
        (Ee('invalid', e), (n = _ = u = null));
        for (s in a)
          if (a.hasOwnProperty(s) && ((k = a[s]), k != null))
            switch (s) {
              case 'value':
                u = k;
                break;
              case 'defaultValue':
                _ = k;
                break;
              case 'multiple':
                n = k;
              default:
                He(e, t, s, k, a, null);
            }
        ((t = u),
          (a = _),
          (e.multiple = !!n),
          t != null ? en(e, !!n, t, !1) : a != null && en(e, !!n, a, !0));
        return;
      case 'textarea':
        (Ee('invalid', e), (u = s = n = null));
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
                u = k;
                break;
              case 'dangerouslySetInnerHTML':
                if (k != null) throw Error(r(91));
                break;
              default:
                He(e, t, _, k, a, null);
            }
        Od(e, n, s, u);
        return;
      case 'option':
        for (T in a)
          if (a.hasOwnProperty(T) && ((n = a[T]), n != null))
            switch (T) {
              case 'selected':
                e.selected = n && typeof n != 'function' && typeof n != 'symbol';
                break;
              default:
                He(e, t, T, n, a, null);
            }
        return;
      case 'dialog':
        (Ee('beforetoggle', e), Ee('toggle', e), Ee('cancel', e), Ee('close', e));
        break;
      case 'iframe':
      case 'object':
        Ee('load', e);
        break;
      case 'video':
      case 'audio':
        for (n = 0; n < qi.length; n++) Ee(qi[n], e);
        break;
      case 'image':
        (Ee('error', e), Ee('load', e));
        break;
      case 'details':
        Ee('toggle', e);
        break;
      case 'embed':
      case 'source':
      case 'link':
        (Ee('error', e), Ee('load', e));
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
        for (R in a)
          if (a.hasOwnProperty(R) && ((n = a[R]), n != null))
            switch (R) {
              case 'children':
              case 'dangerouslySetInnerHTML':
                throw Error(r(137, t));
              default:
                He(e, t, R, n, a, null);
            }
        return;
      default:
        if (ro(t)) {
          for ($ in a)
            a.hasOwnProperty($) && ((n = a[$]), n !== void 0 && Ku(e, t, $, n, a, void 0));
          return;
        }
    }
    for (k in a) a.hasOwnProperty(k) && ((n = a[k]), n != null && He(e, t, k, n, a, null));
  }
  function _v(e, t, a, n) {
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
          _ = null,
          k = null,
          T = null,
          R = null,
          $ = null;
        for (U in a) {
          var V = a[U];
          if (a.hasOwnProperty(U) && V != null)
            switch (U) {
              case 'checked':
                break;
              case 'value':
                break;
              case 'defaultValue':
                T = V;
              default:
                n.hasOwnProperty(U) || He(e, t, U, null, n, V);
            }
        }
        for (var z in n) {
          var U = n[z];
          if (((V = a[z]), n.hasOwnProperty(z) && (U != null || V != null)))
            switch (z) {
              case 'type':
                u = U;
                break;
              case 'name':
                s = U;
                break;
              case 'checked':
                R = U;
                break;
              case 'defaultChecked':
                $ = U;
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
                U !== V && He(e, t, z, U, n, V);
            }
        }
        io(e, _, k, T, R, $, u, s);
        return;
      case 'select':
        U = _ = k = z = null;
        for (u in a)
          if (((T = a[u]), a.hasOwnProperty(u) && T != null))
            switch (u) {
              case 'value':
                break;
              case 'multiple':
                U = T;
              default:
                n.hasOwnProperty(u) || He(e, t, u, null, n, T);
            }
        for (s in n)
          if (((u = n[s]), (T = a[s]), n.hasOwnProperty(s) && (u != null || T != null)))
            switch (s) {
              case 'value':
                z = u;
                break;
              case 'defaultValue':
                k = u;
                break;
              case 'multiple':
                _ = u;
              default:
                u !== T && He(e, t, s, u, n, T);
            }
        ((t = k),
          (a = _),
          (n = U),
          z != null
            ? en(e, !!a, z, !1)
            : !!n != !!a && (t != null ? en(e, !!a, t, !0) : en(e, !!a, a ? [] : '', !1)));
        return;
      case 'textarea':
        U = z = null;
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
          if (((s = n[_]), (u = a[_]), n.hasOwnProperty(_) && (s != null || u != null)))
            switch (_) {
              case 'value':
                z = s;
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
                s !== u && He(e, t, _, s, n, u);
            }
        Bd(e, z, U);
        return;
      case 'option':
        for (var se in a)
          if (((z = a[se]), a.hasOwnProperty(se) && z != null && !n.hasOwnProperty(se)))
            switch (se) {
              case 'selected':
                e.selected = !1;
                break;
              default:
                He(e, t, se, null, n, z);
            }
        for (T in n)
          if (((z = n[T]), (U = a[T]), n.hasOwnProperty(T) && z !== U && (z != null || U != null)))
            switch (T) {
              case 'selected':
                e.selected = z && typeof z != 'function' && typeof z != 'symbol';
                break;
              default:
                He(e, t, T, z, n, U);
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
        for (var pe in a)
          ((z = a[pe]),
            a.hasOwnProperty(pe) && z != null && !n.hasOwnProperty(pe) && He(e, t, pe, null, n, z));
        for (R in n)
          if (((z = n[R]), (U = a[R]), n.hasOwnProperty(R) && z !== U && (z != null || U != null)))
            switch (R) {
              case 'children':
              case 'dangerouslySetInnerHTML':
                if (z != null) throw Error(r(137, t));
                break;
              default:
                He(e, t, R, z, n, U);
            }
        return;
      default:
        if (ro(t)) {
          for (var Ue in a)
            ((z = a[Ue]),
              a.hasOwnProperty(Ue) &&
                z !== void 0 &&
                !n.hasOwnProperty(Ue) &&
                Ku(e, t, Ue, void 0, n, z));
          for ($ in n)
            ((z = n[$]),
              (U = a[$]),
              !n.hasOwnProperty($) ||
                z === U ||
                (z === void 0 && U === void 0) ||
                Ku(e, t, $, z, n, U));
          return;
        }
    }
    for (var O in a)
      ((z = a[O]),
        a.hasOwnProperty(O) && z != null && !n.hasOwnProperty(O) && He(e, t, O, null, n, z));
    for (V in n)
      ((z = n[V]),
        (U = a[V]),
        !n.hasOwnProperty(V) || z === U || (z == null && U == null) || He(e, t, V, z, n, U));
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
  function fv() {
    if (typeof performance.getEntriesByType == 'function') {
      for (
        var e = 0, t = 0, a = performance.getEntriesByType('resource'), n = 0;
        n < a.length;
        n++
      ) {
        var s = a[n],
          u = s.transferSize,
          _ = s.initiatorType,
          k = s.duration;
        if (u && k && Rf(_)) {
          for (_ = 0, k = s.responseEnd, n += 1; n < a.length; n++) {
            var T = a[n],
              R = T.startTime;
            if (R > k) break;
            var $ = T.transferSize,
              V = T.initiatorType;
            $ && Rf(V) && ((T = T.responseEnd), (_ += $ * (T < k ? 1 : (k - R) / (T - R))));
          }
          if ((--n, (t += (8 * (u + _)) / (s.duration / 1e3)), e++, 10 < e)) break;
        }
      }
      if (0 < e) return t / e / 1e6;
    }
    return navigator.connection && ((e = navigator.connection.downlink), typeof e == 'number')
      ? e
      : 5;
  }
  var Zu = null,
    Ju = null;
  function ur(e) {
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
  function Pu(e, t) {
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
  var Fu = null;
  function pv() {
    var e = window.event;
    return e && e.type === 'popstate' ? (e === Fu ? !1 : ((Fu = e), !0)) : ((Fu = null), !1);
  }
  var Uf = typeof setTimeout == 'function' ? setTimeout : void 0,
    hv = typeof clearTimeout == 'function' ? clearTimeout : void 0,
    Gf = typeof Promise == 'function' ? Promise : void 0,
    gv =
      typeof queueMicrotask == 'function'
        ? queueMicrotask
        : typeof Gf < 'u'
          ? function (e) {
              return Gf.resolve(null).then(e).catch(kv);
            }
          : Uf;
  function kv(e) {
    setTimeout(function () {
      throw e;
    });
  }
  function _a(e) {
    return e === 'head';
  }
  function $f(e, t) {
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
          for (var u = a.firstChild; u; ) {
            var _ = u.nextSibling,
              k = u.nodeName;
            (u[Fn] ||
              k === 'SCRIPT' ||
              k === 'STYLE' ||
              (k === 'LINK' && u.rel.toLowerCase() === 'stylesheet') ||
              a.removeChild(u),
              (u = _));
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
  function Wu(e) {
    var t = e.firstChild;
    for (t && t.nodeType === 10 && (t = t.nextSibling); t; ) {
      var a = t;
      switch (((t = t.nextSibling), a.nodeName)) {
        case 'HTML':
        case 'HEAD':
        case 'BODY':
          (Wu(a), ao(a));
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
  function vv(e, t, a, n) {
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
  function yv(e, t, a) {
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
  function ec(e) {
    return e.data === '$?' || e.data === '$~';
  }
  function tc(e) {
    return e.data === '$!' || (e.data === '$?' && e.ownerDocument.readyState !== 'loading');
  }
  function bv(e, t) {
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
  var lc = null;
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
    switch (((t = ur(a)), e)) {
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
  function cr(e) {
    return typeof e.getRootNode == 'function'
      ? e.getRootNode()
      : e.nodeType === 9
        ? e
        : e.ownerDocument;
  }
  var Hl = J.d;
  J.d = { f: xv, r: Sv, D: wv, C: Tv, L: Ev, m: Cv, X: Nv, S: jv, M: Av };
  function xv() {
    var e = Hl.f(),
      t = tr();
    return e || t;
  }
  function Sv(e) {
    var t = Pa(e);
    t !== null && t.tag === 5 && t.type === 'form' ? d_(t) : Hl.r(e);
  }
  var An = typeof document > 'u' ? null : document;
  function Jf(e, t, a) {
    var n = An;
    if (n && typeof t == 'string' && t) {
      var s = $t(t);
      ((s = 'link[rel="' + e + '"][href="' + s + '"]'),
        typeof a == 'string' && (s += '[crossorigin="' + a + '"]'),
        Zf.has(s) ||
          (Zf.add(s),
          (e = { rel: e, crossOrigin: a, href: t }),
          n.querySelector(s) === null &&
            ((t = n.createElement('link')), kt(t, 'link', e), ct(t), n.head.appendChild(t))));
    }
  }
  function wv(e) {
    (Hl.D(e), Jf('dns-prefetch', e, null));
  }
  function Tv(e, t) {
    (Hl.C(e, t), Jf('preconnect', e, t));
  }
  function Ev(e, t, a) {
    Hl.L(e, t, a);
    var n = An;
    if (n && e && t) {
      var s = 'link[rel="preload"][as="' + $t(t) + '"]';
      t === 'image' && a && a.imageSrcSet
        ? ((s += '[imagesrcset="' + $t(a.imageSrcSet) + '"]'),
          typeof a.imageSizes == 'string' && (s += '[imagesizes="' + $t(a.imageSizes) + '"]'))
        : (s += '[href="' + $t(e) + '"]');
      var u = s;
      switch (t) {
        case 'style':
          u = Ln(e);
          break;
        case 'script':
          u = qn(e);
      }
      Pt.has(u) ||
        ((e = v(
          { rel: 'preload', href: t === 'image' && a && a.imageSrcSet ? void 0 : e, as: t },
          a
        )),
        Pt.set(u, e),
        n.querySelector(s) !== null ||
          (t === 'style' && n.querySelector(Ii(u))) ||
          (t === 'script' && n.querySelector(Mi(u))) ||
          ((t = n.createElement('link')), kt(t, 'link', e), ct(t), n.head.appendChild(t)));
    }
  }
  function Cv(e, t) {
    Hl.m(e, t);
    var a = An;
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
          u = qn(e);
      }
      if (
        !Pt.has(u) &&
        ((e = v({ rel: 'modulepreload', href: e }, t)), Pt.set(u, e), a.querySelector(s) === null)
      ) {
        switch (n) {
          case 'audioworklet':
          case 'paintworklet':
          case 'serviceworker':
          case 'sharedworker':
          case 'worker':
          case 'script':
            if (a.querySelector(Mi(u))) return;
        }
        ((n = a.createElement('link')), kt(n, 'link', e), ct(n), a.head.appendChild(n));
      }
    }
  }
  function jv(e, t, a) {
    Hl.S(e, t, a);
    var n = An;
    if (n && e) {
      var s = Fa(n).hoistableStyles,
        u = Ln(e);
      t = t || 'default';
      var _ = s.get(u);
      if (!_) {
        var k = { loading: 0, preload: null };
        if ((_ = n.querySelector(Ii(u)))) k.loading = 5;
        else {
          ((e = v({ rel: 'stylesheet', href: e, 'data-precedence': t }, a)),
            (a = Pt.get(u)) && ac(e, a));
          var T = (_ = n.createElement('link'));
          (ct(T),
            kt(T, 'link', e),
            (T._p = new Promise(function (R, $) {
              ((T.onload = R), (T.onerror = $));
            })),
            T.addEventListener('load', function () {
              k.loading |= 1;
            }),
            T.addEventListener('error', function () {
              k.loading |= 2;
            }),
            (k.loading |= 4),
            dr(_, t, n));
        }
        ((_ = { type: 'stylesheet', instance: _, count: 1, state: k }), s.set(u, _));
      }
    }
  }
  function Nv(e, t) {
    Hl.X(e, t);
    var a = An;
    if (a && e) {
      var n = Fa(a).hoistableScripts,
        s = qn(e),
        u = n.get(s);
      u ||
        ((u = a.querySelector(Mi(s))),
        u ||
          ((e = v({ src: e, async: !0 }, t)),
          (t = Pt.get(s)) && nc(e, t),
          (u = a.createElement('script')),
          ct(u),
          kt(u, 'link', e),
          a.head.appendChild(u)),
        (u = { type: 'script', instance: u, count: 1, state: null }),
        n.set(s, u));
    }
  }
  function Av(e, t) {
    Hl.M(e, t);
    var a = An;
    if (a && e) {
      var n = Fa(a).hoistableScripts,
        s = qn(e),
        u = n.get(s);
      u ||
        ((u = a.querySelector(Mi(s))),
        u ||
          ((e = v({ src: e, async: !0, type: 'module' }, t)),
          (t = Pt.get(s)) && nc(e, t),
          (u = a.createElement('script')),
          ct(u),
          kt(u, 'link', e),
          a.head.appendChild(u)),
        (u = { type: 'script', instance: u, count: 1, state: null }),
        n.set(s, u));
    }
  }
  function Pf(e, t, a, n) {
    var s = (s = fe.current) ? cr(s) : null;
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
          var u = Fa(s).hoistableStyles,
            _ = u.get(e);
          if (
            (_ ||
              ((s = s.ownerDocument || s),
              (_ = {
                type: 'stylesheet',
                instance: null,
                count: 0,
                state: { loading: 0, preload: null },
              }),
              u.set(e, _),
              (u = s.querySelector(Ii(e))) && !u._p && ((_.instance = u), (_.state.loading = 5)),
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
                u || Lv(s, e, a, _.state))),
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
    return 'href="' + $t(e) + '"';
  }
  function Ii(e) {
    return 'link[rel="stylesheet"][' + e + ']';
  }
  function Ff(e) {
    return v({}, e, { 'data-precedence': e.precedence, precedence: null });
  }
  function Lv(e, t, a, n) {
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
  function qn(e) {
    return '[src="' + $t(e) + '"]';
  }
  function Mi(e) {
    return 'script[async]' + e;
  }
  function Wf(e, t, a) {
    if ((t.count++, t.instance === null))
      switch (t.type) {
        case 'style':
          var n = e.querySelector('style[data-href~="' + $t(a.href) + '"]');
          if (n) return ((t.instance = n), ct(n), n);
          var s = v({}, a, {
            'data-href': a.href,
            'data-precedence': a.precedence,
            href: null,
            precedence: null,
          });
          return (
            (n = (e.ownerDocument || e).createElement('style')),
            ct(n),
            kt(n, 'style', s),
            dr(n, a.precedence, e),
            (t.instance = n)
          );
        case 'stylesheet':
          s = Ln(a.href);
          var u = e.querySelector(Ii(s));
          if (u) return ((t.state.loading |= 4), (t.instance = u), ct(u), u);
          ((n = Ff(a)),
            (s = Pt.get(s)) && ac(n, s),
            (u = (e.ownerDocument || e).createElement('link')),
            ct(u));
          var _ = u;
          return (
            (_._p = new Promise(function (k, T) {
              ((_.onload = k), (_.onerror = T));
            })),
            kt(u, 'link', n),
            (t.state.loading |= 4),
            dr(u, a.precedence, e),
            (t.instance = u)
          );
        case 'script':
          return (
            (u = qn(a.src)),
            (s = e.querySelector(Mi(u)))
              ? ((t.instance = s), ct(s), s)
              : ((n = a),
                (s = Pt.get(u)) && ((n = v({}, a)), nc(n, s)),
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
        ((n = t.instance), (t.state.loading |= 4), dr(n, a.precedence, e));
    return t.instance;
  }
  function dr(e, t, a) {
    for (
      var n = a.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),
        s = n.length ? n[n.length - 1] : null,
        u = s,
        _ = 0;
      _ < n.length;
      _++
    ) {
      var k = n[_];
      if (k.dataset.precedence === t) u = k;
      else if (u !== s) break;
    }
    u
      ? u.parentNode.insertBefore(e, u.nextSibling)
      : ((t = a.nodeType === 9 ? a.head : a), t.insertBefore(e, t.firstChild));
  }
  function ac(e, t) {
    (e.crossOrigin == null && (e.crossOrigin = t.crossOrigin),
      e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy),
      e.title == null && (e.title = t.title));
  }
  function nc(e, t) {
    (e.crossOrigin == null && (e.crossOrigin = t.crossOrigin),
      e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy),
      e.integrity == null && (e.integrity = t.integrity));
  }
  var mr = null;
  function ep(e, t, a) {
    if (mr === null) {
      var n = new Map(),
        s = (mr = new Map());
      s.set(a, n);
    } else ((s = mr), (n = s.get(a)), n || ((n = new Map()), s.set(a, n)));
    if (n.has(e)) return n;
    for (n.set(e, null), a = a.getElementsByTagName(e), s = 0; s < a.length; s++) {
      var u = a[s];
      if (
        !(u[Fn] || u[ft] || (e === 'link' && u.getAttribute('rel') === 'stylesheet')) &&
        u.namespaceURI !== 'http://www.w3.org/2000/svg'
      ) {
        var _ = u.getAttribute(t) || '';
        _ = e + _;
        var k = n.get(_);
        k ? k.push(u) : n.set(_, [u]);
      }
    }
    return n;
  }
  function tp(e, t, a) {
    ((e = e.ownerDocument || e),
      e.head.insertBefore(a, t === 'title' ? e.querySelector('head > title') : null));
  }
  function qv(e, t, a) {
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
  function Bv(e, t, a, n) {
    if (
      a.type === 'stylesheet' &&
      (typeof n.media != 'string' || matchMedia(n.media).matches !== !1) &&
      (a.state.loading & 4) === 0
    ) {
      if (a.instance === null) {
        var s = Ln(n.href),
          u = t.querySelector(Ii(s));
        if (u) {
          ((t = u._p),
            t !== null &&
              typeof t == 'object' &&
              typeof t.then == 'function' &&
              (e.count++, (e = _r.bind(e)), t.then(e, e)),
            (a.state.loading |= 4),
            (a.instance = u),
            ct(u));
          return;
        }
        ((u = t.ownerDocument || t),
          (n = Ff(n)),
          (s = Pt.get(s)) && ac(n, s),
          (u = u.createElement('link')),
          ct(u));
        var _ = u;
        ((_._p = new Promise(function (k, T) {
          ((_.onload = k), (_.onerror = T));
        })),
          kt(u, 'link', n),
          (a.instance = u));
      }
      (e.stylesheets === null && (e.stylesheets = new Map()),
        e.stylesheets.set(a, t),
        (t = a.state.preload) &&
          (a.state.loading & 3) === 0 &&
          (e.count++,
          (a = _r.bind(e)),
          t.addEventListener('load', a),
          t.addEventListener('error', a)));
    }
  }
  var ic = 0;
  function Ov(e, t) {
    return (
      e.stylesheets && e.count === 0 && pr(e, e.stylesheets),
      0 < e.count || 0 < e.imgCount
        ? function (a) {
            var n = setTimeout(function () {
              if ((e.stylesheets && pr(e, e.stylesheets), e.unsuspend)) {
                var u = e.unsuspend;
                ((e.unsuspend = null), u());
              }
            }, 6e4 + t);
            0 < e.imgBytes && ic === 0 && (ic = 62500 * fv());
            var s = setTimeout(
              function () {
                if (
                  ((e.waitingForImages = !1),
                  e.count === 0 && (e.stylesheets && pr(e, e.stylesheets), e.unsuspend))
                ) {
                  var u = e.unsuspend;
                  ((e.unsuspend = null), u());
                }
              },
              (e.imgBytes > ic ? 50 : 800) + t
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
  function _r() {
    if ((this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages))) {
      if (this.stylesheets) pr(this, this.stylesheets);
      else if (this.unsuspend) {
        var e = this.unsuspend;
        ((this.unsuspend = null), e());
      }
    }
  }
  var fr = null;
  function pr(e, t) {
    ((e.stylesheets = null),
      e.unsuspend !== null &&
        (e.count++, (fr = new Map()), t.forEach(Iv, e), (fr = null), _r.call(e)));
  }
  function Iv(e, t) {
    if (!(t.state.loading & 4)) {
      var a = fr.get(e);
      if (a) var n = a.get(null);
      else {
        ((a = new Map()), fr.set(e, a));
        for (
          var s = e.querySelectorAll('link[data-precedence],style[data-precedence]'), u = 0;
          u < s.length;
          u++
        ) {
          var _ = s[u];
          (_.nodeName === 'LINK' || _.getAttribute('media') !== 'not all') &&
            (a.set(_.dataset.precedence, _), (n = _));
        }
        n && a.set(null, n);
      }
      ((s = t.instance),
        (_ = s.getAttribute('data-precedence')),
        (u = a.get(_) || n),
        u === n && a.set(null, s),
        a.set(_, s),
        this.count++,
        (n = _r.bind(this)),
        s.addEventListener('load', n),
        s.addEventListener('error', n),
        u
          ? u.parentNode.insertBefore(s, u.nextSibling)
          : ((e = e.nodeType === 9 ? e.head : e), e.insertBefore(s, e.firstChild)),
        (t.state.loading |= 4));
    }
  }
  var Di = {
    $$typeof: G,
    Provider: null,
    Consumer: null,
    _currentValue: ae,
    _currentValue2: ae,
    _threadCount: 0,
  };
  function Mv(e, t, a, n, s, u, _, k, T) {
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
      (this.onCaughtError = u),
      (this.onRecoverableError = _),
      (this.pooledCache = null),
      (this.pooledCacheLanes = 0),
      (this.formState = T),
      (this.incompleteTransitions = new Map()));
  }
  function ap(e, t, a, n, s, u, _, k, T, R, $, V) {
    return (
      (e = new Mv(e, t, a, _, T, R, $, V, k)),
      (t = 1),
      u === !0 && (t |= 24),
      (u = Ot(3, null, null, t)),
      (e.current = u),
      (u.stateNode = e),
      (t = Ro()),
      t.refCount++,
      (e.pooledCache = t),
      t.refCount++,
      (u.memoizedState = { element: n, isDehydrated: a, cache: t }),
      Go(u),
      e
    );
  }
  function np(e) {
    return e ? ((e = un), e) : un;
  }
  function ip(e, t, a, n, s, u) {
    ((s = np(s)),
      n.context === null ? (n.context = s) : (n.pendingContext = s),
      (n = la(t)),
      (n.payload = { element: a }),
      (u = u === void 0 ? null : u),
      u !== null && (n.callback = u),
      (a = aa(e, n, t)),
      a !== null && (At(a, e, t), pi(a, e, t)));
  }
  function sp(e, t) {
    if (((e = e.memoizedState), e !== null && e.dehydrated !== null)) {
      var a = e.retryLane;
      e.retryLane = a !== 0 && a < t ? a : t;
    }
  }
  function sc(e, t) {
    (sp(e, t), (e = e.alternate) && sp(e, t));
  }
  function rp(e) {
    if (e.tag === 13 || e.tag === 31) {
      var t = Ca(e, 67108864);
      (t !== null && At(t, e, 67108864), sc(e, 67108864));
    }
  }
  function op(e) {
    if (e.tag === 13 || e.tag === 31) {
      var t = zt();
      t = eo(t);
      var a = Ca(e, t);
      (a !== null && At(a, e, t), sc(e, t));
    }
  }
  var hr = !0;
  function Dv(e, t, a, n) {
    var s = L.T;
    L.T = null;
    var u = J.p;
    try {
      ((J.p = 2), rc(e, t, a, n));
    } finally {
      ((J.p = u), (L.T = s));
    }
  }
  function Rv(e, t, a, n) {
    var s = L.T;
    L.T = null;
    var u = J.p;
    try {
      ((J.p = 8), rc(e, t, a, n));
    } finally {
      ((J.p = u), (L.T = s));
    }
  }
  function rc(e, t, a, n) {
    if (hr) {
      var s = oc(n);
      if (s === null) (Qu(e, t, n, gr, a), cp(e, n));
      else if (Hv(s, e, t, a, n)) n.stopPropagation();
      else if ((cp(e, n), t & 4 && -1 < zv.indexOf(e))) {
        for (; s !== null; ) {
          var u = Pa(s);
          if (u !== null)
            switch (u.tag) {
              case 3:
                if (((u = u.stateNode), u.current.memoizedState.isDehydrated)) {
                  var _ = xa(u.pendingLanes);
                  if (_ !== 0) {
                    var k = u;
                    for (k.pendingLanes |= 2, k.entangledLanes |= 2; _; ) {
                      var T = 1 << (31 - qt(_));
                      ((k.entanglements[1] |= T), (_ &= ~T));
                    }
                    (gl(u), (Be & 6) === 0 && ((Ws = yt() + 500), Li(0)));
                  }
                }
                break;
              case 31:
              case 13:
                ((k = Ca(u, 2)), k !== null && At(k, u, 2), tr(), sc(u, 2));
            }
          if (((u = oc(n)), u === null && Qu(e, t, n, gr, a), u === s)) break;
          s = u;
        }
        s !== null && n.stopPropagation();
      } else Qu(e, t, n, null, a);
    }
  }
  function oc(e) {
    return ((e = uo(e)), uc(e));
  }
  var gr = null;
  function uc(e) {
    if (((gr = null), (e = Ja(e)), e !== null)) {
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
    return ((gr = e), null);
  }
  function up(e) {
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
          case ie:
            return 8;
          case _e:
          case Ke:
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
  var cc = !1,
    fa = null,
    pa = null,
    ha = null,
    Ri = new Map(),
    zi = new Map(),
    ga = [],
    zv =
      'mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset'.split(
        ' '
      );
  function cp(e, t) {
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
  function Hi(e, t, a, n, s, u) {
    return e === null || e.nativeEvent !== u
      ? ((e = {
          blockedOn: t,
          domEventName: a,
          eventSystemFlags: n,
          nativeEvent: u,
          targetContainers: [s],
        }),
        t !== null && ((t = Pa(t)), t !== null && rp(t)),
        e)
      : ((e.eventSystemFlags |= n),
        (t = e.targetContainers),
        s !== null && t.indexOf(s) === -1 && t.push(s),
        e);
  }
  function Hv(e, t, a, n, s) {
    switch (t) {
      case 'focusin':
        return ((fa = Hi(fa, e, t, a, n, s)), !0);
      case 'dragenter':
        return ((pa = Hi(pa, e, t, a, n, s)), !0);
      case 'mouseover':
        return ((ha = Hi(ha, e, t, a, n, s)), !0);
      case 'pointerover':
        var u = s.pointerId;
        return (Ri.set(u, Hi(Ri.get(u) || null, e, t, a, n, s)), !0);
      case 'gotpointercapture':
        return ((u = s.pointerId), zi.set(u, Hi(zi.get(u) || null, e, t, a, n, s)), !0);
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
  function kr(e) {
    if (e.blockedOn !== null) return !1;
    for (var t = e.targetContainers; 0 < t.length; ) {
      var a = oc(e.nativeEvent);
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
    kr(e) && a.delete(t);
  }
  function Uv() {
    ((cc = !1),
      fa !== null && kr(fa) && (fa = null),
      pa !== null && kr(pa) && (pa = null),
      ha !== null && kr(ha) && (ha = null),
      Ri.forEach(mp),
      zi.forEach(mp));
  }
  function vr(e, t) {
    e.blockedOn === t &&
      ((e.blockedOn = null),
      cc || ((cc = !0), l.unstable_scheduleCallback(l.unstable_NormalPriority, Uv)));
  }
  var yr = null;
  function _p(e) {
    yr !== e &&
      ((yr = e),
      l.unstable_scheduleCallback(l.unstable_NormalPriority, function () {
        yr === e && (yr = null);
        for (var t = 0; t < e.length; t += 3) {
          var a = e[t],
            n = e[t + 1],
            s = e[t + 2];
          if (typeof n != 'function') {
            if (uc(n || a) === null) continue;
            break;
          }
          var u = Pa(a);
          u !== null &&
            (e.splice(t, 3),
            (t -= 3),
            ou(u, { pending: !0, data: s, method: a.method, action: n }, n, s));
        }
      }));
  }
  function Bn(e) {
    function t(T) {
      return vr(T, e);
    }
    (fa !== null && vr(fa, e),
      pa !== null && vr(pa, e),
      ha !== null && vr(ha, e),
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
          u = a[n + 1],
          _ = s[wt] || null;
        if (typeof u == 'function') _ || _p(a);
        else if (_) {
          var k = null;
          if (u && u.hasAttribute('formAction')) {
            if (((s = u), (_ = u[wt] || null))) k = _.formAction;
            else if (uc(s) !== null) continue;
          } else k = _.action;
          (typeof k == 'function' ? (a[n + 1] = k) : (a.splice(n, 3), (n -= 3)), _p(a));
        }
      }
  }
  function fp() {
    function e(u) {
      u.canIntercept &&
        u.info === 'react-transition' &&
        u.intercept({
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
  function dc(e) {
    this._internalRoot = e;
  }
  ((br.prototype.render = dc.prototype.render =
    function (e) {
      var t = this._internalRoot;
      if (t === null) throw Error(r(409));
      var a = t.current,
        n = zt();
      ip(a, n, e, t, null, null);
    }),
    (br.prototype.unmount = dc.prototype.unmount =
      function () {
        var e = this._internalRoot;
        if (e !== null) {
          this._internalRoot = null;
          var t = e.containerInfo;
          (ip(e.current, 2, null, e, null, null), tr(), (t[Za] = null));
        }
      }));
  function br(e) {
    this._internalRoot = e;
  }
  br.prototype.unstable_scheduleHydration = function (e) {
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
  var Gv = {
    bundleType: 0,
    version: '19.2.5',
    rendererPackageName: 'react-dom',
    currentDispatcherRef: L,
    reconcilerVersion: '19.2.5',
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < 'u') {
    var xr = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!xr.isDisabled && xr.supportsFiber)
      try {
        ((xl = xr.inject(Gv)), (Lt = xr));
      } catch {}
  }
  return (
    (Gi.createRoot = function (e, t) {
      if (!c(e)) throw Error(r(299));
      var a = !1,
        n = '',
        s = b_,
        u = x_,
        _ = S_;
      return (
        t != null &&
          (t.unstable_strictMode === !0 && (a = !0),
          t.identifierPrefix !== void 0 && (n = t.identifierPrefix),
          t.onUncaughtError !== void 0 && (s = t.onUncaughtError),
          t.onCaughtError !== void 0 && (u = t.onCaughtError),
          t.onRecoverableError !== void 0 && (_ = t.onRecoverableError)),
        (t = ap(e, 1, !1, null, null, a, n, null, s, u, _, fp)),
        (e[Za] = t.current),
        Vu(e),
        new dc(t)
      );
    }),
    (Gi.hydrateRoot = function (e, t, a) {
      if (!c(e)) throw Error(r(299));
      var n = !1,
        s = '',
        u = b_,
        _ = x_,
        k = S_,
        T = null;
      return (
        a != null &&
          (a.unstable_strictMode === !0 && (n = !0),
          a.identifierPrefix !== void 0 && (s = a.identifierPrefix),
          a.onUncaughtError !== void 0 && (u = a.onUncaughtError),
          a.onCaughtError !== void 0 && (_ = a.onCaughtError),
          a.onRecoverableError !== void 0 && (k = a.onRecoverableError),
          a.formState !== void 0 && (T = a.formState)),
        (t = ap(e, 1, !0, t, a ?? null, n, s, T, u, _, k, fp)),
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
        Vu(e),
        new br(t)
      );
    }),
    (Gi.version = '19.2.5'),
    Gi
  );
}
var Tp;
function ey() {
  if (Tp) return fc.exports;
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
  return (l(), (fc.exports = Wv()), fc.exports);
}
var ty = ey(),
  E = Zc();
/**
 * react-router v7.14.2
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */ var Ep = 'popstate';
function Cp(l) {
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
function ly(l = {}) {
  function i(r, c) {
    var g;
    let d = (g = c.state) == null ? void 0 : g.masked,
      { pathname: f, search: h, hash: p } = d || r.location;
    return Oc(
      '',
      { pathname: f, search: h, hash: p },
      (c.state && c.state.usr) || null,
      (c.state && c.state.key) || 'default',
      d
        ? { pathname: r.location.pathname, search: r.location.search, hash: r.location.hash }
        : void 0
    );
  }
  function o(r, c) {
    return typeof c == 'string' ? c : Ji(c);
  }
  return ny(i, o, null, l);
}
function Je(l, i) {
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
function ay() {
  return Math.random().toString(36).substring(2, 10);
}
function jp(l, i) {
  return {
    usr: l.state,
    key: l.key,
    idx: i,
    masked: l.unstable_mask ? { pathname: l.pathname, search: l.search, hash: l.hash } : void 0,
  };
}
function Oc(l, i, o = null, r, c) {
  return {
    pathname: typeof l == 'string' ? l : l.pathname,
    search: '',
    hash: '',
    ...(typeof i == 'string' ? $n(i) : i),
    state: o,
    key: (i && i.key) || r || ay(),
    unstable_mask: c,
  };
}
function Ji({ pathname: l = '/', search: i = '', hash: o = '' }) {
  return (
    i && i !== '?' && (l += i.charAt(0) === '?' ? i : '?' + i),
    o && o !== '#' && (l += o.charAt(0) === '#' ? o : '#' + o),
    l
  );
}
function $n(l) {
  let i = {};
  if (l) {
    let o = l.indexOf('#');
    o >= 0 && ((i.hash = l.substring(o)), (l = l.substring(0, o)));
    let r = l.indexOf('?');
    (r >= 0 && ((i.search = l.substring(r)), (l = l.substring(0, r))), l && (i.pathname = l));
  }
  return i;
}
function ny(l, i, o, r = {}) {
  let { window: c = document.defaultView, v5Compat: d = !1 } = r,
    f = c.history,
    h = 'POP',
    p = null,
    g = y();
  g == null && ((g = 0), f.replaceState({ ...f.state, idx: g }, ''));
  function y() {
    return (f.state || { idx: null }).idx;
  }
  function v() {
    h = 'POP';
    let x = y(),
      S = x == null ? null : x - g;
    ((g = x), p && p({ action: h, location: w.location, delta: S }));
  }
  function B(x, S) {
    h = 'PUSH';
    let j = Cp(x) ? x : Oc(w.location, x, S);
    g = y() + 1;
    let G = jp(j, g),
      M = w.createHref(j.unstable_mask || j);
    try {
      f.pushState(G, '', M);
    } catch (ee) {
      if (ee instanceof DOMException && ee.name === 'DataCloneError') throw ee;
      c.location.assign(M);
    }
    d && p && p({ action: h, location: w.location, delta: 1 });
  }
  function A(x, S) {
    h = 'REPLACE';
    let j = Cp(x) ? x : Oc(w.location, x, S);
    g = y();
    let G = jp(j, g),
      M = w.createHref(j.unstable_mask || j);
    (f.replaceState(G, '', M), d && p && p({ action: h, location: w.location, delta: 0 }));
  }
  function I(x) {
    return iy(x);
  }
  let w = {
    get action() {
      return h;
    },
    get location() {
      return l(c, f);
    },
    listen(x) {
      if (p) throw new Error('A history only accepts one active listener');
      return (
        c.addEventListener(Ep, v),
        (p = x),
        () => {
          (c.removeEventListener(Ep, v), (p = null));
        }
      );
    },
    createHref(x) {
      return i(c, x);
    },
    createURL: I,
    encodeLocation(x) {
      let S = I(x);
      return { pathname: S.pathname, search: S.search, hash: S.hash };
    },
    push: B,
    replace: A,
    go(x) {
      return f.go(x);
    },
  };
  return w;
}
function iy(l, i = !1) {
  let o = 'http://localhost';
  (typeof window < 'u' &&
    (o = window.location.origin !== 'null' ? window.location.origin : window.location.href),
    Je(o, 'No window.location.(origin|href) available to create URL'));
  let r = typeof l == 'string' ? l : Ji(l);
  return ((r = r.replace(/ $/, '%20')), !i && r.startsWith('//') && (r = o + r), new URL(r, o));
}
function sh(l, i, o = '/') {
  return sy(l, i, o, !1);
}
function sy(l, i, o, r) {
  let c = typeof i == 'string' ? $n(i) : i,
    d = Xl(c.pathname || '/', o);
  if (d == null) return null;
  let f = rh(l);
  ry(f);
  let h = null;
  for (let p = 0; h == null && p < f.length; ++p) {
    let g = ky(d);
    h = hy(f[p], g, r);
  }
  return h;
}
function rh(l, i = [], o = [], r = '', c = !1) {
  let d = (f, h, p = c, g) => {
    let y = {
      relativePath: g === void 0 ? f.path || '' : g,
      caseSensitive: f.caseSensitive === !0,
      childrenIndex: h,
      route: f,
    };
    if (y.relativePath.startsWith('/')) {
      if (!y.relativePath.startsWith(r) && p) return;
      (Je(
        y.relativePath.startsWith(r),
        `Absolute route path "${y.relativePath}" nested under path "${r}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`
      ),
        (y.relativePath = y.relativePath.slice(r.length)));
    }
    let v = rl([r, y.relativePath]),
      B = o.concat(y);
    (f.children &&
      f.children.length > 0 &&
      (Je(
        f.index !== !0,
        `Index routes must not have child routes. Please remove all child routes from route path "${v}".`
      ),
      rh(f.children, i, B, v, p)),
      !(f.path == null && !f.index) && i.push({ path: v, score: fy(v, f.index), routesMeta: B }));
  };
  return (
    l.forEach((f, h) => {
      var p;
      if (f.path === '' || !((p = f.path) != null && p.includes('?'))) d(f, h);
      else for (let g of oh(f.path)) d(f, h, !0, g);
    }),
    i
  );
}
function oh(l) {
  let i = l.split('/');
  if (i.length === 0) return [];
  let [o, ...r] = i,
    c = o.endsWith('?'),
    d = o.replace(/\?$/, '');
  if (r.length === 0) return c ? [d, ''] : [d];
  let f = oh(r.join('/')),
    h = [];
  return (
    h.push(...f.map((p) => (p === '' ? d : [d, p].join('/')))),
    c && h.push(...f),
    h.map((p) => (l.startsWith('/') && p === '' ? '/' : p))
  );
}
function ry(l) {
  l.sort((i, o) =>
    i.score !== o.score
      ? o.score - i.score
      : py(
          i.routesMeta.map((r) => r.childrenIndex),
          o.routesMeta.map((r) => r.childrenIndex)
        )
  );
}
var oy = /^:[\w-]+$/,
  uy = 3,
  cy = 2,
  dy = 1,
  my = 10,
  _y = -2,
  Np = (l) => l === '*';
function fy(l, i) {
  let o = l.split('/'),
    r = o.length;
  return (
    o.some(Np) && (r += _y),
    i && (r += cy),
    o.filter((c) => !Np(c)).reduce((c, d) => c + (oy.test(d) ? uy : d === '' ? dy : my), r)
  );
}
function py(l, i) {
  return l.length === i.length && l.slice(0, -1).every((r, c) => r === i[c])
    ? l[l.length - 1] - i[i.length - 1]
    : 0;
}
function hy(l, i, o = !1) {
  let { routesMeta: r } = l,
    c = {},
    d = '/',
    f = [];
  for (let h = 0; h < r.length; ++h) {
    let p = r[h],
      g = h === r.length - 1,
      y = d === '/' ? i : i.slice(d.length) || '/',
      v = Or({ path: p.relativePath, caseSensitive: p.caseSensitive, end: g }, y),
      B = p.route;
    if (
      (!v &&
        g &&
        o &&
        !r[r.length - 1].route.index &&
        (v = Or({ path: p.relativePath, caseSensitive: p.caseSensitive, end: !1 }, y)),
      !v)
    )
      return null;
    (Object.assign(c, v.params),
      f.push({
        params: c,
        pathname: rl([d, v.pathname]),
        pathnameBase: xy(rl([d, v.pathnameBase])),
        route: B,
      }),
      v.pathnameBase !== '/' && (d = rl([d, v.pathnameBase])));
  }
  return f;
}
function Or(l, i) {
  typeof l == 'string' && (l = { path: l, caseSensitive: !1, end: !0 });
  let [o, r] = gy(l.path, l.caseSensitive, l.end),
    c = i.match(o);
  if (!c) return null;
  let d = c[0],
    f = d.replace(/(.)\/+$/, '$1'),
    h = c.slice(1);
  return {
    params: r.reduce((g, { paramName: y, isOptional: v }, B) => {
      if (y === '*') {
        let I = h[B] || '';
        f = d.slice(0, d.length - I.length).replace(/(.)\/+$/, '$1');
      }
      const A = h[B];
      return (v && !A ? (g[y] = void 0) : (g[y] = (A || '').replace(/%2F/g, '/')), g);
    }, {}),
    pathname: d,
    pathnameBase: f,
    pattern: l,
  };
}
function gy(l, i = !1, o = !0) {
  ol(
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
      ? (r.push({ paramName: '*' }), (c += l === '*' || l === '/*' ? '(.*)$' : '(?:\\/(.+)|\\/*)$'))
      : o
        ? (c += '\\/*$')
        : l !== '' && l !== '/' && (c += '(?:(?=\\/|$))'),
    [new RegExp(c, i ? void 0 : 'i'), r]
  );
}
function ky(l) {
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
var vy = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;
function yy(l, i = '/') {
  let { pathname: o, search: r = '', hash: c = '' } = typeof l == 'string' ? $n(l) : l,
    d;
  return (
    o ? ((o = uh(o)), o.startsWith('/') ? (d = Ap(o.substring(1), '/')) : (d = Ap(o, i))) : (d = i),
    { pathname: d, search: Sy(r), hash: wy(c) }
  );
}
function Ap(l, i) {
  let o = Ir(i).split('/');
  return (
    l.split('/').forEach((c) => {
      c === '..' ? o.length > 1 && o.pop() : c !== '.' && o.push(c);
    }),
    o.length > 1 ? o.join('/') : '/'
  );
}
function vc(l, i, o, r) {
  return `Cannot include a '${l}' character in a manually specified \`to.${i}\` field [${JSON.stringify(r)}].  Please separate it out to the \`to.${o}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`;
}
function by(l) {
  return l.filter((i, o) => o === 0 || (i.route.path && i.route.path.length > 0));
}
function Jc(l) {
  let i = by(l);
  return i.map((o, r) => (r === i.length - 1 ? o.pathname : o.pathnameBase));
}
function $r(l, i, o, r = !1) {
  let c;
  typeof l == 'string'
    ? (c = $n(l))
    : ((c = { ...l }),
      Je(!c.pathname || !c.pathname.includes('?'), vc('?', 'pathname', 'search', c)),
      Je(!c.pathname || !c.pathname.includes('#'), vc('#', 'pathname', 'hash', c)),
      Je(!c.search || !c.search.includes('#'), vc('#', 'search', 'hash', c)));
  let d = l === '' || c.pathname === '',
    f = d ? '/' : c.pathname,
    h;
  if (f == null) h = o;
  else {
    let v = i.length - 1;
    if (!r && f.startsWith('..')) {
      let B = f.split('/');
      for (; B[0] === '..'; ) (B.shift(), (v -= 1));
      c.pathname = B.join('/');
    }
    h = v >= 0 ? i[v] : '/';
  }
  let p = yy(c, h),
    g = f && f !== '/' && f.endsWith('/'),
    y = (d || f === '.') && o.endsWith('/');
  return (!p.pathname.endsWith('/') && (g || y) && (p.pathname += '/'), p);
}
var uh = (l) => l.replace(/\/\/+/g, '/'),
  rl = (l) => uh(l.join('/')),
  Ir = (l) => l.replace(/\/+$/, ''),
  xy = (l) => Ir(l).replace(/^\/*/, '/'),
  Sy = (l) => (!l || l === '?' ? '' : l.startsWith('?') ? l : '?' + l),
  wy = (l) => (!l || l === '#' ? '' : l.startsWith('#') ? l : '#' + l),
  Ty = class {
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
var ch =
  typeof window < 'u' && typeof window.document < 'u' && typeof window.document.createElement < 'u';
function dh(l, i) {
  let o = l;
  if (typeof o != 'string' || !vy.test(o)) return { absoluteURL: void 0, isExternal: !1, to: o };
  let r = o,
    c = !1;
  if (ch)
    try {
      let d = new URL(window.location.href),
        f = o.startsWith('//') ? new URL(d.protocol + o) : new URL(o),
        h = Xl(f.pathname, i);
      f.origin === d.origin && h != null ? (o = h + f.search + f.hash) : (c = !0);
    } catch {
      ol(
        !1,
        `<Link to="${o}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`
      );
    }
  return { absoluteURL: r, isExternal: c, to: o };
}
Object.getOwnPropertyNames(Object.prototype).sort().join('\0');
var mh = ['POST', 'PUT', 'PATCH', 'DELETE'];
new Set(mh);
var jy = ['GET', ...mh];
new Set(jy);
var Yn = E.createContext(null);
Yn.displayName = 'DataRouter';
var Yr = E.createContext(null);
Yr.displayName = 'DataRouterState';
var _h = E.createContext(!1);
function Ny() {
  return E.useContext(_h);
}
var fh = E.createContext({ isTransitioning: !1 });
fh.displayName = 'ViewTransition';
var Ay = E.createContext(new Map());
Ay.displayName = 'Fetchers';
var Ly = E.createContext(null);
Ly.displayName = 'Await';
var Ut = E.createContext(null);
Ut.displayName = 'Navigation';
var es = E.createContext(null);
es.displayName = 'Location';
var dl = E.createContext({ outlet: null, matches: [], isDataRoute: !1 });
dl.displayName = 'Route';
var Pc = E.createContext(null);
Pc.displayName = 'RouteError';
var ph = 'REACT_ROUTER_ERROR',
  qy = 'REDIRECT',
  By = 'ROUTE_ERROR_RESPONSE';
function Oy(l) {
  if (l.startsWith(`${ph}:${qy}:{`))
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
function Iy(l) {
  if (l.startsWith(`${ph}:${By}:{`))
    try {
      let i = JSON.parse(l.slice(40));
      if (
        typeof i == 'object' &&
        i &&
        typeof i.status == 'number' &&
        typeof i.statusText == 'string'
      )
        return new Ty(i.status, i.statusText, i.data);
    } catch {}
}
function My(l, { relative: i } = {}) {
  Je(Xn(), 'useHref() may be used only in the context of a <Router> component.');
  let { basename: o, navigator: r } = E.useContext(Ut),
    { hash: c, pathname: d, search: f } = ts(l, { relative: i }),
    h = d;
  return (
    o !== '/' && (h = d === '/' ? o : rl([o, d])),
    r.createHref({ pathname: h, search: f, hash: c })
  );
}
function Xn() {
  return E.useContext(es) != null;
}
function vl() {
  return (
    Je(Xn(), 'useLocation() may be used only in the context of a <Router> component.'),
    E.useContext(es).location
  );
}
var hh =
  'You should call navigate() in a React.useEffect(), not when your component is first rendered.';
function gh(l) {
  E.useContext(Ut).static || E.useLayoutEffect(l);
}
function ml() {
  let { isDataRoute: l } = E.useContext(dl);
  return l ? Jy() : Dy();
}
function Dy() {
  Je(Xn(), 'useNavigate() may be used only in the context of a <Router> component.');
  let l = E.useContext(Yn),
    { basename: i, navigator: o } = E.useContext(Ut),
    { matches: r } = E.useContext(dl),
    { pathname: c } = vl(),
    d = JSON.stringify(Jc(r)),
    f = E.useRef(!1);
  return (
    gh(() => {
      f.current = !0;
    }),
    E.useCallback(
      (p, g = {}) => {
        if ((ol(f.current, hh), !f.current)) return;
        if (typeof p == 'number') {
          o.go(p);
          return;
        }
        let y = $r(p, JSON.parse(d), c, g.relative === 'path');
        (l == null && i !== '/' && (y.pathname = y.pathname === '/' ? i : rl([i, y.pathname])),
          (g.replace ? o.replace : o.push)(y, g.state, g));
      },
      [i, o, d, c, l]
    )
  );
}
E.createContext(null);
function Ry() {
  let { matches: l } = E.useContext(dl),
    i = l[l.length - 1];
  return (i == null ? void 0 : i.params) ?? {};
}
function ts(l, { relative: i } = {}) {
  let { matches: o } = E.useContext(dl),
    { pathname: r } = vl(),
    c = JSON.stringify(Jc(o));
  return E.useMemo(() => $r(l, JSON.parse(c), r, i === 'path'), [l, c, r, i]);
}
function zy(l, i) {
  return kh(l, i);
}
function kh(l, i, o) {
  var x;
  Je(Xn(), 'useRoutes() may be used only in the context of a <Router> component.');
  let { navigator: r } = E.useContext(Ut),
    { matches: c } = E.useContext(dl),
    d = c[c.length - 1],
    f = d ? d.params : {},
    h = d ? d.pathname : '/',
    p = d ? d.pathnameBase : '/',
    g = d && d.route;
  {
    let S = (g && g.path) || '';
    yh(
      h,
      !g || S.endsWith('*') || S.endsWith('*?'),
      `You rendered descendant <Routes> (or called \`useRoutes()\`) at "${h}" (under <Route path="${S}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${S}"> to <Route path="${S === '/' ? '*' : `${S}/*`}">.`
    );
  }
  let y = vl(),
    v;
  if (i) {
    let S = typeof i == 'string' ? $n(i) : i;
    (Je(
      p === '/' || ((x = S.pathname) == null ? void 0 : x.startsWith(p)),
      `When overriding the location using \`<Routes location>\` or \`useRoutes(routes, location)\`, the location pathname must begin with the portion of the URL pathname that was matched by all parent routes. The current pathname base is "${p}" but pathname "${S.pathname}" was given in the \`location\` prop.`
    ),
      (v = S));
  } else v = y;
  let B = v.pathname || '/',
    A = B;
  if (p !== '/') {
    let S = p.replace(/^\//, '').split('/');
    A = '/' + B.replace(/^\//, '').split('/').slice(S.length).join('/');
  }
  let I = sh(l, { pathname: A });
  (ol(g || I != null, `No routes matched location "${v.pathname}${v.search}${v.hash}" `),
    ol(
      I == null ||
        I[I.length - 1].route.element !== void 0 ||
        I[I.length - 1].route.Component !== void 0 ||
        I[I.length - 1].route.lazy !== void 0,
      `Matched leaf route at location "${v.pathname}${v.search}${v.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`
    ));
  let w = Yy(
    I &&
      I.map((S) =>
        Object.assign({}, S, {
          params: Object.assign({}, f, S.params),
          pathname: rl([
            p,
            r.encodeLocation
              ? r.encodeLocation(
                  S.pathname.replace(/%/g, '%25').replace(/\?/g, '%3F').replace(/#/g, '%23')
                ).pathname
              : S.pathname,
          ]),
          pathnameBase:
            S.pathnameBase === '/'
              ? p
              : rl([
                  p,
                  r.encodeLocation
                    ? r.encodeLocation(
                        S.pathnameBase
                          .replace(/%/g, '%25')
                          .replace(/\?/g, '%3F')
                          .replace(/#/g, '%23')
                      ).pathname
                    : S.pathnameBase,
                ]),
        })
      ),
    c,
    o
  );
  return i && w
    ? E.createElement(
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
        w
      )
    : w;
}
function Hy() {
  let l = Zy(),
    i = Ey(l) ? `${l.status} ${l.statusText}` : l instanceof Error ? l.message : JSON.stringify(l),
    o = l instanceof Error ? l.stack : null,
    r = 'rgba(200,200,200, 0.5)',
    c = { padding: '0.5rem', backgroundColor: r },
    d = { padding: '2px 4px', backgroundColor: r },
    f = null;
  return (
    console.error('Error handled by React Router default ErrorBoundary:', l),
    (f = E.createElement(
      E.Fragment,
      null,
      E.createElement('p', null, '💿 Hey developer 👋'),
      E.createElement(
        'p',
        null,
        'You can provide a way better UX than this when your app throws errors by providing your own ',
        E.createElement('code', { style: d }, 'ErrorBoundary'),
        ' or',
        ' ',
        E.createElement('code', { style: d }, 'errorElement'),
        ' prop on your route.'
      )
    )),
    E.createElement(
      E.Fragment,
      null,
      E.createElement('h2', null, 'Unexpected Application Error!'),
      E.createElement('h3', { style: { fontStyle: 'italic' } }, i),
      o ? E.createElement('pre', { style: c }, o) : null,
      f
    )
  );
}
var Uy = E.createElement(Hy, null),
  vh = class extends E.Component {
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
        const o = Iy(l.digest);
        o && (l = o);
      }
      let i =
        l !== void 0
          ? E.createElement(
              dl.Provider,
              { value: this.props.routeContext },
              E.createElement(Pc.Provider, { value: l, children: this.props.component })
            )
          : this.props.children;
      return this.context ? E.createElement(Gy, { error: l }, i) : i;
    }
  };
vh.contextType = _h;
var yc = new WeakMap();
function Gy({ children: l, error: i }) {
  let { basename: o } = E.useContext(Ut);
  if (typeof i == 'object' && i && 'digest' in i && typeof i.digest == 'string') {
    let r = Oy(i.digest);
    if (r) {
      let c = yc.get(i);
      if (c) throw c;
      let d = dh(r.location, o);
      if (ch && !yc.get(i))
        if (d.isExternal || r.reloadDocument) window.location.href = d.absoluteURL || d.to;
        else {
          const f = Promise.resolve().then(() =>
            window.__reactRouterDataRouter.navigate(d.to, { replace: r.replace })
          );
          throw (yc.set(i, f), f);
        }
      return E.createElement('meta', {
        httpEquiv: 'refresh',
        content: `0;url=${d.absoluteURL || d.to}`,
      });
    }
  }
  return l;
}
function $y({ routeContext: l, match: i, children: o }) {
  let r = E.useContext(Yn);
  return (
    r &&
      r.static &&
      r.staticContext &&
      (i.route.errorElement || i.route.ErrorBoundary) &&
      (r.staticContext._deepestRenderedBoundaryId = i.route.id),
    E.createElement(dl.Provider, { value: l }, o)
  );
}
function Yy(l, i = [], o) {
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
    let y = c.findIndex((v) => v.route.id && (d == null ? void 0 : d[v.route.id]) !== void 0);
    (Je(
      y >= 0,
      `Could not find a matching route for errors on route IDs: ${Object.keys(d).join(',')}`
    ),
      (c = c.slice(0, Math.min(c.length, y + 1))));
  }
  let f = !1,
    h = -1;
  if (o && r) {
    f = r.renderFallback;
    for (let y = 0; y < c.length; y++) {
      let v = c[y];
      if (((v.route.HydrateFallback || v.route.hydrateFallbackElement) && (h = y), v.route.id)) {
        let { loaderData: B, errors: A } = r,
          I = v.route.loader && !B.hasOwnProperty(v.route.id) && (!A || A[v.route.id] === void 0);
        if (v.route.lazy || I) {
          (o.isStatic && (f = !0), h >= 0 ? (c = c.slice(0, h + 1)) : (c = [c[0]]));
          break;
        }
      }
    }
  }
  let p = o == null ? void 0 : o.onError,
    g =
      r && p
        ? (y, v) => {
            var B, A;
            p(y, {
              location: r.location,
              params:
                ((A = (B = r.matches) == null ? void 0 : B[0]) == null ? void 0 : A.params) ?? {},
              unstable_pattern: Cy(r.matches),
              errorInfo: v,
            });
          }
        : void 0;
  return c.reduceRight((y, v, B) => {
    let A,
      I = !1,
      w = null,
      x = null;
    r &&
      ((A = d && v.route.id ? d[v.route.id] : void 0),
      (w = v.route.errorElement || Uy),
      f &&
        (h < 0 && B === 0
          ? (yh(
              'route-fallback',
              !1,
              'No `HydrateFallback` element provided to render during initial hydration'
            ),
            (I = !0),
            (x = null))
          : h === B && ((I = !0), (x = v.route.hydrateFallbackElement || null))));
    let S = i.concat(c.slice(0, B + 1)),
      j = () => {
        let G;
        return (
          A
            ? (G = w)
            : I
              ? (G = x)
              : v.route.Component
                ? (G = E.createElement(v.route.Component, null))
                : v.route.element
                  ? (G = v.route.element)
                  : (G = y),
          E.createElement($y, {
            match: v,
            routeContext: { outlet: y, matches: S, isDataRoute: r != null },
            children: G,
          })
        );
      };
    return r && (v.route.ErrorBoundary || v.route.errorElement || B === 0)
      ? E.createElement(vh, {
          location: r.location,
          revalidation: r.revalidation,
          component: w,
          error: A,
          children: j(),
          routeContext: { outlet: null, matches: S, isDataRoute: !0 },
          onError: g,
        })
      : j();
  }, null);
}
function Fc(l) {
  return `${l} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function Xy(l) {
  let i = E.useContext(Yn);
  return (Je(i, Fc(l)), i);
}
function Vy(l) {
  let i = E.useContext(Yr);
  return (Je(i, Fc(l)), i);
}
function Qy(l) {
  let i = E.useContext(dl);
  return (Je(i, Fc(l)), i);
}
function Wc(l) {
  let i = Qy(l),
    o = i.matches[i.matches.length - 1];
  return (Je(o.route.id, `${l} can only be used on routes that contain a unique "id"`), o.route.id);
}
function Ky() {
  return Wc('useRouteId');
}
function Zy() {
  var r;
  let l = E.useContext(Pc),
    i = Vy('useRouteError'),
    o = Wc('useRouteError');
  return l !== void 0 ? l : (r = i.errors) == null ? void 0 : r[o];
}
function Jy() {
  let { router: l } = Xy('useNavigate'),
    i = Wc('useNavigate'),
    o = E.useRef(!1);
  return (
    gh(() => {
      o.current = !0;
    }),
    E.useCallback(
      async (c, d = {}) => {
        (ol(o.current, hh),
          o.current &&
            (typeof c == 'number'
              ? await l.navigate(c)
              : await l.navigate(c, { fromRouteId: i, ...d })));
      },
      [l, i]
    )
  );
}
var Lp = {};
function yh(l, i, o) {
  !i && !Lp[l] && ((Lp[l] = !0), ol(!1, o));
}
E.memo(Py);
function Py({ routes: l, future: i, state: o, isStatic: r, onError: c }) {
  return kh(l, void 0, { state: o, isStatic: r, onError: c });
}
function ul({ to: l, replace: i, state: o, relative: r }) {
  Je(Xn(), '<Navigate> may be used only in the context of a <Router> component.');
  let { static: c } = E.useContext(Ut);
  ol(
    !c,
    '<Navigate> must not be used on the initial render in a <StaticRouter>. This is a no-op, but you should modify your code so the <Navigate> is only ever rendered in response to some user interaction or state change.'
  );
  let { matches: d } = E.useContext(dl),
    { pathname: f } = vl(),
    h = ml(),
    p = $r(l, Jc(d), f, r === 'path'),
    g = JSON.stringify(p);
  return (
    E.useEffect(() => {
      h(JSON.parse(g), { replace: i, state: o, relative: r });
    }, [h, g, r, i, o]),
    null
  );
}
function Ft(l) {
  Je(
    !1,
    'A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>.'
  );
}
function Fy({
  basename: l = '/',
  children: i = null,
  location: o,
  navigationType: r = 'POP',
  navigator: c,
  static: d = !1,
  unstable_useTransitions: f,
}) {
  Je(
    !Xn(),
    'You cannot render a <Router> inside another <Router>. You should never have more than one in your app.'
  );
  let h = l.replace(/^\/*/, '/'),
    p = E.useMemo(
      () => ({ basename: h, navigator: c, static: d, unstable_useTransitions: f, future: {} }),
      [h, c, d, f]
    );
  typeof o == 'string' && (o = $n(o));
  let {
      pathname: g = '/',
      search: y = '',
      hash: v = '',
      state: B = null,
      key: A = 'default',
      unstable_mask: I,
    } = o,
    w = E.useMemo(() => {
      let x = Xl(g, h);
      return x == null
        ? null
        : {
            location: { pathname: x, search: y, hash: v, state: B, key: A, unstable_mask: I },
            navigationType: r,
          };
    }, [h, g, y, v, B, A, r, I]);
  return (
    ol(
      w != null,
      `<Router basename="${h}"> is not able to match the URL "${g}${y}${v}" because it does not start with the basename, so the <Router> won't render anything.`
    ),
    w == null
      ? null
      : E.createElement(
          Ut.Provider,
          { value: p },
          E.createElement(es.Provider, { children: i, value: w })
        )
  );
}
function Wy({ children: l, location: i }) {
  return zy(Ic(l), i);
}
function Ic(l, i = []) {
  let o = [];
  return (
    E.Children.forEach(l, (r, c) => {
      if (!E.isValidElement(r)) return;
      let d = [...i, c];
      if (r.type === E.Fragment) {
        o.push.apply(o, Ic(r.props.children, d));
        return;
      }
      (Je(
        r.type === Ft,
        `[${typeof r.type == 'string' ? r.type : r.type.name}] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>`
      ),
        Je(!r.props.index || !r.props.children, 'An index route cannot have child routes.'));
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
      (r.props.children && (f.children = Ic(r.props.children, d)), o.push(f));
    }),
    o
  );
}
var Lr = 'get',
  qr = 'application/x-www-form-urlencoded';
function Xr(l) {
  return typeof HTMLElement < 'u' && l instanceof HTMLElement;
}
function e0(l) {
  return Xr(l) && l.tagName.toLowerCase() === 'button';
}
function t0(l) {
  return Xr(l) && l.tagName.toLowerCase() === 'form';
}
function l0(l) {
  return Xr(l) && l.tagName.toLowerCase() === 'input';
}
function a0(l) {
  return !!(l.metaKey || l.altKey || l.ctrlKey || l.shiftKey);
}
function n0(l, i) {
  return l.button === 0 && (!i || i === '_self') && !a0(l);
}
var Sr = null;
function i0() {
  if (Sr === null)
    try {
      (new FormData(document.createElement('form'), 0), (Sr = !1));
    } catch {
      Sr = !0;
    }
  return Sr;
}
var s0 = new Set(['application/x-www-form-urlencoded', 'multipart/form-data', 'text/plain']);
function bc(l) {
  return l != null && !s0.has(l)
    ? (ol(
        !1,
        `"${l}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${qr}"`
      ),
      null)
    : l;
}
function r0(l, i) {
  let o, r, c, d, f;
  if (t0(l)) {
    let h = l.getAttribute('action');
    ((r = h ? Xl(h, i) : null),
      (o = l.getAttribute('method') || Lr),
      (c = bc(l.getAttribute('enctype')) || qr),
      (d = new FormData(l)));
  } else if (e0(l) || (l0(l) && (l.type === 'submit' || l.type === 'image'))) {
    let h = l.form;
    if (h == null)
      throw new Error('Cannot submit a <button> or <input type="submit"> without a <form>');
    let p = l.getAttribute('formaction') || h.getAttribute('action');
    if (
      ((r = p ? Xl(p, i) : null),
      (o = l.getAttribute('formmethod') || h.getAttribute('method') || Lr),
      (c = bc(l.getAttribute('formenctype')) || bc(h.getAttribute('enctype')) || qr),
      (d = new FormData(h, l)),
      !i0())
    ) {
      let { name: g, type: y, value: v } = l;
      if (y === 'image') {
        let B = g ? `${g}.` : '';
        (d.append(`${B}x`, '0'), d.append(`${B}y`, '0'));
      } else g && d.append(g, v);
    }
  } else {
    if (Xr(l))
      throw new Error(
        'Cannot submit element that is not <form>, <button>, or <input type="submit|image">'
      );
    ((o = Lr), (r = null), (c = qr), (f = l));
  }
  return (
    d && c === 'text/plain' && ((f = d), (d = void 0)),
    { action: r, method: o.toLowerCase(), encType: c, formData: d, body: f }
  );
}
Object.getOwnPropertyNames(Object.prototype).sort().join('\0');
function ed(l, i) {
  if (l === !1 || l === null || typeof l > 'u') throw new Error(i);
}
function bh(l, i, o, r) {
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
        : i && Xl(c.pathname, i) === '/'
          ? (c.pathname = `${Ir(i)}/_root.${r}`)
          : (c.pathname = `${Ir(c.pathname)}.${r}`),
    c
  );
}
async function o0(l, i) {
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
function u0(l) {
  return l == null
    ? !1
    : l.href == null
      ? l.rel === 'preload' && typeof l.imageSrcSet == 'string' && typeof l.imageSizes == 'string'
      : typeof l.rel == 'string' && typeof l.href == 'string';
}
async function c0(l, i, o) {
  let r = await Promise.all(
    l.map(async (c) => {
      let d = i.routes[c.route.id];
      if (d) {
        let f = await o0(d, o);
        return f.links ? f.links() : [];
      }
      return [];
    })
  );
  return f0(
    r
      .flat(1)
      .filter(u0)
      .filter((c) => c.rel === 'stylesheet' || c.rel === 'preload')
      .map((c) =>
        c.rel === 'stylesheet' ? { ...c, rel: 'prefetch', as: 'style' } : { ...c, rel: 'prefetch' }
      )
  );
}
function qp(l, i, o, r, c, d) {
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
            let B = p.route.shouldRevalidate({
              currentUrl: new URL(c.pathname + c.search + c.hash, window.origin),
              currentParams: ((v = o[0]) == null ? void 0 : v.params) || {},
              nextUrl: new URL(l, window.origin),
              nextParams: p.params,
              defaultShouldRevalidate: !0,
            });
            if (typeof B == 'boolean') return B;
          }
          return !0;
        })
      : [];
}
function d0(l, i, { includeHydrateFallback: o } = {}) {
  return m0(
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
function m0(l) {
  return [...new Set(l)];
}
function _0(l) {
  let i = {},
    o = Object.keys(l).sort();
  for (let r of o) i[r] = l[r];
  return i;
}
function f0(l, i) {
  let o = new Set();
  return (
    new Set(i),
    l.reduce((r, c) => {
      let d = JSON.stringify(_0(c));
      return (o.has(d) || (o.add(d), r.push({ key: d, link: c })), r);
    }, [])
  );
}
function td() {
  let l = E.useContext(Yn);
  return (ed(l, 'You must render this element inside a <DataRouterContext.Provider> element'), l);
}
function p0() {
  let l = E.useContext(Yr);
  return (
    ed(l, 'You must render this element inside a <DataRouterStateContext.Provider> element'),
    l
  );
}
var ld = E.createContext(void 0);
ld.displayName = 'FrameworkContext';
function ad() {
  let l = E.useContext(ld);
  return (ed(l, 'You must render this element inside a <HydratedRouter> element'), l);
}
function h0(l, i) {
  let o = E.useContext(ld),
    [r, c] = E.useState(!1),
    [d, f] = E.useState(!1),
    { onFocus: h, onBlur: p, onMouseEnter: g, onMouseLeave: y, onTouchStart: v } = i,
    B = E.useRef(null);
  (E.useEffect(() => {
    if ((l === 'render' && f(!0), l === 'viewport')) {
      let w = (S) => {
          S.forEach((j) => {
            f(j.isIntersecting);
          });
        },
        x = new IntersectionObserver(w, { threshold: 0.5 });
      return (
        B.current && x.observe(B.current),
        () => {
          x.disconnect();
        }
      );
    }
  }, [l]),
    E.useEffect(() => {
      if (r) {
        let w = setTimeout(() => {
          f(!0);
        }, 100);
        return () => {
          clearTimeout(w);
        };
      }
    }, [r]));
  let A = () => {
      c(!0);
    },
    I = () => {
      (c(!1), f(!1));
    };
  return o
    ? l !== 'intent'
      ? [d, B, {}]
      : [
          d,
          B,
          {
            onFocus: $i(h, A),
            onBlur: $i(p, I),
            onMouseEnter: $i(g, A),
            onMouseLeave: $i(y, I),
            onTouchStart: $i(v, A),
          },
        ]
    : [!1, B, {}];
}
function $i(l, i) {
  return (o) => {
    (l && l(o), o.defaultPrevented || i(o));
  };
}
function g0({ page: l, ...i }) {
  let o = Ny(),
    { router: r } = td(),
    c = E.useMemo(() => sh(r.routes, l, r.basename), [r.routes, l, r.basename]);
  return c
    ? o
      ? E.createElement(v0, { page: l, matches: c, ...i })
      : E.createElement(y0, { page: l, matches: c, ...i })
    : null;
}
function k0(l) {
  let { manifest: i, routeModules: o } = ad(),
    [r, c] = E.useState([]);
  return (
    E.useEffect(() => {
      let d = !1;
      return (
        c0(l, i, o).then((f) => {
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
function v0({ page: l, matches: i, ...o }) {
  let r = vl(),
    { future: c } = ad(),
    { basename: d } = td(),
    f = E.useMemo(() => {
      if (l === r.pathname + r.search + r.hash) return [];
      let h = bh(l, d, c.unstable_trailingSlashAwareDataRequests, 'rsc'),
        p = !1,
        g = [];
      for (let y of i)
        typeof y.route.shouldRevalidate == 'function' ? (p = !0) : g.push(y.route.id);
      return (
        p && g.length > 0 && h.searchParams.set('_routes', g.join(',')),
        [h.pathname + h.search]
      );
    }, [d, c.unstable_trailingSlashAwareDataRequests, l, r, i]);
  return E.createElement(
    E.Fragment,
    null,
    f.map((h) => E.createElement('link', { key: h, rel: 'prefetch', as: 'fetch', href: h, ...o }))
  );
}
function y0({ page: l, matches: i, ...o }) {
  let r = vl(),
    { future: c, manifest: d, routeModules: f } = ad(),
    { basename: h } = td(),
    { loaderData: p, matches: g } = p0(),
    y = E.useMemo(() => qp(l, i, g, d, r, 'data'), [l, i, g, d, r]),
    v = E.useMemo(() => qp(l, i, g, d, r, 'assets'), [l, i, g, d, r]),
    B = E.useMemo(() => {
      if (l === r.pathname + r.search + r.hash) return [];
      let w = new Set(),
        x = !1;
      if (
        (i.forEach((j) => {
          var M;
          let G = d.routes[j.route.id];
          !G ||
            !G.hasLoader ||
            ((!y.some((ee) => ee.route.id === j.route.id) &&
              j.route.id in p &&
              (M = f[j.route.id]) != null &&
              M.shouldRevalidate) ||
            G.hasClientLoader
              ? (x = !0)
              : w.add(j.route.id));
        }),
        w.size === 0)
      )
        return [];
      let S = bh(l, h, c.unstable_trailingSlashAwareDataRequests, 'data');
      return (
        x &&
          w.size > 0 &&
          S.searchParams.set(
            '_routes',
            i
              .filter((j) => w.has(j.route.id))
              .map((j) => j.route.id)
              .join(',')
          ),
        [S.pathname + S.search]
      );
    }, [h, c.unstable_trailingSlashAwareDataRequests, p, r, d, y, i, l, f]),
    A = E.useMemo(() => d0(v, d), [v, d]),
    I = k0(v);
  return E.createElement(
    E.Fragment,
    null,
    B.map((w) => E.createElement('link', { key: w, rel: 'prefetch', as: 'fetch', href: w, ...o })),
    A.map((w) => E.createElement('link', { key: w, rel: 'modulepreload', href: w, ...o })),
    I.map(({ key: w, link: x }) =>
      E.createElement('link', {
        key: w,
        nonce: o.nonce,
        ...x,
        crossOrigin: x.crossOrigin ?? o.crossOrigin,
      })
    )
  );
}
function b0(...l) {
  return (i) => {
    l.forEach((o) => {
      typeof o == 'function' ? o(i) : o != null && (o.current = i);
    });
  };
}
var x0 =
  typeof window < 'u' && typeof window.document < 'u' && typeof window.document.createElement < 'u';
try {
  x0 && (window.__reactRouterVersion = '7.14.2');
} catch {}
function S0({ basename: l, children: i, unstable_useTransitions: o, window: r }) {
  let c = E.useRef();
  c.current == null && (c.current = ly({ window: r, v5Compat: !0 }));
  let d = c.current,
    [f, h] = E.useState({ action: d.action, location: d.location }),
    p = E.useCallback(
      (g) => {
        o === !1 ? h(g) : E.startTransition(() => h(g));
      },
      [o]
    );
  return (
    E.useLayoutEffect(() => d.listen(p), [d, p]),
    E.createElement(Fy, {
      basename: l,
      children: i,
      location: f.location,
      navigationType: f.action,
      navigator: d,
      unstable_useTransitions: o,
    })
  );
}
var xh = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,
  Sh = E.forwardRef(function (
    {
      onClick: i,
      discover: o = 'render',
      prefetch: r = 'none',
      relative: c,
      reloadDocument: d,
      replace: f,
      unstable_mask: h,
      state: p,
      target: g,
      to: y,
      preventScrollReset: v,
      viewTransition: B,
      unstable_defaultShouldRevalidate: A,
      ...I
    },
    w
  ) {
    let { basename: x, navigator: S, unstable_useTransitions: j } = E.useContext(Ut),
      G = typeof y == 'string' && xh.test(y),
      M = dh(y, x);
    y = M.to;
    let ee = My(y, { relative: c }),
      Y = vl(),
      C = null;
    if (h) {
      let ke = $r(h, [], Y.unstable_mask ? Y.unstable_mask.pathname : '/', !0);
      (x !== '/' && (ke.pathname = ke.pathname === '/' ? x : rl([x, ke.pathname])),
        (C = S.createHref(ke)));
    }
    let [K, te, de] = h0(r, I),
      le = C0(y, {
        replace: f,
        unstable_mask: h,
        state: p,
        target: g,
        preventScrollReset: v,
        relative: c,
        viewTransition: B,
        unstable_defaultShouldRevalidate: A,
        unstable_useTransitions: j,
      });
    function ue(ke) {
      (i && i(ke), ke.defaultPrevented || le(ke));
    }
    let ye = !(M.isExternal || d),
      Se = E.createElement('a', {
        ...I,
        ...de,
        href: (ye ? C : void 0) || M.absoluteURL || ee,
        onClick: ye ? ue : i,
        ref: b0(w, te),
        target: g,
        'data-discover': !G && o === 'render' ? 'true' : void 0,
      });
    return K && !G ? E.createElement(E.Fragment, null, Se, E.createElement(g0, { page: ee })) : Se;
  });
Sh.displayName = 'Link';
var w0 = E.forwardRef(function (
  {
    'aria-current': i = 'page',
    caseSensitive: o = !1,
    className: r = '',
    end: c = !1,
    style: d,
    to: f,
    viewTransition: h,
    children: p,
    ...g
  },
  y
) {
  let v = ts(f, { relative: g.relative }),
    B = vl(),
    A = E.useContext(Yr),
    { navigator: I, basename: w } = E.useContext(Ut),
    x = A != null && q0(v) && h === !0,
    S = I.encodeLocation ? I.encodeLocation(v).pathname : v.pathname,
    j = B.pathname,
    G = A && A.navigation && A.navigation.location ? A.navigation.location.pathname : null;
  (o || ((j = j.toLowerCase()), (G = G ? G.toLowerCase() : null), (S = S.toLowerCase())),
    G && w && (G = Xl(G, w) || G));
  const M = S !== '/' && S.endsWith('/') ? S.length - 1 : S.length;
  let ee = j === S || (!c && j.startsWith(S) && j.charAt(M) === '/'),
    Y = G != null && (G === S || (!c && G.startsWith(S) && G.charAt(S.length) === '/')),
    C = { isActive: ee, isPending: Y, isTransitioning: x },
    K = ee ? i : void 0,
    te;
  typeof r == 'function'
    ? (te = r(C))
    : (te = [r, ee ? 'active' : null, Y ? 'pending' : null, x ? 'transitioning' : null]
        .filter(Boolean)
        .join(' '));
  let de = typeof d == 'function' ? d(C) : d;
  return E.createElement(
    Sh,
    { ...g, 'aria-current': K, className: te, ref: y, style: de, to: f, viewTransition: h },
    typeof p == 'function' ? p(C) : p
  );
});
w0.displayName = 'NavLink';
var T0 = E.forwardRef(
  (
    {
      discover: l = 'render',
      fetcherKey: i,
      navigate: o,
      reloadDocument: r,
      replace: c,
      state: d,
      method: f = Lr,
      action: h,
      onSubmit: p,
      relative: g,
      preventScrollReset: y,
      viewTransition: v,
      unstable_defaultShouldRevalidate: B,
      ...A
    },
    I
  ) => {
    let { unstable_useTransitions: w } = E.useContext(Ut),
      x = A0(),
      S = L0(h, { relative: g }),
      j = f.toLowerCase() === 'get' ? 'get' : 'post',
      G = typeof h == 'string' && xh.test(h),
      M = (ee) => {
        if ((p && p(ee), ee.defaultPrevented)) return;
        ee.preventDefault();
        let Y = ee.nativeEvent.submitter,
          C = (Y == null ? void 0 : Y.getAttribute('formmethod')) || f,
          K = () =>
            x(Y || ee.currentTarget, {
              fetcherKey: i,
              method: C,
              navigate: o,
              replace: c,
              state: d,
              relative: g,
              preventScrollReset: y,
              viewTransition: v,
              unstable_defaultShouldRevalidate: B,
            });
        w && o !== !1 ? E.startTransition(() => K()) : K();
      };
    return E.createElement('form', {
      ref: I,
      method: j,
      action: S,
      onSubmit: r ? p : M,
      ...A,
      'data-discover': !G && l === 'render' ? 'true' : void 0,
    });
  }
);
T0.displayName = 'Form';
function E0(l) {
  return `${l} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function wh(l) {
  let i = E.useContext(Yn);
  return (Je(i, E0(l)), i);
}
function C0(
  l,
  {
    target: i,
    replace: o,
    unstable_mask: r,
    state: c,
    preventScrollReset: d,
    relative: f,
    viewTransition: h,
    unstable_defaultShouldRevalidate: p,
    unstable_useTransitions: g,
  } = {}
) {
  let y = ml(),
    v = vl(),
    B = ts(l, { relative: f });
  return E.useCallback(
    (A) => {
      if (n0(A, i)) {
        A.preventDefault();
        let I = o !== void 0 ? o : Ji(v) === Ji(B),
          w = () =>
            y(l, {
              replace: I,
              unstable_mask: r,
              state: c,
              preventScrollReset: d,
              relative: f,
              viewTransition: h,
              unstable_defaultShouldRevalidate: p,
            });
        g ? E.startTransition(() => w()) : w();
      }
    },
    [v, y, B, o, r, c, i, l, d, f, h, p, g]
  );
}
var j0 = 0,
  N0 = () => `__${String(++j0)}__`;
function A0() {
  let { router: l } = wh('useSubmit'),
    { basename: i } = E.useContext(Ut),
    o = Ky(),
    r = l.fetch,
    c = l.navigate;
  return E.useCallback(
    async (d, f = {}) => {
      let { action: h, method: p, encType: g, formData: y, body: v } = r0(d, i);
      if (f.navigate === !1) {
        let B = f.fetcherKey || N0();
        await r(B, o, f.action || h, {
          unstable_defaultShouldRevalidate: f.unstable_defaultShouldRevalidate,
          preventScrollReset: f.preventScrollReset,
          formData: y,
          body: v,
          formMethod: f.method || p,
          formEncType: f.encType || g,
          flushSync: f.flushSync,
        });
      } else
        await c(f.action || h, {
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
    [r, c, i, o]
  );
}
function L0(l, { relative: i } = {}) {
  let { basename: o } = E.useContext(Ut),
    r = E.useContext(dl);
  Je(r, 'useFormAction must be used inside a RouteContext');
  let [c] = r.matches.slice(-1),
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
      c.route.index &&
      (d.search = d.search ? d.search.replace(/^\?/, '?index&') : '?index'),
    o !== '/' && (d.pathname = d.pathname === '/' ? o : rl([o, d.pathname])),
    Ji(d)
  );
}
function q0(l, { relative: i } = {}) {
  let o = E.useContext(fh);
  Je(
    o != null,
    "`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?"
  );
  let { basename: r } = wh('useViewTransitionState'),
    c = ts(l, { relative: i });
  if (!o.isTransitioning) return !1;
  let d = Xl(o.currentLocation.pathname, r) || o.currentLocation.pathname,
    f = Xl(o.nextLocation.pathname, r) || o.nextLocation.pathname;
  return Or(c.pathname, f) != null || Or(c.pathname, d) != null;
}
const B0 = '_layout_bjf95_1',
  O0 = '_enemies_bjf95_12',
  I0 = '_enemy_bjf95_20',
  M0 = '_targeted_bjf95_35',
  D0 = '_enemyName_bjf95_39',
  R0 = '_down_bjf95_44',
  z0 = '_log_bjf95_48',
  H0 = '_logLine_bjf95_60',
  U0 = '_party_bjf95_64',
  G0 = '_rowTag_bjf95_71',
  $0 = '_cardRow_bjf95_77',
  Y0 = '_card_bjf95_77',
  X0 = '_cardActive_bjf95_100',
  V0 = '_cardDecided_bjf95_105',
  Q0 = '_cardName_bjf95_109',
  K0 = '_uni_bjf95_117',
  Z0 = '_cardJob_bjf95_121',
  J0 = '_gaugeRow_bjf95_127',
  P0 = '_gaugeLabel_bjf95_133',
  F0 = '_flash_bjf95_141',
  W0 = '_summons_bjf95_163',
  eb = '_summon_bjf95_163',
  tb = '_summonName_bjf95_181',
  lb = '_summonHp_bjf95_190',
  ab = '_cardNums_bjf95_196',
  nb = '_cardCmd_bjf95_202',
  ib = '_empty_bjf95_208',
  sb = '_command_bjf95_213',
  rb = '_skillList_bjf95_219',
  ob = '_skillBtn_bjf95_225',
  ub = '_skillTop_bjf95_237',
  cb = '_skillName_bjf95_244',
  db = '_skillDesc_bjf95_249',
  mb = '_skillSummary_bjf95_255',
  _b = '_target_bjf95_35',
  fb = '_unionBanner_bjf95_267',
  pb = '_unionBannerHead_bjf95_280',
  hb = '_unionBannerDesc_bjf95_287',
  gb = '_unionInfo_bjf95_294',
  kb = '_unionCancel_bjf95_304',
  vb = '_unionHint_bjf95_313',
  yb = '_unionBtn_bjf95_319',
  bb = '_cmdHead_bjf95_325',
  xb = '_menu_bjf95_330',
  Sb = '_menuBtn_bjf95_336',
  wb = '_tp_bjf95_353',
  Tb = '_menuBack_bjf95_359',
  Eb = '_execRow_bjf95_369',
  Cb = '_redo_bjf95_374',
  jb = '_primary_bjf95_384',
  Nb = '_result_bjf95_399',
  Ab = '_resultTitle_bjf95_410',
  Lb = '_resultBody_bjf95_415',
  qb = '_expList_bjf95_419',
  Bb = '_expRow_bjf95_427',
  Ob = '_expName_bjf95_433',
  Ib = '_expLv_bjf95_441',
  Mb = '_expUp_bjf95_446',
  Db = '_expNum_bjf95_451',
  Rb = '_playback_bjf95_457',
  zb = '_playbackHint_bjf95_467',
  Hb = '_skip_bjf95_473',
  Ub = '_logLineNew_bjf95_484',
  Gb = '_dialogOverlay_bjf95_499',
  $b = '_dialog_bjf95_499',
  Yb = '_dialogTitle_bjf95_534',
  Xb = '_dialogName_bjf95_540',
  Vb = '_dialogStats_bjf95_545',
  Qb = '_dialogStat_bjf95_545',
  Kb = '_fxIntro_bjf95_561',
  Zb = '_fxOutro_bjf95_581',
  Jb = '_fxLose_bjf95_590',
  Z = {
    layout: B0,
    enemies: O0,
    enemy: I0,
    targeted: M0,
    enemyName: D0,
    down: R0,
    log: z0,
    logLine: H0,
    party: U0,
    rowTag: G0,
    cardRow: $0,
    card: Y0,
    cardActive: X0,
    cardDecided: V0,
    cardName: Q0,
    uni: K0,
    cardJob: Z0,
    gaugeRow: J0,
    gaugeLabel: P0,
    flash: F0,
    summons: W0,
    summon: eb,
    summonName: tb,
    summonHp: lb,
    cardNums: ab,
    cardCmd: nb,
    empty: ib,
    command: sb,
    skillList: rb,
    skillBtn: ob,
    skillTop: ub,
    skillName: cb,
    skillDesc: db,
    skillSummary: mb,
    target: _b,
    unionBanner: fb,
    unionBannerHead: pb,
    unionBannerDesc: hb,
    unionInfo: gb,
    unionCancel: kb,
    unionHint: vb,
    unionBtn: yb,
    cmdHead: bb,
    menu: xb,
    menuBtn: Sb,
    tp: wb,
    menuBack: Tb,
    execRow: Eb,
    redo: Cb,
    primary: jb,
    result: Nb,
    resultTitle: Ab,
    resultBody: Lb,
    expList: qb,
    expRow: Bb,
    expName: Ob,
    expLv: Ib,
    expUp: Mb,
    expNum: Db,
    playback: Rb,
    playbackHint: zb,
    skip: Hb,
    logLineNew: Ub,
    dialogOverlay: Gb,
    dialog: $b,
    dialogTitle: Yb,
    dialogName: Xb,
    dialogStats: Vb,
    dialogStat: Qb,
    fxIntro: Kb,
    fxOutro: Zb,
    fxLose: Jb,
  },
  Pb = '_row_1t6j7_1',
  Fb = '_label_1t6j7_8',
  Wb = '_track_1t6j7_16',
  e1 = '_fill_1t6j7_24',
  t1 = '_value_1t6j7_30',
  Yi = { row: Pb, label: Fb, track: Wb, fill: e1, value: t1 },
  On = ({ value: l, max: i, color: o = '#4caf50', label: r, showValue: c = !0 }) => {
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
        c
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
  tt = {
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
  Fe = {
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
function l1(l) {
  return l.category === 'food' ? 0 : l.category === 'material' ? 8 : Math.floor(l.buyPrice / 2);
}
function a1(l) {
  var i;
  return ((i = Fe[l]) == null ? void 0 : i.category) === 'food';
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
  $e = {
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
  n1 = 500,
  Mc = 30,
  Vr = 3,
  Qr = 2,
  i1 = Vr + Qr,
  Vi = { TITLE_DEPTH: 20, REBIRTH_MIN_LEVEL: 30 },
  Th = 5,
  s1 = 5,
  kl = {
    MAX_LEVEL: 5,
    STAT_PER_LEVEL: 2,
    INGOT_INC: { copper: 1, silver: 3, gold: 5 },
    FRAGMENTS_PER_INGOT: 10,
    RECYCLE_FRAGMENTS: 3,
  },
  Qi = (l) => l > 0 && l % $e.BOSS_INTERVAL === 0,
  Dc = (l) => Math.round($e.EXP_CURVE_BASE * Math.pow(l, $e.EXP_CURVE_POW)),
  Mr = (l) => Math.round($e.SP_PER_LEVEL * Math.max(0, l - 1)),
  r1 = (l) => Mr(l) - Mr(l - 1),
  Ki = (l) => l < $e.LEVEL_CAP,
  nd = (l, i) => 1 + $e.ENEMY_SCALE_K * (l - i),
  cl = {
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
  o1 = ['hp', 'tp', 'str', 'vit', 'agi', 'int', 'mnd', 'luc'],
  u1 = ['slash', 'pierce', 'bash'],
  Dr = (l, i, o) => Math.max(i, Math.min(o, l));
function Eh(l, i) {
  const o = {};
  for (const r of o1) o[r] = Math.round(l[r] * i);
  return o;
}
function c1(l, i) {
  return Eh(l.baseStats, nd(i, l.refDepth));
}
function In(l, i) {
  const o = new Map();
  for (const c of l) {
    if (c.stat !== i) continue;
    const d = Dr(c.modifier, 0.5, 1.5),
      f = o.get(c.stackGroup);
    (f === void 0 || Math.abs(d - 1) > Math.abs(f - 1)) && o.set(c.stackGroup, d);
  }
  let r = 1;
  for (const c of o.values()) r *= c;
  return Dr(r, 0.25, 2);
}
function Bp(l, i, o, r) {
  const c = (g) => (r == null ? void 0 : r[g]) ?? 1,
    d = (l.str * 2 + (i.atk ?? 0)) * In(o, 'patk') * c('patk'),
    f = (l.vit * 2 + (i.def ?? 0)) * In(o, 'pdef') * c('pdef'),
    h = (l.int * 2 + (i.mat ?? 0)) * In(o, 'matk') * c('matk'),
    p = (l.mnd * 2 + (i.mdf ?? 0)) * In(o, 'mdef') * c('mdef');
  return {
    patk: d,
    pdef: f,
    matk: h,
    mdef: p,
    hit: l.agi,
    acc: l.agi * In(o, 'acc') * c('acc'),
    eva: l.agi * In(o, 'eva') * c('eva'),
    crit: l.luc,
  };
}
const d1 = (l) => l.ailments.some((i) => i.type === 'blind'),
  m1 = (l) => l.ailments.some((i) => i.type === 'legBind');
function _1(l, i, o, r) {
  var C;
  const c = o.statBase === 'str',
    d = Bp(l.stats, l.equip, l.buffs, l.passive),
    f = Bp(i.stats, i.equip, i.buffs, i.passive),
    h = c ? d.patk : d.matk,
    p = c ? f.pdef : f.mdef;
  let g = !0;
  if (c) {
    const K = d1(l) ? $e.BLIND_ACC_PENALTY : 0,
      te = m1(i) ? 0 : f.eva,
      de = Dr($e.BASE_HIT + (d.acc - te) * $e.HIT_AGI_K - K, $e.HIT_MIN, 1);
    g = r.next() < de;
  }
  if (!g) return { damage: 0, hit: !1, critical: !1 };
  const v = (h * o.power * $e.DAMAGE_DEF_K) / ($e.DAMAGE_DEF_K + Math.max(0, p)),
    B = c && u1.includes(o.element),
    A = B && l.row === 'back' ? $e.BACK_ROW_MELEE_MULT : 1,
    I = B && i.row === 'back' ? $e.BACK_ROW_MELEE_MULT : 1,
    w = A * I,
    [x, S] = $e.DMG_VARIANCE,
    j = x + r.next() * (S - x);
  let G = v * o.elementMultiplier * w * j;
  const M = Dr(
      $e.CRIT_BASE +
        (l.stats.luc - i.stats.luc) * $e.CRIT_LUC_K +
        (((C = l.passive) == null ? void 0 : C.crit) ?? 0),
      $e.CRIT_MIN,
      $e.CRIT_MAX
    ),
    ee = r.next() < M;
  return (
    ee && (G *= $e.CRIT_MULT),
    { damage: o.elementMultiplier === 0 ? 0 : Math.max(1, Math.floor(G)), hit: !0, critical: ee }
  );
}
const Ch = () => Math.max(0, ...Object.values(cl).map((l) => l.tierBand)),
  jh = (l) => Math.floor((l - 1) / $e.BAND_SIZE);
function Nh(l) {
  return jh(l) % (Ch() + 1);
}
function Ah(l) {
  return Math.floor(jh(l) / (Ch() + 1)) + 1;
}
function f1(l) {
  const i = Nh(l);
  return Object.values(cl)
    .filter((o) => o.tierBand === i && !o.isBoss && o.kind !== 'foe')
    .map((o) => o.id);
}
function p1(l, i) {
  const o = f1(l);
  if (o.length === 0) return [];
  const r = i.range(1, 3);
  return Array.from({ length: r }, () => i.pick(o));
}
function h1(l, i) {
  const o = lt[l];
  if (!o || i <= 0) return {};
  const r = i * kl.STAT_PER_LEVEL;
  return o.slot === 'weapon' ? { atk: r, mat: r } : o.slot === 'armor' ? { def: r, mdf: r } : {};
}
function Un(l) {
  return 1 + 0.5 * (Math.max(1, l ?? 1) - 1);
}
function Lh(l, i) {
  const o = lt[l];
  if (!o) return {};
  const r = Un(i),
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
const qh = ['weapon', 'armor', 'accessory'];
function g1(l, i, o) {
  const r = l.guild.equipment.map((d) => (d.id === i ? o(d) : d)),
    c = l.guild.members.map((d) => {
      let f = !1;
      const h = { ...d.equipment };
      for (const p of qh) {
        const g = h[p];
        g && g.id === i && ((h[p] = o(g)), (f = !0));
      }
      return f ? { ...d, equipment: h } : d;
    });
  return { ...l, guild: { ...l.guild, equipment: r, members: c } };
}
function k1(l, i, o) {
  let r = l.guild.equipment.find((f) => f.id === i);
  if (!r)
    for (const f of l.guild.members)
      for (const h of qh) {
        const p = f.equipment[h];
        (p == null ? void 0 : p.id) === i && (r = p);
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
  return ((d = g1(d, i, (f) => ({ ...f, forgeLevel: c }))), { ok: !0, save: d });
}
function v1(l, i) {
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
function ya(l) {
  var r;
  const i = ((r = lt[l.masterId]) == null ? void 0 : r.name) ?? l.masterId,
    o = l.grade && l.grade > 1 ? `${i} Lv${l.grade}` : i;
  return l.forgeLevel > 0 ? `${o} +${l.forgeLevel}` : o;
}
const Bh = (l) => l.grade ?? 1;
function id(l, i, o) {
  return l.guild.storage
    .filter((r) => r.itemId === i && o === void 0)
    .reduce((r, c) => r + c.qty, 0);
}
function sd(l, i, o = 1, r = 1) {
  if (o <= 0) return l;
  const c = [...l.guild.storage],
    d = c.findIndex((f) => f.itemId === i && Bh(f) === r);
  return (
    d >= 0
      ? (c[d] = { ...c[d], qty: c[d].qty + o })
      : c.push(r > 1 ? { itemId: i, qty: o, grade: r } : { itemId: i, qty: o }),
    { ...l, guild: { ...l.guild, storage: c } }
  );
}
function rd(l, i, o = 1, r = 1) {
  if (o <= 0) return l;
  const c = l.guild.storage.findIndex((h) => h.itemId === i && Bh(h) === r);
  if (c < 0 || l.guild.storage[c].qty < o) return l;
  const d = [...l.guild.storage],
    f = d[c].qty - o;
  return (
    f <= 0 ? d.splice(c, 1) : (d[c] = { ...d[c], qty: f }),
    { ...l, guild: { ...l.guild, storage: d } }
  );
}
const Oh = 60,
  Kr = (l) => l.guild.foodStorage ?? [];
function Ih(l) {
  return Kr(l).reduce((i, o) => i + o.qty, 0);
}
function od(l, i) {
  var o;
  return ((o = Kr(l).find((r) => r.itemId === i)) == null ? void 0 : o.qty) ?? 0;
}
function Mh(l, i, o = 1) {
  if (o <= 0) return l;
  const r = Oh - Ih(l),
    c = Math.min(o, Math.max(0, r));
  if (c <= 0) return l;
  const d = [...Kr(l)],
    f = d.findIndex((h) => h.itemId === i);
  return (
    f >= 0 ? (d[f] = { ...d[f], qty: d[f].qty + c }) : d.push({ itemId: i, qty: c }),
    { ...l, guild: { ...l.guild, foodStorage: d } }
  );
}
function Dh(l, i, o = 1) {
  if (o <= 0) return l;
  const r = [...Kr(l)],
    c = r.findIndex((f) => f.itemId === i);
  if (c < 0 || r[c].qty < o) return l;
  const d = r[c].qty - o;
  return (
    d <= 0 ? r.splice(c, 1) : (r[c] = { ...r[c], qty: d }),
    { ...l, guild: { ...l.guild, foodStorage: r } }
  );
}
function Rh(l, i, o) {
  return {
    ...l,
    guild: { ...l.guild, members: l.guild.members.map((r) => (r.id === i ? o(r) : r)) },
  };
}
function y1() {
  return `eq_${Date.now().toString(36)}_${Math.floor(Math.random() * 16777215).toString(36)}`;
}
function b1(l, i, o = 0, r = 1) {
  if (!lt[i]) return l;
  const c = { id: y1(), masterId: i, forgeLevel: o };
  return (
    r > 1 && (c.grade = r),
    { ...l, guild: { ...l.guild, equipment: [...l.guild.equipment, c] } }
  );
}
function ud(l, i) {
  const o = lt[i];
  if (!o) return !1;
  const r = tt[l.classId];
  return r
    ? o.slot === 'weapon'
      ? !!o.weaponType && r.equipableWeaponTypes.includes(o.weaponType)
      : o.slot === 'armor'
        ? !!o.armorType && r.equipableArmorTypes.includes(o.armorType)
        : !0
    : !1;
}
function x1(l, i, o) {
  const r = l.guild.equipment.find((g) => g.id === o),
    c = l.guild.members.find((g) => g.id === i);
  if (!r || !c || !ud(c, r.masterId)) return l;
  const d = lt[r.masterId];
  let f = l.guild.equipment.filter((g) => g.id !== o);
  const h = c.equipment[d.slot];
  h && (f = [...f, h]);
  const p = { ...l, guild: { ...l.guild, equipment: f } };
  return Rh(p, i, (g) => ({ ...g, equipment: { ...g.equipment, [d.slot]: r } }));
}
function cd(l, i, o) {
  const r = l.guild.members.find((f) => f.id === i);
  if (!r) return l;
  const c = r.equipment[o];
  if (!c) return l;
  const d = { ...l, guild: { ...l.guild, equipment: [...l.guild.equipment, c] } };
  return Rh(d, i, (f) => ({ ...f, equipment: { ...f.equipment, [o]: null } }));
}
const Rc = {
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
  S1 = ['patk', 'matk', 'pdef', 'mdef', 'acc', 'eva', 'maxHp', 'maxTp'];
function w1(l) {
  var o;
  const i = l.equipment.weapon;
  if (i) return (o = lt[i.masterId]) == null ? void 0 : o.weaponType;
}
function T1(l) {
  const i = w1(l),
    o = {};
  let r = 0;
  for (const [c, d] of Object.entries(l.learnedSkills)) {
    if (d <= 0) continue;
    const f = Rc[c];
    if (!f || (f.weaponType && f.weaponType !== i)) continue;
    const h = f.mods(d);
    for (const p of S1) h[p] !== void 0 && (o[p] = (o[p] ?? 1) * h[p]);
    h.crit !== void 0 && (r += h.crit);
  }
  return (r !== 0 && (o.crit = r), o);
}
const mt = (l) => ({ hp: 0, tp: 0, str: 0, vit: 0, agi: 0, int: 0, mnd: 0, luc: 0, ...l }),
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
  E1 = ['hp', 'tp', 'str', 'vit', 'agi', 'int', 'mnd', 'luc'];
function $l(l) {
  var h, p;
  const i = St[l.raceId];
  if (!i) throw new Error(`computeBaseStats: 未定義の種族 "${l.raceId}"`);
  const r = Math.max(1, Math.min(l.level, $e.LEVEL_CAP)) - 1,
    c = l.titleId ? ((h = Gl[l.titleId]) == null ? void 0 : h.growthModifier) : void 0,
    d = ((p = l.rebirthBonus) == null ? void 0 : p.allStats) ?? 0,
    f = {};
  for (const g of E1) {
    const y = i.statGrowth[g] + ((c == null ? void 0 : c[g]) ?? 0);
    f[g] = i.baseStatsAtLv1[g] + y * r + d;
  }
  return f;
}
const C1 = 3,
  Yl = (l, i, o) => Math.max(i, Math.min(o, l)),
  j1 = {
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
function N1(l) {
  const i = { atk: 0, mat: 0, def: 0, mdf: 0 };
  for (const o of Object.values(l.equipment)) {
    if (!o || !lt[o.masterId]) continue;
    const c = Lh(o.masterId, o.grade),
      d = h1(o.masterId, o.forgeLevel);
    ((i.atk += (c.atk ?? 0) + (d.atk ?? 0)),
      (i.mat += (c.mat ?? 0) + (d.mat ?? 0)),
      (i.def += (c.def ?? 0) + (d.def ?? 0)),
      (i.mdf += (c.mdf ?? 0) + (d.mdf ?? 0)));
  }
  return i;
}
function A1(l, i) {
  var g;
  const o = l.guild.members.find((y) => y.id === i);
  if (!o) return null;
  const r = (g = l.diveState) == null ? void 0 : g.party.find((y) => y.charId === i),
    c = $l(o),
    d = T1(o),
    f = Math.round(c.hp * (d.maxHp ?? 1)),
    h = Math.round(c.tp * (d.maxTp ?? 1)),
    p = l.guild.party.front.includes(i);
  return {
    id: i,
    name: o.name,
    side: 'ally',
    row: p ? 'front' : 'back',
    stats: c,
    equip: N1(o),
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
function L1(l, i, o) {
  const r = cl[l],
    c = c1(r, o),
    d = Ah(o);
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
function zh(l, i, o, r, c) {
  const d = Vn[l],
    f = Eh(d.baseStats, nd(i, d.refDepth)),
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
function Op(l, i, o = 'none') {
  var p, g;
  const r = ((p = l.diveState) == null ? void 0 : p.depth) ?? 1,
    d = [...l.guild.party.front, ...l.guild.party.back]
      .filter((y) => y !== null)
      .map((y) => A1(l, y))
      .filter((y) => y !== null),
    f = i.map((y, v) => L1(y, v, r)),
    h = (((g = l.diveState) == null ? void 0 : g.persistentSummons) ?? [])
      .map((y, v) => zh(y.summonKind, r, y.ownerId, `summon_persist_${v}`, y.hp))
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
  q1 = (l, i) => {
    var o;
    return ((o = l.resist) == null ? void 0 : o[i]) ?? 1;
  };
function Hh(l, i, o) {
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
function zc(l, i) {
  l.isDown || (l.unionGauge = Yl(l.unionGauge + i, 0, 100));
}
function Hc(l, i) {
  dd(l) ||
    ((l.buffs = l.buffs.filter((o) => !(o.stat === i.stat && o.stackGroup === i.stackGroup))),
    l.buffs.push(i));
}
function B1(l, i) {
  if (dd(l)) return;
  const o = l.ailments.find((r) => r.type === i.type);
  if (o) {
    o.remainingTurns = Math.max(o.remainingTurns, i.remainingTurns);
    return;
  }
  l.ailments.push(i);
}
function wr(l, i) {
  dd(l) || (l.states = [...(l.states ?? []).filter((o) => o.kind !== i.kind), i]);
}
function O1(l, i) {
  return i.side === 'ally' ? [..._t(l, 'ally'), ...Zr(l)] : _t(l, 'enemy');
}
function I1(l, i, o) {
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
function Rr(l, i, o, r, c, d = {}) {
  if (o.isDown) return { hit: !1, dealt: 0 };
  const f = _1(
    i,
    o,
    {
      statBase: r.statBase,
      power: r.power,
      element: r.element,
      elementMultiplier: q1(o, r.element),
    },
    c
  );
  if (!f.hit) return (l.log.push({ text: `${i.name} の攻撃は外れた` }), { hit: !1, dealt: 0 });
  const h = I1(o, f.damage, l.log);
  return (
    Hh(o, h, l.log),
    d.actorUnion && zc(i, d.actorUnion),
    zc(o, 5),
    h > 0 &&
      l.log.push({
        text: `${i.name} の攻撃！ ${o.name} に ${h} ダメージ${f.critical ? '（会心）' : ''}`,
      }),
    { hit: !0, dealt: h }
  );
}
function Uh(l, i, o, r, c, d) {
  if (!o.isDown && !i.isDown && o.side !== i.side)
    for (const f of o.states ?? []) {
      if (f.kind !== 'counter' || d.next() >= f.chance) continue;
      l.log.push({ text: `${o.name} の反撃！` });
      const h = f.statBase === 'str' ? 'bash' : 'almighty';
      if ((Rr(l, o, i, { statBase: f.statBase, power: f.power, element: h }, d), i.isDown)) break;
    }
  if (c > 0 && o.side !== i.side) {
    for (const f of O1(l, i))
      if (!(f.id === i.id || f.isDown || o.isDown))
        for (const h of f.states ?? [])
          h.kind === 'chase' &&
            ((h.element !== r && h.element !== 'almighty' && r !== 'almighty') ||
              (l.log.push({ text: `${f.name} の連携追撃！` }),
              Rr(l, f, o, { statBase: h.statBase, power: h.power, element: h.element }, d)));
  }
}
function M1(l, i, o) {
  return Yl(l * (1 + (i.stats.luc - o.stats.luc) * $e.AILMENT_LUC_K), 0, $e.AILMENT_MAX);
}
function Gh(l, i, o, r) {
  const c = i.side === 'ally' ? 'enemy' : 'ally';
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
      return _t(l, c);
    case 'enemyRow':
    case 'enemyOne':
    default: {
      const d = Ul(l, r);
      return d && d.side === c && !d.isDown ? [d] : _t(l, c).slice(0, 1);
    }
  }
}
function D1(l, i, o, r) {
  return Gh(l, i, o.target, r);
}
function $h(l, i, o, r, c, d, f) {
  switch (o.kind) {
    case 'damage': {
      const h = o.hits ?? 1,
        p = o.power(c);
      for (const g of d) {
        if (g.isDown) continue;
        let y = !1,
          v = 0;
        for (let B = 0; B < h && !g.isDown; B++) {
          const A = Rr(l, i, g, { statBase: o.statBase, power: p, element: r }, f);
          A.hit && ((y = !0), (v += A.dealt));
        }
        y && Uh(l, i, g, r, v, f);
      }
      break;
    }
    case 'heal': {
      const h = o.amount(c);
      for (const p of d) p.isDown || (p.hp = Yl(p.hp + h, 0, p.maxHp));
      l.log.push({ text: `${i.name} は回復魔法を使った（+${h}）` });
      break;
    }
    case 'buff': {
      for (const h of d)
        Hc(h, {
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
        const p = M1(o.chance(c), i, h);
        f.next() < p &&
          (B1(h, { type: o.ailment, remainingTurns: o.turns, magnitude: o.magnitude }),
          l.log.push({ text: `${h.name} は${j1[o.ailment]}になった` }));
      }
      break;
    }
    case 'summon': {
      if (i.side !== 'ally') break;
      if (Zr(l).length >= C1) {
        l.log.push({ text: 'これ以上は召喚できない' });
        break;
      }
      const h = `summon_${l.turn}_${l.summons.length}`,
        p = zh(o.summonKind, l.depth, i.id, h);
      (l.summons.push(p), l.log.push({ text: `${i.name} は ${p.name} を召喚した！` }));
      break;
    }
    case 'counter': {
      for (const h of d)
        h.isDown ||
          wr(h, {
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
          wr(h, {
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
        h.isDown || wr(h, { kind: 'decoy', weight: o.weight(c), remainingTurns: o.turns });
      l.log.push({ text: `${i.name} は敵の注意を引きつけた` });
      break;
    }
    case 'barrier': {
      for (const h of d)
        h.isDown || wr(h, { kind: 'barrier', absorb: o.absorb(c), remainingTurns: o.turns });
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
function xc(l, i, o, r) {
  var f;
  if (o.isDown) return;
  const c = i.enemyId
      ? (cl[i.enemyId].attackElement ?? 'bash')
      : i.isSummon && i.summonKind
        ? (((f = Vn[i.summonKind]) == null ? void 0 : f.attackElement) ?? 'bash')
        : 'bash',
    d = Rr(l, i, o, { statBase: 'str', power: 1, element: c }, r, { actorUnion: 5 });
  d.hit && Uh(l, i, o, c, d.dealt, r);
}
const Ip = (l) => (l.length === 0 ? 0 : l.reduce((i, o) => i + o.stats.agi, 0) / l.length);
function R1(l, i) {
  const o = l.map(
      (d) => 1 + (d.states ?? []).reduce((f, h) => f + (h.kind === 'decoy' ? h.weight : 0), 0)
    ),
    r = o.reduce((d, f) => d + f, 0);
  let c = i.next() * r;
  for (let d = 0; d < l.length; d++) if (((c -= o[d]), c < 0)) return l[d];
  return l[l.length - 1];
}
const z1 = (l) => l.ailments.some((i) => i.type === 'paralysis'),
  H1 = (l) => l.ailments.some((i) => i.type === 'sleep'),
  md = (l, i) => l.ailments.some((o) => o.type === i),
  Sc = (l) => md(l, 'armBind'),
  U1 = (l) => md(l, 'headBind'),
  G1 = (l) => md(l, 'legBind');
function Mp(l) {
  return l.effects.some((i) => i.kind === 'damage' && i.statBase === 'str');
}
function $1(l, i, o) {
  const r = zn[i.unionSkillId];
  if (!r) return;
  const c = Ul(l, i.actorId);
  if (!c || c.isDown || c.side !== 'ally') return;
  if (c.unionGauge < 100) {
    l.log.push({ text: `${c.name} はユニオンゲージが足りない` });
    return;
  }
  const d = new Set(i.participantIds);
  d.add(c.id);
  const f = [...d].map((y) => Ul(l, y)).filter((y) => !!y && !y.isDown && y.side === 'ally');
  if (f.length < r.requiredParticipants) {
    l.log.push({ text: `${c.name} の${r.name}は参加人数が足りない` });
    return;
  }
  const h = [c, ...f.filter((y) => y.id !== c.id)].slice(0, r.requiredParticipants);
  for (const y of h) y.unionGauge = Yl(y.unionGauge - r.gaugeCostPerParticipant, 0, 100);
  l.log.push({ text: `ユニオン！ ${c.name} の${r.name}！` });
  const p = 1,
    g = Gh(l, c, r.target, i.targetId);
  for (const y of r.effects) $h(l, c, y, r.element, p, g, o);
}
function Y1(l, i, o) {
  var B, A, I;
  if (l.outcome !== 'ongoing') return l;
  const r = structuredClone({ ...l, log: [] }),
    c = r.log.push.bind(r.log);
  r.log.push = (...w) => {
    const x = c(...w),
      S = {};
    for (const j of [...r.allies, ...r.enemies, ...r.summons])
      S[j.id] = { hp: j.hp, isDown: j.isDown };
    for (const j of w) j.snapshot = S;
    return x;
  };
  const d = new Map(i.filter((w) => w.kind !== 'union').map((w) => [w.actorId, w])),
    f = r.turn === 1 && r.firstStrike !== 'none',
    h = f && r.firstStrike === 'preemptive',
    p = f && r.firstStrike === 'ambush';
  if (
    (h && r.log.push({ text: '先制攻撃！ 味方が先手を取った' }),
    p && r.log.push({ text: '不意打ち！ 敵に先手を取られた' }),
    !p)
  )
    for (const w of i) w.kind === 'union' && $1(r, w, o);
  const g = i.find((w) => w.kind === 'flee');
  if (!p && g && r.outcome === 'ongoing') {
    const w = Ul(r, g.actorId);
    if (w && G1(w)) r.log.push({ text: `${w.name} は脚を封じられて逃げられない` });
    else {
      const x = Yl(0.5 + (Ip(_t(r, 'ally')) - Ip(_t(r, 'enemy'))) * 0.02, 0.1, 0.95);
      if (o.next() < x)
        return (r.log.push({ text: 'うまく逃げ切れた！' }), (r.outcome = 'fled'), r);
      r.log.push({ text: '逃げられなかった！' });
    }
  }
  if (!p)
    for (const w of i) {
      if (w.kind !== 'guard') continue;
      const x = Ul(r, w.actorId);
      !x ||
        x.isDown ||
        (Hc(x, { stat: 'pdef', modifier: 1.5, remainingTurns: 1, stackGroup: 'guard' }),
        Hc(x, { stat: 'mdef', modifier: 1.5, remainingTurns: 1, stackGroup: 'guard' }));
    }
  const y = new Map();
  if (!h)
    for (const w of _t(r, 'enemy')) {
      const x = [...Zr(r), ..._t(r, 'ally')];
      x.length > 0 && y.set(w.id, R1(x, o).id);
    }
  const v = [...r.allies, ...r.enemies, ...r.summons]
    .filter((w) => !w.isDown)
    .filter((w) => !(h && w.side === 'enemy') && !(p && w.side === 'ally'))
    .map((w) => ({ c: w, agi: w.stats.agi, tie: o.next() }))
    .sort((w, x) => x.agi - w.agi || x.tie - w.tie)
    .map((w) => w.c);
  for (const w of v)
    if (!w.isDown) {
      if (r.outcome !== 'ongoing') break;
      if (H1(w)) {
        r.log.push({ text: `${w.name} は眠っている` });
        continue;
      }
      if (z1(w) && o.next() < $e.PARALYSIS_SKIP) {
        r.log.push({ text: `${w.name} は麻痺で動けない` });
        continue;
      }
      if (w.isSummon) {
        const x = w.summonKind ? Vn[w.summonKind] : void 0;
        if (x != null && x.actsOnTurn) {
          const S = _t(r, 'enemy');
          S.length > 0 && xc(r, w, o.pick(S), o);
        }
        if (_t(r, 'enemy').length === 0) break;
        continue;
      }
      if (w.side === 'enemy') {
        if (Sc(w)) {
          r.log.push({ text: `${w.name} は腕を封じられて攻撃できない` });
          continue;
        }
        const x = y.get(w.id),
          S = x ? Ul(r, x) : void 0,
          j = S && !S.isDown ? S : _t(r, 'ally')[0];
        j && xc(r, w, j, o);
      } else {
        const x = d.get(w.id);
        if (!x || x.kind === 'guard' || x.kind === 'flee') continue;
        if (x.kind === 'attack') {
          if (Sc(w)) {
            r.log.push({ text: `${w.name} は腕を封じられて攻撃できない` });
            continue;
          }
          const S = Ul(r, x.targetId),
            j = S && !S.isDown ? S : _t(r, 'enemy')[0];
          j && xc(r, w, j, o);
        } else if (x.kind === 'skill') {
          const S = Wt[x.skillId];
          if (!S) continue;
          if (Mp(S) && Sc(w)) {
            r.log.push({ text: `${w.name} は腕を封じられてスキルを使えない` });
            continue;
          }
          if (!Mp(S) && U1(w)) {
            r.log.push({ text: `${w.name} は頭を封じられてスキルを使えない` });
            continue;
          }
          const j = 1,
            G = S.tpCost(j);
          if (w.tp < G) {
            r.log.push({ text: `${w.name} は TP が足りない` });
            continue;
          }
          ((w.tp -= G), zc(w, 10));
          const M = D1(r, w, S, x.targetId);
          for (const ee of S.effects) $h(r, w, ee, S.element, j, M, o);
        } else if (x.kind === 'item') {
          const S = Fe[x.itemId];
          if (!S || !((B = S.useContext) != null && B.includes('battle'))) continue;
          const j = Ul(r, x.targetId) ?? w;
          for (const G of S.effects ?? [])
            G.kind === 'heal'
              ? (j.hp = Yl(j.hp + G.amount(1), 0, j.maxHp))
              : G.kind === 'restoreTp' && (j.tp = Yl(j.tp + G.amount(1), 0, j.maxTp));
          (r.consumedItems.push(x.itemId), r.log.push({ text: `${w.name} は ${S.name} を使った` }));
        }
      }
      if (_t(r, 'enemy').length === 0 || _t(r, 'ally').length === 0) break;
    }
  for (const w of [...r.allies, ...r.enemies, ...r.summons]) {
    if (w.isDown) continue;
    const x = w.ailments.find((S) => S.type === 'poison');
    if (x) {
      const S = x.magnitude ?? Math.max(1, Math.floor(w.maxHp * $e.POISON_HP_RATIO));
      (Hh(w, S, r.log), r.log.push({ text: `${w.name} は毒で ${S} のダメージ` }));
    }
  }
  for (const w of [...r.allies, ...r.enemies, ...r.summons])
    (!w.isDown &&
      w.maxTp > 0 &&
      (w.tp = Math.min(w.maxTp, w.tp + Math.ceil(w.maxTp * $e.TP_REGEN_RATIO))),
      (w.buffs = w.buffs
        .map((x) => ({ ...x, remainingTurns: x.remainingTurns - 1 }))
        .filter((x) => x.remainingTurns > 0)),
      (w.ailments = w.ailments
        .map((x) => ({ ...x, remainingTurns: x.remainingTurns - 1 }))
        .filter((x) => x.remainingTurns > 0)),
      w.states &&
        w.states.length > 0 &&
        (w.states = w.states
          .map((x) => ({ ...x, remainingTurns: x.remainingTurns - 1 }))
          .filter((x) => x.remainingTurns > 0)));
  for (const w of r.enemies)
    if (
      !(
        !w.isDown ||
        !w.enemyId ||
        (((A = l.enemies.find((S) => S.id === w.id)) == null ? void 0 : A.isDown) ?? !1)
      )
    )
      for (const S of cl[w.enemyId].drops ?? [])
        o.next() < S.rate &&
          (r.drops.push({ enemyId: w.enemyId, itemId: S.itemId }),
          r.log.push({
            text: `${w.name} は ${((I = Fe[S.itemId]) == null ? void 0 : I.name) ?? S.itemId} を落とした`,
          }));
  return (
    (r.summons = r.summons.filter((w) => !w.isDown)),
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
    const c = cl[r.enemyId],
      d = nd(l.depth, c.refDepth);
    ((i += Math.round(c.exp * d)), (o += Math.round(c.gold * d)));
  }
  return { exp: i, gold: o };
}
function X1(l, i) {
  if (i.outcome !== 'win' || !l.diveState) return [];
  const { exp: o } = _d(i),
    r = new Set(l.diveState.party.map((f) => f.charId)),
    c = r.size > 0 ? Math.floor(o / r.size) : 0,
    d = [];
  for (const f of l.guild.members) {
    if (!r.has(f.id)) continue;
    const h = Yh(f, c),
      p = {};
    if (h.level > f.level) {
      const g = $l(f),
        y = $l(h);
      for (const v of Object.keys(g)) {
        const B = Math.round(y[v] - g[v]);
        B !== 0 && (p[v] = B);
      }
    }
    d.push({
      charId: f.id,
      name: f.name,
      gainedExp: Ki(f.level) ? c : 0,
      fromLevel: f.level,
      toLevel: h.level,
      exp: h.exp,
      expToNext: Ki(h.level) ? Dc(h.level) : 0,
      statGains: p,
    });
  }
  return d;
}
function Yh(l, i) {
  let o = l.level,
    r = l.exp + (Ki(o) ? i : 0),
    c = l.skillPoints.total;
  for (; Ki(o) && r >= Dc(o); ) ((r -= Dc(o)), (o += 1), (c += r1(o)));
  return {
    ...l,
    level: o,
    exp: Ki(l.level) ? r : l.exp,
    skillPoints: { ...l.skillPoints, total: c },
  };
}
function Dp(l, i) {
  if (!l.diveState) return l;
  const o = i.outcome === 'win',
    r = i.outcome === 'win' || i.outcome === 'fled',
    c = new Map(i.allies.map((A) => [A.id, A])),
    d = l.diveState.party.map((A) => {
      const I = c.get(A.charId);
      if (!I) return A;
      let w = I.unionGauge;
      return (
        r && !I.isDown && (w = Yl(w + $e.UNION_GAIN_ON_WIN, 0, 100)),
        { ...A, hp: I.hp, tp: I.tp, unionGauge: w, ailments: I.ailments }
      );
    });
  let f = l.guild.members,
    h = l.guild.gold;
  const p = { ...l.bestiary.monsters };
  for (const A of i.enemies) {
    if (!A.enemyId) continue;
    const I = p[A.enemyId] ?? { seen: !1, defeated: !1, dropsFound: [] };
    p[A.enemyId] = { ...I, seen: !0, defeated: I.defeated || A.isDown };
  }
  if (o)
    for (const A of i.drops) {
      const I = p[A.enemyId];
      I &&
        !I.dropsFound.includes(A.itemId) &&
        (p[A.enemyId] = { ...I, dropsFound: [...I.dropsFound, A.itemId] });
    }
  const g = { ...l.bestiary, monsters: p };
  if (o) {
    const { exp: A, gold: I } = _d(i);
    h += I;
    const w = new Set(d.map((S) => S.charId)),
      x = w.size > 0 ? Math.floor(A / w.size) : 0;
    f = f.map((S) => (w.has(S.id) ? Yh(S, x) : S));
  }
  const y = i.summons
    .filter((A) => {
      var I;
      return (
        !A.isDown &&
        A.summonKind &&
        ((I = Vn[A.summonKind]) == null ? void 0 : I.persistsAfterBattle)
      );
    })
    .map((A) => ({ summonKind: A.summonKind, ownerId: A.ownerId ?? '', hp: A.hp }));
  let v = {
    ...l,
    guild: { ...l.guild, members: f, gold: h, bestiary: g },
    bestiary: g,
    diveState: { ...l.diveState, party: d, persistentSummons: y },
  };
  for (const A of i.consumedItems) v = rd(v, A, 1);
  const B = Ah(i.depth);
  if (o) for (const A of i.drops) v = sd(v, A.itemId, 1, B);
  return v;
}
const V1 = 8,
  Uc = 16,
  Zi = 5;
function fd(l) {
  return l.range(V1, Uc);
}
function Q1(l, i) {
  const o = l - 1;
  return o <= 0
    ? { stepsUntilEncounter: fd(i), triggered: !0 }
    : { stepsUntilEncounter: o, triggered: !1 };
}
function K1(l) {
  const i = Math.max(0, Uc - l),
    o = Math.round((i / Uc) * Zi);
  return Math.min(Zi, Math.max(0, o));
}
const el = { N: { dx: 0, dy: -1 }, E: { dx: 1, dy: 0 }, S: { dx: 0, dy: 1 }, W: { dx: -1, dy: 0 } },
  Gn = ['N', 'E', 'S', 'W'];
function Xh(l) {
  return Gn[(Gn.indexOf(l) + 1) % 4];
}
function Vh(l) {
  return Gn[(Gn.indexOf(l) + 3) % 4];
}
function Z1(l) {
  return Gn[(Gn.indexOf(l) + 2) % 4];
}
const Qh = (l, i, o) => l >= 0 && i >= 0 && l < o.width && i < o.height;
function Ua(l, i, o, r) {
  if (l.cells[o][i].walls[r]) return !1;
  const c = i + el[r].dx,
    d = o + el[r].dy;
  return Qh(c, d, l) ? l.cells[d][c].passable : !1;
}
function J1(l, i, o) {
  return Ua(l, i.x, i.y, o) ? { x: i.x + el[o].dx, y: i.y + el[o].dy } : null;
}
function pd(l, i, o) {
  return ['N', 'E', 'S', 'W'].filter((r) => !l.cells[o][i].walls[r]);
}
function P1(l, i, o) {
  if (i.x === o.x && i.y === o.y) return [];
  if (!Qh(o.x, o.y, l) || !l.cells[o.y][o.x].passable) return null;
  const r = (f, h) => `${f},${h}`,
    c = new Map();
  c.set(r(i.x, i.y), null);
  const d = [{ ...i }];
  for (; d.length > 0; ) {
    const f = d.shift();
    for (const h of ['N', 'E', 'S', 'W']) {
      if (!Ua(l, f.x, f.y, h)) continue;
      const p = f.x + el[h].dx,
        g = f.y + el[h].dy,
        y = r(p, g);
      if (!c.has(y)) {
        if ((c.set(y, { x: f.x, y: f.y, dir: h }), p === o.x && g === o.y)) {
          const v = [];
          let B = y;
          for (;;) {
            const A = c.get(B);
            if (!A) break;
            (v.unshift(A.dir), (B = r(A.x, A.y)));
          }
          return v;
        }
        d.push({ x: p, y: g });
      }
    }
  }
  return null;
}
const Rp = ['N', 'E', 'S', 'W'],
  wc = (l, i) => Math.abs(l.x - i.x) + Math.abs(l.y - i.y);
function F1(l, i, o, r, c) {
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
    !y.alerted && wc(y.cell, o) <= v.sightRange && (y.alerted = !0);
    const B = (A) => {
      if (!Ua(l, y.cell.x, y.cell.y, A)) return 'blocked';
      const I = y.cell.x + el[A].dx,
        w = y.cell.y + el[A].dy;
      if (I === o.x && w === o.y) {
        const x = A === r;
        return (
          (p = { spawnId: y.spawnId, enemyId: v.enemyId, firstStrike: x ? 'ambush' : 'none' }),
          'contact'
        );
      }
      return h.has(`${I},${w}`)
        ? 'blocked'
        : (h.delete(`${y.cell.x},${y.cell.y}`),
          (y.cell = { x: I, y: w }),
          h.add(`${I},${w}`),
          'moved');
    };
    if (y.alerted)
      for (let A = 0; A < v.moveSpeed; A++) {
        let I = null,
          w = wc(y.cell, o),
          x = !1;
        for (const j of Rp) {
          const G = y.cell.x + el[j].dx,
            M = y.cell.y + el[j].dy;
          if (G === o.x && M === o.y && Ua(l, y.cell.x, y.cell.y, j)) {
            ((I = j), (x = !0));
            break;
          }
          if (!Ua(l, y.cell.x, y.cell.y, j) || h.has(`${G},${M}`)) continue;
          const ee = wc({ x: G, y: M }, o);
          ee < w && ((w = ee), (I = j));
        }
        if (!I) break;
        const S = B(I);
        if (S === 'contact' || S === 'blocked' || x) break;
      }
    else {
      const A = v.patrol;
      if (A.kind === 'wander') {
        const I = Rp.filter(
          (w) =>
            Ua(l, y.cell.x, y.cell.y, w) && !h.has(`${y.cell.x + el[w].dx},${y.cell.y + el[w].dy}`)
        );
        I.length > 0 && B(c.pick(I));
      } else A.kind === 'charge' && B(A.dir);
    }
  }
  return { foes: d, contact: p };
}
const Ga = {
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
  W1 = Object.keys(Ga);
function ex(l) {
  const i = Object.values(cl)
    .filter((o) => o.tierBand === l && o.kind === 'foe')
    .map((o) => o.id);
  return i.length > 0
    ? i
    : Object.values(cl)
        .filter((o) => o.tierBand === l && !o.isBoss && o.kind !== 'foe')
        .map((o) => o.id);
}
function tx(l) {
  const i = Object.values(cl).filter((r) => r.isBoss);
  if (i.length === 0) return null;
  const o = i.filter((r) => r.tierBand === l);
  return o.length > 0 ? o[0].id : i.sort((r, c) => c.tierBand - r.tierBand)[0].id;
}
function lx(l, i, o, r, c) {
  for (const d of ['N', 'E', 'S', 'W']) {
    if (l[o][i].walls[d]) continue;
    const f = i + sl[d].dx,
      h = o + sl[d].dy;
    if (zr(f, h, r, c) && !l[h][f].event) return { x: f, y: h };
  }
  return null;
}
const sl = { N: { dx: 0, dy: -1 }, E: { dx: 1, dy: 0 }, S: { dx: 0, dy: 1 }, W: { dx: -1, dy: 0 } },
  ax = { N: 'S', E: 'W', S: 'N', W: 'E' };
function nx(l) {
  return Math.min(25, 15 + Math.floor(l / 5));
}
function ix() {
  return { walls: { N: !0, E: !0, S: !0, W: !0 }, floorType: 'normal', passable: !0 };
}
const zr = (l, i, o, r) => l >= 0 && i >= 0 && l < o && i < r;
function zp(l, i, o, r) {
  const { dx: c, dy: d } = sl[r];
  ((l[o][i].walls[r] = !1), (l[o + d][i + c].walls[ax[r]] = !1));
}
function sx(l, i, o) {
  const r = l.length,
    c = l[0].length,
    d = Array.from({ length: r }, () => Array(c).fill(-1)),
    f = [{ x: i, y: o }];
  d[o][i] = 0;
  for (let h = 0; h < f.length; h++) {
    const { x: p, y: g } = f[h];
    for (const y of ['N', 'E', 'S', 'W']) {
      if (l[g][p].walls[y]) continue;
      const v = p + sl[y].dx,
        B = g + sl[y].dy;
      !zr(v, B, c, r) || d[B][v] !== -1 || ((d[B][v] = d[g][p] + 1), f.push({ x: v, y: B }));
    }
  }
  return d;
}
function rx(l, i) {
  const o = nx(l),
    r = o,
    c = o,
    d = Array.from({ length: c }, () => Array.from({ length: r }, () => ix())),
    f = Array.from({ length: c }, () => Array(r).fill(!1)),
    h = i.int(r),
    p = i.int(c),
    g = [{ x: h, y: p }];
  for (f[p][h] = !0; g.length > 0; ) {
    const Y = g[g.length - 1],
      C = [];
    for (const le of ['N', 'E', 'S', 'W']) {
      const ue = Y.x + sl[le].dx,
        ye = Y.y + sl[le].dy;
      zr(ue, ye, r, c) && !f[ye][ue] && C.push(le);
    }
    if (C.length === 0) {
      g.pop();
      continue;
    }
    const K = i.pick(C);
    zp(d, Y.x, Y.y, K);
    const te = Y.x + sl[K].dx,
      de = Y.y + sl[K].dy;
    ((f[de][te] = !0), g.push({ x: te, y: de }));
  }
  const y = Math.floor((r * c) / 25);
  for (let Y = 0; Y < y; Y++) {
    const C = i.int(r),
      K = i.int(c),
      te = i.pick(['N', 'E', 'S', 'W']),
      de = C + sl[te].dx,
      le = K + sl[te].dy;
    zr(de, le, r, c) && d[K][C].walls[te] && zp(d, C, K, te);
  }
  const v = i.int(r),
    B = i.int(c),
    A = sx(d, v, B);
  let I = v,
    w = B,
    x = -1;
  for (let Y = 0; Y < c; Y++)
    for (let C = 0; C < r; C++) A[Y][C] > x && ((x = A[Y][C]), (I = C), (w = Y));
  ((d[B][v].event = { kind: 'stairsDown' }), (d[w][I].event = { kind: 'stairsUp' }));
  const S = Nh(l),
    j = [];
  if (Qi(l)) {
    const Y = tx(S);
    if (Y) {
      const C = lx(d, I, w, r, c) ?? { x: I, y: w };
      j.push({
        id: 'boss',
        enemyId: Y,
        startCell: C,
        patrol: { kind: 'static' },
        moveSpeed: 0,
        sightRange: 0,
        respawn: !1,
        isBoss: !0,
      });
    }
  } else {
    const Y = ex(S),
      C = 1 + Math.floor(l / 8);
    for (let K = 0; K < C && Y.length > 0; K++) {
      let te = i.int(r),
        de = i.int(c);
      for (let le = 0; le < 20; le++) {
        ((te = i.int(r)), (de = i.int(c)));
        const ue = d[de][te].event,
          ye = Math.abs(te - v) + Math.abs(de - B) >= 3;
        if (!ue && ye) break;
      }
      j.push({
        id: `foe_${K}`,
        enemyId: i.pick(Y),
        startCell: { x: te, y: de },
        patrol: { kind: 'wander' },
        moveSpeed: 1,
        sightRange: 3,
        respawn: !1,
      });
    }
  }
  const G = [],
    M = () => {
      for (let Y = 0; Y < 25; Y++) {
        const C = i.int(r),
          K = i.int(c),
          te = Math.abs(C - v) + Math.abs(K - B) >= 2;
        if (!d[K][C].event && te) return { x: C, y: K };
      }
      return null;
    },
    ee = 2 + Math.floor(l / 10);
  for (let Y = 0; Y < ee; Y++) {
    const C = M();
    if (!C) break;
    const K = i.pick(W1),
      te = `gather_${Y}`;
    ((d[C.y][C.x].event = { kind: 'gather', gatherId: te }), G.push({ id: te, cell: C, type: K }));
  }
  if (!Qi(l)) {
    const Y = M();
    Y && (d[Y.y][Y.x].event = { kind: 'cookingSpot', spotId: 'cook_0' });
  }
  return {
    depth: l,
    width: r,
    height: c,
    cells: d,
    encounterTable: `band_${S}`,
    foeSpawns: j,
    gatheringPoints: G,
    bgmId: Qi(l) ? 'bgm_boss' : 'bgm_dungeon',
  };
}
function Kh(l, i) {
  var o;
  for (let r = 0; r < l.height; r++)
    for (let c = 0; c < l.width; c++)
      if (((o = l.cells[r][c].event) == null ? void 0 : o.kind) === i) return { x: c, y: r };
  return null;
}
const ox = 4294967296;
function ux(l, i) {
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
class hd {
  constructor(i, o) {
    mc(this, 'baseSeed');
    mc(this, '_state');
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
      ((i ^ (i >>> 14)) >>> 0) / ox
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
function cx() {
  return Math.floor(Math.random() * 4294967296) >>> 0;
}
const Hr = (l, i) => `${l},${i}`;
function dx(l, i) {
  return ba(l).fork(`floor:${i}`);
}
function Zh(l, i) {
  const o = l.towerState.floors[i];
  if (o) return { save: l, floor: o };
  const r = rx(i, dx(l.masterSeed, i)),
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
      isBossFloor: Qi(i),
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
function mx(l) {
  const i = [...l.guild.party.front, ...l.guild.party.back].filter((r) => r !== null),
    o = [];
  for (const r of i) {
    const c = l.guild.members.find((f) => f.id === r);
    if (!c) continue;
    const d = $l(c);
    o.push({ charId: r, hp: d.hp, tp: d.tp, unionGauge: 0, ailments: [] });
  }
  return o;
}
function Ur(l, i, o, r) {
  const c = l.towerState.floors[i].generated,
    d = new Set(l.exploredCells[i] ?? []);
  d.add(Hr(o, r));
  for (const f of pd(c, o, r)) {
    const h = o + (f === 'E' ? 1 : f === 'W' ? -1 : 0),
      p = r + (f === 'S' ? 1 : f === 'N' ? -1 : 0);
    d.add(Hr(h, p));
  }
  return { ...l, exploredCells: { ...l.exploredCells, [i]: [...d] } };
}
function Jh(l, i, o) {
  var p, g;
  const r = Zh(l, i);
  let c = r.save;
  const d = r.floor.generated,
    f = Kh(d, 'stairsDown') ?? { x: 0, y: 0 },
    h = pd(d, f.x, f.y)[0] ?? 'N';
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
        party: ((p = c.diveState) == null ? void 0 : p.party) ?? mx(c),
        persistentSummons: ((g = c.diveState) == null ? void 0 : g.persistentSummons) ?? [],
        encounter: { stepsUntilEncounter: fd(o) },
        pendingFoeBattle: null,
      },
    }),
    Ur(c, i, f.x, f.y)
  );
}
function Hp(l, i = 1) {
  const o = ba(l.masterSeed).fork(`dive:${l.towerState.record.totalDives}`),
    r = {
      ...l,
      diveState: null,
      towerState: {
        ...l.towerState,
        record: { ...l.towerState.record, totalDives: l.towerState.record.totalDives + 1 },
      },
    };
  return Jh(r, i, o);
}
function Ph(l, i) {
  return l.diveState ? { ...l, diveState: { ...l.diveState, dir: i } } : l;
}
function Fh(l, i, o) {
  const r = l.towerState.floors[i];
  return {
    ...l,
    towerState: {
      ...l.towerState,
      floors: { ...l.towerState.floors, [i]: { ...r, foeRuntime: o } },
    },
  };
}
function Up(l, i, o) {
  const r = l.diveState;
  if (!r) return { save: l, moved: !1, triggered: !1 };
  const c = l.towerState.floors[r.depth],
    d = c.generated,
    f = J1(d, r.pos, i);
  if (!f) return { save: Ph(l, i), moved: !1, triggered: !1 };
  const h = c.foeRuntime.find((v) => !v.defeated && v.cell.x === f.x && v.cell.y === f.y);
  if (h) {
    const v = d.foeSpawns.find((I) => I.id === h.spawnId),
      B = v
        ? {
            spawnId: h.spawnId,
            enemyId: v.enemyId,
            firstStrike: v.isBoss ? 'none' : 'preemptive',
            isBoss: v.isBoss,
          }
        : null;
    let A = { ...l, diveState: { ...r, pos: f, dir: i, pendingFoeBattle: B } };
    return ((A = Ur(A, r.depth, f.x, f.y)), { save: A, moved: !0, triggered: B !== null });
  }
  const p = Q1(r.encounter.stepsUntilEncounter, o);
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
  g = Ur(g, r.depth, f.x, f.y);
  const y = F1(d, c.foeRuntime, f, i, o);
  return (
    (g = Fh(g, r.depth, y.foes)),
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
function _x(l, i) {
  const o = l.diveState;
  if (!o) return l;
  const r = o.pendingFoeBattle;
  let c = { ...l, diveState: { ...o, pendingFoeBattle: null } };
  if (r && i) {
    const f = c.towerState.floors[o.depth].foeRuntime.map((h) =>
      h.spawnId === r.spawnId ? { ...h, defeated: !0 } : h
    );
    ((c = Fh(c, o.depth, f)), r.isBoss && (c = fx(c, o.depth)));
  }
  return c;
}
function fx(l, i, o = Date.now()) {
  const r = l.towerState,
    c = { ...r.bossGates, [i]: { depth: i, defeated: !0 } },
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
    towerState: { ...r, bossGates: c, warp: { ...r.warp, unlockedCheckpoints: d }, record: h },
  };
}
function Wh(l, i) {
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
function px(l) {
  if (!l.diveState || !Wh(l, l.diveState.depth)) return l;
  const i = l.diveState.depth + 1,
    o = ba(l.masterSeed).fork(`enc:${i}:${l.towerState.record.totalDives}`);
  return Jh(l, i, o);
}
function hx(l) {
  if (!l.diveState) return l;
  const i = l.diveState.depth;
  if (i <= 1) return Pi(l);
  const o = i - 1,
    r = Zh(l, o),
    c = Kh(r.floor.generated, 'stairsUp') ?? { x: 0, y: 0 },
    d = ba(l.masterSeed).fork(`enc:${o}:${l.towerState.record.totalDives}`);
  let f = r.save;
  const h = r.floor.generated,
    p = pd(h, c.x, c.y)[0] ?? 'N';
  return (
    (f = {
      ...f,
      diveState: {
        ...f.diveState,
        depth: o,
        pos: { x: c.x, y: c.y },
        dir: p,
        encounter: { stepsUntilEncounter: fd(d) },
        pendingFoeBattle: null,
      },
    }),
    Ur(f, o, c.x, c.y)
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
function gx() {
  return Object.values(Qn)
    .filter((l) => l.unlockedByDefault)
    .map((l) => l.id);
}
const Br = 2,
  kx = { autoMap: 'on', bgmVolume: 0.6, seVolume: 0.6 };
function $p() {
  return { monsters: {}, items: {} };
}
function vx() {
  return { deepestReached: 0, highestBossDefeated: 0, totalDives: 0, bossDefeatLog: [] };
}
const yx = () => ({ weapon: null, armor: null, accessory: null });
function bx() {
  return `char_${Date.now().toString(36)}_${Math.floor(Math.random() * 16777215).toString(36)}`;
}
function eg(l) {
  var h;
  const { raceId: i, classId: o, name: r, id: c } = l;
  if (!St[i]) throw new Error(`createCharacter: 未定義の種族 "${i}"`);
  if (!tt[o]) throw new Error(`createCharacter: 未定義の職業 "${o}"`);
  const d = (h = tt[o].skillTree.skills[0]) == null ? void 0 : h.skillId,
    f = d ? { [d]: 1 } : {};
  return {
    id: c ?? bx(),
    name: r,
    raceId: i,
    classId: o,
    titleId: null,
    level: 1,
    exp: 0,
    skillPoints: { total: 0, spent: 0 },
    learnedSkills: f,
    equipment: yx(),
  };
}
function xx() {
  return { front: Array(Vr).fill(null), back: Array(Qr).fill(null) };
}
function Sx(l, i) {
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
function wx(l, i) {
  return l.guild.members.length >= Mc
    ? l
    : {
        ...l,
        guild: { ...l.guild, members: [...l.guild.members, i], party: Sx(l.guild.party, i.id) },
      };
}
function Tx(l) {
  return {
    schemaVersion: Br,
    savedAt: 0,
    masterSeed: cx(),
    settings: { ...kx },
    guild: {
      name: l,
      gold: n1,
      members: [],
      party: xx(),
      storage: [],
      equipment: [],
      foodStorage: [],
      bestiary: $p(),
    },
    towerState: { floors: {}, bossGates: {}, warp: { unlockedCheckpoints: [] }, record: vx() },
    diveState: null,
    bestiary: $p(),
    playerMaps: {},
    exploredCells: {},
    forgeInventory: { fragments: {}, ingots: { copper: 0, silver: 0, gold: 0 } },
    shopStock: { unlockedTier: 0, unlockedItemIds: [] },
    unlockedRecipeIds: gx(),
    flags: {},
  };
}
const Gc = (l, i) => i.some((o) => l instanceof o);
let Yp, Xp;
function Ex() {
  return Yp || (Yp = [IDBDatabase, IDBObjectStore, IDBIndex, IDBCursor, IDBTransaction]);
}
function Cx() {
  return (
    Xp ||
    (Xp = [
      IDBCursor.prototype.advance,
      IDBCursor.prototype.continue,
      IDBCursor.prototype.continuePrimaryKey,
    ])
  );
}
const $c = new WeakMap(),
  Tc = new WeakMap(),
  Jr = new WeakMap();
function jx(l) {
  const i = new Promise((o, r) => {
    const c = () => {
        (l.removeEventListener('success', d), l.removeEventListener('error', f));
      },
      d = () => {
        (o($a(l.result)), c());
      },
      f = () => {
        (r(l.error), c());
      };
    (l.addEventListener('success', d), l.addEventListener('error', f));
  });
  return (Jr.set(i, l), i);
}
function Nx(l) {
  if ($c.has(l)) return;
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
  $c.set(l, i);
}
let Yc = {
  get(l, i, o) {
    if (l instanceof IDBTransaction) {
      if (i === 'done') return $c.get(l);
      if (i === 'store')
        return o.objectStoreNames[1] ? void 0 : o.objectStore(o.objectStoreNames[0]);
    }
    return $a(l[i]);
  },
  set(l, i, o) {
    return ((l[i] = o), !0);
  },
  has(l, i) {
    return l instanceof IDBTransaction && (i === 'done' || i === 'store') ? !0 : i in l;
  },
};
function tg(l) {
  Yc = l(Yc);
}
function Ax(l) {
  return Cx().includes(l)
    ? function (...i) {
        return (l.apply(Xc(this), i), $a(this.request));
      }
    : function (...i) {
        return $a(l.apply(Xc(this), i));
      };
}
function Lx(l) {
  return typeof l == 'function'
    ? Ax(l)
    : (l instanceof IDBTransaction && Nx(l), Gc(l, Ex()) ? new Proxy(l, Yc) : l);
}
function $a(l) {
  if (l instanceof IDBRequest) return jx(l);
  if (Tc.has(l)) return Tc.get(l);
  const i = Lx(l);
  return (i !== l && (Tc.set(l, i), Jr.set(i, l)), i);
}
const Xc = (l) => Jr.get(l);
function qx(l, i, { blocked: o, upgrade: r, blocking: c, terminated: d } = {}) {
  const f = indexedDB.open(l, i),
    h = $a(f);
  return (
    r &&
      f.addEventListener('upgradeneeded', (p) => {
        r($a(f.result), p.oldVersion, p.newVersion, $a(f.transaction), p);
      }),
    o && f.addEventListener('blocked', (p) => o(p.oldVersion, p.newVersion, p)),
    h
      .then((p) => {
        (d && p.addEventListener('close', () => d()),
          c && p.addEventListener('versionchange', (g) => c(g.oldVersion, g.newVersion, g)));
      })
      .catch(() => {}),
    h
  );
}
const Bx = ['get', 'getKey', 'getAll', 'getAllKeys', 'count'],
  Ox = ['put', 'add', 'delete', 'clear'],
  Ec = new Map();
function Vp(l, i) {
  if (!(l instanceof IDBDatabase && !(i in l) && typeof i == 'string')) return;
  if (Ec.get(i)) return Ec.get(i);
  const o = i.replace(/FromIndex$/, ''),
    r = i !== o,
    c = Ox.includes(o);
  if (!(o in (r ? IDBIndex : IDBObjectStore).prototype) || !(c || Bx.includes(o))) return;
  const d = async function (f, ...h) {
    const p = this.transaction(f, c ? 'readwrite' : 'readonly');
    let g = p.store;
    return (r && (g = g.index(h.shift())), (await Promise.all([g[o](...h), c && p.done]))[0]);
  };
  return (Ec.set(i, d), d);
}
tg((l) => ({
  ...l,
  get: (i, o, r) => Vp(i, o) || l.get(i, o, r),
  has: (i, o) => !!Vp(i, o) || l.has(i, o),
}));
const Ix = ['continue', 'continuePrimaryKey', 'advance'],
  Qp = {},
  Vc = new WeakMap(),
  lg = new WeakMap(),
  Mx = {
    get(l, i) {
      if (!Ix.includes(i)) return l[i];
      let o = Qp[i];
      return (
        o ||
          (o = Qp[i] =
            function (...r) {
              Vc.set(this, lg.get(this)[i](...r));
            }),
        o
      );
    },
  };
async function* Dx(...l) {
  let i = this;
  if ((i instanceof IDBCursor || (i = await i.openCursor(...l)), !i)) return;
  i = i;
  const o = new Proxy(i, Mx);
  for (lg.set(o, i), Jr.set(o, Xc(i)); i; )
    (yield o, (i = await (Vc.get(o) || i.continue())), Vc.delete(o));
}
function Kp(l, i) {
  return (
    (i === Symbol.asyncIterator && Gc(l, [IDBIndex, IDBObjectStore, IDBCursor])) ||
    (i === 'iterate' && Gc(l, [IDBIndex, IDBObjectStore]))
  );
}
tg((l) => ({
  ...l,
  get(i, o, r) {
    return Kp(i, o) ? Dx : l.get(i, o, r);
  },
  has(i, o) {
    return Kp(i, o) || l.has(i, o);
  },
}));
const Rx = { 1: (l) => zx(l) },
  Cc = (l) => typeof l == 'object' && l !== null && !Array.isArray(l);
function zx(l) {
  const i = { ...l, schemaVersion: 2 };
  let o = 0;
  const r = (d) => ({ id: `eq_mig_${Date.now().toString(36)}_${o++}`, masterId: d, forgeLevel: 0 }),
    c = Cc(i.guild) ? { ...i.guild } : {};
  return (
    Array.isArray(c.equipment) || (c.equipment = []),
    Array.isArray(c.foodStorage) || (c.foodStorage = []),
    Array.isArray(c.members) &&
      (c.members = c.members.map((d) => {
        if (!Cc(d)) return d;
        const f = Cc(d.equipment) ? { ...d.equipment } : {};
        for (const h of ['weapon', 'armor', 'accessory']) {
          const p = f[h];
          f[h] = typeof p == 'string' ? r(p) : (p ?? null);
        }
        return { ...d, equipment: f };
      })),
    (i.guild = c),
    Array.isArray(i.unlockedRecipeIds) || (i.unlockedRecipeIds = []),
    i
  );
}
function Hx(l) {
  return structuredClone(l);
}
function Rn(l) {
  return typeof l == 'object' && l !== null && !Array.isArray(l);
}
function Ux(l) {
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
function ag(l) {
  if (!Rn(l) || typeof l.schemaVersion != 'number')
    return { ok: !1, reason: 'セーブデータの構造が不正です' };
  let i = l.schemaVersion;
  if (i > Br) return { ok: !1, reason: `未知のバージョン (${i} > ${Br}) のセーブデータです` };
  let o = { ...l };
  for (; i < Br; ) {
    const r = Rx[i];
    if (!r) return { ok: !1, reason: `バージョン ${i} の migration が未定義です` };
    ((o = r(o)), (i = typeof o.schemaVersion == 'number' ? o.schemaVersion : i + 1));
  }
  return Ux(o)
    ? { ok: !0, data: o }
    : { ok: !1, reason: 'migration 後のデータが SaveData の形をしていません' };
}
function Gx(l) {
  return {
    guildName: l.guild.name,
    deepestReached: l.towerState.record.deepestReached,
    memberCount: l.guild.members.length,
    savedAt: l.savedAt,
  };
}
function Zp() {
  return {
    guildName: '(破損データ)',
    deepestReached: 0,
    memberCount: 0,
    savedAt: 0,
    corrupted: !0,
  };
}
const $x = 'sekaiju-like-game',
  Yx = 1,
  Fi = 'saves',
  gd = 'main';
let jc = null;
function kd() {
  return (
    jc ||
      (jc = qx($x, Yx, {
        upgrade(l) {
          l.objectStoreNames.contains(Fi) || l.createObjectStore(Fi);
        },
      })),
    jc
  );
}
async function Nc(l) {
  const i = { ...l, savedAt: Date.now() };
  return (await (await kd()).put(Fi, Hx(i), gd), i);
}
async function Xx() {
  const i = await (await kd()).get(Fi, gd);
  return i === void 0 ? { ok: !1, reason: 'empty' } : ag(i);
}
async function Vx() {
  const i = await (await kd()).get(Fi, gd);
  if (i === void 0) return null;
  const o = ag(i);
  if (!o.ok) return Zp();
  try {
    return Gx(o.data);
  } catch {
    return Zp();
  }
}
const ng = { save: null, saving: !1 };
function Qx(l, i) {
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
      return { ...ng };
  }
}
const ig = E.createContext(null);
function Kx(l) {
  const i = E.useRef(l);
  return ((i.current = l), i);
}
function Zx({ children: l }) {
  const [i, o] = E.useReducer(Qx, ng),
    r = Kx(i),
    c = E.useCallback(async (v) => {
      const B = Tx(v),
        A = await Nc(B);
      o({ type: 'load', save: A });
    }, []),
    d = E.useCallback(async () => {
      const v = await Xx();
      return v.ok ? (o({ type: 'load', save: v.data }), { ok: !0 }) : { ok: !1, reason: v.reason };
    }, []),
    f = E.useCallback((v) => {
      o({ type: 'updateSave', updater: v });
    }, []),
    h = E.useCallback(
      async (v) => {
        const B = r.current.save;
        if (!B) return;
        const A = v(B);
        (o({ type: 'setSave', save: A }), o({ type: 'saving', saving: !0 }));
        try {
          const I = await Nc(A);
          o({ type: 'setSave', save: I });
        } finally {
          o({ type: 'saving', saving: !1 });
        }
      },
      [r]
    ),
    p = E.useCallback(async () => {
      const { save: v } = r.current;
      if (v) {
        o({ type: 'saving', saving: !0 });
        try {
          const B = await Nc(v);
          o({ type: 'setSave', save: B });
        } finally {
          o({ type: 'saving', saving: !1 });
        }
      }
    }, [r]),
    g = E.useCallback(() => {
      o({ type: 'clear' });
    }, []),
    y = E.useMemo(
      () => ({
        ...i,
        startNewGame: c,
        continueGame: d,
        applySave: f,
        applyAndPersist: h,
        persist: p,
        exitToTitle: g,
      }),
      [i, c, d, f, h, p, g]
    );
  return m.jsx(ig.Provider, { value: y, children: l });
}
function Vl() {
  const l = E.useContext(ig);
  if (!l) throw new Error('useGameState は GameStateProvider の内側で使ってください');
  return l;
}
const Jx = {
    slash: '斬',
    pierce: '突',
    bash: '壊',
    fire: '火',
    ice: '氷',
    volt: '雷',
    almighty: '無',
  },
  Px = {
    enemyOne: '敵単体',
    enemyRow: '敵1列',
    enemyAll: '敵全体',
    allyOne: '味方単体',
    allyAll: '味方全体',
    self: '自分',
  },
  Fx = {
    patk: '物攻',
    pdef: '物防',
    matk: '魔攻',
    mdef: '魔防',
    acc: '命中',
    eva: '回避',
    elementResist: '属性耐性',
  },
  Wx = {
    poison: '毒',
    paralysis: '麻痺',
    sleep: '睡眠',
    blind: '盲目',
    headBind: '頭封じ',
    armBind: '腕封じ',
    legBind: '脚封じ',
  };
function e3(l, i) {
  switch (l.kind) {
    case 'damage':
      return `${l.statBase === 'str' ? '物理' : '魔法'}威力${Math.round(l.power(i) * 100)}%${l.hits && l.hits > 1 ? `×${l.hits}` : ''}`;
    case 'heal':
      return `HP回復${l.amount(i)}`;
    case 'restoreTp':
      return `TP回復${l.amount(i)}`;
    case 'buff':
      return `${Fx[l.stat]}${l.modifier(i) < 1 ? '↓' : '↑'}`;
    case 'ailment':
      return `${Wx[l.ailment] ?? l.ailment}${Math.round(l.chance(i) * 100)}%`;
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
function Tr(l, i, o, r = 1) {
  return `${Jx[l] ?? l}・${Px[i] ?? i}／${o.map((c) => e3(c, r)).join('・')}`;
}
const t3 = {
  hp: 'HP',
  tp: 'TP',
  str: '腕力',
  vit: '体力',
  agi: '敏捷',
  int: '知力',
  mnd: '精神',
  luc: '幸運',
};
function l3(l) {
  const i = {};
  for (const o of [...l.allies, ...l.enemies, ...l.summons])
    i[o.id] = { hp: o.hp, isDown: o.isDown };
  return i;
}
const a3 = () => {
    var is, yt;
    const l = ml(),
      { save: i, applyAndPersist: o } = Vl(),
      r = E.useRef(null),
      [c, d] = E.useState(null),
      [f, h] = E.useState({}),
      [p, g] = E.useState(null),
      [y, v] = E.useState(!1),
      [B, A] = E.useState(!1),
      [I, w] = E.useState(null),
      [x, S] = E.useState(!1),
      [j, G] = E.useState(null),
      [M, ee] = E.useState(null),
      [Y, C] = E.useState(null),
      [K, te] = E.useState(new Set()),
      [de, le] = E.useState(!0),
      [ue, ye] = E.useState(null),
      [Se, ke] = E.useState([]);
    (E.useEffect(() => {
      if (c || !(i != null && i.diveState)) return;
      const q = i.diveState.depth,
        W = (i.masterSeed ^ (q * 2654435761) ^ (i.towerState.record.totalDives * 40503)) >>> 0;
      r.current = ba(W);
      const ie = i.diveState.pendingFoeBattle;
      d(ie ? Op(i, [ie.enemyId], ie.firstStrike) : Op(i, p1(q, r.current)));
    }, [i, c]),
      E.useEffect(() => {
        if (!de) return;
        const q = setTimeout(() => le(!1), 700);
        return () => clearTimeout(q);
      }, [de]));
    const L = E.useCallback(
        (q) => {
          if (!c || !r.current || c.outcome !== 'ongoing') return;
          const W = l3(c),
            ie = Y1(c, q, r.current);
          (d(ie),
            h({}),
            v(!1),
            A(!1),
            G(null),
            ee(null),
            g(null),
            te(new Set()),
            C(ie.log.length > 0 ? { base: W, revealed: 0 } : null));
        },
        [c]
      ),
      J = E.useRef(!1);
    (E.useEffect(() => {
      !c ||
        !r.current ||
        J.current ||
        de ||
        (c.turn === 1 &&
          c.firstStrike === 'ambush' &&
          c.outcome === 'ongoing' &&
          ((J.current = !0), L([])));
    }, [c, de, L]),
      E.useEffect(() => {
        if (!c || !Y) return;
        if (Y.revealed >= c.log.length) {
          const W = setTimeout(() => {
            (C(null), te(new Set()));
          }, 200);
          return () => clearTimeout(W);
        }
        const q = setTimeout(
          () => {
            var Ql, ss;
            const W = Y.revealed,
              ie = (Ql = c.log[W]) == null ? void 0 : Ql.snapshot,
              _e =
                W > 0 ? (((ss = c.log[W - 1]) == null ? void 0 : ss.snapshot) ?? Y.base) : Y.base,
              Ke = new Set();
            if (ie)
              for (const Ka of Object.keys(ie)) {
                const xl = _e == null ? void 0 : _e[Ka];
                xl && (ie[Ka].hp < xl.hp || (ie[Ka].isDown && !xl.isDown)) && Ke.add(Ka);
              }
            (te(Ke), C({ ...Y, revealed: Y.revealed + 1 }));
          },
          Y.revealed === 0 ? 240 : 540
        );
        return () => clearTimeout(q);
      }, [c, Y]));
    const ae = E.useMemo(() => (c && c.outcome === 'win' && i ? X1(i, c) : []), [c, i]);
    E.useEffect(() => {
      (c == null ? void 0 : c.outcome) === 'win' &&
        !Y &&
        ke(ae.filter((q) => q.toLevel > q.fromLevel));
    }, [c == null ? void 0 : c.outcome, Y, ae]);
    const ge = E.useMemo(
        () => (c == null ? void 0 : c.enemies.filter((q) => !q.isDown)) ?? [],
        [c]
      ),
      Q = E.useMemo(() => (c == null ? void 0 : c.allies.filter((q) => !q.isDown)) ?? [], [c]);
    (E.useEffect(() => {
      ge.length > 0 && !ge.some((q) => q.id === I) && w(ge[0].id);
    }, [ge, I]),
      E.useEffect(() => {
        if ((c == null ? void 0 : c.outcome) !== 'ongoing' || (p && Q.some((W) => W.id === p)))
          return;
        const q = Q.find((W) => !f[W.id]) ?? null;
        g(q ? q.id : null);
      }, [c, Q, p, f]));
    const b = Q.length > 0 && Q.every((q) => f[q.id] !== void 0),
      H = E.useCallback(
        (q, W) => {
          const ie = { ...f, [q]: W };
          (h(ie), v(!1), A(!1));
          const _e = Q.find((Ke) => Ke.id !== q && !ie[Ke.id]);
          g(_e ? _e.id : null);
        },
        [f, Q]
      ),
      P = E.useCallback(
        async (q) => {
          (S(!0),
            ye(q.outcome === 'lose' ? 'lose' : q.outcome === 'fled' ? 'fled' : 'win'),
            await new Promise((ie) => setTimeout(ie, 460)));
          const W = q.outcome === 'win';
          q.outcome === 'lose'
            ? (await o((ie) => Pi(Dp(ie, q))), l('/town'))
            : (await o((ie) => _x(Dp(ie, q), W)), l('/dungeon'));
        },
        [o, l]
      ),
      F = E.useCallback(() => {
        var q;
        (h({}), v(!1), A(!1), G(null), ee(null), g(((q = Q[0]) == null ? void 0 : q.id) ?? null));
      }, [Q]),
      re = E.useCallback(() => {
        var ie;
        if (!c || !r.current || c.outcome !== 'ongoing') return;
        const q = I ?? ((ie = ge[0]) == null ? void 0 : ie.id) ?? '',
          W = Q.map((_e) => {
            const Ke = f[_e.id] ?? { kind: 'attack' };
            return Ke.kind === 'guard'
              ? { kind: 'guard', actorId: _e.id }
              : Ke.kind === 'skill'
                ? { kind: 'skill', actorId: _e.id, skillId: Ke.skillId, targetId: q }
                : Ke.kind === 'item'
                  ? { kind: 'item', actorId: _e.id, itemId: Ke.itemId, targetId: _e.id }
                  : { kind: 'attack', actorId: _e.id, targetId: q };
          });
        if (j) {
          const _e = zn[j.unionSkillId],
            Ke =
              (_e == null ? void 0 : _e.target) === 'enemyOne' ||
              (_e == null ? void 0 : _e.target) === 'enemyRow' ||
              (_e == null ? void 0 : _e.target) === 'enemyAll';
          W.unshift({ kind: 'union', ...j, targetId: Ke ? q : j.targetId });
        }
        L(W);
      }, [c, f, I, Q, ge, j, L]),
      fe = E.useCallback(() => {
        if (!c || !r.current || c.outcome !== 'ongoing') return;
        const q = Q[0];
        q && L([{ kind: 'flee', actorId: q.id }]);
      }, [c, Q, L]);
    if (!i || !i.diveState) return m.jsx(ul, { to: '/town', replace: !0 });
    if (!c) return m.jsx('div', { className: Z.layout, children: '戦闘準備中...' });
    const ce = (q) => {
        const W = i.guild.members.find((ie) => ie.id === q.id);
        return W
          ? Object.keys(W.learnedSkills).filter((ie) => ie in Wt && q.tp >= Wt[ie].tpCost(1))
          : [];
      },
      Ae = () => {
        const q = (ie) =>
            Object.values(f).filter((_e) => _e.kind === 'item' && _e.itemId === ie).length,
          W = (ie) => c.consumedItems.filter((_e) => _e === ie).length;
        return i.guild.storage
          .filter((ie) => {
            var _e, Ke;
            return (Ke = (_e = Fe[ie.itemId]) == null ? void 0 : _e.useContext) == null
              ? void 0
              : Ke.includes('battle');
          })
          .map((ie) => ({
            id: ie.itemId,
            remaining: id(i, ie.itemId) - W(ie.itemId) - q(ie.itemId),
          }))
          .filter((ie) => ie.remaining > 0);
      },
      Ie = (q) => {
        var ie, _e;
        const W = f[q.id];
        return W
          ? W.kind === 'attack'
            ? '攻撃'
            : W.kind === 'guard'
              ? '防御'
              : W.kind === 'item'
                ? (((ie = Fe[W.itemId]) == null ? void 0 : ie.name) ?? 'どうぐ')
                : (((_e = Wt[W.skillId]) == null ? void 0 : _e.name) ?? 'スキル')
          : '';
      },
      tl = (q) => {
        const W = (_e) => _e === 'headBind' || _e === 'armBind' || _e === 'legBind';
        let ie = '';
        return (
          q.ailments.some((_e) => W(_e.type)) && (ie += ' 🔒'),
          q.ailments.some((_e) => !W(_e.type)) && (ie += ' 🌀'),
          ie
        );
      },
      yl = (q) => {
        var ie;
        const W = i.guild.members.find((_e) => _e.id === q.id);
        return W ? (((ie = tt[W.classId]) == null ? void 0 : ie.name) ?? '') : '';
      },
      bl = Y
        ? Y.revealed > 0
          ? (((is = c.log[Y.revealed - 1]) == null ? void 0 : is.snapshot) ?? Y.base)
          : Y.base
        : null,
      Ya = (q) => (bl == null ? void 0 : bl[q.id]) ?? { hp: q.hp, isDown: q.isDown },
      _l = (q) => {
        var _e;
        const W = i.guild.members.find((Ke) => Ke.id === q.id);
        if (!W) return null;
        const ie =
          (_e = St[W.raceId]) == null
            ? void 0
            : _e.raceSkillTree.skills.find((Ke) => Ke.skillId in zn);
        return !ie || !(ie.skillId in W.learnedSkills) ? null : (zn[ie.skillId] ?? null);
      },
      Xa = (q, W, ie) => {
        var Ql;
        const Ke =
          W.target === 'enemyOne' || W.target === 'enemyRow' || W.target === 'enemyAll'
            ? (I ?? ((Ql = ge[0]) == null ? void 0 : Ql.id) ?? '')
            : q;
        (G({ actorId: q, unionSkillId: W.id, participantIds: ie, targetId: Ke }), ee(null));
      },
      Kn = (q, W) => {
        W.requiredParticipants <= 1 ? Xa(q.id, W, [q.id]) : ee({ actorId: q.id, def: W });
      },
      vt = p ? Q.find((q) => q.id === p) : void 0,
      as = ((yt = c.enemies.find((q) => q.id === I)) == null ? void 0 : yt.name) ?? '-',
      Va = _d(c),
      Qa = (q) => {
        const W = Ya(q);
        return m.jsxs(
          'button',
          {
            type: 'button',
            className: [
              Z.card,
              W.isDown ? Z.down : '',
              p === q.id ? Z.cardActive : '',
              f[q.id] ? Z.cardDecided : '',
              K.has(q.id) ? Z.flash : '',
            ].join(' '),
            disabled: q.isDown || c.outcome !== 'ongoing' || !!Y,
            onClick: () => {
              (g(q.id), v(!1), A(!1));
            },
            children: [
              m.jsxs('div', {
                className: Z.cardName,
                children: [
                  q.name,
                  q.unionGauge >= 100 ? m.jsx('span', { className: Z.uni, children: '★' }) : null,
                  tl(q),
                ],
              }),
              m.jsx('div', { className: Z.cardJob, children: yl(q) }),
              m.jsx(On, { value: W.hp, max: q.maxHp, color: '#4caf50', showValue: !1 }),
              m.jsx(On, { value: q.tp, max: q.maxTp, color: '#2196f3', showValue: !1 }),
              m.jsxs('div', {
                className: Z.cardNums,
                children: ['HP ', Math.max(0, W.hp), ' · TP ', q.tp],
              }),
              m.jsxs('div', {
                className: Z.gaugeRow,
                children: [
                  m.jsx(On, { value: q.unionGauge, max: 100, color: '#ff9800', showValue: !1 }),
                  m.jsxs('span', { className: Z.gaugeLabel, children: ['U ', q.unionGauge, '%'] }),
                ],
              }),
              f[q.id] ? m.jsxs('div', { className: Z.cardCmd, children: ['▶ ', Ie(q)] }) : null,
            ],
          },
          q.id
        );
      },
      Zn = c.allies.filter((q) => q.row === 'front'),
      ns = c.allies.filter((q) => q.row === 'back');
    return m.jsxs('div', {
      className: Z.layout,
      children: [
        m.jsx('div', {
          className: Z.enemies,
          children: c.enemies.map((q) => {
            const W = Ya(q);
            return m.jsxs(
              'button',
              {
                type: 'button',
                className: `${Z.enemy} ${W.isDown ? Z.down : ''} ${I === q.id ? Z.targeted : ''} ${K.has(q.id) ? Z.flash : ''}`,
                disabled: q.isDown || !!Y,
                onClick: () => w(q.id),
                children: [
                  m.jsxs('span', { className: Z.enemyName, children: [q.name, tl(q)] }),
                  m.jsx(On, { value: W.hp, max: q.maxHp, color: '#e57373', showValue: !1 }),
                ],
              },
              q.id
            );
          }),
        }),
        c.summons.length > 0
          ? m.jsx('div', {
              className: Z.summons,
              children: c.summons.map((q) => {
                const W = Ya(q);
                return m.jsxs(
                  'div',
                  {
                    className: `${Z.summon} ${W.isDown ? Z.down : ''} ${K.has(q.id) ? Z.flash : ''}`,
                    children: [
                      m.jsxs('span', { className: Z.summonName, children: ['🐾 ', q.name] }),
                      m.jsx(On, { value: W.hp, max: q.maxHp, color: '#8d6e63', showValue: !1 }),
                      m.jsxs('span', {
                        className: Z.summonHp,
                        children: ['HP ', Math.max(0, W.hp)],
                      }),
                    ],
                  },
                  q.id
                );
              }),
            })
          : null,
        m.jsxs('div', {
          className: Z.party,
          children: [
            m.jsx('div', { className: Z.rowTag, children: '前衛' }),
            m.jsx('div', { className: Z.cardRow, children: Zn.map(Qa) }),
            m.jsx('div', { className: Z.rowTag, children: '後衛（近接ダメージ -30%）' }),
            m.jsx('div', {
              className: Z.cardRow,
              children:
                ns.length > 0
                  ? ns.map(Qa)
                  : m.jsx('div', { className: Z.empty, children: '（なし）' }),
            }),
          ],
        }),
        Y
          ? m.jsxs('div', {
              className: Z.playback,
              children: [
                m.jsx('span', { className: Z.playbackHint, children: '戦況を再生中…' }),
                m.jsx('button', {
                  type: 'button',
                  className: Z.skip,
                  onClick: () => {
                    (C(null), te(new Set()));
                  },
                  children: '▶▶ スキップ',
                }),
              ],
            })
          : c.outcome !== 'ongoing'
            ? m.jsxs('div', {
                className: Z.result,
                children: [
                  m.jsx('div', {
                    className: Z.resultTitle,
                    children:
                      c.outcome === 'win'
                        ? '勝利！'
                        : c.outcome === 'fled'
                          ? '逃走した'
                          : '全滅...',
                  }),
                  c.outcome === 'win'
                    ? m.jsxs(m.Fragment, {
                        children: [
                          m.jsxs('div', {
                            className: Z.resultBody,
                            children: ['経験値 ', Va.exp, ' ／ ', Va.gold, ' G を獲得'],
                          }),
                          m.jsx('div', {
                            className: Z.expList,
                            children: ae.map((q) =>
                              m.jsxs(
                                'div',
                                {
                                  className: Z.expRow,
                                  children: [
                                    m.jsxs('span', {
                                      className: Z.expName,
                                      children: [
                                        q.name,
                                        m.jsxs('span', {
                                          className: Z.expLv,
                                          children: [
                                            'Lv',
                                            q.toLevel,
                                            q.toLevel > q.fromLevel
                                              ? m.jsxs('span', {
                                                  className: Z.expUp,
                                                  children: [' ↑', q.toLevel - q.fromLevel],
                                                })
                                              : null,
                                          ],
                                        }),
                                      ],
                                    }),
                                    m.jsx(On, {
                                      value: q.expToNext > 0 ? q.exp : 1,
                                      max: q.expToNext > 0 ? q.expToNext : 1,
                                      color: '#ffca28',
                                      showValue: !1,
                                    }),
                                    m.jsxs('span', {
                                      className: Z.expNum,
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
                      ? m.jsx('div', { className: Z.resultBody, children: '拠点へ帰還する' })
                      : null,
                  m.jsx('button', {
                    type: 'button',
                    className: Z.primary,
                    disabled: x || Se.length > 0,
                    onClick: () => void P(c),
                    children: 'つづける',
                  }),
                ],
              })
            : m.jsxs('div', {
                className: Z.command,
                children: [
                  m.jsxs('div', {
                    className: Z.target,
                    children: ['対象: ', as, '（敵をタップで変更）'],
                  }),
                  j
                    ? (() => {
                        const q = zn[j.unionSkillId];
                        return m.jsxs('div', {
                          className: Z.unionBanner,
                          children: [
                            m.jsxs('div', {
                              className: Z.unionBannerHead,
                              children: [
                                '⚡ ユニオン予約: ',
                                q == null ? void 0 : q.name,
                                m.jsx('button', {
                                  type: 'button',
                                  className: Z.unionCancel,
                                  onClick: () => G(null),
                                  children: '取消',
                                }),
                              ],
                            }),
                            q
                              ? m.jsxs('div', {
                                  className: Z.unionBannerDesc,
                                  children: [
                                    Tr(q.element, q.target, q.effects),
                                    m.jsx('br', {}),
                                    q.description,
                                  ],
                                })
                              : null,
                          ],
                        });
                      })()
                    : null,
                  vt
                    ? m.jsxs(m.Fragment, {
                        children: [
                          m.jsxs('div', {
                            className: Z.cmdHead,
                            children: [vt.name, ' のコマンド'],
                          }),
                          y
                            ? m.jsxs('div', {
                                className: Z.skillList,
                                children: [
                                  ce(vt).map((q) => {
                                    var W;
                                    return m.jsxs(
                                      'button',
                                      {
                                        type: 'button',
                                        className: Z.skillBtn,
                                        onClick: () => H(vt.id, { kind: 'skill', skillId: q }),
                                        children: [
                                          m.jsxs('span', {
                                            className: Z.skillTop,
                                            children: [
                                              m.jsx('span', {
                                                className: Z.skillName,
                                                children: Wt[q].name,
                                              }),
                                              m.jsxs('span', {
                                                className: Z.tp,
                                                children: ['TP ', Wt[q].tpCost(1)],
                                              }),
                                            ],
                                          }),
                                          m.jsx('span', {
                                            className: Z.skillSummary,
                                            children: Tr(
                                              Wt[q].element,
                                              Wt[q].target,
                                              Wt[q].effects
                                            ),
                                          }),
                                          m.jsx('span', {
                                            className: Z.skillDesc,
                                            children:
                                              ((W = Xi[q]) == null ? void 0 : W.description) ?? '',
                                          }),
                                        ],
                                      },
                                      q
                                    );
                                  }),
                                  ce(vt).length === 0
                                    ? m.jsx('div', {
                                        className: Z.empty,
                                        children: '使えるスキルがない',
                                      })
                                    : null,
                                  m.jsx('button', {
                                    type: 'button',
                                    className: Z.menuBack,
                                    onClick: () => v(!1),
                                    children: 'もどる',
                                  }),
                                ],
                              })
                            : B
                              ? m.jsxs('div', {
                                  className: Z.skillList,
                                  children: [
                                    Ae().map(({ id: q, remaining: W }) =>
                                      m.jsxs(
                                        'button',
                                        {
                                          type: 'button',
                                          className: Z.skillBtn,
                                          onClick: () => H(vt.id, { kind: 'item', itemId: q }),
                                          children: [
                                            m.jsx('span', {
                                              className: Z.skillTop,
                                              children: m.jsxs('span', {
                                                className: Z.skillName,
                                                children: [Fe[q].name, ' ×', W],
                                              }),
                                            }),
                                            m.jsx('span', {
                                              className: Z.skillDesc,
                                              children: Fe[q].description,
                                            }),
                                          ],
                                        },
                                        q
                                      )
                                    ),
                                    Ae().length === 0
                                      ? m.jsx('div', {
                                          className: Z.empty,
                                          children: '使える道具がない',
                                        })
                                      : null,
                                    m.jsx('button', {
                                      type: 'button',
                                      className: Z.menuBack,
                                      onClick: () => A(!1),
                                      children: 'もどる',
                                    }),
                                  ],
                                })
                              : M
                                ? m.jsxs('div', {
                                    className: Z.skillList,
                                    children: [
                                      m.jsxs('div', {
                                        className: Z.unionHint,
                                        children: [
                                          m.jsx('strong', { children: M.def.name }),
                                          m.jsx('br', {}),
                                          Tr(M.def.element, M.def.target, M.def.effects),
                                          m.jsx('br', {}),
                                          M.def.description,
                                          m.jsx('br', {}),
                                          '協力者を選択（あと',
                                          M.def.requiredParticipants - 1,
                                          '人。各自ゲージ',
                                          M.def.gaugeCostPerParticipant,
                                          '消費）',
                                        ],
                                      }),
                                      Q.filter((q) => q.id !== M.actorId).map((q) =>
                                        m.jsx(
                                          'button',
                                          {
                                            type: 'button',
                                            className: Z.skillBtn,
                                            onClick: () => Xa(M.actorId, M.def, [M.actorId, q.id]),
                                            children: m.jsxs('span', {
                                              className: Z.skillTop,
                                              children: [
                                                m.jsx('span', {
                                                  className: Z.skillName,
                                                  children: q.name,
                                                }),
                                                m.jsxs('span', {
                                                  className: Z.tp,
                                                  children: ['ゲージ ', q.unionGauge],
                                                }),
                                              ],
                                            }),
                                          },
                                          q.id
                                        )
                                      ),
                                      Q.filter((q) => q.id !== M.actorId).length === 0
                                        ? m.jsx('div', {
                                            className: Z.empty,
                                            children: '協力できる味方がいない',
                                          })
                                        : null,
                                      m.jsx('button', {
                                        type: 'button',
                                        className: Z.menuBack,
                                        onClick: () => ee(null),
                                        children: 'もどる',
                                      }),
                                    ],
                                  })
                                : m.jsxs(m.Fragment, {
                                    children: [
                                      (() => {
                                        const q = _l(vt);
                                        return !q || vt.unionGauge < 100 || j
                                          ? null
                                          : m.jsxs('div', {
                                              className: Z.unionInfo,
                                              children: [
                                                '⚡ ',
                                                m.jsx('strong', { children: q.name }),
                                                ' 発動可（ゲージ100%）',
                                                m.jsx('br', {}),
                                                Tr(q.element, q.target, q.effects),
                                              ],
                                            });
                                      })(),
                                      m.jsxs('div', {
                                        className: Z.menu,
                                        children: [
                                          m.jsx('button', {
                                            type: 'button',
                                            className: Z.menuBtn,
                                            onClick: () => H(vt.id, { kind: 'attack' }),
                                            children: '攻撃',
                                          }),
                                          m.jsx('button', {
                                            type: 'button',
                                            className: Z.menuBtn,
                                            onClick: () => H(vt.id, { kind: 'guard' }),
                                            children: '防御',
                                          }),
                                          m.jsx('button', {
                                            type: 'button',
                                            className: Z.menuBtn,
                                            disabled: ce(vt).length === 0,
                                            onClick: () => v(!0),
                                            children: 'スキル',
                                          }),
                                          m.jsx('button', {
                                            type: 'button',
                                            className: Z.menuBtn,
                                            disabled: Ae().length === 0,
                                            onClick: () => A(!0),
                                            children: 'どうぐ',
                                          }),
                                          (() => {
                                            const q = _l(vt);
                                            return !q || vt.unionGauge < 100 || j
                                              ? null
                                              : m.jsx('button', {
                                                  type: 'button',
                                                  className: `${Z.menuBtn} ${Z.unionBtn}`,
                                                  onClick: () => Kn(vt, q),
                                                  children: '⚡ユニオン',
                                                });
                                          })(),
                                          m.jsx('button', {
                                            type: 'button',
                                            className: Z.menuBtn,
                                            onClick: fe,
                                            children: '逃走',
                                          }),
                                        ],
                                      }),
                                    ],
                                  }),
                        ],
                      })
                    : m.jsxs('div', {
                        className: Z.execRow,
                        children: [
                          m.jsx('button', {
                            type: 'button',
                            className: Z.redo,
                            onClick: F,
                            children: 'やり直す',
                          }),
                          m.jsx('button', {
                            type: 'button',
                            className: Z.primary,
                            disabled: !b,
                            onClick: re,
                            children: '実行',
                          }),
                        ],
                      }),
                ],
              }),
        m.jsx('div', {
          className: Z.log,
          children: (() => {
            const q = Y ? c.log.slice(0, Y.revealed) : c.log;
            return q.length === 0
              ? m.jsxs('div', {
                  className: Z.logLine,
                  children: ['てきが あらわれた！（', c.turn, ' ターン目）'],
                })
              : q.map((W, ie) =>
                  m.jsx(
                    'div',
                    {
                      className: `${Z.logLine} ${Y && ie === q.length - 1 ? Z.logLineNew : ''}`,
                      children: W.text,
                    },
                    ie
                  )
                );
          })(),
        }),
        Se.length > 0
          ? (() => {
              const q = Se[0];
              return m.jsx('div', {
                className: Z.dialogOverlay,
                children: m.jsxs('div', {
                  className: Z.dialog,
                  children: [
                    m.jsx('div', { className: Z.dialogTitle, children: 'レベルアップ！' }),
                    m.jsxs('div', {
                      className: Z.dialogName,
                      children: [
                        q.name,
                        ' は Lv',
                        q.fromLevel,
                        ' → ',
                        m.jsxs('strong', { children: ['Lv', q.toLevel] }),
                        ' になった！',
                      ],
                    }),
                    m.jsx('div', {
                      className: Z.dialogStats,
                      children: Object.entries(q.statGains).map(([W, ie]) =>
                        m.jsxs(
                          'span',
                          { className: Z.dialogStat, children: [t3[W] ?? W, ' +', ie] },
                          W
                        )
                      ),
                    }),
                    m.jsx('button', {
                      type: 'button',
                      className: Z.primary,
                      onClick: () => ke((W) => W.slice(1)),
                      children: 'OK',
                    }),
                  ],
                }),
              });
            })()
          : null,
        de ? m.jsx('div', { className: Z.fxIntro }) : null,
        ue ? m.jsx('div', { className: `${Z.fxOutro} ${ue === 'lose' ? Z.fxLose : ''}` }) : null,
      ],
    });
  },
  n3 = '_layout_iunlg_1',
  i3 = '_head_iunlg_11',
  s3 = '_title_iunlg_15',
  r3 = '_tabs_iunlg_21',
  o3 = '_tab_iunlg_21',
  u3 = '_tabActive_iunlg_38',
  c3 = '_records_iunlg_43',
  d3 = '_statBig_iunlg_48',
  m3 = '_statNum_iunlg_60',
  _3 = '_statLabel_iunlg_67',
  f3 = '_statList_iunlg_72',
  p3 = '_statRow_iunlg_76',
  h3 = '_h2_iunlg_91',
  g3 = '_bossLog_iunlg_97',
  k3 = '_bossRow_iunlg_106',
  v3 = '_codex_iunlg_114',
  y3 = '_codexSummary_iunlg_121',
  b3 = '_list_iunlg_127',
  x3 = '_row_iunlg_133',
  S3 = '_unseen_iunlg_140',
  w3 = '_info_iunlg_144',
  T3 = '_name_iunlg_150',
  E3 = '_badge_iunlg_158',
  C3 = '_sub_iunlg_167',
  j3 = '_empty_iunlg_172',
  N3 = '_foot_iunlg_177',
  A3 = '_back_iunlg_181',
  Oe = {
    layout: n3,
    head: i3,
    title: s3,
    tabs: r3,
    tab: o3,
    tabActive: u3,
    records: c3,
    statBig: d3,
    statNum: m3,
    statLabel: _3,
    statList: f3,
    statRow: p3,
    h2: h3,
    bossLog: g3,
    bossRow: k3,
    codex: v3,
    codexSummary: y3,
    list: b3,
    row: x3,
    unseen: S3,
    info: w3,
    name: T3,
    badge: E3,
    sub: C3,
    empty: j3,
    foot: N3,
    back: A3,
  };
function sg(l) {
  const i = l.bestiary.monsters;
  return Object.values(cl)
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
            name: ((f = Fe[d.itemId]) == null ? void 0 : f.name) ?? d.itemId,
            found: c.has(d.itemId),
          };
        }),
      };
    });
}
function L3(l) {
  const i = sg(l),
    o = i.length,
    r = i.filter((y) => y.seen).length,
    c = i.filter((y) => y.defeated).length;
  let d = 0,
    f = 0;
  for (const y of i) for (const v of y.drops) ((d += 1), v.found && (f += 1));
  const h = o + d,
    p = c + f,
    g = h === 0 ? 0 : Math.round((p / h) * 100);
  return {
    monstersTotal: o,
    monstersSeen: r,
    monstersDefeated: c,
    dropsTotal: d,
    dropsFound: f,
    completionPct: g,
  };
}
const q3 = () => {
    const l = ml(),
      { save: i } = Vl(),
      [o, r] = E.useState('record');
    if (!i) return m.jsx(ul, { to: '/title', replace: !0 });
    const c = i.towerState.record,
      d = L3(i),
      f = sg(i);
    return m.jsxs('div', {
      className: Oe.layout,
      children: [
        m.jsx('header', {
          className: Oe.head,
          children: m.jsx('h1', { className: Oe.title, children: '図鑑 / 記録' }),
        }),
        m.jsxs('div', {
          className: Oe.tabs,
          children: [
            m.jsx('button', {
              type: 'button',
              className: `${Oe.tab} ${o === 'record' ? Oe.tabActive : ''}`,
              onClick: () => r('record'),
              children: '到達記録',
            }),
            m.jsx('button', {
              type: 'button',
              className: `${Oe.tab} ${o === 'codex' ? Oe.tabActive : ''}`,
              onClick: () => r('codex'),
              children: '図鑑',
            }),
          ],
        }),
        o === 'record'
          ? m.jsxs('div', {
              className: Oe.records,
              children: [
                m.jsxs('div', {
                  className: Oe.statBig,
                  children: [
                    m.jsx('span', { className: Oe.statNum, children: c.deepestReached }),
                    m.jsx('span', { className: Oe.statLabel, children: '最深到達階' }),
                  ],
                }),
                m.jsxs('dl', {
                  className: Oe.statList,
                  children: [
                    m.jsxs('div', {
                      className: Oe.statRow,
                      children: [
                        m.jsx('dt', { children: '最高撃破ボス階' }),
                        m.jsx('dd', {
                          children: c.highestBossDefeated > 0 ? `${c.highestBossDefeated}F` : '—',
                        }),
                      ],
                    }),
                    m.jsxs('div', {
                      className: Oe.statRow,
                      children: [
                        m.jsx('dt', { children: '挑戦回数' }),
                        m.jsx('dd', { children: c.totalDives }),
                      ],
                    }),
                    m.jsxs('div', {
                      className: Oe.statRow,
                      children: [
                        m.jsx('dt', { children: '図鑑達成率' }),
                        m.jsxs('dd', { children: [d.completionPct, '%'] }),
                      ],
                    }),
                  ],
                }),
                m.jsx('h2', { className: Oe.h2, children: 'ボス撃破履歴' }),
                c.bossDefeatLog.length === 0
                  ? m.jsx('p', { className: Oe.empty, children: 'まだボスを倒していません。' })
                  : m.jsx('ul', {
                      className: Oe.bossLog,
                      children: c.bossDefeatLog
                        .slice()
                        .reverse()
                        .map((h, p) =>
                          m.jsx(
                            'li',
                            {
                              className: Oe.bossRow,
                              children: m.jsxs('span', { children: [h.depth, 'F のボス撃破'] }),
                            },
                            p
                          )
                        ),
                    }),
              ],
            })
          : m.jsxs('div', {
              className: Oe.codex,
              children: [
                m.jsxs('div', {
                  className: Oe.codexSummary,
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
                  className: Oe.list,
                  children: f.map((h) =>
                    m.jsx(
                      'div',
                      {
                        className: `${Oe.row} ${h.seen ? '' : Oe.unseen}`,
                        children: m.jsxs('div', {
                          className: Oe.info,
                          children: [
                            m.jsxs('span', {
                              className: Oe.name,
                              children: [
                                h.seen ? h.name : '？？？',
                                h.defeated
                                  ? m.jsx('span', { className: Oe.badge, children: '撃破' })
                                  : null,
                              ],
                            }),
                            m.jsxs('span', {
                              className: Oe.sub,
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
          className: Oe.foot,
          children: m.jsx('button', {
            type: 'button',
            className: Oe.back,
            onClick: () => l('/town'),
            children: '拠点へ戻る',
          }),
        }),
      ],
    });
  },
  B3 = '_layout_j0tqt_1',
  O3 = '_head_j0tqt_13',
  I3 = '_depth_j0tqt_22',
  M3 = '_theme_j0tqt_28',
  D3 = '_fpvWrap_j0tqt_45',
  R3 = '_fpvControls_j0tqt_52',
  z3 = '_fpvTurn_j0tqt_63',
  H3 = '_fpvForward_j0tqt_64',
  U3 = '_fpvBack_j0tqt_65',
  G3 = '_menuBtn_j0tqt_99',
  $3 = '_menuGold_j0tqt_112',
  Y3 = '_menuActions_j0tqt_118',
  X3 = '_menuAction_j0tqt_118',
  V3 = '_menuSectionLabel_j0tqt_135',
  Q3 = '_menuMember_j0tqt_141',
  K3 = '_menuMemberName_j0tqt_155',
  Z3 = '_menuMemberJob_j0tqt_159',
  J3 = '_menuMemberStat_j0tqt_166',
  P3 = '_menuSp_j0tqt_171',
  F3 = '_menuStats_j0tqt_178',
  W3 = '_menuStat_j0tqt_178',
  e2 = '_skillTabs_j0tqt_190',
  t2 = '_skillTab_j0tqt_190',
  l2 = '_skillTabOn_j0tqt_207',
  a2 = '_mapWrap_j0tqt_213',
  n2 = '_paletteHint_j0tqt_247',
  i2 = '_stairs_j0tqt_256',
  s2 = '_action_j0tqt_270',
  r2 = '_notice_j0tqt_287',
  o2 = '_itemOverlay_j0tqt_351',
  u2 = '_itemPanel_j0tqt_361',
  c2 = '_itemTitle_j0tqt_374',
  d2 = '_itemEmpty_j0tqt_379',
  m2 = '_itemRow_j0tqt_385',
  _2 = '_itemName_j0tqt_393',
  f2 = '_itemDesc_j0tqt_401',
  p2 = '_itemTargets_j0tqt_407',
  h2 = '_itemTarget_j0tqt_407',
  g2 = '_itemHp_j0tqt_427',
  k2 = '_itemUse_j0tqt_433',
  v2 = '_itemClose_j0tqt_450',
  y2 = '_confirmOverlay_j0tqt_460',
  b2 = '_confirmBox_j0tqt_471',
  x2 = '_confirmText_j0tqt_483',
  S2 = '_confirmActions_j0tqt_490',
  w2 = '_confirmCancel_j0tqt_495',
  T2 = '_confirmOk_j0tqt_496',
  ne = {
    layout: B3,
    head: O3,
    depth: I3,
    theme: M3,
    fpvWrap: D3,
    fpvControls: R3,
    fpvTurn: z3,
    fpvForward: H3,
    fpvBack: U3,
    menuBtn: G3,
    menuGold: $3,
    menuActions: Y3,
    menuAction: X3,
    menuSectionLabel: V3,
    menuMember: Q3,
    menuMemberName: K3,
    menuMemberJob: Z3,
    menuMemberStat: J3,
    menuSp: P3,
    menuStats: F3,
    menuStat: W3,
    skillTabs: e2,
    skillTab: t2,
    skillTabOn: l2,
    mapWrap: a2,
    paletteHint: n2,
    stairs: i2,
    action: s2,
    notice: r2,
    itemOverlay: o2,
    itemPanel: u2,
    itemTitle: c2,
    itemEmpty: d2,
    itemRow: m2,
    itemName: _2,
    itemDesc: f2,
    itemTargets: p2,
    itemTarget: h2,
    itemHp: g2,
    itemUse: k2,
    itemClose: v2,
    confirmOverlay: y2,
    confirmBox: b2,
    confirmText: x2,
    confirmActions: S2,
    confirmCancel: w2,
    confirmOk: T2,
  },
  E2 = '_canvas_1keax_1',
  C2 = { canvas: E2 },
  j2 = '/sekaiju-like-game/assets/stairs-down-BjaF19rU.png',
  N2 = '/sekaiju-like-game/assets/stairs-up-DhyZlujG.png';
function rg(l) {
  if (typeof Image > 'u') return null;
  const i = new Image();
  return ((i.src = l), i);
}
const Pr = rg(N2),
  Fr = rg(j2);
function Gr(l) {
  return !!l && l.complete && l.naturalWidth > 0;
}
const Ac = () => Gr(Pr) && Gr(Fr);
function og() {
  const [l, i] = E.useState(Ac);
  return (
    E.useEffect(() => {
      if (Ac()) {
        i(!0);
        return;
      }
      const o = [Pr, Fr].filter((c) => !!c),
        r = () => {
          Ac() && i(!0);
        };
      return (
        o.forEach((c) => c.addEventListener('load', r)),
        () => o.forEach((c) => c.removeEventListener('load', r))
      );
    }, []),
    l
  );
}
const A2 = [
    { id: 'icon_chest', symbol: '📦', label: '宝箱' },
    { id: 'icon_foe', symbol: '👹', label: '強敵(FOE)' },
    { id: 'icon_warning', symbol: '⚠️', label: '注意' },
    { id: 'icon_door', symbol: '🚪', label: '扉/近道' },
    { id: 'icon_gather', symbol: '⛏️', label: '採集' },
    { id: 'icon_event', symbol: '❗', label: 'イベント' },
    { id: 'icon_note', symbol: '📝', label: 'メモ' },
    { id: 'icon_star', symbol: '⭐', label: '任意' },
  ],
  L2 = new Map(A2.map((l) => [l.id, l]));
function q2(l) {
  var i;
  return ((i = L2.get(l)) == null ? void 0 : i.symbol) ?? '•';
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
  B2 = {
    mining: '⛏️',
    gathering: '🌿',
    logging: '🪓',
    fishing: '🎣',
    harvest: '🌰',
    hunting: '🍖',
  },
  O2 = '🍳',
  I2 = ({
    floor: l,
    explored: i,
    pos: o,
    dir: r,
    icons: c = [],
    foes: d = [],
    depletedGathers: f = [],
    maxCell: h = 26,
    onCellClick: p,
  }) => {
    const g = E.useRef(null),
      y = og(),
      v = Math.max(10, Math.min(h, Math.floor(360 / l.width))),
      B = l.width * v,
      A = l.height * v;
    E.useEffect(() => {
      const w = g.current;
      if (!w) return;
      const x = new Set(i),
        S = new Set(f),
        j = new Map(l.gatheringPoints.map((le) => [`${le.cell.x},${le.cell.y}`, le.type])),
        G = window.devicePixelRatio || 1;
      ((w.width = B * G), (w.height = A * G));
      const M = w.getContext('2d');
      if (!M) return;
      (M.scale(G, G), M.clearRect(0, 0, B, A));
      for (let le = 0; le < l.height; le++)
        for (let ue = 0; ue < l.width; ue++) {
          const ye = x.has(`${ue},${le}`);
          ((M.fillStyle = ye ? Ha.floor : Ha.fog),
            M.fillRect(ue * v, le * v, v, v),
            ye &&
              ((M.strokeStyle = Ha.grid),
              (M.lineWidth = 1),
              M.strokeRect(ue * v + 0.5, le * v + 0.5, v - 1, v - 1)));
        }
      ((M.strokeStyle = Ha.wall), (M.lineWidth = 2), (M.lineCap = 'round'));
      const ee = (le, ue, ye, Se) => {
        (M.beginPath(), M.moveTo(le, ue), M.lineTo(ye, Se), M.stroke());
      };
      for (let le = 0; le < l.height; le++)
        for (let ue = 0; ue < l.width; ue++) {
          if (!x.has(`${ue},${le}`)) continue;
          const ye = l.cells[le][ue],
            Se = ue * v,
            ke = le * v;
          (ye.walls.N && ee(Se, ke, Se + v, ke),
            ye.walls.S && ee(Se, ke + v, Se + v, ke + v),
            ye.walls.W && ee(Se, ke, Se, ke + v),
            ye.walls.E && ee(Se + v, ke, Se + v, ke + v));
          const L = ye.event;
          if (
            (L == null ? void 0 : L.kind) === 'stairsUp' ||
            (L == null ? void 0 : L.kind) === 'stairsDown'
          ) {
            const J = L.kind === 'stairsUp' ? Pr : Fr;
            if (Gr(J)) {
              const ae = v * 0.9,
                ge = Se + (v - ae) / 2,
                Q = ke + (v - ae) / 2;
              ((M.imageSmoothingEnabled = !1), M.drawImage(J, ge, Q, ae, ae));
            }
          } else if ((L == null ? void 0 : L.kind) === 'gather') {
            const J = S.has(`${ue},${le}`),
              ae = j.get(`${ue},${le}`);
            ((M.globalAlpha = J ? 0.35 : 1),
              (M.font = `${Math.floor(v * 0.7)}px sans-serif`),
              (M.textAlign = 'center'),
              (M.textBaseline = 'middle'),
              M.fillText((ae && B2[ae]) || '🌿', Se + v / 2, ke + v / 2 + 1),
              (M.globalAlpha = 1));
          } else
            (L == null ? void 0 : L.kind) === 'cookingSpot' &&
              ((M.font = `${Math.floor(v * 0.7)}px sans-serif`),
              (M.textAlign = 'center'),
              (M.textBaseline = 'middle'),
              M.fillText(O2, Se + v / 2, ke + v / 2 + 1));
        }
      ((M.font = `${Math.floor(v * 0.66)}px sans-serif`),
        (M.textAlign = 'center'),
        (M.textBaseline = 'middle'));
      for (const le of c)
        x.has(`${le.x},${le.y}`) &&
          M.fillText(q2(le.iconId), le.x * v + v / 2, le.y * v + v / 2 + 1);
      for (const le of d) {
        if (!x.has(`${le.x},${le.y}`)) continue;
        const ue = le.x * v + v / 2,
          ye = le.y * v + v / 2;
        ((M.fillStyle = le.alerted ? Ha.foeAlert : Ha.foe),
          M.beginPath(),
          M.arc(ue, ye, v * 0.3, 0, Math.PI * 2),
          M.fill(),
          (M.fillStyle = '#ffffff'),
          (M.font = `bold ${Math.floor(v * 0.5)}px sans-serif`),
          (M.textAlign = 'center'),
          (M.textBaseline = 'middle'),
          M.fillText('!', ue, ye + 1));
      }
      const Y = o.x * v + v / 2,
        C = o.y * v + v / 2,
        K = v * 0.34,
        de = { N: -Math.PI / 2, E: 0, S: Math.PI / 2, W: Math.PI }[r];
      ((M.fillStyle = Ha.player),
        M.beginPath(),
        M.moveTo(Y + Math.cos(de) * K, C + Math.sin(de) * K),
        M.lineTo(Y + Math.cos(de + 2.5) * K, C + Math.sin(de + 2.5) * K),
        M.lineTo(Y + Math.cos(de - 2.5) * K, C + Math.sin(de - 2.5) * K),
        M.closePath(),
        M.fill());
    }, [l, i, o, r, c, d, f, v, B, A, y]);
    const I = (w) => {
      if (!p) return;
      const x = w.currentTarget.getBoundingClientRect(),
        S = Math.floor(((w.clientX - x.left) / x.width) * l.width),
        j = Math.floor(((w.clientY - x.top) / x.height) * l.height);
      S >= 0 && j >= 0 && S < l.width && j < l.height && p(S, j);
    };
    return m.jsx('canvas', {
      ref: g,
      className: C2.canvas,
      style: { width: B, height: A },
      onClick: I,
    });
  },
  M2 = '_gauge_1o2hx_1',
  D2 = '_icon_1o2hx_11',
  R2 = '_segments_1o2hx_16',
  z2 = '_seg_1o2hx_16',
  H2 = '_filled_1o2hx_28',
  U2 = '_danger_1o2hx_32',
  Mn = { gauge: M2, icon: D2, segments: R2, seg: z2, filled: H2, danger: U2 },
  G2 = ({ level: l }) => {
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
  $2 = '_view_tw2v9_1',
  Y2 = { view: $2 },
  Jp = { N: { dx: 0, dy: -1 }, E: { dx: 1, dy: 0 }, S: { dx: 0, dy: 1 }, W: { dx: -1, dy: 0 } };
function X2(l, i, o, r = 4) {
  const c = Vh(o),
    d = Xh(o),
    f = [];
  let { x: h, y: p } = i;
  for (let g = 0; g < r; g++) {
    const y = Ua(l, h, p, o);
    if (
      (f.push({
        x: h,
        y: p,
        leftOpen: !l.cells[p][h].walls[c],
        rightOpen: !l.cells[p][h].walls[d],
        frontOpen: y,
        event: l.cells[p][h].event,
      }),
      !y)
    )
      break;
    ((h += Jp[o].dx), (p += Jp[o].dy));
  }
  return f;
}
const V2 = {
    sky: '#26301c',
    ceiling: '#3a4a2c',
    floor: '#5d6b46',
    wall: '#8b9a6b',
    frontWall: '#7a8a5c',
    outline: '#2c3720',
  },
  Q2 = 0.56,
  K2 = ({
    floor: l,
    pos: i,
    dir: o,
    foes: r = [],
    theme: c,
    maxDepth: d = 4,
    width: f = 358,
    height: h = 200,
  }) => {
    const p = E.useRef(null),
      g = og();
    return (
      E.useEffect(() => {
        const y = { ...V2, ...(c ?? {}) },
          v = p.current;
        if (!v) return;
        const B = window.devicePixelRatio || 1;
        ((v.width = f * B), (v.height = h * B));
        const A = v.getContext('2d');
        if (!A) return;
        A.scale(B, B);
        const I = f,
          w = h,
          x = I / 2,
          S = w / 2,
          j = X2(l, i, o, d),
          G = (Y) => {
            const C = Math.pow(Q2, Y);
            return {
              l: x - (I / 2) * C,
              r: x + (I / 2) * C,
              t: S - (w / 2) * C,
              b: S + (w / 2) * C,
            };
          },
          M = (Y, C, K = !1) => {
            (A.beginPath(), A.moveTo(Y[0][0], Y[0][1]));
            for (let te = 1; te < Y.length; te++) A.lineTo(Y[te][0], Y[te][1]);
            (A.closePath(),
              (A.fillStyle = C),
              A.fill(),
              K && ((A.strokeStyle = y.outline), (A.lineWidth = 1), A.stroke()));
          },
          ee = (Y) => `rgba(0,0,0,${Math.min(0.5, Y * 0.13)})`;
        ((A.fillStyle = y.sky), A.fillRect(0, 0, I, w));
        for (let Y = j.length - 1; Y >= 0; Y--) {
          const C = G(Y),
            K = G(Y + 1),
            te = j[Y];
          (M(
            [
              [C.l, C.t],
              [C.r, C.t],
              [K.r, K.t],
              [K.l, K.t],
            ],
            y.ceiling
          ),
            M(
              [
                [C.l, C.b],
                [C.r, C.b],
                [K.r, K.b],
                [K.l, K.b],
              ],
              y.floor
            ),
            M(
              [
                [C.l, C.t],
                [K.l, K.t],
                [K.l, K.b],
                [C.l, C.b],
              ],
              te.leftOpen ? y.sky : y.wall,
              !0
            ),
            M(
              [
                [C.r, C.t],
                [K.r, K.t],
                [K.r, K.b],
                [C.r, C.b],
              ],
              te.rightOpen ? y.sky : y.wall,
              !0
            ),
            te.frontOpen ||
              M(
                [
                  [K.l, K.t],
                  [K.r, K.t],
                  [K.r, K.b],
                  [K.l, K.b],
                ],
                y.frontWall,
                !0
              ),
            (A.fillStyle = ee(Y)),
            A.fillRect(K.l, K.t, K.r - K.l, K.b - K.t));
          const de = te.event;
          if (
            (de == null ? void 0 : de.kind) === 'stairsUp' ||
            (de == null ? void 0 : de.kind) === 'stairsDown'
          ) {
            const le = de.kind === 'stairsUp' ? Pr : Fr;
            if (Gr(le)) {
              const ue = Math.max(20, (C.b - K.b) * 0.95),
                ye = x - ue / 2,
                Se = (C.b + K.b) / 2 - ue / 2;
              ((A.imageSmoothingEnabled = !1), A.drawImage(le, ye, Se, ue, ue));
            }
          }
          if (Y > 0 && r.some((le) => le.x === te.x && le.y === te.y)) {
            const le = r.some((ke) => ke.x === te.x && ke.y === te.y && ke.alerted),
              ue = x,
              ye = (C.b + K.b) / 2 - (C.b - K.b) * 0.1,
              Se = Math.max(14, (C.b - C.t) * 0.22);
            ((A.fillStyle = le ? '#d32f2f' : '#b0533a'),
              A.beginPath(),
              A.arc(ue, ye, Se, 0, Math.PI * 2),
              A.fill(),
              (A.fillStyle = '#fff'),
              (A.font = `bold ${Math.floor(Se * 1.3)}px sans-serif`),
              (A.textAlign = 'center'),
              (A.textBaseline = 'middle'),
              A.fillText('!', ue, ye + 1));
          }
        }
      }, [l, i, o, r, c, d, f, h, g]),
      m.jsx('canvas', { ref: p, className: Y2.view, style: { width: f, height: h } })
    );
  },
  Z2 = '_wrap_1uoga_1',
  J2 = '_scroll_1uoga_7',
  P2 = '_canvas_1uoga_17',
  F2 = '_edges_1uoga_21',
  W2 = '_edge_1uoga_21',
  eS = '_edgeLabel_1uoga_34',
  tS = '_node_1uoga_40',
  lS = '_learned_1uoga_57',
  aS = '_maxed_1uoga_62',
  nS = '_available_1uoga_67',
  iS = '_locked_1uoga_72',
  sS = '_selected_1uoga_76',
  rS = '_nodeName_1uoga_81',
  oS = '_nodeCost_1uoga_92',
  uS = '_nodeLv_1uoga_104',
  cS = '_lvNum_1uoga_112',
  dS = '_lvBar_1uoga_118',
  mS = '_lvFill_1uoga_126',
  _S = '_lvMax_1uoga_132',
  fS = '_detail_1uoga_136',
  pS = '_detailName_1uoga_143',
  hS = '_detailLv_1uoga_151',
  gS = '_detailDesc_1uoga_157',
  kS = '_detailReq_1uoga_164',
  vS = '_hint_1uoga_170',
  yS = '_learnBtn_1uoga_176',
  Xe = {
    wrap: Z2,
    scroll: J2,
    canvas: P2,
    edges: F2,
    edge: W2,
    edgeLabel: eS,
    node: tS,
    learned: lS,
    maxed: aS,
    available: nS,
    locked: iS,
    selected: sS,
    nodeName: rS,
    nodeCost: oS,
    nodeLv: uS,
    lvNum: cS,
    lvBar: dS,
    lvFill: mS,
    lvMax: _S,
    detail: fS,
    detailName: pS,
    detailLv: hS,
    detailDesc: gS,
    detailReq: kS,
    hint: vS,
    learnBtn: yS,
  },
  Pp = [1, 2, 2, 2, 2];
function ug(l) {
  return Pp[Math.min(Math.max(0, l), Pp.length - 1)];
}
function cg(l) {
  var o, r;
  const i = [
    ...(((o = tt[l.classId]) == null ? void 0 : o.skillTree.skills) ?? []),
    ...(((r = St[l.raceId]) == null ? void 0 : r.raceSkillTree.skills) ?? []),
  ];
  return (l.titleId && Gl[l.titleId] && i.push(...Gl[l.titleId].skillTree.skills), i);
}
function bS(l, i) {
  const o = new Map(l.map((d) => [d.skillId, d])),
    r = new Map(),
    c = (d, f = 0) => {
      var y;
      const h = r.get(d);
      if (h !== void 0) return h;
      const p = o.get(d);
      if (!p || !((y = p.requires) != null && y.length) || f > 30) return (r.set(d, 0), 0);
      const g =
        1 + Math.max(...p.requires.map((v) => (o.has(v.skillId) ? c(v.skillId, f + 1) : 0)));
      return (r.set(d, g), g);
    };
  return c(i);
}
function ls(l, i) {
  return ug(bS(cg(l), i));
}
function Hn(l, i) {
  return l.learnedSkills[i] ?? 0;
}
function Wi(l) {
  return l.skillPoints.total - l.skillPoints.spent;
}
function dg(l, i) {
  return (i.requires ?? []).every((o) => Hn(l, o.skillId) >= o.level);
}
function mg(l, i) {
  const o = cg(l).find((r) => r.skillId === i);
  return !o || Hn(l, i) >= o.maxLevel || Wi(l) < ls(l, i) ? !1 : dg(l, o);
}
function _g(l, i) {
  return mg(l, i)
    ? {
        ...l,
        learnedSkills: { ...l.learnedSkills, [i]: Hn(l, i) + 1 },
        skillPoints: { ...l.skillPoints, spent: l.skillPoints.spent + ls(l, i) },
      }
    : l;
}
const Lc = 132,
  qc = 48,
  Er = 176,
  Cr = 62,
  fg = ({ nodes: l, char: i, onLearn: o }) => {
    const [r, c] = E.useState(null),
      d = E.useMemo(() => {
        var S;
        const p = new Map(l.map((j) => [j.skillId, j])),
          g = new Map(),
          y = (j, G = 0) => {
            var Y;
            if (g.has(j)) return g.get(j);
            const M = p.get(j);
            if (!M || !((Y = M.requires) != null && Y.length) || G > 20) return (g.set(j, 0), 0);
            const ee =
              1 + Math.max(...M.requires.map((C) => (p.has(C.skillId) ? y(C.skillId, G + 1) : 0)));
            return (g.set(j, ee), ee);
          },
          v = [];
        l.forEach((j, G) => {
          const M = y(j.skillId);
          (v[M] || (v[M] = [])).push(G);
        });
        const B = new Map(),
          A = v.map(() => new Set());
        for (let j = 0; j < v.length; j++)
          for (const G of v[j] ?? []) {
            const M = l[G];
            let ee = 0;
            if (j > 0 && (S = M.requires) != null && S.length) {
              const C = M.requires.map((K) => B.get(K.skillId)).filter((K) => K !== void 0);
              C.length && (ee = Math.min(...C));
            }
            let Y = ee;
            for (; A[j].has(Y); ) Y++;
            (A[j].add(Y), B.set(M.skillId, Y));
          }
        const I = Math.max(0, ...B.values()),
          w = l.map((j) => ({ node: j, col: y(j.skillId), row: B.get(j.skillId) ?? 0 })),
          x = [];
        for (const j of w)
          for (const G of j.node.requires ?? []) {
            const M = w.find((ee) => ee.node.skillId === G.skillId);
            M &&
              x.push({
                from: G.skillId,
                to: j.node.skillId,
                level: G.level,
                x1: M.col * Er + Lc,
                y1: M.row * Cr + qc / 2,
                x2: j.col * Er,
                y2: j.row * Cr + qc / 2,
              });
          }
        return { placed: w, edges: x, width: (v.length - 1) * Er + Lc, height: (I + 1) * Cr };
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
                var x;
                const v = Hn(i, p.skillId),
                  B = v >= p.maxLevel,
                  A = (p.requires ?? []).every((S) => Hn(i, S.skillId) >= S.level),
                  I = mg(i, p.skillId),
                  w = [
                    Xe.node,
                    v > 0 ? Xe.learned : '',
                    B ? Xe.maxed : '',
                    I ? Xe.available : '',
                    A ? '' : Xe.locked,
                    r === p.skillId ? Xe.selected : '',
                  ]
                    .filter(Boolean)
                    .join(' ');
                return m.jsxs(
                  'button',
                  {
                    type: 'button',
                    className: w,
                    style: { left: g * Er, top: y * Cr, width: Lc, height: qc },
                    onClick: () => c(p.skillId),
                    children: [
                      m.jsx('span', {
                        className: Xe.nodeName,
                        children: ((x = Xi[p.skillId]) == null ? void 0 : x.name) ?? p.skillId,
                      }),
                      m.jsxs('span', { className: Xe.nodeCost, children: ['SP', ug(g)] }),
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
              var w;
              const p = Hn(i, f.id),
                g = p >= h.maxLevel,
                y = dg(i, h),
                v = ls(i, f.id),
                B = Wi(i) >= v,
                A = !g && y && B,
                I = g
                  ? '習得済み（最大Lv）'
                  : y
                    ? B
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
                  (w = h.requires) != null && w.length
                    ? m.jsxs('div', {
                        className: Xe.detailReq,
                        children: [
                          '前提:',
                          ' ',
                          h.requires
                            .map((x) => {
                              var S;
                              return `${((S = Xi[x.skillId]) == null ? void 0 : S.name) ?? x.skillId} Lv${x.level}`;
                            })
                            .join('・'),
                        ],
                      })
                    : null,
                  m.jsx('button', {
                    type: 'button',
                    className: Xe.learnBtn,
                    disabled: !A,
                    onClick: () => o(f.id),
                    children: I,
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
  jr = [
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
function Fp(l) {
  const i = Math.floor((l - 1) / 10);
  return jr[((i % jr.length) + jr.length) % jr.length];
}
function xS(l) {
  var r, c, d;
  const i = l.diveState;
  if (!i) return !1;
  const o =
    (c = (r = l.towerState.floors[i.depth]) == null ? void 0 : r.generated.cells[i.pos.y]) == null
      ? void 0
      : c[i.pos.x];
  return ((d = o == null ? void 0 : o.event) == null ? void 0 : d.kind) === 'cookingSpot';
}
function SS(l) {
  const i = new Set(l.unlockedRecipeIds ?? []);
  return Object.values(Qn).filter((o) => i.has(o.id));
}
function pg(l, i) {
  const o = Qn[i];
  return !o || !(l.unlockedRecipeIds ?? []).includes(i)
    ? !1
    : o.ingredients.every((r) => od(l, r.itemId) >= r.qty);
}
function wS(l, i) {
  if (!pg(l, i)) return { ok: !1, save: l };
  const o = Qn[i];
  let r = l;
  for (const c of o.ingredients) r = Dh(r, c.itemId, c.qty);
  return ((r = Mh(r, o.result.itemId, o.result.count)), { ok: !0, save: r });
}
function hg(l, i) {
  const o = new Set([...l.guild.party.front, ...l.guild.party.back].filter((r) => r !== null));
  return l.guild.members.some((r) => o.has(r.id) && (r.learnedSkills[i] ?? 0) > 0);
}
function gg(l) {
  var d, f, h;
  const i = l.diveState;
  if (!i) return null;
  const o = (d = l.towerState.floors[i.depth]) == null ? void 0 : d.generated,
    r = (f = o == null ? void 0 : o.cells[i.pos.y]) == null ? void 0 : f[i.pos.x];
  if (!o || ((h = r == null ? void 0 : r.event) == null ? void 0 : h.kind) !== 'gather')
    return null;
  const c = r.event.gatherId;
  return o.gatheringPoints.find((p) => p.id === c) ?? null;
}
function Qc(l, i) {
  var c;
  const o = l.diveState;
  return o
    ? (((c = l.towerState.floors[o.depth]) == null ? void 0 : c.depletedGathers) ?? []).includes(
        Hr(i.cell.x, i.cell.y)
      )
    : !0;
}
function Wp(l, i) {
  return hg(l, Ga[i.type].requiredSkillId);
}
function TS(l, i) {
  const o = l.reduce((c, d) => c + d.weight, 0);
  let r = i.next() * o;
  for (const c of l) if (((r -= c.weight), r < 0)) return c.itemId;
  return l[l.length - 1].itemId;
}
function ES(l, i) {
  const o = l.diveState;
  if (!o) return { ok: !1, save: l, reason: 'noDive' };
  const r = gg(l);
  if (!r) return { ok: !1, save: l, reason: 'noPoint' };
  if (Qc(l, r)) return { ok: !1, save: l, reason: 'depleted' };
  const c = Ga[r.type];
  if (!hg(l, c.requiredSkillId)) return { ok: !1, save: l, reason: 'noSkill' };
  if (c.food && Ih(l) >= Oh) return { ok: !1, save: l, reason: 'foodFull' };
  const d = TS(c.drops, i);
  let f = c.food ? Mh(l, d, 1) : sd(l, d, 1);
  const h = Hr(r.cell.x, r.cell.y),
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
  var w;
  const r = Fe[i];
  if (!r) return { save: l, ok: !1, message: 'そのアイテムは無い' };
  if (!((w = r.useContext) != null && w.includes('field')))
    return { save: l, ok: !1, message: 'ここでは使えない' };
  const c = a1(i);
  if ((c ? od(l, i) : id(l, i)) <= 0) return { save: l, ok: !1, message: '所持していない' };
  const f = (x) => (c ? Dh(x, i, 1) : rd(x, i, 1));
  if (i === 'item_return_thread')
    return l.diveState
      ? { save: Pi(f(l)), ok: !0, message: '拠点へ帰還した' }
      : { save: l, ok: !1, message: '探索中のみ使える' };
  if (!l.diveState) return { save: l, ok: !1, message: '探索中のみ使える' };
  const h = l.diveState.party.find((x) => x.charId === o),
    p = l.guild.members.find((x) => x.id === o);
  if (!h || !p) return { save: l, ok: !1, message: '対象がいない' };
  const g = $l(p);
  let y = h.hp,
    v = h.tp,
    B = !1;
  for (const x of r.effects ?? [])
    x.kind === 'heal'
      ? ((y = Math.min(g.hp, y + x.amount(1))), (B = !0))
      : x.kind === 'restoreTp' && ((v = Math.min(g.tp, v + x.amount(1))), (B = !0));
  if (!B) return { save: l, ok: !1, message: 'いま使う効果がない' };
  const A = l.diveState.party.map((x) => (x.charId === o ? { ...x, hp: y, tp: v } : x));
  return {
    save: f({ ...l, diveState: { ...l.diveState, party: A } }),
    ok: !0,
    message: `${p.name} に ${r.name} を使った`,
  };
}
const jS = (l) => new Promise((i) => setTimeout(i, l)),
  NS = () => {
    const l = ml(),
      { save: i, applySave: o, applyAndPersist: r } = Vl(),
      c = E.useRef(null),
      d = E.useRef(!1),
      [f, h] = E.useState(!1),
      [p, g] = E.useState(!1),
      [y, v] = E.useState(!1),
      [B, A] = E.useState(null),
      [I, w] = E.useState('class'),
      [x, S] = E.useState(null),
      [j, G] = E.useState(null),
      M = (i == null ? void 0 : i.diveState) ?? null,
      ee = E.useMemo(() => {
        var Q;
        return i && M ? ((Q = i.towerState.floors[M.depth]) == null ? void 0 : Q.generated) : null;
      }, [i, M]),
      Y = E.useMemo(() => {
        var Q;
        return i && M
          ? (((Q = i.towerState.floors[M.depth]) == null ? void 0 : Q.foeRuntime) ?? [])
              .filter((b) => !b.defeated)
              .map((b) => ({ x: b.cell.x, y: b.cell.y, alerted: b.alerted }))
          : [];
      }, [i, M]),
      C = E.useMemo(() => (i ? gg(i) : null), [i]),
      K = E.useMemo(() => (i ? xS(i) : !1), [i]),
      te = E.useMemo(() => {
        var Q;
        return i && M
          ? (((Q = i.towerState.floors[M.depth]) == null ? void 0 : Q.depletedGathers) ?? [])
          : [];
      }, [i, M]),
      de = E.useCallback(() => {
        var b;
        if (!i) return;
        c.current || (c.current = ba((i.masterSeed ^ 2654435769) >>> 0));
        const Q = ES(i, c.current);
        if (!Q.ok) {
          S(
            Q.reason === 'noSkill'
              ? '対応する採集スキルを持つ仲間がいない'
              : Q.reason === 'foodFull'
                ? '食料がいっぱいで採れない'
                : '採集できない'
          );
          return;
        }
        (r(() => Q.save),
          S(
            `${Q.itemId ? (((b = Fe[Q.itemId]) == null ? void 0 : b.name) ?? '素材') : '素材'} を手に入れた`
          ));
      }, [i, r]),
      le = E.useCallback(
        (Q) => {
          var H;
          if (!i) return;
          const b = wS(i, Q);
          b.ok &&
            (r(() => b.save), S(`${((H = Qn[Q]) == null ? void 0 : H.name) ?? '料理'} を作った`));
        },
        [i, r]
      ),
      ue = E.useCallback(
        (Q) => {
          if (!i) return;
          (S(null), c.current || (c.current = ba((i.masterSeed ^ 2654435769) >>> 0)));
          const b = Up(i, Q, c.current);
          (r(() => b.save), b.triggered && l('/battle'));
        },
        [i, r, l]
      ),
      ye = E.useCallback(
        (Q) => {
          o((b) => Ph(b, Q));
        },
        [o]
      ),
      Se = E.useCallback(async () => {
        if (!i) return;
        const Q = Gp(i);
        if (Q === 'stairsUp') {
          if (!Wh(i, i.diveState.depth)) {
            S('強大な力に阻まれている。階層ボスを倒さねば先へ進めない。');
            return;
          }
          await r((b) => px(b));
        } else
          Q === 'stairsDown' &&
            (i.diveState.depth <= 1 ? (await r((b) => Pi(b)), l('/town')) : await r((b) => hx(b)));
      }, [i, r, l]),
      ke = E.useCallback(async () => {
        (await r((Q) => Pi(Q)), l('/town'));
      }, [r, l]),
      L = E.useCallback(
        (Q, b) => {
          if (!i) return;
          const H = CS(i, Q, b);
          H.ok && (r(() => H.save), H.save.diveState || (h(!1), l('/town')));
        },
        [i, r, l]
      ),
      J = E.useCallback(
        async (Q) => {
          if (!(d.current || Q.length === 0)) {
            ((d.current = !0), S(null));
            try {
              for (const b of Q) {
                if (!c.current) continue;
                let H = !1,
                  P = !1;
                if (
                  (await r((F) => {
                    if (!F.diveState) return F;
                    const re = Up(F, b, c.current);
                    return ((H = re.triggered), (P = re.moved), re.save);
                  }),
                  H)
                ) {
                  l('/battle');
                  return;
                }
                if (!P) return;
                await jS(110);
              }
            } finally {
              d.current = !1;
            }
          }
        },
        [r, l]
      ),
      ae = E.useCallback(
        (Q, b) => {
          if (!M || !ee || d.current) return;
          c.current || (c.current = ba((i.masterSeed ^ 2654435769) >>> 0));
          const H = P1(ee, M.pos, { x: Q, y: b });
          H && H.length > 0 && J(H);
        },
        [M, ee, i, J]
      );
    if (!i) return m.jsx(ul, { to: '/title', replace: !0 });
    if (!M || !ee) return m.jsx(ul, { to: '/town', replace: !0 });
    const ge = Gp(i);
    return m.jsxs('div', {
      className: ne.layout,
      children: [
        m.jsxs('header', {
          className: ne.head,
          children: [
            m.jsxs('div', {
              className: ne.depth,
              children: [
                M.depth,
                'F ',
                m.jsx('span', { className: ne.theme, children: Fp(M.depth).name }),
              ],
            }),
            m.jsx(G2, { level: K1(M.encounter.stepsUntilEncounter) }),
            m.jsx('button', {
              type: 'button',
              className: ne.menuBtn,
              onClick: () => {
                (A(null), v(!0));
              },
              children: '☰ メニュー',
            }),
          ],
        }),
        m.jsxs('div', {
          className: ne.fpvWrap,
          children: [
            m.jsx(K2, { floor: ee, pos: M.pos, dir: M.dir, foes: Y, theme: Fp(M.depth) }),
            m.jsxs('div', {
              className: ne.fpvControls,
              children: [
                m.jsx('button', {
                  type: 'button',
                  className: ne.fpvTurn,
                  onClick: () => ye(Vh(M.dir)),
                  'aria-label': '左を向く',
                  children: '↰',
                }),
                m.jsx('button', {
                  type: 'button',
                  className: ne.fpvForward,
                  onClick: () => ue(M.dir),
                  children: '▲ 前進',
                }),
                m.jsx('button', {
                  type: 'button',
                  className: ne.fpvTurn,
                  onClick: () => ye(Xh(M.dir)),
                  'aria-label': '右を向く',
                  children: '↱',
                }),
              ],
            }),
            m.jsx('button', {
              type: 'button',
              className: ne.fpvBack,
              onClick: () => ye(Z1(M.dir)),
              'aria-label': '振り向く',
              children: '↻',
            }),
          ],
        }),
        m.jsx('div', {
          className: ne.mapWrap,
          children: m.jsx(I2, {
            floor: ee,
            explored: i.exploredCells[M.depth] ?? [],
            pos: M.pos,
            dir: M.dir,
            foes: Y,
            depletedGathers: te,
            onCellClick: ae,
          }),
        }),
        m.jsx('p', {
          className: ne.paletteHint,
          children: 'マップのマスをタップすると、そこまで自動で移動します。',
        }),
        ge &&
          m.jsx('button', {
            type: 'button',
            className: ne.stairs,
            onClick: () => void Se(),
            children:
              ge === 'stairsUp'
                ? '▲ 次の階へ進む'
                : M.depth <= 1
                  ? '▼ 拠点へ戻る'
                  : '▼ 前の階へ戻る',
          }),
        C &&
          m.jsx('button', {
            type: 'button',
            className: ne.action,
            disabled: Qc(i, C) || !Wp(i, C),
            onClick: de,
            children: Qc(i, C)
              ? `🌿 ${Ga[C.type].name}（採集済み）`
              : Wp(i, C)
                ? `🌿 ${Ga[C.type].name}する`
                : `🌿 ${Ga[C.type].name}（スキル要）`,
          }),
        K &&
          m.jsx('button', {
            type: 'button',
            className: ne.action,
            onClick: () => g(!0),
            children: '🍳 調理する',
          }),
        x && m.jsx('p', { className: ne.notice, children: x }),
        f
          ? m.jsx('div', {
              className: ne.itemOverlay,
              onClick: () => h(!1),
              children: m.jsxs('div', {
                className: ne.itemPanel,
                onClick: (Q) => Q.stopPropagation(),
                children: [
                  m.jsx('div', { className: ne.itemTitle, children: 'どうぐ・食料' }),
                  (() => {
                    const Q = [...i.guild.storage, ...(i.guild.foodStorage ?? [])].filter((b) => {
                      var H, P;
                      return (
                        ((P = (H = Fe[b.itemId]) == null ? void 0 : H.useContext) == null
                          ? void 0
                          : P.includes('field')) && b.qty > 0
                      );
                    });
                    return Q.length === 0
                      ? m.jsx('p', {
                          className: ne.itemEmpty,
                          children: '使える道具がありません。',
                        })
                      : Q.map((b) => {
                          const H = Fe[b.itemId],
                            P = b.itemId === 'item_return_thread';
                          return m.jsxs(
                            'div',
                            {
                              className: ne.itemRow,
                              children: [
                                m.jsxs('div', {
                                  className: ne.itemName,
                                  children: [
                                    H.name,
                                    ' ×',
                                    b.qty,
                                    m.jsx('span', {
                                      className: ne.itemDesc,
                                      children: H.description,
                                    }),
                                  ],
                                }),
                                P
                                  ? m.jsx('button', {
                                      type: 'button',
                                      className: ne.itemUse,
                                      onClick: () =>
                                        G({
                                          message: `${H.name} を使いますか？`,
                                          okLabel: '使う',
                                          onYes: () => L(b.itemId),
                                        }),
                                      children: '使う',
                                    })
                                  : m.jsx('div', {
                                      className: ne.itemTargets,
                                      children: M.party.map((F) => {
                                        const re = i.guild.members.find((ce) => ce.id === F.charId);
                                        if (!re) return null;
                                        const fe = $l(re);
                                        return m.jsxs(
                                          'button',
                                          {
                                            type: 'button',
                                            className: ne.itemTarget,
                                            onClick: () =>
                                              G({
                                                message: `${re.name} に ${H.name} を使いますか？`,
                                                okLabel: '使う',
                                                onYes: () => L(b.itemId, F.charId),
                                              }),
                                            children: [
                                              re.name,
                                              m.jsxs('span', {
                                                className: ne.itemHp,
                                                children: [
                                                  'HP ',
                                                  F.hp,
                                                  '/',
                                                  fe.hp,
                                                  '・TP ',
                                                  F.tp,
                                                  '/',
                                                  fe.tp,
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
                    className: ne.itemClose,
                    onClick: () => h(!1),
                    children: 'とじる',
                  }),
                ],
              }),
            })
          : null,
        p
          ? m.jsx('div', {
              className: ne.itemOverlay,
              onClick: () => g(!1),
              children: m.jsxs('div', {
                className: ne.itemPanel,
                onClick: (Q) => Q.stopPropagation(),
                children: [
                  m.jsx('div', { className: ne.itemTitle, children: '調理' }),
                  (() => {
                    const Q = SS(i);
                    return Q.length === 0
                      ? m.jsx('p', {
                          className: ne.itemEmpty,
                          children: '作れるレシピがありません。',
                        })
                      : Q.map((b) => {
                          var F;
                          const H = pg(i, b.id),
                            P = b.ingredients
                              .map((re) => {
                                var fe;
                                return `${((fe = Fe[re.itemId]) == null ? void 0 : fe.name) ?? re.itemId}×${re.qty}`;
                              })
                              .join(' ＋ ');
                          return m.jsxs(
                            'div',
                            {
                              className: ne.itemRow,
                              children: [
                                m.jsxs('div', {
                                  className: ne.itemName,
                                  children: [
                                    b.name,
                                    m.jsxs('span', {
                                      className: ne.itemDesc,
                                      children: [
                                        P,
                                        ' → ',
                                        ((F = Fe[b.result.itemId]) == null ? void 0 : F.name) ??
                                          b.result.itemId,
                                        '（所持',
                                        b.ingredients
                                          .map((re) => {
                                            var fe;
                                            return `${((fe = Fe[re.itemId]) == null ? void 0 : fe.name) ?? ''}${od(i, re.itemId)}`;
                                          })
                                          .join('・'),
                                        '）',
                                      ],
                                    }),
                                  ],
                                }),
                                m.jsx('button', {
                                  type: 'button',
                                  className: ne.itemUse,
                                  disabled: !H,
                                  onClick: () =>
                                    G({
                                      message: `${b.name} を作りますか？`,
                                      okLabel: '作る',
                                      onYes: () => le(b.id),
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
                    className: ne.itemClose,
                    onClick: () => g(!1),
                    children: 'とじる',
                  }),
                ],
              }),
            })
          : null,
        y
          ? m.jsx('div', {
              className: ne.itemOverlay,
              onClick: () => v(!1),
              children: m.jsx('div', {
                className: ne.itemPanel,
                onClick: (Q) => Q.stopPropagation(),
                children: (() => {
                  var P, F, re, fe;
                  const Q = B ? i.guild.members.find((ce) => ce.id === B) : null;
                  if (!Q)
                    return m.jsxs(m.Fragment, {
                      children: [
                        m.jsx('div', { className: ne.itemTitle, children: 'メニュー' }),
                        m.jsxs('p', {
                          className: ne.menuGold,
                          children: ['所持金 ', i.guild.gold, ' G'],
                        }),
                        m.jsxs('div', {
                          className: ne.menuActions,
                          children: [
                            m.jsx('button', {
                              type: 'button',
                              className: ne.menuAction,
                              onClick: () => {
                                (v(!1), h(!0));
                              },
                              children: '🎒 どうぐ・食料',
                            }),
                            m.jsx('button', {
                              type: 'button',
                              className: ne.menuAction,
                              onClick: () => void ke(),
                              children: '🏠 拠点へ帰還',
                            }),
                          ],
                        }),
                        m.jsx('p', {
                          className: ne.menuSectionLabel,
                          children: 'パーティ（タップで詳細・スキル振り）',
                        }),
                        M.party.map((ce) => {
                          var yl;
                          const Ae = i.guild.members.find((bl) => bl.id === ce.charId);
                          if (!Ae) return null;
                          const Ie = $l(Ae),
                            tl = Wi(Ae);
                          return m.jsxs(
                            'button',
                            {
                              type: 'button',
                              className: ne.menuMember,
                              onClick: () => {
                                (A(ce.charId), w('class'));
                              },
                              children: [
                                m.jsxs('span', {
                                  className: ne.menuMemberName,
                                  children: [
                                    Ae.name,
                                    m.jsxs('span', {
                                      className: ne.menuMemberJob,
                                      children: [
                                        (yl = tt[Ae.classId]) == null ? void 0 : yl.name,
                                        ' Lv',
                                        Ae.level,
                                      ],
                                    }),
                                  ],
                                }),
                                m.jsxs('span', {
                                  className: ne.menuMemberStat,
                                  children: [
                                    'HP ',
                                    ce.hp,
                                    '/',
                                    Ie.hp,
                                    '・TP ',
                                    ce.tp,
                                    '/',
                                    Ie.tp,
                                    tl > 0
                                      ? m.jsxs('span', {
                                          className: ne.menuSp,
                                          children: ['SP ', tl],
                                        })
                                      : null,
                                  ],
                                }),
                              ],
                            },
                            ce.charId
                          );
                        }),
                        m.jsx('button', {
                          type: 'button',
                          className: ne.itemClose,
                          onClick: () => v(!1),
                          children: 'とじる',
                        }),
                      ],
                    });
                  const b = $l(Q),
                    H =
                      I === 'class'
                        ? (((P = tt[Q.classId]) == null ? void 0 : P.skillTree.skills) ?? [])
                        : I === 'race'
                          ? (((F = St[Q.raceId]) == null ? void 0 : F.raceSkillTree.skills) ?? [])
                          : Q.titleId
                            ? (((re = Gl[Q.titleId]) == null ? void 0 : re.skillTree.skills) ?? [])
                            : [];
                  return m.jsxs(m.Fragment, {
                    children: [
                      m.jsxs('div', {
                        className: ne.itemTitle,
                        children: [
                          Q.name,
                          '（',
                          (fe = tt[Q.classId]) == null ? void 0 : fe.name,
                          ' Lv',
                          Q.level,
                          '）',
                          m.jsxs('span', { className: ne.menuSp, children: ['SP ', Wi(Q)] }),
                        ],
                      }),
                      m.jsx('div', {
                        className: ne.menuStats,
                        children: [
                          ['HP', b.hp],
                          ['TP', b.tp],
                          ['STR', b.str],
                          ['VIT', b.vit],
                          ['AGI', b.agi],
                          ['INT', b.int],
                          ['MND', b.mnd],
                          ['LUC', b.luc],
                        ].map(([ce, Ae]) =>
                          m.jsxs('span', { className: ne.menuStat, children: [ce, ' ', Ae] }, ce)
                        ),
                      }),
                      m.jsx('div', {
                        className: ne.skillTabs,
                        children: ['class', 'race', 'title'].map((ce) =>
                          m.jsx(
                            'button',
                            {
                              type: 'button',
                              className: `${ne.skillTab} ${I === ce ? ne.skillTabOn : ''}`,
                              onClick: () => w(ce),
                              disabled: ce === 'title' && !Q.titleId,
                              children: ce === 'class' ? '職業' : ce === 'race' ? '種族' : '称号',
                            },
                            ce
                          )
                        ),
                      }),
                      m.jsx(fg, {
                        nodes: H,
                        char: Q,
                        onLearn: (ce) =>
                          void r((Ae) => ({
                            ...Ae,
                            guild: {
                              ...Ae.guild,
                              members: Ae.guild.members.map((Ie) =>
                                Ie.id === Q.id ? _g(Ie, ce) : Ie
                              ),
                            },
                          })),
                      }),
                      m.jsx('button', {
                        type: 'button',
                        className: ne.itemClose,
                        onClick: () => A(null),
                        children: '← もどる',
                      }),
                    ],
                  });
                })(),
              }),
            })
          : null,
        j
          ? m.jsx('div', {
              className: ne.confirmOverlay,
              onClick: () => G(null),
              children: m.jsxs('div', {
                className: ne.confirmBox,
                onClick: (Q) => Q.stopPropagation(),
                children: [
                  m.jsx('div', { className: ne.confirmText, children: j.message }),
                  m.jsxs('div', {
                    className: ne.confirmActions,
                    children: [
                      m.jsx('button', {
                        type: 'button',
                        className: ne.confirmCancel,
                        onClick: () => G(null),
                        children: 'やめる',
                      }),
                      m.jsx('button', {
                        type: 'button',
                        className: ne.confirmOk,
                        onClick: () => {
                          (j.onYes(), G(null));
                        },
                        children: j.okLabel,
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
  AS = '_layout_1id7b_1',
  LS = '_head_1id7b_11',
  qS = '_title_1id7b_18',
  BS = '_stock_1id7b_24',
  OS = '_tabs_1id7b_29',
  IS = '_tab_1id7b_29',
  MS = '_tabActive_1id7b_46',
  DS = '_hint_1id7b_51',
  RS = '_list_1id7b_57',
  zS = '_row_1id7b_65',
  HS = '_info_1id7b_76',
  US = '_name_1id7b_82',
  GS = '_note_1id7b_87',
  $S = '_actions_1id7b_92',
  YS = '_ingot_1id7b_97',
  XS = '_recycle_1id7b_114',
  VS = '_maxed_1id7b_126',
  QS = '_empty_1id7b_132',
  KS = '_foot_1id7b_137',
  ZS = '_back_1id7b_141',
  JS = '_confirmOverlay_1id7b_151',
  PS = '_confirmBox_1id7b_162',
  FS = '_confirmText_1id7b_174',
  WS = '_confirmActions_1id7b_181',
  e5 = '_confirmCancel_1id7b_186',
  t5 = '_confirmOk_1id7b_187',
  Ge = {
    layout: AS,
    head: LS,
    title: qS,
    stock: BS,
    tabs: OS,
    tab: IS,
    tabActive: MS,
    hint: DS,
    list: RS,
    row: zS,
    info: HS,
    name: US,
    note: GS,
    actions: $S,
    ingot: YS,
    recycle: XS,
    maxed: VS,
    empty: QS,
    foot: KS,
    back: ZS,
    confirmOverlay: JS,
    confirmBox: PS,
    confirmText: FS,
    confirmActions: WS,
    confirmCancel: e5,
    confirmOk: t5,
  },
  l5 = () => {
    const l = ml(),
      { save: i, applyAndPersist: o } = Vl(),
      [r, c] = E.useState('forge'),
      [d, f] = E.useState(null);
    if (!i) return m.jsx(ul, { to: '/title', replace: !0 });
    const { copper: h, silver: p, gold: g } = i.forgeInventory.ingots,
      y = i.forgeInventory.fragments.common ?? 0,
      v = i.guild.equipment,
      B = () => {
        d &&
          (d.kind === 'forge'
            ? o((I) => k1(I, d.instanceId, d.ingot).save)
            : o((I) => v1(I, d.id).save),
          f(null));
      },
      A = (I, w, x, S, j) =>
        m.jsxs('button', {
          type: 'button',
          className: Ge.ingot,
          disabled: j <= 0,
          onClick: () => f({ kind: 'forge', instanceId: I, ingot: x, name: w, ingotLabel: S }),
          children: [S, '+', kl.INGOT_INC[x], '（', j, '）'],
        });
    return m.jsxs('div', {
      className: Ge.layout,
      children: [
        m.jsxs('header', {
          className: Ge.head,
          children: [
            m.jsx('h1', { className: Ge.title, children: '鍛冶屋' }),
            m.jsxs('span', {
              className: Ge.stock,
              children: ['銅', h, '・銀', p, '・金', g, '／断片', y],
            }),
          ],
        }),
        m.jsxs('div', {
          className: Ge.tabs,
          children: [
            m.jsx('button', {
              type: 'button',
              className: `${Ge.tab} ${r === 'forge' ? Ge.tabActive : ''}`,
              onClick: () => c('forge'),
              children: '強化',
            }),
            m.jsx('button', {
              type: 'button',
              className: `${Ge.tab} ${r === 'recycle' ? Ge.tabActive : ''}`,
              onClick: () => c('recycle'),
              children: 'リサイクル',
            }),
          ],
        }),
        m.jsx('p', {
          className: Ge.hint,
          children:
            r === 'forge'
              ? 'インゴットで装備を強化（最大 +5）。銅+1・銀+3・金+5。'
              : '不要な装備を断片に変換。断片10個で銅インゴット1個になる。',
        }),
        m.jsx('div', {
          className: Ge.list,
          children:
            v.length === 0
              ? m.jsx('p', { className: Ge.empty, children: '所有している装備がありません。' })
              : v.map((I) => {
                  const w = lt[I.masterId],
                    x = I.forgeLevel >= kl.MAX_LEVEL;
                  return m.jsxs(
                    'div',
                    {
                      className: Ge.row,
                      children: [
                        m.jsxs('div', {
                          className: Ge.info,
                          children: [
                            m.jsx('span', { className: Ge.name, children: ya(I) }),
                            m.jsx('span', {
                              className: Ge.note,
                              children: w == null ? void 0 : w.slot,
                            }),
                          ],
                        }),
                        r === 'forge'
                          ? m.jsx('div', {
                              className: Ge.actions,
                              children: x
                                ? m.jsx('span', { className: Ge.maxed, children: '最大強化' })
                                : m.jsxs(m.Fragment, {
                                    children: [
                                      A(I.id, ya(I), 'copper', '銅', h),
                                      A(I.id, ya(I), 'silver', '銀', p),
                                      A(I.id, ya(I), 'gold', '金', g),
                                    ],
                                  }),
                            })
                          : m.jsxs('button', {
                              type: 'button',
                              className: Ge.recycle,
                              onClick: () => f({ kind: 'recycle', id: I.id, name: ya(I) }),
                              children: ['分解（断片+', kl.RECYCLE_FRAGMENTS, '）'],
                            }),
                      ],
                    },
                    I.id
                  );
                }),
        }),
        m.jsx('footer', {
          className: Ge.foot,
          children: m.jsx('button', {
            type: 'button',
            className: Ge.back,
            onClick: () => l('/town'),
            children: '拠点へ戻る',
          }),
        }),
        d
          ? m.jsx('div', {
              className: Ge.confirmOverlay,
              onClick: () => f(null),
              children: m.jsxs('div', {
                className: Ge.confirmBox,
                onClick: (I) => I.stopPropagation(),
                children: [
                  m.jsx('div', {
                    className: Ge.confirmText,
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
                    className: Ge.confirmActions,
                    children: [
                      m.jsx('button', {
                        type: 'button',
                        className: Ge.confirmCancel,
                        onClick: () => f(null),
                        children: 'やめる',
                      }),
                      m.jsx('button', {
                        type: 'button',
                        className: Ge.confirmOk,
                        onClick: B,
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
  a5 = '_layout_16au8_2',
  n5 = '_head_16au8_13',
  i5 = '_title_16au8_20',
  s5 = '_count_16au8_26',
  r5 = '_create_16au8_31',
  o5 = '_sectionTitle_16au8_42',
  u5 = '_field_16au8_48',
  c5 = '_primary_16au8_64',
  d5 = '_list_16au8_79',
  m5 = '_empty_16au8_83',
  _5 = '_members_16au8_88',
  f5 = '_member_16au8_88',
  p5 = '_memberMain_16au8_107',
  h5 = '_memberName_16au8_119',
  g5 = '_pos_16au8_127',
  k5 = '_memberSub_16au8_144',
  v5 = '_posBtns_16au8_149',
  y5 = '_posBtn_16au8_149',
  b5 = '_posBtnActive_16au8_164',
  x5 = '_foot_16au8_170',
  S5 = '_sub_16au8_174',
  Me = {
    layout: a5,
    head: n5,
    title: i5,
    count: s5,
    create: r5,
    sectionTitle: o5,
    field: u5,
    primary: c5,
    list: d5,
    empty: m5,
    members: _5,
    member: f5,
    memberMain: p5,
    memberName: h5,
    pos: g5,
    pos_前衛: '_pos_前衛_16au8_136',
    pos_後衛: '_pos_後衛_16au8_140',
    memberSub: k5,
    posBtns: v5,
    posBtn: y5,
    posBtnActive: b5,
    foot: x5,
    sub: S5,
  };
function w5(l) {
  return [...l.guild.party.front, ...l.guild.party.back].filter((i) => i !== null).length;
}
const kg = (l) => (l === 'front' ? Vr : Qr);
function T5(l, i, o, r) {
  if (o < 0 || o >= kg(i) || (r !== null && !l.guild.members.some((f) => f.id === r))) return l;
  const c = l.guild.party.front.map((f) => (f === r ? null : f)),
    d = l.guild.party.back.map((f) => (f === r ? null : f));
  for (; c.length < Vr; ) c.push(null);
  for (; d.length < Qr; ) d.push(null);
  return (
    i === 'front' ? (c[o] = r) : (d[o] = r),
    { ...l, guild: { ...l.guild, party: { front: c, back: d } } }
  );
}
function vg(l, i) {
  const o = l.guild.party.front.map((c) => (c === i ? null : c)),
    r = l.guild.party.back.map((c) => (c === i ? null : c));
  return { ...l, guild: { ...l.guild, party: { front: o, back: r } } };
}
function eh(l, i, o) {
  if (
    !l.guild.members.some((h) => h.id === i) ||
    (o === 'front' ? l.guild.party.front : l.guild.party.back).includes(i)
  )
    return l;
  const c = vg(l, i),
    d = o === 'front' ? c.guild.party.front : c.guild.party.back;
  let f = d.indexOf(null);
  if (f < 0)
    if (d.length < kg(o)) f = d.length;
    else return l;
  return T5(c, o, f, i);
}
function E5(l, i) {
  return l.guild.party.front.includes(i)
    ? '前衛'
    : l.guild.party.back.includes(i)
      ? '後衛'
      : '控え';
}
const C5 = () => {
    const l = ml(),
      { save: i, applyAndPersist: o } = Vl(),
      r = Object.keys(St),
      c = Object.keys(tt),
      [d, f] = E.useState(''),
      [h, p] = E.useState(r[0]),
      [g, y] = E.useState(c[0]),
      [v, B] = E.useState(!1),
      A = E.useCallback(async () => {
        const x = d.trim() || '名もなき冒険者',
          S = eg({ raceId: h, classId: g, name: x });
        (B(!0), await o((j) => wx(j, S)), f(''), B(!1));
      }, [d, h, g, o]);
    if (!i) return m.jsx(ul, { to: '/title', replace: !0 });
    const { members: I } = i.guild,
      w = I.length >= Mc;
    return m.jsxs('div', {
      className: Me.layout,
      children: [
        m.jsxs('header', {
          className: Me.head,
          children: [
            m.jsx('h1', { className: Me.title, children: 'ギルド管理' }),
            m.jsxs('span', { className: Me.count, children: ['団員 ', I.length, ' / ', Mc] }),
          ],
        }),
        m.jsxs('section', {
          className: Me.create,
          children: [
            m.jsx('h2', { className: Me.sectionTitle, children: '冒険者を作成' }),
            m.jsxs('label', {
              className: Me.field,
              children: [
                m.jsx('span', { children: '名前' }),
                m.jsx('input', {
                  type: 'text',
                  value: d,
                  maxLength: 16,
                  placeholder: '名もなき冒険者',
                  onChange: (x) => f(x.target.value),
                }),
              ],
            }),
            m.jsxs('label', {
              className: Me.field,
              children: [
                m.jsx('span', { children: '種族' }),
                m.jsx('select', {
                  value: h,
                  onChange: (x) => p(x.target.value),
                  children: r.map((x) => m.jsx('option', { value: x, children: St[x].name }, x)),
                }),
              ],
            }),
            m.jsxs('label', {
              className: Me.field,
              children: [
                m.jsx('span', { children: '職業' }),
                m.jsx('select', {
                  value: g,
                  onChange: (x) => y(x.target.value),
                  children: c.map((x) => m.jsx('option', { value: x, children: tt[x].name }, x)),
                }),
              ],
            }),
            m.jsx('button', {
              type: 'button',
              className: Me.primary,
              disabled: v || w,
              onClick: () => void A(),
              children: w ? '団員が上限です' : '作成する',
            }),
          ],
        }),
        m.jsxs('section', {
          className: Me.list,
          children: [
            m.jsxs('h2', {
              className: Me.sectionTitle,
              children: [
                '団員一覧',
                ' ',
                m.jsxs('span', {
                  className: Me.count,
                  children: ['（出撃 ', w5(i), ' / ', i1, '）'],
                }),
              ],
            }),
            I.length === 0
              ? m.jsx('p', { className: Me.empty, children: 'まだ冒険者がいません。' })
              : m.jsx('ul', {
                  className: Me.members,
                  children: I.map((x) => {
                    var j, G;
                    const S = E5(i, x.id);
                    return m.jsxs(
                      'li',
                      {
                        className: Me.member,
                        children: [
                          m.jsxs('button', {
                            type: 'button',
                            className: Me.memberMain,
                            onClick: () => l(`/guild/char/${x.id}`),
                            children: [
                              m.jsxs('span', {
                                className: Me.memberName,
                                children: [
                                  x.name,
                                  m.jsx('span', {
                                    className: `${Me.pos} ${Me[`pos_${S}`] ?? ''}`,
                                    children: S,
                                  }),
                                ],
                              }),
                              m.jsxs('span', {
                                className: Me.memberSub,
                                children: [
                                  (j = St[x.raceId]) == null ? void 0 : j.name,
                                  ' / ',
                                  (G = tt[x.classId]) == null ? void 0 : G.name,
                                  ' / Lv',
                                  x.level,
                                  ' ›',
                                ],
                              }),
                            ],
                          }),
                          m.jsxs('div', {
                            className: Me.posBtns,
                            children: [
                              m.jsx('button', {
                                type: 'button',
                                className: `${Me.posBtn} ${S === '前衛' ? Me.posBtnActive : ''}`,
                                onClick: () => void o((M) => eh(M, x.id, 'front')),
                                children: '前',
                              }),
                              m.jsx('button', {
                                type: 'button',
                                className: `${Me.posBtn} ${S === '後衛' ? Me.posBtnActive : ''}`,
                                onClick: () => void o((M) => eh(M, x.id, 'back')),
                                children: '後',
                              }),
                              m.jsx('button', {
                                type: 'button',
                                className: `${Me.posBtn} ${S === '控え' ? Me.posBtnActive : ''}`,
                                onClick: () => void o((M) => vg(M, x.id)),
                                children: '控',
                              }),
                            ],
                          }),
                        ],
                      },
                      x.id
                    );
                  }),
                }),
          ],
        }),
        m.jsx('footer', {
          className: Me.foot,
          children: m.jsx('button', {
            type: 'button',
            className: Me.sub,
            onClick: () => l('/town'),
            children: '拠点へ戻る',
          }),
        }),
      ],
    });
  },
  j5 = '_layout_c3v63_1',
  N5 = '_head_c3v63_12',
  A5 = '_title_c3v63_16',
  L5 = '_sub_c3v63_22',
  q5 = '_card_c3v63_27',
  B5 = '_h2_c3v63_35',
  O5 = '_sp_c3v63_44',
  I5 = '_stats_c3v63_50',
  M5 = '_equipSlot_c3v63_74',
  D5 = '_equipHead_c3v63_82',
  R5 = '_slotLabel_c3v63_88',
  z5 = '_equipName_c3v63_95',
  H5 = '_smallBtn_c3v63_100',
  U5 = '_equipPick_c3v63_110',
  G5 = '_pickBtn_c3v63_118',
  $5 = '_jobRow_c3v63_185',
  Y5 = '_select_c3v63_192',
  X5 = '_input_c3v63_193',
  V5 = '_actBtn_c3v63_203',
  Q5 = '_warn_c3v63_220',
  K5 = '_titleHave_c3v63_227',
  Z5 = '_titleOpts_c3v63_233',
  J5 = '_titleBtn_c3v63_240',
  P5 = '_rbForm_c3v63_252',
  F5 = '_danger_c3v63_258',
  W5 = '_foot_c3v63_270',
  ew = '_back_c3v63_274',
  tw = '_skillTabs_c3v63_284',
  lw = '_skillTab_c3v63_284',
  aw = '_skillTabOn_c3v63_304',
  he = {
    layout: j5,
    head: N5,
    title: A5,
    sub: L5,
    card: q5,
    h2: B5,
    sp: O5,
    stats: I5,
    equipSlot: M5,
    equipHead: D5,
    slotLabel: R5,
    equipName: z5,
    smallBtn: H5,
    equipPick: U5,
    pickBtn: G5,
    jobRow: $5,
    select: Y5,
    input: X5,
    actBtn: V5,
    warn: Q5,
    titleHave: K5,
    titleOpts: Z5,
    titleBtn: J5,
    rbForm: P5,
    danger: F5,
    foot: W5,
    back: ew,
    skillTabs: tw,
    skillTab: lw,
    skillTabOn: aw,
  },
  yg = ['weapon', 'armor', 'accessory'];
function bg(l, i, o) {
  return { ...l, guild: { ...l.guild, members: l.guild.members.map((r) => (r.id === i ? o : r)) } };
}
function nw(l) {
  var i, o;
  return (o = (i = tt[l]) == null ? void 0 : i.skillTree.skills[0]) == null ? void 0 : o.skillId;
}
function iw(l) {
  var i;
  return new Set(
    (((i = St[l]) == null ? void 0 : i.raceSkillTree.skills) ?? []).map((o) => o.skillId)
  );
}
const sw = (l, i) => {
  const o = { ...l };
  let r = 0;
  for (const [c, d] of Object.entries(i)) r += ls(o, c) * d;
  return r;
};
function rw(l, i) {
  if (!tt[i]) return l;
  const o = iw(l.raceId);
  let r = {};
  for (const [g, y] of Object.entries(l.learnedSkills)) o.has(g) && (r[g] = y);
  const c = nw(i);
  c && !r[c] && (r[c] = 1);
  const d = Math.max(1, l.level - Th),
    f = Mr(d),
    h = { ...l, classId: i, titleId: null, learnedSkills: r };
  let p = sw(h, r) - (c && r[c] ? ls(h, c) : 0);
  return (
    p > f && ((r = c ? { [c]: 1 } : {}), (p = 0)),
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
function ow(l, i, o) {
  const r = l.guild.members.find((f) => f.id === i);
  if (!r) return l;
  let c = bg(l, i, rw(r, o));
  const d = c.guild.members.find((f) => f.id === i);
  for (const f of yg) {
    const h = d.equipment[f];
    h && !ud(d, h.masterId) && (c = cd(c, i, f));
  }
  return c;
}
const uw = [
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
function cw(l) {
  const i = uw.find((o) => l >= o.min && l <= o.max);
  return i ? { allStats: i.allStats, bonusSp: i.bonusSp } : null;
}
function xg(l) {
  return l.level >= Vi.REBIRTH_MIN_LEVEL;
}
function dw(l, i) {
  const o = cw(l.level);
  if (!o) return l;
  const r = Math.min(30, Math.floor(l.level / 2)),
    c = eg({ ...i, id: l.id }),
    d = Mr(r) + o.bonusSp;
  return {
    ...c,
    level: Math.max(1, r),
    exp: 0,
    rebirthBonus: o,
    skillPoints: { total: d, spent: c.skillPoints.spent },
  };
}
function mw(l, i, o) {
  const r = l.guild.members.find((f) => f.id === i);
  if (!r || !xg(r)) return l;
  let c = l;
  for (const f of yg) r.equipment[f] && (c = cd(c, i, f));
  const d = c.guild.members.find((f) => f.id === i);
  return bg(c, i, dw(d, o));
}
function Sg(l, i, o) {
  var c;
  return o < Vi.TITLE_DEPTH || l.titleId
    ? !1
    : (((c = tt[l.classId]) == null ? void 0 : c.titleOptions) ?? []).includes(i);
}
function _w(l, i, o) {
  return Sg(l, i, o)
    ? { ...l, titleId: i, skillPoints: { ...l.skillPoints, total: l.skillPoints.total + s1 } }
    : l;
}
const th = Object.keys(St),
  Nr = Object.keys(tt),
  fw = ['weapon', 'armor', 'accessory'],
  pw = { weapon: '武器', armor: '防具', accessory: '装飾' },
  hw = [
    { key: 'hp', label: 'HP' },
    { key: 'tp', label: 'TP' },
    { key: 'str', label: 'STR' },
    { key: 'vit', label: 'VIT' },
    { key: 'agi', label: 'AGI' },
    { key: 'int', label: 'INT' },
    { key: 'mnd', label: 'MND' },
    { key: 'luc', label: 'LUC' },
  ],
  gw = () => {
    var Y, C, K, te, de, le, ue, ye, Se, ke;
    const l = ml(),
      { id: i } = Ry(),
      { save: o, applyAndPersist: r } = Vl(),
      [c, d] = E.useState('class'),
      [f, h] = E.useState(Nr[0]),
      [p, g] = E.useState(''),
      [y, v] = E.useState(th[0]),
      [B, A] = E.useState(Nr[0]),
      [I, w] = E.useState(!1);
    if (!o) return m.jsx(ul, { to: '/title', replace: !0 });
    const x = o.guild.members.find((L) => L.id === i);
    if (!x || !i) return m.jsx(ul, { to: '/guild', replace: !0 });
    const S = $l(x),
      j = Wi(x),
      G = o.towerState.record.deepestReached,
      M = (L) =>
        r((J) => ({
          ...J,
          guild: { ...J.guild, members: J.guild.members.map((ae) => (ae.id === i ? L(ae) : ae)) },
        }));
    return m.jsxs('div', {
      className: he.layout,
      children: [
        m.jsxs('header', {
          className: he.head,
          children: [
            m.jsx('h1', { className: he.title, children: x.name }),
            m.jsxs('span', {
              className: he.sub,
              children: [
                (Y = St[x.raceId]) == null ? void 0 : Y.name,
                ' / ',
                (C = tt[x.classId]) == null ? void 0 : C.name,
                ' / Lv',
                x.level,
              ],
            }),
          ],
        }),
        m.jsxs('section', {
          className: he.card,
          children: [
            m.jsx('h2', { className: he.h2, children: 'ステータス' }),
            m.jsx('dl', {
              className: he.stats,
              children: hw.map((L) =>
                m.jsxs(
                  'div',
                  {
                    children: [
                      m.jsx('dt', { children: L.label }),
                      m.jsx('dd', { children: S[L.key] }),
                    ],
                  },
                  L.key
                )
              ),
            }),
          ],
        }),
        m.jsxs('section', {
          className: he.card,
          children: [
            m.jsx('h2', { className: he.h2, children: '装備' }),
            fw.map((L) => {
              const J = x.equipment[L],
                ae = o.guild.equipment.filter((ge) => {
                  var Q;
                  return (
                    ((Q = lt[ge.masterId]) == null ? void 0 : Q.slot) === L && ud(x, ge.masterId)
                  );
                });
              return m.jsxs(
                'div',
                {
                  className: he.equipSlot,
                  children: [
                    m.jsxs('div', {
                      className: he.equipHead,
                      children: [
                        m.jsx('span', { className: he.slotLabel, children: pw[L] }),
                        m.jsx('span', {
                          className: he.equipName,
                          children: J ? ya(J) : '（なし）',
                        }),
                        J
                          ? m.jsx('button', {
                              type: 'button',
                              className: he.smallBtn,
                              onClick: () => void ee(L),
                              children: '外す',
                            })
                          : null,
                      ],
                    }),
                    ae.length > 0
                      ? m.jsx('div', {
                          className: he.equipPick,
                          children: ae.map((ge) =>
                            m.jsxs(
                              'button',
                              {
                                type: 'button',
                                className: he.pickBtn,
                                onClick: () => void r((Q) => x1(Q, i, ge.id)),
                                children: [ya(ge), ' 装備'],
                              },
                              ge.id
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
        m.jsxs('section', {
          className: he.card,
          children: [
            m.jsxs('h2', {
              className: he.h2,
              children: ['スキル ', m.jsxs('span', { className: he.sp, children: ['SP ', j] })],
            }),
            m.jsxs('div', {
              className: he.skillTabs,
              children: [
                m.jsxs('button', {
                  type: 'button',
                  className: `${he.skillTab} ${c === 'class' ? he.skillTabOn : ''}`,
                  onClick: () => d('class'),
                  children: ['職業（', ((K = tt[x.classId]) == null ? void 0 : K.name) ?? '', '）'],
                }),
                m.jsxs('button', {
                  type: 'button',
                  className: `${he.skillTab} ${c === 'race' ? he.skillTabOn : ''}`,
                  onClick: () => d('race'),
                  children: [
                    '種族（',
                    ((te = St[x.raceId]) == null ? void 0 : te.name) ?? '',
                    '）',
                  ],
                }),
                x.titleId
                  ? m.jsxs('button', {
                      type: 'button',
                      className: `${he.skillTab} ${c === 'title' ? he.skillTabOn : ''}`,
                      onClick: () => d('title'),
                      children: [
                        '称号（',
                        ((de = Gl[x.titleId]) == null ? void 0 : de.name) ?? '',
                        '）',
                      ],
                    })
                  : null,
              ],
            }),
            m.jsx(fg, {
              nodes:
                c === 'class'
                  ? (((le = tt[x.classId]) == null ? void 0 : le.skillTree.skills) ?? [])
                  : c === 'race'
                    ? (((ue = St[x.raceId]) == null ? void 0 : ue.raceSkillTree.skills) ?? [])
                    : x.titleId
                      ? (((ye = Gl[x.titleId]) == null ? void 0 : ye.skillTree.skills) ?? [])
                      : [],
              char: x,
              onLearn: (L) => void M((J) => _g(J, L)),
            }),
          ],
        }),
        m.jsxs('section', {
          className: he.card,
          children: [
            m.jsx('h2', { className: he.h2, children: '転職' }),
            m.jsxs('div', {
              className: he.jobRow,
              children: [
                m.jsx('select', {
                  className: he.select,
                  value: f,
                  onChange: (L) => h(L.target.value),
                  children: Nr.map((L) => m.jsx('option', { value: L, children: tt[L].name }, L)),
                }),
                m.jsx('button', {
                  type: 'button',
                  className: he.actBtn,
                  disabled: f === x.classId,
                  onClick: () => void r((L) => ow(L, i, f)),
                  children: '転職する',
                }),
              ],
            }),
            m.jsxs('p', {
              className: he.warn,
              children: [
                '※ レベルが ',
                Th,
                ' ',
                '下がり、職業/称号スキルは振り直しになります（種族スキルは保持）。',
              ],
            }),
            m.jsx('h2', { className: he.h2, children: '称号' }),
            x.titleId
              ? m.jsxs('p', {
                  className: he.titleHave,
                  children: ['習得済み: ', (Se = Gl[x.titleId]) == null ? void 0 : Se.name],
                })
              : G < Vi.TITLE_DEPTH
                ? m.jsxs('p', {
                    className: he.warn,
                    children: ['第 ', Vi.TITLE_DEPTH, ' 階到達で習得できます（現在 ', G, 'F）。'],
                  })
                : m.jsx('div', {
                    className: he.titleOpts,
                    children: (((ke = tt[x.classId]) == null ? void 0 : ke.titleOptions) ?? []).map(
                      (L) => {
                        var J;
                        return m.jsxs(
                          'button',
                          {
                            type: 'button',
                            className: he.titleBtn,
                            disabled: !Sg(x, L, G),
                            onClick: () => void M((ae) => _w(ae, L, G)),
                            children: [(J = Gl[L]) == null ? void 0 : J.name, '（SP+5）'],
                          },
                          L
                        );
                      }
                    ),
                  }),
            m.jsx('h2', { className: he.h2, children: '転生' }),
            xg(x)
              ? I
                ? m.jsxs('div', {
                    className: he.rbForm,
                    children: [
                      m.jsxs('p', {
                        className: he.warn,
                        children: [
                          '※ 作り直して強い新人になります（開始Lv ',
                          Math.min(30, Math.floor(x.level / 2)),
                          '・ボーナス付き）。',
                        ],
                      }),
                      m.jsx('input', {
                        className: he.input,
                        type: 'text',
                        maxLength: 16,
                        placeholder: x.name,
                        value: p,
                        onChange: (L) => g(L.target.value),
                      }),
                      m.jsxs('div', {
                        className: he.jobRow,
                        children: [
                          m.jsx('select', {
                            className: he.select,
                            value: y,
                            onChange: (L) => v(L.target.value),
                            children: th.map((L) =>
                              m.jsx('option', { value: L, children: St[L].name }, L)
                            ),
                          }),
                          m.jsx('select', {
                            className: he.select,
                            value: B,
                            onChange: (L) => A(L.target.value),
                            children: Nr.map((L) =>
                              m.jsx('option', { value: L, children: tt[L].name }, L)
                            ),
                          }),
                        ],
                      }),
                      m.jsxs('div', {
                        className: he.jobRow,
                        children: [
                          m.jsx('button', {
                            type: 'button',
                            className: he.danger,
                            onClick: () => {
                              (r((L) =>
                                mw(L, i, { raceId: y, classId: B, name: p.trim() || x.name })
                              ),
                                w(!1));
                            },
                            children: '転生を実行',
                          }),
                          m.jsx('button', {
                            type: 'button',
                            className: he.actBtn,
                            onClick: () => w(!1),
                            children: 'やめる',
                          }),
                        ],
                      }),
                    ],
                  })
                : m.jsx('button', {
                    type: 'button',
                    className: he.actBtn,
                    onClick: () => w(!0),
                    children: '転生する…',
                  })
              : m.jsxs('p', {
                  className: he.warn,
                  children: [
                    'Lv',
                    Vi.REBIRTH_MIN_LEVEL,
                    ' 以上で転生できます（現在 Lv',
                    x.level,
                    '）。',
                  ],
                }),
          ],
        }),
        m.jsx('footer', {
          className: he.foot,
          children: m.jsx('button', {
            type: 'button',
            className: he.back,
            onClick: () => l('/guild'),
            children: 'もどる',
          }),
        }),
      ],
    });
    function ee(L) {
      return r((J) => cd(J, i, L));
    }
  },
  kw = () => m.jsx('div', { children: m.jsx('h1', { children: 'Not Found' }) }),
  vw = '_layout_j9gth_1',
  yw = '_head_j9gth_11',
  bw = '_title_j9gth_18',
  xw = '_gold_j9gth_24',
  Sw = '_tabs_j9gth_29',
  ww = '_tab_j9gth_29',
  Tw = '_tabActive_j9gth_46',
  Ew = '_controls_j9gth_51',
  Cw = '_filters_j9gth_58',
  jw = '_chip_j9gth_64',
  Nw = '_chipActive_j9gth_75',
  Aw = '_sortRow_j9gth_81',
  Lw = '_sortLabel_j9gth_87',
  qw = '_sort_j9gth_81',
  Bw = '_list_j9gth_105',
  Ow = '_row_j9gth_113',
  Iw = '_info_j9gth_124',
  Mw = '_name_j9gth_130',
  Dw = '_note_j9gth_135',
  Rw = '_action_j9gth_140',
  zw = '_empty_j9gth_157',
  Hw = '_foot_j9gth_162',
  Uw = '_back_j9gth_166',
  Gw = '_confirmOverlay_j9gth_176',
  $w = '_confirmBox_j9gth_187',
  Yw = '_confirmText_j9gth_199',
  Xw = '_confirmActions_j9gth_206',
  Vw = '_confirmCancel_j9gth_211',
  Qw = '_confirmOk_j9gth_212',
  we = {
    layout: vw,
    head: yw,
    title: bw,
    gold: xw,
    tabs: Sw,
    tab: ww,
    tabActive: Tw,
    controls: Ew,
    filters: Cw,
    chip: jw,
    chipActive: Nw,
    sortRow: Aw,
    sortLabel: Lw,
    sort: qw,
    list: Bw,
    row: Ow,
    info: Iw,
    name: Mw,
    note: Dw,
    action: Rw,
    empty: zw,
    foot: Hw,
    back: Uw,
    confirmOverlay: Gw,
    confirmBox: $w,
    confirmText: Yw,
    confirmActions: Xw,
    confirmCancel: Vw,
    confirmOk: Qw,
  };
function Kw(l) {
  return Math.max(0, Math.floor(l.towerState.record.deepestReached / 10));
}
const wg = {
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
  Zw = (l, i = 1) => {
    const o = Lh(l, i),
      r = [];
    return (
      o.atk && r.push(`ATK+${o.atk}`),
      o.mat && r.push(`MAT+${o.mat}`),
      o.def && r.push(`DEF+${o.def}`),
      o.mdf && r.push(`MDF+${o.mdf}`),
      r.join(' ')
    );
  };
function Tg(l, i) {
  var o;
  return ((o = l.shopStock.unlockedGrades) == null ? void 0 : o[i]) ?? 1;
}
function Jw(l) {
  const i = Kw(l),
    o = new Set(l.shopStock.unlockedItemIds),
    r = Object.values(Fe)
      .filter((d) => d.buyPrice > 0)
      .map((d) => ({ id: d.id, name: d.name, price: d.buyPrice, kind: 'item' }));
  return [
    ...Object.values(lt)
      .filter((d) => d.tier <= i || o.has(d.id))
      .map((d) => {
        const f = Tg(l, d.id);
        return {
          id: d.id,
          name: f > 1 ? `${d.name} Lv${f}` : d.name,
          price: Math.round(d.buyPrice * Un(f)),
          kind: 'equip',
          note: Zw(d.id, f),
        };
      }),
    ...r,
  ];
}
function Pw(l) {
  return wg[l] ?? [];
}
function Fw(l, i = 1) {
  return Fe[l] ? Fe[l].buyPrice : lt[l] ? Math.round(lt[l].buyPrice * Un(i)) : null;
}
function Kc(l, i = 1) {
  return Fe[l]
    ? Math.round(l1(Fe[l]) * Un(i))
    : lt[l]
      ? Math.floor((lt[l].buyPrice * Un(i)) / 2)
      : 0;
}
function Ww(l, i) {
  const o = lt[i] ? Tg(l, i) : 1,
    r = Fw(i, o);
  if (r === null || r <= 0 || l.guild.gold < r) return l;
  const c = lt[i] ? b1(l, i, 0, o) : sd(l, i, 1);
  return { ...c, guild: { ...c.guild, gold: c.guild.gold - r } };
}
function Eg(l) {
  var o;
  const i = (((o = lt[l.masterId]) == null ? void 0 : o.buyPrice) ?? 0) * Un(l.grade);
  return Math.floor(i / 2) + l.forgeLevel * 10;
}
function eT(l, i) {
  const o = l.guild.equipment.find((d) => d.id === i);
  if (!o) return l;
  const r = Eg(o),
    c = l.guild.equipment.filter((d) => d.id !== i);
  return { ...l, guild: { ...l.guild, equipment: c, gold: l.guild.gold + r } };
}
function tT(l, i, o = 1, r = 1) {
  if (
    l.guild.storage
      .filter((y) => y.itemId === i && (y.grade ?? 1) === r)
      .reduce((y, v) => y + v.qty, 0) < o
  )
    return l;
  const d = Kc(i, r) * o,
    f = rd(l, i, o, r),
    h = Pw(i),
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
const lh = {
    weapon: '武器',
    armor: '防具',
    accessory: '装飾品',
    item: 'アイテム',
    material: '素材',
  },
  lT = ['weapon', 'armor', 'accessory', 'item', 'material'],
  ah = { priceDesc: '金額が高い順', priceAsc: '金額が安い順', qtyDesc: '所持数が多い順' },
  nh = (l) => {
    var o;
    const i = (o = Fe[l]) == null ? void 0 : o.category;
    return i === 'material' || i === 'drop' ? 'material' : 'item';
  },
  aT = () => {
    const l = ml(),
      { save: i, applyAndPersist: o } = Vl(),
      [r, c] = E.useState('buy'),
      [d, f] = E.useState(null),
      [h, p] = E.useState('all'),
      [g, y] = E.useState('priceAsc');
    if (!i) return m.jsx(ul, { to: '/title', replace: !0 });
    const v = i.guild.gold,
      B = (C, K = 1) => {
        var de, le;
        const te =
          ((de = Fe[C]) == null ? void 0 : de.name) ??
          ((le = lt[C]) == null ? void 0 : le.name) ??
          C;
        return K > 1 ? `${te} Lv${K}` : te;
      },
      A = Jw(i).map((C) => {
        var K;
        return {
          key: C.id,
          entry: C,
          category:
            C.kind === 'equip' ? (((K = lt[C.id]) == null ? void 0 : K.slot) ?? 'item') : nh(C.id),
          price: C.price,
          qty:
            C.kind === 'equip'
              ? i.guild.equipment.filter((te) => te.masterId === C.id).length
              : id(i, C.id),
        };
      }),
      I = [
        ...i.guild.equipment.map((C) => {
          var K;
          return {
            key: `eq_${C.id}`,
            kind: 'equip',
            inst: C,
            name: ya(C),
            price: Eg(C),
            category: ((K = lt[C.masterId]) == null ? void 0 : K.slot) ?? 'item',
            qty: 1,
          };
        }),
        ...i.guild.storage
          .filter((C) => Kc(C.itemId, C.grade ?? 1) > 0)
          .map((C) => ({
            key: `it_${C.itemId}_${C.grade ?? 1}`,
            kind: 'item',
            itemId: C.itemId,
            grade: C.grade ?? 1,
            name: B(C.itemId, C.grade ?? 1),
            price: Kc(C.itemId, C.grade ?? 1),
            category: nh(C.itemId),
            qty: C.qty,
          })),
      ],
      w = r === 'buy' ? A : I,
      x = lT.filter((C) => w.some((K) => K.category === C)),
      S = h !== 'all' && !x.includes(h) ? 'all' : h;
    function j(C) {
      return [...(S === 'all' ? C : C.filter((te) => te.category === S))].sort((te, de) =>
        g === 'priceAsc'
          ? te.price - de.price
          : g === 'qtyDesc'
            ? de.qty - te.qty
            : de.price - te.price
      );
    }
    const G = (C) => {
        (c(C), p('all'));
      },
      M = () => {
        d &&
          (d.kind === 'buy'
            ? o((C) => Ww(C, d.id))
            : d.kind === 'sellItem'
              ? o((C) => tT(C, d.itemId, 1, d.grade))
              : o((C) => eT(C, d.id)),
          f(null));
      },
      ee = j(A),
      Y = j(I);
    return m.jsxs('div', {
      className: we.layout,
      children: [
        m.jsxs('header', {
          className: we.head,
          children: [
            m.jsx('h1', { className: we.title, children: 'ショップ' }),
            m.jsxs('span', { className: we.gold, children: [v, ' G'] }),
          ],
        }),
        m.jsxs('div', {
          className: we.tabs,
          children: [
            m.jsx('button', {
              type: 'button',
              className: `${we.tab} ${r === 'buy' ? we.tabActive : ''}`,
              onClick: () => G('buy'),
              children: '買う',
            }),
            m.jsx('button', {
              type: 'button',
              className: `${we.tab} ${r === 'sell' ? we.tabActive : ''}`,
              onClick: () => G('sell'),
              children: '売る',
            }),
          ],
        }),
        m.jsxs('div', {
          className: we.controls,
          children: [
            m.jsxs('div', {
              className: we.filters,
              children: [
                m.jsx('button', {
                  type: 'button',
                  className: `${we.chip} ${S === 'all' ? we.chipActive : ''}`,
                  onClick: () => p('all'),
                  children: 'すべて',
                }),
                x.map((C) =>
                  m.jsx(
                    'button',
                    {
                      type: 'button',
                      className: `${we.chip} ${S === C ? we.chipActive : ''}`,
                      onClick: () => p(C),
                      children: lh[C],
                    },
                    C
                  )
                ),
              ],
            }),
            m.jsxs('label', {
              className: we.sortRow,
              children: [
                m.jsx('span', { className: we.sortLabel, children: '並び替え' }),
                m.jsx('select', {
                  className: we.sort,
                  value: g,
                  onChange: (C) => y(C.target.value),
                  children: Object.keys(ah).map((C) =>
                    m.jsx('option', { value: C, children: ah[C] }, C)
                  ),
                }),
              ],
            }),
          ],
        }),
        m.jsx('div', {
          className: we.list,
          children:
            r === 'buy'
              ? ee.length === 0
                ? m.jsx('p', { className: we.empty, children: '該当する商品がありません。' })
                : ee.map(({ entry: C, qty: K }) =>
                    m.jsxs(
                      'div',
                      {
                        className: we.row,
                        children: [
                          m.jsxs('div', {
                            className: we.info,
                            children: [
                              m.jsx('span', { className: we.name, children: C.name }),
                              m.jsxs('span', {
                                className: we.note,
                                children: [C.note ? `${C.note} ・ ` : '', '所持 ', K],
                              }),
                            ],
                          }),
                          m.jsxs('button', {
                            type: 'button',
                            className: we.action,
                            disabled: v < C.price,
                            onClick: () =>
                              f({ kind: 'buy', id: C.id, name: C.name, price: C.price }),
                            children: [C.price, ' G'],
                          }),
                        ],
                      },
                      C.id
                    )
                  )
              : Y.length === 0
                ? m.jsx('p', { className: we.empty, children: '売れる物がありません。' })
                : Y.map((C) =>
                    m.jsxs(
                      'div',
                      {
                        className: we.row,
                        children: [
                          m.jsxs('div', {
                            className: we.info,
                            children: [
                              m.jsx('span', { className: we.name, children: C.name }),
                              m.jsxs('span', {
                                className: we.note,
                                children: [
                                  lh[C.category],
                                  C.kind === 'item' ? ` ・ 所持 ${C.qty}` : '',
                                ],
                              }),
                            ],
                          }),
                          m.jsxs('button', {
                            type: 'button',
                            className: we.action,
                            onClick: () =>
                              f(
                                C.kind === 'equip'
                                  ? {
                                      kind: 'sellEquip',
                                      id: C.inst.id,
                                      name: C.name,
                                      price: C.price,
                                    }
                                  : {
                                      kind: 'sellItem',
                                      itemId: C.itemId,
                                      grade: C.grade,
                                      name: C.name,
                                      price: C.price,
                                    }
                              ),
                            children: ['売却 ', C.price, ' G'],
                          }),
                        ],
                      },
                      C.key
                    )
                  ),
        }),
        m.jsx('footer', {
          className: we.foot,
          children: m.jsx('button', {
            type: 'button',
            className: we.back,
            onClick: () => l('/town'),
            children: '拠点へ戻る',
          }),
        }),
        d
          ? m.jsx('div', {
              className: we.confirmOverlay,
              onClick: () => f(null),
              children: m.jsxs('div', {
                className: we.confirmBox,
                onClick: (C) => C.stopPropagation(),
                children: [
                  m.jsx('div', {
                    className: we.confirmText,
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
                    className: we.confirmActions,
                    children: [
                      m.jsx('button', {
                        type: 'button',
                        className: we.confirmCancel,
                        onClick: () => f(null),
                        children: 'やめる',
                      }),
                      m.jsx('button', {
                        type: 'button',
                        className: we.confirmOk,
                        onClick: M,
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
  nT = '_layout_1xkiw_1',
  iT = '_head_1xkiw_12',
  sT = '_title_1xkiw_17',
  rT = '_subtitle_1xkiw_24',
  oT = '_body_1xkiw_30',
  uT = '_menu_1xkiw_34',
  cT = '_loading_1xkiw_40',
  dT = '_warn_1xkiw_45',
  mT = '_danger_1xkiw_52',
  _T = '_dialog_1xkiw_67',
  fT = '_dialogTitle_1xkiw_77',
  pT = '_field_1xkiw_82',
  hT = '_note_1xkiw_96',
  gT = '_dialogActions_1xkiw_102',
  kT = '_primary_1xkiw_107',
  vT = '_sub_1xkiw_24',
  yT = '_foot_1xkiw_132',
  Pe = {
    layout: nT,
    head: iT,
    title: sT,
    subtitle: rT,
    body: oT,
    menu: uT,
    loading: cT,
    warn: dT,
    danger: mT,
    dialog: _T,
    dialogTitle: fT,
    field: pT,
    note: hT,
    dialogActions: gT,
    primary: kT,
    sub: vT,
    foot: yT,
  },
  bT = '_card_3vsn6_1',
  xT = '_corrupted_3vsn6_14',
  ST = '_corruptedText_3vsn6_19',
  wT = '_corruptedNote_3vsn6_25',
  TT = '_guildName_3vsn6_31',
  ET = '_meta_3vsn6_36',
  va = {
    card: bT,
    corrupted: xT,
    corruptedText: ST,
    corruptedNote: wT,
    guildName: TT,
    meta: ET,
    continue: '_continue_3vsn6_56',
  },
  CT = (l) => {
    if (!l) return '-';
    const i = new Date(l),
      o = (r) => String(r).padStart(2, '0');
    return `${i.getFullYear()}/${o(i.getMonth() + 1)}/${o(i.getDate())} ${o(i.getHours())}:${o(i.getMinutes())}`;
  },
  jT = ({ meta: l, onContinue: i }) =>
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
                    m.jsx('dd', { children: CT(l.savedAt) }),
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
  NT = () => {
    const l = ml(),
      { startNewGame: i, continueGame: o } = Vl(),
      [r, c] = E.useState(null),
      [d, f] = E.useState(!0),
      [h, p] = E.useState('menu'),
      [g, y] = E.useState(''),
      [v, B] = E.useState(!1);
    E.useEffect(() => {
      (async () => (c(await Vx()), f(!1)))();
    }, []);
    const A = r !== null && !r.corrupted,
      I = E.useCallback(async () => {
        B(!0);
        const S = await o();
        (B(!1), S.ok && l('/town'));
      }, [o, l]),
      w = E.useCallback(() => {
        (y(''), p(A ? 'confirm' : 'guildName'));
      }, [A]),
      x = E.useCallback(async () => {
        const S = g.trim() || 'ななしのギルド';
        (B(!0), await i(S), B(!1), l('/town'));
      }, [g, i, l]);
    return m.jsxs('div', {
      className: Pe.layout,
      children: [
        m.jsxs('header', {
          className: Pe.head,
          children: [
            m.jsx('h1', { className: Pe.title, children: '世界樹ライク' }),
            m.jsx('p', { className: Pe.subtitle, children: '無限タワー探索 RPG' }),
          ],
        }),
        m.jsx('main', {
          className: Pe.body,
          children: d
            ? m.jsx('p', { className: Pe.loading, children: '読み込み中...' })
            : h === 'guildName'
              ? m.jsxs('div', {
                  className: Pe.dialog,
                  children: [
                    m.jsx('h2', { className: Pe.dialogTitle, children: '新しいギルド' }),
                    m.jsxs('label', {
                      className: Pe.field,
                      children: [
                        m.jsx('span', { children: 'ギルド名' }),
                        m.jsx('input', {
                          type: 'text',
                          value: g,
                          maxLength: 16,
                          placeholder: 'ななしのギルド',
                          onChange: (S) => y(S.target.value),
                          autoFocus: !0,
                        }),
                      ],
                    }),
                    m.jsx('p', {
                      className: Pe.note,
                      children:
                        '冒険者はまだいません。開始後、ギルドメニューで仲間を作成してください。',
                    }),
                    m.jsxs('div', {
                      className: Pe.dialogActions,
                      children: [
                        m.jsx('button', {
                          type: 'button',
                          className: Pe.primary,
                          disabled: v,
                          onClick: x,
                          children: 'はじめる',
                        }),
                        m.jsx('button', {
                          type: 'button',
                          className: Pe.sub,
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
                    className: Pe.dialog,
                    children: [
                      m.jsx('h2', { className: Pe.dialogTitle, children: '最初から始めますか？' }),
                      m.jsxs('p', {
                        className: Pe.warn,
                        children: [
                          '現在のセーブデータ「',
                          r == null ? void 0 : r.guildName,
                          '」は上書きされ、元に戻せません。',
                        ],
                      }),
                      m.jsxs('div', {
                        className: Pe.dialogActions,
                        children: [
                          m.jsx('button', {
                            type: 'button',
                            className: Pe.danger,
                            disabled: v,
                            onClick: () => p('guildName'),
                            children: 'データを消して始める',
                          }),
                          m.jsx('button', {
                            type: 'button',
                            className: Pe.sub,
                            disabled: v,
                            onClick: () => p('menu'),
                            children: 'もどる',
                          }),
                        ],
                      }),
                    ],
                  })
                : m.jsxs('div', {
                    className: Pe.menu,
                    children: [
                      r !== null && m.jsx(jT, { meta: r, onContinue: () => void I() }),
                      m.jsx('button', {
                        type: 'button',
                        className: A ? Pe.sub : Pe.primary,
                        onClick: w,
                        children: '最初から',
                      }),
                    ],
                  }),
        }),
        m.jsxs('footer', { className: Pe.foot, children: ['v', '0.1.35'] }),
      ],
    });
  },
  AT = '_layout_uxqv8_1',
  LT = '_head_uxqv8_12',
  qT = '_guildName_uxqv8_16',
  BT = '_stats_uxqv8_21',
  OT = '_hint_uxqv8_40',
  IT = '_menu_uxqv8_50',
  MT = '_foot_uxqv8_57',
  DT = '_exit_uxqv8_61',
  RT = '_warpOverlay_uxqv8_72',
  zT = '_warpPanel_uxqv8_83',
  HT = '_warpTitle_uxqv8_94',
  UT = '_warpBtn_uxqv8_99',
  GT = '_warpClose_uxqv8_110',
  Ht = {
    layout: AT,
    head: LT,
    guildName: qT,
    stats: BT,
    hint: OT,
    menu: IT,
    foot: MT,
    exit: DT,
    warpOverlay: RT,
    warpPanel: zT,
    warpTitle: HT,
    warpBtn: UT,
    warpClose: GT,
  },
  $T = '_button_1tp4a_1',
  YT = '_primary_1tp4a_26',
  XT = '_label_1tp4a_32',
  VT = '_description_1tp4a_37',
  Ar = { button: $T, primary: YT, label: XT, description: VT },
  Dn = ({ label: l, description: i, variant: o = 'default', disabled: r = !1, onClick: c }) =>
    m.jsxs('button', {
      type: 'button',
      className: `${Ar.button} ${o === 'primary' ? Ar.primary : ''}`,
      disabled: r,
      onClick: c,
      children: [
        m.jsx('span', { className: Ar.label, children: l }),
        i ? m.jsx('span', { className: Ar.description, children: i }) : null,
      ],
    }),
  QT = () => {
    const l = ml(),
      { save: i, exitToTitle: o, applyAndPersist: r } = Vl(),
      [c, d] = E.useState(!1);
    if (!i) return m.jsx(ul, { to: '/title', replace: !0 });
    const { guild: f, towerState: h, diveState: p } = i,
      g = f.members.length > 0,
      y = () => {
        (o(), l('/title'));
      },
      v = async () => {
        (p || (await r((I) => Hp(I, 1))), l('/dungeon'));
      },
      B = h.warp.unlockedCheckpoints,
      A = async (I) => {
        (d(!1), await r((w) => Hp(w, I)), l('/dungeon'));
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
                B.length === 0
                  ? 'ボス撃破で解放'
                  : p
                    ? '潜行中は使えません'
                    : `解放済み: ${B.map((I) => `${I}F`).join('・')}`,
              disabled: !g || B.length === 0 || !!p,
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
        c
          ? m.jsx('div', {
              className: Ht.warpOverlay,
              onClick: () => d(!1),
              children: m.jsxs('div', {
                className: Ht.warpPanel,
                onClick: (I) => I.stopPropagation(),
                children: [
                  m.jsx('div', { className: Ht.warpTitle, children: 'ワープ先を選択' }),
                  B.map((I) =>
                    m.jsxs(
                      'button',
                      {
                        type: 'button',
                        className: Ht.warpBtn,
                        onClick: () => void A(I),
                        children: ['第 ', I, ' 階へ'],
                      },
                      I
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
function KT() {
  return m.jsxs(Wy, {
    children: [
      m.jsx(Ft, { path: '/', element: m.jsx(ul, { to: '/title', replace: !0 }) }),
      m.jsx(Ft, { path: '/title', element: m.jsx(NT, {}) }),
      m.jsx(Ft, { path: '/town', element: m.jsx(QT, {}) }),
      m.jsx(Ft, { path: '/guild', element: m.jsx(C5, {}) }),
      m.jsx(Ft, { path: '/guild/char/:id', element: m.jsx(gw, {}) }),
      m.jsx(Ft, { path: '/shop', element: m.jsx(aT, {}) }),
      m.jsx(Ft, { path: '/forge', element: m.jsx(l5, {}) }),
      m.jsx(Ft, { path: '/codex', element: m.jsx(q3, {}) }),
      m.jsx(Ft, { path: '/dungeon', element: m.jsx(NS, {}) }),
      m.jsx(Ft, { path: '/battle', element: m.jsx(a3, {}) }),
      m.jsx(Ft, { path: '*', element: m.jsx(kw, {}) }),
    ],
  });
}
const ZT = {
    races: St,
    classes: tt,
    titles: Gl,
    skills: Xi,
    unionSkills: zn,
    summons: Vn,
    gatherTypes: Ga,
    recipes: Qn,
    enemies: cl,
    items: Fe,
    equipment: lt,
  },
  JT = /^[a-z]+_[a-z0-9_]+$/;
function il(l, i, o) {
  for (const r of i)
    JT.test(r) || o.push(`[${l}] ID 命名規約違反: "${r}"（期待: <domain>_<name>）`);
}
function Bc(l, i, o, r) {
  const c = new Set(i.skills.map((d) => d.skillId));
  for (const d of i.skills) {
    o.has(d.skillId) || r.push(`[${l}] 未定義スキルを参照: "${d.skillId}"`);
    for (const f of d.requires ?? [])
      c.has(f.skillId) ||
        r.push(`[${l}] スキル "${d.skillId}" の前提 "${f.skillId}" が同ツリーに存在しない`);
  }
}
function PT() {
  var x;
  const l = [],
    {
      races: i,
      classes: o,
      titles: r,
      skills: c,
      unionSkills: d,
      summons: f,
      gatherTypes: h,
      recipes: p,
      enemies: g,
      items: y,
      equipment: v,
    } = ZT;
  (il('races', Object.keys(i), l),
    il('classes', Object.keys(o), l),
    il('titles', Object.keys(r), l),
    il('skills', Object.keys(c), l),
    il('enemies', Object.keys(g), l),
    il('items', Object.keys(y), l),
    il('equipment', Object.keys(v), l));
  const B = (S, j) => {
    for (const [G, M] of Object.entries(j))
      G !== M.id && l.push(`[${S}] キー "${G}" と id "${M.id}" が不一致`);
  };
  (B('races', i),
    B('classes', o),
    B('titles', r),
    B('skills', c),
    B('enemies', g),
    B('items', y),
    B('equipment', v));
  const A = new Set(Object.keys(c)),
    I = new Set(Object.keys(o)),
    w = new Set(Object.keys(r));
  for (const S of Object.values(i)) {
    (I.has(S.defaultClassId) ||
      l.push(`[races] "${S.id}" の defaultClassId "${S.defaultClassId}" が未定義`),
      Bc(`races/${S.id}`, S.raceSkillTree, A, l));
    for (const j of S.raceSkillTree.skills) {
      const G = d[j.skillId];
      G &&
        G.raceId !== S.id &&
        l.push(`[races/${S.id}] ユニオンスキル "${j.skillId}" の raceId "${G.raceId}" が不一致`);
    }
  }
  for (const S of Object.values(d)) {
    const j = (x = i[S.raceId]) == null ? void 0 : x.raceSkillTree;
    (!j || !j.skills.some((G) => G.skillId === S.id)) &&
      l.push(`[unionSkills] "${S.id}" が種族 "${S.raceId}" のスキルツリーに無い`);
  }
  il('unionSkills', Object.keys(d), l);
  for (const [S, j] of Object.entries(d))
    (S !== j.id && l.push(`[unionSkills] キー "${S}" と id "${j.id}" が不一致`),
      j.id in c || l.push(`[unionSkills] "${j.id}" が skills に未定義`),
      j.requiredParticipants < 1 &&
        l.push(`[unionSkills] "${j.id}" の requiredParticipants が 1 未満`),
      (j.gaugeCostPerParticipant < 0 || j.gaugeCostPerParticipant > 100) &&
        l.push(`[unionSkills] "${j.id}" の gaugeCostPerParticipant が 0..100 外`),
      j.id in Wt &&
        l.push(
          `[unionSkills] "${j.id}" が BATTLE_SKILLS にも存在（通常スキルとして撃ててしまう）`
        ));
  il('passiveSkills', Object.keys(Rc), l);
  for (const [S, j] of Object.entries(Rc))
    (S !== j.id && l.push(`[passiveSkills] キー "${S}" と id "${j.id}" が不一致`),
      A.has(j.id) || l.push(`[passiveSkills] "${j.id}" が skills に未定義`),
      j.id in Wt &&
        l.push(`[passiveSkills] "${j.id}" が BATTLE_SKILLS にも存在（戦闘で撃ててしまう）`),
      j.id in d && l.push(`[passiveSkills] "${j.id}" が UNION_SKILLS にも存在`));
  il('summons', Object.keys(f), l);
  for (const [S, j] of Object.entries(f))
    S !== j.id && l.push(`[summons] キー "${S}" と id "${j.id}" が不一致`);
  for (const S of Object.values(Wt))
    for (const j of S.effects)
      j.kind === 'summon' &&
        !(j.summonKind in f) &&
        l.push(`[battleSkills] "${S.id}" の召喚 "${j.summonKind}" が未定義`);
  for (const [S, j] of Object.entries(h)) {
    (S !== j.type && l.push(`[gatherTypes] キー "${S}" と type "${j.type}" が不一致`),
      A.has(j.requiredSkillId) ||
        l.push(`[gatherTypes] "${j.type}" の requiredSkillId "${j.requiredSkillId}" が未定義`));
    for (const G of j.drops) {
      if (!(G.itemId in y))
        l.push(`[gatherTypes] "${j.type}" のドロップ "${G.itemId}" が未定義アイテム`);
      else {
        const M = y[G.itemId].category === 'food';
        (j.food &&
          !M &&
          l.push(`[gatherTypes] 食材系統 "${j.type}" のドロップ "${G.itemId}" が food でない`),
          !j.food &&
            M &&
            l.push(`[gatherTypes] 素材系統 "${j.type}" のドロップ "${G.itemId}" が food`));
      }
      G.weight <= 0 && l.push(`[gatherTypes] "${j.type}" のドロップ重みが正でない`);
    }
  }
  il('recipes', Object.keys(p), l);
  for (const [S, j] of Object.entries(p)) {
    S !== j.id && l.push(`[recipes] キー "${S}" と id "${j.id}" が不一致`);
    for (const G of j.ingredients)
      G.itemId in y
        ? y[G.itemId].category !== 'food' &&
          l.push(`[recipes] "${j.id}" の材料 "${G.itemId}" が food カテゴリでない`)
        : l.push(`[recipes] "${j.id}" の材料 "${G.itemId}" が未定義`);
    j.result.itemId in y
      ? y[j.result.itemId].category !== 'food' &&
        l.push(`[recipes] "${j.id}" の結果 "${j.result.itemId}" が food カテゴリでない`)
      : l.push(`[recipes] "${j.id}" の結果 "${j.result.itemId}" が未定義`);
  }
  for (const S of Object.values(o)) {
    Bc(`classes/${S.id}`, S.skillTree, A, l);
    for (const j of S.titleOptions) {
      if (!w.has(j)) {
        l.push(`[classes] "${S.id}" の称号 "${j}" が未定義`);
        continue;
      }
      r[j].parentClassId !== S.id &&
        l.push(`[classes] 称号 "${j}" の parentClassId が "${S.id}" と不一致`);
    }
  }
  for (const S of Object.values(r))
    (I.has(S.parentClassId) ||
      l.push(`[titles] "${S.id}" の parentClassId "${S.parentClassId}" が未定義`),
      Bc(`titles/${S.id}`, S.skillTree, A, l));
  for (const S of Object.values(v))
    (S.slot === 'weapon' &&
      !S.weaponType &&
      l.push(`[equipment] "${S.id}" は weapon だが weaponType が未設定`),
      S.slot === 'armor' &&
        !S.armorType &&
        l.push(`[equipment] "${S.id}" は armor だが armorType が未設定`),
      (S.buyPrice < 0 || S.tier < 0) && l.push(`[equipment] "${S.id}" の buyPrice/tier が負`));
  for (const S of Object.values(y))
    (S.buyPrice < 0 && l.push(`[items] "${S.id}" の buyPrice が負`),
      S.category === 'consumable' &&
        !S.useContext &&
        !S.effects &&
        l.push(`[items] 消費アイテム "${S.id}" に useContext も effects も無い（使用不能）`));
  for (const S of Object.values(g))
    for (const j of S.drops ?? [])
      (j.itemId in y || l.push(`[enemies] "${S.id}" のドロップ "${j.itemId}" が未定義アイテム`),
        (j.rate < 0 || j.rate > 1) &&
          l.push(`[enemies] "${S.id}" のドロップ "${j.itemId}" の rate が 0..1 外`));
  for (const [S, j] of Object.entries(wg)) {
    S in y || l.push(`[SELL_UNLOCKS] キー素材 "${S}" が未定義`);
    for (const G of j) G in v || l.push(`[SELL_UNLOCKS] 解放先装備 "${G}" が未定義`);
  }
  return { ok: l.length === 0, errors: l };
}
const ih = PT();
ih.ok || console.error('マスターデータ検証エラー:', ih.errors);
const Cg = document.getElementById('root');
if (!Cg) throw new Error('Failed to find #root element');
ty.createRoot(Cg).render(
  m.jsx(S0, { basename: '/sekaiju-like-game', children: m.jsx(Zx, { children: m.jsx(KT, {}) }) })
);
