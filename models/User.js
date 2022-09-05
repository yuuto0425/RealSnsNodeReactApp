const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    username: {
        type:String,
        //文字型
        required:true,
        //必ず必要
        min:3,
        //最小値
        max:25,
        //最大値
        unique:true,
        //重複することができない
    },
    email: {
        type:String,
        required:true,
        min:6,
        max:50,
    },
    profilePicture : {
        type:String,
        default:"",

    },
    coverPicture:{
        type:String,
        default:"",
    },
    followers: {
        type:String,
        default:[],
    },
    followings: {
        type:String,
        default:[],
    },
    isAdmin:{
        type:Boolean,
        default:false,
    },
    desc:{
        type:String,
        max:70,
    },
    city:{
        type:String,
        max:50,
    },
},
{timestamps:true}
//データを格納した日付と時間を自動的に格納
)

module.exports = mongoose.model("User",UserSchema)