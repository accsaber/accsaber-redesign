/// Proxy for next/link

import { Link } from "@remix-run/react";
import { RemixLinkProps } from "@remix-run/react/dist/components";

type Rename<T, K extends keyof T, N extends string> = Pick<
  T,
  Exclude<keyof T, K>
> & { [P in N]: T[K] };
type NextLinkProps = Rename<RemixLinkProps, "to", "href">;

export default function NextLink(props: NextLinkProps) {
  // eslint-disable-next-line jsx-a11y/anchor-has-content

  // @ts-expect-error Typescript Parsing isn't deep enough to see what we're doing here
  const linkProps: RemixLinkProps = Object.fromEntries(
    Object.entries(props).map(([k, v]) => [k == "href" ? "to" : k, v])
  );

  return <Link {...linkProps} />;
}
