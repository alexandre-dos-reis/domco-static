declare global {
  interface Window {
    htmz: (iframe: HTMLIFrameElement) => void;
  }
}

window.htmz = (iframe: HTMLIFrameElement) => {
  history.replaceState(null, "", iframe.contentWindow?.location.pathname);

  document
    .querySelector(iframe.name) // use the iframe's name instead of the URL hash
    ?.replaceWith(
      (iframe.contentDocument?.body.firstChild as HTMLElement) || [],
    );
};
