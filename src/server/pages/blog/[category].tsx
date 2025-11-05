import { getArticles } from "@/server/articles";
import { Link } from "@/server/components/Link";
import { setPageContext } from "@/server/context";
import type { Page } from "@/server/types";
import { unslugify } from "@/server/utils";
import { join } from "path";

export default async ({ params }: Page) => {
  const category = params.category ? unslugify(params.category) : undefined;

  setPageContext({ title: category || "Blog" });

  let articles = await getArticles();

  if (params.category) {
    articles = articles.filter((a) => a.category === params.category);
  }

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
                {unslugify(c.category)}
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <section>
        <h2>
          {articles.length} Publications 📃
          {category && ` pour la catégorie ${category}`}
        </h2>{" "}
        <ul class="list-none">
          {articles.map((a) => (
            <li class="flex gap-x-10">
              <time class="text-gray-500 whitespace-nowrap">
                {a.frontmatter.date}
              </time>
              <Link href={join("/blog", a.category, a.article)}>
                {a.frontmatter.title}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};
