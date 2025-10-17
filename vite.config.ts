import { domco } from "domco";
import { defineConfig } from "vite";

import viteCompression from "vite-plugin-compression";

export default defineConfig({
  build: {
    rollupOptions: {
      onwarn: (entry, next) => {
        if (
          entry.loc?.file &&
          /htmx\.esm\.js$/.test(entry.loc.file) &&
          /Use of eval in/.test(entry.message)
        )
          return;
        return next(entry);
      },
    },
  },
  plugins: [
    domco(),
    viteCompression({ algorithm: "gzip" }),
    viteCompression({ algorithm: "brotliCompress" }),
  ],
});
