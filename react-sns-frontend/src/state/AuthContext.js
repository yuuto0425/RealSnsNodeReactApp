import { createContext, useEffect, useReducer } from "react";
import AuthReducer from "./AuthReducer";
//Redux

// 1つのファイルから変数などをグローバルに管理できる状態にする。(例 グローバルコンテキスト的な考え方
//最初のユーザー状態を定義
const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  // user: {
  //   _id: "631697618d65648554c94ea3",
  //   username: "shincode",
  //   email: "shincode@gmail.com",
  //   password: "abcdef",
  //   profilePicture: "/person/1.jpeg",
  //   coverPicture: "",
  //   followers: [],
  //   followings: [],
  //   isAdmin: false,
  // },
  isFetching: false,
  error: false,
};

//状態をグローバルに管理する
export const AuthContext = createContext(initialState);
//グローバルコンテキストを作り出せるcreateContext();

export const AuthContextProvider = ({ children }) => {
  //Providerは提供者という意味合い
  const [state, dispatch] = useReducer(AuthReducer, initialState);
  //useReducer()の引数1 Reducer 2 初期値

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user));
  }, [state.user]);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
