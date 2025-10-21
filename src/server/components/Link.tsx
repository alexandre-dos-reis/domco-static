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
    <a
      {...p}
      fx-method="get"
      fx-action={p.href}
      fx-trigger="click"
      fx-target="#main"
      fx-swap="innerHTML"
      fx-push-url
    >
      {children}
    </a>
  );
};
