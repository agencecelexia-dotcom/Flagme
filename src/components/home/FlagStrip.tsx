"use client";

import Link from "next/link";
import { COUNTRIES } from "@/data/countries";
import { HOST_NATIONS } from "@/data/euro2028";
import { FlagPreview } from "@/components/flag/FlagPreview";

/**
 * Bande défilante du catalogue de nations, montée comme une rangée de
 * vignettes à collectionner. Deux copies identiques se suivent pour que la
 * boucle soit invisible.
 */
export function FlagStrip() {
  return (
    <div className="relative overflow-hidden py-3">
      <div className="ticker-track gap-4">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0 gap-4 pr-4" aria-hidden={copy === 1}>
            {COUNTRIES.map((country) => {
              const isHost = HOST_NATIONS.includes(
                country.code as (typeof HOST_NATIONS)[number],
              );
              return (
                <Link
                  key={country.code}
                  href={`/configurateur?pays=${country.code}`}
                  className="sticker-sm sticker-press group relative w-40 shrink-0 overflow-hidden bg-paper"
                  aria-label={`Créer un drapeau ${country.name}`}
                  tabIndex={copy === 0 ? 0 : -1}
                >
                  {isHost && (
                    <span className="absolute -right-1 -top-1 z-10 grid h-6 w-6 place-items-center rounded-full border-[3px] border-ink bg-lemon text-[10px]">
                      ★
                    </span>
                  )}
                  <div className="border-b-[3px] border-ink">
                    <FlagPreview spec={country.spec} hardware={false} />
                  </div>
                  <p className="truncate px-2.5 py-2 text-xs font-bold">{country.name}</p>
                </Link>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
