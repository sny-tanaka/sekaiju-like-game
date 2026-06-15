# セッション引き継ぎメモ（次のセッションはこれを読んでから作業する）

> このファイルは「別セッションが作業を引き継ぐ」ための申し送りです。最新状況に合わせて更新すること。

## いま依頼されているタスク（最優先）

なし（直近タスク = Phase 6-2b は完了。下記「完了済み」参照）。次は 6-3（敵・装備・アイテムの帯拡充）・6-4（バランス調整）。

### 完了済み: Phase 6-2b「スキル類型のエンジン拡張＋ロスター拡充」（本家参考）

- ユーザー決定: ロスター方針は「**本家『世界樹の迷宮V』を参考に拡充**」（固有名詞は本作オリジナル維持／役割の幅・スキル類型を参考）。
  - atwiki（https://w.atwiki.jp/sekaiju_mazev/pages/1.html）はネットワーク Full なら **ブラウザ風 User-Agent の curl で 200 取得可**（既定 UA だと Cloudflare が 403）。本家は 4 種族 10 職業構成。
- 実装:
  - **エンジン拡張**: パッシブ常時倍率（武器マスタリー/各種ブースト/最大HP・TP・クリ率。`data/passives.ts`＋`domain/passives.ts`、`combat.ts` の deriveCombat に乗算）、連携追撃(chase)・反撃(counter)・挑発(decoy)・障壁(barrier)・状態異常治療(cleanse) を `SkillEffectDef` と `Combatant.states` で実装（`battle.ts`）。反応は「行動×対象」単位で1回（多段ヒットでの過剰発動を防止）。
  - **データ**: 8→9職業（`class_summoner` 降霊術士を追加）、各職ツリーを厚く（マスタリー/ブースト/反応系）、全称号(title)に第2スキルツリーの代表スキル、6種族に種族パッシブ、召喚体2種（`summon_wraith`/`summon_revenant`）。
- 既知の積み残し（次フェーズ向け）:
  - **味方単体対象スキル（allyOne）の対象選択 UI が未実装**。`skill_heal`/`skill_first_aid` 等は現状「発動者自身」に固定（`pages/battle/index.tsx` の handleResolve が常に敵 targetId を渡すため）。党全体支援は allyAll 化して機能させているが、単体対象を任意の味方に向ける UI は別タスク。
  - 全体睡眠/デバフ係数の精密調整・pdef バフ重ねの扱い（6-4）。

## プロジェクト現状（2026-06 時点）

- ブランチ運用: 各フェーズ `claude/phase-N-...` を作り、`develop` に PR。レビュー専用エージェントで品質確認 → 指摘反映 → build → PR。
- 進捗: Phase 0〜5、6-1 はマージ済み。**Phase 6-2（種族/職業/スキル拡充）= この PR で進行中**。残り 6-3（敵・装備・アイテムの帯拡充）・6-4（バランス調整）。
- ロードマップ詳細は `design-docs/README.md` を参照。
- マスターデータは `src/data/`（races/classes/titles/skills/battleSkills/unionSkills/enemies/equipment/items/gather/recipes/summons）。整合は `src/data/validateMasters.ts` が検証。

## 作業規約（CLAUDE.md より要点）

- React で完結（API サーバ無し）。永続化は IndexedDB/localStorage。スマホ前提・データ駆動。
- 難易度は「少しハード」。レベリング/装備なしでスムーズに進める調整は NG。
- 実装後はレビュー用エージェントを起動して品質担保。
- 見た目はヘッドレス Chrome でスクショ（**必ず Noto Sans JP**。`dev-docs/screenshot-setup.md` 参照）。画像はリポジトリに保存しない。
- tsc -b / eslint / vitest / build を通す。コミットメッセージ末尾に Claude Code のセッション URL を付ける運用。
- 判断に迷う場合はユーザーにヒアリング（「こうしたらどうか」と提案する形）。
