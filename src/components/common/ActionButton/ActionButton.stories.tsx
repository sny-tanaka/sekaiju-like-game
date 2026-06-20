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
// 基本
// ==========================================================

export const Default: StoryObj<T> = {
  name: 'label',
  args: {
    label: 'ギルド管理',
  },
};

export const WithChildren: StoryObj<T> = {
  name: 'children: アイコン＋テキスト',
  args: {
    children: (
      <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <span>⚔</span>
        <span>戦闘開始</span>
      </span>
    ),
  },
};

// ==========================================================
// disabled
// ==========================================================

export const Disabled: StoryObj<T> = {
  name: 'disabled',
  args: {
    label: '鍛冶屋',
    disabled: true,
  },
};

// ==========================================================
// sfx バリアント
// ==========================================================

export const SfxDefault: StoryObj<T> = {
  name: 'sfx: default (decide)',
  args: {
    label: 'デフォルト SE',
  },
};

export const SfxCancel: StoryObj<T> = {
  name: 'sfx: cancel',
  args: {
    label: 'キャンセル SE',
    sfx: 'cancel',
  },
};

export const SfxNull: StoryObj<T> = {
  name: 'sfx: null (無音)',
  args: {
    label: '無音ボタン',
    sfx: null,
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
  },
};

// ==========================================================
// className で画面側スタイルを適用した例
// ==========================================================

export const WithClassName: StoryObj<T> = {
  name: 'className: 画面側スタイル適用例',
  args: {
    label: 'ダイブ開始',
    className: undefined,
    children: (
      <span
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: 2,
          padding: '12px 16px 12px 20px',
          background: 'linear-gradient(135deg, #c8a44a, #4a6c2a)',
          border: '0.75px solid #4a6c2a',
          color: '#f5ead0',
          fontWeight: 700,
          fontSize: 15,
          width: '100%',
          boxSizing: 'border-box',
        }}
      >
        <span>ダイブ開始</span>
        <span style={{ fontSize: 12, opacity: 0.8, fontWeight: 400 }}>タワーへ潜る</span>
      </span>
    ),
  },
};
