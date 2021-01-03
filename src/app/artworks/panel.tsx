import * as React from "react";
import { useState, useEffect } from "react";
import { useWindowSize } from "@react-hook/window-size";
import * as CONST from "./../../constants";
import { Artwork } from "./../../assets";
import { loadImage } from "./view";
import c from "./panel.scss";

export const Panel: React.FC<{artwork: Artwork}> = (props) => {

  const aw = props.artwork;
  const src = CONST.ARTWORKS_REPO + CONST.ORIGINAL_DIR + aw.file;

  const [windowWidth, windowHeight] = useWindowSize(); // 画面サイズを取得（state）
  const [panel, setPanel] = useState(<p>わはー</p>); // モーダルのコンテナ
  const renderPanel = async () => { // 画像を読み込んで描画をセット

    const img = await loadImage(src); // 画像を読み込み
    const padding = 100; // モーダルと表示領域との隙間（上下 or 左右 -> 値は２倍）
    const width = windowWidth - padding; // 隙間を適用
    const height = windowHeight - padding;
    const wdiff = width - img.width;    // 画面幅と画像幅の差分
    const hdiff = height - img.height;  // diff の数値が小さいほうがフィットする

    // 画面表示パネル（モーダル）のサイズを計算
    // そもそも画像が画面領域より完全に小さければ画像のオリジナルサイズで表示
    // それ以外は縦横のうち画面と画像との差分が少ないほうに合わせて比率を計算
    const panelWidth = img.width < width && img.height < height ? img.width :
      wdiff < hdiff ? width : img.width * (height / img.height);
    const panelHeight = img.width < width && img.height < height ? img.height :
      wdiff < hdiff ? img.height * (width / img.width) : height;

    setPanel(
      <div 
        className={c.container} 
        style={{width: panelWidth, height: panelHeight,}}
      >
        <img alt={aw.title} src={src} />
      </div>
    );
  };

  useEffect(() => { // 初回呼び出しで描画をセット
    renderPanel(); 
  }, []);

  return (
    <>{panel}</>
  );

};

