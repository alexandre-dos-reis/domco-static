declare global {
  interface Window {
    htmz: (iframe: HTMLIFrameElement) => void;
  }
}

window.htmz = (iframe: HTMLIFrameElement) => {
  history.replaceState(null, "", iframe.contentWindow?.location.pathname);

  document
    .querySelector(iframe.name)
    ?.replaceWith(
      (iframe.contentDocument?.body.firstChild as HTMLElement) || [],
    );
};
