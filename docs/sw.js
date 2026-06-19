if (!self.define) {
  let e,
    s = {};
  const n = (n, r) => (
    (n = new URL(n + '.js', r).href),
    s[n] ||
      new Promise((s) => {
        if ('document' in self) {
          const e = document.createElement('script');
          ((e.src = n), (e.onload = s), document.head.appendChild(e));
        } else ((e = n), importScripts(n), s());
      }).then(() => {
        let e = s[n];
        if (!e) throw new Error(`Module ${n} didn’t register its module`);
        return e;
      })
  );
  self.define = (r, i) => {
    const a = e || ('document' in self ? document.currentScript.src : '') || location.href;
    if (s[a]) return;
    let l = {};
    const _ = (e) => n(e, a),
      c = { module: { uri: a }, exports: l, require: _ };
    s[a] = Promise.all(r.map((e) => c[e] || _(e))).then((e) => (i(...e), l));
  };
}
define(['./workbox-1ef09536'], function (e) {
  'use strict';
  (self.addEventListener('message', (e) => {
    e.data && 'SKIP_WAITING' === e.data.type && self.skipWaiting();
  }),
    e.precacheAndRoute(
      [
        { url: 'index.html', revision: 'e5e03770fb44ff9e3f808bc8ee11935a' },
        { url: 'icon-512.png', revision: 'aea6735f0e3902695c58dbca460dc603' },
        { url: 'icon-192.png', revision: '2abc40b6b11f19c114b43abb7733a687' },
        { url: 'favicon.ico', revision: 'bf53cfc1c1a7432fa532b35b76682d50' },
        {
          url: 'sprites/enemies/enemy_t4_wraith_lantern.png',
          revision: '9f22e633bd1d6425c0f0a594fd01df7a',
        },
        {
          url: 'sprites/enemies/enemy_t4_siege_automaton.png',
          revision: '7c1c53bc67498df9e41a90f567e494ac',
        },
        {
          url: 'sprites/enemies/enemy_t4_shroud_revenant.png',
          revision: '10f2dae5e322d9fe63645b019db8b0e0',
        },
        {
          url: 'sprites/enemies/enemy_t4_rust_sentinel.png',
          revision: 'a7c69b08dcde0a31e92df9d0cd1ec0bc',
        },
        {
          url: 'sprites/enemies/enemy_t4_rotwalker.png',
          revision: '1f43d185038f45307b5b1968cccd4b62',
        },
        {
          url: 'sprites/enemies/enemy_t4_plague_crawler.png',
          revision: 'aed3be6a546776b83e1e3912ca5e45f6',
        },
        {
          url: 'sprites/enemies/enemy_t4_miasma_moth.png',
          revision: 'd681e6b303fbecc8d93ea697b2aacf4d',
        },
        {
          url: 'sprites/enemies/enemy_t4_grave_acolyte.png',
          revision: '4f2db0da116c63b0e67cac01fa252cc3',
        },
        {
          url: 'sprites/enemies/enemy_t4_gear_hound.png',
          revision: 'bec0ae079a0c87c8cbfbce236cc8aca3',
        },
        {
          url: 'sprites/enemies/enemy_t4_corpse_colossus.png',
          revision: '819358b96453928e3bb6574fe316c262',
        },
        {
          url: 'sprites/enemies/enemy_t4_boss_blight_sovereign.png',
          revision: '24901589bb92aab1f32b70645377141d',
        },
        {
          url: 'sprites/enemies/enemy_t4_bone_lancer.png',
          revision: '6617b35754587f691dffcb1f36194669',
        },
        {
          url: 'sprites/enemies/enemy_t3_thunder_bird.png',
          revision: '31ab859c56742f54fd111e05458fc629',
        },
        {
          url: 'sprites/enemies/enemy_t3_thunder_beast.png',
          revision: 'd1d9baff04534abb79e1e0f6175a2097',
        },
        {
          url: 'sprites/enemies/enemy_t3_tempest_ape.png',
          revision: '60e01610ee11481a30aa6cbb42454288',
        },
        {
          url: 'sprites/enemies/enemy_t3_storm_wolf.png',
          revision: 'd446d37f526dd39948cd7573cda7189d',
        },
        {
          url: 'sprites/enemies/enemy_t3_storm_roc.png',
          revision: '31ab859c56742f54fd111e05458fc629',
        },
        {
          url: 'sprites/enemies/enemy_t3_static_crystal.png',
          revision: '44e13550c328865f6145692801d965a1',
        },
        {
          url: 'sprites/enemies/enemy_t3_spark_beetle.png',
          revision: '61f6d3143127af07ebad9f68df3a737e',
        },
        {
          url: 'sprites/enemies/enemy_t3_rain_hawk.png',
          revision: '4ae34c857e6ab741a7107b74791a393b',
        },
        {
          url: 'sprites/enemies/enemy_t3_gale_serpent.png',
          revision: '6193a99b041fbd34757d012e5b78d7ba',
        },
        {
          url: 'sprites/enemies/enemy_t3_discharge_idol.png',
          revision: '655c6725a4d880cf17b038e0f5eac8cf',
        },
        {
          url: 'sprites/enemies/enemy_t3_charged_wisp.png',
          revision: '9f22e633bd1d6425c0f0a594fd01df7a',
        },
        {
          url: 'sprites/enemies/enemy_t3_boss_tempest_sovereign.png',
          revision: '638525fe3dcffdeb54378c310caeaeed',
        },
        {
          url: 'sprites/enemies/enemy_t2_snow_serpent.png',
          revision: '6193a99b041fbd34757d012e5b78d7ba',
        },
        {
          url: 'sprites/enemies/enemy_t2_snow_owl.png',
          revision: '6cf19612a3c48637ae158b6fcbaa5a87',
        },
        {
          url: 'sprites/enemies/enemy_t2_snow_ape.png',
          revision: 'ef89e639c5a6c3a54e6818e685acbac6',
        },
        {
          url: 'sprites/enemies/enemy_t2_rime_beetle.png',
          revision: '3102ab89fc1a7930edb4a81155879de7',
        },
        {
          url: 'sprites/enemies/enemy_t2_iron_ice_golem.png',
          revision: '7c1c53bc67498df9e41a90f567e494ac',
        },
        {
          url: 'sprites/enemies/enemy_t2_ice_wisp.png',
          revision: 'edb294f1a067ece16d700bf3e95863a5',
        },
        {
          url: 'sprites/enemies/enemy_t2_glacier_crab.png',
          revision: '6ec23b26fa6ccba83038bd87a0d21a80',
        },
        {
          url: 'sprites/enemies/enemy_t2_glacial_bear.png',
          revision: 'e6ba513fb692b37abd73f0583f60163a',
        },
        {
          url: 'sprites/enemies/enemy_t2_frostfang_wolf.png',
          revision: '9bbf57206d9c3b3f8f81e39d3fc5435e',
        },
        {
          url: 'sprites/enemies/enemy_t2_frost_stag.png',
          revision: '3cc321bc432b5194b841f89c3cf8438d',
        },
        {
          url: 'sprites/enemies/enemy_t2_boss_frost_monarch.png',
          revision: '68a8f2b2c0ed8c27d3d32bdc17f7c6c1',
        },
        {
          url: 'sprites/enemies/enemy_t2_blizzard_hawk.png',
          revision: '31ab859c56742f54fd111e05458fc629',
        },
        {
          url: 'sprites/enemies/enemy_t1_young_baboon.png',
          revision: 'ceccc53d99ebf167417bb6cb9bdcdd0f',
        },
        {
          url: 'sprites/enemies/enemy_t1_thunder_roc.png',
          revision: '31ab859c56742f54fd111e05458fc629',
        },
        {
          url: 'sprites/enemies/enemy_t1_stone_beetle.png',
          revision: '63de17b59f6a020feac5eee6ae6c34f5',
        },
        {
          url: 'sprites/enemies/enemy_t1_rock_lizard.png',
          revision: 'b01a9680fb8c0383f681875b1af64ea9',
        },
        {
          url: 'sprites/enemies/enemy_t1_magma_drake.png',
          revision: '3d887fb9242a73314d79852d66918f2f',
        },
        {
          url: 'sprites/enemies/enemy_t1_highland_hawk.png',
          revision: '4ae34c857e6ab741a7107b74791a393b',
        },
        {
          url: 'sprites/enemies/enemy_t1_ember_lizard.png',
          revision: '5e48b876d74d7b42175c6d6e4e7c94fc',
        },
        {
          url: 'sprites/enemies/enemy_t1_crag_goat.png',
          revision: '109ced0a48827deb9d6a37307705040e',
        },
        {
          url: 'sprites/enemies/enemy_t1_cliff_ram.png',
          revision: 'e0fb91e5ea2a16fb59c2dd3492316086',
        },
        {
          url: 'sprites/enemies/enemy_t1_boulder_toad.png',
          revision: '0f1abf85f7d77c3b10a7d6a73ccad863',
        },
        {
          url: 'sprites/enemies/enemy_t1_boulder_ogre.png',
          revision: '7eeca229d2ebd330f1c22a75b723f77a',
        },
        {
          url: 'sprites/enemies/enemy_t1_boss_mountain_lord.png',
          revision: 'b0b37e5a97fb1e0a791270dfcef9aba4',
        },
        {
          url: 'sprites/enemies/enemy_t0_wood_caracal.png',
          revision: '6aaa7f462df93d6f92ed04d7ec0072c8',
        },
        {
          url: 'sprites/enemies/enemy_t0_thicket_stag.png',
          revision: '3cc321bc432b5194b841f89c3cf8438d',
        },
        {
          url: 'sprites/enemies/enemy_t0_pale_wisp.png',
          revision: 'e8c6fd5025afed298e169da83d4994c6',
        },
        {
          url: 'sprites/enemies/enemy_t0_glow_mushroom.png',
          revision: '238de1b8197dbc99b5707cb32f3f752f',
        },
        {
          url: 'sprites/enemies/enemy_t0_forest_rabbit.png',
          revision: '7150def8082973eed9581cbed05bd34d',
        },
        {
          url: 'sprites/enemies/enemy_t0_elder_treant.png',
          revision: '73079c0fb8715184122b4c369960a63b',
        },
        {
          url: 'sprites/enemies/enemy_t0_cave_crawler.png',
          revision: '608ca321b737ef8b740138507f4dfe32',
        },
        {
          url: 'sprites/enemies/enemy_t0_bristle_boar.png',
          revision: 'a7863270fc744a9075d7cb3ab7c1b19d',
        },
        { url: 'sprites/enemies/enemy_slime.png', revision: 'dd91ecaf96654fd72367ee542234d06e' },
        {
          url: 'sprites/enemies/enemy_giant_rat.png',
          revision: 'ea929ff33c94277566daa8d08a863304',
        },
        { url: 'sprites/enemies/enemy_cave_bat.png', revision: '9815c71840fd1b87bfc525c16185bb1d' },
        {
          url: 'sprites/enemies/enemy_boss_gatekeeper.png',
          revision: '40f7b4e4934a24cf8ccb49bb192a0c65',
        },
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
        { url: 'assets/index-cirMS7Bf.css', revision: null },
        { url: 'assets/index-D9VQV_Jj.js', revision: null },
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
