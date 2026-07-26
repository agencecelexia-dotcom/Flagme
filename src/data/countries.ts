import type { Country } from "@/lib/flag-spec";

/**
 * Catalogue de lancement : les nations les plus représentées dans les
 * tribunes françaises et européennes. L'ordre du tableau est l'ordre
 * d'affichage par défaut du sélecteur.
 */
export const COUNTRIES: Country[] = [
  /* ---------------------------- Europe ---------------------------------- */
  {
    code: "fr",
    name: "France",
    region: "europe",
    cities: ["PARIS", "MARSEILLE", "LYON", "LILLE", "SAINT-ÉTIENNE", "NANTES"],
    accent: "#002395",
    defaultThread: "white",
    spec: {
      base: "#FFFFFF",
      layers: [
        {
          k: "bands",
          dir: "v",
          bands: [{ c: "#002395" }, { c: "#FFFFFF" }, { c: "#ED2939" }],
        },
      ],
    },
  },
  {
    code: "gb-eng",
    name: "Angleterre",
    region: "europe",
    cities: ["MANCHESTER", "LIVERPOOL", "LONDON", "NEWCASTLE", "LEEDS", "SHEFFIELD"],
    accent: "#CE1124",
    defaultThread: "navy",
    spec: {
      base: "#FFFFFF",
      layers: [{ k: "cross", c: "#CE1124", t: 0.2 }],
    },
  },
  {
    code: "gb-sct",
    name: "Écosse",
    region: "europe",
    cities: ["GLASGOW", "EDINBURGH", "ABERDEEN", "DUNDEE"],
    accent: "#005EB8",
    defaultThread: "white",
    spec: {
      base: "#005EB8",
      layers: [{ k: "saltire", c: "#FFFFFF", t: 0.2 }],
    },
  },
  {
    code: "ie",
    name: "Irlande",
    region: "europe",
    cities: ["DUBLIN", "CORK", "GALWAY", "LIMERICK"],
    accent: "#169B62",
    defaultThread: "navy",
    spec: {
      base: "#FFFFFF",
      layers: [
        {
          k: "bands",
          dir: "v",
          bands: [{ c: "#169B62" }, { c: "#FFFFFF" }, { c: "#FF883E" }],
        },
      ],
    },
  },
  {
    code: "it",
    name: "Italie",
    region: "europe",
    cities: ["ROMA", "MILANO", "NAPOLI", "TORINO", "PALERMO"],
    accent: "#008C45",
    defaultThread: "navy",
    spec: {
      base: "#FFFFFF",
      layers: [
        {
          k: "bands",
          dir: "v",
          bands: [{ c: "#008C45" }, { c: "#F4F5F0" }, { c: "#CD212A" }],
        },
      ],
    },
  },
  {
    code: "pt",
    name: "Portugal",
    region: "europe",
    cities: ["LISBOA", "PORTO", "BRAGA", "COIMBRA", "FUNCHAL"],
    accent: "#006600",
    defaultThread: "white",
    spec: {
      base: "#FF0000",
      layers: [
        {
          k: "bands",
          dir: "v",
          bands: [
            { c: "#006600", w: 2 },
            { c: "#FF0000", w: 3 },
          ],
        },
        // Sphère armillaire stylisée : anneaux d'or et écu blanc.
        { k: "circle", cx: 0.4, cy: 0.5, r: 0.19, stroke: "#FFE800", sw: 0.022 },
        {
          k: "path",
          d: "M120 68 A 22 32 0 0 0 120 132 A 22 32 0 0 0 120 68 Z",
          stroke: "#FFE800",
          sw: 3,
        },
        { k: "path", d: "M96 100 L 144 100", stroke: "#FFE800", sw: 3 },
        { k: "path", d: "M99 84 L 141 84 M99 116 L 141 116", stroke: "#FFE800", sw: 2 },
        // Écu portugais simplifié.
        {
          k: "path",
          d: "M108 82 L132 82 L132 106 Q132 120 120 126 Q108 120 108 106 Z",
          c: "#FFFFFF",
          stroke: "#C00000",
          sw: 3,
        },
        {
          k: "path",
          d: "M114 90 L126 90 L126 108 Q126 114 120 117 Q114 114 114 108 Z",
          c: "#002D62",
        },
      ],
    },
  },
  {
    code: "es",
    name: "Espagne",
    region: "europe",
    cities: ["MADRID", "BARCELONA", "SEVILLA", "VALENCIA", "BILBAO"],
    accent: "#AA151B",
    defaultThread: "navy",
    spec: {
      base: "#F1BF00",
      layers: [
        {
          k: "bands",
          dir: "h",
          bands: [
            { c: "#AA151B", w: 1 },
            { c: "#F1BF00", w: 2 },
            { c: "#AA151B", w: 1 },
          ],
        },
        // Écu stylisé : quatre quartiers et une couronne, lisibles à petite taille.
        {
          k: "path",
          d: "M78 78 L114 78 L114 108 Q114 124 96 132 Q78 124 78 108 Z",
          c: "#FFFFFF",
          stroke: "#7A1015",
          sw: 2.5,
        },
        { k: "rect", x: 0.26, y: 0.39, w: 0.06, h: 0.13, c: "#AA151B" },
        { k: "rect", x: 0.32, y: 0.39, w: 0.06, h: 0.13, c: "#F1BF00" },
        { k: "rect", x: 0.26, y: 0.52, w: 0.06, h: 0.1, c: "#F1BF00" },
        { k: "rect", x: 0.32, y: 0.52, w: 0.06, h: 0.1, c: "#AA151B" },
        {
          k: "path",
          d: "M78 74 L114 74 L110 64 L104 70 L96 60 L88 70 L82 64 Z",
          c: "#F1BF00",
          stroke: "#7A1015",
          sw: 1.5,
        },
      ],
    },
  },
  {
    code: "de",
    name: "Allemagne",
    region: "europe",
    cities: ["BERLIN", "MÜNCHEN", "HAMBURG", "DORTMUND", "KÖLN"],
    accent: "#DD0000",
    defaultThread: "black",
    spec: {
      base: "#000000",
      layers: [
        {
          k: "bands",
          dir: "h",
          bands: [{ c: "#000000" }, { c: "#DD0000" }, { c: "#FFCE00" }],
        },
      ],
    },
  },
  {
    code: "nl",
    name: "Pays-Bas",
    region: "europe",
    cities: ["AMSTERDAM", "ROTTERDAM", "EINDHOVEN", "UTRECHT"],
    accent: "#AE1C28",
    defaultThread: "white",
    spec: {
      base: "#FFFFFF",
      layers: [
        {
          k: "bands",
          dir: "h",
          bands: [{ c: "#AE1C28" }, { c: "#FFFFFF" }, { c: "#21468B" }],
        },
      ],
    },
  },
  {
    code: "be",
    name: "Belgique",
    region: "europe",
    cities: ["BRUXELLES", "ANVERS", "LIÈGE", "CHARLEROI", "GAND"],
    accent: "#FAE042",
    defaultThread: "white",
    spec: {
      base: "#000000",
      layers: [
        {
          k: "bands",
          dir: "v",
          bands: [{ c: "#000000" }, { c: "#FAE042" }, { c: "#ED2939" }],
        },
      ],
    },
  },
  {
    code: "pl",
    name: "Pologne",
    region: "europe",
    cities: ["WARSZAWA", "KRAKÓW", "GDAŃSK", "POZNAŃ"],
    accent: "#DC143C",
    defaultThread: "white",
    spec: {
      base: "#FFFFFF",
      layers: [
        {
          k: "bands",
          dir: "h",
          bands: [{ c: "#FFFFFF" }, { c: "#DC143C" }],
        },
      ],
    },
  },
  {
    code: "hr",
    name: "Croatie",
    region: "europe",
    cities: ["ZAGREB", "SPLIT", "RIJEKA", "OSIJEK"],
    accent: "#FF0000",
    defaultThread: "white",
    spec: {
      base: "#FFFFFF",
      layers: [
        {
          k: "bands",
          dir: "h",
          bands: [{ c: "#FF0000" }, { c: "#FFFFFF" }, { c: "#171796" }],
        },
        {
          k: "path",
          d: "M126 62 L174 62 L174 108 Q174 132 150 142 Q126 132 126 108 Z",
          c: "#FFFFFF",
          stroke: "#FFFFFF",
          sw: 4,
        },
        {
          k: "checker",
          x: 0.42,
          y: 0.31,
          w: 0.16,
          h: 0.28,
          cols: 4,
          rows: 4,
          a: "#FFFFFF",
          b: "#FF0000",
        },
      ],
    },
  },
  {
    code: "ch",
    name: "Suisse",
    region: "europe",
    cities: ["ZÜRICH", "GENÈVE", "BASEL", "BERN", "LAUSANNE"],
    accent: "#FF0000",
    defaultThread: "white",
    spec: {
      base: "#FF0000",
      layers: [{ k: "cross", c: "#FFFFFF", t: 0.2 }],
    },
  },
  {
    code: "dk",
    name: "Danemark",
    region: "europe",
    cities: ["KØBENHAVN", "AARHUS", "ODENSE", "AALBORG"],
    accent: "#C60C30",
    defaultThread: "white",
    spec: {
      base: "#C60C30",
      layers: [{ k: "cross", c: "#FFFFFF", t: 0.16, x: 0.36 }],
    },
  },
  {
    code: "se",
    name: "Suède",
    region: "europe",
    cities: ["STOCKHOLM", "GÖTEBORG", "MALMÖ", "UPPSALA"],
    accent: "#006AA7",
    defaultThread: "white",
    spec: {
      base: "#006AA7",
      layers: [{ k: "cross", c: "#FECC00", t: 0.16, x: 0.36 }],
    },
  },
  {
    code: "gr",
    name: "Grèce",
    region: "europe",
    cities: ["ATHÍNA", "THESSALONÍKI", "PATRA", "IRÁKLEIO"],
    accent: "#0D5EAF",
    defaultThread: "white",
    spec: {
      base: "#FFFFFF",
      layers: [
        {
          k: "bands",
          dir: "h",
          bands: [
            { c: "#0D5EAF" },
            { c: "#FFFFFF" },
            { c: "#0D5EAF" },
            { c: "#FFFFFF" },
            { c: "#0D5EAF" },
            { c: "#FFFFFF" },
            { c: "#0D5EAF" },
            { c: "#FFFFFF" },
            { c: "#0D5EAF" },
          ],
        },
        { k: "rect", x: 0, y: 0, w: 0.185, h: 0.555, c: "#0D5EAF" },
        { k: "rect", x: 0.074, y: 0, w: 0.037, h: 0.555, c: "#FFFFFF" },
        { k: "rect", x: 0, y: 0.222, w: 0.185, h: 0.111, c: "#FFFFFF" },
      ],
    },
  },
  {
    code: "ua",
    name: "Ukraine",
    region: "europe",
    cities: ["KYIV", "LVIV", "ODESA", "KHARKIV"],
    accent: "#0057B7",
    defaultThread: "navy",
    spec: {
      base: "#FFDD00",
      layers: [
        {
          k: "bands",
          dir: "h",
          bands: [{ c: "#0057B7" }, { c: "#FFDD00" }],
        },
      ],
    },
  },

  /* ---------------------------- Afrique --------------------------------- */
  {
    code: "ma",
    name: "Maroc",
    region: "afrique",
    cities: ["CASABLANCA", "RABAT", "MARRAKECH", "FÈS", "TANGER", "AGADIR"],
    accent: "#C1272D",
    defaultThread: "white",
    spec: {
      base: "#C1272D",
      layers: [
        {
          k: "star",
          cx: 0.5,
          cy: 0.5,
          r: 0.26,
          inner: 0.5,
          stroke: "#006233",
          sw: 0.028,
        },
      ],
    },
  },
  {
    code: "dz",
    name: "Algérie",
    region: "afrique",
    cities: ["ALGER", "ORAN", "CONSTANTINE", "ANNABA", "TIZI OUZOU"],
    accent: "#006233",
    defaultThread: "navy",
    spec: {
      base: "#FFFFFF",
      layers: [
        { k: "rect", x: 0, y: 0, w: 0.5, h: 1, c: "#006233" },
        { k: "crescent", cx: 0.5, cy: 0.5, r: 0.24, dx: 0.05, cut: 0.19, c: "#D21034" },
        { k: "star", cx: 0.545, cy: 0.5, r: 0.13, c: "#D21034", rot: 18 },
      ],
    },
  },
  {
    code: "tn",
    name: "Tunisie",
    region: "afrique",
    cities: ["TUNIS", "SFAX", "SOUSSE", "BIZERTE", "KAIROUAN"],
    accent: "#E70013",
    defaultThread: "white",
    spec: {
      base: "#E70013",
      layers: [
        { k: "circle", cx: 0.5, cy: 0.5, r: 0.31, c: "#FFFFFF" },
        { k: "crescent", cx: 0.5, cy: 0.5, r: 0.22, dx: 0.055, cut: 0.175, c: "#E70013" },
        { k: "star", cx: 0.545, cy: 0.5, r: 0.12, c: "#E70013", rot: 18 },
      ],
    },
  },
  {
    code: "sn",
    name: "Sénégal",
    region: "afrique",
    cities: ["DAKAR", "THIÈS", "SAINT-LOUIS", "ZIGUINCHOR"],
    accent: "#00853F",
    defaultThread: "navy",
    spec: {
      base: "#FDEF42",
      layers: [
        {
          k: "bands",
          dir: "v",
          bands: [{ c: "#00853F" }, { c: "#FDEF42" }, { c: "#E31B23" }],
        },
        { k: "star", cx: 0.5, cy: 0.5, r: 0.19, c: "#00853F" },
      ],
    },
  },
  {
    code: "ci",
    name: "Côte d'Ivoire",
    region: "afrique",
    cities: ["ABIDJAN", "YAMOUSSOUKRO", "BOUAKÉ", "DALOA"],
    accent: "#F77F00",
    defaultThread: "navy",
    spec: {
      base: "#FFFFFF",
      layers: [
        {
          k: "bands",
          dir: "v",
          bands: [{ c: "#F77F00" }, { c: "#FFFFFF" }, { c: "#009E60" }],
        },
      ],
    },
  },
  {
    code: "cm",
    name: "Cameroun",
    region: "afrique",
    cities: ["YAOUNDÉ", "DOUALA", "GAROUA", "BAFOUSSAM"],
    accent: "#007A5E",
    defaultThread: "navy",
    spec: {
      base: "#CE1126",
      layers: [
        {
          k: "bands",
          dir: "v",
          bands: [{ c: "#007A5E" }, { c: "#CE1126" }, { c: "#FCD116" }],
        },
        { k: "star", cx: 0.5, cy: 0.5, r: 0.16, c: "#FCD116" },
      ],
    },
  },
  {
    code: "ng",
    name: "Nigeria",
    region: "afrique",
    cities: ["LAGOS", "ABUJA", "KANO", "IBADAN"],
    accent: "#008751",
    defaultThread: "navy",
    spec: {
      base: "#FFFFFF",
      layers: [
        {
          k: "bands",
          dir: "v",
          bands: [{ c: "#008751" }, { c: "#FFFFFF" }, { c: "#008751" }],
        },
      ],
    },
  },
  {
    code: "gh",
    name: "Ghana",
    region: "afrique",
    cities: ["ACCRA", "KUMASI", "TAMALE", "TAKORADI"],
    accent: "#CE1126",
    defaultThread: "white",
    spec: {
      base: "#FCD116",
      layers: [
        {
          k: "bands",
          dir: "h",
          bands: [{ c: "#CE1126" }, { c: "#FCD116" }, { c: "#006B3F" }],
        },
        { k: "star", cx: 0.5, cy: 0.5, r: 0.17, c: "#000000" },
      ],
    },
  },
  {
    code: "ml",
    name: "Mali",
    region: "afrique",
    cities: ["BAMAKO", "SIKASSO", "MOPTI", "GAO"],
    accent: "#14B53A",
    defaultThread: "navy",
    spec: {
      base: "#FCD116",
      layers: [
        {
          k: "bands",
          dir: "v",
          bands: [{ c: "#14B53A" }, { c: "#FCD116" }, { c: "#CE1126" }],
        },
      ],
    },
  },
  {
    code: "cd",
    name: "RD Congo",
    region: "afrique",
    cities: ["KINSHASA", "LUBUMBASHI", "GOMA", "KISANGANI"],
    accent: "#007FFF",
    defaultThread: "white",
    spec: {
      base: "#007FFF",
      layers: [
        // Bande diagonale : un liseré rouge, puis le jaune par-dessus.
        { k: "path", d: "M-20 230 L320 -30", stroke: "#CE1021", sw: 54 },
        { k: "path", d: "M-20 230 L320 -30", stroke: "#F7D618", sw: 30 },
        { k: "star", cx: 0.12, cy: 0.2, r: 0.15, c: "#F7D618" },
      ],
    },
  },

  /* --------------------------- Amériques -------------------------------- */
  {
    code: "br",
    name: "Brésil",
    region: "ameriques",
    cities: ["SÃO PAULO", "RIO DE JANEIRO", "SALVADOR", "BELO HORIZONTE", "RECIFE"],
    accent: "#009739",
    defaultThread: "white",
    spec: {
      base: "#009739",
      layers: [
        { k: "diamond", cx: 0.5, cy: 0.5, rx: 0.42, ry: 0.42, c: "#FEDD00" },
        { k: "circle", cx: 0.5, cy: 0.5, r: 0.25, c: "#012169" },
        {
          k: "path",
          d: "M111 92 Q150 74 189 96 L186 108 Q150 88 114 104 Z",
          c: "#FFFFFF",
        },
        { k: "star", cx: 0.47, cy: 0.44, r: 0.03, c: "#FFFFFF" },
        { k: "star", cx: 0.53, cy: 0.57, r: 0.025, c: "#FFFFFF" },
        { k: "star", cx: 0.44, cy: 0.56, r: 0.022, c: "#FFFFFF" },
        { k: "star", cx: 0.56, cy: 0.42, r: 0.02, c: "#FFFFFF" },
      ],
    },
  },
  {
    code: "ar",
    name: "Argentine",
    region: "ameriques",
    cities: ["BUENOS AIRES", "CÓRDOBA", "ROSARIO", "MENDOZA", "LA PLATA"],
    accent: "#74ACDF",
    defaultThread: "navy",
    spec: {
      base: "#FFFFFF",
      layers: [
        {
          k: "bands",
          dir: "h",
          bands: [{ c: "#74ACDF" }, { c: "#FFFFFF" }, { c: "#74ACDF" }],
        },
        { k: "sun", cx: 0.5, cy: 0.5, r: 0.1, rays: 16, c: "#F6B40E" },
      ],
    },
  },
  {
    code: "co",
    name: "Colombie",
    region: "ameriques",
    cities: ["BOGOTÁ", "MEDELLÍN", "CALI", "BARRANQUILLA"],
    accent: "#FCD116",
    defaultThread: "white",
    spec: {
      base: "#FCD116",
      layers: [
        {
          k: "bands",
          dir: "h",
          bands: [
            { c: "#FCD116", w: 2 },
            { c: "#003893", w: 1 },
            { c: "#CE1126", w: 1 },
          ],
        },
      ],
    },
  },
  {
    code: "us",
    name: "États-Unis",
    region: "ameriques",
    cities: ["NEW YORK", "LOS ANGELES", "CHICAGO", "MIAMI", "BOSTON"],
    accent: "#B31942",
    defaultThread: "navy",
    spec: {
      base: "#FFFFFF",
      layers: [
        {
          k: "bands",
          dir: "h",
          bands: Array.from({ length: 13 }, (_, i) => ({
            c: i % 2 === 0 ? "#B31942" : "#FFFFFF",
          })),
        },
        { k: "rect", x: 0, y: 0, w: 0.4, h: 0.538, c: "#0A3161" },
        {
          k: "starfield",
          x: 0.02,
          y: 0.04,
          w: 0.36,
          h: 0.46,
          rows: 9,
          cols: 11,
          r: 0.028,
          c: "#FFFFFF",
        },
      ],
    },
  },

  /* ------------------------- Asie & Océanie ----------------------------- */
  {
    code: "tr",
    name: "Turquie",
    region: "asie-oceanie",
    cities: ["İSTANBUL", "ANKARA", "İZMİR", "BURSA", "TRABZON"],
    accent: "#E30A17",
    defaultThread: "white",
    spec: {
      base: "#E30A17",
      layers: [
        { k: "crescent", cx: 0.42, cy: 0.5, r: 0.25, dx: 0.06, cut: 0.2, c: "#FFFFFF" },
        { k: "star", cx: 0.6, cy: 0.5, r: 0.125, c: "#FFFFFF", rot: 18 },
      ],
    },
  },
  {
    code: "jp",
    name: "Japon",
    region: "asie-oceanie",
    cities: ["TOKYO", "OSAKA", "KYOTO", "YOKOHAMA", "SAPPORO"],
    accent: "#BC002D",
    defaultThread: "navy",
    spec: {
      base: "#FFFFFF",
      layers: [{ k: "circle", cx: 0.5, cy: 0.5, r: 0.3, c: "#BC002D" }],
    },
  },
];

export const REGIONS = [
  { id: "europe", label: "Europe" },
  { id: "afrique", label: "Afrique" },
  { id: "ameriques", label: "Amériques" },
  { id: "asie-oceanie", label: "Asie & Océanie" },
] as const;

export function getCountry(code: string): Country | undefined {
  return COUNTRIES.find((country) => country.code === code);
}

export const DEFAULT_COUNTRY = COUNTRIES[0];
