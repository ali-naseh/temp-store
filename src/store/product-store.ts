import { CATEGORIES } from "@/constants/categories";
import { CartItemType, Product } from "@/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface ProductFilters {
  category?: string;
  priceRange?: [number, number];
  rating?: number;
  sortBy?: "featured" | "price-low" | "price-high" | "rating";
}

interface ProductState {
  // Products
  products: Product[];
  filteredProducts: Product[];
  categories: string[];
  brands: string[];
  isLoadingProducts: boolean;
  errorProducts: string;

  // Cart
  cartItems: CartItemType[];
  cartTotal: number;
  cartSubtotal: number;
  cartItemCount: number;

  // Filters and search
  filters: ProductFilters;
  searchQuery: string;

  // Actions - Products
  setProducts: (products: Product[]) => void;
  addProduct: (product: Product) => void;
  updateProduct: (id: number, updates: Partial<Product>) => void;
  deleteProduct: (id: number) => void;
  getProduct: (id: number) => Product | undefined;
  setLoadingProducts: (loading: boolean) => void;
  setErrorProducts: (error: string) => void;

  // Actions - Cart
  addToCart: (item: Product) => void;
  updateCartItemQuantity: (id: number, quantity: number) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
  getCartItem: (productId: number) => CartItemType | undefined;

  // Actions - Filters and search
  setFilters: (filters: Partial<ProductFilters>) => void;
  clearFilters: () => void;
  setSearchQuery: (query: string) => void;
  applyFilters: () => void;

  // Computed values
  calculateCartTotals: () => void;
}

export const useProductStore = create<ProductState>()(
  persist(
    (set, get) => ({
      // Initial state
      products: [],
      filteredProducts: [],
      categories: [],
      brands: [],
      isLoadingProducts: false,
      errorProducts: "",
      cartItems: [],
      cartTotal: 0,
      cartSubtotal: 0,
      cartItemCount: 0,
      filters: {},
      searchQuery: "",

      // Product actions
      setProducts: (products) => {
        set({
          products,
          filteredProducts: products,
          categories: CATEGORIES,
        });
      },

      addProduct: (product) => {
        set((state) => {
          const newProducts = [...state.products, product];

          return {
            products: newProducts,
            categories: CATEGORIES,
          };
        });
      },

      updateProduct: (id, updates) => {
        set((state) => ({
          products: state.products.map((product) =>
            product.id === id ? { ...product, ...updates } : product
          ),
        }));
        get().applyFilters();
      },

      deleteProduct: (id) => {
        set((state) => ({
          products: state.products.filter((product) => product.id !== id),
        }));
        get().applyFilters();
      },

      getProduct: (id) => {
        return get().products.find((product) => product.id === id);
      },

      setLoadingProducts: (loading) => {
        set({ isLoadingProducts: loading });
      },

      setErrorProducts: (error) => {
        set({ errorProducts: error });
      },

      // Cart actions
      addToCart: (itemData) => {
        const { cartItems } = get();
        const existingItem = cartItems.find(
          (item) => item.productId === itemData.id
        );

        if (existingItem) {
          const newQuantity = existingItem.quantity + 1;
          get().updateCartItemQuantity(existingItem.productId, newQuantity);
        } else {
          const newItem: CartItemType = {
            product: itemData,
            productId: itemData.id,
            quantity: 1,
          };
          set((state) => ({
            cartItems: [...state.cartItems, newItem],
          }));
        }

        get().calculateCartTotals();
      },

      updateCartItemQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeFromCart(id);
          return;
        }

        set((state) => ({
          cartItems: state.cartItems.map((item) =>
            item.productId === id ? { ...item, quantity: quantity } : item
          ),
        }));

        get().calculateCartTotals();
      },

      removeFromCart: (id) => {
        set((state) => ({
          cartItems: state.cartItems.filter((item) => item.productId !== id),
        }));

        get().calculateCartTotals();
      },

      clearCart: () => {
        set({
          cartItems: [],
          cartTotal: 0,
          cartSubtotal: 0,
          cartItemCount: 0,
        });
      },

      getCartItem: (productId) => {
        const { cartItems } = get();
        return cartItems.find((item) => item.productId === productId);
      },

      // Filter and search actions
      setFilters: (newFilters) => {
        set((state) => ({
          filters: { ...state.filters, ...newFilters },
        }));
        get().applyFilters();
      },

      clearFilters: () => {
        set({ filters: {} });
        get().applyFilters();
      },

      setSearchQuery: (query) => {
        set({ searchQuery: query });
        get().applyFilters();
      },

      applyFilters: () => {
        const { products, filters, searchQuery } = get();
        let filtered = [...products];

        // Apply search query
        if (searchQuery.trim()) {
          const query = searchQuery.toLowerCase();
          filtered = filtered.filter(
            (product) =>
              product.title.toLowerCase().includes(query) ||
              product.description.toLowerCase().includes(query) ||
              product.category.toLowerCase().includes(query)
          );
        }

        // Apply category filter
        if (filters.category) {
          filtered = filtered.filter(
            (product) =>
              product.category.toLowerCase() === filters.category?.toLowerCase()
          );
        }

        // Apply price range filter
        if (filters.priceRange) {
          const [min, max] = filters.priceRange;
          filtered = filtered.filter(
            (product) => product.price >= min && product.price <= max
          );
        }

        // Apply rating filter
        if (filters.rating) {
          filtered = filtered.filter(
            (product) => product.rating.rate >= filters.rating!
          );
        }

        // Apply sorting
        if (filters.sortBy) {
          switch (filters.sortBy) {
            case "price-low":
              filtered.sort((a, b) => a.price - b.price);
              break;
            case "price-high":
              filtered.sort((a, b) => b.price - a.price);
              break;
            case "rating":
              filtered.sort((a, b) => b.rating.rate - a.rating.rate);
              break;
            default:
              // Featured - keep original order or implement custom logic
              break;
          }
        }

        set({ filteredProducts: filtered });
      },

      // Calculate cart totals
      calculateCartTotals: () => {
        const { cartItems } = get();
        const subtotal = cartItems.reduce(
          (sum, item) => sum + (item.product?.price || 0) * item.quantity,
          0
        );
        const itemCount = cartItems.reduce(
          (sum, item) => sum + item.quantity,
          0
        );
        const shipping = subtotal > 50 ? 0 : 9.99;
        const tax = subtotal * 0.08;
        const total = subtotal + shipping + tax;

        set({
          cartSubtotal: subtotal,
          cartItemCount: itemCount,
          cartTotal: total,
        });
      },
    }),
    {
      name: "product-store",
      partialize: (state) => ({
        cartItems: state.cartItems,
        cartTotal: state.cartTotal,
        cartSubtotal: state.cartSubtotal,
        cartItemCount: state.cartItemCount,
        filters: state.filters,
        searchQuery: state.searchQuery,
      }),
    }
  )
);
