import type { Metadata } from "next";
import Link from "next/link";
import { FlagPreview } from "@/components/flag/FlagPreview";
import { Countdown } from "@/components/euro/Countdown";
import { getCountry } from "@/data/countries";
import { recommendedOutline } from "@/data/customization";
import { EURO, HOST_CITIES, HOST_NATIONS } from "@/data/euro2028";

export const metadata: Metadata = {
  title: "Euro 2028",
  description:
    "Du 9 juin au 9 juillet 2028 en Angleterre, Écosse, pays de Galles et Irlande. Brode ta ville hôte sur le drapeau de ta nation.",
};

const TONES = ["bg-tint-mint", "bg-tint-lemon", "bg-tint-bubble", "bg-tint-blue"];

export default function EuroPage() {
  const hostNations = HOST_NATIONS.map((code) => getCountry(code)!).filter(Boolean);

  return (
    <>
      {/* ------------------------------ Héros ---------------------------- */}
      <section className="edge-b relative overflow-hidden bg-grape py-14 text-paper">
        <div
          aria-hidden
          className="dots pointer-events-none absolute inset-0 text-paper opacity-15"
        />
        <div className="relative mx-auto max-w-7xl px-4">
          <p className="sticker-sm inline-flex bg-lemon px-3 py-1.5 text-xs font-bold text-ink">
            ★ 9 juin — 9 juillet 2028
          </p>

          <h1 className="arcade-hero mt-6 text-[clamp(2.8rem,9vw,6rem)]">
            L&apos;Euro rentre
            <br />
            <span className="text-lemon">à la maison</span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg font-semibold leading-relaxed text-paper/90">
            {`${EURO.teams} nations, ${EURO.venues} stades, ${HOST_CITIES.length} villes, quatre pays hôtes : `}
            l&apos;Angleterre, l&apos;Écosse, le pays de Galles et
            l&apos;Irlande. C&apos;est précisément là qu&apos;on a commencé à
            coudre le nom de sa ville sur son drapeau — la tradition dont FlagMe
            est né.
          </p>

          <div className="mt-9">
            <p className="hud mb-2.5 text-lemon">Coup d&apos;envoi à Cardiff dans</p>
            <Countdown />
          </div>
        </div>
      </section>

      {/* --------------------------- Nations hôtes ------------------------ */}
      <section className="edge-b bg-cream py-16">
        <div className="mx-auto max-w-7xl px-4">
          <p className="hud text-bubble">Les quatre nations hôtes</p>
          <h2 className="arcade mt-3 text-4xl sm:text-5xl">Choisis ton camp</h2>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {hostNations.map((country, index) => (
              <Link
                key={country.code}
                href={`/configurateur?pays=${country.code}`}
                className={`sticker sticker-press overflow-hidden ${TONES[index % TONES.length]}`}
              >
                <div className="border-b-[3px] border-ink">
                  <FlagPreview
                    spec={country.spec}
                    hardware={false}
                    text={{
                      line1: country.cities[0],
                      line2: "",
                      fontId: "terrace",
                      threadId: country.defaultThread,
                      outlineId: recommendedOutline(country.defaultThread),
                      placementId: "bottom",
                      sizeId: "m",
                    }}
                  />
                </div>
                <div className="p-4">
                  <h3 className="arcade text-lg">{country.name}</h3>
                  <p className="mt-1 text-xs font-semibold text-ink-soft">
                    {country.cities.slice(0, 3).join(" · ")}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------- Villes hôtes ------------------------ */}
      <section className="edge-b bg-tint-lemon py-16">
        <div className="mx-auto max-w-7xl px-4">
          <p className="hud text-bubble">Les huit villes hôtes</p>
          <h2 className="arcade mt-3 max-w-2xl text-4xl sm:text-5xl">
            Un stade, une ville, un drapeau
          </h2>
          <p className="mt-4 max-w-xl font-semibold text-ink-soft">
            Chaque ville hôte se brode en un clic sur le drapeau de son pays.
            Clique, le configurateur s&apos;ouvre déjà rempli.
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {HOST_CITIES.map((entry) => {
              const country = getCountry(entry.countryCode);
              if (!country) return null;

              return (
                <Link
                  key={entry.city}
                  href={`/configurateur?pays=${entry.countryCode}&ligne1=${encodeURIComponent(entry.city)}`}
                  className="sticker sticker-press flex flex-col bg-paper p-4"
                >
                  <div className="edge overflow-hidden rounded-chip">
                    <FlagPreview
                      spec={country.spec}
                      hardware={false}
                      text={{
                        line1: entry.city,
                        line2: "",
                        fontId: "terrace",
                        threadId: country.defaultThread,
                        outlineId: recommendedOutline(country.defaultThread),
                        placementId: "bottom",
                        sizeId: "m",
                      }}
                    />
                  </div>
                  <h3 className="arcade mt-3 text-lg">{entry.city}</h3>
                  <p className="mt-1 flex-1 text-[11px] font-semibold text-ink-soft">
                    {entry.stadium}
                  </p>
                  <p className="mt-2 text-xs font-bold text-bubble">Broder cette ville ▸</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ------------------------------ Final ---------------------------- */}
      <section className="relative overflow-hidden bg-ink py-20 text-paper">
        <div
          aria-hidden
          className="dots pointer-events-none absolute inset-0 text-lemon opacity-20"
        />
        <div className="relative mx-auto max-w-3xl px-4 text-center">
          <h2 className="arcade-hero text-[clamp(2.2rem,7vw,4rem)]">
            Deux ans pour
            <br />
            <span className="text-lemon">préparer le tien</span>
          </h2>
          <p className="mx-auto mt-5 max-w-lg font-semibold text-paper/85">
            Les drapeaux qu&apos;on verra en tribune en 2028 se cousent
            maintenant. Le tien aussi.
          </p>
          <Link
            href="/configurateur"
            className="sticker sticker-press arcade mt-9 inline-flex h-16 items-center bg-lemon px-10 text-xl text-ink"
          >
            Créer mon drapeau ▸
          </Link>
        </div>
      </section>
    </>
  );
}
