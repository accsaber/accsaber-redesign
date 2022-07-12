import { Link, NavLink } from "@remix-run/react";
import logo from "~/lib/images/logo.webp";
import headerItems from "../headerItems";
import DarkToggle from "./darkToggle";
import UserContext from "./userContext";

const Header = () => {
  return (
    <header className="text-white bg-gradient-to-l from-blue-600 to-purple-600">
      <div className="flex items-center max-w-screen-lg gap-2 p-2 mx-auto">
        <Link
          to={"/"}
          className="flex items-center h-12 gap-2 p-2 -mr-2 font-semibold rounded-full hover:bg-black/10"
        >
          <img src={logo} alt="AccSaber" className="h-8 aspect-square" />
        </Link>
        <nav className="flex flex-1 gap-2">
          {headerItems.map(({ href, name }) => (
            <NavLink to={href} key={href} className="headerNav">
              {name}
            </NavLink>
          ))}
          <a href="https://wiki.accsaber.com" className="headerNav">
            Wiki
          </a>
        </nav>
        <NavLink to="/search" className={"headerNav p-3"} aria-label="Search">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            />
          </svg>
        </NavLink>
        <DarkToggle />
        <UserContext.Consumer>
          {(user) =>
            user ? (
              <NavLink
                to={`/profile/${user.playerId}/scores`}
                className="flex h-10 mx-2 overflow-auto rounded-full aspect-square"
              >
                <picture>
                  <source
                    srcSet={`/profile/${user.playerId}.thumbnail.avif`}
                    type="image/avif"
                  />
                  <source
                    srcSet={`/profile/${user.playerId}.thumbnail.webp`}
                    type="image/webp"
                  />
                  <img
                    src={`/profile/${user.playerId}.thumbnail.jpeg`}
                    alt={`${user.playerName}'s profile`}
                    loading="lazy"
                  />
                </picture>
              </NavLink>
            ) : (
              <NavLink to="/register" className="headerNav">
                Sign up
              </NavLink>
            )
          }
        </UserContext.Consumer>
      </div>
    </header>
  );
};

export default Header;
