import { useCallback, useMemo, useState } from 'react';

import styles from './style.module.scss';

import { useSfx } from '@/audio/useSfx';
import { CharacterPortrait } from '@/components/common/CharacterPortrait/CharacterPortrait';
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

type Tab = 'create' | 'roster' | 'party' | 'banish';
type Pos = '前衛' | '後衛' | '控え';
type SortKey = 'created' | 'levelDesc' | 'levelAsc';

const SORT_LABEL: Record<SortKey, string> = {
  created: '作成順',
  levelDesc: 'Lv ↓',
  levelAsc: 'Lv ↑',
};

const NO_MEMBERS: Character[] = []; // フォールバックを安定参照にして useMemo の再計算を防ぐ

// 種族カードのシンボル絵文字
const RACE_SYMBOLS: Record<string, string> = {
  race_human: '🧑',
  race_golan: '🪨',
  race_therian: '🐾',
  race_pix: '✨',
  race_undine: '💧',
  race_draken: '🐉',
};

function positionOf(save: SaveData, charId: string): Pos {
  if (save.guild.party.front.includes(charId)) return '前衛';
  if (save.guild.party.back.includes(charId)) return '後衛';
  return '控え';
}

// ギルド管理（[01 §9]・issue #26）。作成 / 一覧 / 編成 / 追放の4タブ構成。
export const Page = () => {
  const { navigate } = useNavigation();
  const { save, applyAndPersist } = useGameState();
  const play = useSfx();

  const raceIds = Object.keys(RACES);
  const classIds = Object.keys(CLASSES);
  const [tab, setTab] = useState<Tab>('create');

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
    `${RACES[m.raceId]?.name} ・ ${CLASSES[m.classId]?.name} ・ Lv${m.level}`;

  return (
    <div className={styles.layout}>
      {/* ヘッダー */}
      <header className={styles.head}>
        <h1 className={styles.title}>ギルド管理</h1>
        <span className={styles.count}>
          {members.length}
          <span className={styles.countLimit}> / {GUILD_MEMBER_LIMIT}</span>
        </span>
      </header>

      {/* タブバー */}
      <div className={styles.tabs}>
        {(['create', 'roster', 'party', 'banish'] as const).map((t) => {
          const labels: Record<Tab, string> = {
            create: '作成',
            roster: '一覧',
            party: '編成',
            banish: '追放',
          };
          return (
            <button
              key={t}
              type="button"
              className={`${styles.tab} ${tab === t ? styles.tabActive : ''}`}
              onClick={() => {
                play('cursor');
                setNotice(null);
                setTab(t);
              }}
            >
              {labels[t]}
            </button>
          );
        })}
      </div>

      {/* body */}
      <div className={styles.body}>
        {/* ===== 作成タブ ===== */}
        {tab === 'create' ? (
          <>
            {/* 名前入力 */}
            <div className={styles.nameBlock}>
              <span className={styles.nameLabel}>
                名前 <span className={styles.nameLabelSub}>（最大16字）</span>
              </span>
              <div className={styles.nameInput}>
                <input
                  type="text"
                  value={name}
                  maxLength={16}
                  placeholder="名もなき冒険者"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>

            {/* 種族グリッド */}
            <div className={styles.gridLabel}>種族 ・ {raceIds.length}種</div>
            <div className={styles.raceGrid}>
              {raceIds.map((id) => (
                <button
                  key={id}
                  type="button"
                  className={`${styles.raceCard} ${raceId === id ? styles.raceCardActive : ''}`}
                  onClick={() => {
                    play('cursor');
                    setRaceId(id);
                  }}
                >
                  <span className={styles.raceCardSymbol}>{RACE_SYMBOLS[id] ?? '🌟'}</span>
                  <span className={styles.raceCardName}>{RACES[id]?.name}</span>
                </button>
              ))}
            </div>

            {/* 種族説明カード */}
            <div className={styles.raceInfoWrap}>
              <RaceInfoCard raceId={raceId} />
            </div>

            {/* 職業チップ */}
            <div className={styles.gridLabel}>職業 ・ {classIds.length}種</div>
            <div className={styles.classChips}>
              {classIds.map((id) => (
                <button
                  key={id}
                  type="button"
                  className={`${styles.classChip} ${classId === id ? styles.classChipActive : ''}`}
                  onClick={() => {
                    play('cursor');
                    setClassId(id);
                  }}
                >
                  {CLASSES[id]?.name}
                </button>
              ))}
            </div>

            {/* 職業説明カード */}
            <div className={styles.classInfoWrap}>
              <ClassInfoCard classId={classId} />
            </div>

            {/* プレビューカード */}
            <div className={styles.previewCard}>
              <CharacterPortrait
                raceId={raceId}
                classId={classId}
                size={52}
              />
              <div className={styles.previewMeta}>
                <span className={styles.previewHelper}>プレビュー</span>
                <span className={styles.previewName}>{name.trim() || '名もなき冒険者'}</span>
                <span className={styles.previewRaceClass}>
                  {RACES[raceId]?.name} ・ {CLASSES[classId]?.name}
                </span>
              </div>
            </div>

            {notice ? <p className={styles.notice}>{notice}</p> : null}
          </>
        ) : null}

        {/* ===== 一覧タブ ===== */}
        {tab === 'roster' ? (
          <>
            {/* フィルター */}
            <div className={styles.filterRow}>
              <select
                className={styles.filterSelect}
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
                className={styles.filterSelect}
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
                className={`${styles.filterSelect} ${styles.filterSelectSmall}`}
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
                  const rowClass =
                    pos === '前衛'
                      ? styles.memberRowFront
                      : pos === '控え'
                        ? styles.memberRowBench
                        : '';
                  const tagClass =
                    pos === '前衛'
                      ? styles.posTagFront
                      : pos === '後衛'
                        ? styles.posTagBack
                        : styles.posTagBench;
                  const arrowClass = pos === '控え' ? styles.memberArrowBench : '';
                  return (
                    <li key={m.id}>
                      <button
                        type="button"
                        className={`${styles.memberRow} ${rowClass}`}
                        onClick={() => navigate({ name: 'guildChar', id: m.id })}
                      >
                        <div className={styles.memberPortrait}>
                          <CharacterPortrait
                            raceId={m.raceId}
                            classId={m.classId}
                            size={36}
                          />
                        </div>
                        <div className={styles.memberMeta}>
                          <div className={styles.memberNameRow}>
                            <span className={styles.memberName}>{m.name}</span>
                            <span className={`${styles.posTag} ${tagClass}`}>{pos}</span>
                          </div>
                          <span className={styles.memberSub}>{memberLine(m)}</span>
                        </div>
                        <span className={`${styles.memberArrow} ${arrowClass}`}>›</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </>
        ) : null}

        {/* ===== 編成タブ ===== */}
        {tab === 'party' ? (
          <>
            {/* 前衛 */}
            <div className={styles.partySection}>
              <div className={styles.partyHeading}>前衛 ・ FRONT</div>
              <div className={styles.slotGrid}>
                {Array.from({ length: FORMATION_FRONT_SLOTS }).map((_, idx) => {
                  const id = slotMemberId('front', idx);
                  const m = id ? members.find((x) => x.id === id) : null;
                  return (
                    <button
                      key={`front_${idx}`}
                      type="button"
                      className={`${styles.slotCard} ${m ? styles.slotCardFront : styles.slotCardEmpty}`}
                      onClick={() => {
                        play('cursor');
                        setPicker({ row: 'front', idx });
                      }}
                    >
                      {m ? (
                        <>
                          <div className={styles.slotPortrait}>
                            <CharacterPortrait
                              raceId={m.raceId}
                              classId={m.classId}
                              size={46}
                            />
                          </div>
                          <span className={styles.slotName}>{m.name}</span>
                        </>
                      ) : (
                        <span>＋</span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 後衛 */}
            <div className={styles.partySection}>
              <div className={`${styles.partyHeading} ${styles.partyHeadingBack}`}>
                後衛 ・ BACK
                <span className={styles.partyHeadingSub}>近接ダメージ −30%</span>
              </div>
              <div className={styles.slotGrid}>
                {Array.from({ length: FORMATION_BACK_SLOTS }).map((_, idx) => {
                  const id = slotMemberId('back', idx);
                  const m = id ? members.find((x) => x.id === id) : null;
                  return (
                    <button
                      key={`back_${idx}`}
                      type="button"
                      className={`${styles.slotCard} ${m ? styles.slotCardBack : styles.slotCardEmpty}`}
                      onClick={() => {
                        play('cursor');
                        setPicker({ row: 'back', idx });
                      }}
                    >
                      {m ? (
                        <>
                          <div className={styles.slotPortrait}>
                            <CharacterPortrait
                              raceId={m.raceId}
                              classId={m.classId}
                              size={46}
                            />
                          </div>
                          <span className={styles.slotName}>{m.name}</span>
                        </>
                      ) : (
                        <span>＋</span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </>
        ) : null}

        {/* ===== 追放タブ ===== */}
        {tab === 'banish' ? (
          <>
            {members.length === 0 ? (
              <p className={styles.empty}>追放できる団員がいません。</p>
            ) : (
              <ul className={styles.members}>
                {members.map((m) => {
                  const isHighlight = banishId === m.id;
                  return (
                    <li key={m.id}>
                      <div
                        className={`${styles.banishRow} ${isHighlight ? styles.banishRowHighlight : ''}`}
                      >
                        <div className={styles.memberPortrait}>
                          <CharacterPortrait
                            raceId={m.raceId}
                            classId={m.classId}
                            size={36}
                          />
                        </div>
                        <div className={styles.memberMeta}>
                          <span className={styles.memberName}>{m.name}</span>
                          <span className={styles.memberSub}>{memberLine(m)}</span>
                        </div>
                        <button
                          type="button"
                          className={`${styles.banishBtn} ${isHighlight ? styles.banishBtnHighlight : ''}`}
                          onClick={() => setBanishId(m.id)}
                        >
                          追放
                        </button>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </>
        ) : null}
      </div>

      {/* フッタ */}
      <footer className={styles.foot}>
        {tab === 'create' ? (
          <button
            type="button"
            className={styles.primary}
            disabled={busy || isFull}
            onClick={() => void handleCreate()}
          >
            {isFull ? '団員が上限です' : '作成する'}
          </button>
        ) : (
          <button
            type="button"
            className={styles.sub}
            onClick={() => navigate({ name: 'town' })}
          >
            拠点へ戻る
          </button>
        )}
      </footer>

      {/* 編成スロットの団員ピッカー（bottom sheet） */}
      {picker ? (
        <div
          className={styles.overlay}
          onClick={() => setPicker(null)}
        >
          <div
            className={styles.sheet}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.sheetHandle} />
            <div className={styles.sheetTitle}>
              {picker.row === 'front' ? '前衛' : '後衛'}スロットへ配置
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
                    const isBenched = pos === '控え';
                    const disabled = isBenched && formationCount(save) >= PARTY_MAX;
                    const tagClass =
                      pos === '前衛'
                        ? styles.posTagFront
                        : pos === '後衛'
                          ? styles.posTagBack
                          : styles.posTagBench;
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
                          <div className={styles.memberPortrait}>
                            <CharacterPortrait
                              raceId={m.raceId}
                              classId={m.classId}
                              size={36}
                            />
                          </div>
                          <div className={styles.pickerItemMeta}>
                            <span className={styles.pickerItemName}>
                              {m.name}
                              <span className={`${styles.posTag} ${tagClass}`}>{pos}</span>
                            </span>
                            <span className={styles.pickerItemSub}>{memberLine(m)}</span>
                          </div>
                          <span className={styles.pickerItemAssign}>配置</span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </>
            )}
            <button
              type="button"
              className={styles.sheetClose}
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
          className={styles.dialogOverlay}
          onClick={() => setBanishId(null)}
        >
          <div
            className={styles.confirmBox}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.confirmSymbol}>
              <CharacterPortrait
                raceId={banishTarget.raceId}
                classId={banishTarget.classId}
                size={36}
              />
            </div>
            <p className={styles.confirmTitle}>{banishTarget.name} を追放しますか？</p>
            <div className={styles.confirmWarn}>
              追放した団員は二度と戻りません。装備は倉庫に返却されます。
            </div>
            <div className={styles.confirmActions}>
              <button
                type="button"
                className={styles.confirmCancel}
                onClick={() => setBanishId(null)}
              >
                もどる
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
                追放する
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};
