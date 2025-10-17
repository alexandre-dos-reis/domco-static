import app from "./dist/server/app.js";
import { nodeListener } from "domco/listener";
import { createServer } from "node:http";
import sirv from "sirv";

const assets = sirv("dist/client", {
  dev: false,
  gzip: true,
  brotli: true,
  etag: true,
  setHeaders: (res, pathname) => {
    if (pathname.startsWith("/_immutable/")) {
      res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
    }
  },
});

console.log(`Server listening on http://localhost:3000`);

createServer((req, res) =>
  // first, look for a static asset
  assets(req, res, () =>
    // fallthrough to the fetch handler if static asset is not found
    nodeListener(app.fetch)(req, res),
  ),
).listen(3000);
