import type { Metadata } from "next";
import Link from "next/link";
import { FlagPreview } from "@/components/flag/FlagPreview";
import { FINISHES, FORMATS, OPTION_PRICES } from "@/data/formats";
import { getCountry } from "@/data/countries";
import { formatPrice } from "@/lib/pricing";

export const metadata: Metadata = {
  title: "Formats",
  description:
    "Du mini drapeau au tifo de virage : dimensions, prix et usages de chaque format FlagMe.",
};

const OPTIONS = [
  {
    label: "Seconde ligne brodée",
    price: OPTION_PRICES.secondLine,
    detail: "Une date, une devise, un quartier sous le nom principal.",
  },
  {
    label: "Fil métallisé or ou argent",
    price: OPTION_PRICES.metallicThread,
    detail: "Reflet sous les projecteurs, tenue identique au fil standard.",
  },
  {
    label: "Contour or",
    price: OPTION_PRICES.outline,
    detail:
      "Le contour de contraste noir ou blanc est toujours inclus. Seule la seconde passe en fil doré est facturée.",
  },
  {
    label: "Finition tribune",
    price: OPTION_PRICES.proFinish,
    detail: "Fourreau renforcé, œillets anti-arrachement, sangle de portage.",
  },
];

export default function FormatsPage() {
  const demo = getCountry("pt")!;

  return (
    <div className="mx-auto max-w-7xl px-5 py-12">
      <p className="eyebrow text-flare">Les formats</p>
      <h1 className="brand-title mt-3 max-w-3xl text-[clamp(2.6rem,6vw,4.5rem)] text-chalk">
        Quatre tailles, une seule qualité
      </h1>
      <p className="mt-4 max-w-xl text-chalk-dim">
        Même maille 115 g, même broderie fil épais, mêmes ourlets doublés. Seule
        la surface change — et donc le nombre de personnes qui te voient.
      </p>

      <div className="mt-14 space-y-6">
        {FORMATS.map((format, index) => (
          <article
            key={format.id}
            className="grid items-center gap-8 rounded-brand border border-ink-3 bg-ink-2 p-6 lg:grid-cols-[1fr_1.1fr] lg:p-8"
          >
            <div className={index % 2 === 1 ? "lg:order-2" : undefined}>
              <FlagPreview
                spec={demo.spec}
                ratio={format.ratio}
                text={{
                  line1: "Porto",
                  line2: format.id === "tifo" ? "Aqui é Porto" : "",
                  fontId: "terrace",
                  threadId: "white",
                  outlineId: "dark",
                  placementId: "bottom",
                  sizeId: "m",
                }}
              />
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-3">
                <h2 className="brand-title text-4xl text-chalk">{format.name}</h2>
                {format.badge && (
                  <span className="eyebrow rounded-full bg-flare px-2.5 py-1 text-[9px] text-chalk">
                    {format.badge}
                  </span>
                )}
              </div>

              <p className="mt-1 text-sm font-semibold text-chalk-dim">
                {format.dims} · rapport {format.ratio.toFixed(2)}:1
              </p>
              <p className="mt-5 text-lg text-chalk">{format.pitch}</p>
              <p className="mt-3 leading-relaxed text-chalk-dim">{format.detail}</p>

              <div className="mt-7 flex flex-wrap items-center gap-5">
                <span className="brand-title text-4xl text-chalk">
                  {formatPrice(format.price)}
                </span>
                <Link
                  href={`/configurateur?format=${format.id}`}
                  className="flex h-12 items-center rounded-brand bg-chalk px-6 text-sm font-bold text-ink transition-colors hover:bg-flare hover:text-chalk"
                >
                  Configurer ce format
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* ----------------------------- Options ---------------------------- */}
      <section className="mt-20">
        <h2 className="brand-title text-4xl text-chalk">Les suppléments</h2>
        <p className="mt-3 max-w-xl text-chalk-dim">
          Tout est optionnel. Un drapeau au prix de base est déjà un drapeau
          complet&nbsp;: une ligne brodée, ourlets et œillets compris.
        </p>

        <div className="mt-8 grid gap-px overflow-hidden rounded-brand bg-ink-3 sm:grid-cols-2">
          {OPTIONS.map((option) => (
            <div key={option.label} className="bg-ink-2 p-6">
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="font-bold text-chalk">{option.label}</h3>
                <span className="brand-title shrink-0 text-2xl text-thread">
                  +{option.price} €
                </span>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-chalk-mute">
                {option.detail}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------------------- Finitions --------------------------- */}
      <section className="mt-16">
        <h2 className="brand-title text-4xl text-chalk">Les finitions</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {FINISHES.map((finish) => (
            <div key={finish.id} className="stitch-border rounded-brand p-6">
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="brand-title text-2xl text-chalk">{finish.label}</h3>
                <span className="text-sm font-bold text-thread">
                  {finish.price === 0 ? "Incluse" : `+${finish.price} €`}
                </span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-chalk-dim">
                {finish.detail}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-20 rounded-brand border border-ink-3 bg-ink-2 px-6 py-14 text-center">
        <h2 className="brand-title text-[clamp(2rem,5vw,3.5rem)] text-chalk">
          Toujours pas décidé&nbsp;?
        </h2>
        <p className="mx-auto mt-4 max-w-md text-chalk-dim">
          Le configurateur affiche chaque format à ses proportions réelles.
          Change de taille en un clic et compare.
        </p>
        <Link
          href="/configurateur"
          className="brand-title mt-8 inline-flex h-14 items-center rounded-brand bg-flare px-10 text-xl text-chalk transition-transform hover:-translate-y-0.5"
        >
          Ouvrir le configurateur
        </Link>
      </section>
    </div>
  );
}
