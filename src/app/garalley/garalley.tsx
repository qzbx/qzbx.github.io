import * as React from "react";
import { useWindowWidth } from "@react-hook/window-size";
import * as CONST from "./../../constants";
import * as RES from "./../../resources";

// SCSS module import
import style from "./garalley.scss";

const entry_width = 250; // 各アイテムの幅（px）
const article_margin = 10; // ギャラリー外側のマージンの最小値（px）
const max_column_num = 6; // 最大カラム数

interface Column { // 各行
  artworks: RES.Artwork[]; // アイテムリスト
  height: number; // 行の高さ
}

export const Garalley: React.FC<{imageList: HTMLImageElement[]}> = (props) => {

  const width = useWindowWidth(); // 画面の幅を取得（state）
  let columnList: Column[] = []; // i番目にi行目のカラムが入る

  // レスポンシブ設定
  let column_num = 6; // for文で引っかからなかった（幅がでかい）場合はこの値
  for (let i = 2; i <= max_column_num + 1; ++i) {

    // 装填した画像分の高さ（調整済み）を記録
    const image = props.imageList[i - 2];

    // columnListの初期化（1列目だけ装填）
    const column: Column = {
      artworks: [RES.ARTWORKS[i - 2]],
      height: image.height * (entry_width / image.width),
    };
    columnList.push(column); 

    // レスポンシブ・表示幅の計算
    if (width < entry_width * i + article_margin * 2 || RES.ARTWORKS.length < i) { 
      column_num = i - 1;
      break;
    };
  };

  // 各カラムへのアイテムの割り振り
  for (let i = column_num; i < RES.ARTWORKS.length; ++i) {

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
      artworks: columnList[index].artworks.concat(RES.ARTWORKS[i]),
      // 追加したカラムの高さ情報を更新
      height: columnList[index].height + image.height * (entry_width / image.width),
    };
  };

  // イラスト一覧（JSXタグ化）
  const garalley = columnList.map((col, i) => { // (element, index)
    const column = col.artworks.map((aw, j) => { // 各行の要素をJSXに
      const src = CONST.RESOURCES_REPO + CONST.ARTWORKS_DIR + CONST.THUMBNAIL_DIR + aw.file;
      return (
        <div key={j} className={style.entry}>
          <img alt={aw.title} src={src} />
        </div>
      );
    });
    return (
      <div key={i} className={style.column}>
        {column}
      </div>
    );
  });

  // 描画
  return (
    <article>
      {garalley}
    </article>
  );
};
