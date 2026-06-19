# battle — リデザイン案 A v2 取り込み（**改訂版 v3 — 差分修正**）

v2 実装は完了済みだが、ユーザーから「まだデザインと異なる部分がある」と指摘あり。
特に「**選択中の敵だけ耐性が表示されて、その敵カードだけ縦に広がって他のカードと高さが揃わない**」
問題が、ユーザーから明示的に「デザイン側が悪いので**間延びしないように工夫**してください」と
指示された。本指示書ではこれを **Step 1（最重要）** として独立扱いする。

参照ファイル:

- 全体テーマ: `dev-docs/redesign-A.md`（§1 デザイントークン / §1.5 レイアウト運用ルール）
- 既存実装: `src/pages/battle/index.tsx`, `src/pages/battle/style.module.scss`
- 現状スクショ: `/tmp/sekaiju-screenshots-current/pages-battle--default.png`,
  `/tmp/sekaiju-screenshots-current/pages-battle--skill-menu.png`,
  `/tmp/sekaiju-screenshots-current/pages-battle--boss-encounter.png`

---

## 1. 触ってよいファイル / 触ってはいけないファイル

### 触ってよい

- `src/pages/battle/index.tsx`
- `src/pages/battle/style.module.scss`
- `src/pages/battle/Battle.stories.tsx`（ストーリー追加可、既存 assert は変えない）

### 触ってはいけない

- `src/components/common/ResistBadges/`（**そのまま使う**。compact prop 有り）
- `src/components/common/EnemySprite/` `CharacterPortrait/` `ItemSprite/` `StatBar/` `BattleExpBar/` `InkSplatter/`
- `src/domain/combat.ts`（`previewTurnOrder` の挙動を維持）
- `src/domain/battle.ts` `strategy.ts` `skillCost.ts` 等の戦闘ロジック
- `src/data/battleSkills.ts` `unionSkills.ts` `enemies.ts`
- `src/_obsidian.scss` の既存トークン値
- 既存テスト assert
- 行動順帯のロジック（`turnOrder` / `previewTurnOrder`）はそのまま

---

## 2. やってはいけないこと

- **Agent / Task ツールを spawn しない**。自分で Edit / Write / Bash する。
- 耐性情報を**非表示にする**選択肢は取らない（情報として必要、ユーザー指示）。
- 敵カードを縦に伸ばして耐性を表示する現行アプローチは**全面廃止**。
- スキルツリーは触らない（モックに無いが現状の方が良いとユーザー判断済み。battle 側のスキル
  選択 UI とは別物）。

---

## 3. モックとの差分一覧

現状スクショ × モック比較で観測された差分のみを列挙する。

### A. 耐性表示で敵カードが縦に伸びる — **最重要** ⚠️

| # | 場所 | 現状 | モック / 期待 |
| --- | --- | --- | --- |
| A1 | `.enemy` 内の `.enemyResist` (line 1150〜1160 in `index.tsx`) | `isTargeted` 時のみ `<ResistBadges>` を**カード内**に展開し、SCSS で `.targeted .enemyResist { min-height: 36px }` を付与。**結果として選択中カードだけ縦に伸び、隣のカードと高さが揃わない**（`pages-battle--default.png` のスライム選択時、`pages-battle--boss-encounter.png` の門番選択時で顕著） | モックは敵カードの **HP バー下に小さな耐性チップを横一列に常時表示**（`氷弱 / 火耐` 等）。状態異常チップは右上の `位置: -3px;-3px` の角バッジで表示し、漂う粒子 (`ailDrift`) で視覚補強 |

→ **解決方針**（後述 §5 Step 1 で詳述）: 敵カード自体の高さを変えないために、
**耐性を「対象情報パネル」として敵エリアと味方エリアの間に固定高で表示する**方式を採用。
カード内には HP バー下に「属性弱点のみ」の小さなチップ（22px 程度）を常時表示するに留め、
詳細（属性耐性 4 軸 + 状態異常耐性 4 軸の完全な ResistBadges）はパネルで出す。

### B. ヘッダー — リザルト例ボタン / 行動順帯

| # | 場所 | 現状 | モック (line 994〜997) |
| --- | --- | --- | --- |
| B1 | 「リザルト例 ▸」ボタン | 無し | モックには右上に `font-size:9px;color:#9a958a;border:1px solid rgba(255,255,255,.14);border-radius:2px;padding:2px 7px` で「リザルト例 ▸」ボタン → 押下で result overlay 表示 |
| B2 | 行動順帯 | `previewTurnOrder` 由来で動作中（モック §4 準拠） | OK、維持 |
| B3 | ログプレビュー帯 | 戦場下にインライン表示 | モックは header の直下に `border-left:2px solid #c9a86a` + `font-family:JetBrains Mono;font-size:10px` で 2 行だけインライン表示。クリックで全ログ overlay |

→ B1: 「リザルト例 ▸」を v3 で実装する（ユーザー指示「基本デザイン忠実」）。`devOnly` のような
フラグで dev/storybook 限定 or 設定メニューから呼べるようにする。最小実装案: 戦闘中はバッジ非表示、
**Storybook ストーリーから直接 `setResultOpen(true)` 相当を叩く** 経路を残しつつ、
`hash === '#result-preview'` のときだけバッジ表示で本番 build にも残す（モック忠実化のため）。
→ Simpler 案: **ボタンを常時表示し、押下で `state.outcome` を一時的に `'win'` に書き換え、
result overlay を出す**（mock party の EXP を計算するための workaround は省略可、`expResults`
だけ空配列で表示）。ユーザーが UI 検証用に必要なボタンと判断。

### C. 敵エリア — 召喚体 / 状態異常チップ

| # | 場所 | 現状 | モック (line 999〜1029) |
| --- | --- | --- | --- |
| C1 | 召喚体 | 敵と味方の間に横並び | モックは敵エリアの下に `margin-top:12px` で `召喚体 ・ 3/3` ラベル + 横並びカード — OK だが配置位置を「敵エリア内の下」に。現状は別 `.summons` セクション (敵の外) |
| C2 | 状態異常チップ | `ailmentMark()` が `🔒` 等の絵文字 1 つ | モック (line 1009): 右上の角バッジ `background:#5a3a6e;color:#e7d2f5` で `毒3` のような種類+ターン数表示、+ 粒子アニメ（v3 では絵文字フォールバックでも可、色は揃える） |

### D. 味方カード — モック準拠の3列固定 / UI 密度

| # | 場所 | 現状 | モック (line 1034〜1057) |
| --- | --- | --- | --- |
| D1 | カード幅 | `flex: 0 0 calc((100% - 12px) / 3)` — OK | OK |
| D2 | 後衛行 | 同じ 3 列で `justify-content: center` | モック: `grid-template-columns: repeat(2, calc((100% - 12px)/3))` で **2 つだけ中央配置**、サイズは前衛と同じ |
| D3 | 上段の小チップ (バッジ / 名前 / 作戦) | 戦・守・楽器・薬・魔 等の小バッジ + 名前 + 作戦タグ | モック準拠 OK だが現状の `バッチリ` 等のタグ色が薄い。モックは `font-size:7px;color:#0b0c10;background:STRATCOL;border-radius:2px;padding:0 3px;font-weight:700` の **彩度高めバッジ** |
| D4 | H/T/U バー 3 段 | あり | モック: 3 段あり OK |
| D5 | 最下段「コマンドラベル + 状態異常」 | あり | モック準拠 OK |
| D6 | U バー満タン時の `U!` バッジ | 無し | モック (line 1042): `position:absolute;top:-4px;right:-4px` の `U!` バッジ (animation:glowPulse) |

→ D6: ユニオン満タン時のバッジを追加（モック忠実化）。

### E. コマンドパネル — 個別行動の「防御」「道具」が無い

| # | 場所 | 現状 | モック (line 1063) |
| --- | --- | --- | --- |
| E1 | 個別行動の選択肢 | 攻撃 / スキル / 道具 / もどる の 4 ボタン | モック: **攻撃 / スキル** が大きいプライマリ列、その下に **道具 / 防御 / もどる** の 3 ボタン |
| E2 | 「防御」(ガード) | **無い**。`AllyCmd` 型には `guard` が存在するが UI から呼べない | モックの「防御」を実装する。コマンドは `assign(active.id, { kind: 'guard' })` でいい |

→ E2: 既に型は用意されているので UI ボタンを足すだけ。`pickAutoCommand` も `guard` を扱える
想定だが domain は触らない方針なので、現状の ally 個別コマンドで `guard` が解決できることを
仕様上で確認したうえで、追加。

### F. コマンドパネル — スキル選択は横スクロール 2 段

| # | 場所 | 現状 | モック (line 1064) |
| --- | --- | --- | --- |
| F1 | `.skillList` レイアウト | 縦リスト | モック: `grid-auto-flow:column;grid-template-rows:1fr 1fr;grid-auto-columns:106px;gap:7px;overflow-x:auto` の**横スクロール 2 段** |
| F2 | 各スキルカード | フルワイドで詳細 + ボタン | モック: 106px 幅の小カード (`padding:7px 8px`) で名前 / TPコスト / タグだけ。タップで即発動 (allyTarget 必要なら別段階) |
| F3 | 横スクロール示唆 | 無し | モック (line 1064 末): `← 横スクロール（2段）→` の 8px ヒントテキスト |

→ 現状の縦リストは情報量が多くて UX 上有効だが、モック忠実化方針なのでモック準拠の
**2 段横スクロール**に変更。情報量を維持するため、各カードのサイズはモックの 106px から
やや広げて 120px、詳細はカード末尾に小さく載せる。

### G. コマンドパネル — さくせん画面の構造

| # | 場所 | 現状 | モック (line 1065) |
| --- | --- | --- | --- |
| G1 | `.strategyList` | キャラ別に作戦ボタン群を縦並び | モック: `display:flex;flex-direction:column;gap:5px` のシンプルなリスト、各行は `name (太字) + desc (薄字)`。**キャラ別ではなく、`activeName` 単位**で表示 |

→ 現状の「全キャラ一括変更」UI と、モックの「アクティブキャラだけ作戦変更」UI は機能が異なる。
モックに合わせて変更すると一括変更ができなくなり機能後退。**v3 ではユーザー再指示「基本デザイン
忠実」だが、機能保持を優先**して**現状のキャラ別リストを維持しつつ、各行の見た目をモック準拠の
シンプル風に整える**（背景・余白・タイポ）。

### H. リザルトオーバーレイ — レベルアップカード / ドロップ表示

| # | 場所 | 現状 | モック (line 1071) |
| --- | --- | --- | --- |
| H1 | レベルアップカード | テキスト行 | モック: 重ね板スタイル (line 1071 中央: `position:relative;` + 背面に `#181b22` の薄い板、前面に `#1a1d26` + 金縁の主カード) |
| H2 | ドロップ | `dropList` テキスト | モック (line 1071): `display:flex;gap:8px` の 2 列で `ItemSprite + 名前 + ×数` の小カード |
| H3 | 獲得ゴールド | 普通テキスト | モック (line 1071): `background:rgba(201,168,106,.08);border:1px solid rgba(201,168,106,.25);border-radius:3px;padding:10px 14px` の独立カード |

### I. defeat / flee オーバーレイ

| # | 場所 | 現状 | モック (line 1093〜1123) |
| --- | --- | --- | --- |
| I1 | defeat 表示 | 単純テキスト | モック: `font-size:46px;color:var(--danger);letter-spacing:.3em;text-shadow:0 0 30px rgba(178,60,48,.6);animation:glowPulse 4s` の演出付き「全滅」+ `到達: NF ・ 撃破: X 体` のスタッツ |
| I2 | flee 表示 | 単純テキスト | モック: speed line + dust 粒子 + `font-size:30px;color:var(--success);letter-spacing:.2em` の「逃走成功」 |

→ I1, I2 は演出強化に値する。v3 で実装。

### J. ログオーバーレイ

| # | 場所 | 現状 | モック (line 1069) |
| --- | --- | --- | --- |
| J1 | 全ログ overlay | 全ログを縦に列挙 | モック: `font-family: var(--font-mono); font-size: 11px; line-height: 2; color: var(--text-mute)`、ターン区切りは `color: var(--text-quote)` で `― ターン N ―` を間に挟む |

→ ターン区切りは battle ログのデータ構造を見て可能なら導入、難しければ現状維持 OK。

---

## 4. ゴール

1. **耐性表示で敵カードが縦伸びする問題を完全に解消する**（敵カードの高さを均等に保つ）。
2. 「リザルト例 ▸」ボタンをヘッダー右上に追加（モック準拠）。
3. 状態異常チップを右上の角バッジ + 種類別カラー（毒紫 / 麻痺金 など）に整える。
4. 後衛行を 2 列中央配置 grid に変更（モック準拠）。
5. 個別コマンドに「防御」を追加し、攻撃/スキル/道具/防御/もどる の 5 ボタン構成にする（モック準拠）。
6. スキル選択を横スクロール 2 段グリッドに変更（モック準拠）。
7. ユニオン満タン時の `U!` バッジを味方カードに追加。
8. リザルトオーバーレイの装飾をモック準拠（金縁カード、ドロップ 2 列、獲得ゴールドカード）。
9. defeat / flee オーバーレイに glowPulse / speed line 演出を追加。
10. test / lint / tsc 全緑、Storybook の `pages/battle` 系ストーリーが黒曜テーマで描画。

---

## 5. 実装ステップ

### Step 1 — **耐性表示の縦広がり回避** ⚠️ 最重要

#### 5.1.1 採用案: 「対象情報パネル」を敵エリアと味方エリアの間に固定高で配置

**選択肢の比較**（opus 視点）:

| 案 | 内容 | 評価 |
| --- | --- | --- |
| (a) 対象情報パネル | 敵エリアと味方エリアの間に固定高 56px のパネルを置き、ターゲット中の敵の名前 + ResistBadges を表示 | ✅ **採用**: 情報量を維持しつつ、敵カードの高さは均等に保てる。新規パネルなので既存レイアウトに影響少。スマホでもスクロール不要 |
| (b) 戦闘ログの上にポップアップ | log の上 (z-index で重ね) にターゲット中の耐性をフロート表示 | ❌ ログを隠してしまう。ログは戦闘中の重要情報なので NG |
| (c) 敵カード上にオーバーレイ | カード自体は同高、選択時だけ `position: absolute; z-index: 5` で耐性を浮かす | ❌ 隣の敵カードに被って隣の名前/HPが見えなくなる。対多戦闘で破綻 |

→ **(a) 対象情報パネル**を採用する。

#### 5.1.2 HTML 構造

`src/pages/battle/index.tsx` で:

1. `.enemy` カード内の `<div className={styles.enemyResist}>...</div>` を **削除**
   （`isTargeted` 時の `<ResistBadges>` 展開ロジック自体を除去）。
2. `.enemy` カード内の HP バー直下に **属性弱点だけ**の小チップを常時表示する横一列を追加:

   ```tsx
   {master?.resist && Object.entries(master.resist).some(([, v]) => v < 1) && (
     <div className={styles.enemyWeakChips} aria-hidden="true">
       {/* 弱点だけ (resistance < 1) を抽出 */}
       {(['fire', 'ice', 'volt', 'slash', 'pierce', 'bash'] as const)
         .filter((el) => (master.resist?.[el] ?? 1) < 1)
         .slice(0, 3)
         .map((el) => (
           <span key={el} className={`${styles.weakChip} ${styles[`weakChip-${el}`] ?? ''}`}>
             {ELEM_LABEL[el]}弱
           </span>
         ))}
     </div>
   )}
   ```

3. **敵エリアの直下に新規 `<div className={styles.targetInfoPanel}>` を追加**:

   ```tsx
   {/* 対象情報パネル — 高さ固定で敵カード高に影響を与えない */}
   <div className={styles.targetInfoPanel} aria-live="polite">
     {(() => {
       const tEnemy = targetId ? state.enemies.find((e) => e.id === targetId) : null;
       const tMaster = tEnemy?.enemyId ? ENEMIES[tEnemy.enemyId as EnemyId] : null;
       if (!tEnemy || !tMaster) {
         return (
           <span className={styles.targetInfoEmpty}>
             敵をタップで対象選択
           </span>
         );
       }
       return (
         <>
           <span className={styles.targetInfoName}>{tEnemy.name}</span>
           <div className={styles.targetInfoResist}>
             <ResistBadges
               elementResist={tMaster.resist}
               ailmentResist={
                 tEnemy.enemyId ? resolveEnemyAilmentResist(tEnemy.enemyId as EnemyId) : undefined
               }
               compact
             />
           </div>
         </>
       );
     })()}
   </div>
   ```

#### 5.1.3 CSS（`src/pages/battle/style.module.scss`）

```scss
// ---- 対象情報パネル（耐性の縦広がり回避） ----
// 敵エリアと召喚体/味方の間に固定高で配置。ターゲット未選択時もスペースは確保し、
// 「敵をタップで対象選択」プロンプトを表示してレイアウトのジャンプを防ぐ。
.targetInfoPanel {
  flex: 0 0 auto;
  min-height: 56px;
  max-height: 56px;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 6px 14px;
  background: var(--bg-mid);
  border-top: 1px solid var(--rule-soft);
  border-bottom: 1px solid var(--rule-soft);
  overflow: hidden;
}
.targetInfoName {
  flex: 0 0 auto;
  font-family: var(--font-display);
  font-size: 12px;
  color: var(--text-strong);
  letter-spacing: 0.04em;
}
.targetInfoResist {
  flex: 1;
  min-width: 0;
  display: flex;
  align-items: center;
  gap: 4px;
  overflow-x: auto;
  overflow-y: hidden;
  scrollbar-width: none;
}
.targetInfoResist::-webkit-scrollbar { display: none; }
.targetInfoEmpty {
  font-size: 11px;
  color: var(--text-quote);
  letter-spacing: 0.04em;
}

// 敵カード内の HP バー直下にぶら下がる「弱点のみ」の常時チップ
.enemyWeakChips {
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
  gap: 3px;
  margin-top: 4px;
  min-height: 14px;             // 弱点なしの敵でも高さを確保（高さ均一化）
}
.weakChip {
  font-size: 7px;
  padding: 1px 4px;
  border-radius: 2px;
  background: rgba(111, 159, 216, 0.18);
  color: #8fb6e0;
  line-height: 1;
  white-space: nowrap;
}
.weakChip-fire { background: rgba(212, 103, 79, 0.18); color: var(--danger-text); }
.weakChip-ice  { background: rgba(111, 159, 216, 0.18); color: var(--info-blue); }
.weakChip-volt { background: rgba(232, 216, 91, 0.18); color: #e8d85b; }
.weakChip-slash, .weakChip-pierce, .weakChip-bash {
  background: rgba(255, 255, 255, 0.08);
  color: var(--text-base);
}

// ★ 既存の .enemyResist 関連ルールは全削除 ★
// 特に: .targeted .enemyResist { min-height: 36px } を削除
// → 敵カードの高さが targeted 状態で伸びなくなる
```

#### 5.1.4 既存 CSS の削除

`style.module.scss` 内:

- `.enemyResist { margin-top: 4px; text-align: left; }` を削除
- `.targeted .enemyResist { min-height: 36px; }` を削除（**最重要**）

これで敵カードの高さは `targeted` 状態でも一切伸びず、隣のカードと完全に揃う。

#### 5.1.5 アクセシビリティ

- 対象情報パネルは `aria-live="polite"` でスクリーンリーダーに通知。
- ターゲット未選択時の空表示も `min-height` を維持して画面ジャンプを起こさない。

### Step 2 — リザルト例ボタンの追加

`index.tsx` のヘッダー内 `.chapterMark` の右に:

```tsx
<button
  type="button"
  className={styles.resultPreviewBtn}
  onClick={() => setShowResultPreview(true)}
>
  リザルト例 ▸
</button>
```

`setShowResultPreview` という新規 state を追加し、その値が真のときは現在の result overlay
の view-only モード（mock の expResults / drops / gold を埋めたモック）を表示する。

```scss
.resultPreviewBtn {
  font-size: 9px;
  color: var(--text-mute);
  border: 1px solid var(--rule-soft);
  border-radius: 2px;
  padding: 2px 7px;
  background: transparent;
}
```

実装簡略化: mock のレベルアップ・ドロップ・ゴールドを既定値で作って overlay の同じ
コンポーネントを再利用。`devOnly` 等のフラグでは囲わない（モック準拠）。

### Step 3 — 状態異常の角バッジ化

現行の `ailmentMark()` を残しつつ、敵カードに `position: absolute; top: -3px; right: -3px` の
角バッジで状態異常名+ターン数を表示する。

```tsx
{enemyAilments.length > 0 && (
  <span className={styles.enemyAilBadge}>
    {enemyAilments[0].kind === 'poison' ? `毒${enemyAilments[0].turns}` :
     enemyAilments[0].kind === 'paralysis' ? `麻${enemyAilments[0].turns}` :
     enemyAilments[0].kind === 'sleep' ? `眠${enemyAilments[0].turns}` :
     enemyAilments[0].kind === 'blind' ? `盲${enemyAilments[0].turns}` :
     enemyAilments[0].kind === 'headBind' ? `頭${enemyAilments[0].turns}` :
     enemyAilments[0].kind === 'armBind' ? `腕${enemyAilments[0].turns}` :
     enemyAilments[0].kind === 'legBind' ? `脚${enemyAilments[0].turns}` : '?'}
  </span>
)}
```

```scss
.enemyAilBadge {
  position: absolute;
  top: -3px;
  right: -3px;
  font-size: 8px;
  background: #5a3a6e;
  color: #e7d2f5;
  border-radius: 2px;
  padding: 0 4px;
  font-weight: 700;
  pointer-events: none;
}
```

### Step 4 — 後衛行を 2 列中央 grid に

```scss
.party .cardRow + .cardRow {
  // 後衛行を 3 列の幅で 2 つ中央寄せ
  display: grid;
  grid-template-columns: repeat(2, calc((100% - 12px) / 3));
  justify-content: center;
  gap: 6px;
}
```

### Step 5 — 個別コマンドに「防御」を追加

`uiMode.kind === 'individual'` の active != null のブロックで:

```tsx
<div className={styles.individualCmdRow1}>
  <button className={styles.cmdPrimary} onClick={() => /* 攻撃 → 対象選択 */}>攻撃</button>
  <button className={styles.cmdSub} onClick={() => /* スキル */}>スキル</button>
</div>
<div className={styles.individualCmdRow2}>
  <button className={styles.cmdTertiary} onClick={() => /* 道具 */}>道具</button>
  <button
    className={styles.cmdTertiary}
    onClick={() => assign(active.id, { kind: 'guard' })}
  >
    防御
  </button>
  <button className={styles.cmdBack} onClick={() => setUiMode({ kind: 'global' })}>もどる</button>
</div>
```

```scss
.individualCmdRow1 {
  display: flex;
  gap: 8px;
  margin-bottom: 8px;
}
.individualCmdRow1 button {
  flex: 1;
  height: 46px;
  border-radius: 3px;
  font-size: 14px;
  font-weight: 700;
}
.cmdPrimary {
  background: linear-gradient(180deg, var(--gold), var(--gold-deep));
  color: var(--bg-mid);
  border: 0;
}
.cmdSub {
  border: 1px solid rgba(143, 182, 224, 0.5);
  background: rgba(111, 159, 216, 0.1);
  color: #9cc2ec;
}
.individualCmdRow2 {
  display: flex;
  gap: 8px;
}
.individualCmdRow2 button {
  flex: 1;
  height: 40px;
  border-radius: 3px;
  font-size: 13px;
}
.cmdTertiary {
  border: 1px solid rgba(143, 208, 160, 0.4);
  color: var(--success);
  background: transparent;
}
.cmdBack {
  flex: 0 0 62px !important;
  border: 1px solid var(--rule-soft);
  color: var(--text-mute);
  background: transparent;
}
```

「防御」を押すと `assign(active.id, { kind: 'guard' })` で即決定し、`uiMode` を `'global'`
に戻して次のアクティブキャラへ。`AllyCmd` 型に `guard` は既に存在する。

### Step 6 — スキル選択を横スクロール 2 段に

```scss
.skillList {
  display: grid;
  grid-auto-flow: column;
  grid-template-rows: 1fr 1fr;
  grid-auto-columns: 120px;
  gap: 7px;
  overflow-x: auto;
  padding-bottom: 6px;
  scrollbar-width: thin;
}
.skillScrollHint {
  font-size: 8px;
  color: var(--text-quote);
  text-align: right;
  margin-top: 2px;
}
.skillBtn {
  border: 1px solid var(--rule-soft);
  background: var(--surface-panel);
  border-radius: 3px;
  padding: 7px 8px;
  display: flex;
  flex-direction: column;
  gap: 3px;
}
.skillName { font-size: 11px; color: var(--text-strong); }
.skillCostLine { font-family: var(--font-mono); font-size: 9px; color: var(--info-blue); }
.skillTag      { font-size: 8px; color: var(--text-quote); }
```

スキル詳細 (`skillSummary`) はカード内の `skillTag` に **1 行で短縮表示**。タップで
allyTarget 必要なら従来の対象選択フローに入る。

### Step 7 — ユニオン満タン `U!` バッジ

```tsx
{a.unionGauge >= 100 && (
  <span className={styles.unionReadyBadge}>U!</span>
)}
```

```scss
.unionReadyBadge {
  position: absolute;
  top: -4px;
  right: -4px;
  font-size: 7px;
  background: #e8d85b;
  color: var(--bg-mid);
  border-radius: 2px;
  padding: 0 3px;
  font-weight: 700;
  animation: glowPulse 2s ease-in-out infinite;
}
```

### Step 8 — リザルトオーバーレイの装飾

レベルアップカードに重ね板 (`::before` で背面板を作る)、ドロップを 2 列 grid に、
獲得ゴールドを独立金枠カードに整える。詳細はモック line 1071 の構造を参照して
SCSS で再現する。

### Step 9 — defeat / flee 演出

```scss
.defeatTitle {
  font-family: var(--font-display);
  font-size: 46px;
  color: var(--danger);
  letter-spacing: 0.3em;
  text-shadow: 0 0 30px rgba(178, 60, 48, 0.6);
  animation: glowPulse 4s ease-in-out infinite;
}
.fleeTitle {
  font-family: var(--font-display);
  font-size: 30px;
  color: var(--success);
  letter-spacing: 0.2em;
}
.fleeSpeedLine {
  position: absolute;
  height: 3px;
  border-radius: 2px;
  background: linear-gradient(90deg, transparent, var(--success));
  animation: speedLine 1.1s ease-in-out infinite;
}
@keyframes speedLine {
  0%   { transform: translateX(-40px); opacity: 0; }
  50%  { opacity: 1; }
  100% { transform: translateX(40px); opacity: 0; }
}
```

`prefers-reduced-motion: reduce` 時は animation: none。

---

## 6. 検証

```bash
yarn lint
yarn test
yarn tsc -b   # または yarn build
```

加えて、以下のスクショを撮って差分が消えていることを目視確認:

- `pages/battle` の `default`（雑魚多数、対象未選択）
- `pages/battle` の `default`（雑魚 1 体を選択 — **敵カードの高さが他カードと完全に揃うこと**）
- `pages/battle` の `boss-encounter`（ボス選択時 — **ボスカード高さが雑魚と揃うこと、対象情報パネルに耐性が出ること**）
- `pages/battle` の `skill-menu`（スキル選択 — 横スクロール 2 段になっていること）

確認の最重要ポイント:

1. ✅ どの敵をターゲットしても、**敵カード列の高さが変わらない**（隣の敵カードと揃う）。
2. ✅ 対象情報パネルにターゲット中の敵の名前 + 耐性が表示される。
3. ✅ ターゲット未選択時もパネルは固定高で「敵をタップで対象選択」表示。
4. ✅ 個別コマンドに「防御」が存在し、押下するとそのキャラの行動が `guard` で決定する。
5. ✅ スキル選択が横スクロール 2 段になっている。
6. ✅ ユニオン 100% で `U!` バッジが点滅。

撮影は `dev-docs/screenshot-setup.md` の Storybook セクション準拠。Noto Sans JP 必須。

---

## 7. コミット

メッセージ例:

```
refactor(battle): モック忠実化 v3 — 耐性パネル分離 + 個別コマンド/スキル UI

- 敵カード内の ResistBadges を撤廃、新規「対象情報パネル」を敵エリア下に固定高で配置
  → 敵カード列の高さが targeted 状態で伸びなくなり、隣カードと完全に揃う
- 敵カード HP バー直下に「弱点のみ」の常時チップを追加（min-height で高さ均一）
- ヘッダー右上に「リザルト例 ▸」ボタンを追加（モック準拠）
- 状態異常を右上角バッジ + 種類別カラーに整理
- 後衛行を 2 列中央配置 grid に変更
- 個別コマンドに「防御」を追加（5 ボタン構成）
- スキル選択を横スクロール 2 段グリッドに変更
- ユニオン満タン時の U! バッジを味方カードに追加
- defeat / flee オーバーレイに glowPulse / speedLine 演出を追加
- リザルトオーバーレイのレベルアップカード / ドロップ / ゴールドをモック準拠の装飾に
```

push しない。ディレクターに commit SHA を報告する。
