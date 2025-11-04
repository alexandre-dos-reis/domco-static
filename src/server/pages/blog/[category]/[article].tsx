import { getArticles } from "@/server/articles";
import type { Page } from "@/server/types";
import NotFound from "@/server/pages/_404";
import { ActionPill } from "@/server/components/ActionPill";
import { Frame } from "@/server/components/Frame";
import { setPageContext } from "@/server/storages";

export default async ({ params }: Page) => {
  const article = (await getArticles()).find(
    (a) => a.article === params.article && a.category === params.category,
  );

  setPageContext({ title: article?.frontmatter.title });

  if (!article) {
    return <NotFound />;
  }

  return (
    <div>
      {JSON.stringify(article.frontmatter, null, 4)}
      <article.component components={{ AP: ActionPill, Frame }} />
    </div>
  );
};
