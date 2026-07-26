import type { Metadata } from "next";
import Link from "next/link";
import { FlagPreview } from "@/components/flag/FlagPreview";
import { getCountry } from "@/data/countries";

export const metadata: Metadata = {
  title: "Le manifeste",
  description:
    "Pourquoi FlagMe existe : le drapeau de supporter comme carte d'identité, pas comme produit dérivé.",
};

const PILLARS = [
  {
    title: "Le nom d'abord",
    body: "Un drapeau FlagMe se lit de loin. Le pays donne le fond, le texte donne la personne. C'est le nom qui doit sauter aux yeux, pas notre logo — que tu ne trouveras nulle part sur le produit.",
  },
  {
    title: "Brodé, jamais imprimé",
    body: "L'impression s'écaille, le fil tient. On brode au point satin serré parce qu'un drapeau se plie, se trempe, se déplie sous la pluie et repart la semaine suivante.",
  },
  {
    title: "Aucune nation par défaut",
    body: "Chaque drapeau du catalogue est dessiné à la main dans nos fichiers, pas récupéré dans une banque d'images. Il en manque un ? Écris-nous, on l'ajoute.",
  },
  {
    title: "À la commande, jamais en stock",
    body: "Rien n'est fabriqué avant d'être commandé. Pas d'invendus, pas de surproduction, pas de carton de drapeaux « MANCHESTER » qui dort dans un entrepôt.",
  },
];

export default function ManifestoPage() {
  const england = getCountry("gb-eng")!;

  return (
    <div className="mx-auto max-w-7xl px-5 py-12">
      <p className="eyebrow text-flare">Le manifeste</p>
      <h1 className="brand-title mt-3 max-w-4xl text-[clamp(2.8rem,8vw,6rem)] text-chalk">
        Un drapeau, c&apos;est une adresse
      </h1>

      <div className="mt-14 grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
        <div className="space-y-6 text-lg leading-relaxed text-chalk-dim">
          <p className="text-2xl leading-snug text-chalk">
            Dans les tribunes anglaises, il y a une tradition que personne
            n&apos;a jamais écrite&nbsp;: tu pars en déplacement avec le drapeau
            de ton pays, et tu couds dessus le nom de ta ville.
          </p>
          <p>
            Pas pour décorer. Pour dire qui tu es. Un drapeau nu appartient à
            tout le monde&nbsp;; un drapeau avec «&nbsp;WIGAN&nbsp;» ou
            «&nbsp;SAINT-DENIS&nbsp;» brodé dessus appartient à une seule
            personne. C&apos;est un passeport tendu à bout de bras, lisible
            depuis la pelouse et depuis les caméras.
          </p>
          <p>
            Ces drapeaux-là ne s&apos;achètent nulle part. Ils se fabriquent
            dans une cuisine, se réparent au fil de coton, se transmettent. On a
            trouvé ça trop beau pour le laisser à ceux qui savent coudre.
          </p>
          <p className="border-l-2 border-flare pl-6 text-chalk">
            FlagMe, c&apos;est cet objet-là, fabriqué proprement. Tu choisis ton
            pays, tu écris ta ville, on brode. Le reste — le logo, la marque, la
            saison — n&apos;a aucune importance.
          </p>
          <p>
            Et parce qu&apos;un drapeau ne parle pas que de football, la moitié
            de nos clients ne mettent jamais les pieds au stade. Ils brodent le
            village de leurs grands-parents, la ville où ils sont nés, celle
            qu&apos;ils ont quittée. Ça marche aussi bien.
          </p>
        </div>

        <div className="lg:sticky lg:top-28">
          <FlagPreview
            spec={england.spec}
            waving
            text={{
              line1: "Wigan",
              line2: "One of our own",
              fontId: "terrace",
              threadId: "navy",
              outlineId: "none",
              placementId: "bottom",
              sizeId: "m",
            }}
            className="drop-shadow-[0_25px_60px_rgba(0,0,0,0.7)]"
          />
          <p className="mt-4 text-xs text-chalk-mute">
            Le geste d&apos;origine&nbsp;: croix de Saint-Georges, nom de ville
            cousu en bas, aucune marque visible.
          </p>
        </div>
      </div>

      {/* ----------------------------- Piliers ---------------------------- */}
      <section className="mt-24">
        <h2 className="brand-title text-4xl text-chalk sm:text-5xl">
          Nos quatre règles
        </h2>
        <div className="mt-10 grid gap-px overflow-hidden rounded-brand bg-ink-3 sm:grid-cols-2">
          {PILLARS.map((pillar, index) => (
            <div key={pillar.title} className="bg-ink-2 p-8">
              <span className="brand-title text-4xl text-ink-4">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="brand-title mt-3 text-2xl text-chalk">{pillar.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-chalk-dim">{pillar.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-20 text-center">
        <p className="brand-title text-[clamp(2rem,6vw,4rem)] text-chalk">
          Alors, c&apos;est écrit où
          <br />
          <span className="text-flare">que tu viens de chez toi&nbsp;?</span>
        </p>
        <Link
          href="/configurateur"
          className="brand-title mt-8 inline-flex h-14 items-center rounded-brand bg-chalk px-10 text-xl text-ink transition-colors hover:bg-flare hover:text-chalk"
        >
          Brode-le
        </Link>
      </section>
    </div>
  );
}
