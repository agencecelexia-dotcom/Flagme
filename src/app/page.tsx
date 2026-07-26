import Link from "next/link";
import { HeroShowcase } from "@/components/home/HeroShowcase";
import { FlagStrip } from "@/components/home/FlagStrip";
import { FlagPreview } from "@/components/flag/FlagPreview";
import { Countdown } from "@/components/euro/Countdown";
import { COUNTRIES, getCountry } from "@/data/countries";
import { FORMATS } from "@/data/formats";
import { STITCH_FONTS } from "@/data/customization";
import { HOST_NATIONS } from "@/data/euro2028";
import { formatPrice } from "@/lib/pricing";

const STEPS = [
  {
    n: "Étape 01",
    title: "Choisis ton pays",
    body: `${COUNTRIES.length} nations dessinées une par une. Celui de tes parents, celui de ton cœur, ou les deux.`,
  },
  {
    n: "Étape 02",
    title: "Écris ta ville",
    body: "Ta ville, ton quartier, une date, un surnom. Le rendu se met à jour lettre après lettre.",
  },
  {
    n: "Étape 03",
    title: "On le brode",
    body: "Fil polyester au point satin serré, ourlets doublés, œillets laiton. Expédié sous cinq jours.",
  },
];

/**
 * ⚠️ TÉMOIGNAGES FICTIFS — à remplacer par de vrais avis clients avant toute
 * mise en ligne. Publier des avis inventés est trompeur pour l'acheteur et
 * interdit par le code de la consommation.
 */
const PROOF = [
  {
    quote:
      "Parti à Séville avec le drapeau brodé « Saint-Denis ». Trois personnes sont venues me demander où je l'avais fait.",
    author: "Karim",
    detail: "France · Tribune",
  },
  {
    quote:
      "Je l'ai offert à mon père avec le nom du village de mes grands-parents. Il l'a accroché dans le salon, pas au stade.",
    author: "Inès",
    detail: "Algérie · Poche",
  },
  {
    quote:
      "La broderie ne bouge pas après une saison entière de déplacements sous la pluie. C'est du vrai fil, pas du flocage.",
    author: "Tom",
    detail: "Angleterre · Tifo XXL",
  },
];

export default function HomePage() {
  const stitchDemo = getCountry("gb-eng")!;
  const franceSpec = getCountry("fr")!.spec;
  const largestWidthCm = Math.max(...FORMATS.map((format) => format.widthCm));
  const hostNations = HOST_NATIONS.map((code) => getCountry(code)!).filter(Boolean);

  return (
    <>
      {/* ------------------------------ Héros ---------------------------- */}
      <section className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 px-5 pb-20 pt-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20 lg:pb-28">
        <div>
          <p className="eyebrow">Drapeaux brodés à la commande</p>

          <h1 className="display mt-6 text-[clamp(2.9rem,6.5vw,5rem)]">
            D&apos;où tu viens,
            <br />
            ça se brode
          </h1>

          <p className="mt-7 max-w-md text-lg leading-relaxed text-ink-soft">
            Le drapeau de ton pays, le nom de ta ville cousu dessus. Le geste
            des tribunes anglaises, fabriqué proprement.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Link href="/configurateur" className="pill pill-dark h-14 px-8 text-base">
              Créer mon drapeau
              <span className="opacity-50">·</span>
              <span className="font-medium opacity-80">3 mn</span>
            </Link>
            <Link
              href="/euro-2028"
              className="text-[15px] font-medium text-ink-soft underline-offset-8 transition-colors hover:text-ink hover:underline"
            >
              Spécial Euro 2028
            </Link>
          </div>
        </div>

        <HeroShowcase />
      </section>

      {/* ------------------------------ Étapes --------------------------- */}
      <section className="mx-auto max-w-7xl px-5 py-20">
        <div className="grid gap-16 lg:grid-cols-3 lg:gap-10">
          {STEPS.map((step) => (
            <div key={step.n}>
              <p className="eyebrow">{step.n}</p>
              <h2 className="display mt-4 text-[clamp(1.9rem,3vw,2.5rem)]">{step.title}</h2>
              <p className="mt-4 max-w-xs leading-relaxed text-ink-soft">{step.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-16">
          <FlagStrip />
        </div>
      </section>

      {/* ------------------------------ Styles --------------------------- */}
      <section className="mx-auto max-w-7xl px-5 py-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-20">
          <div>
            <p className="eyebrow">La broderie</p>
            <h2 className="display mt-5 text-[clamp(2.2rem,4.5vw,3.5rem)]">
              Du fil,
              <br />
              pas de l&apos;encre
            </h2>
            <p className="mt-6 max-w-sm leading-relaxed text-ink-soft">
              Chaque lettre est piquée au point satin serré. Le texte est en
              relief, il ne craquelle pas au lavage et ne s&apos;efface pas au
              soleil.
            </p>
            <p className="mt-4 max-w-sm leading-relaxed text-ink-soft">
              Quatre styles, huit couleurs de fil, jusqu&apos;à deux lignes.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-5">
            {STITCH_FONTS.map((font) => (
              <div key={font.id}>
                <div className="overflow-hidden rounded-soft shadow-[0_1px_2px_rgb(21_21_15/0.06),0_14px_30px_-20px_rgb(21_21_15/0.4)]">
                  <FlagPreview
                    spec={stitchDemo.spec}
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
                <p className="mt-3 text-sm font-semibold">{font.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------- Euro 2028 -------------------------- */}
      <section className="mx-auto max-w-7xl px-5 py-20">
        <div className="card overflow-hidden p-8 sm:p-12">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-16">
            <div>
              <p className="eyebrow">9 juin — 9 juillet 2028</p>
              <h2 className="display mt-5 text-[clamp(2rem,4vw,3rem)]">
                L&apos;Euro rentre à la maison
              </h2>
              <p className="mt-5 max-w-md leading-relaxed text-ink-soft">
                Angleterre, Écosse, pays de Galles, Irlande. Exactement là où la
                tradition du drapeau brodé est née.
              </p>

              <div className="mt-9">
                <Countdown />
              </div>

              <Link
                href="/euro-2028"
                className="pill pill-light mt-9 h-12 px-6 text-[15px]"
              >
                Voir les villes hôtes
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {hostNations.map((country) => (
                <Link
                  key={country.code}
                  href={`/configurateur?pays=${country.code}`}
                  className="overflow-hidden rounded-soft shadow-[0_1px_2px_rgb(21_21_15/0.06),0_12px_26px_-18px_rgb(21_21_15/0.4)] transition-transform duration-500 hover:-translate-y-1"
                >
                  <FlagPreview spec={country.spec} />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ----------------------------- Formats --------------------------- */}
      <section className="mx-auto max-w-7xl px-5 py-20">
        <div className="flex flex-wrap items-end justify-between gap-5">
          <div>
            <p className="eyebrow">Les formats</p>
            <h2 className="display mt-5 text-[clamp(2.2rem,4.5vw,3.5rem)]">
              Du sac à dos au virage
            </h2>
          </div>
          <Link
            href="/formats"
            className="text-[15px] font-medium text-ink-soft underline-offset-8 transition-colors hover:text-ink hover:underline"
          >
            Comparer les formats
          </Link>
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {FORMATS.map((format) => (
            <Link key={format.id} href={`/configurateur?format=${format.id}`} className="group">
              {/* Les vignettes partagent une échelle commune : un Tifo occupe
                  vraiment 2,8 fois la largeur d'un format Poche. */}
              <div className="flex min-h-32 items-end">
                <div
                  className="overflow-hidden rounded-soft shadow-[0_1px_2px_rgb(21_21_15/0.06),0_12px_26px_-18px_rgb(21_21_15/0.4)] transition-transform duration-500 group-hover:-translate-y-1"
                  style={{ width: `${(format.widthCm / largestWidthCm) * 100}%` }}
                >
                  <FlagPreview spec={franceSpec} ratio={format.ratio} />
                </div>
              </div>

              <h3 className="mt-5 font-semibold">{format.name}</h3>
              <p className="mt-0.5 text-sm text-ink-soft">{format.dims}</p>
              <p className="mt-2 text-sm text-ink-soft">
                dès <span className="font-semibold text-ink">{formatPrice(format.price)}</span>
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* --------------------------- Preuve sociale ---------------------- */}
      <section className="mx-auto max-w-7xl px-5 py-20">
        <p className="eyebrow">Ils l&apos;ont déployé</p>
        <div className="mt-10 grid gap-x-16 gap-y-10 md:grid-cols-3">
          {PROOF.map((item) => (
            <figure key={item.author} className="rule pt-7">
              <blockquote className="leading-relaxed text-ink-soft">{item.quote}</blockquote>
              <figcaption className="mt-4 text-sm">
                <span className="font-semibold">{item.author}</span>
                <span className="text-ink-faint"> · {item.detail}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* ------------------------------ Final ---------------------------- */}
      <section className="mx-auto max-w-3xl px-5 py-24 text-center">
        <h2 className="display text-[clamp(2.2rem,5vw,3.5rem)]">
          Ton pays. Ta ville.
          <br />
          Brodés.
        </h2>
        <Link href="/configurateur" className="pill pill-dark mt-10 h-14 px-9 text-base">
          Commencer
        </Link>
      </section>
    </>
  );
}
