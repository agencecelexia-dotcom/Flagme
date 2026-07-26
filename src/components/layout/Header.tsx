"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Wordmark } from "@/components/brand/Wordmark";
import { CountdownInline } from "@/components/euro/Countdown";
import { COUNTRIES } from "@/data/countries";
import { useCart } from "@/lib/cart";

const NAV = [
  { href: "/configurateur", label: "Créer", color: "bg-lemon" },
  { href: "/euro-2028", label: "Euro 2028", color: "bg-mint" },
  { href: "/formats", label: "Tailles", color: "bg-tint-blue" },
  { href: "/manifeste", label: "Manifeste", color: "bg-tint-grape" },
  { href: "/faq", label: "FAQ", color: "bg-tint-bubble" },
];

const TICKER = [
  "Livraison offerte dès 80 €",
  "Brodé à la commande en 5 jours",
  `${COUNTRIES.length} nations à débloquer`,
  "Fil épais, tenue garantie 3 ans",
];

export function Header() {
  const pathname = usePathname();
  const { count, ready } = useCart();
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className="sticky top-0 z-50">
      {/* Bandeau défilant : le générique avant le jeu. */}
      <div className="overflow-hidden edge-b bg-bubble text-paper">
        <div className="ticker-track py-2">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex shrink-0" aria-hidden={copy === 1}>
              {TICKER.map((message) => (
                <span key={message} className="hud flex items-center gap-5 whitespace-nowrap px-5">
                  {message}
                  <span className="text-lemon">★</span>
                </span>
              ))}
              <span className="hud flex items-center gap-5 whitespace-nowrap px-5">
                <CountdownInline />
                <span className="text-lemon">★</span>
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="edge-b bg-cream">
        <div className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between gap-4 px-4">
          <Link href="/" className="shrink-0">
            <Wordmark className="text-xl" />
          </Link>

          <nav className="hidden items-center gap-2 lg:flex">
            {NAV.map((item) => {
              const active = pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`sticker-sm sticker-press px-3.5 py-2 text-sm font-bold ${
                    active ? "bg-ink text-lemon" : `${item.color} text-ink`
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            {/* Le panier se lit comme un compteur de pièces. */}
            <Link
              href="/panier"
              className="sticker-sm sticker-press flex items-center gap-2 bg-paper px-3 py-2"
              aria-label={`Panier, ${ready ? count : 0} article${count > 1 ? "s" : ""}`}
            >
              <span aria-hidden className="text-lg leading-none">
                🛒
              </span>
              <span
                className={`arcade grid h-6 min-w-6 place-items-center rounded-full px-1.5 text-xs ${
                  ready && count > 0 ? "bg-bubble text-paper" : "bg-cream text-ink-faint"
                }`}
              >
                {ready ? count : 0}
              </span>
            </Link>

            <Link
              href="/configurateur"
              className="sticker-sm sticker-press hidden bg-lime px-4 py-2.5 sm:block"
            >
              <span className="arcade text-sm">Jouer ▸</span>
            </Link>

            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-label="Ouvrir le menu"
              aria-expanded={open}
              className="sticker-sm sticker-press grid h-11 w-11 place-items-center bg-paper lg:hidden"
            >
              <span className="relative block h-3.5 w-4.5">
                <span
                  className={`absolute left-0 h-[3px] w-4.5 rounded bg-ink transition-all ${
                    open ? "top-1.5 rotate-45" : "top-0"
                  }`}
                />
                <span
                  className={`absolute left-0 top-1.5 h-[3px] w-4.5 rounded bg-ink transition-opacity ${
                    open ? "opacity-0" : "opacity-100"
                  }`}
                />
                <span
                  className={`absolute left-0 h-[3px] w-4.5 rounded bg-ink transition-all ${
                    open ? "top-1.5 -rotate-45" : "top-3"
                  }`}
                />
              </span>
            </button>
          </div>
        </div>

        {open && (
          <nav className="grid grid-cols-2 gap-2 edge-t bg-cream p-4 lg:hidden">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`sticker-sm px-3 py-3 text-center text-sm font-bold ${item.color}`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
