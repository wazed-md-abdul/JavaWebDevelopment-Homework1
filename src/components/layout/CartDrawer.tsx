'use client';

import React from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { LiquidGlassButton, LiquidGlassCard } from '@/components/lightswind';

export function CartDrawer() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    cartSubtotal,
    clearCart,
    showToast,
  } = useApp();

  if (!isCartOpen) return null;

  const freeDeliveryThreshold = 60;
  const progressPercent = Math.min(100, (cartSubtotal / freeDeliveryThreshold) * 100);
  const remainingForFree = Math.max(0, freeDeliveryThreshold - cartSubtotal);

  const handleCheckout = () => {
    if (cart.length === 0) return;
    clearCart();
    setIsCartOpen(false);
    showToast(
      'Your cake order has been placed in-memory! Fresh baking will begin shortly.',
      'success',
      'Order Confirmed'
    );
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity animate-in fade-in"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#080202] shadow-[0_0_50px_rgba(131,0,0,0.5)] flex flex-col border-l border-[#830000]">
          
          {/* Header */}
          <div className="p-5 border-b border-[#830000]/60 flex items-center justify-between bg-[#000000] backdrop-blur-md">
            <div className="flex items-center gap-2">
              <ShoppingBag className="h-5 w-5 text-[#FF0000]" />
              <h2 className="font-serif font-bold text-lg text-white">
                Your Cake Box ({cart.reduce((sum, item) => sum + item.quantity, 0)})
              </h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 rounded-lg text-[#A67E7E] hover:text-white transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Delivery progress bar */}
          <div className="px-5 py-3 bg-[#120303] border-b border-[#830000]/50">
            <div className="text-xs text-[#D4B8B8] font-medium mb-1.5 flex justify-between">
              {remainingForFree > 0 ? (
                <span>Add <strong className="text-[#FF0000]">${remainingForFree.toFixed(2)}</strong> more for <strong className="text-white">FREE Chilled Delivery</strong>!</span>
              ) : (
                <span className="text-[#FF4D4D] font-semibold">🎉 You unlocked FREE Chilled Delivery!</span>
              )}
              <span className="font-semibold text-white">{Math.round(progressPercent)}%</span>
            </div>
            <div className="w-full bg-[#200505] h-2 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-[#830000] via-[#BC0202] to-[#FF0000] h-full rounded-full transition-all duration-300 shadow-[0_0_8px_rgba(255,0,0,0.7)]"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Cart items list */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12 text-[#A67E7E]">
                <div className="h-16 w-16 rounded-full bg-[#180404] border border-[#BC0202]/50 flex items-center justify-center text-[#FF0000] mb-4 shadow-[0_0_15px_rgba(255,0,0,0.2)]">
                  <ShoppingBag className="h-8 w-8" />
                </div>
                <h3 className="font-semibold text-white text-base">Your cake box is empty</h3>
                <p className="text-xs text-[#A67E7E] mt-1 max-w-xs">
                  Browse our handcrafted chocolate, red velvet, and celebration cakes to fill your box with sweetness.
                </p>
                <div className="mt-6">
                  <LiquidGlassButton
                    variant="primary"
                    size="sm"
                    onClick={() => setIsCartOpen(false)}
                  >
                    Browse Best Sellers
                  </LiquidGlassButton>
                </div>
              </div>
            ) : (
              cart.map((item) => (
                <LiquidGlassCard key={`${item.product.id}-${item.selectedWeight}`} className="p-3 border-[#830000]/70 bg-[#0E0303]/90" variant="clear">
                  <div className="flex gap-3">
                    <div className="relative h-20 w-20 rounded-xl overflow-hidden shrink-0 border border-[#830000]/60">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80';
                        }}
                        className="h-full w-full object-cover"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-sm text-white truncate">
                        {item.product.name}
                      </h4>
                      <p className="text-xs text-[#BC0202] font-semibold mt-0.5">
                        {item.selectedWeight}
                      </p>
                      <div className="font-bold text-sm text-[#FF0000] mt-1 drop-shadow-[0_0_4px_rgba(255,0,0,0.4)]">
                        ${(item.product.price * item.quantity).toFixed(2)}
                        <span className="text-xs font-normal text-[#8E7A7A] ml-1.5">
                          (${item.product.price.toFixed(2)} each)
                        </span>
                      </div>

                      <div className="flex items-center justify-between mt-2">
                        {/* Quantity adjust */}
                        <div className="flex items-center border border-[#830000] rounded-lg bg-[#000000]">
                          <button
                            onClick={() =>
                              updateQuantity(item.product.id, item.quantity - 1, item.selectedWeight)
                            }
                            className="p-1 text-[#A67E7E] hover:text-white transition-colors"
                          >
                            <Minus className="h-3.5 w-3.5" />
                          </button>
                          <span className="px-2 text-xs font-semibold text-white">{item.quantity}</span>
                          <button
                            onClick={() =>
                              updateQuantity(item.product.id, item.quantity + 1, item.selectedWeight)
                            }
                            className="p-1 text-[#A67E7E] hover:text-white transition-colors"
                          >
                            <Plus className="h-3.5 w-3.5" />
                          </button>
                        </div>

                        {/* Remove item */}
                        <button
                          onClick={() => removeFromCart(item.product.id, item.selectedWeight)}
                          className="text-[#FF4D4D] hover:text-[#FF0000] p-1 text-xs flex items-center gap-1 transition-colors"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                          <span className="text-[11px]">Remove</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </LiquidGlassCard>
              ))
            )}
          </div>

          {/* Footer Checkout */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-[#830000]/60 bg-[#050101] backdrop-blur-md space-y-3">
              <div className="space-y-1.5 text-xs text-[#D4B8B8]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-white">
                    ${cartSubtotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Refrigerated Delivery</span>
                  <span>{remainingForFree === 0 ? <strong className="text-[#FF4D4D]">FREE</strong> : '$6.50'}</span>
                </div>
                <div className="border-t border-dashed border-[#830000]/50 pt-2 flex justify-between text-base font-bold text-white">
                  <span>Estimated Total</span>
                  <span className="text-[#FF0000] drop-shadow-[0_0_8px_rgba(255,0,0,0.4)]">
                    ${(cartSubtotal + (remainingForFree === 0 ? 0 : 6.5)).toFixed(2)}
                  </span>
                </div>
              </div>

              <LiquidGlassButton
                variant="primary"
                size="lg"
                fullWidth
                onClick={handleCheckout}
                icon={<ArrowRight className="h-4 w-4" />}
                iconPosition="right"
              >
                Place In-Memory Order
              </LiquidGlassButton>
              <p className="text-[11px] text-center text-[#7A6161]">
                Zero storage used: items and order remain active during this session only.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
