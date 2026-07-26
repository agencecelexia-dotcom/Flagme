"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Wordmark } from "@/components/brand/Wordmark";
import { useCart } from "@/lib/cart";

const NAV = [
  { href: "/configurateur", label: "Créer" },
  { href: "/euro-2028", label: "Euro 2028" },
  { href: "/formats", label: "Formats" },
  { href: "/manifeste", label: "Manifeste" },
  { href: "/faq", label: "FAQ" },
];

export function Header() {
  const pathname = usePathname();
  const { count, ready } = useCart();
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className="sticky top-0 z-50 bg-bone/85 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-6 px-5">
        <Link href="/" className="shrink-0">
          <Wordmark className="text-xl" />
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {NAV.map((item) => {
            const active = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-[15px] transition-colors ${
                  active
                    ? "font-semibold text-ink underline decoration-2 underline-offset-8"
                    : "font-medium text-ink-soft hover:text-ink"
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
            className="pill pill-light relative h-11 w-11"
            aria-label={`Panier, ${ready ? count : 0} article${count > 1 ? "s" : ""}`}
          >
            <svg viewBox="0 0 20 20" className="h-4.5 w-4.5 fill-none stroke-ink stroke-[1.6]">
              <path d="M3 5.5h14l-1.4 9.2a1.6 1.6 0 0 1-1.6 1.3H6a1.6 1.6 0 0 1-1.6-1.3Z" />
              <path d="M7 5.5a3 3 0 0 1 6 0" strokeLinecap="round" />
            </svg>
            {ready && count > 0 && (
              <span className="absolute -right-0.5 -top-0.5 grid h-5 min-w-5 place-items-center rounded-full bg-clay px-1 text-[10px] font-bold text-paper">
                {count}
              </span>
            )}
          </Link>

          <Link
            href="/configurateur"
            className="pill pill-light hidden h-11 px-5 text-[15px] sm:inline-flex"
          >
            Créer mon drapeau
            <span className="text-ink-faint">·</span>
            <span className="font-medium text-ink-soft">3 mn</span>
          </Link>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-label="Ouvrir le menu"
            aria-expanded={open}
            className="pill pill-light h-11 w-11 lg:hidden"
          >
            <span className="relative block h-3 w-4">
              <span
                className={`absolute left-0 h-0.5 w-4 rounded bg-ink transition-all ${
                  open ? "top-1.5 rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute left-0 top-1.5 h-0.5 w-4 rounded bg-ink transition-opacity ${
                  open ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute left-0 h-0.5 w-4 rounded bg-ink transition-all ${
                  open ? "top-1.5 -rotate-45" : "top-3"
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      {open && (
        <nav className="rule mx-5 lg:hidden">
          <div className="py-2">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block py-3 text-[15px] font-medium text-ink-soft"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
