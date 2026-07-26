# FlagMe

Site marchand de drapeaux de supporter personnalisés : on choisit un pays, on
brode sa ville ou son texte dessus — le geste des tribunes anglaises, transformé
en produit.

## Démarrer

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # build de production
```

## Ce que couvre cette première version

- **Home** — héros avec vitrine tournante de combinaisons pays/ville, catalogue
  défilant, styles de broderie, formats, preuve sociale.
- **Configurateur** (`/configurateur`) — le cœur du site : choix du pays,
  saisie du texte, style de broderie, fil, contour, taille, position, format et
  finition, avec aperçu en direct et prix détaillé ligne par ligne.
- **Formats** (`/formats`), **Manifeste** (`/manifeste`), **FAQ** (`/faq`).
- **Panier** (`/panier`) — persistant, avec quantités et frais de port.

Le configurateur est partageable par URL : `?pays=ma&format=tifo&ligne1=Casablanca`.

## Architecture

```
src/
  app/                 pages App Router
  components/
    flag/              rendu des drapeaux et de la broderie (SVG)
    configurator/      le configurateur et ses sélecteurs
    cart/ home/ layout/ brand/
  data/                countries · formats · customization
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
Le tout passe par un filtre de turbulence qui effiloche légèrement les bords et
pose une ombre portée sur le tissu.

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
contour de contraste est inclus.

## Étape suivante : le backend commandes

Le panier vit dans `localStorage` (`src/lib/cart.tsx`) derrière une interface
stable — `add`, `remove`, `setQty`, `clear`. C'est la seule couche à remplacer
quand l'API arrivera. Le bouton de paiement est volontairement désactivé et
annoncé comme tel plutôt que factice.

Restent à construire : persistance des commandes, paiement, comptes clients,
et transmission du fichier de broderie à l'atelier.
