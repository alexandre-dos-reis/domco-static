import type { Options } from "@mdx-js/rollup";
import frontmatter from "remark-frontmatter";
import mdxFrontmatter from "remark-mdx-frontmatter";
import gfm from "remark-gfm";
import sectionize from "remark-sectionize";
import importMedia from "remark-mdx-images";
import mdxTocWithSlugs from "@altano/remark-mdx-toc-with-slugs";

export default [
  frontmatter,
  mdxFrontmatter,
  gfm,
  importMedia,
  sectionize,
  mdxTocWithSlugs,
] as Options["remarkPlugins"];
