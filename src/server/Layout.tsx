import type { PropsWithChildren } from "@kitajs/html";
import { tags } from "client:script";
import { Header } from "./components/Header";
import { join } from "path";

export const Layout = ({
  children,
  title,
  disableSEO,
  isFragment,
  pathname,
  isMDX,
}: PropsWithChildren<{
  isFragment: boolean;
  title?: string;
  disableSEO?: boolean;
  pathname: string;
  isMDX?: boolean;
}>) => {
  const headTitle = (
    <title>Alexandre Dos Reis | Portfolio & Blog{title && ` | ${title}`}</title>
  );

  const imageSrc = isMDX
    ? import.meta.glob("/server/pages/**/head.jpg", {
        eager: true,
      })[join("/server/pages", pathname || "", "head.jpg")]
    : undefined;

  const main = (
    <>
      {isMDX && (
        <section class="relative flex justify-center items-center h-84 md:h-120 mb-4">
          <div class="p-2 z-40">
            <div class="w-full text-center text-sm md:text-xl mb-4">
              Publié le 14 Jun 2021 - durée 12 min
            </div>
            <h1 class="w-full text-center px-4 text-[2.5rem] md:text-5xl">
              Git | Outil de gestion de versions{" "}
            </h1>
          </div>
          <img
            src={imageSrc?.default}
            alt="Top"
            class="absolute top-0 h-full w-full object-cover opacity-40"
            width="1920"
            height="1272"
            loading="lazy"
            decoding="async"
          />
        </section>
      )}
      {children}
    </>
  );

  if (isFragment) {
    return (
      <>
        <head>{headTitle}</head>
        {main}
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

          <link
            rel="canonical"
            href={`https://alexandre-dosreis.me${!pathname?.startsWith("/") ? `/${pathname}` : pathname}`}
          />
          {disableSEO && <meta name="robots" content="noindex, nofollow" />}
          {headTitle}
          {tags}
        </head>
        <body class="flex flex-col justify-between">
          <Header pathname={pathname || "/"} />
          <main
            class={`max-w-3xl mx-auto px-8 mt-16 ${isMDX ? "mdx" : ""}`}
            id="main"
          >
            {main}
          </main>
        </body>
      </html>
    </>
  );
};
