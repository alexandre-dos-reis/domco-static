import { Link } from "./Link";

export const Header = ({ pathname }: { pathname: string }) => {
  type NavLink = { href: string; label: string };

  const navLinks: (
    | NavLink
    | {
        label: string;
        children: Array<NavLink>;
      }
  )[] = [
    {
      href: "/",
      label: "Accueil",
    },
    {
      label: "Blog",
      children: [
        { href: "/procedures", label: "Procédures" },
        { href: "/recettes", label: "Recettes" },
      ],
    },
    { href: "/parcours", label: "Parcours" },
    {
      href: "mailto:ajm.dosreis.daponte@gmail.com",
      label: "Contact",
    },
  ];

  return (
    <header class="w-full mx-auto p-4 sticky top-0 bg-gray-800/90 backdrop-blur-md z-50">
      <div class="max-w-3xl mx-auto flex flex-wrap md:flex-nowrap handwriting">
        <Link
          class="no-underline text-3xl font-semibold w-full text-center md:text-left mb-6 md:mb-0"
          href="/"
        >
          Alexandre&nbsp;Dos&nbsp;Reis
        </Link>
        <nav class="w-full">
          <ul class="flex w-full h-full list-none items-center justify-center md:justify-end">
            {navLinks.map((n, i) => (
              <li class="flex justify-center items-end">
                {"href" in n && (
                  <Link
                    href={n.href}
                    class={`mx-3 tracking-wide text-2xl decoration-1 underline-offset-10 ${n.href === pathname && "underline"}`}
                  >
                    {" "}
                    {n.label}{" "}
                  </Link>
                )}
                {"children" in n && (
                  <details class="cursor-pointer relative bg-gray-800 text-gray-300">
                    <summary
                      class={`mx-3 tracking-wide text-2xl decoration-1 underline-offset-10`}
                    >
                      {n.label}
                    </summary>
                    <ul class="absolute flex flex-col gap-2 mt-2 bg-gray-800 text-gray-300">
                      {n.children.map((c) => (
                        <li>
                          <Link
                            class={`mx-3 tracking-wide text-2xl decoration-1 underline-offset-10`}
                            href={c.href}
                          >
                            {c.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </details>
                )}
                {i === navLinks.length - 1 ? "" : " |"}{" "}
              </li>
            ))}{" "}
          </ul>{" "}
        </nav>
      </div>
    </header>
  );
};
