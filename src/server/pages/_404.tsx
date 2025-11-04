import { setPageContext } from "../context";

export default () => {
  setPageContext({ title: "404", disableSEO: true });
  return <div>Erreur 404</div>;
};
