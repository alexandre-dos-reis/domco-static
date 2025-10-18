import type { HtmzDataState } from "@/shared-types";

const getState = (element: HTMLElement) => {
  return element.dataset.state
    ? (JSON.parse(element.dataset.state) as HtmzDataState)
    : null;
};

window.htmz = (iframe: HTMLIFrameElement) => {
  const mainElement = iframe.contentDocument?.body.firstChild as HTMLElement;
  const state = getState(mainElement);

  if (state) {
    switch (state.action) {
      case "navigate": {
        history.replaceState(null, "", state.path);
        break;
      }
      default: {
        console.warn(`No action found for ${state.action}`);
      }
    }
  }

  document
    .querySelector(iframe.name) // use the iframe's name instead of the URL hash
    ?.replaceWith(mainElement);
};
