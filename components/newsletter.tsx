"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Mail, ArrowRight } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import config from "@/config/site"

export function Newsletter() {
  const [email, setEmail] = useState("")
  const { newsletter } = config

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle newsletter signup
    console.log("Newsletter signup:", email)
    setEmail("")
  }

  return (
    <section className={`relative ${newsletter.style.spacing.sectionPadding} overflow-hidden`}>
      {/* Background Pattern */}
      {newsletter.style.background.pattern && (
        <div className="absolute inset-0 bg-grid-black/[0.02] bg-[size:60px_60px]" />
      )}

      <div className="container mx-auto px-4 relative">
        <div className={`${newsletter.style.spacing.contentMaxWidth} mx-auto text-center`}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: newsletter.animation.duration }}
            className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-8"
          >
            <Mail className="w-8 h-8 text-primary" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: newsletter.animation.duration, delay: newsletter.animation.staggerDelay }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            {newsletter.heading.title}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: newsletter.animation.duration, delay: newsletter.animation.staggerDelay * 2 }}
            className="text-lg text-muted-foreground mb-8"
          >
            {newsletter.heading.subtitle}
          </motion.p>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: newsletter.animation.duration, delay: newsletter.animation.staggerDelay * 3 }}
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
          >
            <Input
              type="email"
              placeholder={newsletter.form.input.placeholder}
              aria-label={newsletter.form.input.ariaLabel}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12"
              required
            />
            <Button type="submit" size="lg" className="h-12 group">
              {newsletter.form.button.text}
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </motion.form>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: newsletter.animation.duration, delay: newsletter.animation.staggerDelay * 4 }}
            className="text-sm text-muted-foreground mt-4"
          >
            {newsletter.legal.text}
            {newsletter.legal.showPrivacyLink && (
              <Link href="/privacy-policy" className="text-primary hover:underline ml-1">
                Privacy Policy
              </Link>
            )}
          </motion.p>
        </div>
      </div>
    </section>
  )
}

