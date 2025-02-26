"use client";
import { HeroSection } from "@/components/hero-section";
import { FeaturedCollection } from "@/components/featured-collection";
import { GallerySection } from "@/components/gallery-section";
import { Testimonials } from "@/components/testimonials";
import { Newsletter } from "@/components/newsletter";
import { HomeFAQ } from "@/components/home-faq";
import { useProducts } from "@/lib/products";

export default function Home() {
  const { products } = useProducts();

  // Create two different random sets for Best Sellers and New Arrivals
  const bestSellers = [...products].sort(() => Math.random() - 0.5);
  const newArrivals = [...products]
    .filter((p) => !bestSellers.slice(0, 4).includes(p))
    .sort(() => Math.random() - 0.5);

  return (
    <main className="min-h-screen bg-background">
      <HeroSection />
      <Testimonials />
      <FeaturedCollection
        products={bestSellers}
        title="Best Sellers"
        subtitle="Discover our most popular products loved by thousands of customers."
      />
      <GallerySection />
      <FeaturedCollection
        products={newArrivals}
        title="New Arrivals"
        subtitle="Be the first to experience our latest innovations."
        color="bg-[#F0F0F0]"
      />
      <HomeFAQ />
      <Newsletter />
    </main>
  );
}
