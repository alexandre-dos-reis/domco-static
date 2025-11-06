import type { JSX } from "hono/jsx/jsx-runtime";
import z from "zod";

import { type TableOfContentsEntry } from "@altano/remark-mdx-toc-with-slugs";

const frontmatterSchema = z.object({
  title: z.string(),
  date: z.string().optional(),
  draft: z.boolean().default(false),
});

export type Frontmatter = z.infer<typeof frontmatterSchema>;

type MdxModule = {
  frontmatter: Record<string, unknown>;
  toc: Array<TableOfContentsEntry>;
  default: (p: {
    components: Record<string, (props: any) => JSX.Element>;
  }) => JSX.Element;
};

export const getMdxArticle = async (category?: string, article?: string) => {
  if (!category || !article) return undefined;

  return (await import(
    `./content/${category}/${article}/index.mdx`
  )) as MdxModule;
};

export const getArticles = async () => {
  return (
    await Promise.all(
      Object.entries(
        import.meta.glob<MdxModule["frontmatter"]>(
          "/server/content/**/index.mdx",
          {
            import: "frontmatter",
            eager: true,
          },
        ),
      ).map(async ([entry, rawFrontmatter]) => {
        const frontmatter = z.parse(frontmatterSchema, rawFrontmatter);

        if (import.meta.env.PROD && frontmatter.draft) {
          return null!;
        }

        const categoryAndArticle = entry.replace(
          /^\/server\/content\/|\/index\.mdx$/g,
          "",
        );

        const [category, article] = categoryAndArticle.split("/");

        const mdxArticle = await getMdxArticle(category, article);

        if (!mdxArticle) {
          return null!;
        }

        return {
          frontmatter,
          toc: mdxArticle.toc,
          component: mdxArticle.default,
          category: category || "",
          article: article || "",
        };
      }),
    )
  ).filter(Boolean);
};

export const getImageArticle = async (category?: string, article?: string) => {
  if (!category || !article) return undefined;
  return (
    (await import(`./content/${category}/${article}/head.jpg`)) as {
      default: string;
    }
  )?.default;
};
