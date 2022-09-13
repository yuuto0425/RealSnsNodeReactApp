import React, { useContext, useEffect, useState } from "react";
import Post from "../post/Post";
import Share from "../share/Share";
import "./TimeLine.css";
// import { Posts } from "../../dummyData";
import axios from "axios";
import { AuthContext } from "../../state/AuthContext";

export default function TimeLine({ username }) {
  const [posts, setPosts] = useState([]);
  //useEffectの注意点、無名関数のところにasyncは付けられない
  const { user } = useContext(AuthContext);
  useEffect(() => {
    const fetchPosts = async () => {
      //package.jsonのproxy設定で、/apiを設定しているため、省略可能
      const response = username
        ? await axios.get(`/posts/profile/${username}`) //プロフィールの場合
        : await axios.get(`/posts/timeline/${user._id}`); //ホームの場合
      // console.log(response.data);
      setPosts(response.data.sort((post1,post2) => {
        return new Date(post2.createdAt) - new Date(post1.createdAt);
      }));
    };
    fetchPosts();
  }, [username, user._id]);
  //useEffect()の第二引数の[]の発火タイミングの指定は、複数可能。
  return (
    <div className="timeline">
      <div className="timelineWrapper">
        <Share />
        {posts.map((post) => (
          <Post post={post} key={post._id} />
        ))}
        {/* <Post /> */}
      </div>
    </div>
  );
}
