"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FlagPreview } from "@/components/flag/FlagPreview";
import type { TextConfig } from "@/components/flag/EmbroideredText";
import { getCountry } from "@/data/countries";

type Showcase = {
  countryCode: string;
  text: TextConfig;
  caption: string;
};

/**
 * Vitrine du héros : de vraies combinaisons pays / ville, parce que le
 * concept se comprend en trois secondes quand on le voit, pas quand on
 * l'explique. Les nations hôtes de l'Euro 2028 ouvrent la série.
 */
const SHOWCASES: Showcase[] = [
  {
    countryCode: "gb-eng",
    caption: "Angleterre · Manchester",
    text: {
      line1: "Manchester",
      line2: "Pride of the North",
      fontId: "terrace",
      threadId: "navy",
      outlineId: "none",
      placementId: "bottom",
      sizeId: "m",
    },
  },
  {
    countryCode: "gb-wls",
    caption: "Pays de Galles · Cardiff",
    text: {
      line1: "Cardiff",
      line2: "",
      fontId: "block",
      threadId: "white",
      outlineId: "dark",
      placementId: "top",
      sizeId: "m",
    },
  },
  {
    countryCode: "fr",
    caption: "France · Marseille",
    text: {
      line1: "Marseille",
      line2: "Depuis 1899",
      fontId: "block",
      threadId: "gold",
      outlineId: "dark",
      placementId: "center",
      sizeId: "m",
    },
  },
  {
    countryCode: "ma",
    caption: "Maroc · Casablanca",
    text: {
      line1: "Casablanca",
      line2: "Dima Maghrib",
      fontId: "terrace",
      threadId: "white",
      outlineId: "dark",
      placementId: "bottom",
      sizeId: "m",
    },
  },
  {
    countryCode: "gb-sct",
    caption: "Écosse · Glasgow",
    text: {
      line1: "Glasgow",
      line2: "",
      fontId: "varsity",
      threadId: "white",
      outlineId: "dark",
      placementId: "bottom",
      sizeId: "m",
    },
  },
  {
    countryCode: "br",
    caption: "Brésil · São Paulo",
    text: {
      line1: "São Paulo",
      line2: "",
      fontId: "script",
      threadId: "white",
      outlineId: "dark",
      placementId: "top",
      sizeId: "m",
    },
  },
];

const ROTATION_MS = 4200;

export function HeroShowcase() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const timer = window.setInterval(
      () => setIndex((current) => (current + 1) % SHOWCASES.length),
      ROTATION_MS,
    );
    return () => window.clearInterval(timer);
  }, [paused]);

  const current = SHOWCASES[index];
  const country = getCountry(current.countryCode);
  if (!country) return null;

  return (
    <div
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* L'écran : un cadre épais aux couleurs du pays affiché. */}
      <div
        className="sticker relative overflow-hidden p-4 transition-colors duration-500 sm:p-6"
        style={{ backgroundColor: country.accent }}
      >
        <div
          aria-hidden
          className="dots pointer-events-none absolute inset-0 text-paper opacity-20"
        />

        <div className="relative">
          <FlagPreview
            key={current.countryCode + index}
            spec={country.spec}
            text={current.text}
            ratio={1.667}
            waving
            className="animate-pop drop-shadow-[8px_8px_0_rgba(0,0,0,0.35)]"
          />
        </div>

        <div className="sticker-sm relative mt-4 flex flex-wrap items-center justify-between gap-3 bg-paper px-3 py-2.5">
          <p className="arcade text-sm">{current.caption}</p>

          <div className="flex items-center gap-1.5" role="tablist" aria-label="Exemples">
            {SHOWCASES.map((showcase, i) => (
              <button
                key={showcase.caption}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={showcase.caption}
                onClick={() => setIndex(i)}
                className={`h-3 rounded-full border-[3px] border-ink transition-all ${
                  i === index ? "w-8 bg-bubble" : "w-3 bg-cream hover:bg-lemon"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      <Link
        href={`/configurateur?pays=${current.countryCode}&ligne1=${encodeURIComponent(
          current.text.line1,
        )}`}
        className="sticker-sm sticker-press mt-4 inline-flex bg-paper px-4 py-2.5 text-sm font-bold"
      >
        Partir de ce modèle ▸
      </Link>
    </div>
  );
}
