"use client";

import { useId } from "react";
import { FLAG_H, FLAG_W, type FlagSpec } from "@/lib/flag-spec";
import { FlagArt } from "./FlagArt";
import { EmbroideredText, type TextConfig } from "./EmbroideredText";

type FlagPreviewProps = {
  spec: FlagSpec;
  text?: TextConfig;
  /** Rapport largeur / hauteur du produit choisi (1.667 pour un 150 × 90). */
  ratio?: number;
  /**
   * Fourreau et œillets. Désactivé par défaut : sur un fond clair, la bande
   * blanche disparaît et il ne reste que le pointillé de surpiqûre, qui se
   * lit comme un cadre en pointillés plutôt que comme une finition.
   */
  hardware?: boolean;
  /** Ondulation du tissu. */
  waving?: boolean;
  /**
   * Description pour les lecteurs d'écran. Passer une chaîne vide quand
   * l'aperçu est purement décoratif ou que son conteneur porte déjà le nom :
   * annoncer « aperçu du drapeau » quatre fois de suite n'aide personne.
   */
  label?: string;
  className?: string;
};

/**
 * Aperçu produit : le dessin du drapeau, la broderie, et le tissu qui va
 * avec — plis, grain, fourreau, œillets. C'est cette vue que le client
 * regarde avant d'acheter, donc elle doit ressembler à l'objet, pas à un SVG.
 */
export function FlagPreview({
  spec,
  text,
  ratio = 1.667,
  hardware = false,
  waving = false,
  label = "Aperçu du drapeau personnalisé",
  className = "",
}: FlagPreviewProps) {
  const uid = useId().replace(/:/g, "");

  return (
    <div
      className={`relative ${waving ? "animate-sway" : ""} ${className}`}
      style={{ aspectRatio: `${ratio}` }}
    >
      <svg
        viewBox={`0 0 ${FLAG_W} ${FLAG_H}`}
        preserveAspectRatio="none"
        className="h-full w-full"
        {...(label ? { role: "img", "aria-label": label } : { "aria-hidden": true })}
      >
        <defs>
          {/* Grain du tissu : la maille du polyester, pas un bruit d'écran. */}
          <filter id={`${uid}-weave`}>
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.7 1.1"
              numOctaves="3"
              seed="3"
            />
            <feColorMatrix type="saturate" values="0" />
          </filter>

          {/* Plis du drapeau tenu à bout de bras. */}
          <linearGradient id={`${uid}-folds`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#000" stopOpacity="0.34" />
            <stop offset="9%" stopColor="#fff" stopOpacity="0.1" />
            <stop offset="22%" stopColor="#000" stopOpacity="0.16" />
            <stop offset="38%" stopColor="#fff" stopOpacity="0.12" />
            <stop offset="53%" stopColor="#000" stopOpacity="0.12" />
            <stop offset="68%" stopColor="#fff" stopOpacity="0.14" />
            <stop offset="84%" stopColor="#000" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#000" stopOpacity="0.3" />
          </linearGradient>

          <linearGradient id={`${uid}-metal`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#e8e8ea" />
            <stop offset="45%" stopColor="#8f9299" />
            <stop offset="100%" stopColor="#d5d7db" />
          </linearGradient>
        </defs>

        <FlagArt spec={spec} />

        {text && <EmbroideredText config={text} />}

        {/* Le tissu passe par-dessus la broderie : tout est sur le même drapeau. */}
        <rect
          x={0}
          y={0}
          width={FLAG_W}
          height={FLAG_H}
          filter={`url(#${uid}-weave)`}
          opacity={0.14}
          style={{ mixBlendMode: "multiply" }}
        />
        <rect
          x={0}
          y={0}
          width={FLAG_W}
          height={FLAG_H}
          fill={`url(#${uid}-folds)`}
          className={waving ? "animate-folds" : undefined}
          style={{ mixBlendMode: "overlay" }}
        />

        {hardware && (
          <>
            {/* Fourreau : la bande renforcée côté hampe. */}
            <rect x={0} y={0} width={9} height={FLAG_H} fill="#efece4" />
            <rect x={9} y={0} width={1.2} height={FLAG_H} fill="#000" opacity={0.22} />
            <line
              x1={4.5}
              y1={3}
              x2={4.5}
              y2={FLAG_H - 3}
              stroke="#b9b3a4"
              strokeWidth="0.6"
              strokeDasharray="3 2.4"
            />
            {[0.16, 0.5, 0.84].map((position) => (
              <g key={position}>
                <circle
                  cx={4.6}
                  cy={position * FLAG_H}
                  r={3}
                  fill={`url(#${uid}-metal)`}
                />
                <circle
                  cx={4.6}
                  cy={position * FLAG_H}
                  r={1.5}
                  fill="#2a2a2e"
                />
              </g>
            ))}
            {/* Surpiqûre du bord opposé. */}
            <line
              x1={FLAG_W - 3}
              y1={2}
              x2={FLAG_W - 3}
              y2={FLAG_H - 2}
              stroke="#000"
              strokeOpacity="0.25"
              strokeWidth="0.6"
              strokeDasharray="3 2.4"
            />
          </>
        )}
      </svg>
    </div>
  );
}
