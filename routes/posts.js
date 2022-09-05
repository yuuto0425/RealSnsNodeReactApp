const router = require("express").Router();

router.get("/",(req,res) => {
    res.send("posts router");
});

//server.jsでルーティングの設定を使いため,エクスポートしとく
module.exports = router;