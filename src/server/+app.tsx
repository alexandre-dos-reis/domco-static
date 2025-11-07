import { Layout } from "./Layout";
import { sendHtml } from "./utils";
import { join } from "path";
import { pageContextInit } from "./context";
import { getArticles } from "./procedures";
import NotFoundPage from "./pages/_404";
import type { Page } from "./types";

export default {
  fetch: (req: Request) => {
    return pageContextInit(async () => {
      let { pathname } = new URL(req.url);

      const router = new Bun.FileSystemRouter({
        style: "nextjs",
        fileExtensions: [".tsx"],
        dir: `src/server/pages`,
      });

      const matchRoute = router.match(pathname);

      if (!matchRoute) {
        return sendHtml(
          <Layout pathname={pathname}>
            <NotFoundPage />
          </Layout>,
          { status: 404 },
        );
      }

      const getModule = import.meta.glob<(p: Page) => Promise<JSX.Element>>(
        "/server/pages/**/*.tsx",
        {
          import: "default",
        },
      )[`/server/pages/${matchRoute.src}`];

      const module = await getModule?.();

      if (!module) {
        throw new Error(`Module not found for route ${matchRoute}`);
      }

      const jsx = await module?.({ params: matchRoute.params });

      if (!jsx) {
        throw new Error(
          `Module call resolved to an error for route ${matchRoute}`,
        );
      }

      return sendHtml(<Layout pathname={pathname}>{jsx}</Layout>);
    });
  },
  prerender: async () => {
    const articles = await getArticles();
    const categories = [
      ...new Map(articles.map((a) => [a.category, a])).values(),
    ];

    return [
      "/_404",
      "/",
      "/parcours",
      "/blog",
      ...categories.map((c) => join("/blog", c.category)),
      ...articles.map((a) => join("/blog", a.category, a.article)),
    ];
  },
};
