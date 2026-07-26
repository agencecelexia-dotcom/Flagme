import Link from "next/link";
import { HeroShowcase } from "@/components/home/HeroShowcase";
import { FlagStrip } from "@/components/home/FlagStrip";
import { FlagPreview } from "@/components/flag/FlagPreview";
import { COUNTRIES, getCountry } from "@/data/countries";
import { FORMATS } from "@/data/formats";
import { STITCH_FONTS } from "@/data/customization";
import { formatPrice } from "@/lib/pricing";

const STEPS = [
  {
    n: "01",
    title: "Choisis ton pays",
    body: "Des nations dessinées une par une. Celui de tes parents, celui de ton cœur, ou les deux.",
  },
  {
    n: "02",
    title: "Brode ce que tu veux",
    body: "Ta ville, ton quartier, une date, un surnom. Quatre styles de broderie, huit couleurs de fil, deux lignes possibles.",
  },
  {
    n: "03",
    title: "On coud, tu déploies",
    body: "Broderie fil épais sur maille 115 g, ourlets doublés, œillets laiton. Expédié sous cinq jours ouvrés.",
  },
];

const PROOF = [
  {
    quote:
      "Parti à Séville avec le drapeau brodé « SAINT-DENIS ». Trois personnes sont venues me demander où je l'avais fait.",
    author: "Karim",
    detail: "Drapeau France · Tribune",
  },
  {
    quote:
      "Je l'ai offert à mon père avec le nom du village de mes grands-parents. Il l'a accroché dans le salon, pas au stade.",
    author: "Inès",
    detail: "Drapeau Algérie · Poche",
  },
  {
    quote:
      "La broderie ne bouge pas après une saison entière de déplacements sous la pluie. C'est du vrai fil, pas du flocage.",
    author: "Tom",
    detail: "Drapeau Angleterre · Tifo XXL",
  },
];

export default function HomePage() {
  const stitchDemo = getCountry("gb-eng")!;
  const franceSpec = getCountry("fr")!.spec;
  const largestWidthCm = Math.max(...FORMATS.map((format) => format.widthCm));

  return (
    <>
      {/* ---------------------------- Héros ----------------------------- */}
      <section className="relative overflow-hidden border-b border-ink-3">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 py-16 lg:grid-cols-[1fr_1.05fr] lg:py-24">
          <div>
            <p className="eyebrow inline-flex items-center gap-2 rounded-full border border-ink-4 px-3 py-1.5 text-chalk-mute">
              <span className="h-1.5 w-1.5 rounded-full bg-flare" />
              Drapeaux brodés à la commande
            </p>

            <h1 className="brand-title mt-6 text-[clamp(3.2rem,9vw,6.5rem)] text-chalk">
              Ton pays.
              <br />
              Ta ville.
              <br />
              <span className="text-flare">Brodés.</span>
            </h1>

            <p className="mt-7 max-w-lg text-lg leading-relaxed text-chalk-dim">
              Dans les tribunes anglaises, chacun part en déplacement avec son
              drapeau et le nom de sa ville cousu dessus. Pas un produit
              dérivé&nbsp;: une carte d&apos;identité. FlagMe fabrique la tienne.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Link
                href="/configurateur"
                className="brand-title flex h-14 items-center rounded-brand bg-flare px-8 text-xl text-chalk transition-transform hover:-translate-y-0.5"
              >
                Créer mon drapeau
              </Link>
              <Link
                href="/formats"
                className="flex h-14 items-center rounded-brand border border-ink-4 px-6 text-sm font-semibold text-chalk transition-colors hover:border-chalk-mute"
              >
                Voir les formats
              </Link>
            </div>

            <dl className="mt-12 grid max-w-lg grid-cols-3 gap-6 border-t border-ink-3 pt-7">
              {[
                [`${COUNTRIES.length}`, "nations dessinées"],
                ["5 j", "de délai atelier"],
                ["3 ans", "de tenue garantie"],
              ].map(([value, label]) => (
                <div key={label}>
                  <dt className="brand-title text-3xl text-chalk">{value}</dt>
                  <dd className="mt-1 text-xs leading-snug text-chalk-mute">{label}</dd>
                </div>
              ))}
            </dl>
          </div>

          <HeroShowcase />
        </div>
      </section>

      {/* --------------------------- Catalogue --------------------------- */}
      <section className="border-b border-ink-3 py-16">
        <div className="mx-auto mb-8 flex max-w-7xl flex-wrap items-end justify-between gap-4 px-5">
          <div>
            <p className="eyebrow text-flare">Le catalogue</p>
            <h2 className="brand-title mt-3 text-4xl text-chalk sm:text-5xl">
              {COUNTRIES.length} nations, une seule règle
            </h2>
            <p className="mt-3 max-w-md text-chalk-dim">
              C&apos;est toi qui écris la suite. Clique sur un drapeau pour
              commencer.
            </p>
          </div>
          <Link
            href="/configurateur"
            className="text-sm font-semibold text-flare underline-offset-4 hover:underline"
          >
            Ouvrir le configurateur →
          </Link>
        </div>

        <FlagStrip />
      </section>

      {/* ----------------------------- Étapes ---------------------------- */}
      <section className="border-b border-ink-3 py-20">
        <div className="mx-auto max-w-7xl px-5">
          <p className="eyebrow text-flare">Comment ça marche</p>
          <h2 className="brand-title mt-3 max-w-2xl text-4xl text-chalk sm:text-5xl">
            Trois minutes pour un drapeau qui n&apos;existe qu&apos;en un
            exemplaire
          </h2>

          <div className="mt-12 grid gap-px overflow-hidden rounded-brand bg-ink-3 md:grid-cols-3">
            {STEPS.map((step) => (
              <div key={step.n} className="bg-ink p-8">
                <span className="brand-title text-5xl text-ink-4">{step.n}</span>
                <h3 className="brand-title mt-4 text-2xl text-chalk">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-chalk-dim">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ----------------------------- Styles ---------------------------- */}
      <section className="border-b border-ink-3 py-20">
        <div className="mx-auto max-w-7xl px-5">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <p className="eyebrow text-flare">La broderie</p>
              <h2 className="brand-title mt-3 text-4xl text-chalk sm:text-5xl">
                Du fil, pas de l&apos;encre
              </h2>
              <p className="mt-5 leading-relaxed text-chalk-dim">
                Chaque lettre est piquée au fil polyester haute ténacité, point
                satin serré. Le texte est en relief&nbsp;: on le sent sous le
                doigt, il ne craquelle pas au lavage et il ne s&apos;efface pas
                au soleil.
              </p>

              <ul className="mt-8 space-y-3.5">
                {[
                  "Quatre styles de broderie, du condensé de maillot à la cursive d'ultras",
                  "Huit couleurs de fil, dont l'or et l'argent métallisés",
                  "Contour optionnel pour ressortir sur les drapeaux clairs",
                  "Jusqu'à deux lignes : ta ville, puis ta date ou ta devise",
                ].map((item) => (
                  <li key={item} className="flex gap-3 text-sm text-chalk-dim">
                    <span
                      aria-hidden
                      className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-flare"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {STITCH_FONTS.map((font) => (
                <div key={font.id}>
                  <div className="overflow-hidden rounded-brand ring-1 ring-ink-4">
                    <FlagPreview
                      spec={stitchDemo.spec}
                      hardware={false}
                      text={{
                        line1: "Sheffield",
                        line2: "",
                        fontId: font.id,
                        threadId: "navy",
                        outlineId: "none",
                        placementId: "bottom",
                        sizeId: "m",
                      }}
                    />
                  </div>
                  <p className="mt-2.5 text-sm font-bold text-chalk">{font.label}</p>
                  <p className="text-xs text-chalk-mute">{font.tagline}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ----------------------------- Formats --------------------------- */}
      <section className="border-b border-ink-3 py-20">
        <div className="mx-auto max-w-7xl px-5">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow text-flare">Les formats</p>
              <h2 className="brand-title mt-3 text-4xl text-chalk sm:text-5xl">
                Du sac à dos au virage entier
              </h2>
            </div>
            <Link
              href="/formats"
              className="text-sm font-semibold text-flare underline-offset-4 hover:underline"
            >
              Comparer les formats →
            </Link>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {FORMATS.map((format) => (
              <Link
                key={format.id}
                href={`/configurateur?format=${format.id}`}
                className="group flex flex-col rounded-brand border border-ink-3 bg-ink-2 p-5 transition-colors hover:border-flare"
              >
                <div className="flex min-h-36 items-center justify-center rounded-brand bg-ink p-4">
                  {/* Les vignettes partagent une échelle commune : un Tifo
                      occupe vraiment 2,8 fois la largeur d'un format Poche. */}
                  <div style={{ width: `${(format.widthCm / largestWidthCm) * 100}%` }}>
                    <FlagPreview spec={franceSpec} ratio={format.ratio} hardware={false} />
                  </div>
                </div>

                <div className="mt-5 flex items-start justify-between gap-3">
                  <div>
                    <h3 className="brand-title text-2xl text-chalk">{format.name}</h3>
                    <p className="text-xs text-chalk-mute">{format.dims}</p>
                  </div>
                  {format.badge && (
                    <span className="eyebrow rounded-full bg-flare px-2 py-1 text-[9px] text-chalk">
                      {format.badge}
                    </span>
                  )}
                </div>

                <p className="mt-3 flex-1 text-sm text-chalk-dim">{format.pitch}</p>

                <p className="mt-4 border-t border-ink-3 pt-4 text-sm text-chalk-mute">
                  dès{" "}
                  <span className="brand-title text-xl text-chalk group-hover:text-flare">
                    {formatPrice(format.price)}
                  </span>
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* --------------------------- Témoignages -------------------------- */}
      <section className="border-b border-ink-3 py-20">
        <div className="mx-auto max-w-7xl px-5">
          <p className="eyebrow text-flare">Ils l&apos;ont déployé</p>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {PROOF.map((item) => (
              <figure key={item.author} className="stitch-border rounded-brand bg-ink-2 p-6">
                <blockquote className="text-[15px] leading-relaxed text-chalk">
                  « {item.quote} »
                </blockquote>
                <figcaption className="mt-5 border-t border-ink-3 pt-4">
                  <p className="text-sm font-bold text-chalk">{item.author}</p>
                  <p className="text-xs text-chalk-mute">{item.detail}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------ Final ----------------------------- */}
      <section className="py-24">
        <div className="mx-auto max-w-4xl px-5 text-center">
          <h2 className="brand-title text-[clamp(2.6rem,7vw,5rem)] text-chalk">
            D&apos;où tu viens,
            <br />
            <span className="text-flare">ça se brode.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-chalk-dim">
            Choisis ton pays, écris ta ville, regarde le rendu en direct.
          </p>
          <Link
            href="/configurateur"
            className="brand-title mt-10 inline-flex h-16 items-center rounded-brand bg-chalk px-12 text-2xl text-ink transition-colors hover:bg-flare hover:text-chalk"
          >
            Commencer
          </Link>
        </div>
      </section>
    </>
  );
}
