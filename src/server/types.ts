export type PageConfig = { title?: string; disableSEO?: boolean };

export type StaticPaths = { params: Record<string, string>; title?: string };

export type GetStaticPaths = () => Promise<Array<StaticPaths>>;

export type Page = {
  params: Record<string, string>;
};

export type PageExports = {
  default: (args?: any) => JSX.Element | Promise<JSX.Element>;
  frontmatter?: Record<string, string | number>;
  config?: PageConfig;
  getStaticPaths?: GetStaticPaths;
};
