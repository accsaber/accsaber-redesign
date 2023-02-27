import { createCookie } from "@remix-run/cloudflare"; // or "@remix-run/cloudflare"
import ms from "ms";

export const user = createCookie("user", {
  maxAge: ms("1 month"),
});
