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
  { id: "host", label: "Euro 2028" },
  ...REGIONS,
];

/** Nombre de drapeaux montrés avant d'avoir à déplier le catalogue. */
const PREVIEW_COUNT = 12;

export function CountryPicker({
  value,
  onChange,
}: {
  value: string;
  onChange: (code: string) => void;
}) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [expanded, setExpanded] = useState(false);

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

  /**
   * Le catalogue ne défile plus dans la page : sur mobile, une zone qui
   * défile à l'intérieur d'une page qui défile se manipule très mal au
   * doigt. On en montre une poignée, le reste se déplie.
   *
   * Dès que l'utilisateur cherche ou filtre, il a restreint lui-même :
   * on affiche alors tout ce qui reste.
   */
  const narrowed = query.trim().length > 0 || filter !== "all";
  const shown = expanded || narrowed ? results : results.slice(0, PREVIEW_COUNT);
  const hidden = results.length - shown.length;

  return (
    <div>
      <input
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Chercher un pays ou une ville…"
        aria-label="Chercher un pays"
        className="w-full rounded-full bg-bone-warm px-5 py-3 text-[15px] text-ink placeholder:text-ink-faint focus:outline-none"
      />

      <div className="mt-3 flex flex-wrap gap-2">
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

      {results.length === 0 ? (
        <p className="dashed mt-5 p-8 text-center text-sm text-ink-soft">
          Aucune nation ne correspond. Il en manque une&nbsp;?{" "}
          <span className="text-ink">Écris-nous, on la dessine.</span>
        </p>
      ) : (
        <div className="mt-5 grid grid-cols-3 gap-3 sm:grid-cols-4">
          {shown.map((country) => {
            const selected = country.code === value;
            return (
              <button
                key={country.code}
                type="button"
                onClick={() => onChange(country.code)}
                aria-pressed={selected}
                className="group text-left"
              >
                <div
                  className={`overflow-hidden rounded-soft transition-all ${
                    selected
                      ? "ring-2 ring-ink ring-offset-2 ring-offset-paper"
                      : "shadow-[0_1px_2px_rgb(21_21_15/0.07)]"
                  }`}
                >
                  <FlagPreview spec={country.spec} />
                </div>
                <p
                  className={`mt-1.5 truncate text-[11px] transition-colors ${
                    selected ? "font-semibold text-ink" : "text-ink-soft group-hover:text-ink"
                  }`}
                >
                  {country.name}
                </p>
              </button>
            );
          })}
        </div>
      )}

      {hidden > 0 && (
        <button
          type="button"
          onClick={() => setExpanded(true)}
          className="pill pill-light mt-5 h-11 w-full text-sm"
        >
          {`Voir les ${results.length} nations`}
        </button>
      )}
    </div>
  );
}
