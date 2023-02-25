"use client";
import Link from "next/link";
import type { MouseEventHandler } from "react";
import { useRef } from "react";
import { useState } from "react";
import logo from "~/images/logo.webp";
import headerItems from "~/lib/headerItems";
import {
  Bars3Icon as MenuIcon,
  MagnifyingGlassIcon as SearchIcon,
  XMarkIcon as XIcon,
} from "@heroicons/react/24/solid";
import PopoverMenu from "./Popover";
import config from "~/lib/api/config";
import { Form, NavLink, useLocation, useNavigation } from "@remix-run/react";
import { useUser } from "./UserContext";
import DarkToggle from "./DarkModeToggle";
import CDNImage from "./CDNImage";
import { Popover } from "@headlessui/react";
import {
  BookOpenIcon,
  ArrowLeftOnRectangleIcon as LogoutIcon,
  UserIcon,
  UserPlusIcon,
} from "@heroicons/react/24/outline";
import LoadingSpinner from "./LoadingSpinner";
import { SearchPageBody as SearchPage } from "~/routes/search";

const ActionSection = ({
  onClick,
  popupRef,
}: {
  onClick: MouseEventHandler;
  popupRef: React.MutableRefObject<HTMLDialogElement | undefined>;
}) => {
  const user = useUser();

  return (
    <>
      <NavLink
        className="p-3 headerNav"
        to="/search"
        onClick={(e) => {
          e.preventDefault();
          popupRef.current?.showModal();
        }}
      >
        <SearchIcon className="w-6 h-6" />
      </NavLink>
      <DarkToggle />
      {user ? (
        <Popover className="relative flex items-start justify-center">
          <Popover.Button
            as={NavLink}
            to={`/profile/${user.playerId}`}
            className="flex h-10 mx-2 xl:m-0 xl:mt-2 overflow-auto rounded-full aspect-square"
          >
            <CDNImage
              width={40}
              height={40}
              src={`avatars/${user.playerId}.jpg`}
            />
          </Popover.Button>
          <Popover.Panel className="bg-white text-neutral-900 absolute right-0 rounded shadow-lg z-20 overflow-hidden flex flex-col w-48 bottom-0 md:bottom-12 md:right-[unset] md:left-0 [writing-mode:horizontal-tb]">
            <NavLink
              to={`/profile/${user.playerId}`}
              prefetch="render"
              className="px-4 py-3 hover:bg-neutral-200 flex gap-2 items-center w-full"
            >
              {({ isPending }) => (
                <>
                  {isPending ? (
                    <LoadingSpinner className="h-6 w-6" />
                  ) : (
                    <UserIcon className="h-6" />
                  )}
                  My Profile
                </>
              )}
            </NavLink>
            <Form
              action={`/settings/logout`}
              method="post"
              replace
              reloadDocument
            >
              <button
                type="submit"
                className="px-4 py-3 xl:p-2 hover:bg-neutral-200 flex gap-2 items-center w-full"
              >
                <LogoutIcon className="h-6" />
                Log out
              </button>
            </Form>
          </Popover.Panel>
        </Popover>
      ) : (
        <NavLink
          to="/register"
          className="flex items-center headerNav xl:p-2 aspect-square justify-center relative group"
          onClick={onClick}
        >
          <div className="hidden xl:inline">
            <UserPlusIcon className="w-6 h-6" />
          </div>
          <div className="xl:tooltip xl:left-full xl:top-1/2 xl:-translate-y-1/2">
            Sign up
          </div>
        </NavLink>
      )}
    </>
  );
};

const Header = () => {
  const [menuVisible, setMenu] = useState(false);
  const { pathname } = useLocation();
  const { state } = useNavigation();
  const popupRef = useRef<HTMLDialogElement>();

  return (
    <>
      <header
        className={[
          "text-white bg-gradient-to-l xl:fixed xl:h-full xl:left-0 xl:z-50 top-0",
          "from-blue-600 to-purple-600 xl:bg-transparent xl:bg-none xl:text-neutral-800 xl:dark:text-white",
        ].join(" ")}
      >
        <div className="flex items-center max-w-screen-lg gap-2 p-2 mx-auto xl:flex-col xl:h-full">
          <Link
            href={"/"}
            className="flex items-center h-12 gap-2 p-2 -mr-2 xl:-m-0 font-semibold rounded-full hover:bg-black/10"
          >
            <LoadingSpinner
              className={`w-8 h-8 absolute ${
                state !== "idle"
                  ? " transition-opacity [transition-delay:0.25s]"
                  : "opacity-0"
              }`}
            />
            <img
              src={logo}
              alt="AccSaber"
              height={32}
              width={32}
              className={`w-8 h-8 aspect-square relative transition-transform ${
                state !== "idle" ? "scale-75  [transition-delay:0.25s] " : ""
              }`}
            />
          </Link>
          <nav className="flex-1 hidden gap-2 md:flex xl:flex-col">
            {headerItems.map(({ href, name, match, icon }) => (
              <NavLink
                to={href}
                key={href}
                prefetch="intent"
                className={({ isActive }) =>
                  `headerNav${
                    isActive || match?.test(pathname ?? "") ? " active" : ""
                  } flex gap-2 relative group xl:p-2`
                }
              >
                <div className="hidden xl:inline">{icon}</div>
                <div className="xl:tooltip xl:left-full xl:top-1/2 xl:-translate-y-1/2">
                  {name}
                </div>
              </NavLink>
            ))}
            <a
              href="https://wiki.accsaber.com"
              className="headerNav  flex gap-2 relative group xl:p-2"
            >
              <div className="hidden xl:inline">
                <BookOpenIcon className="w-6 h-6" />
              </div>
              <div className="xl:tooltip xl:left-full xl:top-1/2 xl:-translate-y-1/2">
                Wiki
              </div>
            </a>
          </nav>
          <nav className="hidden md:flex xl:flex-col">
            <ActionSection onClick={() => setMenu(false)} popupRef={popupRef} />
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
              prefetch="intent"
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
        <div className="flex items-center justify-end p-2 relative">
          <ActionSection onClick={() => setMenu(false)} />
        </div>
      </PopoverMenu>
      <dialog
        ref={(self) => self && (popupRef.current = self)}
        className="bg-transparent rounded-xl w-full max-w-screen-md h-full"
      >
        <div className="flex justify-end px-4 xl:p-2 -mb-2">
          <button
            className="p-2 opacity-80 hover:opacity-100 text-white"
            onClick={() => popupRef.current?.close()}
          >
            <XIcon className="w-6 h-6" />
          </button>
        </div>
        <SearchPage close={() => popupRef.current?.close()} />
      </dialog>
    </>
  );
};

export default Header;
