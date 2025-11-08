import z from "zod";
import type { MdxModule } from "./types";

const recetteFrontmatterSchema = z.object({
  title: z.string(),
  sort: z.number().optional(),
  draft: z.boolean().default(false),
  nav: z.string().optional(),
});

export type RecetteFrontmatter = z.infer<typeof recetteFrontmatterSchema>;

export type Item = {
  path: string;
  slugs: string;
  component: MdxModule["default"];
  frontmatter: RecetteFrontmatter;
};

export const getRecettes = async () =>
  (
    await Promise.all(
      Object.entries(
        import.meta.glob<MdxModule>("/server/content/recettes/**/*.mdx", {
          eager: true,
        }),
      ).map(async ([path, rawModule]) => {
        const frontmatter = z.parse(
          recetteFrontmatterSchema,
          rawModule.frontmatter,
        );

        if (import.meta.env.PROD && frontmatter.draft) return null!;

        const item: Item = {
          frontmatter,
          path,
          component: rawModule.default,
          slugs: path.replace(
            /^\/server\/content\/recettes\/|\/index\.mdx$|\.mdx$/g,
            "",
          ),
        };

        return item;
      }),
    )
  ).filter(Boolean);

export type Node = Item & {
  prefix: string;
  children: (Node | Item)[];
};

const buildRecettesTree = (list: Item[] | Node[]): Node[] => {
  // Gather all folder prefixes that have an index.mdx file
  const allPrefixes = new Set(
    list
      .filter((r) => r.path.endsWith("/index.mdx"))
      .map((r) => r.path.replace("/index.mdx", "")),
  );

  // Recursive function to build a folder node
  const buildTree = (prefix: string): Node => {
    const indexPath = `${prefix}/index.mdx`;
    const indexItem = list.find((x) => x.path === indexPath);

    // Direct .mdx children (not nested deeper)
    const directChildren = list.filter((x) => {
      if (!x.path.startsWith(prefix + "/")) return false;
      if (x.path === indexPath) return false;
      const relative = x.path.slice(prefix.length + 1);
      return !relative.includes("/"); // only one-level deep files
    });

    // Subfolder prefixes directly under this prefix
    const subPrefixes = Array.from(allPrefixes).filter((p) => {
      if (!p.startsWith(prefix + "/")) return false;
      const relative = p.slice(prefix.length + 1);
      return !relative.includes("/"); // direct child folder
    });

    // Recursively build subtrees
    const children = [
      ...directChildren.filter((c) => !c.path.endsWith("index.mdx")),
      ...subPrefixes.map((subPrefix) => buildTree(subPrefix)),
    ];

    return {
      ...indexItem!,
      path: indexPath,
      prefix,
      children,
    };
  };

  // Top-level folders (index.mdx not nested inside another index folder)
  const topLevelPrefixes = Array.from(allPrefixes).filter(
    (p) =>
      !Array.from(allPrefixes).some(
        (other) => p !== other && p.startsWith(other + "/"),
      ),
  );

  // Build full tree from top-level down
  return topLevelPrefixes.map((prefix) => buildTree(prefix));
};

export const getRecettesTree = async (list?: Node[] | Item[]) =>
  buildRecettesTree(list ?? (await getRecettes()));
