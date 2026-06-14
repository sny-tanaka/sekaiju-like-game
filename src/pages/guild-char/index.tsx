import { useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router';

import styles from './style.module.scss';

import { CLASS_CHANGE_LEVEL_PENALTY, UNLOCK } from '@/data/balance';
import { CLASSES } from '@/data/classes';
import { EQUIPMENT } from '@/data/equipment';
import { RACES } from '@/data/races';
import { SKILLS } from '@/data/skills';
import { TITLES } from '@/data/titles';
import {
  acquireTitle,
  canAcquireTitle,
  canReincarnate,
  reincarnate,
  transferClass,
} from '@/domain/charProgress';
import { canEquip, equipItem, unequipItem } from '@/domain/inventory';
import {
  availableSP,
  canLearnSkill,
  learnSkill,
  skillLevel,
  skillNodesFor,
} from '@/domain/skillTree';
import { computeBaseStats } from '@/domain/stats';
import type { Character, ClassId, EquipSlotKey, RaceId, SaveData, StatKey } from '@/domain/types';
import { useGameState } from '@/store/gameState';

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
export const Page = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { save, applyAndPersist } = useGameState();
  const [transferTo, setTransferTo] = useState<ClassId>(CLASS_IDS[0]);
  const [rbName, setRbName] = useState('');
  const [rbRace, setRbRace] = useState<RaceId>(RACE_IDS[0]);
  const [rbClass, setRbClass] = useState<ClassId>(CLASS_IDS[0]);
  const [rbOpen, setRbOpen] = useState(false);

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
            onClick={() => void updateChar((c) => transferClass(c, transferTo))}
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
              ※ 作り直して強い新人になります（開始Lv {Math.min(30, Math.floor(char.level / 2))}
              ・ボーナス付き）。
            </p>
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
                onClick={() =>
                  void updateChar((c) =>
                    reincarnate(c, {
                      raceId: rbRace,
                      classId: rbClass,
                      name: rbName.trim() || c.name,
                    })
                  )
                }
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
