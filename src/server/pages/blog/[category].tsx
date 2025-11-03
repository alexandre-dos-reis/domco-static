import { getArticles } from "@/server/articles";
import { Link } from "@/server/components/Link";
import type { Page, PageConfig } from "@/server/types";
import { ucFirst } from "@/server/utils";
import { join } from "path";

export default async ({ params }: Page) => {
  const articles = await getArticles();

  const categories = [
    ...new Map(articles.map((a) => [a.category, a])).values(),
  ];

  return (
    <div>
      <section>
        <h2>Catégories 🏷️</h2>{" "}
        <ul class="list-none flex flex-wrap">
          <li class="list-none bg-gray-300 py-[2px] px-2 m-1 rounded-lg">
            <Link class="text-gray-800 text-sm" href="/blog">
              Toutes
            </Link>
          </li>
          {categories.map((c) => (
            <li class="list-none bg-gray-300 py-[2px] px-2 m-1 rounded-lg">
              <Link
                class="text-gray-800 text-sm"
                href={join("/blog", c.category)}
              >
                {ucFirst(c.category)}
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <section>
        <h2>{articles.length} Publications 📃</h2>{" "}
        <ul class="list-none">
          {(params.category
            ? articles.filter((a) => a.category === params.category)
            : articles
          ).map((a) => (
            <li class="flex gap-x-10">
              <time class="text-gray-500 whitespace-nowrap">
                {a.frontmatter.date}
              </time>
              <Link href={join("/blog", a.category, a.article)}>
                {a.article}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};
