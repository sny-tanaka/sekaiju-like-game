import type { Decorator } from '@storybook/react';
import { createElement } from 'react';
import type { ReactNode } from 'react';

import { SoundProvider } from '@/audio/SoundProvider';
import type { SaveData } from '@/domain/types';
import { GameStateProvider } from '@/store/gameState';
import type { Screen } from '@/store/navigation';
import { NavigationProvider } from '@/store/navigation';

/**
 * ページストーリー用の共通 decorator。
 * SoundProvider > NavigationProvider > GameStateProvider の順にラップする。
 * initialScreen で初期画面を固定できる（guild-char / dungeon / battle など遷移後の画面向け）。
 */
export function withGameContext(save: SaveData, initialScreen?: Screen): Decorator {
  const Wrapper = ({ children }: { children: ReactNode }) => (
    <SoundProvider>
      <NavigationProvider initialScreen={initialScreen}>
        <GameStateProvider initialSave={save}>{children}</GameStateProvider>
      </NavigationProvider>
    </SoundProvider>
  );
  Wrapper.displayName = 'GameContextWrapper';

  function GameContextDecorator(Story: Parameters<Decorator>[0]) {
    return <Wrapper>{createElement(Story as React.ComponentType)}</Wrapper>;
  }
  GameContextDecorator.displayName = 'GameContextDecorator';

  return GameContextDecorator;
}
