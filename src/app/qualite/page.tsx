import type { Metadata } from "next";
import Link from "next/link";
import { FlagPreview } from "@/components/flag/FlagPreview";
import { DeliveryEstimate } from "@/components/product/DeliveryEstimate";
import { getCountry } from "@/data/countries";
import { SHIPPING_DAYS, WORKSHOP_WORKING_DAYS } from "@/lib/delivery";

export const metadata: Metadata = {
  title: "Qualité",
  description:
    "Fil polyester au point satin serré, maille 115 g anti-UV, ourlets doublés et œillets laiton. Ce qu'il y a vraiment dans un drapeau FlagMe.",
};

const SPECS = [
  {
    eyebrow: "Le fil",
    title: "Polyester haute ténacité",
    body: "Point satin serré, densité constante. La lettre est en relief : on la sent sous le doigt, elle ne craquelle pas et ne s'écaille pas.",
  },
  {
    eyebrow: "Le tissu",
    title: "Maille 115 g/m²",
    body: "Le tissu standard du drapeau de supporter : assez léger pour flotter au moindre souffle, traité anti-UV, sèche vite après la pluie.",
  },
  {
    eyebrow: "La confection",
    title: "Ourlets doublés",
    body: "Double couture sur les quatre côtés et trois œillets laiton côté hampe. Le format tribune ajoute un fourreau renforcé.",
  },
  {
    eyebrow: "La tenue",
    title: "Garantie trois ans",
    body: "Couleurs et broderie garanties trois ans en usage normal, déplacements compris. Lavage machine à 30 °C, à l'envers, sans sèche-linge.",
  },
];

export default function QualityPage() {
  const demo = getCountry("gb-eng")!;

  return (
    <>
      <section className="mx-auto max-w-7xl px-5 pb-14 pt-10">
        <p className="eyebrow">La qualité</p>
        <h1 className="display mt-6 max-w-2xl text-[clamp(2.6rem,6vw,4.5rem)]">
          Du fil, pas de l&apos;encre
        </h1>
        <p className="mt-6 max-w-lg text-lg leading-relaxed text-ink-soft">
          L&apos;impression s&apos;écaille au bout d&apos;une saison. Le fil,
          non. C&apos;est toute la différence entre un produit dérivé et un
          drapeau qu&apos;on transmet.
        </p>
      </section>

      {/* Le visuel à gauche, les caractéristiques à droite. */}
      <section className="mx-auto max-w-7xl px-5 py-10">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1fr] lg:gap-12">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <div className="overflow-hidden rounded-card shadow-[0_40px_80px_-40px_rgb(21_21_15/0.45)]">
              <FlagPreview
                spec={demo.spec}
                text={{
                  line1: "Wigan",
                  line2: "",
                  fontId: "terrace",
                  threadId: "navy",
                  outlineId: "none",
                  placementId: "center",
                  sizeId: "l",
                }}
              />
            </div>
            <p className="mt-5 text-sm leading-relaxed text-ink-soft">
              Le relief du fil, la trame satin inclinée et l&apos;ombre portée
              sur le tissu : ce que vous voyez à l&apos;écran est ce que la
              machine brode.
            </p>
          </div>

          <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
            {SPECS.map((spec) => (
              <div key={spec.title} className="card p-6">
                <p className="eyebrow">{spec.eyebrow}</p>
                <h2 className="display mt-3 text-xl">{spec.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft">{spec.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brodé contre imprimé : la comparaison qui justifie le prix. */}
      <section className="mx-auto max-w-7xl px-5 py-20">
        <p className="eyebrow">Brodé contre imprimé</p>
        <h2 className="display mt-5 max-w-xl text-[clamp(2rem,4vw,3rem)]">
          Pourquoi ça coûte plus cher
        </h2>

        <div className="mt-10 grid gap-x-16 gap-y-8 sm:grid-cols-2">
          {[
            ["Un drapeau imprimé", "L'encre est déposée en surface. Elle pâlit au soleil, craquelle aux pliures et s'efface au lavage. Comptez une saison."],
            ["Un drapeau brodé", "Le fil traverse le tissu. Le texte se lit des deux côtés, résiste au lavage et se répare à l'aiguille s'il s'accroche."],
          ].map(([title, body]) => (
            <div key={title} className="rule pt-7">
              <h3 className="display text-lg">{title}</h3>
              <p className="mt-3 leading-relaxed text-ink-soft">{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Atelier */}
      <section className="mx-auto max-w-7xl px-5 py-16">
        <div className="card grid grid-cols-1 gap-10 p-8 sm:p-12 lg:grid-cols-[1.2fr_1fr] lg:items-center lg:gap-16">
          <div>
            <p className="eyebrow">L&apos;atelier</p>
            <h2 className="display mt-5 text-[clamp(1.8rem,3.5vw,2.6rem)]">
              Rien n&apos;est fabriqué avant d&apos;être commandé
            </h2>
            <p className="mt-5 leading-relaxed text-ink-soft">
              Votre drapeau part sur la machine après votre commande. Pas
              d&apos;invendus, pas de carton de drapeaux qui dort dans un
              entrepôt.
            </p>
          </div>

          <dl className="space-y-5">
            {[
              ["Atelier", `${WORKSHOP_WORKING_DAYS} jours ouvrés`],
              ["Transport", `${SHIPPING_DAYS} jours`],
            ].map(([label, value]) => (
              <div key={label} className="rule flex items-baseline justify-between pt-4">
                <dt className="text-sm text-ink-soft">{label}</dt>
                <dd className="font-semibold">{value}</dd>
              </div>
            ))}
            <p className="rule pt-4 text-sm font-semibold">
              <DeliveryEstimate />
            </p>
          </dl>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-5 py-24 text-center">
        <h2 className="display text-[clamp(2rem,5vw,3.2rem)]">
          Reste à écrire ta ville
        </h2>
        <Link href="/configurateur" className="pill pill-dark mt-9 h-14 px-9 text-base">
          Créer mon drapeau
        </Link>
      </section>
    </>
  );
}
