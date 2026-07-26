/**
 * Logotype FlagMe : le mot en lourd, un petit fanion planté sur le « i »
 * de la hampe. Monochrome — la seule couleur du site est réservée aux
 * surtitres, le logo ne s'en sert pas.
 */
export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-baseline gap-1.5 ${className}`}>
      <svg
        viewBox="0 0 20 24"
        className="h-[0.95em] w-[0.8em] shrink-0 self-center"
        aria-hidden="true"
      >
        <rect x="1.5" y="1" width="2.4" height="22" rx="1.2" fill="currentColor" />
        <path d="M4.6 3 H18 L14.6 8.5 L18 14 H4.6 Z" fill="currentColor" />
      </svg>
      <span className="display tracking-[-0.04em]">
        Flag<span className="font-medium">Me</span>
      </span>
    </span>
  );
}
