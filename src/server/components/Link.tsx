import type { JSX } from "hono/jsx";

export const Link = (props: JSX.IntrinsicElements["a"]) => {
  if (props.href?.startsWith("http")) {
    return <a {...props} target="_blank" rel="noreferrer noopener" />;
  }

  if (props.href?.startsWith("article::/")) {
    props.href = props.href.replace("article::/", "/procedures/");
  }

  return <a {...props} />;
};
