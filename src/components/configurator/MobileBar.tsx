"use client";

import { FlagPreview } from "@/components/flag/FlagPreview";
import type { TextConfig } from "@/components/flag/EmbroideredText";
import type { FlagSpec } from "@/lib/flag-spec";
import { formatPrice } from "@/lib/pricing";

/**
 * Barre collante du bas, sur mobile uniquement.
 *
 * Sans elle, l'aperçu reste en haut de page et sort de l'écran dès la
 * première étape : on choisit sa couleur de fil et son format sans jamais
 * voir le résultat, alors que c'est toute la promesse du site. La vignette
 * suit donc l'utilisateur, avec le prix et le bouton à portée de pouce.
 */
export function MobileBar({
  spec,
  text,
  ratio,
  summary,
  total,
  canAdd,
  onAdd,
}: {
  spec: FlagSpec;
  text: TextConfig;
  ratio: number;
  summary: string;
  total: number;
  canAdd: boolean;
  onAdd: () => void;
}) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 bg-bone/90 backdrop-blur-xl lg:hidden">
      <div className="rule flex items-center gap-3 px-4 py-3">
        <div className="w-24 shrink-0 overflow-hidden rounded-lg shadow-[0_1px_2px_rgb(21_21_15/0.12)]">
          <FlagPreview spec={spec} text={text} ratio={ratio} />
        </div>

        <div className="min-w-0 flex-1">
          <p className="truncate text-xs text-ink-soft">{summary}</p>
          <p className="display text-xl">{formatPrice(total)}</p>
        </div>

        <button
          type="button"
          onClick={onAdd}
          disabled={!canAdd}
          className={`pill h-12 shrink-0 px-5 text-sm ${
            canAdd ? "pill-dark" : "bg-bone-warm text-ink-faint"
          }`}
        >
          {canAdd ? "Ajouter" : "Ton texte ?"}
        </button>
      </div>
    </div>
  );
}
