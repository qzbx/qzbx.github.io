import * as React from "react";
import { useState, useEffect } from "react";
import * as CONST from "./../../constants";
import { ARTWORKS } from "./../../assets";
import { Garalley } from "./garalley";

// SCSS module import
import style from "./view.scss";

// 各画像の読み込み
export const loadImage: (src: string) => Promise<HTMLImageElement> = (src) => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.src = src;
  });
};

// 画像オブジェクトリストの読み込み
export const loadImageList: () => Promise<HTMLImageElement[]> = async () => {
  let imageList = [];
  for (let i = 0; i < ARTWORKS.length; ++i) { // ここは map 使用不可なん？
    const src = CONST.ARTWORKS_REPO + CONST.THUMBNAIL_DIR + ARTWORKS[i].file;
    imageList.push(await loadImage(src)); // 順番にリストに入れてく
  }
  return imageList;
};

export const Viewer: React.FC<{}> = () => {

  // ロード中の画面
  const loadingView = (
    <div className={style.loading_view}>
      <div className={style.loader} />
      <p>Loading...</p>
    </div>
  );

  // フェードアウトするロード画面
  const duration = 1.1; // sec
  const fadeout = (<div className={style.fadeout}>{loadingView}</div>);

  const [viewer, setViewer] = useState(loadingView);

  useEffect(() => { // 最初の描画のときだけ呼び出す
    const start = performance.now();
    loadImageList() // 画像オブジェクトのリスト読み込み
      .then(res => { // 画像リストが読み込めたら描画
        if (performance.now() - start < 1000) { // 1秒以内にロード完了の場合
          setViewer(<Garalley imageList={res} />);
        } else { // 1秒以上かかった場合はフェードアウトを挟む
          setViewer(fadeout);
          setTimeout(() => { // フェードアウトを表示させるための遅延
            setViewer(<Garalley imageList={res} />);
          }, duration * 1000);
        };
      });
  }, []);

  return(<>{viewer}</>);
};
