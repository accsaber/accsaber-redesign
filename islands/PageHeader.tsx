import {
  XMarkIcon as XIcon,
  Bars3Icon as MenuIcon,
} from "https://esm.sh/@heroicons/react@2.0.10/20/solid?alias=react:preact/compat";
import NavLink from "$components/NavLink.tsx";
import { useEffect, useState } from "preact/hooks";
import PopoverMenu from "$components/PopoverMenu.tsx";
import { ComponentChild, createRef, FunctionComponent } from "preact";
import Img, { Size } from "$components/Image.tsx";

const logo = "/logo.webp";

const PageHeader: FunctionComponent<{
  image?: string;
  hideTitleUntilScrolled?: boolean;
  navigation?: {
    label: string;
    href: string;
    isCurrent?: boolean;
  }[];
  iconRounded?: boolean;
  actionButton?: ComponentChild;
}> = ({
  children,
  image,
  hideTitleUntilScrolled,
  navigation,
  actionButton,
  iconRounded,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const scrollProbe = createRef<HTMLDivElement>();
  const [menuVisible, setMenu] = useState(false);

  useEffect(() => {
    if (!scrollProbe.current) return;
    const observer = new IntersectionObserver(([probe]) => {
      setScrolled(!probe.isIntersecting);
    });

    observer.observe(scrollProbe.current);

    return () => observer.disconnect();
  }, [scrolled, scrollProbe]);

  return (
    <>
      <div ref={scrollProbe} className="h-px -mb-px" />
      <div
        className={[
          "sticky top-0 z-40",
          "bg-white text-neutral-800 dark:bg-neutral-800 dark:text-neutral-200",
          "transition-all",
          hideTitleUntilScrolled ? "-mb-16" : "",
          hideTitleUntilScrolled && !scrolled
            ? "bg-opacity-0 dark:bg-opacity-0"
            : "shadow",
        ].join(" ")}
      >
        <div className="flex items-center max-w-screen-lg gap-4 px-4 mx-auto">
          <a
            href={"/"}
            className={[
              "w-12 h-12 aspect-square p-2 flex ",
              "hover:bg-black/5 dark:hover:bg-black/10 items-center gap-2 font-semibold transition-all",
              !scrolled ? "-mr-16 opacity-0 pointer-events-none" : "-mr-2",
            ].join(" ")}
            aria-label="Home"
          >
            <img
              src={logo}
              alt="Home"
              aria-hidden={!scrolled}
              aria-label="Go Home"
              className="w-8 h-8"
            />
          </a>
          <div
            className={`transition-all ${
              scrolled
                ? `w-px h-10 bg-black/10 dark:bg-white/5 mx-0 -ml-1`
                : "-mx-2"
            }`}
          ></div>
          <div
            className={[
              "flex gap-2 items-center py-4 transition-opacity font-semibold",
              hideTitleUntilScrolled && !scrolled ? "opacity-0" : "",
            ].join(" ")}
          >
            {image ? (
              <div className="h-8">
                <Img
                  src={image}
                  alt=""
                  className={`${
                    iconRounded ?? true ? "rounded-full" : ""
                  } h-full`}
                  size={Size.THUMBNAIL}
                />
              </div>
            ) : (
              ""
            )}
            <div>{children}</div>
          </div>
          {navigation ? (
            <nav className="flex-1 hidden gap-2 md:flex">
              {navigation.map(({ label, href }) => (
                <NavLink to={`${href}`} key={href} className="pageNav">
                  {label}
                </NavLink>
              ))}
            </nav>
          ) : (
            <div className="flex-1" />
          )}
          {actionButton ? (
            <div className="hidden md:flex">{actionButton}</div>
          ) : (
            ""
          )}
          <div className="flex-1 md:hidden" />
          <button
            onClick={() => setMenu(true)}
            className="p-3 -mr-2 headerNav md:hidden"
          >
            <MenuIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
      <PopoverMenu visible={menuVisible}>
        <div className="flex items-start p-2">
          <div
            className={[
              "flex flex-1 gap-2 items-center p-2 transition-opacity font-semibold",
              hideTitleUntilScrolled && !scrolled ? "opacity-0" : "",
            ].join(" ")}
          >
            {image ? (
              <div className="h-8">
                <img
                  src={image}
                  alt=""
                  className={`${
                    iconRounded ?? true ? "rounded-full" : ""
                  } h-full aspect-square`}
                />
              </div>
            ) : (
              ""
            )}
            <div>{children}</div>
          </div>
          <button
            className="p-2 rounded-full headerNav"
            aria-label="close"
            onClick={() => setMenu(false)}
          >
            <XIcon className="w-4 h-4" />
          </button>
        </div>
        {navigation ? (
          <nav className="flex flex-col flex-1 gap-2 p-2">
            {navigation.map(({ label, href }) => (
              <NavLink
                to={`${href}`}
                key={href}
                className="pageNav"
                onClick={() => setMenu(false)}
              >
                {label}
              </NavLink>
            ))}
          </nav>
        ) : (
          <div className="flex-1" />
        )}
        {actionButton && (
          <div className="flex justify-end p-2" onClick={() => setMenu(false)}>
            {actionButton}
          </div>
        )}
      </PopoverMenu>
    </>
  );
};

export default PageHeader;
