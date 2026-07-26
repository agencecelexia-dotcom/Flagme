import type { Metadata } from "next";
import { Configurator } from "@/components/configurator/Configurator";
import { DEFAULT_COUNTRY, getCountry } from "@/data/countries";
import { DEFAULT_FORMAT, FORMATS } from "@/data/formats";

export const metadata: Metadata = {
  title: "Configurateur",
  description:
    "Choisis ton pays, brode ta ville, règle le fil et le format. Aperçu en direct, prix détaillé.",
};

/** Le lien `?pays=…&format=…&ligne1=…` doit rester partageable et sûr. */
function readParams(params: Record<string, string | string[] | undefined>) {
  const single = (key: string) => {
    const value = params[key];
    return Array.isArray(value) ? value[0] : value;
  };

  const resolved = getCountry(single("pays") ?? "") ?? DEFAULT_COUNTRY;
  const format =
    FORMATS.find((item) => item.id === single("format"))?.id ?? DEFAULT_FORMAT.id;

  // Sans texte, l'aperçu montrerait un drapeau nu et le concept se perdrait :
  // on pré-remplit avec une ville du pays, que l'utilisateur remplace.
  const line1 = (single("ligne1") ?? resolved.cities[0] ?? "").slice(0, 20);

  return { country: resolved.code, format, line1 };
}

export default async function ConfiguratorPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { country, format, line1 } = readParams(await searchParams);

  return (
    <>
      <div className="mx-auto max-w-7xl px-5 pb-12 pt-10">
        <p className="eyebrow">Le configurateur</p>
        <h1 className="display mt-6 text-[clamp(2.6rem,6vw,4.2rem)]">
          Fabrique le tien
        </h1>
        <p className="mt-5 max-w-md leading-relaxed text-ink-soft">
          Tout se voit en direct sur l&apos;aperçu, y compris le prix.
        </p>
      </div>

      <Configurator
        initialCountry={country}
        initialFormat={format}
        initialLine1={line1}
      />
    </>
  );
}
