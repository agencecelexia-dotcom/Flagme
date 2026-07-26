"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart";
import { FlagPreview } from "@/components/flag/FlagPreview";
import { getCountry } from "@/data/countries";
import { getFinish, getFormat } from "@/data/formats";
import { getStitchFont, getThread } from "@/data/customization";
import {
  FREE_SHIPPING_THRESHOLD,
  SHIPPING_COST,
  formatPrice,
} from "@/lib/pricing";

function EmptyCart() {
  return (
    <div className="rounded-brand border border-dashed border-ink-4 px-6 py-20 text-center">
      <p className="brand-title text-3xl text-chalk">Ton panier est vide</p>
      <p className="mx-auto mt-3 max-w-sm text-sm text-chalk-dim">
        Il te manque un drapeau avec ton nom de ville dessus. Ça se règle en
        trois minutes.
      </p>
      <Link
        href="/configurateur"
        className="brand-title mt-8 inline-flex h-13 items-center rounded-brand bg-flare px-8 py-3 text-lg text-chalk transition-transform hover:-translate-y-0.5"
      >
        Créer mon drapeau
      </Link>
    </div>
  );
}

export function CartView() {
  const { items, ready, subtotal, remove, setQty, clear } = useCart();

  if (!ready) {
    return (
      <div className="h-64 animate-pulse rounded-brand border border-ink-3 bg-ink-2" />
    );
  }

  if (items.length === 0) return <EmptyCart />;

  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  const missing = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);

  return (
    <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr]">
      <div>
        <ul className="space-y-4">
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
                className="flex flex-col gap-5 rounded-brand border border-ink-3 bg-ink-2 p-4 sm:flex-row sm:p-5"
              >
                <div className="w-full shrink-0 sm:w-56">
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
                      <h3 className="brand-title truncate text-2xl text-chalk">
                        {item.text.line1 || "Sans texte"}
                      </h3>
                      <p className="mt-0.5 text-sm text-chalk-dim">
                        Drapeau {country.name} · {format.name} · {format.dims}
                      </p>
                    </div>
                    <p className="brand-title shrink-0 text-2xl text-chalk">
                      {formatPrice(item.unitPrice * item.qty)}
                    </p>
                  </div>

                  <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1.5 text-xs text-chalk-mute sm:grid-cols-3">
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
                          <div key={label} className="min-w-0">
                            <dt className="text-[10px] uppercase tracking-wider">{label}</dt>
                            <dd className="truncate text-chalk-dim">{value}</dd>
                          </div>
                        );
                      })}
                  </dl>

                  <div className="mt-auto flex items-center justify-between gap-4 pt-5">
                    <div className="flex items-center rounded-brand border border-ink-4">
                      <button
                        type="button"
                        onClick={() => setQty(item.id, item.qty - 1)}
                        aria-label="Retirer un exemplaire"
                        className="h-9 w-9 text-chalk-dim transition-colors hover:text-chalk"
                      >
                        −
                      </button>
                      <span className="w-8 text-center text-sm font-bold tabular-nums text-chalk">
                        {item.qty}
                      </span>
                      <button
                        type="button"
                        onClick={() => setQty(item.id, item.qty + 1)}
                        aria-label="Ajouter un exemplaire"
                        className="h-9 w-9 text-chalk-dim transition-colors hover:text-chalk"
                      >
                        +
                      </button>
                    </div>

                    <div className="flex items-center gap-4 text-xs">
                      <Link
                        href={`/configurateur?pays=${item.countryCode}&format=${item.formatId}&ligne1=${encodeURIComponent(item.text.line1)}`}
                        className="font-semibold text-chalk-dim underline-offset-4 hover:text-chalk hover:underline"
                      >
                        Modifier
                      </Link>
                      <button
                        type="button"
                        onClick={() => remove(item.id)}
                        className="font-semibold text-chalk-mute underline-offset-4 hover:text-flare hover:underline"
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
          className="mt-5 text-xs font-semibold text-chalk-mute underline-offset-4 hover:text-flare hover:underline"
        >
          Vider le panier
        </button>
      </div>

      {/* ---------------------------- Récapitulatif ---------------------- */}
      <aside className="lg:sticky lg:top-28 lg:self-start">
        <div className="rounded-brand border border-ink-3 bg-ink-2 p-6">
          <h2 className="brand-title text-2xl text-chalk">Récapitulatif</h2>

          <dl className="mt-5 space-y-2.5 text-sm">
            <div className="flex justify-between text-chalk-dim">
              <dt>Sous-total</dt>
              <dd className="tabular-nums text-chalk">{formatPrice(subtotal)}</dd>
            </div>
            <div className="flex justify-between text-chalk-dim">
              <dt>Livraison</dt>
              <dd className="tabular-nums text-chalk">
                {shipping === 0 ? "Offerte" : formatPrice(shipping)}
              </dd>
            </div>
          </dl>

          {missing > 0 && (
            <div className="mt-4">
              <p className="text-xs text-chalk-mute">
                Plus que{" "}
                <span className="font-bold text-thread">{formatPrice(missing)}</span>{" "}
                pour la livraison offerte.
              </p>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-ink-4">
                <div
                  className="h-full rounded-full bg-flare transition-all"
                  style={{
                    width: `${Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100)}%`,
                  }}
                />
              </div>
            </div>
          )}

          <div className="mt-5 flex items-end justify-between border-t border-ink-3 pt-5">
            <span className="eyebrow text-chalk-mute">Total</span>
            <span className="brand-title text-4xl text-chalk">
              {formatPrice(subtotal + shipping)}
            </span>
          </div>

          {/* Le paiement arrivera avec le backend commandes. */}
          <button
            type="button"
            disabled
            className="brand-title mt-5 flex h-14 w-full cursor-not-allowed items-center justify-center rounded-brand bg-ink-4 text-lg text-chalk-mute"
          >
            Paiement bientôt disponible
          </button>
          <p className="mt-3 text-center text-[11px] leading-relaxed text-chalk-mute">
            La prise de commande et le paiement arrivent à la prochaine étape.
            Ton panier est conservé sur cet appareil.
          </p>
        </div>

        <Link
          href="/configurateur"
          className="mt-4 flex h-12 items-center justify-center rounded-brand border border-ink-4 text-sm font-semibold text-chalk transition-colors hover:border-chalk-mute"
        >
          Ajouter un autre drapeau
        </Link>
      </aside>
    </div>
  );
}
