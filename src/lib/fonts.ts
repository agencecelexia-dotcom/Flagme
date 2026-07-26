import { Anton, Archivo, Alfa_Slab_One, Yellowtail } from "next/font/google";

/** Titrage de marque : condensé, majuscule, esprit flocage de maillot. */
export const anton = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-anton",
  display: "swap",
});

/** Texte courant et interface. */
export const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
});

/** Style de broderie « Varsity » : slab épais, esprit college américain. */
export const alfaSlab = Alfa_Slab_One({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-alfa",
  display: "swap",
});

/** Style de broderie « Script » : cursive penchée, esprit ultras italiens. */
export const yellowtail = Yellowtail({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-yellowtail",
  display: "swap",
});

export const fontVariables = [
  anton.variable,
  archivo.variable,
  alfaSlab.variable,
  yellowtail.variable,
].join(" ");
