import Link from "next/link";
import { FlagPreview } from "@/components/flag/FlagPreview";
import { getCountry } from "@/data/countries";

export default function NotFound() {
  const flag = getCountry("gb-eng")!;

  return (
    <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 px-5 py-20 lg:grid-cols-[1fr_1fr] lg:gap-20">
      <div>
        <p className="eyebrow">Erreur 404</p>
        <h1 className="display mt-6 text-[clamp(2.4rem,6vw,4rem)]">
          Cette page
          <br />
          n&apos;existe pas
        </h1>
        <p className="mt-6 max-w-sm leading-relaxed text-ink-soft">
          Le drapeau, lui, existe toujours. Reprends au début, ou va voir le
          catalogue.
        </p>

        <div className="mt-9 flex flex-wrap items-center gap-4">
          <Link href="/configurateur" className="pill pill-dark h-13 px-7 py-3.5 text-base">
            Créer mon drapeau
          </Link>
          <Link
            href="/nations"
            className="text-[15px] font-medium text-ink-soft underline-offset-8 transition-colors hover:text-ink hover:underline"
          >
            Voir les nations
          </Link>
        </div>
      </div>

      <FlagPreview
        className="overflow-hidden rounded-card shadow-[0_40px_80px_-40px_rgb(21_21_15/0.45)]"
        spec={flag.spec}
        waving
        text={{
          line1: "Nulle part",
          line2: "",
          fontId: "terrace",
          threadId: "navy",
          outlineId: "light",
          placementId: "bottom",
          sizeId: "m",
        }}
      />
    </div>
  );
}
