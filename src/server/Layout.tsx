import type { PropsWithChildren } from "@kitajs/html";
import { Link } from "@/server/components/Link";
import { tags } from "client:script";

export const Layout = ({
  children,
  initialPath,
}: PropsWithChildren<{ initialPath?: string }>) => (
  <>
    {`<!doctype html>`}
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>TS + Bun + Elysia + Vite + React</title>
        {tags}
      </head>
      {/* <body hx-ext="preload"> */}
      <body>
        <nav>
          <ul>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/about">About</Link>
            </li>
            <li>
              <Link href="/blog">Blog</Link>
            </li>
          </ul>
        </nav>
        {children}
        <iframe
          hidden
          name="#main"
          src={initialPath}
          onload="window.htmz?.(this)"
        ></iframe>
      </body>
    </html>
  </>
);
