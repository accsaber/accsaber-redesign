import { Link, NavLink } from "@remix-run/react";
import logo from "~/lib/images/logo.webp";
import headerItems from "../headerItems";
import UserContext from "./userContext";

const Header = () => (
  <header className="bg-gradient-to-l from-blue-600 to-purple-600 text-white">
    <div className="p-2 max-w-screen-lg mx-auto flex items-center gap-2">
      <Link
        to={"/"}
        className="h-12 rounded-full p-2 flex hover:bg-black/10 items-center gap-2 -mr-2 font-semibold"
      >
        <img src={logo} alt="AccSaber" className="h-8 aspect-square" />
      </Link>
      <nav className="flex-1 gap-2 flex">
        {headerItems.map(({ href, name }) => (
          <NavLink to={href} key={href} className="headerNav">
            {name}
          </NavLink>
        ))}
        <a href="https://wiki.accsaber.com" className="headerNav">
          Wiki
        </a>
      </nav>
      <NavLink to="/search" className={"headerNav rounded-full"}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
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
      <UserContext.Consumer>
        {(user) =>
          user ? (
            <NavLink
              to={`/profile/${user.playerId}/scores`}
              className="flex rounded-full h-10 aspect-square overflow-auto mx-2"
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

export default Header;
