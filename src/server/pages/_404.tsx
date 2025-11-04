import { setPageContext } from "../storages";

export default () => {
  setPageContext({ title: "404", disableSEO: true });
  return <div>Erreur 404</div>;
};
