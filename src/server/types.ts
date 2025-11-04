export type Page = {
  params: Record<string, string>;
};

export type PageExports = {
  default: (args?: any) => JSX.Element | Promise<JSX.Element>;
  frontmatter?: Record<string, string | number>;
