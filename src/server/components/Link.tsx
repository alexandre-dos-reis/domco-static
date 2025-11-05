export const Link = (props: JSX.HtmlAnchorTag) => {
  if (props.href?.startsWith("http")) {
    return <a {...props} target="_blank" rel="noreferrer noopener" />;
  }

  if (props.href?.startsWith("article::/")) {
    props.href = props.href.replace("article::/", "/blog/");
  }

  return (
    <a
      {...props}
      hx-get={props.href}
      hx-trigger="click"
      hx-target="#main"
      hx-select="#main"
      hx-swap="outerHTML"
      hx-push-url
    />
  );
};
