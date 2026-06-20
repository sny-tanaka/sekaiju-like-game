/**
 * EffectsGallery
 * Storybook 専用: モック（案A v3）の全 @keyframes を一覧表示する。
 * ゲームロジックには使わない。
 *
 * プレビュー素材はモック原本（/tmp/sekaiju-design/案A_v3.dc.html）の
 * 各 animation: 使用箇所を grep して、その位置原点・素材・方向を再現している。
 */
import React from 'react';

import styles from './EffectsGallery.module.scss';
import './EffectsGallery.keyframes.css';

import { AttackFx } from '@/components/common/AttackFx/AttackFx';
import { DamagePop } from '@/components/common/DamagePop/DamagePop';

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

// animation ショートハンドヘルパー（gallery- 接頭辞を付与）
const anim = (
  keyframeName: string,
  duration = '2s',
  timingFn = 'ease-in-out',
  iterCount = 'infinite'
) => `gallery-${keyframeName} ${duration} ${timingFn} ${iterCount}`;

// ---------------------------------------------------------------------------
// カテゴリ別プレビュー定義
// ---------------------------------------------------------------------------

const CATEGORIES: Category[] = [
  // -----------------------------------------------------------------------
  // 背景・装飾
  // -----------------------------------------------------------------------
  {
    title: '背景・装飾',
    effects: [
      {
        name: 'moteDrift',
        desc: 'タイトル浮遊粒子（金/青の小丸、bottom から上昇）',
        // モック: position:absolute; bottom:0; border-radius:50%; background:#c9a86a
        // left:16%〜82% でランダム配置、bottom 基準で上昇
        preview: (
          <div style={{ position: 'relative', width: 80, height: 90, overflow: 'visible' }}>
            <div
              style={{
                position: 'absolute',
                left: '20%',
                bottom: 0,
                width: 4,
                height: 4,
                borderRadius: '50%',
                background: '#c9a86a',
                animation: anim('moteDrift', '3s', 'ease-in-out'),
              }}
            />
            <div
              style={{
                position: 'absolute',
                left: '55%',
                bottom: 0,
                width: 3,
                height: 3,
                borderRadius: '50%',
                background: '#a9c3d8',
                animation: anim('moteDrift', '4s', 'ease-in-out', 'infinite'),
                animationDelay: '1.4s',
              }}
            />
            <div
              style={{
                position: 'absolute',
                left: '80%',
                bottom: 0,
                width: 2,
                height: 2,
                borderRadius: '50%',
                background: '#c9a86a',
                animation: anim('moteDrift', '3.5s', 'ease-in-out', 'infinite'),
                animationDelay: '0.6s',
              }}
            />
          </div>
        ),
      },
      {
        name: 'glowPulse',
        desc: 'エンブレム輪・詠唱光脈動',
        // モック: 樹エンブレムの外輪 (border-radius:50%; border:1px solid rgba(201,168,106,.28))
        //         詠唱時は ✦ 周囲の青い radial-gradient
        preview: (
          <div style={{ position: 'relative', width: 60, height: 60 }}>
            <div
              style={{
                position: 'absolute',
                inset: 0,
                borderRadius: '50%',
                border: '1px solid rgba(201,168,106,.4)',
                animation: anim('glowPulse', '2.5s'),
              }}
            />
            <div
              style={{
                position: 'absolute',
                inset: 10,
                borderRadius: '50%',
                border: '1px solid rgba(201,168,106,.6)',
              }}
            />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'Shippori Mincho, serif',
                fontSize: 22,
                color: '#c9a86a',
              }}
            >
              樹
            </div>
          </div>
        ),
      },
      {
        name: 'breathe',
        desc: '樹字エンブレム 上下呼吸（translateY 0→-3px）',
        // モック: font-size:62px; color:#c9a86a; animation:breathe 6s ease-in-out infinite
        preview: (
          <div
            style={{
              fontFamily: 'Shippori Mincho, serif',
              fontSize: 36,
              color: '#c9a86a',
              lineHeight: 1,
              animation: anim('breathe', '3s'),
            }}
          >
            樹
          </div>
        ),
      },
      {
        name: 'bloom',
        desc: '敵背後の radial-gradient 拍動（scale 1→1.08）',
        // モック: position:absolute; inset:-18px; border-radius:50%;
        //         background:radial-gradient(circle,rgba(212,103,79,.18),transparent 70%)
        //         animation:bloom 4s ease-in-out infinite
        preview: (
          <div
            style={{
              position: 'relative',
              width: 70,
              height: 70,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                position: 'absolute',
                inset: 0,
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(212,103,79,.4), transparent 70%)',
                animation: anim('bloom', '2.5s'),
              }}
            />
            <span style={{ position: 'relative', fontSize: 28 }}>👹</span>
          </div>
        ),
      },
      {
        name: 'encPulse',
        desc: 'エンカウント背景 inset glow（赤い box-shadow）',
        // モック: width:393px; height:300px; background:radial-gradient(70% 80% at 50% 45%, #3a1418, #06070a 78%)
        //         animation:encPulse 2.4s ease-in-out infinite
        preview: (
          <div
            style={{
              width: 80,
              height: 60,
              borderRadius: 6,
              background: 'radial-gradient(70% 80% at 50% 45%, #3a1418, #06070a 78%)',
              border: '1px solid rgba(120,20,30,.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              animation: anim('encPulse', '2.4s'),
            }}
          >
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: '50%',
                background: 'radial-gradient(circle, #8a2f2a, #5e1f1c)',
              }}
            />
          </div>
        ),
      },
      {
        name: 'corridorPulse',
        desc: '廊下背景 opacity 明滅（.5↔.8）',
        // モック: background:linear-gradient(180deg,#0a0f13,#0d141a); clip-path:polygon(...)
        //         animation:corridorPulse 4s ease-in-out infinite
        preview: (
          <div
            style={{
              width: 80,
              height: 55,
              background: 'linear-gradient(180deg, #0a0f13, #0d141a)',
              borderRadius: 3,
              overflow: 'hidden',
              position: 'relative',
            }}
          >
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: '50%',
                background: 'linear-gradient(180deg, #0a0f13, #0d141a)',
                clipPath: 'polygon(25% 0, 75% 0, 100% 100%, 0 100%)',
                animation: anim('corridorPulse', '3s'),
              }}
            />
          </div>
        ),
      },
      {
        name: 'barShimmer',
        desc: 'HP バーシマー（background-position 流れ）',
        // モック: HPバー上で繰り返し背景が流れる
        preview: (
          <div
            className={styles.shimmerBar}
            style={{ animation: anim('barShimmer', '1.5s', 'linear') }}
          />
        ),
      },
      {
        name: 'warpScan',
        desc: 'ダイブ画面スキャン線（translateY -100%→360%）',
        // モック: @keyframes 定義のみで本文中に実使用箇所未確認。
        //         ダイブ/ワープ演出の縦走査ライン。
        preview: (
          <div
            style={{
              position: 'relative',
              width: 80,
              height: 60,
              overflow: 'hidden',
              background: '#070809',
              borderRadius: 3,
            }}
          >
            <div
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                height: 2,
                background: 'rgba(93,200,180,.7)',
                boxShadow: '0 0 6px rgba(93,200,180,.5)',
                animation: anim('warpScan', '1.8s', 'linear'),
              }}
            />
          </div>
        ),
      },
      {
        name: 'foePulse',
        desc: 'FOE シルエット脈動（scale 1→1.25、opacity .5→1）',
        // モック: FOE（特殊敵）シルエットが大きく脈打つ
        preview: (
          <div
            style={{
              fontSize: 34,
              lineHeight: 1,
              filter: 'brightness(.4) sepia(1) hue-rotate(340deg)',
              animation: anim('foePulse', '1.6s'),
            }}
          >
            👹
          </div>
        ),
      },
      {
        name: 'gatherSparkle',
        desc: '採集成功 ✦ 回転（scale .85→1.2、rotate 0→20deg）',
        // モック: font-size:16px; animation:gatherSparkle 1.6s ease-in-out infinite
        //         採集成功メッセージ横の ✦
        preview: (
          <span
            style={{
              fontSize: 24,
              color: '#9ed8b4',
              display: 'inline-block',
              animation: anim('gatherSparkle', '1.6s'),
            }}
          >
            ✦
          </span>
        ),
      },
      {
        name: 'steamRise',
        desc: '調理「〜」蒸気上昇（translateY 4px→-14px）',
        // モック: font-size:11px; color:#d8c0a0; animation:steamRise 1.8s ease-in-out infinite
        //         🍲 の上に「〜」2本が上昇
        preview: (
          <div style={{ position: 'relative', fontSize: 26, lineHeight: 1, paddingTop: 16 }}>
            <span
              style={{
                position: 'absolute',
                top: 0,
                left: '20%',
                fontSize: 12,
                color: '#d8c0a0',
                animation: anim('steamRise', '1.8s'),
              }}
            >
              〜
            </span>
            <span
              style={{
                position: 'absolute',
                top: 0,
                left: '55%',
                fontSize: 11,
                color: '#d8c0a0',
                animation: anim('steamRise', '1.8s', 'ease-in-out', 'infinite'),
                animationDelay: '0.6s',
              }}
            >
              〜
            </span>
            🍲
          </div>
        ),
      },
      {
        name: 'sparkZap',
        desc: '電撃スパーク点滅（scale .9→1.15、opacity .3→1）',
        // モック: 麻痺状態の雷マーク
        preview: (
          <span
            style={{
              fontSize: 24,
              color: '#e8d85b',
              display: 'inline-block',
              filter: 'drop-shadow(0 0 4px rgba(255,232,120,.8))',
              animation: anim('sparkZap', '1.2s'),
            }}
          >
            ⚡
          </span>
        ),
      },
      {
        name: 'dustRise',
        desc: '逃走時の砂埃（translate 0→-26px,-12px、scale .5→1.3）',
        // モック: width:10px; height:10px; border-radius:50%; background:rgba(180,170,150,.4)
        //         position:absolute; 逃走成功画面の下部に複数個
        preview: (
          <div style={{ position: 'relative', width: 70, height: 50 }}>
            <div
              style={{
                position: 'absolute',
                bottom: 4,
                left: '20%',
                width: 10,
                height: 10,
                borderRadius: '50%',
                background: 'rgba(180,170,150,.5)',
                animation: anim('dustRise', '1.5s'),
              }}
            />
            <div
              style={{
                position: 'absolute',
                bottom: 4,
                left: '50%',
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: 'rgba(180,170,150,.4)',
                animation: anim('dustRise', '1.5s', 'ease-in-out', 'infinite'),
                animationDelay: '0.4s',
              }}
            />
          </div>
        ),
      },
    ],
  },

  // -----------------------------------------------------------------------
  // 数値・ポップ・演出
  // -----------------------------------------------------------------------
  {
    title: '数値・ポップ・演出',
    effects: [
      {
        name: 'splatA',
        desc: 'ダメージ数値ポップ（通常攻撃・上昇テキスト）',
        // DamagePop variant="damage" で splatA keyframe を使用（_obsidian.scss 参照）
        preview: (
          <div
            style={{
              position: 'relative',
              width: 80,
              height: 70,
              background: '#0c0d11',
              borderRadius: 4,
              overflow: 'visible',
            }}
          >
            <span
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                fontSize: 22,
              }}
            >
              👹
            </span>
            <DamagePop
              value="231"
              variant="damage"
            />
          </div>
        ),
      },
      {
        name: 'splatB',
        desc: 'ダメージ数値ポップ（回復・splatB keyframe）',
        // DamagePop variant="heal" で splatB keyframe を使用
        preview: (
          <div
            style={{
              position: 'relative',
              width: 80,
              height: 70,
              background: '#0c0d11',
              borderRadius: 4,
              overflow: 'visible',
            }}
          >
            <span
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                fontSize: 22,
              }}
            >
              💚
            </span>
            <DamagePop
              value="+145"
              variant="heal"
            />
          </div>
        ),
      },
      {
        name: 'coinPop',
        desc: '🪙 が left:50% 基準から上に飛ぶ（translateY 0→-26px, scale .6→1）',
        // モック: position:absolute; left:50%; top:-6px; font-size:18px
        //         animation:coinPop 1.8s ease-in-out infinite
        //         ショップ購入確認時に 🪙 が上に飛ぶ
        preview: (
          <div style={{ position: 'relative', width: 80, height: 70 }}>
            {/* ショップボタン的な背景 */}
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: 8,
                right: 8,
                height: 28,
                borderRadius: 3,
                background: 'linear-gradient(180deg, #c9a86a, #b08f4f)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 10,
                color: '#0e0f13',
                fontWeight: 700,
              }}
            >
              購入
            </div>
            {/* 🪙 が left:50% から上昇 */}
            <span
              style={{
                position: 'absolute',
                left: '50%',
                top: 6,
                fontSize: 20,
                animation: anim('coinPop', '1.8s', 'ease-in-out'),
              }}
            >
              🪙
            </span>
          </div>
        ),
      },
      {
        name: 'healRise',
        desc: '回復数値「+96」が上昇（translateY 6px→-22px）',
        // モック: position:absolute; left:50%; top:30%; transform:translateX(-50%)
        //         font-family:Shippori Mincho; font-size:22px; color:#9ed8b4
        //         animation:healRise 2s ease-in-out infinite
        //         回復演出と採集アイテム取得時にも使われる
        preview: (
          <div style={{ position: 'relative', width: 70, height: 80 }}>
            <span
              style={{
                position: 'absolute',
                left: '50%',
                top: 24,
                transform: 'translateX(-50%)',
                fontFamily: 'Shippori Mincho, serif',
                fontSize: 20,
                color: '#9ed8b4',
                whiteSpace: 'nowrap',
                animation: anim('healRise', '2s'),
              }}
            >
              +96
            </span>
            <span
              style={{
                position: 'absolute',
                left: '28%',
                bottom: 10,
                fontSize: 11,
                color: '#9ed8b4',
                animation: anim('healRise', '2s', 'ease-in-out', 'infinite'),
                animationDelay: '0.5s',
              }}
            >
              ✦
            </span>
            <span
              style={{
                position: 'absolute',
                left: '62%',
                bottom: 10,
                fontSize: 11,
                color: '#9ed8b4',
                animation: anim('healRise', '2s', 'ease-in-out', 'infinite'),
                animationDelay: '0.9s',
              }}
            >
              ✦
            </span>
          </div>
        ),
      },
      {
        name: 'forgeSpark',
        desc: '鍛冶完成 ✦×3 スパーク（scale .5→1.3、opacity 0→1→0）',
        // モック: 鍛冶確認ダイアログで ✦ が3箇所（top-left, top-right, bottom）
        //         位置: position:absolute; top:-6px; left:-6px; font-size:16px
        //         animation:forgeSpark 1.3s ease-in-out infinite (+ delay .3s/.6s)
        preview: (
          <div style={{ position: 'relative', width: 60, height: 60 }}>
            {/* 武器アイコン的な背景 */}
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                fontSize: 24,
              }}
            >
              ⚔
            </div>
            <span
              style={{
                position: 'absolute',
                top: -2,
                left: -2,
                fontSize: 16,
                color: '#c9a86a',
                animation: anim('forgeSpark', '1.3s'),
              }}
            >
              ✦
            </span>
            <span
              style={{
                position: 'absolute',
                top: 8,
                right: -4,
                fontSize: 13,
                color: '#c9a86a',
                animation: anim('forgeSpark', '1.3s', 'ease-in-out', 'infinite'),
                animationDelay: '0.3s',
              }}
            >
              ✦
            </span>
            <span
              style={{
                position: 'absolute',
                bottom: 0,
                left: '30%',
                fontSize: 14,
                color: '#c9a86a',
                animation: anim('forgeSpark', '1.3s', 'ease-in-out', 'infinite'),
                animationDelay: '0.6s',
              }}
            >
              ✦
            </span>
          </div>
        ),
      },
      {
        name: 'sealStamp',
        desc: '封蝋シジルが translate(-50%,-50%) でスタンプ落下',
        // モック: position:absolute; top:50%; left:50%;
        //         animation:sealStamp 2.6s ease-in-out infinite;
        //         transform:translate(-50%,-50%) rotate(-6deg)
        //         ダイブ遷移演出・ギルド名確定時のシジル
        preview: (
          <div
            style={{
              position: 'relative',
              width: 72,
              height: 72,
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                width: 56,
                height: 56,
                borderRadius: '50%',
                background: 'radial-gradient(circle, #8a2f2a, #5e1f1c)',
                boxShadow: '0 0 16px rgba(138,47,42,.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                animation: anim('sealStamp', '2.6s'),
              }}
            >
              <div
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: '50%',
                  border: '1.5px solid rgba(233,201,160,.75)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <div
                  style={{
                    width: 10,
                    height: 10,
                    background: 'rgba(233,201,160,.9)',
                    transform: 'rotate(45deg)',
                  }}
                />
              </div>
            </div>
          </div>
        ),
      },
      {
        name: 'critFlash',
        desc: '会心時の黄金光フラッシュ（opacity 0→.85 inset glow）',
        // モック: position:absolute; inset:-16px; border-radius:50%;
        //         background:radial-gradient(circle,rgba(255,210,122,.6),transparent 65%)
        //         animation:critFlash 1.2s ease-in-out infinite
        //         敵スプライトの背後に重ねて使用。数値の splatA と一緒に使用。
        preview: (
          <div
            style={{
              position: 'relative',
              width: 70,
              height: 70,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {/* 会心光 */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(255,210,122,.7), transparent 65%)',
                animation: anim('critFlash', '1.4s'),
              }}
            />
            {/* 敵アイコン */}
            <span style={{ position: 'relative', fontSize: 30 }}>👹</span>
            {/* 会心ダメージ数値 */}
            <div
              style={{
                position: 'absolute',
                top: 4,
                left: '50%',
                fontFamily: 'Shippori Mincho, serif',
                fontWeight: 800,
                fontSize: 16,
                color: '#ffd9c9',
                textShadow: '0 0 10px rgba(212,103,79,.9)',
                animation: anim('splatA', '1.4s'),
              }}
            >
              会心
            </div>
          </div>
        ),
      },
    ],
  },

  // -----------------------------------------------------------------------
  // 揺れ・衝撃・逃走
  // -----------------------------------------------------------------------
  {
    title: '揺れ・衝撃・逃走',
    effects: [
      {
        name: 'shakeA',
        desc: '被弾揺れ（物理）— 敵スプライトが左右に揺れる',
        // モック: animation:shakeA .42s ease infinite
        //         <img src="assets/enemy_gatekeeper.png"> に適用。敵スプライト揺れ。
        preview: (
          <div
            style={{
              fontSize: 40,
              lineHeight: 1,
              animation: anim('shakeA', '0.8s', 'ease'),
            }}
          >
            👹
          </div>
        ),
      },
      {
        name: 'shakeB',
        desc: '被弾揺れ（魔法）— 敵スプライトが左右に揺れる',
        // モック: animation:shakeB .42s ease infinite
        //         物理とは交互（odd/even）で切り替わる
        preview: (
          <div
            style={{
              fontSize: 40,
              lineHeight: 1,
              animation: anim('shakeB', '0.8s', 'ease'),
            }}
          >
            🛡
          </div>
        ),
      },
      {
        name: 'hitFlash',
        desc: '被弾 overlay フラッシュ（赤い背景が一瞬出現）',
        // モック: position:absolute; inset:0; animation:hitFlash 1s ease-in-out infinite
        //         🛡 の背後（84x84 px のコンテナ全面）に重ねる
        preview: (
          <div
            style={{
              position: 'relative',
              width: 72,
              height: 72,
              borderRadius: 6,
              overflow: 'hidden',
              background: '#0c0d11',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                position: 'absolute',
                inset: 0,
                animation: anim('hitFlash', '1s'),
              }}
            />
            <span
              style={{
                position: 'relative',
                fontSize: 30,
                animation: anim('shakeB', '0.8s', 'ease'),
              }}
            >
              🛡
            </span>
          </div>
        ),
      },
      {
        name: 'dashAway',
        desc: '逃走キャラが translateX(0)→(60px) でフェードアウト',
        // モック: keyframes 定義のみ（本文中では speedLine と組み合わせて使用想定）
        preview: (
          <div style={{ overflow: 'hidden', width: 80, height: 50, position: 'relative' }}>
            <span
              style={{
                position: 'absolute',
                top: '50%',
                left: 0,
                transform: 'translateY(-50%)',
                fontSize: 26,
                animation: anim('dashAway', '1.5s', 'ease-in-out'),
              }}
            >
              🏃
            </span>
          </div>
        ),
      },
      {
        name: 'speedLine',
        desc: '逃走スピードライン（translateX -120%→320%、色グラデ）',
        // モック: position:absolute; top:24px; left:0; width:120px; height:3px
        //         background:linear-gradient(90deg,transparent,#9ed8b4)
        //         animation:speedLine 1.1s ease-in-out infinite
        //         逃走成功画面で緑/青/金色の3本が時差あり
        preview: (
          <div
            style={{
              overflow: 'hidden',
              width: 80,
              height: 50,
              position: 'relative',
              background: '#090a0d',
              borderRadius: 3,
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: 14,
                left: 0,
                width: 60,
                height: 3,
                borderRadius: 2,
                background: 'linear-gradient(90deg, transparent, #9ed8b4)',
                animation: anim('speedLine', '1.1s', 'ease-in-out'),
              }}
            />
            <div
              style={{
                position: 'absolute',
                top: 23,
                left: 0,
                width: 45,
                height: 3,
                borderRadius: 2,
                background: 'linear-gradient(90deg, transparent, #8fb6e0)',
                animation: anim('speedLine', '1.1s', 'ease-in-out', 'infinite'),
                animationDelay: '0.2s',
              }}
            />
            <div
              style={{
                position: 'absolute',
                top: 33,
                left: 0,
                width: 55,
                height: 3,
                borderRadius: 2,
                background: 'linear-gradient(90deg, transparent, #c9a86a)',
                animation: anim('speedLine', '1.1s', 'ease-in-out', 'infinite'),
                animationDelay: '0.35s',
              }}
            />
          </div>
        ),
      },
      {
        name: 'dissolveE',
        desc: '敵消滅 dissolve（opacity 1→.15、filter blur(4px) brightness(2)）',
        // モック: font-size:34px; animation:dissolveE 2s ease-in-out infinite
        //         👹 に直接適用。撃破演出。
        preview: (
          <div
            style={{
              fontSize: 40,
              lineHeight: 1,
              animation: anim('dissolveE', '2s'),
            }}
          >
            👹
          </div>
        ),
      },
    ],
  },

  // -----------------------------------------------------------------------
  // 攻撃エフェクト（敵スプライト重ね）
  // -----------------------------------------------------------------------
  {
    title: '攻撃エフェクト',
    effects: [
      {
        name: 'slash',
        desc: '斬撃バー（translate(-60%,-60%) から -42deg、scaleX 0→1）',
        // モック: keyframes 定義のみ（atkSlash/slashLR と区別して装備スキル向け）
        preview: (
          <div
            style={{
              position: 'relative',
              width: 70,
              height: 70,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span style={{ fontSize: 36 }}>👹</span>
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                width: 90,
                height: 4,
                background: 'linear-gradient(90deg, transparent, #ffd9c9 40%, #fff)',
                borderRadius: 2,
                boxShadow: '0 0 10px rgba(255,210,180,.9)',
                transformOrigin: 'left center',
                animation: anim('slash', '1.4s', 'ease'),
              }}
            />
          </div>
        ),
      },
      {
        name: 'atkSlash',
        desc: '斬撃エフェクト（slash 斬属性。sword 剣 / axe 斧 由来）',
        preview: (
          <div
            style={{
              position: 'relative',
              width: 100,
              height: 70,
              background: '#0c0d11',
              borderRadius: 4,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
            }}
          >
            <span style={{ fontSize: 34 }}>👹</span>
            <AttackFx element="slash" />
          </div>
        ),
      },
      {
        name: 'atkBlunt',
        desc: '打撃エフェクト（bash 壊属性。fist 素手 / staff 杖 由来）',
        preview: (
          <div
            style={{
              position: 'relative',
              width: 70,
              height: 70,
              background: '#0c0d11',
              borderRadius: 4,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
            }}
          >
            <span style={{ fontSize: 34 }}>👹</span>
            <AttackFx element="bash" />
          </div>
        ),
      },
      {
        name: 'atkThrust',
        desc: '突きエフェクト（pierce 突属性。spear 槍 / bow 弓 由来）',
        preview: (
          <div
            style={{
              position: 'relative',
              width: 100,
              height: 70,
              background: '#0c0d11',
              borderRadius: 4,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
            }}
          >
            <span style={{ fontSize: 34 }}>👹</span>
            <AttackFx element="pierce" />
          </div>
        ),
      },
      {
        name: 'atkMagic',
        desc: '無属性魔法エフェクト（almighty 万能属性）',
        preview: (
          <div
            style={{
              position: 'relative',
              width: 70,
              height: 70,
              background: '#0c0d11',
              borderRadius: 4,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
            }}
          >
            <span style={{ fontSize: 34 }}>👹</span>
            <AttackFx element="almighty" />
          </div>
        ),
      },
      {
        name: 'atkFire',
        desc: '火属性エフェクト（fire）',
        preview: (
          <div
            style={{
              position: 'relative',
              width: 70,
              height: 70,
              background: '#0c0d11',
              borderRadius: 4,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
            }}
          >
            <span style={{ fontSize: 34 }}>👹</span>
            <AttackFx element="fire" />
          </div>
        ),
      },
      {
        name: 'atkIce',
        desc: '氷属性エフェクト（ice）',
        preview: (
          <div
            style={{
              position: 'relative',
              width: 70,
              height: 70,
              background: '#0c0d11',
              borderRadius: 4,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
            }}
          >
            <span style={{ fontSize: 34 }}>👹</span>
            <AttackFx element="ice" />
          </div>
        ),
      },
      {
        name: 'atkVolt',
        desc: '雷属性エフェクト（volt）',
        preview: (
          <div
            style={{
              position: 'relative',
              width: 70,
              height: 70,
              background: '#0c0d11',
              borderRadius: 4,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
            }}
          >
            <span style={{ fontSize: 34 }}>👹</span>
            <AttackFx element="volt" />
          </div>
        ),
      },
      {
        name: 'thrustLine',
        desc: '刺突の水平移動線（translateX -40px→8px）',
        // モック: thrustLine は thrustUp と一緒に使用想定（敵への水平接近線）
        preview: (
          <div
            style={{
              position: 'relative',
              width: 80,
              height: 50,
              overflow: 'hidden',
              background: '#0c0d11',
              borderRadius: 4,
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '10%',
                width: 60,
                height: 3,
                marginTop: -1,
                background: 'linear-gradient(90deg, transparent, #cfe0ff 60%, #fff)',
                borderRadius: 2,
                boxShadow: '0 0 8px rgba(207,224,255,.9)',
                animation: anim('thrustLine', '1.2s', 'ease'),
              }}
            />
          </div>
        ),
      },
      {
        name: 'ringExpand',
        desc: '打撃衝撃波リングが scale .2→1.8 で拡散',
        // モック: 打撃セルで width:80px; height:80px; border:3px solid #ffe0a0;
        //         border-radius:50%; animation:ringExpand .9s ease-out infinite
        preview: (
          <div
            style={{
              width: 60,
              height: 60,
              borderRadius: '50%',
              border: '3px solid #ffe0a0',
              boxShadow: '0 0 8px rgba(255,224,160,.5)',
              animation: anim('ringExpand', '1.2s', 'ease-out'),
            }}
          />
        ),
      },
      {
        name: 'runeSpin',
        desc: '魔法陣外輪が rotate 0→180deg + scale .6→1.3',
        // モック: 魔法セルで width:66px; height:66px; border:1px solid rgba(224,192,255,.7);
        //         border-radius:50%; animation:runeSpin 1.05s ease-out infinite
        preview: (
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: '50%',
              border: '1.5px solid rgba(224,192,255,.8)',
              boxShadow: '0 0 10px rgba(155,89,182,.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              animation: anim('runeSpin', '1.5s', 'ease-out'),
            }}
          >
            <span style={{ fontSize: 18, color: '#e0c0ff' }}>✦</span>
          </div>
        ),
      },
    ],
  },

  // -----------------------------------------------------------------------
  // 状態異常・サモン
  // -----------------------------------------------------------------------
  {
    title: '状態異常・サモン',
    effects: [
      {
        name: 'poisonWisp',
        desc: '毒状態の小さな紫丸が上昇（translateY 0→-16px、scale 1→1.3）',
        // モック: keyframes 定義のみ（ailDrift と似た用途だが毒専用）
        //         小さな丸が霧状に上昇するイメージ
        preview: (
          <div style={{ position: 'relative', width: 60, height: 70 }}>
            <div
              style={{
                position: 'absolute',
                bottom: 10,
                left: '35%',
                width: 10,
                height: 10,
                borderRadius: '50%',
                background: '#c79be0',
                boxShadow: '0 0 6px rgba(199,155,224,.7)',
                animation: anim('poisonWisp', '2s'),
              }}
            />
            <div
              style={{
                position: 'absolute',
                bottom: 16,
                left: '60%',
                width: 7,
                height: 7,
                borderRadius: '50%',
                background: '#c79be0',
                boxShadow: '0 0 4px rgba(199,155,224,.5)',
                animation: anim('poisonWisp', '2s', 'ease-in-out', 'infinite'),
                animationDelay: '0.7s',
              }}
            />
            <span style={{ position: 'absolute', bottom: 0, left: '10%', fontSize: 28 }}>🐍</span>
          </div>
        ),
      },
      {
        name: 'ailDrift',
        desc: '状態異常の色丸が上昇（translateY 2px→-14px、scale .8→1.1）',
        // モック: position:absolute; top:34px; left:48%; width:6px; height:6px;
        //         border-radius:50%; background:#c79be0
        //         animation:ailDrift 1.8s ease-in-out infinite（毒状態の敵スプライト周辺）
        //         また ailDrift 用 SVG（毒雫・眠りSVG）にも適用
        preview: (
          <div
            style={{
              position: 'relative',
              width: 60,
              height: 70,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {/* 毒 SVG */}
            <svg
              width="26"
              height="34"
              viewBox="0 0 34 44"
              style={{
                position: 'absolute',
                bottom: 16,
                left: '50%',
                marginLeft: -13,
                filter: 'drop-shadow(0 0 5px rgba(199,155,224,.7))',
                animation: anim('ailDrift', '1.8s'),
              }}
            >
              <path
                d="M17 2 C25 16 30 22 30 30 A13 13 0 1 1 4 30 C4 22 9 16 17 2 Z"
                fill="#c79be0"
              />
            </svg>
            <div
              style={{
                position: 'absolute',
                bottom: 8,
                left: '30%',
                width: 5,
                height: 5,
                borderRadius: '50%',
                background: '#c79be0',
                animation: anim('ailDrift', '1.8s', 'ease-in-out', 'infinite'),
                animationDelay: '0.9s',
              }}
            />
          </div>
        ),
      },
      {
        name: 'summonAppear',
        desc: '召喚 🔥 が scale .3→1 + translateY 8px→0 で出現',
        // モック: font-size:34px; animation:summonAppear 2s ease-in-out infinite
        //         「召喚出現」セルで 🔥 に直接適用
        preview: (
          <div
            style={{
              fontSize: 40,
              lineHeight: 1,
              animation: anim('summonAppear', '2s'),
            }}
          >
            🔥
          </div>
        ),
      },
    ],
  },

  // -----------------------------------------------------------------------
  // その他（UI・警告）
  // -----------------------------------------------------------------------
  {
    title: 'その他',
    effects: [
      {
        name: 'warnBlink',
        desc: 'セーブ破損カード・カーソルが steps(1) で点滅',
        // モック: セーブ破損カード全体（padding:16px; border:1px solid rgba(212,103,79,.5)）
        //         ギルド名入力カーソル（width:2px; height:28px; background:#c9a86a）
        //         animation:warnBlink 1.6s steps(1) infinite / 1s steps(1) infinite
        preview: (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center' }}>
            {/* 破損カード的なバッジ */}
            <div
              style={{
                padding: '5px 10px',
                borderRadius: 3,
                border: '1px solid rgba(212,103,79,.6)',
                background: 'rgba(212,103,79,.08)',
                fontSize: 10,
                color: '#e09180',
                fontWeight: 700,
                animation: anim('warnBlink', '1.6s', 'steps(1)'),
              }}
            >
              ⚠ 警告
            </div>
            {/* 入力カーソル */}
            <div
              style={{
                width: 2,
                height: 22,
                background: '#c9a86a',
                animation: anim('warnBlink', '1s', 'steps(1)'),
              }}
            />
          </div>
        ),
      },
    ],
  },
];

// ---------------------------------------------------------------------------
// コンポーネント
// ---------------------------------------------------------------------------

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
