/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  ignoredRouteFiles: ["**/.*"],
  serverDependenciesToBundle: ["chartjs-adapter-luxon"],

  future: {
    unstable_postcss: true,
  },
};
