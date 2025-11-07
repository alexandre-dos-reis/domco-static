const toPixel = (value: number) => `${value}`;

const drawLign = ({
  startX,
  startY,
  endX,
  endY,
}: {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
}) => {
  const shell = document.createElementNS("http://www.w3.org/2000/svg", "svg");

  shell.classList.add("absolute");
  shell.classList.add("stroke-2");
  shell.classList.add("stroke-red-700");
  shell.setAttribute("style", `width: ${endX}px; height: ${endY}`);

  const line = document.createElementNS("http://www.w3.org/2000/svg", "line");

  line.setAttribute("x1", toPixel(startX));
  line.setAttribute("x2", toPixel(endX));
  line.setAttribute("y1", toPixel(startY));
  line.setAttribute("y2", toPixel(endY));

  shell.insertAdjacentElement("afterbegin", line);

  return shell;
};

const drawLigns = () => {
  const recettesElements = Array.from(
    document.querySelectorAll("[data-recette-element]"),
  );
  recettesElements.forEach((element) => {
    const domRect = element.getBoundingClientRect();
    console.log(domRect);

    const line = drawLign({
      startX: 0,
      startY: 0,
      endX: domRect.left,
      endY: domRect.top,
    });
    element.insertAdjacentElement("afterbegin", line);
  });
};

document.addEventListener("DOMContentLoaded", (_) => {
  drawLigns();
});
