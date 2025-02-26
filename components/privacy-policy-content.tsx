"use client"

import { motion } from "framer-motion"
import { Shield, Clock, Eye, Lock, AlertTriangle, Globe, RefreshCw, Phone } from "lucide-react"
import { config } from "@/lib/config"

// Icon mapping for dynamic icon rendering
const iconComponents = {
  Shield,
  Clock,
  Eye,
  Lock,
  AlertTriangle,
  Globe,
  RefreshCw,
  Phone,
}

export function PrivacyPolicyContent() {
  const { privacyPolicy } = config

  return (
    <div className="space-y-12">
      {privacyPolicy.sections.map((section, index) => {
        const IconComponent = iconComponents[section.icon as keyof typeof iconComponents]

        return (
          <motion.section
            key={section.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: privacyPolicy.animation.duration,
              delay: index * privacyPolicy.animation.staggerDelay,
            }}
            className="bg-card rounded-lg p-6 shadow-lg"
          >
            <div className="flex items-center mb-4">
              {IconComponent && <IconComponent className="w-8 h-8 text-primary mr-4" />}
              <h2 className="text-2xl font-bold">{section.title}</h2>
            </div>
            <div className="prose prose-sm max-w-none">
              {section.content.split("\n").map((paragraph, i) => (
                <p key={i} className="mb-2">
                  {paragraph}
                </p>
              ))}
            </div>
          </motion.section>
        )
      })}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: privacyPolicy.animation.duration,
          delay: privacyPolicy.sections.length * privacyPolicy.animation.staggerDelay,
        }}
        className="text-center"
      >
        <p className="text-muted-foreground">{privacyPolicy.footer.text}</p>
      </motion.div>
    </div>
  )
}

