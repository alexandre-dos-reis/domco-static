import gum from "@/server/assets/gum.jpg";
import volvo from "@/server/assets/volvo.jpg";
import finishers from "@/server/assets/finishers.jpg";
import up from "@/server/assets/univers-paie.jpg";
import gilleAgri from "@/server/assets/gille-agri.fr.png";
import { setPageContext } from "@/server/context";

export default () => {
  setPageContext({ title: "Accueil" });
  return (
    <div>
      <section>
        <h2>Qui suis-je ? 🕵️‍♂️</h2>
        <p>
          Bonjour 👋 je m'appelle{" "}
          <span class="text-rose-400 text-lg">Alexandre Dos Reis</span> et je
          suis développeur fullstack depuis 2019. Depuis Juin 2025, je suis à la
          recherche d'un emploi.
        </p>
        <p>
          Ce site me sert de portfolio mais aussi de recueil d'articles et
          procédures écrit pendant mes études, visible dans la partie{" "}
          <a href="/blog">blog</a>.
        </p>
        <div class="flex flex-wrap items-center gap-x-4">
          <p>Retrouvez-moi sur :</p>
          <ul class="flex items-center flex-1 sm:flex-initial list-none gap-x-4">
            <li class="list-none">
              <a
                class="inline-block hover:opacity-60"
                href="https://www.linkedin.com/in/a-dos-reis"
                target="_blank"
                rel="noreferrer noopener"
              >
                <img
                  width="26"
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg"
                />
              </a>
            </li>
            <li class="list-none">
              <a
                class="inline-block hover:opacity-60"
                href="https://github.com/alexandre-dos-reis"
                target="_blank"
                rel="noreferrer noopener"
              >
                <svg width="28" viewBox="0 0 128 128">
                  <g fill="white">
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M64 5.103c-33.347 0-60.388 27.035-60.388 60.388 0 26.682 17.303 49.317 41.297 57.303 3.017.56 4.125-1.31 4.125-2.905 0-1.44-.056-6.197-.082-11.243-16.8 3.653-20.345-7.125-20.345-7.125-2.747-6.98-6.705-8.836-6.705-8.836-5.48-3.748.413-3.67.413-3.67 6.063.425 9.257 6.223 9.257 6.223 5.386 9.23 14.127 6.562 17.573 5.02.542-3.903 2.107-6.568 3.834-8.076-13.413-1.525-27.514-6.704-27.514-29.843 0-6.593 2.36-11.98 6.223-16.21-.628-1.52-2.695-7.662.584-15.98 0 0 5.07-1.623 16.61 6.19C53.7 35 58.867 34.327 64 34.304c5.13.023 10.3.694 15.127 2.033 11.526-7.813 16.59-6.19 16.59-6.19 3.287 8.317 1.22 14.46.593 15.98 3.872 4.23 6.215 9.617 6.215 16.21 0 23.194-14.127 28.3-27.574 29.796 2.167 1.874 4.097 5.55 4.097 11.183 0 8.08-.07 14.583-.07 16.572 0 1.607 1.088 3.49 4.148 2.897 23.98-7.994 41.263-30.622 41.263-57.294C124.388 32.14 97.35 5.104 64 5.104z"
                    ></path>
                    <path d="M26.484 91.806c-.133.3-.605.39-1.035.185-.44-.196-.685-.605-.543-.906.13-.31.603-.395 1.04-.188.44.197.69.61.537.91zm2.446 2.729c-.287.267-.85.143-1.232-.28-.396-.42-.47-.983-.177-1.254.298-.266.844-.14 1.24.28.394.426.472.984.17 1.255zM31.312 98.012c-.37.258-.976.017-1.35-.52-.37-.538-.37-1.183.01-1.44.373-.258.97-.025 1.35.507.368.545.368 1.19-.01 1.452zm3.261 3.361c-.33.365-1.036.267-1.552-.23-.527-.487-.674-1.18-.343-1.544.336-.366 1.045-.264 1.564.23.527.486.686 1.18.333 1.543zm4.5 1.951c-.147.473-.825.688-1.51.486-.683-.207-1.13-.76-.99-1.238.14-.477.823-.7 1.512-.485.683.206 1.13.756.988 1.237zm4.943.361c.017.498-.563.91-1.28.92-.723.017-1.308-.387-1.315-.877 0-.503.568-.91 1.29-.924.717-.013 1.306.387 1.306.88zm4.598-.782c.086.485-.413.984-1.126 1.117-.7.13-1.35-.172-1.44-.653-.086-.498.422-.997 1.122-1.126.714-.123 1.354.17 1.444.663zm0 0"></path>
                  </g>
                </svg>
              </a>
            </li>
            <li class="list-none">
              <a
                class="inline-block hover:opacity-60"
                href="mailto:ajm.dosreis.daponte@gmail.com"
              >
                <svg
                  width="32"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <rect x="3" y="5" width="18" height="14" rx="2"></rect>
                  <polyline points="3 7 12 13 21 7"></polyline>
                </svg>
              </a>
            </li>
          </ul>
        </div>
      </section>
      <section>
        <h2>Mes compétences 🤹</h2>
        <p>
          Mes principales compétences sont le développement d'application web,
          depuis la modélisation de données jusqu'à l'interface utilisateur, en
          passant par l'infrastructure et l'administration système.
        </p>
      </section>
      <section>
        <h2>Les technos 👨‍💻</h2>
        <p>Actuellement les technos que je privilégie sont:</p>
        <p class="flex flex-wrap gap-y-2 mb-8">
          <span class="bg-gray-700 py-1 px-2 m-1 rounded-xl whitespace-nowrap text-gray-50 font-semibold">
            Neovim
          </span>
          <span class="bg-gray-700 py-1 px-2 m-1 rounded-xl whitespace-nowrap text-gray-50 font-semibold">
            NodeJS
          </span>
          <span class="bg-gray-700 py-1 px-2 m-1 rounded-xl whitespace-nowrap text-gray-50 font-semibold">
            Bun
          </span>
          <span class="bg-gray-700 py-1 px-2 m-1 rounded-xl whitespace-nowrap text-gray-50 font-semibold">
            React
          </span>
          <span class="bg-gray-700 py-1 px-2 m-1 rounded-xl whitespace-nowrap text-gray-50 font-semibold">
            NextJS
          </span>
          <span class="bg-gray-700 py-1 px-2 m-1 rounded-xl whitespace-nowrap text-gray-50 font-semibold">
            Typescript
          </span>
          <span class="bg-gray-700 py-1 px-2 m-1 rounded-xl whitespace-nowrap text-gray-50 font-semibold">
            tRPC
          </span>
          <span class="bg-gray-700 py-1 px-2 m-1 rounded-xl whitespace-nowrap text-gray-50 font-semibold">
            Docker
          </span>
          <span class="bg-gray-700 py-1 px-2 m-1 rounded-xl whitespace-nowrap text-gray-50 font-semibold">
            PostGreSQL
          </span>
          <span class="bg-gray-700 py-1 px-2 m-1 rounded-xl whitespace-nowrap text-gray-50 font-semibold">
            Nix
          </span>
          <span class="bg-gray-700 py-1 px-2 m-1 rounded-xl whitespace-nowrap text-gray-50 font-semibold">
            Ghostty
          </span>
          <span class="bg-gray-700 py-1 px-2 m-1 rounded-xl whitespace-nowrap text-gray-50 font-semibold">
            Tmux
          </span>
          <span class="bg-gray-700 py-1 px-2 m-1 rounded-xl whitespace-nowrap text-gray-50 font-semibold">
            Directus
          </span>
          <span class="bg-gray-700 py-1 px-2 m-1 rounded-xl whitespace-nowrap text-gray-50 font-semibold">
            Caddy
          </span>
          <span class="bg-gray-700 py-1 px-2 m-1 rounded-xl whitespace-nowrap text-gray-50 font-semibold">
            Plausible
          </span>
        </p>
        <p>Mais je connais aussi:</p>
        <p class="flex flex-wrap gap-y-2 mb-8">
          <span class="bg-gray-700 py-1 px-2 m-1 rounded-xl whitespace-nowrap text-gray-50 font-semibold">
            GraphQL
          </span>
          <span class="bg-gray-700 py-1 px-2 m-1 rounded-xl whitespace-nowrap text-gray-50 font-semibold">
            Astro
          </span>
          <span class="bg-gray-700 py-1 px-2 m-1 rounded-xl whitespace-nowrap text-gray-50 font-semibold">
            Dotnet
          </span>
          <span class="bg-gray-700 py-1 px-2 m-1 rounded-xl whitespace-nowrap text-gray-50 font-semibold">
            Angular
          </span>
          <span class="bg-gray-700 py-1 px-2 m-1 rounded-xl whitespace-nowrap text-gray-50 font-semibold">
            Sql Server
          </span>
          <span class="bg-gray-700 py-1 px-2 m-1 rounded-xl whitespace-nowrap text-gray-50 font-semibold">
            Symfony
          </span>
          <span class="bg-gray-700 py-1 px-2 m-1 rounded-xl whitespace-nowrap text-gray-50 font-semibold">
            VSCode
          </span>
        </p>
      </section>
      <section>
        <h2>Mes derniers jobs 🏬</h2>
        <div class="grid justify-center md:grid-cols-2 lg:grid-cols-2 gap-6 lg:gap-7 mb-3 mt-4">
          <a
            class="relative overflow-hidden rounded-lg group"
            href="https://www.finishers.com"
            target="_blank"
            rel="noreferrer noopener"
          >
            <img
              src={finishers}
              alt="Finishers"
              class="h-56 w-full object-cover transition-all opacity-30 group-hover:opacity-20 group-hover:scale-105"
              width="750"
              height="422"
              loading="lazy"
              decoding="async"
            />
            <div class="absolute inset-0 group-hover:text-white text-sm m-3">
              <h4 class="absolute top-0 mt-0 font-bold text-2xl">Finishers</h4>
              <p class="absolute bottom-0 font-bold">
                Full stack developper
                <br /> Déc 2022 - Juin 2025
              </p>
            </div>
          </a>
          <a
            class="relative overflow-hidden rounded-lg group"
            href="https://www.volvogroup.com/fr"
            target="_blank"
            rel="noreferrer noopener"
          >
            <img
              src={volvo}
              alt="Volvo trucks blainville"
              class="h-56 w-full object-cover transition-all opacity-30 group-hover:opacity-20 group-hover:scale-105"
              width="1068"
              height="730"
              loading="lazy"
              decoding="async"
            />
            <div class="absolute inset-0 group-hover:text-white text-sm m-3">
              <h4 class="absolute top-0 mt-0 font-bold text-2xl">
                Volvo Trucks
              </h4>
              <p class="absolute bottom-0 font-bold">
                Digital &amp; IT developer
                <br /> Oct 2021 - Août 2022
              </p>
            </div>
          </a>
          <a
            class="relative overflow-hidden rounded-lg group"
            href="https://www.linkedin.com/company/univers-paie"
            target="_blank"
            rel="noreferrer noopener"
          >
            <img
              src={up}
              alt="Univers Paie | Hr Path"
              class="h-56 w-full object-cover transition-all opacity-30 group-hover:opacity-20 group-hover:scale-105"
              width="1280"
              height="719"
              loading="lazy"
              decoding="async"
            />
            <div class="absolute inset-0 group-hover:text-white text-sm m-3">
              <h4 class="absolute top-0 mt-0 font-bold text-2xl">
                HR-Path Univers Paie
              </h4>
              <p class="absolute bottom-0 font-bold">
                Technicien d'exploitation
                <br /> Sept 2019 - Août 2021
              </p>
            </div>
          </a>
          <a
            class="relative overflow-hidden rounded-lg group"
            href="https://www.gum.paris"
            target="_blank"
            rel="noreferrer noopener"
          >
            <img
              src={gum}
              alt=""
              class="h-56 w-full object-cover transition-all opacity-30 group-hover:opacity-20 group-hover:scale-105"
              width="1400"
              height="800"
              loading="lazy"
              decoding="async"
            />
            <div class="absolute inset-0 group-hover:text-white text-sm m-3">
              <h4 class="absolute top-0 mt-0 font-bold text-2xl">
                Green United Music
              </h4>
              <p class="absolute bottom-0 font-bold">
                Ingénieur du son
                <br /> Mai 2012 - Juin 2019
              </p>
            </div>
          </a>
        </div>
      </section>
      <section>
        <h2 class="mb-4">Mes derniers projets 🎁</h2>
        <div class="w-full grid grid-cols-1 md:grid-cols-2 mb-6 gap-6 rounded-lg">
          <a
            class="overflow-hidden rounded-lg h-[200px]"
            href="https://gille-agri.fr"
            target="_blank"
            rel="noreferrer noopener"
          >
            <img
              src={gilleAgri}
              class="block w-full h-56 object-cover transition-all opacity-70 hover:opacity-30 hover:scale-105"
            />
          </a>
          <div class="mx-6 mb-6 md:m-5 md:ml-0">
            <h3 class="mt-0 font-normal">
              <a
                href="https://gille-agri.fr"
                target="_blank"
                rel="noreferrer noopener"
              >
                Le Goff &amp; Gille
              </a>
            </h3>
            <p>Vendeur spécialisé de matériel agricole et motoculture</p>
            <p class="mb-0 flex flex-wrap text-sm">
              <span class="bg-[#97890C] py-1 px-2 m-1 rounded-xl whitespace-nowrap text-gray-50 font-semibold">
                NextJS
              </span>
              <span class="bg-[#607D8B] py-1 px-2 m-1 rounded-xl whitespace-nowrap text-gray-50 font-semibold">
                Directus
              </span>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
