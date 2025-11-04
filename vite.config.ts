import { domco } from "domco";
import { defineConfig } from "vite";
import mdx from "@mdx-js/rollup";
import compression from "vite-plugin-compression2";
import tsconfig from "./tsconfig.json";
import rehypePlugins from "./rehypePlugins";
import remarkPlugins from "./remarkPlugins";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  server: {
    watch: { usePolling: true },
  },
  plugins: [
    domco(),
    tailwindcss(),
    mdx({
      jsxImportSource: tsconfig.compilerOptions.jsxImportSource,
      rehypePlugins,
      remarkPlugins,
    }),
    compression({
      algorithms: ["brotli", "gzip"],
      include: new RegExp(
        /\.(html|xml|css|json|js|mjs|svg|yaml|yml|toml|png|ttf|mp4|jpg)$/,
      ),
    }),
  ],
});
