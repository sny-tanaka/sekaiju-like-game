import { type Meta, type StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';

import { ActionButton } from './ActionButton';

type T = typeof ActionButton;

export default {
  component: ActionButton,
  args: {
    onClick: fn(),
  },
} satisfies Meta<T>;

// ==========================================================
// variant ストーリー
// ==========================================================

export const Default: StoryObj<T> = {
  name: 'variant: default',
  args: {
    label: 'ギルド管理',
    description: '編成・キャラ作成',
  },
};

export const Primary: StoryObj<T> = {
  name: 'variant: primary',
  args: {
    label: 'ダイブ開始',
    description: 'タワーへ潜る',
    variant: 'primary',
  },
};

export const Secondary: StoryObj<T> = {
  name: 'variant: secondary',
  args: {
    label: 'もどる',
    variant: 'secondary',
  },
};

export const Destructive: StoryObj<T> = {
  name: 'variant: destructive',
  args: {
    label: 'データを削除する',
    description: 'この操作は取り消せません',
    variant: 'destructive',
  },
};

export const Icon: StoryObj<T> = {
  name: 'variant: icon',
  args: {
    label: '⚙',
    variant: 'icon',
    ariaLabel: '設定',
  },
};

export const Ghost: StoryObj<T> = {
  name: 'variant: ghost',
  args: {
    label: 'アプリを更新する',
    variant: 'ghost',
  },
};

export const Card: StoryObj<T> = {
  name: 'variant: card',
  args: {
    label: '魔獣の牙',
    description: '鍛冶素材 / 市場価格 80G',
    variant: 'card',
  },
};

export const Tab: StoryObj<T> = {
  name: 'variant: tab',
  args: {
    label: '装備',
    variant: 'tab',
  },
};

// ==========================================================
// size バリアント（default / primary / secondary / destructive）
// ==========================================================

export const SizeSmall: StoryObj<T> = {
  name: 'size: small (default)',
  args: {
    label: '逃げる',
    size: 'small',
  },
};

export const SizeMedium: StoryObj<T> = {
  name: 'size: medium (default)',
  args: {
    label: 'ショップ',
    description: '道具を購入する',
    size: 'medium',
  },
};

export const SizeLarge: StoryObj<T> = {
  name: 'size: large (primary)',
  args: {
    label: '冒険開始',
    description: 'セーブデータを確認してから潜る',
    size: 'large',
    variant: 'primary',
  },
};

export const SizeSmallSecondary: StoryObj<T> = {
  name: 'size: small (secondary)',
  args: {
    label: 'キャンセル',
    size: 'small',
    variant: 'secondary',
  },
};

export const SizeLargeDestructive: StoryObj<T> = {
  name: 'size: large (destructive)',
  args: {
    label: 'セーブデータを消去',
    size: 'large',
    variant: 'destructive',
  },
};

// ==========================================================
// 無効状態
// ==========================================================

export const Disabled: StoryObj<T> = {
  name: 'disabled (default)',
  args: {
    label: '鍛冶屋',
    description: 'Phase 4 で実装',
    disabled: true,
  },
};

export const DisabledPrimary: StoryObj<T> = {
  name: 'disabled (primary)',
  args: {
    label: 'ダイブ開始',
    variant: 'primary',
    disabled: true,
  },
};

// ==========================================================
// sfx バリアント
// ==========================================================

export const SfxNull: StoryObj<T> = {
  name: 'sfx: null (無音)',
  args: {
    label: '無音ボタン',
    sfx: null,
  },
};

export const SfxCustom: StoryObj<T> = {
  name: 'sfx: cancel',
  args: {
    label: 'キャンセル',
    sfx: 'cancel',
    variant: 'secondary',
  },
};

// ==========================================================
// children 使用例
// ==========================================================

export const WithChildren: StoryObj<T> = {
  name: 'children: アイコン＋テキスト (default)',
  args: {
    children: (
      <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <span>⚔</span>
        <span>戦闘開始</span>
      </span>
    ),
  },
};

export const IconWithChildren: StoryObj<T> = {
  name: 'children: icon variant',
  args: {
    variant: 'icon',
    ariaLabel: '設定を開く',
    children: <span>⚙</span>,
  },
};

export const CardWithChildren: StoryObj<T> = {
  name: 'children: card variant',
  args: {
    variant: 'card',
    children: (
      <>
        <span style={{ fontWeight: 700 }}>炎の短剣+3</span>
        <span style={{ fontSize: 12, opacity: 0.8 }}>攻撃力 42 / 炎属性付与</span>
        <span style={{ fontSize: 11, opacity: 0.6 }}>装備コスト 3</span>
      </>
    ),
  },
};

// ==========================================================
// a11y
// ==========================================================

export const WithAriaLabel: StoryObj<T> = {
  name: 'ariaLabel 付き',
  args: {
    label: '×',
    ariaLabel: '閉じる',
    variant: 'ghost',
  },
};

// ==========================================================
// nostyle prop（完全カスタム例）
// ==========================================================

export const NoStyle: StoryObj<T> = {
  name: 'nostyle: 完全カスタム（戦闘カード風）',
  args: {
    nostyle: true,
    className: undefined,
    children: (
      <span
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: 2,
          padding: '10px 14px',
          background: 'rgba(30, 20, 10, 0.85)',
          border: '1px solid rgba(180, 140, 60, 0.5)',
          borderRadius: 4,
          color: '#e8d8a0',
          width: 140,
          fontSize: 13,
          fontWeight: 700,
          lineHeight: 1.3,
        }}
      >
        <span>アルフィン</span>
        <span style={{ fontSize: 11, opacity: 0.75, fontWeight: 400 }}>HP 84 / 120</span>
      </span>
    ),
  },
};

export const NoStyleWithVariantIgnored: StoryObj<T> = {
  name: 'nostyle: variant=primary でも base スタイルが無効化される',
  args: {
    label: 'カスタムボタン',
    nostyle: true,
    variant: 'primary',
    size: 'large',
    className: undefined,
  },
};

// ==========================================================
// type=submit
// ==========================================================

export const SubmitType: StoryObj<T> = {
  name: 'type: submit',
  render: (args) => (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        args.onClick?.();
      }}
    >
      <ActionButton {...args} />
    </form>
  ),
  args: {
    label: 'フォーム送信',
    type: 'submit',
    variant: 'primary',
  },
};
