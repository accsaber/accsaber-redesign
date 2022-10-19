import { Handlers } from "https://deno.land/x/fresh@1.1.0/server.ts";

export const handler: Handlers = {
  GET(req) {
    return Response.redirect(new URL("overall", req.url + "/"), 301);
  },
};
