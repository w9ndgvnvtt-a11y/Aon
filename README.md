# AON Photography — ポートフォリオサイト

写真家のためのシンプルな静的ポートフォリオサイトです。ビルド不要で、HTML / CSS / JavaScript だけで動きます。

## 構成

```
index.html        ページ本体（ヒーロー / Works / About / Services / Contact）
css/style.css     デザイン（ライト・ダークモード対応）
js/works.js       作品データ（★写真の差し替えはここだけ）
js/main.js        ギャラリー・絞り込み・ライトボックス・スライドショー・フォーム
images/works/     作品画像（現在はサンプルの SVG）
```

## 写真の差し替え方

1. `images/works/` に写真（JPG 推奨、長辺 2000px 前後・1枚 500KB 程度まで）を置く
2. `js/works.js` の各項目の `src` / `title` / `category` / `year` を書き換える
3. トップのスライドショーに出したい写真は `hero: true` にする

カテゴリは `category` に書いた名前から絞り込みボタンが自動で作られます。

## その他の編集ポイント

- **名前・キャッチコピー・プロフィール・料金**: `index.html` の該当箇所を編集
- **プロフィール写真**: `index.html` の About セクションの `<img src>` を変更
- **SNS リンク**: `index.html` の `.socials` のリンク先を変更
- **お問い合わせ先**: `js/main.js` の `CONTACT_EMAIL` を自分のアドレスに変更
  （現在はメールソフトを起動する方式。Formspree などのフォームサービスを使う場合は `<form>` に `action` を設定し、送信処理を外してください）
- **テーマカラー**: `css/style.css` 冒頭の `:root` の変数（`--accent` など）

## ローカルで確認

```bash
python3 -m http.server 8000
# → http://localhost:8000
```

## 公開（GitHub Pages）

リポジトリの Settings → Pages で、Source を公開したいブランチの `/ (root)` に設定すると公開されます。
