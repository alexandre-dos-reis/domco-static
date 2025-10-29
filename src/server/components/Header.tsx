import { Link } from "./Link";

export const Header = ({ pathname }: { pathname: string }) => {
  const navLinks: { href: string; label: string }[] = [
    {
      href: "/",
      label: "Accueil",
    },
    { href: "/blog", label: "Blog" },
    { href: "/parcours", label: "Parcours" },
    {
      href: "mailto:ajm.dosreis.daponte@gmail.com",
      label: "Contact",
    },
  ];

  return (
    <header class="w-full mx-auto p-4 sticky top-0 backdrop-blur-md z-50">
      <div class="max-w-3xl mx-auto flex flex-wrap md:flex-nowrap handwriting">
        <Link
          class="no-underline text-4xl w-full text-center md:text-left mb-6 md:mb-0"
          href="/"
        >
          Alexandre&nbsp;Dos&nbsp;Reis
        </Link>
        <nav class="w-full">
          <ul class="flex w-full h-full list-none justify-center md:justify-end">
            {navLinks.map((n, i) => (
              <li class="flex justify-center items-end m-0">
                <Link
                  href={n.href}
                  class={`mx-3 tracking-wide text-2xl decoration-1 underline-offset-10 ${n.href === pathname && "underline"}`}
                  onclick="window.handleMenuNavigation(this)"
                >
                  {" "}
                  {n.label}{" "}
                </Link>{" "}
                {i === navLinks.length - 1 ? "" : " |"}{" "}
              </li>
            ))}{" "}
          </ul>{" "}
        </nav>
      </div>
    </header>
  );
};
