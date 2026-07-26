import Link from "next/link";
import { Wordmark } from "@/components/brand/Wordmark";
import { NewsletterForm } from "./NewsletterForm";

const COLUMNS = [
  {
    title: "Boutique",
    links: [
      { href: "/configurateur", label: "Créer mon drapeau" },
      { href: "/euro-2028", label: "Euro 2028" },
      { href: "/formats", label: "Formats" },
      { href: "/panier", label: "Panier" },
    ],
  },
  {
    title: "La marque",
    links: [
      { href: "/manifeste", label: "Manifeste" },
      { href: "/qualite", label: "Qualité" },
      { href: "/faq", label: "Questions fréquentes" },
    ],
  },
];

export function Footer() {
  return (
    /* Le pied de page tranche en encre : c'est le seul aplat sombre du site,
       et il sert de fin de parcours nette. */
    <footer className="mt-28 bg-ink text-bone">
      <div className="mx-auto max-w-7xl px-5">
        <div className="grid grid-cols-1 gap-12 pt-16 md:grid-cols-[1.5fr_1fr_1fr_1.2fr]">
          <div>
            <Wordmark className="text-xl" />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-bone/60">
              Drapeaux de supporter brodés à la commande. Ton pays, ta ville,
              cousus pour durer plus longtemps que la saison.
            </p>
          </div>

          {COLUMNS.map((column) => (
            <div key={column.title}>
              <h3 className="eyebrow text-clay">{column.title}</h3>
              <ul className="mt-5 space-y-3">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-bone/70 transition-colors hover:text-bone"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h3 className="eyebrow text-clay">Le vestiaire</h3>
            <p className="mt-5 text-sm text-bone/70">
              Nouvelles nations et coulisses d&apos;atelier.
            </p>
            <NewsletterForm />
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-bone/15 py-8 text-xs text-bone/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} FlagMe — Brodé en Europe.</p>
          <p className="flex gap-6">
            <span>Mentions légales</span>
            <span>CGV</span>
            <span>Livraison &amp; retours</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
