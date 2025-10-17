import { FRAGMENT_PREFIX } from "@/server/contants";
interface Props extends JSX.HtmlAnchorTag {
  hxHeaders?: Record<string, string>;
}

/* <a href="/_fragment/about" target="#main"> */

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
      href={`${FRAGMENT_PREFIX}${href}`} // The real url fetched
      target="#main"
    >
      {children}
    </a>
  );
};
