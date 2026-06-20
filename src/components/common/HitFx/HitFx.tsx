import { useEffect } from 'react';

import { useSfx } from '@/audio/useSfx';
import { AttackFx } from '@/components/common/AttackFx/AttackFx';
import { DamagePop } from '@/components/common/DamagePop/DamagePop';
import type { Element } from '@/domain/types';

export type HitFxVariant = 'damage' | 'heal' | 'crit';

export interface HitFxProps {
  /**
   * AttackFx を出すなら属性を指定。
   * undefined のとき attack DOM/SE は出ない（heal などのケース、または味方側）。
   */
  element?: Element;
  variant: HitFxVariant;
  value: number | string;
  isCrit?: boolean;
  /** 被弾者が味方なら true → damage SE を鳴らす */
  isAllyTarget?: boolean;
  /** EffectsGallery プレビュー用、true で SE 抑制 */
  silent?: boolean;
  /** アニメーション完了コールバック（DamagePop から伝播） */
  onDone?: () => void;
}

/**
 * HitFx
 * AttackFx（敵側のみ）と DamagePop を合成する wrapper。
 * マウント時に attack/critical/damage/heal SE を集約発火する。
 *
 * - element が指定されている場合: AttackFx を表示し、attack/critical SE を発火
 * - variant='damage' && isAllyTarget: damage SE を発火（敵から味方への攻撃）
 * - variant='heal' && element 無し: heal SE を発火
 * - silent=true: SE をすべて抑制（EffectsGallery 用）
 */
export const HitFx = ({
  element,
  variant,
  value,
  isCrit = false,
  isAllyTarget = false,
  silent = false,
  onDone,
}: HitFxProps) => {
  const play = useSfx();

  useEffect(() => {
    if (silent) return;

    if (element) {
      // 攻撃エフェクトを伴うヒット
      play('attack');
      if (isCrit) play('critical');
      // 被弾者が味方のときのみ damage SE を鳴らす（敵被弾時は attack SE のみ）
      if (variant === 'damage' && isAllyTarget) play('damage');
    } else if (variant === 'heal') {
      // 回復（element なし）
      play('heal');
    }
    // マウント時 1 回のみ発火。key で remount される前提。
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {element && (
        <AttackFx
          element={element}
          isCrit={isCrit}
          silent
        />
      )}
      <DamagePop
        value={value}
        variant={variant}
        element={element}
        onDone={onDone}
      />
    </>
  );
};
