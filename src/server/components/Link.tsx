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
    <a {...p} target="#main">
      {children}
    </a>
  );
};
