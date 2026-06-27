# 下り階段を未探索でも常時表示 — 設計書

## 背景

ユーザ要望:
「下り階段の位置がわかるようにしたいです。マップが開いていなくても下り階段アイコンだけは表示して、目的地がわかるように。」

ダンジョン画面のマップは **常時表示**（mid 領域に DungeonMap が描画されている）。
ユーザ表現「マップが開いていなくても」は **「マップ上の霧で隠されていても」** と解釈する
(= 未探索マスの中にある下り階段でも、アイコンだけは見えるようにしてほしい)。

## 用語注意 (重要)

データ上の `kind` と UI 表示が**逆**になっている (`DungeonMap.tsx` L127-129 コメント参照、issue #86 で確定済):

| `c.event.kind` | 意味 | 表示するアイコン |
|---|---|---|
| `'stairsUp'` | **深さ +1 方向 = 地下に潜る** | **下りアイコン (`stairsDownImg`)** |
| `'stairsDown'` | 深さ -1 方向 = 拠点に戻る | 上りアイコン (`stairsUpImg`) |

ユーザの言う「下り階段」 = 地下に潜る方 = **`kind: 'stairsUp'`**。
拠点帰還用の `kind: 'stairsDown'` は **既存通り探索済みでのみ表示** (未踏でも見える必要なし)。

## 現状の問題

`src/components/common/DungeonMap/DungeonMap.tsx` L116-158 の壁線描画ループ:

```ts
for (let y = 0; y < floor.height; y++) {
  for (let x = 0; x < floor.width; x++) {
    if (!exploredSet.has(`${x},${y}`)) continue;  // ← 未探索は弾かれる
    // ...壁線
    if (ev?.kind === 'stairsUp' || ev?.kind === 'stairsDown') {
      // 階段アイコン描画 (このブロックは exploredSet ガードの内側)
    }
  }
}
```

このため未探索マスの下り階段は霧色 (`COLORS.fog`) のままで見えない。

## 修正方針

**壁線描画ループの後に「未探索の下り階段だけ描画する追加処理」を入れる**。

`findEventCell(floor, 'stairsUp')` で下り階段の座標を 1 つ取得 (フロア構造上 1 個のみ)。
未探索なら `stairsDownImg` を霧色の上に描画する。

### 実装

`src/components/common/DungeonMap/DungeonMap.tsx` の `useEffect` 内、プレイヤー手動アイコン描画 (L161) の **直前** に追加:

```ts
// 下り階段 (= 深層方向) は未探索でも常時表示 (目的地が分かるように)。
// 上り階段 (拠点帰還) は既存通り探索済みでのみ表示。
const stairsDownCoord = findEventCell(floor, 'stairsUp');
if (
  stairsDownCoord &&
  !exploredSet.has(`${stairsDownCoord.x},${stairsDownCoord.y}`) &&
  stairsIconDrawable(stairsDownImg)
) {
  const s = cell * 0.9;
  const ox = stairsDownCoord.x * cell + (cell - s) / 2;
  const oy = stairsDownCoord.y * cell + (cell - s) / 2;
  ctx.imageSmoothingEnabled = false;
  ctx.globalAlpha = 0.7;  // 未踏なので少し薄く描画 (踏破済みと区別)
  ctx.drawImage(stairsDownImg, ox, oy, s, s);
  ctx.globalAlpha = 1;
}
```

### 視覚デザインの選択肢

「踏破済み」と「未踏」の下り階段をどう区別するか:

- **案 (i)**: 同じ表示で描画 (区別なし) — シンプルだが踏破済みかどうか分からない
- **案 (ii) 推奨**: 未踏は `globalAlpha = 0.7` 程度で**少し薄く描画** — 「霧の中に薄く見える」表現
- **案 (iii)**: 未踏は破線枠で囲む — 実装が複雑

→ 案 (ii) で進める。霧色 (`#D4C7A8`) の上にやや透けたアイコンが乗る形で、未踏感を出す。

### import 追加

```ts
import { findEventCell } from '@/domain/generateFloor';
```

## 触ってよいファイル

- `src/components/common/DungeonMap/DungeonMap.tsx` (描画ロジック追加 + import 追加)
- `src/components/common/DungeonMap/DungeonMap.stories.ts` (もし「下り階段未踏」を見せる Story を追加するなら)

## 触ってはいけないファイル

- `src/domain/generateFloor.ts` (`findEventCell` のシグネチャは変えない)
- `src/domain/types.ts` / data 系
- `src/pages/dungeon/index.tsx` (props は変えない)
- 他の画面
- `package.json` / `docs/`

## 単体テストの扱い

DungeonMap は Canvas 描画のため、ピクセル比較テストは現実的でない。
代わりに、**既存の `findEventCell` の挙動が変わっていないこと** が前提なので、
DungeonMap 側にロジック純関数を切り出す必要は薄い。

**ただし** 「stairsUp 座標を取得 → exploredSet に含まれているかチェック」というロジックは、
将来 FirstPersonView 等でも使う可能性がある。`DungeonMap.tsx` のローカルヘルパとして
`shouldShowUnexploredStairs(floor, exploredSet)` を切り出し、test で:

```ts
test('未踏の下り階段は表示対象になる', () => {
  const floor = generateFloor(...);  // 既存 generator
  const stairs = findEventCell(floor, 'stairsUp')!;
  const exploredEmpty = new Set<string>();
  const coord = shouldShowUnexploredStairs(floor, exploredEmpty);
  expect(coord).toEqual(stairs);
});

test('踏破済みの下り階段は対象外 (= null)', () => {
  const floor = generateFloor(...);
  const stairs = findEventCell(floor, 'stairsUp')!;
  const explored = new Set([`${stairs.x},${stairs.y}`]);
  expect(shouldShowUnexploredStairs(floor, explored)).toBeNull();
});

test('そもそも下り階段がないフロアでは null', () => {
  // findEventCell が null を返すケース (理論上ありえないが防御的に)
});
```

をテストする。

ファイル: `src/components/common/DungeonMap/shouldShowUnexploredStairs.test.ts` を新規作成。
関数の実装は `DungeonMap.tsx` に export 付きで置く (= テスト可能にする) か、
`src/components/common/DungeonMap/helpers.ts` のような薄いユーティリティに切り出す。

## Storybook 確認

既存 `DungeonMap.stories.ts` には `explored` array を渡している Story があるはず。
- 「全部未探索」Story を追加して、下り階段アイコンだけ薄く表示されることを確認
- 既存「全部探索済み」Story では既存通り下り階段が普通に表示されることを確認

スクショまでは sonnet に求めず、UI 確認はディレクター側でブラウザ目視 (時間あれば)。

## 検証ゲート

```
yarn test
yarn lint
yarn tsc -b
```

すべて緑。`yarn build` はディレクターが回す。

## 完了報告

- 変更箇所 (ファイルパスと行数感)
- 追加した純関数のシグネチャ
- 新規テスト件数
- Storybook で確認したかどうか
- 検証ゲート 3 点緑
- コミット SHA (push はしない)

## サブエージェントへの注意

- 自分で Edit/Write/Bash を使って実装。さらにサブエージェント (Agent/Task) を spawn しないこと。
- コミットしたら push しない。ディレクターがレビュー後に push する。
- コミットメッセージは `feat(dungeon): always show down-stairs icon on map` 系。
