import React, { useEffect, useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import TimeLine from "../../components/timeline/TimeLine";
import Rightbar from "../../components/rightbar/Rightbar";
import "./Profile.css";
import axios from "axios";
import { useParams } from "react-router-dom";
//App.jsのルーティング設定のところのpathの:usernameのパラメーターを取ってくるHooks

export default function Profile() {
  const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;
  //RECT_APPの部分をしっかり書かないと正常にパスが通らない。
  //envファイルを編集した際には、ローカルサーバーを落とさないと正常に動かない

  const [user, setUser] = useState({});
  const username = useParams().username;

  //useEffectの注意点、無名関数のところにasyncは付けられない
  useEffect(() => {
    const fetchUser = async () => {
      //package.jsonのproxy設定で、/apiを設定しているため、省略可能
      const response = await axios.get(`/users?username=${username}`);
      console.log(response);
      setUser(response.data);
    };
    fetchUser();
  }, []);

  return (
    <>
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                src={user.coverPicture || PUBLIC_FOLDER + "/post/3.jpeg"}
                alt=""
                className="profileCoverImg"
              />
              <img
                src={
                  PUBLIC_FOLDER + user.profilePicture ||
                  PUBLIC_FOLDER + "/person/noAvatar.png"
                }
                alt=""
                className="profileUserImg"
              />
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{user.username}</h4>
              <span className="profileInfoDesc">{user.desc}</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <TimeLine username={username} />
            <Rightbar user={user} />
          </div>
        </div>
      </div>
    </>
  );
}
