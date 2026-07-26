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
      <p className="mt-4 text-sm text-bone/70">
        C&apos;est noté pour <span className="font-semibold text-bone">{email}</span>.
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
        className="min-w-0 flex-1 rounded-full bg-paper px-4 py-2.5 text-sm text-ink shadow-[0_1px_2px_rgb(21_21_15/0.06)] placeholder:text-ink-faint focus:outline-none"
      />
      <button type="submit" className="pill pill-dark h-10 px-4 text-sm">
        OK
      </button>
    </form>
  );
}
