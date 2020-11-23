import * as React from "react";
import * as CONST from "./../../constants";
import * as RES from "./../../resources";
import * as ICON from "./../../icons/list";
import style from "./exp.scss";

export const Bio: React.FC<{}> = () => {
  return(
    <div className={style.bio}>
      <img src={RES.ICON_SRC} title="近影" />
      <h1>羽村那由多</h1>
      <h1>（なゆも・qzbx）</h1>
    </div>
  );
};

export const Contact: React.FC<{}> = () => {

  return(
    <div className={style.contact}>
      {ICON.mastodon}
      {ICON.github}
      {ICON.protonmail}
      {ICON.pinterest}
      {ICON.liberapay}
      {ICON.instagram}
      {ICON.twitter}
      {ICON.tumblr}
      {ICON.pixiv}
    </div>
  );
};

export const Profile: React.FC<{}> = () => {
  return(
    <div className={style.wrapper}>
      <Bio />
      <Contact />
    </div>
  );
};

