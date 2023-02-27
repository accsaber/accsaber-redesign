/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  devServerBroadcastDelay: 1000,
  ignoredRouteFiles: ["**/.*"],
  server: "./server.js",
  serverBuildPath: "functions/[[path]].js",
  serverConditions: ["worker"],
  serverDependenciesToBundle: "all",
  serverMainFields: ["browser", "module", "main"],
  serverMinify: false,
  serverModuleFormat: "esm",
  serverPlatform: "neutral",
  future: {
    unstable_postcss: true,
  },
  // appDirectory: "app",
  // assetsBuildDirectory: "public/build",
  // publicPath: "/build/",
};
