import { OPTION_PRICES, getFinish, getFormat } from "@/data/formats";
import { getOutline, getThread } from "@/data/customization";
import type { TextConfig } from "@/components/flag/EmbroideredText";

export type Configuration = {
  countryCode: string;
  formatId: string;
  finishId: string;
  text: TextConfig;
};

export type PriceLine = { label: string; amount: number };

/**
 * Détail du prix, ligne par ligne. On expose le détail plutôt qu'un total
 * opaque : le client doit comprendre ce qu'il paie avant de commander.
 */
export function priceBreakdown(config: Configuration): {
  lines: PriceLine[];
  total: number;
} {
  const format = getFormat(config.formatId);
  const finish = getFinish(config.finishId);
  const thread = getThread(config.text.threadId);
  const outline = getOutline(config.text.outlineId);

  const lines: PriceLine[] = [
    { label: `Drapeau ${format.name} · ${format.dims}`, amount: format.price },
  ];

  if (config.text.line2.trim()) {
    lines.push({ label: "Seconde ligne brodée", amount: OPTION_PRICES.secondLine });
  }

  if (thread.metallic) {
    lines.push({ label: `Fil ${thread.label.toLowerCase()}`, amount: OPTION_PRICES.metallicThread });
  }

  if (outline.premium) {
    lines.push({ label: outline.label, amount: OPTION_PRICES.outline });
  }

  if (finish.price > 0) {
    lines.push({ label: finish.label, amount: finish.price });
  }

  return {
    lines,
    total: lines.reduce((sum, line) => sum + line.amount, 0),
  };
}

export function formatPrice(amount: number): string {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
}

/** Seuil de livraison offerte, affiché dans le panier et le bandeau. */
export const FREE_SHIPPING_THRESHOLD = 80;
export const SHIPPING_COST = 5.9;
