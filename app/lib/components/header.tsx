import { Link } from "@remix-run/react";
import logo from "~/lib/logo.png";
import headerItems from "../headerItems";

const Header = () => (
  <header className="bg-gradient-to-l from-blue-600 to-purple-600 text-white">
    <nav className="p-2 max-w-screen-lg mx-auto flex items-center">
      <Link
        to={"/"}
        className="h-12 rounded-full p-2 flex hover:bg-black/10 items-center gap-2 font-semibold"
      >
        <img src={logo} alt="AccSaber" className="h-8 aspect-square" />
      </Link>
      {headerItems.map(({ href, name }) => (
        <Link
          to={href}
          key={href}
          className="rounded p-4 py-2 hover:bg-black/10 items-center gap-2"
        >
          {name}
        </Link>
      ))}
    </nav>
  </header>
);

export default Header;
