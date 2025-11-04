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
