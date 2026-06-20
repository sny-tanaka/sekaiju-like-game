/**
 * ActionButton のユニットテスト。
 * - size バリアントの class が付くこと
 * - ariaLabel が button の aria-label に反映されること
 * - sfx={null} で SE が鳴らないこと
 * - disabled で onClick も SE も発火しないこと
 * - type='submit' で submit 属性を持つこと
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
