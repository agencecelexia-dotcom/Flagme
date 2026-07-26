"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { FlagPreview } from "@/components/flag/FlagPreview";
import type { TextConfig } from "@/components/flag/EmbroideredText";
import { CountryPicker } from "./CountryPicker";
import { OptionGroup } from "./OptionGroup";
import { StepNav } from "./StepNav";
import { MobileBar } from "./MobileBar";
import { ShareButton } from "./ShareButton";
import { DeliveryEstimate } from "@/components/product/DeliveryEstimate";
import { DEFAULT_COUNTRY, getCountry } from "@/data/countries";
import { HOST_CITIES } from "@/data/euro2028";
import {
  OUTLINES,
  PLACEMENTS,
  STITCH_FONTS,
  TEXT_SIZES,
  THREADS,
  recommendedOutline,
} from "@/data/customization";
import { FINISHES, FORMATS, OPTION_PRICES, getFormat } from "@/data/formats";
import { formatPrice, priceBreakdown, type Configuration } from "@/lib/pricing";
import { useCart } from "@/lib/cart";

const MAX_LINE_1 = 20;
const MAX_LINE_2 = 26;

const STEPS = [
  { id: "etape-pays", label: "Pays" },
  { id: "etape-texte", label: "Texte" },
  { id: "etape-broderie", label: "Broderie" },
  { id: "etape-format", label: "Format" },
];

function Step({
  id,
  index,
  title,
  next,
  children,
}: {
  id: string;
  index: number;
  title: string;
  /** Libellé de l'étape suivante ; absent sur la dernière. */
  next?: { id: string; label: string };
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="card scroll-mt-40 p-6 sm:p-8">
      <p className="eyebrow">{`Étape ${String(index + 1).padStart(2, "0")}`}</p>
      <h2 className="display mt-3 text-2xl">{title}</h2>
      <div className="mt-6">{children}</div>

      {/* Sans ce relais, la seule façon d'avancer est de deviner qu'il faut
          continuer à faire défiler la page. */}
      {next && (
        <a
          href={`#${next.id}`}
          className="rule mt-7 flex items-center justify-between pt-5 text-sm font-medium text-ink-soft transition-colors hover:text-ink"
        >
          Étape suivante · {next.label}
          <span aria-hidden>↓</span>
        </a>
      )}
    </section>
  );
}

export function Configurator({
  initialCountry,
  initialFormat,
  initialLine1,
}: {
  initialCountry: string;
  initialFormat: string;
  initialLine1: string;
}) {
  const { add } = useCart();

  const [countryCode, setCountryCode] = useState(initialCountry);
  const [formatId, setFormatId] = useState(initialFormat);
  const [finishId, setFinishId] = useState(FINISHES[0].id);
  const [added, setAdded] = useState(false);

  const initialThread = getCountry(initialCountry)?.defaultThread ?? "white";
  const [text, setText] = useState<TextConfig>({
    line1: initialLine1,
    line2: "",
    fontId: STITCH_FONTS[0].id,
    threadId: initialThread,
    outlineId: recommendedOutline(initialThread),
    placementId: "bottom",
    sizeId: "m",
  });

  const country = getCountry(countryCode) ?? DEFAULT_COUNTRY;
  const format = getFormat(formatId);

  const config: Configuration = useMemo(
    () => ({ countryCode, formatId, finishId, text }),
    [countryCode, formatId, finishId, text],
  );

  const { lines, total } = priceBreakdown(config);

  useEffect(() => {
    if (!added) return;
    const timer = window.setTimeout(() => setAdded(false), 5000);
    return () => window.clearTimeout(timer);
  }, [added]);

  const patch = (changes: Partial<TextConfig>) =>
    setText((current) => ({ ...current, ...changes }));

  /**
   * Changer de pays réapplique la couleur de fil recommandée : c'est le
   * réglage qui rate le plus souvent, un fil blanc sur un drapeau blanc
   * ne se voit pas.
   *
   * Le texte suit la même logique, mais seulement s'il s'agit encore d'une
   * ville suggérée : dès que l'utilisateur a écrit le sien, on n'y touche plus.
   */
  const selectCountry = (code: string) => {
    const next = getCountry(code);
    if (!next) return;

    setCountryCode(code);
    const current = text.line1.trim().toLocaleLowerCase();
    const untouched = country.cities.some(
      (city) => city.toLocaleLowerCase() === current,
    );
    patch({
      threadId: next.defaultThread,
      outlineId: recommendedOutline(next.defaultThread),
      ...(untouched ? { line1: next.cities[0] ?? "" } : {}),
    });
  };

  const canAdd = text.line1.trim().length > 0;

  const handleAdd = () => {
    if (!canAdd) return;
    add(config);
    setAdded(true);
  };

  /** Villes hôtes de l'Euro correspondant au pays sélectionné. */
  const euroCities = HOST_CITIES.filter((entry) => entry.countryCode === countryCode);

  const summary = `${country.name} · ${format.name}`;

  /** Ce qui suffit à rejouer la configuration depuis une URL partagée. */
  const shareQuery = new URLSearchParams({
    pays: countryCode,
    format: formatId,
    ligne1: text.line1,
  }).toString();

  return (
    <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-5 pb-40 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:pb-24">
      {/* --------------------------- Aperçu + prix ------------------------ */}
      <div className="lg:sticky lg:top-28 lg:self-start">
        <FlagPreview
          spec={country.spec}
          text={text}
          ratio={format.ratio}
          waving
          className="overflow-hidden rounded-card shadow-[0_40px_80px_-40px_rgb(21_21_15/0.45)]"
        />

        <p className="mt-5 text-sm text-ink-soft">
          <span className="font-semibold text-ink">{country.name}</span> · {format.name}{" "}
          {format.dims}
        </p>

        {/* Détail du prix : rien de caché avant le panier. Sur mobile, le
            bouton vit dans la barre collante — celui-ci ferait doublon. */}
        <div className="card mt-7 p-6">
          <ul className="space-y-2.5 text-sm">
            {lines.map((line) => (
              <li key={line.label} className="flex justify-between gap-4 text-ink-soft">
                <span>{line.label}</span>
                <span className="shrink-0 tabular-nums text-ink">
                  {formatPrice(line.amount)}
                </span>
              </li>
            ))}
          </ul>

          <div className="rule mt-5 flex items-end justify-between pt-5">
            <span className="text-sm text-ink-soft">Total</span>
            <span className="display text-3xl">{formatPrice(total)}</span>
          </div>

          <button
            type="button"
            onClick={handleAdd}
            disabled={!canAdd}
            className={`pill mt-6 hidden h-14 w-full text-base lg:flex ${
              canAdd ? "pill-dark" : "bg-bone-warm text-ink-faint"
            }`}
          >
            {canAdd ? "Ajouter au panier" : "Écris ton texte d'abord"}
          </button>

          {added && (
            <p className="animate-rise mt-4 flex items-center justify-between gap-3 text-sm">
              <span className="text-ink-soft">Ajouté au panier.</span>
              <Link href="/panier" className="font-semibold underline underline-offset-4">
                Voir le panier
              </Link>
            </p>
          )}

          <p className="mt-5 text-center text-xs leading-relaxed text-ink-faint">
            <DeliveryEstimate /> · Livraison offerte dès 80 €
          </p>

          <ShareButton query={shareQuery} />
        </div>
      </div>

      {/* ----------------------------- Réglages -------------------------- */}
      <div>
        <StepNav
          steps={STEPS.map((step) =>
            step.id === "etape-texte" ? { ...step, done: canAdd } : step,
          )}
        />

        <div className="space-y-6">
        <Step id={STEPS[0].id} index={0} title="Ton pays" next={STEPS[1]}>
          <CountryPicker value={countryCode} onChange={selectCountry} />
        </Step>

        <Step id={STEPS[1].id} index={1} title="Ton texte" next={STEPS[2]}>
          <label className="block">
            <span className="text-sm font-semibold">Ligne principale</span>
            <input
              type="text"
              value={text.line1}
              maxLength={MAX_LINE_1}
              onChange={(event) => patch({ line1: event.target.value })}
              placeholder="Marseille"
              className="mt-2.5 w-full rounded-soft bg-bone-warm px-4 py-3.5 text-lg font-semibold text-ink placeholder:font-normal placeholder:text-ink-faint focus:outline-none"
            />
            <span className="mt-1.5 block text-right text-[11px] text-ink-faint">
              {text.line1.length}/{MAX_LINE_1}
            </span>
          </label>

          <div className="flex flex-wrap gap-2">
            {country.cities.map((city) => (
              <button
                key={city}
                type="button"
                onClick={() => patch({ line1: city })}
                className="rounded-full bg-bone-warm px-3 py-1.5 text-xs font-medium text-ink-soft transition-colors hover:text-ink"
              >
                {city}
              </button>
            ))}
          </div>

          {euroCities.length > 0 && (
            <div className="mt-5">
              <p className="eyebrow">Villes hôtes Euro 2028</p>
              <div className="mt-2.5 flex flex-wrap gap-2">
                {euroCities.map((entry) => (
                  <button
                    key={entry.city}
                    type="button"
                    onClick={() => patch({ line1: entry.city })}
                    title={entry.stadium}
                    className="rounded-full bg-clay-soft px-3 py-1.5 text-xs font-medium text-ink transition-opacity hover:opacity-75"
                  >
                    {entry.city}
                  </button>
                ))}
              </div>
            </div>
          )}

          <label className="mt-7 block">
            <span className="text-sm font-semibold">
              Seconde ligne
              <span className="ml-2 font-medium text-clay">
                +{OPTION_PRICES.secondLine} €
              </span>
            </span>
            <input
              type="text"
              value={text.line2}
              maxLength={MAX_LINE_2}
              onChange={(event) => patch({ line2: event.target.value })}
              placeholder="Depuis 1993 (facultatif)"
              className="mt-2.5 w-full rounded-soft bg-bone-warm px-4 py-3.5 text-ink placeholder:text-ink-faint focus:outline-none"
            />
            <span className="mt-1.5 block text-right text-[11px] text-ink-faint">
              {text.line2.length}/{MAX_LINE_2}
            </span>
          </label>
        </Step>

        <Step id={STEPS[2].id} index={2} title="La broderie" next={STEPS[3]}>
          <div className="space-y-7">
            <OptionGroup
              legend="Style"
              value={text.fontId}
              onChange={(id) => patch({ fontId: id })}
              options={STITCH_FONTS.map((font) => ({
                id: font.id,
                label: font.label,
                hint: font.tagline,
              }))}
            />

            <OptionGroup
              legend="Couleur du fil"
              value={text.threadId}
              onChange={(id) => patch({ threadId: id })}
              options={THREADS.map((thread) => ({
                id: thread.id,
                label: thread.label,
                swatch: thread.hex,
                surcharge: thread.metallic ? OPTION_PRICES.metallicThread : undefined,
              }))}
            />

            <OptionGroup
              legend="Contour"
              value={text.outlineId}
              onChange={(id) => patch({ outlineId: id })}
              options={OUTLINES.map((outline) => ({
                id: outline.id,
                label: outline.label,
                swatch: outline.hex ?? undefined,
                surcharge: outline.premium ? OPTION_PRICES.outline : undefined,
              }))}
            />

            <div className="grid gap-7 sm:grid-cols-2">
              <OptionGroup
                legend="Taille"
                columns={1}
                value={text.sizeId}
                onChange={(id) => patch({ sizeId: id })}
                options={TEXT_SIZES.map((size) => ({ id: size.id, label: size.label }))}
              />
              <OptionGroup
                legend="Position"
                columns={1}
                value={text.placementId}
                onChange={(id) => patch({ placementId: id })}
                options={PLACEMENTS.map((placement) => ({
                  id: placement.id,
                  label: placement.label,
                }))}
              />
            </div>
          </div>
        </Step>

        <Step id={STEPS[3].id} index={3} title="Format & finition">
          <div className="grid gap-2 sm:grid-cols-2">
            {FORMATS.map((item) => {
              const selected = item.id === formatId;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setFormatId(item.id)}
                  aria-pressed={selected}
                  className={`rounded-soft p-4 text-left transition-all ${
                    selected ? "bg-ink text-bone" : "bg-bone-warm hover:bg-line/60"
                  }`}
                >
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="font-semibold">{item.name}</span>
                    <span className="text-sm font-semibold">{formatPrice(item.price)}</span>
                  </div>
                  <p
                    className={`mt-1 text-xs ${selected ? "text-bone/60" : "text-ink-soft"}`}
                  >
                    {item.dims} · {item.pitch}
                  </p>
                </button>
              );
            })}
          </div>

          <div className="mt-3 grid gap-2">
            {FINISHES.map((finish) => {
              const selected = finish.id === finishId;
              return (
                <button
                  key={finish.id}
                  type="button"
                  onClick={() => setFinishId(finish.id)}
                  aria-pressed={selected}
                  className={`rounded-soft p-4 text-left transition-all ${
                    selected ? "bg-ink text-bone" : "bg-bone-warm hover:bg-line/60"
                  }`}
                >
                  <span className="flex justify-between gap-3 font-semibold">
                    {finish.label}
                    {finish.price > 0 && (
                      <span className={selected ? "text-bone/70" : "text-clay"}>
                        +{finish.price} €
                      </span>
                    )}
                  </span>
                  <span
                    className={`mt-1 block text-xs leading-relaxed ${
                      selected ? "text-bone/60" : "text-ink-soft"
                    }`}
                  >
                    {finish.detail}
                  </span>
                </button>
              );
            })}
          </div>
        </Step>
        </div>
      </div>

      <MobileBar
        spec={country.spec}
        text={text}
        ratio={format.ratio}
        summary={summary}
        total={total}
        canAdd={canAdd}
        onAdd={handleAdd}
      />
    </div>
  );
}
