import { NodeTree } from "@/server/components/NodeTree";
import { setPageContext } from "@/server/context";
import { getRecettesTree } from "@/server/recettes";
/*
 * This is a hack, asyncLocalStorage is bugged !
 * Importing tags from NodeTree isn't working...
 * */
import { tags } from "client:script/node-tree";

export default async () => {
  setPageContext({ title: "Recettes", headTags: [tags] });
  return (
    <>
      <h1>Recettes</h1>
      <NodeTree disableRoot nodes={await getRecettesTree()} />
    </>
  );
};
