/**
 * sharedAudioContext.ts — SE と BGM で共有する単一の AudioContext。
 *
 * iOS Safari は複数の AudioContext を同時に鳴らせない（片方がアクティブだと
 * もう片方が抑制され無音になる）。SE と BGM で context を共有して回避する。
 * 各プロバイダは共有 context 上に独立した masterGain を作り音量を別管理する。
 */
let sharedCtx: AudioContext | null = null;
let unlocked = false;

function getCtor(): typeof AudioContext | undefined {
  if (typeof window === 'undefined') return undefined;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (window as any).AudioContext ?? (window as any).webkitAudioContext ?? undefined;
}

/** 共有 AudioContext を取得（無ければ生成）。SSR/jsdom 不在環境では null。 */
export function getSharedAudioContext(): AudioContext | null {
  if (sharedCtx) return sharedCtx;
  const Ctor = getCtor();
  if (!Ctor) return null;
  sharedCtx = new Ctor();
  return sharedCtx;
}

/**
 * ユーザージェスチャー内で呼ぶ: resume() + 無音バッファ(1フレーム)の同期再生で
 * iOS の AudioContext を解錠する。生成も兼ねる。
 */
export function unlockSharedAudioContext(): AudioContext | null {
  const ctx = getSharedAudioContext();
  if (!ctx) return null;
  if (ctx.state === 'suspended') {
    void ctx.resume();
  }
  if (!unlocked) {
    try {
      const buffer = ctx.createBuffer(1, 1, ctx.sampleRate);
      const source = ctx.createBufferSource();
      source.buffer = buffer;
      source.connect(ctx.destination);
      source.start(0);
      unlocked = true;
    } catch {
      // 解錠失敗は致命的ではない（次のジェスチャーで再試行される）
    }
  }
  return ctx;
}

/** テスト用: シングルトン状態をリセットする。 */
export function __resetSharedAudioContextForTest(): void {
  sharedCtx = null;
  unlocked = false;
}
