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
    // See: https://chatgpt.com/c/690b1c6e-5568-8325-bd4d-c7d941d7d382
    pageContext.enterWith(initialStore);
    // HACK
    return handler();
  });
};

export const getPageContext = () => {
  const store = pageContext.getStore();
  if (!store) {
    throw new Error("Can't use pageContext Store outside of run or enterWith");
  }
  return store;
};

export const setPageContext = (newConfig: PageConfig) => {
  const store = pageContext.getStore()!;

  store.title = newConfig.title || store.title;
  store.disableSEO = newConfig.disableSEO || store.disableSEO;
  store.headTags = [
    ...new Set([...(store.headTags ?? []), ...(newConfig.headTags ?? [])]),
  ];
};
