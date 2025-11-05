import { AsyncLocalStorage } from "node:async_hooks";

type PageConfig = {
  title?: string;
  disableSEO?: boolean;
  headTags?: Array<string>;
};

const pageContext = new AsyncLocalStorage<PageConfig>();

const initialStore: PageConfig = {
  disableSEO: false,
  title: undefined,
  headTags: [],
};

export const pageContextInit = <T extends () => unknown>(handler: T) => {
  return pageContext.run(initialStore, async () => {
    // HACK: This is a hack because asyncLocaleStorage context is not fully propagated
    pageContext.enterWith(initialStore);
    return handler();
  });
};

export const getPageContext = () => pageContext.getStore()!;

export const setPageContext = (newConfig: PageConfig) => {
  const store = pageContext.getStore()!;

  store.title = newConfig.title || store.title;
  store.disableSEO = newConfig.disableSEO || store.disableSEO;
  store.headTags = [
    ...new Set([...(store.headTags ?? []), ...(newConfig.headTags ?? [])]),
  ];
};
