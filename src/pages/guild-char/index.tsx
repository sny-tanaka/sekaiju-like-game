import { useState } from 'react';

import styles from './style.module.scss';

import { useSfx } from '@/audio/useSfx';
import { CharacterPortrait } from '@/components/common/CharacterPortrait/CharacterPortrait';
import { ItemSprite } from '@/components/common/ItemSprite/ItemSprite';
import { ResistBadges } from '@/components/common/ResistBadges/ResistBadges';
import { SkillTree } from '@/components/common/SkillTree/SkillTree';
import { CLASS_CHANGE_LEVEL_PENALTY, UNLOCK } from '@/data/balance';
import { CLASSES } from '@/data/classes';
import { EQUIPMENT } from '@/data/equipment';
import { RACES } from '@/data/races';
import { TITLES } from '@/data/titles';
import {
  acquireTitle,
  canAcquireTitle,
  canReincarnate,
  rebirthStatBonusForRace,
  reincarnateInSave,
  transferClassInSave,
} from '@/domain/charProgress';
import { equipDisplayName, gradedBaseBonuses } from '@/domain/forge';
import { canEquip, equipItem, unequipItem } from '@/domain/inventory';
import { availableSP, learnSkill } from '@/domain/skillTree';
import { computeBaseStats } from '@/domain/stats';
import type { Character, ClassId, EquipSlotKey, RaceId, SaveData, StatKey } from '@/domain/types';
import { useGameState } from '@/store/gameState';
import { Redirect, useNavigation } from '@/store/navigation';

const RACE_IDS = Object.keys(RACES);
const CLASS_IDS = Object.keys(CLASSES);

const SLOTS: EquipSlotKey[] = ['weapon', 'armor', 'accessory'];
const SLOT_LABEL: Record<EquipSlotKey, string> = {
  weapon: '武器',
  armor: '防具',
  accessory: '装飾',
};

const STAT_ROWS: { key: StatKey; label: string }[] = [
  { key: 'hp', label: 'HP' },
  { key: 'tp', label: 'TP' },
  { key: 'str', label: 'STR' },
  { key: 'vit', label: 'VIT' },
  { key: 'agi', label: 'AGI' },
  { key: 'int', label: 'INT' },
  { key: 'mnd', label: 'MND' },
  { key: 'luc', label: 'LUC' },
];

type GrowthMode = 'transfer' | 'title' | 'rebirth' | null;

// キャラ詳細（[01 §10]）。ステータス・装備・スキル振り。
export const Page = ({ id }: { id: string }) => {
  const { navigate } = useNavigation();
  const { save, applyAndPersist } = useGameState();
  const play = useSfx();
  const [skillTab, setSkillTab] = useState<'class' | 'race' | 'title'>('class');
  const [transferTo, setTransferTo] = useState<ClassId>(CLASS_IDS[0]);
  const [rbName, setRbName] = useState('');
  const [rbRace, setRbRace] = useState<RaceId>(RACE_IDS[0]);
  const [rbClass, setRbClass] = useState<ClassId>(CLASS_IDS[0]);
  // 育成 bottom sheet
  const [growthMode, setGrowthMode] = useState<GrowthMode>(null);
  // 装備スロットの展開
  const [expandedSlot, setExpandedSlot] = useState<EquipSlotKey | null>(null);

  if (!save) {
    return <Redirect to={{ name: 'title' }} />;
  }
  const char = save.guild.members.find((m) => m.id === id);
  if (!char) {
    return <Redirect to={{ name: 'guild' }} />;
  }

  const stats = computeBaseStats(char);
  const sp = availableSP(char);
  const deepestReached = save.towerState.record.deepestReached;

  // ポジション判定
  const pos = save.guild.party.front.includes(id)
    ? '前衛'
    : save.guild.party.back.includes(id)
      ? '後衛'
      : null;

  const updateChar = (fn: (c: Character) => Character) =>
    applyAndPersist((s: SaveData) => ({
      ...s,
      guild: { ...s.guild, members: s.guild.members.map((m) => (m.id === id ? fn(m) : m)) },
    }));

  // 装備スロットの候補一覧
  const candidatesForSlot = (slot: EquipSlotKey) =>
    save.guild.equipment.filter(
      (e) => EQUIPMENT[e.masterId]?.slot === slot && canEquip(char, e.masterId)
    );

  // 装備ボーナス表示文字列
  const equipStatLabel = (masterId: string, grade?: number): string => {
    const bonuses = gradedBaseBonuses(masterId, grade);
    const parts: string[] = [];
    if (bonuses.atk) parts.push(`ATK+${bonuses.atk}`);
    if (bonuses.mat) parts.push(`MAT+${bonuses.mat}`);
    if (bonuses.def) parts.push(`DEF+${bonuses.def}`);
    if (bonuses.mdf) parts.push(`MDF+${bonuses.mdf}`);
    return parts.join(' ');
  };

  // 習得済みスキル一覧（現タブのみ）
  const learnedSkills = (() => {
    const tree =
      skillTab === 'class'
        ? (CLASSES[char.classId]?.skillTree.skills ?? [])
        : skillTab === 'race'
          ? (RACES[char.raceId]?.raceSkillTree.skills ?? [])
          : char.titleId
            ? (TITLES[char.titleId]?.skillTree.skills ?? [])
            : [];
    return tree.filter((s) => (char.learnedSkills[s.skillId] ?? 0) > 0);
  })();

  return (
    <div className={styles.layout}>
      {/* ヘッダー */}
      <header className={styles.head}>
        <div className={styles.headPortrait}>
          <CharacterPortrait
            raceId={char.raceId}
            classId={char.classId}
            size={64}
          />
        </div>
        <div className={styles.headInfo}>
          <h1 className={styles.headName}>{char.name}</h1>
          <span className={styles.headSub}>
            {RACES[char.raceId]?.name} ・ {CLASSES[char.classId]?.name} ・ Lv{char.level}
          </span>
          {pos ? <span className={styles.posTag}>{pos}</span> : null}
        </div>
      </header>

      {/* body（スクロール領域） */}
      <main className={styles.body}>
        {/* 能力値 */}
        <section>
          <p className={styles.sectionTitle}>ステータス</p>
          <dl className={styles.statsGrid}>
            {STAT_ROWS.map((r) => (
              <div
                key={r.key}
                className={styles.statCell}
              >
                <dt className={styles.statLabel}>{r.label}</dt>
                <dd
                  className={`${styles.statValue} ${
                    r.key === 'hp' ? styles.statValueHp : r.key === 'tp' ? styles.statValueTp : ''
                  }`}
                >
                  {stats[r.key]}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        {/* 種族耐性 */}
        <section>
          <p className={styles.sectionTitle}>種族耐性</p>
          <div className={styles.resistWrap}>
            {RACES[char.raceId]?.elementResist ? (
              <div className={styles.resistRow}>
                <span className={styles.resistLabel}>属性</span>
                <ResistBadges
                  elementResist={RACES[char.raceId]?.elementResist}
                  ailmentResist={undefined}
                />
              </div>
            ) : null}
            {RACES[char.raceId]?.ailmentResist ? (
              <div className={styles.resistRow}>
                <span className={styles.resistLabel}>状態異常</span>
                <ResistBadges
                  elementResist={undefined}
                  ailmentResist={RACES[char.raceId]?.ailmentResist}
                />
              </div>
            ) : null}
            {!RACES[char.raceId]?.elementResist && !RACES[char.raceId]?.ailmentResist ? (
              <p className={styles.empty}>この種族は特別な耐性を持ちません。</p>
            ) : null}
          </div>
        </section>

        {/* 装備 */}
        <section>
          <p className={styles.sectionTitle}>装備</p>
          <div className={styles.equipRows}>
            {SLOTS.map((slot) => {
              const equipped = char.equipment[slot];
              const isExpanded = expandedSlot === slot;
              const candidates = candidatesForSlot(slot);
              const bonusStr = equipped ? equipStatLabel(equipped.masterId, equipped.grade) : '';

              return (
                <div key={slot}>
                  <button
                    type="button"
                    className={`${styles.equipRow} ${equipped ? styles.equipRowEquipped : ''} ${isExpanded ? styles.equipRowExpanded : ''}`}
                    onClick={() => {
                      if (!equipped) {
                        // 空きスロットはタップで候補を展開
                        setExpandedSlot(isExpanded ? null : slot);
                      } else {
                        // 装備済みスロットもタップで候補展開トグル
                        setExpandedSlot(isExpanded ? null : slot);
                      }
                    }}
                  >
                    <div className={styles.equipItemSprite}>
                      {equipped ? (
                        <ItemSprite
                          itemId={equipped.masterId}
                          size="sm"
                        />
                      ) : (
                        <span style={{ fontSize: '18px', color: 'var(--text-faint)' }}>—</span>
                      )}
                    </div>
                    <div className={styles.equipMeta}>
                      <span className={styles.equipSlotLabel}>{SLOT_LABEL[slot]}</span>
                      <span
                        className={`${styles.equipName} ${!equipped ? styles.equipNameEmpty : ''}`}
                      >
                        {equipped ? equipDisplayName(equipped) : '（なし）'}
                      </span>
                      {bonusStr ? <span className={styles.equipStats}>{bonusStr}</span> : null}
                    </div>
                    {equipped ? (
                      <button
                        type="button"
                        className={`${styles.equipChip} ${styles.equipChipUnequip}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          void updateAndUnequip(slot);
                          setExpandedSlot(null);
                        }}
                      >
                        外す
                      </button>
                    ) : (
                      <span className={`${styles.equipChip} ${styles.equipChipPick}`}>選ぶ</span>
                    )}
                  </button>

                  {/* 展開パネル */}
                  {isExpanded ? (
                    <div className={styles.candidatePanel}>
                      {candidates.length === 0 ? (
                        <p className={styles.candidateEmpty}>装備可能な候補がありません</p>
                      ) : (
                        candidates.map((e) => {
                          const cBonusStr = equipStatLabel(e.masterId, e.grade);
                          return (
                            <button
                              key={e.id}
                              type="button"
                              className={styles.candidateRow}
                              onClick={() => {
                                void applyAndPersist((s) => equipItem(s, id, e.id));
                                setExpandedSlot(null);
                              }}
                            >
                              <div className={styles.candidateItemSprite}>
                                <ItemSprite
                                  itemId={e.masterId}
                                  size="sm"
                                />
                              </div>
                              <div className={styles.candidateMeta}>
                                <span className={styles.candidateName}>{equipDisplayName(e)}</span>
                                {cBonusStr ? (
                                  <span className={styles.candidateBonus}>{cBonusStr}</span>
                                ) : null}
                              </div>
                              <span className={styles.candidateAssign}>装備</span>
                            </button>
                          );
                        })
                      )}
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
        </section>

        {/* スキル */}
        <section>
          <div className={styles.skillHead}>
            <span className={styles.skillTitle}>スキル ・ {CLASSES[char.classId]?.name}</span>
            <span className={styles.spTag}>SP {sp}</span>
          </div>

          {/* サブタブ */}
          <div className={styles.skillSubTabs}>
            <button
              type="button"
              className={`${styles.skillSubTab} ${skillTab === 'class' ? styles.skillSubTabActive : ''}`}
              onClick={() => setSkillTab('class')}
            >
              職業
            </button>
            <button
              type="button"
              className={`${styles.skillSubTab} ${skillTab === 'race' ? styles.skillSubTabActive : ''}`}
              onClick={() => setSkillTab('race')}
            >
              種族
            </button>
            {char.titleId ? (
              <button
                type="button"
                className={`${styles.skillSubTab} ${skillTab === 'title' ? styles.skillSubTabActive : ''}`}
                onClick={() => setSkillTab('title')}
              >
                称号
              </button>
            ) : null}
          </div>

          {/* スキルツリー */}
          <div className={styles.skillTreeWrap}>
            <div className={styles.skillTreeLegend}>
              <span>●習得</span>
              <span>□選択可</span>
              <span>□未開放</span>
            </div>
            <SkillTree
              nodes={
                skillTab === 'class'
                  ? (CLASSES[char.classId]?.skillTree.skills ?? [])
                  : skillTab === 'race'
                    ? (RACES[char.raceId]?.raceSkillTree.skills ?? [])
                    : char.titleId
                      ? (TITLES[char.titleId]?.skillTree.skills ?? [])
                      : []
              }
              char={char}
              onLearn={(skillId) => {
                play('create');
                void updateChar((c) => learnSkill(c, skillId));
              }}
            />
          </div>

          {/* 習得済みスキル一覧 */}
          {learnedSkills.length > 0 ? (
            <ul className={styles.learnedList}>
              {learnedSkills.map((s) => {
                const lv = char.learnedSkills[s.skillId] ?? 0;
                return (
                  <li
                    key={s.skillId}
                    className={styles.learnedItem}
                  >
                    <span className={styles.learnedName}>{s.skillId.replace(/^skill_/, '')}</span>
                    <span className={styles.learnedSub}>Lv{lv}</span>
                  </li>
                );
              })}
            </ul>
          ) : null}
        </section>

        {/* 育成 3列ボタン */}
        <section>
          <div className={styles.growthBtns}>
            <button
              type="button"
              className={`${styles.growthBtn} ${styles.growthBtnTransfer}`}
              onClick={() => {
                play('cursor');
                setGrowthMode('transfer');
              }}
            >
              <span className={styles.growthBtnLabel}>転職</span>
              <span className={styles.growthBtnSub}>
                Lv-{CLASS_CHANGE_LEVEL_PENALTY}/技リセット
              </span>
            </button>
            <button
              type="button"
              className={`${styles.growthBtn} ${styles.growthBtnTitle}`}
              onClick={() => {
                play('cursor');
                setGrowthMode('title');
              }}
            >
              <span className={styles.growthBtnLabel}>称号</span>
              <span className={styles.growthBtnSub}>{char.titleId ? '習得済み' : '2択選択'}</span>
            </button>
            <button
              type="button"
              className={`${styles.growthBtn} ${styles.growthBtnRebirth}`}
              disabled={!canReincarnate(char)}
              onClick={() => {
                play('cursor');
                setGrowthMode('rebirth');
              }}
            >
              <span className={styles.growthBtnLabel}>転生</span>
              <span className={styles.growthBtnSub}>Lv100→1</span>
            </button>
          </div>
        </section>
      </main>

      {/* フッタ */}
      <footer className={styles.foot}>
        <button
          type="button"
          className={styles.back}
          onClick={() => navigate({ name: 'guild' })}
        >
          もどる
        </button>
      </footer>

      {/* ===== 育成 bottom sheet ===== */}
      {growthMode ? (
        <div
          className={styles.overlay}
          onClick={() => setGrowthMode(null)}
        >
          <div
            className={styles.sheet}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.sheetHandle} />

            {/* 転職 */}
            {growthMode === 'transfer' ? (
              <>
                <p className={styles.sheetTitle}>転職</p>
                <p className={styles.sheetWarn}>
                  レベルが {CLASS_CHANGE_LEVEL_PENALTY}{' '}
                  下がり、職業・称号スキルは振り直しになります（種族スキルは保持）。
                </p>
                <select
                  className={styles.sheetSelect}
                  value={transferTo}
                  onChange={(e) => setTransferTo(e.target.value)}
                >
                  {CLASS_IDS.map((cid) => (
                    <option
                      key={cid}
                      value={cid}
                    >
                      {CLASSES[cid].name}
                    </option>
                  ))}
                </select>
                <div className={styles.sheetActionRow}>
                  <button
                    type="button"
                    className={styles.sheetActCancel}
                    onClick={() => setGrowthMode(null)}
                  >
                    もどる
                  </button>
                  <button
                    type="button"
                    className={styles.sheetActPrimary}
                    disabled={transferTo === char.classId}
                    onClick={() => {
                      play('decide');
                      void applyAndPersist((s) => transferClassInSave(s, id, transferTo));
                      setGrowthMode(null);
                    }}
                  >
                    転職する
                  </button>
                </div>
              </>
            ) : null}

            {/* 称号 */}
            {growthMode === 'title' ? (
              <>
                <p className={styles.sheetTitle}>称号</p>
                {char.titleId ? (
                  <p className={styles.titleHave}>習得済み: {TITLES[char.titleId]?.name}</p>
                ) : deepestReached < UNLOCK.TITLE_DEPTH ? (
                  <p className={styles.sheetNote}>
                    第 {UNLOCK.TITLE_DEPTH} 階到達で習得できます（現在 {deepestReached}F）。
                  </p>
                ) : (
                  <div className={styles.titleOpts}>
                    {(CLASSES[char.classId]?.titleOptions ?? []).map((tid) => (
                      <button
                        key={tid}
                        type="button"
                        className={styles.titleBtn}
                        disabled={!canAcquireTitle(char, tid, deepestReached)}
                        onClick={() => {
                          void updateChar((c) => acquireTitle(c, tid, deepestReached));
                          setGrowthMode(null);
                        }}
                      >
                        {TITLES[tid]?.name}（SP+5）
                      </button>
                    ))}
                  </div>
                )}
                <button
                  type="button"
                  className={styles.sheetClose}
                  onClick={() => setGrowthMode(null)}
                >
                  とじる
                </button>
              </>
            ) : null}

            {/* 転生 */}
            {growthMode === 'rebirth' ? (
              <>
                <p className={styles.sheetTitle}>転生</p>
                <p className={styles.sheetWarn}>
                  作り直して強い新人になります（開始 Lv1・種族に応じた永続ボーナス付き）。
                </p>
                {char.rebirthBonus && (
                  <p className={styles.rbBonus}>
                    現在の累積ボーナス（転生{char.rebirthBonus.count}回）:{' '}
                    {Object.entries(char.rebirthBonus.stats)
                      .filter(([, v]) => v && v > 0)
                      .sort(([, a], [, b]) => (b ?? 0) - (a ?? 0))
                      .map(([k, v]) => `${k.toUpperCase()}+${v}`)
                      .join(' / ')}
                  </p>
                )}
                {(() => {
                  const preview = rebirthStatBonusForRace(rbRace);
                  const previewStr = Object.entries(preview)
                    .filter(([, v]) => v && v > 0)
                    .sort(([, a], [, b]) => (b ?? 0) - (a ?? 0))
                    .map(([k, v]) => `${k.toUpperCase()}+${v}`)
                    .join(', ');
                  return (
                    <p className={styles.rbPreview}>
                      {RACES[rbRace]?.name}で転生 → 今回付与: {previewStr}
                    </p>
                  );
                })()}
                <input
                  className={styles.sheetInput}
                  type="text"
                  maxLength={16}
                  placeholder={char.name}
                  value={rbName}
                  onChange={(e) => setRbName(e.target.value)}
                />
                <div className={styles.sheetActionRow}>
                  <select
                    className={styles.sheetSelect}
                    style={{ flex: 1 }}
                    value={rbRace}
                    onChange={(e) => setRbRace(e.target.value)}
                  >
                    {RACE_IDS.map((r) => (
                      <option
                        key={r}
                        value={r}
                      >
                        {RACES[r].name}
                      </option>
                    ))}
                  </select>
                  <select
                    className={styles.sheetSelect}
                    style={{ flex: 1 }}
                    value={rbClass}
                    onChange={(e) => setRbClass(e.target.value)}
                  >
                    {CLASS_IDS.map((c) => (
                      <option
                        key={c}
                        value={c}
                      >
                        {CLASSES[c].name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className={styles.sheetActionRow}>
                  <button
                    type="button"
                    className={styles.sheetActCancel}
                    onClick={() => setGrowthMode(null)}
                  >
                    やめる
                  </button>
                  <button
                    type="button"
                    className={styles.sheetActDanger}
                    onClick={() => {
                      play('create');
                      void applyAndPersist((s) =>
                        reincarnateInSave(s, id, {
                          raceId: rbRace,
                          classId: rbClass,
                          name: rbName.trim() || char.name,
                        })
                      );
                      setGrowthMode(null);
                    }}
                  >
                    転生を実行
                  </button>
                </div>
              </>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );

  function updateAndUnequip(slot: EquipSlotKey) {
    return applyAndPersist((s) => unequipItem(s, id!, slot));
  }
};
