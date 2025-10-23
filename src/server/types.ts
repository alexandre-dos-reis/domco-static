export type PageConfig = { title?: string; disableSEO?: boolean };

export type Page = { params?: Record<string, string> };

export type GetStaticPaths = () => Promise<
  Array<{ params: Record<string, string> }>
>;

export type PageExports = {
  default: (args?: any) => JSX.Element;
  frontmatter?: Record<string, string | number>;
  config?: PageConfig;
  getStaticPaths?: GetStaticPaths;
};
