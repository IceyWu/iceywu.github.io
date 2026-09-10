import type { Locale } from "../i18n/locales";

interface FriendLink {
  avatar: string;
  description: Record<Locale, string>;
  name: string;
  url: string;
}

export const friends: FriendLink[] = [
  {
    avatar:
      "https://serve.giovan.cn/uploads/1769860396165-143ef0bb240aa25d.jpeg",
    description: {
      en: "May all things go your way.",
      "zh-CN": "万事顺意",
    },
    name: "Giovan",
    url: "https://www.giovan.cn",
  },
];
