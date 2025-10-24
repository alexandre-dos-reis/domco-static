export type PageConfig = { title?: string; disableSEO?: boolean };

export type GetStaticPaths = () => Promise<
  Array<{ params: Record<string, string>; title?: string }>
>;

export type Page<
  TGetStaticPaths extends GetStaticPaths | undefined = undefined,
> = {
  params: TGetStaticPaths extends (...args: any) => any
    ? Awaited<ReturnType<TGetStaticPaths>>[0]["params"]
    : undefined;
};

export type PageExports = {
  default: (args?: any) => JSX.Element;
  frontmatter?: Record<string, string | number>;
  config?: PageConfig;
  getStaticPaths?: GetStaticPaths;
};
