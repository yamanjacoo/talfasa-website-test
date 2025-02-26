export interface ProductImage {
  id: string
  src: string
  alt?: string
}

export interface ProductVariant {
  id: string
  title: string
  price: number
  compareAtPrice?: number
  sku: string
  available: boolean
  options: Record<string, string>
}

export interface Product {
  id: string
  handle: string
  title: string
  description: string
  price: number
  compareAtPrice?: number
  images: ProductImage[]
  variants: ProductVariant[]
  options: {
    name: string
    values: string[]
  }[]
  tags: string[]
  rating?: number
  onSale?: boolean
  featured?: boolean
  new?: boolean
  bestSeller?: boolean
}

