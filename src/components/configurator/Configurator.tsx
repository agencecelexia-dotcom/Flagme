"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { FlagPreview } from "@/components/flag/FlagPreview";
import type { TextConfig } from "@/components/flag/EmbroideredText";
import { CountryPicker } from "./CountryPicker";
import { OptionGroup } from "./OptionGroup";
import { DEFAULT_COUNTRY, getCountry } from "@/data/countries";
import { HOST_CITIES, HOST_NATIONS } from "@/data/euro2028";
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
  { n: "01", label: "Pays", tone: "bg-mint" },
  { n: "02", label: "Texte", tone: "bg-lemon" },
  { n: "03", label: "Broderie", tone: "bg-tint-grape" },
  { n: "04", label: "Taille", tone: "bg-tint-blue" },
];

function Panel({
  step,
  title,
  subtitle,
  tone,
  children,
}: {
  step: string;
  title: string;
  subtitle?: string;
  tone: string;
  children: React.ReactNode;
}) {
  return (
    <section className="sticker overflow-hidden bg-paper">
      <header className={`edge-b flex items-center gap-3 px-4 py-3 ${tone}`}>
        <span className="arcade grid h-9 w-9 shrink-0 place-items-center rounded-full border-[3px] border-ink bg-paper text-sm">
          {step}
        </span>
        <div className="min-w-0">
          <h2 className="arcade text-lg leading-none">{title}</h2>
          {subtitle && (
            <p className="mt-1 text-xs font-semibold text-ink-soft">{subtitle}</p>
          )}
        </div>
      </header>
      <div className="p-4 sm:p-5">{children}</div>
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
  const isHost = HOST_NATIONS.includes(countryCode as (typeof HOST_NATIONS)[number]);

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
    const untouched = country.cities.includes(text.line1.trim().toUpperCase());
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
  const euroCities = HOST_CITIES.filter((c) => c.countryCode === countryCode);

  return (
    <div className="mx-auto max-w-7xl px-4 pb-16">
      {/* --------------------------- Barre de HUD ------------------------- */}
      <div className="sticker mb-6 flex flex-wrap items-center gap-2 bg-ink px-4 py-3">
        {STEPS.map((step, index) => (
          <div key={step.n} className="flex items-center gap-2">
            {index > 0 && <span className="text-ink-faint">▸</span>}
            <span
              className={`hud rounded-full border-[3px] border-ink px-2.5 py-1 text-ink ${step.tone}`}
            >
              {step.n} {step.label}
            </span>
          </div>
        ))}
        <span className="hud ml-auto text-lemon animate-blink">● Aperçu en direct</span>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.05fr_1fr] lg:gap-8">
        {/* ------------------------ Écran de l'aperçu --------------------- */}
        <div className="lg:sticky lg:top-32 lg:self-start">
          <div
            className="sticker relative overflow-hidden p-4 sm:p-5"
            style={{ backgroundColor: country.accent }}
          >
            {/* Trame de pois aux couleurs du pays sélectionné. */}
            <div
              aria-hidden
              className="dots pointer-events-none absolute inset-0 text-paper opacity-20"
            />

            {isHost && (
              <span className="sticker-sm absolute left-3 top-3 z-10 bg-lemon px-2.5 py-1 text-[10px] font-bold">
                ★ Pays hôte Euro 2028
              </span>
            )}

            <div className="relative">
              <FlagPreview
                spec={country.spec}
                text={text}
                ratio={format.ratio}
                waving
                className="drop-shadow-[6px_6px_0_rgba(0,0,0,0.35)]"
              />
            </div>

            <div className="sticker-sm relative mt-4 flex flex-wrap items-center justify-between gap-2 bg-paper px-3 py-2">
              <p className="arcade text-sm">{country.name}</p>
              <p className="text-xs font-bold text-ink-soft">
                {format.name} · {format.dims}
              </p>
            </div>
          </div>

          {/* Détail du prix : rien de caché avant le panier. */}
          <div className="sticker mt-5 bg-paper p-5">
            <ul className="space-y-2 text-sm font-semibold">
              {lines.map((line) => (
                <li key={line.label} className="flex justify-between gap-4">
                  <span className="text-ink-soft">{line.label}</span>
                  <span className="shrink-0 tabular-nums">{formatPrice(line.amount)}</span>
                </li>
              ))}
            </ul>

            <div className="edge-t mt-4 flex items-end justify-between pt-4">
              <span className="hud text-ink-soft">Total</span>
              <span className="arcade text-4xl text-bubble">{formatPrice(total)}</span>
            </div>

            <button
              type="button"
              onClick={handleAdd}
              disabled={!canAdd}
              className={`sticker-sm sticker-press arcade mt-5 flex h-14 w-full items-center justify-center text-lg ${
                canAdd ? "bg-lime" : "bg-cream text-ink-faint"
              }`}
            >
              {canAdd ? "Ajouter au panier ▸" : "Écris ton texte d'abord"}
            </button>

            {added && (
              <div className="animate-pop sticker-sm mt-3 flex items-center justify-between gap-3 bg-mint px-3 py-2.5">
                <span className="text-sm font-bold">🎉 Dans le panier&nbsp;!</span>
                <Link href="/panier" className="arcade text-xs underline underline-offset-4">
                  Voir ▸
                </Link>
              </div>
            )}

            <p className="mt-4 text-center text-[11px] font-semibold leading-relaxed text-ink-soft">
              Brodé à la commande · Expédié sous 5 jours · Livraison offerte dès 80 €
            </p>
          </div>
        </div>

        {/* --------------------------- Les réglages ------------------------ */}
        <div className="space-y-6">
          <Panel step="01" title="Ton pays" subtitle="Le drapeau qui sert de fond" tone="bg-mint">
            <CountryPicker value={countryCode} onChange={selectCountry} />
          </Panel>

          <Panel
            step="02"
            title="Ton texte"
            subtitle="Une ville, un quartier, une date"
            tone="bg-lemon"
          >
            <label className="block">
              <span className="hud text-ink-soft">Ligne principale</span>
              <input
                type="text"
                value={text.line1}
                maxLength={MAX_LINE_1}
                onChange={(event) => patch({ line1: event.target.value })}
                placeholder="MARSEILLE"
                className="edge mt-2 w-full rounded-chip bg-cream px-4 py-3 text-xl font-bold text-ink placeholder:text-ink-faint focus:outline-none"
              />
              <span className="mt-1 block text-right text-[11px] font-bold text-ink-faint">
                {text.line1.length}/{MAX_LINE_1}
              </span>
            </label>

            <div className="mt-1 flex flex-wrap gap-2">
              {country.cities.map((city) => (
                <button
                  key={city}
                  type="button"
                  onClick={() => patch({ line1: city })}
                  className="sticker-sm sticker-press bg-tint-mint px-2.5 py-1.5 text-[11px] font-bold"
                >
                  {city}
                </button>
              ))}
            </div>

            {euroCities.length > 0 && (
              <div className="sticker-sm mt-4 bg-tint-lemon p-3">
                <p className="hud text-ink-soft">Villes hôtes Euro 2028</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {euroCities.map((entry) => (
                    <button
                      key={entry.city}
                      type="button"
                      onClick={() => patch({ line1: entry.city })}
                      title={entry.stadium}
                      className="sticker-sm sticker-press bg-paper px-2.5 py-1.5 text-[11px] font-bold"
                    >
                      ★ {entry.city}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <label className="mt-5 block">
              <span className="hud text-ink-soft">
                Seconde ligne
                <span className="ml-2 rounded-full border-[3px] border-ink bg-tangerine px-1.5 text-[10px] text-paper">
                  +{OPTION_PRICES.secondLine}€
                </span>
              </span>
              <input
                type="text"
                value={text.line2}
                maxLength={MAX_LINE_2}
                onChange={(event) => patch({ line2: event.target.value })}
                placeholder="DEPUIS 1993 (facultatif)"
                className="edge mt-2 w-full rounded-chip bg-cream px-4 py-3 font-bold text-ink placeholder:text-ink-faint focus:outline-none"
              />
              <span className="mt-1 block text-right text-[11px] font-bold text-ink-faint">
                {text.line2.length}/{MAX_LINE_2}
              </span>
            </label>
          </Panel>

          <Panel
            step="03"
            title="La broderie"
            subtitle="Le style, le fil, la finition du texte"
            tone="bg-tint-grape"
          >
            <div className="space-y-6">
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

              <div className="grid gap-6 sm:grid-cols-2">
                <OptionGroup
                  legend="Taille du texte"
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
          </Panel>

          <Panel
            step="04"
            title="Format & finition"
            subtitle="La taille du drapeau et sa confection"
            tone="bg-tint-blue"
          >
            <div className="grid gap-2.5 sm:grid-cols-2">
              {FORMATS.map((item) => {
                const selected = item.id === formatId;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setFormatId(item.id)}
                    aria-pressed={selected}
                    className={`sticker-sm sticker-press p-3.5 text-left ${
                      selected ? "bg-lemon" : "bg-paper"
                    }`}
                  >
                    <div className="flex items-baseline justify-between gap-2">
                      <span className="arcade text-base">{item.name}</span>
                      <span className="arcade text-sm text-bubble">
                        {formatPrice(item.price)}
                      </span>
                    </div>
                    <p className="mt-0.5 text-[11px] font-bold text-ink-soft">{item.dims}</p>
                    <p className="mt-1.5 text-xs font-semibold text-ink-soft">{item.pitch}</p>
                  </button>
                );
              })}
            </div>

            <div className="mt-4 space-y-2.5">
              {FINISHES.map((finish) => {
                const selected = finish.id === finishId;
                return (
                  <button
                    key={finish.id}
                    type="button"
                    onClick={() => setFinishId(finish.id)}
                    aria-pressed={selected}
                    className={`sticker-sm sticker-press flex w-full items-start gap-3 p-3.5 text-left ${
                      selected ? "bg-lemon" : "bg-paper"
                    }`}
                  >
                    <span
                      aria-hidden
                      className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full border-[3px] border-ink text-[10px] ${
                        selected ? "bg-bubble text-paper" : "bg-paper"
                      }`}
                    >
                      {selected ? "✓" : ""}
                    </span>
                    <span className="flex-1">
                      <span className="flex justify-between gap-3 text-sm font-bold">
                        {finish.label}
                        {finish.price > 0 && (
                          <span className="text-tangerine">+{finish.price} €</span>
                        )}
                      </span>
                      <span className="mt-1 block text-xs font-semibold leading-relaxed text-ink-soft">
                        {finish.detail}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </Panel>
        </div>
      </div>
    </div>
  );
}
