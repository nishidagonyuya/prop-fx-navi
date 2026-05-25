# プロップFXナビ

日本人FXトレーダー向け プロップファーム比較データベース。Astro v6 + GitHub Pages。

## 開発

```bash
npm install
npm run dev        # http://127.0.0.1:4321/prop-fx-navi/
npm run build      # dist/ に静的ファイル生成
npm run preview    # ビルド結果のプレビュー
```

## データ追加

`src/data/props.json` にプロップファーム情報を追記すると、`/prop/[slug]/` のページが自動生成される。

## デプロイ

`main` ブランチに push すると GitHub Actions が自動で GitHub Pages にデプロイする。
