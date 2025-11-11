import { type TableOfContentsEntry } from "@altano/remark-mdx-toc-with-slugs";
import type { JSX } from "hono/jsx/jsx-runtime";

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
