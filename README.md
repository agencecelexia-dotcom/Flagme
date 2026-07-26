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

## Direction artistique — « Atelier »

Calme, chaude, premium : le produit est la seule image forte de la page, et
l'interface se tait pour le laisser passer. Tout le système tient dans
`src/app/globals.css` :

- **Fond os** (`--color-bone`), surfaces blanches, filets très clairs.
- **Une seule couleur d'accent** : la terre cuite `--color-clay`, celle d'un
  fil. Elle ne sert qu'aux surtitres (`.eyebrow`) et à quelques micro-signaux.
  Aucune section n'est colorée.
- **Une seule police** — Plus Jakarta Sans. La hiérarchie vient du poids et de
  la taille : `.display` pour les titres (800, très serré), le reste en 400/600.
- **Aucun contour, aucune ombre dure.** Les surfaces sont des `.card` à ombre
  très basse, les boutons des `.pill` claires ou encre.
- **Mouvement lent et ample** : `rise`, `sway`, `drift`. Rien ne rebondit.
  Tout tombe sous `prefers-reduced-motion`.

Les polices de broderie (`Anton`, `Alfa Slab One`, `Yellowtail`, `Fredoka`)
n'apparaissent que sur le produit — elles imitent de vrais styles de machine et
ne suivent pas la DA du site.

Les noms de ville sont stockés en casse normale (« Saint-Étienne », pas
« SAINT-ÉTIENNE ») : c'est la broderie qui met en capitales quand le style
l'exige, pas la donnée.

## Les pages

- **Home** — héros, les trois étapes, catalogue défilant, styles de broderie,
  Euro 2028 avec compte à rebours, formats comparés à l'échelle, avis.
- **Configurateur** (`/configurateur`) — quatre étapes numérotées avec rail
  collant, aperçu collant à gauche sur desktop et barre collante en bas sur
  mobile, prix détaillé ligne par ligne.
- **Nations** (`/nations`) — le catalogue complet, chaque vignette montrant
  déjà une ville brodée, avec recherche et filtres.
- **Formats** (`/formats`) — comparateur à l'échelle silhouette comprise, puis
  les quatre fiches côte à côte.
- **Qualité** (`/qualite`) — les caractéristiques, la comparaison brodé contre
  imprimé, les délais d'atelier.
- **Euro 2028** (`/euro-2028`) — compte à rebours, les quatre nations hôtes,
  les huit villes hôtes cliquables qui pré-remplissent le configurateur.
- **Manifeste** (`/manifeste`), **FAQ** (`/faq`) en deux colonnes.
- **Panier** (`/panier`) — persistant, avec quantités et frais de port.
- Page 404, `sitemap.xml`, `robots.txt` et image de partage (1200 × 630).

## Les photographies

Le parti pris : la photo ne sert qu'à la **matière et à l'atmosphère** — fil,
atelier, tribune, tissu au mur. Elle ne représente jamais un drapeau précis,
ce rôle restant au rendu vectoriel. Sinon on montrerait à l'acheteur une image
qui ne correspond pas à ce qu'on lui livre.

Quatre emplacements attendent leurs fichiers dans la colonne gauche de
`/qualite`. Il suffit de les déposer dans `public/photos/` :

| Fichier | Rapport | Sujet |
|---|---|---|
| `broderie-macro.jpg` | 16/10 | Le fil bombé, la maille en arrière-plan |
| `atelier.jpg` | 4/3 | Tête de machine à broder en action |
| `tribune.jpg` | 16/10 | Tribune au crépuscule, drapeaux flous, de dos |
| `mur.jpg` | 4/3 | Drapeau accroché sur un mur clair |

`src/lib/photos.ts` vérifie leur présence **à la construction** : tant qu'un
fichier manque, `PhotoFrame` affiche un cadre annoté avec le sujet attendu et
le nom à déposer — jamais une image cassée.

L'image de partage est régénérée en capturant une composition dédiée dans un
navigateur, puis enregistrée en `src/app/opengraph-image.png`. La route de
composition n'est pas conservée.

### Le parcours

La navigation ne contient que des pages, jamais l'action : « Créer mon
drapeau » est une pilule à droite, présente partout, et n'apparaît pas deux
fois. Le configurateur annonce ses quatre étapes dans un rail collant,
chaque carte renvoie vers la suivante, et sur mobile une barre collante garde
en vue la vignette du drapeau, le prix et le bouton — sans elle, on réglait
sa broderie sans jamais voir le résultat.

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
du tissu et les plis. Le fourreau et les œillets existent derrière le drapeau
`hardware`, mais restent désactivés : sur fond clair, la bande blanche disparaît
et il ne reste que le pointillé de surpiqûre.

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
contour de contraste est inclus. `recommendedOutline` le pose dans la polarité
inverse du fil (sombre sous un fil clair, clair sous un fil sombre) : un
drapeau change de couleur sur toute sa largeur et le texte le traverse, la
polarité inverse est la seule règle qui tienne quel que soit le fond.

`lib/delivery.ts` calcule une date de livraison — jours ouvrés d'atelier puis
jours calendaires de transport. « Livré vers le 12 août » se comprend mieux
qu'un « sous 5 jours » que l'acheteur doit convertir lui-même. Le calcul se
fait côté client : ces pages sont rendues à la construction, une date calculée
côté serveur serait figée au jour du déploiement.

## Étape suivante : le backend commandes

Le panier vit dans `localStorage` (`src/lib/cart.tsx`) derrière une interface
stable — `add`, `remove`, `setQty`, `clear`. C'est la seule couche à remplacer
quand l'API arrivera. Le bouton de paiement est volontairement désactivé et
annoncé comme tel plutôt que factice.

Restent à construire : persistance des commandes, paiement, comptes clients,
et transmission du fichier de broderie à l'atelier.

## Avant une mise en ligne réelle

- **Les avis de la home sont fictifs** (`PROOF` dans `src/app/page.tsx`) et
  doivent être remplacés par de vrais retours. Publier des avis inventés
  trompe l'acheteur et n'est pas légal.
- **Mentions légales, CGV et page Livraison & retours** sont des libellés sans
  page derrière, dans le pied de page.
- **Les caractéristiques produit** (maille 115 g, garantie trois ans, délais)
  sont des hypothèses à confirmer avec l'atelier avant d'être publiées.
- **`NEXT_PUBLIC_SITE_URL`** doit pointer sur le domaine réel, sinon le
  sitemap et les métadonnées de partage annoncent `flagme.fr`.
- Le paiement est désactivé et annoncé comme tel.
