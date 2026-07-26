"use client";

import { useEffect, useState } from "react";

/**
 * Copie le lien du drapeau en cours.
 *
 * Le configurateur est déjà partageable par URL, mais rien ne le disait :
 * personne ne pense à recopier sa barre d'adresse pour montrer son drapeau
 * à quelqu'un.
 */
export function ShareButton({ query }: { query: string }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), 2500);
    return () => window.clearTimeout(timer);
  }, [copied]);

  const copy = async () => {
    const url = `${window.location.origin}/configurateur?${query}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
    } catch {
      // Presse-papiers refusé (contexte non sécurisé, permission) : on
      // remet l'URL dans la barre d'adresse, l'utilisateur peut la copier.
      window.history.replaceState(null, "", `/configurateur?${query}`);
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      className="mt-4 w-full text-center text-xs text-ink-soft underline-offset-4 transition-colors hover:text-ink hover:underline"
    >
      {copied ? "Lien copié ✓" : "Copier le lien de mon drapeau"}
    </button>
  );
}
