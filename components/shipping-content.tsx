"use client"

import { motion } from "framer-motion"
import { Truck, Clock, Globe, ShieldCheck } from "lucide-react"
import Link from "next/link"
import { config } from "@/lib/config"

// Icon mapping for dynamic icon rendering
const iconComponents = {
  Truck,
  Clock,
  Globe,
  ShieldCheck,
}

export function ShippingContent() {
  const { shipping } = config

  return (
    <div className="space-y-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: shipping.animation.duration }}
        className="text-center max-w-2xl mx-auto"
      >
        <p className="text-xl text-muted-foreground mb-6">
          At Stanley, we're committed to getting your products to you quickly and safely. Enjoy free express shipping on
          all orders over $50 within the contiguous United States.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {shipping.infoSections.map((info, index) => {
          const IconComponent = iconComponents[info.icon as keyof typeof iconComponents]

          return (
            <motion.div
              key={info.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: shipping.animation.duration, delay: index * shipping.animation.staggerDelay }}
              className="bg-card rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow"
            >
              {IconComponent && <IconComponent className="w-12 h-12 text-primary mb-4" />}
              <h2 className="text-2xl font-semibold mb-2">{info.title}</h2>
              <p className="text-muted-foreground">{info.description}</p>
            </motion.div>
          )
        })}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: shipping.animation.duration, delay: 0.4 }}
        className="bg-primary/10 rounded-lg p-8"
      >
        <h2 className="text-3xl font-bold mb-4">{shipping.returns.title}</h2>
        <div className="space-y-4">
          <p className="text-muted-foreground">{shipping.returns.content}</p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            {shipping.returns.conditions.map((condition, index) => (
              <li key={index} dangerouslySetInnerHTML={{ __html: condition }} />
            ))}
          </ul>
          <p className="text-muted-foreground">{shipping.returns.conclusion}</p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: shipping.animation.duration, delay: 0.5 }}
        className="bg-card rounded-lg p-8 shadow-lg"
      >
        <h2 className="text-3xl font-bold mb-4">{shipping.faqs.title}</h2>
        <div className="space-y-6">
          {shipping.faqs.questions.map((faq, index) => (
            <div key={index}>
              <h3 className="font-semibold mb-2">{faq.question}</h3>
              <p className="text-muted-foreground">{faq.answer}</p>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: shipping.animation.duration, delay: 0.6 }}
        className="text-center"
      >
        <h2 className="text-2xl font-bold mb-4">{shipping.help.title}</h2>
        <p className="text-muted-foreground mb-4">{shipping.help.content}</p>
        <Link href={shipping.help.link.url} className="text-primary hover:underline">
          {shipping.help.link.text}
        </Link>
      </motion.div>
    </div>
  )
}

