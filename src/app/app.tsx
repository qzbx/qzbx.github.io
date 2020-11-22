import * as React from "react";
import { BrowserRouter, Switch, Route, Link, useLocation } from "react-router-dom";
import * as CONST from "./../constants";
import { Home } from "./home/exp";
import { Viewer } from "./garalley/exp";

// SCSS module import
import style from "./app.scss";


// ルーティングするページの情報
const routingList = [
  {title: "About",     url: CONST.LOCATION_URL_ABOUT,     comp: <p>わはー</p>},
  {title: "Garalley",  url: CONST.LOCATION_URL_GARALLEY,  comp: <Viewer />},
  {title: "Contact",   url: CONST.LOCATION_URL_CONTACT,   comp: <p>あはー</p>},
];

// ナビゲーション
const Navigation: React.FC<{}> = () => {
  const location = useLocation(); // 現在のロケーションを取得

  const nav = routingList.map((e, i) => { // (element, index)
    // 現在表示中の場合とその他で分岐
    if (e.url === location.pathname) { // 表示中のページに対応するナビボタン
      return (<Link key={i} className={style.on} to={e.url}>{e.title}</Link>);
    } else {
      return (<Link key={i} to={e.url}>{e.title}</Link>);
    }
  });

  return (<nav>{nav}</nav>);
};

// 全体の画面
export const App: React.FC<{}> = () => {

  // ルーティングで切り替わる表示領域
  const routes = routingList.map((e, i) => {
    return (<Route key={i} path={e.url}>{e.comp}</Route>);
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

      <div className={style.wrapper}>
        <main>
          <Switch>
            <Route exact path={CONST.LOCATION_URL_HOME}><Home /></Route>
            {routes}
          </Switch>
        </main>
        <footer>&copy; 2020 わはー</footer>
      </div>
    </BrowserRouter>
    </div>
  );
};

