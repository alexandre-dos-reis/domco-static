import type { PageConfig } from "../types";
import pictureId from "@/server/assets/photo-id.jpg";

export const config = { title: "Parcours" } satisfies PageConfig;

export default () => (
  <div>
    <section class="flex justify-center">
      <img
        src={pictureId}
        alt="Photo Alexandre Dos Reis"
        class="rounded-full"
      />
    </section>
    <section>
      <h2>Parcours Pro</h2>
      <p>
        Après mon lycée dans le Val d'Oise. J'ai été diplomé en 2011 de{" "}
        <a
          href="https://www.esra.edu"
          target="_blank"
          rel="noreferrer noopener"
        >
          l'ESRA
        </a>{" "}
        Paris et j'ai travaillé pendant 7 années pour{" "}
        <a
          href="https://www.gum.paris"
          target="_blank"
          rel="noreferrer noopener"
        >
          Green United Music
        </a>{" "}
        et{" "}
        <a
          href="https://prod.generalpop.com/fr"
          target="_blank"
          rel="noreferrer noopener"
        >
          Pop Productions
        </a>
        dans la production sonore en tant qu'ingénieur du son.
      </p>
      <p>
        En 2019, j'ai décidé d'effectuer une reconversion professionelle en
        informatique et j'ai débuté un{" "}
        <b>BTS Service Informatique aux Organisations Option Réseau</b> en
        alternance à Caen. J'ai passé ces 2 années au sein d'
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
          HR-Path
        </a>{" "}
        comme Technicien d'exploitation.
      </p>{" "}
      <p>
        Puis en 2021, j'ai débuté une licence en{" "}
        <b>Développement d'application Web &amp; Mobile</b> dispensée au lycée
        Sup'Avenir à Caen. Cette formation est conduite par le
        <a href="https://www.cnam.fr" target="_blank" rel="noreferrer noopener">
          CNAM
        </a>
        . Durant cette année, j'ai été employé par{" "}
        <a
          href="https://www.volvotrucks.fr/fr-fr"
          target="_blank"
          rel="noreferrer noopener"
        >
          Volvo Trucks
        </a>{" "}
        à Blainville-Sur-Orne en tant que Développeur digital &amp; IT.
      </p>{" "}
      <p>
        Le détail de mon parcours est disponible sur{" "}
        <a
          href="https://fr.linkedin.com/in/Linklexandre-dos-reis-469708133"
          target="_blank"
          rel="noreferrer noopener"
        >
          LinkedIn
        </a>
      </p>
    </section>
  </div>
);
