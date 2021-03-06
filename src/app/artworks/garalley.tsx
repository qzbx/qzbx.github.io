import * as React from "react";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useWindowWidth } from "@react-hook/window-size";
import { Modal } from "garakuta";
import { Panel } from "./panel";
import * as CONST from "./../../constants";
import { dateToStr } from "./../../utils";
import * as ASSETS from "./../../assets";

// SCSS module import
import c from "./garalley.scss";

interface Column { // 各行
  artworks: ASSETS.Artwork[]; // アイテムリスト
  height: number; // 行の高さ
}

export const Garalley: React.FC<{imageList: HTMLImageElement[]}> = (props) => {

  const width = useWindowWidth(); // 画面の幅を取得（state）
  const article_margin = 10; // ギャラリー外側のマージンの最小値（px）
  // 各アイテムの幅（px）スマホのときは幅の半分
  const entry_width = (width > CONST.BPW) ? 230 : width / 2 - article_margin; 
  const max_column_num = 7; // 最大カラム数
  let columnList: Column[] = []; // i番目にi行目のカラムが入る

  // レスポンシブ設定
  let column_num = max_column_num; // for文で引っかからなかったときはこの値
  for (let i = 2; i <= max_column_num + 1; ++i) {

    // 装填した画像分の高さ（調整済み）を記録
    const image = props.imageList[i - 2];

    // columnListの初期化（1列目だけ装填）
    const column: Column = {
      artworks: [ASSETS.ARTWORKS[i - 2]],
      height: image.height * (entry_width / image.width),
    };
    columnList.push(column); 

    // レスポンシブ・表示幅の計算
    if (width < entry_width * i + article_margin * 2 || ASSETS.ARTWORKS.length < i) { 
      column_num = i - 1;
      break;
    };
  };

  // 各カラムへのアイテムの割り振り
  for (let i = column_num; i < ASSETS.ARTWORKS.length; ++i) {

    // 最小カラムを調べる
    let index = 1; // 最小カラムのindex
    let current_min_height = Number.MAX_SAFE_INTEGER; // for文用
    for (let j = 0; j < columnList.length; ++j) {
      if (columnList[j].height < current_min_height) { // 左優先
        current_min_height = columnList[j].height;
        index = j;
      };
    }

    const image = props.imageList[i];
    columnList[index] = {
      // 高さ最小のカラムにアイテムを追加
      artworks: columnList[index].artworks.concat(ASSETS.ARTWORKS[i]),
      // 追加したカラムの高さ情報を更新
      height: columnList[index].height + image.height * (entry_width / image.width),
    };
  };

  // モーダル（パネル）関連
  const [open, setOpen] = useState(false); // true で絵の拡大表示モーダルを表示
  const [artwork, setArtwork] = useState<ASSETS.Artwork | null>(); // 表示する絵
  // モーダル表示中の戻るアクションでは /artwork を表示する
  const history = useHistory();
  useEffect(() => {
    window.onpopstate = () => { // 履歴項目変更時に発火する動作をセット
      // モーダル表示中なら /artwork へリダイレクト
      // リダイレクト後に /artwork のレンダリングで open は false に初期化される
      open && history.push(CONST.LOCATION_URL_ARTWORKS);
    };
  }, [open]);
  // モーダル表示時の挙動
  const mainView = document.getElementById("main"); // メインのエレメント
  const handleClick = (aw: ASSETS.Artwork) => { // モーダル開くとき
    sessionStorage.setItem("y", String(mainView!.scrollTop)); // スクロール量を保存
    setOpen(true); 
    setArtwork(aw);
  };
  useEffect(() => { // モーダルから戻るでリダイレクト -> 元の場所までスクロール
    const y = sessionStorage.getItem("y");
    if (y) { 
      mainView!.scroll(0, Number(y));
      sessionStorage.removeItem("y");
    };
  }, []);


  // イラスト一覧（JSXタグ化）
  const garalley = columnList.map((col, i) => { // (element, index)
    const column = col.artworks.map((aw, j) => { // 各行の要素をJSXに
      const src = CONST.ARTWORKS_REPO + CONST.THUMBNAIL_DIR + aw.file;
      return (
        <div 
          key={j} 
          className={c.entry}
          onClick={() => handleClick(aw)}
        >
          <img alt={aw.title} src={src} />
          <div className={c.info}><p>{dateToStr(aw.date)}</p></div>
        </div>
      );
    });
    return (
      <div key={i} className={c.column}>
        {column}
      </div>
    );
  });


  // 描画
  return (<>
    <div className={c.wrapper}>
      {garalley}
    </div>
    {open && artwork &&
      <Modal.Simple
        className={c.mask}
        onClick={() => {setOpen(false); sessionStorage.removeItem("y")}}
      >
        <Panel artwork={artwork} />
      </Modal.Simple>
    }
  </>);
};

