import { Layout } from "./Layout";
import { FRAGMENT_PREFIX } from "./contants";
import { getRouter, sendHtml } from "./utils";

import { join } from "path";
import { readdir } from "node:fs/promises";
import { pageContextRun } from "./storages";

const pages = import.meta.glob("/server/pages/**/*.tsx", { eager: true });

const fetch = (req: Request) =>
  pageContextRun(async () => {
    let { pathname } = new URL(req.url);

    const isFragment =
      !!req.headers.get("Fx-Request") || pathname.startsWith(FRAGMENT_PREFIX);

    pathname = pathname.replace(new RegExp(`^${FRAGMENT_PREFIX}`), "");

    const router = getRouter();

    const matchRoute = router.match(pathname);

    if (!matchRoute) {
      return sendHtml("404", { status: 404 });
    }

    const module = pages[`/server/pages/${matchRoute.src}`] as {
      default: (p: any) => Promise<JSX.Element>;
    };

    const rendered = await module.default({ params: matchRoute.params });

    return sendHtml(
      <Layout isFragment={isFragment} pathname={pathname}>
        {rendered}
      </Layout>,
    );
  });

export default {
  fetch,
  prerender: async () => {
    const articles = (
      await readdir("./src/server/content", {
        recursive: true,
      })
    )
      .filter((p) => p.endsWith(".mdx"))
      .map((p) => p.replace("/index.mdx", ""));

    const categories = [
      ...new Map(
        articles.map((c) => c.replace(/\/.*$/, "")).map((a) => [a, a]),
      ).values(),
    ];

    return [
      "/",
      "/parcours",
      "/blog",
      ...categories.map((c) => join("/blog", c)),
      ...articles.map((a) => join("/blog", a)),
    ];
  },
};
