if (!self.define) {
  let e,
    i = {};
  const n = (n, r) => (
    (n = new URL(n + '.js', r).href),
    i[n] ||
      new Promise((i) => {
        if ('document' in self) {
          const e = document.createElement('script');
          ((e.src = n), (e.onload = i), document.head.appendChild(e));
        } else ((e = n), importScripts(n), i());
      }).then(() => {
        let e = i[n];
        if (!e) throw new Error(`Module ${n} didn’t register its module`);
        return e;
      })
  );
  self.define = (r, s) => {
    const o = e || ('document' in self ? document.currentScript.src : '') || location.href;
    if (i[o]) return;
    let c = {};
    const t = (e) => n(e, o),
      f = { module: { uri: o }, exports: c, require: t };
    i[o] = Promise.all(r.map((e) => f[e] || t(e))).then((e) => (s(...e), c));
  };
}
define(['./workbox-1ef09536'], function (e) {
  'use strict';
  (self.addEventListener('message', (e) => {
    e.data && 'SKIP_WAITING' === e.data.type && self.skipWaiting();
  }),
    e.precacheAndRoute(
      [
        { url: 'index.html', revision: '7e1a6f9dbfb586ee3a5da9125337d7c6' },
        { url: 'icon-512.png', revision: 'aea6735f0e3902695c58dbca460dc603' },
        { url: 'icon-192.png', revision: '2abc40b6b11f19c114b43abb7733a687' },
        { url: 'favicon.ico', revision: 'bf53cfc1c1a7432fa532b35b76682d50' },
        { url: 'assets/index-DdUorArQ.js', revision: null },
        { url: 'assets/index-BDCivY_j.css', revision: null },
        { url: 'favicon.ico', revision: 'bf53cfc1c1a7432fa532b35b76682d50' },
        { url: 'icon-192.png', revision: '2abc40b6b11f19c114b43abb7733a687' },
        { url: 'icon-512.png', revision: 'aea6735f0e3902695c58dbca460dc603' },
        { url: 'robots.txt', revision: 'fa1ded1ed7c11438a9b0385b1e112850' },
        { url: 'manifest.webmanifest', revision: 'cfa9940d8499a18420af33f290858759' },
      ],
      {}
    ),
    e.cleanupOutdatedCaches(),
    e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL('index.html'))));
});
