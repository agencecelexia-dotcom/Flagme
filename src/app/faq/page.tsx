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
    <div className="mx-auto max-w-4xl px-5 py-12">
      <p className="eyebrow text-flare">Questions fréquentes</p>
      <h1 className="brand-title mt-3 text-[clamp(2.6rem,7vw,5rem)] text-chalk">
        Tout ce qu&apos;on nous demande
      </h1>

      <div className="mt-14 space-y-14">
        {GROUPS.map((group) => (
          <section key={group.title}>
            <h2 className="brand-title text-2xl text-flare">{group.title}</h2>
            <div className="mt-5 divide-y divide-ink-3 border-y border-ink-3">
              {group.items.map((item) => (
                <details key={item.q} className="group py-5">
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-6 text-left">
                    <span className="font-semibold text-chalk">{item.q}</span>
                    <span
                      aria-hidden
                      className="mt-1 shrink-0 text-chalk-mute transition-transform group-open:rotate-45"
                    >
                      +
                    </span>
                  </summary>
                  <p className="mt-3 max-w-2xl text-sm leading-relaxed text-chalk-dim">
                    {item.a}
                  </p>
                </details>
              ))}
            </div>
          </section>
        ))}
      </div>

      <section className="mt-20 rounded-brand border border-ink-3 bg-ink-2 p-8 text-center">
        <h2 className="brand-title text-3xl text-chalk">Une autre question&nbsp;?</h2>
        <p className="mx-auto mt-3 max-w-sm text-sm text-chalk-dim">
          On répond sous 24 heures ouvrées, et c&apos;est un humain de
          l&apos;atelier qui écrit.
        </p>
        <a
          href="mailto:bonjour@flagme.fr"
          className="mt-6 inline-flex h-12 items-center rounded-brand border border-ink-4 px-6 text-sm font-bold text-chalk transition-colors hover:border-flare hover:text-flare"
        >
          bonjour@flagme.fr
        </a>
        <p className="mt-8 text-xs text-chalk-mute">
          Prêt à commencer&nbsp;?{" "}
          <Link href="/configurateur" className="font-bold text-flare underline-offset-4 hover:underline">
            Ouvre le configurateur
          </Link>
        </p>
      </section>
    </div>
  );
}
