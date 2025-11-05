document.addEventListener("fx:after", function (evt) {
  let cfg = evt.detail.cfg;
  if (cfg) {
    window.mergeHead(cfg.text);
  }
});
