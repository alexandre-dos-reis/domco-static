import type { PropsWithChildren } from "@kitajs/html";
import { Link } from "@/server/components/Link";
import { tags } from "client:script";

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
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/about">About</Link>
            </li>
          </ul>
        </nav>
        <main id="main" class="bg-gray-500">
          {children}
        </main>
      </body>
    </html>
  </>
);
