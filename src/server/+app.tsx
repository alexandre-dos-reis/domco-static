import { contentToString } from "@kitajs/html";
import { Elysia } from "elysia";
import { Layout } from "./Layout";
import { FRAGMENT_PREFIX } from "./contants";

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

  const secFetchDest = ctx.request.headers.get("Sec-Fetch-Dest");

  const matchRoute =
    router.match(pathname.replace(new RegExp(`^${FRAGMENT_PREFIX}`), ""))
      ?.filePath || null;

  if (!matchRoute) {
    return new Response("404", {
      headers: { "Content-Type": "text/html; charset=utf-8" },
      status: 404,
    });
  }

  const Page = (await import(matchRoute)).default;

  const Wrapper = (
    <main id="main">
      <Page />
    </main>
  );

  const html = contentToString(
    secFetchDest === "document" ? <Layout>{Wrapper}</Layout> : Wrapper,
  ) as string;

  return new Response(html, {
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
});

export default {
  fetch: app.fetch,
  prerender: () => {
    const routes = Object.keys(getRouter().routes);
    return [...routes, ...routes.map((r) => `${FRAGMENT_PREFIX}${r}`)];
  },
};
