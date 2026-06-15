# Phase 6-4 バランス調整・総合リバランス 実装設計書

> 本書は Phase 6-4（[design-docs/06 §9](../design-docs/06-tower-progression.md)）の**実装指示書**です。
> 実装者（sonnet サブエージェント）は**本書の数値・式・手順をそのまま適用**してください。
> 「判断」を要する箇所は残していません。数値の最終収束が必要な箇所は **§13 の受け入れシミュレーション**を
> 唯一の真実として、指定の手順で機械的に追い込みます。

## 0. 目的・受け入れ基準（プロデューサー合意済み）

本フェーズは「戦闘・進行系の総合リバランス」です。以下を**全て**満たすこと。

| # | 基準 | 検証 |
| --- | --- | --- |
| AC1 | ボス戦は**適正レベル/ティア**で **18〜22ターン**で決着し、回復管理を誤ると**全滅しうる**（最低パーティHP ≤ 15%） | §13 sim `boss` |
| AC2a | **格下状態の雑魚**（前帯ボスを倒して入帯した直後＝その帯では適正未満のLv）は **3〜5ターン**（1〜3体エンカ想定）。AoE で複数同時処理する戦術は有効 | §13 sim `zako_under` |
| AC2b | **同帯の雑魚を、その帯のボス適正Lvまで上げた状態**で **1〜2ターン**で倒せる（＝「雑魚を一掃できたらボス挑戦の合図」というプレイヤー向けシグナル）。AC2a と**同一のHP値**で両立する（レベル差ぶんのDPS成長で 3-5t→1-2t に橋渡し） | §13 sim `zako_ready` |
| AC3 | FOE は雑魚＜FOE＜ボス。同帯適正Lvで**単体 6〜10ターン**、被ダメは雑魚の約1.3〜1.6倍。激昂・専用大技は持たない | §13 sim `foe` |
| AC4 | **全ての敵**が通常攻撃以外のスキルを**条件付き**で使う。ボスは強力な専用技＋全体バフ＋HP50%以下の激昂を持つ | §3-§4・テスト |
| AC5 | EXP は「中間階を一通り踏破した自然進行で適正Lvの**7〜8割**」に届き、残り **3〜5Lv** を意図的グラインドで埋める | §13 sim `exp` |
| AC6 | 回復・TP・装備・鍛冶が進行でスケールする（味方フルリバランス） | §7 |
| AC7 | 逃走率・ドロップ率・ゴールド・下層ファーム減衰・SP余剰が仕様通り | §8-§10 |
| AC8 | `yarn test` 緑・`yarn lint` 緑・strategy-docs / design-docs 同期 | §11-§12 |

### 設計哲学（数値の意図）

- **戦闘を長く・重く**する主レバーは「敵HPの増加（AC1/2/3 の必要HPに合わせる）」＋「TP経済の引き締め（味方の持続火力を自然に抑制）」。**ダメージ式の素の係数（patk=STR×2 等）は変えない**（種族間バランス・ビルド個性を保つため）。
- **回復は魔力連動**にして進行でスケールさせる（現状は固定値で深層が成立しない＝最重要フィックス）。
- **深層攻略の主役は装備＋鍛冶＋転生＋ビルド**（[06 §9-2]）。レベル上限100は F100 でちょうど到達し、それ以深は装備ティア循環(LvN)・鍛冶・転生で挑む。

---

## 1. バランス定数（`src/data/balance.ts`）

`BALANCE` を以下に更新する。**追加・変更行のみ記載**。他は据え置き。

```ts
export const BALANCE = {
  LEVEL_CAP: 100,
  BOSS_INTERVAL: 10,
  BAND_SIZE: 10,
  ENEMY_SCALE_K: 0.05,          // 0.06 → 0.05（帯内・深層の伸びを緩やかに）
  // 経験値（§6 で再校正）
  EXP_CURVE_BASE: 14,           // 20 → 14
  EXP_CURVE_POW: 1.52,          // 1.6 → 1.52
  SP_PER_LEVEL: 1.62,           // 据え置き
  // ダメージ
  DAMAGE_DEF_K: 120,            // 100 → 120
  CRIT_MULT: 1.5, WEAK_MULT: 1.5, RESIST_MULT: 0.5,
  BACK_ROW_MELEE_MULT: 0.7,
  DMG_VARIANCE: [0.95, 1.05] as const,
  BASE_HIT: 0.9, HIT_AGI_K: 0.01, HIT_MIN: 0.3, BLIND_ACC_PENALTY: 0.5,
  CRIT_BASE: 0.05, CRIT_LUC_K: 0.005, CRIT_MIN: 0.02, CRIT_MAX: 0.5,
  AILMENT_LUC_K: 0.01, AILMENT_MAX: 0.95, PARALYSIS_SKIP: 0.3, POISON_HP_RATIO: 0.05,
  TP_REGEN_RATIO: 0.04,         // 0.05 → 0.04（長期戦の消耗を効かせる）
  UNION_GAIN_PER_ACTION: [5, 15] as const, UNION_GAIN_ON_WIN: 15,
  FARM_EXP_DECAY_PER_BAND: 0.85,
  // ▼ 新規
  ENEMY_ATTACK_POWER: 1.0,      // 敵通常攻撃の倍率（脅威はスキルkitで出すため通常は1.0据え置き枠）
  HEAL_MATK_COEF_ONE: 0.70,     // 単体回復＝flat + casterMatk*coef（§7.4）
  HEAL_MATK_COEF_ALL: 0.45,     // 全体回復
  HEAL_MATK_COEF_MINOR: 0.30,   // 歌・救護等の軽回復
  SURPLUS_SP_PER_STAT: 4,       // 余剰SP 4 ごとに全ステ +1（§10）
  FORGE_TIER_STEP: 1.6,         // 鍛冶1段の上昇 = base * FORGE_TIER_STEP^tier（§7.5）
} as const;
```

派生ヘルパ（既存）はそのまま。`enemyScale` / `expToNext` / `isBossFloor` / `encounterTier` は式変更なし（定数のみ反映）。

---

## 2. 適正レベル・ティア スケジュール（正準表）

ボス階ごとの**適正Lv**と**想定装備ティア**。`src/data/balance.ts` に定数 `APPROPRIATE` として持たせ、受け入れシミュ・ドキュメントの基準にする（ゲームロジックは参照しないが、テストが参照する）。

```ts
// 各ボス階の (適正Lv, 想定装備ティア)。F60以降は敵が帯循環(LvN)するため、
// 装備も循環ティア(T = min(5, encounterTier+1)) を使う。Lvは上限100で頭打ち。
export const APPROPRIATE: Record<number, { lv: number; tier: number }> = {
  10: { lv: 12, tier: 1 }, 20: { lv: 23, tier: 2 }, 30: { lv: 35, tier: 3 },
  40: { lv: 47, tier: 4 }, 50: { lv: 60, tier: 5 }, 60: { lv: 72, tier: 5 },
  70: { lv: 83, tier: 5 }, 80: { lv: 92, tier: 5 }, 90: { lv: 98, tier: 5 },
  100: { lv: 100, tier: 5 },
};
```

- F100 でちょうど Lv100（上限）。それ以深は装備ティア循環(LvN)・鍛冶・転生・ビルドで挑む。
- FOE の適正Lvは「前後ボスの中間」。例: F16 FOE → (12+23)/2 ≈ 17。

---

## 3. 敵スキルAI（エンジン: `src/domain/types.ts` + `src/domain/battle.ts`）

### 3.1 型定義（`types.ts` に追加）

```ts
// 敵の1アクション。既存 SkillEffectDef[] を再利用（damage/aoe/多段/ailment/buff/debuff）。
export interface EnemyActionDef {
  id: string;
  name: string;
  element: Element;
  target: TargetType;          // 陣営相対。resolveTargets をそのまま再利用
                               //   enemyOne/enemyAll → 味方PTを攻撃 / self/allyAll → 自陣をバフ
  effects: SkillEffectDef[];
  weight: number;              // 条件を満たすアクション間の重み付き抽選値（>0）
  cond?: EnemyActionCond;
}
export interface EnemyActionCond {
  hpBelow?: number;   // 自HP割合がこの値以下で解禁（例 0.5）
  hpAbove?: number;   // 自HP割合がこの値以上で解禁
  cooldown?: number;  // 使用後この턴数は再使用不可（例 10）
  minTurn?: number;   // 戦闘開始から minTurn ターン目以降で解禁（1始まり）
  maxUses?: number;   // 1戦闘あたり使用回数上限
}

// EnemyMaster に追加（任意）。未指定の敵は kit から既定アクションを得る。
//   actions を直接持つ場合はそれを使い、無ければ ENEMY_KITS[kit] を使う。
//   どちらも無ければ従来通り通常攻撃のみ。
export interface EnemyMaster {
  // ...既存フィールド...
  kit?: string;                 // ENEMY_KITS のキー（§4）
  actions?: EnemyActionDef[];   // 個別指定（ボス用。kit より優先）
}
```

`Combatant`（戦闘ランタイム）に**永続化しない**ランタイム状態を追加:

```ts
// battle.ts 内の Combatant 構築時に付与。SaveData には出さない（戦闘中のみ）。
actionState?: Record<string, { lastUsedTurn: number; uses: number }>; // actionId 別
```

### 3.2 アクション選択アルゴリズム（`battle.ts`）

現状 `resolveTurn` の敵フェーズ（line ~758-822 の「敵AI: 通常攻撃」ブロック）を以下に置換する。
**乱数消費順を固定**（既存決定論テストを壊さないため、敵ごとに「①対象抽選 → ②アクション抽選 → ③効果適用」の順を厳守）。

```
function enemyActions(enemy): EnemyActionDef[]
  = enemy.actions ?? ENEMY_KITS[enemy.kit] ?? []   // 空なら通常攻撃のみ

各 enemy（aliveSide 'enemy'、AGI順は従来通り全体ソートに従う）について:
  1) 候補抽出: enemyActions の各 a で cond を全て満たすものだけ:
       hpBelow:  enemy.hp/maxHp <= hpBelow
       hpAbove:  enemy.hp/maxHp >= hpAbove
       cooldown: turn - (actionState[a.id]?.lastUsedTurn ?? -Infinity) >= cooldown
       minTurn:  turn >= minTurn
       maxUses:  (actionState[a.id]?.uses ?? 0) < maxUses
  2) 候補が空 → 通常攻撃（basicAttack）にフォールバック。
  3) 候補を weight で重み付き抽選（rng.next()）。「通常攻撃」も weight 付きの
     暗黙アクション（id='basic', weight=BASIC_WEIGHT）として常に候補に含める（§4 既定 BASIC_WEIGHT=10）。
  4) 選択アクションを適用:
       - basic → 既存 basicAttack（対象は pickByDecoy で抽選済みの1体）
       - それ以外 → targets = resolveTargets(state, enemy, a.target, decoyTargetId);
                    for effect of a.effects: applySkillEffect(state, enemy, effect, a.element, level=1, targets, rng);
                    actionState[a.id] = { lastUsedTurn: turn, uses: (uses??0)+1 };
  5) ダメージ系 effect 後は既存同様に triggerReactions を通す（applySkillEffect 内で処理済み）。
```

補足:
- `level=1` 固定（敵スキルは Lv 概念を持たない。威力は effects の power 関数に Lv1 を渡す）。
- `summon` 効果は既存実装で敵側は無効化済み（line 518）。敵 kit に summon は入れない。
- 対象抽選（decoyTargetId）は既存 `pickByDecoy([...summons, ...allies])` を毎ターン1回引き、単体系はそれを使う。AoE系は resolveTargets が全体を返す。
- `EnemyAttackPower`（BALANCE.ENEMY_ATTACK_POWER）は basicAttack の power に乗算（既定1.0＝無影響枠。将来微調整用）。

---

## 4. 敵アクション・ライブラリ＆キット（`src/data/enemySkills.ts` 新規）

共有アクションを定義し、アーキタイプ kit に束ねる。各敵は `kit` を1つ持つ（ボスは `actions` 直書き）。
**威力(power)は通常攻撃=1.0 基準の倍率**。`statBase` は物理='str' / 魔法='int'。

### 4.1 共有アクション（抜粋・全リストは実装時に本表通り作成）

```ts
export const BASIC_WEIGHT = 10; // 暗黙の通常攻撃の重み（全敵共通）

// ---- 雑魚向け（軽量・危険技なし） ----
ea_double_strike : { name:'二連撃', element:<敵の攻撃属性>, target:'enemyOne',
   effects:[{kind:'damage',statBase:'str',power:()=>0.7,hits:2}], weight:5, cond:{cooldown:3} }
ea_guard_up      : { name:'身構え', element:'almighty', target:'self',
   effects:[{kind:'buff',stat:'pdef',modifier:()=>1.3,turns:2,stackGroup:'defBuff'}], weight:3, cond:{cooldown:4} }
ea_weak_poison   : { name:'毒牙', element:<属性>, target:'enemyOne',
   effects:[{kind:'damage',statBase:'str',power:()=>0.8},
            {kind:'ailment',ailment:'poison',chance:()=>0.4,turns:3}], weight:4, cond:{cooldown:3} }
ea_screech       : { name:'威嚇', element:'almighty', target:'enemyAll',
   effects:[{kind:'buff',stat:'patk',modifier:()=>0.85,turns:2,stackGroup:'atkDebuff'}], weight:3, cond:{cooldown:4} }

// ---- FOE 向け（中量・強技1＋自己バフ、激昂なし） ----
ea_heavy_blow    : { name:'強打', element:<属性>, target:'enemyOne',
   effects:[{kind:'damage',statBase:'str',power:()=>1.6}], weight:5, cond:{cooldown:3} }
ea_sweep         : { name:'薙ぎ払い', element:<属性>, target:'enemyAll',
   effects:[{kind:'damage',statBase:'str',power:()=>0.9}], weight:4, cond:{cooldown:4} }
ea_war_roar      : { name:'戦吼', element:'almighty', target:'self',
   effects:[{kind:'buff',stat:'patk',modifier:()=>1.3,turns:3,stackGroup:'atkBuff'}], weight:3, cond:{cooldown:5} }
ea_bind_bite     : { name:'噛み砕き', element:<属性>, target:'enemyOne',
   effects:[{kind:'damage',statBase:'str',power:()=>1.0},
            {kind:'ailment',ailment:'armBind',chance:()=>0.4,turns:2}], weight:3, cond:{cooldown:4} }

// ---- ボス向け（強技・全体バフ・激昂） ----
eb_signature     : { name:'<ボス専用大技>', element:<属性>, target:'enemyOne',
   effects:[{kind:'damage',statBase:'str',power:()=>2.2}], weight:6, cond:{cooldown:4} }
eb_aoe           : { name:'<全体攻撃>', element:<属性>, target:'enemyAll',
   effects:[{kind:'damage',statBase:'str',power:()=>1.0}], weight:5, cond:{cooldown:3} }
eb_self_buff     : { name:'力を溜める', element:'almighty', target:'self',
   effects:[{kind:'buff',stat:'patk',modifier:()=>1.35,turns:3,stackGroup:'atkBuff'}], weight:4, cond:{cooldown:5,hpAbove:0.5} }
eb_def_buff      : { name:'守りを固める', element:'almighty', target:'self',
   effects:[{kind:'buff',stat:'pdef',modifier:()=>1.4,turns:3,stackGroup:'defBuff'}], weight:3, cond:{cooldown:6} }
eb_enrage_aoe    : { name:'激昂', element:<属性>, target:'enemyAll',
   effects:[{kind:'damage',statBase:'str',power:()=>1.4}], weight:8, cond:{hpBelow:0.5,cooldown:3} }
eb_status_aoe    : { name:'<状態異常AoE>', element:'almighty', target:'enemyAll',
   effects:[{kind:'ailment',ailment:<毒/麻痺/盲目>,chance:()=>0.4,turns:3}], weight:4, cond:{hpBelow:0.6,cooldown:5} }
```

> `<属性>` は敵の `attackElement`、`<状態異常>` は敵テーマに合わせる（氷ボス→麻痺、瘴気ボス→毒 等）。実装時に各敵の属性で具体化。

### 4.2 kit 割当（アーキタイプ）

`ENEMY_KITS: Record<string, EnemyActionDef[]>` を定義。各 EnemyMaster に下表の `kit` を付与。

| kit キー | 構成アクション | 適用対象 |
| --- | --- | --- |
| `zako_bruiser` | ea_double_strike + ea_guard_up | 物理寄り雑魚（獣・ゴーレム系） |
| `zako_venom` | ea_weak_poison + ea_screech | 蟲・毒・不死系雑魚 |
| `zako_caster` | ea_screech + ea_guard_up | 鳥・結晶・術者系雑魚 |
| `foe_heavy` | ea_heavy_blow + ea_war_roar + ea_bind_bite | 物理 FOE |
| `foe_striker` | ea_heavy_blow + ea_sweep | 機動 FOE |

割当ルール（実装時、各敵の見た目テーマで機械的に分類。迷ったら `zako_bruiser`）:
- 攻撃属性が斬/突/壊の獣・人型 → `zako_bruiser`
- 毒・不死・蟲テーマ（名前に蟲/毒/骸/亡/腐/疫/墓 を含む or drops に毒鱗/呪詛/灰塵）→ `zako_venom`
- 鳥・結晶・霊・タケ等の非接近テーマ → `zako_caster`
- FOE（kind==='foe'）→ 物理重量級は `foe_heavy`、AGI が同帯 FOE 中で最大の個体は `foe_striker`

### 4.3 ボス個別 actions（5体・直書き、属性は各ボスのテーマ）

各ボスは `actions` に **eb_signature + eb_aoe + eb_self_buff + eb_def_buff + eb_enrage_aoe + eb_status_aoe** を持たせる（属性/状態異常を下表で具体化）。weight/cond は §4.1 の通り。

| ボス | 攻撃属性 | signature 名 | 激昂AoE 属性 | status_aoe |
| --- | --- | --- | --- | --- |
| 門番のゴーレム(F10) | bash | 大地割り | bash | 麻痺 |
| 山嶺の大猿王(F20) | bash | 山嶺の一撃 | bash | 麻痺 |
| 氷晶の女王(F30) | bash | 絶対零度 | ice | 麻痺 |
| 雷霆の覇王(F40) | slash | 雷霆斬 | volt | 麻痺 |
| 瘴気を統べる腐王(F50) | bash | 瘴気爆発 | bash | 毒 |

> F60 以降のボスは帯循環でこの5体が再登場（`enemyScale` で強化、名に LvN）。actions はそのまま使い回す。

---

## 5. 敵ステータス（`src/data/enemies.ts`）

### 5.1 HP の再設定（AC1/2/3 を満たす）

**雑魚・FOE・ボスの `baseStats.hp` を下式で再設定**する。他ステ（str/vit/agi 等）は据え置き。
`refDepth` での値（＝表に書く baseStats.hp）を、§13 受け入れシミュが緑になるよう設定する。

**初期値（受け入れシミュの開始点。§13 手順で ±15% 調整して確定）:**

- **雑魚**: 現 `baseStats.hp` を **帯別倍率**で増やす（AC2a/2b 両立。§13 sim 検証済みの開始値）:

  | tier | 倍率 | 例 |
  | --- | --- | --- |
  | 0 (F1-10) | **×3.0** | スライム 18→54 |
  | 1 (F11-20) | **×10** | tier1 雑魚 ~50→~500 |
  | 2 (F21-30) | **×9** | tier2 雑魚 ~90→~810 |
  | 3 (F31-40) | **×7** | tier3 雑魚 ~150→~1050 |
  | 4 (F41-50) | **×4.5** | tier4 雑魚 ~264→~1190 |

  倍率が帯で逓減するのは、深い帯ほど現 baseStats.hp が大きく、パーティDPSとの比が縮むため（AC2a/2b 両立に必要な絶対HPが近づく）。tier5 以降は循環＝tier0-4 の値を `enemyScale` で伸ばすので追加倍率は不要。
  ※早期帯の雑魚が「格下時 3-5t」のため数百HPになるのは設計意図（一掃できれば 1-2t＝ボス適正の合図）。
- **FOE**: 現 `baseStats.hp` を **×3.0**（FOE は元々高HPのため倍率は控えめ。雑魚<FOE<ボスを維持）。
  例: しげみのオオツノジカ 58→174 / 腐肉の巨像 860→2580。
- **ボス**: 下表の固定値（§13 `boss` sim で 18〜22t を確認して確定）。

| ボス | 現HP | 新HP（初期値） |
| --- | --- | --- |
| 門番のゴーレム(F10) | 220 | **5200** |
| 山嶺の大猿王(F20) | 620 | **7000** |
| 氷晶の女王(F30) | 1300 | **8400** |
| 雷霆の覇王(F40) | 2500 | **8700** |
| 瘴気を統べる腐王(F50) | 4200 | **8800** |

> ボスHPがほぼ横ばいなのは、適正Lvでのパーティ持続DPS（与ダメ）が帯間でほぼ一定だから（除算型＋敵DEF増で相殺）。これは正しい。F60+ は `enemyScale` が HP も DPS も伸ばすので相対関係は保たれる（§13 で F100 まで検証）。

### 5.2 FOE の被ダメ強化

FOE は被ダメ目安「雑魚の1.3〜1.6倍」。HP×3 に加え、FOE の `baseStats.str` を **×1.2**（切り捨て）して攻撃力を底上げ。ボスの str は据え置き（HPで20t、kit で脅威）。

### 5.3 報酬（exp/gold）の再校正は §6・§8 で指定。

---

## 6. EXP ゲート（`balance.ts` + `enemies.ts`）

### 6.1 カーブ

`EXP_CURVE_BASE=14, EXP_CURVE_POW=1.52`（§1）。`expToNext(lv)=round(14*lv^1.52)`。

### 6.2 敵 exp の再設定

AC5（自然進行で適正の7〜8割＝中間9階を一通り踏破で約 +8Lv、残り3〜5Lv をグラインド）を満たすため、
**各敵の `exp` を下式で再設定**:

```
enemy.exp = round( K_EXP * expToNext(refDepthToLv(refDepth)) / 100 )
```

…ではなく、実装を単純化し**雑魚 exp を現値の ×8、FOE を ×8、ボスは ×6** に一律スケールして開始し、§13 `exp` sim で「自然 +7〜9Lv／残り3〜5Lv」になるよう **K を 1.0 起点に ±段階調整**する（手順は §13）。

- 開始値: 雑魚 exp ×8（例 6→48）、FOE ×8、ボス exp ×6。
- gold は exp と同様に **×3** で開始（経済は §8 で逃走/ドロップと併せて確認）。

> 注: 自然進行のエンカウント量は「中間9階 × 平均4エンカウント × 平均2体」を §13 の標準仮定とする（探索ゲージ・床サイズ由来の実測近似）。

---

## 7. 味方フルリバランス

### 7.1 種族成長テーブル（`src/data/races.ts`）

**骨格（種族個性・相対関係）は現状維持**。HP/TP の絶対量は戦闘モデル上ちょうど良い（§13 で検証済み）。
**変更なし**（ただし §7.4 の回復スケール化で薬師・ルーナの価値が進行で伸びる）。受け入れシミュが赤の場合のみ、
HP 成長を全種族一律 ×1.0〜×1.1 の範囲で微調整（手順 §13）。

### 7.2 装備ティア（`src/data/equipment.ts`）— §9-2「深層は装備主役」

武器 atk・防具 def を**ティアで明確な段差**を付ける。下式で**全装備を再設定**（同ティア内の相対差＝武器種の重み付けは現状維持）。

```
標準武器 atk(tier) = round(8 * 1.62^tier)        → T0:8 T1:13 T2:21 T3:34 T4:55 T5:89
標準重装 def(tier) = round(8 * 1.55^tier)        → T0:8 T1:12 T2:19 T3:30 T4:46 T5:72
```

- 各装備は「武器種/防具種の係数」を上式に乗じる（現データの相対比を維持）:
  - 武器: 斧 ×1.05 / 槍 ×1.0 / 剣 ×0.97 / 杖(mat) ×1.0 / 弓 ×0.9 / 拳 ×0.85
  - 防具: 重装 def×1.0,mdf×0.4 / 軽装 def×0.7,mdf×0.55 / 衣 def×0.4,mdf×0.95 / 装飾 def×0.25,mdf×0.25
- `buyPrice` は **tier ごとに ×2.2 で逓増**（T0 基準 100〜160 を維持し、T5 で約 6000〜9000）。
  `buyPrice(tier) ≈ round(基準価格 * 2.2^tier)`。売値は半額（既存 shop ロジック）。
- 結果の atk/def は **§13 boss/zako sim の「ティア T」入力と一致**させる（WATK/ARM 配列を本式に更新）。

### 7.3 鍛冶・強化（`src/data/balance.ts` FORGE + `src/domain/forge.ts`）— §9-2

`FORGE.MAX_LEVEL=5` 据え置き。**1段の上昇量をティア連動**にして深層で鍛冶が効くようにする:

```
強化 +1 あたりの上昇 = round(FORGE.STAT_PER_LEVEL * FORGE_TIER_STEP^equipTier)
   STAT_PER_LEVEL=2, FORGE_TIER_STEP=1.6 → T0:2 T1:3 T2:5 T3:8 T4:13 T5:21
   （武器は atk/mat、防具は def/mdf に適用。+5 で T5 は約 +105）
```

- インゴット強化量 `INGOT_INC`（copper/silver/gold = 1/3/5）据え置き。
- リサイクル断片 `RECYCLE_FRAGMENTS`：買値帯連動に（`max(2, floor(buyPrice/120))`）。

### 7.4 回復スキルの魔力連動化（最重要・`types.ts` + `battle.ts` + `battleSkills.ts`）

**回復量を「flat + 詠唱者 matk × coef」に変更**。`heal` 効果の適用を `applySkillEffect`（line 481-489）で改修:

```ts
// SkillEffectDef の heal を拡張:
| { kind: 'heal'; amount: (lv: number) => number;          // flat 基礎（低Lv保証）
                  matkCoef?: 'one' | 'all' | 'minor' }     // 魔力係数の種別（既定 'all'）

// applySkillEffect 'heal':
const flat = effect.amount(level);
const coef = effect.matkCoef === 'one' ? BALANCE.HEAL_MATK_COEF_ONE
           : effect.matkCoef === 'minor' ? BALANCE.HEAL_MATK_COEF_MINOR
           : BALANCE.HEAL_MATK_COEF_ALL;
const casterMatk = deriveCombat(actor.stats, actor.equip, actor.buffs, actor.passive).matk;
const heal = Math.round(flat + casterMatk * coef);
```

`battleSkills.ts` の回復スキルに `matkCoef` を付与:

| スキル | matkCoef | flat（既存 amount を縮小） |
| --- | --- | --- |
| ヒール / フルヒール (allyOne) | `one` | `20 + 5*lv` |
| マスヒール / パーティキュア / 蘇生の舞 (allyAll) | `all` | `10 + 3*lv` |
| 救護指示 / 癒しの歌 / 蘇生の光 | `minor` | `8 + 2*lv` |

- TP 回復(restoreTp)・障壁(barrier)はステ非連動のまま（amount 関数据え置き）。障壁 absorb は §7.4b で微増。
- **アイテムの回復**（ポーション等）はステ非連動のまま（固定値）。深層では割合回復アイテムを別途（§8 で任意）。

### 7.4b 障壁スケール

守護兵のバリア系（ラインガード等）absorb は `30 + 15*lv` → `flat(20+8*lv) + casterMnd*0.5`（同様に魔防連動）。
実装は heal と同経路の barrier 分岐に `mndCoef` を追加（任意・赤なら実施）。

### 7.5 スキル威力（攻撃）

**据え置き**（§13 のパーティDPSは現威力＋TP経済引き締めで AC を満たす）。TP_REGEN を 0.04 に下げる（§1）ことで長期戦の手数が自然に減り、持続火力が抑制される。個別スキルの power 改変は不要。

---

## 8. 逃走率・ドロップ率・ゴールド

### 8.1 逃走率（`src/domain/battle.ts` line ~733）

「少しハード」化。**ボスからは逃走不可、FOE は困難**:

```ts
// 基本式を厳しめに。敵種別で上限を変える。
let base = 0.4;                                  // 0.5 → 0.4
const diff = (avgAllyAgi - avgEnemyAgi) * 0.02;
let rate = clamp(base + diff, 0.05, 0.9);
// 敵に boss が含まれる → 逃走不可（rate=0）。FOE が含まれる → rate *= 0.5。
if (enemies.some(e => ENEMIES[e.enemyId]?.kind === 'boss')) rate = 0;
else if (enemies.some(e => ENEMIES[e.enemyId]?.kind === 'foe')) rate *= 0.5;
```

### 8.2 ドロップ率（`src/data/enemies.ts` drops[].rate）

素材経済（売却→装備解放）を保ちつつ「少しハード」。**レア度3段の正準値**に揃える:

| 素材区分 | rate | 適用 |
| --- | --- | --- |
| 一般素材（その敵の主素材） | **0.45** | 各敵の主ドロップ |
| 副次素材 | **0.30** | 2つ目以降 |
| ボス専用素材 | **1.0** | ボスのコア類（据え置き） |

- 現データの 0.5〜0.6 を 0.45 に、0.4〜0.45 を 0.30 に丸める（機械的置換）。ボスの 1.0 は据え置き。
- 周回 LvN のグレード／売却額ロジックは据え置き。

### 8.3 下層ファーム減衰（§9-7・`battleRewards`）

`battleRewards(state, deepestReached)` に拡張し、**EXP・gold に減衰**を適用（ドロップ率は据え置き＝素材周回は許容）:

```ts
const curBand = encounterTier(state.depth);
const deepBand = encounterTier(deepestReached);
const decay = Math.pow(BALANCE.FARM_EXP_DECAY_PER_BAND, Math.max(0, deepBand - curBand));
exp = round(master.exp * scale * decay);
gold = round(master.gold * scale * decay);
```

呼び出し側（`partyExpResults`/`applyBattleResult`）から `save.towerState.record.deepestReached` を渡す。

### 8.4 ゴールド経済

- 敵 gold ×3（§6）、装備 buyPrice はティア ×2.2 逓増（§7.2）。STARTING_GOLD=500 据え置き。
- §13 `exp` sim 内で「適正進行に必要な装備更新費 vs 取得 gold」が破綻しないことを確認（gold 取得 ≥ 1ティア更新費の概ね 1.5 倍）。

---

## 9.（欠番）

---

## 10. SP余剰 → 小ステ変換（§9-3・`charProgress.ts` or `stats.ts`）

全ツリー習得可能量を超える余剰SPを **4SPごと全ステ +1** に自動変換。`computeBaseStats`（`stats.ts`）に注入:

```ts
// skillTree.ts に追加:
export function maxAbsorbableSp(char): number {
  // skillNodesFor(char) の各ノード: skillSpCost(char, id) * node.maxLevel の総和
  //   − 開始スキルの無料 Lv1 ぶん（starterSkillId の 1Lv 分コスト）
}
export function surplusSp(char): number {
  return Math.max(0, char.skillPoints.total - maxAbsorbableSp(char));
}

// stats.ts computeBaseStats 内、各 stat に加算:
const surplusBonus = Math.floor(surplusSp(char) / BALANCE.SURPLUS_SP_PER_STAT);
result[key] = base + growth*steps + rebirthAll + surplusBonus;
```

- HP/TP も +1（rebirthBonus.allStats と同じ流儀）。UI 表示は既存ステ表示にそのまま乗る。
- 余剰が出るのは多重転生後の極端な終盤のみ（通常は 0＝無影響）。

---

## 11. テスト

1. **既存テストの更新**: `combat.test.ts`（DEF_K=120, scale 0.05）、`battle.test.ts`（敵スキルAI・回復スケール）、`boss.test.ts`、`charProgress.test.ts`（exp カーブ）、`shop.test.ts`（価格）、`lootGrade.test.ts`、`validateMasters.test.ts`、`strategyDocsGen.test.ts`。**期待値を新仕様に合わせて再計算**。
2. **新規テスト**:
   - `enemyAi.test.ts`: cond（hpBelow/cooldown/minTurn/maxUses）の解禁・封印、weight 抽選の決定論、basic フォールバック、敵 buff/AoE/ailment 適用。
   - `balanceSim.test.ts`: §13 の受け入れシミュを vitest 化し AC1-AC5 を assert（数値は許容レンジで）。
   - `forge.test.ts`: ティア連動の上昇量。
   - `surplusSp.test.ts`: maxAbsorbableSp / surplus 変換。
3. `yarn lint` 緑。

---

## 12. ドキュメント同期

- `design-docs/06-tower-progression.md`: §3.1 BALANCE ブロック（新定数）、§4（ボス kit・激昂）、§9 の未決事項（1-9）を「Phase 6-4 で確定」と追記し、確定値へ更新。
- `strategy-docs/README.md`: ダメージ式（DEF_K=120）、回復＝魔力連動、TP regen、逃走率、適正Lv表を反映。
- `strategy-docs/enemies.md`: 新HP・敵スキル節（kit/ボス actions）・ドロップ率を反映（`strategyDocsGen` が生成するなら再生成）。
- `strategy-docs/classes.md` / `titles.md`: 回復スキルの matk 連動・barrier スケールを反映。
- 新規 `strategy-docs/enemy-skills.md`（任意）: kit 一覧とボス行動表。

---

## 13. 受け入れシミュレーション（唯一の真実・数値確定手順）

`scripts/balanceSim.mjs`（または `balanceSim.test.ts`）として実装し、**実ロジック（`combat.ts`/`battleSkills.ts` の式）を import** して動かす。
ハードコード再実装ではなく、可能な限り本物の関数を呼ぶこと（パーティ自動編成 → 自動戦闘 → ターン数・勝敗・最低HP・到達Lv を測定）。

### 13.1 標準パーティ（自動編成）

適正 (lv, tier) で固定構成: 盾=ガロン守護兵 / 戦=ヒト戦士 / 拳=ゴラン拳聖 / 魔=ピクス魔導士 / 薬=ルーナ薬師。
各自テーマ装備（武器=職適性, 防具=役割: 盾重装/魔・薬は衣/戦・拳は軽〜重）。スキルは各職の主力 Lv4 を習得想定。
AI 方針: 薬は瀕死(<35%)に単体回復・2人以上が<70%で全体回復・他はDPS（TP>cost ならスキル, 無ければ通常）, 盾は挑発/通常。

### 13.2 判定（各ボス階 F10..F100 で実行）

- `boss`: AC1 … 18≤turns≤22 かつ win かつ minPartyHpRatio≤0.15。
- `zako_under`: AC2a … 帯の雑魚 1〜3 体を**前帯ボス適正Lv/ティア**（＝入帯直後・格下）で 3≤turns≤5。
- `zako_ready`: AC2b … **同一HPの**同帯雑魚を**その帯のボス適正Lv/ティア**で 1≤turns≤2。
  （両者は同じ `baseStats.hp` で成立させる。片方しか満たせない場合は §13.3 手順5' で帯倍率を再調整）
- `foe`: AC3 … 同帯 FOE 単体を 6≤turns≤10、被弾/turn が同帯雑魚の 1.3〜1.6 倍。
- `exp`: AC5 … 中間9階×4エンカ×2体の自然 exp で `(到達Lv − 開始Lv) ∈ [7,9]`、目標Lvまで残り ∈ [3,5]。

### 13.3 数値確定手順（機械的・判断不要）

各基準が外れたら以下の**単調パラメータ**を二分探索で調整（他は固定）。収束は各 ±2 反復で十分:

1. `boss` turns が大→`enemy.baseStats.hp`（ボス）を下げ、小→上げる（§5.1 表を更新）。15%超ずれは sim 再実行で再収束。
2. `boss` が win=false（全滅）→ ボスHPを下げる（turns 下限 18 を割らない範囲）。なお全滅が続く場合のみ `HEAL_MATK_COEF_ALL` を +0.05 刻みで上げる（上限 0.6）。
3. `zako_under`/`zako_ready`（帯別倍率を調整）:
   - まず `zako_under`（格下時 3-5t）を満たす倍率を二分探索（§5.1 帯倍率が起点）。
   - その倍率で `zako_ready`（ボス適正で 1-2t）を確認。両立すれば確定。
   - 5'）両立しない（ready が >2t など）場合のみ、その帯のボス適正Lvが低すぎる可能性 → §2 APPROPRIATE の bossLv を ±2 内で見直し再収束（DPS成長比を確保）。HP倍率だけで両立しない帯は本手順を最大2回。
4. `foe` turns/被弾→ FOE HP 倍率（×3起点）・str 倍率（×1.2起点）を調整。
5. `exp` 到達Lvが高→ 敵 exp 倍率を下げ（×8→×7…）、低→上げる。

全 AC が緑になったら、確定値を §1/§5/§6/§7 の表へ**書き戻して固定**し、`balanceSim.test.ts` をレンジ assert で恒久化する。

---

## 14. 実装順（サブエージェント分割）

1. **第1段（エンジン＋データ基盤）**: §1 定数 / §3 敵スキルAI 型・アルゴリズム / §4 enemySkills.ts・kit 割当・ボス actions / §7.4 回復スケール化 / §10 SP余剰 / §8.3 ファーム減衰。挙動テスト（enemyAi.test 等）緑。**この段ではバランス数値は初期値のまま**。
2. **第2段（数値収束＋経済＋ドキュメント）**: §13 受け入れシミュ実装→§5/§6/§7.2/§7.3/§8 の数値を手順で収束→確定値を書き戻し→§11 既存テスト更新→§12 ドキュメント同期。`yarn test`/`lint` 緑。

各段の完了後にディレクター（オーケストレータ）がレビューする。

---

## 15. 耐性システム（状態異常＋属性。敵・味方とも）

状態異常が「全部入る／全部効く」ハメゲーにならないよう、**全敵に状態異常耐性**を、**味方種族に状態異常・属性耐性**を持たせる。元素 `resist`（既存）と同形で per-type。`0 = 完全無効`。

### 15.1 型（`types.ts`）

```ts
// EnemyMaster に追加
ailmentResist?: Partial<Record<AilmentType, number>>; // 種類別の付与率倍率。0=無効。未指定は種別デフォルト
// RaceMaster に追加
elementResist?: Partial<Record<Element, number>>;     // 属性被ダメ倍率（敵 resist と同形）。未指定=1.0
ailmentResist?: Partial<Record<AilmentType, number>>; // 状態異常付与率倍率。未指定=1.0
// Combatant に追加（戦闘時に解決して載せる。永続化しない）
ailmentResist?: Partial<Record<AilmentType, number>>; // 解決済み（敵=系統+種別デフォルト / 味方=種族）
// ※ 属性は既存 Combatant.resist を流用。味方 Combatant にも race.elementResist を載せる。
```

### 15.2 エンジン

- **状態異常**: `ailmentChance(base, attacker, defender, type)` に `type` を渡し、`× (defender.ailmentResist?.[type] ?? 1)` を乗算（既存の LUC 補正・上限0.95はそのまま、ただし `0` なら 0 を返す＝無効）。`applySkillEffect` の ailment 分岐で type を渡す。
- **属性（味方の被弾）**: 既存 `elementMult(target, element) = target.resist?.[element] ?? 1` がそのまま効くよう、**味方 Combatant 構築時に `resist = RACES[raceId].elementResist` を載せる**（現状は敵のみ）。
- **Combatant.ailmentResist 解決**: 敵 Combatant 構築時 = `{...KIND_DEFAULT[kind], ...ENEMY_ARCHETYPE[archetype], ...master.ailmentResist}`（後優先）。味方 Combatant 構築時 = `RACES[raceId].ailmentResist`。
- **毒**: `POISON_HP_RATIO` を `0.05 → 0.03` に（割合処刑の防止。`balance.ts`）。

### 15.3 種別デフォルト（敵・明示が無い状態異常に適用）

```ts
const AILMENT_KIND_DEFAULT = { zako: 0.7, foe: 0.5, boss: 0.35 };
```

### 15.4 敵の系統別プロファイル（名前/ID キーワードで機械分類。優先順: 機械>霊体>不死>植物>スライム>蟲>鳥>獣）

`ENEMY_ARCHETYPE_RESIST: Record<string, Partial<Record<AilmentType, number>>>` を定義し、各敵を1系統に分類して付与（kind デフォルトに上書き合成）。

| 系統 | キーワード | 無効(0) | 耐性(0.5) | 弱点(1.3) |
| --- | --- | --- | --- | --- |
| construct(機械/構造) | ゴーレム,哨戒機,自動兵器,番犬,歯車,装甲,結晶,クリスタル,タイデン,ホウデン | poison, sleep | paralysis | — |
| spirit(霊体) | 鬼火,亡霊,残り火,コオリビ,イカズチビ | armBind, headBind, legBind, poison | — | sleep |
| undead(不死/瘴気) | 骸骨,怨霊,呪詛,墓守,腐肉,疫病,這い虫,亡者 | poison, sleep | — | — |
| plant(植物/菌) | タケ,樹人 | poison, blind | — | — |
| slime | スライム | armBind, legBind | — | paralysis |
| insect(蟲) | ムシ,ヤスデ,ガニ,ガマ,毒蛾 | — | poison | paralysis |
| bird(鳥/飛行) | タカ,チョウ,ワシ,フクロウ | legBind | — | — |
| beast(獣/人型/その他) | 上記以外 | — | — | （種別デフォルトのみ） |

ボス個別（系統＋）: 門番ゴーレム=construct / 氷晶の女王=poison・sleep無効,paralysis耐性 / 雷霆の覇王=paralysis・sleep無効 / 瘴気を統べる腐王=poison・sleep無効 / 山嶺の大猿王=sleep無効。

### 15.5 味方 種族別プロファイル（`races.ts`）

| 種族 | elementResist | ailmentResist |
| --- | --- | --- |
| ヒト | （なし） | （なし） |
| ガロン | bash 0.8 / fire 1.2 | poison 0.4, legBind 0.7 / paralysis 1.2 |
| ピクス | fire/ice/volt 0.85 / slash/pierce/bash 1.2 | blind 0.5, headBind 0.6 / armBind 1.3, sleep 1.2 |
| テリアン | ice 1.2 | legBind 0.4, blind 0.5 / sleep 1.2 |
| ルーナ | ice 0.8 / fire 1.2 | sleep 0.4, headBind 0.5 / poison 1.2 |
| ゴラン | slash/pierce/bash 0.8 / ice 1.2 | poison 0.3, paralysis 0.5 / blind 1.2 |

> 値は ±20% 以内中心。追加後に §13/§17 の sim を再実行し AC がずれたら機械調整。

### 15.6 敵側の部位封じ制約（味方と対称化・`battle.ts`）

敵スキルAIの**候補抽出段で部位封じを反映**（現状は armBind で全行動スキップ＝過剰、headBind 未チェック＝抜け）:
- `armBound`: 通常攻撃＋**物理(str ダメージ effect を含む)**アクションを候補から除外（バフ/魔法/状態異常=頭系は使用可）。
- `headBound`: **頭系（str ダメージを含まない: 魔法/バフ/状態異常/回復）**アクションを候補から除外（物理攻撃は使用可）。
- 候補が空なら「封じられて動けない」。判定は味方の `skillUsesArm` 相当（effect に str ダメージを含むか）で行う。

---

## 16. 耐性の可視化（UI。隠しパラメータにしない）

プレイヤーが耐性を理解できるよう**ゲーム内に表示**する。

- **敵の耐性** → **図鑑（codex/Bestiary）の敵詳細**に「属性（弱点/耐性/無効）」「状態異常（効きやすい/耐性/無効）」を表示。図鑑は遭遇/撃破で情報が解放される既存挙動に乗せる（`src/domain/codex.ts` の seen/defeated を解放条件に流用）。加えて**戦闘中の敵情報パネル**（敵を選択/タップ時）に同要約をコンパクト表示。
  - 表記: 弱点=「弱」/耐性(0.5)=「半」/無効(0)=「無」/通常=表示省略。状態異常は per-type に「効きやすい(>1)/効きにくい(<1)/無効(0)」をアイコン or ラベルで。
- **味方の種族耐性** → **キャラのステータス詳細画面**に「属性耐性」「状態異常耐性」セクションを追加（種族由来。弱点/耐性/無効を同記法で）。
- 既存のステータス/図鑑コンポーネントに節を追加する形で実装（新規ページは作らない）。Storybook 確認を推奨（CLAUDE.md）。

---

## 17. ボスHP最終調整（AC1 達成）と忠実シミュレーション

§13 の簡易 sim はパーティの **TP 枯渇による火力減衰・全体AoEによる強制回復・状態異常での行動ロス**を再現せず、DPS を過大評価して「ボス6〜9ターン」と出た（実際は上記要因で延びる）。AC1（18〜22ターン）達成のため:

1. **忠実シミュへ改修**: `scripts/balanceSim.mjs` / `balanceSim.test.ts` を、可能な限り**実 `resolveTurn` を駆動**する方式に作り替える（BattleState を構築し、毎ターン味方コマンドをスクリプトAIで生成＝薬師は HP 閾値で回復・DPS は TP≥コストでスキル/不足で通常・盾は挑発、を実コマンドで投入し、決着までループ）。TP・回復・状態異常・敵 kit が実挙動で効く。
2. **ボスHPを再収束**: 忠実 sim で各ボスを **18〜22ターン・必勝・最低パーティHP≤15%** に。ディレクター事前推定（TP/回復考慮）では現値の約 **×1.6〜1.9**（目安: F10≈8500 / F20≈12000 / F30≈14000 / F40≈15000 / F50≈17000）。最終値は忠実 sim で確定し `enemies.ts` と本書 §5.1 に書き戻す。**スキル威力の引き下げはしない**（ボスHPで吸収）。
3. **AC5 微調整**: 残りグラインドが 2Lv（目標3〜5）なので、対象帯の敵 exp を約 1〜2割下げて残り 3〜5Lv に。
4. §15 の耐性追加後に sim を再実行し、全 AC を満たすことを確認。`balanceSim.test.ts` を**実目標レンジ（18〜22t 等）で恒久化**（Wave2 が緩めた基準を本来値へ）。
