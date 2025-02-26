import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FeedGenerator } from "@/components/feed-generator"

export const metadata = {
  title: "Product Feeds | Store",
  description: "Generate product feeds for Google Merchant Center and Facebook Catalog",
}

export default function FeedsPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Generate Product Feeds</CardTitle>
          <CardDescription>
            Create XML product feeds for Google Merchant Center or Facebook Catalog. The feed will include all your
            products with their current prices and inventory status.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FeedGenerator />
        </CardContent>
      </Card>
    </div>
  )
}

