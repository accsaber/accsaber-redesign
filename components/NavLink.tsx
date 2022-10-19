import { createContext } from "preact/compat";
import { type JSXInternal } from "https://esm.sh/v94/preact@10.10.6/src/jsx.d.ts";

export const CurrentRouteContext = createContext<string | undefined>(undefined);

export interface NavLinkProps
  extends JSXInternal.HTMLAttributes<HTMLAnchorElement> {
  end?: boolean;
  activeClass?: string | ((active: boolean) => string);
  routeName?: string;
  to?: string;
}
export default function NavLink(props: NavLinkProps) {
  const href = props.to ?? props.href;

  const classList: string[] =
    "rounded px-4 py-2 items-center gap-2 bg-opacity-0 bg-black hover:bg-opacity-10".split(
      " "
    );
  if (props.className) classList.push(...props.className.split(" "));

  return (
    <CurrentRouteContext.Consumer>
      {(currentRoute) => {
        const active = currentRoute && props.href && currentRoute == href;

        if (typeof props.activeClass == "function") {
          classList.push(props.activeClass(!!active));
        } else if (active) {
          classList.push("active");
        }
        return <a {...props} href={href} className={classList.join(" ")} />;
      }}
    </CurrentRouteContext.Consumer>
  );
}
