import { setPageContext } from "../context";
import type { Item, Node } from "../recettes";
import { tags } from "client:script/recettes-tree";

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
          <li class="relative" data-recette-element>
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
