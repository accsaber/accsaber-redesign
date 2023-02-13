import React from "react";

const PopoverMenu = ({
  children,
  visible,
}: {
  children: React.ReactNode | React.ReactNode[];
  visible: boolean;
}) => (
  <>
    <div
      className={[
        `fixed top-0 left-0 z-50 w-full h-full bg-black/50 `,
        visible ? "" : "hidden",
      ].join(" ")}
    />
    <aside
      className={[
        "fixed top-0 bottom-0 left-0 right-0 rounded-lg shadow",
        " z-50 flex flex-col m-4 overflow-auto transform-gpu origin-top-right",
        "bg-white  dark:bg-neutral-900",
        "text-neutral-900 dark:text-neutral-100",
        visible ? "transition-all" : " pointer-events-none scale-75  opacity-0",
      ].join(" ")}
    >
      {children}
    </aside>
  </>
);

export default PopoverMenu;
