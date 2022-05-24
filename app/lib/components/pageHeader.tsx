import { createRef, useEffect, useState } from "react";

const PageHeader: React.FC<{
  image?: string;
  hideTitleUntilScrolled?: boolean;
}> = ({ children, image, hideTitleUntilScrolled }) => {
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
            : " shadow",
        ].join(" ")}
      >
        <div className="flex mx-auto max-w-screen-lg p-4">
          <div
            className={[
              "flex flex-1 gap-2 items-center h-8 transition-opacity",
              hideTitleUntilScrolled && !scrolled ? "opacity-0" : "",
            ].join(" ")}
          >
            {image ? (
              <div className="h-full">
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
          <nav></nav>
        </div>
      </div>
    </>
  );
};

export default PageHeader;
