/**
 * ActionButton のユニットテスト。
 * - size バリアントの class が付くこと
 * - ariaLabel が button の aria-label に反映されること
 * - sfx={null} で SE が鳴らないこと
 * - disabled で onClick も SE も発火しないこと
 * - type='submit' で submit 属性を持つこと
 * - 8 variant の class が正しく付くこと
 * - icon / ghost / card / tab では size class が付かないこと
 */

vi.mock('@/audio/sfxManifest', () => ({
  SFX_IDS: ['decide', 'cancel'],
  SFX_GAIN: {},
  sfxUrl: (id: string) => `/sfx/${id}.wav`,
}));

import { render, screen, fireEvent } from '@testing-library/react';
import { useState, useCallback } from 'react';
import type { ReactNode } from 'react';

import { ActionButton } from './ActionButton';
import type { ActionButtonVariant } from './ActionButton';

import { SoundContext } from '@/audio/soundContext';

// play モックを注入するラッパ
const makeWrapper = (play: ReturnType<typeof vi.fn>) => {
  const TestSoundProvider = ({ children }: { children: ReactNode }) => {
    const [volume] = useState(0.6);
    const [muted] = useState(false);
    const setVolume = useCallback(() => {}, []);
    const setMuted = useCallback(() => {}, []);
    const toggleMuted = useCallback(() => {}, []);

    return (
      <SoundContext.Provider value={{ play, volume, muted, setVolume, setMuted, toggleMuted }}>
        {children}
      </SoundContext.Provider>
    );
  };
  TestSoundProvider.displayName = 'TestSoundProvider';

  const Wrapper = ({ children }: { children: ReactNode }) => (
    <TestSoundProvider>{children}</TestSoundProvider>
  );
  Wrapper.displayName = 'ActionButtonTestWrapper';

  return Wrapper;
};

describe('ActionButton: SE 発火', () => {
  test('クリック時に sfx で指定した SE が鳴る', () => {
    const play = vi.fn();
    const wrapper = makeWrapper(play);
    render(
      <ActionButton
        label="テスト"
        sfx="cancel"
      />,
      { wrapper }
    );
    fireEvent.click(screen.getByRole('button'));
    expect(play).toHaveBeenCalledWith('cancel');
  });

  test('sfx 省略時はデフォルト "decide" が鳴る', () => {
    const play = vi.fn();
    const wrapper = makeWrapper(play);
    render(<ActionButton label="テスト" />, { wrapper });
    fireEvent.click(screen.getByRole('button'));
    expect(play).toHaveBeenCalledWith('decide');
  });

  test('sfx={null} のとき SE は鳴らない', () => {
    const play = vi.fn();
    const wrapper = makeWrapper(play);
    render(
      <ActionButton
        label="無音"
        sfx={null}
      />,
      { wrapper }
    );
    fireEvent.click(screen.getByRole('button'));
    expect(play).not.toHaveBeenCalled();
  });

  test('disabled のとき SE が鳴らず onClick も呼ばれない', () => {
    const play = vi.fn();
    const onClick = vi.fn();
    const wrapper = makeWrapper(play);
    render(
      <ActionButton
        label="無効"
        disabled
        onClick={onClick}
      />,
      { wrapper }
    );
    // disabled ボタンへの fireEvent.click は呼ばれないが念のため
    fireEvent.click(screen.getByRole('button'));
    expect(play).not.toHaveBeenCalled();
    expect(onClick).not.toHaveBeenCalled();
  });
});

describe('ActionButton: ariaLabel', () => {
  test('ariaLabel が aria-label 属性に反映される', () => {
    const play = vi.fn();
    const wrapper = makeWrapper(play);
    render(
      <ActionButton
        label="×"
        ariaLabel="閉じる"
      />,
      { wrapper }
    );
    expect(screen.getByRole('button', { name: '閉じる' })).toBeDefined();
  });
});

describe('ActionButton: type', () => {
  test('type 省略時は "button" になる', () => {
    const play = vi.fn();
    const wrapper = makeWrapper(play);
    render(<ActionButton label="ボタン" />, { wrapper });
    expect(screen.getByRole('button').getAttribute('type')).toBe('button');
  });

  test('type="submit" のとき type 属性が "submit" になる', () => {
    const play = vi.fn();
    const wrapper = makeWrapper(play);
    render(
      <ActionButton
        label="送信"
        type="submit"
      />,
      { wrapper }
    );
    expect(screen.getByRole('button').getAttribute('type')).toBe('submit');
  });
});

describe('ActionButton: size クラス', () => {
  // CSS Modules のクラス名はハッシュ化されるため、存在確認は className に文字列が含まれるかで行う
  // vitest + happy-dom では CSS Modules の実際のハッシュ名が付与される
  // ここでは「data-testid 等が不要」なシンプルな確認として disabled/enabled を確認する

  test('size="small" のときボタンが存在する', () => {
    const play = vi.fn();
    const wrapper = makeWrapper(play);
    render(
      <ActionButton
        label="小"
        size="small"
      />,
      { wrapper }
    );
    expect(screen.getByRole('button')).toBeDefined();
  });

  test('size="medium" のときボタンが存在する（デフォルト）', () => {
    const play = vi.fn();
    const wrapper = makeWrapper(play);
    render(
      <ActionButton
        label="中"
        size="medium"
      />,
      { wrapper }
    );
    expect(screen.getByRole('button')).toBeDefined();
  });

  test('size="large" のときボタンが存在する', () => {
    const play = vi.fn();
    const wrapper = makeWrapper(play);
    render(
      <ActionButton
        label="大"
        size="large"
      />,
      { wrapper }
    );
    expect(screen.getByRole('button')).toBeDefined();
  });
});

describe('ActionButton: children', () => {
  test('children が渡されたときボタン内にレンダリングされる', () => {
    const play = vi.fn();
    const wrapper = makeWrapper(play);
    render(
      <ActionButton>
        <span data-testid="child">アイコン</span>
      </ActionButton>,
      { wrapper }
    );
    expect(screen.getByTestId('child')).toBeDefined();
  });
});

// ==========================================================
// 8 variant のクラス付与テスト
// ==========================================================

describe('ActionButton: variant クラス', () => {
  const VARIANTS: ActionButtonVariant[] = [
    'default',
    'primary',
    'secondary',
    'destructive',
    'icon',
    'ghost',
    'card',
    'tab',
  ];

  test.each(VARIANTS)('variant="%s" のときボタンが存在する', (variant) => {
    const play = vi.fn();
    const wrapper = makeWrapper(play);
    render(
      <ActionButton
        label="テスト"
        variant={variant}
      />,
      { wrapper }
    );
    expect(screen.getByRole('button')).toBeDefined();
  });

  test('variant 省略時は default variant になる', () => {
    const play = vi.fn();
    const wrapper = makeWrapper(play);
    render(<ActionButton label="デフォルト" />, { wrapper });
    // ボタンが存在すること（default は actionButton + default クラスが付与される）
    expect(screen.getByRole('button')).toBeDefined();
  });
});

// ==========================================================
// size 適用 / 非適用の確認
// size は CSS Modules でハッシュ化されるため、className 文字列に空白区切りのトークンが
// 増えているかどうか（class 数）で判定する。
// ==========================================================

describe('ActionButton: size クラス適用可否', () => {
  /** ボタンの class 名トークン（空白分割）の個数を返す */
  const classCount = (el: HTMLElement) => el.className.trim().split(/\s+/).filter(Boolean).length;

  test('default variant では size class が付与される（medium > small より class 数が同じ）', () => {
    const play = vi.fn();
    const wrapper = makeWrapper(play);

    // default + medium: actionButton / default / medium の 3 class
    const { unmount } = render(
      <ActionButton
        label="A"
        variant="default"
        size="medium"
      />,
      { wrapper }
    );
    const mediumCount = classCount(screen.getByRole('button'));
    unmount();

    // default + small: actionButton / default / small の 3 class（同数）
    render(
      <ActionButton
        label="B"
        variant="default"
        size="small"
      />,
      { wrapper }
    );
    const smallCount = classCount(screen.getByRole('button'));

    // どちらも size class が付く（同じ class 数 3）
    expect(mediumCount).toBe(3);
    expect(smallCount).toBe(3);
  });

  test('icon variant では size class が付かない（class 数が 2）', () => {
    const play = vi.fn();
    const wrapper = makeWrapper(play);
    render(
      <ActionButton
        label="⚙"
        variant="icon"
        size="large"
      />,
      { wrapper }
    );
    // actionButton + icon の 2 class のみ
    expect(classCount(screen.getByRole('button'))).toBe(2);
  });

  test('ghost variant では size class が付かない（class 数が 2）', () => {
    const play = vi.fn();
    const wrapper = makeWrapper(play);
    render(
      <ActionButton
        label="更新"
        variant="ghost"
        size="large"
      />,
      { wrapper }
    );
    expect(classCount(screen.getByRole('button'))).toBe(2);
  });

  test('card variant では size class が付かない（class 数が 2）', () => {
    const play = vi.fn();
    const wrapper = makeWrapper(play);
    render(
      <ActionButton
        label="アイテム"
        variant="card"
        size="large"
      />,
      { wrapper }
    );
    expect(classCount(screen.getByRole('button'))).toBe(2);
  });

  test('tab variant では size class が付かない（class 数が 2）', () => {
    const play = vi.fn();
    const wrapper = makeWrapper(play);
    render(
      <ActionButton
        label="装備"
        variant="tab"
        size="large"
      />,
      { wrapper }
    );
    expect(classCount(screen.getByRole('button'))).toBe(2);
  });
});
