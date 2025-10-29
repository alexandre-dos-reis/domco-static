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
      <section>
        <h2>Catégories 🏷️</h2>{" "}
        <ul class="list-none flex flex-wrap">
          {(await getStaticPaths()).map(({ params: { category: cat } }) => (
            <li class="list-none bg-gray-300 py-[2px] px-2 m-1 rounded-lg">
              <Link class="text-gray-800 text-sm" href={join("/blog", cat)}>
                {cat === "" ? "Toutes" : ucFirst(cat)}
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <section>
        <h2>30 Publications 📃</h2>{" "}
        <ul class="list-none">
          {Object.keys(router.routes).map((route) => (
            <li class="flex gap-x-10">
              <time class="text-gray-500 whitespace-nowrap">14 Jun 2021</time>
              <Link href={join("/blog", params.category, route)}>{route}</Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};
