import { NavLink, Link } from "@remix-run/react";
import type { ReactNode } from "react";
import React, { createRef, useEffect, useState } from "react";
import logo from "~/lib/images/logo.webp";

const PageHeader: React.FC<{
  image?: string;
  hideTitleUntilScrolled?: boolean;
  navigation?: {
    label: string;
    href: string;
    isCurrent?: boolean;
  }[];
  iconRounded?: boolean;
  actionButton?: ReactNode;
  children?: React.ReactNode;
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
      <div ref={scrollProbe} />
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
          <Link
            to={"/"}
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
              className="h-8 aspect-square"
            />
          </Link>
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
          {navigation ? (
            <nav className="flex flex-1 gap-2">
              {navigation.map(({ label, href, isCurrent }) => (
                <NavLink
                  to={`${href}`}
                  key={href}
                  className={["pageNav"].join(" ")}
                >
                  {label}
                </NavLink>
              ))}
            </nav>
          ) : (
            <div className="flex-1" />
          )}
          {actionButton ? <div>{actionButton}</div> : ""}
        </div>
      </div>
    </>
  );
};

export default PageHeader;
