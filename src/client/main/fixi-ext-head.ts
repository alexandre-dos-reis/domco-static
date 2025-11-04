document.addEventListener("fx:after", (e) => {
  let text = import.meta.env.DEV
    ? e.detail.cfg.text.replace(
        '<script type="module" src="/@vite/client"></script>',
        "",
      )
    : e.detail.cfg.text;

  if (/<head>/i.test(text)) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(text, "text/html");

    const head = doc.querySelector("head");

    if (head) {
      Array.from(head.children).forEach((element) => {
        if (element.tagName === "TITLE") {
          const title = document.querySelector("title");
          title?.replaceWith(element);
        }
      });
      head.remove();
      text = doc.documentElement.innerHTML;
    }
  }

  e.detail.cfg.text = text;
});
