import type { PropsWithChildren } from "hono/jsx";

export const TagTech = (p: PropsWithChildren) => (
  <span
    {...p}
    class="bg-gray-700 py-1 px-2 m-1 rounded-xl whitespace-nowrap text-gray-50 font-semibold"
  />
);
