import type { SummonKind, SummonMaster } from '@/domain/types';

// ============================================================================
// 召喚体マスター（[03 §8]）。設置物／使い魔の素ステータスと挙動。
// 召喚体は最前列の壁／攻撃役。敵と同じ enemyScale で出現階にスケールする。
// ============================================================================

export const SUMMONS: Record<SummonKind, SummonMaster> = {
  // 狼（狩人）: 自律して敵を貫通攻撃する攻撃役。戦闘終了で消える。
  summon_wolf: {
    id: 'summon_wolf',
    name: '召喚獣・狼',
    baseStats: { hp: 45, tp: 0, str: 12, vit: 6, agi: 14, int: 4, mnd: 4, luc: 6 },
    refDepth: 1,
    attackElement: 'pierce',
    actsOnTurn: true,
    buffImmune: false,
    persistsAfterBattle: false,
    persistsOutOfDungeon: false,
  },
  // 守りの石像（守護兵）: 攻撃せず、敵の攻撃を引き受ける高耐久の壁。戦闘終了で消える。
  summon_bulwark: {
    id: 'summon_bulwark',
    name: '守りの石像',
    baseStats: { hp: 110, tp: 0, str: 4, vit: 16, agi: 2, int: 2, mnd: 10, luc: 2 },
    refDepth: 1,
    attackElement: 'bash',
    actsOnTurn: false,
    buffImmune: true,
    persistsAfterBattle: false,
    persistsOutOfDungeon: false,
  },
  // 使い魔（魔導士）: 戦闘をまたいで残る自律攻撃の小型獣。拠点帰還で消える。
  summon_familiar: {
    id: 'summon_familiar',
    name: '使い魔',
    baseStats: { hp: 35, tp: 0, str: 7, vit: 5, agi: 12, int: 9, mnd: 6, luc: 7 },
    refDepth: 1,
    attackElement: 'bash',
    actsOnTurn: true,
    buffImmune: false,
    persistsAfterBattle: true,
    persistsOutOfDungeon: false,
  },
};
