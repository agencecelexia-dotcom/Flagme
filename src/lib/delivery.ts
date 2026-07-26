/** Délais annoncés, en jours ouvrés puis en jours calendaires de transport. */
export const WORKSHOP_WORKING_DAYS = 5;
export const SHIPPING_DAYS = 3;

/** Fait avancer une date de `count` jours ouvrés, samedi et dimanche exclus. */
function addWorkingDays(from: Date, count: number): Date {
  const date = new Date(from);
  let remaining = count;

  while (remaining > 0) {
    date.setDate(date.getDate() + 1);
    const day = date.getDay();
    if (day !== 0 && day !== 6) remaining -= 1;
  }

  return date;
}

/**
 * Date de livraison estimée : le temps d'atelier se compte en jours ouvrés,
 * le transport en jours calendaires.
 *
 * Annoncer « vers le 12 août » vaut mieux qu'un « sous 5 jours » que
 * l'acheteur doit convertir lui-même — et qui ne dit rien des week-ends.
 */
export function estimatedDelivery(from: Date = new Date()): Date {
  const outOfWorkshop = addWorkingDays(from, WORKSHOP_WORKING_DAYS);
  const delivered = new Date(outOfWorkshop);
  delivered.setDate(delivered.getDate() + SHIPPING_DAYS);
  return delivered;
}

export function formatDeliveryDate(date: Date): string {
  return new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "long",
  }).format(date);
}
