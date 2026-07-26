"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { FlagPreview } from "@/components/flag/FlagPreview";
import type { TextConfig } from "@/components/flag/EmbroideredText";
import { CountryPicker } from "./CountryPicker";
import { OptionGroup } from "./OptionGroup";
import { DEFAULT_COUNTRY, getCountry } from "@/data/countries";
import {
  OUTLINES,
  PLACEMENTS,
  STITCH_FONTS,
  TEXT_SIZES,
  THREADS,
  getThread,
  recommendedOutline,
} from "@/data/customization";
import { DEFAULT_FORMAT, FINISHES, FORMATS, OPTION_PRICES, getFormat } from "@/data/formats";
import { formatPrice, priceBreakdown, type Configuration } from "@/lib/pricing";
import { useCart } from "@/lib/cart";

const MAX_LINE_1 = 20;
const MAX_LINE_2 = 26;

function Section({
  step,
  title,
  subtitle,
  children,
}: {
  step: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t border-ink-3 py-8 first:border-t-0 first:pt-0">
      <header className="mb-5 flex items-baseline gap-3">
        <span className="brand-title text-2xl text-ink-4">{step}</span>
        <div>
          <h2 className="brand-title text-2xl text-chalk">{title}</h2>
          {subtitle && <p className="mt-1 text-sm text-chalk-mute">{subtitle}</p>}
        </div>
      </header>
      {children}
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
    const timer = window.setTimeout(() => setAdded(false), 4500);
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
    const untouched = country.cities.includes(text.line1.trim().toUpperCase());
    patch({
      threadId: next.defaultThread,
      outlineId: recommendedOutline(next.defaultThread),
      ...(untouched ? { line1: next.cities[0] ?? "" } : {}),
    });
  };

  const handleAdd = () => {
    if (!text.line1.trim()) return;
    add(config);
    setAdded(true);
  };

  const canAdd = text.line1.trim().length > 0;

  return (
    <div className="mx-auto grid max-w-7xl gap-10 px-5 py-10 lg:grid-cols-[1.05fr_1fr] lg:gap-14">
      {/* ------------------------- Aperçu + prix ------------------------- */}
      <div className="lg:sticky lg:top-28 lg:self-start">
        <div className="relative rounded-brand border border-ink-3 bg-ink-2 p-4 sm:p-6">
          <div
            className="pointer-events-none absolute -inset-8 -z-10 rounded-full opacity-25 blur-3xl transition-colors duration-500"
            style={{ backgroundColor: country.accent }}
          />

          <FlagPreview
            spec={country.spec}
            text={text}
            ratio={format.ratio}
            waving
            className="drop-shadow-[0_25px_60px_rgba(0,0,0,0.7)]"
          />

          <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-ink-3 pt-4 text-sm">
            <p className="text-chalk">
              <span className="font-bold">{country.name}</span>
              <span className="text-chalk-mute"> · {format.name} </span>
              <span className="text-chalk-mute">{format.dims}</span>
            </p>
            <p className="text-xs text-chalk-mute">Aperçu à l&apos;échelle réelle</p>
          </div>
        </div>

        {/* Détail du prix : rien de caché avant le panier. */}
        <div className="mt-5 rounded-brand border border-ink-3 bg-ink-2 p-5">
          <ul className="space-y-2 text-sm">
            {lines.map((line) => (
              <li key={line.label} className="flex justify-between gap-4 text-chalk-dim">
                <span>{line.label}</span>
                <span className="shrink-0 tabular-nums text-chalk">
                  {formatPrice(line.amount)}
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-4 flex items-end justify-between border-t border-ink-3 pt-4">
            <span className="eyebrow text-chalk-mute">Total</span>
            <span className="brand-title text-4xl text-chalk">{formatPrice(total)}</span>
          </div>

          <button
            type="button"
            onClick={handleAdd}
            disabled={!canAdd}
            className="brand-title mt-5 flex h-14 w-full items-center justify-center rounded-brand bg-flare text-xl text-chalk transition-all hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:bg-ink-4 disabled:text-chalk-mute disabled:hover:translate-y-0"
          >
            {canAdd ? "Ajouter au panier" : "Écris ton texte d'abord"}
          </button>

          {added && (
            <p className="animate-rise mt-3 flex items-center justify-between gap-3 rounded-brand bg-turf/15 px-3 py-2.5 text-sm text-chalk">
              <span>Ajouté au panier.</span>
              <Link href="/panier" className="font-bold text-flare underline-offset-4 hover:underline">
                Voir le panier →
              </Link>
            </p>
          )}

          <p className="mt-4 text-center text-[11px] leading-relaxed text-chalk-mute">
            Brodé à la commande · Expédié sous 5 jours ouvrés · Livraison offerte
            dès 80 €
          </p>
        </div>
      </div>

      {/* --------------------------- Réglages ---------------------------- */}
      <div>
        <Section step="01" title="Ton pays" subtitle="Le drapeau qui sert de fond.">
          <CountryPicker value={countryCode} onChange={selectCountry} />
        </Section>

        <Section
          step="02"
          title="Ton texte"
          subtitle="Une ville, un quartier, une date. Deux lignes maximum."
        >
          <label className="block">
            <span className="eyebrow text-chalk-mute">Ligne principale</span>
            <input
              type="text"
              value={text.line1}
              maxLength={MAX_LINE_1}
              onChange={(event) => patch({ line1: event.target.value })}
              placeholder="MARSEILLE"
              className="mt-2 w-full rounded-brand border border-ink-4 bg-ink px-4 py-3 text-lg font-semibold text-chalk placeholder:text-chalk-mute focus:border-flare focus:outline-none"
            />
            <span className="mt-1 block text-right text-[11px] text-chalk-mute">
              {text.line1.length}/{MAX_LINE_1}
            </span>
          </label>

          <div className="mt-1 flex flex-wrap gap-2">
            {country.cities.map((city) => (
              <button
                key={city}
                type="button"
                onClick={() => patch({ line1: city })}
                className="rounded-full border border-ink-4 px-3 py-1.5 text-xs font-semibold text-chalk-dim transition-colors hover:border-flare hover:text-chalk"
              >
                {city}
              </button>
            ))}
          </div>

          <label className="mt-6 block">
            <span className="eyebrow text-chalk-mute">
              Seconde ligne
              <span className="ml-2 font-bold text-thread">
                +{OPTION_PRICES.secondLine} €
              </span>
            </span>
            <input
              type="text"
              value={text.line2}
              maxLength={MAX_LINE_2}
              onChange={(event) => patch({ line2: event.target.value })}
              placeholder="DEPUIS 1993 (facultatif)"
              className="mt-2 w-full rounded-brand border border-ink-4 bg-ink px-4 py-3 text-chalk placeholder:text-chalk-mute focus:border-flare focus:outline-none"
            />
            <span className="mt-1 block text-right text-[11px] text-chalk-mute">
              {text.line2.length}/{MAX_LINE_2}
            </span>
          </label>
        </Section>

        <Section step="03" title="La broderie" subtitle="Le style, le fil, la finition du texte.">
          <div className="space-y-7">
            <OptionGroup
              legend="Style de broderie"
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
              columns={2}
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
        </Section>

        <Section step="04" title="Format & finition" subtitle="La taille du drapeau et sa confection.">
          <div className="grid gap-3 sm:grid-cols-2">
            {FORMATS.map((item) => {
              const selected = item.id === formatId;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setFormatId(item.id)}
                  aria-pressed={selected}
                  className={`rounded-brand border p-4 text-left transition-colors ${
                    selected
                      ? "border-flare bg-flare/10"
                      : "border-ink-4 hover:border-chalk-mute"
                  }`}
                >
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="brand-title text-xl text-chalk">{item.name}</span>
                    <span className="brand-title text-lg text-chalk">
                      {formatPrice(item.price)}
                    </span>
                  </div>
                  <p className="mt-0.5 text-xs text-chalk-mute">{item.dims}</p>
                  <p className="mt-2 text-xs leading-relaxed text-chalk-dim">{item.pitch}</p>
                </button>
              );
            })}
          </div>

          <div className="mt-6 space-y-2">
            {FINISHES.map((finish) => {
              const selected = finish.id === finishId;
              return (
                <button
                  key={finish.id}
                  type="button"
                  onClick={() => setFinishId(finish.id)}
                  aria-pressed={selected}
                  className={`flex w-full items-start gap-3 rounded-brand border p-4 text-left transition-colors ${
                    selected
                      ? "border-flare bg-flare/10"
                      : "border-ink-4 hover:border-chalk-mute"
                  }`}
                >
                  <span
                    aria-hidden
                    className={`mt-1 h-3.5 w-3.5 shrink-0 rounded-full border-2 ${
                      selected ? "border-flare bg-flare" : "border-ink-4"
                    }`}
                  />
                  <span className="flex-1">
                    <span className="flex justify-between gap-3 text-sm font-bold text-chalk">
                      {finish.label}
                      {finish.price > 0 && (
                        <span className="text-thread">+{finish.price} €</span>
                      )}
                    </span>
                    <span className="mt-1 block text-xs leading-relaxed text-chalk-mute">
                      {finish.detail}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </Section>

        <p className="border-t border-ink-3 pt-6 text-xs leading-relaxed text-chalk-mute">
          Fil sélectionné&nbsp;: {getThread(text.threadId).label}. Format{" "}
          {format.name} ({format.dims}), rapport {format.ratio.toFixed(2)}:1. Le
          rendu ci-contre reprend les proportions exactes du drapeau fini.
        </p>
      </div>
    </div>
  );
}
