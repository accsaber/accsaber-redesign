import { ComponentChild } from "https://esm.sh/v94/preact@10.10.6/src/index.d.ts";

const PopoverMenu = ({
  children,
  visible,
}: {
  children: ComponentChild;
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
        " z-50 flex flex-col m-4 overflow-auto transform-gpu transition-all origin-top-right",
        "bg-white  dark:bg-neutral-900",
        "text-neutral-900 dark:text-neutral-100",
        visible ? "" : " pointer-events-none scale-75  opacity-0",
      ].join(" ")}
    >
      {children}
    </aside>
  </>
);

export default PopoverMenu;
