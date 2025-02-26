"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqs = [
  {
    question: "How long do Stanley products keep drinks hot/cold?",
    answer:
      "Our products are designed with advanced insulation technology. Most Stanley bottles and tumblers can keep drinks hot for up to 12 hours and cold for up to 24 hours, with some products maintaining ice for up to 4 days.",
  },
  {
    question: "Are Stanley products dishwasher safe?",
    answer:
      "Yes, most Stanley products are dishwasher safe. However, for best results and longevity, we recommend hand washing with warm soapy water. Always refer to the specific product care instructions for detailed cleaning guidelines.",
  },
  {
    question: "What materials are Stanley products made from?",
    answer:
      "Stanley products are made from high-quality 18/8 stainless steel, which is naturally BPA-free and built to last. Our products are designed to be rust-resistant and durable for long-term use.",
  },
  {
    question: "Do you offer a warranty on your products?",
    answer:
      "Yes, we stand behind the quality of our products with a lifetime warranty against manufacturing defects. This demonstrates our commitment to producing durable, long-lasting products that our customers can rely on.",
  },
  {
    question: "How do I clean my Stanley product?",
    answer:
      "For regular cleaning, use warm soapy water and a bottle brush. For deeper cleaning, you can use a mixture of vinegar and baking soda. Always ensure your product is thoroughly rinsed and dried after cleaning.",
  },
  {
    question: "What's your return policy?",
    answer:
      "We offer a 30-day return policy for unused products in their original packaging. If you're not completely satisfied with your purchase, you can return it for a full refund or exchange.",
  },
  {
    question: "Are replacement parts available?",
    answer:
      "Yes, we offer replacement parts for most Stanley products, including lids, caps, and handles. Contact our customer service team with your product details to order specific replacement parts.",
  },
  {
    question: "How do I know if my Stanley product is authentic?",
    answer:
      "Authentic Stanley products feature our distinctive logo, high-quality materials, and come with official packaging. Purchase from authorized retailers or directly from our website to ensure authenticity.",
  },
  {
    question: "What's the difference between various Stanley collections?",
    answer:
      "Each Stanley collection is designed with specific uses in mind. For example, the Classic series is perfect for outdoor adventures, while the IceFlow collection is ideal for everyday use with features like splash-resistant lids.",
  },
  {
    question: "Do you ship internationally?",
    answer:
      "Yes, we ship to many countries worldwide. Shipping costs and delivery times vary by location. Enter your shipping address at checkout to see available shipping options and costs for your region.",
  },
]

export function FAQ() {
  return (
    <section className="py-24 bg-background">
      <div className="container px-4 md:px-6 max-w-4xl mx-auto">
        <div className="w-12 h-1 bg-primary mb-6 mx-auto" />
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl mb-2">Frequently Asked Questions</h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Find answers to common questions about Stanley products and services.
          </p>
        </div>
        <div className="max-w-3xl mx-auto space-y-4">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <div key={index}>
                <AccordionItem value={`item-${index}`} className="border-b border-muted last:border-b-0">
                  <AccordionTrigger className="py-6 text-left hover:text-primary transition-colors">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="pb-6 pt-2 text-muted-foreground">{faq.answer}</AccordionContent>
                </AccordionItem>
              </div>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}

