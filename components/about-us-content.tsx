"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Clock, Users, Globe, Award } from "lucide-react"

export function AboutUsContent() {
  return (
    <div className="space-y-20">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center relative py-16"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent -z-10" />
        <h2 className="text-4xl md:text-5xl font-bold mb-6">A Legacy of Innovation Since 1913</h2>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          From inventing the all-steel vacuum bottle to becoming a global leader in thermal technology, Stanley's
          journey spans over 110 years of innovation and unmatched quality.
        </p>
      </motion.section>

      {/* Heritage Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
      >
        <div className="space-y-6">
          <div className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full font-semibold">
            Our Heritage
          </div>
          <h2 className="text-3xl font-bold">Built for Life</h2>
          <p className="text-lg text-muted-foreground">
            Starting with William Stanley Jr. in 1913, our commitment to quality and innovation has made us a trusted
            companion for life's adventures. From job sites to campsites, Stanley products are built to last a lifetime.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-card p-4 rounded-lg">
              <h3 className="font-bold text-xl mb-2">1913</h3>
              <p className="text-muted-foreground">First all-steel vacuum bottle</p>
            </div>
            <div className="bg-card p-4 rounded-lg">
              <h3 className="font-bold text-xl mb-2">110+</h3>
              <p className="text-muted-foreground">Years of innovation</p>
            </div>
          </div>
        </div>
        <div className="relative h-[300px] md:h-[400px]">
          <Image
            src="https://www.stanley1913.com/cdn/shop/files/021125_Product_DT-CAN_62148587-eb84-4008-9ef9-03f74411d3a1.jpg?v=1740426135&width=1320"
            alt="Stanley product showcase"
            fill
            className="object-cover rounded-lg shadow-xl"
          />
        </div>
      </motion.section>

      {/* Values Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="bg-gradient-to-b from-primary/5 to-transparent rounded-2xl p-12"
      >
        <h2 className="text-3xl font-bold mb-12 text-center">Our Core Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
            {
              icon: Clock,
              title: "Heritage",
              description: "110+ years of thermal innovation excellence",
            },
            {
              icon: Users,
              title: "Community",
              description: "Building lasting connections through shared experiences",
            },
            {
              icon: Globe,
              title: "Sustainability",
              description: "Committed to environmental responsibility",
            },
            {
              icon: Award,
              title: "Quality",
              description: "Lifetime warranty on all our products",
            },
          ].map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="text-center p-6 bg-card rounded-xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <value.icon className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
              <p className="text-muted-foreground">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Innovation Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
      >
        <div className="relative h-[300px] md:h-[400px]">
          <Image
            src="https://www.stanley1913.com/cdn/shop/files/stanley-footer.jpg?v=1718313630"
            alt="Stanley innovative products"
            fill
            className="object-cover rounded-lg shadow-xl"
          />
        </div>
        <div className="space-y-6">
          <div className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full font-semibold">Innovation</div>
          <h2 className="text-3xl font-bold">Leading the Way in Thermal Technology</h2>
          <p className="text-lg text-muted-foreground">
            From our classic vacuum bottles to our modern drinkware collections, we continue to innovate and set new
            standards in thermal retention technology. Every Stanley product is designed with purpose, built with
            precision, and tested to exceed expectations.
          </p>
          <Button asChild size="lg">
            <Link href="/products">Explore Our Products</Link>
          </Button>
        </div>
      </motion.section>

      {/* Sustainability Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="text-center bg-secondary/50 rounded-2xl p-12"
      >
        <h2 className="text-3xl font-bold mb-4">Committed to Sustainability</h2>
        <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
          Our reusable products have been helping reduce single-use waste for over a century. We're committed to
          sustainable practices and creating products that last a lifetime, not a lifetime in a landfill.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" variant="default">
            <Link href="/company/contact-us">Contact Us</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/support/warranty">Our Warranty</Link>
          </Button>
        </div>
      </motion.section>
    </div>
  )
}

