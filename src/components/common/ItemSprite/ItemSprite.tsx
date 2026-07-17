import styles from './style.module.scss';

import { COLLECTIBLE_BY_ENEMY } from '@/data/collectibles';
import { ENEMIES } from '@/data/enemies';
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
// v3.0.0 §9: 換金アイテム・ジェム限定装備・新消耗品の個別 hue もここに追加する。
const ITEM_HUE_OVERRIDES: Record<string, number> = {
  item_mat_t0_soft_pelt: 0, // 茶のまま（やわらかな毛皮）
  item_mat_t2_frost_pelt: 180, // 青系（霜降りの毛皮）
  item_mat_t3_charged_hide: 240, // 紫系（帯電した獣皮）
  // 換金アイテム（ジェム原石系）
  item_gem_shard: 120,
  item_gem_stone: 30,
  item_gem_cluster: 280,
  item_gem_prism: 320,
  // ジェム限定装備（11種。equip_collector_crown は含まない）。charm のみ個別上書き。
  equip_gem_sword: 315,
  equip_gem_spear: 315,
  equip_gem_axe: 315,
  equip_gem_bow: 315,
  equip_gem_fist: 315,
  equip_gem_staff: 315,
  equip_gem_heavy: 315,
  equip_gem_light: 315,
  equip_gem_clothes: 315,
  equip_gem_ring: 315,
  equip_gem_charm: 45,
  equip_collector_crown: 0,
  // 新消耗品
  item_ex_potion: 40,
  item_miracle_potion: 300,
  item_panacea: 90,
  item_revive_drop: 200,
  item_power_water: 0,
  item_guard_water: 120,
  item_magic_water: 260,
  item_tp_elixir: 320,
};

// 秘宝（item_col_*）の tierBand 別 hue（帯0..4）。
const COLLECTIBLE_BAND_HUES: readonly number[] = [0, 60, 180, 260, 320];

// item_col_* の itemId → 敵の tierBand の逆引き（COLLECTIBLE_BY_ENEMY + ENEMIES から算出）。
const COLLECTIBLE_ITEM_BAND: Record<string, number> = Object.fromEntries(
  Object.entries(COLLECTIBLE_BY_ENEMY).map(([enemyId, itemId]) => [
    itemId,
    ENEMIES[enemyId].tierBand,
  ])
);

function getHueShift(itemId: ItemId): number {
  // 秘宝（item_col_*）は個別列挙ではなく、敵の tierBand から動的算出する。
  const band = COLLECTIBLE_ITEM_BAND[itemId];
  if (band !== undefined) return COLLECTIBLE_BAND_HUES[band] ?? 0;
  // ITEM_HUE_OVERRIDES を最初に見る（EQUIPMENT 分岐より優先）。
  const override = ITEM_HUE_OVERRIDES[itemId];
  if (override !== undefined) return override;
  const eq = EQUIPMENT[itemId as keyof typeof EQUIPMENT];
  if (eq) {
    if (eq.slot === 'weapon') {
      if (eq.weaponType === 'sword' || eq.weaponType === 'fist') return 0; // tier 別色違い画像あり
      return TIER_HUE_SHIFTS[eq.tier] ?? 0;
    }
    if (eq.slot === 'armor' && (eq.armorType === 'clothes' || eq.armorType === 'light')) {
      // 衣（clothes）と軽装（light）はユーザー提供の同一ベース画像を使い、
      // tier 別に hue-rotate で色違いを表現
      return TIER_HUE_SHIFTS[eq.tier] ?? 0;
    }
  }
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
  const url = itemSpriteUrl(itemId);
  if (!url) return null;

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
        src={url}
        alt={resolvedAlt}
        className={`${styles.img} ${styles[size]} ${silhouette ? styles.silhouette : ''}`}
        style={filterStyle}
      />
    </span>
  );
};
