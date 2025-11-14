import { readFile } from "node:fs/promises";
import { createServer } from "node:http";
import { join } from "node:path";
import sirv from "sirv";

const htmlContentType = "text/html; charset=utf-8";
const plainTextContentType = "text/plain; charset=utf-8";

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
    // These are old url, redirect to new routes
    if (req.url?.startsWith("/blog")) {
      const slugs = req.url.replace("/blog", "/procedures");

      const filePath = join(__dirname, "./dist/client", slugs, "index.html");
      try {
        const data = await readFile(filePath);
        res.statusCode = 308; // Permanent redirect
        res.setHeader("Location", slugs); // Browser will redirect to new url
        res.setHeader("Content-Type", htmlContentType);
        return res.end(data);
      } catch (_err) {
        /* Fallthrough 404*/
      }
    }
    // No match Route
    res.statusCode = 404;

    if (req.headers["accept"]?.includes("text/html")) {
      try {
        const filePath = join(__dirname, "./dist/client/_404/index.html");
        const data = await readFile(filePath);

        res.setHeader("Content-Type", htmlContentType);
        res.end(data);
      } catch (_err) {
        res.setHeader("Content-Type", plainTextContentType);
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

createServer((req, res) => serveAssets(req, res)).listen(3000);
