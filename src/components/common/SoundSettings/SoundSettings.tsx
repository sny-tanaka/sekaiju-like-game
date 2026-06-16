import { useContext } from 'react';

import styles from './SoundSettings.module.scss';

import { SoundContext } from '@/audio/soundContext';

// SoundProvider が無い（Storybook など）場合のフォールバック用デフォルト値
const DEFAULT_VOLUME = 0.6;

export const SoundSettings = () => {
  const ctx = useContext(SoundContext);

  const volume = ctx?.volume ?? DEFAULT_VOLUME;
  const muted = ctx?.muted ?? false;

  const handleMuteToggle = () => {
    ctx?.toggleMuted();
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const next = parseFloat(e.target.value);
    ctx?.setVolume(next);
    // プレビュー再生（decide があれば decide、なければ cursor）
    ctx?.play('decide');
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>サウンド設定</h2>

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
            aria-label="音量"
          />
          <span className={styles.volumeValue}>{Math.round(volume * 100)}%</span>
        </div>
      </div>
    </div>
  );
};
