"use client"

import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function OrderConfirmationPage() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get("orderId")

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="max-w-md w-full p-6 text-center">
        <div className="flex justify-center mb-4">
          <CheckCircle className="h-16 w-16 text-green-500" />
        </div>
        <h1 className="text-2xl font-bold mb-2">Thank you for your order!</h1>
        <p className="text-muted-foreground mb-6">
          Your order #{orderId} has been confirmed. We'll send you a confirmation email with your order details.
        </p>
        <div className="space-y-4">
          <Link href="/">
            <Button className="w-full">Continue Shopping</Button>
          </Link>
          <p className="text-sm text-muted-foreground">
            Have questions?{" "}
            <Link href="/contact" className="text-primary hover:underline">
              Contact us
            </Link>
          </p>
        </div>
      </Card>
    </div>
  )
}

