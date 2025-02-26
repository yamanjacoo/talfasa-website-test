// import type { ProductVariant, ShopifyProduct, SelectedOptions, GroupedOptions } from "./types"

// // Extract options from variants if product.options is not available
// export function extractProductOptions(product: ShopifyProduct): GroupedOptions {
//   const options: GroupedOptions = {}

//   // If product has explicit options, use those
//   if (product.options && product.options.length > 0) {
//     product.options.forEach((option) => {
//       options[option.name] = option.values.map((value) => ({
//         name: option.name,
//         value,
//         available: isOptionAvailable(product, option.name, value),
//       }))
//     })
//     return options
//   }

//   // Otherwise, try to extract options from variants
//   product.variants.forEach((variant) => {
//     // Look for option1, option2, option3, etc.
//     for (let i = 1; i <= 3; i++) {
//       const optionKey = `option${i}` as keyof ProductVariant
//       const optionValue = variant[optionKey]
//       if (optionValue) {
//         // Try to find the option name from the variant title
//         const optionName = getOptionNameFromVariant(variant, i)
//         if (!options[optionName]) {
//           options[optionName] = []
//         }
//         if (!options[optionName].some((opt) => opt.value === optionValue)) {
//           options[optionName].push({
//             name: optionName,
//             value: optionValue,
//             available: true, // We'll update availability later
//           })
//         }
//       }
//     }
//   })

//   // Update availability for each option
//   Object.keys(options).forEach((optionName) => {
//     options[optionName] = options[optionName].map((option) => ({
//       ...option,
//       available: isOptionAvailable(product, optionName, option.value),
//     }))
//   })

//   return options
// }

// // Helper function to get option name from variant
// function getOptionNameFromVariant(variant: ProductVariant, optionIndex: number): string {
//   // Try to extract option name from variant title
//   const parts = variant.title.split(" / ")
//   if (parts.length >= optionIndex) {
//     // Try to guess the option name based on common patterns
//     const value = variant[`option${optionIndex}`]
//     if (typeof value === "string") {
//       if (value.match(/^#|rgb|rgba|hsl|hsla/i)) return "Color"
//       if (value.match(/^[XS|S|M|L|XL|XXL|XXXL]/i)) return "Size"
//       if (value.match(/^[0-9]+[A-Z]{1,2}$/i)) return "Size"
//       if (value.match(/^[0-9]+(\.[0-9]+)?(ml|g|kg|oz|lb)/i)) return "Weight"
//     }
//     // Fallback to generic option name
//     return `Option ${optionIndex}`
//   }
//   return `Option ${optionIndex}`
// }

// // Update the isOptionAvailable function to use default stock of 100
// export function isOptionAvailable(
//   product: ShopifyProduct,
//   optionName: string,
//   optionValue: string,
//   currentSelection: SelectedOptions = {},
// ): boolean {
//   // Find the option index
//   const optionIndex = product.options?.findIndex((opt) => opt.name === optionName) ?? -1

//   return product.variants.some((variant) => {
//     // Check if this variant matches the current selection
//     const matchesSelection = Object.entries(currentSelection).every(([name, value]) => {
//       if (name === optionName) return true // Skip the option we're checking
//       const currentOptionIndex = product.options?.findIndex((opt) => opt.name === name) ?? -1
//       if (currentOptionIndex === -1) return true
//       return variant[`option${currentOptionIndex + 1}`] === value
//     })

//     if (!matchesSelection) return false

//     // Check if this variant has the option value we're looking for
//     const hasOptionValue = variant[`option${optionIndex + 1}`] === optionValue

//     // Use default stock of 100 if inventory_quantity is undefined or 0
//     const stockQuantity =
//       variant.inventory_quantity === undefined || variant.inventory_quantity === 0 ? 100 : variant.inventory_quantity

//     return hasOptionValue && stockQuantity > 0
//   })
// }

// // Find the selected variant based on current options
// export function findSelectedVariant(
//   product: ShopifyProduct,
//   selectedOptions: SelectedOptions,
// ): ProductVariant | undefined {
//   return product.variants.find((variant) => {
//     return Object.entries(selectedOptions).every(([name, value]) => {
//       const optionIndex = product.options?.findIndex((opt) => opt.name === name)
//       if (optionIndex === undefined || optionIndex === -1) return false
//       return variant[`option${optionIndex + 1}`] === value
//     })
//   })
// }

// // Get initial options for a product
// export function getInitialOptions(product: ShopifyProduct): SelectedOptions {
//   const options: SelectedOptions = {}
//   const groupedOptions = extractProductOptions(product)

//   Object.entries(groupedOptions).forEach(([optionName, optionValues]) => {
//     // Find the first available option value
//     const firstAvailable = optionValues.find((opt) => opt.available)
//     if (firstAvailable) {
//       options[optionName] = firstAvailable.value
//     }
//   })

//   return options
// }

