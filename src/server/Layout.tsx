import { src, tags } from "client:script/main";
import { Header } from "./components/Header";
import { raw } from "hono/html";
import { getPageContext } from "./context";
import { Link } from "./components/Link";
import type { PropsWithChildren } from "hono/jsx";

export const Layout = ({
  children,
  pathname,
}: PropsWithChildren<{
  pathname: string;
}>) => {
  /* This hack is usefull in production because currently the main script in empty,
   * so we don't import it.
   * In Dev, styles are imported via the vite script.
   * */
  const mainTags = import.meta.env.DEV
    ? tags
    : src.style.length === 0
      ? ""
      : src.style.map((s) => `<link rel=stylesheet href="${s}">`).join("");

  const { title, disableSEO, headTags } = getPageContext();
  return (
    <html lang="fr">
      <head>
        <meta charset="UTF-8" />
        <meta name="view-transition" content="same-origin" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          rel="icon"
          href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ctext y='0.9em' font-size='90'%3E👨‍💻%3C/text%3E%3C/svg%3E"
        />
        <link
          rel="canonical"
          href={`https://alexandre-dosreis.me${!pathname?.startsWith("/") ? `/${pathname}` : pathname}`}
        />
        {disableSEO && <meta name="robots" content="noindex, nofollow" />}
        <title>Alexandre Dos Reis{title && ` | ${title}`}</title>
        {raw(mainTags)}
        {headTags && raw(headTags.join(""))}
      </head>
      <body class="flex flex-col justify-between">
        <Header pathname={pathname} />
        <main class="max-w-3xl mx-auto px-8 mt-16" id="main">
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
