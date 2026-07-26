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
    tone: "bg-tint-mint",
    emoji: "👋",
  },
  {
    title: "Brodé, jamais imprimé",
    body: "L'impression s'écaille, le fil tient. On brode au point satin serré parce qu'un drapeau se plie, se trempe, se déplie sous la pluie et repart la semaine suivante.",
    tone: "bg-tint-lemon",
    emoji: "🧵",
  },
  {
    title: "Aucune nation par défaut",
    body: "Chaque drapeau du catalogue est dessiné à la main dans nos fichiers, pas récupéré dans une banque d'images. Il en manque un ? Écris-nous, on l'ajoute.",
    tone: "bg-tint-grape",
    emoji: "✏️",
  },
  {
    title: "À la commande, jamais en stock",
    body: "Rien n'est fabriqué avant d'être commandé. Pas d'invendus, pas de surproduction, pas de carton de drapeaux « MANCHESTER » qui dort dans un entrepôt.",
    tone: "bg-tint-bubble",
    emoji: "📦",
  },
];

export default function ManifestoPage() {
  const england = getCountry("gb-eng")!;

  return (
    <>
      <section className="edge-b relative overflow-hidden bg-lemon py-14">
        <div
          aria-hidden
          className="dots pointer-events-none absolute inset-0 text-ink opacity-10"
        />
        <div className="relative mx-auto max-w-7xl px-4">
          <p className="hud text-ink-soft">Le manifeste</p>
          <h1 className="arcade-hero mt-3 max-w-4xl text-[clamp(2.6rem,8vw,5.5rem)]">
            Un drapeau,
            <br />
            c&apos;est une adresse
          </h1>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-14">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div className="space-y-5 text-lg font-semibold leading-relaxed text-ink-soft">
            <p className="sticker bg-paper p-6 text-2xl leading-snug text-ink">
              Dans les tribunes anglaises, il y a une tradition que personne
              n&apos;a jamais écrite&nbsp;: tu pars en déplacement avec le
              drapeau de ton pays, et tu couds dessus le nom de ta ville.
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
              dans une cuisine, se réparent au fil de coton, se transmettent. On
              a trouvé ça trop beau pour le laisser à ceux qui savent coudre.
            </p>
            <p className="sticker bg-bubble p-6 text-paper">
              FlagMe, c&apos;est cet objet-là, fabriqué proprement. Tu choisis
              ton pays, tu écris ta ville, on brode. Le reste — le logo, la
              marque, la saison — n&apos;a aucune importance.
            </p>
            <p>
              Et parce qu&apos;un drapeau ne parle pas que de football, la moitié
              de nos clients ne mettent jamais les pieds au stade. Ils brodent le
              village de leurs grands-parents, la ville où ils sont nés, celle
              qu&apos;ils ont quittée. Ça marche aussi bien.
            </p>
          </div>

          <div className="lg:sticky lg:top-32">
            <div className="sticker overflow-hidden bg-tint-blue p-4">
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
                className="drop-shadow-[6px_6px_0_rgba(0,0,0,0.3)]"
              />
            </div>
            <p className="mt-3 text-xs font-semibold text-ink-soft">
              Le geste d&apos;origine&nbsp;: croix de Saint-Georges, nom de ville
              cousu en bas, aucune marque visible.
            </p>
          </div>
        </div>

        {/* ----------------------------- Piliers -------------------------- */}
        <section className="mt-20">
          <h2 className="arcade text-4xl sm:text-5xl">Nos quatre règles</h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {PILLARS.map((pillar, index) => (
              <div key={pillar.title} className={`sticker p-6 ${pillar.tone}`}>
                <div className="flex items-center justify-between">
                  <span className="arcade grid h-11 w-11 place-items-center rounded-full border-[3px] border-ink bg-paper text-sm">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span aria-hidden className="text-3xl">
                    {pillar.emoji}
                  </span>
                </div>
                <h3 className="arcade mt-4 text-xl">{pillar.title}</h3>
                <p className="mt-2.5 text-sm font-semibold leading-relaxed text-ink-soft">
                  {pillar.body}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>

      <section className="relative overflow-hidden bg-grape py-16 text-paper">
        <div
          aria-hidden
          className="stripes pointer-events-none absolute inset-0 text-paper opacity-10"
        />
        <div className="relative mx-auto max-w-3xl px-4 text-center">
          <p className="arcade-hero text-[clamp(1.9rem,6vw,3.5rem)]">
            Alors, c&apos;est écrit où
            <br />
            <span className="text-lemon">que tu viens de chez toi&nbsp;?</span>
          </p>
          <Link
            href="/configurateur"
            className="sticker sticker-press arcade mt-8 inline-flex h-14 items-center bg-lemon px-10 text-xl text-ink"
          >
            Brode-le ▸
          </Link>
        </div>
      </section>
    </>
  );
}
