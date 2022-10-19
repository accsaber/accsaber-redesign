import NavLink from "../components/NavLink.tsx";
import { useSignal } from "@preact/signals";

const headerItems = [
  { name: "Leaderboards", href: "/leaderboards", icon: "list" },
  { name: "Ranked Maps", href: "/maps", icon: "map" },
  // { name: "Campaign", href: "/campaign", icon: "emoji_events" },
];

import {
  XMarkIcon,
  Bars3Icon as MenuIcon,
} from "https://esm.sh/@heroicons/react@2.0.10/20/solid?alias=react:preact/compat";
import PopoverMenu from "../components/PopoverMenu.tsx";

const Header = () => {
  const menuVisible = useSignal(false);
  return (
    <>
      <header className="text-white bg-gradient-to-r from-green-600 to-blue-600">
        <div className="flex items-center max-w-screen-lg gap-2 p-2 mx-auto">
          <a
            href={"/"}
            className="flex items-center h-12 gap-2 p-2 -mr-2 font-semibold rounded-full bg-black bg-opacity-0 hover:bg-opacity-10"
          >
            <img
              src={"/logo.webp"}
              alt="AccSaber"
              className="h-8 aspect-square"
            />
          </a>
          <nav className="flex-1 hidden gap-2 md:flex">
            {headerItems.map(({ href, name }) => (
              <NavLink
                to={href}
                key={href}
                className="rounded px-4 py-2 items-center gap-2 bg-black bg-opacity-0 hover:bg-opacity-10 h-min"
              >
                {name}
              </NavLink>
            ))}
            <a
              href="https://wiki.accsaber.com"
              className="rounded px-4 py-2 items-center gap-2 bg-black bg-opacity-0 hover:bg-opacity-10"
            >
              Wiki
            </a>
          </nav>
          <nav className="hidden md:flex">
            {/* <ActionSection onClick={() => setMenu(false)} /> */}
          </nav>
          <div className="flex-1 text-lg md:hidden">AccSaber</div>
          <button
            onClick={() => (menuVisible.value = true)}
            className="p-3 headerNav md:hidden"
          >
            <MenuIcon className="w-5 h-5" />
          </button>
        </div>
      </header>
      <PopoverMenu visible={menuVisible.value}>
        <div className="flex p-2">
          <div className="flex-1"></div>
          <button
            className="p-2 rounded-full headerNav"
            aria-label="close"
            onClick={() => (menuVisible.value = false)}
          >
            <XMarkIcon className="w-4 h-4" />
          </button>
        </div>
        <nav className="flex flex-col flex-1 gap-2 p-2">
          {headerItems.map(({ href, name }) => (
            <NavLink
              to={href}
              key={href}
              className="headerNav"
              onClick={() => (menuVisible.value = false)}
            >
              {name}
            </NavLink>
          ))}
          <a href="https://wiki.accsaber.com" className="headerNav">
            Wiki
          </a>
        </nav>
        <hr className="dark:border-neutral-800" />
        <div className="flex items-center justify-end p-2">
          {/* <ActionSection onClick={() => setMenu(false)} /> */}
        </div>
      </PopoverMenu>
    </>
  );
};

export default Header;
