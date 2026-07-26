"use client";

type Option = {
  id: string;
  label: string;
  hint?: string;
  /** Pastille de couleur, pour le choix des fils. */
  swatch?: string;
  surcharge?: number;
};

/**
 * Groupe de choix exclusifs. Tous les réglages du configurateur passent par
 * ce composant : un seul geste à apprendre, une seule apparence à retenir.
 */
export function OptionGroup({
  legend,
  options,
  value,
  onChange,
  columns = 2,
}: {
  legend: string;
  options: Option[];
  value: string;
  onChange: (id: string) => void;
  columns?: number;
}) {
  return (
    <fieldset>
      <legend className="mb-3 text-sm font-semibold">{legend}</legend>
      <div
        className="grid gap-2"
        style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
      >
        {options.map((option) => {
          const selected = option.id === value;
          return (
            <button
              key={option.id}
              type="button"
              onClick={() => onChange(option.id)}
              aria-pressed={selected}
              className={`flex items-center gap-2.5 rounded-soft px-3 py-2.5 text-left transition-all ${
                selected
                  ? "bg-ink text-bone"
                  : "bg-bone-warm text-ink hover:bg-line/60"
              }`}
            >
              {option.swatch && (
                <span
                  aria-hidden
                  className="h-5 w-5 shrink-0 rounded-full ring-1 ring-inset ring-black/15"
                  style={{ backgroundColor: option.swatch }}
                />
              )}
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-medium">{option.label}</span>
                {option.hint && (
                  <span
                    className={`block truncate text-[11px] ${
                      selected ? "text-bone/60" : "text-ink-soft"
                    }`}
                  >
                    {option.hint}
                  </span>
                )}
              </span>
              {option.surcharge ? (
                <span
                  className={`shrink-0 text-[11px] font-semibold ${
                    selected ? "text-bone/70" : "text-clay"
                  }`}
                >
                  +{option.surcharge} €
                </span>
              ) : null}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}
