"use client"

import { ProductList } from "@/components/product-list"
import { ProductFilters } from "@/components/product-filters"
import { useState, useMemo } from "react"
import { useProducts } from "@/lib/products"
import { ErrorMessage } from "@/components/ui/error-message"
import { motion, AnimatePresence } from "framer-motion"

export default function ProductsPage() {
  const { products, isLoading, isError } = useProducts()
  const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>({})
  const [sortOption, setSortOption] = useState("newest")

  // Handle filter changes
  const handleFilterChange = (filterName: string, value: string) => {
    setActiveFilters((prev) => {
      const currentFilters = prev[filterName] || []
      const newFilters = currentFilters.includes(value)
        ? currentFilters.filter((v) => v !== value)
        : [...currentFilters, value]

      if (newFilters.length === 0) {
        const { [filterName]: _, ...rest } = prev
        return rest
      }

      return {
        ...prev,
        [filterName]: newFilters,
      }
    })
  }

  // Reset all filters
  const handleResetFilters = () => {
    setActiveFilters({})
    setSortOption("newest")
  }

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    let result = [...products]

    // Apply filters
    Object.entries(activeFilters).forEach(([filterName, values]) => {
      if (values.length === 0) return

      result = result.filter((product) => {
        switch (filterName) {
          case "Category":
            return values.includes(product.product_type)
          case "Brand":
            return values.includes(product.vendor)
          case "Price":
            const price = Number(product.variants?.[0]?.price || 0)
            return values.some((range) => {
              if (range === "Under $50") return price < 50
              if (range === "$50 - $100") return price >= 50 && price < 100
              if (range === "$100 - $200") return price >= 100 && price < 200
              if (range === "Over $200") return price >= 200
              return false
            })
          case "Tags":
            return product.tags?.some((tag) => values.includes(tag))
          default:
            return true
        }
      })
    })

    // Apply sorting
    result.sort((a, b) => {
      switch (sortOption) {
        case "price-asc":
          return Number(a.variants?.[0]?.price || 0) - Number(b.variants?.[0]?.price || 0)
        case "price-desc":
          return Number(b.variants?.[0]?.price || 0) - Number(a.variants?.[0]?.price || 0)
        case "name-asc":
          return (a.title || "").localeCompare(b.title || "")
        case "name-desc":
          return (b.title || "").localeCompare(a.title || "")
        case "newest":
        default:
          return new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime()
      }
    })

    return result
  }, [products, activeFilters, sortOption])

  // Show loading skeleton
  if (isLoading) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-muted aspect-square rounded-lg mb-4" />
              <div className="space-y-3">
                <div className="bg-muted h-4 rounded w-3/4" />
                <div className="bg-muted h-4 rounded w-1/2" />
                <div className="bg-muted h-4 rounded w-2/3" />
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  // Show error message
  if (isError) {
    return (
      <main className="container mx-auto py-8 px-4">
        <ErrorMessage
          title="Error Loading Products"
          message="There was a problem loading the products. Please try again later."
        />
      </main>
    )
  }

  return (
    <motion.main
      className="container mx-auto py-8 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="flex justify-between items-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <motion.h1
          className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          Products ({filteredAndSortedProducts.length})
        </motion.h1>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
        <ProductFilters
          products={products}
          activeFilters={activeFilters}
          onFilterChange={handleFilterChange}
          onResetFilters={handleResetFilters}
          sortOption={sortOption}
          onSortChange={setSortOption}
        />
      </motion.div>

      <div className="h-8" />

      <AnimatePresence mode="wait">
        <motion.div
          key={`${sortOption}-${JSON.stringify(activeFilters)}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <ProductList products={filteredAndSortedProducts} />
        </motion.div>
      </AnimatePresence>

      {filteredAndSortedProducts.length === 0 && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-12">
          <h3 className="text-xl font-semibold mb-2">No products match your filters</h3>
          <p className="text-muted-foreground mb-4">Try adjusting your filters or clear them to see all products</p>
          <button onClick={handleResetFilters} className="text-primary hover:underline">
            Clear all filters
          </button>
        </motion.div>
      )}
    </motion.main>
  )
}

