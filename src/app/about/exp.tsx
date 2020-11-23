import * as React from "react";
import * as CONST from "./../../constants";
import style from "./exp.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-regular-svg-icons";
import { faCode } from "@fortawesome/free-solid-svg-icons";

export const About: React.FC<{}> = () => {

  return(
    <div className={style.wrapper}>
      <h1>なにこれ</h1>
      <hr />
      <section>
        <p>なゆもの個人サイトです</p>
        <p>自分の作品を並べてニコニコしています</p>
      </section>

      <h1>利用規約</h1>
      <hr />
      <section>
        <h2><FontAwesomeIcon icon={faImage} style={{marginRight: "0.5rem"}} />画像</h2>
        <ul>
          <li>オフラインでの私的使用 … 可</li>
          <li>オンラインでの私的使用 … 以下をすべて満たす場合に限り可</li>
          <ul>
            <li>無編集またはトリミング等の軽微な編集のみを施しての使用である</li>
            <li>出典としてこのサイトへのリンクを付記する</li>
          </ul>
          <li>上記以外 … 原則禁止</li>
        </ul>
      </section>

      <section>
        <h2><FontAwesomeIcon icon={faCode} style={{marginRight: "0.5rem"}} />ソースコード</h2>
        <p>サイトのソースコードについてはMITライセンスとします</p>
      </section>
    </div>
  );
};


