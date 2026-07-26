import {
  Plus_Jakarta_Sans,
  Anton,
  Alfa_Slab_One,
  Yellowtail,
  Fredoka,
} from "next/font/google";

/**
 * Une seule police pour tout le site : titrage, interface, texte courant.
 * La hiérarchie vient du poids et de la taille, jamais d'un second caractère.
 */
export const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-ui",
  display: "swap",
});

/* --- Polices de broderie : elles imitent de vrais styles de machine et --- */
/* --- n'apparaissent que sur le produit, jamais dans l'interface.       --- */

/** Broderie « Terrace » : condensé, esprit flocage de maillot. */
export const anton = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-anton",
  display: "swap",
});

/** Broderie « Varsity » : slab épais, esprit college américain. */
export const alfaSlab = Alfa_Slab_One({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-alfa",
  display: "swap",
});

/** Broderie « Script » : cursive penchée, esprit ultras italiens. */
export const yellowtail = Yellowtail({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-yellowtail",
  display: "swap",
});

/** Broderie « Bubble » : lettres rondes et pleines. */
export const fredoka = Fredoka({
  subsets: ["latin"],
  variable: "--font-fredoka",
  display: "swap",
});

export const fontVariables = [
  jakarta.variable,
  anton.variable,
  alfaSlab.variable,
  yellowtail.variable,
  fredoka.variable,
].join(" ");
