"use client";

import { useMemo, useState } from "react";
import { COUNTRIES, REGIONS } from "@/data/countries";
import { FlagPreview } from "@/components/flag/FlagPreview";

/** Retire les accents pour que « Bresil » trouve « Brésil ». */
function normalize(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

export function CountryPicker({
  value,
  onChange,
}: {
  value: string;
  onChange: (code: string) => void;
}) {
  const [query, setQuery] = useState("");
  const [region, setRegion] = useState<string>("all");

  const results = useMemo(() => {
    const needle = normalize(query.trim());
    return COUNTRIES.filter((country) => {
      if (region !== "all" && country.region !== region) return false;
      if (!needle) return true;
      return (
        normalize(country.name).includes(needle) ||
        country.cities.some((city) => normalize(city).includes(needle))
      );
    });
  }, [query, region]);

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Chercher un pays ou une ville…"
            aria-label="Chercher un pays"
            className="w-full rounded-brand border border-ink-4 bg-ink px-4 py-3 pl-10 text-sm text-chalk placeholder:text-chalk-mute focus:border-flare focus:outline-none"
          />
          <svg
            viewBox="0 0 20 20"
            aria-hidden
            className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 fill-none stroke-chalk-mute stroke-2"
          >
            <circle cx="8.5" cy="8.5" r="5.5" />
            <path d="M12.8 12.8 L17 17" strokeLinecap="round" />
          </svg>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {[{ id: "all", label: "Toutes" }, ...REGIONS].map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setRegion(item.id)}
            aria-pressed={region === item.id}
            className={`rounded-full border px-3.5 py-1.5 text-xs font-bold transition-colors ${
              region === item.id
                ? "border-chalk bg-chalk text-ink"
                : "border-ink-4 text-chalk-dim hover:border-chalk-mute"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {results.length === 0 ? (
        <p className="mt-6 rounded-brand border border-dashed border-ink-4 p-6 text-center text-sm text-chalk-mute">
          Aucune nation ne correspond. Il en manque une&nbsp;?{" "}
          <span className="text-chalk">Écris-nous, on la dessine.</span>
        </p>
      ) : (
        <div className="mt-5 grid max-h-[26rem] grid-cols-3 gap-3 overflow-y-auto pr-1 sm:grid-cols-4">
          {results.map((country) => {
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
                  className={`overflow-hidden rounded-brand ring-2 transition-all ${
                    selected
                      ? "ring-flare"
                      : "ring-transparent group-hover:ring-chalk-mute"
                  }`}
                >
                  <FlagPreview spec={country.spec} hardware={false} />
                </div>
                <p
                  className={`mt-1.5 truncate text-[11px] font-semibold transition-colors ${
                    selected ? "text-flare" : "text-chalk-mute group-hover:text-chalk"
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
