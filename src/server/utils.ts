export const sendHtml = (
  body?: BodyInit | JSX.Element | null,
  init?: ResponseInit,
) =>
  new Response(body as string, {
    ...init,
    headers: { ...init?.headers, "Content-Type": "text/html; charset=utf-8" },
  });

export const getRouter = () => {
  return new Bun.FileSystemRouter({
    style: "nextjs",
    fileExtensions: [".tsx"],
    dir: `src/server/pages`,
  });
};

export const ucFirst = (word: string) =>
  word.charAt(0).toUpperCase() + word.slice(1);
