import * as React from "react";
import { useHistory } from "react-router-dom";
import * as CONST from "./../../constants";

// SCSS module import
import style from "./exp.scss";

// イラスト情報リスト
const artworkList = [
  {title: "わはーキング4", file: "http://lorempixel.com/400/300/nature/"},
  {title: "わはーキング4", file: "http://lorempixel.com/400/400/sports/"},
  {title: "わはーキング4", file: "http://lorempixel.com/400/200/city/"},
  {title: "わはーキング4", file: "http://lorempixel.com/400/600/food/"},
  {title: "わはーキング4", file: "http://lorempixel.com/400/200/technics/"},
  {title: "わはーキング4", file: "https://cdn.pixabay.com/photo/2020/11/08/09/41/deer-5723225__340.jpg"},
  {title: "わはーキング4", file: "https://cdn.pixabay.com/photo/2020/09/27/04/15/cat-5605615__340.jpg"},
  {title: "わはーキング4", file: "https://cdn.pixabay.com/photo/2020/11/06/05/33/woman-5716875__340.png"},
  {title: "わはーキング4", file: "https://cdn.pixabay.com/photo/2020/11/01/19/41/autumn-5704791__340.jpg"},
  {title: "わはーキング4", file: "https://cdn.pixabay.com/photo/2020/07/27/02/30/hands-5441201__340.jpg"},
  {title: "わはーキング4", file: "https://cdn.pixabay.com/photo/2020/04/19/12/26/thread-5063401__340.jpg"},
  {title: "わはーキング4", file: "https://cdn.pixabay.com/photo/2020/11/16/22/58/mountains-5750804__340.jpg"},
  {title: "わはーキング4", file: "https://cdn.pixabay.com/photo/2016/11/29/06/55/japanese-1867933__340.jpg"},
  {title: "わはーキング4", file: "https://cdn.pixabay.com/photo/2020/03/23/08/37/taiwan-4959896__340.jpg"},
];

export const Garalley: React.FC<{}> = () => {

  // イラスト一覧
  const artworks = artworkList.map(a => {
    console.log(document.body.clientWidth);
    return(
      <div className={style.artwork}>
        {/* <img alt={a.title} src={CONST.RESOURCES_REPO + a.file} /> */}
        <img alt={a.title} src={a.file} />
      </div>
    );
  });

  return(
    <article>
      {artworks}
    </article>
  );
};

