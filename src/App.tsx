import { PageTurn } from '@/components/common/PageTurn/PageTurn';
import { Page as BattlePage } from '@/pages/battle';
import { Page as CodexPage } from '@/pages/codex';
import { Page as DungeonPage } from '@/pages/dungeon';
import { Page as ForgePage } from '@/pages/forge';
import { Page as GuildPage } from '@/pages/guild';
import { Page as GuildCharPage } from '@/pages/guild-char';
import { Page as NotFoundPage } from '@/pages/not-found';
import { Page as ShopPage } from '@/pages/shop';
import { Page as TitlePage } from '@/pages/title';
import { Page as TownPage } from '@/pages/town';
import { useNavigation } from '@/store/navigation';

// 画面遷移（[07 §1]）: タイトル / 拠点 / 探索 / 戦闘。
// react-router を撤去し、NavigationProvider の screen state で擬似ルーティングする。
// PageTurn ラッパーが遷移時にページめくりオーバーレイを走らせる（Phase 2）。
function App() {
  const { screen } = useNavigation();
  const content = (() => {
    switch (screen.name) {
      case 'title':
        return <TitlePage />;
      case 'town':
        return <TownPage />;
      case 'guild':
        return <GuildPage />;
      case 'guildChar':
        return <GuildCharPage id={screen.id} />;
      case 'shop':
        return <ShopPage />;
      case 'forge':
        return <ForgePage />;
      case 'codex':
        return <CodexPage />;
      case 'dungeon':
        return <DungeonPage />;
      case 'battle':
        return <BattlePage />;
      default:
        return <NotFoundPage />;
    }
  })();

  return <PageTurn>{content}</PageTurn>;
}

export default App;
