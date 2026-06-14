import { useCallback, useState } from 'react';
import { Navigate, useNavigate } from 'react-router';

import styles from './style.module.scss';

import { GUILD_MEMBER_LIMIT, PARTY_MAX } from '@/data/balance';
import { CLASSES } from '@/data/classes';
import { RACES } from '@/data/races';
import { formationCount, placeInRow, removeFromFormation } from '@/domain/formation';
import { addCharacterToGuild, createCharacter } from '@/domain/saveData';
import type { ClassId, RaceId, SaveData } from '@/domain/types';
import { useGameState } from '@/store/gameState';

type Pos = '前衛' | '後衛' | '控え';
function positionOf(save: SaveData, charId: string): Pos {
  if (save.guild.party.front.includes(charId)) return '前衛';
  if (save.guild.party.back.includes(charId)) return '後衛';
  return '控え';
}

// ギルド管理（[01 §9]）。Phase 0 では最小限のキャラ作成と一覧のみ。
// 編成・転職・スキル振りは Phase 3 で拡張する。
// 種族と職業はそれぞれ独立に選択できる（確定事項）。
export const Page = () => {
  const navigate = useNavigate();
  const { save, applyAndPersist } = useGameState();

  const raceIds = Object.keys(RACES);
  const classIds = Object.keys(CLASSES);
  const [name, setName] = useState('');
  const [raceId, setRaceId] = useState<RaceId>(raceIds[0]);
  const [classId, setClassId] = useState<ClassId>(classIds[0]);
  const [busy, setBusy] = useState(false);

  const handleCreate = useCallback(async () => {
    const finalName = name.trim() || '名もなき冒険者';
    const char = createCharacter({ raceId, classId, name: finalName });
    setBusy(true);
    // 更新と永続化を原子的に行う（applySave+persist だと persist が更新前の状態を保存し戻してしまう）
    await applyAndPersist((prev) => addCharacterToGuild(prev, char));
    setName('');
    setBusy(false);
  }, [name, raceId, classId, applyAndPersist]);

  if (!save) {
    return (
      <Navigate
        to="/title"
        replace
      />
    );
  }

  const { members } = save.guild;
  const isFull = members.length >= GUILD_MEMBER_LIMIT;

  return (
    <div className={styles.layout}>
      <header className={styles.head}>
        <h1 className={styles.title}>ギルド管理</h1>
        <span className={styles.count}>
          団員 {members.length} / {GUILD_MEMBER_LIMIT}
        </span>
      </header>

      <section className={styles.create}>
        <h2 className={styles.sectionTitle}>冒険者を作成</h2>
        <label className={styles.field}>
          <span>名前</span>
          <input
            type="text"
            value={name}
            maxLength={16}
            placeholder="名もなき冒険者"
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label className={styles.field}>
          <span>種族</span>
          <select
            value={raceId}
            onChange={(e) => setRaceId(e.target.value)}
          >
            {raceIds.map((id) => (
              <option
                key={id}
                value={id}
              >
                {RACES[id].name}
              </option>
            ))}
          </select>
        </label>
        <label className={styles.field}>
          <span>職業</span>
          <select
            value={classId}
            onChange={(e) => setClassId(e.target.value)}
          >
            {classIds.map((id) => (
              <option
                key={id}
                value={id}
              >
                {CLASSES[id].name}
              </option>
            ))}
          </select>
        </label>
        <button
          type="button"
          className={styles.primary}
          disabled={busy || isFull}
          onClick={() => void handleCreate()}
        >
          {isFull ? '団員が上限です' : '作成する'}
        </button>
      </section>

      <section className={styles.list}>
        <h2 className={styles.sectionTitle}>
          団員一覧{' '}
          <span className={styles.count}>
            （出撃 {formationCount(save)} / {PARTY_MAX}）
          </span>
        </h2>
        {members.length === 0 ? (
          <p className={styles.empty}>まだ冒険者がいません。</p>
        ) : (
          <ul className={styles.members}>
            {members.map((m) => {
              const pos = positionOf(save, m.id);
              return (
                <li
                  key={m.id}
                  className={styles.member}
                >
                  <button
                    type="button"
                    className={styles.memberMain}
                    onClick={() => navigate(`/guild/char/${m.id}`)}
                  >
                    <span className={styles.memberName}>
                      {m.name}
                      <span className={`${styles.pos} ${styles[`pos_${pos}`] ?? ''}`}>{pos}</span>
                    </span>
                    <span className={styles.memberSub}>
                      {RACES[m.raceId]?.name} / {CLASSES[m.classId]?.name} / Lv{m.level} ›
                    </span>
                  </button>
                  <div className={styles.posBtns}>
                    <button
                      type="button"
                      className={`${styles.posBtn} ${pos === '前衛' ? styles.posBtnActive : ''}`}
                      onClick={() => void applyAndPersist((s) => placeInRow(s, m.id, 'front'))}
                    >
                      前
                    </button>
                    <button
                      type="button"
                      className={`${styles.posBtn} ${pos === '後衛' ? styles.posBtnActive : ''}`}
                      onClick={() => void applyAndPersist((s) => placeInRow(s, m.id, 'back'))}
                    >
                      後
                    </button>
                    <button
                      type="button"
                      className={`${styles.posBtn} ${pos === '控え' ? styles.posBtnActive : ''}`}
                      onClick={() => void applyAndPersist((s) => removeFromFormation(s, m.id))}
                    >
                      控
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </section>

      <footer className={styles.foot}>
        <button
          type="button"
          className={styles.sub}
          onClick={() => navigate('/town')}
        >
          拠点へ戻る
        </button>
      </footer>
    </div>
  );
};
