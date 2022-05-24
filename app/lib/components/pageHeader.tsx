import { Link } from "@remix-run/react";
import { createRef, useEffect, useState } from "react";

const PageHeader: React.FC<{
  image?: string;
  hideTitleUntilScrolled?: boolean;
  navigation?: {
    label: string;
    href: string;
    isCurrent?: boolean;
  }[];
}> = ({ children, image, hideTitleUntilScrolled, navigation }) => {
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
          "sticky top-16",
          "bg-white text-neutral-800 dark:bg-neutral-800 dark:text-neutral-200",
          "border-t-[1px] dark:border-t-neutral-700 transition-all",
          hideTitleUntilScrolled ? "-mb-16" : "",
          hideTitleUntilScrolled && !scrolled
            ? "bg-opacity-0 dark:bg-opacity-0"
            : "shadow",
        ].join(" ")}
      >
        <div className="flex mx-auto max-w-screen-lg px-4 gap-4 items-center">
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
            <nav className="flex gap-2">
              {navigation.map(({ label, href, isCurrent }) => (
                <Link
                  to={`${href}`}
                  key={href}
                  className={[
                    "text-neutral-800 dark:text-neutral-300 px-4 py-2",
                    "flex items-center",
                    "rounded-full hover:bg-neutral-200 dark:hover:bg-neutral-700",
                    isCurrent ? "bg-neutral-100 dark:bg-neutral-900" : "",
                  ].join(" ")}
                >
                  {label}
                </Link>
              ))}
            </nav>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
};

export default PageHeader;
