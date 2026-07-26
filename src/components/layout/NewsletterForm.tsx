"use client";

import { useState } from "react";

/**
 * Inscription au « vestiaire ». Tant qu'il n'y a pas de backend, on confirme
 * localement plutôt que de laisser le formulaire recharger la page dans le
 * vide — mais rien n'est envoyé, et on le dit.
 */
export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  if (done) {
    return (
      <p className="sticker-sm mt-4 bg-mint px-3 py-3 text-sm font-bold text-ink">
        🎉 C&apos;est noté pour <span className="break-all">{email}</span>.
      </p>
    );
  }

  return (
    <form
      className="mt-4 flex gap-2"
      aria-label="Inscription à la newsletter"
      onSubmit={(event) => {
        event.preventDefault();
        setDone(true);
      }}
    >
      <input
        type="email"
        required
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder="ton@email.fr"
        className="min-w-0 flex-1 rounded-chip border-[3px] border-paper/25 bg-paper/10 px-3 py-2.5 text-sm font-semibold text-paper placeholder:text-paper/50 focus:border-lemon focus:outline-none"
      />
      <button
        type="submit"
        className="sticker-sm sticker-press arcade bg-lemon px-3.5 text-sm text-ink"
      >
        OK
      </button>
    </form>
  );
}
