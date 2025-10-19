import type { PropsWithChildren } from "@kitajs/html";
import { Link } from "@/server/components/Link";
import { tags } from "client:script";
import { MAIN_ROUTER_ELEMENT_ID } from "./contants";

export const Layout = ({ children }: PropsWithChildren) => (
  <>
    {`<!doctype html>`}
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>TS + Bun + Elysia + Vite + React</title>
        {tags}
      </head>
      <body>
        <nav>
          <ul>
            <li>
              <Link href="/">Accueil</Link>
            </li>
            <li>
              <Link href="/blog">Blog</Link>
            </li>
            <li>
              <Link href="/parcours">Parcours</Link>
            </li>
            <li>
              <a href="mailto:ajm.dosreis.daponte@gmail.com">Contact</a>
            </li>
          </ul>
        </nav>
        {children}
        <iframe
          hidden
          name={`#${MAIN_ROUTER_ELEMENT_ID}`}
          onload="window.htmz?.(this)"
        ></iframe>
      </body>
    </html>
  </>
);
