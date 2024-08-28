import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
import path from "path";
import { installGlobals } from "@remix-run/node";
import { createRoutesFromFolders } from "@remix-run/v1-route-convention";

installGlobals();

export default defineConfig({
  plugins: [
    remix({
      ignoredRouteFiles: ["**/.*"],
      routes(defineRoutes) {
        // uses the v1 convention, works in v1.15+ and v2
        return createRoutesFromFolders(defineRoutes);
      },
    }),
  ],
  resolve: {
    alias: {
      $gql: path.resolve(__dirname, "./app/__generated__/gql"),
      "next/link": path.resolve(__dirname, "./app/components/NextLink"),
      "@": path.resolve(__dirname, "./app/components/"),
      "boring-avatars": path.resolve(
        __dirname,
        "./app/components/BoringAvatar"
      ),
      $interfaces: path.resolve(__dirname, "./app/lib/interfaces/"),
      "~icons": path.resolve(__dirname, "./public/icons/"),
      "~": path.resolve(__dirname, "./app/"),
    },
  },
});
