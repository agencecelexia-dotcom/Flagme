"use client";

import Link from "next/link";
import { COUNTRIES } from "@/data/countries";
import { FlagPreview } from "@/components/flag/FlagPreview";

/**
 * Bande défilante du catalogue de nations. Deux copies identiques se
 * suivent pour que la boucle soit invisible.
 */
export function FlagStrip() {
  return (
    <div className="relative overflow-hidden py-2">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-ink to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-ink to-transparent" />

      <div className="ticker-track gap-4">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0 gap-4 pr-4">
            {COUNTRIES.map((country) => (
              <Link
                key={country.code}
                href={`/configurateur?pays=${country.code}`}
                className="group w-40 shrink-0"
                aria-label={`Créer un drapeau ${country.name}`}
                tabIndex={copy === 0 ? 0 : -1}
                aria-hidden={copy === 1}
              >
                <div className="overflow-hidden rounded-brand ring-1 ring-ink-4 transition-all duration-300 group-hover:ring-flare">
                  <FlagPreview
                    spec={country.spec}
                    ratio={1.667}
                    hardware={false}
                    className="transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <p className="mt-2 text-xs font-semibold text-chalk-mute transition-colors group-hover:text-chalk">
                  {country.name}
                </p>
              </Link>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
