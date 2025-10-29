import { contentToString } from "@kitajs/html";
import { Layout } from "./Layout";
import { FRAGMENT_PREFIX } from "./contants";
import { ActionPill } from "./components/ActionPill";
import { Command } from "./components/Command";
import { Frame } from "./components/Frame";
import { frontmatterSchema, getRouter, getStaticPath, sendHtml } from "./utils";
import type { PageExports } from "./types";
import { join } from "path";

const fetch = async (req: Request) => {
  const { pathname } = new URL(req.url);

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

  const exports = pages[`/server/pages/${matchRoute.src}`] as PageExports;

  if (matchRoute.kind === "dynamic" && !exports.getStaticPaths) {
    throw new Error(
      `Export a getStaticPaths function for the route: ${matchRoute.name}, file: ${matchRoute.filePath}`,
    );
  }

  const staticPath =
    matchRoute.kind !== "exact"
      ? getStaticPath(matchRoute, await exports.getStaticPaths?.())
      : undefined;

  if (matchRoute.kind !== "exact" && !staticPath) {
    throw new Error(
      `StaticPath not found for route: ${matchRoute.pathname}, file: ${matchRoute.filePath}`,
    );
  }

  const isMDX = matchRoute.src.endsWith(".mdx");

  const frontmatter = isMDX
    ? frontmatterSchema.parse(exports.frontmatter)
    : undefined;

  const PageComponent = exports.default;

  const Page = await (isMDX ? (
    <PageComponent
      components={{
        AP: ActionPill,
        C: Command,
        Frame: Frame,
      }}
    />
  ) : (
    <PageComponent params={matchRoute.params} />
  ));

  const isFragment =
    !!req.headers.get("Fx-Request") || pathname.startsWith(FRAGMENT_PREFIX);

  const html = contentToString(
    <Layout
      isMDX={isMDX}
      isFragment={isFragment}
      title={staticPath?.title || frontmatter?.title || exports.config?.title}
      disableSEO={exports.config?.disableSEO}
      pathname={pathname}
    >
      {Page}
    </Layout>,
  ) as string;

  return sendHtml(html);
};

export default {
  fetch,
  prerender: async () => {
    const pages = import.meta.glob("/server/pages/**/*.{tsx,mdx}", {
      eager: true,
    });
    const router = getRouter();

    const routes = (
      await Promise.all(
        Object.keys(router.routes).map(async (route) => {
          const matchedRoute = router.match(route)!;
          //
          // Dynamic, catch-all, optional catch-all routes
          //
          if (matchedRoute.kind !== "exact") {
            const exports = pages[
              `/server/pages/${matchedRoute.src}`
            ] as PageExports;

            if (!exports?.getStaticPaths) {
              throw new Error(
                `Export a getStaticPaths function for the route: ${matchedRoute.name}, file: ${matchedRoute.filePath}`,
              );
            }

            const staticPaths = await exports.getStaticPaths();

            return staticPaths
              .map(({ params }) =>
                Object.entries(params).map(([param, path]) =>
                  matchedRoute.pathname.replace(`[${param}]`, path),
                ),
              )
              .flat();
          }

          return matchedRoute.pathname;
        }),
      )
    ).flat();

    return [...routes, ...routes.map((r) => join(FRAGMENT_PREFIX, r))];
  },
};
