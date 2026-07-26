import Link from "next/link";
import { Wordmark } from "@/components/brand/Wordmark";
import { NewsletterForm } from "./NewsletterForm";

const COLUMNS = [
  {
    title: "Boutique",
    links: [
      { href: "/configurateur", label: "Créer mon drapeau" },
      { href: "/formats", label: "Tous les formats" },
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
    <footer className="mt-24 border-t border-ink-3 bg-ink-2">
      <div className="mx-auto max-w-7xl px-5 py-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <Wordmark className="text-xl text-chalk" />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-chalk-mute">
              Drapeaux de supporter brodés à la commande. Ton pays, ta ville,
              ton histoire — cousus pour durer plus longtemps que la saison.
            </p>
          </div>

          {COLUMNS.map((column) => (
            <div key={column.title}>
              <h3 className="eyebrow text-chalk-mute">{column.title}</h3>
              <ul className="mt-4 space-y-2.5">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-chalk-dim transition-colors hover:text-flare"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h3 className="eyebrow text-chalk-mute">Le vestiaire</h3>
            <p className="mt-4 text-sm text-chalk-dim">
              Nouvelles nations, séries limitées et coulisses d&apos;atelier.
            </p>
            <NewsletterForm />
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-ink-3 pt-6 text-xs text-chalk-mute sm:flex-row sm:items-center sm:justify-between">
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
