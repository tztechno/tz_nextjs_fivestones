もちろん、関数呼び出し関係を図示します。

### 関数呼び出し関係

```plaintext
Home
│
├── useState
│   ├── boardSize
│   ├── history
│   ├── stepNumber
│   └── xIsNext
│
├── calculateWinner
│   └── Checks lines for a winner
│
├── handleClick
│   ├── calculateWinner
│   ├── Updates history, stepNumber, xIsNext
│   └── Returns if square filled or winner
│
├── jumpTo
│   ├── Updates stepNumber
│   └── Updates xIsNext
│
├── handleSizeChange
│   ├── Updates boardSize
│   ├── Resets history
│   ├── Resets stepNumber
│   └── Resets xIsNext
│
└── Render
    ├── Board
    │   ├── renderRow
    │   │   └── renderSquare
    │   └── onClick (handleClick)
    └── Displays status and moves
```

### 説明

- **Home**: メインのコンポーネント。
  - **useState**: 状態管理。
  - **calculateWinner**: 勝者の判定。
  - **handleClick**: マスがクリックされたときの処理。
  - **jumpTo**: 特定の手に戻る処理。
  - **handleSizeChange**: ボードサイズの変更。
  - **Render**: ボードと情報を表示。

何か質問があれば教えてください！