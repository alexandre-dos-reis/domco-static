document.addEventListener("fx:after", (e) => {
  const parser = new DOMParser();
  const rawHtml = e.detail.cfg.text;

  const newDoc = parser.parseFromString(rawHtml, "text/html");

  const newHead = newDoc.querySelector("head");
  const head = document.querySelector("head");

  // Update head elements
  if (newHead && head) {
    head.innerHTML = newHead.innerHTML;
  }

  window.scrollTo({ behavior: "instant", top: 0 });

  // Update main element
  const main = newDoc.querySelector("main#main");

  e.detail.cfg.text = main?.outerHTML;
});
