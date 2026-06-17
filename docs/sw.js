if (!self.define) {
  let e,
    i = {};
  const s = (s, n) => (
    (s = new URL(s + '.js', n).href),
    i[s] ||
      new Promise((i) => {
        if ('document' in self) {
          const e = document.createElement('script');
          ((e.src = s), (e.onload = i), document.head.appendChild(e));
        } else ((e = s), importScripts(s), i());
      }).then(() => {
        let e = i[s];
        if (!e) throw new Error(`Module ${s} didn’t register its module`);
        return e;
      })
  );
  self.define = (n, r) => {
    const o = e || ('document' in self ? document.currentScript.src : '') || location.href;
    if (i[o]) return;
    let c = {};
    const a = (e) => s(e, o),
      l = { module: { uri: o }, exports: c, require: a };
    i[o] = Promise.all(n.map((e) => l[e] || a(e))).then((e) => (r(...e), c));
  };
}
define(['./workbox-1ef09536'], function (e) {
  'use strict';
  (self.addEventListener('message', (e) => {
    e.data && 'SKIP_WAITING' === e.data.type && self.skipWaiting();
  }),
    e.precacheAndRoute(
      [
        { url: 'index.html', revision: '2ca74ded9eec008a6aa3956ae726a2a0' },
        { url: 'icon-512.png', revision: 'aea6735f0e3902695c58dbca460dc603' },
        { url: 'icon-192.png', revision: '2abc40b6b11f19c114b43abb7733a687' },
        { url: 'favicon.ico', revision: 'bf53cfc1c1a7432fa532b35b76682d50' },
        { url: 'assets/workbox-window.prod.es5-BIl4cyR9.js', revision: null },
        { url: 'assets/stairs-up-DhyZlujG.png', revision: null },
        { url: 'assets/stairs-down-BjaF19rU.png', revision: null },
        { url: 'assets/index-D8rOSmPw.js', revision: null },
        { url: 'assets/index-BOZJ8XsL.css', revision: null },
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
