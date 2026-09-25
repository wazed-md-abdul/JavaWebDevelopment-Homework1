'use client';

import React, { useState, useMemo } from 'react';
import { Search, X, Cake } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { PRODUCTS } from '@/data/products';

export function SearchModal() {
  const { isSearchOpen, setIsSearchOpen, addToCart } = useApp();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCakes = useMemo(() => {
    if (!searchTerm.trim()) return [];
    const term = searchTerm.toLowerCase();
    return PRODUCTS.filter(
      (c) =>
        c.name.toLowerCase().includes(term) ||
        c.categoryName.toLowerCase().includes(term) ||
        c.description.toLowerCase().includes(term) ||
        c.flavorNotes.some((f) => f.toLowerCase().includes(term))
    );
  }, [searchTerm]);

  if (!isSearchOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 md:p-20">
      {/* Backdrop */}
      <div
        onClick={() => setIsSearchOpen(false)}
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
      />

      <div className="relative mx-auto max-w-2xl transform rounded-3xl bg-[#080202] shadow-[0_0_50px_rgba(131,0,0,0.6)] ring-1 ring-[#830000] transition-all overflow-hidden border border-[#BC0202]/50">
        {/* Search Input bar */}
        <div className="relative flex items-center border-b border-[#830000]/60 px-4 bg-[#000000]">
          <Search className="h-5 w-5 text-[#FF0000] shrink-0" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search cakes by flavor, name, or occasion (e.g. chocolate, velvet, strawberry)..."
            autoFocus
            className="h-14 w-full bg-transparent pl-3 pr-10 text-sm text-white placeholder:text-[#7A6161] outline-none"
          />
          {searchTerm ? (
            <button
              onClick={() => setSearchTerm('')}
              className="p-1 text-[#A67E7E] hover:text-white transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          ) : (
            <button
              onClick={() => setIsSearchOpen(false)}
              className="text-xs font-medium text-[#A67E7E] hover:text-white px-2 py-1 rounded border border-[#830000]"
            >
              ESC
            </button>
          )}
        </div>

        {/* Results */}
        <div className="max-h-96 overflow-y-auto p-4 space-y-3">
          {searchTerm.trim() === '' ? (
            <div className="py-8 text-center text-xs text-[#A67E7E] space-y-2">
              <Cake className="h-8 w-8 mx-auto text-[#FF0000] opacity-80" />
              <p>Type to search our handcrafted cake collection.</p>
              <div className="flex flex-wrap justify-center gap-2 pt-2">
                {['Truffle', 'Red Velvet', 'Strawberry', 'Cheesecake', 'Matcha', 'Caramel'].map((kw) => (
                  <button
                    key={kw}
                    onClick={() => setSearchTerm(kw)}
                    className="px-2.5 py-1 rounded-full bg-[#180404] text-[#FF4D4D] text-xs hover:bg-[#830000]/40 transition-colors border border-[#830000]/60 cursor-pointer"
                  >
                    {kw}
                  </button>
                ))}
              </div>
            </div>
          ) : filteredCakes.length === 0 ? (
            <div className="py-8 text-center text-xs text-[#A67E7E]">
              No delicious cakes found matching &ldquo;{searchTerm}&rdquo;. Try another search term!
            </div>
          ) : (
            filteredCakes.map((cake) => (
              <div
                key={cake.id}
                className="flex items-center justify-between p-2.5 rounded-xl hover:bg-[#180404] transition-colors group border border-transparent hover:border-[#830000]/50"
              >
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-lg overflow-hidden shrink-0 border border-[#830000]/60">
                    <img
                      src={cake.image}
                      alt={cake.name}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80';
                      }}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <h5 className="font-semibold text-sm text-white group-hover:text-[#FF0000] transition-colors">
                      {cake.name}
                    </h5>
                    <p className="text-xs text-[#D4B8B8]">{cake.categoryName} • <span className="text-[#FF0000] font-semibold">${cake.price.toFixed(2)}</span></p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      addToCart(cake);
                      setIsSearchOpen(false);
                    }}
                    className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-[#BC0202] to-[#FF0000] text-white text-xs font-semibold hover:from-[#9E0000] hover:to-[#FF1A1A] transition-all shadow-[0_0_8px_rgba(255,0,0,0.5)] cursor-pointer"
                  >
                    Add to Box
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
