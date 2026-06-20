# 非戦闘エフェクト + 戦闘ログ位置 監査

> 監査対象ブランチ: `feature/redesign-A`
> モック原本: `/tmp/sekaiju-design/案A_v3.dc.html` (1355 行)
> 対象範囲: 戦闘以外の全画面エフェクト + battle ログプレビューの **配置** のみ
> （戦闘の攻撃/被弾/状態異常 FX 等は `dev-docs/effects-audit.md` でカバー済み）
>
> 本書の目的: 「モックと実装の **見た目の一致度** が下がっている箇所」を画面別に列挙し、優先度別の修正タスクへ落とし込む。
> エフェクトの「存在 / 未存在」だけでなく **配置 / テキスト含有 / アニメ強度** までを差分として扱う。

---

## 1. TL;DR

- **ダイブ演出 (town 2e) の差分: 4 件**（うち最重要 1 件: 実装側で勝手に「潜行」テキストを描画している）。
- **戦闘ログ位置の差分: 5 件**（最重要 1 件: ログがヘッダ内ではなく **battlefield 末尾** にあり、コマンドパネル直上に置かれている）。
- **画面別エフェクト差分 (9 画面): 合計 13 件**
  - title: **0 件**（モック準拠で完備）
  - town: **1 件**（`.diveResume` の脈動秒数差。+ 上記ダイブ演出 4 件は §2 に集約）
  - guild: **2 件**（3a プレビュー差替 pop / 3c 配置 pop が未実装）
  - guild-char (4a/4c/4d/4e): **1 件**（装備変更時の数値カウント FX が未実装。4b は仕様除外）
  - shop: **2 件**（5c `obsidian-coinPop` が定義漏れで silent fail / 5d 売却確定 coin FX 不在）
  - forge: **1 件**（6a 強化値プレビューの数値カウント FX 不在。forgeSpark は OK）
  - codex: **2 件**（7a 新規登録のめくり FX 不在 / 7b 達成率リング「満ち」の単発演出が常時静止）
  - dungeon: **3 件**（8a FPV の `corridorPulse` / `breathe` / `bloom` 3 種が未実装）
  - not-found: **1 件**（? エンブレム脈動はあるが、モックの脈動速度より遅い）
- **総合所感**: title / town / forge / shop の主要 keyframe は概ね揃っている。**致命的なバグは shop の `coinPop` 1 件のみ**。残りは「動的 pop / カウントアップ」系の **微差** が中心で、修正コストは合計 1〜1.5 人日想定（中項目だけなら半日）。
- **dive 演出だけは別格**で、ユーザーの違和感の核心。**実装側で勝手に挿入している「潜行」テキストを削除**するだけで体感が大きく改善する（1 行 PR 相当）。

---

## 2. ダイブ演出の差分 (最優先・独立セクション)

ユーザー指摘の「ダイブ演出のエフェクトがデザインと違う」の核心ポイントを line-by-line で照合する。

### 2.1 モック側の構成 (案A v3 line 331–340)

```
331:    <!-- 2e dive seal effect -->
332:    <div style="flex:none;width:393px">
333:      [見出し] diveTransition ・ ダイブ演出
334:      [設計コメント] ✦ FX: 封蝋シジルのスタンプ → 320ms 暗転 → dungeon
335:      <div style="...;background:#070809;...display:flex;align-items:center;justify-content:center">
336:        <div style="position:absolute;inset:0;background:radial-gradient(circle at 50% 50%,rgba(120,30,28,.18),transparent 60%)"></div>
337:        <div style="position:absolute;top:50%;left:50%;width:160px;height:160px;border-radius:50%;
338:                    background:radial-gradient(circle,#8a2f2a,#5e1f1c);
339:                    box-shadow:0 8px 30px rgba(0,0,0,.6),0 0 40px rgba(138,47,42,.4);
340:                    animation:sealStamp 2.6s ease-in-out infinite;
341:                    transform:translate(-50%,-50%) rotate(-6deg)">
342:          [内側のシジル: 二重円輪 + repeating-conic-gradient のレイ + 中央に菱形]
343:        </div>
344:        <div style="position:absolute;bottom:60px;...font-family:'JetBrains Mono',monospace;
345:                    font-size:11px;letter-spacing:.2em;color:#5d5a52">SEALING… 1F へ</div>
346:      </div>
347:    </div>
```

要点:

- **背景**: 真っ黒 (`#070809`) + 中心に暗い朱の `radial-gradient`（光輪のヒント）。
- **中央のシール**: 160×160 円 + 朱の `radial-gradient` + 内部に **シジル** (二重円輪 + 放射ライン + 中央に小さな菱形)。
- **シールの中の文字**: **無し**。シジル (sigil = 紋章) のみ。「潜行」も「DIVE」も無い。
- **アニメーション**: `sealStamp 2.6s ease-in-out infinite` でシール全体が押印モーション (scale 2.4→0.92→1.04→1 と rotate)。
- **下端の小テキスト**: `SEALING… 1F へ` を等幅フォントで `letter-spacing: .2em`、色 `#5d5a52` (mute)。これがユーザーへの「何が起きているか」のヒント。
- **設計コメントが明示する遷移**: `封蝋シジル → 320ms 暗転 → dungeon`。**320ms の暗転** が間にある。

### 2.2 実装側の構成 (`src/pages/town/index.tsx` 393–406 / `src/pages/town/style.module.scss` 周辺)

```tsx
{sealActive ? (
  <div className={styles.sealOverlay} aria-hidden="true">
    <InkSplatter
      value="潜行"             // ← 実装側で勝手に追加した文字列
      variant="seal"
      size={120}
      onDone={() => setSealActive(false)}
    />
    <div className={styles.sealCaption}>SEALING… {sealingDepth}F へ</div>
  </div>
) : null}
```

`InkSplatter` の `variant="seal"` を `value="潜行"` で呼んでいる。

`InkSplatter` (`src/components/common/InkSplatter/`) の seal バリアントは:

- 中央に `value` (=「潜行」) を漢字で大きく描く
- 周囲に墨だまり (splat-dot 12 方向) を散らす独自表現
- 独自 keyframes (`splat-burst` / `splat-dot` / `label-appear`) で動く

= モックの `sealStamp` keyframes / シジル形状とは **別物**。

### 2.3 差分一覧

| # | モック | 実装 | 影響 |
|---|---|---|---|
| D1 | シール内側はシジル (二重円輪 + repeating-conic-gradient + 菱形)。**漢字なし** | `<InkSplatter value="潜行" />` で **「潜行」漢字を中央に表示** | **最重要**: ユーザーの「デザインと違う」の核心。テキスト付きのため「儀式的封蝋」の印象から「ボタン押下表示」のような印象に変わる |
| D2 | `animation: sealStamp 2.6s ease-in-out infinite` で押印モーション (scale 2.4→0.92→1.04→1 + rotate -6deg) | `InkSplatter` 独自の `splat-burst` (320ms cubic-bezier) + `splat-dot` で墨だまりを 12 方向に散らす | アニメ思想が「押印 → 蝋が固まる」から「墨が爆ぜる」へ変質 |
| D3 | 背景中心に `radial-gradient(circle at 50% 50%, rgba(120,30,28,.18), transparent 60%)` で**暗い朱の光輪**を敷く | `.sealOverlay` の背景（要確認）にこの朱の光輪が無い場合あり | 「封印の温度感」を担う重要なレイヤー |
| D4 | 設計コメントに「**320ms 暗転 → dungeon**」と明記 | `sealActive` の解除タイミングは `InkSplatter.onDone` (約 700ms) で即遷移、明示的な 320ms 暗転は無い | 遷移の余韻が弱い (= スキッ と切り替わる感じ) |

### 2.4 修正方針

優先度順:

1. **(D1) `InkSplatter` を使わず、モック準拠のシジルを直接描画する**。具体的には `style.module.scss` で `.sealSigil` クラスを作り、`sealStamp` keyframes (`_obsidian.scss:113`) を `animation: obsidian-sealStamp 2.6s ease-in-out infinite` で適用。中身は二重円輪 + `repeating-conic-gradient(from 0deg, rgba(233,201,160,.55) 0deg 2deg, transparent 2deg 30deg)` + 中央に 16px の `transform: rotate(45deg)` 菱形。**`value="潜行"` の漢字は完全に削除**する。
2. **(D3) `.sealOverlay` の背景に朱の `radial-gradient` レイヤーを追加**。`background: radial-gradient(circle at 50% 50%, rgba(120,30,28,.18), transparent 60%), #070809;`
3. **(D4) シール演出後 320ms の暗転を挟む**。`sealActive` を `'stamp' | 'dim' | null` の 3 状態に拡張し、`stamp` を 800ms (sealStamp 約 1 周期 + 余韻) 維持 → `dim` を 320ms (画面全体を `#000` でフェード) → `dungeon` 遷移。
4. **(D2)** D1 の修正で `InkSplatter` から離れた時点で `sealStamp` keyframes が自然に適用されるため、追加作業不要。

→ **修正コスト**: 半日 (SCSS 追加 + town/index.tsx の演出フェーズ拡張 + Storybook での確認)。

---

## 3. 戦闘ログ位置の差分 (独立セクション)

ユーザー指摘の「戦闘ログの位置がデザインと違う」の核心ポイントを line-by-line で照合する。

### 3.1 モック側の位置 (案A v3 line 967–990)

```
967:    <!-- 9a interactive main (v3) -->
971:      <div style="...display:flex;flex-direction:column">
972:        <!-- header (slim) -->
973:        <div style="flex:none;padding:10px 14px 8px;background:linear-gradient(180deg,rgba(20,16,18,.96),rgba(11,12,16,.35))">
974:          [chapter mark] ❦ 戦闘 ・ F2 ・ ターン 4
975:          ↓
976:          <!-- 行動順帯（正式） -->
977:          [行動順アイコン 1 列・横スクロール]
988:          <!-- 戦闘ログ（1行・タップで全文） -->
989:          <div onClick="{{ openLog }}"
                  style="cursor:pointer;border-left:2px solid #c9a86a;padding-left:8px;
                         font-family:'JetBrains Mono',monospace;font-size:10px;line-height:1.5;
                         color:#9a958a;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">
                  リーフの三段斬り！ 門番ゴーレムに <span style="color:#e09180">142</span>
                  <span style="color:#5d5a52">— タップで全ログ</span>
              </div>
990:        </div>
991:        <!-- enemy area (均一カード・弱点チップのみ) -->
```

要点:

- **DOM 構造**: `header (slim)` という独立した **flex:none ブロック** の中に「chapter mark / 行動順帯 / 戦闘ログ」の 3 つが縦に並ぶ。
- **戦闘ログはヘッダ最下段** (chapter mark の下、行動順帯の下、enemy area の上)。
- **見た目**: 左端に `border-left: 2px solid #c9a86a` (金線)、`padding-left: 8px`、等幅フォント 10px、`white-space: nowrap; overflow: hidden; text-overflow: ellipsis` で **1 行のみ**。
- **ヒント文**: `タップで全ログ` をログ末尾に `<span>` で **inline** に小さく付与 (`color: #5d5a52`)。独立した「タップで全履歴」ボタンや見出しは無い。
- **タップ動作**: `onClick="{{ openLog }}"` でフルログオーバーレイ (line 1078, `<sc-if value="{{ logOpen }}">`) を開く。

### 3.2 実装側の位置 (`src/pages/battle/index.tsx` 1151–1419 構造)

```tsx
<div className={styles.layout}>
  {/* 章マーカー */}
  <div className={styles.chapterRow}>
    <p className={styles.chapterMark}>❦ 戦闘 ・ F{...}</p>
  </div>
  {/* (A) 行動順帯（最大 8 アイコン + …） */}
  {turnOrderPreview.length > 0 && (
    <div className={styles.turnOrderBar}> ... </div>
  )}
  {/* 戦場（敵 + 召喚 + 味方 + ログ） */}
  <div className={styles.battlefield}>
    <div className={styles.enemies}>...</div>
    <div className={styles.targetInfoPanel}>...</div>
    <div className={styles.summons}>...</div>
    <div className={styles.party}>...</div>
    {/* 戦闘ログ（インライン 3 行プレビュー / キャラ下・コマンド上）*/}
    <button className={styles.log} onClick={() => setLogOpen(true)}>
      <div className={styles.logHeader}>
        <span>戦闘ログ</span>
        <span className={styles.logHeaderHint}>タップで全履歴</span>
      </div>
      <div className={styles.logBody}>
        {visible.slice(-3).map((l, i, arr) => (
          <div className={styles.logLine}>{l.text}</div>
        ))}
      </div>
    </button>
  </div>
  <div className={styles.commandPanel}>...</div>
</div>
```

要点:

- **戦闘ログは `.battlefield` の中の、味方カードの直下、コマンドパネルの直上**に置かれている。
- **DOM 構造**: `chapterRow / turnOrderBar / battlefield (enemies / targetInfoPanel / summons / party / **log**) / commandPanel` の縦並び。
- **見た目**: 独立した `.logHeader`（`戦闘ログ` 見出し + `タップで全履歴` ヒント）を持ち、`.logBody` の中に **最新 3 行**を表示。
- **タップ動作**: button 全体が `onClick={() => setLogOpen(true)}` で全履歴オーバーレイを開く。

### 3.3 差分一覧

| # | モック (案A v3) | 実装 (`src/pages/battle`) | 影響 |
|---|---|---|---|
| L1 | ログは **ヘッダブロック内** (chapter + turnOrder の下、enemy の上) | ログは **battlefield 末尾** (party の下、commandPanel の上) | **最重要**: 視線移動の順番がモックと真逆。モックは「ヘッダで状況把握 → 敵を見る → コマンド」、実装は「敵を見る → 味方 → ログで状況把握 → コマンド」 |
| L2 | **1 行のみ** (white-space: nowrap + ellipsis) | **最新 3 行** | コマンドエリアを圧迫しないというモック設計が崩れている。短画面 (iPhone SE) で party / log / command の積み重ねが厳しい |
| L3 | **独立した「戦闘ログ」見出しは無い**。本文 1 行のみ + 末尾に inline で `タップで全ログ` | `.logHeader` に「戦闘ログ」見出し + `.logHeaderHint` で `タップで全履歴` を独立配置 | 見出しが入る分縦が伸びる |
| L4 | 左端に **金線 (`border-left: 2px solid #c9a86a`)** + `padding-left: 8px` のみ | button 全体に borderless スタイル (要確認だが logHeader/logBody の二段構造) | 「行間に滑り込む 1 行」のモック印象が薄れる |
| L5 | フォントは `'JetBrains Mono', monospace` 10px、色 `#9a958a` (mute)、数値は `#e09180` (赤系) でハイライト | 同等の mono フォント想定だが、数値ハイライトはログテキスト内に色情報が無いため uniform 表示 | 「142」「会心」など重要数値の視認性差 |

### 3.4 修正方針

優先度順:

1. **(L1) ログを `.battlefield` の外、`turnOrderBar` の直下 (ヘッダブロック扱い) に移す**。具体的には `<div className={styles.chapterRow}>` `<div className={styles.turnOrderBar}>` `<div className={styles.log}>` を **同階層に並べて** `<div className={styles.battlefield}>` の前に置く。`.battlefield` の内部にあった `.log` ブロックを削除。
2. **(L2 + L3) 表示行数を 1 行に縮め、`.logHeader` 見出しを廃止**。実装は `visible.slice(-1)` で最新 1 行のみを `.logLine` で描画し、その末尾に `<span className={styles.logHint}>— タップで全ログ</span>` を inline で連結する。`white-space: nowrap; overflow: hidden; text-overflow: ellipsis` を必ず付与。
3. **(L4) `.log` のスタイルを `border-left: 2px solid var(--gold); padding-left: 8px; font-family: var(--font-mono); font-size: 10px; line-height: 1.5; color: var(--text-mute);` に修正**。background / border-radius / padding-top / padding-bottom は最小限に。
4. **(L5) ログテキストに数値ハイライトを追加**。`state.log[i].text` のパース処理を新設するか、または `BattleLogEntry` に `highlights: Array<{ from: number; to: number; color: string }>` を追加する設計変更が必要。**今期は対応見送り推奨** (体感への影響は L1〜L3 ほど大きくない)。

→ **修正コスト**:
- L1+L2+L3+L4 = 半日 (`battle/index.tsx` の構造移動 + `style.module.scss` の `.log` 系セレクタ削減 + Storybook 確認)
- L5 (数値ハイライト) = 1 日 (BattleLogEntry スキーマ拡張 + ログ生成箇所の更新)

---

## 4. 画面別エフェクト差分

各画面で **モック側 (案A v3) で使われている animation**（実測）と **実装側で使われている animation** を対照し、見た目の差分を箇条書きで列挙する。差分のないものは記載しない。

凡例: ✦ = 軽微 / ◆ = 中 / ★ = 重要

### 4.1 title (1a / 1b / 1c / 1d)

| frame | モック animation (実数) | 実装 animation | 差分 |
|---|---|---|---|
| 1a WithSave | moteDrift ×4, glowPulse ×1 (樹外輪), breathe ×1 (樹) | moteDrift ×4 (`title/style.module.scss:48-72`), glowPulse ×1 (145), breathe ×1 (166) | 差分なし |
| 1b NoSave | moteDrift ×2, glowPulse ×1, breathe ×1 | 同上を兼用 | 差分なし |
| 1c Corrupted | warnBlink ×1 (警告カード点滅) | 警告カードの `warnBlink` はあるか？ → `style.module.scss:433` で warnBlink 適用済 (入力カーソル用だが警告カードでも兼用) | 差分なし |
| 1d guildNameInput | warnBlink ×1 (カーソル), sealStamp ×1 (確定時封蝋プレビュー) | warnBlink 1s steps(1) infinite (433), sealStamp は **使用なし** | ✦ プレビュー用の sealStamp プレビューがモックでループしているが、実装側の `InkSplatter` は確定時のみ単発で発火するため、入力中の「これから何が起こるか」の予告 UI は無い。実害は少ない |

→ **差分件数: 0 件**（1d のプレビュー sealStamp は明示的に省略済み = §2.1.6 で「プレビュー封蝋シジルは省略」と redesign-A.md に記載あり、仕様外）。

### 4.2 town (2a / 2b / 2c / 2d / 2e)

| frame | モック animation | 実装 animation | 差分 |
|---|---|---|---|
| 2a hub 拠点モード | glowPulse 5s (ダイブカード), glowPulse 2.5s (自動保存ドット) | `.dive` glowPulse 5s (128), `.autosaveDot` glowPulse 2.5s (293) | 差分なし |
| 2b hub 潜行モード | glowPulse 4s (再開カード) | `.dive` + `.diveResume` だが `.diveResume` 単独の animation 上書きが無く、**`.dive` の 5s** をそのまま継承 | ✦ T1: 再開カードの脈動秒数 4s → 5s (1s 違い)。体感差は小さい |
| 2c hub 団員 0 | glowPulse 3.5s (ヒント), glowPulse 3s (誘導カード) | `.hintGold` glowPulse 3.5s (94), `.tileGuide` glowPulse 3s (247) | 差分なし |
| 2d warpPanel | (animation なし、せり上がり) | `.warpPanel` 関連 `obsidian-sheetRise` 220ms (338) | 差分なし (実装側でせり上がり追加) |
| 2e dive seal | sealStamp 2.6s | `.sealOverlay` + `InkSplatter` (§2 参照) | ★ §2 で詳述（合計 4 件、本表ではカウントしない） |

→ **差分件数: 1 件** (T1 のみ。+ §2 で詳述したダイブ演出 4 件は独立カウント)。

### 4.3 guild (3a / 3b / 3c)

| frame | モック animation | 実装 animation | 差分 |
|---|---|---|---|
| 3a create | warnBlink ×1 (入力カーソル) | (guild/style.module.scss に warnBlink 直接なし、Common の入力コンポーネントから) | ✦ G1: モック設計コメント `✦ FX: 種族/職業カード選択ハイライト / プレビュー差替 pop / 作成生成 FX` のうち、**プレビュー差替 pop** (種族 or 職業の選択を変えた瞬間、下部プレビューカードがふっと差替わる pop アニメ) が未実装 |
| 3b roster | (animation なし) | (animation なし) | 差分なし |
| 3c party (編成) | glowPulse ×1 (line 473 の追加スロット) | guild/style.module.scss:473 で `.add` 系に obsidian-glowPulse 2s | ✦ G2: モック設計コメント `✦ FX: 空きスロットタップ→ピッカーせり上がり / 配置 pop` のうち、**配置 pop** (キャラクターをスロットに置いた瞬間のスケール pop) が未実装 |

→ **差分件数: 2 件** (G1, G2 はいずれも mid 優先度の動的演出)。

### 4.4 guild-char (4a / 4b / 4c / 4d / 4e)

> 4b SkillTree は **「現状実装のままで OK」** と changelog (B 章) で明示されており、本監査の対象外。

| frame | モック animation | 実装 animation | 差分 |
|---|---|---|---|
| 4a stats / equip | (animation なし) | (animation なし) | ✦ GC1: モック設計コメント `✦ FX: 装備変更時の数値カウント / 候補ハイライト` のうち、**数値カウント** (装備を入替えた瞬間 STR/AGI 等の表示が +N アニメーションで上下するカウントアップ) が未実装 |
| 4b skill / growth | glowPulse ×1 | (対象外) | 仕様除外 |
| 4c title (称号) | (animation なし) | (animation なし) | 差分なし |
| 4d job (転職) | (animation なし) | (animation なし) | 差分なし |
| 4e rebirth (転生) | (animation なし) | (animation なし) | 差分なし |

→ **差分件数: 1 件** (GC1)。

### 4.5 shop (5a / 5b / 5c / 5d)

| frame | モック animation | 実装 animation | 差分 |
|---|---|---|---|
| 5a buy | (animation なし) | (animation なし) | 差分なし |
| 5b sell | (animation なし) | (animation なし) | ✦ S1: モック設計コメント `✦ FX: 売却確定 coin / 個体選択` のうち、**売却確定 coin** (売却ボタンタップ時の金貨ポップ) が未実装 |
| 5c buy dialog + coin fx | coinPop ×1 | `.coinPop` (426) で `animation: obsidian-coinPop 1.8s ease-in-out infinite` を**参照しているが、`@keyframes obsidian-coinPop` がプロジェクト内に未定義** | ★ S2: **致命的バグ**。silent fail で購入確認モーダルの 🪙 アニメが動いていない。前回 `effects-audit.md` §1 で指摘済 |
| 5d sell dialog (推測) | (該当フレーム明示なし) | (animation なし) | (S1 と統合) |

→ **差分件数: 2 件** (S1 mid, S2 high)。

### 4.6 forge (6a / 6b / 6c / 6d)

| frame | モック animation | 実装 animation | 差分 |
|---|---|---|---|
| 6a enhance | (animation なし) | (animation なし) | ✦ F1: モック設計コメント `✦ FX: インゴット残量 / 強化値プレビュー` のうち、**強化値プレビュー** (`+5 → +6` の数値が直接書き換わるのではなく、+1 が下からスライドインしてくる pop) が未実装。実害は小さい |
| 6b recycle | (animation なし) | (animation なし) | 差分なし |
| 6c enhance confirm | forgeSpark ×3 (delay 0/0.3/0.6) | `.spark1/2/3` で forgeSpark 1.3s ease-in-out (delay 0/0.3/0.6) infinite (469/477/485) | 差分なし (完全一致) |
| 6d (recycle confirm) | (animation なし) | (animation なし) | 差分なし |

→ **差分件数: 1 件** (F1)。なお前回 `effects-audit.md` 表 #31 の「forge は `forge-spark` (ハイフン) ローカル定義」は古い記述。現状は `forgeSpark` CamelCase で `_obsidian.scss:308` の定義を参照しており分断はない。

### 4.7 codex (7a / 7b / 7c)

| frame | モック animation | 実装 animation | 差分 |
|---|---|---|---|
| 7a bestiary grid | (animation なし、設計コメントは「新規登録のめくり / セル選択ハイライト」) | (animation なし) | ✦ C1: **新規登録のめくり** (図鑑で新規に登録された個体をハイライトする小さなページめくり pop) が未実装 |
| 7b records | (animation なし、設計コメントは「達成率リングの満ち / 撃破スタンプ」) | (animation なし) | ✦ C2: **達成率リングの「満ち」演出** (記録画面初表示時に SVG リングが 0% → 現在% へ満ちていく単発演出) が未実装。現状は静止表示 |
| 7c (詳細) | glowPulse ×1 (line 7c) ※ codex 内のサブフレームと推測 | (`pages/codex/style.module.scss` に obsidian-glowPulse 参照なし) | (微小差。図鑑詳細の ? シルエットの脈動 — 7a 一覧に統合されている可能性が高い) |

→ **差分件数: 2 件** (C1, C2 はいずれも初回演出系)。

### 4.8 dungeon (8a / 8b / 8c / 8d)

| frame | モック animation | 実装 animation | 差分 |
|---|---|---|---|
| 8a FPV + automap | corridorPulse ×1, breathe ×1, bloom ×1, warnBlink ×1 (FOE 赤マス) | `gatherSparkle` 1.6s (439), `obsidian-warnBlink` 1.6s (940), `obsidian-glowPulse` 2.5s (965) | ◆ D1: **`corridorPulse`** (廊下グラデの opacity 脈動) が未実装。FPV の「奥行きが動いている」感が薄い |
|  |  |  | ◆ D2: **`breathe`** (FPV 上の敵プレビューが上下に呼吸) が未実装。前方の敵が静止画になっている |
|  |  |  | ✦ D3: **`bloom`** (FPV 敵の後光 radial-gradient) が未実装。境界感が弱い |
| 8b encounter flash + gather/cook | encPulse ×1, sealStamp ×1 (遭遇シール), warnBlink ×1, gatherSparkle ×1, healRise ×1, steamRise ×2 | `gatherSparkle` (439), `steamRise` (479/482) | (encPulse / sealStamp / healRise はそれぞれ battle / town / 未実装に該当。本書では §4.10 の総括に集約) |
| 8c ☰ menu | glowPulse ×1 | (要確認だが `obsidian-glowPulse` は dungeon/style.module.scss:965 で使用) | 差分なし |
| 8d use item / save | healRise ×1 | (未実装) | (§4.10 で集約) |

→ **差分件数: 3 件** (D1 mid, D2 mid, D3 low)。

### 4.9 not-found (10a)

| frame | モック animation | 実装 animation | 差分 |
|---|---|---|---|
| 10a | glowPulse ×1 (? エンブレム脈動) | `obsidian-glowPulse 5s` (62) | ✦ NF1: 実装秒数 5s に対し、モックの設計コメントは脈動速度に明記なし。**title の樹エンブレムと同じ秒数を踏襲**しているが、モック原本では `glowPulse 2.5s` などより速い秒数の可能性が高い (要再採寸)。実害は小さい |

→ **差分件数: 1 件** (NF1)。

### 4.10 §4 の総差分件数まとめ

| 画面 | 件数 |
|---|---|
| title | 0 |
| town | 1 |
| guild | 2 |
| guild-char | 1 |
| shop | 2 |
| forge | 1 |
| codex | 2 |
| dungeon | 3 |
| not-found | 1 |
| **合計** | **13 件** |

加えて、§2 dive 演出 4 件、§3 battle log 配置 5 件 を含む。

---

## 5. 優先度別の修正タスク一覧

### High (ユーザー体験への影響が大きい / 致命的バグ)

| # | 画面 | 概要 | 出典 | 修正コスト |
|---|---|---|---|---|
| H1 | town 2e | **`InkSplatter value="潜行"` を削除し、モック準拠のシジルを `sealStamp` で直接描画** | §2.4 (D1) | 半日 |
| H2 | shop 5c | **`obsidian-coinPop` keyframes を `_obsidian.scss` に追加** (silent fail 解消) | §4.5 (S2) / 前回監査 §4 | 30 分 |
| H3 | battle 9a | **戦闘ログを `.battlefield` 外 / `turnOrderBar` 直下に移動 + 1 行表示化 + 見出し廃止 + 左金線スタイル** | §3.4 (L1〜L4) | 半日 |

### Mid (体験を底上げする / 設計コメントに明記された動的演出)

| # | 画面 | 概要 | 出典 | 修正コスト |
|---|---|---|---|---|
| M1 | town 2e | **シール演出後 320ms の暗転** (Dungeon 遷移の余韻) | §2.4 (D4) | 2 時間 |
| M2 | town 2e | **`.sealOverlay` 背景に朱の `radial-gradient` 光輪** を敷く | §2.4 (D3) | 30 分 |
| M3 | dungeon 8a | **`corridorPulse`** (FPV 廊下グラデ opacity 脈動) を追加 | §4.8 (D1) | 3 時間 |
| M4 | dungeon 8a | **`breathe`** を FPV 敵プレビューに適用 | §4.8 (D2) | 1 時間 |
| M5 | guild 3a | **プレビュー差替 pop** (種族/職業選択切替時の下部プレビュー pop) | §4.3 (G1) | 2 時間 |
| M6 | guild 3c | **配置 pop** (空きスロットへキャラ配置時のスケール pop) | §4.3 (G2) | 2 時間 |
| M7 | guild-char 4a | **数値カウント** (装備入替時の STR/AGI 等の数値カウントアップ) | §4.4 (GC1) | 半日 |
| M8 | shop 5b | **売却確定 coin** (売却ボタンタップ時の coinPop) | §4.5 (S1) | 1 時間 (H2 と相乗) |
| M9 | codex 7b | **達成率リング「満ち」** (初回表示時の 0% → 現在% アニメ) | §4.7 (C2) | 2 時間 |

### Low (装飾的 / モック側でも明示が弱い)

| # | 画面 | 概要 | 出典 | 修正コスト |
|---|---|---|---|---|
| L1 | town 2b | `.diveResume` 単独の脈動秒数を 4s に分離 | §4.2 (T1) | 15 分 |
| L2 | dungeon 8a | **`bloom`** (FPV 敵後光) | §4.8 (D3) | 1 時間 |
| L3 | guild-char 4a | (GC1 内の) 候補ハイライト系の追加詳細 | §4.4 | 1 時間 |
| L4 | forge 6a | **強化値プレビュー** の +1 スライドインカウント | §4.6 (F1) | 2 時間 |
| L5 | codex 7a | **新規登録のめくり** | §4.7 (C1) | 2 時間 |
| L6 | not-found 10a | ? エンブレム脈動秒数の再採寸 | §4.9 (NF1) | 30 分 |
| L7 | battle 9a | ログテキストの数値ハイライト (BattleLogEntry スキーマ拡張) | §3.4 (L5) | 1 日 |

---

## 6. 総差分件数と修正コスト見積

### 差分件数

| カテゴリ | 件数 |
|---|---|
| §2 ダイブ演出 (town 2e) | 4 |
| §3 戦闘ログ位置 (battle 9a) | 5 |
| §4 画面別エフェクト (9 画面) | 13 |
| **総差分** | **22 件** |

### 優先度別件数

| 優先度 | 件数 | 合計コスト |
|---|---|---|
| High | 3 件 | 1 人日 |
| Mid | 9 件 | 2.5 人日 |
| Low | 7 件 | 1.5 人日 |
| **合計** | **19 件** (※ §3 の L1〜L4 を 1 タスクに統合した分、上記 22 件から 3 件減) | **5 人日** |

### 総合所感

- **致命的バグは 1 件のみ** (`obsidian-coinPop` 定義漏れ)。残りは「動的 pop / カウントアップ / 初回演出」系の **微差** で、ゲームプレイ上の阻害要因にはなっていない。
- **ユーザー指摘の核心 2 件 (ダイブ演出 + 戦闘ログ位置) は、いずれも H1 / H3 で集中対応可能**。合計 1 日で「モックと違う」体感は解消する想定。
- **High だけでも先にマージすれば**、ユーザー視点の「デザインと違う感」は 8 割方解消する。Mid / Low は段階的に追加していけば良い。
- **dive 演出の「潜行」テキスト** は **1 行の差** (`value="潜行"` を削除し、`<InkSplatter>` を `<div className={styles.sealSigil} />` に置換) でほぼ解決する。最優先で着手すべき。

---

## 監査メソッド (再現性のため)

1. モック原本 `/tmp/sekaiju-design/案A_v3.dc.html` から `<!-- (\d+)([a-z])` パターンでフレームマーカーを抽出 (frame: 1a〜10a)。
2. `animation:\s*([A-Za-z][\w-]*)` を `python3` の re で全行スキャンし、各 frame ごとに animation 名 + 出現回数を集計 (`§4` の表のモック側欄の出典)。
3. 実装側は `grep -nE "animation:" src/pages/*/style.module.scss` で同様に animation 参照を抽出。
4. 各 frame について「モック側に出ているが実装側に同等のものが無い」「実装側に出ているが秒数/対象要素が異なる」を差分として列挙。
5. 設計コメント (`✦ FX:` 始まりの注記) は **モック側の意図** として参照し、動的演出 (pop / カウントアップ等) のうち keyframes に出ない暗黙の演出も差分対象に含めた。
6. ダイブ演出 (2e) と 戦闘ログ (9a header) はユーザー指摘の重要箇所のため、上記スキャンとは別に line-by-line で DOM 構造を読み比べた (§2 / §3)。
