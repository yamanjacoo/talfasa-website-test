"use client"

import { useState, useEffect } from "react"
import type { GenericProduct } from "./types"

// Custom hook for fetching products with useState and useEffect
export function useProducts() {
  const [products, setProducts] = useState<GenericProduct[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState<Error | null>(null)

  useEffect(() => {
    let isMounted = true

    const fetchProducts = async () => {
      try {
        setIsLoading(true)
        const response = await fetch("/api/products")

        if (!response.ok) {
          throw new Error("Failed to fetch products")
        }

        const data = await response.json()

        if (isMounted) {
          setProducts(data)
          setIsError(null)
        }
      } catch (error) {
        console.error("Error fetching products:", error)
        if (isMounted) {
          setIsError(error instanceof Error ? error : new Error(String(error)))
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    fetchProducts()

    return () => {
      isMounted = false
    }
  }, [])

  return {
    products,
    isLoading,
    isError,
  }
}

