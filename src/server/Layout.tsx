import type { PropsWithChildren } from "@kitajs/html";
import { tags } from "client:script";
import { Header } from "./components/Header";

export const Layout = ({
  children,
  title,
  disableSEO,
  isFragment,
}: PropsWithChildren<{
  isFragment: boolean;
  title?: string;
  disableSEO?: boolean;
}>) => {
  const headTitle = (
    <title>Alexandre Dos Reis | Portfolio & Blog{title && ` | ${title}`}</title>
  );

  if (isFragment) {
    return (
      <>
        <head>{headTitle}</head>
        {children}
      </>
    );
  }

  return (
    <>
      {`<!doctype html>`}
      <html lang="fr">
        <head>
          <meta charset="UTF-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          {disableSEO && <meta name="robots" content="noindex, nofollow" />}
          {headTitle}
          {tags}
          <link rel="stylesheet" href="/client/styles.css" />
        </head>
        <body>
          <Header />
          <main class="max-w-3xl mx-auto px-8 mt-16" id="main">
            {children}
          </main>
        </body>
      </html>
    </>
  );
};
