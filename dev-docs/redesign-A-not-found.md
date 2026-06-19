# フェーズ 2：not-found 画面リデザイン（sonnet 用指示書） — 改訂版 v2「モック忠実化」

`dev-docs/redesign-A.md`（特に **§1.5 レイアウト運用ルール**）を **必ず先に読むこと**。
本ファイルは not-found（404 フォールバック）画面の取り込み手順を網羅した実装指示書。

**前回方針からの反転**: 前回は「機能優先」でモック上の文言「拠点へ戻る」を捨てて「戻る」と `history.back()` のままにしていた。今回は **モック忠実度を最優先**。モック準拠で「拠点へ戻る」ラベル + navigation で town に戻る。save が無い場合は title にフォールバック（破損・初回想定）。

絶対配置で `top` / `bottom` を直書きするのは禁止（章マークなどの装飾レイヤのみ例外）。**flex column 一本**で組む。

---

## 1. 触ってよいファイル / 触ってはいけないファイル

以下 3 ファイルのみ。**他は絶対に変更しない**。

| 区分 | パス | 操作 |
| --- | --- | --- |
| 編集 | `src/pages/not-found/index.tsx` | 構造を黒曜テーマに合わせて刷新。戻るアクションを `history.back()` から `navigate({ name: 'town' or 'title' })` に変更。ラベルは「拠点へ戻る」 |
| 編集 | `src/pages/not-found/style.module.scss` | 全面書き直し。`@use 'variables'` を **削除**して `var(--*)` のみ参照 |
| 編集 | `src/pages/not-found/NotFound.stories.tsx` | 既存ストーリー `Default` をそのまま維持。**新規 import 追加なし**（mock save 不要、`navigate` は decorator 内のスタブで動く） |

### 触ってはいけないファイル / コンポーネント

- `src/_obsidian.scss` は変更しない（必要トークンは既存で揃っている）。
- 共通コンポーネント（`InkSplatter` 等）は本画面で使わない。新規 import を増やさない。
- `src/_variables.scss` および写本テーマ系 SCSS 変数を新規参照しない。
- 他画面の `index.tsx` / `style.module.scss` には絶対触らない。
- `__stories__/mockSaves.ts` には触らない。

## 2. やってはいけないこと

- **`Agent` / `Task` を自分から spawn しない**（孫委譲禁止）。`Edit` / `Write` / `Bash` で自分で実装する。
- **`src/_obsidian.scss` の値を書き換えない**。
- **絶対配置を多用しない**。章マークの上端固定は `flex` の最初のアイテムとして組む（モックでは absolute だが、§1.5 ルールで flex column 優先）。
- **ページ全体に `overflow-y: auto` をかけない**。404 画面は 1 ビューポートで完結する想定。

---

## 3. モックとの差分一覧（最重要）

参照: `/tmp/sekaiju-design/案A_v2.dc.html` line 1126〜1140。

### 3.1 戻るボタンのラベルと遷移先（最重要差分）

| 項目 | 現状 | モック | 対応 |
| --- | --- | --- | --- |
| ラベル | 「戻る」 | 「拠点へ戻る」 | **「拠点へ戻る」に変更**（モック準拠）。design brief §4.10 は「戻る」を明示しているが、モック忠実化方針に基づき**モック側を採用** |
| onClick | `history.back()` | （静的モックなので動作なし） | `useNavigation` の `navigate` で **town に遷移**。`save` が `null`（new game 前 / 破損後）の場合は town に行けないので title に遷移 |

### 3.2 ヘッダー（章マーク）の配置

| 項目 | 現状 | モック | 対応 |
| --- | --- | --- | --- |
| 配置 | `<header>` を flex item として上端に置く（gap で本体と離す） | `position: absolute; top: 34px; left: 0; right: 0;` で本体の上に被せる | **flex item として上端配置**を継続（§1.5 ルール準拠）。`padding-top: 34px;` で見た目はモックと同等にする |
| 文字スタイル | font-size 13px / letter-spacing .36em / `--text-blue` | 同じ（`color: #5b6475`、これは `--text-blue` ≒ `#7d8aa0` よりやや暗い） | `--text-blue` のままで OK（厳密一致は要求しない） |

### 3.3 中央コンテンツ（？エンブレム + 404 + 説明）

| 項目 | 現状 | モック | 対応 |
| --- | --- | --- | --- |
| ？エンブレム | 120px 円 + 細い金線 + `？`（明朝・薄金・脈動） | 同じ | 現状維持 |
| `404` 大書き | 明朝 26px / `--text-strong` | 同じ | 現状維持 |
| 本文 | 「お探しのページは / 見つかりませんでした。」 | 同じ | 文言維持 |
| 縦間隔 | gap 18px / margin 14px-36px | エンブレム下 34px / 本文下 36px / 本文 line-height 1.8 | gap の値はおおむね現状で問題ない（モック 36px ≒ 現行 18px×2 + α） |

### 3.4 ボタンスタイル

| 項目 | 現状 | モック | 対応 |
| --- | --- | --- | --- |
| サイズ | `clamp(180px, 56vw, 220px) × 50px` | 200px × 50px | モック準拠で 200px 固定でもよいが、小画面で潰れないよう **`clamp(180px, 56vw, 220px)` を維持** |
| 色 | gold tint background + gold border + gold text | 同じ | 現状維持 |
| 文字 | letter-spacing .2em | letter-spacing .2em | 現状維持 |

### 3.5 背景

| 項目 | 現状 | モック | 対応 |
| --- | --- | --- | --- |
| 背景 | `radial-gradient(120% 80% at 50% 30%, var(--surface-panel), var(--bg-deep))` | `radial-gradient(120% 80% at 50% 30%, #15171f, #0a0b0e)` | `var(--surface-panel) = #15171f` で一致。`var(--bg-deep) = #090a0d` で `#0a0b0e` とほぼ同じ。現状維持 |

### 3.6 モック上にあるが省略する要素（理由付き）

- なし。モック上の要素はすべて実装する（戻るボタンのラベル変更含む）。

---

## 4. ゴール

Storybook の `Pages/NotFound / Default` ストーリーが、モック「案 A 黒曜 OBSIDIAN MINIMAL」の 404 セクション（line 1126〜1140）に忠実に描画される:

- 章マーク `❦ 行方知れずの頁` が上端 ~34px に出る（淡青 / 字間 .36em）。
- 中央に直径 ~120px の細金線円輪 + 明朝 `？`（薄金 / 脈動）。
- 円輪下に明朝 `404`。
- その下に「お探しのページは / 見つかりませんでした。」を 2 行。
- 下端に金縁ボタン「拠点へ戻る」。

iPhone SE / iPhone 16 のいずれでも要素が画面内に収まり重ならない。`yarn lint`・`yarn test --run`・`yarn tsc -b` が緑。
ストーリーで「拠点へ戻る」を押したときに **エラーで落ちない**（Storybook 内の navigation はデフォルト no-op で動く想定。`useGameState` の save が null でも `name: 'title'` への遷移分岐で問題なし）。

---

## 5. 実装ステップ

### Step 0. 事前読み込み

1. `dev-docs/redesign-A.md §1.1〜§1.6`（特に §1.5 レイアウト運用ルール）。
2. `dev-docs/claude-design-brief.md §4.10`（not-found の機能仕様）。
3. `/tmp/sekaiju-design/案A_v2.dc.html` line 1126〜1140。
4. `src/store/gameState.ts` および navigation のフック (`useNavigation` の場所は `src/pages/title/index.tsx` を grep してパスを確認)。

### Step 1. `index.tsx` の構造

`history.back()` を捨てて `useNavigation` + `useGameState` を使う。

```tsx
import styles from './style.module.scss';

import { useGameState } from '@/store/gameState';
import { useNavigation } from '@/store/navigation';

export const Page = () => {
  const { navigate } = useNavigation();
  const { save } = useGameState();

  // セーブが無ければ title に戻し、あれば town に戻す。
  const handleBack = () => {
    navigate({ name: save ? 'town' : 'title' });
  };

  return (
    <div className={styles.layout}>
      <header className={styles.head}>
        <p className={styles.chapterMark}>❦ 行方知れずの頁</p>
      </header>

      <main className={styles.body}>
        <div className={styles.emblem} aria-hidden>
          <span className={styles.emblemRing} />
          <span className={styles.emblemMark}>？</span>
        </div>
        <p className={styles.code}>404</p>
        <p className={styles.message}>
          お探しのページは
          <br />
          見つかりませんでした。
        </p>
      </main>

      <footer className={styles.foot}>
        <button
          type="button"
          className={styles.back}
          onClick={handleBack}
        >
          {save ? '拠点へ戻る' : 'タイトルへ戻る'}
        </button>
      </footer>
    </div>
  );
};
```

ポイント:

- ラベルは save の有無で **「拠点へ戻る」/「タイトルへ戻る」** を切り替える。これでモック準拠 + 機能上の安全性を両立。
- `aria-hidden` の emblem は装飾。
- 本文の改行は `<br />` で 2 行構造（モック準拠）。
- 「？」は **全角 `？`** (U+FF1F)。モック準拠で半角 `?` ではない。

### Step 2. `style.module.scss` の全面置換

`@use 'variables'` は削除。`var(--*)` を直接参照。

```scss
.layout {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100dvh;
  max-width: 560px;
  margin: 0 auto;
  padding: 34px 40px max(24px, env(safe-area-inset-bottom, 0px));
  overflow: hidden;
  background: radial-gradient(
    120% 80% at 50% 30%,
    var(--surface-panel),
    var(--bg-deep)
  );
  color: var(--text-base);
  font-family: var(--font-body);
  text-align: center;
  gap: 24px;
}

.head {
  flex-shrink: 0;
  display: flex;
  justify-content: center;
}

.chapterMark {
  margin: 0;
  font-family: var(--font-display);
  font-size: 13px;
  letter-spacing: 0.36em;
  color: var(--text-blue);
}

.body {
  flex: 1 1 auto;
  min-height: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 18px;
}

.emblem {
  position: relative;
  width: clamp(96px, 28vw, 120px);
  aspect-ratio: 1 / 1;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;   // モック準拠 (34px 余白を gap 18 + 16 で表現)
}

.emblemRing {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  border: 1px solid var(--rule-gold);
  animation: obsidian-glowPulse 5s ease-in-out infinite;
}

.emblemMark {
  position: relative;
  font-family: var(--font-display);
  font-weight: 700;
  font-size: clamp(48px, 16vw, 64px);
  color: var(--gold);
  opacity: 0.55;
  line-height: 1;
}

.code {
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(22px, 7vw, 26px);
  letter-spacing: 0.1em;
  color: var(--text-strong);
}

.message {
  margin: 0;
  font-size: clamp(13px, 3.6vw, 14px);
  line-height: 1.8;
  color: var(--text-faint);
}

.foot {
  flex-shrink: 0;
  display: flex;
  justify-content: center;
}

.back {
  width: clamp(180px, 56vw, 220px);
  height: 50px;
  border-radius: 3px;
  border: 1px solid var(--rule-gold-strong);
  background: var(--gold-tint);
  color: var(--gold);
  font-family: var(--font-body);
  font-size: 15px;
  letter-spacing: 0.2em;
  cursor: pointer;
  transition: background var(--motion-quick, 140ms cubic-bezier(0.4, 0, 0.2, 1));
}

.back:hover { background: rgba(201, 168, 106, 0.16); }
.back:active { background: rgba(201, 168, 106, 0.24); }

@media (max-height: 720px) {
  .layout { gap: 16px; padding-top: 24px; }
  .body { gap: 12px; }
  .emblem { margin-bottom: 8px; }
}
```

ポイント:

- `padding: 34px 40px ...;` で章マーク上端をモック準拠の 34px 相当に。
- `.emblem` に `margin-bottom: 16px;` を入れてエンブレム → `404` の間隔をモック準拠（モック 34px ≒ gap 18 + margin 16）。
- `obsidian-glowPulse` は `_obsidian.scss` に既存。`prefers-reduced-motion: reduce` 時は no-op。

### Step 3. Storybook ストーリー

`src/pages/not-found/NotFound.stories.tsx` は既存のまま（変更不要）。

```tsx
import type { Meta, StoryObj } from '@storybook/react';

import { Page } from './index';

const meta = {
  title: 'Pages/NotFound',
  component: Page,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof Page>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
```

**注意**: `useGameState` / `useNavigation` を呼ぶようになったので、`Default` ストーリー実行時にプロバイダーが必要。`.storybook/preview.tsx` でグローバル decorator が既に provider を流している場合は追加対応不要。流していない場合は `withGameContext(null, { name: 'not-found' })` を decorator として追加する。`Default` を実行した時点で grep して確認すること:

```bash
grep -n "decorators\|GameProvider\|NavigationProvider" /Users/shunyatanaka/work/sekaiju-like-game/.storybook/preview.tsx /Users/shunyatanaka/work/sekaiju-like-game/src/__stories__/decorators.tsx
```

- グローバル provider 有り → 追加不要。
- 無し → `withGameContext` を import して decorator に追加（`mockSaves.ts` の preset は使わず、第 1 引数に `null` を渡せるか確認。`null` 不可なら `mockEmpty` を渡してラベルを「拠点へ戻る」表示でテスト）。**注**: ラベル分岐確認のため、無条件 `mockEmpty`（save あり）で実行すれば「拠点へ戻る」が出るので Storybook 上の確認はこれで十分。

### Step 4. 検証

```
yarn lint
yarn test --run
yarn tsc -b
yarn build   # 成果物 docs/ に影響する変更があるため必ず回す
```

Storybook 目視確認（`yarn storybook --host 0.0.0.0`）:

- `Pages/NotFound / Default` で章マーク・？円輪・404・本文・「拠点へ戻る」ボタンの 5 要素が縦に整列。
- iPhone SE 相当（dvh ≒ 559）でもスクロール無しで全部画面内に収まる。
- `？` の脈動が `prefers-reduced-motion: reduce` で停止する。
- 「拠点へ戻る」を押下しても **コンソールエラーが出ない**（navigate スタブが no-op で動く）。

### Step 5. コミット

ブランチ `feature/redesign-A-not-found-v2`（既存 `feature/redesign-A-not-found` を切り直してよい）。完了後 1 コミット、push なし。

```
feat(theme): rewrite not-found layout to match obsidian mock

- swap label/navigation: "戻る" + history.back → "拠点へ戻る" + navigate(town)
- fallback to title when no save (corrupted / initial)
- adopt obsidian gradient bg + pulsing ? emblem + 404 display heading

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
```

---

## 9. 追加トークン要求

なし。`obsidian-glowPulse` および `--rule-gold` / `--rule-gold-strong` / `--gold` / `--gold-tint` / `--surface-panel` / `--bg-deep` / `--text-strong` / `--text-blue` / `--text-faint` はすべて既存。

---

## 想定 Q&A

- **`useGameState` を呼ぶと Storybook で provider 未設定エラーになる**: `.storybook/preview.tsx` を grep してプロバイダーがあるか確認。無ければ decorator を `Default` に追加（`mockEmpty` を渡して `save` が truthy になる、もしくは `null` を渡してフォールバック分岐を確認）。
- **「拠点へ戻る」を押しても save が無いと title 行きで違和感**: ラベルを動的に「タイトルへ戻る」に切り替えて違和感を回避（Step 1 の `save ? '拠点へ戻る' : 'タイトルへ戻る'`）。
- **`history.back()` のままにしたい**: モック忠実化方針で却下。「拠点へ戻る」のラベル + navigation 直接呼出しが正解。
- **`emblemMark` の `？` を半角にすべき?**: 全角 `？` (U+FF1F) を使う。モック側も全角。
- **`emblemRing` を二重円輪にしたい**: モックは 1 重。1 重で OK。
- **`overflow: hidden` のまま中身が画面に入らない**: `clamp()` でフォントサイズと emblem サイズが画面幅に追随。`@media (max-height: 720px)` でさらに gap を詰める。
- **既存テスト**: `find src/pages/not-found -name '*.test.*'` で確認。存在しない場合は新規作成しない。

不明点が出たら止めて報告すること。色味の微調整以外で構造分岐・文言・ロジックから外れてはいけない。
