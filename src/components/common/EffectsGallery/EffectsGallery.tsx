/**
 * EffectsGallery
 * Storybook 専用: モック（案A v2）の全 @keyframes を一覧表示する。
 * ゲームロジックには使わない。
 */
import React from 'react';

import styles from './EffectsGallery.module.scss';
import './EffectsGallery.keyframes.css';

interface EffectDef {
  name: string;
  desc: string;
  preview: React.ReactNode;
}

// カテゴリ定義
interface Category {
  title: string;
  effects: EffectDef[];
}

// animation ショートハンドヘルパー
const anim = (
  keyframeName: string,
  duration = '2s',
  timingFn = 'ease-in-out',
  iterCount = 'infinite'
) => `gallery-${keyframeName} ${duration} ${timingFn} ${iterCount}`;

const CATEGORIES: Category[] = [
  {
    title: '背景・装飾',
    effects: [
      {
        name: 'moteDrift',
        desc: 'タイトル浮遊粒子',
        preview: (
          <div
            className={styles.dot}
            style={{ animation: anim('moteDrift', '3s') }}
          />
        ),
      },
      {
        name: 'glowPulse',
        desc: 'エンブレム光脈動',
        preview: (
          <div
            className={styles.ring}
            style={{ animation: anim('glowPulse', '2.5s') }}
          />
        ),
      },
      {
        name: 'breathe',
        desc: '樹字エンブレム呼吸',
        preview: (
          <div
            className={styles.kanji}
            style={{ animation: anim('breathe', '3s') }}
          >
            樹
          </div>
        ),
      },
      {
        name: 'bloom',
        desc: 'HP/MPバー発光拍動',
        preview: (
          <div
            className={styles.rect}
            style={{ animation: anim('bloom', '2s') }}
          />
        ),
      },
      {
        name: 'encPulse',
        desc: 'エンカウント枠脈動',
        preview: (
          <div
            className={styles.encBox}
            style={{ animation: anim('encPulse', '2.5s') }}
          />
        ),
      },
      {
        name: 'corridorPulse',
        desc: '廊下背景明滅',
        preview: (
          <div
            className={styles.corridor}
            style={{ animation: anim('corridorPulse', '3s') }}
          />
        ),
      },
      {
        name: 'barShimmer',
        desc: 'HPバーシマー',
        preview: (
          <div
            className={styles.shimmerBar}
            style={{ animation: anim('barShimmer', '1.5s', 'linear') }}
          />
        ),
      },
      {
        name: 'warpScan',
        desc: 'ワープ画面スキャン線',
        preview: (
          <div style={{ position: 'relative', width: '80px', height: '50px', overflow: 'hidden' }}>
            <div
              className={styles.scanLine}
              style={{ animation: anim('warpScan', '2s', 'linear') }}
            />
          </div>
        ),
      },
      {
        name: 'foePulse',
        desc: '敵シルエット脈動',
        preview: (
          <div
            className={styles.kanji}
            style={{ animation: anim('foePulse', '1.5s') }}
          >
            敵
          </div>
        ),
      },
      {
        name: 'gatherSparkle',
        desc: '鍛冶ギャザースパークル',
        preview: (
          <div
            className={styles.dotBlue}
            style={{ animation: anim('gatherSparkle', '2s') }}
          />
        ),
      },
      {
        name: 'steamRise',
        desc: '鍛冶・調合蒸気上昇',
        preview: (
          <div
            className={styles.steam}
            style={{ animation: anim('steamRise', '2.5s') }}
          />
        ),
      },
      {
        name: 'sparkZap',
        desc: '電撃スパーク',
        preview: (
          <div
            className={styles.dotBlue}
            style={{ animation: anim('sparkZap', '1.2s') }}
          />
        ),
      },
      {
        name: 'dustRise',
        desc: '衝撃後の砂埃',
        preview: (
          <div
            className={styles.dust}
            style={{ animation: anim('dustRise', '2s') }}
          />
        ),
      },
    ],
  },
  {
    title: '数値・ポップ',
    effects: [
      {
        name: 'splatA',
        desc: 'ダメージ数値ポップ（物理）',
        preview: (
          <div
            className={styles.kanjiRed}
            style={{ position: 'relative', animation: anim('splatA', '2s') }}
          >
            斬
          </div>
        ),
      },
      {
        name: 'splatB',
        desc: 'ダメージ数値ポップ（魔法）',
        preview: (
          <div
            className={styles.kanji}
            style={{
              position: 'relative',
              animation: anim('splatB', '2s', 'ease-in-out', 'infinite'),
            }}
          >
            魔
          </div>
        ),
      },
      {
        name: 'coinPop',
        desc: 'ショップ購入時硬貨ポップ',
        preview: <span style={{ fontSize: 24, animation: anim('coinPop', '2s') }}>🪙</span>,
      },
      {
        name: 'healRise',
        desc: '回復数値上昇',
        preview: (
          <div
            className={styles.dotGreen}
            style={{ animation: anim('healRise', '2s') }}
          />
        ),
      },
      {
        name: 'forgeSpark',
        desc: '鍛冶完成スパーク',
        preview: (
          <div
            className={styles.spark}
            style={{ animation: anim('forgeSpark', '1.5s') }}
          />
        ),
      },
      {
        name: 'sealStamp',
        desc: '契約シールスタンプ',
        preview: (
          <div
            style={{
              position: 'relative',
              width: 60,
              height: 60,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div
              className={styles.kanjiRed}
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                animation: anim('sealStamp', '2.5s'),
              }}
            >
              封
            </div>
          </div>
        ),
      },
      {
        name: 'critFlash',
        desc: 'クリティカル閃光',
        preview: (
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: '50%',
              background: '#ffe08a',
              animation: anim('critFlash', '1.5s'),
            }}
          />
        ),
      },
    ],
  },
  {
    title: '揺れ・衝撃',
    effects: [
      {
        name: 'shakeA',
        desc: '被弾揺れ（物理）',
        preview: (
          <div
            className={styles.rectRed}
            style={{ animation: anim('shakeA', '1s') }}
          />
        ),
      },
      {
        name: 'shakeB',
        desc: '被弾揺れ（魔法）',
        preview: (
          <div
            className={styles.rect}
            style={{ background: 'rgba(93,130,200,.6)', animation: anim('shakeB', '1s') }}
          />
        ),
      },
      {
        name: 'hitFlash',
        desc: '被弾画面フラッシュ',
        preview: (
          <div
            className={styles.preview}
            style={{ position: 'relative', width: 80, height: 50 }}
          >
            <div
              className={styles.hitOverlay}
              style={{ animation: anim('hitFlash', '1s') }}
            />
            <span className={styles.kanji}>被</span>
          </div>
        ),
      },
      {
        name: 'dashAway',
        desc: 'ダッシュ逃走',
        preview: (
          <div
            className={styles.kanji}
            style={{ animation: anim('dashAway', '1.5s') }}
          >
            逃
          </div>
        ),
      },
      {
        name: 'speedLine',
        desc: '高速移動スピードライン',
        preview: (
          <div style={{ overflow: 'hidden', width: 80, height: 30, position: 'relative' }}>
            <div
              className={styles.speedLineEl}
              style={{ animation: anim('speedLine', '1.2s', 'linear') }}
            />
          </div>
        ),
      },
      {
        name: 'dissolveE',
        desc: '敵消滅ディゾルブ',
        preview: (
          <div
            className={styles.dissolveChar}
            style={{ animation: anim('dissolveE', '2s') }}
          >
            霧
          </div>
        ),
      },
    ],
  },
  {
    title: '攻撃',
    effects: [
      {
        name: 'slash',
        desc: '斬撃エフェクト',
        preview: (
          <div
            className={styles.slashBar}
            style={{ animation: anim('slash', '1.5s') }}
          />
        ),
      },
      {
        name: 'atkSlash',
        desc: '剣士通常攻撃斬撃',
        preview: (
          <div
            className={styles.slashBar}
            style={{ animation: anim('atkSlash', '1.2s') }}
          />
        ),
      },
      {
        name: 'slashLR',
        desc: '左右斬撃',
        preview: (
          <div
            className={styles.slashBar}
            style={{ width: 70, animation: anim('slashLR', '1.5s') }}
          />
        ),
      },
      {
        name: 'atkBlunt',
        desc: '鈍器攻撃衝撃波',
        preview: (
          <div
            className={styles.ring}
            style={{ animation: anim('atkBlunt', '1.2s') }}
          />
        ),
      },
      {
        name: 'atkThrust',
        desc: '突き攻撃エフェクト',
        preview: (
          <div
            className={styles.thrustBar}
            style={{ animation: anim('atkThrust', '1.2s') }}
          />
        ),
      },
      {
        name: 'atkMagic',
        desc: '魔法攻撃魔法陣',
        preview: (
          <div
            className={styles.rune}
            style={{ animation: anim('atkMagic', '1.5s') }}
          />
        ),
      },
      {
        name: 'atkFire',
        desc: '炎属性攻撃',
        preview: (
          <div
            className={styles.flame}
            style={{ animation: anim('atkFire', '1.5s') }}
          />
        ),
      },
      {
        name: 'atkIce',
        desc: '氷属性攻撃',
        preview: (
          <div
            className={styles.crystal}
            style={{ animation: anim('atkIce', '1.5s') }}
          />
        ),
      },
      {
        name: 'atkThunder',
        desc: '雷属性攻撃',
        preview: (
          <div
            className={styles.bolt}
            style={{ animation: anim('atkThunder', '1.2s') }}
          />
        ),
      },
      {
        name: 'thrustLine',
        desc: '突き・水平移動線',
        preview: (
          <div style={{ overflow: 'hidden', width: 80, height: 10, position: 'relative' }}>
            <div
              className={styles.slashBar}
              style={{ animation: anim('thrustLine', '1.5s') }}
            />
          </div>
        ),
      },
      {
        name: 'thrustDown',
        desc: '突き・上から下',
        preview: (
          <div
            className={styles.thrustBar}
            style={{ animation: anim('thrustDown', '1.5s') }}
          />
        ),
      },
      {
        name: 'thrustUp',
        desc: '突き・下から上',
        preview: (
          <div
            className={styles.thrustBar}
            style={{ animation: anim('thrustUp', '1.5s') }}
          />
        ),
      },
      {
        name: 'flameFlick',
        desc: '炎揺らめき',
        preview: (
          <div
            className={styles.flame}
            style={{ animation: anim('flameFlick', '1s') }}
          />
        ),
      },
      {
        name: 'boltFlash',
        desc: '雷閃光点滅',
        preview: (
          <div
            className={styles.bolt}
            style={{ animation: anim('boltFlash', '1.2s', 'linear') }}
          />
        ),
      },
      {
        name: 'crystalSpin',
        desc: '氷結晶回転',
        preview: (
          <div
            className={styles.crystal}
            style={{ animation: anim('crystalSpin', '1.5s') }}
          />
        ),
      },
      {
        name: 'ringExpand',
        desc: '衝撃波リング拡張',
        preview: (
          <div
            className={styles.ring}
            style={{ animation: anim('ringExpand', '1.5s') }}
          />
        ),
      },
      {
        name: 'runeSpin',
        desc: '魔法陣回転召喚',
        preview: (
          <div
            className={styles.rune}
            style={{ animation: anim('runeSpin', '1.5s') }}
          />
        ),
      },
    ],
  },
  {
    title: '状態異常・サモン',
    effects: [
      {
        name: 'poisonWisp',
        desc: '毒状態霧上昇',
        preview: (
          <div
            className={styles.wisp}
            style={{ animation: anim('poisonWisp', '2s') }}
          />
        ),
      },
      {
        name: 'ailDrift',
        desc: '状態異常アイコン漂流',
        preview: (
          <div
            className={styles.ailIcon}
            style={{ animation: anim('ailDrift', '2s') }}
          >
            💀
          </div>
        ),
      },
      {
        name: 'summonAppear',
        desc: 'サモン召喚出現',
        preview: (
          <div
            className={styles.summonIcon}
            style={{ animation: anim('summonAppear', '2s') }}
          >
            ✦
          </div>
        ),
      },
    ],
  },
  {
    title: 'その他',
    effects: [
      {
        name: 'warnBlink',
        desc: '警告点滅',
        preview: (
          <div
            style={{
              width: 40,
              height: 24,
              borderRadius: 3,
              background: '#d4674f',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 10,
              color: '#fff',
              fontWeight: 700,
              animation: anim('warnBlink', '1s', 'step-start'),
            }}
          >
            警告
          </div>
        ),
      },
    ],
  },
];

export const EffectsGallery: React.FC = () => {
  return (
    <div className={styles.root}>
      {CATEGORIES.map((cat) => (
        <section
          key={cat.title}
          className={styles.categorySection}
        >
          <h2 className={styles.categoryHeading}>{cat.title}</h2>
          <div className={styles.grid}>
            {cat.effects.map((eff) => (
              <div
                key={eff.name}
                className={styles.card}
              >
                <div className={styles.preview}>{eff.preview}</div>
                <div className={styles.label}>
                  <div className={styles.labelName}>{eff.name}</div>
                  <div className={styles.labelDesc}>{eff.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
};
