import { getArticles, getImageArticle } from "@/server/articles";
import type { Page } from "@/server/types";
import NotFound from "@/server/pages/_404";
import { ActionPill } from "@/server/components/ActionPill";
import { Frame } from "@/server/components/Frame";
import { setPageContext } from "@/server/context";
import { tags } from "client:script/mdx";
import { Link } from "@/server/components/Link";

export default async ({ params }: Page) => {
  const articles = await getArticles();

  const article = articles.find(
    (a) => a.article === params.article && a.category === params.category,
  );

  if (!article) {
    return <NotFound />;
  }

  setPageContext({
    title: article.frontmatter.title,
    headTags: [tags],
  });

  const headImgSrc = getImageArticle(params.category, params.article);

  return (
    <>
      <section class="relative flex justify-center items-center h-84 md:h-120 mb-4">
        <div class="p-2 z-40">
          <div class="w-full text-center text-gray-300 text-sm md:text-xl mb-4">
            Publié le {article.frontmatter.date}
          </div>
          <h1 class="w-full text-center px-4">{article.frontmatter.title}</h1>
        </div>
        <img
          src={headImgSrc}
          alt={article.frontmatter.title}
          class="absolute top-0 h-full w-full object-cover opacity-40 shadow-xl/30 rounded-lg"
        />
      </section>
      <div class="mdx">
        <article.component components={{ AP: ActionPill, Frame, a: Link }} />
      </div>
    </>
  );
};
