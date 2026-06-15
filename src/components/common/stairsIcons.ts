import { useEffect, useState } from 'react';

import stairsDownUrl from '@/assets/stairs-down.png';
import stairsUpUrl from '@/assets/stairs-up.png';

// 階段アイコン画像（上り/下り）。canvas へ drawImage するため Image を1度だけ生成して使い回す。
function preload(url: string): HTMLImageElement | null {
  if (typeof Image === 'undefined') return null; // SSR / テスト環境ガード
  const img = new Image();
  img.src = url;
  return img;
}

export const stairsUpImg = preload(stairsUpUrl);
export const stairsDownImg = preload(stairsDownUrl);

/** drawImage 可能な状態か（読み込み完了かつ寸法あり）。 */
export function stairsIconDrawable(img: HTMLImageElement | null): img is HTMLImageElement {
  return !!img && img.complete && img.naturalWidth > 0;
}

const bothReady = () => stairsIconDrawable(stairsUpImg) && stairsIconDrawable(stairsDownImg);

/**
 * 階段アイコンのロード完了フラグ。読み込み前に描画した canvas を、
 * 完了時に再描画させるために effect の依存配列へ渡す。
 */
export function useStairsIconsReady(): boolean {
  const [ready, setReady] = useState(bothReady);
  useEffect(() => {
    if (bothReady()) {
      setReady(true);
      return;
    }
    const imgs = [stairsUpImg, stairsDownImg].filter((i): i is HTMLImageElement => !!i);
    const onload = () => {
      if (bothReady()) setReady(true);
    };
    imgs.forEach((i) => i.addEventListener('load', onload));
    return () => imgs.forEach((i) => i.removeEventListener('load', onload));
  }, []);
  return ready;
}
