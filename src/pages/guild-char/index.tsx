import { useState } from 'react';

import styles from './style.module.scss';

import { useSfx } from '@/audio/useSfx';
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
import { equipDisplayName } from '@/domain/forge';
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
  const [rbOpen, setRbOpen] = useState(false);

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

  const updateChar = (fn: (c: Character) => Character) =>
    applyAndPersist((s: SaveData) => ({
      ...s,
      guild: { ...s.guild, members: s.guild.members.map((m) => (m.id === id ? fn(m) : m)) },
    }));

  return (
    <div className={styles.layout}>
      <header className={styles.head}>
        <h1 className={styles.title}>{char.name}</h1>
        <span className={styles.sub}>
          {RACES[char.raceId]?.name} / {CLASSES[char.classId]?.name} / Lv{char.level}
        </span>
      </header>

      {/* ステータス */}
      <section className={styles.card}>
        <h2 className={styles.h2}>ステータス</h2>
        <dl className={styles.stats}>
          {STAT_ROWS.map((r) => (
            <div key={r.key}>
              <dt>{r.label}</dt>
              <dd>{stats[r.key]}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* §16: 種族耐性（属性・状態異常） */}
      {RACES[char.raceId]?.elementResist || RACES[char.raceId]?.ailmentResist ? (
        <section className={styles.card}>
          <h2 className={styles.h2}>種族耐性</h2>
          <div className={styles.resistBlock}>
            <div className={styles.resistRow}>
              <span className={styles.resistLabel}>属性</span>
              <ResistBadges
                elementResist={RACES[char.raceId]?.elementResist}
                ailmentResist={undefined}
              />
            </div>
            <div className={styles.resistRow}>
              <span className={styles.resistLabel}>状態異常</span>
              <ResistBadges
                elementResist={undefined}
                ailmentResist={RACES[char.raceId]?.ailmentResist}
              />
            </div>
          </div>
        </section>
      ) : (
        <section className={styles.card}>
          <h2 className={styles.h2}>種族耐性</h2>
          <p className={styles.warn}>この種族は特別な耐性を持ちません。</p>
        </section>
      )}

      {/* 装備 */}
      <section className={styles.card}>
        <h2 className={styles.h2}>装備</h2>
        {SLOTS.map((slot) => {
          const equipped = char.equipment[slot];
          // 所有プールから、このスロットに装備可能な個体を候補に
          const candidates = save.guild.equipment.filter(
            (e) => EQUIPMENT[e.masterId]?.slot === slot && canEquip(char, e.masterId)
          );
          return (
            <div
              key={slot}
              className={styles.equipSlot}
            >
              <div className={styles.equipHead}>
                <span className={styles.slotLabel}>{SLOT_LABEL[slot]}</span>
                <span className={styles.equipName}>
                  {equipped ? equipDisplayName(equipped) : '（なし）'}
                </span>
                {equipped ? (
                  <button
                    type="button"
                    className={styles.smallBtn}
                    onClick={() => void updateAndUnequip(slot)}
                  >
                    外す
                  </button>
                ) : null}
              </div>
              {candidates.length > 0 ? (
                <div className={styles.equipPick}>
                  {candidates.map((e) => (
                    <button
                      type="button"
                      key={e.id}
                      className={styles.pickBtn}
                      onClick={() => void applyAndPersist((s) => equipItem(s, id, e.id))}
                    >
                      {equipDisplayName(e)} 装備
                    </button>
                  ))}
                </div>
              ) : null}
            </div>
          );
        })}
      </section>

      {/* スキル（本家風ツリー表示。職業/種族/称号で切替） */}
      <section className={styles.card}>
        <h2 className={styles.h2}>
          スキル <span className={styles.sp}>SP {sp}</span>
        </h2>
        <div className={styles.skillTabs}>
          <button
            type="button"
            className={`${styles.skillTab} ${skillTab === 'class' ? styles.skillTabOn : ''}`}
            onClick={() => setSkillTab('class')}
          >
            職業（{CLASSES[char.classId]?.name ?? ''}）
          </button>
          <button
            type="button"
            className={`${styles.skillTab} ${skillTab === 'race' ? styles.skillTabOn : ''}`}
            onClick={() => setSkillTab('race')}
          >
            種族（{RACES[char.raceId]?.name ?? ''}）
          </button>
          {char.titleId ? (
            <button
              type="button"
              className={`${styles.skillTab} ${skillTab === 'title' ? styles.skillTabOn : ''}`}
              onClick={() => setSkillTab('title')}
            >
              称号（{TITLES[char.titleId]?.name ?? ''}）
            </button>
          ) : null}
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
      </section>

      {/* 育成: 転職・称号・転生 */}
      <section className={styles.card}>
        <h2 className={styles.h2}>転職</h2>
        <div className={styles.jobRow}>
          <select
            className={styles.select}
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
          <button
            type="button"
            className={styles.actBtn}
            disabled={transferTo === char.classId}
            onClick={() => {
              play('decide');
              void applyAndPersist((s) => transferClassInSave(s, id, transferTo));
            }}
          >
            転職する
          </button>
        </div>
        <p className={styles.warn}>
          ※ レベルが {CLASS_CHANGE_LEVEL_PENALTY}{' '}
          下がり、職業/称号スキルは振り直しになります（種族スキルは保持）。
        </p>

        <h2 className={styles.h2}>称号</h2>
        {char.titleId ? (
          <p className={styles.titleHave}>習得済み: {TITLES[char.titleId]?.name}</p>
        ) : deepestReached < UNLOCK.TITLE_DEPTH ? (
          <p className={styles.warn}>
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
                onClick={() => void updateChar((c) => acquireTitle(c, tid, deepestReached))}
              >
                {TITLES[tid]?.name}（SP+5）
              </button>
            ))}
          </div>
        )}

        <h2 className={styles.h2}>転生</h2>
        {!canReincarnate(char) ? (
          <p className={styles.warn}>
            Lv{UNLOCK.REBIRTH_MIN_LEVEL} 以上で転生できます（現在 Lv{char.level}）。
          </p>
        ) : !rbOpen ? (
          <button
            type="button"
            className={styles.actBtn}
            onClick={() => setRbOpen(true)}
          >
            転生する…
          </button>
        ) : (
          <div className={styles.rbForm}>
            <p className={styles.warn}>
              ※ 作り直して強い新人になります（開始Lv 1（やり直し）・種族に応じた永続ボーナス付き）。
            </p>
            {char.rebirthBonus && (
              <p className={styles.warn}>
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
                <p className={styles.warn}>
                  {RACES[rbRace]?.name}で転生 → 今回付与: {previewStr}
                </p>
              );
            })()}
            <input
              className={styles.input}
              type="text"
              maxLength={16}
              placeholder={char.name}
              value={rbName}
              onChange={(e) => setRbName(e.target.value)}
            />
            <div className={styles.jobRow}>
              <select
                className={styles.select}
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
                className={styles.select}
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
            <div className={styles.jobRow}>
              <button
                type="button"
                className={styles.danger}
                onClick={() => {
                  play('create');
                  void applyAndPersist((s) =>
                    reincarnateInSave(s, id, {
                      raceId: rbRace,
                      classId: rbClass,
                      name: rbName.trim() || char.name,
                    })
                  );
                  setRbOpen(false);
                }}
              >
                転生を実行
              </button>
              <button
                type="button"
                className={styles.actBtn}
                onClick={() => setRbOpen(false)}
              >
                やめる
              </button>
            </div>
          </div>
        )}
      </section>

      <footer className={styles.foot}>
        <button
          type="button"
          className={styles.back}
          onClick={() => navigate({ name: 'guild' })}
        >
          もどる
        </button>
      </footer>
    </div>
  );

  function updateAndUnequip(slot: EquipSlotKey) {
    return applyAndPersist((s) => unequipItem(s, id!, slot));
  }
};
