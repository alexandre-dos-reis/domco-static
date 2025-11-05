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
      fx-method="get"
      fx-action={props.href}
      fx-trigger="click"
      fx-target="#main"
      fx-swap="outerHTML"
      fx-select="#main"
      fx-push-url
    />
  );
};
