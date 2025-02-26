"use client"

import { useState, useEffect } from "react"
import { Truck, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { config } from "@/lib/config"

// Common/Popular Countries
const popularCountries = [
  { code: "US", name: "United States" },
  { code: "GB", name: "United Kingdom" },
  { code: "CA", name: "Canada" },
  { code: "AU", name: "Australia" },
]

// All Countries
const allCountries = [
  { code: "AF", name: "Afghanistan" },
  { code: "AL", name: "Albania" },
  { code: "DZ", name: "Algeria" },
  { code: "AD", name: "Andorra" },
  { code: "AO", name: "Angola" },
  { code: "AG", name: "Antigua and Barbuda" },
  { code: "AR", name: "Argentina" },
  { code: "AM", name: "Armenia" },
  { code: "AT", name: "Austria" },
  { code: "AZ", name: "Azerbaijan" },
  { code: "BS", name: "Bahamas" },
  { code: "BH", name: "Bahrain" },
  { code: "BD", name: "Bangladesh" },
  { code: "BB", name: "Barbados" },
  { code: "BY", name: "Belarus" },
  { code: "BE", name: "Belgium" },
  { code: "BZ", name: "Belize" },
  { code: "BJ", name: "Benin" },
  { code: "BT", name: "Bhutan" },
  { code: "BO", name: "Bolivia" },
  { code: "BA", name: "Bosnia and Herzegovina" },
  { code: "BW", name: "Botswana" },
  { code: "BR", name: "Brazil" },
  { code: "BN", name: "Brunei" },
  { code: "BG", name: "Bulgaria" },
  { code: "BF", name: "Burkina Faso" },
  { code: "BI", name: "Burundi" },
  { code: "KH", name: "Cambodia" },
  { code: "CM", name: "Cameroon" },
  { code: "CV", name: "Cape Verde" },
  { code: "CF", name: "Central African Republic" },
  { code: "TD", name: "Chad" },
  { code: "CL", name: "Chile" },
  { code: "CN", name: "China" },
  { code: "CO", name: "Colombia" },
  { code: "KM", name: "Comoros" },
  { code: "CG", name: "Congo" },
  { code: "CR", name: "Costa Rica" },
  { code: "HR", name: "Croatia" },
  { code: "CU", name: "Cuba" },
  { code: "CY", name: "Cyprus" },
  { code: "CZ", name: "Czech Republic" },
  { code: "DK", name: "Denmark" },
  { code: "DJ", name: "Djibouti" },
  { code: "DM", name: "Dominica" },
  { code: "DO", name: "Dominican Republic" },
  { code: "EC", name: "Ecuador" },
  { code: "EG", name: "Egypt" },
  { code: "SV", name: "El Salvador" },
  { code: "GQ", name: "Equatorial Guinea" },
  { code: "ER", name: "Eritrea" },
  { code: "EE", name: "Estonia" },
  { code: "ET", name: "Ethiopia" },
  { code: "FJ", name: "Fiji" },
  { code: "FI", name: "Finland" },
  { code: "FR", name: "France" },
  { code: "GA", name: "Gabon" },
  { code: "GM", name: "Gambia" },
  { code: "GE", name: "Georgia" },
  { code: "DE", name: "Germany" },
  { code: "GH", name: "Ghana" },
  { code: "GR", name: "Greece" },
  { code: "GD", name: "Grenada" },
  { code: "GT", name: "Guatemala" },
  { code: "GN", name: "Guinea" },
  { code: "GW", name: "Guinea-Bissau" },
  { code: "GY", name: "Guyana" },
  { code: "HT", name: "Haiti" },
  { code: "HN", name: "Honduras" },
  { code: "HU", name: "Hungary" },
  { code: "IS", name: "Iceland" },
  { code: "IN", name: "India" },
  { code: "ID", name: "Indonesia" },
  { code: "IR", name: "Iran" },
  { code: "IQ", name: "Iraq" },
  { code: "IE", name: "Ireland" },
  { code: "IL", name: "Israel" },
  { code: "IT", name: "Italy" },
  { code: "JM", name: "Jamaica" },
  { code: "JP", name: "Japan" },
  { code: "JO", name: "Jordan" },
  // ... Add more countries as needed
]

export function ShippingCalculator() {
  const [zipCode, setZipCode] = useState("")
  const [shippingDate, setShippingDate] = useState("")
  const [deliveryDate, setDeliveryDate] = useState("")
  const [country, setCountry] = useState("US")
  const { shipping } = config

  useEffect(() => {
    if (zipCode.length >= 3 && country) {
      // Simulate API call to get shipping information
      const shippingInfo = getShippingInfo(country, zipCode)
      setShippingDate(shippingInfo.shippingDate)
      setDeliveryDate(shippingInfo.deliveryDate)
    } else {
      setShippingDate("")
      setDeliveryDate("")
    }
  }, [zipCode, country])

  const getShippingInfo = (country: string, zipCode: string) => {
    const today = new Date()
    const shippingDate = new Date(today.setDate(today.getDate() + 1))
    const deliveryDate = new Date(today.setDate(today.getDate() + 1)) // Add 1 more day for delivery

    return {
      shippingDate: shippingDate.toLocaleDateString(),
      deliveryDate: deliveryDate.toLocaleDateString(),
    }
  }

  return (
    <div className="bg-card rounded-lg p-6 shadow-lg">
      <h2 className="text-xl font-semibold mb-4 flex items-center">
        <Truck className="mr-2 h-5 w-5" />
        {shipping.calculator.title}
      </h2>
      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Select onValueChange={setCountry} defaultValue="US">
            <SelectTrigger>
              <SelectValue placeholder="Select country" />
            </SelectTrigger>
            <SelectContent>
              {/* Common Destinations */}
              <div className="px-2 py-1.5 text-sm font-semibold text-muted-foreground">Common Destinations</div>
              {shipping.calculator.countrySelector.popularCountries.map((country) => (
                <SelectItem key={country.code} value={country.code}>
                  {country.name}
                </SelectItem>
              ))}

              {/* All Countries would be here, but we're keeping it simple for the example */}
            </SelectContent>
          </Select>
          <div className="flex gap-2">
            <Input
              type="text"
              placeholder={shipping.calculator.zipInput.placeholder}
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
              maxLength={10} // Increased to accommodate international postal codes
            />
            <Button onClick={() => setZipCode(zipCode)}>{shipping.calculator.zipInput.buttonText}</Button>
          </div>
        </div>
        {shippingDate && deliveryDate && (
          <div className="space-y-3 pt-2">
            <p className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">{shipping.calculator.results.shipsBy}</span>
              <span className="font-medium">{shippingDate}</span>
            </p>
            <p className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">{shipping.calculator.results.estimatedDelivery}</span>
              <span className="font-medium">{deliveryDate}</span>
            </p>
            <div className="flex items-center justify-between pt-2 border-t">
              <span className="text-green-600 font-medium">{shipping.calculator.results.freeShippingText}</span>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{shipping.calculator.results.tooltip}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

