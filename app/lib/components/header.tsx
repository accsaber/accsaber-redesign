import { Link, NavLink } from "@remix-run/react";
import { MouseEventHandler, useState } from "react";
import logo from "~/lib/images/logo.webp";
import headerItems from "../headerItems";
import DarkToggle from "./darkToggle";
import UserContext from "./userContext";
import { MenuIcon, XIcon, SearchIcon } from "@heroicons/react/solid";
import PopoverMenu from "./popover";
import PlayerAvatar from "./PlayerAvatar";

const ActionSection = ({ onClick }: { onClick: MouseEventHandler }) => (
  <>
    <NavLink className="p-3 headerNav" to="/search" onClick={onClick}>
      <SearchIcon className="w-5 h-5" />
    </NavLink>
    <DarkToggle />
    <UserContext.Consumer>
      {(user) =>
        user ? (
          <NavLink
            to={`/profile/${user.playerId}/scores`}
            className="flex h-10 mx-2 overflow-auto rounded-full aspect-square"
            onClick={onClick}
          >
            <PlayerAvatar profile={user} />
          </NavLink>
        ) : (
          <NavLink
            to="/register"
            className="flex items-center headerNav"
            onClick={onClick}
          >
            Sign up
          </NavLink>
        )
      }
    </UserContext.Consumer>
  </>
);

const Header = () => {
  const [menuVisible, setMenu] = useState(false);
  return (
    <>
      <header className="text-white bg-gradient-to-l from-blue-600 to-purple-600">
        <div className="flex items-center max-w-screen-lg gap-2 p-2 mx-auto">
          <Link
            to={"/"}
            className="flex items-center h-12 gap-2 p-2 -mr-2 font-semibold rounded-full hover:bg-black/10"
          >
            <img src={logo} alt="AccSaber" className="h-8 aspect-square" />
          </Link>
          <nav className="flex-1 hidden gap-2 md:flex">
            {headerItems.map(({ href, name }) => (
              <NavLink to={href} key={href} className="headerNav">
                {name}
              </NavLink>
            ))}
            <a href="https://wiki.accsaber.com" className="headerNav">
              Wiki
            </a>
            <a
              href="https://tournament.accchamp.community/"
              className="headerNav"
            >
              Tournament
            </a>
          </nav>
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
          {headerItems.map(({ href, name }) => (
            <NavLink
              to={href}
              key={href}
              className="headerNav"
              onClick={() => setMenu(false)}
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
