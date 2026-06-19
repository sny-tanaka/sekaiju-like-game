# フェーズ 2：forge 画面リデザイン（sonnet 用指示書）— **改訂版 v2 — モック忠実化**

`dev-docs/redesign-A.md`（特に **§1.5 レイアウト運用ルール**）と
`dev-docs/redesign-A-title-fix.md`（flex column 化のパターン）を **必ず先に読む**こと。

参考にするモック原本: `/tmp/sekaiju-design/案A_v2.dc.html` の line 683〜744
（`6a enhance` / `6b recycle` / `6c enhance confirm + spark fx` の 3 サブ状態）。

参考にする機能仕様: `dev-docs/claude-design-brief.md` **§4.6 forge — 鍛冶屋**。

> **改訂方針（v2）**: 前回 v1 はモックから大きく外れていました（"色味以外ほとんど合っていない"）。
> 今回はモック忠実度を最優先で取り直します。強化行のレイアウト、確認ダイアログの ✦ FX、
> 行内のステ予測（→ 矢印）など、モックに描かれている要素はすべて反映します。

---

## 1. 触ってよいファイル / 触ってはいけないファイル

### 触ってよい

| 区分 | パス | 操作 |
| --- | --- | --- |
| 編集 | `src/pages/forge/index.tsx` | マークアップを flex column 構造に再構成。**前回 v1 の構造は捨てて書き直す**。state machine とロジックは温存 |
| 編集 | `src/pages/forge/style.module.scss` | 黒曜テーマで全面書き直し |
| 編集 | `src/pages/forge/Forge.stories.tsx` | 既存 4 本（`Default` / `Recycle` / `BulkSelected` / `ForgeConfirm`）を温存 |

### 触ってはいけない

- `src/_obsidian.scss`、`src/_variables.scss`。
- 共通コンポーネント本体（`ItemSprite` / `InkSplatter`）。
- 他画面の `index.tsx` / `style.module.scss`。
- ゲームロジック（`forgeWithIngot` / `recycle` / `recycleMany` / `recycleFragments` /
  `equipDisplayName` / `FORGE.MAX_LEVEL` / `FORGE.INGOT_INC`）。
- 既存 InkSplatter の使用箇所（`<InkSplatter value={forgeSuccessLabel} variant="gold" size={80} ... />`）。
- `Pending` 型とその分岐（`forge` / `recycle` / `recycleBulk`）。
- 既存テストの assert 文。

---

## 2. やってはいけないこと

- 自分でさらに `Agent` / `Task` を spawn しない。
- 写本テーマ由来の SCSS 変数 (`$parchment` 等) を新規参照しない。
- 強化ボタン 3 種（銅 / 銀 / 金）を絶対配置せず、`display: flex; gap: 8px;` で並べる。
- 一括分解バーを画面全体に `position: fixed; bottom: 0;` で被せない。`.layout` の flex item として
  リストの下、フッタの上に挟む。
- リスト本体 (`.list`) 以外を `overflow-y: auto` にしない。
- `forgeSpark` アニメを `_obsidian.scss` に追加しない。画面側 SCSS のローカル `@keyframes
  forge-spark` として置く。

---

## 3. モックとの差分一覧（最重要）

前回 v1 の実装はモックから大きくズレている。以下を **すべて** モック準拠に直す。

### 3.1 ヘッダー
- **OK（概形）**: タイトル「鍛冶屋」+ インゴット在庫行は実装済み。
- **NG（細部）**: 在庫行のスタイル:
  ```css
  .stockRow { display: flex; gap: 14px; font-family: var(--font-mono); font-size: 11px; }
  .stockCopper { color: #c98a5b; }
  .stockSilver { color: var(--text-base); }
  .stockGold { color: #e8d85b; }
  .stockFrag { color: var(--text-faint); }
  ```
  これは既に実装あり。OK。

### 3.2 タブバー
- **NG**: 現状は guild と同じくチップ風 active。
- **モック**: **flat underline タブ**（guild §3.2 と同じ）。
  ```css
  .tabs { display: flex; gap: 4px; border-bottom: 1px solid var(--rule-soft); }
  .tab { flex: 1; text-align: center; padding: 9px 0; font-size: 12px; color: var(--text-faint); border-radius: 3px 3px 0 0; }
  .tabActive { color: var(--bg-mid); font-weight: 700; background: var(--gold); }
  ```

### 3.3 ヒント文
- **OK**: 現状の border-left + gold ヒント文はモック準拠。
- **モック**:
  ```css
  .hint {
    font-size: 11px; color: var(--text-mute); line-height: 1.6;
    background: rgba(255,255,255,.03); border-left: 2px solid var(--gold);
    padding: 8px 10px; border-radius: 0 3px 3px 0;
  }
  ```
- ヒント文言は既存通り（`tab === 'forge' ? '...' : '...'`）。

### 3.4 強化タブの行（最大の差分）
- **NG**: 現状は行内が `[chk(リサイクル時)] [ItemSprite] [name + slot] [銅][銀][金]` の縦並び。
- **モック**: **行カード全体に上下に内容**。1 カード内で:
  ```
  ┌─────────────────────────────────────┐
  │ [44x44 ItemSprite] [名前 +N] (color: gold)
  │                    [武器 ・ ATK +{cur} → +{next}（緑）]
  │
  │ [銅+1 (n)] [銀+3 (n)] [金+5 (n)]    ← 横 3 ボタン
  └─────────────────────────────────────┘
  ```
  - 強化済み（先頭強調行）: `background: linear-gradient(100deg, #1a2030, #13151c);
    border: 1px solid rgba(201,168,106,.35);`。
  - 通常行: `background: var(--surface-panel); border: 1px solid var(--rule-soft);`
  - 最大強化済み (+5): `opacity: 0.7`、ボタンを「MAX」chip 1 個に置換
    （`font-size: 11px; color: var(--gold); border: 1px solid rgba(201,168,106,.35);
    border-radius: 2px; padding: 5px 10px;`）。

- **強化値プレビュー** (`ATK +{cur} → +{next}`):
  - 現状は **行内に予測値を出していない**。
  - モック準拠で出す: `equipDisplayName` の右の `forgeLevel`、その下に
    「{slot 名} ・ {基本ステ} → {強化後ステ}」を表示。
  - `gradedBaseBonuses(masterId, forgeLevel)` と `gradedBaseBonuses(masterId, forgeLevel + 1)` を
    比較して `ATK +n → +m` のような表記に組み立てる。
  - **実装簡略化**: ステ予測ロジックを `index.tsx` に書くのが重ければ、
    `{slot 名} ・ +{cur} → +{next}`（強化値のみ）の表記に倒してもよい。

- **インゴットボタン 3 種**:
  - 銅: `flex: 1; height: 36px; border: 1px solid rgba(201,134,91,.5); background: rgba(201,134,91,.18);
    color: #e0a87c; font-family: var(--font-mono); font-size: 11px; border-radius: 3px;
    text-align: center;` ラベル `銅+1 ({n})`
  - 銀: `border: 1px solid rgba(200,196,186,.4); background: transparent; color: var(--text-base);`
    ラベル `銀+3 ({n})`
  - 金: `border: 1px solid rgba(255,255,255,.08); background: transparent; color: var(--text-mute);`
    ラベル `金+5 ({n})`
  - 在庫 0 → `disabled` + `opacity: 0.4;`
  - **モックの色設計と現状の `.ingot:nth-child(n)` の指定は近い**。書き直し時にも維持。

### 3.5 リサイクルタブの行
- **モック**: 行は `[42x42 ItemSprite] [名前 + 分解で 断片 ×N（補助）] [「分解」チップ]` の横並び。
  - 行スタイル: `background: var(--surface-panel); border: 1px solid var(--rule-soft);
    border-radius: 4px; padding: 11px 13px; display: flex; align-items: center; gap: 12px;`
  - 「分解」チップ: `font-size: 11px; color: #e0a87c; border: 1px solid rgba(201,134,91,.5);
    border-radius: 2px; padding: 5px 11px;`
- **チェックボックス**: モックには明示的に描かれていないが、機能上必要（複数選択 → 一括分解）。
  行頭にチェックを残す。`accent-color: var(--gold); width: 18px; height: 18px;`。
  選択時: 行の border `var(--rule-gold)` + background `var(--gold-tint)`。

### 3.6 断片→インゴット変換ヒント（リサイクルタブ末尾）
- **NG**: 現状実装にはこの行が無い。
- **モック**: リサイクルリストの最下段に **「断片 → インゴット変換」案内**:
  ```
  [断片 → インゴット変換]                  [断片10→銅1 ボタン]
  ```
  - スタイル: `background: rgba(201,168,106,.06); border: 1px solid rgba(201,168,106,.25);
    border-radius: 4px; padding: 12px 14px; display: flex; justify-content: space-between;
    align-items: center;`
  - 左テキスト: `font-size: 12px; color: var(--text-mute);` 「断片 → インゴット変換」
  - 右ボタン: `font-size: 11px; color: var(--gold); border: 1px solid var(--rule-gold);
    border-radius: 2px; padding: 5px 11px;` 「断片10→銅1」
- **実装**: 現状ロジック `domain/forge.ts` に「断片からインゴットへ変換」関数が無い場合は、
  **disabled で配置**（理由を SCSS コメントに明記）。関数があれば対応する。
  実装の判断:
  - `convertFragmentsToCopper(save)` のようなロジックが既存にあるか
    `domain/forge.ts` を確認。
  - 無ければ disabled + 「実装予定」ツールチップで配置。

### 3.7 一括分解バー
- **OK**: 既に実装あり。モック原本には描かれていないが、機能上必要。
  リストの下・フッタの上に flex item として挟む（`position: fixed;` 禁止）。
- スタイル: `background: var(--surface-panel); border: 1px solid var(--rule-gold);
  border-radius: 4px; box-shadow: var(--shadow-modal); padding: 10px 12px; display: flex;
  align-items: center; gap: 10px;`

### 3.8 強化確認ダイアログ（最大の差分）
- **NG**: 現状は単純な「`{name}` を `{ingot}` インゴットで強化しますか？」 + 2 ボタン。
- **モック**: 中央に縦長カード、`text-align: center;`:
  ```
  ┌─────────────────────┐
  │ [72x72 ItemSprite カード]
  │ ✦ ✦ ✦ ← forgeSpark を周囲 3 箇所に絶対配置
  │
  │ ゴーレムブレード（display 17px）
  │ +2 → +3 （mono 20px・gold、+3 は gold-bright + glow）
  │
  │ ┌ 消費: 銀インゴット ×1 ・ ATK +68 → +71（緑）┐
  │ │                                                │ ← 補足ボックス
  │ └────────────────────────────────────────────────┘
  │ この強化で残り 銀 1（補助 11px）
  │
  │ [やめる][強化する gold グラデ]
  └─────────────────────┘
  ```
  - モーダル: `padding: 24px 22px; background: var(--surface-panel);
    border: 1px solid var(--rule-gold); border-radius: 6px; box-shadow: var(--shadow-modal);
    text-align: center;`
  - ItemSprite カード: 72x72、その周囲に **3 つの ✦** を絶対配置（top:-6,left:-6 /
    top:8,right:-8 / bottom:-4,left:14 など）。各 `font-size: 13〜16px;
    animation: forge-spark 1.3s ease-in-out infinite;`（delay を 0 / .3s / .6s で交互に）。
  - タイトル: `font-family: var(--font-display); font-size: 17px; color: var(--text-strong);
    margin-bottom: 6px;`
  - 強化値表示: `font-family: var(--font-mono); font-size: 20px; color: var(--gold);
    margin-bottom: 16px;` `{cur} → <span class="next">{next}</span>`
    `.next { color: var(--gold-bright); text-shadow: 0 0 12px rgba(232,208,153,.6); }`
  - 補足ボックス: `background: rgba(255,255,255,.03); border-radius: 3px;
    padding: 10px 12px; font-size: 12px; color: var(--text-soft); line-height: 1.7;
    margin-bottom: 8px;`
    `消費: <span class="ingotName">銀インゴット ×1</span> ・ ATK +{cur} → <span class="next">+{nextATK}</span>`
    `.ingotName { color: var(--text-base); } .next { color: var(--success); }`
  - 残量: `font-size: 11px; color: var(--text-mute); margin-bottom: 20px;`
    「この強化で残り {ingot} {n}」
  - アクション: 2 列、guild と同等。
    - 「やめる」: `border: 1px solid var(--rule-base); color: var(--text-soft);`
    - 「強化する」: `background: linear-gradient(180deg, var(--gold), var(--gold-deep));
      color: var(--bg-mid); font-weight: 700;`

### 3.9 分解確認ダイアログ
- 強化確認と同じレイアウトベース（中央モーダル）。違いは:
  - sparkle FX なし
  - 「強化する」ボタンが「分解する」 / 「一括分解する」（danger 色）に変わる:
    `background: var(--danger); color: #fbeae6; font-weight: 700;`

### 3.10 フッタ
- **OK**: 「拠点へ戻る」のみ。スタイル: `height: 46px; border: 1px solid rgba(255,255,255,.1);
  color: var(--text-mute); font-size: 13px; letter-spacing: .16em;`。

---

## 4. ゴール（Storybook ストーリー一覧）

Storybook で `Pages/Forge` の以下 4 ストーリーが、添付モックと同じビジュアル方向性で描画される。

1. `Default` — `mockForge`、`tab = 'forge'` 初期表示。各装備行が 1 カードに `[アイコン] [名前 +N]
   [ステ予測] [銅][銀][金]` の縦並びで描画される。
2. `Recycle` — `mockForge` で `tab = 'recycle'`。リスト末尾に「断片 → インゴット変換」案内が出る。
3. `BulkSelected` — `mockForge` で `tab = 'recycle'`、2 件チェック → 一括分解バー表示。
4. `ForgeConfirm` — `mockForge` で `tab = 'forge'`、銅+1 ボタンをクリックして確認ダイアログ表示。
   72x72 ItemSprite + ✦×3 sparkle + `+N → +M` + 補足ボックス + 残量 + 2 ボタンが見える。

`yarn test --run`・`yarn lint`・`yarn tsc -b` がすべて緑であること。

---

## 5. 実装ステップ

### Step 0. 全面書き直し前の準備
- 既存 `index.tsx` の state machine と handler を温存。
- 既存 `style.module.scss` は破棄、ゼロから書く。
- 強化値プレビュー用に `gradedBaseBonuses` を読み込む（既存 import を流用）。

### Step 1. ルートレイアウト
```scss
.layout {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100dvh;
  max-width: 560px;
  margin: 0 auto;
  padding: 16px 20px max(20px, env(safe-area-inset-bottom, 0px));
  overflow: hidden;
  background: var(--bg-page-gradient);
  color: var(--text-base);
  font-family: var(--font-body);
  gap: 12px;
}
```

### Step 2. ヘッダー → §3.1

### Step 3. flat underline タブ → §3.2

### Step 4. ヒント文 → §3.3

### Step 5. リスト本体（唯一の可変領域）
```scss
.list {
  flex: 1 1 auto;
  min-height: 0;
  overflow-y: auto;
  overscroll-behavior: contain;
  touch-action: pan-y;
  display: flex;
  flex-direction: column;
  gap: 11px;
  padding: 4px 0;
}
```

#### Step 5a. 強化タブの行（縦並び 2 段）→ §3.4

#### Step 5b. リサイクルタブの行（横並び 1 段）→ §3.5

#### Step 5c. 断片→インゴット変換ヒント（リサイクル末尾）→ §3.6

### Step 6. 一括分解バー（リサイクル時のみ）→ §3.7

### Step 7. フッタ → §3.10

### Step 8. 強化確認ダイアログ → §3.8
ローカルアニメ:
```scss
@keyframes forge-spark {
  0%, 100% { opacity: 0.3; transform: scale(0.85); }
  50%      { opacity: 1;   transform: scale(1.15); }
}
```
3 つの ✦ は確認ダイアログの ItemSprite カードに `position: relative;` を付け、
`<span>✦</span>` を `position: absolute;` で 3 箇所配置。

### Step 9. 分解確認ダイアログ → §3.9

---

## 6. 検証

```sh
yarn lint
yarn test --run
yarn tsc -b
```

すべて緑にする。

---

## 7. コミット

```
feat(redesign-A): rebuild forge page to match mock v2

- flat underline tabs (forge / recycle)
- forge row: 2-row card (sprite + name + atk preview / 3-col ingot buttons)
- max forged shows MAX chip
- recycle row with fragments hint footer
- enhance confirm dialog: 72px sprite + 3 sparkles + +N → +M + cost box
- danger-styled bulk recycle confirm

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
```

push 不要。SHA を最終応答で報告。

---

## 追加トークン要求

- `_obsidian.scss` への追加は不要。
- forgeSpark 用 `@keyframes forge-spark` は画面側 SCSS のローカルとして置く（CSS Modules 内）。

