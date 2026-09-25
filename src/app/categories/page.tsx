'use client';

import React, { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { SlidersHorizontal, Cake } from 'lucide-react';
import { PRODUCTS } from '@/data/products';
import { CATEGORIES } from '@/data/categories';
import { ProductCard } from '@/components/cakes/ProductCard';

function CategoriesContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('cat') || 'all';

  const [activeCategory, setActiveCategory] = useState<string>(initialCategory);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');

  const filteredProducts = useMemo(() => {
    let list = [...PRODUCTS];

    if (activeCategory !== 'all') {
      list = list.filter((p) => p.category === activeCategory);
    }

    if (sortBy === 'price-asc') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      list.sort((a, b) => b.rating - a.rating);
    }

    return list;
  }, [activeCategory, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-8">
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-white tracking-tight">
          Handcrafted Cake Catalog
        </h1>
        <p className="text-sm text-[#D4B8B8] mt-2">
          Select from our freshly baked signature cakes, tarts, and confections.
        </p>
      </div>

      {/* Filter and Category Pills */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-b border-[#830000]/50 pb-6">
        {/* Category selector pills */}
        <div className="flex flex-wrap items-center gap-2 justify-center md:justify-start">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeCategory === 'all'
                ? 'bg-gradient-to-r from-[#BC0202] to-[#FF0000] text-white shadow-[0_0_14px_rgba(255,0,0,0.5)] border border-[#FF0000]/50'
                : 'bg-[#0A0202] border border-[#830000]/60 text-[#D4B8B8] hover:border-[#BC0202] hover:text-white'
            }`}
          >
            All Cakes ({PRODUCTS.length})
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.slug)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeCategory === cat.slug
                  ? 'bg-gradient-to-r from-[#BC0202] to-[#FF0000] text-white shadow-[0_0_14px_rgba(255,0,0,0.5)] border border-[#FF0000]/50'
                  : 'bg-[#0A0202] border border-[#830000]/60 text-[#D4B8B8] hover:border-[#BC0202] hover:text-white'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Sort selector */}
        <div className="flex items-center gap-2 shrink-0">
          <SlidersHorizontal className="h-4 w-4 text-[#BC0202]" />
          <span className="text-xs font-medium text-[#D4B8B8]">Sort:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="text-xs font-medium bg-[#0A0202] border border-[#830000] rounded-lg px-3 py-2 text-white outline-none focus:border-[#FF0000] cursor-pointer"
          >
            <option value="featured">Featured / Curated</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>
      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-16">
          <Cake className="h-12 w-12 text-[#830000] mx-auto mb-3" />
          <h3 className="font-semibold text-white text-base">No cakes found in this category</h3>
          <p className="text-xs text-[#8E7A7A] mt-1">Please try choosing another category tab above.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function CategoriesPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-sm text-[#D4B8B8]">Loading cake catalog...</div>}>
      <CategoriesContent />
    </Suspense>
  );
}
