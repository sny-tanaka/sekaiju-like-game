# 転生システム改修 ＋ strategy-docs 拡充 設計書（issue #55 関連 / PR #56）

本設計書は実装担当（sonnet）が「判断を残さず」実装するための確定仕様。数値・式・型・手順をすべて確定済み。
本書に書かれた式・期待値どおりに実装すること。**新たな判断（数値の発明・式の変更）は禁止**。迷ったら本書に従う。

対象リポジトリ: `/Users/shunyatanaka/work/sekaiju-like-game`

---

## 0. 目的（3本立て）

1. **転生システムを「無限強化」要素へ再設計**（階層が無限なことと整合させる）。
   - 転生は **Lv100 到達時のみ** 可能。
   - 転生後は **Lv1 から再スタート**。
   - 永続ボーナスは **累積**（転生のたびに加算され、頭打ちなし）。
   - ボーナスは **転生時に選んだ種族の成長傾向に応じて配分**（例: ガロンで転生すると STR が大きく伸びる）。基準は「全ステ合計で 8×30=240 ポイント／回」。
2. **strategy-docs に調整パラメータをすべて記載**（今後の種族・職業・スキル設計の土台にする）。
   - スキルのレベル依存値は **全レベル分** 記載（現状は Lv1→最大の2点のみ）。
   - グローバルなバランス定数（`balance.ts`）を新規 `balance.md` に出力。
   - 生成器内のハードコード種族説明文を新設計（ガロン=攻撃／ドーム=防御）に更新。
3. 既存セーブ互換（マイグレーション）を保つ。

---

## 1. 転生システム

### 1.1 定数（`src/data/balance.ts`）

`UNLOCK.REBIRTH_MIN_LEVEL` を **30 → 100** に変更（コメントも「転生可能レベル（Lv上限到達時のみ）」に更新）。

`BALANCE` ブロックの末尾付近、または `UNLOCK` 付近に転生用定数を追加:

```ts
/** 転生（[01 §7]）。Lv100到達時のみ・Lv1再スタート・永続ボーナスは累積。 */
export const REBIRTH = {
  /** 1回の転生で配る「全ステ合計」ボーナスポイント（= 基準 30 × 8 ステ）。種族の成長傾向で按分する。 */
  STAT_TOTAL: 240,
  /** 1回の転生で得る追加 SP（種族非依存・固定・累積）。 */
  BONUS_SP: 10,
} as const;
```

### 1.2 型（`src/domain/types.ts`）

`RebirthBonus` を per-stat 形式へ変更:

```ts
/** 転生由来の補正（[01 §7]）。転生のたびに累積する。 */
export interface RebirthBonus {
  /** 各能力への永続加算（種族配分で偏る）。未指定ステは 0 扱い。 */
  stats: Partial<Record<StatKey, number>>;
  /** 追加 SP（累積）。 */
  bonusSp: number;
  /** 転生回数（累積。UI 表示・将来拡張用）。 */
  count: number;
}
```

`StatKey` は既に types.ts にある（`'hp'|'tp'|'str'|'vit'|'agi'|'int'|'mnd'|'luc'`）。import 不要（同ファイル内）。

### 1.3 種族別ボーナス配分（`src/domain/charProgress.ts` に新設）

**式（確定）**: ステ間でスケール差（HP は2桁・STR は1桁）があるため、各ステの成長値を「全種族のそのステ成長の平均」で正規化した重みで按分する。

```
種族数 N = Object.keys(RACES).length
avgGrowth[key] = (Σ_r RACES[r].statGrowth[key]) / N          // 全種族のステ別平均成長
w[key]         = RACES[raceId].statGrowth[key] / avgGrowth[key]   // 対象種族の相対重み
sumW           = Σ_key w[key]
bonus[key]     = Math.round(REBIRTH.STAT_TOTAL * w[key] / sumW)   // 合計が STAT_TOTAL になるよう正規化
```

実装する関数:

```ts
/** 転生1回ぶんの種族別ステ配分（[01 §7]）。種族の成長傾向に比例して STAT_TOTAL を按分する。 */
export function rebirthStatBonusForRace(raceId: RaceId): Partial<Record<StatKey, number>> {
  const races = Object.values(RACES);
  const keys: StatKey[] = ['hp', 'tp', 'str', 'vit', 'agi', 'int', 'mnd', 'luc'];
  const avg: Record<string, number> = {};
  for (const k of keys) avg[k] = races.reduce((s, r) => s + r.statGrowth[k], 0) / races.length;
  const target = RACES[raceId];
  const w: Record<string, number> = {};
  let sumW = 0;
  for (const k of keys) {
    w[k] = avg[k] > 0 ? target.statGrowth[k] / avg[k] : 0;
    sumW += w[k];
  }
  const out: Partial<Record<StatKey, number>> = {};
  for (const k of keys) out[k] = Math.round((REBIRTH.STAT_TOTAL * w[k]) / sumW);
  return out;
}
```

**検算（現行の種族データでの想定値・参考）**:
- **ガロン**（攻撃型）: STR が最大配分（おおむね STR+52 / HP+45 付近）。`str` が全ステ中で最大になること。
- **ドーム**（防御型）: HP・VIT が大きい（HP+52 / VIT+54 付近）。`vit` が `str` より大きいこと。
- **ヒト**（バランス）: ほぼ全ステ +28〜32 の均等配分（基準＝全ステ30 に最も近い）。
- いずれも 8ステ合計はおおむね 235〜245（round 誤差込み）。

（厳密な1の位はテストで固定しない。下記テスト方針参照。）

### 1.4 `reincarnate` / `canReincarnate` 改修（`src/domain/charProgress.ts`）

- `REBIRTH_TABLE` と `RebirthRow` と `lookupRebirthBonus` は **削除**（Lv100固定になり不要）。`lookupRebirthBonus` を import している箇所（テスト）も合わせて除去する。
- `canReincarnate`:

```ts
/** 転生可能か（Lv上限=100到達時のみ）。 */
export function canReincarnate(char: Character): boolean {
  return char.level >= BALANCE.LEVEL_CAP;
}
```
（`BALANCE` を import すること。`UNLOCK` 経由でも可だが `REBIRTH_MIN_LEVEL=100` と `LEVEL_CAP=100` は一致。UI とテキストの一貫性のため `UNLOCK.REBIRTH_MIN_LEVEL` を使ってもよい。どちらか一方に統一。本書では `char.level >= UNLOCK.REBIRTH_MIN_LEVEL` を採用してよい。）

- `reincarnate`:

```ts
export function reincarnate(
  char: Character,
  next: { raceId: RaceId; classId: ClassId; name: string }
): Character {
  if (!canReincarnate(char)) return char;
  const inc = rebirthStatBonusForRace(next.raceId);
  const prev = char.rebirthBonus;
  // 各ステを累積加算
  const stats: Partial<Record<StatKey, number>> = { ...(prev?.stats ?? {}) };
  for (const [k, v] of Object.entries(inc)) {
    stats[k as StatKey] = (stats[k as StatKey] ?? 0) + (v ?? 0);
  }
  const bonusSp = (prev?.bonusSp ?? 0) + REBIRTH.BONUS_SP;
  const count = (prev?.count ?? 0) + 1;

  const base = createCharacter({ ...next, id: char.id });
  // Lv1 再スタート。SP は Lv1分(=0) ＋ 累積ボーナスSP。
  const total = spTotalForLevel(1) + bonusSp; // = bonusSp
  return {
    ...base,
    level: 1,
    exp: 0,
    rebirthBonus: { stats, bonusSp, count },
    skillPoints: { total, spent: base.skillPoints.spent },
  };
}
```

- `reincarnateInSave` はシグネチャ・装備返却処理そのまま（内部で新 `reincarnate` を呼ぶだけ）。変更不要。

### 1.5 ステータス算出（`src/domain/stats.ts`）

`rebirthAll`（全ステ一律）を廃止し、ステ別加算へ:

```ts
// 変更前: const rebirthAll = char.rebirthBonus?.allStats ?? 0;
const rebirthStats = char.rebirthBonus?.stats; // ステ別加算

// ループ内
// 変更前: result[key] = race.baseStatsAtLv1[key] + growth * levelSteps + rebirthAll + surplusBonus;
result[key] =
  race.baseStatsAtLv1[key] + growth * levelSteps + (rebirthStats?.[key] ?? 0) + surplusBonus;
```

冒頭コメントの式も更新（`+ rebirthBonus.stats[key]`）。

### 1.6 セーブマイグレーション（schemaVersion v2 → v3）

- `src/domain/saveData.ts`: `CURRENT_SCHEMA_VERSION` を **2 → 3** に。コメントに「v3: 転生ボーナスを per-stat 化（issue #55）」追記。
- `src/store/saveSerialization.ts`: `MIGRATIONS` に `2: (old) => migrateV2toV3(old)` を追加し、関数を実装:

```ts
/** v2→v3: 旧 rebirthBonus {allStats, bonusSp} を per-stat 形式 {stats, bonusSp, count} へ変換。 */
function migrateV2toV3(old: Record<string, unknown>): Record<string, unknown> {
  const next: Record<string, unknown> = { ...old, schemaVersion: 3 };
  const STAT_KEYS = ['hp', 'tp', 'str', 'vit', 'agi', 'int', 'mnd', 'luc'] as const;
  const guild = isObj(next.guild) ? { ...next.guild } : {};
  if (Array.isArray(guild.members)) {
    guild.members = guild.members.map((m) => {
      if (!isObj(m)) return m;
      const rb = m.rebirthBonus;
      if (!isObj(rb)) return m; // 転生未経験はそのまま（rebirthBonus 無し）
      // 既に新形式なら触らない
      if ('stats' in rb) return m;
      const all = typeof rb.allStats === 'number' ? rb.allStats : 0;
      const stats: Record<string, number> = {};
      for (const k of STAT_KEYS) stats[k] = all;
      const bonusSp = typeof rb.bonusSp === 'number' ? rb.bonusSp : 0;
      return { ...m, rebirthBonus: { stats, bonusSp, count: 1 } };
    });
  }
  next.guild = guild;
  return next;
}
```

（`isObj` は既存のヘルパを利用。なければ同ファイルの定義に合わせる。）

### 1.7 転生 UI（`src/pages/guild-char/index.tsx`）

- 転生不可時のテキストは `UNLOCK.REBIRTH_MIN_LEVEL`（=100）を参照していれば自動で「Lv100 以上で転生できます」になる。確認のみ。
- フォーム開示時の説明「開始Lv {Math.min(30, Math.floor(char.level / 2))}・ボーナス付き」を **「開始Lv 1（やり直し）・種族に応じた永続ボーナス付き」** に変更（開始Lvは固定で1）。
- **種族選択（`rbRace`）に応じたボーナスのプレビューを追加**:
  - `rebirthStatBonusForRace(rbRace)` を呼び、`STR +52 / HP +45 / …`（0 を除外、値の大きい順）を一覧表示。
  - 既に転生済み（`char.rebirthBonus`）の場合は「現在の累積ボーナス（転生{count}回）」も表示するとよい（任意だが推奨）。
  - ラベル例: 「{種族名}で転生 → 今回付与: STR+52, HP+45, VIT+34, …」。
- `import` に `rebirthStatBonusForRace` を追加。

### 1.8 テスト（`src/domain/charProgress.test.ts`）

旧テスト（lookupRebirthBonus 境界、Lv50で開始Lv25、allStats 期待値など）を **新仕様に書き換える**。脆い「1の位まで固定する配分値の厳密 assert」は避け、頑健な性質で検証する:

- `canReincarnate`: Lv99 → false、Lv100 → true。
- `reincarnate`（Lv100, ガロンで転生）:
  - `level === 1`、`exp === 0`、`id` 維持。
  - `rebirthBonus.count === 1`、`rebirthBonus.bonusSp === REBIRTH.BONUS_SP`(=10)。
  - `rebirthBonus.stats.str` がその配分中で**最大**（`str` が `vit` や `hp` 以外含め最大、もしくは少なくとも `str > vit`）。
  - 8ステ合計が 235〜245 の範囲。
  - `skillPoints.total === spTotalForLevel(1) + 10`（=10）。
- **累積**: 1回目（ガロン）→ Lv1。再度 Lv100 まで上げた前提のキャラ（`{...r, level:100}`）→ 2回目（ドームで転生）すると:
  - `rebirthBonus.count === 2`、`bonusSp === 20`。
  - `stats.str`（1回目ガロン由来）と `stats.vit`（2回目ドーム由来）が**両方とも 1回ぶんより増えている**（累積されている）こと。
- `rebirthStatBonusForRace`: ガロンは `str` 最大、ドームは `vit > str` かつ `hp` 大、ヒトはほぼ均等（最大-最小の差が小さい）を検証。
- `reincarnateInSave`: 装備が倉庫へ返却される既存テストは維持（rebirthBonus の assert だけ新形式へ）。

`spTotalForLevel`, `REBIRTH` の import を調整。`lookupRebirthBonus` の import は削除。

---

## 2. strategy-docs 拡充（`src/data/strategyDocsGen.test.ts`）

### 2.1 スキルのレベル依存値を「全レベル」表記に

ヘルパを追加し、`range`/`pctRange`/`tpStr` の **全レベル列挙版** を使う:

```ts
const allLv = (f: (lv: number) => number, max: number) =>
  Array.from({ length: max }, (_, i) => n2(f(i + 1))).join('/');
const allLvPct = (f: (lv: number) => number, max: number) =>
  Array.from({ length: max }, (_, i) => `${Math.round(f(i + 1) * 100)}%`).join('/');
const tpAll = (def: BattleSkillDef, max: number) =>
  Array.from({ length: max }, (_, i) => def.tpCost(i + 1)).join('/');
```

- `effectStr(e, max)` 内の `range(...)` → `allLv(...)`、`pctRange(...)` → `allLvPct(...)` に置換（威力・回復・TP回復・バフ倍率・状態異常確率・反撃/連携/挑発/障壁/継続回復の各数値すべて全レベル化）。
- `tpStr(def, max)` → `tpAll(def, max)` を使用。
- `passiveStr` も全レベル列挙へ（各 Lv の mods を `/` 区切りで）。
- 表ヘッダ `効果（Lv1→最大Lv）` を `効果（Lv1..最大Lv の全レベル値）` に変更。
- 例: `物理ダメージ 威力1.6/1.8/2.0/2.2/2.4`、`TP 4/5/6/7/8`。

races.md / classes.md / titles.md 冒頭の説明文に「数値は各レベル値を `/` 区切りで全レベル分記載」と一文追記。

### 2.2 種族説明（`raceRole`）の更新

`raceRole` の `race_garon` と `race_golan` を新設計に更新（他はそのまま）:

```ts
race_garon: '物理攻撃特化のアタッカー。種族屈指の STR を持つが VIT は控えめ。素早さ・魔法は不得手。',
race_golan: '防御特化のタンク（種族名: ドーム）。最高峰の HP・VIT で前線を支えるが攻撃力は控えめ、極端に鈍重。',
```
（`raceRole` のキーは種族 ID のままでよい。表示名は `RACES[rid].name` 由来で「ドーム」と出る。）

### 2.3 `balance.md` の新規生成

`generateStrategyDocs()` の末尾で `strategy-docs/balance.md` を生成する。`balance.ts` から **すべての調整定数** を出力する。`BALANCE`, `APPROPRIATE`, `UNLOCK`, `REBIRTH`, `FORGE`, `STARTING_GOLD`, `GUILD_MEMBER_LIMIT`, `PARTY_MAX`, `CLASS_CHANGE_LEVEL_PENALTY`, `TITLE_BONUS_SP` と、`expToNext`/`spTotalForLevel`/`spGainOnLevelUp`/`enemyScale` の式・テーブルを含める。

必要 import を追加: `BALANCE, APPROPRIATE, UNLOCK, FORGE, STARTING_GOLD, GUILD_MEMBER_LIMIT, PARTY_MAX, CLASS_CHANGE_LEVEL_PENALTY, TITLE_BONUS_SP, REBIRTH, expToNext, spTotalForLevel, spGainOnLevelUp, enemyScale`（`@/data/balance`）。`rebirthStatBonusForRace`（`@/domain/charProgress`）。`STAT_LABEL`/`statKeys`/`raceOrder`/`RACES` は既存利用。

`balance.md` に含める節（すべて表形式）:

1. **冒頭**: 「本書は `src/data/balance.ts` から自動生成。調整はこのファイル（と各マスター）を編集し `yarn gen:docs` で再生成」。
2. **基本進行**: LEVEL_CAP / BOSS_INTERVAL / BAND_SIZE / ENEMY_SCALE_K（各値と意味）。
3. **レベル別テーブル（Lv1〜100 全行）**: `| Lv | 次Lvまで必要EXP(expToNext) | 累計SP(spTotalForLevel) | そのLvで得るSP(spGainOnLevelUp) |`。式 `expToNext = round(EXP_CURVE_BASE × Lv^EXP_CURVE_POW)`（BASE/POW の値明記）、`spTotal = round(SP_PER_LEVEL × (Lv-1))`（SP_PER_LEVEL 明記）も併記。
4. **適正レベル/ティア（APPROPRIATE）**: ボス階ごとの (lv, tier) 表。
5. **ダメージ式の係数**: DAMAGE_DEF_K, CRIT_MULT, WEAK_MULT, RESIST_MULT, BACK_ROW_MELEE_MULT, DMG_VARIANCE。
6. **命中・クリティカル**: BASE_HIT, HIT_AGI_K, HIT_MIN, BLIND_ACC_PENALTY, CRIT_BASE, CRIT_LUC_K, CRIT_MIN, CRIT_MAX。
7. **状態異常・TP回復・ユニオン・回復係数など**: AILMENT_LUC_K, AILMENT_MAX, PARALYSIS_SKIP, POISON_HP_RATIO, TP_REGEN_RATIO, UNION_GAIN_PER_ACTION, UNION_GAIN_ON_WIN, FARM_EXP_DECAY_PER_BAND, ENEMY_ATTACK_POWER, HEAL_MATK_COEF_ONE/ALL/MINOR, SURPLUS_SP_PER_STAT。
8. **敵スケール**: `enemyScale(depth, refDepth) = 1 + ENEMY_SCALE_K × (depth - refDepth)`、代表値（例 refDepth=10 に対し depth=10/30/50/80/110 の係数）。
9. **鍛冶（FORGE）**: MAX_LEVEL, STAT_PER_LEVEL, TIER_STEP, INGOT_INC, FRAGMENTS_PER_INGOT。
10. **解放・コスト**: UNLOCK.TITLE_DEPTH, UNLOCK.REBIRTH_MIN_LEVEL, CLASS_CHANGE_LEVEL_PENALTY, TITLE_BONUS_SP。
11. **初期値**: STARTING_GOLD, GUILD_MEMBER_LIMIT, PARTY_MAX。
12. **転生（REBIRTH）**: 仕様（Lv100到達時のみ・Lv1再スタート・累積・種族配分）、STAT_TOTAL, BONUS_SP、配分式、そして **全種族 × 全ステの「1回あたり配分」表**（`rebirthStatBonusForRace` を全種族について呼び、`| 種族 | HP | TP | STR | VIT | AGI | INT | MND | LUC | 合計 |`）。

### 2.4 README 追記

`strategy-docs/README.md`（手書き）に `balance.md` へのリンク・一文を追記（バランス定数の一覧である旨）。生成器の対象外なので手で編集。

---

## 3. 検証・生成・ビルド手順（実装担当が完了前に必ず緑にする）

1. `yarn test`（vitest）— 全緑。特に `charProgress.test.ts`, `balanceSim.test.ts`, `ailmentResist.test.ts` が通ること。
2. `yarn lint` — 緑。
3. `yarn tsc -b` — 型エラーなし（`RebirthBonus` 変更の波及をすべて解消）。
4. `yarn gen:docs` — strategy-docs を再生成（races.md/classes.md/titles.md/balance.md ほか）。生成物の差分を確認（balance.md が新規作成され、スキルが全レベル表記、ドーム反映）。
5. README.md に balance.md リンク追記（手動）。
6. **build は実装担当はやらない**（ディレクターがまとめて実施）。

完了時: 触ったファイルを `git add` し、commit して **commit SHA を報告**（push しない）。各検証コマンドの結果（pass/fail と件数）も日本語で報告。

---

## 4. 触ってよいファイル

- `src/data/balance.ts`（REBIRTH 定数追加、UNLOCK.REBIRTH_MIN_LEVEL=100）
- `src/domain/types.ts`（RebirthBonus）
- `src/domain/charProgress.ts`（rebirthStatBonusForRace 新設、reincarnate/canReincarnate 改修、REBIRTH_TABLE/lookupRebirthBonus 削除）
- `src/domain/stats.ts`（computeBaseStats）
- `src/domain/saveData.ts`（CURRENT_SCHEMA_VERSION=3）
- `src/store/saveSerialization.ts`（migrateV2toV3 追加）
- `src/pages/guild-char/index.tsx`（UI: 開始Lv1・ボーナスプレビュー）
- `src/domain/charProgress.test.ts`（テスト書き換え）
- `src/data/strategyDocsGen.test.ts`（全レベル化・raceRole・balance.md 生成）
- `strategy-docs/README.md`（balance.md リンク追記）
- 生成物 `strategy-docs/*.md`（`yarn gen:docs` の出力。手書き編集はしない）

**触ってはいけない**: 上記以外の `src/` ファイル、`docs/`（ビルド成果物。ディレクターが対応）、`package.json`。

---

## 5. 重要な注意

- **自分で Edit/Write/Bash を使って実装すること。さらにサブエージェント（Agent/Task）を spawn しないこと。**
- 配分式・定数・型は本書のとおりに。数値を勝手に変えない。
- 既存セーブ互換（v2→v3 マイグレーション）を必ず実装。新形式キャラ（stats を持つ）には二重適用しないこと。
- `RebirthBonus.stats` は `Partial<Record<StatKey, number>>`。未指定ステは 0 として扱う（computeBaseStats / UI とも）。
