export const Link = (props: JSX.HtmlAnchorTag) => {
  if (props.href?.startsWith("http")) {
    return (
      <a href={props.href} target="_blank" rel="noreferrer noopener">
        <slot />
      </a>
    );
  }

  return (
    <a
      {...props}
      fx-method="get"
      fx-action={props.href}
      fx-trigger="click"
      fx-target="#main"
      fx-swap="outerHTML"
      fx-push-url
    />
  );
};
