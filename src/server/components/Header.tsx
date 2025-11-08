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
        { href: "/parcours", label: "Parcours" },
        { href: "/procedures", label: "Procédures" },
      ],
    },
    { href: "/recettes", label: "Recettes" },
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
                    // onclick="window.handleMenuNavigation(this)"
                  >
                    {" "}
                    {n.label}{" "}
                  </Link>
                )}
                {"children" in n && (
                  <select
                    class={`cursor-pointer mx-3 tracking-wide text-2xl decoration-1 underline-offset-10`}
                  >
                    {n.children.map((c) => (
                      <option
                        value={n.label}
                        onclick="window.handleMenuSelect(this)"
                      >
                        <Link href={c.href}>{c.label}</Link>
                      </option>
                    ))}
                  </select>
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
