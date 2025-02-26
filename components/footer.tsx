"use client"

import { Facebook, Instagram, Twitter, Youtube, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { motion } from "framer-motion"
import { usePathname } from "next/navigation"

const categories = [{ name: "All Products", href: "/products" }]

const footerSections = [
  {
    title: "Products",
    links: categories,
  },
  {
    title: "Support",
    links: [
      { name: "Help Center", href: "/support/help-center" },
      { name: "Warranty", href: "/support/warranty" },
      { name: "Product Registration", href: "/support/product-registration" },
      { name: "Shipping", href: "/shipping" },
    ],
  },
  {
    title: "Company",
    links: [
      { name: "About Us", href: "/company/about-us" },
      { name: "Contact Us", href: "/company/contact-us" },
      { name: "Privacy Policy", href: "/privacy-policy" },
      { name: "Returns Policy", href: "/returns-policy" },
      { name: "Terms & Conditions", href: "/terms-and-conditions" },
    ],
  },
]

const socialLinks = [
  { name: "Facebook", icon: Facebook, href: "#" },
  { name: "Twitter", icon: Twitter, href: "#" },
  { name: "Instagram", icon: Instagram, href: "#" },
  { name: "Youtube", icon: Youtube, href: "#" },
]

export function Footer() {
  const pathname = usePathname()

  if (pathname.startsWith("/checkout")) return null

  return (
    <footer className="bg-gradient-to-b from-secondary to-secondary/50 py-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
      <div className="container relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {footerSections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <h3 className="font-bold text-lg mb-4 text-primary">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-muted-foreground hover:text-primary transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="font-bold text-lg mb-4 text-primary">Newsletter</h3>
            <p className="text-muted-foreground mb-4">Subscribe for updates and exclusive offers.</p>
            <form className="flex flex-col sm:flex-row gap-2">
              <Input placeholder="Enter your email" type="email" className="flex-grow" />
              <Button type="submit" className="shrink-0">
                Subscribe
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex flex-col sm:flex-row justify-between items-center pt-8 border-t border-muted"
        >
          <p className="text-muted-foreground text-sm mb-4 sm:mb-0">
            © 2024 Stanley. All rights reserved.{" "}
            <Link href="/privacy-policy" className="hover:text-primary">
              Privacy Policy
            </Link>{" "}
            |{" "}
            <Link href="/terms-and-conditions" className="hover:text-primary">
              Terms & Conditions
            </Link>{" "}
            |{" "}
            <Link href="/shipping" className="hover:text-primary">
              Shipping
            </Link>
          </p>
          <div className="flex space-x-4">
            {socialLinks.map((link, index) => (
              <motion.a
                key={link.name}
                href={link.href}
                className="text-muted-foreground hover:text-primary transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <link.icon className="h-5 w-5" />
                <span className="sr-only">{link.name}</span>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  )
}

