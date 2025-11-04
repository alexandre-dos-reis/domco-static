import { Layout } from "./Layout";
import { getRouter, sendHtml } from "./utils";

import { join } from "path";
import { pageContextRun } from "./storages";
import { articles } from "./articles";
import NotFoundPage from "./pages/_404";

const fetch = (req: Request) =>
  pageContextRun(async () => {
    let { pathname } = new URL(req.url);

    const router = getRouter();

    const matchRoute = router.match(pathname);

    if (!matchRoute) {
      return sendHtml(
        <Layout pathname={pathname}>
          <NotFoundPage />
        </Layout>,
        { status: 404 },
      );
    }

    const module = import.meta.glob("/server/pages/**/*.tsx", { eager: true })[
      `/server/pages/${matchRoute.src}`
    ] as {
      default: (p: any) => Promise<JSX.Element>;
    };

    const page = await module.default({ params: matchRoute.params });

    return sendHtml(<Layout pathname={pathname}>{page}</Layout>);
  });

export default {
  fetch,
  prerender: async () => {
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
