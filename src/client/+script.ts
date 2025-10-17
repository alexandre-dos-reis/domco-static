// import "htmx.org";
// import "htmx-ext-preload";

window.htmz = (frame: HTMLIFrameElement) => {
  document
    .querySelector(frame.name) // use the iframe's name instead of the URL hash
    ?.replaceWith(...(frame.contentDocument?.body.childNodes || []));
};
