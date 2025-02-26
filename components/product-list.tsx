"use client"

import { ProductCard } from "@/components/product-card"
import type { ShopifyProduct } from "@/lib/types"
import { motion, AnimatePresence } from "framer-motion"

interface ProductListProps {
  products: ShopifyProduct[]
}

export function ProductList({ products }: ProductListProps) {
  return (
    <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" layout>
      <AnimatePresence mode="popLayout">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </AnimatePresence>
    </motion.div>
  )
}

