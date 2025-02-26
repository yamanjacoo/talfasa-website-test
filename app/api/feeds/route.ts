import { NextResponse } from "next/server"
import { getProducts } from "@/lib/products"
import { generateProductsXML } from "@/lib/xml-generator"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const format = (searchParams.get("format") || "gmc") as "gmc" | "facebook"
    const domain = searchParams.get("domain") || "https://your-store.com"

    // Get products
    const products = await getProducts()

    // Generate XML
    const xml = await generateProductsXML(products, {
      domain,
      format,
    })

    // Return XML with proper headers
    return new NextResponse(xml, {
      headers: {
        "Content-Type": "application/xml",
        "Content-Disposition": `attachment; filename="products-${format}-${new Date().toISOString().split("T")[0]}.xml"`,
      },
    })
  } catch (error) {
    console.error("Error generating feed:", error)
    return NextResponse.json({ error: "Failed to generate feed" }, { status: 500 })
  }
}

