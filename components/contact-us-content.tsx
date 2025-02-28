"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { MapPin, Phone, Mail, Clock } from "lucide-react"

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
})

export function ContactUsContent() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    // Simulate API call
    setTimeout(() => {
      console.log(values)
      setIsSubmitting(false)
      toast({
        title: "Message Sent",
        description: "We've received your message and will get back to you soon.",
      })
      form.reset()
    }, 2000)
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
        <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="Your email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subject</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a subject" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="product">Product Inquiry</SelectItem>
                      <SelectItem value="warranty">Warranty Claim</SelectItem>
                      <SelectItem value="order">Order Status</SelectItem>
                      <SelectItem value="feedback">Product Feedback</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Your message" className="resize-none" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Sending..." : "Send Message"}
            </Button>
          </form>
        </Form>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
        <div className="space-y-6">
          <div className="flex items-start space-x-4">
            <MapPin className="w-6 h-6 text-primary mt-1" />
            <div>
              <h3 className="font-semibold">Global Headquarters</h3>
              <p className="text-muted-foreground">
                Stanley Black & Decker
                <br />
                1000 Stanley Drive
                <br />
                New Britain, CT 06053
                <br />
                United States
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Phone className="w-6 h-6 text-primary" />
            <div>
              <h3 className="font-semibold">Customer Service</h3>
              <p className="text-muted-foreground">1-800-STANLEY (782-6539)</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Mail className="w-6 h-6 text-primary" />
            <div>
              <h3 className="font-semibold">Email</h3>
              <p className="text-muted-foreground">customerservice@stanley1913.com</p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <Clock className="w-6 h-6 text-primary mt-1" />
            <div>
              <h3 className="font-semibold">Customer Service Hours</h3>
              <ul className="space-y-1 text-muted-foreground">
                <li>Monday - Friday: 8:00 AM - 8:00 PM EST</li>
                <li>Saturday: 9:00 AM - 5:00 PM EST</li>
                <li>Sunday: Closed</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-8 p-6 bg-secondary/50 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Quick Support</h3>
          <ul className="space-y-2">
            <li>
              <a href="/support/help-center" className="text-primary hover:underline">
                Visit our Help Center
              </a>
            </li>
            <li>
              <a href="/support/warranty" className="text-primary hover:underline">
                Warranty Information
              </a>
            </li>
            <li>
              <a href="/support/product-registration" className="text-primary hover:underline">
                Register Your Product hhhhhhhh
              </a>
            </li>
          </ul>
        </div>
      </motion.div>
    </div>
  )
}

