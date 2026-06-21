# CLAUDE.md

このファイルは、本リポジトリで作業する際に Claude Code に提供するガイダンスです。

## 使用言語 — 全作業に適用

- 本リポジトリでのユーザーとのやり取り（応答・説明・進捗報告・質問・コミットメッセージ・PR 本文など）は
  **すべて日本語で行うこと**。英語で返さない。
- コード中のコメントや識別子は既存の慣習に従う（無理に翻訳しない）。

## 作業体制（エージェントの役割分担）— 全作業に適用

本リポジトリの作業は、原則として以下の体制で進めること。

### メインエージェント＝ディレクター

- メインエージェント（あなた）は**ディレクター**として振る舞う。担うのは、仕様策定・数値設計・タスク分解・
  サブエージェントへの**詳細な実装指示書の作成**・成果のレビュー・統合（マージ）・最終検証。
- **実装コードは自分で書かない**。本格的な実装は必ずサブエージェントに委譲する
  （コンフリクト解消・軽微な型エラー修正など、短時間で確実な統合作業のみ自分で行ってよい）。
- 規模の大きい作業は、着手前に **`dev-docs/` に設計書**を用意し、数値・式・手順まで確定させて
  「sonnet に判断を残さない」状態にしてから着手する。

### 実装＝sonnet のサブエージェント

- 実装は **sonnet のサブエージェント**に、ディレクターの詳細指示で行わせる（`Agent` ツール、`model: "sonnet"`）。
- サブエージェントへの指示には必ず次を含める:
  - **「自分で Edit/Write/Bash を使って実装すること。さらにサブエージェント（Agent/Task）を spawn しないこと」**
    （委譲の入れ子を禁止。`general-purpose` 等は放置すると孫エージェントに丸投げする）。
  - **触ってよいファイル／触ってはいけないファイルの明示**（並列時の衝突防止）。
  - 完了時に**コミットして commit SHA を報告**（push はしない。ディレクターがレビュー後に行う）。
- 並列可能な作業は、**ファイル所有を分離**して複数の sonnet を**並列起動**（`isolation: "worktree"`）し、
  ディレクターが各ブランチをマージ・統合する。新規 worktree には node_modules が無いので、
  エージェントに `ln -sf <repo>/node_modules node_modules` を指示する。

### 検証ゲート（必須・マージ後／完了前に必ず緑にする）

- `yarn test`（vitest）／ `yarn lint`（eslint）／ **`tsc -b`（型チェック。`yarn build` でも可）** の**3点すべて**。
- **vitest と eslint は型エラーを検出しない**。`tsc`（または `yarn build`）を必ず回すこと
  （過去、データAPIの参照漏れが tsc 未実行で見逃された）。

### ビルド（成果物への影響がある変更・PR作成時は必須）

- **本リポジトリのビルド出力 `docs/` はリポジトリにコミットする成果物**（GitHub Pages の公開ディレクトリ）。
  `yarn build` は `scripts/bump-patch-version.mjs`（パッチバージョン更新）→ `tsc -b` → `vite build`（`docs/` 出力）を実行する。
- **成果物（`src/`・`public/`・依存・アセット等、ビルド結果に影響するもの）を変更したら、PR作成前に必ず `yarn build` を実行し、
  更新後の `docs/`（と `package.json` のバージョン）をコミットに含めること。** ビルド漏れは公開サイトに変更が反映されない事故になる。
- 新規アセット（例: `public/sfx/*.wav`）は `vite build` で `docs/` 配下へコピーされる。ビルドせずに PR を出さない。
- ビルドしても成果物に差分が出ない純粋なドキュメント／テスト変更等は、ビルド不要（差分が出ないことを確認できていれば可）。
- **1 PR でバージョン (`package.json` の `version`) は 1 回しか上げない**。
  - 1 PR 内で複数回ビルドが必要になったとき（追加修正・レビュー指摘の反映・複数 issue 同梱など）、
    2 回目以降は **`yarn build:nobump`** を使う。これは `tsc -b && vite build` のみで patch を上げない。
  - 1 回目のビルドだけ `yarn build`（bump あり）で OK。
  - もし誤って複数回 `yarn build` を回してバージョンが余計に上がったら、PR をマージする前に `package.json` の `version` を
    手で下げ直して `yarn build:nobump` で `docs/` を再生成すること。

### プロデューサー（ユーザー）との関係

- ディレクターが成果を自らレビューする。**仕様変更が必要なとき・判断が分かれるときのみ**
  プロデューサー（ユーザー）に確認する。ユーザー＝プロデューサー、メインエージェント＝ディレクター。

## ゲームの概要

- 本ゲームは『世界樹の迷宮5』を元ネタとしています。
- 元ゲームの攻略サイト（下記）を、未定義の仕様を策定する場合などの参考にしてください。
  - https://w.atwiki.jp/sekaiju_mazev/pages/1.html

## 難易度設計

- 難易度は「少しハード」くらいの調整にしてください。
- レベリングや装備作成なしでスムーズに進める難易度は NG です。

## 技術構成

- 本ゲームは React で完結するものであり、別途 API サーバーは持ちません。
- マスタデータの定義や永続化もすべて React 上で行います。
- 永続化データは localStorage へ保存してください。

## 実装方針

- スマホで操作することを前提に設計してください。
- 機能単位でコンポーネントとして実装し、コンポーネントごとに Storybook で見た目を確認してください。
- 見た目はヘッドレス Chrome 等でスクリーンショットを撮り、セッション上でユーザーに共有してください。
  - スクリーンショットは git リポジトリ内には保存しないでください。

### 特定画面のスクショ確認は Storybook を使う（Playwright で実ゲームを動かさない）

- 「戦闘画面だけ撮りたい」「装備が入った状態の鍛冶屋を撮りたい」のような **特定状態のページを撮影したい**
  ときは、**必ず Storybook のページ用ストーリーを使う**。Playwright で実ゲームを起動して「キャラ作成→編成→
  ダイブ→遭遇」まで自動操作するのは無駄でしかない（IndexedDB / SaveData スキーマ / 遭遇ロジックに依存して
  毎回壊れる）。
- 本リポジトリには既に `.storybook/` と `src/__stories__/`（mock SaveData ファクトリ + decorator）と
  `src/pages/**/*.stories.tsx`（全ページのストーリー）が用意されている。
  - mock SaveData: `mockEmpty` / `mockWithParty` / `mockMidDive` / `mockPostBoss` / `mockShop` /
    `mockForge` / `mockBattle` （`src/__stories__/mockSaves.ts`）
  - decorator: `withGameContext(save, initialScreen?)`（`src/__stories__/decorators.tsx`）
  - 既存ストーリーで足りない状態が要るときは **`__stories__/mockSaves.ts` に preset を追加**してから新規
    ストーリーを書く。
- 撮影は `yarn storybook` を立ち上げ、`http://localhost:6006/iframe.html?id=<story-id>&viewMode=story`
  に Playwright で goto して `page.screenshot()` するだけ。詳細手順は
  [dev-docs/screenshot-setup.md](./dev-docs/screenshot-setup.md) の「Storybook を撮る場合」セクション。

## スクリーンショットの撮影環境構築について

- クラウド実行環境でヘッドレス Chrome を使ってスクリーンショットを撮る手順は
  [dev-docs/screenshot-setup.md](./dev-docs/screenshot-setup.md) を参照してください。
  - プリインストール済み Chromium（`/opt/pw-browsers`）を使うこと（`npx playwright install` は基本ブロックされます）。
  - **必ず Noto Sans JP で撮ること**（フォールバックフォントで撮らない）。本環境は HTTPS を傍受しており
    Google Fonts CDN が証明書エラーで遮断されるため、撮影時は次の2点を必ず行う:
    1. `browser.newContext({ ignoreHTTPSErrors: true })` で証明書エラーを無視する。
    2. スクショ前に `await page.evaluate(() => document.fonts.ready)` でフォント読込完了を待つ。

## ローカル開発サーバを LAN に公開してスマホから確認する

ユーザーは PC を remote-control して**スマホからセッションを操作していることがある**。その状態だと
PC 側のターミナルでスクショを開いたり、`localhost` のサーバを見たりできない。スマホからも
動作確認できるように、ローカル開発サーバは**プライベート IP で公開してその URL を案内すること**。

### 起動コマンド（必ず `--host 0.0.0.0` を付ける）

| 用途 | コマンド | デフォルトポート |
|---|---|---|
| Storybook | `yarn storybook --host 0.0.0.0` | 6006 |
| 実ゲーム dev | `yarn dev --host 0.0.0.0` | 5173 |

`--host` を付けないと `localhost` だけで listen し、LAN 内の他端末（スマホ）から見えない。
`lsof -i :<port> -sTCP:LISTEN -P` で `IPv4 *:<port> (LISTEN)` になっていることを確認。
`IPv6 *:<port>` だけのときは外部から繋がらないことがある（同マシンの curl だけ通る罠）。

### スマホ向け URL の組み立て

```bash
ipconfig getifaddr en0   # Wi-Fi 経由のプライベート IP（例: 192.168.11.7）
```

その上で、

- Storybook 個別ストーリー: `http://<private IP>:6006/?path=/story/<story-id>`
- Storybook 軽量プレビュー: `http://<private IP>:6006/iframe.html?id=<story-id>&viewMode=story`
- 実ゲーム: `http://<private IP>:5173/sekaiju-like-game/`（`base` は `vite.config.ts` 参照）

### 繋がらない時の切り分け（端末のセキュリティ設定で遮断されることがある）

`--host 0.0.0.0` で立てたサーバにスマホから繋がらないとき、まず**ネットワーク経路自体の問題か
サーバ側の問題か**を切り分ける。最も軽い方法は Python の簡易サーバ:

```bash
cd /tmp && python3 -m http.server 8080 --bind 0.0.0.0
# スマホで http://<private IP>:8080/ を開く
```

- これも見えなければ **端末（mac）のセキュリティ設定 / ファイアウォール / 仮想化ソフト / VPN / Wi-Fi の
  AP isolation** などが LAN 接続自体を遮断している。ユーザーに端末設定の確認を促す。
- これは見えるが Storybook / dev は見えないなら、起動オプション側の問題（`--host` 漏れ等）。

### スマホでの SendUserFile プレビュー問題

`SendUserFile` で送った PNG が**スマホクライアントで「PNG カード」表示になりプレビューが
出ないこと**がある。スマホ環境では `SendUserFile` に頼り切らず、上記の LAN 公開した dev サーバや
Storybook の URL を**併記**して、ブラウザで直接見られる経路を用意すること。

## レビュー

- 実装後は別途レビュー用の新規エージェントを起動し、品質を担保してください。

## 進め方

- 判断に迷う場合は憶測で勝手に進めず、ユーザーにヒアリングしてください。
- ヒアリングの際は「どうすればいいか？」と聞くのではなく、「こうしたらどうか？」と提案する形にしてください。

## ドット絵素材

- https://dot-illust.net/ — 主要素材（敵キャラ・アイテム・装備）。非商用利用なら点数制限なし・クレジット表記不要
- https://kenney.nl/assets/tiny-dungeon — CC0 補完（帰還の糸/腐肉/歯車）。クレジット表記不要

上記サイトを利用する。
