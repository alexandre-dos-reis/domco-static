import type { Children } from "@kitajs/html";

export const Frame = ({ children }: { children: Children }) => (
  <div class="card bg-base-300 px-6">{children}</div>
);
