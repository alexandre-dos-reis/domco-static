import { getRecettesTree, type Item, type Node } from "@/server/recettes";

const NodeTree = ({
  node,
  level = 1,
}: {
  node: Node | Item;
  level?: number;
}) => (
  <li>
    <a
      class="border border-gray-700 rounded px-2 py-1 bg-slate-900"
      href={`/recettes/${node.slugs}`}
      style={`view-transition-name: ${node.slugs.replaceAll("/", "-")};`}
    >
      {node.frontmatter.nav ||
        node.frontmatter.title ||
        node.slugs.replace(/^.*\//g, "")}
    </a>
    {"children" in node && node.children.length > 0 && (
      <ul
        class="flex flex-wrap gap-5 pt-4"
        style={{ marginLeft: `${level * 1}rem` }}
      >
        {node.children.map((n) => (
          <NodeTree node={n} level={level + 1} />
        ))}
      </ul>
    )}
  </li>
);

export default async () => {
  const recettesTree = await getRecettesTree();

  return (
    <ul>
      {recettesTree.map((node) => (
        <NodeTree node={node} />
      ))}
    </ul>
  );
};
