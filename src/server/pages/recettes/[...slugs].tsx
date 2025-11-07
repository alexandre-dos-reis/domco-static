import type { Page } from "@/server/types";
import NotFound from "@/server/pages/_404";
import { getRecettes } from "@/server/recettes";
import { mdxComponents } from "@/server/utils";

import { tags } from "client:script/mdx";
import { setPageContext } from "@/server/context";

export default async ({ params }: Page) => {
  const recettes = await getRecettes();

  const recette = recettes.find((r) => r.slugs === params.slugs);

  if (!recette) return <NotFound />;

  setPageContext({ title: recette.frontmatter.title, headTags: [tags] });

  return (
    <div class="mdx">
      <h1
        class="text-center pb-8"
        style={`view-transition-name: ${recette.slugs.replaceAll("/", "-")};`}
      >
        {recette.frontmatter.title}
      </h1>
      <recette.component components={mdxComponents} />
    </div>
  );
};
