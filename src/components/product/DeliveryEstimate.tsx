"use client";

import { useEffect, useState } from "react";
import { estimatedDelivery, formatDeliveryDate } from "@/lib/delivery";

/**
 * Promesse de livraison datée.
 *
 * Le calcul se fait après le montage : ces pages sont rendues à la
 * construction, une date calculée côté serveur serait figée au jour du
 * déploiement. En attendant, on affiche la version en durée, qui reste vraie.
 */
export function DeliveryEstimate({ className = "" }: { className?: string }) {
  const [date, setDate] = useState<string | null>(null);

  useEffect(() => {
    setDate(formatDeliveryDate(estimatedDelivery()));
  }, []);

  return (
    <span className={className}>
      {date ? `Brodé et livré vers le ${date}` : "Brodé et livré sous 8 jours"}
    </span>
  );
}
