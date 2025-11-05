document.addEventListener("fx:after", (e) => {
  const elWithFxSelect = (e.target as HTMLElement | undefined)?.getAttribute(
    "fx-select",
  );
  if (elWithFxSelect) {
    const doc = new DOMParser().parseFromString(e.detail.cfg.text, "text/html");
    const elt = doc.querySelector(elWithFxSelect);
    if (elt) {
      e.detail.cfg.text = elt[e.detail.cfg.swap] || elt.outerHTML;
    } else {
      e.preventDefault();
    }
  }
});
