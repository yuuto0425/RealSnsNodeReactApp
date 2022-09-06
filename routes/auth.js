const router = require("express").Router();
const User = require("../models/User");

//ユーザー登録

router.post("/register", async (req,res) => {
    try{
        //新規登録を記述
        const  newUser = await new User({
            username: req.body.username,
             //リクエストの中に含まれるbodyを格納しているという意味
            email: req.body.email,
            password: req.body.password,
        });

        const user = await newUser.save();
         //公式ドキュメントのモデル構築参照、ドキュメントを保存
        return res.status(200).json(user);
        //成功のステータスコードを返す
    }catch(err) {
        return res.status(500).json(err);
        //ステータスコード500は、サーバー関連のエラー
    }
});


//ログイン
router.post("/login",async (req,res) => {
    try {
        const user = await User.findOne({email: req.body.email });
        if(!user) return res.status(404).send("ユーザーが見つかりません");

        const vailedPassword = req.body.password === user.password;

        if(!vailedPassword) return res.status(400).json("パスワードが違います");

        return res.status(200).json(user);
    }catch(err) {
        return res.status(500).json(err);
    }
});

// router.get("/",(req,res) => {
//     res.send("auth router");
// });

//server.jsでルーティングの設定を使いため,エクスポートしとく
module.exports = router;
