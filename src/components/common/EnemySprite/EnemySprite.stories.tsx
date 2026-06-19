import { type Meta, type StoryObj } from '@storybook/react-vite';

import { EnemySprite } from './EnemySprite';

type T = typeof EnemySprite;

export default {
  component: EnemySprite,
  title: 'common/EnemySprite',
} satisfies Meta<T>;

// Tier 0 代表 4 体（スライム・もりウサギ・あおざめた亡霊・ふるびた樹人）を md サイズで並べて表示
export const AllTier0: StoryObj<T> = {
  render: () => (
    <div
      style={{
        display: 'flex',
        gap: '16px',
        flexWrap: 'wrap',
        background: '#F5F0E8',
        padding: '16px',
      }}
    >
      <EnemySprite
        enemyId="enemy_slime"
        size="md"
      />
      <EnemySprite
        enemyId="enemy_t0_forest_rabbit"
        size="md"
      />
      <EnemySprite
        enemyId="enemy_t0_pale_wisp"
        size="md"
      />
      <EnemySprite
        enemyId="enemy_t0_elder_treant"
        size="md"
      />
    </div>
  ),
};

// Tier 4 代表 4 体（腐肉の徘徊者・骸骨の突撃兵・下級の死神・瘴気を統べる腐王）を md サイズで並べて表示
export const AllTier4: StoryObj<T> = {
  render: () => (
    <div
      style={{
        display: 'flex',
        gap: '16px',
        flexWrap: 'wrap',
        background: '#F5F0E8',
        padding: '16px',
      }}
    >
      <EnemySprite
        enemyId="enemy_t4_rotwalker"
        size="md"
      />
      <EnemySprite
        enemyId="enemy_t4_bone_lancer"
        size="md"
      />
      <EnemySprite
        enemyId="enemy_t4_wraith_lantern"
        size="md"
      />
      <EnemySprite
        enemyId="enemy_t4_boss_blight_sovereign"
        size="md"
      />
    </div>
  ),
};

// 同一敵（スライム）の sm/md/lg を並べて表示
export const Sizes: StoryObj<T> = {
  render: () => (
    <div
      style={{
        display: 'flex',
        gap: '16px',
        alignItems: 'flex-end',
        background: '#F5F0E8',
        padding: '16px',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
        <EnemySprite
          enemyId="enemy_slime"
          size="sm"
        />
        <span style={{ fontSize: '11px', color: '#888' }}>sm (48px)</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
        <EnemySprite
          enemyId="enemy_slime"
          size="md"
        />
        <span style={{ fontSize: '11px', color: '#888' }}>md (96px)</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
        <EnemySprite
          enemyId="enemy_slime"
          size="lg"
        />
        <span style={{ fontSize: '11px', color: '#888' }}>lg (160px)</span>
      </div>
    </div>
  ),
};

// silhouette={true} と false を並べて表示（図鑑の未遭遇/遭遇済の対比）
export const Silhouette: StoryObj<T> = {
  render: () => (
    <div
      style={{
        display: 'flex',
        gap: '32px',
        alignItems: 'flex-end',
        background: '#F5F0E8',
        padding: '16px',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
        <EnemySprite
          enemyId="enemy_t0_forest_rabbit"
          size="md"
        />
        <span style={{ fontSize: '11px', color: '#888' }}>遭遇済（通常）</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
        <EnemySprite
          enemyId="enemy_t0_forest_rabbit"
          size="md"
          silhouette
          alt="未遭遇のモンスター"
        />
        <span style={{ fontSize: '11px', color: '#888' }}>未遭遇（シルエット）</span>
      </div>
    </div>
  ),
};
