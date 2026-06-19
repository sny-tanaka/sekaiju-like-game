import type { Meta, StoryObj } from '@storybook/react';

import { CharacterPortrait } from '@/components/common/CharacterPortrait/CharacterPortrait';
import { EnemySprite } from '@/components/common/EnemySprite/EnemySprite';
import { ItemSprite } from '@/components/common/ItemSprite/ItemSprite';
import {
  SpriteCatalog,
  type CatalogEntry,
  type CatalogSection,
} from '@/components/dev/SpriteCatalog/SpriteCatalog';
import { CLASSES } from '@/data/classes';
import { ENEMIES } from '@/data/enemies';
import { EQUIPMENT } from '@/data/equipment';
import { ITEMS } from '@/data/items';
import { RACES } from '@/data/races';

// ============================================================================
// Dev/SpriteCatalog — マッピング確認専用カタログ Story。
// 画像と名前のミスマッチを 1 画面でレビューするための開発ツール。
// ============================================================================

const meta = {
  title: 'Dev/SpriteCatalog',
  component: SpriteCatalog,
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof SpriteCatalog>;

export default meta;
type Story = StoryObj<typeof meta>;

// ----------------------------------------------------------------------------
// 1. Enemies — 全 60 体
// ----------------------------------------------------------------------------

function buildEnemySections(): CatalogSection[] {
  const allEnemies = Object.values(ENEMIES);

  return [
    {
      title: 'Tier 0（序章・森林）',
      entries: allEnemies
        .filter((e) => e.tierBand === 0 && e.kind !== 'boss')
        .map((e) => ({
          id: e.id,
          name: e.name,
          sprite: (
            <EnemySprite
              enemyId={e.id}
              size="md"
            />
          ),
          badge: e.kind === 'foe' ? 'FOE' : '雑魚',
        })),
    },
    {
      title: 'Tier 1（山岳）',
      entries: allEnemies
        .filter((e) => e.tierBand === 1 && e.kind !== 'boss')
        .map((e) => ({
          id: e.id,
          name: e.name,
          sprite: (
            <EnemySprite
              enemyId={e.id}
              size="md"
            />
          ),
          badge: e.kind === 'foe' ? 'FOE' : '雑魚',
        })),
    },
    {
      title: 'Tier 2（氷雪）',
      entries: allEnemies
        .filter((e) => e.tierBand === 2 && e.kind !== 'boss')
        .map((e) => ({
          id: e.id,
          name: e.name,
          sprite: (
            <EnemySprite
              enemyId={e.id}
              size="md"
            />
          ),
          badge: e.kind === 'foe' ? 'FOE' : '雑魚',
        })),
    },
    {
      title: 'Tier 3（雷嵐）',
      entries: allEnemies
        .filter((e) => e.tierBand === 3 && e.kind !== 'boss')
        .map((e) => ({
          id: e.id,
          name: e.name,
          sprite: (
            <EnemySprite
              enemyId={e.id}
              size="md"
            />
          ),
          badge: e.kind === 'foe' ? 'FOE' : '雑魚',
        })),
    },
    {
      title: 'Tier 4（瘴気）',
      entries: allEnemies
        .filter((e) => e.tierBand === 4 && e.kind !== 'boss')
        .map((e) => ({
          id: e.id,
          name: e.name,
          sprite: (
            <EnemySprite
              enemyId={e.id}
              size="md"
            />
          ),
          badge: e.kind === 'foe' ? 'FOE' : '雑魚',
        })),
    },
    {
      title: 'ボス',
      entries: allEnemies
        .filter((e) => e.kind === 'boss')
        .map((e) => ({
          id: e.id,
          name: e.name,
          sprite: (
            <EnemySprite
              enemyId={e.id}
              size="md"
            />
          ),
          badge: 'BOSS',
        })),
    },
  ];
}

export const Enemies: Story = {
  args: {
    sections: buildEnemySections(),
    showReviewControls: true,
  },
};

// ----------------------------------------------------------------------------
// 2. Items — 全 46 個
// ----------------------------------------------------------------------------

function buildItemSections(): CatalogSection[] {
  const allItems = Object.values(ITEMS);

  const makeItemEntries = (ids: string[]): CatalogEntry[] =>
    ids.flatMap((id) => {
      const item = allItems.find((i) => i.id === id);
      if (!item) return [];
      return [
        {
          id: item.id,
          name: item.name,
          sprite: (
            <ItemSprite
              itemId={item.id}
              size="md"
            />
          ),
          badge: item.category,
        },
      ];
    });

  const consumableIds = allItems.filter((i) => i.category === 'consumable').map((i) => i.id);

  const monsterDropIds = ['item_slime_jelly', 'item_rat_tail', 'item_bat_wing', 'item_golem_core'];

  const gatherIds = ['item_ore', 'item_medic_herb', 'item_lumber'];

  const rawFoodIds = allItems.filter((i) => i.id.startsWith('item_food_')).map((i) => i.id);

  const dishIds = allItems.filter((i) => i.id.startsWith('item_dish_')).map((i) => i.id);

  const matT0Ids = allItems.filter((i) => i.id.startsWith('item_mat_t0_')).map((i) => i.id);
  const matT1Ids = allItems.filter((i) => i.id.startsWith('item_mat_t1_')).map((i) => i.id);
  const matT2Ids = allItems.filter((i) => i.id.startsWith('item_mat_t2_')).map((i) => i.id);
  const matT3Ids = allItems.filter((i) => i.id.startsWith('item_mat_t3_')).map((i) => i.id);
  const matT4Ids = allItems.filter((i) => i.id.startsWith('item_mat_t4_')).map((i) => i.id);

  return [
    { title: '消耗品', entries: makeItemEntries(consumableIds) },
    { title: '売却素材（モンスタードロップ）', entries: makeItemEntries(monsterDropIds) },
    { title: '採集素材', entries: makeItemEntries(gatherIds) },
    { title: '食材（生）', entries: makeItemEntries(rawFoodIds) },
    { title: '料理', entries: makeItemEntries(dishIds) },
    { title: 'Tier 0 ドロップ素材', entries: makeItemEntries(matT0Ids) },
    { title: 'Tier 1 ドロップ素材', entries: makeItemEntries(matT1Ids) },
    { title: 'Tier 2 ドロップ素材', entries: makeItemEntries(matT2Ids) },
    { title: 'Tier 3 ドロップ素材', entries: makeItemEntries(matT3Ids) },
    { title: 'Tier 4 ドロップ素材', entries: makeItemEntries(matT4Ids) },
  ];
}

export const Items: Story = {
  args: {
    sections: buildItemSections(),
    showReviewControls: true,
  },
};

// ----------------------------------------------------------------------------
// 3. Equipment — 全 54 個
// ----------------------------------------------------------------------------

function buildEquipmentSections(): CatalogSection[] {
  const allEquip = Object.values(EQUIPMENT);

  const makeEquipEntries = (predicate: (e: (typeof allEquip)[0]) => boolean): CatalogEntry[] =>
    allEquip
      .filter(predicate)
      .sort((a, b) => a.tier - b.tier)
      .map((e) => ({
        id: e.id,
        name: e.name,
        sprite: (
          <ItemSprite
            itemId={e.id}
            size="md"
          />
        ),
        badge: `tier ${e.tier}`,
      }));

  return [
    {
      title: '武器: sword（剣）',
      entries: makeEquipEntries((e) => e.slot === 'weapon' && e.weaponType === 'sword'),
    },
    {
      title: '武器: spear（槍）',
      entries: makeEquipEntries((e) => e.slot === 'weapon' && e.weaponType === 'spear'),
    },
    {
      title: '武器: axe（斧）',
      entries: makeEquipEntries((e) => e.slot === 'weapon' && e.weaponType === 'axe'),
    },
    {
      title: '武器: bow（弓）',
      entries: makeEquipEntries((e) => e.slot === 'weapon' && e.weaponType === 'bow'),
    },
    {
      title: '武器: fist（拳）',
      entries: makeEquipEntries((e) => e.slot === 'weapon' && e.weaponType === 'fist'),
    },
    {
      title: '武器: staff（杖）',
      entries: makeEquipEntries((e) => e.slot === 'weapon' && e.weaponType === 'staff'),
    },
    {
      title: '防具: heavy（重装）',
      entries: makeEquipEntries((e) => e.slot === 'armor' && e.armorType === 'heavy'),
    },
    {
      title: '防具: light（軽装）',
      entries: makeEquipEntries((e) => e.slot === 'armor' && e.armorType === 'light'),
    },
    {
      title: '防具: clothes（衣）',
      entries: makeEquipEntries((e) => e.slot === 'armor' && e.armorType === 'clothes'),
    },
    {
      title: '装飾: accessory',
      entries: makeEquipEntries((e) => e.slot === 'accessory'),
    },
  ];
}

export const Equipment: Story = {
  args: {
    sections: buildEquipmentSections(),
    showReviewControls: true,
  },
};

// ----------------------------------------------------------------------------
// 4. Characters — 全 race × class
// ----------------------------------------------------------------------------

function buildCharacterSections(): CatalogSection[] {
  const allRaces = Object.values(RACES);
  const allClasses = Object.values(CLASSES);

  return allRaces.map((race) => {
    const entries: CatalogEntry[] = allClasses.map((cls) => {
      const portrait = (
        <CharacterPortrait
          raceId={race.id}
          classId={cls.id}
          size={64}
        />
      );
      // CharacterPortrait は PNG がない場合 null を返す。
      // ここでは常にエントリとして含め、画像なしの場合はプレースホルダを表示する。
      return {
        id: `${race.id}_${cls.id}`,
        name: `${race.name} ${cls.name}`,
        sprite: portrait ?? <span style={{ fontSize: 10, color: '#bbb' }}>（画像なし）</span>,
        badge: cls.name,
      };
    });

    return {
      title: race.name,
      entries,
    };
  });
}

export const Characters: Story = {
  args: {
    sections: buildCharacterSections(),
    showReviewControls: true,
  },
};
