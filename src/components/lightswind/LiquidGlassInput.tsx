'use client';

import React, { InputHTMLAttributes, useState } from 'react';
import { Eye, EyeOff, AlertCircle } from 'lucide-react';

export interface LiquidGlassInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  requiredMark?: boolean;
  error?: string;
  helperText?: string;
  icon?: React.ReactNode;
}

export function LiquidGlassInput({
  id,
  label,
  requiredMark = false,
  error,
  helperText,
  type = 'text',
  icon,
  className = '',
  disabled,
  ...props
}: LiquidGlassInputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  const effectiveType = isPassword ? (showPassword ? 'text' : 'password') : type;
  const inputId = id || `glass-input-${Math.random().toString(36).substring(2, 9)}`;

  return (
    <div className={`w-full flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label
          htmlFor={inputId}
          className="flex items-center gap-1 text-sm font-medium text-[#EBDCDC]"
        >
          <span>{label}</span>
          {requiredMark && (
            <span className="text-[#FF0000] font-bold text-base leading-none" title="Required field">
              *
            </span>
          )}
        </label>
      )}

      <div className="relative flex items-center">
        {icon && (
          <span className="absolute left-3.5 text-[#A67E7E] pointer-events-none">
            {icon}
          </span>
        )}

        <input
          id={inputId}
          type={effectiveType}
          disabled={disabled}
          className={`w-full h-11 px-4 text-sm rounded-xl border backdrop-blur-md transition-all duration-200 outline-none
            ${icon ? 'pl-10' : ''}
            ${isPassword ? 'pr-11' : ''}
            ${
              error
                ? 'border-[#FF0000] bg-[#FF0000]/15 text-white focus:border-[#FF0000] focus:ring-2 focus:ring-[#FF0000]/40 shadow-[0_0_12px_rgba(255,0,0,0.3)]'
                : 'border-[#830000]/80 bg-[#0A0202]/90 text-white hover:border-[#BC0202] focus:border-[#FF0000] focus:ring-2 focus:ring-[#FF0000]/25 shadow-[inset_0_1px_2px_rgba(0,0,0,0.8)]'
            }
            ${disabled ? 'opacity-50 cursor-not-allowed bg-[#1A0505]' : ''}
            placeholder:text-[#7A6161]
          `}
          {...props}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            tabIndex={-1}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            className="absolute right-3.5 p-1 text-[#A67E7E] hover:text-white transition-colors"
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        )}
      </div>

      {error ? (
        <p className="flex items-center gap-1 text-xs text-[#FF4D4D] font-medium mt-0.5">
          <AlertCircle className="h-3.5 w-3.5 shrink-0" />
          <span>{error}</span>
        </p>
      ) : helperText ? (
        <p className="text-[11px] text-[#A67E7E] leading-tight">
          {helperText}
        </p>
      ) : null}
    </div>
  );
}
