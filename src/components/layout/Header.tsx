"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Wordmark } from "@/components/brand/Wordmark";
import { COUNTRIES } from "@/data/countries";
import { useCart } from "@/lib/cart";

const NAV = [
  { href: "/configurateur", label: "Configurateur" },
  { href: "/formats", label: "Formats" },
  { href: "/manifeste", label: "Le manifeste" },
  { href: "/faq", label: "FAQ" },
];

const TICKER = [
  "Livraison offerte dès 80 €",
  "Brodé à la commande en 5 jours ouvrés",
  `${COUNTRIES.length} nations au catalogue`,
  "Fil épais, tenue garantie 3 ans",
];

export function Header() {
  const pathname = usePathname();
  const { count, ready } = useCart();
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className="sticky top-0 z-50">
      {/* Banderole défilante : l'ambiance commence avant le logo. */}
      <div className="overflow-hidden border-b border-ink-3 bg-flare text-ink">
        <div className="ticker-track py-1.5">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex shrink-0">
              {TICKER.map((message) => (
                <span
                  key={message}
                  className="eyebrow flex items-center gap-6 whitespace-nowrap px-6"
                >
                  {message}
                  <span aria-hidden className="opacity-50">
                    ✦
                  </span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="border-b border-ink-3 bg-ink/85 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-5">
          <Link href="/" className="text-chalk transition-opacity hover:opacity-80">
            <Wordmark className="text-lg" />
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            {NAV.map((item) => {
              const active = pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-sm font-medium transition-colors ${
                    active ? "text-flare" : "text-chalk-dim hover:text-chalk"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/panier"
              className="relative flex h-10 items-center gap-2 rounded-brand border border-ink-4 px-3.5 text-sm font-semibold text-chalk transition-colors hover:border-chalk-mute"
            >
              Panier
              <span
                className={`grid h-5 min-w-5 place-items-center rounded-full px-1 text-[11px] font-bold ${
                  ready && count > 0 ? "bg-flare text-chalk" : "bg-ink-4 text-chalk-mute"
                }`}
              >
                {ready ? count : 0}
              </span>
            </Link>

            <Link
              href="/configurateur"
              className="hidden h-10 items-center rounded-brand bg-chalk px-4 text-sm font-bold text-ink transition-colors hover:bg-flare hover:text-chalk sm:flex"
            >
              Créer le mien
            </Link>

            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-label="Ouvrir le menu"
              aria-expanded={open}
              className="grid h-10 w-10 place-items-center rounded-brand border border-ink-4 md:hidden"
            >
              <span className="relative block h-3 w-4">
                <span
                  className={`absolute left-0 h-0.5 w-4 bg-chalk transition-all ${
                    open ? "top-1.5 rotate-45" : "top-0"
                  }`}
                />
                <span
                  className={`absolute left-0 top-1.5 h-0.5 w-4 bg-chalk transition-opacity ${
                    open ? "opacity-0" : "opacity-100"
                  }`}
                />
                <span
                  className={`absolute left-0 h-0.5 w-4 bg-chalk transition-all ${
                    open ? "top-1.5 -rotate-45" : "top-3"
                  }`}
                />
              </span>
            </button>
          </div>
        </div>

        {open && (
          <nav className="border-t border-ink-3 bg-ink px-5 py-3 md:hidden">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block border-b border-ink-3 py-3 text-sm font-semibold text-chalk-dim last:border-0"
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
