import { ActionPill } from "./components/ActionPill";
import { Frame } from "./components/Frame";
import { Link } from "./components/Link";
import type { JSX } from "hono/jsx/jsx-runtime";

export const sendHtml = (
  body?: BodyInit | JSX.Element | null,
  init?: ResponseInit,
) =>
  new Response(body as string, {
    ...init,
    headers: { ...init?.headers, "Content-Type": "text/html; charset=utf-8" },
  });

export const ucFirst = (word: string) =>
  word.charAt(0).toUpperCase() + word.slice(1);

export function unslugify(slug: string) {
  const result = slug.replace(/\-/g, " ");
  return result.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase();
  });
}

export const mdxComponents = {
  AP: ActionPill,
  Frame,
  a: Link,
  C: ActionPill,
};
