import z from "zod";
import { join } from "path";

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
