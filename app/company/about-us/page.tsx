import { AboutUsContent } from "@/components/about-us-content"

export const metadata = {
  title: "About Us | Stanley",
  description:
    "Learn about Stanley's 110-year legacy of innovation in thermal technology and our commitment to quality.",
}

export default function AboutUsPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">About Stanley</h1>
          <p className="text-muted-foreground">
            Built for life since 1913. Discover our story of innovation, quality, and commitment to sustainability.
          </p>
        </div>
        <AboutUsContent />
      </div>
    </div>
  )
}

