'use client';

import React from 'react';

interface LiquidGlassAvatarProps {
  name: string;
  subtitle?: string;
  size?: 'sm' | 'md' | 'lg';
  status?: 'online' | 'active' | 'premium';
  className?: string;
}

export function LiquidGlassAvatar({
  name,
  subtitle,
  size = 'md',
  status = 'active',
  className = '',
}: LiquidGlassAvatarProps) {
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();

  const sizeStyles = {
    sm: 'h-8 w-8 text-xs',
    md: 'h-11 w-11 text-sm',
    lg: 'h-14 w-14 text-base',
  };

  const statusColors = {
    online: 'bg-[#FF0000] shadow-[0_0_8px_rgba(255,0,0,0.9)]',
    active: 'bg-[#BC0202] shadow-[0_0_8px_rgba(188,2,2,0.8)]',
    premium: 'bg-gradient-to-r from-[#BC0202] to-[#FF0000] shadow-[0_0_10px_rgba(255,0,0,0.9)]',
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="relative">
        <div
          className={`relative rounded-full border border-[#FF0000]/40 bg-gradient-to-br from-[#830000] via-[#BC0202] to-[#FF0000]/80 backdrop-blur-md flex items-center justify-center font-bold text-white shadow-[0_0_16px_rgba(188,2,2,0.4),inset_0_1px_1px_rgba(255,255,255,0.4)] select-none ${sizeStyles[size]}`}
        >
          {initials}
        </div>

        {status && (
          <span
            className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-[#000000] ${statusColors[status]}`}
          />
        )}
      </div>

      {(name || subtitle) && (
        <div className="flex flex-col text-left">
          <span className="font-semibold text-sm text-white">{name}</span>
          {subtitle && (
            <span className="text-xs text-[#D4B8B8] font-normal">{subtitle}</span>
          )}
        </div>
      )}
    </div>
  );
}
