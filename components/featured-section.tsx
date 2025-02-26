import Image from "next/image"

const partners = [
  {
    name: "REI",
    image: "https://www.thriftysigns.com/wp-content/uploads/2018/05/REI-Logo.jpg",
  },
  {
    name: "Dick's Sporting Goods",
    image: "https://companieslogo.com/img/orig/DKS_BIG-a7f5d09e.png?t=1721281172",
  },
  {
    name: "Target",
    image: "https://cdn.worldvectorlogo.com/logos/target-7.svg",
  },
  {
    name: "Walmart",
    image: "https://upload.wikimedia.org/wikipedia/commons/1/14/Walmart_Spark.svg",
  },
  {
    name: "Amazon",
    image: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
  },
]

export function FeaturedSection() {
  return (
    <section className="py-16 bg-white border-y">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Our Retail Partners</h2>
        <div className="relative">
          {/* Mobile scrolling version */}
          <div className="flex lg:hidden overflow-hidden">
            <div
              className="flex animate-scroll"
              style={{
                animationDuration: "20s",
                animationTimingFunction: "linear",
                animationIterationCount: "infinite",
              }}
            >
              {[...partners, ...partners].map((partner, index) => (
                <div key={`${partner.name}-${index}`} className="flex-shrink-0 w-[200px] mx-4">
                  <div className="relative w-[200px] h-[100px] filter grayscale hover:grayscale-0 transition-all duration-300">
                    <Image
                      src={partner.image || "/placeholder.svg"}
                      alt={`${partner.name} logo`}
                      fill
                      className="object-contain"
                      unoptimized
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Desktop grid version */}
          <div className="hidden lg:grid lg:grid-cols-5 gap-8">
            {partners.map((partner) => (
              <div key={partner.name} className="flex items-center justify-center p-4">
                <div className="relative w-[200px] h-[100px] filter grayscale hover:grayscale-0 transition-all duration-300">
                  <Image
                    src={partner.image || "/placeholder.svg"}
                    alt={`${partner.name} logo`}
                    fill
                    className="object-contain"
                    unoptimized
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

