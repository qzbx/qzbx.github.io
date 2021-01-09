export const ICON_SRC = "https://s3-ap-northeast-1.amazonaws.com/waha.work/accounts/avatars/000/000/002/original/3b7b88f7c4ec18cc.png"

export interface Date { // 投稿日
    y: number;
    m: number;
    d: number;
};

export interface Artwork { // 各画像アイテム
  title: string; // タイトル
  file: string; // ファイル名
  origin: string; // 版権
  date: Date;
}

// アイテム情報リスト
export const ARTWORKS: Artwork[] = [
  {
    title: "FF9 20th Anniversary", file: "200616.jpg",
    origin: "Final Fantasy IX",
    date: {y: 2020, m: 7, d: 7},
  },
  {
    title: "ノア", file: "191220.jpg",
    origin: "Granblue Fantasy",
    date: {y: 2019, m: 12, d: 20},
  },
  {
    title: "", file: "191214.jpg",
    origin: "Granblue Fantasy",
    date: {y: 2019, m: 12, d: 14},
  },
  {
    title: "", file: "191213.jpg",
    origin: "Granblue Fantasy",
    date: {y: 2019, m: 12, d: 13},
  },
  {
    title: "景桜", file: "191128.jpg",
    origin: "Granblue Fantasy",
    date: {y: 2019, m: 11, d: 28},
  },
  {
    title: "", file: "191118.jpg",
    origin: "Granblue Fantasy",
    date: {y: 2019, m: 11, d: 18},
  },
  {
    title: "うさぎ", file: "191006.png",
    origin: "",
    date: {y: 2019, m: 10, d: 6},
  },
  {
    title: "", file: "190925.jpg",
    origin: "",
    date: {y: 2019, m: 9, d: 25},
  },
  {
    title: "アビゲイル・ウィリアムズ", file: "190727.jpg",
    origin: "Fate/Grand Order",
    date: {y: 2019, m: 7, d: 27},
  },
  {
    title: "静謐", file: "190720.jpg",
    origin: "Fate/Grand Order",
    date: {y: 2019, m: 7, d: 20},
  },
  {
    title: "FF9 19th Anniversary", file: "190702.jpg",
    origin: "Final Fantasy IX",
    date: {y: 2019, m: 7, d: 7},
  },
  {
    title: "カズマ", file: "190601.jpg",
    origin: "サマーウォーズ",
    date: {y: 2019, m: 6, d: 1},
  },
  {
    title: "", file: "190317.jpg",
    origin: "",
    date: {y: 2019, m: 3, d: 17},
  },
  {
    title: "年賀状", file: "190228.jpg",
    origin: "",
    date: {y: 2019, m: 1, d: 1},
  },
  {
    title: "", file: "190118.jpg",
    origin: "キノの旅",
    date: {y: 2019, m: 1, d: 18},
  },
  {
    title: "緑谷出久", file: "180924.jpg",
    origin: "僕のヒーローアカデミア",
    date: {y: 2018, m: 9, d: 24},
  },
  {
    title: "", file: "171115.png",
    origin: "",
    date: {y: 2017, m: 11, d: 15},
  },
  {
    title: "神楽麗", file: "171028.png",
    origin: "アイドルマスターSideM",
    date: {y: 2017, m: 10, d: 28},
  },
  {
    title: "極", file: "170922.png",
    origin: "刀剣乱舞",
    date: {y: 2017, m: 9, d: 22},
  },
  // {title: "たいとる", file: "170712.png"},
  // {title: "たいとる", file: "170707.png"},
  // {title: "たいとる", file: "170221.png"},
  // {title: "たいとる", file: "170204.png"},
  // {title: "たいとる", file: "170127.png"},
  // {title: "たいとる", file: "170121.png"},
  // {title: "たいとる", file: "161221.png"},
  // {title: "たいとる", file: "161128.png"},
  // {title: "たいとる", file: "160803.png"},
  // {title: "たいとる", file: "160731.png"},
];

