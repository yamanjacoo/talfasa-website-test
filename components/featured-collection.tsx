"use client"

import Image from "next/image"
import Link from "next/link"
import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { Button } from "@/components/ui/button"
import type { ShopifyProduct } from "@/lib/types"
import { Badge } from "@/components/ui/badge"
import { config } from "@/lib/config"
import { ArrowRight } from "lucide-react"

interface FeaturedCollectionProps {
  products: ShopifyProduct[]
  title: string
  subtitle?: string
  color?: string
}

export function FeaturedCollection({ products, title, subtitle, color = "bg-[#F8F7F4]" }: FeaturedCollectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0])

  // Add this shuffling logic
  const shuffledProducts = [...products].sort(() => Math.random() - 0.5)
  const displayProducts = shuffledProducts.slice(0, 4)

  return (
    <section ref={sectionRef} className={`py-16 md:py-24 ${color} overflow-hidden`}>
      <motion.div style={{ y, opacity }} className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center mb-12 md:mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6"
          >
            {title}
          </motion.h2>
          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base md:text-lg text-muted-foreground"
            >
              {subtitle}
            </motion.p>
          )}
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          {displayProducts.map((product, index) => {
            // Calculate price based on config
            const originalPrice = Number(product.variants[0]?.price || 0)
            let finalPrice = originalPrice

            if (config.pricing.fixedPrice.enabled) {
              finalPrice = config.pricing.fixedPrice.amount
            } else if (config.pricing.reduction.enabled) {
              const discountMultiplier = (100 - config.pricing.reduction.percentage) / 100
              finalPrice = originalPrice * discountMultiplier
            }

            const handle =
              product.handle?.toLowerCase().replace(/[^a-z0-9]+/g, "-") ||
              product.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")

            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Link href={`/products/${handle}`} className="group block">
                  <div className="relative aspect-square mb-4 overflow-hidden rounded-xl bg-gray-100">
                    <Image
                      src={product.images[0]?.src || config.defaultImage}
                      alt={product.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    {((config.pricing.fixedPrice.enabled && config.pricing.display.showDiscountBadge) ||
                      (config.pricing.reduction.enabled && config.pricing.display.showDiscountBadge)) && (
                      <Badge className="absolute top-2 right-2 bg-red-500">
                        {config.pricing.fixedPrice.enabled
                          ? "Fixed Price"
                          : `${config.pricing.reduction.percentage}% OFF`}
                      </Badge>
                    )}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <Button variant="secondary">View Details</Button>
                    </div>
                  </div>
                  <h3 className="font-semibold text-base md:text-lg mb-2 group-hover:text-primary transition-colors line-clamp-2">
                    {product.title}
                  </h3>
                  <div className="space-y-1">
                    <p className="text-primary font-semibold">${finalPrice.toFixed(2)}</p>
                    {((config.pricing.fixedPrice.enabled && config.pricing.display.showOriginalPrice) ||
                      (config.pricing.reduction.enabled && config.pricing.display.showOriginalPrice)) && (
                      <p className="text-sm text-muted-foreground line-through">${originalPrice.toFixed(2)}</p>
                    )}
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-8 md:mt-12"
        >
          <Button size="lg" className="h-12 px-8 text-lg" asChild>
            <Link href="/products">
              Shop All Products
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </motion.div>
      </motion.div>
    </section>
  )
}

