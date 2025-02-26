import { PrivacyPolicyContent } from "@/components/privacy-policy-content"
import { config } from "@/lib/config"

export const metadata = {
  title: "Privacy Policy | Stanley",
  description: "Learn about how Stanley collects, uses, and protects your personal information.",
}

export default function PrivacyPolicyPage() {
  const { privacyPolicy } = config

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">{privacyPolicy.heading.title}</h1>
          <p className="text-muted-foreground">{privacyPolicy.heading.subtitle}</p>
        </div>
        <PrivacyPolicyContent />
      </div>
    </div>
  )
}

