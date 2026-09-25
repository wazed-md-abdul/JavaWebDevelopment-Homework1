'use client';

import React, { ReactNode } from 'react';
import { AlertCircle, CheckCircle2, Info, AlertTriangle, X } from 'lucide-react';

export interface LiquidGlassAlertProps {
  type?: 'info' | 'success' | 'warning' | 'error';
  title?: string;
  children: ReactNode;
  onClose?: () => void;
  className?: string;
}

export function LiquidGlassAlert({
  type = 'info',
  title,
  children,
  onClose,
  className = '',
}: LiquidGlassAlertProps) {
  const typeConfigs = {
    info: {
      border: 'border-[#830000]',
      bg: 'bg-[#0A0202]/95',
      text: 'text-[#EBDCDC]',
      iconColor: 'text-[#BC0202]',
      icon: <Info className="h-5 w-5 shrink-0" />,
      glow: 'shadow-[0_4px_24px_rgba(131,0,0,0.3)]',
    },
    success: {
      border: 'border-[#BC0202]',
      bg: 'bg-gradient-to-r from-[#830000]/40 to-[#0A0202]/90',
      text: 'text-white',
      iconColor: 'text-[#FF0000]',
      icon: <CheckCircle2 className="h-5 w-5 shrink-0" />,
      glow: 'shadow-[0_4px_24px_rgba(255,0,0,0.25)]',
    },
    warning: {
      border: 'border-[#FF0000]/70',
      bg: 'bg-[#830000]/30',
      text: 'text-white',
      iconColor: 'text-[#FF4D4D]',
      icon: <AlertTriangle className="h-5 w-5 shrink-0" />,
      glow: 'shadow-[0_4px_24px_rgba(255,0,0,0.2)]',
    },
    error: {
      border: 'border-[#FF0000]',
      bg: 'bg-[#FF0000]/15',
      text: 'text-white',
      iconColor: 'text-[#FF0000]',
      icon: <AlertCircle className="h-5 w-5 shrink-0" />,
      glow: 'shadow-[0_4px_24px_rgba(255,0,0,0.35)]',
    },
  };

  const config = typeConfigs[type];

  return (
    <div
      role="alert"
      className={`relative overflow-hidden rounded-xl border backdrop-blur-xl p-4 transition-all duration-300 ${config.bg} ${config.border} ${config.text} ${config.glow} ${className}`}
    >
      {/* Specular edge sheen */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent"
        aria-hidden="true"
      />

      <div className="flex items-start gap-3">
        <span className={config.iconColor}>{config.icon}</span>

        <div className="flex-1 text-sm">
          {title && <h5 className="font-semibold mb-0.5 tracking-tight text-white">{title}</h5>}
          <div className="opacity-90 leading-relaxed text-xs sm:text-sm">{children}</div>
        </div>

        {onClose && (
          <button
            onClick={onClose}
            aria-label="Close alert"
            className="rounded-lg p-1 text-current opacity-60 hover:opacity-100 hover:bg-white/10 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
}
