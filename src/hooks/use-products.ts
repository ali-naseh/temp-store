"use client";

import { useGetProducts } from "@/api/get-products";
import { useProductStore } from "@/store/product-store";
import { useCallback, useEffect } from "react";

export function useProducts() {
  const {
    products,
    filteredProducts,
    categories,
    brands,
    isLoadingProducts,
    errorProducts,
    filters,
    searchQuery,
    setProducts,
    setFilters,
    clearFilters,
    setSearchQuery,
    getProduct,
  } = useProductStore();

  const {
    data: allProducts,
    isLoading: productsLoading,
    error: getProductsError,
  } = useGetProducts();

  const loadProducts = useCallback(async () => {
    useProductStore.getState().setLoadingProducts(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      if (!productsLoading && allProducts) {
        setProducts(allProducts);
      }
    } catch (error) {
      console.log(error);

      useProductStore
        .getState()
        .setErrorProducts(getProductsError?.message || "Something went wrong!");
    } finally {
      useProductStore.getState().setLoadingProducts(false);
    }
  }, [setProducts, allProducts, productsLoading]);

  const searchProducts = useCallback(
    (query: string) => {
      setSearchQuery(query);
    },
    [setSearchQuery]
  );

  const filterProducts = useCallback(
    (newFilters: Parameters<typeof setFilters>[0]) => {
      setFilters(newFilters);
    },
    [setFilters]
  );

  // Load products on mount
  useEffect(() => {
    if (products.length === 0) {
      loadProducts();
    }
  }, [products.length, loadProducts]);

  return {
    products: filteredProducts,
    allProducts: products,
    categories,
    brands,
    isLoading: isLoadingProducts,
    error: errorProducts,
    filters,
    searchQuery,
    loadProducts,
    searchProducts,
    filterProducts,
    clearFilters,
    getProduct,
  };
}
