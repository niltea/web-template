# Web template

Web開発用基本テンプレートです。  
gulpやめました。

npm script + Webpackでいい感じになるように環境を整備してみようという感じ。


## 具体的には何してんの

* HTML: pug
* CSS: sass(webpack)
* JS: Babel(ES6) -> webpack

でcompileしたりしてもらう。
特にJSはモジュール別けてWebpackでまとめたりする想定。

watchしてファイル編集したらbrowser-syncでガンガン自動リロードしてくれる感じで。
