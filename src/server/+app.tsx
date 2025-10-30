import { Layout } from "./Layout";
import { FRAGMENT_PREFIX } from "./contants";
import { ActionPill } from "./components/ActionPill";
import { Command } from "./components/Command";
import { Frame } from "./components/Frame";
import { frontmatterSchema, getRouter, getStaticPath, sendHtml } from "./utils";
import type { PageExports } from "./types";
import { prerender } from "./prerender";

const fetch = async (req: Request) => {
  let { pathname } = new URL(req.url);

  const isFragment =
    !!req.headers.get("Fx-Request") || pathname.startsWith(FRAGMENT_PREFIX);

  pathname = pathname.replace(new RegExp(`^${FRAGMENT_PREFIX}`), "");

  const router = getRouter();

  const matchRoute = router.match(pathname);

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

  const staticPaths =
    matchRoute.kind !== "exact"
      ? getStaticPath(matchRoute, await exports.getStaticPaths?.())
      : undefined;

  if (matchRoute.kind !== "exact" && !staticPaths) {
    throw new Error(
      `StaticPath not found for route: ${matchRoute.pathname}, file: ${matchRoute.filePath}`,
    );
  }

  const isMDX = matchRoute.src.endsWith(".mdx");

  const frontmatter = isMDX
    ? frontmatterSchema.parse(exports.frontmatter)
    : undefined;

  return sendHtml(
    Layout({
      isMDX,
      isFragment,
      title: staticPaths?.title || frontmatter?.title || exports.config?.title,
      disableSEO: exports.config?.disableSEO,
      pathname,
      children: await exports.default(
        isMDX
          ? {
              components: {
                AP: ActionPill,
                C: Command,
                Frame: Frame,
              },
            }
          : { params: matchRoute.params },
      ),
    }),
  );
};

export default {
  fetch,
  prerender,
};
