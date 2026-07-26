import fs from "node:fs";
import path from "node:path";

/**
 * Photographies du site.
 *
 * Le parti pris : la photo ne sert qu'à la matière et à l'atmosphère — fil,
 * atelier, tribune, tissu au mur. Elle ne représente jamais un drapeau
 * précis, ce rôle restant au rendu vectoriel. Sinon on montrerait à
 * l'acheteur une image qui ne correspond pas à ce qu'on lui livre.
 */
export type Photo = {
  file: string;
  /** Rapport largeur / hauteur attendu, pour réserver la place. */
  ratio: string;
  alt: string;
  caption: string;
  /** Sujet attendu, affiché dans l'emplacement tant que le fichier manque. */
  brief: string;
};

export const QUALITY_PHOTOS: Photo[] = [
  {
    file: "broderie-macro.jpg",
    ratio: "16 / 10",
    alt: "Gros plan sur une broderie au point satin, le fil formant un relief épais sur la maille.",
    caption: "Le fil en relief, point satin serré.",
    brief: "Macro broderie — le fil bombé, la maille en arrière-plan",
  },
  {
    file: "atelier.jpg",
    ratio: "4 / 3",
    alt: "Tête de machine à broder industrielle piquant du fil dans une toile tendue.",
    caption: "Chaque drapeau part sur la machine après la commande.",
    brief: "Atelier — tête de machine à broder en action",
  },
  {
    file: "tribune.jpg",
    ratio: "16 / 10",
    alt: "Supporters vus de dos dans une tribune au crépuscule, drapeaux levés.",
    caption: "Là où ces drapeaux servent vraiment.",
    brief: "Tribune au crépuscule, drapeaux flous, vus de dos",
  },
  {
    file: "mur.jpg",
    ratio: "4 / 3",
    alt: "Drapeau en tissu accroché à plat sur un mur clair, plis et œillets visibles.",
    caption: "La moitié de nos clients ne le sortent jamais du salon.",
    brief: "Intérieur — drapeau accroché sur un mur clair",
  },
];

/**
 * Le fichier est-il présent dans `public/photos` ?
 *
 * Vérifié à la construction plutôt qu'au rendu : les pages sont statiques,
 * et un emplacement vide doit s'afficher comme un cadre annoté, jamais comme
 * une image cassée.
 */
export function photoExists(file: string): boolean {
  try {
    return fs.existsSync(path.join(process.cwd(), "public", "photos", file));
  } catch {
    return false;
  }
}
