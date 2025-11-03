import { join } from "path";
import { readdir } from "node:fs/promises";

export const prerender = async () => {
  const articles = (
    await readdir("./src/server/content", {
      recursive: true,
    })
  )
    .filter((p) => p.endsWith(".mdx"))
    .map((p) => p.replace("/index.mdx", ""));

  const categories = [
    ...new Map(
      articles.map((c) => c.replace(/\/.*$/, "")).map((a) => [a, a]),
    ).values(),
  ];

  return [
    "/",
    "/blog",
    ...categories.map((c) => join("/blog", c)),
    ...articles.map((a) => join("/blog", a)),
  ];
};
