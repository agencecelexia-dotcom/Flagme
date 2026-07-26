/**
 * Modèle de description d'un drapeau.
 *
 * Tout est décrit en fractions (0 → 1) de la largeur / hauteur, jamais en
 * pixels : un même drapeau doit pouvoir être rendu en vignette de catalogue,
 * en aperçu de configurateur ou en fond de page sans être redécrit.
 *
 * Le rendu se fait dans un repère normalisé de 300 × 200 (cf. FLAG_W/FLAG_H)
 * puis étiré au format du produit choisi — c'est exactement ce qui se passe
 * en confection quand un drapeau 3:2 est coupé en 150 × 90.
 */

export const FLAG_W = 300;
export const FLAG_H = 200;

/** Une fraction de la largeur ou de la hauteur du drapeau, entre 0 et 1. */
type Frac = number;

export type FlagLayer =
  /** Bandes parallèles, verticales ou horizontales, avec poids optionnels. */
  | { k: "bands"; dir: "v" | "h"; bands: Array<{ c: string; w?: number }> }
  /** Rectangle libre (cantons, moitiés, blocs). */
  | { k: "rect"; x: Frac; y: Frac; w: Frac; h: Frac; c: string }
  /** Croix droite. `x` décale la barre verticale (croix scandinave). */
  | { k: "cross"; c: string; t: Frac; x?: Frac; outline?: { c: string; t: Frac } }
  /** Croix de Saint-André (sautoir). */
  | { k: "saltire"; c: string; t: Frac; outline?: { c: string; t: Frac } }
  | { k: "circle"; cx: Frac; cy: Frac; r: Frac; c?: string; stroke?: string; sw?: Frac }
  /** Étoile régulière. `r` est le rayon externe, relatif à la hauteur. */
  | {
      k: "star";
      cx: Frac;
      cy: Frac;
      r: Frac;
      c?: string;
      points?: number;
      rot?: number;
      inner?: number;
      stroke?: string;
      sw?: Frac;
    }
  /** Croissant : disque plein évidé par un disque décalé de `dx`. */
  | { k: "crescent"; cx: Frac; cy: Frac; r: Frac; dx: Frac; cut: Frac; c: string }
  | { k: "diamond"; cx: Frac; cy: Frac; rx: Frac; ry: Frac; c: string }
  /** Damier (Croatie). */
  | {
      k: "checker";
      x: Frac;
      y: Frac;
      w: Frac;
      h: Frac;
      cols: number;
      rows: number;
      a: string;
      b: string;
    }
  /** Semis d'étoiles en quinconce (États-Unis). */
  | {
      k: "starfield";
      x: Frac;
      y: Frac;
      w: Frac;
      h: Frac;
      rows: number;
      cols: number;
      r: Frac;
      c: string;
    }
  /** Soleil rayonnant (Argentine). */
  | { k: "sun"; cx: Frac; cy: Frac; r: Frac; rays: number; c: string }
  /** Échappatoire : tracé libre exprimé dans le repère 300 × 200. */
  | { k: "path"; d: string; c?: string; stroke?: string; sw?: number };

export type FlagSpec = {
  /** Couleur de fond, peinte avant toutes les couches. */
  base: string;
  layers: FlagLayer[];
};

export type Country = {
  /** Code ISO 3166-1 alpha-2 en minuscules, ou code régional (`gb-eng`). */
  code: string;
  name: string;
  region: "europe" | "afrique" | "ameriques" | "asie-oceanie";
  /** Villes proposées en un clic dans le configurateur. */
  cities: string[];
  /** Couleur dominante, utilisée pour l'ambiance de l'interface. */
  accent: string;
  /**
   * Couleur de fil recommandée par défaut : celle qui ressort le mieux
   * sur ce drapeau précis.
   */
  defaultThread: string;
  spec: FlagSpec;
};

/* -------------------------------------------------------------------------
 * Géométrie
 * ---------------------------------------------------------------------- */

/** Points d'une étoile régulière, en coordonnées absolues du repère. */
export function starPoints(
  cx: number,
  cy: number,
  outer: number,
  points = 5,
  innerRatio = 0.382,
  rotationDeg = 0,
): string {
  const inner = outer * innerRatio;
  const step = Math.PI / points;
  const start = (rotationDeg * Math.PI) / 180 - Math.PI / 2;
  const coords: string[] = [];

  for (let i = 0; i < points * 2; i++) {
    const radius = i % 2 === 0 ? outer : inner;
    const angle = start + i * step;
    coords.push(
      `${(cx + radius * Math.cos(angle)).toFixed(2)},${(cy + radius * Math.sin(angle)).toFixed(2)}`,
    );
  }

  return coords.join(" ");
}

/** Convertit des poids de bandes en offsets cumulés normalisés. */
export function bandOffsets(bands: Array<{ w?: number }>): Array<[number, number]> {
  const total = bands.reduce((sum, b) => sum + (b.w ?? 1), 0);
  let cursor = 0;

  return bands.map((b) => {
    const width = (b.w ?? 1) / total;
    const segment: [number, number] = [cursor, width];
    cursor += width;
    return segment;
  });
}

/** Éclaircit ou assombrit une couleur hex — utilisé pour les reflets de fil. */
export function shade(hex: string, amount: number): string {
  const normalized = hex.replace("#", "");
  const full =
    normalized.length === 3
      ? normalized
          .split("")
          .map((c) => c + c)
          .join("")
      : normalized;

  const num = parseInt(full, 16);
  const channels = [(num >> 16) & 255, (num >> 8) & 255, num & 255];

  const mixed = channels.map((channel) => {
    const target = amount > 0 ? 255 : 0;
    const ratio = Math.abs(amount);
    return Math.round(channel + (target - channel) * ratio);
  });

  return `#${mixed.map((c) => c.toString(16).padStart(2, "0")).join("")}`;
}
