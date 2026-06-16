/**
 * BgmProvider.tsx — シーン連動 BGM 再生プロバイダ
 *
 * - 最初のユーザー操作（pointerdown/keydown/touchstart）で AudioContext を生成
 * - react-router の useLocation で pathname を監視してルート→曲を切替
 * - 音量/ミュートを localStorage で永続化
 * - iOS Safari 対策: ジェスチャー内で無音バッファを同期再生して AudioContext を解錠する
 */

import { useCallback, useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { useLocation } from 'react-router';

import { BgmContext } from './bgmContext';
import type { BattleVariant } from './bgmContext';
import { BgmPlayer, getAudioContextCtor } from './BgmPlayer';
import { loadBgmSettings, saveBgmSettings } from './bgmSettings';
import battleTrack from './tracks/battle.json';
import bossTrack from './tracks/boss.json';
import exploreTrack from './tracks/explore.json';
import foeTrack from './tracks/foe.json';
import titleTrack from './tracks/title.json';
import townTrack from './tracks/town.json';
import type { BgmTrack } from './types';

// トラックID。戦闘系（battle/boss/foe）は /battle 内で敵種別により切替。
type TrackId = 'title' | 'town' | 'explore' | 'battle' | 'boss' | 'foe';

const TRACK_MAP: Record<TrackId, BgmTrack> = {
  title: titleTrack as unknown as BgmTrack,
  town: townTrack as unknown as BgmTrack,
  explore: exploreTrack as unknown as BgmTrack,
  battle: battleTrack as unknown as BgmTrack,
  boss: bossTrack as unknown as BgmTrack,
  foe: foeTrack as unknown as BgmTrack,
};

/**
 * pathname → トラックID（null = 無音）。
 * /battle は敵種別で battle/boss/foe を切替えるため、ここでは扱わず BattleVariant 側に委ねる。
 */
function pathnameToTrackId(pathname: string): TrackId | null {
  if (pathname === '/title' || pathname === '/') return 'title';
  if (
    pathname === '/town' ||
    pathname === '/shop' ||
    pathname === '/forge' ||
    pathname.startsWith('/guild') ||
    pathname === '/codex'
  )
    return 'town';
  if (pathname === '/dungeon') return 'explore';
  return null;
}

export const BgmProvider = ({ children }: { children: ReactNode }) => {
  const initialSettings = loadBgmSettings();
  const [volume, setVolumeState] = useState(initialSettings.volume);
  const [muted, setMutedState] = useState(initialSettings.muted);
  const [currentTrackId, setCurrentTrackId] = useState<string | null>(null);
  // /battle 中の戦闘曲バリアント（戦闘画面が敵種別から設定。null=未設定）。
  const [battleVariant, setBattleVariantState] = useState<BattleVariant | null>(null);

  const playerRef = useRef<BgmPlayer | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const initializedRef = useRef(false);
  // iOS Safari の AudioContext 解錠（unlock）が済んだか
  const audioUnlockedRef = useRef(false);

  // 初期化前に来たルート変更を覚えておく
  const pendingTrackIdRef = useRef<TrackId | null>(null);

  // 現在の volume/muted を ref で持つ（クロージャ古い値問題を避ける）
  const volumeRef = useRef(initialSettings.volume);
  const mutedRef = useRef(initialSettings.muted);

  const location = useLocation();

  /**
   * iOS Safari 対策: ユーザージェスチャー内で無音バッファ(1フレーム)を同期再生して
   * AudioContext を解錠する。SE は buffer を同期再生して解錠されるが、BGM は
   * setInterval スケジューリングのみでノードを同期起動しないため、別 context が
   * 解錠されず無音になる。これを解消する。resume() も併せて呼ぶ。
   */
  const unlockAudio = useCallback((ctx: AudioContext) => {
    if (ctx.state === 'suspended') {
      void ctx.resume();
    }
    if (audioUnlockedRef.current) return;
    try {
      const buffer = ctx.createBuffer(1, 1, ctx.sampleRate);
      const source = ctx.createBufferSource();
      source.buffer = buffer;
      source.connect(ctx.destination);
      source.start(0);
      audioUnlockedRef.current = true;
    } catch {
      // 解錠失敗は致命的ではない（次のジェスチャーで再試行される）
    }
  }, []);

  /** AudioContext と BgmPlayer を初期化する。 */
  const initAudioContext = useCallback(() => {
    if (initializedRef.current) return;
    const Ctor = getAudioContextCtor();
    if (!Ctor) return; // SSR / jsdom

    initializedRef.current = true;

    try {
      const ctx = new Ctor();
      audioCtxRef.current = ctx;
      const masterGain = ctx.createGain();
      masterGain.gain.value = mutedRef.current ? 0 : volumeRef.current;
      masterGain.connect(ctx.destination);
      masterGainRef.current = masterGain;

      const player = new BgmPlayer(ctx, masterGain);
      playerRef.current = player;

      unlockAudio(ctx);

      // 保留中のトラックがあれば再生
      const pending = pendingTrackIdRef.current;
      if (pending) {
        const track = TRACK_MAP[pending];
        player.setTrack(track);
        setCurrentTrackId(pending);
      }
    } catch (e) {
      console.warn('[BgmProvider] AudioContext の初期化に失敗しました:', e);
    }
  }, [unlockAudio]);

  /** 最初のユーザー操作で AudioContext を遅延生成（自動再生ポリシー対策）。 */
  useEffect(() => {
    const handler = () => {
      initAudioContext();
      const ctx = audioCtxRef.current;
      if (ctx) {
        unlockAudio(ctx);
      }
    };
    window.addEventListener('pointerdown', handler);
    window.addEventListener('keydown', handler);
    window.addEventListener('touchstart', handler);
    return () => {
      window.removeEventListener('pointerdown', handler);
      window.removeEventListener('keydown', handler);
      window.removeEventListener('touchstart', handler);
    };
  }, [initAudioContext, unlockAudio]);

  /** ルート＋戦闘バリアントから実際に再生するトラックを決める。 */
  useEffect(() => {
    const trackId: TrackId | null =
      location.pathname === '/battle' ? battleVariant : pathnameToTrackId(location.pathname);

    if (playerRef.current) {
      const track = trackId ? TRACK_MAP[trackId] : null;
      playerRef.current.setTrack(track);
      setCurrentTrackId(trackId);
    } else {
      // AudioContext 未初期化時は保留
      pendingTrackIdRef.current = trackId;
    }
  }, [location.pathname, battleVariant]);

  /** volume / muted が変わったらプレイヤーに反映し永続化。 */
  useEffect(() => {
    volumeRef.current = volume;
    mutedRef.current = muted;
    playerRef.current?.setGain(volume, muted);
    saveBgmSettings({ volume, muted });
  }, [volume, muted]);

  /** アンマウント時に後片付け。 */
  useEffect(() => {
    return () => {
      playerRef.current?.dispose();
    };
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

  const setBattleVariant = useCallback((v: BattleVariant | null) => {
    setBattleVariantState(v);
  }, []);

  return (
    <BgmContext.Provider
      value={{
        volume,
        muted,
        setVolume,
        setMuted,
        toggleMuted,
        currentTrackId,
        setBattleVariant,
      }}
    >
      {children}
    </BgmContext.Provider>
  );
};
