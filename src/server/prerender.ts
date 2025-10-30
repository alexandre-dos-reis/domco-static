import { join } from "path";
import { FRAGMENT_PREFIX } from "./contants";
import type { PageExports } from "./types";
import { getRouter } from "./utils";

export const prerender = async () => {
  const pages = import.meta.glob("/server/pages/**/*.{tsx,mdx}", {
    eager: true,
  });
  const router = getRouter();

  const routes = (
    await Promise.all(
      Object.keys(router.routes).map(async (route) => {
        const matchedRoute = router.match(route)!;
        if (matchedRoute.kind === "exact") {
          return matchedRoute.pathname;
        }
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
      }),
    )
  ).flat();

  return [...routes, ...routes.map((r) => join(FRAGMENT_PREFIX, r))];
};
