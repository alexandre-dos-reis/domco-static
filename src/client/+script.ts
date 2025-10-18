// import "htmx.org";
// import "htmx-ext-preload";

import type { HtmzDataState } from "@/shared-types";

const getState = (element: HTMLElement) => {
  return element.dataset.state
    ? (JSON.parse(element.dataset.state) as HtmzDataState)
    : null;
};

window.onload = () => {
  // const mainElement = document.querySelector("#main");
  // const state = getState(mainElement);
  // if (state && state.action === "navigate") {
  //   history.pushState({ path: state.path }, "", state.path);
  // }
};

window.htmz = (iframe: HTMLIFrameElement) => {
  const mainElement = iframe.contentDocument?.body.firstChild as HTMLElement;
  const state = getState(mainElement);

  if (state && state.action === "navigate") {
    // console.log(`Replaced state with ${state.path}`);
    history.replaceState({ path: state.path }, "", state.path);
    console.log(history.length);
  }

  document
    .querySelector(iframe.name) // use the iframe's name instead of the URL hash
    ?.replaceWith(mainElement);
};
