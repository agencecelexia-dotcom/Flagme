import type { Metadata } from "next";
import { fontVariables } from "@/lib/fonts";
import { CartProvider } from "@/lib/cart";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "FlagMe — Ton pays. Ta ville. Brodés.",
    template: "%s · FlagMe",
  },
  description:
    "Drapeaux de supporter personnalisés : choisis ton pays, brode ta ville ou ton texte. Broderie fil épais, finitions stade, fabriqué pour durer.",
  keywords: [
    "drapeau personnalisé",
    "drapeau supporter",
    "broderie",
    "drapeau brodé",
    "tifo",
    "FlagMe",
  ],
  openGraph: {
    title: "FlagMe — Ton pays. Ta ville. Brodés.",
    description:
      "Choisis ton pays, brode ta ville. Le drapeau de supporter personnalisé.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className={fontVariables}>
      <body className="min-h-screen bg-ink text-chalk">
        <CartProvider>
          <div className="relative z-10 flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
