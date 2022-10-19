// DO NOT EDIT. This file is generated by fresh.
// This file SHOULD be checked into source version control.
// This file is automatically updated during development when running `dev.ts`.

import config from "./deno.json" assert { type: "json" };
import * as $0 from "./routes/_404.tsx";
import * as $1 from "./routes/index.tsx";
import * as $2 from "./routes/leaderboards/[category].tsx";
import * as $3 from "./routes/leaderboards/index.tsx";
import * as $4 from "./routes/profile/[userId]/[category]/index.tsx";
import * as $5 from "./routes/profile/[userId]/[category]/scores.tsx";
import * as $$0 from "./islands/Header.tsx";
import * as $$1 from "./islands/PageHeader.tsx";

const manifest = {
  routes: {
    "./routes/_404.tsx": $0,
    "./routes/index.tsx": $1,
    "./routes/leaderboards/[category].tsx": $2,
    "./routes/leaderboards/index.tsx": $3,
    "./routes/profile/[userId]/[category]/index.tsx": $4,
    "./routes/profile/[userId]/[category]/scores.tsx": $5,
  },
  islands: {
    "./islands/Header.tsx": $$0,
    "./islands/PageHeader.tsx": $$1,
  },
  baseUrl: import.meta.url,
  config,
};

export default manifest;
