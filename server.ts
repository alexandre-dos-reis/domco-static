import { readFile } from "node:fs/promises";
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
  onNoMatch: async (req, res) => {
    res.statusCode = 404;

    if (req.headers["accept"]?.includes("text/html")) {
      try {
        const filePath = join(__dirname, "./dist/client/_404/index.html");
        const data = await readFile(filePath);

        res.setHeader("Content-Type", "text/html; charset=utf-8");
        res.end(data);
      } catch (err) {
        res.setHeader("Content-Type", "text/plain; charset=utf-8");
        res.end("404 - Not Found");
      }

      return; // Make sure we don't fall through
    }

    // For non-HTML requests
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.end("404 - Not Found");
  },
});

console.log(`Server listening on http://localhost:3000`);

createServer((req, res) => {
  if (req.headers["fx-request"]) {
    req.url = join(FRAGMENT_PREFIX, String(req.url));
  }
  return serveAssets(req, res);
}).listen(3000);
