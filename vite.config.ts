import { domco } from "domco";
import { defineConfig } from "vite";
import mdx from "@mdx-js/rollup";
import compression from "vite-plugin-compression2";
import tsconfig from "./tsconfig.json";
import rehypePlugins from "./rehypePlugins";
import remarkPlugins from "./remarkPlugins";

export default defineConfig({
  plugins: [
    mdx({
      jsxImportSource: tsconfig.compilerOptions.jsxImportSource,
      rehypePlugins,
      remarkPlugins,
    }),
    domco(),
    compression({ algorithms: ["brotli", "gzip"] }),
  ],
});
