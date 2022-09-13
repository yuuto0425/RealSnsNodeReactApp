import React, { useContext, useRef } from "react";
import { loginCall } from "../../actionCalls";
import { AuthContext } from "../../state/AuthContext";
import "./Login.css";

export default function Login() {
  const email = useRef();
  const password = useRef();
  // console.log(email);
  const {user,isFetching,error,dispatch} = useContext(AuthContext);
  //AuthContextのvalueプロパティーの中身を分割代入で取得

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(email.current.value);
    // console.log(password.current.value);
    loginCall({
      email: email.current.value,
      password: password.current.value,
    },dispatch);
  };

  console.log(user);

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Real SNS</h3>
          <span className="loginDesc">本格的なSNSを自分の手で</span>
        </div>
        <div className="loginRight">
          <form
            onSubmit={(e) => {
              handleSubmit(e);
            }}
            className="loginBox"
          >
            <p className="loginMsg">ログインはこちら</p>
            <input
              type="email"
              className="loginInput"
              placeholder="Eメール"
              required
              ref={email}
            />
            <input
              type="password"
              className="loginInput"
              placeholder="パスワード"
              required
              minLength="6"
              ref={password}
            />
            <button className="loginButton">ログイン</button>
            <span className="loginForgot">パスワードを忘れた方へ</span>
            <button className="loginRegisterButton">アカウント作成</button>
          </form>
        </div>
      </div>
    </div>
  );
}
