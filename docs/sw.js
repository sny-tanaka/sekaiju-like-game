if (!self.define) {
  let s,
    n = {};
  const r = (r, e) => (
    (r = new URL(r + '.js', e).href),
    n[r] ||
      new Promise((n) => {
        if ('document' in self) {
          const s = document.createElement('script');
          ((s.src = r), (s.onload = n), document.head.appendChild(s));
        } else ((s = r), importScripts(r), n());
      }).then(() => {
        let s = n[r];
        if (!s) throw new Error(`Module ${r} didn’t register its module`);
        return s;
      })
  );
  self.define = (e, a) => {
    const l = s || ('document' in self ? document.currentScript.src : '') || location.href;
    if (n[l]) return;
    let i = {};
    const u = (s) => r(s, l),
      c = { module: { uri: l }, exports: i, require: u };
    n[l] = Promise.all(e.map((s) => c[s] || u(s))).then((s) => (a(...s), i));
  };
}
define(['./workbox-1ef09536'], function (s) {
  'use strict';
  (self.addEventListener('message', (s) => {
    s.data && 'SKIP_WAITING' === s.data.type && self.skipWaiting();
  }),
    s.precacheAndRoute(
      [
        { url: 'index.html', revision: '87086b9bfafed8463936f34a5b9115ae' },
        { url: 'icon-512.png', revision: 'aea6735f0e3902695c58dbca460dc603' },
        { url: 'icon-192.png', revision: '2abc40b6b11f19c114b43abb7733a687' },
        { url: 'favicon.ico', revision: 'bf53cfc1c1a7432fa532b35b76682d50' },
        { url: 'assets/workbox-window.prod.es5-BIl4cyR9.js', revision: null },
        { url: 'assets/stairs-up-DhyZlujG.png', revision: null },
        { url: 'assets/stairs-down-BjaF19rU.png', revision: null },
        { url: 'assets/race_therian_class_warrior-DDkgxQyR.png', revision: null },
        { url: 'assets/race_therian_class_summoner-BPZpHLGD.png', revision: null },
        { url: 'assets/race_therian_class_ranger-BQAeAl_X.png', revision: null },
        { url: 'assets/race_therian_class_monk-JZ4uMoHZ.png', revision: null },
        { url: 'assets/race_therian_class_medic-CZeF286I.png', revision: null },
        { url: 'assets/race_therian_class_mage-D-_7EJo3.png', revision: null },
        { url: 'assets/race_therian_class_hexer-BWwOmfgL.png', revision: null },
        { url: 'assets/race_therian_class_guardian-Druu8eKu.png', revision: null },
        { url: 'assets/race_therian_class_dancer-BxpSgKyv.png', revision: null },
        { url: 'assets/race_pix_class_warrior-Bv3a-wVz.png', revision: null },
        { url: 'assets/race_pix_class_summoner-DSHymAtW.png', revision: null },
        { url: 'assets/race_pix_class_ranger-BusppLpl.png', revision: null },
        { url: 'assets/race_pix_class_monk-D3hH630c.png', revision: null },
        { url: 'assets/race_pix_class_medic-BzD89nou.png', revision: null },
        { url: 'assets/race_pix_class_mage-DTCFthp1.png', revision: null },
        { url: 'assets/race_pix_class_hexer-5AYh6m9N.png', revision: null },
        { url: 'assets/race_pix_class_guardian-BUT1ucxz.png', revision: null },
        { url: 'assets/race_pix_class_dancer-CoalCQwa.png', revision: null },
        { url: 'assets/race_lunar_class_warrior-BsCa4cjv.png', revision: null },
        { url: 'assets/race_lunar_class_summoner-BuLIhhcN.png', revision: null },
        { url: 'assets/race_lunar_class_ranger-fTnsqPnj.png', revision: null },
        { url: 'assets/race_lunar_class_monk-DWaeNVAE.png', revision: null },
        { url: 'assets/race_lunar_class_medic-elS9cYD9.png', revision: null },
        { url: 'assets/race_lunar_class_mage-BiuOkTuG.png', revision: null },
        { url: 'assets/race_lunar_class_hexer-C7SSz4h-.png', revision: null },
        { url: 'assets/race_lunar_class_guardian-Dtn1Jl61.png', revision: null },
        { url: 'assets/race_lunar_class_dancer-B8zfZ6Te.png', revision: null },
        { url: 'assets/race_human_class_warrior-CC-fodRP.png', revision: null },
        { url: 'assets/race_human_class_summoner-BSIS56AU.png', revision: null },
        { url: 'assets/race_human_class_ranger-C9NI3kRR.png', revision: null },
        { url: 'assets/race_human_class_monk-plz5IGts.png', revision: null },
        { url: 'assets/race_human_class_medic-CEAeyeCr.png', revision: null },
        { url: 'assets/race_human_class_mage-CFM-tLbB.png', revision: null },
        { url: 'assets/race_human_class_hexer-CJlubHtj.png', revision: null },
        { url: 'assets/race_human_class_guardian-CIyf8Yjo.png', revision: null },
        { url: 'assets/race_human_class_dancer-CrtOkpzi.png', revision: null },
        { url: 'assets/race_golan_class_warrior-CKpo9dpI.png', revision: null },
        { url: 'assets/race_golan_class_summoner-B5eF0p8j.png', revision: null },
        { url: 'assets/race_golan_class_ranger-Dy1xwX1F.png', revision: null },
        { url: 'assets/race_golan_class_monk-DQr8wDRF.png', revision: null },
        { url: 'assets/race_golan_class_medic-BbBEhugD.png', revision: null },
        { url: 'assets/race_golan_class_mage-D7IE0Qbt.png', revision: null },
        { url: 'assets/race_golan_class_hexer-kLOVJ67x.png', revision: null },
        { url: 'assets/race_golan_class_guardian-kN-ZdhDL.png', revision: null },
        { url: 'assets/race_golan_class_dancer-nDMu7e1l.png', revision: null },
        { url: 'assets/race_garon_class_warrior-DkCT7XxJ.png', revision: null },
        { url: 'assets/race_garon_class_summoner-DMhk_RMn.png', revision: null },
        { url: 'assets/race_garon_class_ranger-Cv6Eo2Yx.png', revision: null },
        { url: 'assets/race_garon_class_monk-Btp_radp.png', revision: null },
        { url: 'assets/race_garon_class_medic-CNC7KmcK.png', revision: null },
        { url: 'assets/race_garon_class_mage-D2GIN1qW.png', revision: null },
        { url: 'assets/race_garon_class_hexer-ix5b8oSg.png', revision: null },
        { url: 'assets/race_garon_class_guardian-BKIQjbMd.png', revision: null },
        { url: 'assets/race_garon_class_dancer-C8zWZHmO.png', revision: null },
        { url: 'assets/index-VXQOKzNZ.css', revision: null },
        { url: 'assets/index-BLwjLs8J.js', revision: null },
        { url: 'favicon.ico', revision: 'bf53cfc1c1a7432fa532b35b76682d50' },
        { url: 'icon-192.png', revision: '2abc40b6b11f19c114b43abb7733a687' },
        { url: 'icon-512.png', revision: 'aea6735f0e3902695c58dbca460dc603' },
        { url: 'robots.txt', revision: 'fa1ded1ed7c11438a9b0385b1e112850' },
        { url: 'manifest.webmanifest', revision: 'cfa9940d8499a18420af33f290858759' },
      ],
      {}
    ),
    s.cleanupOutdatedCaches(),
    s.registerRoute(new s.NavigationRoute(s.createHandlerBoundToURL('index.html'))));
});
