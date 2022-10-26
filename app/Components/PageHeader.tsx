"use client";
import { MenuIcon, XIcon } from "@heroicons/react/solid";
import Link from "next/link";
import type { ReactNode } from "react";
import React, { createRef, useEffect, useState } from "react";
import logo from "~/lib/images/logo.webp";
import PopoverMenu from "./Popover";
import Image from "next/image";

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
            href={"/"}
            className={[
              "w-12 h-12 aspect-square p-2 flex ",
              "hover:bg-black/5 dark:hover:bg-black/10 items-center gap-2 font-semibold transition-all",
              !scrolled ? "-mr-16 opacity-0 pointer-events-none" : "-mr-2",
            ].join(" ")}
            aria-label="Home"
          >
            <Image
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
                <Image
                  src={image}
                  alt=""
                  className={`${
                    iconRounded ?? true ? "rounded-full" : ""
                  } h-full aspect-square`}
                  width={32}
                  height={32}
                />
              </div>
            ) : (
              ""
            )}
            <div>{children}</div>
          </div>
          {navigation ? (
            <nav className="flex-1 hidden gap-2 md:flex">
              {navigation.map(({ label, href, isCurrent }) => (
                <Link
                  href={`${href}`}
                  key={href}
                  className={["pageNav", isCurrent ? "active" : ""].join(" ")}
                >
                  {label}
                </Link>
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
                <Image
                  src={image}
                  alt=""
                  width={32}
                  height={32}
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
              <Link
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
