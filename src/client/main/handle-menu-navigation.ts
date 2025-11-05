declare global {
  interface Window {
    handleMenuNavigation: any;
  }
}
window.handleMenuNavigation = (anchor: HTMLAnchorElement) => {
  const underlineClass = "underline";

  const ul = anchor.closest("ul");

  ul?.querySelectorAll("a")?.forEach((a) => {
    a.classList.remove(underlineClass);
  });

  anchor.classList.toggle(underlineClass);
};
