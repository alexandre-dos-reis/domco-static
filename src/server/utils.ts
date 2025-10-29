import z from "zod";
import { join } from "path";
import type { StaticPath } from "./types";

export const sendHtml = (body?: BodyInit | null, init?: ResponseInit) =>
  new Response(body, {
    ...init,
    headers: { ...init?.headers, "Content-Type": "text/html; charset=utf-8" },
  });

export const frontmatterSchema = z.object({
  title: z.string(),
  date: z.string().optional(),
  draft: z.boolean().default(false),
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
  staticPaths: StaticPath[] | undefined,
): StaticPath | undefined => {
  if (!staticPaths) return undefined;

  return staticPaths.find((path) => {
    return Object.entries(path.params).every(([key, value]) => {
      const param = matchedRoute.params[key];
      if (param === "" && value === "/") return true;
      return param === value;
    });
  });
};
