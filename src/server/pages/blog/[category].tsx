import { Link } from "@/server/components/Link";
import type { GetStaticPaths, Page, PageConfig } from "@/server/types";
import { getRouter, ucFirst } from "@/server/utils";
import { readdir } from "fs/promises";
import { join } from "path";

export const config = { title: "Blog" } satisfies PageConfig;

export const getStaticPaths = (async () => {
  const categories = (
    await readdir("./src/server/pages/blog", { recursive: false })
  ).filter((r) => !r.endsWith(".tsx"));

  return [
    { params: { category: "" }, title: "" },
    ...categories.map((cat) => ({ params: { category: cat }, title: cat })),
  ];
}) satisfies GetStaticPaths;

export default async ({ params }: Page<typeof getStaticPaths>) => {
  const router = getRouter(join("blog", params.category));
  return (
    <div>
      <ul>
        <li>
          <Link href={`/blog`}>Tout</Link>
        </li>
        {(await getStaticPaths()).map(({ params: { category: cat } }) => (
          <li>
            <Link href={`/blog/${cat}`}>{ucFirst(cat)}</Link>
          </li>
        ))}
      </ul>
      <ul>
        {Object.keys(router.routes).map((route) => (
          <li>
            <Link href={join("/blog", params.category, route)}>{route}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
