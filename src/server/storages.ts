import { AsyncLocalStorage } from "node:async_hooks";
import type { PageConfig } from "./types";

const pageContext = new AsyncLocalStorage<PageConfig>();

export const pageContextRun = <T extends () => unknown>(handler: T) => {
  return pageContext.run({ disableSEO: false, title: "" }, handler);
};

export const getPageContext = () => pageContext.getStore()!;

export const setPageContext = (newConfig: PageConfig) => {
  pageContext.enterWith({
    ...getPageContext(),
    ...newConfig,
  });
};
