/** Logotype FlagMe : un fanion cousu, puis le mot en deux temps. */
export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <svg
        viewBox="0 0 32 32"
        className="h-[1.15em] w-[1.15em] shrink-0"
        aria-hidden="true"
      >
        <rect x="3" y="2" width="2.6" height="28" rx="1" fill="currentColor" />
        <path d="M7 4 H28 L23 12.5 L28 21 H7 Z" fill="var(--color-flare)" />
        <path
          d="M7 4 H28 L23 12.5 L28 21 H7 Z"
          fill="none"
          stroke="var(--color-chalk)"
          strokeOpacity="0.55"
          strokeWidth="0.8"
          strokeDasharray="2 1.6"
        />
      </svg>
      <span className="brand-title text-[1.35em] tracking-[-0.02em]">
        Flag<span className="text-flare">Me</span>
      </span>
    </span>
  );
}
