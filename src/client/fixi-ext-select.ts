document.addEventListener("fx:after", (e) => {
  const parser = new DOMParser();
  const rawHtml = e.detail.cfg.text;

  const doc = parser.parseFromString(rawHtml, "text/html");

  const main = doc.querySelector("main#main");

  e.detail.cfg.text = main?.outerHTML;
});
