'use client';

import React, { InputHTMLAttributes, ReactNode } from 'react';
import { Check } from 'lucide-react';

export interface LiquidGlassCheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: ReactNode;
  description?: string;
  error?: string;
}

export function LiquidGlassCheckbox({
  id,
  checked,
  onChange,
  label,
  description,
  error,
  disabled = false,
  className = '',
  ...props
}: LiquidGlassCheckboxProps) {
  const inputId = id || `glass-chk-${Math.random().toString(36).substring(2, 9)}`;

  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      <label
        htmlFor={inputId}
        className={`group flex items-start gap-3 cursor-pointer select-none ${
          disabled ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        <div className="relative flex items-center justify-center mt-0.5">
          <input
            id={inputId}
            type="checkbox"
            checked={checked}
            onChange={onChange}
            disabled={disabled}
            className="peer sr-only"
            {...props}
          />

          {/* Liquid glass checkbox frame themed in #830000 / #BC0202 / #FF0000 */}
          <div
            className={`h-5 w-5 rounded-md border backdrop-blur-md transition-all duration-200 flex items-center justify-center ${
              checked
                ? 'bg-gradient-to-br from-[#830000] via-[#BC0202] to-[#FF0000] border-[#FF0000] text-white shadow-[0_0_14px_rgba(255,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.6)] scale-105'
                : 'bg-[#0A0202] border-[#830000] shadow-[inset_0_1px_2px_rgba(0,0,0,0.8)] group-hover:border-[#FF0000] group-hover:bg-[#830000]/20'
            }`}
          >
            {checked && <Check className="h-3.5 w-3.5 stroke-[3]" />}
          </div>
        </div>

        {(label || description) && (
          <div className="flex flex-col text-sm leading-tight">
            {label && (
              <span className="font-medium text-[#EBDCDC] group-hover:text-white transition-colors">
                {label}
              </span>
            )}
            {description && (
              <span className="text-xs text-[#A67E7E] mt-0.5 leading-normal">
                {description}
              </span>
            )}
          </div>
        )}
      </label>

      {error && <p className="text-xs text-[#FF4D4D] font-medium ml-8">{error}</p>}
    </div>
  );
}
