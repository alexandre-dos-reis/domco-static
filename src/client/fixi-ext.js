
document.addEventListener("fx:after", (e) => {
  if ((e.target as HTMLElement)?.hasAttribute("fx-push-url")) {
    history.replaceState({ fixi: true, url: location.href }, "", location.href);
    history.pushState(
      { fixi: true, url: e.detail.cfg.response.url },
      "",
      e.detail.cfg.response.url,
    );
  }
});
window.addEventListener("popstate", async (e) => {
  if (e.state.fixi) {
    let historyResp = await fetch(e.state.url);
    document.documentElement.innerHTML = await historyResp.text();
    document.dispatchEvent(new CustomEvent("fx:process"));
  }
});
