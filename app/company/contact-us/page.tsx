import { ContactUsContent } from "@/components/contact-us-content"

export const metadata = {
  title: "Contact Us | Stanley",
  description:
    "Get in touch with Stanley's customer service team for product support, warranty claims, or general inquiries.",
}

export default function ContactUsPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-muted-foreground">Have a question or need assistance? We're here to help.</p>
        </div>
        <ContactUsContent />
      </div>
    </div>
  )
}

