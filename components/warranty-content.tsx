"use client"

import { motion } from "framer-motion"
import { Shield, Clock, PenToolIcon as Tool, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { config } from "@/lib/config"

// Icon mapping for dynamic icon rendering
const iconComponents = {
  Shield,
  Clock,
  Tool,
  CheckCircle,
}

export function WarrantyContent() {
  const { warranty } = config

  return (
    <div className="space-y-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: warranty.animation.duration }}
        className="text-center max-w-2xl mx-auto"
      >
        <p className="text-xl text-muted-foreground mb-6">{warranty.introduction.text}</p>
        <Button asChild size="lg">
          <Link href={warranty.introduction.button.link}>{warranty.introduction.button.text}</Link>
        </Button>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {warranty.features.map((feature, index) => {
          const IconComponent = iconComponents[feature.icon as keyof typeof iconComponents]

          return (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: warranty.animation.duration, delay: index * warranty.animation.staggerDelay }}
              className="bg-card rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow"
            >
              {IconComponent && <IconComponent className="w-12 h-12 text-primary mb-4" />}
              <h2 className="text-2xl font-semibold mb-2">{feature.title}</h2>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          )
        })}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: warranty.animation.duration, delay: 0.4 }}
        className="bg-primary/10 rounded-lg p-8"
      >
        <h2 className="text-3xl font-bold mb-4">{warranty.coverage.title}</h2>
        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
          {warranty.coverage.covered.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
        <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">{warranty.coverage.notCovered.title}</h3>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            {warranty.coverage.notCovered.items.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: warranty.animation.duration, delay: 0.5 }}
        className="bg-card rounded-lg p-8"
      >
        <h2 className="text-3xl font-bold mb-4">{warranty.claimProcess.title}</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {warranty.claimProcess.steps.map((step) => (
            <div key={step.number} className="space-y-2">
              <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                {step.number}
              </div>
              <h3 className="font-semibold">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: warranty.animation.duration, delay: 0.6 }}
        id="register"
        className="text-center"
      >
        <h2 className="text-3xl font-bold mb-4">{warranty.registration.title}</h2>
        <p className="text-muted-foreground mb-6">{warranty.registration.text}</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {warranty.registration.buttons.map((button, index) => (
            <Button key={index} asChild size="lg" variant={button.variant as any}>
              <Link href={button.link}>{button.text}</Link>
            </Button>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

