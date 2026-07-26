import type { Metadata } from "next";
import { CartView } from "@/components/cart/CartView";

export const metadata: Metadata = {
  title: "Panier",
  description: "Tes drapeaux personnalisés avant commande.",
};

export default function CartPage() {
  return (
    <div className="mx-auto max-w-7xl px-5 pb-16 pt-10">
      <p className="eyebrow">Ton panier</p>
      <h1 className="display mt-6 text-[clamp(2.6rem,6vw,4.2rem)]">
        Avant le coup d&apos;envoi
      </h1>

      <div className="mt-14">
        <CartView />
      </div>
    </div>
  );
}
