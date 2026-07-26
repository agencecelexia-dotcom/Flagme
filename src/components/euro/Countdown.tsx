"use client";

import { useEffect, useState } from "react";
import { EURO, timeToKickoff, type Countdown as CountdownValue } from "@/data/euro2028";

const CELLS: Array<{ key: keyof CountdownValue; label: string }> = [
  { key: "days", label: "Jours" },
  { key: "hours", label: "Heures" },
  { key: "minutes", label: "Min" },
  { key: "seconds", label: "Sec" },
];

/**
 * Compte à rebours jusqu'au coup d'envoi de l'Euro 2028.
 *
 * Le calcul démarre après le montage : rendre l'heure côté serveur ferait
 * diverger le HTML de l'hydratation à coup sûr.
 */
export function Countdown({ tone = "light" }: { tone?: "light" | "dark" }) {
  const [value, setValue] = useState<CountdownValue | null>(null);

  useEffect(() => {
    setValue(timeToKickoff());
    const timer = window.setInterval(() => setValue(timeToKickoff()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const cellBg = tone === "dark" ? "bg-ink text-lemon" : "bg-paper text-ink";

  return (
    <div className="flex gap-2 sm:gap-3">
      {CELLS.map((cell) => (
        <div key={cell.key} className="text-center">
          <div
            className={`sticker-sm grid h-14 w-14 place-items-center sm:h-16 sm:w-16 ${cellBg}`}
          >
            <span className="arcade text-xl tabular-nums sm:text-2xl">
              {value === null
                ? "--"
                : String(value[cell.key] as number).padStart(2, "0")}
            </span>
          </div>
          <p className="hud mt-1.5 text-[9px] text-ink-soft">{cell.label}</p>
        </div>
      ))}
    </div>
  );
}

/** Variante compacte, sur une seule ligne, pour les bandeaux. */
export function CountdownInline() {
  const [days, setDays] = useState<number | null>(null);

  useEffect(() => {
    const tick = () => setDays(timeToKickoff().days);
    tick();
    const timer = window.setInterval(tick, 60_000);
    return () => window.clearInterval(timer);
  }, []);

  if (days === null) return <span>{EURO.name}</span>;

  return (
    <span>
      J−{days} avant l&apos;{EURO.name}
    </span>
  );
}
