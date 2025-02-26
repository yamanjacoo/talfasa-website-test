"use client"

import Image from "next/image"
import Link from "next/link"
import { Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { ShopifyProduct } from "@/lib/types"
import { config } from "@/lib/config"
import { motion } from "framer-motion"

// Function to generate a consistent rating based on product ID
function generateConsistentRating(productId: number): { rating: number; reviewCount: number } {
  // Use the product ID as a seed for consistent randomization
  const seed = (productId % 10000) / 10000 // Convert ID to a decimal between 0 and 1

  // Generate rating between 4.1 and 4.9
  const rating = 4.1 + seed * 0.8

  // Generate consistent review count between 100 and 500
  const reviewCount = 100 + Math.floor(seed * 400)

  return { rating, reviewCount }
}

// Add this function near the top of the file, next to generateConsistentRating
function generateConsistentStock(productId: number): number {
  // Use the product ID as a seed for consistent randomization
  const seed = (productId % 10000) / 10000 // Convert ID to a decimal between 0 and 1

  // Generate stock number between min and max, ensuring it's never 0
  const { min, max } = config.quantity.stockRange
  return Math.max(Math.floor(min + seed * (max - min)), 1)
}

interface ProductCardProps {
  product: ShopifyProduct
}

export function ProductCard({ product }: ProductCardProps) {
  const firstVariant = product.variants[0]

  // Get consistent rating and review count
  const { rating, reviewCount } = generateConsistentRating(product.id)
  const fullStars = Math.floor(rating)
  const decimal = rating % 1

  // Get the price based on configuration
  const originalPrice = Number(firstVariant.price)
  let finalPrice = originalPrice

  if (config.pricing.fixedPrice.enabled) {
    finalPrice = config.pricing.fixedPrice.amount
  } else if (config.pricing.reduction.enabled) {
    const discountMultiplier = (100 - config.pricing.reduction.percentage) / 100
    finalPrice = originalPrice * discountMultiplier
  }

  // Create a URL-friendly handle
  const handle =
    product.handle?.toLowerCase().replace(/[^a-z0-9]+/g, "-") || product.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")

  // In the ProductCard component, add this before the return statement:
  const currentStock = generateConsistentStock(product.id)

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="overflow-hidden flex flex-col group h-full">
        <CardHeader className="p-0">
          <div className="relative aspect-square overflow-hidden bg-gray-100">
            <Image
              src={product.images?.[0]?.src || config.defaultImage}
              alt={product.title || "Product"}
              fill
              className="object-cover transition-all duration-300 group-hover:scale-110"
              onError={(e) => {
                const img = e.target as HTMLImageElement
                img.src = config.defaultImage
              }}
            />
            {((config.pricing.fixedPrice.enabled && config.pricing.display.showDiscountBadge) ||
              (config.pricing.reduction.enabled && config.pricing.display.showDiscountBadge)) && (
              <Badge className="absolute top-2 right-2 bg-red-500 shadow-lg">
                {config.pricing.fixedPrice.enabled ? "Fixed Price" : `${config.pricing.reduction.percentage}% OFF`}
              </Badge>
            )}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Link href={`/products/${handle}`}>
                <Button variant="secondary" size="lg" className="shadow-xl">
                  View Details
                </Button>
              </Link>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-4 flex-grow">
          <Link href={`/products/${handle}`} className="block group">
            <motion.h3 className="font-semibold text-lg text-center mb-2 line-clamp-2 group-hover:text-primary transition-colors duration-200">
              {product.title}
            </motion.h3>
          </Link>
          <div className="flex flex-col items-center gap-1 mb-2">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 transition-all duration-300 ${
                    i < fullStars
                      ? "fill-yellow-400 text-yellow-400"
                      : i === fullStars && decimal >= 0.5
                        ? "fill-yellow-400/50 text-yellow-400"
                        : "fill-muted text-muted-foreground"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm font-medium text-muted-foreground">
              {rating.toFixed(1)} / 5.0 • {reviewCount} reviews
            </span>
          </div>
          <div className="text-center space-y-1">
            <motion.p
              className="font-bold text-xl text-primary"
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              ${finalPrice.toFixed(2)}
            </motion.p>
            {((config.pricing.fixedPrice.enabled && config.pricing.display.showOriginalPrice) ||
              (config.pricing.reduction.enabled && config.pricing.display.showOriginalPrice)) && (
              <p className="text-sm text-muted-foreground line-through">${originalPrice.toFixed(2)}</p>
            )}
            {!config.quantity.forceSingleStock && (
              <p className="text-sm font-medium text-red-500 mt-2">
                <span className="text-red-600">{currentStock}</span> in stock
              </p>
            )}
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <Link href={`/products/${handle}`} className="w-full">
            <Button className="w-full transition-all duration-300 hover:shadow-lg" variant="default">
              View Details
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </motion.div>
  )
}

