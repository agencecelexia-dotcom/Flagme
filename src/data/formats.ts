/** Les formats de drapeau proposés, du mini au tifo. */

export type Format = {
  id: string;
  name: string;
  dims: string;
  /** Largeur réelle en centimètres, pour comparer les formats à l'échelle. */
  widthCm: number;
  /** Largeur / hauteur, utilisé pour l'aperçu comme pour la fiche produit. */
  ratio: number;
  /** Prix de base en euros, une ligne brodée incluse. */
  price: number;
  pitch: string;
  detail: string;
  badge?: string;
};

export const FORMATS: Format[] = [
  {
    id: "pocket",
    name: "Poche",
    dims: "90 × 60 cm",
    widthCm: 90,
    ratio: 1.5,
    price: 24,
    pitch: "Celui qui tient dans le sac",
    detail:
      "Le format qui passe partout : sac à dos, boîte à gants, cadre de chambre. Idéal pour un premier drapeau ou un cadeau.",
  },
  {
    id: "terrace",
    name: "Tribune",
    dims: "150 × 90 cm",
    widthCm: 150,
    ratio: 1.667,
    price: 44,
    pitch: "Le standard de déplacement",
    detail:
      "Le format historique du supporter en déplacement : assez grand pour être vu depuis la pelouse, assez compact pour voyager plié.",
    badge: "Le plus choisi",
  },
  {
    id: "banner",
    name: "Bannière",
    dims: "200 × 100 cm",
    widthCm: 200,
    ratio: 2,
    price: 69,
    pitch: "Pour le balcon et la rambarde",
    detail:
      "Format allongé, pensé pour être tendu sur une barrière de virage ou une rambarde de balcon. Le texte respire.",
  },
  {
    id: "tifo",
    name: "Tifo XXL",
    dims: "250 × 150 cm",
    widthCm: 250,
    ratio: 1.667,
    price: 89,
    pitch: "Celui qui passe à la télé",
    detail:
      "Le grand format de virage. Broderie surdimensionnée, ourlets renforcés sur les quatre côtés, conçu pour être déployé à plusieurs.",
  },
];

/** Suppléments, en euros. */
export const OPTION_PRICES = {
  secondLine: 9,
  metallicThread: 6,
  outline: 8,
  proFinish: 12,
} as const;

export type Finish = { id: string; label: string; detail: string; price: number };

export const FINISHES: Finish[] = [
  {
    id: "standard",
    label: "Finition standard",
    detail: "Ourlet double couture sur les 4 côtés, 3 œillets laiton côté hampe.",
    price: 0,
  },
  {
    id: "pro",
    label: "Finition tribune",
    detail:
      "Fourreau renforcé, œillets laiton anti-arrachement et sangle de portage cousue.",
    price: OPTION_PRICES.proFinish,
  },
];

export function getFormat(id: string): Format {
  return FORMATS.find((format) => format.id === id) ?? FORMATS[1];
}

export function getFinish(id: string): Finish {
  return FINISHES.find((finish) => finish.id === id) ?? FINISHES[0];
}

export const DEFAULT_FORMAT = FORMATS[1];
