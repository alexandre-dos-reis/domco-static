import type { PropsWithChildren } from "@kitajs/html";
import { tags } from "client:script";
import { Header } from "./components/Header";
import { raw } from "hono/html";
import { getPageContext } from "./context";

export const Layout = ({
  children,
  pathname,
}: PropsWithChildren<{
  pathname: string;
}>) => {
  const { title, disableSEO, headTags } = getPageContext();

  return (
    <html lang="fr">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <link
          rel="canonical"
          href={`https://alexandre-dosreis.me${!pathname?.startsWith("/") ? `/${pathname}` : pathname}`}
        />
        {disableSEO && <meta name="robots" content="noindex, nofollow" />}
        <title>Alexandre Dos Reis{title && ` | ${title}`}</title>
        {raw(tags)}
        {headTags && headTags.map((tag) => raw(tag))}
      </head>
      <body class="flex flex-col justify-between">
        <Header pathname={pathname} />
        <main class={`max-w-3xl mx-auto px-8 mt-16`} id="main">
          {children}
        </main>
      </body>
    </html>
  );
};
