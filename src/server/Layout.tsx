import type { PropsWithChildren } from "@kitajs/html";
import { tags } from "client:script";
import { Header } from "./components/Header";
import { raw } from "hono/html";
import { getPageContext } from "./storages";

export const Layout = ({
  children,
  isFragment,
  pathname,
}: PropsWithChildren<{
  isFragment: boolean;
  pathname: string;
}>) => {
  const { title, disableSEO } = getPageContext();

  const headTitle = <title>Alexandre Dos Reis{title && ` | ${title}`}</title>;

  const content = (
    <main class={`max-w-3xl mx-auto px-8 mt-16`} id="main">
      {children}
    </main>
  );

  if (isFragment) {
    return (
      <>
        <head>{headTitle}</head>
        {content}
      </>
    );
  }

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
        {headTitle}
        {raw(tags)}
      </head>
      <body class="flex flex-col justify-between">
        <Header pathname={pathname} />
        {content}
      </body>
    </html>
  );
};
