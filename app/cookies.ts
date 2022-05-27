import { createCookie } from "@remix-run/node"; // or "@remix-run/cloudflare"
import ms from "ms";

export const user = createCookie("user", {
  maxAge: ms("1 month"),
});
