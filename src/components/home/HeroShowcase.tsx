"use client";

import { useEffect, useState } from "react";
import { FlagPreview } from "@/components/flag/FlagPreview";
import type { TextConfig } from "@/components/flag/EmbroideredText";
import { getCountry } from "@/data/countries";

type Showcase = { countryCode: string; text: TextConfig; caption: string };

/**
 * Vitrine du héros : de vraies combinaisons pays / ville, parce que le
 * concept se comprend en trois secondes quand on le voit, pas quand on
 * l'explique.
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
    countryCode: "fr",
    caption: "France · Marseille",
    text: {
      line1: "Marseille",
      line2: "Depuis 1899",
      fontId: "block",
      threadId: "white",
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
      line2: "",
      fontId: "terrace",
      threadId: "white",
      outlineId: "dark",
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
];

const ROTATION_MS = 5200;

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
      <FlagPreview
        key={current.countryCode + index}
        spec={country.spec}
        text={current.text}
        ratio={1.667}
        waving
        className="animate-rise overflow-hidden rounded-card shadow-[0_40px_80px_-40px_rgb(21_21_15/0.45)]"
      />

      <div className="mt-6 flex items-center justify-between gap-4">
        <p className="text-sm text-ink-soft">{current.caption}</p>

        <div className="flex items-center gap-2" role="tablist" aria-label="Exemples">
          {SHOWCASES.map((showcase, i) => (
            <button
              key={showcase.caption}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={showcase.caption}
              onClick={() => setIndex(i)}
              className={`h-1.5 rounded-full transition-all ${
                i === index ? "w-7 bg-clay" : "w-1.5 bg-line hover:bg-ink-faint"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
