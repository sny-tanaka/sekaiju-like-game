# セーブの引き継ぎ機能（save-transfer）

## なぜ作るのか

iOS の PWA はホーム画面から削除するとサンドボックスの IndexedDB / localStorage まで一緒に消える
（iOS 16.4 以降、PWA は Safari と分離されたストレージを持つため）。アイコン差し替えなどの理由で
ユーザーに「ホーム画面から消して再追加」を案内したい場面でも、その経路だと **セーブが必ず消える**
という問題がある。

そこで「セーブを文字列にして手元にバックアップ → 復元する」経路を提供する。

形式・配置場所はユーザー意思決定済み:

- **配置場所**: タイトル画面のみ（⚙ 設定モーダル内）
- **形式**: 文字列コピー / 貼り付け方式（Base64 系）

## ファイル構成

### 新規

| ファイル | 役割 |
|---|---|
| `src/store/saveTransfer.ts` | 純関数。`SaveData ⇔ string` の encode/decode + チェックサム検証 |
| `src/store/saveTransfer.test.ts` | round-trip / 破損検出 / migration / 空文字 などの単体テスト |
| `src/components/common/SaveTransfer/SaveTransfer.tsx` | UI コンポーネント |
| `src/components/common/SaveTransfer/SaveTransfer.test.tsx` | UI 単体テスト |
| `src/components/common/SaveTransfer/style.module.scss` | UI スタイル |
| `src/components/common/SaveTransfer/index.ts` | re-export |
| `src/components/common/SaveTransfer/SaveTransfer.stories.tsx` | Storybook（プレビュー用、省略可。書ける範囲で） |

### 修正

| ファイル | 修正内容 |
|---|---|
| `src/pages/title/index.tsx` | ⚙ モーダル内、`<SoundSettings />` の下に `<SaveTransfer />` を追加 |

### 触ってはいけないファイル

- `src/store/saveStore.ts`（変えない。`saveTransfer.ts` から呼ぶだけ）
- `src/store/saveSerialization.ts`（`deserializeSave` を呼ぶだけ。本体に変更を入れない）
- `src/store/gameState.tsx`（`applyAndPersist` を呼ぶだけ）
- battle / dungeon / town / forge / guild / shop / codex 等の他画面
- `src/audio/`, `src/domain/`, `src/data/`

## 文字列フォーマット

```
SLG1.<base64-utf8-json>.<checksum-hex>
```

- `SLG1`: マジックプレフィックス（`SLG` = sekaiju-like-game, `1` = 文字列フォーマットのバージョン）
  これがあると `decode` 側で「これはセーブの文字列だ」と判別でき、誤入力を弾ける。
- `<base64-utf8-json>`: `JSON.stringify(SaveData)` を UTF-8 でバイト列にしてから base64 化したもの。
- `<checksum-hex>`: base64 部分から計算した FNV-1a 32bit のハッシュを 8 文字の小文字 hex で表記。
  改行や末尾の余分なスペースが混じったら検出するためのもの。暗号強度は不要。

### encode 手順

```text
1. const json = JSON.stringify(save);
2. const bytes = new TextEncoder().encode(json);   // Uint8Array
3. const base64 = bytesToBase64(bytes);            // 自前で chunk 化（後述）
4. const hash = fnv1a32(base64);                   // 8 文字 hex
5. return `SLG1.${base64}.${hash}`;
```

### decode 手順

```text
1. 入力文字列を trim する（先頭末尾の空白・改行を許容）。
2. プレフィックス `SLG1.` で始まらなければ ok:false('セーブの文字列ではありません')
3. 残りを最後の `.` で 2 分割（base64 と checksum）。区切りが見つからなければ ok:false。
4. 受け取った checksum と、base64 部分から再計算した fnv1a32(base64) を比較。
   一致しなければ ok:false('文字列が壊れています')
5. base64 → Uint8Array → TextDecoder で UTF-8 デコード → JSON.parse。
   どこかで throw したら ok:false('セーブの文字列を解析できません')
6. deserializeSave(parsed) に渡す（既存純関数。schema migration もここで走る）。
   ok:false ならそのまま return（reason は deserialize のものをそのまま使う）。
7. ok:true なら { ok: true, data } を返す。
```

### base64 周りの実装メモ

`btoa(String.fromCharCode(...bytes))` は SaveData が数十 KB あると `...` の展開で stack に乗らない
ことがある。安全のため次のように **chunk 化** する:

```ts
function bytesToBase64(bytes: Uint8Array): string {
  const CHUNK = 0x8000; // 32KB
  let binary = '';
  for (let i = 0; i < bytes.length; i += CHUNK) {
    const slice = bytes.subarray(i, i + CHUNK);
    binary += String.fromCharCode(...slice);
  }
  return btoa(binary);
}

function base64ToBytes(b64: string): Uint8Array {
  const binary = atob(b64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < bytes.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
}
```

### FNV-1a 32bit

```ts
function fnv1a32(s: string): string {
  let h = 0x811c9dc5;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  // 8 文字 hex 固定
  return (h >>> 0).toString(16).padStart(8, '0');
}
```

## API（saveTransfer.ts）

```ts
import type { SaveData } from '@/domain/types';

/** SaveData を引き継ぎ用の文字列にする。 */
export function encodeSaveTransfer(save: SaveData): string;

export type DecodeResult =
  | { ok: true; data: SaveData }
  | { ok: false; reason: string };

/** 引き継ぎ用の文字列を SaveData に戻す。migration もここで走る。 */
export function decodeSaveTransfer(input: string): DecodeResult;
```

## UI 仕様（SaveTransfer.tsx）

タイトル画面の ⚙ モーダル内、`<SoundSettings />` の下にセクションとして並ぶ。
モーダルの幅を超えてはみ出さないこと（既存スタイルに収める）。

### Props

なし（ストアから取る）。`useGameState` で `save` / `applyAndPersist` / `continueGame` を、
`useNavigation` で `navigate` を取る。

### 内部 state

- `mode`: `'idle' | 'export' | 'import'`
- `exportStr`: エクスポート時の文字列（コピー失敗時のフォールバック表示用）
- `importInput`: インポート時の textarea 値
- `error`: インポート失敗時のメッセージ
- `busy`: 非同期処理中の二重操作防止
- `toast`: 'コピーしました' / '読み込みました' などの一時メッセージ（2 秒で消す）
- `confirmOverwrite`: 既存セーブを上書きするかの確認モーダル表示フラグ

### セクションヘッダ

```
セーブの引き継ぎ
```

説明文（小さく）:

```
端末を変えたり、PWA を入れ直すときに使います。
セーブを文字列にしてメモ・メールなどに貼っておけば、新しい端末で復元できます。
```

### エクスポート側

- ボタン: 「セーブをコピー」
  - `meta`/`save` が無ければ disabled。
  - クリック時:
    - encode → `navigator.clipboard.writeText(str)` を試みる
    - 成功: `toast = 'コピーしました'`、`exportStr` はクリアでも保持でも良いが、
      フォールバック表示用に保持しておく
    - 失敗（clipboard が無い / 拒否された）: `mode='export'` にして `<textarea readonly>`
      に文字列を表示し、「長押しコピーしてください」と案内する
- フォールバック表示中の `<textarea>` は `onFocus={(e)=>e.currentTarget.select()}` で全選択する。

### インポート側

- ボタン: 「セーブを読み込む」
  - クリック時: `mode='import'` にして `<textarea>` を出す
- `<textarea>` + 「貼り付け」「読み込む」「キャンセル」ボタン
  - 「貼り付け」: `navigator.clipboard.readText()` で textarea に詰める。
    失敗時は何もせず、手動貼り付けを促す（特にエラー表示はしなくて良い）。
  - 「読み込む」:
    1. `decodeSaveTransfer(importInput)` を呼ぶ
    2. `ok:false` なら `error = reason` をセットして終了
    3. `ok:true` で **既存 save が存在する** なら `confirmOverwrite = true` を立ててモーダルを出す
    4. 確認 OK で `applyAndPersist(() => decoded.data)` を await
       - その後 `toast = '読み込みました'` を出して、続けて `navigate({ name: 'town' })`
       - navigate しなくても良いが、復元直後にタイトルに戻したい意図はないので街へ進めるのが自然
- 確認モーダルの文言例:

```
読み込むと、現在のセーブデータ『<guild.name>』は上書きされて元に戻せません。
よろしいですか？
[ 読み込む（赤系） ] [ キャンセル ]
```

### スタイル方針

- 既存の `SoundSettings` と並びになるので、見出しサイズ / 余白を同程度に揃える
- ボタンは既存の `ActionButton` を使う（`label="セーブをコピー"` 等）。赤系ボタンは
  既存の `styles.danger` / 危険系クラスがあればそれを流用する（無ければ Sound 設定で
  使われている modal の trigger 系と統一）
- `<textarea>` は 6 行ぐらい、`font-family: monospace`、横スクロールは disable、
  改行は表示しないで折り返す（base64 はスペース無しの長文）

## 単体テスト

### saveTransfer.test.ts（必須）

- round-trip: `mockMidDive` 相当の SaveData を encode → decode で **構造完全一致**
- 旧 schema (v1) の SaveData オブジェクトを直接 encode して decode すると、
  migration が走って `schemaVersion === CURRENT_SCHEMA_VERSION` になる
- 入力文字列の前後に空白 / 改行が混じっていても decode できる（trim 効いている）
- 入力にプレフィックス `SLG1.` が無いと ok:false
- 入力に区切り `.` が 1 つしかないと ok:false
- checksum を 1 文字書き換えると ok:false
- base64 を改ざんすると（JSON parse 失敗 or checksum 不一致いずれか）ok:false
- 空文字列 / 空白だけ → ok:false

### SaveTransfer.test.tsx（必須）

`@testing-library/react` で:

- save が無い状態だと「セーブをコピー」が `disabled`
- save がある状態でクリックすると `navigator.clipboard.writeText` が呼ばれ、
  そこに渡された文字列を decode するとセーブが復元できる
- clipboard がない環境（mock で undefined）でクリックするとフォールバックの textarea が
  表示され、その中に有効な引き継ぎ文字列が入っている
- インポート: 不正な文字列を入れて「読み込む」 → エラーメッセージが出て applyAndPersist は呼ばれない
- インポート: 正しい文字列で、既存セーブがあるときに「読み込む」 → 確認モーダルが出る
- インポート: 確認モーダルで OK すると `applyAndPersist` が呼ばれて navigate される

`navigator.clipboard` / `useGameState` / `useNavigation` は vitest の `vi.mock` 等で
差し替える。既存テスト（`title/index.test.tsx` など）でやっている mock パターンを踏襲。

## 検証ゲート（コミット前に全部緑）

```
yarn lint
yarn test
yarn tsc -b     # ← 必須。vitest と eslint は型エラーを検出しない
```

`yarn build` は不要（成果物 `docs/` の更新は PR レビュー時にディレクターが行う）。

## コミットの粒度

実装と単体テストを同一コミットにまとめる。Conventional Commits 風 / 日本語 OK:

```
feat(title): セーブの引き継ぎ機能を追加（PWA 再追加時のデータ救済用）
```

複数コミットに分けたい場合は次のような粒度:

1. `feat(store): saveTransfer.ts と単体テストを追加`
2. `feat(title): SaveTransfer コンポーネントを追加し ⚙ モーダルに組み込む`

push はしない（ディレクターがレビュー後に行う）。
