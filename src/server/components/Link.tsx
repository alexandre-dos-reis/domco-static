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
      hx-push-url={p.href} // Push new url in the history and in the url browser
      hx-get={p.href} // The real url fetched
      hx-select="#main"
      hx-target="#main"
      hx-swap="outerHTML"
      preload="mouseover"
    >
      {children}
    </a>
  );
};
