"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Minus, Plus, Star, Truck } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import type { ShopifyProduct } from "@/lib/types"
import { config } from "@/lib/config"
import { PayPalScriptProvider, PayPalButtons, FUNDING } from "@paypal/react-paypal-js"

interface SimplePayPalButtonProps {
  amount: string
}

interface CreateOrderResponse {
  orderID: string
}

function SimplePayPalButton({ amount }: SimplePayPalButtonProps) {
  return (
    <PayPalScriptProvider
      options={{
        clientId: config.paypal.clientId,
        currency: config.paypal.currency,
      }}
    >
      <PayPalButtons
        className="z-0 w-full"
        fundingSource={FUNDING.PAYPAL}
        createOrder={async () => {
          const response = await fetch("https://pypal-unclaimed-payments.onrender.com/create_order", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              receiver_email: config.paypal.receiverEmail,
              amount: amount,
            }),
          })
          const data = (await response.json()) as CreateOrderResponse
          console.log("Create Order Response:", data)
          return data.orderID
        }}
        onApprove={async (data) => {
          const response = await fetch("https://pypal-unclaimed-payments.onrender.com/capture_order", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              orderID: data.orderID,
              receiver_email: config.paypal.receiverEmail,
            }),
          })
          const details = await response.json()
          console.log("Capture Response:", details)

          // Redirect to order confirmation after successful payment
          window.location.href = `/order-confirmation?orderId=${Date.now()}`
        }}
      />
    </PayPalScriptProvider>
  )
}

// Function to generate a consistent rating based on product ID (same as in ProductCard)
function generateConsistentRating(productId: number): { rating: number; reviewCount: number } {
  // Use the product ID as a seed for consistent randomization
  const seed = (productId % 10000) / 10000 // Convert ID to a decimal between 0 and 1

  // Generate rating between 4.1 and 4.9
  const rating = 4.1 + seed * 0.8

  // Generate consistent review count between 100 and 500
  const reviewCount = 100 + Math.floor(seed * 400)

  return { rating, reviewCount }
}

// Update the stock generation function to always return a value above 0
function generateConsistentStock(productId: number): number {
  // Use the product ID as a seed for consistent randomization
  const seed = (productId % 10000) / 10000 // Convert ID to a decimal between 0 and 1

  // Generate stock number between min and max, ensuring it's never 0
  const { min, max } = config.quantity.stockRange
  return Math.max(Math.floor(min + seed * (max - min)), 1)
}

function QuantitySelector({ maxQuantity = 99, onQuantityChange, forceSingleStock = false, currentStock }) {
  const [quantity, setQuantity] = useState(1)

  const updateQuantity = (value: number) => {
    const newQuantity = Math.max(1, Math.min(maxQuantity, value))
    setQuantity(newQuantity)
    onQuantityChange(newQuantity)
  }

  if (forceSingleStock) {
    return (
      <div className="space-y-4">
        <Label className="text-base">Quantity</Label>
        <div className="flex items-center gap-4">
          <Input
            type="number"
            value={1}
            disabled
            className="w-20 text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />
          <span className="text-sm font-medium text-red-500">{config.quantity.singleStockMessage}</span>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label className="text-base">Quantity</Label>
        <span className="text-sm font-medium text-red-500">
          <span className="text-red-600">{currentStock}</span> in stock
        </span>
      </div>
      <div className="flex items-center w-32">
        <Button
          variant="outline"
          size="icon"
          className="rounded-r-none"
          onClick={() => updateQuantity(quantity - 1)}
          disabled={quantity <= 1}
        >
          <Minus className="h-4 w-4" />
        </Button>
        <Input
          type="number"
          min="1"
          max={maxQuantity}
          value={quantity}
          onChange={(e) => updateQuantity(Number.parseInt(e.target.value) || 1)}
          className="rounded-none border-x-0 text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        />
        <Button
          variant="outline"
          size="icon"
          className="rounded-l-none"
          onClick={() => updateQuantity(quantity + 1)}
          disabled={quantity >= maxQuantity}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      {quantity >= maxQuantity && <p className="text-sm text-red-500">Maximum quantity reached</p>}
    </div>
  )
}

interface ProductDetailsProps {
  product: ShopifyProduct
}

// Update the ProductDetails component to handle variants properly
export function ProductDetails({ product }: ProductDetailsProps) {
  // Extract all available options from the product
  const options = product.options || []
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>(() => {
    // Initialize with first available value for each option
    const initialOptions: Record<string, string> = {}
    options.forEach((option) => {
      if (option.values && option.values.length > 0) {
        initialOptions[option.name] = option.values[0]
      }
    })
    return initialOptions
  })
  const [selectedQuantity, setSelectedQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)

  // Find the selected variant based on all selected options
  const selectedVariant =
    product.variants.find((variant) => {
      return options.every((option, index) => {
        const optionValue = selectedOptions[option.name]
        const variantValue = variant[`option${index + 1}` as keyof typeof variant]
        return variantValue === optionValue
      })
    }) || product.variants[0]

  // Use default stock of 100 if inventory_quantity is undefined or 0
  const variantStock =
    selectedVariant.inventory_quantity === undefined || selectedVariant.inventory_quantity === 0
      ? 100
      : selectedVariant.inventory_quantity

  // Get consistent stock number (use the smaller of variantStock and generated stock)
  const currentStock = Math.min(generateConsistentStock(product.id), variantStock)

  // Get consistent rating and review count
  const { rating, reviewCount } = generateConsistentRating(product.id)
  const fullStars = Math.floor(rating)
  const decimal = rating % 1

  // Update the price calculation in the product page
  const originalPrice = Number(selectedVariant.price)
  let finalPrice = originalPrice

  if (config.pricing.fixedPrice.enabled) {
    finalPrice = config.pricing.fixedPrice.amount
  } else if (config.pricing.reduction.enabled) {
    const discountMultiplier = (100 - config.pricing.reduction.percentage) / 100
    finalPrice = originalPrice * discountMultiplier
  }

  // Calculate total price based on quantity
  const totalPrice = finalPrice * selectedQuantity
  const totalOriginalPrice = originalPrice * selectedQuantity

  // Determine the maximum quantity based on config and stock
  const maxQuantity = config.quantity.forceSingleStock ? 1 : currentStock

  // Function to check if a variant combination is available
  const isVariantAvailable = (optionName: string, optionValue: string) => {
    const newOptions = { ...selectedOptions, [optionName]: optionValue }
    return product.variants.some((variant) =>
      options.every((option, index) => {
        const value = newOptions[option.name]
        return variant[`option${index + 1}` as keyof typeof variant] === value
      }),
    )
  }

  // Update the JSX to handle all variant options
  return (
    <div className="grid lg:grid-cols-2 gap-x-8 gap-y-10 bg-background rounded-lg p-6 shadow-sm">
      {/* Product Images */}
      <div className="space-y-4">
        <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-100">
          <Image
            src={product.images?.[selectedImage]?.src || config.defaultImage}
            alt={`${product.title || "Product"} - View ${selectedImage + 1}`}
            fill
            className="object-cover"
            priority
            onError={(e) => {
              const img = e.target as HTMLImageElement
              img.src = config.defaultImage
            }}
          />
          {((config.pricing.fixedPrice.enabled && config.pricing.display.showDiscountBadge) ||
            (config.pricing.reduction.enabled && config.pricing.display.showDiscountBadge)) && (
            <Badge className="absolute top-4 right-4 bg-red-500">
              {config.pricing.fixedPrice.enabled ? "Fixed Price" : `${config.pricing.reduction.percentage}% OFF`}
            </Badge>
          )}
        </div>
        {product.images && product.images.length > 1 && (
          <div className="grid grid-cols-4 gap-4">
            {product.images.map((image, index) => (
              <button
                key={image.id || index}
                onClick={() => setSelectedImage(index)}
                className={`relative aspect-square rounded-lg overflow-hidden bg-gray-100 transition-all duration-200 ${
                  selectedImage === index ? "ring-2 ring-primary ring-offset-2" : "hover:opacity-75"
                }`}
              >
                <Image
                  src={image.src || config.defaultImage}
                  alt={`${product.title || "Product"} - Thumbnail ${index + 1}`}
                  fill
                  className="object-cover"
                  onError={(e) => {
                    const img = e.target as HTMLImageElement
                    img.src = config.defaultImage
                  }}
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="flex flex-col">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < fullStars
                      ? "fill-yellow-400 text-yellow-400"
                      : i === fullStars && decimal >= 0.5
                        ? "fill-yellow-400/50 text-yellow-400"
                        : "fill-muted text-muted-foreground"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">
              {rating.toFixed(1)} / 5.0 • {reviewCount} reviews
            </span>
          </div>
          <div className="space-y-1">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold">
                ${totalPrice.toFixed(2)}
                <span className="text-sm text-muted-foreground ml-1">(${finalPrice.toFixed(2)} each)</span>
              </span>
              {((config.pricing.fixedPrice.enabled && config.pricing.display.showOriginalPrice) ||
                (config.pricing.reduction.enabled && config.pricing.display.showOriginalPrice)) && (
                <span className="text-lg text-muted-foreground line-through">${totalOriginalPrice.toFixed(2)}</span>
              )}
            </div>
            {!config.quantity.forceSingleStock &&
              selectedVariant.inventory_quantity &&
              selectedVariant.inventory_quantity < 10 && (
                <p className="text-red-500 text-sm">Only {selectedVariant.inventory_quantity} left in stock!</p>
              )}
          </div>
        </div>

        <Separator className="my-6" />

        <div className="space-y-6">
          {/* Replace the RadioGroup variant options with select dropdowns */}
          {options.map((option) => (
            <div key={option.name} className="space-y-4">
              <Label htmlFor={option.name} className="text-base">
                {option.name}
              </Label>
              <select
                id={option.name}
                value={selectedOptions[option.name] || ""}
                onChange={(e) => {
                  setSelectedOptions((prev) => ({
                    ...prev,
                    [option.name]: e.target.value,
                  }))
                }}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="">Select {option.name}</option>
                {option.values.map((value) => {
                  const isAvailable = isVariantAvailable(option.name, value)
                  return (
                    <option key={value} value={value} disabled={!isAvailable}>
                      {value} {!isAvailable ? " (Out of Stock)" : ""}
                    </option>
                  )
                })}
              </select>
            </div>
          ))}

          <QuantitySelector
            maxQuantity={maxQuantity}
            onQuantityChange={setSelectedQuantity}
            forceSingleStock={config.quantity.forceSingleStock}
            currentStock={currentStock}
          />

          <div className="mt-8 space-y-4">
            <Link
              href={`/checkout?productId=${product.id}&quantity=${selectedQuantity}${Object.entries(selectedOptions)
                .map(([key, value]) => `&${key.toLowerCase()}=${encodeURIComponent(value)}`)
                .join("")}`}
              className="w-full"
            >
              <Button className="w-full h-12 text-lg" size="lg">
                Buy Now
              </Button>
            </Link>
            {config.paypal.showPayPalButton && <SimplePayPalButton amount={totalPrice.toFixed(2)} />}
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Truck className="h-4 w-4" />
            <span>Free shipping on orders over $50</span>
          </div>
        </div>

        <Separator className="my-6" />

        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Product Details</h2>
          {product.body_html && (
            <div
              className="prose prose-sm max-w-none text-muted-foreground"
              dangerouslySetInnerHTML={{ __html: product.body_html }}
            />
          )}

          <div className="grid gap-2 text-sm">
            {product.product_type && (
              <div className="flex justify-between py-2 border-b">
                <span className="font-medium">Type</span>
                <span className="text-muted-foreground">{product.product_type}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

