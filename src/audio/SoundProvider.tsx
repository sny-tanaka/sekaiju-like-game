import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';

import { SFX_IDS, SFX_GAIN, sfxUrl } from '@/audio/sfxManifest';
import type { SfxId } from '@/audio/sfxManifest';
import { loadSfxSettings, saveSfxSettings } from '@/audio/sfxSettings';
import { getSharedAudioContext, unlockSharedAudioContext } from '@/audio/sharedAudioContext';
import { SoundContext } from '@/audio/soundContext';

// ============================================================================
// Web Audio 再生システム（設計書 sfx-design.md §再生システム）
// ============================================================================

export type { SoundContextValue } from '@/audio/soundContext';
export { SoundContext } from '@/audio/soundContext';

const DEBOUNCE_MS = 30;

export const SoundProvider = ({ children }: { children: ReactNode }) => {
  const initialSettings = loadSfxSettings();
  const [volume, setVolumeState] = useState(initialSettings.volume);
  const [muted, setMutedState] = useState(initialSettings.muted);

  // AudioContext とキャッシュは ref で管理（再レンダリング不要）
  const audioCtxRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const bufferCacheRef = useRef<Partial<Record<SfxId, AudioBuffer>>>({});
  const initializedRef = useRef(false);
  // デバウンス用: id → 最後の再生時刻
  const lastPlayedRef = useRef<Partial<Record<SfxId, number>>>({});

  /** AudioContext を初期化し、全 SE を並列 fetch→decode してキャッシュ。 */
  const initAudioContext = useCallback(() => {
    if (initializedRef.current) return;
    const ctx = getSharedAudioContext();
    if (!ctx) return; // SSR / jsdom

    initializedRef.current = true;

    try {
      audioCtxRef.current = ctx;

      const masterGain = ctx.createGain();
      masterGain.gain.value = initialSettings.muted ? 0 : initialSettings.volume;
      masterGain.connect(ctx.destination);
      masterGainRef.current = masterGain;

      // 全 SE を並列 fetch → decode
      void Promise.all(
        SFX_IDS.map(async (id) => {
          try {
            const url = sfxUrl(id);
            const res = await fetch(url);
            const arrayBuf = await res.arrayBuffer();
            const audioBuf = await ctx.decodeAudioData(arrayBuf);
            bufferCacheRef.current[id] = audioBuf;
          } catch (e) {
            console.warn(`[SoundProvider] SE "${id}" の読み込みに失敗しました:`, e);
          }
        })
      );
    } catch (e) {
      console.warn('[SoundProvider] AudioContext の初期化に失敗しました:', e);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  /** 最初のユーザー操作で AudioContext を遅延生成（自動再生ポリシー対策）。 */
  useEffect(() => {
    const handler = () => {
      initAudioContext();
      unlockSharedAudioContext();
    };
    window.addEventListener('pointerdown', handler, { once: true });
    window.addEventListener('keydown', handler, { once: true });
    window.addEventListener('touchstart', handler, { once: true });
    return () => {
      window.removeEventListener('pointerdown', handler);
      window.removeEventListener('keydown', handler);
      window.removeEventListener('touchstart', handler);
    };
  }, [initAudioContext]);

  /** volume / muted が変わったらマスター GainNode に反映 + 永続化。 */
  useEffect(() => {
    if (masterGainRef.current) {
      masterGainRef.current.gain.value = muted ? 0 : volume;
    }
    saveSfxSettings({ volume, muted });
  }, [volume, muted]);

  const play = useCallback((id: SfxId) => {
    const ctx = audioCtxRef.current;
    const masterGain = masterGainRef.current;
    if (!ctx || !masterGain) return; // AudioContext 未初期化（最初の操作前 or SSR）

    const buffer = bufferCacheRef.current[id];
    if (!buffer) return; // SE 未ロード

    // 30ms 以内の同一 id 連発をデバウンス
    const now = performance.now();
    const last = lastPlayedRef.current[id] ?? -Infinity;
    if (now - last < DEBOUNCE_MS) return;
    lastPlayedRef.current[id] = now;

    try {
      // suspended 状態なら resume
      if (ctx.state === 'suspended') {
        void ctx.resume();
      }

      const individualGain = ctx.createGain();
      individualGain.gain.value = SFX_GAIN[id] ?? 1;
      individualGain.connect(masterGain);

      const source = ctx.createBufferSource();
      source.buffer = buffer;
      source.connect(individualGain);
      source.start();

      // 再生終了後にノードを切断してメモリリークを防ぐ
      source.onended = () => {
        source.disconnect();
        individualGain.disconnect();
      };
    } catch (e) {
      console.warn(`[SoundProvider] SE "${id}" の再生に失敗しました:`, e);
    }
  }, []);

  const setVolume = useCallback((v: number) => {
    setVolumeState(v);
  }, []);

  const setMuted = useCallback((m: boolean) => {
    setMutedState(m);
  }, []);

  const toggleMuted = useCallback(() => {
    setMutedState((prev) => !prev);
  }, []);

  return (
    <SoundContext.Provider
      value={{
        play: play as (id: string) => void,
        volume,
        muted,
        setVolume,
        setMuted,
        toggleMuted,
      }}
    >
      {children}
    </SoundContext.Provider>
  );
};

/** SoundContext を取得する（Provider 外では null になる）。 */
export const useSoundContext = () => {
  return useContext(SoundContext);
};
