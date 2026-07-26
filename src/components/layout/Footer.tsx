import Link from "next/link";
import { Wordmark } from "@/components/brand/Wordmark";
import { NewsletterForm } from "./NewsletterForm";

const COLUMNS = [
  {
    title: "Boutique",
    links: [
      { href: "/configurateur", label: "Créer mon drapeau" },
      { href: "/euro-2028", label: "Spécial Euro 2028" },
      { href: "/formats", label: "Toutes les tailles" },
      { href: "/panier", label: "Mon panier" },
    ],
  },
  {
    title: "La marque",
    links: [
      { href: "/manifeste", label: "Le manifeste" },
      { href: "/faq", label: "Questions fréquentes" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="edge-t bg-ink text-paper">
      <div className="mx-auto max-w-7xl px-4 py-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <Wordmark className="text-2xl text-paper" />
            <p className="mt-4 max-w-xs text-sm font-semibold leading-relaxed text-paper/70">
              Drapeaux de supporter brodés à la commande. Ton pays, ta ville,
              ton histoire — cousus pour durer plus longtemps que la saison.
            </p>
          </div>

          {COLUMNS.map((column) => (
            <div key={column.title}>
              <h3 className="hud text-lemon">{column.title}</h3>
              <ul className="mt-4 space-y-2.5">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm font-semibold text-paper/80 underline-offset-4 transition-colors hover:text-lemon hover:underline"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h3 className="hud text-lemon">Le vestiaire</h3>
            <p className="mt-4 text-sm font-semibold text-paper/70">
              Nouvelles nations, séries limitées et coulisses d&apos;atelier.
            </p>
            <NewsletterForm />
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t-[3px] border-paper/20 pt-6 text-xs font-semibold text-paper/60 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} FlagMe — Fabriqué et brodé en Europe.</p>
          <p className="flex gap-5">
            <span>Mentions légales</span>
            <span>CGV</span>
            <span>Livraison &amp; retours</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
