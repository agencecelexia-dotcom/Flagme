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
      threadId: "gold",
      outlineId: "none",
      placementId: "bottom",
      sizeId: "m",
    },
  },
  {
    countryCode: "pt",
    caption: "Portugal · Porto",
    text: {
      line1: "Porto",
      line2: "",
      fontId: "varsity",
      threadId: "white",
      outlineId: "dark",
      placementId: "bottom",
      sizeId: "m",
    },
  },
  {
    countryCode: "dz",
    caption: "Algérie · Tizi Ouzou",
    text: {
      line1: "Tizi Ouzou",
      line2: "",
      fontId: "terrace",
      threadId: "gold",
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

const ROTATION_MS = 4800;

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
      {/* Halo aux couleurs du drapeau affiché : l'interface réagit au pays. */}
      <div
        className="pointer-events-none absolute -inset-16 -z-10 rounded-full opacity-30 blur-3xl transition-colors duration-700"
        style={{ backgroundColor: country.accent }}
      />

      <div className="relative rounded-brand shadow-[0_40px_120px_-30px_rgba(0,0,0,0.9)]">
        <FlagPreview
          key={current.countryCode + index}
          spec={country.spec}
          text={current.text}
          ratio={1.667}
          waving
          className="animate-rise"
        />
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="eyebrow text-chalk-mute">Fait par un supporter</p>
          <p className="mt-1 font-semibold text-chalk">{current.caption}</p>
        </div>

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
                i === index ? "w-8 bg-flare" : "w-3 bg-ink-4 hover:bg-chalk-mute"
              }`}
            />
          ))}
        </div>
      </div>

      <Link
        href={`/configurateur?pays=${current.countryCode}&ligne1=${encodeURIComponent(
          current.text.line1,
        )}`}
        className="mt-5 inline-flex text-sm font-semibold text-flare underline-offset-4 hover:underline"
      >
        Partir de ce modèle →
      </Link>
    </div>
  );
}
