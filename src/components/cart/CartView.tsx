"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart";
import { FlagPreview } from "@/components/flag/FlagPreview";
import { getCountry } from "@/data/countries";
import { getFinish, getFormat } from "@/data/formats";
import { getStitchFont, getThread } from "@/data/customization";
import { FREE_SHIPPING_THRESHOLD, SHIPPING_COST, formatPrice } from "@/lib/pricing";

function EmptyCart() {
  return (
    <div className="sticker bg-tint-lemon px-6 py-16 text-center">
      <p aria-hidden className="animate-bob text-6xl">
        🛒
      </p>
      <p className="arcade mt-5 text-3xl">Panier vide</p>
      <p className="mx-auto mt-3 max-w-sm font-semibold text-ink-soft">
        Il te manque un drapeau avec ton nom de ville dessus. Ça se règle en
        trois minutes.
      </p>
      <Link
        href="/configurateur"
        className="sticker sticker-press arcade mt-8 inline-flex h-14 items-center bg-bubble px-8 text-lg text-paper"
      >
        Créer mon drapeau ▸
      </Link>
    </div>
  );
}

export function CartView() {
  const { items, ready, subtotal, remove, setQty, clear } = useCart();

  if (!ready) {
    return <div className="sticker h-64 animate-pulse bg-paper" />;
  }

  if (items.length === 0) return <EmptyCart />;

  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  const missing = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);

  return (
    <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr]">
      <div>
        <ul className="space-y-5">
          {items.map((item) => {
            const country = getCountry(item.countryCode);
            const format = getFormat(item.formatId);
            const finish = getFinish(item.finishId);
            const font = getStitchFont(item.text.fontId);
            const thread = getThread(item.text.threadId);
            if (!country) return null;

            return (
              <li
                key={item.id}
                className="sticker flex flex-col gap-5 bg-paper p-4 sm:flex-row sm:p-5"
              >
                <div className="edge w-full shrink-0 overflow-hidden rounded-chip sm:w-56">
                  <FlagPreview
                    spec={country.spec}
                    text={item.text}
                    ratio={format.ratio}
                    hardware={false}
                  />
                </div>

                <div className="flex min-w-0 flex-1 flex-col">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h3 className="arcade truncate text-xl">
                        {item.text.line1 || "Sans texte"}
                      </h3>
                      <p className="mt-1 text-sm font-bold text-ink-soft">
                        {country.name} · {format.name} · {format.dims}
                      </p>
                    </div>
                    <p className="arcade shrink-0 text-2xl text-bubble">
                      {formatPrice(item.unitPrice * item.qty)}
                    </p>
                  </div>

                  <dl className="mt-3 flex flex-wrap gap-2">
                    {[
                      ["Style", font.label],
                      ["Fil", thread.label],
                      ["Finition", finish.label],
                      item.text.line2 ? ["2ᵉ ligne", item.text.line2] : null,
                    ]
                      .filter(Boolean)
                      .map((entry) => {
                        const [label, value] = entry as [string, string];
                        return (
                          <div
                            key={label}
                            className="sticker-sm max-w-full bg-cream px-2.5 py-1.5"
                          >
                            <dt className="hud text-[9px] text-ink-faint">{label}</dt>
                            <dd className="truncate text-xs font-bold">{value}</dd>
                          </div>
                        );
                      })}
                  </dl>

                  <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-5">
                    <div className="sticker-sm flex items-center bg-cream">
                      <button
                        type="button"
                        onClick={() => setQty(item.id, item.qty - 1)}
                        aria-label="Retirer un exemplaire"
                        className="arcade h-9 w-9"
                      >
                        −
                      </button>
                      <span className="arcade w-8 text-center text-sm tabular-nums">
                        {item.qty}
                      </span>
                      <button
                        type="button"
                        onClick={() => setQty(item.id, item.qty + 1)}
                        aria-label="Ajouter un exemplaire"
                        className="arcade h-9 w-9"
                      >
                        +
                      </button>
                    </div>

                    <div className="flex items-center gap-3 text-xs font-bold">
                      <Link
                        href={`/configurateur?pays=${item.countryCode}&format=${item.formatId}&ligne1=${encodeURIComponent(item.text.line1)}`}
                        className="sticker-sm sticker-press bg-tint-mint px-3 py-2"
                      >
                        Modifier
                      </Link>
                      <button
                        type="button"
                        onClick={() => remove(item.id)}
                        className="sticker-sm sticker-press bg-tint-bubble px-3 py-2"
                      >
                        Retirer
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>

        <button
          type="button"
          onClick={clear}
          className="mt-5 text-xs font-bold text-ink-soft underline underline-offset-4 hover:text-bubble"
        >
          Vider le panier
        </button>
      </div>

      {/* ---------------------------- Récapitulatif ---------------------- */}
      <aside className="lg:sticky lg:top-32 lg:self-start">
        <div className="sticker bg-paper p-6">
          <h2 className="arcade text-2xl">Récapitulatif</h2>

          <dl className="mt-5 space-y-2.5 text-sm font-semibold">
            <div className="flex justify-between">
              <dt className="text-ink-soft">Sous-total</dt>
              <dd className="tabular-nums">{formatPrice(subtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-ink-soft">Livraison</dt>
              <dd className="tabular-nums">
                {shipping === 0 ? "Offerte 🎉" : formatPrice(shipping)}
              </dd>
            </div>
          </dl>

          {missing > 0 && (
            <div className="sticker-sm mt-4 bg-tint-lemon p-3">
              <p className="text-xs font-bold">
                Plus que <span className="text-bubble">{formatPrice(missing)}</span> pour
                la livraison offerte.
              </p>
              <div className="mt-2 h-3 overflow-hidden rounded-full border-[3px] border-ink bg-paper">
                <div
                  className="h-full bg-lime transition-all"
                  style={{
                    width: `${Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100)}%`,
                  }}
                />
              </div>
            </div>
          )}

          <div className="edge-t mt-5 flex items-end justify-between pt-5">
            <span className="hud text-ink-soft">Total</span>
            <span className="arcade text-4xl text-bubble">
              {formatPrice(subtotal + shipping)}
            </span>
          </div>

          {/* Le paiement arrivera avec le backend commandes. */}
          <button
            type="button"
            disabled
            className="sticker-sm arcade mt-5 flex h-14 w-full cursor-not-allowed items-center justify-center bg-cream text-sm text-ink-faint"
          >
            Paiement bientôt dispo
          </button>
          <p className="mt-3 text-center text-[11px] font-semibold leading-relaxed text-ink-soft">
            La prise de commande et le paiement arrivent à la prochaine étape.
            Ton panier est conservé sur cet appareil.
          </p>
        </div>

        <Link
          href="/configurateur"
          className="sticker-sm sticker-press mt-4 flex h-13 items-center justify-center bg-lemon py-3.5 text-sm font-bold"
        >
          Ajouter un autre drapeau ▸
        </Link>
      </aside>
    </div>
  );
}
