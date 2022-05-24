import { Link, useLocation } from "@remix-run/react";
import type { ReactNode } from "react";
import { createRef, useEffect, useState } from "react";
import logo from "~/lib/logo.png";

const PageHeader: React.FC<{
  image?: string;
  hideTitleUntilScrolled?: boolean;
  navigation?: {
    label: string;
    href: string;
    isCurrent?: boolean;
  }[];
  actionButton?: ReactNode;
}> = ({
  children,
  image,
  hideTitleUntilScrolled,
  navigation,
  actionButton,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const scrollProbe = createRef<HTMLDivElement>();

  const route = useLocation();

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
          "sticky top-0",
          "bg-white text-neutral-800 dark:bg-neutral-800 dark:text-neutral-200",
          "transition-all",
          hideTitleUntilScrolled ? "-mb-16" : "",
          hideTitleUntilScrolled && !scrolled
            ? "bg-opacity-0 dark:bg-opacity-0"
            : "shadow",
        ].join(" ")}
      >
        <div className="flex mx-auto max-w-screen-lg px-4 gap-4 items-center">
          <Link
            to={"/"}
            className={[
              "w-12 h-12 rounded-full aspect-square p-2 flex ",
              "hover:bg-black/5 dark:hover:bg-black/10 items-center gap-2 font-semibold transition-all",
              !scrolled ? "-mr-16 opacity-0 pointer-events-none" : "-mr-2",
            ].join(" ")}
          >
            <img src={logo} alt="AccSaber" className="h-8 aspect-square" />
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
                  className="rounded-full h-full aspect-square"
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
                <Link
                  to={`${href}`}
                  key={href}
                  className={[
                    "text-neutral-800 dark:text-neutral-300 px-4 py-2",
                    "flex items-center",
                    "rounded hover:bg-black/5",
                    route.pathname.replace(/\/$/, "") ==
                      href.replace(/\/$/, "") || isCurrent
                      ? "bg-black/5 dark:bg-black/20"
                      : "",
                  ].join(" ")}
                >
                  {label}
                </Link>
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
