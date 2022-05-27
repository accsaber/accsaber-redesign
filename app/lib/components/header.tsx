import { Link, NavLink } from "@remix-run/react";
import logo from "~/lib/images/logo.png";
import headerItems from "../headerItems";
import UserContext from "./usercontext";

const Header = () => (
  <header className="bg-gradient-to-l from-blue-600 to-purple-600 text-white">
    <div className="p-2 max-w-screen-lg mx-auto flex items-center gap-2">
      <Link
        to={"/"}
        className="h-12 rounded-full p-2 flex hover:bg-black/10 items-center gap-2 font-semibold"
      >
        <img src={logo} alt="AccSaber" className="h-8 aspect-square" />
      </Link>
      <nav className="flex-1 gap-2 flex">
        {headerItems.map(({ href, name }) => (
          <NavLink to={href} key={href} className="headerNav">
            {name}
          </NavLink>
        ))}
      </nav>
      <UserContext.Consumer>
        {(user) =>
          user ? (
            <NavLink
              to={`/profile/${user.playerId}/scores`}
              className="flex rounded-full h-10 aspect-square overflow-auto mx-2"
            >
              <img src={`/profile/${user.playerId}.png`} alt="" />
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
