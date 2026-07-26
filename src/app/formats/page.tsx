import type { Metadata } from "next";
import Link from "next/link";
import { FlagPreview } from "@/components/flag/FlagPreview";
import {
  HUMAN_HEIGHT_CM,
  HUMAN_WIDTH_CM,
  HumanScale,
} from "@/components/product/HumanScale";
import { DeliveryEstimate } from "@/components/product/DeliveryEstimate";
import { FINISHES, FORMATS, OPTION_PRICES } from "@/data/formats";
import { getCountry } from "@/data/countries";
import { formatPrice } from "@/lib/pricing";

export const metadata: Metadata = {
  title: "Formats",
  description:
    "Du mini drapeau au tifo de virage : dimensions, prix et usages de chaque format FlagMe, comparés à l'échelle.",
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

/**
 * Le comparateur tient dans sa carte sans défilement : l'échelle est déduite
 * de la largeur totale à représenter — silhouette plus les quatre formats
 * mis bout à bout — et non fixée au doigt mouillé.
 */
const COMPARATOR_FILL_PCT = 86;

export default function FormatsPage() {
  const demo = getCountry("pt")!;
  const totalWidthCm =
    HUMAN_WIDTH_CM + FORMATS.reduce((sum, format) => sum + format.widthCm, 0);
  const cmToPct = COMPARATOR_FILL_PCT / totalWidthCm;

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

      {/* Comparateur : tout est à la même échelle, silhouette comprise. */}
      <section className="mx-auto max-w-7xl px-5 py-10">
        <div className="card p-6 sm:p-10">
          <p className="eyebrow">Les quatre formats à la même échelle</p>

          <div className="mt-10 flex items-end gap-3 sm:gap-5">
            <div
              className="shrink-0 text-line"
              style={{ width: `${cmToPct * HUMAN_WIDTH_CM}%` }}
              title="1,70 m"
            >
              <HumanScale className="w-full" />
            </div>

            {FORMATS.map((format) => (
              <div
                key={format.id}
                className="shrink-0"
                style={{ width: `${cmToPct * format.widthCm}%` }}
              >
                <div className="overflow-hidden rounded-soft shadow-[0_1px_2px_rgb(21_21_15/0.08)]">
                  <FlagPreview spec={demo.spec} ratio={format.ratio} />
                </div>
                <p className="mt-3 text-sm font-semibold">{format.name}</p>
                <p className="text-xs text-ink-soft">{format.dims}</p>
              </div>
            ))}
          </div>

          <p className="mt-8 text-xs text-ink-faint">
            {`Silhouette de ${(HUMAN_HEIGHT_CM / 100).toLocaleString("fr-FR")} m, à la même échelle.`}
          </p>
        </div>
      </section>

      {/* Les quatre fiches, côte à côte : choisir une taille ne devrait pas
          demander quatre écrans de défilement. */}
      <section className="mx-auto max-w-7xl px-5 py-14">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {FORMATS.map((format) => (
            <article key={format.id} className="flex flex-col">
              <Link
                href={`/configurateur?format=${format.id}`}
                className="flex aspect-3/2 items-center transition-transform duration-500 hover:-translate-y-1"
              >
                <FlagPreview
                  className="w-full overflow-hidden rounded-card shadow-[0_1px_2px_rgb(21_21_15/0.06),0_16px_34px_-22px_rgb(21_21_15/0.45)]"
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
              </Link>

              <div className="mt-5 flex items-baseline justify-between gap-3">
                <h2 className="display text-xl">{format.name}</h2>
                <span className="font-semibold">{formatPrice(format.price)}</span>
              </div>
              <p className="mt-1 text-sm text-ink-soft">{format.dims}</p>

              {format.badge && <p className="eyebrow mt-3">{format.badge}</p>}

              <p className="mt-3 font-medium">{format.pitch}</p>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">
                {format.detail}
              </p>

              <Link
                href={`/configurateur?format=${format.id}`}
                className="pill pill-light mt-6 h-11 px-5 text-sm"
              >
                Personnaliser
              </Link>
            </article>
          ))}
        </div>
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
          Le configurateur affiche chaque format à ses proportions réelles, et
          tu peux changer de taille en un clic sans perdre ton texte.
        </p>
        <Link href="/configurateur" className="pill pill-dark mt-9 h-14 px-9 text-base">
          Ouvrir le configurateur
        </Link>
        <p className="mt-6 text-sm text-ink-soft">
          <DeliveryEstimate />
        </p>
      </section>
    </>
  );
}
