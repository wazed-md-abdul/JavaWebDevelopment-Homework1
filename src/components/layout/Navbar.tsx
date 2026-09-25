'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Cake,
  ChevronDown,
  Search,
  ShoppingCart,
  Menu,
  X,
  User as UserIcon,
  LogOut,
  Sparkles
} from 'lucide-react';
import { NAVIGATION_ITEMS } from '@/data/navigation';
import { useApp } from '@/context/AppContext';
import { LiquidGlassAvatar } from '@/components/lightswind';

export function Navbar() {
  const pathname = usePathname();
  const { cartCount, setIsCartOpen, user, logoutUser, setIsSearchOpen } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoriesDropdownOpen, setCategoriesDropdownOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full shadow-2xl backdrop-blur-md">
      {/* Top announcement bar */}
      <div className="bg-[#000000] text-[#D4B8B8] text-xs py-1.5 px-4 text-center  hidden sm:block">
        <span className="inline-flex items-center gap-2">
          <Sparkles className="h-3 w-3 text-[#FF0000]" />
          <span>Fresh luxury artisan cakes baked daily. <strong className="text-white">Free chilled courier delivery</strong> on orders over $60!</span>
        </span>
      </div>

      {/* Main Navbar - Palette: #000000 base with #830000 borders and #BC0202 / #FF0000 accents */}
      <nav className="bg-[#000000]/95 text-[#FFFFFF] ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* Logo / Brand Name */}
            <div className="flex items-center gap-3">
              <Link href="/" className="flex items-center gap-2.5 group">
                <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-[#830000] via-[#BC0202] to-[#FF0000] flex items-center justify-center text-white shadow-[0_0_15px_rgba(255,0,0,0.5)] transition-transform group-hover:scale-105 border border-[#FF0000]/30">
                  <Cake className="h-5 w-5" />
                </div>
                <div className="flex flex-col">
                  <span className="font-serif font-bold text-lg text-white tracking-tight leading-none group-hover:text-[#FF0000] transition-colors">
                    Sweet Delight
                  </span>
                  <span className="text-[10px] text-[#BC0202] tracking-widest uppercase font-semibold mt-0.5">
                    Noir Patisserie
                  </span>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
              {NAVIGATION_ITEMS.map((item) => {
                const isActive = pathname === item.href;
                const isRegisterTab = item.label === 'Register';

                if (item.hasDropdown) {
                  return (
                    <div
                      key={item.label}
                      className="relative"
                      onMouseEnter={() => setCategoriesDropdownOpen(true)}
                      onMouseLeave={() => setCategoriesDropdownOpen(false)}
                    >
                      <button
                        onClick={() => setCategoriesDropdownOpen(!categoriesDropdownOpen)}
                        className={`px-3.5 py-2 rounded-lg text-sm font-medium flex items-center gap-1.5 transition-colors cursor-pointer ${pathname.startsWith(item.href)
                          ? 'text-white bg-[#830000]/40 border border-[#830000]'
                          : 'text-[#D4B8B8] hover:text-white hover:bg-[#830000]/20'
                          }`}
                      >
                        <span>{item.label}</span>
                        <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${categoriesDropdownOpen ? 'rotate-180' : ''}`} />
                      </button>

                      {/* Dropdown Menu */}
                      {categoriesDropdownOpen && item.children && (
                        <div className="absolute left-0 mt-1 w-64 rounded-2xl bg-[#0A0202] border border-[#830000] shadow-[0_10px_30px_rgba(131,0,0,0.4)] py-2 z-50 backdrop-blur-xl animate-in fade-in slide-in-from-top-2 duration-150">
                          {item.children.map((sub) => (
                            <Link
                              key={sub.name}
                              href={sub.href}
                              onClick={() => setCategoriesDropdownOpen(false)}
                              className="block px-4 py-2.5 text-xs hover:bg-[#830000]/30 text-[#D4B8B8] hover:text-white transition-colors"
                            >
                              <div className="font-semibold text-sm text-white">{sub.name}</div>
                              {sub.description && (
                                <div className="text-[11px] text-[#A67E7E] mt-0.5">{sub.description}</div>
                              )}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                }

                // Specifically highlight Register as in the reference image screenshot using #BC0202 -> #FF0000
                if (isRegisterTab) {
                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 shadow-md ${isActive
                        ? 'bg-gradient-to-r from-[#BC0202] to-[#FF0000] text-white shadow-[0_0_16px_rgba(255,0,0,0.6)] border border-[#FF0000]/50'
                        : 'bg-[#830000] hover:bg-[#BC0202] text-white border border-[#BC0202]/40'
                        }`}
                    >
                      {item.label}
                    </Link>
                  );
                }

                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors relative ${isActive
                      ? 'text-white font-semibold bg-[#830000]/40 border border-[#830000]'
                      : 'text-[#D4B8B8] hover:text-white hover:bg-[#830000]/20'
                      }`}
                  >
                    <span>{item.label}</span>
                    {item.badge && (
                      <span className="ml-1.5 px-1.5 py-0.5 text-[10px] font-bold rounded-full bg-[#BC0202] text-white shadow-[0_0_6px_rgba(255,0,0,0.5)]">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Right Side Icons: Search, Cart, User Status */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Search Icon */}
              <button
                onClick={() => setIsSearchOpen(true)}
                aria-label="Search cakes"
                className="p-2 rounded-lg text-[#D4B8B8] hover:text-[#FF0000] hover:bg-[#830000]/20 transition-colors cursor-pointer"
              >
                <Search className="h-5 w-5" />
              </button>

              {/* Shopping Cart Icon with Live In-Memory Badge */}
              <button
                onClick={() => setIsCartOpen(true)}
                aria-label="Shopping Cart"
                className="relative p-2 rounded-lg text-[#D4B8B8] hover:text-[#FF0000] hover:bg-[#830000]/20 transition-colors cursor-pointer"
              >
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-gradient-to-r from-[#BC0202] to-[#FF0000] text-white font-bold text-[11px] flex items-center justify-center shadow-[0_0_8px_rgba(255,0,0,0.7)] animate-pulse">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* In-Memory User Avatar or Profile Button */}
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center gap-2 p-1 rounded-full hover:ring-2 hover:ring-[#FF0000] transition-all cursor-pointer"
                    title={`Logged in as ${user.username}`}
                  >
                    <LiquidGlassAvatar name={user.username} size="sm" status="online" />
                  </button>

                  {userMenuOpen && (
                    <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-[#0A0202] border border-[#830000] shadow-2xl py-3 px-4 z-50 backdrop-blur-xl animate-in fade-in duration-150 text-[#FFFFFF]">
                      <div className="border-b border-[#830000]/60 pb-2 mb-2">
                        <p className="text-xs text-[#BC0202]">Logged in in-memory</p>
                        <p className="font-semibold text-sm truncate">{user.username}</p>
                        <p className="text-xs text-[#8E7A7A] truncate">{user.email}</p>
                      </div>
                      <div className="text-xs text-[#D4B8B8] space-y-1 mb-3">
                        {user.recipientName && (
                          <p>Recipient: <span className="text-white">{user.recipientName}</span></p>
                        )}
                        {user.deliveryAddress && (
                          <p className="truncate">Address: <span className="text-white">{user.deliveryAddress}</span></p>
                        )}
                      </div>
                      <button
                        onClick={() => {
                          logoutUser();
                          setUserMenuOpen(false);
                        }}
                        className="w-full flex items-center gap-2 text-xs font-semibold text-[#FF4D4D] hover:text-[#FF0000] py-1.5 transition-colors cursor-pointer"
                      >
                        <LogOut className="h-4 w-4" />
                        <span>Sign Out (Clear Memory)</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  href="/login"
                  className="hidden md:inline-flex p-2 rounded-lg text-[#D4B8B8] hover:text-[#FF0000] hover:bg-[#830000]/20 transition-colors"
                  title="Member Login"
                >
                  <UserIcon className="h-5 w-5" />
                </Link>
              )}

              {/* Mobile Menu Hamburger Toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle navigation menu"
                className="md:hidden p-2 rounded-lg text-[#D4B8B8] hover:text-white hover:bg-[#830000]/30 transition-colors"
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-[#830000] bg-[#0A0202] px-4 pt-3 pb-6 space-y-2">
            {NAVIGATION_ITEMS.map((item) => {
              const isRegisterTab = item.label === 'Register';
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-3 py-2.5 rounded-xl text-base font-medium transition-colors ${isRegisterTab
                    ? 'bg-gradient-to-r from-[#BC0202] to-[#FF0000] text-white font-semibold'
                    : pathname === item.href
                      ? 'bg-[#830000]/40 text-white border border-[#830000]'
                      : 'text-[#D4B8B8] hover:bg-[#830000]/20'
                    }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        )}
      </nav>
    </header>
  );
}
