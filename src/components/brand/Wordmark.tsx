/**
 * Logotype FlagMe.
 *
 * Un fanion épais à contour noir, puis le mot en lettrage d'arcade avec la
 * même ombre dure que les autocollants du site : le logo est un sticker
 * comme le reste, pas une exception.
 */
export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <svg
        viewBox="0 0 34 34"
        className="h-[1.25em] w-[1.25em] shrink-0"
        aria-hidden="true"
      >
        <rect
          x="3"
          y="2"
          width="4.5"
          height="30"
          rx="2.2"
          fill="var(--color-ink)"
        />
        <path
          d="M8 4.5 H30 L25 13 L30 21.5 H8 Z"
          fill="var(--color-bubble)"
          stroke="var(--color-ink)"
          strokeWidth="2.6"
          strokeLinejoin="round"
        />
        <circle cx="15" cy="13" r="1.9" fill="var(--color-lemon)" />
        <circle cx="22" cy="13" r="1.9" fill="var(--color-mint)" />
      </svg>

      <span
        className="arcade text-[1.15em]"
        style={{ textShadow: "0.045em 0.045em 0 var(--color-ink)" }}
      >
        Flag<span className="text-bubble">Me</span>
      </span>
    </span>
  );
}
