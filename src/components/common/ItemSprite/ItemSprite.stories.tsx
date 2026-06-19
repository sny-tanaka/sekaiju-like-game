import { type Meta, type StoryObj } from '@storybook/react-vite';

import { ItemSprite } from './ItemSprite';

type T = typeof ItemSprite;

export default {
  component: ItemSprite,
  title: 'common/ItemSprite',
} satisfies Meta<T>;

// 武器代表（短剣・短剣・斧・弓・スタッフ・各tierの剣）を size='sm' で並べる
export const Weapons: StoryObj<T> = {
  render: () => (
    <div
      style={{
        display: 'flex',
        gap: '12px',
        flexWrap: 'wrap',
        background: '#F5F0E8',
        padding: '16px',
        alignItems: 'center',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
        <ItemSprite
          itemId="equip_short_sword"
          size="sm"
        />
        <span style={{ fontSize: '10px', color: '#666' }}>short_sword</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
        <ItemSprite
          itemId="equip_rat_dagger"
          size="sm"
        />
        <span style={{ fontSize: '10px', color: '#666' }}>rat_dagger</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
        <ItemSprite
          itemId="equip_battle_axe"
          size="sm"
        />
        <span style={{ fontSize: '10px', color: '#666' }}>battle_axe</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
        <ItemSprite
          itemId="equip_short_bow"
          size="sm"
        />
        <span style={{ fontSize: '10px', color: '#666' }}>short_bow</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
        <ItemSprite
          itemId="equip_oak_staff"
          size="sm"
        />
        <span style={{ fontSize: '10px', color: '#666' }}>oak_staff</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
        <ItemSprite
          itemId="equip_iron_spear"
          size="sm"
        />
        <span style={{ fontSize: '10px', color: '#666' }}>iron_spear</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
        <ItemSprite
          itemId="equip_t2_sword"
          size="sm"
        />
        <span style={{ fontSize: '10px', color: '#666' }}>t2_sword</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
        <ItemSprite
          itemId="equip_t3_axe"
          size="sm"
        />
        <span style={{ fontSize: '10px', color: '#666' }}>t3_axe</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
        <ItemSprite
          itemId="equip_t4_bow"
          size="sm"
        />
        <span style={{ fontSize: '10px', color: '#666' }}>t4_bow</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
        <ItemSprite
          itemId="equip_golem_blade"
          size="sm"
        />
        <span style={{ fontSize: '10px', color: '#666' }}>golem_blade</span>
      </div>
    </div>
  ),
};

// 防具代表（ヘビー各色・ライト・クロース・アクセサリー各tier）を size='sm' で並べる
export const Armor: StoryObj<T> = {
  render: () => (
    <div
      style={{
        display: 'flex',
        gap: '12px',
        flexWrap: 'wrap',
        background: '#F5F0E8',
        padding: '16px',
        alignItems: 'center',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
        <ItemSprite
          itemId="equip_iron_armor"
          size="sm"
        />
        <span style={{ fontSize: '10px', color: '#666' }}>iron_armor</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
        <ItemSprite
          itemId="equip_leather_armor"
          size="sm"
        />
        <span style={{ fontSize: '10px', color: '#666' }}>leather_armor</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
        <ItemSprite
          itemId="equip_cloth_robe"
          size="sm"
        />
        <span style={{ fontSize: '10px', color: '#666' }}>cloth_robe</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
        <ItemSprite
          itemId="equip_slime_shield"
          size="sm"
        />
        <span style={{ fontSize: '10px', color: '#666' }}>slime_shield</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
        <ItemSprite
          itemId="equip_amulet"
          size="sm"
        />
        <span style={{ fontSize: '10px', color: '#666' }}>amulet</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
        <ItemSprite
          itemId="equip_t2_heavy"
          size="sm"
        />
        <span style={{ fontSize: '10px', color: '#666' }}>t2_heavy</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
        <ItemSprite
          itemId="equip_t3_light"
          size="sm"
        />
        <span style={{ fontSize: '10px', color: '#666' }}>t3_light</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
        <ItemSprite
          itemId="equip_t4_clothes"
          size="sm"
        />
        <span style={{ fontSize: '10px', color: '#666' }}>t4_clothes</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
        <ItemSprite
          itemId="equip_t5_accessory"
          size="sm"
        />
        <span style={{ fontSize: '10px', color: '#666' }}>t5_accessory</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
        <ItemSprite
          itemId="equip_bat_cloak"
          size="sm"
        />
        <span style={{ fontSize: '10px', color: '#666' }}>bat_cloak</span>
      </div>
    </div>
  ),
};

// 消耗品・食材・料理を size='sm' で並べる
export const Consumables: StoryObj<T> = {
  render: () => (
    <div
      style={{
        display: 'flex',
        gap: '12px',
        flexWrap: 'wrap',
        background: '#F5F0E8',
        padding: '16px',
        alignItems: 'center',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
        <ItemSprite
          itemId="item_potion"
          size="sm"
        />
        <span style={{ fontSize: '10px', color: '#666' }}>potion</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
        <ItemSprite
          itemId="item_hi_potion"
          size="sm"
        />
        <span style={{ fontSize: '10px', color: '#666' }}>hi_potion</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
        <ItemSprite
          itemId="item_tp_herb"
          size="sm"
        />
        <span style={{ fontSize: '10px', color: '#666' }}>tp_herb</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
        <ItemSprite
          itemId="item_tp_herb_mid"
          size="sm"
        />
        <span style={{ fontSize: '10px', color: '#666' }}>tp_herb_mid</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
        <ItemSprite
          itemId="item_tp_herb_hi"
          size="sm"
        />
        <span style={{ fontSize: '10px', color: '#666' }}>tp_herb_hi</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
        <ItemSprite
          itemId="item_medic_herb"
          size="sm"
        />
        <span style={{ fontSize: '10px', color: '#666' }}>medic_herb</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
        <ItemSprite
          itemId="item_return_thread"
          size="sm"
        />
        <span style={{ fontSize: '10px', color: '#666' }}>return_thread</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
        <ItemSprite
          itemId="item_food_fish"
          size="sm"
        />
        <span style={{ fontSize: '10px', color: '#666' }}>food_fish</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
        <ItemSprite
          itemId="item_food_meat"
          size="sm"
        />
        <span style={{ fontSize: '10px', color: '#666' }}>food_meat</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
        <ItemSprite
          itemId="item_dish_grilled_fish"
          size="sm"
        />
        <span style={{ fontSize: '10px', color: '#666' }}>dish_grilled_fish</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
        <ItemSprite
          itemId="item_dish_grilled_meat"
          size="sm"
        />
        <span style={{ fontSize: '10px', color: '#666' }}>dish_grilled_meat</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
        <ItemSprite
          itemId="item_dish_nut_platter"
          size="sm"
        />
        <span style={{ fontSize: '10px', color: '#666' }}>dish_nut_platter</span>
      </div>
    </div>
  ),
};
