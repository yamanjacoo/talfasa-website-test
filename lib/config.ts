export const config = {
  // API Configuration
  jsonUrls: [
    {
      url: "https://raw.githubusercontent.com/yamanjacoo/test/refs/heads/main/talfasa.json",
      type: "shopify" as const,
    },
  ],
  revalidateTime: 3600,

  // Store Information
  storeName: "talfasa Store",
  storeDescription: "Shop the latest Talfasa adventure gear and drinkware",

  // Header Configuration
  header: {
    logo: {
      src: "https://www.stanley1913.com/cdn/shop/files/logo_00604157-46a8-4af8-ba97-f9711f7732fd.png?v=1702939937&width=500", // Change this to your logo URL
      width: 108, // Height in pixels for desktop
      height: 64, // Width in pixels for desktop
      mobileDimensions: {
        width: 90, // Height in pixels for mobile
        height: 62, // Width in pixels for mobile
      },
      alt: "Stanley Logo",
    },
    contact: {
      phone: "+447508219590", // Change this to your phone number
      displayPhone: "+44 750 821 9590", // How the phone number should be displayed
      showPhoneOnMobile: false, // Whether to show phone number on mobile devices
    },
    social: {
      facebook: "https://facebook.com", // Change to your Facebook URL
      instagram: "https://instagram.com", // Change to your Instagram URL
      showSocialOnMobile: false, // Whether to show social icons on mobile devices
    },
    announcements: [
      "🌎 Free Worldwide Shipping on All Orders!",
      "🚚 Fast & Free International Delivery",
      "✨ Free Shipping to Your Doorstep, Anywhere in the World",
      "🌍 Global Free Shipping, Local Support",
    ],
    announcementDuration: 4000, // Duration in milliseconds for each announcement
  },

  // Product Display Configuration
  defaultImage: "https://raw.githubusercontent.com/shadcn/ui/main/apps/www/public/placeholder.svg",
  fallbackImages: {
    product: "/placeholder.svg",
    thumbnail: "/placeholder-thumb.svg",
    category: "/placeholder-category.svg",
  },
  maxTagsInCard: 3,

  // Pricing Configuration
  pricing: {
    fixedPrice: {
      enabled: true,
      amount: 19,
    },
    reduction: {
      enabled: false,
      percentage: 50,
    },
    display: {
      showOriginalPrice: false,
      showDiscountBadge: false,
    },
  },

  // Quantity Configuration
  quantity: {
    forceSingleStock: true,
    singleStockMessage: "Limited Edition - Only 1 Available",
    stockRange: {
      min: 50,
      max: 100,
    },
  },

  // PayPal Configuration
  paypal: {
    clientId: "Ab-_RGJfzR_nlzigMBpi7ca4fNNjS2nlqTdRUylABhCLkVUTZy7KdOWb9xPEGmNq262xkObg7NQlzLN6",
    receiverEmail: "ronjaa.curtis@outlook.com",
    currency: "USD",
    showPayPalButton: false,
  },
  payNow: {
    enabled: true,
    link: "https://pay.sumup.com/b2c/QWTUMLR1",
  },

  // Hero Section Configuration
  hero: {
    animation: {
      duration: 0.8,
      textStagger: 0.2,
    },
    content: {
      badge: "New Collection",
      title: {
        main: "QUENCHER H2.0",
        highlight: "FlowState™",
      },
      subtitle: "Experience the perfect blend of style and functionality with our latest collection of tumblers.",
      button: {
        text: "Shop Now",
        link: "/products",
      },
      image: {
        src: "https://www.stanley1913.com/cdn/shop/files/021125_Product_DT-CAN_62148587-eb84-4008-9ef9-03f74411d3a1.jpg?v=1740426135&width=1320",
        alt: "Talfasa Stanley Collection",
        priority: true,
      },
      features: [
        {
          title: "40 oz Capacity",
          description: "Perfect for all-day hydration",
          position: "left",
        },
        {
          title: "24-Hour Cold",
          description: "Advanced insulation technology",
          position: "right",
        },
      ],
      background: {
        color: "#F5F5F5",
        pattern: true, // Enable grid pattern
      },
    },
    dimensions: {
      height: {
        mobile: "100dvh",
        desktop: "90vh",
      },
      imageSize: {
        mobile: {
          width: 300,
          height: 400,
        },
        desktop: {
          width: 600,
          height: 600,
        },
      },
    },
  },
  // Testimonials Configuration
  testimonials: {
    heading: {
      badge: "Testimonials",
      title: "What Our Customers Say",
      subtitle: "Join thousands of satisfied customers who trust Talfasa for their adventure gear and drinkware.",
    },
    reviews: [
      {
        text: "Talfasa offers the best adventure gear! My tumbler keeps drinks cold all day, even in the heat.",
        author: "Sarah Mitchell",
        position: "Adventure Enthusiast",
        rating: 5,
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
      },
      {
        text: "Durable and reliable—Talfasa's products never let me down on my outdoor shoots!",
        author: "James Wilson",
        position: "Outdoor Photographer",
        rating: 5,
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
      },
      {
        text: "Love the sleek designs and high quality. My tumbler is both stylish and super functional!",
        author: "Emma Rodriguez",
        position: "Lifestyle Blogger",
        rating: 5,
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb",
      },
      {
        text: "My coffee stays hot for hours—Talfasa's drinkware is a game changer for my mornings!",
        author: "Michael Chang",
        position: "Coffee Connoisseur",
        rating: 5,
        image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d",
      },
    ],
    stats: {
      averageRating: 4.8,
      totalReviews: "10,000+",
      trustpilot: {
        enabled: true,
        logo: {
          light: "/trustpilot-logo-light.svg",
          dark: "/trustpilot-logo-dark.svg",
        },
        stars: {
          color: "#00b67a", // Trustpilot green
        },
      },
    },
    animation: {
      duration: 0.6,
      staggerDelay: 0.1,
    },
  },


  // Gallery Section Configuration
  gallery: {
    heading: {
      badge: "#TalfasaStyle",
      title: "Share Your Talfasa Story",
      subtitle: "Join thousands of adventurers showcasing their Talfasa gear in action.",
    },
    animation: {
      duration: 0.6,
      staggerDelay: 0.1,
    },
  },

  faq: {
    heading: {
      badge: "FAQ",
      title: "Common Questions",
      subtitle: "Find answers to frequently asked questions about Talfasa products.",
    },
    animation: {
      duration: 0.6,
      staggerDelay: 0.1,
    },
    items: [
      {
        question: "How long do Talfasa products keep drinks hot/cold?",
        answer:
          "Our products are designed with advanced insulation technology. Most Talfasa bottles and tumblers can keep drinks hot for up to 12 hours and cold for up to 24 hours, with some products maintaining ice for up to 4 days.",
      },
      {
        question: "Are Talfasa products dishwasher safe?",
        answer:
          "Yes, most Talfasa products are dishwasher safe. However, for best results and longevity, we recommend hand washing with warm soapy water. Always refer to the specific product care instructions for detailed cleaning guidelines.",
      },
      {
        question: "What materials are Talfasa products made from?",
        answer:
          "Talfasa products are made from high-quality 18/8 stainless steel, which is naturally BPA-free and built to last. Our products are designed to be rust-resistant and durable for long-term use.",
      },
      {
        question: "Do you offer a warranty on your products?",
        answer:
          "Yes, we stand behind the quality of our products with a lifetime warranty against manufacturing defects. This demonstrates our commitment to producing durable, long-lasting products that our customers can rely on.",
      },
      {
        question: "What's your return policy?",
        answer:
          "We offer a 30-day return policy for unused products in their original packaging. If you're not completely satisfied with your purchase, you can return it for a full refund or exchange.",
      },
      {
        question: "How do I clean my Talfasa product?",
        answer:
          "For regular cleaning, use warm soapy water and a bottle brush. For deeper cleaning, you can use a mixture of vinegar and baking soda. Always ensure your product is thoroughly rinsed and dried after cleaning.",
      },
      {
        question: "Are replacement parts available?",
        answer:
          "Yes, we offer replacement parts for most Talfasa products, including lids, caps, and handles. Contact our customer service team with your product details to order specific replacement parts.",
      },
      {
        question: "How do I know if my Talfasa product is authentic?",
        answer:
          "Authentic Talfasa products feature our distinctive logo, high-quality materials, and come with official packaging. Purchase from authorized retailers or directly from our website to ensure authenticity.",
      },
      {
        question: "What's the difference between various Talfasa collections?",
        answer:
          "Each Talfasa collection is designed with specific uses in mind. For example, the Classic series is perfect for outdoor adventures, while the IceFlow collection is ideal for everyday use with features like splash-resistant lids.",
      },
      {
        question: "Do you ship internationally?",
        answer:
          "Yes, we ship to many countries worldwide. Shipping costs and delivery times vary by location. Enter your shipping address at checkout to see available shipping options and costs for your region.",
      },
    ],
    display: {
      maxItems: 10, // Maximum number of FAQs to show
      showAllOnMobile: false, // Whether to show all FAQs on mobile or maintain maxItems limit
    },
    style: {
      background: "#F8F7F4", // Background color for the FAQ section
      spacing: {
        sectionPadding: "py-24", // Padding for the entire section
        itemSpacing: "space-y-4", // Spacing between FAQ items
      },
    },
  },

  newsletter: {
    heading: {
      title: "Stay in the Loop",
      subtitle: "Subscribe to get exclusive offers, early access to new products, and stay updated with Stanley.",
    },
    form: {
      input: {
        placeholder: "Enter your email",
        ariaLabel: "Email address",
      },
      button: {
        text: "Subscribe",
        ariaLabel: "Subscribe to newsletter",
      },
    },
    legal: {
      text: "By subscribing, you agree to our Privacy Policy and consent to receive updates from Stanley.",
      showPrivacyLink: true,
    },
    animation: {
      duration: 0.6,
      staggerDelay: 0.1,
    },
    style: {
      background: {
        color: "#FFFFFF",
        pattern: true, // Enable grid pattern
      },
      spacing: {
        sectionPadding: "py-24",
        contentMaxWidth: "max-w-2xl",
      },
    },
  },
  // Help Center Configuration
  helpCenter: {
    heading: {
      title: "Help Center",
      subtitle: "Find answers to common questions and learn how to get the most out of your Talfasa products.",
    },
    search: {
      placeholder: "Search for help...",
      ariaLabel: "Search help articles",
    },
    topics: [
      {
        title: "Getting Started",
        icon: "🚀",
        items: [
          {
            title: "How to use your Talfasa product",
            content: `
            <h3>First Use Instructions</h3>
            <ol>
              <li>Clean your product thoroughly before first use:
                <ul>
                  <li>Wash with warm, soapy water</li>
                  <li>Rinse thoroughly</li>
                  <li>Dry completely</li>
                </ul>
              </li>
              <li>Check all components:
                <ul>
                  <li>Lid seals properly</li>
                  <li>No damage to vacuum seal</li>
                  <li>All parts are secure</li>
                </ul>
              </li>
              <li>Test with room temperature water first</li>
              <li>Learn about temperature retention times</li>
            </ol>
            <p>Watch our product care video: <a href="#" class="text-primary hover:underline">Care Guide Video</a></p>
          `,
          },
          {
            title: "Product care instructions",
            content: `
            <h3>Daily Care Tips</h3>
            <ul>
              <li>Hand wash recommended for best results</li>
              <li>Use mild soap and warm water</li>
              <li>Avoid harsh chemicals or abrasives</li>
              <li>Dry thoroughly after washing</li>
            </ul>
            <h3>Important Notes</h3>
            <ul>
              <li>Do not microwave</li>
              <li>Do not freeze</li>
              <li>Avoid dishwasher when possible</li>
              <li>Store with lid off when not in use</li>
            </ul>
          `,
          },
          {
            title: "Safety guidelines",
            content: `
            <h3>Essential Safety Guidelines</h3>
            <ul>
              <li>Hot Beverage Safety:
                <ul>
                  <li>Allow hot liquids to cool slightly before sealing</li>
                  <li>Keep away from children when containing hot liquids</li>
                  <li>Open lid carefully to release pressure</li>
                </ul>
              </li>
              <li>Do not overfill containers</li>
              <li>Keep out of direct sunlight for extended periods</li>
              <li>Do not use with carbonated beverages</li>
            </ul>
            <p class="mt-4 text-red-500">Important: Read all safety instructions before use</p>
          `,
          },
        ],
      },
      {
        title: "Troubleshooting",
        icon: "🔧",
        items: [
          {
            title: "Common issues and solutions",
            content: `
            <h3>Frequent Issues</h3>
            <div class="space-y-4">
              <div>
                <h4 class="font-semibold">Lid Won't Seal</h4>
                <ul>
                  <li>Check for debris in threads</li>
                  <li>Verify lid is properly aligned</li>
                  <li>Inspect seal for damage</li>
                  <li>Ensure lid is fully tightened</li>
                </ul>
              </div>
              <div>
                <h4 class="font-semibold">Poor Temperature Retention</h4>
                <ul>
                  <li>Verify lid is sealed properly</li>
                  <li>Check for damage to vacuum seal</li>
                  <li>Pre-heat/cool container</li>
                </ul>
              </div>
              <div>
                <h4 class="font-semibold">Leaking Issues</h4>
                <ul>
                  <li>Check lid seal integrity</li>
                  <li>Verify proper assembly</li>
                  <li>Inspect for cracks or damage</li>
                </ul>
              </div>
            </div>
          `,
          },
          {
            title: "When to replace parts",
            content: `
            <h3>Replace Parts When:</h3>
            <div class="space-y-4">
              <div>
                <h4 class="font-semibold">Lid Components</h4>
                <ul>
                  <li>Seal is damaged or compressed</li>
                  <li>Threads are stripped</li>
                  <li>Hinge is loose or broken</li>
                </ul>
              </div>
              <div>
                <h4 class="font-semibold">Main Body</h4>
                <ul>
                  <li>Visible dents affecting performance</li>
                  <li>Vacuum seal is compromised</li>
                  <li>Unusual odors persist</li>
                </ul>
              </div>
            </div>
          `,
          },
          {
            title: "Contact support",
            content: `
            <h3>Contact Support When:</h3>
            <ul>
              <li>Issues persist after troubleshooting</li>
              <li>Product is damaged</li>
              <li>Warranty questions arise</li>
              <li>Replacement parts needed</li>
            </ul>
            <h3>Support Contact Methods</h3>
            <ul>
              <li>Phone: 1-800-TALFASA (Mon-Fri, 9AM-5PM EST)</li>
              <li>Email: support@talfasa.com</li>
              <li>Live Chat: Available on website 24/7</li>
            </ul>
            <p class="mt-4">For warranty claims, please have your proof of purchase ready</p>
          `,
          },
        ],
      },
    ],
    footer: {
      text: "Can't find what you're looking for?",
      button: {
        text: "Contact Support",
        link: "/company/contact-us",
      },
    },
    animation: {
      duration: 0.5,
      staggerDelay: 0.1,
    },
  },

  // Warranty Page Configuration
  warranty: {
    heading: {
      title: "Warranty Information",
      subtitle: "Learn about our lifetime guarantee and how we ensure the quality of every Talfasa product.",
    },
    introduction: {
      text: "At Talfasa, we stand behind the quality of our products. Our lifetime guarantee ensures that you can enjoy your Talfasa products with complete confidence.",
      button: {
        text: "Register Your Product",
        link: "/support/product-registration",
      },
    },
    features: [
      {
        icon: "Shield",
        title: "Lifetime Guarantee",
        description: "Our products are built to last with a lifetime guarantee against manufacturing defects.",
      },
      {
        icon: "Clock",
        title: "Long-Term Protection",
        description: "Enjoy peace of mind with our legendary durability and commitment to quality.",
      },
      {
        icon: "Tool",
        title: "Product Replacement",
        description: "If your product has a manufacturing defect, we'll replace it free of charge.",
      },
      {
        icon: "CheckCircle",
        title: "Simple Claims Process",
        description: "Easy and straightforward warranty claims process with dedicated customer support.",
      },
    ],
    coverage: {
      title: "Warranty Coverage",
      covered: [
        "Lifetime guarantee against manufacturing defects",
        "Coverage for thermal performance issues",
        "Protection against defects in materials and workmanship",
        "Valid for original purchaser with proof of purchase",
        "Covers normal use for personal consumption",
      ],
      notCovered: {
        title: "Not Covered by Warranty",
        items: [
          "Normal wear and tear",
          "Damage from misuse or accidents",
          "Color changes or scratches",
          "Lost or stolen products",
          "Commercial use",
        ],
      },
    },
    claimProcess: {
      title: "How to Make a Claim",
      steps: [
        {
          number: 1,
          title: "Register Your Product",
          description: "Register your Talfasa product to streamline future warranty claims.",
        },
        {
          number: 2,
          title: "Gather Information",
          description: "Have your proof of purchase and product details ready.",
        },
        {
          number: 3,
          title: "Contact Support",
          description: "Our team will guide you through the warranty process.",
        },
      ],
    },
    registration: {
      title: "Register Your Product",
      text: "Register your Talfasa product to activate your warranty and receive important product updates and exclusive offers.",
      buttons: [
        {
          text: "Register Now",
          link: "/support/product-registration",
          variant: "default",
        },
        {
          text: "Visit Help Center",
          link: "/support/help-center",
          variant: "outline",
        },
      ],
    },
    animation: {
      duration: 0.5,
      staggerDelay: 0.1,
    },
  },

  // Product Registration Page Configuration
  productRegistration: {
    heading: {
      title: "Product Registration",
      subtitle:
        "Register your Talfasa product to activate your lifetime warranty and stay updated with important product information.",
    },
    introBox: {
      title: "Why Register Your Talfasa Product?",
      benefits: [
        "Activate your lifetime warranty",
        "Receive important product updates and recalls",
        "Get exclusive access to new product launches",
        "Receive care and maintenance tips",
      ],
    },
    form: {
      personalInfo: {
        firstName: {
          label: "First Name",
          placeholder: "John",
          required: true,
        },
        lastName: {
          label: "Last Name",
          placeholder: "Doe",
          required: true,
        },
        email: {
          label: "Email",
          placeholder: "john.doe@example.com",
          required: true,
        },
      },
      productInfo: {
        model: {
          label: "Product Model",
          description: "Find your model name on the bottom or side of your Talfasa product",
          required: true,
        },
        serialNumber: {
          label: "Serial Number",
          placeholder: "Enter the serial number",
          description: "Located on the bottom of your product, format: XX-XXXXXX",
          required: true,
        },
        purchaseDate: {
          label: "Purchase Date",
          required: true,
        },
        purchaseLocation: {
          label: "Purchase Location",
          required: true,
          options: [
            { value: "talfasa", label: "Talfasa.com" },
            { value: "amazon", label: "Amazon" },
            { value: "target", label: "Target" },
            { value: "rei", label: "REI" },
            { value: "dick", label: "Dick's Sporting Goods" },
            { value: "walmart", label: "Walmart" },
            { value: "other", label: "Other Retailer" },
          ],
        },
        additionalInfo: {
          label: "Additional Information",
          placeholder: "Any additional details about your purchase or product",
          description: "Optional: Provide any extra information you think might be helpful.",
          required: false,
        },
      },
      productCategories: [
        {
          category: "Quencher Collection",
          models: [
            { id: "quencher-30", name: "30 oz Quencher H2.0 FlowState™ Tumbler" },
            { id: "quencher-40", name: "40 oz Quencher H2.0 FlowState™ Tumbler" },
            { id: "quencher-14", name: "14 oz Quencher H2.0 FlowState™ Tumbler" },
          ],
        },
        {
          category: "IceFlow Collection",
          models: [
            { id: "iceflow-20", name: "20 oz IceFlow™ Flip Straw Tumbler" },
            { id: "iceflow-30", name: "30 oz IceFlow™ Flip Straw Tumbler" },
          ],
        },
        {
          category: "Classic Collection",
          models: [
            { id: "classic-bottle-1.1", name: "Classic Legendary Bottle 1.1qt" },
            { id: "classic-bottle-2.0", name: "Classic Legendary Bottle 2.0qt" },
            { id: "classic-mug", name: "Classic Legendary Camp Mug 12oz" },
          ],
        },
      ],
      button: {
        text: "Register Product",
        loadingText: "Registering...",
      },
    },
    animation: {
      duration: 0.5,
      staggerDelay: 0.1,
    },
  },


  // Shipping Page Configuration
  shipping: {
    heading: {
      title: "Shipping Information",
      subtitle: "Fast, free shipping on orders over $50. Learn about our shipping policies and delivery times.",
    },
    calculator: {
      title: "Delivery Estimate",
      countrySelector: {
        label: "Country",
        popularCountries: [
        { code: "US", name: "United States" },
        { code: "GB", name: "United Kingdom" },
        { code: "CA", name: "Canada" },
        { code: "AU", name: "Australia" },
        { code: "IN", name: "India" },
        { code: "FR", name: "France" },
        { code: "DE", name: "Germany" },
        { code: "IT", name: "Italy" },
        { code: "ES", name: "Spain" },
        { code: "MX", name: "Mexico" },
        { code: "BR", name: "Brazil" },
        { code: "JP", name: "Japan" },
        { code: "KR", name: "South Korea" },
        { code: "ZA", name: "South Africa" },
        { code: "SG", name: "Singapore" },
        { code: "NL", name: "Netherlands" },
        { code: "SE", name: "Sweden" },
        { code: "NO", name: "Norway" },
        { code: "DK", name: "Denmark" },
        { code: "FI", name: "Finland" },
        { code: "PL", name: "Poland" },
        { code: "AT", name: "Austria" },
        { code: "CH", name: "Switzerland" },
        { code: "BE", name: "Belgium" },
        { code: "IE", name: "Ireland" },
        { code: "PT", name: "Portugal" },
        { code: "GR", name: "Greece" },
        { code: "CZ", name: "Czech Republic" },
        { code: "HU", name: "Hungary" },
        { code: "RO", name: "Romania" },
        { code: "UA", name: "Ukraine" },
        { code: "PH", name: "Philippines" },
        { code: "TH", name: "Thailand" },
        { code: "ID", name: "Indonesia" },
        { code: "MY", name: "Malaysia" },
        { code: "VN", name: "Vietnam" },
        { code: "EG", name: "Egypt" },
        { code: "KE", name: "Kenya" },
        { code: "NG", name: "Nigeria" },
        { code: "AR", name: "Argentina" },
        { code: "CL", name: "Chile" },
        { code: "CO", name: "Colombia" },
        { code: "PE", name: "Peru" },
        { code: "VE", name: "Venezuela" },
        { code: "NZ", name: "New Zealand" },
        { code: "KW", name: "Kuwait" },
        { code: "QA", name: "Qatar" },
        { code: "SA", name: "Saudi Arabia" },
        { code: "AE", name: "United Arab Emirates" },
        { code: "OM", name: "Oman" },
        { code: "BH", name: "Bahrain" },
        { code: "KW", name: "Kuwait" },
        { code: "LB", name: "Lebanon" },
        { code: "JO", name: "Jordan" },
        { code: "MA", name: "Morocco" },
        { code: "TN", name: "Tunisia" },
        { code: "DZ", name: "Algeria" },
        { code: "LY", name: "Libya" },
        { code: "SY", name: "Syria" },
        ],
      },
      zipInput: {
        placeholder: "Enter Postal/Zip Code",
        buttonText: "Check",
      },
      results: {
        shipsBy: "Ships by:",
        estimatedDelivery: "Estimated delivery:",
        freeShippingText: "Free Express Shipping (1-2 Days)",
        tooltip: "Free express shipping worldwide. Delivery in 1-2 business days.",
      },
    },
    infoSections: [
      {
        title: "Free 1-2 Day Shipping",
        description:
          "Enjoy complimentary standard shipping on all orders within the contiguous United States. Your order will arrive within 1-2 business days from the date of purchase.",
        icon: "Truck",
      },
      {
        title: "Shipping Timeframes",
        description:
          "Orders are typically processed within 1 business day. Shipping time is 1-2 business days, depending on your location. Please note that delivery times may be longer for Alaska, Hawaii, and international orders.",
        icon: "Clock",
      },
      {
        title: "International Shipping",
        description:
          "We offer international shipping to select countries. International orders may incur additional customs fees and taxes, which are the responsibility of the recipient.",
        icon: "Globe",
      },
      {
        title: "Order Tracking",
        description:
          "Once your order ships, you'll receive a confirmation email with tracking information. You can track your package's progress at any time through our website or the carrier's site.",
        icon: "ShieldCheck",
      },
    ],
    returns: {
      title: "Returns & Exchanges",
      content:
        "We want you to love your Stanley products. If you're not completely satisfied, you can return or exchange your items within 30 days of receipt, subject to the following conditions:",
      conditions: [
        "Items must be unused and in original packaging with all tags attached",
        "Proof of purchase is required for all returns and exchanges",
        "Return shipping is free for orders within the United States",
        'For warranty-related issues, please visit our <a href="/support/warranty" class="text-primary hover:underline">Warranty page</a>',
      ],
      conclusion: "To start a return or exchange, simply log into your account or contact our customer service team.",
    },
    faqs: {
      title: "Shipping FAQs",
      questions: [
        {
          question: "When will my order ship?",
          answer:
            "Orders placed before 2 PM EST on business days typically ship the same day. Orders placed after 2 PM EST or on weekends will ship the next business day.",
        },
        {
          question: "Do you ship to PO boxes?",
          answer:
            "Yes, we can ship to PO boxes using USPS. However, express shipping options are not available for PO box addresses.",
        },
        {
          question: "What if my package is damaged?",
          answer:
            "If your package arrives damaged, please take photos and contact our customer service team immediately. We'll send a replacement right away.",
        },
        {
          question: "Can I change my shipping address?",
          answer:
            "Please contact us as soon as possible if you need to change your shipping address. We'll do our best to accommodate changes before the order ships.",
        },
      ],
    },
    help: {
      title: "Need Help?",
      content:
        "Our customer service team is available Monday through Friday, 9 AM to 5 PM EST to assist with any shipping or return questions.",
      link: {
        text: "Contact Our Support Team",
        url: "/company/contact-us",
      },
    },
    animation: {
      duration: 0.5,
      staggerDelay: 0.1,
    },
  },

  // About Us Page Configuration
  aboutUs: {
    heading: {
      title: "About Talfasa",
      subtitle:
        "Built for life since 1913. Discover our story of innovation, quality, and commitment to sustainability.",
    },
    hero: {
      title: "A Legacy of Innovation Since 1913",
      subtitle:
        "From inventing the all-steel vacuum bottle to becoming a global leader in thermal technology, Talfasa's journey spans over 110 years of innovation and unmatched quality.",
      background: {
        color: "from-primary/5 to-transparent",
      },
    },
    heritage: {
      badge: "Our Heritage",
      title: "Built for Life",
      description:
        "Starting with William Stanley Jr. in 1913, our commitment to quality and innovation has made us a trusted companion for life's adventures. From job sites to campsites, Talfasa products are built to last a lifetime.",
      stats: [
        {
          value: "1913",
          label: "First all-steel vacuum bottle",
        },
        {
          value: "110+",
          label: "Years of innovation",
        },
      ],
      image: {
        src: "https://www.stanley1913.com/cdn/shop/files/021125_Product_DT-CAN_62148587-eb84-4008-9ef9-03f74411d3a1.jpg?v=1740426135&width=1320",
        alt: "Talfasa product showcase",
      },
    },
    values: {
      title: "Our Core Values",
      items: [
        {
          icon: "Clock",
          title: "Heritage",
          description: "110+ years of thermal innovation excellence",
        },
        {
          icon: "Users",
          title: "Community",
          description: "Building lasting connections through shared experiences",
        },
        {
          icon: "Globe",
          title: "Sustainability",
          description: "Committed to environmental responsibility",
        },
        {
          icon: "Award",
          title: "Quality",
          description: "Lifetime warranty on all our products",
        },
      ],
      background: {
        color: "from-primary/5 to-transparent",
      },
    },
    innovation: {
      badge: "Innovation",
      title: "Leading the Way in Thermal Technology",
      description:
        "From our classic vacuum bottles to our modern drinkware collections, we continue to innovate and set new standards in thermal retention technology. Every Talfasa product is designed with purpose, built with precision, and tested to exceed expectations.",
      button: {
        text: "Explore Our Products",
        link: "/products",
      },
      image: {
        src: "https://www.stanley1913.com/cdn/shop/files/stanley-footer.jpg?v=1718313630",
        alt: "Talfasa innovative products",
      },
    },
    sustainability: {
      title: "Committed to Sustainability",
      description:
        "Our reusable products have been helping reduce single-use waste for over a century. We're committed to sustainable practices and creating products that last a lifetime, not a lifetime in a landfill.",
      buttons: [
        {
          text: "Contact Us",
          link: "/company/contact-us",
          variant: "default",
        },
        {
          text: "Our Warranty",
          link: "/support/warranty",
          variant: "outline",
        },
      ],
      background: {
        color: "bg-secondary/50",
      },
    },
    animation: {
      duration: 0.5,
      staggerDelay: 0.1,
    },
  },


  // Contact Us Page Configuration
  contactUs: {
    heading: {
      title: "Contact Us",
      subtitle: "Have a question or need assistance? We're here to help.",
    },
    form: {
      title: "Get in Touch",
      fields: {
        name: {
          label: "Name",
          placeholder: "Your name",
          required: true,
        },
        email: {
          label: "Email",
          placeholder: "Your email",
          required: true,
        },
        subject: {
          label: "Subject",
          required: true,
          options: [
            { value: "product", label: "Product Inquiry" },
            { value: "warranty", label: "Warranty Claim" },
            { value: "order", label: "Order Status" },
            { value: "feedback", label: "Product Feedback" },
            { value: "other", label: "Other" },
          ],
        },
        message: {
          label: "Message",
          placeholder: "Your message",
          required: true,
        },
      },
      button: {
        text: "Send Message",
        loadingText: "Sending...",
      },
    },
    contactInfo: {
      title: "Contact Information",
      headquarters: {
        title: "Global Headquarters",
        address: ["Stanley Black & Decker", "1000 Stanley Drive", "New Britain, CT 06053", "United States"],
        icon: "MapPin",
      },
      customerService: {
        title: "Customer Service",
        phone: "1-800-STANLEY (782-6539)",
        icon: "Phone",
      },
      email: {
        title: "Email",
        address: "customerservice@stanley1913.com",
        icon: "Mail",
      },
      hours: {
        title: "Customer Service Hours",
        schedule: ["Monday - Friday: 8:00 AM - 8:00 PM EST", "Saturday: 9:00 AM - 5:00 PM EST", "Sunday: Closed"],
        icon: "Clock",
      },
    },
    quickSupport: {
      title: "Quick Support",
      links: [
        { text: "Visit our Help Center", url: "/support/help-center" },
        { text: "Warranty Information", url: "/support/warranty" },
        { text: "Register Your Product", url: "/support/product-registration" },
      ],
    },
    animation: {
      duration: 0.5,
      staggerDelay: 0.1,
    },
  },

  // Privacy Policy Configuration
  privacyPolicy: {
    heading: {
      title: "Privacy Policy",
      subtitle: "Your privacy matters to us. Learn how we protect and manage your personal information.",
    },
    lastUpdated: "February 25, 2024",
    sections: [
      {
        title: "Introduction",
        icon: "Shield",
        content: `Last updated: February 25, 2024

        At Stanley ("Stanley," "we," "our," or "us") we believe that protecting your privacy is as important as creating quality products that last a lifetime. We have carefully crafted this online privacy policy (this "Policy") to explain how we collect, use, and protect your information. We respect your privacy and are committed to managing it through our compliance with this Policy.`,
      },
      {
        title: "Information We Collect",
        icon: "Eye",
        content: `We collect personal and other information about you when you:
        - Create an account or make a purchase
        - Register a product
        - Sign up for our newsletter
        - Contact customer service
        - Participate in surveys or promotions
        - Use our website or mobile apps

        This may include your name, email address, postal address, phone number, payment information, and product preferences.

        We also automatically collect technical information when you use our Services, including:
        - IP address and device information
        - Browser type and settings
        - Shopping and browsing behavior
        - Website interaction data`,
      },
      {
        title: "How We Use Your Information",
        icon: "Clock",
        content: `We use your information to:
        - Process and fulfill your orders
        - Provide customer support
        - Send order updates and tracking information
        - Communicate about products, services, and promotions
        - Improve our products and services
        - Personalize your shopping experience
        - Protect against fraud and unauthorized transactions
        - Comply with legal obligations`,
      },
      {
        title: "Information Sharing",
        icon: "Lock",
        content: `We may share your information with:
        - Service providers who assist with order fulfillment, payment processing, and customer service
        - Marketing partners (with your consent)
        - Legal authorities when required by law
        - Business partners in the event of a corporate sale or reorganization

        We do not sell your personal information to third parties.`,
      },
      {
        title: "Children's Privacy",
        icon: "AlertTriangle",
        content: `Our Services are not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If we learn we have collected personal information from a child under 13, we will delete that information promptly.

        If you believe we might have any information from or about a child under 13, please contact us at privacy@stanley1913.com.`,
      },
      {
        title: "International Data Transfers",
        icon: "Globe",
        content: `We operate globally and may transfer your information to countries other than your own. When we do, we ensure appropriate safeguards are in place to protect your information and comply with applicable data protection laws.

        By using our Services, you consent to your information being transferred to and processed in the United States and other countries where we operate.`,
      },
      {
        title: "Updates to This Policy",
        icon: "RefreshCw",
        content: `We may update this Privacy Policy from time to time to reflect changes in our practices or for legal reasons. We will notify you of any material changes by posting the updated Policy on our website and updating the "Last Updated" date.

        Your continued use of our Services after we make changes indicates your acceptance of those changes.`,
      },
      {
        title: "Contact Us",
        icon: "Phone",
        content: `If you have questions about this Privacy Policy or our privacy practices, please contact us:

        Email: privacy@stanley1913.com
        Phone: 1-800-STANLEY (782-6539)
        Mail: Stanley
        Privacy Team
        1000 Stanley Drive
        New Britain, CT 06053
        United States`,
      },
    ],
    footer: {
      text: "This Privacy Policy was last updated on February 25, 2024. For previous versions or additional information, please contact us.",
    },
    animation: {
      duration: 0.5,
      staggerDelay: 0.1,
    },
  },

  // Returns Policy Configuration
  returnsPolicy: {
    heading: {
      title: "Returns Policy",
      subtitle:
        "We want you to be completely satisfied with your Stanley purchase. Learn about our return process and policies.",
    },
    policyItems: [
      {
        title: "30-Day Return Policy",
        icon: "RefreshCcw",
        content: `We want you to love your Stanley products. If you're not completely satisfied, you can return your purchase within 30 days of receipt for a full refund.

        To be eligible for a return:
        - Item must be unused and in original condition
        - Must include all original packaging and tags
        - Must have proof of purchase
        
        To initiate a return, please contact our customer service team at returns@stanley1913.com or call 1-800-STANLEY.`,
      },
      {
        title: "Damages and Issues",
        icon: "AlertTriangle",
        content: `If you receive a damaged or defective product:
        - Contact us within 48 hours of receipt
        - Take photos of the damage
        - Keep all original packaging
        - We'll send a prepaid return label
        - A replacement will be shipped once we receive the damaged item

        For warranty-related issues, please visit our warranty page.`,
      },
      {
        title: "Exceptions / Non-Returnable Items",
        icon: "RotateCcw",
        content: `The following items cannot be returned:
        - Personalized or custom-made products
        - Items marked as final sale
        - Gift cards
        - Items without original packaging or tags
        - Used items (unless defective)
        
        Please contact customer service if you have questions about a specific item.`,
      },
      {
        title: "International Returns",
        icon: "EuropeanUnion",
        content: `For international orders:
        - Return shipping costs are the responsibility of the customer
        - Import duties and taxes are non-refundable
        - Processing time may be longer
        - Returns must be initiated within 30 days
        
        European Union customers have 14 days to return items according to EU consumer law.`,
      },
      {
        title: "Refund Process",
        icon: "CreditCard",
        content: `Once we receive your return:
        - We'll inspect the item within 2 business days
        - You'll receive an email confirming your refund
        - Refund will be processed to original payment method
        - Allow 5-10 business days for the refund to appear
        
        Shipping costs are refunded only for damaged or incorrect items.`,
      },
    ],
    needHelp: {
      title: "Need Help?",
      content:
        "Our customer service team is available Monday through Friday, 8 AM to 8 PM EST to assist with returns or exchanges.",
      link: {
        text: "Contact Our Returns Team",
        email: "returns@stanley1913.com",
      },
    },
    animation: {
      duration: 0.5,
      staggerDelay: 0.1,
    },
  },

  // Terms and Conditions Configuration
  termsAndConditions: {
    heading: {
      title: "Terms and Conditions",
      subtitle: "Please read these terms carefully before using our services.",
    },
    lastUpdated: "February 25, 2024",
    sections: [
      {
        title: "Acceptance of Terms",
        content: `Last updated: February 25, 2024

        Stanley ("Stanley," "we," "us," and "our") operates the website stanley1913.com and related mobile applications (collectively, the "Services"). By accessing or using our Services, you agree to be bound by these Terms and Conditions and our Privacy Policy. If you do not agree with these terms, please do not use our Services.`,
      },
      {
        title: "Account Registration",
        content: `When you create an account with us, you must provide accurate and complete information. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.

        You must be at least 18 years old to create an account. You agree to notify us immediately of any unauthorized use of your account.`,
      },
      {
        title: "Product Information",
        content: `We strive to provide accurate product descriptions, pricing, and availability information. However, we do not warrant that product descriptions or other content is accurate, complete, reliable, current, or error-free.

        We reserve the right to modify prices, discontinue products, or limit quantities at any time without notice.`,
      },
      {
        title: "Orders and Payments",
        content: `All orders are subject to acceptance and availability. We reserve the right to refuse or cancel any order for any reason, including but not limited to:
        - Product availability
        - Errors in pricing or product information
        - Suspected fraudulent activity
        - Shipping restrictions

        Payment must be received in full before we process your order.`,
      },
      {
        title: "Shipping and Delivery",
        content: `Delivery times are estimates only and are not guaranteed. We are not responsible for delays beyond our control, including but not limited to:
        - Weather conditions
        - Carrier delays
        - Custom clearances
        - Natural disasters

        Risk of loss and title for items purchased pass to you upon delivery to the carrier.`,
      },
      {
        title: "Intellectual Property",
        content: `All content on our Services, including text, graphics, logos, images, and software, is the property of Stanley or its licensors and is protected by copyright and other intellectual property laws.

        You may not use our intellectual property without our express written permission.`,
      },
      {
        title: "Warranty Disclaimer",
        content: `While we stand behind our products with our lifetime warranty, the Services are provided "as is" without any warranties, express or implied.

        We do not guarantee that our Services will be uninterrupted, timely, secure, or error-free.`,
      },
      {
        title: "Limitation of Liability",
        content: `To the fullest extent permitted by law, Stanley shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the Services.

        Our liability for any claim arising from the Services shall not exceed the amount you paid for the product that is the subject of the claim.`,
      },
      {
        title: "Changes to Terms",
        content: `We may modify these terms at any time by posting updated terms on our website. Your continued use of the Services after any changes indicates your acceptance of the modified terms.

        We will notify you of material changes via email or through the Services.`,
      },
    ],
    animation: {
      duration: 0.5,
      staggerDelay: 0.1,
    },
  },
} as const

// Type definitions
export type Config = typeof config
export type JsonUrlType = (typeof config.jsonUrls)[number]["type"]

// Validate configuration
if (!Array.isArray(config.jsonUrls) || config.jsonUrls.length < 1) {
  throw new Error("Configuration Error: jsonUrls must be a non-empty array")
}

config.jsonUrls.forEach((source, index) => {
  if (!source.url || !source.type) {
    throw new Error(`Configuration Error: Invalid source at index ${index}. Must have url and type properties.`)
  }
})

