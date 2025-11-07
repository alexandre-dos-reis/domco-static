export const Link = (props: JSX.HtmlAnchorTag) => {
  if (props.href?.startsWith("http")) {
    return <a {...props} target="_blank" rel="noreferrer noopener" />;
  }

  if (props.href?.startsWith("article::/")) {
    props.href = props.href.replace("article::/", "/procedures/");
  }

  return <a {...props} />;
};
