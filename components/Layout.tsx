import { Head } from "https://deno.land/x/fresh@1.1.0/src/runtime/head.ts";
import { FunctionComponent } from "https://esm.sh/v94/preact@10.10.6/src/index.d.ts";
import Header from "../islands/Header.tsx";
import NavLink, { CurrentRouteContext } from "./NavLink.tsx";

const Layout: FunctionComponent<{
  currentRoute?: string;
  title?: string;
}> = ({ children, currentRoute, title }) => {
  return (
    <CurrentRouteContext.Provider value={currentRoute}>
      <>
        <Header />
        <Head>
          <title>{title && `${title} - `}AccSaber</title>
          <link rel="stylesheet" href="/table.css" />
        </Head>
        <div className="bg-white dark:bg-neutral-900">{children}</div>
      </>
    </CurrentRouteContext.Provider>
  );
};

export default Layout;
