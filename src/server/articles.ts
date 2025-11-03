import type { JSX } from "hono/jsx/jsx-runtime";
import z from "zod";

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
        async ([entry, module]) => {
          const categoryAndArticle = entry.replace(
            /^\/server\/content\/|\/index\.mdx$/g,
            "",
          );
          const mod = await module();
          const [category, article] = categoryAndArticle.split("/");

          const frontmatter = z.parse(
            frontmatterSchema,
            // @ts-expect-error
            mod.frontmatter,
          );

          if (frontmatter.draft) {
            return null!;
          }

          return {
            frontmatter,
            // @ts-expect-error
            component: mod.default as (p: {
              components: Record<string, (props: any) => JSX.Element>;
            }) => JSX.Element,
            category: category || "",
            article: article || "",
          };
        },
      ),
    )
  ).filter(Boolean);
