const DOT_RADIUS = 2;

const drawDot = (svg: SVGElement, { x, y }: { x: number; y: number }) => {
  const dot = document.createElementNS("http://www.w3.org/2000/svg", "circle");

  dot.setAttribute("cx", x.toString());
  dot.setAttribute("cy", y.toString());
  dot.setAttribute("r", DOT_RADIUS.toString());
  dot.style.fill = svg.style.stroke;

  svg.appendChild(dot);
  return dot;
};

const drawLine = (
  svg: SVGElement,
  { x1, x2, y1, y2 }: { x1: number; y1: number; x2: number; y2: number },
) => {
  const line = document.createElementNS("http://www.w3.org/2000/svg", "line");

  line.setAttribute("x1", x1.toString());
  line.setAttribute("y1", y1.toString());
  line.setAttribute("x2", x2.toString());
  line.setAttribute("y2", y2.toString());
  svg.appendChild(line);
  return line;
};

const drawLigns = () => {
  Array.from(
    document.querySelectorAll<HTMLLIElement>("[data-recette-element]"),
  ).forEach((parent) => {
    const link = parent.querySelector("& > a");
    const svg = parent.querySelector<SVGElement>("& > svg");
    const children = Array.from(parent.querySelectorAll("& > ul > li > a"));

    if (children.length === 0 || !link || !svg) return;

    const linkRect = link?.getBoundingClientRect();
    const svgRect = svg?.getBoundingClientRect();

    if (!linkRect || !svgRect) return;

    const startX = linkRect.left + linkRect.width / 2 - svgRect.left;
    const startY = linkRect.top + linkRect.height - svgRect.top;

    drawDot(svg, { x: startX, y: startY });

    children.forEach((child) => {
      const childRect = child.getBoundingClientRect();
      const endX = childRect.left + childRect.width / 2 - svgRect.left;
      const endY = childRect.top - svgRect.top;

      drawLine(svg, { x1: startX, y1: startY, x2: endX, y2: endY });
      drawDot(svg, { x: endX, y: endY });
    });
  });
};

document.addEventListener("DOMContentLoaded", drawLigns);
window.addEventListener("resize", drawLigns);
