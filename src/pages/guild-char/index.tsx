import { Navigate, useNavigate, useParams } from 'react-router';

import styles from './style.module.scss';

import { CLASSES } from '@/data/classes';
import { EQUIPMENT } from '@/data/equipment';
import { RACES } from '@/data/races';
import { SKILLS } from '@/data/skills';
import { canEquip, equipItem, unequipItem } from '@/domain/inventory';
import {
  availableSP,
  canLearnSkill,
  learnSkill,
  skillLevel,
  skillNodesFor,
} from '@/domain/skillTree';
import { computeBaseStats } from '@/domain/stats';
import type { Character, EquipSlotKey, SaveData, StatKey } from '@/domain/types';
import { useGameState } from '@/store/gameState';

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
export const Page = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { save, applyAndPersist } = useGameState();

  if (!save) {
    return (
      <Navigate
        to="/title"
        replace
      />
    );
  }
  const char = save.guild.members.find((m) => m.id === id);
  if (!char || !id) {
    return (
      <Navigate
        to="/guild"
        replace
      />
    );
  }

  const stats = computeBaseStats(char);
  const sp = availableSP(char);

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

      {/* 装備 */}
      <section className={styles.card}>
        <h2 className={styles.h2}>装備</h2>
        {SLOTS.map((slot) => {
          const equippedId = char.equipment[slot];
          const equipped = equippedId ? EQUIPMENT[equippedId] : null;
          const candidates = save.guild.storage.filter(
            (s) => EQUIPMENT[s.itemId]?.slot === slot && canEquip(char, s.itemId)
          );
          return (
            <div
              key={slot}
              className={styles.equipSlot}
            >
              <div className={styles.equipHead}>
                <span className={styles.slotLabel}>{SLOT_LABEL[slot]}</span>
                <span className={styles.equipName}>{equipped ? equipped.name : '（なし）'}</span>
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
                  {candidates.map((c) => (
                    <button
                      type="button"
                      key={c.itemId}
                      className={styles.pickBtn}
                      onClick={() => void applyAndPersist((s) => equipItem(s, id, c.itemId))}
                    >
                      {EQUIPMENT[c.itemId].name} 装備{c.qty > 1 ? `(${c.qty})` : ''}
                    </button>
                  ))}
                </div>
              ) : null}
            </div>
          );
        })}
      </section>

      {/* スキル */}
      <section className={styles.card}>
        <h2 className={styles.h2}>
          スキル <span className={styles.sp}>SP {sp}</span>
        </h2>
        <ul className={styles.skills}>
          {skillNodesFor(char).map((node) => {
            const lv = skillLevel(char, node.skillId);
            const can = canLearnSkill(char, node.skillId);
            const def = SKILLS[node.skillId];
            return (
              <li
                key={node.skillId}
                className={styles.skill}
              >
                <div className={styles.skillInfo}>
                  <span className={styles.skillName}>
                    {def?.name ?? node.skillId}
                    <span className={styles.skillLv}>
                      Lv {lv}/{node.maxLevel}
                    </span>
                  </span>
                  <span className={styles.skillDesc}>{def?.description ?? ''}</span>
                </div>
                <button
                  type="button"
                  className={styles.learnBtn}
                  disabled={!can}
                  onClick={() => void updateChar((c) => learnSkill(c, node.skillId))}
                >
                  ＋
                </button>
              </li>
            );
          })}
        </ul>
      </section>

      <footer className={styles.foot}>
        <button
          type="button"
          className={styles.back}
          onClick={() => navigate('/guild')}
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
