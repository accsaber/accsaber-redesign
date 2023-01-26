import type HeaderItem from "./interfaces/components/header/item";

const headerItems: HeaderItem[] = [
  {
    name: "Leaderboards",
    href: "/leaderboards/overall",
    icon: "list",
    match: /^\/((?:leaderboards)|(?:profile)).*$/,
  },
  { name: "Ranked Maps", href: "/maps", icon: "map", match: /^\/maps.*$/ },
];

export default headerItems;
