import type { Page } from "@/server/types";
import NotFound from "@/server/pages/_404";
import { getRecettes } from "@/server/recettes";
import { mdxComponents } from "@/server/utils";

export default async ({ params }: Page) => {
  const recettes = await getRecettes();

  const recette = recettes.find((r) => r.slugs === params.slugs);

  if (!recette) return <NotFound />;

  return (
    <div>
      <recette.component components={mdxComponents} />
    </div>
  );
};
