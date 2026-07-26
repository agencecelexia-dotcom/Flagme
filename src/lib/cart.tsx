"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { Configuration } from "./pricing";
import { priceBreakdown } from "./pricing";

export type CartItem = Configuration & {
  id: string;
  qty: number;
  /** Prix unitaire figé au moment de l'ajout. */
  unitPrice: number;
};

type CartContextValue = {
  items: CartItem[];
  /** Faux tant que le panier stocké n'a pas été relu côté client. */
  ready: boolean;
  count: number;
  subtotal: number;
  add: (config: Configuration) => void;
  remove: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = "flagme.cart.v1";

/**
 * Panier côté client uniquement.
 *
 * Le backend commandes n'existe pas encore : on persiste dans localStorage
 * pour que le parcours soit jouable de bout en bout. Quand l'API arrivera,
 * seule cette couche est à remplacer — les composants consomment déjà une
 * interface stable.
 */
export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) setItems(JSON.parse(stored) as CartItem[]);
    } catch {
      /* Panier illisible (version antérieure, quota) : on repart à vide. */
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* Stockage indisponible : le panier reste valable pour la session. */
    }
  }, [items, ready]);

  const add = useCallback((config: Configuration) => {
    setItems((current) => [
      ...current,
      {
        ...config,
        id: `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`,
        qty: 1,
        unitPrice: priceBreakdown(config).total,
      },
    ]);
  }, []);

  const remove = useCallback((id: string) => {
    setItems((current) => current.filter((item) => item.id !== id));
  }, []);

  const setQty = useCallback((id: string, qty: number) => {
    setItems((current) =>
      current.map((item) =>
        item.id === id ? { ...item, qty: Math.max(1, Math.min(99, qty)) } : item,
      ),
    );
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      ready,
      count: items.reduce((sum, item) => sum + item.qty, 0),
      subtotal: items.reduce((sum, item) => sum + item.qty * item.unitPrice, 0),
      add,
      remove,
      setQty,
      clear,
    }),
    [items, ready, add, remove, setQty, clear],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart doit être utilisé dans un CartProvider");
  return context;
}
