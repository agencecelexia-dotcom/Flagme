import Link from "next/link";
import { HeroShowcase } from "@/components/home/HeroShowcase";
import { FlagStrip } from "@/components/home/FlagStrip";
import { FlagPreview } from "@/components/flag/FlagPreview";
import { Countdown } from "@/components/euro/Countdown";
import { COUNTRIES, getCountry } from "@/data/countries";
import { FORMATS } from "@/data/formats";
import { STITCH_FONTS } from "@/data/customization";
import { HOST_CITIES, HOST_NATIONS } from "@/data/euro2028";
import { formatPrice } from "@/lib/pricing";

const STEPS = [
  {
    n: "01",
    title: "Choisis ton pays",
    body: "Des nations dessinées une par une. Celui de tes parents, celui de ton cœur, ou les deux.",
    tone: "bg-mint",
    emoji: "🌍",
  },
  {
    n: "02",
    title: "Brode ce que tu veux",
    body: "Ta ville, ton quartier, une date, un surnom. Quatre styles, huit couleurs de fil, deux lignes.",
    tone: "bg-lemon",
    emoji: "🧵",
  },
  {
    n: "03",
    title: "On coud, tu déploies",
    body: "Fil épais sur maille 115 g, ourlets doublés, œillets laiton. Expédié sous cinq jours.",
    tone: "bg-tint-bubble",
    emoji: "🚀",
  },
];

const PROOF = [
  {
    quote:
      "Parti à Séville avec le drapeau brodé « SAINT-DENIS ». Trois personnes sont venues me demander où je l'avais fait.",
    author: "Karim",
    detail: "France · Tribune",
    tone: "bg-tint-mint",
  },
  {
    quote:
      "Je l'ai offert à mon père avec le nom du village de mes grands-parents. Il l'a accroché dans le salon, pas au stade.",
    author: "Inès",
    detail: "Algérie · Poche",
    tone: "bg-tint-lemon",
  },
  {
    quote:
      "La broderie ne bouge pas après une saison entière de déplacements sous la pluie. C'est du vrai fil, pas du flocage.",
    author: "Tom",
    detail: "Angleterre · Tifo XXL",
    tone: "bg-tint-bubble",
  },
];

export default function HomePage() {
  const stitchDemo = getCountry("gb-eng")!;
  const franceSpec = getCountry("fr")!.spec;
  const largestWidthCm = Math.max(...FORMATS.map((format) => format.widthCm));
  const hostNations = HOST_NATIONS.map((code) => getCountry(code)!).filter(Boolean);

  return (
    <>
      {/* ------------------------------ Héros ---------------------------- */}
      <section className="edge-b relative overflow-hidden bg-cream">
        <div
          aria-hidden
          className="stripes pointer-events-none absolute inset-0 text-bubble opacity-[0.06]"
        />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-14 lg:grid-cols-[1fr_1.05fr] lg:py-20">
          <div>
            <p className="sticker-sm inline-flex items-center gap-2 bg-lemon px-3 py-1.5 text-xs font-bold">
              <span className="animate-wiggle inline-block">🍬</span>
              Drapeaux brodés à la commande
            </p>

            <h1 className="arcade-hero mt-6 text-[clamp(3rem,8.5vw,5.75rem)]">
              Ton pays.
              <br />
              Ta ville.
              <br />
              <span className="text-bubble">Brodés.</span>
            </h1>

            <p className="mt-7 max-w-lg text-lg font-semibold leading-relaxed text-ink-soft">
              Dans les tribunes anglaises, chacun part en déplacement avec son
              drapeau et le nom de sa ville cousu dessus. Pas un produit
              dérivé&nbsp;: une carte d&apos;identité. FlagMe fabrique la tienne.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/configurateur"
                className="sticker sticker-press arcade flex h-16 items-center bg-bubble px-8 text-xl text-paper"
              >
                Créer mon drapeau ▸
              </Link>
              <Link
                href="/euro-2028"
                className="sticker-sm sticker-press flex h-16 items-center bg-mint px-6 text-sm font-bold"
              >
                ★ Spécial Euro 2028
              </Link>
            </div>

            <dl className="mt-10 grid max-w-lg grid-cols-3 gap-3">
              {[
                [`${COUNTRIES.length}`, "nations", "bg-tint-mint"],
                ["5 j", "d'atelier", "bg-tint-lemon"],
                ["3 ans", "garanties", "bg-tint-grape"],
              ].map(([value, label, tone]) => (
                <div key={label} className={`sticker-sm px-3 py-2.5 ${tone}`}>
                  <dt className="arcade text-2xl">{value}</dt>
                  <dd className="mt-0.5 text-[11px] font-bold text-ink-soft">{label}</dd>
                </div>
              ))}
            </dl>
          </div>

          <HeroShowcase />
        </div>
      </section>

      {/* ---------------------------- Euro 2028 -------------------------- */}
      <section className="edge-b relative overflow-hidden bg-grape text-paper">
        <div
          aria-hidden
          className="dots pointer-events-none absolute inset-0 text-paper opacity-15"
        />

        <div className="relative mx-auto max-w-7xl px-4 py-14">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="hud text-lemon">Le rendez-vous</p>
              <h2 className="arcade-hero mt-3 text-[clamp(2.2rem,6vw,4rem)]">
                Euro 2028
                <br />
                <span className="text-lemon">chez les inventeurs</span>
              </h2>
              <p className="mt-4 max-w-lg font-semibold leading-relaxed text-paper/85">
                Du 9 juin au 9 juillet 2028, en Angleterre, en Écosse, au pays de
                Galles et en Irlande. Exactement là où la tradition du drapeau
                brodé est née.
              </p>
            </div>

            <div>
              <p className="hud mb-2.5 text-lemon">Coup d&apos;envoi dans</p>
              <Countdown />
            </div>
          </div>

          {/* Les quatre nations hôtes, en vignettes. */}
          <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {hostNations.map((country) => (
              <Link
                key={country.code}
                href={`/configurateur?pays=${country.code}`}
                className="sticker sticker-press overflow-hidden bg-paper"
              >
                <div className="border-b-[3px] border-ink">
                  <FlagPreview spec={country.spec} hardware={false} />
                </div>
                <p className="arcade px-3 py-2.5 text-sm text-ink">{country.name}</p>
              </Link>
            ))}
          </div>

          <div className="sticker mt-6 bg-paper p-5 text-ink">
            <p className="hud text-ink-soft">Les 8 villes hôtes, prêtes à broder</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {HOST_CITIES.map((entry) => (
                <Link
                  key={entry.city}
                  href={`/configurateur?pays=${entry.countryCode}&ligne1=${encodeURIComponent(entry.city)}`}
                  title={entry.stadium}
                  className="sticker-sm sticker-press bg-lemon px-3 py-1.5 text-xs font-bold"
                >
                  ★ {entry.city}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------- Catalogue -------------------------- */}
      <section className="edge-b bg-tint-mint py-14">
        <div className="mx-auto mb-6 flex max-w-7xl flex-wrap items-end justify-between gap-4 px-4">
          <div>
            <p className="hud text-bubble">Le catalogue</p>
            <h2 className="arcade mt-3 text-4xl sm:text-5xl">
              {COUNTRIES.length} nations à débloquer
            </h2>
            <p className="mt-3 max-w-md font-semibold text-ink-soft">
              C&apos;est toi qui écris la suite. Clique sur un drapeau pour
              commencer.
            </p>
          </div>
          <Link
            href="/configurateur"
            className="sticker-sm sticker-press bg-paper px-4 py-2.5 text-sm font-bold"
          >
            Ouvrir le configurateur ▸
          </Link>
        </div>

        <FlagStrip />
      </section>

      {/* ----------------------------- Étapes ---------------------------- */}
      <section className="edge-b bg-cream py-16">
        <div className="mx-auto max-w-7xl px-4">
          <p className="hud text-bubble">Comment ça marche</p>
          <h2 className="arcade mt-3 max-w-3xl text-4xl sm:text-5xl">
            Trois minutes pour un drapeau qui n&apos;existe qu&apos;en un exemplaire
          </h2>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {STEPS.map((step) => (
              <div key={step.n} className={`sticker p-6 ${step.tone}`}>
                <div className="flex items-center justify-between">
                  <span className="arcade grid h-11 w-11 place-items-center rounded-full border-[3px] border-ink bg-paper text-sm">
                    {step.n}
                  </span>
                  <span aria-hidden className="animate-bob text-3xl">
                    {step.emoji}
                  </span>
                </div>
                <h3 className="arcade mt-4 text-xl">{step.title}</h3>
                <p className="mt-2.5 text-sm font-semibold leading-relaxed text-ink-soft">
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ----------------------------- Styles ---------------------------- */}
      <section className="edge-b bg-tint-grape py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <p className="hud text-bubble">La broderie</p>
              <h2 className="arcade mt-3 text-4xl sm:text-5xl">Du fil, pas de l&apos;encre</h2>
              <p className="mt-5 font-semibold leading-relaxed text-ink-soft">
                Chaque lettre est piquée au fil polyester haute ténacité, point
                satin serré. Le texte est en relief&nbsp;: on le sent sous le
                doigt, il ne craquelle pas au lavage et il ne s&apos;efface pas
                au soleil.
              </p>

              <ul className="mt-7 space-y-2.5">
                {[
                  "Quatre styles, du condensé de maillot à la cursive d'ultras",
                  "Huit couleurs de fil, dont l'or et l'argent métallisés",
                  "Contour de contraste inclus, pour ressortir sur les drapeaux clairs",
                  "Jusqu'à deux lignes : ta ville, puis ta date ou ta devise",
                ].map((item) => (
                  <li
                    key={item}
                    className="sticker-sm flex gap-3 bg-paper px-3.5 py-2.5 text-sm font-semibold"
                  >
                    <span aria-hidden>✅</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {STITCH_FONTS.map((font) => (
                <div key={font.id} className="sticker overflow-hidden bg-paper">
                  <div className="border-b-[3px] border-ink">
                    <FlagPreview
                      spec={stitchDemo.spec}
                      hardware={false}
                      text={{
                        line1: "Sheffield",
                        line2: "",
                        fontId: font.id,
                        threadId: "navy",
                        outlineId: "none",
                        placementId: "bottom",
                        sizeId: "m",
                      }}
                    />
                  </div>
                  <div className="px-3 py-2.5">
                    <p className="arcade text-sm">{font.label}</p>
                    <p className="mt-0.5 text-[11px] font-semibold text-ink-soft">
                      {font.tagline}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ----------------------------- Formats --------------------------- */}
      <section className="edge-b bg-cream py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="hud text-bubble">Les formats</p>
              <h2 className="arcade mt-3 text-4xl sm:text-5xl">
                Du sac à dos au virage entier
              </h2>
            </div>
            <Link
              href="/formats"
              className="sticker-sm sticker-press bg-paper px-4 py-2.5 text-sm font-bold"
            >
              Comparer les tailles ▸
            </Link>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {FORMATS.map((format) => (
              <Link
                key={format.id}
                href={`/configurateur?format=${format.id}`}
                className="sticker sticker-press flex flex-col bg-paper p-4"
              >
                <div className="edge flex min-h-36 items-center justify-center rounded-chip bg-tint-blue p-3">
                  {/* Les vignettes partagent une échelle commune : un Tifo
                      occupe vraiment 2,8 fois la largeur d'un format Poche. */}
                  <div style={{ width: `${(format.widthCm / largestWidthCm) * 100}%` }}>
                    <FlagPreview spec={franceSpec} ratio={format.ratio} hardware={false} />
                  </div>
                </div>

                <div className="mt-4 flex items-start justify-between gap-2">
                  <div>
                    <h3 className="arcade text-xl">{format.name}</h3>
                    <p className="text-[11px] font-bold text-ink-soft">{format.dims}</p>
                  </div>
                  {format.badge && (
                    <span className="sticker-sm bg-lemon px-2 py-1 text-[9px] font-bold">
                      {format.badge}
                    </span>
                  )}
                </div>

                <p className="mt-2 flex-1 text-sm font-semibold text-ink-soft">
                  {format.pitch}
                </p>

                <p className="mt-3 text-sm font-bold text-ink-soft">
                  dès <span className="arcade text-xl text-bubble">{formatPrice(format.price)}</span>
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* --------------------------- Témoignages ------------------------- */}
      <section className="edge-b bg-tint-blue py-16">
        <div className="mx-auto max-w-7xl px-4">
          <p className="hud text-bubble">Ils l&apos;ont déployé</p>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {PROOF.map((item) => (
              <figure key={item.author} className={`sticker p-6 ${item.tone}`}>
                <p aria-hidden className="text-3xl">
                  ★★★★★
                </p>
                <blockquote className="mt-3 font-semibold leading-relaxed">
                  {item.quote}
                </blockquote>
                <figcaption className="edge-t mt-5 pt-3">
                  <p className="arcade text-sm">{item.author}</p>
                  <p className="text-[11px] font-bold text-ink-soft">{item.detail}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------ Final ---------------------------- */}
      <section className="relative overflow-hidden bg-bubble py-20 text-paper">
        <div
          aria-hidden
          className="stripes pointer-events-none absolute inset-0 text-paper opacity-10"
        />
        <div className="relative mx-auto max-w-4xl px-4 text-center">
          <h2 className="arcade-hero text-[clamp(2.4rem,7vw,4.5rem)]">
            D&apos;où tu viens,
            <br />
            <span className="text-lemon">ça se brode.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl font-semibold text-paper/90">
            Choisis ton pays, écris ta ville, regarde le rendu en direct.
          </p>
          <Link
            href="/configurateur"
            className="sticker sticker-press arcade mt-9 inline-flex h-16 items-center bg-lemon px-10 text-2xl text-ink"
          >
            Commencer ▸
          </Link>
        </div>
      </section>
    </>
  );
}
