const DOT_RADIUS = 2;

const drawSvgElement = <
  TagName extends keyof SVGElementTagNameMap,
  Parent extends HTMLElement | SVGElement,
>({
  name,
  attributes,
  parent,
  handler,
}: {
  name: TagName;
  attributes: Record<string, string | number | boolean>;
  parent: Parent;
  handler?: (instance: SVGElementTagNameMap[TagName], parent: Parent) => void;
}) => {
  const element = document.createElementNS("http://www.w3.org/2000/svg", name);

  Object.entries(attributes).forEach(([key, value]) => {
    element.setAttribute(key, `${value}`);
  });

  handler?.(element, parent);

  parent.appendChild(element);
  return element;
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

    drawSvgElement({
      name: "circle",
      parent: svg,
      attributes: { cx: startX, cy: startY, r: DOT_RADIUS },
      handler(instance, parent) {
        instance.style.fill = parent.style.stroke;
      },
    });

    children.forEach((child) => {
      const childRect = child.getBoundingClientRect();
      const endX = childRect.left + childRect.width / 2 - svgRect.left;
      const endY = childRect.top - svgRect.top;

      drawSvgElement({
        name: "line",
        parent: svg,
        attributes: { x1: startX, y1: startY, x2: endX, y2: endY },
      });

      drawSvgElement({
        name: "circle",
        parent: svg,
        attributes: { cx: endX, cy: endY, r: DOT_RADIUS },
        handler(instance, parent) {
          instance.style.fill = parent.style.stroke;
        },
      });
    });
  });
};

document.addEventListener("DOMContentLoaded", drawLigns);
window.addEventListener("resize", drawLigns);
