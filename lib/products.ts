"use client"

import { config } from "./config"
import { useState, useEffect } from "react"
import type {  ShopifyProduct } from "./types"

// Validate configuration at runtime
const validateConfig = () => {
  if (!Array.isArray(config.jsonUrls) || config.jsonUrls.length < 1) {
    throw new Error("Configuration Error: jsonUrls must be a non-empty array")
  }

  config.jsonUrls.forEach((source, index) => {
    if (!source?.url) {
      throw new Error(`Configuration Error: Missing URL for source at index ${index}`)
    }
    if (!source?.type) {
      throw new Error(`Configuration Error: Missing type for source at index ${index}`)
    }
  })
}

// Fetcher function for a single URL
const fetchUrl = async (url: string) => {
  try {
    console.log("Fetching URL:", url)
    const res = await fetch(url)

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`)
    }

    const data = await res.json()
    console.log("Successfully fetched data from:", url)
    return data
  } catch (error) {
    console.error(`Error fetching URL ${url}:`, error)
    throw error
  }
}

// Fetcher function for all URLs
const fetchAllProducts = async () => {
  try {
    // Validate configuration before proceeding
    validateConfig()

    console.log("Starting fetchAllProducts with URLs:", config.jsonUrls)

    // Fetch data from all URLs concurrently
    const responses = await Promise.allSettled(
      config.jsonUrls.map(async (source) => {
        try {
          const data = await fetchUrl(source.url)
          return { data, type: source.type }
        } catch (error) {
          console.error(`Error fetching from ${source.url}:`, error)
          return null
        }
      }),
    )

    // Log responses for debugging
    console.log(
      "All responses received:",
      responses.map((r) => ({
        status: r.status,
        value: r.status === "fulfilled" ? "data" : "error",
      })),
    )

    // Combine and normalize products from all successful responses
    const allProducts = responses.reduce<ShopifyProduct[]>((acc, result) => {
      if (result.status === "fulfilled" && result.value) {
        const { data, type } = result.value
        let products: any[] = []

        // Handle different data structures based on type
        switch (type) {
          case "shopify":
            if (Array.isArray(data)) {
              products = data
            } else if (data.products) {
              products = data.products
            } else {
              console.log("Unexpected data structure:", data)
              products = []
            }
            break
          case "custom":
            products = Array.isArray(data) ? data : Object.values(data)
            break
          default:
            products = Array.isArray(data) ? data : []
        }

        console.log(`Processing ${products.length} products from ${type} source`)

        // Normalize and add products to accumulator
        const normalizedProducts = normalizeProducts(products)
        return [...acc, ...normalizedProducts]
      }
      return acc
    }, [])

    // Remove duplicates based on handle
    const uniqueProducts = allProducts.reduce<ShopifyProduct[]>((acc, product) => {
      const handle = generateHandle(product)
      const exists = acc.some((p) => generateHandle(p) === handle)
      if (!exists) {
        acc.push(product)
      }
      return acc
    }, [])

    console.log(`Returning ${uniqueProducts.length} unique products`)

    // Return empty array if no products were found
    if (uniqueProducts.length === 0) {
      console.warn("No products found from any source")
    }

    return uniqueProducts
  } catch (error) {
    console.error("Error in fetchAllProducts:", error)
    throw error
  }
}

// Custom hook for fetching products with useState and useEffect
export function useProducts() {
  const [products, setProducts] = useState<ShopifyProduct[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState<Error | null>(null)

  useEffect(() => {
    let isMounted = true

    const loadProducts = async () => {
      try {
        setIsLoading(true)
        const data = await fetchAllProducts()

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

    loadProducts()

    // Cleanup function to prevent state updates if component unmounts
    return () => {
      isMounted = false
    }
  }, []) // Empty dependency array means this runs once on mount

  return {
    products,
    isLoading,
    isError,
  }
}

function normalizeProducts(products: any[]): ShopifyProduct[] {
  try {
    return products.map((product) => ({
      id: product.id || generateId(),
      title: product.title || product.name || "Untitled Product",
      description: product.description || product.body_html || "",
      price: getPrice(product),
      images: normalizeImages(product),
      handle: generateHandle(product),
      variants: normalizeVariants(product),
      // Preserve all original fields
      ...product,
    }))
  } catch (error) {
    console.error("Error normalizing products:", error)
    return []
  }
}

function generateId(): string {
  return Math.random().toString(36).substr(2, 9)
}

function getPrice(product: any): string {
  try {
    if (product.price) return String(product.price)
    if (product.variants?.[0]?.price) return String(product.variants[0].price)
    return "0.00"
  } catch (error) {
    console.error("Error getting price:", error)
    return "0.00"
  }
}

function normalizeImages(product: any): { src: string; id: string }[] {
  try {
    // Case 1: Array of image objects with src property
    if (Array.isArray(product.images) && product.images.length > 0) {
      return product.images.map((image: any) => ({
        src: typeof image === "string" ? image : image.src || image.url || image.source || config.defaultImage,
        id:
          typeof image === "string" ? generateId() : image.id?.toString() || image.image_id?.toString() || generateId(),
      }))
    }

    // Case 2: Single image object
    if (product.image) {
      const image = product.image
      return [
        {
          src: typeof image === "string" ? image : image.src || image.url || image.source || config.defaultImage,
          id:
            typeof image === "string"
              ? generateId()
              : image.id?.toString() || image.image_id?.toString() || generateId(),
        },
      ]
    }

    // Case 3: Image URL in different properties
    const possibleImageProps = ["image_url", "imageUrl", "img", "thumbnail", "photo"]
    for (const prop of possibleImageProps) {
      if (product[prop]) {
        return [
          {
            src:
              typeof product[prop] === "string"
                ? product[prop]
                : product[prop].src || product[prop].url || config.defaultImage,
            id: generateId(),
          },
        ]
      }
    }

    // Case 4: Array of image URLs
    if (Array.isArray(product.image_urls) && product.image_urls.length > 0) {
      return product.image_urls.map((url: string) => ({
        src: url || config.defaultImage,
        id: generateId(),
      }))
    }

    // Fallback: Return default image
    return [
      {
        src: config.defaultImage,
        id: generateId(),
      },
    ]
  } catch (error) {
    console.error("Error normalizing images:", error)
    return [{ src: config.defaultImage, id: generateId() }]
  }
}

function generateHandle(product: any): string {
  try {
    const baseText = product.handle || product.slug || product.title || product.name || "product"
    return baseText
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")
  } catch (error) {
    console.error("Error generating handle:", error)
    return `product-${generateId()}`
  }
}

function normalizeVariants(product: any): ShopifyProduct["variants"] {
  try {
    if (Array.isArray(product.variants) && product.variants.length > 0) {
      return product.variants.map((variant:any) => ({
        ...variant,
        // Always set inventory_quantity to 100 to ensure products are in stock
        inventory_quantity: 100,
      }))
    }

    return [
      {   id:1,
        title:"",
        price: getPrice(product),
        compare_at_price: null,
        inventory_quantity: 100, // Default inventory is always 100
        sku: product.sku || null,
      },
    ]
  } catch (error) {
    console.error("Error normalizing variants:", error)
    return [
      {
        price: "0.00",
        compare_at_price: null,
        inventory_quantity: 100, // Default inventory is always 100
        sku: "",
      },
    ]
  }
}

export async function getProducts(): Promise<ShopifyProduct[]> {
  try {
    return await fetchAllProducts()
  } catch (error) {
    console.error("Error in getProducts:", error)
    return []
  }
}

export async function getProduct(handle: string): Promise<ShopifyProduct | undefined> {
  try {
    const products = await getProducts()
    const normalizedHandle = handle.toLowerCase().replace(/[^a-z0-9]+/g, "-")

    return products.find((product) => {
      const productHandle = (product.handle || product.title || "").toLowerCase().replace(/[^a-z0-9]+/g, "-")
      return productHandle === normalizedHandle
    })
  } catch (error) {
    console.error("Error fetching product:", error)
    return undefined
  }
}

