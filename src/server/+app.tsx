import { contentToString } from "@kitajs/html";
import { Elysia } from "elysia";
import { Layout } from "./Layout";
import { FRAGMENT_PREFIX } from "./contants";
import { join } from "node:path";

const getRouter = () => {
  return new Bun.FileSystemRouter({
    style: "nextjs",
    fileExtensions: [".tsx"],
    dir: "src/server/pages",
  });
};

const app = new Elysia().onRequest(async (ctx) => {
  const { pathname } = new URL(ctx.request.url);

  const router = getRouter();

  const matchRoute = router.match(
    pathname.replace(new RegExp(`^${FRAGMENT_PREFIX}`), ""),
  );

  if (!matchRoute) {
    return new Response("404", {
      headers: { "Content-Type": "text/html; charset=utf-8" },
      status: 404,
    });
  }

  const pages = import.meta.glob("/server/pages/*.tsx", {
    eager: true,
  });

  const Page = (pages[`/server/pages/${matchRoute.src}`] as any).default();

  const Wrapper = (
    <main id="main" hx-history-elt>
      {Page}
    </main>
  );

  const html = contentToString(
    ctx.request.headers.get("Hx-Request") ||
      pathname.startsWith(FRAGMENT_PREFIX) ? (
      Wrapper
    ) : (
      <Layout>{Wrapper}</Layout>
    ),
  ) as string;

  return new Response(html, {
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
});

export default {
  fetch: app.fetch,
  prerender: () => {
    const routes = Object.keys(getRouter().routes);
    return [...routes, ...routes.map((r) => join(FRAGMENT_PREFIX, r))];
  },
};
