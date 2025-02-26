import { X, SlidersHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import type { GenericProduct } from "@/lib/products"

interface FilterValue {
  value: string
  count: number
}

interface FilterOption {
  name: string
  values: FilterValue[]
}

interface ProductFiltersProps {
  products: GenericProduct[]
  activeFilters: Record<string, string[]>
  onFilterChange: (filter: string, value: string) => void
  onResetFilters: () => void
  sortOption: string
  onSortChange: (option: string) => void
}

export function ProductFilters({
  products,
  activeFilters,
  onFilterChange,
  onResetFilters,
  sortOption,
  onSortChange,
}: ProductFiltersProps) {
  // Generate filters dynamically from product data
  const generateFilters = (products: GenericProduct[]): FilterOption[] => {
    const filters: Record<string, Set<string>> = {}
    const filterCounts: Record<string, Record<string, number>> = {}

    // Collect all possible filter values and their counts
    products.forEach((product) => {
      // Add product type filter
      if (product.product_type) {
        if (!filters["Category"]) {
          filters["Category"] = new Set()
          filterCounts["Category"] = {}
        }
        filters["Category"].add(product.product_type)
        filterCounts["Category"][product.product_type] = (filterCounts["Category"][product.product_type] || 0) + 1
      }

      // Add vendor filter
      if (product.vendor) {
        if (!filters["Brand"]) {
          filters["Brand"] = new Set()
          filterCounts["Brand"] = {}
        }
        filters["Brand"].add(product.vendor)
        filterCounts["Brand"][product.vendor] = (filterCounts["Brand"][product.vendor] || 0) + 1
      }

      // Add price range filter
      if (product.variants?.[0]?.price) {
        const price = Number(product.variants[0].price)
        let priceRange = ""
        if (price < 50) priceRange = "Under $50"
        else if (price < 100) priceRange = "$50 - $100"
        else if (price < 200) priceRange = "$100 - $200"
        else priceRange = "Over $200"

        if (!filters["Price"]) {
          filters["Price"] = new Set()
          filterCounts["Price"] = {}
        }
        filters["Price"].add(priceRange)
        filterCounts["Price"][priceRange] = (filterCounts["Price"][priceRange] || 0) + 1
      }

      // Add tags as filters
      if (product.tags?.length) {
        if (!filters["Tags"]) {
          filters["Tags"] = new Set()
          filterCounts["Tags"] = {}
        }
        product.tags.forEach((tag) => {
          filters["Tags"].add(tag)
          filterCounts["Tags"][tag] = (filterCounts["Tags"][tag] || 0) + 1
        })
      }
    })

    // Convert to array format
    return Object.entries(filters).map(([name, values]) => ({
      name,
      values: Array.from(values)
        .map((value) => ({
          value,
          count: filterCounts[name][value],
        }))
        .sort((a, b) => b.count - a.count),
    }))
  }

  const filters = generateFilters(products)

  // Generate sort options based on available data
  const sortOptions = [
    { label: "Newest", value: "newest" },
    { label: "Price: Low to High", value: "price-asc" },
    { label: "Price: High to Low", value: "price-desc" },
    { label: "Name: A to Z", value: "name-asc" },
    { label: "Name: Z to A", value: "name-desc" },
  ]

  // Count total active filters
  const activeFilterCount = Object.values(activeFilters).reduce((count, values) => count + values.length, 0)

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Filter Dropdowns */}
        <div className="flex flex-wrap gap-2 items-center">
          <Button
            variant="outline"
            className="flex items-center gap-2"
            disabled={activeFilterCount === 0}
            onClick={onResetFilters}
          >
            <SlidersHorizontal className="h-4 w-4" />
            Filters
            {activeFilterCount > 0 && (
              <Badge variant="secondary" className="ml-1">
                {activeFilterCount}
              </Badge>
            )}
          </Button>

          {filters.map((filter) => (
            <DropdownMenu key={filter.name}>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="capitalize">
                  {filter.name}
                  {activeFilters[filter.name]?.length > 0 && (
                    <Badge variant="secondary" className="ml-2">
                      {activeFilters[filter.name].length}
                    </Badge>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel className="flex items-center justify-between">
                  {filter.name}
                  {activeFilters[filter.name]?.length > 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-auto p-0 text-muted-foreground hover:text-foreground"
                      onClick={() => {
                        activeFilters[filter.name].forEach((value) => onFilterChange(filter.name, value))
                      }}
                    >
                      Reset
                    </Button>
                  )}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <ScrollArea className="h-[300px]">
                  {filter.values.map(({ value, count }) => (
                    <DropdownMenuCheckboxItem
                      key={value}
                      checked={activeFilters[filter.name]?.includes(value)}
                      onCheckedChange={() => onFilterChange(filter.name, value)}
                    >
                      <span className="flex items-center justify-between w-full">
                        {value}
                        <span className="text-muted-foreground">({count})</span>
                      </span>
                    </DropdownMenuCheckboxItem>
                  ))}
                </ScrollArea>
              </DropdownMenuContent>
            </DropdownMenu>
          ))}

          {activeFilterCount > 0 && (
            <Button variant="ghost" size="sm" onClick={onResetFilters} className="gap-2">
              <X className="h-4 w-4" />
              Clear all
            </Button>
          )}
        </div>

        {/* Sort Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Sort by: {sortOptions.find((opt) => opt.value === sortOption)?.label || "Newest"}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {sortOptions.map((option) => (
              <DropdownMenuCheckboxItem
                key={option.value}
                checked={sortOption === option.value}
                onCheckedChange={() => onSortChange(option.value)}
              >
                {option.label}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Active Filters Display */}
      {activeFilterCount > 0 && (
        <div className="flex flex-wrap gap-2">
          {Object.entries(activeFilters).map(([filterName, values]) =>
            values.map((value) => (
              <Badge key={`${filterName}-${value}`} variant="secondary" className="flex items-center gap-1">
                {filterName}: {value}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onFilterChange(filterName, value)}
                  className="h-auto p-0 px-1 hover:bg-transparent"
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            )),
          )}
        </div>
      )}
    </div>
  )
}

