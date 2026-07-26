import type { Metadata } from "next";
import { CartView } from "@/components/cart/CartView";

export const metadata: Metadata = {
  title: "Panier",
  description: "Tes drapeaux personnalisés avant commande.",
};

export default function CartPage() {
  return (
    <div className="mx-auto max-w-7xl px-5 py-12">
      <p className="eyebrow text-flare">Ton panier</p>
      <h1 className="brand-title mt-3 text-[clamp(2.6rem,6vw,4.5rem)] text-chalk">
        Avant le coup d&apos;envoi
      </h1>

      <div className="mt-10">
        <CartView />
      </div>
    </div>
  );
}
