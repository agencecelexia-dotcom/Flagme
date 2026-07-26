import {
  Bungee,
  Fredoka,
  Anton,
  Alfa_Slab_One,
  Yellowtail,
} from "next/font/google";

/** Titrage : lettrage de borne d'arcade, tout en capitales. */
export const bungee = Bungee({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-arcade",
  display: "swap",
});

/** Interface et texte courant : grotesque arrondi, esprit bonbon. */
export const fredoka = Fredoka({
  subsets: ["latin"],
  variable: "--font-candy",
  display: "swap",
});

/* --- Polices de broderie : elles imitent de vrais styles de machine, --- */
/* --- elles restent donc sobres même si le site est explosif.         --- */

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

export const fontVariables = [
  bungee.variable,
  fredoka.variable,
  anton.variable,
  alfaSlab.variable,
  yellowtail.variable,
].join(" ");
