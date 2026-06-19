import styles from './style.module.scss';

import { EQUIPMENT } from '@/data/equipment';
import type { ItemId } from '@/domain/types';
import { itemSpriteUrl } from '@/sprites/itemSpriteUrl';

// ============================================================================
// アイテム/装備スプライト表示コンポーネント。
// size で表示サイズ、silhouette でシルエット化を制御する。
// equip_* / item_* のどちらの ItemId も扱える。
//
// 剣以外の武器（slot=weapon, weaponType!=sword）は、tier 別に CSS hue-rotate を
// inline style で付与して色違いを表現する。剣は tier 別色違い画像があるため除外。
// ============================================================================

type Size = 'sm' | 'md' | 'lg'; // sm: ~24px, md: ~48px, lg: ~96px

// T0〜T5 の色相シフト（deg）。T0 はシフトなし。
const TIER_HUE_SHIFTS: readonly number[] = [0, 40, 100, 180, 240, 290];

// 同一ベース画像を使う「アイテム素材」の hue-rotate 個別指定（毛皮 3 個）。
// 茶色ベースの毛皮画像を、tier の特性（やわらか/霜降り/帯電）に合わせて色相を回す。
const ITEM_HUE_OVERRIDES: Record<string, number> = {
  item_mat_t0_soft_pelt: 0, // 茶のまま（やわらかな毛皮）
  item_mat_t2_frost_pelt: 180, // 青系（霜降りの毛皮）
  item_mat_t3_charged_hide: 240, // 紫系（帯電した獣皮）
};

function getHueShift(itemId: ItemId): number {
  const eq = EQUIPMENT[itemId as keyof typeof EQUIPMENT];
  if (eq) {
    if (eq.slot === 'weapon') {
      if (eq.weaponType === 'sword' || eq.weaponType === 'fist') return 0; // tier 別色違い画像あり
      return TIER_HUE_SHIFTS[eq.tier] ?? 0;
    }
    if (eq.slot === 'armor' && eq.armorType === 'clothes') {
      // 衣（clothes）は同一ベース画像を使い、tier 別に hue-rotate で色違いを表現
      return TIER_HUE_SHIFTS[eq.tier] ?? 0;
    }
  }
  // アイテム素材の個別 hue 指定
  const override = ITEM_HUE_OVERRIDES[itemId];
  if (override !== undefined) return override;
  return 0;
}

type Props = {
  itemId: ItemId; // equip_* or item_*
  size?: Size; // default 'sm'（リスト内が主用途）
  silhouette?: boolean;
  alt?: string;
  className?: string;
};

export const ItemSprite = ({ itemId, size = 'sm', silhouette = false, alt, className }: Props) => {
  const resolvedAlt = alt ?? '';
  const hueShift = getHueShift(itemId);

  // silhouette と hue-rotate を合成。silhouette は CSS クラスで brightness/contrast を当てるが
  // filter プロパティは上書きになるため、inline style と CSS クラスを両立させる。
  // silhouette=true のときは hue-rotate を無効化（シルエット表示では色は不要）。
  const filterStyle =
    !silhouette && hueShift !== 0 ? { filter: `hue-rotate(${hueShift}deg)` } : undefined;

  return (
    <span className={`${styles.wrap} ${className ?? ''}`}>
      <img
        src={itemSpriteUrl(itemId)}
        alt={resolvedAlt}
        className={`${styles.img} ${styles[size]} ${silhouette ? styles.silhouette : ''}`}
        style={filterStyle}
      />
    </span>
  );
};
