import { Layout } from "./Layout";
import { FRAGMENT_PREFIX } from "./contants";
import { getRouter, sendHtml } from "./utils";

import { join } from "path";
import { pageContextRun } from "./storages";
import { articles } from "./articles";
import NotFoundPage from "./pages/_404";

const fetch = (req: Request) =>
  pageContextRun(async () => {
    let { pathname } = new URL(req.url);

    const isFragment =
      !!req.headers.get("Fx-Request") || pathname.startsWith(FRAGMENT_PREFIX);

    pathname = pathname.replace(new RegExp(`^${FRAGMENT_PREFIX}`), "");

    const router = getRouter();

    const matchRoute = router.match(pathname);

    if (!matchRoute) {
      return sendHtml(
        <Layout isFragment={isFragment} pathname={pathname}>
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

    return sendHtml(
      <Layout isFragment={isFragment} pathname={pathname}>
        {page}
      </Layout>,
    );
  });

export default {
  fetch,
  prerender: async () => {
    const categories = [
      ...new Map(articles.map((a) => [a.category, a])).values(),
    ];

    const routes = [
      "/_404",
      "/",
      "/parcours",
      "/blog",
      ...categories.map((c) => join("/blog", c.category)),
      ...articles.map((a) => join("/blog", a.category, a.article)),
    ];

    return [...routes, ...routes.map((r) => join(FRAGMENT_PREFIX, r))];
  },
};
