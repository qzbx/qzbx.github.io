import * as React from "react";
import { BrowserRouter, Switch, Route, Link, useLocation } from "react-router-dom";
import * as CONST from "./../constants";
import { Home } from "./home";

// SCSS module import
import style from "./app.scss";


// ルーティングするページの情報
const routingList = [
  {title: "About",     url: CONST.LOCATION_URL_ABOUT,      render: <p>わはー</p>},
  {title: "Garalley",  url: CONST.LOCATION_URL_GARALLEY,   render: <p>おほー</p>},
  {title: "Contact",   url: CONST.LOCATION_URL_CONTACT,    render: <p>あはー</p>},
];

// ナビゲーション
const Navigation: React.FC<{}> = () => {
  const location = useLocation(); // 現在のロケーションを取得

  const nav = routingList.map(r => {
    // 現在表示中の場合とその他で分岐
    if (r.url === location.pathname) { // 表示中のページに対応するナビボタン
      return (<Link key={r.title} className={style.on} to={r.url}>{r.title}</Link>);
    } else {
      return (<Link key={r.title} to={r.url}>{r.title}</Link>);
    }
  });

  return (<nav>{nav}</nav>);
};

// 全体の画面
export const App: React.FC<{}> = () => {

  // ルーティングで切り替わる表示領域
  const routes = routingList.map(r => {
    return (<Route key={r.title} path={r.url}>{r.render}</Route>)
  });

  return (
    <div className={style.app}>
    <BrowserRouter>
      <header>
        {/* タイトルロゴ */}
        <Link to={CONST.LOCATION_URL_HOME}>
          <h1>がらくた</h1>
        </Link>

        {/* ナビゲーション */}
        <Navigation />
      </header>

      <main>
        <div className={style.contents}>
          <Switch>
            <Route exact path={CONST.LOCATION_URL_HOME}><Home /></Route>
            {routes}
          </Switch>
        </div>
      </main>

      <footer>&copy; 2020 わはー</footer>
    </BrowserRouter>
    </div>
  );
};

