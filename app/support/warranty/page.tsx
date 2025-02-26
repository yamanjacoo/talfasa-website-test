import { WarrantyContent } from "@/components/warranty-content"
import { config } from "@/lib/config"

export const metadata = {
  title: "Warranty Information | Stanley",
  description: "Learn about Stanley's lifetime guarantee and warranty coverage for all our products.",
}

export default function WarrantyPage() {
  const { warranty } = config

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">{warranty.heading.title}</h1>
          <p className="text-muted-foreground">{warranty.heading.subtitle}</p>
        </div>
        <WarrantyContent />
      </div>
    </div>
  )
}

