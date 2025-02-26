"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { config } from "@/lib/config"

export function TermsAndConditionsContent() {
  const [expandedSection, setExpandedSection] = useState<string | null>(null)
  const { termsAndConditions } = config

  return (
    <div className="space-y-8">
      <p className="text-muted-foreground mb-8">
        Please read these terms and conditions carefully before using our Services. By using our Services, you agree to
        these terms.
      </p>
      <Accordion type="single" collapsible className="w-full">
        {termsAndConditions.sections.map((section, index) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: termsAndConditions.animation.duration,
              delay: index * termsAndConditions.animation.staggerDelay,
            }}
          >
            <AccordionItem value={section.title}>
              <AccordionTrigger>{section.title}</AccordionTrigger>
              <AccordionContent>
                <div className="prose prose-sm max-w-none mt-2">
                  {section.content.split("\n\n").map((paragraph, i) => (
                    <p key={i} className="mb-4">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </motion.div>
        ))}
      </Accordion>
    </div>
  )
}

