# redesign-A — town（拠点ハブ）改訂版 v3 — 差分修正

`案A v2` モックを v2 実装が大筋取り込んだ後、ユーザーから **「まだデザインと異なる部分がある、しっかりレビューしてください」** との指摘を受けた残差分を埋めるための指示書。**v2 で取り込めた部分はそのまま維持し、本書で列挙する差分だけを直す**。

- 元モック: `/tmp/sekaiju-design/案A_v2.dc.html` line 246–360（`02 town` セクション、5 サブ状態 `hub 拠点 / hub 潜行 / hub 団員0 / diveFloorSelect / diveTransition`）
- 現状実装: `src/pages/town/index.tsx` + `src/pages/town/style.module.scss`
- v2 で取り込み済みの構造（2x2 グリッド + ダイブ大カード + bottom-sheet + 封蝋演出 + サウンドモーダル）は **触らない**。

---

## 1. 触ってよいファイル / 触ってはいけないファイル

### 触ってよい
- `src/pages/town/style.module.scss` — 本書 §3 で挙げた差分のスタイル調整
- `src/pages/town/index.tsx` — 統計表示ロジックの 1 箇所のみ修正（§3.A-1 「最高 −」常時表示）と bottom-sheet 最深ハイライト用 className 付与（§3.G-20）。それ以外の JSX 構造は変更しない
- `src/pages/town/Town.stories.tsx` — 既存 4 ストーリーは変更しない。視覚回帰の確認用にしか使わない

### 触ってはいけない（厳守）
- `src/_obsidian.scss`（トークン定義。値の変更は本書 §「追加トークン要求」参照）
- `src/components/common/InkSplatter/*`（封蝋スタンプ本体）
- `src/components/common/SoundSettings/*`（モーダル内に埋め込んでいるサウンド設定）
- `src/store/**`、`src/domain/**`、`src/audio/**`（ロジック・遷移・SFX）
- `src/__stories__/**`（mock SaveData / decorator）
- 他ページ（`title` / `not-found` 等）の SCSS / TSX

---

## 2. やってはいけないこと

- **構造の再設計禁止**: 既存の `layout > head + hint(opt) + menu + autosave(opt) + foot + sheetOverlay + modalBackdrop + sealOverlay` の DOM ツリーを差し替えない。差分はあくまで「色 / 数値 / 1 箇所の条件分岐追加」で吸収する。
- **絶対配置で要素を作り直さない**。モック原本は `position:absolute; bottom:74px / bottom:22px` で「自動保存済」「タイトルへ戻る」を貼り付けているが、これは redesign-A.md §1.5 のレイアウト運用ルール（**絶対配置 + 固定 `top` / `bottom` で画面を組まない**）と衝突する。**現状の flex 配置を維持する**。
- 機能仕様にないボタン（ワープ専用ボタン、図鑑からの直接遷移など）を追加しない。
- ロジック（`startDive` / `navigate` / `useSfx` 呼出順）の変更禁止。
- 既存テスト assert を変更しない。

---

## 3. モックとの差分一覧

スクショ `/tmp/sekaiju-screenshots-current/pages-town--with-party.png` および `pages-town--mid-dive.png` と、モック HTML 原本（line 246–321）の **CSS 数値・色** をピクセルレベルで照合した結果。**v2 で見た目が取り込めていない項目だけ列挙**。

### A. 全状態共通（ヘッダー / 統計）

1. **「最高 0F」のとき統計バーから列ごと消えている**（`pages-town--with-party.png` 上部）。
   - 現状: `towerState.record.deepestReached > 0` のときだけ `最高 NF` を出している（`index.tsx` L110-112）。
   - モック: 団員 0 サブ状態でも `最高 −` を必ず出している（line 310: `<span style="color:#8c8a84">最高 −</span>`）。
   - **修正**: `deepestReached` が 0 の場合は `最高 −`（U+2212 マイナス）と表示。条件分岐を削除し、`{deepest > 0 ? '最高 ' + deepest + 'F' : '最高 −'}` の三項に変える。`statFaint` クラスのままで OK。

2. **ヘッダー下端の金箔線が濃すぎる**（スクショの「うつくしき台帳」直下の横線）。
   - 現状: `.head { border-bottom: 1px solid var(--rule-gold); }` → 透過 0.3。
   - モック: `border-bottom:1px solid rgba(201,168,106,.16)`（line 254）。
   - **修正**: `border-bottom: 1px solid rgba(201, 168, 106, 0.16);` に直接書き換える（後述「追加トークン要求」も参照）。

3. **⚙ボタンの border が濃すぎる**。
   - 現状: `border: 1px solid var(--rule-gold-strong);` → 0.5。
   - モック: `border:1px solid rgba(201,168,106,.4)`（line 257）。
   - **修正**: `border: 1px solid rgba(201, 168, 106, 0.4);` に変更。

### B. ダイブ大カード（`.dive`）

4. **disabled 時の見た目が opacity 0.55 一括処理で「灰色化」されていない**（団員 0 のとき）。
   - 現状: `.dive[disabled] { opacity: 0.55; animation: none; }` のみ。背景は青系グラデのまま。
   - モック: 団員 0 サブ状態でカード自体を `background:#101218; border:1px solid rgba(255,255,255,.05)` に差し替え、`opacity:.55`、`DIVE` バッジ色 `#7c7a74`、タイトル色 `#7c7a74`、desc 色 `#e0917f` で「灰色 + 赤の警告」に統一（line 314）。
   - **修正**: `.dive[disabled]` ブロックに次を追加:
     - `background: #101218;`
     - `border-color: rgba(255, 255, 255, 0.05);`
     - `animation: none;`（既存維持）
   - `.dive[disabled] .diveBadge { color: #7c7a74; }` を追加。
   - `.dive[disabled] .diveTitle { color: #7c7a74; }` を追加。
   - `.dive[disabled] .diveDesc { color: #e0917f; }` （現状 `var(--danger-text)` = `#e09180` で近いが、モック準拠で `#e0917f` を直書きで OK）。
   - `.dive[disabled] .diveDecor { color: rgba(255, 255, 255, 0.05); }` を追加（金箔「塔」装飾を隠す）。

5. **ダイブカードの desc 行の `margin-top` が小さい**。
   - 現状: `.diveDesc { margin-top: 3px; }`
   - モック: `margin-top:6px`（line 266）。
   - **修正**: `margin-top: 6px;`。

6. **RESUME カードの desc 文字色が灰のまま（緑系になっていない）**。
   - 現状: `.diveDesc { color: var(--text-mute); }` で潜行時もそのまま（`#9a958a` 灰）。
   - モック: 潜行モード `font-size:11px;color:#9ed8b4;margin-top:6px`（line 292）。緑系。
   - **修正**: `.diveResume .diveDesc { color: #9ed8b4; }` を追加。

### C. 2x2 タイル（`.tile`）

7. **タイル ラベル色がモックよりわずかに明るい**。
   - 現状: `.tileLabel { color: var(--text-strong); }` → `#f2ede1`。
   - モック: `color:#e8e6e0`（line 268-271）。
   - **修正**: `.tileLabel { color: #e8e6e0; }` に直書き。

8. **タイル desc 色がモックよりわずかに明るい**。
   - 現状: `.tileDesc { color: var(--text-faint); }` → `#8c8a84`。
   - モック: `color:#7c7a74`（line 268-271）。
   - **修正**: `.tileDesc { color: #7c7a74; }` に直書き。

9. **タイル disabled 時の desc 色が暗すぎる**。
   - 現状: `.tile[disabled] .tileDesc { color: var(--text-quote); font-size: 10px; }` → `#6b6f7a` 紫寄り。
   - モック: `color:#5d5a52;font-size:10px`（line 294-297）。グレー寄り。
   - **修正**: `.tile[disabled] .tileDesc { color: #5d5a52; }`（font-size 10px は維持）。

10. **タイル disabled 時のラベル色も暗くするべき**。
    - 現状: `.tile[disabled] .tileLabel { color: var(--text-mute); }` → `#9a958a`。
    - モック: `color:#7c7a74`（line 294-297）。やや暗い。
    - **修正**: `.tile[disabled] .tileLabel { color: #7c7a74; }`。

### D. 団員 0 のヒント & ガイドカード

11. **ヒントカード文字色がやや明るすぎる**。
    - 現状: `.hintGold { color: var(--text-strong); }` → `#f2ede1`。
    - モック: `color:#d8c79a`（line 312）。金茶寄り。
    - **修正**: `.hintGold { color: #d8c79a; }`。

12. **ヒントカード `border` が薄い**。
    - 現状: `.hintGold { border: 1px solid var(--rule-gold-strong); }` → 0.5。
    - モック: `border:1px solid rgba(201,168,106,.4)`（line 312）。
    - **修正**: `.hintGold { border: 1px solid rgba(201, 168, 106, 0.4); }`。

13. **ギルド管理ガイドカードのヒント文字 `margin-top`**。
    - 現状: `.tileGuideHint { color: var(--gold); }` で `gap` 経由 2px。
    - モック: `margin-top:2px`（line 315）。
    - **動作確認のみ**。親 `.tileGuideText { gap: 2px; }` が効いていれば差分なし。

### E. 潜行モードのヒント

14. **潜行ヒントの line-height がモックで明示されている**。
    - 現状: `.hintBlue { font-size: 11px; }`（line-height 未指定）。
    - モック: `padding:11px 14px;font-size:11px;line-height:1.6`（line 287）。
    - **修正**: `.hintBlue { line-height: 1.6; }` を追加。padding は `.hint` 共通で 12px 14px のまま（1px 差は許容）。

15. **潜行ヒントの色 / 背景トークン**。
    - 現状: `background: var(--info-blue-tint); border: 1px solid var(--info-blue-rule); color: var(--info-blue-text);` → トークン値はそれぞれ `rgba(111,159,216,.08)` / `rgba(111,159,216,.30)` / `#9cc2ec`。
    - モック: line 287 と完全一致。
    - **差分なし**。OK。

### F. 自動保存インジケータ & フッタ

16. **自動保存インジケータの色**。
    - 現状: `color: #5d8a6c;` / dot `background: #5d8a6c;`。
    - モック: `color:#5d8a6c`（line 273）。
    - **差分なし**。OK。

17. **「タイトルへ戻る」ボタン**。
    - 現状: 46px / border 0.45 / `var(--danger-text)` (`#e09180`) / 13px / .16em。
    - モック: line 274 と完全一致。
    - **差分なし**。OK。

### G. ダイブ先選択 bottom-sheet（モック 2d）

18. **`sheetTitle` 直下のマージン**。
    - 現状: `.sheetHead` 直後に `.sheetList` が `gap: 14px` で続く。
    - モック: `sheetHead` 下に `margin-bottom:16px`（line 332）。
    - **修正**: `.sheet { gap: 16px; }`（現状 14px から 16px に上げる）。

19. **sheet ハンドルの下マージン**。
    - 現状: `.sheet { gap: 14px }` 依存で 14px。
    - モック: `margin:0 auto 18px`（line 331）。
    - **§3.G-18 で gap を 16px に上げれば許容範囲内**。追加修正不要。

20. **選択中アイテムの強調表示が現状実装に無い**。
    - 現状: 全 sheet item が `#1a1d26` 背景の同じスタイル。
    - モック: 選択中（45F・最深チェックポイント）だけ `background:rgba(201,168,106,.1); border:1px solid rgba(201,168,106,.5);` で **金箔ハイライト**、ラベル末尾に「・最深チェックポイント」付き（line 335）。
    - **モックは「選択中」状態の装飾だが**、現状実装は **タップ即遷移** なので選択状態を持たない。
    - **修正方針**: 解放済みフロアのうち **最深 = 最高解放階** のときだけ装飾的にハイライトする（タップ動作は変えない）。
      - `.sheetItem` に modifier `.sheetItemHilight` を新規追加し、TSX で `d === deepestSheetFloor && d !== 1` のときだけ付与。
      - スタイル:
        ```scss
        .sheetItemHilight {
          background: rgba(201, 168, 106, 0.1);
          border-color: rgba(201, 168, 106, 0.5);
        }
        .sheetItemHilight .sheetDepth { color: var(--gold); }
        .sheetItemHilight .sheetItemLabel { color: #e8e6e0; }
        ```
      - ラベルも該当行だけ「第 N 帯・最深チェックポイント」に置き換える。
      - **これは v2 で取りこぼした項目**。

21. **モックには「N F へ潜る」金箔プライマリボタンがある**（line 343）。
    - 現状: タップ即遷移 UX。プライマリボタンなし。
    - **判断**: 機能的に「タップ即潜行」を維持する方針。**モック準拠でこのボタンを追加しない**（取りこぼし扱いにしない）。

### H. ダイブ演出（モック 2e）

22. **`.sealCaption` の色**。
    - 現状: `color: var(--text-quote);` → `#6b6f7a` 紫寄り。
    - モック: `color:#5d5a52`（line 356）。グレー寄り。
    - **修正**: `.sealCaption { color: #5d5a52; }`。

23. **`.sealOverlay` の背景**。
    - 現状: `radial-gradient(circle at 50% 50%, rgba(138,47,42,.22), rgba(7,8,9,.6) 65%, rgba(7,8,9,.9) 100%)`
    - モック: `background:#070809` + `radial-gradient(circle at 50% 50%,rgba(120,30,28,.18),transparent 60%)`（line 354）。
    - **差分は微小**。現状維持で OK。

### I. ショート画面メディアクエリ

24. **`@media (max-height: 720px)` のタイル高 `104px`**。
    - iPhone SE で 4 タイル + ヘッダー + ダイブ + フッタが収まるか視覚確認のみ。**修正不要**（v2 から構造維持）。

---

## 4. ゴール（Storybook ストーリー一覧）

既存 4 ストーリーは変更しない:

| Story id | mock 状態 | 期待結果 |
| --- | --- | --- |
| `pages-town--empty-guild` | 団員 0 ・ヒント表示 ・ダイブ大カードが灰色化 ・ガイドカード金箔 | 「最高 −」がヘッダー統計に出る。ダイブが灰系（青グラデでない）+ desc が赤系。 |
| `pages-town--with-party` | 団員あり ・ダイブ可 | deepestReached が 0 のとき「最高 −」が出る。タイル desc 色が `#7c7a74` 系。 |
| `pages-town--mid-dive` | 潜行中 ・他タイル全部 disabled ・自動保存非表示 ・RESUME カード | RESUME カード desc が緑系 (`#9ed8b4`)。 |
| `pages-town--post-boss` | チェックポイント解放 ・通常 hub | bottom-sheet を開くと最深階が金箔ハイライトされる。 |

差分修正後、4 ストーリー全部を Storybook で撮影し、`/tmp/sekaiju-design/案A_v2.dc.html` の 2a / 2b / 2c / 2d と並べて確認する。

---

## 5. 実装ステップ（差分のある部分だけを直す）

サブエージェント（sonnet）に以下を順に実行させる。**自分で Edit/Write/Bash を使って実装すること。さらにサブエージェント（Agent/Task）を spawn しないこと**。

### Step 1: `index.tsx` の統計行を直す（§3.A-1）

該当箇所: `src/pages/town/index.tsx` L110-112

```tsx
<span className={styles.statFaint}>
  最高 {towerState.record.deepestReached > 0 ? `${towerState.record.deepestReached}F` : '−'}
</span>
```
※ `−` は U+2212（マイナス記号、半角ハイフンではない）。

### Step 2: bottom-sheet の最深ハイライト用 className 付与（§3.G-20）

`src/pages/town/index.tsx` の `sheetFloors.map` 周辺で、`deepestSheetFloor` を計算してハイライト判定する:

```tsx
const deepestSheetFloor = sheetFloors.length > 1 ? sheetFloors[sheetFloors.length - 1] : null;

// ...
{sheetFloors.map((d) => {
  const isDeepest = d === deepestSheetFloor && d !== 1;
  return (
    <button
      type="button"
      key={d}
      className={`${styles.sheetItem} ${isDeepest ? styles.sheetItemHilight : ''}`}
      onClick={() => void handleSelectFloor(d)}
    >
      <span className={styles.sheetDepth}>{d}F</span>
      <span className={styles.sheetItemLabel}>
        {isDeepest ? `第 ${Math.ceil(d / 10)} 帯・最深チェックポイント` : floorLabel(d)}
      </span>
    </button>
  );
})}
```

### Step 3: `style.module.scss` をピンポイント書き換え

各差分を該当セレクタだけ上書き。**他のセレクタは触らない**。

- `.head { border-bottom: 1px solid rgba(201, 168, 106, 0.16); }`（§3.A-2）
- `.gearBtn { border: 1px solid rgba(201, 168, 106, 0.4); }`（§3.A-3）
- `.dive[disabled]` ブロックに `background: #101218; border-color: rgba(255, 255, 255, 0.05);` を追加し、`animation: none;` は維持（§3.B-4）
- `.dive[disabled] .diveBadge { color: #7c7a74; }`、`.dive[disabled] .diveTitle { color: #7c7a74; }`、`.dive[disabled] .diveDesc { color: #e0917f; }`、`.dive[disabled] .diveDecor { color: rgba(255, 255, 255, 0.05); }` を追加（§3.B-4）
- `.diveDesc { margin-top: 6px; }`（§3.B-5）
- `.diveResume .diveDesc { color: #9ed8b4; }` を新規追加（§3.B-6）
- `.tileLabel { color: #e8e6e0; }`（§3.C-7）
- `.tileDesc { color: #7c7a74; }`（§3.C-8）
- `.tile[disabled] .tileLabel { color: #7c7a74; }`（§3.C-10）
- `.tile[disabled] .tileDesc { color: #5d5a52; }`（§3.C-9）※ font-size 10px は維持
- `.hintGold { color: #d8c79a; border: 1px solid rgba(201, 168, 106, 0.4); }`（§3.D-11, D-12）
- `.hintBlue { line-height: 1.6; }` を追加（§3.E-14）
- `.sheet { gap: 16px; }`（14px → 16px、§3.G-18）
- `.sheetItemHilight` を新規追加（§3.G-20）:
  ```scss
  .sheetItemHilight {
    background: rgba(201, 168, 106, 0.1);
    border-color: rgba(201, 168, 106, 0.5);
  }
  .sheetItemHilight .sheetDepth { color: var(--gold); }
  .sheetItemHilight .sheetItemLabel { color: #e8e6e0; }
  ```
- `.sealCaption { color: #5d5a52; }`（§3.H-22）

### Step 4: 検証 → コミット → commit SHA をディレクターへ報告

---

## 6. 検証

### 6.1 静的検証（必須・全部緑）
- `yarn test`（vitest）
- `yarn lint`（eslint）
- `yarn build`（`tsc -b` + `vite build`）— 成果物 `docs/` 更新を含む

### 6.2 視覚回帰（Storybook）
- `yarn storybook --host 0.0.0.0` を起動。
- iPhone 14 (393x852) viewport で `Pages/Town` 4 ストーリーを順番に撮影。
- スクショは git に含めない（`/tmp/sekaiju-screenshots-v3/` 等）。
- 並べる比較対象: `/tmp/sekaiju-design/案A_v2.dc.html` の 2a / 2b / 2c / 2d。
- 確認ポイント:
  - 統計バーに「最高 −」 or 「最高 NF」が **必ず** 出る。
  - 団員 0 でダイブカードが **青系でなく** 灰系 + 赤の警告文 (`#e0917f`)。
  - 潜行モードで RESUME カード desc が緑系 (`#9ed8b4`)。
  - 通常モードでタイル desc 色が `#7c7a74`、disabled で `#5d5a52`。
  - bottom-sheet で最深階（1F 以外）だけ金箔ハイライト + 「・最深チェックポイント」表記。

### 6.3 スマホ実機確認
`yarn dev --host 0.0.0.0` を立ち上げ、`http://<private IP>:5173/sekaiju-like-game/` をスマホで開く。URL バー表示時の dvh で「タイトルへ戻る」「自動保存済」が menu と被らないことを確認（v2 から構造変更しないので、本来は問題ない）。

---

## 7. コミット

最終コミットメッセージ例:

```
feat(town): redesign-A v3 — モックとの残差分を埋める

- 統計バーに「最高 −」を常時表示
- ダイブカード disabled 時を青系→灰系 + 赤系警告に変更
- RESUME カード desc を緑系 (#9ed8b4) に
- タイル ラベル/desc 色をモック準拠 (#e8e6e0 / #7c7a74)
- 団員0 ヒントの色を金茶系に (#d8c79a)
- bottom-sheet で最深チェックポイントを金箔ハイライト
- ヘッダー下端の金箔線を 0.3→0.16 に弱める
```

- `yarn build` で `docs/` 更新後、`docs/` と `package.json` のバージョン bump をコミットに含める。
- **push はしない**。ディレクターが PR 作成時に push する。

---

## 追加トークン要求

`_obsidian.scss` への新規トークンは **不要**。今回の差分は既存トークンで吸収できない数値（`rgba(201,168,106,.16)`, `rgba(201,168,106,.4)`, `#d8c79a`, `#9ed8b4`, `#7c7a74`, `#5d5a52`, `#e8e6e0`, `#e0917f`, `#101218`）を SCSS に直書きする方針で済ませる。理由:

- いずれも **town 画面でしか出てこない値**（モック特有のミドルトーン）。
- 既存 `--rule-gold` (0.3) と `--rule-gold-strong` (0.5) の中間に 0.16 / 0.4 が必要だが、別画面で再利用される予定が今のところ無い。
- 他画面で同じ中間値が頻出するようなら、後フェーズで `--rule-gold-faint` (0.16) / `--rule-gold-mid` (0.4) を追加する余地を残す。

**サブエージェントへ**: 他の v3 指示書（not-found / battle / shop 等）でも同じ rgba 値が頻出すると判明したら、自分でトークン追加せず、ディレクターに「`_obsidian.scss` に `--rule-gold-faint` / `--rule-gold-mid` を追加してほしい」と報告のみ行うこと。
