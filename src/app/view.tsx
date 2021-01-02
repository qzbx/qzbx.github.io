import * as React from "react";
import { BrowserRouter, Switch, Route, Link, useLocation } from "react-router-dom";
import * as CONST from "./../constants";
import { Home } from "./home/view";
import { Viewer } from "./artworks/view";
import { Profile } from "./author/view";
import { About } from "./about/view";

// SCSS module import
import style from "./view.scss";


// ルーティングするページの情報
const routingList = [
  {title: "About",     url: CONST.LOCATION_URL_ABOUT,     comp: <About />},
  {title: "Artworks",  url: CONST.LOCATION_URL_ARTWORKS,  comp: <Viewer />},
  {title: "Author",    url: CONST.LOCATION_URL_AUTHOR,    comp: <Profile />},
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
        <footer>&copy; 2020 なゆも</footer>
      </div>
    </BrowserRouter>
    </div>
  );
};

