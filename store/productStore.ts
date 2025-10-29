// store/useProductStore.ts
import { create } from "zustand";

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

interface ProductStore {
  products: Product[];
  filteredProducts: Product[];
  loading: boolean;
  error: string | null;
  searchQuery: string;
  fetchProducts: () => Promise<void>;
  setSearchQuery: (query: string) => void;
}

export const useProductStore = create<ProductStore>((set, get) => ({
  products: [],
  filteredProducts: [],
  loading: true,
  error: null,
  searchQuery: "",

  fetchProducts: async () => {
    set({ loading: true, error: null });
    try {
      const res = await fetch("https://fakestoreapi.com/products");
      const data = await res.json();
      set({ products: data, filteredProducts: data, loading: false });
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
      p.title.toLowerCase().includes(query.toLowerCase())
    );

    set({ filteredProducts: filtered });
  },
}));
