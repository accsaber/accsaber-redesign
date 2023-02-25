import { ChartBarSquareIcon, MapIcon } from "@heroicons/react/24/outline";
import type HeaderItem from "./interfaces/components/header/item";

const headerItems: HeaderItem[] = [
  {
    name: "Leaderboards",
    href: "/leaderboards",
    icon: <ChartBarSquareIcon className="w-6 h-6" />,
    match: /^\/((?:leaderboards)|(?:profile)).*$/,
  },
  {
    name: "Ranked Maps",
    href: "/maps",
    icon: <MapIcon className="w-6 h-6" />,
    match: /^\/maps.*$/,
  },
];

export default headerItems;
