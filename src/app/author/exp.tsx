import * as React from "react";
import * as CONST from "./../../constants";
import * as RES from "./../../resources";
import * as ICON from "./../../icons/list";
import style from "./exp.scss";

const Bio: React.FC<{}> = () => {
  return(
    <div className={style.bio}>
      <img src={RES.ICON_SRC} title="近影" />
      <h1>羽村那由多</h1>
      <h1>（なゆも）</h1>
    </div>
  );
};

const Contact: React.FC<{}> = () => {

  const accountList = [
    {icon: ICON.protonmail, href: null                      },
    {icon: ICON.mastodon,   href: CONST.accounts.mastodon   },
    {icon: ICON.github,     href: CONST.accounts.github     },
    {icon: ICON.pinterest,  href: CONST.accounts.pinterest  },
    {icon: ICON.twitter,    href: CONST.accounts.twitter    },
    {icon: ICON.liberapay,  href: CONST.accounts.liberapay  },
    {icon: ICON.instagram,  href: CONST.accounts.instagram  },
    {icon: ICON.tumblr,     href: CONST.accounts.tumblr     },
    {icon: ICON.sinaweibo,  href: CONST.accounts.sinaweibo  },
    {icon: ICON.discord,    href: null                      },
    {icon: ICON.pixiv,      href: CONST.accounts.pixiv      },
  ];
  const br = [3, 6]; // この個数のあとに改行挟む

  return(
    <div className={style.contact}>
      {accountList.map((acc, i) => {
        const atag = (!acc.href) ? <>{acc.icon}</> : <a key={i} href={acc.href} target="_blank" rel="noopener noreferrer">{acc.icon}</a>;
        if (br.indexOf(i) >= 0) {
          return(<>{atag}<br /></>)
        } else {
          return(<>{atag}</>)
        };
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

