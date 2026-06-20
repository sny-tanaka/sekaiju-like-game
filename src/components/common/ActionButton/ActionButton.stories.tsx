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

// --- variant ---

export const Primary: StoryObj<T> = {
  args: {
    label: 'ダイブ開始',
    description: 'タワーへ潜る',
    variant: 'primary',
  },
};

export const Default: StoryObj<T> = {
  args: {
    label: 'ギルド管理',
    description: '編成・キャラ作成',
  },
};

export const Disabled: StoryObj<T> = {
  args: {
    label: '鍛冶屋',
    description: 'Phase 4 で実装',
    disabled: true,
  },
};

// --- size バリアント ---

export const SizeSmall: StoryObj<T> = {
  name: 'size: small',
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
  name: 'size: large',
  args: {
    label: '冒険開始',
    description: 'セーブデータを確認してから潜る',
    size: 'large',
    variant: 'primary',
  },
};

// --- sfx バリアント ---

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
  },
};

// --- children 使用例 ---

export const WithChildren: StoryObj<T> = {
  name: 'children (アイコン＋テキスト)',
  args: {
    children: (
      <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <span>⚔</span>
        <span>戦闘開始</span>
      </span>
    ),
  },
};

// --- a11y ---

export const WithAriaLabel: StoryObj<T> = {
  name: 'ariaLabel 付き',
  args: {
    label: '×',
    ariaLabel: '閉じる',
    size: 'small',
  },
};

// --- type=submit ---

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
  },
};
