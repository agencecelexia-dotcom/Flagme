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
      { href: "/faq", label: "Questions fréquentes" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="mt-28">
      <div className="mx-auto max-w-7xl px-5">
        <div className="rule grid gap-12 pt-14 md:grid-cols-[1.5fr_1fr_1fr_1.2fr]">
          <div>
            <Wordmark className="text-xl" />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-soft">
              Drapeaux de supporter brodés à la commande. Ton pays, ta ville,
              cousus pour durer plus longtemps que la saison.
            </p>
          </div>

          {COLUMNS.map((column) => (
            <div key={column.title}>
              <h3 className="eyebrow">{column.title}</h3>
              <ul className="mt-5 space-y-3">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-ink-soft transition-colors hover:text-ink"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h3 className="eyebrow">Le vestiaire</h3>
            <p className="mt-5 text-sm text-ink-soft">
              Nouvelles nations et coulisses d&apos;atelier.
            </p>
            <NewsletterForm />
          </div>
        </div>

        <div className="rule mt-14 flex flex-col gap-3 py-7 text-xs text-ink-faint sm:flex-row sm:items-center sm:justify-between">
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
