import z from "zod";
import type { MdxModule } from "./types";

const procedurefrontmatterSchema = z.object({
  title: z.string(),
  date: z.string().optional(),
  draft: z.boolean().default(false),
});

export type ProcedureFrontmatter = z.infer<typeof procedurefrontmatterSchema>;

export const getMdxArticle = async (category?: string, article?: string) => {
  if (!category || !article) return undefined;

  return (await import(
    `./content/procedures/${category}/${article}/index.mdx`
  )) as MdxModule;
};

export const getArticles = async () => {
  return (
    await Promise.all(
      Object.entries(
        import.meta.glob<MdxModule["frontmatter"]>(
          "/server/content/procedures/**/index.mdx",
          {
            import: "frontmatter",
            eager: true,
          },
        ),
      ).map(async ([entry, rawFrontmatter]) => {
        const frontmatter = z.parse(procedurefrontmatterSchema, rawFrontmatter);

        if (import.meta.env.PROD && frontmatter.draft) {
          return null!;
        }

        const categoryAndArticle = entry.replace(
          /^\/server\/content\/procedures\/|\/index\.mdx$/g,
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
    (await import(`./content/procedures/${category}/${article}/head.jpg`)) as {
      default: string;
    }
  )?.default;
};
