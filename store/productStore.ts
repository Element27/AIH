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
  categories: string[];
  loading: boolean;
  error: string | null;
  searchQuery: string;
  selectedCategory: string;
  fetchProducts: () => Promise<void>;
  filterProducts: (searchQuery?: string, category?: string) => void;

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
      categories: [],
      loading: true,
      error: null,
      searchQuery: "",
      selectedCategory: "",
      cart: [],

      // ✅ Fetch Products
      fetchProducts: async () => {
        set({ loading: true, error: null });
        try {
          const res = await fetch("https://fakestoreapi.com/products");
          const data: Product[] = await res.json();

          const uniqueCategories = Array.from(
            new Set(data.map((item: Product) => item.category))
          );

          set({
            products: data,
            filteredProducts: data,
            loading: false,
            categories: uniqueCategories,
          });
        } catch (err: unknown) {
          let errorMessage = "Failed to fetch products";
          if (err instanceof Error) errorMessage = err.message;
          set({ error: errorMessage, loading: false });
        }
      },

      // ✅ Unified search + category filter
      filterProducts: (searchQuery = "", category = "") => {
        set({
          searchQuery,
          selectedCategory: category,
        });

        const { products } = get();

        const normalizedQuery = searchQuery.toLowerCase().trim();

        const filtered = products.filter((product) => {
          if (category && product.category !== category) {
            return false;
          }

          if (!normalizedQuery) {
            return true;
          }

          return product.title.toLowerCase().includes(normalizedQuery);
        });

        set({
          searchQuery,
          selectedCategory: category,
          filteredProducts: filtered,
        });

        // set({ filteredProducts: filtered });
      },

      // ✅ Add to Cart
      addToCart: (product) => {
        const existing = get().cart.find((item) => item.id === product.id);
        if (existing) {
          // If product already exists, increase quantity
          const updated = get().cart.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
          set({ cart: updated });
        } else {
          set({ cart: [...get().cart, { ...product, quantity: 1 }] });
        }
      },

      // ✅ Remove Cart Item
      removeFromCart: (id) => {
        set({ cart: get().cart.filter((item) => item.id !== id) });
      },

      // ✅ Update Quantity
      updateQuantity: (id, quantity) => {
        const updated = get().cart.map((item) =>
          item.id === id ? { ...item, quantity } : item
        );
        set({ cart: updated });
      },

      // ✅ Get Cart Total
      getCartTotal: () => {
        return get().cart.reduce(
          (total, item) => total + item.price * (item.quantity ?? 1),
          0
        );
      },

      // ✅ Clear Cart
      clearCart: () => set({ cart: [] }),
    }),
    {
      name: "cart-storage",
      partialize: (state) => ({ cart: state.cart }), // ✅ Persist only the cart
    }
  )
);
