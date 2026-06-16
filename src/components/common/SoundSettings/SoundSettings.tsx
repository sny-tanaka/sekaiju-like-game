import { useContext } from 'react';

import styles from './SoundSettings.module.scss';

import { BgmContext } from '@/audio/bgm/bgmContext';
import { SoundContext } from '@/audio/soundContext';

// SoundProvider が無い（Storybook など）場合のフォールバック用デフォルト値
const DEFAULT_VOLUME = 0.6;
const DEFAULT_BGM_VOLUME = 0.5;

export const SoundSettings = () => {
  const ctx = useContext(SoundContext);
  const bgmCtx = useContext(BgmContext);

  // 効果音
  const volume = ctx?.volume ?? DEFAULT_VOLUME;
  const muted = ctx?.muted ?? false;

  // BGM
  const bgmVolume = bgmCtx?.volume ?? DEFAULT_BGM_VOLUME;
  const bgmMuted = bgmCtx?.muted ?? false;

  const handleMuteToggle = () => {
    ctx?.toggleMuted();
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const next = parseFloat(e.target.value);
    ctx?.setVolume(next);
    // プレビュー再生（decide があれば decide、なければ cursor）
    ctx?.play('decide');
  };

  const handleBgmMuteToggle = () => {
    bgmCtx?.toggleMuted();
  };

  const handleBgmVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const next = parseFloat(e.target.value);
    bgmCtx?.setVolume(next);
    // BGM はプレビュー再生不要（音量だけ反映）
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>サウンド設定</h2>

      {/* 効果音セクション */}
      <h3 className={styles.sectionTitle}>効果音</h3>

      <div className={styles.row}>
        <span className={styles.label}>ミュート</span>
        <button
          type="button"
          className={`${styles.muteButton} ${muted ? styles.muted : ''}`}
          onClick={handleMuteToggle}
          aria-pressed={muted}
          aria-label={muted ? 'ミュート解除' : 'ミュートする'}
        >
          {muted ? '🔇 OFF' : '🔊 ON'}
        </button>
      </div>

      <div className={styles.row}>
        <span className={styles.label}>音量</span>
        <div className={styles.sliderWrapper}>
          <input
            type="range"
            className={styles.slider}
            min={0}
            max={1}
            step={0.05}
            value={volume}
            onChange={handleVolumeChange}
            disabled={muted}
            aria-label="効果音音量"
          />
          <span className={styles.volumeValue}>{Math.round(volume * 100)}%</span>
        </div>
      </div>

      {/* BGM セクション */}
      <h3 className={styles.sectionTitle}>BGM</h3>

      <div className={styles.row}>
        <span className={styles.label}>ミュート</span>
        <button
          type="button"
          className={`${styles.muteButton} ${bgmMuted ? styles.muted : ''}`}
          onClick={handleBgmMuteToggle}
          aria-pressed={bgmMuted}
          aria-label={bgmMuted ? 'BGM ミュート解除' : 'BGM をミュートする'}
        >
          {bgmMuted ? '🔇 OFF' : '🔊 ON'}
        </button>
      </div>

      <div className={styles.row}>
        <span className={styles.label}>音量</span>
        <div className={styles.sliderWrapper}>
          <input
            type="range"
            className={styles.slider}
            min={0}
            max={1}
            step={0.05}
            value={bgmVolume}
            onChange={handleBgmVolumeChange}
            disabled={bgmMuted}
            aria-label="BGM音量"
          />
          <span className={styles.volumeValue}>{Math.round(bgmVolume * 100)}%</span>
        </div>
      </div>
    </div>
  );
};
