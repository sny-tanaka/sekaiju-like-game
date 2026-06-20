# redesign-A — dungeon（探索）改訂版 v5 — 案A v3 完全対応

`案A v3` で確定した out-of-spec 判断（`dev-docs/design-source-v3-changelog.md` §B）を、
探索画面（ダンジョン）に完全反映するための指示書。v4 段階で構造の大半は揃っているが、
v3 が確定したことで「**全体マップは削除**」「設定は **SoundSettings 化**」
「⚠ ボスゲート警告は **正式表示**」「☰ メニューに **自動保存時刻**」を仕上げる。

- 元モック: `/tmp/sekaiju-design/案A_v3.dc.html` line 800〜965（08 dungeon、4 サブ状態
  `8a explore / 8b encounter+gather+cook / 8c menu / 8d item-use`）
- 現状実装: `src/pages/dungeon/index.tsx`, `src/pages/dungeon/style.module.scss`
- v4 で取り込み済みの構造（一人称ビュー帯 ＋ オートマップ主役 ＋ 階段カード ＋ 採集／調理カード ＋
  ☰ メニュー ＋ アイテム使用パネル ＋ 確認ダイアログ）は **そのまま温存**。

> 関連: 全体方針は `dev-docs/redesign-A.md`（§1 デザイントークン / §1.5 レイアウト運用ルール）。
> §1.5 を破った絶対配置を **絶対に書き戻さない**こと。

---

## 1. 触ってよいファイル / 触ってはいけないファイル

### 触ってよい

- `src/pages/dungeon/index.tsx` — ☰ メニューの再構成（§5 参照）、⚠ ボスゲート警告の表示、SoundSettings モーダルの追加、☰ 内 autosave 表示
- `src/pages/dungeon/style.module.scss` — 上記に対応するクラス追加・調整
- `src/pages/dungeon/Dungeon.stories.tsx` — 必要なら `mockMidDive` を用いて「☰ 開いた状態」「ボス階手前で警告が出ている状態」のストーリーを追加してよい。**既存ストーリーは変更しない**

### 触ってはいけない（厳守）

- `src/_obsidian.scss`（トークン定義）
- `src/index.scss`
- `src/components/common/FirstPersonView/*`
- `src/components/common/DungeonMap/*`
- `src/components/common/EncounterGauge/*`
- `src/components/common/CharacterPortrait/*` / `ItemSprite` / `EnemySprite`
- `src/components/common/SkillTree/*`（メニュー内スキル振り。SkillTree は v3 で対象外）
- `src/components/common/SoundSettings/*` — そのまま埋め込むのみ
- `src/domain/dive.ts` / `src/domain/movement.ts` / `src/domain/encounter.ts` / `src/domain/gather.ts` / `src/domain/cooking.ts` / `src/domain/itemUse.ts` — **ロジックは触らない**
- 他画面（town / codex / battle 等）

---

## 2. やってはいけないこと

1. **Agent / Task の spawn 禁止**。自分で Edit / Write / Bash を使うこと。
2. **共通コンポーネントの変更禁止**。`SoundSettings` / `FirstPersonView` / `DungeonMap` / `SkillTree` / `EncounterGauge` 等の API・実装を変えない。
3. **ロジック大幅変更禁止**。`canAscend` / `stairsAt` / `gatheringPointHere` 等の純関数を新規作成・改名しない。本書は表示と画面構成のみ。
4. **絶対配置の解禁禁止**。§1.5 の flex 積みパターンを守る。`position:absolute; bottom: NNpx` は背景装飾・モーダルのみ。
5. **「次バージョンで実装予定」notice の温存禁止**。`全体マップ` ボタンは削除する（モック準拠）。`設定` は **必ず SoundSettings を実際に開く**ように直す。
6. **ボスゲート警告の判定を勝手に追加しない**。**`canAscend(save, depth)` の戻り値の否定**だけを使う（既存純関数で proxy）。
7. **モックに無い装飾を足さない**。例: 一人称ビューに `corridorPulse` / `bloom` 系のアニメを新規追加しない（既存があれば維持）。

---

## 3. モックとの差分一覧 + out-of-spec 判断の反映

`dev-docs/design-source-v3-changelog.md` §B の dungeon 行を、本リポでどう実装するかの最終写像。

| out-of-spec 項目 | v3 判断 | 本リポでの状態 | v5 でやること |
|---|---|---|---|
| ☰ 設定 | **追加** | 現状: `setNotice('設定は次バージョンで実装予定')` のみで実機能なし | **SoundSettings モーダルを開く**ボタンに置換。town の `⚙` モーダルと同等の見た目（`modalBackdrop` + `modalPanel` + 共通 `SoundSettings` を内包）。 |
| ☰ 全体マップ | **削除** | 現状: `setNotice('全体マップは次バージョンで実装予定')` の placeholder ボタンが残っている | **ボタンごと削除**。`☰` メニューを 「道具を使う / 設定」の 2 列 ＋ 「帰還の糸（全幅 grid-column:1/-1）」に再構成。 |
| ⚠ ボスゲート警告 | **追加** | 現状: 階段カードで `canAscend===false` のとき notice 文を出すが、モックの「**奥にボスゲートの気配**」相当の常設警告は無い | 一人称ビュー（`.fpvWrap`）の上端に **`⚠ 奥にボスゲートの気配`** を `warnBlink` で点滅表示。判定は `canAscend(save, dive.depth)===false` の proxy。**ボス階かつ未撃破時のみ表示**。 |
| 採集結果 複数セル | **削除（1セル化）** | 実装済（`gatherHere` 既に 1 itemId、結果カードも 1 セル） | コードレビューのみ。複数セルが残っていれば消す。 |
| ☰ 自動保存時刻 | **追加** | 現状: ☰ メニュー内に autosave 表示なし | town と同じ「**自動保存済 ・ HH:MM**」インジケータを `.menuPanel` のフッタ直前（`menuFooter` 直上）に追加。色 `#5d8a6c` / 丸ドット 6px / `obsidian-glowPulse 2.5s ease-in-out infinite`。`save.savedAt===0` なら時刻なしで「自動保存済」のみ。 |

### 細部差分（v5 で潰す）

- **3-1. ヘッダの ☰ ボタン**: モック 8a は `30x30px / border 1px rgba(201,168,106,.4) / color #c9a86a / font-size 13px`。現状 `.menuBtn` がこの値か確認し、ズレていれば合わせる。**`☰` 文字のみ / `メニュー` のラベルは付けない**（モック準拠）。
- **3-2. ⚠ 警告の見た目**: モック 8a line 811 — `position:absolute;top:10px;left:0;right:0;text-align:center;font-size:10px;color:#e09180;letter-spacing:.14em`。**`.fpvWrap` 内側の上端**に絶対配置（ここは「装飾要素」なので §1.5 の絶対配置許可枠）。`animation: obsidian-warnBlink 1.6s steps(1) infinite` で点滅。文言は **「⚠ 奥にボスゲートの気配」**。
- **3-3. ☰ メニュー再構成（最重要）**: 現状 `.menuActions > .menuGrid` は 2x2 で「道具 / 設定 / 帰還の糸 / 全体マップ」。**全体マップを削除**し、モック 8c line 922〜926 準拠で:
  - 1 行目: `道具を使う`（active 風 `#1a2030` gold border）／ `設定`（通常）
  - 2 行目: `帰還の糸`（`grid-column:1/-1` 全幅、`border-color rgba(143,208,160,.35)`、所持数表示）
  - **3-3-a**: 設定ボタンの onClick は `setMenuOpen(false); setSoundOpen(true);` で、新規 `soundOpen` state を追加して SoundSettings モーダルを開く。
  - **3-3-b**: SoundSettings モーダルは town と同じ `modalBackdrop` / `modalPanel` パターンを `pages/dungeon` 側に複製（共通化はしない、town を import しない）。
- **3-4. ☰ メニュー内 autosave**: モック 8c line 929 — `flex:none;padding:0 20px;display:flex;align-items:center;justify-content:center;gap:8px;font-family:'JetBrains Mono',monospace;font-size:11px;color:#5d8a6c;margin-bottom:12px`、丸ドット `width:6px;height:6px;border-radius:50%;background:#5d8a6c;animation:glowPulse 2.5s ease-in-out infinite`。**`menuFooter` の直前に flex item として置く**（絶対配置しない）。
- **3-5. 帰還の糸ボタンの所持数 0 ハンドリング**: 現状コードは「タップ時に `setNotice('帰還の糸がない')`」となっている。維持。
- **3-6. SoundSettings モーダルの zIndex**: `.menuOverlay` よりも上に出ること。`.menuOverlay` を閉じてから開くので zIndex の衝突は起きないが、`soundOpen` を `menuOpen` より後の判定にして相互排他にする。
- **3-7. 採集結果 1 セル**: モック 8b line 882〜887 は 1 セル。現状コードと一致。維持。
- **3-8. 階段カード**: モック 8b line 894〜895 と現状の `.stairsCard` 構造はほぼ一致。**「ボス階かつ未撃破」のときは `次階へ進む` を disabled にせず、現状の「強大な力に阻まれている」notice を出す挙動を維持**（プレイヤーの試行を許容して教示する）。⚠ 警告は別途常設で示すので、二重通知にはならない。

---

## 4. データ拡張の方針

**不要**。

- `canAscend(save, depth)` は既存純関数。新規作成しない。
- `save.savedAt` は既存フィールド。新規追加しない。
- ⚠ 警告判定は **`isBossFloor(depth) && !canAscend(save, depth)`** の組み合わせで proxy。
  - `isBossFloor` を直接 import するのが嫌な場合は、`canAscend(save, depth) === false` 単独でよい
    （`canAscend` は内部で `isBossFloor` を見ているため、`!canAscend` でボス階かつ未撃破を一意に表現できる）。
- schemaVersion を上げず、マイグレーションを書かない。

---

## 5. 実装ステップ

> 順序を守る。最初に削除、次に追加。

### Step 1. ☰ メニューから「全体マップ」を削除

`src/pages/dungeon/index.tsx` の `.menuGrid` 4 ボタン目（全体マップ）を JSX ごと削除。
`setNotice('全体マップは次バージョンで実装予定')` も消す。
`.menuActions` の grid 構造は、3-3 の通り **`grid-template-columns:1fr 1fr` の 2 列、
帰還の糸は `grid-column:1 / -1` で 2 列ぶち抜き** に再構成。

### Step 2. ☰ メニューの「設定」を SoundSettings 化

- `useState` で `const [soundOpen, setSoundOpen] = useState(false);` を追加。
- `設定` ボタンの onClick を:
  ```ts
  onClick={() => {
    play('cursor');
    setMenuOpen(false);
    setSoundOpen(true);
  }}
  ```
  に変更。
- `setNotice('設定は次バージョンで実装予定')` を消す。
- JSX 末尾の `confirm` モーダルの下あたりに、**town と同じ構造**の SoundSettings モーダルを追加:
  ```tsx
  {soundOpen ? (
    <div
      className={styles.modalBackdrop}
      onClick={() => { play('cursor'); setSoundOpen(false); }}
    >
      <div
        className={styles.modalPanel}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.modalHeader}>
          <span>設定</span>
          <button
            type="button"
            className={styles.modalCloseBtn}
            aria-label="閉じる"
            onClick={() => { play('cursor'); setSoundOpen(false); }}
          >✕</button>
        </div>
        <SoundSettings />
        <button
          type="button"
          className={styles.modalClose}
          onClick={() => { play('cursor'); setSoundOpen(false); }}
        >とじる</button>
      </div>
    </div>
  ) : null}
  ```
- import 文に `import { SoundSettings } from '@/components/common/SoundSettings';` を追加。
- SCSS に `.modalBackdrop` / `.modalPanel` / `.modalHeader` / `.modalCloseBtn` / `.modalClose` を、
  town の `style.module.scss` から **コピーして** `pages/dungeon/style.module.scss` に追加。
  値は town と同等（`backdrop` は `var(--bg-overlay)`、`panel` は `var(--surface-panel)`、角丸 6px、
  影 `var(--shadow-modal)`）。

### Step 3. ⚠ ボスゲート警告を追加

- `dive` の直後に proxy を計算:
  ```ts
  const bossGateAhead = !canAscend(save, dive.depth);
  ```
  既に `canAscend` を import 済（現状コード line 21 参照）。
- `.fpvWrap` の中、`<FirstPersonView .../>` の **直後**に:
  ```tsx
  {bossGateAhead && (
    <div className={styles.bossGateWarn} aria-hidden="true">
      ⚠ 奥にボスゲートの気配
    </div>
  )}
  ```
- SCSS に追加:
  ```scss
  .bossGateWarn {
    position: absolute;
    top: 10px;
    left: 0;
    right: 0;
    text-align: center;
    font-size: 10px;
    letter-spacing: 0.14em;
    color: var(--danger-text); // #e09180 系
    animation: obsidian-warnBlink 1.6s steps(1) infinite;
    pointer-events: none;
    z-index: 2; // FOE スプライト等の上、操作ボタンの下
  }
  ```
  `.fpvWrap` が `position: relative` であることを確認（無ければ追加）。

### Step 4. ☰ メニュー内に「自動保存済 ・ HH:MM」を追加

- `.menuPanel` の中、`menuMemberList` と `menuFooter` の間に flex item として追加:
  ```tsx
  <div className={styles.menuAutosave} aria-hidden="true">
    <span className={styles.menuAutosaveDot} />
    {(() => {
      if (!save.savedAt) return '自動保存済';
      const time = new Date(save.savedAt).toLocaleTimeString('ja-JP', {
        hour: '2-digit', minute: '2-digit', hour12: false,
      });
      return `自動保存済 ・ ${time}`;
    })()}
  </div>
  ```
- SCSS:
  ```scss
  .menuAutosave {
    flex: none;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 0 20px;
    margin-bottom: 12px;
    font-family: var(--font-mono);
    font-size: 11px;
    color: #5d8a6c;
  }

  .menuAutosaveDot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #5d8a6c;
    animation: obsidian-glowPulse 2.5s ease-in-out infinite;
  }
  ```

### Step 5. ストーリー追加（任意・推奨）

- `Dungeon.stories.tsx` に **「☰ メニュー開いた状態 / ボス階手前」**のストーリーを追加してよい。
  - `mockMidDive` を流用し、`towerState.bossGates[10]?.defeated` を `false`、`diveState.depth=9` 等で
    `canAscend(...,10)` が false になる入口セルを置く mock を `__stories__/mockSaves.ts` に追加可。
  - `__stories__/mockSaves.ts` に preset を **追加するなら**、CLAUDE.md の方針に従い既存 mock を流用する。

### Step 6. 検証ゲート（必須）

- `yarn lint`
- `yarn test`
- `yarn build`（または `npx tsc -b`）
- 上記 3 点が全て緑になるまで終了しない。**vitest と eslint は型を見ない**ので `tsc -b` は必ず通すこと。
- 成果物に影響する変更（`src/` を触る）なので **`yarn build` を実行して `docs/` を更新**し、コミットに含める。

---

## 6. 検証

実装後、ディレクターが以下を確認する:

- **見た目（モック比較）**:
  - `pages/dungeon--default` (8a) で ☰ ボタンの大きさと色、ボス階手前なら ⚠ 警告が一人称ビュー上端に出る。
  - `pages/dungeon--menu` (8c) で 2x2 + 帰還の糸全幅 + 自動保存済 ・ HH:MM のレイアウト。
  - 設定ボタンタップで SoundSettings モーダルが開く（モックには無いが out-of-spec で **追加** 判断）。
- **動作**:
  - ボス階の入口セルに立つと ⚠ 警告が点滅、撃破済になると消える。
  - 全体マップボタンが UI 上に **存在しない**。
  - 採集 → 1 セルの結果カードが出る（複数並ばない）。
  - 帰還の糸 → 確認 → 拠点へ。
- **品質ゲート**: `yarn lint` / `yarn test` / `yarn build` 全緑。

---

## 7. コミット

- ブランチ: `feature/redesign-A`（既存）。新規 PR を切らない。
- メッセージ例: `feat(dungeon): v5 で全体マップ撤去・設定モーダル化・⚠ ボスゲート警告・☰ 自動保存表示を追加`
- 触ったファイルだけ `git add` してコミット（`git add -A` は禁止）。
- `yarn build` 済の `docs/` をコミットに含める。
- PR は作らない（ディレクターが他画面とまとめてレビューする）。
