import { useCallback, useMemo, useState } from 'react';

import styles from './style.module.scss';

import { useSfx } from '@/audio/useSfx';
import { ClassInfoCard } from '@/components/creation/ClassInfoCard/ClassInfoCard';
import { RaceInfoCard } from '@/components/creation/RaceInfoCard/RaceInfoCard';
import {
  FORMATION_BACK_SLOTS,
  FORMATION_FRONT_SLOTS,
  GUILD_MEMBER_LIMIT,
  PARTY_MAX,
} from '@/data/balance';
import { CLASSES } from '@/data/classes';
import { RACES } from '@/data/races';
import { formationCount, setSlot } from '@/domain/formation';
import { addCharacterToGuild, createCharacter, removeCharacterFromGuild } from '@/domain/saveData';
import type { Character, ClassId, RaceId, Row, SaveData } from '@/domain/types';
import { useGameState } from '@/store/gameState';
import { Redirect, useNavigation } from '@/store/navigation';

type Tab = 'roster' | 'party' | 'banish';
type Pos = '前衛' | '後衛' | '控え';
type SortKey = 'created' | 'levelDesc' | 'levelAsc';

const SORT_LABEL: Record<SortKey, string> = {
  created: '作成順',
  levelDesc: 'レベルが高い順',
  levelAsc: 'レベルが低い順',
};

const NO_MEMBERS: Character[] = []; // フォールバックを安定参照にして useMemo の再計算を防ぐ

function positionOf(save: SaveData, charId: string): Pos {
  if (save.guild.party.front.includes(charId)) return '前衛';
  if (save.guild.party.back.includes(charId)) return '後衛';
  return '控え';
}

// ギルド管理（[01 §9]・issue #26）。作成＋一覧 / 編成 / 追放の3タブ構成。
export const Page = () => {
  const { navigate } = useNavigation();
  const { save, applyAndPersist } = useGameState();
  const play = useSfx();

  const raceIds = Object.keys(RACES);
  const classIds = Object.keys(CLASSES);
  const [tab, setTab] = useState<Tab>('roster');

  // 作成フォーム
  const [name, setName] = useState('');
  const [raceId, setRaceId] = useState<RaceId>(raceIds[0]);
  const [classId, setClassId] = useState<ClassId>(classIds[0]);
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  // 一覧フィルター/ソート
  const [raceFilter, setRaceFilter] = useState<'all' | RaceId>('all');
  const [classFilter, setClassFilter] = useState<'all' | ClassId>('all');
  const [sort, setSort] = useState<SortKey>('created');

  // 編成スロットの団員選択
  const [picker, setPicker] = useState<{ row: Row; idx: number } | null>(null);
  // 追放の確認
  const [banishId, setBanishId] = useState<string | null>(null);

  const members = save?.guild.members ?? NO_MEMBERS;

  const rosterMembers = useMemo(() => {
    let list = members;
    if (raceFilter !== 'all') list = list.filter((m) => m.raceId === raceFilter);
    if (classFilter !== 'all') list = list.filter((m) => m.classId === classFilter);
    const arr = [...list];
    if (sort === 'levelDesc') arr.sort((a, b) => b.level - a.level);
    else if (sort === 'levelAsc') arr.sort((a, b) => a.level - b.level);
    return arr;
  }, [members, raceFilter, classFilter, sort]);

  const handleCreate = useCallback(async () => {
    const finalName = name.trim() || '名もなき冒険者';
    const char = createCharacter({ raceId, classId, name: finalName });
    play('create');
    setBusy(true);
    await applyAndPersist((prev) => addCharacterToGuild(prev, char));
    setNotice(`${finalName}（${RACES[raceId]?.name} / ${CLASSES[classId]?.name}）を作成しました`);
    setName('');
    setBusy(false);
  }, [name, raceId, classId, applyAndPersist, play]);

  if (!save) {
    return <Redirect to={{ name: 'title' }} />;
  }

  const isFull = members.length >= GUILD_MEMBER_LIMIT;
  // 一覧フィルターに出すのは「実際に団員が持つ」種族/職業だけ。
  const presentRaces = raceIds.filter((id) => members.some((m) => m.raceId === id));
  const presentClasses = classIds.filter((id) => members.some((m) => m.classId === id));

  const banishTarget = banishId ? members.find((m) => m.id === banishId) : null;

  const slotMemberId = (row: Row, idx: number): string | null =>
    (row === 'front' ? save.guild.party.front : save.guild.party.back)[idx] ?? null;

  const memberLine = (m: Character) =>
    `${RACES[m.raceId]?.name} / ${CLASSES[m.classId]?.name} / Lv${m.level}`;

  return (
    <div className={styles.layout}>
      <header className={styles.head}>
        <h1 className={styles.title}>ギルド管理</h1>
        <span className={styles.count}>
          団員 {members.length} / {GUILD_MEMBER_LIMIT}
        </span>
      </header>

      {/* タブ */}
      <div className={styles.tabs}>
        <button
          type="button"
          className={`${styles.tab} ${tab === 'roster' ? styles.tabActive : ''}`}
          onClick={() => {
            play('cursor');
            setTab('roster');
          }}
        >
          作成・一覧
        </button>
        <button
          type="button"
          className={`${styles.tab} ${tab === 'party' ? styles.tabActive : ''}`}
          onClick={() => {
            play('cursor');
            setTab('party');
          }}
        >
          編成
        </button>
        <button
          type="button"
          className={`${styles.tab} ${tab === 'banish' ? styles.tabActive : ''}`}
          onClick={() => {
            play('cursor');
            setTab('banish');
          }}
        >
          追放
        </button>
      </div>

      {/* ===== 1ページ目: 冒険者作成 + 団員一覧 ===== */}
      {tab === 'roster' ? (
        <>
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
            <RaceInfoCard raceId={raceId} />
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
            <ClassInfoCard classId={classId} />
            <button
              type="button"
              className={styles.primary}
              disabled={busy || isFull}
              onClick={() => void handleCreate()}
            >
              {isFull ? '団員が上限です' : '作成する'}
            </button>
            {notice ? <p className={styles.notice}>{notice}</p> : null}
          </section>

          <section className={styles.list}>
            <h2 className={styles.sectionTitle}>
              団員一覧{' '}
              <span className={styles.count}>
                （出撃 {formationCount(save)} / {PARTY_MAX}）
              </span>
            </h2>

            {/* フィルター/ソート */}
            <div className={styles.filters}>
              <select
                className={styles.filter}
                value={raceFilter}
                onChange={(e) => setRaceFilter(e.target.value)}
              >
                <option value="all">種族: すべて</option>
                {presentRaces.map((id) => (
                  <option
                    key={id}
                    value={id}
                  >
                    {RACES[id].name}
                  </option>
                ))}
              </select>
              <select
                className={styles.filter}
                value={classFilter}
                onChange={(e) => setClassFilter(e.target.value)}
              >
                <option value="all">職業: すべて</option>
                {presentClasses.map((id) => (
                  <option
                    key={id}
                    value={id}
                  >
                    {CLASSES[id].name}
                  </option>
                ))}
              </select>
              <select
                className={styles.filter}
                value={sort}
                onChange={(e) => setSort(e.target.value as SortKey)}
              >
                {(Object.keys(SORT_LABEL) as SortKey[]).map((k) => (
                  <option
                    key={k}
                    value={k}
                  >
                    {SORT_LABEL[k]}
                  </option>
                ))}
              </select>
            </div>

            {members.length === 0 ? (
              <p className={styles.empty}>まだ冒険者がいません。</p>
            ) : rosterMembers.length === 0 ? (
              <p className={styles.empty}>条件に合う団員がいません。</p>
            ) : (
              <ul className={styles.members}>
                {rosterMembers.map((m) => {
                  const pos = positionOf(save, m.id);
                  return (
                    <li
                      key={m.id}
                      className={styles.member}
                    >
                      <button
                        type="button"
                        className={styles.memberMain}
                        onClick={() => navigate({ name: 'guildChar', id: m.id })}
                      >
                        <span className={styles.memberName}>
                          {m.name}
                          <span className={`${styles.pos} ${styles[`pos_${pos}`] ?? ''}`}>
                            {pos}
                          </span>
                        </span>
                        <span className={styles.memberSub}>{memberLine(m)} ›</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </section>
        </>
      ) : null}

      {/* ===== 2ページ目: パーティー編成 ===== */}
      {tab === 'party' ? (
        <section className={styles.list}>
          <h2 className={styles.sectionTitle}>
            パーティー編成{' '}
            <span className={styles.count}>
              （出撃 {formationCount(save)} / {PARTY_MAX}）
            </span>
          </h2>
          <p className={styles.hint}>枠をタップして編成する団員を選びます。</p>

          <div className={styles.slotGroup}>
            <div className={styles.slotGroupLabel}>前衛</div>
            {Array.from({ length: FORMATION_FRONT_SLOTS }).map((_, idx) => {
              const id = slotMemberId('front', idx);
              const m = id ? members.find((x) => x.id === id) : null;
              return (
                <button
                  key={`front_${idx}`}
                  type="button"
                  className={`${styles.slot} ${m ? styles.slotFilled : styles.slotEmpty}`}
                  onClick={() => {
                    play('cursor');
                    setPicker({ row: 'front', idx });
                  }}
                >
                  {m ? (
                    <>
                      <span className={styles.slotName}>{m.name}</span>
                      <span className={styles.slotSub}>{memberLine(m)}</span>
                    </>
                  ) : (
                    <span className={styles.slotPlaceholder}>＋ 前衛{idx + 1}（空き）</span>
                  )}
                </button>
              );
            })}
          </div>

          <div className={styles.slotGroup}>
            <div className={styles.slotGroupLabel}>後衛（近接ダメージ -30%）</div>
            {Array.from({ length: FORMATION_BACK_SLOTS }).map((_, idx) => {
              const id = slotMemberId('back', idx);
              const m = id ? members.find((x) => x.id === id) : null;
              return (
                <button
                  key={`back_${idx}`}
                  type="button"
                  className={`${styles.slot} ${m ? styles.slotFilled : styles.slotEmpty}`}
                  onClick={() => {
                    play('cursor');
                    setPicker({ row: 'back', idx });
                  }}
                >
                  {m ? (
                    <>
                      <span className={styles.slotName}>{m.name}</span>
                      <span className={styles.slotSub}>{memberLine(m)}</span>
                    </>
                  ) : (
                    <span className={styles.slotPlaceholder}>＋ 後衛{idx + 1}（空き）</span>
                  )}
                </button>
              );
            })}
          </div>
        </section>
      ) : null}

      {/* ===== 3ページ目: 団員追放 ===== */}
      {tab === 'banish' ? (
        <section className={styles.list}>
          <h2 className={styles.sectionTitle}>団員追放</h2>
          <p className={styles.hint}>追放した団員は元に戻せません。</p>
          {members.length === 0 ? (
            <p className={styles.empty}>追放できる団員がいません。</p>
          ) : (
            <ul className={styles.members}>
              {members.map((m) => (
                <li
                  key={m.id}
                  className={styles.member}
                >
                  <div className={styles.memberMain}>
                    <span className={styles.memberName}>{m.name}</span>
                    <span className={styles.memberSub}>{memberLine(m)}</span>
                  </div>
                  <button
                    type="button"
                    className={styles.banishBtn}
                    onClick={() => setBanishId(m.id)}
                  >
                    追放
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>
      ) : null}

      <footer className={styles.foot}>
        <button
          type="button"
          className={styles.sub}
          onClick={() => navigate({ name: 'town' })}
        >
          拠点へ戻る
        </button>
      </footer>

      {/* 編成スロットの団員ピッカー */}
      {picker ? (
        <div
          className={styles.overlay}
          onClick={() => setPicker(null)}
        >
          <div
            className={styles.panel}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.panelTitle}>
              {picker.row === 'front' ? '前衛' : '後衛'}
              {picker.idx + 1} に編成する団員
            </div>
            {slotMemberId(picker.row, picker.idx) ? (
              <button
                type="button"
                className={styles.removeRow}
                onClick={() =>
                  void applyAndPersist((s) => setSlot(s, picker.row, picker.idx, null)).then(() =>
                    setPicker(null)
                  )
                }
              >
                この枠を空ける（編成から外す）
              </button>
            ) : null}
            {members.length === 0 ? (
              <p className={styles.empty}>団員がいません。</p>
            ) : (
              <>
                {formationCount(save) >= PARTY_MAX ? (
                  <p className={styles.notice}>出撃は最大{PARTY_MAX}人です（現在満員）。</p>
                ) : null}
                <ul className={styles.pickerList}>
                  {members.map((m) => {
                    const pos = positionOf(save, m.id);
                    const here = slotMemberId(picker.row, picker.idx) === m.id;
                    // 編成外で満員の場合は配置ボタンを無効化（既に編成内なら移動として許可）
                    const isBenched = pos === '控え';
                    const disabled = isBenched && formationCount(save) >= PARTY_MAX;
                    return (
                      <li key={m.id}>
                        <button
                          type="button"
                          className={`${styles.pickerItem} ${here ? styles.pickerItemActive : ''}`}
                          disabled={disabled}
                          onClick={() =>
                            void applyAndPersist((s) =>
                              setSlot(s, picker.row, picker.idx, m.id)
                            ).then(() => setPicker(null))
                          }
                        >
                          <span className={styles.memberName}>
                            {m.name}
                            <span className={`${styles.pos} ${styles[`pos_${pos}`] ?? ''}`}>
                              {pos}
                            </span>
                          </span>
                          <span className={styles.memberSub}>{memberLine(m)}</span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </>
            )}
            <button
              type="button"
              className={styles.panelClose}
              onClick={() => setPicker(null)}
            >
              とじる
            </button>
          </div>
        </div>
      ) : null}

      {/* 追放の確認ダイアログ */}
      {banishTarget ? (
        <div
          className={styles.overlay}
          onClick={() => setBanishId(null)}
        >
          <div
            className={styles.confirmBox}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.confirmText}>
              Lv{banishTarget.level} {banishTarget.name}（{RACES[banishTarget.raceId]?.name}{' '}
              {CLASSES[banishTarget.classId]?.name}）を追放します。よろしいですか？
            </div>
            <div className={styles.confirmActions}>
              <button
                type="button"
                className={styles.confirmCancel}
                onClick={() => setBanishId(null)}
              >
                いいえ
              </button>
              <button
                type="button"
                className={styles.confirmOk}
                onClick={() => {
                  play('cancel');
                  const id = banishTarget.id;
                  void applyAndPersist((s) => removeCharacterFromGuild(s, id));
                  setBanishId(null);
                }}
              >
                はい
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};
