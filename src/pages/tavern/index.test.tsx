import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { createInitialSaveData } from '@/domain/saveData';
import type { QuestState, SaveData } from '@/domain/types';
import { Page as TavernPage } from '@/pages/tavern';
import { GameStateProvider } from '@/store/gameState';
import { NavigationProvider, useNavigation } from '@/store/navigation';

// tavern ページ（v3.0.0 §10.2）のロジック（タブ切替 / 受注・報告・破棄の状態遷移 /
// 上限3件の disable / バッジ表示）を検証する。

function buildSave(opts: {
  gems?: number;
  deepestReached?: number;
  questStates?: QuestState[];
  kills?: Record<string, number>;
}): SaveData {
  const save = createInitialSaveData('テストギルド');
  return {
    ...save,
    guild: { ...save.guild, gems: opts.gems ?? 0 },
    towerState: {
      ...save.towerState,
      record: { ...save.towerState.record, deepestReached: opts.deepestReached ?? 0 },
    },
    questStates: opts.questStates ?? [],
    bestiary: {
      monsters: Object.fromEntries(
        Object.entries(opts.kills ?? {}).map(([enemyId, kills]) => [
          enemyId,
          { seen: true, defeated: true, dropsFound: [], kills },
        ])
      ),
      items: {},
    },
  };
}

// 「拠点へ戻る」で screen が town に切り替わったことを検知するハーネス。
function Harness() {
  const { screen } = useNavigation();
  if (screen.name === 'town') return <div>拠点画面</div>;
  return <TavernPage />;
}

function renderTavern(save: SaveData) {
  return render(
    <NavigationProvider initialScreen={{ name: 'tavern' }}>
      <GameStateProvider initialSave={save}>
        <Harness />
      </GameStateProvider>
    </NavigationProvider>
  );
}

describe('TavernPage', () => {
  test('初期表示は掲示板タブで、解放済みの依頼カードと目標進捗が表示される', () => {
    const save = buildSave({ deepestReached: 0 });
    renderTavern(save);

    expect(screen.getByText('掲示板')).toBeInTheDocument();
    expect(screen.getByText('はじめての討伐')).toBeInTheDocument();
    expect(screen.getByText('スライム討伐 0/3')).toBeInTheDocument();
    // unlockDepth 3 以上の依頼はまだ掲示されない
    expect(screen.queryByText('鉄鉱石の注文')).not.toBeInTheDocument();
  });

  test('ヘッダーにジェムが toLocaleString 形式で表示される', () => {
    const save = buildSave({ gems: 1234 });
    renderTavern(save);
    expect(screen.getByText('✦ 1,234')).toBeInTheDocument();
  });

  test('受注する → 受注中表示に変わり、受注中タブに進捗バー付きカードが現れる', async () => {
    const user = userEvent.setup();
    const save = buildSave({ deepestReached: 0 });
    renderTavern(save);

    const card = screen.getByText('はじめての討伐').closest('div')!.parentElement!;
    await user.click(within(card).getByRole('button', { name: '受注する' }));

    await waitFor(() => expect(within(card).getByText('受注中')).toBeInTheDocument());

    await user.click(screen.getByRole('button', { name: /受注中/ }));
    expect(await screen.findByRole('button', { name: '破棄' })).toBeInTheDocument();
    expect(screen.getByText('スライム討伐 0/3')).toBeInTheDocument();
  });

  test('同時受注が3件のとき、未受注の依頼は受注ボタンが disabled になり注記が出る', () => {
    const active: QuestState[] = [
      { id: 'quest_first_hunt', status: 'active', progress: { baseKills: 0 } },
      { id: 'quest_rat_patrol', status: 'active', progress: { baseKills: 0 } },
      { id: 'quest_herb_delivery', status: 'active' },
    ];
    const save = buildSave({ deepestReached: 0, questStates: active });
    renderTavern(save);

    const card = screen.getByText('地下5階の調査').closest('div')!.parentElement!;
    expect(within(card).getByRole('button', { name: '受注する' })).toBeDisabled();
    expect(within(card).getByText('同時に受けられるのは3件まで')).toBeInTheDocument();
  });

  test('達成済みの依頼は受注中タブに件数バッジが出て、報告すると報酬トーストが出て記録に移る', async () => {
    const user = userEvent.setup();
    const save = buildSave({
      deepestReached: 0,
      questStates: [{ id: 'quest_first_hunt', status: 'active', progress: { baseKills: 0 } }],
      kills: { enemy_slime: 3 },
    });
    renderTavern(save);

    // 受注中タブのバッジに達成件数1が出る
    const activeTabBtn = screen.getByRole('button', { name: /受注中/ });
    expect(within(activeTabBtn).getByText('1')).toBeInTheDocument();

    await user.click(activeTabBtn);
    const reportBtn = await screen.findByRole('button', { name: '報告する' });
    await user.click(reportBtn);

    const toast = await screen.findByRole('status');
    expect(within(toast).getByText('はじめての討伐')).toBeInTheDocument();
    expect(within(toast).getByText(/を報告しました/)).toBeInTheDocument();
    expect(within(toast).getByText(/\+100G/)).toBeInTheDocument();
    expect(within(toast).getByText(/きずぐすり×3/)).toBeInTheDocument();

    // 完了扱いになり受注中タブから消える
    await waitFor(() =>
      expect(
        screen.getByText('受注中の依頼はありません。掲示板から受注しましょう。')
      ).toBeInTheDocument()
    );

    // 記録タブに完了依頼として現れる
    await user.click(screen.getByRole('button', { name: '記録' }));
    expect(await screen.findByText('はじめての討伐')).toBeInTheDocument();
  });

  test('未達成の依頼は破棄フロー（確認ダイアログ経由）で受注中から消える', async () => {
    const user = userEvent.setup();
    const save = buildSave({
      deepestReached: 0,
      questStates: [{ id: 'quest_rat_patrol', status: 'active', progress: { baseKills: 0 } }],
      kills: { enemy_giant_rat: 1 },
    });
    renderTavern(save);

    await user.click(screen.getByRole('button', { name: /受注中/ }));
    await user.click(screen.getByRole('button', { name: '破棄' }));

    // 確認ダイアログが出る。「やめる」では破棄されない
    expect(screen.getByRole('dialog', { name: '依頼の破棄確認' })).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'やめる' }));
    expect(screen.queryByRole('dialog', { name: '依頼の破棄確認' })).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: '破棄' })).toBeInTheDocument();

    // 再度破棄 → 確認 → 実行
    await user.click(screen.getByRole('button', { name: '破棄' }));
    await user.click(screen.getByRole('button', { name: '破棄する' }));

    await waitFor(() =>
      expect(
        screen.getByText('受注中の依頼はありません。掲示板から受注しましょう。')
      ).toBeInTheDocument()
    );
  });

  test('記録タブは完了済みの一回限り依頼とくり返し依頼の累計達成回数を表示する', async () => {
    const user = userEvent.setup();
    const save = buildSave({
      deepestReached: 3,
      questStates: [
        { id: 'quest_reach_f5', status: 'done' },
        { id: 'quest_r_hunt_t0', status: 'unaccepted', progress: { timesCompleted: 2 } },
      ],
    });
    renderTavern(save);

    await user.click(screen.getByRole('button', { name: '記録' }));
    expect(screen.getByText('地下5階の調査')).toBeInTheDocument();
    expect(screen.getByText('森の間引き')).toBeInTheDocument();
    expect(screen.getByText('達成 2 回')).toBeInTheDocument();
  });

  test('拠点へ戻るボタンで town 画面に遷移する', async () => {
    const user = userEvent.setup();
    const save = buildSave({});
    renderTavern(save);

    await user.click(screen.getByRole('button', { name: '拠点へ戻る' }));
    expect(await screen.findByText('拠点画面')).toBeInTheDocument();
  });
});
