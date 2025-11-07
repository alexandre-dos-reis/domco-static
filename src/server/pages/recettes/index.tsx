import { setPageContext } from "@/server/context";
import { getRecettesTree, type Item, type Node } from "@/server/recettes";

import { tags } from "client:script/recettes-tree";

const NodeTree = ({
  nodes,
  level = 1,
}: {
  nodes: Array<Node | Item>;
  level?: number;
}) => (
  <ul
    class="flex flex-wrap gap-5 pt-4"
    style={{ marginLeft: `${level * 1}rem` }}
  >
    {nodes.map((node) => (
      <li>
        <a
          class="relative border border-gray-700 rounded px-2 py-1 bg-slate-900"
          href={`/recettes/${node.slugs}`}
          style={`view-transition-name: ${node.slugs.replaceAll("/", "-")};`}
          data-recette-element
        >
          {node.frontmatter.nav ||
            node.frontmatter.title ||
            node.slugs.replace(/^.*\//g, "")}
        </a>
        {"children" in node && node.children.length > 0 && (
          <NodeTree nodes={node.children} />
        )}
      </li>
    ))}
  </ul>
);

export default async () => {
  setPageContext({ headTags: [tags] });
  return <NodeTree nodes={await getRecettesTree()} />;
};
