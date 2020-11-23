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
      <h1>（なゆも）</h1>
    </div>
  );
};

export const Contact: React.FC<{}> = () => {

  const accountList = [
    {icon: ICON.mastodon,   href: CONST.accounts.mastodon},
    {icon: ICON.github,     href: CONST.accounts.github},
    {icon: ICON.protonmail, href: "https://protonmail.com"},
    {icon: ICON.pinterest,  href: CONST.accounts.pinterest},
    {icon: ICON.liberapay,  href: CONST.accounts.liberapay},
    {icon: ICON.instagram,  href: CONST.accounts.instagram},
    {icon: ICON.twitter,    href: CONST.accounts.twitter},
    {icon: ICON.tumblr,     href: CONST.accounts.tumblr},
    {icon: ICON.pixiv,      href: CONST.accounts.pixiv},
  ];

  return(
    <div className={style.contact}>
      {accountList.map((acc, i) => {
        if (acc.icon === ICON.protonmail) { // メールはリンクにしない
          return(<>{acc.icon}</>)
        } else {
          return(<a key={i} href={acc.href} target="_blank" rel="noopener noreferrer">{acc.icon}</a>)
        }
      })}
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

