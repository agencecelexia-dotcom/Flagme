import type { Metadata } from "next";
import { NationGrid } from "@/components/nations/NationGrid";
import { COUNTRIES } from "@/data/countries";

export const metadata: Metadata = {
  title: "Nations",
  description: `${COUNTRIES.length} nations dessinées une par une, prêtes à recevoir le nom de ta ville en broderie.`,
};

export default function NationsPage() {
  return (
    <>
      <section className="mx-auto max-w-7xl px-5 pb-12 pt-10">
        <p className="eyebrow">Le catalogue</p>
        <h1 className="display mt-6 max-w-2xl text-[clamp(2.6rem,6vw,4.5rem)]">
          {`${COUNTRIES.length} nations, une seule règle`}
        </h1>
        <p className="mt-6 max-w-lg text-lg leading-relaxed text-ink-soft">
          Chaque drapeau est dessiné à la main dans nos fichiers, pas récupéré
          dans une banque d&apos;images. C&apos;est toi qui écris la suite.
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-24">
        <NationGrid />
      </section>
    </>
  );
}
