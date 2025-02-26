import { HelpCenterContent } from "@/components/help-center-content"
import { config } from "@/lib/config"

export const metadata = {
  title: "Help Center | Stanley",
  description: "Get help with your Stanley products, find answers to common questions, and learn about product care.",
}

export default function HelpCenterPage() {
  const { helpCenter } = config

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">{helpCenter.heading.title}</h1>
          <p className="text-muted-foreground">{helpCenter.heading.subtitle}</p>
        </div>
        <HelpCenterContent />
      </div>
    </div>
  )
}

