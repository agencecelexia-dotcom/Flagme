"use client";

import Link from "next/link";
import { COUNTRIES } from "@/data/countries";
import { FlagPreview } from "@/components/flag/FlagPreview";

/**
 * Bande de nations qui défile lentement. Pas de nom, pas de badge : c'est
 * une image, pas une liste — le détail se lit dans le configurateur.
 */
export function FlagStrip() {
  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-bone to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-bone to-transparent" />

      <div className="animate-drift gap-4 py-2">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0 gap-4 pr-4" aria-hidden={copy === 1}>
            {COUNTRIES.map((country) => (
              <Link
                key={country.code}
                href={`/configurateur?pays=${country.code}`}
                className="w-36 shrink-0 overflow-hidden rounded-soft shadow-[0_1px_2px_rgb(21_21_15/0.06),0_10px_24px_-16px_rgb(21_21_15/0.35)] transition-transform duration-500 hover:-translate-y-1"
                aria-label={`Créer un drapeau ${country.name}`}
                tabIndex={copy === 0 ? 0 : -1}
              >
                <FlagPreview spec={country.spec} />
              </Link>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
