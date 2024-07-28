Boardコンポーネントの関数呼び出し関係をフローチャートで示します。

```
Board
│
├── renderRow (for each row)
│   └── renderSquare (for each square)
│       └── Square component
│           └── onClick handler
│
└── Returns full board
```

### 説明:
- **Board**: ボード全体を構築。
- **renderRow**: 各行を生成。
- **renderSquare**: 各マスを描画し、`Square`コンポーネントを呼び出し。
- **Square**: マスのクリックを処理。

この図は、`Board`がどのように行とマスを描画するかを示しています。何か質問があれば教えてください！