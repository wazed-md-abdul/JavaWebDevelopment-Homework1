import React from 'react';
import type { Metadata } from 'next';
import { Flame } from 'lucide-react';
import { PRODUCTS } from '@/data/products';
import { ProductCard } from '@/components/cakes/ProductCard';

export const metadata: Metadata = {
  title: 'Best-Selling Cakes & Hot Confections',
  description: 'Our most loved and frequently ordered handcrafted cakes.',
};

export default function HotCakesPage() {
  const hotCakes = PRODUCTS.filter((p) => p.isHot);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#180404] text-[#FF0000] border border-[#BC0202]/60 text-xs font-bold tracking-wide shadow-[0_0_10px_rgba(255,0,0,0.3)]">
          <Flame className="h-4 w-4 fill-current" />
          <span>TOP RATED BY CUSTOMERS</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-white tracking-tight">
          Best-Selling Artisan Cakes
        </h1>
        <p className="text-sm text-[#D4B8B8]">
          These crowd favorites have delighted thousands of birthday parties, anniversaries, and luxury celebrations.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {hotCakes.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
