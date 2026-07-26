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

export default function EuroPage() {
  const hostNations = HOST_NATIONS.map((code) => getCountry(code)!).filter(Boolean);

  return (
    <>
      {/* ------------------------------ Héros ---------------------------- */}
      <section className="mx-auto max-w-7xl px-5 pb-16 pt-10">
        <p className="eyebrow">9 juin — 9 juillet 2028</p>
        <h1 className="display mt-6 max-w-3xl text-[clamp(2.9rem,7vw,5.5rem)]">
          L&apos;Euro rentre à la maison
        </h1>
        <p className="mt-7 max-w-xl text-lg leading-relaxed text-ink-soft">
          {`${EURO.teams} nations, ${EURO.venues} stades, ${HOST_CITIES.length} villes, quatre pays hôtes. `}
          C&apos;est précisément là qu&apos;on a commencé à coudre le nom de sa
          ville sur son drapeau.
        </p>

        <div className="mt-12">
          <p className="text-sm text-ink-soft">Coup d&apos;envoi à Cardiff dans</p>
          <div className="mt-4">
            <Countdown />
          </div>
        </div>
      </section>

      {/* --------------------------- Nations hôtes ------------------------ */}
      <section className="mx-auto max-w-7xl px-5 py-16">
        <p className="eyebrow">Les quatre nations hôtes</p>
        <h2 className="display mt-5 text-[clamp(2rem,4vw,3rem)]">Choisis ton camp</h2>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {hostNations.map((country) => (
            <Link
              key={country.code}
              href={`/configurateur?pays=${country.code}`}
              aria-label={`Créer un drapeau ${country.name}`}
              className="group"
            >
              <div className="overflow-hidden rounded-soft shadow-[0_1px_2px_rgb(21_21_15/0.06),0_14px_30px_-20px_rgb(21_21_15/0.4)] transition-transform duration-500 group-hover:-translate-y-1">
                <FlagPreview
                  spec={country.spec}
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
              <h3 className="mt-4 font-semibold">{country.name}</h3>
              <p className="mt-0.5 text-sm text-ink-soft">
                {country.cities.slice(0, 3).join(" · ")}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* ---------------------------- Villes hôtes ------------------------ */}
      <section className="mx-auto max-w-7xl px-5 py-16">
        <p className="eyebrow">Les huit villes hôtes</p>
        <h2 className="display mt-5 max-w-2xl text-[clamp(2rem,4vw,3rem)]">
          Un stade, une ville, un drapeau
        </h2>
        <p className="mt-5 max-w-md leading-relaxed text-ink-soft">
          Clique sur une ville, le configurateur s&apos;ouvre déjà rempli.
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {HOST_CITIES.map((entry) => {
            const country = getCountry(entry.countryCode);
            if (!country) return null;

            return (
              <Link
                key={entry.city}
                href={`/configurateur?pays=${entry.countryCode}&ligne1=${encodeURIComponent(entry.city)}`}
                className="group"
              >
                <div className="overflow-hidden rounded-soft shadow-[0_1px_2px_rgb(21_21_15/0.06),0_14px_30px_-20px_rgb(21_21_15/0.4)] transition-transform duration-500 group-hover:-translate-y-1">
                  <FlagPreview
                    spec={country.spec}
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
                <h3 className="mt-4 font-semibold">{entry.city}</h3>
                <p className="mt-0.5 text-sm text-ink-soft">{entry.stadium}</p>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ------------------------------ Final ---------------------------- */}
      <section className="mx-auto max-w-3xl px-5 py-24 text-center">
        <h2 className="display text-[clamp(2rem,5vw,3.2rem)]">
          Deux ans pour préparer le tien
        </h2>
        <p className="mx-auto mt-5 max-w-md leading-relaxed text-ink-soft">
          Les drapeaux qu&apos;on verra en tribune en 2028 se cousent maintenant.
        </p>
        <Link href="/configurateur" className="pill pill-dark mt-9 h-14 px-9 text-base">
          Créer mon drapeau
        </Link>
      </section>
    </>
  );
}
