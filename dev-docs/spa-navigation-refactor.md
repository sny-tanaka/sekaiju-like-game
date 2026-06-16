# SPA 擬似ナビゲーション化リファクタ設計書

## 背景・目的

本ゲームは React の SPA であり、ゲームの性質上 URL によるページ遷移は不要。
にもかかわらず現状は `react-router`（`BrowserRouter` + `Routes`）で `/title` `/town`
等の **実 URL パス**を持ってしまっている。GitHub Pages のサブパス公開
（`/sekaiju-like-game/`）と相まって、ディープリンクや 404 フォールバックの懸念もある。

本リファクタでは **react-router を完全に撤去**し、画面の状態を「擬似ページキー」
として React state（Context）で保持し、キーを更新することで擬似的に画面遷移する。
実 URL はルート（`/sekaiju-like-game/`）のみとする。

## 方針の要点

- `react-router` 依存を撤去（`package.json` から削除）。
- 新規 `src/store/navigation.tsx` に `NavigationProvider` / `useNavigation` /
  `Screen` 型 / `Redirect` ヘルパーを実装する。
- 画面は **discriminated union（タグ付き union）** で型安全に表現する。
  guild-char の `:id` パラメータは Screen の値として保持する（`useParams` の代替）。
- `App.tsx` は現在の Screen に応じて該当ページを `switch` で描画する（Routes の代替）。
- ページ内の `navigate('/xxx')` は `navigate({ name: 'xxx' })` に置換。
- 条件付きで描画されていた `<Navigate to="/xxx" replace />`（ガード）は
  `<Redirect to={{ name: 'xxx' }} />` に置換。
- `BgmProvider` の `useLocation().pathname` 依存を `useNavigation()` に置換。

## Screen 型（src/store/navigation.tsx）

```ts
export type Screen =
  | { name: 'title' }
  | { name: 'town' }
  | { name: 'guild' }
  | { name: 'guildChar'; id: string }
  | { name: 'shop' }
  | { name: 'forge' }
  | { name: 'codex' }
  | { name: 'dungeon' }
  | { name: 'battle' };

export type ScreenName = Screen['name'];
```

初期画面は `{ name: 'title' }`。

## NavigationProvider / useNavigation 仕様

```ts
interface NavigationContextValue {
  screen: Screen;
  navigate: (screen: Screen) => void;
}
```

- `useState<Screen>({ name: 'title' })` で保持。
- `navigate` は `useCallback` でメモ化し `setScreen(next)` するだけ。
- `useNavigation()` は Context が無ければ throw（Provider 必須）。

### Redirect ヘルパー（render 中の遷移を安全に行う）

react-router の `<Navigate>` 同様、ガード条件成立時に条件付きで描画して遷移させる。
ただし「描画中に別コンポーネントの state を更新」する警告を避けるため `useEffect` で遷移する。
無限ループを避けるため、対象画面と現在画面が同一なら何もしない。

```tsx
export function Redirect({ to }: { to: Screen }) {
  const { screen, navigate } = useNavigation();
  useEffect(() => {
    // name と（あれば）id が一致していれば再遷移しない
    const same =
      screen.name === to.name &&
      (to.name !== 'guildChar' || screen.name !== 'guildChar' || screen.id === to.id);
    if (!same) navigate(to);
    // to は呼び出し側で固定リテラルのため name/id を依存にする
  }, [screen, navigate, to]);
  return null;
}
```

> 注: `to` はインラインのオブジェクトリテラルで毎回新規参照になるが、上記 `same`
> ガードにより実際の `navigate` は最大1回（target が変わった時のみ）に収束する。問題ない。

## main.tsx の Provider 階層

`BgmProvider` が `useNavigation()` を使うため、`NavigationProvider` は
`BgmProvider` の**外側**に置く。

```tsx
createRoot(container).render(
  <SoundProvider>
    <NavigationProvider>
      <BgmProvider>
        <GameStateProvider>
          <App />
        </GameStateProvider>
      </BgmProvider>
    </NavigationProvider>
  </SoundProvider>
);
```

`BrowserRouter`（および `basename`）は削除する。`import { BrowserRouter } from 'react-router'` も削除。

## App.tsx（Routes の代替）

```tsx
function App() {
  const { screen } = useNavigation();
  switch (screen.name) {
    case 'title':     return <TitlePage />;
    case 'town':      return <TownPage />;
    case 'guild':     return <GuildPage />;
    case 'guildChar': return <GuildCharPage id={screen.id} />;
    case 'shop':      return <ShopPage />;
    case 'forge':     return <ForgePage />;
    case 'codex':     return <CodexPage />;
    case 'dungeon':   return <DungeonPage />;
    case 'battle':    return <BattlePage />;
    default:          return <NotFoundPage />;
  }
}
```

- `Navigate` / `Route` / `Routes` の import は削除。
- `guildChar` だけは `id` を prop で渡す（`useParams` の代替。下記参照）。
- `default` は網羅性のため残す（`NotFoundPage` を流用）。union が網羅されていれば
  到達しないが、防御的に残す。`NotFoundPage` の import は維持。

## 各ファイルの置換内容

すべて `import ... from 'react-router'` を削除し、必要に応じて
`import { useNavigation } from '@/store/navigation';` を追加する。
各ページ先頭の `const navigate = useNavigate();` は `const { navigate } = useNavigation();` に置換。

### src/pages/title/index.tsx
- `navigate('/town')` → `navigate({ name: 'town' })`（2 箇所: handleContinue, confirmCreate）

### src/pages/town/index.tsx
- ガード `<Navigate to="/title" replace />` → `<Redirect to={{ name: 'title' }} />`
- `navigate('/title')` → `navigate({ name: 'title' })`
- `navigate('/dungeon')` → `navigate({ name: 'dungeon' })`（2 箇所）
- `navigate('/guild')` → `navigate({ name: 'guild' })`
- `navigate('/shop')` → `navigate({ name: 'shop' })`
- `navigate('/forge')` → `navigate({ name: 'forge' })`
- `navigate('/codex')` → `navigate({ name: 'codex' })`

### src/pages/guild/index.tsx
- ガード `<Navigate to="/title" replace />` → `<Redirect to={{ name: 'title' }} />`
- `navigate(`/guild/char/${m.id}`)` → `navigate({ name: 'guildChar', id: m.id })`
- `navigate('/town')` → `navigate({ name: 'town' })`

### src/pages/guild-char/index.tsx
- `useParams` を撤去。`export const Page = ()` を
  `export const Page = ({ id }: { id: string })` に変更し、`id` を props で受ける。
- ガード `<Navigate to="/title" replace />`（!save）→ `<Redirect to={{ name: 'title' }} />`
- ガード `<Navigate to="/guild" replace />`（!char || !id）→ `<Redirect to={{ name: 'guild' }} />`
  - `id` は必ず存在する props になったので、条件は `if (!char)` に簡略化してよい。
- `navigate('/guild')` → `navigate({ name: 'guild' })`

### src/pages/shop/index.tsx
- ガード `<Navigate to="/title" replace />` → `<Redirect to={{ name: 'title' }} />`
- `navigate('/town')` → `navigate({ name: 'town' })`

### src/pages/forge/index.tsx
- ガード `<Navigate to="/title" replace />` → `<Redirect to={{ name: 'title' }} />`
- `navigate('/town')` → `navigate({ name: 'town' })`

### src/pages/codex/index.tsx
- ガード `<Navigate to="/title" replace />` → `<Redirect to={{ name: 'title' }} />`
- `navigate('/town')` → `navigate({ name: 'town' })`

### src/pages/dungeon/index.tsx
- ガード `<Navigate to="/title" replace />` → `<Redirect to={{ name: 'title' }} />`
- ガード `<Navigate to="/town" replace />`（!dive||!floor）→ `<Redirect to={{ name: 'town' }} />`
- `navigate('/battle')` → `navigate({ name: 'battle' })`（2 箇所）
- `navigate('/town')` → `navigate({ name: 'town' })`（複数箇所）

### src/pages/battle/index.tsx
- ガード `<Navigate to="/town" replace />`（!save||!diveState）→ `<Redirect to={{ name: 'town' }} />`
- `navigate('/town')` → `navigate({ name: 'town' })`
- `navigate('/dungeon')` → `navigate({ name: 'dungeon' })`

### src/audio/bgm/BgmProvider.tsx
- `import { useLocation } from 'react-router'` を削除し、
  `import { useNavigation } from '@/store/navigation'` を追加。
- `const location = useLocation();` → `const { screen } = useNavigation();`
- `pathnameToTrackId(pathname)` を `screenToTrackId(name: ScreenName)` に置換:

```ts
function screenToTrackId(name: ScreenName): TrackId | null {
  if (name === 'title') return 'title';
  if (name === 'town' || name === 'shop' || name === 'forge' ||
      name === 'guild' || name === 'guildChar' || name === 'codex') return 'town';
  if (name === 'dungeon') return 'explore';
  return null; // battle は battleVariant 側で決まる
}
```

- トラック決定の effect:

```ts
useEffect(() => {
  const trackId: TrackId | null =
    screen.name === 'battle' ? battleVariant : screenToTrackId(screen.name);
  if (playerRef.current) {
    const track = trackId ? TRACK_MAP[trackId] : null;
    playerRef.current.setTrack(track);
    setCurrentTrackId(trackId);
  } else {
    pendingTrackIdRef.current = trackId;
  }
}, [screen.name, battleVariant]);
```

- 冒頭コメントの「react-router の useLocation で pathname を監視」を
  「NavigationProvider の screen を監視」に更新。

## テストの修正

### src/pages/title/index.test.tsx
`MemoryRouter`/`Routes` を撤去し、`NavigationProvider` でラップ。`/town` 遷移の確認は、
現在 screen が `town` のとき「拠点画面」を描画する小さな consumer で代替する。

```tsx
import { NavigationProvider, useNavigation } from '@/store/navigation';

function Harness() {
  const { screen } = useNavigation();
  if (screen.name === 'town') return <div>拠点画面</div>;
  return <TitlePage />;
}

function renderApp() {
  return render(
    <GameStateProvider>
      <NavigationProvider>
        <Harness />
      </NavigationProvider>
    </GameStateProvider>
  );
}
```

テスト本体（クリック手順・アサーション）はそのまま流用する。

### src/audio/bgm/BgmProvider.test.tsx
- `import { MemoryRouter } from 'react-router'` を削除し、
  `import { NavigationProvider } from '@/store/navigation'` を追加。
- `wrapper` 内の `<MemoryRouter>` を `<NavigationProvider>` に置換。
- 「AudioContext resume」系の 2 テストで `render(<MemoryRouter initialEntries={['/title']}>...`
  となっている箇所を `render(<NavigationProvider>...` に置換（`initialEntries` は不要）。

## NotFoundPage の扱い

`src/pages/not-found/index.tsx` は残し、App.tsx の `switch` の `default` で流用する。
ファイル削除はしない。

## 検証ゲート（実装後に必ず緑にする）

1. `yarn test`（vitest）
2. `yarn lint`（eslint）
3. `tsc -b`（型チェック）

`react-router` 由来の import が残っていないことを `grep -rn "react-router" src/` で確認する
（0 件になること。`docs/` 内のビルド成果物は対象外）。

## ビルド

`src/` を変更するため、コミット前に `yarn build` を実行し、更新後の `docs/` と
`package.json`（バージョン）をコミットに含める。
</content>
</invoke>
