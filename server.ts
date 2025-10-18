import { FRAGMENT_PREFIX } from "./src/server/contants.js";
import { createServer } from "node:http";
import { join } from "node:path";
import sirv from "sirv";

const serveAssets = sirv("dist/client", {
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

createServer((req, res) => {
  if (req.headers["sec-fetch-dest"] === "iframe") {
    req.url = join(FRAGMENT_PREFIX, String(req.url));
  }
  return serveAssets(req, res);
}).listen(3000);
