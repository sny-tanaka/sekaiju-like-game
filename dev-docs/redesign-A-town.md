# redesign-A — town（拠点ハブ）改訂版 v5 — 案A v3 完全対応

`案A v3` で確定した out-of-spec 判断（`dev-docs/design-source-v3-changelog.md` §B）を、
拠点ハブに完全反映するための指示書。v3/v4 の差分修正で実装が大方追従しているため、
本書は **「v3 仕様準拠のコードレビュー＋未対応の細部仕上げ」** を主眼とする。

- 元モック: `/tmp/sekaiju-design/案A_v3.dc.html` line 230〜400（02 town、5 サブ状態
  `2a hub 拠点 / 2b hub 潜行 / 2c hub 団員0 / 2d diveFloorSelect / 2e diveTransition`）
- 現状実装: `src/pages/town/index.tsx`, `src/pages/town/style.module.scss`
- v4 で取り込み済みの構造（2x2 グリッド + ダイブ大カード + bottom-sheet + 封蝋演出 +
  ⚙ サウンドモーダル + 「自動保存済 ・ HH:MM」インジケータ）は **そのまま温存**。

> 関連: 全体方針は `dev-docs/redesign-A.md`（§1 デザイントークン / §1.5 レイアウト運用ルール）参照。

---

## 1. 触ってよいファイル / 触ってはいけないファイル

### 触ってよい

- `src/pages/town/index.tsx` — autosave ラベル / ヘッダ / ⚙ モーダルの細部のみ調整。**ダイブ→ワープ統合の構造（bottom-sheet）は変更しない**。
- `src/pages/town/style.module.scss` — autosave インジケータ / `⚙` ボタン / モーダル枠の色・角丸・gap などの細部のみ
- `src/pages/town/Town.stories.tsx` — 既存ストーリー（`hub` / `dive-mode` / `no-members` / `warp` 等）は **変更しない**。視覚回帰の確認用にしか使わない

### 触ってはいけない（厳守）

- `src/_obsidian.scss`（トークン定義。`--bg-deep` 等の値変更は不可）
- `src/index.scss`（global reset / body 背景）
- `src/components/common/InkSplatter/*`（封蝋スタンプ本体）
- `src/components/common/SoundSettings/*`（共通サウンド UI）
- `src/store/gameState.ts` / `src/domain/dive.ts` / `src/domain/saveData.ts` — **ロジック・型は触らない**。
  `savedAt` は既存の `SaveData.savedAt` をそのまま読み出すだけ（フィールドはすでに存在）。
- 他画面（dungeon / codex / battle 等）

---

## 2. やってはいけないこと

1. **Agent / Task の spawn 禁止**。自分で Edit / Write / Bash を使って実装すること。
   `general-purpose` 等のサブ委譲も禁止。
2. **共通コンポーネントの変更禁止**。`InkSplatter` / `SoundSettings` / `CharacterPortrait` /
   `EnemySprite` 等に手を入れない（API 変更も禁止）。
3. **ロジック・データ型の大幅変更禁止**。`SaveData` / `SaveMeta` / `useGameState` の interface は触らない。
   本書はあくまで「表示と見た目」の調整のみ。
4. **ヘッダ ⚙ から開くモーダルの中身を組み直さない**。既存 `SoundSettings` をそのまま内包する形を維持。
5. **モックの「FOE 警戒 ! 赤パルス」のような dungeon 装飾を流用しない**。town には warning pulse は要らない。
6. **モックに無い要素（戦闘プレビュー、メニュー外の通知バナー等）を勝手に追加しない**。

---

## 3. モックとの差分一覧 + out-of-spec 判断の反映

`dev-docs/design-source-v3-changelog.md` §B の town 行を、本リポでどう実装するかの最終写像。

| out-of-spec 項目 | v3 判断 | 本リポでの状態 | v5 でやること |
|---|---|---|---|
| ヘッダ ⚙ | **追加** | 実装済（`gearBtn`） | コードレビュー: tap で `SoundSettings` モーダルが開くこと・aria-label `設定` が付くこと・34px ではなく **32px 円**（モック準拠）であることを確認。32px 化済ならそのまま。 |
| 自動保存済 ・ HH:MM | **追加** | 実装済（`.autosave` ＋ `.autosaveDot`） | コードレビュー: `save.savedAt` 由来で `HH:MM` を `toLocaleTimeString('ja-JP',{hour12:false})` で出している事・色 `#5d8a6c`・丸ドット 6px・`obsidian-glowPulse 2.5s` で点滅していること・`save.savedAt===0` の場合に時刻なしで「自動保存済」だけ出ること、を確認。**潜行中（diveState あり）は autosave を表示しない**現状仕様を維持（モック 2b は autosave 行なし）。 |
| ダイブ→ワープ統合 | **追加** | 実装済（`warpOpen` bottom-sheet で 1F + 解放チェックポイントを一覧） | コードレビュー: 独立した「ワープ」タイルが復活していないこと、bottom-sheet 1 つに統合されている事を確認。 |

### 細部差分（v5 で潰す）

- **3-1. ヘッダ高**: モックは `height:104px` の固定枠。現状 `.head` は `padding:18px 22px 14px` の auto 高で十分だが、`headTop` 〜 `stats` の `margin-top:12px` が空きすぎる場合は **`margin-top:12px` を維持**（モック準拠）。
- **3-2. ⚙ ボタン**: モックは `32px 円 / border 1px rgba(201,168,106,.4) / color #c9a86a / font-size 14px`。現状の `.gearBtn` がこの値か確認し、ズレていれば合わせる。
- **3-3. autosave 位置**: モック 2a では `position:absolute;left:20px;right:20px;bottom:74px` で「タイトルへ戻る」ボタンの上に固定。本リポでは flex item として `menu` と `foot` の間に置いている（§1.5 レイアウト運用ルールに従い `bottom: NN px` を直書きしない）。`margin-top:12px` の調整のみで対応。
- **3-4. autosave 非表示条件**: 現状コードは `hasMembers && !diveState` で出している。モック 2b（潜行中）は表示なし、2c（団員0）は表示なし、2a（通常）は表示あり — に一致するので維持。
- **3-5. bottom-sheet の `sheetItemHilight`**: モックの「45F = 最深チェックポイント」相当の `background:rgba(201,168,106,.1);border:1px solid rgba(201,168,106,.5)` を本リポで `styles.sheetItemHilight` に持っているか確認。無い場合は SCSS に追加。
- **3-6. bottom-sheet の primary action**: モックは末尾に「`{depth}F へ潜る`」の gold ボタンがあるが、本リポは「セル直タップ＝ダイブ実行」UI を採用（ボタン省略）→ §「やってはいけないこと」§6 に従い、モックの primary ボタンを **無理に復活させない**。close ボタン（`とじる`）はそのまま。
- **3-7. 章マーク**: モックは `❦ 拠点`。現状一致。文字列を変えない。

---

## 4. データ拡張の方針

**不要**。`SaveData.savedAt` / `SaveMeta.savedAt` は既存フィールドで、town 表示用に新規追加は無い。
schemaVersion を上げず、マイグレーションも書かない。

---

## 5. 実装ステップ

> 想定: ほぼコードレビューと細部スタイル微修正のみ。新規ロジックなし。

1. **既存ストーリー確認**: `yarn storybook --host 0.0.0.0` を立ち上げ、`pages/town` 配下のすべてのストーリーが現状壊れていない事を視認。
2. **`src/pages/town/index.tsx` を読む**:
   - `autosaveLabel` の構築が「`save.savedAt===0` で `自動保存済` 単独 / それ以外で `自動保存済 ・ HH:MM`」になっているか確認。
   - `setSoundOpen(true)` が `⚙` クリック時に呼ばれているか確認。
   - bottom-sheet 内で `deepestSheetFloor` 判定が「1F 以外で最大」となっているか確認（モック 2d は `45F` が最深ハイライト）。
   - 上記が崩れていれば直す。崩れていなければ **コードに触らない**。
3. **`src/pages/town/style.module.scss` を読む**:
   - §3-2 / §3-3 / §3-5 で挙げた値を全部チェック。
   - `.autosave` の `color:#5d8a6c` / `.autosaveDot` の `background:#5d8a6c` / `animation:obsidian-glowPulse 2.5s ease-in-out infinite` が揃っているか確認。
   - `.gearBtn` の `width:32px;height:32px` / `border-radius:50%` / `border:1px solid rgba(201,168,106,.4)` を確認。
   - `.sheetItemHilight` の background / border が `rgba(201,168,106,.1)` / `rgba(201,168,106,.5)` か確認。
   - 不一致だけ Edit する。
4. **動作確認**:
   - Storybook の `hub-with-party` / `hub-dive-mode` / `hub-no-members` で:
     - 2a 相当: autosave ラベル表示・⚙ で SoundSettings モーダル開閉。
     - 2b 相当: autosave ラベル非表示・他タイルが disabled。
     - 2c 相当: ダイブカード disabled・ギルド管理が `tileGuide` で誘導表示・autosave 非表示。
5. **検証ゲート（必須）**:
   - `yarn lint`
   - `yarn test`
   - `yarn build`（または `npx tsc -b`）
   - 上記 3 点が全て緑になるまで終了しない。**vitest と eslint は型を見ない**ので `tsc -b` は必ず通すこと。
6. 成果物に影響がある変更（`src/` 配下を触った）なら **`yarn build` を実行して `docs/` を更新**し、コミットに含める。

---

## 6. 検証

実装後、ディレクター（メインエージェント）が以下を確認する:

- **見た目**: Storybook で `pages/town--hub-with-party` / `pages/town--hub-dive-mode` / `pages/town--hub-no-members` / `pages/town--warp-sheet` を撮り、モック 2a〜2d と並べてズレが無いか目視。撮影は `dev-docs/screenshot-setup.md` 準拠（Noto Sans JP / `ignoreHTTPSErrors:true` / `document.fonts.ready` 待ち）。
- **動作**:
  - ⚙ → SoundSettings モーダルが開く / 閉じる。
  - ダイブカード → bottom-sheet → セルタップで封蝋演出 → `dungeon` 遷移。
  - 潜行中の `hub-dive-mode` で他タイルが disabled、`潜行を再開` で `dungeon` へ。
  - autosave ラベルが `HH:MM` 形式で表示される（`save.savedAt` を Date 化、24h・ja-JP）。
- **品質ゲート**: `yarn lint` / `yarn test` / `yarn build` 全緑。

---

## 7. コミット

- ブランチ: `feature/redesign-A`（既存）。新規 PR を切らない。
- メッセージ例: `refactor(town): v5 で自動保存表示・⚙ 細部を案A v3 へ整合`
- 触ったファイルだけ `git add` してコミット（`git add -A` は禁止）。
- 成果物に影響する変更があれば `yarn build` 済の `docs/` を含める。
- PR は作らない（ディレクターが他画面とまとめてレビューする）。
