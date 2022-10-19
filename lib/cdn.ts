interface ResizeProps {
  // deno-lint-ignore no-explicit-any
  [key: string]: any;
  url: string | URL;
  type: string;
  width: number;
  height: number;
  top: number;
  left: number;
}
export const resize = (params: Partial<ResizeProps>) => {
  const u = new URL(`https://imaginary.accsaber.com/resize`);
  for (const i in params) {
    u.searchParams.set(i, params[i].toString());
  }

  return u.toString();
};
