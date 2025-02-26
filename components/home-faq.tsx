"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { config } from "@/lib/config"

export function HomeFAQ() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "center center"],
  })

  const y = useTransform(scrollYProgress, [0, 1], ["5%", "0%"])
  const { faq } = config

  // Get the number of items to display based on configuration
  const displayItems = faq.display.showAllOnMobile ? faq.items : faq.items.slice(0, faq.display.maxItems)

  return (
    <section
      ref={containerRef}
      className={`${faq.style.spacing.sectionPadding} overflow-hidden`}
      style={{ backgroundColor: faq.style.background }}
    >
      <motion.div style={{ y }} className="container mx-auto px-4 max-w-5xl">
        <div className="w-full">
          <div className="text-center mb-16">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: faq.animation.duration }}
              className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full font-medium mb-4"
            >
              {faq.heading.badge}
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: faq.animation.duration, delay: faq.animation.staggerDelay }}
              className="text-4xl md:text-5xl font-bold mb-6"
            >
              {faq.heading.title}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: faq.animation.duration, delay: faq.animation.staggerDelay * 2 }}
              className="text-lg text-muted-foreground"
            >
              {faq.heading.subtitle}
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: faq.animation.duration, delay: faq.animation.staggerDelay * 3 }}
            className={faq.style.spacing.itemSpacing}
          >
            <Accordion type="single" collapsible className="w-full">
              {displayItems.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left hover:text-primary transition-colors">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">{item.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}

