# フェーズ 1 リワーク：title 画面のレイアウトを flex 化

実機 iPhone（URL バー表示状態 / dvh 800px 弱）で **`つづきから` ボタンが SaveCard に被る**バグが出た。原因：`style.module.scss` が **絶対配置 + 固定 `top` / `bottom`** で組まれているため、画面が短くなると重なる。

これを **flex column** ベースに直し、全要素が dvh 内に収まるようにする。今後の全画面リデザインでも `dev-docs/redesign-A.md §1.5 レイアウト運用ルール` に従い、絶対配置レイアウトは使わない（装飾要素のみ例外）。

## 触ってよいファイル

| ファイル | 操作 |
| --- | --- |
| `src/pages/title/index.tsx` | 子要素の組み方は維持しつつ、現状の絶対配置 div 構造を flex column へ再構成 |
| `src/pages/title/style.module.scss` | 全面書き直し（絶対配置を排除、flex で組む） |
| `src/components/common/SaveCard/style.module.scss` | カード幅は親に合わせる（`width: auto;` / `width: 100%;`）。それ以外は変えない |

他は触らない。`_obsidian.scss` のトークンや `__stories__/seedSaveStore.tsx` は変更不要。

## 動作要件

- iPhone 16（dvh = 778 程度）と iPhone SE（dvh = 559 程度）の両方で、`html, body { overflow: hidden }` の制約下でも以下が全部見える状態:
  - 章マーク
  - ⚙ボタン
  - 樹エンブレム
  - 大タイトル + サブタイトル
  - 引用文
  - SaveCard（または NoSave / Corrupted カード）
  - `つづきから` + `最初から` の 2 ボタン
  - フッタ（v0.x.x + 更新を確認）
- 要素同士が重ならない。
- ページ全体スクロール禁止（`overflow: hidden`）。スクロールが必要なときは個別セクション内だけにする。
- 浮遊粒子（背景アニメ）は絶対配置でよい。バックドロップ（モーダル）も fixed/absolute でよい。

## レイアウト設計（必須）

```
<div .layout>                                    // flex column, height: 100dvh, max-width: 393px → 560px (PC)
  <div .moteLayer aria-hidden>...</div>          // 浮遊粒子 4 個、絶対配置（装飾のみ）
  <header .head>                                 // flex-shrink: 0
    <p .chapterMark>❦ 同見の書</p>
    <button .gearBtn aria-label="サウンド設定">⚙</button>
  </header>
  <section .hero>                                 // flex-shrink: 0
    <div .emblem>...</div>                       // 樹エンブレム（縦横サイズは画面に対する相対値）
    <h1 .title>世界樹ライク</h1>
    <p .subtitle>無限タワー探索 RPG</p>
    <p .quote>{...}</p>
  </section>
  <section .meta>                                 // flex: 1 1 auto（空き吸収）
    {meta?.corrupted ? <SaveCard …/>
      : meta ? <SaveCard …/>
      : <div .noSaveCard>…</div>}
  </section>
  <div .actions>                                  // flex-shrink: 0
    <button .primary|.sub>つづきから</button>
    <button .sub|.primary>最初から</button>
  </div>
  <footer .foot>                                  // flex-shrink: 0
    <span .version>v…</span>
    <button .updateBtn>更新を確認</button>
  </footer>
</div>
```

### スタイル指針

- `.layout`:
  ```scss
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100dvh;
  max-width: 393px;   // モック準拠（必要に応じて 560 まで広げて OK）
  margin: 0 auto;
  padding: 14px 22px max(14px, env(safe-area-inset-bottom, 0px));
  overflow: hidden;
  background: var(--bg-page-gradient);
  color: var(--text-base);
  font-family: var(--font-body);
  gap: 12px;       // 各セクション間の最小ギャップ
  ```
- `.head`: `display: flex; justify-content: center; align-items: center; position: relative; flex-shrink: 0; padding-top: 8px;`。`.gearBtn` を `position: absolute; right: 0; top: 4px;` で右端固定（章マークは中央寄せのまま）。
- `.hero`: `display: flex; flex-direction: column; align-items: center; gap: 10px; flex-shrink: 0;`
- `.emblem`: `width: clamp(110px, 38vw, 154px); aspect-ratio: 1 / 1; position: relative;` 内側の円輪は `inset: 0` / `inset: 18%`、字は `font-size: clamp(46px, 16vw, 62px)`。
- `.title`: `font-family: var(--font-display); font-weight: 800; font-size: clamp(34px, 11vw, 44px); letter-spacing: .06em; color: var(--text-strong); text-align: center; line-height: 1.1; margin: 0;`
- `.subtitle`: `font-size: clamp(11px, 3vw, 13px); letter-spacing: .42em; color: var(--text-faint); margin: 0;`
- `.quote`: `font-family: var(--font-display); font-style: italic; font-size: clamp(11px, 3.2vw, 12px); line-height: 1.7; color: var(--text-quote); text-align: center; white-space: pre-line; margin: 0; max-width: 280px;`
- `.meta`: `display: flex; align-items: center; justify-content: stretch; flex: 1 1 auto; min-height: 0;`。中身 SaveCard / NoSave は `width: 100%`。
- `.noSaveCard`: `display: flex; flex-direction: column; gap: 6px; padding: 16px; border: 1px dashed var(--rule-gold); border-radius: 4px; background: var(--surface-elev); text-align: center; width: 100%;`
- `.actions`: `display: flex; flex-direction: column; gap: 10px; flex-shrink: 0;`
- `.primary`: モック準拠 (gradient gold, 高さ `clamp(48px, 13vw, 56px)`)。
- `.sub`: 高さ `clamp(44px, 12vw, 52px)`。
- `.foot`: `display: flex; flex-direction: row; align-items: center; justify-content: center; gap: 10px; flex-shrink: 0; padding-top: 4px;`。`.version` 左、`.updateBtn` 右。
- 短画面 (`@media (max-height: 720px)`) でさらに `.layout { gap: 8px; }`、`.hero { gap: 6px; }`、`.quote { max-width: 240px; -webkit-line-clamp: 1; display: -webkit-box; -webkit-box-orient: vertical; overflow: hidden; }` 等で詰める。
- 浮遊粒子 4 個は `.moteLayer` で `position: absolute; inset: 0; pointer-events: none; z-index: 0;` の絶対配置レイヤー内に置く。コンテンツ側は `position: relative; z-index: 1;` で重ねる。

### サブモード（guildNameInput / overwriteConfirm / soundPanel）

guildName モード時は `.hero` `.meta` を取り除き、ritual セクションを `flex: 1` で中央寄せ + ボタン下置き、と入れ替える。同じく flex column で組む。

confirm / sound は backdrop モーダル（`position: fixed; inset: 0;` の `.modalBackdrop`）の中で `.modalPanel` を `width: min(360px, calc(100% - 56px))` で中央寄せ。**モーダル内も flex column で要素を積む**（絶対配置で「最初から始めますか？」を配置しない）。

## SaveCard 側

`.card { width: 100%; }` に変える。現状の固定幅指定があれば外す。それ以外は触らない。

## ブランチ / コミット

現在の `feature/redesign-A-title` ブランチで作業し、コミットを 1 つ追加して SHA を報告する。
コミットメッセージ:

```
fix(title): rebuild layout in flex column so all elements fit within dvh

- replace absolute positioning with flex column on .layout
- use clamp() and short-screen media query to stay within iPhone SE dvh
- update SaveCard to fill its container (width: 100%)

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
```

## 検証

- `yarn lint`、`yarn test --run`、`yarn tsc -b` を緑にする。
- Storybook で 6 ストーリーすべてを目視確認し、要素が重なっていないこと（特に WithSave で `つづきから` が SaveCard と重ならない）。

## 注意

- 自分でさらに Agent / Task を spawn しない。
- 他ファイル（特に `_variables.scss`、他画面の scss、tokens）は触らない。
- `src/_obsidian.scss` のトークン（CSS 変数）は不足があれば追加してよいが、既存値は変更しない。
