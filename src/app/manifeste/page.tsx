import type { Metadata } from "next";
import Link from "next/link";
import { FlagPreview } from "@/components/flag/FlagPreview";
import { getCountry } from "@/data/countries";

export const metadata: Metadata = {
  title: "Manifeste",
  description:
    "Pourquoi FlagMe existe : le drapeau de supporter comme carte d'identité, pas comme produit dérivé.",
};

const PILLARS = [
  {
    title: "Le nom d'abord",
    body: "Le pays donne le fond, le texte donne la personne. C'est le nom qui doit sauter aux yeux, pas notre logo — que tu ne trouveras nulle part sur le produit.",
  },
  {
    title: "Brodé, jamais imprimé",
    body: "L'impression s'écaille, le fil tient. Un drapeau se plie, se trempe, se déplie sous la pluie et repart la semaine suivante.",
  },
  {
    title: "Aucune nation par défaut",
    body: "Chaque drapeau du catalogue est dessiné à la main dans nos fichiers, pas récupéré dans une banque d'images.",
  },
  {
    title: "À la commande, jamais en stock",
    body: "Rien n'est fabriqué avant d'être commandé. Pas d'invendus, pas de carton de drapeaux « Manchester » qui dort dans un entrepôt.",
  },
];

export default function ManifestoPage() {
  const england = getCountry("gb-eng")!;

  return (
    <>
      <section className="mx-auto max-w-7xl px-5 pb-16 pt-10">
        <p className="eyebrow">Le manifeste</p>
        <h1 className="display mt-6 max-w-3xl text-[clamp(2.9rem,7vw,5.5rem)]">
          Un drapeau, c&apos;est une adresse
        </h1>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-10">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-start lg:gap-20">
          <div className="space-y-6 text-lg leading-relaxed text-ink-soft">
            <p className="text-2xl leading-snug text-ink">
              Dans les tribunes anglaises, il y a une tradition que personne
              n&apos;a jamais écrite : tu pars en déplacement avec le drapeau de
              ton pays, et tu couds dessus le nom de ta ville.
            </p>
            <p>
              Pas pour décorer. Pour dire qui tu es. Un drapeau nu appartient à
              tout le monde ; un drapeau avec «&nbsp;Wigan&nbsp;» ou
              «&nbsp;Saint-Denis&nbsp;» brodé dessus appartient à une seule
              personne.
            </p>
            <p>
              Ces drapeaux-là ne s&apos;achètent nulle part. Ils se fabriquent
              dans une cuisine, se réparent au fil de coton, se transmettent. On
              a trouvé ça trop beau pour le laisser à ceux qui savent coudre.
            </p>
            <p className="text-ink">
              FlagMe, c&apos;est cet objet-là, fabriqué proprement. Tu choisis
              ton pays, tu écris ta ville, on brode.
            </p>
            <p>
              Et parce qu&apos;un drapeau ne parle pas que de football, la
              moitié de nos clients ne mettent jamais les pieds au stade. Ils
              brodent le village de leurs grands-parents, la ville où ils sont
              nés, celle qu&apos;ils ont quittée.
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
              className="overflow-hidden rounded-card shadow-[0_40px_80px_-40px_rgb(21_21_15/0.45)]"
            />
            <p className="mt-5 text-sm leading-relaxed text-ink-soft">
              Le geste d&apos;origine : croix de Saint-Georges, nom de ville
              cousu en bas, aucune marque visible.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20">
        <p className="eyebrow">Nos quatre règles</p>
        <div className="mt-10 grid gap-x-16 gap-y-10 sm:grid-cols-2">
          {PILLARS.map((pillar, index) => (
            <div key={pillar.title} className="rule pt-7">
              <p className="text-sm text-ink-faint">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h2 className="display mt-3 text-xl">{pillar.title}</h2>
              <p className="mt-3 leading-relaxed text-ink-soft">{pillar.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-5 py-24 text-center">
        <h2 className="display text-[clamp(2rem,5vw,3.2rem)]">
          C&apos;est écrit où que tu viens de chez toi ?
        </h2>
        <Link href="/configurateur" className="pill pill-dark mt-9 h-14 px-9 text-base">
          Brode-le
        </Link>
      </section>
    </>
  );
}
