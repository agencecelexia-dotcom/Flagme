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
      "Le contour de contraste noir ou blanc est toujours inclus. Seule la passe en fil doré est facturée.",
  },
];

export default function FormatsPage() {
  const demo = getCountry("pt")!;
  const largestWidthCm = Math.max(...FORMATS.map((format) => format.widthCm));

  return (
    <>
      <section className="mx-auto max-w-7xl px-5 pb-14 pt-10">
        <p className="eyebrow">Les formats</p>
        <h1 className="display mt-6 max-w-2xl text-[clamp(2.6rem,6vw,4.5rem)]">
          Quatre tailles, une seule qualité
        </h1>
        <p className="mt-6 max-w-lg text-lg leading-relaxed text-ink-soft">
          Même maille 115 g, même broderie, mêmes ourlets doublés. Seule la
          surface change — et donc le nombre de gens qui te voient.
        </p>
      </section>

      {/* Comparateur à l'échelle : la vraie différence de taille, d'un coup d'œil. */}
      <section className="mx-auto max-w-7xl px-5 py-10">
        <div className="card p-8 sm:p-12">
          <p className="eyebrow">À la même échelle</p>
          <div className="mt-8 flex flex-wrap items-end gap-6">
            {FORMATS.map((format) => (
              <div
                key={format.id}
                style={{ width: `${(format.widthCm / largestWidthCm) * 44}%` }}
                className="min-w-24"
              >
                <div className="overflow-hidden rounded-soft shadow-[0_1px_2px_rgb(21_21_15/0.07)]">
                  <FlagPreview spec={demo.spec} ratio={format.ratio} />
                </div>
                <p className="mt-3 text-sm font-semibold">{format.name}</p>
                <p className="text-xs text-ink-soft">{format.dims}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl space-y-24 px-5 py-16">
        {FORMATS.map((format, index) => (
          <article
            key={format.id}
            className="grid items-center gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-20"
          >
            <div className={index % 2 === 1 ? "lg:order-2" : undefined}>
              <div className="overflow-hidden rounded-card shadow-[0_30px_70px_-40px_rgb(21_21_15/0.45)]">
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
            </div>

            <div>
              {format.badge && <p className="eyebrow">{format.badge}</p>}
              <h2 className="display mt-4 text-[clamp(2rem,4vw,3rem)]">{format.name}</h2>
              <p className="mt-2 text-sm text-ink-soft">{format.dims}</p>
              <p className="mt-6 text-lg font-medium">{format.pitch}</p>
              <p className="mt-3 max-w-md leading-relaxed text-ink-soft">{format.detail}</p>

              <div className="mt-8 flex flex-wrap items-center gap-5">
                <span className="display text-3xl">{formatPrice(format.price)}</span>
                <Link
                  href={`/configurateur?format=${format.id}`}
                  className="pill pill-light h-12 px-6 text-[15px]"
                >
                  Configurer
                </Link>
              </div>
            </div>
          </article>
        ))}
      </section>

      {/* ----------------------- Options et finitions --------------------- */}
      <section className="mx-auto max-w-7xl px-5 py-16">
        <p className="eyebrow">Les suppléments</p>
        <h2 className="display mt-5 max-w-xl text-[clamp(2rem,4vw,3rem)]">
          Tout est optionnel
        </h2>
        <p className="mt-5 max-w-md leading-relaxed text-ink-soft">
          Un drapeau au prix de base est déjà un drapeau complet : une ligne
          brodée, ourlets et œillets compris.
        </p>

        <div className="mt-10 grid gap-x-12 gap-y-8 sm:grid-cols-2">
          {[...FINISHES, ...OPTIONS].map((entry) => (
            <div key={entry.label} className="rule pt-6">
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="font-semibold">{entry.label}</h3>
                <span className="shrink-0 text-sm font-semibold text-clay">
                  {entry.price === 0 ? "Incluse" : `+${entry.price} €`}
                </span>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{entry.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-5 py-24 text-center">
        <h2 className="display text-[clamp(2rem,5vw,3.2rem)]">Toujours pas décidé ?</h2>
        <p className="mx-auto mt-5 max-w-md leading-relaxed text-ink-soft">
          Le configurateur affiche chaque format à ses proportions réelles.
        </p>
        <Link href="/configurateur" className="pill pill-dark mt-9 h-14 px-9 text-base">
          Ouvrir le configurateur
        </Link>
      </section>
    </>
  );
}
