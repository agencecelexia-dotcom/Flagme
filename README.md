# FlagMe

Site marchand de drapeaux de supporter personnalisés : on choisit un pays, on
brode sa ville ou son texte dessus — le geste des tribunes anglaises, transformé
en produit. Le fil rouge du site est l'Euro 2028, qui se joue précisément là où
la tradition est née.

## Démarrer

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # build de production
```

## Direction artistique — « Candy Arcade »

Un magasin de bonbons avec une borne d'arcade au fond. Le système tient en
quelques règles, toutes dans `src/app/globals.css` :

- **Fond crème** (`--color-cream`), sections en teintes bonbon diluées
  (`--color-tint-*`), accents saturés (fuchsia, citron, menthe, raisin, lime).
- **L'autocollant** est la brique de base : contour noir de 3 px, gros arrondi,
  ombre dure non floutée. Les classes `.sticker` / `.sticker-sm` la posent,
  `.sticker-press` l'enfonce au clic. Presque tout le site en est fait.
- **Deux polices** : `Bungee` pour le lettrage d'arcade (`.arcade`,
  `.arcade-hero`, `.hud`), `Fredoka` pour le texte courant.
- **Rien ne glisse, tout rebondit** : `pop-in`, `wiggle`, `bob`, `sway`. Toutes
  les animations tombent sous `prefers-reduced-motion`.
- Utilitaires de trame : `.dots`, `.stripes`, qui prennent la `currentColor` de
  leur parent.

Les polices de broderie (`Anton`, `Alfa Slab One`, `Yellowtail`, `Fredoka`)
restent sobres : elles imitent de vrais styles de machine, elles ne suivent pas
la DA du site.

## Les pages

- **Home** — héros, section Euro 2028 avec compte à rebours, catalogue
  défilant, styles de broderie, formats à l'échelle, preuve sociale.
- **Configurateur** (`/configurateur`) — monté comme un écran de sélection de
  jeu : barre de HUD, roster de nations, panneaux numérotés, aperçu géant qui
  prend la couleur du pays, prix détaillé ligne par ligne.
- **Euro 2028** (`/euro-2028`) — compte à rebours, les quatre nations hôtes,
  les huit villes hôtes cliquables qui pré-remplissent le configurateur.
- **Formats** (`/formats`), **Manifeste** (`/manifeste`), **FAQ** (`/faq`).
- **Panier** (`/panier`) — persistant, avec quantités et frais de port.

Le configurateur est partageable par URL : `?pays=gb-wls&format=tifo&ligne1=Cardiff`.

## Architecture

```
src/
  app/                 pages App Router
  components/
    flag/              rendu des drapeaux et de la broderie (SVG)
    configurator/      l'écran de création et ses sélecteurs
    euro/ cart/ home/ layout/ brand/
  data/                countries · formats · customization · euro2028
  lib/                 flag-spec · pricing · cart · fonts
```

### Le rendu des drapeaux

Chaque drapeau est décrit en données, pas en image : `src/data/countries.ts`
contient une `FlagSpec` par nation (bandes, croix, sautoir, croissant, étoiles,
damier, semis, tracés libres), que `components/flag/FlagArt.tsx` traduit en SVG
dans un repère normalisé de 300 × 200.

Conséquences : aucun asset binaire, un drapeau se corrige en changeant une
couleur, et l'ajout d'une nation est une entrée de tableau. Les positions
horizontales sont exprimées en fractions de la largeur, les rayons et épaisseurs
en fractions de la hauteur — la convention vexillologique.

`FlagPreview.tsx` compose ensuite l'objet fini : le dessin, la broderie, le grain
du tissu, les plis, le fourreau et les œillets.

### La broderie

`EmbroideredText.tsx` empile, pour chaque ligne : un contour optionnel, le corps
du fil (bord assombri pour le relief), une trame satin inclinée, et un reflet.
Contour et corps partagent le même filtre de turbulence — sinon le contour reste
net pendant que la lettre s'effiloche, et l'illusion tombe.

Le texte est mesuré côté client (`getComputedTextLength`, re-mesuré après
`document.fonts.ready`) puis réduit pour tenir dans le drapeau, quelle que soit
la longueur saisie.

### Prix

`lib/pricing.ts` construit un détail ligne par ligne plutôt qu'un total opaque.
Le prix de base inclut une ligne brodée, les ourlets et les œillets. Sont
facturés : la seconde ligne, le fil métallisé, le contour doré et la finition
tribune.

Les réglages proposés par défaut sont toujours gratuits — la couleur de fil
recommandée par pays est choisie pour contraster avec le bas du drapeau, et le
contour de contraste est inclus (`recommendedOutline`).

## Étape suivante : le backend commandes

Le panier vit dans `localStorage` (`src/lib/cart.tsx`) derrière une interface
stable — `add`, `remove`, `setQty`, `clear`. C'est la seule couche à remplacer
quand l'API arrivera. Le bouton de paiement est volontairement désactivé et
annoncé comme tel plutôt que factice.

Restent à construire : persistance des commandes, paiement, comptes clients,
et transmission du fichier de broderie à l'atelier.
