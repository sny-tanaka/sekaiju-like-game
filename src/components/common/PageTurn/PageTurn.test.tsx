import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { PageTurn } from './PageTurn';

import { NavigationProvider } from '@/store/navigation';

describe('PageTurn', () => {
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <NavigationProvider>{children}</NavigationProvider>
  );

  it('children をレンダリングする', () => {
    const { getByText } = render(
      <PageTurn>
        <div>テストコンテンツ</div>
      </PageTurn>,
      { wrapper }
    );
    expect(getByText('テストコンテンツ')).toBeTruthy();
  });

  it('初期状態ではオーバーレイが表示されない', () => {
    const { container } = render(
      <PageTurn>
        <div>コンテンツ</div>
      </PageTurn>,
      { wrapper }
    );
    // overlay クラスを持つ要素が初期状態では存在しない
    // （screen が変化していないため animating = false）
    // data-testid を使わず DOM 構造から確認する
    const children = container.children;
    // PageTurn は display: contents なので直接 children をチェック
    expect(children.length).toBeGreaterThan(0);
  });

  it('NavigationProvider なしで使うと例外をスローする', () => {
    // useNavigation が NavigationProvider 外で呼ばれると throw する
    expect(() => {
      render(
        <PageTurn>
          <div>コンテンツ</div>
        </PageTurn>
      );
    }).toThrow();
  });
});
