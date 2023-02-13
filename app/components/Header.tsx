"use client";
import Link from "next/link";
import type { MouseEventHandler } from "react";
import { useState } from "react";
import logo from "~/images/logo.webp";
import headerItems from "~/lib/headerItems";
import { MenuIcon, SearchIcon, XIcon } from "@heroicons/react/solid";
import PopoverMenu from "./Popover";
import config from "~/lib/api/config";
import { NavLink, useLocation } from "@remix-run/react";
import { useUser } from "./UserContext";
import DarkToggle from "./DarkModeToggle";
import CDNImage from "./CDNImage";

const ActionSection = ({ onClick }: { onClick: MouseEventHandler }) => {
  const user = useUser();
  return (
    <>
      <Link className="p-3 headerNav" href="/search" onClick={onClick}>
        <SearchIcon className="w-5 h-5" />
      </Link>
      <DarkToggle />
      {user ? (
        <NavLink
          to={`/profile/${user.playerId}/overall/scores`}
          className="flex h-10 mx-2 overflow-auto rounded-full aspect-square"
          onClick={onClick}
        >
          <CDNImage
            width={40}
            height={40}
            src={`avatars/${user.playerId}.jpg`}
          />
        </NavLink>
      ) : (
        <NavLink
          to="/register"
          className="flex items-center headerNav"
          onClick={onClick}
        >
          Sign up
        </NavLink>
      )}
    </>
  );
};

const Header = () => {
  const [menuVisible, setMenu] = useState(false);
  const { pathname } = useLocation();
  return (
    <>
      <header className="text-white bg-gradient-to-l from-blue-600 to-purple-600">
        <div className="flex items-center max-w-screen-lg gap-2 p-2 mx-auto">
          <Link
            href={"/"}
            className="flex items-center h-12 gap-2 p-2 -mr-2 font-semibold rounded-full hover:bg-black/10"
          >
            <img
              src={logo}
              alt="AccSaber"
              height={32}
              width={32}
              className="w-8 h-8 aspect-square"
            />
          </Link>
          <nav className="flex-1 hidden gap-2 md:flex">
            {headerItems.map(({ href, name, match }) => (
              <NavLink
                to={href}
                key={href}
                className={({ isActive }) =>
                  `headerNav${
                    isActive || match?.test(pathname ?? "") ? " active" : ""
                  }`
                }
              >
                {name}
              </NavLink>
            ))}
            <a href="https://wiki.accsaber.com" className="headerNav">
              Wiki
            </a>
          </nav>
          <div>
            {config.isBeta && (
              <div className="block px-1 font-semibold text-purple-800 uppercase bg-white rounded">
                Beta
              </div>
            )}
          </div>
          <nav className="hidden md:flex">
            <ActionSection onClick={() => setMenu(false)} />
          </nav>
          <div className="flex-1 text-lg md:hidden">AccSaber</div>
          <button
            onClick={() => setMenu(true)}
            className="p-3 headerNav md:hidden"
          >
            <MenuIcon className="w-5 h-5" />
          </button>
        </div>
      </header>
      <PopoverMenu visible={menuVisible}>
        <div className="flex p-2">
          <div className="flex-1"></div>
          <button
            className="p-2 rounded-full headerNav"
            aria-label="close"
            onClick={() => setMenu(false)}
          >
            <XIcon className="w-4 h-4" />
          </button>
        </div>
        <nav className="flex flex-col flex-1 gap-2 p-2">
          {headerItems.map(({ href, name, match }) => (
            <NavLink
              to={href}
              key={href}
              className={({ isActive }) =>
                `headerNav${isActive ? " active" : ""}`
              }
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
          <ActionSection onClick={() => setMenu(false)} />
        </div>
      </PopoverMenu>
    </>
  );
};

export default Header;