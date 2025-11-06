import type { JSX } from "hono/jsx/jsx-runtime";
import z from "zod";

import { type TableOfContentsEntry } from "@altano/remark-mdx-toc-with-slugs";

const frontmatterSchema = z.object({
  title: z.string(),
  date: z.string().optional(),
  draft: z.boolean().default(false),
});

export type Frontmatter = z.infer<typeof frontmatterSchema>;

export const getArticles = async () =>
  (
    await Promise.all(
      Object.entries(import.meta.glob("/server/content/**/*.mdx")).map(
        async ([entry, rawModule]) => {
          const categoryAndArticle = entry.replace(
            /^\/server\/content\/|\/index\.mdx$/g,
            "",
          );
          const module = (await rawModule()) as {
            frontmatter: Record<string, unknown>;
            toc: Array<TableOfContentsEntry>;
            default: (p: {
              components: Record<string, (props: any) => JSX.Element>;
            }) => JSX.Element;
          };

          const frontmatter = z.parse(frontmatterSchema, module.frontmatter);

          if (!import.meta.env.DEV || frontmatter.draft) {
            return null!;
          }

          const [category, article] = categoryAndArticle.split("/");

          return {
            toc: module.toc,
            frontmatter,
            component: module.default,
            category: category || "",
            article: article || "",
          };
        },
      ),
    )
  ).filter(Boolean);

export const getImageArticle = (category?: string, article?: string) => {
  if (!category || !article) return undefined;
  return (
    import.meta.glob("/server/content/**/head.jpg", {
      eager: true,
    })[`/server/content/${category}/${article}/head.jpg`] as {
      default: string;
    }
  ).default;
};
