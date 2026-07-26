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
 * Groupe de choix exclusifs, rendu en pastilles. Utilisé pour tout le
 * configurateur afin que chaque réglage se manipule de la même façon.
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
      <legend className="eyebrow mb-3 text-chalk-mute">{legend}</legend>
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
              className={`flex items-center gap-2.5 rounded-brand border px-3 py-2.5 text-left transition-colors ${
                selected
                  ? "border-flare bg-flare/10 text-chalk"
                  : "border-ink-4 text-chalk-dim hover:border-chalk-mute hover:text-chalk"
              }`}
            >
              {option.swatch && (
                <span
                  aria-hidden
                  className="h-5 w-5 shrink-0 rounded-full ring-1 ring-inset ring-black/30"
                  style={{ backgroundColor: option.swatch }}
                />
              )}
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-semibold">{option.label}</span>
                {option.hint && (
                  <span className="block truncate text-[11px] text-chalk-mute">
                    {option.hint}
                  </span>
                )}
              </span>
              {option.surcharge ? (
                <span className="shrink-0 text-[11px] font-bold text-thread">
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
