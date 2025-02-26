"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { config } from "@/lib/config"

const formSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  productModel: z.string().min(1, "Product model is required"),
  serialNumber: z.string().min(1, "Serial number is required"),
  purchaseDate: z.string().min(1, "Purchase date is required"),
  purchaseLocation: z.string().min(1, "Purchase location is required"),
  additionalInfo: z.string().optional(),
})

export function ProductRegistrationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()
  const { productRegistration } = config

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      productModel: "",
      serialNumber: "",
      purchaseDate: "",
      purchaseLocation: "",
      additionalInfo: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    // Simulate API call
    setTimeout(() => {
      console.log(values)
      setIsSubmitting(false)
      toast({
        title: "Product Registered",
        description: "Your Stanley product has been successfully registered.",
      })
      form.reset()
    }, 2000)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: productRegistration.animation.duration }}
      className="max-w-2xl mx-auto"
    >
      <div className="bg-primary/5 p-6 rounded-lg mb-8">
        <h2 className="font-semibold mb-2">{productRegistration.introBox.title}</h2>
        <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
          {productRegistration.introBox.benefits.map((benefit, index) => (
            <li key={index}>{benefit}</li>
          ))}
        </ul>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{productRegistration.form.personalInfo.firstName.label}</FormLabel>
                  <FormControl>
                    <Input placeholder={productRegistration.form.personalInfo.firstName.placeholder} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{productRegistration.form.personalInfo.lastName.label}</FormLabel>
                  <FormControl>
                    <Input placeholder={productRegistration.form.personalInfo.lastName.placeholder} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{productRegistration.form.personalInfo.email.label}</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder={productRegistration.form.personalInfo.email.placeholder}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="productModel"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{productRegistration.form.productInfo.model.label}</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your Stanley product" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {productRegistration.form.productCategories.map((category) => (
                      <div key={category.category}>
                        <div className="px-2 py-1.5 text-sm font-semibold text-muted-foreground">
                          {category.category}
                        </div>
                        {category.models.map((model) => (
                          <SelectItem key={model.id} value={model.id}>
                            {model.name}
                          </SelectItem>
                        ))}
                      </div>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>{productRegistration.form.productInfo.model.description}</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="serialNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{productRegistration.form.productInfo.serialNumber.label}</FormLabel>
                <FormControl>
                  <Input placeholder={productRegistration.form.productInfo.serialNumber.placeholder} {...field} />
                </FormControl>
                <FormDescription>{productRegistration.form.productInfo.serialNumber.description}</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="purchaseDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{productRegistration.form.productInfo.purchaseDate.label}</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="purchaseLocation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{productRegistration.form.productInfo.purchaseLocation.label}</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select where you purchased" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {productRegistration.form.productInfo.purchaseLocation.options.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="additionalInfo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{productRegistration.form.productInfo.additionalInfo.label}</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder={productRegistration.form.productInfo.additionalInfo.placeholder}
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormDescription>{productRegistration.form.productInfo.additionalInfo.description}</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? productRegistration.form.button.loadingText : productRegistration.form.button.text}
          </Button>
        </form>
      </Form>
    </motion.div>
  )
}

