import { join } from "path";
import type { StaticPaths } from "./types";

export const sendHtml = (
  body?: BodyInit | JSX.Element | null,
  init?: ResponseInit,
) =>
  new Response(body as string, {
    ...init,
    headers: { ...init?.headers, "Content-Type": "text/html; charset=utf-8" },
  });

export const getRouter = (subDir?: string) => {
  return new Bun.FileSystemRouter({
    style: "nextjs",
    fileExtensions: [".tsx", ".mdx"],
    dir: join(`src/server/pages`, subDir || ""),
  });
};

export const ucFirst = (word: string) =>
  word.charAt(0).toUpperCase() + word.slice(1);

export const getStaticPath = (
  matchedRoute: Bun.MatchedRoute,
  staticPaths: StaticPaths[] | undefined,
): StaticPaths | undefined => {
  if (!staticPaths) return undefined;

  return staticPaths.find((path) => {
    return Object.entries(path.params).every(([key, value]) => {
      const param = matchedRoute.params[key];
      if (param === "" && value === "/") return true;
      return param === value;
    });
  });
};
