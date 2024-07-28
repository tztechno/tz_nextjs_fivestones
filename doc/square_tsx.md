関数呼び出し関係を図示します。

```plaintext
Square
│
├── ボタン要素
│   ├── `value`を表示
│   └── onClickハンドラー
└── styles.squareを使用
```

### 説明:
- **Square**: ボタンをレンダリングします。
- **ボタン要素**: `value`（'X', 'O', またはnull）を表示します。
- **onClick**: 提供された関数でボタンクリックを処理します。
- **styles**: CSSクラス`styles.square`を適用します。

質問があればどうぞ！