import * as React from "react";
import { BrowserRouter, Switch, Route, Link, useHistory } from "react-router-dom";
import * as CONST from "./../constants";

// SCSS module import
import style from "./app.scss";

const Home: React.FC<{}> = () => {

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

// 全体の画面
export const App: React.FC<{}> = () => {

  return (
    <div className={style.app}>
    <BrowserRouter>
      <header>
        {/* タイトルロゴ */}
        <Link to={CONST.LOCATION_URL_HOME}>
          <h1>がらくた</h1>
        </Link>

        {/* ナビゲーション */}
        <nav>
          <Link to={CONST.LOCATION_URL_ABOUT}>あばうと</Link>
          <Link to={CONST.LOCATION_URL_GARALLEY}>あーと</Link>
          <Link to={CONST.LOCATION_URL_CONTACT}>れんらく</Link>
        </nav>
      </header>

      <main>
        <div className={style.contents}>
          <Switch>
            <Route exact path={CONST.LOCATION_URL_HOME}><Home /></Route>
            <Route path={CONST.LOCATION_URL_ABOUT}><p>わはー</p></Route>
            <Route path={CONST.LOCATION_URL_GARALLEY}><p>おほー</p></Route>
            <Route path={CONST.LOCATION_URL_CONTACT}><p>あはー</p></Route>
          </Switch>
        </div>
      </main>

      <footer>
        &copy; 2020 わはー
      </footer>
    </BrowserRouter>
    </div>
  );
};
