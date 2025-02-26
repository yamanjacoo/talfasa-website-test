"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Star } from "lucide-react"
import Image from "next/image"
import { config } from "@/lib/config"

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: rating }).map((_, i) => (
        <Star key={i} className="w-5 h-5 fill-primary text-primary" />
      ))}
    </div>
  )
}

export function Testimonials() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"])
  const { testimonials } = config

  return (
    <section ref={containerRef} className="py-24 bg-[#F8F7F4] overflow-hidden">
      <motion.div style={{ y }} className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: testimonials.animation.duration }}
            className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full font-medium mb-4"
          >
            {testimonials.heading.badge}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: testimonials.animation.duration, delay: testimonials.animation.staggerDelay }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            {testimonials.heading.title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: testimonials.animation.duration,
              delay: testimonials.animation.staggerDelay * 2,
            }}
            className="text-lg text-muted-foreground"
          >
            {testimonials.heading.subtitle}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {testimonials.reviews.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: testimonials.animation.duration,
                delay: index * testimonials.animation.staggerDelay,
              }}
              className="bg-background rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden">
                  <Image
                    src={testimonial.image || "/placeholder.svg"}
                    alt={testimonial.author}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-semibold">{testimonial.author}</h3>
                  <p className="text-sm text-muted-foreground">{testimonial.position}</p>
                </div>
              </div>
              <StarRating rating={testimonial.rating} />
              <p className="mt-4 text-muted-foreground">{testimonial.text}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: testimonials.animation.duration,
            delay: testimonials.animation.staggerDelay * 4,
          }}
          className="text-center mt-12"
        >
          {testimonials.stats.trustpilot.enabled ? (
            <div className="space-y-4">
              <div className="flex items-center justify-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5"
                      style={{
                        fill: testimonials.stats.trustpilot.stars.color,
                        color: testimonials.stats.trustpilot.stars.color,
                      }}
                    />
                  ))}
                </div>
                <span className="font-semibold">{testimonials.stats.averageRating}/5</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Image
                  src="https://cdn.trustpilot.net/brand-assets/1.1.0/logo-black.svg"
                  alt="Trustpilot"
                  width={120}
                  height={30}
                  className="dark:hidden"
                  priority
                />
                <Image
                  src="https://cdn.trustpilot.net/brand-assets/1.1.0/logo-white.svg"
                  alt="Trustpilot"
                  width={120}
                  height={30}
                  className="hidden dark:block"
                  priority
                />
                <p className="text-sm text-muted-foreground">
                  Based on {testimonials.stats.totalReviews} verified reviews
                </p>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                ))}
              </div>
              <span className="font-semibold">{testimonials.stats.averageRating}/5</span>
              <p className="text-sm text-muted-foreground">
                Based on {testimonials.stats.totalReviews} verified reviews
              </p>
            </div>
          )}
        </motion.div>
      </motion.div>
    </section>
  )
}

