"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { collections, promotionalBanners } from "../data/products"
import type { Product } from "./cart-context"

interface ProductContextType {
  collections: typeof collections
  banners: typeof promotionalBanners
  searchProducts: (query: string) => Product[]
  getProductById: (id: string) => Product | undefined
  getProductsByCategory: (category: string) => Product[]
  getFeaturedProducts: () => Product[]
}

const ProductContext = createContext<ProductContextType | undefined>(undefined)

export function ProductProvider({ children }: { children: ReactNode }) {
  const [allProducts, setAllProducts] = useState<Product[]>([])

  useEffect(() => {
    const products = collections.flatMap((collection) => collection.products)
    setAllProducts(products)
  }, [])

  const searchProducts = (query: string): Product[] => {
    if (!query.trim()) return []

    const lowercaseQuery = query.toLowerCase()
    return allProducts.filter(
      (product) =>
        product.name.toLowerCase().includes(lowercaseQuery) ||
        product.description.toLowerCase().includes(lowercaseQuery) ||
        product.category.toLowerCase().includes(lowercaseQuery),
    )
  }

  const getProductById = (id: string): Product | undefined => {
    return allProducts.find((product) => product.id === id)
  }

  const getProductsByCategory = (category: string): Product[] => {
    return allProducts.filter((product) => product.category === category)
  }

  const getFeaturedProducts = (): Product[] => {
    return allProducts.slice(0, 8)
  }

  return (
    <ProductContext.Provider
      value={{
        collections,
        banners: promotionalBanners,
        searchProducts,
        getProductById,
        getProductsByCategory,
        getFeaturedProducts,
      }}
    >
      {children}
    </ProductContext.Provider>
  )
}

export function useProducts() {
  const context = useContext(ProductContext)
  if (context === undefined) {
    throw new Error("useProducts must be used within a ProductProvider")
  }
  return context
}
