"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Search, ChevronRight } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { config } from "@/lib/config"

export function HelpCenterContent() {
  const [searchQuery, setSearchQuery] = useState("")
  const { helpCenter } = config

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: helpCenter.animation.duration }}
        className="max-w-2xl mx-auto"
      >
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder={helpCenter.search.placeholder}
            aria-label={helpCenter.search.ariaLabel}
            className="pl-10 pr-4 py-2 w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {helpCenter.topics.map((topic, index) => (
          <motion.div
            key={topic.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: helpCenter.animation.duration, delay: index * helpCenter.animation.staggerDelay }}
          >
            <div className="bg-card rounded-lg p-6 shadow-lg">
              <h2 className="text-2xl font-semibold mb-4 flex items-center">
                <span className="mr-2 text-3xl">{topic.icon}</span>
                {topic.title}
              </h2>
              <Accordion type="single" collapsible>
                {topic.items.map((item, itemIndex) => (
                  <AccordionItem key={itemIndex} value={`${topic.title}-${itemIndex}`}>
                    <AccordionTrigger className="text-primary hover:text-primary/80">
                      <div className="flex items-center">
                        <ChevronRight className="w-4 h-4 mr-2" />
                        {item.title}
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div
                        className="prose prose-sm max-w-none mt-2"
                        dangerouslySetInnerHTML={{ __html: item.content }}
                      />
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: helpCenter.animation.duration, delay: 0.4 }}
        className="text-center"
      >
        <p className="text-muted-foreground mb-4">{helpCenter.footer.text}</p>
        <Button asChild>
          <Link href={helpCenter.footer.button.link}>{helpCenter.footer.button.text}</Link>
        </Button>
      </motion.div>
    </div>
  )
}

