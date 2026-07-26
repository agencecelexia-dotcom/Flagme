/** Options de personnalisation : fils, styles de broderie, placements. */

export type Thread = {
  id: string;
  label: string;
  hex: string;
  /** Les fils métallisés (or, argent) sont facturés en supplément. */
  metallic?: boolean;
};

export const THREADS: Thread[] = [
  { id: "white", label: "Blanc craie", hex: "#F5F3EC" },
  { id: "black", label: "Noir encre", hex: "#141210" },
  { id: "navy", label: "Bleu marine", hex: "#182742" },
  { id: "red", label: "Rouge sang", hex: "#C41E20" },
  { id: "royal", label: "Bleu roi", hex: "#1B4FA0" },
  { id: "green", label: "Vert pelouse", hex: "#126B3F" },
  { id: "gold", label: "Or métallisé", hex: "#E3B44A", metallic: true },
  { id: "silver", label: "Argent métallisé", hex: "#C9CDD3", metallic: true },
];

export type StitchFont = {
  id: string;
  label: string;
  tagline: string;
  family: string;
  uppercase: boolean;
  tracking: number;
  /** Correction de taille pour équilibrer visuellement les polices entre elles. */
  sizeFactor: number;
};

export const STITCH_FONTS: StitchFont[] = [
  {
    id: "terrace",
    label: "Terrace",
    tagline: "Condensé, esprit flocage de maillot",
    family: "var(--font-display)",
    uppercase: true,
    tracking: 0.02,
    sizeFactor: 1,
  },
  {
    id: "block",
    label: "Block",
    tagline: "Massif, lisible du haut du virage",
    family: "var(--font-sans)",
    uppercase: true,
    tracking: -0.01,
    sizeFactor: 0.82,
  },
  {
    id: "varsity",
    label: "Varsity",
    tagline: "Slab épais, esprit college",
    family: "var(--font-varsity)",
    uppercase: true,
    // Le slab a des approches très serrées : sans cet écart, le bourrelet
    // de fil fait se toucher les lettres voisines.
    tracking: 0.06,
    sizeFactor: 0.78,
  },
  {
    id: "script",
    label: "Script",
    tagline: "Cursive penchée, esprit ultras",
    family: "var(--font-script)",
    uppercase: false,
    tracking: 0,
    sizeFactor: 1.05,
  },
];

export type Placement = { id: string; label: string; baseline: number };

export const PLACEMENTS: Placement[] = [
  { id: "top", label: "En haut", baseline: 0.3 },
  { id: "center", label: "Au centre", baseline: 0.58 },
  { id: "bottom", label: "En bas", baseline: 0.86 },
];

export type Outline = {
  id: string;
  label: string;
  hex: string | null;
  /** Seul le contour métallisé est facturé : les autres relèvent du métier. */
  premium?: boolean;
};

export const OUTLINES: Outline[] = [
  { id: "none", label: "Sans contour", hex: null },
  { id: "dark", label: "Contour noir", hex: "#12100E" },
  { id: "light", label: "Contour blanc", hex: "#F5F3EC" },
  { id: "gold", label: "Contour or", hex: "#E3B44A", premium: true },
];

/**
 * Un fil clair sur un drapeau clair ne se lit pas — c'est le cas dès qu'une
 * bande blanche passe sous le texte. On propose donc d'office un contour
 * sombre avec les fils clairs, que l'utilisateur reste libre de retirer.
 */
export function recommendedOutline(threadId: string): string {
  return ["white", "silver", "gold"].includes(threadId) ? "dark" : "none";
}

export type TextSize = { id: string; label: string; factor: number };

export const TEXT_SIZES: TextSize[] = [
  { id: "s", label: "Discret", factor: 0.78 },
  { id: "m", label: "Standard", factor: 1 },
  { id: "l", label: "Plein cadre", factor: 1.24 },
];

export function getThread(id: string): Thread {
  return THREADS.find((t) => t.id === id) ?? THREADS[0];
}

export function getStitchFont(id: string): StitchFont {
  return STITCH_FONTS.find((f) => f.id === id) ?? STITCH_FONTS[0];
}

export function getPlacement(id: string): Placement {
  return PLACEMENTS.find((p) => p.id === id) ?? PLACEMENTS[2];
}

export function getOutline(id: string): Outline {
  return OUTLINES.find((o) => o.id === id) ?? OUTLINES[0];
}

export function getTextSize(id: string): TextSize {
  return TEXT_SIZES.find((s) => s.id === id) ?? TEXT_SIZES[1];
}
