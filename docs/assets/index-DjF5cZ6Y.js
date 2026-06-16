var xy = Object.defineProperty;
var Sy = (l, i, r) =>
  i in l ? xy(l, i, { enumerable: !0, configurable: !0, writable: !0, value: r }) : (l[i] = r);
var Cu = (l, i, r) => Sy(l, typeof i != 'symbol' ? i + '' : i, r);
(function () {
  const i = document.createElement('link').relList;
  if (i && i.supports && i.supports('modulepreload')) return;
  for (const d of document.querySelectorAll('link[rel="modulepreload"]')) s(d);
  new MutationObserver((d) => {
    for (const m of d)
      if (m.type === 'childList')
        for (const _ of m.addedNodes) _.tagName === 'LINK' && _.rel === 'modulepreload' && s(_);
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
  function s(d) {
    if (d.ep) return;
    d.ep = !0;
    const m = r(d);
    fetch(d.href, m);
  }
})();
var Au = { exports: {} },
  ts = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Up;
function wy() {
  if (Up) return ts;
  Up = 1;
  var l = Symbol.for('react.transitional.element'),
    i = Symbol.for('react.fragment');
  function r(s, d, m) {
    var _ = null;
    if ((m !== void 0 && (_ = '' + m), d.key !== void 0 && (_ = '' + d.key), 'key' in d)) {
      m = {};
      for (var p in d) p !== 'key' && (m[p] = d[p]);
    } else m = d;
    return ((d = m.ref), { $$typeof: l, type: s, key: _, ref: d !== void 0 ? d : null, props: m });
  }
  return ((ts.Fragment = i), (ts.jsx = r), (ts.jsxs = r), ts);
}
var $p;
function Ty() {
  return ($p || (($p = 1), (Au.exports = wy())), Au.exports);
}
var u = Ty(),
  Lu = { exports: {} },
  ls = {},
  Bu = { exports: {} },
  qu = {};
/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Gp;
function Ny() {
  return (
    Gp ||
      ((Gp = 1),
      (function (l) {
        function i(R, ee) {
          var oe = R.length;
          R.push(ee);
          e: for (; 0 < oe; ) {
            var pe = (oe - 1) >>> 1,
              de = R[pe];
            if (0 < d(de, ee)) ((R[pe] = ee), (R[oe] = de), (oe = pe));
            else break e;
          }
        }
        function r(R) {
          return R.length === 0 ? null : R[0];
        }
        function s(R) {
          if (R.length === 0) return null;
          var ee = R[0],
            oe = R.pop();
          if (oe !== ee) {
            R[0] = oe;
            e: for (var pe = 0, de = R.length, y = de >>> 1; pe < y; ) {
              var B = 2 * (pe + 1) - 1,
                L = R[B],
                J = B + 1,
                le = R[J];
              if (0 > d(L, oe))
                J < de && 0 > d(le, L)
                  ? ((R[pe] = le), (R[J] = oe), (pe = J))
                  : ((R[pe] = L), (R[B] = oe), (pe = B));
              else if (J < de && 0 > d(le, oe)) ((R[pe] = le), (R[J] = oe), (pe = J));
              else break e;
            }
          }
          return ee;
        }
        function d(R, ee) {
          var oe = R.sortIndex - ee.sortIndex;
          return oe !== 0 ? oe : R.id - ee.id;
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
          var _ = Date,
            p = _.now();
          l.unstable_now = function () {
            return _.now() - p;
          };
        }
        var h = [],
          g = [],
          b = 1,
          k = null,
          A = 3,
          C = !1,
          z = !1,
          I = !1,
          M = !1,
          w = typeof setTimeout == 'function' ? setTimeout : null,
          j = typeof clearTimeout == 'function' ? clearTimeout : null,
          V = typeof setImmediate < 'u' ? setImmediate : null;
        function $(R) {
          for (var ee = r(g); ee !== null; ) {
            if (ee.callback === null) s(g);
            else if (ee.startTime <= R) (s(g), (ee.sortIndex = ee.expirationTime), i(h, ee));
            else break;
            ee = r(g);
          }
        }
        function te(R) {
          if (((I = !1), $(R), !z))
            if (r(h) !== null) ((z = !0), K || ((K = !0), ie()));
            else {
              var ee = r(g);
              ee !== null && D(te, ee.startTime - R);
            }
        }
        var K = !1,
          S = -1,
          q = 5,
          X = -1;
        function ne() {
          return M ? !0 : !(l.unstable_now() - X < q);
        }
        function Z() {
          if (((M = !1), K)) {
            var R = l.unstable_now();
            X = R;
            var ee = !0;
            try {
              e: {
                ((z = !1), I && ((I = !1), j(S), (S = -1)), (C = !0));
                var oe = A;
                try {
                  t: {
                    for ($(R), k = r(h); k !== null && !(k.expirationTime > R && ne()); ) {
                      var pe = k.callback;
                      if (typeof pe == 'function') {
                        ((k.callback = null), (A = k.priorityLevel));
                        var de = pe(k.expirationTime <= R);
                        if (((R = l.unstable_now()), typeof de == 'function')) {
                          ((k.callback = de), $(R), (ee = !0));
                          break t;
                        }
                        (k === r(h) && s(h), $(R));
                      } else s(h);
                      k = r(h);
                    }
                    if (k !== null) ee = !0;
                    else {
                      var y = r(g);
                      (y !== null && D(te, y.startTime - R), (ee = !1));
                    }
                  }
                  break e;
                } finally {
                  ((k = null), (A = oe), (C = !1));
                }
                ee = void 0;
              }
            } finally {
              ee ? ie() : (K = !1);
            }
          }
        }
        var ie;
        if (typeof V == 'function')
          ie = function () {
            V(Z);
          };
        else if (typeof MessageChannel < 'u') {
          var ke = new MessageChannel(),
            Se = ke.port2;
          ((ke.port1.onmessage = Z),
            (ie = function () {
              Se.postMessage(null);
            }));
        } else
          ie = function () {
            w(Z, 0);
          };
        function D(R, ee) {
          S = w(function () {
            R(l.unstable_now());
          }, ee);
        }
        ((l.unstable_IdlePriority = 5),
          (l.unstable_ImmediatePriority = 1),
          (l.unstable_LowPriority = 4),
          (l.unstable_NormalPriority = 3),
          (l.unstable_Profiling = null),
          (l.unstable_UserBlockingPriority = 2),
          (l.unstable_cancelCallback = function (R) {
            R.callback = null;
          }),
          (l.unstable_forceFrameRate = function (R) {
            0 > R || 125 < R
              ? console.error(
                  'forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported'
                )
              : (q = 0 < R ? Math.floor(1e3 / R) : 5);
          }),
          (l.unstable_getCurrentPriorityLevel = function () {
            return A;
          }),
          (l.unstable_next = function (R) {
            switch (A) {
              case 1:
              case 2:
              case 3:
                var ee = 3;
                break;
              default:
                ee = A;
            }
            var oe = A;
            A = ee;
            try {
              return R();
            } finally {
              A = oe;
            }
          }),
          (l.unstable_requestPaint = function () {
            M = !0;
          }),
          (l.unstable_runWithPriority = function (R, ee) {
            switch (R) {
              case 1:
              case 2:
              case 3:
              case 4:
              case 5:
                break;
              default:
                R = 3;
            }
            var oe = A;
            A = R;
            try {
              return ee();
            } finally {
              A = oe;
            }
          }),
          (l.unstable_scheduleCallback = function (R, ee, oe) {
            var pe = l.unstable_now();
            switch (
              (typeof oe == 'object' && oe !== null
                ? ((oe = oe.delay), (oe = typeof oe == 'number' && 0 < oe ? pe + oe : pe))
                : (oe = pe),
              R)
            ) {
              case 1:
                var de = -1;
                break;
              case 2:
                de = 250;
                break;
              case 5:
                de = 1073741823;
                break;
              case 4:
                de = 1e4;
                break;
              default:
                de = 5e3;
            }
            return (
              (de = oe + de),
              (R = {
                id: b++,
                callback: ee,
                priorityLevel: R,
                startTime: oe,
                expirationTime: de,
                sortIndex: -1,
              }),
              oe > pe
                ? ((R.sortIndex = oe),
                  i(g, R),
                  r(h) === null && R === r(g) && (I ? (j(S), (S = -1)) : (I = !0), D(te, oe - pe)))
                : ((R.sortIndex = de), i(h, R), z || C || ((z = !0), K || ((K = !0), ie()))),
              R
            );
          }),
          (l.unstable_shouldYield = ne),
          (l.unstable_wrapCallback = function (R) {
            var ee = A;
            return function () {
              var oe = A;
              A = ee;
              try {
                return R.apply(this, arguments);
              } finally {
                A = oe;
              }
            };
          }));
      })(qu)),
    qu
  );
}
var Yp;
function jy() {
  return (Yp || ((Yp = 1), (Bu.exports = Ny())), Bu.exports);
}
var Iu = { exports: {} },
  Te = {};
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Vp;
function Ey() {
  if (Vp) return Te;
  Vp = 1;
  var l = Symbol.for('react.transitional.element'),
    i = Symbol.for('react.portal'),
    r = Symbol.for('react.fragment'),
    s = Symbol.for('react.strict_mode'),
    d = Symbol.for('react.profiler'),
    m = Symbol.for('react.consumer'),
    _ = Symbol.for('react.context'),
    p = Symbol.for('react.forward_ref'),
    h = Symbol.for('react.suspense'),
    g = Symbol.for('react.memo'),
    b = Symbol.for('react.lazy'),
    k = Symbol.for('react.activity'),
    A = Symbol.iterator;
  function C(y) {
    return y === null || typeof y != 'object'
      ? null
      : ((y = (A && y[A]) || y['@@iterator']), typeof y == 'function' ? y : null);
  }
  var z = {
      isMounted: function () {
        return !1;
      },
      enqueueForceUpdate: function () {},
      enqueueReplaceState: function () {},
      enqueueSetState: function () {},
    },
    I = Object.assign,
    M = {};
  function w(y, B, L) {
    ((this.props = y), (this.context = B), (this.refs = M), (this.updater = L || z));
  }
  ((w.prototype.isReactComponent = {}),
    (w.prototype.setState = function (y, B) {
      if (typeof y != 'object' && typeof y != 'function' && y != null)
        throw Error(
          'takes an object of state variables to update or a function which returns an object of state variables.'
        );
      this.updater.enqueueSetState(this, y, B, 'setState');
    }),
    (w.prototype.forceUpdate = function (y) {
      this.updater.enqueueForceUpdate(this, y, 'forceUpdate');
    }));
  function j() {}
  j.prototype = w.prototype;
  function V(y, B, L) {
    ((this.props = y), (this.context = B), (this.refs = M), (this.updater = L || z));
  }
  var $ = (V.prototype = new j());
  (($.constructor = V), I($, w.prototype), ($.isPureReactComponent = !0));
  var te = Array.isArray;
  function K() {}
  var S = { H: null, A: null, T: null, S: null },
    q = Object.prototype.hasOwnProperty;
  function X(y, B, L) {
    var J = L.ref;
    return { $$typeof: l, type: y, key: B, ref: J !== void 0 ? J : null, props: L };
  }
  function ne(y, B) {
    return X(y.type, B, y.props);
  }
  function Z(y) {
    return typeof y == 'object' && y !== null && y.$$typeof === l;
  }
  function ie(y) {
    var B = { '=': '=0', ':': '=2' };
    return (
      '$' +
      y.replace(/[=:]/g, function (L) {
        return B[L];
      })
    );
  }
  var ke = /\/+/g;
  function Se(y, B) {
    return typeof y == 'object' && y !== null && y.key != null ? ie('' + y.key) : B.toString(36);
  }
  function D(y) {
    switch (y.status) {
      case 'fulfilled':
        return y.value;
      case 'rejected':
        throw y.reason;
      default:
        switch (
          (typeof y.status == 'string'
            ? y.then(K, K)
            : ((y.status = 'pending'),
              y.then(
                function (B) {
                  y.status === 'pending' && ((y.status = 'fulfilled'), (y.value = B));
                },
                function (B) {
                  y.status === 'pending' && ((y.status = 'rejected'), (y.reason = B));
                }
              )),
          y.status)
        ) {
          case 'fulfilled':
            return y.value;
          case 'rejected':
            throw y.reason;
        }
    }
    throw y;
  }
  function R(y, B, L, J, le) {
    var ue = typeof y;
    (ue === 'undefined' || ue === 'boolean') && (y = null);
    var ye = !1;
    if (y === null) ye = !0;
    else
      switch (ue) {
        case 'bigint':
        case 'string':
        case 'number':
          ye = !0;
          break;
        case 'object':
          switch (y.$$typeof) {
            case l:
            case i:
              ye = !0;
              break;
            case b:
              return ((ye = y._init), R(ye(y._payload), B, L, J, le));
          }
      }
    if (ye)
      return (
        (le = le(y)),
        (ye = J === '' ? '.' + Se(y, 0) : J),
        te(le)
          ? ((L = ''),
            ye != null && (L = ye.replace(ke, '$&/') + '/'),
            R(le, B, L, '', function (Lt) {
              return Lt;
            }))
          : le != null &&
            (Z(le) &&
              (le = ne(
                le,
                L +
                  (le.key == null || (y && y.key === le.key)
                    ? ''
                    : ('' + le.key).replace(ke, '$&/') + '/') +
                  ye
              )),
            B.push(le)),
        1
      );
    ye = 0;
    var we = J === '' ? '.' : J + ':';
    if (te(y))
      for (var be = 0; be < y.length; be++)
        ((J = y[be]), (ue = we + Se(J, be)), (ye += R(J, B, L, ue, le)));
    else if (((be = C(y)), typeof be == 'function'))
      for (y = be.call(y), be = 0; !(J = y.next()).done; )
        ((J = J.value), (ue = we + Se(J, be++)), (ye += R(J, B, L, ue, le)));
    else if (ue === 'object') {
      if (typeof y.then == 'function') return R(D(y), B, L, J, le);
      throw (
        (B = String(y)),
        Error(
          'Objects are not valid as a React child (found: ' +
            (B === '[object Object]' ? 'object with keys {' + Object.keys(y).join(', ') + '}' : B) +
            '). If you meant to render a collection of children, use an array instead.'
        )
      );
    }
    return ye;
  }
  function ee(y, B, L) {
    if (y == null) return y;
    var J = [],
      le = 0;
    return (
      R(y, J, '', '', function (ue) {
        return B.call(L, ue, le++);
      }),
      J
    );
  }
  function oe(y) {
    if (y._status === -1) {
      var B = y._result;
      ((B = B()),
        B.then(
          function (L) {
            (y._status === 0 || y._status === -1) && ((y._status = 1), (y._result = L));
          },
          function (L) {
            (y._status === 0 || y._status === -1) && ((y._status = 2), (y._result = L));
          }
        ),
        y._status === -1 && ((y._status = 0), (y._result = B)));
    }
    if (y._status === 1) return y._result.default;
    throw y._result;
  }
  var pe =
      typeof reportError == 'function'
        ? reportError
        : function (y) {
            if (typeof window == 'object' && typeof window.ErrorEvent == 'function') {
              var B = new window.ErrorEvent('error', {
                bubbles: !0,
                cancelable: !0,
                message:
                  typeof y == 'object' && y !== null && typeof y.message == 'string'
                    ? String(y.message)
                    : String(y),
                error: y,
              });
              if (!window.dispatchEvent(B)) return;
            } else if (typeof process == 'object' && typeof process.emit == 'function') {
              process.emit('uncaughtException', y);
              return;
            }
            console.error(y);
          },
    de = {
      map: ee,
      forEach: function (y, B, L) {
        ee(
          y,
          function () {
            B.apply(this, arguments);
          },
          L
        );
      },
      count: function (y) {
        var B = 0;
        return (
          ee(y, function () {
            B++;
          }),
          B
        );
      },
      toArray: function (y) {
        return (
          ee(y, function (B) {
            return B;
          }) || []
        );
      },
      only: function (y) {
        if (!Z(y))
          throw Error('React.Children.only expected to receive a single React element child.');
        return y;
      },
    };
  return (
    (Te.Activity = k),
    (Te.Children = de),
    (Te.Component = w),
    (Te.Fragment = r),
    (Te.Profiler = d),
    (Te.PureComponent = V),
    (Te.StrictMode = s),
    (Te.Suspense = h),
    (Te.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = S),
    (Te.__COMPILER_RUNTIME = {
      __proto__: null,
      c: function (y) {
        return S.H.useMemoCache(y);
      },
    }),
    (Te.cache = function (y) {
      return function () {
        return y.apply(null, arguments);
      };
    }),
    (Te.cacheSignal = function () {
      return null;
    }),
    (Te.cloneElement = function (y, B, L) {
      if (y == null) throw Error('The argument must be a React element, but you passed ' + y + '.');
      var J = I({}, y.props),
        le = y.key;
      if (B != null)
        for (ue in (B.key !== void 0 && (le = '' + B.key), B))
          !q.call(B, ue) ||
            ue === 'key' ||
            ue === '__self' ||
            ue === '__source' ||
            (ue === 'ref' && B.ref === void 0) ||
            (J[ue] = B[ue]);
      var ue = arguments.length - 2;
      if (ue === 1) J.children = L;
      else if (1 < ue) {
        for (var ye = Array(ue), we = 0; we < ue; we++) ye[we] = arguments[we + 2];
        J.children = ye;
      }
      return X(y.type, le, J);
    }),
    (Te.createContext = function (y) {
      return (
        (y = {
          $$typeof: _,
          _currentValue: y,
          _currentValue2: y,
          _threadCount: 0,
          Provider: null,
          Consumer: null,
        }),
        (y.Provider = y),
        (y.Consumer = { $$typeof: m, _context: y }),
        y
      );
    }),
    (Te.createElement = function (y, B, L) {
      var J,
        le = {},
        ue = null;
      if (B != null)
        for (J in (B.key !== void 0 && (ue = '' + B.key), B))
          q.call(B, J) && J !== 'key' && J !== '__self' && J !== '__source' && (le[J] = B[J]);
      var ye = arguments.length - 2;
      if (ye === 1) le.children = L;
      else if (1 < ye) {
        for (var we = Array(ye), be = 0; be < ye; be++) we[be] = arguments[be + 2];
        le.children = we;
      }
      if (y && y.defaultProps)
        for (J in ((ye = y.defaultProps), ye)) le[J] === void 0 && (le[J] = ye[J]);
      return X(y, ue, le);
    }),
    (Te.createRef = function () {
      return { current: null };
    }),
    (Te.forwardRef = function (y) {
      return { $$typeof: p, render: y };
    }),
    (Te.isValidElement = Z),
    (Te.lazy = function (y) {
      return { $$typeof: b, _payload: { _status: -1, _result: y }, _init: oe };
    }),
    (Te.memo = function (y, B) {
      return { $$typeof: g, type: y, compare: B === void 0 ? null : B };
    }),
    (Te.startTransition = function (y) {
      var B = S.T,
        L = {};
      S.T = L;
      try {
        var J = y(),
          le = S.S;
        (le !== null && le(L, J),
          typeof J == 'object' && J !== null && typeof J.then == 'function' && J.then(K, pe));
      } catch (ue) {
        pe(ue);
      } finally {
        (B !== null && L.types !== null && (B.types = L.types), (S.T = B));
      }
    }),
    (Te.unstable_useCacheRefresh = function () {
      return S.H.useCacheRefresh();
    }),
    (Te.use = function (y) {
      return S.H.use(y);
    }),
    (Te.useActionState = function (y, B, L) {
      return S.H.useActionState(y, B, L);
    }),
    (Te.useCallback = function (y, B) {
      return S.H.useCallback(y, B);
    }),
    (Te.useContext = function (y) {
      return S.H.useContext(y);
    }),
    (Te.useDebugValue = function () {}),
    (Te.useDeferredValue = function (y, B) {
      return S.H.useDeferredValue(y, B);
    }),
    (Te.useEffect = function (y, B) {
      return S.H.useEffect(y, B);
    }),
    (Te.useEffectEvent = function (y) {
      return S.H.useEffectEvent(y);
    }),
    (Te.useId = function () {
      return S.H.useId();
    }),
    (Te.useImperativeHandle = function (y, B, L) {
      return S.H.useImperativeHandle(y, B, L);
    }),
    (Te.useInsertionEffect = function (y, B) {
      return S.H.useInsertionEffect(y, B);
    }),
    (Te.useLayoutEffect = function (y, B) {
      return S.H.useLayoutEffect(y, B);
    }),
    (Te.useMemo = function (y, B) {
      return S.H.useMemo(y, B);
    }),
    (Te.useOptimistic = function (y, B) {
      return S.H.useOptimistic(y, B);
    }),
    (Te.useReducer = function (y, B, L) {
      return S.H.useReducer(y, B, L);
    }),
    (Te.useRef = function (y) {
      return S.H.useRef(y);
    }),
    (Te.useState = function (y) {
      return S.H.useState(y);
    }),
    (Te.useSyncExternalStore = function (y, B, L) {
      return S.H.useSyncExternalStore(y, B, L);
    }),
    (Te.useTransition = function () {
      return S.H.useTransition();
    }),
    (Te.version = '19.2.5'),
    Te
  );
}
var Xp;
function pd() {
  return (Xp || ((Xp = 1), (Iu.exports = Ey())), Iu.exports);
}
var Ou = { exports: {} },
  Ct = {};
/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Qp;
function Cy() {
  if (Qp) return Ct;
  Qp = 1;
  var l = pd();
  function i(h) {
    var g = 'https://react.dev/errors/' + h;
    if (1 < arguments.length) {
      g += '?args[]=' + encodeURIComponent(arguments[1]);
      for (var b = 2; b < arguments.length; b++) g += '&args[]=' + encodeURIComponent(arguments[b]);
    }
    return (
      'Minified React error #' +
      h +
      '; visit ' +
      g +
      ' for the full message or use the non-minified dev environment for full errors and additional helpful warnings.'
    );
  }
  function r() {}
  var s = {
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
    d = Symbol.for('react.portal');
  function m(h, g, b) {
    var k = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: d,
      key: k == null ? null : '' + k,
      children: h,
      containerInfo: g,
      implementation: b,
    };
  }
  var _ = l.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function p(h, g) {
    if (h === 'font') return '';
    if (typeof g == 'string') return g === 'use-credentials' ? g : '';
  }
  return (
    (Ct.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = s),
    (Ct.createPortal = function (h, g) {
      var b = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
      if (!g || (g.nodeType !== 1 && g.nodeType !== 9 && g.nodeType !== 11)) throw Error(i(299));
      return m(h, g, null, b);
    }),
    (Ct.flushSync = function (h) {
      var g = _.T,
        b = s.p;
      try {
        if (((_.T = null), (s.p = 2), h)) return h();
      } finally {
        ((_.T = g), (s.p = b), s.d.f());
      }
    }),
    (Ct.preconnect = function (h, g) {
      typeof h == 'string' &&
        (g
          ? ((g = g.crossOrigin),
            (g = typeof g == 'string' ? (g === 'use-credentials' ? g : '') : void 0))
          : (g = null),
        s.d.C(h, g));
    }),
    (Ct.prefetchDNS = function (h) {
      typeof h == 'string' && s.d.D(h);
    }),
    (Ct.preinit = function (h, g) {
      if (typeof h == 'string' && g && typeof g.as == 'string') {
        var b = g.as,
          k = p(b, g.crossOrigin),
          A = typeof g.integrity == 'string' ? g.integrity : void 0,
          C = typeof g.fetchPriority == 'string' ? g.fetchPriority : void 0;
        b === 'style'
          ? s.d.S(h, typeof g.precedence == 'string' ? g.precedence : void 0, {
              crossOrigin: k,
              integrity: A,
              fetchPriority: C,
            })
          : b === 'script' &&
            s.d.X(h, {
              crossOrigin: k,
              integrity: A,
              fetchPriority: C,
              nonce: typeof g.nonce == 'string' ? g.nonce : void 0,
            });
      }
    }),
    (Ct.preinitModule = function (h, g) {
      if (typeof h == 'string')
        if (typeof g == 'object' && g !== null) {
          if (g.as == null || g.as === 'script') {
            var b = p(g.as, g.crossOrigin);
            s.d.M(h, {
              crossOrigin: b,
              integrity: typeof g.integrity == 'string' ? g.integrity : void 0,
              nonce: typeof g.nonce == 'string' ? g.nonce : void 0,
            });
          }
        } else g == null && s.d.M(h);
    }),
    (Ct.preload = function (h, g) {
      if (typeof h == 'string' && typeof g == 'object' && g !== null && typeof g.as == 'string') {
        var b = g.as,
          k = p(b, g.crossOrigin);
        s.d.L(h, b, {
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
    (Ct.preloadModule = function (h, g) {
      if (typeof h == 'string')
        if (g) {
          var b = p(g.as, g.crossOrigin);
          s.d.m(h, {
            as: typeof g.as == 'string' && g.as !== 'script' ? g.as : void 0,
            crossOrigin: b,
            integrity: typeof g.integrity == 'string' ? g.integrity : void 0,
          });
        } else s.d.m(h);
    }),
    (Ct.requestFormReset = function (h) {
      s.d.r(h);
    }),
    (Ct.unstable_batchedUpdates = function (h, g) {
      return h(g);
    }),
    (Ct.useFormState = function (h, g, b) {
      return _.H.useFormState(h, g, b);
    }),
    (Ct.useFormStatus = function () {
      return _.H.useHostTransitionStatus();
    }),
    (Ct.version = '19.2.5'),
    Ct
  );
}
var Kp;
function Ay() {
  if (Kp) return Ou.exports;
  Kp = 1;
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
  return (l(), (Ou.exports = Cy()), Ou.exports);
}
/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Zp;
function Ly() {
  if (Zp) return ls;
  Zp = 1;
  var l = jy(),
    i = pd(),
    r = Ay();
  function s(e) {
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
  function d(e) {
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
  function _(e) {
    if (e.tag === 13) {
      var t = e.memoizedState;
      if ((t === null && ((e = e.alternate), e !== null && (t = e.memoizedState)), t !== null))
        return t.dehydrated;
    }
    return null;
  }
  function p(e) {
    if (e.tag === 31) {
      var t = e.memoizedState;
      if ((t === null && ((e = e.alternate), e !== null && (t = e.memoizedState)), t !== null))
        return t.dehydrated;
    }
    return null;
  }
  function h(e) {
    if (m(e) !== e) throw Error(s(188));
  }
  function g(e) {
    var t = e.alternate;
    if (!t) {
      if (((t = m(e)), t === null)) throw Error(s(188));
      return t !== e ? null : e;
    }
    for (var a = e, n = t; ; ) {
      var o = a.return;
      if (o === null) break;
      var c = o.alternate;
      if (c === null) {
        if (((n = o.return), n !== null)) {
          a = n;
          continue;
        }
        break;
      }
      if (o.child === c.child) {
        for (c = o.child; c; ) {
          if (c === a) return (h(o), e);
          if (c === n) return (h(o), t);
          c = c.sibling;
        }
        throw Error(s(188));
      }
      if (a.return !== n.return) ((a = o), (n = c));
      else {
        for (var f = !1, v = o.child; v; ) {
          if (v === a) {
            ((f = !0), (a = o), (n = c));
            break;
          }
          if (v === n) {
            ((f = !0), (n = o), (a = c));
            break;
          }
          v = v.sibling;
        }
        if (!f) {
          for (v = c.child; v; ) {
            if (v === a) {
              ((f = !0), (a = c), (n = o));
              break;
            }
            if (v === n) {
              ((f = !0), (n = c), (a = o));
              break;
            }
            v = v.sibling;
          }
          if (!f) throw Error(s(189));
        }
      }
      if (a.alternate !== n) throw Error(s(190));
    }
    if (a.tag !== 3) throw Error(s(188));
    return a.stateNode.current === a ? e : t;
  }
  function b(e) {
    var t = e.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return e;
    for (e = e.child; e !== null; ) {
      if (((t = b(e)), t !== null)) return t;
      e = e.sibling;
    }
    return null;
  }
  var k = Object.assign,
    A = Symbol.for('react.element'),
    C = Symbol.for('react.transitional.element'),
    z = Symbol.for('react.portal'),
    I = Symbol.for('react.fragment'),
    M = Symbol.for('react.strict_mode'),
    w = Symbol.for('react.profiler'),
    j = Symbol.for('react.consumer'),
    V = Symbol.for('react.context'),
    $ = Symbol.for('react.forward_ref'),
    te = Symbol.for('react.suspense'),
    K = Symbol.for('react.suspense_list'),
    S = Symbol.for('react.memo'),
    q = Symbol.for('react.lazy'),
    X = Symbol.for('react.activity'),
    ne = Symbol.for('react.memo_cache_sentinel'),
    Z = Symbol.iterator;
  function ie(e) {
    return e === null || typeof e != 'object'
      ? null
      : ((e = (Z && e[Z]) || e['@@iterator']), typeof e == 'function' ? e : null);
  }
  var ke = Symbol.for('react.client.reference');
  function Se(e) {
    if (e == null) return null;
    if (typeof e == 'function') return e.$$typeof === ke ? null : e.displayName || e.name || null;
    if (typeof e == 'string') return e;
    switch (e) {
      case I:
        return 'Fragment';
      case w:
        return 'Profiler';
      case M:
        return 'StrictMode';
      case te:
        return 'Suspense';
      case K:
        return 'SuspenseList';
      case X:
        return 'Activity';
    }
    if (typeof e == 'object')
      switch (e.$$typeof) {
        case z:
          return 'Portal';
        case V:
          return e.displayName || 'Context';
        case j:
          return (e._context.displayName || 'Context') + '.Consumer';
        case $:
          var t = e.render;
          return (
            (e = e.displayName),
            e ||
              ((e = t.displayName || t.name || ''),
              (e = e !== '' ? 'ForwardRef(' + e + ')' : 'ForwardRef')),
            e
          );
        case S:
          return ((t = e.displayName || null), t !== null ? t : Se(e.type) || 'Memo');
        case q:
          ((t = e._payload), (e = e._init));
          try {
            return Se(e(t));
          } catch {}
      }
    return null;
  }
  var D = Array.isArray,
    R = i.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
    ee = r.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
    oe = { pending: !1, data: null, method: null, action: null },
    pe = [],
    de = -1;
  function y(e) {
    return { current: e };
  }
  function B(e) {
    0 > de || ((e.current = pe[de]), (pe[de] = null), de--);
  }
  function L(e, t) {
    (de++, (pe[de] = e.current), (e.current = t));
  }
  var J = y(null),
    le = y(null),
    ue = y(null),
    ye = y(null);
  function we(e, t) {
    switch ((L(ue, t), L(le, e), L(J, null), t.nodeType)) {
      case 9:
      case 11:
        e = (e = t.documentElement) && (e = e.namespaceURI) ? up(e) : 0;
        break;
      default:
        if (((e = t.tagName), (t = t.namespaceURI))) ((t = up(t)), (e = dp(t, e)));
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
    (B(J), L(J, e));
  }
  function be() {
    (B(J), B(le), B(ue));
  }
  function Lt(e) {
    e.memoizedState !== null && L(ye, e);
    var t = J.current,
      a = dp(t, e.type);
    t !== a && (L(le, e), L(J, a));
  }
  function Bt(e) {
    (le.current === e && (B(J), B(le)), ye.current === e && (B(ye), (Pi._currentValue = oe)));
  }
  var la, en;
  function Cl(e) {
    if (la === void 0)
      try {
        throw Error();
      } catch (a) {
        var t = a.stack.trim().match(/\n( *(at )?)/);
        ((la = (t && t[1]) || ''),
          (en =
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
      la +
      e +
      en
    );
  }
  var si = !1;
  function La(e, t) {
    if (!e || si) return '';
    si = !0;
    var a = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var n = {
        DetermineComponentFrameRoot: function () {
          try {
            if (t) {
              var W = function () {
                throw Error();
              };
              if (
                (Object.defineProperty(W.prototype, 'props', {
                  set: function () {
                    throw Error();
                  },
                }),
                typeof Reflect == 'object' && Reflect.construct)
              ) {
                try {
                  Reflect.construct(W, []);
                } catch (Y) {
                  var G = Y;
                }
                Reflect.construct(e, [], W);
              } else {
                try {
                  W.call();
                } catch (Y) {
                  G = Y;
                }
                e.call(W.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (Y) {
                G = Y;
              }
              (W = e()) && typeof W.catch == 'function' && W.catch(function () {});
            }
          } catch (Y) {
            if (Y && G && typeof Y.stack == 'string') return [Y.stack, G.stack];
          }
          return [null, null];
        },
      };
      n.DetermineComponentFrameRoot.displayName = 'DetermineComponentFrameRoot';
      var o = Object.getOwnPropertyDescriptor(n.DetermineComponentFrameRoot, 'name');
      o &&
        o.configurable &&
        Object.defineProperty(n.DetermineComponentFrameRoot, 'name', {
          value: 'DetermineComponentFrameRoot',
        });
      var c = n.DetermineComponentFrameRoot(),
        f = c[0],
        v = c[1];
      if (f && v) {
        var T = f.split(`
`),
          U = v.split(`
`);
        for (o = n = 0; n < T.length && !T[n].includes('DetermineComponentFrameRoot'); ) n++;
        for (; o < U.length && !U[o].includes('DetermineComponentFrameRoot'); ) o++;
        if (n === T.length || o === U.length)
          for (n = T.length - 1, o = U.length - 1; 1 <= n && 0 <= o && T[n] !== U[o]; ) o--;
        for (; 1 <= n && 0 <= o; n--, o--)
          if (T[n] !== U[o]) {
            if (n !== 1 || o !== 1)
              do
                if ((n--, o--, 0 > o || T[n] !== U[o])) {
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
              while (1 <= n && 0 <= o);
            break;
          }
      }
    } finally {
      ((si = !1), (Error.prepareStackTrace = a));
    }
    return (a = e ? e.displayName || e.name : '') ? Cl(a) : '';
  }
  function ri(e, t) {
    switch (e.tag) {
      case 26:
      case 27:
      case 5:
        return Cl(e.type);
      case 16:
        return Cl('Lazy');
      case 13:
        return e.child !== t && t !== null ? Cl('Suspense Fallback') : Cl('Suspense');
      case 19:
        return Cl('SuspenseList');
      case 0:
      case 15:
        return La(e.type, !1);
      case 11:
        return La(e.type.render, !1);
      case 1:
        return La(e.type, !0);
      case 31:
        return Cl('Activity');
      default:
        return '';
    }
  }
  function Ss(e) {
    try {
      var t = '',
        a = null;
      do ((t += ri(e, a)), (a = e), (e = e.return));
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
  var tn = Object.prototype.hasOwnProperty,
    oi = l.unstable_scheduleCallback,
    Ba = l.unstable_cancelCallback,
    ln = l.unstable_shouldYield,
    ws = l.unstable_requestPaint,
    Nt = l.unstable_now,
    fo = l.unstable_getCurrentPriorityLevel,
    st = l.unstable_ImmediatePriority,
    Al = l.unstable_UserBlockingPriority,
    an = l.unstable_NormalPriority,
    Ts = l.unstable_LowPriority,
    ci = l.unstable_IdlePriority,
    po = l.log,
    Ns = l.unstable_setDisableYieldValue,
    aa = null,
    jt = null;
  function dl(e) {
    if ((typeof po == 'function' && Ns(e), jt && typeof jt.setStrictMode == 'function'))
      try {
        jt.setStrictMode(aa, e);
      } catch {}
  }
  var Et = Math.clz32 ? Math.clz32 : ce,
    N = Math.log,
    ae = Math.LN2;
  function ce(e) {
    return ((e >>>= 0), e === 0 ? 32 : (31 - ((N(e) / ae) | 0)) | 0);
  }
  var re = 256,
    Ie = 262144,
    Ze = 4194304;
  function Xe(e) {
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
  function Zt(e, t, a) {
    var n = e.pendingLanes;
    if (n === 0) return 0;
    var o = 0,
      c = e.suspendedLanes,
      f = e.pingedLanes;
    e = e.warmLanes;
    var v = n & 134217727;
    return (
      v !== 0
        ? ((n = v & ~c),
          n !== 0
            ? (o = Xe(n))
            : ((f &= v), f !== 0 ? (o = Xe(f)) : a || ((a = v & ~e), a !== 0 && (o = Xe(a)))))
        : ((v = n & ~c),
          v !== 0
            ? (o = Xe(v))
            : f !== 0
              ? (o = Xe(f))
              : a || ((a = n & ~e), a !== 0 && (o = Xe(a)))),
      o === 0
        ? 0
        : t !== 0 &&
            t !== o &&
            (t & c) === 0 &&
            ((c = o & -o), (a = t & -t), c >= a || (c === 32 && (a & 4194048) !== 0))
          ? t
          : o
    );
  }
  function Jt(e, t) {
    return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & t) === 0;
  }
  function ho(e, t) {
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
  function ui() {
    var e = Ze;
    return ((Ze <<= 1), (Ze & 62914560) === 0 && (Ze = 4194304), e);
  }
  function go(e) {
    for (var t = [], a = 0; 31 > a; a++) t.push(e);
    return t;
  }
  function di(e, t) {
    ((e.pendingLanes |= t),
      t !== 268435456 && ((e.suspendedLanes = 0), (e.pingedLanes = 0), (e.warmLanes = 0)));
  }
  function uk(e, t, a, n, o, c) {
    var f = e.pendingLanes;
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
      U = e.hiddenUpdates;
    for (a = f & ~a; 0 < a; ) {
      var Q = 31 - Et(a),
        W = 1 << Q;
      ((v[Q] = 0), (T[Q] = -1));
      var G = U[Q];
      if (G !== null)
        for (U[Q] = null, Q = 0; Q < G.length; Q++) {
          var Y = G[Q];
          Y !== null && (Y.lane &= -536870913);
        }
      a &= ~W;
    }
    (n !== 0 && Vd(e, n, 0),
      c !== 0 && o === 0 && e.tag !== 0 && (e.suspendedLanes |= c & ~(f & ~t)));
  }
  function Vd(e, t, a) {
    ((e.pendingLanes |= t), (e.suspendedLanes &= ~t));
    var n = 31 - Et(t);
    ((e.entangledLanes |= t),
      (e.entanglements[n] = e.entanglements[n] | 1073741824 | (a & 261930)));
  }
  function Xd(e, t) {
    var a = (e.entangledLanes |= t);
    for (e = e.entanglements; a; ) {
      var n = 31 - Et(a),
        o = 1 << n;
      ((o & t) | (e[n] & t) && (e[n] |= t), (a &= ~o));
    }
  }
  function Qd(e, t) {
    var a = t & -t;
    return ((a = (a & 42) !== 0 ? 1 : ko(a)), (a & (e.suspendedLanes | t)) !== 0 ? 0 : a);
  }
  function ko(e) {
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
  function vo(e) {
    return ((e &= -e), 2 < e ? (8 < e ? ((e & 134217727) !== 0 ? 32 : 268435456) : 8) : 2);
  }
  function Kd() {
    var e = ee.p;
    return e !== 0 ? e : ((e = window.event), e === void 0 ? 32 : Ip(e.type));
  }
  function Zd(e, t) {
    var a = ee.p;
    try {
      return ((ee.p = e), t());
    } finally {
      ee.p = a;
    }
  }
  var na = Math.random().toString(36).slice(2),
    vt = '__reactFiber$' + na,
    qt = '__reactProps$' + na,
    nn = '__reactContainer$' + na,
    yo = '__reactEvents$' + na,
    dk = '__reactListeners$' + na,
    mk = '__reactHandles$' + na,
    Jd = '__reactResources$' + na,
    mi = '__reactMarker$' + na;
  function bo(e) {
    (delete e[vt], delete e[qt], delete e[yo], delete e[dk], delete e[mk]);
  }
  function sn(e) {
    var t = e[vt];
    if (t) return t;
    for (var a = e.parentNode; a; ) {
      if ((t = a[nn] || a[vt])) {
        if (((a = t.alternate), t.child !== null || (a !== null && a.child !== null)))
          for (e = kp(e); e !== null; ) {
            if ((a = e[vt])) return a;
            e = kp(e);
          }
        return t;
      }
      ((e = a), (a = e.parentNode));
    }
    return null;
  }
  function rn(e) {
    if ((e = e[vt] || e[nn])) {
      var t = e.tag;
      if (t === 5 || t === 6 || t === 13 || t === 31 || t === 26 || t === 27 || t === 3) return e;
    }
    return null;
  }
  function _i(e) {
    var t = e.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return e.stateNode;
    throw Error(s(33));
  }
  function on(e) {
    var t = e[Jd];
    return (t || (t = e[Jd] = { hoistableStyles: new Map(), hoistableScripts: new Map() }), t);
  }
  function pt(e) {
    e[mi] = !0;
  }
  var Pd = new Set(),
    Fd = {};
  function qa(e, t) {
    (cn(e, t), cn(e + 'Capture', t));
  }
  function cn(e, t) {
    for (Fd[e] = t, e = 0; e < t.length; e++) Pd.add(t[e]);
  }
  var _k = RegExp(
      '^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$'
    ),
    Wd = {},
    em = {};
  function fk(e) {
    return tn.call(em, e)
      ? !0
      : tn.call(Wd, e)
        ? !1
        : _k.test(e)
          ? (em[e] = !0)
          : ((Wd[e] = !0), !1);
  }
  function js(e, t, a) {
    if (fk(t))
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
  function Es(e, t, a) {
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
  function Ll(e, t, a, n) {
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
  function Pt(e) {
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
  function tm(e) {
    var t = e.type;
    return (e = e.nodeName) && e.toLowerCase() === 'input' && (t === 'checkbox' || t === 'radio');
  }
  function pk(e, t, a) {
    var n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t);
    if (
      !e.hasOwnProperty(t) &&
      typeof n < 'u' &&
      typeof n.get == 'function' &&
      typeof n.set == 'function'
    ) {
      var o = n.get,
        c = n.set;
      return (
        Object.defineProperty(e, t, {
          configurable: !0,
          get: function () {
            return o.call(this);
          },
          set: function (f) {
            ((a = '' + f), c.call(this, f));
          },
        }),
        Object.defineProperty(e, t, { enumerable: n.enumerable }),
        {
          getValue: function () {
            return a;
          },
          setValue: function (f) {
            a = '' + f;
          },
          stopTracking: function () {
            ((e._valueTracker = null), delete e[t]);
          },
        }
      );
    }
  }
  function xo(e) {
    if (!e._valueTracker) {
      var t = tm(e) ? 'checked' : 'value';
      e._valueTracker = pk(e, t, '' + e[t]);
    }
  }
  function lm(e) {
    if (!e) return !1;
    var t = e._valueTracker;
    if (!t) return !0;
    var a = t.getValue(),
      n = '';
    return (
      e && (n = tm(e) ? (e.checked ? 'true' : 'false') : e.value),
      (e = n),
      e !== a ? (t.setValue(e), !0) : !1
    );
  }
  function Cs(e) {
    if (((e = e || (typeof document < 'u' ? document : void 0)), typeof e > 'u')) return null;
    try {
      return e.activeElement || e.body;
    } catch {
      return e.body;
    }
  }
  var hk = /[\n"\\]/g;
  function Ft(e) {
    return e.replace(hk, function (t) {
      return '\\' + t.charCodeAt(0).toString(16) + ' ';
    });
  }
  function So(e, t, a, n, o, c, f, v) {
    ((e.name = ''),
      f != null && typeof f != 'function' && typeof f != 'symbol' && typeof f != 'boolean'
        ? (e.type = f)
        : e.removeAttribute('type'),
      t != null
        ? f === 'number'
          ? ((t === 0 && e.value === '') || e.value != t) && (e.value = '' + Pt(t))
          : e.value !== '' + Pt(t) && (e.value = '' + Pt(t))
        : (f !== 'submit' && f !== 'reset') || e.removeAttribute('value'),
      t != null
        ? wo(e, f, Pt(t))
        : a != null
          ? wo(e, f, Pt(a))
          : n != null && e.removeAttribute('value'),
      o == null && c != null && (e.defaultChecked = !!c),
      o != null && (e.checked = o && typeof o != 'function' && typeof o != 'symbol'),
      v != null && typeof v != 'function' && typeof v != 'symbol' && typeof v != 'boolean'
        ? (e.name = '' + Pt(v))
        : e.removeAttribute('name'));
  }
  function am(e, t, a, n, o, c, f, v) {
    if (
      (c != null &&
        typeof c != 'function' &&
        typeof c != 'symbol' &&
        typeof c != 'boolean' &&
        (e.type = c),
      t != null || a != null)
    ) {
      if (!((c !== 'submit' && c !== 'reset') || t != null)) {
        xo(e);
        return;
      }
      ((a = a != null ? '' + Pt(a) : ''),
        (t = t != null ? '' + Pt(t) : a),
        v || t === e.value || (e.value = t),
        (e.defaultValue = t));
    }
    ((n = n ?? o),
      (n = typeof n != 'function' && typeof n != 'symbol' && !!n),
      (e.checked = v ? e.checked : !!n),
      (e.defaultChecked = !!n),
      f != null &&
        typeof f != 'function' &&
        typeof f != 'symbol' &&
        typeof f != 'boolean' &&
        (e.name = f),
      xo(e));
  }
  function wo(e, t, a) {
    (t === 'number' && Cs(e.ownerDocument) === e) ||
      e.defaultValue === '' + a ||
      (e.defaultValue = '' + a);
  }
  function un(e, t, a, n) {
    if (((e = e.options), t)) {
      t = {};
      for (var o = 0; o < a.length; o++) t['$' + a[o]] = !0;
      for (a = 0; a < e.length; a++)
        ((o = t.hasOwnProperty('$' + e[a].value)),
          e[a].selected !== o && (e[a].selected = o),
          o && n && (e[a].defaultSelected = !0));
    } else {
      for (a = '' + Pt(a), t = null, o = 0; o < e.length; o++) {
        if (e[o].value === a) {
          ((e[o].selected = !0), n && (e[o].defaultSelected = !0));
          return;
        }
        t !== null || e[o].disabled || (t = e[o]);
      }
      t !== null && (t.selected = !0);
    }
  }
  function nm(e, t, a) {
    if (t != null && ((t = '' + Pt(t)), t !== e.value && (e.value = t), a == null)) {
      e.defaultValue !== t && (e.defaultValue = t);
      return;
    }
    e.defaultValue = a != null ? '' + Pt(a) : '';
  }
  function im(e, t, a, n) {
    if (t == null) {
      if (n != null) {
        if (a != null) throw Error(s(92));
        if (D(n)) {
          if (1 < n.length) throw Error(s(93));
          n = n[0];
        }
        a = n;
      }
      (a == null && (a = ''), (t = a));
    }
    ((a = Pt(t)),
      (e.defaultValue = a),
      (n = e.textContent),
      n === a && n !== '' && n !== null && (e.value = n),
      xo(e));
  }
  function dn(e, t) {
    if (t) {
      var a = e.firstChild;
      if (a && a === e.lastChild && a.nodeType === 3) {
        a.nodeValue = t;
        return;
      }
    }
    e.textContent = t;
  }
  var gk = new Set(
    'animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp'.split(
      ' '
    )
  );
  function sm(e, t, a) {
    var n = t.indexOf('--') === 0;
    a == null || typeof a == 'boolean' || a === ''
      ? n
        ? e.setProperty(t, '')
        : t === 'float'
          ? (e.cssFloat = '')
          : (e[t] = '')
      : n
        ? e.setProperty(t, a)
        : typeof a != 'number' || a === 0 || gk.has(t)
          ? t === 'float'
            ? (e.cssFloat = a)
            : (e[t] = ('' + a).trim())
          : (e[t] = a + 'px');
  }
  function rm(e, t, a) {
    if (t != null && typeof t != 'object') throw Error(s(62));
    if (((e = e.style), a != null)) {
      for (var n in a)
        !a.hasOwnProperty(n) ||
          (t != null && t.hasOwnProperty(n)) ||
          (n.indexOf('--') === 0
            ? e.setProperty(n, '')
            : n === 'float'
              ? (e.cssFloat = '')
              : (e[n] = ''));
      for (var o in t) ((n = t[o]), t.hasOwnProperty(o) && a[o] !== n && sm(e, o, n));
    } else for (var c in t) t.hasOwnProperty(c) && sm(e, c, t[c]);
  }
  function To(e) {
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
  var kk = new Map([
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
    vk =
      /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function As(e) {
    return vk.test('' + e)
      ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')"
      : e;
  }
  function Bl() {}
  var No = null;
  function jo(e) {
    return (
      (e = e.target || e.srcElement || window),
      e.correspondingUseElement && (e = e.correspondingUseElement),
      e.nodeType === 3 ? e.parentNode : e
    );
  }
  var mn = null,
    _n = null;
  function om(e) {
    var t = rn(e);
    if (t && (e = t.stateNode)) {
      var a = e[qt] || null;
      e: switch (((e = t.stateNode), t.type)) {
        case 'input':
          if (
            (So(
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
              a = a.querySelectorAll('input[name="' + Ft('' + t) + '"][type="radio"]'), t = 0;
              t < a.length;
              t++
            ) {
              var n = a[t];
              if (n !== e && n.form === e.form) {
                var o = n[qt] || null;
                if (!o) throw Error(s(90));
                So(
                  n,
                  o.value,
                  o.defaultValue,
                  o.defaultValue,
                  o.checked,
                  o.defaultChecked,
                  o.type,
                  o.name
                );
              }
            }
            for (t = 0; t < a.length; t++) ((n = a[t]), n.form === e.form && lm(n));
          }
          break e;
        case 'textarea':
          nm(e, a.value, a.defaultValue);
          break e;
        case 'select':
          ((t = a.value), t != null && un(e, !!a.multiple, t, !1));
      }
    }
  }
  var Eo = !1;
  function cm(e, t, a) {
    if (Eo) return e(t, a);
    Eo = !0;
    try {
      var n = e(t);
      return n;
    } finally {
      if (
        ((Eo = !1),
        (mn !== null || _n !== null) &&
          (gr(), mn && ((t = mn), (e = _n), (_n = mn = null), om(t), e)))
      )
        for (t = 0; t < e.length; t++) om(e[t]);
    }
  }
  function fi(e, t) {
    var a = e.stateNode;
    if (a === null) return null;
    var n = a[qt] || null;
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
    if (a && typeof a != 'function') throw Error(s(231, t, typeof a));
    return a;
  }
  var ql = !(
      typeof window > 'u' ||
      typeof window.document > 'u' ||
      typeof window.document.createElement > 'u'
    ),
    Co = !1;
  if (ql)
    try {
      var pi = {};
      (Object.defineProperty(pi, 'passive', {
        get: function () {
          Co = !0;
        },
      }),
        window.addEventListener('test', pi, pi),
        window.removeEventListener('test', pi, pi));
    } catch {
      Co = !1;
    }
  var ia = null,
    Ao = null,
    Ls = null;
  function um() {
    if (Ls) return Ls;
    var e,
      t = Ao,
      a = t.length,
      n,
      o = 'value' in ia ? ia.value : ia.textContent,
      c = o.length;
    for (e = 0; e < a && t[e] === o[e]; e++);
    var f = a - e;
    for (n = 1; n <= f && t[a - n] === o[c - n]; n++);
    return (Ls = o.slice(e, 1 < n ? 1 - n : void 0));
  }
  function Bs(e) {
    var t = e.keyCode;
    return (
      'charCode' in e ? ((e = e.charCode), e === 0 && t === 13 && (e = 13)) : (e = t),
      e === 10 && (e = 13),
      32 <= e || e === 13 ? e : 0
    );
  }
  function qs() {
    return !0;
  }
  function dm() {
    return !1;
  }
  function It(e) {
    function t(a, n, o, c, f) {
      ((this._reactName = a),
        (this._targetInst = o),
        (this.type = n),
        (this.nativeEvent = c),
        (this.target = f),
        (this.currentTarget = null));
      for (var v in e) e.hasOwnProperty(v) && ((a = e[v]), (this[v] = a ? a(c) : c[v]));
      return (
        (this.isDefaultPrevented = (
          c.defaultPrevented != null ? c.defaultPrevented : c.returnValue === !1
        )
          ? qs
          : dm),
        (this.isPropagationStopped = dm),
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
            (this.isDefaultPrevented = qs));
        },
        stopPropagation: function () {
          var a = this.nativeEvent;
          a &&
            (a.stopPropagation
              ? a.stopPropagation()
              : typeof a.cancelBubble != 'unknown' && (a.cancelBubble = !0),
            (this.isPropagationStopped = qs));
        },
        persist: function () {},
        isPersistent: qs,
      }),
      t
    );
  }
  var Ia = {
      eventPhase: 0,
      bubbles: 0,
      cancelable: 0,
      timeStamp: function (e) {
        return e.timeStamp || Date.now();
      },
      defaultPrevented: 0,
      isTrusted: 0,
    },
    Is = It(Ia),
    hi = k({}, Ia, { view: 0, detail: 0 }),
    yk = It(hi),
    Lo,
    Bo,
    gi,
    Os = k({}, hi, {
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
      getModifierState: Io,
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
          : (e !== gi &&
              (gi && e.type === 'mousemove'
                ? ((Lo = e.screenX - gi.screenX), (Bo = e.screenY - gi.screenY))
                : (Bo = Lo = 0),
              (gi = e)),
            Lo);
      },
      movementY: function (e) {
        return 'movementY' in e ? e.movementY : Bo;
      },
    }),
    mm = It(Os),
    bk = k({}, Os, { dataTransfer: 0 }),
    xk = It(bk),
    Sk = k({}, hi, { relatedTarget: 0 }),
    qo = It(Sk),
    wk = k({}, Ia, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
    Tk = It(wk),
    Nk = k({}, Ia, {
      clipboardData: function (e) {
        return 'clipboardData' in e ? e.clipboardData : window.clipboardData;
      },
    }),
    jk = It(Nk),
    Ek = k({}, Ia, { data: 0 }),
    _m = It(Ek),
    Ck = {
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
    Ak = {
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
    Lk = { Alt: 'altKey', Control: 'ctrlKey', Meta: 'metaKey', Shift: 'shiftKey' };
  function Bk(e) {
    var t = this.nativeEvent;
    return t.getModifierState ? t.getModifierState(e) : (e = Lk[e]) ? !!t[e] : !1;
  }
  function Io() {
    return Bk;
  }
  var qk = k({}, hi, {
      key: function (e) {
        if (e.key) {
          var t = Ck[e.key] || e.key;
          if (t !== 'Unidentified') return t;
        }
        return e.type === 'keypress'
          ? ((e = Bs(e)), e === 13 ? 'Enter' : String.fromCharCode(e))
          : e.type === 'keydown' || e.type === 'keyup'
            ? Ak[e.keyCode] || 'Unidentified'
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
      getModifierState: Io,
      charCode: function (e) {
        return e.type === 'keypress' ? Bs(e) : 0;
      },
      keyCode: function (e) {
        return e.type === 'keydown' || e.type === 'keyup' ? e.keyCode : 0;
      },
      which: function (e) {
        return e.type === 'keypress'
          ? Bs(e)
          : e.type === 'keydown' || e.type === 'keyup'
            ? e.keyCode
            : 0;
      },
    }),
    Ik = It(qk),
    Ok = k({}, Os, {
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
    fm = It(Ok),
    Mk = k({}, hi, {
      touches: 0,
      targetTouches: 0,
      changedTouches: 0,
      altKey: 0,
      metaKey: 0,
      ctrlKey: 0,
      shiftKey: 0,
      getModifierState: Io,
    }),
    Rk = It(Mk),
    Dk = k({}, Ia, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
    zk = It(Dk),
    Hk = k({}, Os, {
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
    Uk = It(Hk),
    $k = k({}, Ia, { newState: 0, oldState: 0 }),
    Gk = It($k),
    Yk = [9, 13, 27, 32],
    Oo = ql && 'CompositionEvent' in window,
    ki = null;
  ql && 'documentMode' in document && (ki = document.documentMode);
  var Vk = ql && 'TextEvent' in window && !ki,
    pm = ql && (!Oo || (ki && 8 < ki && 11 >= ki)),
    hm = ' ',
    gm = !1;
  function km(e, t) {
    switch (e) {
      case 'keyup':
        return Yk.indexOf(t.keyCode) !== -1;
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
  function vm(e) {
    return ((e = e.detail), typeof e == 'object' && 'data' in e ? e.data : null);
  }
  var fn = !1;
  function Xk(e, t) {
    switch (e) {
      case 'compositionend':
        return vm(t);
      case 'keypress':
        return t.which !== 32 ? null : ((gm = !0), hm);
      case 'textInput':
        return ((e = t.data), e === hm && gm ? null : e);
      default:
        return null;
    }
  }
  function Qk(e, t) {
    if (fn)
      return e === 'compositionend' || (!Oo && km(e, t))
        ? ((e = um()), (Ls = Ao = ia = null), (fn = !1), e)
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
        return pm && t.locale !== 'ko' ? null : t.data;
      default:
        return null;
    }
  }
  var Kk = {
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
  function ym(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t === 'input' ? !!Kk[e.type] : t === 'textarea';
  }
  function bm(e, t, a, n) {
    (mn ? (_n ? _n.push(n) : (_n = [n])) : (mn = n),
      (t = wr(t, 'onChange')),
      0 < t.length &&
        ((a = new Is('onChange', 'change', null, a, n)), e.push({ event: a, listeners: t })));
  }
  var vi = null,
    yi = null;
  function Zk(e) {
    np(e, 0);
  }
  function Ms(e) {
    var t = _i(e);
    if (lm(t)) return e;
  }
  function xm(e, t) {
    if (e === 'change') return t;
  }
  var Sm = !1;
  if (ql) {
    var Mo;
    if (ql) {
      var Ro = 'oninput' in document;
      if (!Ro) {
        var wm = document.createElement('div');
        (wm.setAttribute('oninput', 'return;'), (Ro = typeof wm.oninput == 'function'));
      }
      Mo = Ro;
    } else Mo = !1;
    Sm = Mo && (!document.documentMode || 9 < document.documentMode);
  }
  function Tm() {
    vi && (vi.detachEvent('onpropertychange', Nm), (yi = vi = null));
  }
  function Nm(e) {
    if (e.propertyName === 'value' && Ms(yi)) {
      var t = [];
      (bm(t, yi, e, jo(e)), cm(Zk, t));
    }
  }
  function Jk(e, t, a) {
    e === 'focusin'
      ? (Tm(), (vi = t), (yi = a), vi.attachEvent('onpropertychange', Nm))
      : e === 'focusout' && Tm();
  }
  function Pk(e) {
    if (e === 'selectionchange' || e === 'keyup' || e === 'keydown') return Ms(yi);
  }
  function Fk(e, t) {
    if (e === 'click') return Ms(t);
  }
  function Wk(e, t) {
    if (e === 'input' || e === 'change') return Ms(t);
  }
  function ev(e, t) {
    return (e === t && (e !== 0 || 1 / e === 1 / t)) || (e !== e && t !== t);
  }
  var Ht = typeof Object.is == 'function' ? Object.is : ev;
  function bi(e, t) {
    if (Ht(e, t)) return !0;
    if (typeof e != 'object' || e === null || typeof t != 'object' || t === null) return !1;
    var a = Object.keys(e),
      n = Object.keys(t);
    if (a.length !== n.length) return !1;
    for (n = 0; n < a.length; n++) {
      var o = a[n];
      if (!tn.call(t, o) || !Ht(e[o], t[o])) return !1;
    }
    return !0;
  }
  function jm(e) {
    for (; e && e.firstChild; ) e = e.firstChild;
    return e;
  }
  function Em(e, t) {
    var a = jm(e);
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
      a = jm(a);
    }
  }
  function Cm(e, t) {
    return e && t
      ? e === t
        ? !0
        : e && e.nodeType === 3
          ? !1
          : t && t.nodeType === 3
            ? Cm(e, t.parentNode)
            : 'contains' in e
              ? e.contains(t)
              : e.compareDocumentPosition
                ? !!(e.compareDocumentPosition(t) & 16)
                : !1
      : !1;
  }
  function Am(e) {
    e =
      e != null && e.ownerDocument != null && e.ownerDocument.defaultView != null
        ? e.ownerDocument.defaultView
        : window;
    for (var t = Cs(e.document); t instanceof e.HTMLIFrameElement; ) {
      try {
        var a = typeof t.contentWindow.location.href == 'string';
      } catch {
        a = !1;
      }
      if (a) e = t.contentWindow;
      else break;
      t = Cs(e.document);
    }
    return t;
  }
  function Do(e) {
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
  var tv = ql && 'documentMode' in document && 11 >= document.documentMode,
    pn = null,
    zo = null,
    xi = null,
    Ho = !1;
  function Lm(e, t, a) {
    var n = a.window === a ? a.document : a.nodeType === 9 ? a : a.ownerDocument;
    Ho ||
      pn == null ||
      pn !== Cs(n) ||
      ((n = pn),
      'selectionStart' in n && Do(n)
        ? (n = { start: n.selectionStart, end: n.selectionEnd })
        : ((n = ((n.ownerDocument && n.ownerDocument.defaultView) || window).getSelection()),
          (n = {
            anchorNode: n.anchorNode,
            anchorOffset: n.anchorOffset,
            focusNode: n.focusNode,
            focusOffset: n.focusOffset,
          })),
      (xi && bi(xi, n)) ||
        ((xi = n),
        (n = wr(zo, 'onSelect')),
        0 < n.length &&
          ((t = new Is('onSelect', 'select', null, t, a)),
          e.push({ event: t, listeners: n }),
          (t.target = pn))));
  }
  function Oa(e, t) {
    var a = {};
    return (
      (a[e.toLowerCase()] = t.toLowerCase()),
      (a['Webkit' + e] = 'webkit' + t),
      (a['Moz' + e] = 'moz' + t),
      a
    );
  }
  var hn = {
      animationend: Oa('Animation', 'AnimationEnd'),
      animationiteration: Oa('Animation', 'AnimationIteration'),
      animationstart: Oa('Animation', 'AnimationStart'),
      transitionrun: Oa('Transition', 'TransitionRun'),
      transitionstart: Oa('Transition', 'TransitionStart'),
      transitioncancel: Oa('Transition', 'TransitionCancel'),
      transitionend: Oa('Transition', 'TransitionEnd'),
    },
    Uo = {},
    Bm = {};
  ql &&
    ((Bm = document.createElement('div').style),
    'AnimationEvent' in window ||
      (delete hn.animationend.animation,
      delete hn.animationiteration.animation,
      delete hn.animationstart.animation),
    'TransitionEvent' in window || delete hn.transitionend.transition);
  function Ma(e) {
    if (Uo[e]) return Uo[e];
    if (!hn[e]) return e;
    var t = hn[e],
      a;
    for (a in t) if (t.hasOwnProperty(a) && a in Bm) return (Uo[e] = t[a]);
    return e;
  }
  var qm = Ma('animationend'),
    Im = Ma('animationiteration'),
    Om = Ma('animationstart'),
    lv = Ma('transitionrun'),
    av = Ma('transitionstart'),
    nv = Ma('transitioncancel'),
    Mm = Ma('transitionend'),
    Rm = new Map(),
    $o =
      'abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel'.split(
        ' '
      );
  $o.push('scrollEnd');
  function ml(e, t) {
    (Rm.set(e, t), qa(t, [e]));
  }
  var Rs =
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
    Wt = [],
    gn = 0,
    Go = 0;
  function Ds() {
    for (var e = gn, t = (Go = gn = 0); t < e; ) {
      var a = Wt[t];
      Wt[t++] = null;
      var n = Wt[t];
      Wt[t++] = null;
      var o = Wt[t];
      Wt[t++] = null;
      var c = Wt[t];
      if (((Wt[t++] = null), n !== null && o !== null)) {
        var f = n.pending;
        (f === null ? (o.next = o) : ((o.next = f.next), (f.next = o)), (n.pending = o));
      }
      c !== 0 && Dm(a, o, c);
    }
  }
  function zs(e, t, a, n) {
    ((Wt[gn++] = e),
      (Wt[gn++] = t),
      (Wt[gn++] = a),
      (Wt[gn++] = n),
      (Go |= n),
      (e.lanes |= n),
      (e = e.alternate),
      e !== null && (e.lanes |= n));
  }
  function Yo(e, t, a, n) {
    return (zs(e, t, a, n), Hs(e));
  }
  function Ra(e, t) {
    return (zs(e, null, null, t), Hs(e));
  }
  function Dm(e, t, a) {
    e.lanes |= a;
    var n = e.alternate;
    n !== null && (n.lanes |= a);
    for (var o = !1, c = e.return; c !== null; )
      ((c.childLanes |= a),
        (n = c.alternate),
        n !== null && (n.childLanes |= a),
        c.tag === 22 && ((e = c.stateNode), e === null || e._visibility & 1 || (o = !0)),
        (e = c),
        (c = c.return));
    return e.tag === 3
      ? ((c = e.stateNode),
        o &&
          t !== null &&
          ((o = 31 - Et(a)),
          (e = c.hiddenUpdates),
          (n = e[o]),
          n === null ? (e[o] = [t]) : n.push(t),
          (t.lane = a | 536870912)),
        c)
      : null;
  }
  function Hs(e) {
    if (50 < Yi) throw ((Yi = 0), (Wc = null), Error(s(185)));
    for (var t = e.return; t !== null; ) ((e = t), (t = e.return));
    return e.tag === 3 ? e.stateNode : null;
  }
  var kn = {};
  function iv(e, t, a, n) {
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
  function Ut(e, t, a, n) {
    return new iv(e, t, a, n);
  }
  function Vo(e) {
    return ((e = e.prototype), !(!e || !e.isReactComponent));
  }
  function Il(e, t) {
    var a = e.alternate;
    return (
      a === null
        ? ((a = Ut(e.tag, t, e.key, e.mode)),
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
  function zm(e, t) {
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
  function Us(e, t, a, n, o, c) {
    var f = 0;
    if (((n = e), typeof e == 'function')) Vo(e) && (f = 1);
    else if (typeof e == 'string')
      f = uy(e, a, J.current) ? 26 : e === 'html' || e === 'head' || e === 'body' ? 27 : 5;
    else
      e: switch (e) {
        case X:
          return ((e = Ut(31, a, t, o)), (e.elementType = X), (e.lanes = c), e);
        case I:
          return Da(a.children, o, c, t);
        case M:
          ((f = 8), (o |= 24));
          break;
        case w:
          return ((e = Ut(12, a, t, o | 2)), (e.elementType = w), (e.lanes = c), e);
        case te:
          return ((e = Ut(13, a, t, o)), (e.elementType = te), (e.lanes = c), e);
        case K:
          return ((e = Ut(19, a, t, o)), (e.elementType = K), (e.lanes = c), e);
        default:
          if (typeof e == 'object' && e !== null)
            switch (e.$$typeof) {
              case V:
                f = 10;
                break e;
              case j:
                f = 9;
                break e;
              case $:
                f = 11;
                break e;
              case S:
                f = 14;
                break e;
              case q:
                ((f = 16), (n = null));
                break e;
            }
          ((f = 29), (a = Error(s(130, e === null ? 'null' : typeof e, ''))), (n = null));
      }
    return ((t = Ut(f, a, t, o)), (t.elementType = e), (t.type = n), (t.lanes = c), t);
  }
  function Da(e, t, a, n) {
    return ((e = Ut(7, e, n, t)), (e.lanes = a), e);
  }
  function Xo(e, t, a) {
    return ((e = Ut(6, e, null, t)), (e.lanes = a), e);
  }
  function Hm(e) {
    var t = Ut(18, null, null, 0);
    return ((t.stateNode = e), t);
  }
  function Qo(e, t, a) {
    return (
      (t = Ut(4, e.children !== null ? e.children : [], e.key, t)),
      (t.lanes = a),
      (t.stateNode = {
        containerInfo: e.containerInfo,
        pendingChildren: null,
        implementation: e.implementation,
      }),
      t
    );
  }
  var Um = new WeakMap();
  function el(e, t) {
    if (typeof e == 'object' && e !== null) {
      var a = Um.get(e);
      return a !== void 0 ? a : ((t = { value: e, source: t, stack: Ss(t) }), Um.set(e, t), t);
    }
    return { value: e, source: t, stack: Ss(t) };
  }
  var vn = [],
    yn = 0,
    $s = null,
    Si = 0,
    tl = [],
    ll = 0,
    sa = null,
    Sl = 1,
    wl = '';
  function Ol(e, t) {
    ((vn[yn++] = Si), (vn[yn++] = $s), ($s = e), (Si = t));
  }
  function $m(e, t, a) {
    ((tl[ll++] = Sl), (tl[ll++] = wl), (tl[ll++] = sa), (sa = e));
    var n = Sl;
    e = wl;
    var o = 32 - Et(n) - 1;
    ((n &= ~(1 << o)), (a += 1));
    var c = 32 - Et(t) + o;
    if (30 < c) {
      var f = o - (o % 5);
      ((c = (n & ((1 << f) - 1)).toString(32)),
        (n >>= f),
        (o -= f),
        (Sl = (1 << (32 - Et(t) + o)) | (a << o) | n),
        (wl = c + e));
    } else ((Sl = (1 << c) | (a << o) | n), (wl = e));
  }
  function Ko(e) {
    e.return !== null && (Ol(e, 1), $m(e, 1, 0));
  }
  function Zo(e) {
    for (; e === $s; ) (($s = vn[--yn]), (vn[yn] = null), (Si = vn[--yn]), (vn[yn] = null));
    for (; e === sa; )
      ((sa = tl[--ll]),
        (tl[ll] = null),
        (wl = tl[--ll]),
        (tl[ll] = null),
        (Sl = tl[--ll]),
        (tl[ll] = null));
  }
  function Gm(e, t) {
    ((tl[ll++] = Sl), (tl[ll++] = wl), (tl[ll++] = sa), (Sl = t.id), (wl = t.overflow), (sa = e));
  }
  var yt = null,
    Fe = null,
    qe = !1,
    ra = null,
    al = !1,
    Jo = Error(s(519));
  function oa(e) {
    var t = Error(
      s(418, 1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? 'text' : 'HTML', '')
    );
    throw (wi(el(t, e)), Jo);
  }
  function Ym(e) {
    var t = e.stateNode,
      a = e.type,
      n = e.memoizedProps;
    switch (((t[vt] = e), (t[qt] = n), a)) {
      case 'dialog':
        (Ae('cancel', t), Ae('close', t));
        break;
      case 'iframe':
      case 'object':
      case 'embed':
        Ae('load', t);
        break;
      case 'video':
      case 'audio':
        for (a = 0; a < Xi.length; a++) Ae(Xi[a], t);
        break;
      case 'source':
        Ae('error', t);
        break;
      case 'img':
      case 'image':
      case 'link':
        (Ae('error', t), Ae('load', t));
        break;
      case 'details':
        Ae('toggle', t);
        break;
      case 'input':
        (Ae('invalid', t),
          am(t, n.value, n.defaultValue, n.checked, n.defaultChecked, n.type, n.name, !0));
        break;
      case 'select':
        Ae('invalid', t);
        break;
      case 'textarea':
        (Ae('invalid', t), im(t, n.value, n.defaultValue, n.children));
    }
    ((a = n.children),
      (typeof a != 'string' && typeof a != 'number' && typeof a != 'bigint') ||
      t.textContent === '' + a ||
      n.suppressHydrationWarning === !0 ||
      op(t.textContent, a)
        ? (n.popover != null && (Ae('beforetoggle', t), Ae('toggle', t)),
          n.onScroll != null && Ae('scroll', t),
          n.onScrollEnd != null && Ae('scrollend', t),
          n.onClick != null && (t.onclick = Bl),
          (t = !0))
        : (t = !1),
      t || oa(e, !0));
  }
  function Vm(e) {
    for (yt = e.return; yt; )
      switch (yt.tag) {
        case 5:
        case 31:
        case 13:
          al = !1;
          return;
        case 27:
        case 3:
          al = !0;
          return;
        default:
          yt = yt.return;
      }
  }
  function bn(e) {
    if (e !== yt) return !1;
    if (!qe) return (Vm(e), (qe = !0), !1);
    var t = e.tag,
      a;
    if (
      ((a = t !== 3 && t !== 27) &&
        ((a = t === 5) &&
          ((a = e.type), (a = !(a !== 'form' && a !== 'button') || fu(e.type, e.memoizedProps))),
        (a = !a)),
      a && Fe && oa(e),
      Vm(e),
      t === 13)
    ) {
      if (((e = e.memoizedState), (e = e !== null ? e.dehydrated : null), !e)) throw Error(s(317));
      Fe = gp(e);
    } else if (t === 31) {
      if (((e = e.memoizedState), (e = e !== null ? e.dehydrated : null), !e)) throw Error(s(317));
      Fe = gp(e);
    } else
      t === 27
        ? ((t = Fe), xa(e.type) ? ((e = vu), (vu = null), (Fe = e)) : (Fe = t))
        : (Fe = yt ? il(e.stateNode.nextSibling) : null);
    return !0;
  }
  function za() {
    ((Fe = yt = null), (qe = !1));
  }
  function Po() {
    var e = ra;
    return (e !== null && (Dt === null ? (Dt = e) : Dt.push.apply(Dt, e), (ra = null)), e);
  }
  function wi(e) {
    ra === null ? (ra = [e]) : ra.push(e);
  }
  var Fo = y(null),
    Ha = null,
    Ml = null;
  function ca(e, t, a) {
    (L(Fo, t._currentValue), (t._currentValue = a));
  }
  function Rl(e) {
    ((e._currentValue = Fo.current), B(Fo));
  }
  function Wo(e, t, a) {
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
  function ec(e, t, a, n) {
    var o = e.child;
    for (o !== null && (o.return = e); o !== null; ) {
      var c = o.dependencies;
      if (c !== null) {
        var f = o.child;
        c = c.firstContext;
        e: for (; c !== null; ) {
          var v = c;
          c = o;
          for (var T = 0; T < t.length; T++)
            if (v.context === t[T]) {
              ((c.lanes |= a),
                (v = c.alternate),
                v !== null && (v.lanes |= a),
                Wo(c.return, a, e),
                n || (f = null));
              break e;
            }
          c = v.next;
        }
      } else if (o.tag === 18) {
        if (((f = o.return), f === null)) throw Error(s(341));
        ((f.lanes |= a), (c = f.alternate), c !== null && (c.lanes |= a), Wo(f, a, e), (f = null));
      } else f = o.child;
      if (f !== null) f.return = o;
      else
        for (f = o; f !== null; ) {
          if (f === e) {
            f = null;
            break;
          }
          if (((o = f.sibling), o !== null)) {
            ((o.return = f.return), (f = o));
            break;
          }
          f = f.return;
        }
      o = f;
    }
  }
  function xn(e, t, a, n) {
    e = null;
    for (var o = t, c = !1; o !== null; ) {
      if (!c) {
        if ((o.flags & 524288) !== 0) c = !0;
        else if ((o.flags & 262144) !== 0) break;
      }
      if (o.tag === 10) {
        var f = o.alternate;
        if (f === null) throw Error(s(387));
        if (((f = f.memoizedProps), f !== null)) {
          var v = o.type;
          Ht(o.pendingProps.value, f.value) || (e !== null ? e.push(v) : (e = [v]));
        }
      } else if (o === ye.current) {
        if (((f = o.alternate), f === null)) throw Error(s(387));
        f.memoizedState.memoizedState !== o.memoizedState.memoizedState &&
          (e !== null ? e.push(Pi) : (e = [Pi]));
      }
      o = o.return;
    }
    (e !== null && ec(t, e, a, n), (t.flags |= 262144));
  }
  function Gs(e) {
    for (e = e.firstContext; e !== null; ) {
      if (!Ht(e.context._currentValue, e.memoizedValue)) return !0;
      e = e.next;
    }
    return !1;
  }
  function Ua(e) {
    ((Ha = e), (Ml = null), (e = e.dependencies), e !== null && (e.firstContext = null));
  }
  function bt(e) {
    return Xm(Ha, e);
  }
  function Ys(e, t) {
    return (Ha === null && Ua(e), Xm(e, t));
  }
  function Xm(e, t) {
    var a = t._currentValue;
    if (((t = { context: t, memoizedValue: a, next: null }), Ml === null)) {
      if (e === null) throw Error(s(308));
      ((Ml = t), (e.dependencies = { lanes: 0, firstContext: t }), (e.flags |= 524288));
    } else Ml = Ml.next = t;
    return a;
  }
  var sv =
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
    rv = l.unstable_scheduleCallback,
    ov = l.unstable_NormalPriority,
    ct = {
      $$typeof: V,
      Consumer: null,
      Provider: null,
      _currentValue: null,
      _currentValue2: null,
      _threadCount: 0,
    };
  function tc() {
    return { controller: new sv(), data: new Map(), refCount: 0 };
  }
  function Ti(e) {
    (e.refCount--,
      e.refCount === 0 &&
        rv(ov, function () {
          e.controller.abort();
        }));
  }
  var Ni = null,
    lc = 0,
    Sn = 0,
    wn = null;
  function cv(e, t) {
    if (Ni === null) {
      var a = (Ni = []);
      ((lc = 0),
        (Sn = iu()),
        (wn = {
          status: 'pending',
          value: void 0,
          then: function (n) {
            a.push(n);
          },
        }));
    }
    return (lc++, t.then(Qm, Qm), t);
  }
  function Qm() {
    if (--lc === 0 && Ni !== null) {
      wn !== null && (wn.status = 'fulfilled');
      var e = Ni;
      ((Ni = null), (Sn = 0), (wn = null));
      for (var t = 0; t < e.length; t++) (0, e[t])();
    }
  }
  function uv(e, t) {
    var a = [],
      n = {
        status: 'pending',
        value: null,
        reason: null,
        then: function (o) {
          a.push(o);
        },
      };
    return (
      e.then(
        function () {
          ((n.status = 'fulfilled'), (n.value = t));
          for (var o = 0; o < a.length; o++) (0, a[o])(t);
        },
        function (o) {
          for (n.status = 'rejected', n.reason = o, o = 0; o < a.length; o++) (0, a[o])(void 0);
        }
      ),
      n
    );
  }
  var Km = R.S;
  R.S = function (e, t) {
    ((Bf = Nt()),
      typeof t == 'object' && t !== null && typeof t.then == 'function' && cv(e, t),
      Km !== null && Km(e, t));
  };
  var $a = y(null);
  function ac() {
    var e = $a.current;
    return e !== null ? e : Qe.pooledCache;
  }
  function Vs(e, t) {
    t === null ? L($a, $a.current) : L($a, t.pool);
  }
  function Zm() {
    var e = ac();
    return e === null ? null : { parent: ct._currentValue, pool: e };
  }
  var Tn = Error(s(460)),
    nc = Error(s(474)),
    Xs = Error(s(542)),
    Qs = { then: function () {} };
  function Jm(e) {
    return ((e = e.status), e === 'fulfilled' || e === 'rejected');
  }
  function Pm(e, t, a) {
    switch (
      ((a = e[a]), a === void 0 ? e.push(t) : a !== t && (t.then(Bl, Bl), (t = a)), t.status)
    ) {
      case 'fulfilled':
        return t.value;
      case 'rejected':
        throw ((e = t.reason), Wm(e), e);
      default:
        if (typeof t.status == 'string') t.then(Bl, Bl);
        else {
          if (((e = Qe), e !== null && 100 < e.shellSuspendCounter)) throw Error(s(482));
          ((e = t),
            (e.status = 'pending'),
            e.then(
              function (n) {
                if (t.status === 'pending') {
                  var o = t;
                  ((o.status = 'fulfilled'), (o.value = n));
                }
              },
              function (n) {
                if (t.status === 'pending') {
                  var o = t;
                  ((o.status = 'rejected'), (o.reason = n));
                }
              }
            ));
        }
        switch (t.status) {
          case 'fulfilled':
            return t.value;
          case 'rejected':
            throw ((e = t.reason), Wm(e), e);
        }
        throw ((Ya = t), Tn);
    }
  }
  function Ga(e) {
    try {
      var t = e._init;
      return t(e._payload);
    } catch (a) {
      throw a !== null && typeof a == 'object' && typeof a.then == 'function' ? ((Ya = a), Tn) : a;
    }
  }
  var Ya = null;
  function Fm() {
    if (Ya === null) throw Error(s(459));
    var e = Ya;
    return ((Ya = null), e);
  }
  function Wm(e) {
    if (e === Tn || e === Xs) throw Error(s(483));
  }
  var Nn = null,
    ji = 0;
  function Ks(e) {
    var t = ji;
    return ((ji += 1), Nn === null && (Nn = []), Pm(Nn, e, t));
  }
  function Ei(e, t) {
    ((t = t.props.ref), (e.ref = t !== void 0 ? t : null));
  }
  function Zs(e, t) {
    throw t.$$typeof === A
      ? Error(s(525))
      : ((e = Object.prototype.toString.call(t)),
        Error(
          s(
            31,
            e === '[object Object]' ? 'object with keys {' + Object.keys(t).join(', ') + '}' : e
          )
        ));
  }
  function e_(e) {
    function t(O, E) {
      if (e) {
        var H = O.deletions;
        H === null ? ((O.deletions = [E]), (O.flags |= 16)) : H.push(E);
      }
    }
    function a(O, E) {
      if (!e) return null;
      for (; E !== null; ) (t(O, E), (E = E.sibling));
      return null;
    }
    function n(O) {
      for (var E = new Map(); O !== null; )
        (O.key !== null ? E.set(O.key, O) : E.set(O.index, O), (O = O.sibling));
      return E;
    }
    function o(O, E) {
      return ((O = Il(O, E)), (O.index = 0), (O.sibling = null), O);
    }
    function c(O, E, H) {
      return (
        (O.index = H),
        e
          ? ((H = O.alternate),
            H !== null
              ? ((H = H.index), H < E ? ((O.flags |= 67108866), E) : H)
              : ((O.flags |= 67108866), E))
          : ((O.flags |= 1048576), E)
      );
    }
    function f(O) {
      return (e && O.alternate === null && (O.flags |= 67108866), O);
    }
    function v(O, E, H, P) {
      return E === null || E.tag !== 6
        ? ((E = Xo(H, O.mode, P)), (E.return = O), E)
        : ((E = o(E, H)), (E.return = O), E);
    }
    function T(O, E, H, P) {
      var ve = H.type;
      return ve === I
        ? Q(O, E, H.props.children, P, H.key)
        : E !== null &&
            (E.elementType === ve ||
              (typeof ve == 'object' && ve !== null && ve.$$typeof === q && Ga(ve) === E.type))
          ? ((E = o(E, H.props)), Ei(E, H), (E.return = O), E)
          : ((E = Us(H.type, H.key, H.props, null, O.mode, P)), Ei(E, H), (E.return = O), E);
    }
    function U(O, E, H, P) {
      return E === null ||
        E.tag !== 4 ||
        E.stateNode.containerInfo !== H.containerInfo ||
        E.stateNode.implementation !== H.implementation
        ? ((E = Qo(H, O.mode, P)), (E.return = O), E)
        : ((E = o(E, H.children || [])), (E.return = O), E);
    }
    function Q(O, E, H, P, ve) {
      return E === null || E.tag !== 7
        ? ((E = Da(H, O.mode, P, ve)), (E.return = O), E)
        : ((E = o(E, H)), (E.return = O), E);
    }
    function W(O, E, H) {
      if ((typeof E == 'string' && E !== '') || typeof E == 'number' || typeof E == 'bigint')
        return ((E = Xo('' + E, O.mode, H)), (E.return = O), E);
      if (typeof E == 'object' && E !== null) {
        switch (E.$$typeof) {
          case C:
            return ((H = Us(E.type, E.key, E.props, null, O.mode, H)), Ei(H, E), (H.return = O), H);
          case z:
            return ((E = Qo(E, O.mode, H)), (E.return = O), E);
          case q:
            return ((E = Ga(E)), W(O, E, H));
        }
        if (D(E) || ie(E)) return ((E = Da(E, O.mode, H, null)), (E.return = O), E);
        if (typeof E.then == 'function') return W(O, Ks(E), H);
        if (E.$$typeof === V) return W(O, Ys(O, E), H);
        Zs(O, E);
      }
      return null;
    }
    function G(O, E, H, P) {
      var ve = E !== null ? E.key : null;
      if ((typeof H == 'string' && H !== '') || typeof H == 'number' || typeof H == 'bigint')
        return ve !== null ? null : v(O, E, '' + H, P);
      if (typeof H == 'object' && H !== null) {
        switch (H.$$typeof) {
          case C:
            return H.key === ve ? T(O, E, H, P) : null;
          case z:
            return H.key === ve ? U(O, E, H, P) : null;
          case q:
            return ((H = Ga(H)), G(O, E, H, P));
        }
        if (D(H) || ie(H)) return ve !== null ? null : Q(O, E, H, P, null);
        if (typeof H.then == 'function') return G(O, E, Ks(H), P);
        if (H.$$typeof === V) return G(O, E, Ys(O, H), P);
        Zs(O, H);
      }
      return null;
    }
    function Y(O, E, H, P, ve) {
      if ((typeof P == 'string' && P !== '') || typeof P == 'number' || typeof P == 'bigint')
        return ((O = O.get(H) || null), v(E, O, '' + P, ve));
      if (typeof P == 'object' && P !== null) {
        switch (P.$$typeof) {
          case C:
            return ((O = O.get(P.key === null ? H : P.key) || null), T(E, O, P, ve));
          case z:
            return ((O = O.get(P.key === null ? H : P.key) || null), U(E, O, P, ve));
          case q:
            return ((P = Ga(P)), Y(O, E, H, P, ve));
        }
        if (D(P) || ie(P)) return ((O = O.get(H) || null), Q(E, O, P, ve, null));
        if (typeof P.then == 'function') return Y(O, E, H, Ks(P), ve);
        if (P.$$typeof === V) return Y(O, E, H, Ys(E, P), ve);
        Zs(E, P);
      }
      return null;
    }
    function fe(O, E, H, P) {
      for (
        var ve = null, Me = null, he = E, je = (E = 0), Be = null;
        he !== null && je < H.length;
        je++
      ) {
        he.index > je ? ((Be = he), (he = null)) : (Be = he.sibling);
        var Re = G(O, he, H[je], P);
        if (Re === null) {
          he === null && (he = Be);
          break;
        }
        (e && he && Re.alternate === null && t(O, he),
          (E = c(Re, E, je)),
          Me === null ? (ve = Re) : (Me.sibling = Re),
          (Me = Re),
          (he = Be));
      }
      if (je === H.length) return (a(O, he), qe && Ol(O, je), ve);
      if (he === null) {
        for (; je < H.length; je++)
          ((he = W(O, H[je], P)),
            he !== null &&
              ((E = c(he, E, je)), Me === null ? (ve = he) : (Me.sibling = he), (Me = he)));
        return (qe && Ol(O, je), ve);
      }
      for (he = n(he); je < H.length; je++)
        ((Be = Y(he, O, je, H[je], P)),
          Be !== null &&
            (e && Be.alternate !== null && he.delete(Be.key === null ? je : Be.key),
            (E = c(Be, E, je)),
            Me === null ? (ve = Be) : (Me.sibling = Be),
            (Me = Be)));
      return (
        e &&
          he.forEach(function (ja) {
            return t(O, ja);
          }),
        qe && Ol(O, je),
        ve
      );
    }
    function xe(O, E, H, P) {
      if (H == null) throw Error(s(151));
      for (
        var ve = null, Me = null, he = E, je = (E = 0), Be = null, Re = H.next();
        he !== null && !Re.done;
        je++, Re = H.next()
      ) {
        he.index > je ? ((Be = he), (he = null)) : (Be = he.sibling);
        var ja = G(O, he, Re.value, P);
        if (ja === null) {
          he === null && (he = Be);
          break;
        }
        (e && he && ja.alternate === null && t(O, he),
          (E = c(ja, E, je)),
          Me === null ? (ve = ja) : (Me.sibling = ja),
          (Me = ja),
          (he = Be));
      }
      if (Re.done) return (a(O, he), qe && Ol(O, je), ve);
      if (he === null) {
        for (; !Re.done; je++, Re = H.next())
          ((Re = W(O, Re.value, P)),
            Re !== null &&
              ((E = c(Re, E, je)), Me === null ? (ve = Re) : (Me.sibling = Re), (Me = Re)));
        return (qe && Ol(O, je), ve);
      }
      for (he = n(he); !Re.done; je++, Re = H.next())
        ((Re = Y(he, O, je, Re.value, P)),
          Re !== null &&
            (e && Re.alternate !== null && he.delete(Re.key === null ? je : Re.key),
            (E = c(Re, E, je)),
            Me === null ? (ve = Re) : (Me.sibling = Re),
            (Me = Re)));
      return (
        e &&
          he.forEach(function (by) {
            return t(O, by);
          }),
        qe && Ol(O, je),
        ve
      );
    }
    function Ye(O, E, H, P) {
      if (
        (typeof H == 'object' &&
          H !== null &&
          H.type === I &&
          H.key === null &&
          (H = H.props.children),
        typeof H == 'object' && H !== null)
      ) {
        switch (H.$$typeof) {
          case C:
            e: {
              for (var ve = H.key; E !== null; ) {
                if (E.key === ve) {
                  if (((ve = H.type), ve === I)) {
                    if (E.tag === 7) {
                      (a(O, E.sibling), (P = o(E, H.props.children)), (P.return = O), (O = P));
                      break e;
                    }
                  } else if (
                    E.elementType === ve ||
                    (typeof ve == 'object' && ve !== null && ve.$$typeof === q && Ga(ve) === E.type)
                  ) {
                    (a(O, E.sibling), (P = o(E, H.props)), Ei(P, H), (P.return = O), (O = P));
                    break e;
                  }
                  a(O, E);
                  break;
                } else t(O, E);
                E = E.sibling;
              }
              H.type === I
                ? ((P = Da(H.props.children, O.mode, P, H.key)), (P.return = O), (O = P))
                : ((P = Us(H.type, H.key, H.props, null, O.mode, P)),
                  Ei(P, H),
                  (P.return = O),
                  (O = P));
            }
            return f(O);
          case z:
            e: {
              for (ve = H.key; E !== null; ) {
                if (E.key === ve)
                  if (
                    E.tag === 4 &&
                    E.stateNode.containerInfo === H.containerInfo &&
                    E.stateNode.implementation === H.implementation
                  ) {
                    (a(O, E.sibling), (P = o(E, H.children || [])), (P.return = O), (O = P));
                    break e;
                  } else {
                    a(O, E);
                    break;
                  }
                else t(O, E);
                E = E.sibling;
              }
              ((P = Qo(H, O.mode, P)), (P.return = O), (O = P));
            }
            return f(O);
          case q:
            return ((H = Ga(H)), Ye(O, E, H, P));
        }
        if (D(H)) return fe(O, E, H, P);
        if (ie(H)) {
          if (((ve = ie(H)), typeof ve != 'function')) throw Error(s(150));
          return ((H = ve.call(H)), xe(O, E, H, P));
        }
        if (typeof H.then == 'function') return Ye(O, E, Ks(H), P);
        if (H.$$typeof === V) return Ye(O, E, Ys(O, H), P);
        Zs(O, H);
      }
      return (typeof H == 'string' && H !== '') || typeof H == 'number' || typeof H == 'bigint'
        ? ((H = '' + H),
          E !== null && E.tag === 6
            ? (a(O, E.sibling), (P = o(E, H)), (P.return = O), (O = P))
            : (a(O, E), (P = Xo(H, O.mode, P)), (P.return = O), (O = P)),
          f(O))
        : a(O, E);
    }
    return function (O, E, H, P) {
      try {
        ji = 0;
        var ve = Ye(O, E, H, P);
        return ((Nn = null), ve);
      } catch (he) {
        if (he === Tn || he === Xs) throw he;
        var Me = Ut(29, he, null, O.mode);
        return ((Me.lanes = P), (Me.return = O), Me);
      } finally {
      }
    };
  }
  var Va = e_(!0),
    t_ = e_(!1),
    ua = !1;
  function ic(e) {
    e.updateQueue = {
      baseState: e.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null,
    };
  }
  function sc(e, t) {
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
  function da(e) {
    return { lane: e, tag: 0, payload: null, callback: null, next: null };
  }
  function ma(e, t, a) {
    var n = e.updateQueue;
    if (n === null) return null;
    if (((n = n.shared), (De & 2) !== 0)) {
      var o = n.pending;
      return (
        o === null ? (t.next = t) : ((t.next = o.next), (o.next = t)),
        (n.pending = t),
        (t = Hs(e)),
        Dm(e, null, a),
        t
      );
    }
    return (zs(e, n, t, a), Hs(e));
  }
  function Ci(e, t, a) {
    if (((t = t.updateQueue), t !== null && ((t = t.shared), (a & 4194048) !== 0))) {
      var n = t.lanes;
      ((n &= e.pendingLanes), (a |= n), (t.lanes = a), Xd(e, a));
    }
  }
  function rc(e, t) {
    var a = e.updateQueue,
      n = e.alternate;
    if (n !== null && ((n = n.updateQueue), a === n)) {
      var o = null,
        c = null;
      if (((a = a.firstBaseUpdate), a !== null)) {
        do {
          var f = { lane: a.lane, tag: a.tag, payload: a.payload, callback: null, next: null };
          (c === null ? (o = c = f) : (c = c.next = f), (a = a.next));
        } while (a !== null);
        c === null ? (o = c = t) : (c = c.next = t);
      } else o = c = t;
      ((a = {
        baseState: n.baseState,
        firstBaseUpdate: o,
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
  var oc = !1;
  function Ai() {
    if (oc) {
      var e = wn;
      if (e !== null) throw e;
    }
  }
  function Li(e, t, a, n) {
    oc = !1;
    var o = e.updateQueue;
    ua = !1;
    var c = o.firstBaseUpdate,
      f = o.lastBaseUpdate,
      v = o.shared.pending;
    if (v !== null) {
      o.shared.pending = null;
      var T = v,
        U = T.next;
      ((T.next = null), f === null ? (c = U) : (f.next = U), (f = T));
      var Q = e.alternate;
      Q !== null &&
        ((Q = Q.updateQueue),
        (v = Q.lastBaseUpdate),
        v !== f && (v === null ? (Q.firstBaseUpdate = U) : (v.next = U), (Q.lastBaseUpdate = T)));
    }
    if (c !== null) {
      var W = o.baseState;
      ((f = 0), (Q = U = T = null), (v = c));
      do {
        var G = v.lane & -536870913,
          Y = G !== v.lane;
        if (Y ? (Le & G) === G : (n & G) === G) {
          (G !== 0 && G === Sn && (oc = !0),
            Q !== null &&
              (Q = Q.next =
                { lane: 0, tag: v.tag, payload: v.payload, callback: null, next: null }));
          e: {
            var fe = e,
              xe = v;
            G = t;
            var Ye = a;
            switch (xe.tag) {
              case 1:
                if (((fe = xe.payload), typeof fe == 'function')) {
                  W = fe.call(Ye, W, G);
                  break e;
                }
                W = fe;
                break e;
              case 3:
                fe.flags = (fe.flags & -65537) | 128;
              case 0:
                if (
                  ((fe = xe.payload),
                  (G = typeof fe == 'function' ? fe.call(Ye, W, G) : fe),
                  G == null)
                )
                  break e;
                W = k({}, W, G);
                break e;
              case 2:
                ua = !0;
            }
          }
          ((G = v.callback),
            G !== null &&
              ((e.flags |= 64),
              Y && (e.flags |= 8192),
              (Y = o.callbacks),
              Y === null ? (o.callbacks = [G]) : Y.push(G)));
        } else
          ((Y = { lane: G, tag: v.tag, payload: v.payload, callback: v.callback, next: null }),
            Q === null ? ((U = Q = Y), (T = W)) : (Q = Q.next = Y),
            (f |= G));
        if (((v = v.next), v === null)) {
          if (((v = o.shared.pending), v === null)) break;
          ((Y = v),
            (v = Y.next),
            (Y.next = null),
            (o.lastBaseUpdate = Y),
            (o.shared.pending = null));
        }
      } while (!0);
      (Q === null && (T = W),
        (o.baseState = T),
        (o.firstBaseUpdate = U),
        (o.lastBaseUpdate = Q),
        c === null && (o.shared.lanes = 0),
        (ga |= f),
        (e.lanes = f),
        (e.memoizedState = W));
    }
  }
  function l_(e, t) {
    if (typeof e != 'function') throw Error(s(191, e));
    e.call(t);
  }
  function a_(e, t) {
    var a = e.callbacks;
    if (a !== null) for (e.callbacks = null, e = 0; e < a.length; e++) l_(a[e], t);
  }
  var jn = y(null),
    Js = y(0);
  function n_(e, t) {
    ((e = Xl), L(Js, e), L(jn, t), (Xl = e | t.baseLanes));
  }
  function cc() {
    (L(Js, Xl), L(jn, jn.current));
  }
  function uc() {
    ((Xl = Js.current), B(jn), B(Js));
  }
  var $t = y(null),
    nl = null;
  function _a(e) {
    var t = e.alternate;
    (L(rt, rt.current & 1),
      L($t, e),
      nl === null && (t === null || jn.current !== null || t.memoizedState !== null) && (nl = e));
  }
  function dc(e) {
    (L(rt, rt.current), L($t, e), nl === null && (nl = e));
  }
  function i_(e) {
    e.tag === 22 ? (L(rt, rt.current), L($t, e), nl === null && (nl = e)) : fa();
  }
  function fa() {
    (L(rt, rt.current), L($t, $t.current));
  }
  function Gt(e) {
    (B($t), nl === e && (nl = null), B(rt));
  }
  var rt = y(0);
  function Ps(e) {
    for (var t = e; t !== null; ) {
      if (t.tag === 13) {
        var a = t.memoizedState;
        if (a !== null && ((a = a.dehydrated), a === null || gu(a) || ku(a))) return t;
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
  var Dl = 0,
    Ne = null,
    $e = null,
    ut = null,
    Fs = !1,
    En = !1,
    Xa = !1,
    Ws = 0,
    Bi = 0,
    Cn = null,
    dv = 0;
  function nt() {
    throw Error(s(321));
  }
  function mc(e, t) {
    if (t === null) return !1;
    for (var a = 0; a < t.length && a < e.length; a++) if (!Ht(e[a], t[a])) return !1;
    return !0;
  }
  function _c(e, t, a, n, o, c) {
    return (
      (Dl = c),
      (Ne = t),
      (t.memoizedState = null),
      (t.updateQueue = null),
      (t.lanes = 0),
      (R.H = e === null || e.memoizedState === null ? $_ : Ec),
      (Xa = !1),
      (c = a(n, o)),
      (Xa = !1),
      En && (c = r_(t, a, n, o)),
      s_(e),
      c
    );
  }
  function s_(e) {
    R.H = Oi;
    var t = $e !== null && $e.next !== null;
    if (((Dl = 0), (ut = $e = Ne = null), (Fs = !1), (Bi = 0), (Cn = null), t)) throw Error(s(300));
    e === null || dt || ((e = e.dependencies), e !== null && Gs(e) && (dt = !0));
  }
  function r_(e, t, a, n) {
    Ne = e;
    var o = 0;
    do {
      if ((En && (Cn = null), (Bi = 0), (En = !1), 25 <= o)) throw Error(s(301));
      if (((o += 1), (ut = $e = null), e.updateQueue != null)) {
        var c = e.updateQueue;
        ((c.lastEffect = null),
          (c.events = null),
          (c.stores = null),
          c.memoCache != null && (c.memoCache.index = 0));
      }
      ((R.H = G_), (c = t(a, n)));
    } while (En);
    return c;
  }
  function mv() {
    var e = R.H,
      t = e.useState()[0];
    return (
      (t = typeof t.then == 'function' ? qi(t) : t),
      (e = e.useState()[0]),
      ($e !== null ? $e.memoizedState : null) !== e && (Ne.flags |= 1024),
      t
    );
  }
  function fc() {
    var e = Ws !== 0;
    return ((Ws = 0), e);
  }
  function pc(e, t, a) {
    ((t.updateQueue = e.updateQueue), (t.flags &= -2053), (e.lanes &= ~a));
  }
  function hc(e) {
    if (Fs) {
      for (e = e.memoizedState; e !== null; ) {
        var t = e.queue;
        (t !== null && (t.pending = null), (e = e.next));
      }
      Fs = !1;
    }
    ((Dl = 0), (ut = $e = Ne = null), (En = !1), (Bi = Ws = 0), (Cn = null));
  }
  function At() {
    var e = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
    return (ut === null ? (Ne.memoizedState = ut = e) : (ut = ut.next = e), ut);
  }
  function ot() {
    if ($e === null) {
      var e = Ne.alternate;
      e = e !== null ? e.memoizedState : null;
    } else e = $e.next;
    var t = ut === null ? Ne.memoizedState : ut.next;
    if (t !== null) ((ut = t), ($e = e));
    else {
      if (e === null) throw Ne.alternate === null ? Error(s(467)) : Error(s(310));
      (($e = e),
        (e = {
          memoizedState: $e.memoizedState,
          baseState: $e.baseState,
          baseQueue: $e.baseQueue,
          queue: $e.queue,
          next: null,
        }),
        ut === null ? (Ne.memoizedState = ut = e) : (ut = ut.next = e));
    }
    return ut;
  }
  function er() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function qi(e) {
    var t = Bi;
    return (
      (Bi += 1),
      Cn === null && (Cn = []),
      (e = Pm(Cn, e, t)),
      (t = Ne),
      (ut === null ? t.memoizedState : ut.next) === null &&
        ((t = t.alternate), (R.H = t === null || t.memoizedState === null ? $_ : Ec)),
      e
    );
  }
  function tr(e) {
    if (e !== null && typeof e == 'object') {
      if (typeof e.then == 'function') return qi(e);
      if (e.$$typeof === V) return bt(e);
    }
    throw Error(s(438, String(e)));
  }
  function gc(e) {
    var t = null,
      a = Ne.updateQueue;
    if ((a !== null && (t = a.memoCache), t == null)) {
      var n = Ne.alternate;
      n !== null &&
        ((n = n.updateQueue),
        n !== null &&
          ((n = n.memoCache),
          n != null &&
            (t = {
              data: n.data.map(function (o) {
                return o.slice();
              }),
              index: 0,
            })));
    }
    if (
      (t == null && (t = { data: [], index: 0 }),
      a === null && ((a = er()), (Ne.updateQueue = a)),
      (a.memoCache = t),
      (a = t.data[t.index]),
      a === void 0)
    )
      for (a = t.data[t.index] = Array(e), n = 0; n < e; n++) a[n] = ne;
    return (t.index++, a);
  }
  function zl(e, t) {
    return typeof t == 'function' ? t(e) : t;
  }
  function lr(e) {
    var t = ot();
    return kc(t, $e, e);
  }
  function kc(e, t, a) {
    var n = e.queue;
    if (n === null) throw Error(s(311));
    n.lastRenderedReducer = a;
    var o = e.baseQueue,
      c = n.pending;
    if (c !== null) {
      if (o !== null) {
        var f = o.next;
        ((o.next = c.next), (c.next = f));
      }
      ((t.baseQueue = o = c), (n.pending = null));
    }
    if (((c = e.baseState), o === null)) e.memoizedState = c;
    else {
      t = o.next;
      var v = (f = null),
        T = null,
        U = t,
        Q = !1;
      do {
        var W = U.lane & -536870913;
        if (W !== U.lane ? (Le & W) === W : (Dl & W) === W) {
          var G = U.revertLane;
          if (G === 0)
            (T !== null &&
              (T = T.next =
                {
                  lane: 0,
                  revertLane: 0,
                  gesture: null,
                  action: U.action,
                  hasEagerState: U.hasEagerState,
                  eagerState: U.eagerState,
                  next: null,
                }),
              W === Sn && (Q = !0));
          else if ((Dl & G) === G) {
            ((U = U.next), G === Sn && (Q = !0));
            continue;
          } else
            ((W = {
              lane: 0,
              revertLane: U.revertLane,
              gesture: null,
              action: U.action,
              hasEagerState: U.hasEagerState,
              eagerState: U.eagerState,
              next: null,
            }),
              T === null ? ((v = T = W), (f = c)) : (T = T.next = W),
              (Ne.lanes |= G),
              (ga |= G));
          ((W = U.action), Xa && a(c, W), (c = U.hasEagerState ? U.eagerState : a(c, W)));
        } else
          ((G = {
            lane: W,
            revertLane: U.revertLane,
            gesture: U.gesture,
            action: U.action,
            hasEagerState: U.hasEagerState,
            eagerState: U.eagerState,
            next: null,
          }),
            T === null ? ((v = T = G), (f = c)) : (T = T.next = G),
            (Ne.lanes |= W),
            (ga |= W));
        U = U.next;
      } while (U !== null && U !== t);
      if (
        (T === null ? (f = c) : (T.next = v),
        !Ht(c, e.memoizedState) && ((dt = !0), Q && ((a = wn), a !== null)))
      )
        throw a;
      ((e.memoizedState = c), (e.baseState = f), (e.baseQueue = T), (n.lastRenderedState = c));
    }
    return (o === null && (n.lanes = 0), [e.memoizedState, n.dispatch]);
  }
  function vc(e) {
    var t = ot(),
      a = t.queue;
    if (a === null) throw Error(s(311));
    a.lastRenderedReducer = e;
    var n = a.dispatch,
      o = a.pending,
      c = t.memoizedState;
    if (o !== null) {
      a.pending = null;
      var f = (o = o.next);
      do ((c = e(c, f.action)), (f = f.next));
      while (f !== o);
      (Ht(c, t.memoizedState) || (dt = !0),
        (t.memoizedState = c),
        t.baseQueue === null && (t.baseState = c),
        (a.lastRenderedState = c));
    }
    return [c, n];
  }
  function o_(e, t, a) {
    var n = Ne,
      o = ot(),
      c = qe;
    if (c) {
      if (a === void 0) throw Error(s(407));
      a = a();
    } else a = t();
    var f = !Ht(($e || o).memoizedState, a);
    if (
      (f && ((o.memoizedState = a), (dt = !0)),
      (o = o.queue),
      xc(d_.bind(null, n, o, e), [e]),
      o.getSnapshot !== t || f || (ut !== null && ut.memoizedState.tag & 1))
    ) {
      if (
        ((n.flags |= 2048),
        An(9, { destroy: void 0 }, u_.bind(null, n, o, a, t), null),
        Qe === null)
      )
        throw Error(s(349));
      c || (Dl & 127) !== 0 || c_(n, t, a);
    }
    return a;
  }
  function c_(e, t, a) {
    ((e.flags |= 16384),
      (e = { getSnapshot: t, value: a }),
      (t = Ne.updateQueue),
      t === null
        ? ((t = er()), (Ne.updateQueue = t), (t.stores = [e]))
        : ((a = t.stores), a === null ? (t.stores = [e]) : a.push(e)));
  }
  function u_(e, t, a, n) {
    ((t.value = a), (t.getSnapshot = n), m_(t) && __(e));
  }
  function d_(e, t, a) {
    return a(function () {
      m_(t) && __(e);
    });
  }
  function m_(e) {
    var t = e.getSnapshot;
    e = e.value;
    try {
      var a = t();
      return !Ht(e, a);
    } catch {
      return !0;
    }
  }
  function __(e) {
    var t = Ra(e, 2);
    t !== null && zt(t, e, 2);
  }
  function yc(e) {
    var t = At();
    if (typeof e == 'function') {
      var a = e;
      if (((e = a()), Xa)) {
        dl(!0);
        try {
          a();
        } finally {
          dl(!1);
        }
      }
    }
    return (
      (t.memoizedState = t.baseState = e),
      (t.queue = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: zl,
        lastRenderedState: e,
      }),
      t
    );
  }
  function f_(e, t, a, n) {
    return ((e.baseState = a), kc(e, $e, typeof n == 'function' ? n : zl));
  }
  function _v(e, t, a, n, o) {
    if (ir(e)) throw Error(s(485));
    if (((e = t.action), e !== null)) {
      var c = {
        payload: o,
        action: e,
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
      (R.T !== null ? a(!0) : (c.isTransition = !1),
        n(c),
        (a = t.pending),
        a === null
          ? ((c.next = t.pending = c), p_(t, c))
          : ((c.next = a.next), (t.pending = a.next = c)));
    }
  }
  function p_(e, t) {
    var a = t.action,
      n = t.payload,
      o = e.state;
    if (t.isTransition) {
      var c = R.T,
        f = {};
      R.T = f;
      try {
        var v = a(o, n),
          T = R.S;
        (T !== null && T(f, v), h_(e, t, v));
      } catch (U) {
        bc(e, t, U);
      } finally {
        (c !== null && f.types !== null && (c.types = f.types), (R.T = c));
      }
    } else
      try {
        ((c = a(o, n)), h_(e, t, c));
      } catch (U) {
        bc(e, t, U);
      }
  }
  function h_(e, t, a) {
    a !== null && typeof a == 'object' && typeof a.then == 'function'
      ? a.then(
          function (n) {
            g_(e, t, n);
          },
          function (n) {
            return bc(e, t, n);
          }
        )
      : g_(e, t, a);
  }
  function g_(e, t, a) {
    ((t.status = 'fulfilled'),
      (t.value = a),
      k_(t),
      (e.state = a),
      (t = e.pending),
      t !== null &&
        ((a = t.next), a === t ? (e.pending = null) : ((a = a.next), (t.next = a), p_(e, a))));
  }
  function bc(e, t, a) {
    var n = e.pending;
    if (((e.pending = null), n !== null)) {
      n = n.next;
      do ((t.status = 'rejected'), (t.reason = a), k_(t), (t = t.next));
      while (t !== n);
    }
    e.action = null;
  }
  function k_(e) {
    e = e.listeners;
    for (var t = 0; t < e.length; t++) (0, e[t])();
  }
  function v_(e, t) {
    return t;
  }
  function y_(e, t) {
    if (qe) {
      var a = Qe.formState;
      if (a !== null) {
        e: {
          var n = Ne;
          if (qe) {
            if (Fe) {
              t: {
                for (var o = Fe, c = al; o.nodeType !== 8; ) {
                  if (!c) {
                    o = null;
                    break t;
                  }
                  if (((o = il(o.nextSibling)), o === null)) {
                    o = null;
                    break t;
                  }
                }
                ((c = o.data), (o = c === 'F!' || c === 'F' ? o : null));
              }
              if (o) {
                ((Fe = il(o.nextSibling)), (n = o.data === 'F!'));
                break e;
              }
            }
            oa(n);
          }
          n = !1;
        }
        n && (t = a[0]);
      }
    }
    return (
      (a = At()),
      (a.memoizedState = a.baseState = t),
      (n = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: v_,
        lastRenderedState: t,
      }),
      (a.queue = n),
      (a = z_.bind(null, Ne, n)),
      (n.dispatch = a),
      (n = yc(!1)),
      (c = jc.bind(null, Ne, !1, n.queue)),
      (n = At()),
      (o = { state: t, dispatch: null, action: e, pending: null }),
      (n.queue = o),
      (a = _v.bind(null, Ne, o, c, a)),
      (o.dispatch = a),
      (n.memoizedState = e),
      [t, a, !1]
    );
  }
  function b_(e) {
    var t = ot();
    return x_(t, $e, e);
  }
  function x_(e, t, a) {
    if (
      ((t = kc(e, t, v_)[0]),
      (e = lr(zl)[0]),
      typeof t == 'object' && t !== null && typeof t.then == 'function')
    )
      try {
        var n = qi(t);
      } catch (f) {
        throw f === Tn ? Xs : f;
      }
    else n = t;
    t = ot();
    var o = t.queue,
      c = o.dispatch;
    return (
      a !== t.memoizedState &&
        ((Ne.flags |= 2048), An(9, { destroy: void 0 }, fv.bind(null, o, a), null)),
      [n, c, e]
    );
  }
  function fv(e, t) {
    e.action = t;
  }
  function S_(e) {
    var t = ot(),
      a = $e;
    if (a !== null) return x_(t, a, e);
    (ot(), (t = t.memoizedState), (a = ot()));
    var n = a.queue.dispatch;
    return ((a.memoizedState = e), [t, n, !1]);
  }
  function An(e, t, a, n) {
    return (
      (e = { tag: e, create: a, deps: n, inst: t, next: null }),
      (t = Ne.updateQueue),
      t === null && ((t = er()), (Ne.updateQueue = t)),
      (a = t.lastEffect),
      a === null
        ? (t.lastEffect = e.next = e)
        : ((n = a.next), (a.next = e), (e.next = n), (t.lastEffect = e)),
      e
    );
  }
  function w_() {
    return ot().memoizedState;
  }
  function ar(e, t, a, n) {
    var o = At();
    ((Ne.flags |= e),
      (o.memoizedState = An(1 | t, { destroy: void 0 }, a, n === void 0 ? null : n)));
  }
  function nr(e, t, a, n) {
    var o = ot();
    n = n === void 0 ? null : n;
    var c = o.memoizedState.inst;
    $e !== null && n !== null && mc(n, $e.memoizedState.deps)
      ? (o.memoizedState = An(t, c, a, n))
      : ((Ne.flags |= e), (o.memoizedState = An(1 | t, c, a, n)));
  }
  function T_(e, t) {
    ar(8390656, 8, e, t);
  }
  function xc(e, t) {
    nr(2048, 8, e, t);
  }
  function pv(e) {
    Ne.flags |= 4;
    var t = Ne.updateQueue;
    if (t === null) ((t = er()), (Ne.updateQueue = t), (t.events = [e]));
    else {
      var a = t.events;
      a === null ? (t.events = [e]) : a.push(e);
    }
  }
  function N_(e) {
    var t = ot().memoizedState;
    return (
      pv({ ref: t, nextImpl: e }),
      function () {
        if ((De & 2) !== 0) throw Error(s(440));
        return t.impl.apply(void 0, arguments);
      }
    );
  }
  function j_(e, t) {
    return nr(4, 2, e, t);
  }
  function E_(e, t) {
    return nr(4, 4, e, t);
  }
  function C_(e, t) {
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
  function A_(e, t, a) {
    ((a = a != null ? a.concat([e]) : null), nr(4, 4, C_.bind(null, t, e), a));
  }
  function Sc() {}
  function L_(e, t) {
    var a = ot();
    t = t === void 0 ? null : t;
    var n = a.memoizedState;
    return t !== null && mc(t, n[1]) ? n[0] : ((a.memoizedState = [e, t]), e);
  }
  function B_(e, t) {
    var a = ot();
    t = t === void 0 ? null : t;
    var n = a.memoizedState;
    if (t !== null && mc(t, n[1])) return n[0];
    if (((n = e()), Xa)) {
      dl(!0);
      try {
        e();
      } finally {
        dl(!1);
      }
    }
    return ((a.memoizedState = [n, t]), n);
  }
  function wc(e, t, a) {
    return a === void 0 || ((Dl & 1073741824) !== 0 && (Le & 261930) === 0)
      ? (e.memoizedState = t)
      : ((e.memoizedState = a), (e = If()), (Ne.lanes |= e), (ga |= e), a);
  }
  function q_(e, t, a, n) {
    return Ht(a, t)
      ? a
      : jn.current !== null
        ? ((e = wc(e, a, n)), Ht(e, t) || (dt = !0), e)
        : (Dl & 42) === 0 || ((Dl & 1073741824) !== 0 && (Le & 261930) === 0)
          ? ((dt = !0), (e.memoizedState = a))
          : ((e = If()), (Ne.lanes |= e), (ga |= e), t);
  }
  function I_(e, t, a, n, o) {
    var c = ee.p;
    ee.p = c !== 0 && 8 > c ? c : 8;
    var f = R.T,
      v = {};
    ((R.T = v), jc(e, !1, t, a));
    try {
      var T = o(),
        U = R.S;
      if (
        (U !== null && U(v, T), T !== null && typeof T == 'object' && typeof T.then == 'function')
      ) {
        var Q = uv(T, n);
        Ii(e, t, Q, Xt(e));
      } else Ii(e, t, n, Xt(e));
    } catch (W) {
      Ii(e, t, { then: function () {}, status: 'rejected', reason: W }, Xt());
    } finally {
      ((ee.p = c), f !== null && v.types !== null && (f.types = v.types), (R.T = f));
    }
  }
  function hv() {}
  function Tc(e, t, a, n) {
    if (e.tag !== 5) throw Error(s(476));
    var o = O_(e).queue;
    I_(
      e,
      o,
      t,
      oe,
      a === null
        ? hv
        : function () {
            return (M_(e), a(n));
          }
    );
  }
  function O_(e) {
    var t = e.memoizedState;
    if (t !== null) return t;
    t = {
      memoizedState: oe,
      baseState: oe,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: zl,
        lastRenderedState: oe,
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
          lastRenderedReducer: zl,
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
  function M_(e) {
    var t = O_(e);
    (t.next === null && (t = e.alternate.memoizedState), Ii(e, t.next.queue, {}, Xt()));
  }
  function Nc() {
    return bt(Pi);
  }
  function R_() {
    return ot().memoizedState;
  }
  function D_() {
    return ot().memoizedState;
  }
  function gv(e) {
    for (var t = e.return; t !== null; ) {
      switch (t.tag) {
        case 24:
        case 3:
          var a = Xt();
          e = da(a);
          var n = ma(t, e, a);
          (n !== null && (zt(n, t, a), Ci(n, t, a)), (t = { cache: tc() }), (e.payload = t));
          return;
      }
      t = t.return;
    }
  }
  function kv(e, t, a) {
    var n = Xt();
    ((a = {
      lane: n,
      revertLane: 0,
      gesture: null,
      action: a,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    }),
      ir(e) ? H_(t, a) : ((a = Yo(e, t, a, n)), a !== null && (zt(a, e, n), U_(a, t, n))));
  }
  function z_(e, t, a) {
    var n = Xt();
    Ii(e, t, a, n);
  }
  function Ii(e, t, a, n) {
    var o = {
      lane: n,
      revertLane: 0,
      gesture: null,
      action: a,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    };
    if (ir(e)) H_(t, o);
    else {
      var c = e.alternate;
      if (
        e.lanes === 0 &&
        (c === null || c.lanes === 0) &&
        ((c = t.lastRenderedReducer), c !== null)
      )
        try {
          var f = t.lastRenderedState,
            v = c(f, a);
          if (((o.hasEagerState = !0), (o.eagerState = v), Ht(v, f)))
            return (zs(e, t, o, 0), Qe === null && Ds(), !1);
        } catch {
        } finally {
        }
      if (((a = Yo(e, t, o, n)), a !== null)) return (zt(a, e, n), U_(a, t, n), !0);
    }
    return !1;
  }
  function jc(e, t, a, n) {
    if (
      ((n = {
        lane: 2,
        revertLane: iu(),
        gesture: null,
        action: n,
        hasEagerState: !1,
        eagerState: null,
        next: null,
      }),
      ir(e))
    ) {
      if (t) throw Error(s(479));
    } else ((t = Yo(e, a, n, 2)), t !== null && zt(t, e, 2));
  }
  function ir(e) {
    var t = e.alternate;
    return e === Ne || (t !== null && t === Ne);
  }
  function H_(e, t) {
    En = Fs = !0;
    var a = e.pending;
    (a === null ? (t.next = t) : ((t.next = a.next), (a.next = t)), (e.pending = t));
  }
  function U_(e, t, a) {
    if ((a & 4194048) !== 0) {
      var n = t.lanes;
      ((n &= e.pendingLanes), (a |= n), (t.lanes = a), Xd(e, a));
    }
  }
  var Oi = {
    readContext: bt,
    use: tr,
    useCallback: nt,
    useContext: nt,
    useEffect: nt,
    useImperativeHandle: nt,
    useLayoutEffect: nt,
    useInsertionEffect: nt,
    useMemo: nt,
    useReducer: nt,
    useRef: nt,
    useState: nt,
    useDebugValue: nt,
    useDeferredValue: nt,
    useTransition: nt,
    useSyncExternalStore: nt,
    useId: nt,
    useHostTransitionStatus: nt,
    useFormState: nt,
    useActionState: nt,
    useOptimistic: nt,
    useMemoCache: nt,
    useCacheRefresh: nt,
  };
  Oi.useEffectEvent = nt;
  var $_ = {
      readContext: bt,
      use: tr,
      useCallback: function (e, t) {
        return ((At().memoizedState = [e, t === void 0 ? null : t]), e);
      },
      useContext: bt,
      useEffect: T_,
      useImperativeHandle: function (e, t, a) {
        ((a = a != null ? a.concat([e]) : null), ar(4194308, 4, C_.bind(null, t, e), a));
      },
      useLayoutEffect: function (e, t) {
        return ar(4194308, 4, e, t);
      },
      useInsertionEffect: function (e, t) {
        ar(4, 2, e, t);
      },
      useMemo: function (e, t) {
        var a = At();
        t = t === void 0 ? null : t;
        var n = e();
        if (Xa) {
          dl(!0);
          try {
            e();
          } finally {
            dl(!1);
          }
        }
        return ((a.memoizedState = [n, t]), n);
      },
      useReducer: function (e, t, a) {
        var n = At();
        if (a !== void 0) {
          var o = a(t);
          if (Xa) {
            dl(!0);
            try {
              a(t);
            } finally {
              dl(!1);
            }
          }
        } else o = t;
        return (
          (n.memoizedState = n.baseState = o),
          (e = {
            pending: null,
            lanes: 0,
            dispatch: null,
            lastRenderedReducer: e,
            lastRenderedState: o,
          }),
          (n.queue = e),
          (e = e.dispatch = kv.bind(null, Ne, e)),
          [n.memoizedState, e]
        );
      },
      useRef: function (e) {
        var t = At();
        return ((e = { current: e }), (t.memoizedState = e));
      },
      useState: function (e) {
        e = yc(e);
        var t = e.queue,
          a = z_.bind(null, Ne, t);
        return ((t.dispatch = a), [e.memoizedState, a]);
      },
      useDebugValue: Sc,
      useDeferredValue: function (e, t) {
        var a = At();
        return wc(a, e, t);
      },
      useTransition: function () {
        var e = yc(!1);
        return ((e = I_.bind(null, Ne, e.queue, !0, !1)), (At().memoizedState = e), [!1, e]);
      },
      useSyncExternalStore: function (e, t, a) {
        var n = Ne,
          o = At();
        if (qe) {
          if (a === void 0) throw Error(s(407));
          a = a();
        } else {
          if (((a = t()), Qe === null)) throw Error(s(349));
          (Le & 127) !== 0 || c_(n, t, a);
        }
        o.memoizedState = a;
        var c = { value: a, getSnapshot: t };
        return (
          (o.queue = c),
          T_(d_.bind(null, n, c, e), [e]),
          (n.flags |= 2048),
          An(9, { destroy: void 0 }, u_.bind(null, n, c, a, t), null),
          a
        );
      },
      useId: function () {
        var e = At(),
          t = Qe.identifierPrefix;
        if (qe) {
          var a = wl,
            n = Sl;
          ((a = (n & ~(1 << (32 - Et(n) - 1))).toString(32) + a),
            (t = '_' + t + 'R_' + a),
            (a = Ws++),
            0 < a && (t += 'H' + a.toString(32)),
            (t += '_'));
        } else ((a = dv++), (t = '_' + t + 'r_' + a.toString(32) + '_'));
        return (e.memoizedState = t);
      },
      useHostTransitionStatus: Nc,
      useFormState: y_,
      useActionState: y_,
      useOptimistic: function (e) {
        var t = At();
        t.memoizedState = t.baseState = e;
        var a = {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: null,
          lastRenderedState: null,
        };
        return ((t.queue = a), (t = jc.bind(null, Ne, !0, a)), (a.dispatch = t), [e, t]);
      },
      useMemoCache: gc,
      useCacheRefresh: function () {
        return (At().memoizedState = gv.bind(null, Ne));
      },
      useEffectEvent: function (e) {
        var t = At(),
          a = { impl: e };
        return (
          (t.memoizedState = a),
          function () {
            if ((De & 2) !== 0) throw Error(s(440));
            return a.impl.apply(void 0, arguments);
          }
        );
      },
    },
    Ec = {
      readContext: bt,
      use: tr,
      useCallback: L_,
      useContext: bt,
      useEffect: xc,
      useImperativeHandle: A_,
      useInsertionEffect: j_,
      useLayoutEffect: E_,
      useMemo: B_,
      useReducer: lr,
      useRef: w_,
      useState: function () {
        return lr(zl);
      },
      useDebugValue: Sc,
      useDeferredValue: function (e, t) {
        var a = ot();
        return q_(a, $e.memoizedState, e, t);
      },
      useTransition: function () {
        var e = lr(zl)[0],
          t = ot().memoizedState;
        return [typeof e == 'boolean' ? e : qi(e), t];
      },
      useSyncExternalStore: o_,
      useId: R_,
      useHostTransitionStatus: Nc,
      useFormState: b_,
      useActionState: b_,
      useOptimistic: function (e, t) {
        var a = ot();
        return f_(a, $e, e, t);
      },
      useMemoCache: gc,
      useCacheRefresh: D_,
    };
  Ec.useEffectEvent = N_;
  var G_ = {
    readContext: bt,
    use: tr,
    useCallback: L_,
    useContext: bt,
    useEffect: xc,
    useImperativeHandle: A_,
    useInsertionEffect: j_,
    useLayoutEffect: E_,
    useMemo: B_,
    useReducer: vc,
    useRef: w_,
    useState: function () {
      return vc(zl);
    },
    useDebugValue: Sc,
    useDeferredValue: function (e, t) {
      var a = ot();
      return $e === null ? wc(a, e, t) : q_(a, $e.memoizedState, e, t);
    },
    useTransition: function () {
      var e = vc(zl)[0],
        t = ot().memoizedState;
      return [typeof e == 'boolean' ? e : qi(e), t];
    },
    useSyncExternalStore: o_,
    useId: R_,
    useHostTransitionStatus: Nc,
    useFormState: S_,
    useActionState: S_,
    useOptimistic: function (e, t) {
      var a = ot();
      return $e !== null ? f_(a, $e, e, t) : ((a.baseState = e), [e, a.queue.dispatch]);
    },
    useMemoCache: gc,
    useCacheRefresh: D_,
  };
  G_.useEffectEvent = N_;
  function Cc(e, t, a, n) {
    ((t = e.memoizedState),
      (a = a(n, t)),
      (a = a == null ? t : k({}, t, a)),
      (e.memoizedState = a),
      e.lanes === 0 && (e.updateQueue.baseState = a));
  }
  var Ac = {
    enqueueSetState: function (e, t, a) {
      e = e._reactInternals;
      var n = Xt(),
        o = da(n);
      ((o.payload = t),
        a != null && (o.callback = a),
        (t = ma(e, o, n)),
        t !== null && (zt(t, e, n), Ci(t, e, n)));
    },
    enqueueReplaceState: function (e, t, a) {
      e = e._reactInternals;
      var n = Xt(),
        o = da(n);
      ((o.tag = 1),
        (o.payload = t),
        a != null && (o.callback = a),
        (t = ma(e, o, n)),
        t !== null && (zt(t, e, n), Ci(t, e, n)));
    },
    enqueueForceUpdate: function (e, t) {
      e = e._reactInternals;
      var a = Xt(),
        n = da(a);
      ((n.tag = 2),
        t != null && (n.callback = t),
        (t = ma(e, n, a)),
        t !== null && (zt(t, e, a), Ci(t, e, a)));
    },
  };
  function Y_(e, t, a, n, o, c, f) {
    return (
      (e = e.stateNode),
      typeof e.shouldComponentUpdate == 'function'
        ? e.shouldComponentUpdate(n, c, f)
        : t.prototype && t.prototype.isPureReactComponent
          ? !bi(a, n) || !bi(o, c)
          : !0
    );
  }
  function V_(e, t, a, n) {
    ((e = t.state),
      typeof t.componentWillReceiveProps == 'function' && t.componentWillReceiveProps(a, n),
      typeof t.UNSAFE_componentWillReceiveProps == 'function' &&
        t.UNSAFE_componentWillReceiveProps(a, n),
      t.state !== e && Ac.enqueueReplaceState(t, t.state, null));
  }
  function Qa(e, t) {
    var a = t;
    if ('ref' in t) {
      a = {};
      for (var n in t) n !== 'ref' && (a[n] = t[n]);
    }
    if ((e = e.defaultProps)) {
      a === t && (a = k({}, a));
      for (var o in e) a[o] === void 0 && (a[o] = e[o]);
    }
    return a;
  }
  function X_(e) {
    Rs(e);
  }
  function Q_(e) {
    console.error(e);
  }
  function K_(e) {
    Rs(e);
  }
  function sr(e, t) {
    try {
      var a = e.onUncaughtError;
      a(t.value, { componentStack: t.stack });
    } catch (n) {
      setTimeout(function () {
        throw n;
      });
    }
  }
  function Z_(e, t, a) {
    try {
      var n = e.onCaughtError;
      n(a.value, { componentStack: a.stack, errorBoundary: t.tag === 1 ? t.stateNode : null });
    } catch (o) {
      setTimeout(function () {
        throw o;
      });
    }
  }
  function Lc(e, t, a) {
    return (
      (a = da(a)),
      (a.tag = 3),
      (a.payload = { element: null }),
      (a.callback = function () {
        sr(e, t);
      }),
      a
    );
  }
  function J_(e) {
    return ((e = da(e)), (e.tag = 3), e);
  }
  function P_(e, t, a, n) {
    var o = a.type.getDerivedStateFromError;
    if (typeof o == 'function') {
      var c = n.value;
      ((e.payload = function () {
        return o(c);
      }),
        (e.callback = function () {
          Z_(t, a, n);
        }));
    }
    var f = a.stateNode;
    f !== null &&
      typeof f.componentDidCatch == 'function' &&
      (e.callback = function () {
        (Z_(t, a, n),
          typeof o != 'function' && (ka === null ? (ka = new Set([this])) : ka.add(this)));
        var v = n.stack;
        this.componentDidCatch(n.value, { componentStack: v !== null ? v : '' });
      });
  }
  function vv(e, t, a, n, o) {
    if (((a.flags |= 32768), n !== null && typeof n == 'object' && typeof n.then == 'function')) {
      if (((t = a.alternate), t !== null && xn(t, a, o, !0), (a = $t.current), a !== null)) {
        switch (a.tag) {
          case 31:
          case 13:
            return (
              nl === null ? kr() : a.alternate === null && it === 0 && (it = 3),
              (a.flags &= -257),
              (a.flags |= 65536),
              (a.lanes = o),
              n === Qs
                ? (a.flags |= 16384)
                : ((t = a.updateQueue),
                  t === null ? (a.updateQueue = new Set([n])) : t.add(n),
                  lu(e, n, o)),
              !1
            );
          case 22:
            return (
              (a.flags |= 65536),
              n === Qs
                ? (a.flags |= 16384)
                : ((t = a.updateQueue),
                  t === null
                    ? ((t = { transitions: null, markerInstances: null, retryQueue: new Set([n]) }),
                      (a.updateQueue = t))
                    : ((a = t.retryQueue), a === null ? (t.retryQueue = new Set([n])) : a.add(n)),
                  lu(e, n, o)),
              !1
            );
        }
        throw Error(s(435, a.tag));
      }
      return (lu(e, n, o), kr(), !1);
    }
    if (qe)
      return (
        (t = $t.current),
        t !== null
          ? ((t.flags & 65536) === 0 && (t.flags |= 256),
            (t.flags |= 65536),
            (t.lanes = o),
            n !== Jo && ((e = Error(s(422), { cause: n })), wi(el(e, a))))
          : (n !== Jo && ((t = Error(s(423), { cause: n })), wi(el(t, a))),
            (e = e.current.alternate),
            (e.flags |= 65536),
            (o &= -o),
            (e.lanes |= o),
            (n = el(n, a)),
            (o = Lc(e.stateNode, n, o)),
            rc(e, o),
            it !== 4 && (it = 2)),
        !1
      );
    var c = Error(s(520), { cause: n });
    if (((c = el(c, a)), Gi === null ? (Gi = [c]) : Gi.push(c), it !== 4 && (it = 2), t === null))
      return !0;
    ((n = el(n, a)), (a = t));
    do {
      switch (a.tag) {
        case 3:
          return (
            (a.flags |= 65536),
            (e = o & -o),
            (a.lanes |= e),
            (e = Lc(a.stateNode, n, e)),
            rc(a, e),
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
                  (ka === null || !ka.has(c)))))
          )
            return (
              (a.flags |= 65536),
              (o &= -o),
              (a.lanes |= o),
              (o = J_(o)),
              P_(o, e, a, n),
              rc(a, o),
              !1
            );
      }
      a = a.return;
    } while (a !== null);
    return !1;
  }
  var Bc = Error(s(461)),
    dt = !1;
  function xt(e, t, a, n) {
    t.child = e === null ? t_(t, null, a, n) : Va(t, e.child, a, n);
  }
  function F_(e, t, a, n, o) {
    a = a.render;
    var c = t.ref;
    if ('ref' in n) {
      var f = {};
      for (var v in n) v !== 'ref' && (f[v] = n[v]);
    } else f = n;
    return (
      Ua(t),
      (n = _c(e, t, a, f, c, o)),
      (v = fc()),
      e !== null && !dt
        ? (pc(e, t, o), Hl(e, t, o))
        : (qe && v && Ko(t), (t.flags |= 1), xt(e, t, n, o), t.child)
    );
  }
  function W_(e, t, a, n, o) {
    if (e === null) {
      var c = a.type;
      return typeof c == 'function' && !Vo(c) && c.defaultProps === void 0 && a.compare === null
        ? ((t.tag = 15), (t.type = c), ef(e, t, c, n, o))
        : ((e = Us(a.type, null, n, t, t.mode, o)), (e.ref = t.ref), (e.return = t), (t.child = e));
    }
    if (((c = e.child), !Hc(e, o))) {
      var f = c.memoizedProps;
      if (((a = a.compare), (a = a !== null ? a : bi), a(f, n) && e.ref === t.ref))
        return Hl(e, t, o);
    }
    return ((t.flags |= 1), (e = Il(c, n)), (e.ref = t.ref), (e.return = t), (t.child = e));
  }
  function ef(e, t, a, n, o) {
    if (e !== null) {
      var c = e.memoizedProps;
      if (bi(c, n) && e.ref === t.ref)
        if (((dt = !1), (t.pendingProps = n = c), Hc(e, o))) (e.flags & 131072) !== 0 && (dt = !0);
        else return ((t.lanes = e.lanes), Hl(e, t, o));
    }
    return qc(e, t, a, n, o);
  }
  function tf(e, t, a, n) {
    var o = n.children,
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
          for (n = t.child = e.child, o = 0; n !== null; )
            ((o = o | n.lanes | n.childLanes), (n = n.sibling));
          n = o & ~c;
        } else ((n = 0), (t.child = null));
        return lf(e, t, c, a, n);
      }
      if ((a & 536870912) !== 0)
        ((t.memoizedState = { baseLanes: 0, cachePool: null }),
          e !== null && Vs(t, c !== null ? c.cachePool : null),
          c !== null ? n_(t, c) : cc(),
          i_(t));
      else return ((n = t.lanes = 536870912), lf(e, t, c !== null ? c.baseLanes | a : a, a, n));
    } else
      c !== null
        ? (Vs(t, c.cachePool), n_(t, c), fa(), (t.memoizedState = null))
        : (e !== null && Vs(t, null), cc(), fa());
    return (xt(e, t, o, a), t.child);
  }
  function Mi(e, t) {
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
  function lf(e, t, a, n, o) {
    var c = ac();
    return (
      (c = c === null ? null : { parent: ct._currentValue, pool: c }),
      (t.memoizedState = { baseLanes: a, cachePool: c }),
      e !== null && Vs(t, null),
      cc(),
      i_(t),
      e !== null && xn(e, t, n, !0),
      (t.childLanes = o),
      null
    );
  }
  function rr(e, t) {
    return (
      (t = cr({ mode: t.mode, children: t.children }, e.mode)),
      (t.ref = e.ref),
      (e.child = t),
      (t.return = e),
      t
    );
  }
  function af(e, t, a) {
    return (
      Va(t, e.child, null, a),
      (e = rr(t, t.pendingProps)),
      (e.flags |= 2),
      Gt(t),
      (t.memoizedState = null),
      e
    );
  }
  function yv(e, t, a) {
    var n = t.pendingProps,
      o = (t.flags & 128) !== 0;
    if (((t.flags &= -129), e === null)) {
      if (qe) {
        if (n.mode === 'hidden') return ((e = rr(t, n)), (t.lanes = 536870912), Mi(null, e));
        if (
          (dc(t),
          (e = Fe)
            ? ((e = hp(e, al)),
              (e = e !== null && e.data === '&' ? e : null),
              e !== null &&
                ((t.memoizedState = {
                  dehydrated: e,
                  treeContext: sa !== null ? { id: Sl, overflow: wl } : null,
                  retryLane: 536870912,
                  hydrationErrors: null,
                }),
                (a = Hm(e)),
                (a.return = t),
                (t.child = a),
                (yt = t),
                (Fe = null)))
            : (e = null),
          e === null)
        )
          throw oa(t);
        return ((t.lanes = 536870912), null);
      }
      return rr(t, n);
    }
    var c = e.memoizedState;
    if (c !== null) {
      var f = c.dehydrated;
      if ((dc(t), o))
        if (t.flags & 256) ((t.flags &= -257), (t = af(e, t, a)));
        else if (t.memoizedState !== null) ((t.child = e.child), (t.flags |= 128), (t = null));
        else throw Error(s(558));
      else if ((dt || xn(e, t, a, !1), (o = (a & e.childLanes) !== 0), dt || o)) {
        if (((n = Qe), n !== null && ((f = Qd(n, a)), f !== 0 && f !== c.retryLane)))
          throw ((c.retryLane = f), Ra(e, f), zt(n, e, f), Bc);
        (kr(), (t = af(e, t, a)));
      } else
        ((e = c.treeContext),
          (Fe = il(f.nextSibling)),
          (yt = t),
          (qe = !0),
          (ra = null),
          (al = !1),
          e !== null && Gm(t, e),
          (t = rr(t, n)),
          (t.flags |= 4096));
      return t;
    }
    return (
      (e = Il(e.child, { mode: n.mode, children: n.children })),
      (e.ref = t.ref),
      (t.child = e),
      (e.return = t),
      e
    );
  }
  function or(e, t) {
    var a = t.ref;
    if (a === null) e !== null && e.ref !== null && (t.flags |= 4194816);
    else {
      if (typeof a != 'function' && typeof a != 'object') throw Error(s(284));
      (e === null || e.ref !== a) && (t.flags |= 4194816);
    }
  }
  function qc(e, t, a, n, o) {
    return (
      Ua(t),
      (a = _c(e, t, a, n, void 0, o)),
      (n = fc()),
      e !== null && !dt
        ? (pc(e, t, o), Hl(e, t, o))
        : (qe && n && Ko(t), (t.flags |= 1), xt(e, t, a, o), t.child)
    );
  }
  function nf(e, t, a, n, o, c) {
    return (
      Ua(t),
      (t.updateQueue = null),
      (a = r_(t, n, a, o)),
      s_(e),
      (n = fc()),
      e !== null && !dt
        ? (pc(e, t, c), Hl(e, t, c))
        : (qe && n && Ko(t), (t.flags |= 1), xt(e, t, a, c), t.child)
    );
  }
  function sf(e, t, a, n, o) {
    if ((Ua(t), t.stateNode === null)) {
      var c = kn,
        f = a.contextType;
      (typeof f == 'object' && f !== null && (c = bt(f)),
        (c = new a(n, c)),
        (t.memoizedState = c.state !== null && c.state !== void 0 ? c.state : null),
        (c.updater = Ac),
        (t.stateNode = c),
        (c._reactInternals = t),
        (c = t.stateNode),
        (c.props = n),
        (c.state = t.memoizedState),
        (c.refs = {}),
        ic(t),
        (f = a.contextType),
        (c.context = typeof f == 'object' && f !== null ? bt(f) : kn),
        (c.state = t.memoizedState),
        (f = a.getDerivedStateFromProps),
        typeof f == 'function' && (Cc(t, a, f, n), (c.state = t.memoizedState)),
        typeof a.getDerivedStateFromProps == 'function' ||
          typeof c.getSnapshotBeforeUpdate == 'function' ||
          (typeof c.UNSAFE_componentWillMount != 'function' &&
            typeof c.componentWillMount != 'function') ||
          ((f = c.state),
          typeof c.componentWillMount == 'function' && c.componentWillMount(),
          typeof c.UNSAFE_componentWillMount == 'function' && c.UNSAFE_componentWillMount(),
          f !== c.state && Ac.enqueueReplaceState(c, c.state, null),
          Li(t, n, c, o),
          Ai(),
          (c.state = t.memoizedState)),
        typeof c.componentDidMount == 'function' && (t.flags |= 4194308),
        (n = !0));
    } else if (e === null) {
      c = t.stateNode;
      var v = t.memoizedProps,
        T = Qa(a, v);
      c.props = T;
      var U = c.context,
        Q = a.contextType;
      ((f = kn), typeof Q == 'object' && Q !== null && (f = bt(Q)));
      var W = a.getDerivedStateFromProps;
      ((Q = typeof W == 'function' || typeof c.getSnapshotBeforeUpdate == 'function'),
        (v = t.pendingProps !== v),
        Q ||
          (typeof c.UNSAFE_componentWillReceiveProps != 'function' &&
            typeof c.componentWillReceiveProps != 'function') ||
          ((v || U !== f) && V_(t, c, n, f)),
        (ua = !1));
      var G = t.memoizedState;
      ((c.state = G),
        Li(t, n, c, o),
        Ai(),
        (U = t.memoizedState),
        v || G !== U || ua
          ? (typeof W == 'function' && (Cc(t, a, W, n), (U = t.memoizedState)),
            (T = ua || Y_(t, a, T, n, G, U, f))
              ? (Q ||
                  (typeof c.UNSAFE_componentWillMount != 'function' &&
                    typeof c.componentWillMount != 'function') ||
                  (typeof c.componentWillMount == 'function' && c.componentWillMount(),
                  typeof c.UNSAFE_componentWillMount == 'function' &&
                    c.UNSAFE_componentWillMount()),
                typeof c.componentDidMount == 'function' && (t.flags |= 4194308))
              : (typeof c.componentDidMount == 'function' && (t.flags |= 4194308),
                (t.memoizedProps = n),
                (t.memoizedState = U)),
            (c.props = n),
            (c.state = U),
            (c.context = f),
            (n = T))
          : (typeof c.componentDidMount == 'function' && (t.flags |= 4194308), (n = !1)));
    } else {
      ((c = t.stateNode),
        sc(e, t),
        (f = t.memoizedProps),
        (Q = Qa(a, f)),
        (c.props = Q),
        (W = t.pendingProps),
        (G = c.context),
        (U = a.contextType),
        (T = kn),
        typeof U == 'object' && U !== null && (T = bt(U)),
        (v = a.getDerivedStateFromProps),
        (U = typeof v == 'function' || typeof c.getSnapshotBeforeUpdate == 'function') ||
          (typeof c.UNSAFE_componentWillReceiveProps != 'function' &&
            typeof c.componentWillReceiveProps != 'function') ||
          ((f !== W || G !== T) && V_(t, c, n, T)),
        (ua = !1),
        (G = t.memoizedState),
        (c.state = G),
        Li(t, n, c, o),
        Ai());
      var Y = t.memoizedState;
      f !== W || G !== Y || ua || (e !== null && e.dependencies !== null && Gs(e.dependencies))
        ? (typeof v == 'function' && (Cc(t, a, v, n), (Y = t.memoizedState)),
          (Q =
            ua ||
            Y_(t, a, Q, n, G, Y, T) ||
            (e !== null && e.dependencies !== null && Gs(e.dependencies)))
            ? (U ||
                (typeof c.UNSAFE_componentWillUpdate != 'function' &&
                  typeof c.componentWillUpdate != 'function') ||
                (typeof c.componentWillUpdate == 'function' && c.componentWillUpdate(n, Y, T),
                typeof c.UNSAFE_componentWillUpdate == 'function' &&
                  c.UNSAFE_componentWillUpdate(n, Y, T)),
              typeof c.componentDidUpdate == 'function' && (t.flags |= 4),
              typeof c.getSnapshotBeforeUpdate == 'function' && (t.flags |= 1024))
            : (typeof c.componentDidUpdate != 'function' ||
                (f === e.memoizedProps && G === e.memoizedState) ||
                (t.flags |= 4),
              typeof c.getSnapshotBeforeUpdate != 'function' ||
                (f === e.memoizedProps && G === e.memoizedState) ||
                (t.flags |= 1024),
              (t.memoizedProps = n),
              (t.memoizedState = Y)),
          (c.props = n),
          (c.state = Y),
          (c.context = T),
          (n = Q))
        : (typeof c.componentDidUpdate != 'function' ||
            (f === e.memoizedProps && G === e.memoizedState) ||
            (t.flags |= 4),
          typeof c.getSnapshotBeforeUpdate != 'function' ||
            (f === e.memoizedProps && G === e.memoizedState) ||
            (t.flags |= 1024),
          (n = !1));
    }
    return (
      (c = n),
      or(e, t),
      (n = (t.flags & 128) !== 0),
      c || n
        ? ((c = t.stateNode),
          (a = n && typeof a.getDerivedStateFromError != 'function' ? null : c.render()),
          (t.flags |= 1),
          e !== null && n
            ? ((t.child = Va(t, e.child, null, o)), (t.child = Va(t, null, a, o)))
            : xt(e, t, a, o),
          (t.memoizedState = c.state),
          (e = t.child))
        : (e = Hl(e, t, o)),
      e
    );
  }
  function rf(e, t, a, n) {
    return (za(), (t.flags |= 256), xt(e, t, a, n), t.child);
  }
  var Ic = { dehydrated: null, treeContext: null, retryLane: 0, hydrationErrors: null };
  function Oc(e) {
    return { baseLanes: e, cachePool: Zm() };
  }
  function Mc(e, t, a) {
    return ((e = e !== null ? e.childLanes & ~a : 0), t && (e |= Vt), e);
  }
  function of(e, t, a) {
    var n = t.pendingProps,
      o = !1,
      c = (t.flags & 128) !== 0,
      f;
    if (
      ((f = c) || (f = e !== null && e.memoizedState === null ? !1 : (rt.current & 2) !== 0),
      f && ((o = !0), (t.flags &= -129)),
      (f = (t.flags & 32) !== 0),
      (t.flags &= -33),
      e === null)
    ) {
      if (qe) {
        if (
          (o ? _a(t) : fa(),
          (e = Fe)
            ? ((e = hp(e, al)),
              (e = e !== null && e.data !== '&' ? e : null),
              e !== null &&
                ((t.memoizedState = {
                  dehydrated: e,
                  treeContext: sa !== null ? { id: Sl, overflow: wl } : null,
                  retryLane: 536870912,
                  hydrationErrors: null,
                }),
                (a = Hm(e)),
                (a.return = t),
                (t.child = a),
                (yt = t),
                (Fe = null)))
            : (e = null),
          e === null)
        )
          throw oa(t);
        return (ku(e) ? (t.lanes = 32) : (t.lanes = 536870912), null);
      }
      var v = n.children;
      return (
        (n = n.fallback),
        o
          ? (fa(),
            (o = t.mode),
            (v = cr({ mode: 'hidden', children: v }, o)),
            (n = Da(n, o, a, null)),
            (v.return = t),
            (n.return = t),
            (v.sibling = n),
            (t.child = v),
            (n = t.child),
            (n.memoizedState = Oc(a)),
            (n.childLanes = Mc(e, f, a)),
            (t.memoizedState = Ic),
            Mi(null, n))
          : (_a(t), Rc(t, v))
      );
    }
    var T = e.memoizedState;
    if (T !== null && ((v = T.dehydrated), v !== null)) {
      if (c)
        t.flags & 256
          ? (_a(t), (t.flags &= -257), (t = Dc(e, t, a)))
          : t.memoizedState !== null
            ? (fa(), (t.child = e.child), (t.flags |= 128), (t = null))
            : (fa(),
              (v = n.fallback),
              (o = t.mode),
              (n = cr({ mode: 'visible', children: n.children }, o)),
              (v = Da(v, o, a, null)),
              (v.flags |= 2),
              (n.return = t),
              (v.return = t),
              (n.sibling = v),
              (t.child = n),
              Va(t, e.child, null, a),
              (n = t.child),
              (n.memoizedState = Oc(a)),
              (n.childLanes = Mc(e, f, a)),
              (t.memoizedState = Ic),
              (t = Mi(null, n)));
      else if ((_a(t), ku(v))) {
        if (((f = v.nextSibling && v.nextSibling.dataset), f)) var U = f.dgst;
        ((f = U),
          (n = Error(s(419))),
          (n.stack = ''),
          (n.digest = f),
          wi({ value: n, source: null, stack: null }),
          (t = Dc(e, t, a)));
      } else if ((dt || xn(e, t, a, !1), (f = (a & e.childLanes) !== 0), dt || f)) {
        if (((f = Qe), f !== null && ((n = Qd(f, a)), n !== 0 && n !== T.retryLane)))
          throw ((T.retryLane = n), Ra(e, n), zt(f, e, n), Bc);
        (gu(v) || kr(), (t = Dc(e, t, a)));
      } else
        gu(v)
          ? ((t.flags |= 192), (t.child = e.child), (t = null))
          : ((e = T.treeContext),
            (Fe = il(v.nextSibling)),
            (yt = t),
            (qe = !0),
            (ra = null),
            (al = !1),
            e !== null && Gm(t, e),
            (t = Rc(t, n.children)),
            (t.flags |= 4096));
      return t;
    }
    return o
      ? (fa(),
        (v = n.fallback),
        (o = t.mode),
        (T = e.child),
        (U = T.sibling),
        (n = Il(T, { mode: 'hidden', children: n.children })),
        (n.subtreeFlags = T.subtreeFlags & 65011712),
        U !== null ? (v = Il(U, v)) : ((v = Da(v, o, a, null)), (v.flags |= 2)),
        (v.return = t),
        (n.return = t),
        (n.sibling = v),
        (t.child = n),
        Mi(null, n),
        (n = t.child),
        (v = e.child.memoizedState),
        v === null
          ? (v = Oc(a))
          : ((o = v.cachePool),
            o !== null
              ? ((T = ct._currentValue), (o = o.parent !== T ? { parent: T, pool: T } : o))
              : (o = Zm()),
            (v = { baseLanes: v.baseLanes | a, cachePool: o })),
        (n.memoizedState = v),
        (n.childLanes = Mc(e, f, a)),
        (t.memoizedState = Ic),
        Mi(e.child, n))
      : (_a(t),
        (a = e.child),
        (e = a.sibling),
        (a = Il(a, { mode: 'visible', children: n.children })),
        (a.return = t),
        (a.sibling = null),
        e !== null &&
          ((f = t.deletions), f === null ? ((t.deletions = [e]), (t.flags |= 16)) : f.push(e)),
        (t.child = a),
        (t.memoizedState = null),
        a);
  }
  function Rc(e, t) {
    return ((t = cr({ mode: 'visible', children: t }, e.mode)), (t.return = e), (e.child = t));
  }
  function cr(e, t) {
    return ((e = Ut(22, e, null, t)), (e.lanes = 0), e);
  }
  function Dc(e, t, a) {
    return (
      Va(t, e.child, null, a),
      (e = Rc(t, t.pendingProps.children)),
      (e.flags |= 2),
      (t.memoizedState = null),
      e
    );
  }
  function cf(e, t, a) {
    e.lanes |= t;
    var n = e.alternate;
    (n !== null && (n.lanes |= t), Wo(e.return, t, a));
  }
  function zc(e, t, a, n, o, c) {
    var f = e.memoizedState;
    f === null
      ? (e.memoizedState = {
          isBackwards: t,
          rendering: null,
          renderingStartTime: 0,
          last: n,
          tail: a,
          tailMode: o,
          treeForkCount: c,
        })
      : ((f.isBackwards = t),
        (f.rendering = null),
        (f.renderingStartTime = 0),
        (f.last = n),
        (f.tail = a),
        (f.tailMode = o),
        (f.treeForkCount = c));
  }
  function uf(e, t, a) {
    var n = t.pendingProps,
      o = n.revealOrder,
      c = n.tail;
    n = n.children;
    var f = rt.current,
      v = (f & 2) !== 0;
    if (
      (v ? ((f = (f & 1) | 2), (t.flags |= 128)) : (f &= 1),
      L(rt, f),
      xt(e, t, n, a),
      (n = qe ? Si : 0),
      !v && e !== null && (e.flags & 128) !== 0)
    )
      e: for (e = t.child; e !== null; ) {
        if (e.tag === 13) e.memoizedState !== null && cf(e, a, t);
        else if (e.tag === 19) cf(e, a, t);
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
    switch (o) {
      case 'forwards':
        for (a = t.child, o = null; a !== null; )
          ((e = a.alternate), e !== null && Ps(e) === null && (o = a), (a = a.sibling));
        ((a = o),
          a === null ? ((o = t.child), (t.child = null)) : ((o = a.sibling), (a.sibling = null)),
          zc(t, !1, o, a, c, n));
        break;
      case 'backwards':
      case 'unstable_legacy-backwards':
        for (a = null, o = t.child, t.child = null; o !== null; ) {
          if (((e = o.alternate), e !== null && Ps(e) === null)) {
            t.child = o;
            break;
          }
          ((e = o.sibling), (o.sibling = a), (a = o), (o = e));
        }
        zc(t, !0, a, null, c, n);
        break;
      case 'together':
        zc(t, !1, null, null, void 0, n);
        break;
      default:
        t.memoizedState = null;
    }
    return t.child;
  }
  function Hl(e, t, a) {
    if (
      (e !== null && (t.dependencies = e.dependencies), (ga |= t.lanes), (a & t.childLanes) === 0)
    )
      if (e !== null) {
        if ((xn(e, t, a, !1), (a & t.childLanes) === 0)) return null;
      } else return null;
    if (e !== null && t.child !== e.child) throw Error(s(153));
    if (t.child !== null) {
      for (e = t.child, a = Il(e, e.pendingProps), t.child = a, a.return = t; e.sibling !== null; )
        ((e = e.sibling), (a = a.sibling = Il(e, e.pendingProps)), (a.return = t));
      a.sibling = null;
    }
    return t.child;
  }
  function Hc(e, t) {
    return (e.lanes & t) !== 0 ? !0 : ((e = e.dependencies), !!(e !== null && Gs(e)));
  }
  function bv(e, t, a) {
    switch (t.tag) {
      case 3:
        (we(t, t.stateNode.containerInfo), ca(t, ct, e.memoizedState.cache), za());
        break;
      case 27:
      case 5:
        Lt(t);
        break;
      case 4:
        we(t, t.stateNode.containerInfo);
        break;
      case 10:
        ca(t, t.type, t.memoizedProps.value);
        break;
      case 31:
        if (t.memoizedState !== null) return ((t.flags |= 128), dc(t), null);
        break;
      case 13:
        var n = t.memoizedState;
        if (n !== null)
          return n.dehydrated !== null
            ? (_a(t), (t.flags |= 128), null)
            : (a & t.child.childLanes) !== 0
              ? of(e, t, a)
              : (_a(t), (e = Hl(e, t, a)), e !== null ? e.sibling : null);
        _a(t);
        break;
      case 19:
        var o = (e.flags & 128) !== 0;
        if (
          ((n = (a & t.childLanes) !== 0),
          n || (xn(e, t, a, !1), (n = (a & t.childLanes) !== 0)),
          o)
        ) {
          if (n) return uf(e, t, a);
          t.flags |= 128;
        }
        if (
          ((o = t.memoizedState),
          o !== null && ((o.rendering = null), (o.tail = null), (o.lastEffect = null)),
          L(rt, rt.current),
          n)
        )
          break;
        return null;
      case 22:
        return ((t.lanes = 0), tf(e, t, a, t.pendingProps));
      case 24:
        ca(t, ct, e.memoizedState.cache);
    }
    return Hl(e, t, a);
  }
  function df(e, t, a) {
    if (e !== null)
      if (e.memoizedProps !== t.pendingProps) dt = !0;
      else {
        if (!Hc(e, a) && (t.flags & 128) === 0) return ((dt = !1), bv(e, t, a));
        dt = (e.flags & 131072) !== 0;
      }
    else ((dt = !1), qe && (t.flags & 1048576) !== 0 && $m(t, Si, t.index));
    switch (((t.lanes = 0), t.tag)) {
      case 16:
        e: {
          var n = t.pendingProps;
          if (((e = Ga(t.elementType)), (t.type = e), typeof e == 'function'))
            Vo(e)
              ? ((n = Qa(e, n)), (t.tag = 1), (t = sf(null, t, e, n, a)))
              : ((t.tag = 0), (t = qc(null, t, e, n, a)));
          else {
            if (e != null) {
              var o = e.$$typeof;
              if (o === $) {
                ((t.tag = 11), (t = F_(null, t, e, n, a)));
                break e;
              } else if (o === S) {
                ((t.tag = 14), (t = W_(null, t, e, n, a)));
                break e;
              }
            }
            throw ((t = Se(e) || e), Error(s(306, t, '')));
          }
        }
        return t;
      case 0:
        return qc(e, t, t.type, t.pendingProps, a);
      case 1:
        return ((n = t.type), (o = Qa(n, t.pendingProps)), sf(e, t, n, o, a));
      case 3:
        e: {
          if ((we(t, t.stateNode.containerInfo), e === null)) throw Error(s(387));
          n = t.pendingProps;
          var c = t.memoizedState;
          ((o = c.element), sc(e, t), Li(t, n, null, a));
          var f = t.memoizedState;
          if (
            ((n = f.cache),
            ca(t, ct, n),
            n !== c.cache && ec(t, [ct], a, !0),
            Ai(),
            (n = f.element),
            c.isDehydrated)
          )
            if (
              ((c = { element: n, isDehydrated: !1, cache: f.cache }),
              (t.updateQueue.baseState = c),
              (t.memoizedState = c),
              t.flags & 256)
            ) {
              t = rf(e, t, n, a);
              break e;
            } else if (n !== o) {
              ((o = el(Error(s(424)), t)), wi(o), (t = rf(e, t, n, a)));
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
                Fe = il(e.firstChild),
                  yt = t,
                  qe = !0,
                  ra = null,
                  al = !0,
                  a = t_(t, null, n, a),
                  t.child = a;
                a;
              )
                ((a.flags = (a.flags & -3) | 4096), (a = a.sibling));
            }
          else {
            if ((za(), n === o)) {
              t = Hl(e, t, a);
              break e;
            }
            xt(e, t, n, a);
          }
          t = t.child;
        }
        return t;
      case 26:
        return (
          or(e, t),
          e === null
            ? (a = xp(t.type, null, t.pendingProps, null))
              ? (t.memoizedState = a)
              : qe ||
                ((a = t.type),
                (e = t.pendingProps),
                (n = Tr(ue.current).createElement(a)),
                (n[vt] = t),
                (n[qt] = e),
                St(n, a, e),
                pt(n),
                (t.stateNode = n))
            : (t.memoizedState = xp(t.type, e.memoizedProps, t.pendingProps, e.memoizedState)),
          null
        );
      case 27:
        return (
          Lt(t),
          e === null &&
            qe &&
            ((n = t.stateNode = vp(t.type, t.pendingProps, ue.current)),
            (yt = t),
            (al = !0),
            (o = Fe),
            xa(t.type) ? ((vu = o), (Fe = il(n.firstChild))) : (Fe = o)),
          xt(e, t, t.pendingProps.children, a),
          or(e, t),
          e === null && (t.flags |= 4194304),
          t.child
        );
      case 5:
        return (
          e === null &&
            qe &&
            ((o = n = Fe) &&
              ((n = Pv(n, t.type, t.pendingProps, al)),
              n !== null
                ? ((t.stateNode = n), (yt = t), (Fe = il(n.firstChild)), (al = !1), (o = !0))
                : (o = !1)),
            o || oa(t)),
          Lt(t),
          (o = t.type),
          (c = t.pendingProps),
          (f = e !== null ? e.memoizedProps : null),
          (n = c.children),
          fu(o, c) ? (n = null) : f !== null && fu(o, f) && (t.flags |= 32),
          t.memoizedState !== null && ((o = _c(e, t, mv, null, null, a)), (Pi._currentValue = o)),
          or(e, t),
          xt(e, t, n, a),
          t.child
        );
      case 6:
        return (
          e === null &&
            qe &&
            ((e = a = Fe) &&
              ((a = Fv(a, t.pendingProps, al)),
              a !== null ? ((t.stateNode = a), (yt = t), (Fe = null), (e = !0)) : (e = !1)),
            e || oa(t)),
          null
        );
      case 13:
        return of(e, t, a);
      case 4:
        return (
          we(t, t.stateNode.containerInfo),
          (n = t.pendingProps),
          e === null ? (t.child = Va(t, null, n, a)) : xt(e, t, n, a),
          t.child
        );
      case 11:
        return F_(e, t, t.type, t.pendingProps, a);
      case 7:
        return (xt(e, t, t.pendingProps, a), t.child);
      case 8:
        return (xt(e, t, t.pendingProps.children, a), t.child);
      case 12:
        return (xt(e, t, t.pendingProps.children, a), t.child);
      case 10:
        return ((n = t.pendingProps), ca(t, t.type, n.value), xt(e, t, n.children, a), t.child);
      case 9:
        return (
          (o = t.type._context),
          (n = t.pendingProps.children),
          Ua(t),
          (o = bt(o)),
          (n = n(o)),
          (t.flags |= 1),
          xt(e, t, n, a),
          t.child
        );
      case 14:
        return W_(e, t, t.type, t.pendingProps, a);
      case 15:
        return ef(e, t, t.type, t.pendingProps, a);
      case 19:
        return uf(e, t, a);
      case 31:
        return yv(e, t, a);
      case 22:
        return tf(e, t, a, t.pendingProps);
      case 24:
        return (
          Ua(t),
          (n = bt(ct)),
          e === null
            ? ((o = ac()),
              o === null &&
                ((o = Qe),
                (c = tc()),
                (o.pooledCache = c),
                c.refCount++,
                c !== null && (o.pooledCacheLanes |= a),
                (o = c)),
              (t.memoizedState = { parent: n, cache: o }),
              ic(t),
              ca(t, ct, o))
            : ((e.lanes & a) !== 0 && (sc(e, t), Li(t, null, null, a), Ai()),
              (o = e.memoizedState),
              (c = t.memoizedState),
              o.parent !== n
                ? ((o = { parent: n, cache: n }),
                  (t.memoizedState = o),
                  t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = o),
                  ca(t, ct, n))
                : ((n = c.cache), ca(t, ct, n), n !== o.cache && ec(t, [ct], a, !0))),
          xt(e, t, t.pendingProps.children, a),
          t.child
        );
      case 29:
        throw t.pendingProps;
    }
    throw Error(s(156, t.tag));
  }
  function Ul(e) {
    e.flags |= 4;
  }
  function Uc(e, t, a, n, o) {
    if (((t = (e.mode & 32) !== 0) && (t = !1), t)) {
      if (((e.flags |= 16777216), (o & 335544128) === o))
        if (e.stateNode.complete) e.flags |= 8192;
        else if (Df()) e.flags |= 8192;
        else throw ((Ya = Qs), nc);
    } else e.flags &= -16777217;
  }
  function mf(e, t) {
    if (t.type !== 'stylesheet' || (t.state.loading & 4) !== 0) e.flags &= -16777217;
    else if (((e.flags |= 16777216), !jp(t)))
      if (Df()) e.flags |= 8192;
      else throw ((Ya = Qs), nc);
  }
  function ur(e, t) {
    (t !== null && (e.flags |= 4),
      e.flags & 16384 && ((t = e.tag !== 22 ? ui() : 536870912), (e.lanes |= t), (In |= t)));
  }
  function Ri(e, t) {
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
  function We(e) {
    var t = e.alternate !== null && e.alternate.child === e.child,
      a = 0,
      n = 0;
    if (t)
      for (var o = e.child; o !== null; )
        ((a |= o.lanes | o.childLanes),
          (n |= o.subtreeFlags & 65011712),
          (n |= o.flags & 65011712),
          (o.return = e),
          (o = o.sibling));
    else
      for (o = e.child; o !== null; )
        ((a |= o.lanes | o.childLanes),
          (n |= o.subtreeFlags),
          (n |= o.flags),
          (o.return = e),
          (o = o.sibling));
    return ((e.subtreeFlags |= n), (e.childLanes = a), t);
  }
  function xv(e, t, a) {
    var n = t.pendingProps;
    switch ((Zo(t), t.tag)) {
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return (We(t), null);
      case 1:
        return (We(t), null);
      case 3:
        return (
          (a = t.stateNode),
          (n = null),
          e !== null && (n = e.memoizedState.cache),
          t.memoizedState.cache !== n && (t.flags |= 2048),
          Rl(ct),
          be(),
          a.pendingContext && ((a.context = a.pendingContext), (a.pendingContext = null)),
          (e === null || e.child === null) &&
            (bn(t)
              ? Ul(t)
              : e === null ||
                (e.memoizedState.isDehydrated && (t.flags & 256) === 0) ||
                ((t.flags |= 1024), Po())),
          We(t),
          null
        );
      case 26:
        var o = t.type,
          c = t.memoizedState;
        return (
          e === null
            ? (Ul(t), c !== null ? (We(t), mf(t, c)) : (We(t), Uc(t, o, null, n, a)))
            : c
              ? c !== e.memoizedState
                ? (Ul(t), We(t), mf(t, c))
                : (We(t), (t.flags &= -16777217))
              : ((e = e.memoizedProps), e !== n && Ul(t), We(t), Uc(t, o, e, n, a)),
          null
        );
      case 27:
        if ((Bt(t), (a = ue.current), (o = t.type), e !== null && t.stateNode != null))
          e.memoizedProps !== n && Ul(t);
        else {
          if (!n) {
            if (t.stateNode === null) throw Error(s(166));
            return (We(t), null);
          }
          ((e = J.current), bn(t) ? Ym(t) : ((e = vp(o, n, a)), (t.stateNode = e), Ul(t)));
        }
        return (We(t), null);
      case 5:
        if ((Bt(t), (o = t.type), e !== null && t.stateNode != null))
          e.memoizedProps !== n && Ul(t);
        else {
          if (!n) {
            if (t.stateNode === null) throw Error(s(166));
            return (We(t), null);
          }
          if (((c = J.current), bn(t))) Ym(t);
          else {
            var f = Tr(ue.current);
            switch (c) {
              case 1:
                c = f.createElementNS('http://www.w3.org/2000/svg', o);
                break;
              case 2:
                c = f.createElementNS('http://www.w3.org/1998/Math/MathML', o);
                break;
              default:
                switch (o) {
                  case 'svg':
                    c = f.createElementNS('http://www.w3.org/2000/svg', o);
                    break;
                  case 'math':
                    c = f.createElementNS('http://www.w3.org/1998/Math/MathML', o);
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
                        ? f.createElement(o, { is: n.is })
                        : f.createElement(o);
                }
            }
            ((c[vt] = t), (c[qt] = n));
            e: for (f = t.child; f !== null; ) {
              if (f.tag === 5 || f.tag === 6) c.appendChild(f.stateNode);
              else if (f.tag !== 4 && f.tag !== 27 && f.child !== null) {
                ((f.child.return = f), (f = f.child));
                continue;
              }
              if (f === t) break e;
              for (; f.sibling === null; ) {
                if (f.return === null || f.return === t) break e;
                f = f.return;
              }
              ((f.sibling.return = f.return), (f = f.sibling));
            }
            t.stateNode = c;
            e: switch ((St(c, o, n), o)) {
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
            n && Ul(t);
          }
        }
        return (We(t), Uc(t, t.type, e === null ? null : e.memoizedProps, t.pendingProps, a), null);
      case 6:
        if (e && t.stateNode != null) e.memoizedProps !== n && Ul(t);
        else {
          if (typeof n != 'string' && t.stateNode === null) throw Error(s(166));
          if (((e = ue.current), bn(t))) {
            if (((e = t.stateNode), (a = t.memoizedProps), (n = null), (o = yt), o !== null))
              switch (o.tag) {
                case 27:
                case 5:
                  n = o.memoizedProps;
              }
            ((e[vt] = t),
              (e = !!(
                e.nodeValue === a ||
                (n !== null && n.suppressHydrationWarning === !0) ||
                op(e.nodeValue, a)
              )),
              e || oa(t, !0));
          } else ((e = Tr(e).createTextNode(n)), (e[vt] = t), (t.stateNode = e));
        }
        return (We(t), null);
      case 31:
        if (((a = t.memoizedState), e === null || e.memoizedState !== null)) {
          if (((n = bn(t)), a !== null)) {
            if (e === null) {
              if (!n) throw Error(s(318));
              if (((e = t.memoizedState), (e = e !== null ? e.dehydrated : null), !e))
                throw Error(s(557));
              e[vt] = t;
            } else (za(), (t.flags & 128) === 0 && (t.memoizedState = null), (t.flags |= 4));
            (We(t), (e = !1));
          } else
            ((a = Po()),
              e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = a),
              (e = !0));
          if (!e) return t.flags & 256 ? (Gt(t), t) : (Gt(t), null);
          if ((t.flags & 128) !== 0) throw Error(s(558));
        }
        return (We(t), null);
      case 13:
        if (
          ((n = t.memoizedState),
          e === null || (e.memoizedState !== null && e.memoizedState.dehydrated !== null))
        ) {
          if (((o = bn(t)), n !== null && n.dehydrated !== null)) {
            if (e === null) {
              if (!o) throw Error(s(318));
              if (((o = t.memoizedState), (o = o !== null ? o.dehydrated : null), !o))
                throw Error(s(317));
              o[vt] = t;
            } else (za(), (t.flags & 128) === 0 && (t.memoizedState = null), (t.flags |= 4));
            (We(t), (o = !1));
          } else
            ((o = Po()),
              e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = o),
              (o = !0));
          if (!o) return t.flags & 256 ? (Gt(t), t) : (Gt(t), null);
        }
        return (
          Gt(t),
          (t.flags & 128) !== 0
            ? ((t.lanes = a), t)
            : ((a = n !== null),
              (e = e !== null && e.memoizedState !== null),
              a &&
                ((n = t.child),
                (o = null),
                n.alternate !== null &&
                  n.alternate.memoizedState !== null &&
                  n.alternate.memoizedState.cachePool !== null &&
                  (o = n.alternate.memoizedState.cachePool.pool),
                (c = null),
                n.memoizedState !== null &&
                  n.memoizedState.cachePool !== null &&
                  (c = n.memoizedState.cachePool.pool),
                c !== o && (n.flags |= 2048)),
              a !== e && a && (t.child.flags |= 8192),
              ur(t, t.updateQueue),
              We(t),
              null)
        );
      case 4:
        return (be(), e === null && cu(t.stateNode.containerInfo), We(t), null);
      case 10:
        return (Rl(t.type), We(t), null);
      case 19:
        if ((B(rt), (n = t.memoizedState), n === null)) return (We(t), null);
        if (((o = (t.flags & 128) !== 0), (c = n.rendering), c === null))
          if (o) Ri(n, !1);
          else {
            if (it !== 0 || (e !== null && (e.flags & 128) !== 0))
              for (e = t.child; e !== null; ) {
                if (((c = Ps(e)), c !== null)) {
                  for (
                    t.flags |= 128,
                      Ri(n, !1),
                      e = c.updateQueue,
                      t.updateQueue = e,
                      ur(t, e),
                      t.subtreeFlags = 0,
                      e = a,
                      a = t.child;
                    a !== null;
                  )
                    (zm(a, e), (a = a.sibling));
                  return (L(rt, (rt.current & 1) | 2), qe && Ol(t, n.treeForkCount), t.child);
                }
                e = e.sibling;
              }
            n.tail !== null &&
              Nt() > pr &&
              ((t.flags |= 128), (o = !0), Ri(n, !1), (t.lanes = 4194304));
          }
        else {
          if (!o)
            if (((e = Ps(c)), e !== null)) {
              if (
                ((t.flags |= 128),
                (o = !0),
                (e = e.updateQueue),
                (t.updateQueue = e),
                ur(t, e),
                Ri(n, !0),
                n.tail === null && n.tailMode === 'hidden' && !c.alternate && !qe)
              )
                return (We(t), null);
            } else
              2 * Nt() - n.renderingStartTime > pr &&
                a !== 536870912 &&
                ((t.flags |= 128), (o = !0), Ri(n, !1), (t.lanes = 4194304));
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
            (a = rt.current),
            L(rt, o ? (a & 1) | 2 : a & 1),
            qe && Ol(t, n.treeForkCount),
            e)
          : (We(t), null);
      case 22:
      case 23:
        return (
          Gt(t),
          uc(),
          (n = t.memoizedState !== null),
          e !== null
            ? (e.memoizedState !== null) !== n && (t.flags |= 8192)
            : n && (t.flags |= 8192),
          n
            ? (a & 536870912) !== 0 &&
              (t.flags & 128) === 0 &&
              (We(t), t.subtreeFlags & 6 && (t.flags |= 8192))
            : We(t),
          (a = t.updateQueue),
          a !== null && ur(t, a.retryQueue),
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
          e !== null && B($a),
          null
        );
      case 24:
        return (
          (a = null),
          e !== null && (a = e.memoizedState.cache),
          t.memoizedState.cache !== a && (t.flags |= 2048),
          Rl(ct),
          We(t),
          null
        );
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(s(156, t.tag));
  }
  function Sv(e, t) {
    switch ((Zo(t), t.tag)) {
      case 1:
        return ((e = t.flags), e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null);
      case 3:
        return (
          Rl(ct),
          be(),
          (e = t.flags),
          (e & 65536) !== 0 && (e & 128) === 0 ? ((t.flags = (e & -65537) | 128), t) : null
        );
      case 26:
      case 27:
      case 5:
        return (Bt(t), null);
      case 31:
        if (t.memoizedState !== null) {
          if ((Gt(t), t.alternate === null)) throw Error(s(340));
          za();
        }
        return ((e = t.flags), e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null);
      case 13:
        if ((Gt(t), (e = t.memoizedState), e !== null && e.dehydrated !== null)) {
          if (t.alternate === null) throw Error(s(340));
          za();
        }
        return ((e = t.flags), e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null);
      case 19:
        return (B(rt), null);
      case 4:
        return (be(), null);
      case 10:
        return (Rl(t.type), null);
      case 22:
      case 23:
        return (
          Gt(t),
          uc(),
          e !== null && B($a),
          (e = t.flags),
          e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
        );
      case 24:
        return (Rl(ct), null);
      case 25:
        return null;
      default:
        return null;
    }
  }
  function _f(e, t) {
    switch ((Zo(t), t.tag)) {
      case 3:
        (Rl(ct), be());
        break;
      case 26:
      case 27:
      case 5:
        Bt(t);
        break;
      case 4:
        be();
        break;
      case 31:
        t.memoizedState !== null && Gt(t);
        break;
      case 13:
        Gt(t);
        break;
      case 19:
        B(rt);
        break;
      case 10:
        Rl(t.type);
        break;
      case 22:
      case 23:
        (Gt(t), uc(), e !== null && B($a));
        break;
      case 24:
        Rl(ct);
    }
  }
  function Di(e, t) {
    try {
      var a = t.updateQueue,
        n = a !== null ? a.lastEffect : null;
      if (n !== null) {
        var o = n.next;
        a = o;
        do {
          if ((a.tag & e) === e) {
            n = void 0;
            var c = a.create,
              f = a.inst;
            ((n = c()), (f.destroy = n));
          }
          a = a.next;
        } while (a !== o);
      }
    } catch (v) {
      Ue(t, t.return, v);
    }
  }
  function pa(e, t, a) {
    try {
      var n = t.updateQueue,
        o = n !== null ? n.lastEffect : null;
      if (o !== null) {
        var c = o.next;
        n = c;
        do {
          if ((n.tag & e) === e) {
            var f = n.inst,
              v = f.destroy;
            if (v !== void 0) {
              ((f.destroy = void 0), (o = t));
              var T = a,
                U = v;
              try {
                U();
              } catch (Q) {
                Ue(o, T, Q);
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
  function ff(e) {
    var t = e.updateQueue;
    if (t !== null) {
      var a = e.stateNode;
      try {
        a_(t, a);
      } catch (n) {
        Ue(e, e.return, n);
      }
    }
  }
  function pf(e, t, a) {
    ((a.props = Qa(e.type, e.memoizedProps)), (a.state = e.memoizedState));
    try {
      a.componentWillUnmount();
    } catch (n) {
      Ue(e, t, n);
    }
  }
  function zi(e, t) {
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
    } catch (o) {
      Ue(e, t, o);
    }
  }
  function Tl(e, t) {
    var a = e.ref,
      n = e.refCleanup;
    if (a !== null)
      if (typeof n == 'function')
        try {
          n();
        } catch (o) {
          Ue(e, t, o);
        } finally {
          ((e.refCleanup = null), (e = e.alternate), e != null && (e.refCleanup = null));
        }
      else if (typeof a == 'function')
        try {
          a(null);
        } catch (o) {
          Ue(e, t, o);
        }
      else a.current = null;
  }
  function hf(e) {
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
    } catch (o) {
      Ue(e, e.return, o);
    }
  }
  function $c(e, t, a) {
    try {
      var n = e.stateNode;
      (Vv(n, e.type, a, t), (n[qt] = t));
    } catch (o) {
      Ue(e, e.return, o);
    }
  }
  function gf(e) {
    return (
      e.tag === 5 || e.tag === 3 || e.tag === 26 || (e.tag === 27 && xa(e.type)) || e.tag === 4
    );
  }
  function Gc(e) {
    e: for (;;) {
      for (; e.sibling === null; ) {
        if (e.return === null || gf(e.return)) return null;
        e = e.return;
      }
      for (
        e.sibling.return = e.return, e = e.sibling;
        e.tag !== 5 && e.tag !== 6 && e.tag !== 18;
      ) {
        if ((e.tag === 27 && xa(e.type)) || e.flags & 2 || e.child === null || e.tag === 4)
          continue e;
        ((e.child.return = e), (e = e.child));
      }
      if (!(e.flags & 2)) return e.stateNode;
    }
  }
  function Yc(e, t, a) {
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
            a != null || t.onclick !== null || (t.onclick = Bl)));
    else if (
      n !== 4 &&
      (n === 27 && xa(e.type) && ((a = e.stateNode), (t = null)), (e = e.child), e !== null)
    )
      for (Yc(e, t, a), e = e.sibling; e !== null; ) (Yc(e, t, a), (e = e.sibling));
  }
  function dr(e, t, a) {
    var n = e.tag;
    if (n === 5 || n === 6) ((e = e.stateNode), t ? a.insertBefore(e, t) : a.appendChild(e));
    else if (n !== 4 && (n === 27 && xa(e.type) && (a = e.stateNode), (e = e.child), e !== null))
      for (dr(e, t, a), e = e.sibling; e !== null; ) (dr(e, t, a), (e = e.sibling));
  }
  function kf(e) {
    var t = e.stateNode,
      a = e.memoizedProps;
    try {
      for (var n = e.type, o = t.attributes; o.length; ) t.removeAttributeNode(o[0]);
      (St(t, n, a), (t[vt] = e), (t[qt] = a));
    } catch (c) {
      Ue(e, e.return, c);
    }
  }
  var $l = !1,
    mt = !1,
    Vc = !1,
    vf = typeof WeakSet == 'function' ? WeakSet : Set,
    ht = null;
  function wv(e, t) {
    if (((e = e.containerInfo), (mu = Br), (e = Am(e)), Do(e))) {
      if ('selectionStart' in e) var a = { start: e.selectionStart, end: e.selectionEnd };
      else
        e: {
          a = ((a = e.ownerDocument) && a.defaultView) || window;
          var n = a.getSelection && a.getSelection();
          if (n && n.rangeCount !== 0) {
            a = n.anchorNode;
            var o = n.anchorOffset,
              c = n.focusNode;
            n = n.focusOffset;
            try {
              (a.nodeType, c.nodeType);
            } catch {
              a = null;
              break e;
            }
            var f = 0,
              v = -1,
              T = -1,
              U = 0,
              Q = 0,
              W = e,
              G = null;
            t: for (;;) {
              for (
                var Y;
                W !== a || (o !== 0 && W.nodeType !== 3) || (v = f + o),
                  W !== c || (n !== 0 && W.nodeType !== 3) || (T = f + n),
                  W.nodeType === 3 && (f += W.nodeValue.length),
                  (Y = W.firstChild) !== null;
              )
                ((G = W), (W = Y));
              for (;;) {
                if (W === e) break t;
                if (
                  (G === a && ++U === o && (v = f),
                  G === c && ++Q === n && (T = f),
                  (Y = W.nextSibling) !== null)
                )
                  break;
                ((W = G), (G = W.parentNode));
              }
              W = Y;
            }
            a = v === -1 || T === -1 ? null : { start: v, end: T };
          } else a = null;
        }
      a = a || { start: 0, end: 0 };
    } else a = null;
    for (_u = { focusedElem: e, selectionRange: a }, Br = !1, ht = t; ht !== null; )
      if (((t = ht), (e = t.child), (t.subtreeFlags & 1028) !== 0 && e !== null))
        ((e.return = t), (ht = e));
      else
        for (; ht !== null; ) {
          switch (((t = ht), (c = t.alternate), (e = t.flags), t.tag)) {
            case 0:
              if (
                (e & 4) !== 0 &&
                ((e = t.updateQueue), (e = e !== null ? e.events : null), e !== null)
              )
                for (a = 0; a < e.length; a++) ((o = e[a]), (o.ref.impl = o.nextImpl));
              break;
            case 11:
            case 15:
              break;
            case 1:
              if ((e & 1024) !== 0 && c !== null) {
                ((e = void 0),
                  (a = t),
                  (o = c.memoizedProps),
                  (c = c.memoizedState),
                  (n = a.stateNode));
                try {
                  var fe = Qa(a.type, o);
                  ((e = n.getSnapshotBeforeUpdate(fe, c)),
                    (n.__reactInternalSnapshotBeforeUpdate = e));
                } catch (xe) {
                  Ue(a, a.return, xe);
                }
              }
              break;
            case 3:
              if ((e & 1024) !== 0) {
                if (((e = t.stateNode.containerInfo), (a = e.nodeType), a === 9)) hu(e);
                else if (a === 1)
                  switch (e.nodeName) {
                    case 'HEAD':
                    case 'HTML':
                    case 'BODY':
                      hu(e);
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
              if ((e & 1024) !== 0) throw Error(s(163));
          }
          if (((e = t.sibling), e !== null)) {
            ((e.return = t.return), (ht = e));
            break;
          }
          ht = t.return;
        }
  }
  function yf(e, t, a) {
    var n = a.flags;
    switch (a.tag) {
      case 0:
      case 11:
      case 15:
        (Yl(e, a), n & 4 && Di(5, a));
        break;
      case 1:
        if ((Yl(e, a), n & 4))
          if (((e = a.stateNode), t === null))
            try {
              e.componentDidMount();
            } catch (f) {
              Ue(a, a.return, f);
            }
          else {
            var o = Qa(a.type, t.memoizedProps);
            t = t.memoizedState;
            try {
              e.componentDidUpdate(o, t, e.__reactInternalSnapshotBeforeUpdate);
            } catch (f) {
              Ue(a, a.return, f);
            }
          }
        (n & 64 && ff(a), n & 512 && zi(a, a.return));
        break;
      case 3:
        if ((Yl(e, a), n & 64 && ((e = a.updateQueue), e !== null))) {
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
            a_(e, t);
          } catch (f) {
            Ue(a, a.return, f);
          }
        }
        break;
      case 27:
        t === null && n & 4 && kf(a);
      case 26:
      case 5:
        (Yl(e, a), t === null && n & 4 && hf(a), n & 512 && zi(a, a.return));
        break;
      case 12:
        Yl(e, a);
        break;
      case 31:
        (Yl(e, a), n & 4 && Sf(e, a));
        break;
      case 13:
        (Yl(e, a),
          n & 4 && wf(e, a),
          n & 64 &&
            ((e = a.memoizedState),
            e !== null && ((e = e.dehydrated), e !== null && ((a = qv.bind(null, a)), Wv(e, a)))));
        break;
      case 22:
        if (((n = a.memoizedState !== null || $l), !n)) {
          ((t = (t !== null && t.memoizedState !== null) || mt), (o = $l));
          var c = mt;
          (($l = n),
            (mt = t) && !c ? Vl(e, a, (a.subtreeFlags & 8772) !== 0) : Yl(e, a),
            ($l = o),
            (mt = c));
        }
        break;
      case 30:
        break;
      default:
        Yl(e, a);
    }
  }
  function bf(e) {
    var t = e.alternate;
    (t !== null && ((e.alternate = null), bf(t)),
      (e.child = null),
      (e.deletions = null),
      (e.sibling = null),
      e.tag === 5 && ((t = e.stateNode), t !== null && bo(t)),
      (e.stateNode = null),
      (e.return = null),
      (e.dependencies = null),
      (e.memoizedProps = null),
      (e.memoizedState = null),
      (e.pendingProps = null),
      (e.stateNode = null),
      (e.updateQueue = null));
  }
  var tt = null,
    Ot = !1;
  function Gl(e, t, a) {
    for (a = a.child; a !== null; ) (xf(e, t, a), (a = a.sibling));
  }
  function xf(e, t, a) {
    if (jt && typeof jt.onCommitFiberUnmount == 'function')
      try {
        jt.onCommitFiberUnmount(aa, a);
      } catch {}
    switch (a.tag) {
      case 26:
        (mt || Tl(a, t),
          Gl(e, t, a),
          a.memoizedState
            ? a.memoizedState.count--
            : a.stateNode && ((a = a.stateNode), a.parentNode.removeChild(a)));
        break;
      case 27:
        mt || Tl(a, t);
        var n = tt,
          o = Ot;
        (xa(a.type) && ((tt = a.stateNode), (Ot = !1)),
          Gl(e, t, a),
          Ki(a.stateNode),
          (tt = n),
          (Ot = o));
        break;
      case 5:
        mt || Tl(a, t);
      case 6:
        if (((n = tt), (o = Ot), (tt = null), Gl(e, t, a), (tt = n), (Ot = o), tt !== null))
          if (Ot)
            try {
              (tt.nodeType === 9
                ? tt.body
                : tt.nodeName === 'HTML'
                  ? tt.ownerDocument.body
                  : tt
              ).removeChild(a.stateNode);
            } catch (c) {
              Ue(a, t, c);
            }
          else
            try {
              tt.removeChild(a.stateNode);
            } catch (c) {
              Ue(a, t, c);
            }
        break;
      case 18:
        tt !== null &&
          (Ot
            ? ((e = tt),
              fp(
                e.nodeType === 9 ? e.body : e.nodeName === 'HTML' ? e.ownerDocument.body : e,
                a.stateNode
              ),
              $n(e))
            : fp(tt, a.stateNode));
        break;
      case 4:
        ((n = tt),
          (o = Ot),
          (tt = a.stateNode.containerInfo),
          (Ot = !0),
          Gl(e, t, a),
          (tt = n),
          (Ot = o));
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        (pa(2, a, t), mt || pa(4, a, t), Gl(e, t, a));
        break;
      case 1:
        (mt ||
          (Tl(a, t), (n = a.stateNode), typeof n.componentWillUnmount == 'function' && pf(a, t, n)),
          Gl(e, t, a));
        break;
      case 21:
        Gl(e, t, a);
        break;
      case 22:
        ((mt = (n = mt) || a.memoizedState !== null), Gl(e, t, a), (mt = n));
        break;
      default:
        Gl(e, t, a);
    }
  }
  function Sf(e, t) {
    if (
      t.memoizedState === null &&
      ((e = t.alternate), e !== null && ((e = e.memoizedState), e !== null))
    ) {
      e = e.dehydrated;
      try {
        $n(e);
      } catch (a) {
        Ue(t, t.return, a);
      }
    }
  }
  function wf(e, t) {
    if (
      t.memoizedState === null &&
      ((e = t.alternate),
      e !== null && ((e = e.memoizedState), e !== null && ((e = e.dehydrated), e !== null)))
    )
      try {
        $n(e);
      } catch (a) {
        Ue(t, t.return, a);
      }
  }
  function Tv(e) {
    switch (e.tag) {
      case 31:
      case 13:
      case 19:
        var t = e.stateNode;
        return (t === null && (t = e.stateNode = new vf()), t);
      case 22:
        return (
          (e = e.stateNode),
          (t = e._retryCache),
          t === null && (t = e._retryCache = new vf()),
          t
        );
      default:
        throw Error(s(435, e.tag));
    }
  }
  function mr(e, t) {
    var a = Tv(e);
    t.forEach(function (n) {
      if (!a.has(n)) {
        a.add(n);
        var o = Iv.bind(null, e, n);
        n.then(o, o);
      }
    });
  }
  function Mt(e, t) {
    var a = t.deletions;
    if (a !== null)
      for (var n = 0; n < a.length; n++) {
        var o = a[n],
          c = e,
          f = t,
          v = f;
        e: for (; v !== null; ) {
          switch (v.tag) {
            case 27:
              if (xa(v.type)) {
                ((tt = v.stateNode), (Ot = !1));
                break e;
              }
              break;
            case 5:
              ((tt = v.stateNode), (Ot = !1));
              break e;
            case 3:
            case 4:
              ((tt = v.stateNode.containerInfo), (Ot = !0));
              break e;
          }
          v = v.return;
        }
        if (tt === null) throw Error(s(160));
        (xf(c, f, o),
          (tt = null),
          (Ot = !1),
          (c = o.alternate),
          c !== null && (c.return = null),
          (o.return = null));
      }
    if (t.subtreeFlags & 13886) for (t = t.child; t !== null; ) (Tf(t, e), (t = t.sibling));
  }
  var _l = null;
  function Tf(e, t) {
    var a = e.alternate,
      n = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        (Mt(t, e), Rt(e), n & 4 && (pa(3, e, e.return), Di(3, e), pa(5, e, e.return)));
        break;
      case 1:
        (Mt(t, e),
          Rt(e),
          n & 512 && (mt || a === null || Tl(a, a.return)),
          n & 64 &&
            $l &&
            ((e = e.updateQueue),
            e !== null &&
              ((n = e.callbacks),
              n !== null &&
                ((a = e.shared.hiddenCallbacks),
                (e.shared.hiddenCallbacks = a === null ? n : a.concat(n))))));
        break;
      case 26:
        var o = _l;
        if ((Mt(t, e), Rt(e), n & 512 && (mt || a === null || Tl(a, a.return)), n & 4)) {
          var c = a !== null ? a.memoizedState : null;
          if (((n = e.memoizedState), a === null))
            if (n === null)
              if (e.stateNode === null) {
                e: {
                  ((n = e.type), (a = e.memoizedProps), (o = o.ownerDocument || o));
                  t: switch (n) {
                    case 'title':
                      ((c = o.getElementsByTagName('title')[0]),
                        (!c ||
                          c[mi] ||
                          c[vt] ||
                          c.namespaceURI === 'http://www.w3.org/2000/svg' ||
                          c.hasAttribute('itemprop')) &&
                          ((c = o.createElement(n)),
                          o.head.insertBefore(c, o.querySelector('head > title'))),
                        St(c, n, a),
                        (c[vt] = e),
                        pt(c),
                        (n = c));
                      break e;
                    case 'link':
                      var f = Tp('link', 'href', o).get(n + (a.href || ''));
                      if (f) {
                        for (var v = 0; v < f.length; v++)
                          if (
                            ((c = f[v]),
                            c.getAttribute('href') ===
                              (a.href == null || a.href === '' ? null : a.href) &&
                              c.getAttribute('rel') === (a.rel == null ? null : a.rel) &&
                              c.getAttribute('title') === (a.title == null ? null : a.title) &&
                              c.getAttribute('crossorigin') ===
                                (a.crossOrigin == null ? null : a.crossOrigin))
                          ) {
                            f.splice(v, 1);
                            break t;
                          }
                      }
                      ((c = o.createElement(n)), St(c, n, a), o.head.appendChild(c));
                      break;
                    case 'meta':
                      if ((f = Tp('meta', 'content', o).get(n + (a.content || '')))) {
                        for (v = 0; v < f.length; v++)
                          if (
                            ((c = f[v]),
                            c.getAttribute('content') ===
                              (a.content == null ? null : '' + a.content) &&
                              c.getAttribute('name') === (a.name == null ? null : a.name) &&
                              c.getAttribute('property') ===
                                (a.property == null ? null : a.property) &&
                              c.getAttribute('http-equiv') ===
                                (a.httpEquiv == null ? null : a.httpEquiv) &&
                              c.getAttribute('charset') === (a.charSet == null ? null : a.charSet))
                          ) {
                            f.splice(v, 1);
                            break t;
                          }
                      }
                      ((c = o.createElement(n)), St(c, n, a), o.head.appendChild(c));
                      break;
                    default:
                      throw Error(s(468, n));
                  }
                  ((c[vt] = e), pt(c), (n = c));
                }
                e.stateNode = n;
              } else Np(o, e.type, e.stateNode);
            else e.stateNode = wp(o, n, e.memoizedProps);
          else
            c !== n
              ? (c === null
                  ? a.stateNode !== null && ((a = a.stateNode), a.parentNode.removeChild(a))
                  : c.count--,
                n === null ? Np(o, e.type, e.stateNode) : wp(o, n, e.memoizedProps))
              : n === null && e.stateNode !== null && $c(e, e.memoizedProps, a.memoizedProps);
        }
        break;
      case 27:
        (Mt(t, e),
          Rt(e),
          n & 512 && (mt || a === null || Tl(a, a.return)),
          a !== null && n & 4 && $c(e, e.memoizedProps, a.memoizedProps));
        break;
      case 5:
        if ((Mt(t, e), Rt(e), n & 512 && (mt || a === null || Tl(a, a.return)), e.flags & 32)) {
          o = e.stateNode;
          try {
            dn(o, '');
          } catch (fe) {
            Ue(e, e.return, fe);
          }
        }
        (n & 4 &&
          e.stateNode != null &&
          ((o = e.memoizedProps), $c(e, o, a !== null ? a.memoizedProps : o)),
          n & 1024 && (Vc = !0));
        break;
      case 6:
        if ((Mt(t, e), Rt(e), n & 4)) {
          if (e.stateNode === null) throw Error(s(162));
          ((n = e.memoizedProps), (a = e.stateNode));
          try {
            a.nodeValue = n;
          } catch (fe) {
            Ue(e, e.return, fe);
          }
        }
        break;
      case 3:
        if (
          ((Er = null),
          (o = _l),
          (_l = Nr(t.containerInfo)),
          Mt(t, e),
          (_l = o),
          Rt(e),
          n & 4 && a !== null && a.memoizedState.isDehydrated)
        )
          try {
            $n(t.containerInfo);
          } catch (fe) {
            Ue(e, e.return, fe);
          }
        Vc && ((Vc = !1), Nf(e));
        break;
      case 4:
        ((n = _l), (_l = Nr(e.stateNode.containerInfo)), Mt(t, e), Rt(e), (_l = n));
        break;
      case 12:
        (Mt(t, e), Rt(e));
        break;
      case 31:
        (Mt(t, e),
          Rt(e),
          n & 4 && ((n = e.updateQueue), n !== null && ((e.updateQueue = null), mr(e, n))));
        break;
      case 13:
        (Mt(t, e),
          Rt(e),
          e.child.flags & 8192 &&
            (e.memoizedState !== null) != (a !== null && a.memoizedState !== null) &&
            (fr = Nt()),
          n & 4 && ((n = e.updateQueue), n !== null && ((e.updateQueue = null), mr(e, n))));
        break;
      case 22:
        o = e.memoizedState !== null;
        var T = a !== null && a.memoizedState !== null,
          U = $l,
          Q = mt;
        if ((($l = U || o), (mt = Q || T), Mt(t, e), (mt = Q), ($l = U), Rt(e), n & 8192))
          e: for (
            t = e.stateNode,
              t._visibility = o ? t._visibility & -2 : t._visibility | 1,
              o && (a === null || T || $l || mt || Ka(e)),
              a = null,
              t = e;
            ;
          ) {
            if (t.tag === 5 || t.tag === 26) {
              if (a === null) {
                T = a = t;
                try {
                  if (((c = T.stateNode), o))
                    ((f = c.style),
                      typeof f.setProperty == 'function'
                        ? f.setProperty('display', 'none', 'important')
                        : (f.display = 'none'));
                  else {
                    v = T.stateNode;
                    var W = T.memoizedProps.style,
                      G = W != null && W.hasOwnProperty('display') ? W.display : null;
                    v.style.display = G == null || typeof G == 'boolean' ? '' : ('' + G).trim();
                  }
                } catch (fe) {
                  Ue(T, T.return, fe);
                }
              }
            } else if (t.tag === 6) {
              if (a === null) {
                T = t;
                try {
                  T.stateNode.nodeValue = o ? '' : T.memoizedProps;
                } catch (fe) {
                  Ue(T, T.return, fe);
                }
              }
            } else if (t.tag === 18) {
              if (a === null) {
                T = t;
                try {
                  var Y = T.stateNode;
                  o ? pp(Y, !0) : pp(T.stateNode, !1);
                } catch (fe) {
                  Ue(T, T.return, fe);
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
          n !== null && ((a = n.retryQueue), a !== null && ((n.retryQueue = null), mr(e, a))));
        break;
      case 19:
        (Mt(t, e),
          Rt(e),
          n & 4 && ((n = e.updateQueue), n !== null && ((e.updateQueue = null), mr(e, n))));
        break;
      case 30:
        break;
      case 21:
        break;
      default:
        (Mt(t, e), Rt(e));
    }
  }
  function Rt(e) {
    var t = e.flags;
    if (t & 2) {
      try {
        for (var a, n = e.return; n !== null; ) {
          if (gf(n)) {
            a = n;
            break;
          }
          n = n.return;
        }
        if (a == null) throw Error(s(160));
        switch (a.tag) {
          case 27:
            var o = a.stateNode,
              c = Gc(e);
            dr(e, c, o);
            break;
          case 5:
            var f = a.stateNode;
            a.flags & 32 && (dn(f, ''), (a.flags &= -33));
            var v = Gc(e);
            dr(e, v, f);
            break;
          case 3:
          case 4:
            var T = a.stateNode.containerInfo,
              U = Gc(e);
            Yc(e, U, T);
            break;
          default:
            throw Error(s(161));
        }
      } catch (Q) {
        Ue(e, e.return, Q);
      }
      e.flags &= -3;
    }
    t & 4096 && (e.flags &= -4097);
  }
  function Nf(e) {
    if (e.subtreeFlags & 1024)
      for (e = e.child; e !== null; ) {
        var t = e;
        (Nf(t), t.tag === 5 && t.flags & 1024 && t.stateNode.reset(), (e = e.sibling));
      }
  }
  function Yl(e, t) {
    if (t.subtreeFlags & 8772)
      for (t = t.child; t !== null; ) (yf(e, t.alternate, t), (t = t.sibling));
  }
  function Ka(e) {
    for (e = e.child; e !== null; ) {
      var t = e;
      switch (t.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          (pa(4, t, t.return), Ka(t));
          break;
        case 1:
          Tl(t, t.return);
          var a = t.stateNode;
          (typeof a.componentWillUnmount == 'function' && pf(t, t.return, a), Ka(t));
          break;
        case 27:
          Ki(t.stateNode);
        case 26:
        case 5:
          (Tl(t, t.return), Ka(t));
          break;
        case 22:
          t.memoizedState === null && Ka(t);
          break;
        case 30:
          Ka(t);
          break;
        default:
          Ka(t);
      }
      e = e.sibling;
    }
  }
  function Vl(e, t, a) {
    for (a = a && (t.subtreeFlags & 8772) !== 0, t = t.child; t !== null; ) {
      var n = t.alternate,
        o = e,
        c = t,
        f = c.flags;
      switch (c.tag) {
        case 0:
        case 11:
        case 15:
          (Vl(o, c, a), Di(4, c));
          break;
        case 1:
          if ((Vl(o, c, a), (n = c), (o = n.stateNode), typeof o.componentDidMount == 'function'))
            try {
              o.componentDidMount();
            } catch (U) {
              Ue(n, n.return, U);
            }
          if (((n = c), (o = n.updateQueue), o !== null)) {
            var v = n.stateNode;
            try {
              var T = o.shared.hiddenCallbacks;
              if (T !== null)
                for (o.shared.hiddenCallbacks = null, o = 0; o < T.length; o++) l_(T[o], v);
            } catch (U) {
              Ue(n, n.return, U);
            }
          }
          (a && f & 64 && ff(c), zi(c, c.return));
          break;
        case 27:
          kf(c);
        case 26:
        case 5:
          (Vl(o, c, a), a && n === null && f & 4 && hf(c), zi(c, c.return));
          break;
        case 12:
          Vl(o, c, a);
          break;
        case 31:
          (Vl(o, c, a), a && f & 4 && Sf(o, c));
          break;
        case 13:
          (Vl(o, c, a), a && f & 4 && wf(o, c));
          break;
        case 22:
          (c.memoizedState === null && Vl(o, c, a), zi(c, c.return));
          break;
        case 30:
          break;
        default:
          Vl(o, c, a);
      }
      t = t.sibling;
    }
  }
  function Xc(e, t) {
    var a = null;
    (e !== null &&
      e.memoizedState !== null &&
      e.memoizedState.cachePool !== null &&
      (a = e.memoizedState.cachePool.pool),
      (e = null),
      t.memoizedState !== null &&
        t.memoizedState.cachePool !== null &&
        (e = t.memoizedState.cachePool.pool),
      e !== a && (e != null && e.refCount++, a != null && Ti(a)));
  }
  function Qc(e, t) {
    ((e = null),
      t.alternate !== null && (e = t.alternate.memoizedState.cache),
      (t = t.memoizedState.cache),
      t !== e && (t.refCount++, e != null && Ti(e)));
  }
  function fl(e, t, a, n) {
    if (t.subtreeFlags & 10256) for (t = t.child; t !== null; ) (jf(e, t, a, n), (t = t.sibling));
  }
  function jf(e, t, a, n) {
    var o = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        (fl(e, t, a, n), o & 2048 && Di(9, t));
        break;
      case 1:
        fl(e, t, a, n);
        break;
      case 3:
        (fl(e, t, a, n),
          o & 2048 &&
            ((e = null),
            t.alternate !== null && (e = t.alternate.memoizedState.cache),
            (t = t.memoizedState.cache),
            t !== e && (t.refCount++, e != null && Ti(e))));
        break;
      case 12:
        if (o & 2048) {
          (fl(e, t, a, n), (e = t.stateNode));
          try {
            var c = t.memoizedProps,
              f = c.id,
              v = c.onPostCommit;
            typeof v == 'function' &&
              v(f, t.alternate === null ? 'mount' : 'update', e.passiveEffectDuration, -0);
          } catch (T) {
            Ue(t, t.return, T);
          }
        } else fl(e, t, a, n);
        break;
      case 31:
        fl(e, t, a, n);
        break;
      case 13:
        fl(e, t, a, n);
        break;
      case 23:
        break;
      case 22:
        ((c = t.stateNode),
          (f = t.alternate),
          t.memoizedState !== null
            ? c._visibility & 2
              ? fl(e, t, a, n)
              : Hi(e, t)
            : c._visibility & 2
              ? fl(e, t, a, n)
              : ((c._visibility |= 2), Ln(e, t, a, n, (t.subtreeFlags & 10256) !== 0 || !1)),
          o & 2048 && Xc(f, t));
        break;
      case 24:
        (fl(e, t, a, n), o & 2048 && Qc(t.alternate, t));
        break;
      default:
        fl(e, t, a, n);
    }
  }
  function Ln(e, t, a, n, o) {
    for (o = o && ((t.subtreeFlags & 10256) !== 0 || !1), t = t.child; t !== null; ) {
      var c = e,
        f = t,
        v = a,
        T = n,
        U = f.flags;
      switch (f.tag) {
        case 0:
        case 11:
        case 15:
          (Ln(c, f, v, T, o), Di(8, f));
          break;
        case 23:
          break;
        case 22:
          var Q = f.stateNode;
          (f.memoizedState !== null
            ? Q._visibility & 2
              ? Ln(c, f, v, T, o)
              : Hi(c, f)
            : ((Q._visibility |= 2), Ln(c, f, v, T, o)),
            o && U & 2048 && Xc(f.alternate, f));
          break;
        case 24:
          (Ln(c, f, v, T, o), o && U & 2048 && Qc(f.alternate, f));
          break;
        default:
          Ln(c, f, v, T, o);
      }
      t = t.sibling;
    }
  }
  function Hi(e, t) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; ) {
        var a = e,
          n = t,
          o = n.flags;
        switch (n.tag) {
          case 22:
            (Hi(a, n), o & 2048 && Xc(n.alternate, n));
            break;
          case 24:
            (Hi(a, n), o & 2048 && Qc(n.alternate, n));
            break;
          default:
            Hi(a, n);
        }
        t = t.sibling;
      }
  }
  var Ui = 8192;
  function Bn(e, t, a) {
    if (e.subtreeFlags & Ui) for (e = e.child; e !== null; ) (Ef(e, t, a), (e = e.sibling));
  }
  function Ef(e, t, a) {
    switch (e.tag) {
      case 26:
        (Bn(e, t, a),
          e.flags & Ui && e.memoizedState !== null && dy(a, _l, e.memoizedState, e.memoizedProps));
        break;
      case 5:
        Bn(e, t, a);
        break;
      case 3:
      case 4:
        var n = _l;
        ((_l = Nr(e.stateNode.containerInfo)), Bn(e, t, a), (_l = n));
        break;
      case 22:
        e.memoizedState === null &&
          ((n = e.alternate),
          n !== null && n.memoizedState !== null
            ? ((n = Ui), (Ui = 16777216), Bn(e, t, a), (Ui = n))
            : Bn(e, t, a));
        break;
      default:
        Bn(e, t, a);
    }
  }
  function Cf(e) {
    var t = e.alternate;
    if (t !== null && ((e = t.child), e !== null)) {
      t.child = null;
      do ((t = e.sibling), (e.sibling = null), (e = t));
      while (e !== null);
    }
  }
  function $i(e) {
    var t = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (t !== null)
        for (var a = 0; a < t.length; a++) {
          var n = t[a];
          ((ht = n), Lf(n, e));
        }
      Cf(e);
    }
    if (e.subtreeFlags & 10256) for (e = e.child; e !== null; ) (Af(e), (e = e.sibling));
  }
  function Af(e) {
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        ($i(e), e.flags & 2048 && pa(9, e, e.return));
        break;
      case 3:
        $i(e);
        break;
      case 12:
        $i(e);
        break;
      case 22:
        var t = e.stateNode;
        e.memoizedState !== null && t._visibility & 2 && (e.return === null || e.return.tag !== 13)
          ? ((t._visibility &= -3), _r(e))
          : $i(e);
        break;
      default:
        $i(e);
    }
  }
  function _r(e) {
    var t = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (t !== null)
        for (var a = 0; a < t.length; a++) {
          var n = t[a];
          ((ht = n), Lf(n, e));
        }
      Cf(e);
    }
    for (e = e.child; e !== null; ) {
      switch (((t = e), t.tag)) {
        case 0:
        case 11:
        case 15:
          (pa(8, t, t.return), _r(t));
          break;
        case 22:
          ((a = t.stateNode), a._visibility & 2 && ((a._visibility &= -3), _r(t)));
          break;
        default:
          _r(t);
      }
      e = e.sibling;
    }
  }
  function Lf(e, t) {
    for (; ht !== null; ) {
      var a = ht;
      switch (a.tag) {
        case 0:
        case 11:
        case 15:
          pa(8, a, t);
          break;
        case 23:
        case 22:
          if (a.memoizedState !== null && a.memoizedState.cachePool !== null) {
            var n = a.memoizedState.cachePool.pool;
            n != null && n.refCount++;
          }
          break;
        case 24:
          Ti(a.memoizedState.cache);
      }
      if (((n = a.child), n !== null)) ((n.return = a), (ht = n));
      else
        e: for (a = e; ht !== null; ) {
          n = ht;
          var o = n.sibling,
            c = n.return;
          if ((bf(n), n === a)) {
            ht = null;
            break e;
          }
          if (o !== null) {
            ((o.return = c), (ht = o));
            break e;
          }
          ht = c;
        }
    }
  }
  var Nv = {
      getCacheForType: function (e) {
        var t = bt(ct),
          a = t.data.get(e);
        return (a === void 0 && ((a = e()), t.data.set(e, a)), a);
      },
      cacheSignal: function () {
        return bt(ct).controller.signal;
      },
    },
    jv = typeof WeakMap == 'function' ? WeakMap : Map,
    De = 0,
    Qe = null,
    Ce = null,
    Le = 0,
    He = 0,
    Yt = null,
    ha = !1,
    qn = !1,
    Kc = !1,
    Xl = 0,
    it = 0,
    ga = 0,
    Za = 0,
    Zc = 0,
    Vt = 0,
    In = 0,
    Gi = null,
    Dt = null,
    Jc = !1,
    fr = 0,
    Bf = 0,
    pr = 1 / 0,
    hr = null,
    ka = null,
    _t = 0,
    va = null,
    On = null,
    Ql = 0,
    Pc = 0,
    Fc = null,
    qf = null,
    Yi = 0,
    Wc = null;
  function Xt() {
    return (De & 2) !== 0 && Le !== 0 ? Le & -Le : R.T !== null ? iu() : Kd();
  }
  function If() {
    if (Vt === 0)
      if ((Le & 536870912) === 0 || qe) {
        var e = Ie;
        ((Ie <<= 1), (Ie & 3932160) === 0 && (Ie = 262144), (Vt = e));
      } else Vt = 536870912;
    return ((e = $t.current), e !== null && (e.flags |= 32), Vt);
  }
  function zt(e, t, a) {
    (((e === Qe && (He === 2 || He === 9)) || e.cancelPendingCommit !== null) &&
      (Mn(e, 0), ya(e, Le, Vt, !1)),
      di(e, a),
      ((De & 2) === 0 || e !== Qe) &&
        (e === Qe && ((De & 2) === 0 && (Za |= a), it === 4 && ya(e, Le, Vt, !1)), Nl(e)));
  }
  function Of(e, t, a) {
    if ((De & 6) !== 0) throw Error(s(327));
    var n = (!a && (t & 127) === 0 && (t & e.expiredLanes) === 0) || Jt(e, t),
      o = n ? Av(e, t) : tu(e, t, !0),
      c = n;
    do {
      if (o === 0) {
        qn && !n && ya(e, t, 0, !1);
        break;
      } else {
        if (((a = e.current.alternate), c && !Ev(a))) {
          ((o = tu(e, t, !1)), (c = !1));
          continue;
        }
        if (o === 2) {
          if (((c = t), e.errorRecoveryDisabledLanes & c)) var f = 0;
          else
            ((f = e.pendingLanes & -536870913), (f = f !== 0 ? f : f & 536870912 ? 536870912 : 0));
          if (f !== 0) {
            t = f;
            e: {
              var v = e;
              o = Gi;
              var T = v.current.memoizedState.isDehydrated;
              if ((T && (Mn(v, f).flags |= 256), (f = tu(v, f, !1)), f !== 2)) {
                if (Kc && !T) {
                  ((v.errorRecoveryDisabledLanes |= c), (Za |= c), (o = 4));
                  break e;
                }
                ((c = Dt), (Dt = o), c !== null && (Dt === null ? (Dt = c) : Dt.push.apply(Dt, c)));
              }
              o = f;
            }
            if (((c = !1), o !== 2)) continue;
          }
        }
        if (o === 1) {
          (Mn(e, 0), ya(e, t, 0, !0));
          break;
        }
        e: {
          switch (((n = e), (c = o), c)) {
            case 0:
            case 1:
              throw Error(s(345));
            case 4:
              if ((t & 4194048) !== t) break;
            case 6:
              ya(n, t, Vt, !ha);
              break e;
            case 2:
              Dt = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(s(329));
          }
          if ((t & 62914560) === t && ((o = fr + 300 - Nt()), 10 < o)) {
            if ((ya(n, t, Vt, !ha), Zt(n, 0, !0) !== 0)) break e;
            ((Ql = t),
              (n.timeoutHandle = mp(
                Mf.bind(null, n, a, Dt, hr, Jc, t, Vt, Za, In, ha, c, 'Throttled', -0, 0),
                o
              )));
            break e;
          }
          Mf(n, a, Dt, hr, Jc, t, Vt, Za, In, ha, c, null, -0, 0);
        }
      }
      break;
    } while (!0);
    Nl(e);
  }
  function Mf(e, t, a, n, o, c, f, v, T, U, Q, W, G, Y) {
    if (((e.timeoutHandle = -1), (W = t.subtreeFlags), W & 8192 || (W & 16785408) === 16785408)) {
      ((W = {
        stylesheets: null,
        count: 0,
        imgCount: 0,
        imgBytes: 0,
        suspenseyImages: [],
        waitingForImages: !0,
        waitingForViewTransition: !1,
        unsuspend: Bl,
      }),
        Ef(t, c, W));
      var fe = (c & 62914560) === c ? fr - Nt() : (c & 4194048) === c ? Bf - Nt() : 0;
      if (((fe = my(W, fe)), fe !== null)) {
        ((Ql = c),
          (e.cancelPendingCommit = fe(Yf.bind(null, e, t, c, a, n, o, f, v, T, Q, W, null, G, Y))),
          ya(e, c, f, !U));
        return;
      }
    }
    Yf(e, t, c, a, n, o, f, v, T);
  }
  function Ev(e) {
    for (var t = e; ; ) {
      var a = t.tag;
      if (
        (a === 0 || a === 11 || a === 15) &&
        t.flags & 16384 &&
        ((a = t.updateQueue), a !== null && ((a = a.stores), a !== null))
      )
        for (var n = 0; n < a.length; n++) {
          var o = a[n],
            c = o.getSnapshot;
          o = o.value;
          try {
            if (!Ht(c(), o)) return !1;
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
  function ya(e, t, a, n) {
    ((t &= ~Zc),
      (t &= ~Za),
      (e.suspendedLanes |= t),
      (e.pingedLanes &= ~t),
      n && (e.warmLanes |= t),
      (n = e.expirationTimes));
    for (var o = t; 0 < o; ) {
      var c = 31 - Et(o),
        f = 1 << c;
      ((n[c] = -1), (o &= ~f));
    }
    a !== 0 && Vd(e, a, t);
  }
  function gr() {
    return (De & 6) === 0 ? (Vi(0), !1) : !0;
  }
  function eu() {
    if (Ce !== null) {
      if (He === 0) var e = Ce.return;
      else ((e = Ce), (Ml = Ha = null), hc(e), (Nn = null), (ji = 0), (e = Ce));
      for (; e !== null; ) (_f(e.alternate, e), (e = e.return));
      Ce = null;
    }
  }
  function Mn(e, t) {
    var a = e.timeoutHandle;
    (a !== -1 && ((e.timeoutHandle = -1), Kv(a)),
      (a = e.cancelPendingCommit),
      a !== null && ((e.cancelPendingCommit = null), a()),
      (Ql = 0),
      eu(),
      (Qe = e),
      (Ce = a = Il(e.current, null)),
      (Le = t),
      (He = 0),
      (Yt = null),
      (ha = !1),
      (qn = Jt(e, t)),
      (Kc = !1),
      (In = Vt = Zc = Za = ga = it = 0),
      (Dt = Gi = null),
      (Jc = !1),
      (t & 8) !== 0 && (t |= t & 32));
    var n = e.entangledLanes;
    if (n !== 0)
      for (e = e.entanglements, n &= t; 0 < n; ) {
        var o = 31 - Et(n),
          c = 1 << o;
        ((t |= e[o]), (n &= ~c));
      }
    return ((Xl = t), Ds(), a);
  }
  function Rf(e, t) {
    ((Ne = null),
      (R.H = Oi),
      t === Tn || t === Xs
        ? ((t = Fm()), (He = 3))
        : t === nc
          ? ((t = Fm()), (He = 4))
          : (He =
              t === Bc
                ? 8
                : t !== null && typeof t == 'object' && typeof t.then == 'function'
                  ? 6
                  : 1),
      (Yt = t),
      Ce === null && ((it = 1), sr(e, el(t, e.current))));
  }
  function Df() {
    var e = $t.current;
    return e === null
      ? !0
      : (Le & 4194048) === Le
        ? nl === null
        : (Le & 62914560) === Le || (Le & 536870912) !== 0
          ? e === nl
          : !1;
  }
  function zf() {
    var e = R.H;
    return ((R.H = Oi), e === null ? Oi : e);
  }
  function Hf() {
    var e = R.A;
    return ((R.A = Nv), e);
  }
  function kr() {
    ((it = 4),
      ha || ((Le & 4194048) !== Le && $t.current !== null) || (qn = !0),
      ((ga & 134217727) === 0 && (Za & 134217727) === 0) || Qe === null || ya(Qe, Le, Vt, !1));
  }
  function tu(e, t, a) {
    var n = De;
    De |= 2;
    var o = zf(),
      c = Hf();
    ((Qe !== e || Le !== t) && ((hr = null), Mn(e, t)), (t = !1));
    var f = it;
    e: do
      try {
        if (He !== 0 && Ce !== null) {
          var v = Ce,
            T = Yt;
          switch (He) {
            case 8:
              (eu(), (f = 6));
              break e;
            case 3:
            case 2:
            case 9:
            case 6:
              $t.current === null && (t = !0);
              var U = He;
              if (((He = 0), (Yt = null), Rn(e, v, T, U), a && qn)) {
                f = 0;
                break e;
              }
              break;
            default:
              ((U = He), (He = 0), (Yt = null), Rn(e, v, T, U));
          }
        }
        (Cv(), (f = it));
        break;
      } catch (Q) {
        Rf(e, Q);
      }
    while (!0);
    return (
      t && e.shellSuspendCounter++,
      (Ml = Ha = null),
      (De = n),
      (R.H = o),
      (R.A = c),
      Ce === null && ((Qe = null), (Le = 0), Ds()),
      f
    );
  }
  function Cv() {
    for (; Ce !== null; ) Uf(Ce);
  }
  function Av(e, t) {
    var a = De;
    De |= 2;
    var n = zf(),
      o = Hf();
    Qe !== e || Le !== t ? ((hr = null), (pr = Nt() + 500), Mn(e, t)) : (qn = Jt(e, t));
    e: do
      try {
        if (He !== 0 && Ce !== null) {
          t = Ce;
          var c = Yt;
          t: switch (He) {
            case 1:
              ((He = 0), (Yt = null), Rn(e, t, c, 1));
              break;
            case 2:
            case 9:
              if (Jm(c)) {
                ((He = 0), (Yt = null), $f(t));
                break;
              }
              ((t = function () {
                ((He !== 2 && He !== 9) || Qe !== e || (He = 7), Nl(e));
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
              Jm(c) ? ((He = 0), (Yt = null), $f(t)) : ((He = 0), (Yt = null), Rn(e, t, c, 7));
              break;
            case 5:
              var f = null;
              switch (Ce.tag) {
                case 26:
                  f = Ce.memoizedState;
                case 5:
                case 27:
                  var v = Ce;
                  if (f ? jp(f) : v.stateNode.complete) {
                    ((He = 0), (Yt = null));
                    var T = v.sibling;
                    if (T !== null) Ce = T;
                    else {
                      var U = v.return;
                      U !== null ? ((Ce = U), vr(U)) : (Ce = null);
                    }
                    break t;
                  }
              }
              ((He = 0), (Yt = null), Rn(e, t, c, 5));
              break;
            case 6:
              ((He = 0), (Yt = null), Rn(e, t, c, 6));
              break;
            case 8:
              (eu(), (it = 6));
              break e;
            default:
              throw Error(s(462));
          }
        }
        Lv();
        break;
      } catch (Q) {
        Rf(e, Q);
      }
    while (!0);
    return (
      (Ml = Ha = null),
      (R.H = n),
      (R.A = o),
      (De = a),
      Ce !== null ? 0 : ((Qe = null), (Le = 0), Ds(), it)
    );
  }
  function Lv() {
    for (; Ce !== null && !ln(); ) Uf(Ce);
  }
  function Uf(e) {
    var t = df(e.alternate, e, Xl);
    ((e.memoizedProps = e.pendingProps), t === null ? vr(e) : (Ce = t));
  }
  function $f(e) {
    var t = e,
      a = t.alternate;
    switch (t.tag) {
      case 15:
      case 0:
        t = nf(a, t, t.pendingProps, t.type, void 0, Le);
        break;
      case 11:
        t = nf(a, t, t.pendingProps, t.type.render, t.ref, Le);
        break;
      case 5:
        hc(t);
      default:
        (_f(a, t), (t = Ce = zm(t, Xl)), (t = df(a, t, Xl)));
    }
    ((e.memoizedProps = e.pendingProps), t === null ? vr(e) : (Ce = t));
  }
  function Rn(e, t, a, n) {
    ((Ml = Ha = null), hc(t), (Nn = null), (ji = 0));
    var o = t.return;
    try {
      if (vv(e, o, t, a, Le)) {
        ((it = 1), sr(e, el(a, e.current)), (Ce = null));
        return;
      }
    } catch (c) {
      if (o !== null) throw ((Ce = o), c);
      ((it = 1), sr(e, el(a, e.current)), (Ce = null));
      return;
    }
    t.flags & 32768
      ? (qe || n === 1
          ? (e = !0)
          : qn || (Le & 536870912) !== 0
            ? (e = !1)
            : ((ha = e = !0),
              (n === 2 || n === 9 || n === 3 || n === 6) &&
                ((n = $t.current), n !== null && n.tag === 13 && (n.flags |= 16384))),
        Gf(t, e))
      : vr(t);
  }
  function vr(e) {
    var t = e;
    do {
      if ((t.flags & 32768) !== 0) {
        Gf(t, ha);
        return;
      }
      e = t.return;
      var a = xv(t.alternate, t, Xl);
      if (a !== null) {
        Ce = a;
        return;
      }
      if (((t = t.sibling), t !== null)) {
        Ce = t;
        return;
      }
      Ce = t = e;
    } while (t !== null);
    it === 0 && (it = 5);
  }
  function Gf(e, t) {
    do {
      var a = Sv(e.alternate, e);
      if (a !== null) {
        ((a.flags &= 32767), (Ce = a));
        return;
      }
      if (
        ((a = e.return),
        a !== null && ((a.flags |= 32768), (a.subtreeFlags = 0), (a.deletions = null)),
        !t && ((e = e.sibling), e !== null))
      ) {
        Ce = e;
        return;
      }
      Ce = e = a;
    } while (e !== null);
    ((it = 6), (Ce = null));
  }
  function Yf(e, t, a, n, o, c, f, v, T) {
    e.cancelPendingCommit = null;
    do yr();
    while (_t !== 0);
    if ((De & 6) !== 0) throw Error(s(327));
    if (t !== null) {
      if (t === e.current) throw Error(s(177));
      if (
        ((c = t.lanes | t.childLanes),
        (c |= Go),
        uk(e, a, c, f, v, T),
        e === Qe && ((Ce = Qe = null), (Le = 0)),
        (On = t),
        (va = e),
        (Ql = a),
        (Pc = c),
        (Fc = o),
        (qf = n),
        (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0
          ? ((e.callbackNode = null),
            (e.callbackPriority = 0),
            Ov(an, function () {
              return (Zf(), null);
            }))
          : ((e.callbackNode = null), (e.callbackPriority = 0)),
        (n = (t.flags & 13878) !== 0),
        (t.subtreeFlags & 13878) !== 0 || n)
      ) {
        ((n = R.T), (R.T = null), (o = ee.p), (ee.p = 2), (f = De), (De |= 4));
        try {
          wv(e, t, a);
        } finally {
          ((De = f), (ee.p = o), (R.T = n));
        }
      }
      ((_t = 1), Vf(), Xf(), Qf());
    }
  }
  function Vf() {
    if (_t === 1) {
      _t = 0;
      var e = va,
        t = On,
        a = (t.flags & 13878) !== 0;
      if ((t.subtreeFlags & 13878) !== 0 || a) {
        ((a = R.T), (R.T = null));
        var n = ee.p;
        ee.p = 2;
        var o = De;
        De |= 4;
        try {
          Tf(t, e);
          var c = _u,
            f = Am(e.containerInfo),
            v = c.focusedElem,
            T = c.selectionRange;
          if (f !== v && v && v.ownerDocument && Cm(v.ownerDocument.documentElement, v)) {
            if (T !== null && Do(v)) {
              var U = T.start,
                Q = T.end;
              if ((Q === void 0 && (Q = U), 'selectionStart' in v))
                ((v.selectionStart = U), (v.selectionEnd = Math.min(Q, v.value.length)));
              else {
                var W = v.ownerDocument || document,
                  G = (W && W.defaultView) || window;
                if (G.getSelection) {
                  var Y = G.getSelection(),
                    fe = v.textContent.length,
                    xe = Math.min(T.start, fe),
                    Ye = T.end === void 0 ? xe : Math.min(T.end, fe);
                  !Y.extend && xe > Ye && ((f = Ye), (Ye = xe), (xe = f));
                  var O = Em(v, xe),
                    E = Em(v, Ye);
                  if (
                    O &&
                    E &&
                    (Y.rangeCount !== 1 ||
                      Y.anchorNode !== O.node ||
                      Y.anchorOffset !== O.offset ||
                      Y.focusNode !== E.node ||
                      Y.focusOffset !== E.offset)
                  ) {
                    var H = W.createRange();
                    (H.setStart(O.node, O.offset),
                      Y.removeAllRanges(),
                      xe > Ye
                        ? (Y.addRange(H), Y.extend(E.node, E.offset))
                        : (H.setEnd(E.node, E.offset), Y.addRange(H)));
                  }
                }
              }
            }
            for (W = [], Y = v; (Y = Y.parentNode); )
              Y.nodeType === 1 && W.push({ element: Y, left: Y.scrollLeft, top: Y.scrollTop });
            for (typeof v.focus == 'function' && v.focus(), v = 0; v < W.length; v++) {
              var P = W[v];
              ((P.element.scrollLeft = P.left), (P.element.scrollTop = P.top));
            }
          }
          ((Br = !!mu), (_u = mu = null));
        } finally {
          ((De = o), (ee.p = n), (R.T = a));
        }
      }
      ((e.current = t), (_t = 2));
    }
  }
  function Xf() {
    if (_t === 2) {
      _t = 0;
      var e = va,
        t = On,
        a = (t.flags & 8772) !== 0;
      if ((t.subtreeFlags & 8772) !== 0 || a) {
        ((a = R.T), (R.T = null));
        var n = ee.p;
        ee.p = 2;
        var o = De;
        De |= 4;
        try {
          yf(e, t.alternate, t);
        } finally {
          ((De = o), (ee.p = n), (R.T = a));
        }
      }
      _t = 3;
    }
  }
  function Qf() {
    if (_t === 4 || _t === 3) {
      ((_t = 0), ws());
      var e = va,
        t = On,
        a = Ql,
        n = qf;
      (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0
        ? (_t = 5)
        : ((_t = 0), (On = va = null), Kf(e, e.pendingLanes));
      var o = e.pendingLanes;
      if (
        (o === 0 && (ka = null),
        vo(a),
        (t = t.stateNode),
        jt && typeof jt.onCommitFiberRoot == 'function')
      )
        try {
          jt.onCommitFiberRoot(aa, t, void 0, (t.current.flags & 128) === 128);
        } catch {}
      if (n !== null) {
        ((t = R.T), (o = ee.p), (ee.p = 2), (R.T = null));
        try {
          for (var c = e.onRecoverableError, f = 0; f < n.length; f++) {
            var v = n[f];
            c(v.value, { componentStack: v.stack });
          }
        } finally {
          ((R.T = t), (ee.p = o));
        }
      }
      ((Ql & 3) !== 0 && yr(),
        Nl(e),
        (o = e.pendingLanes),
        (a & 261930) !== 0 && (o & 42) !== 0 ? (e === Wc ? Yi++ : ((Yi = 0), (Wc = e))) : (Yi = 0),
        Vi(0));
    }
  }
  function Kf(e, t) {
    (e.pooledCacheLanes &= t) === 0 &&
      ((t = e.pooledCache), t != null && ((e.pooledCache = null), Ti(t)));
  }
  function yr() {
    return (Vf(), Xf(), Qf(), Zf());
  }
  function Zf() {
    if (_t !== 5) return !1;
    var e = va,
      t = Pc;
    Pc = 0;
    var a = vo(Ql),
      n = R.T,
      o = ee.p;
    try {
      ((ee.p = 32 > a ? 32 : a), (R.T = null), (a = Fc), (Fc = null));
      var c = va,
        f = Ql;
      if (((_t = 0), (On = va = null), (Ql = 0), (De & 6) !== 0)) throw Error(s(331));
      var v = De;
      if (
        ((De |= 4),
        Af(c.current),
        jf(c, c.current, f, a),
        (De = v),
        Vi(0, !1),
        jt && typeof jt.onPostCommitFiberRoot == 'function')
      )
        try {
          jt.onPostCommitFiberRoot(aa, c);
        } catch {}
      return !0;
    } finally {
      ((ee.p = o), (R.T = n), Kf(e, t));
    }
  }
  function Jf(e, t, a) {
    ((t = el(a, t)),
      (t = Lc(e.stateNode, t, 2)),
      (e = ma(e, t, 2)),
      e !== null && (di(e, 2), Nl(e)));
  }
  function Ue(e, t, a) {
    if (e.tag === 3) Jf(e, e, a);
    else
      for (; t !== null; ) {
        if (t.tag === 3) {
          Jf(t, e, a);
          break;
        } else if (t.tag === 1) {
          var n = t.stateNode;
          if (
            typeof t.type.getDerivedStateFromError == 'function' ||
            (typeof n.componentDidCatch == 'function' && (ka === null || !ka.has(n)))
          ) {
            ((e = el(a, e)),
              (a = J_(2)),
              (n = ma(t, a, 2)),
              n !== null && (P_(a, n, t, e), di(n, 2), Nl(n)));
            break;
          }
        }
        t = t.return;
      }
  }
  function lu(e, t, a) {
    var n = e.pingCache;
    if (n === null) {
      n = e.pingCache = new jv();
      var o = new Set();
      n.set(t, o);
    } else ((o = n.get(t)), o === void 0 && ((o = new Set()), n.set(t, o)));
    o.has(a) || ((Kc = !0), o.add(a), (e = Bv.bind(null, e, t, a)), t.then(e, e));
  }
  function Bv(e, t, a) {
    var n = e.pingCache;
    (n !== null && n.delete(t),
      (e.pingedLanes |= e.suspendedLanes & a),
      (e.warmLanes &= ~a),
      Qe === e &&
        (Le & a) === a &&
        (it === 4 || (it === 3 && (Le & 62914560) === Le && 300 > Nt() - fr)
          ? (De & 2) === 0 && Mn(e, 0)
          : (Zc |= a),
        In === Le && (In = 0)),
      Nl(e));
  }
  function Pf(e, t) {
    (t === 0 && (t = ui()), (e = Ra(e, t)), e !== null && (di(e, t), Nl(e)));
  }
  function qv(e) {
    var t = e.memoizedState,
      a = 0;
    (t !== null && (a = t.retryLane), Pf(e, a));
  }
  function Iv(e, t) {
    var a = 0;
    switch (e.tag) {
      case 31:
      case 13:
        var n = e.stateNode,
          o = e.memoizedState;
        o !== null && (a = o.retryLane);
        break;
      case 19:
        n = e.stateNode;
        break;
      case 22:
        n = e.stateNode._retryCache;
        break;
      default:
        throw Error(s(314));
    }
    (n !== null && n.delete(t), Pf(e, a));
  }
  function Ov(e, t) {
    return oi(e, t);
  }
  var br = null,
    Dn = null,
    au = !1,
    xr = !1,
    nu = !1,
    ba = 0;
  function Nl(e) {
    (e !== Dn && e.next === null && (Dn === null ? (br = Dn = e) : (Dn = Dn.next = e)),
      (xr = !0),
      au || ((au = !0), Rv()));
  }
  function Vi(e, t) {
    if (!nu && xr) {
      nu = !0;
      do
        for (var a = !1, n = br; n !== null; ) {
          if (e !== 0) {
            var o = n.pendingLanes;
            if (o === 0) var c = 0;
            else {
              var f = n.suspendedLanes,
                v = n.pingedLanes;
              ((c = (1 << (31 - Et(42 | e) + 1)) - 1),
                (c &= o & ~(f & ~v)),
                (c = c & 201326741 ? (c & 201326741) | 1 : c ? c | 2 : 0));
            }
            c !== 0 && ((a = !0), tp(n, c));
          } else
            ((c = Le),
              (c = Zt(
                n,
                n === Qe ? c : 0,
                n.cancelPendingCommit !== null || n.timeoutHandle !== -1
              )),
              (c & 3) === 0 || Jt(n, c) || ((a = !0), tp(n, c)));
          n = n.next;
        }
      while (a);
      nu = !1;
    }
  }
  function Mv() {
    Ff();
  }
  function Ff() {
    xr = au = !1;
    var e = 0;
    ba !== 0 && Qv() && (e = ba);
    for (var t = Nt(), a = null, n = br; n !== null; ) {
      var o = n.next,
        c = Wf(n, t);
      (c === 0
        ? ((n.next = null), a === null ? (br = o) : (a.next = o), o === null && (Dn = a))
        : ((a = n), (e !== 0 || (c & 3) !== 0) && (xr = !0)),
        (n = o));
    }
    ((_t !== 0 && _t !== 5) || Vi(e), ba !== 0 && (ba = 0));
  }
  function Wf(e, t) {
    for (
      var a = e.suspendedLanes,
        n = e.pingedLanes,
        o = e.expirationTimes,
        c = e.pendingLanes & -62914561;
      0 < c;
    ) {
      var f = 31 - Et(c),
        v = 1 << f,
        T = o[f];
      (T === -1
        ? ((v & a) === 0 || (v & n) !== 0) && (o[f] = ho(v, t))
        : T <= t && (e.expiredLanes |= v),
        (c &= ~v));
    }
    if (
      ((t = Qe),
      (a = Le),
      (a = Zt(e, e === t ? a : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== -1)),
      (n = e.callbackNode),
      a === 0 || (e === t && (He === 2 || He === 9)) || e.cancelPendingCommit !== null)
    )
      return (n !== null && n !== null && Ba(n), (e.callbackNode = null), (e.callbackPriority = 0));
    if ((a & 3) === 0 || Jt(e, a)) {
      if (((t = a & -a), t === e.callbackPriority)) return t;
      switch ((n !== null && Ba(n), vo(a))) {
        case 2:
        case 8:
          a = Al;
          break;
        case 32:
          a = an;
          break;
        case 268435456:
          a = ci;
          break;
        default:
          a = an;
      }
      return (
        (n = ep.bind(null, e)),
        (a = oi(a, n)),
        (e.callbackPriority = t),
        (e.callbackNode = a),
        t
      );
    }
    return (
      n !== null && n !== null && Ba(n),
      (e.callbackPriority = 2),
      (e.callbackNode = null),
      2
    );
  }
  function ep(e, t) {
    if (_t !== 0 && _t !== 5) return ((e.callbackNode = null), (e.callbackPriority = 0), null);
    var a = e.callbackNode;
    if (yr() && e.callbackNode !== a) return null;
    var n = Le;
    return (
      (n = Zt(e, e === Qe ? n : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== -1)),
      n === 0
        ? null
        : (Of(e, n, t),
          Wf(e, Nt()),
          e.callbackNode != null && e.callbackNode === a ? ep.bind(null, e) : null)
    );
  }
  function tp(e, t) {
    if (yr()) return null;
    Of(e, t, !0);
  }
  function Rv() {
    Zv(function () {
      (De & 6) !== 0 ? oi(st, Mv) : Ff();
    });
  }
  function iu() {
    if (ba === 0) {
      var e = Sn;
      (e === 0 && ((e = re), (re <<= 1), (re & 261888) === 0 && (re = 256)), (ba = e));
    }
    return ba;
  }
  function lp(e) {
    return e == null || typeof e == 'symbol' || typeof e == 'boolean'
      ? null
      : typeof e == 'function'
        ? e
        : As('' + e);
  }
  function ap(e, t) {
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
  function Dv(e, t, a, n, o) {
    if (t === 'submit' && a && a.stateNode === o) {
      var c = lp((o[qt] || null).action),
        f = n.submitter;
      f &&
        ((t = (t = f[qt] || null) ? lp(t.formAction) : f.getAttribute('formAction')),
        t !== null && ((c = t), (f = null)));
      var v = new Is('action', 'action', null, n, o);
      e.push({
        event: v,
        listeners: [
          {
            instance: null,
            listener: function () {
              if (n.defaultPrevented) {
                if (ba !== 0) {
                  var T = f ? ap(o, f) : new FormData(o);
                  Tc(a, { pending: !0, data: T, method: o.method, action: c }, null, T);
                }
              } else
                typeof c == 'function' &&
                  (v.preventDefault(),
                  (T = f ? ap(o, f) : new FormData(o)),
                  Tc(a, { pending: !0, data: T, method: o.method, action: c }, c, T));
            },
            currentTarget: o,
          },
        ],
      });
    }
  }
  for (var su = 0; su < $o.length; su++) {
    var ru = $o[su],
      zv = ru.toLowerCase(),
      Hv = ru[0].toUpperCase() + ru.slice(1);
    ml(zv, 'on' + Hv);
  }
  (ml(qm, 'onAnimationEnd'),
    ml(Im, 'onAnimationIteration'),
    ml(Om, 'onAnimationStart'),
    ml('dblclick', 'onDoubleClick'),
    ml('focusin', 'onFocus'),
    ml('focusout', 'onBlur'),
    ml(lv, 'onTransitionRun'),
    ml(av, 'onTransitionStart'),
    ml(nv, 'onTransitionCancel'),
    ml(Mm, 'onTransitionEnd'),
    cn('onMouseEnter', ['mouseout', 'mouseover']),
    cn('onMouseLeave', ['mouseout', 'mouseover']),
    cn('onPointerEnter', ['pointerout', 'pointerover']),
    cn('onPointerLeave', ['pointerout', 'pointerover']),
    qa('onChange', 'change click focusin focusout input keydown keyup selectionchange'.split(' ')),
    qa(
      'onSelect',
      'focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange'.split(
        ' '
      )
    ),
    qa('onBeforeInput', ['compositionend', 'keypress', 'textInput', 'paste']),
    qa('onCompositionEnd', 'compositionend focusout keydown keypress keyup mousedown'.split(' ')),
    qa(
      'onCompositionStart',
      'compositionstart focusout keydown keypress keyup mousedown'.split(' ')
    ),
    qa(
      'onCompositionUpdate',
      'compositionupdate focusout keydown keypress keyup mousedown'.split(' ')
    ));
  var Xi =
      'abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting'.split(
        ' '
      ),
    Uv = new Set(
      'beforetoggle cancel close invalid load scroll scrollend toggle'.split(' ').concat(Xi)
    );
  function np(e, t) {
    t = (t & 4) !== 0;
    for (var a = 0; a < e.length; a++) {
      var n = e[a],
        o = n.event;
      n = n.listeners;
      e: {
        var c = void 0;
        if (t)
          for (var f = n.length - 1; 0 <= f; f--) {
            var v = n[f],
              T = v.instance,
              U = v.currentTarget;
            if (((v = v.listener), T !== c && o.isPropagationStopped())) break e;
            ((c = v), (o.currentTarget = U));
            try {
              c(o);
            } catch (Q) {
              Rs(Q);
            }
            ((o.currentTarget = null), (c = T));
          }
        else
          for (f = 0; f < n.length; f++) {
            if (
              ((v = n[f]),
              (T = v.instance),
              (U = v.currentTarget),
              (v = v.listener),
              T !== c && o.isPropagationStopped())
            )
              break e;
            ((c = v), (o.currentTarget = U));
            try {
              c(o);
            } catch (Q) {
              Rs(Q);
            }
            ((o.currentTarget = null), (c = T));
          }
      }
    }
  }
  function Ae(e, t) {
    var a = t[yo];
    a === void 0 && (a = t[yo] = new Set());
    var n = e + '__bubble';
    a.has(n) || (ip(t, e, 2, !1), a.add(n));
  }
  function ou(e, t, a) {
    var n = 0;
    (t && (n |= 4), ip(a, e, n, t));
  }
  var Sr = '_reactListening' + Math.random().toString(36).slice(2);
  function cu(e) {
    if (!e[Sr]) {
      ((e[Sr] = !0),
        Pd.forEach(function (a) {
          a !== 'selectionchange' && (Uv.has(a) || ou(a, !1, e), ou(a, !0, e));
        }));
      var t = e.nodeType === 9 ? e : e.ownerDocument;
      t === null || t[Sr] || ((t[Sr] = !0), ou('selectionchange', !1, t));
    }
  }
  function ip(e, t, a, n) {
    switch (Ip(t)) {
      case 2:
        var o = py;
        break;
      case 8:
        o = hy;
        break;
      default:
        o = wu;
    }
    ((a = o.bind(null, t, a, e)),
      (o = void 0),
      !Co || (t !== 'touchstart' && t !== 'touchmove' && t !== 'wheel') || (o = !0),
      n
        ? o !== void 0
          ? e.addEventListener(t, a, { capture: !0, passive: o })
          : e.addEventListener(t, a, !0)
        : o !== void 0
          ? e.addEventListener(t, a, { passive: o })
          : e.addEventListener(t, a, !1));
  }
  function uu(e, t, a, n, o) {
    var c = n;
    if ((t & 1) === 0 && (t & 2) === 0 && n !== null)
      e: for (;;) {
        if (n === null) return;
        var f = n.tag;
        if (f === 3 || f === 4) {
          var v = n.stateNode.containerInfo;
          if (v === o) break;
          if (f === 4)
            for (f = n.return; f !== null; ) {
              var T = f.tag;
              if ((T === 3 || T === 4) && f.stateNode.containerInfo === o) return;
              f = f.return;
            }
          for (; v !== null; ) {
            if (((f = sn(v)), f === null)) return;
            if (((T = f.tag), T === 5 || T === 6 || T === 26 || T === 27)) {
              n = c = f;
              continue e;
            }
            v = v.parentNode;
          }
        }
        n = n.return;
      }
    cm(function () {
      var U = c,
        Q = jo(a),
        W = [];
      e: {
        var G = Rm.get(e);
        if (G !== void 0) {
          var Y = Is,
            fe = e;
          switch (e) {
            case 'keypress':
              if (Bs(a) === 0) break e;
            case 'keydown':
            case 'keyup':
              Y = Ik;
              break;
            case 'focusin':
              ((fe = 'focus'), (Y = qo));
              break;
            case 'focusout':
              ((fe = 'blur'), (Y = qo));
              break;
            case 'beforeblur':
            case 'afterblur':
              Y = qo;
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
              Y = mm;
              break;
            case 'drag':
            case 'dragend':
            case 'dragenter':
            case 'dragexit':
            case 'dragleave':
            case 'dragover':
            case 'dragstart':
            case 'drop':
              Y = xk;
              break;
            case 'touchcancel':
            case 'touchend':
            case 'touchmove':
            case 'touchstart':
              Y = Rk;
              break;
            case qm:
            case Im:
            case Om:
              Y = Tk;
              break;
            case Mm:
              Y = zk;
              break;
            case 'scroll':
            case 'scrollend':
              Y = yk;
              break;
            case 'wheel':
              Y = Uk;
              break;
            case 'copy':
            case 'cut':
            case 'paste':
              Y = jk;
              break;
            case 'gotpointercapture':
            case 'lostpointercapture':
            case 'pointercancel':
            case 'pointerdown':
            case 'pointermove':
            case 'pointerout':
            case 'pointerover':
            case 'pointerup':
              Y = fm;
              break;
            case 'toggle':
            case 'beforetoggle':
              Y = Gk;
          }
          var xe = (t & 4) !== 0,
            Ye = !xe && (e === 'scroll' || e === 'scrollend'),
            O = xe ? (G !== null ? G + 'Capture' : null) : G;
          xe = [];
          for (var E = U, H; E !== null; ) {
            var P = E;
            if (
              ((H = P.stateNode),
              (P = P.tag),
              (P !== 5 && P !== 26 && P !== 27) ||
                H === null ||
                O === null ||
                ((P = fi(E, O)), P != null && xe.push(Qi(E, P, H))),
              Ye)
            )
              break;
            E = E.return;
          }
          0 < xe.length && ((G = new Y(G, fe, null, a, Q)), W.push({ event: G, listeners: xe }));
        }
      }
      if ((t & 7) === 0) {
        e: {
          if (
            ((G = e === 'mouseover' || e === 'pointerover'),
            (Y = e === 'mouseout' || e === 'pointerout'),
            G && a !== No && (fe = a.relatedTarget || a.fromElement) && (sn(fe) || fe[nn]))
          )
            break e;
          if (
            (Y || G) &&
            ((G =
              Q.window === Q
                ? Q
                : (G = Q.ownerDocument)
                  ? G.defaultView || G.parentWindow
                  : window),
            Y
              ? ((fe = a.relatedTarget || a.toElement),
                (Y = U),
                (fe = fe ? sn(fe) : null),
                fe !== null &&
                  ((Ye = m(fe)), (xe = fe.tag), fe !== Ye || (xe !== 5 && xe !== 27 && xe !== 6)) &&
                  (fe = null))
              : ((Y = null), (fe = U)),
            Y !== fe)
          ) {
            if (
              ((xe = mm),
              (P = 'onMouseLeave'),
              (O = 'onMouseEnter'),
              (E = 'mouse'),
              (e === 'pointerout' || e === 'pointerover') &&
                ((xe = fm), (P = 'onPointerLeave'), (O = 'onPointerEnter'), (E = 'pointer')),
              (Ye = Y == null ? G : _i(Y)),
              (H = fe == null ? G : _i(fe)),
              (G = new xe(P, E + 'leave', Y, a, Q)),
              (G.target = Ye),
              (G.relatedTarget = H),
              (P = null),
              sn(Q) === U &&
                ((xe = new xe(O, E + 'enter', fe, a, Q)),
                (xe.target = H),
                (xe.relatedTarget = Ye),
                (P = xe)),
              (Ye = P),
              Y && fe)
            )
              t: {
                for (xe = $v, O = Y, E = fe, H = 0, P = O; P; P = xe(P)) H++;
                P = 0;
                for (var ve = E; ve; ve = xe(ve)) P++;
                for (; 0 < H - P; ) ((O = xe(O)), H--);
                for (; 0 < P - H; ) ((E = xe(E)), P--);
                for (; H--; ) {
                  if (O === E || (E !== null && O === E.alternate)) {
                    xe = O;
                    break t;
                  }
                  ((O = xe(O)), (E = xe(E)));
                }
                xe = null;
              }
            else xe = null;
            (Y !== null && sp(W, G, Y, xe, !1),
              fe !== null && Ye !== null && sp(W, Ye, fe, xe, !0));
          }
        }
        e: {
          if (
            ((G = U ? _i(U) : window),
            (Y = G.nodeName && G.nodeName.toLowerCase()),
            Y === 'select' || (Y === 'input' && G.type === 'file'))
          )
            var Me = xm;
          else if (ym(G))
            if (Sm) Me = Wk;
            else {
              Me = Pk;
              var he = Jk;
            }
          else
            ((Y = G.nodeName),
              !Y || Y.toLowerCase() !== 'input' || (G.type !== 'checkbox' && G.type !== 'radio')
                ? U && To(U.elementType) && (Me = xm)
                : (Me = Fk));
          if (Me && (Me = Me(e, U))) {
            bm(W, Me, a, Q);
            break e;
          }
          (he && he(e, G, U),
            e === 'focusout' &&
              U &&
              G.type === 'number' &&
              U.memoizedProps.value != null &&
              wo(G, 'number', G.value));
        }
        switch (((he = U ? _i(U) : window), e)) {
          case 'focusin':
            (ym(he) || he.contentEditable === 'true') && ((pn = he), (zo = U), (xi = null));
            break;
          case 'focusout':
            xi = zo = pn = null;
            break;
          case 'mousedown':
            Ho = !0;
            break;
          case 'contextmenu':
          case 'mouseup':
          case 'dragend':
            ((Ho = !1), Lm(W, a, Q));
            break;
          case 'selectionchange':
            if (tv) break;
          case 'keydown':
          case 'keyup':
            Lm(W, a, Q);
        }
        var je;
        if (Oo)
          e: {
            switch (e) {
              case 'compositionstart':
                var Be = 'onCompositionStart';
                break e;
              case 'compositionend':
                Be = 'onCompositionEnd';
                break e;
              case 'compositionupdate':
                Be = 'onCompositionUpdate';
                break e;
            }
            Be = void 0;
          }
        else
          fn
            ? km(e, a) && (Be = 'onCompositionEnd')
            : e === 'keydown' && a.keyCode === 229 && (Be = 'onCompositionStart');
        (Be &&
          (pm &&
            a.locale !== 'ko' &&
            (fn || Be !== 'onCompositionStart'
              ? Be === 'onCompositionEnd' && fn && (je = um())
              : ((ia = Q), (Ao = 'value' in ia ? ia.value : ia.textContent), (fn = !0))),
          (he = wr(U, Be)),
          0 < he.length &&
            ((Be = new _m(Be, e, null, a, Q)),
            W.push({ event: Be, listeners: he }),
            je ? (Be.data = je) : ((je = vm(a)), je !== null && (Be.data = je)))),
          (je = Vk ? Xk(e, a) : Qk(e, a)) &&
            ((Be = wr(U, 'onBeforeInput')),
            0 < Be.length &&
              ((he = new _m('onBeforeInput', 'beforeinput', null, a, Q)),
              W.push({ event: he, listeners: Be }),
              (he.data = je))),
          Dv(W, e, U, a, Q));
      }
      np(W, t);
    });
  }
  function Qi(e, t, a) {
    return { instance: e, listener: t, currentTarget: a };
  }
  function wr(e, t) {
    for (var a = t + 'Capture', n = []; e !== null; ) {
      var o = e,
        c = o.stateNode;
      if (
        ((o = o.tag),
        (o !== 5 && o !== 26 && o !== 27) ||
          c === null ||
          ((o = fi(e, a)),
          o != null && n.unshift(Qi(e, o, c)),
          (o = fi(e, t)),
          o != null && n.push(Qi(e, o, c))),
        e.tag === 3)
      )
        return n;
      e = e.return;
    }
    return [];
  }
  function $v(e) {
    if (e === null) return null;
    do e = e.return;
    while (e && e.tag !== 5 && e.tag !== 27);
    return e || null;
  }
  function sp(e, t, a, n, o) {
    for (var c = t._reactName, f = []; a !== null && a !== n; ) {
      var v = a,
        T = v.alternate,
        U = v.stateNode;
      if (((v = v.tag), T !== null && T === n)) break;
      ((v !== 5 && v !== 26 && v !== 27) ||
        U === null ||
        ((T = U),
        o
          ? ((U = fi(a, c)), U != null && f.unshift(Qi(a, U, T)))
          : o || ((U = fi(a, c)), U != null && f.push(Qi(a, U, T)))),
        (a = a.return));
    }
    f.length !== 0 && e.push({ event: t, listeners: f });
  }
  var Gv = /\r\n?/g,
    Yv = /\u0000|\uFFFD/g;
  function rp(e) {
    return (typeof e == 'string' ? e : '' + e)
      .replace(
        Gv,
        `
`
      )
      .replace(Yv, '');
  }
  function op(e, t) {
    return ((t = rp(t)), rp(e) === t);
  }
  function Ge(e, t, a, n, o, c) {
    switch (a) {
      case 'children':
        typeof n == 'string'
          ? t === 'body' || (t === 'textarea' && n === '') || dn(e, n)
          : (typeof n == 'number' || typeof n == 'bigint') && t !== 'body' && dn(e, '' + n);
        break;
      case 'className':
        Es(e, 'class', n);
        break;
      case 'tabIndex':
        Es(e, 'tabindex', n);
        break;
      case 'dir':
      case 'role':
      case 'viewBox':
      case 'width':
      case 'height':
        Es(e, a, n);
        break;
      case 'style':
        rm(e, n, c);
        break;
      case 'data':
        if (t !== 'object') {
          Es(e, 'data', n);
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
        ((n = As('' + n)), e.setAttribute(a, n));
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
              ? (t !== 'input' && Ge(e, t, 'name', o.name, o, null),
                Ge(e, t, 'formEncType', o.formEncType, o, null),
                Ge(e, t, 'formMethod', o.formMethod, o, null),
                Ge(e, t, 'formTarget', o.formTarget, o, null))
              : (Ge(e, t, 'encType', o.encType, o, null),
                Ge(e, t, 'method', o.method, o, null),
                Ge(e, t, 'target', o.target, o, null)));
        if (n == null || typeof n == 'symbol' || typeof n == 'boolean') {
          e.removeAttribute(a);
          break;
        }
        ((n = As('' + n)), e.setAttribute(a, n));
        break;
      case 'onClick':
        n != null && (e.onclick = Bl);
        break;
      case 'onScroll':
        n != null && Ae('scroll', e);
        break;
      case 'onScrollEnd':
        n != null && Ae('scrollend', e);
        break;
      case 'dangerouslySetInnerHTML':
        if (n != null) {
          if (typeof n != 'object' || !('__html' in n)) throw Error(s(61));
          if (((a = n.__html), a != null)) {
            if (o.children != null) throw Error(s(60));
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
        ((a = As('' + n)), e.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', a));
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
        (Ae('beforetoggle', e), Ae('toggle', e), js(e, 'popover', n));
        break;
      case 'xlinkActuate':
        Ll(e, 'http://www.w3.org/1999/xlink', 'xlink:actuate', n);
        break;
      case 'xlinkArcrole':
        Ll(e, 'http://www.w3.org/1999/xlink', 'xlink:arcrole', n);
        break;
      case 'xlinkRole':
        Ll(e, 'http://www.w3.org/1999/xlink', 'xlink:role', n);
        break;
      case 'xlinkShow':
        Ll(e, 'http://www.w3.org/1999/xlink', 'xlink:show', n);
        break;
      case 'xlinkTitle':
        Ll(e, 'http://www.w3.org/1999/xlink', 'xlink:title', n);
        break;
      case 'xlinkType':
        Ll(e, 'http://www.w3.org/1999/xlink', 'xlink:type', n);
        break;
      case 'xmlBase':
        Ll(e, 'http://www.w3.org/XML/1998/namespace', 'xml:base', n);
        break;
      case 'xmlLang':
        Ll(e, 'http://www.w3.org/XML/1998/namespace', 'xml:lang', n);
        break;
      case 'xmlSpace':
        Ll(e, 'http://www.w3.org/XML/1998/namespace', 'xml:space', n);
        break;
      case 'is':
        js(e, 'is', n);
        break;
      case 'innerText':
      case 'textContent':
        break;
      default:
        (!(2 < a.length) || (a[0] !== 'o' && a[0] !== 'O') || (a[1] !== 'n' && a[1] !== 'N')) &&
          ((a = kk.get(a) || a), js(e, a, n));
    }
  }
  function du(e, t, a, n, o, c) {
    switch (a) {
      case 'style':
        rm(e, n, c);
        break;
      case 'dangerouslySetInnerHTML':
        if (n != null) {
          if (typeof n != 'object' || !('__html' in n)) throw Error(s(61));
          if (((a = n.__html), a != null)) {
            if (o.children != null) throw Error(s(60));
            e.innerHTML = a;
          }
        }
        break;
      case 'children':
        typeof n == 'string'
          ? dn(e, n)
          : (typeof n == 'number' || typeof n == 'bigint') && dn(e, '' + n);
        break;
      case 'onScroll':
        n != null && Ae('scroll', e);
        break;
      case 'onScrollEnd':
        n != null && Ae('scrollend', e);
        break;
      case 'onClick':
        n != null && (e.onclick = Bl);
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
        if (!Fd.hasOwnProperty(a))
          e: {
            if (
              a[0] === 'o' &&
              a[1] === 'n' &&
              ((o = a.endsWith('Capture')),
              (t = a.slice(2, o ? a.length - 7 : void 0)),
              (c = e[qt] || null),
              (c = c != null ? c[a] : null),
              typeof c == 'function' && e.removeEventListener(t, c, o),
              typeof n == 'function')
            ) {
              (typeof c != 'function' &&
                c !== null &&
                (a in e ? (e[a] = null) : e.hasAttribute(a) && e.removeAttribute(a)),
                e.addEventListener(t, n, o));
              break e;
            }
            a in e ? (e[a] = n) : n === !0 ? e.setAttribute(a, '') : js(e, a, n);
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
        (Ae('error', e), Ae('load', e));
        var n = !1,
          o = !1,
          c;
        for (c in a)
          if (a.hasOwnProperty(c)) {
            var f = a[c];
            if (f != null)
              switch (c) {
                case 'src':
                  n = !0;
                  break;
                case 'srcSet':
                  o = !0;
                  break;
                case 'children':
                case 'dangerouslySetInnerHTML':
                  throw Error(s(137, t));
                default:
                  Ge(e, t, c, f, a, null);
              }
          }
        (o && Ge(e, t, 'srcSet', a.srcSet, a, null), n && Ge(e, t, 'src', a.src, a, null));
        return;
      case 'input':
        Ae('invalid', e);
        var v = (c = f = o = null),
          T = null,
          U = null;
        for (n in a)
          if (a.hasOwnProperty(n)) {
            var Q = a[n];
            if (Q != null)
              switch (n) {
                case 'name':
                  o = Q;
                  break;
                case 'type':
                  f = Q;
                  break;
                case 'checked':
                  T = Q;
                  break;
                case 'defaultChecked':
                  U = Q;
                  break;
                case 'value':
                  c = Q;
                  break;
                case 'defaultValue':
                  v = Q;
                  break;
                case 'children':
                case 'dangerouslySetInnerHTML':
                  if (Q != null) throw Error(s(137, t));
                  break;
                default:
                  Ge(e, t, n, Q, a, null);
              }
          }
        am(e, c, v, T, U, f, o, !1);
        return;
      case 'select':
        (Ae('invalid', e), (n = f = c = null));
        for (o in a)
          if (a.hasOwnProperty(o) && ((v = a[o]), v != null))
            switch (o) {
              case 'value':
                c = v;
                break;
              case 'defaultValue':
                f = v;
                break;
              case 'multiple':
                n = v;
              default:
                Ge(e, t, o, v, a, null);
            }
        ((t = c),
          (a = f),
          (e.multiple = !!n),
          t != null ? un(e, !!n, t, !1) : a != null && un(e, !!n, a, !0));
        return;
      case 'textarea':
        (Ae('invalid', e), (c = o = n = null));
        for (f in a)
          if (a.hasOwnProperty(f) && ((v = a[f]), v != null))
            switch (f) {
              case 'value':
                n = v;
                break;
              case 'defaultValue':
                o = v;
                break;
              case 'children':
                c = v;
                break;
              case 'dangerouslySetInnerHTML':
                if (v != null) throw Error(s(91));
                break;
              default:
                Ge(e, t, f, v, a, null);
            }
        im(e, n, o, c);
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
        (Ae('beforetoggle', e), Ae('toggle', e), Ae('cancel', e), Ae('close', e));
        break;
      case 'iframe':
      case 'object':
        Ae('load', e);
        break;
      case 'video':
      case 'audio':
        for (n = 0; n < Xi.length; n++) Ae(Xi[n], e);
        break;
      case 'image':
        (Ae('error', e), Ae('load', e));
        break;
      case 'details':
        Ae('toggle', e);
        break;
      case 'embed':
      case 'source':
      case 'link':
        (Ae('error', e), Ae('load', e));
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
        for (U in a)
          if (a.hasOwnProperty(U) && ((n = a[U]), n != null))
            switch (U) {
              case 'children':
              case 'dangerouslySetInnerHTML':
                throw Error(s(137, t));
              default:
                Ge(e, t, U, n, a, null);
            }
        return;
      default:
        if (To(t)) {
          for (Q in a)
            a.hasOwnProperty(Q) && ((n = a[Q]), n !== void 0 && du(e, t, Q, n, a, void 0));
          return;
        }
    }
    for (v in a) a.hasOwnProperty(v) && ((n = a[v]), n != null && Ge(e, t, v, n, a, null));
  }
  function Vv(e, t, a, n) {
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
        var o = null,
          c = null,
          f = null,
          v = null,
          T = null,
          U = null,
          Q = null;
        for (Y in a) {
          var W = a[Y];
          if (a.hasOwnProperty(Y) && W != null)
            switch (Y) {
              case 'checked':
                break;
              case 'value':
                break;
              case 'defaultValue':
                T = W;
              default:
                n.hasOwnProperty(Y) || Ge(e, t, Y, null, n, W);
            }
        }
        for (var G in n) {
          var Y = n[G];
          if (((W = a[G]), n.hasOwnProperty(G) && (Y != null || W != null)))
            switch (G) {
              case 'type':
                c = Y;
                break;
              case 'name':
                o = Y;
                break;
              case 'checked':
                U = Y;
                break;
              case 'defaultChecked':
                Q = Y;
                break;
              case 'value':
                f = Y;
                break;
              case 'defaultValue':
                v = Y;
                break;
              case 'children':
              case 'dangerouslySetInnerHTML':
                if (Y != null) throw Error(s(137, t));
                break;
              default:
                Y !== W && Ge(e, t, G, Y, n, W);
            }
        }
        So(e, f, v, T, U, Q, c, o);
        return;
      case 'select':
        Y = f = v = G = null;
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
        for (o in n)
          if (((c = n[o]), (T = a[o]), n.hasOwnProperty(o) && (c != null || T != null)))
            switch (o) {
              case 'value':
                G = c;
                break;
              case 'defaultValue':
                v = c;
                break;
              case 'multiple':
                f = c;
              default:
                c !== T && Ge(e, t, o, c, n, T);
            }
        ((t = v),
          (a = f),
          (n = Y),
          G != null
            ? un(e, !!a, G, !1)
            : !!n != !!a && (t != null ? un(e, !!a, t, !0) : un(e, !!a, a ? [] : '', !1)));
        return;
      case 'textarea':
        Y = G = null;
        for (v in a)
          if (((o = a[v]), a.hasOwnProperty(v) && o != null && !n.hasOwnProperty(v)))
            switch (v) {
              case 'value':
                break;
              case 'children':
                break;
              default:
                Ge(e, t, v, null, n, o);
            }
        for (f in n)
          if (((o = n[f]), (c = a[f]), n.hasOwnProperty(f) && (o != null || c != null)))
            switch (f) {
              case 'value':
                G = o;
                break;
              case 'defaultValue':
                Y = o;
                break;
              case 'children':
                break;
              case 'dangerouslySetInnerHTML':
                if (o != null) throw Error(s(91));
                break;
              default:
                o !== c && Ge(e, t, f, o, n, c);
            }
        nm(e, G, Y);
        return;
      case 'option':
        for (var fe in a)
          if (((G = a[fe]), a.hasOwnProperty(fe) && G != null && !n.hasOwnProperty(fe)))
            switch (fe) {
              case 'selected':
                e.selected = !1;
                break;
              default:
                Ge(e, t, fe, null, n, G);
            }
        for (T in n)
          if (((G = n[T]), (Y = a[T]), n.hasOwnProperty(T) && G !== Y && (G != null || Y != null)))
            switch (T) {
              case 'selected':
                e.selected = G && typeof G != 'function' && typeof G != 'symbol';
                break;
              default:
                Ge(e, t, T, G, n, Y);
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
          ((G = a[xe]),
            a.hasOwnProperty(xe) && G != null && !n.hasOwnProperty(xe) && Ge(e, t, xe, null, n, G));
        for (U in n)
          if (((G = n[U]), (Y = a[U]), n.hasOwnProperty(U) && G !== Y && (G != null || Y != null)))
            switch (U) {
              case 'children':
              case 'dangerouslySetInnerHTML':
                if (G != null) throw Error(s(137, t));
                break;
              default:
                Ge(e, t, U, G, n, Y);
            }
        return;
      default:
        if (To(t)) {
          for (var Ye in a)
            ((G = a[Ye]),
              a.hasOwnProperty(Ye) &&
                G !== void 0 &&
                !n.hasOwnProperty(Ye) &&
                du(e, t, Ye, void 0, n, G));
          for (Q in n)
            ((G = n[Q]),
              (Y = a[Q]),
              !n.hasOwnProperty(Q) ||
                G === Y ||
                (G === void 0 && Y === void 0) ||
                du(e, t, Q, G, n, Y));
          return;
        }
    }
    for (var O in a)
      ((G = a[O]),
        a.hasOwnProperty(O) && G != null && !n.hasOwnProperty(O) && Ge(e, t, O, null, n, G));
    for (W in n)
      ((G = n[W]),
        (Y = a[W]),
        !n.hasOwnProperty(W) || G === Y || (G == null && Y == null) || Ge(e, t, W, G, n, Y));
  }
  function cp(e) {
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
  function Xv() {
    if (typeof performance.getEntriesByType == 'function') {
      for (
        var e = 0, t = 0, a = performance.getEntriesByType('resource'), n = 0;
        n < a.length;
        n++
      ) {
        var o = a[n],
          c = o.transferSize,
          f = o.initiatorType,
          v = o.duration;
        if (c && v && cp(f)) {
          for (f = 0, v = o.responseEnd, n += 1; n < a.length; n++) {
            var T = a[n],
              U = T.startTime;
            if (U > v) break;
            var Q = T.transferSize,
              W = T.initiatorType;
            Q && cp(W) && ((T = T.responseEnd), (f += Q * (T < v ? 1 : (v - U) / (T - U))));
          }
          if ((--n, (t += (8 * (c + f)) / (o.duration / 1e3)), e++, 10 < e)) break;
        }
      }
      if (0 < e) return t / e / 1e6;
    }
    return navigator.connection && ((e = navigator.connection.downlink), typeof e == 'number')
      ? e
      : 5;
  }
  var mu = null,
    _u = null;
  function Tr(e) {
    return e.nodeType === 9 ? e : e.ownerDocument;
  }
  function up(e) {
    switch (e) {
      case 'http://www.w3.org/2000/svg':
        return 1;
      case 'http://www.w3.org/1998/Math/MathML':
        return 2;
      default:
        return 0;
    }
  }
  function dp(e, t) {
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
  function fu(e, t) {
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
  var pu = null;
  function Qv() {
    var e = window.event;
    return e && e.type === 'popstate' ? (e === pu ? !1 : ((pu = e), !0)) : ((pu = null), !1);
  }
  var mp = typeof setTimeout == 'function' ? setTimeout : void 0,
    Kv = typeof clearTimeout == 'function' ? clearTimeout : void 0,
    _p = typeof Promise == 'function' ? Promise : void 0,
    Zv =
      typeof queueMicrotask == 'function'
        ? queueMicrotask
        : typeof _p < 'u'
          ? function (e) {
              return _p.resolve(null).then(e).catch(Jv);
            }
          : mp;
  function Jv(e) {
    setTimeout(function () {
      throw e;
    });
  }
  function xa(e) {
    return e === 'head';
  }
  function fp(e, t) {
    var a = t,
      n = 0;
    do {
      var o = a.nextSibling;
      if ((e.removeChild(a), o && o.nodeType === 8))
        if (((a = o.data), a === '/$' || a === '/&')) {
          if (n === 0) {
            (e.removeChild(o), $n(t));
            return;
          }
          n--;
        } else if (a === '$' || a === '$?' || a === '$~' || a === '$!' || a === '&') n++;
        else if (a === 'html') Ki(e.ownerDocument.documentElement);
        else if (a === 'head') {
          ((a = e.ownerDocument.head), Ki(a));
          for (var c = a.firstChild; c; ) {
            var f = c.nextSibling,
              v = c.nodeName;
            (c[mi] ||
              v === 'SCRIPT' ||
              v === 'STYLE' ||
              (v === 'LINK' && c.rel.toLowerCase() === 'stylesheet') ||
              a.removeChild(c),
              (c = f));
          }
        } else a === 'body' && Ki(e.ownerDocument.body);
      a = o;
    } while (a);
    $n(t);
  }
  function pp(e, t) {
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
  function hu(e) {
    var t = e.firstChild;
    for (t && t.nodeType === 10 && (t = t.nextSibling); t; ) {
      var a = t;
      switch (((t = t.nextSibling), a.nodeName)) {
        case 'HTML':
        case 'HEAD':
        case 'BODY':
          (hu(a), bo(a));
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
  function Pv(e, t, a, n) {
    for (; e.nodeType === 1; ) {
      var o = a;
      if (e.nodeName.toLowerCase() !== t.toLowerCase()) {
        if (!n && (e.nodeName !== 'INPUT' || e.type !== 'hidden')) break;
      } else if (n) {
        if (!e[mi])
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
                c !== o.rel ||
                e.getAttribute('href') !== (o.href == null || o.href === '' ? null : o.href) ||
                e.getAttribute('crossorigin') !== (o.crossOrigin == null ? null : o.crossOrigin) ||
                e.getAttribute('title') !== (o.title == null ? null : o.title)
              )
                break;
              return e;
            case 'style':
              if (e.hasAttribute('data-precedence')) break;
              return e;
            case 'script':
              if (
                ((c = e.getAttribute('src')),
                (c !== (o.src == null ? null : o.src) ||
                  e.getAttribute('type') !== (o.type == null ? null : o.type) ||
                  e.getAttribute('crossorigin') !==
                    (o.crossOrigin == null ? null : o.crossOrigin)) &&
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
        var c = o.name == null ? null : '' + o.name;
        if (o.type === 'hidden' && e.getAttribute('name') === c) return e;
      } else return e;
      if (((e = il(e.nextSibling)), e === null)) break;
    }
    return null;
  }
  function Fv(e, t, a) {
    if (t === '') return null;
    for (; e.nodeType !== 3; )
      if (
        ((e.nodeType !== 1 || e.nodeName !== 'INPUT' || e.type !== 'hidden') && !a) ||
        ((e = il(e.nextSibling)), e === null)
      )
        return null;
    return e;
  }
  function hp(e, t) {
    for (; e.nodeType !== 8; )
      if (
        ((e.nodeType !== 1 || e.nodeName !== 'INPUT' || e.type !== 'hidden') && !t) ||
        ((e = il(e.nextSibling)), e === null)
      )
        return null;
    return e;
  }
  function gu(e) {
    return e.data === '$?' || e.data === '$~';
  }
  function ku(e) {
    return e.data === '$!' || (e.data === '$?' && e.ownerDocument.readyState !== 'loading');
  }
  function Wv(e, t) {
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
  function il(e) {
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
  var vu = null;
  function gp(e) {
    e = e.nextSibling;
    for (var t = 0; e; ) {
      if (e.nodeType === 8) {
        var a = e.data;
        if (a === '/$' || a === '/&') {
          if (t === 0) return il(e.nextSibling);
          t--;
        } else (a !== '$' && a !== '$!' && a !== '$?' && a !== '$~' && a !== '&') || t++;
      }
      e = e.nextSibling;
    }
    return null;
  }
  function kp(e) {
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
  function vp(e, t, a) {
    switch (((t = Tr(a)), e)) {
      case 'html':
        if (((e = t.documentElement), !e)) throw Error(s(452));
        return e;
      case 'head':
        if (((e = t.head), !e)) throw Error(s(453));
        return e;
      case 'body':
        if (((e = t.body), !e)) throw Error(s(454));
        return e;
      default:
        throw Error(s(451));
    }
  }
  function Ki(e) {
    for (var t = e.attributes; t.length; ) e.removeAttributeNode(t[0]);
    bo(e);
  }
  var sl = new Map(),
    yp = new Set();
  function Nr(e) {
    return typeof e.getRootNode == 'function'
      ? e.getRootNode()
      : e.nodeType === 9
        ? e
        : e.ownerDocument;
  }
  var Kl = ee.d;
  ee.d = { f: ey, r: ty, D: ly, C: ay, L: ny, m: iy, X: ry, S: sy, M: oy };
  function ey() {
    var e = Kl.f(),
      t = gr();
    return e || t;
  }
  function ty(e) {
    var t = rn(e);
    t !== null && t.tag === 5 && t.type === 'form' ? M_(t) : Kl.r(e);
  }
  var zn = typeof document > 'u' ? null : document;
  function bp(e, t, a) {
    var n = zn;
    if (n && typeof t == 'string' && t) {
      var o = Ft(t);
      ((o = 'link[rel="' + e + '"][href="' + o + '"]'),
        typeof a == 'string' && (o += '[crossorigin="' + a + '"]'),
        yp.has(o) ||
          (yp.add(o),
          (e = { rel: e, crossOrigin: a, href: t }),
          n.querySelector(o) === null &&
            ((t = n.createElement('link')), St(t, 'link', e), pt(t), n.head.appendChild(t))));
    }
  }
  function ly(e) {
    (Kl.D(e), bp('dns-prefetch', e, null));
  }
  function ay(e, t) {
    (Kl.C(e, t), bp('preconnect', e, t));
  }
  function ny(e, t, a) {
    Kl.L(e, t, a);
    var n = zn;
    if (n && e && t) {
      var o = 'link[rel="preload"][as="' + Ft(t) + '"]';
      t === 'image' && a && a.imageSrcSet
        ? ((o += '[imagesrcset="' + Ft(a.imageSrcSet) + '"]'),
          typeof a.imageSizes == 'string' && (o += '[imagesizes="' + Ft(a.imageSizes) + '"]'))
        : (o += '[href="' + Ft(e) + '"]');
      var c = o;
      switch (t) {
        case 'style':
          c = Hn(e);
          break;
        case 'script':
          c = Un(e);
      }
      sl.has(c) ||
        ((e = k(
          { rel: 'preload', href: t === 'image' && a && a.imageSrcSet ? void 0 : e, as: t },
          a
        )),
        sl.set(c, e),
        n.querySelector(o) !== null ||
          (t === 'style' && n.querySelector(Zi(c))) ||
          (t === 'script' && n.querySelector(Ji(c))) ||
          ((t = n.createElement('link')), St(t, 'link', e), pt(t), n.head.appendChild(t)));
    }
  }
  function iy(e, t) {
    Kl.m(e, t);
    var a = zn;
    if (a && e) {
      var n = t && typeof t.as == 'string' ? t.as : 'script',
        o = 'link[rel="modulepreload"][as="' + Ft(n) + '"][href="' + Ft(e) + '"]',
        c = o;
      switch (n) {
        case 'audioworklet':
        case 'paintworklet':
        case 'serviceworker':
        case 'sharedworker':
        case 'worker':
        case 'script':
          c = Un(e);
      }
      if (
        !sl.has(c) &&
        ((e = k({ rel: 'modulepreload', href: e }, t)), sl.set(c, e), a.querySelector(o) === null)
      ) {
        switch (n) {
          case 'audioworklet':
          case 'paintworklet':
          case 'serviceworker':
          case 'sharedworker':
          case 'worker':
          case 'script':
            if (a.querySelector(Ji(c))) return;
        }
        ((n = a.createElement('link')), St(n, 'link', e), pt(n), a.head.appendChild(n));
      }
    }
  }
  function sy(e, t, a) {
    Kl.S(e, t, a);
    var n = zn;
    if (n && e) {
      var o = on(n).hoistableStyles,
        c = Hn(e);
      t = t || 'default';
      var f = o.get(c);
      if (!f) {
        var v = { loading: 0, preload: null };
        if ((f = n.querySelector(Zi(c)))) v.loading = 5;
        else {
          ((e = k({ rel: 'stylesheet', href: e, 'data-precedence': t }, a)),
            (a = sl.get(c)) && yu(e, a));
          var T = (f = n.createElement('link'));
          (pt(T),
            St(T, 'link', e),
            (T._p = new Promise(function (U, Q) {
              ((T.onload = U), (T.onerror = Q));
            })),
            T.addEventListener('load', function () {
              v.loading |= 1;
            }),
            T.addEventListener('error', function () {
              v.loading |= 2;
            }),
            (v.loading |= 4),
            jr(f, t, n));
        }
        ((f = { type: 'stylesheet', instance: f, count: 1, state: v }), o.set(c, f));
      }
    }
  }
  function ry(e, t) {
    Kl.X(e, t);
    var a = zn;
    if (a && e) {
      var n = on(a).hoistableScripts,
        o = Un(e),
        c = n.get(o);
      c ||
        ((c = a.querySelector(Ji(o))),
        c ||
          ((e = k({ src: e, async: !0 }, t)),
          (t = sl.get(o)) && bu(e, t),
          (c = a.createElement('script')),
          pt(c),
          St(c, 'link', e),
          a.head.appendChild(c)),
        (c = { type: 'script', instance: c, count: 1, state: null }),
        n.set(o, c));
    }
  }
  function oy(e, t) {
    Kl.M(e, t);
    var a = zn;
    if (a && e) {
      var n = on(a).hoistableScripts,
        o = Un(e),
        c = n.get(o);
      c ||
        ((c = a.querySelector(Ji(o))),
        c ||
          ((e = k({ src: e, async: !0, type: 'module' }, t)),
          (t = sl.get(o)) && bu(e, t),
          (c = a.createElement('script')),
          pt(c),
          St(c, 'link', e),
          a.head.appendChild(c)),
        (c = { type: 'script', instance: c, count: 1, state: null }),
        n.set(o, c));
    }
  }
  function xp(e, t, a, n) {
    var o = (o = ue.current) ? Nr(o) : null;
    if (!o) throw Error(s(446));
    switch (e) {
      case 'meta':
      case 'title':
        return null;
      case 'style':
        return typeof a.precedence == 'string' && typeof a.href == 'string'
          ? ((t = Hn(a.href)),
            (a = on(o).hoistableStyles),
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
          e = Hn(a.href);
          var c = on(o).hoistableStyles,
            f = c.get(e);
          if (
            (f ||
              ((o = o.ownerDocument || o),
              (f = {
                type: 'stylesheet',
                instance: null,
                count: 0,
                state: { loading: 0, preload: null },
              }),
              c.set(e, f),
              (c = o.querySelector(Zi(e))) && !c._p && ((f.instance = c), (f.state.loading = 5)),
              sl.has(e) ||
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
                sl.set(e, a),
                c || cy(o, e, a, f.state))),
            t && n === null)
          )
            throw Error(s(528, ''));
          return f;
        }
        if (t && n !== null) throw Error(s(529, ''));
        return null;
      case 'script':
        return (
          (t = a.async),
          (a = a.src),
          typeof a == 'string' && t && typeof t != 'function' && typeof t != 'symbol'
            ? ((t = Un(a)),
              (a = on(o).hoistableScripts),
              (n = a.get(t)),
              n || ((n = { type: 'script', instance: null, count: 0, state: null }), a.set(t, n)),
              n)
            : { type: 'void', instance: null, count: 0, state: null }
        );
      default:
        throw Error(s(444, e));
    }
  }
  function Hn(e) {
    return 'href="' + Ft(e) + '"';
  }
  function Zi(e) {
    return 'link[rel="stylesheet"][' + e + ']';
  }
  function Sp(e) {
    return k({}, e, { 'data-precedence': e.precedence, precedence: null });
  }
  function cy(e, t, a, n) {
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
        pt(t),
        e.head.appendChild(t));
  }
  function Un(e) {
    return '[src="' + Ft(e) + '"]';
  }
  function Ji(e) {
    return 'script[async]' + e;
  }
  function wp(e, t, a) {
    if ((t.count++, t.instance === null))
      switch (t.type) {
        case 'style':
          var n = e.querySelector('style[data-href~="' + Ft(a.href) + '"]');
          if (n) return ((t.instance = n), pt(n), n);
          var o = k({}, a, {
            'data-href': a.href,
            'data-precedence': a.precedence,
            href: null,
            precedence: null,
          });
          return (
            (n = (e.ownerDocument || e).createElement('style')),
            pt(n),
            St(n, 'style', o),
            jr(n, a.precedence, e),
            (t.instance = n)
          );
        case 'stylesheet':
          o = Hn(a.href);
          var c = e.querySelector(Zi(o));
          if (c) return ((t.state.loading |= 4), (t.instance = c), pt(c), c);
          ((n = Sp(a)),
            (o = sl.get(o)) && yu(n, o),
            (c = (e.ownerDocument || e).createElement('link')),
            pt(c));
          var f = c;
          return (
            (f._p = new Promise(function (v, T) {
              ((f.onload = v), (f.onerror = T));
            })),
            St(c, 'link', n),
            (t.state.loading |= 4),
            jr(c, a.precedence, e),
            (t.instance = c)
          );
        case 'script':
          return (
            (c = Un(a.src)),
            (o = e.querySelector(Ji(c)))
              ? ((t.instance = o), pt(o), o)
              : ((n = a),
                (o = sl.get(c)) && ((n = k({}, a)), bu(n, o)),
                (e = e.ownerDocument || e),
                (o = e.createElement('script')),
                pt(o),
                St(o, 'link', n),
                e.head.appendChild(o),
                (t.instance = o))
          );
        case 'void':
          return null;
        default:
          throw Error(s(443, t.type));
      }
    else
      t.type === 'stylesheet' &&
        (t.state.loading & 4) === 0 &&
        ((n = t.instance), (t.state.loading |= 4), jr(n, a.precedence, e));
    return t.instance;
  }
  function jr(e, t, a) {
    for (
      var n = a.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),
        o = n.length ? n[n.length - 1] : null,
        c = o,
        f = 0;
      f < n.length;
      f++
    ) {
      var v = n[f];
      if (v.dataset.precedence === t) c = v;
      else if (c !== o) break;
    }
    c
      ? c.parentNode.insertBefore(e, c.nextSibling)
      : ((t = a.nodeType === 9 ? a.head : a), t.insertBefore(e, t.firstChild));
  }
  function yu(e, t) {
    (e.crossOrigin == null && (e.crossOrigin = t.crossOrigin),
      e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy),
      e.title == null && (e.title = t.title));
  }
  function bu(e, t) {
    (e.crossOrigin == null && (e.crossOrigin = t.crossOrigin),
      e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy),
      e.integrity == null && (e.integrity = t.integrity));
  }
  var Er = null;
  function Tp(e, t, a) {
    if (Er === null) {
      var n = new Map(),
        o = (Er = new Map());
      o.set(a, n);
    } else ((o = Er), (n = o.get(a)), n || ((n = new Map()), o.set(a, n)));
    if (n.has(e)) return n;
    for (n.set(e, null), a = a.getElementsByTagName(e), o = 0; o < a.length; o++) {
      var c = a[o];
      if (
        !(c[mi] || c[vt] || (e === 'link' && c.getAttribute('rel') === 'stylesheet')) &&
        c.namespaceURI !== 'http://www.w3.org/2000/svg'
      ) {
        var f = c.getAttribute(t) || '';
        f = e + f;
        var v = n.get(f);
        v ? v.push(c) : n.set(f, [c]);
      }
    }
    return n;
  }
  function Np(e, t, a) {
    ((e = e.ownerDocument || e),
      e.head.insertBefore(a, t === 'title' ? e.querySelector('head > title') : null));
  }
  function uy(e, t, a) {
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
  function jp(e) {
    return !(e.type === 'stylesheet' && (e.state.loading & 3) === 0);
  }
  function dy(e, t, a, n) {
    if (
      a.type === 'stylesheet' &&
      (typeof n.media != 'string' || matchMedia(n.media).matches !== !1) &&
      (a.state.loading & 4) === 0
    ) {
      if (a.instance === null) {
        var o = Hn(n.href),
          c = t.querySelector(Zi(o));
        if (c) {
          ((t = c._p),
            t !== null &&
              typeof t == 'object' &&
              typeof t.then == 'function' &&
              (e.count++, (e = Cr.bind(e)), t.then(e, e)),
            (a.state.loading |= 4),
            (a.instance = c),
            pt(c));
          return;
        }
        ((c = t.ownerDocument || t),
          (n = Sp(n)),
          (o = sl.get(o)) && yu(n, o),
          (c = c.createElement('link')),
          pt(c));
        var f = c;
        ((f._p = new Promise(function (v, T) {
          ((f.onload = v), (f.onerror = T));
        })),
          St(c, 'link', n),
          (a.instance = c));
      }
      (e.stylesheets === null && (e.stylesheets = new Map()),
        e.stylesheets.set(a, t),
        (t = a.state.preload) &&
          (a.state.loading & 3) === 0 &&
          (e.count++,
          (a = Cr.bind(e)),
          t.addEventListener('load', a),
          t.addEventListener('error', a)));
    }
  }
  var xu = 0;
  function my(e, t) {
    return (
      e.stylesheets && e.count === 0 && Lr(e, e.stylesheets),
      0 < e.count || 0 < e.imgCount
        ? function (a) {
            var n = setTimeout(function () {
              if ((e.stylesheets && Lr(e, e.stylesheets), e.unsuspend)) {
                var c = e.unsuspend;
                ((e.unsuspend = null), c());
              }
            }, 6e4 + t);
            0 < e.imgBytes && xu === 0 && (xu = 62500 * Xv());
            var o = setTimeout(
              function () {
                if (
                  ((e.waitingForImages = !1),
                  e.count === 0 && (e.stylesheets && Lr(e, e.stylesheets), e.unsuspend))
                ) {
                  var c = e.unsuspend;
                  ((e.unsuspend = null), c());
                }
              },
              (e.imgBytes > xu ? 50 : 800) + t
            );
            return (
              (e.unsuspend = a),
              function () {
                ((e.unsuspend = null), clearTimeout(n), clearTimeout(o));
              }
            );
          }
        : null
    );
  }
  function Cr() {
    if ((this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages))) {
      if (this.stylesheets) Lr(this, this.stylesheets);
      else if (this.unsuspend) {
        var e = this.unsuspend;
        ((this.unsuspend = null), e());
      }
    }
  }
  var Ar = null;
  function Lr(e, t) {
    ((e.stylesheets = null),
      e.unsuspend !== null &&
        (e.count++, (Ar = new Map()), t.forEach(_y, e), (Ar = null), Cr.call(e)));
  }
  function _y(e, t) {
    if (!(t.state.loading & 4)) {
      var a = Ar.get(e);
      if (a) var n = a.get(null);
      else {
        ((a = new Map()), Ar.set(e, a));
        for (
          var o = e.querySelectorAll('link[data-precedence],style[data-precedence]'), c = 0;
          c < o.length;
          c++
        ) {
          var f = o[c];
          (f.nodeName === 'LINK' || f.getAttribute('media') !== 'not all') &&
            (a.set(f.dataset.precedence, f), (n = f));
        }
        n && a.set(null, n);
      }
      ((o = t.instance),
        (f = o.getAttribute('data-precedence')),
        (c = a.get(f) || n),
        c === n && a.set(null, o),
        a.set(f, o),
        this.count++,
        (n = Cr.bind(this)),
        o.addEventListener('load', n),
        o.addEventListener('error', n),
        c
          ? c.parentNode.insertBefore(o, c.nextSibling)
          : ((e = e.nodeType === 9 ? e.head : e), e.insertBefore(o, e.firstChild)),
        (t.state.loading |= 4));
    }
  }
  var Pi = {
    $$typeof: V,
    Provider: null,
    Consumer: null,
    _currentValue: oe,
    _currentValue2: oe,
    _threadCount: 0,
  };
  function fy(e, t, a, n, o, c, f, v, T) {
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
      (this.expirationTimes = go(-1)),
      (this.entangledLanes =
        this.shellSuspendCounter =
        this.errorRecoveryDisabledLanes =
        this.expiredLanes =
        this.warmLanes =
        this.pingedLanes =
        this.suspendedLanes =
        this.pendingLanes =
          0),
      (this.entanglements = go(0)),
      (this.hiddenUpdates = go(null)),
      (this.identifierPrefix = n),
      (this.onUncaughtError = o),
      (this.onCaughtError = c),
      (this.onRecoverableError = f),
      (this.pooledCache = null),
      (this.pooledCacheLanes = 0),
      (this.formState = T),
      (this.incompleteTransitions = new Map()));
  }
  function Ep(e, t, a, n, o, c, f, v, T, U, Q, W) {
    return (
      (e = new fy(e, t, a, f, T, U, Q, W, v)),
      (t = 1),
      c === !0 && (t |= 24),
      (c = Ut(3, null, null, t)),
      (e.current = c),
      (c.stateNode = e),
      (t = tc()),
      t.refCount++,
      (e.pooledCache = t),
      t.refCount++,
      (c.memoizedState = { element: n, isDehydrated: a, cache: t }),
      ic(c),
      e
    );
  }
  function Cp(e) {
    return e ? ((e = kn), e) : kn;
  }
  function Ap(e, t, a, n, o, c) {
    ((o = Cp(o)),
      n.context === null ? (n.context = o) : (n.pendingContext = o),
      (n = da(t)),
      (n.payload = { element: a }),
      (c = c === void 0 ? null : c),
      c !== null && (n.callback = c),
      (a = ma(e, n, t)),
      a !== null && (zt(a, e, t), Ci(a, e, t)));
  }
  function Lp(e, t) {
    if (((e = e.memoizedState), e !== null && e.dehydrated !== null)) {
      var a = e.retryLane;
      e.retryLane = a !== 0 && a < t ? a : t;
    }
  }
  function Su(e, t) {
    (Lp(e, t), (e = e.alternate) && Lp(e, t));
  }
  function Bp(e) {
    if (e.tag === 13 || e.tag === 31) {
      var t = Ra(e, 67108864);
      (t !== null && zt(t, e, 67108864), Su(e, 67108864));
    }
  }
  function qp(e) {
    if (e.tag === 13 || e.tag === 31) {
      var t = Xt();
      t = ko(t);
      var a = Ra(e, t);
      (a !== null && zt(a, e, t), Su(e, t));
    }
  }
  var Br = !0;
  function py(e, t, a, n) {
    var o = R.T;
    R.T = null;
    var c = ee.p;
    try {
      ((ee.p = 2), wu(e, t, a, n));
    } finally {
      ((ee.p = c), (R.T = o));
    }
  }
  function hy(e, t, a, n) {
    var o = R.T;
    R.T = null;
    var c = ee.p;
    try {
      ((ee.p = 8), wu(e, t, a, n));
    } finally {
      ((ee.p = c), (R.T = o));
    }
  }
  function wu(e, t, a, n) {
    if (Br) {
      var o = Tu(n);
      if (o === null) (uu(e, t, n, qr, a), Op(e, n));
      else if (ky(o, e, t, a, n)) n.stopPropagation();
      else if ((Op(e, n), t & 4 && -1 < gy.indexOf(e))) {
        for (; o !== null; ) {
          var c = rn(o);
          if (c !== null)
            switch (c.tag) {
              case 3:
                if (((c = c.stateNode), c.current.memoizedState.isDehydrated)) {
                  var f = Xe(c.pendingLanes);
                  if (f !== 0) {
                    var v = c;
                    for (v.pendingLanes |= 2, v.entangledLanes |= 2; f; ) {
                      var T = 1 << (31 - Et(f));
                      ((v.entanglements[1] |= T), (f &= ~T));
                    }
                    (Nl(c), (De & 6) === 0 && ((pr = Nt() + 500), Vi(0)));
                  }
                }
                break;
              case 31:
              case 13:
                ((v = Ra(c, 2)), v !== null && zt(v, c, 2), gr(), Su(c, 2));
            }
          if (((c = Tu(n)), c === null && uu(e, t, n, qr, a), c === o)) break;
          o = c;
        }
        o !== null && n.stopPropagation();
      } else uu(e, t, n, null, a);
    }
  }
  function Tu(e) {
    return ((e = jo(e)), Nu(e));
  }
  var qr = null;
  function Nu(e) {
    if (((qr = null), (e = sn(e)), e !== null)) {
      var t = m(e);
      if (t === null) e = null;
      else {
        var a = t.tag;
        if (a === 13) {
          if (((e = _(t)), e !== null)) return e;
          e = null;
        } else if (a === 31) {
          if (((e = p(t)), e !== null)) return e;
          e = null;
        } else if (a === 3) {
          if (t.stateNode.current.memoizedState.isDehydrated)
            return t.tag === 3 ? t.stateNode.containerInfo : null;
          e = null;
        } else t !== e && (e = null);
      }
    }
    return ((qr = e), null);
  }
  function Ip(e) {
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
        switch (fo()) {
          case st:
            return 2;
          case Al:
            return 8;
          case an:
          case Ts:
            return 32;
          case ci:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var ju = !1,
    Sa = null,
    wa = null,
    Ta = null,
    Fi = new Map(),
    Wi = new Map(),
    Na = [],
    gy =
      'mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset'.split(
        ' '
      );
  function Op(e, t) {
    switch (e) {
      case 'focusin':
      case 'focusout':
        Sa = null;
        break;
      case 'dragenter':
      case 'dragleave':
        wa = null;
        break;
      case 'mouseover':
      case 'mouseout':
        Ta = null;
        break;
      case 'pointerover':
      case 'pointerout':
        Fi.delete(t.pointerId);
        break;
      case 'gotpointercapture':
      case 'lostpointercapture':
        Wi.delete(t.pointerId);
    }
  }
  function es(e, t, a, n, o, c) {
    return e === null || e.nativeEvent !== c
      ? ((e = {
          blockedOn: t,
          domEventName: a,
          eventSystemFlags: n,
          nativeEvent: c,
          targetContainers: [o],
        }),
        t !== null && ((t = rn(t)), t !== null && Bp(t)),
        e)
      : ((e.eventSystemFlags |= n),
        (t = e.targetContainers),
        o !== null && t.indexOf(o) === -1 && t.push(o),
        e);
  }
  function ky(e, t, a, n, o) {
    switch (t) {
      case 'focusin':
        return ((Sa = es(Sa, e, t, a, n, o)), !0);
      case 'dragenter':
        return ((wa = es(wa, e, t, a, n, o)), !0);
      case 'mouseover':
        return ((Ta = es(Ta, e, t, a, n, o)), !0);
      case 'pointerover':
        var c = o.pointerId;
        return (Fi.set(c, es(Fi.get(c) || null, e, t, a, n, o)), !0);
      case 'gotpointercapture':
        return ((c = o.pointerId), Wi.set(c, es(Wi.get(c) || null, e, t, a, n, o)), !0);
    }
    return !1;
  }
  function Mp(e) {
    var t = sn(e.target);
    if (t !== null) {
      var a = m(t);
      if (a !== null) {
        if (((t = a.tag), t === 13)) {
          if (((t = _(a)), t !== null)) {
            ((e.blockedOn = t),
              Zd(e.priority, function () {
                qp(a);
              }));
            return;
          }
        } else if (t === 31) {
          if (((t = p(a)), t !== null)) {
            ((e.blockedOn = t),
              Zd(e.priority, function () {
                qp(a);
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
  function Ir(e) {
    if (e.blockedOn !== null) return !1;
    for (var t = e.targetContainers; 0 < t.length; ) {
      var a = Tu(e.nativeEvent);
      if (a === null) {
        a = e.nativeEvent;
        var n = new a.constructor(a.type, a);
        ((No = n), a.target.dispatchEvent(n), (No = null));
      } else return ((t = rn(a)), t !== null && Bp(t), (e.blockedOn = a), !1);
      t.shift();
    }
    return !0;
  }
  function Rp(e, t, a) {
    Ir(e) && a.delete(t);
  }
  function vy() {
    ((ju = !1),
      Sa !== null && Ir(Sa) && (Sa = null),
      wa !== null && Ir(wa) && (wa = null),
      Ta !== null && Ir(Ta) && (Ta = null),
      Fi.forEach(Rp),
      Wi.forEach(Rp));
  }
  function Or(e, t) {
    e.blockedOn === t &&
      ((e.blockedOn = null),
      ju || ((ju = !0), l.unstable_scheduleCallback(l.unstable_NormalPriority, vy)));
  }
  var Mr = null;
  function Dp(e) {
    Mr !== e &&
      ((Mr = e),
      l.unstable_scheduleCallback(l.unstable_NormalPriority, function () {
        Mr === e && (Mr = null);
        for (var t = 0; t < e.length; t += 3) {
          var a = e[t],
            n = e[t + 1],
            o = e[t + 2];
          if (typeof n != 'function') {
            if (Nu(n || a) === null) continue;
            break;
          }
          var c = rn(a);
          c !== null &&
            (e.splice(t, 3),
            (t -= 3),
            Tc(c, { pending: !0, data: o, method: a.method, action: n }, n, o));
        }
      }));
  }
  function $n(e) {
    function t(T) {
      return Or(T, e);
    }
    (Sa !== null && Or(Sa, e),
      wa !== null && Or(wa, e),
      Ta !== null && Or(Ta, e),
      Fi.forEach(t),
      Wi.forEach(t));
    for (var a = 0; a < Na.length; a++) {
      var n = Na[a];
      n.blockedOn === e && (n.blockedOn = null);
    }
    for (; 0 < Na.length && ((a = Na[0]), a.blockedOn === null); )
      (Mp(a), a.blockedOn === null && Na.shift());
    if (((a = (e.ownerDocument || e).$$reactFormReplay), a != null))
      for (n = 0; n < a.length; n += 3) {
        var o = a[n],
          c = a[n + 1],
          f = o[qt] || null;
        if (typeof c == 'function') f || Dp(a);
        else if (f) {
          var v = null;
          if (c && c.hasAttribute('formAction')) {
            if (((o = c), (f = c[qt] || null))) v = f.formAction;
            else if (Nu(o) !== null) continue;
          } else v = f.action;
          (typeof v == 'function' ? (a[n + 1] = v) : (a.splice(n, 3), (n -= 3)), Dp(a));
        }
      }
  }
  function zp() {
    function e(c) {
      c.canIntercept &&
        c.info === 'react-transition' &&
        c.intercept({
          handler: function () {
            return new Promise(function (f) {
              return (o = f);
            });
          },
          focusReset: 'manual',
          scroll: 'manual',
        });
    }
    function t() {
      (o !== null && (o(), (o = null)), n || setTimeout(a, 20));
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
        o = null;
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
            o !== null && (o(), (o = null)));
        }
      );
    }
  }
  function Eu(e) {
    this._internalRoot = e;
  }
  ((Rr.prototype.render = Eu.prototype.render =
    function (e) {
      var t = this._internalRoot;
      if (t === null) throw Error(s(409));
      var a = t.current,
        n = Xt();
      Ap(a, n, e, t, null, null);
    }),
    (Rr.prototype.unmount = Eu.prototype.unmount =
      function () {
        var e = this._internalRoot;
        if (e !== null) {
          this._internalRoot = null;
          var t = e.containerInfo;
          (Ap(e.current, 2, null, e, null, null), gr(), (t[nn] = null));
        }
      }));
  function Rr(e) {
    this._internalRoot = e;
  }
  Rr.prototype.unstable_scheduleHydration = function (e) {
    if (e) {
      var t = Kd();
      e = { blockedOn: null, target: e, priority: t };
      for (var a = 0; a < Na.length && t !== 0 && t < Na[a].priority; a++);
      (Na.splice(a, 0, e), a === 0 && Mp(e));
    }
  };
  var Hp = i.version;
  if (Hp !== '19.2.5') throw Error(s(527, Hp, '19.2.5'));
  ee.findDOMNode = function (e) {
    var t = e._reactInternals;
    if (t === void 0)
      throw typeof e.render == 'function'
        ? Error(s(188))
        : ((e = Object.keys(e).join(',')), Error(s(268, e)));
    return ((e = g(t)), (e = e !== null ? b(e) : null), (e = e === null ? null : e.stateNode), e);
  };
  var yy = {
    bundleType: 0,
    version: '19.2.5',
    rendererPackageName: 'react-dom',
    currentDispatcherRef: R,
    reconcilerVersion: '19.2.5',
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < 'u') {
    var Dr = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Dr.isDisabled && Dr.supportsFiber)
      try {
        ((aa = Dr.inject(yy)), (jt = Dr));
      } catch {}
  }
  return (
    (ls.createRoot = function (e, t) {
      if (!d(e)) throw Error(s(299));
      var a = !1,
        n = '',
        o = X_,
        c = Q_,
        f = K_;
      return (
        t != null &&
          (t.unstable_strictMode === !0 && (a = !0),
          t.identifierPrefix !== void 0 && (n = t.identifierPrefix),
          t.onUncaughtError !== void 0 && (o = t.onUncaughtError),
          t.onCaughtError !== void 0 && (c = t.onCaughtError),
          t.onRecoverableError !== void 0 && (f = t.onRecoverableError)),
        (t = Ep(e, 1, !1, null, null, a, n, null, o, c, f, zp)),
        (e[nn] = t.current),
        cu(e),
        new Eu(t)
      );
    }),
    (ls.hydrateRoot = function (e, t, a) {
      if (!d(e)) throw Error(s(299));
      var n = !1,
        o = '',
        c = X_,
        f = Q_,
        v = K_,
        T = null;
      return (
        a != null &&
          (a.unstable_strictMode === !0 && (n = !0),
          a.identifierPrefix !== void 0 && (o = a.identifierPrefix),
          a.onUncaughtError !== void 0 && (c = a.onUncaughtError),
          a.onCaughtError !== void 0 && (f = a.onCaughtError),
          a.onRecoverableError !== void 0 && (v = a.onRecoverableError),
          a.formState !== void 0 && (T = a.formState)),
        (t = Ep(e, 1, !0, t, a ?? null, n, o, T, c, f, v, zp)),
        (t.context = Cp(null)),
        (a = t.current),
        (n = Xt()),
        (n = ko(n)),
        (o = da(n)),
        (o.callback = null),
        ma(a, o, n),
        (a = n),
        (t.current.lanes = a),
        di(t, a),
        Nl(t),
        (e[nn] = t.current),
        cu(e),
        new Rr(t)
      );
    }),
    (ls.version = '19.2.5'),
    ls
  );
}
var Jp;
function By() {
  if (Jp) return Lu.exports;
  Jp = 1;
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
  return (l(), (Lu.exports = Ly()), Lu.exports);
}
var qy = By(),
  x = pd();
/**
 * react-router v7.14.2
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */ var Pp = 'popstate';
function Fp(l) {
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
function Iy(l = {}) {
  function i(s, d) {
    var g;
    let m = (g = d.state) == null ? void 0 : g.masked,
      { pathname: _, search: p, hash: h } = m || s.location;
    return Fu(
      '',
      { pathname: _, search: p, hash: h },
      (d.state && d.state.usr) || null,
      (d.state && d.state.key) || 'default',
      m
        ? { pathname: s.location.pathname, search: s.location.search, hash: s.location.hash }
        : void 0
    );
  }
  function r(s, d) {
    return typeof d == 'string' ? d : cs(d);
  }
  return My(i, r, null, l);
}
function lt(l, i) {
  if (l === !1 || l === null || typeof l > 'u') throw new Error(i);
}
function vl(l, i) {
  if (!l) {
    typeof console < 'u' && console.warn(i);
    try {
      throw new Error(i);
    } catch {}
  }
}
function Oy() {
  return Math.random().toString(36).substring(2, 10);
}
function Wp(l, i) {
  return {
    usr: l.state,
    key: l.key,
    idx: i,
    masked: l.unstable_mask ? { pathname: l.pathname, search: l.search, hash: l.hash } : void 0,
  };
}
function Fu(l, i, r = null, s, d) {
  return {
    pathname: typeof l == 'string' ? l : l.pathname,
    search: '',
    hash: '',
    ...(typeof i == 'string' ? ei(i) : i),
    state: r,
    key: (i && i.key) || s || Oy(),
    unstable_mask: d,
  };
}
function cs({ pathname: l = '/', search: i = '', hash: r = '' }) {
  return (
    i && i !== '?' && (l += i.charAt(0) === '?' ? i : '?' + i),
    r && r !== '#' && (l += r.charAt(0) === '#' ? r : '#' + r),
    l
  );
}
function ei(l) {
  let i = {};
  if (l) {
    let r = l.indexOf('#');
    r >= 0 && ((i.hash = l.substring(r)), (l = l.substring(0, r)));
    let s = l.indexOf('?');
    (s >= 0 && ((i.search = l.substring(s)), (l = l.substring(0, s))), l && (i.pathname = l));
  }
  return i;
}
function My(l, i, r, s = {}) {
  let { window: d = document.defaultView, v5Compat: m = !1 } = s,
    _ = d.history,
    p = 'POP',
    h = null,
    g = b();
  g == null && ((g = 0), _.replaceState({ ..._.state, idx: g }, ''));
  function b() {
    return (_.state || { idx: null }).idx;
  }
  function k() {
    p = 'POP';
    let M = b(),
      w = M == null ? null : M - g;
    ((g = M), h && h({ action: p, location: I.location, delta: w }));
  }
  function A(M, w) {
    p = 'PUSH';
    let j = Fp(M) ? M : Fu(I.location, M, w);
    g = b() + 1;
    let V = Wp(j, g),
      $ = I.createHref(j.unstable_mask || j);
    try {
      _.pushState(V, '', $);
    } catch (te) {
      if (te instanceof DOMException && te.name === 'DataCloneError') throw te;
      d.location.assign($);
    }
    m && h && h({ action: p, location: I.location, delta: 1 });
  }
  function C(M, w) {
    p = 'REPLACE';
    let j = Fp(M) ? M : Fu(I.location, M, w);
    g = b();
    let V = Wp(j, g),
      $ = I.createHref(j.unstable_mask || j);
    (_.replaceState(V, '', $), m && h && h({ action: p, location: I.location, delta: 0 }));
  }
  function z(M) {
    return Ry(M);
  }
  let I = {
    get action() {
      return p;
    },
    get location() {
      return l(d, _);
    },
    listen(M) {
      if (h) throw new Error('A history only accepts one active listener');
      return (
        d.addEventListener(Pp, k),
        (h = M),
        () => {
          (d.removeEventListener(Pp, k), (h = null));
        }
      );
    },
    createHref(M) {
      return i(d, M);
    },
    createURL: z,
    encodeLocation(M) {
      let w = z(M);
      return { pathname: w.pathname, search: w.search, hash: w.hash };
    },
    push: A,
    replace: C,
    go(M) {
      return _.go(M);
    },
  };
  return I;
}
function Ry(l, i = !1) {
  let r = 'http://localhost';
  (typeof window < 'u' &&
    (r = window.location.origin !== 'null' ? window.location.origin : window.location.href),
    lt(r, 'No window.location.(origin|href) available to create URL'));
  let s = typeof l == 'string' ? l : cs(l);
  return ((s = s.replace(/ $/, '%20')), !i && s.startsWith('//') && (s = r + s), new URL(s, r));
}
function Hh(l, i, r = '/') {
  return Dy(l, i, r, !1);
}
function Dy(l, i, r, s) {
  let d = typeof i == 'string' ? ei(i) : i,
    m = ea(d.pathname || '/', r);
  if (m == null) return null;
  let _ = Uh(l);
  zy(_);
  let p = null;
  for (let h = 0; p == null && h < _.length; ++h) {
    let g = Jy(m);
    p = Ky(_[h], g, s);
  }
  return p;
}
function Uh(l, i = [], r = [], s = '', d = !1) {
  let m = (_, p, h = d, g) => {
    let b = {
      relativePath: g === void 0 ? _.path || '' : g,
      caseSensitive: _.caseSensitive === !0,
      childrenIndex: p,
      route: _,
    };
    if (b.relativePath.startsWith('/')) {
      if (!b.relativePath.startsWith(s) && h) return;
      (lt(
        b.relativePath.startsWith(s),
        `Absolute route path "${b.relativePath}" nested under path "${s}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`
      ),
        (b.relativePath = b.relativePath.slice(s.length)));
    }
    let k = kl([s, b.relativePath]),
      A = r.concat(b);
    (_.children &&
      _.children.length > 0 &&
      (lt(
        _.index !== !0,
        `Index routes must not have child routes. Please remove all child routes from route path "${k}".`
      ),
      Uh(_.children, i, A, k, h)),
      !(_.path == null && !_.index) && i.push({ path: k, score: Xy(k, _.index), routesMeta: A }));
  };
  return (
    l.forEach((_, p) => {
      var h;
      if (_.path === '' || !((h = _.path) != null && h.includes('?'))) m(_, p);
      else for (let g of $h(_.path)) m(_, p, !0, g);
    }),
    i
  );
}
function $h(l) {
  let i = l.split('/');
  if (i.length === 0) return [];
  let [r, ...s] = i,
    d = r.endsWith('?'),
    m = r.replace(/\?$/, '');
  if (s.length === 0) return d ? [m, ''] : [m];
  let _ = $h(s.join('/')),
    p = [];
  return (
    p.push(..._.map((h) => (h === '' ? m : [m, h].join('/')))),
    d && p.push(..._),
    p.map((h) => (l.startsWith('/') && h === '' ? '/' : h))
  );
}
function zy(l) {
  l.sort((i, r) =>
    i.score !== r.score
      ? r.score - i.score
      : Qy(
          i.routesMeta.map((s) => s.childrenIndex),
          r.routesMeta.map((s) => s.childrenIndex)
        )
  );
}
var Hy = /^:[\w-]+$/,
  Uy = 3,
  $y = 2,
  Gy = 1,
  Yy = 10,
  Vy = -2,
  eh = (l) => l === '*';
function Xy(l, i) {
  let r = l.split('/'),
    s = r.length;
  return (
    r.some(eh) && (s += Vy),
    i && (s += $y),
    r.filter((d) => !eh(d)).reduce((d, m) => d + (Hy.test(m) ? Uy : m === '' ? Gy : Yy), s)
  );
}
function Qy(l, i) {
  return l.length === i.length && l.slice(0, -1).every((s, d) => s === i[d])
    ? l[l.length - 1] - i[i.length - 1]
    : 0;
}
function Ky(l, i, r = !1) {
  let { routesMeta: s } = l,
    d = {},
    m = '/',
    _ = [];
  for (let p = 0; p < s.length; ++p) {
    let h = s[p],
      g = p === s.length - 1,
      b = m === '/' ? i : i.slice(m.length) || '/',
      k = Jr({ path: h.relativePath, caseSensitive: h.caseSensitive, end: g }, b),
      A = h.route;
    if (
      (!k &&
        g &&
        r &&
        !s[s.length - 1].route.index &&
        (k = Jr({ path: h.relativePath, caseSensitive: h.caseSensitive, end: !1 }, b)),
      !k)
    )
      return null;
    (Object.assign(d, k.params),
      _.push({
        params: d,
        pathname: kl([m, k.pathname]),
        pathnameBase: e0(kl([m, k.pathnameBase])),
        route: A,
      }),
      k.pathnameBase !== '/' && (m = kl([m, k.pathnameBase])));
  }
  return _;
}
function Jr(l, i) {
  typeof l == 'string' && (l = { path: l, caseSensitive: !1, end: !0 });
  let [r, s] = Zy(l.path, l.caseSensitive, l.end),
    d = i.match(r);
  if (!d) return null;
  let m = d[0],
    _ = m.replace(/(.)\/+$/, '$1'),
    p = d.slice(1);
  return {
    params: s.reduce((g, { paramName: b, isOptional: k }, A) => {
      if (b === '*') {
        let z = p[A] || '';
        _ = m.slice(0, m.length - z.length).replace(/(.)\/+$/, '$1');
      }
      const C = p[A];
      return (k && !C ? (g[b] = void 0) : (g[b] = (C || '').replace(/%2F/g, '/')), g);
    }, {}),
    pathname: m,
    pathnameBase: _,
    pattern: l,
  };
}
function Zy(l, i = !1, r = !0) {
  vl(
    l === '*' || !l.endsWith('*') || l.endsWith('/*'),
    `Route path "${l}" will be treated as if it were "${l.replace(/\*$/, '/*')}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${l.replace(/\*$/, '/*')}".`
  );
  let s = [],
    d =
      '^' +
      l
        .replace(/\/*\*?$/, '')
        .replace(/^\/*/, '/')
        .replace(/[\\.*+^${}|()[\]]/g, '\\$&')
        .replace(/\/:([\w-]+)(\?)?/g, (_, p, h, g, b) => {
          if ((s.push({ paramName: p, isOptional: h != null }), h)) {
            let k = b.charAt(g + _.length);
            return k && k !== '/' ? '/([^\\/]*)' : '(?:/([^\\/]*))?';
          }
          return '/([^\\/]+)';
        })
        .replace(/\/([\w-]+)\?(\/|$)/g, '(/$1)?$2');
  return (
    l.endsWith('*')
      ? (s.push({ paramName: '*' }), (d += l === '*' || l === '/*' ? '(.*)$' : '(?:\\/(.+)|\\/*)$'))
      : r
        ? (d += '\\/*$')
        : l !== '' && l !== '/' && (d += '(?:(?=\\/|$))'),
    [new RegExp(d, i ? void 0 : 'i'), s]
  );
}
function Jy(l) {
  try {
    return l
      .split('/')
      .map((i) => decodeURIComponent(i).replace(/\//g, '%2F'))
      .join('/');
  } catch (i) {
    return (
      vl(
        !1,
        `The URL path "${l}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${i}).`
      ),
      l
    );
  }
}
function ea(l, i) {
  if (i === '/') return l;
  if (!l.toLowerCase().startsWith(i.toLowerCase())) return null;
  let r = i.endsWith('/') ? i.length - 1 : i.length,
    s = l.charAt(r);
  return s && s !== '/' ? null : l.slice(r) || '/';
}
var Py = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;
function Fy(l, i = '/') {
  let { pathname: r, search: s = '', hash: d = '' } = typeof l == 'string' ? ei(l) : l,
    m;
  return (
    r ? ((r = Gh(r)), r.startsWith('/') ? (m = th(r.substring(1), '/')) : (m = th(r, i))) : (m = i),
    { pathname: m, search: t0(s), hash: l0(d) }
  );
}
function th(l, i) {
  let r = Pr(i).split('/');
  return (
    l.split('/').forEach((d) => {
      d === '..' ? r.length > 1 && r.pop() : d !== '.' && r.push(d);
    }),
    r.length > 1 ? r.join('/') : '/'
  );
}
function Mu(l, i, r, s) {
  return `Cannot include a '${l}' character in a manually specified \`to.${i}\` field [${JSON.stringify(s)}].  Please separate it out to the \`to.${r}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`;
}
function Wy(l) {
  return l.filter((i, r) => r === 0 || (i.route.path && i.route.path.length > 0));
}
function hd(l) {
  let i = Wy(l);
  return i.map((r, s) => (s === i.length - 1 ? r.pathname : r.pathnameBase));
}
function io(l, i, r, s = !1) {
  let d;
  typeof l == 'string'
    ? (d = ei(l))
    : ((d = { ...l }),
      lt(!d.pathname || !d.pathname.includes('?'), Mu('?', 'pathname', 'search', d)),
      lt(!d.pathname || !d.pathname.includes('#'), Mu('#', 'pathname', 'hash', d)),
      lt(!d.search || !d.search.includes('#'), Mu('#', 'search', 'hash', d)));
  let m = l === '' || d.pathname === '',
    _ = m ? '/' : d.pathname,
    p;
  if (_ == null) p = r;
  else {
    let k = i.length - 1;
    if (!s && _.startsWith('..')) {
      let A = _.split('/');
      for (; A[0] === '..'; ) (A.shift(), (k -= 1));
      d.pathname = A.join('/');
    }
    p = k >= 0 ? i[k] : '/';
  }
  let h = Fy(d, p),
    g = _ && _ !== '/' && _.endsWith('/'),
    b = (m || _ === '.') && r.endsWith('/');
  return (!h.pathname.endsWith('/') && (g || b) && (h.pathname += '/'), h);
}
var Gh = (l) => l.replace(/\/\/+/g, '/'),
  kl = (l) => Gh(l.join('/')),
  Pr = (l) => l.replace(/\/+$/, ''),
  e0 = (l) => Pr(l).replace(/^\/*/, '/'),
  t0 = (l) => (!l || l === '?' ? '' : l.startsWith('?') ? l : '?' + l),
  l0 = (l) => (!l || l === '#' ? '' : l.startsWith('#') ? l : '#' + l),
  a0 = class {
    constructor(l, i, r, s = !1) {
      ((this.status = l),
        (this.statusText = i || ''),
        (this.internal = s),
        r instanceof Error ? ((this.data = r.toString()), (this.error = r)) : (this.data = r));
    }
  };
function n0(l) {
  return (
    l != null &&
    typeof l.status == 'number' &&
    typeof l.statusText == 'string' &&
    typeof l.internal == 'boolean' &&
    'data' in l
  );
}
function i0(l) {
  let i = l.map((r) => r.route.path).filter(Boolean);
  return kl(i) || '/';
}
var Yh =
  typeof window < 'u' && typeof window.document < 'u' && typeof window.document.createElement < 'u';
function Vh(l, i) {
  let r = l;
  if (typeof r != 'string' || !Py.test(r)) return { absoluteURL: void 0, isExternal: !1, to: r };
  let s = r,
    d = !1;
  if (Yh)
    try {
      let m = new URL(window.location.href),
        _ = r.startsWith('//') ? new URL(m.protocol + r) : new URL(r),
        p = ea(_.pathname, i);
      _.origin === m.origin && p != null ? (r = p + _.search + _.hash) : (d = !0);
    } catch {
      vl(
        !1,
        `<Link to="${r}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`
      );
    }
  return { absoluteURL: s, isExternal: d, to: r };
}
Object.getOwnPropertyNames(Object.prototype).sort().join('\0');
var Xh = ['POST', 'PUT', 'PATCH', 'DELETE'];
new Set(Xh);
var s0 = ['GET', ...Xh];
new Set(s0);
var ti = x.createContext(null);
ti.displayName = 'DataRouter';
var so = x.createContext(null);
so.displayName = 'DataRouterState';
var Qh = x.createContext(!1);
function r0() {
  return x.useContext(Qh);
}
var Kh = x.createContext({ isTransitioning: !1 });
Kh.displayName = 'ViewTransition';
var o0 = x.createContext(new Map());
o0.displayName = 'Fetchers';
var c0 = x.createContext(null);
c0.displayName = 'Await';
var Kt = x.createContext(null);
Kt.displayName = 'Navigation';
var _s = x.createContext(null);
_s.displayName = 'Location';
var bl = x.createContext({ outlet: null, matches: [], isDataRoute: !1 });
bl.displayName = 'Route';
var gd = x.createContext(null);
gd.displayName = 'RouteError';
var Zh = 'REACT_ROUTER_ERROR',
  u0 = 'REDIRECT',
  d0 = 'ROUTE_ERROR_RESPONSE';
function m0(l) {
  if (l.startsWith(`${Zh}:${u0}:{`))
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
function _0(l) {
  if (l.startsWith(`${Zh}:${d0}:{`))
    try {
      let i = JSON.parse(l.slice(40));
      if (
        typeof i == 'object' &&
        i &&
        typeof i.status == 'number' &&
        typeof i.statusText == 'string'
      )
        return new a0(i.status, i.statusText, i.data);
    } catch {}
}
function f0(l, { relative: i } = {}) {
  lt(li(), 'useHref() may be used only in the context of a <Router> component.');
  let { basename: r, navigator: s } = x.useContext(Kt),
    { hash: d, pathname: m, search: _ } = fs(l, { relative: i }),
    p = m;
  return (
    r !== '/' && (p = m === '/' ? r : kl([r, m])),
    s.createHref({ pathname: p, search: _, hash: d })
  );
}
function li() {
  return x.useContext(_s) != null;
}
function jl() {
  return (
    lt(li(), 'useLocation() may be used only in the context of a <Router> component.'),
    x.useContext(_s).location
  );
}
var Jh =
  'You should call navigate() in a React.useEffect(), not when your component is first rendered.';
function Ph(l) {
  x.useContext(Kt).static || x.useLayoutEffect(l);
}
function xl() {
  let { isDataRoute: l } = x.useContext(bl);
  return l ? E0() : p0();
}
function p0() {
  lt(li(), 'useNavigate() may be used only in the context of a <Router> component.');
  let l = x.useContext(ti),
    { basename: i, navigator: r } = x.useContext(Kt),
    { matches: s } = x.useContext(bl),
    { pathname: d } = jl(),
    m = JSON.stringify(hd(s)),
    _ = x.useRef(!1);
  return (
    Ph(() => {
      _.current = !0;
    }),
    x.useCallback(
      (h, g = {}) => {
        if ((vl(_.current, Jh), !_.current)) return;
        if (typeof h == 'number') {
          r.go(h);
          return;
        }
        let b = io(h, JSON.parse(m), d, g.relative === 'path');
        (l == null && i !== '/' && (b.pathname = b.pathname === '/' ? i : kl([i, b.pathname])),
          (g.replace ? r.replace : r.push)(b, g.state, g));
      },
      [i, r, m, d, l]
    )
  );
}
x.createContext(null);
function h0() {
  let { matches: l } = x.useContext(bl),
    i = l[l.length - 1];
  return (i == null ? void 0 : i.params) ?? {};
}
function fs(l, { relative: i } = {}) {
  let { matches: r } = x.useContext(bl),
    { pathname: s } = jl(),
    d = JSON.stringify(hd(r));
  return x.useMemo(() => io(l, JSON.parse(d), s, i === 'path'), [l, d, s, i]);
}
function g0(l, i) {
  return Fh(l, i);
}
function Fh(l, i, r) {
  var M;
  lt(li(), 'useRoutes() may be used only in the context of a <Router> component.');
  let { navigator: s } = x.useContext(Kt),
    { matches: d } = x.useContext(bl),
    m = d[d.length - 1],
    _ = m ? m.params : {},
    p = m ? m.pathname : '/',
    h = m ? m.pathnameBase : '/',
    g = m && m.route;
  {
    let w = (g && g.path) || '';
    eg(
      p,
      !g || w.endsWith('*') || w.endsWith('*?'),
      `You rendered descendant <Routes> (or called \`useRoutes()\`) at "${p}" (under <Route path="${w}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${w}"> to <Route path="${w === '/' ? '*' : `${w}/*`}">.`
    );
  }
  let b = jl(),
    k;
  if (i) {
    let w = typeof i == 'string' ? ei(i) : i;
    (lt(
      h === '/' || ((M = w.pathname) == null ? void 0 : M.startsWith(h)),
      `When overriding the location using \`<Routes location>\` or \`useRoutes(routes, location)\`, the location pathname must begin with the portion of the URL pathname that was matched by all parent routes. The current pathname base is "${h}" but pathname "${w.pathname}" was given in the \`location\` prop.`
    ),
      (k = w));
  } else k = b;
  let A = k.pathname || '/',
    C = A;
  if (h !== '/') {
    let w = h.replace(/^\//, '').split('/');
    C = '/' + A.replace(/^\//, '').split('/').slice(w.length).join('/');
  }
  let z = Hh(l, { pathname: C });
  (vl(g || z != null, `No routes matched location "${k.pathname}${k.search}${k.hash}" `),
    vl(
      z == null ||
        z[z.length - 1].route.element !== void 0 ||
        z[z.length - 1].route.Component !== void 0 ||
        z[z.length - 1].route.lazy !== void 0,
      `Matched leaf route at location "${k.pathname}${k.search}${k.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`
    ));
  let I = x0(
    z &&
      z.map((w) =>
        Object.assign({}, w, {
          params: Object.assign({}, _, w.params),
          pathname: kl([
            h,
            s.encodeLocation
              ? s.encodeLocation(
                  w.pathname.replace(/%/g, '%25').replace(/\?/g, '%3F').replace(/#/g, '%23')
                ).pathname
              : w.pathname,
          ]),
          pathnameBase:
            w.pathnameBase === '/'
              ? h
              : kl([
                  h,
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
    d,
    r
  );
  return i && I
    ? x.createElement(
        _s.Provider,
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
        I
      )
    : I;
}
function k0() {
  let l = j0(),
    i = n0(l) ? `${l.status} ${l.statusText}` : l instanceof Error ? l.message : JSON.stringify(l),
    r = l instanceof Error ? l.stack : null,
    s = 'rgba(200,200,200, 0.5)',
    d = { padding: '0.5rem', backgroundColor: s },
    m = { padding: '2px 4px', backgroundColor: s },
    _ = null;
  return (
    console.error('Error handled by React Router default ErrorBoundary:', l),
    (_ = x.createElement(
      x.Fragment,
      null,
      x.createElement('p', null, '💿 Hey developer 👋'),
      x.createElement(
        'p',
        null,
        'You can provide a way better UX than this when your app throws errors by providing your own ',
        x.createElement('code', { style: m }, 'ErrorBoundary'),
        ' or',
        ' ',
        x.createElement('code', { style: m }, 'errorElement'),
        ' prop on your route.'
      )
    )),
    x.createElement(
      x.Fragment,
      null,
      x.createElement('h2', null, 'Unexpected Application Error!'),
      x.createElement('h3', { style: { fontStyle: 'italic' } }, i),
      r ? x.createElement('pre', { style: d }, r) : null,
      _
    )
  );
}
var v0 = x.createElement(k0, null),
  Wh = class extends x.Component {
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
        const r = _0(l.digest);
        r && (l = r);
      }
      let i =
        l !== void 0
          ? x.createElement(
              bl.Provider,
              { value: this.props.routeContext },
              x.createElement(gd.Provider, { value: l, children: this.props.component })
            )
          : this.props.children;
      return this.context ? x.createElement(y0, { error: l }, i) : i;
    }
  };
Wh.contextType = Qh;
var Ru = new WeakMap();
function y0({ children: l, error: i }) {
  let { basename: r } = x.useContext(Kt);
  if (typeof i == 'object' && i && 'digest' in i && typeof i.digest == 'string') {
    let s = m0(i.digest);
    if (s) {
      let d = Ru.get(i);
      if (d) throw d;
      let m = Vh(s.location, r);
      if (Yh && !Ru.get(i))
        if (m.isExternal || s.reloadDocument) window.location.href = m.absoluteURL || m.to;
        else {
          const _ = Promise.resolve().then(() =>
            window.__reactRouterDataRouter.navigate(m.to, { replace: s.replace })
          );
          throw (Ru.set(i, _), _);
        }
      return x.createElement('meta', {
        httpEquiv: 'refresh',
        content: `0;url=${m.absoluteURL || m.to}`,
      });
    }
  }
  return l;
}
function b0({ routeContext: l, match: i, children: r }) {
  let s = x.useContext(ti);
  return (
    s &&
      s.static &&
      s.staticContext &&
      (i.route.errorElement || i.route.ErrorBoundary) &&
      (s.staticContext._deepestRenderedBoundaryId = i.route.id),
    x.createElement(bl.Provider, { value: l }, r)
  );
}
function x0(l, i = [], r) {
  let s = r == null ? void 0 : r.state;
  if (l == null) {
    if (!s) return null;
    if (s.errors) l = s.matches;
    else if (i.length === 0 && !s.initialized && s.matches.length > 0) l = s.matches;
    else return null;
  }
  let d = l,
    m = s == null ? void 0 : s.errors;
  if (m != null) {
    let b = d.findIndex((k) => k.route.id && (m == null ? void 0 : m[k.route.id]) !== void 0);
    (lt(
      b >= 0,
      `Could not find a matching route for errors on route IDs: ${Object.keys(m).join(',')}`
    ),
      (d = d.slice(0, Math.min(d.length, b + 1))));
  }
  let _ = !1,
    p = -1;
  if (r && s) {
    _ = s.renderFallback;
    for (let b = 0; b < d.length; b++) {
      let k = d[b];
      if (((k.route.HydrateFallback || k.route.hydrateFallbackElement) && (p = b), k.route.id)) {
        let { loaderData: A, errors: C } = s,
          z = k.route.loader && !A.hasOwnProperty(k.route.id) && (!C || C[k.route.id] === void 0);
        if (k.route.lazy || z) {
          (r.isStatic && (_ = !0), p >= 0 ? (d = d.slice(0, p + 1)) : (d = [d[0]]));
          break;
        }
      }
    }
  }
  let h = r == null ? void 0 : r.onError,
    g =
      s && h
        ? (b, k) => {
            var A, C;
            h(b, {
              location: s.location,
              params:
                ((C = (A = s.matches) == null ? void 0 : A[0]) == null ? void 0 : C.params) ?? {},
              unstable_pattern: i0(s.matches),
              errorInfo: k,
            });
          }
        : void 0;
  return d.reduceRight((b, k, A) => {
    let C,
      z = !1,
      I = null,
      M = null;
    s &&
      ((C = m && k.route.id ? m[k.route.id] : void 0),
      (I = k.route.errorElement || v0),
      _ &&
        (p < 0 && A === 0
          ? (eg(
              'route-fallback',
              !1,
              'No `HydrateFallback` element provided to render during initial hydration'
            ),
            (z = !0),
            (M = null))
          : p === A && ((z = !0), (M = k.route.hydrateFallbackElement || null))));
    let w = i.concat(d.slice(0, A + 1)),
      j = () => {
        let V;
        return (
          C
            ? (V = I)
            : z
              ? (V = M)
              : k.route.Component
                ? (V = x.createElement(k.route.Component, null))
                : k.route.element
                  ? (V = k.route.element)
                  : (V = b),
          x.createElement(b0, {
            match: k,
            routeContext: { outlet: b, matches: w, isDataRoute: s != null },
            children: V,
          })
        );
      };
    return s && (k.route.ErrorBoundary || k.route.errorElement || A === 0)
      ? x.createElement(Wh, {
          location: s.location,
          revalidation: s.revalidation,
          component: I,
          error: C,
          children: j(),
          routeContext: { outlet: null, matches: w, isDataRoute: !0 },
          onError: g,
        })
      : j();
  }, null);
}
function kd(l) {
  return `${l} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function S0(l) {
  let i = x.useContext(ti);
  return (lt(i, kd(l)), i);
}
function w0(l) {
  let i = x.useContext(so);
  return (lt(i, kd(l)), i);
}
function T0(l) {
  let i = x.useContext(bl);
  return (lt(i, kd(l)), i);
}
function vd(l) {
  let i = T0(l),
    r = i.matches[i.matches.length - 1];
  return (lt(r.route.id, `${l} can only be used on routes that contain a unique "id"`), r.route.id);
}
function N0() {
  return vd('useRouteId');
}
function j0() {
  var s;
  let l = x.useContext(gd),
    i = w0('useRouteError'),
    r = vd('useRouteError');
  return l !== void 0 ? l : (s = i.errors) == null ? void 0 : s[r];
}
function E0() {
  let { router: l } = S0('useNavigate'),
    i = vd('useNavigate'),
    r = x.useRef(!1);
  return (
    Ph(() => {
      r.current = !0;
    }),
    x.useCallback(
      async (d, m = {}) => {
        (vl(r.current, Jh),
          r.current &&
            (typeof d == 'number'
              ? await l.navigate(d)
              : await l.navigate(d, { fromRouteId: i, ...m })));
      },
      [l, i]
    )
  );
}
var lh = {};
function eg(l, i, r) {
  !i && !lh[l] && ((lh[l] = !0), vl(!1, r));
}
x.memo(C0);
function C0({ routes: l, future: i, state: r, isStatic: s, onError: d }) {
  return Fh(l, void 0, { state: r, isStatic: s, onError: d });
}
function yl({ to: l, replace: i, state: r, relative: s }) {
  lt(li(), '<Navigate> may be used only in the context of a <Router> component.');
  let { static: d } = x.useContext(Kt);
  vl(
    !d,
    '<Navigate> must not be used on the initial render in a <StaticRouter>. This is a no-op, but you should modify your code so the <Navigate> is only ever rendered in response to some user interaction or state change.'
  );
  let { matches: m } = x.useContext(bl),
    { pathname: _ } = jl(),
    p = xl(),
    h = io(l, hd(m), _, s === 'path'),
    g = JSON.stringify(h);
  return (
    x.useEffect(() => {
      p(JSON.parse(g), { replace: i, state: r, relative: s });
    }, [p, g, s, i, r]),
    null
  );
}
function cl(l) {
  lt(
    !1,
    'A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>.'
  );
}
function A0({
  basename: l = '/',
  children: i = null,
  location: r,
  navigationType: s = 'POP',
  navigator: d,
  static: m = !1,
  unstable_useTransitions: _,
}) {
  lt(
    !li(),
    'You cannot render a <Router> inside another <Router>. You should never have more than one in your app.'
  );
  let p = l.replace(/^\/*/, '/'),
    h = x.useMemo(
      () => ({ basename: p, navigator: d, static: m, unstable_useTransitions: _, future: {} }),
      [p, d, m, _]
    );
  typeof r == 'string' && (r = ei(r));
  let {
      pathname: g = '/',
      search: b = '',
      hash: k = '',
      state: A = null,
      key: C = 'default',
      unstable_mask: z,
    } = r,
    I = x.useMemo(() => {
      let M = ea(g, p);
      return M == null
        ? null
        : {
            location: { pathname: M, search: b, hash: k, state: A, key: C, unstable_mask: z },
            navigationType: s,
          };
    }, [p, g, b, k, A, C, s, z]);
  return (
    vl(
      I != null,
      `<Router basename="${p}"> is not able to match the URL "${g}${b}${k}" because it does not start with the basename, so the <Router> won't render anything.`
    ),
    I == null
      ? null
      : x.createElement(
          Kt.Provider,
          { value: h },
          x.createElement(_s.Provider, { children: i, value: I })
        )
  );
}
function L0({ children: l, location: i }) {
  return g0(Wu(l), i);
}
function Wu(l, i = []) {
  let r = [];
  return (
    x.Children.forEach(l, (s, d) => {
      if (!x.isValidElement(s)) return;
      let m = [...i, d];
      if (s.type === x.Fragment) {
        r.push.apply(r, Wu(s.props.children, m));
        return;
      }
      (lt(
        s.type === cl,
        `[${typeof s.type == 'string' ? s.type : s.type.name}] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>`
      ),
        lt(!s.props.index || !s.props.children, 'An index route cannot have child routes.'));
      let _ = {
        id: s.props.id || m.join('-'),
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
      (s.props.children && (_.children = Wu(s.props.children, m)), r.push(_));
    }),
    r
  );
}
var Qr = 'get',
  Kr = 'application/x-www-form-urlencoded';
function ro(l) {
  return typeof HTMLElement < 'u' && l instanceof HTMLElement;
}
function B0(l) {
  return ro(l) && l.tagName.toLowerCase() === 'button';
}
function q0(l) {
  return ro(l) && l.tagName.toLowerCase() === 'form';
}
function I0(l) {
  return ro(l) && l.tagName.toLowerCase() === 'input';
}
function O0(l) {
  return !!(l.metaKey || l.altKey || l.ctrlKey || l.shiftKey);
}
function M0(l, i) {
  return l.button === 0 && (!i || i === '_self') && !O0(l);
}
var zr = null;
function R0() {
  if (zr === null)
    try {
      (new FormData(document.createElement('form'), 0), (zr = !1));
    } catch {
      zr = !0;
    }
  return zr;
}
var D0 = new Set(['application/x-www-form-urlencoded', 'multipart/form-data', 'text/plain']);
function Du(l) {
  return l != null && !D0.has(l)
    ? (vl(
        !1,
        `"${l}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${Kr}"`
      ),
      null)
    : l;
}
function z0(l, i) {
  let r, s, d, m, _;
  if (q0(l)) {
    let p = l.getAttribute('action');
    ((s = p ? ea(p, i) : null),
      (r = l.getAttribute('method') || Qr),
      (d = Du(l.getAttribute('enctype')) || Kr),
      (m = new FormData(l)));
  } else if (B0(l) || (I0(l) && (l.type === 'submit' || l.type === 'image'))) {
    let p = l.form;
    if (p == null)
      throw new Error('Cannot submit a <button> or <input type="submit"> without a <form>');
    let h = l.getAttribute('formaction') || p.getAttribute('action');
    if (
      ((s = h ? ea(h, i) : null),
      (r = l.getAttribute('formmethod') || p.getAttribute('method') || Qr),
      (d = Du(l.getAttribute('formenctype')) || Du(p.getAttribute('enctype')) || Kr),
      (m = new FormData(p, l)),
      !R0())
    ) {
      let { name: g, type: b, value: k } = l;
      if (b === 'image') {
        let A = g ? `${g}.` : '';
        (m.append(`${A}x`, '0'), m.append(`${A}y`, '0'));
      } else g && m.append(g, k);
    }
  } else {
    if (ro(l))
      throw new Error(
        'Cannot submit element that is not <form>, <button>, or <input type="submit|image">'
      );
    ((r = Qr), (s = null), (d = Kr), (_ = l));
  }
  return (
    m && d === 'text/plain' && ((_ = m), (m = void 0)),
    { action: s, method: r.toLowerCase(), encType: d, formData: m, body: _ }
  );
}
Object.getOwnPropertyNames(Object.prototype).sort().join('\0');
function yd(l, i) {
  if (l === !1 || l === null || typeof l > 'u') throw new Error(i);
}
function tg(l, i, r, s) {
  let d =
    typeof l == 'string'
      ? new URL(l, typeof window > 'u' ? 'server://singlefetch/' : window.location.origin)
      : l;
  return (
    r
      ? d.pathname.endsWith('/')
        ? (d.pathname = `${d.pathname}_.${s}`)
        : (d.pathname = `${d.pathname}.${s}`)
      : d.pathname === '/'
        ? (d.pathname = `_root.${s}`)
        : i && ea(d.pathname, i) === '/'
          ? (d.pathname = `${Pr(i)}/_root.${s}`)
          : (d.pathname = `${Pr(d.pathname)}.${s}`),
    d
  );
}
async function H0(l, i) {
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
function U0(l) {
  return l == null
    ? !1
    : l.href == null
      ? l.rel === 'preload' && typeof l.imageSrcSet == 'string' && typeof l.imageSizes == 'string'
      : typeof l.rel == 'string' && typeof l.href == 'string';
}
async function $0(l, i, r) {
  let s = await Promise.all(
    l.map(async (d) => {
      let m = i.routes[d.route.id];
      if (m) {
        let _ = await H0(m, r);
        return _.links ? _.links() : [];
      }
      return [];
    })
  );
  return X0(
    s
      .flat(1)
      .filter(U0)
      .filter((d) => d.rel === 'stylesheet' || d.rel === 'preload')
      .map((d) =>
        d.rel === 'stylesheet' ? { ...d, rel: 'prefetch', as: 'style' } : { ...d, rel: 'prefetch' }
      )
  );
}
function ah(l, i, r, s, d, m) {
  let _ = (h, g) => (r[g] ? h.route.id !== r[g].route.id : !0),
    p = (h, g) => {
      var b;
      return (
        r[g].pathname !== h.pathname ||
        (((b = r[g].route.path) == null ? void 0 : b.endsWith('*')) &&
          r[g].params['*'] !== h.params['*'])
      );
    };
  return m === 'assets'
    ? i.filter((h, g) => _(h, g) || p(h, g))
    : m === 'data'
      ? i.filter((h, g) => {
          var k;
          let b = s.routes[h.route.id];
          if (!b || !b.hasLoader) return !1;
          if (_(h, g) || p(h, g)) return !0;
          if (h.route.shouldRevalidate) {
            let A = h.route.shouldRevalidate({
              currentUrl: new URL(d.pathname + d.search + d.hash, window.origin),
              currentParams: ((k = r[0]) == null ? void 0 : k.params) || {},
              nextUrl: new URL(l, window.origin),
              nextParams: h.params,
              defaultShouldRevalidate: !0,
            });
            if (typeof A == 'boolean') return A;
          }
          return !0;
        })
      : [];
}
function G0(l, i, { includeHydrateFallback: r } = {}) {
  return Y0(
    l
      .map((s) => {
        let d = i.routes[s.route.id];
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
function Y0(l) {
  return [...new Set(l)];
}
function V0(l) {
  let i = {},
    r = Object.keys(l).sort();
  for (let s of r) i[s] = l[s];
  return i;
}
function X0(l, i) {
  let r = new Set();
  return (
    new Set(i),
    l.reduce((s, d) => {
      let m = JSON.stringify(V0(d));
      return (r.has(m) || (r.add(m), s.push({ key: m, link: d })), s);
    }, [])
  );
}
function bd() {
  let l = x.useContext(ti);
  return (yd(l, 'You must render this element inside a <DataRouterContext.Provider> element'), l);
}
function Q0() {
  let l = x.useContext(so);
  return (
    yd(l, 'You must render this element inside a <DataRouterStateContext.Provider> element'),
    l
  );
}
var xd = x.createContext(void 0);
xd.displayName = 'FrameworkContext';
function Sd() {
  let l = x.useContext(xd);
  return (yd(l, 'You must render this element inside a <HydratedRouter> element'), l);
}
function K0(l, i) {
  let r = x.useContext(xd),
    [s, d] = x.useState(!1),
    [m, _] = x.useState(!1),
    { onFocus: p, onBlur: h, onMouseEnter: g, onMouseLeave: b, onTouchStart: k } = i,
    A = x.useRef(null);
  (x.useEffect(() => {
    if ((l === 'render' && _(!0), l === 'viewport')) {
      let I = (w) => {
          w.forEach((j) => {
            _(j.isIntersecting);
          });
        },
        M = new IntersectionObserver(I, { threshold: 0.5 });
      return (
        A.current && M.observe(A.current),
        () => {
          M.disconnect();
        }
      );
    }
  }, [l]),
    x.useEffect(() => {
      if (s) {
        let I = setTimeout(() => {
          _(!0);
        }, 100);
        return () => {
          clearTimeout(I);
        };
      }
    }, [s]));
  let C = () => {
      d(!0);
    },
    z = () => {
      (d(!1), _(!1));
    };
  return r
    ? l !== 'intent'
      ? [m, A, {}]
      : [
          m,
          A,
          {
            onFocus: as(p, C),
            onBlur: as(h, z),
            onMouseEnter: as(g, C),
            onMouseLeave: as(b, z),
            onTouchStart: as(k, C),
          },
        ]
    : [!1, A, {}];
}
function as(l, i) {
  return (r) => {
    (l && l(r), r.defaultPrevented || i(r));
  };
}
function Z0({ page: l, ...i }) {
  let r = r0(),
    { router: s } = bd(),
    d = x.useMemo(() => Hh(s.routes, l, s.basename), [s.routes, l, s.basename]);
  return d
    ? r
      ? x.createElement(P0, { page: l, matches: d, ...i })
      : x.createElement(F0, { page: l, matches: d, ...i })
    : null;
}
function J0(l) {
  let { manifest: i, routeModules: r } = Sd(),
    [s, d] = x.useState([]);
  return (
    x.useEffect(() => {
      let m = !1;
      return (
        $0(l, i, r).then((_) => {
          m || d(_);
        }),
        () => {
          m = !0;
        }
      );
    }, [l, i, r]),
    s
  );
}
function P0({ page: l, matches: i, ...r }) {
  let s = jl(),
    { future: d } = Sd(),
    { basename: m } = bd(),
    _ = x.useMemo(() => {
      if (l === s.pathname + s.search + s.hash) return [];
      let p = tg(l, m, d.unstable_trailingSlashAwareDataRequests, 'rsc'),
        h = !1,
        g = [];
      for (let b of i)
        typeof b.route.shouldRevalidate == 'function' ? (h = !0) : g.push(b.route.id);
      return (
        h && g.length > 0 && p.searchParams.set('_routes', g.join(',')),
        [p.pathname + p.search]
      );
    }, [m, d.unstable_trailingSlashAwareDataRequests, l, s, i]);
  return x.createElement(
    x.Fragment,
    null,
    _.map((p) => x.createElement('link', { key: p, rel: 'prefetch', as: 'fetch', href: p, ...r }))
  );
}
function F0({ page: l, matches: i, ...r }) {
  let s = jl(),
    { future: d, manifest: m, routeModules: _ } = Sd(),
    { basename: p } = bd(),
    { loaderData: h, matches: g } = Q0(),
    b = x.useMemo(() => ah(l, i, g, m, s, 'data'), [l, i, g, m, s]),
    k = x.useMemo(() => ah(l, i, g, m, s, 'assets'), [l, i, g, m, s]),
    A = x.useMemo(() => {
      if (l === s.pathname + s.search + s.hash) return [];
      let I = new Set(),
        M = !1;
      if (
        (i.forEach((j) => {
          var $;
          let V = m.routes[j.route.id];
          !V ||
            !V.hasLoader ||
            ((!b.some((te) => te.route.id === j.route.id) &&
              j.route.id in h &&
              ($ = _[j.route.id]) != null &&
              $.shouldRevalidate) ||
            V.hasClientLoader
              ? (M = !0)
              : I.add(j.route.id));
        }),
        I.size === 0)
      )
        return [];
      let w = tg(l, p, d.unstable_trailingSlashAwareDataRequests, 'data');
      return (
        M &&
          I.size > 0 &&
          w.searchParams.set(
            '_routes',
            i
              .filter((j) => I.has(j.route.id))
              .map((j) => j.route.id)
              .join(',')
          ),
        [w.pathname + w.search]
      );
    }, [p, d.unstable_trailingSlashAwareDataRequests, h, s, m, b, i, l, _]),
    C = x.useMemo(() => G0(k, m), [k, m]),
    z = J0(k);
  return x.createElement(
    x.Fragment,
    null,
    A.map((I) => x.createElement('link', { key: I, rel: 'prefetch', as: 'fetch', href: I, ...r })),
    C.map((I) => x.createElement('link', { key: I, rel: 'modulepreload', href: I, ...r })),
    z.map(({ key: I, link: M }) =>
      x.createElement('link', {
        key: I,
        nonce: r.nonce,
        ...M,
        crossOrigin: M.crossOrigin ?? r.crossOrigin,
      })
    )
  );
}
function W0(...l) {
  return (i) => {
    l.forEach((r) => {
      typeof r == 'function' ? r(i) : r != null && (r.current = i);
    });
  };
}
var eb =
  typeof window < 'u' && typeof window.document < 'u' && typeof window.document.createElement < 'u';
try {
  eb && (window.__reactRouterVersion = '7.14.2');
} catch {}
function tb({ basename: l, children: i, unstable_useTransitions: r, window: s }) {
  let d = x.useRef();
  d.current == null && (d.current = Iy({ window: s, v5Compat: !0 }));
  let m = d.current,
    [_, p] = x.useState({ action: m.action, location: m.location }),
    h = x.useCallback(
      (g) => {
        r === !1 ? p(g) : x.startTransition(() => p(g));
      },
      [r]
    );
  return (
    x.useLayoutEffect(() => m.listen(h), [m, h]),
    x.createElement(A0, {
      basename: l,
      children: i,
      location: _.location,
      navigationType: _.action,
      navigator: m,
      unstable_useTransitions: r,
    })
  );
}
var lg = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,
  ag = x.forwardRef(function (
    {
      onClick: i,
      discover: r = 'render',
      prefetch: s = 'none',
      relative: d,
      reloadDocument: m,
      replace: _,
      unstable_mask: p,
      state: h,
      target: g,
      to: b,
      preventScrollReset: k,
      viewTransition: A,
      unstable_defaultShouldRevalidate: C,
      ...z
    },
    I
  ) {
    let { basename: M, navigator: w, unstable_useTransitions: j } = x.useContext(Kt),
      V = typeof b == 'string' && lg.test(b),
      $ = Vh(b, M);
    b = $.to;
    let te = f0(b, { relative: d }),
      K = jl(),
      S = null;
    if (p) {
      let D = io(p, [], K.unstable_mask ? K.unstable_mask.pathname : '/', !0);
      (M !== '/' && (D.pathname = D.pathname === '/' ? M : kl([M, D.pathname])),
        (S = w.createHref(D)));
    }
    let [q, X, ne] = K0(s, z),
      Z = ib(b, {
        replace: _,
        unstable_mask: p,
        state: h,
        target: g,
        preventScrollReset: k,
        relative: d,
        viewTransition: A,
        unstable_defaultShouldRevalidate: C,
        unstable_useTransitions: j,
      });
    function ie(D) {
      (i && i(D), D.defaultPrevented || Z(D));
    }
    let ke = !($.isExternal || m),
      Se = x.createElement('a', {
        ...z,
        ...ne,
        href: (ke ? S : void 0) || $.absoluteURL || te,
        onClick: ke ? ie : i,
        ref: W0(I, X),
        target: g,
        'data-discover': !V && r === 'render' ? 'true' : void 0,
      });
    return q && !V ? x.createElement(x.Fragment, null, Se, x.createElement(Z0, { page: te })) : Se;
  });
ag.displayName = 'Link';
var lb = x.forwardRef(function (
  {
    'aria-current': i = 'page',
    caseSensitive: r = !1,
    className: s = '',
    end: d = !1,
    style: m,
    to: _,
    viewTransition: p,
    children: h,
    ...g
  },
  b
) {
  let k = fs(_, { relative: g.relative }),
    A = jl(),
    C = x.useContext(so),
    { navigator: z, basename: I } = x.useContext(Kt),
    M = C != null && ub(k) && p === !0,
    w = z.encodeLocation ? z.encodeLocation(k).pathname : k.pathname,
    j = A.pathname,
    V = C && C.navigation && C.navigation.location ? C.navigation.location.pathname : null;
  (r || ((j = j.toLowerCase()), (V = V ? V.toLowerCase() : null), (w = w.toLowerCase())),
    V && I && (V = ea(V, I) || V));
  const $ = w !== '/' && w.endsWith('/') ? w.length - 1 : w.length;
  let te = j === w || (!d && j.startsWith(w) && j.charAt($) === '/'),
    K = V != null && (V === w || (!d && V.startsWith(w) && V.charAt(w.length) === '/')),
    S = { isActive: te, isPending: K, isTransitioning: M },
    q = te ? i : void 0,
    X;
  typeof s == 'function'
    ? (X = s(S))
    : (X = [s, te ? 'active' : null, K ? 'pending' : null, M ? 'transitioning' : null]
        .filter(Boolean)
        .join(' '));
  let ne = typeof m == 'function' ? m(S) : m;
  return x.createElement(
    ag,
    { ...g, 'aria-current': q, className: X, ref: b, style: ne, to: _, viewTransition: p },
    typeof h == 'function' ? h(S) : h
  );
});
lb.displayName = 'NavLink';
var ab = x.forwardRef(
  (
    {
      discover: l = 'render',
      fetcherKey: i,
      navigate: r,
      reloadDocument: s,
      replace: d,
      state: m,
      method: _ = Qr,
      action: p,
      onSubmit: h,
      relative: g,
      preventScrollReset: b,
      viewTransition: k,
      unstable_defaultShouldRevalidate: A,
      ...C
    },
    z
  ) => {
    let { unstable_useTransitions: I } = x.useContext(Kt),
      M = ob(),
      w = cb(p, { relative: g }),
      j = _.toLowerCase() === 'get' ? 'get' : 'post',
      V = typeof p == 'string' && lg.test(p),
      $ = (te) => {
        if ((h && h(te), te.defaultPrevented)) return;
        te.preventDefault();
        let K = te.nativeEvent.submitter,
          S = (K == null ? void 0 : K.getAttribute('formmethod')) || _,
          q = () =>
            M(K || te.currentTarget, {
              fetcherKey: i,
              method: S,
              navigate: r,
              replace: d,
              state: m,
              relative: g,
              preventScrollReset: b,
              viewTransition: k,
              unstable_defaultShouldRevalidate: A,
            });
        I && r !== !1 ? x.startTransition(() => q()) : q();
      };
    return x.createElement('form', {
      ref: z,
      method: j,
      action: w,
      onSubmit: s ? h : $,
      ...C,
      'data-discover': !V && l === 'render' ? 'true' : void 0,
    });
  }
);
ab.displayName = 'Form';
function nb(l) {
  return `${l} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function ng(l) {
  let i = x.useContext(ti);
  return (lt(i, nb(l)), i);
}
function ib(
  l,
  {
    target: i,
    replace: r,
    unstable_mask: s,
    state: d,
    preventScrollReset: m,
    relative: _,
    viewTransition: p,
    unstable_defaultShouldRevalidate: h,
    unstable_useTransitions: g,
  } = {}
) {
  let b = xl(),
    k = jl(),
    A = fs(l, { relative: _ });
  return x.useCallback(
    (C) => {
      if (M0(C, i)) {
        C.preventDefault();
        let z = r !== void 0 ? r : cs(k) === cs(A),
          I = () =>
            b(l, {
              replace: z,
              unstable_mask: s,
              state: d,
              preventScrollReset: m,
              relative: _,
              viewTransition: p,
              unstable_defaultShouldRevalidate: h,
            });
        g ? x.startTransition(() => I()) : I();
      }
    },
    [k, b, A, r, s, d, i, l, m, _, p, h, g]
  );
}
var sb = 0,
  rb = () => `__${String(++sb)}__`;
function ob() {
  let { router: l } = ng('useSubmit'),
    { basename: i } = x.useContext(Kt),
    r = N0(),
    s = l.fetch,
    d = l.navigate;
  return x.useCallback(
    async (m, _ = {}) => {
      let { action: p, method: h, encType: g, formData: b, body: k } = z0(m, i);
      if (_.navigate === !1) {
        let A = _.fetcherKey || rb();
        await s(A, r, _.action || p, {
          unstable_defaultShouldRevalidate: _.unstable_defaultShouldRevalidate,
          preventScrollReset: _.preventScrollReset,
          formData: b,
          body: k,
          formMethod: _.method || h,
          formEncType: _.encType || g,
          flushSync: _.flushSync,
        });
      } else
        await d(_.action || p, {
          unstable_defaultShouldRevalidate: _.unstable_defaultShouldRevalidate,
          preventScrollReset: _.preventScrollReset,
          formData: b,
          body: k,
          formMethod: _.method || h,
          formEncType: _.encType || g,
          replace: _.replace,
          state: _.state,
          fromRouteId: r,
          flushSync: _.flushSync,
          viewTransition: _.viewTransition,
        });
    },
    [s, d, i, r]
  );
}
function cb(l, { relative: i } = {}) {
  let { basename: r } = x.useContext(Kt),
    s = x.useContext(bl);
  lt(s, 'useFormAction must be used inside a RouteContext');
  let [d] = s.matches.slice(-1),
    m = { ...fs(l || '.', { relative: i }) },
    _ = jl();
  if (l == null) {
    m.search = _.search;
    let p = new URLSearchParams(m.search),
      h = p.getAll('index');
    if (h.some((b) => b === '')) {
      (p.delete('index'), h.filter((k) => k).forEach((k) => p.append('index', k)));
      let b = p.toString();
      m.search = b ? `?${b}` : '';
    }
  }
  return (
    (!l || l === '.') &&
      d.route.index &&
      (m.search = m.search ? m.search.replace(/^\?/, '?index&') : '?index'),
    r !== '/' && (m.pathname = m.pathname === '/' ? r : kl([r, m.pathname])),
    cs(m)
  );
}
function ub(l, { relative: i } = {}) {
  let r = x.useContext(Kh);
  lt(
    r != null,
    "`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?"
  );
  let { basename: s } = ng('useViewTransitionState'),
    d = fs(l, { relative: i });
  if (!r.isTransitioning) return !1;
  let m = ea(r.currentLocation.pathname, s) || r.currentLocation.pathname,
    _ = ea(r.nextLocation.pathname, s) || r.nextLocation.pathname;
  return Jr(d.pathname, _) != null || Jr(d.pathname, m) != null;
}
const db = '_layout_ahbo7_1',
  mb = '_enemies_ahbo7_12',
  _b = '_enemy_ahbo7_20',
  fb = '_targeted_ahbo7_35',
  pb = '_enemyName_ahbo7_39',
  hb = '_enemyResist_ahbo7_44',
  gb = '_down_ahbo7_49',
  kb = '_log_ahbo7_53',
  vb = '_logLine_ahbo7_65',
  yb = '_party_ahbo7_69',
  bb = '_rowTag_ahbo7_76',
  xb = '_cardRow_ahbo7_82',
  Sb = '_card_ahbo7_82',
  wb = '_cardActive_ahbo7_105',
  Tb = '_allySelectable_ahbo7_110',
  Nb = '_allyTargeted_ahbo7_116',
  jb = '_cardDecided_ahbo7_123',
  Eb = '_cardName_ahbo7_127',
  Cb = '_uni_ahbo7_135',
  Ab = '_cardJob_ahbo7_139',
  Lb = '_gaugeRow_ahbo7_145',
  Bb = '_gaugeLabel_ahbo7_151',
  qb = '_flash_ahbo7_159',
  Ib = '_summons_ahbo7_181',
  Ob = '_summon_ahbo7_181',
  Mb = '_summonName_ahbo7_199',
  Rb = '_summonHp_ahbo7_208',
  Db = '_cardNums_ahbo7_214',
  zb = '_cardCmd_ahbo7_220',
  Hb = '_empty_ahbo7_226',
  Ub = '_command_ahbo7_231',
  $b = '_skillList_ahbo7_237',
  Gb = '_skillBtn_ahbo7_243',
  Yb = '_skillTop_ahbo7_255',
  Vb = '_skillName_ahbo7_262',
  Xb = '_skillDesc_ahbo7_267',
  Qb = '_skillSummary_ahbo7_273',
  Kb = '_target_ahbo7_35',
  Zb = '_targetAlly_ahbo7_285',
  Jb = '_unionBanner_ahbo7_291',
  Pb = '_unionBannerHead_ahbo7_304',
  Fb = '_unionBannerDesc_ahbo7_311',
  Wb = '_unionInfo_ahbo7_318',
  e1 = '_unionCancel_ahbo7_328',
  t1 = '_unionHint_ahbo7_337',
  l1 = '_allyTargetHint_ahbo7_343',
  a1 = '_allyTargetSub_ahbo7_354',
  n1 = '_allyTargetSelected_ahbo7_361',
  i1 = '_unionBtn_ahbo7_366',
  s1 = '_cmdHead_ahbo7_372',
  r1 = '_menu_ahbo7_377',
  o1 = '_menuBtn_ahbo7_383',
  c1 = '_tp_ahbo7_400',
  u1 = '_menuBack_ahbo7_406',
  d1 = '_execRow_ahbo7_416',
  m1 = '_redo_ahbo7_421',
  _1 = '_primary_ahbo7_431',
  f1 = '_result_ahbo7_446',
  p1 = '_resultTitle_ahbo7_457',
  h1 = '_resultBody_ahbo7_462',
  g1 = '_expList_ahbo7_466',
  k1 = '_expRow_ahbo7_474',
  v1 = '_expName_ahbo7_480',
  y1 = '_expLv_ahbo7_488',
  b1 = '_expUp_ahbo7_493',
  x1 = '_expNum_ahbo7_498',
  S1 = '_playback_ahbo7_504',
  w1 = '_playbackHint_ahbo7_514',
  T1 = '_skip_ahbo7_520',
  N1 = '_logLineNew_ahbo7_531',
  j1 = '_dialogOverlay_ahbo7_546',
  E1 = '_dialog_ahbo7_546',
  C1 = '_dialogTitle_ahbo7_581',
  A1 = '_dialogName_ahbo7_587',
  L1 = '_dialogStats_ahbo7_592',
  B1 = '_dialogStat_ahbo7_592',
  q1 = '_fxIntro_ahbo7_608',
  I1 = '_fxOutro_ahbo7_628',
  O1 = '_fxLose_ahbo7_637',
  F = {
    layout: db,
    enemies: mb,
    enemy: _b,
    targeted: fb,
    enemyName: pb,
    enemyResist: hb,
    down: gb,
    log: kb,
    logLine: vb,
    party: yb,
    rowTag: bb,
    cardRow: xb,
    card: Sb,
    cardActive: wb,
    allySelectable: Tb,
    allyTargeted: Nb,
    cardDecided: jb,
    cardName: Eb,
    uni: Cb,
    cardJob: Ab,
    gaugeRow: Lb,
    gaugeLabel: Bb,
    flash: qb,
    summons: Ib,
    summon: Ob,
    summonName: Mb,
    summonHp: Rb,
    cardNums: Db,
    cardCmd: zb,
    empty: Hb,
    command: Ub,
    skillList: $b,
    skillBtn: Gb,
    skillTop: Yb,
    skillName: Vb,
    skillDesc: Xb,
    skillSummary: Qb,
    target: Kb,
    targetAlly: Zb,
    unionBanner: Jb,
    unionBannerHead: Pb,
    unionBannerDesc: Fb,
    unionInfo: Wb,
    unionCancel: e1,
    unionHint: t1,
    allyTargetHint: l1,
    allyTargetSub: a1,
    allyTargetSelected: n1,
    unionBtn: i1,
    cmdHead: s1,
    menu: r1,
    menuBtn: o1,
    tp: c1,
    menuBack: u1,
    execRow: d1,
    redo: m1,
    primary: _1,
    result: f1,
    resultTitle: p1,
    resultBody: h1,
    expList: g1,
    expRow: k1,
    expName: v1,
    expLv: y1,
    expUp: b1,
    expNum: x1,
    playback: S1,
    playbackHint: w1,
    skip: T1,
    logLineNew: N1,
    dialogOverlay: j1,
    dialog: E1,
    dialogTitle: C1,
    dialogName: A1,
    dialogStats: L1,
    dialogStat: B1,
    fxIntro: q1,
    fxOutro: I1,
    fxLose: O1,
  },
  wd = x.createContext(null),
  El = () => {
    const l = x.useContext(wd);
    return l ? l.play : () => {};
  },
  M1 = '_root_1q1uf_1',
  R1 = '_group_1q1uf_7',
  D1 = '_groupLabel_1q1uf_14',
  z1 = '_badges_1q1uf_23',
  H1 = '_badge_1q1uf_23',
  U1 = '_weak_1q1uf_39',
  $1 = '_half_1q1uf_45',
  G1 = '_none_1q1uf_57',
  rl = {
    root: M1,
    group: R1,
    groupLabel: D1,
    badges: z1,
    badge: H1,
    weak: U1,
    half: $1,
    null: '_null_1q1uf_51',
    none: G1,
  },
  Y1 = { slash: '斬', pierce: '突', bash: '壊', fire: '火', ice: '氷', volt: '雷', almighty: '無' },
  V1 = {
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
function nh(l) {
  return l === 0
    ? { text: '無', tier: 'null' }
    : l < 1
      ? { text: '半', tier: 'half' }
      : l > 1
        ? { text: '弱', tier: 'weak' }
        : null;
}
const X1 = ['slash', 'pierce', 'bash', 'fire', 'ice', 'volt'],
  Q1 = [
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
  Pn = ({ elementResist: l, ailmentResist: i, compact: r = !1 }) => {
    const s = [];
    for (const p of X1) {
      const h = (l == null ? void 0 : l[p]) ?? 1,
        g = nh(h);
      g && ((r && g.tier === 'half') || s.push({ label: `${Y1[p]}${g.text}`, tier: g.tier }));
    }
    const d = [];
    for (const p of Q1) {
      const h = (i == null ? void 0 : i[p]) ?? 1,
        g = nh(h);
      g && ((r && g.tier === 'half') || d.push({ label: `${V1[p]}${g.text}`, tier: g.tier }));
    }
    const m = s.length > 0,
      _ = d.length > 0;
    return !m && !_
      ? u.jsx('span', { className: rl.none, children: '（耐性なし）' })
      : u.jsxs('div', {
          className: rl.root,
          children: [
            m &&
              u.jsxs('div', {
                className: rl.group,
                children: [
                  !r && u.jsx('span', { className: rl.groupLabel, children: '属性' }),
                  u.jsx('div', {
                    className: rl.badges,
                    children: s.map((p) =>
                      u.jsx(
                        'span',
                        { className: `${rl.badge} ${rl[p.tier]}`, children: p.label },
                        p.label
                      )
                    ),
                  }),
                ],
              }),
            _ &&
              u.jsxs('div', {
                className: rl.group,
                children: [
                  !r && u.jsx('span', { className: rl.groupLabel, children: '状態異常' }),
                  u.jsx('div', {
                    className: rl.badges,
                    children: d.map((p) =>
                      u.jsx(
                        'span',
                        { className: `${rl.badge} ${rl[p.tier]}`, children: p.label },
                        p.label
                      )
                    ),
                  }),
                ],
              }),
          ],
        });
  },
  K1 = '_row_1t6j7_1',
  Z1 = '_label_1t6j7_8',
  J1 = '_track_1t6j7_16',
  P1 = '_fill_1t6j7_24',
  F1 = '_value_1t6j7_30',
  ns = { row: K1, label: Z1, track: J1, fill: P1, value: F1 },
  Gn = ({ value: l, max: i, color: r = '#4caf50', label: s, showValue: d = !0 }) => {
    const m = i > 0 ? Math.max(0, Math.min(100, (l / i) * 100)) : 0;
    return u.jsxs('div', {
      className: ns.row,
      children: [
        s ? u.jsx('span', { className: ns.label, children: s }) : null,
        u.jsx('div', {
          className: ns.track,
          children: u.jsx('div', {
            className: ns.fill,
            style: { width: `${m}%`, backgroundColor: r },
          }),
        }),
        d
          ? u.jsxs('span', {
              className: ns.value,
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
  W1 = 10,
  ex = {
    id: 'ea_double_strike',
    name: '二連撃',
    element: 'bash',
    target: 'enemyOne',
    effects: [{ kind: 'damage', statBase: 'str', power: () => 0.7, hits: 2 }],
    weight: 5,
    cond: { cooldown: 3 },
  },
  ih = {
    id: 'ea_guard_up',
    name: '身構え',
    element: 'almighty',
    target: 'self',
    effects: [{ kind: 'buff', stat: 'pdef', modifier: () => 1.3, turns: 2, stackGroup: 'defBuff' }],
    weight: 3,
    cond: { cooldown: 4 },
  },
  tx = {
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
  sh = {
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
  rh = {
    id: 'ea_heavy_blow',
    name: '強打',
    element: 'bash',
    target: 'enemyOne',
    effects: [{ kind: 'damage', statBase: 'str', power: () => 1.6 }],
    weight: 5,
    cond: { cooldown: 3 },
  },
  lx = {
    id: 'ea_sweep',
    name: '薙ぎ払い',
    element: 'bash',
    target: 'enemyAll',
    effects: [{ kind: 'damage', statBase: 'str', power: () => 0.9 }],
    weight: 4,
    cond: { cooldown: 4 },
  },
  ax = {
    id: 'ea_war_roar',
    name: '戦吼',
    element: 'almighty',
    target: 'self',
    effects: [{ kind: 'buff', stat: 'patk', modifier: () => 1.3, turns: 3, stackGroup: 'atkBuff' }],
    weight: 3,
    cond: { cooldown: 5 },
  },
  nx = {
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
function ps(l, i, r) {
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
function hs(l, i, r) {
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
function gs(l) {
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
function ks(l) {
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
function vs(l, i, r) {
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
function ys(l, i, r) {
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
const ix = {
    zako_bruiser: [ex, ih],
    zako_venom: [tx, sh],
    zako_caster: [sh, ih],
    foe_heavy: [rh, ax, nx],
    foe_striker: [rh, lx],
  },
  sx = [
    ps('eb_gk_sig', '大地割り', 'bash'),
    hs('eb_gk_aoe', '岩砕き', 'bash'),
    gs('eb_gk_sbuff'),
    ks('eb_gk_dbuff'),
    vs('eb_gk_enrage', '激昂', 'bash'),
    ys('eb_gk_status', '石礫の嵐', 'paralysis'),
  ],
  rx = [
    ps('eb_ml_sig', '山嶺の一撃', 'bash'),
    hs('eb_ml_aoe', '猿軍の押し潰し', 'bash'),
    gs('eb_ml_sbuff'),
    ks('eb_ml_dbuff'),
    vs('eb_ml_enrage', '激昂', 'bash'),
    ys('eb_ml_status', '雄叫び', 'paralysis'),
  ],
  ox = [
    ps('eb_fm_sig', '絶対零度', 'bash'),
    hs('eb_fm_aoe', '氷雪乱舞', 'ice'),
    gs('eb_fm_sbuff'),
    ks('eb_fm_dbuff'),
    vs('eb_fm_enrage', '激昂・極氷', 'ice'),
    ys('eb_fm_status', '凍結の息吹', 'paralysis'),
  ],
  cx = [
    ps('eb_ts_sig', '雷霆斬', 'slash'),
    hs('eb_ts_aoe', '嵐の剣舞', 'volt'),
    gs('eb_ts_sbuff'),
    ks('eb_ts_dbuff'),
    vs('eb_ts_enrage', '激昂・雷霆', 'volt'),
    ys('eb_ts_status', '電撃の刃', 'paralysis'),
  ],
  ux = [
    ps('eb_bs_sig', '瘴気爆発', 'bash'),
    hs('eb_bs_aoe', '腐敗の波動', 'bash'),
    gs('eb_bs_sbuff'),
    ks('eb_bs_dbuff'),
    vs('eb_bs_enrage', '激昂・腐王', 'bash'),
    ys('eb_bs_status', '猛毒の霧', 'poison'),
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
      actions: sx,
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
      actions: rx,
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
      actions: ox,
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
      actions: cx,
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
      actions: ux,
      ailmentResist: { poison: 0, sleep: 0 },
    },
  },
  at = {
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
function dx(l) {
  return l.category === 'food' ? 0 : l.category === 'material' ? 8 : Math.floor(l.buyPrice / 2);
}
function mx(l) {
  var i;
  return ((i = at[l]) == null ? void 0 : i.category) === 'food';
}
const Pe = {
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
  Zn = {
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
  Kn = {
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
  _x = [
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
  fx = { zako: 0.7, foe: 0.5, boss: 0.35 };
function px(l) {
  const i = fx[l],
    r = {};
  for (const s of _x) r[s] = i;
  return r;
}
const hx = {
  construct: { poison: 0, sleep: 0, paralysis: 0.5 },
  spirit: { armBind: 0, headBind: 0, legBind: 0, poison: 0, sleep: 1.3 },
  undead: { poison: 0, sleep: 0 },
  plant: { poison: 0, blind: 0 },
  slime: { armBind: 0, legBind: 0, paralysis: 1.3 },
  insect: { poison: 0.5, paralysis: 1.3 },
  bird: { legBind: 0 },
  beast: {},
};
function gx(l) {
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
function Td(l) {
  const i = Tt[l];
  if (!i) return {};
  const r = i.kind ?? 'zako',
    s = r === 'boss' ? 'boss' : r === 'foe' ? 'foe' : 'zako',
    d = gx(i);
  return { ...px(s), ...hx[d], ...(i.ailmentResist ?? {}) };
}
const Oe = {
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
  kx = 500,
  ed = 30,
  bs = 3,
  xs = 2,
  oh = bs + xs,
  is = { TITLE_DEPTH: 20, REBIRTH_MIN_LEVEL: 30 },
  ig = 5,
  vx = 5,
  Pl = {
    MAX_LEVEL: 5,
    STAT_PER_LEVEL: 2,
    TIER_STEP: 1.6,
    INGOT_INC: { copper: 1, silver: 3, gold: 5 },
    FRAGMENTS_PER_INGOT: 10,
  },
  ss = (l) => l > 0 && l % Oe.BOSS_INTERVAL === 0,
  ch = (l) => Math.floor((l - 1) / Oe.BAND_SIZE),
  td = (l) => Math.round(Oe.EXP_CURVE_BASE * Math.pow(l, Oe.EXP_CURVE_POW)),
  Fr = (l) => Math.round(Oe.SP_PER_LEVEL * Math.max(0, l - 1)),
  yx = (l) => Fr(l) - Fr(l - 1),
  rs = (l) => l < Oe.LEVEL_CAP,
  Nd = (l, i) => 1 + Oe.ENEMY_SCALE_K * (l - i),
  et = {
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
  ai = {
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
  bx = ['hp', 'tp', 'str', 'vit', 'agi', 'int', 'mnd', 'luc'],
  xx = ['slash', 'pierce', 'bash'],
  Wr = (l, i, r) => Math.max(i, Math.min(r, l));
function sg(l, i) {
  const r = {};
  for (const s of bx) r[s] = Math.round(l[s] * i);
  return r;
}
function Sx(l, i) {
  return sg(l.baseStats, Nd(i, l.refDepth));
}
function Yn(l, i) {
  const r = new Map();
  for (const d of l) {
    if (d.stat !== i) continue;
    const m = Wr(d.modifier, 0.5, 1.5),
      _ = r.get(d.stackGroup);
    (_ === void 0 || Math.abs(m - 1) > Math.abs(_ - 1)) && r.set(d.stackGroup, m);
  }
  let s = 1;
  for (const d of r.values()) s *= d;
  return Wr(s, 0.25, 2);
}
function ld(l, i, r, s) {
  const d = (g) => (s == null ? void 0 : s[g]) ?? 1,
    m = (l.str * 2 + (i.atk ?? 0)) * Yn(r, 'patk') * d('patk'),
    _ = (l.vit * 2 + (i.def ?? 0)) * Yn(r, 'pdef') * d('pdef'),
    p = (l.int * 2 + (i.mat ?? 0)) * Yn(r, 'matk') * d('matk'),
    h = (l.mnd * 2 + (i.mdf ?? 0)) * Yn(r, 'mdef') * d('mdef');
  return {
    patk: m,
    pdef: _,
    matk: p,
    mdef: h,
    hit: l.agi,
    acc: l.agi * Yn(r, 'acc') * d('acc'),
    eva: l.agi * Yn(r, 'eva') * d('eva'),
    crit: l.luc,
  };
}
const wx = (l) => l.ailments.some((i) => i.type === 'blind'),
  Tx = (l) => l.ailments.some((i) => i.type === 'legBind');
function Nx(l, i, r, s) {
  var S;
  const d = r.statBase === 'str',
    m = ld(l.stats, l.equip, l.buffs, l.passive),
    _ = ld(i.stats, i.equip, i.buffs, i.passive),
    p = d ? m.patk : m.matk,
    h = d ? _.pdef : _.mdef;
  let g = !0;
  if (d) {
    const q = wx(l) ? Oe.BLIND_ACC_PENALTY : 0,
      X = Tx(i) ? 0 : _.eva,
      ne = Wr(Oe.BASE_HIT + (m.acc - X) * Oe.HIT_AGI_K - q, Oe.HIT_MIN, 1);
    g = s.next() < ne;
  }
  if (!g) return { damage: 0, hit: !1, critical: !1 };
  const k = (p * r.power * Oe.DAMAGE_DEF_K) / (Oe.DAMAGE_DEF_K + Math.max(0, h)),
    A = d && xx.includes(r.element),
    C = A && l.row === 'back' ? Oe.BACK_ROW_MELEE_MULT : 1,
    z = A && i.row === 'back' ? Oe.BACK_ROW_MELEE_MULT : 1,
    I = C * z,
    [M, w] = Oe.DMG_VARIANCE,
    j = M + s.next() * (w - M);
  let V = k * r.elementMultiplier * I * j;
  const $ = Wr(
      Oe.CRIT_BASE +
        (l.stats.luc - i.stats.luc) * Oe.CRIT_LUC_K +
        (((S = l.passive) == null ? void 0 : S.crit) ?? 0),
      Oe.CRIT_MIN,
      Oe.CRIT_MAX
    ),
    te = s.next() < $;
  return (
    te && (V *= Oe.CRIT_MULT),
    { damage: r.elementMultiplier === 0 ? 0 : Math.max(1, Math.floor(V)), hit: !0, critical: te }
  );
}
const rg = () => Math.max(0, ...Object.values(Tt).map((l) => l.tierBand)),
  og = (l) => Math.floor((l - 1) / Oe.BAND_SIZE);
function cg(l) {
  return og(l) % (rg() + 1);
}
function ug(l) {
  return Math.floor(og(l) / (rg() + 1)) + 1;
}
function jx(l) {
  const i = cg(l);
  return Object.values(Tt)
    .filter((r) => r.tierBand === i && !r.isBoss && r.kind !== 'foe')
    .map((r) => r.id);
}
function Ex(l, i) {
  const r = jx(l);
  if (r.length === 0) return [];
  const s = i.range(1, 3);
  return Array.from({ length: s }, () => i.pick(r));
}
function Cx(l) {
  return Math.round(Pl.STAT_PER_LEVEL * Math.pow(Pl.TIER_STEP, l));
}
function dg(l) {
  const i = et[l];
  return i ? Math.max(2, Math.floor(i.buyPrice / 120)) : 2;
}
function Ax(l, i) {
  const r = et[l];
  if (!r || i <= 0) return {};
  const s = Cx(r.tier ?? 0),
    d = i * s;
  return r.slot === 'weapon' ? { atk: d, mat: d } : r.slot === 'armor' ? { def: d, mdf: d } : {};
}
function Fn(l) {
  return 1 + 0.5 * (Math.max(1, l ?? 1) - 1);
}
function jd(l, i) {
  const r = et[l];
  if (!r) return {};
  const s = Fn(i),
    d = {};
  return (
    r.bonuses.atk && (d.atk = Math.round(r.bonuses.atk * s)),
    r.bonuses.mat && (d.mat = Math.round(r.bonuses.mat * s)),
    r.bonuses.def && (d.def = Math.round(r.bonuses.def * s)),
    r.bonuses.mdf && (d.mdf = Math.round(r.bonuses.mdf * s)),
    r.bonuses.statMods && (d.statMods = r.bonuses.statMods),
    d
  );
}
const mg = ['weapon', 'armor', 'accessory'];
function Lx(l, i, r) {
  const s = l.guild.equipment.map((m) => (m.id === i ? r(m) : m)),
    d = l.guild.members.map((m) => {
      let _ = !1;
      const p = { ...m.equipment };
      for (const h of mg) {
        const g = p[h];
        g && g.id === i && ((p[h] = r(g)), (_ = !0));
      }
      return _ ? { ...m, equipment: p } : m;
    });
  return { ...l, guild: { ...l.guild, equipment: s, members: d } };
}
function Bx(l, i, r) {
  let s = l.guild.equipment.find((_) => _.id === i);
  if (!s)
    for (const _ of l.guild.members)
      for (const p of mg) {
        const h = _.equipment[p];
        (h == null ? void 0 : h.id) === i && (s = h);
      }
  if (!s) return { ok: !1, save: l, reason: 'notFound' };
  if (s.forgeLevel >= Pl.MAX_LEVEL) return { ok: !1, save: l, reason: 'maxLevel' };
  if ((l.forgeInventory.ingots[r] ?? 0) <= 0) return { ok: !1, save: l, reason: 'noIngot' };
  const d = Math.min(Pl.MAX_LEVEL, s.forgeLevel + Pl.INGOT_INC[r]);
  let m = {
    ...l,
    forgeInventory: {
      ...l.forgeInventory,
      ingots: { ...l.forgeInventory.ingots, [r]: l.forgeInventory.ingots[r] - 1 },
    },
  };
  return ((m = Lx(m, i, (_) => ({ ..._, forgeLevel: d }))), { ok: !0, save: m });
}
function qx(l, i) {
  const r = l.guild.equipment.find((_) => _.id === i);
  if (!r) return { ok: !1, save: l, reason: 'notFound' };
  const s = l.guild.equipment.filter((_) => _.id !== i),
    d = { ...l.forgeInventory.fragments };
  d.common = (d.common ?? 0) + dg(r.masterId);
  let m = l.forgeInventory.ingots.copper;
  for (; d.common >= Pl.FRAGMENTS_PER_INGOT; ) ((d.common -= Pl.FRAGMENTS_PER_INGOT), (m += 1));
  return {
    ok: !0,
    save: {
      ...l,
      guild: { ...l.guild, equipment: s },
      forgeInventory: {
        ...l.forgeInventory,
        fragments: d,
        ingots: { ...l.forgeInventory.ingots, copper: m },
      },
    },
  };
}
function Ca(l) {
  var s;
  const i = ((s = et[l.masterId]) == null ? void 0 : s.name) ?? l.masterId,
    r = l.grade && l.grade > 1 ? `${i} Lv${l.grade}` : i;
  return l.forgeLevel > 0 ? `${r} +${l.forgeLevel}` : r;
}
const _g = (l) => l.grade ?? 1;
function Ed(l, i, r) {
  return l.guild.storage
    .filter((s) => s.itemId === i && r === void 0)
    .reduce((s, d) => s + d.qty, 0);
}
function Cd(l, i, r = 1, s = 1) {
  if (r <= 0) return l;
  const d = [...l.guild.storage],
    m = d.findIndex((_) => _.itemId === i && _g(_) === s);
  return (
    m >= 0
      ? (d[m] = { ...d[m], qty: d[m].qty + r })
      : d.push(s > 1 ? { itemId: i, qty: r, grade: s } : { itemId: i, qty: r }),
    { ...l, guild: { ...l.guild, storage: d } }
  );
}
function Ad(l, i, r = 1, s = 1) {
  if (r <= 0) return l;
  const d = l.guild.storage.findIndex((p) => p.itemId === i && _g(p) === s);
  if (d < 0 || l.guild.storage[d].qty < r) return l;
  const m = [...l.guild.storage],
    _ = m[d].qty - r;
  return (
    _ <= 0 ? m.splice(d, 1) : (m[d] = { ...m[d], qty: _ }),
    { ...l, guild: { ...l.guild, storage: m } }
  );
}
const fg = 60,
  oo = (l) => l.guild.foodStorage ?? [];
function pg(l) {
  return oo(l).reduce((i, r) => i + r.qty, 0);
}
function Ld(l, i) {
  var r;
  return ((r = oo(l).find((s) => s.itemId === i)) == null ? void 0 : r.qty) ?? 0;
}
function hg(l, i, r = 1) {
  if (r <= 0) return l;
  const s = fg - pg(l),
    d = Math.min(r, Math.max(0, s));
  if (d <= 0) return l;
  const m = [...oo(l)],
    _ = m.findIndex((p) => p.itemId === i);
  return (
    _ >= 0 ? (m[_] = { ...m[_], qty: m[_].qty + d }) : m.push({ itemId: i, qty: d }),
    { ...l, guild: { ...l.guild, foodStorage: m } }
  );
}
function gg(l, i, r = 1) {
  if (r <= 0) return l;
  const s = [...oo(l)],
    d = s.findIndex((_) => _.itemId === i);
  if (d < 0 || s[d].qty < r) return l;
  const m = s[d].qty - r;
  return (
    m <= 0 ? s.splice(d, 1) : (s[d] = { ...s[d], qty: m }),
    { ...l, guild: { ...l.guild, foodStorage: s } }
  );
}
function kg(l, i, r) {
  return {
    ...l,
    guild: { ...l.guild, members: l.guild.members.map((s) => (s.id === i ? r(s) : s)) },
  };
}
function Ix() {
  return `eq_${Date.now().toString(36)}_${Math.floor(Math.random() * 16777215).toString(36)}`;
}
function Ox(l, i, r = 0, s = 1) {
  if (!et[i]) return l;
  const d = { id: Ix(), masterId: i, forgeLevel: r };
  return (
    s > 1 && (d.grade = s),
    { ...l, guild: { ...l.guild, equipment: [...l.guild.equipment, d] } }
  );
}
function Bd(l, i) {
  const r = et[i];
  if (!r) return !1;
  const s = ze[l.classId];
  return s
    ? r.slot === 'weapon'
      ? !!r.weaponType && s.equipableWeaponTypes.includes(r.weaponType)
      : r.slot === 'armor'
        ? !!r.armorType && s.equipableArmorTypes.includes(r.armorType)
        : !0
    : !1;
}
function Mx(l, i, r) {
  const s = l.guild.equipment.find((g) => g.id === r),
    d = l.guild.members.find((g) => g.id === i);
  if (!s || !d || !Bd(d, s.masterId)) return l;
  const m = et[s.masterId];
  let _ = l.guild.equipment.filter((g) => g.id !== r);
  const p = d.equipment[m.slot];
  p && (_ = [..._, p]);
  const h = { ...l, guild: { ...l.guild, equipment: _ } };
  return kg(h, i, (g) => ({ ...g, equipment: { ...g.equipment, [m.slot]: s } }));
}
function qd(l, i, r) {
  const s = l.guild.members.find((_) => _.id === i);
  if (!s) return l;
  const d = s.equipment[r];
  if (!d) return l;
  const m = { ...l, guild: { ...l.guild, equipment: [...l.guild.equipment, d] } };
  return kg(m, i, (_) => ({ ..._, equipment: { ..._.equipment, [r]: null } }));
}
const ad = {
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
  Rx = ['patk', 'matk', 'pdef', 'mdef', 'acc', 'eva', 'maxHp', 'maxTp'];
function Dx(l) {
  var r;
  const i = l.equipment.weapon;
  if (i) return (r = et[i.masterId]) == null ? void 0 : r.weaponType;
}
function zx(l) {
  const i = Dx(l),
    r = {};
  let s = 0;
  for (const [d, m] of Object.entries(l.learnedSkills)) {
    if (m <= 0) continue;
    const _ = ad[d];
    if (!_ || (_.weaponType && _.weaponType !== i)) continue;
    const p = _.mods(m);
    for (const h of Rx) p[h] !== void 0 && (r[h] = (r[h] ?? 1) * p[h]);
    p.crit !== void 0 && (s += p.crit);
  }
  return (s !== 0 && (r.crit = s), r);
}
const gt = (l) => ({ hp: 0, tp: 0, str: 0, vit: 0, agi: 0, int: 0, mnd: 0, luc: 0, ...l }),
  Jl = {
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
      growthModifier: gt({ str: 1 }),
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
      growthModifier: gt({ vit: 1 }),
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
      growthModifier: gt({ vit: 1, hp: 2 }),
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
      growthModifier: gt({ str: 1 }),
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
      growthModifier: gt({ int: 1 }),
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
      growthModifier: gt({ tp: 2, mnd: 1 }),
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
      growthModifier: gt({ agi: 1, luc: 1 }),
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
      growthModifier: gt({ agi: 1 }),
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
      growthModifier: gt({ mnd: 1, tp: 2 }),
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
      growthModifier: gt({ luc: 1, tp: 1 }),
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
      growthModifier: gt({ agi: 1, str: 1 }),
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
      growthModifier: gt({ mnd: 1, tp: 1 }),
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
      growthModifier: gt({ str: 1, agi: 1 }),
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
      growthModifier: gt({ vit: 1, tp: 1 }),
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
      growthModifier: gt({ int: 1 }),
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
      growthModifier: gt({ int: 1, luc: 1 }),
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
      growthModifier: gt({ int: 1, tp: 1 }),
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
      growthModifier: gt({ mnd: 1, vit: 1 }),
    },
  },
  uh = [1, 2, 2, 2, 2];
function vg(l) {
  return uh[Math.min(Math.max(0, l), uh.length - 1)];
}
function Id(l) {
  var r, s;
  const i = [
    ...(((r = ze[l.classId]) == null ? void 0 : r.skillTree.skills) ?? []),
    ...(((s = Pe[l.raceId]) == null ? void 0 : s.raceSkillTree.skills) ?? []),
  ];
  return (l.titleId && Jl[l.titleId] && i.push(...Jl[l.titleId].skillTree.skills), i);
}
function Hx(l, i) {
  const r = new Map(l.map((m) => [m.skillId, m])),
    s = new Map(),
    d = (m, _ = 0) => {
      var b;
      const p = s.get(m);
      if (p !== void 0) return p;
      const h = r.get(m);
      if (!h || !((b = h.requires) != null && b.length) || _ > 30) return (s.set(m, 0), 0);
      const g =
        1 + Math.max(...h.requires.map((k) => (r.has(k.skillId) ? d(k.skillId, _ + 1) : 0)));
      return (s.set(m, g), g);
    };
  return d(i);
}
function ni(l, i) {
  return vg(Hx(Id(l), i));
}
function Jn(l, i) {
  return l.learnedSkills[i] ?? 0;
}
function us(l) {
  return l.skillPoints.total - l.skillPoints.spent;
}
function yg(l, i) {
  return (i.requires ?? []).every((r) => Jn(l, r.skillId) >= r.level);
}
function bg(l, i) {
  const r = Id(l).find((s) => s.skillId === i);
  return !r || Jn(l, i) >= r.maxLevel || us(l) < ni(l, i) ? !1 : yg(l, r);
}
function xg(l, i) {
  return bg(l, i)
    ? {
        ...l,
        learnedSkills: { ...l.learnedSkills, [i]: Jn(l, i) + 1 },
        skillPoints: { ...l.skillPoints, spent: l.skillPoints.spent + ni(l, i) },
      }
    : l;
}
function Ux(l) {
  var d, m;
  const i = Id(l),
    r =
      (m = (d = ze[l.classId]) == null ? void 0 : d.skillTree.skills[0]) == null
        ? void 0
        : m.skillId;
  let s = 0;
  for (const _ of i) {
    const p = ni(l, _.skillId);
    let h = _.maxLevel;
    (_.skillId === r && (h = Math.max(0, h - 1)), (s += p * h));
  }
  return s;
}
function $x(l) {
  return Math.max(0, l.skillPoints.total - Ux(l));
}
const Gx = ['hp', 'tp', 'str', 'vit', 'agi', 'int', 'mnd', 'luc'];
function Fl(l) {
  var h, g;
  const i = Pe[l.raceId];
  if (!i) throw new Error(`computeBaseStats: 未定義の種族 "${l.raceId}"`);
  const s = Math.max(1, Math.min(l.level, Oe.LEVEL_CAP)) - 1,
    d = l.titleId ? ((h = Jl[l.titleId]) == null ? void 0 : h.growthModifier) : void 0,
    m = ((g = l.rebirthBonus) == null ? void 0 : g.allStats) ?? 0,
    _ = Math.floor($x(l) / Oe.SURPLUS_SP_PER_STAT),
    p = {};
  for (const b of Gx) {
    const k = i.statGrowth[b] + ((d == null ? void 0 : d[b]) ?? 0);
    p[b] = i.baseStatsAtLv1[b] + k * s + m + _;
  }
  return p;
}
const Yx = 3,
  Wl = (l, i, r) => Math.max(i, Math.min(r, l)),
  Vx = {
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
function Xx(l) {
  const i = { atk: 0, mat: 0, def: 0, mdf: 0 };
  for (const r of Object.values(l.equipment)) {
    if (!r || !et[r.masterId]) continue;
    const d = jd(r.masterId, r.grade),
      m = Ax(r.masterId, r.forgeLevel);
    ((i.atk += (d.atk ?? 0) + (m.atk ?? 0)),
      (i.mat += (d.mat ?? 0) + (m.mat ?? 0)),
      (i.def += (d.def ?? 0) + (m.def ?? 0)),
      (i.mdf += (d.mdf ?? 0) + (m.mdf ?? 0)));
  }
  return i;
}
function Qx(l, i) {
  var b;
  const r = l.guild.members.find((k) => k.id === i);
  if (!r) return null;
  const s = (b = l.diveState) == null ? void 0 : b.party.find((k) => k.charId === i),
    d = Fl(r),
    m = zx(r),
    _ = Math.round(d.hp * (m.maxHp ?? 1)),
    p = Math.round(d.tp * (m.maxTp ?? 1)),
    h = l.guild.party.front.includes(i),
    g = Pe[r.raceId];
  return {
    id: i,
    name: r.name,
    side: 'ally',
    row: h ? 'front' : 'back',
    stats: d,
    equip: Xx(r),
    hp: s ? Math.min(s.hp, _) : _,
    maxHp: _,
    tp: s ? Math.min(s.tp, p) : p,
    maxTp: p,
    buffs: [],
    ailments: s ? [...s.ailments] : [],
    states: [],
    passive: m,
    unionGauge: (s == null ? void 0 : s.unionGauge) ?? 0,
    isDown: s ? s.hp <= 0 : !1,
    resist: g == null ? void 0 : g.elementResist,
    ailmentResist: g == null ? void 0 : g.ailmentResist,
    skillLevels: r.learnedSkills,
  };
}
function Kx(l, i, r) {
  const s = Tt[l],
    d = Sx(s, r),
    m = ug(r);
  return {
    id: `enemy_${i}`,
    name: m >= 2 ? `${s.name} Lv${m}` : s.name,
    side: 'enemy',
    row: 'front',
    stats: d,
    equip: {},
    hp: d.hp,
    maxHp: d.hp,
    tp: d.tp,
    maxTp: d.tp,
    buffs: [],
    ailments: [],
    unionGauge: 0,
    isDown: !1,
    enemyId: l,
    resist: s.resist,
    ailmentResist: Td(l),
  };
}
function Sg(l, i, r, s, d) {
  const m = ai[l],
    _ = sg(m.baseStats, Nd(i, m.refDepth)),
    p = d ?? _.hp;
  return {
    id: s,
    name: m.name,
    side: 'ally',
    row: 'front',
    stats: _,
    equip: {},
    hp: p,
    maxHp: _.hp,
    tp: 0,
    maxTp: 0,
    buffs: [],
    ailments: [],
    unionGauge: 0,
    isDown: p <= 0,
    isSummon: !0,
    summonKind: l,
    ownerId: r,
  };
}
function dh(l, i, r = 'none') {
  var h, g;
  const s = ((h = l.diveState) == null ? void 0 : h.depth) ?? 1,
    m = [...l.guild.party.front, ...l.guild.party.back]
      .filter((b) => b !== null)
      .map((b) => Qx(l, b))
      .filter((b) => b !== null),
    _ = i.map((b, k) => Kx(b, k, s)),
    p = (((g = l.diveState) == null ? void 0 : g.persistentSummons) ?? [])
      .map((b, k) => Sg(b.summonKind, s, b.ownerId, `summon_persist_${k}`, b.hp))
      .filter((b) => !b.isDown);
  return {
    turn: 1,
    depth: s,
    allies: m,
    enemies: _,
    summons: p,
    log: [],
    outcome: 'ongoing',
    firstStrike: r,
    drops: [],
    consumedItems: [],
  };
}
const kt = (l, i) => (i === 'ally' ? l.allies : l.enemies).filter((r) => !r.isDown),
  co = (l) => l.summons.filter((i) => !i.isDown);
function Zl(l, i) {
  return (
    l.allies.find((r) => r.id === i) ??
    l.enemies.find((r) => r.id === i) ??
    l.summons.find((r) => r.id === i)
  );
}
const Od = (l) => {
    var i;
    return (
      !!l.isSummon && !!l.summonKind && ((i = ai[l.summonKind]) == null ? void 0 : i.buffImmune)
    );
  },
  Zx = (l, i) => {
    var r;
    return ((r = l.resist) == null ? void 0 : r[i]) ?? 1;
  };
function wg(l, i, r) {
  ((l.hp = Wl(l.hp - i, 0, l.maxHp)),
    i > 0 &&
      l.ailments.some((s) => s.type === 'sleep') &&
      ((l.ailments = l.ailments.filter((s) => s.type !== 'sleep')),
      r.push({ text: `${l.name} は目を覚ました` })),
    l.hp === 0 &&
      !l.isDown &&
      ((l.isDown = !0),
      (l.unionGauge = Math.floor(l.unionGauge / 2)),
      r.push({ text: `${l.name} は倒れた！` })));
}
function nd(l, i) {
  l.isDown || (l.unionGauge = Wl(l.unionGauge + i, 0, 100));
}
function id(l, i) {
  Od(l) ||
    ((l.buffs = l.buffs.filter((r) => !(r.stat === i.stat && r.stackGroup === i.stackGroup))),
    l.buffs.push(i));
}
function Jx(l, i) {
  if (Od(l)) return;
  const r = l.ailments.find((s) => s.type === i.type);
  if (r) {
    r.remainingTurns = Math.max(r.remainingTurns, i.remainingTurns);
    return;
  }
  l.ailments.push(i);
}
function Hr(l, i) {
  Od(l) || (l.states = [...(l.states ?? []).filter((r) => r.kind !== i.kind), i]);
}
function Px(l, i) {
  return i.side === 'ally' ? [...kt(l, 'ally'), ...co(l)] : kt(l, 'enemy');
}
function Fx(l, i, r) {
  const s = (l.states ?? []).find((m) => m.kind === 'barrier' && m.absorb > 0);
  if (!s || s.kind !== 'barrier') return i;
  const d = Math.min(s.absorb, i);
  return (
    (s.absorb -= d),
    d > 0 && r.push({ text: `${l.name} は障壁で ${d} のダメージを防いだ` }),
    s.absorb <= 0 && (l.states = (l.states ?? []).filter((m) => m !== s)),
    i - d
  );
}
function eo(l, i, r, s, d, m = {}) {
  if (r.isDown) return { hit: !1, dealt: 0 };
  const _ = Nx(
    i,
    r,
    {
      statBase: s.statBase,
      power: s.power,
      element: s.element,
      elementMultiplier: Zx(r, s.element),
    },
    d
  );
  if (!_.hit) return (l.log.push({ text: `${i.name} の攻撃は外れた` }), { hit: !1, dealt: 0 });
  const p = Fx(r, _.damage, l.log);
  return (
    wg(r, p, l.log),
    m.actorUnion && nd(i, m.actorUnion),
    nd(r, 5),
    p > 0 &&
      l.log.push({
        text: `${i.name} の攻撃！ ${r.name} に ${p} ダメージ${_.critical ? '（会心）' : ''}`,
      }),
    { hit: !0, dealt: p }
  );
}
function Tg(l, i, r, s, d, m) {
  if (!r.isDown && !i.isDown && r.side !== i.side)
    for (const _ of r.states ?? []) {
      if (_.kind !== 'counter' || m.next() >= _.chance) continue;
      l.log.push({ text: `${r.name} の反撃！` });
      const p = _.statBase === 'str' ? 'bash' : 'almighty';
      if ((eo(l, r, i, { statBase: _.statBase, power: _.power, element: p }, m), i.isDown)) break;
    }
  if (d > 0 && r.side !== i.side) {
    for (const _ of Px(l, i))
      if (!(_.id === i.id || _.isDown || r.isDown))
        for (const p of _.states ?? [])
          p.kind === 'chase' &&
            ((p.element !== s && p.element !== 'almighty' && s !== 'almighty') ||
              (l.log.push({ text: `${_.name} の連携追撃！` }),
              eo(l, _, r, { statBase: p.statBase, power: p.power, element: p.element }, m)));
  }
}
function Wx(l, i, r, s) {
  var _;
  const d = s !== void 0 ? (((_ = r.ailmentResist) == null ? void 0 : _[s]) ?? 1) : 1;
  if (d === 0) return 0;
  const m = l * (1 + (i.stats.luc - r.stats.luc) * Oe.AILMENT_LUC_K);
  return Wl(m * d, 0, Oe.AILMENT_MAX);
}
function Md(l, i, r, s) {
  const d = i.side === 'ally' ? 'enemy' : 'ally';
  switch (r) {
    case 'self':
      return [i];
    case 'allyAll':
      return i.side === 'ally' ? [...kt(l, 'ally'), ...co(l)] : kt(l, 'enemy');
    case 'allyOne': {
      const m = Zl(l, s);
      return m && m.side === i.side ? [m] : [i];
    }
    case 'enemyAll':
      return kt(l, d);
    case 'enemyRow':
    case 'enemyOne':
    default: {
      const m = Zl(l, s);
      return m && m.side === d && !m.isDown ? [m] : kt(l, d).slice(0, 1);
    }
  }
}
function e2(l, i, r, s) {
  return Md(l, i, r.target, s);
}
function sd(l, i, r, s, d, m, _) {
  switch (r.kind) {
    case 'damage': {
      const p = r.hits ?? 1,
        h = r.power(d);
      for (const g of m) {
        if (g.isDown) continue;
        let b = !1,
          k = 0;
        for (let A = 0; A < p && !g.isDown; A++) {
          const C = eo(l, i, g, { statBase: r.statBase, power: h, element: s }, _);
          C.hit && ((b = !0), (k += C.dealt));
        }
        b && Tg(l, i, g, s, k, _);
      }
      break;
    }
    case 'heal': {
      const p = r.amount(d),
        h =
          r.matkCoef === 'one'
            ? Oe.HEAL_MATK_COEF_ONE
            : r.matkCoef === 'minor'
              ? Oe.HEAL_MATK_COEF_MINOR
              : Oe.HEAL_MATK_COEF_ALL,
        g = ld(i.stats, i.equip, i.buffs, i.passive).matk,
        b = Math.round(p + g * h);
      for (const k of m) k.isDown || (k.hp = Wl(k.hp + b, 0, k.maxHp));
      l.log.push({ text: `${i.name} は回復魔法を使った（+${b}）` });
      break;
    }
    case 'buff': {
      for (const p of m)
        id(p, {
          stat: r.stat,
          modifier: r.modifier(d),
          remainingTurns: r.turns,
          stackGroup: r.stackGroup,
        });
      l.log.push({ text: `${i.name} は態勢を整えた` });
      break;
    }
    case 'ailment': {
      for (const p of m) {
        if (p.isDown) continue;
        const h = Wx(r.chance(d), i, p, r.ailment);
        _.next() < h &&
          (Jx(p, { type: r.ailment, remainingTurns: r.turns, magnitude: r.magnitude }),
          l.log.push({ text: `${p.name} は${Vx[r.ailment]}になった` }));
      }
      break;
    }
    case 'summon': {
      if (i.side !== 'ally') break;
      if (co(l).length >= Yx) {
        l.log.push({ text: 'これ以上は召喚できない' });
        break;
      }
      const p = `summon_${l.turn}_${l.summons.length}`,
        h = Sg(r.summonKind, l.depth, i.id, p);
      (l.summons.push(h), l.log.push({ text: `${i.name} は ${h.name} を召喚した！` }));
      break;
    }
    case 'counter': {
      for (const p of m)
        p.isDown ||
          Hr(p, {
            kind: 'counter',
            chance: r.chance(d),
            power: r.power(d),
            statBase: r.statBase,
            remainingTurns: r.turns,
          });
      l.log.push({ text: `${i.name} は反撃の構えを取った` });
      break;
    }
    case 'chase': {
      for (const p of m)
        p.isDown ||
          Hr(p, {
            kind: 'chase',
            element: s,
            power: r.power(d),
            statBase: r.statBase,
            remainingTurns: r.turns,
          });
      l.log.push({ text: `${i.name} は連携の構えを取った` });
      break;
    }
    case 'decoy': {
      for (const p of m)
        p.isDown || Hr(p, { kind: 'decoy', weight: r.weight(d), remainingTurns: r.turns });
      l.log.push({ text: `${i.name} は敵の注意を引きつけた` });
      break;
    }
    case 'barrier': {
      for (const p of m)
        p.isDown || Hr(p, { kind: 'barrier', absorb: r.absorb(d), remainingTurns: r.turns });
      l.log.push({ text: `${i.name} は守りの障壁を張った` });
      break;
    }
    case 'cleanse': {
      for (const p of m)
        p.isDown ||
          p.ailments.length === 0 ||
          ((p.ailments = []), l.log.push({ text: `${p.name} の状態異常が治療された` }));
      break;
    }
  }
}
function zu(l, i, r, s) {
  var _;
  if (r.isDown) return;
  const d = i.enemyId
      ? (Tt[i.enemyId].attackElement ?? 'bash')
      : i.isSummon && i.summonKind
        ? (((_ = ai[i.summonKind]) == null ? void 0 : _.attackElement) ?? 'bash')
        : 'bash',
    m = eo(l, i, r, { statBase: 'str', power: 1, element: d }, s, { actorUnion: 5 });
  m.hit && Tg(l, i, r, d, m.dealt, s);
}
const mh = (l) => (l.length === 0 ? 0 : l.reduce((i, r) => i + r.stats.agi, 0) / l.length);
function t2(l, i) {
  const r = l.map(
      (m) => 1 + (m.states ?? []).reduce((_, p) => _ + (p.kind === 'decoy' ? p.weight : 0), 0)
    ),
    s = r.reduce((m, _) => m + _, 0);
  let d = i.next() * s;
  for (let m = 0; m < l.length; m++) if (((d -= r[m]), d < 0)) return l[m];
  return l[l.length - 1];
}
const l2 = (l) => l.ailments.some((i) => i.type === 'paralysis'),
  a2 = (l) => l.ailments.some((i) => i.type === 'sleep'),
  Rd = (l, i) => l.ailments.some((r) => r.type === i),
  Hu = (l) => Rd(l, 'armBind'),
  _h = (l) => Rd(l, 'headBind'),
  n2 = (l) => Rd(l, 'legBind');
function fh(l) {
  return l.effects.some((i) => i.kind === 'damage' && i.statBase === 'str');
}
function i2(l, i, r) {
  var b;
  const s = Kn[i.unionSkillId];
  if (!s) return;
  const d = Zl(l, i.actorId);
  if (!d || d.isDown || d.side !== 'ally') return;
  if (d.unionGauge < 100) {
    l.log.push({ text: `${d.name} はユニオンゲージが足りない` });
    return;
  }
  const m = new Set(i.participantIds);
  m.add(d.id);
  const _ = [...m].map((k) => Zl(l, k)).filter((k) => !!k && !k.isDown && k.side === 'ally');
  if (_.length < s.requiredParticipants) {
    l.log.push({ text: `${d.name} の${s.name}は参加人数が足りない` });
    return;
  }
  const p = [d, ..._.filter((k) => k.id !== d.id)].slice(0, s.requiredParticipants);
  for (const k of p) k.unionGauge = Wl(k.unionGauge - s.gaugeCostPerParticipant, 0, 100);
  l.log.push({ text: `ユニオン！ ${d.name} の${s.name}！` });
  const h = ((b = d.skillLevels) == null ? void 0 : b[i.unionSkillId]) ?? 1,
    g = Md(l, d, s.target, i.targetId);
  for (const k of s.effects) sd(l, d, k, s.element, h, g, r);
}
function s2(l, i, r) {
  var z, I, M, w, j, V, $, te, K;
  if (l.outcome !== 'ongoing') return l;
  const s = structuredClone({ ...l, log: [] }),
    d = s.log.push.bind(s.log);
  s.log.push = (...S) => {
    const q = d(...S),
      X = {};
    for (const ne of [...s.allies, ...s.enemies, ...s.summons])
      X[ne.id] = { hp: ne.hp, isDown: ne.isDown };
    for (const ne of S) ne.snapshot = X;
    return q;
  };
  const m = new Map(i.filter((S) => S.kind !== 'union').map((S) => [S.actorId, S])),
    _ = s.turn === 1 && s.firstStrike !== 'none',
    p = _ && s.firstStrike === 'preemptive',
    h = _ && s.firstStrike === 'ambush';
  if (
    (p && s.log.push({ text: '先制攻撃！ 味方が先手を取った' }),
    h && s.log.push({ text: '不意打ち！ 敵に先手を取られた' }),
    !h)
  )
    for (const S of i) S.kind === 'union' && i2(s, S, r);
  const g = i.find((S) => S.kind === 'flee');
  if (!h && g && s.outcome === 'ongoing') {
    const S = Zl(s, g.actorId);
    if (S && n2(S)) s.log.push({ text: `${S.name} は脚を封じられて逃げられない` });
    else {
      let q = Wl(0.4 + (mh(kt(s, 'ally')) - mh(kt(s, 'enemy'))) * 0.02, 0.05, 0.9);
      if (
        (s.enemies.some((X) => {
          var ne;
          return X.enemyId && ((ne = Tt[X.enemyId]) == null ? void 0 : ne.kind) === 'boss';
        })
          ? (q = 0)
          : s.enemies.some((X) => {
              var ne;
              return X.enemyId && ((ne = Tt[X.enemyId]) == null ? void 0 : ne.kind) === 'foe';
            }) && (q *= 0.5),
        q > 0 && r.next() < q)
      )
        return (s.log.push({ text: 'うまく逃げ切れた！' }), (s.outcome = 'fled'), s);
      s.log.push({ text: '逃げられなかった！' });
    }
  }
  if (!h)
    for (const S of i) {
      if (S.kind !== 'guard') continue;
      const q = Zl(s, S.actorId);
      !q ||
        q.isDown ||
        (id(q, { stat: 'pdef', modifier: 1.5, remainingTurns: 1, stackGroup: 'guard' }),
        id(q, { stat: 'mdef', modifier: 1.5, remainingTurns: 1, stackGroup: 'guard' }));
    }
  const b = new Map(),
    k = new Map(),
    A = new Set();
  if (!p)
    for (const S of kt(s, 'enemy')) {
      const q = [...co(s), ...kt(s, 'ally')];
      q.length > 0 && b.set(S.id, t2(q, r).id);
      const X = S.enemyId ? Tt[S.enemyId] : void 0,
        ne = (X == null ? void 0 : X.actions) ?? (X != null && X.kit ? (ix[X.kit] ?? []) : []),
        Z = s.turn,
        ie = S,
        ke = (de) => de.effects.some((y) => y.kind === 'damage' && y.statBase === 'str'),
        Se = Hu(S),
        D = _h(S),
        R = [];
      Se || R.push({ action: null, weight: W1 });
      for (const de of ne) {
        const y = de.cond;
        if (y) {
          if (
            (y.hpBelow !== void 0 && ie.hp / ie.maxHp > y.hpBelow) ||
            (y.hpAbove !== void 0 && ie.hp / ie.maxHp < y.hpAbove) ||
            (y.minTurn !== void 0 && Z < y.minTurn) ||
            (y.maxUses !== void 0 &&
              (((I = (z = ie.actionState) == null ? void 0 : z[de.id]) == null ? void 0 : I.uses) ??
                0) >= y.maxUses)
          )
            continue;
          if (y.cooldown !== void 0) {
            const B =
              ((w = (M = ie.actionState) == null ? void 0 : M[de.id]) == null
                ? void 0
                : w.lastUsedTurn) ?? -1 / 0;
            if (Z - B < y.cooldown) continue;
          }
        }
        (Se && ke(de)) || (D && !ke(de)) || R.push({ action: de, weight: de.weight });
      }
      if (R.length === 0) {
        (A.add(S.id), k.set(S.id, null));
        continue;
      }
      const ee = R.reduce((de, y) => de + y.weight, 0);
      let oe = r.next() * ee,
        pe = null;
      for (const de of R)
        if (((oe -= de.weight), oe < 0)) {
          pe = de.action;
          break;
        }
      (pe === void 0 && (pe = null), k.set(S.id, pe));
    }
  const C = [...s.allies, ...s.enemies, ...s.summons]
    .filter((S) => !S.isDown)
    .filter((S) => !(p && S.side === 'enemy') && !(h && S.side === 'ally'))
    .map((S) => ({ c: S, agi: S.stats.agi, tie: r.next() }))
    .sort((S, q) => q.agi - S.agi || q.tie - S.tie)
    .map((S) => S.c);
  for (const S of C)
    if (!S.isDown) {
      if (s.outcome !== 'ongoing') break;
      if (a2(S)) {
        s.log.push({ text: `${S.name} は眠っている` });
        continue;
      }
      if (l2(S) && r.next() < Oe.PARALYSIS_SKIP) {
        s.log.push({ text: `${S.name} は麻痺で動けない` });
        continue;
      }
      if (S.isSummon) {
        const q = S.summonKind ? ai[S.summonKind] : void 0;
        if (q != null && q.actsOnTurn) {
          const X = kt(s, 'enemy');
          X.length > 0 && zu(s, S, r.pick(X), r);
        }
        if (kt(s, 'enemy').length === 0) break;
        continue;
      }
      if (S.side === 'enemy') {
        if (A.has(S.id)) {
          s.log.push({ text: `${S.name} は封じられて動けない` });
          continue;
        }
        const q = k.get(S.id),
          X = b.get(S.id);
        if (q == null) {
          const ne = X ? Zl(s, X) : void 0,
            Z = ne && !ne.isDown ? ne : kt(s, 'ally')[0];
          Z && zu(s, S, Z, r);
        } else {
          const ne = Md(s, S, q.target, X ?? '');
          for (const Z of q.effects) sd(s, S, Z, q.element, 1, ne, r);
          (S.actionState || (S.actionState = {}),
            (S.actionState[q.id] = {
              lastUsedTurn: s.turn,
              uses: (((j = S.actionState[q.id]) == null ? void 0 : j.uses) ?? 0) + 1,
            }),
            s.log.push({ text: `${S.name} の${q.name}！` }));
        }
      } else {
        const q = m.get(S.id);
        if (!q || q.kind === 'guard' || q.kind === 'flee') continue;
        if (q.kind === 'attack') {
          if (Hu(S)) {
            s.log.push({ text: `${S.name} は腕を封じられて攻撃できない` });
            continue;
          }
          const X = Zl(s, q.targetId),
            ne = X && !X.isDown ? X : kt(s, 'enemy')[0];
          ne && zu(s, S, ne, r);
        } else if (q.kind === 'skill') {
          const X = wt[q.skillId];
          if (!X) continue;
          if (fh(X) && Hu(S)) {
            s.log.push({ text: `${S.name} は腕を封じられてスキルを使えない` });
            continue;
          }
          if (!fh(X) && _h(S)) {
            s.log.push({ text: `${S.name} は頭を封じられてスキルを使えない` });
            continue;
          }
          const ne = ((V = S.skillLevels) == null ? void 0 : V[q.skillId]) ?? 1,
            Z = X.tpCost(ne);
          if (S.tp < Z) {
            s.log.push({ text: `${S.name} は TP が足りない` });
            continue;
          }
          ((S.tp -= Z), nd(S, 10));
          const ie = e2(s, S, X, q.targetId);
          for (const ke of X.effects) sd(s, S, ke, X.element, ne, ie, r);
        } else if (q.kind === 'item') {
          const X = at[q.itemId];
          if (!X || !(($ = X.useContext) != null && $.includes('battle'))) continue;
          const ne = Zl(s, q.targetId) ?? S;
          for (const Z of X.effects ?? [])
            Z.kind === 'heal'
              ? (ne.hp = Wl(ne.hp + Z.amount(1), 0, ne.maxHp))
              : Z.kind === 'restoreTp' && (ne.tp = Wl(ne.tp + Z.amount(1), 0, ne.maxTp));
          (s.consumedItems.push(q.itemId), s.log.push({ text: `${S.name} は ${X.name} を使った` }));
        }
      }
      if (kt(s, 'enemy').length === 0 || kt(s, 'ally').length === 0) break;
    }
  for (const S of [...s.allies, ...s.enemies, ...s.summons]) {
    if (S.isDown) continue;
    const q = S.ailments.find((X) => X.type === 'poison');
    if (q) {
      const X = q.magnitude ?? Math.max(1, Math.floor(S.maxHp * Oe.POISON_HP_RATIO));
      (wg(S, X, s.log), s.log.push({ text: `${S.name} は毒で ${X} のダメージ` }));
    }
  }
  for (const S of [...s.allies, ...s.enemies, ...s.summons])
    (!S.isDown &&
      S.maxTp > 0 &&
      (S.tp = Math.min(S.maxTp, S.tp + Math.ceil(S.maxTp * Oe.TP_REGEN_RATIO))),
      (S.buffs = S.buffs
        .map((q) => ({ ...q, remainingTurns: q.remainingTurns - 1 }))
        .filter((q) => q.remainingTurns > 0)),
      (S.ailments = S.ailments
        .map((q) => ({ ...q, remainingTurns: q.remainingTurns - 1 }))
        .filter((q) => q.remainingTurns > 0)),
      S.states &&
        S.states.length > 0 &&
        (S.states = S.states
          .map((q) => ({ ...q, remainingTurns: q.remainingTurns - 1 }))
          .filter((q) => q.remainingTurns > 0)));
  for (const S of s.enemies)
    if (
      !(
        !S.isDown ||
        !S.enemyId ||
        (((te = l.enemies.find((X) => X.id === S.id)) == null ? void 0 : te.isDown) ?? !1)
      )
    )
      for (const X of Tt[S.enemyId].drops ?? [])
        r.next() < X.rate &&
          (s.drops.push({ enemyId: S.enemyId, itemId: X.itemId }),
          s.log.push({
            text: `${S.name} は ${((K = at[X.itemId]) == null ? void 0 : K.name) ?? X.itemId} を落とした`,
          }));
  return (
    (s.summons = s.summons.filter((S) => !S.isDown)),
    (s.turn += 1),
    kt(s, 'enemy').length === 0
      ? (s.outcome = 'win')
      : kt(s, 'ally').length === 0 && (s.outcome = 'lose'),
    s
  );
}
function Dd(l, i) {
  let r = 0,
    s = 0;
  const d = i !== void 0 ? ch(i) : void 0,
    m = ch(l.depth),
    _ = d !== void 0 ? Math.pow(Oe.FARM_EXP_DECAY_PER_BAND, Math.max(0, d - m)) : 1;
  for (const p of l.enemies) {
    if (!p.enemyId) continue;
    const h = Tt[p.enemyId],
      g = Nd(l.depth, h.refDepth);
    ((r += Math.round(h.exp * g * _)), (s += Math.round(h.gold * g * _)));
  }
  return { exp: r, gold: s };
}
function r2(l, i) {
  if (i.outcome !== 'win' || !l.diveState) return [];
  const r = l.towerState.record.deepestReached,
    { exp: s } = Dd(i, r),
    d = new Set(l.diveState.party.map((p) => p.charId)),
    m = d.size > 0 ? Math.floor(s / d.size) : 0,
    _ = [];
  for (const p of l.guild.members) {
    if (!d.has(p.id)) continue;
    const h = Ng(p, m),
      g = {};
    if (h.level > p.level) {
      const b = Fl(p),
        k = Fl(h);
      for (const A of Object.keys(b)) {
        const C = Math.round(k[A] - b[A]);
        C !== 0 && (g[A] = C);
      }
    }
    _.push({
      charId: p.id,
      name: p.name,
      gainedExp: rs(p.level) ? m : 0,
      fromLevel: p.level,
      toLevel: h.level,
      exp: h.exp,
      expToNext: rs(h.level) ? td(h.level) : 0,
      statGains: g,
    });
  }
  return _;
}
function Ng(l, i) {
  let r = l.level,
    s = l.exp + (rs(r) ? i : 0),
    d = l.skillPoints.total;
  for (; rs(r) && s >= td(r); ) ((s -= td(r)), (r += 1), (d += yx(r)));
  return {
    ...l,
    level: r,
    exp: rs(l.level) ? s : l.exp,
    skillPoints: { ...l.skillPoints, total: d },
  };
}
function ph(l, i) {
  if (!l.diveState) return l;
  const r = i.outcome === 'win',
    s = i.outcome === 'win' || i.outcome === 'fled',
    d = new Map(i.allies.map((C) => [C.id, C])),
    m = l.diveState.party.map((C) => {
      const z = d.get(C.charId);
      if (!z) return C;
      let I = z.unionGauge;
      return (
        s && !z.isDown && (I = Wl(I + Oe.UNION_GAIN_ON_WIN, 0, 100)),
        { ...C, hp: z.hp, tp: z.tp, unionGauge: I, ailments: z.ailments }
      );
    });
  let _ = l.guild.members,
    p = l.guild.gold;
  const h = { ...l.bestiary.monsters };
  for (const C of i.enemies) {
    if (!C.enemyId) continue;
    const z = h[C.enemyId] ?? { seen: !1, defeated: !1, dropsFound: [] };
    h[C.enemyId] = { ...z, seen: !0, defeated: z.defeated || C.isDown };
  }
  if (r)
    for (const C of i.drops) {
      const z = h[C.enemyId];
      z &&
        !z.dropsFound.includes(C.itemId) &&
        (h[C.enemyId] = { ...z, dropsFound: [...z.dropsFound, C.itemId] });
    }
  const g = { ...l.bestiary, monsters: h };
  if (r) {
    const C = l.towerState.record.deepestReached,
      { exp: z, gold: I } = Dd(i, C);
    p += I;
    const M = new Set(m.map((j) => j.charId)),
      w = M.size > 0 ? Math.floor(z / M.size) : 0;
    _ = _.map((j) => (M.has(j.id) ? Ng(j, w) : j));
  }
  const b = i.summons
    .filter((C) => {
      var z;
      return (
        !C.isDown &&
        C.summonKind &&
        ((z = ai[C.summonKind]) == null ? void 0 : z.persistsAfterBattle)
      );
    })
    .map((C) => ({ summonKind: C.summonKind, ownerId: C.ownerId ?? '', hp: C.hp }));
  let k = {
    ...l,
    guild: { ...l.guild, members: _, gold: p, bestiary: g },
    bestiary: g,
    diveState: { ...l.diveState, party: m, persistentSummons: b },
  };
  for (const C of i.consumedItems) k = Ad(k, C, 1);
  const A = ug(i.depth);
  if (r) for (const C of i.drops) k = Cd(k, C.itemId, 1, A);
  return k;
}
const o2 = 8,
  rd = 16,
  os = 5;
function zd(l) {
  return l.range(o2, rd);
}
function c2(l, i) {
  const r = l - 1;
  return r <= 0
    ? { stepsUntilEncounter: zd(i), triggered: !0 }
    : { stepsUntilEncounter: r, triggered: !1 };
}
function u2(l) {
  const i = Math.max(0, rd - l),
    r = Math.round((i / rd) * os);
  return Math.min(os, Math.max(0, r));
}
const ul = { N: { dx: 0, dy: -1 }, E: { dx: 1, dy: 0 }, S: { dx: 0, dy: 1 }, W: { dx: -1, dy: 0 } },
  Wn = ['N', 'E', 'S', 'W'];
function jg(l) {
  return Wn[(Wn.indexOf(l) + 1) % 4];
}
function Eg(l) {
  return Wn[(Wn.indexOf(l) + 3) % 4];
}
function d2(l) {
  return Wn[(Wn.indexOf(l) + 2) % 4];
}
const Cg = (l, i, r) => l >= 0 && i >= 0 && l < r.width && i < r.height;
function Pa(l, i, r, s) {
  if (l.cells[r][i].walls[s]) return !1;
  const d = i + ul[s].dx,
    m = r + ul[s].dy;
  return Cg(d, m, l) ? l.cells[m][d].passable : !1;
}
function m2(l, i, r) {
  return Pa(l, i.x, i.y, r) ? { x: i.x + ul[r].dx, y: i.y + ul[r].dy } : null;
}
function Hd(l, i, r) {
  return ['N', 'E', 'S', 'W'].filter((s) => !l.cells[r][i].walls[s]);
}
function _2(l, i, r) {
  if (i.x === r.x && i.y === r.y) return [];
  if (!Cg(r.x, r.y, l) || !l.cells[r.y][r.x].passable) return null;
  const s = (_, p) => `${_},${p}`,
    d = new Map();
  d.set(s(i.x, i.y), null);
  const m = [{ ...i }];
  for (; m.length > 0; ) {
    const _ = m.shift();
    for (const p of ['N', 'E', 'S', 'W']) {
      if (!Pa(l, _.x, _.y, p)) continue;
      const h = _.x + ul[p].dx,
        g = _.y + ul[p].dy,
        b = s(h, g);
      if (!d.has(b)) {
        if ((d.set(b, { x: _.x, y: _.y, dir: p }), h === r.x && g === r.y)) {
          const k = [];
          let A = b;
          for (;;) {
            const C = d.get(A);
            if (!C) break;
            (k.unshift(C.dir), (A = s(C.x, C.y)));
          }
          return k;
        }
        m.push({ x: h, y: g });
      }
    }
  }
  return null;
}
const hh = ['N', 'E', 'S', 'W'],
  Uu = (l, i) => Math.abs(l.x - i.x) + Math.abs(l.y - i.y);
function f2(l, i, r, s, d) {
  const m = i.map((b) => ({ ...b, cell: { ...b.cell } })),
    _ = new Map(l.foeSpawns.map((b) => [b.id, b])),
    p = new Set(m.filter((b) => !b.defeated).map((b) => `${b.cell.x},${b.cell.y}`));
  let h = null;
  const g = [...m].sort((b, k) => b.spawnId.localeCompare(k.spawnId, void 0, { numeric: !0 }));
  for (const b of g) {
    if (h) break;
    if (b.defeated) continue;
    const k = _.get(b.spawnId);
    if (!k) continue;
    !b.alerted && Uu(b.cell, r) <= k.sightRange && (b.alerted = !0);
    const A = (C) => {
      if (!Pa(l, b.cell.x, b.cell.y, C)) return 'blocked';
      const z = b.cell.x + ul[C].dx,
        I = b.cell.y + ul[C].dy;
      if (z === r.x && I === r.y) {
        const M = C === s;
        return (
          (h = { spawnId: b.spawnId, enemyId: k.enemyId, firstStrike: M ? 'ambush' : 'none' }),
          'contact'
        );
      }
      return p.has(`${z},${I}`)
        ? 'blocked'
        : (p.delete(`${b.cell.x},${b.cell.y}`),
          (b.cell = { x: z, y: I }),
          p.add(`${z},${I}`),
          'moved');
    };
    if (b.alerted)
      for (let C = 0; C < k.moveSpeed; C++) {
        let z = null,
          I = Uu(b.cell, r),
          M = !1;
        for (const j of hh) {
          const V = b.cell.x + ul[j].dx,
            $ = b.cell.y + ul[j].dy;
          if (V === r.x && $ === r.y && Pa(l, b.cell.x, b.cell.y, j)) {
            ((z = j), (M = !0));
            break;
          }
          if (!Pa(l, b.cell.x, b.cell.y, j) || p.has(`${V},${$}`)) continue;
          const te = Uu({ x: V, y: $ }, r);
          te < I && ((I = te), (z = j));
        }
        if (!z) break;
        const w = A(z);
        if (w === 'contact' || w === 'blocked' || M) break;
      }
    else {
      const C = k.patrol;
      if (C.kind === 'wander') {
        const z = hh.filter(
          (I) =>
            Pa(l, b.cell.x, b.cell.y, I) && !p.has(`${b.cell.x + ul[I].dx},${b.cell.y + ul[I].dy}`)
        );
        z.length > 0 && A(d.pick(z));
      } else C.kind === 'charge' && A(C.dir);
    }
  }
  return { foes: m, contact: h };
}
const Fa = {
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
  p2 = Object.keys(Fa);
function h2(l) {
  const i = Object.values(Tt)
    .filter((r) => r.tierBand === l && r.kind === 'foe')
    .map((r) => r.id);
  return i.length > 0
    ? i
    : Object.values(Tt)
        .filter((r) => r.tierBand === l && !r.isBoss && r.kind !== 'foe')
        .map((r) => r.id);
}
function g2(l) {
  const i = Object.values(Tt).filter((s) => s.isBoss);
  if (i.length === 0) return null;
  const r = i.filter((s) => s.tierBand === l);
  return r.length > 0 ? r[0].id : i.sort((s, d) => d.tierBand - s.tierBand)[0].id;
}
function k2(l, i, r, s, d) {
  for (const m of ['N', 'E', 'S', 'W']) {
    if (l[r][i].walls[m]) continue;
    const _ = i + gl[m].dx,
      p = r + gl[m].dy;
    if (to(_, p, s, d) && !l[p][_].event) return { x: _, y: p };
  }
  return null;
}
const gl = { N: { dx: 0, dy: -1 }, E: { dx: 1, dy: 0 }, S: { dx: 0, dy: 1 }, W: { dx: -1, dy: 0 } },
  v2 = { N: 'S', E: 'W', S: 'N', W: 'E' };
function y2(l) {
  return Math.min(25, 15 + Math.floor(l / 5));
}
function b2() {
  return { walls: { N: !0, E: !0, S: !0, W: !0 }, floorType: 'normal', passable: !0 };
}
const to = (l, i, r, s) => l >= 0 && i >= 0 && l < r && i < s;
function gh(l, i, r, s) {
  const { dx: d, dy: m } = gl[s];
  ((l[r][i].walls[s] = !1), (l[r + m][i + d].walls[v2[s]] = !1));
}
function x2(l, i, r) {
  const s = l.length,
    d = l[0].length,
    m = Array.from({ length: s }, () => Array(d).fill(-1)),
    _ = [{ x: i, y: r }];
  m[r][i] = 0;
  for (let p = 0; p < _.length; p++) {
    const { x: h, y: g } = _[p];
    for (const b of ['N', 'E', 'S', 'W']) {
      if (l[g][h].walls[b]) continue;
      const k = h + gl[b].dx,
        A = g + gl[b].dy;
      !to(k, A, d, s) || m[A][k] !== -1 || ((m[A][k] = m[g][h] + 1), _.push({ x: k, y: A }));
    }
  }
  return m;
}
function S2(l, i) {
  const r = y2(l),
    s = r,
    d = r,
    m = Array.from({ length: d }, () => Array.from({ length: s }, () => b2())),
    _ = Array.from({ length: d }, () => Array(s).fill(!1)),
    p = i.int(s),
    h = i.int(d),
    g = [{ x: p, y: h }];
  for (_[h][p] = !0; g.length > 0; ) {
    const K = g[g.length - 1],
      S = [];
    for (const Z of ['N', 'E', 'S', 'W']) {
      const ie = K.x + gl[Z].dx,
        ke = K.y + gl[Z].dy;
      to(ie, ke, s, d) && !_[ke][ie] && S.push(Z);
    }
    if (S.length === 0) {
      g.pop();
      continue;
    }
    const q = i.pick(S);
    gh(m, K.x, K.y, q);
    const X = K.x + gl[q].dx,
      ne = K.y + gl[q].dy;
    ((_[ne][X] = !0), g.push({ x: X, y: ne }));
  }
  const b = Math.floor((s * d) / 25);
  for (let K = 0; K < b; K++) {
    const S = i.int(s),
      q = i.int(d),
      X = i.pick(['N', 'E', 'S', 'W']),
      ne = S + gl[X].dx,
      Z = q + gl[X].dy;
    to(ne, Z, s, d) && m[q][S].walls[X] && gh(m, S, q, X);
  }
  const k = i.int(s),
    A = i.int(d),
    C = x2(m, k, A);
  let z = k,
    I = A,
    M = -1;
  for (let K = 0; K < d; K++)
    for (let S = 0; S < s; S++) C[K][S] > M && ((M = C[K][S]), (z = S), (I = K));
  ((m[A][k].event = { kind: 'stairsDown' }), (m[I][z].event = { kind: 'stairsUp' }));
  const w = cg(l),
    j = [];
  if (ss(l)) {
    const K = g2(w);
    if (K) {
      const S = k2(m, z, I, s, d) ?? { x: z, y: I };
      j.push({
        id: 'boss',
        enemyId: K,
        startCell: S,
        patrol: { kind: 'static' },
        moveSpeed: 0,
        sightRange: 0,
        respawn: !1,
        isBoss: !0,
      });
    }
  } else {
    const K = h2(w),
      S = 1 + Math.floor(l / 8);
    for (let q = 0; q < S && K.length > 0; q++) {
      let X = i.int(s),
        ne = i.int(d);
      for (let Z = 0; Z < 20; Z++) {
        ((X = i.int(s)), (ne = i.int(d)));
        const ie = m[ne][X].event,
          ke = Math.abs(X - k) + Math.abs(ne - A) >= 3;
        if (!ie && ke) break;
      }
      j.push({
        id: `foe_${q}`,
        enemyId: i.pick(K),
        startCell: { x: X, y: ne },
        patrol: { kind: 'wander' },
        moveSpeed: 1,
        sightRange: 3,
        respawn: !1,
      });
    }
  }
  const V = [],
    $ = () => {
      for (let K = 0; K < 25; K++) {
        const S = i.int(s),
          q = i.int(d),
          X = Math.abs(S - k) + Math.abs(q - A) >= 2;
        if (!m[q][S].event && X) return { x: S, y: q };
      }
      return null;
    },
    te = 2 + Math.floor(l / 10);
  for (let K = 0; K < te; K++) {
    const S = $();
    if (!S) break;
    const q = i.pick(p2),
      X = `gather_${K}`;
    ((m[S.y][S.x].event = { kind: 'gather', gatherId: X }), V.push({ id: X, cell: S, type: q }));
  }
  if (!ss(l)) {
    const K = $();
    K && (m[K.y][K.x].event = { kind: 'cookingSpot', spotId: 'cook_0' });
  }
  return {
    depth: l,
    width: s,
    height: d,
    cells: m,
    encounterTable: `band_${w}`,
    foeSpawns: j,
    gatheringPoints: V,
    bgmId: ss(l) ? 'bgm_boss' : 'bgm_dungeon',
  };
}
function Ag(l, i) {
  var r;
  for (let s = 0; s < l.height; s++)
    for (let d = 0; d < l.width; d++)
      if (((r = l.cells[s][d].event) == null ? void 0 : r.kind) === i) return { x: d, y: s };
  return null;
}
const w2 = 4294967296;
function T2(l, i) {
  let r = 3735928559 ^ l,
    s = 1103547991 ^ l;
  for (let d = 0; d < i.length; d++) {
    const m = i.charCodeAt(d);
    ((r = Math.imul(r ^ m, 2654435761)), (s = Math.imul(s ^ m, 1597334677)));
  }
  return (
    (r = Math.imul(r ^ (r >>> 16), 2246822507) ^ Math.imul(s ^ (s >>> 13), 3266489909)),
    (s = Math.imul(s ^ (s >>> 16), 2246822507) ^ Math.imul(r ^ (r >>> 13), 3266489909)),
    (s >>> 0) ^ (r >>> 0)
  );
}
class Ud {
  constructor(i, r) {
    Cu(this, 'baseSeed');
    Cu(this, '_state');
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
      ((i ^ (i >>> 14)) >>> 0) / w2
    );
  }
  int(i) {
    return i <= 0 ? 0 : Math.floor(this.next() * i);
  }
  range(i, r) {
    r < i && ([i, r] = [r, i]);
    const s = r - i + 1;
    return i + this.int(s);
  }
  pick(i) {
    if (i.length === 0) throw new Error('Rng.pick: 空配列は選択できません');
    return i[this.int(i.length)];
  }
  fork(i) {
    const r = T2(this.baseSeed, i);
    return new Ud(r, r);
  }
}
function Aa(l) {
  return new Ud(l, l);
}
function N2() {
  return Math.floor(Math.random() * 4294967296) >>> 0;
}
const lo = (l, i) => `${l},${i}`;
function j2(l, i) {
  return Aa(l).fork(`floor:${i}`);
}
function Lg(l, i) {
  const r = l.towerState.floors[i];
  if (r) return { save: l, floor: r };
  const s = S2(i, j2(l.masterSeed, i)),
    d = s.foeSpawns.map((p) => ({
      spawnId: p.id,
      cell: { ...p.startCell },
      defeated: !1,
      alerted: !1,
    })),
    m = {
      depth: i,
      seed: l.masterSeed,
      generated: s,
      isBossFloor: ss(i),
      encounterTier: Math.floor((i - 1) / 10),
      foeRuntime: d,
      openedChests: [],
      depletedGathers: [],
      consumedEvents: [],
    };
  return {
    save: { ...l, towerState: { ...l.towerState, floors: { ...l.towerState.floors, [i]: m } } },
    floor: m,
  };
}
function E2(l) {
  const i = [...l.guild.party.front, ...l.guild.party.back].filter((s) => s !== null),
    r = [];
  for (const s of i) {
    const d = l.guild.members.find((_) => _.id === s);
    if (!d) continue;
    const m = Fl(d);
    r.push({ charId: s, hp: m.hp, tp: m.tp, unionGauge: 0, ailments: [] });
  }
  return r;
}
function ao(l, i, r, s) {
  const d = l.towerState.floors[i].generated,
    m = new Set(l.exploredCells[i] ?? []);
  m.add(lo(r, s));
  for (const _ of Hd(d, r, s)) {
    const p = r + (_ === 'E' ? 1 : _ === 'W' ? -1 : 0),
      h = s + (_ === 'S' ? 1 : _ === 'N' ? -1 : 0);
    m.add(lo(p, h));
  }
  return { ...l, exploredCells: { ...l.exploredCells, [i]: [...m] } };
}
function Bg(l, i, r) {
  var h, g;
  const s = Lg(l, i);
  let d = s.save;
  const m = s.floor.generated,
    _ = Ag(m, 'stairsDown') ?? { x: 0, y: 0 },
    p = Hd(m, _.x, _.y)[0] ?? 'N';
  return (
    i > d.towerState.record.deepestReached &&
      (d = {
        ...d,
        towerState: { ...d.towerState, record: { ...d.towerState.record, deepestReached: i } },
      }),
    (d = {
      ...d,
      diveState: {
        depth: i,
        pos: { x: _.x, y: _.y },
        dir: p,
        party: ((h = d.diveState) == null ? void 0 : h.party) ?? E2(d),
        persistentSummons: ((g = d.diveState) == null ? void 0 : g.persistentSummons) ?? [],
        encounter: { stepsUntilEncounter: zd(r) },
        pendingFoeBattle: null,
      },
    }),
    ao(d, i, _.x, _.y)
  );
}
function kh(l, i = 1) {
  const r = Aa(l.masterSeed).fork(`dive:${l.towerState.record.totalDives}`),
    s = {
      ...l,
      diveState: null,
      towerState: {
        ...l.towerState,
        record: { ...l.towerState.record, totalDives: l.towerState.record.totalDives + 1 },
      },
    };
  return Bg(s, i, r);
}
function qg(l, i) {
  return l.diveState ? { ...l, diveState: { ...l.diveState, dir: i } } : l;
}
function Ig(l, i, r) {
  const s = l.towerState.floors[i];
  return {
    ...l,
    towerState: {
      ...l.towerState,
      floors: { ...l.towerState.floors, [i]: { ...s, foeRuntime: r } },
    },
  };
}
function vh(l, i, r) {
  const s = l.diveState;
  if (!s) return { save: l, moved: !1, triggered: !1 };
  const d = l.towerState.floors[s.depth],
    m = d.generated,
    _ = m2(m, s.pos, i);
  if (!_) return { save: qg(l, i), moved: !1, triggered: !1 };
  const p = d.foeRuntime.find((k) => !k.defeated && k.cell.x === _.x && k.cell.y === _.y);
  if (p) {
    const k = m.foeSpawns.find((z) => z.id === p.spawnId),
      A = k
        ? {
            spawnId: p.spawnId,
            enemyId: k.enemyId,
            firstStrike: k.isBoss ? 'none' : 'preemptive',
            isBoss: k.isBoss,
          }
        : null;
    let C = { ...l, diveState: { ...s, pos: _, dir: i, pendingFoeBattle: A } };
    return ((C = ao(C, s.depth, _.x, _.y)), { save: C, moved: !0, triggered: A !== null });
  }
  const h = c2(s.encounter.stepsUntilEncounter, r);
  let g = {
    ...l,
    diveState: {
      ...s,
      pos: _,
      dir: i,
      encounter: { stepsUntilEncounter: h.stepsUntilEncounter },
      pendingFoeBattle: null,
    },
  };
  g = ao(g, s.depth, _.x, _.y);
  const b = f2(m, d.foeRuntime, _, i, r);
  return (
    (g = Ig(g, s.depth, b.foes)),
    b.contact
      ? ((g = {
          ...g,
          diveState: {
            ...g.diveState,
            pendingFoeBattle: {
              spawnId: b.contact.spawnId,
              enemyId: b.contact.enemyId,
              firstStrike: b.contact.firstStrike,
            },
          },
        }),
        { save: g, moved: !0, triggered: !0 })
      : { save: g, moved: !0, triggered: h.triggered }
  );
}
function C2(l, i) {
  const r = l.diveState;
  if (!r) return l;
  const s = r.pendingFoeBattle;
  let d = { ...l, diveState: { ...r, pendingFoeBattle: null } };
  if (s && i) {
    const _ = d.towerState.floors[r.depth].foeRuntime.map((p) =>
      p.spawnId === s.spawnId ? { ...p, defeated: !0 } : p
    );
    ((d = Ig(d, r.depth, _)), s.isBoss && (d = A2(d, r.depth)));
  }
  return d;
}
function A2(l, i, r = Date.now()) {
  const s = l.towerState,
    d = { ...s.bossGates, [i]: { depth: i, defeated: !0 } },
    m = s.warp.unlockedCheckpoints.includes(i)
      ? s.warp.unlockedCheckpoints
      : [...s.warp.unlockedCheckpoints, i].sort((h, g) => h - g),
    _ = s.record.bossDefeatLog.some((h) => h.depth === i),
    p = {
      ...s.record,
      highestBossDefeated: Math.max(s.record.highestBossDefeated, i),
      bossDefeatLog: _ ? s.record.bossDefeatLog : [...s.record.bossDefeatLog, { depth: i, at: r }],
    };
  return {
    ...l,
    towerState: { ...s, bossGates: d, warp: { ...s.warp, unlockedCheckpoints: m }, record: p },
  };
}
function Og(l, i) {
  var r;
  return ss(i) ? ((r = l.towerState.bossGates[i]) == null ? void 0 : r.defeated) === !0 : !0;
}
function yh(l) {
  const i = l.diveState;
  if (!i) return null;
  const r = l.towerState.floors[i.depth].generated.cells[i.pos.y][i.pos.x].event;
  return (r == null ? void 0 : r.kind) === 'stairsUp' ||
    (r == null ? void 0 : r.kind) === 'stairsDown'
    ? r.kind
    : null;
}
function L2(l) {
  if (!l.diveState || !Og(l, l.diveState.depth)) return l;
  const i = l.diveState.depth + 1,
    r = Aa(l.masterSeed).fork(`enc:${i}:${l.towerState.record.totalDives}`);
  return Bg(l, i, r);
}
function B2(l) {
  if (!l.diveState) return l;
  const i = l.diveState.depth;
  if (i <= 1) return ds(l);
  const r = i - 1,
    s = Lg(l, r),
    d = Ag(s.floor.generated, 'stairsUp') ?? { x: 0, y: 0 },
    m = Aa(l.masterSeed).fork(`enc:${r}:${l.towerState.record.totalDives}`);
  let _ = s.save;
  const p = s.floor.generated,
    h = Hd(p, d.x, d.y)[0] ?? 'N';
  return (
    (_ = {
      ..._,
      diveState: {
        ..._.diveState,
        depth: r,
        pos: { x: d.x, y: d.y },
        dir: h,
        encounter: { stepsUntilEncounter: zd(m) },
        pendingFoeBattle: null,
      },
    }),
    ao(_, r, d.x, d.y)
  );
}
function ds(l) {
  return { ...l, diveState: null };
}
const ii = {
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
function q2() {
  return Object.values(ii)
    .filter((l) => l.unlockedByDefault)
    .map((l) => l.id);
}
const Zr = 2,
  I2 = { autoMap: 'on', bgmVolume: 0.6, seVolume: 0.6 };
function bh() {
  return { monsters: {}, items: {} };
}
function O2() {
  return { deepestReached: 0, highestBossDefeated: 0, totalDives: 0, bossDefeatLog: [] };
}
const M2 = () => ({ weapon: null, armor: null, accessory: null });
function R2() {
  return `char_${Date.now().toString(36)}_${Math.floor(Math.random() * 16777215).toString(36)}`;
}
function Mg(l) {
  var p;
  const { raceId: i, classId: r, name: s, id: d } = l;
  if (!Pe[i]) throw new Error(`createCharacter: 未定義の種族 "${i}"`);
  if (!ze[r]) throw new Error(`createCharacter: 未定義の職業 "${r}"`);
  const m = (p = ze[r].skillTree.skills[0]) == null ? void 0 : p.skillId,
    _ = m ? { [m]: 1 } : {};
  return {
    id: d ?? R2(),
    name: s,
    raceId: i,
    classId: r,
    titleId: null,
    level: 1,
    exp: 0,
    skillPoints: { total: 0, spent: 0 },
    learnedSkills: _,
    equipment: M2(),
  };
}
function D2() {
  return { front: Array(bs).fill(null), back: Array(xs).fill(null) };
}
function z2(l, i) {
  const r = l.front.indexOf(null);
  if (r !== -1) {
    const d = [...l.front];
    return ((d[r] = i), { ...l, front: d });
  }
  const s = l.back.indexOf(null);
  if (s !== -1) {
    const d = [...l.back];
    return ((d[s] = i), { ...l, back: d });
  }
  return l;
}
function H2(l, i) {
  return l.guild.members.length >= ed
    ? l
    : {
        ...l,
        guild: { ...l.guild, members: [...l.guild.members, i], party: z2(l.guild.party, i.id) },
      };
}
function U2(l, i) {
  if (!l.guild.members.some((m) => m.id === i)) return l;
  const r = l.guild.party.front.map((m) => (m === i ? null : m)),
    s = l.guild.party.back.map((m) => (m === i ? null : m)),
    d = l.diveState
      ? { ...l.diveState, party: l.diveState.party.filter((m) => m.charId !== i) }
      : l.diveState;
  return {
    ...l,
    guild: {
      ...l.guild,
      members: l.guild.members.filter((m) => m.id !== i),
      party: { front: r, back: s },
    },
    diveState: d,
  };
}
function $2(l) {
  return {
    schemaVersion: Zr,
    savedAt: 0,
    masterSeed: N2(),
    settings: { ...I2 },
    guild: {
      name: l,
      gold: kx,
      members: [],
      party: D2(),
      storage: [],
      equipment: [],
      foodStorage: [],
      bestiary: bh(),
    },
    towerState: { floors: {}, bossGates: {}, warp: { unlockedCheckpoints: [] }, record: O2() },
    diveState: null,
    bestiary: bh(),
    playerMaps: {},
    exploredCells: {},
    forgeInventory: { fragments: {}, ingots: { copper: 0, silver: 0, gold: 0 } },
    shopStock: { unlockedTier: 0, unlockedItemIds: [] },
    unlockedRecipeIds: q2(),
    flags: {},
  };
}
const od = (l, i) => i.some((r) => l instanceof r);
let xh, Sh;
function G2() {
  return xh || (xh = [IDBDatabase, IDBObjectStore, IDBIndex, IDBCursor, IDBTransaction]);
}
function Y2() {
  return (
    Sh ||
    (Sh = [
      IDBCursor.prototype.advance,
      IDBCursor.prototype.continue,
      IDBCursor.prototype.continuePrimaryKey,
    ])
  );
}
const cd = new WeakMap(),
  $u = new WeakMap(),
  uo = new WeakMap();
function V2(l) {
  const i = new Promise((r, s) => {
    const d = () => {
        (l.removeEventListener('success', m), l.removeEventListener('error', _));
      },
      m = () => {
        (r(Wa(l.result)), d());
      },
      _ = () => {
        (s(l.error), d());
      };
    (l.addEventListener('success', m), l.addEventListener('error', _));
  });
  return (uo.set(i, l), i);
}
function X2(l) {
  if (cd.has(l)) return;
  const i = new Promise((r, s) => {
    const d = () => {
        (l.removeEventListener('complete', m),
          l.removeEventListener('error', _),
          l.removeEventListener('abort', _));
      },
      m = () => {
        (r(), d());
      },
      _ = () => {
        (s(l.error || new DOMException('AbortError', 'AbortError')), d());
      };
    (l.addEventListener('complete', m),
      l.addEventListener('error', _),
      l.addEventListener('abort', _));
  });
  cd.set(l, i);
}
let ud = {
  get(l, i, r) {
    if (l instanceof IDBTransaction) {
      if (i === 'done') return cd.get(l);
      if (i === 'store')
        return r.objectStoreNames[1] ? void 0 : r.objectStore(r.objectStoreNames[0]);
    }
    return Wa(l[i]);
  },
  set(l, i, r) {
    return ((l[i] = r), !0);
  },
  has(l, i) {
    return l instanceof IDBTransaction && (i === 'done' || i === 'store') ? !0 : i in l;
  },
};
function Rg(l) {
  ud = l(ud);
}
function Q2(l) {
  return Y2().includes(l)
    ? function (...i) {
        return (l.apply(dd(this), i), Wa(this.request));
      }
    : function (...i) {
        return Wa(l.apply(dd(this), i));
      };
}
function K2(l) {
  return typeof l == 'function'
    ? Q2(l)
    : (l instanceof IDBTransaction && X2(l), od(l, G2()) ? new Proxy(l, ud) : l);
}
function Wa(l) {
  if (l instanceof IDBRequest) return V2(l);
  if ($u.has(l)) return $u.get(l);
  const i = K2(l);
  return (i !== l && ($u.set(l, i), uo.set(i, l)), i);
}
const dd = (l) => uo.get(l);
function Z2(l, i, { blocked: r, upgrade: s, blocking: d, terminated: m } = {}) {
  const _ = indexedDB.open(l, i),
    p = Wa(_);
  return (
    s &&
      _.addEventListener('upgradeneeded', (h) => {
        s(Wa(_.result), h.oldVersion, h.newVersion, Wa(_.transaction), h);
      }),
    r && _.addEventListener('blocked', (h) => r(h.oldVersion, h.newVersion, h)),
    p
      .then((h) => {
        (m && h.addEventListener('close', () => m()),
          d && h.addEventListener('versionchange', (g) => d(g.oldVersion, g.newVersion, g)));
      })
      .catch(() => {}),
    p
  );
}
const J2 = ['get', 'getKey', 'getAll', 'getAllKeys', 'count'],
  P2 = ['put', 'add', 'delete', 'clear'],
  Gu = new Map();
function wh(l, i) {
  if (!(l instanceof IDBDatabase && !(i in l) && typeof i == 'string')) return;
  if (Gu.get(i)) return Gu.get(i);
  const r = i.replace(/FromIndex$/, ''),
    s = i !== r,
    d = P2.includes(r);
  if (!(r in (s ? IDBIndex : IDBObjectStore).prototype) || !(d || J2.includes(r))) return;
  const m = async function (_, ...p) {
    const h = this.transaction(_, d ? 'readwrite' : 'readonly');
    let g = h.store;
    return (s && (g = g.index(p.shift())), (await Promise.all([g[r](...p), d && h.done]))[0]);
  };
  return (Gu.set(i, m), m);
}
Rg((l) => ({
  ...l,
  get: (i, r, s) => wh(i, r) || l.get(i, r, s),
  has: (i, r) => !!wh(i, r) || l.has(i, r),
}));
const F2 = ['continue', 'continuePrimaryKey', 'advance'],
  Th = {},
  md = new WeakMap(),
  Dg = new WeakMap(),
  W2 = {
    get(l, i) {
      if (!F2.includes(i)) return l[i];
      let r = Th[i];
      return (
        r ||
          (r = Th[i] =
            function (...s) {
              md.set(this, Dg.get(this)[i](...s));
            }),
        r
      );
    },
  };
async function* e3(...l) {
  let i = this;
  if ((i instanceof IDBCursor || (i = await i.openCursor(...l)), !i)) return;
  i = i;
  const r = new Proxy(i, W2);
  for (Dg.set(r, i), uo.set(r, dd(i)); i; )
    (yield r, (i = await (md.get(r) || i.continue())), md.delete(r));
}
function Nh(l, i) {
  return (
    (i === Symbol.asyncIterator && od(l, [IDBIndex, IDBObjectStore, IDBCursor])) ||
    (i === 'iterate' && od(l, [IDBIndex, IDBObjectStore]))
  );
}
Rg((l) => ({
  ...l,
  get(i, r, s) {
    return Nh(i, r) ? e3 : l.get(i, r, s);
  },
  has(i, r) {
    return Nh(i, r) || l.has(i, r);
  },
}));
const t3 = { 1: (l) => l3(l) },
  Yu = (l) => typeof l == 'object' && l !== null && !Array.isArray(l);
function l3(l) {
  const i = { ...l, schemaVersion: 2 };
  let r = 0;
  const s = (m) => ({ id: `eq_mig_${Date.now().toString(36)}_${r++}`, masterId: m, forgeLevel: 0 }),
    d = Yu(i.guild) ? { ...i.guild } : {};
  return (
    Array.isArray(d.equipment) || (d.equipment = []),
    Array.isArray(d.foodStorage) || (d.foodStorage = []),
    Array.isArray(d.members) &&
      (d.members = d.members.map((m) => {
        if (!Yu(m)) return m;
        const _ = Yu(m.equipment) ? { ...m.equipment } : {};
        for (const p of ['weapon', 'armor', 'accessory']) {
          const h = _[p];
          _[p] = typeof h == 'string' ? s(h) : (h ?? null);
        }
        return { ...m, equipment: _ };
      })),
    (i.guild = d),
    Array.isArray(i.unlockedRecipeIds) || (i.unlockedRecipeIds = []),
    i
  );
}
function a3(l) {
  return structuredClone(l);
}
function Qn(l) {
  return typeof l == 'object' && l !== null && !Array.isArray(l);
}
function n3(l) {
  if (
    !Qn(l) ||
    typeof l.schemaVersion != 'number' ||
    typeof l.masterSeed != 'number' ||
    !Qn(l.guild)
  )
    return !1;
  const i = l.guild;
  return !(
    typeof i.name != 'string' ||
    !Array.isArray(i.members) ||
    !Array.isArray(i.equipment) ||
    !Qn(l.forgeInventory) ||
    !Qn(l.towerState) ||
    !Qn(l.towerState.record) ||
    typeof l.towerState.record.deepestReached != 'number'
  );
}
function zg(l) {
  if (!Qn(l) || typeof l.schemaVersion != 'number')
    return { ok: !1, reason: 'セーブデータの構造が不正です' };
  let i = l.schemaVersion;
  if (i > Zr) return { ok: !1, reason: `未知のバージョン (${i} > ${Zr}) のセーブデータです` };
  let r = { ...l };
  for (; i < Zr; ) {
    const s = t3[i];
    if (!s) return { ok: !1, reason: `バージョン ${i} の migration が未定義です` };
    ((r = s(r)), (i = typeof r.schemaVersion == 'number' ? r.schemaVersion : i + 1));
  }
  return n3(r)
    ? { ok: !0, data: r }
    : { ok: !1, reason: 'migration 後のデータが SaveData の形をしていません' };
}
function i3(l) {
  return {
    guildName: l.guild.name,
    deepestReached: l.towerState.record.deepestReached,
    memberCount: l.guild.members.length,
    savedAt: l.savedAt,
  };
}
function jh() {
  return {
    guildName: '(破損データ)',
    deepestReached: 0,
    memberCount: 0,
    savedAt: 0,
    corrupted: !0,
  };
}
const s3 = 'sekaiju-like-game',
  r3 = 1,
  ms = 'saves',
  $d = 'main';
let Vu = null;
function Gd() {
  return (
    Vu ||
      (Vu = Z2(s3, r3, {
        upgrade(l) {
          l.objectStoreNames.contains(ms) || l.createObjectStore(ms);
        },
      })),
    Vu
  );
}
async function Xu(l) {
  const i = { ...l, savedAt: Date.now() };
  return (await (await Gd()).put(ms, a3(i), $d), i);
}
async function o3() {
  const i = await (await Gd()).get(ms, $d);
  return i === void 0 ? { ok: !1, reason: 'empty' } : zg(i);
}
async function c3() {
  const i = await (await Gd()).get(ms, $d);
  if (i === void 0) return null;
  const r = zg(i);
  if (!r.ok) return jh();
  try {
    return i3(r.data);
  } catch {
    return jh();
  }
}
const Hg = { save: null, saving: !1 };
function u3(l, i) {
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
      return { ...Hg };
  }
}
const Ug = x.createContext(null);
function d3(l) {
  const i = x.useRef(l);
  return ((i.current = l), i);
}
function m3({ children: l }) {
  const [i, r] = x.useReducer(u3, Hg),
    s = d3(i),
    d = x.useCallback(async (k) => {
      const A = $2(k),
        C = await Xu(A);
      r({ type: 'load', save: C });
    }, []),
    m = x.useCallback(async () => {
      const k = await o3();
      return k.ok ? (r({ type: 'load', save: k.data }), { ok: !0 }) : { ok: !1, reason: k.reason };
    }, []),
    _ = x.useCallback((k) => {
      r({ type: 'updateSave', updater: k });
    }, []),
    p = x.useCallback(
      async (k) => {
        const A = s.current.save;
        if (!A) return;
        const C = k(A);
        (r({ type: 'setSave', save: C }), r({ type: 'saving', saving: !0 }));
        try {
          const z = await Xu(C);
          r({ type: 'setSave', save: z });
        } finally {
          r({ type: 'saving', saving: !1 });
        }
      },
      [s]
    ),
    h = x.useCallback(async () => {
      const { save: k } = s.current;
      if (k) {
        r({ type: 'saving', saving: !0 });
        try {
          const A = await Xu(k);
          r({ type: 'setSave', save: A });
        } finally {
          r({ type: 'saving', saving: !1 });
        }
      }
    }, [s]),
    g = x.useCallback(() => {
      r({ type: 'clear' });
    }, []),
    b = x.useMemo(
      () => ({
        ...i,
        startNewGame: d,
        continueGame: m,
        applySave: _,
        applyAndPersist: p,
        persist: h,
        exitToTitle: g,
      }),
      [i, d, m, _, p, h, g]
    );
  return u.jsx(Ug.Provider, { value: b, children: l });
}
function ta() {
  const l = x.useContext(Ug);
  if (!l) throw new Error('useGameState は GameStateProvider の内側で使ってください');
  return l;
}
const _3 = {
    slash: '斬',
    pierce: '突',
    bash: '壊',
    fire: '火',
    ice: '氷',
    volt: '雷',
    almighty: '無',
  },
  f3 = {
    enemyOne: '敵単体',
    enemyRow: '敵1列',
    enemyAll: '敵全体',
    allyOne: '味方単体',
    allyAll: '味方全体',
    self: '自分',
  },
  p3 = {
    patk: '物攻',
    pdef: '物防',
    matk: '魔攻',
    mdef: '魔防',
    acc: '命中',
    eva: '回避',
    elementResist: '属性耐性',
  },
  h3 = {
    poison: '毒',
    paralysis: '麻痺',
    sleep: '睡眠',
    blind: '盲目',
    headBind: '頭封じ',
    armBind: '腕封じ',
    legBind: '脚封じ',
  };
function g3(l, i) {
  switch (l.kind) {
    case 'damage':
      return `${l.statBase === 'str' ? '物理' : '魔法'}威力${Math.round(l.power(i) * 100)}%${l.hits && l.hits > 1 ? `×${l.hits}` : ''}`;
    case 'heal':
      return `HP回復${l.amount(i)}`;
    case 'restoreTp':
      return `TP回復${l.amount(i)}`;
    case 'buff':
      return `${p3[l.stat]}${l.modifier(i) < 1 ? '↓' : '↑'}`;
    case 'ailment':
      return `${h3[l.ailment] ?? l.ailment}${Math.round(l.chance(i) * 100)}%`;
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
function Ur(l, i, r, s = 1) {
  return `${_3[l] ?? l}・${f3[i] ?? i}／${r.map((d) => g3(d, s)).join('・')}`;
}
const k3 = {
  hp: 'HP',
  tp: 'TP',
  str: '腕力',
  vit: '体力',
  agi: '敏捷',
  int: '知力',
  mnd: '精神',
  luc: '幸運',
};
function v3(l) {
  const i = {};
  for (const r of [...l.allies, ...l.enemies, ...l.summons])
    i[r.id] = { hp: r.hp, isDown: r.isDown };
  return i;
}
const y3 = () => {
    var aa, jt, dl, Et;
    const l = xl(),
      { save: i, applyAndPersist: r } = ta(),
      s = El(),
      d = x.useRef(null),
      [m, _] = x.useState(null),
      [p, h] = x.useState({}),
      [g, b] = x.useState(null),
      [k, A] = x.useState(!1),
      [C, z] = x.useState(!1),
      [I, M] = x.useState(null),
      [w, j] = x.useState({}),
      [V, $] = x.useState(null),
      [te, K] = x.useState(!1),
      [S, q] = x.useState(null),
      [X, ne] = x.useState(null),
      [Z, ie] = x.useState(null),
      [ke, Se] = x.useState(new Set()),
      [D, R] = x.useState(!0),
      [ee, oe] = x.useState(null),
      [pe, de] = x.useState([]);
    (x.useEffect(() => {
      if (m || !(i != null && i.diveState)) return;
      const N = i.diveState.depth,
        ae = (i.masterSeed ^ (N * 2654435761) ^ (i.towerState.record.totalDives * 40503)) >>> 0;
      d.current = Aa(ae);
      const ce = i.diveState.pendingFoeBattle;
      _(ce ? dh(i, [ce.enemyId], ce.firstStrike) : dh(i, Ex(N, d.current)));
    }, [i, m]),
      x.useEffect(() => {
        if (!D) return;
        s('encounter');
        const N = setTimeout(() => R(!1), 700);
        return () => clearTimeout(N);
      }, [D, s]));
    const y = x.useCallback(
        (N) => {
          if (!m || !d.current || m.outcome !== 'ongoing') return;
          const ae = v3(m),
            ce = s2(m, N, d.current);
          (_(ce),
            h({}),
            j({}),
            A(!1),
            z(!1),
            $(null),
            q(null),
            ne(null),
            b(null),
            Se(new Set()),
            ie(ce.log.length > 0 ? { base: ae, revealed: 0 } : null));
        },
        [m]
      ),
      B = x.useRef(!1);
    (x.useEffect(() => {
      !m ||
        !d.current ||
        B.current ||
        D ||
        (m.turn === 1 &&
          m.firstStrike === 'ambush' &&
          m.outcome === 'ongoing' &&
          ((B.current = !0), y([])));
    }, [m, D, y]),
      x.useEffect(() => {
        if (!m || !Z) return;
        if (Z.revealed >= m.log.length) {
          const ae = setTimeout(() => {
            (ie(null), Se(new Set()));
          }, 200);
          return () => clearTimeout(ae);
        }
        const N = setTimeout(
          () => {
            var Ze, Xe;
            const ae = Z.revealed,
              ce = (Ze = m.log[ae]) == null ? void 0 : Ze.snapshot,
              re =
                ae > 0 ? (((Xe = m.log[ae - 1]) == null ? void 0 : Xe.snapshot) ?? Z.base) : Z.base,
              Ie = new Set();
            if (ce)
              for (const Zt of Object.keys(ce)) {
                const Jt = re == null ? void 0 : re[Zt];
                Jt && (ce[Zt].hp < Jt.hp || (ce[Zt].isDown && !Jt.isDown)) && Ie.add(Zt);
              }
            (Se(Ie), ie({ ...Z, revealed: Z.revealed + 1 }));
          },
          Z.revealed === 0 ? 240 : 540
        );
        return () => clearTimeout(N);
      }, [m, Z]));
    const L = x.useMemo(() => (m && m.outcome === 'win' && i ? r2(i, m) : []), [m, i]);
    x.useEffect(() => {
      (m == null ? void 0 : m.outcome) === 'win' &&
        !Z &&
        de(L.filter((N) => N.toLevel > N.fromLevel));
    }, [m == null ? void 0 : m.outcome, Z, L]);
    const J = x.useRef(null);
    x.useEffect(() => {
      if (!m) return;
      const N = m.outcome;
      if (N === 'ongoing') {
        J.current = null;
        return;
      }
      Z ||
        (J.current !== N &&
          ((J.current = N),
          N === 'win' ? s('victory') : N === 'lose' ? s('defeat') : N === 'fled' && s('flee')));
    }, [m, Z, s]);
    const le = x.useRef(0);
    x.useEffect(() => {
      (pe.length > le.current || (pe.length > 0 && pe.length < le.current),
        ((le.current === 0 && pe.length > 0) || (le.current > pe.length && pe.length > 0)) &&
          s('levelup'),
        (le.current = pe.length));
    }, [pe.length, s]);
    const ue = x.useRef(new Set());
    x.useEffect(() => {
      m && (ue.current = new Set(m.allies.map((N) => N.id)));
    }, [m]);
    const ye = x.useRef(0);
    x.useEffect(() => {
      if (!m || !Z) {
        ye.current = 0;
        return;
      }
      const N = Z.revealed;
      if (N <= ye.current) return;
      const ae = m.log.slice(ye.current, N);
      ye.current = N;
      for (const ce of ae) {
        const re = ce.text;
        if (re === 'うまく逃げ切れた！') {
          s('flee');
          break;
        }
        if (re.includes('は倒れた')) {
          s('down');
          continue;
        }
        if (re.includes('は回復魔法を使った')) {
          s('heal');
          continue;
        }
        if (
          re.includes('のスキル') ||
          (/の.+！$/.test(re) && !re.includes('の攻撃！') && !re.includes('ユニオン'))
        ) {
          s('skill');
          continue;
        }
        if (re.startsWith('ユニオン！')) {
          s('skill');
          continue;
        }
        if (re.includes('になった')) {
          s('debuff');
          continue;
        }
        if (
          re.includes('は態勢を整えた') ||
          re.includes('の構えを取った') ||
          re.includes('を引きつけた') ||
          re.includes('の障壁を張った')
        ) {
          s('buff');
          continue;
        }
        if (re.includes('の攻撃！') && re.includes('ダメージ')) {
          const Ie = re.includes('（会心）'),
            Ze = ce.snapshot,
            Xe = Z.base;
          let Zt = !1;
          if (Ze) {
            for (const [Jt, ho] of Object.entries(Ze))
              if (ue.current.has(Jt)) {
                const ui = Xe == null ? void 0 : Xe[Jt];
                if (ui && ho.hp < ui.hp) {
                  Zt = !0;
                  break;
                }
              }
          }
          (Zt && s('damage'), s('attack'), Ie && s('critical'));
          continue;
        }
      }
    }, [m, Z, s]);
    const we = x.useMemo(
        () => (m == null ? void 0 : m.enemies.filter((N) => !N.isDown)) ?? [],
        [m]
      ),
      be = x.useMemo(() => (m == null ? void 0 : m.allies.filter((N) => !N.isDown)) ?? [], [m]);
    (x.useEffect(() => {
      we.length > 0 && !we.some((N) => N.id === I) && M(we[0].id);
    }, [we, I]),
      x.useEffect(() => {
        if ((m == null ? void 0 : m.outcome) !== 'ongoing' || (g && be.some((ae) => ae.id === g)))
          return;
        const N = be.find((ae) => !p[ae.id]) ?? null;
        b(N ? N.id : null);
      }, [m, be, g, p]));
    const Lt =
        be.length > 0 &&
        be.every((N) => {
          var ce;
          const ae = p[N.id];
          return ae
            ? ae.kind === 'skill' &&
              ((ce = wt[ae.skillId]) == null ? void 0 : ce.target) === 'allyOne'
              ? w[N.id] !== void 0
              : !0
            : !1;
        }),
      Bt = x.useCallback(
        (N, ae, ce) => {
          var Ze;
          if (
            ae.kind === 'skill' &&
            ((Ze = wt[ae.skillId]) == null ? void 0 : Ze.target) === 'allyOne' &&
            !ce
          ) {
            (A(!1), z(!1), $(ae.skillId), h((Xe) => ({ ...Xe, [N]: ae })));
            return;
          }
          const re = { ...p, [N]: ae };
          (h(re),
            ae.kind === 'skill' && ce && j((Xe) => ({ ...Xe, [N]: ce })),
            A(!1),
            z(!1),
            $(null));
          const Ie = be.find((Xe) => Xe.id !== N && !re[Xe.id]);
          b(Ie ? Ie.id : null);
        },
        [p, be]
      ),
      la = x.useCallback(
        async (N) => {
          (K(!0),
            oe(N.outcome === 'lose' ? 'lose' : N.outcome === 'fled' ? 'fled' : 'win'),
            await new Promise((ce) => setTimeout(ce, 460)));
          const ae = N.outcome === 'win';
          N.outcome === 'lose'
            ? (await r((ce) => ds(ph(ce, N))), l('/town'))
            : (await r((ce) => C2(ph(ce, N), ae)), l('/dungeon'));
        },
        [r, l]
      ),
      en = x.useCallback(() => {
        var N;
        (h({}),
          j({}),
          A(!1),
          z(!1),
          $(null),
          q(null),
          ne(null),
          b(((N = be[0]) == null ? void 0 : N.id) ?? null));
      }, [be]),
      Cl = x.useCallback(() => {
        var ce;
        if (!m || !d.current || m.outcome !== 'ongoing') return;
        s('decide');
        const N = I ?? ((ce = we[0]) == null ? void 0 : ce.id) ?? '',
          ae = be.map((re) => {
            const Ie = p[re.id] ?? { kind: 'attack' };
            if (Ie.kind === 'guard') return { kind: 'guard', actorId: re.id };
            if (Ie.kind === 'skill') {
              const Ze = wt[Ie.skillId];
              let Xe;
              return (
                (Ze == null ? void 0 : Ze.target) === 'allyOne'
                  ? (Xe = w[re.id] ?? re.id)
                  : (Ze == null ? void 0 : Ze.target) === 'allyAll' ||
                      (Ze == null ? void 0 : Ze.target) === 'self'
                    ? (Xe = re.id)
                    : (Xe = N),
                { kind: 'skill', actorId: re.id, skillId: Ie.skillId, targetId: Xe }
              );
            }
            return Ie.kind === 'item'
              ? { kind: 'item', actorId: re.id, itemId: Ie.itemId, targetId: re.id }
              : { kind: 'attack', actorId: re.id, targetId: N };
          });
        if (S) {
          const re = Kn[S.unionSkillId],
            Ie =
              (re == null ? void 0 : re.target) === 'enemyOne' ||
              (re == null ? void 0 : re.target) === 'enemyRow' ||
              (re == null ? void 0 : re.target) === 'enemyAll';
          ae.unshift({ kind: 'union', ...S, targetId: Ie ? N : S.targetId });
        }
        y(ae);
      }, [m, p, w, I, be, we, S, y, s]),
      si = x.useCallback(() => {
        if (!m || !d.current || m.outcome !== 'ongoing') return;
        const N = be[0];
        N && y([{ kind: 'flee', actorId: N.id }]);
      }, [m, be, y]);
    if (!i || !i.diveState) return u.jsx(yl, { to: '/town', replace: !0 });
    if (!m) return u.jsx('div', { className: F.layout, children: '戦闘準備中...' });
    const La = (N) => {
        const ae = i.guild.members.find((ce) => ce.id === N.id);
        return ae
          ? Object.keys(ae.learnedSkills).filter((ce) => {
              var re;
              return (
                ce in wt &&
                N.tp >= wt[ce].tpCost(((re = N.skillLevels) == null ? void 0 : re[ce]) ?? 1)
              );
            })
          : [];
      },
      ri = () => {
        const N = (ce) =>
            Object.values(p).filter((re) => re.kind === 'item' && re.itemId === ce).length,
          ae = (ce) => m.consumedItems.filter((re) => re === ce).length;
        return i.guild.storage
          .filter((ce) => {
            var re, Ie;
            return (Ie = (re = at[ce.itemId]) == null ? void 0 : re.useContext) == null
              ? void 0
              : Ie.includes('battle');
          })
          .map((ce) => ({
            id: ce.itemId,
            remaining: Ed(i, ce.itemId) - ae(ce.itemId) - N(ce.itemId),
          }))
          .filter((ce) => ce.remaining > 0);
      },
      Ss = (N) => {
        var ce, re;
        const ae = p[N.id];
        return ae
          ? ae.kind === 'attack'
            ? '攻撃'
            : ae.kind === 'guard'
              ? '防御'
              : ae.kind === 'item'
                ? (((ce = at[ae.itemId]) == null ? void 0 : ce.name) ?? 'どうぐ')
                : (((re = wt[ae.skillId]) == null ? void 0 : re.name) ?? 'スキル')
          : '';
      },
      tn = (N) => {
        const ae = (re) => re === 'headBind' || re === 'armBind' || re === 'legBind';
        let ce = '';
        return (
          N.ailments.some((re) => ae(re.type)) && (ce += ' 🔒'),
          N.ailments.some((re) => !ae(re.type)) && (ce += ' 🌀'),
          ce
        );
      },
      oi = (N) => {
        var ce;
        const ae = i.guild.members.find((re) => re.id === N.id);
        return ae ? (((ce = ze[ae.classId]) == null ? void 0 : ce.name) ?? '') : '';
      },
      Ba = Z
        ? Z.revealed > 0
          ? (((aa = m.log[Z.revealed - 1]) == null ? void 0 : aa.snapshot) ?? Z.base)
          : Z.base
        : null,
      ln = (N) => (Ba == null ? void 0 : Ba[N.id]) ?? { hp: N.hp, isDown: N.isDown },
      ws = (N) => {
        var re;
        const ae = i.guild.members.find((Ie) => Ie.id === N.id);
        if (!ae) return null;
        const ce =
          (re = Pe[ae.raceId]) == null
            ? void 0
            : re.raceSkillTree.skills.find((Ie) => Ie.skillId in Kn);
        return !ce || !(ce.skillId in ae.learnedSkills) ? null : (Kn[ce.skillId] ?? null);
      },
      Nt = (N, ae, ce) => {
        var Ze;
        const Ie =
          ae.target === 'enemyOne' || ae.target === 'enemyRow' || ae.target === 'enemyAll'
            ? (I ?? ((Ze = we[0]) == null ? void 0 : Ze.id) ?? '')
            : N;
        (q({ actorId: N, unionSkillId: ae.id, participantIds: ce, targetId: Ie }), ne(null));
      },
      fo = (N, ae) => {
        ae.requiredParticipants <= 1 ? Nt(N.id, ae, [N.id]) : ne({ actorId: N.id, def: ae });
      },
      st = g ? be.find((N) => N.id === g) : void 0,
      Al = V !== null,
      an = ((jt = m.enemies.find((N) => N.id === I)) == null ? void 0 : jt.name) ?? '-',
      Ts = Dd(m),
      ci = (N) => {
        const ae = ln(N),
          ce = Al && g !== null && w[g] === N.id,
          re = Al && !N.isDown;
        return u.jsxs(
          'button',
          {
            type: 'button',
            className: [
              F.card,
              ae.isDown ? F.down : '',
              re ? F.allySelectable : g === N.id ? F.cardActive : '',
              ce ? F.allyTargeted : '',
              p[N.id] && !Al ? F.cardDecided : '',
              ke.has(N.id) ? F.flash : '',
            ].join(' '),
            disabled: N.isDown || m.outcome !== 'ongoing' || !!Z,
            onClick: () => {
              Al && g ? Bt(g, { kind: 'skill', skillId: V }, N.id) : (b(N.id), A(!1), z(!1));
            },
            children: [
              u.jsxs('div', {
                className: F.cardName,
                children: [
                  N.name,
                  N.unionGauge >= 100 ? u.jsx('span', { className: F.uni, children: '★' }) : null,
                  tn(N),
                ],
              }),
              u.jsx('div', { className: F.cardJob, children: oi(N) }),
              u.jsx(Gn, { value: ae.hp, max: N.maxHp, color: '#4caf50', showValue: !1 }),
              u.jsx(Gn, { value: N.tp, max: N.maxTp, color: '#2196f3', showValue: !1 }),
              u.jsxs('div', {
                className: F.cardNums,
                children: ['HP ', Math.max(0, ae.hp), ' · TP ', N.tp],
              }),
              u.jsxs('div', {
                className: F.gaugeRow,
                children: [
                  u.jsx(Gn, { value: N.unionGauge, max: 100, color: '#ff9800', showValue: !1 }),
                  u.jsxs('span', { className: F.gaugeLabel, children: ['U ', N.unionGauge, '%'] }),
                ],
              }),
              p[N.id] ? u.jsxs('div', { className: F.cardCmd, children: ['▶ ', Ss(N)] }) : null,
            ],
          },
          N.id
        );
      },
      po = m.allies.filter((N) => N.row === 'front'),
      Ns = m.allies.filter((N) => N.row === 'back');
    return u.jsxs('div', {
      className: F.layout,
      children: [
        u.jsx('div', {
          className: F.enemies,
          children: m.enemies.map((N) => {
            const ae = ln(N),
              ce = I === N.id,
              re = N.enemyId,
              Ie = re ? Tt[re] : void 0;
            return u.jsxs(
              'button',
              {
                type: 'button',
                className: `${F.enemy} ${ae.isDown ? F.down : ''} ${ce ? F.targeted : ''} ${ke.has(N.id) ? F.flash : ''}`,
                disabled: N.isDown || !!Z || Al,
                onClick: () => M(N.id),
                children: [
                  u.jsxs('span', { className: F.enemyName, children: [N.name, tn(N)] }),
                  u.jsx(Gn, { value: ae.hp, max: N.maxHp, color: '#e57373', showValue: !1 }),
                  ce && Ie
                    ? u.jsx('div', {
                        className: F.enemyResist,
                        children: u.jsx(Pn, {
                          elementResist: Ie.resist,
                          ailmentResist: re ? Td(re) : void 0,
                          compact: !0,
                        }),
                      })
                    : null,
                ],
              },
              N.id
            );
          }),
        }),
        m.summons.length > 0
          ? u.jsx('div', {
              className: F.summons,
              children: m.summons.map((N) => {
                const ae = ln(N);
                return u.jsxs(
                  'div',
                  {
                    className: `${F.summon} ${ae.isDown ? F.down : ''} ${ke.has(N.id) ? F.flash : ''}`,
                    children: [
                      u.jsxs('span', { className: F.summonName, children: ['🐾 ', N.name] }),
                      u.jsx(Gn, { value: ae.hp, max: N.maxHp, color: '#8d6e63', showValue: !1 }),
                      u.jsxs('span', {
                        className: F.summonHp,
                        children: ['HP ', Math.max(0, ae.hp)],
                      }),
                    ],
                  },
                  N.id
                );
              }),
            })
          : null,
        u.jsxs('div', {
          className: F.party,
          children: [
            u.jsx('div', { className: F.rowTag, children: '前衛' }),
            u.jsx('div', { className: F.cardRow, children: po.map(ci) }),
            u.jsx('div', { className: F.rowTag, children: '後衛（近接ダメージ -30%）' }),
            u.jsx('div', {
              className: F.cardRow,
              children:
                Ns.length > 0
                  ? Ns.map(ci)
                  : u.jsx('div', { className: F.empty, children: '（なし）' }),
            }),
          ],
        }),
        Z
          ? u.jsxs('div', {
              className: F.playback,
              children: [
                u.jsx('span', { className: F.playbackHint, children: '戦況を再生中…' }),
                u.jsx('button', {
                  type: 'button',
                  className: F.skip,
                  onClick: () => {
                    (ie(null), Se(new Set()));
                  },
                  children: '▶▶ スキップ',
                }),
              ],
            })
          : m.outcome !== 'ongoing'
            ? u.jsxs('div', {
                className: F.result,
                children: [
                  u.jsx('div', {
                    className: F.resultTitle,
                    children:
                      m.outcome === 'win'
                        ? '勝利！'
                        : m.outcome === 'fled'
                          ? '逃走した'
                          : '全滅...',
                  }),
                  m.outcome === 'win'
                    ? u.jsxs(u.Fragment, {
                        children: [
                          u.jsxs('div', {
                            className: F.resultBody,
                            children: ['経験値 ', Ts.exp, ' ／ ', Ts.gold, ' G を獲得'],
                          }),
                          u.jsx('div', {
                            className: F.expList,
                            children: L.map((N) =>
                              u.jsxs(
                                'div',
                                {
                                  className: F.expRow,
                                  children: [
                                    u.jsxs('span', {
                                      className: F.expName,
                                      children: [
                                        N.name,
                                        u.jsxs('span', {
                                          className: F.expLv,
                                          children: [
                                            'Lv',
                                            N.toLevel,
                                            N.toLevel > N.fromLevel
                                              ? u.jsxs('span', {
                                                  className: F.expUp,
                                                  children: [' ↑', N.toLevel - N.fromLevel],
                                                })
                                              : null,
                                          ],
                                        }),
                                      ],
                                    }),
                                    u.jsx(Gn, {
                                      value: N.expToNext > 0 ? N.exp : 1,
                                      max: N.expToNext > 0 ? N.expToNext : 1,
                                      color: '#ffca28',
                                      showValue: !1,
                                    }),
                                    u.jsxs('span', {
                                      className: F.expNum,
                                      children: [
                                        N.expToNext > 0
                                          ? `次まで ${Math.max(0, N.expToNext - N.exp)}`
                                          : 'MAX',
                                        N.gainedExp > 0 ? `（+${N.gainedExp}）` : '',
                                      ],
                                    }),
                                  ],
                                },
                                N.charId
                              )
                            ),
                          }),
                        ],
                      })
                    : m.outcome === 'lose'
                      ? u.jsx('div', { className: F.resultBody, children: '拠点へ帰還する' })
                      : null,
                  u.jsx('button', {
                    type: 'button',
                    className: F.primary,
                    disabled: te || pe.length > 0,
                    onClick: () => void la(m),
                    children: 'つづける',
                  }),
                ],
              })
            : u.jsxs('div', {
                className: F.command,
                children: [
                  Al
                    ? u.jsxs('div', {
                        className: `${F.target} ${F.targetAlly}`,
                        children: [
                          ((dl = wt[V]) == null ? void 0 : dl.name) ?? 'スキル',
                          ': 味方をタップで対象を選択',
                        ],
                      })
                    : u.jsxs('div', {
                        className: F.target,
                        children: ['対象: ', an, '（敵をタップで変更）'],
                      }),
                  S
                    ? (() => {
                        const N = Kn[S.unionSkillId];
                        return u.jsxs('div', {
                          className: F.unionBanner,
                          children: [
                            u.jsxs('div', {
                              className: F.unionBannerHead,
                              children: [
                                '⚡ ユニオン予約: ',
                                N == null ? void 0 : N.name,
                                u.jsx('button', {
                                  type: 'button',
                                  className: F.unionCancel,
                                  onClick: () => q(null),
                                  children: '取消',
                                }),
                              ],
                            }),
                            N
                              ? u.jsxs('div', {
                                  className: F.unionBannerDesc,
                                  children: [
                                    Ur(N.element, N.target, N.effects),
                                    u.jsx('br', {}),
                                    N.description,
                                  ],
                                })
                              : null,
                          ],
                        });
                      })()
                    : null,
                  st
                    ? u.jsxs(u.Fragment, {
                        children: [
                          u.jsxs('div', {
                            className: F.cmdHead,
                            children: [st.name, ' のコマンド'],
                          }),
                          V
                            ? u.jsxs('div', {
                                className: F.skillList,
                                children: [
                                  u.jsxs('div', {
                                    className: F.allyTargetHint,
                                    children: [
                                      u.jsx('strong', {
                                        children: (Et = wt[V]) == null ? void 0 : Et.name,
                                      }),
                                      ' の対象を選択',
                                      u.jsx('br', {}),
                                      u.jsx('span', {
                                        className: F.allyTargetSub,
                                        children: '上の味方カードをタップしてください',
                                      }),
                                    ],
                                  }),
                                  be.map((N) =>
                                    u.jsx(
                                      'button',
                                      {
                                        type: 'button',
                                        className: [
                                          F.skillBtn,
                                          w[st.id] === N.id ? F.allyTargetSelected : '',
                                        ].join(' '),
                                        onClick: () => {
                                          Bt(st.id, { kind: 'skill', skillId: V }, N.id);
                                        },
                                        children: u.jsxs('span', {
                                          className: F.skillTop,
                                          children: [
                                            u.jsx('span', {
                                              className: F.skillName,
                                              children: N.name,
                                            }),
                                            u.jsxs('span', {
                                              className: F.tp,
                                              children: [
                                                'HP ',
                                                Math.max(0, ln(N).hp),
                                                '/',
                                                N.maxHp,
                                              ],
                                            }),
                                          ],
                                        }),
                                      },
                                      N.id
                                    )
                                  ),
                                  u.jsx('button', {
                                    type: 'button',
                                    className: F.menuBack,
                                    onClick: () => {
                                      ($(null),
                                        h((N) => {
                                          const ae = { ...N };
                                          return (delete ae[st.id], ae);
                                        }));
                                    },
                                    children: 'もどる',
                                  }),
                                ],
                              })
                            : k
                              ? u.jsxs('div', {
                                  className: F.skillList,
                                  children: [
                                    La(st).map((N) => {
                                      var ae, ce;
                                      return u.jsxs(
                                        'button',
                                        {
                                          type: 'button',
                                          className: F.skillBtn,
                                          onClick: () => Bt(st.id, { kind: 'skill', skillId: N }),
                                          children: [
                                            u.jsxs('span', {
                                              className: F.skillTop,
                                              children: [
                                                u.jsx('span', {
                                                  className: F.skillName,
                                                  children: wt[N].name,
                                                }),
                                                u.jsxs('span', {
                                                  className: F.tp,
                                                  children: [
                                                    'TP ',
                                                    wt[N].tpCost(
                                                      ((ae = st.skillLevels) == null
                                                        ? void 0
                                                        : ae[N]) ?? 1
                                                    ),
                                                  ],
                                                }),
                                              ],
                                            }),
                                            u.jsx('span', {
                                              className: F.skillSummary,
                                              children: Ur(
                                                wt[N].element,
                                                wt[N].target,
                                                wt[N].effects
                                              ),
                                            }),
                                            u.jsx('span', {
                                              className: F.skillDesc,
                                              children:
                                                ((ce = Zn[N]) == null ? void 0 : ce.description) ??
                                                '',
                                            }),
                                          ],
                                        },
                                        N
                                      );
                                    }),
                                    La(st).length === 0
                                      ? u.jsx('div', {
                                          className: F.empty,
                                          children: '使えるスキルがない',
                                        })
                                      : null,
                                    u.jsx('button', {
                                      type: 'button',
                                      className: F.menuBack,
                                      onClick: () => A(!1),
                                      children: 'もどる',
                                    }),
                                  ],
                                })
                              : C
                                ? u.jsxs('div', {
                                    className: F.skillList,
                                    children: [
                                      ri().map(({ id: N, remaining: ae }) =>
                                        u.jsxs(
                                          'button',
                                          {
                                            type: 'button',
                                            className: F.skillBtn,
                                            onClick: () => Bt(st.id, { kind: 'item', itemId: N }),
                                            children: [
                                              u.jsx('span', {
                                                className: F.skillTop,
                                                children: u.jsxs('span', {
                                                  className: F.skillName,
                                                  children: [at[N].name, ' ×', ae],
                                                }),
                                              }),
                                              u.jsx('span', {
                                                className: F.skillDesc,
                                                children: at[N].description,
                                              }),
                                            ],
                                          },
                                          N
                                        )
                                      ),
                                      ri().length === 0
                                        ? u.jsx('div', {
                                            className: F.empty,
                                            children: '使える道具がない',
                                          })
                                        : null,
                                      u.jsx('button', {
                                        type: 'button',
                                        className: F.menuBack,
                                        onClick: () => z(!1),
                                        children: 'もどる',
                                      }),
                                    ],
                                  })
                                : X
                                  ? u.jsxs('div', {
                                      className: F.skillList,
                                      children: [
                                        u.jsxs('div', {
                                          className: F.unionHint,
                                          children: [
                                            u.jsx('strong', { children: X.def.name }),
                                            u.jsx('br', {}),
                                            Ur(X.def.element, X.def.target, X.def.effects),
                                            u.jsx('br', {}),
                                            X.def.description,
                                            u.jsx('br', {}),
                                            '協力者を選択（あと',
                                            X.def.requiredParticipants - 1,
                                            '人。各自ゲージ',
                                            X.def.gaugeCostPerParticipant,
                                            '消費）',
                                          ],
                                        }),
                                        be
                                          .filter((N) => N.id !== X.actorId)
                                          .map((N) =>
                                            u.jsx(
                                              'button',
                                              {
                                                type: 'button',
                                                className: F.skillBtn,
                                                onClick: () =>
                                                  Nt(X.actorId, X.def, [X.actorId, N.id]),
                                                children: u.jsxs('span', {
                                                  className: F.skillTop,
                                                  children: [
                                                    u.jsx('span', {
                                                      className: F.skillName,
                                                      children: N.name,
                                                    }),
                                                    u.jsxs('span', {
                                                      className: F.tp,
                                                      children: ['ゲージ ', N.unionGauge],
                                                    }),
                                                  ],
                                                }),
                                              },
                                              N.id
                                            )
                                          ),
                                        be.filter((N) => N.id !== X.actorId).length === 0
                                          ? u.jsx('div', {
                                              className: F.empty,
                                              children: '協力できる味方がいない',
                                            })
                                          : null,
                                        u.jsx('button', {
                                          type: 'button',
                                          className: F.menuBack,
                                          onClick: () => ne(null),
                                          children: 'もどる',
                                        }),
                                      ],
                                    })
                                  : u.jsxs(u.Fragment, {
                                      children: [
                                        (() => {
                                          const N = ws(st);
                                          return !N || st.unionGauge < 100 || S
                                            ? null
                                            : u.jsxs('div', {
                                                className: F.unionInfo,
                                                children: [
                                                  '⚡ ',
                                                  u.jsx('strong', { children: N.name }),
                                                  ' 発動可（ゲージ100%）',
                                                  u.jsx('br', {}),
                                                  Ur(N.element, N.target, N.effects),
                                                ],
                                              });
                                        })(),
                                        u.jsxs('div', {
                                          className: F.menu,
                                          children: [
                                            u.jsx('button', {
                                              type: 'button',
                                              className: F.menuBtn,
                                              onClick: () => Bt(st.id, { kind: 'attack' }),
                                              children: '攻撃',
                                            }),
                                            u.jsx('button', {
                                              type: 'button',
                                              className: F.menuBtn,
                                              onClick: () => Bt(st.id, { kind: 'guard' }),
                                              children: '防御',
                                            }),
                                            u.jsx('button', {
                                              type: 'button',
                                              className: F.menuBtn,
                                              disabled: La(st).length === 0,
                                              onClick: () => A(!0),
                                              children: 'スキル',
                                            }),
                                            u.jsx('button', {
                                              type: 'button',
                                              className: F.menuBtn,
                                              disabled: ri().length === 0,
                                              onClick: () => z(!0),
                                              children: 'どうぐ',
                                            }),
                                            (() => {
                                              const N = ws(st);
                                              return !N || st.unionGauge < 100 || S
                                                ? null
                                                : u.jsx('button', {
                                                    type: 'button',
                                                    className: `${F.menuBtn} ${F.unionBtn}`,
                                                    onClick: () => fo(st, N),
                                                    children: '⚡ユニオン',
                                                  });
                                            })(),
                                            u.jsx('button', {
                                              type: 'button',
                                              className: F.menuBtn,
                                              onClick: si,
                                              children: '逃走',
                                            }),
                                          ],
                                        }),
                                      ],
                                    }),
                        ],
                      })
                    : u.jsxs('div', {
                        className: F.execRow,
                        children: [
                          u.jsx('button', {
                            type: 'button',
                            className: F.redo,
                            onClick: en,
                            children: 'やり直す',
                          }),
                          u.jsx('button', {
                            type: 'button',
                            className: F.primary,
                            disabled: !Lt,
                            onClick: Cl,
                            children: '実行',
                          }),
                        ],
                      }),
                ],
              }),
        u.jsx('div', {
          className: F.log,
          children: (() => {
            const N = Z ? m.log.slice(0, Z.revealed) : m.log;
            return N.length === 0
              ? u.jsxs('div', {
                  className: F.logLine,
                  children: ['てきが あらわれた！（', m.turn, ' ターン目）'],
                })
              : N.map((ae, ce) =>
                  u.jsx(
                    'div',
                    {
                      className: `${F.logLine} ${Z && ce === N.length - 1 ? F.logLineNew : ''}`,
                      children: ae.text,
                    },
                    ce
                  )
                );
          })(),
        }),
        pe.length > 0
          ? (() => {
              const N = pe[0];
              return u.jsx('div', {
                className: F.dialogOverlay,
                children: u.jsxs('div', {
                  className: F.dialog,
                  children: [
                    u.jsx('div', { className: F.dialogTitle, children: 'レベルアップ！' }),
                    u.jsxs('div', {
                      className: F.dialogName,
                      children: [
                        N.name,
                        ' は Lv',
                        N.fromLevel,
                        ' → ',
                        u.jsxs('strong', { children: ['Lv', N.toLevel] }),
                        ' になった！',
                      ],
                    }),
                    u.jsx('div', {
                      className: F.dialogStats,
                      children: Object.entries(N.statGains).map(([ae, ce]) =>
                        u.jsxs(
                          'span',
                          { className: F.dialogStat, children: [k3[ae] ?? ae, ' +', ce] },
                          ae
                        )
                      ),
                    }),
                    u.jsx('button', {
                      type: 'button',
                      className: F.primary,
                      onClick: () => de((ae) => ae.slice(1)),
                      children: 'OK',
                    }),
                  ],
                }),
              });
            })()
          : null,
        D ? u.jsx('div', { className: F.fxIntro }) : null,
        ee ? u.jsx('div', { className: `${F.fxOutro} ${ee === 'lose' ? F.fxLose : ''}` }) : null,
      ],
    });
  },
  b3 = '_layout_1qamj_1',
  x3 = '_head_1qamj_11',
  S3 = '_title_1qamj_15',
  w3 = '_tabs_1qamj_21',
  T3 = '_tab_1qamj_21',
  N3 = '_tabActive_1qamj_38',
  j3 = '_records_1qamj_43',
  E3 = '_statBig_1qamj_48',
  C3 = '_statNum_1qamj_60',
  A3 = '_statLabel_1qamj_67',
  L3 = '_statList_1qamj_72',
  B3 = '_statRow_1qamj_76',
  q3 = '_h2_1qamj_91',
  I3 = '_bossLog_1qamj_97',
  O3 = '_bossRow_1qamj_106',
  M3 = '_codex_1qamj_114',
  R3 = '_codexSummary_1qamj_121',
  D3 = '_list_1qamj_127',
  z3 = '_row_1qamj_133',
  H3 = '_unseen_1qamj_140',
  U3 = '_info_1qamj_144',
  $3 = '_name_1qamj_150',
  G3 = '_badge_1qamj_158',
  Y3 = '_sub_1qamj_167',
  V3 = '_empty_1qamj_172',
  X3 = '_rowClickable_1qamj_177',
  Q3 = '_expand_1qamj_185',
  K3 = '_resistDetail_1qamj_191',
  Z3 = '_resistSection_1qamj_200',
  J3 = '_resistHead_1qamj_206',
  P3 = '_foot_1qamj_212',
  F3 = '_back_1qamj_216',
  Ee = {
    layout: b3,
    head: x3,
    title: S3,
    tabs: w3,
    tab: T3,
    tabActive: N3,
    records: j3,
    statBig: E3,
    statNum: C3,
    statLabel: A3,
    statList: L3,
    statRow: B3,
    h2: q3,
    bossLog: I3,
    bossRow: O3,
    codex: M3,
    codexSummary: R3,
    list: D3,
    row: z3,
    unseen: H3,
    info: U3,
    name: $3,
    badge: G3,
    sub: Y3,
    empty: V3,
    rowClickable: X3,
    expand: Q3,
    resistDetail: K3,
    resistSection: Z3,
    resistHead: J3,
    foot: P3,
    back: F3,
  };
function $g(l) {
  const i = l.bestiary.monsters;
  return Object.values(Tt)
    .slice()
    .sort((r, s) => r.tierBand - s.tierBand || r.id.localeCompare(s.id))
    .map((r) => {
      const s = i[r.id],
        d = new Set((s == null ? void 0 : s.dropsFound) ?? []);
      return {
        id: r.id,
        name: r.name,
        tierBand: r.tierBand,
        seen: (s == null ? void 0 : s.seen) ?? !1,
        defeated: (s == null ? void 0 : s.defeated) ?? !1,
        drops: (r.drops ?? []).map((m) => {
          var _;
          return {
            itemId: m.itemId,
            name: ((_ = at[m.itemId]) == null ? void 0 : _.name) ?? m.itemId,
            found: d.has(m.itemId),
          };
        }),
      };
    });
}
function W3(l) {
  const i = $g(l),
    r = i.length,
    s = i.filter((b) => b.seen).length,
    d = i.filter((b) => b.defeated).length;
  let m = 0,
    _ = 0;
  for (const b of i) for (const k of b.drops) ((m += 1), k.found && (_ += 1));
  const p = r + m,
    h = d + _,
    g = p === 0 ? 0 : Math.round((h / p) * 100);
  return {
    monstersTotal: r,
    monstersSeen: s,
    monstersDefeated: d,
    dropsTotal: m,
    dropsFound: _,
    completionPct: g,
  };
}
const eS = () => {
    const l = xl(),
      { save: i } = ta(),
      r = El(),
      [s, d] = x.useState('record'),
      [m, _] = x.useState(null);
    if (!i) return u.jsx(yl, { to: '/title', replace: !0 });
    const p = i.towerState.record,
      h = W3(i),
      g = $g(i),
      b = (k, A) => {
        A && (r('cursor'), _((C) => (C === k ? null : k)));
      };
    return u.jsxs('div', {
      className: Ee.layout,
      children: [
        u.jsx('header', {
          className: Ee.head,
          children: u.jsx('h1', { className: Ee.title, children: '図鑑 / 記録' }),
        }),
        u.jsxs('div', {
          className: Ee.tabs,
          children: [
            u.jsx('button', {
              type: 'button',
              className: `${Ee.tab} ${s === 'record' ? Ee.tabActive : ''}`,
              onClick: () => {
                (r('cursor'), d('record'));
              },
              children: '到達記録',
            }),
            u.jsx('button', {
              type: 'button',
              className: `${Ee.tab} ${s === 'codex' ? Ee.tabActive : ''}`,
              onClick: () => {
                (r('cursor'), d('codex'));
              },
              children: '図鑑',
            }),
          ],
        }),
        s === 'record'
          ? u.jsxs('div', {
              className: Ee.records,
              children: [
                u.jsxs('div', {
                  className: Ee.statBig,
                  children: [
                    u.jsx('span', { className: Ee.statNum, children: p.deepestReached }),
                    u.jsx('span', { className: Ee.statLabel, children: '最深到達階' }),
                  ],
                }),
                u.jsxs('dl', {
                  className: Ee.statList,
                  children: [
                    u.jsxs('div', {
                      className: Ee.statRow,
                      children: [
                        u.jsx('dt', { children: '最高撃破ボス階' }),
                        u.jsx('dd', {
                          children: p.highestBossDefeated > 0 ? `${p.highestBossDefeated}F` : '—',
                        }),
                      ],
                    }),
                    u.jsxs('div', {
                      className: Ee.statRow,
                      children: [
                        u.jsx('dt', { children: '挑戦回数' }),
                        u.jsx('dd', { children: p.totalDives }),
                      ],
                    }),
                    u.jsxs('div', {
                      className: Ee.statRow,
                      children: [
                        u.jsx('dt', { children: '図鑑達成率' }),
                        u.jsxs('dd', { children: [h.completionPct, '%'] }),
                      ],
                    }),
                  ],
                }),
                u.jsx('h2', { className: Ee.h2, children: 'ボス撃破履歴' }),
                p.bossDefeatLog.length === 0
                  ? u.jsx('p', { className: Ee.empty, children: 'まだボスを倒していません。' })
                  : u.jsx('ul', {
                      className: Ee.bossLog,
                      children: p.bossDefeatLog
                        .slice()
                        .reverse()
                        .map((k, A) =>
                          u.jsx(
                            'li',
                            {
                              className: Ee.bossRow,
                              children: u.jsxs('span', { children: [k.depth, 'F のボス撃破'] }),
                            },
                            A
                          )
                        ),
                    }),
              ],
            })
          : u.jsxs('div', {
              className: Ee.codex,
              children: [
                u.jsxs('div', {
                  className: Ee.codexSummary,
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
                u.jsx('div', {
                  className: Ee.list,
                  children: g.map((k) => {
                    const A = m === k.id,
                      C = Tt[k.id];
                    return u.jsxs(
                      'div',
                      {
                        className: `${Ee.row} ${k.seen ? '' : Ee.unseen} ${k.seen ? Ee.rowClickable : ''}`,
                        role: k.seen ? 'button' : void 0,
                        tabIndex: k.seen ? 0 : void 0,
                        onClick: () => b(k.id, k.seen),
                        onKeyDown: (z) => {
                          (z.key === 'Enter' || z.key === ' ') && b(k.id, k.seen);
                        },
                        children: [
                          u.jsxs('div', {
                            className: Ee.info,
                            children: [
                              u.jsxs('span', {
                                className: Ee.name,
                                children: [
                                  k.seen ? k.name : '？？？',
                                  k.defeated
                                    ? u.jsx('span', { className: Ee.badge, children: '撃破' })
                                    : null,
                                  k.seen
                                    ? u.jsx('span', {
                                        className: Ee.expand,
                                        children: A ? '▲' : '▼',
                                      })
                                    : null,
                                ],
                              }),
                              u.jsxs('span', {
                                className: Ee.sub,
                                children: [
                                  '第',
                                  k.tierBand + 1,
                                  '帯',
                                  k.seen && k.drops.length > 0
                                    ? '・' +
                                      k.drops.map((z) => (z.found ? z.name : '？')).join(' / ')
                                    : '',
                                ],
                              }),
                            ],
                          }),
                          A && C
                            ? u.jsxs('div', {
                                className: Ee.resistDetail,
                                children: [
                                  u.jsxs('div', {
                                    className: Ee.resistSection,
                                    children: [
                                      u.jsx('span', { className: Ee.resistHead, children: '属性' }),
                                      u.jsx(Pn, { elementResist: C.resist, ailmentResist: void 0 }),
                                    ],
                                  }),
                                  u.jsxs('div', {
                                    className: Ee.resistSection,
                                    children: [
                                      u.jsx('span', {
                                        className: Ee.resistHead,
                                        children: '状態異常',
                                      }),
                                      u.jsx(Pn, { elementResist: void 0, ailmentResist: Td(k.id) }),
                                    ],
                                  }),
                                ],
                              })
                            : null,
                        ],
                      },
                      k.id
                    );
                  }),
                }),
              ],
            }),
        u.jsx('footer', {
          className: Ee.foot,
          children: u.jsx('button', {
            type: 'button',
            className: Ee.back,
            onClick: () => l('/town'),
            children: '拠点へ戻る',
          }),
        }),
      ],
    });
  },
  tS = '_layout_j0tqt_1',
  lS = '_head_j0tqt_13',
  aS = '_depth_j0tqt_22',
  nS = '_theme_j0tqt_28',
  iS = '_fpvWrap_j0tqt_45',
  sS = '_fpvControls_j0tqt_52',
  rS = '_fpvTurn_j0tqt_63',
  oS = '_fpvForward_j0tqt_64',
  cS = '_fpvBack_j0tqt_65',
  uS = '_menuBtn_j0tqt_99',
  dS = '_menuGold_j0tqt_112',
  mS = '_menuActions_j0tqt_118',
  _S = '_menuAction_j0tqt_118',
  fS = '_menuSectionLabel_j0tqt_135',
  pS = '_menuMember_j0tqt_141',
  hS = '_menuMemberName_j0tqt_155',
  gS = '_menuMemberJob_j0tqt_159',
  kS = '_menuMemberStat_j0tqt_166',
  vS = '_menuSp_j0tqt_171',
  yS = '_menuStats_j0tqt_178',
  bS = '_menuStat_j0tqt_178',
  xS = '_skillTabs_j0tqt_190',
  SS = '_skillTab_j0tqt_190',
  wS = '_skillTabOn_j0tqt_207',
  TS = '_mapWrap_j0tqt_213',
  NS = '_paletteHint_j0tqt_247',
  jS = '_stairs_j0tqt_256',
  ES = '_action_j0tqt_270',
  CS = '_notice_j0tqt_287',
  AS = '_itemOverlay_j0tqt_351',
  LS = '_itemPanel_j0tqt_361',
  BS = '_itemTitle_j0tqt_374',
  qS = '_itemEmpty_j0tqt_379',
  IS = '_itemRow_j0tqt_385',
  OS = '_itemName_j0tqt_393',
  MS = '_itemDesc_j0tqt_401',
  RS = '_itemTargets_j0tqt_407',
  DS = '_itemTarget_j0tqt_407',
  zS = '_itemHp_j0tqt_427',
  HS = '_itemUse_j0tqt_433',
  US = '_itemClose_j0tqt_450',
  $S = '_confirmOverlay_j0tqt_460',
  GS = '_confirmBox_j0tqt_471',
  YS = '_confirmText_j0tqt_483',
  VS = '_confirmActions_j0tqt_490',
  XS = '_confirmCancel_j0tqt_495',
  QS = '_confirmOk_j0tqt_496',
  me = {
    layout: tS,
    head: lS,
    depth: aS,
    theme: nS,
    fpvWrap: iS,
    fpvControls: sS,
    fpvTurn: rS,
    fpvForward: oS,
    fpvBack: cS,
    menuBtn: uS,
    menuGold: dS,
    menuActions: mS,
    menuAction: _S,
    menuSectionLabel: fS,
    menuMember: pS,
    menuMemberName: hS,
    menuMemberJob: gS,
    menuMemberStat: kS,
    menuSp: vS,
    menuStats: yS,
    menuStat: bS,
    skillTabs: xS,
    skillTab: SS,
    skillTabOn: wS,
    mapWrap: TS,
    paletteHint: NS,
    stairs: jS,
    action: ES,
    notice: CS,
    itemOverlay: AS,
    itemPanel: LS,
    itemTitle: BS,
    itemEmpty: qS,
    itemRow: IS,
    itemName: OS,
    itemDesc: MS,
    itemTargets: RS,
    itemTarget: DS,
    itemHp: zS,
    itemUse: HS,
    itemClose: US,
    confirmOverlay: $S,
    confirmBox: GS,
    confirmText: YS,
    confirmActions: VS,
    confirmCancel: XS,
    confirmOk: QS,
  },
  KS = '_canvas_1keax_1',
  ZS = { canvas: KS },
  JS = '/sekaiju-like-game/assets/stairs-down-BjaF19rU.png',
  PS = '/sekaiju-like-game/assets/stairs-up-DhyZlujG.png';
function Gg(l) {
  if (typeof Image > 'u') return null;
  const i = new Image();
  return ((i.src = l), i);
}
const mo = Gg(PS),
  _o = Gg(JS);
function no(l) {
  return !!l && l.complete && l.naturalWidth > 0;
}
const Qu = () => no(mo) && no(_o);
function Yg() {
  const [l, i] = x.useState(Qu);
  return (
    x.useEffect(() => {
      if (Qu()) {
        i(!0);
        return;
      }
      const r = [mo, _o].filter((d) => !!d),
        s = () => {
          Qu() && i(!0);
        };
      return (
        r.forEach((d) => d.addEventListener('load', s)),
        () => r.forEach((d) => d.removeEventListener('load', s))
      );
    }, []),
    l
  );
}
const FS = [
    { id: 'icon_chest', symbol: '📦', label: '宝箱' },
    { id: 'icon_foe', symbol: '👹', label: '強敵(FOE)' },
    { id: 'icon_warning', symbol: '⚠️', label: '注意' },
    { id: 'icon_door', symbol: '🚪', label: '扉/近道' },
    { id: 'icon_gather', symbol: '⛏️', label: '採集' },
    { id: 'icon_event', symbol: '❗', label: 'イベント' },
    { id: 'icon_note', symbol: '📝', label: 'メモ' },
    { id: 'icon_star', symbol: '⭐', label: '任意' },
  ],
  WS = new Map(FS.map((l) => [l.id, l]));
function ew(l) {
  var i;
  return ((i = WS.get(l)) == null ? void 0 : i.symbol) ?? '•';
}
const Ja = {
    fog: '#cdd9b8',
    floor: '#fbfdf7',
    wall: '#4a5a3a',
    grid: '#e3ebd6',
    player: '#2196f3',
    foe: '#b0533a',
    foeAlert: '#d32f2f',
  },
  tw = {
    mining: '⛏️',
    gathering: '🌿',
    logging: '🪓',
    fishing: '🎣',
    harvest: '🌰',
    hunting: '🍖',
  },
  lw = '🍳',
  aw = ({
    floor: l,
    explored: i,
    pos: r,
    dir: s,
    icons: d = [],
    foes: m = [],
    depletedGathers: _ = [],
    maxCell: p = 26,
    onCellClick: h,
  }) => {
    const g = x.useRef(null),
      b = Yg(),
      k = Math.max(10, Math.min(p, Math.floor(360 / l.width))),
      A = l.width * k,
      C = l.height * k;
    x.useEffect(() => {
      const I = g.current;
      if (!I) return;
      const M = new Set(i),
        w = new Set(_),
        j = new Map(l.gatheringPoints.map((Z) => [`${Z.cell.x},${Z.cell.y}`, Z.type])),
        V = window.devicePixelRatio || 1;
      ((I.width = A * V), (I.height = C * V));
      const $ = I.getContext('2d');
      if (!$) return;
      ($.scale(V, V), $.clearRect(0, 0, A, C));
      for (let Z = 0; Z < l.height; Z++)
        for (let ie = 0; ie < l.width; ie++) {
          const ke = M.has(`${ie},${Z}`);
          (($.fillStyle = ke ? Ja.floor : Ja.fog),
            $.fillRect(ie * k, Z * k, k, k),
            ke &&
              (($.strokeStyle = Ja.grid),
              ($.lineWidth = 1),
              $.strokeRect(ie * k + 0.5, Z * k + 0.5, k - 1, k - 1)));
        }
      (($.strokeStyle = Ja.wall), ($.lineWidth = 2), ($.lineCap = 'round'));
      const te = (Z, ie, ke, Se) => {
        ($.beginPath(), $.moveTo(Z, ie), $.lineTo(ke, Se), $.stroke());
      };
      for (let Z = 0; Z < l.height; Z++)
        for (let ie = 0; ie < l.width; ie++) {
          if (!M.has(`${ie},${Z}`)) continue;
          const ke = l.cells[Z][ie],
            Se = ie * k,
            D = Z * k;
          (ke.walls.N && te(Se, D, Se + k, D),
            ke.walls.S && te(Se, D + k, Se + k, D + k),
            ke.walls.W && te(Se, D, Se, D + k),
            ke.walls.E && te(Se + k, D, Se + k, D + k));
          const R = ke.event;
          if (
            (R == null ? void 0 : R.kind) === 'stairsUp' ||
            (R == null ? void 0 : R.kind) === 'stairsDown'
          ) {
            const ee = R.kind === 'stairsUp' ? mo : _o;
            if (no(ee)) {
              const oe = k * 0.9,
                pe = Se + (k - oe) / 2,
                de = D + (k - oe) / 2;
              (($.imageSmoothingEnabled = !1), $.drawImage(ee, pe, de, oe, oe));
            }
          } else if ((R == null ? void 0 : R.kind) === 'gather') {
            const ee = w.has(`${ie},${Z}`),
              oe = j.get(`${ie},${Z}`);
            (($.globalAlpha = ee ? 0.35 : 1),
              ($.font = `${Math.floor(k * 0.7)}px sans-serif`),
              ($.textAlign = 'center'),
              ($.textBaseline = 'middle'),
              $.fillText((oe && tw[oe]) || '🌿', Se + k / 2, D + k / 2 + 1),
              ($.globalAlpha = 1));
          } else
            (R == null ? void 0 : R.kind) === 'cookingSpot' &&
              (($.font = `${Math.floor(k * 0.7)}px sans-serif`),
              ($.textAlign = 'center'),
              ($.textBaseline = 'middle'),
              $.fillText(lw, Se + k / 2, D + k / 2 + 1));
        }
      (($.font = `${Math.floor(k * 0.66)}px sans-serif`),
        ($.textAlign = 'center'),
        ($.textBaseline = 'middle'));
      for (const Z of d)
        M.has(`${Z.x},${Z.y}`) && $.fillText(ew(Z.iconId), Z.x * k + k / 2, Z.y * k + k / 2 + 1);
      for (const Z of m) {
        if (!M.has(`${Z.x},${Z.y}`)) continue;
        const ie = Z.x * k + k / 2,
          ke = Z.y * k + k / 2;
        (($.fillStyle = Z.alerted ? Ja.foeAlert : Ja.foe),
          $.beginPath(),
          $.arc(ie, ke, k * 0.3, 0, Math.PI * 2),
          $.fill(),
          ($.fillStyle = '#ffffff'),
          ($.font = `bold ${Math.floor(k * 0.5)}px sans-serif`),
          ($.textAlign = 'center'),
          ($.textBaseline = 'middle'),
          $.fillText('!', ie, ke + 1));
      }
      const K = r.x * k + k / 2,
        S = r.y * k + k / 2,
        q = k * 0.34,
        ne = { N: -Math.PI / 2, E: 0, S: Math.PI / 2, W: Math.PI }[s];
      (($.fillStyle = Ja.player),
        $.beginPath(),
        $.moveTo(K + Math.cos(ne) * q, S + Math.sin(ne) * q),
        $.lineTo(K + Math.cos(ne + 2.5) * q, S + Math.sin(ne + 2.5) * q),
        $.lineTo(K + Math.cos(ne - 2.5) * q, S + Math.sin(ne - 2.5) * q),
        $.closePath(),
        $.fill());
    }, [l, i, r, s, d, m, _, k, A, C, b]);
    const z = (I) => {
      if (!h) return;
      const M = I.currentTarget.getBoundingClientRect(),
        w = Math.floor(((I.clientX - M.left) / M.width) * l.width),
        j = Math.floor(((I.clientY - M.top) / M.height) * l.height);
      w >= 0 && j >= 0 && w < l.width && j < l.height && h(w, j);
    };
    return u.jsx('canvas', {
      ref: g,
      className: ZS.canvas,
      style: { width: A, height: C },
      onClick: z,
    });
  },
  nw = '_gauge_1o2hx_1',
  iw = '_icon_1o2hx_11',
  sw = '_segments_1o2hx_16',
  rw = '_seg_1o2hx_16',
  ow = '_filled_1o2hx_28',
  cw = '_danger_1o2hx_32',
  Vn = { gauge: nw, icon: iw, segments: sw, seg: rw, filled: ow, danger: cw },
  uw = ({ level: l }) => {
    const i = l >= os;
    return u.jsxs('div', {
      className: Vn.gauge,
      role: 'img',
      'aria-label': `エンカウントゲージ ${l}/${os}`,
      children: [
        u.jsx('span', { className: Vn.icon, children: i ? '⚠' : '👣' }),
        u.jsx('div', {
          className: Vn.segments,
          children: Array.from({ length: os }, (r, s) =>
            u.jsx(
              'span',
              { className: [Vn.seg, s < l ? Vn.filled : '', i ? Vn.danger : ''].join(' ') },
              s
            )
          ),
        }),
      ],
    });
  },
  dw = '_view_tw2v9_1',
  mw = { view: dw },
  Eh = { N: { dx: 0, dy: -1 }, E: { dx: 1, dy: 0 }, S: { dx: 0, dy: 1 }, W: { dx: -1, dy: 0 } };
function _w(l, i, r, s = 4) {
  const d = Eg(r),
    m = jg(r),
    _ = [];
  let { x: p, y: h } = i;
  for (let g = 0; g < s; g++) {
    const b = Pa(l, p, h, r);
    if (
      (_.push({
        x: p,
        y: h,
        leftOpen: !l.cells[h][p].walls[d],
        rightOpen: !l.cells[h][p].walls[m],
        frontOpen: b,
        event: l.cells[h][p].event,
      }),
      !b)
    )
      break;
    ((p += Eh[r].dx), (h += Eh[r].dy));
  }
  return _;
}
const fw = {
    sky: '#26301c',
    ceiling: '#3a4a2c',
    floor: '#5d6b46',
    wall: '#8b9a6b',
    frontWall: '#7a8a5c',
    outline: '#2c3720',
  },
  pw = 0.56,
  hw = ({
    floor: l,
    pos: i,
    dir: r,
    foes: s = [],
    theme: d,
    maxDepth: m = 4,
    width: _ = 358,
    height: p = 200,
  }) => {
    const h = x.useRef(null),
      g = Yg();
    return (
      x.useEffect(() => {
        const b = { ...fw, ...(d ?? {}) },
          k = h.current;
        if (!k) return;
        const A = window.devicePixelRatio || 1;
        ((k.width = _ * A), (k.height = p * A));
        const C = k.getContext('2d');
        if (!C) return;
        C.scale(A, A);
        const z = _,
          I = p,
          M = z / 2,
          w = I / 2,
          j = _w(l, i, r, m),
          V = (K) => {
            const S = Math.pow(pw, K);
            return {
              l: M - (z / 2) * S,
              r: M + (z / 2) * S,
              t: w - (I / 2) * S,
              b: w + (I / 2) * S,
            };
          },
          $ = (K, S, q = !1) => {
            (C.beginPath(), C.moveTo(K[0][0], K[0][1]));
            for (let X = 1; X < K.length; X++) C.lineTo(K[X][0], K[X][1]);
            (C.closePath(),
              (C.fillStyle = S),
              C.fill(),
              q && ((C.strokeStyle = b.outline), (C.lineWidth = 1), C.stroke()));
          },
          te = (K) => `rgba(0,0,0,${Math.min(0.5, K * 0.13)})`;
        ((C.fillStyle = b.sky), C.fillRect(0, 0, z, I));
        for (let K = j.length - 1; K >= 0; K--) {
          const S = V(K),
            q = V(K + 1),
            X = j[K];
          ($(
            [
              [S.l, S.t],
              [S.r, S.t],
              [q.r, q.t],
              [q.l, q.t],
            ],
            b.ceiling
          ),
            $(
              [
                [S.l, S.b],
                [S.r, S.b],
                [q.r, q.b],
                [q.l, q.b],
              ],
              b.floor
            ),
            $(
              [
                [S.l, S.t],
                [q.l, q.t],
                [q.l, q.b],
                [S.l, S.b],
              ],
              X.leftOpen ? b.sky : b.wall,
              !0
            ),
            $(
              [
                [S.r, S.t],
                [q.r, q.t],
                [q.r, q.b],
                [S.r, S.b],
              ],
              X.rightOpen ? b.sky : b.wall,
              !0
            ),
            X.frontOpen ||
              $(
                [
                  [q.l, q.t],
                  [q.r, q.t],
                  [q.r, q.b],
                  [q.l, q.b],
                ],
                b.frontWall,
                !0
              ),
            (C.fillStyle = te(K)),
            C.fillRect(q.l, q.t, q.r - q.l, q.b - q.t));
          const ne = X.event;
          if (
            (ne == null ? void 0 : ne.kind) === 'stairsUp' ||
            (ne == null ? void 0 : ne.kind) === 'stairsDown'
          ) {
            const Z = ne.kind === 'stairsUp' ? mo : _o;
            if (no(Z)) {
              const ie = Math.max(20, (S.b - q.b) * 0.95),
                ke = M - ie / 2,
                Se = (S.b + q.b) / 2 - ie / 2;
              ((C.imageSmoothingEnabled = !1), C.drawImage(Z, ke, Se, ie, ie));
            }
          }
          if (K > 0 && s.some((Z) => Z.x === X.x && Z.y === X.y)) {
            const Z = s.some((D) => D.x === X.x && D.y === X.y && D.alerted),
              ie = M,
              ke = (S.b + q.b) / 2 - (S.b - q.b) * 0.1,
              Se = Math.max(14, (S.b - S.t) * 0.22);
            ((C.fillStyle = Z ? '#d32f2f' : '#b0533a'),
              C.beginPath(),
              C.arc(ie, ke, Se, 0, Math.PI * 2),
              C.fill(),
              (C.fillStyle = '#fff'),
              (C.font = `bold ${Math.floor(Se * 1.3)}px sans-serif`),
              (C.textAlign = 'center'),
              (C.textBaseline = 'middle'),
              C.fillText('!', ie, ke + 1));
          }
        }
      }, [l, i, r, s, d, m, _, p, g]),
      u.jsx('canvas', { ref: h, className: mw.view, style: { width: _, height: p } })
    );
  },
  gw = '_wrap_1uoga_1',
  kw = '_scroll_1uoga_7',
  vw = '_canvas_1uoga_17',
  yw = '_edges_1uoga_21',
  bw = '_edge_1uoga_21',
  xw = '_edgeLabel_1uoga_34',
  Sw = '_node_1uoga_40',
  ww = '_learned_1uoga_57',
  Tw = '_maxed_1uoga_62',
  Nw = '_available_1uoga_67',
  jw = '_locked_1uoga_72',
  Ew = '_selected_1uoga_76',
  Cw = '_nodeName_1uoga_81',
  Aw = '_nodeCost_1uoga_92',
  Lw = '_nodeLv_1uoga_104',
  Bw = '_lvNum_1uoga_112',
  qw = '_lvBar_1uoga_118',
  Iw = '_lvFill_1uoga_126',
  Ow = '_lvMax_1uoga_132',
  Mw = '_detail_1uoga_136',
  Rw = '_detailName_1uoga_143',
  Dw = '_detailLv_1uoga_151',
  zw = '_detailDesc_1uoga_157',
  Hw = '_detailReq_1uoga_164',
  Uw = '_hint_1uoga_170',
  $w = '_learnBtn_1uoga_176',
  Je = {
    wrap: gw,
    scroll: kw,
    canvas: vw,
    edges: yw,
    edge: bw,
    edgeLabel: xw,
    node: Sw,
    learned: ww,
    maxed: Tw,
    available: Nw,
    locked: jw,
    selected: Ew,
    nodeName: Cw,
    nodeCost: Aw,
    nodeLv: Lw,
    lvNum: Bw,
    lvBar: qw,
    lvFill: Iw,
    lvMax: Ow,
    detail: Mw,
    detailName: Rw,
    detailLv: Dw,
    detailDesc: zw,
    detailReq: Hw,
    hint: Uw,
    learnBtn: $w,
  },
  Ku = 132,
  Zu = 48,
  $r = 176,
  Gr = 62,
  Vg = ({ nodes: l, char: i, onLearn: r }) => {
    const [s, d] = x.useState(null),
      m = x.useMemo(() => {
        var w;
        const h = new Map(l.map((j) => [j.skillId, j])),
          g = new Map(),
          b = (j, V = 0) => {
            var K;
            if (g.has(j)) return g.get(j);
            const $ = h.get(j);
            if (!$ || !((K = $.requires) != null && K.length) || V > 20) return (g.set(j, 0), 0);
            const te =
              1 + Math.max(...$.requires.map((S) => (h.has(S.skillId) ? b(S.skillId, V + 1) : 0)));
            return (g.set(j, te), te);
          },
          k = [];
        l.forEach((j, V) => {
          const $ = b(j.skillId);
          (k[$] || (k[$] = [])).push(V);
        });
        const A = new Map(),
          C = k.map(() => new Set());
        for (let j = 0; j < k.length; j++)
          for (const V of k[j] ?? []) {
            const $ = l[V];
            let te = 0;
            if (j > 0 && (w = $.requires) != null && w.length) {
              const S = $.requires.map((q) => A.get(q.skillId)).filter((q) => q !== void 0);
              S.length && (te = Math.min(...S));
            }
            let K = te;
            for (; C[j].has(K); ) K++;
            (C[j].add(K), A.set($.skillId, K));
          }
        const z = Math.max(0, ...A.values()),
          I = l.map((j) => ({ node: j, col: b(j.skillId), row: A.get(j.skillId) ?? 0 })),
          M = [];
        for (const j of I)
          for (const V of j.node.requires ?? []) {
            const $ = I.find((te) => te.node.skillId === V.skillId);
            $ &&
              M.push({
                from: V.skillId,
                to: j.node.skillId,
                level: V.level,
                x1: $.col * $r + Ku,
                y1: $.row * Gr + Zu / 2,
                x2: j.col * $r,
                y2: j.row * Gr + Zu / 2,
              });
          }
        return { placed: I, edges: M, width: (k.length - 1) * $r + Ku, height: (z + 1) * Gr };
      }, [l]),
      _ = s ? Zn[s] : null,
      p = s ? l.find((h) => h.skillId === s) : null;
    return u.jsxs('div', {
      className: Je.wrap,
      children: [
        u.jsx('div', {
          className: Je.scroll,
          children: u.jsxs('div', {
            className: Je.canvas,
            style: { width: m.width, height: m.height },
            children: [
              u.jsx('svg', {
                className: Je.edges,
                width: m.width,
                height: m.height,
                children: m.edges.map((h) => {
                  const g = (h.x1 + h.x2) / 2;
                  return u.jsxs(
                    'g',
                    {
                      children: [
                        u.jsx('path', {
                          className: Je.edge,
                          d: `M ${h.x1} ${h.y1} H ${g} V ${h.y2} H ${h.x2}`,
                          fill: 'none',
                        }),
                        u.jsxs('text', {
                          className: Je.edgeLabel,
                          x: h.x2 - 6,
                          y: h.y2 - 5,
                          textAnchor: 'end',
                          children: ['Lv', h.level],
                        }),
                      ],
                    },
                    `${h.from}-${h.to}`
                  );
                }),
              }),
              m.placed.map(({ node: h, col: g, row: b }) => {
                var M;
                const k = Jn(i, h.skillId),
                  A = k >= h.maxLevel,
                  C = (h.requires ?? []).every((w) => Jn(i, w.skillId) >= w.level),
                  z = bg(i, h.skillId),
                  I = [
                    Je.node,
                    k > 0 ? Je.learned : '',
                    A ? Je.maxed : '',
                    z ? Je.available : '',
                    C ? '' : Je.locked,
                    s === h.skillId ? Je.selected : '',
                  ]
                    .filter(Boolean)
                    .join(' ');
                return u.jsxs(
                  'button',
                  {
                    type: 'button',
                    className: I,
                    style: { left: g * $r, top: b * Gr, width: Ku, height: Zu },
                    onClick: () => d(h.skillId),
                    children: [
                      u.jsx('span', {
                        className: Je.nodeName,
                        children: ((M = Zn[h.skillId]) == null ? void 0 : M.name) ?? h.skillId,
                      }),
                      u.jsxs('span', { className: Je.nodeCost, children: ['SP', vg(g)] }),
                      u.jsxs('span', {
                        className: Je.nodeLv,
                        children: [
                          u.jsx('span', { className: Je.lvNum, children: k }),
                          u.jsx('span', {
                            className: Je.lvBar,
                            children: u.jsx('span', {
                              className: Je.lvFill,
                              style: { width: `${(k / h.maxLevel) * 100}%` },
                            }),
                          }),
                          u.jsx('span', { className: Je.lvMax, children: h.maxLevel }),
                        ],
                      }),
                    ],
                  },
                  h.skillId
                );
              }),
            ],
          }),
        }),
        _ && p
          ? (() => {
              var I;
              const h = Jn(i, _.id),
                g = h >= p.maxLevel,
                b = yg(i, p),
                k = ni(i, _.id),
                A = us(i) >= k,
                C = !g && b && A,
                z = g
                  ? '習得済み（最大Lv）'
                  : b
                    ? A
                      ? h === 0
                        ? `習得する（SP${k} 消費）`
                        : `Lv${h}→${h + 1} に強化（SP${k} 消費）`
                      : `SP不足（必要 SP${k}）`
                    : '前提スキル未達';
              return u.jsxs('div', {
                className: Je.detail,
                children: [
                  u.jsxs('div', {
                    className: Je.detailName,
                    children: [
                      _.name,
                      u.jsxs('span', {
                        className: Je.detailLv,
                        children: ['Lv ', h, '/', p.maxLevel],
                      }),
                    ],
                  }),
                  u.jsx('div', { className: Je.detailDesc, children: _.description }),
                  (I = p.requires) != null && I.length
                    ? u.jsxs('div', {
                        className: Je.detailReq,
                        children: [
                          '前提:',
                          ' ',
                          p.requires
                            .map((M) => {
                              var w;
                              return `${((w = Zn[M.skillId]) == null ? void 0 : w.name) ?? M.skillId} Lv${M.level}`;
                            })
                            .join('・'),
                        ],
                      })
                    : null,
                  u.jsx('button', {
                    type: 'button',
                    className: Je.learnBtn,
                    disabled: !C,
                    onClick: () => r(_.id),
                    children: z,
                  }),
                ],
              });
            })()
          : u.jsx('div', {
              className: Je.hint,
              children:
                'ノードをタップで選択し、下の「習得する」ボタンで習得/強化（1Lvあたりの消費SPは各ノードの「SP◯」。深いスキルほど高コスト）。緑=習得済 / 枠強調=習得可 / 暗=前提未達。',
            }),
      ],
    });
  },
  Yr = [
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
function Ch(l) {
  const i = Math.floor((l - 1) / 10);
  return Yr[((i % Yr.length) + Yr.length) % Yr.length];
}
function Gw(l) {
  var s, d, m;
  const i = l.diveState;
  if (!i) return !1;
  const r =
    (d = (s = l.towerState.floors[i.depth]) == null ? void 0 : s.generated.cells[i.pos.y]) == null
      ? void 0
      : d[i.pos.x];
  return ((m = r == null ? void 0 : r.event) == null ? void 0 : m.kind) === 'cookingSpot';
}
function Yw(l) {
  const i = new Set(l.unlockedRecipeIds ?? []);
  return Object.values(ii).filter((r) => i.has(r.id));
}
function Xg(l, i) {
  const r = ii[i];
  return !r || !(l.unlockedRecipeIds ?? []).includes(i)
    ? !1
    : r.ingredients.every((s) => Ld(l, s.itemId) >= s.qty);
}
function Vw(l, i) {
  if (!Xg(l, i)) return { ok: !1, save: l };
  const r = ii[i];
  let s = l;
  for (const d of r.ingredients) s = gg(s, d.itemId, d.qty);
  return ((s = hg(s, r.result.itemId, r.result.count)), { ok: !0, save: s });
}
function Qg(l, i) {
  const r = new Set([...l.guild.party.front, ...l.guild.party.back].filter((s) => s !== null));
  return l.guild.members.some((s) => r.has(s.id) && (s.learnedSkills[i] ?? 0) > 0);
}
function Kg(l) {
  var m, _, p;
  const i = l.diveState;
  if (!i) return null;
  const r = (m = l.towerState.floors[i.depth]) == null ? void 0 : m.generated,
    s = (_ = r == null ? void 0 : r.cells[i.pos.y]) == null ? void 0 : _[i.pos.x];
  if (!r || ((p = s == null ? void 0 : s.event) == null ? void 0 : p.kind) !== 'gather')
    return null;
  const d = s.event.gatherId;
  return r.gatheringPoints.find((h) => h.id === d) ?? null;
}
function _d(l, i) {
  var d;
  const r = l.diveState;
  return r
    ? (((d = l.towerState.floors[r.depth]) == null ? void 0 : d.depletedGathers) ?? []).includes(
        lo(i.cell.x, i.cell.y)
      )
    : !0;
}
function Ah(l, i) {
  return Qg(l, Fa[i.type].requiredSkillId);
}
function Xw(l, i) {
  const r = l.reduce((d, m) => d + m.weight, 0);
  let s = i.next() * r;
  for (const d of l) if (((s -= d.weight), s < 0)) return d.itemId;
  return l[l.length - 1].itemId;
}
function Qw(l, i) {
  const r = l.diveState;
  if (!r) return { ok: !1, save: l, reason: 'noDive' };
  const s = Kg(l);
  if (!s) return { ok: !1, save: l, reason: 'noPoint' };
  if (_d(l, s)) return { ok: !1, save: l, reason: 'depleted' };
  const d = Fa[s.type];
  if (!Qg(l, d.requiredSkillId)) return { ok: !1, save: l, reason: 'noSkill' };
  if (d.food && pg(l) >= fg) return { ok: !1, save: l, reason: 'foodFull' };
  const m = Xw(d.drops, i);
  let _ = d.food ? hg(l, m, 1) : Cd(l, m, 1);
  const p = lo(s.cell.x, s.cell.y),
    h = _.towerState.floors[r.depth],
    g = h.depletedGathers.includes(p) ? h.depletedGathers : [...h.depletedGathers, p];
  return (
    (_ = {
      ..._,
      towerState: {
        ..._.towerState,
        floors: { ..._.towerState.floors, [r.depth]: { ...h, depletedGathers: g } },
      },
    }),
    { ok: !0, save: _, itemId: m, reason: void 0 }
  );
}
function Kw(l, i, r) {
  var I;
  const s = at[i];
  if (!s) return { save: l, ok: !1, message: 'そのアイテムは無い' };
  if (!((I = s.useContext) != null && I.includes('field')))
    return { save: l, ok: !1, message: 'ここでは使えない' };
  const d = mx(i);
  if ((d ? Ld(l, i) : Ed(l, i)) <= 0) return { save: l, ok: !1, message: '所持していない' };
  const _ = (M) => (d ? gg(M, i, 1) : Ad(M, i, 1));
  if (i === 'item_return_thread')
    return l.diveState
      ? { save: ds(_(l)), ok: !0, message: '拠点へ帰還した' }
      : { save: l, ok: !1, message: '探索中のみ使える' };
  if (!l.diveState) return { save: l, ok: !1, message: '探索中のみ使える' };
  const p = l.diveState.party.find((M) => M.charId === r),
    h = l.guild.members.find((M) => M.id === r);
  if (!p || !h) return { save: l, ok: !1, message: '対象がいない' };
  const g = Fl(h);
  let b = p.hp,
    k = p.tp,
    A = !1;
  for (const M of s.effects ?? [])
    M.kind === 'heal'
      ? ((b = Math.min(g.hp, b + M.amount(1))), (A = !0))
      : M.kind === 'restoreTp' && ((k = Math.min(g.tp, k + M.amount(1))), (A = !0));
  if (!A) return { save: l, ok: !1, message: 'いま使う効果がない' };
  const C = l.diveState.party.map((M) => (M.charId === r ? { ...M, hp: b, tp: k } : M));
  return {
    save: _({ ...l, diveState: { ...l.diveState, party: C } }),
    ok: !0,
    message: `${h.name} に ${s.name} を使った`,
  };
}
const Zw = (l) => new Promise((i) => setTimeout(i, l)),
  Jw = () => {
    const l = xl(),
      { save: i, applySave: r, applyAndPersist: s } = ta(),
      d = El(),
      m = x.useRef(null),
      _ = x.useRef(!1),
      [p, h] = x.useState(!1),
      [g, b] = x.useState(!1),
      [k, A] = x.useState(!1),
      [C, z] = x.useState(null),
      [I, M] = x.useState('class'),
      [w, j] = x.useState(null),
      [V, $] = x.useState(null),
      te = (i == null ? void 0 : i.diveState) ?? null,
      K = x.useMemo(() => {
        var y;
        return i && te
          ? (y = i.towerState.floors[te.depth]) == null
            ? void 0
            : y.generated
          : null;
      }, [i, te]),
      S = x.useMemo(() => {
        var y;
        return i && te
          ? (((y = i.towerState.floors[te.depth]) == null ? void 0 : y.foeRuntime) ?? [])
              .filter((B) => !B.defeated)
              .map((B) => ({ x: B.cell.x, y: B.cell.y, alerted: B.alerted }))
          : [];
      }, [i, te]),
      q = x.useMemo(() => (i ? Kg(i) : null), [i]),
      X = x.useMemo(() => (i ? Gw(i) : !1), [i]),
      ne = x.useMemo(() => {
        var y;
        return i && te
          ? (((y = i.towerState.floors[te.depth]) == null ? void 0 : y.depletedGathers) ?? [])
          : [];
      }, [i, te]),
      Z = x.useCallback(() => {
        var B;
        if (!i) return;
        m.current || (m.current = Aa((i.masterSeed ^ 2654435769) >>> 0));
        const y = Qw(i, m.current);
        if (!y.ok) {
          j(
            y.reason === 'noSkill'
              ? '対応する採集スキルを持つ仲間がいない'
              : y.reason === 'foodFull'
                ? '食料がいっぱいで採れない'
                : '採集できない'
          );
          return;
        }
        (d('item'),
          s(() => y.save),
          j(
            `${y.itemId ? (((B = at[y.itemId]) == null ? void 0 : B.name) ?? '素材') : '素材'} を手に入れた`
          ));
      }, [i, s, d]),
      ie = x.useCallback(
        (y) => {
          var L;
          if (!i) return;
          const B = Vw(i, y);
          B.ok &&
            (d('cook'),
            s(() => B.save),
            j(`${((L = ii[y]) == null ? void 0 : L.name) ?? '料理'} を作った`));
        },
        [i, s, d]
      ),
      ke = x.useCallback(
        (y) => {
          if (!i) return;
          (j(null), m.current || (m.current = Aa((i.masterSeed ^ 2654435769) >>> 0)));
          const B = vh(i, y, m.current);
          (s(() => B.save), B.triggered && l('/battle'));
        },
        [i, s, l]
      ),
      Se = x.useCallback(
        (y) => {
          r((B) => qg(B, y));
        },
        [r]
      ),
      D = x.useCallback(async () => {
        if (!i) return;
        const y = yh(i);
        if (y === 'stairsUp') {
          if (!Og(i, i.diveState.depth)) {
            j('強大な力に阻まれている。階層ボスを倒さねば先へ進めない。');
            return;
          }
          (d('dive'), await s((B) => L2(B)));
        } else
          y === 'stairsDown' &&
            (i.diveState.depth <= 1
              ? (d('warp'), await s((B) => ds(B)), l('/town'))
              : (d('dive'), await s((B) => B2(B))));
      }, [i, s, l, d]),
      R = x.useCallback(async () => {
        (d('warp'), await s((y) => ds(y)), l('/town'));
      }, [s, l, d]),
      ee = x.useCallback(
        (y, B) => {
          if (!i) return;
          const L = Kw(i, y, B);
          L.ok && (s(() => L.save), L.save.diveState || (h(!1), l('/town')));
        },
        [i, s, l]
      ),
      oe = x.useCallback(
        async (y) => {
          if (!(_.current || y.length === 0)) {
            ((_.current = !0), j(null));
            try {
              for (const B of y) {
                if (!m.current) continue;
                let L = !1,
                  J = !1;
                if (
                  (await s((le) => {
                    if (!le.diveState) return le;
                    const ue = vh(le, B, m.current);
                    return ((L = ue.triggered), (J = ue.moved), ue.save);
                  }),
                  L)
                ) {
                  l('/battle');
                  return;
                }
                if (!J) return;
                await Zw(110);
              }
            } finally {
              _.current = !1;
            }
          }
        },
        [s, l]
      ),
      pe = x.useCallback(
        (y, B) => {
          if (!te || !K || _.current) return;
          m.current || (m.current = Aa((i.masterSeed ^ 2654435769) >>> 0));
          const L = _2(K, te.pos, { x: y, y: B });
          L && L.length > 0 && oe(L);
        },
        [te, K, i, oe]
      );
    if (!i) return u.jsx(yl, { to: '/title', replace: !0 });
    if (!te || !K) return u.jsx(yl, { to: '/town', replace: !0 });
    const de = yh(i);
    return u.jsxs('div', {
      className: me.layout,
      children: [
        u.jsxs('header', {
          className: me.head,
          children: [
            u.jsxs('div', {
              className: me.depth,
              children: [
                te.depth,
                'F ',
                u.jsx('span', { className: me.theme, children: Ch(te.depth).name }),
              ],
            }),
            u.jsx(uw, { level: u2(te.encounter.stepsUntilEncounter) }),
            u.jsx('button', {
              type: 'button',
              className: me.menuBtn,
              onClick: () => {
                (d('cursor'), z(null), A(!0));
              },
              children: '☰ メニュー',
            }),
          ],
        }),
        u.jsxs('div', {
          className: me.fpvWrap,
          children: [
            u.jsx(hw, { floor: K, pos: te.pos, dir: te.dir, foes: S, theme: Ch(te.depth) }),
            u.jsxs('div', {
              className: me.fpvControls,
              children: [
                u.jsx('button', {
                  type: 'button',
                  className: me.fpvTurn,
                  onClick: () => Se(Eg(te.dir)),
                  'aria-label': '左を向く',
                  children: '↰',
                }),
                u.jsx('button', {
                  type: 'button',
                  className: me.fpvForward,
                  onClick: () => ke(te.dir),
                  children: '▲ 前進',
                }),
                u.jsx('button', {
                  type: 'button',
                  className: me.fpvTurn,
                  onClick: () => Se(jg(te.dir)),
                  'aria-label': '右を向く',
                  children: '↱',
                }),
              ],
            }),
            u.jsx('button', {
              type: 'button',
              className: me.fpvBack,
              onClick: () => Se(d2(te.dir)),
              'aria-label': '振り向く',
              children: '↻',
            }),
          ],
        }),
        u.jsx('div', {
          className: me.mapWrap,
          children: u.jsx(aw, {
            floor: K,
            explored: i.exploredCells[te.depth] ?? [],
            pos: te.pos,
            dir: te.dir,
            foes: S,
            depletedGathers: ne,
            onCellClick: pe,
          }),
        }),
        u.jsx('p', {
          className: me.paletteHint,
          children: 'マップのマスをタップすると、そこまで自動で移動します。',
        }),
        de &&
          u.jsx('button', {
            type: 'button',
            className: me.stairs,
            onClick: () => void D(),
            children:
              de === 'stairsUp'
                ? '▲ 次の階へ進む'
                : te.depth <= 1
                  ? '▼ 拠点へ戻る'
                  : '▼ 前の階へ戻る',
          }),
        q &&
          u.jsx('button', {
            type: 'button',
            className: me.action,
            disabled: _d(i, q) || !Ah(i, q),
            onClick: Z,
            children: _d(i, q)
              ? `🌿 ${Fa[q.type].name}（採集済み）`
              : Ah(i, q)
                ? `🌿 ${Fa[q.type].name}する`
                : `🌿 ${Fa[q.type].name}（スキル要）`,
          }),
        X &&
          u.jsx('button', {
            type: 'button',
            className: me.action,
            onClick: () => b(!0),
            children: '🍳 調理する',
          }),
        w && u.jsx('p', { className: me.notice, children: w }),
        p
          ? u.jsx('div', {
              className: me.itemOverlay,
              onClick: () => h(!1),
              children: u.jsxs('div', {
                className: me.itemPanel,
                onClick: (y) => y.stopPropagation(),
                children: [
                  u.jsx('div', { className: me.itemTitle, children: 'どうぐ・食料' }),
                  (() => {
                    const y = [...i.guild.storage, ...(i.guild.foodStorage ?? [])].filter((B) => {
                      var L, J;
                      return (
                        ((J = (L = at[B.itemId]) == null ? void 0 : L.useContext) == null
                          ? void 0
                          : J.includes('field')) && B.qty > 0
                      );
                    });
                    return y.length === 0
                      ? u.jsx('p', {
                          className: me.itemEmpty,
                          children: '使える道具がありません。',
                        })
                      : y.map((B) => {
                          const L = at[B.itemId],
                            J = B.itemId === 'item_return_thread';
                          return u.jsxs(
                            'div',
                            {
                              className: me.itemRow,
                              children: [
                                u.jsxs('div', {
                                  className: me.itemName,
                                  children: [
                                    L.name,
                                    ' ×',
                                    B.qty,
                                    u.jsx('span', {
                                      className: me.itemDesc,
                                      children: L.description,
                                    }),
                                  ],
                                }),
                                J
                                  ? u.jsx('button', {
                                      type: 'button',
                                      className: me.itemUse,
                                      onClick: () =>
                                        $({
                                          message: `${L.name} を使いますか？`,
                                          okLabel: '使う',
                                          onYes: () => ee(B.itemId),
                                        }),
                                      children: '使う',
                                    })
                                  : u.jsx('div', {
                                      className: me.itemTargets,
                                      children: te.party.map((le) => {
                                        const ue = i.guild.members.find(
                                          (we) => we.id === le.charId
                                        );
                                        if (!ue) return null;
                                        const ye = Fl(ue);
                                        return u.jsxs(
                                          'button',
                                          {
                                            type: 'button',
                                            className: me.itemTarget,
                                            onClick: () =>
                                              $({
                                                message: `${ue.name} に ${L.name} を使いますか？`,
                                                okLabel: '使う',
                                                onYes: () => ee(B.itemId, le.charId),
                                              }),
                                            children: [
                                              ue.name,
                                              u.jsxs('span', {
                                                className: me.itemHp,
                                                children: [
                                                  'HP ',
                                                  le.hp,
                                                  '/',
                                                  ye.hp,
                                                  '・TP ',
                                                  le.tp,
                                                  '/',
                                                  ye.tp,
                                                ],
                                              }),
                                            ],
                                          },
                                          le.charId
                                        );
                                      }),
                                    }),
                              ],
                            },
                            B.itemId
                          );
                        });
                  })(),
                  u.jsx('button', {
                    type: 'button',
                    className: me.itemClose,
                    onClick: () => h(!1),
                    children: 'とじる',
                  }),
                ],
              }),
            })
          : null,
        g
          ? u.jsx('div', {
              className: me.itemOverlay,
              onClick: () => b(!1),
              children: u.jsxs('div', {
                className: me.itemPanel,
                onClick: (y) => y.stopPropagation(),
                children: [
                  u.jsx('div', { className: me.itemTitle, children: '調理' }),
                  (() => {
                    const y = Yw(i);
                    return y.length === 0
                      ? u.jsx('p', {
                          className: me.itemEmpty,
                          children: '作れるレシピがありません。',
                        })
                      : y.map((B) => {
                          var le;
                          const L = Xg(i, B.id),
                            J = B.ingredients
                              .map((ue) => {
                                var ye;
                                return `${((ye = at[ue.itemId]) == null ? void 0 : ye.name) ?? ue.itemId}×${ue.qty}`;
                              })
                              .join(' ＋ ');
                          return u.jsxs(
                            'div',
                            {
                              className: me.itemRow,
                              children: [
                                u.jsxs('div', {
                                  className: me.itemName,
                                  children: [
                                    B.name,
                                    u.jsxs('span', {
                                      className: me.itemDesc,
                                      children: [
                                        J,
                                        ' → ',
                                        ((le = at[B.result.itemId]) == null ? void 0 : le.name) ??
                                          B.result.itemId,
                                        '（所持',
                                        B.ingredients
                                          .map((ue) => {
                                            var ye;
                                            return `${((ye = at[ue.itemId]) == null ? void 0 : ye.name) ?? ''}${Ld(i, ue.itemId)}`;
                                          })
                                          .join('・'),
                                        '）',
                                      ],
                                    }),
                                  ],
                                }),
                                u.jsx('button', {
                                  type: 'button',
                                  className: me.itemUse,
                                  disabled: !L,
                                  onClick: () =>
                                    $({
                                      message: `${B.name} を作りますか？`,
                                      okLabel: '作る',
                                      onYes: () => ie(B.id),
                                    }),
                                  children: '作る',
                                }),
                              ],
                            },
                            B.id
                          );
                        });
                  })(),
                  u.jsx('button', {
                    type: 'button',
                    className: me.itemClose,
                    onClick: () => b(!1),
                    children: 'とじる',
                  }),
                ],
              }),
            })
          : null,
        k
          ? u.jsx('div', {
              className: me.itemOverlay,
              onClick: () => {
                (d('cursor'), A(!1));
              },
              children: u.jsx('div', {
                className: me.itemPanel,
                onClick: (y) => y.stopPropagation(),
                children: (() => {
                  var J, le, ue, ye;
                  const y = C ? i.guild.members.find((we) => we.id === C) : null;
                  if (!y)
                    return u.jsxs(u.Fragment, {
                      children: [
                        u.jsx('div', { className: me.itemTitle, children: 'メニュー' }),
                        u.jsxs('p', {
                          className: me.menuGold,
                          children: ['所持金 ', i.guild.gold, ' G'],
                        }),
                        u.jsxs('div', {
                          className: me.menuActions,
                          children: [
                            u.jsx('button', {
                              type: 'button',
                              className: me.menuAction,
                              onClick: () => {
                                (A(!1), h(!0));
                              },
                              children: '🎒 どうぐ・食料',
                            }),
                            u.jsx('button', {
                              type: 'button',
                              className: me.menuAction,
                              onClick: () => void R(),
                              children: '🏠 拠点へ帰還',
                            }),
                          ],
                        }),
                        u.jsx('p', {
                          className: me.menuSectionLabel,
                          children: 'パーティ（タップで詳細・スキル振り）',
                        }),
                        te.party.map((we) => {
                          var la;
                          const be = i.guild.members.find((en) => en.id === we.charId);
                          if (!be) return null;
                          const Lt = Fl(be),
                            Bt = us(be);
                          return u.jsxs(
                            'button',
                            {
                              type: 'button',
                              className: me.menuMember,
                              onClick: () => {
                                (z(we.charId), M('class'));
                              },
                              children: [
                                u.jsxs('span', {
                                  className: me.menuMemberName,
                                  children: [
                                    be.name,
                                    u.jsxs('span', {
                                      className: me.menuMemberJob,
                                      children: [
                                        (la = ze[be.classId]) == null ? void 0 : la.name,
                                        ' Lv',
                                        be.level,
                                      ],
                                    }),
                                  ],
                                }),
                                u.jsxs('span', {
                                  className: me.menuMemberStat,
                                  children: [
                                    'HP ',
                                    we.hp,
                                    '/',
                                    Lt.hp,
                                    '・TP ',
                                    we.tp,
                                    '/',
                                    Lt.tp,
                                    Bt > 0
                                      ? u.jsxs('span', {
                                          className: me.menuSp,
                                          children: ['SP ', Bt],
                                        })
                                      : null,
                                  ],
                                }),
                              ],
                            },
                            we.charId
                          );
                        }),
                        u.jsx('button', {
                          type: 'button',
                          className: me.itemClose,
                          onClick: () => A(!1),
                          children: 'とじる',
                        }),
                      ],
                    });
                  const B = Fl(y),
                    L =
                      I === 'class'
                        ? (((J = ze[y.classId]) == null ? void 0 : J.skillTree.skills) ?? [])
                        : I === 'race'
                          ? (((le = Pe[y.raceId]) == null ? void 0 : le.raceSkillTree.skills) ?? [])
                          : y.titleId
                            ? (((ue = Jl[y.titleId]) == null ? void 0 : ue.skillTree.skills) ?? [])
                            : [];
                  return u.jsxs(u.Fragment, {
                    children: [
                      u.jsxs('div', {
                        className: me.itemTitle,
                        children: [
                          y.name,
                          '（',
                          (ye = ze[y.classId]) == null ? void 0 : ye.name,
                          ' Lv',
                          y.level,
                          '）',
                          u.jsxs('span', { className: me.menuSp, children: ['SP ', us(y)] }),
                        ],
                      }),
                      u.jsx('div', {
                        className: me.menuStats,
                        children: [
                          ['HP', B.hp],
                          ['TP', B.tp],
                          ['STR', B.str],
                          ['VIT', B.vit],
                          ['AGI', B.agi],
                          ['INT', B.int],
                          ['MND', B.mnd],
                          ['LUC', B.luc],
                        ].map(([we, be]) =>
                          u.jsxs('span', { className: me.menuStat, children: [we, ' ', be] }, we)
                        ),
                      }),
                      u.jsx('div', {
                        className: me.skillTabs,
                        children: ['class', 'race', 'title'].map((we) =>
                          u.jsx(
                            'button',
                            {
                              type: 'button',
                              className: `${me.skillTab} ${I === we ? me.skillTabOn : ''}`,
                              onClick: () => M(we),
                              disabled: we === 'title' && !y.titleId,
                              children: we === 'class' ? '職業' : we === 'race' ? '種族' : '称号',
                            },
                            we
                          )
                        ),
                      }),
                      u.jsx(Vg, {
                        nodes: L,
                        char: y,
                        onLearn: (we) => {
                          (d('create'),
                            s((be) => ({
                              ...be,
                              guild: {
                                ...be.guild,
                                members: be.guild.members.map((Lt) =>
                                  Lt.id === y.id ? xg(Lt, we) : Lt
                                ),
                              },
                            })));
                        },
                      }),
                      u.jsx('button', {
                        type: 'button',
                        className: me.itemClose,
                        onClick: () => z(null),
                        children: '← もどる',
                      }),
                    ],
                  });
                })(),
              }),
            })
          : null,
        V
          ? u.jsx('div', {
              className: me.confirmOverlay,
              onClick: () => $(null),
              children: u.jsxs('div', {
                className: me.confirmBox,
                onClick: (y) => y.stopPropagation(),
                children: [
                  u.jsx('div', { className: me.confirmText, children: V.message }),
                  u.jsxs('div', {
                    className: me.confirmActions,
                    children: [
                      u.jsx('button', {
                        type: 'button',
                        className: me.confirmCancel,
                        onClick: () => $(null),
                        children: 'やめる',
                      }),
                      u.jsx('button', {
                        type: 'button',
                        className: me.confirmOk,
                        onClick: () => {
                          (V.onYes(), $(null));
                        },
                        children: V.okLabel,
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
  Pw = '_layout_1id7b_1',
  Fw = '_head_1id7b_11',
  Ww = '_title_1id7b_18',
  e5 = '_stock_1id7b_24',
  t5 = '_tabs_1id7b_29',
  l5 = '_tab_1id7b_29',
  a5 = '_tabActive_1id7b_46',
  n5 = '_hint_1id7b_51',
  i5 = '_list_1id7b_57',
  s5 = '_row_1id7b_65',
  r5 = '_info_1id7b_76',
  o5 = '_name_1id7b_82',
  c5 = '_note_1id7b_87',
  u5 = '_actions_1id7b_92',
  d5 = '_ingot_1id7b_97',
  m5 = '_recycle_1id7b_114',
  _5 = '_maxed_1id7b_126',
  f5 = '_empty_1id7b_132',
  p5 = '_foot_1id7b_137',
  h5 = '_back_1id7b_141',
  g5 = '_confirmOverlay_1id7b_151',
  k5 = '_confirmBox_1id7b_162',
  v5 = '_confirmText_1id7b_174',
  y5 = '_confirmActions_1id7b_181',
  b5 = '_confirmCancel_1id7b_186',
  x5 = '_confirmOk_1id7b_187',
  Ve = {
    layout: Pw,
    head: Fw,
    title: Ww,
    stock: e5,
    tabs: t5,
    tab: l5,
    tabActive: a5,
    hint: n5,
    list: i5,
    row: s5,
    info: r5,
    name: o5,
    note: c5,
    actions: u5,
    ingot: d5,
    recycle: m5,
    maxed: _5,
    empty: f5,
    foot: p5,
    back: h5,
    confirmOverlay: g5,
    confirmBox: k5,
    confirmText: v5,
    confirmActions: y5,
    confirmCancel: b5,
    confirmOk: x5,
  },
  S5 = () => {
    const l = xl(),
      { save: i, applyAndPersist: r } = ta(),
      s = El(),
      [d, m] = x.useState('forge'),
      [_, p] = x.useState(null);
    if (!i) return u.jsx(yl, { to: '/title', replace: !0 });
    const { copper: h, silver: g, gold: b } = i.forgeInventory.ingots,
      k = i.forgeInventory.fragments.common ?? 0,
      A = i.guild.equipment,
      C = () => {
        _ &&
          (s(_.kind === 'forge' ? 'forge' : 'recycle'),
          _.kind === 'forge'
            ? r((I) => Bx(I, _.instanceId, _.ingot).save)
            : r((I) => qx(I, _.id).save),
          p(null));
      },
      z = (I, M, w, j, V) =>
        u.jsxs('button', {
          type: 'button',
          className: Ve.ingot,
          disabled: V <= 0,
          onClick: () => p({ kind: 'forge', instanceId: I, ingot: w, name: M, ingotLabel: j }),
          children: [j, '+', Pl.INGOT_INC[w], '（', V, '）'],
        });
    return u.jsxs('div', {
      className: Ve.layout,
      children: [
        u.jsxs('header', {
          className: Ve.head,
          children: [
            u.jsx('h1', { className: Ve.title, children: '鍛冶屋' }),
            u.jsxs('span', {
              className: Ve.stock,
              children: ['銅', h, '・銀', g, '・金', b, '／断片', k],
            }),
          ],
        }),
        u.jsxs('div', {
          className: Ve.tabs,
          children: [
            u.jsx('button', {
              type: 'button',
              className: `${Ve.tab} ${d === 'forge' ? Ve.tabActive : ''}`,
              onClick: () => {
                (s('cursor'), m('forge'));
              },
              children: '強化',
            }),
            u.jsx('button', {
              type: 'button',
              className: `${Ve.tab} ${d === 'recycle' ? Ve.tabActive : ''}`,
              onClick: () => {
                (s('cursor'), m('recycle'));
              },
              children: 'リサイクル',
            }),
          ],
        }),
        u.jsx('p', {
          className: Ve.hint,
          children:
            d === 'forge'
              ? 'インゴットで装備を強化（最大 +5）。銅+1・銀+3・金+5。'
              : '不要な装備を断片に変換。断片10個で銅インゴット1個になる。',
        }),
        u.jsx('div', {
          className: Ve.list,
          children:
            A.length === 0
              ? u.jsx('p', { className: Ve.empty, children: '所有している装備がありません。' })
              : A.map((I) => {
                  const M = et[I.masterId],
                    w = I.forgeLevel >= Pl.MAX_LEVEL;
                  return u.jsxs(
                    'div',
                    {
                      className: Ve.row,
                      children: [
                        u.jsxs('div', {
                          className: Ve.info,
                          children: [
                            u.jsx('span', { className: Ve.name, children: Ca(I) }),
                            u.jsx('span', {
                              className: Ve.note,
                              children: M == null ? void 0 : M.slot,
                            }),
                          ],
                        }),
                        d === 'forge'
                          ? u.jsx('div', {
                              className: Ve.actions,
                              children: w
                                ? u.jsx('span', { className: Ve.maxed, children: '最大強化' })
                                : u.jsxs(u.Fragment, {
                                    children: [
                                      z(I.id, Ca(I), 'copper', '銅', h),
                                      z(I.id, Ca(I), 'silver', '銀', g),
                                      z(I.id, Ca(I), 'gold', '金', b),
                                    ],
                                  }),
                            })
                          : u.jsxs('button', {
                              type: 'button',
                              className: Ve.recycle,
                              onClick: () => p({ kind: 'recycle', id: I.id, name: Ca(I) }),
                              children: ['分解（断片+', dg(I.masterId), '）'],
                            }),
                      ],
                    },
                    I.id
                  );
                }),
        }),
        u.jsx('footer', {
          className: Ve.foot,
          children: u.jsx('button', {
            type: 'button',
            className: Ve.back,
            onClick: () => l('/town'),
            children: '拠点へ戻る',
          }),
        }),
        _
          ? u.jsx('div', {
              className: Ve.confirmOverlay,
              onClick: () => p(null),
              children: u.jsxs('div', {
                className: Ve.confirmBox,
                onClick: (I) => I.stopPropagation(),
                children: [
                  u.jsx('div', {
                    className: Ve.confirmText,
                    children:
                      _.kind === 'forge'
                        ? u.jsxs(u.Fragment, {
                            children: [
                              u.jsx('strong', { children: _.name }),
                              ' を',
                              _.ingotLabel,
                              'インゴットで強化しますか？',
                            ],
                          })
                        : u.jsxs(u.Fragment, {
                            children: [
                              u.jsx('strong', { children: _.name }),
                              ' を分解しますか？（装備は失われます）',
                            ],
                          }),
                  }),
                  u.jsxs('div', {
                    className: Ve.confirmActions,
                    children: [
                      u.jsx('button', {
                        type: 'button',
                        className: Ve.confirmCancel,
                        onClick: () => {
                          (s('cancel'), p(null));
                        },
                        children: 'やめる',
                      }),
                      u.jsx('button', {
                        type: 'button',
                        className: Ve.confirmOk,
                        onClick: C,
                        children: _.kind === 'forge' ? '強化する' : '分解する',
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
  w5 = '_layout_fn0ll_2',
  T5 = '_head_fn0ll_13',
  N5 = '_title_fn0ll_20',
  j5 = '_count_fn0ll_26',
  E5 = '_create_fn0ll_31',
  C5 = '_sectionTitle_fn0ll_42',
  A5 = '_field_fn0ll_48',
  L5 = '_primary_fn0ll_64',
  B5 = '_list_fn0ll_79',
  q5 = '_empty_fn0ll_83',
  I5 = '_members_fn0ll_88',
  O5 = '_member_fn0ll_88',
  M5 = '_memberMain_fn0ll_107',
  R5 = '_memberName_fn0ll_119',
  D5 = '_pos_fn0ll_127',
  z5 = '_memberSub_fn0ll_144',
  H5 = '_posBtns_fn0ll_149',
  U5 = '_posBtn_fn0ll_149',
  $5 = '_posBtnActive_fn0ll_164',
  G5 = '_tabs_fn0ll_170',
  Y5 = '_tab_fn0ll_170',
  V5 = '_tabActive_fn0ll_187',
  X5 = '_notice_fn0ll_192',
  Q5 = '_filters_fn0ll_202',
  K5 = '_filter_fn0ll_202',
  Z5 = '_hint_fn0ll_221',
  J5 = '_slotGroup_fn0ll_227',
  P5 = '_slotGroupLabel_fn0ll_234',
  F5 = '_slot_fn0ll_227',
  W5 = '_slotFilled_fn0ll_251',
  e4 = '_slotEmpty_fn0ll_256',
  t4 = '_slotName_fn0ll_261',
  l4 = '_slotSub_fn0ll_266',
  a4 = '_slotPlaceholder_fn0ll_271',
  n4 = '_banishBtn_fn0ll_277',
  i4 = '_overlay_fn0ll_289',
  s4 = '_panel_fn0ll_300',
  r4 = '_panelTitle_fn0ll_314',
  o4 = '_pickerList_fn0ll_319',
  c4 = '_pickerItem_fn0ll_328',
  u4 = '_pickerItemActive_fn0ll_341',
  d4 = '_removeRow_fn0ll_346',
  m4 = '_panelClose_fn0ll_357',
  _4 = '_confirmBox_fn0ll_366',
  f4 = '_confirmText_fn0ll_378',
  p4 = '_confirmActions_fn0ll_384',
  h4 = '_confirmCancel_fn0ll_389',
  g4 = '_confirmOk_fn0ll_390',
  k4 = '_foot_fn0ll_411',
  v4 = '_sub_fn0ll_415',
  se = {
    layout: w5,
    head: T5,
    title: N5,
    count: j5,
    create: E5,
    sectionTitle: C5,
    field: A5,
    primary: L5,
    list: B5,
    empty: q5,
    members: I5,
    member: O5,
    memberMain: M5,
    memberName: R5,
    pos: D5,
    pos_前衛: '_pos_前衛_fn0ll_136',
    pos_後衛: '_pos_後衛_fn0ll_140',
    memberSub: z5,
    posBtns: H5,
    posBtn: U5,
    posBtnActive: $5,
    tabs: G5,
    tab: Y5,
    tabActive: V5,
    notice: X5,
    filters: Q5,
    filter: K5,
    hint: Z5,
    slotGroup: J5,
    slotGroupLabel: P5,
    slot: F5,
    slotFilled: W5,
    slotEmpty: e4,
    slotName: t4,
    slotSub: l4,
    slotPlaceholder: a4,
    banishBtn: n4,
    overlay: i4,
    panel: s4,
    panelTitle: r4,
    pickerList: o4,
    pickerItem: c4,
    pickerItemActive: u4,
    removeRow: d4,
    panelClose: m4,
    confirmBox: _4,
    confirmText: f4,
    confirmActions: p4,
    confirmCancel: h4,
    confirmOk: g4,
    foot: k4,
    sub: v4,
  },
  y4 = '_card_14c64_1',
  b4 = '_className_14c64_11',
  x4 = '_description_14c64_17',
  S4 = '_sectionLabel_14c64_25',
  w4 = '_equipSection_14c64_32',
  T4 = '_equipRow_14c64_38',
  N4 = '_equipKind_14c64_45',
  j4 = '_equipList_14c64_52',
  E4 = '_skillSection_14c64_56',
  C4 = '_skillList_14c64_61',
  A4 = '_skillItem_14c64_70',
  L4 = '_skillHeader_14c64_76',
  B4 = '_skillName_14c64_83',
  q4 = '_skillMaxLv_14c64_89',
  I4 = '_skillDesc_14c64_94',
  ft = {
    card: y4,
    className: b4,
    description: x4,
    sectionLabel: S4,
    equipSection: w4,
    equipRow: T4,
    equipKind: N4,
    equipList: j4,
    skillSection: E4,
    skillList: C4,
    skillItem: A4,
    skillHeader: L4,
    skillName: B4,
    skillMaxLv: q4,
    skillDesc: I4,
  },
  Zg = { sword: '剣', spear: '槍', axe: '斧', bow: '弓', staff: '杖', fist: '拳' },
  Jg = { heavy: '重装', light: '軽装', clothes: '衣' },
  O4 = { weapon: '武器', armor: '防具', accessory: '装飾品' },
  M4 = ({ classId: l }) => {
    const i = ze[l];
    if (!i) return null;
    const r = i.equipableWeaponTypes.map((d) => Zg[d]),
      s = i.equipableArmorTypes.map((d) => Jg[d]);
    return u.jsxs('div', {
      className: ft.card,
      children: [
        u.jsx('div', { className: ft.className, children: i.name }),
        u.jsx('p', { className: ft.description, children: i.description }),
        u.jsxs('div', {
          className: ft.equipSection,
          children: [
            u.jsx('div', { className: ft.sectionLabel, children: '装備' }),
            u.jsxs('div', {
              className: ft.equipRow,
              children: [
                u.jsx('span', { className: ft.equipKind, children: '武器' }),
                u.jsx('span', { className: ft.equipList, children: r.join(' / ') }),
              ],
            }),
            u.jsxs('div', {
              className: ft.equipRow,
              children: [
                u.jsx('span', { className: ft.equipKind, children: '防具' }),
                u.jsx('span', { className: ft.equipList, children: s.join(' / ') }),
              ],
            }),
          ],
        }),
        u.jsxs('div', {
          className: ft.skillSection,
          children: [
            u.jsx('div', { className: ft.sectionLabel, children: '習得スキル' }),
            u.jsx('div', {
              className: ft.skillList,
              children: i.skillTree.skills.map((d) => {
                const m = Zn[d.skillId];
                return m
                  ? u.jsxs(
                      'div',
                      {
                        className: ft.skillItem,
                        children: [
                          u.jsxs('div', {
                            className: ft.skillHeader,
                            children: [
                              u.jsx('span', { className: ft.skillName, children: m.name }),
                              u.jsxs('span', {
                                className: ft.skillMaxLv,
                                children: ['最大Lv', d.maxLevel],
                              }),
                            ],
                          }),
                          u.jsx('div', { className: ft.skillDesc, children: m.description }),
                        ],
                      },
                      d.skillId
                    )
                  : null;
              }),
            }),
          ],
        }),
      ],
    });
  },
  R4 = '_card_15x2d_1',
  D4 = '_raceName_15x2d_11',
  z4 = '_description_15x2d_17',
  H4 = '_sectionLabel_15x2d_25',
  U4 = '_rankGrid_15x2d_32',
  $4 = '_rankChip_15x2d_38',
  G4 = '_chipLabel_15x2d_48',
  Y4 = '_chipRank_15x2d_53',
  V4 = '_rank_S_15x2d_58',
  X4 = '_rank_A_15x2d_63',
  Q4 = '_rank_B_15x2d_68',
  K4 = '_rank_C_15x2d_73',
  Z4 = '_rank_D_15x2d_78',
  ol = {
    card: R4,
    raceName: D4,
    description: z4,
    sectionLabel: H4,
    rankGrid: U4,
    rankChip: $4,
    chipLabel: G4,
    chipRank: Y4,
    rank_S: V4,
    rank_A: X4,
    rank_B: Q4,
    rank_C: K4,
    rank_D: Z4,
  },
  J4 = 20,
  Pg = ['hp', 'tp', 'str', 'vit', 'agi', 'int', 'mnd', 'luc'],
  Fg = Object.keys(Pe);
function Wg(l, i) {
  const r = Pe[l];
  return r.baseStatsAtLv1[i] + r.statGrowth[i] * (J4 - 1);
}
function P4(l) {
  return l >= 0.84 ? 'S' : l >= 0.63 ? 'A' : l >= 0.42 ? 'B' : l >= 0.21 ? 'C' : 'D';
}
const ek = {};
for (const l of Pg) {
  const i = Fg.map((r) => Wg(r, l));
  ek[l] = { min: Math.min(...i), max: Math.max(...i) };
}
const tk = {};
for (const l of Fg) {
  const i = {};
  for (const r of Pg) {
    const s = Wg(l, r),
      { min: d, max: m } = ek[r],
      _ = m === d ? 0.5 : (s - d) / (m - d);
    i[r] = P4(_);
  }
  tk[l] = i;
}
function F4(l) {
  const i = tk[l];
  if (!i) throw new Error(`Unknown raceId: ${l}`);
  return i;
}
const W4 = [
    { key: 'hp', label: 'HP' },
    { key: 'tp', label: 'TP' },
    { key: 'str', label: '力' },
    { key: 'vit', label: '守' },
    { key: 'agi', label: '速' },
    { key: 'int', label: '魔' },
    { key: 'mnd', label: '心' },
    { key: 'luc', label: '運' },
  ],
  eT = ({ raceId: l }) => {
    const i = Pe[l];
    if (!i) return null;
    const r = F4(l);
    return u.jsxs('div', {
      className: ol.card,
      children: [
        u.jsx('div', { className: ol.raceName, children: i.name }),
        u.jsx('p', { className: ol.description, children: i.description }),
        u.jsxs('div', {
          className: ol.rankSection,
          children: [
            u.jsx('div', { className: ol.sectionLabel, children: '能力ランク' }),
            u.jsx('div', {
              className: ol.rankGrid,
              children: W4.map(({ key: s, label: d }) => {
                const m = r[s];
                return u.jsxs(
                  'div',
                  {
                    className: `${ol.rankChip} ${ol[`rank_${m}`]}`,
                    children: [
                      u.jsx('span', { className: ol.chipLabel, children: d }),
                      u.jsx('span', { className: ol.chipRank, children: m }),
                    ],
                  },
                  s
                );
              }),
            }),
          ],
        }),
        u.jsxs('div', {
          className: ol.resistSection,
          children: [
            u.jsx('div', { className: ol.sectionLabel, children: '種族耐性' }),
            u.jsx(Pn, { elementResist: i.elementResist, ailmentResist: i.ailmentResist }),
          ],
        }),
      ],
    });
  };
function Lh(l) {
  return [...l.guild.party.front, ...l.guild.party.back].filter((i) => i !== null).length;
}
const tT = (l) => (l === 'front' ? bs : xs);
function Bh(l, i, r, s) {
  if (r < 0 || r >= tT(i) || (s !== null && !l.guild.members.some((_) => _.id === s))) return l;
  const d = l.guild.party.front.map((_) => (_ === s ? null : _)),
    m = l.guild.party.back.map((_) => (_ === s ? null : _));
  for (; d.length < bs; ) d.push(null);
  for (; m.length < xs; ) m.push(null);
  return (
    i === 'front' ? (d[r] = s) : (m[r] = s),
    { ...l, guild: { ...l.guild, party: { front: d, back: m } } }
  );
}
const qh = { created: '作成順', levelDesc: 'レベルが高い順', levelAsc: 'レベルが低い順' },
  lT = [];
function Ih(l, i) {
  return l.guild.party.front.includes(i)
    ? '前衛'
    : l.guild.party.back.includes(i)
      ? '後衛'
      : '控え';
}
const aT = () => {
    var y, B;
    const l = xl(),
      { save: i, applyAndPersist: r } = ta(),
      s = El(),
      d = Object.keys(Pe),
      m = Object.keys(ze),
      [_, p] = x.useState('roster'),
      [h, g] = x.useState(''),
      [b, k] = x.useState(d[0]),
      [A, C] = x.useState(m[0]),
      [z, I] = x.useState(!1),
      [M, w] = x.useState(null),
      [j, V] = x.useState('all'),
      [$, te] = x.useState('all'),
      [K, S] = x.useState('created'),
      [q, X] = x.useState(null),
      [ne, Z] = x.useState(null),
      ie = (i == null ? void 0 : i.guild.members) ?? lT,
      ke = x.useMemo(() => {
        let L = ie;
        (j !== 'all' && (L = L.filter((le) => le.raceId === j)),
          $ !== 'all' && (L = L.filter((le) => le.classId === $)));
        const J = [...L];
        return (
          K === 'levelDesc'
            ? J.sort((le, ue) => ue.level - le.level)
            : K === 'levelAsc' && J.sort((le, ue) => le.level - ue.level),
          J
        );
      }, [ie, j, $, K]),
      Se = x.useCallback(async () => {
        var le, ue;
        const L = h.trim() || '名もなき冒険者',
          J = Mg({ raceId: b, classId: A, name: L });
        (s('create'),
          I(!0),
          await r((ye) => H2(ye, J)),
          w(
            `${L}（${(le = Pe[b]) == null ? void 0 : le.name} / ${(ue = ze[A]) == null ? void 0 : ue.name}）を作成しました`
          ),
          g(''),
          I(!1));
      }, [h, b, A, r, s]);
    if (!i) return u.jsx(yl, { to: '/title', replace: !0 });
    const D = ie.length >= ed,
      R = d.filter((L) => ie.some((J) => J.raceId === L)),
      ee = m.filter((L) => ie.some((J) => J.classId === L)),
      oe = ne ? ie.find((L) => L.id === ne) : null,
      pe = (L, J) => (L === 'front' ? i.guild.party.front : i.guild.party.back)[J] ?? null,
      de = (L) => {
        var J, le;
        return `${(J = Pe[L.raceId]) == null ? void 0 : J.name} / ${(le = ze[L.classId]) == null ? void 0 : le.name} / Lv${L.level}`;
      };
    return u.jsxs('div', {
      className: se.layout,
      children: [
        u.jsxs('header', {
          className: se.head,
          children: [
            u.jsx('h1', { className: se.title, children: 'ギルド管理' }),
            u.jsxs('span', { className: se.count, children: ['団員 ', ie.length, ' / ', ed] }),
          ],
        }),
        u.jsxs('div', {
          className: se.tabs,
          children: [
            u.jsx('button', {
              type: 'button',
              className: `${se.tab} ${_ === 'roster' ? se.tabActive : ''}`,
              onClick: () => {
                (s('cursor'), p('roster'));
              },
              children: '作成・一覧',
            }),
            u.jsx('button', {
              type: 'button',
              className: `${se.tab} ${_ === 'party' ? se.tabActive : ''}`,
              onClick: () => {
                (s('cursor'), p('party'));
              },
              children: '編成',
            }),
            u.jsx('button', {
              type: 'button',
              className: `${se.tab} ${_ === 'banish' ? se.tabActive : ''}`,
              onClick: () => {
                (s('cursor'), p('banish'));
              },
              children: '追放',
            }),
          ],
        }),
        _ === 'roster'
          ? u.jsxs(u.Fragment, {
              children: [
                u.jsxs('section', {
                  className: se.create,
                  children: [
                    u.jsx('h2', { className: se.sectionTitle, children: '冒険者を作成' }),
                    u.jsxs('label', {
                      className: se.field,
                      children: [
                        u.jsx('span', { children: '名前' }),
                        u.jsx('input', {
                          type: 'text',
                          value: h,
                          maxLength: 16,
                          placeholder: '名もなき冒険者',
                          onChange: (L) => g(L.target.value),
                        }),
                      ],
                    }),
                    u.jsxs('label', {
                      className: se.field,
                      children: [
                        u.jsx('span', { children: '種族' }),
                        u.jsx('select', {
                          value: b,
                          onChange: (L) => k(L.target.value),
                          children: d.map((L) =>
                            u.jsx('option', { value: L, children: Pe[L].name }, L)
                          ),
                        }),
                      ],
                    }),
                    u.jsx(eT, { raceId: b }),
                    u.jsxs('label', {
                      className: se.field,
                      children: [
                        u.jsx('span', { children: '職業' }),
                        u.jsx('select', {
                          value: A,
                          onChange: (L) => C(L.target.value),
                          children: m.map((L) =>
                            u.jsx('option', { value: L, children: ze[L].name }, L)
                          ),
                        }),
                      ],
                    }),
                    u.jsx(M4, { classId: A }),
                    u.jsx('button', {
                      type: 'button',
                      className: se.primary,
                      disabled: z || D,
                      onClick: () => void Se(),
                      children: D ? '団員が上限です' : '作成する',
                    }),
                    M ? u.jsx('p', { className: se.notice, children: M }) : null,
                  ],
                }),
                u.jsxs('section', {
                  className: se.list,
                  children: [
                    u.jsxs('h2', {
                      className: se.sectionTitle,
                      children: [
                        '団員一覧',
                        ' ',
                        u.jsxs('span', {
                          className: se.count,
                          children: ['（出撃 ', Lh(i), ' / ', oh, '）'],
                        }),
                      ],
                    }),
                    u.jsxs('div', {
                      className: se.filters,
                      children: [
                        u.jsxs('select', {
                          className: se.filter,
                          value: j,
                          onChange: (L) => V(L.target.value),
                          children: [
                            u.jsx('option', { value: 'all', children: '種族: すべて' }),
                            R.map((L) => u.jsx('option', { value: L, children: Pe[L].name }, L)),
                          ],
                        }),
                        u.jsxs('select', {
                          className: se.filter,
                          value: $,
                          onChange: (L) => te(L.target.value),
                          children: [
                            u.jsx('option', { value: 'all', children: '職業: すべて' }),
                            ee.map((L) => u.jsx('option', { value: L, children: ze[L].name }, L)),
                          ],
                        }),
                        u.jsx('select', {
                          className: se.filter,
                          value: K,
                          onChange: (L) => S(L.target.value),
                          children: Object.keys(qh).map((L) =>
                            u.jsx('option', { value: L, children: qh[L] }, L)
                          ),
                        }),
                      ],
                    }),
                    ie.length === 0
                      ? u.jsx('p', { className: se.empty, children: 'まだ冒険者がいません。' })
                      : ke.length === 0
                        ? u.jsx('p', {
                            className: se.empty,
                            children: '条件に合う団員がいません。',
                          })
                        : u.jsx('ul', {
                            className: se.members,
                            children: ke.map((L) => {
                              const J = Ih(i, L.id);
                              return u.jsx(
                                'li',
                                {
                                  className: se.member,
                                  children: u.jsxs('button', {
                                    type: 'button',
                                    className: se.memberMain,
                                    onClick: () => l(`/guild/char/${L.id}`),
                                    children: [
                                      u.jsxs('span', {
                                        className: se.memberName,
                                        children: [
                                          L.name,
                                          u.jsx('span', {
                                            className: `${se.pos} ${se[`pos_${J}`] ?? ''}`,
                                            children: J,
                                          }),
                                        ],
                                      }),
                                      u.jsxs('span', {
                                        className: se.memberSub,
                                        children: [de(L), ' ›'],
                                      }),
                                    ],
                                  }),
                                },
                                L.id
                              );
                            }),
                          }),
                  ],
                }),
              ],
            })
          : null,
        _ === 'party'
          ? u.jsxs('section', {
              className: se.list,
              children: [
                u.jsxs('h2', {
                  className: se.sectionTitle,
                  children: [
                    'パーティー編成',
                    ' ',
                    u.jsxs('span', {
                      className: se.count,
                      children: ['（出撃 ', Lh(i), ' / ', oh, '）'],
                    }),
                  ],
                }),
                u.jsx('p', {
                  className: se.hint,
                  children: '枠をタップして編成する団員を選びます。',
                }),
                u.jsxs('div', {
                  className: se.slotGroup,
                  children: [
                    u.jsx('div', { className: se.slotGroupLabel, children: '前衛' }),
                    Array.from({ length: bs }).map((L, J) => {
                      const le = pe('front', J),
                        ue = le ? ie.find((ye) => ye.id === le) : null;
                      return u.jsx(
                        'button',
                        {
                          type: 'button',
                          className: `${se.slot} ${ue ? se.slotFilled : se.slotEmpty}`,
                          onClick: () => {
                            (s('cursor'), X({ row: 'front', idx: J }));
                          },
                          children: ue
                            ? u.jsxs(u.Fragment, {
                                children: [
                                  u.jsx('span', { className: se.slotName, children: ue.name }),
                                  u.jsx('span', { className: se.slotSub, children: de(ue) }),
                                ],
                              })
                            : u.jsxs('span', {
                                className: se.slotPlaceholder,
                                children: ['＋ 前衛', J + 1, '（空き）'],
                              }),
                        },
                        `front_${J}`
                      );
                    }),
                  ],
                }),
                u.jsxs('div', {
                  className: se.slotGroup,
                  children: [
                    u.jsx('div', {
                      className: se.slotGroupLabel,
                      children: '後衛（近接ダメージ -30%）',
                    }),
                    Array.from({ length: xs }).map((L, J) => {
                      const le = pe('back', J),
                        ue = le ? ie.find((ye) => ye.id === le) : null;
                      return u.jsx(
                        'button',
                        {
                          type: 'button',
                          className: `${se.slot} ${ue ? se.slotFilled : se.slotEmpty}`,
                          onClick: () => {
                            (s('cursor'), X({ row: 'back', idx: J }));
                          },
                          children: ue
                            ? u.jsxs(u.Fragment, {
                                children: [
                                  u.jsx('span', { className: se.slotName, children: ue.name }),
                                  u.jsx('span', { className: se.slotSub, children: de(ue) }),
                                ],
                              })
                            : u.jsxs('span', {
                                className: se.slotPlaceholder,
                                children: ['＋ 後衛', J + 1, '（空き）'],
                              }),
                        },
                        `back_${J}`
                      );
                    }),
                  ],
                }),
              ],
            })
          : null,
        _ === 'banish'
          ? u.jsxs('section', {
              className: se.list,
              children: [
                u.jsx('h2', { className: se.sectionTitle, children: '団員追放' }),
                u.jsx('p', { className: se.hint, children: '追放した団員は元に戻せません。' }),
                ie.length === 0
                  ? u.jsx('p', { className: se.empty, children: '追放できる団員がいません。' })
                  : u.jsx('ul', {
                      className: se.members,
                      children: ie.map((L) =>
                        u.jsxs(
                          'li',
                          {
                            className: se.member,
                            children: [
                              u.jsxs('div', {
                                className: se.memberMain,
                                children: [
                                  u.jsx('span', { className: se.memberName, children: L.name }),
                                  u.jsx('span', { className: se.memberSub, children: de(L) }),
                                ],
                              }),
                              u.jsx('button', {
                                type: 'button',
                                className: se.banishBtn,
                                onClick: () => Z(L.id),
                                children: '追放',
                              }),
                            ],
                          },
                          L.id
                        )
                      ),
                    }),
              ],
            })
          : null,
        u.jsx('footer', {
          className: se.foot,
          children: u.jsx('button', {
            type: 'button',
            className: se.sub,
            onClick: () => l('/town'),
            children: '拠点へ戻る',
          }),
        }),
        q
          ? u.jsx('div', {
              className: se.overlay,
              onClick: () => X(null),
              children: u.jsxs('div', {
                className: se.panel,
                onClick: (L) => L.stopPropagation(),
                children: [
                  u.jsxs('div', {
                    className: se.panelTitle,
                    children: [q.row === 'front' ? '前衛' : '後衛', q.idx + 1, ' に編成する団員'],
                  }),
                  pe(q.row, q.idx)
                    ? u.jsx('button', {
                        type: 'button',
                        className: se.removeRow,
                        onClick: () => void r((L) => Bh(L, q.row, q.idx, null)).then(() => X(null)),
                        children: 'この枠を空ける（編成から外す）',
                      })
                    : null,
                  ie.length === 0
                    ? u.jsx('p', { className: se.empty, children: '団員がいません。' })
                    : u.jsx('ul', {
                        className: se.pickerList,
                        children: ie.map((L) => {
                          const J = Ih(i, L.id),
                            le = pe(q.row, q.idx) === L.id;
                          return u.jsx(
                            'li',
                            {
                              children: u.jsxs('button', {
                                type: 'button',
                                className: `${se.pickerItem} ${le ? se.pickerItemActive : ''}`,
                                onClick: () =>
                                  void r((ue) => Bh(ue, q.row, q.idx, L.id)).then(() => X(null)),
                                children: [
                                  u.jsxs('span', {
                                    className: se.memberName,
                                    children: [
                                      L.name,
                                      u.jsx('span', {
                                        className: `${se.pos} ${se[`pos_${J}`] ?? ''}`,
                                        children: J,
                                      }),
                                    ],
                                  }),
                                  u.jsx('span', { className: se.memberSub, children: de(L) }),
                                ],
                              }),
                            },
                            L.id
                          );
                        }),
                      }),
                  u.jsx('button', {
                    type: 'button',
                    className: se.panelClose,
                    onClick: () => X(null),
                    children: 'とじる',
                  }),
                ],
              }),
            })
          : null,
        oe
          ? u.jsx('div', {
              className: se.overlay,
              onClick: () => Z(null),
              children: u.jsxs('div', {
                className: se.confirmBox,
                onClick: (L) => L.stopPropagation(),
                children: [
                  u.jsxs('div', {
                    className: se.confirmText,
                    children: [
                      'Lv',
                      oe.level,
                      ' ',
                      oe.name,
                      '（',
                      (y = Pe[oe.raceId]) == null ? void 0 : y.name,
                      ' ',
                      (B = ze[oe.classId]) == null ? void 0 : B.name,
                      '）を追放します。よろしいですか？',
                    ],
                  }),
                  u.jsxs('div', {
                    className: se.confirmActions,
                    children: [
                      u.jsx('button', {
                        type: 'button',
                        className: se.confirmCancel,
                        onClick: () => Z(null),
                        children: 'いいえ',
                      }),
                      u.jsx('button', {
                        type: 'button',
                        className: se.confirmOk,
                        onClick: () => {
                          s('cancel');
                          const L = oe.id;
                          (r((J) => U2(J, L)), Z(null));
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
  nT = '_layout_dwk01_1',
  iT = '_head_dwk01_12',
  sT = '_title_dwk01_16',
  rT = '_sub_dwk01_22',
  oT = '_card_dwk01_27',
  cT = '_h2_dwk01_35',
  uT = '_sp_dwk01_44',
  dT = '_stats_dwk01_50',
  mT = '_equipSlot_dwk01_74',
  _T = '_equipHead_dwk01_82',
  fT = '_slotLabel_dwk01_88',
  pT = '_equipName_dwk01_95',
  hT = '_smallBtn_dwk01_100',
  gT = '_equipPick_dwk01_110',
  kT = '_pickBtn_dwk01_118',
  vT = '_jobRow_dwk01_185',
  yT = '_select_dwk01_192',
  bT = '_input_dwk01_193',
  xT = '_actBtn_dwk01_203',
  ST = '_warn_dwk01_220',
  wT = '_titleHave_dwk01_227',
  TT = '_titleOpts_dwk01_233',
  NT = '_titleBtn_dwk01_240',
  jT = '_rbForm_dwk01_252',
  ET = '_danger_dwk01_258',
  CT = '_foot_dwk01_270',
  AT = '_back_dwk01_274',
  LT = '_resistBlock_dwk01_284',
  BT = '_resistRow_dwk01_290',
  qT = '_resistLabel_dwk01_296',
  IT = '_skillTabs_dwk01_302',
  OT = '_skillTab_dwk01_302',
  MT = '_skillTabOn_dwk01_322',
  ge = {
    layout: nT,
    head: iT,
    title: sT,
    sub: rT,
    card: oT,
    h2: cT,
    sp: uT,
    stats: dT,
    equipSlot: mT,
    equipHead: _T,
    slotLabel: fT,
    equipName: pT,
    smallBtn: hT,
    equipPick: gT,
    pickBtn: kT,
    jobRow: vT,
    select: yT,
    input: bT,
    actBtn: xT,
    warn: ST,
    titleHave: wT,
    titleOpts: TT,
    titleBtn: NT,
    rbForm: jT,
    danger: ET,
    foot: CT,
    back: AT,
    resistBlock: LT,
    resistRow: BT,
    resistLabel: qT,
    skillTabs: IT,
    skillTab: OT,
    skillTabOn: MT,
  },
  lk = ['weapon', 'armor', 'accessory'];
function ak(l, i, r) {
  return { ...l, guild: { ...l.guild, members: l.guild.members.map((s) => (s.id === i ? r : s)) } };
}
function RT(l) {
  var i, r;
  return (r = (i = ze[l]) == null ? void 0 : i.skillTree.skills[0]) == null ? void 0 : r.skillId;
}
function DT(l) {
  var i;
  return new Set(
    (((i = Pe[l]) == null ? void 0 : i.raceSkillTree.skills) ?? []).map((r) => r.skillId)
  );
}
const zT = (l, i) => {
  const r = { ...l };
  let s = 0;
  for (const [d, m] of Object.entries(i)) s += ni(r, d) * m;
  return s;
};
function HT(l, i) {
  if (!ze[i]) return l;
  const r = DT(l.raceId);
  let s = {};
  for (const [g, b] of Object.entries(l.learnedSkills)) r.has(g) && (s[g] = b);
  const d = RT(i);
  d && !s[d] && (s[d] = 1);
  const m = Math.max(1, l.level - ig),
    _ = Fr(m),
    p = { ...l, classId: i, titleId: null, learnedSkills: s };
  let h = zT(p, s) - (d && s[d] ? ni(p, d) : 0);
  return (
    h > _ && ((s = d ? { [d]: 1 } : {}), (h = 0)),
    {
      ...l,
      classId: i,
      titleId: null,
      level: m,
      exp: 0,
      learnedSkills: s,
      skillPoints: { total: _, spent: h },
    }
  );
}
function UT(l, i, r) {
  const s = l.guild.members.find((_) => _.id === i);
  if (!s) return l;
  let d = ak(l, i, HT(s, r));
  const m = d.guild.members.find((_) => _.id === i);
  for (const _ of lk) {
    const p = m.equipment[_];
    p && !Bd(m, p.masterId) && (d = qd(d, i, _));
  }
  return d;
}
const $T = [
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
function GT(l) {
  const i = $T.find((r) => l >= r.min && l <= r.max);
  return i ? { allStats: i.allStats, bonusSp: i.bonusSp } : null;
}
function nk(l) {
  return l.level >= is.REBIRTH_MIN_LEVEL;
}
function YT(l, i) {
  const r = GT(l.level);
  if (!r) return l;
  const s = Math.min(30, Math.floor(l.level / 2)),
    d = Mg({ ...i, id: l.id }),
    m = Fr(s) + r.bonusSp;
  return {
    ...d,
    level: Math.max(1, s),
    exp: 0,
    rebirthBonus: r,
    skillPoints: { total: m, spent: d.skillPoints.spent },
  };
}
function VT(l, i, r) {
  const s = l.guild.members.find((_) => _.id === i);
  if (!s || !nk(s)) return l;
  let d = l;
  for (const _ of lk) s.equipment[_] && (d = qd(d, i, _));
  const m = d.guild.members.find((_) => _.id === i);
  return ak(d, i, YT(m, r));
}
function ik(l, i, r) {
  var d;
  return r < is.TITLE_DEPTH || l.titleId
    ? !1
    : (((d = ze[l.classId]) == null ? void 0 : d.titleOptions) ?? []).includes(i);
}
function XT(l, i, r) {
  return ik(l, i, r)
    ? { ...l, titleId: i, skillPoints: { ...l.skillPoints, total: l.skillPoints.total + vx } }
    : l;
}
const Oh = Object.keys(Pe),
  Vr = Object.keys(ze),
  QT = ['weapon', 'armor', 'accessory'],
  KT = { weapon: '武器', armor: '防具', accessory: '装飾' },
  ZT = [
    { key: 'hp', label: 'HP' },
    { key: 'tp', label: 'TP' },
    { key: 'str', label: 'STR' },
    { key: 'vit', label: 'VIT' },
    { key: 'agi', label: 'AGI' },
    { key: 'int', label: 'INT' },
    { key: 'mnd', label: 'MND' },
    { key: 'luc', label: 'LUC' },
  ],
  JT = () => {
    var S, q, X, ne, Z, ie, ke, Se, D, R, ee, oe, pe, de;
    const l = xl(),
      { id: i } = h0(),
      { save: r, applyAndPersist: s } = ta(),
      d = El(),
      [m, _] = x.useState('class'),
      [p, h] = x.useState(Vr[0]),
      [g, b] = x.useState(''),
      [k, A] = x.useState(Oh[0]),
      [C, z] = x.useState(Vr[0]),
      [I, M] = x.useState(!1);
    if (!r) return u.jsx(yl, { to: '/title', replace: !0 });
    const w = r.guild.members.find((y) => y.id === i);
    if (!w || !i) return u.jsx(yl, { to: '/guild', replace: !0 });
    const j = Fl(w),
      V = us(w),
      $ = r.towerState.record.deepestReached,
      te = (y) =>
        s((B) => ({
          ...B,
          guild: { ...B.guild, members: B.guild.members.map((L) => (L.id === i ? y(L) : L)) },
        }));
    return u.jsxs('div', {
      className: ge.layout,
      children: [
        u.jsxs('header', {
          className: ge.head,
          children: [
            u.jsx('h1', { className: ge.title, children: w.name }),
            u.jsxs('span', {
              className: ge.sub,
              children: [
                (S = Pe[w.raceId]) == null ? void 0 : S.name,
                ' / ',
                (q = ze[w.classId]) == null ? void 0 : q.name,
                ' / Lv',
                w.level,
              ],
            }),
          ],
        }),
        u.jsxs('section', {
          className: ge.card,
          children: [
            u.jsx('h2', { className: ge.h2, children: 'ステータス' }),
            u.jsx('dl', {
              className: ge.stats,
              children: ZT.map((y) =>
                u.jsxs(
                  'div',
                  {
                    children: [
                      u.jsx('dt', { children: y.label }),
                      u.jsx('dd', { children: j[y.key] }),
                    ],
                  },
                  y.key
                )
              ),
            }),
          ],
        }),
        ((X = Pe[w.raceId]) != null && X.elementResist) ||
        ((ne = Pe[w.raceId]) != null && ne.ailmentResist)
          ? u.jsxs('section', {
              className: ge.card,
              children: [
                u.jsx('h2', { className: ge.h2, children: '種族耐性' }),
                u.jsxs('div', {
                  className: ge.resistBlock,
                  children: [
                    u.jsxs('div', {
                      className: ge.resistRow,
                      children: [
                        u.jsx('span', { className: ge.resistLabel, children: '属性' }),
                        u.jsx(Pn, {
                          elementResist: (Z = Pe[w.raceId]) == null ? void 0 : Z.elementResist,
                          ailmentResist: void 0,
                        }),
                      ],
                    }),
                    u.jsxs('div', {
                      className: ge.resistRow,
                      children: [
                        u.jsx('span', { className: ge.resistLabel, children: '状態異常' }),
                        u.jsx(Pn, {
                          elementResist: void 0,
                          ailmentResist: (ie = Pe[w.raceId]) == null ? void 0 : ie.ailmentResist,
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            })
          : u.jsxs('section', {
              className: ge.card,
              children: [
                u.jsx('h2', { className: ge.h2, children: '種族耐性' }),
                u.jsx('p', { className: ge.warn, children: 'この種族は特別な耐性を持ちません。' }),
              ],
            }),
        u.jsxs('section', {
          className: ge.card,
          children: [
            u.jsx('h2', { className: ge.h2, children: '装備' }),
            QT.map((y) => {
              const B = w.equipment[y],
                L = r.guild.equipment.filter((J) => {
                  var le;
                  return (
                    ((le = et[J.masterId]) == null ? void 0 : le.slot) === y && Bd(w, J.masterId)
                  );
                });
              return u.jsxs(
                'div',
                {
                  className: ge.equipSlot,
                  children: [
                    u.jsxs('div', {
                      className: ge.equipHead,
                      children: [
                        u.jsx('span', { className: ge.slotLabel, children: KT[y] }),
                        u.jsx('span', {
                          className: ge.equipName,
                          children: B ? Ca(B) : '（なし）',
                        }),
                        B
                          ? u.jsx('button', {
                              type: 'button',
                              className: ge.smallBtn,
                              onClick: () => void K(y),
                              children: '外す',
                            })
                          : null,
                      ],
                    }),
                    L.length > 0
                      ? u.jsx('div', {
                          className: ge.equipPick,
                          children: L.map((J) =>
                            u.jsxs(
                              'button',
                              {
                                type: 'button',
                                className: ge.pickBtn,
                                onClick: () => void s((le) => Mx(le, i, J.id)),
                                children: [Ca(J), ' 装備'],
                              },
                              J.id
                            )
                          ),
                        })
                      : null,
                  ],
                },
                y
              );
            }),
          ],
        }),
        u.jsxs('section', {
          className: ge.card,
          children: [
            u.jsxs('h2', {
              className: ge.h2,
              children: ['スキル ', u.jsxs('span', { className: ge.sp, children: ['SP ', V] })],
            }),
            u.jsxs('div', {
              className: ge.skillTabs,
              children: [
                u.jsxs('button', {
                  type: 'button',
                  className: `${ge.skillTab} ${m === 'class' ? ge.skillTabOn : ''}`,
                  onClick: () => _('class'),
                  children: [
                    '職業（',
                    ((ke = ze[w.classId]) == null ? void 0 : ke.name) ?? '',
                    '）',
                  ],
                }),
                u.jsxs('button', {
                  type: 'button',
                  className: `${ge.skillTab} ${m === 'race' ? ge.skillTabOn : ''}`,
                  onClick: () => _('race'),
                  children: [
                    '種族（',
                    ((Se = Pe[w.raceId]) == null ? void 0 : Se.name) ?? '',
                    '）',
                  ],
                }),
                w.titleId
                  ? u.jsxs('button', {
                      type: 'button',
                      className: `${ge.skillTab} ${m === 'title' ? ge.skillTabOn : ''}`,
                      onClick: () => _('title'),
                      children: [
                        '称号（',
                        ((D = Jl[w.titleId]) == null ? void 0 : D.name) ?? '',
                        '）',
                      ],
                    })
                  : null,
              ],
            }),
            u.jsx(Vg, {
              nodes:
                m === 'class'
                  ? (((R = ze[w.classId]) == null ? void 0 : R.skillTree.skills) ?? [])
                  : m === 'race'
                    ? (((ee = Pe[w.raceId]) == null ? void 0 : ee.raceSkillTree.skills) ?? [])
                    : w.titleId
                      ? (((oe = Jl[w.titleId]) == null ? void 0 : oe.skillTree.skills) ?? [])
                      : [],
              char: w,
              onLearn: (y) => {
                (d('create'), te((B) => xg(B, y)));
              },
            }),
          ],
        }),
        u.jsxs('section', {
          className: ge.card,
          children: [
            u.jsx('h2', { className: ge.h2, children: '転職' }),
            u.jsxs('div', {
              className: ge.jobRow,
              children: [
                u.jsx('select', {
                  className: ge.select,
                  value: p,
                  onChange: (y) => h(y.target.value),
                  children: Vr.map((y) => u.jsx('option', { value: y, children: ze[y].name }, y)),
                }),
                u.jsx('button', {
                  type: 'button',
                  className: ge.actBtn,
                  disabled: p === w.classId,
                  onClick: () => {
                    (d('decide'), s((y) => UT(y, i, p)));
                  },
                  children: '転職する',
                }),
              ],
            }),
            u.jsxs('p', {
              className: ge.warn,
              children: [
                '※ レベルが ',
                ig,
                ' ',
                '下がり、職業/称号スキルは振り直しになります（種族スキルは保持）。',
              ],
            }),
            u.jsx('h2', { className: ge.h2, children: '称号' }),
            w.titleId
              ? u.jsxs('p', {
                  className: ge.titleHave,
                  children: ['習得済み: ', (pe = Jl[w.titleId]) == null ? void 0 : pe.name],
                })
              : $ < is.TITLE_DEPTH
                ? u.jsxs('p', {
                    className: ge.warn,
                    children: ['第 ', is.TITLE_DEPTH, ' 階到達で習得できます（現在 ', $, 'F）。'],
                  })
                : u.jsx('div', {
                    className: ge.titleOpts,
                    children: (((de = ze[w.classId]) == null ? void 0 : de.titleOptions) ?? []).map(
                      (y) => {
                        var B;
                        return u.jsxs(
                          'button',
                          {
                            type: 'button',
                            className: ge.titleBtn,
                            disabled: !ik(w, y, $),
                            onClick: () => void te((L) => XT(L, y, $)),
                            children: [(B = Jl[y]) == null ? void 0 : B.name, '（SP+5）'],
                          },
                          y
                        );
                      }
                    ),
                  }),
            u.jsx('h2', { className: ge.h2, children: '転生' }),
            nk(w)
              ? I
                ? u.jsxs('div', {
                    className: ge.rbForm,
                    children: [
                      u.jsxs('p', {
                        className: ge.warn,
                        children: [
                          '※ 作り直して強い新人になります（開始Lv ',
                          Math.min(30, Math.floor(w.level / 2)),
                          '・ボーナス付き）。',
                        ],
                      }),
                      u.jsx('input', {
                        className: ge.input,
                        type: 'text',
                        maxLength: 16,
                        placeholder: w.name,
                        value: g,
                        onChange: (y) => b(y.target.value),
                      }),
                      u.jsxs('div', {
                        className: ge.jobRow,
                        children: [
                          u.jsx('select', {
                            className: ge.select,
                            value: k,
                            onChange: (y) => A(y.target.value),
                            children: Oh.map((y) =>
                              u.jsx('option', { value: y, children: Pe[y].name }, y)
                            ),
                          }),
                          u.jsx('select', {
                            className: ge.select,
                            value: C,
                            onChange: (y) => z(y.target.value),
                            children: Vr.map((y) =>
                              u.jsx('option', { value: y, children: ze[y].name }, y)
                            ),
                          }),
                        ],
                      }),
                      u.jsxs('div', {
                        className: ge.jobRow,
                        children: [
                          u.jsx('button', {
                            type: 'button',
                            className: ge.danger,
                            onClick: () => {
                              (d('create'),
                                s((y) =>
                                  VT(y, i, { raceId: k, classId: C, name: g.trim() || w.name })
                                ),
                                M(!1));
                            },
                            children: '転生を実行',
                          }),
                          u.jsx('button', {
                            type: 'button',
                            className: ge.actBtn,
                            onClick: () => M(!1),
                            children: 'やめる',
                          }),
                        ],
                      }),
                    ],
                  })
                : u.jsx('button', {
                    type: 'button',
                    className: ge.actBtn,
                    onClick: () => M(!0),
                    children: '転生する…',
                  })
              : u.jsxs('p', {
                  className: ge.warn,
                  children: [
                    'Lv',
                    is.REBIRTH_MIN_LEVEL,
                    ' 以上で転生できます（現在 Lv',
                    w.level,
                    '）。',
                  ],
                }),
          ],
        }),
        u.jsx('footer', {
          className: ge.foot,
          children: u.jsx('button', {
            type: 'button',
            className: ge.back,
            onClick: () => l('/guild'),
            children: 'もどる',
          }),
        }),
      ],
    });
    function K(y) {
      return s((B) => qd(B, i, y));
    }
  },
  PT = () => u.jsx('div', { children: u.jsx('h1', { children: 'Not Found' }) }),
  FT = '_layout_1ktxr_1',
  WT = '_head_1ktxr_11',
  eN = '_title_1ktxr_18',
  tN = '_gold_1ktxr_24',
  lN = '_tabs_1ktxr_29',
  aN = '_tab_1ktxr_29',
  nN = '_tabActive_1ktxr_46',
  iN = '_controls_1ktxr_51',
  sN = '_filters_1ktxr_58',
  rN = '_chip_1ktxr_64',
  oN = '_chipActive_1ktxr_75',
  cN = '_sortRow_1ktxr_81',
  uN = '_sortLabel_1ktxr_87',
  dN = '_sort_1ktxr_81',
  mN = '_list_1ktxr_105',
  _N = '_row_1ktxr_113',
  fN = '_info_1ktxr_124',
  pN = '_name_1ktxr_130',
  hN = '_note_1ktxr_135',
  gN = '_action_1ktxr_140',
  kN = '_empty_1ktxr_157',
  vN = '_foot_1ktxr_162',
  yN = '_back_1ktxr_166',
  bN = '_confirmOverlay_1ktxr_176',
  xN = '_confirmBox_1ktxr_187',
  SN = '_confirmText_1ktxr_199',
  wN = '_confirmActions_1ktxr_206',
  TN = '_confirmCancel_1ktxr_211',
  NN = '_confirmOk_1ktxr_212',
  jN = '_stepperRow_1ktxr_233',
  EN = '_stepperBtn_1ktxr_240',
  CN = '_stepperVal_1ktxr_255',
  AN = '_stepperMax_1ktxr_262',
  LN = '_totalRow_1ktxr_278',
  BN = '_nameBtn_1ktxr_284',
  qN = '_detailHeader_1ktxr_297',
  IN = '_detailName_1ktxr_304',
  ON = '_detailSlot_1ktxr_309',
  MN = '_detailRow_1ktxr_317',
  RN = '_detailLabel_1ktxr_324',
  _e = {
    layout: FT,
    head: WT,
    title: eN,
    gold: tN,
    tabs: lN,
    tab: aN,
    tabActive: nN,
    controls: iN,
    filters: sN,
    chip: rN,
    chipActive: oN,
    sortRow: cN,
    sortLabel: uN,
    sort: dN,
    list: mN,
    row: _N,
    info: fN,
    name: pN,
    note: hN,
    action: gN,
    empty: kN,
    foot: vN,
    back: yN,
    confirmOverlay: bN,
    confirmBox: xN,
    confirmText: SN,
    confirmActions: wN,
    confirmCancel: TN,
    confirmOk: NN,
    stepperRow: jN,
    stepperBtn: EN,
    stepperVal: CN,
    stepperMax: AN,
    totalRow: LN,
    nameBtn: BN,
    detailHeader: qN,
    detailName: IN,
    detailSlot: ON,
    detailRow: MN,
    detailLabel: RN,
  };
function DN(l) {
  return Math.max(0, Math.floor(l.towerState.record.deepestReached / 10));
}
const sk = {
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
  zN = (l, i = 1) => {
    const r = jd(l, i),
      s = [];
    return (
      r.atk && s.push(`ATK+${r.atk}`),
      r.mat && s.push(`MAT+${r.mat}`),
      r.def && s.push(`DEF+${r.def}`),
      r.mdf && s.push(`MDF+${r.mdf}`),
      s.join(' ')
    );
  };
function Yd(l, i) {
  var r;
  return ((r = l.shopStock.unlockedGrades) == null ? void 0 : r[i]) ?? 1;
}
function HN(l) {
  const i = DN(l),
    r = new Set(l.shopStock.unlockedItemIds),
    s = Object.values(at)
      .filter((m) => m.buyPrice > 0)
      .map((m) => ({ id: m.id, name: m.name, price: m.buyPrice, kind: 'item' }));
  return [
    ...Object.values(et)
      .filter((m) => m.tier <= i || r.has(m.id))
      .map((m) => {
        const _ = Yd(l, m.id);
        return {
          id: m.id,
          name: _ > 1 ? `${m.name} Lv${_}` : m.name,
          price: Math.round(m.buyPrice * Fn(_)),
          kind: 'equip',
          note: zN(m.id, _),
        };
      }),
    ...s,
  ];
}
function UN(l) {
  return sk[l] ?? [];
}
function $N(l, i = 1) {
  return at[l] ? at[l].buyPrice : et[l] ? Math.round(et[l].buyPrice * Fn(i)) : null;
}
function fd(l, i = 1) {
  return at[l]
    ? Math.round(dx(at[l]) * Fn(i))
    : et[l]
      ? Math.floor((et[l].buyPrice * Fn(i)) / 2)
      : 0;
}
function rk(l) {
  var r;
  const i = (((r = et[l.masterId]) == null ? void 0 : r.buyPrice) ?? 0) * Fn(l.grade);
  return Math.floor(i / 2) + l.forgeLevel * 10;
}
function GN(l, i) {
  const r = l.guild.equipment.find((m) => m.id === i);
  if (!r) return l;
  const s = rk(r),
    d = l.guild.equipment.filter((m) => m.id !== i);
  return { ...l, guild: { ...l.guild, equipment: d, gold: l.guild.gold + s } };
}
function YN(l, i, r) {
  const s = et[i] ? Yd(l, i) : 1,
    d = $N(i, s);
  if (d === null || d <= 0 || r <= 0) return l;
  const m = Math.floor(l.guild.gold / d),
    _ = Math.min(r, m);
  if (_ <= 0) return l;
  const p = d * _;
  let h = l;
  if (et[i]) for (let g = 0; g < _; g++) h = Ox(h, i, 0, s);
  else h = Cd(h, i, _);
  return { ...h, guild: { ...h.guild, gold: h.guild.gold - p } };
}
function VN(l, i, r = 1, s = 1) {
  if (
    l.guild.storage
      .filter((b) => b.itemId === i && (b.grade ?? 1) === s)
      .reduce((b, k) => b + k.qty, 0) < r
  )
    return l;
  const m = fd(i, s) * r,
    _ = Ad(l, i, r, s),
    p = UN(i),
    h = [
      ..._.shopStock.unlockedItemIds,
      ...p.filter((b) => !_.shopStock.unlockedItemIds.includes(b)),
    ],
    g = { ...(_.shopStock.unlockedGrades ?? {}) };
  for (const b of p) g[b] = Math.max(g[b] ?? 1, s);
  return {
    ..._,
    guild: { ..._.guild, gold: _.guild.gold + m },
    shopStock: { ..._.shopStock, unlockedItemIds: h, unlockedGrades: g },
  };
}
function XN(l) {
  const i = et[l];
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
const Mh = {
    weapon: '武器',
    armor: '防具',
    accessory: '装飾品',
    item: 'アイテム',
    material: '素材',
  },
  QN = ['weapon', 'armor', 'accessory', 'item', 'material'],
  Rh = { priceDesc: '金額が高い順', priceAsc: '金額が安い順', qtyDesc: '所持数が多い順' },
  Dh = (l) => {
    var r;
    const i = (r = at[l]) == null ? void 0 : r.category;
    return i === 'material' || i === 'drop' ? 'material' : 'item';
  },
  KN = () => {
    const l = xl(),
      { save: i, applyAndPersist: r } = ta(),
      s = El(),
      [d, m] = x.useState('buy'),
      [_, p] = x.useState(null),
      [h, g] = x.useState(1),
      [b, k] = x.useState('all'),
      [A, C] = x.useState('priceAsc'),
      [z, I] = x.useState(null);
    if (!i) return u.jsx(yl, { to: '/title', replace: !0 });
    const M = i.guild.gold,
      w = (D, R = 1) => {
        var oe, pe;
        const ee =
          ((oe = at[D]) == null ? void 0 : oe.name) ??
          ((pe = et[D]) == null ? void 0 : pe.name) ??
          D;
        return R > 1 ? `${ee} Lv${R}` : ee;
      },
      j = HN(i).map((D) => {
        var R;
        return {
          key: D.id,
          entry: D,
          category:
            D.kind === 'equip' ? (((R = et[D.id]) == null ? void 0 : R.slot) ?? 'item') : Dh(D.id),
          price: D.price,
          qty:
            D.kind === 'equip'
              ? i.guild.equipment.filter((ee) => ee.masterId === D.id).length
              : Ed(i, D.id),
        };
      }),
      V = [
        ...i.guild.equipment.map((D) => {
          var R;
          return {
            key: `eq_${D.id}`,
            kind: 'equip',
            inst: D,
            name: Ca(D),
            price: rk(D),
            category: ((R = et[D.masterId]) == null ? void 0 : R.slot) ?? 'item',
            qty: 1,
          };
        }),
        ...i.guild.storage
          .filter((D) => fd(D.itemId, D.grade ?? 1) > 0)
          .map((D) => ({
            key: `it_${D.itemId}_${D.grade ?? 1}`,
            kind: 'item',
            itemId: D.itemId,
            grade: D.grade ?? 1,
            name: w(D.itemId, D.grade ?? 1),
            price: fd(D.itemId, D.grade ?? 1),
            category: Dh(D.itemId),
            qty: D.qty,
          })),
      ],
      $ = d === 'buy' ? j : V,
      te = QN.filter((D) => $.some((R) => R.category === D)),
      K = b !== 'all' && !te.includes(b) ? 'all' : b;
    function S(D) {
      return [...(K === 'all' ? D : D.filter((ee) => ee.category === K))].sort((ee, oe) =>
        A === 'priceAsc'
          ? ee.price - oe.price
          : A === 'qtyDesc'
            ? oe.qty - ee.qty
            : oe.price - ee.price
      );
    }
    const q = (D) => {
        (s('cursor'), m(D), k('all'));
      },
      X = (D) => {
        (p(D), g(1));
      },
      ne = () => {
        _ &&
          (s('coin'),
          _.kind === 'buy'
            ? r((D) => YN(D, _.id, h))
            : _.kind === 'sellItem'
              ? r((D) => VN(D, _.itemId, h, _.grade))
              : r((D) => GN(D, _.id)),
          p(null));
      },
      Z = S(j),
      ie = S(V),
      ke =
        _ && _.kind !== 'sellEquip'
          ? _.kind === 'buy'
            ? Math.max(1, Math.floor(M / _.price))
            : _.maxQty
          : 1,
      Se = () => {
        if (!z) return null;
        const D = et[z.masterId];
        if (!D) return null;
        const R = z.grade ?? Yd(i, z.masterId),
          ee = jd(z.masterId, R),
          oe = O4[D.slot],
          pe = XN(z.masterId),
          de = [];
        if (
          (ee.atk && de.push(`ATK+${ee.atk}`),
          ee.mat && de.push(`MAT+${ee.mat}`),
          ee.def && de.push(`DEF+${ee.def}`),
          ee.mdf && de.push(`MDF+${ee.mdf}`),
          ee.statMods)
        ) {
          const y = {
            hp: 'HP',
            tp: 'TP',
            str: 'STR',
            vit: 'VIT',
            agi: 'AGI',
            int: 'INT',
            mnd: 'MND',
            luc: 'LUC',
          };
          for (const [B, L] of Object.entries(ee.statMods))
            L && de.push(`${y[B] ?? B}${L >= 0 ? '+' : ''}${L}`);
        }
        return u.jsx('div', {
          className: _e.confirmOverlay,
          onClick: () => I(null),
          children: u.jsxs('div', {
            className: _e.confirmBox,
            onClick: (y) => y.stopPropagation(),
            children: [
              u.jsxs('div', {
                className: _e.detailHeader,
                children: [
                  u.jsx('span', { className: _e.detailName, children: z.name }),
                  u.jsx('span', { className: _e.detailSlot, children: oe }),
                ],
              }),
              D.slot === 'weapon' &&
                D.weaponType &&
                u.jsxs('div', {
                  className: _e.detailRow,
                  children: [
                    u.jsx('span', { className: _e.detailLabel, children: '武器種' }),
                    u.jsx('span', { children: Zg[D.weaponType] }),
                  ],
                }),
              D.slot === 'armor' &&
                D.armorType &&
                u.jsxs('div', {
                  className: _e.detailRow,
                  children: [
                    u.jsx('span', { className: _e.detailLabel, children: '防具種' }),
                    u.jsx('span', { children: Jg[D.armorType] }),
                  ],
                }),
              de.length > 0 &&
                u.jsxs('div', {
                  className: _e.detailRow,
                  children: [
                    u.jsx('span', { className: _e.detailLabel, children: '性能' }),
                    u.jsx('span', { children: de.join(' / ') }),
                  ],
                }),
              u.jsxs('div', {
                className: _e.detailRow,
                children: [
                  u.jsx('span', { className: _e.detailLabel, children: '装備可能' }),
                  u.jsx('span', { children: D.slot === 'accessory' ? '全職業' : pe.join('・') }),
                ],
              }),
              u.jsxs('div', {
                className: _e.detailRow,
                children: [
                  u.jsx('span', {
                    className: _e.detailLabel,
                    children: z.mode === 'buy' ? '購入価格' : '売却額',
                  }),
                  u.jsxs('span', { children: [z.price, ' G'] }),
                ],
              }),
              u.jsxs('div', {
                className: _e.detailRow,
                children: [
                  u.jsx('span', { className: _e.detailLabel, children: '所持数' }),
                  u.jsx('span', { children: z.ownedQty }),
                ],
              }),
              u.jsx('div', {
                className: _e.confirmActions,
                children: u.jsx('button', {
                  type: 'button',
                  className: _e.confirmCancel,
                  onClick: () => I(null),
                  children: '閉じる',
                }),
              }),
            ],
          }),
        });
      };
    return u.jsxs('div', {
      className: _e.layout,
      children: [
        u.jsxs('header', {
          className: _e.head,
          children: [
            u.jsx('h1', { className: _e.title, children: 'ショップ' }),
            u.jsxs('span', { className: _e.gold, children: [M, ' G'] }),
          ],
        }),
        u.jsxs('div', {
          className: _e.tabs,
          children: [
            u.jsx('button', {
              type: 'button',
              className: `${_e.tab} ${d === 'buy' ? _e.tabActive : ''}`,
              onClick: () => q('buy'),
              children: '買う',
            }),
            u.jsx('button', {
              type: 'button',
              className: `${_e.tab} ${d === 'sell' ? _e.tabActive : ''}`,
              onClick: () => q('sell'),
              children: '売る',
            }),
          ],
        }),
        u.jsxs('div', {
          className: _e.controls,
          children: [
            u.jsxs('div', {
              className: _e.filters,
              children: [
                u.jsx('button', {
                  type: 'button',
                  className: `${_e.chip} ${K === 'all' ? _e.chipActive : ''}`,
                  onClick: () => k('all'),
                  children: 'すべて',
                }),
                te.map((D) =>
                  u.jsx(
                    'button',
                    {
                      type: 'button',
                      className: `${_e.chip} ${K === D ? _e.chipActive : ''}`,
                      onClick: () => k(D),
                      children: Mh[D],
                    },
                    D
                  )
                ),
              ],
            }),
            u.jsxs('label', {
              className: _e.sortRow,
              children: [
                u.jsx('span', { className: _e.sortLabel, children: '並び替え' }),
                u.jsx('select', {
                  className: _e.sort,
                  value: A,
                  onChange: (D) => C(D.target.value),
                  children: Object.keys(Rh).map((D) =>
                    u.jsx('option', { value: D, children: Rh[D] }, D)
                  ),
                }),
              ],
            }),
          ],
        }),
        u.jsx('div', {
          className: _e.list,
          children:
            d === 'buy'
              ? Z.length === 0
                ? u.jsx('p', { className: _e.empty, children: '該当する商品がありません。' })
                : Z.map(({ entry: D, qty: R }) =>
                    u.jsxs(
                      'div',
                      {
                        className: _e.row,
                        children: [
                          u.jsxs('div', {
                            className: _e.info,
                            children: [
                              D.kind === 'equip'
                                ? u.jsx('button', {
                                    type: 'button',
                                    className: _e.nameBtn,
                                    onClick: () =>
                                      I({
                                        masterId: D.id,
                                        name: D.name,
                                        ownedQty: R,
                                        price: D.price,
                                        mode: 'buy',
                                      }),
                                    children: D.name,
                                  })
                                : u.jsx('span', { className: _e.name, children: D.name }),
                              u.jsxs('span', {
                                className: _e.note,
                                children: [D.note ? `${D.note} ・ ` : '', '所持 ', R],
                              }),
                            ],
                          }),
                          u.jsxs('button', {
                            type: 'button',
                            className: _e.action,
                            disabled: M < D.price,
                            onClick: () =>
                              X({ kind: 'buy', id: D.id, name: D.name, price: D.price }),
                            children: [D.price, ' G'],
                          }),
                        ],
                      },
                      D.id
                    )
                  )
              : ie.length === 0
                ? u.jsx('p', { className: _e.empty, children: '売れる物がありません。' })
                : ie.map((D) =>
                    u.jsxs(
                      'div',
                      {
                        className: _e.row,
                        children: [
                          u.jsxs('div', {
                            className: _e.info,
                            children: [
                              D.kind === 'equip'
                                ? u.jsx('button', {
                                    type: 'button',
                                    className: _e.nameBtn,
                                    onClick: () =>
                                      I({
                                        masterId: D.inst.masterId,
                                        name: D.name,
                                        ownedQty: 1,
                                        price: D.price,
                                        mode: 'sell',
                                        grade: D.inst.grade ?? 1,
                                      }),
                                    children: D.name,
                                  })
                                : u.jsx('span', { className: _e.name, children: D.name }),
                              u.jsxs('span', {
                                className: _e.note,
                                children: [
                                  Mh[D.category],
                                  D.kind === 'item' ? ` ・ 所持 ${D.qty}` : '',
                                ],
                              }),
                            ],
                          }),
                          u.jsxs('button', {
                            type: 'button',
                            className: _e.action,
                            onClick: () =>
                              X(
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
        u.jsx('footer', {
          className: _e.foot,
          children: u.jsx('button', {
            type: 'button',
            className: _e.back,
            onClick: () => l('/town'),
            children: '拠点へ戻る',
          }),
        }),
        _
          ? u.jsx('div', {
              className: _e.confirmOverlay,
              onClick: () => p(null),
              children: u.jsxs('div', {
                className: _e.confirmBox,
                onClick: (D) => D.stopPropagation(),
                children: [
                  u.jsx('div', {
                    className: _e.confirmText,
                    children:
                      _.kind === 'buy'
                        ? u.jsxs(u.Fragment, {
                            children: [u.jsx('strong', { children: _.name }), ' を購入しますか？'],
                          })
                        : _.kind === 'sellEquip'
                          ? u.jsxs(u.Fragment, {
                              children: [
                                u.jsx('strong', { children: _.name }),
                                ' を ',
                                _.price,
                                ' G で売却しますか？',
                              ],
                            })
                          : u.jsxs(u.Fragment, {
                              children: [
                                u.jsx('strong', { children: _.name }),
                                ' を売却しますか？',
                              ],
                            }),
                  }),
                  _.kind !== 'sellEquip' &&
                    u.jsxs('div', {
                      className: _e.stepperRow,
                      children: [
                        u.jsx('button', {
                          type: 'button',
                          className: _e.stepperBtn,
                          disabled: h <= 1,
                          onClick: () => g((D) => Math.max(1, D - 1)),
                          children: '−',
                        }),
                        u.jsx('span', { className: _e.stepperVal, children: h }),
                        u.jsx('button', {
                          type: 'button',
                          className: _e.stepperBtn,
                          disabled: h >= ke,
                          onClick: () => g((D) => Math.min(ke, D + 1)),
                          children: '＋',
                        }),
                        u.jsx('button', {
                          type: 'button',
                          className: _e.stepperMax,
                          disabled: h >= ke,
                          onClick: () => g(ke),
                          children: '最大',
                        }),
                      ],
                    }),
                  _.kind !== 'sellEquip' &&
                    u.jsxs('div', {
                      className: _e.totalRow,
                      children: ['合計: ', u.jsxs('strong', { children: [_.price * h, ' G'] })],
                    }),
                  u.jsxs('div', {
                    className: _e.confirmActions,
                    children: [
                      u.jsx('button', {
                        type: 'button',
                        className: _e.confirmCancel,
                        onClick: () => {
                          (s('cancel'), p(null));
                        },
                        children: 'やめる',
                      }),
                      u.jsx('button', {
                        type: 'button',
                        className: _e.confirmOk,
                        onClick: ne,
                        children: _.kind === 'buy' ? '購入する' : '売却する',
                      }),
                    ],
                  }),
                ],
              }),
            })
          : null,
        z ? Se() : null,
      ],
    });
  },
  ZN = '_layout_lp0j4_2',
  JN = '_head_lp0j4_14',
  PN = '_title_lp0j4_19',
  FN = '_subtitle_lp0j4_26',
  WN = '_body_lp0j4_32',
  ej = '_menu_lp0j4_36',
  tj = '_loading_lp0j4_42',
  lj = '_warn_lp0j4_47',
  aj = '_danger_lp0j4_54',
  nj = '_dialog_lp0j4_69',
  ij = '_dialogTitle_lp0j4_79',
  sj = '_field_lp0j4_84',
  rj = '_note_lp0j4_98',
  oj = '_dialogActions_lp0j4_104',
  cj = '_primary_lp0j4_109',
  uj = '_sub_lp0j4_26',
  dj = '_foot_lp0j4_134',
  mj = '_gearBtn_lp0j4_142',
  _j = '_soundOverlay_lp0j4_162',
  fj = '_soundPanel_lp0j4_172',
  Ke = {
    layout: ZN,
    head: JN,
    title: PN,
    subtitle: FN,
    body: WN,
    menu: ej,
    loading: tj,
    warn: lj,
    danger: aj,
    dialog: nj,
    dialogTitle: ij,
    field: sj,
    note: rj,
    dialogActions: oj,
    primary: cj,
    sub: uj,
    foot: dj,
    gearBtn: mj,
    soundOverlay: _j,
    soundPanel: fj,
  },
  pj = '_card_3vsn6_1',
  hj = '_corrupted_3vsn6_14',
  gj = '_corruptedText_3vsn6_19',
  kj = '_corruptedNote_3vsn6_25',
  vj = '_guildName_3vsn6_31',
  yj = '_meta_3vsn6_36',
  Ea = {
    card: pj,
    corrupted: hj,
    corruptedText: gj,
    corruptedNote: kj,
    guildName: vj,
    meta: yj,
    continue: '_continue_3vsn6_56',
  },
  bj = (l) => {
    if (!l) return '-';
    const i = new Date(l),
      r = (s) => String(s).padStart(2, '0');
    return `${i.getFullYear()}/${r(i.getMonth() + 1)}/${r(i.getDate())} ${r(i.getHours())}:${r(i.getMinutes())}`;
  },
  xj = ({ meta: l, onContinue: i }) =>
    l.corrupted
      ? u.jsxs('div', {
          className: `${Ea.card} ${Ea.corrupted}`,
          children: [
            u.jsx('div', { className: Ea.corruptedText, children: 'セーブデータが破損しています' }),
            u.jsx('p', {
              className: Ea.corruptedNote,
              children: '「最初から」で新しく始められます。',
            }),
          ],
        })
      : u.jsxs('div', {
          className: Ea.card,
          children: [
            u.jsx('div', { className: Ea.guildName, children: l.guildName }),
            u.jsxs('dl', {
              className: Ea.meta,
              children: [
                u.jsxs('div', {
                  children: [
                    u.jsx('dt', { children: '最高到達階' }),
                    u.jsx('dd', {
                      children: l.deepestReached > 0 ? `${l.deepestReached}F` : '未踏破',
                    }),
                  ],
                }),
                u.jsxs('div', {
                  children: [
                    u.jsx('dt', { children: '団員' }),
                    u.jsxs('dd', { children: [l.memberCount, '人'] }),
                  ],
                }),
                u.jsxs('div', {
                  children: [
                    u.jsx('dt', { children: '最終セーブ' }),
                    u.jsx('dd', { children: bj(l.savedAt) }),
                  ],
                }),
              ],
            }),
            u.jsx('button', {
              type: 'button',
              className: Ea.continue,
              onClick: i,
              children: 'つづきから',
            }),
          ],
        }),
  Sj = '_container_dw5gb_1',
  wj = '_title_dw5gb_11',
  Tj = '_row_dw5gb_18',
  Nj = '_label_dw5gb_26',
  jj = '_muteButton_dw5gb_33',
  Ej = '_muted_dw5gb_53',
  Cj = '_sliderWrapper_dw5gb_59',
  Aj = '_slider_dw5gb_59',
  Lj = '_volumeValue_dw5gb_78',
  pl = {
    container: Sj,
    title: wj,
    row: Tj,
    label: Nj,
    muteButton: jj,
    muted: Ej,
    sliderWrapper: Cj,
    slider: Aj,
    volumeValue: Lj,
  },
  Bj = 0.6,
  qj = () => {
    const l = x.useContext(wd),
      i = (l == null ? void 0 : l.volume) ?? Bj,
      r = (l == null ? void 0 : l.muted) ?? !1,
      s = () => {
        l == null || l.toggleMuted();
      },
      d = (m) => {
        const _ = parseFloat(m.target.value);
        (l == null || l.setVolume(_), l == null || l.play('decide'));
      };
    return u.jsxs('div', {
      className: pl.container,
      children: [
        u.jsx('h2', { className: pl.title, children: 'サウンド設定' }),
        u.jsxs('div', {
          className: pl.row,
          children: [
            u.jsx('span', { className: pl.label, children: 'ミュート' }),
            u.jsx('button', {
              type: 'button',
              className: `${pl.muteButton} ${r ? pl.muted : ''}`,
              onClick: s,
              'aria-pressed': r,
              'aria-label': r ? 'ミュート解除' : 'ミュートする',
              children: r ? '🔇 OFF' : '🔊 ON',
            }),
          ],
        }),
        u.jsxs('div', {
          className: pl.row,
          children: [
            u.jsx('span', { className: pl.label, children: '音量' }),
            u.jsxs('div', {
              className: pl.sliderWrapper,
              children: [
                u.jsx('input', {
                  type: 'range',
                  className: pl.slider,
                  min: 0,
                  max: 1,
                  step: 0.05,
                  value: i,
                  onChange: d,
                  disabled: r,
                  'aria-label': '音量',
                }),
                u.jsxs('span', { className: pl.volumeValue, children: [Math.round(i * 100), '%'] }),
              ],
            }),
          ],
        }),
      ],
    });
  },
  Ij = () => {
    const l = xl(),
      { startNewGame: i, continueGame: r } = ta(),
      s = El(),
      [d, m] = x.useState(null),
      [_, p] = x.useState(!0),
      [h, g] = x.useState('menu'),
      [b, k] = x.useState(''),
      [A, C] = x.useState(!1),
      [z, I] = x.useState(!1);
    x.useEffect(() => {
      (async () => (m(await c3()), p(!1)))();
    }, []);
    const M = d !== null && !d.corrupted,
      w = x.useCallback(async () => {
        (s('decide'), C(!0));
        const $ = await r();
        (C(!1), $.ok && l('/town'));
      }, [r, l, s]),
      j = x.useCallback(() => {
        (s('decide'), k(''), g(M ? 'confirm' : 'guildName'));
      }, [M, s]),
      V = x.useCallback(async () => {
        s('save');
        const $ = b.trim() || 'ななしのギルド';
        (C(!0), await i($), C(!1), l('/town'));
      }, [b, i, l, s]);
    return u.jsxs('div', {
      className: Ke.layout,
      children: [
        u.jsxs('header', {
          className: Ke.head,
          children: [
            u.jsx('h1', { className: Ke.title, children: '世界樹ライク' }),
            u.jsx('p', { className: Ke.subtitle, children: '無限タワー探索 RPG' }),
            u.jsx('button', {
              type: 'button',
              className: Ke.gearBtn,
              'aria-label': 'サウンド設定',
              onClick: () => {
                (s('cursor'), I(!0));
              },
              children: '⚙',
            }),
          ],
        }),
        u.jsx('main', {
          className: Ke.body,
          children: _
            ? u.jsx('p', { className: Ke.loading, children: '読み込み中...' })
            : h === 'guildName'
              ? u.jsxs('div', {
                  className: Ke.dialog,
                  children: [
                    u.jsx('h2', { className: Ke.dialogTitle, children: '新しいギルド' }),
                    u.jsxs('label', {
                      className: Ke.field,
                      children: [
                        u.jsx('span', { children: 'ギルド名' }),
                        u.jsx('input', {
                          type: 'text',
                          value: b,
                          maxLength: 16,
                          placeholder: 'ななしのギルド',
                          onChange: ($) => k($.target.value),
                          autoFocus: !0,
                        }),
                      ],
                    }),
                    u.jsx('p', {
                      className: Ke.note,
                      children:
                        '冒険者はまだいません。開始後、ギルドメニューで仲間を作成してください。',
                    }),
                    u.jsxs('div', {
                      className: Ke.dialogActions,
                      children: [
                        u.jsx('button', {
                          type: 'button',
                          className: Ke.primary,
                          disabled: A,
                          onClick: V,
                          children: 'はじめる',
                        }),
                        u.jsx('button', {
                          type: 'button',
                          className: Ke.sub,
                          disabled: A,
                          onClick: () => g('menu'),
                          children: 'もどる',
                        }),
                      ],
                    }),
                  ],
                })
              : h === 'confirm'
                ? u.jsxs('div', {
                    className: Ke.dialog,
                    children: [
                      u.jsx('h2', { className: Ke.dialogTitle, children: '最初から始めますか？' }),
                      u.jsxs('p', {
                        className: Ke.warn,
                        children: [
                          '現在のセーブデータ「',
                          d == null ? void 0 : d.guildName,
                          '」は上書きされ、元に戻せません。',
                        ],
                      }),
                      u.jsxs('div', {
                        className: Ke.dialogActions,
                        children: [
                          u.jsx('button', {
                            type: 'button',
                            className: Ke.danger,
                            disabled: A,
                            onClick: () => g('guildName'),
                            children: 'データを消して始める',
                          }),
                          u.jsx('button', {
                            type: 'button',
                            className: Ke.sub,
                            disabled: A,
                            onClick: () => g('menu'),
                            children: 'もどる',
                          }),
                        ],
                      }),
                    ],
                  })
                : u.jsxs('div', {
                    className: Ke.menu,
                    children: [
                      d !== null && u.jsx(xj, { meta: d, onContinue: () => void w() }),
                      u.jsx('button', {
                        type: 'button',
                        className: M ? Ke.sub : Ke.primary,
                        onClick: j,
                        children: '最初から',
                      }),
                    ],
                  }),
        }),
        u.jsxs('footer', { className: Ke.foot, children: ['v', '0.1.39'] }),
        z
          ? u.jsx('div', {
              className: Ke.soundOverlay,
              onClick: () => {
                (s('cursor'), I(!1));
              },
              children: u.jsxs('div', {
                className: Ke.soundPanel,
                onClick: ($) => $.stopPropagation(),
                children: [
                  u.jsx(qj, {}),
                  u.jsx('button', {
                    type: 'button',
                    className: Ke.sub,
                    onClick: () => {
                      (s('cursor'), I(!1));
                    },
                    children: 'とじる',
                  }),
                ],
              }),
            })
          : null,
      ],
    });
  },
  Oj = '_layout_uxqv8_1',
  Mj = '_head_uxqv8_12',
  Rj = '_guildName_uxqv8_16',
  Dj = '_stats_uxqv8_21',
  zj = '_hint_uxqv8_40',
  Hj = '_menu_uxqv8_50',
  Uj = '_foot_uxqv8_57',
  $j = '_exit_uxqv8_61',
  Gj = '_warpOverlay_uxqv8_72',
  Yj = '_warpPanel_uxqv8_83',
  Vj = '_warpTitle_uxqv8_94',
  Xj = '_warpBtn_uxqv8_99',
  Qj = '_warpClose_uxqv8_110',
  Qt = {
    layout: Oj,
    head: Mj,
    guildName: Rj,
    stats: Dj,
    hint: zj,
    menu: Hj,
    foot: Uj,
    exit: $j,
    warpOverlay: Gj,
    warpPanel: Yj,
    warpTitle: Vj,
    warpBtn: Xj,
    warpClose: Qj,
  },
  Kj = '_button_1tp4a_1',
  Zj = '_primary_1tp4a_26',
  Jj = '_label_1tp4a_32',
  Pj = '_description_1tp4a_37',
  Xr = { button: Kj, primary: Zj, label: Jj, description: Pj },
  Xn = ({
    label: l,
    description: i,
    variant: r = 'default',
    disabled: s = !1,
    onClick: d,
    sfx: m = 'decide',
  }) => {
    const _ = El(),
      p = () => {
        (!s && m !== null && _(m), d == null || d());
      };
    return u.jsxs('button', {
      type: 'button',
      className: `${Xr.button} ${r === 'primary' ? Xr.primary : ''}`,
      disabled: s,
      onClick: p,
      children: [
        u.jsx('span', { className: Xr.label, children: l }),
        i ? u.jsx('span', { className: Xr.description, children: i }) : null,
      ],
    });
  },
  Fj = () => {
    const l = xl(),
      { save: i, exitToTitle: r, applyAndPersist: s } = ta(),
      d = El(),
      [m, _] = x.useState(!1);
    if (!i) return u.jsx(yl, { to: '/title', replace: !0 });
    const { guild: p, towerState: h, diveState: g } = i,
      b = p.members.length > 0,
      k = () => {
        (d('cancel'), r(), l('/title'));
      },
      A = async () => {
        (d('dive'), g || (await s((I) => kh(I, 1))), l('/dungeon'));
      },
      C = h.warp.unlockedCheckpoints,
      z = async (I) => {
        (d('warp'), _(!1), await s((M) => kh(M, I)), l('/dungeon'));
      };
    return u.jsxs('div', {
      className: Qt.layout,
      children: [
        u.jsxs('header', {
          className: Qt.head,
          children: [
            u.jsx('div', { className: Qt.guildName, children: p.name }),
            u.jsxs('dl', {
              className: Qt.stats,
              children: [
                u.jsxs('div', {
                  children: [
                    u.jsx('dt', { children: '所持金' }),
                    u.jsxs('dd', { children: [p.gold, ' G'] }),
                  ],
                }),
                u.jsxs('div', {
                  children: [
                    u.jsx('dt', { children: '最高到達' }),
                    u.jsx('dd', {
                      children: h.record.deepestReached > 0 ? `${h.record.deepestReached}F` : '-',
                    }),
                  ],
                }),
                u.jsxs('div', {
                  children: [
                    u.jsx('dt', { children: '団員' }),
                    u.jsxs('dd', { children: [p.members.length, '人'] }),
                  ],
                }),
              ],
            }),
          ],
        }),
        !b &&
          u.jsx('p', {
            className: Qt.hint,
            children:
              'まずは「ギルド管理」で冒険者を作成してください。団員がいないとダイブできません。',
          }),
        u.jsxs('main', {
          className: Qt.menu,
          children: [
            u.jsx(Xn, {
              label: g ? '潜行を再開' : 'ダイブ開始',
              description: b
                ? g
                  ? `${g.depth}F から再開`
                  : '第1階からタワーへ潜る'
                : '団員が必要です',
              variant: 'primary',
              disabled: !b,
              sfx: null,
              onClick: () => void A(),
            }),
            u.jsx(Xn, {
              label: 'ワープ',
              description:
                C.length === 0
                  ? 'ボス撃破で解放'
                  : g
                    ? '潜行中は使えません'
                    : `解放済み: ${C.map((I) => `${I}F`).join('・')}`,
              disabled: !b || C.length === 0 || !!g,
              sfx: null,
              onClick: () => _(!0),
            }),
            u.jsx(Xn, {
              label: 'ギルド管理',
              description: '編成・キャラ作成',
              onClick: () => l('/guild'),
            }),
            u.jsx(Xn, {
              label: 'ショップ',
              description: '装備・アイテム売買',
              onClick: () => l('/shop'),
            }),
            u.jsx(Xn, {
              label: '鍛冶屋',
              description: '装備の強化・リサイクル',
              onClick: () => l('/forge'),
            }),
            u.jsx(Xn, {
              label: '図鑑 / 記録',
              description: '到達記録・モンスター図鑑',
              onClick: () => l('/codex'),
            }),
          ],
        }),
        u.jsx('footer', {
          className: Qt.foot,
          children: u.jsx('button', {
            type: 'button',
            className: Qt.exit,
            onClick: k,
            children: 'タイトルへ戻る',
          }),
        }),
        m
          ? u.jsx('div', {
              className: Qt.warpOverlay,
              onClick: () => _(!1),
              children: u.jsxs('div', {
                className: Qt.warpPanel,
                onClick: (I) => I.stopPropagation(),
                children: [
                  u.jsx('div', { className: Qt.warpTitle, children: 'ワープ先を選択' }),
                  C.map((I) =>
                    u.jsxs(
                      'button',
                      {
                        type: 'button',
                        className: Qt.warpBtn,
                        onClick: () => void z(I),
                        children: ['第 ', I, ' 階へ'],
                      },
                      I
                    )
                  ),
                  u.jsx('button', {
                    type: 'button',
                    className: Qt.warpClose,
                    onClick: () => {
                      (d('cancel'), _(!1));
                    },
                    children: 'とじる',
                  }),
                ],
              }),
            })
          : null,
      ],
    });
  };
function Wj() {
  return u.jsxs(L0, {
    children: [
      u.jsx(cl, { path: '/', element: u.jsx(yl, { to: '/title', replace: !0 }) }),
      u.jsx(cl, { path: '/title', element: u.jsx(Ij, {}) }),
      u.jsx(cl, { path: '/town', element: u.jsx(Fj, {}) }),
      u.jsx(cl, { path: '/guild', element: u.jsx(aT, {}) }),
      u.jsx(cl, { path: '/guild/char/:id', element: u.jsx(JT, {}) }),
      u.jsx(cl, { path: '/shop', element: u.jsx(KN, {}) }),
      u.jsx(cl, { path: '/forge', element: u.jsx(S5, {}) }),
      u.jsx(cl, { path: '/codex', element: u.jsx(eS, {}) }),
      u.jsx(cl, { path: '/dungeon', element: u.jsx(Jw, {}) }),
      u.jsx(cl, { path: '/battle', element: u.jsx(y3, {}) }),
      u.jsx(cl, { path: '*', element: u.jsx(PT, {}) }),
    ],
  });
}
const eE = [
    'cursor',
    'decide',
    'cancel',
    'error',
    'encounter',
    'attack',
    'critical',
    'damage',
    'down',
    'heal',
    'buff',
    'debuff',
    'skill',
    'flee',
    'victory',
    'defeat',
    'levelup',
    'coin',
    'forge',
    'recycle',
    'item',
    'cook',
    'create',
    'dive',
    'warp',
    'save',
  ],
  tE = { victory: 0.9, levelup: 0.9, error: 0.8, down: 0.85, encounter: 0.85 },
  lE = (l) => `/sekaiju-like-game/sfx/${l}.wav`,
  ok = 'sekaiju-sfx-settings',
  Ju = { volume: 0.6, muted: !1 };
function aE() {
  try {
    const l = localStorage.getItem(ok);
    if (!l) return { ...Ju };
    const i = JSON.parse(l);
    return typeof i == 'object' &&
      i !== null &&
      'volume' in i &&
      'muted' in i &&
      typeof i.volume == 'number' &&
      typeof i.muted == 'boolean'
      ? { volume: i.volume, muted: i.muted }
      : { ...Ju };
  } catch {
    return { ...Ju };
  }
}
function nE(l) {
  try {
    localStorage.setItem(ok, JSON.stringify(l));
  } catch {}
}
function iE() {
  if (!(typeof window > 'u')) return window.AudioContext ?? window.webkitAudioContext ?? void 0;
}
const sE = 30,
  rE = ({ children: l }) => {
    const i = aE(),
      [r, s] = x.useState(i.volume),
      [d, m] = x.useState(i.muted),
      _ = x.useRef(null),
      p = x.useRef(null),
      h = x.useRef({}),
      g = x.useRef(!1),
      b = x.useRef({}),
      k = x.useCallback(() => {
        if (g.current) return;
        const M = iE();
        if (M) {
          g.current = !0;
          try {
            const w = new M();
            _.current = w;
            const j = w.createGain();
            ((j.gain.value = i.muted ? 0 : i.volume),
              j.connect(w.destination),
              (p.current = j),
              Promise.all(
                eE.map(async (V) => {
                  try {
                    const $ = lE(V),
                      K = await (await fetch($)).arrayBuffer(),
                      S = await w.decodeAudioData(K);
                    h.current[V] = S;
                  } catch ($) {
                    console.warn(`[SoundProvider] SE "${V}" の読み込みに失敗しました:`, $);
                  }
                })
              ));
          } catch (w) {
            console.warn('[SoundProvider] AudioContext の初期化に失敗しました:', w);
          }
        }
      }, []);
    (x.useEffect(() => {
      const M = () => {
        k();
      };
      return (
        window.addEventListener('pointerdown', M, { once: !0 }),
        window.addEventListener('keydown', M, { once: !0 }),
        window.addEventListener('touchstart', M, { once: !0 }),
        () => {
          (window.removeEventListener('pointerdown', M),
            window.removeEventListener('keydown', M),
            window.removeEventListener('touchstart', M));
        }
      );
    }, [k]),
      x.useEffect(() => {
        (p.current && (p.current.gain.value = d ? 0 : r), nE({ volume: r, muted: d }));
      }, [r, d]));
    const A = x.useCallback((M) => {
        const w = _.current,
          j = p.current;
        if (!w || !j) return;
        const V = h.current[M];
        if (!V) return;
        const $ = performance.now(),
          te = b.current[M] ?? -1 / 0;
        if (!($ - te < sE)) {
          b.current[M] = $;
          try {
            w.state === 'suspended' && w.resume();
            const K = w.createGain();
            ((K.gain.value = tE[M] ?? 1), K.connect(j));
            const S = w.createBufferSource();
            ((S.buffer = V),
              S.connect(K),
              S.start(),
              (S.onended = () => {
                (S.disconnect(), K.disconnect());
              }));
          } catch (K) {
            console.warn(`[SoundProvider] SE "${M}" の再生に失敗しました:`, K);
          }
        }
      }, []),
      C = x.useCallback((M) => {
        s(M);
      }, []),
      z = x.useCallback((M) => {
        m(M);
      }, []),
      I = x.useCallback(() => {
        m((M) => !M);
      }, []);
    return u.jsx(wd.Provider, {
      value: { play: A, volume: r, muted: d, setVolume: C, setMuted: z, toggleMuted: I },
      children: l,
    });
  },
  oE = {
    races: Pe,
    classes: ze,
    titles: Jl,
    skills: Zn,
    unionSkills: Kn,
    summons: ai,
    gatherTypes: Fa,
    recipes: ii,
    enemies: Tt,
    items: at,
    equipment: et,
  },
  cE = /^[a-z]+_[a-z0-9_]+$/;
function hl(l, i, r) {
  for (const s of i)
    cE.test(s) || r.push(`[${l}] ID 命名規約違反: "${s}"（期待: <domain>_<name>）`);
}
function Pu(l, i, r, s) {
  const d = new Set(i.skills.map((m) => m.skillId));
  for (const m of i.skills) {
    r.has(m.skillId) || s.push(`[${l}] 未定義スキルを参照: "${m.skillId}"`);
    for (const _ of m.requires ?? [])
      d.has(_.skillId) ||
        s.push(`[${l}] スキル "${m.skillId}" の前提 "${_.skillId}" が同ツリーに存在しない`);
  }
}
function uE() {
  var M;
  const l = [],
    {
      races: i,
      classes: r,
      titles: s,
      skills: d,
      unionSkills: m,
      summons: _,
      gatherTypes: p,
      recipes: h,
      enemies: g,
      items: b,
      equipment: k,
    } = oE;
  (hl('races', Object.keys(i), l),
    hl('classes', Object.keys(r), l),
    hl('titles', Object.keys(s), l),
    hl('skills', Object.keys(d), l),
    hl('enemies', Object.keys(g), l),
    hl('items', Object.keys(b), l),
    hl('equipment', Object.keys(k), l));
  const A = (w, j) => {
    for (const [V, $] of Object.entries(j))
      V !== $.id && l.push(`[${w}] キー "${V}" と id "${$.id}" が不一致`);
  };
  (A('races', i),
    A('classes', r),
    A('titles', s),
    A('skills', d),
    A('enemies', g),
    A('items', b),
    A('equipment', k));
  const C = new Set(Object.keys(d)),
    z = new Set(Object.keys(r)),
    I = new Set(Object.keys(s));
  for (const w of Object.values(i)) {
    (z.has(w.defaultClassId) ||
      l.push(`[races] "${w.id}" の defaultClassId "${w.defaultClassId}" が未定義`),
      Pu(`races/${w.id}`, w.raceSkillTree, C, l));
    for (const j of w.raceSkillTree.skills) {
      const V = m[j.skillId];
      V &&
        V.raceId !== w.id &&
        l.push(`[races/${w.id}] ユニオンスキル "${j.skillId}" の raceId "${V.raceId}" が不一致`);
    }
  }
  for (const w of Object.values(m)) {
    const j = (M = i[w.raceId]) == null ? void 0 : M.raceSkillTree;
    (!j || !j.skills.some((V) => V.skillId === w.id)) &&
      l.push(`[unionSkills] "${w.id}" が種族 "${w.raceId}" のスキルツリーに無い`);
  }
  hl('unionSkills', Object.keys(m), l);
  for (const [w, j] of Object.entries(m))
    (w !== j.id && l.push(`[unionSkills] キー "${w}" と id "${j.id}" が不一致`),
      j.id in d || l.push(`[unionSkills] "${j.id}" が skills に未定義`),
      j.requiredParticipants < 1 &&
        l.push(`[unionSkills] "${j.id}" の requiredParticipants が 1 未満`),
      (j.gaugeCostPerParticipant < 0 || j.gaugeCostPerParticipant > 100) &&
        l.push(`[unionSkills] "${j.id}" の gaugeCostPerParticipant が 0..100 外`),
      j.id in wt &&
        l.push(
          `[unionSkills] "${j.id}" が BATTLE_SKILLS にも存在（通常スキルとして撃ててしまう）`
        ));
  hl('passiveSkills', Object.keys(ad), l);
  for (const [w, j] of Object.entries(ad))
    (w !== j.id && l.push(`[passiveSkills] キー "${w}" と id "${j.id}" が不一致`),
      C.has(j.id) || l.push(`[passiveSkills] "${j.id}" が skills に未定義`),
      j.id in wt &&
        l.push(`[passiveSkills] "${j.id}" が BATTLE_SKILLS にも存在（戦闘で撃ててしまう）`),
      j.id in m && l.push(`[passiveSkills] "${j.id}" が UNION_SKILLS にも存在`));
  hl('summons', Object.keys(_), l);
  for (const [w, j] of Object.entries(_))
    w !== j.id && l.push(`[summons] キー "${w}" と id "${j.id}" が不一致`);
  for (const w of Object.values(wt))
    for (const j of w.effects)
      j.kind === 'summon' &&
        !(j.summonKind in _) &&
        l.push(`[battleSkills] "${w.id}" の召喚 "${j.summonKind}" が未定義`);
  for (const [w, j] of Object.entries(p)) {
    (w !== j.type && l.push(`[gatherTypes] キー "${w}" と type "${j.type}" が不一致`),
      C.has(j.requiredSkillId) ||
        l.push(`[gatherTypes] "${j.type}" の requiredSkillId "${j.requiredSkillId}" が未定義`));
    for (const V of j.drops) {
      if (!(V.itemId in b))
        l.push(`[gatherTypes] "${j.type}" のドロップ "${V.itemId}" が未定義アイテム`);
      else {
        const $ = b[V.itemId].category === 'food';
        (j.food &&
          !$ &&
          l.push(`[gatherTypes] 食材系統 "${j.type}" のドロップ "${V.itemId}" が food でない`),
          !j.food &&
            $ &&
            l.push(`[gatherTypes] 素材系統 "${j.type}" のドロップ "${V.itemId}" が food`));
      }
      V.weight <= 0 && l.push(`[gatherTypes] "${j.type}" のドロップ重みが正でない`);
    }
  }
  hl('recipes', Object.keys(h), l);
  for (const [w, j] of Object.entries(h)) {
    w !== j.id && l.push(`[recipes] キー "${w}" と id "${j.id}" が不一致`);
    for (const V of j.ingredients)
      V.itemId in b
        ? b[V.itemId].category !== 'food' &&
          l.push(`[recipes] "${j.id}" の材料 "${V.itemId}" が food カテゴリでない`)
        : l.push(`[recipes] "${j.id}" の材料 "${V.itemId}" が未定義`);
    j.result.itemId in b
      ? b[j.result.itemId].category !== 'food' &&
        l.push(`[recipes] "${j.id}" の結果 "${j.result.itemId}" が food カテゴリでない`)
      : l.push(`[recipes] "${j.id}" の結果 "${j.result.itemId}" が未定義`);
  }
  for (const w of Object.values(r)) {
    Pu(`classes/${w.id}`, w.skillTree, C, l);
    for (const j of w.titleOptions) {
      if (!I.has(j)) {
        l.push(`[classes] "${w.id}" の称号 "${j}" が未定義`);
        continue;
      }
      s[j].parentClassId !== w.id &&
        l.push(`[classes] 称号 "${j}" の parentClassId が "${w.id}" と不一致`);
    }
  }
  for (const w of Object.values(s))
    (z.has(w.parentClassId) ||
      l.push(`[titles] "${w.id}" の parentClassId "${w.parentClassId}" が未定義`),
      Pu(`titles/${w.id}`, w.skillTree, C, l));
  for (const w of Object.values(k))
    (w.slot === 'weapon' &&
      !w.weaponType &&
      l.push(`[equipment] "${w.id}" は weapon だが weaponType が未設定`),
      w.slot === 'armor' &&
        !w.armorType &&
        l.push(`[equipment] "${w.id}" は armor だが armorType が未設定`),
      (w.buyPrice < 0 || w.tier < 0) && l.push(`[equipment] "${w.id}" の buyPrice/tier が負`));
  for (const w of Object.values(b))
    (w.buyPrice < 0 && l.push(`[items] "${w.id}" の buyPrice が負`),
      w.category === 'consumable' &&
        !w.useContext &&
        !w.effects &&
        l.push(`[items] 消費アイテム "${w.id}" に useContext も effects も無い（使用不能）`));
  for (const w of Object.values(g))
    for (const j of w.drops ?? [])
      (j.itemId in b || l.push(`[enemies] "${w.id}" のドロップ "${j.itemId}" が未定義アイテム`),
        (j.rate < 0 || j.rate > 1) &&
          l.push(`[enemies] "${w.id}" のドロップ "${j.itemId}" の rate が 0..1 外`));
  for (const [w, j] of Object.entries(sk)) {
    w in b || l.push(`[SELL_UNLOCKS] キー素材 "${w}" が未定義`);
    for (const V of j) V in k || l.push(`[SELL_UNLOCKS] 解放先装備 "${V}" が未定義`);
  }
  return { ok: l.length === 0, errors: l };
}
const zh = uE();
zh.ok || console.error('マスターデータ検証エラー:', zh.errors);
const ck = document.getElementById('root');
if (!ck) throw new Error('Failed to find #root element');
qy.createRoot(ck).render(
  u.jsx(tb, {
    basename: '/sekaiju-like-game',
    children: u.jsx(rE, { children: u.jsx(m3, { children: u.jsx(Wj, {}) }) }),
  })
);
