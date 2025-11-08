import { NodeTree } from "@/server/components/NodeTree";
import { setPageContext } from "@/server/context";
import { getRecettesTree } from "@/server/recettes";

export default async () => {
  setPageContext({ title: "Recettes" });
  return <NodeTree nodes={await getRecettesTree()} />;
};
