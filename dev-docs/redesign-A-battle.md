# フェーズ 2: battle 画面リデザイン（sonnet 用指示書） — **改訂版 v2 — モック忠実化**

> **改訂理由**: 前回の実装は「色味は黒曜化したが、ボタン配置・コマンドパネル・敵カード・行動順帯
> など、画面構成そのものがモックと大幅にズレてしまった」。
> **本改訂の方針: モック忠実化を最優先**。前回の「機能優先で省略」ジャッジは原則撤回する。
> モックに描かれている要素はすべて配置する。disabled でも形と位置は維持する。
>
> **加えて、行動順帯（モック line 996）の機能を実装する**。AGI 順で並ぶ「順 ⚔ ◯ ◯ ◯ ◯ …」のバー。
> このバーは既存ロジック (`resolveTurnOrder` in `src/domain/combat.ts`) を再利用して UI に出す。

`dev-docs/redesign-A.md`（**§1.1〜§1.4 トークン** / **§1.5 レイアウト運用ルール**）と
`dev-docs/redesign-A-title.md` / `dev-docs/redesign-A-title-fix.md` を **必ず先に読むこと**。

モック原本: `/tmp/sekaiju-design/案A_v2.dc.html` line 987〜1123。
- `9a interactive main` — 戦闘の通常画面（line 989〜1073）
- `9b intro` — 戦闘開始（line 1076〜1085）
- `9d defeat` — 全滅（line 1094〜1104）
- `9e flee` — 逃走成功（line 1107〜1123）

---

## 1. 触ってよいファイル / 触ってはいけないファイル

### 触ってよい

| 区分 | パス | 操作 |
| --- | --- | --- |
| 編集 | `src/pages/battle/index.tsx` | マークアップを **モック構造に揃える**。**特に「行動順帯」を新規追加**。コマンドパネル・敵カード・味方カード・ログ・リザルト・敗北・逃走の各セクションをモック準拠の構造に組み直す。**hook / useState / useEffect / useCallback の構成・ロジック・event handler の実体・依存配列は触らない** |
| 編集 | `src/pages/battle/style.module.scss` | 黒曜テーマで全面再構築（`@use 'variables'` を外し `var(--*)` に切替） |
| 編集 | `src/pages/battle/Battle.stories.tsx` | 既存 4 ストーリー（`Default` / `NoLog` / `SkillMenu` / `BossEncounter`）を維持。`TurnOrderBar` を追加（行動順帯の検証用） |
| **編集（条件付き）** | `src/domain/combat.ts` | **`resolveTurnOrder` の export はそのまま**。**追加 export として `previewTurnOrder(state: BattleState, rng: Rng): Combatant[]` を新規追加してよい**。実体は既存の `resolveTurnOrder` を呼ぶラッパで、`[...state.allies, ...state.enemies, ...state.summons]` を渡す。テスト 1 件追加 (`combat.test.ts`)。**ロジック自体は変更しない** |
| **編集（条件付き）** | `src/domain/types.ts` | **`BattleState` の型変更は禁止**。`Combatant` の型も触らない。`previewTurnOrder` の戻り値型は既存の `Combatant[]` をそのまま使う |

### 触ってはいけない

- 共通コンポーネント: `StatBar`, `BattleExpBar`, `InkSplatter`, `EnemySprite`, `CharacterPortrait`, `ResistBadges`, `SkillTree`, `EncounterGauge`, `DungeonMap`, `FirstPersonView`
- ドメイン: `src/domain/battle.ts`（**`resolveTurn` / `startBattle` / `battleRewards` / `applyBattleResult` などのロジック関数を変えない**）, `src/domain/strategy.ts`, `union.ts`, `passives.ts`, `ailment.ts`
- ストア: `src/store/gameState.tsx`, `saveStore.ts`, `navigation.tsx`
- データ: `src/data/battleSkills.ts`, `enemies.ts`
- 全画面共通: `src/_variables.scss`, `src/_obsidian.scss`, `src/index.scss`, `index.html`
- 他画面の `src/pages/*/`

## 2. やってはいけないこと

- **自分で Edit / Write / Bash を使って実装すること。さらに `Agent` / `Task` を spawn しないこと**（孫委譲禁止）。
- `useState` / `useRef` / `useCallback` / `useEffect` の依存配列・実行順を変えない（戦闘ログ逐次再生・anim フェーズ・自動コマンド生成のタイミングが崩れる）。
- 既存テスト (`__tests__` / `index.test.tsx` 配下・`combat.test.ts`) の assert 文を変えない（**`combat.test.ts` の `'combat: turn order'` describe は既存。新規テストは別 describe で追加**）。
- 攻撃エフェクト（モック line 1087 の 7 種攻撃 SVG）の追加実装はしない。`InkSplatter` 経由の責務。
- 写本テーマ由来の SCSS 変数 (`$parchment` 等) を新規参照しない。
- **モックに描かれている要素を「機能が無いから」と省略しない**。disabled / 形だけでもよいので必ず配置する。

## 3. モックとの差分一覧（**現状の実装 → モック**）

### 3.1 ヘッダ（モック line 994〜998）

1. **章マーク「`❦ 戦闘 ・ F{depth}`」**: モックは Shippori Mincho 12px / letter-spacing .3em / `var(--gold)`。**現状実装は文言・色が違うことがある**。揃える。
2. **「リザルト例 ▸」チップ**: モックには右上にデバッグ用のチップがあるが、**これは省略**（モックでもデバッグ用と注記あり）。
3. **行動順帯（モック line 996）— 機能追加対象**: 後述 §4 で独立 Step として扱う。**現状実装には行動順帯が存在しない**ので新規追加。
4. **ログプレビュー**: モックは `border-left: 2px solid var(--gold); padding-left: 8px; font-family: var(--font-mono); font-size: 10px; line-height: 1.5; color: var(--text-mute);` の 2 行 + 「`タップで全ログ`」のヒント。
   - ダメージ数値はオレンジ系 (`var(--danger-text)`)、状態異常付与は紫系 (`#c79be0`)、状態異常付与の文言は inline で色付け。
   - **現状実装は左罫線が無い or 色が違う**。揃える。

### 3.2 敵エリア（モック line 1000〜1029）

5. **ボスカード（line 1002〜1014）**: ボス 1 体のとき、120x92px の大型カード + HP バー (4px high gradient red→orange) + HP% + 属性バッジ (氷弱 / 火耐) + 状態異常バッジ (`毒3` など) + 状態異常パーティクル + 被弾時の dmg pop / 会心 label。**現状実装は様式が違う**。揃える。
6. **雑魚カード**: 62px wide + 42px high glyph + 名前 + HP バー + 状態異常バッジ。**現状実装は枠サイズが違う**。揃える。
7. **召喚体カード（line 1029）**: 「`召喚体 ・ N/3`」の見出し (`font-size: 9px; letter-spacing: .18em; color: #8fd0a0;`) + 3 カードの横並び。各カードは `background: rgba(143,208,160,.06); border: 1px solid rgba(143,208,160,.25); border-radius: 3px;`。**現状実装は緑系の見た目が違う**。揃える。

### 3.3 味方エリア（モック line 1032〜1058）

8. **前衛セクション見出し**: 「`前衛`」9px gold letter-spacing .18em。**現状実装は文言が違う**ことがある。揃える。
9. **前衛 3x1 grid**: `grid-template-columns: 1fr 1fr 1fr; gap: 6px;`。各カードは 18px ポートレイト + 名前 + 作戦ラベル (3px round chip) + HP/TP/U の 3 段バー + コマンドラベル + 状態異常マーク + U! バッジ（unionReady のとき右上に金色 chip）。**現状実装はバーの段数が違うことがある**。**3 段バー**を揃える。
10. **後衛セクション見出し**: 「`後衛 近接被ダメ −30%`」9px blue letter-spacing .18em + サブテキスト。
11. **後衛 2 ぶん grid**: `grid-template-columns: repeat(2, calc((100% - 12px)/3)); justify-content: center; gap: 6px;` で **3 列分の真ん中 2 列に詰める**形（モック）。**現状実装は左寄せの 2 列**。**モック準拠で中央寄せの 2 ぶん**にする。

### 3.4 コマンドパネル（モック line 1060〜1067）

12. **global コマンド**: 「たたかう」(50px primary 金箔ボタン) + 「さくせん」(青系 outline) + 「にげる」(赤系 outline) の上下構成。**現状実装はボタンの形・配色が違う**。揃える。
13. **individual コマンド**: 「`▸ {activeName} の行動`」見出し + 「攻撃」(46px primary) + 「スキル」(青 outline) の上段、「道具」(緑 outline 40px) + 「防御」(白 outline 40px) + 「もどる」(62px グレー outline) の下段。**現状実装は順序・色が違う**。揃える。**「道具」「防御」が disabled でも形は残す**。
14. **skill 選択**: 「`スキル選択 ・ {activeName}`」と `TP {tp}/{maxTp}` の右寄せ表示 + grid-auto-flow column / 2 段 / 106px wide のスキルカード横スクロール + 「← 横スクロール（2段）→」の補助テキスト + 「もどる」(36px outline)。**現状実装は縦リスト or 異なる構造**。横スクロール 2 段に変える。
15. **strategy 選択**: 「`作戦変更 ・ {activeName}`」見出し + 5 段の作戦選択リスト + 「もどる」outline。**現状実装は実装無し or 異なる**。
16. **target 選択**: 「`対象を選択 — 上の敵をタップ`」12px gold + 「`単体対象 ／ 全体技は敵列すべてに適用`」10px mute + 「もどる」outline + 「確定」primary の 2 ボタン。

### 3.5 ログ オーバーレイ（モック line 1069）

17. ログタップ → `position: absolute; inset: 0; z-index: 20; background: rgba(6,7,10,.93); padding: 20px 18px;` の全画面オーバーレイ。「`戦闘ログ`」見出し + ターンごとに区切られた全ログ。**現状実装は様式が違う**。揃える。

### 3.6 リザルト / 敗北 / 逃走（モック 9a 末尾 / 9d / 9e）

18. **リザルト** (line 1071): 全画面オーバーレイ + 「`勝利`」見出し (Shippori Mincho 20px gold letter-spacing .2em) + 「`獲得経験値`」 + EXP バー + レベルアップカード + 「`ドロップ`」 + 「`獲得ゴールド`」 + 「ダンジョンへ戻る」primary ボタン。
19. **敗北** (line 1094〜1103): 「`全滅`」46px Shippori Mincho `var(--danger)` letter-spacing .3em text-shadow + 「`隊商は塔に呑まれた…\n最後の自動記録から再開できます。`」 + 「拠点へ戻る」outline + フッタに到達 / 撃破統計。
20. **逃走** (line 1107〜1123): 横方向の speed line + 「`逃走成功`」30px Shippori Mincho 緑 + 「`隊商は退路を確保した。`」 + 「探索へ戻る」primary。

---

## 4. **行動順帯（新規機能）** — モック line 996 準拠

### 4.1 仕様

- **位置**: ヘッダ内、章マークとログプレビューの間。ヘッダの内側で 1 行使う。
- **構成**: 左端に「`順`」(9px letter-spacing .14em `var(--text-faint)`) + 右に **アイコン列 (overflow-x: auto + flex-wrap: nowrap)**。
- **アイコンサイズ**: 28x28px（現在行動中のキャラは 30x30px + 金箔枠 + box-shadow）。`border-radius: 4px`。
- **中身**:
  - 味方: `CharacterPortrait` を 24px で center。
  - 敵: `EnemySprite` を 24px で center。
  - 召喚体: `font-size: 14px;` の絵文字（既存 `summon.glyph` 相当）。
- **強調ロジック**:
  - **現在行動中** (idx === 0 で表示時、行動順帯の先頭): `border: 2px solid var(--gold); box-shadow: 0 0 8px rgba(201,168,106,.4);` + scale なし（モックは scale 無しの border 強調のみ）。
  - **未行動**: `border: 1px solid rgba(212,103,79,.6)` (敵 = 赤系) または `border: 1px solid var(--rule-base)` (味方 = 中間グレー)。
  - **既に行動済み**: opacity .35 に落とす（このターン解決中の場合）。
  - 末尾の「`…`」(`font-size: 10px; color: var(--text-quote);`): 行動順が画面幅を超えた時の省略マーク。
- **行動順の取得**: `previewTurnOrder(state, rng)` を `src/domain/combat.ts` に追加し、UI 側で `useMemo` で 1 度計算する（rngRef は既存のものを使い回す。1 ターン中は決定的な順序が要るので **rng の seed をターン番号と organism-id 由来で固定化** する。実装の簡略化のため、`createRng((state.turn * 0x9e3779b9) >>> 0)` で **ローカル ephemeral rng** を作って渡す）。
- **「既に行動済み / 未行動」の区別**: 戦闘の逐次再生 (`anim.revealed`) 中は「現在進行中の actor を強調」する必要があるが、実装難度が高い。**現状の改訂では「次ターンの予測行動順」を出すだけで OK**（モックは次ターンの予測順を見せる UX として成立する）。
  - つまり実装は「ターン開始時に `previewTurnOrder` を計算 → 全員 `border` 状態で並べる」だけで OK。
  - **「行動済み」状態の表現は本改訂版ではスキップ**してよい（オリジナル機能拡張で、モックに「行動済み」の状態区別は描かれていないため）。

### 4.2 データ取得経路

```ts
import { previewTurnOrder } from '@/domain/combat';
// ...
const turnOrder = useMemo(() => {
  if (!state) return [];
  const ephemeralRng = createRng((state.turn * 0x9e3779b9) >>> 0);
  return previewTurnOrder(state, ephemeralRng);
}, [state?.turn, state?.allies, state?.enemies, state?.summons]);
```

### 4.3 `previewTurnOrder` 実装（追加）

```ts
// src/domain/combat.ts に追加
import type { BattleState } from './types';

/**
 * UI 表示用に、次ターンの行動順を予測して返す（[03 §10] と同じロジック）。
 * resolveTurn 内部の rng 消費とは別系統の ephemeral rng を呼び出し側が渡す。
 */
export function previewTurnOrder(state: BattleState, rng: Rng): Combatant[] {
  return resolveTurnOrder(
    [...state.allies, ...state.enemies, ...state.summons],
    rng
  );
}
```

### 4.4 UI 配置

ヘッダ内、章マーク下、ログプレビュー上。

```tsx
<div className={styles.turnOrderBar}>
  <span className={styles.turnOrderLabel}>順</span>
  <div className={styles.turnOrderList}>
    {turnOrder.slice(0, 8).map((c, i) => (
      <div
        key={c.id}
        className={`${styles.turnOrderCell} ${i === 0 ? styles.turnOrderCellActive : ''} ${c.side === 'enemy' ? styles.turnOrderCellEnemy : ''}`}
      >
        {c.side === 'ally' ? (
          <CharacterPortrait raceId={c.raceId!} classId={c.classId!} size={24} />
        ) : c.enemyId ? (
          <EnemySprite enemyId={c.enemyId} size="xs" />
        ) : (
          <span className={styles.turnOrderCellGlyph}>{c.summonGlyph ?? '✦'}</span>
        )}
      </div>
    ))}
    {turnOrder.length > 8 && <span className={styles.turnOrderEllipsis}>…</span>}
  </div>
</div>
```

```scss
.turnOrderBar {
  display: flex;
  align-items: center;
  gap: 5px;
  margin-bottom: 7px;
  overflow: hidden;
}
.turnOrderLabel {
  font-size: 9px;
  letter-spacing: .14em;
  color: var(--text-faint);
  flex: none;
}
.turnOrderList {
  display: flex;
  gap: 5px;
  overflow-x: auto;
  scrollbar-width: none;
  flex: 1;
}
.turnOrderList::-webkit-scrollbar { display: none; }
.turnOrderCell {
  width: 28px;
  height: 28px;
  border-radius: 4px;
  border: 1px solid var(--rule-base);
  background: var(--bg-deep);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  flex: none;
}
.turnOrderCellEnemy {
  border-color: rgba(212, 103, 79, .6);
}
.turnOrderCellActive {
  width: 30px;
  height: 30px;
  border: 2px solid var(--gold);
  box-shadow: 0 0 8px rgba(201, 168, 106, .4);
}
.turnOrderCellGlyph { font-size: 14px; }
.turnOrderEllipsis {
  font-size: 10px;
  color: var(--text-quote);
  flex: none;
}
```

### 4.5 行動順帯の検証用ストーリー

```tsx
export const TurnOrderBar: Story = {
  decorators: [withGameContext(mockBattle, { name: 'battle' })],
  args: {
    __storyMockEnemyIds: [...MAX_ZAKO_ENEMY_IDS],
  },
  // 上端の行動順帯に味方 5 + 敵 6 が並んでいることを Storybook で目視確認するため
  // 専用の play 関数は不要。Default ストーリーとの差はラベル名のみ。
};
```

### 4.6 デザイン責任

**行動順帯はオリジナル機能拡張**（モックには概念だけ載っているが詳細仕様は無い）。
モックとデザイン上の差異が生じる場合は、本指示書のスタイルを正解とする。
モック原本との完全一致を求めない（ただし、モック line 996 の見た目は最大限尊重する）。

---

## 5. ゴール（Storybook ストーリー一覧）

`Pages/Battle` 配下で以下 5 ストーリーが黒曜カラーで描画され、
`yarn lint` / `yarn test --run` / `yarn tsc -b`（または `yarn build`）が緑。

1. **`Default`**（mockBattle・雑魚 6 + 味方 5）— ヘッダー（章マーク + 行動順帯 + ログプレビュー）+ 敵エリア + 召喚エリア + 味方エリア（前衛 3 + 後衛 2 中央寄せ）+ コマンドパネル（global）
2. **`NoLog`**（同上・ログプレビュー短）
3. **`SkillMenu`**（mockBattleSkillMenu）— individual モードでスキル選択中の横スクロール 2 段カード
4. **`BossEncounter`**（mockBossBattle）— ボス（md）+ 雑魚 3 + 味方 5・対象選択中（ボスに ring）
5. **`TurnOrderBar`**（追加）— Default と同じだが、行動順帯の目視検証専用

---

## 6. 実装ステップ

### Step 0. 旧 `@use 'variables'` を外す

`src/pages/battle/style.module.scss` の冒頭 `@use 'variables' as var;` を **削除**。
すべての色を `var(--*)` で書き直す。

### Step 1. `previewTurnOrder` を `src/domain/combat.ts` に追加

`resolveTurnOrder` の直下に `previewTurnOrder` を追加。**ロジックは既存関数を再利用するラッパに留める**。
テストは `src/domain/combat.test.ts` に 1 件追加（既存 describe `'combat: turn order'` の下に **新しい test として追加**。describe を増やさない）。

### Step 2. ルートレイアウト

```scss
.layout {
  display: flex;
  flex-direction: column;
  height: 100dvh;
  max-width: 560px;
  margin: 0 auto;
  padding: 0 0 max(12px, env(safe-area-inset-bottom, 0px));
  overflow: hidden;
  background: var(--bg-deep);
  color: var(--text-base);
  font-family: var(--font-body);
}
```

### Step 3. ヘッダ（章マーク + 行動順帯 + ログプレビュー）

```tsx
<header className={styles.head}>
  <div className={styles.chapterRow}>
    <span className={styles.chapter}>❦ 戦闘 ・ F{state.depth}</span>
  </div>
  {/* 行動順帯（§4 の構造を貼り付け） */}
  <div className={styles.turnOrderBar}>...</div>
  {/* ログプレビュー */}
  <button type="button" className={styles.logPreview} onClick={() => setLogOpen(true)}>
    {recentLogEntries(state.log).map((line, i) => <div key={i}>{line}</div>)}
    <span className={styles.logPreviewHint}>（タップで全ログ）</span>
  </button>
</header>
```

```scss
.head {
  flex: 0 0 auto;
  padding: 11px 14px 9px;
  background: linear-gradient(180deg, rgba(20, 16, 18, .96), rgba(11, 12, 16, .35));
}
.chapterRow {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 7px;
}
.chapter {
  font-family: var(--font-display);
  font-size: 12px;
  letter-spacing: .3em;
  color: var(--gold);
}
.logPreview {
  cursor: pointer;
  border-left: 2px solid var(--gold);
  padding: 0 0 0 8px;
  font-family: var(--font-mono);
  font-size: 10px;
  line-height: 1.5;
  color: var(--text-mute);
  background: transparent;
  border-top: 0;
  border-right: 0;
  border-bottom: 0;
  text-align: left;
  width: 100%;
}
.logPreviewHint {
  color: var(--text-quote);
  margin-left: 6px;
}
```

### Step 4. 敵エリア（モック準拠）

```tsx
<section className={styles.enemyArea}>
  <div className={styles.enemyList}>
    {state.enemies.map((e) => (
      isBoss(e) ? <BossCard ... /> : <ZakoCard ... />
    ))}
  </div>
  {/* 召喚体 */}
  {state.summons.length > 0 && (
    <div className={styles.summonsWrap}>
      <span className={styles.summonsHead}>召喚体 ・ {alive}/{max}</span>
      <div className={styles.summonsList}>...</div>
    </div>
  )}
</section>
```

```scss
.enemyArea {
  flex: 0 0 auto;
  position: relative;
  padding: 14px 12px 12px;
  background: radial-gradient(95% 85% at 50% 16%, #241b22, var(--bg-deep) 78%);
}
.enemyList {
  display: flex;
  align-items: flex-end;
  justify-content: center;
  gap: 8px;
  flex-wrap: wrap;
}
/* BossCard / ZakoCard はモック準拠の寸法・色を厳守 */
.summonsWrap { margin-top: 12px; }
.summonsHead {
  font-size: 9px;
  letter-spacing: .18em;
  color: #8fd0a0;
  margin-bottom: 5px;
  display: block;
}
.summonsList { display: flex; gap: 6px; }
```

### Step 5. 味方エリア（前衛 / 後衛）

```tsx
<section className={styles.allyArea}>
  <span className={styles.allyHeadFront}>前衛</span>
  <div className={styles.allyFront}>
    {alliesFront.map((a) => <AllyCard ... />)}
  </div>
  <span className={styles.allyHeadBack}>
    後衛 <span className={styles.allyHeadBackSub}>近接被ダメ −30%</span>
  </span>
  <div className={styles.allyBack}>
    {alliesBack.map((a) => <AllyCard ... />)}
  </div>
</section>
```

```scss
.allyArea {
  flex: 0 0 auto;
  padding: 12px 12px 8px;
  border-top: 1px solid var(--rule-soft);
}
.allyHeadFront {
  display: block;
  font-size: 9px;
  letter-spacing: .18em;
  color: var(--gold);
  margin: 0 0 5px;
}
.allyFront {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 6px;
  margin-bottom: 8px;
}
.allyHeadBack {
  display: block;
  font-size: 9px;
  letter-spacing: .18em;
  color: var(--text-blue);
  margin: 0 0 5px;
}
.allyHeadBackSub {
  color: var(--text-quote);
  letter-spacing: 0;
}
.allyBack {
  /* モック準拠で中央 2 列に詰める */
  display: grid;
  grid-template-columns: repeat(2, calc((100% - 12px) / 3));
  justify-content: center;
  gap: 6px;
}
```

### Step 6. コマンドパネル（4 モード）

```tsx
<section className={styles.commandPanel}>
  {uiMode.kind === 'global' && <GlobalCommands ... />}
  {uiMode.kind === 'individual' && <IndividualCommands ... />}
  {skillMenu && <SkillMenuPanel ... />}
  {uiMode.kind === 'strategy' && <StrategyPanel ... />}
  {uiMode.kind === 'target' && <TargetPanel ... />}
</section>
```

```scss
.commandPanel {
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  background: linear-gradient(180deg, rgba(11, 12, 16, 0), var(--surface-card) 30%);
  padding: 12px 14px 14px;
}
```

各モードのボタンスタイルはモック準拠で厳密に再現。

```scss
/* global: たたかう / さくせん / にげる */
.globalPrimary {
  height: 50px;
  border-radius: 3px;
  background: linear-gradient(180deg, var(--gold), var(--gold-deep));
  color: var(--bg-deep);
  font-weight: 700;
  font-size: 15px;
  letter-spacing: .12em;
}
.globalStrategy {
  flex: 1;
  height: 44px;
  border-radius: 3px;
  border: 1px solid rgba(143, 182, 224, .5);
  background: rgba(111, 159, 216, .1);
  color: #9cc2ec;
  font-size: 14px;
}
.globalFlee {
  flex: 1;
  height: 44px;
  border-radius: 3px;
  border: 1px solid rgba(212, 103, 79, .45);
  background: transparent;
  color: var(--danger-text);
  font-size: 14px;
}

/* individual: 攻撃 / スキル / 道具 / 防御 / もどる */
.individualAttack { /* primary 46px */ }
.individualSkill { /* 青系 outline 46px */ }
.individualItem { /* 緑系 outline 40px */ }
.individualGuard { /* 白系 outline 40px */ }
.individualBack { /* グレー 62px */ }

/* skill: 横スクロール 2 段 */
.skillGrid {
  display: grid;
  grid-auto-flow: column;
  grid-template-rows: 1fr 1fr;
  grid-auto-columns: 106px;
  gap: 7px;
  overflow-x: auto;
  padding-bottom: 6px;
}
.skillScrollHint {
  font-size: 8px;
  color: var(--text-quote);
  text-align: right;
  margin-top: 2px;
}
```

### Step 7. ログオーバーレイ / リザルト / 敗北 / 逃走

各オーバーレイは `position: absolute; inset: 0; z-index: 20;` のレイヤーで、モック準拠の色とフォントで実装。
**マークアップ構造は新規ではなく、現状実装のオーバーレイを SCSS だけ調整するイメージ**。文言・hook 呼び出しは触らない。

### Step 8. 反転した「機能優先」方針の取り扱い

- 「リザルト例 ▸」デバッグチップは省略（モックでもデバッグ用注記あり）。**例外**として明記。
- 「道具」「防御」ボタンは既存実装で機能無しの場合 disabled で残す。**位置・形は維持**。
- 「作戦変更」は既存実装が動いていれば既存どおり。動いていない場合は disabled。
- 行動順帯の「行動済み / 未行動」状態区別はスキップ（§4.1 参照）。**例外**として明記。

## 7. 検証

```
yarn lint
yarn test --run
yarn tsc -b
```

3 点すべて緑。`combat.test.ts` に追加した `previewTurnOrder` のテスト（1 件）も含めて緑。

## 8. コミット

```
feat(redesign-A): rebuild battle page to match mock v2 (改訂版)

- add turn-order bar (previewTurnOrder helper + UI band)
- chapter mark + gold-bordered log preview per mock
- enemy area: boss-card + zako-card sizes per mock
- ally area: front 3-col + back 2-col centered per mock
- command panel: global / individual / skill (2-row scroll) / strategy / target per mock
- log / result / defeat / flee overlays per mock

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
```

push 不要。SHA を最終応答で報告。

---

## 機能優先で残す例外（必ず最終応答で明記）

- 「リザルト例 ▸」デバッグチップ: 省略（モックでもデバッグ用と注記あり）。
- 行動順帯の「行動済み / 未行動」状態区別: 本改訂版ではスキップ（次ターン予測順のみ表示）。理由: モックに「行動済み」状態が描かれていない & 実装難度（逐次再生中の現在 actor index を取り回す必要あり）。
- 7 種攻撃エフェクト SVG: 共通 `InkSplatter` の責務として、battle 画面側では追加しない。

## 補足: 追加トークン要求

なし。既存の `var(--*)` トークンですべてカバーできる。
追加が必要になった場合は、本書のこのセクションに「`--turn-order-active-glow` (`0 0 8px rgba(201,168,106,.4)`)」のように追記してから `_obsidian.scss` 編集の要否をディレクターに確認すること（**勝手に追加しない**）。
