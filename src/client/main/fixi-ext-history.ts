document.addEventListener("fx:after", (e) => {
  if (e.target?.hasAttribute("fx-push-url")) {
    history.replaceState(
      {
        fixi: true,
        url: location.href,
      },
      "",
      location.href,
    );
    history.pushState(
      { fixi: true, url: e.detail.cfg.response.url },
      "",
      e.detail.cfg.response.url,
    );

    window.scroll({ top: 0, behavior: "instant" });
  }
});

window.addEventListener("popstate", async (e) => {
  if (e.state.fixi) {
    let historyResp = await fetch(e.state.url);
    document.documentElement.innerHTML = await historyResp.text();
    document.dispatchEvent(new CustomEvent("fx:process"));
    window.scroll({ top: 0, behavior: "instant" });
  }
});
