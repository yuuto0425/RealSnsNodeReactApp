const mongoose = require("mongoose");

//mongoDBのメリット
//その構造ごとにデータ構造を変更できるmongoDB NoSQLのメリット
const PostSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      max: 200,
    },
    img: {
      type: String,
    },
    likes: {
      //誰がいいねを押したのかを確認するためのスキーマ
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post",PostSchema);
