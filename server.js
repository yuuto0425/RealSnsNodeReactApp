const  express = require('express');
//expressフレームワークを読み込み
const app = express();
//読み込んだものをインスタンス化のような形で実行？する

const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postsRoute = require("./routes/posts");

const PORT = 3000;
//serverのポート番号を決める
const mongoose = require("mongoose");
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
app.use(express.json());
app.use("/api/users",userRoute);
app.use("/api/auth",authRoute);
app.use("/api/posts",postsRoute);

app.get("/",(req,res) => {
    res.send("hello express")
});

app.listen(PORT,() => console.log('サーバーが起動しました。'));
