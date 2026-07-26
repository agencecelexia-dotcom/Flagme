"use client";

import { useMemo, useState } from "react";
import { COUNTRIES, REGIONS } from "@/data/countries";
import { HOST_NATIONS } from "@/data/euro2028";
import { FlagPreview } from "@/components/flag/FlagPreview";

/** Retire les accents pour que « Bresil » trouve « Brésil ». */
function normalize(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

const FILTERS = [
  { id: "all", label: "Toutes" },
  { id: "host", label: "Pays hôtes ★" },
  ...REGIONS,
];

/**
 * Grille de sélection de nation, montée comme un roster de jeu de foot :
 * une case par équipe, la sélection encadrée, le nom en bandeau.
 */
export function CountryPicker({
  value,
  onChange,
}: {
  value: string;
  onChange: (code: string) => void;
}) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");

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
      <div className="relative">
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Cherche un pays ou une ville…"
          aria-label="Chercher un pays"
          className="edge w-full rounded-chip bg-paper px-4 py-3 pl-11 text-base font-semibold text-ink placeholder:text-ink-faint focus:outline-none"
        />
        <span aria-hidden className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-lg">
          🔎
        </span>
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {FILTERS.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setFilter(item.id)}
            aria-pressed={filter === item.id}
            className={`sticker-sm sticker-press px-3 py-1.5 text-xs font-bold ${
              filter === item.id ? "bg-ink text-lemon" : "bg-paper text-ink"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {results.length === 0 ? (
        <p className="edge mt-5 rounded-blob bg-tint-lemon p-6 text-center text-sm font-semibold">
          Aucune nation ne correspond.
          <br />
          Il en manque une&nbsp;? <span className="text-bubble">On la dessine.</span>
        </p>
      ) : (
        <div className="mt-5 grid max-h-[30rem] grid-cols-3 gap-3 overflow-y-auto p-1 sm:grid-cols-4">
          {results.map((country) => {
            const selected = country.code === value;
            const isHost = HOST_NATIONS.includes(
              country.code as (typeof HOST_NATIONS)[number],
            );

            return (
              <button
                key={country.code}
                type="button"
                onClick={() => onChange(country.code)}
                aria-pressed={selected}
                className={`sticker-sm sticker-press relative overflow-hidden text-left ${
                  selected ? "bg-bubble" : "bg-paper"
                }`}
              >
                {isHost && (
                  <span
                    aria-label="Pays hôte de l'Euro 2028"
                    className="absolute -right-1 -top-1 z-10 grid h-6 w-6 place-items-center rounded-full border-[3px] border-ink bg-lemon text-[10px]"
                  >
                    ★
                  </span>
                )}
                <div className="border-b-[3px] border-ink">
                  <FlagPreview spec={country.spec} hardware={false} />
                </div>
                <p
                  className={`truncate px-2 py-1.5 text-[11px] font-bold ${
                    selected ? "text-paper" : "text-ink"
                  }`}
                >
                  {country.name}
                </p>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
