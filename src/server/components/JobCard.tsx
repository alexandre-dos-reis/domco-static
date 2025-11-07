import type { PropsWithChildren } from "hono/jsx";
import { Link } from "./Link";

export const JobCard = ({
  children,
  src,
  company,
}: PropsWithChildren<{ src: string; company: string }>) => (
  <Link
    class="relative overflow-hidden rounded-lg group"
    href="https://www.finishers.com"
    target="_blank"
    rel="noreferrer noopener"
  >
    <img
      src={src}
      alt="Finishers"
      class="h-56 w-full object-cover transition-all opacity-30 group-hover:opacity-20 group-hover:scale-105"
      width="750"
      height="422"
      loading="lazy"
      decoding="async"
    />
    <div class="absolute inset-0 group-hover:text-white text-sm m-3">
      <h4 class="absolute top-0 mt-0 font-bold text-2xl">{company}</h4>
      <p class="absolute bottom-0 font-bold">{children}</p>
    </div>
  </Link>
);
