import { contentToString } from "@kitajs/html";
import { Elysia } from "elysia";
import { Layout } from "./Layout";
import { FRAGMENT_ROUTE } from "./contants";

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

  const matchRoute =
    (pathname.startsWith(FRAGMENT_ROUTE)
      ? router.match(pathname.replace(FRAGMENT_ROUTE, ""))
      : router.match(pathname)
    )?.filePath || null;

  if (!matchRoute) {
    return new Response("404", {
      headers: { "Content-Type": "text/html; charset=utf-8" },
      status: 404,
    });
  }

  const Page = (await import(matchRoute)).default;

  const html = contentToString(
    pathname.startsWith(FRAGMENT_ROUTE) ? (
      <Page />
    ) : (
      <Layout>
        <Page />
      </Layout>
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
    return [...routes, ...routes.map((r) => `${FRAGMENT_ROUTE}${r}`)];
  },
};
