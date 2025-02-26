import { ProductRegistrationForm } from "@/components/product-registration-form"
import { config } from "@/lib/config"

export const metadata = {
  title: "Product Registration | Stanley",
  description: "Register your Stanley product to activate your lifetime warranty and receive important updates.",
}

export default function ProductRegistrationPage() {
  const { productRegistration } = config

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">{productRegistration.heading.title}</h1>
          <p className="text-muted-foreground">{productRegistration.heading.subtitle}</p>
        </div>
        <ProductRegistrationForm />
      </div>
    </div>
  )
}

