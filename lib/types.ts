export interface ShopifyProduct {
  id: number
  title: string
  handle: string
  body_html: string
  published_at: string
  created_at: string
  updated_at: string
  vendor: string
  product_type: string
  tags: string[]
  variants: ProductVariant[]
  images: {
    id: number
    position: number
    src: string
    width: number
    height: number
  }[]
  options?: ProductOption[]
}

export interface ProductVariant {
  id: number
  title: string
  price: string
  sku: string
  position: number
  inventory_policy: string
  compare_at_price: string | null
  inventory_quantity: number
  option1: string | null
  option2: string | null
  option3: string | null
}

export interface ProductOption {
  name: string
  position: number
  values: string[]
}

export interface SelectedOptions {
  [key: string]: string
}

export interface GroupedOptions {
  [key: string]: {
    name: string
    value: string
    available: boolean
  }[]
}

export interface GenericProduct {
  id: string
  title: string
  description: string
  price: string
  images: { src: string; id: string }[]
  handle: string
  variants: ProductVariant[]
  product_type?: string
  vendor?: string
  tags?: string[]
  options?: ProductOption[]
  created_at?: string
  body_html?: string
}

