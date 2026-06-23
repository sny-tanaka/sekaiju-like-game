if (!self.define) {
  let s,
    n = {};
  const e = (e, r) => (
    (e = new URL(e + '.js', r).href),
    n[e] ||
      new Promise((n) => {
        if ('document' in self) {
          const s = document.createElement('script');
          ((s.src = e), (s.onload = n), document.head.appendChild(s));
        } else ((s = e), importScripts(e), n());
      }).then(() => {
        let s = n[e];
        if (!s) throw new Error(`Module ${e} didn’t register its module`);
        return s;
      })
  );
  self.define = (r, l) => {
    const a = s || ('document' in self ? document.currentScript.src : '') || location.href;
    if (n[a]) return;
    let i = {};
    const _ = (s) => e(s, a),
      u = { module: { uri: a }, exports: i, require: _ };
    n[a] = Promise.all(r.map((s) => u[s] || _(s))).then((s) => (l(...s), i));
  };
}
define(['./workbox-1ef09536'], function (s) {
  'use strict';
  (self.addEventListener('message', (s) => {
    s.data && 'SKIP_WAITING' === s.data.type && self.skipWaiting();
  }),
    s.precacheAndRoute(
      [
        { url: 'index.html', revision: 'c7f208d6f2b7fdad368a5417014e46cd' },
        { url: 'icon-512.png', revision: '5316052a37fc817af9f7cd34b7f0d35d' },
        { url: 'icon-192.png', revision: '60fb1f9ababc08708199d504d57fffb0' },
        { url: 'favicon.ico', revision: '2e16a14e5099649dda716dd699ef613b' },
        { url: 'assets/workbox-window.prod.es5-BIl4cyR9.js', revision: null },
        { url: 'assets/stairs-up-DhyZlujG.png', revision: null },
        { url: 'assets/stairs-down-BjaF19rU.png', revision: null },
        { url: 'assets/race_therian_class_warrior-CKWFMacg.png', revision: null },
        { url: 'assets/race_therian_class_summoner-CNzGW0Ru.png', revision: null },
        { url: 'assets/race_therian_class_ranger-CESM3cV3.png', revision: null },
        { url: 'assets/race_therian_class_monk-rnPwlx11.png', revision: null },
        { url: 'assets/race_therian_class_medic-Bds_hEP9.png', revision: null },
        { url: 'assets/race_therian_class_mage-CGVRd35C.png', revision: null },
        { url: 'assets/race_therian_class_hexer-CrfXpl00.png', revision: null },
        { url: 'assets/race_therian_class_guardian-_eQIUpo6.png', revision: null },
        { url: 'assets/race_therian_class_dancer-BL_34K8o.png', revision: null },
        { url: 'assets/race_pix_class_warrior-BXhufex8.png', revision: null },
        { url: 'assets/race_pix_class_summoner-BHT9k-H8.png', revision: null },
        { url: 'assets/race_pix_class_ranger-BLCRstJ2.png', revision: null },
        { url: 'assets/race_pix_class_monk-O2CT8IX1.png', revision: null },
        { url: 'assets/race_pix_class_medic-BI3xm09o.png', revision: null },
        { url: 'assets/race_pix_class_mage-D2vDWudV.png', revision: null },
        { url: 'assets/race_pix_class_hexer--YKnPgL9.png', revision: null },
        { url: 'assets/race_pix_class_guardian-xWny2i_1.png', revision: null },
        { url: 'assets/race_pix_class_dancer-C693ewPQ.png', revision: null },
        { url: 'assets/race_lunar_class_warrior-DE3ZnDBg.png', revision: null },
        { url: 'assets/race_lunar_class_summoner-DyaOnyPj.png', revision: null },
        { url: 'assets/race_lunar_class_ranger-Di40mnEV.png', revision: null },
        { url: 'assets/race_lunar_class_monk-CcmhxGyl.png', revision: null },
        { url: 'assets/race_lunar_class_medic-Cig2UWdM.png', revision: null },
        { url: 'assets/race_lunar_class_mage-B8OdYRuj.png', revision: null },
        { url: 'assets/race_lunar_class_hexer-HaID7_ek.png', revision: null },
        { url: 'assets/race_lunar_class_guardian-C83vscdl.png', revision: null },
        { url: 'assets/race_lunar_class_dancer-CYOq_E9P.png', revision: null },
        { url: 'assets/race_human_class_warrior-RTIKEjgy.png', revision: null },
        { url: 'assets/race_human_class_summoner-DYJjZNJk.png', revision: null },
        { url: 'assets/race_human_class_ranger-DifCNbQp.png', revision: null },
        { url: 'assets/race_human_class_monk-7bRUo9Cq.png', revision: null },
        { url: 'assets/race_human_class_medic-BtAr_Qkn.png', revision: null },
        { url: 'assets/race_human_class_mage-DTj7nyrd.png', revision: null },
        { url: 'assets/race_human_class_hexer-4U5hNAoT.png', revision: null },
        { url: 'assets/race_human_class_guardian-Csu5A-sJ.png', revision: null },
        { url: 'assets/race_human_class_dancer-DB_PEi4p.png', revision: null },
        { url: 'assets/race_golan_class_warrior-CnLN87nl.png', revision: null },
        { url: 'assets/race_golan_class_summoner-jRoSno9u.png', revision: null },
        { url: 'assets/race_golan_class_ranger-CXjO3uVg.png', revision: null },
        { url: 'assets/race_golan_class_monk-C-v_JQ9g.png', revision: null },
        { url: 'assets/race_golan_class_medic-Cnt9Gfgf.png', revision: null },
        { url: 'assets/race_golan_class_mage-DAH7QWHP.png', revision: null },
        { url: 'assets/race_golan_class_hexer-ClpzJtxW.png', revision: null },
        { url: 'assets/race_golan_class_guardian-BVgKBKnK.png', revision: null },
        { url: 'assets/race_golan_class_dancer-BjiJDr20.png', revision: null },
        { url: 'assets/race_garon_class_warrior-DD7PlvH6.png', revision: null },
        { url: 'assets/race_garon_class_summoner-BJqfyKF4.png', revision: null },
        { url: 'assets/race_garon_class_ranger-CFC12QDE.png', revision: null },
        { url: 'assets/race_garon_class_monk-DaWK8qGz.png', revision: null },
        { url: 'assets/race_garon_class_medic-BUkazrlE.png', revision: null },
        { url: 'assets/race_garon_class_mage-O5_D7_Ca.png', revision: null },
        { url: 'assets/race_garon_class_hexer-DXjUUnx_.png', revision: null },
        { url: 'assets/race_garon_class_guardian-Q0SZ35gI.png', revision: null },
        { url: 'assets/race_garon_class_dancer-Mv4Ly2hD.png', revision: null },
        { url: 'assets/item_rat_tail-B19Ofi1X.png', revision: null },
        { url: 'assets/item_mat_t4_toxic_scale-ldZX4ugd.png', revision: null },
        { url: 'assets/item_mat_t4_spectral_ash-B1lyeuXU.png', revision: null },
        { url: 'assets/item_mat_t4_cursed_marrow-VArW_ANf.png', revision: null },
        { url: 'assets/item_mat_t3_thunder_carapace-p0Z8O4CB.png', revision: null },
        { url: 'assets/item_mat_t3_storm_feather-BUxaWc98.png', revision: null },
        { url: 'assets/item_mat_t2_ice_crystal-BrOtXggk.png', revision: null },
        { url: 'assets/item_mat_t1_sharp_feather-4RgV_lMN.png', revision: null },
        { url: 'assets/item_mat_t0_soft_pelt-B45_Umk6.png', revision: null },
        { url: 'assets/item_mat_t0_faint_ember-mc7xjJJ1.png', revision: null },
        { url: 'assets/item_bat_wing-DSYSFTv5.png', revision: null },
        { url: 'assets/index-D-f26BQh.css', revision: null },
        { url: 'assets/index-CCG8qbOV.js', revision: null },
        { url: 'assets/equip_t2_light-CoHmd7sL.png', revision: null },
        { url: 'assets/equip_cloth_robe-DNIpUHZ8.png', revision: null },
        { url: 'favicon.ico', revision: '2e16a14e5099649dda716dd699ef613b' },
        { url: 'icon-192.png', revision: '60fb1f9ababc08708199d504d57fffb0' },
        { url: 'icon-512.png', revision: '5316052a37fc817af9f7cd34b7f0d35d' },
        { url: 'robots.txt', revision: 'fa1ded1ed7c11438a9b0385b1e112850' },
        { url: 'manifest.webmanifest', revision: 'cfa9940d8499a18420af33f290858759' },
      ],
      {}
    ),
    s.cleanupOutdatedCaches(),
    s.registerRoute(new s.NavigationRoute(s.createHandlerBoundToURL('index.html'))));
});
