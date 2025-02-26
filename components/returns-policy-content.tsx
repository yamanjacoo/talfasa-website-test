"use client"

import { motion } from "framer-motion"
import { RefreshCcw, AlertTriangle, RotateCcw, EuroIcon as EuropeanUnion, CreditCard } from "lucide-react"
import { config } from "@/lib/config"

// Icon mapping for dynamic icon rendering
const iconComponents = {
  RefreshCcw,
  AlertTriangle,
  RotateCcw,
  EuropeanUnion,
  CreditCard,
}

export function ReturnsPolicyContent() {
  const { returnsPolicy } = config

  return (
    <div className="space-y-12 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: returnsPolicy.animation.duration }}
        className="text-center max-w-2xl mx-auto"
      >
        <p className="text-xl text-muted-foreground mb-6">
          At Stanley, we stand behind the quality of our products. Our returns policy is designed to give you confidence
          in your purchase and ensure your complete satisfaction.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 gap-8">
        {returnsPolicy.policyItems.map((item, index) => {
          const IconComponent = iconComponents[item.icon as keyof typeof iconComponents]

          return (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: returnsPolicy.animation.duration,
                delay: index * returnsPolicy.animation.staggerDelay,
              }}
              className="bg-card rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center mb-4">
                {IconComponent && <IconComponent className="w-8 h-8 text-primary mr-4" />}
                <h2 className="text-2xl font-semibold">{item.title}</h2>
              </div>
              <div className="prose prose-sm max-w-none">
                {item.content.split("\n\n").map((paragraph, i) => (
                  <p key={i} className="mb-2">
                    {paragraph}
                  </p>
                ))}
              </div>
            </motion.div>
          )
        })}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: returnsPolicy.animation.duration,
          delay: returnsPolicy.policyItems.length * returnsPolicy.animation.staggerDelay,
        }}
        className="text-center"
      >
        <h2 className="text-2xl font-bold mb-4">{returnsPolicy.needHelp.title}</h2>
        <p className="text-muted-foreground mb-4">{returnsPolicy.needHelp.content}</p>
        <a href={`mailto:${returnsPolicy.needHelp.link.email}`} className="text-primary hover:underline">
          {returnsPolicy.needHelp.link.text}
        </a>
      </motion.div>
    </div>
  )
}

