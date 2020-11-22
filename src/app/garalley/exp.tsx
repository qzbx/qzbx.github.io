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
    imageList.push(await loadImage(ARTWORKS[i].file)); // 順番にリストに入れてく
  }
  return imageList;
};

export const Viewer: React.FC<{}> = () => {

  const loadingView = <p>ロード中...</p>;
  const [viewer, setViewer] = useState(loadingView);

  useEffect(() => { // 最初の描画のときだけ呼び出す
    loadImageList() // 画像オブジェクトのリスト読み込み
      .then(res => { // 画像リストが読み込めたら描画
        setViewer(<Garalley imageList={res} />);
      });
  }, []);

  return(<>{viewer}</>);
};
