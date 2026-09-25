import React from 'react';
import Link from 'next/link';
import { Cake, Heart, ShieldCheck, Truck, Clock } from 'lucide-react';
import { SITE_CONFIG } from '@/data/siteConfig';

export function Footer() {
  return (
    <footer className="w-full bg-[#000000] text-[#D4B8B8] border-t border-[#830000]/80 mt-auto">
      {/* Bakery highlights ribbon */}
      <div className="border-b border-[#830000]/60 py-8 bg-[#080202]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center sm:text-left">
            <div className="flex items-center gap-3 justify-center sm:justify-start">
              <div className="h-10 w-10 rounded-xl bg-[#830000]/30 border border-[#BC0202]/60 flex items-center justify-center text-[#FF0000] shrink-0 shadow-[0_0_10px_rgba(255,0,0,0.2)]">
                <Truck className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white">Chilled Cake Delivery</h4>
                <p className="text-xs text-[#A67E7E]">Delivered cold in insulated boxes</p>
              </div>
            </div>

            <div className="flex items-center gap-3 justify-center sm:justify-start">
              <div className="h-10 w-10 rounded-xl bg-[#830000]/30 border border-[#BC0202]/60 flex items-center justify-center text-[#FF0000] shrink-0 shadow-[0_0_10px_rgba(255,0,0,0.2)]">
                <Clock className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white">Baked Fresh Daily</h4>
                <p className="text-xs text-[#A67E7E]">Prepared by master pastry chefs</p>
              </div>
            </div>

            <div className="flex items-center gap-3 justify-center sm:justify-start">
              <div className="h-10 w-10 rounded-xl bg-[#830000]/30 border border-[#BC0202]/60 flex items-center justify-center text-[#FF0000] shrink-0 shadow-[0_0_10px_rgba(255,0,0,0.2)]">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white">100% Pure Ingredients</h4>
                <p className="text-xs text-[#A67E7E]">No artificial trans fats or syrups</p>
              </div>
            </div>

            <div className="flex items-center gap-3 justify-center sm:justify-start">
              <div className="h-10 w-10 rounded-xl bg-[#830000]/30 border border-[#BC0202]/60 flex items-center justify-center text-[#FF0000] shrink-0 shadow-[0_0_10px_rgba(255,0,0,0.2)]">
                <Heart className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white">Guaranteed Satisfaction</h4>
                <p className="text-xs text-[#A67E7E]">Celebrate milestones worry-free</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-[#830000] to-[#FF0000] flex items-center justify-center text-white shadow-[0_0_10px_rgba(255,0,0,0.4)]">
                <Cake className="h-4 w-4" />
              </div>
              <span className="font-serif font-bold text-lg text-white">Sweet Delight Noir</span>
            </Link>
            <p className="text-xs text-[#D4B8B8] leading-relaxed max-w-sm">
              {SITE_CONFIG.description}
            </p>
            <div className="text-xs text-[#A67E7E] space-y-1">
              <p>📍 {SITE_CONFIG.contact.address}</p>
              <p>📞 {SITE_CONFIG.contact.phone}</p>
              <p>✉️ {SITE_CONFIG.contact.email}</p>
            </div>
          </div>

          {/* Dynamic Link columns */}
          {SITE_CONFIG.footerLinks.map((col) => (
            <div key={col.title} className="space-y-3">
              <h4 className="font-semibold text-sm text-white">{col.title}</h4>
              <ul className="space-y-2 text-xs">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-[#D4B8B8] hover:text-[#FF0000] transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Copyright line */}
      <div className="border-t border-[#830000]/60 py-6 text-center text-xs text-[#A67E7E] bg-[#000000]">
        <div className="max-w-7xl mx-auto px-4">
          <p>{SITE_CONFIG.copyright}</p>
          <p className="text-[11px] text-[#7A6161] mt-1">
            Inspired by classic web registration reference • Handcrafted with Lightswind Liquid Glass UI
          </p>
        </div>
      </div>
    </footer>
  );
}
