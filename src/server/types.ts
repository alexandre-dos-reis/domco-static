import type { JSX } from "hono/jsx/jsx-runtime";
import { type TableOfContentsEntry } from "@altano/remark-mdx-toc-with-slugs";

export type Page = {
  params: Record<string, string>;
};

export type MdxModule = {
  frontmatter: Record<string, unknown>;
  toc: Array<TableOfContentsEntry>;
  default: (p: {
    components: Record<string, (props: any) => JSX.Element>;
  }) => JSX.Element;
};
