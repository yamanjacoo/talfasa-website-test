import { TermsAndConditionsContent } from "@/components/terms-and-conditions-content"
import { config } from "@/lib/config"

export const metadata = {
  title: "Terms and Conditions | Stanley",
  description: "Read Stanley's terms and conditions for using our website and services.",
}

export default function TermsAndConditionsPage() {
  const { termsAndConditions } = config

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">{termsAndConditions.heading.title}</h1>
          <p className="text-muted-foreground">{termsAndConditions.heading.subtitle}</p>
        </div>
        <TermsAndConditionsContent />
      </div>
    </div>
  )
}

