const router = require("express").Router();
const User = require("../models/User");

//ユーザー登録

router.post("/register", async (req,res) => {
    try{
        //新規登録を記述
        const  newUser = await new User({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
        });

        const user = await newUser.save();
        return res.status(200).json(user);
        //成功のステータスコードを返す
    }catch(err) {
        return res.status(500).json(err);
        //ステータスコード500は、サーバー関連のエラー
    }
})

// router.get("/",(req,res) => {
//     res.send("auth router");
// });

//server.jsでルーティングの設定を使いため,エクスポートしとく
module.exports = router;