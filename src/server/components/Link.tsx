import { MAIN_ROUTER_ELEMENT_ID } from "../contants";

interface Props extends JSX.HtmlAnchorTag {
  hxHeaders?: Record<string, string>;
}

export const Link = ({
  children,
  hxHeaders,
  class: className,
  ...p
}: Props) => {
  return (
    <a {...p} target={`#${MAIN_ROUTER_ELEMENT_ID}`}>
      {children}
    </a>
  );
};
