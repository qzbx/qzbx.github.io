import * as React from "react";
import { BrowserRouter, Switch, Route, Link, useHistory } from "react-router-dom";
import * as CONST from "./../constants";

// SCSS module import
import style from "./app.scss";

// ホームの表示領域
export const Home: React.FC<{}> = () => {

  // URL 直叩きからのリダイレクトか判定
  const redirect = sessionStorage.getItem("redirect");
  if (redirect) {
    for (const location of CONST.LOCATIONS) {
      if (redirect === location) { // 404 で保存された値がページ URL と一致
        const history = useHistory();
        history.push(redirect); // SPA 側での URL セット
      };
    }
    sessionStorage.removeItem("redirect");
  }

  return(<p>ほーむ</p>);
};

