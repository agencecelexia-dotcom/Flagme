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
 * Groupe de choix exclusifs, en autocollants. Tous les réglages du
 * configurateur passent par ce composant : un seul geste à apprendre.
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
      <legend className="hud mb-2.5 text-ink-soft">{legend}</legend>
      <div
        className="grid gap-2.5"
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
              className={`sticker-sm sticker-press flex items-center gap-2.5 px-3 py-2.5 text-left ${
                selected ? "bg-lemon" : "bg-paper"
              }`}
            >
              {option.swatch && (
                <span
                  aria-hidden
                  className="h-6 w-6 shrink-0 rounded-full border-[3px] border-ink"
                  style={{ backgroundColor: option.swatch }}
                />
              )}
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-bold">{option.label}</span>
                {option.hint && (
                  <span className="block truncate text-[11px] font-medium text-ink-soft">
                    {option.hint}
                  </span>
                )}
              </span>
              {option.surcharge ? (
                <span className="shrink-0 rounded-full border-[3px] border-ink bg-tangerine px-1.5 text-[10px] font-bold text-paper">
                  +{option.surcharge}€
                </span>
              ) : null}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}
