import { ReturnsPolicyContent } from "@/components/returns-policy-content"
import { config } from "@/lib/config"

export const metadata = {
  title: "Returns Policy | Stanley",
  description: "Learn about Stanley's return policy, process, and guidelines for returning products.",
}

export default function ReturnsPolicyPage() {
  const { returnsPolicy } = config

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">{returnsPolicy.heading.title}</h1>
          <p className="text-muted-foreground">{returnsPolicy.heading.subtitle}</p>
        </div>
        <ReturnsPolicyContent />
      </div>
    </div>
  )
}

