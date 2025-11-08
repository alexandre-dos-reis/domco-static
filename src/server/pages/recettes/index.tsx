import { NodeTree } from "@/server/components/NodeTree";
import { setPageContext } from "@/server/context";
import { getRecettesTree } from "@/server/recettes";
import { tags } from "client:script/recettes-tree";

export default async () => {
  setPageContext({ title: "Recettes", headTags: [tags] });
  return <NodeTree nodes={await getRecettesTree()} />;
};
