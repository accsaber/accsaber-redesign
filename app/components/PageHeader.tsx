"use client";
import {
  Bars3Icon as MenuIcon,
  XMarkIcon as XIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";
import type { ReactNode } from "react";
import React, { createRef, useEffect, useState } from "react";
import logo from "~/images/logo.webp";
import PopoverMenu from "./Popover";
import CDNImage from "@/CDNImage";
import { NavLink } from "@remix-run/react";
import LoadingSpinner from "./LoadingSpinner";

const PageHeader: React.FC<{
  image?: string | React.ReactElement;
  transparent?: boolean;
  hideTitleUntilScrolled?: boolean;
  navigation?: {
    label: React.ReactNode | string;
    href: string;
    isCurrent?: boolean;
  }[];
  iconRounded?: boolean;
  actionButton?: ReactNode;
  children?: React.ReactNode;
  cdn?: boolean;
  miniblur?: string;
}> = ({
  children,
  image,
  transparent,
  hideTitleUntilScrolled,
  navigation,
  actionButton,
  iconRounded,
  miniblur,
  cdn = true,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const scrollProbe = createRef<HTMLDivElement>();
  const [menuVisible, setMenu] = useState(false);

  const Image = cdn ? CDNImage : "img";

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
          "sticky top-0 ",
          "bg-white text-neutral-800 dark:bg-neutral-800 dark:text-neutral-200",
          "transition-colors w-full lg",
          transparent ? "-mb-16" : "",
          scrolled ? " z-40" : "z-10",
          transparent && !scrolled
            ? "bg-opacity-0 dark:bg-opacity-0"
            : "shadow",
        ].join(" ")}
      >
        <div className="flex items-center max-w-screen-lg gap-4 px-4 mx-auto">
          <Link
            prefetch={"intent"}
            href={"/"}
            className={[
              "w-12 h-12 aspect-square p-2 flex ",
              "hover:bg-black/5 dark:hover:bg-black/10 items-center gap-2 font-semibold transition-all",
              !(scrolled || hideTitleUntilScrolled)
                ? "-mr-16 pointer-events-none"
                : "-mr-2",
              !scrolled ? "opacity-0" : "",
            ].join(" ")}
            aria-label="Home"
          >
            <img
              src={logo}
              alt="Home"
              aria-hidden={!scrolled}
              aria-label="Go Home"
              className="h-8 aspect-square"
              width={32}
              height={32}
            />
          </Link>
          <div
            className={`transition-all ${
              scrolled || hideTitleUntilScrolled
                ? "w-px h-10 bg-black/10 dark:bg-white/5 mx-0 -ml-1"
                : "-mx-2"
            } ${hideTitleUntilScrolled && !scrolled ? "opacity-0" : ""}`}
          />
          <div
            className={[
              "flex gap-2 items-center py-4 transition-opacity font-semibold",
              hideTitleUntilScrolled && !scrolled ? "opacity-0" : "",
            ].join(" ")}
          >
            {image && (
              <div className="h-8">
                {typeof image == "string" ? (
                  <Image
                    src={image}
                    alt=""
                    className={`${
                      iconRounded ?? true ? "rounded-full" : "rounded"
                    } h-full aspect-square`}
                    width={32}
                    height={32}
                    style={{
                      background: miniblur
                        ? `url(${miniblur}) center/cover`
                        : undefined,
                    }}
                  />
                ) : (
                  image
                )}
              </div>
            )}
            <div>{children}</div>
          </div>
          {navigation ? (
            <nav className="flex-1 hidden gap-2 md:flex">
              {navigation.map(({ label, href, isCurrent }) => (
                <NavLink
                  prefetch={"intent"}
                  to={`${href}`}
                  key={href}
                  className={({ isPending }) =>
                    [
                      "pageNav flex items-center justify-center relative",
                      isCurrent || isPending ? "active" : "",
                    ].join(" ")
                  }
                >
                  {({ isPending }) => (
                    <>
                      {isPending && <LoadingSpinner className="h-6 absolute" />}{" "}
                      <span className={isPending ? "opacity-0 " : ""}>
                        {label}
                      </span>
                    </>
                  )}
                </NavLink>
              ))}
            </nav>
          ) : (
            <div className="flex-1" />
          )}
          {actionButton ? (
            <div className={navigation?.length ? "hidden md:flex" : "flex"}>
              {actionButton}
            </div>
          ) : (
            ""
          )}
          <div className="flex-1 md:hidden" />
          {navigation?.length && (
            <button
              onClick={() => setMenu(true)}
              className="p-3 -mr-2 headerNav md:hidden"
              aria-label="Page Menu"
            >
              <MenuIcon className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
      <PopoverMenu visible={menuVisible}>
        <div className="flex items-start p-2">
          <div
            className={[
              "flex flex-1 gap-2 items-center p-2 transition-opacity font-semibold",
              transparent && !scrolled ? "opacity-0" : "",
            ].join(" ")}
          >
            {image ? (
              <div className="h-8">
                {typeof image == "string" ? (
                  <Image
                    src={image}
                    alt=""
                    className={`${
                      iconRounded ?? true ? "rounded-full" : "rounded"
                    } h-full aspect-square`}
                    width={32}
                    height={32}
                  />
                ) : (
                  image
                )}
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
              <Link
                prefetch={"none"}
                href={`${href}`}
                key={href}
                className={["pageNav"].join(" ")}
                onClick={() => setMenu(false)}
              >
                {label}
              </Link>
            ))}
          </nav>
        ) : (
          <div className="flex-1" />
        )}

        {actionButton ? (
          <div className="flex justify-end p-2" onClick={() => setMenu(false)}>
            {actionButton}
          </div>
        ) : (
          ""
        )}
      </PopoverMenu>
    </>
  );
};

export default PageHeader;
