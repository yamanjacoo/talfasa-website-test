"use client"

import { useSearchParams } from "next/navigation"
import { useState, useEffect } from "react"
import { useProducts } from "@/lib/products"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import Image from "next/image"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { config, getDynamicPaymentSettings } from "@/lib/config" // Adjust path as needed
import { PayPalScriptProvider, PayPalButtons, FUNDING } from "@paypal/react-paypal-js"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"

interface SimplePayPalButtonProps {
  amount: string
  receiverEmail: string
  currency: string
}

interface CreateOrderResponse {
  orderID: string
}

function SimplePayPalButton({ amount, receiverEmail, currency }: SimplePayPalButtonProps) {
  console.log("PayPal Button Config:", { clientId: config.paypal.clientId, receiverEmail, currency }); // Debug PayPal props
  return (
    <PayPalScriptProvider
      options={{
        clientId: config.paypal.clientId, // Constant from config.ts
        currency: currency,
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
              receiver_email: receiverEmail,
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
              receiver_email: receiverEmail,
            }),
          })
          const details = await response.json()
          console.log("Capture Response:", details)
          window.location.href = `/order-confirmation?orderId=${Date.now()}`
        }}
      />
    </PayPalScriptProvider>
  )
}

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

  // State for dynamic payment settings with explicit types
  const [paymentSettings, setPaymentSettings] = useState<{
    paypal: { receiverEmail: string; currency: string; showPayPalButton: boolean }
    payNow: { enabled: boolean; link: string }
  }>({
    paypal: {
      receiverEmail: config.paypal.receiverEmail,
      currency: config.paypal.currency,
      showPayPalButton: config.paypal.showPayPalButton,
    },
    payNow: {
      enabled: config.payNow.enabled,
      link: config.payNow.link,
    },
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchPaymentSettings() {
      try {
        const settings = await getDynamicPaymentSettings()
        const updatedSettings = {
          paypal: {
            receiverEmail: settings.paypal?.receiverEmail || config.paypal.receiverEmail,
            currency: settings.paypal?.currency || config.paypal.currency,
            showPayPalButton: settings.paypal?.showPayPalButton ?? config.paypal.showPayPalButton,
          },
          payNow: {
            enabled: settings.payNow?.enabled ?? config.payNow.enabled,
            link: settings.payNow?.link || config.payNow.link,
          },
        }
        console.log("Fetched and Applied Payment Settings:", updatedSettings) // Debug applied settings
        setPaymentSettings(updatedSettings)
      } catch (error) {
        console.error("Fetch Payment Settings Failed:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchPaymentSettings()
  }, [])

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

  const selectedOptions: Record<string, string> = {}
  if (product.options) {
    product.options.forEach((option) => {
      const value = searchParams.get(option.name.toLowerCase())
      if (value) {
        selectedOptions[option.name] = value
      }
    })
  }

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
                        <optgroup label="Common Destinations">
                          <option value="US">United States</option>
                          <option value="GB">United Kingdom</option>
                          <option value="CA">Canada</option>
                          <option value="AU">Australia</option>
                        </optgroup>
                        <optgroup label="All Countries">
                          <option value="AF">Afghanistan</option>
                          <option value="AL">Albania</option>
                          <option value="DZ">Algeria</option>
                          <option value="AD">Andorra</option>
                          <option value="AO">Angola</option>
                          <option value="AG">Antigua and Barbuda</option>
                          <option value="AR">Argentina</option>
                          <option value="AM">Armenia</option>
                          <option value="AT">Austria</option>
                          <option value="AZ">Azerbaijan</option>
                          <option value="BS">Bahamas</option>
                          <option value="BH">Bahrain</option>
                          <option value="BD">Bangladesh</option>
                          <option value="BB">Barbados</option>
                          <option value="BY">Belarus</option>
                          <option value="BE">Belgium</option>
                          <option value="BZ">Belize</option>
                          <option value="BJ">Benin</option>
                          <option value="BT">Bhutan</option>
                          <option value="BO">Bolivia</option>
                          <option value="BA">Bosnia and Herzegovina</option>
                          <option value="BW">Botswana</option>
                          <option value="BR">Brazil</option>
                          <option value="BN">Brunei</option>
                          <option value="BG">Bulgaria</option>
                          <option value="BF">Burkina Faso</option>
                          <option value="BI">Burundi</option>
                          <option value="KH">Cambodia</option>
                          <option value="CM">Cameroon</option>
                          <option value="CV">Cape Verde</option>
                          <option value="CF">Central African Republic</option>
                          <option value="TD">Chad</option>
                          <option value="CL">Chile</option>
                          <option value="CN">China</option>
                          <option value="CO">Colombia</option>
                          <option value="KM">Comoros</option>
                          <option value="CG">Congo</option>
                          <option value="CR">Costa Rica</option>
                          <option value="HR">Croatia</option>
                          <option value="CU">Cuba</option>
                          <option value="CY">Cyprus</option>
                          <option value="CZ">Czech Republic</option>
                          <option value="DK">Denmark</option>
                          <option value="DJ">Djibouti</option>
                          <option value="DM">Dominica</option>
                          <option value="DO">Dominican Republic</option>
                          <option value="EC">Ecuador</option>
                          <option value="EG">Egypt</option>
                          <option value="SV">El Salvador</option>
                          <option value="GQ">Equatorial Guinea</option>
                          <option value="ER">Eritrea</option>
                          <option value="EE">Estonia</option>
                          <option value="ET">Ethiopia</option>
                          <option value="FJ">Fiji</option>
                          <option value="FI">Finland</option>
                          <option value="FR">France</option>
                          <option value="GA">Gabon</option>
                          <option value="GM">Gambia</option>
                          <option value="GE">Georgia</option>
                          <option value="DE">Germany</option>
                          <option value="GH">Ghana</option>
                          <option value="GR">Greece</option>
                          <option value="GD">Grenada</option>
                          <option value="GT">Guatemala</option>
                          <option value="GN">Guinea</option>
                          <option value="GW">Guinea-Bissau</option>
                          <option value="GY">Guyana</option>
                          <option value="HT">Haiti</option>
                          <option value="HN">Honduras</option>
                          <option value="HU">Hungary</option>
                          <option value="IS">Iceland</option>
                          <option value="IN">India</option>
                          <option value="ID">Indonesia</option>
                          <option value="IR">Iran</option>
                          <option value="IQ">Iraq</option>
                          <option value="IE">Ireland</option>
                          <option value="IL">Israel</option>
                          <option value="IT">Italy</option>
                          <option value="JM">Jamaica</option>
                          <option value="JP">Japan</option>
                          <option value="JO">Jordan</option>
                        </optgroup>
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
                    {loading ? (
                      <p>Loading payment options...</p>
                    ) : (
                      <>
                        {paymentSettings.paypal.showPayPalButton ? (
                          <SimplePayPalButton
                            amount={total.toFixed(2)}
                            receiverEmail={paymentSettings.paypal.receiverEmail}
                            currency={paymentSettings.paypal.currency}
                          />
                        ) : (
                          <p>PayPal payment is currently disabled.</p>
                        )}
                        {paymentSettings.payNow.enabled ? (
                          <Link href={paymentSettings.payNow.link} className="w-full block">
                            <Button className="w-full bg-black hover:bg-black/90 text-white" size="lg">
                              Pay Now ${total.toFixed(2)}
                            </Button>
                          </Link>
                        ) : (
                          <p>Pay Now option is currently disabled.</p>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </form>
            </Card>
          </div>

          <div>
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              <div className="space-y-4">
                <div className="flex gap-4 items-start">
                  <div className="relative w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src={product.images[0]?.src || "/placeholder.svg"}
                      alt={product.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-medium">{product.title}</h3>
                    {Object.entries(selectedOptions).map(([name, value]) => (
                      <p key={name} className="text-sm text-muted-foreground">
                        {name}: {value}
                      </p>
                    ))}
                    <p className="text-sm text-muted-foreground">Quantity: {quantity}</p>
                    <p className="text-sm font-medium">${finalPrice.toFixed(2)} each</p>
                    {config.pricing.reduction.enabled && (
                      <p className="text-sm text-red-500">{config.pricing.reduction.percentage}% OFF</p>
                    )}
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <span>Shipping</span>
                      <div className="flex items-center gap-2 mt-2 text-sm">
                        <span>Express Shipping 1-2 days</span>
                        <span className="text-green-600 font-medium">(Free)</span>
                      </div>
                    </div>
                    <span>$0.00</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  {config.pricing.reduction.enabled && (
                    <div className="text-sm text-red-500 text-right">
                      You save: ${(originalPrice * quantity - subtotal).toFixed(2)}
                    </div>
                  )}
                </div>

                <div className="text-sm text-green-600 flex items-center gap-2">
                  <span className="font-medium">✓ Free Express Shipping (1-2 days)</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
