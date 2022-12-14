const  express = require('express');
//expressフレームワークを読み込み
const app = express();
//読み込んだものをインスタンス化のような形で実行？する

const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postsRoute = require("./routes/posts");
const uploadRoute = require("./routes/upload");

const PORT = 5000;
//serverのポート番号を決める
const mongoose = require("mongoose");
const path = require("path");
require('dotenv').config();

// app.get("/",(req,res) => {
//     //第一引数、ルートディレクトリの「/」,
//     //第二引数、コールバック関数、コールバック引数に、requestとresponseを設定
//     //「/」(エンドポイント)にアクセスすると、reqしたりresしたりするようになる。
//     //getメソッドの場合は、ブラウザのurlに打ち込むとres.send()が出力される
//     res.send('hello express');
//     //各ページへ(エンドポイント)のルーティング設定を意識する。
// });

//データベース接続
//非同期処理のためthenやcatchで成功か失敗か確かめることができる。
mongoose.connect(process.env.MONGOURL).then( () => {
})
.then(() => {
    console.log("データベース接続中");
})
.catch((err)=>{
    console.log(err);
});

//参考記事エラー原因
//https://qiita.com/NasuPanda/items/ac94c496d42aac4fcb6d
//https://qiita.com/YukiYamam/items/a29ede2a77ce9535886d

//ミドルウェア
app.use("/images",express.static(path.join(__dirname,"public/images")));
//"/images"のエンドポイントを見にいった際は、自動的に現在のディレクトリ+"public/images"を見にいく
app.use(express.json());
//json形式でデータを扱う
app.use("/api/users",userRoute);
app.use("/api/auth",authRoute);
app.use("/api/posts",postsRoute);
app.use("/api/upload",uploadRoute);

// app.get("/",(req,res) => {
//     res.send("hello express")
// });

app.listen(PORT,() => console.log('サーバーが起動しました。'));
