import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Questions fréquentes",
  description:
    "Délais, entretien, personnalisation, livraison : tout ce qu'il faut savoir avant de commander un drapeau brodé FlagMe.",
};

const GROUPS = [
  {
    title: "La personnalisation",
    items: [
      {
        q: "Je peux broder autre chose qu'une ville ?",
        a: "Oui. Un quartier, un prénom, une date, une devise, le nom d'un club amateur. La seule limite est le nombre de caractères : 20 sur la ligne principale, 26 sur la seconde. Le configurateur réduit automatiquement la taille du texte pour qu'il tienne toujours dans le drapeau.",
      },
      {
        q: "Les accents et caractères spéciaux passent ?",
        a: "Oui, y compris les accents portugais, turcs, polonais ou islandais. Les quatre styles de broderie sont fournis avec leurs jeux de caractères latins étendus.",
      },
      {
        q: "Mon pays n'est pas dans la liste.",
        a: "Écris-nous avec le nom du pays ou de la région. Chaque drapeau est redessiné à la main, ça prend quelques jours, et il entre ensuite au catalogue pour tout le monde.",
      },
      {
        q: "Je peux faire broder sur les deux faces ?",
        a: "La broderie traverse le tissu : le texte est lisible des deux côtés, en miroir au verso. Pour un texte lisible dans le bon sens des deux côtés, il faut un drapeau double épaisseur — écris-nous, on le fait sur devis.",
      },
    ],
  },
  {
    title: "Fabrication et délais",
    items: [
      {
        q: "Combien de temps avant de le recevoir ?",
        a: "Cinq jours ouvrés d'atelier, puis deux à trois jours de transport en France métropolitaine. Rien n'est fabriqué à l'avance : ton drapeau est brodé après ta commande.",
      },
      {
        q: "C'est vraiment de la broderie ?",
        a: "Oui, du fil polyester haute ténacité piqué au point satin serré, pas du flocage ni de l'impression. Le texte est en relief et se sent sous le doigt.",
      },
      {
        q: "Quel tissu ?",
        a: "Maille polyester 115 g/m², le tissu standard des drapeaux de supporter : léger, il flotte au moindre souffle, et il sèche vite. Ourlets doublés sur les quatre côtés, œillets laiton côté hampe.",
      },
    ],
  },
  {
    title: "Entretien",
    items: [
      {
        q: "Ça se lave comment ?",
        a: "Machine à 30 °C, à l'envers, sans adoucissant. Pas de sèche-linge : le tissu se déforme. La broderie ne bouge pas, c'est le tissu qu'il faut ménager.",
      },
      {
        q: "Il va décolorer au soleil ?",
        a: "Les fils et les encres de teinture sont traités anti-UV. On garantit la tenue des couleurs et de la broderie trois ans en usage normal, déplacements compris.",
      },
    ],
  },
  {
    title: "Commande et livraison",
    items: [
      {
        q: "Je peux modifier ma commande après validation ?",
        a: "Tant que la broderie n'a pas démarré, oui — soit environ 12 heures après la commande. Passé ce délai, le drapeau est déjà sur la machine.",
      },
      {
        q: "Un produit personnalisé est-il repris ?",
        a: "Un drapeau brodé à ton nom ne peut pas être remis en vente, il n'y a donc pas de rétractation classique. En revanche, un défaut de fabrication ou une erreur de notre part est repris et refait à nos frais.",
      },
      {
        q: "Vous livrez hors de France ?",
        a: "Toute l'Union européenne, plus le Royaume-Uni et la Suisse. Livraison offerte dès 80 € de commande, partout.",
      },
    ],
  },
];

export default function FaqPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 pb-16 pt-10">
      <p className="eyebrow">Questions fréquentes</p>
      <h1 className="display mt-6 text-[clamp(2.6rem,6vw,4.2rem)]">
        Tout ce qu&apos;on nous demande
      </h1>

      <div className="mt-16 space-y-14">
        {GROUPS.map((group) => (
          <section key={group.title}>
            <h2 className="eyebrow">{group.title}</h2>
            <div className="mt-4">
              {group.items.map((item) => (
                <details key={item.q} className="rule group py-5">
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-6 text-left">
                    <span className="font-semibold">{item.q}</span>
                    <span
                      aria-hidden
                      className="mt-1 shrink-0 text-ink-faint transition-transform group-open:rotate-45"
                    >
                      +
                    </span>
                  </summary>
                  <p className="mt-3 max-w-2xl leading-relaxed text-ink-soft">
                    {item.a}
                  </p>
                </details>
              ))}
            </div>
          </section>
        ))}
      </div>

      <section className="mt-24 text-center">
        <h2 className="display text-2xl">Une autre question ?</h2>
        <p className="mx-auto mt-4 max-w-sm leading-relaxed text-ink-soft">
          On répond sous 24 heures ouvrées, et c&apos;est un humain de
          l&apos;atelier qui écrit.
        </p>
        <a href="mailto:bonjour@flagme.fr" className="pill pill-light mt-7 h-12 px-6 text-[15px]">
          bonjour@flagme.fr
        </a>
        <p className="mt-10 text-sm text-ink-soft">
          Prêt à commencer ?{" "}
          <Link href="/configurateur" className="font-semibold text-ink underline underline-offset-4">
            Ouvre le configurateur
          </Link>
        </p>
      </section>
    </div>
  );
}
