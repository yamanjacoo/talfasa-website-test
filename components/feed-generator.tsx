"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Download, Loader2 } from "lucide-react"

export function FeedGenerator() {
  const [domain, setDomain] = useState("")
  const [format, setFormat] = useState<"gmc" | "facebook">("gmc")
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const generateFeed = async () => {
    try {
      setIsGenerating(true)
      setError(null)

      const finalDomain = domain || window.location.origin
      const response = await fetch(`/api/feeds?format=${format}&domain=${encodeURIComponent(finalDomain)}`)

      if (!response.ok) {
        throw new Error("Failed to generate feed")
      }

      // Get the filename from the Content-Disposition header
      const contentDisposition = response.headers.get("Content-Disposition")
      const filename = contentDisposition?.split("filename=")[1]?.replace(/"/g, "") || `products-${format}.xml`

      // Download the file
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = filename
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (err) {
      console.error("Error generating feed:", err)
      setError("Failed to generate feed. Please try again.")
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="domain">Store Domain (optional)</Label>
          <Input
            id="domain"
            placeholder="https://your-store.com"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
          />
          <p className="text-sm text-muted-foreground">
            Leave empty to use the current domain: {typeof window !== "undefined" ? window.location.origin : ""}
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="format">Feed Format</Label>
          <Select value={format} onValueChange={(value: "gmc" | "facebook") => setFormat(value)}>
            <SelectTrigger id="format">
              <SelectValue placeholder="Select format" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="gmc">Google Merchant Center</SelectItem>
              <SelectItem value="facebook">Facebook Catalog</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Button onClick={generateFeed} disabled={isGenerating} className="w-full">
        {isGenerating ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Generating...
          </>
        ) : (
          <>
            <Download className="mr-2 h-4 w-4" />
            Generate & Download Feed
          </>
        )}
      </Button>
    </div>
  )
}

