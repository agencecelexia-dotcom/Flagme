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
    <div className="dashed px-6 py-20 text-center">
      <p className="display text-2xl">Ton panier est vide</p>
      <p className="mx-auto mt-4 max-w-sm leading-relaxed text-ink-soft">
        Il te manque un drapeau avec ton nom de ville dessus. Ça se règle en
        trois minutes.
      </p>
      <Link href="/configurateur" className="pill pill-dark mt-8 h-13 px-8 py-3.5 text-base">
        Créer mon drapeau
      </Link>
    </div>
  );
}

export function CartView() {
  const { items, ready, subtotal, remove, setQty, clear } = useCart();

  if (!ready) return <div className="card h-64 animate-pulse" />;
  if (items.length === 0) return <EmptyCart />;

  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  const missing = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);

  return (
    <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.5fr_1fr]">
      <div>
        <ul>
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
                className="rule flex flex-col gap-6 py-7 first:border-t-0 first:pt-0 sm:flex-row"
              >
                <div className="w-full shrink-0 overflow-hidden rounded-soft shadow-[0_1px_2px_rgb(21_21_15/0.07)] sm:w-52">
                  <FlagPreview
                    spec={country.spec}
                    text={item.text}
                    ratio={format.ratio}
                  />
                </div>

                <div className="flex min-w-0 flex-1 flex-col">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <h3 className="display truncate text-xl">
                        {item.text.line1 || "Sans texte"}
                      </h3>
                      <p className="mt-1 text-sm text-ink-soft">
                        {country.name} · {format.name} {format.dims}
                      </p>
                    </div>
                    <p className="shrink-0 font-semibold">
                      {formatPrice(item.unitPrice * item.qty)}
                    </p>
                  </div>

                  <p className="mt-3 text-sm text-ink-soft">
                    {[
                      font.label,
                      `fil ${thread.label.toLowerCase()}`,
                      finish.label.toLowerCase(),
                      item.text.line2 ? `« ${item.text.line2} »` : null,
                    ]
                      .filter(Boolean)
                      .join(" · ")}
                  </p>

                  <div className="mt-auto flex flex-wrap items-center justify-between gap-4 pt-6">
                    <div className="flex items-center rounded-full bg-bone-warm">
                      <button
                        type="button"
                        onClick={() => setQty(item.id, item.qty - 1)}
                        aria-label="Retirer un exemplaire"
                        className="h-9 w-9 text-ink-soft transition-colors hover:text-ink"
                      >
                        −
                      </button>
                      <span className="w-7 text-center text-sm font-semibold tabular-nums">
                        {item.qty}
                      </span>
                      <button
                        type="button"
                        onClick={() => setQty(item.id, item.qty + 1)}
                        aria-label="Ajouter un exemplaire"
                        className="h-9 w-9 text-ink-soft transition-colors hover:text-ink"
                      >
                        +
                      </button>
                    </div>

                    <div className="flex items-center gap-5 text-sm">
                      <Link
                        href={`/configurateur?pays=${item.countryCode}&format=${item.formatId}&ligne1=${encodeURIComponent(item.text.line1)}`}
                        className="font-medium text-ink-soft underline-offset-4 hover:text-ink hover:underline"
                      >
                        Modifier
                      </Link>
                      <button
                        type="button"
                        onClick={() => remove(item.id)}
                        className="font-medium text-ink-faint underline-offset-4 hover:text-clay hover:underline"
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
          className="rule mt-2 w-full pt-6 text-left text-sm text-ink-faint underline-offset-4 hover:text-clay hover:underline"
        >
          Vider le panier
        </button>
      </div>

      {/* ---------------------------- Récapitulatif ---------------------- */}
      <aside className="lg:sticky lg:top-28 lg:self-start">
        <div className="card p-7">
          <h2 className="display text-xl">Récapitulatif</h2>

          <dl className="mt-6 space-y-3 text-sm">
            <div className="flex justify-between">
              <dt className="text-ink-soft">Sous-total</dt>
              <dd className="tabular-nums">{formatPrice(subtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-ink-soft">Livraison</dt>
              <dd className="tabular-nums">
                {shipping === 0 ? "Offerte" : formatPrice(shipping)}
              </dd>
            </div>
          </dl>

          {missing > 0 && (
            <div className="mt-5">
              <p className="text-xs text-ink-soft">
                Plus que <span className="font-semibold text-ink">{formatPrice(missing)}</span>{" "}
                pour la livraison offerte.
              </p>
              <div className="mt-2.5 h-1 overflow-hidden rounded-full bg-line">
                <div
                  className="h-full rounded-full bg-clay transition-all"
                  style={{
                    width: `${Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100)}%`,
                  }}
                />
              </div>
            </div>
          )}

          <div className="rule mt-6 flex items-end justify-between pt-6">
            <span className="text-sm text-ink-soft">Total</span>
            <span className="display text-3xl">{formatPrice(subtotal + shipping)}</span>
          </div>

          {/* Le paiement arrivera avec le backend commandes. */}
          <button
            type="button"
            disabled
            className="pill mt-6 h-13 w-full bg-bone-warm py-3.5 text-[15px] text-ink-faint"
          >
            Paiement bientôt disponible
          </button>
          <p className="mt-4 text-center text-xs leading-relaxed text-ink-faint">
            La prise de commande et le paiement arrivent à la prochaine étape.
            Ton panier est conservé sur cet appareil.
          </p>
        </div>

        <Link
          href="/configurateur"
          className="pill pill-light mt-4 h-12 w-full text-[15px]"
        >
          Ajouter un autre drapeau
        </Link>
      </aside>
    </div>
  );
}
