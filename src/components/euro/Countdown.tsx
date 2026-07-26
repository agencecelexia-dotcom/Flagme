"use client";

import { useEffect, useState } from "react";
import { EURO, timeToKickoff, type Countdown as CountdownValue } from "@/data/euro2028";

const CELLS: Array<{ key: keyof CountdownValue; label: string }> = [
  { key: "days", label: "jours" },
  { key: "hours", label: "heures" },
  { key: "minutes", label: "min" },
  { key: "seconds", label: "sec" },
];

/**
 * Compte à rebours jusqu'au coup d'envoi de l'Euro 2028.
 *
 * Le calcul démarre après le montage : rendre l'heure côté serveur ferait
 * diverger le HTML de l'hydratation à coup sûr.
 */
export function Countdown() {
  const [value, setValue] = useState<CountdownValue | null>(null);

  useEffect(() => {
    setValue(timeToKickoff());
    const timer = window.setInterval(() => setValue(timeToKickoff()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="flex items-end gap-7 sm:gap-9">
      {CELLS.map((cell) => (
        <div key={cell.key}>
          <p className="display text-4xl tabular-nums sm:text-5xl">
            {value === null ? "—" : String(value[cell.key] as number).padStart(2, "0")}
          </p>
          <p className="mt-1.5 text-xs text-ink-soft">{cell.label}</p>
        </div>
      ))}
    </div>
  );
}

/** Variante d'une ligne, pour les rappels discrets. */
export function CountdownInline() {
  const [days, setDays] = useState<number | null>(null);

  useEffect(() => {
    const tick = () => setDays(timeToKickoff().days);
    tick();
    const timer = window.setInterval(tick, 60_000);
    return () => window.clearInterval(timer);
  }, []);

  if (days === null) return <span>{EURO.name}</span>;
  return <span>{`J−${days} avant l'${EURO.name}`}</span>;
}
