import { readFile } from "node:fs";
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
  onNoMatch: (req, res) => {
    res.statusCode = 404;

    if (req.headers["accept"]?.startsWith("text/html")) {
      const filePath = join(__dirname, "./dist/client/_404/index.html");

      readFile(filePath, (err, data) => {
        if (err) {
          res.setHeader("Content-Type", "text/plain; charset=utf-8");
          res.end("404 - Not Found");
          return;
        }

        res.setHeader("Content-Type", "text/html; charset=utf-8");
        res.end(data);
        return;
      });
      return;
    }
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
