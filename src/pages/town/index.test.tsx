import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { addCharacterToGuild, createCharacter, createInitialSaveData } from '@/domain/saveData';
import type { DiveState, QuestState, SaveData } from '@/domain/types';
import { Page as TownPage } from '@/pages/town';
import { GameStateProvider } from '@/store/gameState';
import { NavigationProvider, useNavigation } from '@/store/navigation';

// town ページの v3.0.0 §10.1 改修（✦ ジェム表示・酒場カードのバッジ/disabled）を検証する。

const FAKE_DIVE_STATE: DiveState = {
  depth: 3,
  pos: { x: 0, y: 0 },
  dir: 'N',
  party: [],
  persistentSummons: [],
  encounter: { stepsUntilEncounter: 5 },
  pendingFoeBattle: null,
};

function buildSave(opts: {
  gold?: number;
  gems?: number;
  diving?: boolean;
  questStates?: QuestState[];
  kills?: Record<string, number>;
}): SaveData {
  let save = createInitialSaveData('テストギルド');
  const member = createCharacter({
    raceId: 'race_human',
    classId: 'class_warrior',
    name: 'ゆうしゃ',
    id: 'char_test_town',
  });
  save = addCharacterToGuild(save, member);
  return {
    ...save,
    guild: { ...save.guild, gold: opts.gold ?? 0, gems: opts.gems ?? 0 },
    diveState: opts.diving ? FAKE_DIVE_STATE : null,
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

// 酒場カードの遷移先を可視化するハーネス。
function Harness() {
  const { screen: nav } = useNavigation();
  if (nav.name === 'tavern') return <div>酒場画面</div>;
  return <TownPage />;
}

function renderTown(save: SaveData) {
  return render(
    <NavigationProvider initialScreen={{ name: 'town' }}>
      <GameStateProvider initialSave={save}>
        <Harness />
      </GameStateProvider>
    </NavigationProvider>
  );
}

describe('TownPage', () => {
  test('ヘッダーに gold の隣に ✦ ジェムが toLocaleString 形式で表示される', () => {
    const save = buildSave({ gold: 12345, gems: 6789 });
    renderTown(save);

    expect(screen.getByText('◇ 12,345 G')).toBeInTheDocument();
    expect(screen.getByText('✦ 6,789')).toBeInTheDocument();
  });

  test('報告可能な依頼が無いとき、酒場カードにバッジは出ない', () => {
    const save = buildSave({ questStates: [] });
    renderTown(save);

    expect(screen.getByText('酒場 — 依頼掲示板')).toBeInTheDocument();
    expect(screen.queryByLabelText(/報告可能な依頼/)).not.toBeInTheDocument();
  });

  test('報告可能な依頼があるとき、酒場カードに件数バッジが出る', () => {
    const save = buildSave({
      questStates: [{ id: 'quest_first_hunt', status: 'active', progress: { baseKills: 0 } }],
      kills: { enemy_slime: 3 },
    });
    renderTown(save);

    expect(screen.getByLabelText('報告可能な依頼 1 件')).toHaveTextContent('1');
  });

  test('ダイブ中は酒場カードが disabled になりタップしても遷移しない', async () => {
    const user = userEvent.setup();
    const save = buildSave({ diving: true });
    renderTown(save);

    const tavernCard = screen.getByRole('button', { name: /酒場 — 依頼掲示板/ });
    expect(tavernCard).toBeDisabled();

    await user.click(tavernCard);
    expect(screen.queryByText('酒場画面')).not.toBeInTheDocument();
  });

  test('ダイブ中でなければ酒場カードのタップで酒場へ遷移する', async () => {
    const user = userEvent.setup();
    const save = buildSave({});
    renderTown(save);

    const tavernCard = screen.getByRole('button', { name: /酒場 — 依頼掲示板/ });
    expect(tavernCard).not.toBeDisabled();

    await user.click(tavernCard);
    expect(await screen.findByText('酒場画面')).toBeInTheDocument();
  });
});
