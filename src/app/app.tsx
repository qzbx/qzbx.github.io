import * as React from "react";
import { BrowserRouter, Switch, Route, Link, useHistory } from "react-router-dom";
import * as CONST from "./../constants";

// SCSS module import
import style from "./app.scss";

// ホームの表示領域
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

// ルーティングするページの情報
const routingList = [
  {title: "About",     url: CONST.LOCATION_URL_ABOUT,      render: <p>わはー</p>},
  {title: "Garalley",  url: CONST.LOCATION_URL_GARALLEY,   render: <p>おほー</p>},
  {title: "Contact",   url: CONST.LOCATION_URL_CONTACT,    render: <p>あはー</p>},
];

// ナビゲーション
const nav = routingList.map(routing => {
  return (<Link to={routing.url}>{routing.title}</Link>);
});

// ルーティングで切り替わる表示領域
const routes = routingList.map(routing => {
  return (<Route path={routing.url}>{routing.render}</Route>)
});

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
        <nav>{nav}</nav>
      </header>

      <main>
        <div className={style.contents}>
          <Switch>
            <Route exact path={CONST.LOCATION_URL_HOME}><Home /></Route>
            {routes}
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
