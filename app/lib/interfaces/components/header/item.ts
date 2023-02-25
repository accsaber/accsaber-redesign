import type { ReactNode } from "react";

export default interface HeaderItem {
  name: string;
  href: string;
  icon: ReactNode;
  match?: RegExp;
}
