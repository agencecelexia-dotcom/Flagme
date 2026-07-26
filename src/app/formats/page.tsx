import type { Metadata } from "next";
import Link from "next/link";
import { FlagPreview } from "@/components/flag/FlagPreview";
import { FINISHES, FORMATS, OPTION_PRICES } from "@/data/formats";
import { getCountry } from "@/data/countries";
import { formatPrice } from "@/lib/pricing";

export const metadata: Metadata = {
  title: "Tailles",
  description:
    "Du mini drapeau au tifo de virage : dimensions, prix et usages de chaque format FlagMe.",
};

const OPTIONS = [
  {
    label: "Seconde ligne brodée",
    price: OPTION_PRICES.secondLine,
    detail: "Une date, une devise, un quartier sous le nom principal.",
    tone: "bg-tint-mint",
  },
  {
    label: "Fil métallisé or ou argent",
    price: OPTION_PRICES.metallicThread,
    detail: "Reflet sous les projecteurs, tenue identique au fil standard.",
    tone: "bg-tint-lemon",
  },
  {
    label: "Contour or",
    price: OPTION_PRICES.outline,
    detail:
      "Le contour de contraste noir ou blanc est toujours inclus. Seule la seconde passe en fil doré est facturée.",
    tone: "bg-tint-grape",
  },
  {
    label: "Finition tribune",
    price: OPTION_PRICES.proFinish,
    detail: "Fourreau renforcé, œillets anti-arrachement, sangle de portage.",
    tone: "bg-tint-bubble",
  },
];

const TONES = ["bg-tint-mint", "bg-tint-lemon", "bg-tint-bubble", "bg-tint-blue"];

export default function FormatsPage() {
  const demo = getCountry("pt")!;
  const largestWidthCm = Math.max(...FORMATS.map((format) => format.widthCm));

  return (
    <>
      <section className="edge-b relative overflow-hidden bg-mint py-12">
        <div
          aria-hidden
          className="stripes pointer-events-none absolute inset-0 text-ink opacity-[0.07]"
        />
        <div className="relative mx-auto max-w-7xl px-4">
          <p className="hud text-ink-soft">Les tailles</p>
          <h1 className="arcade-hero mt-3 max-w-3xl text-[clamp(2.4rem,7vw,4.5rem)]">
            Quatre tailles,
            <br />
            une seule qualité
          </h1>
          <p className="mt-4 max-w-xl font-semibold text-ink-soft">
            Même maille 115 g, même broderie fil épais, mêmes ourlets doublés.
            Seule la surface change — et donc le nombre de gens qui te voient.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-14">
        {/* Comparateur à l'échelle : la vraie différence de taille, d'un coup d'œil. */}
        <div className="sticker bg-paper p-5 sm:p-7">
          <p className="hud text-ink-soft">Les quatre formats à la même échelle</p>
          <div className="mt-5 flex flex-wrap items-end gap-4">
            {FORMATS.map((format) => (
              <div
                key={format.id}
                style={{ width: `${(format.widthCm / largestWidthCm) * 46}%` }}
                className="min-w-24"
              >
                <div className="edge overflow-hidden rounded-chip">
                  <FlagPreview spec={demo.spec} ratio={format.ratio} hardware={false} />
                </div>
                <p className="arcade mt-2 text-xs">{format.name}</p>
                <p className="text-[10px] font-bold text-ink-soft">{format.dims}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 space-y-6">
          {FORMATS.map((format, index) => (
            <article
              key={format.id}
              className={`sticker grid items-center gap-8 p-5 lg:grid-cols-[1fr_1.1fr] lg:p-8 ${TONES[index % TONES.length]}`}
            >
              <div className={index % 2 === 1 ? "lg:order-2" : undefined}>
                <div className="edge overflow-hidden rounded-chip">
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
                <div className="flex flex-wrap items-center gap-3">
                  <h2 className="arcade text-3xl sm:text-4xl">{format.name}</h2>
                  {format.badge && (
                    <span className="sticker-sm bg-lemon px-2.5 py-1 text-[10px] font-bold">
                      {format.badge}
                    </span>
                  )}
                </div>

                <p className="mt-1 text-sm font-bold text-ink-soft">
                  {format.dims} · rapport {format.ratio.toFixed(2)}:1
                </p>
                <p className="mt-4 text-lg font-bold">{format.pitch}</p>
                <p className="mt-2 font-semibold leading-relaxed text-ink-soft">
                  {format.detail}
                </p>

                <div className="mt-6 flex flex-wrap items-center gap-4">
                  <span className="arcade text-4xl text-bubble">
                    {formatPrice(format.price)}
                  </span>
                  <Link
                    href={`/configurateur?format=${format.id}`}
                    className="sticker-sm sticker-press arcade flex h-12 items-center bg-paper px-5 text-sm"
                  >
                    Configurer ▸
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* ----------------------------- Options -------------------------- */}
        <section className="mt-16">
          <h2 className="arcade text-4xl">Les suppléments</h2>
          <p className="mt-3 max-w-xl font-semibold text-ink-soft">
            Tout est optionnel. Un drapeau au prix de base est déjà un drapeau
            complet&nbsp;: une ligne brodée, ourlets et œillets compris.
          </p>

          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {OPTIONS.map((option) => (
              <div key={option.label} className={`sticker p-6 ${option.tone}`}>
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="arcade text-lg">{option.label}</h3>
                  <span className="sticker-sm shrink-0 bg-tangerine px-2.5 py-1 text-sm font-bold text-paper">
                    +{option.price} €
                  </span>
                </div>
                <p className="mt-3 text-sm font-semibold leading-relaxed text-ink-soft">
                  {option.detail}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ---------------------------- Finitions ------------------------- */}
        <section className="mt-14">
          <h2 className="arcade text-4xl">Les finitions</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {FINISHES.map((finish) => (
              <div key={finish.id} className="sticker bg-paper p-6">
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="arcade text-xl">{finish.label}</h3>
                  <span className="text-sm font-bold text-bubble">
                    {finish.price === 0 ? "Incluse" : `+${finish.price} €`}
                  </span>
                </div>
                <p className="mt-3 text-sm font-semibold leading-relaxed text-ink-soft">
                  {finish.detail}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>

      <section className="relative overflow-hidden bg-bubble py-16 text-paper">
        <div
          aria-hidden
          className="dots pointer-events-none absolute inset-0 text-paper opacity-15"
        />
        <div className="relative mx-auto max-w-3xl px-4 text-center">
          <h2 className="arcade-hero text-[clamp(2rem,6vw,3.5rem)]">
            Toujours pas décidé&nbsp;?
          </h2>
          <p className="mx-auto mt-4 max-w-md font-semibold text-paper/90">
            Le configurateur affiche chaque format à ses proportions réelles.
            Change de taille en un clic et compare.
          </p>
          <Link
            href="/configurateur"
            className="sticker sticker-press arcade mt-8 inline-flex h-14 items-center bg-lemon px-8 text-lg text-ink"
          >
            Ouvrir le configurateur ▸
          </Link>
        </div>
      </section>
    </>
  );
}
