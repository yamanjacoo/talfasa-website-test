import { ShippingContent } from "@/components/shipping-content"
import { ShippingCalculator } from "@/components/shipping-calculator"
import { config } from "@/lib/config"

export const metadata = {
  title: "Shipping Information | Stanley",
  description: "Learn about Stanley's shipping policies, delivery times, and returns process.",
}

export default function ShippingPage() {
  const { shipping } = config

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">{shipping.heading.title}</h1>
          <p className="text-muted-foreground">{shipping.heading.subtitle}</p>
        </div>
        <div className="mb-12">
          <ShippingCalculator />
        </div>
        <ShippingContent />
      </div>
    </div>
  )
}

