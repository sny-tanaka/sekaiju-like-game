import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';

import { mockWithParty } from '@/__stories__/mockSaves';
import { SaveTransfer } from '@/components/common/SaveTransfer/SaveTransfer';
import type { SaveData } from '@/domain/types';
import { GameStateProvider } from '@/store/gameState';
import { NavigationProvider, useNavigation } from '@/store/navigation';
import * as saveStore from '@/store/saveStore';
import { decodeSaveTransfer, encodeSaveTransfer } from '@/store/saveTransfer';

// ============================================================================
// SaveTransfer.tsx の単体テスト（ファイル方式）
// ============================================================================

// audio 系のモック（useSfx が Web Audio を参照するため）
vi.mock('@/audio/useSfx', () => ({
  useSfx: () => () => undefined,
}));

// saveStore のモック（IndexedDB を使わない）
// デフォルトでは getSaveMeta が valid な meta を返すようにして
// 既存テスト（initialSave あり）でボタンが enabled になるケースを維持する。
// 「ディスクなし」「破損」シナリオは各テスト内で mockResolvedValueOnce で上書きする。
vi.mock('@/store/saveStore', () => ({
  saveGame: vi.fn(async (data: SaveData) => data),
  loadGame: vi.fn(async () => ({ ok: false as const, reason: 'empty' as const })),
  deleteGame: vi.fn(async () => undefined),
  getSaveMeta: vi.fn(async () => ({
    guildName: 'テストギルド',
    deepestReached: 1,
    memberCount: 5,
    savedAt: Date.now(),
    corrupted: false,
  })),
  _resetDbForTest: vi.fn(async () => undefined),
}));

// --- テストハーネス ---

function NavigationDisplay() {
  const { screen } = useNavigation();
  return <div data-testid="current-screen">{screen.name}</div>;
}

function renderSaveTransfer(initialSave?: SaveData) {
  return render(
    <GameStateProvider initialSave={initialSave}>
      <NavigationProvider>
        <NavigationDisplay />
        <SaveTransfer />
      </NavigationProvider>
    </GameStateProvider>
  );
}

// --- navigator.share / navigator.canShare / URL モックのセットアップ ---

type ShareMock = {
  shareFn: ReturnType<typeof vi.fn>;
  canShareFn: ReturnType<typeof vi.fn>;
};

function setupShareMock(behavior: 'success' | 'abort' | 'error' | 'none'): ShareMock {
  let shareFn: ReturnType<typeof vi.fn>;
  let canShareFn: ReturnType<typeof vi.fn>;

  if (behavior === 'none') {
    // Web Share API が存在しない環境
    canShareFn = vi.fn().mockReturnValue(false);
    shareFn = vi.fn();
  } else {
    canShareFn = vi.fn().mockReturnValue(true);
    if (behavior === 'success') {
      shareFn = vi.fn().mockResolvedValue(undefined);
    } else if (behavior === 'abort') {
      const err = new DOMException('User cancelled', 'AbortError');
      shareFn = vi.fn().mockRejectedValue(err);
    } else {
      // 'error'
      shareFn = vi.fn().mockRejectedValue(new Error('share failed'));
    }
  }

  Object.defineProperty(navigator, 'canShare', {
    value: canShareFn,
    configurable: true,
    writable: true,
  });
  Object.defineProperty(navigator, 'share', {
    value: shareFn,
    configurable: true,
    writable: true,
  });

  return { shareFn, canShareFn };
}

// document.createElement の <a> click スパイ
let clickedAnchors: HTMLAnchorElement[] = [];

function setupDownloadSpy() {
  clickedAnchors = [];
  const originalCreate = document.createElement.bind(document);
  const createSpy = vi.spyOn(document, 'createElement').mockImplementation((tag: string) => {
    const el = originalCreate(tag);
    if (tag === 'a') {
      const origClick = el.click.bind(el);
      el.click = () => {
        clickedAnchors.push(el as HTMLAnchorElement);
        origClick();
      };
    }
    return el;
  });
  return createSpy;
}

// Blob/File の text() が jsdom で動作しない場合に備えた安全な読み取りヘルパー
function readBlobAsText(blob: Blob): Promise<string> {
  // text() が実装されていれば使う、なければ FileReader で代替
  if (typeof blob.text === 'function') {
    return blob.text();
  }
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsText(blob);
  });
}

// URL.createObjectURL / revokeObjectURL のモック
// jsdom には createObjectURL が存在しないため、直接プロパティとして定義する。
let createdObjectUrls: { blob: Blob; url: string }[] = [];
let createObjectUrlFn: ReturnType<typeof vi.fn>;
let revokeObjectUrlFn: ReturnType<typeof vi.fn>;

function setupUrlMocks() {
  createdObjectUrls = [];
  createObjectUrlFn = vi.fn((blob: Blob) => {
    const url = `blob:http://localhost/${Math.random().toString(36).slice(2)}`;
    createdObjectUrls.push({ blob, url });
    return url;
  });
  revokeObjectUrlFn = vi.fn();
  // jsdom では URL.createObjectURL が未定義のため Object.defineProperty で設定
  Object.defineProperty(URL, 'createObjectURL', {
    value: createObjectUrlFn,
    configurable: true,
    writable: true,
  });
  Object.defineProperty(URL, 'revokeObjectURL', {
    value: revokeObjectUrlFn,
    configurable: true,
    writable: true,
  });
}

// --- テスト ---

describe('SaveTransfer', () => {
  beforeEach(() => {
    setupUrlMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    cleanup();
  });

  // ============================================================
  // エクスポートボタンの disabled 状態チェック
  // ============================================================

  test('save が無い状態では「セーブをファイルに保存」が disabled になる', async () => {
    vi.mocked(saveStore.getSaveMeta).mockResolvedValue(null);
    renderSaveTransfer();
    // getSaveMeta の解決まで待つ
    await waitFor(() => {
      expect(saveStore.getSaveMeta).toHaveBeenCalled();
    });
    const btn = screen.getByRole('button', { name: 'セーブをファイルに保存' });
    expect(btn).toBeDisabled();
  });

  test('メモリ null + ディスクに valid セーブ → disabled が解け、クリックで loadGame が呼ばれる', async () => {
    setupShareMock('success');
    vi.mocked(saveStore.getSaveMeta).mockResolvedValue({
      guildName: mockWithParty.guild.name,
      deepestReached: 1,
      memberCount: 5,
      savedAt: Date.now(),
      corrupted: false,
    });
    vi.mocked(saveStore.loadGame).mockResolvedValue({ ok: true, data: mockWithParty });

    // initialSave を渡さない → useGameState().save = null
    renderSaveTransfer();

    // getSaveMeta が解決するまで待つ → ボタンが enabled になる
    const btn = screen.getByRole('button', { name: 'セーブをファイルに保存' });
    await waitFor(() => {
      expect(btn).not.toBeDisabled();
    });

    const user = userEvent.setup();
    await user.click(btn);

    await waitFor(() => {
      expect(saveStore.loadGame).toHaveBeenCalled();
    });
  });

  test('メモリ null + ディスクも空 → disabled のまま', async () => {
    vi.mocked(saveStore.getSaveMeta).mockResolvedValue(null);

    renderSaveTransfer();

    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'セーブをファイルに保存' })).toBeDisabled();
    });
    expect(saveStore.getSaveMeta).toHaveBeenCalled();
  });

  test('メモリ null + ディスクが corrupted → disabled のまま', async () => {
    vi.mocked(saveStore.getSaveMeta).mockResolvedValue({
      guildName: '',
      deepestReached: 0,
      memberCount: 0,
      savedAt: 0,
      corrupted: true,
    });

    renderSaveTransfer();

    await waitFor(() => {
      expect(saveStore.getSaveMeta).toHaveBeenCalled();
    });

    const btn = screen.getByRole('button', { name: 'セーブをファイルに保存' });
    expect(btn).toBeDisabled();
  });

  // ============================================================
  // エクスポート: Web Share API
  // ============================================================

  test('エクスポート: Web Share API が使えるとき navigator.share が files:[File] で呼ばれ、中身が decode できる', async () => {
    const { shareFn } = setupShareMock('success');
    const user = userEvent.setup();
    renderSaveTransfer(mockWithParty);

    const btn = await screen.findByRole('button', { name: 'セーブをファイルに保存' });
    await waitFor(() => expect(btn).not.toBeDisabled());
    await user.click(btn);

    await waitFor(() => {
      expect(shareFn).toHaveBeenCalled();
    });

    // 引数に files 配列があることを確認
    const callArg = shareFn.mock.calls[0][0] as { files: File[]; title: string };
    expect(callArg.files).toHaveLength(1);
    const file = callArg.files[0];
    expect(file.name).toMatch(/\.txt$/);

    // File の中身を decode すると元の SaveData が戻る
    // jsdom 環境で File.text() が使えない場合は FileReader 経由で読む
    const text = await readBlobAsText(file);
    const result = decodeSaveTransfer(text);
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.data.guild.name).toBe(mockWithParty.guild.name);
    }

    // 「共有しました」toast
    await waitFor(() => {
      expect(screen.getByText('共有しました')).toBeInTheDocument();
    });
  });

  test('エクスポート: Web Share API が無い (canShare=false) → ダウンロードフォールバック', async () => {
    setupShareMock('none');
    const downloadSpy = setupDownloadSpy();
    const user = userEvent.setup();
    renderSaveTransfer(mockWithParty);

    const btn = await screen.findByRole('button', { name: 'セーブをファイルに保存' });
    await waitFor(() => expect(btn).not.toBeDisabled());
    await user.click(btn);

    await waitFor(() => {
      expect(clickedAnchors).toHaveLength(1);
    });

    const anchor = clickedAnchors[0];
    expect(anchor.download).toMatch(/sekaiju-save-.+\.txt$/);

    // URL.createObjectURL に渡した Blob の中身が decode できる
    expect(createdObjectUrls).toHaveLength(1);
    const blobText = await readBlobAsText(createdObjectUrls[0].blob);
    const result = decodeSaveTransfer(blobText);
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.data.guild.name).toBe(mockWithParty.guild.name);
    }

    await waitFor(() => {
      expect(screen.getByText('ダウンロードしました')).toBeInTheDocument();
    });

    downloadSpy.mockRestore();
  });

  test('エクスポート: Web Share API が AbortError でキャンセルしてもエラーにならない', async () => {
    setupShareMock('abort');
    const user = userEvent.setup();
    renderSaveTransfer(mockWithParty);

    const btn = await screen.findByRole('button', { name: 'セーブをファイルに保存' });
    await waitFor(() => expect(btn).not.toBeDisabled());
    await user.click(btn);

    // エラー toast や error メッセージが出ないこと
    await waitFor(() => {
      expect(screen.queryByText('エラー')).not.toBeInTheDocument();
    });
    // toast が出ないことを確認（共有しましたもダウンロードしましたも無い）
    expect(screen.queryByText('共有しました')).not.toBeInTheDocument();
    expect(screen.queryByText('ダウンロードしました')).not.toBeInTheDocument();
  });

  test('エクスポート: Web Share API が通常エラーでもダウンロードフォールバックが動く', async () => {
    setupShareMock('error');
    const downloadSpy = setupDownloadSpy();
    const user = userEvent.setup();
    renderSaveTransfer(mockWithParty);

    const btn = await screen.findByRole('button', { name: 'セーブをファイルに保存' });
    await waitFor(() => expect(btn).not.toBeDisabled());
    await user.click(btn);

    await waitFor(() => {
      expect(clickedAnchors).toHaveLength(1);
    });

    await waitFor(() => {
      expect(screen.getByText('ダウンロードしました')).toBeInTheDocument();
    });

    downloadSpy.mockRestore();
  });

  // ============================================================
  // インポート
  // ============================================================

  test('インポート: 正しい内容のファイルを選択した状態 + 既存セーブあり → 上書き確認モーダル', async () => {
    renderSaveTransfer(mockWithParty);

    const validStr = encodeSaveTransfer(mockWithParty);
    const file = new File([validStr], 'save.txt', { type: 'text/plain' });

    const input = document.querySelector('input[type="file"]') as HTMLInputElement;
    Object.defineProperty(input, 'files', { value: [file], configurable: true });
    fireEvent.change(input);

    await waitFor(() => {
      expect(screen.getByText(/は上書きされて元に戻せません/)).toBeInTheDocument();
    });
  });

  test('インポート: 上書き確認 OK → applyAndPersist が呼ばれて navigate(town) される', async () => {
    const user = userEvent.setup();
    renderSaveTransfer(mockWithParty);

    const validStr = encodeSaveTransfer(mockWithParty);
    const file = new File([validStr], 'save.txt', { type: 'text/plain' });

    const input = document.querySelector('input[type="file"]') as HTMLInputElement;
    Object.defineProperty(input, 'files', { value: [file], configurable: true });
    fireEvent.change(input);

    // 確認モーダルが出る
    await waitFor(() => {
      expect(screen.getByText(/は上書きされて元に戻せません/)).toBeInTheDocument();
    });

    // 「読み込む」ボタン（dangerBtn）を押す
    const confirmBtn = screen.getByRole('button', { name: '読み込む' });
    await user.click(confirmBtn);

    // town へ遷移
    await waitFor(() => {
      expect(screen.getByTestId('current-screen').textContent).toBe('town');
    });
  }, 10000);

  test('インポート: 壊れた内容のファイル → error メッセージが表示され applyAndPersist は呼ばれない', async () => {
    renderSaveTransfer(mockWithParty);

    const file = new File(['これは不正なデータです'], 'bad.txt', { type: 'text/plain' });

    const input = document.querySelector('input[type="file"]') as HTMLInputElement;
    Object.defineProperty(input, 'files', { value: [file], configurable: true });
    fireEvent.change(input);

    await waitFor(() => {
      expect(screen.getByText(/セーブの文字列ではありません/)).toBeInTheDocument();
    });

    // 画面が town に遷移していない = applyAndPersist は呼ばれていない
    expect(screen.getByTestId('current-screen').textContent).not.toBe('town');
  });

  // ============================================================
  // label-wrap / visually-hidden / file.text() テスト
  // ============================================================

  test('インポートボタンは <label> の子として <input type="file"> が配置されている', () => {
    renderSaveTransfer(mockWithParty);

    const labelText = screen.getByText('セーブのファイルを読み込む');
    const label = labelText.closest('label');
    expect(label).not.toBeNull();

    const input = label!.querySelector('input[type="file"]');
    expect(input).not.toBeNull();
  });

  test('file input の className には fileInput クラスが含まれる（visually-hidden 指定）', () => {
    renderSaveTransfer(mockWithParty);

    const input = document.querySelector('input[type="file"]') as HTMLInputElement;
    expect(input).not.toBeNull();
    // CSS Modules は "[hash]_fileInput" の形式になる
    expect(input.className).toMatch(/fileInput/);
  });

  test('file.text() が存在する場合はそれを呼び、applyAndPersist まで動く', async () => {
    renderSaveTransfer(); // save=null で initialSave 無し（ディスク有りはデフォルト mock）

    const validStr = encodeSaveTransfer(mockWithParty);

    // file.text() が呼ばれて validStr を返すモックファイルを作る
    const mockFile = {
      text: vi.fn().mockResolvedValue(validStr),
      name: 'save.txt',
      size: validStr.length,
      type: 'text/plain',
    } as unknown as File;

    const input = document.querySelector('input[type="file"]') as HTMLInputElement;
    Object.defineProperty(input, 'files', { value: [mockFile], configurable: true });
    fireEvent.change(input);

    // save=null の場合は確認モーダルなしで直接 applyAndPersist が呼ばれ town へ遷移
    await waitFor(() => {
      expect(screen.getByTestId('current-screen').textContent).toBe('town');
    });

    expect(mockFile.text).toHaveBeenCalled();
  }, 10000);

  test('file.text() が無い場合は FileReader にフォールバックして applyAndPersist まで動く', async () => {
    renderSaveTransfer(); // save=null

    const validStr = encodeSaveTransfer(mockWithParty);
    const file = new File([validStr], 'save.txt', { type: 'text/plain' });

    // text() を消して FileReader 経由を強制する
    Object.defineProperty(file, 'text', { value: undefined, configurable: true });

    const input = document.querySelector('input[type="file"]') as HTMLInputElement;
    Object.defineProperty(input, 'files', { value: [file], configurable: true });
    fireEvent.change(input);

    // FileReader 経由で読めて town へ遷移するはず
    await waitFor(() => {
      expect(screen.getByTestId('current-screen').textContent).toBe('town');
    });
  }, 10000);

  // ============================================================
  // 貼り付け経路
  // ============================================================

  test('貼り付け経路: 正しい文字列 + 既存セーブあり → 上書き確認モーダル', async () => {
    renderSaveTransfer(mockWithParty);

    const validStr = encodeSaveTransfer(mockWithParty);
    const textarea = screen.getByPlaceholderText('ここに引き継ぎ文字列を貼り付け');
    fireEvent.change(textarea, { target: { value: validStr } });

    const btn = screen.getByRole('button', { name: '貼り付けた文字列を読み込む' });
    expect(btn).not.toBeDisabled();
    await userEvent.setup().click(btn);

    await waitFor(() => {
      expect(screen.getByText(/は上書きされて元に戻せません/)).toBeInTheDocument();
    });
  });

  test('貼り付け経路: 確認 OK → applyAndPersist 呼出 → navigate(town)', async () => {
    const user = userEvent.setup();
    renderSaveTransfer(mockWithParty);

    const validStr = encodeSaveTransfer(mockWithParty);
    const textarea = screen.getByPlaceholderText('ここに引き継ぎ文字列を貼り付け');
    fireEvent.change(textarea, { target: { value: validStr } });

    await user.click(screen.getByRole('button', { name: '貼り付けた文字列を読み込む' }));

    await waitFor(() => {
      expect(screen.getByText(/は上書きされて元に戻せません/)).toBeInTheDocument();
    });

    await user.click(screen.getByRole('button', { name: '読み込む' }));

    await waitFor(() => {
      expect(screen.getByTestId('current-screen').textContent).toBe('town');
    });
  }, 10000);

  test('貼り付け経路: 壊れた文字列 → エラーメッセージ表示、applyAndPersist は呼ばれない', async () => {
    const user = userEvent.setup();
    renderSaveTransfer(mockWithParty);

    const textarea = screen.getByPlaceholderText('ここに引き継ぎ文字列を貼り付け');
    fireEvent.change(textarea, { target: { value: 'これは不正なデータです' } });

    await user.click(screen.getByRole('button', { name: '貼り付けた文字列を読み込む' }));

    await waitFor(() => {
      expect(screen.getByText(/セーブの文字列ではありません/)).toBeInTheDocument();
    });

    expect(screen.getByTestId('current-screen').textContent).not.toBe('town');
  });

  test('貼り付け経路: 空文字 / 空白だけ → ボタンが disabled', () => {
    renderSaveTransfer(mockWithParty);

    const btn = screen.getByRole('button', { name: '貼り付けた文字列を読み込む' });
    // 初期状態（空）
    expect(btn).toBeDisabled();

    // 空白だけ
    const textarea = screen.getByPlaceholderText('ここに引き継ぎ文字列を貼り付け');
    fireEvent.change(textarea, { target: { value: '   ' } });
    expect(btn).toBeDisabled();

    // 文字列を入れたら enabled
    fireEvent.change(textarea, { target: { value: 'abc' } });
    expect(btn).not.toBeDisabled();
  });

  test('インポート: file input は同じファイル 2 回連続選択に対応 (onChange 後に value がリセットされる)', () => {
    // コンポーネントが onChange ハンドラーの先頭で e.target.value = '' を実行していることを
    // コードレベルで確認するためのテスト。
    // jsdom では「同じ value のファイルを再選択すると change が発火しない」制御がないため、
    // fireEvent.change で 2 回呼べるが、実際の動作はコード検証で担保する。
    //
    // 検証方法: input.value setter をスパイして、fireEvent.change 後に
    // value = '' が呼ばれることを確認する。
    // ただし FileReader は async なので、value リセットは FileReader より先（sync）に実行される。
    renderSaveTransfer(mockWithParty);

    const validStr = encodeSaveTransfer(mockWithParty);
    const file = new File([validStr], 'save.txt', { type: 'text/plain' });

    const input = document.querySelector('input[type="file"]') as HTMLInputElement;

    // input.value セッターをスパイ
    const valueSetter = vi.fn();
    const originalDescriptor = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value');
    Object.defineProperty(input, 'value', {
      set: valueSetter,
      get: () => '',
      configurable: true,
    });

    try {
      // 1 回目
      Object.defineProperty(input, 'files', { value: [file], configurable: true });
      fireEvent.change(input);
      // handleFileChange は async だが value = '' は同期的に実行される
      expect(valueSetter).toHaveBeenCalledWith('');

      // 2 回目
      valueSetter.mockClear();
      Object.defineProperty(input, 'files', { value: [file], configurable: true });
      fireEvent.change(input);
      expect(valueSetter).toHaveBeenCalledWith('');
    } finally {
      // プロパティを元に戻す
      if (originalDescriptor) {
        Object.defineProperty(input, 'value', originalDescriptor);
      }
    }
  });
});
