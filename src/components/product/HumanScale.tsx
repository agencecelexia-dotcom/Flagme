/**
 * Silhouette de référence pour le comparateur de formats.
 *
 * « 150 × 90 cm » ne veut rien dire tant qu'on n'a pas quelque chose de connu
 * à côté. Le repère est en centimètres, ce qui permet de mettre la silhouette
 * exactement à la même échelle que les drapeaux.
 */
export const HUMAN_HEIGHT_CM = 170;
export const HUMAN_WIDTH_CM = 46;

export function HumanScale({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox={`0 0 ${HUMAN_WIDTH_CM} ${HUMAN_HEIGHT_CM}`}
      className={className}
      role="img"
      aria-label="Silhouette de 1,70 m, à la même échelle que les drapeaux"
      fill="currentColor"
    >
      <circle cx="23" cy="13" r="11" />
      {/* Buste et bras d'un seul bloc : à cette taille, détailler les
          épaules ne se voit pas et fragilise la lecture. */}
      <rect x="9" y="27" width="28" height="72" rx="12" />
      <rect x="13" y="93" width="8" height="77" rx="4" />
      <rect x="25" y="93" width="8" height="77" rx="4" />
    </svg>
  );
}
