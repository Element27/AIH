"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

export interface CartItem extends Product {
  quantity: number;
}

interface ProductStore {
  products: Product[];
  filteredProducts: Product[];
  loading: boolean;
  error: string | null;
  searchQuery: string;
  fetchProducts: () => Promise<void>;
  setSearchQuery: (query: string | undefined) => void;

  // Cart
  cart: CartItem[];
  addToCart: (product: CartItem) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;

  updateQuantity: (id: number, quantity: number) => void;
  getCartTotal: () => number;
}

export const useProductStore = create<ProductStore>()(
  persist(
    (set, get) => ({
      products: [],
      filteredProducts: [],
      loading: true,
      error: null,
      searchQuery: "",
      cart: [],

      fetchProducts: async () => {
        set({ loading: true, error: null });
        try {
          const res = await fetch("https://fakestoreapi.com/products");
          const data = await res.json();
          set({
            products: data,
            filteredProducts: data,
            loading: false,
          });
        } catch (err: unknown) {
          let errorMessage = "Failed to fetch products";
          if (err instanceof Error) {
            errorMessage = err.message;
          }
          set({ error: errorMessage, loading: false });
        }
      },

      setSearchQuery: (query) => {
        set({ searchQuery: query });

        const { products } = get();
        const filtered = products.filter((p) =>
          p.title.toLowerCase().includes(query ? query.toLowerCase() : "")
        );

        set({ filteredProducts: filtered });
      },

      addToCart: (product) => {
        const existing = get().cart.find((item) => item.id === product.id);
        if (existing) return;
        set({ cart: [...get().cart, { ...product, quantity: 1 }] });
      },

      removeFromCart: (id) => {
        set({ cart: get().cart.filter((item) => item.id !== id) });
      },

      updateQuantity: (id, quantity) => {
        const updated = get().cart.map((item) =>
          item.id === id ? { ...item, quantity } : item
        );
        set({ cart: updated });
      },

      getCartTotal: () => {
        return get().cart.reduce(
          (total, item) => total + item.price * (item.quantity ?? 1),
          0
        );
      },

      clearCart: () => set({ cart: [] }),
    }),
    {
      name: "cart-storage",
      partialize: (state) => ({ cart: state.cart }),
    }
  )
);
