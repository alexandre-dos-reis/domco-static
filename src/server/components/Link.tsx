export const Link = ({ ...p }: JSX.HtmlAnchorTag) => {
  return (
    <a
      {...p}
      fx-method="get"
      fx-action={p.href}
      fx-trigger="click"
      fx-target="#main"
      fx-swap="innerHTML"
      fx-push-url
    />
  );
};
