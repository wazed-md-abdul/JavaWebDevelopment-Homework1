'use client';

import React, { useState } from 'react';
import { Star, ShoppingBag, Clock, Sparkles } from 'lucide-react';
import { Product } from '@/types';
import { useApp } from '@/context/AppContext';
import { LiquidGlassCard, LiquidGlassButton } from '@/components/lightswind';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useApp();
  const [selectedWeight, setSelectedWeight] = useState(product.weights[0] || 'Standard');

  return (
    <LiquidGlassCard
      variant="clear"
      hoverEffect
      className="flex flex-col h-full group border border-[#830000]/60 bg-[#0C0202]/90 shadow-[0_8px_30px_rgba(0,0,0,0.8)]"
    >
      {/* Cake Image Box with Badges */}
      <div className="relative aspect-4/3 w-full overflow-hidden bg-[#180404]">
        <img
          src={product.image}
          alt={product.name}
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80';
          }}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.isHot && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wide bg-gradient-to-r from-[#830000] via-[#BC0202] to-[#FF0000] text-white shadow-[0_0_8px_rgba(255,0,0,0.6)] border border-[#FF0000]/40">
              <Sparkles className="h-3 w-3" /> BEST SELLER
            </span>
          )}
          {product.isNew && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wide bg-gradient-to-r from-[#BC0202] to-[#FF0000] text-white shadow-[0_0_8px_rgba(255,0,0,0.6)] border border-[#FF0000]/40">
              NEW CREATION
            </span>
          )}
        </div>

        {/* Prep time badge */}
        <div className="absolute bottom-2.5 left-2.5 px-2 py-1 rounded-lg bg-black/70 backdrop-blur-md text-[10px] text-white flex items-center gap-1 border border-[#830000]/50">
          <Clock className="h-3 w-3 text-[#FF0000]" />
          <span>{product.prepTime}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="text-[#BC0202] font-semibold tracking-wide uppercase text-[10px]">
              {product.categoryName}
            </span>
            <div className="flex items-center gap-1 text-[#FF0000] font-semibold">
              <Star className="h-3.5 w-3.5 fill-current" />
              <span>{product.rating.toFixed(1)}</span>
              <span className="text-[#8E7A7A] font-normal">({product.reviewsCount})</span>
            </div>
          </div>

          {/* Title */}
          <h3 className="font-serif font-bold text-base text-white group-hover:text-[#FF0000] transition-colors line-clamp-1">
            {product.name}
          </h3>

          {/* Short description */}
          <p className="text-xs text-[#D4B8B8] mt-1 line-clamp-2 leading-relaxed">
            {product.description}
          </p>

          {/* Flavor Notes Tags */}
          <div className="flex flex-wrap gap-1 mt-2.5">
            {product.flavorNotes.map((note) => (
              <span
                key={note}
                className="px-2 py-0.5 rounded-md bg-[#1F0404] text-[#EBDCDC] text-[10px] font-medium border border-[#830000]/60"
              >
                {note}
              </span>
            ))}
          </div>

          {/* Weight / Size Selector if multiple */}
          {product.weights.length > 1 && (
            <div className="mt-3">
              <label className="text-[10px] uppercase font-bold text-[#A67E7E] tracking-wider block mb-1">
                Select Size:
              </label>
              <div className="grid grid-cols-2 gap-1.5">
                {product.weights.slice(0, 2).map((w) => (
                  <button
                    key={w}
                    type="button"
                    onClick={() => setSelectedWeight(w)}
                    className={`px-2 py-1 rounded-lg text-[11px] font-medium border transition-all truncate cursor-pointer ${
                      selectedWeight === w
                        ? 'border-[#FF0000] bg-[#830000]/40 text-white font-semibold shadow-[0_0_8px_rgba(255,0,0,0.3)]'
                        : 'border-[#830000]/50 hover:border-[#BC0202] text-[#D4B8B8] bg-[#0A0202]'
                    }`}
                  >
                    {w.split(' ')[0]} {w.split(' ')[1]}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Price & Add to Cart button */}
        <div className="pt-4 mt-4 border-t border-[#830000]/40 flex items-center justify-between gap-3">
          <div>
            <div className="text-lg font-bold text-[#FF0000] leading-none drop-shadow-[0_0_6px_rgba(255,0,0,0.4)]">
              ${product.price.toFixed(2)}
            </div>
            {product.originalPrice && (
              <span className="text-xs text-[#8E7A7A] line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          <LiquidGlassButton
            variant="primary"
            size="sm"
            onClick={() => addToCart(product, 1, selectedWeight)}
            icon={<ShoppingBag className="h-3.5 w-3.5" />}
          >
            Add to Box
          </LiquidGlassButton>
        </div>
      </div>
    </LiquidGlassCard>
  );
}
