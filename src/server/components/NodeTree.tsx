import { setPageContext } from "../context";
import type { Item, Node } from "../recettes";
import { tags } from "client:script/recettes-tree";

const DOT_RADIUS = 2;
const DATA_NAME = "data-recette-element";

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

export const drawLigns = () => {
  Array.from(
    document.querySelectorAll<HTMLLIElement>(`[${DATA_NAME}]`),
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

export const NodeTree = ({
  nodes,
  level = 1,
}: {
  nodes: Array<Node | Item>;
  level?: number;
}) => {
  setPageContext({ headTags: [tags] });
  return (
    <ul
      class="flex flex-wrap justify-center gap-x-10 gap-y-5 pt-10"
      style={{ marginLeft: `${level * 1}rem` }}
    >
      {nodes
        .sort((n1, n2) => {
          // Always show nodes with no children first.
          const n1HasChildren = "children" in n1 && n1.children.length > 0;
          const n2HasChildren = "children" in n2 && n2.children.length > 0;

          if (!n1HasChildren && n2HasChildren) return -1;
          if (n1HasChildren && !n2HasChildren) return 1;
          return 0;
        })
        .map((node) => (
          <li class="relative" {...{ [DATA_NAME]: true }}>
            <a
              class="border border-gray-700 rounded px-2 py-1 bg-slate-900 shadow-xl/30"
              href={`/recettes/${node.slugs}`}
              style={`view-transition-name: ${node.slugs.replaceAll("/", "-")};`}
            >
              {node.frontmatter.nav || node.frontmatter.title}
            </a>
            {"children" in node && node.children.length > 0 && (
              <>
                <svg
                  style={`stroke: oklch(50% 0.213 ${210 + level * 30})`}
                  class="absolute inset-0 w-full h-full -z-1 stroke-1"
                  xmlns="http://www.w3.org/2000/svg"
                />
                <NodeTree nodes={node.children} level={level + 1} />
              </>
            )}
          </li>
        ))}
    </ul>
  );
};
