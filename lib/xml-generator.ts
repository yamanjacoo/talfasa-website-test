import type { GenericProduct } from "./types"
import { config } from "./config"

interface XMLFeedOptions {
  domain: string
  filename?: string
  format?: "gmc" | "facebook"
}

export async function generateProductsXML(products: GenericProduct[], options: XMLFeedOptions): Promise<string> {
  const { domain, format = "gmc" } = options
  const currentDate = new Date().toISOString()

  // Generate XML based on format
  switch (format) {
    case "gmc":
      return generateGMCXML(products, domain, currentDate)
    case "facebook":
      return generateFacebookXML(products, domain, currentDate)
    default:
      throw new Error(`Unsupported XML format: ${format}`)
  }
}

function generateGMCXML(products: GenericProduct[], domain: string, currentDate: string): string {
  const header = `<?xml version="1.0" encoding="UTF-8"?>
<rss xmlns:g="http://base.google.com/ns/1.0" version="2.0">
  <channel>
    <title>${config.storeName || "Store"}</title>
    <link>${domain}</link>
    <description>Product feed</description>
    <updated>${currentDate}</updated>\n`

  const footer = `  </channel>\n</rss>`

  const items = products
    .map(
      (product) => `    <item>
      <g:id>${product.id}</g:id>
      <g:title>${escapeXML(product.title)}</g:title>
      <g:description>${escapeXML(product.body_html?.replace(/<[^>]*>/g, "") || "")}</g:description>
      <g:link>${domain}/products/${product.handle}</g:link>
      <g:image_link>${product.images[0]?.src || config.defaultImage}</g:image_link>
      <g:availability>in stock</g:availability>
      <g:price>${product.variants[0]?.price} USD</g:price>
      <g:brand>${escapeXML(product.vendor || "")}</g:brand>
      <g:condition>new</g:condition>
      <g:product_type>${escapeXML(product.product_type || "")}</g:product_type>
    </item>`,
    )
    .join("\n")

  return header + items + footer
}

function generateFacebookXML(products: GenericProduct[], domain: string, currentDate: string): string {
  const header = `<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns="http://www.w3.org/2005/Atom" xmlns:g="http://base.google.com/ns/1.0">
  <title>${config.storeName || "Store"}</title>
  <link href="${domain}"/>
  <updated>${currentDate}</updated>\n`

  const footer = `</feed>`

  const items = products
    .map(
      (product) => `  <entry>
    <g:id>${product.id}</g:id>
    <g:title>${escapeXML(product.title)}</g:title>
    <g:description>${escapeXML(product.body_html?.replace(/<[^>]*>/g, "") || "")}</g:description>
    <g:link>${domain}/products/${product.handle}</g:link>
    <g:image_link>${product.images[0]?.src || config.defaultImage}</g:image_link>
    <g:availability>in stock</g:availability>
    <g:price>${product.variants[0]?.price} USD</g:price>
    <g:brand>${escapeXML(product.vendor || "")}</g:brand>
    <g:condition>new</g:condition>
    <g:product_type>${escapeXML(product.product_type || "")}</g:product_type>
  </entry>`,
    )
    .join("\n")

  return header + items + footer
}

function escapeXML(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;")
}

