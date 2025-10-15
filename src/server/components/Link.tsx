import { FRAGMENT_ROUTE } from "@/server/contants";
interface Props extends JSX.HtmlAnchorTag {
  hxHeaders?: Record<string, string>;
}

export const Link = ({
  href,
  children,
  hxHeaders,
  class: className,
  ...p
}: Props) => {
  return (
    <a
      {...p}
      href={href} // For seo
      hx-push-url={href} // Push new url in the history and in the url browser
      hx-get={`${FRAGMENT_ROUTE}${href}`} // The real url fetched
      hx-target="#main"
      hx-swap="innerHTML"
    >
      {children}
    </a>
  );
};
