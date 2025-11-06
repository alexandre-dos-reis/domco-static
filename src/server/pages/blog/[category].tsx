import { getArticles, getImageArticle } from "@/server/articles";
import { Link } from "@/server/components/Link";
import { setPageContext } from "@/server/context";
import type { Page } from "@/server/types";
import { unslugify } from "@/server/utils";
import { join } from "path";

export default async ({ params }: Page) => {
  const category = params.category ? unslugify(params.category) : undefined;

  setPageContext({ title: category || "Blog" });

  let articles = await getArticles();

  const categories = [
    ...new Map(articles.map((a) => [a.category, a])).values(),
  ];

  if (params.category) {
    articles = articles.filter((a) => a.category === params.category);
  }

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
            <li class="flex items-center gap-x-5 mb-3">
              <Link href={join("/blog", a.category, a.article)}>
                <img
                  style={`view-transition-name: ${a.category}-${a.article}-img;`}
                  class="w-48 h-32 rounded"
                  src={getImageArticle(a.category, a.article)}
                />
              </Link>
              <div>
                <Link
                  href={join("/blog", a.category, a.article)}
                  style={`view-transition-name: ${a.category}-${a.article}-title;`}
                >
                  {a.frontmatter.title}
                </Link>
                <div>
                  <time class="text-gray-500 whitespace-nowrap">
                    {a.frontmatter.date}
                  </time>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};
