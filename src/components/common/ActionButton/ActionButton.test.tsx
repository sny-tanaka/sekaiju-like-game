/**
 * ActionButton のユニットテスト。
 *
 * ヘッドレス UI として:
 * - label が render されること
 * - children が優先されること
 * - onClick が発火すること
 * - disabled で onClick が発火しないこと
 * - sfx が default 'decide' で再生されること
 * - sfx={null} で再生されないこと
 * - sfx='cancel' などで指定 SE が再生されること
 * - disabled で SE も発火しないこと
 * - ariaLabel が button に当たること
 * - type='submit' で button type が submit
 * - className が button に当たること
 *
 * @deprecated 互換: variant / size / nostyle は無視されるが tsc エラーにならないこと
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

// ==========================================================
// label / children のレンダリング
// ==========================================================

describe('ActionButton: render', () => {
  test('label が渡されたときボタン内に表示される', () => {
    const play = vi.fn();
    const wrapper = makeWrapper(play);
    render(<ActionButton label="テスト" />, { wrapper });
    expect(screen.getByRole('button').textContent).toBe('テスト');
  });

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

  test('children と label が両方渡されたとき children が優先される', () => {
    const play = vi.fn();
    const wrapper = makeWrapper(play);
    render(
      <ActionButton label="ラベル">
        <span>子要素</span>
      </ActionButton>,
      { wrapper }
    );
    // children の内容が表示される
    expect(screen.getByRole('button').textContent).toBe('子要素');
  });
});

// ==========================================================
// onClick
// ==========================================================

describe('ActionButton: onClick', () => {
  test('クリック時に onClick が呼ばれる', () => {
    const play = vi.fn();
    const onClick = vi.fn();
    const wrapper = makeWrapper(play);
    render(
      <ActionButton
        label="テスト"
        onClick={onClick}
      />,
      { wrapper }
    );
    fireEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  test('disabled のとき onClick が呼ばれない', () => {
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
    fireEvent.click(screen.getByRole('button'));
    expect(onClick).not.toHaveBeenCalled();
  });
});

// ==========================================================
// SE 発火
// ==========================================================

describe('ActionButton: SE 発火', () => {
  test('sfx 省略時はデフォルト "decide" が鳴る', () => {
    const play = vi.fn();
    const wrapper = makeWrapper(play);
    render(<ActionButton label="テスト" />, { wrapper });
    fireEvent.click(screen.getByRole('button'));
    expect(play).toHaveBeenCalledWith('decide');
  });

  test('sfx="cancel" のとき "cancel" SE が鳴る', () => {
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

  test('disabled のとき SE が鳴らない', () => {
    const play = vi.fn();
    const wrapper = makeWrapper(play);
    render(
      <ActionButton
        label="無効"
        disabled
      />,
      { wrapper }
    );
    fireEvent.click(screen.getByRole('button'));
    expect(play).not.toHaveBeenCalled();
  });
});

// ==========================================================
// ariaLabel
// ==========================================================

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

// ==========================================================
// type
// ==========================================================

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

// ==========================================================
// className
// ==========================================================

describe('ActionButton: className', () => {
  test('className が button 要素のクラスに含まれる', () => {
    const play = vi.fn();
    const wrapper = makeWrapper(play);
    render(
      <ActionButton
        label="カスタム"
        className="myCustomClass"
      />,
      { wrapper }
    );
    expect(screen.getByRole('button').className).toContain('myCustomClass');
  });

  test('className 省略時でもボタンが存在する', () => {
    const play = vi.fn();
    const wrapper = makeWrapper(play);
    render(<ActionButton label="通常" />, { wrapper });
    expect(screen.getByRole('button')).toBeDefined();
  });
});

// ==========================================================
// @deprecated 互換テスト: variant / size / nostyle が型エラーにならず無視される
// ==========================================================

describe('ActionButton: deprecated props (互換)', () => {
  test('variant / size / nostyle を渡しても render に成功する（無視される）', () => {
    const play = vi.fn();
    const wrapper = makeWrapper(play);
    render(
      <ActionButton
        label="互換テスト"
        variant="primary"
        size="large"
        nostyle
      />,
      { wrapper }
    );
    // ボタンが存在すること（クラッシュしないこと）
    expect(screen.getByRole('button')).toBeDefined();
    // ラベルが表示されること
    expect(screen.getByRole('button').textContent).toBe('互換テスト');
  });
});
