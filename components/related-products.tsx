"use client"

import { useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ProductCard } from "@/components/product-card"
import type { ShopifyProduct } from "@/lib/types"
import { motion } from "framer-motion"

interface RelatedProductsProps {
  currentProduct: ShopifyProduct
  allProducts: ShopifyProduct[]
}

export function RelatedProducts({ currentProduct, allProducts }: RelatedProductsProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  // Filter out current product and get related products based on same category or vendor
  const relatedProducts = allProducts
    .filter(
      (product) =>
        product.id !== currentProduct.id &&
        (product.product_type === currentProduct.product_type || product.vendor === currentProduct.vendor),
    )
    .slice(0, 8) // Limit to 8 related products

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === "left" ? -400 : 400
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" })
    }
  }

  if (relatedProducts.length === 0) return null

  return (
    <div className="relative">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Related Products</h2>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => scroll("left")}
            className="rounded-full hover:bg-primary hover:text-primary-foreground"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => scroll("right")}
            className="rounded-full hover:bg-primary hover:text-primary-foreground"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Gradient shadows for scroll indication */}
      <div className="absolute left-0 top-[4.5rem] bottom-0 w-8 bg-gradient-to-r from-background to-transparent z-10" />
      <div className="absolute right-0 top-[4.5rem] bottom-0 w-8 bg-gradient-to-l from-background to-transparent z-10" />

      {/* Scrollable container */}
      <div
        ref={scrollContainerRef}
        className="flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {relatedProducts.map((product) => (
          <motion.div
            key={product.id}
            className="min-w-[280px] snap-start"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <ProductCard product={product} />
          </motion.div>
        ))}
      </div>
    </div>
  )
}

