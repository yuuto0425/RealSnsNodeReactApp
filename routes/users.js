const router = require("express").Router();
const User = require("../models/User");

//CRUD
//ユーザ情報の更新
router.put("/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    try {
      const user = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
        //全てのパラメーターという意味
      });
      res.status(200).json("ユーザー情報が更新されました。");
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res
      .status(403)
      .json("あなたは自分のアカウントの時だけ情報を更新できます。");
  }
});

//ユーザ情報の削除
router.delete("/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      res.status(200).json("ユーザー情報が削除されました。");
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res
      .status(403)
      .json("あなたは自分のアカウントの時だけ情報を削除できます。");
  }
});

//ユーザ情報の取得
//第三者でも見れる場面に他からも見える必要がある
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const {password, updatedAt , ...other } = user._doc;
    //分割代入 取り除きたいもの
    res.status(200).json(other);
  } catch (err) {
    return res.status(500).json(err);
  }
});

//ユーザーのフォロー
//フォロー時にフォローを外したりフォローしたりと更新が必要ためputメソッドを使う
router.put("/:id/follow" , async (req,res) => {
    if(req.body.userId !== req.params.id) {
        try{
            const user = await  User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);
            //フォロワーに自分がいなかったらフォローできる
            if(!user.followers.includes(req.body.userId)) {
                await user.updateOne({
                    $push: {
                        followers:req.body.userId,
                    }
                });
                await currentUser.updateOne({
                    $push:{
                        followings: req.params.id,
                    }
                });
                return res.status(200).json("フォローに成功しました。");
            }else {
                return res.status(403).json("あなたはすでにこのユーザーをフォローしています。");
            }
        }catch(err) {
            return res.status(500).json(err);
        }
    }else {
        return res.status(500).json("自分自身をフォローできません");
    }
});


//ユーザーのフォローを外す
router.put("/:id/unfollow" , async (req,res) => {
    if(req.body.userId !== req.params.id) {
        try{
            const user = await  User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);
            //フォロワーに存在したらフォローを外せる
            if(user.followers.includes(req.body.userId)) {
                await user.updateOne({
                    $pull: {
                        followers:req.body.userId,
                    }
                });
                await currentUser.updateOne({
                    $pull:{
                        followings: req.params.id,
                    }
                });
                return res.status(200).json("フォロー解除しました");
            }else {
                return res.status(403).json("このユーザーはフォロー解除できません");
            }
        }catch(err) {
            return res.status(500).json(err);
        }
    }else {
        return res.status(500).json("自分自身をフォロー解除できません");
    }
});

// router.get("/",(req,res) => {
//     res.send("user router");
// });

//server.jsでルーティングの設定を使いため,エクスポートしとく
module.exports = router;
