import { contentToString } from "@kitajs/html";
import { Layout } from "./Layout";
import { FRAGMENT_PREFIX } from "./contants";
import { join } from "node:path";
import { ActionPill } from "./components/ActionPill";
import { Command } from "./components/Command";
import { Frame } from "./components/Frame";
import { frontmatterSchema, getRouter, sendHtml } from "./utils";
import type { PageConfig } from "./types";

const fetch = (req: Request) => {
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

  const exports = pages[`/server/pages/${matchRoute.src}`] as {
    default: (args?: any) => JSX.Element;
    frontmatter?: Record<string, string | number>;
    config?: PageConfig;
  };

  const isMDX = matchRoute.src.endsWith(".mdx");

  const frontmatter = isMDX
    ? frontmatterSchema.parse(exports.frontmatter)
    : undefined;

  const PageComponent = exports.default;

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
    !!req.headers.get("Fx-Request") || pathname.startsWith(FRAGMENT_PREFIX);

  const html = contentToString(
    <Layout
      isFragment={isFragment}
      title={frontmatter?.title || exports.config?.title}
      disableSEO={exports.config?.disableSEO}
    >
      {Page}
    </Layout>,
  ) as string;

  return sendHtml(html);
};

export default {
  fetch,
  prerender: () => {
    const routes = Object.keys(getRouter().routes);
    return [...routes, ...routes.map((r) => join(FRAGMENT_PREFIX, r))];
  },
};
