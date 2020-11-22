import * as React from "react";
import { useState, useEffect } from "react";
import * as CONST from "./../../constants";
import { ARTWORKS } from "./../../resources";
import { Garalley } from "./garalley";

// SCSS module import
import style from "./exp.scss";

// 各画像の読み込み
const loadImage: (src: string) => Promise<HTMLImageElement> = (src) => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.src = src;
  });
};

// 画像オブジェクトリストの読み込み
const loadImageList: () => Promise<HTMLImageElement[]> = async () => {
  let imageList = [];
  for (let i = 0; i < ARTWORKS.length; ++i) { // ここは map 使用不可なん？
    const src = CONST.RESOURCES_REPO + CONST.ARTWORKS_DIR + CONST.THUMBNAIL_DIR + ARTWORKS[i].file;
    console.log(i + "番目ロード中...");
    imageList.push(await loadImage(src)); // 順番にリストに入れてく
    console.log(i + "番目ロードおわり");
  }
  return imageList;
};

export const Viewer: React.FC<{}> = () => {

  const loadingView = (
    <div className={style.loading_view}>
      <div className={style.loader} />
      <p>Loading...</p>
    </div>
  );
  const [viewer, setViewer] = useState(loadingView);

  useEffect(() => { // 最初の描画のときだけ呼び出す
    loadImageList() // 画像オブジェクトのリスト読み込み
      .then(res => { // 画像リストが読み込めたら描画
        setTimeout(function() { 
        setViewer(<Garalley imageList={res} />);
        }, 5000);
      });
  }, []);

  return(<>{viewer}</>);
};