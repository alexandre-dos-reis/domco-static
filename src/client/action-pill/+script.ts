window.actionPill = (divElement: HTMLDivElement) => {
  const codeElement = divElement.querySelector("code");

  if (!divElement || !codeElement || !codeElement.innerHTML) return;

  navigator.clipboard.writeText(codeElement.innerHTML);

  const toggleGreen = () =>
    divElement.querySelector("svg")?.classList.toggle("fill-green-500");

  toggleGreen();
  window.setTimeout(toggleGreen, 1000);
};
