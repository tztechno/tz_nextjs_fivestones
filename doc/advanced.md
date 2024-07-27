もちろんです。拡張性の例として、ゲームボードのサイズを動的に変更できるようにしてみましょう。この拡張により、3x3だけでなく、4x4や5x5のTic-Tac-Toeも遊べるようになります。

主に `Board.tsx` と `index.tsx` を修正します。

1. `components/Board.tsx` の修正:

```typescript
import Square from './Square';
import styles from '../styles/Home.module.css';

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

2. `pages/index.tsx` の修正:

```typescript
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

  // ... 他のコードは同じ ...

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

これらの変更により、以下の拡張が実現されます：

1. ボードサイズを動的に変更可能：3x3、4x4、5x5のボードを選択できます。
2. 勝利条件の動的調整：ボードサイズに応じて勝利条件が自動的に調整されます。
3. UIの柔軟性：ボードサイズに関係なく、適切にマス目が表示されます。

この拡張例は、コンポーネントの再利用性と柔軟性を示しています。`Board` コンポーネントは、サイズに関係なくボードを描画できるようになり、`index.tsx` ではゲームのロジックをボードサイズに対応させています。

このような拡張性を持たせることで、将来的な機能追加（例：難易度設定、異なるゲームモードなど）も容易になります。
