"use client"

import Image from "next/image"
import Link from "next/link"
import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { useProducts } from "@/lib/products"
import type { ShopifyProduct } from "@/lib/types"
import { Badge } from "@/components/ui/badge"
import { config } from "@/lib/config"

// Helper function to generate a consistent rating based on product ID
function generateConsistentRating(productId: number): { rating: number; reviewCount: number } {
  const seed = (productId % 10000) / 10000
  const rating = 4.1 + seed * 0.8
  const reviewCount = 100 + Math.floor(seed * 400)
  return { rating, reviewCount }
}

interface ProductGalleryItemProps {
  product: ShopifyProduct
  index: number
}

function ProductGalleryItem({ product, index }: ProductGalleryItemProps) {
  const { rating, reviewCount } = generateConsistentRating(product.id)

  // Get the price based on configuration
  const originalPrice = Number(product.variants[0]?.price || 0)
  let finalPrice = originalPrice

  if (config.pricing.fixedPrice.enabled) {
    finalPrice = config.pricing.fixedPrice.amount
  } else if (config.pricing.reduction.enabled) {
    const discountMultiplier = (100 - config.pricing.reduction.percentage) / 100
    finalPrice = originalPrice * discountMultiplier
  }

  const handle =
    product.handle?.toLowerCase().replace(/[^a-z0-9]+/g, "-") || product.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative aspect-square overflow-hidden rounded-xl bg-gray-100"
    >
      <Image
        src={product.images[0]?.src || config.defaultImage}
        alt={product.title}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-110"
      />
      {((config.pricing.fixedPrice.enabled && config.pricing.display.showDiscountBadge) ||
        (config.pricing.reduction.enabled && config.pricing.display.showDiscountBadge)) && (
        <div className="absolute top-2 right-2">
          <Badge className="bg-red-500">
            {config.pricing.fixedPrice.enabled ? "Fixed Price" : `${config.pricing.reduction.percentage}% OFF`}
          </Badge>
        </div>
      )}
      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white p-6">
            <h3 className="font-semibold text-lg mb-2 line-clamp-2">{product.title}</h3>
            <div className="mb-3">
              <span className="text-xl font-bold">${finalPrice.toFixed(2)}</span>
              {((config.pricing.fixedPrice.enabled && config.pricing.display.showOriginalPrice) ||
                (config.pricing.reduction.enabled && config.pricing.display.showOriginalPrice)) && (
                <div className="text-sm mt-1 line-through opacity-75">${originalPrice.toFixed(2)}</div>
              )}
              <div className="text-sm mt-1">
                {rating.toFixed(1)} ★ ({reviewCount} reviews)
              </div>
            </div>
            <Link href={`/products/${handle}`}>
              <Button variant="secondary" size="lg" className="h-12 px-8">
                Shop Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export function GallerySection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])
  const { products, isLoading } = useProducts()

  // Show loading state
  if (isLoading) {
    return (
      <section className="py-16 md:py-24 bg-[#F5F5F5]">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center mb-12 md:mb-16">
            <div className="w-24 h-8 bg-primary/10 rounded-full mx-auto mb-4 animate-pulse" />
            <div className="h-12 bg-gray-200 rounded-lg mb-4 animate-pulse" />
            <div className="h-6 bg-gray-200 rounded-lg w-2/3 mx-auto animate-pulse" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="aspect-square bg-gray-200 rounded-xl animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    )
  }

  // Add this shuffling logic
  const shuffledProducts = [...products].sort(() => Math.random() - 0.5)
  const galleryProducts = shuffledProducts.slice(0, 6)

  return (
    <section ref={containerRef} className="py-16 md:py-24 bg-[#F5F5F5] overflow-hidden">
      <motion.div style={{ y }} className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center mb-12 md:mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full font-medium mb-4"
          >
            {config.gallery.heading.badge}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
          >
            {config.gallery.heading.title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base md:text-lg text-muted-foreground"
          >
            {config.gallery.heading.subtitle}
          </motion.p>
        </div>

        {galleryProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {galleryProducts.map((product, index) => (
              <ProductGalleryItem key={product.id} product={product} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center text-muted-foreground">No products available at the moment.</div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-8 md:mt-12"
        >
          <Button size="lg" className="h-12 px-8 text-lg" asChild>
            <Link href="/products">
              Explore All Collections
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </motion.div>
      </motion.div>
    </section>
  )
}

