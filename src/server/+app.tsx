import { contentToString } from "@kitajs/html";
import { Elysia } from "elysia";
import { Layout } from "./Layout";
import { FRAGMENT_PREFIX } from "./contants";
import { join } from "node:path";
import { ActionPill } from "./components/ActionPill";
import { Command } from "./components/Command";
import { Frame } from "./components/Frame";
import { sendHtml } from "./utils";

const getRouter = () => {
  return new Bun.FileSystemRouter({
    style: "nextjs",
    fileExtensions: [".tsx", ".mdx"],
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
    return sendHtml("404", { status: 404 });
  }

  const pages = import.meta.glob("/server/pages/**/*.{tsx,mdx}", {
    eager: true,
  });

  const PageComponent = (pages[`/server/pages/${matchRoute.src}`] as any)
    .default;

  const isMDX = matchRoute.src.endsWith(".mdx");

  const Page = isMDX ? (
    <PageComponent
      components={{
        AP: ActionPill,
        C: Command,
        Frame: Frame,
      }}
    />
  ) : (
    <PageComponent />
  );

  const isFragment =
    !!ctx.request.headers.get("Fx-Request") ||
    pathname.startsWith(FRAGMENT_PREFIX);

  const html = contentToString(
    isFragment ? Page : <Layout>{Page}</Layout>,
  ) as string;

  return sendHtml(html);
});

export default {
  fetch: app.fetch,
  prerender: () => {
    const routes = Object.keys(getRouter().routes);
    return [...routes, ...routes.map((r) => join(FRAGMENT_PREFIX, r))];
  },
};
