import * as React from "react";
import { useHistory } from "react-router-dom";
import { useWindowWidth } from "@react-hook/window-size";
import * as CONST from "./../../constants";

// SCSS module import
import style from "./exp.scss";

// アイテム情報リスト
const artworkList = [
  {title: "アイテム1", file: "http://lorempixel.com/400/300/nature/"},
  {title: "アイテム2", file: "http://lorempixel.com/400/400/sports/"},
  {title: "アイテム3", file: "http://lorempixel.com/400/200/city/"},
  {title: "アイテム4", file: "http://lorempixel.com/400/600/food/"},
  {title: "アイテム5", file: "http://lorempixel.com/400/200/technics/"},
  {title: "アイテム6", file: "https://cdn.pixabay.com/photo/2020/11/08/09/41/deer-5723225__340.jpg"},
  {title: "アイテム7", file: "https://cdn.pixabay.com/photo/2020/09/27/04/15/cat-5605615__340.jpg"},
  {title: "アイテム8", file: "https://cdn.pixabay.com/photo/2020/11/06/05/33/woman-5716875__340.png"},
  {title: "アイテム9", file: "https://cdn.pixabay.com/photo/2020/11/01/19/41/autumn-5704791__340.jpg"},
  {title: "アイテム10", file: "https://cdn.pixabay.com/photo/2020/07/27/02/30/hands-5441201__340.jpg"},
  {title: "アイテム11", file: "https://cdn.pixabay.com/photo/2020/04/19/12/26/thread-5063401__340.jpg"},
  {title: "アイテム12", file: "https://cdn.pixabay.com/photo/2020/11/16/22/58/mountains-5750804__340.jpg"},
  {title: "アイテム13", file: "https://cdn.pixabay.com/photo/2016/11/29/06/55/japanese-1867933__340.jpg"},
  {title: "アイテム14", file: "https://cdn.pixabay.com/photo/2020/03/23/08/37/taiwan-4959896__340.jpg"},
];

const artwork_width = 250; // 各アイテムの幅（px）
const article_margin = 10; // ギャラリー外側のマージンの最小値（px）
const max_column_num = 6; // 最大カラム数

// サイズ取得のために画像オブジェクトをリストで読み込む
const imageList = artworkList.map(e => {
  let image = new Image();
  image.src = e.file;
  return image;
});

export const Garalley: React.FC<{}> = () => {

  const width = useWindowWidth(); // 画面の幅を取得（useEffectかかってる）
  let columnList = []; // i番目にi行目のアイテムリストが入る
  let columnSizeList: number[] = []; // i番目にi行目の現在のサイズが入る

  // レスポンシブ設定
  let column_num = 6; // for文で引っかからなかった（幅がでかい）場合はこの値
  for (let i = 2; i <= max_column_num + 1; ++i) {

    // columnListの初期化（1列目だけ装填）
    columnList.push([artworkList[i - 2]]); 

    // 装填した画像分の高さ（調整済み）を記録
    const image = imageList[i - 2];
    columnSizeList.push(image.height * (artwork_width / image.width)); 

    // レスポンシブ・表示幅の計算
    if (width < artwork_width * i + article_margin * 2) { 
      column_num = i - 1;
      break;
    };
  };

  // 各カラムへのアイテムの割り振り
  for (let i = column_num; i < artworkList.length; ++i) {

    // 最小カラムを調べる
    let min_column_index = 1; // 最小カラムのindex
    let current_min_height = Number.MAX_SAFE_INTEGER; // for文用
    for (let j = 0; j < columnSizeList.length; ++j) {
      if (columnSizeList[j] < current_min_height) { // 左優先
        current_min_height = columnSizeList[j];
        min_column_index = j;
      };
    }

    // 高さ最小のカラムにアイテムを追加
    columnList[min_column_index].push(artworkList[i]);

    // 追加したカラムの高さ情報を更新
    const image = imageList[i];
    const increased_height = image.height * (artwork_width / image.width);
    columnSizeList[min_column_index] += increased_height;
  };

  // イラスト一覧（JSXタグ化）
  const artworks = columnList.map((col, i) => { // (element, index)
    const column = col.map((e, j) => { // 各行の要素をJSXに
      return (
        <div key={j} className={style.artwork}>
          {/* <img alt={a.title} src={CONST.RESOURCES_REPO + a.file} /> */}
          <img alt={e.title} src={e.file} />
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
      {artworks}
    </article>
  );
};

