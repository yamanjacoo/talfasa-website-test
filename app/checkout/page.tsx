"use client"

import { useSearchParams } from "next/navigation"
import { useState } from "react"
import { useProducts } from "@/lib/products"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import Image from "next/image"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { config } from "@/lib/config"
import { PayPalScriptProvider, PayPalButtons, FUNDING } from "@paypal/react-paypal-js"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"

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

// Function to calculate the final price based on configuration
function calculateFinalPrice(originalPrice: number): number {
  if (config.pricing.fixedPrice.enabled) {
    return config.pricing.fixedPrice.amount
  } else if (config.pricing.reduction.enabled) {
    const discountMultiplier = (100 - config.pricing.reduction.percentage) / 100
    return originalPrice * discountMultiplier
  }
  return originalPrice
}

export default function CheckoutPage() {
  const searchParams = useSearchParams()
  const productId = searchParams.get("productId")
  const quantity = Number(searchParams.get("quantity")) || 1
  const { products } = useProducts()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const shipping = 0 // Express shipping is always free

  const product = products.find((p) => p.id.toString() === productId)

  if (!product) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Product not found</h1>
          <Link href="/" className="text-primary hover:underline">
            Return to shop
          </Link>
        </div>
      </div>
    )
  }

  // Get selected options from URL parameters
  const selectedOptions: Record<string, string> = {}
  if (product.options) {
    product.options.forEach((option) => {
      const value = searchParams.get(option.name.toLowerCase())
      if (value) {
        selectedOptions[option.name] = value
      }
    })
  }

  // Find the selected variant based on options
  const selectedVariant =
    product.variants.find((variant) => {
      return product.options?.every((option, index) => {
        const optionValue = selectedOptions[option.name]
        const variantValue = variant[`option${index + 1}` as keyof typeof variant]
        return variantValue === optionValue
      })
    }) || product.variants[0]

  const originalPrice = Number(selectedVariant.price)
  const finalPrice = calculateFinalPrice(originalPrice)
  const subtotal = finalPrice * quantity
  const total = subtotal + shipping

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8 px-4">
        <Link
          href={`/products/${product.handle?.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
          className="inline-flex items-center text-sm mb-8 hover:text-primary"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Return to product
        </Link>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Checkout Form */}
          <div className="space-y-6">
            <Card className="p-6">
              <form className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="email" className="after:content-['*'] after:ml-0.5 after:text-red-500">
                        Email
                      </Label>
                      <Input id="email" type="email" required placeholder="Email" />
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="newsletter" />
                      <Label htmlFor="newsletter">Keep me up to date on news and exclusive offers</Label>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>
                  <div className="grid gap-4">
                    <div>
                      <Label htmlFor="country" className="after:content-['*'] after:ml-0.5 after:text-red-500">
                        Country/Region
                      </Label>
                      <select
                        id="country"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        required
                      >
                        <option value="">Select a country...</option>
                        {/* Common/Popular Countries */}
                        <optgroup label="Common Destinations">
                          <option value="US">United States</option>
                          <option value="GB">United Kingdom</option>
                          <option value="CA">Canada</option>
                          <option value="AU">Australia</option>
                        </optgroup>
                        {/* All Countries */}
                        {/* Add country options here */}
                      </select>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName" className="after:content-['*'] after:ml-0.5 after:text-red-500">
                          First Name
                        </Label>
                        <Input id="firstName" type="text" required placeholder="First name" />
                      </div>
                      <div>
                        <Label htmlFor="lastName" className="after:content-['*'] after:ml-0.5 after:text-red-500">
                          Last Name
                        </Label>
                        <Input id="lastName" type="text" required placeholder="Last name" />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="address" className="after:content-['*'] after:ml-0.5 after:text-red-500">
                        Address
                      </Label>
                      <Input id="address" type="text" required placeholder="Address" />
                    </div>

                    <div>
                      <Label htmlFor="apartment">Apartment, suite, etc. (optional)</Label>
                      <Input id="apartment" type="text" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="city" className="after:content-['*'] after:ml-0.5 after:text-red-500">
                          City
                        </Label>
                        <Input id="city" type="text" required placeholder="City" />
                      </div>
                      <div>
                        <Label htmlFor="state" className="after:content-['*'] after:ml-0.5 after:text-red-500">
                          State/Province
                        </Label>
                        <Input id="state" type="text" required placeholder="State" />
                      </div>
                      <div>
                        <Label htmlFor="zip" className="after:content-['*'] after:ml-0.5 after:text-red-500">
                          ZIP Code
                        </Label>
                        <Input id="zip" type="text" required placeholder="ZIP code" />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="phone">Phone</Label>
                      <Input id="phone" type="tel" required />
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h2 className="text-xl font-semibold mb-4">Payment</h2>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="save-info" />
                      <Label htmlFor="save-info">Save this information for next time</Label>
                    </div>

                    {/* Payment method selection */}
                    <div className="border border-[#E5E7EB] rounded-lg p-4">
                      <div className="flex lg:flex-row flex-col lg:items-center items-start justify-between">
                        <div className="flex items-center pb-2 lg:pb-0 space-x-2">
                          <input readonly="" className="h-4 w-4 text-blue-600" type="radio" checked="" />
                          <span className="text-xs">Credit card</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <img alt="Discover" className="h-5" src="/images/payments/pay6.png" />
                          <img alt="Discover" className="h-5" src="/images/payments/pay7.png" />
                          <img alt="Apple Pay" className="h-5" src="/images/payments/pay1.png" />
                          <img alt="Visa" className="h-5" src="/images/payments/pay3.png" />
                          <img alt="Mastercard" className="h-5" src="/images/payments/pay4.png" />
                          <img alt="American Express" className="h-5" src="/images/payments/pay5.png" />
                        </div>
                      </div>
                    </div>

                    {/* Pay Now Button */}
                    {config.payNow.enabled && (
                      <Link href={config.payNow.link} className="w-full block">
                        <Button className="w-full bg-black hover:bg-black/90 text-white" size="lg">
                          Pay Now ${total.toFixed(2)}
                        </Button>
                      </Link>
                    )}
                  </div>
                </div>
              </form>
            </Card>
          </div>

          {/* Order Summary */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Item Price</span>
                <span>${finalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Quantity</span>
                <span>{quantity}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
