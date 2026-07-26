"use client";

import { useEffect, useState } from "react";

export type StepDef = { id: string; label: string; done?: boolean };

/**
 * Rail d'étapes collant.
 *
 * Il indique où on en est plutôt que ce qui est validé : dans ce
 * configurateur, tous les réglages ont un défaut correct, la seule chose que
 * l'utilisateur doit vraiment fournir est son texte. Une coche n'apparaît
 * donc que là où elle veut dire quelque chose.
 */
export function StepNav({ steps }: { steps: StepDef[] }) {
  const [active, setActive] = useState(steps[0]?.id);

  useEffect(() => {
    const sections = steps
      .map((step) => document.getElementById(step.id))
      .filter((node): node is HTMLElement => node !== null);
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // La section active est la plus haute de celles qui touchent le
        // tiers supérieur de l'écran.
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-25% 0px -60% 0px", threshold: 0 },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [steps]);

  return (
    <nav
      aria-label="Étapes de création"
      className="sticky top-20 z-30 mb-6 bg-bone/90 py-3 backdrop-blur-xl"
    >
      <ol className="flex items-center gap-1 overflow-x-auto">
        {steps.map((step, index) => {
          const current = step.id === active;
          return (
            <li key={step.id} className="flex shrink-0 items-center">
              {index > 0 && (
                <span aria-hidden className="px-1 text-ink-faint">
                  ·
                </span>
              )}
              <a
                href={`#${step.id}`}
                aria-current={current ? "step" : undefined}
                className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm transition-colors ${
                  current ? "bg-ink text-bone" : "text-ink-soft hover:text-ink"
                }`}
              >
                <span className={current ? "opacity-60" : "text-ink-faint"}>
                  {String(index + 1).padStart(2, "0")}
                </span>
                {step.label}
                {step.done && (
                  <span aria-label="renseigné" className={current ? "text-bone" : "text-clay"}>
                    ✓
                  </span>
                )}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
