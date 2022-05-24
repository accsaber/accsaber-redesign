import { Link } from "@remix-run/react";
import logo from "~/lib/logo.png";

const Header = () => (
  <header className="sticky top-0 bg-white text-neutral-800 dark:bg-neutral-800 dark:text-neutral-200 z-50">
    <div className="p-2 max-w-screen-lg mx-auto flex">
      <Link
        to={"/"}
        className="h-12 rounded p-2 flex hover:bg-neutral-100 items-center gap-2 font-semibold"
      >
        <img src={logo} alt="AccSaber" className="h-8 aspect-square" />
      </Link>
    </div>
  </header>
);

export default Header;
