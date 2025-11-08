import type { Page } from "@/server/types";
import NotFound from "@/server/pages/_404";
import { getRecettesTree, getRecettes } from "@/server/recettes";
import { mdxComponents } from "@/server/utils";

import { tags as mdxTags } from "client:script/mdx";
import { setPageContext } from "@/server/context";
import { NodeTree } from "@/server/components/NodeTree";

export default async ({ params }: Page) => {
  const recettes = await getRecettes();

  const recette = recettes.find((r) => r.slugs === params.slugs);

  if (!recette) return <NotFound />;

  const children = recettes.filter((r) => r.slugs.startsWith(recette.slugs));

  const hasChildren =
    // remove itself
    children.filter((r) => r.slugs !== recette.slugs).length > 0 &&
    children.length > 0;

  setPageContext({
    title: recette.frontmatter.title,
    headTags: [mdxTags],
  });

  return (
    <>
      <div class="flex justify-center mb-5">
        <h1
          class="border border-gray-700 rounded px-5 py-3 bg-slate-900 shadow-xl/30"
          style={`view-transition-name: ${recette.slugs.replaceAll("/", "-")};`}
        >
          {recette.frontmatter.title}
        </h1>
      </div>
      {hasChildren && (
        <NodeTree disableRoot nodes={await getRecettesTree(children)} />
      )}
      <div class="mdx">
        <recette.component components={mdxComponents} />
      </div>
    </>
  );
};
