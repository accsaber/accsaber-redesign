/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  ignoredRouteFiles: ["**/.*"],
  serverDependenciesToBundle: ["chartjs-adapter-luxon"],
  postcss: true,

  future: {
    v2_errorBoundary: true,
    v2_headers: true,
    v2_normalizeFormMethod: true
  },
};
