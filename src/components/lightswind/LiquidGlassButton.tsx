'use client';

import React, { ButtonHTMLAttributes, ReactNode } from 'react';

export interface LiquidGlassButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  variant?: 'primary' | 'glass' | 'secondary' | 'outline' | 'warm';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  fullWidth?: boolean;
  glow?: boolean;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
}

export function LiquidGlassButton({
  children,
  className = '',
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  glow = true,
  icon,
  iconPosition = 'left',
  disabled = false,
  ...props
}: LiquidGlassButtonProps) {
  const sizeStyles = {
    sm: 'h-9 px-3.5 text-xs rounded-xl gap-1.5',
    md: 'h-11 px-5 text-sm rounded-xl gap-2',
    lg: 'h-13 px-7 text-base rounded-2xl gap-2.5',
    icon: 'h-10 w-10 p-0 rounded-xl justify-center',
  };

  const variantStyles = {
    // Primary palette: #830000 -> #BC0202 -> #FF0000
    primary:
      'bg-gradient-to-r from-[#830000] via-[#BC0202] to-[#FF0000] text-white border-[#FF0000]/50 hover:from-[#9E0000] hover:via-[#D10404] hover:to-[#FF1A1A] shadow-[0_4px_22px_rgba(255,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.4)]',
    glass:
      'bg-[#0D0303]/80 text-white border-[#830000] hover:bg-[#830000]/40 hover:border-[#BC0202] shadow-[0_4px_16px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.15)] backdrop-blur-md',
    secondary:
      'bg-[#000000] text-[#D4B8B8] border-[#830000] hover:bg-[#0A0202] hover:text-white hover:border-[#BC0202] shadow-[0_4px_16px_rgba(0,0,0,0.6)]',
    outline:
      'bg-transparent text-white border-[#BC0202] hover:bg-[#BC0202]/20 hover:border-[#FF0000]',
    warm:
      'bg-[#830000]/30 text-white border-[#BC0202]/60 hover:bg-[#830000]/50',
  };

  const glowClass = glow && variant === 'primary' ? 'hover:shadow-[0_6px_28px_rgba(255,0,0,0.6)]' : '';

  return (
    <button
      disabled={disabled}
      className={`relative inline-flex items-center justify-center font-semibold tracking-wide transition-all duration-200 border select-none active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none cursor-pointer ${
        sizeStyles[size]
      } ${variantStyles[variant]} ${glowClass} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {/* Specular glass reflection bar across the top */}
      <div
        className="pointer-events-none absolute inset-x-2 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent"
        aria-hidden="true"
      />

      {icon && iconPosition === 'left' && <span className="shrink-0">{icon}</span>}
      {children}
      {icon && iconPosition === 'right' && <span className="shrink-0">{icon}</span>}
    </button>
  );
}
