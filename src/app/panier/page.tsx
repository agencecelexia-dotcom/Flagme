import type { Metadata } from "next";
import { CartView } from "@/components/cart/CartView";

export const metadata: Metadata = {
  title: "Panier",
  description: "Tes drapeaux personnalisés avant commande.",
};

export default function CartPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <p className="hud text-bubble">Ton panier</p>
      <h1 className="arcade-hero mt-3 text-[clamp(2.4rem,7vw,4.5rem)]">
        Avant le coup d&apos;envoi
      </h1>

      <div className="mt-10">
        <CartView />
      </div>
    </div>
  );
}
