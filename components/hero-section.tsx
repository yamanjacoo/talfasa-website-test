"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { config } from "@/lib/config"

export function HeroSection() {
  const { content, animation, dimensions } = config.hero

  return (
    <section
      className={`relative min-h-[${dimensions.height.mobile}] md:min-h-[${dimensions.height.desktop}] flex items-center overflow-hidden`}
      style={{ backgroundColor: content.background.color }}
    >
      {/* Background Pattern */}
      {content.background.pattern && <div className="absolute inset-0 bg-grid-black/[0.02] bg-[size:60px_60px]" />}

      <div className="container mx-auto px-4 py-16 md:py-0 z-10">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: animation.duration }}
            className="space-y-4 md:space-y-6"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: animation.duration,
                delay: animation.textStagger,
              }}
              className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-sm md:text-base font-medium"
            >
              {content.badge}
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: animation.duration,
                delay: animation.textStagger * 2,
              }}
              className="text-4xl sm:text-5xl md:text-7xl font-bold leading-tight"
            >
              {content.title.main}
              <br />
              <span className="text-primary">{content.title.highlight}</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: animation.duration,
                delay: animation.textStagger * 3,
              }}
              className="text-lg md:text-xl text-muted-foreground max-w-lg"
            >
              {content.subtitle}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: animation.duration,
                delay: animation.textStagger * 4,
              }}
              className="pt-2"
            >
              <Button size="lg" className="w-full sm:w-auto text-lg h-12" asChild>
                <Link href={content.button.link}>
                  {content.button.text}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>

          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: animation.duration }}
            className="relative order-first lg:order-last"
          >
            <div className="relative h-[300px] sm:h-[400px] lg:h-[600px] w-full">
              <Image
                src={content.image.src || "/placeholder.svg"}
                alt={content.image.alt}
                fill
                className="object-cover rounded-2xl"
                priority={content.image.priority}
              />
              {/* Floating Features */}
              {content.features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: feature.position === "left" ? 20 : -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: animation.duration,
                    delay: animation.textStagger * (index + 5),
                  }}
                  className={`hidden sm:block absolute ${
                    feature.position === "left" ? "-left-4 top-1/4" : "-right-4 top-1/2"
                  } bg-white p-3 md:p-4 rounded-xl shadow-lg max-w-[150px] md:max-w-none`}
                >
                  <p className="font-semibold text-sm md:text-base">{feature.title}</p>
                  <p className="text-xs md:text-sm text-muted-foreground">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

