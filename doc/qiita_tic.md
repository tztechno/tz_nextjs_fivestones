## Tic-Tac-Toeゲームをnextjsで作ってみたら成功した

---

## はじめに
このアプリは3つの`.tsx`ファイルで構成されています。それぞれの特徴は以下の通りです。

### 1. `Home.tsx`
- **役割**: アプリのメインコンポーネント。ゲームの状態管理や全体のレイアウトを担当します。
- **特徴**:
  - ボードサイズの選択が可能。
  - ゲームの履歴を表示し、過去の手に戻る機能を提供。
  - 勝敗や引き分けの判定を行う。

### 2. `Board.tsx`
- **役割**: ボード全体を管理し、各セル（`Square`）をレンダリングします。
- **特徴**:
  - 現在のゲームステートに基づいてボードを動的に描画。
  - 各セルのクリックイベントを処理し、`Home` コンポーネントにコールバックを渡します。

### 3. `Square.tsx`
- **役割**: 個々のセルを表現するコンポーネント。
- **特徴**:
  - ボタンとしてセルを表示し、クリック可能にします。
  - セルに「X」または「O」を表示。

### 全体の特徴
- **再利用性**: 各コンポーネントが独立しており、再利用しやすい設計。
- **型安全性**: TypeScriptによる厳密な型チェックにより、バグを減らし、保守性を向上。
- **動的なボードサイズ**: ボードサイズを3x3、4x4、5x5から選択可能で、柔軟なゲームプレイを提供。

## tree
```
vercel_tick/
├── pages/
│   └── index.tsx           # メインのゲームコンポーネント
├── components/
│   ├── Board.tsx           # ゲームボードコンポーネント
│   └── Square.tsx          # ボードのマス目コンポーネント
├── styles/
│   └── Home.module.css     # スタイリング
├── tsconfig.json           # TypeScriptの設定
```
---

## Board.tsx 
このコードは、Tic-Tac-Toeゲームを作成し、ボードサイズの変更やゲームの履歴管理を可能にしています。

- **ステート管理**:
  - `boardSize`: 現在のボードサイズ（3x3、4x4、5x5）を管理します。
  - `history`: ゲームの履歴を保持し、各ステップのボードの状態を記録します。
  - `stepNumber`: 現在のステップ番号を管理します。
  - `xIsNext`: 次のプレイヤーが「X」か「O」かを管理します。

- **関数**:
  - `calculateWinner(squares)`: 現在のボード状態から勝者を判定します。
  - `handleClick(i)`: ボードの特定の位置がクリックされたときの処理を行います。
  - `jumpTo(step)`: 履歴の特定のステップにジャンプします。
  - `handleSizeChange(newSize)`: ボードサイズを変更し、ゲームをリセットします。

- **レンダリング**:
  - `Board`コンポーネントを使ってボードを表示します。
  - 勝者のステータスや次のプレイヤーを表示します。
  - 過去のムーブ履歴を表示し、任意のムーブに戻れるようにします。

- **UI**:
  - ボードサイズを選択するためのドロップダウンメニュー。
  - 現在のゲーム状態（勝者、引き分け、次のプレイヤー）を表示。

```

type SquareValue = 'X' | 'O' | null;

interface BoardProps {
    squares: SquareValue[];
    onClick: (i: number) => void;
    size: number;  // 追加: ボードのサイズ
}

export default function Board({ squares, onClick, size }: BoardProps) {
    const renderSquare = (i: number) => {
        return <Square key={i} value={squares[i]} onClick={() => onClick(i)} />;
    };

    const renderRow = (row: number) => {
        return (
            <div key={row} className={styles.boardRow}>
                {Array(size).fill(null).map((_, col) => renderSquare(row * size + col))}
            </div>
        );
    };

    return (
        <div>
            {Array(size).fill(null).map((_, i) => renderRow(i))}
        </div>
    );
}

```


---

## Square.tsx
このコードは、Tic-Tac-Toeの「Square」コンポーネントを定義しています。

### コードの概要

- **`SquareProps` インターフェース**:
  - `value`: ボタンに表示される値（'X'、'O'、または `null`）。
  - `onClick`: ボタンがクリックされたときに呼ばれる関数。

- **`Square` コンポーネント**:
  - `value` と `onClick` を `props` として受け取り、`<button>` 要素をレンダリングします。
  - ボタンには、`styles.square` というクラスが適用され、スタイルが適用されます。
  - ボタンがクリックされると、`onClick` 関数が呼ばれます。
  - ボタンの内部に `value` が表示されます。

```

import styles from '../styles/Home.module.css';

interface SquareProps {
    value: 'X' | 'O' | null;
    onClick: () => void;
}

export default function Square({ value, onClick }: SquareProps) {
    return (
        <button className= { styles.square } onClick = { onClick } >
            { value }
            </button>
  );
}

```


---

## index.tsx 

このコードは、ボードサイズの変更やゲームの履歴の操作を可能にし、ゲームのユーザーインターフェースを構築しています。

### 主な機能と要素

1. **ステート管理**:
   - `boardSize`: ボードのサイズ（3x3、4x4、5x5）を管理します。
   - `history`: ゲームの履歴を管理し、各ステップでのボード状態を保存します。
   - `stepNumber`: 現在のゲームステップ番号を管理します。
   - `xIsNext`: 次のプレイヤーが「X」か「O」かを管理します。

2. **関数**:
   - `calculateWinner(squares)`: 現在のボード状態から勝者を判定します。勝者がいない場合は `null` を返します。
   - `handleClick(i)`: ボードの特定のセルがクリックされたときに呼ばれます。セルがすでに埋まっている場合やゲームが終了している場合は何もしません。クリックされたセルに「X」または「O」を設定し、履歴とステップ番号を更新します。
   - `jumpTo(step)`: 特定のステップにジャンプし、そのステップのボード状態を表示します。
   - `handleSizeChange(newSize)`: ボードのサイズを変更し、ゲームをリセットします。

3. **レンダリング**:
   - `Board` コンポーネントを使ってボードを表示します。`Board` は `squares` と `onClick` をプロップスとして受け取ります。
   - ゲームの状態（勝者、引き分け、次のプレイヤー）を表示します。
   - ゲームの履歴をリストとして表示し、過去のステップに戻れるボタンを提供します。

4. **UI**:
   - ボードサイズを変更するためのドロップダウンメニュー。
   - 現在のゲーム状態や履歴のムーブリストを表示するセクション。

```

import { useState } from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Board from '../components/Board';

type SquareValue = 'X' | 'O' | null;

export default function Home() {
    const [boardSize, setBoardSize] = useState<number>(3);
    const [history, setHistory] = useState<SquareValue[][]>([Array(boardSize * boardSize).fill(null)]);
    const [stepNumber, setStepNumber] = useState<number>(0);
    const [xIsNext, setXIsNext] = useState<boolean>(true);

    const calculateWinner = (squares: SquareValue[]): SquareValue => {
        const lines = [];
        // 横のライン
        for (let i = 0; i < boardSize; i++) {
            lines.push(Array(boardSize).fill(0).map((_, j) => i * boardSize + j));
        }
        // 縦のライン
        for (let i = 0; i < boardSize; i++) {
            lines.push(Array(boardSize).fill(0).map((_, j) => j * boardSize + i));
        }
        // 対角線
        lines.push(Array(boardSize).fill(0).map((_, i) => i * boardSize + i));
        lines.push(Array(boardSize).fill(0).map((_, i) => i * boardSize + (boardSize - 1 - i)));

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            if (line.every(index => squares[index] && squares[index] === squares[line[0]])) {
                return squares[line[0]];
            }
        }
        return null;
    };

    const handleClick = (i: number): void => {
        const currentHistory = history.slice(0, stepNumber + 1);
        const current = currentHistory[currentHistory.length - 1];
        const squares = [...current];
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = xIsNext ? 'X' : 'O';
        setHistory([...currentHistory, squares]);
        setStepNumber(currentHistory.length);
        setXIsNext(!xIsNext);
    };

    const jumpTo = (step: number): void => {
        setStepNumber(step);
        setXIsNext(step % 2 === 0);
    };

    const current = history[stepNumber];
    const winner = calculateWinner(current);

    const moves = history.map((step, move) => {
        const desc = move ?
            'Go to move #' + move :
            'Go to game start';
        return (
            <li key={move}>
                <button onClick={() => jumpTo(move)}>{desc}</button>
            </li>
        );
    });

    let status: string;
    if (winner) {
        status = 'Winner: ' + winner;
    } else if (current.every(square => square !== null)) {
        status = 'Draw';
    } else {
        status = 'Next player: ' + (xIsNext ? 'X' : 'O');
    }

    const handleSizeChange = (newSize: number) => {
        setBoardSize(newSize);
        setHistory([Array(newSize * newSize).fill(null)]);
        setStepNumber(0);
        setXIsNext(true);
    };

    return (
        <div className={styles.container}>
            <Head>
                <title>Tic-Tac-Toe</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <h1 className={styles.title}>Tic-Tac-Toe</h1>
                <div>
                    <label>
                        Board Size:
                        <select value={boardSize} onChange={(e) => handleSizeChange(Number(e.target.value))}>
                            <option value="3">3x3</option>
                            <option value="4">4x4</option>
                            <option value="5">5x5</option>
                        </select>
                    </label>
                </div>
                <div className={styles.game}>
                    <div className={styles.gameBoard}>
                        <Board
                            squares={current}
                            onClick={(i: number) => handleClick(i)}
                            size={boardSize}
                        />
                    </div>
                    <div className={styles.gameInfo}>
                        <div>{status}</div>
                        <ol>{moves}</ol>
                    </div>
                </div>
            </main>
        </div>
    );
}

```


---
