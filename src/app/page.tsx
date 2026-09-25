import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, Heart, Award, ShieldCheck, Flame, Cake } from 'lucide-react';
import { PRODUCTS } from '@/data/products';
import { CATEGORIES } from '@/data/categories';
import { ProductCard } from '@/components/cakes/ProductCard';
import { LiquidGlassCard, LiquidGlassButton } from '@/components/lightswind';

export default function HomePage() {
  const hotCakes = PRODUCTS.filter((c) => c.isHot).slice(0, 4);
  const newCakes = PRODUCTS.filter((c) => c.isNew).slice(0, 4);

  return (
    <div className="space-y-16 sm:space-y-24 pb-20">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-8 pb-16 sm:pt-14 sm:pb-24">
        {/* Ambient background glow matching palette */}
        <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-gradient-to-b from-[#830000]/30 via-[#BC0202]/15 to-transparent blur-3xl -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#180404] border border-[#BC0202]/60 text-[#FF4D4D] text-xs font-semibold shadow-[0_0_12px_rgba(188,2,2,0.3)]">
                <Sparkles className="h-3.5 w-3.5 text-[#FF0000]" />
                <span>Handcrafted with 72% Belgian Cocoa, Red Berries & Sweet Vanilla</span>
              </div>

              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15]">
                Freshly Baked <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#BC0202] via-[#FF0000] to-[#FF4D4D] drop-shadow-[0_2px_15px_rgba(255,0,0,0.5)]">
                  Luxury Artisan Cakes
                </span> <br />
                For Life&apos;s Sweetest Moments
              </h1>

              <p className="text-base sm:text-lg text-[#D4B8B8] max-w-xl mx-auto lg:mx-0 leading-relaxed">
                From velvety Belgian dark chocolate mousse to ruby red velvet layers, each cake is baked fresh to order and chilled for immediate courier delivery.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-2">
                <Link href="/categories">
                  <LiquidGlassButton
                    variant="primary"
                    size="lg"
                    icon={<ArrowRight className="h-4 w-4" />}
                    iconPosition="right"
                  >
                    Explore All Cakes
                  </LiquidGlassButton>
                </Link>
                <Link href="/register">
                  <LiquidGlassButton
                    variant="glass"
                    size="lg"
                  >
                    Register New Account
                  </LiquidGlassButton>
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="pt-6 grid grid-cols-3 gap-4 border-t border-[#830000]/50 max-w-md mx-auto lg:mx-0">
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-white font-serif">100%</div>
                  <div className="text-xs text-[#A67E7E]">Pure Pasture Butter</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-[#FF0000] font-serif">4.9 ★</div>
                  <div className="text-xs text-[#A67E7E]">Over 2,400 Reviews</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-white font-serif">Same-Day</div>
                  <div className="text-xs text-[#A67E7E]">Chilled Dispatch</div>
                </div>
              </div>
            </div>

            {/* Right Hero Visual Card */}
            <div className="lg:col-span-5 relative">
              <LiquidGlassCard variant="clear" glow className="p-3 border-[#830000]">
                <div className="relative aspect-4/5 rounded-xl overflow-hidden shadow-inner">
                  <img
                    src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1000&q=85"
                    alt="Belgian Dark Truffle Mousse Cake"
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#000000] via-[#000000]/40 to-transparent flex flex-col justify-end p-6 text-white">
                    <span className="inline-block px-2.5 py-0.5 rounded-full bg-gradient-to-r from-[#BC0202] to-[#FF0000] text-[10px] font-bold tracking-wider uppercase mb-1 w-max shadow-md">
                      Signature Noir Masterpiece
                    </span>
                    <h3 className="font-serif text-2xl font-bold text-white">Belgian Dark Truffle Mousse</h3>
                    <p className="text-xs text-[#D4B8B8] mt-1 line-clamp-2">
                      Triple-layered 72% Valrhona ganache with caramelized hazelnut praline.
                    </p>
                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-xl font-bold text-[#FF0000] drop-shadow-[0_0_8px_rgba(255,0,0,0.5)]">
                        $48.00
                      </span>
                      <Link href="/categories">
                        <span className="text-xs font-semibold underline underline-offset-4 text-white hover:text-[#FF0000] transition-colors">
                          Order Freshly Baked &rarr;
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>
              </LiquidGlassCard>
            </div>

          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="font-serif text-3xl font-bold text-white tracking-tight">
            Explore Handcrafted Categories
          </h2>
          <p className="text-sm text-[#D4B8B8] mt-2">
            Every celebration deserves a masterpiece. Browse our curated cake selections.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              href={`/categories?cat=${cat.slug}`}
              className="group block"
            >
              <LiquidGlassCard
                variant="clear"
                hoverEffect
                className="p-3 text-center flex flex-col items-center h-full border-[#830000]/60 bg-[#0A0202]/90"
              >
                <div className="h-20 w-20 rounded-full overflow-hidden mb-3 border-2 border-[#BC0202]/60 group-hover:scale-105 group-hover:border-[#FF0000] transition-all duration-300 shadow-[0_0_10px_rgba(188,2,2,0.3)]">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <h4 className="font-semibold text-xs text-white group-hover:text-[#FF0000] transition-colors line-clamp-1">
                  {cat.name}
                </h4>
                <p className="text-[11px] text-[#A67E7E] mt-0.5">
                  {cat.itemCount} items
                </p>
              </LiquidGlassCard>
            </Link>
          ))}
        </div>
      </section>

      {/* Best Sellers Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-[#FF0000] text-xs font-bold uppercase tracking-wider mb-1">
              <Flame className="h-4 w-4 fill-current" />
              <span>Customer Favorites</span>
            </div>
            <h2 className="font-serif text-3xl font-bold text-white">
              Hot & Best-Selling Cakes
            </h2>
          </div>
          <Link href="/hot">
            <span className="text-sm font-semibold text-[#FF4D4D] hover:text-[#FF0000] flex items-center gap-1 transition-colors">
              View all best sellers <ArrowRight className="h-4 w-4" />
            </span>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {hotCakes.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* New Creations Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-[#BC0202] text-xs font-bold uppercase tracking-wider mb-1">
              <Sparkles className="h-4 w-4" />
              <span>Seasonal Pastries</span>
            </div>
            <h2 className="font-serif text-3xl font-bold text-white">
              Fresh New Arrivals
            </h2>
          </div>
          <Link href="/new">
            <span className="text-sm font-semibold text-[#FF4D4D] hover:text-[#FF0000] flex items-center gap-1 transition-colors">
              View all new releases <ArrowRight className="h-4 w-4" />
            </span>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {newCakes.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Liquid Glass Feature Promo Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <LiquidGlassCard variant="warm" glow className="p-8 sm:p-12 border-[#BC0202]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <span className="px-3 py-1 rounded-full bg-gradient-to-r from-[#830000] to-[#BC0202] text-white text-xs font-bold tracking-wide border border-[#FF0000]/40">
                MEMBER PERK
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                Register Your Account Today & Save On Your First Cake Delivery
              </h3>
              <p className="text-sm text-[#D4B8B8] leading-relaxed max-w-2xl">
                Create your in-memory profile in under a minute to store custom cake delivery instructions, track order milestones, and receive notifications for seasonal flavor drops.
              </p>
            </div>
            <div className="lg:col-span-4 flex justify-start lg:justify-end">
              <Link href="/register">
                <LiquidGlassButton variant="primary" size="lg">
                  Register New User
                </LiquidGlassButton>
              </Link>
            </div>
          </div>
        </LiquidGlassCard>
      </section>

    </div>
  );
}
