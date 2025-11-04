import { AsyncLocalStorage } from "node:async_hooks";

type PageConfig = {
  title?: string;
  disableSEO?: boolean;
  headTags?: string;
};

const pageContext = new AsyncLocalStorage<PageConfig>();

export const pageContextRun = <T extends () => unknown>(handler: T) => {
  return pageContext.run(
    { disableSEO: false, title: "", headTags: undefined },
    handler,
  );
};

export const getPageContext = () => pageContext.getStore()!;

export const setPageContext = (newConfig: PageConfig) => {
  pageContext.enterWith({
    ...getPageContext(),
    ...newConfig,
  });
};
