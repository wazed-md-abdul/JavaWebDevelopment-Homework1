'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { LiquidGlassAlert } from '@/components/lightswind';

export function ToastContainer() {
  const { toast, hideToast } = useApp();

  if (!toast) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-sm w-full animate-in slide-in-from-bottom-5 fade-in duration-200">
      <LiquidGlassAlert
        type={toast.type}
        title={toast.title}
        onClose={hideToast}
        className="shadow-2xl"
      >
        {toast.message}
      </LiquidGlassAlert>
    </div>
  );
}
