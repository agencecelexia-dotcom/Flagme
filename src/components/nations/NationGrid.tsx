"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { COUNTRIES, REGIONS } from "@/data/countries";
import { HOST_NATIONS } from "@/data/euro2028";
import { recommendedOutline } from "@/data/customization";
import { FlagPreview } from "@/components/flag/FlagPreview";
import { FORMATS } from "@/data/formats";
import { formatPrice } from "@/lib/pricing";

/** Retire les accents pour que « Bresil » trouve « Brésil ». */
function normalize(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

const FILTERS = [
  { id: "all", label: "Toutes" },
  { id: "host", label: "Euro 2028" },
  ...REGIONS,
];

/**
 * Catalogue complet des nations. Chaque vignette montre déjà une ville
 * brodée : un drapeau nu ne dit pas ce qu'on vend.
 */
export function NationGrid() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");

  const entryPrice = Math.min(...FORMATS.map((format) => format.price));

  const results = useMemo(() => {
    const needle = normalize(query.trim());
    return COUNTRIES.filter((country) => {
      if (filter === "host") {
        if (!HOST_NATIONS.includes(country.code as (typeof HOST_NATIONS)[number])) {
          return false;
        }
      } else if (filter !== "all" && country.region !== filter) {
        return false;
      }
      if (!needle) return true;
      return (
        normalize(country.name).includes(needle) ||
        country.cities.some((city) => normalize(city).includes(needle))
      );
    });
  }, [query, filter]);

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Chercher un pays ou une ville…"
          aria-label="Chercher un pays"
          className="w-full rounded-full bg-bone-warm px-5 py-3 text-[15px] text-ink placeholder:text-ink-faint focus:outline-none sm:max-w-xs"
        />

        <div className="flex flex-wrap gap-2">
          {FILTERS.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setFilter(item.id)}
              aria-pressed={filter === item.id}
              className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                filter === item.id
                  ? "bg-ink text-bone"
                  : "bg-bone-warm text-ink-soft hover:text-ink"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <p className="mt-6 text-sm text-ink-soft">
        {results.length === COUNTRIES.length
          ? `${COUNTRIES.length} nations au catalogue`
          : `${results.length} sur ${COUNTRIES.length} nations`}
      </p>

      {results.length === 0 ? (
        <p className="dashed mt-6 p-10 text-center text-sm text-ink-soft">
          Aucune nation ne correspond. Il en manque une&nbsp;?{" "}
          <span className="text-ink">Écris-nous, on la dessine.</span>
        </p>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((country) => (
            <article key={country.code}>
              <Link
                href={`/configurateur?pays=${country.code}`}
                className="block overflow-hidden rounded-card shadow-[0_1px_2px_rgb(21_21_15/0.06),0_16px_34px_-22px_rgb(21_21_15/0.45)] transition-transform duration-500 hover:-translate-y-1"
              >
                <FlagPreview
                  spec={country.spec}
                  text={{
                    line1: country.cities[0],
                    line2: "",
                    fontId: "terrace",
                    threadId: country.defaultThread,
                    outlineId: recommendedOutline(country.defaultThread),
                    placementId: "bottom",
                    sizeId: "m",
                  }}
                />
              </Link>

              <div className="mt-4 flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <h2 className="font-semibold">{country.name}</h2>
                  <p className="mt-0.5 truncate text-sm text-ink-soft">
                    {country.cities.slice(0, 3).join(" · ")}
                  </p>
                  <p className="mt-2 text-sm text-ink-soft">
                    dès{" "}
                    <span className="font-semibold text-ink">
                      {formatPrice(entryPrice)}
                    </span>
                  </p>
                </div>

                <Link
                  href={`/configurateur?pays=${country.code}`}
                  className="pill pill-light h-10 shrink-0 px-4 text-sm"
                >
                  Personnaliser
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
