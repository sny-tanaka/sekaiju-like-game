/**
 * sharedAudioContext.test.ts
 *
 * 共有 AudioContext シングルトンの動作を検証する。
 * window.AudioContext をモックして jsdom 環境でテストする。
 */

import {
  getSharedAudioContext,
  unlockSharedAudioContext,
  __resetSharedAudioContextForTest,
} from './sharedAudioContext';

// ────────────────────────────────────────────────────────────────
// モック AudioContext
// ────────────────────────────────────────────────────────────────
function createMockAudioContext() {
  const mockResumeFn = vi.fn(function (this: { state: string }) {
    this.state = 'running';
    return Promise.resolve();
  });

  const mockStartFn = vi.fn();
  const mockConnectFn = vi.fn();

  const mockBufferSource = {
    buffer: null as AudioBuffer | null,
    connect: mockConnectFn,
    start: mockStartFn,
  };

  class MockAudioContext {
    state = 'suspended';
    sampleRate = 44100;
    destination = {};
    resume = mockResumeFn;
    createBuffer = vi.fn(() => ({}) as AudioBuffer);
    createBufferSource = vi.fn(() => mockBufferSource);
  }

  return { MockAudioContext, mockResumeFn, mockStartFn, mockConnectFn };
}

// ────────────────────────────────────────────────────────────────
// テスト
// ────────────────────────────────────────────────────────────────
describe('sharedAudioContext', () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let originalAudioContext: any;

  beforeEach(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    originalAudioContext = (window as any).AudioContext;
    __resetSharedAudioContextForTest();
  });

  afterEach(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).AudioContext = originalAudioContext;
    __resetSharedAudioContextForTest();
  });

  test('getSharedAudioContext: AudioContext 不在時（jsdom デフォルト）は null を返す', () => {
    // jsdom には AudioContext がないのでそのまま呼べば null になる
    // ただし環境によっては定義されている場合があるため、明示的に削除して確認
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).AudioContext = undefined;
    const ctx = getSharedAudioContext();
    expect(ctx).toBeNull();
  });

  test('getSharedAudioContext: 2回呼んでも同一インスタンスを返す', () => {
    const { MockAudioContext } = createMockAudioContext();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).AudioContext = MockAudioContext;

    const ctx1 = getSharedAudioContext();
    const ctx2 = getSharedAudioContext();
    expect(ctx1).not.toBeNull();
    expect(ctx1).toBe(ctx2);
  });

  test('unlockSharedAudioContext: suspended 状態で resume() が呼ばれる', () => {
    const { MockAudioContext, mockResumeFn } = createMockAudioContext();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).AudioContext = MockAudioContext;

    unlockSharedAudioContext();
    expect(mockResumeFn).toHaveBeenCalled();
  });

  test('unlockSharedAudioContext: createBufferSource().start() が呼ばれる（解錠用バッファ再生）', () => {
    const { MockAudioContext, mockStartFn } = createMockAudioContext();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).AudioContext = MockAudioContext;

    unlockSharedAudioContext();
    expect(mockStartFn).toHaveBeenCalled();
  });

  test('unlockSharedAudioContext: 2回目の呼び出しでは start() が再度呼ばれない（解錠済みフラグ）', () => {
    const { MockAudioContext, mockStartFn } = createMockAudioContext();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).AudioContext = MockAudioContext;

    unlockSharedAudioContext();
    unlockSharedAudioContext();
    // 解錠は1回のみ
    expect(mockStartFn).toHaveBeenCalledTimes(1);
  });

  test('__resetSharedAudioContextForTest: リセット後は新インスタンスが生成される', () => {
    const { MockAudioContext } = createMockAudioContext();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).AudioContext = MockAudioContext;

    const ctx1 = getSharedAudioContext();
    __resetSharedAudioContextForTest();
    const ctx2 = getSharedAudioContext();
    expect(ctx1).not.toBeNull();
    expect(ctx2).not.toBeNull();
    expect(ctx1).not.toBe(ctx2);
  });
});
