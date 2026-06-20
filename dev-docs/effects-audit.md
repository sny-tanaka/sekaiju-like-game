# 47 エフェクト監査 (案A v3 基準)

> 監査対象: `案A v3.dc.html` (`/tmp/sekaiju-design/案A_v3.dc.html`) に定義されている全 keyframes。
> 注: タスクでは「47 keyframes」と表記されているが、モック原本で `@keyframes` を `grep` した実数は **41 個**
> （タスク文の列挙にあった `atkBlunt` `atkThrust` `atkMagic` `atkFire` `atkIce` `atkVolt` も既に「41」に含まれる）。
> 本監査表もこの 41 個を対象とする。

> 監査ブランチ: `feature/redesign-A`
> 実装側の前提: 本リポジトリは SCSS Module 形式 (`*.module.scss`) と global `src/_obsidian.scss` の 2 系統で
> アニメーションを管理。styled-components / inline `<style>` は使用していない（`src/components/common/EffectsGallery/`
> は Storybook 専用の試作ギャラリーで本番画面では使われない）。

---

## 1. TL;DR

- 全 **41 エフェクト** のうち
  - ✅ 実装済 (場所もほぼ想定通り): **17**
  - ⚠️ 部分実装 (定義あるが未使用 / 一部のみ / リネーム代替 / 命名ミスマッチでバグ): **9**
  - ❌ 未実装 (定義もなく代替もなし): **15**
- **戦闘のダメージ数値エフェクト (`splatA` / `splatB`)** は `_obsidian.scss` で keyframes 定義は存在するが、
  **`animation:` で参照している場所がゼロ**。実画面の「敵に与えたダメージ数値」は独自実装の
  `InkSplatter` コンポーネント (内製 keyframes `splat-burst` / `splat-dot` / `label-appear`) によって表示される
  ため、ユーザーが懸念した「ダメージ数値が出ない」状態ではない。**ただし「モック設計通りの splatA/B 動作」とは別物**。
- バグ性が最も高いのは **`obsidian-coinPop`**: `src/pages/shop/style.module.scss:426` で参照されているが、
  対応する `@keyframes obsidian-coinPop` がプロジェクト内で **未定義**。CSS としては silent fail で
  購入確認の 🪙 アニメが動いていない可能性が高い。

### 未実装 (❌) 一覧

`splatA` / `splatB` / `sealStamp` (`InkSplatter` の seal variant はあるが画面から呼ばれていない) /
`runeSpin` / `warpScan` / `dashAway` / `dustRise` / `foePulse` / `summonAppear` / `poisonWisp` /
`sparkZap` / `healRise` / `ailDrift` / `bloom` / `hitFlash`

### 部分実装 (⚠️) 一覧

`coinPop` (シンボル参照は存在するが keyframes 名ミスマッチ) / `speedLine` (`fleeSpeedLine` にリネーム実装、
1 系統のみ) / `forgeSpark` (forge では `forge-spark` リネーム / battle bash でも別途 `forgeSpark` を使用) /
`thrustLine` (実装は AttackFx 内のみ) / `corridorPulse` (ダンジョン FPV キャンバスは別実装) /
`slash` (`atkSlash` に統合) / `gatherSparkle` (ダンジョン採集成功 1 箇所のみ、戦闘ログには未使用) /
`atkBlunt` (`@keyframes` 定義はあるが `animation:` 参照は ringExpand に置換) / `atkMagic` (定義あり、AttackFx で使用、ただし `glowPulse` overlay と二重) /
`steamRise` (ダンジョン調理 1 箇所のみ。回復演出に転用なし) / `breathe` (タイトル「樹」のみ。ダンジョンの敵 FPV では未使用)

---

## 2. 監査表 (41 行)

| # | keyframe | モック上の使用箇所 (frame:line) | 実装上の想定箇所 | 実装ステータス | 修正方針メモ |
|---|---|---|---|---|---|
| 1 | `moteDrift` | 1a/1b title 上昇する塵 (line 76-79, 121-122) | `src/pages/title/style.module.scss:48-72` | ✅ 実装済 (`obsidian-moteDrift` 4 系統) | — |
| 2 | `glowPulse` | 1a 樹エンブレム / 2a-2c hub セルのジワジワ光 / 3c add+ / 4b 習得可能スキルノード / battle ユニオン U! / 9f 状態異常 / 9g 全滅文字 / 7a 図鑑 ? / 6c forge ✦ (line 85,87,128,244,255,271,294,297,440,567,929,978,1050,1064,1170,1191-1193,1202,1215,1250,1888,1896) | `_obsidian.scss:101` + `pages/battle/style.module.scss:437,1057,1896` (3 種: obsidian-glowPulse / glowPulse / glowPulseRed) + title/town/dungeon/shop/forge/guild/not-found 等で広く使用 | ✅ 実装済 (本作で最頻出。9 ファイル / 14 箇所で使用) | — |
| 3 | `breathe` | 1a/1b 樹 / 8a dungeon FPV gatekeeper (line 87, 128, 810) | `src/pages/title/style.module.scss:166` (タイトルのみ) | ⚠️ 部分実装 | ダンジョン FPV の敵プレビュー (`pages/dungeon` / FirstPersonView 系) では未使用。タイトル以外への展開が未着手 |
| 4 | `bloom` | 8a dungeon FPV 敵後光 (line 810) | (該当なし) | ❌ 未実装 | dungeon FPV キャンバスに敵後光の `radial-gradient` + bloom を追加する余地。優先度低 |
| 5 | `encPulse` | 8b 遭遇フラッシュ / 9a battle 敵カードヘッダ / 9g 全滅背景 (line 876, 992, 1214) | `_obsidian.scss:229` + `pages/battle/style.module.scss:1886` (敵カードヘッダ部) | ✅ 実装済 (敵カードヘッダ脈動) | 9g 全滅背景の脈動は未実装 (背景は `glowPulseRed` で代替) |
| 6 | `shakeA` | (モック内 `animation:shakeA` 使用 0 / 列挙のみ) | `_obsidian.scss:208` + `pages/battle/style.module.scss:1519` (`.flash` で `cardFlash` と組合せ) | ✅ 実装済 | モックでは使用例なし。実装では味方カード被弾時に組み込まれている |
| 7 | `shakeB` | 9e 被弾サンプル (line 1168 → `.shakeB`) | `_obsidian.scss:217` (keyframes 定義) | ❌ 未実装 | `_obsidian.scss` に keyframes はあるが `animation: shakeB` を参照する SCSS は存在しない。敵カードの被弾時 shake が欠落 |
| 8 | `splatA` | 9a 与ダメ数字ポップ + 会心 (line 1003, 1005, 1017) | `_obsidian.scss:240` (keyframes 定義) | ❌ 未実装 | **重点項目**。詳細は §3。`InkSplatter` (`splat-burst`/`splat-dot`/`label-appear`) が代替実装として動作中だが、モックの「上昇しながらフェードする数字」とは別物 |
| 9 | `splatB` | (列挙のみ / モック内 `animation:splatB` の使用箇所 0) | `_obsidian.scss:247` (keyframes 定義) | ❌ 未実装 | `splatA` の弱版バリエーション。同様に `InkSplatter` で代替されている |
| 10 | `barShimmer` | 9c 勝利リザルト EXP バー (line 1099) | `_obsidian.scss:224` + `pages/battle/style.module.scss:1611` | ✅ 実装済 | リザルト EXP バーで稼働 (`BattleExpBar` 系) |
| 11 | `sealStamp` | 1d guild 名入力プレビュー / 2e dive 演出 / 8b 遭遇シール / 9b battle イントロ (line 183, 337, 878, 1089) | `_obsidian.scss:113` (keyframes 定義) | ❌ 未実装 | `animation: sealStamp` の参照ゼロ。`InkSplatter` の `seal` variant (Stories/Tests のみ) で代用可能だが、ダイブ/遭遇/イントロ画面いずれにも組み込まれていない |
| 12 | `atkSlash` | 9e battle FX 斬 (line 1156) | `_obsidian.scss:151` + `components/common/AttackFx/AttackFx.module.scss:28` | ✅ 実装済 | AttackFx の slash variant で発火 |
| 13 | `atkBlunt` | 9e battle FX 壊 (`atkBlunt` keyframe そのものはモック内で使用例 0、9e は `ringExpand` + `forgeSpark` の合成) | `_obsidian.scss:170` (keyframes 定義) | ⚠️ 部分実装 | `@keyframes` は定義済だが、AttackFx 側は `ringExpand` + `forgeSpark` で代替している。`atkBlunt` 自体は未使用 |
| 14 | `atkThrust` | (モック内 `animation:atkThrust` の使用は 0 / 9e は `thrustLine` 2 枚で代用) | `_obsidian.scss:158` (keyframes 定義) | ⚠️ 部分実装 | `@keyframes` 定義のみ。AttackFx 側で `thrustLine` のみ使用。`atkThrust` を呼ぶ要素なし |
| 15 | `atkMagic` | 9e battle FX 万 (line 列挙のみ) | `_obsidian.scss:295` + `components/common/AttackFx/AttackFx.module.scss:164` | ✅ 実装済 | AttackFx の magic variant で発火 |
| 16 | `atkFire` | 9e battle FX 火 (line 1159) | `_obsidian.scss:182` + `AttackFx.module.scss:91,101` | ✅ 実装済 | 2 レイヤー (radial + 🔥) ともに発火 |
| 17 | `atkIce` | 9e battle FX 氷 (line 1160) | `_obsidian.scss:188` + `AttackFx.module.scss:115,126` | ✅ 実装済 | 2 レイヤー (◇ + ❄) ともに発火 |
| 18 | `atkVolt` | 9e battle FX 雷 (line 1161) | `_obsidian.scss:194` + `AttackFx.module.scss:140,151` | ✅ 実装済 | 2 レイヤー (柱 + ⚡) ともに発火 |
| 19 | `slash` | (モック内 `animation:slash` の使用 0 / 列挙のみ) | (`atkSlash` に統合) | ⚠️ 部分実装 | モックでも `animation:slash` を使う要素はない。実装も `atkSlash` 一本化で問題なし。本表では「位置取りとしては OK だが、別名が使われている」 |
| 20 | `thrustLine` | 9e battle FX 突 ライン+ 矢頭 (line 1157) | `_obsidian.scss:164` + `AttackFx.module.scss:43,55` | ✅ 実装済 | 2 レイヤー (ライン + ➤) ともに発火 |
| 21 | `ringExpand` | 9e battle FX 壊 リング (line 1158) | `_obsidian.scss:176` + `AttackFx.module.scss:68` | ✅ 実装済 | bash の中央リング展開で発火 |
| 22 | `runeSpin` | (モック内 `animation:runeSpin` 使用 0 / 詠唱中の演出として定義のみ) | (該当なし) | ❌ 未実装 | mage の詠唱モーション (`セレネは詠唱を始めた…` ログ表示時、line 1170 周辺) で本来回る予定。優先度中 (現状は静的アイコンのみ) |
| 23 | `critFlash` | 9e battle FX 会心 (line 1167) | `_obsidian.scss:202` + `AttackFx.module.scss:183` | ✅ 実装済 | 会心金 flash 重畳で発火 |
| 24 | `hitFlash` | 9e battle FX 被弾 (line 1168 → `.hitFlash` overlay) | (該当なし。`cardFlash` で代替) | ⚠️ 部分実装 | `pages/battle/style.module.scss:574` の `cardFlash` (0.42s) で「赤い flash → 静止」を表現。モックの `hitFlash` (1s 周期 ease-in-out) とは別 |
| 25 | `poisonWisp` | 9f 状態異常 毒 / 呪 (line 1184, 1190) | (該当なし) | ❌ 未実装 | 状態異常チップに ☠ / ✜ の浮遊アニメが必要。本作では emoji 静的表示のみ |
| 26 | `sparkZap` | 9f 状態異常 麻痺 (line 1185) | (該当なし) | ❌ 未実装 | 麻痺 ⚡ の点滅。emoji 静的表示のみ |
| 27 | `healRise` | 8b 採集 +N / 8d アイテム使用 +120 / 9f 回復上昇 / 睡眠の z (line 885, 954, 1186, 1199) | (該当なし) | ❌ 未実装 | アイテム使用 / 採集 / 回復演出のいずれもポップアップ無し。優先度高 |
| 28 | `summonAppear` | 9f 召喚出現 (line 1200) | (該当なし) | ❌ 未実装 | 召喚体登場演出が静止表示のみ |
| 29 | `dissolveE` | 9f 撃破フェード (line 1201) | `_obsidian.scss:234` + `pages/battle/style.module.scss:1525` (`.dissolving`) | ✅ 実装済 | 撃破時 0.5s で発火 |
| 30 | `coinPop` | 5c shop 購入確認 🪙 (line 652) | `pages/shop/style.module.scss:426` (`animation: obsidian-coinPop`) | ⚠️ 部分実装 (バグあり) | **致命的**: `obsidian-coinPop` の `@keyframes` 定義がプロジェクト内で **未定義**。`_obsidian.scss` には `coinPop` も `obsidian-coinPop` も無い。CSS は silent fail で実際にはアニメせず |
| 31 | `forgeSpark` | 6c forge ✦ 3 連 / 9e battle bash 中央 💥 (line 710-712, 1158) | `pages/forge/style.module.scss:482-498` (`forge-spark`) + `AttackFx.module.scss:78` (`forgeSpark`) | ⚠️ 部分実装 | forge 側は `forge-spark` (ハイフン) というローカル定義、battle bash 側は `forgeSpark` (キャメル) を参照。後者は `_obsidian.scss` で定義されている版を使用。両方動くが命名が分断 |
| 32 | `warpScan` | (モック内 `animation:warpScan` の使用 0 / 列挙のみ) | (該当なし) | ❌ 未実装 | town のワープ実行時 (`pages/town/index.tsx:55 play('warp')`) に対応する視覚演出が無い。優先度中 |
| 33 | `gatherSparkle` | 8b 採集成功 ✦ (line 883) | `pages/dungeon/style.module.scss:439` | ✅ 実装済 | 採集成功 1 箇所のみ |
| 34 | `steamRise` | 8b 調理 〜 ×2 (line 890) | `pages/dungeon/style.module.scss:479,503` (ローカル定義) | ✅ 実装済 | 調理時に発火 |
| 35 | `foePulse` | (モック内 `animation:foePulse` 使用 0 / dungeon 8a の FOE 警戒は `warnBlink` を流用) | (該当なし) | ❌ 未実装 | dungeon 8a のオートマップで FOE (赤マス) が警戒中であることをパルスで示す予定だったが、本作の `EncounterGauge` は別実装 |
| 36 | `dashAway` | (モック内 `animation:dashAway` 使用 0 / 列挙のみ) | (該当なし) | ❌ 未実装 | 9h 逃走画面のキャラ離脱モーション。`fleeSpeedLine` のみで代用 |
| 37 | `speedLine` | 9h 逃走画面 3 本のスピードライン (line 1230-1232) | `pages/battle/style.module.scss:1083-1095` (`fleeSpeedLine` にリネーム) | ⚠️ 部分実装 | リネームで実装。モックでは色違い 3 本だが実装は単一クラス×複数要素で表現 (動作上は同等) |
| 38 | `dustRise` | 9h 逃走画面 砂塵 (line 1233-1234) | (該当なし) | ❌ 未実装 | 9h 逃走画面の砂塵粒が無く、ラインのみで足元の質感が欠ける |
| 39 | `ailDrift` | 9a 敵カード上の状態異常マーカー (line 1001, 1015) | (該当なし。テキストマーカー `🌀` `🔒` で代替) | ❌ 未実装 | 状態異常を視覚的に強調するカラードットの浮遊が無い。`ailmentMark()` の文字列表示のみ |
| 40 | `corridorPulse` | 8a dungeon FPV 廊下グラデ脈動 (line 809) | (該当なし。FirstPersonView 系は別実装) | ⚠️ 部分実装 | ダンジョン FPV の `clip-path` 廊下要素自体はあるが、ゆっくりとした opacity 脈動は実装されていない |
| 41 | `warnBlink` | 1b 帰還警告 / 1d 入力カーソル / 8a エンカウントゲージ赤マス / 8b 遭遇テキスト / 8d save 表示など (line 159, 179, 360, 828, 879, 940) | `_obsidian.scss:109` + title / dungeon / SaveCard 各所 | ✅ 実装済 | カーソル点滅・帰還警告・エンカウントゲージ赤マスで発火 |

> 表中の「モック上の使用箇所」は `/tmp/sekaiju-design/案A_v3.dc.html` の `grep -nE "animation:"` 結果に基づく。
> 列挙のみ (`animation:` 参照ゼロ) の keyframe はモック側でも使われておらず、`@keyframes` 定義だけが残っている設計上のリザーブ枠。

---

## 3. 特に重要: 戦闘のダメージ数値エフェクト

### 3-1. モック側の設計

`案A v3.dc.html` line 1003 / 1005 / 1017 でボス・敵カード上に「与ダメ数値」と「会心」テキストを `splatA` で表示している:

```html
<!-- 敵に与えたダメージ -->
<div style="...top:-16px;left:50%;transform:translateX(-50%);
            font-size:8px;font-weight:700;letter-spacing:.12em;
            color:{{ e.atkLabelCol }};animation:splatA .7s ease forwards">
  {{ e.atkLabel }}
</div>
```

`splatA` は **上方向に -36px 浮上しながら scale 0.6 → 1.15 → 1 → 0.9 でフェードアウト** する 700ms の単発アニメ。

### 3-2. 実装側の状況

| 項目 | 結果 |
|---|---|
| `_obsidian.scss` 内に `@keyframes splatA` / `splatB` 定義 | **あり** (line 240-252) |
| `animation: splatA` / `animation: splatB` を参照する SCSS / TSX | **ゼロ** (`grep` で確認、`EffectsGallery` 除外後) |
| 敵カード上に与ダメ数値を出している実装 | **あり** ─ `pages/battle/index.tsx:1129-1153` の `InkSplatter`（変種 `damage` / `crit`）|
| `InkSplatter` の内部実装 | `components/common/InkSplatter/style.module.scss` の独自 keyframes `splat-burst` (320ms cubic-bezier(.5,0,.2,1)) + `splat-dot` (墨だまりを 12 方向に散らす) + `label-appear` (440ms cubic-bezier(.2,.8,.2,1)) で「中央に数値、周囲に墨だまり」を表現 |

### 3-3. 結論

- **ユーザーが懸念した「ダメージ数値が出ない」状態にはない**。`InkSplatter` が敵カード命中時 (`inkSplatters.has(e.id)`)
  に正しくマウントされ、数値テキストと墨だまりのアニメーションが描画される。
- **ただし、モックの `splatA` 設計とは別物**:
  - モック: 上に -36px 浮上 / 700ms / ease forwards / 軽量
  - 実装: 中央固定 / 320ms / 墨だまり 12 方向に散布 / 重厚 (墨イラスト)
  - 設計思想が「上昇ポップ → 墨だまり Splatter」に意図的に置き換わっている (`InkSplatter` は本作の独自表現で、
    `案A v3` 採用前から既存していた Phase 2 機能)。
- **会心** も同様に `InkSplatter` の `crit` variant (金色) で表現される。`splatA` 設計の「上昇テキスト」を
  そのまま採用するなら別途 `_obsidian.scss` の `splatA` keyframes を使って `pages/battle/style.module.scss` に
  `.damageLabel { animation: splatA .7s ease forwards }` 等のクラスを追加し、`InkSplatter` と差し替える/重畳する
  実装が必要。

### 3-4. 推奨アクション (実装は今回行わない / 監査タスクのため)

判断点が 2 つある:
1. 既存の `InkSplatter` 表現を「正」として採用し、`_obsidian.scss` の `splatA` / `splatB` 定義は削除する
   (デッドコード)。
2. モック準拠の上昇テキストを追加導入し、`InkSplatter` (墨だまり) と二重で重ねる (= モック設計に近づける)。

→ プロデューサー (ユーザー) 判断事項。

---

## 4. 未実装エフェクトの優先度

### 優先度 High (ゲーム体験に直結 / モック側で明確に組み込まれている)

| keyframe | 影響箇所 | 理由 |
|---|---|---|
| `obsidian-coinPop` (定義漏れ) | shop 購入確認 | 既に参照しているが silent fail。コミット済の表示が動いていない |
| `healRise` | アイテム使用 / 採集 / 回復演出 | 回復が静的表示のみ。プレイヤーが「効いたか」分かりにくい |
| `sealStamp` | dive 演出 / イントロ / 名前入力プレビュー / 遭遇 | モックの「儀式感」を担う柱。現状ゼロ |
| `splatA` / `splatB` | 与ダメ数値ポップ | 実装はあるが設計と別物 (§3 参照)。プロデューサー判断後に決定 |

### 優先度 Mid (体験を底上げする演出)

| keyframe | 影響箇所 | 理由 |
|---|---|---|
| `summonAppear` | 召喚体登場 | 召喚演出の存在感が無い |
| `poisonWisp` / `sparkZap` | 状態異常チップ | 状態異常の視認性向上 |
| `runeSpin` | 詠唱中の mage | 詠唱が回ることで「次ターン何か来る」感の演出 |
| `warpScan` | town ワープ | `play('warp')` SE はあるが視覚演出ゼロ |
| `breathe` (拡張) | ダンジョン FPV 敵 | 静的表示のため奥行きに乏しい |
| `hitFlash` (差替) | 敵カード被弾 | `cardFlash` 代替はあるが脈動感が無い |

### 優先度 Low (装飾的 / 列挙のみで本来未使用)

| keyframe | 理由 |
|---|---|
| `bloom` / `dustRise` / `dashAway` / `foePulse` / `corridorPulse` | モックでも使用例が少ない / 既に別実装で吸収 |
| `atkBlunt` / `atkThrust` / `slash` | 別 keyframe で十分賄えている (`ringExpand` / `thrustLine` / `atkSlash`) |
| `splatB` | `splatA` のバリエーション。`splatA` 判断後で OK |
| `ailDrift` | 状態異常マーカーは現状 emoji で機能している |
| `shakeB` | 敵カード被弾用。`shakeA` で代用可能 |

---

## 5. 監査メソッド (再現性のため)

1. モック原本 `/tmp/sekaiju-design/案A_v3.dc.html` から `@keyframes` 名を `grep` で列挙。
2. 同ファイル内の `animation:` 全行を `grep -nE "animation:\s*[a-zA-Z]+"` で抽出 (79 件)。フレームコメント
   (`<!-- 1a menu ... -->` 等) を手掛かりに、各 keyframe の「使用画面」をマップ化。
3. 実装側 (`src/`) を `grep -rnE "@keyframes|animation:" --include="*.scss" --include="*.tsx"` で総当たり。
   `src/components/common/EffectsGallery/` は Storybook 専用の試作ギャラリーなので除外 (本番に影響しない)。
4. 主要な定義ファイルは:
   - `src/_obsidian.scss` (global の戦闘系 / 共通 keyframes 23 個)
   - `src/components/common/InkSplatter/style.module.scss` (独自 6 個)
   - `src/components/common/AttackFx/AttackFx.module.scss` (戦闘 FX 属性別)
   - `src/components/common/PageTurn/style.module.scss` (ページ遷移)
   - `src/pages/{battle,dungeon,forge,title,town,shop,not-found,guild}/style.module.scss`
5. 各 keyframe について「**モック内での `animation:` 参照件数**」と「**実装内での `animation:` 参照件数**」を
   比較し、ステータスを 4 段階で判定:
   - ✅ 実装済 (定義 + 参照 + 想定箇所のいずれも揃う)
   - ⚠️ 部分実装 (定義あるが参照漏れ / リネーム代替 / 一部のみ)
   - ❌ 未実装 (定義もしくは参照のいずれかが完全に欠落)
   - 🤷 モック使用箇所不明 (本監査では該当なし)

---

## 6. 監査表総行数

第 2 章監査表 = **41 行 (= 41 keyframes 全件)**
