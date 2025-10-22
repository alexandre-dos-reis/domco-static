import type { PropsWithChildren } from "@kitajs/html";
import { Link } from "./Link";

export const BlogCard = ({
  imgSrc,
  href,
  imgAlt,
  date,
  children,
}: PropsWithChildren<{
  imgSrc: string;
  href?: string;
  imgAlt?: string;
  date?: string;
}>) => (
  <div class="lg:flex">
    <img
      class="object-cover w-full h-56 rounded-lg lg:w-64"
      src={imgSrc}
      alt={imgAlt}
    />

    <div class="flex flex-col justify-between py-6 lg:mx-6">
      <Link
        href={href ?? "#"}
        class="text-xl font-semibold text-gray-800 hover:underline dark:text-white "
      >
        {children}
      </Link>

      <span class="text-sm text-gray-500 dark:text-gray-300">Le: {date} </span>
    </div>
  </div>
);
