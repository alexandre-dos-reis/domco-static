import pictureId from "@/server/assets/photo-id.jpg";
import { setPageContext } from "@/server/context";

export default () => {
  setPageContext({ title: "Parcours" });
  return (
    <div>
      <section class="flex justify-center">
        <img
          src={pictureId}
          alt="Photo Alexandre Dos Reis"
          class="rounded-full"
        />
      </section>
      <section>
        <h2>Parcours Professionnel</h2>
        <p>
          Après avoir terminé mon lycée dans le Val-d’Oise, j’ai obtenu en 2011
          mon diplôme de{" "}
          <a
            href="https://www.esra.edu"
            target="_blank"
            rel="noreferrer noopener"
          >
            l’ESRA
          </a>{" "}
          Paris. J’ai ensuite travaillé pendant sept ans au sein de{" "}
          <a
            href="https://www.gum.paris"
            target="_blank"
            rel="noreferrer noopener"
          >
            Green United Music
          </a>{" "}
          et de{" "}
          <a
            href="https://prod.generalpop.com/fr"
            target="_blank"
            rel="noreferrer noopener"
          >
            Pop Productions
          </a>{" "}
          en tant qu’ingénieur du son, dans le domaine de la production sonore.
        </p>
        <p>
          En 2019, j’ai choisi d’entreprendre une reconversion professionnelle
          dans le domaine de l’informatique. J’ai ainsi débuté un{" "}
          <b>BTS Services Informatiques aux Organisations – option Réseaux</b>{" "}
          en alternance à Caen. Durant ces deux années, j’ai travaillé au sein
          d’{" "}
          <a
            href="https://www.universpaie.com/"
            target="_blank"
            rel="noreferrer noopener"
          >
            Univers Paie
          </a>{" "}
          du groupe{" "}
          <a
            href="https://www.hr-path.com/fr"
            target="_blank"
            rel="noreferrer noopener"
          >
            HR Path
          </a>{" "}
          en tant que technicien d’exploitation.
        </p>
        <p>
          En 2021, j’ai poursuivi mon parcours avec une licence en{" "}
          <b>Développement d’applications Web &amp; Mobile</b> dispensée au
          lycée Sup’Avenir à Caen, en partenariat avec le{" "}
          <a
            href="https://www.cnam.fr"
            target="_blank"
            rel="noreferrer noopener"
          >
            CNAM
          </a>
          . Au cours de cette année, j’ai occupé le poste de développeur digital
          &amp; IT chez{" "}
          <a
            href="https://www.volvotrucks.fr/fr-fr"
            target="_blank"
            rel="noreferrer noopener"
          >
            Volvo Trucks
          </a>{" "}
          à Blainville-sur-Orne.
        </p>
        <p>
          Le détail complet de mon parcours est disponible sur{" "}
          <a
            href="https://fr.linkedin.com/in/Linklexandre-dos-reis-469708133"
            target="_blank"
            rel="noreferrer noopener"
          >
            LinkedIn
          </a>
          .
        </p>
      </section>
    </div>
  );
};
