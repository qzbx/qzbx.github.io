import * as React from "react";
import { useState, useEffect } from "react";
import { useWindowSize } from "@react-hook/window-size";
import * as CONST from "./../../constants";
import { Artwork } from "./../../assets";
import { loadImage } from "./view";
import c from "./panel.scss";

// 画像の情報表示領域（画像下部にオーバレイで出すやつ）
const Desc: React.FC<{aw: Artwork; isMobile: Boolean; open: Boolean;}> = (props) => { 

  const aw = props.aw; // alias
  const zp: (num: Number) => String = (num) => { // 2桁のゼロパディング
    return ("00" + String(num)).slice(-2);
  };

  // 表示領域のコンテンツ
  const content = (<>
    <h1>{aw.title}</h1>
    <p className={c.date}>
      {String(aw.date.y)}/{zp(aw.date.m)}/{zp(aw.date.d)}
    </p>
    {aw.origin &&
      <p className={c.origin}><span>from</span> {aw.origin}</p>
    }
  </>);

  if (!props.isMobile) { // PC
    return (
      <div className={`${c.desc} ${c.slideout} ${c.stay}`}>
        <>{content}</>
      </div>
    );
  } else { // スマホ
    if (props.open) { // 開く（スライドイン）
      return (
        <div className={`${c.desc} ${c.slidein}`}>
          <>{content}</>
        </div>
      );
    } else {
      return ( // 閉じる（スライドアウト）
        <div className={`${c.desc} ${c.slideout}`}>
          <>{content}</>
        </div>
      );
    };
  };
};


// モーダルで表示する画像のパネル
export const Panel: React.FC<{artwork: Artwork}> = (props) => {

  const aw = props.artwork; // alias
  const src = CONST.ARTWORKS_REPO + CONST.ORIGINAL_DIR + aw.file; // 画像ソース

  // ロード中の画面
  const loading = (
    <div className={c.loading}>
      <div className={c.loader} />
      <p>Loading...</p>
    </div>
  );

  const [windowWidth, windowHeight] = useWindowSize(); // 画面サイズを取得（state）
  const [panel, setPanel] = useState(<>{loading}</>); // モーダルのコンテナ
  const [descOpen, setDescOpen] = useState(false); // スマホでの desc 表示状態
  const renderPanel = async () => { // 画像を読み込んで描画をセット

    const img = await loadImage(src); // 画像を読み込み
    const isMobile = windowWidth <= CONST.BPW; // BPW 以下の幅ならスマホ扱い
    // モーダルと表示領域との隙間（上下 or 左右 -> 値は２倍）
    const padding = isMobile ? 20 : 100; // スマホ 20 PC 100 
    const width = windowWidth - padding; // 隙間を適用
    const height = windowHeight - padding;

    // 比率に合わせて計算した幅・高さ
    const resizedWidth = img.width * (height / img.height); // height 時の画像の幅
    const resizedHeight = img.height * (width / img.width); // width 時の画像の高さ
    const wdiff = width - resizedWidth;    // 画面幅と調整後画像幅の差分
    const hdiff = height - resizedHeight;  // マイナス値分だけ飛び出している

    // 画面表示パネル（モーダル）のサイズを計算
    // そもそも画像が画面領域より完全に小さければ画像のオリジナルサイズで表示
    // それ以外は縦横のうち調整後画像で画面から飛び出すほうに合わせて比率を計算
    const panelWidth = img.width < width && img.height < height ? img.width :
      wdiff < hdiff ? width : resizedWidth;
    const panelHeight = img.width < width && img.height < height ? img.height :
      wdiff < hdiff ? resizedHeight : height;

    setPanel(
      <div 
        className={c.container} 
        style={{width: panelWidth, height: panelHeight,}}
        onClick={e => {e.stopPropagation();}}
      >
        <img 
          alt={aw.title} 
          src={src} 
          className={!isMobile ? c.trigger : c.null} // ホバーアクション
          onClick={() => {isMobile && setDescOpen(!descOpen);}}
        />
        <Desc isMobile={isMobile} aw={aw} open={descOpen} />
      </div>
    );
  };

  useEffect(() => { // 初回呼び出しと画面サイズ変更時に描画をセット
    renderPanel(); 
  }, [windowWidth, windowHeight, descOpen]); // descOpen ないと更新されん

  return (
    <>{panel}</>
  );

};

