import type { PropsWithChildren } from "hono/jsx";

export const Frame = ({ children }: PropsWithChildren) => (
  <div class="card bg-base-300 px-6">{children}</div>
);
