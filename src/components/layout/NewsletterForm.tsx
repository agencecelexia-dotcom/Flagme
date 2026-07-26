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
      <p className="mt-4 rounded-brand border border-turf/40 bg-turf/10 px-3 py-3 text-sm text-chalk">
        C&apos;est noté pour <span className="font-bold">{email}</span>. On
        t&apos;écrit à la prochaine série.
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
        className="min-w-0 flex-1 rounded-brand border border-ink-4 bg-ink px-3 py-2.5 text-sm text-chalk placeholder:text-chalk-mute focus:border-flare focus:outline-none"
      />
      <button
        type="submit"
        className="rounded-brand bg-chalk px-3.5 text-sm font-bold text-ink transition-colors hover:bg-flare hover:text-chalk"
      >
        OK
      </button>
    </form>
  );
}
