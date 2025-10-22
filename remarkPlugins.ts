import type { Options } from "@mdx-js/rollup";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import remarkGfm from "remark-gfm";

import importMedia from "remark-mdx-images";

export default [
  remarkFrontmatter,
  remarkMdxFrontmatter,
  remarkGfm,
  importMedia,
] as Options["remarkPlugins"];
