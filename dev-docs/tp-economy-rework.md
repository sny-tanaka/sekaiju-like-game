# TP経済リバランス 第2弾 実装仕様（確定）— issue #57

ディレクターが balanceSim を回して確定した数値・方針。実装担当（sonnet）は本書のとおりに実装する。
**新たな判断・数値の発明は禁止。** すべて日本語で報告。孫エージェント禁止。
対象ブランチ: `feat/tp-economy-rework`（作業中）。

> 注意: 本ブランチには既に多くの変更が入っている（消費TPモデル実装、自然回復廃止、割合ハーブ、balanceSim のアイテム補給AI＋先行補給AI、F30 個別調整など）。本書は「最終確定状態」を定義する。現状と差分がある箇所を整える。

---

## 1. 確定済み（実装済み・変更しない）
- 消費TPモデル `computeSkillTpCost`（`src/domain/skillCost.ts`）＝効果別TP価値の合算。係数 `SKILL_TP`（`balance.ts`）: **Kd=2.83 / Pd=2.5**、他は導入時の初期値。`AILMENT_SEVERITY` も既定。
- 戦闘中の **TP自然回復は廃止**（`battle.ts` のターン終了回復削除、`balance.ts` の `TP_REGEN_RATIO` 削除）。
- `RebirthBonus`/転生・隊列・種族は第1弾までで確定済み。触らない。
- `restoreTp` 効果に `ratio?` 追加済み（`types.ts`）。アイテムの restoreTp は `ratio` があれば `maxTp*ratio` 回復（`battle.ts`）。
- F30 ボス `enemy_t2_boss_frost_monarch` を **str140→98（hp28000 は据え置き＝攻撃力のみ低下）** に個別調整済み（氷弱点タンク＋消費TP経済で勝てないため。例外調整。Lv+5・割合0.3で約26ターン勝利）。

## 2. 実装する: TP回復アイテムを3種＋所持上限に
HP回復アイテムにも所持上限を付ける。**効果が高いほど上限を少なく**（無限回復防止）。

### `types.ts`: `ItemMaster` に `maxStack?: number` を追加（未指定は上限なし＝素材等）。

### `items.ts`: TP回復アイテムを3種に
- `item_tp_herb`「まほうのは」: `restoreTp ratio:0.1`, buyPrice 20, **maxStack 30**, description「TP を最大値の10%回復する。」
- 新規 `item_tp_herb_mid`「よいまほうのは」: `restoreTp ratio:0.2`, buyPrice 60, **maxStack 15**, useContext ['battle','field']
- 新規 `item_tp_herb_hi`「とくぶつまほうのは」: `restoreTp ratio:0.3`, buyPrice 140, **maxStack 8**, useContext ['battle','field']
- restoreTp effect は `amount: () => 0` でよい（ratio 使用時は amount 不参照）。型のため amount は残す。
- HP回復にも上限: `item_potion`「やくそう」maxStack 30 / `item_hi_potion`「よいやくそう」maxStack 15。
- `ItemId` 型に新2種を追加（`types.ts` の ItemId union）。

### `inventory.ts`: `addItem` で maxStack を超えて増えないようにする
- 該当アイテムの `ITEMS[id].maxStack` があれば、所持数がそれを超えないようにクランプ（超過分は加算しない）。`removeItem` は変更不要。
- ショップ購入（`shop.ts` 等）でも maxStack を超える購入を禁止（購入数 or 在庫の判定に maxStack を反映。可能な範囲で。最低限 addItem 側で弾く）。

### ショップ在庫（`shopStock` / shop データ）
- 新2種（よいまほうのは・とくぶつまほうのは）をショップに並べる（既存の item_tp_herb と同じ並び/解禁基準に追加）。既存の在庫定義箇所に追加。

### UI
- インベントリ/ショップで所持数が maxStack に達したら、それ以上買えない/持てないことが分かるようにする（最小限でよい。addItem が弾くのでデータは安全）。

## 3. 実装する: balanceSim を確定形に整える（`balanceSim.test.ts`）
現状の実験用注入を、以下の確定形にする:
- `ENEMY_HP_MULT`（env EHP 係数）と `[BOSS]` の `console.log` を**削除**。`buildEnemyCombatant` の hp/maxHp は `stats.hp` に戻す。
- `SIM_LEVEL_MARGIN` を env でなく **定数 5** にする（適正Lv+5 で挑む想定＝レベリング前提）。コメントで理由を明記。ボスのパーティは `buildParty(app.lv + SIM_LEVEL_MARGIN, app.tier)`。
- `HERB_PER_CHAR = 8`（各キャラの「とくぶつまほうのは(30%)」持ち込み想定）。`tryUseHerb` が使うアイテムは `item_tp_herb_hi`（30%）に。
- 先行補給AI（主力1.5回ぶんを切ったら補給／回復役は余裕ターンに先行補給）は維持。
- shield は `race_golan`（ドーム）のまま。
- `skillTpCost` は `computeSkillTpCost(BATTLE_SKILLS[id], lv)` ベース（実装済み）。

### AC 基準を新TP経済向けに更新（重要）
旧「18〜22ターン・最低HP率≤15%」は廃止し、以下に書き換える:
- **AC1（ボス）**: 全5ボスで `win===true` かつ `turns <= 40`、`minPartyHpRatio > 0`（全滅でない）。`maxMinHp` 等の最低HP率上限は撤廃。コメントに「自然回復廃止＋消費TP経済では適正Lv+5・TP回復アイテム前提で勝利できることを保証する基準」と明記。
- **AC2（雑魚）/AC3（FOE）**: まず実測し、新経済で `win===true` になるよう、ターン上限を現実に合わせて緩める（雑魚は適正Lv、FOEは中間Lv＋SIM_LEVEL_MARGIN を付けてよい）。**具体的なターン上限は実装担当が balanceSim を実測し、勝利する範囲で妥当な上限（例: 雑魚 ≤8、FOE ≤20 など実測+余裕）に設定し、設定値と実測値を報告**すること。
- **AC5（EXP進行）**: EXP 曲線は不変なので原則そのまま。落ちる場合のみ報告。

## 4. strategy-docs（`strategyDocsGen.test.ts` → balance.md）
balance.md に以下を追記:
- **消費TP算定式**: `消費TP = max(1, round(Σ 各効果のTP価値)) `、効果別式（damage: `Kd*(威力*ヒット)^Pd`、heal/ailment/buff/… 各式）、係数 `SKILL_TP`（Kd=2.83/Pd=2.5 ほか）、`AILMENT_SEVERITY`、対象範囲倍率（単体1.0/列1.5/全体2.0）。
- **TP管理**: 戦闘中の自然回復なし。TP回復アイテム3種（10/20/30%・所持上限30/15/8）。
- 既存のスキル表（TP列＝computeSkillTpCost 全レベル）は再生成で反映。

## 5. 検証・完了
1. `yarn test` 全緑（balanceSim 含む。AC1〜5 が新基準で緑）。
2. `yarn lint` / `yarn tsc -b` 緑。
3. `yarn gen:docs`（balance.md 更新）。
4. `skillCost.test.ts` は既存維持＋必要なら ratio アイテムのテスト追加。
5. build はしない（ディレクターが実施）。

完了後、変更を `git add`（dev-docs 含む）、`git commit -m "feat(tp): TP経済リバランス第2弾（消費TP威力ベース・自然回復廃止・TP回復アイテム3種＋上限・F30調整） (#57)"`。**commit SHA・各検証結果・AC1〜AC3の各ケースの実測（ターン/勝敗）・設定したAC上限値**を日本語で報告。

## 6. 触ってよいファイル
types.ts / items.ts / inventory.ts / shop データ（shopStock 定義）/ 関連UI（src/pages のショップ・インベントリ）/ balanceSim.test.ts / strategyDocsGen.test.ts / skillCost.test.ts / dev-docs。
（消費TPモデル・自然回復・F30・enemies の他の敵・種族/転生/隊列には触らない。）
