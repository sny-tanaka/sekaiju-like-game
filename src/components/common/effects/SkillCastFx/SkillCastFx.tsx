import { useEffect, useRef } from 'react';

import styles from './SkillCastFx.module.scss';

import { useSfx } from '@/audio/useSfx';

const ANIM_MS = 800;

export interface SkillCastFxProps {
  visible: boolean;
  silent?: boolean;
  inline?: boolean;
  onDone?: () => void;
}

/**
 * SkillCastFx
 * スキル詠唱演出コンポーネント。
 * actor カードの上に回転する魔法陣 + 金色オーラを 0.8s 表示する。
 * visible false→true のエッジで 'skill' SE を発火する（silent=true で抑制）。
 * ANIM_MS + 50ms 後に onDone を呼び出す。
 * EffectsGallery プレビューは silent=true inline=true で表示する。
 */
export const SkillCastFx = ({
  visible,
  silent = false,
  inline = false,
  onDone,
}: SkillCastFxProps) => {
  const play = useSfx();
  const prevVisibleRef = useRef(false);

  // onDone は ref で逃がしているので deps に含めない。
  // 含めると親の毎 render での onDone 再生成で setTimeout が cleanup され、
  // 単独 Fx 経路（TP 回復のようなダメージなし行動）で進行不能になる。
  const onDoneRef = useRef(onDone);
  useEffect(() => {
    onDoneRef.current = onDone;
  }, [onDone]);

  useEffect(() => {
    if (visible && !prevVisibleRef.current) {
      if (!silent) play('skill');
      const t = setTimeout(() => onDoneRef.current?.(), ANIM_MS + 50);
      prevVisibleRef.current = true;
      return () => clearTimeout(t);
    }
    if (!visible) prevVisibleRef.current = false;
    return undefined;
  }, [visible, silent, play]); // onDone は ref 経由で呼ぶため deps に含めない（含めると cleanup で setTimeout が消える）

  if (!visible) return null;
  return (
    <div
      className={`${styles.skillCastFx}${inline ? ' ' + styles.inline : ''}`}
      aria-hidden="true"
    >
      <div className={styles.rune} />
      <div className={styles.aura} />
    </div>
  );
};
