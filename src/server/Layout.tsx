import type { PropsWithChildren } from "@kitajs/html";
import { tags } from "client:script/main";
import { Header } from "./components/Header";
import { raw } from "hono/html";
import { getPageContext } from "./context";
import { Link } from "./components/Link";

export const Layout = ({
  children,
  pathname,
}: PropsWithChildren<{
  pathname: string;
}>) => {
  const { title, disableSEO, headTags } = getPageContext();
  const moreHeadTags = [...new Set(headTags)];
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
        {moreHeadTags && moreHeadTags.map((tag) => raw(tag))}
      </head>
      <body class="flex flex-col justify-between">
        <Header pathname={pathname} />
        <main class={`max-w-3xl mx-auto px-8 mt-16`} id="main">
          {children}
        </main>
        <footer class="mt-16 text-center text-gray-500">
          <section>
            <p>
              Site propulsé 🚀 par{" "}
              <Link href="https://domco.robino.dev">Domco</Link> |{" "}
              <Link href="https://github.com/alexandre-dos-reis/domco-static">
                Code source
              </Link>
            </p>
            <p>©️ 2026 | Tous droits réservés</p>
          </section>
        </footer>
      </body>
    </html>
  );
};
