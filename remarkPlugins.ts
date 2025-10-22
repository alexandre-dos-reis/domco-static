import type { Options } from "@mdx-js/rollup";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import remarkGfm from "remark-gfm";

export default [
  remarkFrontmatter,
  remarkMdxFrontmatter,
  remarkGfm,
] as Options["remarkPlugins"];
