'use client';

import React, { ReactNode } from 'react';

interface LiquidGlassCardProps {
  children: ReactNode;
  className?: string;
  variant?: 'clear' | 'warm' | 'primary' | 'subtle';
  glow?: boolean;
  hoverEffect?: boolean;
  onClick?: () => void;
}

export function LiquidGlassCard({
  children,
  className = '',
  variant = 'clear',
  glow = false,
  hoverEffect = false,
  onClick,
}: LiquidGlassCardProps) {
  const variantStyles = {
    clear:
      'bg-[#0D0303]/85 border-[#830000]/60 text-white backdrop-blur-xl',
    warm:
      'bg-[#180404]/90 border-[#BC0202]/70 text-white backdrop-blur-xl',
    primary:
      'bg-gradient-to-br from-[#830000]/30 to-[#BC0202]/20 border-[#FF0000]/50 text-white backdrop-blur-xl',
    subtle:
      'bg-[#000000]/80 border-[#830000]/40 text-[#D4B8B8] backdrop-blur-xl',
  };

  const glowStyles = glow
    ? 'shadow-[0_8px_35px_rgba(188,2,2,0.25),inset_0_1px_1px_rgba(255,255,255,0.15)]'
    : 'shadow-[0_8px_30px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.08)]';

  const hoverStyles = hoverEffect
    ? 'transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(255,0,0,0.2),inset_0_1px_2px_rgba(255,255,255,0.25)] hover:border-[#FF0000]/80'
    : '';

  return (
    <div
      onClick={onClick}
      className={`relative overflow-hidden rounded-2xl border ${variantStyles[variant]} ${glowStyles} ${hoverStyles} ${className}`}
    >
      {/* Specular highlight sheen along top-left border with subtle ruby tint */}
      <div
        className="pointer-events-none absolute -left-12 -top-12 h-32 w-32 rounded-full bg-gradient-to-br from-[#FF0000]/20 via-[#BC0202]/10 to-transparent blur-2xl"
        aria-hidden="true"
      />
      {children}
    </div>
  );
}
